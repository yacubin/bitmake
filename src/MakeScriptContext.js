"use strict";

const os = require("node:os");
const fs = require("node:fs");
const path = require("node:path");
const { spawnSync } = require("node:child_process");

const { copyValue } = require("###/utils/Primitives.js");
const { fileExistsSync } = require("###/utils/FileSystem.js");
const { AbsolutePath } = require("###/utils/AbsolutePath.js");
const bitmake = require("###/bitmake/index.js");

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

const SCRIPT_GOAL = "script";
const EXEC_GOAL = "exec";
const TARGET_GOAL = "target";

class GoalList {
  _list = [];

  findScriptByOutput(output) {
    if (!output)
      return undefined;
    return this._list.find((i) => i.type === SCRIPT_GOAL && i.output === output);
  }

  hasScriptByOutput(output) {
    return !!this.findScriptByOutput(output);
  }

  addScript(script, name, depends, output, params, msg) {
    if (this.hasScriptByOutput(output.toString()))
      throw new Error(`Output "${output}" exists`);
    this._list.push({ name, type: SCRIPT_GOAL, script, output, depends, params, msg });
  }

  addExec(output, depends, command, args, cwd, msg) {
    this._list.push({ name: "", type: EXEC_GOAL, depends, output, command, args, cwd, msg });
  }

  addTarget(name, depends, msg) {
    this._list.push({ name, type: TARGET_GOAL, depends, msg });
  }

  getTarget(name) {
    return this._list.find((i) => i.type === TARGET_GOAL && i.name === name);
  }

  addTargetListImpl(name, result) {
    if (result.find(i => i.name === name || i.output === name)) {
      return;
    }

    const goal = this._list.find(i => i.name === name || i.output === name);
    if (!goal) {
      return;
    }

    for (const iter of goal.depends) {
      this.addTargetListImpl(iter.toString(), result);
    }

    result.push(goal);
  }

  getTargetList(name) {
    const result = [];
    this.addTargetListImpl(name, result);
    return result;
  }

  toJSON() {
    return this._list;
  }
};

async function buildGoals(goalList) {
  let msgCount = 0;
  for (const iter of goalList)
    msgCount += iter.msg ? 1 : 0;

  let msgIndex = 0;
  for (const goal of goalList) {
    const { type, msg } = goal;
    if (msg) {
      const relationOfLength = Math.round((++msgIndex / msgCount) * 100);
      const percent = "[" + relationOfLength.toString().padStart(3, " ") + "%] ";
      console.info(percent + msg);
    }
    if (type === SCRIPT_GOAL) {
      const { script, params } = goal;
      const module = require(script.toString());
      const result = module(scopeValueAsPrimitives(params));
      if (result instanceof Promise) {
        await result;
      }
    }
    else if (type === EXEC_GOAL) {
      const { command, args, cwd, output } = goal;
      fs.mkdirSync(path.posix.dirname(output), { recursive: true });
      const result = spawnSync(command, args, { cwd, encoding: "utf-8" });
      if (result.status) {
        console.info("cd " + cwd);
        let cmd = args.join(" ");
        cmd = command + (cmd ? " " : "") + cmd;
        console.info(cmd);
        console.info("");

        console.error(result.stderr);

        throw new Error("Status " + result.status);
      }
    }
    else if (type === TARGET_GOAL) {
    }
  }
}

const TARGETS = Symbol("TARGETS");
const SCRIPTS = Symbol("SCRIPTS");
const CACHE = Symbol("CACHE");
const INTERFACE_TARGETS = Symbol("INTERFACE_TARGETS");
const INTERFACE_SCRIPTS = Symbol("INTERFACE_SCRIPTS");
const INSTALL_LIST = Symbol("INSTALL_LIST");

function MakeContext() {
  this[TARGETS] = bitmake.TargetCollection.create();
  this[SCRIPTS] = bitmake.ScriptCollection.create();
  this[CACHE] = {};
  this[INTERFACE_TARGETS] = {};
  this[INTERFACE_SCRIPTS] = {};
  this[INSTALL_LIST] = [];
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

MakeContext.prototype.logDefault = makeLogger(console.log);
MakeContext.prototype.logInfo = makeLogger(console.info);
MakeContext.prototype.logDebug = makeLogger(/*console.debug*/);
MakeContext.prototype.logWarn = makeLogger(console.warn);
MakeContext.prototype.logError = makeLogger(console.error);

MakeContext.prototype.__logTag = function() {
  const tag = this.PROJECT_SOURCE_DIR.relative(this.SOURCE_DIR);
  return path.posix.join(this.PROJECT_NAME, tag);
}

MakeContext.prototype.__loadCacheVariables = function() {
  this.logDebug(currentFunctionName());
  const filename = this.PROJECT_BINARY_DIR.join(MAKE_CACHE).toString();
  if (fileExistsSync(filename)) {
    this.addCacheVariables(filename);
  }
}

MakeContext.prototype.__syncCacheVariables = function() {
  this.logDebug(currentFunctionName());
  const filename = this.PROJECT_BINARY_DIR.join(MAKE_CACHE).toString();
  const json = JSON.stringify(this[CACHE], null, 2);
  fs.writeFileSync(filename, json, "utf-8");
}

MakeContext.prototype.getCacheVariables = function() {
  this.logDebug(currentFunctionName());
  const result = {};
  for (const [key, entry] of Object.entries(this[CACHE])) {
    const value = copyValue(this[key]);
    result[key] = {
      type: copyValue(entry.type) || typeof value,
      description: entry.description || "",
      value,
    };
  }
  return result;
}

MakeContext.prototype.addCacheVariables = function(params) {
  this.logDebug(currentFunctionName());

  let variables = params;

  if (typeof variables === "string") {
    const scripts = this.SOURCE_DIR.resolve(variables);
    variables = require(scripts.toString());
  }
  
  if (typeof variables !== "object") {
    throw "Only object type is supported";
  }

  for (const [key, entry] of Object.entries(variables)) {
    this[CACHE][key] = entry;
    if (!Object.hasOwn(this, key)) {
      this[key] = entry.value;
    }
  }
}

MakeContext.prototype.addIncludeDirectories = function(...dirs) {
  this.logDebug(currentFunctionName());

  for (const iter of dirs.flat(1)) {
    this.INCLUDES.push(iter);
  }
}

MakeContext.prototype.addSubdirectory = function(sourceDir, binaryDir) {
  this.logDebug(currentFunctionName());

  binaryDir = binaryDir || path.isAbsolute(sourceDir) ? undefined : sourceDir;

  const SOURCE_DIR = path.isAbsolute(sourceDir) ? new AbsolutePath(sourceDir) : this.SOURCE_DIR.join(sourceDir);
  const BINARY_DIR = path.isAbsolute(binaryDir) ? new AbsolutePath(binaryDir) : this.BINARY_DIR.join(binaryDir);

  this.__applyDirectory(SOURCE_DIR, BINARY_DIR);
}

MakeContext.prototype.__applyDirectory = function(sourceDir, binaryDir) {
  this.logDebug(currentFunctionName(), scopeValueAsPrimitives(sourceDir), scopeValueAsPrimitives(binaryDir));

  const newMake = this.__clone();

  newMake.SOURCE_DIR = sourceDir;
  newMake.BINARY_DIR = binaryDir;
  newMake.SCRIPT_FILE = newMake.SOURCE_DIR.join(MAKE_SCRIPT);

  const module = require(newMake.SCRIPT_FILE.toString());
  module(newMake);
  this.__syncCacheVariables();
}

MakeContext.prototype.addCustomScript = function(name, params) {
  this.logDebug(currentFunctionName(), name);

  const target = bitmake.CustomScript.create(this, name, params);
  this[SCRIPTS].set(name, target);
  return target;
}

MakeContext.prototype.target = function(name) {
  this.logDebug(currentFunctionName(), name);

  let target = this[INTERFACE_TARGETS][name];
  if (!target) {
    target = bitmake.InterfaceTarget.create(name);
    this[INTERFACE_TARGETS][name] = target;
  }

  return target.forUser(this);
}

MakeContext.prototype.script = function(name) {
  this.logDebug(currentFunctionName(), name);

  let script = this[INTERFACE_SCRIPTS][name];
  if (!script) {
    script = bitmake.InterfaceScript.create(name);
    this[INTERFACE_SCRIPTS][name] = script;
  }

  return script;
}

MakeContext.prototype.install = function(value, params) {
  for (const iter of [ value ].flat(1)) {
    const entity = bitmake.InstallEntity.create(this, iter, params);
    this[INSTALL_LIST].push(entity);
  }
}

MakeContext.prototype.dump = function() {
  this.logDebug(currentFunctionName());

  const printedValues = {};

  let current = this;
  let deep = 0;
  while (current instanceof MakeContext) {
    const space = deep ? "  ".repeat(deep) : "";
    for (const [key, val] of Object.entries(current)) {
      if (Object.hasOwn(printedValues, key))
        continue;
      this.logInfo(`${space}${key}: ${val}`);
      printedValues[key] = val;
    }
    current = Object.getPrototypeOf(current);
    deep++;
  }
}

MakeContext.prototype.__saveContextAsJSON = function(filename) {
  this.logDebug(currentFunctionName(), filename);
  const json = {
    TARGETS: this[TARGETS],
    SCRIPTS: this[SCRIPTS],
    CACHE: this[CACHE],
    INTERFACE_TARGETS: this[INTERFACE_TARGETS],
    INTERFACE_SCRIPTS: this[INTERFACE_SCRIPTS],
    INSTALL_LIST: this[INSTALL_LIST],
  };
  const content = JSON.stringify(json, null, 2);
  fs.mkdirSync(path.dirname(filename), { recursive: true });
  fs.writeFileSync(filename, content, { encoding: "utf8" });
}

MakeContext.prototype.addStaticLibrary = function(name, ...sources) {
  this.logDebug(currentFunctionName(), name);

  const target = bitmake.StaticLibrary.create(this, name);
  target.addSources(...sources);

  this[TARGETS].set(name, target);
  return target;
}

MakeContext.prototype.addObjectLibrary = function(name, ...sources) {
  this.logDebug(currentFunctionName(), name);

  const target = bitmake.ObjectLibrary.create(this, name);
  target.addSources(...sources);

  this[TARGETS].set(name, target);
  return target;
}

MakeContext.prototype.addSharedLibrary = function(name, ...sources) {
  this.logDebug(currentFunctionName(), name);

  const target = bitmake.SharedLibrary.create(this, name);
  target.addSources(...sources);

  this[TARGETS].set(name, target);
  return target;
}

MakeContext.prototype.addExecutable = function(name, ...sources) {
  this.logDebug(currentFunctionName(), name);

  const target = bitmake.Executable.create(this, name);
  target.addSources(...sources);

  this[TARGETS].set(name, target);
  return target;
}

MakeContext.prototype.findProgram = function(name) {
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

MakeContext.prototype.executeScript = function(script, options) {
  this.logDebug(currentFunctionName(), script);
  const scriptPath = this.SOURCE_DIR.resolve(script);
  const module = require(scriptPath.toString());
  module(scopeValueAsPrimitives(options));
}

MakeContext.prototype.__getAllIncludes = function(includes, targetSet, list) {
  for (const iter of list) {
    if (iter instanceof bitmake.InterfaceIncludes || iter instanceof bitmake.InterfaceTarget) {
      if (!targetSet.has(iter.NAME)) {
        targetSet.add(iter.NAME);
        const target = this[TARGETS].get(iter.NAME);
        this.__getAllIncludes(includes, targetSet, target.getPublicIncludes());
        this.__getAllIncludes(includes, targetSet, target.getPublicLibraries());
      }
    }
    else if (iter instanceof bitmake.IncludeDirectory) {
      if (!includes.includes(iter.toString()))
        includes.push(iter.toString());
    }
    else {
      throw new Error(`Not support instance ${iter}`);
    }
  }
}

MakeContext.prototype.getAllIncludes = function(target) {
  const includes = target.TARGET_SCOPE.INCLUDES.map(i => i.toString());
  const targetSet = new Set([ target.NAME ]);
  this.__getAllIncludes(includes, targetSet, target.getIncludes());
  this.__getAllIncludes(includes, targetSet, target.getLibraries());
  return includes;
}

MakeContext.prototype.__getAllHeaders = function(headers, targetSet, list) {
  for (const iter of list) {
    if (iter instanceof bitmake.InterfaceIncludes || iter instanceof bitmake.InterfaceTarget) {
      if (!targetSet.has(iter.NAME)) {
        targetSet.add(iter.NAME);
        const target = this[TARGETS].get(iter.NAME);
        for (const header of target.getHeaders().map(i => i.FILE.toString())) {
          if (!headers.includes(header.toString()))
            headers.push(header.toString());
        }
        this.__getAllHeaders(headers, targetSet, target.getPublicIncludes());
        this.__getAllHeaders(headers, targetSet, target.getPublicLibraries());
      }
    }
  }
}

MakeContext.prototype.getAllHeaders = function(target) {
  const headers = target.getHeaders().map(i => i.FILE.toString());
  const targetSet = new Set([ target.NAME ]);
  this.__getAllHeaders(headers, targetSet, target.getIncludes());
  this.__getAllHeaders(headers, targetSet, target.getLibraries());
  return headers;
}

MakeContext.prototype.__getAllLibraries = function(libraries, targetSet, list) {
  for (const iter of list) {
    console.assert(iter instanceof bitmake.InterfaceTarget);
    if (!targetSet.has(iter.NAME)) {
      targetSet.add(iter.NAME);
      const target = this[TARGETS].get(iter.NAME);
      libraries.push(target.FILE.toString());
      this.__getAllLibraries(libraries, targetSet, target.getPublicLibraries());
    }
  }
}

MakeContext.prototype.getAllLibraries = function(target) {
  const libraries = [];
  const targetSet = new Set([ target.NAME ]);
  this.__getAllLibraries(libraries, targetSet, target.getLibraries());
  return libraries;
}

MakeContext.prototype.__createGoalList = function() {
  const goalList = new GoalList;
  this.logDebug(currentFunctionName());
  for (const iter of Object.values(this[INTERFACE_TARGETS])) {
    const target = this[TARGETS].get(iter.NAME);
    target.addSources(iter.SOURCES);
    for (const it of iter.INCLUDES) {
      if (it.PUBLIC_ONLY)
        target.addPublicIncludes(it.VALUE);
      else
        target.addIncludes(it.VALUE);
    }
  }

  for (const iter of Object.values(this[INTERFACE_SCRIPTS])) {
    const script = this[SCRIPTS].get(iter.NAME);
    for (const [key, vals] of Object.entries(iter.PROPERTIES))
      script.addProperty(key, ...vals);
  }

  for (const [name, script] of Object.entries(this[SCRIPTS].ENTRIES)) {   
    const depends = [ script.FILE.toString() ];
    if (script.INPUT)
      depends.push(script.INPUT.toString());
    const msg = "\x1b[36m" + "Generating " + script.TARGET_SCOPE.BINARY_DIR.relative(script.OUTPUT) + "\x1b[0m";
    const params = { ...script.PROPERTIES, ...script.PARAMS };
    goalList.addScript(script.FILE, "", depends, script.OUTPUT.toString(), params, msg);
  }

  for (const [name, target] of Object.entries(this[TARGETS].ENTRIES)) {
    const headers = this.getAllHeaders(target);
    const depends = [];
    for (const s of target.SOURCES) {
      if (s instanceof bitmake.InterfaceObjects) {
        const t = this[TARGETS].get(s.NAME);
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
      args.push(...this.getAllIncludes(target).map(i => "-I" + i));
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
        const libs = this.getAllLibraries(target);
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
  for (const iter of this[INSTALL_LIST]) {
    let src, dest;
    if (iter.VALUE instanceof bitmake.FilePath) {
      src = iter.VALUE.toString();
      const rfile = iter.BASE_DIR.relative(iter.VALUE);
      dest = iter.DESTINATION.join(rfile);
    }
    else if (iter.VALUE instanceof bitmake.InterfaceTarget) {
      const target = this[TARGETS].get(iter.VALUE.NAME);
      src = target.FILE.toString();
      dest = iter.DESTINATION.join(target.FILE_NAME);
    }
    else {
      throw new Error(`Can not install ${iter.VALUE}`)
    }
    if (this.DESTDIR)
      dest = bitmake.DirPath.create(this.DESTDIR).join(dest);
    goalList.addScript(install_script, "", [ src ], dest, {src, dest}, "");
    install_files.push(dest);
  }

  goalList.addTarget("install", install_files, "");
  goalList.addTarget("all", Object.keys(this[TARGETS].ENTRIES), "");

  return goalList;
}

MakeContext.prototype.__clone = function() {
  const proto = Object.getPrototypeOf(this);
  const o = Object.create(proto);
  for (const [k,v] of Object.entries(this)) {
    if (k === "INSTALL_PREFIX")
      o[k] = v;
    else
      o[k] = cloneScopeValue(v);
  }

  o[TARGETS] = this[TARGETS];
  o[SCRIPTS] = this[SCRIPTS];
  o[CACHE] = this[CACHE];
  o[INTERFACE_TARGETS] = this[INTERFACE_TARGETS];
  o[INTERFACE_SCRIPTS] = this[INTERFACE_SCRIPTS];
  o[INSTALL_LIST] = this[INSTALL_LIST];

  return o;
}

async function actionMakeScript(config, environment, settings)
{
  process.env = environment;

  const root = new MakeContext;

  root.SYSTEM_NAME = "Linux";

  root.PROJECT_SOURCE_DIR = new AbsolutePath(config.sourceDir);
  root.PROJECT_BINARY_DIR = new AbsolutePath(config.binaryDir);
  root.BUILD_TYPE = config.buildType;
  root.SOURCE_DIR = root.PROJECT_SOURCE_DIR;
  root.BINARY_DIR = root.PROJECT_BINARY_DIR;

  const pkg = require(root.SOURCE_DIR.join("package.json").toString());

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

  root.__loadCacheVariables();
  root.__applyDirectory(root.PROJECT_SOURCE_DIR, root.PROJECT_BINARY_DIR);
  root.logInfo("Configuring done");

  if (root.MAKE_CONTEXT_JSON) {
    root.__saveContextAsJSON(root.MAKE_CONTEXT_JSON.toString());
  }

  const allGoalList = root.__createGoalList();
  const goalList = allGoalList.getTargetList("install");

  if (root.TARGET_GOALS_JSON) {
    const filename = root.TARGET_GOALS_JSON.toString();
    const content = JSON.stringify(goalList, null, 2);
    fs.mkdirSync(path.dirname(filename), { recursive: true });
    fs.writeFileSync(filename, content, { encoding: "utf8" });
  }

  await buildGoals(goalList);
}

module.exports = {
  actionMakeScript,
};
