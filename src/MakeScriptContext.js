"use strict";

const os = require("node:os");
const fs = require("node:fs");
const path = require("node:path");

const { copyValue } = require("###/utils/Primitives.js");
const { fileExistsSync } = require("###/utils/FileSystem.js");
const { AbsolutePath } = require("###/utils/AbsolutePath.js");
const bitmake = require("###/bitmake/index.js");

const PACKAGE_JSON = "package.json";
const MAKE_SCRIPT = "MakeScript.js";
const MAKE_CACHE = "MakeCache.json";

const currentFunctionName = () => {
  const stack = new Error().stack.split("\n")[2];
  return stack.match(/at (\S+)/)?.[1];
};

function cloneScopeValue(o) {
  if (typeof o === "undefined")
    return o;
  if (typeof o === "boolean")
    return o;
  if (typeof o === "number")
    return o;
  if (typeof o === "string")
    return o;
  if (typeof o === "object") {
    if (!o)
      return o;
    if (o instanceof AbsolutePath) {
      return new AbsolutePath(o.toString());
    }
    if (o instanceof Array) {
      const result = [];
      for (const i of o)
        result.push(cloneScopeValue(i));
      return result;
    }
    if (o instanceof Object) {
      const result = {};
      for (const [k,v] of Object.entries(o))
        result[k] = cloneScopeValue(v);
      return result;
    }
  }
  throw new Error(`Unknown instance of ${o}`);
}

function scopeValueAsPrimitives(o) {
  if (typeof o === "undefined")
    return o;
  if (typeof o === "boolean")
    return o;
  if (typeof o === "number")
    return o;
  if (typeof o === "string")
    return o;
  if (typeof o === "object") {
    if (!o)
      return o;
    if (o instanceof AbsolutePath) {
      return o.toString();
    }
    if (o instanceof Array) {
      const result = [];
      for (const i of o)
        result.push(scopeValueAsPrimitives(i));
      return result;
    }
    if (o instanceof Object) {
      const result = {};
      for (const [k,v] of Object.entries(o))
        result[k] = scopeValueAsPrimitives(v);
      return result;
    }
  }
  throw new Error(`Unknown instance of ${o}`);
}

const GLOBAL = Symbol("GLOBAL");

function UserContext(global) {
  this[GLOBAL] = global;
}

function makeLogger(loggerFunc, withTag) {
  if (!loggerFunc)
    return () => {};
  return function() {
    const list = [];
    if (withTag)
      list.push("[" + this.__logTag() + "]");
    for (const iter of arguments) {
      if (iter && typeof iter === "object")
        list.push(JSON.stringify(iter));
      else
        list.push(iter.toString());
    }
    loggerFunc(list.join(" "));
  };
}

UserContext.prototype.logDefault = makeLogger(console.log);
UserContext.prototype.logInfo = makeLogger(console.info);
UserContext.prototype.logDebug = makeLogger(/*console.debug*/);
UserContext.prototype.logWarn = makeLogger(console.warn);
UserContext.prototype.logError = makeLogger(console.error);

UserContext.prototype.__logTag = function() {
  const tag = this.PROJECT_SOURCE_DIR.relative(this.SOURCE_DIR);
  return path.posix.join(this.PROJECT_NAME, tag);
}

UserContext.prototype.getCacheVariables = function() {
  this.logDebug(currentFunctionName());
  const result = {};
  for (const [key, entry] of Object.entries(this[GLOBAL].CACHE)) {
    const value = copyValue(this[key]);
    result[key] = {
      type: copyValue(entry.type) || typeof value,
      description: entry.description || "",
      value,
    };
  }
  return result;
}

UserContext.prototype.addCacheVariables = function(params) {
  this.logDebug(currentFunctionName());

  if (typeof params === "string") {
    const scripts = this.SOURCE_DIR.resolve(params);
    this[GLOBAL].loadCacheVariables(scripts);
  }
  else if (typeof params === "object") {
    this[GLOBAL].addCacheVariables(params);
  }
  else {
    throw new Error(`Type ${params} cannot use for cache variables`);
  }
  this[GLOBAL].copyCacheVariables(this);
}

UserContext.prototype.addIncludeDirectories = function(...dirs) {
  this.logDebug(currentFunctionName());

  for (const iter of dirs.flat(1)) {
    this.INCLUDES.push(iter);
  }
}

UserContext.prototype.addSubdirectory = function(sourceDir, binaryDir) {
  this.logDebug(currentFunctionName());

  binaryDir = binaryDir || path.isAbsolute(sourceDir) ? undefined : sourceDir;

  const SOURCE_DIR = path.isAbsolute(sourceDir) ? new AbsolutePath(sourceDir) : this.SOURCE_DIR.join(sourceDir);
  const BINARY_DIR = path.isAbsolute(binaryDir) ? new AbsolutePath(binaryDir) : this.BINARY_DIR.join(binaryDir);

  this.__applyDirectory(SOURCE_DIR, BINARY_DIR);
}

UserContext.prototype.__applyDirectory = function(sourceDir, binaryDir) {
  this.logDebug(currentFunctionName(), scopeValueAsPrimitives(sourceDir), scopeValueAsPrimitives(binaryDir));

  const newMake = this.__clone();

  newMake.SOURCE_DIR = sourceDir;
  newMake.BINARY_DIR = binaryDir;
  newMake.SCRIPT_FILE = newMake.SOURCE_DIR.join(MAKE_SCRIPT);

  const module = require(newMake.SCRIPT_FILE.toString());

  this[GLOBAL].copyCacheVariables(this);
  module(newMake);
  
  const filename = this.PROJECT_BINARY_DIR.join(MAKE_CACHE).toString();
  this[GLOBAL].writeCacheVariables(filename);
}

UserContext.prototype.addCustomScript = function(name, params) {
  this.logDebug(currentFunctionName(), name);

  const target = bitmake.CustomScript.create(this, name, params);
  this[GLOBAL].SCRIPTS.set(name, target);
  return target;
}

UserContext.prototype.target = function(name) {
  this.logDebug(currentFunctionName(), name);

  let target = this[GLOBAL].INTERFACE_TARGETS[name];
  if (!target) {
    target = bitmake.InterfaceTarget.create(name);
    this[GLOBAL].INTERFACE_TARGETS[name] = target;
  }

  return target.forUser(this);
}

UserContext.prototype.script = function(name) {
  this.logDebug(currentFunctionName(), name);

  let script = this[GLOBAL].INTERFACE_SCRIPTS[name];
  if (!script) {
    script = bitmake.InterfaceScript.create(name);
    this[GLOBAL].INTERFACE_SCRIPTS[name] = script;
  }

  return script;
}

UserContext.prototype.install = function(value, params) {
  for (const iter of [ value ].flat(1)) {
    const entity = bitmake.InstallEntity.create(this, iter, params);
    this[GLOBAL].INSTALL_LIST.push(entity);
  }
}

UserContext.prototype.addStaticLibrary = function(name, ...sources) {
  this.logDebug(currentFunctionName(), name);

  const target = bitmake.StaticLibrary.create(this, name);
  target.addSources(...sources);

  this[GLOBAL].TARGETS.set(name, target);
  return target;
}

UserContext.prototype.addObjectLibrary = function(name, ...sources) {
  this.logDebug(currentFunctionName(), name);

  const target = bitmake.ObjectLibrary.create(this, name);
  target.addSources(...sources);

  this[GLOBAL].TARGETS.set(name, target);
  return target;
}

UserContext.prototype.addSharedLibrary = function(name, ...sources) {
  this.logDebug(currentFunctionName(), name);

  const target = bitmake.SharedLibrary.create(this, name);
  target.addSources(...sources);

  this[GLOBAL].TARGETS.set(name, target);
  return target;
}

UserContext.prototype.addExecutable = function(name, ...sources) {
  this.logDebug(currentFunctionName(), name);

  const target = bitmake.Executable.create(this, name);
  target.addSources(...sources);

  this[GLOBAL].TARGETS.set(name, target);
  return target;
}

UserContext.prototype.findProgram = function(name) {
  this.logDebug(currentFunctionName(), name);

  if (os.platform() === "win32" && !name.endsWith(".exe"))
    name += ".exe";

  const paths = process.env.PATH.split(path.posix.delimiter);
  for (const iter of paths) {
    const filename = path.posix.resolve(iter, name);
    if (fileExistsSync(filename))
      return filename;
  }

  return null;
}

UserContext.prototype.executeScript = function(script, options) {
  this.logDebug(currentFunctionName(), script);
  const scriptPath = this.SOURCE_DIR.resolve(script);
  const module = require(scriptPath.toString());
  module(scopeValueAsPrimitives(options));
}

UserContext.prototype.__createGoalList = function() {
  const goalList = bitmake.GoalCollection.create();
  this.logDebug(currentFunctionName());
  for (const iter of Object.values(this[GLOBAL].INTERFACE_TARGETS)) {
    const target = this[GLOBAL].TARGETS.get(iter.NAME);
    target.addSources(iter.SOURCES);
    for (const it of iter.INCLUDES) {
      if (it.PUBLIC_ONLY)
        target.addPublicIncludes(it.VALUE);
      else
        target.addIncludes(it.VALUE);
    }
  }

  for (const iter of Object.values(this[GLOBAL].INTERFACE_SCRIPTS)) {
    const script = this[GLOBAL].SCRIPTS.get(iter.NAME);
    for (const [key, vals] of Object.entries(iter.PROPERTIES))
      script.addProperty(key, ...vals);
  }

  for (const [name, script] of Object.entries(this[GLOBAL].SCRIPTS.ENTRIES)) {   
    const depends = [ script.FILE.toString() ];
    if (script.INPUT)
      depends.push(script.INPUT.toString());
    const msg = "\x1b[36m" + "Generating " + script.TARGET_SCOPE.BINARY_DIR.relative(script.OUTPUT) + "\x1b[0m";
    const params = { ...script.PROPERTIES, ...script.PARAMS };
    goalList.addScript(script.FILE, "", depends, script.OUTPUT.toString(), scopeValueAsPrimitives(params), msg);
  }

  for (const [name, target] of Object.entries(this[GLOBAL].TARGETS.ENTRIES)) {
    const headers = this[GLOBAL].getAllHeaders(target);
    const depends = [];
    for (const s of target.SOURCES) {
      if (s instanceof bitmake.InterfaceObjects) {
        const t = this[GLOBAL].TARGETS.get(s.NAME);
        for (const f of t.SOURCES) {
          if (f instanceof bitmake.SourceFile && f.OBJECT_FILE)
            depends.push(f.OBJECT_FILE.toString());
        }
        continue;
      }

      if (s.HEADER_FILE_ONLY)
        continue;

      fs.mkdirSync(s.OBJECT_FILE_DIR.toString(), { recursive: true });

      const relativeObject = target.TARGET_SCOPE.BINARY_DIR.relative(s.OBJECT_FILE);
      const relativeBinaryDir = this.PROJECT_BINARY_DIR.relative(target.TARGET_SCOPE.BINARY_DIR);
      const msg = "\x1b[32m" + `Building ${s.LANGUAGE} object ${relativeBinaryDir}/${relativeObject}` + "\x1b[0m";

      const args = [];
      args.push(...target.TARGET_SCOPE[s.LANGUAGE + "_FLAGS"]);
      args.push(...target.TARGET_SCOPE[s.LANGUAGE + "_FLAGS_" + target.TARGET_SCOPE.BUILD_TYPE.toUpperCase()]);
      args.push(...target.COMPILE_OPTIONS);
      args.push(...s.COMPILE_FLAGS);
      args.push(...this[GLOBAL].getAllIncludes(target).map(i => "-I" + i));
      args.push("-o", relativeObject);
      args.push("-c", s.FILE);
      const cwd = target.TARGET_SCOPE.BINARY_DIR.toString();

      const command = target.TARGET_SCOPE[s.LANGUAGE + "_COMPILER"].toString();
      const output = target.TARGET_SCOPE.BINARY_DIR.join(relativeObject).toString();
      depends.push(output);

      goalList.addExec(output, [ ...headers, s.FILE ], command, args, cwd, msg);
    }

    if (target instanceof bitmake.ObjectLibrary) {
      const objs = depends.filter(i => i.endsWith(".o") || i.endsWith(".obj")).map(i => target.FILE_DIR.relative(i));
      if (objs.length) {
        const args = [ ...target.LINK_OPTIONS, "-r", "-o", target.FILE_NAME, ...objs ];
        const cwd = target.FILE_DIR.toString();
        const msg = `Linking CXX object library ${target.FILE_NAME}`;
        goalList.addExec(target.FILE.toString(), depends, this.LINKER, args, cwd, msg);
      }
      else {
        console.log(`No objects for "${target.NAME}"`);
      }
    }

    if (target instanceof bitmake.StaticLibrary) {
      const objs = depends.filter(i => i.endsWith(".o") || i.endsWith(".obj")).map(i => target.FILE_DIR.relative(i));
      if (objs.length) {
        const args = [ "rc", target.FILE_NAME , ...objs ];
        const cwd = target.FILE_DIR.toString();
        const msg = `Linking CXX static library ${target.FILE_NAME}`;
        goalList.addExec(target.FILE.toString(), depends, this.AR, args, cwd, msg);
      }
      else {
        console.log(`No objects for "${target.NAME}"`);
      }
    }

    if (target instanceof bitmake.SharedLibrary) {
      throw new Error("Not implemented");
    }

    if (target instanceof bitmake.Executable) {
      const objs = depends.filter(i => i.endsWith(".o") || i.endsWith(".obj")).map(i => target.FILE_DIR.relative(i));
      if (objs.length) {
        const libs = this[GLOBAL].getAllLibraries(target);
        const args = [
          ...target.TARGET_SCOPE.CXX_FLAGS,
          ...target.LINK_OPTIONS,
          ...objs,
          "-o", target.FILE_NAME,
          ...libs.map(i => target.FILE_DIR.relative(i)),
        ];
        const cwd = target.FILE_DIR.toString();
        const msg = `Linking CXX executable ${target.FILE_NAME}`;
        goalList.addExec(target.FILE.toString(), depends.concat(libs), this.CXX_COMPILER, args, cwd, msg);
      }
      else {
        console.log(`No objects for "${target.NAME}"`);
      }
    }

    goalList.addTarget(name, [ target.FILE.toString() ], `Built target ${name}`);
  }

  const install_files = [];
  const install_script = path.posix.join(__dirname, "bitmake/SystemScripts/install_script.js");
  for (const iter of this[GLOBAL].INSTALL_LIST) {
    let src, dest;
    if (iter.VALUE instanceof bitmake.FilePath) {
      src = iter.VALUE.toString();
      const rfile = iter.BASE_DIR.relative(iter.VALUE);
      dest = iter.DESTINATION.join(rfile);
    }
    else if (iter.VALUE instanceof bitmake.InterfaceTarget) {
      const target = this[GLOBAL].TARGETS.get(iter.VALUE.NAME);
      src = target.FILE.toString();
      dest = iter.DESTINATION.join(target.FILE_NAME);
    }
    else {
      throw new Error(`Can not install ${iter.VALUE}`)
    }
    if (this.DESTDIR)
      dest = bitmake.DirPath.create(this.DESTDIR).join(dest);
    goalList.addScript(install_script, "", [ src ], dest, scopeValueAsPrimitives({src, dest}), "");
    install_files.push(dest);
  }

  goalList.addTarget("install", install_files, "");
  goalList.addTarget("all", Object.keys(this[GLOBAL].TARGETS.ENTRIES), "");

  return goalList;
}

UserContext.prototype.__clone = function() {
  const proto = Object.getPrototypeOf(this);
  const o = Object.create(proto);
  for (const [k,v] of Object.entries(this)) {
    if (k === "INSTALL_PREFIX")
      o[k] = v;
    else
      o[k] = cloneScopeValue(v);
  }

  o[GLOBAL] = this[GLOBAL];

  return o;
}

async function actionMakeScript(config, environment, settings)
{
  process.env = environment;

  const global = bitmake.GlobalContext.create();
  global.loadCacheVariables(AbsolutePath.create(config.binaryDir).join(MAKE_CACHE));

  const root = new UserContext(global);

  root.SYSTEM_NAME = "Linux";

  root.PROJECT_SOURCE_DIR = new AbsolutePath(config.sourceDir);
  root.PROJECT_BINARY_DIR = new AbsolutePath(config.binaryDir);
  root.BUILD_TYPE = config.buildType;
  root.SOURCE_DIR = root.PROJECT_SOURCE_DIR;
  root.BINARY_DIR = root.PROJECT_BINARY_DIR;

  const pkg = require(root.SOURCE_DIR.join(PACKAGE_JSON).toString());

  root.PROJECT_NAME = pkg.name;
  root.PROJECT_VERSION = pkg.version;

  root.DESTDIR = config.destDir || "";
  root.INSTALL_PREFIX = bitmake.DirPath.create("/usr");

  root.MODULE_PATH = [];
  root.INCLUDES = [];
  root.ASM_FLAGS = [];
  root.ASM_FLAGS_DEBUG = [];
  root.ASM_FLAGS_RELEASE = [];
  root.C_FLAGS = [];
  root.C_FLAGS_DEBUG = [ "-DNDEBUG" ];
  root.C_FLAGS_RELEASE = [];
  root.CXX_FLAGS = [];
  root.CXX_FLAGS_DEBUG = [ "-DNDEBUG" ];
  root.CXX_FLAGS_RELEASE = [];
  root.OBJECT_LIBRARY_PREFIX = "";
  root.OBJECT_LIBRARY_SUFFIX = ".o";
  root.OBJECT_LINKER_FLAGS = [];
  root.STATIC_LIBRARY_PREFIX = "lib";
  root.STATIC_LIBRARY_SUFFIX = ".a";
  root.STATIC_LINKER_FLAGS = [];
  root.SHARED_LIBRARY_PREFIX = "lib";
  root.SHARED_LIBRARY_SUFFIX = ".so";
  root.SHARED_LINKER_FLAGS = [];
  root.EXECUTABLE_SUFFIX = "";
  root.EXE_LINKER_FLAGS = [];

  if (config.variables) {
    for (const [key, val] of Object.entries(config.variables)) {
      if (key === "INSTALL_PREFIX")
        root.INSTALL_PREFIX = bitmake.DirPath.create(val);
      else
        root[key] = val;
    }
  }

  if (root.TOOLCHAIN_NAME) {
    const filename = path.posix.join(__dirname, `toolchain/${root.TOOLCHAIN_NAME}.js`);
    const toolchain = require(filename);
    toolchain(root);
  }

  for (const plugin of (root.MAKE_PLUGIN_LIST || [])) {
  }

  root.__applyDirectory(root.PROJECT_SOURCE_DIR, root.PROJECT_BINARY_DIR);
  root.logInfo("Configuring done");

  if (root.GLOBAL_CONTEXT_JSON) {
    const filename = root.GLOBAL_CONTEXT_JSON.toString();
    const content = JSON.stringify(global, null, 2);
    fs.mkdirSync(path.dirname(filename), { recursive: true });
    fs.writeFileSync(filename, content, { encoding: "utf8" });
  }

  const allGoalList = root.__createGoalList();
  const goalList = allGoalList.getTargetList("install");

  if (root.TARGET_GOALS_JSON) {
    const filename = root.TARGET_GOALS_JSON.toString();
    const content = JSON.stringify(goalList, null, 2);
    fs.mkdirSync(path.dirname(filename), { recursive: true });
    fs.writeFileSync(filename, content, { encoding: "utf8" });
  }

  await bitmake.GoalCollection.buildGoals(goalList);
}

module.exports = {
  actionMakeScript,
};
