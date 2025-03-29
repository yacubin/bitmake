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
const SCOPE = Symbol("SCOPE");

function UserContext(scope, global) {
  this[SCOPE] = scope;
  this[GLOBAL] = global;

  const descriptors = Object.getOwnPropertyDescriptors(Object.getPrototypeOf(scope));
  for (const [key, desc] of Object.entries(descriptors)) {
    const newDesc = { enumerable: true };
    if (typeof desc.get === "function")
      newDesc.get = function() { return scope[key]; };
    if (typeof desc.set === "function")
      newDesc.set = function(value) { scope[key] = value; };
    if (newDesc.get || newDesc.set)
      Object.defineProperty(this, key, newDesc);
  }
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

  const newScope = this[SCOPE].clone();

  const newContex = UserContext.create(newScope, this[GLOBAL]);
  for (const [key, val] of Object.entries(this)) {
    newContex[key] = val;
  }

  newContex.SOURCE_DIR = sourceDir;
  newContex.BINARY_DIR = binaryDir;
  newContex.SCRIPT_FILE = newContex.SOURCE_DIR.join(MAKE_SCRIPT);

  this[GLOBAL].copyCacheVariables(newContex);
  const module = require(newContex.SCRIPT_FILE.toString());

  module(newContex);

  const filename = this.PROJECT_BINARY_DIR.join(MAKE_CACHE).toString();
  this[GLOBAL].writeCacheVariables(filename);
}

UserContext.prototype.addCustomScript = function(name, params) {
  this.logDebug(currentFunctionName(), name);

  const newScope = this[SCOPE].clone();
  const target = bitmake.CustomScript.create(newScope, name, params);
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

  const newScope = this[SCOPE].clone();
  const target = bitmake.StaticLibrary.create(newScope, name);
  target.addSources(...sources);

  this[GLOBAL].TARGETS.set(name, target);
  return target;
}

UserContext.prototype.addObjectLibrary = function(name, ...sources) {
  this.logDebug(currentFunctionName(), name);

  const newScope = this[SCOPE].clone();
  const target = bitmake.ObjectLibrary.create(newScope, name);
  target.addSources(...sources);

  this[GLOBAL].TARGETS.set(name, target);
  return target;
}

UserContext.prototype.addSharedLibrary = function(name, ...sources) {
  this.logDebug(currentFunctionName(), name);

  const newScope = this[SCOPE].clone();
  const target = bitmake.SharedLibrary.create(newScope, name);
  target.addSources(...sources);

  this[GLOBAL].TARGETS.set(name, target);
  return target;
}

UserContext.prototype.addExecutable = function(name, ...sources) {
  this.logDebug(currentFunctionName(), name);

  const newScope = this[SCOPE].clone();
  const target = bitmake.Executable.create(newScope, name);
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

UserContext.prototype.toJSON = function() {
  const json = {};
  for (const key in this)
    json[key] = this[key];
  return json;
}

UserContext.create = (scope, global) => {
  return new UserContext(scope, global);
}

async function actionMakeScript(config, environment, settings)
{
  process.env = environment;

  const global = bitmake.GlobalContext.create();
  global.loadCacheVariables(AbsolutePath.create(config.binaryDir).join(MAKE_CACHE));

  const scope = bitmake.Scope.create();
  const root = UserContext.create(scope, global);

  root.SYSTEM_NAME = "Linux";

  root.PROJECT_SOURCE_DIR = new AbsolutePath(config.sourceDir);
  root.PROJECT_BINARY_DIR = new AbsolutePath(config.binaryDir);
  root.BUILD_TYPE = config.buildType;
  root.SOURCE_DIR = root.PROJECT_SOURCE_DIR;
  root.BINARY_DIR = root.PROJECT_BINARY_DIR;

  const pkg = require(root.SOURCE_DIR.join(PACKAGE_JSON).toString());

  root.PROJECT_NAME = pkg.name;
  root.PROJECT_VERSION = pkg.version;
  root.PROJECT_DESCRIPTION = pkg.description;
  root.PROJECT_HOMEPAGE_URL = pkg.homepage;

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
      else if (key === "GLOBAL_CONTEXT_JSON")
        root.GLOBAL_CONTEXT_JSON = bitmake.FilePath.create(val);
      else if (key === "TARGET_GOALS_JSON")
        root.TARGET_GOALS_JSON = bitmake.FilePath.create(val);
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

  const allGoalList = global.createGoals(root);
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
