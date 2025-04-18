#!/usr/bin/env node
/******/ (() => { // webpackBootstrap
/******/ 	var __webpack_modules__ = ({

/***/ "./src lazy recursive":
/*!*******************************************!*\
  !*** ./src/ lazy strict namespace object ***!
  \*******************************************/
/***/ ((module) => {

function webpackEmptyAsyncContext(req) {
	// Here Promise.resolve().then() is used instead of new Promise() to prevent
	// uncaught exception popping up in devtools
	return Promise.resolve().then(() => {
		var e = new Error("Cannot find module '" + req + "'");
		e.code = 'MODULE_NOT_FOUND';
		throw e;
	});
}
webpackEmptyAsyncContext.keys = () => ([]);
webpackEmptyAsyncContext.resolve = webpackEmptyAsyncContext;
webpackEmptyAsyncContext.id = "./src lazy recursive";
module.exports = webpackEmptyAsyncContext;

/***/ }),

/***/ "./src/BuildHandler.mjs":
/*!******************************!*\
  !*** ./src/BuildHandler.mjs ***!
  \******************************/
/***/ ((__unused_webpack___webpack_module__, __webpack_exports__, __webpack_require__) => {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (/* export default binding */ __WEBPACK_DEFAULT_EXPORT__)
/* harmony export */ });
/* harmony import */ var node_fs__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! node:fs */ "node:fs");
/* harmony import */ var node_path__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! node:path */ "node:path");
/* harmony import */ var _utils_CMake_js__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! @/utils/CMake.js */ "./src/utils/CMake.js");
/* harmony import */ var _utils_MakePatch__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! @/utils/MakePatch */ "./src/utils/MakePatch.ts");
/* harmony import */ var _utils_FileSystem__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! @/utils/FileSystem */ "./src/utils/FileSystem.ts");
/* harmony import */ var _utils_SettingsStorage_js__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(/*! @/utils/SettingsStorage.js */ "./src/utils/SettingsStorage.js");
/* harmony import */ var _utils_ChildProcess__WEBPACK_IMPORTED_MODULE_6__ = __webpack_require__(/*! @/utils/ChildProcess */ "./src/utils/ChildProcess.ts");
/* harmony import */ var _MakeScriptContext_js__WEBPACK_IMPORTED_MODULE_7__ = __webpack_require__(/*! @/MakeScriptContext.js */ "./src/MakeScriptContext.js");
/* harmony import */ var _utils_Primitives__WEBPACK_IMPORTED_MODULE_8__ = __webpack_require__(/*! @/utils/Primitives */ "./src/utils/Primitives.ts");
/* harmony import */ var _Constants_js__WEBPACK_IMPORTED_MODULE_9__ = __webpack_require__(/*! @/Constants.js */ "./src/Constants.js");
/* harmony import */ var _utils_Module__WEBPACK_IMPORTED_MODULE_10__ = __webpack_require__(/*! @/utils/Module */ "./src/utils/Module.ts");
/* harmony import */ var _logger__WEBPACK_IMPORTED_MODULE_11__ = __webpack_require__(/*! @/logger */ "./src/logger/index.ts");
/* harmony import */ var _utils_HttpRequest__WEBPACK_IMPORTED_MODULE_12__ = __webpack_require__(/*! @/utils/HttpRequest */ "./src/utils/HttpRequest.ts");















const logger = (0,_logger__WEBPACK_IMPORTED_MODULE_11__.createLogger)("file:///mnt/c/opt/work/source/darkit-sdk/external/bitmake/src/BuildHandler.mjs");

const { BUILD_CONFIG_FILE, BUILD_SETTINGS_FILE } = _Constants_js__WEBPACK_IMPORTED_MODULE_9__;

function mergeEnvironment(...args) {
  const environment = {};
  for (const env of args) {
    const list = Object.entries(env || {});
    while (list.length) {
      let [key,val] = list.pop();
      let delimiter;
      let joinAfter = true;
      switch (key) {
      case "PATH":
        delimiter = node_path__WEBPACK_IMPORTED_MODULE_1__.delimiter;
        joinAfter = false;
        break;
      case "CFLAGS":
      case "CXXFLAGS":
      case "LDFLAGS":
        delimiter = " ";
        break;
      }
      if (typeof val === 'number')
        val = val.toString();
      else if (Array.isArray(val))
        val = val.join(delimiter);
      if (!delimiter || !environment[key])
        environment[key] = val;
      else if (joinAfter)
        environment[key] = val + delimiter + environment[key];
      else
        environment[key] = environment[key] + delimiter + val;
    }
  }
  return environment;
}

function rebaseConfig(config) {
  const baseConfig = {};
  const otherConfig = {};

  for (const [key, entry] of Object.entries(config)) {
    (entry.base ? otherConfig : baseConfig)[key] = entry;
  }

  while (true) {
    const keys = Object.keys(otherConfig);
    if (keys.length == 0)
      break;
    const doneKeys = [];
    for (const key of keys) {
      const otherIter = otherConfig[key];
      const baseList = [];
      for (const iter of (0,_utils_Primitives__WEBPACK_IMPORTED_MODULE_8__.arrayWrapper)(otherIter.base)) {
        const baseEntry = baseConfig[iter];
        if (!baseEntry) {
          baseList.length = 0;
          break;
        }
        baseList.push(baseEntry);
      }
      if (baseList.length) {
        baseList.push(otherIter);
        let newEntry = {};
        for (const iter of baseList) {
          (0,_utils_Primitives__WEBPACK_IMPORTED_MODULE_8__.assignObject)(newEntry, iter);
        }
        baseConfig[key] = newEntry;
        doneKeys.push(key);
      }
    }
    if (doneKeys.length == 0) {
      for (const key of keys)
        throw `Can't set base config for "${key}`;
    }
    for (const key of doneKeys) {
      delete baseConfig[key].base;
      delete otherConfig[key];
    }
  }

  return baseConfig;
}

function resolveStringWithVariable(config, entryConfig, rootConfig, val) {
  return val.replace(/\$\{([^}]+)\}/g, (match, value) => {
    let sel;
    for (const name of value.split(".")) {
      if (sel === undefined) {
        if (config.hasOwnProperty(name)) {
          sel = config[name];
        }
        else if (config !== entryConfig && entryConfig.hasOwnProperty(name)) {
          sel = entryConfig[name];
        }
        else if (config !== rootConfig && rootConfig.hasOwnProperty(name)) {
          sel = rootConfig[name];
        }
        else {
          try {
            const mainFile = (0,_utils_Module__WEBPACK_IMPORTED_MODULE_10__.requireResolve)(name);
            if (mainFile) {
              sel = { mainFile, mainDir: node_path__WEBPACK_IMPORTED_MODULE_1__.posix.dirname(mainFile), };
            }
          } catch(e) {}
        }
        if (sel === undefined)
          break;
      }
      else if (sel.hasOwnProperty(name)) {
        sel = sel[name];
      }
      else {
        sel = undefined;
        break;
      }
    }
    if (sel === undefined)
      throw new Error(`The ${value} variable does not exist"`);
    return sel;
  });
}

function resolveConfigStringsImpl(config, entryConfig, rootConfig) {
  let count = 0;
  for (const [key, val] of Object.entries(config)) {
    if (val && typeof val === "object")
      count += resolveConfigStringsImpl(val, entryConfig, rootConfig);
    else if (typeof val === "string") {
      const v = resolveStringWithVariable(config, entryConfig, rootConfig, val);
      if (val !== v) {
        config[key] = v;
        count++;
      }
    }
  }
  return count;
}

function resolveConfigStrings(config) {
  for (;;) {
    let count = 0;
    for (const [key, val] of Object.entries(config)) {
      if (val && typeof val === "object")
        count += resolveConfigStringsImpl(val, val, config);
      else  if (typeof val === "string") {
        const v = resolveStringWithVariable(config, config, config, val);
        if (val !== v) {
          config[key] = v;
          count++;
        }
      }
    }
    if (!count)
      break;
  }
}

function makeBuildConfig(ctx, config) {
  for (const key of [ "sourceRoot", "wasmuxDir" ]) {
    if (config[key]) {
      throw `The ${key} variable cannot be changed to "${config.sourceRoot}"`;
    }
  }

  const rootConfig = rebaseConfig(config);

  rootConfig.buildType = rootConfig.buildType || ctx.buildType;
  rootConfig.sourceRoot = rootConfig.sourceRoot || ctx.workDir;
  rootConfig.binaryRoot = rootConfig.binaryRoot || node_path__WEBPACK_IMPORTED_MODULE_1__.posix.resolve(ctx.workDir,"build");

  for (const [key, entry] of Object.entries(rootConfig)) {
    if (entry && typeof entry === "object" && entry.action) {
      entry.buildType = entry.buildType || rootConfig.buildType;
      const folder = key.replace(":", node_path__WEBPACK_IMPORTED_MODULE_1__.posix.sep);
      const workDir = node_path__WEBPACK_IMPORTED_MODULE_1__.posix.join(rootConfig.binaryRoot, folder);
      entry.tempDir = entry.tempDir || node_path__WEBPACK_IMPORTED_MODULE_1__.posix.join(workDir, "tmp");
      if (entry.sourceUrl) {
        entry.archiveDir = entry.archiveDir || node_path__WEBPACK_IMPORTED_MODULE_1__.posix.join(workDir, "arc");
        entry.extractDir = entry.extractDir || node_path__WEBPACK_IMPORTED_MODULE_1__.posix.join(workDir, "src");
        if (!entry.sourceDir)
          entry.sourceDir = entry.extractDir;
        else if (!node_path__WEBPACK_IMPORTED_MODULE_1__.isAbsolute(entry.sourceDir))
          entry.sourceDir = node_path__WEBPACK_IMPORTED_MODULE_1__.posix.join(entry.extractDir, entry.sourceDir);
      }
      else if (!entry.sourceDir) {
        throw `Missing sourceDir for ${key} action"`;
      }
      if (entry.binaryDir === null)
        entry.binaryDir = entry.sourceDir;
      else if (entry.binaryDir === undefined)
        entry.binaryDir = node_path__WEBPACK_IMPORTED_MODULE_1__.posix.join(workDir, "bin");
    }
  }

  resolveConfigStrings(rootConfig);

  return rootConfig;
}

async function tryRequestGet(sourceUrl, arcFile, attempts)
{
  for(;;) {
    try {
      const buffer = await (0,_utils_HttpRequest__WEBPACK_IMPORTED_MODULE_12__.requestGet)(sourceUrl);
      await node_fs__WEBPACK_IMPORTED_MODULE_0__.promises.writeFile(arcFile, buffer);
      return;
    }
    catch (e) {
      if (--attempts < 0) {
        throw e;
      }
      console.warn(e);
    }
  }
}

async function doExtractArchive(ctx, environment, config, settings)
{
  if (!config.sourceUrl)
    throw "Unknown sourceUrl";
  if (!config.archiveDir)
    throw "Unknown archiveDir";
  if (!config.extractDir)
    throw "Unknown extractDir";

  if (!await (0,_utils_FileSystem__WEBPACK_IMPORTED_MODULE_4__.directoryExists)(config.archiveDir)) {
    console.log(`mkdir -p ${config.archiveDir}`);
    await node_fs__WEBPACK_IMPORTED_MODULE_0__.promises.mkdir(config.archiveDir, { recursive: true });
  }

  if (!await (0,_utils_FileSystem__WEBPACK_IMPORTED_MODULE_4__.directoryExists)(config.tempDir)) {
    console.log(`mkdir -p ${config.tempDir}`);
    await node_fs__WEBPACK_IMPORTED_MODULE_0__.promises.mkdir(config.tempDir, { recursive: true });
  }

  const arcName = node_path__WEBPACK_IMPORTED_MODULE_1__.basename(config.sourceUrl);

  let arcFile;
  let downloadUrls = await settings.get("downloadUrls") || {};
  if (downloadUrls[config.sourceUrl])
    arcFile = downloadUrls[config.sourceUrl];
  else {
    arcFile = node_path__WEBPACK_IMPORTED_MODULE_1__.join(config.archiveDir, arcName);
    await tryRequestGet(config.sourceUrl, arcFile, ctx.requestAttempts);
    downloadUrls[config.sourceUrl] = arcFile;
    await settings.set("downloadUrls", downloadUrls);
  }

  let extractDir;
  let extractFiles = await settings.get("extractFiles") || {};
  if (extractFiles[arcFile]) {
    extractDir = extractFiles[arcFile];
  }
  else {
    extractDir = await node_fs__WEBPACK_IMPORTED_MODULE_0__.promises.mkdtemp(node_path__WEBPACK_IMPORTED_MODULE_1__.resolve(config.tempDir, arcName + '.'));
  
    await _utils_CMake_js__WEBPACK_IMPORTED_MODULE_2__.extract({
      environment,
      filename: arcFile,
      workDir: extractDir,
      logFile:  node_path__WEBPACK_IMPORTED_MODULE_1__.join(config.tempDir, node_path__WEBPACK_IMPORTED_MODULE_1__.basename(extractDir) + ".log"),
    });
  
    const extractList = await node_fs__WEBPACK_IMPORTED_MODULE_0__.promises.readdir(extractDir);
    if (extractList.length === 1) {
      extractDir = node_path__WEBPACK_IMPORTED_MODULE_1__.resolve(extractDir, extractList[0]);
      if (!await (0,_utils_FileSystem__WEBPACK_IMPORTED_MODULE_4__.directoryExists)(extractDir)) {
        console.log(`rm -fr ${extractDir}`);
        await node_fs__WEBPACK_IMPORTED_MODULE_0__.promises.rm(extractDir, { recursive: true });
        throw `Support only directory for archive`;
      }
    }
  
    if (await (0,_utils_FileSystem__WEBPACK_IMPORTED_MODULE_4__.directoryExists)(config.extractDir)) {
      // TODO: Marge extractDir with output
      console.log(`rm -fr ${config.extractDir}`);
      await node_fs__WEBPACK_IMPORTED_MODULE_0__.promises.rm(config.extractDir, { recursive: true });
    }
    else {
      const parentDir = node_path__WEBPACK_IMPORTED_MODULE_1__.dirname(config.extractDir);
      if (!await (0,_utils_FileSystem__WEBPACK_IMPORTED_MODULE_4__.directoryExists)(parentDir)) {
        console.log(`mkdir -p ${parentDir}`);
        await node_fs__WEBPACK_IMPORTED_MODULE_0__.promises.mkdir(parentDir, { recursive: true }); 
      }
    }
  
    console.log(`mv ${extractDir} ${config.extractDir}`);
    await node_fs__WEBPACK_IMPORTED_MODULE_0__.promises.rename(extractDir, config.extractDir);
  
    extractFiles[arcFile] = extractDir;
    await settings.set("extractFiles", extractFiles);
  }

  if (config.patchDir) {
    let patchDirs = await settings.get("patchDirs") || {};
    if (!patchDirs[config.patchDir]) {
      await (0,_utils_MakePatch__WEBPACK_IMPORTED_MODULE_3__.makePatch)(config.patchDir, config.extractDir);
      patchDirs[config.patchDir] = config.extractDir;
      await settings.set("patchDirs", patchDirs);
    }
  }
}

const actionHandlers = {
  none: async (config, environment, settings) => {
    /* do nothing */
  },
  cmake: async (config, environment, settings) => {
    const sourceDir = (0,_utils_FileSystem__WEBPACK_IMPORTED_MODULE_4__.getPathString)(config.sourceDir);
    const binaryDir = (0,_utils_FileSystem__WEBPACK_IMPORTED_MODULE_4__.getPathString)(config.binaryDir);
    const cmakeArgs = {
      environment: {
        ...environment,
        DESTDIR: config.destDir,
      },
      generator: config.generator || "Unix Makefiles",
      cacheVariables: config.cacheVariables,
      sourceDir,
      binaryDir,
    };

    if (!cmakeArgs.cacheVariables.CMAKE_BUILD_TYPE) {
      cmakeArgs.cacheVariables.CMAKE_BUILD_TYPE = config.buildType;
    }

    await _utils_CMake_js__WEBPACK_IMPORTED_MODULE_2__.configure(cmakeArgs);
    await _utils_CMake_js__WEBPACK_IMPORTED_MODULE_2__.build(cmakeArgs);
    await _utils_CMake_js__WEBPACK_IMPORTED_MODULE_2__.install(cmakeArgs);
  },
  configure: async (config, environment, settings) => {
    const sourceDir = (0,_utils_FileSystem__WEBPACK_IMPORTED_MODULE_4__.getPathString)(config.sourceDir);
    const binaryDir = (0,_utils_FileSystem__WEBPACK_IMPORTED_MODULE_4__.getPathString)(config.binaryDir);
    let step = await settings.get("configure") || "config";
    if (step === "config") {
      const command = node_path__WEBPACK_IMPORTED_MODULE_1__.resolve(sourceDir, "configure");
      const params = [];
      if (Array.isArray(config.variables)) {
        for (const iter of config.variables)
          params.push(iter);
      }
      else if (config.variables) {
        for (const [key,val] of Object.entries(config.variables)) {
          if (key === "features" && Array.isArray(val)) {
            for (const iter of val)
              params.push(`--${iter}`);
          }
          else if (val === null)
            params.push(`--${key}`);
          else
            params.push(`--${key}=${val}`);
        }
      }
      if (config.features) {
        for (const key of config.features)
          params.push(`--${key}`);
      }
      const res1 = await (0,_utils_ChildProcess__WEBPACK_IMPORTED_MODULE_6__.spawnAsync)(command, params, {
        cwd: binaryDir,
        env: environment,
        extra: {
          output: `ac.config.log`,
        },
      });
      if (res1.status !== 0) {
        throw `configure returned status ${res1.status}`;
      }
      step = "install";
      await settings.set("configure", step);
    }
    if (step === "install") {
      const args = [ 'install' ];
      if (config.destDir) {
        args.push(`DESTDIR=${config.destDir}`);
      }
      const res2 = await (0,_utils_ChildProcess__WEBPACK_IMPORTED_MODULE_6__.spawnAsync)("make", args, {
        cwd: binaryDir,
        env: environment,
        extra: {
          output: `ac.build.log`,
        },
      });
      if (res2.status !== 0) {
        throw `make returned status ${res2.status}`;
      }
      step = "done";
      await settings.set("configure", step);
    }
  },
  make: async (config, environment, settings) => {
    const binaryDir = (0,_utils_FileSystem__WEBPACK_IMPORTED_MODULE_4__.getPathString)(config.binaryDir);
    const args = config.args || [];
    if (config.destDir) {
      args.push(`DESTDIR=${config.destDir}`);
    }
    const res2 = await (0,_utils_ChildProcess__WEBPACK_IMPORTED_MODULE_6__.spawnAsync)("make", args, {
      cwd: binaryDir,
      env: environment,
      extra: {
        output: `make.log`,
      },
    });
    if (res2.status !== 0) {
      throw `make returned status ${res2.status}`;
    }
  },
  process: async (config, environment, settings) => {
    if (!config.command)
      throw "Required command field for process action";
    const sourceDir = (0,_utils_FileSystem__WEBPACK_IMPORTED_MODULE_4__.getPathString)(config.sourceDir);
    const binaryDir = (0,_utils_FileSystem__WEBPACK_IMPORTED_MODULE_4__.getPathString)(config.binaryDir);
    let { command } = config;
    if (!node_path__WEBPACK_IMPORTED_MODULE_1__.isAbsolute(command) && (command.includes(node_path__WEBPACK_IMPORTED_MODULE_1__.posix.delimiter) || command.includes(node_path__WEBPACK_IMPORTED_MODULE_1__.win32.delimiter))) {
      command = node_path__WEBPACK_IMPORTED_MODULE_1__.resolve(sourceDir, command);
    }
    const res = await (0,_utils_ChildProcess__WEBPACK_IMPORTED_MODULE_6__.spawnAsync)(command, config.args || [], {
      cwd: binaryDir,
      env: environment,
      extra: {
        output: `process.log`,
      },
    });
    if (res.status !== 0) {
      throw `process returned status ${res.status}`;
    }
  },
  bitmake: _MakeScriptContext_js__WEBPACK_IMPORTED_MODULE_7__.actionMakeScript,
};

async function doTargetBuild(ctx, environment, config, settings)
{
  if (config.preAction) {
    await settings.push("preAction");
    const newConfig = {};
    (0,_utils_Primitives__WEBPACK_IMPORTED_MODULE_8__.assignObject)(newConfig, config);
    delete newConfig.action;
    delete newConfig.preAction;
    delete newConfig.postAction;
    (0,_utils_Primitives__WEBPACK_IMPORTED_MODULE_8__.assignObject)(newConfig, config.preAction);
    const newEnvironment = mergeEnvironment(config.preAction.environment, environment);
    await doTargetBuild(ctx, newEnvironment, newConfig, settings);
    await settings.pop();
  }

  if (Array.isArray(config.action)) {
    await settings.push("action");
    for (var i = 0; i < config.action.length; ++i) {
      await settings.push(i);
      const newConfig = {};
      (0,_utils_Primitives__WEBPACK_IMPORTED_MODULE_8__.assignObject)(newConfig, config);
      delete newConfig.action;
      delete newConfig.preAction;
      delete newConfig.postAction;
      (0,_utils_Primitives__WEBPACK_IMPORTED_MODULE_8__.assignObject)(newConfig, config.action[i]);
      const newEnvironment = mergeEnvironment(config.action[i].environment, environment);
      await doTargetBuild(ctx, newEnvironment, newConfig, settings);
      await settings.pop();
    }
    await settings.pop();
  }
  else {
    if (!await (0,_utils_FileSystem__WEBPACK_IMPORTED_MODULE_4__.directoryExists)(config.binaryDir)) {
      await node_fs__WEBPACK_IMPORTED_MODULE_0__.promises.mkdir(config.binaryDir, { recursive: true });
    }
    if (actionHandlers[config.action]) {
      config.description && console.log(config.description);
      await actionHandlers[config.action](config, environment, settings);
    }
  }

  if (config.postAction) {
    await settings.push("postAction");
    const newConfig = {};
    (0,_utils_Primitives__WEBPACK_IMPORTED_MODULE_8__.assignObject)(newConfig, config);
    delete newConfig.action;
    delete newConfig.preAction;
    delete newConfig.postAction;
    (0,_utils_Primitives__WEBPACK_IMPORTED_MODULE_8__.assignObject)(newConfig, config.postAction);
    const newEnvironment = mergeEnvironment(config.postAction.environment, environment);
    await doTargetBuild(ctx, newEnvironment, newConfig, settings);
    await settings.pop();
  }
}

/* harmony default export */ async function __WEBPACK_DEFAULT_EXPORT__(ctx) {
  const userConfig = await ctx.getUserConfig();
  const buildConfig = makeBuildConfig(ctx, userConfig);

  const jsonConfig = JSON.stringify(buildConfig, null, 2);
  const dumpConfigPath = node_path__WEBPACK_IMPORTED_MODULE_1__.posix.join(buildConfig.binaryRoot, BUILD_CONFIG_FILE);
  await (0,_utils_FileSystem__WEBPACK_IMPORTED_MODULE_4__.saveIfDifferent)(dumpConfigPath, jsonConfig);

  const settingsFilename = node_path__WEBPACK_IMPORTED_MODULE_1__.resolve(buildConfig.binaryRoot, BUILD_SETTINGS_FILE);
  const settings = new _utils_SettingsStorage_js__WEBPACK_IMPORTED_MODULE_5__.SettingsStorage(settingsFilename);

  for (const [key, entry] of Object.entries(buildConfig)) {
    if (entry && typeof entry === "object" && entry.action && !entry.disabled) {
      await settings.push(key);
      const completed = await settings.get("completed");
      if (entry.rebuild || !completed) {
        logger.info(`Started action: ${key}`);
        const environment = mergeEnvironment(entry.environment, process.env);
        if (entry.sourceUrl) {
          await doExtractArchive(ctx, environment, entry, settings);
        }
        await doTargetBuild(ctx, environment, entry, settings);
        await settings.set("completed", true);
        logger.info(`Completed action: ${key}`);
      }
      await settings.pop();
    }
  }
}


/***/ }),

/***/ "./src/Constants.js":
/*!**************************!*\
  !*** ./src/Constants.js ***!
  \**************************/
/***/ ((module) => {

module.exports = {
  DEFAULT_PRESET: "main",
  USER_CONFIG: "bitmake.config.mjs",
  REQUEST_ATTEMPTS: 30,
  BUILD_CONFIG_FILE: "BuildConfig.json",
  BUILD_SETTINGS_FILE: "BuildSettings.json",
};


/***/ }),

/***/ "./src/InitHandler.mjs":
/*!*****************************!*\
  !*** ./src/InitHandler.mjs ***!
  \*****************************/
/***/ ((__unused_webpack___webpack_module__, __webpack_exports__, __webpack_require__) => {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (/* export default binding */ __WEBPACK_DEFAULT_EXPORT__)
/* harmony export */ });
/* harmony import */ var node_fs__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! node:fs */ "node:fs");
/* harmony import */ var _utils_FileSystem__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! @/utils/FileSystem */ "./src/utils/FileSystem.ts");
/* harmony import */ var _Constants_js__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! @/Constants.js */ "./src/Constants.js");





/* harmony default export */ async function __WEBPACK_DEFAULT_EXPORT__(ctx)
{
  const preset = ctx.env.preset || _Constants_js__WEBPACK_IMPORTED_MODULE_2__.DEFAULT_PRESET;
  const presetPath = ctx.getPresetPath(preset);
  if (!await (0,_utils_FileSystem__WEBPACK_IMPORTED_MODULE_1__.fileExists)(presetPath))
    throw `Preset '${preset}' is not available`;

  if (await (0,_utils_FileSystem__WEBPACK_IMPORTED_MODULE_1__.fileExists)(ctx.userConfigPath))
    await node_fs__WEBPACK_IMPORTED_MODULE_0__.promises.rm(ctx.userConfigPath);

  await node_fs__WEBPACK_IMPORTED_MODULE_0__.promises.copyFile(presetPath, ctx.userConfigPath);
  console.log(`Preset '${preset}' installed successfully`);
}


/***/ }),

/***/ "./src/MakeScriptContext.js":
/*!**********************************!*\
  !*** ./src/MakeScriptContext.js ***!
  \**********************************/
/***/ ((module, __unused_webpack_exports, __webpack_require__) => {

"use strict";


const fs = __webpack_require__(/*! node:fs */ "node:fs");
const path = __webpack_require__(/*! node:path */ "node:path");

const { UserContext } = __webpack_require__(/*! ./bitmake/UserContext.js */ "./src/bitmake/UserContext.js");
const { PluginContext } = __webpack_require__(/*! @/core/PluginContext */ "./src/core/PluginContext.ts");
const { GlobalContext } = __webpack_require__(/*! ./bitmake/GlobalContext.js */ "./src/bitmake/GlobalContext.js");
const { SystemVariables } = __webpack_require__(/*! ./bitmake/SystemVariables.js */ "./src/bitmake/SystemVariables.js");
const { GoalCollection } = __webpack_require__(/*! @/core/GoalCollection */ "./src/core/GoalCollection.ts");
const { getPathString }  = __webpack_require__(/*! @/utils/FileSystem */ "./src/utils/FileSystem.ts");
const { FilePath } = __webpack_require__(/*! @/core/Path */ "./src/core/Path.ts");
const { importModule }  = __webpack_require__(/*! @/utils/Module */ "./src/utils/Module.ts");
const SysVars = __webpack_require__(/*! @/core/SystemVariables */ "./src/core/SystemVariables.ts");

const PACKAGE_JSON = "package.json";
const MAKE_CACHE = "MakeCache.json";

async function actionMakeScript(config, environment, settings)
{
  process.env = environment;

  SystemVariables.defineVariables(SystemVariables.prototype, SysVars.default);
  const scope = SystemVariables.create();

  const sourceDir = getPathString(config.sourceDir);
  const binaryDir = getPathString(config.binaryDir);

  scope.PROJECT_SOURCE_DIR = sourceDir;
  scope.PROJECT_BINARY_DIR = binaryDir;

  scope.PACKAGE_FILE = scope.PROJECT_SOURCE_DIR.join(PACKAGE_JSON);
  scope.CACHE_FILE = scope.PROJECT_BINARY_DIR.join(MAKE_CACHE);
  scope.SOURCE_DIR = scope.PROJECT_SOURCE_DIR;
  scope.BINARY_DIR = scope.PROJECT_BINARY_DIR;

  const global = GlobalContext.create();
  global.loadCacheVariables(scope.CACHE_FILE);

  const packageJson = await fs.promises.readFile(scope.PACKAGE_FILE.toString(), 'utf8');
  const pkg = JSON.parse(packageJson);

  scope.BUILD_TYPE = config.buildType;
  scope.PROJECT_NAME = pkg.name;
  scope.PROJECT_VERSION = pkg.version;
  scope.PROJECT_DESCRIPTION = pkg.description;
  scope.PROJECT_HOMEPAGE_URL = pkg.homepage;

  if (config.destDir)
    scope.DESTDIR = config.destDir;

  const root = UserContext.create(scope, global);

  if (config.variables) {
    for (const [key, val] of Object.entries(config.variables)) {
      root[key] = val;
    }
  }

  if (root.TOOLCHAIN_FILE) {
    const toolchain = await importModule(root.TOOLCHAIN_FILE);
    if (!toolchain.default)
      throw new Error("Toolchain module has no default export");
    const result = toolchain.default(root);
    if (result instanceof Promise)
      await result;
  }

  const pluginContext = PluginContext.create(scope, global);
  for (const plugin of (root.MAKE_PLUGIN_LIST || [])) {
    const filename = FilePath.create(plugin);
    const module = await importModule(filename.toString());
    if (!module.pluginEntry)
      throw new Error(`Plugin ${filename.basename()} not contain pluginEntry function`);
    const result = module.pluginEntry(pluginContext);
    if (result instanceof Promise)
      await result;
  }

  global.addSubdirectory(root);
  await global.doSubdirectory();
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

  await GoalCollection.buildGoals(goalList);
}

module.exports = {
  actionMakeScript,
};


/***/ }),

/***/ "./src/RunScriptContext.mjs":
/*!**********************************!*\
  !*** ./src/RunScriptContext.mjs ***!
  \**********************************/
/***/ ((__unused_webpack___webpack_module__, __webpack_exports__, __webpack_require__) => {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   RunScriptContext: () => (/* binding */ RunScriptContext)
/* harmony export */ });
/* harmony import */ var node_path__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! node:path */ "node:path");
/* harmony import */ var node_url__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! node:url */ "node:url");
/* harmony import */ var _utils_FileSystem__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! @/utils/FileSystem */ "./src/utils/FileSystem.ts");
/* harmony import */ var _Constants_js__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! @/Constants.js */ "./src/Constants.js");
/* harmony import */ var _core_Types__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! @/core/Types */ "./src/core/Types.ts");
/* harmony import */ var _utils_Module__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(/*! @/utils/Module */ "./src/utils/Module.ts");








const { USER_CONFIG, DEFAULT_PRESET, REQUEST_ATTEMPTS } = _Constants_js__WEBPACK_IMPORTED_MODULE_3__;

class RunScriptContext {
  _nodeExecutable;
  _currentScript;
  _scriptDir;
  _rootDir;
  _workDir;
  _env;
  _userConfig;

  constructor(options)
  {
    this._nodeExecutable = options.nodeExecutable;
    this._currentScript = options.currentScript;
    this._scriptDir = options.scriptDir;
    this._rootDir = options.rootDir;
    this._workDir = options.workDir;
    this._env = Object.seal(Object.freeze(options.env));

    if (options.userConfig) {
      this._userConfig = options.userConfig;
    }
  }

  get nodeExecutable()
  {
    return this._nodeExecutable;
  }

  get currentScript()
  {
    return this._currentScript;
  }

  get scriptDir()
  {
    return this._scriptDir;
  }

  get rootDir()
  {
    return this._rootDir;
  }

  get workDir()
  {
    return this._workDir;
  }

  get env()
  {
    return this._env;
  }

  getPresetPath(preset)
  {
    return node_path__WEBPACK_IMPORTED_MODULE_0__.resolve(this._scriptDir, `preset/${preset}.mjs`);
  }

  get userConfigPath()
  {
    return node_path__WEBPACK_IMPORTED_MODULE_0__.resolve(this._workDir, USER_CONFIG);
  }

  get buildType()
  {
    return this._env.buildType == _core_Types__WEBPACK_IMPORTED_MODULE_4__.DEBUG_BUILD_TYPE ? this._env.buildType : _core_Types__WEBPACK_IMPORTED_MODULE_4__.RELEASE_BUILD_TYPE;
  }

  async getUserConfig()
  {
    if (!this._userConfig) {
      let configPath;
      if (this._env.config) {
        configPath = node_path__WEBPACK_IMPORTED_MODULE_0__.isAbsolute(this._env.config) ? this._env.config : node_path__WEBPACK_IMPORTED_MODULE_0__.resolve(this._workDir, this._env.config);
        if (!await (0,_utils_FileSystem__WEBPACK_IMPORTED_MODULE_2__.fileExists)(configPath))
          throw `Configuration '${this._env.config}' file does not exist`;
      }
      else {
        const userConfigPath = node_path__WEBPACK_IMPORTED_MODULE_0__.resolve(this._workDir, USER_CONFIG);
        if (await (0,_utils_FileSystem__WEBPACK_IMPORTED_MODULE_2__.fileExists)(userConfigPath))
          configPath = userConfigPath;
        else
          configPath = this.getPresetPath(DEFAULT_PRESET);
      }

      let userConfig = {};

      if (configPath) {
        const configUrl = node_url__WEBPACK_IMPORTED_MODULE_1__.pathToFileURL(configPath);
        const configModule = await (0,_utils_Module__WEBPACK_IMPORTED_MODULE_5__.importModule)(configUrl);
        switch (typeof configModule.default) {
        case "function":
          userConfig = configModule.default(this._env, {});
          if (userConfig instanceof Promise)
            userConfig = await userConfig;
          break;
        case "object":
          userConfig = configModule.default;
          break;
        default:
          throw `Unknown user configuration type`;
        }
      }

      this._userConfig = userConfig;
    }
    return this._userConfig;
  }

  get requestAttempts()
  {
    return REQUEST_ATTEMPTS;
  }
};


/***/ }),

/***/ "./src/bitmake/GlobalContext.js":
/*!**************************************!*\
  !*** ./src/bitmake/GlobalContext.js ***!
  \**************************************/
/***/ ((module, __unused_webpack_exports, __webpack_require__) => {

"use strict";


const path = __webpack_require__(/*! node:path */ "node:path");
const fs = __webpack_require__(/*! node:fs */ "node:fs");

const { AbsolutePath } = __webpack_require__(/*! @/core/Path */ "./src/core/Path.ts");
const { fileExists, fileExistsSync } = __webpack_require__(/*! @/utils/FileSystem */ "./src/utils/FileSystem.ts");
const { TargetCollection } = __webpack_require__(/*! @/core//TargetCollection */ "./src/core/TargetCollection.ts");
const { ScriptCollection } = __webpack_require__(/*! @/core/ScriptCollection */ "./src/core/ScriptCollection.ts");
const { InterfaceTarget } = __webpack_require__(/*! @/core/InterfaceTarget */ "./src/core/InterfaceTarget.ts");
const { UnknownTarget } = __webpack_require__(/*! @/core/UnknownTarget */ "./src/core/UnknownTarget.ts");
const { GoalCollection } = __webpack_require__(/*! @/core/GoalCollection */ "./src/core/GoalCollection.ts");
const { InterfaceObjects } = __webpack_require__(/*! @/core/InterfaceObjects */ "./src/core/InterfaceObjects.ts");
const { SourceFile } = __webpack_require__(/*! @/core/SourceFile */ "./src/core/SourceFile.ts");
const { ObjectLibrary, StaticLibrary, SharedLibrary, Executable } = __webpack_require__(/*! @/core/Target */ "./src/core/Target.ts");
const { importModule } = __webpack_require__(/*! @/utils/Module */ "./src/utils/Module.ts");

const requireImpl = eval("require");

const TARGETS = Symbol("TARGETS");
const SCRIPTS = Symbol("SCRIPTS");
const CACHE = Symbol("CACHE");
const UNKNOWN_TARGETS = Symbol("UNKNOWN_TARGETS");
const INTERFACE_SCRIPTS = Symbol("INTERFACE_SCRIPTS");
const INSTALL_LIST = Symbol("INSTALL_LIST");
const SCRIPT_VARIABLES_MAP = Symbol("SCRIPT_VARIABLES_MAP");
const SUBDIR_ALIAS = Symbol("SUBDIR_ALIAS");
const SUBDIR_LIST = Symbol("SUBDIR_LIST");

function GlobalContext() {
  this[TARGETS] = TargetCollection.create();
  this[SCRIPTS] = ScriptCollection.create();
  this[CACHE] = {};
  this[UNKNOWN_TARGETS] = {};
  this[INTERFACE_SCRIPTS] = {};
  this[INSTALL_LIST] = [];
  this[SCRIPT_VARIABLES_MAP] = {};
  this[SUBDIR_ALIAS] = {};
  this[SUBDIR_LIST] = [];
}

GlobalContext.create = () => {
  return Object.seal(new GlobalContext);
}

GlobalContext.prototype = Object.create(Object.prototype, {
  constructor: {
    value: GlobalContext,
    enumerable: false,
  },
  TARGETS: {
    get() { return this[TARGETS]; },
    enumerable: true,
  },
  SCRIPTS: {
    get() { return this[SCRIPTS]; },
    enumerable: true,
  },
  CACHE: {
    get() { return this[CACHE]; },
    enumerable: true,
  },
  UNKNOWN_TARGETS: {
    get() { return this[UNKNOWN_TARGETS]; },
    enumerable: true,
  },
  INTERFACE_SCRIPTS: {
    get() { return this[INTERFACE_SCRIPTS]; },
    enumerable: true,
  },
  INSTALL_LIST: {
    get() { return this[INSTALL_LIST]; },
    enumerable: true,
  },
  SCRIPT_VARIABLES_MAP: {
    get() { return this[SCRIPT_VARIABLES_MAP]; },
    enumerable: true,
  },
  SUBDIR_ALIAS: {
    get() { return this[SUBDIR_ALIAS]; },
    enumerable: true,
  },
});

GlobalContext.prototype.toJSON = function() {
  const json = {};
  for (const key in this)
    json[key] = this[key];
  return json;
}

GlobalContext.prototype.getUknownTarget = function(name) {
  let target = this[UNKNOWN_TARGETS][name];
  if (!target) {
    this[UNKNOWN_TARGETS][name] = target = UnknownTarget.create(name);
  }
  return target;
}

GlobalContext.prototype.addSystemVariables = function(variables) {
  const script = variables.SCRIPT_FILE.toString();
  if (this[SCRIPT_VARIABLES_MAP][script])
    throw new Error(`SystemVariables exists for ${script}`);
  this[SCRIPT_VARIABLES_MAP][script] = variables;
}

GlobalContext.prototype.resolveSubdirectory = function(path) {
  const resolvedPath = this[SUBDIR_ALIAS][path.toString()];
  return resolvedPath || path;
}

GlobalContext.prototype.addSubdirectoryAlias = function(src, dest) {
  this[SUBDIR_ALIAS][src.toString()] = dest;
}

GlobalContext.prototype.loadCacheVariables = function(filename) {
  if (fileExistsSync(filename.toString())) {
    const variables = requireImpl(filename.toString());
    this.addCacheVariables(variables);
  }
}

GlobalContext.prototype.addCacheVariables = function(variables) {
  const cache = this[CACHE];
  for (const [key, entry] of Object.entries(variables)) {
    cache[key] = entry;
  }
}

GlobalContext.prototype.addSubdirectory = function(context) {
  this[SUBDIR_LIST].push(context);
}

GlobalContext.prototype.doSubdirectory = async function() {
  while (this[SUBDIR_LIST].length) {
    const context = this[SUBDIR_LIST].shift();

    const scope = context.__scope();

    let scriptFile;
    const fileList = [ ".js", ".mjs" ].map(i => "MakeScript" + i);
    for (const filename of fileList) {
      const iter = scope.SOURCE_DIR.join(filename).toString();
      if (await fileExists(iter)) {
        scriptFile = iter;
        break;
      }
    }

    if (!scriptFile)
      throw new Error("There are no files from the list " + fileList.join());

    scope.SCRIPT_FILE = scriptFile;
    scope.SCRIPT_DIR = scope.SCRIPT_FILE.dirname();

    this.addSystemVariables(scope);
    this.copyCacheVariables(context);

    const module = await importModule(context.SCRIPT_FILE.toString());

    const cwdSave = process.cwd();
    process.chdir(context.SOURCE_DIR.toString());

    const result = module.default(context);
    if (result instanceof Promise)
      await result;

    process.chdir(cwdSave);
  }
}

function ensureValueByType(type, value) {
  if (Array.isArray(type) ? type.includes(value) : typeof value === type)
    return value;
  throw new Error(`The '${value}' is not a ${type}`);
}

GlobalContext.prototype.copyCacheVariables = function(scope) {
  for (const [name, entry] of Object.entries(this[CACHE])) {
    if (!Object.hasOwn(scope, name)) {
      const type = entry.type || typeof entry.value;
      const description = entry.description || "";
      let value = Array.isArray(entry.value) ? [ ...entry.value ] : entry.value;
      if (value === "${PROJECT_VERSION}")
        value = scope.PROJECT_VERSION;
      else if (value === "${PROJECT_DESCRIPTION}")
        value = scope.PROJECT_DESCRIPTION;
      else if (value === "${PROJECT_HOMEPAGE_URL}")
        value = scope.PROJECT_HOMEPAGE_URL;
      else if (entry.value === "${CMAKE_SYSTEM_PROCESSOR}")
        value = scope.SYSTEM_PROCESSOR;

      const nameSymbol = Symbol(name);
      scope[nameSymbol] = ensureValueByType(type, value);

      Object.defineProperty(scope, name, {
        enumerable: true,
        get() {
          return this[nameSymbol];
        },
        set(value) {
          this[nameSymbol] = ensureValueByType(type, value);
        },
      });
    }
  }
}

GlobalContext.prototype.writeCacheVariables = function(filename) {
  const json = JSON.stringify(this[CACHE], null, 2);
  fs.writeFileSync(filename, json, "utf-8");
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

GlobalContext.prototype.createGoals = function(scope) {
  for (const iter of Object.values(this[UNKNOWN_TARGETS])) {
    const target = this[TARGETS].get(iter.NAME);
    target.addSources(iter.SOURCES);
    target.INCLUDES.push(...iter.INCLUDES);
    target.DEFINES.push(...iter.DEFINES);
    target.COMPILE_OPTIONS.push(...iter.COMPILE_OPTIONS);
    target.LINK_OPTIONS.push(...iter.LINK_OPTIONS);
  }

  for (const iter of Object.values(this[INTERFACE_SCRIPTS])) {
    const script = this[SCRIPTS].get(iter.NAME);
    for (const [key, vals] of Object.entries(iter.PROPERTIES))
      script.addProperty(key, ...vals);
  }

  const goalList = GoalCollection.create();
  for (const [name, script] of Object.entries(this[SCRIPTS].ENTRIES)) {   
    const depends = [ script.FILE.toString() ];
    if (script.INPUT)
      depends.push(script.INPUT.toString());
    const msg = "\x1b[36m" + "Generating " + script.TARGET_SCOPE.BINARY_DIR.relative(script.OUTPUT) + "\x1b[0m";
    const params = { ...script.PROPERTIES, ...script.PARAMS };
    goalList.addScript(script.FILE, "", depends, script.OUTPUT.toString(), scopeValueAsPrimitives(params), msg);
  }

  for (const [name, target] of Object.entries(this[TARGETS].ENTRIES)) {
    const headers = this[TARGETS].allHeadersOf(target);
    const depends = [];
    for (const s of target.SOURCES) {
      if (s instanceof InterfaceObjects) {
        const t = this[TARGETS].get(s.targetName);
        for (const f of t.SOURCES) {
          if (f instanceof SourceFile && f.OBJECT_FILE)
            depends.push(f.OBJECT_FILE.toString());
        }
        continue;
      }

      if (s.HEADER_FILE_ONLY)
        continue;

      fs.mkdirSync(s.OBJECT_FILE_DIR.toString(), { recursive: true });

      const relativeObject = target.TARGET_SCOPE.BINARY_DIR.relative(s.OBJECT_FILE);
      const relativeBinaryDir = scope.PROJECT_BINARY_DIR.relative(target.TARGET_SCOPE.BINARY_DIR);
      const msg = "\x1b[32m" + `Building ${s.LANGUAGE} object ${relativeBinaryDir}/${relativeObject}` + "\x1b[0m";

      const definitions = [
        ...this[TARGETS].allDefinitionsOf(target),
        ...s.DEFINES,
      ];

      const args = [];
      args.push(...definitions.map(i => "-D" + i));
      args.push(...this[TARGETS].allIncludesOf(target).map(i => "-I" + i));
      args.push(...this[TARGETS].allCompileOptionsOf(target));
      if (target.POSITION_INDEPENDENT_CODE)
        args.push("-fPIC");
      args.push(...s.COMPILE_FLAGS.flat());
      args.push("-o", relativeObject);
      args.push("-c", s.FILE);
      const cwd = target.TARGET_SCOPE.BINARY_DIR.toString();

      const command = target.TARGET_SCOPE[s.LANGUAGE + "_COMPILER"].toString();
      const output = target.TARGET_SCOPE.BINARY_DIR.join(relativeObject).toString();
      depends.push(output);

      goalList.addExec(output, [ ...headers, s.FILE ], command, args, cwd, msg);
    }

    const linkOptions = this[TARGETS].allLinkOptionsOf(target);
    if (target instanceof ObjectLibrary) {
      const objs = depends.filter(i => i.endsWith(".o") || i.endsWith(".obj")).map(i => target.FILE_DIR.relative(i));
      if (objs.length) {
        const args = [
          ...linkOptions,
          "-r",
          "-o", target.FILE_NAME,
          ...objs
        ];
        const cwd = target.FILE_DIR.toString();
        const msg = `Linking CXX object library ${target.FILE_NAME}`;
        goalList.addExec(target.FILE.toString(), depends, scope.LINKER, args, cwd, msg);
      }
      else {
        console.log(`No objects for "${target.NAME}"`);
      }
    }

    if (target instanceof StaticLibrary) {
      const objs = depends.filter(i => i.endsWith(".o") || i.endsWith(".obj")).map(i => target.FILE_DIR.relative(i));
      if (objs.length) {
        const args = [ "rc", target.FILE_NAME , ...objs ];
        const cwd = target.FILE_DIR.toString();
        const msg = `Linking CXX static library ${target.FILE_NAME}`;
        goalList.addExec(target.FILE.toString(), depends, scope.AR, args, cwd, msg);
      }
      else {
        console.log(`No objects for "${target.NAME}"`);
      }
    }

    if (target instanceof SharedLibrary) {
      throw new Error("Not implemented");
    }

    if (target instanceof Executable) {
      const objs = depends.filter(i => i.endsWith(".o") || i.endsWith(".obj")).map(i => target.FILE_DIR.relative(i));
      if (objs.length) {
        const libs = this[TARGETS].allLibrariesOf(target);
        const args = [
          ...target.TARGET_SCOPE.CXX_FLAGS,
          ...linkOptions,
          ...objs,
          "-o", target.FILE_NAME,
          ...libs.map(i => target.FILE_DIR.relative(i)),
        ];
        const cwd = target.FILE_DIR.toString();
        const msg = `Linking CXX executable ${target.FILE_NAME}`;
        goalList.addExec(target.FILE.toString(), depends.concat(libs), scope.CXX_COMPILER, args, cwd, msg);
      }
      else {
        console.log(`No objects for "${target.NAME}"`);
      }
    }

    goalList.addTarget(name, [ target.FILE.toString() ], `Built target ${name}`);
  }

  const install_files = [];
  const install_script = path.posix.join(__dirname, "SystemScripts/install_script.js");
  for (const iter of this[INSTALL_LIST]) {
    let src, dest;
    if (iter.VALUE instanceof AbsolutePath) {
      if (scope.PREVENT_INSTALL_FILES)
        continue;
      src = iter.VALUE.toString();
      const rfile = iter.BASE_DIR.relative(iter.VALUE);
      dest = iter.DESTINATION.join(rfile);
    }
    else if (iter.VALUE instanceof InterfaceTarget) {
      const target = this[TARGETS].get(iter.VALUE.targetName);
      src = target.FILE.toString();
      dest = iter.DESTINATION.join(target.FILE_NAME);
    }
    else {
      throw new Error(`Can not install ${iter.VALUE}`)
    }
    if (scope.DESTDIR)
      dest = scope.DESTDIR.join(dest).toString();
    goalList.addScript(install_script, "", [ src ], dest, scopeValueAsPrimitives({src, dest}), "");
    install_files.push(dest);
  }

  if (install_files.length) {
    goalList.addTarget("install", install_files, "");
  }

  goalList.addTarget("all", Object.keys(this[TARGETS].ENTRIES), "");

  return goalList;
}

module.exports = {
  GlobalContext,
};


/***/ }),

/***/ "./src/bitmake/SystemScripts/configure_file.js":
/*!*****************************************************!*\
  !*** ./src/bitmake/SystemScripts/configure_file.js ***!
  \*****************************************************/
/***/ ((module, __unused_webpack_exports, __webpack_require__) => {

const fs = __webpack_require__(/*! node:fs */ "node:fs");
const path = __webpack_require__(/*! node:path */ "node:path");

module.exports = (params) => {
  const content = fs.readFileSync(params.input, "utf-8");
  const newContent = content.replace(/@([_A-Za-z][_A-Za-z0-9]+)@/g, (match, value) => {
    const res = params[value] || "";
    if (Array.isArray(res))
      return res.join("\n");
    return res.toString();
  });
  fs.mkdirSync(path.dirname(params.output), { recursive: true });
  fs.writeFileSync(params.output, newContent, "utf-8");
}


/***/ }),

/***/ "./src/bitmake/SystemScripts/install_script.js":
/*!*****************************************************!*\
  !*** ./src/bitmake/SystemScripts/install_script.js ***!
  \*****************************************************/
/***/ ((module, __unused_webpack_exports, __webpack_require__) => {

const fs = __webpack_require__(/*! node:fs */ "node:fs");
const path = __webpack_require__(/*! node:path */ "node:path");

module.exports = ({src, dest}) => {
  console.log("Installing: " + dest);
  fs.mkdirSync(path.dirname(dest), { recursive: true });
  fs.cpSync(src, dest, { force: true });
}


/***/ }),

/***/ "./src/bitmake/SystemVariables.js":
/*!****************************************!*\
  !*** ./src/bitmake/SystemVariables.js ***!
  \****************************************/
/***/ ((module, __unused_webpack_exports, __webpack_require__) => {

"use strict";


const { ensureBoolean, ensureString } = __webpack_require__(/*! @/utils/StrictType */ "./src/utils/StrictType.ts");
const { AbsolutePath } = __webpack_require__(/*! @/core/Path */ "./src/core/Path.ts");

const DEFINE_MAP = Symbol("DEFINE_MAP");

function SystemVariables() {
  for (const { symbol, initValue } of Object.values(this[DEFINE_MAP] || {})) {
    this[symbol] = Array.isArray(initValue) ? Array.from(initValue) : initValue;
  }
}

SystemVariables.create = function() {
  return Object.seal(new SystemVariables);
}

SystemVariables.prototype = Object.create(Object.prototype, {
  constructor: {
    value: SystemVariables,
    enumerable: false,
  },
});

SystemVariables.defineVariable = function(scope, name, descriptor) {
  if (!scope[DEFINE_MAP])
    scope[DEFINE_MAP] = {};

  const type = descriptor.type || (Array.isArray(descriptor.value) ? "array" : typeof descriptor.value);

  let defineEntry = scope[DEFINE_MAP][name];
  if (!defineEntry) {
    defineEntry = {};
    scope[DEFINE_MAP][name] = defineEntry;
  }

  if (defineEntry.type !== type) {
    defineEntry.symbol = Symbol(name);
  }

  defineEntry.type = type;
  defineEntry.description = descriptor.description || "";

  let ensureValue;
  if (Array.isArray(type)) {
    let itemType;
    for (const iter of type) {
      const it = typeof iter;
      if (!itemType)
        itemType = it;
      else if (itemType !== it)
        throw new Error(`All elements for ${name} must be of the same type`);
    }
    if (itemType !== "boolean" && itemType !== "string")
      throw new Error(`Unknown ${itemType} element type of ${name} variable`);
    ensureValue = (value) => {
      if (type.includes(value))
        return value;
      throw new Error(`The '${value}' is not a ${type}`);
    }
  }
  else if (type === "boolean")
    ensureValue = ensureBoolean;
  else if (type === "string")
    ensureValue = ensureString;
  else if (type === "DirPath")
    ensureValue = AbsolutePath.createDir;
  else if (type === "FilePath")
    ensureValue = AbsolutePath.createFile;
  else if (type === "array")
    /* */;
  else
    throw new Error(`Unknown ${type} type of ${name} variable`);

  if (descriptor.hasOwnProperty("value")) {
    defineEntry.initValue = (type === "array") ? Array.from(descriptor.value) : ensureValue(descriptor.value);
  }
  else {
    defineEntry.initValue = (type === "array") ? [] : null;
  }

  const { symbol } = defineEntry;
  const desc = {
    configurable: true,
    enumerable: true,
    get() { return this[symbol] },
  };

  if (ensureValue)
    desc.set = function(value) { this[symbol] = ensureValue(value) };

  Object.defineProperty(scope, name, desc);
}

SystemVariables.defineVariables = function(scope, descriptors) {
  for (const [ name, descriptor ] of Object.entries(descriptors))
    SystemVariables.defineVariable(scope, name, descriptor);
}

SystemVariables.prototype.toJSON = function() {
  const json = {};
  for (const key in this)
    json[key] = this[key];
  return json;
}

SystemVariables.prototype.clone = function() {
  const o = Object.create(SystemVariables.prototype);

  for (const { symbol } of Object.values(this[DEFINE_MAP] || {})) {
    o[symbol] = Array.isArray(this[symbol]) ? Array.from(this[symbol]) : this[symbol];
  }

  return Object.seal(o);
}

module.exports = {
  SystemVariables,
};


/***/ }),

/***/ "./src/bitmake/UserContext.js":
/*!************************************!*\
  !*** ./src/bitmake/UserContext.js ***!
  \************************************/
/***/ ((module, __unused_webpack_exports, __webpack_require__) => {

"use strict";


const os = __webpack_require__(/*! node:os */ "node:os");
const path = __webpack_require__(/*! node:path */ "node:path");

const { copyValue } = __webpack_require__(/*! @/utils/Primitives */ "./src/utils/Primitives.ts");
const { fileExistsSync } = __webpack_require__(/*! @/utils/FileSystem */ "./src/utils/FileSystem.ts");
const { AbsolutePath } = __webpack_require__(/*! @/core/Path */ "./src/core/Path.ts");
const { InterfaceTarget } = __webpack_require__(/*! @/core/InterfaceTarget */ "./src/core/InterfaceTarget.ts");
const { InterfaceScript } = __webpack_require__(/*! @/core/InterfaceScript */ "./src/core/InterfaceScript.ts");
const { InstallEntity } = __webpack_require__(/*! @/core/InstallEntity */ "./src/core/InstallEntity.ts");
const { ObjectLibrary, StaticLibrary, SharedLibrary, Executable, BaseTarget } = __webpack_require__(/*! @/core/Target */ "./src/core/Target.ts");
const { IncludeDirectory } = __webpack_require__(/*! @/core/IncludeDirectory */ "./src/core/IncludeDirectory.ts");
const { SystemVariables } = __webpack_require__(/*! ./SystemVariables.js */ "./src/bitmake/SystemVariables.js");
const { CustomScript } = __webpack_require__(/*! @/core/CustomScript */ "./src/core/CustomScript.ts");

const requireImpl = eval("require");

const currentFunctionName = () => {
  const stack = new Error().stack.split("\n")[2];
  return stack.match(/at (\S+)/)?.[1];
};

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

  const props = Object.getOwnPropertyDescriptors(SystemVariables.prototype);
  for (const [name, desc] of Object.entries(props)) {
    if (desc.get || desc.set) {
      const newDesc = { enumerable: desc.enumerable, configurable: false };
      if (desc.get)
        newDesc.get = function() { return this[SCOPE][name]; }
      if (desc.set)
        newDesc.set = function(value) { this[SCOPE][name] = value; }
      Object.defineProperty(this, name, newDesc);
    }
  }
}

UserContext.create = (scope, global) => {
  return new UserContext(scope, global);
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

UserContext.prototype.__scope = function() {
  return this[SCOPE];
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
  for (const iter of dirs.flat(1)) {
    this.INCLUDES.push(IncludeDirectory.create(iter, this.SOURCE_DIR));
  }
}

UserContext.prototype.addSubdirectory = function(sourceDir, binaryDir) {
  this.logDebug(currentFunctionName());

  binaryDir = binaryDir || path.isAbsolute(sourceDir) ? undefined : sourceDir;

  const SOURCE_DIR = path.isAbsolute(sourceDir) ? AbsolutePath.create(sourceDir) : this.SOURCE_DIR.join(sourceDir);
  const BINARY_DIR = path.isAbsolute(binaryDir) ? AbsolutePath.create(binaryDir) : this.BINARY_DIR.join(binaryDir);

  const newScope = this[SCOPE].clone();

  newScope.SOURCE_DIR = AbsolutePath.create(this[GLOBAL].resolveSubdirectory(SOURCE_DIR).toString());
  newScope.BINARY_DIR = BINARY_DIR;
  
  const newContex = UserContext.create(newScope, this[GLOBAL]);
  for (const [key, val] of Object.entries(this)) {
    if (!Object.hasOwn(SystemVariables.prototype, key))
      newContex[key] = val;
  }

  this[GLOBAL].addSubdirectory(newContex);
}

UserContext.prototype.addCustomScript = function(name, params) {
  this.logDebug(currentFunctionName(), name);

  const newScope = this[SCOPE].clone();
  const target = CustomScript.create(newScope, name, params);
  this[GLOBAL].SCRIPTS.set(name, target);
  return target;
}

UserContext.prototype.target = function(name) {
  const utarget = this[GLOBAL].getUknownTarget(name);
  return InterfaceTarget.create(this[SCOPE], utarget);
}

UserContext.prototype.script = function(name) {
  this.logDebug(currentFunctionName(), name);

  let script = this[GLOBAL].INTERFACE_SCRIPTS[name];
  if (!script) {
    script = InterfaceScript.create(name);
    this[GLOBAL].INTERFACE_SCRIPTS[name] = script;
  }

  return script;
}

UserContext.prototype.install = function(value, params) {
  for (const it of [ value ].flat(1)) {
    const iter = (it instanceof BaseTarget) ? this.target(it.NAME) : it;
    const entity = InstallEntity.create(this, iter, params);
    this[GLOBAL].INSTALL_LIST.push(entity);
  }
}

UserContext.prototype.addStaticLibrary = function(name, ...sources) {
  this.logDebug(currentFunctionName(), name);

  const target = StaticLibrary.create(this[SCOPE], name);
  target.addSources(...sources);

  this[GLOBAL].TARGETS.set(name, target);
  return target;
}

UserContext.prototype.addObjectLibrary = function(name, ...sources) {
  this.logDebug(currentFunctionName(), name);

  const target = ObjectLibrary.create(this[SCOPE], name);
  target.addSources(...sources);

  this[GLOBAL].TARGETS.set(name, target);
  return target;
}

UserContext.prototype.addSharedLibrary = function(name, ...sources) {
  this.logDebug(currentFunctionName(), name);

  const target = SharedLibrary.create(this[SCOPE], name);
  target.addSources(...sources);

  this[GLOBAL].TARGETS.set(name, target);
  return target;
}

UserContext.prototype.addExecutable = function(name, ...sources) {
  this.logDebug(currentFunctionName(), name);

  const target = Executable.create(this[SCOPE], name);
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
  const module = requireImpl(scriptPath.toString());
  module(scopeValueAsPrimitives(options));
}

UserContext.prototype.toJSON = function() {
  const json = {};
  for (const key in this)
    json[key] = this[key];
  return json;
}

module.exports = {
  UserContext,
};


/***/ }),

/***/ "./src/cmake/Constants.ts":
/*!********************************!*\
  !*** ./src/cmake/Constants.ts ***!
  \********************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   BooleanType: () => (/* binding */ BooleanType),
/* harmony export */   BuildType: () => (/* binding */ BuildType),
/* harmony export */   CMAKE_LISTS_TXT: () => (/* binding */ CMAKE_LISTS_TXT),
/* harmony export */   ValueType: () => (/* binding */ ValueType)
/* harmony export */ });
/*
 * MIT License
 *
 * Copyright (c) 2025  Yurii Yakubin (yurii.yakubin@gmail.com)
 *
 * Permission is granted to use, copy, modify, and distribute this software
 * under the MIT License. See LICENSE file for details.
 */
var BooleanType;
(function (BooleanType) {
    BooleanType["ON"] = "ON";
    BooleanType["OFF"] = "OFF";
})(BooleanType || (BooleanType = {}));
;
// Enum representing value types used in CMake cache variables
var ValueType;
(function (ValueType) {
    // Represents a full path to a file
    ValueType["FILEPATH"] = "FILEPATH";
    // Represents a path to a directory
    ValueType["PATH"] = "PATH";
    // Represents a boolean value (true/false)
    ValueType["BOOL"] = "BOOL";
    // Represents a generic string value
    ValueType["STRING"] = "STRING";
})(ValueType || (ValueType = {}));
;
// BuildType representing common CMake build types
var BuildType;
(function (BuildType) {
    // Debug build type: includes debug symbols, no optimization
    BuildType["Debug"] = "Debug";
    // Release build type: optimized code, no debug info
    BuildType["Release"] = "Release";
    // Release with debug info: optimized with debug symbols included
    BuildType["RelWithDebInfo"] = "RelWithDebInfo";
    // Minimum size release: optimized for smallest binary size
    BuildType["MinSizeRel"] = "MinSizeRel";
})(BuildType || (BuildType = {}));
;
// The default name of the main CMake build configuration file
const CMAKE_LISTS_TXT = "CMakeLists.txt";


/***/ }),

/***/ "./src/cmake/Helper.ts":
/*!*****************************!*\
  !*** ./src/cmake/Helper.ts ***!
  \*****************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   convertToValue: () => (/* binding */ convertToValue)
/* harmony export */ });
/* harmony import */ var _cmake_Constants__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! @/cmake/Constants */ "./src/cmake/Constants.ts");
/*
 * MIT License
 *
 * Copyright (c) 2025  Yurii Yakubin (yurii.yakubin@gmail.com)
 *
 * Permission is granted to use, copy, modify, and distribute this software
 * under the MIT License. See LICENSE file for details.
 */

function convertToValue(obj) {
    if (Array.isArray(obj))
        return obj.map(i => convertToValue(i)).join(";");
    if (typeof obj === "boolean")
        return obj ? _cmake_Constants__WEBPACK_IMPORTED_MODULE_0__.BooleanType.ON : _cmake_Constants__WEBPACK_IMPORTED_MODULE_0__.BooleanType.OFF;
    return obj.toString();
}


/***/ }),

/***/ "./src/core/CustomScript.ts":
/*!**********************************!*\
  !*** ./src/core/CustomScript.ts ***!
  \**********************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   CustomScript: () => (/* binding */ CustomScript)
/* harmony export */ });
/* harmony import */ var node_path__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! node:path */ "node:path");
/* harmony import */ var node_path__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(node_path__WEBPACK_IMPORTED_MODULE_0__);
/* harmony import */ var node_url__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! node:url */ "node:url");
/* harmony import */ var node_url__WEBPACK_IMPORTED_MODULE_1___default = /*#__PURE__*/__webpack_require__.n(node_url__WEBPACK_IMPORTED_MODULE_1__);
/* harmony import */ var _utils_StrictType__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! @/utils/StrictType */ "./src/utils/StrictType.ts");
/* harmony import */ var _core_Path__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! @/core/Path */ "./src/core/Path.ts");
/*
 * MIT License
 *
 * Copyright (c) 2025  Yurii Yakubin (yurii.yakubin@gmail.com)
 *
 * Permission is granted to use, copy, modify, and distribute this software
 * under the MIT License. See LICENSE file for details.
 */




const TARGET_SCOPE = Symbol("TARGET_SCOPE");
const NAME = Symbol("NAME");
const FILE = Symbol("FILE");
const INPUT = Symbol("INPUT");
const OUTPUT = Symbol("OUTPUT");
const PARAMS = Symbol("PARAMS");
const PROPERTIES = Symbol("PROPERTIES");
const __filename = node_url__WEBPACK_IMPORTED_MODULE_1___default().fileURLToPath("file:///mnt/c/opt/work/source/darkit-sdk/external/bitmake/src/core/CustomScript.ts");
const __dirname = node_path__WEBPACK_IMPORTED_MODULE_0___default().dirname(__filename);
const SYSTEM_SCRIPTS_DIR = _core_Path__WEBPACK_IMPORTED_MODULE_3__.AbsolutePath.create(__dirname).resolve("../bitmake/SystemScripts");
class CustomScript {
    [TARGET_SCOPE];
    [NAME];
    [FILE];
    [INPUT];
    [OUTPUT];
    [PARAMS];
    [PROPERTIES];
    constructor(scope, name, params) {
        this[TARGET_SCOPE] = scope;
        this[NAME] = (0,_utils_StrictType__WEBPACK_IMPORTED_MODULE_2__.ensureString)(name);
        if (!params || !params.script || !params.output)
            throw new Error(`Uknown params ${JSON.stringify(params)}`);
        if (/[.\/\\]/.test(params.script))
            this[FILE] = scope.SOURCE_DIR.resolve(params.script);
        else
            this[FILE] = SYSTEM_SCRIPTS_DIR.join(params.script + ".js");
        this[INPUT] = params.input || null;
        this[OUTPUT] = params.output;
        this[PARAMS] = params;
        this[PROPERTIES] = {};
    }
    static create(scope, name, params) {
        return Object.seal(new CustomScript(scope, name, params));
    }
    addProperty(key, ...vals) {
        let property = this[PROPERTIES][key];
        if (!property) {
            property = [];
            this[PROPERTIES][key] = property;
        }
        vals.forEach(v => property.push(v));
    }
    get NAME() {
        return this[NAME];
    }
    get TARGET_SCOPE() {
        return this[TARGET_SCOPE];
    }
    get FILE() {
        return this[FILE];
    }
    get INPUT() {
        return this[INPUT];
    }
    set INPUT(value) {
        this[INPUT] = this[TARGET_SCOPE].SOURCE_DIR.resolve(value);
    }
    get OUTPUT() {
        return this[OUTPUT];
    }
    set OUTPUT(value) {
        this[OUTPUT] = _core_Path__WEBPACK_IMPORTED_MODULE_3__.AbsolutePath.create(value);
    }
    get PARAMS() {
        return this[PARAMS];
    }
    set PARAMS(value) {
        this[PARAMS] = value;
    }
    get PROPERTIES() {
        return this[PROPERTIES];
    }
    toString() {
        return this[NAME].toString();
    }
    toJSON() {
        return {
            NAME: this.NAME,
            TARGET_SCOPE: this.TARGET_SCOPE,
            FILE: this.FILE,
            INPUT: this.INPUT,
            OUTPUT: this.OUTPUT,
            PARAMS: this.PARAMS,
            PROPERTIES: this.PROPERTIES,
        };
    }
}
;


/***/ }),

/***/ "./src/core/GoalCollection.ts":
/*!************************************!*\
  !*** ./src/core/GoalCollection.ts ***!
  \************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   GoalCollection: () => (/* binding */ GoalCollection)
/* harmony export */ });
/* harmony import */ var node_path__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! node:path */ "node:path");
/* harmony import */ var node_path__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(node_path__WEBPACK_IMPORTED_MODULE_0__);
/* harmony import */ var node_fs__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! node:fs */ "node:fs");
/* harmony import */ var node_fs__WEBPACK_IMPORTED_MODULE_1___default = /*#__PURE__*/__webpack_require__.n(node_fs__WEBPACK_IMPORTED_MODULE_1__);
/* harmony import */ var node_child_process__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! node:child_process */ "node:child_process");
/* harmony import */ var node_child_process__WEBPACK_IMPORTED_MODULE_2___default = /*#__PURE__*/__webpack_require__.n(node_child_process__WEBPACK_IMPORTED_MODULE_2__);
/* harmony import */ var _utils_Module__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! @/utils/Module */ "./src/utils/Module.ts");
/* harmony import */ var _bitmake_SystemScripts_configure_file_js__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! @/bitmake/SystemScripts/configure_file.js */ "./src/bitmake/SystemScripts/configure_file.js");
/* harmony import */ var _bitmake_SystemScripts_configure_file_js__WEBPACK_IMPORTED_MODULE_4___default = /*#__PURE__*/__webpack_require__.n(_bitmake_SystemScripts_configure_file_js__WEBPACK_IMPORTED_MODULE_4__);
/* harmony import */ var _bitmake_SystemScripts_install_script_js__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(/*! @/bitmake/SystemScripts/install_script.js */ "./src/bitmake/SystemScripts/install_script.js");
/* harmony import */ var _bitmake_SystemScripts_install_script_js__WEBPACK_IMPORTED_MODULE_5___default = /*#__PURE__*/__webpack_require__.n(_bitmake_SystemScripts_install_script_js__WEBPACK_IMPORTED_MODULE_5__);
/*
 * MIT License
 *
 * Copyright (c) 2025  Yurii Yakubin (yurii.yakubin@gmail.com)
 *
 * Permission is granted to use, copy, modify, and distribute this software
 * under the MIT License. See LICENSE file for details.
 */






const ENTRIES = Symbol("ENTRIES");
var GoalType;
(function (GoalType) {
    GoalType["SCRIPT"] = "script";
    GoalType["EXEC"] = "exec";
    GoalType["TARGET"] = "target";
})(GoalType || (GoalType = {}));
;
;
;
;
class GoalCollection {
    [ENTRIES];
    constructor() {
        this[ENTRIES] = new Array;
    }
    get ENTRIES() {
        return this[ENTRIES];
    }
    static create() {
        return Object.seal(new GoalCollection);
    }
    findScriptByOutput(output) {
        if (!output)
            return undefined;
        return this[ENTRIES].find((i) => i.type === GoalType.SCRIPT && i.output === output);
    }
    hasScriptByOutput(output) {
        return !!this.findScriptByOutput(output);
    }
    addScript(script, name, depends, output, params, msg) {
        if (this.hasScriptByOutput(output.toString()))
            throw new Error(`Output "${output}" exists`);
        this[ENTRIES].push({ name, type: GoalType.SCRIPT, script, output, depends, params, msg });
    }
    addExec(output, depends, command, args, cwd, msg) {
        this[ENTRIES].push({ name: "", type: GoalType.EXEC, depends, output, command, args, cwd, msg });
    }
    addTarget(name, depends, msg) {
        this[ENTRIES].push({ name, type: GoalType.TARGET, depends, msg, output: "" });
    }
    getTarget(name) {
        return this[ENTRIES].find((i) => i.type === GoalType.TARGET && i.name === name);
    }
    addTargetListImpl(name, result) {
        if (result.find(i => i.name === name || i.output === name)) {
            return;
        }
        const goal = this[ENTRIES].find(i => i.name === name || i.output === name);
        if (!goal) {
            return;
        }
        for (const iter of goal.depends) {
            this.addTargetListImpl(iter.toString(), result);
        }
        result.push(goal);
    }
    getTargetList(name) {
        const result = new Array;
        this.addTargetListImpl(name, result);
        return result;
    }
    toJSON() {
        return this[ENTRIES];
    }
    static async buildGoals(collection) {
        let msgCount = 0;
        for (const iter of collection)
            msgCount += iter.msg ? 1 : 0;
        let msgIndex = 0;
        for (const goal of collection) {
            const { type, msg } = goal;
            if (msg) {
                const relationOfLength = Math.round((++msgIndex / msgCount) * 100);
                const percent = "[" + relationOfLength.toString().padStart(3, " ") + "%] ";
                console.info(percent + msg);
            }
            if (type === GoalType.SCRIPT) {
                const { script, params } = goal;
                let module;
                if (script.toString() === node_path__WEBPACK_IMPORTED_MODULE_0___default().posix.join(__dirname, "SystemScripts/configure_file.js"))
                    module = (_bitmake_SystemScripts_configure_file_js__WEBPACK_IMPORTED_MODULE_4___default());
                else if (script.toString() === node_path__WEBPACK_IMPORTED_MODULE_0___default().posix.join(__dirname, "SystemScripts/install_script.js"))
                    module = (_bitmake_SystemScripts_install_script_js__WEBPACK_IMPORTED_MODULE_5___default());
                else
                    module = (await (0,_utils_Module__WEBPACK_IMPORTED_MODULE_3__.importModule)(script.toString())).default;
                const result = module(params);
                if (result instanceof Promise) {
                    await result;
                }
            }
            else if (type === GoalType.EXEC) {
                const { command, args, cwd, output } = goal;
                node_fs__WEBPACK_IMPORTED_MODULE_1___default().mkdirSync(node_path__WEBPACK_IMPORTED_MODULE_0___default().posix.dirname(output), { recursive: true });
                const result = (0,node_child_process__WEBPACK_IMPORTED_MODULE_2__.spawnSync)(command, args, { cwd, encoding: "utf-8" });
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
            else if (type === GoalType.TARGET) {
            }
        }
    }
}
;


/***/ }),

/***/ "./src/core/IncludeDirectory.ts":
/*!**************************************!*\
  !*** ./src/core/IncludeDirectory.ts ***!
  \**************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   IncludeDirectory: () => (/* binding */ IncludeDirectory)
/* harmony export */ });
/*
 * MIT License
 *
 * Copyright (c) 2025  Yurii Yakubin (yurii.yakubin@gmail.com)
 *
 * Permission is granted to use, copy, modify, and distribute this software
 * under the MIT License. See LICENSE file for details.
 */
const NAME = Symbol("NAME");
const PATH = Symbol("PATH");
class IncludeDirectory {
    [NAME];
    [PATH];
    constructor(dirname, baseDir) {
        this[NAME] = dirname.toString();
        this[PATH] = baseDir.resolve(dirname);
    }
    static create(dirname, baseDir) {
        return Object.seal(new IncludeDirectory(dirname, baseDir));
    }
    get NAME() {
        return this[NAME];
    }
    get PATH() {
        return this[PATH];
    }
    toString() {
        return this[PATH].toString();
    }
    toJSON() {
        return {
            NAME: this.NAME,
            PATH: this.PATH,
        };
    }
}
;


/***/ }),

/***/ "./src/core/InstallEntity.ts":
/*!***********************************!*\
  !*** ./src/core/InstallEntity.ts ***!
  \***********************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   InstallEntity: () => (/* binding */ InstallEntity)
/* harmony export */ });
/* harmony import */ var _core_InterfaceTarget__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! @/core/InterfaceTarget */ "./src/core/InterfaceTarget.ts");
/* harmony import */ var _core_Path__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! @/core/Path */ "./src/core/Path.ts");
/*
 * MIT License
 *
 * Copyright (c) 2025  Yurii Yakubin (yurii.yakubin@gmail.com)
 *
 * Permission is granted to use, copy, modify, and distribute this software
 * under the MIT License. See LICENSE file for details.
 */


const VALUE = Symbol("VALUE");
const DESTINATION = Symbol("DESTINATION");
const BASE_DIR = Symbol("BASE_DIR");
class InstallEntity {
    [VALUE];
    [DESTINATION];
    [BASE_DIR];
    constructor(scope, value, params) {
        let destination;
        let baseDir;
        if (typeof params === "string")
            destination = params;
        else if (params) {
            destination = params.destination;
            baseDir = params.baseDir;
        }
        if (!destination)
            throw new Error(`Parameter destination is not specified`);
        if (baseDir)
            baseDir = scope.SOURCE_DIR.resolve(baseDir);
        if (typeof value === "string" || value instanceof _core_Path__WEBPACK_IMPORTED_MODULE_1__.AbsolutePath) {
            value = scope.SOURCE_DIR.resolve(value.toString());
            value = _core_Path__WEBPACK_IMPORTED_MODULE_1__.AbsolutePath.createFile(value);
            baseDir = baseDir || value.dirname();
        }
        else if (!(value instanceof _core_InterfaceTarget__WEBPACK_IMPORTED_MODULE_0__.InterfaceTarget)) {
            throw new Error(`Not supportet value of ${value}`);
        }
        this[VALUE] = value;
        this[DESTINATION] = _core_Path__WEBPACK_IMPORTED_MODULE_1__.AbsolutePath.createDir(scope.INSTALL_PREFIX.resolve(destination.toString()).toString());
        this[BASE_DIR] = baseDir ? _core_Path__WEBPACK_IMPORTED_MODULE_1__.AbsolutePath.createDir(baseDir.toString()) : null;
    }
    static create(scope, value, params) {
        return Object.seal(new InstallEntity(scope, value, params));
    }
    get VALUE() {
        return this[VALUE];
    }
    get DESTINATION() {
        return this[DESTINATION];
    }
    get BASE_DIR() {
        return this[BASE_DIR];
    }
    toJSON() {
        return {
            VALUE: this.VALUE,
            DESTINATION: this.DESTINATION,
            BASE_DIR: this.BASE_DIR,
        };
    }
}
;


/***/ }),

/***/ "./src/core/InterfaceIncludes.ts":
/*!***************************************!*\
  !*** ./src/core/InterfaceIncludes.ts ***!
  \***************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   InterfaceIncludes: () => (/* binding */ InterfaceIncludes)
/* harmony export */ });
/*
 * MIT License
 *
 * Copyright (c) 2025  Yurii Yakubin (yurii.yakubin@gmail.com)
 *
 * Permission is granted to use, copy, modify, and distribute this software
 * under the MIT License. See LICENSE file for details.
 */
const NAME = Symbol("NAME");
class InterfaceIncludes {
    [NAME];
    constructor(name) {
        this[NAME] = name;
    }
    get targetName() {
        return this[NAME];
    }
    toString() {
        return "${" + this[NAME] + ".includes}";
    }
    toJSON() {
        return this.toString();
    }
    static create(name) {
        return Object.seal(new InterfaceIncludes(name));
    }
    static ensureInstance(value) {
        if (value instanceof InterfaceIncludes)
            return value;
        throw new Error(`The '${value}' is not a InterfaceIncludes`);
    }
}
;


/***/ }),

/***/ "./src/core/InterfaceObjects.ts":
/*!**************************************!*\
  !*** ./src/core/InterfaceObjects.ts ***!
  \**************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   InterfaceObjects: () => (/* binding */ InterfaceObjects)
/* harmony export */ });
/*
 * MIT License
 *
 * Copyright (c) 2025  Yurii Yakubin (yurii.yakubin@gmail.com)
 *
 * Permission is granted to use, copy, modify, and distribute this software
 * under the MIT License. See LICENSE file for details.
 */
const NAME = Symbol("NAME");
class InterfaceObjects {
    [NAME];
    constructor(name) {
        this[NAME] = name;
    }
    static create(name) {
        return Object.seal(new InterfaceObjects(name));
    }
    static ensureInstance(value) {
        if (value instanceof InterfaceObjects)
            return value;
        throw new Error(`The '${value}' is not a InterfaceObjects`);
    }
    get targetName() {
        return this[NAME];
    }
    toString() {
        return "${" + this[NAME] + ".objects}";
    }
    toJSON() {
        return this.toString();
    }
}
;


/***/ }),

/***/ "./src/core/InterfaceScript.ts":
/*!*************************************!*\
  !*** ./src/core/InterfaceScript.ts ***!
  \*************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   InterfaceScript: () => (/* binding */ InterfaceScript)
/* harmony export */ });
/*
 * MIT License
 *
 * Copyright (c) 2025  Yurii Yakubin (yurii.yakubin@gmail.com)
 *
 * Permission is granted to use, copy, modify, and distribute this software
 * under the MIT License. See LICENSE file for details.
 */
const NAME = Symbol("NAME");
const PROPERTIES = Symbol("PROPERTIES");
class InterfaceScript {
    [NAME];
    [PROPERTIES];
    constructor(name) {
        this[NAME] = name;
        this[PROPERTIES] = {};
    }
    get NAME() {
        return this[NAME];
    }
    get PROPERTIES() {
        return this[PROPERTIES];
    }
    addProperty(key, ...vals) {
        let property = this[PROPERTIES][key];
        if (!property) {
            property = [];
            this[PROPERTIES][key] = property;
        }
        vals.forEach(v => property.push(v));
    }
    toJSON() {
        return {
            NAME: this.NAME,
            PROPERTIES: this.PROPERTIES,
        };
    }
    toString() {
        return this[NAME];
    }
    static create(name) {
        return Object.seal(new InterfaceScript(name));
    }
    static ensureInstance(value) {
        if (value instanceof InterfaceScript)
            return value;
        throw new Error(`The '${value}' is not a InterfaceScript`);
    }
}
;


/***/ }),

/***/ "./src/core/InterfaceTarget.ts":
/*!*************************************!*\
  !*** ./src/core/InterfaceTarget.ts ***!
  \*************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   InterfaceTarget: () => (/* binding */ InterfaceTarget)
/* harmony export */ });
/* harmony import */ var _core_Path__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! @/core/Path */ "./src/core/Path.ts");
/* harmony import */ var _core_InterfaceIncludes__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! @/core/InterfaceIncludes */ "./src/core/InterfaceIncludes.ts");
/* harmony import */ var _core_InterfaceObjects__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! @/core/InterfaceObjects */ "./src/core/InterfaceObjects.ts");
/* harmony import */ var _core_IncludeDirectory__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! @/core/IncludeDirectory */ "./src/core/IncludeDirectory.ts");
/* harmony import */ var _core_SourceFile__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! @/core/SourceFile */ "./src/core/SourceFile.ts");
/*
 * MIT License
 *
 * Copyright (c) 2025  Yurii Yakubin (yurii.yakubin@gmail.com)
 *
 * Permission is granted to use, copy, modify, and distribute this software
 * under the MIT License. See LICENSE file for details.
 */





const UNKNOWN_TARGET = Symbol("UNKNOWN_TARGET");
const SCOPE = Symbol("SCOPE");
class InterfaceTarget {
    [SCOPE];
    [UNKNOWN_TARGET];
    constructor(scope, utarget) {
        this[SCOPE] = scope.clone();
        this[UNKNOWN_TARGET] = utarget;
    }
    static create(scope, utarget) {
        return Object.seal(new InterfaceTarget(scope, utarget));
    }
    static ensureInstance(value) {
        if (value instanceof InterfaceTarget)
            return value;
        throw new Error(`The '${value}' is not a InterfaceTarget`);
    }
    get targetName() {
        return this[UNKNOWN_TARGET].NAME;
    }
    get includes() {
        return _core_InterfaceIncludes__WEBPACK_IMPORTED_MODULE_1__.InterfaceIncludes.create(this.targetName);
    }
    get objects() {
        return _core_InterfaceObjects__WEBPACK_IMPORTED_MODULE_2__.InterfaceObjects.create(this.targetName);
    }
    toJSON() {
        return this.toString();
    }
    toString() {
        return "${" + this.targetName + "}";
    }
    addSources(...sources) {
        for (let it of sources.flat(1)) {
            if (it instanceof _core_InterfaceObjects__WEBPACK_IMPORTED_MODULE_2__.InterfaceObjects || it instanceof _core_SourceFile__WEBPACK_IMPORTED_MODULE_4__.SourceFile) { }
            else if (typeof it === "string" || _core_Path__WEBPACK_IMPORTED_MODULE_0__.AbsolutePath.isAbsolute(it))
                it = _core_SourceFile__WEBPACK_IMPORTED_MODULE_4__.SourceFile.create(this[SCOPE], it);
            else
                throw new Error(`Not support instance ${it}`);
            this[UNKNOWN_TARGET].SOURCES.push(it);
        }
    }
    addIncludes(...includes) {
        for (const it of includes.flat(1)) {
            let VALUE;
            if (it instanceof _core_InterfaceIncludes__WEBPACK_IMPORTED_MODULE_1__.InterfaceIncludes)
                VALUE = it;
            else if (typeof it === "string" || _core_Path__WEBPACK_IMPORTED_MODULE_0__.AbsolutePath.isAbsolute(it))
                VALUE = _core_IncludeDirectory__WEBPACK_IMPORTED_MODULE_3__.IncludeDirectory.create(it, this[SCOPE].SOURCE_DIR);
            else
                throw new Error(`Not support instance ${it}`);
            this[UNKNOWN_TARGET].INCLUDES.push({ VALUE, PUBLIC_ONLY: false });
        }
    }
    addPublicIncludes(...includes) {
        for (const it of includes.flat(1)) {
            let VALUE;
            if (it instanceof _core_InterfaceIncludes__WEBPACK_IMPORTED_MODULE_1__.InterfaceIncludes)
                VALUE = it;
            else if (typeof it === "string" || _core_Path__WEBPACK_IMPORTED_MODULE_0__.AbsolutePath.isAbsolute(it))
                VALUE = _core_IncludeDirectory__WEBPACK_IMPORTED_MODULE_3__.IncludeDirectory.create(it, this[SCOPE].SOURCE_DIR);
            else
                throw new Error(`Not support instance ${it}`);
            this[UNKNOWN_TARGET].INCLUDES.push({ VALUE, PUBLIC_ONLY: true });
        }
    }
    addDefinitions(...definitions) {
        for (const VALUE of definitions.flat(1))
            this[UNKNOWN_TARGET].DEFINES.push({ VALUE });
    }
    addPublicDefinitions(...definitions) {
        for (const VALUE of definitions.flat(1))
            this[UNKNOWN_TARGET].DEFINES.push({ VALUE, PUBLIC_ONLY: true });
    }
    addCompileOptions(...options) {
        for (const it of options.flat(1)) {
            this[UNKNOWN_TARGET].COMPILE_OPTIONS.push({ VALUE: it });
        }
    }
    addLinkOptions(...options) {
        for (const it of options.flat(1)) {
            this[UNKNOWN_TARGET].LINK_OPTIONS.push({ VALUE: it });
        }
    }
    addPublicCompileOptions(...options) {
        for (const it of options.flat(1)) {
            this[UNKNOWN_TARGET].COMPILE_OPTIONS.push({ VALUE: it, PUBLIC_ONLY: true });
        }
    }
    addPublicLinkOptions(...options) {
        for (const it of options.flat(1)) {
            this[UNKNOWN_TARGET].LINK_OPTIONS.push({ VALUE: it, PUBLIC_ONLY: true });
        }
    }
}
;


/***/ }),

/***/ "./src/core/Path.ts":
/*!**************************!*\
  !*** ./src/core/Path.ts ***!
  \**************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   AbsolutePath: () => (/* binding */ AbsolutePath),
/* harmony export */   DirPath: () => (/* binding */ DirPath),
/* harmony export */   FilePath: () => (/* binding */ FilePath)
/* harmony export */ });
/* harmony import */ var node_path__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! node:path */ "node:path");
/* harmony import */ var node_path__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(node_path__WEBPACK_IMPORTED_MODULE_0__);
/* harmony import */ var node_url__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! node:url */ "node:url");
/* harmony import */ var node_url__WEBPACK_IMPORTED_MODULE_1___default = /*#__PURE__*/__webpack_require__.n(node_url__WEBPACK_IMPORTED_MODULE_1__);
/*
 * MIT License
 *
 * Copyright (c) 2025  Yurii Yakubin (yurii.yakubin@gmail.com)
 *
 * Permission is granted to use, copy, modify, and distribute this software
 * under the MIT License. See LICENSE file for details.
 */


const PATH = Symbol("PATH");
var PathType;
(function (PathType) {
    PathType[PathType["DirType"] = 0] = "DirType";
    PathType[PathType["FileType"] = 1] = "FileType";
})(PathType || (PathType = {}));
;
const _pathMap = new Map();
class AbsolutePath {
    [PATH];
    constructor(filepath) {
        if (!node_path__WEBPACK_IMPORTED_MODULE_0___default().isAbsolute(filepath))
            throw new Error(`Not supported relative path of "${filepath}"`);
        this[PATH] = filepath;
    }
    join(...paths) {
        const filepath = node_path__WEBPACK_IMPORTED_MODULE_0___default().posix.join(this[PATH], ...paths.map(i => i.toString()));
        return AbsolutePath.create(filepath);
    }
    dirname() {
        return AbsolutePath.create(node_path__WEBPACK_IMPORTED_MODULE_0___default().posix.dirname(this[PATH]));
    }
    basename() {
        return node_path__WEBPACK_IMPORTED_MODULE_0___default().basename(this[PATH]);
    }
    relative(to) {
        return node_path__WEBPACK_IMPORTED_MODULE_0___default().posix.relative(this[PATH], (to instanceof AbsolutePath) ? to[PATH] : to);
    }
    resolve(...paths) {
        return AbsolutePath.create(node_path__WEBPACK_IMPORTED_MODULE_0___default().posix.resolve(this[PATH], ...paths.map(i => i.toString())));
    }
    match(regexp) {
        return this[PATH].match(regexp);
    }
    toURL() {
        return node_url__WEBPACK_IMPORTED_MODULE_1___default().pathToFileURL(this[PATH]);
    }
    toURLString() {
        return this.toURL().toString();
    }
    toString() {
        return this[PATH];
    }
    valueOf() {
        return this[PATH];
    }
    toJSON() {
        return this[PATH];
    }
    static isAbsolute(filepath) {
        if (filepath instanceof AbsolutePath)
            return true;
        return node_path__WEBPACK_IMPORTED_MODULE_0___default().isAbsolute(filepath);
    }
    static create(filepath) {
        if (filepath instanceof AbsolutePath)
            return filepath;
        if (typeof filepath !== "string")
            throw new Error(`Not correct type of ${filepath}`);
        return new AbsolutePath(filepath);
    }
    static ensureInstance(value) {
        if (value instanceof AbsolutePath)
            return value;
        throw new Error(`The '${value}' is not a AbsolutePath`);
    }
    static createDir(filepath) {
        const key = filepath.toString();
        const type = _pathMap.get(key);
        if (type === undefined)
            _pathMap.set(key, PathType.DirType);
        else if (type !== PathType.DirType)
            throw new Error(`The '${filepath}' is not a DirPath`);
        return AbsolutePath.create(filepath);
    }
    static createFile(filepath) {
        const key = filepath.toString();
        const type = _pathMap.get(key);
        if (type === undefined)
            _pathMap.set(key, PathType.FileType);
        else if (type !== PathType.FileType)
            throw new Error(`The '${filepath}' is not a FilePath`);
        return AbsolutePath.create(filepath);
    }
}
;
class BasePath {
    [PATH];
    constructor(pathStr) {
        if (!node_path__WEBPACK_IMPORTED_MODULE_0___default().isAbsolute(pathStr))
            throw new Error(`Not supported relative path of "${pathStr}"`);
        this[PATH] = pathStr;
    }
    match(regexp) {
        return this[PATH].match(regexp);
    }
    join(...paths) {
        return node_path__WEBPACK_IMPORTED_MODULE_0___default().posix.join(this[PATH], ...paths.map(i => i.toString()));
    }
    dirname() {
        return node_path__WEBPACK_IMPORTED_MODULE_0___default().posix.dirname(this[PATH]);
    }
    basename() {
        return node_path__WEBPACK_IMPORTED_MODULE_0___default().basename(this[PATH]);
    }
    relative(to) {
        return node_path__WEBPACK_IMPORTED_MODULE_0___default().posix.relative(this[PATH], to.toString());
    }
    resolve(...paths) {
        return node_path__WEBPACK_IMPORTED_MODULE_0___default().posix.resolve(this[PATH], ...paths.map(i => i.toString()));
    }
    toURL() {
        return node_url__WEBPACK_IMPORTED_MODULE_1___default().pathToFileURL(this[PATH]);
    }
    get PATH() {
        return this[PATH];
    }
    toString() {
        return this[PATH];
    }
    toJSON() {
        return this[PATH];
    }
}
;
const _paths = new Map();
class FilePath extends BasePath {
    constructor(pathStr) {
        super(pathStr);
    }
    static ensureInstance(value) {
        if (value instanceof FilePath)
            return value;
        throw new Error(`The '${value}' is not a FilePath`);
    }
    static create(path) {
        if (path instanceof FilePath)
            return path;
        if (typeof path !== "string")
            throw new Error(`The '${path}' is not a string`);
        let filePath = _paths.get(path);
        if (filePath)
            return FilePath.ensureInstance(filePath);
        filePath = Object.seal(new FilePath(path));
        _paths.set(path, filePath);
        return filePath;
    }
}
class DirPath extends BasePath {
    constructor(pathStr) {
        super(pathStr);
    }
    static ensureInstance(value) {
        if (value instanceof DirPath)
            return value;
        throw new Error(`The '${value}' is not a DirPath`);
    }
    static create(path) {
        if (path instanceof DirPath)
            return path;
        if (typeof path !== "string")
            throw new Error(`The '${path}' is not a string`);
        let dirPath = _paths.get(path);
        if (dirPath)
            return DirPath.ensureInstance(dirPath);
        dirPath = Object.seal(new DirPath(path));
        _paths.set(path, dirPath);
        return dirPath;
    }
}
;


/***/ }),

/***/ "./src/core/PluginContext.ts":
/*!***********************************!*\
  !*** ./src/core/PluginContext.ts ***!
  \***********************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   PluginContext: () => (/* binding */ PluginContext)
/* harmony export */ });
/* harmony import */ var _core_Path__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! @/core/Path */ "./src/core/Path.ts");
/*
 * MIT License
 *
 * Copyright (c) 2025  Yurii Yakubin (yurii.yakubin@gmail.com)
 *
 * Permission is granted to use, copy, modify, and distribute this software
 * under the MIT License. See LICENSE file for details.
 */

const GLOBAL = Symbol("GLOBAL");
const SCOPE = Symbol("SCOPE");
class PluginContext {
    [SCOPE];
    [GLOBAL];
    constructor(scope, global) {
        this[SCOPE] = scope;
        this[GLOBAL] = global;
    }
    static create(protoScope, global) {
        const ctx = Object.create(protoScope);
        ctx[SCOPE] = protoScope;
        ctx[GLOBAL] = global;
        const proto = PluginContext.prototype;
        const names = Object.getOwnPropertyNames(proto).filter(name => typeof proto[name] === 'function' && name !== 'constructor');
        for (const name of names) {
            ctx[name] = proto[name];
        }
        return Object.seal(ctx);
    }
    addSubdirectoryAlias(src, dest) {
        this[GLOBAL].addSubdirectoryAlias(_core_Path__WEBPACK_IMPORTED_MODULE_0__.AbsolutePath.createDir(src), _core_Path__WEBPACK_IMPORTED_MODULE_0__.AbsolutePath.createDir(dest));
    }
    toJSON() {
        return {};
    }
}
;


/***/ }),

/***/ "./src/core/ScriptCollection.ts":
/*!**************************************!*\
  !*** ./src/core/ScriptCollection.ts ***!
  \**************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   ScriptCollection: () => (/* binding */ ScriptCollection)
/* harmony export */ });
/*
 * MIT License
 *
 * Copyright (c) 2025  Yurii Yakubin (yurii.yakubin@gmail.com)
 *
 * Permission is granted to use, copy, modify, and distribute this software
 * under the MIT License. See LICENSE file for details.
 */
const ENTRIES = Symbol("ENTRIES");
class ScriptCollection {
    [ENTRIES];
    constructor() {
        this[ENTRIES] = {};
    }
    static create() {
        return Object.seal(new ScriptCollection);
    }
    get ENTRIES() {
        return this[ENTRIES];
    }
    get(name) {
        return this[ENTRIES][name];
    }
    set(name, target) {
        if (this[ENTRIES][name])
            throw new Error(`Script "${name}" exists`);
        this[ENTRIES][name] = target;
    }
    toJSON() {
        return this[ENTRIES];
    }
}
;


/***/ }),

/***/ "./src/core/SourceFile.ts":
/*!********************************!*\
  !*** ./src/core/SourceFile.ts ***!
  \********************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   SourceFile: () => (/* binding */ SourceFile)
/* harmony export */ });
/* harmony import */ var _utils_StrictType__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! @/utils/StrictType */ "./src/utils/StrictType.ts");
/*
 * MIT License
 *
 * Copyright (c) 2025  Yurii Yakubin (yurii.yakubin@gmail.com)
 *
 * Permission is granted to use, copy, modify, and distribute this software
 * under the MIT License. See LICENSE file for details.
 */

const NAME = Symbol("NAME");
const LANGUAGE = Symbol("LANGUAGE");
const HEADER_FILE_ONLY = Symbol("HEADER_FILE_ONLY");
const DEFINES = Symbol("DEFINES");
const COMPILE_FLAGS = Symbol("COMPILE_FLAGS");
const FILE = Symbol("FILE");
const OBJECT_FILE = Symbol("OBJECT_FILE");
const _languageExtensions = {
    ASM: [".asm", ".s"],
    C: [".c"],
    CXX: [".cpp", ".cc", ".cxx"],
};
function isSupportLanguage(language) {
    return _languageExtensions.hasOwnProperty(language);
}
function getFileLanguage(filename) {
    const filenameLowerCase = filename.toString().toLowerCase();
    for (const [language, extensions] of Object.entries(_languageExtensions)) {
        for (const iter of extensions) {
            if (filenameLowerCase.endsWith(iter))
                return language;
        }
    }
    return "";
}
function makeLanguage(value) {
    if (isSupportLanguage(value))
        return value;
    throw new Error(`Language "${value}" is not supported`);
}
class SourceFile {
    [NAME];
    [LANGUAGE];
    [HEADER_FILE_ONLY];
    [FILE];
    [OBJECT_FILE];
    [DEFINES];
    [COMPILE_FLAGS];
    constructor(scope, filename) {
        this[NAME] = filename.toString();
        const fname = scope.SOURCE_DIR.resolve(filename);
        const language = getFileLanguage(fname);
        this[LANGUAGE] = language;
        this[HEADER_FILE_ONLY] = !language;
        this[FILE] = fname;
        this[OBJECT_FILE] = null;
        this[DEFINES] = [];
        this[COMPILE_FLAGS] = !language ? [] : [
            ...scope[language + "_FLAGS"],
            ...scope[language + "_FLAGS_" + scope.BUILD_TYPE.toUpperCase()],
        ];
    }
    static create(scope, filename) {
        return Object.seal(new SourceFile(scope, filename));
    }
    get NAME() {
        return this[NAME];
    }
    get LANGUAGE() {
        return this[LANGUAGE];
    }
    get HEADER_FILE_ONLY() {
        return this[HEADER_FILE_ONLY];
    }
    set HEADER_FILE_ONLY(value) {
        this[HEADER_FILE_ONLY] = (0,_utils_StrictType__WEBPACK_IMPORTED_MODULE_0__.ensureBoolean)(value);
    }
    get DEFINES() {
        return this[DEFINES];
    }
    get COMPILE_FLAGS() {
        return this[COMPILE_FLAGS];
    }
    get FILE() {
        return this[FILE];
    }
    get FILE_DIR() {
        return this[FILE].dirname();
    }
    get FILE_NAME() {
        return this[FILE].basename();
    }
    get OBJECT_FILE() {
        return this[OBJECT_FILE];
    }
    set OBJECT_FILE(value) {
        this[OBJECT_FILE] = value;
    }
    get OBJECT_FILE_DIR() {
        return this[OBJECT_FILE] ? this[OBJECT_FILE].dirname() : null;
    }
    get OBJECT_FILE_NAME() {
        return this[OBJECT_FILE] ? this[OBJECT_FILE].basename() : null;
    }
    toJSON() {
        return {
            NAME: this.NAME,
            LANGUAGE: this.LANGUAGE,
            HEADER_FILE_ONLY: this.HEADER_FILE_ONLY,
            DEFINES: this.DEFINES,
            COMPILE_FLAGS: this.COMPILE_FLAGS,
            FILE: this.FILE,
            FILE_DIR: this.FILE_DIR,
            FILE_NAME: this.FILE_NAME,
            OBJECT_FILE: this.OBJECT_FILE,
            OBJECT_FILE_DIR: this.OBJECT_FILE_DIR,
            OBJECT_FILE_NAME: this.OBJECT_FILE_NAME,
        };
    }
}


/***/ }),

/***/ "./src/core/SourceFileList.ts":
/*!************************************!*\
  !*** ./src/core/SourceFileList.ts ***!
  \************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   SourceFileList: () => (/* binding */ SourceFileList)
/* harmony export */ });
/* harmony import */ var _core_SourceFile__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! @/core/SourceFile */ "./src/core/SourceFile.ts");
/*
 * MIT License
 *
 * Copyright (c) 2025  Yurii Yakubin (yurii.yakubin@gmail.com)
 *
 * Permission is granted to use, copy, modify, and distribute this software
 * under the MIT License. See LICENSE file for details.
 */

const SOURCES = Symbol("SOURCES");
class SourceFileList {
    [SOURCES];
    constructor(scope, sources) {
        this[SOURCES] = [];
        for (const iter of sources) {
            if (!(iter instanceof _core_SourceFile__WEBPACK_IMPORTED_MODULE_0__.SourceFile))
                throw new Error(`Item ${iter} is not SourceFile`);
            this[SOURCES].push(iter);
        }
    }
    static create(scope, sources) {
        return Object.seal(new SourceFileList(scope, sources));
    }
    addDefinitions(...definitions) {
        for (const iter of definitions.flat())
            this[SOURCES].forEach(i => i.DEFINES.push(iter));
    }
    addCompileFlags(...flags) {
        for (const iter of flags.flat())
            this[SOURCES].forEach(i => i.COMPILE_FLAGS.push(iter));
    }
    sourceAt(index) {
        return this[SOURCES][index];
    }
    sourceCount(index) {
        return this[SOURCES].length;
    }
    toJSON() {
        return this[SOURCES];
    }
}
;


/***/ }),

/***/ "./src/core/SystemVariables.ts":
/*!*************************************!*\
  !*** ./src/core/SystemVariables.ts ***!
  \*************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (__WEBPACK_DEFAULT_EXPORT__)
/* harmony export */ });
/* harmony import */ var node_os__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! node:os */ "node:os");
/* harmony import */ var node_os__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(node_os__WEBPACK_IMPORTED_MODULE_0__);
/* harmony import */ var _core_Types__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! @/core/Types */ "./src/core/Types.ts");
/*
 * MIT License
 *
 * Copyright (c) 2025  Yurii Yakubin (yurii.yakubin@gmail.com)
 *
 * Permission is granted to use, copy, modify, and distribute this software
 * under the MIT License. See LICENSE file for details.
 */


/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = ({
    SYSTEM_NAME: {
        description: "Defines the target OS for the build, used in cross-compilation and native builds",
        value: "Linux",
    },
    SYSTEM_PROCESSOR: {
        description: "Defines the target CPU architecture",
        value: "wasm32",
    },
    PROJECT_NAME: {
        description: "Name of the current project",
        value: "",
    },
    PROJECT_VERSION: {
        description: "Version of the current project",
        value: "",
    },
    PROJECT_DESCRIPTION: {
        description: "Description of the current project",
        value: "",
    },
    PROJECT_HOMEPAGE_URL: {
        description: "Homepage URL of the current project",
        value: "",
    },
    PROJECT_SOURCE_DIR: {
        description: "Absolute path to the top-level source directory of the project",
        type: "DirPath",
    },
    PROJECT_BINARY_DIR: {
        description: "Absolute path to the top-level build (binary) directory of the project",
        type: "DirPath",
    },
    SCRIPT_FILE: {
        description: "Full path to the current MakeScript file being processed",
        type: "FilePath",
    },
    SCRIPT_DIR: {
        description: "Directory of the current MakeScript file being processed",
        type: "DirPath",
    },
    PACKAGE_FILE: {
        description: "Filename of project manifest containing metadata and dependencies",
        type: "FilePath",
    },
    CACHE_FILE: {
        description: "Default filename of the BitMake cache storing settings",
        type: "FilePath",
    },
    BUILD_TYPE: {
        description: "Specifies the build configuration for controlling optimization levels and debug information in the build process",
        type: [_core_Types__WEBPACK_IMPORTED_MODULE_1__.DEBUG_BUILD_TYPE, _core_Types__WEBPACK_IMPORTED_MODULE_1__.RELEASE_BUILD_TYPE],
        value: _core_Types__WEBPACK_IMPORTED_MODULE_1__.RELEASE_BUILD_TYPE,
    },
    INSTALL_PREFIX: {
        description: "The root directory where files will be installed by default",
        type: "DirPath",
        value: "/usr",
    },
    DESTDIR: {
        description: "Temporary installation root",
        type: "DirPath",
    },
    SOURCE_DIR: {
        description: "Path to the source directory currently being processed",
        type: "DirPath",
    },
    BINARY_DIR: {
        description: "Path to the binary directory currently being processed",
        type: "DirPath",
    },
    POSITION_INDEPENDENT_CODE: {
        description: "Enables Position-Independent Code (PIC) for building shared libraries",
        value: false,
    },
    PREVENT_INSTALL_FILES: {
        description: "Prevent installation of files",
        value: false,
    },
    HOST_SYSTEM_NAME: {
        description: "Specifies the OS of the machine running",
        value: node_os__WEBPACK_IMPORTED_MODULE_0___default().type(),
    },
    INCLUDES: {
        description: "Paths searched for header files",
        value: [],
    },
    ASM_COMPILER: {
        description: "Path to the assembler compiler detected",
        value: "clang",
    },
    ASM_FLAGS: {
        description: "Flags passed to the assembler compiler",
        value: [],
    },
    ASM_FLAGS_DEBUG: {
        description: "Additional assembler flags used when building in Debug mode",
        value: ["-g"],
    },
    ASM_FLAGS_RELEASE: {
        description: "Additional assembler flags used when building in Release mode",
        value: ["-O3", "-DNDEBUG"],
    },
    C_COMPILER: {
        description: "Path to the C compiler detected",
        value: "clang",
    },
    C_FLAGS: {
        description: "Flags passed to the C compiler",
        value: [],
    },
    C_FLAGS_DEBUG: {
        description: "Additional C compiler flags used when building in Debug mode",
        value: ["-g"],
    },
    C_FLAGS_RELEASE: {
        description: "Additional C compiler flags used when building in Release mode",
        value: ["-O3", "-DNDEBUG"],
    },
    CXX_COMPILER: {
        description: "Path to the C++ compiler detected",
        value: "clang++",
    },
    CXX_FLAGS: {
        description: "Flags passed to the C compiler",
        value: [],
    },
    CXX_FLAGS_DEBUG: {
        description: "Additional C++ compiler flags used when building in Debug mode",
        value: ["-g"],
    },
    CXX_FLAGS_RELEASE: {
        description: "Additional C++ compiler flags used when building in Release mode",
        value: ["-O3", "-DNDEBUG"],
    },
    AR: {
        description: "Path to the archiver tool used to create static libraries",
        value: "llvm-ar",
    },
    RANLIB: {
        description: "Tool used to generate an index to the contents of an archive (static library)",
        value: "llvm-ranlib",
    },
    LINKER: {
        description: "Path to the linker used to link object files and libraries into executables",
        value: "wasm-ld",
    },
    NM: {
        description: "Path to the tool used to list symbols from object files or archives",
        value: "llvm-nm",
    },
    OBJCOPY: {
        description: "Path to the tool used to copy and translate object files",
        value: "llvm-objcopy",
    },
    OBJDUMP: {
        description: "Path to the tool used to display information about object files, such as disassembly",
        value: "llvm-objdump",
    },
    STRIP: {
        description: "Path to the tool used to remove symbols from object files or executables to reduce size",
        value: "llvm-strip",
    },
    OBJECT_LIBRARY_PREFIX: {
        description: "Prefix used for object libraries",
        value: "",
    },
    OBJECT_LIBRARY_SUFFIX: {
        description: "Suffix used for object library files",
        value: ".o",
    },
    OBJECT_LINKER_FLAGS: {
        description: "Flags passed to the linker when creating object libraries",
        value: [],
    },
    STATIC_LIBRARY_PREFIX: {
        description: "Prefix used for static library files",
        value: "lib",
    },
    STATIC_LIBRARY_SUFFIX: {
        description: "Suffix used for static library files",
        value: ".a",
    },
    STATIC_LINKER_FLAGS: {
        description: "Flags passed to the linker when creating static libraries",
        value: [],
    },
    SHARED_LIBRARY_PREFIX: {
        description: "Prefix used for shared library files",
        value: "lib",
    },
    SHARED_LIBRARY_SUFFIX: {
        description: "Suffix used for shared library files",
        value: ".so",
    },
    SHARED_LINKER_FLAGS: {
        description: "Flags passed to the linker when creating shared libraries",
        value: [],
    },
    EXECUTABLE_SUFFIX: {
        description: "Suffix used for executable files",
        value: "",
    },
    EXE_LINKER_FLAGS: {
        description: "Flags passed to the linker when creating executables",
        value: [],
    },
    GLOBAL_CONTEXT_JSON: {
        description: "Filename for JSON of the Global context",
        type: "FilePath",
    },
    TARGET_GOALS_JSON: {
        description: "Filename for JSON of the Target Goals",
        type: "FilePath",
    },
});


/***/ }),

/***/ "./src/core/Target.ts":
/*!****************************!*\
  !*** ./src/core/Target.ts ***!
  \****************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   BaseLibrary: () => (/* binding */ BaseLibrary),
/* harmony export */   BaseTarget: () => (/* binding */ BaseTarget),
/* harmony export */   Executable: () => (/* binding */ Executable),
/* harmony export */   ObjectLibrary: () => (/* binding */ ObjectLibrary),
/* harmony export */   SharedLibrary: () => (/* binding */ SharedLibrary),
/* harmony export */   StaticLibrary: () => (/* binding */ StaticLibrary)
/* harmony export */ });
/* harmony import */ var _utils_StrictType__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! @/utils/StrictType */ "./src/utils/StrictType.ts");
/* harmony import */ var _core_SourceFile__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! @/core/SourceFile */ "./src/core/SourceFile.ts");
/* harmony import */ var _core_SourceFileList__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! @/core/SourceFileList */ "./src/core/SourceFileList.ts");
/* harmony import */ var _core_IncludeDirectory__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! @/core/IncludeDirectory */ "./src/core/IncludeDirectory.ts");
/* harmony import */ var _core_InterfaceTarget__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! @/core/InterfaceTarget */ "./src/core/InterfaceTarget.ts");
/* harmony import */ var _core_InterfaceIncludes__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(/*! @/core/InterfaceIncludes */ "./src/core/InterfaceIncludes.ts");
/* harmony import */ var _core_InterfaceObjects__WEBPACK_IMPORTED_MODULE_6__ = __webpack_require__(/*! @/core/InterfaceObjects */ "./src/core/InterfaceObjects.ts");
/* harmony import */ var _core_Path__WEBPACK_IMPORTED_MODULE_7__ = __webpack_require__(/*! @/core/Path */ "./src/core/Path.ts");
/*
 * MIT License
 *
 * Copyright (c) 2025  Yurii Yakubin (yurii.yakubin@gmail.com)
 *
 * Permission is granted to use, copy, modify, and distribute this software
 * under the MIT License. See LICENSE file for details.
 */








const NAME = Symbol("NAME");
const TARGET_SCOPE = Symbol("TARGET_SCOPE");
const OUTPUT_NAME = Symbol("OUTPUT_NAME");
const COMPILE_OPTIONS = Symbol("COMPILE_OPTIONS");
const PREFIX = Symbol("PREFIX");
const SUFFIX = Symbol("SUFFIX");
const LINK_OPTIONS = Symbol("LINK_OPTIONS");
const INCLUDES = Symbol("INCLUDES");
const DEFINES = Symbol("DEFINES");
const SOURCES = Symbol("SOURCES");
const LIBRARIES = Symbol("LIBRARIES");
const POSITION_INDEPENDENT_CODE = Symbol("POSITION_INDEPENDENT_CODE");
const reservedTagetNames = ["all", "install"];
function ensureTargetName(name) {
    if (typeof name !== "string")
        throw new Error(`Target "${name}" is not string type`);
    if (reservedTagetNames.includes(name))
        throw new Error(`Target "${name}" is reserved name`);
    return name;
}
class BaseTarget {
    [NAME];
    [TARGET_SCOPE];
    [OUTPUT_NAME];
    [PREFIX];
    [SUFFIX];
    [COMPILE_OPTIONS];
    [LINK_OPTIONS];
    [SOURCES];
    [LIBRARIES];
    [INCLUDES];
    [DEFINES];
    [POSITION_INDEPENDENT_CODE];
    constructor(scope, name) {
        this[NAME] = ensureTargetName(name);
        this[TARGET_SCOPE] = scope.clone();
        this[OUTPUT_NAME] = (0,_utils_StrictType__WEBPACK_IMPORTED_MODULE_0__.ensureString)(name);
        this[PREFIX] = "";
        this[SUFFIX] = "";
        this[COMPILE_OPTIONS] = [];
        this[LINK_OPTIONS] = [];
        this[SOURCES] = [];
        this[LIBRARIES] = [];
        this[INCLUDES] = scope.INCLUDES.map((VALUE) => { return { VALUE }; });
        this[DEFINES] = [];
        this[POSITION_INDEPENDENT_CODE] = scope.POSITION_INDEPENDENT_CODE;
    }
    get NAME() {
        return this[NAME];
    }
    get TARGET_SCOPE() {
        return this[TARGET_SCOPE];
    }
    get OUTPUT_NAME() {
        return this[OUTPUT_NAME];
    }
    set OUTPUT_NAME(value) {
        this[OUTPUT_NAME] = (0,_utils_StrictType__WEBPACK_IMPORTED_MODULE_0__.ensureString)(value);
    }
    get COMPILE_OPTIONS() {
        return this[COMPILE_OPTIONS];
    }
    get PREFIX() {
        return this[PREFIX];
    }
    set PREFIX(value) {
        this[PREFIX] = (0,_utils_StrictType__WEBPACK_IMPORTED_MODULE_0__.ensureString)(value);
    }
    get SUFFIX() {
        return this[SUFFIX];
    }
    set SUFFIX(value) {
        this[SUFFIX] = (0,_utils_StrictType__WEBPACK_IMPORTED_MODULE_0__.ensureString)(value);
    }
    get LINK_OPTIONS() {
        return this[LINK_OPTIONS];
    }
    get INCLUDES() {
        return this[INCLUDES];
    }
    get DEFINES() {
        return this[DEFINES];
    }
    get SOURCES() {
        return this[SOURCES];
    }
    get LIBRARIES() {
        return this[LIBRARIES];
    }
    get FILE_DIR() {
        return this[TARGET_SCOPE].BINARY_DIR;
    }
    get FILE_NAME() {
        return this.PREFIX + this.OUTPUT_NAME + this.SUFFIX;
    }
    get FILE() {
        return this.FILE_DIR.join(this.FILE_NAME);
    }
    get POSITION_INDEPENDENT_CODE() {
        return this[POSITION_INDEPENDENT_CODE];
    }
    addSources(...sources) {
        for (let it of sources.flat(1)) {
            if (it instanceof _core_InterfaceObjects__WEBPACK_IMPORTED_MODULE_6__.InterfaceObjects || it instanceof _core_SourceFile__WEBPACK_IMPORTED_MODULE_1__.SourceFile) { }
            else if (typeof it === "string" || _core_Path__WEBPACK_IMPORTED_MODULE_7__.AbsolutePath.isAbsolute(it))
                it = _core_SourceFile__WEBPACK_IMPORTED_MODULE_1__.SourceFile.create(this[TARGET_SCOPE], it);
            else
                throw new Error(`Not support instance ${it}`);
            if (it instanceof _core_SourceFile__WEBPACK_IMPORTED_MODULE_1__.SourceFile && it.LANGUAGE) {
                const rfile1 = this[TARGET_SCOPE].BINARY_DIR.relative(it.FILE);
                const rfile2 = this[TARGET_SCOPE].SOURCE_DIR.relative(it.FILE);
                const rfile = (rfile2.length < rfile1.length ? rfile2 : rfile1).replace("../", "__/");
                it.OBJECT_FILE = this[TARGET_SCOPE].BINARY_DIR.join("MakeFiles", this[NAME] + ".dir", rfile + ".obj");
            }
            this[SOURCES].push(it);
        }
    }
    addIncludes(...includes) {
        for (const it of includes.flat(1)) {
            let VALUE;
            if (it instanceof _core_InterfaceIncludes__WEBPACK_IMPORTED_MODULE_5__.InterfaceIncludes)
                VALUE = it;
            else if (typeof it === "string" || _core_Path__WEBPACK_IMPORTED_MODULE_7__.AbsolutePath.isAbsolute(it))
                VALUE = _core_IncludeDirectory__WEBPACK_IMPORTED_MODULE_3__.IncludeDirectory.create(it, this[TARGET_SCOPE].SOURCE_DIR);
            else
                throw new Error(`Not support instance ${it}`);
            this[INCLUDES].push({ VALUE }); // IncludeDirectory[]
        }
    }
    addLibraries(...libraries) {
        for (const it of libraries.flat(1)) {
            this[LIBRARIES].push({ VALUE: _core_InterfaceTarget__WEBPACK_IMPORTED_MODULE_4__.InterfaceTarget.ensureInstance(it) });
        }
    }
    addCompileOptions(...options) {
        for (const it of options.flat(1)) {
            this[COMPILE_OPTIONS].push({ VALUE: it });
        }
    }
    addLinkOptions(...options) {
        for (const it of options.flat(1)) {
            this[LINK_OPTIONS].push({ VALUE: it });
        }
    }
    getSourceFiles(...sources) {
        const result = [];
        for (const it of sources.flat(1)) {
            const filename = this[TARGET_SCOPE].SOURCE_DIR.resolve(it).toString();
            const src = this[SOURCES].find(i => i instanceof _core_SourceFile__WEBPACK_IMPORTED_MODULE_1__.SourceFile && i.FILE.toString() === filename);
            if (!src)
                throw new Error(`Cannot find "${it}"`);
            result.push(src);
        }
        if (result.length)
            return _core_SourceFileList__WEBPACK_IMPORTED_MODULE_2__.SourceFileList.create(this[TARGET_SCOPE], result);
        return _core_SourceFileList__WEBPACK_IMPORTED_MODULE_2__.SourceFileList.create(this[TARGET_SCOPE], this[SOURCES].filter(i => i instanceof _core_SourceFile__WEBPACK_IMPORTED_MODULE_1__.SourceFile));
    }
    setPrefix(prefix) {
        this[PREFIX] = prefix;
    }
    setSuffix(suffix) {
        this[SUFFIX] = suffix;
    }
    setOutputName(outputName) {
        this[OUTPUT_NAME] = outputName;
    }
    addDefinitions(...definitions) {
        for (const VALUE of definitions.flat(1))
            this[DEFINES].push({ VALUE });
    }
    toJSON() {
        return {
            NAME: this.NAME,
            TARGET_SCOPE: this.TARGET_SCOPE,
            OUTPUT_NAME: this.OUTPUT_NAME,
            COMPILE_OPTIONS: this.COMPILE_OPTIONS,
            PREFIX: this.PREFIX,
            SUFFIX: this.SUFFIX,
            LINK_OPTIONS: this.LINK_OPTIONS,
            INCLUDES: this.INCLUDES,
            DEFINES: this.DEFINES,
            SOURCES: this.SOURCES,
            LIBRARIES: this.LIBRARIES,
            FILE_DIR: this.FILE_DIR,
            FILE_NAME: this.FILE_NAME,
            FILE: this.FILE,
        };
    }
}
;
class BaseLibrary extends BaseTarget {
    constructor(scope, name) {
        super(scope, name);
    }
    addPublicIncludes(...includes) {
        for (const it of includes.flat(1)) {
            let VALUE;
            if (it instanceof _core_InterfaceIncludes__WEBPACK_IMPORTED_MODULE_5__.InterfaceIncludes)
                VALUE = it;
            else if (typeof it === "string" || _core_Path__WEBPACK_IMPORTED_MODULE_7__.AbsolutePath.isAbsolute(it))
                VALUE = _core_IncludeDirectory__WEBPACK_IMPORTED_MODULE_3__.IncludeDirectory.create(it, this[TARGET_SCOPE].SOURCE_DIR);
            else
                throw new Error(`Not support instance ${it}`);
            this[INCLUDES].push({ VALUE, PUBLIC_ONLY: true }); // IncludeDirectory[]
        }
    }
    addPublicDefinitions(...definitions) {
        for (const VALUE of definitions.flat(1))
            this[DEFINES].push({ VALUE, PUBLIC_ONLY: true });
    }
    addPublicLibraries(...libraries) {
        for (const it of libraries.flat(1)) {
            this[LIBRARIES].push({ VALUE: _core_InterfaceTarget__WEBPACK_IMPORTED_MODULE_4__.InterfaceTarget.ensureInstance(it), PUBLIC_ONLY: true });
        }
    }
    addPublicCompileOptions(...options) {
        for (const it of options.flat(1)) {
            this[COMPILE_OPTIONS].push({ VALUE: it, PUBLIC_ONLY: true });
        }
    }
    addPublicLinkOptions(...options) {
        for (const it of options.flat(1)) {
            this[LINK_OPTIONS].push({ VALUE: it, PUBLIC_ONLY: true });
        }
    }
}
;
class ObjectLibrary extends BaseLibrary {
    constructor(scope, name) {
        super(scope, name);
        this.PREFIX = scope.OBJECT_LIBRARY_PREFIX;
        this.SUFFIX = scope.OBJECT_LIBRARY_SUFFIX;
        this.LINK_OPTIONS.push(...scope.OBJECT_LINKER_FLAGS.map((VALUE) => { return { VALUE }; }));
    }
    static create(scope, name) {
        return Object.seal(new ObjectLibrary(scope, name));
    }
}
;
class StaticLibrary extends BaseLibrary {
    constructor(scope, name) {
        super(scope, name);
        this.PREFIX = scope.STATIC_LIBRARY_PREFIX;
        this.SUFFIX = scope.STATIC_LIBRARY_SUFFIX;
        this.LINK_OPTIONS.push(...scope.STATIC_LINKER_FLAGS.map((VALUE) => { return { VALUE }; }));
    }
    static create(scope, name) {
        return Object.seal(new StaticLibrary(scope, name));
    }
}
;
class SharedLibrary extends BaseLibrary {
    constructor(scope, name) {
        super(scope, name);
        this.PREFIX = scope.SHARED_LIBRARY_PREFIX;
        this.SUFFIX = scope.SHARED_LIBRARY_SUFFIX;
        this.LINK_OPTIONS.push(...scope.SHARED_LINKER_FLAGS.map((VALUE) => { return { VALUE }; }));
    }
    static create(scope, name) {
        return Object.seal(new SharedLibrary(scope, name));
    }
}
class Executable extends BaseTarget {
    constructor(scope, name) {
        super(scope, name);
        this.SUFFIX = scope.EXECUTABLE_SUFFIX;
        this.LINK_OPTIONS.push(...scope.EXE_LINKER_FLAGS.map((VALUE) => { return { VALUE }; }));
    }
    static create(scope, name) {
        return Object.seal(new Executable(scope, name));
    }
}
;


/***/ }),

/***/ "./src/core/TargetCollection.ts":
/*!**************************************!*\
  !*** ./src/core/TargetCollection.ts ***!
  \**************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   TargetCollection: () => (/* binding */ TargetCollection)
/* harmony export */ });
/* harmony import */ var _core_IncludeDirectory__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! @/core/IncludeDirectory */ "./src/core/IncludeDirectory.ts");
/* harmony import */ var _core_InterfaceIncludes__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! @/core/InterfaceIncludes */ "./src/core/InterfaceIncludes.ts");
/* harmony import */ var _core_InterfaceTarget__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! @/core/InterfaceTarget */ "./src/core/InterfaceTarget.ts");
/*
 * MIT License
 *
 * Copyright (c) 2025  Yurii Yakubin (yurii.yakubin@gmail.com)
 *
 * Permission is granted to use, copy, modify, and distribute this software
 * under the MIT License. See LICENSE file for details.
 */



const ENTRIES = Symbol("ENTRIES");
function getHeaders(target) {
    return target.SOURCES.filter((i) => i.HEADER_FILE_ONLY);
}
function getIncludes(target) {
    return target.INCLUDES.map((i) => i.VALUE);
}
function getPublicIncludes(target) {
    return target.INCLUDES.filter((i) => i.PUBLIC_ONLY).map((i) => i.VALUE);
}
function getLibraries(target) {
    return target.LIBRARIES.map((i) => i.VALUE);
}
function getPublicLibraries(target) {
    return target.LIBRARIES.filter((i) => i.PUBLIC_ONLY).map((i) => i.VALUE);
}
function getDefinitions(target) {
    return target.DEFINES.map((i) => i.VALUE);
}
function getPublicDefinitions(target) {
    return target.DEFINES.filter((i) => i.PUBLIC_ONLY).map((i) => i.VALUE);
}
function getCompileOptions(target) {
    return target.COMPILE_OPTIONS.map((i) => i.VALUE);
}
function getPublicCompileOptions(target) {
    return target.COMPILE_OPTIONS.filter((i) => i.PUBLIC_ONLY).map((i) => i.VALUE);
}
function getLinkOptions(target) {
    return target.LINK_OPTIONS.map((i) => i.VALUE);
}
function getPublicLinkOptions(target) {
    return target.LINK_OPTIONS.filter((i) => i.PUBLIC_ONLY).map((i) => i.VALUE);
}
class TargetCollection {
    [ENTRIES];
    constructor() {
        this[ENTRIES] = {};
    }
    static create() {
        return Object.seal(new TargetCollection);
    }
    get ENTRIES() {
        return this[ENTRIES];
    }
    toJSON() {
        return this[ENTRIES];
    }
    get(name) {
        return this[ENTRIES][name];
    }
    set(name, target) {
        if (this[ENTRIES][name])
            throw new Error(`Target "${name}" exists`);
        this[ENTRIES][name] = target;
    }
    __getAllIncludes(includes, targetSet, list) {
        for (const iter of list) {
            if (iter instanceof _core_InterfaceIncludes__WEBPACK_IMPORTED_MODULE_1__.InterfaceIncludes || iter instanceof _core_InterfaceTarget__WEBPACK_IMPORTED_MODULE_2__.InterfaceTarget) {
                if (!targetSet.has(iter.targetName)) {
                    targetSet.add(iter.targetName);
                    const target = this.get(iter.targetName);
                    this.__getAllIncludes(includes, targetSet, getPublicIncludes(target));
                    this.__getAllIncludes(includes, targetSet, getPublicLibraries(target));
                }
            }
            else if (iter instanceof _core_IncludeDirectory__WEBPACK_IMPORTED_MODULE_0__.IncludeDirectory) {
                if (!includes.includes(iter.toString()))
                    includes.push(iter.toString());
            }
            else {
                throw new Error(`Not support instance ${iter}`);
            }
        }
    }
    allIncludesOf(params) {
        const target = (typeof params === "string") ? this.get(params) : params;
        const includes = [];
        const targetSet = new Set([target.NAME]);
        this.__getAllIncludes(includes, targetSet, getIncludes(target));
        this.__getAllIncludes(includes, targetSet, getLibraries(target));
        return includes;
    }
    __getAllHeaders(headers, targetSet, list) {
        for (const iter of list) {
            if (iter instanceof _core_InterfaceIncludes__WEBPACK_IMPORTED_MODULE_1__.InterfaceIncludes || iter instanceof _core_InterfaceTarget__WEBPACK_IMPORTED_MODULE_2__.InterfaceTarget) {
                if (!targetSet.has(iter.targetName)) {
                    targetSet.add(iter.targetName);
                    const target = this.get(iter.targetName);
                    for (const header of getHeaders(target).map((i) => i.FILE.toString())) {
                        if (!headers.includes(header.toString()))
                            headers.push(header.toString());
                    }
                    this.__getAllHeaders(headers, targetSet, getPublicIncludes(target));
                    this.__getAllHeaders(headers, targetSet, getPublicLibraries(target));
                }
            }
        }
    }
    allHeadersOf(params) {
        const target = (typeof params === "string") ? this.get(params) : params;
        const headers = getHeaders(target).map((i) => i.FILE.toString());
        const targetSet = new Set([target.NAME]);
        this.__getAllHeaders(headers, targetSet, getIncludes(target));
        this.__getAllHeaders(headers, targetSet, getLibraries(target));
        return headers;
    }
    __getAllLibraries(libraries, targetSet, list) {
        for (const iter of list) {
            console.assert(iter instanceof _core_InterfaceTarget__WEBPACK_IMPORTED_MODULE_2__.InterfaceTarget);
            if (!targetSet.has(iter.targetName)) {
                targetSet.add(iter.targetName);
                const target = this.get(iter.targetName);
                libraries.push(target.FILE.toString());
                this.__getAllLibraries(libraries, targetSet, getPublicLibraries(target));
            }
        }
    }
    allLibrariesOf(params) {
        const target = (typeof params === "string") ? this.get(params) : params;
        const libraries = [];
        const targetSet = new Set([target.NAME]);
        this.__getAllLibraries(libraries, targetSet, getLibraries(target));
        return libraries;
    }
    __getAllDefinitions(definitions, targetSet, list) {
        for (const iter of list) {
            if (iter instanceof _core_InterfaceTarget__WEBPACK_IMPORTED_MODULE_2__.InterfaceTarget) {
                if (!targetSet.has(iter.targetName)) {
                    targetSet.add(iter.targetName);
                    const target = this.get(iter.targetName);
                    this.__getAllDefinitions(definitions, targetSet, getPublicDefinitions(target));
                    this.__getAllDefinitions(definitions, targetSet, getPublicLibraries(target));
                }
            }
            else if (typeof iter === "string") {
                if (!definitions.includes(iter))
                    definitions.push(iter);
            }
            else {
                throw new Error(`Not support instance ${iter}`);
            }
        }
    }
    allDefinitionsOf(params) {
        const target = (typeof params === "string") ? this.get(params) : params;
        const definitions = [];
        const targetSet = new Set([target.NAME]);
        this.__getAllDefinitions(definitions, targetSet, getDefinitions(target));
        this.__getAllDefinitions(definitions, targetSet, getPublicLibraries(target));
        return definitions;
    }
    __getAllCompileOptions(options, targetSet, list) {
        for (const iter of list) {
            if (iter instanceof _core_InterfaceTarget__WEBPACK_IMPORTED_MODULE_2__.InterfaceTarget) {
                if (!targetSet.has(iter.targetName)) {
                    targetSet.add(iter.targetName);
                    const target = this.get(iter.targetName);
                    this.__getAllCompileOptions(options, targetSet, getPublicCompileOptions(target));
                    this.__getAllCompileOptions(options, targetSet, getPublicLibraries(target));
                }
            }
            else if (typeof iter === "string") {
                if (!options.includes(iter))
                    options.push(iter);
            }
            else if (Array.isArray(iter)) {
                // TODO: Add compare for same array in options
                options.push(iter);
            }
            else {
                throw new Error(`Not support instance ${iter}`);
            }
        }
    }
    allCompileOptionsOf(params) {
        const target = (typeof params === "string") ? this.get(params) : params;
        const options = [];
        const targetSet = new Set([target.NAME]);
        this.__getAllCompileOptions(options, targetSet, getCompileOptions(target));
        this.__getAllCompileOptions(options, targetSet, getPublicLibraries(target));
        return options.flat();
    }
    __getLinkOptions(options, targetSet, list) {
        for (const iter of list) {
            if (iter instanceof _core_InterfaceTarget__WEBPACK_IMPORTED_MODULE_2__.InterfaceTarget) {
                if (!targetSet.has(iter.targetName)) {
                    targetSet.add(iter.targetName);
                    const target = this.get(iter.targetName);
                    this.__getLinkOptions(options, targetSet, getPublicLinkOptions(target));
                    this.__getLinkOptions(options, targetSet, getPublicLibraries(target));
                }
            }
            else if (typeof iter === "string") {
                if (!options.includes(iter))
                    options.push(iter);
            }
            else if (Array.isArray(iter)) {
                // TODO: Add compare for same array in options
                options.push(iter);
            }
            else {
                throw new Error(`Not support instance ${iter}`);
            }
        }
    }
    allLinkOptionsOf(params) {
        const target = (typeof params === "string") ? this.get(params) : params;
        const options = [];
        const targetSet = new Set([target.NAME]);
        this.__getLinkOptions(options, targetSet, getLinkOptions(target));
        this.__getLinkOptions(options, targetSet, getPublicLibraries(target));
        return options.flat();
    }
}


/***/ }),

/***/ "./src/core/Types.ts":
/*!***************************!*\
  !*** ./src/core/Types.ts ***!
  \***************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   DEBUG_BUILD_TYPE: () => (/* binding */ DEBUG_BUILD_TYPE),
/* harmony export */   RELEASE_BUILD_TYPE: () => (/* binding */ RELEASE_BUILD_TYPE)
/* harmony export */ });
/*
 * MIT License
 *
 * Copyright (c) 2025  Yurii Yakubin (yurii.yakubin@gmail.com)
 *
 * Permission is granted to use, copy, modify, and distribute this software
 * under the MIT License. See LICENSE file for details.
 */
const DEBUG_BUILD_TYPE = "Debug";
const RELEASE_BUILD_TYPE = "Release";


/***/ }),

/***/ "./src/core/UnknownTarget.ts":
/*!***********************************!*\
  !*** ./src/core/UnknownTarget.ts ***!
  \***********************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   UnknownTarget: () => (/* binding */ UnknownTarget)
/* harmony export */ });
/*
 * MIT License
 *
 * Copyright (c) 2025  Yurii Yakubin (yurii.yakubin@gmail.com)
 *
 * Permission is granted to use, copy, modify, and distribute this software
 * under the MIT License. See LICENSE file for details.
 */
const NAME = Symbol("NAME");
const INCLUDES = Symbol("INCLUDES");
const SOURCES = Symbol("SOURCES");
const DEFINES = Symbol("DEFINES");
const COMPILE_OPTIONS = Symbol("COMPILE_OPTIONS");
const LINK_OPTIONS = Symbol("LINK_OPTIONS");
class UnknownTarget {
    [NAME];
    [INCLUDES];
    [SOURCES];
    [DEFINES];
    [COMPILE_OPTIONS];
    [LINK_OPTIONS];
    constructor(name) {
        this[NAME] = name;
        this[INCLUDES] = [];
        this[SOURCES] = [];
        this[DEFINES] = [];
        this[COMPILE_OPTIONS] = [];
        this[LINK_OPTIONS] = [];
    }
    static create(name) {
        return Object.seal(new UnknownTarget(name));
    }
    static ensureInstance(value) {
        if (value instanceof UnknownTarget)
            return value;
        throw new Error(`The '${value}' is not a UnknownTarget`);
    }
    get NAME() {
        return this[NAME];
    }
    get INCLUDES() {
        return this[INCLUDES];
    }
    get SOURCES() {
        return this[SOURCES];
    }
    get DEFINES() {
        return this[DEFINES];
    }
    get COMPILE_OPTIONS() {
        return this[COMPILE_OPTIONS];
    }
    get LINK_OPTIONS() {
        return this[LINK_OPTIONS];
    }
    toJSON() {
        return {
            NAME: this.NAME,
            INCLUDES: this.INCLUDES,
            SOURCES: this.SOURCES,
            DEFINES: this.DEFINES,
            COMPILE_OPTIONS: this.COMPILE_OPTIONS,
            LINK_OPTIONS: this.LINK_OPTIONS,
        };
    }
    toString() {
        return "${" + this[NAME] + "}";
    }
}
;


/***/ }),

/***/ "./src/logger/index.ts":
/*!*****************************!*\
  !*** ./src/logger/index.ts ***!
  \*****************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   createLogger: () => (/* binding */ createLogger)
/* harmony export */ });
/*
 * MIT License
 *
 * Copyright (c) 2025  Yurii Yakubin (yurii.yakubin@gmail.com)
 *
 * Permission is granted to use, copy, modify, and distribute this software
 * under the MIT License. See LICENSE file for details.
 */
;
function createLogger(url) {
    return {
        trace: console.trace.bind(console),
        debug: console.debug.bind(console),
        info: console.info.bind(console),
        warn: console.warn.bind(console),
        error: console.error.bind(console),
    };
}


/***/ }),

/***/ "./src/utils/CMake.js":
/*!****************************!*\
  !*** ./src/utils/CMake.js ***!
  \****************************/
/***/ ((module, __unused_webpack_exports, __webpack_require__) => {

const os = __webpack_require__(/*! node:os */ "node:os");
const fs = __webpack_require__(/*! node:fs */ "node:fs");
const path = __webpack_require__(/*! node:path */ "node:path");

const { spawnAsync } = __webpack_require__(/*! @/utils/ChildProcess */ "./src/utils/ChildProcess.ts");
const { CMAKE_LISTS_TXT, ValueType } = __webpack_require__(/*! @/cmake/Constants */ "./src/cmake/Constants.ts");
const { convertToValue } = __webpack_require__(/*! @/cmake/Helper */ "./src/cmake/Helper.ts");

function toVarType(key, val) {
  const map = {
    CMAKE_INSTALL_PREFIX: ValueType.PATH,
    CMAKE_TOOLCHAIN_FILE: ValueType.FILEPATH,
  };

  if (typeof val === "boolean")
    return ValueType.BOOL;

  if (map.hasOwnProperty(key))
    return map[key];

  return ValueType.STRING;
}

function toCacheEntry(name, val)
{
  const type = toVarType(name, val);
  const value = convertToValue(val);
  return `${name}:${type}=${value}`;
}

async function configure(args)
{
  const spawnArgs = [ '-G', args.generator ];
  for (const [key, val] of Object.entries(args.cacheVariables))
    spawnArgs.push('-D', toCacheEntry(key, val));
  spawnArgs.push('-S', args.sourceDir);
  spawnArgs.push('-B', args.binaryDir);

  const res = await spawnAsync("cmake", spawnArgs, {
    cwd: args.binaryDir,
    env: args.environment || process.env,
    extra: {
      output: `cmake.configure.log`,
    },
  });
  if (res.status !== 0) {
    throw `CMake.configure returned status ${res.status}`;
  }
}

async function build(args)
{
  await configure(args);

  const spawnArgs = [
    '--build', '.',
    '--parallel', os.availableParallelism(),
  ];
  const res = await spawnAsync("cmake", spawnArgs, {
    cwd: args.binaryDir,
    env: args.environment || process.env,
    extra: {
      output: `cmake.build.log`,
    },
  });
  if (res.status !== 0) {
    throw `CMake.build returned status ${res.status}`;
  }
}

async function install(args)
{
  await configure(args);

  const spawnArgs = [
    '--install',
    '.',
  ];
  if (args.installDir) {
    spawnArgs.push('--prefix', args.installDir);
  }
  const res = await spawnAsync("cmake", spawnArgs, {
    cwd: args.binaryDir,
    env: args.environment || process.env,
    extra: {
      output: `cmake.install.log`,
    },
  });
  if (res.status !== 0) {
    throw `CMake.install returned status ${res.status}`;
  }
}

async function ctest(args)
{
  await build(args);

  const spawnArgs = [
  ];
  const res = await spawnAsync("ctest", spawnArgs, {
    cwd: args.binaryDir,
    env: args.environment || process.env,
    extra: {
      output: `cmake.ctest.log`,
    },
  });
  if (res.status !== 0) {
    throw `CTest returned status ${res.status}`;
  }
}

async function extract(args)
{
  const spawnArgs = [ "-E", "tar", "-xvf", args.filename ];
  const res = await spawnAsync("cmake", spawnArgs, {
    cwd: args.workDir || args.sourceDir || args.binaryDir,
    env: args.environment || process.env,
    extra: {
      output: args.logFile || `cmake.extract.log`,
    },
  });
  if (res.status !== 0) {
    throw `Extract returned status ${res.status}`;
  }
}

async function getProjectInfo(source)
{
  const stat = await fs.promises.stat(source);
  if (stat.isDirectory())
    source = path.resolve(source, CMAKE_LISTS_TXT);
  const content = await fs.promises.readFile(source, { encoding: 'utf8' });

  const projectPattern = /project *\( *([^ ]+) *([^)]*)\)/;
  const versionPattern = /VERSION +([^ ]+)/;
  let match = content.match(projectPattern);
  const name = match[1];
  const projectContent = match[2];
  match = projectContent.match(versionPattern);
  const version = match[1];

  return {
    name,
    version,
  };
}

function lineToSinglComment(line)
{
  return "# " + line;
}

function lineToMultipleComment(line)
{
  return `#[===[ ${line} ]===]`;
}

function generatedScriptNameComment(filename)
{
  return lineToSinglComment("Generated from " + path.basename(filename));
}

module.exports = {
  configure,
  build,
  install,
  ctest,
  extract,
  getProjectInfo,
  lineToSinglComment,
  lineToMultipleComment,
  generatedScriptNameComment,
};


/***/ }),

/***/ "./src/utils/ChildProcess.ts":
/*!***********************************!*\
  !*** ./src/utils/ChildProcess.ts ***!
  \***********************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   spawnAsync: () => (/* binding */ spawnAsync)
/* harmony export */ });
/* harmony import */ var node_path__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! node:path */ "node:path");
/* harmony import */ var node_path__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(node_path__WEBPACK_IMPORTED_MODULE_0__);
/* harmony import */ var node_fs__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! node:fs */ "node:fs");
/* harmony import */ var node_fs__WEBPACK_IMPORTED_MODULE_1___default = /*#__PURE__*/__webpack_require__.n(node_fs__WEBPACK_IMPORTED_MODULE_1__);
/* harmony import */ var node_child_process__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! node:child_process */ "node:child_process");
/* harmony import */ var node_child_process__WEBPACK_IMPORTED_MODULE_2___default = /*#__PURE__*/__webpack_require__.n(node_child_process__WEBPACK_IMPORTED_MODULE_2__);
/*
 * MIT License
 *
 * Copyright (c) 2025  Yurii Yakubin (yurii.yakubin@gmail.com)
 *
 * Permission is granted to use, copy, modify, and distribute this software
 * under the MIT License. See LICENSE file for details.
 */



function spawnAsync(command, args, options) {
    let fd = null;
    let verbose = false;
    if (options && options.extra) {
        if (options.extra.verbose)
            verbose = true;
        if (options.extra.output) {
            let logfile = options.extra.output;
            if (!node_path__WEBPACK_IMPORTED_MODULE_0___default().isAbsolute(logfile) && options.cwd) {
                logfile = node_path__WEBPACK_IMPORTED_MODULE_0___default().resolve(options.cwd, logfile);
            }
            fd = node_fs__WEBPACK_IMPORTED_MODULE_1___default().openSync(logfile, "w+", 0o666);
        }
    }
    return new Promise((resolve, reject) => {
        if (fd || verbose) {
            verbose && console.info([node_path__WEBPACK_IMPORTED_MODULE_0___default().basename(command), ...args].join(" "));
            fd && node_fs__WEBPACK_IMPORTED_MODULE_1___default().writeSync(fd, JSON.stringify({ command, args, options }, null, 2) + "\n");
        }
        const exec = (0,node_child_process__WEBPACK_IMPORTED_MODULE_2__.spawn)(command, args, options);
        exec.stdout.on("data", (data) => {
            process.stdout.write(data);
            fd && node_fs__WEBPACK_IMPORTED_MODULE_1___default().writeSync(fd, data);
        });
        exec.stderr.on("data", (data) => {
            process.stderr.write(data);
            fd && node_fs__WEBPACK_IMPORTED_MODULE_1___default().writeSync(fd, data);
        });
        exec.on("close", (status) => {
            fd && node_fs__WEBPACK_IMPORTED_MODULE_1___default().closeSync(fd);
            resolve({ status });
        });
    });
}


/***/ }),

/***/ "./src/utils/FileSystem.ts":
/*!*********************************!*\
  !*** ./src/utils/FileSystem.ts ***!
  \*********************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   directoryExists: () => (/* binding */ directoryExists),
/* harmony export */   directoryExistsSync: () => (/* binding */ directoryExistsSync),
/* harmony export */   extname: () => (/* binding */ extname),
/* harmony export */   fileExists: () => (/* binding */ fileExists),
/* harmony export */   fileExistsSync: () => (/* binding */ fileExistsSync),
/* harmony export */   fileList: () => (/* binding */ fileList),
/* harmony export */   getPathString: () => (/* binding */ getPathString),
/* harmony export */   pathExists: () => (/* binding */ pathExists),
/* harmony export */   pathExistsSync: () => (/* binding */ pathExistsSync),
/* harmony export */   saveIfDifferent: () => (/* binding */ saveIfDifferent)
/* harmony export */ });
/* harmony import */ var node_fs__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! node:fs */ "node:fs");
/* harmony import */ var node_fs__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(node_fs__WEBPACK_IMPORTED_MODULE_0__);
/* harmony import */ var node_path__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! node:path */ "node:path");
/* harmony import */ var node_path__WEBPACK_IMPORTED_MODULE_1___default = /*#__PURE__*/__webpack_require__.n(node_path__WEBPACK_IMPORTED_MODULE_1__);
/* harmony import */ var node_url__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! node:url */ "node:url");
/* harmony import */ var node_url__WEBPACK_IMPORTED_MODULE_2___default = /*#__PURE__*/__webpack_require__.n(node_url__WEBPACK_IMPORTED_MODULE_2__);
/*
 * MIT License
 *
 * Copyright (c) 2025  Yurii Yakubin (yurii.yakubin@gmail.com)
 *
 * Permission is granted to use, copy, modify, and distribute this software
 * under the MIT License. See LICENSE file for details.
 */



async function pathExists(path) {
    try {
        return !!(await node_fs__WEBPACK_IMPORTED_MODULE_0___default().promises.stat(path));
    }
    catch {
        return false;
    }
}
function pathExistsSync(path) {
    try {
        return !!node_fs__WEBPACK_IMPORTED_MODULE_0___default().statSync(path);
    }
    catch {
        return false;
    }
}
async function fileExists(path) {
    try {
        return (await node_fs__WEBPACK_IMPORTED_MODULE_0___default().promises.stat(path)).isFile();
    }
    catch {
        return false;
    }
}
function fileExistsSync(path) {
    try {
        return node_fs__WEBPACK_IMPORTED_MODULE_0___default().statSync(path).isFile();
    }
    catch {
        return false;
    }
}
async function directoryExists(path) {
    try {
        return (await node_fs__WEBPACK_IMPORTED_MODULE_0___default().promises.stat(path)).isDirectory();
    }
    catch {
        return false;
    }
}
function directoryExistsSync(path) {
    try {
        return node_fs__WEBPACK_IMPORTED_MODULE_0___default().statSync(path).isDirectory();
    }
    catch {
        return false;
    }
}
function extname(fullpath, options) {
    if (options?.longest) {
        const filename = node_path__WEBPACK_IMPORTED_MODULE_1___default().basename(fullpath);
        const index = filename.indexOf('.');
        return index != -1 ? filename.substring(index) : '';
    }
    return node_path__WEBPACK_IMPORTED_MODULE_1___default().extname(fullpath);
}
async function fileList(dirname, options) {
    const list = new Array;
    if (await directoryExists(dirname)) {
        for (const iter of await node_fs__WEBPACK_IMPORTED_MODULE_0___default().promises.readdir(dirname)) {
            const filepath = node_path__WEBPACK_IMPORTED_MODULE_1___default().resolve(dirname, iter);
            const stat = await node_fs__WEBPACK_IMPORTED_MODULE_0___default().promises.stat(filepath);
            if (stat.isFile()) {
                list.push(options.relative ? node_path__WEBPACK_IMPORTED_MODULE_1___default().relative(options.relative, filepath) : filepath);
            }
            else if (options.recursive && stat.isDirectory()) {
                for (const fname of await fileList(filepath, options))
                    list.push(fname);
            }
        }
    }
    return list;
}
async function saveIfDifferent(filename, content) {
    if (await fileExists(filename)) {
        const oldContent = await node_fs__WEBPACK_IMPORTED_MODULE_0___default().promises.readFile(filename, { encoding: "utf8" });
        if (content == oldContent)
            return false;
    }
    await node_fs__WEBPACK_IMPORTED_MODULE_0___default().promises.mkdir(node_path__WEBPACK_IMPORTED_MODULE_1___default().dirname(filename), { recursive: true });
    await node_fs__WEBPACK_IMPORTED_MODULE_0___default().promises.writeFile(filename, content, { encoding: "utf8" });
    return true;
}
function getPathString(str) {
    return str.startsWith("file://") ? node_url__WEBPACK_IMPORTED_MODULE_2___default().fileURLToPath(str) : str;
}


/***/ }),

/***/ "./src/utils/HttpRequest.ts":
/*!**********************************!*\
  !*** ./src/utils/HttpRequest.ts ***!
  \**********************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   downloadFile: () => (/* binding */ downloadFile),
/* harmony export */   requestGet: () => (/* binding */ requestGet)
/* harmony export */ });
/* harmony import */ var node_path__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! node:path */ "node:path");
/* harmony import */ var node_path__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(node_path__WEBPACK_IMPORTED_MODULE_0__);
/* harmony import */ var node_fs__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! node:fs */ "node:fs");
/* harmony import */ var node_fs__WEBPACK_IMPORTED_MODULE_1___default = /*#__PURE__*/__webpack_require__.n(node_fs__WEBPACK_IMPORTED_MODULE_1__);
/* harmony import */ var http__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! http */ "http");
/* harmony import */ var http__WEBPACK_IMPORTED_MODULE_2___default = /*#__PURE__*/__webpack_require__.n(http__WEBPACK_IMPORTED_MODULE_2__);
/* harmony import */ var https__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! https */ "https");
/* harmony import */ var https__WEBPACK_IMPORTED_MODULE_3___default = /*#__PURE__*/__webpack_require__.n(https__WEBPACK_IMPORTED_MODULE_3__);
/* harmony import */ var _logger__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! @/logger */ "./src/logger/index.ts");
/*
 * MIT License
 *
 * Copyright (c) 2025  Yurii Yakubin (yurii.yakubin@gmail.com)
 *
 * Permission is granted to use, copy, modify, and distribute this software
 * under the MIT License. See LICENSE file for details.
 */





const logger = (0,_logger__WEBPACK_IMPORTED_MODULE_4__.createLogger)("file:///mnt/c/opt/work/source/darkit-sdk/external/bitmake/src/utils/HttpRequest.ts");
const httpOptions = {
    method: 'GET',
    timeout: 5000,
    headers: {
        "User-Agent": "bitmake" + "/" + "0.0.1-develop.5",
        "Accept": "*/*",
    },
};
function httpRequest(url, options, callback) {
    if (url.startsWith("https://"))
        return https__WEBPACK_IMPORTED_MODULE_3___default().request(url, options, callback);
    return http__WEBPACK_IMPORTED_MODULE_2___default().request(url, options, callback);
}
;
function requestGet(url) {
    return new Promise((resolve, reject) => {
        const onError = (err) => {
            const message = "Encountered an error trying to make a request: " + err.message;
            logger.error(message, err);
            reject(message);
        };
        const onTimeout = (request) => {
            request.destroy();
            logger.error("  Timeout", url);
            reject("Timeout");
        };
        const onRequest = (response) => {
            switch (response.statusCode) {
                case 200:
                    const chunks = [];
                    response.on("data", (chunk) => chunks.push(chunk));
                    response.on("end", () => resolve(Buffer.concat(chunks)));
                    response.on('close', () => logger.info('  Close'));
                    break;
                case 301:
                case 302:
                    response.resume();
                    logger.info(`Redirect to ${response.headers.location}`);
                    const request = httpRequest(response.headers.location, httpOptions, onRequest);
                    request.on('timeout', onTimeout.bind(null, request));
                    request.on('error', onError);
                    request.end();
                    break;
                default:
                    response.resume();
                    const message = "Did not get an OK from the server. Code: " + response.statusCode;
                    logger.error(message);
                    reject(message);
                    break;
            }
        };
        logger.info(`wget ${url}`);
        const request = httpRequest(url, httpOptions, onRequest);
        request.on('timeout', onTimeout.bind(null, request));
        request.on('error', onError);
        request.end();
    });
}
;
function downloadFile(url, file) {
    return new Promise((resolve, reject) => {
        const filename = node_path__WEBPACK_IMPORTED_MODULE_0___default().basename(url);
        const client = (() => {
            if (file) {
                const fd = node_fs__WEBPACK_IMPORTED_MODULE_1___default().openSync(file, "w");
                return {
                    onData: (chunk) => {
                        node_fs__WEBPACK_IMPORTED_MODULE_1___default().writeSync(fd, chunk);
                    },
                    onEnd: () => {
                        node_fs__WEBPACK_IMPORTED_MODULE_1___default().closeSync(fd);
                        resolve(undefined);
                    },
                };
            }
            else {
                const chunks = [];
                return {
                    onData: (chunk) => {
                        chunks.push(chunk);
                    },
                    onEnd: () => {
                        resolve(Buffer.concat(chunks));
                    },
                };
            }
        })();
        const startRequest = (url, callback) => {
            const request = https__WEBPACK_IMPORTED_MODULE_3___default().request(url, httpOptions, callback);
            if (request) {
                request.on('error', (error) => reject(error));
                request.end();
            }
            else {
                reject(`Url scheme not supported for ${url}`);
            }
        };
        const onRequest = (response) => {
            switch (response.statusCode) {
                case 200:
                    logger.info(`Conncted to ${response.req.host}`);
                    logger.info(`Downloading ${filename}`);
                    response.on('data', client.onData);
                    response.on('end', client.onEnd);
                    response.on('close', () => logger.info(`Done`));
                    break;
                case 301:
                case 302:
                    response.resume();
                    logger.info(`Resolving ${response.headers.location}`);
                    startRequest(response.headers.location, onRequest);
                    break;
                default:
                    response.resume();
                    reject(`Did not get an OK from the server. Code: ${response.statusCode}`);
                    break;
            }
        };
        logger.info(`Request to ${url}`);
        startRequest(url, onRequest);
    });
}


/***/ }),

/***/ "./src/utils/ImportModule.mjs":
/*!************************************!*\
  !*** ./src/utils/ImportModule.mjs ***!
  \************************************/
/***/ ((__unused_webpack___webpack_module__, __webpack_exports__, __webpack_require__) => {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   importModule: () => (/* binding */ importModule)
/* harmony export */ });
/*
 * MIT License
 *
 * Copyright (c) 2025  Yurii Yakubin (yurii.yakubin@gmail.com)
 *
 * Permission is granted to use, copy, modify, and distribute this software
 * under the MIT License. See LICENSE file for details.
 */

const importModule = async (name) => import(/* webpackIgnore: true */ name);


/***/ }),

/***/ "./src/utils/MakePatch.ts":
/*!********************************!*\
  !*** ./src/utils/MakePatch.ts ***!
  \********************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   makePatch: () => (/* binding */ makePatch)
/* harmony export */ });
/* harmony import */ var node_fs__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! node:fs */ "node:fs");
/* harmony import */ var node_fs__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(node_fs__WEBPACK_IMPORTED_MODULE_0__);
/* harmony import */ var node_path__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! node:path */ "node:path");
/* harmony import */ var node_path__WEBPACK_IMPORTED_MODULE_1___default = /*#__PURE__*/__webpack_require__.n(node_path__WEBPACK_IMPORTED_MODULE_1__);
/* harmony import */ var _utils_FileSystem__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! @/utils/FileSystem */ "./src/utils/FileSystem.ts");
/* harmony import */ var _logger__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! @/logger */ "./src/logger/index.ts");




const logger = (0,_logger__WEBPACK_IMPORTED_MODULE_3__.createLogger)("file:///mnt/c/opt/work/source/darkit-sdk/external/bitmake/src/utils/MakePatch.ts");
async function makePatch(srcDir, destDir) {
    logger.info(`Make patch ${srcDir} to ${destDir}`);
    const list = await (0,_utils_FileSystem__WEBPACK_IMPORTED_MODULE_2__.fileList)(srcDir, { relative: srcDir, recursive: true });
    for (const iter of list) {
        const source = node_path__WEBPACK_IMPORTED_MODULE_1___default().resolve(srcDir, iter);
        const destination = node_path__WEBPACK_IMPORTED_MODULE_1___default().resolve(destDir, iter);
        await node_fs__WEBPACK_IMPORTED_MODULE_0___default().promises.cp(source, destination, { force: true });
        logger.info(` Replaced ${iter}`);
    }
}


/***/ }),

/***/ "./src/utils/Module.ts":
/*!*****************************!*\
  !*** ./src/utils/Module.ts ***!
  \*****************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   importModule: () => (/* reexport safe */ _ImportModule_mjs__WEBPACK_IMPORTED_MODULE_0__.importModule),
/* harmony export */   requireResolve: () => (/* binding */ requireResolve)
/* harmony export */ });
/* harmony import */ var _ImportModule_mjs__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./ImportModule.mjs */ "./src/utils/ImportModule.mjs");
/*
 * MIT License
 *
 * Copyright (c) 2025  Yurii Yakubin (yurii.yakubin@gmail.com)
 *
 * Permission is granted to use, copy, modify, and distribute this software
 * under the MIT License. See LICENSE file for details.
 */
const requireImpl = eval("require");
function requireResolve(name) {
    if (false)
        {}
    if (typeof requireImpl !== 'undefined')
        return requireImpl.resolve(name);
    throw new Error("No compatible module resolver found");
}



/***/ }),

/***/ "./src/utils/Primitives.ts":
/*!*********************************!*\
  !*** ./src/utils/Primitives.ts ***!
  \*********************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   arrayWrapper: () => (/* binding */ arrayWrapper),
/* harmony export */   assignObject: () => (/* binding */ assignObject),
/* harmony export */   copyValue: () => (/* binding */ copyValue),
/* harmony export */   equalValue: () => (/* binding */ equalValue)
/* harmony export */ });
/*
 * MIT License
 *
 * Copyright (c) 2025  Yurii Yakubin (yurii.yakubin@gmail.com)
 *
 * Permission is granted to use, copy, modify, and distribute this software
 * under the MIT License. See LICENSE file for details.
 */
function equalValue(a, b) {
    if (a === b)
        return true;
    if (a === undefined || b === undefined)
        return false;
    if (typeof a !== "object" || typeof b !== "object")
        return false;
    const k1 = Object.keys(a);
    const k2 = Object.keys(b);
    if (k1.length != k2.length)
        return false;
    for (const key of k1) {
        if (!Object.hasOwn(b, key) || !equalValue(a[key], b[key]))
            return false;
    }
    return true;
}
function copyValue(o) {
    if (!o || typeof o !== "object")
        return o;
    if (Array.isArray(o)) {
        const result = [];
        for (const iter of o)
            result.push(copyValue(iter));
        return result;
    }
    else {
        const result = {};
        for (const [key, val] of Object.entries(o))
            result[key] = copyValue(val);
        return result;
    }
}
function assignObject(target, source) {
    if (Array.isArray(target) && Array.isArray(source)) {
        for (const iter of source)
            target.push(iter);
    }
    else {
        for (const key of Object.keys(source)) {
            const a = target[key], b = source[key];
            if (a && typeof a === "object" && b && typeof b === "object")
                assignObject(a, b);
            else
                target[key] = copyValue(b);
        }
    }
}
function arrayWrapper(value) {
    if (value === undefined || Array.isArray(value))
        return value;
    return [value];
}


/***/ }),

/***/ "./src/utils/SettingsStorage.js":
/*!**************************************!*\
  !*** ./src/utils/SettingsStorage.js ***!
  \**************************************/
/***/ ((module, __unused_webpack_exports, __webpack_require__) => {

const fs = __webpack_require__(/*! fs */ "fs");

class SettingsStorage {
  _filename;
  _encoding = "utf-8";
  _settings;
  _current;

  constructor(filename)
  {
    this._filename = filename;
  }

  async push(name)
  {
    if (!this._settings)
      await this.load();
    let object = this._current.object[name];
    if (!object)
      object = this._current.object[name] = {};
    this._current = { parent: this._current, object };
  }

  async pop()
  {
    if (!this._settings)
      await this.load();
    console.assert(this._current.parent);
    this._current = this._current.parent;
  }

  async get(name)
  {
    if (!this._settings)
      await this.load();
    return this._current.object[name];
  }

  async set(name, value)
  {
    if (!this._settings)
      await this.load();
    this._current.object[name] = value;
    await this.save();
  }

  async load()
  {
    try {
      const content = await fs.promises.readFile(this._filename, this._encoding);
      this._settings = JSON.parse(content);
    }
    catch (e) {
      this._settings = {};
    }
    this._current =
    {
      parent: null,
      object: this._settings,
    };
  }

  async save()
  {
    const space = 2;
    const content = JSON.stringify(this._settings, undefined, space);
    await fs.promises.writeFile(this._filename, content, { encoding: this._encoding, flag: 'w', flush: true });
  }
};

module.exports = {
  SettingsStorage,
};


/***/ }),

/***/ "./src/utils/StrictType.ts":
/*!*********************************!*\
  !*** ./src/utils/StrictType.ts ***!
  \*********************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   ensureBoolean: () => (/* binding */ ensureBoolean),
/* harmony export */   ensureString: () => (/* binding */ ensureString)
/* harmony export */ });
/*
 * MIT License
 *
 * Copyright (c) 2025  Yurii Yakubin (yurii.yakubin@gmail.com)
 *
 * Permission is granted to use, copy, modify, and distribute this software
 * under the MIT License. See LICENSE file for details.
 */
function ensureBoolean(value) {
    if (typeof value === "boolean")
        return value;
    throw new Error(`The '${value}' is not a boolean`);
}
function ensureString(value) {
    if (typeof value === "string")
        return value;
    throw new Error(`The '${value}' is not a string`);
}


/***/ }),

/***/ "fs":
/*!*********************!*\
  !*** external "fs" ***!
  \*********************/
/***/ ((module) => {

"use strict";
module.exports = require("fs");

/***/ }),

/***/ "http":
/*!***********************!*\
  !*** external "http" ***!
  \***********************/
/***/ ((module) => {

"use strict";
module.exports = require("http");

/***/ }),

/***/ "https":
/*!************************!*\
  !*** external "https" ***!
  \************************/
/***/ ((module) => {

"use strict";
module.exports = require("https");

/***/ }),

/***/ "node:child_process":
/*!*************************************!*\
  !*** external "node:child_process" ***!
  \*************************************/
/***/ ((module) => {

"use strict";
module.exports = require("node:child_process");

/***/ }),

/***/ "node:fs":
/*!**************************!*\
  !*** external "node:fs" ***!
  \**************************/
/***/ ((module) => {

"use strict";
module.exports = require("node:fs");

/***/ }),

/***/ "node:os":
/*!**************************!*\
  !*** external "node:os" ***!
  \**************************/
/***/ ((module) => {

"use strict";
module.exports = require("node:os");

/***/ }),

/***/ "node:path":
/*!****************************!*\
  !*** external "node:path" ***!
  \****************************/
/***/ ((module) => {

"use strict";
module.exports = require("node:path");

/***/ }),

/***/ "node:url":
/*!***************************!*\
  !*** external "node:url" ***!
  \***************************/
/***/ ((module) => {

"use strict";
module.exports = require("node:url");

/***/ })

/******/ 	});
/************************************************************************/
/******/ 	// The module cache
/******/ 	var __webpack_module_cache__ = {};
/******/ 	
/******/ 	// The require function
/******/ 	function __webpack_require__(moduleId) {
/******/ 		// Check if module is in cache
/******/ 		var cachedModule = __webpack_module_cache__[moduleId];
/******/ 		if (cachedModule !== undefined) {
/******/ 			return cachedModule.exports;
/******/ 		}
/******/ 		// Create a new module (and put it into the cache)
/******/ 		var module = __webpack_module_cache__[moduleId] = {
/******/ 			// no module.id needed
/******/ 			// no module.loaded needed
/******/ 			exports: {}
/******/ 		};
/******/ 	
/******/ 		// Execute the module function
/******/ 		__webpack_modules__[moduleId](module, module.exports, __webpack_require__);
/******/ 	
/******/ 		// Return the exports of the module
/******/ 		return module.exports;
/******/ 	}
/******/ 	
/************************************************************************/
/******/ 	/* webpack/runtime/compat get default export */
/******/ 	(() => {
/******/ 		// getDefaultExport function for compatibility with non-harmony modules
/******/ 		__webpack_require__.n = (module) => {
/******/ 			var getter = module && module.__esModule ?
/******/ 				() => (module['default']) :
/******/ 				() => (module);
/******/ 			__webpack_require__.d(getter, { a: getter });
/******/ 			return getter;
/******/ 		};
/******/ 	})();
/******/ 	
/******/ 	/* webpack/runtime/define property getters */
/******/ 	(() => {
/******/ 		// define getter functions for harmony exports
/******/ 		__webpack_require__.d = (exports, definition) => {
/******/ 			for(var key in definition) {
/******/ 				if(__webpack_require__.o(definition, key) && !__webpack_require__.o(exports, key)) {
/******/ 					Object.defineProperty(exports, key, { enumerable: true, get: definition[key] });
/******/ 				}
/******/ 			}
/******/ 		};
/******/ 	})();
/******/ 	
/******/ 	/* webpack/runtime/hasOwnProperty shorthand */
/******/ 	(() => {
/******/ 		__webpack_require__.o = (obj, prop) => (Object.prototype.hasOwnProperty.call(obj, prop))
/******/ 	})();
/******/ 	
/******/ 	/* webpack/runtime/make namespace object */
/******/ 	(() => {
/******/ 		// define __esModule on exports
/******/ 		__webpack_require__.r = (exports) => {
/******/ 			if(typeof Symbol !== 'undefined' && Symbol.toStringTag) {
/******/ 				Object.defineProperty(exports, Symbol.toStringTag, { value: 'Module' });
/******/ 			}
/******/ 			Object.defineProperty(exports, '__esModule', { value: true });
/******/ 		};
/******/ 	})();
/******/ 	
/************************************************************************/
var __webpack_exports__ = {};
// This entry needs to be wrapped in an IIFE because it needs to be in strict mode.
(() => {
"use strict";
/*!**********************!*\
  !*** ./src/main.mjs ***!
  \**********************/
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var node_url__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! node:url */ "node:url");
/* harmony import */ var node_path__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! node:path */ "node:path");
/* harmony import */ var _RunScriptContext_mjs__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ./RunScriptContext.mjs */ "./src/RunScriptContext.mjs");
/* harmony import */ var _InitHandler_mjs__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ./InitHandler.mjs */ "./src/InitHandler.mjs");
/* harmony import */ var _BuildHandler_mjs__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! ./BuildHandler.mjs */ "./src/BuildHandler.mjs");







const __filename = node_url__WEBPACK_IMPORTED_MODULE_0__.fileURLToPath("file:///mnt/c/opt/work/source/darkit-sdk/external/bitmake/src/main.mjs");
const __dirname = node_path__WEBPACK_IMPORTED_MODULE_1__.dirname(__filename);

const handlerMap = {
  default: _BuildHandler_mjs__WEBPACK_IMPORTED_MODULE_4__["default"],
  init: _InitHandler_mjs__WEBPACK_IMPORTED_MODULE_3__["default"],
  build: _BuildHandler_mjs__WEBPACK_IMPORTED_MODULE_4__["default"],
};

function toOptionKey(name)
{
  if (!name.startsWith("--"))
    return null;

  name = name.substring(2).toLowerCase();
  if (!name.length)
    return null;

  let key = name.charAt(0);
  if (!key.match(/[a-z]/))
    return null;

  let hyphen = 0;
  for (let i = 1; i < name.length; i++) {
    const ch = name.charAt(i);
    if (ch.match(/[a-z0-9]/)) {
      key += (hyphen ? ch.toUpperCase() : ch)
      hyphen = 0;
    }
    else if (ch == "-") {
      if (++hyphen > 1)
        return null;
    }
  }

  return hyphen ? null : key;
}

async function runScript()
{
  const options = {
    handler: "default",
    nodeExecutable: null,
    currentScript: null,
    scriptDir: __dirname,
    rootDir: node_path__WEBPACK_IMPORTED_MODULE_1__.dirname(__dirname),
    workDir: process.cwd(),
    env: {},
  };

  if (process.argv.length > 0)
    options.nodeExecutable = process.argv[0];
  if (process.argv.length > 1)
    options.currentScript = process.argv[1];

  let argsIndex = process.argv.length;
  if (process.argv.length > 2) {
    argsIndex = 2;
    const handler = process.argv[argsIndex];
    if (!handler.startsWith("--")) {
      options.handler = handler;
      argsIndex++;
    }
  }

  if (!handlerMap.hasOwnProperty(options.handler)) {
    const scriptName = options.currentScript ? node_path__WEBPACK_IMPORTED_MODULE_1__.basename(options.currentScript) : "wasmux";
    throw `The ${scriptName} does not support the ${options.handler} command`;
  }

  let lastKey = null;
  while (argsIndex < process.argv.length) {
    const iter = process.argv[argsIndex++];
    if (iter.startsWith("--")) {
      const key = toOptionKey(iter);
      if (!key)
        throw `Option ${iter} is not supported`;
      if (options.env.hasOwnProperty(key))
        throw `Cannot specify the same option '${iter}' more than once`;
      lastKey = key;
      options.env[key] = true;
    }
    else if (lastKey) {
      const value = options.env[lastKey];
      if (typeof value === 'boolean')
        options.env[lastKey] = iter;
      else if (typeof value === 'string')
        options.env[lastKey] = [ value, iter ];
      else
        value.push(iter);
    }
    else {
      throw `Need to specify the option name before '${iter}' parameter`;
    }
  }

  const context = new _RunScriptContext_mjs__WEBPACK_IMPORTED_MODULE_2__.RunScriptContext(options);

  let handler = handlerMap[options.handler];
  if (typeof handler === "string") {
    const filename = node_path__WEBPACK_IMPORTED_MODULE_1__.isAbsolute(handler) ? handler : node_path__WEBPACK_IMPORTED_MODULE_1__.resolve(__dirname, handler);
    const fileUrl = node_url__WEBPACK_IMPORTED_MODULE_0__.pathToFileURL(filename);
    const module = await __webpack_require__("./src lazy recursive")(fileUrl);
    handler = module.default;
  }

  const res = handler(context);
  if (res instanceof Promise) {
    await res;
  }
}

runScript().then(() => process.exit(0)).catch((e) => {
  if (e instanceof Error) {
    console.error(e.stack);
  }
  else {
    console.error(e);
  }
  process.exit(1);
});

})();

/******/ })()
;
//# sourceMappingURL=data:application/json;charset=utf-8;base64,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QVk7QUFDekI7QUFDQSxXQUFXO0FBQ1g7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0EsK0NBQStDLCtDQUFhO0FBQzVELGlCQUFpQixZQUFZLHVCQUF1QixpQkFBaUI7QUFDckU7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0Esd0JBQXdCLE1BQU07QUFDOUI7QUFDQSxpREFBaUQsS0FBSztBQUN0RDtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLHVEQUF1RCxLQUFLO0FBQzVEO0FBQ0E7O0FBRUEsc0JBQXNCLG1FQUFnQjs7QUFFdEM7QUFDQTtBQUNBLHFCQUFxQixpREFBZSxzQkFBc0IsOENBQVk7QUFDdEUsb0JBQW9CLG1EQUFpQjtBQUNyQyx5QkFBeUIsNENBQU8sT0FBTyxDQUFDO0FBQ3hDO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsQ0FBQyIsInNvdXJjZXMiOlsid2VicGFjazovL2JpdG1ha2UvLi9zcmMvIGxhenkgc3RyaWN0IG5hbWVzcGFjZSBvYmplY3QiLCJ3ZWJwYWNrOi8vYml0bWFrZS8uL3NyYy9CdWlsZEhhbmRsZXIubWpzIiwid2VicGFjazovL2JpdG1ha2UvLi9zcmMvQ29uc3RhbnRzLmpzIiwid2VicGFjazovL2JpdG1ha2UvLi9zcmMvSW5pdEhhbmRsZXIubWpzIiwid2VicGFjazovL2JpdG1ha2UvLi9zcmMvTWFrZVNjcmlwdENvbnRleHQuanMiLCJ3ZWJwYWNrOi8vYml0bWFrZS8uL3NyYy9SdW5TY3JpcHRDb250ZXh0Lm1qcyIsIndlYnBhY2s6Ly9iaXRtYWtlLy4vc3JjL2JpdG1ha2UvR2xvYmFsQ29udGV4dC5qcyIsIndlYnBhY2s6Ly9iaXRtYWtlLy4vc3JjL2JpdG1ha2UvU3lzdGVtU2NyaXB0cy9jb25maWd1cmVfZmlsZS5qcyIsIndlYnBhY2s6Ly9iaXRtYWtlLy4vc3JjL2JpdG1ha2UvU3lzdGVtU2NyaXB0cy9pbnN0YWxsX3NjcmlwdC5qcyIsIndlYnBhY2s6Ly9iaXRtYWtlLy4vc3JjL2JpdG1ha2UvU3lzdGVtVmFyaWFibGVzLmpzIiwid2VicGFjazovL2JpdG1ha2UvLi9zcmMvYml0bWFrZS9Vc2VyQ29udGV4dC5qcyIsIndlYnBhY2s6Ly9iaXRtYWtlLy4vc3JjL2NtYWtlL0NvbnN0YW50cy50cyIsIndlYnBhY2s6Ly9iaXRtYWtlLy4vc3JjL2NtYWtlL0hlbHBlci50cyIsIndlYnBhY2s6Ly9iaXRtYWtlLy4vc3JjL2NvcmUvQ3VzdG9tU2NyaXB0LnRzIiwid2VicGFjazovL2JpdG1ha2UvLi9zcmMvY29yZS9Hb2FsQ29sbGVjdGlvbi50cyIsIndlYnBhY2s6Ly9iaXRtYWtlLy4vc3JjL2NvcmUvSW5jbHVkZURpcmVjdG9yeS50cyIsIndlYnBhY2s6Ly9iaXRtYWtlLy4vc3JjL2NvcmUvSW5zdGFsbEVudGl0eS50cyIsIndlYnBhY2s6Ly9iaXRtYWtlLy4vc3JjL2NvcmUvSW50ZXJmYWNlSW5jbHVkZXMudHMiLCJ3ZWJwYWNrOi8vYml0bWFrZS8uL3NyYy9jb3JlL0ludGVyZmFjZU9iamVjdHMudHMiLCJ3ZWJwYWNrOi8vYml0bWFrZS8uL3NyYy9jb3JlL0ludGVyZmFjZVNjcmlwdC50cyIsIndlYnBhY2s6Ly9iaXRtYWtlLy4vc3JjL2NvcmUvSW50ZXJmYWNlVGFyZ2V0LnRzIiwid2VicGFjazovL2JpdG1ha2UvLi9zcmMvY29yZS9QYXRoLnRzIiwid2VicGFjazovL2JpdG1ha2UvLi9zcmMvY29yZS9QbHVnaW5Db250ZXh0LnRzIiwid2VicGFjazovL2JpdG1ha2UvLi9zcmMvY29yZS9TY3JpcHRDb2xsZWN0aW9uLnRzIiwid2VicGFjazovL2JpdG1ha2UvLi9zcmMvY29yZS9Tb3VyY2VGaWxlLnRzIiwid2VicGFjazovL2JpdG1ha2UvLi9zcmMvY29yZS9Tb3VyY2VGaWxlTGlzdC50cyIsIndlYnBhY2s6Ly9iaXRtYWtlLy4vc3JjL2NvcmUvU3lzdGVtVmFyaWFibGVzLnRzIiwid2VicGFjazovL2JpdG1ha2UvLi9zcmMvY29yZS9UYXJnZXQudHMiLCJ3ZWJwYWNrOi8vYml0bWFrZS8uL3NyYy9jb3JlL1RhcmdldENvbGxlY3Rpb24udHMiLCJ3ZWJwYWNrOi8vYml0bWFrZS8uL3NyYy9jb3JlL1R5cGVzLnRzIiwid2VicGFjazovL2JpdG1ha2UvLi9zcmMvY29yZS9Vbmtub3duVGFyZ2V0LnRzIiwid2VicGFjazovL2JpdG1ha2UvLi9zcmMvbG9nZ2VyL2luZGV4LnRzIiwid2VicGFjazovL2JpdG1ha2UvLi9zcmMvdXRpbHMvQ01ha2UuanMiLCJ3ZWJwYWNrOi8vYml0bWFrZS8uL3NyYy91dGlscy9DaGlsZFByb2Nlc3MudHMiLCJ3ZWJwYWNrOi8vYml0bWFrZS8uL3NyYy91dGlscy9GaWxlU3lzdGVtLnRzIiwid2VicGFjazovL2JpdG1ha2UvLi9zcmMvdXRpbHMvSHR0cFJlcXVlc3QudHMiLCJ3ZWJwYWNrOi8vYml0bWFrZS8uL3NyYy91dGlscy9JbXBvcnRNb2R1bGUubWpzIiwid2VicGFjazovL2JpdG1ha2UvLi9zcmMvdXRpbHMvTWFrZVBhdGNoLnRzIiwid2VicGFjazovL2JpdG1ha2UvLi9zcmMvdXRpbHMvTW9kdWxlLnRzIiwid2VicGFjazovL2JpdG1ha2UvLi9zcmMvdXRpbHMvUHJpbWl0aXZlcy50cyIsIndlYnBhY2s6Ly9iaXRtYWtlLy4vc3JjL3V0aWxzL1NldHRpbmdzU3RvcmFnZS5qcyIsIndlYnBhY2s6Ly9iaXRtYWtlLy4vc3JjL3V0aWxzL1N0cmljdFR5cGUudHMiLCJ3ZWJwYWNrOi8vYml0bWFrZS9leHRlcm5hbCBub2RlLWNvbW1vbmpzIFwiZnNcIiIsIndlYnBhY2s6Ly9iaXRtYWtlL2V4dGVybmFsIG5vZGUtY29tbW9uanMgXCJodHRwXCIiLCJ3ZWJwYWNrOi8vYml0bWFrZS9leHRlcm5hbCBub2RlLWNvbW1vbmpzIFwiaHR0cHNcIiIsIndlYnBhY2s6Ly9iaXRtYWtlL2V4dGVybmFsIG5vZGUtY29tbW9uanMgXCJub2RlOmNoaWxkX3Byb2Nlc3NcIiIsIndlYnBhY2s6Ly9iaXRtYWtlL2V4dGVybmFsIG5vZGUtY29tbW9uanMgXCJub2RlOmZzXCIiLCJ3ZWJwYWNrOi8vYml0bWFrZS9leHRlcm5hbCBub2RlLWNvbW1vbmpzIFwibm9kZTpvc1wiIiwid2VicGFjazovL2JpdG1ha2UvZXh0ZXJuYWwgbm9kZS1jb21tb25qcyBcIm5vZGU6cGF0aFwiIiwid2VicGFjazovL2JpdG1ha2UvZXh0ZXJuYWwgbm9kZS1jb21tb25qcyBcIm5vZGU6dXJsXCIiLCJ3ZWJwYWNrOi8vYml0bWFrZS93ZWJwYWNrL2Jvb3RzdHJhcCIsIndlYnBhY2s6Ly9iaXRtYWtlL3dlYnBhY2svcnVudGltZS9jb21wYXQgZ2V0IGRlZmF1bHQgZXhwb3J0Iiwid2VicGFjazovL2JpdG1ha2Uvd2VicGFjay9ydW50aW1lL2RlZmluZSBwcm9wZXJ0eSBnZXR0ZXJzIiwid2VicGFjazovL2JpdG1ha2Uvd2VicGFjay9ydW50aW1lL2hhc093blByb3BlcnR5IHNob3J0aGFuZCIsIndlYnBhY2s6Ly9iaXRtYWtlL3dlYnBhY2svcnVudGltZS9tYWtlIG5hbWVzcGFjZSBvYmplY3QiLCJ3ZWJwYWNrOi8vYml0bWFrZS8uL3NyYy9tYWluLm1qcyJdLCJzb3VyY2VzQ29udGVudCI6WyJmdW5jdGlvbiB3ZWJwYWNrRW1wdHlBc3luY0NvbnRleHQocmVxKSB7XG5cdC8vIEhlcmUgUHJvbWlzZS5yZXNvbHZlKCkudGhlbigpIGlzIHVzZWQgaW5zdGVhZCBvZiBuZXcgUHJvbWlzZSgpIHRvIHByZXZlbnRcblx0Ly8gdW5jYXVnaHQgZXhjZXB0aW9uIHBvcHBpbmcgdXAgaW4gZGV2dG9vbHNcblx0cmV0dXJuIFByb21pc2UucmVzb2x2ZSgpLnRoZW4oKCkgPT4ge1xuXHRcdHZhciBlID0gbmV3IEVycm9yKFwiQ2Fubm90IGZpbmQgbW9kdWxlICdcIiArIHJlcSArIFwiJ1wiKTtcblx0XHRlLmNvZGUgPSAnTU9EVUxFX05PVF9GT1VORCc7XG5cdFx0dGhyb3cgZTtcblx0fSk7XG59XG53ZWJwYWNrRW1wdHlBc3luY0NvbnRleHQua2V5cyA9ICgpID0+IChbXSk7XG53ZWJwYWNrRW1wdHlBc3luY0NvbnRleHQucmVzb2x2ZSA9IHdlYnBhY2tFbXB0eUFzeW5jQ29udGV4dDtcbndlYnBhY2tFbXB0eUFzeW5jQ29udGV4dC5pZCA9IFwiLi9zcmMgbGF6eSByZWN1cnNpdmVcIjtcbm1vZHVsZS5leHBvcnRzID0gd2VicGFja0VtcHR5QXN5bmNDb250ZXh0OyIsImltcG9ydCBmcyBmcm9tIFwibm9kZTpmc1wiO1xuaW1wb3J0IHBhdGggZnJvbSBcIm5vZGU6cGF0aFwiO1xuXG5pbXBvcnQgY21ha2UgZnJvbSBcIkAvdXRpbHMvQ01ha2UuanNcIjtcbmltcG9ydCB7IG1ha2VQYXRjaCB9IGZyb20gXCJAL3V0aWxzL01ha2VQYXRjaFwiO1xuaW1wb3J0IHsgc2F2ZUlmRGlmZmVyZW50LCBkaXJlY3RvcnlFeGlzdHMsIGdldFBhdGhTdHJpbmcgfSBmcm9tIFwiQC91dGlscy9GaWxlU3lzdGVtXCI7XG5pbXBvcnQgeyBTZXR0aW5nc1N0b3JhZ2UgfSBmcm9tIFwiQC91dGlscy9TZXR0aW5nc1N0b3JhZ2UuanNcIjtcbmltcG9ydCB7IHNwYXduQXN5bmMgfSBmcm9tIFwiQC91dGlscy9DaGlsZFByb2Nlc3NcIjtcbmltcG9ydCB7IGFjdGlvbk1ha2VTY3JpcHQgfSBmcm9tIFwiQC9NYWtlU2NyaXB0Q29udGV4dC5qc1wiO1xuaW1wb3J0IHsgYXJyYXlXcmFwcGVyLCBhc3NpZ25PYmplY3QgfSBmcm9tIFwiQC91dGlscy9QcmltaXRpdmVzXCI7XG5pbXBvcnQgY29uc3RhbnRzIGZyb20gXCJAL0NvbnN0YW50cy5qc1wiO1xuaW1wb3J0IHsgcmVxdWlyZVJlc29sdmUgfSBmcm9tIFwiQC91dGlscy9Nb2R1bGVcIlxuaW1wb3J0IHsgY3JlYXRlTG9nZ2VyIH0gZnJvbSBcIkAvbG9nZ2VyXCI7XG5pbXBvcnQgeyByZXF1ZXN0R2V0IH0gZnJvbSBcIkAvdXRpbHMvSHR0cFJlcXVlc3RcIjtcblxuY29uc3QgbG9nZ2VyID0gY3JlYXRlTG9nZ2VyKGltcG9ydC5tZXRhLnVybCk7XG5cbmNvbnN0IHsgQlVJTERfQ09ORklHX0ZJTEUsIEJVSUxEX1NFVFRJTkdTX0ZJTEUgfSA9IGNvbnN0YW50cztcblxuZnVuY3Rpb24gbWVyZ2VFbnZpcm9ubWVudCguLi5hcmdzKSB7XG4gIGNvbnN0IGVudmlyb25tZW50ID0ge307XG4gIGZvciAoY29uc3QgZW52IG9mIGFyZ3MpIHtcbiAgICBjb25zdCBsaXN0ID0gT2JqZWN0LmVudHJpZXMoZW52IHx8IHt9KTtcbiAgICB3aGlsZSAobGlzdC5sZW5ndGgpIHtcbiAgICAgIGxldCBba2V5LHZhbF0gPSBsaXN0LnBvcCgpO1xuICAgICAgbGV0IGRlbGltaXRlcjtcbiAgICAgIGxldCBqb2luQWZ0ZXIgPSB0cnVlO1xuICAgICAgc3dpdGNoIChrZXkpIHtcbiAgICAgIGNhc2UgXCJQQVRIXCI6XG4gICAgICAgIGRlbGltaXRlciA9IHBhdGguZGVsaW1pdGVyO1xuICAgICAgICBqb2luQWZ0ZXIgPSBmYWxzZTtcbiAgICAgICAgYnJlYWs7XG4gICAgICBjYXNlIFwiQ0ZMQUdTXCI6XG4gICAgICBjYXNlIFwiQ1hYRkxBR1NcIjpcbiAgICAgIGNhc2UgXCJMREZMQUdTXCI6XG4gICAgICAgIGRlbGltaXRlciA9IFwiIFwiO1xuICAgICAgICBicmVhaztcbiAgICAgIH1cbiAgICAgIGlmICh0eXBlb2YgdmFsID09PSAnbnVtYmVyJylcbiAgICAgICAgdmFsID0gdmFsLnRvU3RyaW5nKCk7XG4gICAgICBlbHNlIGlmIChBcnJheS5pc0FycmF5KHZhbCkpXG4gICAgICAgIHZhbCA9IHZhbC5qb2luKGRlbGltaXRlcik7XG4gICAgICBpZiAoIWRlbGltaXRlciB8fCAhZW52aXJvbm1lbnRba2V5XSlcbiAgICAgICAgZW52aXJvbm1lbnRba2V5XSA9IHZhbDtcbiAgICAgIGVsc2UgaWYgKGpvaW5BZnRlcilcbiAgICAgICAgZW52aXJvbm1lbnRba2V5XSA9IHZhbCArIGRlbGltaXRlciArIGVudmlyb25tZW50W2tleV07XG4gICAgICBlbHNlXG4gICAgICAgIGVudmlyb25tZW50W2tleV0gPSBlbnZpcm9ubWVudFtrZXldICsgZGVsaW1pdGVyICsgdmFsO1xuICAgIH1cbiAgfVxuICByZXR1cm4gZW52aXJvbm1lbnQ7XG59XG5cbmZ1bmN0aW9uIHJlYmFzZUNvbmZpZyhjb25maWcpIHtcbiAgY29uc3QgYmFzZUNvbmZpZyA9IHt9O1xuICBjb25zdCBvdGhlckNvbmZpZyA9IHt9O1xuXG4gIGZvciAoY29uc3QgW2tleSwgZW50cnldIG9mIE9iamVjdC5lbnRyaWVzKGNvbmZpZykpIHtcbiAgICAoZW50cnkuYmFzZSA/IG90aGVyQ29uZmlnIDogYmFzZUNvbmZpZylba2V5XSA9IGVudHJ5O1xuICB9XG5cbiAgd2hpbGUgKHRydWUpIHtcbiAgICBjb25zdCBrZXlzID0gT2JqZWN0LmtleXMob3RoZXJDb25maWcpO1xuICAgIGlmIChrZXlzLmxlbmd0aCA9PSAwKVxuICAgICAgYnJlYWs7XG4gICAgY29uc3QgZG9uZUtleXMgPSBbXTtcbiAgICBmb3IgKGNvbnN0IGtleSBvZiBrZXlzKSB7XG4gICAgICBjb25zdCBvdGhlckl0ZXIgPSBvdGhlckNvbmZpZ1trZXldO1xuICAgICAgY29uc3QgYmFzZUxpc3QgPSBbXTtcbiAgICAgIGZvciAoY29uc3QgaXRlciBvZiBhcnJheVdyYXBwZXIob3RoZXJJdGVyLmJhc2UpKSB7XG4gICAgICAgIGNvbnN0IGJhc2VFbnRyeSA9IGJhc2VDb25maWdbaXRlcl07XG4gICAgICAgIGlmICghYmFzZUVudHJ5KSB7XG4gICAgICAgICAgYmFzZUxpc3QubGVuZ3RoID0gMDtcbiAgICAgICAgICBicmVhaztcbiAgICAgICAgfVxuICAgICAgICBiYXNlTGlzdC5wdXNoKGJhc2VFbnRyeSk7XG4gICAgICB9XG4gICAgICBpZiAoYmFzZUxpc3QubGVuZ3RoKSB7XG4gICAgICAgIGJhc2VMaXN0LnB1c2gob3RoZXJJdGVyKTtcbiAgICAgICAgbGV0IG5ld0VudHJ5ID0ge307XG4gICAgICAgIGZvciAoY29uc3QgaXRlciBvZiBiYXNlTGlzdCkge1xuICAgICAgICAgIGFzc2lnbk9iamVjdChuZXdFbnRyeSwgaXRlcik7XG4gICAgICAgIH1cbiAgICAgICAgYmFzZUNvbmZpZ1trZXldID0gbmV3RW50cnk7XG4gICAgICAgIGRvbmVLZXlzLnB1c2goa2V5KTtcbiAgICAgIH1cbiAgICB9XG4gICAgaWYgKGRvbmVLZXlzLmxlbmd0aCA9PSAwKSB7XG4gICAgICBmb3IgKGNvbnN0IGtleSBvZiBrZXlzKVxuICAgICAgICB0aHJvdyBgQ2FuJ3Qgc2V0IGJhc2UgY29uZmlnIGZvciBcIiR7a2V5fWA7XG4gICAgfVxuICAgIGZvciAoY29uc3Qga2V5IG9mIGRvbmVLZXlzKSB7XG4gICAgICBkZWxldGUgYmFzZUNvbmZpZ1trZXldLmJhc2U7XG4gICAgICBkZWxldGUgb3RoZXJDb25maWdba2V5XTtcbiAgICB9XG4gIH1cblxuICByZXR1cm4gYmFzZUNvbmZpZztcbn1cblxuZnVuY3Rpb24gcmVzb2x2ZVN0cmluZ1dpdGhWYXJpYWJsZShjb25maWcsIGVudHJ5Q29uZmlnLCByb290Q29uZmlnLCB2YWwpIHtcbiAgcmV0dXJuIHZhbC5yZXBsYWNlKC9cXCRcXHsoW159XSspXFx9L2csIChtYXRjaCwgdmFsdWUpID0+IHtcbiAgICBsZXQgc2VsO1xuICAgIGZvciAoY29uc3QgbmFtZSBvZiB2YWx1ZS5zcGxpdChcIi5cIikpIHtcbiAgICAgIGlmIChzZWwgPT09IHVuZGVmaW5lZCkge1xuICAgICAgICBpZiAoY29uZmlnLmhhc093blByb3BlcnR5KG5hbWUpKSB7XG4gICAgICAgICAgc2VsID0gY29uZmlnW25hbWVdO1xuICAgICAgICB9XG4gICAgICAgIGVsc2UgaWYgKGNvbmZpZyAhPT0gZW50cnlDb25maWcgJiYgZW50cnlDb25maWcuaGFzT3duUHJvcGVydHkobmFtZSkpIHtcbiAgICAgICAgICBzZWwgPSBlbnRyeUNvbmZpZ1tuYW1lXTtcbiAgICAgICAgfVxuICAgICAgICBlbHNlIGlmIChjb25maWcgIT09IHJvb3RDb25maWcgJiYgcm9vdENvbmZpZy5oYXNPd25Qcm9wZXJ0eShuYW1lKSkge1xuICAgICAgICAgIHNlbCA9IHJvb3RDb25maWdbbmFtZV07XG4gICAgICAgIH1cbiAgICAgICAgZWxzZSB7XG4gICAgICAgICAgdHJ5IHtcbiAgICAgICAgICAgIGNvbnN0IG1haW5GaWxlID0gcmVxdWlyZVJlc29sdmUobmFtZSk7XG4gICAgICAgICAgICBpZiAobWFpbkZpbGUpIHtcbiAgICAgICAgICAgICAgc2VsID0geyBtYWluRmlsZSwgbWFpbkRpcjogcGF0aC5wb3NpeC5kaXJuYW1lKG1haW5GaWxlKSwgfTtcbiAgICAgICAgICAgIH1cbiAgICAgICAgICB9IGNhdGNoKGUpIHt9XG4gICAgICAgIH1cbiAgICAgICAgaWYgKHNlbCA9PT0gdW5kZWZpbmVkKVxuICAgICAgICAgIGJyZWFrO1xuICAgICAgfVxuICAgICAgZWxzZSBpZiAoc2VsLmhhc093blByb3BlcnR5KG5hbWUpKSB7XG4gICAgICAgIHNlbCA9IHNlbFtuYW1lXTtcbiAgICAgIH1cbiAgICAgIGVsc2Uge1xuICAgICAgICBzZWwgPSB1bmRlZmluZWQ7XG4gICAgICAgIGJyZWFrO1xuICAgICAgfVxuICAgIH1cbiAgICBpZiAoc2VsID09PSB1bmRlZmluZWQpXG4gICAgICB0aHJvdyBuZXcgRXJyb3IoYFRoZSAke3ZhbHVlfSB2YXJpYWJsZSBkb2VzIG5vdCBleGlzdFwiYCk7XG4gICAgcmV0dXJuIHNlbDtcbiAgfSk7XG59XG5cbmZ1bmN0aW9uIHJlc29sdmVDb25maWdTdHJpbmdzSW1wbChjb25maWcsIGVudHJ5Q29uZmlnLCByb290Q29uZmlnKSB7XG4gIGxldCBjb3VudCA9IDA7XG4gIGZvciAoY29uc3QgW2tleSwgdmFsXSBvZiBPYmplY3QuZW50cmllcyhjb25maWcpKSB7XG4gICAgaWYgKHZhbCAmJiB0eXBlb2YgdmFsID09PSBcIm9iamVjdFwiKVxuICAgICAgY291bnQgKz0gcmVzb2x2ZUNvbmZpZ1N0cmluZ3NJbXBsKHZhbCwgZW50cnlDb25maWcsIHJvb3RDb25maWcpO1xuICAgIGVsc2UgaWYgKHR5cGVvZiB2YWwgPT09IFwic3RyaW5nXCIpIHtcbiAgICAgIGNvbnN0IHYgPSByZXNvbHZlU3RyaW5nV2l0aFZhcmlhYmxlKGNvbmZpZywgZW50cnlDb25maWcsIHJvb3RDb25maWcsIHZhbCk7XG4gICAgICBpZiAodmFsICE9PSB2KSB7XG4gICAgICAgIGNvbmZpZ1trZXldID0gdjtcbiAgICAgICAgY291bnQrKztcbiAgICAgIH1cbiAgICB9XG4gIH1cbiAgcmV0dXJuIGNvdW50O1xufVxuXG5mdW5jdGlvbiByZXNvbHZlQ29uZmlnU3RyaW5ncyhjb25maWcpIHtcbiAgZm9yICg7Oykge1xuICAgIGxldCBjb3VudCA9IDA7XG4gICAgZm9yIChjb25zdCBba2V5LCB2YWxdIG9mIE9iamVjdC5lbnRyaWVzKGNvbmZpZykpIHtcbiAgICAgIGlmICh2YWwgJiYgdHlwZW9mIHZhbCA9PT0gXCJvYmplY3RcIilcbiAgICAgICAgY291bnQgKz0gcmVzb2x2ZUNvbmZpZ1N0cmluZ3NJbXBsKHZhbCwgdmFsLCBjb25maWcpO1xuICAgICAgZWxzZSAgaWYgKHR5cGVvZiB2YWwgPT09IFwic3RyaW5nXCIpIHtcbiAgICAgICAgY29uc3QgdiA9IHJlc29sdmVTdHJpbmdXaXRoVmFyaWFibGUoY29uZmlnLCBjb25maWcsIGNvbmZpZywgdmFsKTtcbiAgICAgICAgaWYgKHZhbCAhPT0gdikge1xuICAgICAgICAgIGNvbmZpZ1trZXldID0gdjtcbiAgICAgICAgICBjb3VudCsrO1xuICAgICAgICB9XG4gICAgICB9XG4gICAgfVxuICAgIGlmICghY291bnQpXG4gICAgICBicmVhaztcbiAgfVxufVxuXG5mdW5jdGlvbiBtYWtlQnVpbGRDb25maWcoY3R4LCBjb25maWcpIHtcbiAgZm9yIChjb25zdCBrZXkgb2YgWyBcInNvdXJjZVJvb3RcIiwgXCJ3YXNtdXhEaXJcIiBdKSB7XG4gICAgaWYgKGNvbmZpZ1trZXldKSB7XG4gICAgICB0aHJvdyBgVGhlICR7a2V5fSB2YXJpYWJsZSBjYW5ub3QgYmUgY2hhbmdlZCB0byBcIiR7Y29uZmlnLnNvdXJjZVJvb3R9XCJgO1xuICAgIH1cbiAgfVxuXG4gIGNvbnN0IHJvb3RDb25maWcgPSByZWJhc2VDb25maWcoY29uZmlnKTtcblxuICByb290Q29uZmlnLmJ1aWxkVHlwZSA9IHJvb3RDb25maWcuYnVpbGRUeXBlIHx8IGN0eC5idWlsZFR5cGU7XG4gIHJvb3RDb25maWcuc291cmNlUm9vdCA9IHJvb3RDb25maWcuc291cmNlUm9vdCB8fCBjdHgud29ya0RpcjtcbiAgcm9vdENvbmZpZy5iaW5hcnlSb290ID0gcm9vdENvbmZpZy5iaW5hcnlSb290IHx8IHBhdGgucG9zaXgucmVzb2x2ZShjdHgud29ya0RpcixcImJ1aWxkXCIpO1xuXG4gIGZvciAoY29uc3QgW2tleSwgZW50cnldIG9mIE9iamVjdC5lbnRyaWVzKHJvb3RDb25maWcpKSB7XG4gICAgaWYgKGVudHJ5ICYmIHR5cGVvZiBlbnRyeSA9PT0gXCJvYmplY3RcIiAmJiBlbnRyeS5hY3Rpb24pIHtcbiAgICAgIGVudHJ5LmJ1aWxkVHlwZSA9IGVudHJ5LmJ1aWxkVHlwZSB8fCByb290Q29uZmlnLmJ1aWxkVHlwZTtcbiAgICAgIGNvbnN0IGZvbGRlciA9IGtleS5yZXBsYWNlKFwiOlwiLCBwYXRoLnBvc2l4LnNlcCk7XG4gICAgICBjb25zdCB3b3JrRGlyID0gcGF0aC5wb3NpeC5qb2luKHJvb3RDb25maWcuYmluYXJ5Um9vdCwgZm9sZGVyKTtcbiAgICAgIGVudHJ5LnRlbXBEaXIgPSBlbnRyeS50ZW1wRGlyIHx8IHBhdGgucG9zaXguam9pbih3b3JrRGlyLCBcInRtcFwiKTtcbiAgICAgIGlmIChlbnRyeS5zb3VyY2VVcmwpIHtcbiAgICAgICAgZW50cnkuYXJjaGl2ZURpciA9IGVudHJ5LmFyY2hpdmVEaXIgfHwgcGF0aC5wb3NpeC5qb2luKHdvcmtEaXIsIFwiYXJjXCIpO1xuICAgICAgICBlbnRyeS5leHRyYWN0RGlyID0gZW50cnkuZXh0cmFjdERpciB8fCBwYXRoLnBvc2l4LmpvaW4od29ya0RpciwgXCJzcmNcIik7XG4gICAgICAgIGlmICghZW50cnkuc291cmNlRGlyKVxuICAgICAgICAgIGVudHJ5LnNvdXJjZURpciA9IGVudHJ5LmV4dHJhY3REaXI7XG4gICAgICAgIGVsc2UgaWYgKCFwYXRoLmlzQWJzb2x1dGUoZW50cnkuc291cmNlRGlyKSlcbiAgICAgICAgICBlbnRyeS5zb3VyY2VEaXIgPSBwYXRoLnBvc2l4LmpvaW4oZW50cnkuZXh0cmFjdERpciwgZW50cnkuc291cmNlRGlyKTtcbiAgICAgIH1cbiAgICAgIGVsc2UgaWYgKCFlbnRyeS5zb3VyY2VEaXIpIHtcbiAgICAgICAgdGhyb3cgYE1pc3Npbmcgc291cmNlRGlyIGZvciAke2tleX0gYWN0aW9uXCJgO1xuICAgICAgfVxuICAgICAgaWYgKGVudHJ5LmJpbmFyeURpciA9PT0gbnVsbClcbiAgICAgICAgZW50cnkuYmluYXJ5RGlyID0gZW50cnkuc291cmNlRGlyO1xuICAgICAgZWxzZSBpZiAoZW50cnkuYmluYXJ5RGlyID09PSB1bmRlZmluZWQpXG4gICAgICAgIGVudHJ5LmJpbmFyeURpciA9IHBhdGgucG9zaXguam9pbih3b3JrRGlyLCBcImJpblwiKTtcbiAgICB9XG4gIH1cblxuICByZXNvbHZlQ29uZmlnU3RyaW5ncyhyb290Q29uZmlnKTtcblxuICByZXR1cm4gcm9vdENvbmZpZztcbn1cblxuYXN5bmMgZnVuY3Rpb24gdHJ5UmVxdWVzdEdldChzb3VyY2VVcmwsIGFyY0ZpbGUsIGF0dGVtcHRzKVxue1xuICBmb3IoOzspIHtcbiAgICB0cnkge1xuICAgICAgY29uc3QgYnVmZmVyID0gYXdhaXQgcmVxdWVzdEdldChzb3VyY2VVcmwpO1xuICAgICAgYXdhaXQgZnMucHJvbWlzZXMud3JpdGVGaWxlKGFyY0ZpbGUsIGJ1ZmZlcik7XG4gICAgICByZXR1cm47XG4gICAgfVxuICAgIGNhdGNoIChlKSB7XG4gICAgICBpZiAoLS1hdHRlbXB0cyA8IDApIHtcbiAgICAgICAgdGhyb3cgZTtcbiAgICAgIH1cbiAgICAgIGNvbnNvbGUud2FybihlKTtcbiAgICB9XG4gIH1cbn1cblxuYXN5bmMgZnVuY3Rpb24gZG9FeHRyYWN0QXJjaGl2ZShjdHgsIGVudmlyb25tZW50LCBjb25maWcsIHNldHRpbmdzKVxue1xuICBpZiAoIWNvbmZpZy5zb3VyY2VVcmwpXG4gICAgdGhyb3cgXCJVbmtub3duIHNvdXJjZVVybFwiO1xuICBpZiAoIWNvbmZpZy5hcmNoaXZlRGlyKVxuICAgIHRocm93IFwiVW5rbm93biBhcmNoaXZlRGlyXCI7XG4gIGlmICghY29uZmlnLmV4dHJhY3REaXIpXG4gICAgdGhyb3cgXCJVbmtub3duIGV4dHJhY3REaXJcIjtcblxuICBpZiAoIWF3YWl0IGRpcmVjdG9yeUV4aXN0cyhjb25maWcuYXJjaGl2ZURpcikpIHtcbiAgICBjb25zb2xlLmxvZyhgbWtkaXIgLXAgJHtjb25maWcuYXJjaGl2ZURpcn1gKTtcbiAgICBhd2FpdCBmcy5wcm9taXNlcy5ta2Rpcihjb25maWcuYXJjaGl2ZURpciwgeyByZWN1cnNpdmU6IHRydWUgfSk7XG4gIH1cblxuICBpZiAoIWF3YWl0IGRpcmVjdG9yeUV4aXN0cyhjb25maWcudGVtcERpcikpIHtcbiAgICBjb25zb2xlLmxvZyhgbWtkaXIgLXAgJHtjb25maWcudGVtcERpcn1gKTtcbiAgICBhd2FpdCBmcy5wcm9taXNlcy5ta2Rpcihjb25maWcudGVtcERpciwgeyByZWN1cnNpdmU6IHRydWUgfSk7XG4gIH1cblxuICBjb25zdCBhcmNOYW1lID0gcGF0aC5iYXNlbmFtZShjb25maWcuc291cmNlVXJsKTtcblxuICBsZXQgYXJjRmlsZTtcbiAgbGV0IGRvd25sb2FkVXJscyA9IGF3YWl0IHNldHRpbmdzLmdldChcImRvd25sb2FkVXJsc1wiKSB8fCB7fTtcbiAgaWYgKGRvd25sb2FkVXJsc1tjb25maWcuc291cmNlVXJsXSlcbiAgICBhcmNGaWxlID0gZG93bmxvYWRVcmxzW2NvbmZpZy5zb3VyY2VVcmxdO1xuICBlbHNlIHtcbiAgICBhcmNGaWxlID0gcGF0aC5qb2luKGNvbmZpZy5hcmNoaXZlRGlyLCBhcmNOYW1lKTtcbiAgICBhd2FpdCB0cnlSZXF1ZXN0R2V0KGNvbmZpZy5zb3VyY2VVcmwsIGFyY0ZpbGUsIGN0eC5yZXF1ZXN0QXR0ZW1wdHMpO1xuICAgIGRvd25sb2FkVXJsc1tjb25maWcuc291cmNlVXJsXSA9IGFyY0ZpbGU7XG4gICAgYXdhaXQgc2V0dGluZ3Muc2V0KFwiZG93bmxvYWRVcmxzXCIsIGRvd25sb2FkVXJscyk7XG4gIH1cblxuICBsZXQgZXh0cmFjdERpcjtcbiAgbGV0IGV4dHJhY3RGaWxlcyA9IGF3YWl0IHNldHRpbmdzLmdldChcImV4dHJhY3RGaWxlc1wiKSB8fCB7fTtcbiAgaWYgKGV4dHJhY3RGaWxlc1thcmNGaWxlXSkge1xuICAgIGV4dHJhY3REaXIgPSBleHRyYWN0RmlsZXNbYXJjRmlsZV07XG4gIH1cbiAgZWxzZSB7XG4gICAgZXh0cmFjdERpciA9IGF3YWl0IGZzLnByb21pc2VzLm1rZHRlbXAocGF0aC5yZXNvbHZlKGNvbmZpZy50ZW1wRGlyLCBhcmNOYW1lICsgJy4nKSk7XG4gIFxuICAgIGF3YWl0IGNtYWtlLmV4dHJhY3Qoe1xuICAgICAgZW52aXJvbm1lbnQsXG4gICAgICBmaWxlbmFtZTogYXJjRmlsZSxcbiAgICAgIHdvcmtEaXI6IGV4dHJhY3REaXIsXG4gICAgICBsb2dGaWxlOiAgcGF0aC5qb2luKGNvbmZpZy50ZW1wRGlyLCBwYXRoLmJhc2VuYW1lKGV4dHJhY3REaXIpICsgXCIubG9nXCIpLFxuICAgIH0pO1xuICBcbiAgICBjb25zdCBleHRyYWN0TGlzdCA9IGF3YWl0IGZzLnByb21pc2VzLnJlYWRkaXIoZXh0cmFjdERpcik7XG4gICAgaWYgKGV4dHJhY3RMaXN0Lmxlbmd0aCA9PT0gMSkge1xuICAgICAgZXh0cmFjdERpciA9IHBhdGgucmVzb2x2ZShleHRyYWN0RGlyLCBleHRyYWN0TGlzdFswXSk7XG4gICAgICBpZiAoIWF3YWl0IGRpcmVjdG9yeUV4aXN0cyhleHRyYWN0RGlyKSkge1xuICAgICAgICBjb25zb2xlLmxvZyhgcm0gLWZyICR7ZXh0cmFjdERpcn1gKTtcbiAgICAgICAgYXdhaXQgZnMucHJvbWlzZXMucm0oZXh0cmFjdERpciwgeyByZWN1cnNpdmU6IHRydWUgfSk7XG4gICAgICAgIHRocm93IGBTdXBwb3J0IG9ubHkgZGlyZWN0b3J5IGZvciBhcmNoaXZlYDtcbiAgICAgIH1cbiAgICB9XG4gIFxuICAgIGlmIChhd2FpdCBkaXJlY3RvcnlFeGlzdHMoY29uZmlnLmV4dHJhY3REaXIpKSB7XG4gICAgICAvLyBUT0RPOiBNYXJnZSBleHRyYWN0RGlyIHdpdGggb3V0cHV0XG4gICAgICBjb25zb2xlLmxvZyhgcm0gLWZyICR7Y29uZmlnLmV4dHJhY3REaXJ9YCk7XG4gICAgICBhd2FpdCBmcy5wcm9taXNlcy5ybShjb25maWcuZXh0cmFjdERpciwgeyByZWN1cnNpdmU6IHRydWUgfSk7XG4gICAgfVxuICAgIGVsc2Uge1xuICAgICAgY29uc3QgcGFyZW50RGlyID0gcGF0aC5kaXJuYW1lKGNvbmZpZy5leHRyYWN0RGlyKTtcbiAgICAgIGlmICghYXdhaXQgZGlyZWN0b3J5RXhpc3RzKHBhcmVudERpcikpIHtcbiAgICAgICAgY29uc29sZS5sb2coYG1rZGlyIC1wICR7cGFyZW50RGlyfWApO1xuICAgICAgICBhd2FpdCBmcy5wcm9taXNlcy5ta2RpcihwYXJlbnREaXIsIHsgcmVjdXJzaXZlOiB0cnVlIH0pOyBcbiAgICAgIH1cbiAgICB9XG4gIFxuICAgIGNvbnNvbGUubG9nKGBtdiAke2V4dHJhY3REaXJ9ICR7Y29uZmlnLmV4dHJhY3REaXJ9YCk7XG4gICAgYXdhaXQgZnMucHJvbWlzZXMucmVuYW1lKGV4dHJhY3REaXIsIGNvbmZpZy5leHRyYWN0RGlyKTtcbiAgXG4gICAgZXh0cmFjdEZpbGVzW2FyY0ZpbGVdID0gZXh0cmFjdERpcjtcbiAgICBhd2FpdCBzZXR0aW5ncy5zZXQoXCJleHRyYWN0RmlsZXNcIiwgZXh0cmFjdEZpbGVzKTtcbiAgfVxuXG4gIGlmIChjb25maWcucGF0Y2hEaXIpIHtcbiAgICBsZXQgcGF0Y2hEaXJzID0gYXdhaXQgc2V0dGluZ3MuZ2V0KFwicGF0Y2hEaXJzXCIpIHx8IHt9O1xuICAgIGlmICghcGF0Y2hEaXJzW2NvbmZpZy5wYXRjaERpcl0pIHtcbiAgICAgIGF3YWl0IG1ha2VQYXRjaChjb25maWcucGF0Y2hEaXIsIGNvbmZpZy5leHRyYWN0RGlyKTtcbiAgICAgIHBhdGNoRGlyc1tjb25maWcucGF0Y2hEaXJdID0gY29uZmlnLmV4dHJhY3REaXI7XG4gICAgICBhd2FpdCBzZXR0aW5ncy5zZXQoXCJwYXRjaERpcnNcIiwgcGF0Y2hEaXJzKTtcbiAgICB9XG4gIH1cbn1cblxuY29uc3QgYWN0aW9uSGFuZGxlcnMgPSB7XG4gIG5vbmU6IGFzeW5jIChjb25maWcsIGVudmlyb25tZW50LCBzZXR0aW5ncykgPT4ge1xuICAgIC8qIGRvIG5vdGhpbmcgKi9cbiAgfSxcbiAgY21ha2U6IGFzeW5jIChjb25maWcsIGVudmlyb25tZW50LCBzZXR0aW5ncykgPT4ge1xuICAgIGNvbnN0IHNvdXJjZURpciA9IGdldFBhdGhTdHJpbmcoY29uZmlnLnNvdXJjZURpcik7XG4gICAgY29uc3QgYmluYXJ5RGlyID0gZ2V0UGF0aFN0cmluZyhjb25maWcuYmluYXJ5RGlyKTtcbiAgICBjb25zdCBjbWFrZUFyZ3MgPSB7XG4gICAgICBlbnZpcm9ubWVudDoge1xuICAgICAgICAuLi5lbnZpcm9ubWVudCxcbiAgICAgICAgREVTVERJUjogY29uZmlnLmRlc3REaXIsXG4gICAgICB9LFxuICAgICAgZ2VuZXJhdG9yOiBjb25maWcuZ2VuZXJhdG9yIHx8IFwiVW5peCBNYWtlZmlsZXNcIixcbiAgICAgIGNhY2hlVmFyaWFibGVzOiBjb25maWcuY2FjaGVWYXJpYWJsZXMsXG4gICAgICBzb3VyY2VEaXIsXG4gICAgICBiaW5hcnlEaXIsXG4gICAgfTtcblxuICAgIGlmICghY21ha2VBcmdzLmNhY2hlVmFyaWFibGVzLkNNQUtFX0JVSUxEX1RZUEUpIHtcbiAgICAgIGNtYWtlQXJncy5jYWNoZVZhcmlhYmxlcy5DTUFLRV9CVUlMRF9UWVBFID0gY29uZmlnLmJ1aWxkVHlwZTtcbiAgICB9XG5cbiAgICBhd2FpdCBjbWFrZS5jb25maWd1cmUoY21ha2VBcmdzKTtcbiAgICBhd2FpdCBjbWFrZS5idWlsZChjbWFrZUFyZ3MpO1xuICAgIGF3YWl0IGNtYWtlLmluc3RhbGwoY21ha2VBcmdzKTtcbiAgfSxcbiAgY29uZmlndXJlOiBhc3luYyAoY29uZmlnLCBlbnZpcm9ubWVudCwgc2V0dGluZ3MpID0+IHtcbiAgICBjb25zdCBzb3VyY2VEaXIgPSBnZXRQYXRoU3RyaW5nKGNvbmZpZy5zb3VyY2VEaXIpO1xuICAgIGNvbnN0IGJpbmFyeURpciA9IGdldFBhdGhTdHJpbmcoY29uZmlnLmJpbmFyeURpcik7XG4gICAgbGV0IHN0ZXAgPSBhd2FpdCBzZXR0aW5ncy5nZXQoXCJjb25maWd1cmVcIikgfHwgXCJjb25maWdcIjtcbiAgICBpZiAoc3RlcCA9PT0gXCJjb25maWdcIikge1xuICAgICAgY29uc3QgY29tbWFuZCA9IHBhdGgucmVzb2x2ZShzb3VyY2VEaXIsIFwiY29uZmlndXJlXCIpO1xuICAgICAgY29uc3QgcGFyYW1zID0gW107XG4gICAgICBpZiAoQXJyYXkuaXNBcnJheShjb25maWcudmFyaWFibGVzKSkge1xuICAgICAgICBmb3IgKGNvbnN0IGl0ZXIgb2YgY29uZmlnLnZhcmlhYmxlcylcbiAgICAgICAgICBwYXJhbXMucHVzaChpdGVyKTtcbiAgICAgIH1cbiAgICAgIGVsc2UgaWYgKGNvbmZpZy52YXJpYWJsZXMpIHtcbiAgICAgICAgZm9yIChjb25zdCBba2V5LHZhbF0gb2YgT2JqZWN0LmVudHJpZXMoY29uZmlnLnZhcmlhYmxlcykpIHtcbiAgICAgICAgICBpZiAoa2V5ID09PSBcImZlYXR1cmVzXCIgJiYgQXJyYXkuaXNBcnJheSh2YWwpKSB7XG4gICAgICAgICAgICBmb3IgKGNvbnN0IGl0ZXIgb2YgdmFsKVxuICAgICAgICAgICAgICBwYXJhbXMucHVzaChgLS0ke2l0ZXJ9YCk7XG4gICAgICAgICAgfVxuICAgICAgICAgIGVsc2UgaWYgKHZhbCA9PT0gbnVsbClcbiAgICAgICAgICAgIHBhcmFtcy5wdXNoKGAtLSR7a2V5fWApO1xuICAgICAgICAgIGVsc2VcbiAgICAgICAgICAgIHBhcmFtcy5wdXNoKGAtLSR7a2V5fT0ke3ZhbH1gKTtcbiAgICAgICAgfVxuICAgICAgfVxuICAgICAgaWYgKGNvbmZpZy5mZWF0dXJlcykge1xuICAgICAgICBmb3IgKGNvbnN0IGtleSBvZiBjb25maWcuZmVhdHVyZXMpXG4gICAgICAgICAgcGFyYW1zLnB1c2goYC0tJHtrZXl9YCk7XG4gICAgICB9XG4gICAgICBjb25zdCByZXMxID0gYXdhaXQgc3Bhd25Bc3luYyhjb21tYW5kLCBwYXJhbXMsIHtcbiAgICAgICAgY3dkOiBiaW5hcnlEaXIsXG4gICAgICAgIGVudjogZW52aXJvbm1lbnQsXG4gICAgICAgIGV4dHJhOiB7XG4gICAgICAgICAgb3V0cHV0OiBgYWMuY29uZmlnLmxvZ2AsXG4gICAgICAgIH0sXG4gICAgICB9KTtcbiAgICAgIGlmIChyZXMxLnN0YXR1cyAhPT0gMCkge1xuICAgICAgICB0aHJvdyBgY29uZmlndXJlIHJldHVybmVkIHN0YXR1cyAke3JlczEuc3RhdHVzfWA7XG4gICAgICB9XG4gICAgICBzdGVwID0gXCJpbnN0YWxsXCI7XG4gICAgICBhd2FpdCBzZXR0aW5ncy5zZXQoXCJjb25maWd1cmVcIiwgc3RlcCk7XG4gICAgfVxuICAgIGlmIChzdGVwID09PSBcImluc3RhbGxcIikge1xuICAgICAgY29uc3QgYXJncyA9IFsgJ2luc3RhbGwnIF07XG4gICAgICBpZiAoY29uZmlnLmRlc3REaXIpIHtcbiAgICAgICAgYXJncy5wdXNoKGBERVNURElSPSR7Y29uZmlnLmRlc3REaXJ9YCk7XG4gICAgICB9XG4gICAgICBjb25zdCByZXMyID0gYXdhaXQgc3Bhd25Bc3luYyhcIm1ha2VcIiwgYXJncywge1xuICAgICAgICBjd2Q6IGJpbmFyeURpcixcbiAgICAgICAgZW52OiBlbnZpcm9ubWVudCxcbiAgICAgICAgZXh0cmE6IHtcbiAgICAgICAgICBvdXRwdXQ6IGBhYy5idWlsZC5sb2dgLFxuICAgICAgICB9LFxuICAgICAgfSk7XG4gICAgICBpZiAocmVzMi5zdGF0dXMgIT09IDApIHtcbiAgICAgICAgdGhyb3cgYG1ha2UgcmV0dXJuZWQgc3RhdHVzICR7cmVzMi5zdGF0dXN9YDtcbiAgICAgIH1cbiAgICAgIHN0ZXAgPSBcImRvbmVcIjtcbiAgICAgIGF3YWl0IHNldHRpbmdzLnNldChcImNvbmZpZ3VyZVwiLCBzdGVwKTtcbiAgICB9XG4gIH0sXG4gIG1ha2U6IGFzeW5jIChjb25maWcsIGVudmlyb25tZW50LCBzZXR0aW5ncykgPT4ge1xuICAgIGNvbnN0IGJpbmFyeURpciA9IGdldFBhdGhTdHJpbmcoY29uZmlnLmJpbmFyeURpcik7XG4gICAgY29uc3QgYXJncyA9IGNvbmZpZy5hcmdzIHx8IFtdO1xuICAgIGlmIChjb25maWcuZGVzdERpcikge1xuICAgICAgYXJncy5wdXNoKGBERVNURElSPSR7Y29uZmlnLmRlc3REaXJ9YCk7XG4gICAgfVxuICAgIGNvbnN0IHJlczIgPSBhd2FpdCBzcGF3bkFzeW5jKFwibWFrZVwiLCBhcmdzLCB7XG4gICAgICBjd2Q6IGJpbmFyeURpcixcbiAgICAgIGVudjogZW52aXJvbm1lbnQsXG4gICAgICBleHRyYToge1xuICAgICAgICBvdXRwdXQ6IGBtYWtlLmxvZ2AsXG4gICAgICB9LFxuICAgIH0pO1xuICAgIGlmIChyZXMyLnN0YXR1cyAhPT0gMCkge1xuICAgICAgdGhyb3cgYG1ha2UgcmV0dXJuZWQgc3RhdHVzICR7cmVzMi5zdGF0dXN9YDtcbiAgICB9XG4gIH0sXG4gIHByb2Nlc3M6IGFzeW5jIChjb25maWcsIGVudmlyb25tZW50LCBzZXR0aW5ncykgPT4ge1xuICAgIGlmICghY29uZmlnLmNvbW1hbmQpXG4gICAgICB0aHJvdyBcIlJlcXVpcmVkIGNvbW1hbmQgZmllbGQgZm9yIHByb2Nlc3MgYWN0aW9uXCI7XG4gICAgY29uc3Qgc291cmNlRGlyID0gZ2V0UGF0aFN0cmluZyhjb25maWcuc291cmNlRGlyKTtcbiAgICBjb25zdCBiaW5hcnlEaXIgPSBnZXRQYXRoU3RyaW5nKGNvbmZpZy5iaW5hcnlEaXIpO1xuICAgIGxldCB7IGNvbW1hbmQgfSA9IGNvbmZpZztcbiAgICBpZiAoIXBhdGguaXNBYnNvbHV0ZShjb21tYW5kKSAmJiAoY29tbWFuZC5pbmNsdWRlcyhwYXRoLnBvc2l4LmRlbGltaXRlcikgfHwgY29tbWFuZC5pbmNsdWRlcyhwYXRoLndpbjMyLmRlbGltaXRlcikpKSB7XG4gICAgICBjb21tYW5kID0gcGF0aC5yZXNvbHZlKHNvdXJjZURpciwgY29tbWFuZCk7XG4gICAgfVxuICAgIGNvbnN0IHJlcyA9IGF3YWl0IHNwYXduQXN5bmMoY29tbWFuZCwgY29uZmlnLmFyZ3MgfHwgW10sIHtcbiAgICAgIGN3ZDogYmluYXJ5RGlyLFxuICAgICAgZW52OiBlbnZpcm9ubWVudCxcbiAgICAgIGV4dHJhOiB7XG4gICAgICAgIG91dHB1dDogYHByb2Nlc3MubG9nYCxcbiAgICAgIH0sXG4gICAgfSk7XG4gICAgaWYgKHJlcy5zdGF0dXMgIT09IDApIHtcbiAgICAgIHRocm93IGBwcm9jZXNzIHJldHVybmVkIHN0YXR1cyAke3Jlcy5zdGF0dXN9YDtcbiAgICB9XG4gIH0sXG4gIGJpdG1ha2U6IGFjdGlvbk1ha2VTY3JpcHQsXG59O1xuXG5hc3luYyBmdW5jdGlvbiBkb1RhcmdldEJ1aWxkKGN0eCwgZW52aXJvbm1lbnQsIGNvbmZpZywgc2V0dGluZ3MpXG57XG4gIGlmIChjb25maWcucHJlQWN0aW9uKSB7XG4gICAgYXdhaXQgc2V0dGluZ3MucHVzaChcInByZUFjdGlvblwiKTtcbiAgICBjb25zdCBuZXdDb25maWcgPSB7fTtcbiAgICBhc3NpZ25PYmplY3QobmV3Q29uZmlnLCBjb25maWcpO1xuICAgIGRlbGV0ZSBuZXdDb25maWcuYWN0aW9uO1xuICAgIGRlbGV0ZSBuZXdDb25maWcucHJlQWN0aW9uO1xuICAgIGRlbGV0ZSBuZXdDb25maWcucG9zdEFjdGlvbjtcbiAgICBhc3NpZ25PYmplY3QobmV3Q29uZmlnLCBjb25maWcucHJlQWN0aW9uKTtcbiAgICBjb25zdCBuZXdFbnZpcm9ubWVudCA9IG1lcmdlRW52aXJvbm1lbnQoY29uZmlnLnByZUFjdGlvbi5lbnZpcm9ubWVudCwgZW52aXJvbm1lbnQpO1xuICAgIGF3YWl0IGRvVGFyZ2V0QnVpbGQoY3R4LCBuZXdFbnZpcm9ubWVudCwgbmV3Q29uZmlnLCBzZXR0aW5ncyk7XG4gICAgYXdhaXQgc2V0dGluZ3MucG9wKCk7XG4gIH1cblxuICBpZiAoQXJyYXkuaXNBcnJheShjb25maWcuYWN0aW9uKSkge1xuICAgIGF3YWl0IHNldHRpbmdzLnB1c2goXCJhY3Rpb25cIik7XG4gICAgZm9yICh2YXIgaSA9IDA7IGkgPCBjb25maWcuYWN0aW9uLmxlbmd0aDsgKytpKSB7XG4gICAgICBhd2FpdCBzZXR0aW5ncy5wdXNoKGkpO1xuICAgICAgY29uc3QgbmV3Q29uZmlnID0ge307XG4gICAgICBhc3NpZ25PYmplY3QobmV3Q29uZmlnLCBjb25maWcpO1xuICAgICAgZGVsZXRlIG5ld0NvbmZpZy5hY3Rpb247XG4gICAgICBkZWxldGUgbmV3Q29uZmlnLnByZUFjdGlvbjtcbiAgICAgIGRlbGV0ZSBuZXdDb25maWcucG9zdEFjdGlvbjtcbiAgICAgIGFzc2lnbk9iamVjdChuZXdDb25maWcsIGNvbmZpZy5hY3Rpb25baV0pO1xuICAgICAgY29uc3QgbmV3RW52aXJvbm1lbnQgPSBtZXJnZUVudmlyb25tZW50KGNvbmZpZy5hY3Rpb25baV0uZW52aXJvbm1lbnQsIGVudmlyb25tZW50KTtcbiAgICAgIGF3YWl0IGRvVGFyZ2V0QnVpbGQoY3R4LCBuZXdFbnZpcm9ubWVudCwgbmV3Q29uZmlnLCBzZXR0aW5ncyk7XG4gICAgICBhd2FpdCBzZXR0aW5ncy5wb3AoKTtcbiAgICB9XG4gICAgYXdhaXQgc2V0dGluZ3MucG9wKCk7XG4gIH1cbiAgZWxzZSB7XG4gICAgaWYgKCFhd2FpdCBkaXJlY3RvcnlFeGlzdHMoY29uZmlnLmJpbmFyeURpcikpIHtcbiAgICAgIGF3YWl0IGZzLnByb21pc2VzLm1rZGlyKGNvbmZpZy5iaW5hcnlEaXIsIHsgcmVjdXJzaXZlOiB0cnVlIH0pO1xuICAgIH1cbiAgICBpZiAoYWN0aW9uSGFuZGxlcnNbY29uZmlnLmFjdGlvbl0pIHtcbiAgICAgIGNvbmZpZy5kZXNjcmlwdGlvbiAmJiBjb25zb2xlLmxvZyhjb25maWcuZGVzY3JpcHRpb24pO1xuICAgICAgYXdhaXQgYWN0aW9uSGFuZGxlcnNbY29uZmlnLmFjdGlvbl0oY29uZmlnLCBlbnZpcm9ubWVudCwgc2V0dGluZ3MpO1xuICAgIH1cbiAgfVxuXG4gIGlmIChjb25maWcucG9zdEFjdGlvbikge1xuICAgIGF3YWl0IHNldHRpbmdzLnB1c2goXCJwb3N0QWN0aW9uXCIpO1xuICAgIGNvbnN0IG5ld0NvbmZpZyA9IHt9O1xuICAgIGFzc2lnbk9iamVjdChuZXdDb25maWcsIGNvbmZpZyk7XG4gICAgZGVsZXRlIG5ld0NvbmZpZy5hY3Rpb247XG4gICAgZGVsZXRlIG5ld0NvbmZpZy5wcmVBY3Rpb247XG4gICAgZGVsZXRlIG5ld0NvbmZpZy5wb3N0QWN0aW9uO1xuICAgIGFzc2lnbk9iamVjdChuZXdDb25maWcsIGNvbmZpZy5wb3N0QWN0aW9uKTtcbiAgICBjb25zdCBuZXdFbnZpcm9ubWVudCA9IG1lcmdlRW52aXJvbm1lbnQoY29uZmlnLnBvc3RBY3Rpb24uZW52aXJvbm1lbnQsIGVudmlyb25tZW50KTtcbiAgICBhd2FpdCBkb1RhcmdldEJ1aWxkKGN0eCwgbmV3RW52aXJvbm1lbnQsIG5ld0NvbmZpZywgc2V0dGluZ3MpO1xuICAgIGF3YWl0IHNldHRpbmdzLnBvcCgpO1xuICB9XG59XG5cbmV4cG9ydCBkZWZhdWx0IGFzeW5jIGZ1bmN0aW9uKGN0eCkge1xuICBjb25zdCB1c2VyQ29uZmlnID0gYXdhaXQgY3R4LmdldFVzZXJDb25maWcoKTtcbiAgY29uc3QgYnVpbGRDb25maWcgPSBtYWtlQnVpbGRDb25maWcoY3R4LCB1c2VyQ29uZmlnKTtcblxuICBjb25zdCBqc29uQ29uZmlnID0gSlNPTi5zdHJpbmdpZnkoYnVpbGRDb25maWcsIG51bGwsIDIpO1xuICBjb25zdCBkdW1wQ29uZmlnUGF0aCA9IHBhdGgucG9zaXguam9pbihidWlsZENvbmZpZy5iaW5hcnlSb290LCBCVUlMRF9DT05GSUdfRklMRSk7XG4gIGF3YWl0IHNhdmVJZkRpZmZlcmVudChkdW1wQ29uZmlnUGF0aCwganNvbkNvbmZpZyk7XG5cbiAgY29uc3Qgc2V0dGluZ3NGaWxlbmFtZSA9IHBhdGgucmVzb2x2ZShidWlsZENvbmZpZy5iaW5hcnlSb290LCBCVUlMRF9TRVRUSU5HU19GSUxFKTtcbiAgY29uc3Qgc2V0dGluZ3MgPSBuZXcgU2V0dGluZ3NTdG9yYWdlKHNldHRpbmdzRmlsZW5hbWUpO1xuXG4gIGZvciAoY29uc3QgW2tleSwgZW50cnldIG9mIE9iamVjdC5lbnRyaWVzKGJ1aWxkQ29uZmlnKSkge1xuICAgIGlmIChlbnRyeSAmJiB0eXBlb2YgZW50cnkgPT09IFwib2JqZWN0XCIgJiYgZW50cnkuYWN0aW9uICYmICFlbnRyeS5kaXNhYmxlZCkge1xuICAgICAgYXdhaXQgc2V0dGluZ3MucHVzaChrZXkpO1xuICAgICAgY29uc3QgY29tcGxldGVkID0gYXdhaXQgc2V0dGluZ3MuZ2V0KFwiY29tcGxldGVkXCIpO1xuICAgICAgaWYgKGVudHJ5LnJlYnVpbGQgfHwgIWNvbXBsZXRlZCkge1xuICAgICAgICBsb2dnZXIuaW5mbyhgU3RhcnRlZCBhY3Rpb246ICR7a2V5fWApO1xuICAgICAgICBjb25zdCBlbnZpcm9ubWVudCA9IG1lcmdlRW52aXJvbm1lbnQoZW50cnkuZW52aXJvbm1lbnQsIHByb2Nlc3MuZW52KTtcbiAgICAgICAgaWYgKGVudHJ5LnNvdXJjZVVybCkge1xuICAgICAgICAgIGF3YWl0IGRvRXh0cmFjdEFyY2hpdmUoY3R4LCBlbnZpcm9ubWVudCwgZW50cnksIHNldHRpbmdzKTtcbiAgICAgICAgfVxuICAgICAgICBhd2FpdCBkb1RhcmdldEJ1aWxkKGN0eCwgZW52aXJvbm1lbnQsIGVudHJ5LCBzZXR0aW5ncyk7XG4gICAgICAgIGF3YWl0IHNldHRpbmdzLnNldChcImNvbXBsZXRlZFwiLCB0cnVlKTtcbiAgICAgICAgbG9nZ2VyLmluZm8oYENvbXBsZXRlZCBhY3Rpb246ICR7a2V5fWApO1xuICAgICAgfVxuICAgICAgYXdhaXQgc2V0dGluZ3MucG9wKCk7XG4gICAgfVxuICB9XG59XG4iLCJtb2R1bGUuZXhwb3J0cyA9IHtcbiAgREVGQVVMVF9QUkVTRVQ6IFwibWFpblwiLFxuICBVU0VSX0NPTkZJRzogXCJiaXRtYWtlLmNvbmZpZy5tanNcIixcbiAgUkVRVUVTVF9BVFRFTVBUUzogMzAsXG4gIEJVSUxEX0NPTkZJR19GSUxFOiBcIkJ1aWxkQ29uZmlnLmpzb25cIixcbiAgQlVJTERfU0VUVElOR1NfRklMRTogXCJCdWlsZFNldHRpbmdzLmpzb25cIixcbn07XG4iLCJpbXBvcnQgZnMgZnJvbSBcIm5vZGU6ZnNcIjtcblxuaW1wb3J0IHsgZmlsZUV4aXN0cyB9IGZyb20gXCJAL3V0aWxzL0ZpbGVTeXN0ZW1cIjtcbmltcG9ydCB7IERFRkFVTFRfUFJFU0VUIH0gZnJvbSBcIkAvQ29uc3RhbnRzLmpzXCI7XG5cbmV4cG9ydCBkZWZhdWx0IGFzeW5jIGZ1bmN0aW9uKGN0eClcbntcbiAgY29uc3QgcHJlc2V0ID0gY3R4LmVudi5wcmVzZXQgfHwgREVGQVVMVF9QUkVTRVQ7XG4gIGNvbnN0IHByZXNldFBhdGggPSBjdHguZ2V0UHJlc2V0UGF0aChwcmVzZXQpO1xuICBpZiAoIWF3YWl0IGZpbGVFeGlzdHMocHJlc2V0UGF0aCkpXG4gICAgdGhyb3cgYFByZXNldCAnJHtwcmVzZXR9JyBpcyBub3QgYXZhaWxhYmxlYDtcblxuICBpZiAoYXdhaXQgZmlsZUV4aXN0cyhjdHgudXNlckNvbmZpZ1BhdGgpKVxuICAgIGF3YWl0IGZzLnByb21pc2VzLnJtKGN0eC51c2VyQ29uZmlnUGF0aCk7XG5cbiAgYXdhaXQgZnMucHJvbWlzZXMuY29weUZpbGUocHJlc2V0UGF0aCwgY3R4LnVzZXJDb25maWdQYXRoKTtcbiAgY29uc29sZS5sb2coYFByZXNldCAnJHtwcmVzZXR9JyBpbnN0YWxsZWQgc3VjY2Vzc2Z1bGx5YCk7XG59XG4iLCJcInVzZSBzdHJpY3RcIjtcblxuY29uc3QgZnMgPSByZXF1aXJlKFwibm9kZTpmc1wiKTtcbmNvbnN0IHBhdGggPSByZXF1aXJlKFwibm9kZTpwYXRoXCIpO1xuXG5jb25zdCB7IFVzZXJDb250ZXh0IH0gPSByZXF1aXJlKFwiLi9iaXRtYWtlL1VzZXJDb250ZXh0LmpzXCIpO1xuY29uc3QgeyBQbHVnaW5Db250ZXh0IH0gPSByZXF1aXJlKFwiQC9jb3JlL1BsdWdpbkNvbnRleHRcIik7XG5jb25zdCB7IEdsb2JhbENvbnRleHQgfSA9IHJlcXVpcmUoXCIuL2JpdG1ha2UvR2xvYmFsQ29udGV4dC5qc1wiKTtcbmNvbnN0IHsgU3lzdGVtVmFyaWFibGVzIH0gPSByZXF1aXJlKFwiLi9iaXRtYWtlL1N5c3RlbVZhcmlhYmxlcy5qc1wiKTtcbmNvbnN0IHsgR29hbENvbGxlY3Rpb24gfSA9IHJlcXVpcmUoXCJAL2NvcmUvR29hbENvbGxlY3Rpb25cIik7XG5jb25zdCB7IGdldFBhdGhTdHJpbmcgfSAgPSByZXF1aXJlKFwiQC91dGlscy9GaWxlU3lzdGVtXCIpO1xuY29uc3QgeyBGaWxlUGF0aCB9ID0gcmVxdWlyZShcIkAvY29yZS9QYXRoXCIpO1xuY29uc3QgeyBpbXBvcnRNb2R1bGUgfSAgPSByZXF1aXJlKFwiQC91dGlscy9Nb2R1bGVcIik7XG5jb25zdCBTeXNWYXJzID0gcmVxdWlyZShcIkAvY29yZS9TeXN0ZW1WYXJpYWJsZXNcIik7XG5cbmNvbnN0IFBBQ0tBR0VfSlNPTiA9IFwicGFja2FnZS5qc29uXCI7XG5jb25zdCBNQUtFX0NBQ0hFID0gXCJNYWtlQ2FjaGUuanNvblwiO1xuXG5hc3luYyBmdW5jdGlvbiBhY3Rpb25NYWtlU2NyaXB0KGNvbmZpZywgZW52aXJvbm1lbnQsIHNldHRpbmdzKVxue1xuICBwcm9jZXNzLmVudiA9IGVudmlyb25tZW50O1xuXG4gIFN5c3RlbVZhcmlhYmxlcy5kZWZpbmVWYXJpYWJsZXMoU3lzdGVtVmFyaWFibGVzLnByb3RvdHlwZSwgU3lzVmFycy5kZWZhdWx0KTtcbiAgY29uc3Qgc2NvcGUgPSBTeXN0ZW1WYXJpYWJsZXMuY3JlYXRlKCk7XG5cbiAgY29uc3Qgc291cmNlRGlyID0gZ2V0UGF0aFN0cmluZyhjb25maWcuc291cmNlRGlyKTtcbiAgY29uc3QgYmluYXJ5RGlyID0gZ2V0UGF0aFN0cmluZyhjb25maWcuYmluYXJ5RGlyKTtcblxuICBzY29wZS5QUk9KRUNUX1NPVVJDRV9ESVIgPSBzb3VyY2VEaXI7XG4gIHNjb3BlLlBST0pFQ1RfQklOQVJZX0RJUiA9IGJpbmFyeURpcjtcblxuICBzY29wZS5QQUNLQUdFX0ZJTEUgPSBzY29wZS5QUk9KRUNUX1NPVVJDRV9ESVIuam9pbihQQUNLQUdFX0pTT04pO1xuICBzY29wZS5DQUNIRV9GSUxFID0gc2NvcGUuUFJPSkVDVF9CSU5BUllfRElSLmpvaW4oTUFLRV9DQUNIRSk7XG4gIHNjb3BlLlNPVVJDRV9ESVIgPSBzY29wZS5QUk9KRUNUX1NPVVJDRV9ESVI7XG4gIHNjb3BlLkJJTkFSWV9ESVIgPSBzY29wZS5QUk9KRUNUX0JJTkFSWV9ESVI7XG5cbiAgY29uc3QgZ2xvYmFsID0gR2xvYmFsQ29udGV4dC5jcmVhdGUoKTtcbiAgZ2xvYmFsLmxvYWRDYWNoZVZhcmlhYmxlcyhzY29wZS5DQUNIRV9GSUxFKTtcblxuICBjb25zdCBwYWNrYWdlSnNvbiA9IGF3YWl0IGZzLnByb21pc2VzLnJlYWRGaWxlKHNjb3BlLlBBQ0tBR0VfRklMRS50b1N0cmluZygpLCAndXRmOCcpO1xuICBjb25zdCBwa2cgPSBKU09OLnBhcnNlKHBhY2thZ2VKc29uKTtcblxuICBzY29wZS5CVUlMRF9UWVBFID0gY29uZmlnLmJ1aWxkVHlwZTtcbiAgc2NvcGUuUFJPSkVDVF9OQU1FID0gcGtnLm5hbWU7XG4gIHNjb3BlLlBST0pFQ1RfVkVSU0lPTiA9IHBrZy52ZXJzaW9uO1xuICBzY29wZS5QUk9KRUNUX0RFU0NSSVBUSU9OID0gcGtnLmRlc2NyaXB0aW9uO1xuICBzY29wZS5QUk9KRUNUX0hPTUVQQUdFX1VSTCA9IHBrZy5ob21lcGFnZTtcblxuICBpZiAoY29uZmlnLmRlc3REaXIpXG4gICAgc2NvcGUuREVTVERJUiA9IGNvbmZpZy5kZXN0RGlyO1xuXG4gIGNvbnN0IHJvb3QgPSBVc2VyQ29udGV4dC5jcmVhdGUoc2NvcGUsIGdsb2JhbCk7XG5cbiAgaWYgKGNvbmZpZy52YXJpYWJsZXMpIHtcbiAgICBmb3IgKGNvbnN0IFtrZXksIHZhbF0gb2YgT2JqZWN0LmVudHJpZXMoY29uZmlnLnZhcmlhYmxlcykpIHtcbiAgICAgIHJvb3Rba2V5XSA9IHZhbDtcbiAgICB9XG4gIH1cblxuICBpZiAocm9vdC5UT09MQ0hBSU5fRklMRSkge1xuICAgIGNvbnN0IHRvb2xjaGFpbiA9IGF3YWl0IGltcG9ydE1vZHVsZShyb290LlRPT0xDSEFJTl9GSUxFKTtcbiAgICBpZiAoIXRvb2xjaGFpbi5kZWZhdWx0KVxuICAgICAgdGhyb3cgbmV3IEVycm9yKFwiVG9vbGNoYWluIG1vZHVsZSBoYXMgbm8gZGVmYXVsdCBleHBvcnRcIik7XG4gICAgY29uc3QgcmVzdWx0ID0gdG9vbGNoYWluLmRlZmF1bHQocm9vdCk7XG4gICAgaWYgKHJlc3VsdCBpbnN0YW5jZW9mIFByb21pc2UpXG4gICAgICBhd2FpdCByZXN1bHQ7XG4gIH1cblxuICBjb25zdCBwbHVnaW5Db250ZXh0ID0gUGx1Z2luQ29udGV4dC5jcmVhdGUoc2NvcGUsIGdsb2JhbCk7XG4gIGZvciAoY29uc3QgcGx1Z2luIG9mIChyb290Lk1BS0VfUExVR0lOX0xJU1QgfHwgW10pKSB7XG4gICAgY29uc3QgZmlsZW5hbWUgPSBGaWxlUGF0aC5jcmVhdGUocGx1Z2luKTtcbiAgICBjb25zdCBtb2R1bGUgPSBhd2FpdCBpbXBvcnRNb2R1bGUoZmlsZW5hbWUudG9TdHJpbmcoKSk7XG4gICAgaWYgKCFtb2R1bGUucGx1Z2luRW50cnkpXG4gICAgICB0aHJvdyBuZXcgRXJyb3IoYFBsdWdpbiAke2ZpbGVuYW1lLmJhc2VuYW1lKCl9IG5vdCBjb250YWluIHBsdWdpbkVudHJ5IGZ1bmN0aW9uYCk7XG4gICAgY29uc3QgcmVzdWx0ID0gbW9kdWxlLnBsdWdpbkVudHJ5KHBsdWdpbkNvbnRleHQpO1xuICAgIGlmIChyZXN1bHQgaW5zdGFuY2VvZiBQcm9taXNlKVxuICAgICAgYXdhaXQgcmVzdWx0O1xuICB9XG5cbiAgZ2xvYmFsLmFkZFN1YmRpcmVjdG9yeShyb290KTtcbiAgYXdhaXQgZ2xvYmFsLmRvU3ViZGlyZWN0b3J5KCk7XG4gIHJvb3QubG9nSW5mbyhcIkNvbmZpZ3VyaW5nIGRvbmVcIik7XG5cbiAgaWYgKHJvb3QuR0xPQkFMX0NPTlRFWFRfSlNPTikge1xuICAgIGNvbnN0IGZpbGVuYW1lID0gcm9vdC5HTE9CQUxfQ09OVEVYVF9KU09OLnRvU3RyaW5nKCk7XG4gICAgY29uc3QgY29udGVudCA9IEpTT04uc3RyaW5naWZ5KGdsb2JhbCwgbnVsbCwgMik7XG4gICAgZnMubWtkaXJTeW5jKHBhdGguZGlybmFtZShmaWxlbmFtZSksIHsgcmVjdXJzaXZlOiB0cnVlIH0pO1xuICAgIGZzLndyaXRlRmlsZVN5bmMoZmlsZW5hbWUsIGNvbnRlbnQsIHsgZW5jb2Rpbmc6IFwidXRmOFwiIH0pO1xuICB9XG5cbiAgY29uc3QgYWxsR29hbExpc3QgPSBnbG9iYWwuY3JlYXRlR29hbHMocm9vdCk7XG4gIGNvbnN0IGdvYWxMaXN0ID0gYWxsR29hbExpc3QuZ2V0VGFyZ2V0TGlzdChcImluc3RhbGxcIik7XG5cbiAgaWYgKHJvb3QuVEFSR0VUX0dPQUxTX0pTT04pIHtcbiAgICBjb25zdCBmaWxlbmFtZSA9IHJvb3QuVEFSR0VUX0dPQUxTX0pTT04udG9TdHJpbmcoKTtcbiAgICBjb25zdCBjb250ZW50ID0gSlNPTi5zdHJpbmdpZnkoZ29hbExpc3QsIG51bGwsIDIpO1xuICAgIGZzLm1rZGlyU3luYyhwYXRoLmRpcm5hbWUoZmlsZW5hbWUpLCB7IHJlY3Vyc2l2ZTogdHJ1ZSB9KTtcbiAgICBmcy53cml0ZUZpbGVTeW5jKGZpbGVuYW1lLCBjb250ZW50LCB7IGVuY29kaW5nOiBcInV0ZjhcIiB9KTtcbiAgfVxuXG4gIGF3YWl0IEdvYWxDb2xsZWN0aW9uLmJ1aWxkR29hbHMoZ29hbExpc3QpO1xufVxuXG5tb2R1bGUuZXhwb3J0cyA9IHtcbiAgYWN0aW9uTWFrZVNjcmlwdCxcbn07XG4iLCJpbXBvcnQgcGF0aCBmcm9tIFwibm9kZTpwYXRoXCI7XG5pbXBvcnQgdXJsIGZyb20gXCJub2RlOnVybFwiO1xuXG5pbXBvcnQgeyBmaWxlRXhpc3RzIH0gZnJvbSBcIkAvdXRpbHMvRmlsZVN5c3RlbVwiO1xuaW1wb3J0IGNvbnN0YW50cyBmcm9tIFwiQC9Db25zdGFudHMuanNcIjtcbmltcG9ydCB7IERFQlVHX0JVSUxEX1RZUEUsIFJFTEVBU0VfQlVJTERfVFlQRSB9IGZyb20gXCJAL2NvcmUvVHlwZXNcIjtcbmltcG9ydCB7IGltcG9ydE1vZHVsZSB9IGZyb20gXCJAL3V0aWxzL01vZHVsZVwiO1xuXG5jb25zdCB7IFVTRVJfQ09ORklHLCBERUZBVUxUX1BSRVNFVCwgUkVRVUVTVF9BVFRFTVBUUyB9ID0gY29uc3RhbnRzO1xuXG5leHBvcnQgY2xhc3MgUnVuU2NyaXB0Q29udGV4dCB7XG4gIF9ub2RlRXhlY3V0YWJsZTtcbiAgX2N1cnJlbnRTY3JpcHQ7XG4gIF9zY3JpcHREaXI7XG4gIF9yb290RGlyO1xuICBfd29ya0RpcjtcbiAgX2VudjtcbiAgX3VzZXJDb25maWc7XG5cbiAgY29uc3RydWN0b3Iob3B0aW9ucylcbiAge1xuICAgIHRoaXMuX25vZGVFeGVjdXRhYmxlID0gb3B0aW9ucy5ub2RlRXhlY3V0YWJsZTtcbiAgICB0aGlzLl9jdXJyZW50U2NyaXB0ID0gb3B0aW9ucy5jdXJyZW50U2NyaXB0O1xuICAgIHRoaXMuX3NjcmlwdERpciA9IG9wdGlvbnMuc2NyaXB0RGlyO1xuICAgIHRoaXMuX3Jvb3REaXIgPSBvcHRpb25zLnJvb3REaXI7XG4gICAgdGhpcy5fd29ya0RpciA9IG9wdGlvbnMud29ya0RpcjtcbiAgICB0aGlzLl9lbnYgPSBPYmplY3Quc2VhbChPYmplY3QuZnJlZXplKG9wdGlvbnMuZW52KSk7XG5cbiAgICBpZiAob3B0aW9ucy51c2VyQ29uZmlnKSB7XG4gICAgICB0aGlzLl91c2VyQ29uZmlnID0gb3B0aW9ucy51c2VyQ29uZmlnO1xuICAgIH1cbiAgfVxuXG4gIGdldCBub2RlRXhlY3V0YWJsZSgpXG4gIHtcbiAgICByZXR1cm4gdGhpcy5fbm9kZUV4ZWN1dGFibGU7XG4gIH1cblxuICBnZXQgY3VycmVudFNjcmlwdCgpXG4gIHtcbiAgICByZXR1cm4gdGhpcy5fY3VycmVudFNjcmlwdDtcbiAgfVxuXG4gIGdldCBzY3JpcHREaXIoKVxuICB7XG4gICAgcmV0dXJuIHRoaXMuX3NjcmlwdERpcjtcbiAgfVxuXG4gIGdldCByb290RGlyKClcbiAge1xuICAgIHJldHVybiB0aGlzLl9yb290RGlyO1xuICB9XG5cbiAgZ2V0IHdvcmtEaXIoKVxuICB7XG4gICAgcmV0dXJuIHRoaXMuX3dvcmtEaXI7XG4gIH1cblxuICBnZXQgZW52KClcbiAge1xuICAgIHJldHVybiB0aGlzLl9lbnY7XG4gIH1cblxuICBnZXRQcmVzZXRQYXRoKHByZXNldClcbiAge1xuICAgIHJldHVybiBwYXRoLnJlc29sdmUodGhpcy5fc2NyaXB0RGlyLCBgcHJlc2V0LyR7cHJlc2V0fS5tanNgKTtcbiAgfVxuXG4gIGdldCB1c2VyQ29uZmlnUGF0aCgpXG4gIHtcbiAgICByZXR1cm4gcGF0aC5yZXNvbHZlKHRoaXMuX3dvcmtEaXIsIFVTRVJfQ09ORklHKTtcbiAgfVxuXG4gIGdldCBidWlsZFR5cGUoKVxuICB7XG4gICAgcmV0dXJuIHRoaXMuX2Vudi5idWlsZFR5cGUgPT0gREVCVUdfQlVJTERfVFlQRSA/IHRoaXMuX2Vudi5idWlsZFR5cGUgOiBSRUxFQVNFX0JVSUxEX1RZUEU7XG4gIH1cblxuICBhc3luYyBnZXRVc2VyQ29uZmlnKClcbiAge1xuICAgIGlmICghdGhpcy5fdXNlckNvbmZpZykge1xuICAgICAgbGV0IGNvbmZpZ1BhdGg7XG4gICAgICBpZiAodGhpcy5fZW52LmNvbmZpZykge1xuICAgICAgICBjb25maWdQYXRoID0gcGF0aC5pc0Fic29sdXRlKHRoaXMuX2Vudi5jb25maWcpID8gdGhpcy5fZW52LmNvbmZpZyA6IHBhdGgucmVzb2x2ZSh0aGlzLl93b3JrRGlyLCB0aGlzLl9lbnYuY29uZmlnKTtcbiAgICAgICAgaWYgKCFhd2FpdCBmaWxlRXhpc3RzKGNvbmZpZ1BhdGgpKVxuICAgICAgICAgIHRocm93IGBDb25maWd1cmF0aW9uICcke3RoaXMuX2Vudi5jb25maWd9JyBmaWxlIGRvZXMgbm90IGV4aXN0YDtcbiAgICAgIH1cbiAgICAgIGVsc2Uge1xuICAgICAgICBjb25zdCB1c2VyQ29uZmlnUGF0aCA9IHBhdGgucmVzb2x2ZSh0aGlzLl93b3JrRGlyLCBVU0VSX0NPTkZJRyk7XG4gICAgICAgIGlmIChhd2FpdCBmaWxlRXhpc3RzKHVzZXJDb25maWdQYXRoKSlcbiAgICAgICAgICBjb25maWdQYXRoID0gdXNlckNvbmZpZ1BhdGg7XG4gICAgICAgIGVsc2VcbiAgICAgICAgICBjb25maWdQYXRoID0gdGhpcy5nZXRQcmVzZXRQYXRoKERFRkFVTFRfUFJFU0VUKTtcbiAgICAgIH1cblxuICAgICAgbGV0IHVzZXJDb25maWcgPSB7fTtcblxuICAgICAgaWYgKGNvbmZpZ1BhdGgpIHtcbiAgICAgICAgY29uc3QgY29uZmlnVXJsID0gdXJsLnBhdGhUb0ZpbGVVUkwoY29uZmlnUGF0aCk7XG4gICAgICAgIGNvbnN0IGNvbmZpZ01vZHVsZSA9IGF3YWl0IGltcG9ydE1vZHVsZShjb25maWdVcmwpO1xuICAgICAgICBzd2l0Y2ggKHR5cGVvZiBjb25maWdNb2R1bGUuZGVmYXVsdCkge1xuICAgICAgICBjYXNlIFwiZnVuY3Rpb25cIjpcbiAgICAgICAgICB1c2VyQ29uZmlnID0gY29uZmlnTW9kdWxlLmRlZmF1bHQodGhpcy5fZW52LCB7fSk7XG4gICAgICAgICAgaWYgKHVzZXJDb25maWcgaW5zdGFuY2VvZiBQcm9taXNlKVxuICAgICAgICAgICAgdXNlckNvbmZpZyA9IGF3YWl0IHVzZXJDb25maWc7XG4gICAgICAgICAgYnJlYWs7XG4gICAgICAgIGNhc2UgXCJvYmplY3RcIjpcbiAgICAgICAgICB1c2VyQ29uZmlnID0gY29uZmlnTW9kdWxlLmRlZmF1bHQ7XG4gICAgICAgICAgYnJlYWs7XG4gICAgICAgIGRlZmF1bHQ6XG4gICAgICAgICAgdGhyb3cgYFVua25vd24gdXNlciBjb25maWd1cmF0aW9uIHR5cGVgO1xuICAgICAgICB9XG4gICAgICB9XG5cbiAgICAgIHRoaXMuX3VzZXJDb25maWcgPSB1c2VyQ29uZmlnO1xuICAgIH1cbiAgICByZXR1cm4gdGhpcy5fdXNlckNvbmZpZztcbiAgfVxuXG4gIGdldCByZXF1ZXN0QXR0ZW1wdHMoKVxuICB7XG4gICAgcmV0dXJuIFJFUVVFU1RfQVRURU1QVFM7XG4gIH1cbn07XG4iLCJcInVzZSBzdHJpY3RcIjtcblxuY29uc3QgcGF0aCA9IHJlcXVpcmUoXCJub2RlOnBhdGhcIik7XG5jb25zdCBmcyA9IHJlcXVpcmUoXCJub2RlOmZzXCIpO1xuXG5jb25zdCB7IEFic29sdXRlUGF0aCB9ID0gcmVxdWlyZShcIkAvY29yZS9QYXRoXCIpO1xuY29uc3QgeyBmaWxlRXhpc3RzLCBmaWxlRXhpc3RzU3luYyB9ID0gcmVxdWlyZShcIkAvdXRpbHMvRmlsZVN5c3RlbVwiKTtcbmNvbnN0IHsgVGFyZ2V0Q29sbGVjdGlvbiB9ID0gcmVxdWlyZShcIkAvY29yZS8vVGFyZ2V0Q29sbGVjdGlvblwiKTtcbmNvbnN0IHsgU2NyaXB0Q29sbGVjdGlvbiB9ID0gcmVxdWlyZShcIkAvY29yZS9TY3JpcHRDb2xsZWN0aW9uXCIpO1xuY29uc3QgeyBJbnRlcmZhY2VUYXJnZXQgfSA9IHJlcXVpcmUoXCJAL2NvcmUvSW50ZXJmYWNlVGFyZ2V0XCIpO1xuY29uc3QgeyBVbmtub3duVGFyZ2V0IH0gPSByZXF1aXJlKFwiQC9jb3JlL1Vua25vd25UYXJnZXRcIik7XG5jb25zdCB7IEdvYWxDb2xsZWN0aW9uIH0gPSByZXF1aXJlKFwiQC9jb3JlL0dvYWxDb2xsZWN0aW9uXCIpO1xuY29uc3QgeyBJbnRlcmZhY2VPYmplY3RzIH0gPSByZXF1aXJlKFwiQC9jb3JlL0ludGVyZmFjZU9iamVjdHNcIik7XG5jb25zdCB7IFNvdXJjZUZpbGUgfSA9IHJlcXVpcmUoXCJAL2NvcmUvU291cmNlRmlsZVwiKTtcbmNvbnN0IHsgT2JqZWN0TGlicmFyeSwgU3RhdGljTGlicmFyeSwgU2hhcmVkTGlicmFyeSwgRXhlY3V0YWJsZSB9ID0gcmVxdWlyZShcIkAvY29yZS9UYXJnZXRcIik7XG5jb25zdCB7IGltcG9ydE1vZHVsZSB9ID0gcmVxdWlyZShcIkAvdXRpbHMvTW9kdWxlXCIpO1xuXG5jb25zdCByZXF1aXJlSW1wbCA9IGV2YWwoXCJyZXF1aXJlXCIpO1xuXG5jb25zdCBUQVJHRVRTID0gU3ltYm9sKFwiVEFSR0VUU1wiKTtcbmNvbnN0IFNDUklQVFMgPSBTeW1ib2woXCJTQ1JJUFRTXCIpO1xuY29uc3QgQ0FDSEUgPSBTeW1ib2woXCJDQUNIRVwiKTtcbmNvbnN0IFVOS05PV05fVEFSR0VUUyA9IFN5bWJvbChcIlVOS05PV05fVEFSR0VUU1wiKTtcbmNvbnN0IElOVEVSRkFDRV9TQ1JJUFRTID0gU3ltYm9sKFwiSU5URVJGQUNFX1NDUklQVFNcIik7XG5jb25zdCBJTlNUQUxMX0xJU1QgPSBTeW1ib2woXCJJTlNUQUxMX0xJU1RcIik7XG5jb25zdCBTQ1JJUFRfVkFSSUFCTEVTX01BUCA9IFN5bWJvbChcIlNDUklQVF9WQVJJQUJMRVNfTUFQXCIpO1xuY29uc3QgU1VCRElSX0FMSUFTID0gU3ltYm9sKFwiU1VCRElSX0FMSUFTXCIpO1xuY29uc3QgU1VCRElSX0xJU1QgPSBTeW1ib2woXCJTVUJESVJfTElTVFwiKTtcblxuZnVuY3Rpb24gR2xvYmFsQ29udGV4dCgpIHtcbiAgdGhpc1tUQVJHRVRTXSA9IFRhcmdldENvbGxlY3Rpb24uY3JlYXRlKCk7XG4gIHRoaXNbU0NSSVBUU10gPSBTY3JpcHRDb2xsZWN0aW9uLmNyZWF0ZSgpO1xuICB0aGlzW0NBQ0hFXSA9IHt9O1xuICB0aGlzW1VOS05PV05fVEFSR0VUU10gPSB7fTtcbiAgdGhpc1tJTlRFUkZBQ0VfU0NSSVBUU10gPSB7fTtcbiAgdGhpc1tJTlNUQUxMX0xJU1RdID0gW107XG4gIHRoaXNbU0NSSVBUX1ZBUklBQkxFU19NQVBdID0ge307XG4gIHRoaXNbU1VCRElSX0FMSUFTXSA9IHt9O1xuICB0aGlzW1NVQkRJUl9MSVNUXSA9IFtdO1xufVxuXG5HbG9iYWxDb250ZXh0LmNyZWF0ZSA9ICgpID0+IHtcbiAgcmV0dXJuIE9iamVjdC5zZWFsKG5ldyBHbG9iYWxDb250ZXh0KTtcbn1cblxuR2xvYmFsQ29udGV4dC5wcm90b3R5cGUgPSBPYmplY3QuY3JlYXRlKE9iamVjdC5wcm90b3R5cGUsIHtcbiAgY29uc3RydWN0b3I6IHtcbiAgICB2YWx1ZTogR2xvYmFsQ29udGV4dCxcbiAgICBlbnVtZXJhYmxlOiBmYWxzZSxcbiAgfSxcbiAgVEFSR0VUUzoge1xuICAgIGdldCgpIHsgcmV0dXJuIHRoaXNbVEFSR0VUU107IH0sXG4gICAgZW51bWVyYWJsZTogdHJ1ZSxcbiAgfSxcbiAgU0NSSVBUUzoge1xuICAgIGdldCgpIHsgcmV0dXJuIHRoaXNbU0NSSVBUU107IH0sXG4gICAgZW51bWVyYWJsZTogdHJ1ZSxcbiAgfSxcbiAgQ0FDSEU6IHtcbiAgICBnZXQoKSB7IHJldHVybiB0aGlzW0NBQ0hFXTsgfSxcbiAgICBlbnVtZXJhYmxlOiB0cnVlLFxuICB9LFxuICBVTktOT1dOX1RBUkdFVFM6IHtcbiAgICBnZXQoKSB7IHJldHVybiB0aGlzW1VOS05PV05fVEFSR0VUU107IH0sXG4gICAgZW51bWVyYWJsZTogdHJ1ZSxcbiAgfSxcbiAgSU5URVJGQUNFX1NDUklQVFM6IHtcbiAgICBnZXQoKSB7IHJldHVybiB0aGlzW0lOVEVSRkFDRV9TQ1JJUFRTXTsgfSxcbiAgICBlbnVtZXJhYmxlOiB0cnVlLFxuICB9LFxuICBJTlNUQUxMX0xJU1Q6IHtcbiAgICBnZXQoKSB7IHJldHVybiB0aGlzW0lOU1RBTExfTElTVF07IH0sXG4gICAgZW51bWVyYWJsZTogdHJ1ZSxcbiAgfSxcbiAgU0NSSVBUX1ZBUklBQkxFU19NQVA6IHtcbiAgICBnZXQoKSB7IHJldHVybiB0aGlzW1NDUklQVF9WQVJJQUJMRVNfTUFQXTsgfSxcbiAgICBlbnVtZXJhYmxlOiB0cnVlLFxuICB9LFxuICBTVUJESVJfQUxJQVM6IHtcbiAgICBnZXQoKSB7IHJldHVybiB0aGlzW1NVQkRJUl9BTElBU107IH0sXG4gICAgZW51bWVyYWJsZTogdHJ1ZSxcbiAgfSxcbn0pO1xuXG5HbG9iYWxDb250ZXh0LnByb3RvdHlwZS50b0pTT04gPSBmdW5jdGlvbigpIHtcbiAgY29uc3QganNvbiA9IHt9O1xuICBmb3IgKGNvbnN0IGtleSBpbiB0aGlzKVxuICAgIGpzb25ba2V5XSA9IHRoaXNba2V5XTtcbiAgcmV0dXJuIGpzb247XG59XG5cbkdsb2JhbENvbnRleHQucHJvdG90eXBlLmdldFVrbm93blRhcmdldCA9IGZ1bmN0aW9uKG5hbWUpIHtcbiAgbGV0IHRhcmdldCA9IHRoaXNbVU5LTk9XTl9UQVJHRVRTXVtuYW1lXTtcbiAgaWYgKCF0YXJnZXQpIHtcbiAgICB0aGlzW1VOS05PV05fVEFSR0VUU11bbmFtZV0gPSB0YXJnZXQgPSBVbmtub3duVGFyZ2V0LmNyZWF0ZShuYW1lKTtcbiAgfVxuICByZXR1cm4gdGFyZ2V0O1xufVxuXG5HbG9iYWxDb250ZXh0LnByb3RvdHlwZS5hZGRTeXN0ZW1WYXJpYWJsZXMgPSBmdW5jdGlvbih2YXJpYWJsZXMpIHtcbiAgY29uc3Qgc2NyaXB0ID0gdmFyaWFibGVzLlNDUklQVF9GSUxFLnRvU3RyaW5nKCk7XG4gIGlmICh0aGlzW1NDUklQVF9WQVJJQUJMRVNfTUFQXVtzY3JpcHRdKVxuICAgIHRocm93IG5ldyBFcnJvcihgU3lzdGVtVmFyaWFibGVzIGV4aXN0cyBmb3IgJHtzY3JpcHR9YCk7XG4gIHRoaXNbU0NSSVBUX1ZBUklBQkxFU19NQVBdW3NjcmlwdF0gPSB2YXJpYWJsZXM7XG59XG5cbkdsb2JhbENvbnRleHQucHJvdG90eXBlLnJlc29sdmVTdWJkaXJlY3RvcnkgPSBmdW5jdGlvbihwYXRoKSB7XG4gIGNvbnN0IHJlc29sdmVkUGF0aCA9IHRoaXNbU1VCRElSX0FMSUFTXVtwYXRoLnRvU3RyaW5nKCldO1xuICByZXR1cm4gcmVzb2x2ZWRQYXRoIHx8IHBhdGg7XG59XG5cbkdsb2JhbENvbnRleHQucHJvdG90eXBlLmFkZFN1YmRpcmVjdG9yeUFsaWFzID0gZnVuY3Rpb24oc3JjLCBkZXN0KSB7XG4gIHRoaXNbU1VCRElSX0FMSUFTXVtzcmMudG9TdHJpbmcoKV0gPSBkZXN0O1xufVxuXG5HbG9iYWxDb250ZXh0LnByb3RvdHlwZS5sb2FkQ2FjaGVWYXJpYWJsZXMgPSBmdW5jdGlvbihmaWxlbmFtZSkge1xuICBpZiAoZmlsZUV4aXN0c1N5bmMoZmlsZW5hbWUudG9TdHJpbmcoKSkpIHtcbiAgICBjb25zdCB2YXJpYWJsZXMgPSByZXF1aXJlSW1wbChmaWxlbmFtZS50b1N0cmluZygpKTtcbiAgICB0aGlzLmFkZENhY2hlVmFyaWFibGVzKHZhcmlhYmxlcyk7XG4gIH1cbn1cblxuR2xvYmFsQ29udGV4dC5wcm90b3R5cGUuYWRkQ2FjaGVWYXJpYWJsZXMgPSBmdW5jdGlvbih2YXJpYWJsZXMpIHtcbiAgY29uc3QgY2FjaGUgPSB0aGlzW0NBQ0hFXTtcbiAgZm9yIChjb25zdCBba2V5LCBlbnRyeV0gb2YgT2JqZWN0LmVudHJpZXModmFyaWFibGVzKSkge1xuICAgIGNhY2hlW2tleV0gPSBlbnRyeTtcbiAgfVxufVxuXG5HbG9iYWxDb250ZXh0LnByb3RvdHlwZS5hZGRTdWJkaXJlY3RvcnkgPSBmdW5jdGlvbihjb250ZXh0KSB7XG4gIHRoaXNbU1VCRElSX0xJU1RdLnB1c2goY29udGV4dCk7XG59XG5cbkdsb2JhbENvbnRleHQucHJvdG90eXBlLmRvU3ViZGlyZWN0b3J5ID0gYXN5bmMgZnVuY3Rpb24oKSB7XG4gIHdoaWxlICh0aGlzW1NVQkRJUl9MSVNUXS5sZW5ndGgpIHtcbiAgICBjb25zdCBjb250ZXh0ID0gdGhpc1tTVUJESVJfTElTVF0uc2hpZnQoKTtcblxuICAgIGNvbnN0IHNjb3BlID0gY29udGV4dC5fX3Njb3BlKCk7XG5cbiAgICBsZXQgc2NyaXB0RmlsZTtcbiAgICBjb25zdCBmaWxlTGlzdCA9IFsgXCIuanNcIiwgXCIubWpzXCIgXS5tYXAoaSA9PiBcIk1ha2VTY3JpcHRcIiArIGkpO1xuICAgIGZvciAoY29uc3QgZmlsZW5hbWUgb2YgZmlsZUxpc3QpIHtcbiAgICAgIGNvbnN0IGl0ZXIgPSBzY29wZS5TT1VSQ0VfRElSLmpvaW4oZmlsZW5hbWUpLnRvU3RyaW5nKCk7XG4gICAgICBpZiAoYXdhaXQgZmlsZUV4aXN0cyhpdGVyKSkge1xuICAgICAgICBzY3JpcHRGaWxlID0gaXRlcjtcbiAgICAgICAgYnJlYWs7XG4gICAgICB9XG4gICAgfVxuXG4gICAgaWYgKCFzY3JpcHRGaWxlKVxuICAgICAgdGhyb3cgbmV3IEVycm9yKFwiVGhlcmUgYXJlIG5vIGZpbGVzIGZyb20gdGhlIGxpc3QgXCIgKyBmaWxlTGlzdC5qb2luKCkpO1xuXG4gICAgc2NvcGUuU0NSSVBUX0ZJTEUgPSBzY3JpcHRGaWxlO1xuICAgIHNjb3BlLlNDUklQVF9ESVIgPSBzY29wZS5TQ1JJUFRfRklMRS5kaXJuYW1lKCk7XG5cbiAgICB0aGlzLmFkZFN5c3RlbVZhcmlhYmxlcyhzY29wZSk7XG4gICAgdGhpcy5jb3B5Q2FjaGVWYXJpYWJsZXMoY29udGV4dCk7XG5cbiAgICBjb25zdCBtb2R1bGUgPSBhd2FpdCBpbXBvcnRNb2R1bGUoY29udGV4dC5TQ1JJUFRfRklMRS50b1N0cmluZygpKTtcblxuICAgIGNvbnN0IGN3ZFNhdmUgPSBwcm9jZXNzLmN3ZCgpO1xuICAgIHByb2Nlc3MuY2hkaXIoY29udGV4dC5TT1VSQ0VfRElSLnRvU3RyaW5nKCkpO1xuXG4gICAgY29uc3QgcmVzdWx0ID0gbW9kdWxlLmRlZmF1bHQoY29udGV4dCk7XG4gICAgaWYgKHJlc3VsdCBpbnN0YW5jZW9mIFByb21pc2UpXG4gICAgICBhd2FpdCByZXN1bHQ7XG5cbiAgICBwcm9jZXNzLmNoZGlyKGN3ZFNhdmUpO1xuICB9XG59XG5cbmZ1bmN0aW9uIGVuc3VyZVZhbHVlQnlUeXBlKHR5cGUsIHZhbHVlKSB7XG4gIGlmIChBcnJheS5pc0FycmF5KHR5cGUpID8gdHlwZS5pbmNsdWRlcyh2YWx1ZSkgOiB0eXBlb2YgdmFsdWUgPT09IHR5cGUpXG4gICAgcmV0dXJuIHZhbHVlO1xuICB0aHJvdyBuZXcgRXJyb3IoYFRoZSAnJHt2YWx1ZX0nIGlzIG5vdCBhICR7dHlwZX1gKTtcbn1cblxuR2xvYmFsQ29udGV4dC5wcm90b3R5cGUuY29weUNhY2hlVmFyaWFibGVzID0gZnVuY3Rpb24oc2NvcGUpIHtcbiAgZm9yIChjb25zdCBbbmFtZSwgZW50cnldIG9mIE9iamVjdC5lbnRyaWVzKHRoaXNbQ0FDSEVdKSkge1xuICAgIGlmICghT2JqZWN0Lmhhc093bihzY29wZSwgbmFtZSkpIHtcbiAgICAgIGNvbnN0IHR5cGUgPSBlbnRyeS50eXBlIHx8IHR5cGVvZiBlbnRyeS52YWx1ZTtcbiAgICAgIGNvbnN0IGRlc2NyaXB0aW9uID0gZW50cnkuZGVzY3JpcHRpb24gfHwgXCJcIjtcbiAgICAgIGxldCB2YWx1ZSA9IEFycmF5LmlzQXJyYXkoZW50cnkudmFsdWUpID8gWyAuLi5lbnRyeS52YWx1ZSBdIDogZW50cnkudmFsdWU7XG4gICAgICBpZiAodmFsdWUgPT09IFwiJHtQUk9KRUNUX1ZFUlNJT059XCIpXG4gICAgICAgIHZhbHVlID0gc2NvcGUuUFJPSkVDVF9WRVJTSU9OO1xuICAgICAgZWxzZSBpZiAodmFsdWUgPT09IFwiJHtQUk9KRUNUX0RFU0NSSVBUSU9OfVwiKVxuICAgICAgICB2YWx1ZSA9IHNjb3BlLlBST0pFQ1RfREVTQ1JJUFRJT047XG4gICAgICBlbHNlIGlmICh2YWx1ZSA9PT0gXCIke1BST0pFQ1RfSE9NRVBBR0VfVVJMfVwiKVxuICAgICAgICB2YWx1ZSA9IHNjb3BlLlBST0pFQ1RfSE9NRVBBR0VfVVJMO1xuICAgICAgZWxzZSBpZiAoZW50cnkudmFsdWUgPT09IFwiJHtDTUFLRV9TWVNURU1fUFJPQ0VTU09SfVwiKVxuICAgICAgICB2YWx1ZSA9IHNjb3BlLlNZU1RFTV9QUk9DRVNTT1I7XG5cbiAgICAgIGNvbnN0IG5hbWVTeW1ib2wgPSBTeW1ib2wobmFtZSk7XG4gICAgICBzY29wZVtuYW1lU3ltYm9sXSA9IGVuc3VyZVZhbHVlQnlUeXBlKHR5cGUsIHZhbHVlKTtcblxuICAgICAgT2JqZWN0LmRlZmluZVByb3BlcnR5KHNjb3BlLCBuYW1lLCB7XG4gICAgICAgIGVudW1lcmFibGU6IHRydWUsXG4gICAgICAgIGdldCgpIHtcbiAgICAgICAgICByZXR1cm4gdGhpc1tuYW1lU3ltYm9sXTtcbiAgICAgICAgfSxcbiAgICAgICAgc2V0KHZhbHVlKSB7XG4gICAgICAgICAgdGhpc1tuYW1lU3ltYm9sXSA9IGVuc3VyZVZhbHVlQnlUeXBlKHR5cGUsIHZhbHVlKTtcbiAgICAgICAgfSxcbiAgICAgIH0pO1xuICAgIH1cbiAgfVxufVxuXG5HbG9iYWxDb250ZXh0LnByb3RvdHlwZS53cml0ZUNhY2hlVmFyaWFibGVzID0gZnVuY3Rpb24oZmlsZW5hbWUpIHtcbiAgY29uc3QganNvbiA9IEpTT04uc3RyaW5naWZ5KHRoaXNbQ0FDSEVdLCBudWxsLCAyKTtcbiAgZnMud3JpdGVGaWxlU3luYyhmaWxlbmFtZSwganNvbiwgXCJ1dGYtOFwiKTtcbn1cblxuZnVuY3Rpb24gc2NvcGVWYWx1ZUFzUHJpbWl0aXZlcyhvKSB7XG4gIGlmICh0eXBlb2YgbyA9PT0gXCJ1bmRlZmluZWRcIilcbiAgICByZXR1cm4gbztcbiAgaWYgKHR5cGVvZiBvID09PSBcImJvb2xlYW5cIilcbiAgICByZXR1cm4gbztcbiAgaWYgKHR5cGVvZiBvID09PSBcIm51bWJlclwiKVxuICAgIHJldHVybiBvO1xuICBpZiAodHlwZW9mIG8gPT09IFwic3RyaW5nXCIpXG4gICAgcmV0dXJuIG87XG4gIGlmICh0eXBlb2YgbyA9PT0gXCJvYmplY3RcIikge1xuICAgIGlmICghbylcbiAgICAgIHJldHVybiBvO1xuICAgIGlmIChvIGluc3RhbmNlb2YgQWJzb2x1dGVQYXRoKSB7XG4gICAgICByZXR1cm4gby50b1N0cmluZygpO1xuICAgIH1cbiAgICBpZiAobyBpbnN0YW5jZW9mIEFycmF5KSB7XG4gICAgICBjb25zdCByZXN1bHQgPSBbXTtcbiAgICAgIGZvciAoY29uc3QgaSBvZiBvKVxuICAgICAgICByZXN1bHQucHVzaChzY29wZVZhbHVlQXNQcmltaXRpdmVzKGkpKTtcbiAgICAgIHJldHVybiByZXN1bHQ7XG4gICAgfVxuICAgIGlmIChvIGluc3RhbmNlb2YgT2JqZWN0KSB7XG4gICAgICBjb25zdCByZXN1bHQgPSB7fTtcbiAgICAgIGZvciAoY29uc3QgW2ssdl0gb2YgT2JqZWN0LmVudHJpZXMobykpXG4gICAgICAgIHJlc3VsdFtrXSA9IHNjb3BlVmFsdWVBc1ByaW1pdGl2ZXModik7XG4gICAgICByZXR1cm4gcmVzdWx0O1xuICAgIH1cbiAgfVxuICB0aHJvdyBuZXcgRXJyb3IoYFVua25vd24gaW5zdGFuY2Ugb2YgJHtvfWApO1xufVxuXG5HbG9iYWxDb250ZXh0LnByb3RvdHlwZS5jcmVhdGVHb2FscyA9IGZ1bmN0aW9uKHNjb3BlKSB7XG4gIGZvciAoY29uc3QgaXRlciBvZiBPYmplY3QudmFsdWVzKHRoaXNbVU5LTk9XTl9UQVJHRVRTXSkpIHtcbiAgICBjb25zdCB0YXJnZXQgPSB0aGlzW1RBUkdFVFNdLmdldChpdGVyLk5BTUUpO1xuICAgIHRhcmdldC5hZGRTb3VyY2VzKGl0ZXIuU09VUkNFUyk7XG4gICAgdGFyZ2V0LklOQ0xVREVTLnB1c2goLi4uaXRlci5JTkNMVURFUyk7XG4gICAgdGFyZ2V0LkRFRklORVMucHVzaCguLi5pdGVyLkRFRklORVMpO1xuICAgIHRhcmdldC5DT01QSUxFX09QVElPTlMucHVzaCguLi5pdGVyLkNPTVBJTEVfT1BUSU9OUyk7XG4gICAgdGFyZ2V0LkxJTktfT1BUSU9OUy5wdXNoKC4uLml0ZXIuTElOS19PUFRJT05TKTtcbiAgfVxuXG4gIGZvciAoY29uc3QgaXRlciBvZiBPYmplY3QudmFsdWVzKHRoaXNbSU5URVJGQUNFX1NDUklQVFNdKSkge1xuICAgIGNvbnN0IHNjcmlwdCA9IHRoaXNbU0NSSVBUU10uZ2V0KGl0ZXIuTkFNRSk7XG4gICAgZm9yIChjb25zdCBba2V5LCB2YWxzXSBvZiBPYmplY3QuZW50cmllcyhpdGVyLlBST1BFUlRJRVMpKVxuICAgICAgc2NyaXB0LmFkZFByb3BlcnR5KGtleSwgLi4udmFscyk7XG4gIH1cblxuICBjb25zdCBnb2FsTGlzdCA9IEdvYWxDb2xsZWN0aW9uLmNyZWF0ZSgpO1xuICBmb3IgKGNvbnN0IFtuYW1lLCBzY3JpcHRdIG9mIE9iamVjdC5lbnRyaWVzKHRoaXNbU0NSSVBUU10uRU5UUklFUykpIHsgICBcbiAgICBjb25zdCBkZXBlbmRzID0gWyBzY3JpcHQuRklMRS50b1N0cmluZygpIF07XG4gICAgaWYgKHNjcmlwdC5JTlBVVClcbiAgICAgIGRlcGVuZHMucHVzaChzY3JpcHQuSU5QVVQudG9TdHJpbmcoKSk7XG4gICAgY29uc3QgbXNnID0gXCJcXHgxYlszNm1cIiArIFwiR2VuZXJhdGluZyBcIiArIHNjcmlwdC5UQVJHRVRfU0NPUEUuQklOQVJZX0RJUi5yZWxhdGl2ZShzY3JpcHQuT1VUUFVUKSArIFwiXFx4MWJbMG1cIjtcbiAgICBjb25zdCBwYXJhbXMgPSB7IC4uLnNjcmlwdC5QUk9QRVJUSUVTLCAuLi5zY3JpcHQuUEFSQU1TIH07XG4gICAgZ29hbExpc3QuYWRkU2NyaXB0KHNjcmlwdC5GSUxFLCBcIlwiLCBkZXBlbmRzLCBzY3JpcHQuT1VUUFVULnRvU3RyaW5nKCksIHNjb3BlVmFsdWVBc1ByaW1pdGl2ZXMocGFyYW1zKSwgbXNnKTtcbiAgfVxuXG4gIGZvciAoY29uc3QgW25hbWUsIHRhcmdldF0gb2YgT2JqZWN0LmVudHJpZXModGhpc1tUQVJHRVRTXS5FTlRSSUVTKSkge1xuICAgIGNvbnN0IGhlYWRlcnMgPSB0aGlzW1RBUkdFVFNdLmFsbEhlYWRlcnNPZih0YXJnZXQpO1xuICAgIGNvbnN0IGRlcGVuZHMgPSBbXTtcbiAgICBmb3IgKGNvbnN0IHMgb2YgdGFyZ2V0LlNPVVJDRVMpIHtcbiAgICAgIGlmIChzIGluc3RhbmNlb2YgSW50ZXJmYWNlT2JqZWN0cykge1xuICAgICAgICBjb25zdCB0ID0gdGhpc1tUQVJHRVRTXS5nZXQocy50YXJnZXROYW1lKTtcbiAgICAgICAgZm9yIChjb25zdCBmIG9mIHQuU09VUkNFUykge1xuICAgICAgICAgIGlmIChmIGluc3RhbmNlb2YgU291cmNlRmlsZSAmJiBmLk9CSkVDVF9GSUxFKVxuICAgICAgICAgICAgZGVwZW5kcy5wdXNoKGYuT0JKRUNUX0ZJTEUudG9TdHJpbmcoKSk7XG4gICAgICAgIH1cbiAgICAgICAgY29udGludWU7XG4gICAgICB9XG5cbiAgICAgIGlmIChzLkhFQURFUl9GSUxFX09OTFkpXG4gICAgICAgIGNvbnRpbnVlO1xuXG4gICAgICBmcy5ta2RpclN5bmMocy5PQkpFQ1RfRklMRV9ESVIudG9TdHJpbmcoKSwgeyByZWN1cnNpdmU6IHRydWUgfSk7XG5cbiAgICAgIGNvbnN0IHJlbGF0aXZlT2JqZWN0ID0gdGFyZ2V0LlRBUkdFVF9TQ09QRS5CSU5BUllfRElSLnJlbGF0aXZlKHMuT0JKRUNUX0ZJTEUpO1xuICAgICAgY29uc3QgcmVsYXRpdmVCaW5hcnlEaXIgPSBzY29wZS5QUk9KRUNUX0JJTkFSWV9ESVIucmVsYXRpdmUodGFyZ2V0LlRBUkdFVF9TQ09QRS5CSU5BUllfRElSKTtcbiAgICAgIGNvbnN0IG1zZyA9IFwiXFx4MWJbMzJtXCIgKyBgQnVpbGRpbmcgJHtzLkxBTkdVQUdFfSBvYmplY3QgJHtyZWxhdGl2ZUJpbmFyeURpcn0vJHtyZWxhdGl2ZU9iamVjdH1gICsgXCJcXHgxYlswbVwiO1xuXG4gICAgICBjb25zdCBkZWZpbml0aW9ucyA9IFtcbiAgICAgICAgLi4udGhpc1tUQVJHRVRTXS5hbGxEZWZpbml0aW9uc09mKHRhcmdldCksXG4gICAgICAgIC4uLnMuREVGSU5FUyxcbiAgICAgIF07XG5cbiAgICAgIGNvbnN0IGFyZ3MgPSBbXTtcbiAgICAgIGFyZ3MucHVzaCguLi5kZWZpbml0aW9ucy5tYXAoaSA9PiBcIi1EXCIgKyBpKSk7XG4gICAgICBhcmdzLnB1c2goLi4udGhpc1tUQVJHRVRTXS5hbGxJbmNsdWRlc09mKHRhcmdldCkubWFwKGkgPT4gXCItSVwiICsgaSkpO1xuICAgICAgYXJncy5wdXNoKC4uLnRoaXNbVEFSR0VUU10uYWxsQ29tcGlsZU9wdGlvbnNPZih0YXJnZXQpKTtcbiAgICAgIGlmICh0YXJnZXQuUE9TSVRJT05fSU5ERVBFTkRFTlRfQ09ERSlcbiAgICAgICAgYXJncy5wdXNoKFwiLWZQSUNcIik7XG4gICAgICBhcmdzLnB1c2goLi4ucy5DT01QSUxFX0ZMQUdTLmZsYXQoKSk7XG4gICAgICBhcmdzLnB1c2goXCItb1wiLCByZWxhdGl2ZU9iamVjdCk7XG4gICAgICBhcmdzLnB1c2goXCItY1wiLCBzLkZJTEUpO1xuICAgICAgY29uc3QgY3dkID0gdGFyZ2V0LlRBUkdFVF9TQ09QRS5CSU5BUllfRElSLnRvU3RyaW5nKCk7XG5cbiAgICAgIGNvbnN0IGNvbW1hbmQgPSB0YXJnZXQuVEFSR0VUX1NDT1BFW3MuTEFOR1VBR0UgKyBcIl9DT01QSUxFUlwiXS50b1N0cmluZygpO1xuICAgICAgY29uc3Qgb3V0cHV0ID0gdGFyZ2V0LlRBUkdFVF9TQ09QRS5CSU5BUllfRElSLmpvaW4ocmVsYXRpdmVPYmplY3QpLnRvU3RyaW5nKCk7XG4gICAgICBkZXBlbmRzLnB1c2gob3V0cHV0KTtcblxuICAgICAgZ29hbExpc3QuYWRkRXhlYyhvdXRwdXQsIFsgLi4uaGVhZGVycywgcy5GSUxFIF0sIGNvbW1hbmQsIGFyZ3MsIGN3ZCwgbXNnKTtcbiAgICB9XG5cbiAgICBjb25zdCBsaW5rT3B0aW9ucyA9IHRoaXNbVEFSR0VUU10uYWxsTGlua09wdGlvbnNPZih0YXJnZXQpO1xuICAgIGlmICh0YXJnZXQgaW5zdGFuY2VvZiBPYmplY3RMaWJyYXJ5KSB7XG4gICAgICBjb25zdCBvYmpzID0gZGVwZW5kcy5maWx0ZXIoaSA9PiBpLmVuZHNXaXRoKFwiLm9cIikgfHwgaS5lbmRzV2l0aChcIi5vYmpcIikpLm1hcChpID0+IHRhcmdldC5GSUxFX0RJUi5yZWxhdGl2ZShpKSk7XG4gICAgICBpZiAob2Jqcy5sZW5ndGgpIHtcbiAgICAgICAgY29uc3QgYXJncyA9IFtcbiAgICAgICAgICAuLi5saW5rT3B0aW9ucyxcbiAgICAgICAgICBcIi1yXCIsXG4gICAgICAgICAgXCItb1wiLCB0YXJnZXQuRklMRV9OQU1FLFxuICAgICAgICAgIC4uLm9ianNcbiAgICAgICAgXTtcbiAgICAgICAgY29uc3QgY3dkID0gdGFyZ2V0LkZJTEVfRElSLnRvU3RyaW5nKCk7XG4gICAgICAgIGNvbnN0IG1zZyA9IGBMaW5raW5nIENYWCBvYmplY3QgbGlicmFyeSAke3RhcmdldC5GSUxFX05BTUV9YDtcbiAgICAgICAgZ29hbExpc3QuYWRkRXhlYyh0YXJnZXQuRklMRS50b1N0cmluZygpLCBkZXBlbmRzLCBzY29wZS5MSU5LRVIsIGFyZ3MsIGN3ZCwgbXNnKTtcbiAgICAgIH1cbiAgICAgIGVsc2Uge1xuICAgICAgICBjb25zb2xlLmxvZyhgTm8gb2JqZWN0cyBmb3IgXCIke3RhcmdldC5OQU1FfVwiYCk7XG4gICAgICB9XG4gICAgfVxuXG4gICAgaWYgKHRhcmdldCBpbnN0YW5jZW9mIFN0YXRpY0xpYnJhcnkpIHtcbiAgICAgIGNvbnN0IG9ianMgPSBkZXBlbmRzLmZpbHRlcihpID0+IGkuZW5kc1dpdGgoXCIub1wiKSB8fCBpLmVuZHNXaXRoKFwiLm9ialwiKSkubWFwKGkgPT4gdGFyZ2V0LkZJTEVfRElSLnJlbGF0aXZlKGkpKTtcbiAgICAgIGlmIChvYmpzLmxlbmd0aCkge1xuICAgICAgICBjb25zdCBhcmdzID0gWyBcInJjXCIsIHRhcmdldC5GSUxFX05BTUUgLCAuLi5vYmpzIF07XG4gICAgICAgIGNvbnN0IGN3ZCA9IHRhcmdldC5GSUxFX0RJUi50b1N0cmluZygpO1xuICAgICAgICBjb25zdCBtc2cgPSBgTGlua2luZyBDWFggc3RhdGljIGxpYnJhcnkgJHt0YXJnZXQuRklMRV9OQU1FfWA7XG4gICAgICAgIGdvYWxMaXN0LmFkZEV4ZWModGFyZ2V0LkZJTEUudG9TdHJpbmcoKSwgZGVwZW5kcywgc2NvcGUuQVIsIGFyZ3MsIGN3ZCwgbXNnKTtcbiAgICAgIH1cbiAgICAgIGVsc2Uge1xuICAgICAgICBjb25zb2xlLmxvZyhgTm8gb2JqZWN0cyBmb3IgXCIke3RhcmdldC5OQU1FfVwiYCk7XG4gICAgICB9XG4gICAgfVxuXG4gICAgaWYgKHRhcmdldCBpbnN0YW5jZW9mIFNoYXJlZExpYnJhcnkpIHtcbiAgICAgIHRocm93IG5ldyBFcnJvcihcIk5vdCBpbXBsZW1lbnRlZFwiKTtcbiAgICB9XG5cbiAgICBpZiAodGFyZ2V0IGluc3RhbmNlb2YgRXhlY3V0YWJsZSkge1xuICAgICAgY29uc3Qgb2JqcyA9IGRlcGVuZHMuZmlsdGVyKGkgPT4gaS5lbmRzV2l0aChcIi5vXCIpIHx8IGkuZW5kc1dpdGgoXCIub2JqXCIpKS5tYXAoaSA9PiB0YXJnZXQuRklMRV9ESVIucmVsYXRpdmUoaSkpO1xuICAgICAgaWYgKG9ianMubGVuZ3RoKSB7XG4gICAgICAgIGNvbnN0IGxpYnMgPSB0aGlzW1RBUkdFVFNdLmFsbExpYnJhcmllc09mKHRhcmdldCk7XG4gICAgICAgIGNvbnN0IGFyZ3MgPSBbXG4gICAgICAgICAgLi4udGFyZ2V0LlRBUkdFVF9TQ09QRS5DWFhfRkxBR1MsXG4gICAgICAgICAgLi4ubGlua09wdGlvbnMsXG4gICAgICAgICAgLi4ub2JqcyxcbiAgICAgICAgICBcIi1vXCIsIHRhcmdldC5GSUxFX05BTUUsXG4gICAgICAgICAgLi4ubGlicy5tYXAoaSA9PiB0YXJnZXQuRklMRV9ESVIucmVsYXRpdmUoaSkpLFxuICAgICAgICBdO1xuICAgICAgICBjb25zdCBjd2QgPSB0YXJnZXQuRklMRV9ESVIudG9TdHJpbmcoKTtcbiAgICAgICAgY29uc3QgbXNnID0gYExpbmtpbmcgQ1hYIGV4ZWN1dGFibGUgJHt0YXJnZXQuRklMRV9OQU1FfWA7XG4gICAgICAgIGdvYWxMaXN0LmFkZEV4ZWModGFyZ2V0LkZJTEUudG9TdHJpbmcoKSwgZGVwZW5kcy5jb25jYXQobGlicyksIHNjb3BlLkNYWF9DT01QSUxFUiwgYXJncywgY3dkLCBtc2cpO1xuICAgICAgfVxuICAgICAgZWxzZSB7XG4gICAgICAgIGNvbnNvbGUubG9nKGBObyBvYmplY3RzIGZvciBcIiR7dGFyZ2V0Lk5BTUV9XCJgKTtcbiAgICAgIH1cbiAgICB9XG5cbiAgICBnb2FsTGlzdC5hZGRUYXJnZXQobmFtZSwgWyB0YXJnZXQuRklMRS50b1N0cmluZygpIF0sIGBCdWlsdCB0YXJnZXQgJHtuYW1lfWApO1xuICB9XG5cbiAgY29uc3QgaW5zdGFsbF9maWxlcyA9IFtdO1xuICBjb25zdCBpbnN0YWxsX3NjcmlwdCA9IHBhdGgucG9zaXguam9pbihfX2Rpcm5hbWUsIFwiU3lzdGVtU2NyaXB0cy9pbnN0YWxsX3NjcmlwdC5qc1wiKTtcbiAgZm9yIChjb25zdCBpdGVyIG9mIHRoaXNbSU5TVEFMTF9MSVNUXSkge1xuICAgIGxldCBzcmMsIGRlc3Q7XG4gICAgaWYgKGl0ZXIuVkFMVUUgaW5zdGFuY2VvZiBBYnNvbHV0ZVBhdGgpIHtcbiAgICAgIGlmIChzY29wZS5QUkVWRU5UX0lOU1RBTExfRklMRVMpXG4gICAgICAgIGNvbnRpbnVlO1xuICAgICAgc3JjID0gaXRlci5WQUxVRS50b1N0cmluZygpO1xuICAgICAgY29uc3QgcmZpbGUgPSBpdGVyLkJBU0VfRElSLnJlbGF0aXZlKGl0ZXIuVkFMVUUpO1xuICAgICAgZGVzdCA9IGl0ZXIuREVTVElOQVRJT04uam9pbihyZmlsZSk7XG4gICAgfVxuICAgIGVsc2UgaWYgKGl0ZXIuVkFMVUUgaW5zdGFuY2VvZiBJbnRlcmZhY2VUYXJnZXQpIHtcbiAgICAgIGNvbnN0IHRhcmdldCA9IHRoaXNbVEFSR0VUU10uZ2V0KGl0ZXIuVkFMVUUudGFyZ2V0TmFtZSk7XG4gICAgICBzcmMgPSB0YXJnZXQuRklMRS50b1N0cmluZygpO1xuICAgICAgZGVzdCA9IGl0ZXIuREVTVElOQVRJT04uam9pbih0YXJnZXQuRklMRV9OQU1FKTtcbiAgICB9XG4gICAgZWxzZSB7XG4gICAgICB0aHJvdyBuZXcgRXJyb3IoYENhbiBub3QgaW5zdGFsbCAke2l0ZXIuVkFMVUV9YClcbiAgICB9XG4gICAgaWYgKHNjb3BlLkRFU1RESVIpXG4gICAgICBkZXN0ID0gc2NvcGUuREVTVERJUi5qb2luKGRlc3QpLnRvU3RyaW5nKCk7XG4gICAgZ29hbExpc3QuYWRkU2NyaXB0KGluc3RhbGxfc2NyaXB0LCBcIlwiLCBbIHNyYyBdLCBkZXN0LCBzY29wZVZhbHVlQXNQcmltaXRpdmVzKHtzcmMsIGRlc3R9KSwgXCJcIik7XG4gICAgaW5zdGFsbF9maWxlcy5wdXNoKGRlc3QpO1xuICB9XG5cbiAgaWYgKGluc3RhbGxfZmlsZXMubGVuZ3RoKSB7XG4gICAgZ29hbExpc3QuYWRkVGFyZ2V0KFwiaW5zdGFsbFwiLCBpbnN0YWxsX2ZpbGVzLCBcIlwiKTtcbiAgfVxuXG4gIGdvYWxMaXN0LmFkZFRhcmdldChcImFsbFwiLCBPYmplY3Qua2V5cyh0aGlzW1RBUkdFVFNdLkVOVFJJRVMpLCBcIlwiKTtcblxuICByZXR1cm4gZ29hbExpc3Q7XG59XG5cbm1vZHVsZS5leHBvcnRzID0ge1xuICBHbG9iYWxDb250ZXh0LFxufTtcbiIsImNvbnN0IGZzID0gcmVxdWlyZShcIm5vZGU6ZnNcIik7XG5jb25zdCBwYXRoID0gcmVxdWlyZShcIm5vZGU6cGF0aFwiKTtcblxubW9kdWxlLmV4cG9ydHMgPSAocGFyYW1zKSA9PiB7XG4gIGNvbnN0IGNvbnRlbnQgPSBmcy5yZWFkRmlsZVN5bmMocGFyYW1zLmlucHV0LCBcInV0Zi04XCIpO1xuICBjb25zdCBuZXdDb250ZW50ID0gY29udGVudC5yZXBsYWNlKC9AKFtfQS1aYS16XVtfQS1aYS16MC05XSspQC9nLCAobWF0Y2gsIHZhbHVlKSA9PiB7XG4gICAgY29uc3QgcmVzID0gcGFyYW1zW3ZhbHVlXSB8fCBcIlwiO1xuICAgIGlmIChBcnJheS5pc0FycmF5KHJlcykpXG4gICAgICByZXR1cm4gcmVzLmpvaW4oXCJcXG5cIik7XG4gICAgcmV0dXJuIHJlcy50b1N0cmluZygpO1xuICB9KTtcbiAgZnMubWtkaXJTeW5jKHBhdGguZGlybmFtZShwYXJhbXMub3V0cHV0KSwgeyByZWN1cnNpdmU6IHRydWUgfSk7XG4gIGZzLndyaXRlRmlsZVN5bmMocGFyYW1zLm91dHB1dCwgbmV3Q29udGVudCwgXCJ1dGYtOFwiKTtcbn1cbiIsImNvbnN0IGZzID0gcmVxdWlyZShcIm5vZGU6ZnNcIik7XG5jb25zdCBwYXRoID0gcmVxdWlyZShcIm5vZGU6cGF0aFwiKTtcblxubW9kdWxlLmV4cG9ydHMgPSAoe3NyYywgZGVzdH0pID0+IHtcbiAgY29uc29sZS5sb2coXCJJbnN0YWxsaW5nOiBcIiArIGRlc3QpO1xuICBmcy5ta2RpclN5bmMocGF0aC5kaXJuYW1lKGRlc3QpLCB7IHJlY3Vyc2l2ZTogdHJ1ZSB9KTtcbiAgZnMuY3BTeW5jKHNyYywgZGVzdCwgeyBmb3JjZTogdHJ1ZSB9KTtcbn1cbiIsIlwidXNlIHN0cmljdFwiO1xuXG5jb25zdCB7IGVuc3VyZUJvb2xlYW4sIGVuc3VyZVN0cmluZyB9ID0gcmVxdWlyZShcIkAvdXRpbHMvU3RyaWN0VHlwZVwiKTtcbmNvbnN0IHsgQWJzb2x1dGVQYXRoIH0gPSByZXF1aXJlKFwiQC9jb3JlL1BhdGhcIik7XG5cbmNvbnN0IERFRklORV9NQVAgPSBTeW1ib2woXCJERUZJTkVfTUFQXCIpO1xuXG5mdW5jdGlvbiBTeXN0ZW1WYXJpYWJsZXMoKSB7XG4gIGZvciAoY29uc3QgeyBzeW1ib2wsIGluaXRWYWx1ZSB9IG9mIE9iamVjdC52YWx1ZXModGhpc1tERUZJTkVfTUFQXSB8fCB7fSkpIHtcbiAgICB0aGlzW3N5bWJvbF0gPSBBcnJheS5pc0FycmF5KGluaXRWYWx1ZSkgPyBBcnJheS5mcm9tKGluaXRWYWx1ZSkgOiBpbml0VmFsdWU7XG4gIH1cbn1cblxuU3lzdGVtVmFyaWFibGVzLmNyZWF0ZSA9IGZ1bmN0aW9uKCkge1xuICByZXR1cm4gT2JqZWN0LnNlYWwobmV3IFN5c3RlbVZhcmlhYmxlcyk7XG59XG5cblN5c3RlbVZhcmlhYmxlcy5wcm90b3R5cGUgPSBPYmplY3QuY3JlYXRlKE9iamVjdC5wcm90b3R5cGUsIHtcbiAgY29uc3RydWN0b3I6IHtcbiAgICB2YWx1ZTogU3lzdGVtVmFyaWFibGVzLFxuICAgIGVudW1lcmFibGU6IGZhbHNlLFxuICB9LFxufSk7XG5cblN5c3RlbVZhcmlhYmxlcy5kZWZpbmVWYXJpYWJsZSA9IGZ1bmN0aW9uKHNjb3BlLCBuYW1lLCBkZXNjcmlwdG9yKSB7XG4gIGlmICghc2NvcGVbREVGSU5FX01BUF0pXG4gICAgc2NvcGVbREVGSU5FX01BUF0gPSB7fTtcblxuICBjb25zdCB0eXBlID0gZGVzY3JpcHRvci50eXBlIHx8IChBcnJheS5pc0FycmF5KGRlc2NyaXB0b3IudmFsdWUpID8gXCJhcnJheVwiIDogdHlwZW9mIGRlc2NyaXB0b3IudmFsdWUpO1xuXG4gIGxldCBkZWZpbmVFbnRyeSA9IHNjb3BlW0RFRklORV9NQVBdW25hbWVdO1xuICBpZiAoIWRlZmluZUVudHJ5KSB7XG4gICAgZGVmaW5lRW50cnkgPSB7fTtcbiAgICBzY29wZVtERUZJTkVfTUFQXVtuYW1lXSA9IGRlZmluZUVudHJ5O1xuICB9XG5cbiAgaWYgKGRlZmluZUVudHJ5LnR5cGUgIT09IHR5cGUpIHtcbiAgICBkZWZpbmVFbnRyeS5zeW1ib2wgPSBTeW1ib2wobmFtZSk7XG4gIH1cblxuICBkZWZpbmVFbnRyeS50eXBlID0gdHlwZTtcbiAgZGVmaW5lRW50cnkuZGVzY3JpcHRpb24gPSBkZXNjcmlwdG9yLmRlc2NyaXB0aW9uIHx8IFwiXCI7XG5cbiAgbGV0IGVuc3VyZVZhbHVlO1xuICBpZiAoQXJyYXkuaXNBcnJheSh0eXBlKSkge1xuICAgIGxldCBpdGVtVHlwZTtcbiAgICBmb3IgKGNvbnN0IGl0ZXIgb2YgdHlwZSkge1xuICAgICAgY29uc3QgaXQgPSB0eXBlb2YgaXRlcjtcbiAgICAgIGlmICghaXRlbVR5cGUpXG4gICAgICAgIGl0ZW1UeXBlID0gaXQ7XG4gICAgICBlbHNlIGlmIChpdGVtVHlwZSAhPT0gaXQpXG4gICAgICAgIHRocm93IG5ldyBFcnJvcihgQWxsIGVsZW1lbnRzIGZvciAke25hbWV9IG11c3QgYmUgb2YgdGhlIHNhbWUgdHlwZWApO1xuICAgIH1cbiAgICBpZiAoaXRlbVR5cGUgIT09IFwiYm9vbGVhblwiICYmIGl0ZW1UeXBlICE9PSBcInN0cmluZ1wiKVxuICAgICAgdGhyb3cgbmV3IEVycm9yKGBVbmtub3duICR7aXRlbVR5cGV9IGVsZW1lbnQgdHlwZSBvZiAke25hbWV9IHZhcmlhYmxlYCk7XG4gICAgZW5zdXJlVmFsdWUgPSAodmFsdWUpID0+IHtcbiAgICAgIGlmICh0eXBlLmluY2x1ZGVzKHZhbHVlKSlcbiAgICAgICAgcmV0dXJuIHZhbHVlO1xuICAgICAgdGhyb3cgbmV3IEVycm9yKGBUaGUgJyR7dmFsdWV9JyBpcyBub3QgYSAke3R5cGV9YCk7XG4gICAgfVxuICB9XG4gIGVsc2UgaWYgKHR5cGUgPT09IFwiYm9vbGVhblwiKVxuICAgIGVuc3VyZVZhbHVlID0gZW5zdXJlQm9vbGVhbjtcbiAgZWxzZSBpZiAodHlwZSA9PT0gXCJzdHJpbmdcIilcbiAgICBlbnN1cmVWYWx1ZSA9IGVuc3VyZVN0cmluZztcbiAgZWxzZSBpZiAodHlwZSA9PT0gXCJEaXJQYXRoXCIpXG4gICAgZW5zdXJlVmFsdWUgPSBBYnNvbHV0ZVBhdGguY3JlYXRlRGlyO1xuICBlbHNlIGlmICh0eXBlID09PSBcIkZpbGVQYXRoXCIpXG4gICAgZW5zdXJlVmFsdWUgPSBBYnNvbHV0ZVBhdGguY3JlYXRlRmlsZTtcbiAgZWxzZSBpZiAodHlwZSA9PT0gXCJhcnJheVwiKVxuICAgIC8qICovO1xuICBlbHNlXG4gICAgdGhyb3cgbmV3IEVycm9yKGBVbmtub3duICR7dHlwZX0gdHlwZSBvZiAke25hbWV9IHZhcmlhYmxlYCk7XG5cbiAgaWYgKGRlc2NyaXB0b3IuaGFzT3duUHJvcGVydHkoXCJ2YWx1ZVwiKSkge1xuICAgIGRlZmluZUVudHJ5LmluaXRWYWx1ZSA9ICh0eXBlID09PSBcImFycmF5XCIpID8gQXJyYXkuZnJvbShkZXNjcmlwdG9yLnZhbHVlKSA6IGVuc3VyZVZhbHVlKGRlc2NyaXB0b3IudmFsdWUpO1xuICB9XG4gIGVsc2Uge1xuICAgIGRlZmluZUVudHJ5LmluaXRWYWx1ZSA9ICh0eXBlID09PSBcImFycmF5XCIpID8gW10gOiBudWxsO1xuICB9XG5cbiAgY29uc3QgeyBzeW1ib2wgfSA9IGRlZmluZUVudHJ5O1xuICBjb25zdCBkZXNjID0ge1xuICAgIGNvbmZpZ3VyYWJsZTogdHJ1ZSxcbiAgICBlbnVtZXJhYmxlOiB0cnVlLFxuICAgIGdldCgpIHsgcmV0dXJuIHRoaXNbc3ltYm9sXSB9LFxuICB9O1xuXG4gIGlmIChlbnN1cmVWYWx1ZSlcbiAgICBkZXNjLnNldCA9IGZ1bmN0aW9uKHZhbHVlKSB7IHRoaXNbc3ltYm9sXSA9IGVuc3VyZVZhbHVlKHZhbHVlKSB9O1xuXG4gIE9iamVjdC5kZWZpbmVQcm9wZXJ0eShzY29wZSwgbmFtZSwgZGVzYyk7XG59XG5cblN5c3RlbVZhcmlhYmxlcy5kZWZpbmVWYXJpYWJsZXMgPSBmdW5jdGlvbihzY29wZSwgZGVzY3JpcHRvcnMpIHtcbiAgZm9yIChjb25zdCBbIG5hbWUsIGRlc2NyaXB0b3IgXSBvZiBPYmplY3QuZW50cmllcyhkZXNjcmlwdG9ycykpXG4gICAgU3lzdGVtVmFyaWFibGVzLmRlZmluZVZhcmlhYmxlKHNjb3BlLCBuYW1lLCBkZXNjcmlwdG9yKTtcbn1cblxuU3lzdGVtVmFyaWFibGVzLnByb3RvdHlwZS50b0pTT04gPSBmdW5jdGlvbigpIHtcbiAgY29uc3QganNvbiA9IHt9O1xuICBmb3IgKGNvbnN0IGtleSBpbiB0aGlzKVxuICAgIGpzb25ba2V5XSA9IHRoaXNba2V5XTtcbiAgcmV0dXJuIGpzb247XG59XG5cblN5c3RlbVZhcmlhYmxlcy5wcm90b3R5cGUuY2xvbmUgPSBmdW5jdGlvbigpIHtcbiAgY29uc3QgbyA9IE9iamVjdC5jcmVhdGUoU3lzdGVtVmFyaWFibGVzLnByb3RvdHlwZSk7XG5cbiAgZm9yIChjb25zdCB7IHN5bWJvbCB9IG9mIE9iamVjdC52YWx1ZXModGhpc1tERUZJTkVfTUFQXSB8fCB7fSkpIHtcbiAgICBvW3N5bWJvbF0gPSBBcnJheS5pc0FycmF5KHRoaXNbc3ltYm9sXSkgPyBBcnJheS5mcm9tKHRoaXNbc3ltYm9sXSkgOiB0aGlzW3N5bWJvbF07XG4gIH1cblxuICByZXR1cm4gT2JqZWN0LnNlYWwobyk7XG59XG5cbm1vZHVsZS5leHBvcnRzID0ge1xuICBTeXN0ZW1WYXJpYWJsZXMsXG59O1xuIiwiXCJ1c2Ugc3RyaWN0XCI7XG5cbmNvbnN0IG9zID0gcmVxdWlyZShcIm5vZGU6b3NcIik7XG5jb25zdCBwYXRoID0gcmVxdWlyZShcIm5vZGU6cGF0aFwiKTtcblxuY29uc3QgeyBjb3B5VmFsdWUgfSA9IHJlcXVpcmUoXCJAL3V0aWxzL1ByaW1pdGl2ZXNcIik7XG5jb25zdCB7IGZpbGVFeGlzdHNTeW5jIH0gPSByZXF1aXJlKFwiQC91dGlscy9GaWxlU3lzdGVtXCIpO1xuY29uc3QgeyBBYnNvbHV0ZVBhdGggfSA9IHJlcXVpcmUoXCJAL2NvcmUvUGF0aFwiKTtcbmNvbnN0IHsgSW50ZXJmYWNlVGFyZ2V0IH0gPSByZXF1aXJlKFwiQC9jb3JlL0ludGVyZmFjZVRhcmdldFwiKTtcbmNvbnN0IHsgSW50ZXJmYWNlU2NyaXB0IH0gPSByZXF1aXJlKFwiQC9jb3JlL0ludGVyZmFjZVNjcmlwdFwiKTtcbmNvbnN0IHsgSW5zdGFsbEVudGl0eSB9ID0gcmVxdWlyZShcIkAvY29yZS9JbnN0YWxsRW50aXR5XCIpO1xuY29uc3QgeyBPYmplY3RMaWJyYXJ5LCBTdGF0aWNMaWJyYXJ5LCBTaGFyZWRMaWJyYXJ5LCBFeGVjdXRhYmxlLCBCYXNlVGFyZ2V0IH0gPSByZXF1aXJlKFwiQC9jb3JlL1RhcmdldFwiKTtcbmNvbnN0IHsgSW5jbHVkZURpcmVjdG9yeSB9ID0gcmVxdWlyZShcIkAvY29yZS9JbmNsdWRlRGlyZWN0b3J5XCIpO1xuY29uc3QgeyBTeXN0ZW1WYXJpYWJsZXMgfSA9IHJlcXVpcmUoXCIuL1N5c3RlbVZhcmlhYmxlcy5qc1wiKTtcbmNvbnN0IHsgQ3VzdG9tU2NyaXB0IH0gPSByZXF1aXJlKFwiQC9jb3JlL0N1c3RvbVNjcmlwdFwiKTtcblxuY29uc3QgcmVxdWlyZUltcGwgPSBldmFsKFwicmVxdWlyZVwiKTtcblxuY29uc3QgY3VycmVudEZ1bmN0aW9uTmFtZSA9ICgpID0+IHtcbiAgY29uc3Qgc3RhY2sgPSBuZXcgRXJyb3IoKS5zdGFjay5zcGxpdChcIlxcblwiKVsyXTtcbiAgcmV0dXJuIHN0YWNrLm1hdGNoKC9hdCAoXFxTKykvKT8uWzFdO1xufTtcblxuZnVuY3Rpb24gc2NvcGVWYWx1ZUFzUHJpbWl0aXZlcyhvKSB7XG4gIGlmICh0eXBlb2YgbyA9PT0gXCJ1bmRlZmluZWRcIilcbiAgICByZXR1cm4gbztcbiAgaWYgKHR5cGVvZiBvID09PSBcImJvb2xlYW5cIilcbiAgICByZXR1cm4gbztcbiAgaWYgKHR5cGVvZiBvID09PSBcIm51bWJlclwiKVxuICAgIHJldHVybiBvO1xuICBpZiAodHlwZW9mIG8gPT09IFwic3RyaW5nXCIpXG4gICAgcmV0dXJuIG87XG4gIGlmICh0eXBlb2YgbyA9PT0gXCJvYmplY3RcIikge1xuICAgIGlmICghbylcbiAgICAgIHJldHVybiBvO1xuICAgIGlmIChvIGluc3RhbmNlb2YgQWJzb2x1dGVQYXRoKSB7XG4gICAgICByZXR1cm4gby50b1N0cmluZygpO1xuICAgIH1cbiAgICBpZiAobyBpbnN0YW5jZW9mIEFycmF5KSB7XG4gICAgICBjb25zdCByZXN1bHQgPSBbXTtcbiAgICAgIGZvciAoY29uc3QgaSBvZiBvKVxuICAgICAgICByZXN1bHQucHVzaChzY29wZVZhbHVlQXNQcmltaXRpdmVzKGkpKTtcbiAgICAgIHJldHVybiByZXN1bHQ7XG4gICAgfVxuICAgIGlmIChvIGluc3RhbmNlb2YgT2JqZWN0KSB7XG4gICAgICBjb25zdCByZXN1bHQgPSB7fTtcbiAgICAgIGZvciAoY29uc3QgW2ssdl0gb2YgT2JqZWN0LmVudHJpZXMobykpXG4gICAgICAgIHJlc3VsdFtrXSA9IHNjb3BlVmFsdWVBc1ByaW1pdGl2ZXModik7XG4gICAgICByZXR1cm4gcmVzdWx0O1xuICAgIH1cbiAgfVxuICB0aHJvdyBuZXcgRXJyb3IoYFVua25vd24gaW5zdGFuY2Ugb2YgJHtvfWApO1xufVxuXG5jb25zdCBHTE9CQUwgPSBTeW1ib2woXCJHTE9CQUxcIik7XG5jb25zdCBTQ09QRSA9IFN5bWJvbChcIlNDT1BFXCIpO1xuXG5mdW5jdGlvbiBVc2VyQ29udGV4dChzY29wZSwgZ2xvYmFsKSB7XG4gIHRoaXNbU0NPUEVdID0gc2NvcGU7XG4gIHRoaXNbR0xPQkFMXSA9IGdsb2JhbDtcblxuICBjb25zdCBwcm9wcyA9IE9iamVjdC5nZXRPd25Qcm9wZXJ0eURlc2NyaXB0b3JzKFN5c3RlbVZhcmlhYmxlcy5wcm90b3R5cGUpO1xuICBmb3IgKGNvbnN0IFtuYW1lLCBkZXNjXSBvZiBPYmplY3QuZW50cmllcyhwcm9wcykpIHtcbiAgICBpZiAoZGVzYy5nZXQgfHwgZGVzYy5zZXQpIHtcbiAgICAgIGNvbnN0IG5ld0Rlc2MgPSB7IGVudW1lcmFibGU6IGRlc2MuZW51bWVyYWJsZSwgY29uZmlndXJhYmxlOiBmYWxzZSB9O1xuICAgICAgaWYgKGRlc2MuZ2V0KVxuICAgICAgICBuZXdEZXNjLmdldCA9IGZ1bmN0aW9uKCkgeyByZXR1cm4gdGhpc1tTQ09QRV1bbmFtZV07IH1cbiAgICAgIGlmIChkZXNjLnNldClcbiAgICAgICAgbmV3RGVzYy5zZXQgPSBmdW5jdGlvbih2YWx1ZSkgeyB0aGlzW1NDT1BFXVtuYW1lXSA9IHZhbHVlOyB9XG4gICAgICBPYmplY3QuZGVmaW5lUHJvcGVydHkodGhpcywgbmFtZSwgbmV3RGVzYyk7XG4gICAgfVxuICB9XG59XG5cblVzZXJDb250ZXh0LmNyZWF0ZSA9IChzY29wZSwgZ2xvYmFsKSA9PiB7XG4gIHJldHVybiBuZXcgVXNlckNvbnRleHQoc2NvcGUsIGdsb2JhbCk7XG59XG5cbmZ1bmN0aW9uIG1ha2VMb2dnZXIobG9nZ2VyRnVuYywgd2l0aFRhZykge1xuICBpZiAoIWxvZ2dlckZ1bmMpXG4gICAgcmV0dXJuICgpID0+IHt9O1xuICByZXR1cm4gZnVuY3Rpb24oKSB7XG4gICAgY29uc3QgbGlzdCA9IFtdO1xuICAgIGlmICh3aXRoVGFnKVxuICAgICAgbGlzdC5wdXNoKFwiW1wiICsgdGhpcy5fX2xvZ1RhZygpICsgXCJdXCIpO1xuICAgIGZvciAoY29uc3QgaXRlciBvZiBhcmd1bWVudHMpIHtcbiAgICAgIGlmIChpdGVyICYmIHR5cGVvZiBpdGVyID09PSBcIm9iamVjdFwiKVxuICAgICAgICBsaXN0LnB1c2goSlNPTi5zdHJpbmdpZnkoaXRlcikpO1xuICAgICAgZWxzZVxuICAgICAgICBsaXN0LnB1c2goaXRlci50b1N0cmluZygpKTtcbiAgICB9XG4gICAgbG9nZ2VyRnVuYyhsaXN0LmpvaW4oXCIgXCIpKTtcbiAgfTtcbn1cblxuVXNlckNvbnRleHQucHJvdG90eXBlLmxvZ0RlZmF1bHQgPSBtYWtlTG9nZ2VyKGNvbnNvbGUubG9nKTtcblVzZXJDb250ZXh0LnByb3RvdHlwZS5sb2dJbmZvID0gbWFrZUxvZ2dlcihjb25zb2xlLmluZm8pO1xuVXNlckNvbnRleHQucHJvdG90eXBlLmxvZ0RlYnVnID0gbWFrZUxvZ2dlcigvKmNvbnNvbGUuZGVidWcqLyk7XG5Vc2VyQ29udGV4dC5wcm90b3R5cGUubG9nV2FybiA9IG1ha2VMb2dnZXIoY29uc29sZS53YXJuKTtcblVzZXJDb250ZXh0LnByb3RvdHlwZS5sb2dFcnJvciA9IG1ha2VMb2dnZXIoY29uc29sZS5lcnJvcik7XG5cblVzZXJDb250ZXh0LnByb3RvdHlwZS5fX2xvZ1RhZyA9IGZ1bmN0aW9uKCkge1xuICBjb25zdCB0YWcgPSB0aGlzLlBST0pFQ1RfU09VUkNFX0RJUi5yZWxhdGl2ZSh0aGlzLlNPVVJDRV9ESVIpO1xuICByZXR1cm4gcGF0aC5wb3NpeC5qb2luKHRoaXMuUFJPSkVDVF9OQU1FLCB0YWcpO1xufVxuXG5Vc2VyQ29udGV4dC5wcm90b3R5cGUuX19zY29wZSA9IGZ1bmN0aW9uKCkge1xuICByZXR1cm4gdGhpc1tTQ09QRV07XG59XG5cblVzZXJDb250ZXh0LnByb3RvdHlwZS5nZXRDYWNoZVZhcmlhYmxlcyA9IGZ1bmN0aW9uKCkge1xuICB0aGlzLmxvZ0RlYnVnKGN1cnJlbnRGdW5jdGlvbk5hbWUoKSk7XG4gIGNvbnN0IHJlc3VsdCA9IHt9O1xuICBmb3IgKGNvbnN0IFtrZXksIGVudHJ5XSBvZiBPYmplY3QuZW50cmllcyh0aGlzW0dMT0JBTF0uQ0FDSEUpKSB7XG4gICAgY29uc3QgdmFsdWUgPSBjb3B5VmFsdWUodGhpc1trZXldKTtcbiAgICByZXN1bHRba2V5XSA9IHtcbiAgICAgIHR5cGU6IGNvcHlWYWx1ZShlbnRyeS50eXBlKSB8fCB0eXBlb2YgdmFsdWUsXG4gICAgICBkZXNjcmlwdGlvbjogZW50cnkuZGVzY3JpcHRpb24gfHwgXCJcIixcbiAgICAgIHZhbHVlLFxuICAgIH07XG4gIH1cbiAgcmV0dXJuIHJlc3VsdDtcbn1cblxuVXNlckNvbnRleHQucHJvdG90eXBlLmFkZENhY2hlVmFyaWFibGVzID0gZnVuY3Rpb24ocGFyYW1zKSB7XG4gIHRoaXMubG9nRGVidWcoY3VycmVudEZ1bmN0aW9uTmFtZSgpKTtcblxuICBpZiAodHlwZW9mIHBhcmFtcyA9PT0gXCJzdHJpbmdcIikge1xuICAgIGNvbnN0IHNjcmlwdHMgPSB0aGlzLlNPVVJDRV9ESVIucmVzb2x2ZShwYXJhbXMpO1xuICAgIHRoaXNbR0xPQkFMXS5sb2FkQ2FjaGVWYXJpYWJsZXMoc2NyaXB0cyk7XG4gIH1cbiAgZWxzZSBpZiAodHlwZW9mIHBhcmFtcyA9PT0gXCJvYmplY3RcIikge1xuICAgIHRoaXNbR0xPQkFMXS5hZGRDYWNoZVZhcmlhYmxlcyhwYXJhbXMpO1xuICB9XG4gIGVsc2Uge1xuICAgIHRocm93IG5ldyBFcnJvcihgVHlwZSAke3BhcmFtc30gY2Fubm90IHVzZSBmb3IgY2FjaGUgdmFyaWFibGVzYCk7XG4gIH1cblxuICB0aGlzW0dMT0JBTF0uY29weUNhY2hlVmFyaWFibGVzKHRoaXMpO1xufVxuXG5Vc2VyQ29udGV4dC5wcm90b3R5cGUuYWRkSW5jbHVkZURpcmVjdG9yaWVzID0gZnVuY3Rpb24oLi4uZGlycykge1xuICBmb3IgKGNvbnN0IGl0ZXIgb2YgZGlycy5mbGF0KDEpKSB7XG4gICAgdGhpcy5JTkNMVURFUy5wdXNoKEluY2x1ZGVEaXJlY3RvcnkuY3JlYXRlKGl0ZXIsIHRoaXMuU09VUkNFX0RJUikpO1xuICB9XG59XG5cblVzZXJDb250ZXh0LnByb3RvdHlwZS5hZGRTdWJkaXJlY3RvcnkgPSBmdW5jdGlvbihzb3VyY2VEaXIsIGJpbmFyeURpcikge1xuICB0aGlzLmxvZ0RlYnVnKGN1cnJlbnRGdW5jdGlvbk5hbWUoKSk7XG5cbiAgYmluYXJ5RGlyID0gYmluYXJ5RGlyIHx8IHBhdGguaXNBYnNvbHV0ZShzb3VyY2VEaXIpID8gdW5kZWZpbmVkIDogc291cmNlRGlyO1xuXG4gIGNvbnN0IFNPVVJDRV9ESVIgPSBwYXRoLmlzQWJzb2x1dGUoc291cmNlRGlyKSA/IEFic29sdXRlUGF0aC5jcmVhdGUoc291cmNlRGlyKSA6IHRoaXMuU09VUkNFX0RJUi5qb2luKHNvdXJjZURpcik7XG4gIGNvbnN0IEJJTkFSWV9ESVIgPSBwYXRoLmlzQWJzb2x1dGUoYmluYXJ5RGlyKSA/IEFic29sdXRlUGF0aC5jcmVhdGUoYmluYXJ5RGlyKSA6IHRoaXMuQklOQVJZX0RJUi5qb2luKGJpbmFyeURpcik7XG5cbiAgY29uc3QgbmV3U2NvcGUgPSB0aGlzW1NDT1BFXS5jbG9uZSgpO1xuXG4gIG5ld1Njb3BlLlNPVVJDRV9ESVIgPSBBYnNvbHV0ZVBhdGguY3JlYXRlKHRoaXNbR0xPQkFMXS5yZXNvbHZlU3ViZGlyZWN0b3J5KFNPVVJDRV9ESVIpLnRvU3RyaW5nKCkpO1xuICBuZXdTY29wZS5CSU5BUllfRElSID0gQklOQVJZX0RJUjtcbiAgXG4gIGNvbnN0IG5ld0NvbnRleCA9IFVzZXJDb250ZXh0LmNyZWF0ZShuZXdTY29wZSwgdGhpc1tHTE9CQUxdKTtcbiAgZm9yIChjb25zdCBba2V5LCB2YWxdIG9mIE9iamVjdC5lbnRyaWVzKHRoaXMpKSB7XG4gICAgaWYgKCFPYmplY3QuaGFzT3duKFN5c3RlbVZhcmlhYmxlcy5wcm90b3R5cGUsIGtleSkpXG4gICAgICBuZXdDb250ZXhba2V5XSA9IHZhbDtcbiAgfVxuXG4gIHRoaXNbR0xPQkFMXS5hZGRTdWJkaXJlY3RvcnkobmV3Q29udGV4KTtcbn1cblxuVXNlckNvbnRleHQucHJvdG90eXBlLmFkZEN1c3RvbVNjcmlwdCA9IGZ1bmN0aW9uKG5hbWUsIHBhcmFtcykge1xuICB0aGlzLmxvZ0RlYnVnKGN1cnJlbnRGdW5jdGlvbk5hbWUoKSwgbmFtZSk7XG5cbiAgY29uc3QgbmV3U2NvcGUgPSB0aGlzW1NDT1BFXS5jbG9uZSgpO1xuICBjb25zdCB0YXJnZXQgPSBDdXN0b21TY3JpcHQuY3JlYXRlKG5ld1Njb3BlLCBuYW1lLCBwYXJhbXMpO1xuICB0aGlzW0dMT0JBTF0uU0NSSVBUUy5zZXQobmFtZSwgdGFyZ2V0KTtcbiAgcmV0dXJuIHRhcmdldDtcbn1cblxuVXNlckNvbnRleHQucHJvdG90eXBlLnRhcmdldCA9IGZ1bmN0aW9uKG5hbWUpIHtcbiAgY29uc3QgdXRhcmdldCA9IHRoaXNbR0xPQkFMXS5nZXRVa25vd25UYXJnZXQobmFtZSk7XG4gIHJldHVybiBJbnRlcmZhY2VUYXJnZXQuY3JlYXRlKHRoaXNbU0NPUEVdLCB1dGFyZ2V0KTtcbn1cblxuVXNlckNvbnRleHQucHJvdG90eXBlLnNjcmlwdCA9IGZ1bmN0aW9uKG5hbWUpIHtcbiAgdGhpcy5sb2dEZWJ1ZyhjdXJyZW50RnVuY3Rpb25OYW1lKCksIG5hbWUpO1xuXG4gIGxldCBzY3JpcHQgPSB0aGlzW0dMT0JBTF0uSU5URVJGQUNFX1NDUklQVFNbbmFtZV07XG4gIGlmICghc2NyaXB0KSB7XG4gICAgc2NyaXB0ID0gSW50ZXJmYWNlU2NyaXB0LmNyZWF0ZShuYW1lKTtcbiAgICB0aGlzW0dMT0JBTF0uSU5URVJGQUNFX1NDUklQVFNbbmFtZV0gPSBzY3JpcHQ7XG4gIH1cblxuICByZXR1cm4gc2NyaXB0O1xufVxuXG5Vc2VyQ29udGV4dC5wcm90b3R5cGUuaW5zdGFsbCA9IGZ1bmN0aW9uKHZhbHVlLCBwYXJhbXMpIHtcbiAgZm9yIChjb25zdCBpdCBvZiBbIHZhbHVlIF0uZmxhdCgxKSkge1xuICAgIGNvbnN0IGl0ZXIgPSAoaXQgaW5zdGFuY2VvZiBCYXNlVGFyZ2V0KSA/IHRoaXMudGFyZ2V0KGl0Lk5BTUUpIDogaXQ7XG4gICAgY29uc3QgZW50aXR5ID0gSW5zdGFsbEVudGl0eS5jcmVhdGUodGhpcywgaXRlciwgcGFyYW1zKTtcbiAgICB0aGlzW0dMT0JBTF0uSU5TVEFMTF9MSVNULnB1c2goZW50aXR5KTtcbiAgfVxufVxuXG5Vc2VyQ29udGV4dC5wcm90b3R5cGUuYWRkU3RhdGljTGlicmFyeSA9IGZ1bmN0aW9uKG5hbWUsIC4uLnNvdXJjZXMpIHtcbiAgdGhpcy5sb2dEZWJ1ZyhjdXJyZW50RnVuY3Rpb25OYW1lKCksIG5hbWUpO1xuXG4gIGNvbnN0IHRhcmdldCA9IFN0YXRpY0xpYnJhcnkuY3JlYXRlKHRoaXNbU0NPUEVdLCBuYW1lKTtcbiAgdGFyZ2V0LmFkZFNvdXJjZXMoLi4uc291cmNlcyk7XG5cbiAgdGhpc1tHTE9CQUxdLlRBUkdFVFMuc2V0KG5hbWUsIHRhcmdldCk7XG4gIHJldHVybiB0YXJnZXQ7XG59XG5cblVzZXJDb250ZXh0LnByb3RvdHlwZS5hZGRPYmplY3RMaWJyYXJ5ID0gZnVuY3Rpb24obmFtZSwgLi4uc291cmNlcykge1xuICB0aGlzLmxvZ0RlYnVnKGN1cnJlbnRGdW5jdGlvbk5hbWUoKSwgbmFtZSk7XG5cbiAgY29uc3QgdGFyZ2V0ID0gT2JqZWN0TGlicmFyeS5jcmVhdGUodGhpc1tTQ09QRV0sIG5hbWUpO1xuICB0YXJnZXQuYWRkU291cmNlcyguLi5zb3VyY2VzKTtcblxuICB0aGlzW0dMT0JBTF0uVEFSR0VUUy5zZXQobmFtZSwgdGFyZ2V0KTtcbiAgcmV0dXJuIHRhcmdldDtcbn1cblxuVXNlckNvbnRleHQucHJvdG90eXBlLmFkZFNoYXJlZExpYnJhcnkgPSBmdW5jdGlvbihuYW1lLCAuLi5zb3VyY2VzKSB7XG4gIHRoaXMubG9nRGVidWcoY3VycmVudEZ1bmN0aW9uTmFtZSgpLCBuYW1lKTtcblxuICBjb25zdCB0YXJnZXQgPSBTaGFyZWRMaWJyYXJ5LmNyZWF0ZSh0aGlzW1NDT1BFXSwgbmFtZSk7XG4gIHRhcmdldC5hZGRTb3VyY2VzKC4uLnNvdXJjZXMpO1xuXG4gIHRoaXNbR0xPQkFMXS5UQVJHRVRTLnNldChuYW1lLCB0YXJnZXQpO1xuICByZXR1cm4gdGFyZ2V0O1xufVxuXG5Vc2VyQ29udGV4dC5wcm90b3R5cGUuYWRkRXhlY3V0YWJsZSA9IGZ1bmN0aW9uKG5hbWUsIC4uLnNvdXJjZXMpIHtcbiAgdGhpcy5sb2dEZWJ1ZyhjdXJyZW50RnVuY3Rpb25OYW1lKCksIG5hbWUpO1xuXG4gIGNvbnN0IHRhcmdldCA9IEV4ZWN1dGFibGUuY3JlYXRlKHRoaXNbU0NPUEVdLCBuYW1lKTtcbiAgdGFyZ2V0LmFkZFNvdXJjZXMoLi4uc291cmNlcyk7XG5cbiAgdGhpc1tHTE9CQUxdLlRBUkdFVFMuc2V0KG5hbWUsIHRhcmdldCk7XG4gIHJldHVybiB0YXJnZXQ7XG59XG5cblVzZXJDb250ZXh0LnByb3RvdHlwZS5maW5kUHJvZ3JhbSA9IGZ1bmN0aW9uKG5hbWUpIHtcbiAgdGhpcy5sb2dEZWJ1ZyhjdXJyZW50RnVuY3Rpb25OYW1lKCksIG5hbWUpO1xuXG4gIGlmIChvcy5wbGF0Zm9ybSgpID09PSBcIndpbjMyXCIgJiYgIW5hbWUuZW5kc1dpdGgoXCIuZXhlXCIpKVxuICAgIG5hbWUgKz0gXCIuZXhlXCI7XG5cbiAgY29uc3QgcGF0aHMgPSBwcm9jZXNzLmVudi5QQVRILnNwbGl0KHBhdGgucG9zaXguZGVsaW1pdGVyKTtcbiAgZm9yIChjb25zdCBpdGVyIG9mIHBhdGhzKSB7XG4gICAgY29uc3QgZmlsZW5hbWUgPSBwYXRoLnBvc2l4LnJlc29sdmUoaXRlciwgbmFtZSk7XG4gICAgaWYgKGZpbGVFeGlzdHNTeW5jKGZpbGVuYW1lKSlcbiAgICAgIHJldHVybiBmaWxlbmFtZTtcbiAgfVxuXG4gIHJldHVybiBudWxsO1xufVxuXG5Vc2VyQ29udGV4dC5wcm90b3R5cGUuZXhlY3V0ZVNjcmlwdCA9IGZ1bmN0aW9uKHNjcmlwdCwgb3B0aW9ucykge1xuICB0aGlzLmxvZ0RlYnVnKGN1cnJlbnRGdW5jdGlvbk5hbWUoKSwgc2NyaXB0KTtcbiAgY29uc3Qgc2NyaXB0UGF0aCA9IHRoaXMuU09VUkNFX0RJUi5yZXNvbHZlKHNjcmlwdCk7XG4gIGNvbnN0IG1vZHVsZSA9IHJlcXVpcmVJbXBsKHNjcmlwdFBhdGgudG9TdHJpbmcoKSk7XG4gIG1vZHVsZShzY29wZVZhbHVlQXNQcmltaXRpdmVzKG9wdGlvbnMpKTtcbn1cblxuVXNlckNvbnRleHQucHJvdG90eXBlLnRvSlNPTiA9IGZ1bmN0aW9uKCkge1xuICBjb25zdCBqc29uID0ge307XG4gIGZvciAoY29uc3Qga2V5IGluIHRoaXMpXG4gICAganNvbltrZXldID0gdGhpc1trZXldO1xuICByZXR1cm4ganNvbjtcbn1cblxubW9kdWxlLmV4cG9ydHMgPSB7XG4gIFVzZXJDb250ZXh0LFxufTtcbiIsIi8qXG4gKiBNSVQgTGljZW5zZVxuICpcbiAqIENvcHlyaWdodCAoYykgMjAyNSAgWXVyaWkgWWFrdWJpbiAoeXVyaWkueWFrdWJpbkBnbWFpbC5jb20pXG4gKlxuICogUGVybWlzc2lvbiBpcyBncmFudGVkIHRvIHVzZSwgY29weSwgbW9kaWZ5LCBhbmQgZGlzdHJpYnV0ZSB0aGlzIHNvZnR3YXJlXG4gKiB1bmRlciB0aGUgTUlUIExpY2Vuc2UuIFNlZSBMSUNFTlNFIGZpbGUgZm9yIGRldGFpbHMuXG4gKi9cblxuZXhwb3J0IGVudW0gQm9vbGVhblR5cGUge1xuICBPTiA9IFwiT05cIixcbiAgT0ZGID0gXCJPRkZcIixcbn07XG5cbi8vIEVudW0gcmVwcmVzZW50aW5nIHZhbHVlIHR5cGVzIHVzZWQgaW4gQ01ha2UgY2FjaGUgdmFyaWFibGVzXG5leHBvcnQgZW51bSBWYWx1ZVR5cGUge1xuICAvLyBSZXByZXNlbnRzIGEgZnVsbCBwYXRoIHRvIGEgZmlsZVxuICBGSUxFUEFUSCA9IFwiRklMRVBBVEhcIixcblxuICAvLyBSZXByZXNlbnRzIGEgcGF0aCB0byBhIGRpcmVjdG9yeVxuICBQQVRIID0gXCJQQVRIXCIsXG5cbiAgLy8gUmVwcmVzZW50cyBhIGJvb2xlYW4gdmFsdWUgKHRydWUvZmFsc2UpXG4gIEJPT0wgPSBcIkJPT0xcIixcblxuICAvLyBSZXByZXNlbnRzIGEgZ2VuZXJpYyBzdHJpbmcgdmFsdWVcbiAgU1RSSU5HID0gXCJTVFJJTkdcIixcbn07XG5cbi8vIEJ1aWxkVHlwZSByZXByZXNlbnRpbmcgY29tbW9uIENNYWtlIGJ1aWxkIHR5cGVzXG5leHBvcnQgZW51bSBCdWlsZFR5cGUge1xuICAvLyBEZWJ1ZyBidWlsZCB0eXBlOiBpbmNsdWRlcyBkZWJ1ZyBzeW1ib2xzLCBubyBvcHRpbWl6YXRpb25cbiAgRGVidWcgPSBcIkRlYnVnXCIsXG5cbiAgLy8gUmVsZWFzZSBidWlsZCB0eXBlOiBvcHRpbWl6ZWQgY29kZSwgbm8gZGVidWcgaW5mb1xuICBSZWxlYXNlID0gXCJSZWxlYXNlXCIsXG5cbiAgLy8gUmVsZWFzZSB3aXRoIGRlYnVnIGluZm86IG9wdGltaXplZCB3aXRoIGRlYnVnIHN5bWJvbHMgaW5jbHVkZWRcbiAgUmVsV2l0aERlYkluZm8gPSBcIlJlbFdpdGhEZWJJbmZvXCIsXG5cbiAgLy8gTWluaW11bSBzaXplIHJlbGVhc2U6IG9wdGltaXplZCBmb3Igc21hbGxlc3QgYmluYXJ5IHNpemVcbiAgTWluU2l6ZVJlbCA9IFwiTWluU2l6ZVJlbFwiLFxufTtcblxuLy8gVGhlIGRlZmF1bHQgbmFtZSBvZiB0aGUgbWFpbiBDTWFrZSBidWlsZCBjb25maWd1cmF0aW9uIGZpbGVcbmV4cG9ydCBjb25zdCBDTUFLRV9MSVNUU19UWFQgPSBcIkNNYWtlTGlzdHMudHh0XCI7XG4iLCIvKlxuICogTUlUIExpY2Vuc2VcbiAqXG4gKiBDb3B5cmlnaHQgKGMpIDIwMjUgIFl1cmlpIFlha3ViaW4gKHl1cmlpLnlha3ViaW5AZ21haWwuY29tKVxuICpcbiAqIFBlcm1pc3Npb24gaXMgZ3JhbnRlZCB0byB1c2UsIGNvcHksIG1vZGlmeSwgYW5kIGRpc3RyaWJ1dGUgdGhpcyBzb2Z0d2FyZVxuICogdW5kZXIgdGhlIE1JVCBMaWNlbnNlLiBTZWUgTElDRU5TRSBmaWxlIGZvciBkZXRhaWxzLlxuICovXG5cbmltcG9ydCB7IEJvb2xlYW5UeXBlIH0gZnJvbSBcIkAvY21ha2UvQ29uc3RhbnRzXCI7XG5cbmV4cG9ydCBmdW5jdGlvbiBjb252ZXJ0VG9WYWx1ZShvYmo6IGFueSk6IHN0cmluZyB7XG4gIGlmIChBcnJheS5pc0FycmF5KG9iaikpXG4gICAgcmV0dXJuIG9iai5tYXAoaSA9PiBjb252ZXJ0VG9WYWx1ZShpKSkuam9pbihcIjtcIik7XG5cbiAgaWYgKHR5cGVvZiBvYmogPT09IFwiYm9vbGVhblwiKVxuICAgIHJldHVybiBvYmogPyBCb29sZWFuVHlwZS5PTiA6IEJvb2xlYW5UeXBlLk9GRjtcblxuICByZXR1cm4gb2JqLnRvU3RyaW5nKCk7XG59XG4iLCIvKlxuICogTUlUIExpY2Vuc2VcbiAqXG4gKiBDb3B5cmlnaHQgKGMpIDIwMjUgIFl1cmlpIFlha3ViaW4gKHl1cmlpLnlha3ViaW5AZ21haWwuY29tKVxuICpcbiAqIFBlcm1pc3Npb24gaXMgZ3JhbnRlZCB0byB1c2UsIGNvcHksIG1vZGlmeSwgYW5kIGRpc3RyaWJ1dGUgdGhpcyBzb2Z0d2FyZVxuICogdW5kZXIgdGhlIE1JVCBMaWNlbnNlLiBTZWUgTElDRU5TRSBmaWxlIGZvciBkZXRhaWxzLlxuICovXG5cbmltcG9ydCBwYXRoIGZyb20gXCJub2RlOnBhdGhcIjtcbmltcG9ydCB1cmwgZnJvbSBcIm5vZGU6dXJsXCI7XG5cbmltcG9ydCB7IGVuc3VyZVN0cmluZyB9IGZyb20gXCJAL3V0aWxzL1N0cmljdFR5cGVcIjtcbmltcG9ydCB7IEFic29sdXRlUGF0aCB9IGZyb20gXCJAL2NvcmUvUGF0aFwiO1xuXG5jb25zdCBUQVJHRVRfU0NPUEUgPSBTeW1ib2woXCJUQVJHRVRfU0NPUEVcIik7XG5jb25zdCBOQU1FICAgICAgICAgPSBTeW1ib2woXCJOQU1FXCIpO1xuY29uc3QgRklMRSAgICAgICAgID0gU3ltYm9sKFwiRklMRVwiKTtcbmNvbnN0IElOUFVUICAgICAgICA9IFN5bWJvbChcIklOUFVUXCIpO1xuY29uc3QgT1VUUFVUICAgICAgID0gU3ltYm9sKFwiT1VUUFVUXCIpO1xuY29uc3QgUEFSQU1TICAgICAgID0gU3ltYm9sKFwiUEFSQU1TXCIpO1xuY29uc3QgUFJPUEVSVElFUyAgID0gU3ltYm9sKFwiUFJPUEVSVElFU1wiKTtcblxuY29uc3QgX19maWxlbmFtZSA9IHVybC5maWxlVVJMVG9QYXRoKGltcG9ydC5tZXRhLnVybCk7XG5jb25zdCBfX2Rpcm5hbWUgPSBwYXRoLmRpcm5hbWUoX19maWxlbmFtZSk7XG5cbmNvbnN0IFNZU1RFTV9TQ1JJUFRTX0RJUiA9IEFic29sdXRlUGF0aC5jcmVhdGUoX19kaXJuYW1lKS5yZXNvbHZlKFwiLi4vYml0bWFrZS9TeXN0ZW1TY3JpcHRzXCIpO1xuXG5leHBvcnQgY2xhc3MgQ3VzdG9tU2NyaXB0IHtcbiAgcHJpdmF0ZSBbVEFSR0VUX1NDT1BFXTogYW55O1xuICBwcml2YXRlIFtOQU1FXTogc3RyaW5nO1xuICBwcml2YXRlIFtGSUxFXTogQWJzb2x1dGVQYXRoO1xuICBwcml2YXRlIFtJTlBVVF06IEFic29sdXRlUGF0aCB8IG51bGw7XG4gIHByaXZhdGUgW09VVFBVVF06IEFic29sdXRlUGF0aDtcbiAgcHJpdmF0ZSBbUEFSQU1TXTogb2JqZWN0O1xuICBwcml2YXRlIFtQUk9QRVJUSUVTXTogYW55O1xuXG4gIHByaXZhdGUgY29uc3RydWN0b3Ioc2NvcGU6IGFueSwgbmFtZTogc3RyaW5nLCBwYXJhbXM6IGFueSkge1xuICAgIHRoaXNbVEFSR0VUX1NDT1BFXSA9IHNjb3BlO1xuICAgIHRoaXNbTkFNRV0gPSBlbnN1cmVTdHJpbmcobmFtZSk7XG4gIFxuICAgIGlmICghcGFyYW1zIHx8ICFwYXJhbXMuc2NyaXB0IHx8ICFwYXJhbXMub3V0cHV0KVxuICAgICAgdGhyb3cgbmV3IEVycm9yKGBVa25vd24gcGFyYW1zICR7SlNPTi5zdHJpbmdpZnkocGFyYW1zKX1gKTtcbiAgXG4gICAgaWYgKC9bLlxcL1xcXFxdLy50ZXN0KHBhcmFtcy5zY3JpcHQpKVxuICAgICAgdGhpc1tGSUxFXSA9IHNjb3BlLlNPVVJDRV9ESVIucmVzb2x2ZShwYXJhbXMuc2NyaXB0KTtcbiAgICBlbHNlXG4gICAgICB0aGlzW0ZJTEVdID0gU1lTVEVNX1NDUklQVFNfRElSLmpvaW4ocGFyYW1zLnNjcmlwdCArIFwiLmpzXCIpO1xuICBcbiAgICB0aGlzW0lOUFVUXSA9IHBhcmFtcy5pbnB1dCB8fCBudWxsO1xuICAgIHRoaXNbT1VUUFVUXSA9IHBhcmFtcy5vdXRwdXQ7XG4gICAgdGhpc1tQQVJBTVNdID0gcGFyYW1zO1xuICAgIHRoaXNbUFJPUEVSVElFU10gPSB7fTtcbiAgfVxuXG4gIHB1YmxpYyBzdGF0aWMgY3JlYXRlKHNjb3BlOiBhbnksIG5hbWU6IHN0cmluZywgcGFyYW1zOiBhbnkpIHtcbiAgICByZXR1cm4gT2JqZWN0LnNlYWwobmV3IEN1c3RvbVNjcmlwdChzY29wZSwgbmFtZSwgcGFyYW1zKSk7XG4gIH1cblxuICBwdWJsaWMgYWRkUHJvcGVydHkoa2V5OiBzdHJpbmcsIC4uLnZhbHM6IGFueVtdKSB7XG4gICAgbGV0IHByb3BlcnR5ID0gdGhpc1tQUk9QRVJUSUVTXVtrZXldO1xuICAgIGlmICghcHJvcGVydHkpIHtcbiAgICAgIHByb3BlcnR5ID0gW107XG4gICAgICB0aGlzW1BST1BFUlRJRVNdW2tleV0gPSBwcm9wZXJ0eTtcbiAgICB9XG4gICAgdmFscy5mb3JFYWNoKHYgPT4gcHJvcGVydHkucHVzaCh2KSk7XG4gIH1cblxuICBwdWJsaWMgZ2V0IE5BTUUoKTogc3RyaW5nIHtcbiAgICByZXR1cm4gdGhpc1tOQU1FXTtcbiAgfVxuXG4gIHB1YmxpYyBnZXQgVEFSR0VUX1NDT1BFKCk6IGFueSB7XG4gICAgcmV0dXJuIHRoaXNbVEFSR0VUX1NDT1BFXTtcbiAgfVxuXG4gIHB1YmxpYyBnZXQgRklMRSgpOiBBYnNvbHV0ZVBhdGgge1xuICAgIHJldHVybiB0aGlzW0ZJTEVdO1xuICB9XG5cbiAgcHVibGljIGdldCBJTlBVVCgpOiBBYnNvbHV0ZVBhdGggfCBudWxsIHtcbiAgICByZXR1cm4gdGhpc1tJTlBVVF07XG4gIH1cblxuICBwdWJsaWMgc2V0IElOUFVUKHZhbHVlOiBBYnNvbHV0ZVBhdGggfCBzdHJpbmcpIHtcbiAgICB0aGlzW0lOUFVUXSA9IHRoaXNbVEFSR0VUX1NDT1BFXS5TT1VSQ0VfRElSLnJlc29sdmUodmFsdWUpO1xuICB9XG5cbiAgcHVibGljIGdldCBPVVRQVVQoKTogQWJzb2x1dGVQYXRoIHtcbiAgICByZXR1cm4gdGhpc1tPVVRQVVRdO1xuICB9XG5cbiAgcHVibGljIHNldCBPVVRQVVQodmFsdWU6IEFic29sdXRlUGF0aCB8IHN0cmluZykge1xuICAgIHRoaXNbT1VUUFVUXSA9IEFic29sdXRlUGF0aC5jcmVhdGUodmFsdWUpO1xuICB9XG5cbiAgcHVibGljIGdldCBQQVJBTVMoKTogb2JqZWN0IHtcbiAgICByZXR1cm4gdGhpc1tQQVJBTVNdO1xuICB9XG5cbiAgcHVibGljIHNldCBQQVJBTVModmFsdWU6IG9iamVjdCkge1xuICAgIHRoaXNbUEFSQU1TXSA9IHZhbHVlO1xuICB9XG5cbiAgcHVibGljIGdldCBQUk9QRVJUSUVTKCkge1xuICAgIHJldHVybiB0aGlzW1BST1BFUlRJRVNdO1xuICB9XG5cbiAgcHVibGljIHRvU3RyaW5nKCk6IHN0cmluZyB7XG4gICAgcmV0dXJuIHRoaXNbTkFNRV0udG9TdHJpbmcoKTtcbiAgfVxuXG4gIHB1YmxpYyB0b0pTT04oKTogb2JqZWN0IHtcbiAgICByZXR1cm4ge1xuICAgICAgTkFNRTogdGhpcy5OQU1FLFxuICAgICAgVEFSR0VUX1NDT1BFOiB0aGlzLlRBUkdFVF9TQ09QRSxcbiAgICAgIEZJTEU6IHRoaXMuRklMRSxcbiAgICAgIElOUFVUOiB0aGlzLklOUFVULFxuICAgICAgT1VUUFVUOiB0aGlzLk9VVFBVVCxcbiAgICAgIFBBUkFNUzogdGhpcy5QQVJBTVMsXG4gICAgICBQUk9QRVJUSUVTOiB0aGlzLlBST1BFUlRJRVMsXG4gICAgfVxuICB9XG59O1xuIiwiLypcbiAqIE1JVCBMaWNlbnNlXG4gKlxuICogQ29weXJpZ2h0IChjKSAyMDI1ICBZdXJpaSBZYWt1YmluICh5dXJpaS55YWt1YmluQGdtYWlsLmNvbSlcbiAqXG4gKiBQZXJtaXNzaW9uIGlzIGdyYW50ZWQgdG8gdXNlLCBjb3B5LCBtb2RpZnksIGFuZCBkaXN0cmlidXRlIHRoaXMgc29mdHdhcmVcbiAqIHVuZGVyIHRoZSBNSVQgTGljZW5zZS4gU2VlIExJQ0VOU0UgZmlsZSBmb3IgZGV0YWlscy5cbiAqL1xuXG5pbXBvcnQgcGF0aCBmcm9tIFwibm9kZTpwYXRoXCI7XG5pbXBvcnQgZnMgZnJvbSBcIm5vZGU6ZnNcIjtcbmltcG9ydCB7IHNwYXduU3luYyB9IGZyb20gXCJub2RlOmNoaWxkX3Byb2Nlc3NcIjtcblxuaW1wb3J0IHsgaW1wb3J0TW9kdWxlIH0gZnJvbSBcIkAvdXRpbHMvTW9kdWxlXCI7XG5cbmltcG9ydCBjb25maWd1cmVfZmlsZSBmcm9tIFwiQC9iaXRtYWtlL1N5c3RlbVNjcmlwdHMvY29uZmlndXJlX2ZpbGUuanNcIjtcbmltcG9ydCBpbnN0YWxsX3NjcmlwdCBmcm9tIFwiQC9iaXRtYWtlL1N5c3RlbVNjcmlwdHMvaW5zdGFsbF9zY3JpcHQuanNcIjtcblxuY29uc3QgRU5UUklFUyA9IFN5bWJvbChcIkVOVFJJRVNcIik7XG5cbmVudW0gR29hbFR5cGUge1xuICBTQ1JJUFQgPSBcInNjcmlwdFwiLFxuICBFWEVDID0gXCJleGVjXCIsXG4gIFRBUkdFVCA9IFwidGFyZ2V0XCIsXG59O1xuXG5pbnRlcmZhY2UgQmFzZUdvYWwge1xuICBuYW1lOiBzdHJpbmc7XG4gIHR5cGU6IEdvYWxUeXBlO1xuICBkZXBlbmRzOiBBcnJheTxzdHJpbmc+O1xuICBtc2c6IHN0cmluZztcbiAgb3V0cHV0OiBzdHJpbmc7XG59O1xuXG5pbnRlcmZhY2UgU2NyaXB0R29hbCBleHRlbmRzIEJhc2VHb2FsIHtcbiAgc2NyaXB0OiBzdHJpbmc7XG4gIHBhcmFtczogYW55O1xufTtcblxuaW50ZXJmYWNlIEV4ZWNHb2FsIGV4dGVuZHMgQmFzZUdvYWwge1xuICBjb21tYW5kOiBzdHJpbmc7XG4gIGFyZ3M6IEFycmF5PHN0cmluZz47XG4gIGN3ZDogc3RyaW5nO1xufTtcblxuZXhwb3J0IGNsYXNzIEdvYWxDb2xsZWN0aW9uIHtcbiAgcHJpdmF0ZSBbRU5UUklFU106IEFycmF5PEJhc2VHb2FsPjtcblxuICBwcml2YXRlIGNvbnN0cnVjdG9yKCkge1xuICAgIHRoaXNbRU5UUklFU10gPSBuZXcgQXJyYXk8QmFzZUdvYWw+O1xuICB9XG5cbiAgcHVibGljIGdldCBFTlRSSUVTKCkge1xuICAgIHJldHVybiB0aGlzW0VOVFJJRVNdO1xuICB9XG5cbiAgcHVibGljIHN0YXRpYyBjcmVhdGUoKSB7XG4gICAgcmV0dXJuIE9iamVjdC5zZWFsKG5ldyBHb2FsQ29sbGVjdGlvbik7XG4gIH1cblxuICBwdWJsaWMgZmluZFNjcmlwdEJ5T3V0cHV0KG91dHB1dDogc3RyaW5nKTogQmFzZUdvYWwgfCB1bmRlZmluZWQge1xuICAgIGlmICghb3V0cHV0KVxuICAgICAgcmV0dXJuIHVuZGVmaW5lZDtcbiAgICByZXR1cm4gdGhpc1tFTlRSSUVTXS5maW5kKChpKSA9PiBpLnR5cGUgPT09IEdvYWxUeXBlLlNDUklQVCAmJiBpLm91dHB1dCA9PT0gb3V0cHV0KTtcbiAgfVxuXG4gIHB1YmxpYyBoYXNTY3JpcHRCeU91dHB1dChvdXRwdXQ6IHN0cmluZyk6IGJvb2xlYW4ge1xuICAgIHJldHVybiAhIXRoaXMuZmluZFNjcmlwdEJ5T3V0cHV0KG91dHB1dCk7XG4gIH1cblxuICBwdWJsaWMgYWRkU2NyaXB0KHNjcmlwdDogc3RyaW5nLCBuYW1lOiBzdHJpbmcsIGRlcGVuZHM6IEFycmF5PHN0cmluZz4sIG91dHB1dDogc3RyaW5nLCBwYXJhbXM6IGFueSwgbXNnOiBzdHJpbmcpIHtcbiAgICBpZiAodGhpcy5oYXNTY3JpcHRCeU91dHB1dChvdXRwdXQudG9TdHJpbmcoKSkpXG4gICAgICB0aHJvdyBuZXcgRXJyb3IoYE91dHB1dCBcIiR7b3V0cHV0fVwiIGV4aXN0c2ApO1xuICAgIHRoaXNbRU5UUklFU10ucHVzaCh7IG5hbWUsIHR5cGU6IEdvYWxUeXBlLlNDUklQVCwgc2NyaXB0LCBvdXRwdXQsIGRlcGVuZHMsIHBhcmFtcywgbXNnIH0gYXMgU2NyaXB0R29hbCk7XG4gIH1cblxuICBwdWJsaWMgYWRkRXhlYyhvdXRwdXQ6IHN0cmluZywgZGVwZW5kczogQXJyYXk8c3RyaW5nPiwgY29tbWFuZDogc3RyaW5nLCBhcmdzOiBBcnJheTxzdHJpbmc+LCBjd2Q6IHN0cmluZywgbXNnOiBzdHJpbmcpIHtcbiAgICB0aGlzW0VOVFJJRVNdLnB1c2goeyBuYW1lOiBcIlwiLCB0eXBlOiBHb2FsVHlwZS5FWEVDLCBkZXBlbmRzLCBvdXRwdXQsIGNvbW1hbmQsIGFyZ3MsIGN3ZCwgbXNnIH0gYXMgRXhlY0dvYWwpO1xuICB9XG5cbiAgcHVibGljIGFkZFRhcmdldChuYW1lOiBzdHJpbmcsIGRlcGVuZHM6IEFycmF5PHN0cmluZz4sIG1zZzogc3RyaW5nKSB7XG4gICAgdGhpc1tFTlRSSUVTXS5wdXNoKHsgbmFtZSwgdHlwZTogR29hbFR5cGUuVEFSR0VULCBkZXBlbmRzLCBtc2csIG91dHB1dDogXCJcIiB9KTtcbiAgfVxuXG4gIHB1YmxpYyBnZXRUYXJnZXQobmFtZTogc3RyaW5nKTogQmFzZUdvYWwgfCB1bmRlZmluZWQge1xuICAgIHJldHVybiB0aGlzW0VOVFJJRVNdLmZpbmQoKGkpID0+IGkudHlwZSA9PT0gR29hbFR5cGUuVEFSR0VUICYmIGkubmFtZSA9PT0gbmFtZSk7XG4gIH1cblxuICBwcml2YXRlIGFkZFRhcmdldExpc3RJbXBsKG5hbWU6IHN0cmluZywgcmVzdWx0OiBBcnJheTxCYXNlR29hbD4pIHtcbiAgICBpZiAocmVzdWx0LmZpbmQoaSA9PiBpLm5hbWUgPT09IG5hbWUgfHwgaS5vdXRwdXQgPT09IG5hbWUpKSB7XG4gICAgICByZXR1cm47XG4gICAgfVxuICBcbiAgICBjb25zdCBnb2FsID0gdGhpc1tFTlRSSUVTXS5maW5kKGkgPT4gaS5uYW1lID09PSBuYW1lIHx8IGkub3V0cHV0ID09PSBuYW1lKTtcbiAgICBpZiAoIWdvYWwpIHtcbiAgICAgIHJldHVybjtcbiAgICB9XG4gIFxuICAgIGZvciAoY29uc3QgaXRlciBvZiBnb2FsLmRlcGVuZHMpIHtcbiAgICAgIHRoaXMuYWRkVGFyZ2V0TGlzdEltcGwoaXRlci50b1N0cmluZygpLCByZXN1bHQpO1xuICAgIH1cbiAgXG4gICAgcmVzdWx0LnB1c2goZ29hbCk7XG4gIH1cbiAgXG4gIHB1YmxpYyBnZXRUYXJnZXRMaXN0KG5hbWU6c3RyaW5nKSB7XG4gICAgY29uc3QgcmVzdWx0ID0gbmV3IEFycmF5PEJhc2VHb2FsPjtcbiAgICB0aGlzLmFkZFRhcmdldExpc3RJbXBsKG5hbWUsIHJlc3VsdCk7XG4gICAgcmV0dXJuIHJlc3VsdDtcbiAgfVxuICBcbiAgcHVibGljIHRvSlNPTigpIHtcbiAgICByZXR1cm4gdGhpc1tFTlRSSUVTXTtcbiAgfVxuXG4gIHB1YmxpYyBzdGF0aWMgYXN5bmMgYnVpbGRHb2Fscyhjb2xsZWN0aW9uOiBBcnJheTxCYXNlR29hbD4pIHtcbiAgICBsZXQgbXNnQ291bnQgPSAwO1xuICAgIGZvciAoY29uc3QgaXRlciBvZiBjb2xsZWN0aW9uKVxuICAgICAgbXNnQ291bnQgKz0gaXRlci5tc2cgPyAxIDogMDtcbiAgXG4gICAgbGV0IG1zZ0luZGV4ID0gMDtcbiAgICBmb3IgKGNvbnN0IGdvYWwgb2YgY29sbGVjdGlvbikge1xuICAgICAgY29uc3QgeyB0eXBlLCBtc2cgfSA9IGdvYWw7XG4gICAgICBpZiAobXNnKSB7XG4gICAgICAgIGNvbnN0IHJlbGF0aW9uT2ZMZW5ndGggPSBNYXRoLnJvdW5kKCgrK21zZ0luZGV4IC8gbXNnQ291bnQpICogMTAwKTtcbiAgICAgICAgY29uc3QgcGVyY2VudCA9IFwiW1wiICsgcmVsYXRpb25PZkxlbmd0aC50b1N0cmluZygpLnBhZFN0YXJ0KDMsIFwiIFwiKSArIFwiJV0gXCI7XG4gICAgICAgIGNvbnNvbGUuaW5mbyhwZXJjZW50ICsgbXNnKTtcbiAgICAgIH1cbiAgICAgIGlmICh0eXBlID09PSBHb2FsVHlwZS5TQ1JJUFQpIHtcbiAgICAgICAgY29uc3QgeyBzY3JpcHQsIHBhcmFtcyB9ID0gZ29hbCBhcyBTY3JpcHRHb2FsO1xuICAgICAgICBsZXQgbW9kdWxlO1xuICAgICAgICBpZiAoc2NyaXB0LnRvU3RyaW5nKCkgPT09IHBhdGgucG9zaXguam9pbihfX2Rpcm5hbWUsIFwiU3lzdGVtU2NyaXB0cy9jb25maWd1cmVfZmlsZS5qc1wiKSlcbiAgICAgICAgICBtb2R1bGUgPSBjb25maWd1cmVfZmlsZTtcbiAgICAgICAgZWxzZSBpZiAoc2NyaXB0LnRvU3RyaW5nKCkgPT09IHBhdGgucG9zaXguam9pbihfX2Rpcm5hbWUsIFwiU3lzdGVtU2NyaXB0cy9pbnN0YWxsX3NjcmlwdC5qc1wiKSlcbiAgICAgICAgICBtb2R1bGUgPSBpbnN0YWxsX3NjcmlwdDtcbiAgICAgICAgZWxzZVxuICAgICAgICAgIG1vZHVsZSA9IChhd2FpdCBpbXBvcnRNb2R1bGUoc2NyaXB0LnRvU3RyaW5nKCkpKS5kZWZhdWx0O1xuICAgICAgICBjb25zdCByZXN1bHQgPSBtb2R1bGUocGFyYW1zKTtcbiAgICAgICAgaWYgKHJlc3VsdCBpbnN0YW5jZW9mIFByb21pc2UpIHtcbiAgICAgICAgICBhd2FpdCByZXN1bHQ7XG4gICAgICAgIH1cbiAgICAgIH1cbiAgICAgIGVsc2UgaWYgKHR5cGUgPT09IEdvYWxUeXBlLkVYRUMpIHtcbiAgICAgICAgY29uc3QgeyBjb21tYW5kLCBhcmdzLCBjd2QsIG91dHB1dCB9ID0gZ29hbCBhcyBFeGVjR29hbDtcbiAgICAgICAgZnMubWtkaXJTeW5jKHBhdGgucG9zaXguZGlybmFtZShvdXRwdXQpLCB7IHJlY3Vyc2l2ZTogdHJ1ZSB9KTtcbiAgICAgICAgY29uc3QgcmVzdWx0ID0gc3Bhd25TeW5jKGNvbW1hbmQsIGFyZ3MsIHsgY3dkLCBlbmNvZGluZzogXCJ1dGYtOFwiIH0pO1xuICAgICAgICBpZiAocmVzdWx0LnN0YXR1cykge1xuICAgICAgICAgIGNvbnNvbGUuaW5mbyhcImNkIFwiICsgY3dkKTtcbiAgICAgICAgICBsZXQgY21kID0gYXJncy5qb2luKFwiIFwiKTtcbiAgICAgICAgICBjbWQgPSBjb21tYW5kICsgKGNtZCA/IFwiIFwiIDogXCJcIikgKyBjbWQ7XG4gICAgICAgICAgY29uc29sZS5pbmZvKGNtZCk7XG4gICAgICAgICAgY29uc29sZS5pbmZvKFwiXCIpO1xuICBcbiAgICAgICAgICBjb25zb2xlLmVycm9yKHJlc3VsdC5zdGRlcnIpO1xuICBcbiAgICAgICAgICB0aHJvdyBuZXcgRXJyb3IoXCJTdGF0dXMgXCIgKyByZXN1bHQuc3RhdHVzKTtcbiAgICAgICAgfVxuICAgICAgfVxuICAgICAgZWxzZSBpZiAodHlwZSA9PT0gR29hbFR5cGUuVEFSR0VUKSB7XG4gICAgICB9XG4gICAgfVxuICB9XG59O1xuIiwiLypcbiAqIE1JVCBMaWNlbnNlXG4gKlxuICogQ29weXJpZ2h0IChjKSAyMDI1ICBZdXJpaSBZYWt1YmluICh5dXJpaS55YWt1YmluQGdtYWlsLmNvbSlcbiAqXG4gKiBQZXJtaXNzaW9uIGlzIGdyYW50ZWQgdG8gdXNlLCBjb3B5LCBtb2RpZnksIGFuZCBkaXN0cmlidXRlIHRoaXMgc29mdHdhcmVcbiAqIHVuZGVyIHRoZSBNSVQgTGljZW5zZS4gU2VlIExJQ0VOU0UgZmlsZSBmb3IgZGV0YWlscy5cbiAqL1xuXG5jb25zdCBOQU1FID0gU3ltYm9sKFwiTkFNRVwiKTtcbmNvbnN0IFBBVEggPSBTeW1ib2woXCJQQVRIXCIpO1xuXG5leHBvcnQgY2xhc3MgSW5jbHVkZURpcmVjdG9yeSB7XG4gIHByaXZhdGUgW05BTUVdOiBhbnk7XG4gIHByaXZhdGUgW1BBVEhdOiBhbnk7XG5cbiAgcHJpdmF0ZSBjb25zdHJ1Y3RvcihkaXJuYW1lOiBhbnksIGJhc2VEaXI6IGFueSkge1xuICAgIHRoaXNbTkFNRV0gPSBkaXJuYW1lLnRvU3RyaW5nKCk7XG4gICAgdGhpc1tQQVRIXSA9IGJhc2VEaXIucmVzb2x2ZShkaXJuYW1lKTtcbiAgfVxuXG4gIHB1YmxpYyBzdGF0aWMgY3JlYXRlKGRpcm5hbWU6IGFueSwgYmFzZURpcjogYW55KSB7XG4gICAgcmV0dXJuIE9iamVjdC5zZWFsKG5ldyBJbmNsdWRlRGlyZWN0b3J5KGRpcm5hbWUsIGJhc2VEaXIpKTtcbiAgfVxuXG4gIGdldCBOQU1FKCkge1xuICAgIHJldHVybiB0aGlzW05BTUVdO1xuICB9XG5cbiAgZ2V0IFBBVEgoKSB7XG4gICAgcmV0dXJuIHRoaXNbUEFUSF07XG4gIH1cblxuICB0b1N0cmluZygpIHtcbiAgICByZXR1cm4gdGhpc1tQQVRIXS50b1N0cmluZygpO1xuICB9XG5cbiAgdG9KU09OKCk6IG9iamVjdCB7XG4gICAgcmV0dXJuIHtcbiAgICAgIE5BTUU6IHRoaXMuTkFNRSxcbiAgICAgIFBBVEg6IHRoaXMuUEFUSCxcbiAgICB9XG4gIH1cbn07XG4iLCIvKlxuICogTUlUIExpY2Vuc2VcbiAqXG4gKiBDb3B5cmlnaHQgKGMpIDIwMjUgIFl1cmlpIFlha3ViaW4gKHl1cmlpLnlha3ViaW5AZ21haWwuY29tKVxuICpcbiAqIFBlcm1pc3Npb24gaXMgZ3JhbnRlZCB0byB1c2UsIGNvcHksIG1vZGlmeSwgYW5kIGRpc3RyaWJ1dGUgdGhpcyBzb2Z0d2FyZVxuICogdW5kZXIgdGhlIE1JVCBMaWNlbnNlLiBTZWUgTElDRU5TRSBmaWxlIGZvciBkZXRhaWxzLlxuICovXG5cbmltcG9ydCB7IEludGVyZmFjZVRhcmdldCB9IGZyb20gXCJAL2NvcmUvSW50ZXJmYWNlVGFyZ2V0XCI7XG5pbXBvcnQgeyBBYnNvbHV0ZVBhdGggfSBmcm9tIFwiQC9jb3JlL1BhdGhcIjtcblxuY29uc3QgVkFMVUUgICAgICAgPSBTeW1ib2woXCJWQUxVRVwiKTtcbmNvbnN0IERFU1RJTkFUSU9OID0gU3ltYm9sKFwiREVTVElOQVRJT05cIik7XG5jb25zdCBCQVNFX0RJUiAgICA9IFN5bWJvbChcIkJBU0VfRElSXCIpO1xuXG5leHBvcnQgY2xhc3MgSW5zdGFsbEVudGl0eSB7XG4gIHByaXZhdGUgW1ZBTFVFXTogQWJzb2x1dGVQYXRoIHwgSW50ZXJmYWNlVGFyZ2V0O1xuICBwcml2YXRlIFtERVNUSU5BVElPTl06IEFic29sdXRlUGF0aDtcbiAgcHJpdmF0ZSBbQkFTRV9ESVJdOiBBYnNvbHV0ZVBhdGggfCBudWxsO1xuXG4gIHByaXZhdGUgY29uc3RydWN0b3Ioc2NvcGU6IGFueSwgdmFsdWU6IHN0cmluZyB8IEFic29sdXRlUGF0aCB8IEludGVyZmFjZVRhcmdldCwgcGFyYW1zOiBzdHJpbmcgfCBhbnkpIHtcbiAgICBsZXQgZGVzdGluYXRpb246IHN0cmluZ3xBYnNvbHV0ZVBhdGh8dW5kZWZpbmVkO1xuICAgIGxldCBiYXNlRGlyO1xuICAgIGlmICh0eXBlb2YgcGFyYW1zID09PSBcInN0cmluZ1wiKVxuICAgICAgZGVzdGluYXRpb24gPSBwYXJhbXM7XG4gICAgZWxzZSBpZiAocGFyYW1zKSB7XG4gICAgICBkZXN0aW5hdGlvbiA9IHBhcmFtcy5kZXN0aW5hdGlvbjtcbiAgICAgIGJhc2VEaXIgPSBwYXJhbXMuYmFzZURpcjtcbiAgICB9XG4gIFxuICAgIGlmICghZGVzdGluYXRpb24pXG4gICAgICB0aHJvdyBuZXcgRXJyb3IoYFBhcmFtZXRlciBkZXN0aW5hdGlvbiBpcyBub3Qgc3BlY2lmaWVkYCk7XG4gIFxuICAgIGlmIChiYXNlRGlyKVxuICAgICAgYmFzZURpciA9IHNjb3BlLlNPVVJDRV9ESVIucmVzb2x2ZShiYXNlRGlyKTtcbiAgXG4gICAgaWYgKHR5cGVvZiB2YWx1ZSA9PT0gXCJzdHJpbmdcIiB8fCB2YWx1ZSBpbnN0YW5jZW9mIEFic29sdXRlUGF0aCkge1xuICAgICAgdmFsdWUgPSBzY29wZS5TT1VSQ0VfRElSLnJlc29sdmUodmFsdWUudG9TdHJpbmcoKSkgYXMgQWJzb2x1dGVQYXRoO1xuICAgICAgdmFsdWUgPSBBYnNvbHV0ZVBhdGguY3JlYXRlRmlsZSh2YWx1ZSk7XG4gICAgICBiYXNlRGlyID0gYmFzZURpciB8fCB2YWx1ZS5kaXJuYW1lKCk7XG4gICAgfVxuICAgIGVsc2UgaWYgKCEodmFsdWUgaW5zdGFuY2VvZiBJbnRlcmZhY2VUYXJnZXQpKSB7XG4gICAgICB0aHJvdyBuZXcgRXJyb3IoYE5vdCBzdXBwb3J0ZXQgdmFsdWUgb2YgJHt2YWx1ZX1gKTtcbiAgICB9XG4gIFxuICAgIHRoaXNbVkFMVUVdID0gdmFsdWU7XG4gICAgdGhpc1tERVNUSU5BVElPTl0gPSBBYnNvbHV0ZVBhdGguY3JlYXRlRGlyKHNjb3BlLklOU1RBTExfUFJFRklYLnJlc29sdmUoZGVzdGluYXRpb24udG9TdHJpbmcoKSkudG9TdHJpbmcoKSk7XG4gICAgdGhpc1tCQVNFX0RJUl0gPSBiYXNlRGlyID8gQWJzb2x1dGVQYXRoLmNyZWF0ZURpcihiYXNlRGlyLnRvU3RyaW5nKCkpIDogbnVsbDtcbiAgfVxuICBcbiAgcHVibGljIHN0YXRpYyBjcmVhdGUoc2NvcGU6IGFueSwgdmFsdWU6IHN0cmluZyB8IEFic29sdXRlUGF0aCB8IEludGVyZmFjZVRhcmdldCwgcGFyYW1zOiBzdHJpbmcgfCBhbnkpIHtcbiAgICByZXR1cm4gT2JqZWN0LnNlYWwobmV3IEluc3RhbGxFbnRpdHkoc2NvcGUsIHZhbHVlLCBwYXJhbXMpKTtcbiAgfVxuXG4gIHB1YmxpYyBnZXQgVkFMVUUgKCkge1xuICAgIHJldHVybiB0aGlzW1ZBTFVFXTtcbiAgfVxuXG4gIHB1YmxpYyBnZXQgREVTVElOQVRJT04gKCkge1xuICAgIHJldHVybiB0aGlzW0RFU1RJTkFUSU9OXTtcbiAgfVxuXG4gIHB1YmxpYyBnZXQgQkFTRV9ESVIgKCkge1xuICAgIHJldHVybiB0aGlzW0JBU0VfRElSXTtcbiAgfVxuXG4gIHB1YmxpYyB0b0pTT04oKTogb2JqZWN0IHtcbiAgICByZXR1cm4ge1xuICAgICAgVkFMVUU6IHRoaXMuVkFMVUUsXG4gICAgICBERVNUSU5BVElPTjogdGhpcy5ERVNUSU5BVElPTixcbiAgICAgIEJBU0VfRElSOiB0aGlzLkJBU0VfRElSLFxuICAgIH07XG4gIH1cbn07XG4iLCIvKlxuICogTUlUIExpY2Vuc2VcbiAqXG4gKiBDb3B5cmlnaHQgKGMpIDIwMjUgIFl1cmlpIFlha3ViaW4gKHl1cmlpLnlha3ViaW5AZ21haWwuY29tKVxuICpcbiAqIFBlcm1pc3Npb24gaXMgZ3JhbnRlZCB0byB1c2UsIGNvcHksIG1vZGlmeSwgYW5kIGRpc3RyaWJ1dGUgdGhpcyBzb2Z0d2FyZVxuICogdW5kZXIgdGhlIE1JVCBMaWNlbnNlLiBTZWUgTElDRU5TRSBmaWxlIGZvciBkZXRhaWxzLlxuICovXG5cbmNvbnN0IE5BTUUgPSBTeW1ib2woXCJOQU1FXCIpO1xuXG5leHBvcnQgY2xhc3MgSW50ZXJmYWNlSW5jbHVkZXMge1xuICBwcml2YXRlIFtOQU1FXTogc3RyaW5nO1xuXG4gIHByaXZhdGUgY29uc3RydWN0b3IobmFtZTogc3RyaW5nKSB7XG4gICAgdGhpc1tOQU1FXSA9IG5hbWU7XG4gIH1cblxuICBwdWJsaWMgZ2V0IHRhcmdldE5hbWUoKSB7XG4gICAgcmV0dXJuIHRoaXNbTkFNRV07XG4gIH1cblxuICBwdWJsaWMgdG9TdHJpbmcoKTogc3RyaW5nIHtcbiAgICByZXR1cm4gXCIke1wiICsgdGhpc1tOQU1FXSArIFwiLmluY2x1ZGVzfVwiO1xuICB9XG5cbiAgcHVibGljIHRvSlNPTigpIHtcbiAgICByZXR1cm4gdGhpcy50b1N0cmluZygpO1xuICB9XG5cbiAgcHVibGljIHN0YXRpYyBjcmVhdGUobmFtZTogc3RyaW5nKSB7XG4gICAgcmV0dXJuIE9iamVjdC5zZWFsKG5ldyBJbnRlcmZhY2VJbmNsdWRlcyhuYW1lKSk7XG4gIH1cblxuICBwdWJsaWMgc3RhdGljIGVuc3VyZUluc3RhbmNlKHZhbHVlOiBhbnkpIHtcbiAgICBpZiAodmFsdWUgaW5zdGFuY2VvZiBJbnRlcmZhY2VJbmNsdWRlcylcbiAgICAgIHJldHVybiB2YWx1ZTtcbiAgICB0aHJvdyBuZXcgRXJyb3IoYFRoZSAnJHt2YWx1ZX0nIGlzIG5vdCBhIEludGVyZmFjZUluY2x1ZGVzYCk7XG4gIH1cbn07XG4iLCIvKlxuICogTUlUIExpY2Vuc2VcbiAqXG4gKiBDb3B5cmlnaHQgKGMpIDIwMjUgIFl1cmlpIFlha3ViaW4gKHl1cmlpLnlha3ViaW5AZ21haWwuY29tKVxuICpcbiAqIFBlcm1pc3Npb24gaXMgZ3JhbnRlZCB0byB1c2UsIGNvcHksIG1vZGlmeSwgYW5kIGRpc3RyaWJ1dGUgdGhpcyBzb2Z0d2FyZVxuICogdW5kZXIgdGhlIE1JVCBMaWNlbnNlLiBTZWUgTElDRU5TRSBmaWxlIGZvciBkZXRhaWxzLlxuICovXG5cbmNvbnN0IE5BTUUgPSBTeW1ib2woXCJOQU1FXCIpO1xuXG5leHBvcnQgY2xhc3MgSW50ZXJmYWNlT2JqZWN0cyB7XG4gIHByaXZhdGUgW05BTUVdOiBzdHJpbmc7XG5cbiAgcHJpdmF0ZSBjb25zdHJ1Y3RvcihuYW1lOiBzdHJpbmcpIHtcbiAgICB0aGlzW05BTUVdID0gbmFtZTtcbiAgfVxuXG4gIHB1YmxpYyBzdGF0aWMgY3JlYXRlKG5hbWU6IHN0cmluZykge1xuICAgIHJldHVybiBPYmplY3Quc2VhbChuZXcgSW50ZXJmYWNlT2JqZWN0cyhuYW1lKSk7XG4gIH1cblxuICBwdWJsaWMgc3RhdGljIGVuc3VyZUluc3RhbmNlKHZhbHVlOiBhbnkpOiBJbnRlcmZhY2VPYmplY3RzIHtcbiAgICBpZiAodmFsdWUgaW5zdGFuY2VvZiBJbnRlcmZhY2VPYmplY3RzKVxuICAgICAgcmV0dXJuIHZhbHVlO1xuICAgIHRocm93IG5ldyBFcnJvcihgVGhlICcke3ZhbHVlfScgaXMgbm90IGEgSW50ZXJmYWNlT2JqZWN0c2ApO1xuICB9XG5cbiAgcHVibGljIGdldCB0YXJnZXROYW1lKCk6IHN0cmluZyB7XG4gICAgcmV0dXJuIHRoaXNbTkFNRV07XG4gIH1cblxuICBwdWJsaWMgdG9TdHJpbmcoKTogc3RyaW5nIHtcbiAgICByZXR1cm4gXCIke1wiICsgdGhpc1tOQU1FXSArIFwiLm9iamVjdHN9XCI7XG4gIH1cblxuICBwdWJsaWMgdG9KU09OKCk6IHN0cmluZyB7XG4gICAgcmV0dXJuIHRoaXMudG9TdHJpbmcoKTtcbiAgfVxufTtcbiIsIi8qXG4gKiBNSVQgTGljZW5zZVxuICpcbiAqIENvcHlyaWdodCAoYykgMjAyNSAgWXVyaWkgWWFrdWJpbiAoeXVyaWkueWFrdWJpbkBnbWFpbC5jb20pXG4gKlxuICogUGVybWlzc2lvbiBpcyBncmFudGVkIHRvIHVzZSwgY29weSwgbW9kaWZ5LCBhbmQgZGlzdHJpYnV0ZSB0aGlzIHNvZnR3YXJlXG4gKiB1bmRlciB0aGUgTUlUIExpY2Vuc2UuIFNlZSBMSUNFTlNFIGZpbGUgZm9yIGRldGFpbHMuXG4gKi9cblxuY29uc3QgTkFNRSAgICAgICA9IFN5bWJvbChcIk5BTUVcIik7XG5jb25zdCBQUk9QRVJUSUVTID0gU3ltYm9sKFwiUFJPUEVSVElFU1wiKTtcblxuZXhwb3J0IGNsYXNzIEludGVyZmFjZVNjcmlwdCB7XG4gIHByaXZhdGUgW05BTUVdOiBzdHJpbmc7XG4gIHByaXZhdGUgW1BST1BFUlRJRVNdOiBhbnk7XG5cbiAgcHJpdmF0ZSBjb25zdHJ1Y3RvcihuYW1lOiBzdHJpbmcpIHtcbiAgICB0aGlzW05BTUVdID0gbmFtZTtcbiAgICB0aGlzW1BST1BFUlRJRVNdID0ge307XG4gIH1cblxuICBwdWJsaWMgZ2V0IE5BTUUoKSB7XG4gICAgcmV0dXJuIHRoaXNbTkFNRV07XG4gIH1cblxuICBwdWJsaWMgZ2V0IFBST1BFUlRJRVMoKSB7XG4gICAgcmV0dXJuIHRoaXNbUFJPUEVSVElFU107XG4gIH1cbiAgXG4gIHB1YmxpYyBhZGRQcm9wZXJ0eShrZXk6IHN0cmluZywgLi4udmFsczogYW55W10pIHtcbiAgICBsZXQgcHJvcGVydHkgPSB0aGlzW1BST1BFUlRJRVNdW2tleV07XG4gICAgaWYgKCFwcm9wZXJ0eSkge1xuICAgICAgcHJvcGVydHkgPSBbXTtcbiAgICAgIHRoaXNbUFJPUEVSVElFU11ba2V5XSA9IHByb3BlcnR5O1xuICAgIH1cbiAgICB2YWxzLmZvckVhY2godiA9PiBwcm9wZXJ0eS5wdXNoKHYpKTtcbiAgfVxuXG4gIHB1YmxpYyB0b0pTT04oKTogb2JqZWN0IHtcbiAgICByZXR1cm4ge1xuICAgICAgTkFNRTogdGhpcy5OQU1FLFxuICAgICAgUFJPUEVSVElFUzogdGhpcy5QUk9QRVJUSUVTLFxuICAgIH07XG4gIH1cbiAgXG4gIHB1YmxpYyB0b1N0cmluZygpOiBzdHJpbmcge1xuICAgIHJldHVybiB0aGlzW05BTUVdO1xuICB9XG5cbiAgcHVibGljIHN0YXRpYyBjcmVhdGUobmFtZTogc3RyaW5nKSB7XG4gICAgcmV0dXJuIE9iamVjdC5zZWFsKG5ldyBJbnRlcmZhY2VTY3JpcHQobmFtZSkpO1xuICB9XG5cbiAgcHVibGljIHN0YXRpYyBlbnN1cmVJbnN0YW5jZSh2YWx1ZTogYW55KSB7XG4gICAgaWYgKHZhbHVlIGluc3RhbmNlb2YgSW50ZXJmYWNlU2NyaXB0KVxuICAgICAgcmV0dXJuIHZhbHVlO1xuICAgIHRocm93IG5ldyBFcnJvcihgVGhlICcke3ZhbHVlfScgaXMgbm90IGEgSW50ZXJmYWNlU2NyaXB0YCk7XG4gIH1cbn07XG4iLCIvKlxuICogTUlUIExpY2Vuc2VcbiAqXG4gKiBDb3B5cmlnaHQgKGMpIDIwMjUgIFl1cmlpIFlha3ViaW4gKHl1cmlpLnlha3ViaW5AZ21haWwuY29tKVxuICpcbiAqIFBlcm1pc3Npb24gaXMgZ3JhbnRlZCB0byB1c2UsIGNvcHksIG1vZGlmeSwgYW5kIGRpc3RyaWJ1dGUgdGhpcyBzb2Z0d2FyZVxuICogdW5kZXIgdGhlIE1JVCBMaWNlbnNlLiBTZWUgTElDRU5TRSBmaWxlIGZvciBkZXRhaWxzLlxuICovXG5cbmltcG9ydCB7IEFic29sdXRlUGF0aCB9IGZyb20gXCJAL2NvcmUvUGF0aFwiO1xuaW1wb3J0IHsgSW50ZXJmYWNlSW5jbHVkZXMgfSBmcm9tIFwiQC9jb3JlL0ludGVyZmFjZUluY2x1ZGVzXCI7XG5pbXBvcnQgeyBJbnRlcmZhY2VPYmplY3RzIH0gZnJvbSBcIkAvY29yZS9JbnRlcmZhY2VPYmplY3RzXCI7XG5pbXBvcnQgeyBJbmNsdWRlRGlyZWN0b3J5IH0gZnJvbSBcIkAvY29yZS9JbmNsdWRlRGlyZWN0b3J5XCI7XG5pbXBvcnQgeyBTb3VyY2VGaWxlIH0gZnJvbSBcIkAvY29yZS9Tb3VyY2VGaWxlXCI7XG5cbmNvbnN0IFVOS05PV05fVEFSR0VUID0gU3ltYm9sKFwiVU5LTk9XTl9UQVJHRVRcIik7XG5jb25zdCBTQ09QRSA9IFN5bWJvbChcIlNDT1BFXCIpO1xuXG5leHBvcnQgY2xhc3MgSW50ZXJmYWNlVGFyZ2V0IHtcbiAgcHJpdmF0ZSBbU0NPUEVdOiBhbnk7XG4gIHByaXZhdGUgW1VOS05PV05fVEFSR0VUXTogYW55O1xuXG4gIHByaXZhdGUgY29uc3RydWN0b3Ioc2NvcGU6IGFueSwgdXRhcmdldDogYW55KSB7XG4gICAgdGhpc1tTQ09QRV0gPSBzY29wZS5jbG9uZSgpO1xuICAgIHRoaXNbVU5LTk9XTl9UQVJHRVRdID0gdXRhcmdldDtcbiAgfVxuXG4gIHB1YmxpYyBzdGF0aWMgY3JlYXRlKHNjb3BlOiBhbnksIHV0YXJnZXQ6IGFueSkge1xuICAgIHJldHVybiBPYmplY3Quc2VhbChuZXcgSW50ZXJmYWNlVGFyZ2V0KHNjb3BlLCB1dGFyZ2V0KSk7XG4gIH1cblxuICBwdWJsaWMgc3RhdGljIGVuc3VyZUluc3RhbmNlKHZhbHVlOiBhbnkpIHtcbiAgICBpZiAodmFsdWUgaW5zdGFuY2VvZiBJbnRlcmZhY2VUYXJnZXQpXG4gICAgICByZXR1cm4gdmFsdWU7XG4gICAgdGhyb3cgbmV3IEVycm9yKGBUaGUgJyR7dmFsdWV9JyBpcyBub3QgYSBJbnRlcmZhY2VUYXJnZXRgKTtcbiAgfVxuXG4gIHB1YmxpYyBnZXQgdGFyZ2V0TmFtZSgpOiBzdHJpbmcge1xuICAgIHJldHVybiB0aGlzW1VOS05PV05fVEFSR0VUXS5OQU1FO1xuICB9XG5cbiAgcHVibGljIGdldCBpbmNsdWRlcygpOiBJbnRlcmZhY2VJbmNsdWRlcyB7XG4gICAgcmV0dXJuIEludGVyZmFjZUluY2x1ZGVzLmNyZWF0ZSh0aGlzLnRhcmdldE5hbWUpO1xuICB9XG5cbiAgcHVibGljIGdldCBvYmplY3RzKCk6IEludGVyZmFjZU9iamVjdHMge1xuICAgIHJldHVybiBJbnRlcmZhY2VPYmplY3RzLmNyZWF0ZSh0aGlzLnRhcmdldE5hbWUpO1xuICB9XG5cbiAgcHVibGljIHRvSlNPTigpOiBzdHJpbmcge1xuICAgIHJldHVybiB0aGlzLnRvU3RyaW5nKCk7XG4gIH1cblxuICBwdWJsaWMgdG9TdHJpbmcoKTogc3RyaW5nIHtcbiAgICByZXR1cm4gXCIke1wiICsgdGhpcy50YXJnZXROYW1lICsgXCJ9XCI7XG4gIH1cblxuICBwdWJsaWMgYWRkU291cmNlcyguLi5zb3VyY2VzOiBBcnJheTxJbnRlcmZhY2VPYmplY3RzfFNvdXJjZUZpbGV8QWJzb2x1dGVQYXRofHN0cmluZz4pOiB2b2lkIHtcbiAgICBmb3IgKGxldCBpdCBvZiBzb3VyY2VzLmZsYXQoMSkpIHtcbiAgICAgIGlmIChpdCBpbnN0YW5jZW9mIEludGVyZmFjZU9iamVjdHMgfHwgaXQgaW5zdGFuY2VvZiBTb3VyY2VGaWxlKVxuICAgICAgICB7fVxuICAgICAgZWxzZSBpZiAodHlwZW9mIGl0ID09PSBcInN0cmluZ1wiIHx8IEFic29sdXRlUGF0aC5pc0Fic29sdXRlKGl0KSlcbiAgICAgICAgaXQgPSBTb3VyY2VGaWxlLmNyZWF0ZSh0aGlzW1NDT1BFXSwgaXQpO1xuICAgICAgZWxzZVxuICAgICAgICB0aHJvdyBuZXcgRXJyb3IoYE5vdCBzdXBwb3J0IGluc3RhbmNlICR7aXR9YCk7XG4gICAgICB0aGlzW1VOS05PV05fVEFSR0VUXS5TT1VSQ0VTLnB1c2goaXQpO1xuICAgIH1cbiAgfVxuXG4gIHB1YmxpYyBhZGRJbmNsdWRlcyguLi5pbmNsdWRlczogQXJyYXk8SW50ZXJmYWNlSW5jbHVkZXN8QWJzb2x1dGVQYXRofHN0cmluZz4pOiB2b2lkIHtcbiAgICBmb3IgKGNvbnN0IGl0IG9mIGluY2x1ZGVzLmZsYXQoMSkpIHtcbiAgICAgIGxldCBWQUxVRTtcbiAgICAgIGlmIChpdCBpbnN0YW5jZW9mIEludGVyZmFjZUluY2x1ZGVzKVxuICAgICAgICBWQUxVRSA9IGl0O1xuICAgICAgZWxzZSBpZiAodHlwZW9mIGl0ID09PSBcInN0cmluZ1wiIHx8IEFic29sdXRlUGF0aC5pc0Fic29sdXRlKGl0KSlcbiAgICAgICAgVkFMVUUgPSBJbmNsdWRlRGlyZWN0b3J5LmNyZWF0ZShpdCwgdGhpc1tTQ09QRV0uU09VUkNFX0RJUik7XG4gICAgICBlbHNlXG4gICAgICAgIHRocm93IG5ldyBFcnJvcihgTm90IHN1cHBvcnQgaW5zdGFuY2UgJHtpdH1gKTtcbiAgICAgIHRoaXNbVU5LTk9XTl9UQVJHRVRdLklOQ0xVREVTLnB1c2goeyBWQUxVRSwgUFVCTElDX09OTFk6IGZhbHNlIH0pO1xuICAgIH1cbiAgfVxuXG4gIHB1YmxpYyBhZGRQdWJsaWNJbmNsdWRlcyguLi5pbmNsdWRlczogQXJyYXk8SW50ZXJmYWNlSW5jbHVkZXN8QWJzb2x1dGVQYXRofHN0cmluZz4pOiB2b2lkIHtcbiAgICBmb3IgKGNvbnN0IGl0IG9mIGluY2x1ZGVzLmZsYXQoMSkpIHtcbiAgICAgIGxldCBWQUxVRTtcbiAgICAgIGlmIChpdCBpbnN0YW5jZW9mIEludGVyZmFjZUluY2x1ZGVzKVxuICAgICAgICBWQUxVRSA9IGl0O1xuICAgICAgZWxzZSBpZiAodHlwZW9mIGl0ID09PSBcInN0cmluZ1wiIHx8IEFic29sdXRlUGF0aC5pc0Fic29sdXRlKGl0KSlcbiAgICAgICAgVkFMVUUgPSBJbmNsdWRlRGlyZWN0b3J5LmNyZWF0ZShpdCwgdGhpc1tTQ09QRV0uU09VUkNFX0RJUik7XG4gICAgICBlbHNlXG4gICAgICAgIHRocm93IG5ldyBFcnJvcihgTm90IHN1cHBvcnQgaW5zdGFuY2UgJHtpdH1gKTtcbiAgICAgIHRoaXNbVU5LTk9XTl9UQVJHRVRdLklOQ0xVREVTLnB1c2goeyBWQUxVRSwgUFVCTElDX09OTFk6IHRydWUgfSk7XG4gICAgfVxuICB9XG5cbiAgcHVibGljIGFkZERlZmluaXRpb25zKC4uLmRlZmluaXRpb25zOiBzdHJpbmdbXSk6IHZvaWQge1xuICAgIGZvciAoY29uc3QgVkFMVUUgb2YgZGVmaW5pdGlvbnMuZmxhdCgxKSlcbiAgICAgIHRoaXNbVU5LTk9XTl9UQVJHRVRdLkRFRklORVMucHVzaCh7IFZBTFVFIH0pO1xuICB9XG5cbiAgcHVibGljIGFkZFB1YmxpY0RlZmluaXRpb25zKC4uLmRlZmluaXRpb25zOiBzdHJpbmdbXSk6IHZvaWQge1xuICAgIGZvciAoY29uc3QgVkFMVUUgb2YgZGVmaW5pdGlvbnMuZmxhdCgxKSlcbiAgICAgIHRoaXNbVU5LTk9XTl9UQVJHRVRdLkRFRklORVMucHVzaCh7IFZBTFVFLCBQVUJMSUNfT05MWTogdHJ1ZSB9KTtcbiAgfVxuXG4gIHB1YmxpYyBhZGRDb21waWxlT3B0aW9ucyguLi5vcHRpb25zOiBzdHJpbmdbXSk6IHZvaWQge1xuICAgIGZvciAoY29uc3QgaXQgb2Ygb3B0aW9ucy5mbGF0KDEpKSB7XG4gICAgICB0aGlzW1VOS05PV05fVEFSR0VUXS5DT01QSUxFX09QVElPTlMucHVzaCh7IFZBTFVFOiBpdCB9KTtcbiAgICB9XG4gIH1cblxuICBwdWJsaWMgYWRkTGlua09wdGlvbnMoLi4ub3B0aW9uczogc3RyaW5nW10pOiB2b2lkIHtcbiAgICBmb3IgKGNvbnN0IGl0IG9mIG9wdGlvbnMuZmxhdCgxKSkge1xuICAgICAgdGhpc1tVTktOT1dOX1RBUkdFVF0uTElOS19PUFRJT05TLnB1c2goeyBWQUxVRTogaXQgfSk7XG4gICAgfVxuICB9XG5cbiAgcHVibGljIGFkZFB1YmxpY0NvbXBpbGVPcHRpb25zKC4uLm9wdGlvbnM6IHN0cmluZ1tdKTogdm9pZCB7XG4gICAgZm9yIChjb25zdCBpdCBvZiBvcHRpb25zLmZsYXQoMSkpIHtcbiAgICAgIHRoaXNbVU5LTk9XTl9UQVJHRVRdLkNPTVBJTEVfT1BUSU9OUy5wdXNoKHsgVkFMVUU6IGl0LCBQVUJMSUNfT05MWTogdHJ1ZSB9KTtcbiAgICB9XG4gIH1cblxuICBwdWJsaWMgYWRkUHVibGljTGlua09wdGlvbnMoLi4ub3B0aW9uczogc3RyaW5nW10pOiB2b2lkIHtcbiAgICBmb3IgKGNvbnN0IGl0IG9mIG9wdGlvbnMuZmxhdCgxKSkge1xuICAgICAgdGhpc1tVTktOT1dOX1RBUkdFVF0uTElOS19PUFRJT05TLnB1c2goeyBWQUxVRTogaXQsIFBVQkxJQ19PTkxZOiB0cnVlIH0pO1xuICAgIH1cbiAgfVxufTtcbiIsIi8qXG4gKiBNSVQgTGljZW5zZVxuICpcbiAqIENvcHlyaWdodCAoYykgMjAyNSAgWXVyaWkgWWFrdWJpbiAoeXVyaWkueWFrdWJpbkBnbWFpbC5jb20pXG4gKlxuICogUGVybWlzc2lvbiBpcyBncmFudGVkIHRvIHVzZSwgY29weSwgbW9kaWZ5LCBhbmQgZGlzdHJpYnV0ZSB0aGlzIHNvZnR3YXJlXG4gKiB1bmRlciB0aGUgTUlUIExpY2Vuc2UuIFNlZSBMSUNFTlNFIGZpbGUgZm9yIGRldGFpbHMuXG4gKi9cblxuaW1wb3J0IHBhdGggZnJvbSBcIm5vZGU6cGF0aFwiO1xuaW1wb3J0IHVybCBmcm9tIFwibm9kZTp1cmxcIjtcblxuY29uc3QgUEFUSCA9IFN5bWJvbChcIlBBVEhcIik7XG5cbmVudW0gUGF0aFR5cGUge1xuICBEaXJUeXBlLFxuICBGaWxlVHlwZSxcbn07XG5cbmNvbnN0IF9wYXRoTWFwID0gbmV3IE1hcDxzdHJpbmcsIFBhdGhUeXBlPigpO1xuXG5leHBvcnQgY2xhc3MgQWJzb2x1dGVQYXRoIHtcbiAgcHJpdmF0ZSBbUEFUSF06IHN0cmluZztcblxuICBwcml2YXRlIGNvbnN0cnVjdG9yKGZpbGVwYXRoOiBzdHJpbmcpIHtcbiAgICBpZiAoIXBhdGguaXNBYnNvbHV0ZShmaWxlcGF0aCkpXG4gICAgICB0aHJvdyBuZXcgRXJyb3IoYE5vdCBzdXBwb3J0ZWQgcmVsYXRpdmUgcGF0aCBvZiBcIiR7ZmlsZXBhdGh9XCJgKTtcbiAgICB0aGlzW1BBVEhdID0gZmlsZXBhdGg7XG4gIH1cblxuICBwdWJsaWMgam9pbiguLi5wYXRoczogQXJyYXk8QWJzb2x1dGVQYXRoIHwgc3RyaW5nPikge1xuICAgIGNvbnN0IGZpbGVwYXRoID0gcGF0aC5wb3NpeC5qb2luKHRoaXNbUEFUSF0sIC4uLnBhdGhzLm1hcChpID0+IGkudG9TdHJpbmcoKSkpO1xuICAgIHJldHVybiBBYnNvbHV0ZVBhdGguY3JlYXRlKGZpbGVwYXRoKTtcbiAgfVxuXG4gIHB1YmxpYyBkaXJuYW1lKCkge1xuICAgIHJldHVybiBBYnNvbHV0ZVBhdGguY3JlYXRlKHBhdGgucG9zaXguZGlybmFtZSh0aGlzW1BBVEhdKSk7XG4gIH1cblxuICBwdWJsaWMgYmFzZW5hbWUoKSB7XG4gICAgcmV0dXJuIHBhdGguYmFzZW5hbWUodGhpc1tQQVRIXSk7XG4gIH1cblxuICBwdWJsaWMgcmVsYXRpdmUodG86IEFic29sdXRlUGF0aCB8IHN0cmluZykge1xuICAgIHJldHVybiBwYXRoLnBvc2l4LnJlbGF0aXZlKHRoaXNbUEFUSF0sKHRvIGluc3RhbmNlb2YgQWJzb2x1dGVQYXRoKSA/IHRvW1BBVEhdIDogdG8pO1xuICB9XG5cbiAgcHVibGljIHJlc29sdmUoLi4ucGF0aHM6IEFycmF5PEFic29sdXRlUGF0aCB8IHN0cmluZz4pIHtcbiAgICByZXR1cm4gQWJzb2x1dGVQYXRoLmNyZWF0ZShwYXRoLnBvc2l4LnJlc29sdmUodGhpc1tQQVRIXSwgLi4ucGF0aHMubWFwKGkgPT4gaS50b1N0cmluZygpKSkpO1xuICB9XG5cbiAgcHVibGljIG1hdGNoKHJlZ2V4cDogUmVnRXhwKSB7XG4gICAgcmV0dXJuIHRoaXNbUEFUSF0ubWF0Y2gocmVnZXhwKTtcbiAgfVxuXG4gIHB1YmxpYyB0b1VSTCgpIHtcbiAgICByZXR1cm4gdXJsLnBhdGhUb0ZpbGVVUkwodGhpc1tQQVRIXSk7XG4gIH1cblxuICBwdWJsaWMgdG9VUkxTdHJpbmcoKSB7XG4gICAgcmV0dXJuIHRoaXMudG9VUkwoKS50b1N0cmluZygpO1xuICB9XG5cbiAgcHVibGljIHRvU3RyaW5nKCkge1xuICAgIHJldHVybiB0aGlzW1BBVEhdO1xuICB9XG5cbiAgcHVibGljIHZhbHVlT2YoKSB7XG4gICAgcmV0dXJuIHRoaXNbUEFUSF07XG4gIH1cblxuICBwdWJsaWMgdG9KU09OKCkge1xuICAgIHJldHVybiB0aGlzW1BBVEhdO1xuICB9XG5cbiAgcHVibGljIHN0YXRpYyBpc0Fic29sdXRlKGZpbGVwYXRoOiBBYnNvbHV0ZVBhdGggfCBzdHJpbmcpIHtcbiAgICBpZiAoZmlsZXBhdGggaW5zdGFuY2VvZiBBYnNvbHV0ZVBhdGgpXG4gICAgICByZXR1cm4gdHJ1ZTtcbiAgICByZXR1cm4gcGF0aC5pc0Fic29sdXRlKGZpbGVwYXRoKTtcbiAgfVxuXG4gIHB1YmxpYyBzdGF0aWMgY3JlYXRlKGZpbGVwYXRoOiBBYnNvbHV0ZVBhdGggfCBzdHJpbmcpIHtcbiAgICBpZiAoZmlsZXBhdGggaW5zdGFuY2VvZiBBYnNvbHV0ZVBhdGgpXG4gICAgICByZXR1cm4gZmlsZXBhdGg7XG4gICAgaWYgKHR5cGVvZiBmaWxlcGF0aCAhPT0gXCJzdHJpbmdcIilcbiAgICAgIHRocm93IG5ldyBFcnJvcihgTm90IGNvcnJlY3QgdHlwZSBvZiAke2ZpbGVwYXRofWApO1xuICAgIHJldHVybiBuZXcgQWJzb2x1dGVQYXRoKGZpbGVwYXRoKTtcbiAgfVxuXG4gIHB1YmxpYyBzdGF0aWMgZW5zdXJlSW5zdGFuY2UodmFsdWU6IGFueSk6IEFic29sdXRlUGF0aCB7XG4gICAgaWYgKHZhbHVlIGluc3RhbmNlb2YgQWJzb2x1dGVQYXRoKVxuICAgICAgcmV0dXJuIHZhbHVlO1xuICAgIHRocm93IG5ldyBFcnJvcihgVGhlICcke3ZhbHVlfScgaXMgbm90IGEgQWJzb2x1dGVQYXRoYCk7XG4gIH1cblxuICBwdWJsaWMgc3RhdGljIGNyZWF0ZURpcihmaWxlcGF0aDogQWJzb2x1dGVQYXRoIHwgc3RyaW5nKSB7XG4gICAgY29uc3Qga2V5ID0gZmlsZXBhdGgudG9TdHJpbmcoKTtcbiAgICBjb25zdCB0eXBlID0gX3BhdGhNYXAuZ2V0KGtleSk7XG4gICAgaWYgKHR5cGUgPT09IHVuZGVmaW5lZClcbiAgICAgIF9wYXRoTWFwLnNldChrZXksIFBhdGhUeXBlLkRpclR5cGUpO1xuICAgIGVsc2UgaWYgKHR5cGUgIT09IFBhdGhUeXBlLkRpclR5cGUpXG4gICAgICB0aHJvdyBuZXcgRXJyb3IoYFRoZSAnJHtmaWxlcGF0aH0nIGlzIG5vdCBhIERpclBhdGhgKTtcbiAgICByZXR1cm4gQWJzb2x1dGVQYXRoLmNyZWF0ZShmaWxlcGF0aCk7XG4gIH1cblxuICBwdWJsaWMgc3RhdGljIGNyZWF0ZUZpbGUoZmlsZXBhdGg6IEFic29sdXRlUGF0aCB8IHN0cmluZykge1xuICAgIGNvbnN0IGtleSA9IGZpbGVwYXRoLnRvU3RyaW5nKCk7XG4gICAgY29uc3QgdHlwZSA9IF9wYXRoTWFwLmdldChrZXkpO1xuICAgIGlmICh0eXBlID09PSB1bmRlZmluZWQpXG4gICAgICBfcGF0aE1hcC5zZXQoa2V5LCBQYXRoVHlwZS5GaWxlVHlwZSk7XG4gICAgZWxzZSBpZiAodHlwZSAhPT0gUGF0aFR5cGUuRmlsZVR5cGUpXG4gICAgICB0aHJvdyBuZXcgRXJyb3IoYFRoZSAnJHtmaWxlcGF0aH0nIGlzIG5vdCBhIEZpbGVQYXRoYCk7XG4gICAgcmV0dXJuIEFic29sdXRlUGF0aC5jcmVhdGUoZmlsZXBhdGgpO1xuICB9XG59O1xuXG5jbGFzcyBCYXNlUGF0aCB7XG4gIHByaXZhdGUgW1BBVEhdOiBzdHJpbmc7XG5cbiAgcHJvdGVjdGVkIGNvbnN0cnVjdG9yKHBhdGhTdHI6IHN0cmluZykge1xuICAgIGlmICghcGF0aC5pc0Fic29sdXRlKHBhdGhTdHIpKVxuICAgICAgdGhyb3cgbmV3IEVycm9yKGBOb3Qgc3VwcG9ydGVkIHJlbGF0aXZlIHBhdGggb2YgXCIke3BhdGhTdHJ9XCJgKTtcbiAgICB0aGlzW1BBVEhdID0gcGF0aFN0cjtcbiAgfVxuXG4gIHB1YmxpYyBtYXRjaChyZWdleHA6IFJlZ0V4cCkge1xuICAgIHJldHVybiB0aGlzW1BBVEhdLm1hdGNoKHJlZ2V4cCk7XG4gIH1cblxuICBwdWJsaWMgam9pbiguLi5wYXRoczogQXJyYXk8YW55Pikge1xuICAgIHJldHVybiBwYXRoLnBvc2l4LmpvaW4odGhpc1tQQVRIXSwgLi4ucGF0aHMubWFwKGkgPT4gaS50b1N0cmluZygpKSk7XG4gIH1cblxuICBwdWJsaWMgZGlybmFtZSgpIHtcbiAgICByZXR1cm4gcGF0aC5wb3NpeC5kaXJuYW1lKHRoaXNbUEFUSF0pO1xuICB9XG5cbiAgcHVibGljIGJhc2VuYW1lKCkge1xuICAgIHJldHVybiBwYXRoLmJhc2VuYW1lKHRoaXNbUEFUSF0pO1xuICB9XG5cbiAgcHVibGljIHJlbGF0aXZlKHRvOiBhbnkpIHtcbiAgICByZXR1cm4gcGF0aC5wb3NpeC5yZWxhdGl2ZSh0aGlzW1BBVEhdLCB0by50b1N0cmluZygpKTtcbiAgfVxuXG4gIHB1YmxpYyByZXNvbHZlKC4uLnBhdGhzOiBBcnJheTxhbnk+KSB7XG4gICAgcmV0dXJuIHBhdGgucG9zaXgucmVzb2x2ZSh0aGlzW1BBVEhdLCAuLi5wYXRocy5tYXAoaSA9PiBpLnRvU3RyaW5nKCkpKTtcbiAgfVxuICBcbiAgcHVibGljIHRvVVJMKCkge1xuICAgIHJldHVybiB1cmwucGF0aFRvRmlsZVVSTCh0aGlzW1BBVEhdKTtcbiAgfVxuICBcbiAgcHVibGljIGdldCBQQVRIKCk6IHN0cmluZyB7XG4gICAgcmV0dXJuIHRoaXNbUEFUSF07XG4gIH1cblxuICBwdWJsaWMgdG9TdHJpbmcoKSB7XG4gICAgcmV0dXJuIHRoaXNbUEFUSF07XG4gIH1cblxuICBwdWJsaWMgdG9KU09OKCkge1xuICAgIHJldHVybiB0aGlzW1BBVEhdO1xuICB9XG59O1xuXG5jb25zdCBfcGF0aHMgPSBuZXcgTWFwPHN0cmluZywgQmFzZVBhdGg+KCk7XG5cbmV4cG9ydCBjbGFzcyBGaWxlUGF0aCBleHRlbmRzIEJhc2VQYXRoIHtcbiAgcHJpdmF0ZSBjb25zdHJ1Y3RvcihwYXRoU3RyOiBzdHJpbmcpIHtcbiAgICBzdXBlcihwYXRoU3RyKTtcbiAgfVxuXG4gIHB1YmxpYyBzdGF0aWMgZW5zdXJlSW5zdGFuY2UodmFsdWU6IGFueSk6IEZpbGVQYXRoIHtcbiAgICBpZiAodmFsdWUgaW5zdGFuY2VvZiBGaWxlUGF0aClcbiAgICAgIHJldHVybiB2YWx1ZTtcbiAgICB0aHJvdyBuZXcgRXJyb3IoYFRoZSAnJHt2YWx1ZX0nIGlzIG5vdCBhIEZpbGVQYXRoYCk7XG4gIH1cbiAgXG4gIHB1YmxpYyBzdGF0aWMgY3JlYXRlKHBhdGg6IGFueSk6IEZpbGVQYXRoIHtcbiAgICBpZiAocGF0aCBpbnN0YW5jZW9mIEZpbGVQYXRoKVxuICAgICAgcmV0dXJuIHBhdGg7XG5cbiAgICBpZiAodHlwZW9mIHBhdGggIT09IFwic3RyaW5nXCIpXG4gICAgICB0aHJvdyBuZXcgRXJyb3IoYFRoZSAnJHtwYXRofScgaXMgbm90IGEgc3RyaW5nYCk7XG5cbiAgICBsZXQgZmlsZVBhdGggPSBfcGF0aHMuZ2V0KHBhdGgpO1xuICAgIGlmIChmaWxlUGF0aClcbiAgICAgIHJldHVybiBGaWxlUGF0aC5lbnN1cmVJbnN0YW5jZShmaWxlUGF0aCk7XG5cbiAgICBmaWxlUGF0aCA9IE9iamVjdC5zZWFsKG5ldyBGaWxlUGF0aChwYXRoKSk7XG4gICAgX3BhdGhzLnNldChwYXRoLCBmaWxlUGF0aCk7XG5cbiAgICByZXR1cm4gZmlsZVBhdGg7XG4gIH1cbn1cblxuZXhwb3J0IGNsYXNzIERpclBhdGggZXh0ZW5kcyBCYXNlUGF0aCB7XG4gIHByaXZhdGUgY29uc3RydWN0b3IocGF0aFN0cjogc3RyaW5nKSB7XG4gICAgc3VwZXIocGF0aFN0cik7XG4gIH1cblxuICBwdWJsaWMgc3RhdGljIGVuc3VyZUluc3RhbmNlKHZhbHVlOiBhbnkpOiBEaXJQYXRoIHtcbiAgICBpZiAodmFsdWUgaW5zdGFuY2VvZiBEaXJQYXRoKVxuICAgICAgcmV0dXJuIHZhbHVlO1xuICAgIHRocm93IG5ldyBFcnJvcihgVGhlICcke3ZhbHVlfScgaXMgbm90IGEgRGlyUGF0aGApO1xuICB9XG5cbiAgcHVibGljIHN0YXRpYyBjcmVhdGUocGF0aDogYW55KSB7XG4gICAgaWYgKHBhdGggaW5zdGFuY2VvZiBEaXJQYXRoKVxuICAgICAgcmV0dXJuIHBhdGg7XG5cbiAgICBpZiAodHlwZW9mIHBhdGggIT09IFwic3RyaW5nXCIpXG4gICAgICB0aHJvdyBuZXcgRXJyb3IoYFRoZSAnJHtwYXRofScgaXMgbm90IGEgc3RyaW5nYCk7XG5cbiAgICBsZXQgZGlyUGF0aCA9IF9wYXRocy5nZXQocGF0aCk7XG4gICAgaWYgKGRpclBhdGgpXG4gICAgICByZXR1cm4gRGlyUGF0aC5lbnN1cmVJbnN0YW5jZShkaXJQYXRoKTtcblxuICAgIGRpclBhdGggPSBPYmplY3Quc2VhbChuZXcgRGlyUGF0aChwYXRoKSk7XG4gICAgX3BhdGhzLnNldChwYXRoLCBkaXJQYXRoKTtcblxuICAgIHJldHVybiBkaXJQYXRoO1xuICB9XG59O1xuIiwiLypcbiAqIE1JVCBMaWNlbnNlXG4gKlxuICogQ29weXJpZ2h0IChjKSAyMDI1ICBZdXJpaSBZYWt1YmluICh5dXJpaS55YWt1YmluQGdtYWlsLmNvbSlcbiAqXG4gKiBQZXJtaXNzaW9uIGlzIGdyYW50ZWQgdG8gdXNlLCBjb3B5LCBtb2RpZnksIGFuZCBkaXN0cmlidXRlIHRoaXMgc29mdHdhcmVcbiAqIHVuZGVyIHRoZSBNSVQgTGljZW5zZS4gU2VlIExJQ0VOU0UgZmlsZSBmb3IgZGV0YWlscy5cbiAqL1xuXG5pbXBvcnQgeyBBYnNvbHV0ZVBhdGggfSBmcm9tIFwiQC9jb3JlL1BhdGhcIjtcblxuY29uc3QgR0xPQkFMID0gU3ltYm9sKFwiR0xPQkFMXCIpO1xuY29uc3QgU0NPUEUgPSBTeW1ib2woXCJTQ09QRVwiKTtcblxuZXhwb3J0IGNsYXNzIFBsdWdpbkNvbnRleHQge1xuICBwcml2YXRlIFtTQ09QRV06IGFueTtcbiAgcHJpdmF0ZSBbR0xPQkFMXTogYW55O1xuXG4gIHByaXZhdGUgY29uc3RydWN0b3Ioc2NvcGU6IGFueSwgZ2xvYmFsOiBhbnkpIHtcbiAgICB0aGlzW1NDT1BFXSA9IHNjb3BlO1xuICAgIHRoaXNbR0xPQkFMXSA9IGdsb2JhbDtcbiAgfVxuXG4gIHB1YmxpYyBzdGF0aWMgY3JlYXRlKHByb3RvU2NvcGU6IGFueSwgZ2xvYmFsOiBhbnkpIHtcbiAgICBjb25zdCBjdHggPSBPYmplY3QuY3JlYXRlKHByb3RvU2NvcGUpO1xuICAgIGN0eFtTQ09QRV0gPSBwcm90b1Njb3BlO1xuICAgIGN0eFtHTE9CQUxdID0gZ2xvYmFsO1xuXG4gICAgY29uc3QgcHJvdG86IGFueSA9IFBsdWdpbkNvbnRleHQucHJvdG90eXBlO1xuICAgIGNvbnN0IG5hbWVzID0gT2JqZWN0LmdldE93blByb3BlcnR5TmFtZXMocHJvdG8pLmZpbHRlcihuYW1lID0+IHR5cGVvZiBwcm90b1tuYW1lXSA9PT0gJ2Z1bmN0aW9uJyAmJiBuYW1lICE9PSAnY29uc3RydWN0b3InKTtcbiAgICBmb3IgKGNvbnN0IG5hbWUgb2YgbmFtZXMpIHtcbiAgICAgIGN0eFtuYW1lXSA9IHByb3RvW25hbWVdO1xuICAgIH1cblxuICAgIHJldHVybiBPYmplY3Quc2VhbChjdHgpO1xuICB9XG5cbiAgcHVibGljIGFkZFN1YmRpcmVjdG9yeUFsaWFzKHNyYzogQWJzb2x1dGVQYXRoIHwgc3RyaW5nLCBkZXN0OiBBYnNvbHV0ZVBhdGggfCBzdHJpbmcpIHtcbiAgICB0aGlzW0dMT0JBTF0uYWRkU3ViZGlyZWN0b3J5QWxpYXMoQWJzb2x1dGVQYXRoLmNyZWF0ZURpcihzcmMpLCBBYnNvbHV0ZVBhdGguY3JlYXRlRGlyKGRlc3QpKTtcbiAgfVxuXG4gIHB1YmxpYyB0b0pTT04oKTogb2JqZWN0IHtcbiAgICByZXR1cm4ge307XG4gIH1cbn07XG4iLCIvKlxuICogTUlUIExpY2Vuc2VcbiAqXG4gKiBDb3B5cmlnaHQgKGMpIDIwMjUgIFl1cmlpIFlha3ViaW4gKHl1cmlpLnlha3ViaW5AZ21haWwuY29tKVxuICpcbiAqIFBlcm1pc3Npb24gaXMgZ3JhbnRlZCB0byB1c2UsIGNvcHksIG1vZGlmeSwgYW5kIGRpc3RyaWJ1dGUgdGhpcyBzb2Z0d2FyZVxuICogdW5kZXIgdGhlIE1JVCBMaWNlbnNlLiBTZWUgTElDRU5TRSBmaWxlIGZvciBkZXRhaWxzLlxuICovXG5cbmNvbnN0IEVOVFJJRVMgPSBTeW1ib2woXCJFTlRSSUVTXCIpO1xuXG5leHBvcnQgY2xhc3MgU2NyaXB0Q29sbGVjdGlvbiB7XG4gIHByaXZhdGUgW0VOVFJJRVNdOiBhbnk7XG5cbiAgcHJpdmF0ZSBjb25zdHJ1Y3RvcigpIHtcbiAgICB0aGlzW0VOVFJJRVNdID0ge307XG4gIH1cblxuICBwdWJsaWMgc3RhdGljIGNyZWF0ZSgpIHtcbiAgICByZXR1cm4gT2JqZWN0LnNlYWwobmV3IFNjcmlwdENvbGxlY3Rpb24pO1xuICB9XG5cbiAgcHVibGljIGdldCBFTlRSSUVTKCkge1xuICAgIHJldHVybiB0aGlzW0VOVFJJRVNdO1xuICB9XG5cbiAgcHVibGljIGdldChuYW1lOiBzdHJpbmcpIHtcbiAgICByZXR1cm4gdGhpc1tFTlRSSUVTXVtuYW1lXTtcbiAgfVxuXG4gIHB1YmxpYyBzZXQobmFtZTogc3RyaW5nLCB0YXJnZXQ6IGFueSkge1xuICAgIGlmICh0aGlzW0VOVFJJRVNdW25hbWVdKVxuICAgICAgdGhyb3cgbmV3IEVycm9yKGBTY3JpcHQgXCIke25hbWV9XCIgZXhpc3RzYCk7XG4gICAgdGhpc1tFTlRSSUVTXVtuYW1lXSA9IHRhcmdldDtcbiAgfVxuICBcbiAgcHVibGljIHRvSlNPTigpOiBvYmplY3Qge1xuICAgIHJldHVybiB0aGlzW0VOVFJJRVNdO1xuICB9XG59O1xuIiwiLypcbiAqIE1JVCBMaWNlbnNlXG4gKlxuICogQ29weXJpZ2h0IChjKSAyMDI1ICBZdXJpaSBZYWt1YmluICh5dXJpaS55YWt1YmluQGdtYWlsLmNvbSlcbiAqXG4gKiBQZXJtaXNzaW9uIGlzIGdyYW50ZWQgdG8gdXNlLCBjb3B5LCBtb2RpZnksIGFuZCBkaXN0cmlidXRlIHRoaXMgc29mdHdhcmVcbiAqIHVuZGVyIHRoZSBNSVQgTGljZW5zZS4gU2VlIExJQ0VOU0UgZmlsZSBmb3IgZGV0YWlscy5cbiAqL1xuXG5pbXBvcnQgeyBlbnN1cmVCb29sZWFuIH0gZnJvbSBcIkAvdXRpbHMvU3RyaWN0VHlwZVwiO1xuaW1wb3J0IHsgQWJzb2x1dGVQYXRoIH0gZnJvbSBcIkAvY29yZS9QYXRoXCI7XG5cbmNvbnN0IE5BTUUgICAgICAgICAgICAgICAgPSBTeW1ib2woXCJOQU1FXCIpO1xuY29uc3QgTEFOR1VBR0UgICAgICAgICAgICA9IFN5bWJvbChcIkxBTkdVQUdFXCIpO1xuY29uc3QgSEVBREVSX0ZJTEVfT05MWSAgICA9IFN5bWJvbChcIkhFQURFUl9GSUxFX09OTFlcIik7XG5jb25zdCBERUZJTkVTICAgICAgICAgICAgID0gU3ltYm9sKFwiREVGSU5FU1wiKTtcbmNvbnN0IENPTVBJTEVfRkxBR1MgICAgICAgPSBTeW1ib2woXCJDT01QSUxFX0ZMQUdTXCIpO1xuY29uc3QgRklMRSAgICAgICAgICAgICAgICA9IFN5bWJvbChcIkZJTEVcIik7XG5jb25zdCBPQkpFQ1RfRklMRSAgICAgICAgID0gU3ltYm9sKFwiT0JKRUNUX0ZJTEVcIik7XG5cbmNvbnN0IF9sYW5ndWFnZUV4dGVuc2lvbnMgPSB7XG4gIEFTTTogWyBcIi5hc21cIiwgXCIuc1wiIF0sXG4gIEM6ICAgWyBcIi5jXCIgXSxcbiAgQ1hYOiBbXCIuY3BwXCIsIFwiLmNjXCIsIFwiLmN4eFwiIF0sXG59O1xuXG5mdW5jdGlvbiBpc1N1cHBvcnRMYW5ndWFnZShsYW5ndWFnZTogc3RyaW5nKSB7XG4gIHJldHVybiBfbGFuZ3VhZ2VFeHRlbnNpb25zLmhhc093blByb3BlcnR5KGxhbmd1YWdlKTtcbn1cblxuZnVuY3Rpb24gZ2V0RmlsZUxhbmd1YWdlKGZpbGVuYW1lOiBhbnkpIHtcbiAgY29uc3QgZmlsZW5hbWVMb3dlckNhc2UgPSBmaWxlbmFtZS50b1N0cmluZygpLnRvTG93ZXJDYXNlKCk7XG4gIGZvciAoY29uc3QgW2xhbmd1YWdlLCBleHRlbnNpb25zXSBvZiBPYmplY3QuZW50cmllcyhfbGFuZ3VhZ2VFeHRlbnNpb25zKSkge1xuICAgIGZvciAoY29uc3QgaXRlciBvZiBleHRlbnNpb25zKSB7XG4gICAgICBpZiAoZmlsZW5hbWVMb3dlckNhc2UuZW5kc1dpdGgoaXRlcikpXG4gICAgICAgIHJldHVybiBsYW5ndWFnZTtcbiAgICB9XG4gIH1cbiAgcmV0dXJuIFwiXCI7XG59XG5cbmZ1bmN0aW9uIG1ha2VMYW5ndWFnZSh2YWx1ZTogc3RyaW5nKSB7XG4gIGlmIChpc1N1cHBvcnRMYW5ndWFnZSh2YWx1ZSkpXG4gICAgcmV0dXJuIHZhbHVlO1xuICB0aHJvdyBuZXcgRXJyb3IoYExhbmd1YWdlIFwiJHt2YWx1ZX1cIiBpcyBub3Qgc3VwcG9ydGVkYCk7XG59XG5cbmV4cG9ydCBjbGFzcyBTb3VyY2VGaWxlIHtcbiAgcHJpdmF0ZSBbTkFNRV06IHN0cmluZztcbiAgcHJpdmF0ZSBbTEFOR1VBR0VdOiBzdHJpbmc7XG4gIHByaXZhdGUgW0hFQURFUl9GSUxFX09OTFldOiBib29sZWFuO1xuICBwcml2YXRlIFtGSUxFXTogQWJzb2x1dGVQYXRoO1xuICBwcml2YXRlIFtPQkpFQ1RfRklMRV06IEFic29sdXRlUGF0aCB8IG51bGw7XG4gIHByaXZhdGUgW0RFRklORVNdOiBzdHJpbmdbXTtcbiAgcHJpdmF0ZSBbQ09NUElMRV9GTEFHU106IHN0cmluZ1tdO1xuXG4gIHByaXZhdGUgY29uc3RydWN0b3Ioc2NvcGU6IGFueSwgZmlsZW5hbWU6IEFic29sdXRlUGF0aHxzdHJpbmcpIHtcbiAgICB0aGlzW05BTUVdID0gZmlsZW5hbWUudG9TdHJpbmcoKTtcbiAgICBjb25zdCBmbmFtZSA9IHNjb3BlLlNPVVJDRV9ESVIucmVzb2x2ZShmaWxlbmFtZSk7XG4gIFxuICAgIGNvbnN0IGxhbmd1YWdlID0gZ2V0RmlsZUxhbmd1YWdlKGZuYW1lKTtcbiAgICB0aGlzW0xBTkdVQUdFXSA9IGxhbmd1YWdlO1xuICAgIHRoaXNbSEVBREVSX0ZJTEVfT05MWV0gPSAhbGFuZ3VhZ2U7XG4gICAgdGhpc1tGSUxFXSA9IGZuYW1lO1xuICAgIHRoaXNbT0JKRUNUX0ZJTEVdID0gbnVsbDtcbiAgICB0aGlzW0RFRklORVNdID0gW107XG4gICAgdGhpc1tDT01QSUxFX0ZMQUdTXSA9ICFsYW5ndWFnZSA/IFtdIDogW1xuICAgICAgLi4uc2NvcGVbbGFuZ3VhZ2UgKyBcIl9GTEFHU1wiXSxcbiAgICAgIC4uLnNjb3BlW2xhbmd1YWdlICsgXCJfRkxBR1NfXCIgKyBzY29wZS5CVUlMRF9UWVBFLnRvVXBwZXJDYXNlKCldLFxuICAgIF07XG4gIH1cblxuICBwdWJsaWMgc3RhdGljIGNyZWF0ZShzY29wZTogYW55LCBmaWxlbmFtZTogQWJzb2x1dGVQYXRofHN0cmluZykge1xuICAgIHJldHVybiBPYmplY3Quc2VhbChuZXcgU291cmNlRmlsZShzY29wZSwgZmlsZW5hbWUpKTtcbiAgfVxuXG4gIHB1YmxpYyBnZXQgTkFNRSgpOiBzdHJpbmcge1xuICAgIHJldHVybiB0aGlzW05BTUVdO1xuICB9XG5cbiAgcHVibGljIGdldCBMQU5HVUFHRSgpOiBzdHJpbmcge1xuICAgIHJldHVybiB0aGlzW0xBTkdVQUdFXTtcbiAgfVxuXG4gIHB1YmxpYyBnZXQgSEVBREVSX0ZJTEVfT05MWSgpOiBib29sZWFuIHtcbiAgICByZXR1cm4gdGhpc1tIRUFERVJfRklMRV9PTkxZXTtcbiAgfVxuXG4gIHB1YmxpYyBzZXQgSEVBREVSX0ZJTEVfT05MWSh2YWx1ZTogYm9vbGVhbikge1xuICAgIHRoaXNbSEVBREVSX0ZJTEVfT05MWV0gPSBlbnN1cmVCb29sZWFuKHZhbHVlKTtcbiAgfVxuXG4gIHB1YmxpYyBnZXQgREVGSU5FUygpIHtcbiAgICByZXR1cm4gdGhpc1tERUZJTkVTXVxuICB9XG5cbiAgcHVibGljIGdldCBDT01QSUxFX0ZMQUdTKCkge1xuICAgIHJldHVybiB0aGlzW0NPTVBJTEVfRkxBR1NdO1xuICB9XG5cbiAgcHVibGljIGdldCBGSUxFKCk6IEFic29sdXRlUGF0aCB7XG4gICAgcmV0dXJuIHRoaXNbRklMRV07XG4gIH1cblxuICBwdWJsaWMgZ2V0IEZJTEVfRElSKCk6IEFic29sdXRlUGF0aCB7XG4gICAgcmV0dXJuIHRoaXNbRklMRV0uZGlybmFtZSgpO1xuICB9XG5cbiAgcHVibGljIGdldCBGSUxFX05BTUUoKTogc3RyaW5nIHtcbiAgICByZXR1cm4gdGhpc1tGSUxFXS5iYXNlbmFtZSgpO1xuICB9XG5cbiAgcHVibGljIGdldCBPQkpFQ1RfRklMRSgpOiBBYnNvbHV0ZVBhdGggfCBudWxsIHtcbiAgICByZXR1cm4gdGhpc1tPQkpFQ1RfRklMRV07XG4gIH1cblxuICBwdWJsaWMgc2V0IE9CSkVDVF9GSUxFKHZhbHVlOiBBYnNvbHV0ZVBhdGgpIHtcbiAgICB0aGlzW09CSkVDVF9GSUxFXSA9IHZhbHVlO1xuICB9XG5cbiAgcHVibGljIGdldCBPQkpFQ1RfRklMRV9ESVIoKTogQWJzb2x1dGVQYXRoIHwgbnVsbCB7XG4gICAgcmV0dXJuIHRoaXNbT0JKRUNUX0ZJTEVdID8gdGhpc1tPQkpFQ1RfRklMRV0uZGlybmFtZSgpIDogbnVsbDtcbiAgfVxuXG4gIHB1YmxpYyBnZXQgT0JKRUNUX0ZJTEVfTkFNRSgpOiBzdHJpbmcgfCBudWxsIHtcbiAgICByZXR1cm4gdGhpc1tPQkpFQ1RfRklMRV0gPyB0aGlzW09CSkVDVF9GSUxFXS5iYXNlbmFtZSgpIDogbnVsbDtcbiAgfVxuXG4gIHB1YmxpYyB0b0pTT04oKTogb2JqZWN0IHtcbiAgICByZXR1cm4ge1xuICAgICAgTkFNRTogdGhpcy5OQU1FLFxuICAgICAgTEFOR1VBR0U6IHRoaXMuTEFOR1VBR0UsXG4gICAgICBIRUFERVJfRklMRV9PTkxZOiB0aGlzLkhFQURFUl9GSUxFX09OTFksXG4gICAgICBERUZJTkVTOiB0aGlzLkRFRklORVMsXG4gICAgICBDT01QSUxFX0ZMQUdTOiB0aGlzLkNPTVBJTEVfRkxBR1MsXG4gICAgICBGSUxFOiB0aGlzLkZJTEUsXG4gICAgICBGSUxFX0RJUjogdGhpcy5GSUxFX0RJUixcbiAgICAgIEZJTEVfTkFNRTogdGhpcy5GSUxFX05BTUUsXG4gICAgICBPQkpFQ1RfRklMRTogdGhpcy5PQkpFQ1RfRklMRSxcbiAgICAgIE9CSkVDVF9GSUxFX0RJUjogdGhpcy5PQkpFQ1RfRklMRV9ESVIsXG4gICAgICBPQkpFQ1RfRklMRV9OQU1FOiB0aGlzLk9CSkVDVF9GSUxFX05BTUUsXG4gICAgfTtcbiAgfVxufVxuIiwiLypcbiAqIE1JVCBMaWNlbnNlXG4gKlxuICogQ29weXJpZ2h0IChjKSAyMDI1ICBZdXJpaSBZYWt1YmluICh5dXJpaS55YWt1YmluQGdtYWlsLmNvbSlcbiAqXG4gKiBQZXJtaXNzaW9uIGlzIGdyYW50ZWQgdG8gdXNlLCBjb3B5LCBtb2RpZnksIGFuZCBkaXN0cmlidXRlIHRoaXMgc29mdHdhcmVcbiAqIHVuZGVyIHRoZSBNSVQgTGljZW5zZS4gU2VlIExJQ0VOU0UgZmlsZSBmb3IgZGV0YWlscy5cbiAqL1xuXG5pbXBvcnQgeyBTb3VyY2VGaWxlIH0gZnJvbSBcIkAvY29yZS9Tb3VyY2VGaWxlXCI7XG5cbmNvbnN0IFNPVVJDRVMgPSBTeW1ib2woXCJTT1VSQ0VTXCIpO1xuXG5leHBvcnQgY2xhc3MgU291cmNlRmlsZUxpc3Qge1xuICBwcml2YXRlIFtTT1VSQ0VTXTogU291cmNlRmlsZVtdO1xuXG4gIHByaXZhdGUgY29uc3RydWN0b3Ioc2NvcGU6IGFueSwgc291cmNlczogU291cmNlRmlsZVtdKSB7XG4gICAgdGhpc1tTT1VSQ0VTXSA9IFtdO1xuICAgIGZvciAoY29uc3QgaXRlciBvZiBzb3VyY2VzKSB7XG4gICAgICBpZiAoIShpdGVyIGluc3RhbmNlb2YgU291cmNlRmlsZSkpXG4gICAgICAgIHRocm93IG5ldyBFcnJvcihgSXRlbSAke2l0ZXJ9IGlzIG5vdCBTb3VyY2VGaWxlYCk7XG4gICAgICB0aGlzW1NPVVJDRVNdLnB1c2goaXRlcik7XG4gICAgfVxuICB9XG5cbiAgcHVibGljIHN0YXRpYyBjcmVhdGUoc2NvcGU6IGFueSwgc291cmNlczogU291cmNlRmlsZVtdKSB7XG4gICAgcmV0dXJuIE9iamVjdC5zZWFsKG5ldyBTb3VyY2VGaWxlTGlzdChzY29wZSwgc291cmNlcykpO1xuICB9XG5cbiAgcHVibGljIGFkZERlZmluaXRpb25zKC4uLmRlZmluaXRpb25zOiBzdHJpbmdbXSkge1xuICAgIGZvciAoY29uc3QgaXRlciBvZiBkZWZpbml0aW9ucy5mbGF0KCkpXG4gICAgICB0aGlzW1NPVVJDRVNdLmZvckVhY2goaSA9PiBpLkRFRklORVMucHVzaChpdGVyKSk7XG4gIH1cblxuICBwdWJsaWMgYWRkQ29tcGlsZUZsYWdzKC4uLmZsYWdzOiBzdHJpbmdbXSkge1xuICAgIGZvciAoY29uc3QgaXRlciBvZiBmbGFncy5mbGF0KCkpXG4gICAgICB0aGlzW1NPVVJDRVNdLmZvckVhY2goaSA9PiBpLkNPTVBJTEVfRkxBR1MucHVzaChpdGVyKSk7XG4gIH1cblxuICBwdWJsaWMgc291cmNlQXQoaW5kZXg6IG51bWJlcik6IFNvdXJjZUZpbGUge1xuICAgIHJldHVybiB0aGlzW1NPVVJDRVNdW2luZGV4XTtcbiAgfVxuXG4gIHB1YmxpYyBzb3VyY2VDb3VudChpbmRleDogbnVtYmVyKTogbnVtYmVyIHtcbiAgICByZXR1cm4gdGhpc1tTT1VSQ0VTXS5sZW5ndGg7XG4gIH1cblxuICBwdWJsaWMgdG9KU09OKCk6IG9iamVjdCB7XG4gICAgcmV0dXJuIHRoaXNbU09VUkNFU107XG4gIH1cbn07XG4iLCIvKlxuICogTUlUIExpY2Vuc2VcbiAqXG4gKiBDb3B5cmlnaHQgKGMpIDIwMjUgIFl1cmlpIFlha3ViaW4gKHl1cmlpLnlha3ViaW5AZ21haWwuY29tKVxuICpcbiAqIFBlcm1pc3Npb24gaXMgZ3JhbnRlZCB0byB1c2UsIGNvcHksIG1vZGlmeSwgYW5kIGRpc3RyaWJ1dGUgdGhpcyBzb2Z0d2FyZVxuICogdW5kZXIgdGhlIE1JVCBMaWNlbnNlLiBTZWUgTElDRU5TRSBmaWxlIGZvciBkZXRhaWxzLlxuICovXG5cbmltcG9ydCBvcyBmcm9tIFwibm9kZTpvc1wiO1xuaW1wb3J0IHsgREVCVUdfQlVJTERfVFlQRSwgUkVMRUFTRV9CVUlMRF9UWVBFIH0gZnJvbSBcIkAvY29yZS9UeXBlc1wiO1xuXG5leHBvcnQgZGVmYXVsdCB7XG4gIFNZU1RFTV9OQU1FOiB7XG4gICAgZGVzY3JpcHRpb246IFwiRGVmaW5lcyB0aGUgdGFyZ2V0IE9TIGZvciB0aGUgYnVpbGQsIHVzZWQgaW4gY3Jvc3MtY29tcGlsYXRpb24gYW5kIG5hdGl2ZSBidWlsZHNcIixcbiAgICB2YWx1ZTogXCJMaW51eFwiLFxuICB9LFxuICBTWVNURU1fUFJPQ0VTU09SOiB7XG4gICAgZGVzY3JpcHRpb246IFwiRGVmaW5lcyB0aGUgdGFyZ2V0IENQVSBhcmNoaXRlY3R1cmVcIixcbiAgICB2YWx1ZTogXCJ3YXNtMzJcIixcbiAgfSxcbiAgUFJPSkVDVF9OQU1FOiB7XG4gICAgZGVzY3JpcHRpb246IFwiTmFtZSBvZiB0aGUgY3VycmVudCBwcm9qZWN0XCIsXG4gICAgdmFsdWU6IFwiXCIsXG4gIH0sXG4gIFBST0pFQ1RfVkVSU0lPTjoge1xuICAgIGRlc2NyaXB0aW9uOiBcIlZlcnNpb24gb2YgdGhlIGN1cnJlbnQgcHJvamVjdFwiLFxuICAgIHZhbHVlOiBcIlwiLFxuICB9LFxuICBQUk9KRUNUX0RFU0NSSVBUSU9OOiB7XG4gICAgZGVzY3JpcHRpb246IFwiRGVzY3JpcHRpb24gb2YgdGhlIGN1cnJlbnQgcHJvamVjdFwiLFxuICAgIHZhbHVlOiBcIlwiLFxuICB9LFxuICBQUk9KRUNUX0hPTUVQQUdFX1VSTDoge1xuICAgIGRlc2NyaXB0aW9uOiBcIkhvbWVwYWdlIFVSTCBvZiB0aGUgY3VycmVudCBwcm9qZWN0XCIsXG4gICAgdmFsdWU6IFwiXCIsXG4gIH0sXG4gIFBST0pFQ1RfU09VUkNFX0RJUjoge1xuICAgIGRlc2NyaXB0aW9uOiBcIkFic29sdXRlIHBhdGggdG8gdGhlIHRvcC1sZXZlbCBzb3VyY2UgZGlyZWN0b3J5IG9mIHRoZSBwcm9qZWN0XCIsXG4gICAgdHlwZTogXCJEaXJQYXRoXCIsXG4gIH0sXG4gIFBST0pFQ1RfQklOQVJZX0RJUjoge1xuICAgIGRlc2NyaXB0aW9uOiBcIkFic29sdXRlIHBhdGggdG8gdGhlIHRvcC1sZXZlbCBidWlsZCAoYmluYXJ5KSBkaXJlY3Rvcnkgb2YgdGhlIHByb2plY3RcIixcbiAgICB0eXBlOiBcIkRpclBhdGhcIixcbiAgfSxcbiAgU0NSSVBUX0ZJTEU6IHtcbiAgICBkZXNjcmlwdGlvbjogXCJGdWxsIHBhdGggdG8gdGhlIGN1cnJlbnQgTWFrZVNjcmlwdCBmaWxlIGJlaW5nIHByb2Nlc3NlZFwiLFxuICAgIHR5cGU6IFwiRmlsZVBhdGhcIixcbiAgfSxcbiAgU0NSSVBUX0RJUjoge1xuICAgIGRlc2NyaXB0aW9uOiBcIkRpcmVjdG9yeSBvZiB0aGUgY3VycmVudCBNYWtlU2NyaXB0IGZpbGUgYmVpbmcgcHJvY2Vzc2VkXCIsXG4gICAgdHlwZTogXCJEaXJQYXRoXCIsXG4gIH0sXG4gIFBBQ0tBR0VfRklMRToge1xuICAgIGRlc2NyaXB0aW9uOiBcIkZpbGVuYW1lIG9mIHByb2plY3QgbWFuaWZlc3QgY29udGFpbmluZyBtZXRhZGF0YSBhbmQgZGVwZW5kZW5jaWVzXCIsXG4gICAgdHlwZTogXCJGaWxlUGF0aFwiLFxuICB9LFxuICBDQUNIRV9GSUxFOiB7XG4gICAgZGVzY3JpcHRpb246IFwiRGVmYXVsdCBmaWxlbmFtZSBvZiB0aGUgQml0TWFrZSBjYWNoZSBzdG9yaW5nIHNldHRpbmdzXCIsXG4gICAgdHlwZTogXCJGaWxlUGF0aFwiLFxuICB9LFxuICBCVUlMRF9UWVBFOiB7XG4gICAgZGVzY3JpcHRpb246IFwiU3BlY2lmaWVzIHRoZSBidWlsZCBjb25maWd1cmF0aW9uIGZvciBjb250cm9sbGluZyBvcHRpbWl6YXRpb24gbGV2ZWxzIGFuZCBkZWJ1ZyBpbmZvcm1hdGlvbiBpbiB0aGUgYnVpbGQgcHJvY2Vzc1wiLFxuICAgIHR5cGU6IFsgREVCVUdfQlVJTERfVFlQRSwgUkVMRUFTRV9CVUlMRF9UWVBFIF0sXG4gICAgdmFsdWU6IFJFTEVBU0VfQlVJTERfVFlQRSxcbiAgfSxcbiAgSU5TVEFMTF9QUkVGSVg6IHtcbiAgICBkZXNjcmlwdGlvbjogXCJUaGUgcm9vdCBkaXJlY3Rvcnkgd2hlcmUgZmlsZXMgd2lsbCBiZSBpbnN0YWxsZWQgYnkgZGVmYXVsdFwiLFxuICAgIHR5cGU6IFwiRGlyUGF0aFwiLFxuICAgIHZhbHVlOiBcIi91c3JcIixcbiAgfSxcbiAgREVTVERJUjoge1xuICAgIGRlc2NyaXB0aW9uOiBcIlRlbXBvcmFyeSBpbnN0YWxsYXRpb24gcm9vdFwiLFxuICAgIHR5cGU6IFwiRGlyUGF0aFwiLFxuICB9LFxuICBTT1VSQ0VfRElSOiB7XG4gICAgZGVzY3JpcHRpb246IFwiUGF0aCB0byB0aGUgc291cmNlIGRpcmVjdG9yeSBjdXJyZW50bHkgYmVpbmcgcHJvY2Vzc2VkXCIsXG4gICAgdHlwZTogXCJEaXJQYXRoXCIsXG4gIH0sXG4gIEJJTkFSWV9ESVI6IHtcbiAgICBkZXNjcmlwdGlvbjogXCJQYXRoIHRvIHRoZSBiaW5hcnkgZGlyZWN0b3J5IGN1cnJlbnRseSBiZWluZyBwcm9jZXNzZWRcIixcbiAgICB0eXBlOiBcIkRpclBhdGhcIixcbiAgfSxcbiAgUE9TSVRJT05fSU5ERVBFTkRFTlRfQ09ERToge1xuICAgIGRlc2NyaXB0aW9uOiBcIkVuYWJsZXMgUG9zaXRpb24tSW5kZXBlbmRlbnQgQ29kZSAoUElDKSBmb3IgYnVpbGRpbmcgc2hhcmVkIGxpYnJhcmllc1wiLFxuICAgIHZhbHVlOiBmYWxzZSxcbiAgfSxcbiAgUFJFVkVOVF9JTlNUQUxMX0ZJTEVTOiB7XG4gICAgZGVzY3JpcHRpb246IFwiUHJldmVudCBpbnN0YWxsYXRpb24gb2YgZmlsZXNcIixcbiAgICB2YWx1ZTogZmFsc2UsXG4gIH0sXG4gIEhPU1RfU1lTVEVNX05BTUU6IHtcbiAgICBkZXNjcmlwdGlvbjogXCJTcGVjaWZpZXMgdGhlIE9TIG9mIHRoZSBtYWNoaW5lIHJ1bm5pbmdcIixcbiAgICB2YWx1ZTogb3MudHlwZSgpLFxuICB9LFxuICBJTkNMVURFUzoge1xuICAgIGRlc2NyaXB0aW9uOiBcIlBhdGhzIHNlYXJjaGVkIGZvciBoZWFkZXIgZmlsZXNcIixcbiAgICB2YWx1ZTogW10sXG4gIH0sXG4gIEFTTV9DT01QSUxFUjoge1xuICAgIGRlc2NyaXB0aW9uOiBcIlBhdGggdG8gdGhlIGFzc2VtYmxlciBjb21waWxlciBkZXRlY3RlZFwiLFxuICAgIHZhbHVlOiBcImNsYW5nXCIsXG4gIH0sXG4gIEFTTV9GTEFHUzoge1xuICAgIGRlc2NyaXB0aW9uOiBcIkZsYWdzIHBhc3NlZCB0byB0aGUgYXNzZW1ibGVyIGNvbXBpbGVyXCIsXG4gICAgdmFsdWU6IFtdLFxuICB9LFxuICBBU01fRkxBR1NfREVCVUc6IHtcbiAgICBkZXNjcmlwdGlvbjogXCJBZGRpdGlvbmFsIGFzc2VtYmxlciBmbGFncyB1c2VkIHdoZW4gYnVpbGRpbmcgaW4gRGVidWcgbW9kZVwiLFxuICAgIHZhbHVlOiBbIFwiLWdcIiBdLFxuICB9LFxuICBBU01fRkxBR1NfUkVMRUFTRToge1xuICAgIGRlc2NyaXB0aW9uOiBcIkFkZGl0aW9uYWwgYXNzZW1ibGVyIGZsYWdzIHVzZWQgd2hlbiBidWlsZGluZyBpbiBSZWxlYXNlIG1vZGVcIixcbiAgICB2YWx1ZTogWyBcIi1PM1wiLCBcIi1ETkRFQlVHXCIgXSxcbiAgfSxcbiAgQ19DT01QSUxFUjoge1xuICAgIGRlc2NyaXB0aW9uOiBcIlBhdGggdG8gdGhlIEMgY29tcGlsZXIgZGV0ZWN0ZWRcIixcbiAgICB2YWx1ZTogXCJjbGFuZ1wiLFxuICB9LFxuICBDX0ZMQUdTOiB7XG4gICAgZGVzY3JpcHRpb246IFwiRmxhZ3MgcGFzc2VkIHRvIHRoZSBDIGNvbXBpbGVyXCIsXG4gICAgdmFsdWU6IFtdLFxuICB9LFxuICBDX0ZMQUdTX0RFQlVHOiB7XG4gICAgZGVzY3JpcHRpb246IFwiQWRkaXRpb25hbCBDIGNvbXBpbGVyIGZsYWdzIHVzZWQgd2hlbiBidWlsZGluZyBpbiBEZWJ1ZyBtb2RlXCIsXG4gICAgdmFsdWU6IFsgXCItZ1wiIF0sXG4gIH0sXG4gIENfRkxBR1NfUkVMRUFTRToge1xuICAgIGRlc2NyaXB0aW9uOiBcIkFkZGl0aW9uYWwgQyBjb21waWxlciBmbGFncyB1c2VkIHdoZW4gYnVpbGRpbmcgaW4gUmVsZWFzZSBtb2RlXCIsXG4gICAgdmFsdWU6IFsgXCItTzNcIiwgXCItRE5ERUJVR1wiIF0sXG4gIH0sXG4gIENYWF9DT01QSUxFUjoge1xuICAgIGRlc2NyaXB0aW9uOiBcIlBhdGggdG8gdGhlIEMrKyBjb21waWxlciBkZXRlY3RlZFwiLFxuICAgIHZhbHVlOiBcImNsYW5nKytcIixcbiAgfSxcbiAgQ1hYX0ZMQUdTOiB7XG4gICAgZGVzY3JpcHRpb246IFwiRmxhZ3MgcGFzc2VkIHRvIHRoZSBDIGNvbXBpbGVyXCIsXG4gICAgdmFsdWU6IFtdLFxuICB9LFxuICBDWFhfRkxBR1NfREVCVUc6IHtcbiAgICBkZXNjcmlwdGlvbjogXCJBZGRpdGlvbmFsIEMrKyBjb21waWxlciBmbGFncyB1c2VkIHdoZW4gYnVpbGRpbmcgaW4gRGVidWcgbW9kZVwiLFxuICAgIHZhbHVlOiBbIFwiLWdcIiBdLFxuICB9LFxuICBDWFhfRkxBR1NfUkVMRUFTRToge1xuICAgIGRlc2NyaXB0aW9uOiBcIkFkZGl0aW9uYWwgQysrIGNvbXBpbGVyIGZsYWdzIHVzZWQgd2hlbiBidWlsZGluZyBpbiBSZWxlYXNlIG1vZGVcIixcbiAgICB2YWx1ZTogWyBcIi1PM1wiLCBcIi1ETkRFQlVHXCIgXSxcbiAgfSxcbiAgQVI6IHtcbiAgICBkZXNjcmlwdGlvbjogXCJQYXRoIHRvIHRoZSBhcmNoaXZlciB0b29sIHVzZWQgdG8gY3JlYXRlIHN0YXRpYyBsaWJyYXJpZXNcIixcbiAgICB2YWx1ZTogXCJsbHZtLWFyXCIsXG4gIH0sXG4gIFJBTkxJQjoge1xuICAgIGRlc2NyaXB0aW9uOiBcIlRvb2wgdXNlZCB0byBnZW5lcmF0ZSBhbiBpbmRleCB0byB0aGUgY29udGVudHMgb2YgYW4gYXJjaGl2ZSAoc3RhdGljIGxpYnJhcnkpXCIsXG4gICAgdmFsdWU6IFwibGx2bS1yYW5saWJcIixcbiAgfSxcbiAgTElOS0VSOiB7XG4gICAgZGVzY3JpcHRpb246IFwiUGF0aCB0byB0aGUgbGlua2VyIHVzZWQgdG8gbGluayBvYmplY3QgZmlsZXMgYW5kIGxpYnJhcmllcyBpbnRvIGV4ZWN1dGFibGVzXCIsXG4gICAgdmFsdWU6IFwid2FzbS1sZFwiLFxuICB9LFxuICBOTToge1xuICAgIGRlc2NyaXB0aW9uOiBcIlBhdGggdG8gdGhlIHRvb2wgdXNlZCB0byBsaXN0IHN5bWJvbHMgZnJvbSBvYmplY3QgZmlsZXMgb3IgYXJjaGl2ZXNcIixcbiAgICB2YWx1ZTogXCJsbHZtLW5tXCIsXG4gIH0sXG4gIE9CSkNPUFk6IHtcbiAgICBkZXNjcmlwdGlvbjogXCJQYXRoIHRvIHRoZSB0b29sIHVzZWQgdG8gY29weSBhbmQgdHJhbnNsYXRlIG9iamVjdCBmaWxlc1wiLFxuICAgIHZhbHVlOiBcImxsdm0tb2JqY29weVwiLFxuICB9LFxuICBPQkpEVU1QOiB7XG4gICAgZGVzY3JpcHRpb246IFwiUGF0aCB0byB0aGUgdG9vbCB1c2VkIHRvIGRpc3BsYXkgaW5mb3JtYXRpb24gYWJvdXQgb2JqZWN0IGZpbGVzLCBzdWNoIGFzIGRpc2Fzc2VtYmx5XCIsXG4gICAgdmFsdWU6IFwibGx2bS1vYmpkdW1wXCIsXG4gIH0sXG4gIFNUUklQOiB7XG4gICAgZGVzY3JpcHRpb246IFwiUGF0aCB0byB0aGUgdG9vbCB1c2VkIHRvIHJlbW92ZSBzeW1ib2xzIGZyb20gb2JqZWN0IGZpbGVzIG9yIGV4ZWN1dGFibGVzIHRvIHJlZHVjZSBzaXplXCIsXG4gICAgdmFsdWU6IFwibGx2bS1zdHJpcFwiLFxuICB9LFxuICBPQkpFQ1RfTElCUkFSWV9QUkVGSVg6IHtcbiAgICBkZXNjcmlwdGlvbjogXCJQcmVmaXggdXNlZCBmb3Igb2JqZWN0IGxpYnJhcmllc1wiLFxuICAgIHZhbHVlOiBcIlwiLFxuICB9LFxuICBPQkpFQ1RfTElCUkFSWV9TVUZGSVg6IHtcbiAgICBkZXNjcmlwdGlvbjogXCJTdWZmaXggdXNlZCBmb3Igb2JqZWN0IGxpYnJhcnkgZmlsZXNcIixcbiAgICB2YWx1ZTogXCIub1wiLFxuICB9LFxuICBPQkpFQ1RfTElOS0VSX0ZMQUdTOiB7XG4gICAgZGVzY3JpcHRpb246IFwiRmxhZ3MgcGFzc2VkIHRvIHRoZSBsaW5rZXIgd2hlbiBjcmVhdGluZyBvYmplY3QgbGlicmFyaWVzXCIsXG4gICAgdmFsdWU6IFtdLFxuICB9LFxuICBTVEFUSUNfTElCUkFSWV9QUkVGSVg6IHtcbiAgICBkZXNjcmlwdGlvbjogXCJQcmVmaXggdXNlZCBmb3Igc3RhdGljIGxpYnJhcnkgZmlsZXNcIixcbiAgICB2YWx1ZTogXCJsaWJcIixcbiAgfSxcbiAgU1RBVElDX0xJQlJBUllfU1VGRklYOiB7XG4gICAgZGVzY3JpcHRpb246IFwiU3VmZml4IHVzZWQgZm9yIHN0YXRpYyBsaWJyYXJ5IGZpbGVzXCIsXG4gICAgdmFsdWU6IFwiLmFcIixcbiAgfSxcbiAgU1RBVElDX0xJTktFUl9GTEFHUzoge1xuICAgIGRlc2NyaXB0aW9uOiBcIkZsYWdzIHBhc3NlZCB0byB0aGUgbGlua2VyIHdoZW4gY3JlYXRpbmcgc3RhdGljIGxpYnJhcmllc1wiLFxuICAgIHZhbHVlOiBbXSxcbiAgfSxcbiAgU0hBUkVEX0xJQlJBUllfUFJFRklYOiB7XG4gICAgZGVzY3JpcHRpb246IFwiUHJlZml4IHVzZWQgZm9yIHNoYXJlZCBsaWJyYXJ5IGZpbGVzXCIsXG4gICAgdmFsdWU6IFwibGliXCIsXG4gIH0sXG4gIFNIQVJFRF9MSUJSQVJZX1NVRkZJWDoge1xuICAgIGRlc2NyaXB0aW9uOiBcIlN1ZmZpeCB1c2VkIGZvciBzaGFyZWQgbGlicmFyeSBmaWxlc1wiLFxuICAgIHZhbHVlOiBcIi5zb1wiLFxuICB9LFxuICBTSEFSRURfTElOS0VSX0ZMQUdTOiB7XG4gICAgZGVzY3JpcHRpb246IFwiRmxhZ3MgcGFzc2VkIHRvIHRoZSBsaW5rZXIgd2hlbiBjcmVhdGluZyBzaGFyZWQgbGlicmFyaWVzXCIsXG4gICAgdmFsdWU6IFtdLFxuICB9LFxuICBFWEVDVVRBQkxFX1NVRkZJWDoge1xuICAgIGRlc2NyaXB0aW9uOiBcIlN1ZmZpeCB1c2VkIGZvciBleGVjdXRhYmxlIGZpbGVzXCIsXG4gICAgdmFsdWU6IFwiXCIsXG4gIH0sXG4gIEVYRV9MSU5LRVJfRkxBR1M6IHtcbiAgICBkZXNjcmlwdGlvbjogXCJGbGFncyBwYXNzZWQgdG8gdGhlIGxpbmtlciB3aGVuIGNyZWF0aW5nIGV4ZWN1dGFibGVzXCIsXG4gICAgdmFsdWU6IFtdLFxuICB9LFxuICBHTE9CQUxfQ09OVEVYVF9KU09OOiB7XG4gICAgZGVzY3JpcHRpb246IFwiRmlsZW5hbWUgZm9yIEpTT04gb2YgdGhlIEdsb2JhbCBjb250ZXh0XCIsXG4gICAgdHlwZTogXCJGaWxlUGF0aFwiLFxuICB9LFxuICBUQVJHRVRfR09BTFNfSlNPTjoge1xuICAgIGRlc2NyaXB0aW9uOiBcIkZpbGVuYW1lIGZvciBKU09OIG9mIHRoZSBUYXJnZXQgR29hbHNcIixcbiAgICB0eXBlOiBcIkZpbGVQYXRoXCIsXG4gIH0sXG59O1xuIiwiLypcbiAqIE1JVCBMaWNlbnNlXG4gKlxuICogQ29weXJpZ2h0IChjKSAyMDI1ICBZdXJpaSBZYWt1YmluICh5dXJpaS55YWt1YmluQGdtYWlsLmNvbSlcbiAqXG4gKiBQZXJtaXNzaW9uIGlzIGdyYW50ZWQgdG8gdXNlLCBjb3B5LCBtb2RpZnksIGFuZCBkaXN0cmlidXRlIHRoaXMgc29mdHdhcmVcbiAqIHVuZGVyIHRoZSBNSVQgTGljZW5zZS4gU2VlIExJQ0VOU0UgZmlsZSBmb3IgZGV0YWlscy5cbiAqL1xuXG5pbXBvcnQgeyBlbnN1cmVTdHJpbmcgfSBmcm9tIFwiQC91dGlscy9TdHJpY3RUeXBlXCI7XG5pbXBvcnQgeyBTb3VyY2VGaWxlIH0gZnJvbSBcIkAvY29yZS9Tb3VyY2VGaWxlXCI7XG5pbXBvcnQgeyBTb3VyY2VGaWxlTGlzdCB9IGZyb20gXCJAL2NvcmUvU291cmNlRmlsZUxpc3RcIjtcbmltcG9ydCB7IEluY2x1ZGVEaXJlY3RvcnkgfSBmcm9tIFwiQC9jb3JlL0luY2x1ZGVEaXJlY3RvcnlcIjtcbmltcG9ydCB7IEludGVyZmFjZVRhcmdldCB9IGZyb20gXCJAL2NvcmUvSW50ZXJmYWNlVGFyZ2V0XCI7XG5pbXBvcnQgeyBJbnRlcmZhY2VJbmNsdWRlcyB9IGZyb20gXCJAL2NvcmUvSW50ZXJmYWNlSW5jbHVkZXNcIjtcbmltcG9ydCB7IEludGVyZmFjZU9iamVjdHMgfSBmcm9tIFwiQC9jb3JlL0ludGVyZmFjZU9iamVjdHNcIjtcbmltcG9ydCB7IEFic29sdXRlUGF0aCB9IGZyb20gXCJAL2NvcmUvUGF0aFwiO1xuXG5jb25zdCBOQU1FICAgICAgICAgICAgICAgID0gU3ltYm9sKFwiTkFNRVwiKTtcbmNvbnN0IFRBUkdFVF9TQ09QRSAgICAgICAgPSBTeW1ib2woXCJUQVJHRVRfU0NPUEVcIik7XG5jb25zdCBPVVRQVVRfTkFNRSAgICAgICAgID0gU3ltYm9sKFwiT1VUUFVUX05BTUVcIik7XG5jb25zdCBDT01QSUxFX09QVElPTlMgICAgID0gU3ltYm9sKFwiQ09NUElMRV9PUFRJT05TXCIpO1xuY29uc3QgUFJFRklYICAgICAgICAgICAgICA9IFN5bWJvbChcIlBSRUZJWFwiKTtcbmNvbnN0IFNVRkZJWCAgICAgICAgICAgICAgPSBTeW1ib2woXCJTVUZGSVhcIik7XG5jb25zdCBMSU5LX09QVElPTlMgICAgICAgID0gU3ltYm9sKFwiTElOS19PUFRJT05TXCIpO1xuY29uc3QgSU5DTFVERVMgICAgICAgICAgICA9IFN5bWJvbChcIklOQ0xVREVTXCIpO1xuY29uc3QgREVGSU5FUyAgICAgICAgICAgICA9IFN5bWJvbChcIkRFRklORVNcIik7XG5jb25zdCBTT1VSQ0VTICAgICAgICAgICAgID0gU3ltYm9sKFwiU09VUkNFU1wiKTtcbmNvbnN0IExJQlJBUklFUyAgICAgICAgICAgPSBTeW1ib2woXCJMSUJSQVJJRVNcIik7XG5jb25zdCBQT1NJVElPTl9JTkRFUEVOREVOVF9DT0RFID0gU3ltYm9sKFwiUE9TSVRJT05fSU5ERVBFTkRFTlRfQ09ERVwiKTtcblxuY29uc3QgcmVzZXJ2ZWRUYWdldE5hbWVzID0gWyBcImFsbFwiLCBcImluc3RhbGxcIiBdO1xuZnVuY3Rpb24gZW5zdXJlVGFyZ2V0TmFtZShuYW1lOiBzdHJpbmcpOiBzdHJpbmcge1xuICBpZiAodHlwZW9mIG5hbWUgIT09IFwic3RyaW5nXCIpXG4gICAgdGhyb3cgbmV3IEVycm9yKGBUYXJnZXQgXCIke25hbWV9XCIgaXMgbm90IHN0cmluZyB0eXBlYCk7XG4gIGlmIChyZXNlcnZlZFRhZ2V0TmFtZXMuaW5jbHVkZXMobmFtZSkpXG4gICAgdGhyb3cgbmV3IEVycm9yKGBUYXJnZXQgXCIke25hbWV9XCIgaXMgcmVzZXJ2ZWQgbmFtZWApO1xuICByZXR1cm4gbmFtZTtcbn1cblxuZXhwb3J0IGNsYXNzIEJhc2VUYXJnZXQge1xuICBwcml2YXRlIFtOQU1FXTogc3RyaW5nO1xuICBwcml2YXRlIFtUQVJHRVRfU0NPUEVdOiBhbnk7XG4gIHByaXZhdGUgW09VVFBVVF9OQU1FXTogc3RyaW5nO1xuICBwcml2YXRlIFtQUkVGSVhdOiBzdHJpbmc7XG4gIHByaXZhdGUgW1NVRkZJWF06IHN0cmluZ1xuICBwcml2YXRlIFtDT01QSUxFX09QVElPTlNdOiBhbnlbXTtcbiAgcHJpdmF0ZSBbTElOS19PUFRJT05TXTogYW55W107XG4gIHByaXZhdGUgW1NPVVJDRVNdOiBhbnlbXTtcbiAgcHJpdmF0ZSBbTElCUkFSSUVTXTogYW55W107XG4gIHByaXZhdGUgW0lOQ0xVREVTXTogYW55W107XG4gIHByaXZhdGUgW0RFRklORVNdOiBhbnlbXTtcbiAgcHJpdmF0ZSBbUE9TSVRJT05fSU5ERVBFTkRFTlRfQ09ERV06IGJvb2xlYW47XG5cbiAgcHJvdGVjdGVkIGNvbnN0cnVjdG9yKHNjb3BlOiBhbnksIG5hbWU6IHN0cmluZykge1xuICAgIHRoaXNbTkFNRV0gPSBlbnN1cmVUYXJnZXROYW1lKG5hbWUpO1xuICAgIHRoaXNbVEFSR0VUX1NDT1BFXSA9IHNjb3BlLmNsb25lKCk7XG4gICAgdGhpc1tPVVRQVVRfTkFNRV0gPSBlbnN1cmVTdHJpbmcobmFtZSk7XG4gICAgdGhpc1tQUkVGSVhdID0gXCJcIjtcbiAgICB0aGlzW1NVRkZJWF0gPSBcIlwiO1xuICAgIHRoaXNbQ09NUElMRV9PUFRJT05TXSA9IFtdO1xuICAgIHRoaXNbTElOS19PUFRJT05TXSA9IFtdO1xuICAgIHRoaXNbU09VUkNFU10gPSBbXTtcbiAgICB0aGlzW0xJQlJBUklFU10gPSBbXTtcbiAgICB0aGlzW0lOQ0xVREVTXSA9IHNjb3BlLklOQ0xVREVTLm1hcCgoVkFMVUU6IGFueSkgPT4geyByZXR1cm4ge1ZBTFVFfSB9KTtcbiAgICB0aGlzW0RFRklORVNdID0gW107XG4gICAgdGhpc1tQT1NJVElPTl9JTkRFUEVOREVOVF9DT0RFXSA9IHNjb3BlLlBPU0lUSU9OX0lOREVQRU5ERU5UX0NPREU7XG4gIH1cblxuICBwdWJsaWMgZ2V0IE5BTUUoKSB7XG4gICAgcmV0dXJuIHRoaXNbTkFNRV07XG4gIH1cblxuICBwdWJsaWMgZ2V0IFRBUkdFVF9TQ09QRSgpIHtcbiAgICByZXR1cm4gdGhpc1tUQVJHRVRfU0NPUEVdO1xuICB9XG5cbiAgcHVibGljIGdldCBPVVRQVVRfTkFNRSgpIHtcbiAgICByZXR1cm4gdGhpc1tPVVRQVVRfTkFNRV07XG4gIH1cblxuICBwdWJsaWMgc2V0IE9VVFBVVF9OQU1FKHZhbHVlOiBzdHJpbmcpIHtcbiAgICB0aGlzW09VVFBVVF9OQU1FXSA9IGVuc3VyZVN0cmluZyh2YWx1ZSk7XG4gIH1cblxuICBwdWJsaWMgZ2V0IENPTVBJTEVfT1BUSU9OUygpOiBzdHJpbmdbXSB7XG4gICAgcmV0dXJuIHRoaXNbQ09NUElMRV9PUFRJT05TXTtcbiAgfVxuXG4gIHB1YmxpYyBnZXQgUFJFRklYKCkge1xuICAgIHJldHVybiB0aGlzW1BSRUZJWF07XG4gIH1cblxuICBwdWJsaWMgc2V0IFBSRUZJWCh2YWx1ZTogc3RyaW5nKSB7XG4gICAgdGhpc1tQUkVGSVhdID0gZW5zdXJlU3RyaW5nKHZhbHVlKTtcbiAgfVxuXG4gIHB1YmxpYyBnZXQgU1VGRklYKCkge1xuICAgIHJldHVybiB0aGlzW1NVRkZJWF07XG4gIH1cblxuICBwdWJsaWMgc2V0IFNVRkZJWCh2YWx1ZTogc3RyaW5nKSB7XG4gICAgdGhpc1tTVUZGSVhdID0gZW5zdXJlU3RyaW5nKHZhbHVlKTtcbiAgfVxuXG4gIHB1YmxpYyBnZXQgTElOS19PUFRJT05TKCk6IHN0cmluZ1tdIHtcbiAgICByZXR1cm4gdGhpc1tMSU5LX09QVElPTlNdO1xuICB9XG5cbiAgcHVibGljIGdldCBJTkNMVURFUygpOiBzdHJpbmdbXSB7XG4gICAgcmV0dXJuIHRoaXNbSU5DTFVERVNdO1xuICB9XG5cbiAgcHVibGljIGdldCBERUZJTkVTKCk6IHN0cmluZ1tdIHtcbiAgICByZXR1cm4gdGhpc1tERUZJTkVTXTtcbiAgfVxuXG4gIHB1YmxpYyBnZXQgU09VUkNFUygpOiBzdHJpbmdbXSB7XG4gICAgcmV0dXJuIHRoaXNbU09VUkNFU107XG4gIH1cblxuICBwdWJsaWMgZ2V0IExJQlJBUklFUygpOiBzdHJpbmdbXSB7XG4gICAgcmV0dXJuIHRoaXNbTElCUkFSSUVTXTtcbiAgfVxuXG4gIHB1YmxpYyBnZXQgRklMRV9ESVIoKTogQWJzb2x1dGVQYXRoIHtcbiAgICByZXR1cm4gdGhpc1tUQVJHRVRfU0NPUEVdLkJJTkFSWV9ESVI7XG4gIH1cblxuICBwdWJsaWMgZ2V0IEZJTEVfTkFNRSgpOiBzdHJpbmcge1xuICAgIHJldHVybiB0aGlzLlBSRUZJWCArIHRoaXMuT1VUUFVUX05BTUUgKyB0aGlzLlNVRkZJWDtcbiAgfVxuXG4gIHB1YmxpYyBnZXQgRklMRSgpOiBBYnNvbHV0ZVBhdGgge1xuICAgIHJldHVybiB0aGlzLkZJTEVfRElSLmpvaW4odGhpcy5GSUxFX05BTUUpO1xuICB9XG5cbiAgcHVibGljIGdldCBQT1NJVElPTl9JTkRFUEVOREVOVF9DT0RFKCk6IGJvb2xlYW4ge1xuICAgIHJldHVybiB0aGlzW1BPU0lUSU9OX0lOREVQRU5ERU5UX0NPREVdO1xuICB9XG5cbiAgcHVibGljIGFkZFNvdXJjZXMoLi4uc291cmNlczogQXJyYXk8SW50ZXJmYWNlT2JqZWN0cyB8IFNvdXJjZUZpbGUgfCBBYnNvbHV0ZVBhdGggfCBzdHJpbmc+KSB7XG4gICAgZm9yIChsZXQgaXQgb2Ygc291cmNlcy5mbGF0KDEpKSB7XG4gICAgICBpZiAoaXQgaW5zdGFuY2VvZiBJbnRlcmZhY2VPYmplY3RzIHx8IGl0IGluc3RhbmNlb2YgU291cmNlRmlsZSlcbiAgICAgICAge31cbiAgICAgIGVsc2UgaWYgKHR5cGVvZiBpdCA9PT0gXCJzdHJpbmdcIiB8fCBBYnNvbHV0ZVBhdGguaXNBYnNvbHV0ZShpdCkpXG4gICAgICAgIGl0ID0gU291cmNlRmlsZS5jcmVhdGUodGhpc1tUQVJHRVRfU0NPUEVdLCBpdCk7XG4gICAgICBlbHNlXG4gICAgICAgIHRocm93IG5ldyBFcnJvcihgTm90IHN1cHBvcnQgaW5zdGFuY2UgJHtpdH1gKTtcbiAgXG4gICAgICBpZiAoaXQgaW5zdGFuY2VvZiBTb3VyY2VGaWxlICYmIGl0LkxBTkdVQUdFKSB7XG4gICAgICAgIGNvbnN0IHJmaWxlMSA9IHRoaXNbVEFSR0VUX1NDT1BFXS5CSU5BUllfRElSLnJlbGF0aXZlKGl0LkZJTEUpO1xuICAgICAgICBjb25zdCByZmlsZTIgPSB0aGlzW1RBUkdFVF9TQ09QRV0uU09VUkNFX0RJUi5yZWxhdGl2ZShpdC5GSUxFKTtcbiAgICAgICAgY29uc3QgcmZpbGUgPSAocmZpbGUyLmxlbmd0aCA8IHJmaWxlMS5sZW5ndGggPyByZmlsZTIgOiByZmlsZTEpLnJlcGxhY2UoXCIuLi9cIiwgXCJfXy9cIik7XG4gICAgICAgIGl0Lk9CSkVDVF9GSUxFID0gdGhpc1tUQVJHRVRfU0NPUEVdLkJJTkFSWV9ESVIuam9pbihcIk1ha2VGaWxlc1wiLCB0aGlzW05BTUVdICsgXCIuZGlyXCIsICByZmlsZSArIFwiLm9ialwiKTtcbiAgICAgIH1cbiAgXG4gICAgICB0aGlzW1NPVVJDRVNdLnB1c2goaXQpO1xuICAgIH1cbiAgfVxuXG4gIHB1YmxpYyBhZGRJbmNsdWRlcyguLi5pbmNsdWRlczogQXJyYXk8SW50ZXJmYWNlSW5jbHVkZXMgfCBBYnNvbHV0ZVBhdGggfCBzdHJpbmc+KSB7XG4gICAgZm9yIChjb25zdCBpdCBvZiBpbmNsdWRlcy5mbGF0KDEpKSB7XG4gICAgICBsZXQgVkFMVUU7XG4gICAgICBpZiAoaXQgaW5zdGFuY2VvZiBJbnRlcmZhY2VJbmNsdWRlcylcbiAgICAgICAgVkFMVUUgPSBpdDtcbiAgICAgIGVsc2UgaWYgKHR5cGVvZiBpdCA9PT0gXCJzdHJpbmdcIiB8fCBBYnNvbHV0ZVBhdGguaXNBYnNvbHV0ZShpdCkpXG4gICAgICAgIFZBTFVFID0gSW5jbHVkZURpcmVjdG9yeS5jcmVhdGUoaXQsIHRoaXNbVEFSR0VUX1NDT1BFXS5TT1VSQ0VfRElSKTtcbiAgICAgIGVsc2VcbiAgICAgICAgdGhyb3cgbmV3IEVycm9yKGBOb3Qgc3VwcG9ydCBpbnN0YW5jZSAke2l0fWApO1xuICAgICAgdGhpc1tJTkNMVURFU10ucHVzaCh7VkFMVUV9KTsgLy8gSW5jbHVkZURpcmVjdG9yeVtdXG4gICAgfVxuICB9XG5cbiAgcHVibGljIGFkZExpYnJhcmllcyguLi5saWJyYXJpZXM6IGFueSkge1xuICAgIGZvciAoY29uc3QgaXQgb2YgbGlicmFyaWVzLmZsYXQoMSkpIHtcbiAgICAgIHRoaXNbTElCUkFSSUVTXS5wdXNoKHsgVkFMVUU6IEludGVyZmFjZVRhcmdldC5lbnN1cmVJbnN0YW5jZShpdCkgfSk7XG4gICAgfVxuICB9XG5cbiAgcHVibGljIGFkZENvbXBpbGVPcHRpb25zKC4uLm9wdGlvbnM6IHN0cmluZ1tdKSB7XG4gICAgZm9yIChjb25zdCBpdCBvZiBvcHRpb25zLmZsYXQoMSkpIHtcbiAgICAgIHRoaXNbQ09NUElMRV9PUFRJT05TXS5wdXNoKHsgVkFMVUU6IGl0IH0pO1xuICAgIH1cbiAgfVxuXG4gIHB1YmxpYyBhZGRMaW5rT3B0aW9ucyguLi5vcHRpb25zOiBzdHJpbmdbXSkge1xuICAgIGZvciAoY29uc3QgaXQgb2Ygb3B0aW9ucy5mbGF0KDEpKSB7XG4gICAgICB0aGlzW0xJTktfT1BUSU9OU10ucHVzaCh7IFZBTFVFOiBpdCB9KTtcbiAgICB9XG4gIH1cblxuICBwdWJsaWMgZ2V0U291cmNlRmlsZXMoLi4uc291cmNlczogYW55W10pOiBTb3VyY2VGaWxlTGlzdCB7XG4gICAgY29uc3QgcmVzdWx0ID0gW107XG4gICAgZm9yIChjb25zdCBpdCBvZiBzb3VyY2VzLmZsYXQoMSkpIHtcbiAgICAgIGNvbnN0IGZpbGVuYW1lID0gdGhpc1tUQVJHRVRfU0NPUEVdLlNPVVJDRV9ESVIucmVzb2x2ZShpdCkudG9TdHJpbmcoKTtcbiAgICAgIGNvbnN0IHNyYyA9IHRoaXNbU09VUkNFU10uZmluZChpID0+IGkgaW5zdGFuY2VvZiBTb3VyY2VGaWxlICYmIGkuRklMRS50b1N0cmluZygpID09PSBmaWxlbmFtZSk7XG4gICAgICBpZiAoIXNyYylcbiAgICAgICAgdGhyb3cgbmV3IEVycm9yKGBDYW5ub3QgZmluZCBcIiR7aXR9XCJgKTtcbiAgICAgIHJlc3VsdC5wdXNoKHNyYyk7XG4gICAgfVxuICBcbiAgICBpZiAocmVzdWx0Lmxlbmd0aClcbiAgICAgIHJldHVybiBTb3VyY2VGaWxlTGlzdC5jcmVhdGUodGhpc1tUQVJHRVRfU0NPUEVdLCByZXN1bHQpO1xuICBcbiAgICByZXR1cm4gU291cmNlRmlsZUxpc3QuY3JlYXRlKHRoaXNbVEFSR0VUX1NDT1BFXSwgdGhpc1tTT1VSQ0VTXS5maWx0ZXIoaSA9PiBpIGluc3RhbmNlb2YgU291cmNlRmlsZSkpO1xuICB9XG5cbiAgcHVibGljIHNldFByZWZpeChwcmVmaXg6IHN0cmluZykge1xuICAgIHRoaXNbUFJFRklYXSA9IHByZWZpeDtcbiAgfVxuICBcbiAgcHVibGljIHNldFN1ZmZpeChzdWZmaXg6IHN0cmluZykge1xuICAgIHRoaXNbU1VGRklYXSA9IHN1ZmZpeDtcbiAgfVxuICBcbiAgcHVibGljIHNldE91dHB1dE5hbWUob3V0cHV0TmFtZTogc3RyaW5nKSB7XG4gICAgdGhpc1tPVVRQVVRfTkFNRV0gPSBvdXRwdXROYW1lO1xuICB9XG4gIFxuICBwdWJsaWMgYWRkRGVmaW5pdGlvbnMoLi4uZGVmaW5pdGlvbnM6IHN0cmluZ1tdKSB7XG4gICAgZm9yIChjb25zdCBWQUxVRSBvZiBkZWZpbml0aW9ucy5mbGF0KDEpKVxuICAgICAgdGhpc1tERUZJTkVTXS5wdXNoKHsgVkFMVUUgfSk7XG4gIH1cblxuICBwdWJsaWMgdG9KU09OKCk6IG9iamVjdCB7XG4gICAgcmV0dXJuIHtcbiAgICAgIE5BTUU6IHRoaXMuTkFNRSxcbiAgICAgIFRBUkdFVF9TQ09QRTogdGhpcy5UQVJHRVRfU0NPUEUsXG4gICAgICBPVVRQVVRfTkFNRTogdGhpcy5PVVRQVVRfTkFNRSxcbiAgICAgIENPTVBJTEVfT1BUSU9OUzogdGhpcy5DT01QSUxFX09QVElPTlMsXG4gICAgICBQUkVGSVg6IHRoaXMuUFJFRklYLFxuICAgICAgU1VGRklYOiB0aGlzLlNVRkZJWCxcbiAgICAgIExJTktfT1BUSU9OUzogdGhpcy5MSU5LX09QVElPTlMsXG4gICAgICBJTkNMVURFUzogdGhpcy5JTkNMVURFUyxcbiAgICAgIERFRklORVM6IHRoaXMuREVGSU5FUyxcbiAgICAgIFNPVVJDRVM6IHRoaXMuU09VUkNFUyxcbiAgICAgIExJQlJBUklFUzogdGhpcy5MSUJSQVJJRVMsXG4gICAgICBGSUxFX0RJUjogdGhpcy5GSUxFX0RJUixcbiAgICAgIEZJTEVfTkFNRTogdGhpcy5GSUxFX05BTUUsXG4gICAgICBGSUxFOiB0aGlzLkZJTEUsXG4gICAgfVxuICB9XG59O1xuXG5leHBvcnQgY2xhc3MgQmFzZUxpYnJhcnkgZXh0ZW5kcyBCYXNlVGFyZ2V0IHtcbiAgcHJvdGVjdGVkIGNvbnN0cnVjdG9yKHNjb3BlOiBhbnksIG5hbWU6IHN0cmluZykge1xuICAgIHN1cGVyKHNjb3BlLCBuYW1lKTtcbiAgfVxuXG4gIHB1YmxpYyBhZGRQdWJsaWNJbmNsdWRlcyguLi5pbmNsdWRlczogQXJyYXk8SW50ZXJmYWNlSW5jbHVkZXMgfCBBYnNvbHV0ZVBhdGggfCBzdHJpbmc+KSB7XG4gICAgZm9yIChjb25zdCBpdCBvZiBpbmNsdWRlcy5mbGF0KDEpKSB7XG4gICAgICBsZXQgVkFMVUU7XG4gICAgICBpZiAoaXQgaW5zdGFuY2VvZiBJbnRlcmZhY2VJbmNsdWRlcylcbiAgICAgICAgVkFMVUUgPSBpdDtcbiAgICAgIGVsc2UgaWYgKHR5cGVvZiBpdCA9PT0gXCJzdHJpbmdcIiB8fCBBYnNvbHV0ZVBhdGguaXNBYnNvbHV0ZShpdCkpXG4gICAgICAgIFZBTFVFID0gSW5jbHVkZURpcmVjdG9yeS5jcmVhdGUoaXQsIHRoaXNbVEFSR0VUX1NDT1BFXS5TT1VSQ0VfRElSKTtcbiAgICAgIGVsc2VcbiAgICAgICAgdGhyb3cgbmV3IEVycm9yKGBOb3Qgc3VwcG9ydCBpbnN0YW5jZSAke2l0fWApO1xuICAgICAgdGhpc1tJTkNMVURFU10ucHVzaCh7VkFMVUUsIFBVQkxJQ19PTkxZOiB0cnVlfSk7IC8vIEluY2x1ZGVEaXJlY3RvcnlbXVxuICAgIH1cbiAgfVxuXG4gIHB1YmxpYyBhZGRQdWJsaWNEZWZpbml0aW9ucyguLi5kZWZpbml0aW9uczogc3RyaW5nW10pIHtcbiAgICBmb3IgKGNvbnN0IFZBTFVFIG9mIGRlZmluaXRpb25zLmZsYXQoMSkpXG4gICAgICB0aGlzW0RFRklORVNdLnB1c2goeyBWQUxVRSwgUFVCTElDX09OTFk6IHRydWUgfSk7XG4gIH1cblxuICBwdWJsaWMgYWRkUHVibGljTGlicmFyaWVzKC4uLmxpYnJhcmllczogYW55W10pIHtcbiAgICBmb3IgKGNvbnN0IGl0IG9mIGxpYnJhcmllcy5mbGF0KDEpKSB7XG4gICAgICB0aGlzW0xJQlJBUklFU10ucHVzaCh7VkFMVUU6IEludGVyZmFjZVRhcmdldC5lbnN1cmVJbnN0YW5jZShpdCksIFBVQkxJQ19PTkxZOiB0cnVlfSk7XG4gICAgfVxuICB9XG5cbiAgcHVibGljIGFkZFB1YmxpY0NvbXBpbGVPcHRpb25zKC4uLm9wdGlvbnM6IHN0cmluZ1tdKSB7XG4gICAgZm9yIChjb25zdCBpdCBvZiBvcHRpb25zLmZsYXQoMSkpIHtcbiAgICAgIHRoaXNbQ09NUElMRV9PUFRJT05TXS5wdXNoKHsgVkFMVUU6IGl0LCBQVUJMSUNfT05MWTogdHJ1ZSB9KTtcbiAgICB9XG4gIH1cblxuICBwdWJsaWMgYWRkUHVibGljTGlua09wdGlvbnMoLi4ub3B0aW9uczogYW55W10pIHtcbiAgICBmb3IgKGNvbnN0IGl0IG9mIG9wdGlvbnMuZmxhdCgxKSkge1xuICAgICAgdGhpc1tMSU5LX09QVElPTlNdLnB1c2goeyBWQUxVRTogaXQsIFBVQkxJQ19PTkxZOiB0cnVlIH0pO1xuICAgIH1cbiAgfVxufTtcblxuZXhwb3J0IGNsYXNzIE9iamVjdExpYnJhcnkgZXh0ZW5kcyBCYXNlTGlicmFyeSB7XG4gIHByaXZhdGUgY29uc3RydWN0b3Ioc2NvcGU6IGFueSwgbmFtZTogc3RyaW5nKSB7XG4gICAgc3VwZXIoc2NvcGUsIG5hbWUpO1xuICAgIHRoaXMuUFJFRklYID0gc2NvcGUuT0JKRUNUX0xJQlJBUllfUFJFRklYO1xuICAgIHRoaXMuU1VGRklYID0gc2NvcGUuT0JKRUNUX0xJQlJBUllfU1VGRklYO1xuICAgIHRoaXMuTElOS19PUFRJT05TLnB1c2goLi4uc2NvcGUuT0JKRUNUX0xJTktFUl9GTEFHUy5tYXAoKFZBTFVFOiBhbnkpID0+IHsgcmV0dXJuIHsgVkFMVUUgfSB9KSk7XG4gIH1cblxuICBwdWJsaWMgc3RhdGljIGNyZWF0ZShzY29wZTogYW55LCBuYW1lOiBzdHJpbmcpIHtcbiAgICByZXR1cm4gT2JqZWN0LnNlYWwobmV3IE9iamVjdExpYnJhcnkoc2NvcGUsIG5hbWUpKTtcbiAgfVxufTtcblxuZXhwb3J0IGNsYXNzIFN0YXRpY0xpYnJhcnkgZXh0ZW5kcyBCYXNlTGlicmFyeSB7XG4gIHByaXZhdGUgY29uc3RydWN0b3Ioc2NvcGU6IGFueSwgbmFtZTogc3RyaW5nKSB7XG4gICAgc3VwZXIoc2NvcGUsIG5hbWUpO1xuICAgIHRoaXMuUFJFRklYID0gc2NvcGUuU1RBVElDX0xJQlJBUllfUFJFRklYO1xuICAgIHRoaXMuU1VGRklYID0gc2NvcGUuU1RBVElDX0xJQlJBUllfU1VGRklYO1xuICAgIHRoaXMuTElOS19PUFRJT05TLnB1c2goLi4uc2NvcGUuU1RBVElDX0xJTktFUl9GTEFHUy5tYXAoKFZBTFVFOiBhbnkpID0+IHsgcmV0dXJuIHsgVkFMVUUgfSB9KSk7XG4gIH1cblxuICBwdWJsaWMgc3RhdGljIGNyZWF0ZShzY29wZTogYW55LCBuYW1lOiBzdHJpbmcpIHtcbiAgICByZXR1cm4gT2JqZWN0LnNlYWwobmV3IFN0YXRpY0xpYnJhcnkoc2NvcGUsIG5hbWUpKTtcbiAgfVxufTtcblxuZXhwb3J0IGNsYXNzIFNoYXJlZExpYnJhcnkgZXh0ZW5kcyBCYXNlTGlicmFyeSB7XG4gIHByaXZhdGUgY29uc3RydWN0b3Ioc2NvcGU6IGFueSwgbmFtZTogc3RyaW5nKSB7XG4gICAgc3VwZXIoc2NvcGUsIG5hbWUpO1xuICAgIHRoaXMuUFJFRklYID0gc2NvcGUuU0hBUkVEX0xJQlJBUllfUFJFRklYO1xuICAgIHRoaXMuU1VGRklYID0gc2NvcGUuU0hBUkVEX0xJQlJBUllfU1VGRklYO1xuICAgIHRoaXMuTElOS19PUFRJT05TLnB1c2goLi4uc2NvcGUuU0hBUkVEX0xJTktFUl9GTEFHUy5tYXAoKFZBTFVFOiBhbnkpID0+IHsgcmV0dXJuIHsgVkFMVUUgfSB9KSk7XG4gIH1cblxuICBwdWJsaWMgc3RhdGljIGNyZWF0ZShzY29wZTogYW55LCBuYW1lOiBzdHJpbmcpIHtcbiAgICByZXR1cm4gT2JqZWN0LnNlYWwobmV3IFNoYXJlZExpYnJhcnkoc2NvcGUsIG5hbWUpKTtcbiAgfVxufVxuXG5leHBvcnQgY2xhc3MgRXhlY3V0YWJsZSBleHRlbmRzIEJhc2VUYXJnZXQge1xuICBwcml2YXRlIGNvbnN0cnVjdG9yKHNjb3BlOiBhbnksIG5hbWU6IHN0cmluZykge1xuICAgIHN1cGVyKHNjb3BlLCBuYW1lKTtcbiAgICB0aGlzLlNVRkZJWCA9IHNjb3BlLkVYRUNVVEFCTEVfU1VGRklYO1xuICAgIHRoaXMuTElOS19PUFRJT05TLnB1c2goLi4uc2NvcGUuRVhFX0xJTktFUl9GTEFHUy5tYXAoKFZBTFVFOiBhbnkpID0+IHsgcmV0dXJuIHsgVkFMVUUgfSB9KSk7XG4gIH1cblxuICBwdWJsaWMgc3RhdGljIGNyZWF0ZShzY29wZTogYW55LCBuYW1lOiBzdHJpbmcpIHtcbiAgICByZXR1cm4gT2JqZWN0LnNlYWwobmV3IEV4ZWN1dGFibGUoc2NvcGUsIG5hbWUpKTtcbiAgfVxufTtcbiIsIi8qXG4gKiBNSVQgTGljZW5zZVxuICpcbiAqIENvcHlyaWdodCAoYykgMjAyNSAgWXVyaWkgWWFrdWJpbiAoeXVyaWkueWFrdWJpbkBnbWFpbC5jb20pXG4gKlxuICogUGVybWlzc2lvbiBpcyBncmFudGVkIHRvIHVzZSwgY29weSwgbW9kaWZ5LCBhbmQgZGlzdHJpYnV0ZSB0aGlzIHNvZnR3YXJlXG4gKiB1bmRlciB0aGUgTUlUIExpY2Vuc2UuIFNlZSBMSUNFTlNFIGZpbGUgZm9yIGRldGFpbHMuXG4gKi9cblxuaW1wb3J0IHsgSW5jbHVkZURpcmVjdG9yeSB9IGZyb20gXCJAL2NvcmUvSW5jbHVkZURpcmVjdG9yeVwiO1xuaW1wb3J0IHsgSW50ZXJmYWNlSW5jbHVkZXMgfWZyb20gXCJAL2NvcmUvSW50ZXJmYWNlSW5jbHVkZXNcIjtcbmltcG9ydCB7IEludGVyZmFjZVRhcmdldCB9IGZyb20gXCJAL2NvcmUvSW50ZXJmYWNlVGFyZ2V0XCI7XG5cbmNvbnN0IEVOVFJJRVMgPSBTeW1ib2woXCJFTlRSSUVTXCIpO1xuXG5mdW5jdGlvbiBnZXRIZWFkZXJzKHRhcmdldDogYW55KSB7XG4gIHJldHVybiB0YXJnZXQuU09VUkNFUy5maWx0ZXIoKGk6IGFueSkgPT4gaS5IRUFERVJfRklMRV9PTkxZKTtcbn1cblxuZnVuY3Rpb24gZ2V0SW5jbHVkZXModGFyZ2V0OiBhbnkpIHtcbiAgcmV0dXJuIHRhcmdldC5JTkNMVURFUy5tYXAoKGk6IGFueSkgPT4gaS5WQUxVRSk7XG59XG5cbmZ1bmN0aW9uIGdldFB1YmxpY0luY2x1ZGVzKHRhcmdldDogYW55KSB7XG4gIHJldHVybiB0YXJnZXQuSU5DTFVERVMuZmlsdGVyKChpOiBhbnkpID0+IGkuUFVCTElDX09OTFkpLm1hcCgoaTogYW55KSA9PiBpLlZBTFVFKTtcbn1cblxuZnVuY3Rpb24gZ2V0TGlicmFyaWVzKHRhcmdldDogYW55KSB7XG4gIHJldHVybiB0YXJnZXQuTElCUkFSSUVTLm1hcCgoaTogYW55KSA9PiBpLlZBTFVFKTtcbn1cblxuZnVuY3Rpb24gZ2V0UHVibGljTGlicmFyaWVzKHRhcmdldDogYW55KSB7XG4gIHJldHVybiB0YXJnZXQuTElCUkFSSUVTLmZpbHRlcigoaTogYW55KSA9PiBpLlBVQkxJQ19PTkxZKS5tYXAoKGk6IGFueSkgPT4gaS5WQUxVRSk7XG59XG5cbmZ1bmN0aW9uIGdldERlZmluaXRpb25zKHRhcmdldDogYW55KSB7XG4gIHJldHVybiB0YXJnZXQuREVGSU5FUy5tYXAoKGk6IGFueSkgPT4gaS5WQUxVRSk7XG59XG5cbmZ1bmN0aW9uIGdldFB1YmxpY0RlZmluaXRpb25zKHRhcmdldDogYW55KSB7XG4gIHJldHVybiB0YXJnZXQuREVGSU5FUy5maWx0ZXIoKGk6IGFueSkgPT4gaS5QVUJMSUNfT05MWSkubWFwKChpOiBhbnkpID0+IGkuVkFMVUUpO1xufVxuXG5mdW5jdGlvbiBnZXRDb21waWxlT3B0aW9ucyh0YXJnZXQ6IGFueSkge1xuICByZXR1cm4gdGFyZ2V0LkNPTVBJTEVfT1BUSU9OUy5tYXAoKGk6IGFueSkgPT4gaS5WQUxVRSk7XG59XG5cbmZ1bmN0aW9uIGdldFB1YmxpY0NvbXBpbGVPcHRpb25zKHRhcmdldDogYW55KSB7XG4gIHJldHVybiB0YXJnZXQuQ09NUElMRV9PUFRJT05TLmZpbHRlcigoaTogYW55KSA9PiBpLlBVQkxJQ19PTkxZKS5tYXAoKGk6IGFueSkgPT4gaS5WQUxVRSk7XG59XG5cbmZ1bmN0aW9uIGdldExpbmtPcHRpb25zKHRhcmdldDogYW55KSB7XG4gIHJldHVybiB0YXJnZXQuTElOS19PUFRJT05TLm1hcCgoaTogYW55KSA9PiBpLlZBTFVFKTtcbn1cblxuZnVuY3Rpb24gZ2V0UHVibGljTGlua09wdGlvbnModGFyZ2V0OiBhbnkpIHtcbiAgcmV0dXJuIHRhcmdldC5MSU5LX09QVElPTlMuZmlsdGVyKChpOiBhbnkpID0+IGkuUFVCTElDX09OTFkpLm1hcCgoaTogYW55KSA9PiBpLlZBTFVFKTtcbn1cblxuZXhwb3J0IGNsYXNzIFRhcmdldENvbGxlY3Rpb24ge1xuICBwcml2YXRlIFtFTlRSSUVTXTogYW55O1xuXG4gIHByaXZhdGUgY29uc3RydWN0b3IoKSB7XG4gICAgdGhpc1tFTlRSSUVTXSA9IHt9O1xuICB9XG5cbiAgcHVibGljIHN0YXRpYyBjcmVhdGUoKSB7XG4gICAgcmV0dXJuIE9iamVjdC5zZWFsKG5ldyBUYXJnZXRDb2xsZWN0aW9uKTtcbiAgfVxuICBcbiAgcHVibGljIGdldCBFTlRSSUVTKCkge1xuICAgIHJldHVybiB0aGlzW0VOVFJJRVNdO1xuICB9XG5cbiAgcHVibGljIHRvSlNPTigpOiBvYmplY3Qge1xuICAgIHJldHVybiB0aGlzW0VOVFJJRVNdO1xuICB9XG5cbiAgcHVibGljIGdldChuYW1lOiBzdHJpbmcpOiBhbnkge1xuICAgIHJldHVybiB0aGlzW0VOVFJJRVNdW25hbWVdO1xuICB9XG5cbiAgcHVibGljIHNldChuYW1lOiBzdHJpbmcsIHRhcmdldDogYW55KSB7XG4gICAgaWYgKHRoaXNbRU5UUklFU11bbmFtZV0pXG4gICAgICB0aHJvdyBuZXcgRXJyb3IoYFRhcmdldCBcIiR7bmFtZX1cIiBleGlzdHNgKTtcbiAgICB0aGlzW0VOVFJJRVNdW25hbWVdID0gdGFyZ2V0O1xuICB9XG5cbiAgcHJpdmF0ZSBfX2dldEFsbEluY2x1ZGVzKGluY2x1ZGVzOiBzdHJpbmdbXSwgdGFyZ2V0U2V0OiBTZXQ8c3RyaW5nPiwgbGlzdDogYW55KSB7XG4gICAgZm9yIChjb25zdCBpdGVyIG9mIGxpc3QpIHtcbiAgICAgIGlmIChpdGVyIGluc3RhbmNlb2YgSW50ZXJmYWNlSW5jbHVkZXMgfHwgaXRlciBpbnN0YW5jZW9mIEludGVyZmFjZVRhcmdldCkge1xuICAgICAgICBpZiAoIXRhcmdldFNldC5oYXMoaXRlci50YXJnZXROYW1lKSkge1xuICAgICAgICAgIHRhcmdldFNldC5hZGQoaXRlci50YXJnZXROYW1lKTtcbiAgICAgICAgICBjb25zdCB0YXJnZXQgPSB0aGlzLmdldChpdGVyLnRhcmdldE5hbWUpO1xuICAgICAgICAgIHRoaXMuX19nZXRBbGxJbmNsdWRlcyhpbmNsdWRlcywgdGFyZ2V0U2V0LCBnZXRQdWJsaWNJbmNsdWRlcyh0YXJnZXQpKTtcbiAgICAgICAgICB0aGlzLl9fZ2V0QWxsSW5jbHVkZXMoaW5jbHVkZXMsIHRhcmdldFNldCwgZ2V0UHVibGljTGlicmFyaWVzKHRhcmdldCkpO1xuICAgICAgICB9XG4gICAgICB9XG4gICAgICBlbHNlIGlmIChpdGVyIGluc3RhbmNlb2YgSW5jbHVkZURpcmVjdG9yeSkge1xuICAgICAgICBpZiAoIWluY2x1ZGVzLmluY2x1ZGVzKGl0ZXIudG9TdHJpbmcoKSkpXG4gICAgICAgICAgaW5jbHVkZXMucHVzaChpdGVyLnRvU3RyaW5nKCkpO1xuICAgICAgfVxuICAgICAgZWxzZSB7XG4gICAgICAgIHRocm93IG5ldyBFcnJvcihgTm90IHN1cHBvcnQgaW5zdGFuY2UgJHtpdGVyfWApO1xuICAgICAgfVxuICAgIH1cbiAgfVxuXG4gIHB1YmxpYyBhbGxJbmNsdWRlc09mKHBhcmFtczogYW55KTogc3RyaW5nW10ge1xuICAgIGNvbnN0IHRhcmdldCA9ICh0eXBlb2YgcGFyYW1zID09PSBcInN0cmluZ1wiKSA/IHRoaXMuZ2V0KHBhcmFtcykgOiBwYXJhbXM7XG4gICAgY29uc3QgaW5jbHVkZXM6IHN0cmluZ1tdID0gW107XG4gICAgY29uc3QgdGFyZ2V0U2V0ID0gbmV3IFNldChbIHRhcmdldC5OQU1FIF0pO1xuICAgIHRoaXMuX19nZXRBbGxJbmNsdWRlcyhpbmNsdWRlcywgdGFyZ2V0U2V0LCBnZXRJbmNsdWRlcyh0YXJnZXQpKTtcbiAgICB0aGlzLl9fZ2V0QWxsSW5jbHVkZXMoaW5jbHVkZXMsIHRhcmdldFNldCwgZ2V0TGlicmFyaWVzKHRhcmdldCkpO1xuICAgIHJldHVybiBpbmNsdWRlcztcbiAgfVxuXG4gIHByaXZhdGUgX19nZXRBbGxIZWFkZXJzKGhlYWRlcnM6IHN0cmluZ1tdLCB0YXJnZXRTZXQ6IFNldDxzdHJpbmc+LCBsaXN0OiBhbnkpIHtcbiAgICBmb3IgKGNvbnN0IGl0ZXIgb2YgbGlzdCkge1xuICAgICAgaWYgKGl0ZXIgaW5zdGFuY2VvZiBJbnRlcmZhY2VJbmNsdWRlcyB8fCBpdGVyIGluc3RhbmNlb2YgSW50ZXJmYWNlVGFyZ2V0KSB7XG4gICAgICAgIGlmICghdGFyZ2V0U2V0LmhhcyhpdGVyLnRhcmdldE5hbWUpKSB7XG4gICAgICAgICAgdGFyZ2V0U2V0LmFkZChpdGVyLnRhcmdldE5hbWUpO1xuICAgICAgICAgIGNvbnN0IHRhcmdldCA9IHRoaXMuZ2V0KGl0ZXIudGFyZ2V0TmFtZSk7XG4gICAgICAgICAgZm9yIChjb25zdCBoZWFkZXIgb2YgZ2V0SGVhZGVycyh0YXJnZXQpLm1hcCgoaTogYW55KSA9PiBpLkZJTEUudG9TdHJpbmcoKSkpIHtcbiAgICAgICAgICAgIGlmICghaGVhZGVycy5pbmNsdWRlcyhoZWFkZXIudG9TdHJpbmcoKSkpXG4gICAgICAgICAgICAgIGhlYWRlcnMucHVzaChoZWFkZXIudG9TdHJpbmcoKSk7XG4gICAgICAgICAgfVxuICAgICAgICAgIHRoaXMuX19nZXRBbGxIZWFkZXJzKGhlYWRlcnMsIHRhcmdldFNldCwgZ2V0UHVibGljSW5jbHVkZXModGFyZ2V0KSk7XG4gICAgICAgICAgdGhpcy5fX2dldEFsbEhlYWRlcnMoaGVhZGVycywgdGFyZ2V0U2V0LCBnZXRQdWJsaWNMaWJyYXJpZXModGFyZ2V0KSk7XG4gICAgICAgIH1cbiAgICAgIH1cbiAgICB9XG4gIH1cblxuICBwdWJsaWMgYWxsSGVhZGVyc09mKHBhcmFtczogYW55KSB7XG4gICAgY29uc3QgdGFyZ2V0ID0gKHR5cGVvZiBwYXJhbXMgPT09IFwic3RyaW5nXCIpID8gdGhpcy5nZXQocGFyYW1zKSA6IHBhcmFtcztcbiAgICBjb25zdCBoZWFkZXJzID0gZ2V0SGVhZGVycyh0YXJnZXQpLm1hcCgoaTogYW55KSA9PiBpLkZJTEUudG9TdHJpbmcoKSk7XG4gICAgY29uc3QgdGFyZ2V0U2V0ID0gbmV3IFNldChbIHRhcmdldC5OQU1FIF0pO1xuICAgIHRoaXMuX19nZXRBbGxIZWFkZXJzKGhlYWRlcnMsIHRhcmdldFNldCwgZ2V0SW5jbHVkZXModGFyZ2V0KSk7XG4gICAgdGhpcy5fX2dldEFsbEhlYWRlcnMoaGVhZGVycywgdGFyZ2V0U2V0LCBnZXRMaWJyYXJpZXModGFyZ2V0KSk7XG4gICAgcmV0dXJuIGhlYWRlcnM7XG4gIH1cblxuICBwcml2YXRlIF9fZ2V0QWxsTGlicmFyaWVzKGxpYnJhcmllczogc3RyaW5nW10sIHRhcmdldFNldDogU2V0PHN0cmluZz4sIGxpc3Q6IGFueSkge1xuICAgIGZvciAoY29uc3QgaXRlciBvZiBsaXN0KSB7XG4gICAgICBjb25zb2xlLmFzc2VydChpdGVyIGluc3RhbmNlb2YgSW50ZXJmYWNlVGFyZ2V0KTtcbiAgICAgIGlmICghdGFyZ2V0U2V0LmhhcyhpdGVyLnRhcmdldE5hbWUpKSB7XG4gICAgICAgIHRhcmdldFNldC5hZGQoaXRlci50YXJnZXROYW1lKTtcbiAgICAgICAgY29uc3QgdGFyZ2V0ID0gdGhpcy5nZXQoaXRlci50YXJnZXROYW1lKTtcbiAgICAgICAgbGlicmFyaWVzLnB1c2godGFyZ2V0LkZJTEUudG9TdHJpbmcoKSk7XG4gICAgICAgIHRoaXMuX19nZXRBbGxMaWJyYXJpZXMobGlicmFyaWVzLCB0YXJnZXRTZXQsIGdldFB1YmxpY0xpYnJhcmllcyh0YXJnZXQpKTtcbiAgICAgIH1cbiAgICB9XG4gIH1cblxuICBwdWJsaWMgYWxsTGlicmFyaWVzT2YocGFyYW1zOiBhbnkpIHtcbiAgICBjb25zdCB0YXJnZXQgPSAodHlwZW9mIHBhcmFtcyA9PT0gXCJzdHJpbmdcIikgPyB0aGlzLmdldChwYXJhbXMpIDogcGFyYW1zO1xuICAgIGNvbnN0IGxpYnJhcmllczogc3RyaW5nW10gPSBbXTtcbiAgICBjb25zdCB0YXJnZXRTZXQgPSBuZXcgU2V0KFsgdGFyZ2V0Lk5BTUUgXSk7XG4gICAgdGhpcy5fX2dldEFsbExpYnJhcmllcyhsaWJyYXJpZXMsIHRhcmdldFNldCwgZ2V0TGlicmFyaWVzKHRhcmdldCkpO1xuICAgIHJldHVybiBsaWJyYXJpZXM7XG4gIH1cblxuICBwcml2YXRlIF9fZ2V0QWxsRGVmaW5pdGlvbnMoZGVmaW5pdGlvbnM6IHN0cmluZ1tdLCB0YXJnZXRTZXQ6IFNldDxzdHJpbmc+LCBsaXN0OiBhbnkpIHtcbiAgICBmb3IgKGNvbnN0IGl0ZXIgb2YgbGlzdCkge1xuICAgICAgaWYgKGl0ZXIgaW5zdGFuY2VvZiBJbnRlcmZhY2VUYXJnZXQpIHtcbiAgICAgICAgaWYgKCF0YXJnZXRTZXQuaGFzKGl0ZXIudGFyZ2V0TmFtZSkpIHtcbiAgICAgICAgICB0YXJnZXRTZXQuYWRkKGl0ZXIudGFyZ2V0TmFtZSk7XG4gICAgICAgICAgY29uc3QgdGFyZ2V0ID0gdGhpcy5nZXQoaXRlci50YXJnZXROYW1lKTtcbiAgICAgICAgICB0aGlzLl9fZ2V0QWxsRGVmaW5pdGlvbnMoZGVmaW5pdGlvbnMsIHRhcmdldFNldCwgZ2V0UHVibGljRGVmaW5pdGlvbnModGFyZ2V0KSk7XG4gICAgICAgICAgdGhpcy5fX2dldEFsbERlZmluaXRpb25zKGRlZmluaXRpb25zLCB0YXJnZXRTZXQsIGdldFB1YmxpY0xpYnJhcmllcyh0YXJnZXQpKTtcbiAgICAgICAgfVxuICAgICAgfVxuICAgICAgZWxzZSBpZiAodHlwZW9mIGl0ZXIgPT09IFwic3RyaW5nXCIpIHtcbiAgICAgICAgaWYgKCFkZWZpbml0aW9ucy5pbmNsdWRlcyhpdGVyKSlcbiAgICAgICAgICBkZWZpbml0aW9ucy5wdXNoKGl0ZXIpO1xuICAgICAgfVxuICAgICAgZWxzZSB7XG4gICAgICAgIHRocm93IG5ldyBFcnJvcihgTm90IHN1cHBvcnQgaW5zdGFuY2UgJHtpdGVyfWApO1xuICAgICAgfVxuICAgIH1cbiAgfVxuXG4gIHB1YmxpYyBhbGxEZWZpbml0aW9uc09mKHBhcmFtczogYW55KSB7XG4gICAgY29uc3QgdGFyZ2V0ID0gKHR5cGVvZiBwYXJhbXMgPT09IFwic3RyaW5nXCIpID8gdGhpcy5nZXQocGFyYW1zKSA6IHBhcmFtcztcbiAgICBjb25zdCBkZWZpbml0aW9uczogc3RyaW5nW10gPSBbXTtcbiAgICBjb25zdCB0YXJnZXRTZXQgPSBuZXcgU2V0KFsgdGFyZ2V0Lk5BTUUgXSk7XG4gICAgdGhpcy5fX2dldEFsbERlZmluaXRpb25zKGRlZmluaXRpb25zLCB0YXJnZXRTZXQsIGdldERlZmluaXRpb25zKHRhcmdldCkpO1xuICAgIHRoaXMuX19nZXRBbGxEZWZpbml0aW9ucyhkZWZpbml0aW9ucywgdGFyZ2V0U2V0LCBnZXRQdWJsaWNMaWJyYXJpZXModGFyZ2V0KSk7XG4gICAgcmV0dXJuIGRlZmluaXRpb25zO1xuICB9XG5cbiAgcHJpdmF0ZSBfX2dldEFsbENvbXBpbGVPcHRpb25zKG9wdGlvbnM6IEFycmF5PHN0cmluZ3xzdHJpbmdbXT4sIHRhcmdldFNldDogU2V0PHN0cmluZz4sIGxpc3Q6IGFueSkge1xuICAgIGZvciAoY29uc3QgaXRlciBvZiBsaXN0KSB7XG4gICAgICBpZiAoaXRlciBpbnN0YW5jZW9mIEludGVyZmFjZVRhcmdldCkge1xuICAgICAgICBpZiAoIXRhcmdldFNldC5oYXMoaXRlci50YXJnZXROYW1lKSkge1xuICAgICAgICAgIHRhcmdldFNldC5hZGQoaXRlci50YXJnZXROYW1lKTtcbiAgICAgICAgICBjb25zdCB0YXJnZXQgPSB0aGlzLmdldChpdGVyLnRhcmdldE5hbWUpO1xuICAgICAgICAgIHRoaXMuX19nZXRBbGxDb21waWxlT3B0aW9ucyhvcHRpb25zLCB0YXJnZXRTZXQsIGdldFB1YmxpY0NvbXBpbGVPcHRpb25zKHRhcmdldCkpO1xuICAgICAgICAgIHRoaXMuX19nZXRBbGxDb21waWxlT3B0aW9ucyhvcHRpb25zLCB0YXJnZXRTZXQsIGdldFB1YmxpY0xpYnJhcmllcyh0YXJnZXQpKTtcbiAgICAgICAgfVxuICAgICAgfVxuICAgICAgZWxzZSBpZiAodHlwZW9mIGl0ZXIgPT09IFwic3RyaW5nXCIpIHtcbiAgICAgICAgaWYgKCFvcHRpb25zLmluY2x1ZGVzKGl0ZXIpKVxuICAgICAgICAgIG9wdGlvbnMucHVzaChpdGVyKTtcbiAgICAgIH1cbiAgICAgIGVsc2UgaWYgKEFycmF5LmlzQXJyYXkoaXRlcikpIHtcbiAgICAgICAgLy8gVE9ETzogQWRkIGNvbXBhcmUgZm9yIHNhbWUgYXJyYXkgaW4gb3B0aW9uc1xuICAgICAgICBvcHRpb25zLnB1c2goaXRlcik7XG4gICAgICB9XG4gICAgICBlbHNlIHtcbiAgICAgICAgdGhyb3cgbmV3IEVycm9yKGBOb3Qgc3VwcG9ydCBpbnN0YW5jZSAke2l0ZXJ9YCk7XG4gICAgICB9XG4gICAgfVxuICB9XG5cbiAgcHVibGljIGFsbENvbXBpbGVPcHRpb25zT2YocGFyYW1zOiBhbnkpIHtcbiAgICBjb25zdCB0YXJnZXQgPSAodHlwZW9mIHBhcmFtcyA9PT0gXCJzdHJpbmdcIikgPyB0aGlzLmdldChwYXJhbXMpIDogcGFyYW1zO1xuICAgIGNvbnN0IG9wdGlvbnM6IHN0cmluZ1tdID0gW107XG4gICAgY29uc3QgdGFyZ2V0U2V0ID0gbmV3IFNldChbIHRhcmdldC5OQU1FIF0pO1xuICAgIHRoaXMuX19nZXRBbGxDb21waWxlT3B0aW9ucyhvcHRpb25zLCB0YXJnZXRTZXQsIGdldENvbXBpbGVPcHRpb25zKHRhcmdldCkpO1xuICAgIHRoaXMuX19nZXRBbGxDb21waWxlT3B0aW9ucyhvcHRpb25zLCB0YXJnZXRTZXQsIGdldFB1YmxpY0xpYnJhcmllcyh0YXJnZXQpKTtcbiAgICByZXR1cm4gb3B0aW9ucy5mbGF0KCk7XG4gIH1cblxuICBwcml2YXRlIF9fZ2V0TGlua09wdGlvbnMob3B0aW9uczogQXJyYXk8c3RyaW5nfHN0cmluZ1tdPiwgdGFyZ2V0U2V0OiBTZXQ8c3RyaW5nPiwgbGlzdDogYW55KSB7XG4gICAgZm9yIChjb25zdCBpdGVyIG9mIGxpc3QpIHtcbiAgICAgIGlmIChpdGVyIGluc3RhbmNlb2YgSW50ZXJmYWNlVGFyZ2V0KSB7XG4gICAgICAgIGlmICghdGFyZ2V0U2V0LmhhcyhpdGVyLnRhcmdldE5hbWUpKSB7XG4gICAgICAgICAgdGFyZ2V0U2V0LmFkZChpdGVyLnRhcmdldE5hbWUpO1xuICAgICAgICAgIGNvbnN0IHRhcmdldCA9IHRoaXMuZ2V0KGl0ZXIudGFyZ2V0TmFtZSk7XG4gICAgICAgICAgdGhpcy5fX2dldExpbmtPcHRpb25zKG9wdGlvbnMsIHRhcmdldFNldCwgZ2V0UHVibGljTGlua09wdGlvbnModGFyZ2V0KSk7XG4gICAgICAgICAgdGhpcy5fX2dldExpbmtPcHRpb25zKG9wdGlvbnMsIHRhcmdldFNldCwgZ2V0UHVibGljTGlicmFyaWVzKHRhcmdldCkpO1xuICAgICAgICB9XG4gICAgICB9XG4gICAgICBlbHNlIGlmICh0eXBlb2YgaXRlciA9PT0gXCJzdHJpbmdcIikge1xuICAgICAgICBpZiAoIW9wdGlvbnMuaW5jbHVkZXMoaXRlcikpXG4gICAgICAgICAgb3B0aW9ucy5wdXNoKGl0ZXIpO1xuICAgICAgfVxuICAgICAgZWxzZSBpZiAoQXJyYXkuaXNBcnJheShpdGVyKSkge1xuICAgICAgICAvLyBUT0RPOiBBZGQgY29tcGFyZSBmb3Igc2FtZSBhcnJheSBpbiBvcHRpb25zXG4gICAgICAgIG9wdGlvbnMucHVzaChpdGVyKTtcbiAgICAgIH1cbiAgICAgIGVsc2Uge1xuICAgICAgICB0aHJvdyBuZXcgRXJyb3IoYE5vdCBzdXBwb3J0IGluc3RhbmNlICR7aXRlcn1gKTtcbiAgICAgIH1cbiAgICB9XG4gIH1cblxuICBwdWJsaWMgYWxsTGlua09wdGlvbnNPZihwYXJhbXM6IGFueSkge1xuICAgIGNvbnN0IHRhcmdldCA9ICh0eXBlb2YgcGFyYW1zID09PSBcInN0cmluZ1wiKSA/IHRoaXMuZ2V0KHBhcmFtcykgOiBwYXJhbXM7XG4gICAgY29uc3Qgb3B0aW9uczogc3RyaW5nW10gPSBbXTtcbiAgICBjb25zdCB0YXJnZXRTZXQgPSBuZXcgU2V0KFsgdGFyZ2V0Lk5BTUUgXSk7XG4gICAgdGhpcy5fX2dldExpbmtPcHRpb25zKG9wdGlvbnMsIHRhcmdldFNldCwgZ2V0TGlua09wdGlvbnModGFyZ2V0KSk7XG4gICAgdGhpcy5fX2dldExpbmtPcHRpb25zKG9wdGlvbnMsIHRhcmdldFNldCwgZ2V0UHVibGljTGlicmFyaWVzKHRhcmdldCkpO1xuICAgIHJldHVybiBvcHRpb25zLmZsYXQoKTtcbiAgfVxufVxuIiwiLypcbiAqIE1JVCBMaWNlbnNlXG4gKlxuICogQ29weXJpZ2h0IChjKSAyMDI1ICBZdXJpaSBZYWt1YmluICh5dXJpaS55YWt1YmluQGdtYWlsLmNvbSlcbiAqXG4gKiBQZXJtaXNzaW9uIGlzIGdyYW50ZWQgdG8gdXNlLCBjb3B5LCBtb2RpZnksIGFuZCBkaXN0cmlidXRlIHRoaXMgc29mdHdhcmVcbiAqIHVuZGVyIHRoZSBNSVQgTGljZW5zZS4gU2VlIExJQ0VOU0UgZmlsZSBmb3IgZGV0YWlscy5cbiAqL1xuXG5leHBvcnQgY29uc3QgREVCVUdfQlVJTERfVFlQRSA9IFwiRGVidWdcIjtcbmV4cG9ydCBjb25zdCBSRUxFQVNFX0JVSUxEX1RZUEUgPSBcIlJlbGVhc2VcIjtcbiIsIi8qXG4gKiBNSVQgTGljZW5zZVxuICpcbiAqIENvcHlyaWdodCAoYykgMjAyNSAgWXVyaWkgWWFrdWJpbiAoeXVyaWkueWFrdWJpbkBnbWFpbC5jb20pXG4gKlxuICogUGVybWlzc2lvbiBpcyBncmFudGVkIHRvIHVzZSwgY29weSwgbW9kaWZ5LCBhbmQgZGlzdHJpYnV0ZSB0aGlzIHNvZnR3YXJlXG4gKiB1bmRlciB0aGUgTUlUIExpY2Vuc2UuIFNlZSBMSUNFTlNFIGZpbGUgZm9yIGRldGFpbHMuXG4gKi9cblxuY29uc3QgTkFNRSA9IFN5bWJvbChcIk5BTUVcIik7XG5jb25zdCBJTkNMVURFUyA9IFN5bWJvbChcIklOQ0xVREVTXCIpO1xuY29uc3QgU09VUkNFUyA9IFN5bWJvbChcIlNPVVJDRVNcIik7XG5jb25zdCBERUZJTkVTID0gU3ltYm9sKFwiREVGSU5FU1wiKTtcbmNvbnN0IENPTVBJTEVfT1BUSU9OUyA9IFN5bWJvbChcIkNPTVBJTEVfT1BUSU9OU1wiKTtcbmNvbnN0IExJTktfT1BUSU9OUyA9IFN5bWJvbChcIkxJTktfT1BUSU9OU1wiKTtcblxuZXhwb3J0IGNsYXNzIFVua25vd25UYXJnZXQge1xuICBwcml2YXRlIFtOQU1FXTogc3RyaW5nO1xuICBwcml2YXRlIFtJTkNMVURFU106IGFueVtdO1xuICBwcml2YXRlIFtTT1VSQ0VTXTogYW55W107XG4gIHByaXZhdGUgW0RFRklORVNdOiBhbnlbXTtcbiAgcHJpdmF0ZSBbQ09NUElMRV9PUFRJT05TXTogYW55W107XG4gIHByaXZhdGUgW0xJTktfT1BUSU9OU106IGFueVtdO1xuXG4gIHByaXZhdGUgY29uc3RydWN0b3IobmFtZTogc3RyaW5nKSB7XG4gICAgdGhpc1tOQU1FXSA9IG5hbWU7XG4gICAgdGhpc1tJTkNMVURFU10gPSBbXTtcbiAgICB0aGlzW1NPVVJDRVNdID0gW107XG4gICAgdGhpc1tERUZJTkVTXSA9IFtdO1xuICAgIHRoaXNbQ09NUElMRV9PUFRJT05TXSA9IFtdO1xuICAgIHRoaXNbTElOS19PUFRJT05TXSA9IFtdO1xuICB9XG5cbiAgcHVibGljIHN0YXRpYyBjcmVhdGUobmFtZTogc3RyaW5nKSB7XG4gICAgcmV0dXJuIE9iamVjdC5zZWFsKG5ldyBVbmtub3duVGFyZ2V0KG5hbWUpKTtcbiAgfVxuXG4gIHB1YmxpYyBzdGF0aWMgZW5zdXJlSW5zdGFuY2UodmFsdWU6IGFueSkge1xuICAgIGlmICh2YWx1ZSBpbnN0YW5jZW9mIFVua25vd25UYXJnZXQpXG4gICAgICByZXR1cm4gdmFsdWU7XG4gICAgdGhyb3cgbmV3IEVycm9yKGBUaGUgJyR7dmFsdWV9JyBpcyBub3QgYSBVbmtub3duVGFyZ2V0YCk7XG4gIH1cblxuICBwdWJsaWMgZ2V0IE5BTUUgKCkge1xuICAgIHJldHVybiB0aGlzW05BTUVdO1xuICB9XG5cbiAgcHVibGljIGdldCBJTkNMVURFUyAoKSB7XG4gICAgcmV0dXJuIHRoaXNbSU5DTFVERVNdO1xuICB9XG5cbiAgcHVibGljIGdldCBTT1VSQ0VTICgpIHtcbiAgICByZXR1cm4gdGhpc1tTT1VSQ0VTXTtcbiAgfVxuXG4gIHB1YmxpYyBnZXQgREVGSU5FUyAoKSB7XG4gICAgcmV0dXJuIHRoaXNbREVGSU5FU107XG4gIH1cblxuICBwdWJsaWMgZ2V0IENPTVBJTEVfT1BUSU9OUyAoKSB7XG4gICAgcmV0dXJuIHRoaXNbQ09NUElMRV9PUFRJT05TXTtcbiAgfVxuXG4gIHB1YmxpYyBnZXQgTElOS19PUFRJT05TICgpIHtcbiAgICByZXR1cm4gdGhpc1tMSU5LX09QVElPTlNdO1xuICB9XG5cbiAgcHVibGljIHRvSlNPTigpOiBvYmplY3Qge1xuICAgIHJldHVybiB7XG4gICAgICBOQU1FOiB0aGlzLk5BTUUsXG4gICAgICBJTkNMVURFUzogdGhpcy5JTkNMVURFUyxcbiAgICAgIFNPVVJDRVM6IHRoaXMuU09VUkNFUyxcbiAgICAgIERFRklORVM6IHRoaXMuREVGSU5FUyxcbiAgICAgIENPTVBJTEVfT1BUSU9OUzogdGhpcy5DT01QSUxFX09QVElPTlMsXG4gICAgICBMSU5LX09QVElPTlM6IHRoaXMuTElOS19PUFRJT05TLFxuICAgIH07XG4gIH1cblxuICBwdWJsaWMgdG9TdHJpbmcoKTogc3RyaW5nIHtcbiAgICByZXR1cm4gXCIke1wiICsgdGhpc1tOQU1FXSArIFwifVwiO1xuICB9XG59O1xuIiwiLypcbiAqIE1JVCBMaWNlbnNlXG4gKlxuICogQ29weXJpZ2h0IChjKSAyMDI1ICBZdXJpaSBZYWt1YmluICh5dXJpaS55YWt1YmluQGdtYWlsLmNvbSlcbiAqXG4gKiBQZXJtaXNzaW9uIGlzIGdyYW50ZWQgdG8gdXNlLCBjb3B5LCBtb2RpZnksIGFuZCBkaXN0cmlidXRlIHRoaXMgc29mdHdhcmVcbiAqIHVuZGVyIHRoZSBNSVQgTGljZW5zZS4gU2VlIExJQ0VOU0UgZmlsZSBmb3IgZGV0YWlscy5cbiAqL1xuXG5leHBvcnQgaW50ZXJmYWNlIElMb2dnZXIge1xuICB0cmFjZShtZXNzYWdlPzogYW55LCAuLi5wYXJhbXM6IGFueVtdKTogdm9pZDtcbiAgZGVidWcobWVzc2FnZT86IGFueSwgLi4ucGFyYW1zOiBhbnlbXSk6IHZvaWQ7XG4gIGluZm8obWVzc2FnZT86IGFueSwgLi4ucGFyYW1zOiBhbnlbXSk6IHZvaWQ7XG4gIHdhcm4obWVzc2FnZT86IGFueSwgLi4ucGFyYW1zOiBhbnlbXSk6IHZvaWQ7XG4gIGVycm9yKG1lc3NhZ2U/OiBhbnksIC4uLnBhcmFtczogYW55W10pOiB2b2lkO1xufTtcblxuZXhwb3J0IGZ1bmN0aW9uIGNyZWF0ZUxvZ2dlcih1cmw6IHN0cmluZyk6IElMb2dnZXIge1xuICByZXR1cm4ge1xuICAgIHRyYWNlOiBjb25zb2xlLnRyYWNlLmJpbmQoY29uc29sZSksXG4gICAgZGVidWc6IGNvbnNvbGUuZGVidWcuYmluZChjb25zb2xlKSxcbiAgICBpbmZvOiBjb25zb2xlLmluZm8uYmluZChjb25zb2xlKSxcbiAgICB3YXJuOiBjb25zb2xlLndhcm4uYmluZChjb25zb2xlKSxcbiAgICBlcnJvcjogY29uc29sZS5lcnJvci5iaW5kKGNvbnNvbGUpLFxuICB9O1xufVxuIiwiY29uc3Qgb3MgPSByZXF1aXJlKCdub2RlOm9zJyk7XG5jb25zdCBmcyA9IHJlcXVpcmUoJ25vZGU6ZnMnKTtcbmNvbnN0IHBhdGggPSByZXF1aXJlKCdub2RlOnBhdGgnKTtcblxuY29uc3QgeyBzcGF3bkFzeW5jIH0gPSByZXF1aXJlKFwiQC91dGlscy9DaGlsZFByb2Nlc3NcIik7XG5jb25zdCB7IENNQUtFX0xJU1RTX1RYVCwgVmFsdWVUeXBlIH0gPSByZXF1aXJlKFwiQC9jbWFrZS9Db25zdGFudHNcIik7XG5jb25zdCB7IGNvbnZlcnRUb1ZhbHVlIH0gPSByZXF1aXJlKFwiQC9jbWFrZS9IZWxwZXJcIik7XG5cbmZ1bmN0aW9uIHRvVmFyVHlwZShrZXksIHZhbCkge1xuICBjb25zdCBtYXAgPSB7XG4gICAgQ01BS0VfSU5TVEFMTF9QUkVGSVg6IFZhbHVlVHlwZS5QQVRILFxuICAgIENNQUtFX1RPT0xDSEFJTl9GSUxFOiBWYWx1ZVR5cGUuRklMRVBBVEgsXG4gIH07XG5cbiAgaWYgKHR5cGVvZiB2YWwgPT09IFwiYm9vbGVhblwiKVxuICAgIHJldHVybiBWYWx1ZVR5cGUuQk9PTDtcblxuICBpZiAobWFwLmhhc093blByb3BlcnR5KGtleSkpXG4gICAgcmV0dXJuIG1hcFtrZXldO1xuXG4gIHJldHVybiBWYWx1ZVR5cGUuU1RSSU5HO1xufVxuXG5mdW5jdGlvbiB0b0NhY2hlRW50cnkobmFtZSwgdmFsKVxue1xuICBjb25zdCB0eXBlID0gdG9WYXJUeXBlKG5hbWUsIHZhbCk7XG4gIGNvbnN0IHZhbHVlID0gY29udmVydFRvVmFsdWUodmFsKTtcbiAgcmV0dXJuIGAke25hbWV9OiR7dHlwZX09JHt2YWx1ZX1gO1xufVxuXG5hc3luYyBmdW5jdGlvbiBjb25maWd1cmUoYXJncylcbntcbiAgY29uc3Qgc3Bhd25BcmdzID0gWyAnLUcnLCBhcmdzLmdlbmVyYXRvciBdO1xuICBmb3IgKGNvbnN0IFtrZXksIHZhbF0gb2YgT2JqZWN0LmVudHJpZXMoYXJncy5jYWNoZVZhcmlhYmxlcykpXG4gICAgc3Bhd25BcmdzLnB1c2goJy1EJywgdG9DYWNoZUVudHJ5KGtleSwgdmFsKSk7XG4gIHNwYXduQXJncy5wdXNoKCctUycsIGFyZ3Muc291cmNlRGlyKTtcbiAgc3Bhd25BcmdzLnB1c2goJy1CJywgYXJncy5iaW5hcnlEaXIpO1xuXG4gIGNvbnN0IHJlcyA9IGF3YWl0IHNwYXduQXN5bmMoXCJjbWFrZVwiLCBzcGF3bkFyZ3MsIHtcbiAgICBjd2Q6IGFyZ3MuYmluYXJ5RGlyLFxuICAgIGVudjogYXJncy5lbnZpcm9ubWVudCB8fCBwcm9jZXNzLmVudixcbiAgICBleHRyYToge1xuICAgICAgb3V0cHV0OiBgY21ha2UuY29uZmlndXJlLmxvZ2AsXG4gICAgfSxcbiAgfSk7XG4gIGlmIChyZXMuc3RhdHVzICE9PSAwKSB7XG4gICAgdGhyb3cgYENNYWtlLmNvbmZpZ3VyZSByZXR1cm5lZCBzdGF0dXMgJHtyZXMuc3RhdHVzfWA7XG4gIH1cbn1cblxuYXN5bmMgZnVuY3Rpb24gYnVpbGQoYXJncylcbntcbiAgYXdhaXQgY29uZmlndXJlKGFyZ3MpO1xuXG4gIGNvbnN0IHNwYXduQXJncyA9IFtcbiAgICAnLS1idWlsZCcsICcuJyxcbiAgICAnLS1wYXJhbGxlbCcsIG9zLmF2YWlsYWJsZVBhcmFsbGVsaXNtKCksXG4gIF07XG4gIGNvbnN0IHJlcyA9IGF3YWl0IHNwYXduQXN5bmMoXCJjbWFrZVwiLCBzcGF3bkFyZ3MsIHtcbiAgICBjd2Q6IGFyZ3MuYmluYXJ5RGlyLFxuICAgIGVudjogYXJncy5lbnZpcm9ubWVudCB8fCBwcm9jZXNzLmVudixcbiAgICBleHRyYToge1xuICAgICAgb3V0cHV0OiBgY21ha2UuYnVpbGQubG9nYCxcbiAgICB9LFxuICB9KTtcbiAgaWYgKHJlcy5zdGF0dXMgIT09IDApIHtcbiAgICB0aHJvdyBgQ01ha2UuYnVpbGQgcmV0dXJuZWQgc3RhdHVzICR7cmVzLnN0YXR1c31gO1xuICB9XG59XG5cbmFzeW5jIGZ1bmN0aW9uIGluc3RhbGwoYXJncylcbntcbiAgYXdhaXQgY29uZmlndXJlKGFyZ3MpO1xuXG4gIGNvbnN0IHNwYXduQXJncyA9IFtcbiAgICAnLS1pbnN0YWxsJyxcbiAgICAnLicsXG4gIF07XG4gIGlmIChhcmdzLmluc3RhbGxEaXIpIHtcbiAgICBzcGF3bkFyZ3MucHVzaCgnLS1wcmVmaXgnLCBhcmdzLmluc3RhbGxEaXIpO1xuICB9XG4gIGNvbnN0IHJlcyA9IGF3YWl0IHNwYXduQXN5bmMoXCJjbWFrZVwiLCBzcGF3bkFyZ3MsIHtcbiAgICBjd2Q6IGFyZ3MuYmluYXJ5RGlyLFxuICAgIGVudjogYXJncy5lbnZpcm9ubWVudCB8fCBwcm9jZXNzLmVudixcbiAgICBleHRyYToge1xuICAgICAgb3V0cHV0OiBgY21ha2UuaW5zdGFsbC5sb2dgLFxuICAgIH0sXG4gIH0pO1xuICBpZiAocmVzLnN0YXR1cyAhPT0gMCkge1xuICAgIHRocm93IGBDTWFrZS5pbnN0YWxsIHJldHVybmVkIHN0YXR1cyAke3Jlcy5zdGF0dXN9YDtcbiAgfVxufVxuXG5hc3luYyBmdW5jdGlvbiBjdGVzdChhcmdzKVxue1xuICBhd2FpdCBidWlsZChhcmdzKTtcblxuICBjb25zdCBzcGF3bkFyZ3MgPSBbXG4gIF07XG4gIGNvbnN0IHJlcyA9IGF3YWl0IHNwYXduQXN5bmMoXCJjdGVzdFwiLCBzcGF3bkFyZ3MsIHtcbiAgICBjd2Q6IGFyZ3MuYmluYXJ5RGlyLFxuICAgIGVudjogYXJncy5lbnZpcm9ubWVudCB8fCBwcm9jZXNzLmVudixcbiAgICBleHRyYToge1xuICAgICAgb3V0cHV0OiBgY21ha2UuY3Rlc3QubG9nYCxcbiAgICB9LFxuICB9KTtcbiAgaWYgKHJlcy5zdGF0dXMgIT09IDApIHtcbiAgICB0aHJvdyBgQ1Rlc3QgcmV0dXJuZWQgc3RhdHVzICR7cmVzLnN0YXR1c31gO1xuICB9XG59XG5cbmFzeW5jIGZ1bmN0aW9uIGV4dHJhY3QoYXJncylcbntcbiAgY29uc3Qgc3Bhd25BcmdzID0gWyBcIi1FXCIsIFwidGFyXCIsIFwiLXh2ZlwiLCBhcmdzLmZpbGVuYW1lIF07XG4gIGNvbnN0IHJlcyA9IGF3YWl0IHNwYXduQXN5bmMoXCJjbWFrZVwiLCBzcGF3bkFyZ3MsIHtcbiAgICBjd2Q6IGFyZ3Mud29ya0RpciB8fCBhcmdzLnNvdXJjZURpciB8fCBhcmdzLmJpbmFyeURpcixcbiAgICBlbnY6IGFyZ3MuZW52aXJvbm1lbnQgfHwgcHJvY2Vzcy5lbnYsXG4gICAgZXh0cmE6IHtcbiAgICAgIG91dHB1dDogYXJncy5sb2dGaWxlIHx8IGBjbWFrZS5leHRyYWN0LmxvZ2AsXG4gICAgfSxcbiAgfSk7XG4gIGlmIChyZXMuc3RhdHVzICE9PSAwKSB7XG4gICAgdGhyb3cgYEV4dHJhY3QgcmV0dXJuZWQgc3RhdHVzICR7cmVzLnN0YXR1c31gO1xuICB9XG59XG5cbmFzeW5jIGZ1bmN0aW9uIGdldFByb2plY3RJbmZvKHNvdXJjZSlcbntcbiAgY29uc3Qgc3RhdCA9IGF3YWl0IGZzLnByb21pc2VzLnN0YXQoc291cmNlKTtcbiAgaWYgKHN0YXQuaXNEaXJlY3RvcnkoKSlcbiAgICBzb3VyY2UgPSBwYXRoLnJlc29sdmUoc291cmNlLCBDTUFLRV9MSVNUU19UWFQpO1xuICBjb25zdCBjb250ZW50ID0gYXdhaXQgZnMucHJvbWlzZXMucmVhZEZpbGUoc291cmNlLCB7IGVuY29kaW5nOiAndXRmOCcgfSk7XG5cbiAgY29uc3QgcHJvamVjdFBhdHRlcm4gPSAvcHJvamVjdCAqXFwoICooW14gXSspICooW14pXSopXFwpLztcbiAgY29uc3QgdmVyc2lvblBhdHRlcm4gPSAvVkVSU0lPTiArKFteIF0rKS87XG4gIGxldCBtYXRjaCA9IGNvbnRlbnQubWF0Y2gocHJvamVjdFBhdHRlcm4pO1xuICBjb25zdCBuYW1lID0gbWF0Y2hbMV07XG4gIGNvbnN0IHByb2plY3RDb250ZW50ID0gbWF0Y2hbMl07XG4gIG1hdGNoID0gcHJvamVjdENvbnRlbnQubWF0Y2godmVyc2lvblBhdHRlcm4pO1xuICBjb25zdCB2ZXJzaW9uID0gbWF0Y2hbMV07XG5cbiAgcmV0dXJuIHtcbiAgICBuYW1lLFxuICAgIHZlcnNpb24sXG4gIH07XG59XG5cbmZ1bmN0aW9uIGxpbmVUb1NpbmdsQ29tbWVudChsaW5lKVxue1xuICByZXR1cm4gXCIjIFwiICsgbGluZTtcbn1cblxuZnVuY3Rpb24gbGluZVRvTXVsdGlwbGVDb21tZW50KGxpbmUpXG57XG4gIHJldHVybiBgI1s9PT1bICR7bGluZX0gXT09PV1gO1xufVxuXG5mdW5jdGlvbiBnZW5lcmF0ZWRTY3JpcHROYW1lQ29tbWVudChmaWxlbmFtZSlcbntcbiAgcmV0dXJuIGxpbmVUb1NpbmdsQ29tbWVudChcIkdlbmVyYXRlZCBmcm9tIFwiICsgcGF0aC5iYXNlbmFtZShmaWxlbmFtZSkpO1xufVxuXG5tb2R1bGUuZXhwb3J0cyA9IHtcbiAgY29uZmlndXJlLFxuICBidWlsZCxcbiAgaW5zdGFsbCxcbiAgY3Rlc3QsXG4gIGV4dHJhY3QsXG4gIGdldFByb2plY3RJbmZvLFxuICBsaW5lVG9TaW5nbENvbW1lbnQsXG4gIGxpbmVUb011bHRpcGxlQ29tbWVudCxcbiAgZ2VuZXJhdGVkU2NyaXB0TmFtZUNvbW1lbnQsXG59O1xuIiwiLypcbiAqIE1JVCBMaWNlbnNlXG4gKlxuICogQ29weXJpZ2h0IChjKSAyMDI1ICBZdXJpaSBZYWt1YmluICh5dXJpaS55YWt1YmluQGdtYWlsLmNvbSlcbiAqXG4gKiBQZXJtaXNzaW9uIGlzIGdyYW50ZWQgdG8gdXNlLCBjb3B5LCBtb2RpZnksIGFuZCBkaXN0cmlidXRlIHRoaXMgc29mdHdhcmVcbiAqIHVuZGVyIHRoZSBNSVQgTGljZW5zZS4gU2VlIExJQ0VOU0UgZmlsZSBmb3IgZGV0YWlscy5cbiAqL1xuXG5pbXBvcnQgcGF0aCBmcm9tIFwibm9kZTpwYXRoXCI7XG5pbXBvcnQgZnMgZnJvbSBcIm5vZGU6ZnNcIjtcbmltcG9ydCB7IHNwYXduIH0gZnJvbSBcIm5vZGU6Y2hpbGRfcHJvY2Vzc1wiO1xuXG5leHBvcnQgZnVuY3Rpb24gc3Bhd25Bc3luYyhjb21tYW5kOiBzdHJpbmcsIGFyZ3M6IHN0cmluZ1tdLCBvcHRpb25zPzogYW55KTogUHJvbWlzZTx1bmtub3duPiB7XG4gIGxldCBmZCA9IG51bGw7XG4gIGxldCB2ZXJib3NlID0gZmFsc2U7XG4gIGlmIChvcHRpb25zICYmIG9wdGlvbnMuZXh0cmEpIHtcbiAgICBpZiAob3B0aW9ucy5leHRyYS52ZXJib3NlKVxuICAgICAgdmVyYm9zZSA9IHRydWU7XG4gICAgaWYgKG9wdGlvbnMuZXh0cmEub3V0cHV0KSB7XG4gICAgICBsZXQgbG9nZmlsZSA9IG9wdGlvbnMuZXh0cmEub3V0cHV0O1xuICAgICAgaWYgKCFwYXRoLmlzQWJzb2x1dGUobG9nZmlsZSkgJiYgb3B0aW9ucy5jd2QpIHtcbiAgICAgICAgbG9nZmlsZSA9IHBhdGgucmVzb2x2ZShvcHRpb25zLmN3ZCwgbG9nZmlsZSk7XG4gICAgICB9XG4gICAgICBmZCA9IGZzLm9wZW5TeW5jKGxvZ2ZpbGUsIFwidytcIiwgMG82NjYpO1xuICAgIH1cbiAgfVxuICByZXR1cm4gbmV3IFByb21pc2UoKHJlc29sdmUsIHJlamVjdCkgPT4ge1xuICAgIGlmIChmZCB8fCB2ZXJib3NlKSB7XG4gICAgICB2ZXJib3NlICYmIGNvbnNvbGUuaW5mbyhbIHBhdGguYmFzZW5hbWUoY29tbWFuZCksIC4uLmFyZ3MgXS5qb2luKFwiIFwiKSk7XG4gICAgICBmZCAmJiBmcy53cml0ZVN5bmMoZmQsIEpTT04uc3RyaW5naWZ5KHtjb21tYW5kLCBhcmdzLCBvcHRpb25zIH0sIG51bGwsIDIpICsgXCJcXG5cIik7XG4gICAgfVxuICAgIGNvbnN0IGV4ZWMgPSBzcGF3bihjb21tYW5kLCBhcmdzLCBvcHRpb25zKTtcbiAgICBleGVjLnN0ZG91dC5vbihcImRhdGFcIiwgKGRhdGEpID0+IHtcbiAgICAgIHByb2Nlc3Muc3Rkb3V0LndyaXRlKGRhdGEpO1xuICAgICAgZmQgJiYgZnMud3JpdGVTeW5jKGZkLCBkYXRhKTtcbiAgICB9KTtcbiAgICBleGVjLnN0ZGVyci5vbihcImRhdGFcIiwgKGRhdGEpID0+IHtcbiAgICAgIHByb2Nlc3Muc3RkZXJyLndyaXRlKGRhdGEpO1xuICAgICAgZmQgJiYgZnMud3JpdGVTeW5jKGZkLCBkYXRhKTtcbiAgICB9KTtcbiAgICBleGVjLm9uKFwiY2xvc2VcIiwgKHN0YXR1cykgPT4ge1xuICAgICAgZmQgJiYgZnMuY2xvc2VTeW5jKGZkKTtcbiAgICAgIHJlc29sdmUoe3N0YXR1c30pO1xuICAgIH0pO1xuICB9KTtcbn1cbiIsIi8qXG4gKiBNSVQgTGljZW5zZVxuICpcbiAqIENvcHlyaWdodCAoYykgMjAyNSAgWXVyaWkgWWFrdWJpbiAoeXVyaWkueWFrdWJpbkBnbWFpbC5jb20pXG4gKlxuICogUGVybWlzc2lvbiBpcyBncmFudGVkIHRvIHVzZSwgY29weSwgbW9kaWZ5LCBhbmQgZGlzdHJpYnV0ZSB0aGlzIHNvZnR3YXJlXG4gKiB1bmRlciB0aGUgTUlUIExpY2Vuc2UuIFNlZSBMSUNFTlNFIGZpbGUgZm9yIGRldGFpbHMuXG4gKi9cblxuaW1wb3J0IGZzIGZyb20gXCJub2RlOmZzXCI7XG5pbXBvcnQgcGF0aCBmcm9tIFwibm9kZTpwYXRoXCI7XG5pbXBvcnQgdXJsIGZyb20gXCJub2RlOnVybFwiO1xuXG5leHBvcnQgYXN5bmMgZnVuY3Rpb24gcGF0aEV4aXN0cyhwYXRoOiBzdHJpbmcpIHtcbiAgdHJ5IHtcbiAgICByZXR1cm4gISEoYXdhaXQgZnMucHJvbWlzZXMuc3RhdChwYXRoKSk7XG4gIH0gY2F0Y2gge1xuICAgIHJldHVybiBmYWxzZTtcbiAgfVxufVxuXG5leHBvcnQgZnVuY3Rpb24gcGF0aEV4aXN0c1N5bmMocGF0aDogc3RyaW5nKSB7XG4gIHRyeSB7XG4gICAgcmV0dXJuICEhZnMuc3RhdFN5bmMocGF0aCk7XG4gIH0gY2F0Y2gge1xuICAgIHJldHVybiBmYWxzZTtcbiAgfVxufVxuXG5leHBvcnQgYXN5bmMgZnVuY3Rpb24gZmlsZUV4aXN0cyhwYXRoOiBzdHJpbmcpIHtcbiAgdHJ5IHtcbiAgICByZXR1cm4gKGF3YWl0IGZzLnByb21pc2VzLnN0YXQocGF0aCkpLmlzRmlsZSgpO1xuICB9IGNhdGNoIHtcbiAgICByZXR1cm4gZmFsc2U7XG4gIH1cbn1cblxuZXhwb3J0IGZ1bmN0aW9uIGZpbGVFeGlzdHNTeW5jKHBhdGg6IHN0cmluZykge1xuICB0cnkge1xuICAgIHJldHVybiBmcy5zdGF0U3luYyhwYXRoKS5pc0ZpbGUoKTtcbiAgfSBjYXRjaCB7XG4gICAgcmV0dXJuIGZhbHNlO1xuICB9IFxufVxuXG5leHBvcnQgYXN5bmMgZnVuY3Rpb24gZGlyZWN0b3J5RXhpc3RzKHBhdGg6IHN0cmluZykge1xuICB0cnkge1xuICAgIHJldHVybiAoYXdhaXQgZnMucHJvbWlzZXMuc3RhdChwYXRoKSkuaXNEaXJlY3RvcnkoKTtcbiAgfSBjYXRjaCB7XG4gICAgcmV0dXJuIGZhbHNlO1xuICB9XG59XG5cbmV4cG9ydCBmdW5jdGlvbiBkaXJlY3RvcnlFeGlzdHNTeW5jKHBhdGg6IHN0cmluZykge1xuICB0cnkge1xuICAgcmV0dXJuIGZzLnN0YXRTeW5jKHBhdGgpLmlzRGlyZWN0b3J5KCk7XG4gIH0gY2F0Y2gge1xuICAgIHJldHVybiBmYWxzZTtcbiAgfVxufVxuXG5leHBvcnQgZnVuY3Rpb24gZXh0bmFtZShmdWxscGF0aDogc3RyaW5nLCBvcHRpb25zOiBhbnkpIHtcbiAgaWYgKG9wdGlvbnM/Lmxvbmdlc3QpIHtcbiAgICBjb25zdCBmaWxlbmFtZSA9IHBhdGguYmFzZW5hbWUoZnVsbHBhdGgpO1xuICAgIGNvbnN0IGluZGV4ID0gZmlsZW5hbWUuaW5kZXhPZignLicpO1xuICAgIHJldHVybiBpbmRleCAhPSAtMSA/IGZpbGVuYW1lLnN1YnN0cmluZyhpbmRleCkgOiAnJztcbiAgfVxuXG4gIHJldHVybiBwYXRoLmV4dG5hbWUoZnVsbHBhdGgpO1xufVxuXG5leHBvcnQgYXN5bmMgZnVuY3Rpb24gZmlsZUxpc3QoZGlybmFtZTogc3RyaW5nLCBvcHRpb25zOiBhbnkpOiBQcm9taXNlPEFycmF5PHN0cmluZz4+IHtcbiAgY29uc3QgbGlzdCA9IG5ldyBBcnJheTxzdHJpbmc+O1xuICBpZiAoYXdhaXQgZGlyZWN0b3J5RXhpc3RzKGRpcm5hbWUpKSB7XG4gICAgZm9yIChjb25zdCBpdGVyIG9mIGF3YWl0IGZzLnByb21pc2VzLnJlYWRkaXIoZGlybmFtZSkpIHtcbiAgICAgIGNvbnN0IGZpbGVwYXRoID0gcGF0aC5yZXNvbHZlKGRpcm5hbWUsIGl0ZXIpO1xuICAgICAgY29uc3Qgc3RhdCA9IGF3YWl0IGZzLnByb21pc2VzLnN0YXQoZmlsZXBhdGgpO1xuICAgICAgaWYgKHN0YXQuaXNGaWxlKCkpIHtcbiAgICAgICAgbGlzdC5wdXNoKG9wdGlvbnMucmVsYXRpdmUgPyBwYXRoLnJlbGF0aXZlKG9wdGlvbnMucmVsYXRpdmUsIGZpbGVwYXRoKSA6IGZpbGVwYXRoKTtcbiAgICAgIH1cbiAgICAgIGVsc2UgaWYgKG9wdGlvbnMucmVjdXJzaXZlICYmIHN0YXQuaXNEaXJlY3RvcnkoKSkge1xuICAgICAgICBmb3IgKGNvbnN0IGZuYW1lIG9mIGF3YWl0IGZpbGVMaXN0KGZpbGVwYXRoLCBvcHRpb25zKSlcbiAgICAgICAgICBsaXN0LnB1c2goZm5hbWUpO1xuICAgICAgfVxuICAgIH1cbiAgfVxuICByZXR1cm4gbGlzdDtcbn1cblxuZXhwb3J0IGFzeW5jIGZ1bmN0aW9uIHNhdmVJZkRpZmZlcmVudChmaWxlbmFtZTogc3RyaW5nLCBjb250ZW50OiBzdHJpbmcpIHtcbiAgaWYgKGF3YWl0IGZpbGVFeGlzdHMoZmlsZW5hbWUpKSB7XG4gICAgY29uc3Qgb2xkQ29udGVudCA9IGF3YWl0IGZzLnByb21pc2VzLnJlYWRGaWxlKGZpbGVuYW1lLCB7IGVuY29kaW5nOiBcInV0ZjhcIiB9KTtcbiAgICBpZiAoY29udGVudCA9PSBvbGRDb250ZW50KVxuICAgICAgcmV0dXJuIGZhbHNlO1xuICB9XG5cbiAgYXdhaXQgZnMucHJvbWlzZXMubWtkaXIocGF0aC5kaXJuYW1lKGZpbGVuYW1lKSwgeyByZWN1cnNpdmU6IHRydWUgfSk7XG4gIGF3YWl0IGZzLnByb21pc2VzLndyaXRlRmlsZShmaWxlbmFtZSwgY29udGVudCwgeyBlbmNvZGluZzogXCJ1dGY4XCIgfSk7XG5cbiAgcmV0dXJuIHRydWU7XG59XG5cbmV4cG9ydCBmdW5jdGlvbiBnZXRQYXRoU3RyaW5nKHN0cjogc3RyaW5nKSB7XG4gIHJldHVybiBzdHIuc3RhcnRzV2l0aChcImZpbGU6Ly9cIikgPyB1cmwuZmlsZVVSTFRvUGF0aChzdHIpIDogc3RyO1xufVxuIiwiLypcbiAqIE1JVCBMaWNlbnNlXG4gKlxuICogQ29weXJpZ2h0IChjKSAyMDI1ICBZdXJpaSBZYWt1YmluICh5dXJpaS55YWt1YmluQGdtYWlsLmNvbSlcbiAqXG4gKiBQZXJtaXNzaW9uIGlzIGdyYW50ZWQgdG8gdXNlLCBjb3B5LCBtb2RpZnksIGFuZCBkaXN0cmlidXRlIHRoaXMgc29mdHdhcmVcbiAqIHVuZGVyIHRoZSBNSVQgTGljZW5zZS4gU2VlIExJQ0VOU0UgZmlsZSBmb3IgZGV0YWlscy5cbiAqL1xuXG5pbXBvcnQgcGF0aCBmcm9tIFwibm9kZTpwYXRoXCI7XG5pbXBvcnQgZnMgZnJvbSBcIm5vZGU6ZnNcIjtcbmltcG9ydCBodHRwIGZyb20gXCJodHRwXCI7XG5pbXBvcnQgaHR0cHMgZnJvbSBcImh0dHBzXCI7XG5cbmltcG9ydCB7IGNyZWF0ZUxvZ2dlciB9IGZyb20gXCJAL2xvZ2dlclwiO1xuXG5jb25zdCBsb2dnZXIgPSBjcmVhdGVMb2dnZXIoaW1wb3J0Lm1ldGEudXJsKTtcblxuY29uc3QgaHR0cE9wdGlvbnMgPSB7XG4gIG1ldGhvZDogJ0dFVCcsXG4gIHRpbWVvdXQ6IDUwMDAsXG4gIGhlYWRlcnM6IHtcbiAgICBcIlVzZXItQWdlbnRcIjogUFJPSkVDVF9OQU1FICsgXCIvXCIgKyBQUk9KRUNUX1ZFUlNJT04sXG4gICAgXCJBY2NlcHRcIjogXCIqLypcIixcbiAgfSxcbn07XG5cbmZ1bmN0aW9uIGh0dHBSZXF1ZXN0KHVybDogc3RyaW5nLCBvcHRpb25zOiBodHRwLlJlcXVlc3RPcHRpb25zIHwgaHR0cHMuUmVxdWVzdE9wdGlvbnMsIGNhbGxiYWNrOiBhbnkpIHtcbiAgaWYgKHVybC5zdGFydHNXaXRoKFwiaHR0cHM6Ly9cIikpXG4gICAgcmV0dXJuIGh0dHBzLnJlcXVlc3QodXJsLCBvcHRpb25zLCBjYWxsYmFjayk7XG4gIHJldHVybiBodHRwLnJlcXVlc3QodXJsLCBvcHRpb25zLCBjYWxsYmFjayk7XG59O1xuXG5leHBvcnQgZnVuY3Rpb24gcmVxdWVzdEdldCh1cmw6IHN0cmluZykge1xuICByZXR1cm4gbmV3IFByb21pc2UoKHJlc29sdmUsIHJlamVjdCkgPT4ge1xuXG4gICAgY29uc3Qgb25FcnJvciA9IChlcnI6IGFueSkgPT4ge1xuICAgICAgY29uc3QgbWVzc2FnZSA9IFwiRW5jb3VudGVyZWQgYW4gZXJyb3IgdHJ5aW5nIHRvIG1ha2UgYSByZXF1ZXN0OiBcIiArIGVyci5tZXNzYWdlO1xuICAgICAgbG9nZ2VyLmVycm9yKG1lc3NhZ2UsIGVycik7XG4gICAgICByZWplY3QobWVzc2FnZSk7XG4gICAgfTtcblxuICAgIGNvbnN0IG9uVGltZW91dCA9IChyZXF1ZXN0OiBhbnkpID0+IHtcbiAgICAgIHJlcXVlc3QuZGVzdHJveSgpO1xuICAgICAgbG9nZ2VyLmVycm9yKFwiICBUaW1lb3V0XCIsIHVybCk7XG4gICAgICByZWplY3QoXCJUaW1lb3V0XCIpO1xuICAgIH1cblxuICAgIGNvbnN0IG9uUmVxdWVzdCA9IChyZXNwb25zZTogYW55KSA9PiB7XG4gICAgICBzd2l0Y2ggKHJlc3BvbnNlLnN0YXR1c0NvZGUpIHtcbiAgICAgIGNhc2UgMjAwOlxuICAgICAgICBjb25zdCBjaHVua3M6IEFycmF5PEJ1ZmZlcj4gPSBbXTtcbiAgICAgICAgcmVzcG9uc2Uub24oXCJkYXRhXCIsIChjaHVuazogQnVmZmVyKSA9PiBjaHVua3MucHVzaChjaHVuaykpO1xuICAgICAgICByZXNwb25zZS5vbihcImVuZFwiLCAoKSA9PiByZXNvbHZlKEJ1ZmZlci5jb25jYXQoY2h1bmtzKSkpO1xuICAgICAgICByZXNwb25zZS5vbignY2xvc2UnLCAoKSA9PiBsb2dnZXIuaW5mbygnICBDbG9zZScpKTtcbiAgICAgICAgYnJlYWs7XG5cbiAgICAgIGNhc2UgMzAxOlxuICAgICAgY2FzZSAzMDI6XG4gICAgICAgIHJlc3BvbnNlLnJlc3VtZSgpO1xuICAgICAgICBsb2dnZXIuaW5mbyhgUmVkaXJlY3QgdG8gJHtyZXNwb25zZS5oZWFkZXJzLmxvY2F0aW9ufWApO1xuICAgICAgICBjb25zdCByZXF1ZXN0ID0gaHR0cFJlcXVlc3QocmVzcG9uc2UuaGVhZGVycy5sb2NhdGlvbiwgaHR0cE9wdGlvbnMsIG9uUmVxdWVzdCk7XG4gICAgICAgIHJlcXVlc3Qub24oJ3RpbWVvdXQnLCBvblRpbWVvdXQuYmluZChudWxsLCByZXF1ZXN0KSk7XG4gICAgICAgIHJlcXVlc3Qub24oJ2Vycm9yJywgb25FcnJvcik7XG4gICAgICAgIHJlcXVlc3QuZW5kKCk7XG4gICAgICAgIGJyZWFrO1xuXG4gICAgICBkZWZhdWx0OlxuICAgICAgICByZXNwb25zZS5yZXN1bWUoKTtcbiAgICAgICAgY29uc3QgbWVzc2FnZSA9IFwiRGlkIG5vdCBnZXQgYW4gT0sgZnJvbSB0aGUgc2VydmVyLiBDb2RlOiBcIiArIHJlc3BvbnNlLnN0YXR1c0NvZGU7XG4gICAgICAgIGxvZ2dlci5lcnJvcihtZXNzYWdlKTtcbiAgICAgICAgcmVqZWN0KG1lc3NhZ2UpO1xuICAgICAgICBicmVhaztcbiAgICAgIH1cbiAgICB9O1xuXG4gICAgbG9nZ2VyLmluZm8oYHdnZXQgJHt1cmx9YCk7XG4gICAgY29uc3QgcmVxdWVzdCA9IGh0dHBSZXF1ZXN0KHVybCwgaHR0cE9wdGlvbnMsIG9uUmVxdWVzdCk7XG4gICAgcmVxdWVzdC5vbigndGltZW91dCcsIG9uVGltZW91dC5iaW5kKG51bGwsIHJlcXVlc3QpKTtcbiAgICByZXF1ZXN0Lm9uKCdlcnJvcicsIG9uRXJyb3IpO1xuICAgIHJlcXVlc3QuZW5kKCk7XG4gIH0pO1xufTtcblxuZXhwb3J0IGZ1bmN0aW9uIGRvd25sb2FkRmlsZSh1cmw6IHN0cmluZywgZmlsZTogc3RyaW5nKSB7XG4gIHJldHVybiBuZXcgUHJvbWlzZSgocmVzb2x2ZSwgcmVqZWN0KSA9PiB7XG4gICAgY29uc3QgZmlsZW5hbWUgPSBwYXRoLmJhc2VuYW1lKHVybCk7XG5cbiAgICBjb25zdCBjbGllbnQgPSAoKCkgPT4ge1xuICAgICAgaWYgKGZpbGUpIHtcbiAgICAgICAgY29uc3QgZmQgPSBmcy5vcGVuU3luYyhmaWxlLCBcIndcIik7XG4gICAgICAgIHJldHVybiB7XG4gICAgICAgICAgb25EYXRhOiAoY2h1bms6IEJ1ZmZlcikgPT4ge1xuICAgICAgICAgICAgZnMud3JpdGVTeW5jKGZkLCBjaHVuayk7XG4gICAgICAgICAgfSxcbiAgICAgICAgICBvbkVuZDogKCkgPT4ge1xuICAgICAgICAgICAgZnMuY2xvc2VTeW5jKGZkKTtcbiAgICAgICAgICAgIHJlc29sdmUodW5kZWZpbmVkKTtcbiAgICAgICAgICB9LFxuICAgICAgICB9O1xuICAgICAgfVxuICAgICAgZWxzZSB7XG4gICAgICAgIGNvbnN0IGNodW5rczogQXJyYXk8QnVmZmVyPiA9IFtdO1xuICAgICAgICByZXR1cm4ge1xuICAgICAgICAgIG9uRGF0YTogKGNodW5rOiBCdWZmZXIpID0+IHtcbiAgICAgICAgICAgIGNodW5rcy5wdXNoKGNodW5rKTtcbiAgICAgICAgICB9LFxuICAgICAgICAgIG9uRW5kOiAoKSA9PiB7XG4gICAgICAgICAgICByZXNvbHZlKEJ1ZmZlci5jb25jYXQoY2h1bmtzKSk7XG4gICAgICAgICAgfSxcbiAgICAgICAgfTtcbiAgICAgIH1cbiAgICB9KSgpO1xuICBcbiAgICBjb25zdCBzdGFydFJlcXVlc3QgPSAodXJsOiBzdHJpbmcsIGNhbGxiYWNrOiBhbnkpID0+IHtcbiAgICAgIGNvbnN0IHJlcXVlc3QgPSBodHRwcy5yZXF1ZXN0KHVybCwgaHR0cE9wdGlvbnMsIGNhbGxiYWNrKTtcbiAgICAgIGlmIChyZXF1ZXN0KSB7XG4gICAgICAgIHJlcXVlc3Qub24oJ2Vycm9yJywgKGVycm9yKSA9PiByZWplY3QoZXJyb3IpKTtcbiAgICAgICAgcmVxdWVzdC5lbmQoKTsgXG4gICAgICB9XG4gICAgICBlbHNlIHtcbiAgICAgICAgcmVqZWN0KGBVcmwgc2NoZW1lIG5vdCBzdXBwb3J0ZWQgZm9yICR7dXJsfWApO1xuICAgICAgfVxuICAgIH07XG5cbiAgICBjb25zdCBvblJlcXVlc3QgPSAocmVzcG9uc2U6IGFueSkgPT4ge1xuICAgICAgc3dpdGNoIChyZXNwb25zZS5zdGF0dXNDb2RlKSB7XG4gICAgICBjYXNlIDIwMDpcbiAgICAgICAgbG9nZ2VyLmluZm8oYENvbm5jdGVkIHRvICR7cmVzcG9uc2UucmVxLmhvc3R9YCk7XG4gICAgICAgIGxvZ2dlci5pbmZvKGBEb3dubG9hZGluZyAke2ZpbGVuYW1lfWApO1xuICAgICAgICByZXNwb25zZS5vbignZGF0YScsIGNsaWVudC5vbkRhdGEpO1xuICAgICAgICByZXNwb25zZS5vbignZW5kJywgY2xpZW50Lm9uRW5kKTtcbiAgICAgICAgcmVzcG9uc2Uub24oJ2Nsb3NlJywgKCkgPT4gbG9nZ2VyLmluZm8oYERvbmVgKSk7XG4gICAgICAgIGJyZWFrO1xuXG4gICAgICBjYXNlIDMwMTpcbiAgICAgIGNhc2UgMzAyOlxuICAgICAgICByZXNwb25zZS5yZXN1bWUoKTtcbiAgICAgICAgbG9nZ2VyLmluZm8oYFJlc29sdmluZyAke3Jlc3BvbnNlLmhlYWRlcnMubG9jYXRpb259YCk7XG4gICAgICAgIHN0YXJ0UmVxdWVzdChyZXNwb25zZS5oZWFkZXJzLmxvY2F0aW9uLCBvblJlcXVlc3QpO1xuICAgICAgICBicmVhaztcblxuICAgICAgZGVmYXVsdDpcbiAgICAgICAgcmVzcG9uc2UucmVzdW1lKCk7XG4gICAgICAgIHJlamVjdChgRGlkIG5vdCBnZXQgYW4gT0sgZnJvbSB0aGUgc2VydmVyLiBDb2RlOiAke3Jlc3BvbnNlLnN0YXR1c0NvZGV9YCk7XG4gICAgICAgIGJyZWFrO1xuICAgICAgfVxuICAgIH07XG5cbiAgICBsb2dnZXIuaW5mbyhgUmVxdWVzdCB0byAke3VybH1gKTtcbiAgICBzdGFydFJlcXVlc3QodXJsLCBvblJlcXVlc3QpO1xuICB9KTtcbn1cbiIsIi8qXG4gKiBNSVQgTGljZW5zZVxuICpcbiAqIENvcHlyaWdodCAoYykgMjAyNSAgWXVyaWkgWWFrdWJpbiAoeXVyaWkueWFrdWJpbkBnbWFpbC5jb20pXG4gKlxuICogUGVybWlzc2lvbiBpcyBncmFudGVkIHRvIHVzZSwgY29weSwgbW9kaWZ5LCBhbmQgZGlzdHJpYnV0ZSB0aGlzIHNvZnR3YXJlXG4gKiB1bmRlciB0aGUgTUlUIExpY2Vuc2UuIFNlZSBMSUNFTlNFIGZpbGUgZm9yIGRldGFpbHMuXG4gKi9cblxuZXhwb3J0IGNvbnN0IGltcG9ydE1vZHVsZSA9IGFzeW5jIChuYW1lKSA9PiBpbXBvcnQoLyogd2VicGFja0lnbm9yZTogdHJ1ZSAqLyBuYW1lKTtcbiIsImltcG9ydCBmcyBmcm9tIFwibm9kZTpmc1wiO1xuaW1wb3J0IHBhdGggZnJvbSBcIm5vZGU6cGF0aFwiO1xuXG5pbXBvcnQgeyBmaWxlTGlzdCB9IGZyb20gXCJAL3V0aWxzL0ZpbGVTeXN0ZW1cIjtcbmltcG9ydCB7IGNyZWF0ZUxvZ2dlciB9IGZyb20gXCJAL2xvZ2dlclwiO1xuXG5jb25zdCBsb2dnZXIgPSBjcmVhdGVMb2dnZXIoaW1wb3J0Lm1ldGEudXJsKTtcblxuZXhwb3J0IGFzeW5jIGZ1bmN0aW9uIG1ha2VQYXRjaChzcmNEaXI6IHN0cmluZywgZGVzdERpcjogc3RyaW5nKSB7XG4gIGxvZ2dlci5pbmZvKGBNYWtlIHBhdGNoICR7c3JjRGlyfSB0byAke2Rlc3REaXJ9YCk7XG4gIGNvbnN0IGxpc3QgPSBhd2FpdCBmaWxlTGlzdChzcmNEaXIsIHsgcmVsYXRpdmU6IHNyY0RpciwgcmVjdXJzaXZlOiB0cnVlIH0pO1xuICBmb3IgKGNvbnN0IGl0ZXIgb2YgbGlzdCkge1xuICAgIGNvbnN0IHNvdXJjZSA9IHBhdGgucmVzb2x2ZShzcmNEaXIsIGl0ZXIpO1xuICAgIGNvbnN0IGRlc3RpbmF0aW9uID0gcGF0aC5yZXNvbHZlKGRlc3REaXIsIGl0ZXIpO1xuICAgIGF3YWl0IGZzLnByb21pc2VzLmNwKHNvdXJjZSwgZGVzdGluYXRpb24sIHsgZm9yY2U6IHRydWUgfSk7XG4gICAgbG9nZ2VyLmluZm8oYCBSZXBsYWNlZCAke2l0ZXJ9YCk7XG4gIH1cbn1cbiIsIi8qXG4gKiBNSVQgTGljZW5zZVxuICpcbiAqIENvcHlyaWdodCAoYykgMjAyNSAgWXVyaWkgWWFrdWJpbiAoeXVyaWkueWFrdWJpbkBnbWFpbC5jb20pXG4gKlxuICogUGVybWlzc2lvbiBpcyBncmFudGVkIHRvIHVzZSwgY29weSwgbW9kaWZ5LCBhbmQgZGlzdHJpYnV0ZSB0aGlzIHNvZnR3YXJlXG4gKiB1bmRlciB0aGUgTUlUIExpY2Vuc2UuIFNlZSBMSUNFTlNFIGZpbGUgZm9yIGRldGFpbHMuXG4gKi9cblxuY29uc3QgcmVxdWlyZUltcGwgPSBldmFsKFwicmVxdWlyZVwiKTtcblxuZXhwb3J0IGZ1bmN0aW9uIHJlcXVpcmVSZXNvbHZlKG5hbWU6IHN0cmluZykge1xuICBpZiAodHlwZW9mIGltcG9ydC5tZXRhLnJlc29sdmUgPT09ICdmdW5jdGlvbicpXG4gICAgcmV0dXJuIGltcG9ydC5tZXRhLnJlc29sdmUobmFtZSk7XG4gIGlmICh0eXBlb2YgcmVxdWlyZUltcGwgIT09ICd1bmRlZmluZWQnKVxuICAgIHJldHVybiByZXF1aXJlSW1wbC5yZXNvbHZlKG5hbWUpO1xuICB0aHJvdyBuZXcgRXJyb3IoXCJObyBjb21wYXRpYmxlIG1vZHVsZSByZXNvbHZlciBmb3VuZFwiKTtcbn1cblxuZXhwb3J0IHsgaW1wb3J0TW9kdWxlIH0gZnJvbSBcIi4vSW1wb3J0TW9kdWxlLm1qc1wiO1xuIiwiLypcbiAqIE1JVCBMaWNlbnNlXG4gKlxuICogQ29weXJpZ2h0IChjKSAyMDI1ICBZdXJpaSBZYWt1YmluICh5dXJpaS55YWt1YmluQGdtYWlsLmNvbSlcbiAqXG4gKiBQZXJtaXNzaW9uIGlzIGdyYW50ZWQgdG8gdXNlLCBjb3B5LCBtb2RpZnksIGFuZCBkaXN0cmlidXRlIHRoaXMgc29mdHdhcmVcbiAqIHVuZGVyIHRoZSBNSVQgTGljZW5zZS4gU2VlIExJQ0VOU0UgZmlsZSBmb3IgZGV0YWlscy5cbiAqL1xuXG5leHBvcnQgZnVuY3Rpb24gZXF1YWxWYWx1ZShhOiBhbnksIGI6IGFueSk6IGJvb2xlYW4ge1xuICBpZiAoYSA9PT0gYilcbiAgICByZXR1cm4gdHJ1ZTtcblxuICBpZiAoYSA9PT0gdW5kZWZpbmVkIHx8IGIgPT09IHVuZGVmaW5lZClcbiAgICByZXR1cm4gZmFsc2U7XG5cbiAgaWYgKHR5cGVvZiBhICE9PSBcIm9iamVjdFwiIHx8IHR5cGVvZiBiICE9PSBcIm9iamVjdFwiKVxuICAgIHJldHVybiBmYWxzZTtcblxuICBjb25zdCBrMSA9IE9iamVjdC5rZXlzKGEpO1xuICBjb25zdCBrMiA9IE9iamVjdC5rZXlzKGIpO1xuXG4gIGlmIChrMS5sZW5ndGggIT0gazIubGVuZ3RoKVxuICAgIHJldHVybiBmYWxzZTtcblxuICBmb3IgKGNvbnN0IGtleSBvZiBrMSkge1xuICAgIGlmICghT2JqZWN0Lmhhc093bihiLCBrZXkpIHx8ICFlcXVhbFZhbHVlKGFba2V5XSwgYltrZXldKSlcbiAgICAgIHJldHVybiBmYWxzZTtcbiAgfVxuXG4gIHJldHVybiB0cnVlO1xufVxuXG5leHBvcnQgZnVuY3Rpb24gY29weVZhbHVlKG86IGFueSk6IGFueSB7XG4gIGlmICghbyB8fCB0eXBlb2YgbyAhPT0gXCJvYmplY3RcIilcbiAgICByZXR1cm4gbztcbiAgaWYgKEFycmF5LmlzQXJyYXkobykpIHtcbiAgICBjb25zdCByZXN1bHQgPSBbXTtcbiAgICBmb3IgKGNvbnN0IGl0ZXIgb2YgbylcbiAgICAgIHJlc3VsdC5wdXNoKGNvcHlWYWx1ZShpdGVyKSk7XG4gICAgcmV0dXJuIHJlc3VsdDtcbiAgfVxuICBlbHNlIHtcbiAgICBjb25zdCByZXN1bHQgPSB7fSBhcyBhbnk7XG4gICAgZm9yIChjb25zdCBba2V5LHZhbF0gb2YgT2JqZWN0LmVudHJpZXMobykpXG4gICAgICByZXN1bHRba2V5XSA9IGNvcHlWYWx1ZSh2YWwpO1xuICAgIHJldHVybiByZXN1bHQ7XG4gIH1cbn1cblxuZXhwb3J0IGZ1bmN0aW9uIGFzc2lnbk9iamVjdCh0YXJnZXQ6IGFueSwgc291cmNlOiBhbnkpIHtcbiAgaWYgKEFycmF5LmlzQXJyYXkodGFyZ2V0KSAmJiBBcnJheS5pc0FycmF5KHNvdXJjZSkpIHtcbiAgICBmb3IgKGNvbnN0IGl0ZXIgb2Ygc291cmNlKVxuICAgICAgdGFyZ2V0LnB1c2goaXRlcik7XG4gIH1cbiAgZWxzZSB7XG4gICAgZm9yIChjb25zdCBrZXkgb2YgT2JqZWN0LmtleXMoc291cmNlKSkge1xuICAgICAgY29uc3QgYSA9IHRhcmdldFtrZXldLCBiID0gc291cmNlW2tleV07XG4gICAgICBpZiAoYSAmJiB0eXBlb2YgYSA9PT0gXCJvYmplY3RcIiAmJiBiICYmIHR5cGVvZiBiID09PSBcIm9iamVjdFwiKVxuICAgICAgICBhc3NpZ25PYmplY3QoYSwgYik7XG4gICAgICBlbHNlXG4gICAgICAgIHRhcmdldFtrZXldID0gY29weVZhbHVlKGIpO1xuICAgIH1cbiAgfVxufVxuXG5leHBvcnQgZnVuY3Rpb24gYXJyYXlXcmFwcGVyKHZhbHVlOiBhbnkpIHtcbiAgaWYgKHZhbHVlID09PSB1bmRlZmluZWQgfHwgQXJyYXkuaXNBcnJheSh2YWx1ZSkpXG4gICAgcmV0dXJuIHZhbHVlO1xuICByZXR1cm4gWyB2YWx1ZSBdO1xufVxuIiwiY29uc3QgZnMgPSByZXF1aXJlKCdmcycpO1xuXG5jbGFzcyBTZXR0aW5nc1N0b3JhZ2Uge1xuICBfZmlsZW5hbWU7XG4gIF9lbmNvZGluZyA9IFwidXRmLThcIjtcbiAgX3NldHRpbmdzO1xuICBfY3VycmVudDtcblxuICBjb25zdHJ1Y3RvcihmaWxlbmFtZSlcbiAge1xuICAgIHRoaXMuX2ZpbGVuYW1lID0gZmlsZW5hbWU7XG4gIH1cblxuICBhc3luYyBwdXNoKG5hbWUpXG4gIHtcbiAgICBpZiAoIXRoaXMuX3NldHRpbmdzKVxuICAgICAgYXdhaXQgdGhpcy5sb2FkKCk7XG4gICAgbGV0IG9iamVjdCA9IHRoaXMuX2N1cnJlbnQub2JqZWN0W25hbWVdO1xuICAgIGlmICghb2JqZWN0KVxuICAgICAgb2JqZWN0ID0gdGhpcy5fY3VycmVudC5vYmplY3RbbmFtZV0gPSB7fTtcbiAgICB0aGlzLl9jdXJyZW50ID0geyBwYXJlbnQ6IHRoaXMuX2N1cnJlbnQsIG9iamVjdCB9O1xuICB9XG5cbiAgYXN5bmMgcG9wKClcbiAge1xuICAgIGlmICghdGhpcy5fc2V0dGluZ3MpXG4gICAgICBhd2FpdCB0aGlzLmxvYWQoKTtcbiAgICBjb25zb2xlLmFzc2VydCh0aGlzLl9jdXJyZW50LnBhcmVudCk7XG4gICAgdGhpcy5fY3VycmVudCA9IHRoaXMuX2N1cnJlbnQucGFyZW50O1xuICB9XG5cbiAgYXN5bmMgZ2V0KG5hbWUpXG4gIHtcbiAgICBpZiAoIXRoaXMuX3NldHRpbmdzKVxuICAgICAgYXdhaXQgdGhpcy5sb2FkKCk7XG4gICAgcmV0dXJuIHRoaXMuX2N1cnJlbnQub2JqZWN0W25hbWVdO1xuICB9XG5cbiAgYXN5bmMgc2V0KG5hbWUsIHZhbHVlKVxuICB7XG4gICAgaWYgKCF0aGlzLl9zZXR0aW5ncylcbiAgICAgIGF3YWl0IHRoaXMubG9hZCgpO1xuICAgIHRoaXMuX2N1cnJlbnQub2JqZWN0W25hbWVdID0gdmFsdWU7XG4gICAgYXdhaXQgdGhpcy5zYXZlKCk7XG4gIH1cblxuICBhc3luYyBsb2FkKClcbiAge1xuICAgIHRyeSB7XG4gICAgICBjb25zdCBjb250ZW50ID0gYXdhaXQgZnMucHJvbWlzZXMucmVhZEZpbGUodGhpcy5fZmlsZW5hbWUsIHRoaXMuX2VuY29kaW5nKTtcbiAgICAgIHRoaXMuX3NldHRpbmdzID0gSlNPTi5wYXJzZShjb250ZW50KTtcbiAgICB9XG4gICAgY2F0Y2ggKGUpIHtcbiAgICAgIHRoaXMuX3NldHRpbmdzID0ge307XG4gICAgfVxuICAgIHRoaXMuX2N1cnJlbnQgPVxuICAgIHtcbiAgICAgIHBhcmVudDogbnVsbCxcbiAgICAgIG9iamVjdDogdGhpcy5fc2V0dGluZ3MsXG4gICAgfTtcbiAgfVxuXG4gIGFzeW5jIHNhdmUoKVxuICB7XG4gICAgY29uc3Qgc3BhY2UgPSAyO1xuICAgIGNvbnN0IGNvbnRlbnQgPSBKU09OLnN0cmluZ2lmeSh0aGlzLl9zZXR0aW5ncywgdW5kZWZpbmVkLCBzcGFjZSk7XG4gICAgYXdhaXQgZnMucHJvbWlzZXMud3JpdGVGaWxlKHRoaXMuX2ZpbGVuYW1lLCBjb250ZW50LCB7IGVuY29kaW5nOiB0aGlzLl9lbmNvZGluZywgZmxhZzogJ3cnLCBmbHVzaDogdHJ1ZSB9KTtcbiAgfVxufTtcblxubW9kdWxlLmV4cG9ydHMgPSB7XG4gIFNldHRpbmdzU3RvcmFnZSxcbn07XG4iLCIvKlxuICogTUlUIExpY2Vuc2VcbiAqXG4gKiBDb3B5cmlnaHQgKGMpIDIwMjUgIFl1cmlpIFlha3ViaW4gKHl1cmlpLnlha3ViaW5AZ21haWwuY29tKVxuICpcbiAqIFBlcm1pc3Npb24gaXMgZ3JhbnRlZCB0byB1c2UsIGNvcHksIG1vZGlmeSwgYW5kIGRpc3RyaWJ1dGUgdGhpcyBzb2Z0d2FyZVxuICogdW5kZXIgdGhlIE1JVCBMaWNlbnNlLiBTZWUgTElDRU5TRSBmaWxlIGZvciBkZXRhaWxzLlxuICovXG5cbmV4cG9ydCBmdW5jdGlvbiBlbnN1cmVCb29sZWFuKHZhbHVlOiBhbnkpIHtcbiAgaWYgKHR5cGVvZiB2YWx1ZSA9PT0gXCJib29sZWFuXCIpXG4gICAgcmV0dXJuIHZhbHVlO1xuICB0aHJvdyBuZXcgRXJyb3IoYFRoZSAnJHt2YWx1ZX0nIGlzIG5vdCBhIGJvb2xlYW5gKTtcbn1cblxuZXhwb3J0IGZ1bmN0aW9uIGVuc3VyZVN0cmluZyh2YWx1ZTogYW55KSB7XG4gIGlmICh0eXBlb2YgdmFsdWUgPT09IFwic3RyaW5nXCIpXG4gICAgcmV0dXJuIHZhbHVlO1xuICB0aHJvdyBuZXcgRXJyb3IoYFRoZSAnJHt2YWx1ZX0nIGlzIG5vdCBhIHN0cmluZ2ApO1xufVxuIiwibW9kdWxlLmV4cG9ydHMgPSByZXF1aXJlKFwiZnNcIik7IiwibW9kdWxlLmV4cG9ydHMgPSByZXF1aXJlKFwiaHR0cFwiKTsiLCJtb2R1bGUuZXhwb3J0cyA9IHJlcXVpcmUoXCJodHRwc1wiKTsiLCJtb2R1bGUuZXhwb3J0cyA9IHJlcXVpcmUoXCJub2RlOmNoaWxkX3Byb2Nlc3NcIik7IiwibW9kdWxlLmV4cG9ydHMgPSByZXF1aXJlKFwibm9kZTpmc1wiKTsiLCJtb2R1bGUuZXhwb3J0cyA9IHJlcXVpcmUoXCJub2RlOm9zXCIpOyIsIm1vZHVsZS5leHBvcnRzID0gcmVxdWlyZShcIm5vZGU6cGF0aFwiKTsiLCJtb2R1bGUuZXhwb3J0cyA9IHJlcXVpcmUoXCJub2RlOnVybFwiKTsiLCIvLyBUaGUgbW9kdWxlIGNhY2hlXG52YXIgX193ZWJwYWNrX21vZHVsZV9jYWNoZV9fID0ge307XG5cbi8vIFRoZSByZXF1aXJlIGZ1bmN0aW9uXG5mdW5jdGlvbiBfX3dlYnBhY2tfcmVxdWlyZV9fKG1vZHVsZUlkKSB7XG5cdC8vIENoZWNrIGlmIG1vZHVsZSBpcyBpbiBjYWNoZVxuXHR2YXIgY2FjaGVkTW9kdWxlID0gX193ZWJwYWNrX21vZHVsZV9jYWNoZV9fW21vZHVsZUlkXTtcblx0aWYgKGNhY2hlZE1vZHVsZSAhPT0gdW5kZWZpbmVkKSB7XG5cdFx0cmV0dXJuIGNhY2hlZE1vZHVsZS5leHBvcnRzO1xuXHR9XG5cdC8vIENyZWF0ZSBhIG5ldyBtb2R1bGUgKGFuZCBwdXQgaXQgaW50byB0aGUgY2FjaGUpXG5cdHZhciBtb2R1bGUgPSBfX3dlYnBhY2tfbW9kdWxlX2NhY2hlX19bbW9kdWxlSWRdID0ge1xuXHRcdC8vIG5vIG1vZHVsZS5pZCBuZWVkZWRcblx0XHQvLyBubyBtb2R1bGUubG9hZGVkIG5lZWRlZFxuXHRcdGV4cG9ydHM6IHt9XG5cdH07XG5cblx0Ly8gRXhlY3V0ZSB0aGUgbW9kdWxlIGZ1bmN0aW9uXG5cdF9fd2VicGFja19tb2R1bGVzX19bbW9kdWxlSWRdKG1vZHVsZSwgbW9kdWxlLmV4cG9ydHMsIF9fd2VicGFja19yZXF1aXJlX18pO1xuXG5cdC8vIFJldHVybiB0aGUgZXhwb3J0cyBvZiB0aGUgbW9kdWxlXG5cdHJldHVybiBtb2R1bGUuZXhwb3J0cztcbn1cblxuIiwiLy8gZ2V0RGVmYXVsdEV4cG9ydCBmdW5jdGlvbiBmb3IgY29tcGF0aWJpbGl0eSB3aXRoIG5vbi1oYXJtb255IG1vZHVsZXNcbl9fd2VicGFja19yZXF1aXJlX18ubiA9IChtb2R1bGUpID0+IHtcblx0dmFyIGdldHRlciA9IG1vZHVsZSAmJiBtb2R1bGUuX19lc01vZHVsZSA/XG5cdFx0KCkgPT4gKG1vZHVsZVsnZGVmYXVsdCddKSA6XG5cdFx0KCkgPT4gKG1vZHVsZSk7XG5cdF9fd2VicGFja19yZXF1aXJlX18uZChnZXR0ZXIsIHsgYTogZ2V0dGVyIH0pO1xuXHRyZXR1cm4gZ2V0dGVyO1xufTsiLCIvLyBkZWZpbmUgZ2V0dGVyIGZ1bmN0aW9ucyBmb3IgaGFybW9ueSBleHBvcnRzXG5fX3dlYnBhY2tfcmVxdWlyZV9fLmQgPSAoZXhwb3J0cywgZGVmaW5pdGlvbikgPT4ge1xuXHRmb3IodmFyIGtleSBpbiBkZWZpbml0aW9uKSB7XG5cdFx0aWYoX193ZWJwYWNrX3JlcXVpcmVfXy5vKGRlZmluaXRpb24sIGtleSkgJiYgIV9fd2VicGFja19yZXF1aXJlX18ubyhleHBvcnRzLCBrZXkpKSB7XG5cdFx0XHRPYmplY3QuZGVmaW5lUHJvcGVydHkoZXhwb3J0cywga2V5LCB7IGVudW1lcmFibGU6IHRydWUsIGdldDogZGVmaW5pdGlvbltrZXldIH0pO1xuXHRcdH1cblx0fVxufTsiLCJfX3dlYnBhY2tfcmVxdWlyZV9fLm8gPSAob2JqLCBwcm9wKSA9PiAoT2JqZWN0LnByb3RvdHlwZS5oYXNPd25Qcm9wZXJ0eS5jYWxsKG9iaiwgcHJvcCkpIiwiLy8gZGVmaW5lIF9fZXNNb2R1bGUgb24gZXhwb3J0c1xuX193ZWJwYWNrX3JlcXVpcmVfXy5yID0gKGV4cG9ydHMpID0+IHtcblx0aWYodHlwZW9mIFN5bWJvbCAhPT0gJ3VuZGVmaW5lZCcgJiYgU3ltYm9sLnRvU3RyaW5nVGFnKSB7XG5cdFx0T2JqZWN0LmRlZmluZVByb3BlcnR5KGV4cG9ydHMsIFN5bWJvbC50b1N0cmluZ1RhZywgeyB2YWx1ZTogJ01vZHVsZScgfSk7XG5cdH1cblx0T2JqZWN0LmRlZmluZVByb3BlcnR5KGV4cG9ydHMsICdfX2VzTW9kdWxlJywgeyB2YWx1ZTogdHJ1ZSB9KTtcbn07IiwiaW1wb3J0IHVybCBmcm9tIFwibm9kZTp1cmxcIjtcbmltcG9ydCBwYXRoIGZyb20gXCJub2RlOnBhdGhcIjtcblxuaW1wb3J0IHsgUnVuU2NyaXB0Q29udGV4dCB9IGZyb20gXCIuL1J1blNjcmlwdENvbnRleHQubWpzXCI7XG5pbXBvcnQgaW5pdEhhbmRsZXIgZnJvbSBcIi4vSW5pdEhhbmRsZXIubWpzXCI7XG5pbXBvcnQgYnVpbGRIYW5kbGVyIGZyb20gXCIuL0J1aWxkSGFuZGxlci5tanNcIjtcblxuY29uc3QgX19maWxlbmFtZSA9IHVybC5maWxlVVJMVG9QYXRoKGltcG9ydC5tZXRhLnVybCk7XG5jb25zdCBfX2Rpcm5hbWUgPSBwYXRoLmRpcm5hbWUoX19maWxlbmFtZSk7XG5cbmNvbnN0IGhhbmRsZXJNYXAgPSB7XG4gIGRlZmF1bHQ6IGJ1aWxkSGFuZGxlcixcbiAgaW5pdDogaW5pdEhhbmRsZXIsXG4gIGJ1aWxkOiBidWlsZEhhbmRsZXIsXG59O1xuXG5mdW5jdGlvbiB0b09wdGlvbktleShuYW1lKVxue1xuICBpZiAoIW5hbWUuc3RhcnRzV2l0aChcIi0tXCIpKVxuICAgIHJldHVybiBudWxsO1xuXG4gIG5hbWUgPSBuYW1lLnN1YnN0cmluZygyKS50b0xvd2VyQ2FzZSgpO1xuICBpZiAoIW5hbWUubGVuZ3RoKVxuICAgIHJldHVybiBudWxsO1xuXG4gIGxldCBrZXkgPSBuYW1lLmNoYXJBdCgwKTtcbiAgaWYgKCFrZXkubWF0Y2goL1thLXpdLykpXG4gICAgcmV0dXJuIG51bGw7XG5cbiAgbGV0IGh5cGhlbiA9IDA7XG4gIGZvciAobGV0IGkgPSAxOyBpIDwgbmFtZS5sZW5ndGg7IGkrKykge1xuICAgIGNvbnN0IGNoID0gbmFtZS5jaGFyQXQoaSk7XG4gICAgaWYgKGNoLm1hdGNoKC9bYS16MC05XS8pKSB7XG4gICAgICBrZXkgKz0gKGh5cGhlbiA/IGNoLnRvVXBwZXJDYXNlKCkgOiBjaClcbiAgICAgIGh5cGhlbiA9IDA7XG4gICAgfVxuICAgIGVsc2UgaWYgKGNoID09IFwiLVwiKSB7XG4gICAgICBpZiAoKytoeXBoZW4gPiAxKVxuICAgICAgICByZXR1cm4gbnVsbDtcbiAgICB9XG4gIH1cblxuICByZXR1cm4gaHlwaGVuID8gbnVsbCA6IGtleTtcbn1cblxuYXN5bmMgZnVuY3Rpb24gcnVuU2NyaXB0KClcbntcbiAgY29uc3Qgb3B0aW9ucyA9IHtcbiAgICBoYW5kbGVyOiBcImRlZmF1bHRcIixcbiAgICBub2RlRXhlY3V0YWJsZTogbnVsbCxcbiAgICBjdXJyZW50U2NyaXB0OiBudWxsLFxuICAgIHNjcmlwdERpcjogX19kaXJuYW1lLFxuICAgIHJvb3REaXI6IHBhdGguZGlybmFtZShfX2Rpcm5hbWUpLFxuICAgIHdvcmtEaXI6IHByb2Nlc3MuY3dkKCksXG4gICAgZW52OiB7fSxcbiAgfTtcblxuICBpZiAocHJvY2Vzcy5hcmd2Lmxlbmd0aCA+IDApXG4gICAgb3B0aW9ucy5ub2RlRXhlY3V0YWJsZSA9IHByb2Nlc3MuYXJndlswXTtcbiAgaWYgKHByb2Nlc3MuYXJndi5sZW5ndGggPiAxKVxuICAgIG9wdGlvbnMuY3VycmVudFNjcmlwdCA9IHByb2Nlc3MuYXJndlsxXTtcblxuICBsZXQgYXJnc0luZGV4ID0gcHJvY2Vzcy5hcmd2Lmxlbmd0aDtcbiAgaWYgKHByb2Nlc3MuYXJndi5sZW5ndGggPiAyKSB7XG4gICAgYXJnc0luZGV4ID0gMjtcbiAgICBjb25zdCBoYW5kbGVyID0gcHJvY2Vzcy5hcmd2W2FyZ3NJbmRleF07XG4gICAgaWYgKCFoYW5kbGVyLnN0YXJ0c1dpdGgoXCItLVwiKSkge1xuICAgICAgb3B0aW9ucy5oYW5kbGVyID0gaGFuZGxlcjtcbiAgICAgIGFyZ3NJbmRleCsrO1xuICAgIH1cbiAgfVxuXG4gIGlmICghaGFuZGxlck1hcC5oYXNPd25Qcm9wZXJ0eShvcHRpb25zLmhhbmRsZXIpKSB7XG4gICAgY29uc3Qgc2NyaXB0TmFtZSA9IG9wdGlvbnMuY3VycmVudFNjcmlwdCA/IHBhdGguYmFzZW5hbWUob3B0aW9ucy5jdXJyZW50U2NyaXB0KSA6IFwid2FzbXV4XCI7XG4gICAgdGhyb3cgYFRoZSAke3NjcmlwdE5hbWV9IGRvZXMgbm90IHN1cHBvcnQgdGhlICR7b3B0aW9ucy5oYW5kbGVyfSBjb21tYW5kYDtcbiAgfVxuXG4gIGxldCBsYXN0S2V5ID0gbnVsbDtcbiAgd2hpbGUgKGFyZ3NJbmRleCA8IHByb2Nlc3MuYXJndi5sZW5ndGgpIHtcbiAgICBjb25zdCBpdGVyID0gcHJvY2Vzcy5hcmd2W2FyZ3NJbmRleCsrXTtcbiAgICBpZiAoaXRlci5zdGFydHNXaXRoKFwiLS1cIikpIHtcbiAgICAgIGNvbnN0IGtleSA9IHRvT3B0aW9uS2V5KGl0ZXIpO1xuICAgICAgaWYgKCFrZXkpXG4gICAgICAgIHRocm93IGBPcHRpb24gJHtpdGVyfSBpcyBub3Qgc3VwcG9ydGVkYDtcbiAgICAgIGlmIChvcHRpb25zLmVudi5oYXNPd25Qcm9wZXJ0eShrZXkpKVxuICAgICAgICB0aHJvdyBgQ2Fubm90IHNwZWNpZnkgdGhlIHNhbWUgb3B0aW9uICcke2l0ZXJ9JyBtb3JlIHRoYW4gb25jZWA7XG4gICAgICBsYXN0S2V5ID0ga2V5O1xuICAgICAgb3B0aW9ucy5lbnZba2V5XSA9IHRydWU7XG4gICAgfVxuICAgIGVsc2UgaWYgKGxhc3RLZXkpIHtcbiAgICAgIGNvbnN0IHZhbHVlID0gb3B0aW9ucy5lbnZbbGFzdEtleV07XG4gICAgICBpZiAodHlwZW9mIHZhbHVlID09PSAnYm9vbGVhbicpXG4gICAgICAgIG9wdGlvbnMuZW52W2xhc3RLZXldID0gaXRlcjtcbiAgICAgIGVsc2UgaWYgKHR5cGVvZiB2YWx1ZSA9PT0gJ3N0cmluZycpXG4gICAgICAgIG9wdGlvbnMuZW52W2xhc3RLZXldID0gWyB2YWx1ZSwgaXRlciBdO1xuICAgICAgZWxzZVxuICAgICAgICB2YWx1ZS5wdXNoKGl0ZXIpO1xuICAgIH1cbiAgICBlbHNlIHtcbiAgICAgIHRocm93IGBOZWVkIHRvIHNwZWNpZnkgdGhlIG9wdGlvbiBuYW1lIGJlZm9yZSAnJHtpdGVyfScgcGFyYW1ldGVyYDtcbiAgICB9XG4gIH1cblxuICBjb25zdCBjb250ZXh0ID0gbmV3IFJ1blNjcmlwdENvbnRleHQob3B0aW9ucyk7XG5cbiAgbGV0IGhhbmRsZXIgPSBoYW5kbGVyTWFwW29wdGlvbnMuaGFuZGxlcl07XG4gIGlmICh0eXBlb2YgaGFuZGxlciA9PT0gXCJzdHJpbmdcIikge1xuICAgIGNvbnN0IGZpbGVuYW1lID0gcGF0aC5pc0Fic29sdXRlKGhhbmRsZXIpID8gaGFuZGxlciA6IHBhdGgucmVzb2x2ZShfX2Rpcm5hbWUsIGhhbmRsZXIpO1xuICAgIGNvbnN0IGZpbGVVcmwgPSB1cmwucGF0aFRvRmlsZVVSTChmaWxlbmFtZSk7XG4gICAgY29uc3QgbW9kdWxlID0gYXdhaXQgaW1wb3J0KGZpbGVVcmwpO1xuICAgIGhhbmRsZXIgPSBtb2R1bGUuZGVmYXVsdDtcbiAgfVxuXG4gIGNvbnN0IHJlcyA9IGhhbmRsZXIoY29udGV4dCk7XG4gIGlmIChyZXMgaW5zdGFuY2VvZiBQcm9taXNlKSB7XG4gICAgYXdhaXQgcmVzO1xuICB9XG59XG5cbnJ1blNjcmlwdCgpLnRoZW4oKCkgPT4gcHJvY2Vzcy5leGl0KDApKS5jYXRjaCgoZSkgPT4ge1xuICBpZiAoZSBpbnN0YW5jZW9mIEVycm9yKSB7XG4gICAgY29uc29sZS5lcnJvcihlLnN0YWNrKTtcbiAgfVxuICBlbHNlIHtcbiAgICBjb25zb2xlLmVycm9yKGUpO1xuICB9XG4gIHByb2Nlc3MuZXhpdCgxKTtcbn0pO1xuIl0sIm5hbWVzIjpbXSwic291cmNlUm9vdCI6IiJ9