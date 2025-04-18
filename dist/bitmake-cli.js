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
const { UnknownTarget } = __webpack_require__(/*! ./UnknownTarget.js */ "./src/bitmake/UnknownTarget.js");
const { GoalCollection } = __webpack_require__(/*! @/core/GoalCollection */ "./src/core/GoalCollection.ts");
const { InterfaceObjects } = __webpack_require__(/*! @/core/InterfaceObjects */ "./src/core/InterfaceObjects.ts");
const { SourceFile } = __webpack_require__(/*! @/core/SourceFile */ "./src/core/SourceFile.ts");
const { ObjectLibrary, StaticLibrary, SharedLibrary, Executable } = __webpack_require__(/*! ./Target.js */ "./src/bitmake/Target.js");
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

/***/ "./src/bitmake/Target.js":
/*!*******************************!*\
  !*** ./src/bitmake/Target.js ***!
  \*******************************/
/***/ ((module, __unused_webpack_exports, __webpack_require__) => {

"use strict";


const { ensureString } = __webpack_require__(/*! @/utils/StrictType */ "./src/utils/StrictType.ts");
const { SourceFile } = __webpack_require__(/*! @/core/SourceFile */ "./src/core/SourceFile.ts");
const { SourceFileList } = __webpack_require__(/*! @/core/SourceFileList */ "./src/core/SourceFileList.ts");
const { IncludeDirectory } = __webpack_require__(/*! @/core/IncludeDirectory */ "./src/core/IncludeDirectory.ts");
const { InterfaceTarget } = __webpack_require__(/*! @/core/InterfaceTarget */ "./src/core/InterfaceTarget.ts");
const { InterfaceIncludes } = __webpack_require__(/*! @/core/InterfaceIncludes */ "./src/core/InterfaceIncludes.ts");
const { InterfaceObjects } = __webpack_require__(/*! @/core/InterfaceObjects */ "./src/core/InterfaceObjects.ts");
const { AbsolutePath } = __webpack_require__(/*! @/core/Path */ "./src/core/Path.ts");

const NAME                = Symbol("NAME");
const TARGET_SCOPE        = Symbol("TARGET_SCOPE");
const OUTPUT_NAME         = Symbol("OUTPUT_NAME");
const COMPILE_OPTIONS     = Symbol("COMPILE_OPTIONS");
const PREFIX              = Symbol("PREFIX");
const SUFFIX              = Symbol("SUFFIX");
const LINK_OPTIONS        = Symbol("LINK_OPTIONS");
const INCLUDES            = Symbol("INCLUDES");
const DEFINES             = Symbol("DEFINES");
const SOURCES             = Symbol("SOURCES");
const LIBRARIES           = Symbol("LIBRARIES");
const POSITION_INDEPENDENT_CODE = Symbol("POSITION_INDEPENDENT_CODE");

const reservedTagetNames = [ "all", "install" ];
function ensureTargetName(name) {
  if (typeof name !== "string")
    throw new Error(`Target "${name}" is not string type`);
  if (reservedTagetNames.includes(name))
    throw new Error(`Target "${name}" is reserved name`);
  return name;
}

function BaseTarget(scope, name) {
  this[NAME] = ensureTargetName(name);
  this[TARGET_SCOPE] = scope.clone();
  this[OUTPUT_NAME] = ensureString(name);
  this[PREFIX] = "";
  this[SUFFIX] = "";
  this[COMPILE_OPTIONS] = [];
  this[LINK_OPTIONS] = [];
  this[SOURCES] = [];
  this[LIBRARIES] = [];
  this[INCLUDES] = scope.INCLUDES.map(VALUE => { return {VALUE} });
  this[DEFINES] = [];
  this[POSITION_INDEPENDENT_CODE] = scope.POSITION_INDEPENDENT_CODE;
}

BaseTarget.prototype = Object.create(Object.prototype, {
  constructor: {
    value: BaseTarget,
    enumerable: false,
  },
  NAME: {
    get() { return this[NAME]; },
    enumerable: true,
  },
  TARGET_SCOPE: {
    get() { return this[TARGET_SCOPE]; },
    enumerable: false,
  },
  OUTPUT_NAME: {
    get() { return this[OUTPUT_NAME]; },
    set(value) { this[OUTPUT_NAME] = ensureString(value); },
    enumerable: true,
  },
  COMPILE_OPTIONS: {
    get() { return this[COMPILE_OPTIONS]; },
    enumerable: true,
  },
  PREFIX: {
    get() { return this[PREFIX]; },
    set(value) { this[PREFIX] = value; },
    enumerable: true,
  },
  SUFFIX: {
    get() { return this[SUFFIX]; },
    set(value) { this[SUFFIX] = value; },
    enumerable: true,
  },
  LINK_OPTIONS: {
    get() { return this[LINK_OPTIONS]; },
    enumerable: true,
  },
  INCLUDES: {
    get() { return this[INCLUDES]; },
    enumerable: true,
  },
  DEFINES: {
    get() { return this[DEFINES]; },
    enumerable: true,
  },
  SOURCES: {
    get() { return this[SOURCES]; },
    enumerable: true,
  },
  LIBRARIES: {
    get() { return this[LIBRARIES]; },
    enumerable: true,
  },
  FILE_DIR: {
    get() { return this[TARGET_SCOPE].BINARY_DIR; },
    enumerable: true,
  },
  FILE_NAME: {
    get() { return this.PREFIX + this.OUTPUT_NAME + this.SUFFIX; },
    enumerable: true,
  },
  FILE: {
    get() { return this.FILE_DIR.join(this.FILE_NAME); },
    enumerable: true,
  },
  POSITION_INDEPENDENT_CODE: {
    get() { return this[POSITION_INDEPENDENT_CODE]; },
    set(value) { this[POSITION_INDEPENDENT_CODE] = value; },
    enumerable: true,
  },
});

BaseTarget.prototype.addSources = function(...sources) {
  for (let it of sources.flat(1)) {
    if (it instanceof InterfaceObjects || it instanceof SourceFile)
      /* */;
    else if (typeof it === "string" || AbsolutePath.isAbsolute(it))
      it = SourceFile.create(this[TARGET_SCOPE], it);
    else
      throw new Error(`Not support instance ${it}`);

    if (it instanceof SourceFile && it.LANGUAGE) {
      const rfile1 = this[TARGET_SCOPE].BINARY_DIR.relative(it.FILE);
      const rfile2 = this[TARGET_SCOPE].SOURCE_DIR.relative(it.FILE);
      const rfile = (rfile2.length < rfile1.length ? rfile2 : rfile1).replace("../", "__/");
      it.OBJECT_FILE = this[TARGET_SCOPE].BINARY_DIR.join("MakeFiles", this[NAME] + ".dir",  rfile + ".obj");
    }

    this[SOURCES].push(it);
  }
}

BaseTarget.prototype.addIncludes = function(...includes) {
  for (const it of includes.flat(1)) {
    let VALUE;
    if (it instanceof InterfaceIncludes)
      VALUE = it;
    else if (typeof it === "string" || AbsolutePath.isAbsolute(it))
      VALUE = IncludeDirectory.create(it, this[TARGET_SCOPE].SOURCE_DIR);
    else
      throw new Error(`Not support instance ${it}`);
    this[INCLUDES].push({VALUE}); // IncludeDirectory[]
  }
}

BaseTarget.prototype.addLibraries = function(...libraries) {
  for (const it of libraries.flat(1)) {
    this[LIBRARIES].push({ VALUE: InterfaceTarget.ensureInstance(it) });
  }
}

BaseTarget.prototype.addCompileOptions = function(...options) {
  for (const it of options.flat(1)) {
    this[COMPILE_OPTIONS].push({ VALUE: it });
  }
}

BaseTarget.prototype.addLinkOptions = function(...options) {
  for (const it of options.flat(1)) {
    this[LINK_OPTIONS].push({ VALUE: it });
  }
}

BaseTarget.prototype.getSourceFiles = function(...sources) {
  const result = [];
  for (const it of sources.flat(1)) {
    const filename = this[TARGET_SCOPE].SOURCE_DIR.resolve(it).toString();
    const src = this[SOURCES].find(i => i instanceof SourceFile && i.FILE.toString() === filename);
    if (!src)
      throw new Error(`Cannot find "${it}"`);
    result.push(src);
  }

  if (result.length)
    return SourceFileList.create(this[TARGET_SCOPE], result);

  return SourceFileList.create(this[TARGET_SCOPE], this[SOURCES].filter(i => i instanceof SourceFile));
}

BaseTarget.prototype.setPrefix = function(prefix) {
  this[PREFIX] = prefix;
}

BaseTarget.prototype.setSuffix = function(suffix) {
  this[SUFFIX] = suffix;
}

BaseTarget.prototype.setOutputName = function(outputName) {
  this[OUTPUT_NAME] = outputName;
}

BaseTarget.prototype.addDefinitions = function(...definitions) {
  for (const VALUE of definitions.flat(1))
    this[DEFINES].push({ VALUE });
}

BaseTarget.prototype.toJSON = function() {
  const json = {};
  for (const key in this)
    json[key] = this[key];
  return json;
}

function BaseLibrary(scope, name) {
  BaseTarget.call(this, scope, name);
}

BaseLibrary.prototype = Object.create(BaseTarget.prototype, {
  constructor: {
    value: BaseLibrary,
    enumerable: false,
    writable: true,
    configurable: true,
  },
});

BaseLibrary.prototype.addPublicIncludes = function(...includes) {
  for (const it of includes.flat(1)) {
    let VALUE;
    if (it instanceof InterfaceIncludes)
      VALUE = it;
    else if (typeof it === "string" || AbsolutePath.isAbsolute(it))
      VALUE = IncludeDirectory.create(it, this[TARGET_SCOPE].SOURCE_DIR);
    else
      throw new Error(`Not support instance ${it}`);
    this[INCLUDES].push({VALUE, PUBLIC_ONLY: true}); // IncludeDirectory[]
  }
}

BaseLibrary.prototype.addPublicDefinitions = function(...definitions) {
  for (const VALUE of definitions.flat(1))
    this[DEFINES].push({ VALUE, PUBLIC_ONLY: true });
}

BaseLibrary.prototype.addPublicLibraries = function(...libraries) {
  for (const it of libraries.flat(1)) {
    this[LIBRARIES].push({VALUE: InterfaceTarget.ensureInstance(it), PUBLIC_ONLY: true});
  }
}

BaseLibrary.prototype.addPublicCompileOptions = function(...options) {
  for (const it of options.flat(1)) {
    this[COMPILE_OPTIONS].push({ VALUE: it, PUBLIC_ONLY: true });
  }
}

BaseLibrary.prototype.addPublicLinkOptions = function(...options) {
  for (const it of options.flat(1)) {
    this[LINK_OPTIONS].push({ VALUE: it, PUBLIC_ONLY: true });
  }
}

function ObjectLibrary(scope, name) {
  BaseLibrary.call(this, scope, name);
  this.PREFIX = scope.OBJECT_LIBRARY_PREFIX;
  this.SUFFIX = scope.OBJECT_LIBRARY_SUFFIX;
  this.LINK_OPTIONS.push(...scope.OBJECT_LINKER_FLAGS.map(VALUE => { return { VALUE } }));
}

ObjectLibrary.prototype = Object.create(BaseLibrary.prototype, {
  constructor: {
    value: ObjectLibrary,
    enumerable: false,
    writable: true,
    configurable: true,
  },
});

ObjectLibrary.create = (scope, name) => {
  return Object.seal(new ObjectLibrary(scope, name));
}

function StaticLibrary(scope, name) {
  BaseLibrary.call(this, scope, name);
  this.PREFIX = scope.STATIC_LIBRARY_PREFIX;
  this.SUFFIX = scope.STATIC_LIBRARY_SUFFIX;
  this.LINK_OPTIONS.push(...scope.STATIC_LINKER_FLAGS.map(VALUE => { return { VALUE } }));
}

StaticLibrary.prototype = Object.create(BaseLibrary.prototype, {
  constructor: {
    value: StaticLibrary,
    enumerable: false,
    writable: true,
    configurable: true,
  },
});

StaticLibrary.create = (scope, name) => {
  return Object.seal(new StaticLibrary(scope, name));
}

function SharedLibrary(scope, name) {
  BaseLibrary.call(this, scope, name);
  this.PREFIX = scope.SHARED_LIBRARY_PREFIX;
  this.SUFFIX = scope.SHARED_LIBRARY_SUFFIX;
  this.LINK_OPTIONS.push(...scope.SHARED_LINKER_FLAGS.map(VALUE => { return { VALUE } }));
}

SharedLibrary.prototype = Object.create(BaseLibrary.prototype, {
  constructor: {
    value: SharedLibrary,
    enumerable: false,
    writable: true,
    configurable: true,
  },
});

SharedLibrary.create = (scope, name) => {
  return Object.seal(new SharedLibrary(scope, name));
}

function Executable(scope, name) {
  BaseTarget.call(this, scope, name);
  this.SUFFIX = scope.EXECUTABLE_SUFFIX;
  this.LINK_OPTIONS.push(...scope.EXE_LINKER_FLAGS.map(VALUE => { return { VALUE } }));
}

Executable.prototype = Object.create(BaseTarget.prototype, {
  constructor: {
    value: Executable,
    enumerable: false,
    writable: true,
    configurable: true,
  },
});

Executable.create = (scope, name) => {
  return Object.seal(new Executable(scope, name));
}

module.exports = {
  BaseTarget,
  BaseLibrary,
  ObjectLibrary,
  StaticLibrary,
  SharedLibrary,
  Executable,
};


/***/ }),

/***/ "./src/bitmake/UnknownTarget.js":
/*!**************************************!*\
  !*** ./src/bitmake/UnknownTarget.js ***!
  \**************************************/
/***/ ((module) => {

"use strict";


const NAME     = Symbol("NAME");
const INCLUDES = Symbol("INCLUDES");
const SOURCES  = Symbol("SOURCES");
const DEFINES = Symbol("DEFINES");
const COMPILE_OPTIONS = Symbol("COMPILE_OPTIONS");
const LINK_OPTIONS = Symbol("LINK_OPTIONS");

function UnknownTarget(name) {
  this[NAME] = name;
  this[INCLUDES] = [];
  this[SOURCES] = [];
  this[DEFINES] = [];
  this[COMPILE_OPTIONS] = [];
  this[LINK_OPTIONS] = [];
}

UnknownTarget.create = (name) => {
  return Object.seal(new UnknownTarget(name));
}

UnknownTarget.ensureInstance = (value) => {
  if (value instanceof UnknownTarget)
    return value;
  throw new Error(`The '${value}' is not a UnknownTarget`);
}

UnknownTarget.prototype = Object.create(Object.prototype, {
  constructor: {
    value: UnknownTarget,
    enumerable: false,
  },
  NAME: {
    get () { return this[NAME]; },
    enumerable: true,
  },
  INCLUDES: {
    get () { return this[INCLUDES]; },
    enumerable: true,
  },
  SOURCES: {
    get () { return this[SOURCES]; },
    enumerable: true,
  },
  DEFINES: {
    get () { return this[DEFINES]; },
    enumerable: true,
  },
  COMPILE_OPTIONS: {
    get () { return this[COMPILE_OPTIONS]; },
    enumerable: true,
  },
  LINK_OPTIONS: {
    get () { return this[LINK_OPTIONS]; },
    enumerable: true,
  },
});

UnknownTarget.prototype.toJSON = function() {
  const json = {};
  for (const key in this)
    json[key] = this[key];
  return json;
}

UnknownTarget.prototype.toString = function() {
  return "${" + this[NAME] + "}";
}

module.exports = {
  UnknownTarget,
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
const { ObjectLibrary, StaticLibrary, SharedLibrary, Executable, BaseTarget } = __webpack_require__(/*! ./Target.js */ "./src/bitmake/Target.js");
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
//# sourceMappingURL=data:application/json;charset=utf-8;base64,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QTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLHlDQUF5QyxFQUFFO0FBQzNDOztBQUVBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBLHdCQUF3QjtBQUN4QjtBQUNBLG1DQUFtQztBQUNuQztBQUNBLHdDQUF3QztBQUN4QztBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsNEJBQTRCLFFBQVE7QUFDcEM7O0FBRUE7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7O0FBRUE7O0FBRUE7QUFDQTs7QUFFQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7O0FBRUE7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7O0FBRUE7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTs7QUFFQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBOztBQUVB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QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBLGtCQUFrQixpQkFBaUI7QUFDbkM7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLGFBQWEsOENBQVk7QUFDekI7QUFDQSxXQUFXO0FBQ1g7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0EsK0NBQStDLCtDQUFhO0FBQzVELGlCQUFpQixZQUFZLHVCQUF1QixpQkFBaUI7QUFDckU7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0Esd0JBQXdCLE1BQU07QUFDOUI7QUFDQSxpREFBaUQsS0FBSztBQUN0RDtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLHVEQUF1RCxLQUFLO0FBQzVEO0FBQ0E7O0FBRUEsc0JBQXNCLG1FQUFnQjs7QUFFdEM7QUFDQTtBQUNBLHFCQUFxQixpREFBZSxzQkFBc0IsOENBQVk7QUFDdEUsb0JBQW9CLG1EQUFpQjtBQUNyQyx5QkFBeUIsNENBQU8sT0FBTyxDQUFDO0FBQ3hDO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsQ0FBQyIsInNvdXJjZXMiOlsid2VicGFjazovL2JpdG1ha2UvLi9zcmMvIGxhenkgc3RyaWN0IG5hbWVzcGFjZSBvYmplY3QiLCJ3ZWJwYWNrOi8vYml0bWFrZS8uL3NyYy9CdWlsZEhhbmRsZXIubWpzIiwid2VicGFjazovL2JpdG1ha2UvLi9zcmMvQ29uc3RhbnRzLmpzIiwid2VicGFjazovL2JpdG1ha2UvLi9zcmMvSW5pdEhhbmRsZXIubWpzIiwid2VicGFjazovL2JpdG1ha2UvLi9zcmMvTWFrZVNjcmlwdENvbnRleHQuanMiLCJ3ZWJwYWNrOi8vYml0bWFrZS8uL3NyYy9SdW5TY3JpcHRDb250ZXh0Lm1qcyIsIndlYnBhY2s6Ly9iaXRtYWtlLy4vc3JjL2JpdG1ha2UvR2xvYmFsQ29udGV4dC5qcyIsIndlYnBhY2s6Ly9iaXRtYWtlLy4vc3JjL2JpdG1ha2UvU3lzdGVtU2NyaXB0cy9jb25maWd1cmVfZmlsZS5qcyIsIndlYnBhY2s6Ly9iaXRtYWtlLy4vc3JjL2JpdG1ha2UvU3lzdGVtU2NyaXB0cy9pbnN0YWxsX3NjcmlwdC5qcyIsIndlYnBhY2s6Ly9iaXRtYWtlLy4vc3JjL2JpdG1ha2UvU3lzdGVtVmFyaWFibGVzLmpzIiwid2VicGFjazovL2JpdG1ha2UvLi9zcmMvYml0bWFrZS9UYXJnZXQuanMiLCJ3ZWJwYWNrOi8vYml0bWFrZS8uL3NyYy9iaXRtYWtlL1Vua25vd25UYXJnZXQuanMiLCJ3ZWJwYWNrOi8vYml0bWFrZS8uL3NyYy9iaXRtYWtlL1VzZXJDb250ZXh0LmpzIiwid2VicGFjazovL2JpdG1ha2UvLi9zcmMvY21ha2UvQ29uc3RhbnRzLnRzIiwid2VicGFjazovL2JpdG1ha2UvLi9zcmMvY21ha2UvSGVscGVyLnRzIiwid2VicGFjazovL2JpdG1ha2UvLi9zcmMvY29yZS9DdXN0b21TY3JpcHQudHMiLCJ3ZWJwYWNrOi8vYml0bWFrZS8uL3NyYy9jb3JlL0dvYWxDb2xsZWN0aW9uLnRzIiwid2VicGFjazovL2JpdG1ha2UvLi9zcmMvY29yZS9JbmNsdWRlRGlyZWN0b3J5LnRzIiwid2VicGFjazovL2JpdG1ha2UvLi9zcmMvY29yZS9JbnN0YWxsRW50aXR5LnRzIiwid2VicGFjazovL2JpdG1ha2UvLi9zcmMvY29yZS9JbnRlcmZhY2VJbmNsdWRlcy50cyIsIndlYnBhY2s6Ly9iaXRtYWtlLy4vc3JjL2NvcmUvSW50ZXJmYWNlT2JqZWN0cy50cyIsIndlYnBhY2s6Ly9iaXRtYWtlLy4vc3JjL2NvcmUvSW50ZXJmYWNlU2NyaXB0LnRzIiwid2VicGFjazovL2JpdG1ha2UvLi9zcmMvY29yZS9JbnRlcmZhY2VUYXJnZXQudHMiLCJ3ZWJwYWNrOi8vYml0bWFrZS8uL3NyYy9jb3JlL1BhdGgudHMiLCJ3ZWJwYWNrOi8vYml0bWFrZS8uL3NyYy9jb3JlL1BsdWdpbkNvbnRleHQudHMiLCJ3ZWJwYWNrOi8vYml0bWFrZS8uL3NyYy9jb3JlL1NjcmlwdENvbGxlY3Rpb24udHMiLCJ3ZWJwYWNrOi8vYml0bWFrZS8uL3NyYy9jb3JlL1NvdXJjZUZpbGUudHMiLCJ3ZWJwYWNrOi8vYml0bWFrZS8uL3NyYy9jb3JlL1NvdXJjZUZpbGVMaXN0LnRzIiwid2VicGFjazovL2JpdG1ha2UvLi9zcmMvY29yZS9TeXN0ZW1WYXJpYWJsZXMudHMiLCJ3ZWJwYWNrOi8vYml0bWFrZS8uL3NyYy9jb3JlL1RhcmdldENvbGxlY3Rpb24udHMiLCJ3ZWJwYWNrOi8vYml0bWFrZS8uL3NyYy9jb3JlL1R5cGVzLnRzIiwid2VicGFjazovL2JpdG1ha2UvLi9zcmMvbG9nZ2VyL2luZGV4LnRzIiwid2VicGFjazovL2JpdG1ha2UvLi9zcmMvdXRpbHMvQ01ha2UuanMiLCJ3ZWJwYWNrOi8vYml0bWFrZS8uL3NyYy91dGlscy9DaGlsZFByb2Nlc3MudHMiLCJ3ZWJwYWNrOi8vYml0bWFrZS8uL3NyYy91dGlscy9GaWxlU3lzdGVtLnRzIiwid2VicGFjazovL2JpdG1ha2UvLi9zcmMvdXRpbHMvSHR0cFJlcXVlc3QudHMiLCJ3ZWJwYWNrOi8vYml0bWFrZS8uL3NyYy91dGlscy9JbXBvcnRNb2R1bGUubWpzIiwid2VicGFjazovL2JpdG1ha2UvLi9zcmMvdXRpbHMvTWFrZVBhdGNoLnRzIiwid2VicGFjazovL2JpdG1ha2UvLi9zcmMvdXRpbHMvTW9kdWxlLnRzIiwid2VicGFjazovL2JpdG1ha2UvLi9zcmMvdXRpbHMvUHJpbWl0aXZlcy50cyIsIndlYnBhY2s6Ly9iaXRtYWtlLy4vc3JjL3V0aWxzL1NldHRpbmdzU3RvcmFnZS5qcyIsIndlYnBhY2s6Ly9iaXRtYWtlLy4vc3JjL3V0aWxzL1N0cmljdFR5cGUudHMiLCJ3ZWJwYWNrOi8vYml0bWFrZS9leHRlcm5hbCBub2RlLWNvbW1vbmpzIFwiZnNcIiIsIndlYnBhY2s6Ly9iaXRtYWtlL2V4dGVybmFsIG5vZGUtY29tbW9uanMgXCJodHRwXCIiLCJ3ZWJwYWNrOi8vYml0bWFrZS9leHRlcm5hbCBub2RlLWNvbW1vbmpzIFwiaHR0cHNcIiIsIndlYnBhY2s6Ly9iaXRtYWtlL2V4dGVybmFsIG5vZGUtY29tbW9uanMgXCJub2RlOmNoaWxkX3Byb2Nlc3NcIiIsIndlYnBhY2s6Ly9iaXRtYWtlL2V4dGVybmFsIG5vZGUtY29tbW9uanMgXCJub2RlOmZzXCIiLCJ3ZWJwYWNrOi8vYml0bWFrZS9leHRlcm5hbCBub2RlLWNvbW1vbmpzIFwibm9kZTpvc1wiIiwid2VicGFjazovL2JpdG1ha2UvZXh0ZXJuYWwgbm9kZS1jb21tb25qcyBcIm5vZGU6cGF0aFwiIiwid2VicGFjazovL2JpdG1ha2UvZXh0ZXJuYWwgbm9kZS1jb21tb25qcyBcIm5vZGU6dXJsXCIiLCJ3ZWJwYWNrOi8vYml0bWFrZS93ZWJwYWNrL2Jvb3RzdHJhcCIsIndlYnBhY2s6Ly9iaXRtYWtlL3dlYnBhY2svcnVudGltZS9jb21wYXQgZ2V0IGRlZmF1bHQgZXhwb3J0Iiwid2VicGFjazovL2JpdG1ha2Uvd2VicGFjay9ydW50aW1lL2RlZmluZSBwcm9wZXJ0eSBnZXR0ZXJzIiwid2VicGFjazovL2JpdG1ha2Uvd2VicGFjay9ydW50aW1lL2hhc093blByb3BlcnR5IHNob3J0aGFuZCIsIndlYnBhY2s6Ly9iaXRtYWtlL3dlYnBhY2svcnVudGltZS9tYWtlIG5hbWVzcGFjZSBvYmplY3QiLCJ3ZWJwYWNrOi8vYml0bWFrZS8uL3NyYy9tYWluLm1qcyJdLCJzb3VyY2VzQ29udGVudCI6WyJmdW5jdGlvbiB3ZWJwYWNrRW1wdHlBc3luY0NvbnRleHQocmVxKSB7XG5cdC8vIEhlcmUgUHJvbWlzZS5yZXNvbHZlKCkudGhlbigpIGlzIHVzZWQgaW5zdGVhZCBvZiBuZXcgUHJvbWlzZSgpIHRvIHByZXZlbnRcblx0Ly8gdW5jYXVnaHQgZXhjZXB0aW9uIHBvcHBpbmcgdXAgaW4gZGV2dG9vbHNcblx0cmV0dXJuIFByb21pc2UucmVzb2x2ZSgpLnRoZW4oKCkgPT4ge1xuXHRcdHZhciBlID0gbmV3IEVycm9yKFwiQ2Fubm90IGZpbmQgbW9kdWxlICdcIiArIHJlcSArIFwiJ1wiKTtcblx0XHRlLmNvZGUgPSAnTU9EVUxFX05PVF9GT1VORCc7XG5cdFx0dGhyb3cgZTtcblx0fSk7XG59XG53ZWJwYWNrRW1wdHlBc3luY0NvbnRleHQua2V5cyA9ICgpID0+IChbXSk7XG53ZWJwYWNrRW1wdHlBc3luY0NvbnRleHQucmVzb2x2ZSA9IHdlYnBhY2tFbXB0eUFzeW5jQ29udGV4dDtcbndlYnBhY2tFbXB0eUFzeW5jQ29udGV4dC5pZCA9IFwiLi9zcmMgbGF6eSByZWN1cnNpdmVcIjtcbm1vZHVsZS5leHBvcnRzID0gd2VicGFja0VtcHR5QXN5bmNDb250ZXh0OyIsImltcG9ydCBmcyBmcm9tIFwibm9kZTpmc1wiO1xuaW1wb3J0IHBhdGggZnJvbSBcIm5vZGU6cGF0aFwiO1xuXG5pbXBvcnQgY21ha2UgZnJvbSBcIkAvdXRpbHMvQ01ha2UuanNcIjtcbmltcG9ydCB7IG1ha2VQYXRjaCB9IGZyb20gXCJAL3V0aWxzL01ha2VQYXRjaFwiO1xuaW1wb3J0IHsgc2F2ZUlmRGlmZmVyZW50LCBkaXJlY3RvcnlFeGlzdHMsIGdldFBhdGhTdHJpbmcgfSBmcm9tIFwiQC91dGlscy9GaWxlU3lzdGVtXCI7XG5pbXBvcnQgeyBTZXR0aW5nc1N0b3JhZ2UgfSBmcm9tIFwiQC91dGlscy9TZXR0aW5nc1N0b3JhZ2UuanNcIjtcbmltcG9ydCB7IHNwYXduQXN5bmMgfSBmcm9tIFwiQC91dGlscy9DaGlsZFByb2Nlc3NcIjtcbmltcG9ydCB7IGFjdGlvbk1ha2VTY3JpcHQgfSBmcm9tIFwiQC9NYWtlU2NyaXB0Q29udGV4dC5qc1wiO1xuaW1wb3J0IHsgYXJyYXlXcmFwcGVyLCBhc3NpZ25PYmplY3QgfSBmcm9tIFwiQC91dGlscy9QcmltaXRpdmVzXCI7XG5pbXBvcnQgY29uc3RhbnRzIGZyb20gXCJAL0NvbnN0YW50cy5qc1wiO1xuaW1wb3J0IHsgcmVxdWlyZVJlc29sdmUgfSBmcm9tIFwiQC91dGlscy9Nb2R1bGVcIlxuaW1wb3J0IHsgY3JlYXRlTG9nZ2VyIH0gZnJvbSBcIkAvbG9nZ2VyXCI7XG5pbXBvcnQgeyByZXF1ZXN0R2V0IH0gZnJvbSBcIkAvdXRpbHMvSHR0cFJlcXVlc3RcIjtcblxuY29uc3QgbG9nZ2VyID0gY3JlYXRlTG9nZ2VyKGltcG9ydC5tZXRhLnVybCk7XG5cbmNvbnN0IHsgQlVJTERfQ09ORklHX0ZJTEUsIEJVSUxEX1NFVFRJTkdTX0ZJTEUgfSA9IGNvbnN0YW50cztcblxuZnVuY3Rpb24gbWVyZ2VFbnZpcm9ubWVudCguLi5hcmdzKSB7XG4gIGNvbnN0IGVudmlyb25tZW50ID0ge307XG4gIGZvciAoY29uc3QgZW52IG9mIGFyZ3MpIHtcbiAgICBjb25zdCBsaXN0ID0gT2JqZWN0LmVudHJpZXMoZW52IHx8IHt9KTtcbiAgICB3aGlsZSAobGlzdC5sZW5ndGgpIHtcbiAgICAgIGxldCBba2V5LHZhbF0gPSBsaXN0LnBvcCgpO1xuICAgICAgbGV0IGRlbGltaXRlcjtcbiAgICAgIGxldCBqb2luQWZ0ZXIgPSB0cnVlO1xuICAgICAgc3dpdGNoIChrZXkpIHtcbiAgICAgIGNhc2UgXCJQQVRIXCI6XG4gICAgICAgIGRlbGltaXRlciA9IHBhdGguZGVsaW1pdGVyO1xuICAgICAgICBqb2luQWZ0ZXIgPSBmYWxzZTtcbiAgICAgICAgYnJlYWs7XG4gICAgICBjYXNlIFwiQ0ZMQUdTXCI6XG4gICAgICBjYXNlIFwiQ1hYRkxBR1NcIjpcbiAgICAgIGNhc2UgXCJMREZMQUdTXCI6XG4gICAgICAgIGRlbGltaXRlciA9IFwiIFwiO1xuICAgICAgICBicmVhaztcbiAgICAgIH1cbiAgICAgIGlmICh0eXBlb2YgdmFsID09PSAnbnVtYmVyJylcbiAgICAgICAgdmFsID0gdmFsLnRvU3RyaW5nKCk7XG4gICAgICBlbHNlIGlmIChBcnJheS5pc0FycmF5KHZhbCkpXG4gICAgICAgIHZhbCA9IHZhbC5qb2luKGRlbGltaXRlcik7XG4gICAgICBpZiAoIWRlbGltaXRlciB8fCAhZW52aXJvbm1lbnRba2V5XSlcbiAgICAgICAgZW52aXJvbm1lbnRba2V5XSA9IHZhbDtcbiAgICAgIGVsc2UgaWYgKGpvaW5BZnRlcilcbiAgICAgICAgZW52aXJvbm1lbnRba2V5XSA9IHZhbCArIGRlbGltaXRlciArIGVudmlyb25tZW50W2tleV07XG4gICAgICBlbHNlXG4gICAgICAgIGVudmlyb25tZW50W2tleV0gPSBlbnZpcm9ubWVudFtrZXldICsgZGVsaW1pdGVyICsgdmFsO1xuICAgIH1cbiAgfVxuICByZXR1cm4gZW52aXJvbm1lbnQ7XG59XG5cbmZ1bmN0aW9uIHJlYmFzZUNvbmZpZyhjb25maWcpIHtcbiAgY29uc3QgYmFzZUNvbmZpZyA9IHt9O1xuICBjb25zdCBvdGhlckNvbmZpZyA9IHt9O1xuXG4gIGZvciAoY29uc3QgW2tleSwgZW50cnldIG9mIE9iamVjdC5lbnRyaWVzKGNvbmZpZykpIHtcbiAgICAoZW50cnkuYmFzZSA/IG90aGVyQ29uZmlnIDogYmFzZUNvbmZpZylba2V5XSA9IGVudHJ5O1xuICB9XG5cbiAgd2hpbGUgKHRydWUpIHtcbiAgICBjb25zdCBrZXlzID0gT2JqZWN0LmtleXMob3RoZXJDb25maWcpO1xuICAgIGlmIChrZXlzLmxlbmd0aCA9PSAwKVxuICAgICAgYnJlYWs7XG4gICAgY29uc3QgZG9uZUtleXMgPSBbXTtcbiAgICBmb3IgKGNvbnN0IGtleSBvZiBrZXlzKSB7XG4gICAgICBjb25zdCBvdGhlckl0ZXIgPSBvdGhlckNvbmZpZ1trZXldO1xuICAgICAgY29uc3QgYmFzZUxpc3QgPSBbXTtcbiAgICAgIGZvciAoY29uc3QgaXRlciBvZiBhcnJheVdyYXBwZXIob3RoZXJJdGVyLmJhc2UpKSB7XG4gICAgICAgIGNvbnN0IGJhc2VFbnRyeSA9IGJhc2VDb25maWdbaXRlcl07XG4gICAgICAgIGlmICghYmFzZUVudHJ5KSB7XG4gICAgICAgICAgYmFzZUxpc3QubGVuZ3RoID0gMDtcbiAgICAgICAgICBicmVhaztcbiAgICAgICAgfVxuICAgICAgICBiYXNlTGlzdC5wdXNoKGJhc2VFbnRyeSk7XG4gICAgICB9XG4gICAgICBpZiAoYmFzZUxpc3QubGVuZ3RoKSB7XG4gICAgICAgIGJhc2VMaXN0LnB1c2gob3RoZXJJdGVyKTtcbiAgICAgICAgbGV0IG5ld0VudHJ5ID0ge307XG4gICAgICAgIGZvciAoY29uc3QgaXRlciBvZiBiYXNlTGlzdCkge1xuICAgICAgICAgIGFzc2lnbk9iamVjdChuZXdFbnRyeSwgaXRlcik7XG4gICAgICAgIH1cbiAgICAgICAgYmFzZUNvbmZpZ1trZXldID0gbmV3RW50cnk7XG4gICAgICAgIGRvbmVLZXlzLnB1c2goa2V5KTtcbiAgICAgIH1cbiAgICB9XG4gICAgaWYgKGRvbmVLZXlzLmxlbmd0aCA9PSAwKSB7XG4gICAgICBmb3IgKGNvbnN0IGtleSBvZiBrZXlzKVxuICAgICAgICB0aHJvdyBgQ2FuJ3Qgc2V0IGJhc2UgY29uZmlnIGZvciBcIiR7a2V5fWA7XG4gICAgfVxuICAgIGZvciAoY29uc3Qga2V5IG9mIGRvbmVLZXlzKSB7XG4gICAgICBkZWxldGUgYmFzZUNvbmZpZ1trZXldLmJhc2U7XG4gICAgICBkZWxldGUgb3RoZXJDb25maWdba2V5XTtcbiAgICB9XG4gIH1cblxuICByZXR1cm4gYmFzZUNvbmZpZztcbn1cblxuZnVuY3Rpb24gcmVzb2x2ZVN0cmluZ1dpdGhWYXJpYWJsZShjb25maWcsIGVudHJ5Q29uZmlnLCByb290Q29uZmlnLCB2YWwpIHtcbiAgcmV0dXJuIHZhbC5yZXBsYWNlKC9cXCRcXHsoW159XSspXFx9L2csIChtYXRjaCwgdmFsdWUpID0+IHtcbiAgICBsZXQgc2VsO1xuICAgIGZvciAoY29uc3QgbmFtZSBvZiB2YWx1ZS5zcGxpdChcIi5cIikpIHtcbiAgICAgIGlmIChzZWwgPT09IHVuZGVmaW5lZCkge1xuICAgICAgICBpZiAoY29uZmlnLmhhc093blByb3BlcnR5KG5hbWUpKSB7XG4gICAgICAgICAgc2VsID0gY29uZmlnW25hbWVdO1xuICAgICAgICB9XG4gICAgICAgIGVsc2UgaWYgKGNvbmZpZyAhPT0gZW50cnlDb25maWcgJiYgZW50cnlDb25maWcuaGFzT3duUHJvcGVydHkobmFtZSkpIHtcbiAgICAgICAgICBzZWwgPSBlbnRyeUNvbmZpZ1tuYW1lXTtcbiAgICAgICAgfVxuICAgICAgICBlbHNlIGlmIChjb25maWcgIT09IHJvb3RDb25maWcgJiYgcm9vdENvbmZpZy5oYXNPd25Qcm9wZXJ0eShuYW1lKSkge1xuICAgICAgICAgIHNlbCA9IHJvb3RDb25maWdbbmFtZV07XG4gICAgICAgIH1cbiAgICAgICAgZWxzZSB7XG4gICAgICAgICAgdHJ5IHtcbiAgICAgICAgICAgIGNvbnN0IG1haW5GaWxlID0gcmVxdWlyZVJlc29sdmUobmFtZSk7XG4gICAgICAgICAgICBpZiAobWFpbkZpbGUpIHtcbiAgICAgICAgICAgICAgc2VsID0geyBtYWluRmlsZSwgbWFpbkRpcjogcGF0aC5wb3NpeC5kaXJuYW1lKG1haW5GaWxlKSwgfTtcbiAgICAgICAgICAgIH1cbiAgICAgICAgICB9IGNhdGNoKGUpIHt9XG4gICAgICAgIH1cbiAgICAgICAgaWYgKHNlbCA9PT0gdW5kZWZpbmVkKVxuICAgICAgICAgIGJyZWFrO1xuICAgICAgfVxuICAgICAgZWxzZSBpZiAoc2VsLmhhc093blByb3BlcnR5KG5hbWUpKSB7XG4gICAgICAgIHNlbCA9IHNlbFtuYW1lXTtcbiAgICAgIH1cbiAgICAgIGVsc2Uge1xuICAgICAgICBzZWwgPSB1bmRlZmluZWQ7XG4gICAgICAgIGJyZWFrO1xuICAgICAgfVxuICAgIH1cbiAgICBpZiAoc2VsID09PSB1bmRlZmluZWQpXG4gICAgICB0aHJvdyBuZXcgRXJyb3IoYFRoZSAke3ZhbHVlfSB2YXJpYWJsZSBkb2VzIG5vdCBleGlzdFwiYCk7XG4gICAgcmV0dXJuIHNlbDtcbiAgfSk7XG59XG5cbmZ1bmN0aW9uIHJlc29sdmVDb25maWdTdHJpbmdzSW1wbChjb25maWcsIGVudHJ5Q29uZmlnLCByb290Q29uZmlnKSB7XG4gIGxldCBjb3VudCA9IDA7XG4gIGZvciAoY29uc3QgW2tleSwgdmFsXSBvZiBPYmplY3QuZW50cmllcyhjb25maWcpKSB7XG4gICAgaWYgKHZhbCAmJiB0eXBlb2YgdmFsID09PSBcIm9iamVjdFwiKVxuICAgICAgY291bnQgKz0gcmVzb2x2ZUNvbmZpZ1N0cmluZ3NJbXBsKHZhbCwgZW50cnlDb25maWcsIHJvb3RDb25maWcpO1xuICAgIGVsc2UgaWYgKHR5cGVvZiB2YWwgPT09IFwic3RyaW5nXCIpIHtcbiAgICAgIGNvbnN0IHYgPSByZXNvbHZlU3RyaW5nV2l0aFZhcmlhYmxlKGNvbmZpZywgZW50cnlDb25maWcsIHJvb3RDb25maWcsIHZhbCk7XG4gICAgICBpZiAodmFsICE9PSB2KSB7XG4gICAgICAgIGNvbmZpZ1trZXldID0gdjtcbiAgICAgICAgY291bnQrKztcbiAgICAgIH1cbiAgICB9XG4gIH1cbiAgcmV0dXJuIGNvdW50O1xufVxuXG5mdW5jdGlvbiByZXNvbHZlQ29uZmlnU3RyaW5ncyhjb25maWcpIHtcbiAgZm9yICg7Oykge1xuICAgIGxldCBjb3VudCA9IDA7XG4gICAgZm9yIChjb25zdCBba2V5LCB2YWxdIG9mIE9iamVjdC5lbnRyaWVzKGNvbmZpZykpIHtcbiAgICAgIGlmICh2YWwgJiYgdHlwZW9mIHZhbCA9PT0gXCJvYmplY3RcIilcbiAgICAgICAgY291bnQgKz0gcmVzb2x2ZUNvbmZpZ1N0cmluZ3NJbXBsKHZhbCwgdmFsLCBjb25maWcpO1xuICAgICAgZWxzZSAgaWYgKHR5cGVvZiB2YWwgPT09IFwic3RyaW5nXCIpIHtcbiAgICAgICAgY29uc3QgdiA9IHJlc29sdmVTdHJpbmdXaXRoVmFyaWFibGUoY29uZmlnLCBjb25maWcsIGNvbmZpZywgdmFsKTtcbiAgICAgICAgaWYgKHZhbCAhPT0gdikge1xuICAgICAgICAgIGNvbmZpZ1trZXldID0gdjtcbiAgICAgICAgICBjb3VudCsrO1xuICAgICAgICB9XG4gICAgICB9XG4gICAgfVxuICAgIGlmICghY291bnQpXG4gICAgICBicmVhaztcbiAgfVxufVxuXG5mdW5jdGlvbiBtYWtlQnVpbGRDb25maWcoY3R4LCBjb25maWcpIHtcbiAgZm9yIChjb25zdCBrZXkgb2YgWyBcInNvdXJjZVJvb3RcIiwgXCJ3YXNtdXhEaXJcIiBdKSB7XG4gICAgaWYgKGNvbmZpZ1trZXldKSB7XG4gICAgICB0aHJvdyBgVGhlICR7a2V5fSB2YXJpYWJsZSBjYW5ub3QgYmUgY2hhbmdlZCB0byBcIiR7Y29uZmlnLnNvdXJjZVJvb3R9XCJgO1xuICAgIH1cbiAgfVxuXG4gIGNvbnN0IHJvb3RDb25maWcgPSByZWJhc2VDb25maWcoY29uZmlnKTtcblxuICByb290Q29uZmlnLmJ1aWxkVHlwZSA9IHJvb3RDb25maWcuYnVpbGRUeXBlIHx8IGN0eC5idWlsZFR5cGU7XG4gIHJvb3RDb25maWcuc291cmNlUm9vdCA9IHJvb3RDb25maWcuc291cmNlUm9vdCB8fCBjdHgud29ya0RpcjtcbiAgcm9vdENvbmZpZy5iaW5hcnlSb290ID0gcm9vdENvbmZpZy5iaW5hcnlSb290IHx8IHBhdGgucG9zaXgucmVzb2x2ZShjdHgud29ya0RpcixcImJ1aWxkXCIpO1xuXG4gIGZvciAoY29uc3QgW2tleSwgZW50cnldIG9mIE9iamVjdC5lbnRyaWVzKHJvb3RDb25maWcpKSB7XG4gICAgaWYgKGVudHJ5ICYmIHR5cGVvZiBlbnRyeSA9PT0gXCJvYmplY3RcIiAmJiBlbnRyeS5hY3Rpb24pIHtcbiAgICAgIGVudHJ5LmJ1aWxkVHlwZSA9IGVudHJ5LmJ1aWxkVHlwZSB8fCByb290Q29uZmlnLmJ1aWxkVHlwZTtcbiAgICAgIGNvbnN0IGZvbGRlciA9IGtleS5yZXBsYWNlKFwiOlwiLCBwYXRoLnBvc2l4LnNlcCk7XG4gICAgICBjb25zdCB3b3JrRGlyID0gcGF0aC5wb3NpeC5qb2luKHJvb3RDb25maWcuYmluYXJ5Um9vdCwgZm9sZGVyKTtcbiAgICAgIGVudHJ5LnRlbXBEaXIgPSBlbnRyeS50ZW1wRGlyIHx8IHBhdGgucG9zaXguam9pbih3b3JrRGlyLCBcInRtcFwiKTtcbiAgICAgIGlmIChlbnRyeS5zb3VyY2VVcmwpIHtcbiAgICAgICAgZW50cnkuYXJjaGl2ZURpciA9IGVudHJ5LmFyY2hpdmVEaXIgfHwgcGF0aC5wb3NpeC5qb2luKHdvcmtEaXIsIFwiYXJjXCIpO1xuICAgICAgICBlbnRyeS5leHRyYWN0RGlyID0gZW50cnkuZXh0cmFjdERpciB8fCBwYXRoLnBvc2l4LmpvaW4od29ya0RpciwgXCJzcmNcIik7XG4gICAgICAgIGlmICghZW50cnkuc291cmNlRGlyKVxuICAgICAgICAgIGVudHJ5LnNvdXJjZURpciA9IGVudHJ5LmV4dHJhY3REaXI7XG4gICAgICAgIGVsc2UgaWYgKCFwYXRoLmlzQWJzb2x1dGUoZW50cnkuc291cmNlRGlyKSlcbiAgICAgICAgICBlbnRyeS5zb3VyY2VEaXIgPSBwYXRoLnBvc2l4LmpvaW4oZW50cnkuZXh0cmFjdERpciwgZW50cnkuc291cmNlRGlyKTtcbiAgICAgIH1cbiAgICAgIGVsc2UgaWYgKCFlbnRyeS5zb3VyY2VEaXIpIHtcbiAgICAgICAgdGhyb3cgYE1pc3Npbmcgc291cmNlRGlyIGZvciAke2tleX0gYWN0aW9uXCJgO1xuICAgICAgfVxuICAgICAgaWYgKGVudHJ5LmJpbmFyeURpciA9PT0gbnVsbClcbiAgICAgICAgZW50cnkuYmluYXJ5RGlyID0gZW50cnkuc291cmNlRGlyO1xuICAgICAgZWxzZSBpZiAoZW50cnkuYmluYXJ5RGlyID09PSB1bmRlZmluZWQpXG4gICAgICAgIGVudHJ5LmJpbmFyeURpciA9IHBhdGgucG9zaXguam9pbih3b3JrRGlyLCBcImJpblwiKTtcbiAgICB9XG4gIH1cblxuICByZXNvbHZlQ29uZmlnU3RyaW5ncyhyb290Q29uZmlnKTtcblxuICByZXR1cm4gcm9vdENvbmZpZztcbn1cblxuYXN5bmMgZnVuY3Rpb24gdHJ5UmVxdWVzdEdldChzb3VyY2VVcmwsIGFyY0ZpbGUsIGF0dGVtcHRzKVxue1xuICBmb3IoOzspIHtcbiAgICB0cnkge1xuICAgICAgY29uc3QgYnVmZmVyID0gYXdhaXQgcmVxdWVzdEdldChzb3VyY2VVcmwpO1xuICAgICAgYXdhaXQgZnMucHJvbWlzZXMud3JpdGVGaWxlKGFyY0ZpbGUsIGJ1ZmZlcik7XG4gICAgICByZXR1cm47XG4gICAgfVxuICAgIGNhdGNoIChlKSB7XG4gICAgICBpZiAoLS1hdHRlbXB0cyA8IDApIHtcbiAgICAgICAgdGhyb3cgZTtcbiAgICAgIH1cbiAgICAgIGNvbnNvbGUud2FybihlKTtcbiAgICB9XG4gIH1cbn1cblxuYXN5bmMgZnVuY3Rpb24gZG9FeHRyYWN0QXJjaGl2ZShjdHgsIGVudmlyb25tZW50LCBjb25maWcsIHNldHRpbmdzKVxue1xuICBpZiAoIWNvbmZpZy5zb3VyY2VVcmwpXG4gICAgdGhyb3cgXCJVbmtub3duIHNvdXJjZVVybFwiO1xuICBpZiAoIWNvbmZpZy5hcmNoaXZlRGlyKVxuICAgIHRocm93IFwiVW5rbm93biBhcmNoaXZlRGlyXCI7XG4gIGlmICghY29uZmlnLmV4dHJhY3REaXIpXG4gICAgdGhyb3cgXCJVbmtub3duIGV4dHJhY3REaXJcIjtcblxuICBpZiAoIWF3YWl0IGRpcmVjdG9yeUV4aXN0cyhjb25maWcuYXJjaGl2ZURpcikpIHtcbiAgICBjb25zb2xlLmxvZyhgbWtkaXIgLXAgJHtjb25maWcuYXJjaGl2ZURpcn1gKTtcbiAgICBhd2FpdCBmcy5wcm9taXNlcy5ta2Rpcihjb25maWcuYXJjaGl2ZURpciwgeyByZWN1cnNpdmU6IHRydWUgfSk7XG4gIH1cblxuICBpZiAoIWF3YWl0IGRpcmVjdG9yeUV4aXN0cyhjb25maWcudGVtcERpcikpIHtcbiAgICBjb25zb2xlLmxvZyhgbWtkaXIgLXAgJHtjb25maWcudGVtcERpcn1gKTtcbiAgICBhd2FpdCBmcy5wcm9taXNlcy5ta2Rpcihjb25maWcudGVtcERpciwgeyByZWN1cnNpdmU6IHRydWUgfSk7XG4gIH1cblxuICBjb25zdCBhcmNOYW1lID0gcGF0aC5iYXNlbmFtZShjb25maWcuc291cmNlVXJsKTtcblxuICBsZXQgYXJjRmlsZTtcbiAgbGV0IGRvd25sb2FkVXJscyA9IGF3YWl0IHNldHRpbmdzLmdldChcImRvd25sb2FkVXJsc1wiKSB8fCB7fTtcbiAgaWYgKGRvd25sb2FkVXJsc1tjb25maWcuc291cmNlVXJsXSlcbiAgICBhcmNGaWxlID0gZG93bmxvYWRVcmxzW2NvbmZpZy5zb3VyY2VVcmxdO1xuICBlbHNlIHtcbiAgICBhcmNGaWxlID0gcGF0aC5qb2luKGNvbmZpZy5hcmNoaXZlRGlyLCBhcmNOYW1lKTtcbiAgICBhd2FpdCB0cnlSZXF1ZXN0R2V0KGNvbmZpZy5zb3VyY2VVcmwsIGFyY0ZpbGUsIGN0eC5yZXF1ZXN0QXR0ZW1wdHMpO1xuICAgIGRvd25sb2FkVXJsc1tjb25maWcuc291cmNlVXJsXSA9IGFyY0ZpbGU7XG4gICAgYXdhaXQgc2V0dGluZ3Muc2V0KFwiZG93bmxvYWRVcmxzXCIsIGRvd25sb2FkVXJscyk7XG4gIH1cblxuICBsZXQgZXh0cmFjdERpcjtcbiAgbGV0IGV4dHJhY3RGaWxlcyA9IGF3YWl0IHNldHRpbmdzLmdldChcImV4dHJhY3RGaWxlc1wiKSB8fCB7fTtcbiAgaWYgKGV4dHJhY3RGaWxlc1thcmNGaWxlXSkge1xuICAgIGV4dHJhY3REaXIgPSBleHRyYWN0RmlsZXNbYXJjRmlsZV07XG4gIH1cbiAgZWxzZSB7XG4gICAgZXh0cmFjdERpciA9IGF3YWl0IGZzLnByb21pc2VzLm1rZHRlbXAocGF0aC5yZXNvbHZlKGNvbmZpZy50ZW1wRGlyLCBhcmNOYW1lICsgJy4nKSk7XG4gIFxuICAgIGF3YWl0IGNtYWtlLmV4dHJhY3Qoe1xuICAgICAgZW52aXJvbm1lbnQsXG4gICAgICBmaWxlbmFtZTogYXJjRmlsZSxcbiAgICAgIHdvcmtEaXI6IGV4dHJhY3REaXIsXG4gICAgICBsb2dGaWxlOiAgcGF0aC5qb2luKGNvbmZpZy50ZW1wRGlyLCBwYXRoLmJhc2VuYW1lKGV4dHJhY3REaXIpICsgXCIubG9nXCIpLFxuICAgIH0pO1xuICBcbiAgICBjb25zdCBleHRyYWN0TGlzdCA9IGF3YWl0IGZzLnByb21pc2VzLnJlYWRkaXIoZXh0cmFjdERpcik7XG4gICAgaWYgKGV4dHJhY3RMaXN0Lmxlbmd0aCA9PT0gMSkge1xuICAgICAgZXh0cmFjdERpciA9IHBhdGgucmVzb2x2ZShleHRyYWN0RGlyLCBleHRyYWN0TGlzdFswXSk7XG4gICAgICBpZiAoIWF3YWl0IGRpcmVjdG9yeUV4aXN0cyhleHRyYWN0RGlyKSkge1xuICAgICAgICBjb25zb2xlLmxvZyhgcm0gLWZyICR7ZXh0cmFjdERpcn1gKTtcbiAgICAgICAgYXdhaXQgZnMucHJvbWlzZXMucm0oZXh0cmFjdERpciwgeyByZWN1cnNpdmU6IHRydWUgfSk7XG4gICAgICAgIHRocm93IGBTdXBwb3J0IG9ubHkgZGlyZWN0b3J5IGZvciBhcmNoaXZlYDtcbiAgICAgIH1cbiAgICB9XG4gIFxuICAgIGlmIChhd2FpdCBkaXJlY3RvcnlFeGlzdHMoY29uZmlnLmV4dHJhY3REaXIpKSB7XG4gICAgICAvLyBUT0RPOiBNYXJnZSBleHRyYWN0RGlyIHdpdGggb3V0cHV0XG4gICAgICBjb25zb2xlLmxvZyhgcm0gLWZyICR7Y29uZmlnLmV4dHJhY3REaXJ9YCk7XG4gICAgICBhd2FpdCBmcy5wcm9taXNlcy5ybShjb25maWcuZXh0cmFjdERpciwgeyByZWN1cnNpdmU6IHRydWUgfSk7XG4gICAgfVxuICAgIGVsc2Uge1xuICAgICAgY29uc3QgcGFyZW50RGlyID0gcGF0aC5kaXJuYW1lKGNvbmZpZy5leHRyYWN0RGlyKTtcbiAgICAgIGlmICghYXdhaXQgZGlyZWN0b3J5RXhpc3RzKHBhcmVudERpcikpIHtcbiAgICAgICAgY29uc29sZS5sb2coYG1rZGlyIC1wICR7cGFyZW50RGlyfWApO1xuICAgICAgICBhd2FpdCBmcy5wcm9taXNlcy5ta2RpcihwYXJlbnREaXIsIHsgcmVjdXJzaXZlOiB0cnVlIH0pOyBcbiAgICAgIH1cbiAgICB9XG4gIFxuICAgIGNvbnNvbGUubG9nKGBtdiAke2V4dHJhY3REaXJ9ICR7Y29uZmlnLmV4dHJhY3REaXJ9YCk7XG4gICAgYXdhaXQgZnMucHJvbWlzZXMucmVuYW1lKGV4dHJhY3REaXIsIGNvbmZpZy5leHRyYWN0RGlyKTtcbiAgXG4gICAgZXh0cmFjdEZpbGVzW2FyY0ZpbGVdID0gZXh0cmFjdERpcjtcbiAgICBhd2FpdCBzZXR0aW5ncy5zZXQoXCJleHRyYWN0RmlsZXNcIiwgZXh0cmFjdEZpbGVzKTtcbiAgfVxuXG4gIGlmIChjb25maWcucGF0Y2hEaXIpIHtcbiAgICBsZXQgcGF0Y2hEaXJzID0gYXdhaXQgc2V0dGluZ3MuZ2V0KFwicGF0Y2hEaXJzXCIpIHx8IHt9O1xuICAgIGlmICghcGF0Y2hEaXJzW2NvbmZpZy5wYXRjaERpcl0pIHtcbiAgICAgIGF3YWl0IG1ha2VQYXRjaChjb25maWcucGF0Y2hEaXIsIGNvbmZpZy5leHRyYWN0RGlyKTtcbiAgICAgIHBhdGNoRGlyc1tjb25maWcucGF0Y2hEaXJdID0gY29uZmlnLmV4dHJhY3REaXI7XG4gICAgICBhd2FpdCBzZXR0aW5ncy5zZXQoXCJwYXRjaERpcnNcIiwgcGF0Y2hEaXJzKTtcbiAgICB9XG4gIH1cbn1cblxuY29uc3QgYWN0aW9uSGFuZGxlcnMgPSB7XG4gIG5vbmU6IGFzeW5jIChjb25maWcsIGVudmlyb25tZW50LCBzZXR0aW5ncykgPT4ge1xuICAgIC8qIGRvIG5vdGhpbmcgKi9cbiAgfSxcbiAgY21ha2U6IGFzeW5jIChjb25maWcsIGVudmlyb25tZW50LCBzZXR0aW5ncykgPT4ge1xuICAgIGNvbnN0IHNvdXJjZURpciA9IGdldFBhdGhTdHJpbmcoY29uZmlnLnNvdXJjZURpcik7XG4gICAgY29uc3QgYmluYXJ5RGlyID0gZ2V0UGF0aFN0cmluZyhjb25maWcuYmluYXJ5RGlyKTtcbiAgICBjb25zdCBjbWFrZUFyZ3MgPSB7XG4gICAgICBlbnZpcm9ubWVudDoge1xuICAgICAgICAuLi5lbnZpcm9ubWVudCxcbiAgICAgICAgREVTVERJUjogY29uZmlnLmRlc3REaXIsXG4gICAgICB9LFxuICAgICAgZ2VuZXJhdG9yOiBjb25maWcuZ2VuZXJhdG9yIHx8IFwiVW5peCBNYWtlZmlsZXNcIixcbiAgICAgIGNhY2hlVmFyaWFibGVzOiBjb25maWcuY2FjaGVWYXJpYWJsZXMsXG4gICAgICBzb3VyY2VEaXIsXG4gICAgICBiaW5hcnlEaXIsXG4gICAgfTtcblxuICAgIGlmICghY21ha2VBcmdzLmNhY2hlVmFyaWFibGVzLkNNQUtFX0JVSUxEX1RZUEUpIHtcbiAgICAgIGNtYWtlQXJncy5jYWNoZVZhcmlhYmxlcy5DTUFLRV9CVUlMRF9UWVBFID0gY29uZmlnLmJ1aWxkVHlwZTtcbiAgICB9XG5cbiAgICBhd2FpdCBjbWFrZS5jb25maWd1cmUoY21ha2VBcmdzKTtcbiAgICBhd2FpdCBjbWFrZS5idWlsZChjbWFrZUFyZ3MpO1xuICAgIGF3YWl0IGNtYWtlLmluc3RhbGwoY21ha2VBcmdzKTtcbiAgfSxcbiAgY29uZmlndXJlOiBhc3luYyAoY29uZmlnLCBlbnZpcm9ubWVudCwgc2V0dGluZ3MpID0+IHtcbiAgICBjb25zdCBzb3VyY2VEaXIgPSBnZXRQYXRoU3RyaW5nKGNvbmZpZy5zb3VyY2VEaXIpO1xuICAgIGNvbnN0IGJpbmFyeURpciA9IGdldFBhdGhTdHJpbmcoY29uZmlnLmJpbmFyeURpcik7XG4gICAgbGV0IHN0ZXAgPSBhd2FpdCBzZXR0aW5ncy5nZXQoXCJjb25maWd1cmVcIikgfHwgXCJjb25maWdcIjtcbiAgICBpZiAoc3RlcCA9PT0gXCJjb25maWdcIikge1xuICAgICAgY29uc3QgY29tbWFuZCA9IHBhdGgucmVzb2x2ZShzb3VyY2VEaXIsIFwiY29uZmlndXJlXCIpO1xuICAgICAgY29uc3QgcGFyYW1zID0gW107XG4gICAgICBpZiAoQXJyYXkuaXNBcnJheShjb25maWcudmFyaWFibGVzKSkge1xuICAgICAgICBmb3IgKGNvbnN0IGl0ZXIgb2YgY29uZmlnLnZhcmlhYmxlcylcbiAgICAgICAgICBwYXJhbXMucHVzaChpdGVyKTtcbiAgICAgIH1cbiAgICAgIGVsc2UgaWYgKGNvbmZpZy52YXJpYWJsZXMpIHtcbiAgICAgICAgZm9yIChjb25zdCBba2V5LHZhbF0gb2YgT2JqZWN0LmVudHJpZXMoY29uZmlnLnZhcmlhYmxlcykpIHtcbiAgICAgICAgICBpZiAoa2V5ID09PSBcImZlYXR1cmVzXCIgJiYgQXJyYXkuaXNBcnJheSh2YWwpKSB7XG4gICAgICAgICAgICBmb3IgKGNvbnN0IGl0ZXIgb2YgdmFsKVxuICAgICAgICAgICAgICBwYXJhbXMucHVzaChgLS0ke2l0ZXJ9YCk7XG4gICAgICAgICAgfVxuICAgICAgICAgIGVsc2UgaWYgKHZhbCA9PT0gbnVsbClcbiAgICAgICAgICAgIHBhcmFtcy5wdXNoKGAtLSR7a2V5fWApO1xuICAgICAgICAgIGVsc2VcbiAgICAgICAgICAgIHBhcmFtcy5wdXNoKGAtLSR7a2V5fT0ke3ZhbH1gKTtcbiAgICAgICAgfVxuICAgICAgfVxuICAgICAgaWYgKGNvbmZpZy5mZWF0dXJlcykge1xuICAgICAgICBmb3IgKGNvbnN0IGtleSBvZiBjb25maWcuZmVhdHVyZXMpXG4gICAgICAgICAgcGFyYW1zLnB1c2goYC0tJHtrZXl9YCk7XG4gICAgICB9XG4gICAgICBjb25zdCByZXMxID0gYXdhaXQgc3Bhd25Bc3luYyhjb21tYW5kLCBwYXJhbXMsIHtcbiAgICAgICAgY3dkOiBiaW5hcnlEaXIsXG4gICAgICAgIGVudjogZW52aXJvbm1lbnQsXG4gICAgICAgIGV4dHJhOiB7XG4gICAgICAgICAgb3V0cHV0OiBgYWMuY29uZmlnLmxvZ2AsXG4gICAgICAgIH0sXG4gICAgICB9KTtcbiAgICAgIGlmIChyZXMxLnN0YXR1cyAhPT0gMCkge1xuICAgICAgICB0aHJvdyBgY29uZmlndXJlIHJldHVybmVkIHN0YXR1cyAke3JlczEuc3RhdHVzfWA7XG4gICAgICB9XG4gICAgICBzdGVwID0gXCJpbnN0YWxsXCI7XG4gICAgICBhd2FpdCBzZXR0aW5ncy5zZXQoXCJjb25maWd1cmVcIiwgc3RlcCk7XG4gICAgfVxuICAgIGlmIChzdGVwID09PSBcImluc3RhbGxcIikge1xuICAgICAgY29uc3QgYXJncyA9IFsgJ2luc3RhbGwnIF07XG4gICAgICBpZiAoY29uZmlnLmRlc3REaXIpIHtcbiAgICAgICAgYXJncy5wdXNoKGBERVNURElSPSR7Y29uZmlnLmRlc3REaXJ9YCk7XG4gICAgICB9XG4gICAgICBjb25zdCByZXMyID0gYXdhaXQgc3Bhd25Bc3luYyhcIm1ha2VcIiwgYXJncywge1xuICAgICAgICBjd2Q6IGJpbmFyeURpcixcbiAgICAgICAgZW52OiBlbnZpcm9ubWVudCxcbiAgICAgICAgZXh0cmE6IHtcbiAgICAgICAgICBvdXRwdXQ6IGBhYy5idWlsZC5sb2dgLFxuICAgICAgICB9LFxuICAgICAgfSk7XG4gICAgICBpZiAocmVzMi5zdGF0dXMgIT09IDApIHtcbiAgICAgICAgdGhyb3cgYG1ha2UgcmV0dXJuZWQgc3RhdHVzICR7cmVzMi5zdGF0dXN9YDtcbiAgICAgIH1cbiAgICAgIHN0ZXAgPSBcImRvbmVcIjtcbiAgICAgIGF3YWl0IHNldHRpbmdzLnNldChcImNvbmZpZ3VyZVwiLCBzdGVwKTtcbiAgICB9XG4gIH0sXG4gIG1ha2U6IGFzeW5jIChjb25maWcsIGVudmlyb25tZW50LCBzZXR0aW5ncykgPT4ge1xuICAgIGNvbnN0IGJpbmFyeURpciA9IGdldFBhdGhTdHJpbmcoY29uZmlnLmJpbmFyeURpcik7XG4gICAgY29uc3QgYXJncyA9IGNvbmZpZy5hcmdzIHx8IFtdO1xuICAgIGlmIChjb25maWcuZGVzdERpcikge1xuICAgICAgYXJncy5wdXNoKGBERVNURElSPSR7Y29uZmlnLmRlc3REaXJ9YCk7XG4gICAgfVxuICAgIGNvbnN0IHJlczIgPSBhd2FpdCBzcGF3bkFzeW5jKFwibWFrZVwiLCBhcmdzLCB7XG4gICAgICBjd2Q6IGJpbmFyeURpcixcbiAgICAgIGVudjogZW52aXJvbm1lbnQsXG4gICAgICBleHRyYToge1xuICAgICAgICBvdXRwdXQ6IGBtYWtlLmxvZ2AsXG4gICAgICB9LFxuICAgIH0pO1xuICAgIGlmIChyZXMyLnN0YXR1cyAhPT0gMCkge1xuICAgICAgdGhyb3cgYG1ha2UgcmV0dXJuZWQgc3RhdHVzICR7cmVzMi5zdGF0dXN9YDtcbiAgICB9XG4gIH0sXG4gIHByb2Nlc3M6IGFzeW5jIChjb25maWcsIGVudmlyb25tZW50LCBzZXR0aW5ncykgPT4ge1xuICAgIGlmICghY29uZmlnLmNvbW1hbmQpXG4gICAgICB0aHJvdyBcIlJlcXVpcmVkIGNvbW1hbmQgZmllbGQgZm9yIHByb2Nlc3MgYWN0aW9uXCI7XG4gICAgY29uc3Qgc291cmNlRGlyID0gZ2V0UGF0aFN0cmluZyhjb25maWcuc291cmNlRGlyKTtcbiAgICBjb25zdCBiaW5hcnlEaXIgPSBnZXRQYXRoU3RyaW5nKGNvbmZpZy5iaW5hcnlEaXIpO1xuICAgIGxldCB7IGNvbW1hbmQgfSA9IGNvbmZpZztcbiAgICBpZiAoIXBhdGguaXNBYnNvbHV0ZShjb21tYW5kKSAmJiAoY29tbWFuZC5pbmNsdWRlcyhwYXRoLnBvc2l4LmRlbGltaXRlcikgfHwgY29tbWFuZC5pbmNsdWRlcyhwYXRoLndpbjMyLmRlbGltaXRlcikpKSB7XG4gICAgICBjb21tYW5kID0gcGF0aC5yZXNvbHZlKHNvdXJjZURpciwgY29tbWFuZCk7XG4gICAgfVxuICAgIGNvbnN0IHJlcyA9IGF3YWl0IHNwYXduQXN5bmMoY29tbWFuZCwgY29uZmlnLmFyZ3MgfHwgW10sIHtcbiAgICAgIGN3ZDogYmluYXJ5RGlyLFxuICAgICAgZW52OiBlbnZpcm9ubWVudCxcbiAgICAgIGV4dHJhOiB7XG4gICAgICAgIG91dHB1dDogYHByb2Nlc3MubG9nYCxcbiAgICAgIH0sXG4gICAgfSk7XG4gICAgaWYgKHJlcy5zdGF0dXMgIT09IDApIHtcbiAgICAgIHRocm93IGBwcm9jZXNzIHJldHVybmVkIHN0YXR1cyAke3Jlcy5zdGF0dXN9YDtcbiAgICB9XG4gIH0sXG4gIGJpdG1ha2U6IGFjdGlvbk1ha2VTY3JpcHQsXG59O1xuXG5hc3luYyBmdW5jdGlvbiBkb1RhcmdldEJ1aWxkKGN0eCwgZW52aXJvbm1lbnQsIGNvbmZpZywgc2V0dGluZ3MpXG57XG4gIGlmIChjb25maWcucHJlQWN0aW9uKSB7XG4gICAgYXdhaXQgc2V0dGluZ3MucHVzaChcInByZUFjdGlvblwiKTtcbiAgICBjb25zdCBuZXdDb25maWcgPSB7fTtcbiAgICBhc3NpZ25PYmplY3QobmV3Q29uZmlnLCBjb25maWcpO1xuICAgIGRlbGV0ZSBuZXdDb25maWcuYWN0aW9uO1xuICAgIGRlbGV0ZSBuZXdDb25maWcucHJlQWN0aW9uO1xuICAgIGRlbGV0ZSBuZXdDb25maWcucG9zdEFjdGlvbjtcbiAgICBhc3NpZ25PYmplY3QobmV3Q29uZmlnLCBjb25maWcucHJlQWN0aW9uKTtcbiAgICBjb25zdCBuZXdFbnZpcm9ubWVudCA9IG1lcmdlRW52aXJvbm1lbnQoY29uZmlnLnByZUFjdGlvbi5lbnZpcm9ubWVudCwgZW52aXJvbm1lbnQpO1xuICAgIGF3YWl0IGRvVGFyZ2V0QnVpbGQoY3R4LCBuZXdFbnZpcm9ubWVudCwgbmV3Q29uZmlnLCBzZXR0aW5ncyk7XG4gICAgYXdhaXQgc2V0dGluZ3MucG9wKCk7XG4gIH1cblxuICBpZiAoQXJyYXkuaXNBcnJheShjb25maWcuYWN0aW9uKSkge1xuICAgIGF3YWl0IHNldHRpbmdzLnB1c2goXCJhY3Rpb25cIik7XG4gICAgZm9yICh2YXIgaSA9IDA7IGkgPCBjb25maWcuYWN0aW9uLmxlbmd0aDsgKytpKSB7XG4gICAgICBhd2FpdCBzZXR0aW5ncy5wdXNoKGkpO1xuICAgICAgY29uc3QgbmV3Q29uZmlnID0ge307XG4gICAgICBhc3NpZ25PYmplY3QobmV3Q29uZmlnLCBjb25maWcpO1xuICAgICAgZGVsZXRlIG5ld0NvbmZpZy5hY3Rpb247XG4gICAgICBkZWxldGUgbmV3Q29uZmlnLnByZUFjdGlvbjtcbiAgICAgIGRlbGV0ZSBuZXdDb25maWcucG9zdEFjdGlvbjtcbiAgICAgIGFzc2lnbk9iamVjdChuZXdDb25maWcsIGNvbmZpZy5hY3Rpb25baV0pO1xuICAgICAgY29uc3QgbmV3RW52aXJvbm1lbnQgPSBtZXJnZUVudmlyb25tZW50KGNvbmZpZy5hY3Rpb25baV0uZW52aXJvbm1lbnQsIGVudmlyb25tZW50KTtcbiAgICAgIGF3YWl0IGRvVGFyZ2V0QnVpbGQoY3R4LCBuZXdFbnZpcm9ubWVudCwgbmV3Q29uZmlnLCBzZXR0aW5ncyk7XG4gICAgICBhd2FpdCBzZXR0aW5ncy5wb3AoKTtcbiAgICB9XG4gICAgYXdhaXQgc2V0dGluZ3MucG9wKCk7XG4gIH1cbiAgZWxzZSB7XG4gICAgaWYgKCFhd2FpdCBkaXJlY3RvcnlFeGlzdHMoY29uZmlnLmJpbmFyeURpcikpIHtcbiAgICAgIGF3YWl0IGZzLnByb21pc2VzLm1rZGlyKGNvbmZpZy5iaW5hcnlEaXIsIHsgcmVjdXJzaXZlOiB0cnVlIH0pO1xuICAgIH1cbiAgICBpZiAoYWN0aW9uSGFuZGxlcnNbY29uZmlnLmFjdGlvbl0pIHtcbiAgICAgIGNvbmZpZy5kZXNjcmlwdGlvbiAmJiBjb25zb2xlLmxvZyhjb25maWcuZGVzY3JpcHRpb24pO1xuICAgICAgYXdhaXQgYWN0aW9uSGFuZGxlcnNbY29uZmlnLmFjdGlvbl0oY29uZmlnLCBlbnZpcm9ubWVudCwgc2V0dGluZ3MpO1xuICAgIH1cbiAgfVxuXG4gIGlmIChjb25maWcucG9zdEFjdGlvbikge1xuICAgIGF3YWl0IHNldHRpbmdzLnB1c2goXCJwb3N0QWN0aW9uXCIpO1xuICAgIGNvbnN0IG5ld0NvbmZpZyA9IHt9O1xuICAgIGFzc2lnbk9iamVjdChuZXdDb25maWcsIGNvbmZpZyk7XG4gICAgZGVsZXRlIG5ld0NvbmZpZy5hY3Rpb247XG4gICAgZGVsZXRlIG5ld0NvbmZpZy5wcmVBY3Rpb247XG4gICAgZGVsZXRlIG5ld0NvbmZpZy5wb3N0QWN0aW9uO1xuICAgIGFzc2lnbk9iamVjdChuZXdDb25maWcsIGNvbmZpZy5wb3N0QWN0aW9uKTtcbiAgICBjb25zdCBuZXdFbnZpcm9ubWVudCA9IG1lcmdlRW52aXJvbm1lbnQoY29uZmlnLnBvc3RBY3Rpb24uZW52aXJvbm1lbnQsIGVudmlyb25tZW50KTtcbiAgICBhd2FpdCBkb1RhcmdldEJ1aWxkKGN0eCwgbmV3RW52aXJvbm1lbnQsIG5ld0NvbmZpZywgc2V0dGluZ3MpO1xuICAgIGF3YWl0IHNldHRpbmdzLnBvcCgpO1xuICB9XG59XG5cbmV4cG9ydCBkZWZhdWx0IGFzeW5jIGZ1bmN0aW9uKGN0eCkge1xuICBjb25zdCB1c2VyQ29uZmlnID0gYXdhaXQgY3R4LmdldFVzZXJDb25maWcoKTtcbiAgY29uc3QgYnVpbGRDb25maWcgPSBtYWtlQnVpbGRDb25maWcoY3R4LCB1c2VyQ29uZmlnKTtcblxuICBjb25zdCBqc29uQ29uZmlnID0gSlNPTi5zdHJpbmdpZnkoYnVpbGRDb25maWcsIG51bGwsIDIpO1xuICBjb25zdCBkdW1wQ29uZmlnUGF0aCA9IHBhdGgucG9zaXguam9pbihidWlsZENvbmZpZy5iaW5hcnlSb290LCBCVUlMRF9DT05GSUdfRklMRSk7XG4gIGF3YWl0IHNhdmVJZkRpZmZlcmVudChkdW1wQ29uZmlnUGF0aCwganNvbkNvbmZpZyk7XG5cbiAgY29uc3Qgc2V0dGluZ3NGaWxlbmFtZSA9IHBhdGgucmVzb2x2ZShidWlsZENvbmZpZy5iaW5hcnlSb290LCBCVUlMRF9TRVRUSU5HU19GSUxFKTtcbiAgY29uc3Qgc2V0dGluZ3MgPSBuZXcgU2V0dGluZ3NTdG9yYWdlKHNldHRpbmdzRmlsZW5hbWUpO1xuXG4gIGZvciAoY29uc3QgW2tleSwgZW50cnldIG9mIE9iamVjdC5lbnRyaWVzKGJ1aWxkQ29uZmlnKSkge1xuICAgIGlmIChlbnRyeSAmJiB0eXBlb2YgZW50cnkgPT09IFwib2JqZWN0XCIgJiYgZW50cnkuYWN0aW9uICYmICFlbnRyeS5kaXNhYmxlZCkge1xuICAgICAgYXdhaXQgc2V0dGluZ3MucHVzaChrZXkpO1xuICAgICAgY29uc3QgY29tcGxldGVkID0gYXdhaXQgc2V0dGluZ3MuZ2V0KFwiY29tcGxldGVkXCIpO1xuICAgICAgaWYgKGVudHJ5LnJlYnVpbGQgfHwgIWNvbXBsZXRlZCkge1xuICAgICAgICBsb2dnZXIuaW5mbyhgU3RhcnRlZCBhY3Rpb246ICR7a2V5fWApO1xuICAgICAgICBjb25zdCBlbnZpcm9ubWVudCA9IG1lcmdlRW52aXJvbm1lbnQoZW50cnkuZW52aXJvbm1lbnQsIHByb2Nlc3MuZW52KTtcbiAgICAgICAgaWYgKGVudHJ5LnNvdXJjZVVybCkge1xuICAgICAgICAgIGF3YWl0IGRvRXh0cmFjdEFyY2hpdmUoY3R4LCBlbnZpcm9ubWVudCwgZW50cnksIHNldHRpbmdzKTtcbiAgICAgICAgfVxuICAgICAgICBhd2FpdCBkb1RhcmdldEJ1aWxkKGN0eCwgZW52aXJvbm1lbnQsIGVudHJ5LCBzZXR0aW5ncyk7XG4gICAgICAgIGF3YWl0IHNldHRpbmdzLnNldChcImNvbXBsZXRlZFwiLCB0cnVlKTtcbiAgICAgICAgbG9nZ2VyLmluZm8oYENvbXBsZXRlZCBhY3Rpb246ICR7a2V5fWApO1xuICAgICAgfVxuICAgICAgYXdhaXQgc2V0dGluZ3MucG9wKCk7XG4gICAgfVxuICB9XG59XG4iLCJtb2R1bGUuZXhwb3J0cyA9IHtcbiAgREVGQVVMVF9QUkVTRVQ6IFwibWFpblwiLFxuICBVU0VSX0NPTkZJRzogXCJiaXRtYWtlLmNvbmZpZy5tanNcIixcbiAgUkVRVUVTVF9BVFRFTVBUUzogMzAsXG4gIEJVSUxEX0NPTkZJR19GSUxFOiBcIkJ1aWxkQ29uZmlnLmpzb25cIixcbiAgQlVJTERfU0VUVElOR1NfRklMRTogXCJCdWlsZFNldHRpbmdzLmpzb25cIixcbn07XG4iLCJpbXBvcnQgZnMgZnJvbSBcIm5vZGU6ZnNcIjtcblxuaW1wb3J0IHsgZmlsZUV4aXN0cyB9IGZyb20gXCJAL3V0aWxzL0ZpbGVTeXN0ZW1cIjtcbmltcG9ydCB7IERFRkFVTFRfUFJFU0VUIH0gZnJvbSBcIkAvQ29uc3RhbnRzLmpzXCI7XG5cbmV4cG9ydCBkZWZhdWx0IGFzeW5jIGZ1bmN0aW9uKGN0eClcbntcbiAgY29uc3QgcHJlc2V0ID0gY3R4LmVudi5wcmVzZXQgfHwgREVGQVVMVF9QUkVTRVQ7XG4gIGNvbnN0IHByZXNldFBhdGggPSBjdHguZ2V0UHJlc2V0UGF0aChwcmVzZXQpO1xuICBpZiAoIWF3YWl0IGZpbGVFeGlzdHMocHJlc2V0UGF0aCkpXG4gICAgdGhyb3cgYFByZXNldCAnJHtwcmVzZXR9JyBpcyBub3QgYXZhaWxhYmxlYDtcblxuICBpZiAoYXdhaXQgZmlsZUV4aXN0cyhjdHgudXNlckNvbmZpZ1BhdGgpKVxuICAgIGF3YWl0IGZzLnByb21pc2VzLnJtKGN0eC51c2VyQ29uZmlnUGF0aCk7XG5cbiAgYXdhaXQgZnMucHJvbWlzZXMuY29weUZpbGUocHJlc2V0UGF0aCwgY3R4LnVzZXJDb25maWdQYXRoKTtcbiAgY29uc29sZS5sb2coYFByZXNldCAnJHtwcmVzZXR9JyBpbnN0YWxsZWQgc3VjY2Vzc2Z1bGx5YCk7XG59XG4iLCJcInVzZSBzdHJpY3RcIjtcblxuY29uc3QgZnMgPSByZXF1aXJlKFwibm9kZTpmc1wiKTtcbmNvbnN0IHBhdGggPSByZXF1aXJlKFwibm9kZTpwYXRoXCIpO1xuXG5jb25zdCB7IFVzZXJDb250ZXh0IH0gPSByZXF1aXJlKFwiLi9iaXRtYWtlL1VzZXJDb250ZXh0LmpzXCIpO1xuY29uc3QgeyBQbHVnaW5Db250ZXh0IH0gPSByZXF1aXJlKFwiQC9jb3JlL1BsdWdpbkNvbnRleHRcIik7XG5jb25zdCB7IEdsb2JhbENvbnRleHQgfSA9IHJlcXVpcmUoXCIuL2JpdG1ha2UvR2xvYmFsQ29udGV4dC5qc1wiKTtcbmNvbnN0IHsgU3lzdGVtVmFyaWFibGVzIH0gPSByZXF1aXJlKFwiLi9iaXRtYWtlL1N5c3RlbVZhcmlhYmxlcy5qc1wiKTtcbmNvbnN0IHsgR29hbENvbGxlY3Rpb24gfSA9IHJlcXVpcmUoXCJAL2NvcmUvR29hbENvbGxlY3Rpb25cIik7XG5jb25zdCB7IGdldFBhdGhTdHJpbmcgfSAgPSByZXF1aXJlKFwiQC91dGlscy9GaWxlU3lzdGVtXCIpO1xuY29uc3QgeyBGaWxlUGF0aCB9ID0gcmVxdWlyZShcIkAvY29yZS9QYXRoXCIpO1xuY29uc3QgeyBpbXBvcnRNb2R1bGUgfSAgPSByZXF1aXJlKFwiQC91dGlscy9Nb2R1bGVcIik7XG5jb25zdCBTeXNWYXJzID0gcmVxdWlyZShcIkAvY29yZS9TeXN0ZW1WYXJpYWJsZXNcIik7XG5cbmNvbnN0IFBBQ0tBR0VfSlNPTiA9IFwicGFja2FnZS5qc29uXCI7XG5jb25zdCBNQUtFX0NBQ0hFID0gXCJNYWtlQ2FjaGUuanNvblwiO1xuXG5hc3luYyBmdW5jdGlvbiBhY3Rpb25NYWtlU2NyaXB0KGNvbmZpZywgZW52aXJvbm1lbnQsIHNldHRpbmdzKVxue1xuICBwcm9jZXNzLmVudiA9IGVudmlyb25tZW50O1xuXG4gIFN5c3RlbVZhcmlhYmxlcy5kZWZpbmVWYXJpYWJsZXMoU3lzdGVtVmFyaWFibGVzLnByb3RvdHlwZSwgU3lzVmFycy5kZWZhdWx0KTtcbiAgY29uc3Qgc2NvcGUgPSBTeXN0ZW1WYXJpYWJsZXMuY3JlYXRlKCk7XG5cbiAgY29uc3Qgc291cmNlRGlyID0gZ2V0UGF0aFN0cmluZyhjb25maWcuc291cmNlRGlyKTtcbiAgY29uc3QgYmluYXJ5RGlyID0gZ2V0UGF0aFN0cmluZyhjb25maWcuYmluYXJ5RGlyKTtcblxuICBzY29wZS5QUk9KRUNUX1NPVVJDRV9ESVIgPSBzb3VyY2VEaXI7XG4gIHNjb3BlLlBST0pFQ1RfQklOQVJZX0RJUiA9IGJpbmFyeURpcjtcblxuICBzY29wZS5QQUNLQUdFX0ZJTEUgPSBzY29wZS5QUk9KRUNUX1NPVVJDRV9ESVIuam9pbihQQUNLQUdFX0pTT04pO1xuICBzY29wZS5DQUNIRV9GSUxFID0gc2NvcGUuUFJPSkVDVF9CSU5BUllfRElSLmpvaW4oTUFLRV9DQUNIRSk7XG4gIHNjb3BlLlNPVVJDRV9ESVIgPSBzY29wZS5QUk9KRUNUX1NPVVJDRV9ESVI7XG4gIHNjb3BlLkJJTkFSWV9ESVIgPSBzY29wZS5QUk9KRUNUX0JJTkFSWV9ESVI7XG5cbiAgY29uc3QgZ2xvYmFsID0gR2xvYmFsQ29udGV4dC5jcmVhdGUoKTtcbiAgZ2xvYmFsLmxvYWRDYWNoZVZhcmlhYmxlcyhzY29wZS5DQUNIRV9GSUxFKTtcblxuICBjb25zdCBwYWNrYWdlSnNvbiA9IGF3YWl0IGZzLnByb21pc2VzLnJlYWRGaWxlKHNjb3BlLlBBQ0tBR0VfRklMRS50b1N0cmluZygpLCAndXRmOCcpO1xuICBjb25zdCBwa2cgPSBKU09OLnBhcnNlKHBhY2thZ2VKc29uKTtcblxuICBzY29wZS5CVUlMRF9UWVBFID0gY29uZmlnLmJ1aWxkVHlwZTtcbiAgc2NvcGUuUFJPSkVDVF9OQU1FID0gcGtnLm5hbWU7XG4gIHNjb3BlLlBST0pFQ1RfVkVSU0lPTiA9IHBrZy52ZXJzaW9uO1xuICBzY29wZS5QUk9KRUNUX0RFU0NSSVBUSU9OID0gcGtnLmRlc2NyaXB0aW9uO1xuICBzY29wZS5QUk9KRUNUX0hPTUVQQUdFX1VSTCA9IHBrZy5ob21lcGFnZTtcblxuICBpZiAoY29uZmlnLmRlc3REaXIpXG4gICAgc2NvcGUuREVTVERJUiA9IGNvbmZpZy5kZXN0RGlyO1xuXG4gIGNvbnN0IHJvb3QgPSBVc2VyQ29udGV4dC5jcmVhdGUoc2NvcGUsIGdsb2JhbCk7XG5cbiAgaWYgKGNvbmZpZy52YXJpYWJsZXMpIHtcbiAgICBmb3IgKGNvbnN0IFtrZXksIHZhbF0gb2YgT2JqZWN0LmVudHJpZXMoY29uZmlnLnZhcmlhYmxlcykpIHtcbiAgICAgIHJvb3Rba2V5XSA9IHZhbDtcbiAgICB9XG4gIH1cblxuICBpZiAocm9vdC5UT09MQ0hBSU5fRklMRSkge1xuICAgIGNvbnN0IHRvb2xjaGFpbiA9IGF3YWl0IGltcG9ydE1vZHVsZShyb290LlRPT0xDSEFJTl9GSUxFKTtcbiAgICBpZiAoIXRvb2xjaGFpbi5kZWZhdWx0KVxuICAgICAgdGhyb3cgbmV3IEVycm9yKFwiVG9vbGNoYWluIG1vZHVsZSBoYXMgbm8gZGVmYXVsdCBleHBvcnRcIik7XG4gICAgY29uc3QgcmVzdWx0ID0gdG9vbGNoYWluLmRlZmF1bHQocm9vdCk7XG4gICAgaWYgKHJlc3VsdCBpbnN0YW5jZW9mIFByb21pc2UpXG4gICAgICBhd2FpdCByZXN1bHQ7XG4gIH1cblxuICBjb25zdCBwbHVnaW5Db250ZXh0ID0gUGx1Z2luQ29udGV4dC5jcmVhdGUoc2NvcGUsIGdsb2JhbCk7XG4gIGZvciAoY29uc3QgcGx1Z2luIG9mIChyb290Lk1BS0VfUExVR0lOX0xJU1QgfHwgW10pKSB7XG4gICAgY29uc3QgZmlsZW5hbWUgPSBGaWxlUGF0aC5jcmVhdGUocGx1Z2luKTtcbiAgICBjb25zdCBtb2R1bGUgPSBhd2FpdCBpbXBvcnRNb2R1bGUoZmlsZW5hbWUudG9TdHJpbmcoKSk7XG4gICAgaWYgKCFtb2R1bGUucGx1Z2luRW50cnkpXG4gICAgICB0aHJvdyBuZXcgRXJyb3IoYFBsdWdpbiAke2ZpbGVuYW1lLmJhc2VuYW1lKCl9IG5vdCBjb250YWluIHBsdWdpbkVudHJ5IGZ1bmN0aW9uYCk7XG4gICAgY29uc3QgcmVzdWx0ID0gbW9kdWxlLnBsdWdpbkVudHJ5KHBsdWdpbkNvbnRleHQpO1xuICAgIGlmIChyZXN1bHQgaW5zdGFuY2VvZiBQcm9taXNlKVxuICAgICAgYXdhaXQgcmVzdWx0O1xuICB9XG5cbiAgZ2xvYmFsLmFkZFN1YmRpcmVjdG9yeShyb290KTtcbiAgYXdhaXQgZ2xvYmFsLmRvU3ViZGlyZWN0b3J5KCk7XG4gIHJvb3QubG9nSW5mbyhcIkNvbmZpZ3VyaW5nIGRvbmVcIik7XG5cbiAgaWYgKHJvb3QuR0xPQkFMX0NPTlRFWFRfSlNPTikge1xuICAgIGNvbnN0IGZpbGVuYW1lID0gcm9vdC5HTE9CQUxfQ09OVEVYVF9KU09OLnRvU3RyaW5nKCk7XG4gICAgY29uc3QgY29udGVudCA9IEpTT04uc3RyaW5naWZ5KGdsb2JhbCwgbnVsbCwgMik7XG4gICAgZnMubWtkaXJTeW5jKHBhdGguZGlybmFtZShmaWxlbmFtZSksIHsgcmVjdXJzaXZlOiB0cnVlIH0pO1xuICAgIGZzLndyaXRlRmlsZVN5bmMoZmlsZW5hbWUsIGNvbnRlbnQsIHsgZW5jb2Rpbmc6IFwidXRmOFwiIH0pO1xuICB9XG5cbiAgY29uc3QgYWxsR29hbExpc3QgPSBnbG9iYWwuY3JlYXRlR29hbHMocm9vdCk7XG4gIGNvbnN0IGdvYWxMaXN0ID0gYWxsR29hbExpc3QuZ2V0VGFyZ2V0TGlzdChcImluc3RhbGxcIik7XG5cbiAgaWYgKHJvb3QuVEFSR0VUX0dPQUxTX0pTT04pIHtcbiAgICBjb25zdCBmaWxlbmFtZSA9IHJvb3QuVEFSR0VUX0dPQUxTX0pTT04udG9TdHJpbmcoKTtcbiAgICBjb25zdCBjb250ZW50ID0gSlNPTi5zdHJpbmdpZnkoZ29hbExpc3QsIG51bGwsIDIpO1xuICAgIGZzLm1rZGlyU3luYyhwYXRoLmRpcm5hbWUoZmlsZW5hbWUpLCB7IHJlY3Vyc2l2ZTogdHJ1ZSB9KTtcbiAgICBmcy53cml0ZUZpbGVTeW5jKGZpbGVuYW1lLCBjb250ZW50LCB7IGVuY29kaW5nOiBcInV0ZjhcIiB9KTtcbiAgfVxuXG4gIGF3YWl0IEdvYWxDb2xsZWN0aW9uLmJ1aWxkR29hbHMoZ29hbExpc3QpO1xufVxuXG5tb2R1bGUuZXhwb3J0cyA9IHtcbiAgYWN0aW9uTWFrZVNjcmlwdCxcbn07XG4iLCJpbXBvcnQgcGF0aCBmcm9tIFwibm9kZTpwYXRoXCI7XG5pbXBvcnQgdXJsIGZyb20gXCJub2RlOnVybFwiO1xuXG5pbXBvcnQgeyBmaWxlRXhpc3RzIH0gZnJvbSBcIkAvdXRpbHMvRmlsZVN5c3RlbVwiO1xuaW1wb3J0IGNvbnN0YW50cyBmcm9tIFwiQC9Db25zdGFudHMuanNcIjtcbmltcG9ydCB7IERFQlVHX0JVSUxEX1RZUEUsIFJFTEVBU0VfQlVJTERfVFlQRSB9IGZyb20gXCJAL2NvcmUvVHlwZXNcIjtcbmltcG9ydCB7IGltcG9ydE1vZHVsZSB9IGZyb20gXCJAL3V0aWxzL01vZHVsZVwiO1xuXG5jb25zdCB7IFVTRVJfQ09ORklHLCBERUZBVUxUX1BSRVNFVCwgUkVRVUVTVF9BVFRFTVBUUyB9ID0gY29uc3RhbnRzO1xuXG5leHBvcnQgY2xhc3MgUnVuU2NyaXB0Q29udGV4dCB7XG4gIF9ub2RlRXhlY3V0YWJsZTtcbiAgX2N1cnJlbnRTY3JpcHQ7XG4gIF9zY3JpcHREaXI7XG4gIF9yb290RGlyO1xuICBfd29ya0RpcjtcbiAgX2VudjtcbiAgX3VzZXJDb25maWc7XG5cbiAgY29uc3RydWN0b3Iob3B0aW9ucylcbiAge1xuICAgIHRoaXMuX25vZGVFeGVjdXRhYmxlID0gb3B0aW9ucy5ub2RlRXhlY3V0YWJsZTtcbiAgICB0aGlzLl9jdXJyZW50U2NyaXB0ID0gb3B0aW9ucy5jdXJyZW50U2NyaXB0O1xuICAgIHRoaXMuX3NjcmlwdERpciA9IG9wdGlvbnMuc2NyaXB0RGlyO1xuICAgIHRoaXMuX3Jvb3REaXIgPSBvcHRpb25zLnJvb3REaXI7XG4gICAgdGhpcy5fd29ya0RpciA9IG9wdGlvbnMud29ya0RpcjtcbiAgICB0aGlzLl9lbnYgPSBPYmplY3Quc2VhbChPYmplY3QuZnJlZXplKG9wdGlvbnMuZW52KSk7XG5cbiAgICBpZiAob3B0aW9ucy51c2VyQ29uZmlnKSB7XG4gICAgICB0aGlzLl91c2VyQ29uZmlnID0gb3B0aW9ucy51c2VyQ29uZmlnO1xuICAgIH1cbiAgfVxuXG4gIGdldCBub2RlRXhlY3V0YWJsZSgpXG4gIHtcbiAgICByZXR1cm4gdGhpcy5fbm9kZUV4ZWN1dGFibGU7XG4gIH1cblxuICBnZXQgY3VycmVudFNjcmlwdCgpXG4gIHtcbiAgICByZXR1cm4gdGhpcy5fY3VycmVudFNjcmlwdDtcbiAgfVxuXG4gIGdldCBzY3JpcHREaXIoKVxuICB7XG4gICAgcmV0dXJuIHRoaXMuX3NjcmlwdERpcjtcbiAgfVxuXG4gIGdldCByb290RGlyKClcbiAge1xuICAgIHJldHVybiB0aGlzLl9yb290RGlyO1xuICB9XG5cbiAgZ2V0IHdvcmtEaXIoKVxuICB7XG4gICAgcmV0dXJuIHRoaXMuX3dvcmtEaXI7XG4gIH1cblxuICBnZXQgZW52KClcbiAge1xuICAgIHJldHVybiB0aGlzLl9lbnY7XG4gIH1cblxuICBnZXRQcmVzZXRQYXRoKHByZXNldClcbiAge1xuICAgIHJldHVybiBwYXRoLnJlc29sdmUodGhpcy5fc2NyaXB0RGlyLCBgcHJlc2V0LyR7cHJlc2V0fS5tanNgKTtcbiAgfVxuXG4gIGdldCB1c2VyQ29uZmlnUGF0aCgpXG4gIHtcbiAgICByZXR1cm4gcGF0aC5yZXNvbHZlKHRoaXMuX3dvcmtEaXIsIFVTRVJfQ09ORklHKTtcbiAgfVxuXG4gIGdldCBidWlsZFR5cGUoKVxuICB7XG4gICAgcmV0dXJuIHRoaXMuX2Vudi5idWlsZFR5cGUgPT0gREVCVUdfQlVJTERfVFlQRSA/IHRoaXMuX2Vudi5idWlsZFR5cGUgOiBSRUxFQVNFX0JVSUxEX1RZUEU7XG4gIH1cblxuICBhc3luYyBnZXRVc2VyQ29uZmlnKClcbiAge1xuICAgIGlmICghdGhpcy5fdXNlckNvbmZpZykge1xuICAgICAgbGV0IGNvbmZpZ1BhdGg7XG4gICAgICBpZiAodGhpcy5fZW52LmNvbmZpZykge1xuICAgICAgICBjb25maWdQYXRoID0gcGF0aC5pc0Fic29sdXRlKHRoaXMuX2Vudi5jb25maWcpID8gdGhpcy5fZW52LmNvbmZpZyA6IHBhdGgucmVzb2x2ZSh0aGlzLl93b3JrRGlyLCB0aGlzLl9lbnYuY29uZmlnKTtcbiAgICAgICAgaWYgKCFhd2FpdCBmaWxlRXhpc3RzKGNvbmZpZ1BhdGgpKVxuICAgICAgICAgIHRocm93IGBDb25maWd1cmF0aW9uICcke3RoaXMuX2Vudi5jb25maWd9JyBmaWxlIGRvZXMgbm90IGV4aXN0YDtcbiAgICAgIH1cbiAgICAgIGVsc2Uge1xuICAgICAgICBjb25zdCB1c2VyQ29uZmlnUGF0aCA9IHBhdGgucmVzb2x2ZSh0aGlzLl93b3JrRGlyLCBVU0VSX0NPTkZJRyk7XG4gICAgICAgIGlmIChhd2FpdCBmaWxlRXhpc3RzKHVzZXJDb25maWdQYXRoKSlcbiAgICAgICAgICBjb25maWdQYXRoID0gdXNlckNvbmZpZ1BhdGg7XG4gICAgICAgIGVsc2VcbiAgICAgICAgICBjb25maWdQYXRoID0gdGhpcy5nZXRQcmVzZXRQYXRoKERFRkFVTFRfUFJFU0VUKTtcbiAgICAgIH1cblxuICAgICAgbGV0IHVzZXJDb25maWcgPSB7fTtcblxuICAgICAgaWYgKGNvbmZpZ1BhdGgpIHtcbiAgICAgICAgY29uc3QgY29uZmlnVXJsID0gdXJsLnBhdGhUb0ZpbGVVUkwoY29uZmlnUGF0aCk7XG4gICAgICAgIGNvbnN0IGNvbmZpZ01vZHVsZSA9IGF3YWl0IGltcG9ydE1vZHVsZShjb25maWdVcmwpO1xuICAgICAgICBzd2l0Y2ggKHR5cGVvZiBjb25maWdNb2R1bGUuZGVmYXVsdCkge1xuICAgICAgICBjYXNlIFwiZnVuY3Rpb25cIjpcbiAgICAgICAgICB1c2VyQ29uZmlnID0gY29uZmlnTW9kdWxlLmRlZmF1bHQodGhpcy5fZW52LCB7fSk7XG4gICAgICAgICAgaWYgKHVzZXJDb25maWcgaW5zdGFuY2VvZiBQcm9taXNlKVxuICAgICAgICAgICAgdXNlckNvbmZpZyA9IGF3YWl0IHVzZXJDb25maWc7XG4gICAgICAgICAgYnJlYWs7XG4gICAgICAgIGNhc2UgXCJvYmplY3RcIjpcbiAgICAgICAgICB1c2VyQ29uZmlnID0gY29uZmlnTW9kdWxlLmRlZmF1bHQ7XG4gICAgICAgICAgYnJlYWs7XG4gICAgICAgIGRlZmF1bHQ6XG4gICAgICAgICAgdGhyb3cgYFVua25vd24gdXNlciBjb25maWd1cmF0aW9uIHR5cGVgO1xuICAgICAgICB9XG4gICAgICB9XG5cbiAgICAgIHRoaXMuX3VzZXJDb25maWcgPSB1c2VyQ29uZmlnO1xuICAgIH1cbiAgICByZXR1cm4gdGhpcy5fdXNlckNvbmZpZztcbiAgfVxuXG4gIGdldCByZXF1ZXN0QXR0ZW1wdHMoKVxuICB7XG4gICAgcmV0dXJuIFJFUVVFU1RfQVRURU1QVFM7XG4gIH1cbn07XG4iLCJcInVzZSBzdHJpY3RcIjtcblxuY29uc3QgcGF0aCA9IHJlcXVpcmUoXCJub2RlOnBhdGhcIik7XG5jb25zdCBmcyA9IHJlcXVpcmUoXCJub2RlOmZzXCIpO1xuXG5jb25zdCB7IEFic29sdXRlUGF0aCB9ID0gcmVxdWlyZShcIkAvY29yZS9QYXRoXCIpO1xuY29uc3QgeyBmaWxlRXhpc3RzLCBmaWxlRXhpc3RzU3luYyB9ID0gcmVxdWlyZShcIkAvdXRpbHMvRmlsZVN5c3RlbVwiKTtcbmNvbnN0IHsgVGFyZ2V0Q29sbGVjdGlvbiB9ID0gcmVxdWlyZShcIkAvY29yZS8vVGFyZ2V0Q29sbGVjdGlvblwiKTtcbmNvbnN0IHsgU2NyaXB0Q29sbGVjdGlvbiB9ID0gcmVxdWlyZShcIkAvY29yZS9TY3JpcHRDb2xsZWN0aW9uXCIpO1xuY29uc3QgeyBJbnRlcmZhY2VUYXJnZXQgfSA9IHJlcXVpcmUoXCJAL2NvcmUvSW50ZXJmYWNlVGFyZ2V0XCIpO1xuY29uc3QgeyBVbmtub3duVGFyZ2V0IH0gPSByZXF1aXJlKFwiLi9Vbmtub3duVGFyZ2V0LmpzXCIpO1xuY29uc3QgeyBHb2FsQ29sbGVjdGlvbiB9ID0gcmVxdWlyZShcIkAvY29yZS9Hb2FsQ29sbGVjdGlvblwiKTtcbmNvbnN0IHsgSW50ZXJmYWNlT2JqZWN0cyB9ID0gcmVxdWlyZShcIkAvY29yZS9JbnRlcmZhY2VPYmplY3RzXCIpO1xuY29uc3QgeyBTb3VyY2VGaWxlIH0gPSByZXF1aXJlKFwiQC9jb3JlL1NvdXJjZUZpbGVcIik7XG5jb25zdCB7IE9iamVjdExpYnJhcnksIFN0YXRpY0xpYnJhcnksIFNoYXJlZExpYnJhcnksIEV4ZWN1dGFibGUgfSA9IHJlcXVpcmUoXCIuL1RhcmdldC5qc1wiKTtcbmNvbnN0IHsgaW1wb3J0TW9kdWxlIH0gPSByZXF1aXJlKFwiQC91dGlscy9Nb2R1bGVcIik7XG5cbmNvbnN0IHJlcXVpcmVJbXBsID0gZXZhbChcInJlcXVpcmVcIik7XG5cbmNvbnN0IFRBUkdFVFMgPSBTeW1ib2woXCJUQVJHRVRTXCIpO1xuY29uc3QgU0NSSVBUUyA9IFN5bWJvbChcIlNDUklQVFNcIik7XG5jb25zdCBDQUNIRSA9IFN5bWJvbChcIkNBQ0hFXCIpO1xuY29uc3QgVU5LTk9XTl9UQVJHRVRTID0gU3ltYm9sKFwiVU5LTk9XTl9UQVJHRVRTXCIpO1xuY29uc3QgSU5URVJGQUNFX1NDUklQVFMgPSBTeW1ib2woXCJJTlRFUkZBQ0VfU0NSSVBUU1wiKTtcbmNvbnN0IElOU1RBTExfTElTVCA9IFN5bWJvbChcIklOU1RBTExfTElTVFwiKTtcbmNvbnN0IFNDUklQVF9WQVJJQUJMRVNfTUFQID0gU3ltYm9sKFwiU0NSSVBUX1ZBUklBQkxFU19NQVBcIik7XG5jb25zdCBTVUJESVJfQUxJQVMgPSBTeW1ib2woXCJTVUJESVJfQUxJQVNcIik7XG5jb25zdCBTVUJESVJfTElTVCA9IFN5bWJvbChcIlNVQkRJUl9MSVNUXCIpO1xuXG5mdW5jdGlvbiBHbG9iYWxDb250ZXh0KCkge1xuICB0aGlzW1RBUkdFVFNdID0gVGFyZ2V0Q29sbGVjdGlvbi5jcmVhdGUoKTtcbiAgdGhpc1tTQ1JJUFRTXSA9IFNjcmlwdENvbGxlY3Rpb24uY3JlYXRlKCk7XG4gIHRoaXNbQ0FDSEVdID0ge307XG4gIHRoaXNbVU5LTk9XTl9UQVJHRVRTXSA9IHt9O1xuICB0aGlzW0lOVEVSRkFDRV9TQ1JJUFRTXSA9IHt9O1xuICB0aGlzW0lOU1RBTExfTElTVF0gPSBbXTtcbiAgdGhpc1tTQ1JJUFRfVkFSSUFCTEVTX01BUF0gPSB7fTtcbiAgdGhpc1tTVUJESVJfQUxJQVNdID0ge307XG4gIHRoaXNbU1VCRElSX0xJU1RdID0gW107XG59XG5cbkdsb2JhbENvbnRleHQuY3JlYXRlID0gKCkgPT4ge1xuICByZXR1cm4gT2JqZWN0LnNlYWwobmV3IEdsb2JhbENvbnRleHQpO1xufVxuXG5HbG9iYWxDb250ZXh0LnByb3RvdHlwZSA9IE9iamVjdC5jcmVhdGUoT2JqZWN0LnByb3RvdHlwZSwge1xuICBjb25zdHJ1Y3Rvcjoge1xuICAgIHZhbHVlOiBHbG9iYWxDb250ZXh0LFxuICAgIGVudW1lcmFibGU6IGZhbHNlLFxuICB9LFxuICBUQVJHRVRTOiB7XG4gICAgZ2V0KCkgeyByZXR1cm4gdGhpc1tUQVJHRVRTXTsgfSxcbiAgICBlbnVtZXJhYmxlOiB0cnVlLFxuICB9LFxuICBTQ1JJUFRTOiB7XG4gICAgZ2V0KCkgeyByZXR1cm4gdGhpc1tTQ1JJUFRTXTsgfSxcbiAgICBlbnVtZXJhYmxlOiB0cnVlLFxuICB9LFxuICBDQUNIRToge1xuICAgIGdldCgpIHsgcmV0dXJuIHRoaXNbQ0FDSEVdOyB9LFxuICAgIGVudW1lcmFibGU6IHRydWUsXG4gIH0sXG4gIFVOS05PV05fVEFSR0VUUzoge1xuICAgIGdldCgpIHsgcmV0dXJuIHRoaXNbVU5LTk9XTl9UQVJHRVRTXTsgfSxcbiAgICBlbnVtZXJhYmxlOiB0cnVlLFxuICB9LFxuICBJTlRFUkZBQ0VfU0NSSVBUUzoge1xuICAgIGdldCgpIHsgcmV0dXJuIHRoaXNbSU5URVJGQUNFX1NDUklQVFNdOyB9LFxuICAgIGVudW1lcmFibGU6IHRydWUsXG4gIH0sXG4gIElOU1RBTExfTElTVDoge1xuICAgIGdldCgpIHsgcmV0dXJuIHRoaXNbSU5TVEFMTF9MSVNUXTsgfSxcbiAgICBlbnVtZXJhYmxlOiB0cnVlLFxuICB9LFxuICBTQ1JJUFRfVkFSSUFCTEVTX01BUDoge1xuICAgIGdldCgpIHsgcmV0dXJuIHRoaXNbU0NSSVBUX1ZBUklBQkxFU19NQVBdOyB9LFxuICAgIGVudW1lcmFibGU6IHRydWUsXG4gIH0sXG4gIFNVQkRJUl9BTElBUzoge1xuICAgIGdldCgpIHsgcmV0dXJuIHRoaXNbU1VCRElSX0FMSUFTXTsgfSxcbiAgICBlbnVtZXJhYmxlOiB0cnVlLFxuICB9LFxufSk7XG5cbkdsb2JhbENvbnRleHQucHJvdG90eXBlLnRvSlNPTiA9IGZ1bmN0aW9uKCkge1xuICBjb25zdCBqc29uID0ge307XG4gIGZvciAoY29uc3Qga2V5IGluIHRoaXMpXG4gICAganNvbltrZXldID0gdGhpc1trZXldO1xuICByZXR1cm4ganNvbjtcbn1cblxuR2xvYmFsQ29udGV4dC5wcm90b3R5cGUuZ2V0VWtub3duVGFyZ2V0ID0gZnVuY3Rpb24obmFtZSkge1xuICBsZXQgdGFyZ2V0ID0gdGhpc1tVTktOT1dOX1RBUkdFVFNdW25hbWVdO1xuICBpZiAoIXRhcmdldCkge1xuICAgIHRoaXNbVU5LTk9XTl9UQVJHRVRTXVtuYW1lXSA9IHRhcmdldCA9IFVua25vd25UYXJnZXQuY3JlYXRlKG5hbWUpO1xuICB9XG4gIHJldHVybiB0YXJnZXQ7XG59XG5cbkdsb2JhbENvbnRleHQucHJvdG90eXBlLmFkZFN5c3RlbVZhcmlhYmxlcyA9IGZ1bmN0aW9uKHZhcmlhYmxlcykge1xuICBjb25zdCBzY3JpcHQgPSB2YXJpYWJsZXMuU0NSSVBUX0ZJTEUudG9TdHJpbmcoKTtcbiAgaWYgKHRoaXNbU0NSSVBUX1ZBUklBQkxFU19NQVBdW3NjcmlwdF0pXG4gICAgdGhyb3cgbmV3IEVycm9yKGBTeXN0ZW1WYXJpYWJsZXMgZXhpc3RzIGZvciAke3NjcmlwdH1gKTtcbiAgdGhpc1tTQ1JJUFRfVkFSSUFCTEVTX01BUF1bc2NyaXB0XSA9IHZhcmlhYmxlcztcbn1cblxuR2xvYmFsQ29udGV4dC5wcm90b3R5cGUucmVzb2x2ZVN1YmRpcmVjdG9yeSA9IGZ1bmN0aW9uKHBhdGgpIHtcbiAgY29uc3QgcmVzb2x2ZWRQYXRoID0gdGhpc1tTVUJESVJfQUxJQVNdW3BhdGgudG9TdHJpbmcoKV07XG4gIHJldHVybiByZXNvbHZlZFBhdGggfHwgcGF0aDtcbn1cblxuR2xvYmFsQ29udGV4dC5wcm90b3R5cGUuYWRkU3ViZGlyZWN0b3J5QWxpYXMgPSBmdW5jdGlvbihzcmMsIGRlc3QpIHtcbiAgdGhpc1tTVUJESVJfQUxJQVNdW3NyYy50b1N0cmluZygpXSA9IGRlc3Q7XG59XG5cbkdsb2JhbENvbnRleHQucHJvdG90eXBlLmxvYWRDYWNoZVZhcmlhYmxlcyA9IGZ1bmN0aW9uKGZpbGVuYW1lKSB7XG4gIGlmIChmaWxlRXhpc3RzU3luYyhmaWxlbmFtZS50b1N0cmluZygpKSkge1xuICAgIGNvbnN0IHZhcmlhYmxlcyA9IHJlcXVpcmVJbXBsKGZpbGVuYW1lLnRvU3RyaW5nKCkpO1xuICAgIHRoaXMuYWRkQ2FjaGVWYXJpYWJsZXModmFyaWFibGVzKTtcbiAgfVxufVxuXG5HbG9iYWxDb250ZXh0LnByb3RvdHlwZS5hZGRDYWNoZVZhcmlhYmxlcyA9IGZ1bmN0aW9uKHZhcmlhYmxlcykge1xuICBjb25zdCBjYWNoZSA9IHRoaXNbQ0FDSEVdO1xuICBmb3IgKGNvbnN0IFtrZXksIGVudHJ5XSBvZiBPYmplY3QuZW50cmllcyh2YXJpYWJsZXMpKSB7XG4gICAgY2FjaGVba2V5XSA9IGVudHJ5O1xuICB9XG59XG5cbkdsb2JhbENvbnRleHQucHJvdG90eXBlLmFkZFN1YmRpcmVjdG9yeSA9IGZ1bmN0aW9uKGNvbnRleHQpIHtcbiAgdGhpc1tTVUJESVJfTElTVF0ucHVzaChjb250ZXh0KTtcbn1cblxuR2xvYmFsQ29udGV4dC5wcm90b3R5cGUuZG9TdWJkaXJlY3RvcnkgPSBhc3luYyBmdW5jdGlvbigpIHtcbiAgd2hpbGUgKHRoaXNbU1VCRElSX0xJU1RdLmxlbmd0aCkge1xuICAgIGNvbnN0IGNvbnRleHQgPSB0aGlzW1NVQkRJUl9MSVNUXS5zaGlmdCgpO1xuXG4gICAgY29uc3Qgc2NvcGUgPSBjb250ZXh0Ll9fc2NvcGUoKTtcblxuICAgIGxldCBzY3JpcHRGaWxlO1xuICAgIGNvbnN0IGZpbGVMaXN0ID0gWyBcIi5qc1wiLCBcIi5tanNcIiBdLm1hcChpID0+IFwiTWFrZVNjcmlwdFwiICsgaSk7XG4gICAgZm9yIChjb25zdCBmaWxlbmFtZSBvZiBmaWxlTGlzdCkge1xuICAgICAgY29uc3QgaXRlciA9IHNjb3BlLlNPVVJDRV9ESVIuam9pbihmaWxlbmFtZSkudG9TdHJpbmcoKTtcbiAgICAgIGlmIChhd2FpdCBmaWxlRXhpc3RzKGl0ZXIpKSB7XG4gICAgICAgIHNjcmlwdEZpbGUgPSBpdGVyO1xuICAgICAgICBicmVhaztcbiAgICAgIH1cbiAgICB9XG5cbiAgICBpZiAoIXNjcmlwdEZpbGUpXG4gICAgICB0aHJvdyBuZXcgRXJyb3IoXCJUaGVyZSBhcmUgbm8gZmlsZXMgZnJvbSB0aGUgbGlzdCBcIiArIGZpbGVMaXN0LmpvaW4oKSk7XG5cbiAgICBzY29wZS5TQ1JJUFRfRklMRSA9IHNjcmlwdEZpbGU7XG4gICAgc2NvcGUuU0NSSVBUX0RJUiA9IHNjb3BlLlNDUklQVF9GSUxFLmRpcm5hbWUoKTtcblxuICAgIHRoaXMuYWRkU3lzdGVtVmFyaWFibGVzKHNjb3BlKTtcbiAgICB0aGlzLmNvcHlDYWNoZVZhcmlhYmxlcyhjb250ZXh0KTtcblxuICAgIGNvbnN0IG1vZHVsZSA9IGF3YWl0IGltcG9ydE1vZHVsZShjb250ZXh0LlNDUklQVF9GSUxFLnRvU3RyaW5nKCkpO1xuXG4gICAgY29uc3QgY3dkU2F2ZSA9IHByb2Nlc3MuY3dkKCk7XG4gICAgcHJvY2Vzcy5jaGRpcihjb250ZXh0LlNPVVJDRV9ESVIudG9TdHJpbmcoKSk7XG5cbiAgICBjb25zdCByZXN1bHQgPSBtb2R1bGUuZGVmYXVsdChjb250ZXh0KTtcbiAgICBpZiAocmVzdWx0IGluc3RhbmNlb2YgUHJvbWlzZSlcbiAgICAgIGF3YWl0IHJlc3VsdDtcblxuICAgIHByb2Nlc3MuY2hkaXIoY3dkU2F2ZSk7XG4gIH1cbn1cblxuZnVuY3Rpb24gZW5zdXJlVmFsdWVCeVR5cGUodHlwZSwgdmFsdWUpIHtcbiAgaWYgKEFycmF5LmlzQXJyYXkodHlwZSkgPyB0eXBlLmluY2x1ZGVzKHZhbHVlKSA6IHR5cGVvZiB2YWx1ZSA9PT0gdHlwZSlcbiAgICByZXR1cm4gdmFsdWU7XG4gIHRocm93IG5ldyBFcnJvcihgVGhlICcke3ZhbHVlfScgaXMgbm90IGEgJHt0eXBlfWApO1xufVxuXG5HbG9iYWxDb250ZXh0LnByb3RvdHlwZS5jb3B5Q2FjaGVWYXJpYWJsZXMgPSBmdW5jdGlvbihzY29wZSkge1xuICBmb3IgKGNvbnN0IFtuYW1lLCBlbnRyeV0gb2YgT2JqZWN0LmVudHJpZXModGhpc1tDQUNIRV0pKSB7XG4gICAgaWYgKCFPYmplY3QuaGFzT3duKHNjb3BlLCBuYW1lKSkge1xuICAgICAgY29uc3QgdHlwZSA9IGVudHJ5LnR5cGUgfHwgdHlwZW9mIGVudHJ5LnZhbHVlO1xuICAgICAgY29uc3QgZGVzY3JpcHRpb24gPSBlbnRyeS5kZXNjcmlwdGlvbiB8fCBcIlwiO1xuICAgICAgbGV0IHZhbHVlID0gQXJyYXkuaXNBcnJheShlbnRyeS52YWx1ZSkgPyBbIC4uLmVudHJ5LnZhbHVlIF0gOiBlbnRyeS52YWx1ZTtcbiAgICAgIGlmICh2YWx1ZSA9PT0gXCIke1BST0pFQ1RfVkVSU0lPTn1cIilcbiAgICAgICAgdmFsdWUgPSBzY29wZS5QUk9KRUNUX1ZFUlNJT047XG4gICAgICBlbHNlIGlmICh2YWx1ZSA9PT0gXCIke1BST0pFQ1RfREVTQ1JJUFRJT059XCIpXG4gICAgICAgIHZhbHVlID0gc2NvcGUuUFJPSkVDVF9ERVNDUklQVElPTjtcbiAgICAgIGVsc2UgaWYgKHZhbHVlID09PSBcIiR7UFJPSkVDVF9IT01FUEFHRV9VUkx9XCIpXG4gICAgICAgIHZhbHVlID0gc2NvcGUuUFJPSkVDVF9IT01FUEFHRV9VUkw7XG4gICAgICBlbHNlIGlmIChlbnRyeS52YWx1ZSA9PT0gXCIke0NNQUtFX1NZU1RFTV9QUk9DRVNTT1J9XCIpXG4gICAgICAgIHZhbHVlID0gc2NvcGUuU1lTVEVNX1BST0NFU1NPUjtcblxuICAgICAgY29uc3QgbmFtZVN5bWJvbCA9IFN5bWJvbChuYW1lKTtcbiAgICAgIHNjb3BlW25hbWVTeW1ib2xdID0gZW5zdXJlVmFsdWVCeVR5cGUodHlwZSwgdmFsdWUpO1xuXG4gICAgICBPYmplY3QuZGVmaW5lUHJvcGVydHkoc2NvcGUsIG5hbWUsIHtcbiAgICAgICAgZW51bWVyYWJsZTogdHJ1ZSxcbiAgICAgICAgZ2V0KCkge1xuICAgICAgICAgIHJldHVybiB0aGlzW25hbWVTeW1ib2xdO1xuICAgICAgICB9LFxuICAgICAgICBzZXQodmFsdWUpIHtcbiAgICAgICAgICB0aGlzW25hbWVTeW1ib2xdID0gZW5zdXJlVmFsdWVCeVR5cGUodHlwZSwgdmFsdWUpO1xuICAgICAgICB9LFxuICAgICAgfSk7XG4gICAgfVxuICB9XG59XG5cbkdsb2JhbENvbnRleHQucHJvdG90eXBlLndyaXRlQ2FjaGVWYXJpYWJsZXMgPSBmdW5jdGlvbihmaWxlbmFtZSkge1xuICBjb25zdCBqc29uID0gSlNPTi5zdHJpbmdpZnkodGhpc1tDQUNIRV0sIG51bGwsIDIpO1xuICBmcy53cml0ZUZpbGVTeW5jKGZpbGVuYW1lLCBqc29uLCBcInV0Zi04XCIpO1xufVxuXG5mdW5jdGlvbiBzY29wZVZhbHVlQXNQcmltaXRpdmVzKG8pIHtcbiAgaWYgKHR5cGVvZiBvID09PSBcInVuZGVmaW5lZFwiKVxuICAgIHJldHVybiBvO1xuICBpZiAodHlwZW9mIG8gPT09IFwiYm9vbGVhblwiKVxuICAgIHJldHVybiBvO1xuICBpZiAodHlwZW9mIG8gPT09IFwibnVtYmVyXCIpXG4gICAgcmV0dXJuIG87XG4gIGlmICh0eXBlb2YgbyA9PT0gXCJzdHJpbmdcIilcbiAgICByZXR1cm4gbztcbiAgaWYgKHR5cGVvZiBvID09PSBcIm9iamVjdFwiKSB7XG4gICAgaWYgKCFvKVxuICAgICAgcmV0dXJuIG87XG4gICAgaWYgKG8gaW5zdGFuY2VvZiBBYnNvbHV0ZVBhdGgpIHtcbiAgICAgIHJldHVybiBvLnRvU3RyaW5nKCk7XG4gICAgfVxuICAgIGlmIChvIGluc3RhbmNlb2YgQXJyYXkpIHtcbiAgICAgIGNvbnN0IHJlc3VsdCA9IFtdO1xuICAgICAgZm9yIChjb25zdCBpIG9mIG8pXG4gICAgICAgIHJlc3VsdC5wdXNoKHNjb3BlVmFsdWVBc1ByaW1pdGl2ZXMoaSkpO1xuICAgICAgcmV0dXJuIHJlc3VsdDtcbiAgICB9XG4gICAgaWYgKG8gaW5zdGFuY2VvZiBPYmplY3QpIHtcbiAgICAgIGNvbnN0IHJlc3VsdCA9IHt9O1xuICAgICAgZm9yIChjb25zdCBbayx2XSBvZiBPYmplY3QuZW50cmllcyhvKSlcbiAgICAgICAgcmVzdWx0W2tdID0gc2NvcGVWYWx1ZUFzUHJpbWl0aXZlcyh2KTtcbiAgICAgIHJldHVybiByZXN1bHQ7XG4gICAgfVxuICB9XG4gIHRocm93IG5ldyBFcnJvcihgVW5rbm93biBpbnN0YW5jZSBvZiAke299YCk7XG59XG5cbkdsb2JhbENvbnRleHQucHJvdG90eXBlLmNyZWF0ZUdvYWxzID0gZnVuY3Rpb24oc2NvcGUpIHtcbiAgZm9yIChjb25zdCBpdGVyIG9mIE9iamVjdC52YWx1ZXModGhpc1tVTktOT1dOX1RBUkdFVFNdKSkge1xuICAgIGNvbnN0IHRhcmdldCA9IHRoaXNbVEFSR0VUU10uZ2V0KGl0ZXIuTkFNRSk7XG4gICAgdGFyZ2V0LmFkZFNvdXJjZXMoaXRlci5TT1VSQ0VTKTtcbiAgICB0YXJnZXQuSU5DTFVERVMucHVzaCguLi5pdGVyLklOQ0xVREVTKTtcbiAgICB0YXJnZXQuREVGSU5FUy5wdXNoKC4uLml0ZXIuREVGSU5FUyk7XG4gICAgdGFyZ2V0LkNPTVBJTEVfT1BUSU9OUy5wdXNoKC4uLml0ZXIuQ09NUElMRV9PUFRJT05TKTtcbiAgICB0YXJnZXQuTElOS19PUFRJT05TLnB1c2goLi4uaXRlci5MSU5LX09QVElPTlMpO1xuICB9XG5cbiAgZm9yIChjb25zdCBpdGVyIG9mIE9iamVjdC52YWx1ZXModGhpc1tJTlRFUkZBQ0VfU0NSSVBUU10pKSB7XG4gICAgY29uc3Qgc2NyaXB0ID0gdGhpc1tTQ1JJUFRTXS5nZXQoaXRlci5OQU1FKTtcbiAgICBmb3IgKGNvbnN0IFtrZXksIHZhbHNdIG9mIE9iamVjdC5lbnRyaWVzKGl0ZXIuUFJPUEVSVElFUykpXG4gICAgICBzY3JpcHQuYWRkUHJvcGVydHkoa2V5LCAuLi52YWxzKTtcbiAgfVxuXG4gIGNvbnN0IGdvYWxMaXN0ID0gR29hbENvbGxlY3Rpb24uY3JlYXRlKCk7XG4gIGZvciAoY29uc3QgW25hbWUsIHNjcmlwdF0gb2YgT2JqZWN0LmVudHJpZXModGhpc1tTQ1JJUFRTXS5FTlRSSUVTKSkgeyAgIFxuICAgIGNvbnN0IGRlcGVuZHMgPSBbIHNjcmlwdC5GSUxFLnRvU3RyaW5nKCkgXTtcbiAgICBpZiAoc2NyaXB0LklOUFVUKVxuICAgICAgZGVwZW5kcy5wdXNoKHNjcmlwdC5JTlBVVC50b1N0cmluZygpKTtcbiAgICBjb25zdCBtc2cgPSBcIlxceDFiWzM2bVwiICsgXCJHZW5lcmF0aW5nIFwiICsgc2NyaXB0LlRBUkdFVF9TQ09QRS5CSU5BUllfRElSLnJlbGF0aXZlKHNjcmlwdC5PVVRQVVQpICsgXCJcXHgxYlswbVwiO1xuICAgIGNvbnN0IHBhcmFtcyA9IHsgLi4uc2NyaXB0LlBST1BFUlRJRVMsIC4uLnNjcmlwdC5QQVJBTVMgfTtcbiAgICBnb2FsTGlzdC5hZGRTY3JpcHQoc2NyaXB0LkZJTEUsIFwiXCIsIGRlcGVuZHMsIHNjcmlwdC5PVVRQVVQudG9TdHJpbmcoKSwgc2NvcGVWYWx1ZUFzUHJpbWl0aXZlcyhwYXJhbXMpLCBtc2cpO1xuICB9XG5cbiAgZm9yIChjb25zdCBbbmFtZSwgdGFyZ2V0XSBvZiBPYmplY3QuZW50cmllcyh0aGlzW1RBUkdFVFNdLkVOVFJJRVMpKSB7XG4gICAgY29uc3QgaGVhZGVycyA9IHRoaXNbVEFSR0VUU10uYWxsSGVhZGVyc09mKHRhcmdldCk7XG4gICAgY29uc3QgZGVwZW5kcyA9IFtdO1xuICAgIGZvciAoY29uc3QgcyBvZiB0YXJnZXQuU09VUkNFUykge1xuICAgICAgaWYgKHMgaW5zdGFuY2VvZiBJbnRlcmZhY2VPYmplY3RzKSB7XG4gICAgICAgIGNvbnN0IHQgPSB0aGlzW1RBUkdFVFNdLmdldChzLnRhcmdldE5hbWUpO1xuICAgICAgICBmb3IgKGNvbnN0IGYgb2YgdC5TT1VSQ0VTKSB7XG4gICAgICAgICAgaWYgKGYgaW5zdGFuY2VvZiBTb3VyY2VGaWxlICYmIGYuT0JKRUNUX0ZJTEUpXG4gICAgICAgICAgICBkZXBlbmRzLnB1c2goZi5PQkpFQ1RfRklMRS50b1N0cmluZygpKTtcbiAgICAgICAgfVxuICAgICAgICBjb250aW51ZTtcbiAgICAgIH1cblxuICAgICAgaWYgKHMuSEVBREVSX0ZJTEVfT05MWSlcbiAgICAgICAgY29udGludWU7XG5cbiAgICAgIGZzLm1rZGlyU3luYyhzLk9CSkVDVF9GSUxFX0RJUi50b1N0cmluZygpLCB7IHJlY3Vyc2l2ZTogdHJ1ZSB9KTtcblxuICAgICAgY29uc3QgcmVsYXRpdmVPYmplY3QgPSB0YXJnZXQuVEFSR0VUX1NDT1BFLkJJTkFSWV9ESVIucmVsYXRpdmUocy5PQkpFQ1RfRklMRSk7XG4gICAgICBjb25zdCByZWxhdGl2ZUJpbmFyeURpciA9IHNjb3BlLlBST0pFQ1RfQklOQVJZX0RJUi5yZWxhdGl2ZSh0YXJnZXQuVEFSR0VUX1NDT1BFLkJJTkFSWV9ESVIpO1xuICAgICAgY29uc3QgbXNnID0gXCJcXHgxYlszMm1cIiArIGBCdWlsZGluZyAke3MuTEFOR1VBR0V9IG9iamVjdCAke3JlbGF0aXZlQmluYXJ5RGlyfS8ke3JlbGF0aXZlT2JqZWN0fWAgKyBcIlxceDFiWzBtXCI7XG5cbiAgICAgIGNvbnN0IGRlZmluaXRpb25zID0gW1xuICAgICAgICAuLi50aGlzW1RBUkdFVFNdLmFsbERlZmluaXRpb25zT2YodGFyZ2V0KSxcbiAgICAgICAgLi4ucy5ERUZJTkVTLFxuICAgICAgXTtcblxuICAgICAgY29uc3QgYXJncyA9IFtdO1xuICAgICAgYXJncy5wdXNoKC4uLmRlZmluaXRpb25zLm1hcChpID0+IFwiLURcIiArIGkpKTtcbiAgICAgIGFyZ3MucHVzaCguLi50aGlzW1RBUkdFVFNdLmFsbEluY2x1ZGVzT2YodGFyZ2V0KS5tYXAoaSA9PiBcIi1JXCIgKyBpKSk7XG4gICAgICBhcmdzLnB1c2goLi4udGhpc1tUQVJHRVRTXS5hbGxDb21waWxlT3B0aW9uc09mKHRhcmdldCkpO1xuICAgICAgaWYgKHRhcmdldC5QT1NJVElPTl9JTkRFUEVOREVOVF9DT0RFKVxuICAgICAgICBhcmdzLnB1c2goXCItZlBJQ1wiKTtcbiAgICAgIGFyZ3MucHVzaCguLi5zLkNPTVBJTEVfRkxBR1MuZmxhdCgpKTtcbiAgICAgIGFyZ3MucHVzaChcIi1vXCIsIHJlbGF0aXZlT2JqZWN0KTtcbiAgICAgIGFyZ3MucHVzaChcIi1jXCIsIHMuRklMRSk7XG4gICAgICBjb25zdCBjd2QgPSB0YXJnZXQuVEFSR0VUX1NDT1BFLkJJTkFSWV9ESVIudG9TdHJpbmcoKTtcblxuICAgICAgY29uc3QgY29tbWFuZCA9IHRhcmdldC5UQVJHRVRfU0NPUEVbcy5MQU5HVUFHRSArIFwiX0NPTVBJTEVSXCJdLnRvU3RyaW5nKCk7XG4gICAgICBjb25zdCBvdXRwdXQgPSB0YXJnZXQuVEFSR0VUX1NDT1BFLkJJTkFSWV9ESVIuam9pbihyZWxhdGl2ZU9iamVjdCkudG9TdHJpbmcoKTtcbiAgICAgIGRlcGVuZHMucHVzaChvdXRwdXQpO1xuXG4gICAgICBnb2FsTGlzdC5hZGRFeGVjKG91dHB1dCwgWyAuLi5oZWFkZXJzLCBzLkZJTEUgXSwgY29tbWFuZCwgYXJncywgY3dkLCBtc2cpO1xuICAgIH1cblxuICAgIGNvbnN0IGxpbmtPcHRpb25zID0gdGhpc1tUQVJHRVRTXS5hbGxMaW5rT3B0aW9uc09mKHRhcmdldCk7XG4gICAgaWYgKHRhcmdldCBpbnN0YW5jZW9mIE9iamVjdExpYnJhcnkpIHtcbiAgICAgIGNvbnN0IG9ianMgPSBkZXBlbmRzLmZpbHRlcihpID0+IGkuZW5kc1dpdGgoXCIub1wiKSB8fCBpLmVuZHNXaXRoKFwiLm9ialwiKSkubWFwKGkgPT4gdGFyZ2V0LkZJTEVfRElSLnJlbGF0aXZlKGkpKTtcbiAgICAgIGlmIChvYmpzLmxlbmd0aCkge1xuICAgICAgICBjb25zdCBhcmdzID0gW1xuICAgICAgICAgIC4uLmxpbmtPcHRpb25zLFxuICAgICAgICAgIFwiLXJcIixcbiAgICAgICAgICBcIi1vXCIsIHRhcmdldC5GSUxFX05BTUUsXG4gICAgICAgICAgLi4ub2Jqc1xuICAgICAgICBdO1xuICAgICAgICBjb25zdCBjd2QgPSB0YXJnZXQuRklMRV9ESVIudG9TdHJpbmcoKTtcbiAgICAgICAgY29uc3QgbXNnID0gYExpbmtpbmcgQ1hYIG9iamVjdCBsaWJyYXJ5ICR7dGFyZ2V0LkZJTEVfTkFNRX1gO1xuICAgICAgICBnb2FsTGlzdC5hZGRFeGVjKHRhcmdldC5GSUxFLnRvU3RyaW5nKCksIGRlcGVuZHMsIHNjb3BlLkxJTktFUiwgYXJncywgY3dkLCBtc2cpO1xuICAgICAgfVxuICAgICAgZWxzZSB7XG4gICAgICAgIGNvbnNvbGUubG9nKGBObyBvYmplY3RzIGZvciBcIiR7dGFyZ2V0Lk5BTUV9XCJgKTtcbiAgICAgIH1cbiAgICB9XG5cbiAgICBpZiAodGFyZ2V0IGluc3RhbmNlb2YgU3RhdGljTGlicmFyeSkge1xuICAgICAgY29uc3Qgb2JqcyA9IGRlcGVuZHMuZmlsdGVyKGkgPT4gaS5lbmRzV2l0aChcIi5vXCIpIHx8IGkuZW5kc1dpdGgoXCIub2JqXCIpKS5tYXAoaSA9PiB0YXJnZXQuRklMRV9ESVIucmVsYXRpdmUoaSkpO1xuICAgICAgaWYgKG9ianMubGVuZ3RoKSB7XG4gICAgICAgIGNvbnN0IGFyZ3MgPSBbIFwicmNcIiwgdGFyZ2V0LkZJTEVfTkFNRSAsIC4uLm9ianMgXTtcbiAgICAgICAgY29uc3QgY3dkID0gdGFyZ2V0LkZJTEVfRElSLnRvU3RyaW5nKCk7XG4gICAgICAgIGNvbnN0IG1zZyA9IGBMaW5raW5nIENYWCBzdGF0aWMgbGlicmFyeSAke3RhcmdldC5GSUxFX05BTUV9YDtcbiAgICAgICAgZ29hbExpc3QuYWRkRXhlYyh0YXJnZXQuRklMRS50b1N0cmluZygpLCBkZXBlbmRzLCBzY29wZS5BUiwgYXJncywgY3dkLCBtc2cpO1xuICAgICAgfVxuICAgICAgZWxzZSB7XG4gICAgICAgIGNvbnNvbGUubG9nKGBObyBvYmplY3RzIGZvciBcIiR7dGFyZ2V0Lk5BTUV9XCJgKTtcbiAgICAgIH1cbiAgICB9XG5cbiAgICBpZiAodGFyZ2V0IGluc3RhbmNlb2YgU2hhcmVkTGlicmFyeSkge1xuICAgICAgdGhyb3cgbmV3IEVycm9yKFwiTm90IGltcGxlbWVudGVkXCIpO1xuICAgIH1cblxuICAgIGlmICh0YXJnZXQgaW5zdGFuY2VvZiBFeGVjdXRhYmxlKSB7XG4gICAgICBjb25zdCBvYmpzID0gZGVwZW5kcy5maWx0ZXIoaSA9PiBpLmVuZHNXaXRoKFwiLm9cIikgfHwgaS5lbmRzV2l0aChcIi5vYmpcIikpLm1hcChpID0+IHRhcmdldC5GSUxFX0RJUi5yZWxhdGl2ZShpKSk7XG4gICAgICBpZiAob2Jqcy5sZW5ndGgpIHtcbiAgICAgICAgY29uc3QgbGlicyA9IHRoaXNbVEFSR0VUU10uYWxsTGlicmFyaWVzT2YodGFyZ2V0KTtcbiAgICAgICAgY29uc3QgYXJncyA9IFtcbiAgICAgICAgICAuLi50YXJnZXQuVEFSR0VUX1NDT1BFLkNYWF9GTEFHUyxcbiAgICAgICAgICAuLi5saW5rT3B0aW9ucyxcbiAgICAgICAgICAuLi5vYmpzLFxuICAgICAgICAgIFwiLW9cIiwgdGFyZ2V0LkZJTEVfTkFNRSxcbiAgICAgICAgICAuLi5saWJzLm1hcChpID0+IHRhcmdldC5GSUxFX0RJUi5yZWxhdGl2ZShpKSksXG4gICAgICAgIF07XG4gICAgICAgIGNvbnN0IGN3ZCA9IHRhcmdldC5GSUxFX0RJUi50b1N0cmluZygpO1xuICAgICAgICBjb25zdCBtc2cgPSBgTGlua2luZyBDWFggZXhlY3V0YWJsZSAke3RhcmdldC5GSUxFX05BTUV9YDtcbiAgICAgICAgZ29hbExpc3QuYWRkRXhlYyh0YXJnZXQuRklMRS50b1N0cmluZygpLCBkZXBlbmRzLmNvbmNhdChsaWJzKSwgc2NvcGUuQ1hYX0NPTVBJTEVSLCBhcmdzLCBjd2QsIG1zZyk7XG4gICAgICB9XG4gICAgICBlbHNlIHtcbiAgICAgICAgY29uc29sZS5sb2coYE5vIG9iamVjdHMgZm9yIFwiJHt0YXJnZXQuTkFNRX1cImApO1xuICAgICAgfVxuICAgIH1cblxuICAgIGdvYWxMaXN0LmFkZFRhcmdldChuYW1lLCBbIHRhcmdldC5GSUxFLnRvU3RyaW5nKCkgXSwgYEJ1aWx0IHRhcmdldCAke25hbWV9YCk7XG4gIH1cblxuICBjb25zdCBpbnN0YWxsX2ZpbGVzID0gW107XG4gIGNvbnN0IGluc3RhbGxfc2NyaXB0ID0gcGF0aC5wb3NpeC5qb2luKF9fZGlybmFtZSwgXCJTeXN0ZW1TY3JpcHRzL2luc3RhbGxfc2NyaXB0LmpzXCIpO1xuICBmb3IgKGNvbnN0IGl0ZXIgb2YgdGhpc1tJTlNUQUxMX0xJU1RdKSB7XG4gICAgbGV0IHNyYywgZGVzdDtcbiAgICBpZiAoaXRlci5WQUxVRSBpbnN0YW5jZW9mIEFic29sdXRlUGF0aCkge1xuICAgICAgaWYgKHNjb3BlLlBSRVZFTlRfSU5TVEFMTF9GSUxFUylcbiAgICAgICAgY29udGludWU7XG4gICAgICBzcmMgPSBpdGVyLlZBTFVFLnRvU3RyaW5nKCk7XG4gICAgICBjb25zdCByZmlsZSA9IGl0ZXIuQkFTRV9ESVIucmVsYXRpdmUoaXRlci5WQUxVRSk7XG4gICAgICBkZXN0ID0gaXRlci5ERVNUSU5BVElPTi5qb2luKHJmaWxlKTtcbiAgICB9XG4gICAgZWxzZSBpZiAoaXRlci5WQUxVRSBpbnN0YW5jZW9mIEludGVyZmFjZVRhcmdldCkge1xuICAgICAgY29uc3QgdGFyZ2V0ID0gdGhpc1tUQVJHRVRTXS5nZXQoaXRlci5WQUxVRS50YXJnZXROYW1lKTtcbiAgICAgIHNyYyA9IHRhcmdldC5GSUxFLnRvU3RyaW5nKCk7XG4gICAgICBkZXN0ID0gaXRlci5ERVNUSU5BVElPTi5qb2luKHRhcmdldC5GSUxFX05BTUUpO1xuICAgIH1cbiAgICBlbHNlIHtcbiAgICAgIHRocm93IG5ldyBFcnJvcihgQ2FuIG5vdCBpbnN0YWxsICR7aXRlci5WQUxVRX1gKVxuICAgIH1cbiAgICBpZiAoc2NvcGUuREVTVERJUilcbiAgICAgIGRlc3QgPSBzY29wZS5ERVNURElSLmpvaW4oZGVzdCkudG9TdHJpbmcoKTtcbiAgICBnb2FsTGlzdC5hZGRTY3JpcHQoaW5zdGFsbF9zY3JpcHQsIFwiXCIsIFsgc3JjIF0sIGRlc3QsIHNjb3BlVmFsdWVBc1ByaW1pdGl2ZXMoe3NyYywgZGVzdH0pLCBcIlwiKTtcbiAgICBpbnN0YWxsX2ZpbGVzLnB1c2goZGVzdCk7XG4gIH1cblxuICBpZiAoaW5zdGFsbF9maWxlcy5sZW5ndGgpIHtcbiAgICBnb2FsTGlzdC5hZGRUYXJnZXQoXCJpbnN0YWxsXCIsIGluc3RhbGxfZmlsZXMsIFwiXCIpO1xuICB9XG5cbiAgZ29hbExpc3QuYWRkVGFyZ2V0KFwiYWxsXCIsIE9iamVjdC5rZXlzKHRoaXNbVEFSR0VUU10uRU5UUklFUyksIFwiXCIpO1xuXG4gIHJldHVybiBnb2FsTGlzdDtcbn1cblxubW9kdWxlLmV4cG9ydHMgPSB7XG4gIEdsb2JhbENvbnRleHQsXG59O1xuIiwiY29uc3QgZnMgPSByZXF1aXJlKFwibm9kZTpmc1wiKTtcbmNvbnN0IHBhdGggPSByZXF1aXJlKFwibm9kZTpwYXRoXCIpO1xuXG5tb2R1bGUuZXhwb3J0cyA9IChwYXJhbXMpID0+IHtcbiAgY29uc3QgY29udGVudCA9IGZzLnJlYWRGaWxlU3luYyhwYXJhbXMuaW5wdXQsIFwidXRmLThcIik7XG4gIGNvbnN0IG5ld0NvbnRlbnQgPSBjb250ZW50LnJlcGxhY2UoL0AoW19BLVphLXpdW19BLVphLXowLTldKylAL2csIChtYXRjaCwgdmFsdWUpID0+IHtcbiAgICBjb25zdCByZXMgPSBwYXJhbXNbdmFsdWVdIHx8IFwiXCI7XG4gICAgaWYgKEFycmF5LmlzQXJyYXkocmVzKSlcbiAgICAgIHJldHVybiByZXMuam9pbihcIlxcblwiKTtcbiAgICByZXR1cm4gcmVzLnRvU3RyaW5nKCk7XG4gIH0pO1xuICBmcy5ta2RpclN5bmMocGF0aC5kaXJuYW1lKHBhcmFtcy5vdXRwdXQpLCB7IHJlY3Vyc2l2ZTogdHJ1ZSB9KTtcbiAgZnMud3JpdGVGaWxlU3luYyhwYXJhbXMub3V0cHV0LCBuZXdDb250ZW50LCBcInV0Zi04XCIpO1xufVxuIiwiY29uc3QgZnMgPSByZXF1aXJlKFwibm9kZTpmc1wiKTtcbmNvbnN0IHBhdGggPSByZXF1aXJlKFwibm9kZTpwYXRoXCIpO1xuXG5tb2R1bGUuZXhwb3J0cyA9ICh7c3JjLCBkZXN0fSkgPT4ge1xuICBjb25zb2xlLmxvZyhcIkluc3RhbGxpbmc6IFwiICsgZGVzdCk7XG4gIGZzLm1rZGlyU3luYyhwYXRoLmRpcm5hbWUoZGVzdCksIHsgcmVjdXJzaXZlOiB0cnVlIH0pO1xuICBmcy5jcFN5bmMoc3JjLCBkZXN0LCB7IGZvcmNlOiB0cnVlIH0pO1xufVxuIiwiXCJ1c2Ugc3RyaWN0XCI7XG5cbmNvbnN0IHsgZW5zdXJlQm9vbGVhbiwgZW5zdXJlU3RyaW5nIH0gPSByZXF1aXJlKFwiQC91dGlscy9TdHJpY3RUeXBlXCIpO1xuY29uc3QgeyBBYnNvbHV0ZVBhdGggfSA9IHJlcXVpcmUoXCJAL2NvcmUvUGF0aFwiKTtcblxuY29uc3QgREVGSU5FX01BUCA9IFN5bWJvbChcIkRFRklORV9NQVBcIik7XG5cbmZ1bmN0aW9uIFN5c3RlbVZhcmlhYmxlcygpIHtcbiAgZm9yIChjb25zdCB7IHN5bWJvbCwgaW5pdFZhbHVlIH0gb2YgT2JqZWN0LnZhbHVlcyh0aGlzW0RFRklORV9NQVBdIHx8IHt9KSkge1xuICAgIHRoaXNbc3ltYm9sXSA9IEFycmF5LmlzQXJyYXkoaW5pdFZhbHVlKSA/IEFycmF5LmZyb20oaW5pdFZhbHVlKSA6IGluaXRWYWx1ZTtcbiAgfVxufVxuXG5TeXN0ZW1WYXJpYWJsZXMuY3JlYXRlID0gZnVuY3Rpb24oKSB7XG4gIHJldHVybiBPYmplY3Quc2VhbChuZXcgU3lzdGVtVmFyaWFibGVzKTtcbn1cblxuU3lzdGVtVmFyaWFibGVzLnByb3RvdHlwZSA9IE9iamVjdC5jcmVhdGUoT2JqZWN0LnByb3RvdHlwZSwge1xuICBjb25zdHJ1Y3Rvcjoge1xuICAgIHZhbHVlOiBTeXN0ZW1WYXJpYWJsZXMsXG4gICAgZW51bWVyYWJsZTogZmFsc2UsXG4gIH0sXG59KTtcblxuU3lzdGVtVmFyaWFibGVzLmRlZmluZVZhcmlhYmxlID0gZnVuY3Rpb24oc2NvcGUsIG5hbWUsIGRlc2NyaXB0b3IpIHtcbiAgaWYgKCFzY29wZVtERUZJTkVfTUFQXSlcbiAgICBzY29wZVtERUZJTkVfTUFQXSA9IHt9O1xuXG4gIGNvbnN0IHR5cGUgPSBkZXNjcmlwdG9yLnR5cGUgfHwgKEFycmF5LmlzQXJyYXkoZGVzY3JpcHRvci52YWx1ZSkgPyBcImFycmF5XCIgOiB0eXBlb2YgZGVzY3JpcHRvci52YWx1ZSk7XG5cbiAgbGV0IGRlZmluZUVudHJ5ID0gc2NvcGVbREVGSU5FX01BUF1bbmFtZV07XG4gIGlmICghZGVmaW5lRW50cnkpIHtcbiAgICBkZWZpbmVFbnRyeSA9IHt9O1xuICAgIHNjb3BlW0RFRklORV9NQVBdW25hbWVdID0gZGVmaW5lRW50cnk7XG4gIH1cblxuICBpZiAoZGVmaW5lRW50cnkudHlwZSAhPT0gdHlwZSkge1xuICAgIGRlZmluZUVudHJ5LnN5bWJvbCA9IFN5bWJvbChuYW1lKTtcbiAgfVxuXG4gIGRlZmluZUVudHJ5LnR5cGUgPSB0eXBlO1xuICBkZWZpbmVFbnRyeS5kZXNjcmlwdGlvbiA9IGRlc2NyaXB0b3IuZGVzY3JpcHRpb24gfHwgXCJcIjtcblxuICBsZXQgZW5zdXJlVmFsdWU7XG4gIGlmIChBcnJheS5pc0FycmF5KHR5cGUpKSB7XG4gICAgbGV0IGl0ZW1UeXBlO1xuICAgIGZvciAoY29uc3QgaXRlciBvZiB0eXBlKSB7XG4gICAgICBjb25zdCBpdCA9IHR5cGVvZiBpdGVyO1xuICAgICAgaWYgKCFpdGVtVHlwZSlcbiAgICAgICAgaXRlbVR5cGUgPSBpdDtcbiAgICAgIGVsc2UgaWYgKGl0ZW1UeXBlICE9PSBpdClcbiAgICAgICAgdGhyb3cgbmV3IEVycm9yKGBBbGwgZWxlbWVudHMgZm9yICR7bmFtZX0gbXVzdCBiZSBvZiB0aGUgc2FtZSB0eXBlYCk7XG4gICAgfVxuICAgIGlmIChpdGVtVHlwZSAhPT0gXCJib29sZWFuXCIgJiYgaXRlbVR5cGUgIT09IFwic3RyaW5nXCIpXG4gICAgICB0aHJvdyBuZXcgRXJyb3IoYFVua25vd24gJHtpdGVtVHlwZX0gZWxlbWVudCB0eXBlIG9mICR7bmFtZX0gdmFyaWFibGVgKTtcbiAgICBlbnN1cmVWYWx1ZSA9ICh2YWx1ZSkgPT4ge1xuICAgICAgaWYgKHR5cGUuaW5jbHVkZXModmFsdWUpKVxuICAgICAgICByZXR1cm4gdmFsdWU7XG4gICAgICB0aHJvdyBuZXcgRXJyb3IoYFRoZSAnJHt2YWx1ZX0nIGlzIG5vdCBhICR7dHlwZX1gKTtcbiAgICB9XG4gIH1cbiAgZWxzZSBpZiAodHlwZSA9PT0gXCJib29sZWFuXCIpXG4gICAgZW5zdXJlVmFsdWUgPSBlbnN1cmVCb29sZWFuO1xuICBlbHNlIGlmICh0eXBlID09PSBcInN0cmluZ1wiKVxuICAgIGVuc3VyZVZhbHVlID0gZW5zdXJlU3RyaW5nO1xuICBlbHNlIGlmICh0eXBlID09PSBcIkRpclBhdGhcIilcbiAgICBlbnN1cmVWYWx1ZSA9IEFic29sdXRlUGF0aC5jcmVhdGVEaXI7XG4gIGVsc2UgaWYgKHR5cGUgPT09IFwiRmlsZVBhdGhcIilcbiAgICBlbnN1cmVWYWx1ZSA9IEFic29sdXRlUGF0aC5jcmVhdGVGaWxlO1xuICBlbHNlIGlmICh0eXBlID09PSBcImFycmF5XCIpXG4gICAgLyogKi87XG4gIGVsc2VcbiAgICB0aHJvdyBuZXcgRXJyb3IoYFVua25vd24gJHt0eXBlfSB0eXBlIG9mICR7bmFtZX0gdmFyaWFibGVgKTtcblxuICBpZiAoZGVzY3JpcHRvci5oYXNPd25Qcm9wZXJ0eShcInZhbHVlXCIpKSB7XG4gICAgZGVmaW5lRW50cnkuaW5pdFZhbHVlID0gKHR5cGUgPT09IFwiYXJyYXlcIikgPyBBcnJheS5mcm9tKGRlc2NyaXB0b3IudmFsdWUpIDogZW5zdXJlVmFsdWUoZGVzY3JpcHRvci52YWx1ZSk7XG4gIH1cbiAgZWxzZSB7XG4gICAgZGVmaW5lRW50cnkuaW5pdFZhbHVlID0gKHR5cGUgPT09IFwiYXJyYXlcIikgPyBbXSA6IG51bGw7XG4gIH1cblxuICBjb25zdCB7IHN5bWJvbCB9ID0gZGVmaW5lRW50cnk7XG4gIGNvbnN0IGRlc2MgPSB7XG4gICAgY29uZmlndXJhYmxlOiB0cnVlLFxuICAgIGVudW1lcmFibGU6IHRydWUsXG4gICAgZ2V0KCkgeyByZXR1cm4gdGhpc1tzeW1ib2xdIH0sXG4gIH07XG5cbiAgaWYgKGVuc3VyZVZhbHVlKVxuICAgIGRlc2Muc2V0ID0gZnVuY3Rpb24odmFsdWUpIHsgdGhpc1tzeW1ib2xdID0gZW5zdXJlVmFsdWUodmFsdWUpIH07XG5cbiAgT2JqZWN0LmRlZmluZVByb3BlcnR5KHNjb3BlLCBuYW1lLCBkZXNjKTtcbn1cblxuU3lzdGVtVmFyaWFibGVzLmRlZmluZVZhcmlhYmxlcyA9IGZ1bmN0aW9uKHNjb3BlLCBkZXNjcmlwdG9ycykge1xuICBmb3IgKGNvbnN0IFsgbmFtZSwgZGVzY3JpcHRvciBdIG9mIE9iamVjdC5lbnRyaWVzKGRlc2NyaXB0b3JzKSlcbiAgICBTeXN0ZW1WYXJpYWJsZXMuZGVmaW5lVmFyaWFibGUoc2NvcGUsIG5hbWUsIGRlc2NyaXB0b3IpO1xufVxuXG5TeXN0ZW1WYXJpYWJsZXMucHJvdG90eXBlLnRvSlNPTiA9IGZ1bmN0aW9uKCkge1xuICBjb25zdCBqc29uID0ge307XG4gIGZvciAoY29uc3Qga2V5IGluIHRoaXMpXG4gICAganNvbltrZXldID0gdGhpc1trZXldO1xuICByZXR1cm4ganNvbjtcbn1cblxuU3lzdGVtVmFyaWFibGVzLnByb3RvdHlwZS5jbG9uZSA9IGZ1bmN0aW9uKCkge1xuICBjb25zdCBvID0gT2JqZWN0LmNyZWF0ZShTeXN0ZW1WYXJpYWJsZXMucHJvdG90eXBlKTtcblxuICBmb3IgKGNvbnN0IHsgc3ltYm9sIH0gb2YgT2JqZWN0LnZhbHVlcyh0aGlzW0RFRklORV9NQVBdIHx8IHt9KSkge1xuICAgIG9bc3ltYm9sXSA9IEFycmF5LmlzQXJyYXkodGhpc1tzeW1ib2xdKSA/IEFycmF5LmZyb20odGhpc1tzeW1ib2xdKSA6IHRoaXNbc3ltYm9sXTtcbiAgfVxuXG4gIHJldHVybiBPYmplY3Quc2VhbChvKTtcbn1cblxubW9kdWxlLmV4cG9ydHMgPSB7XG4gIFN5c3RlbVZhcmlhYmxlcyxcbn07XG4iLCJcInVzZSBzdHJpY3RcIjtcblxuY29uc3QgeyBlbnN1cmVTdHJpbmcgfSA9IHJlcXVpcmUoXCJAL3V0aWxzL1N0cmljdFR5cGVcIik7XG5jb25zdCB7IFNvdXJjZUZpbGUgfSA9IHJlcXVpcmUoXCJAL2NvcmUvU291cmNlRmlsZVwiKTtcbmNvbnN0IHsgU291cmNlRmlsZUxpc3QgfSA9IHJlcXVpcmUoXCJAL2NvcmUvU291cmNlRmlsZUxpc3RcIik7XG5jb25zdCB7IEluY2x1ZGVEaXJlY3RvcnkgfSA9IHJlcXVpcmUoXCJAL2NvcmUvSW5jbHVkZURpcmVjdG9yeVwiKTtcbmNvbnN0IHsgSW50ZXJmYWNlVGFyZ2V0IH0gPSByZXF1aXJlKFwiQC9jb3JlL0ludGVyZmFjZVRhcmdldFwiKTtcbmNvbnN0IHsgSW50ZXJmYWNlSW5jbHVkZXMgfSA9IHJlcXVpcmUoXCJAL2NvcmUvSW50ZXJmYWNlSW5jbHVkZXNcIik7XG5jb25zdCB7IEludGVyZmFjZU9iamVjdHMgfSA9IHJlcXVpcmUoXCJAL2NvcmUvSW50ZXJmYWNlT2JqZWN0c1wiKTtcbmNvbnN0IHsgQWJzb2x1dGVQYXRoIH0gPSByZXF1aXJlKFwiQC9jb3JlL1BhdGhcIik7XG5cbmNvbnN0IE5BTUUgICAgICAgICAgICAgICAgPSBTeW1ib2woXCJOQU1FXCIpO1xuY29uc3QgVEFSR0VUX1NDT1BFICAgICAgICA9IFN5bWJvbChcIlRBUkdFVF9TQ09QRVwiKTtcbmNvbnN0IE9VVFBVVF9OQU1FICAgICAgICAgPSBTeW1ib2woXCJPVVRQVVRfTkFNRVwiKTtcbmNvbnN0IENPTVBJTEVfT1BUSU9OUyAgICAgPSBTeW1ib2woXCJDT01QSUxFX09QVElPTlNcIik7XG5jb25zdCBQUkVGSVggICAgICAgICAgICAgID0gU3ltYm9sKFwiUFJFRklYXCIpO1xuY29uc3QgU1VGRklYICAgICAgICAgICAgICA9IFN5bWJvbChcIlNVRkZJWFwiKTtcbmNvbnN0IExJTktfT1BUSU9OUyAgICAgICAgPSBTeW1ib2woXCJMSU5LX09QVElPTlNcIik7XG5jb25zdCBJTkNMVURFUyAgICAgICAgICAgID0gU3ltYm9sKFwiSU5DTFVERVNcIik7XG5jb25zdCBERUZJTkVTICAgICAgICAgICAgID0gU3ltYm9sKFwiREVGSU5FU1wiKTtcbmNvbnN0IFNPVVJDRVMgICAgICAgICAgICAgPSBTeW1ib2woXCJTT1VSQ0VTXCIpO1xuY29uc3QgTElCUkFSSUVTICAgICAgICAgICA9IFN5bWJvbChcIkxJQlJBUklFU1wiKTtcbmNvbnN0IFBPU0lUSU9OX0lOREVQRU5ERU5UX0NPREUgPSBTeW1ib2woXCJQT1NJVElPTl9JTkRFUEVOREVOVF9DT0RFXCIpO1xuXG5jb25zdCByZXNlcnZlZFRhZ2V0TmFtZXMgPSBbIFwiYWxsXCIsIFwiaW5zdGFsbFwiIF07XG5mdW5jdGlvbiBlbnN1cmVUYXJnZXROYW1lKG5hbWUpIHtcbiAgaWYgKHR5cGVvZiBuYW1lICE9PSBcInN0cmluZ1wiKVxuICAgIHRocm93IG5ldyBFcnJvcihgVGFyZ2V0IFwiJHtuYW1lfVwiIGlzIG5vdCBzdHJpbmcgdHlwZWApO1xuICBpZiAocmVzZXJ2ZWRUYWdldE5hbWVzLmluY2x1ZGVzKG5hbWUpKVxuICAgIHRocm93IG5ldyBFcnJvcihgVGFyZ2V0IFwiJHtuYW1lfVwiIGlzIHJlc2VydmVkIG5hbWVgKTtcbiAgcmV0dXJuIG5hbWU7XG59XG5cbmZ1bmN0aW9uIEJhc2VUYXJnZXQoc2NvcGUsIG5hbWUpIHtcbiAgdGhpc1tOQU1FXSA9IGVuc3VyZVRhcmdldE5hbWUobmFtZSk7XG4gIHRoaXNbVEFSR0VUX1NDT1BFXSA9IHNjb3BlLmNsb25lKCk7XG4gIHRoaXNbT1VUUFVUX05BTUVdID0gZW5zdXJlU3RyaW5nKG5hbWUpO1xuICB0aGlzW1BSRUZJWF0gPSBcIlwiO1xuICB0aGlzW1NVRkZJWF0gPSBcIlwiO1xuICB0aGlzW0NPTVBJTEVfT1BUSU9OU10gPSBbXTtcbiAgdGhpc1tMSU5LX09QVElPTlNdID0gW107XG4gIHRoaXNbU09VUkNFU10gPSBbXTtcbiAgdGhpc1tMSUJSQVJJRVNdID0gW107XG4gIHRoaXNbSU5DTFVERVNdID0gc2NvcGUuSU5DTFVERVMubWFwKFZBTFVFID0+IHsgcmV0dXJuIHtWQUxVRX0gfSk7XG4gIHRoaXNbREVGSU5FU10gPSBbXTtcbiAgdGhpc1tQT1NJVElPTl9JTkRFUEVOREVOVF9DT0RFXSA9IHNjb3BlLlBPU0lUSU9OX0lOREVQRU5ERU5UX0NPREU7XG59XG5cbkJhc2VUYXJnZXQucHJvdG90eXBlID0gT2JqZWN0LmNyZWF0ZShPYmplY3QucHJvdG90eXBlLCB7XG4gIGNvbnN0cnVjdG9yOiB7XG4gICAgdmFsdWU6IEJhc2VUYXJnZXQsXG4gICAgZW51bWVyYWJsZTogZmFsc2UsXG4gIH0sXG4gIE5BTUU6IHtcbiAgICBnZXQoKSB7IHJldHVybiB0aGlzW05BTUVdOyB9LFxuICAgIGVudW1lcmFibGU6IHRydWUsXG4gIH0sXG4gIFRBUkdFVF9TQ09QRToge1xuICAgIGdldCgpIHsgcmV0dXJuIHRoaXNbVEFSR0VUX1NDT1BFXTsgfSxcbiAgICBlbnVtZXJhYmxlOiBmYWxzZSxcbiAgfSxcbiAgT1VUUFVUX05BTUU6IHtcbiAgICBnZXQoKSB7IHJldHVybiB0aGlzW09VVFBVVF9OQU1FXTsgfSxcbiAgICBzZXQodmFsdWUpIHsgdGhpc1tPVVRQVVRfTkFNRV0gPSBlbnN1cmVTdHJpbmcodmFsdWUpOyB9LFxuICAgIGVudW1lcmFibGU6IHRydWUsXG4gIH0sXG4gIENPTVBJTEVfT1BUSU9OUzoge1xuICAgIGdldCgpIHsgcmV0dXJuIHRoaXNbQ09NUElMRV9PUFRJT05TXTsgfSxcbiAgICBlbnVtZXJhYmxlOiB0cnVlLFxuICB9LFxuICBQUkVGSVg6IHtcbiAgICBnZXQoKSB7IHJldHVybiB0aGlzW1BSRUZJWF07IH0sXG4gICAgc2V0KHZhbHVlKSB7IHRoaXNbUFJFRklYXSA9IHZhbHVlOyB9LFxuICAgIGVudW1lcmFibGU6IHRydWUsXG4gIH0sXG4gIFNVRkZJWDoge1xuICAgIGdldCgpIHsgcmV0dXJuIHRoaXNbU1VGRklYXTsgfSxcbiAgICBzZXQodmFsdWUpIHsgdGhpc1tTVUZGSVhdID0gdmFsdWU7IH0sXG4gICAgZW51bWVyYWJsZTogdHJ1ZSxcbiAgfSxcbiAgTElOS19PUFRJT05TOiB7XG4gICAgZ2V0KCkgeyByZXR1cm4gdGhpc1tMSU5LX09QVElPTlNdOyB9LFxuICAgIGVudW1lcmFibGU6IHRydWUsXG4gIH0sXG4gIElOQ0xVREVTOiB7XG4gICAgZ2V0KCkgeyByZXR1cm4gdGhpc1tJTkNMVURFU107IH0sXG4gICAgZW51bWVyYWJsZTogdHJ1ZSxcbiAgfSxcbiAgREVGSU5FUzoge1xuICAgIGdldCgpIHsgcmV0dXJuIHRoaXNbREVGSU5FU107IH0sXG4gICAgZW51bWVyYWJsZTogdHJ1ZSxcbiAgfSxcbiAgU09VUkNFUzoge1xuICAgIGdldCgpIHsgcmV0dXJuIHRoaXNbU09VUkNFU107IH0sXG4gICAgZW51bWVyYWJsZTogdHJ1ZSxcbiAgfSxcbiAgTElCUkFSSUVTOiB7XG4gICAgZ2V0KCkgeyByZXR1cm4gdGhpc1tMSUJSQVJJRVNdOyB9LFxuICAgIGVudW1lcmFibGU6IHRydWUsXG4gIH0sXG4gIEZJTEVfRElSOiB7XG4gICAgZ2V0KCkgeyByZXR1cm4gdGhpc1tUQVJHRVRfU0NPUEVdLkJJTkFSWV9ESVI7IH0sXG4gICAgZW51bWVyYWJsZTogdHJ1ZSxcbiAgfSxcbiAgRklMRV9OQU1FOiB7XG4gICAgZ2V0KCkgeyByZXR1cm4gdGhpcy5QUkVGSVggKyB0aGlzLk9VVFBVVF9OQU1FICsgdGhpcy5TVUZGSVg7IH0sXG4gICAgZW51bWVyYWJsZTogdHJ1ZSxcbiAgfSxcbiAgRklMRToge1xuICAgIGdldCgpIHsgcmV0dXJuIHRoaXMuRklMRV9ESVIuam9pbih0aGlzLkZJTEVfTkFNRSk7IH0sXG4gICAgZW51bWVyYWJsZTogdHJ1ZSxcbiAgfSxcbiAgUE9TSVRJT05fSU5ERVBFTkRFTlRfQ09ERToge1xuICAgIGdldCgpIHsgcmV0dXJuIHRoaXNbUE9TSVRJT05fSU5ERVBFTkRFTlRfQ09ERV07IH0sXG4gICAgc2V0KHZhbHVlKSB7IHRoaXNbUE9TSVRJT05fSU5ERVBFTkRFTlRfQ09ERV0gPSB2YWx1ZTsgfSxcbiAgICBlbnVtZXJhYmxlOiB0cnVlLFxuICB9LFxufSk7XG5cbkJhc2VUYXJnZXQucHJvdG90eXBlLmFkZFNvdXJjZXMgPSBmdW5jdGlvbiguLi5zb3VyY2VzKSB7XG4gIGZvciAobGV0IGl0IG9mIHNvdXJjZXMuZmxhdCgxKSkge1xuICAgIGlmIChpdCBpbnN0YW5jZW9mIEludGVyZmFjZU9iamVjdHMgfHwgaXQgaW5zdGFuY2VvZiBTb3VyY2VGaWxlKVxuICAgICAgLyogKi87XG4gICAgZWxzZSBpZiAodHlwZW9mIGl0ID09PSBcInN0cmluZ1wiIHx8IEFic29sdXRlUGF0aC5pc0Fic29sdXRlKGl0KSlcbiAgICAgIGl0ID0gU291cmNlRmlsZS5jcmVhdGUodGhpc1tUQVJHRVRfU0NPUEVdLCBpdCk7XG4gICAgZWxzZVxuICAgICAgdGhyb3cgbmV3IEVycm9yKGBOb3Qgc3VwcG9ydCBpbnN0YW5jZSAke2l0fWApO1xuXG4gICAgaWYgKGl0IGluc3RhbmNlb2YgU291cmNlRmlsZSAmJiBpdC5MQU5HVUFHRSkge1xuICAgICAgY29uc3QgcmZpbGUxID0gdGhpc1tUQVJHRVRfU0NPUEVdLkJJTkFSWV9ESVIucmVsYXRpdmUoaXQuRklMRSk7XG4gICAgICBjb25zdCByZmlsZTIgPSB0aGlzW1RBUkdFVF9TQ09QRV0uU09VUkNFX0RJUi5yZWxhdGl2ZShpdC5GSUxFKTtcbiAgICAgIGNvbnN0IHJmaWxlID0gKHJmaWxlMi5sZW5ndGggPCByZmlsZTEubGVuZ3RoID8gcmZpbGUyIDogcmZpbGUxKS5yZXBsYWNlKFwiLi4vXCIsIFwiX18vXCIpO1xuICAgICAgaXQuT0JKRUNUX0ZJTEUgPSB0aGlzW1RBUkdFVF9TQ09QRV0uQklOQVJZX0RJUi5qb2luKFwiTWFrZUZpbGVzXCIsIHRoaXNbTkFNRV0gKyBcIi5kaXJcIiwgIHJmaWxlICsgXCIub2JqXCIpO1xuICAgIH1cblxuICAgIHRoaXNbU09VUkNFU10ucHVzaChpdCk7XG4gIH1cbn1cblxuQmFzZVRhcmdldC5wcm90b3R5cGUuYWRkSW5jbHVkZXMgPSBmdW5jdGlvbiguLi5pbmNsdWRlcykge1xuICBmb3IgKGNvbnN0IGl0IG9mIGluY2x1ZGVzLmZsYXQoMSkpIHtcbiAgICBsZXQgVkFMVUU7XG4gICAgaWYgKGl0IGluc3RhbmNlb2YgSW50ZXJmYWNlSW5jbHVkZXMpXG4gICAgICBWQUxVRSA9IGl0O1xuICAgIGVsc2UgaWYgKHR5cGVvZiBpdCA9PT0gXCJzdHJpbmdcIiB8fCBBYnNvbHV0ZVBhdGguaXNBYnNvbHV0ZShpdCkpXG4gICAgICBWQUxVRSA9IEluY2x1ZGVEaXJlY3RvcnkuY3JlYXRlKGl0LCB0aGlzW1RBUkdFVF9TQ09QRV0uU09VUkNFX0RJUik7XG4gICAgZWxzZVxuICAgICAgdGhyb3cgbmV3IEVycm9yKGBOb3Qgc3VwcG9ydCBpbnN0YW5jZSAke2l0fWApO1xuICAgIHRoaXNbSU5DTFVERVNdLnB1c2goe1ZBTFVFfSk7IC8vIEluY2x1ZGVEaXJlY3RvcnlbXVxuICB9XG59XG5cbkJhc2VUYXJnZXQucHJvdG90eXBlLmFkZExpYnJhcmllcyA9IGZ1bmN0aW9uKC4uLmxpYnJhcmllcykge1xuICBmb3IgKGNvbnN0IGl0IG9mIGxpYnJhcmllcy5mbGF0KDEpKSB7XG4gICAgdGhpc1tMSUJSQVJJRVNdLnB1c2goeyBWQUxVRTogSW50ZXJmYWNlVGFyZ2V0LmVuc3VyZUluc3RhbmNlKGl0KSB9KTtcbiAgfVxufVxuXG5CYXNlVGFyZ2V0LnByb3RvdHlwZS5hZGRDb21waWxlT3B0aW9ucyA9IGZ1bmN0aW9uKC4uLm9wdGlvbnMpIHtcbiAgZm9yIChjb25zdCBpdCBvZiBvcHRpb25zLmZsYXQoMSkpIHtcbiAgICB0aGlzW0NPTVBJTEVfT1BUSU9OU10ucHVzaCh7IFZBTFVFOiBpdCB9KTtcbiAgfVxufVxuXG5CYXNlVGFyZ2V0LnByb3RvdHlwZS5hZGRMaW5rT3B0aW9ucyA9IGZ1bmN0aW9uKC4uLm9wdGlvbnMpIHtcbiAgZm9yIChjb25zdCBpdCBvZiBvcHRpb25zLmZsYXQoMSkpIHtcbiAgICB0aGlzW0xJTktfT1BUSU9OU10ucHVzaCh7IFZBTFVFOiBpdCB9KTtcbiAgfVxufVxuXG5CYXNlVGFyZ2V0LnByb3RvdHlwZS5nZXRTb3VyY2VGaWxlcyA9IGZ1bmN0aW9uKC4uLnNvdXJjZXMpIHtcbiAgY29uc3QgcmVzdWx0ID0gW107XG4gIGZvciAoY29uc3QgaXQgb2Ygc291cmNlcy5mbGF0KDEpKSB7XG4gICAgY29uc3QgZmlsZW5hbWUgPSB0aGlzW1RBUkdFVF9TQ09QRV0uU09VUkNFX0RJUi5yZXNvbHZlKGl0KS50b1N0cmluZygpO1xuICAgIGNvbnN0IHNyYyA9IHRoaXNbU09VUkNFU10uZmluZChpID0+IGkgaW5zdGFuY2VvZiBTb3VyY2VGaWxlICYmIGkuRklMRS50b1N0cmluZygpID09PSBmaWxlbmFtZSk7XG4gICAgaWYgKCFzcmMpXG4gICAgICB0aHJvdyBuZXcgRXJyb3IoYENhbm5vdCBmaW5kIFwiJHtpdH1cImApO1xuICAgIHJlc3VsdC5wdXNoKHNyYyk7XG4gIH1cblxuICBpZiAocmVzdWx0Lmxlbmd0aClcbiAgICByZXR1cm4gU291cmNlRmlsZUxpc3QuY3JlYXRlKHRoaXNbVEFSR0VUX1NDT1BFXSwgcmVzdWx0KTtcblxuICByZXR1cm4gU291cmNlRmlsZUxpc3QuY3JlYXRlKHRoaXNbVEFSR0VUX1NDT1BFXSwgdGhpc1tTT1VSQ0VTXS5maWx0ZXIoaSA9PiBpIGluc3RhbmNlb2YgU291cmNlRmlsZSkpO1xufVxuXG5CYXNlVGFyZ2V0LnByb3RvdHlwZS5zZXRQcmVmaXggPSBmdW5jdGlvbihwcmVmaXgpIHtcbiAgdGhpc1tQUkVGSVhdID0gcHJlZml4O1xufVxuXG5CYXNlVGFyZ2V0LnByb3RvdHlwZS5zZXRTdWZmaXggPSBmdW5jdGlvbihzdWZmaXgpIHtcbiAgdGhpc1tTVUZGSVhdID0gc3VmZml4O1xufVxuXG5CYXNlVGFyZ2V0LnByb3RvdHlwZS5zZXRPdXRwdXROYW1lID0gZnVuY3Rpb24ob3V0cHV0TmFtZSkge1xuICB0aGlzW09VVFBVVF9OQU1FXSA9IG91dHB1dE5hbWU7XG59XG5cbkJhc2VUYXJnZXQucHJvdG90eXBlLmFkZERlZmluaXRpb25zID0gZnVuY3Rpb24oLi4uZGVmaW5pdGlvbnMpIHtcbiAgZm9yIChjb25zdCBWQUxVRSBvZiBkZWZpbml0aW9ucy5mbGF0KDEpKVxuICAgIHRoaXNbREVGSU5FU10ucHVzaCh7IFZBTFVFIH0pO1xufVxuXG5CYXNlVGFyZ2V0LnByb3RvdHlwZS50b0pTT04gPSBmdW5jdGlvbigpIHtcbiAgY29uc3QganNvbiA9IHt9O1xuICBmb3IgKGNvbnN0IGtleSBpbiB0aGlzKVxuICAgIGpzb25ba2V5XSA9IHRoaXNba2V5XTtcbiAgcmV0dXJuIGpzb247XG59XG5cbmZ1bmN0aW9uIEJhc2VMaWJyYXJ5KHNjb3BlLCBuYW1lKSB7XG4gIEJhc2VUYXJnZXQuY2FsbCh0aGlzLCBzY29wZSwgbmFtZSk7XG59XG5cbkJhc2VMaWJyYXJ5LnByb3RvdHlwZSA9IE9iamVjdC5jcmVhdGUoQmFzZVRhcmdldC5wcm90b3R5cGUsIHtcbiAgY29uc3RydWN0b3I6IHtcbiAgICB2YWx1ZTogQmFzZUxpYnJhcnksXG4gICAgZW51bWVyYWJsZTogZmFsc2UsXG4gICAgd3JpdGFibGU6IHRydWUsXG4gICAgY29uZmlndXJhYmxlOiB0cnVlLFxuICB9LFxufSk7XG5cbkJhc2VMaWJyYXJ5LnByb3RvdHlwZS5hZGRQdWJsaWNJbmNsdWRlcyA9IGZ1bmN0aW9uKC4uLmluY2x1ZGVzKSB7XG4gIGZvciAoY29uc3QgaXQgb2YgaW5jbHVkZXMuZmxhdCgxKSkge1xuICAgIGxldCBWQUxVRTtcbiAgICBpZiAoaXQgaW5zdGFuY2VvZiBJbnRlcmZhY2VJbmNsdWRlcylcbiAgICAgIFZBTFVFID0gaXQ7XG4gICAgZWxzZSBpZiAodHlwZW9mIGl0ID09PSBcInN0cmluZ1wiIHx8IEFic29sdXRlUGF0aC5pc0Fic29sdXRlKGl0KSlcbiAgICAgIFZBTFVFID0gSW5jbHVkZURpcmVjdG9yeS5jcmVhdGUoaXQsIHRoaXNbVEFSR0VUX1NDT1BFXS5TT1VSQ0VfRElSKTtcbiAgICBlbHNlXG4gICAgICB0aHJvdyBuZXcgRXJyb3IoYE5vdCBzdXBwb3J0IGluc3RhbmNlICR7aXR9YCk7XG4gICAgdGhpc1tJTkNMVURFU10ucHVzaCh7VkFMVUUsIFBVQkxJQ19PTkxZOiB0cnVlfSk7IC8vIEluY2x1ZGVEaXJlY3RvcnlbXVxuICB9XG59XG5cbkJhc2VMaWJyYXJ5LnByb3RvdHlwZS5hZGRQdWJsaWNEZWZpbml0aW9ucyA9IGZ1bmN0aW9uKC4uLmRlZmluaXRpb25zKSB7XG4gIGZvciAoY29uc3QgVkFMVUUgb2YgZGVmaW5pdGlvbnMuZmxhdCgxKSlcbiAgICB0aGlzW0RFRklORVNdLnB1c2goeyBWQUxVRSwgUFVCTElDX09OTFk6IHRydWUgfSk7XG59XG5cbkJhc2VMaWJyYXJ5LnByb3RvdHlwZS5hZGRQdWJsaWNMaWJyYXJpZXMgPSBmdW5jdGlvbiguLi5saWJyYXJpZXMpIHtcbiAgZm9yIChjb25zdCBpdCBvZiBsaWJyYXJpZXMuZmxhdCgxKSkge1xuICAgIHRoaXNbTElCUkFSSUVTXS5wdXNoKHtWQUxVRTogSW50ZXJmYWNlVGFyZ2V0LmVuc3VyZUluc3RhbmNlKGl0KSwgUFVCTElDX09OTFk6IHRydWV9KTtcbiAgfVxufVxuXG5CYXNlTGlicmFyeS5wcm90b3R5cGUuYWRkUHVibGljQ29tcGlsZU9wdGlvbnMgPSBmdW5jdGlvbiguLi5vcHRpb25zKSB7XG4gIGZvciAoY29uc3QgaXQgb2Ygb3B0aW9ucy5mbGF0KDEpKSB7XG4gICAgdGhpc1tDT01QSUxFX09QVElPTlNdLnB1c2goeyBWQUxVRTogaXQsIFBVQkxJQ19PTkxZOiB0cnVlIH0pO1xuICB9XG59XG5cbkJhc2VMaWJyYXJ5LnByb3RvdHlwZS5hZGRQdWJsaWNMaW5rT3B0aW9ucyA9IGZ1bmN0aW9uKC4uLm9wdGlvbnMpIHtcbiAgZm9yIChjb25zdCBpdCBvZiBvcHRpb25zLmZsYXQoMSkpIHtcbiAgICB0aGlzW0xJTktfT1BUSU9OU10ucHVzaCh7IFZBTFVFOiBpdCwgUFVCTElDX09OTFk6IHRydWUgfSk7XG4gIH1cbn1cblxuZnVuY3Rpb24gT2JqZWN0TGlicmFyeShzY29wZSwgbmFtZSkge1xuICBCYXNlTGlicmFyeS5jYWxsKHRoaXMsIHNjb3BlLCBuYW1lKTtcbiAgdGhpcy5QUkVGSVggPSBzY29wZS5PQkpFQ1RfTElCUkFSWV9QUkVGSVg7XG4gIHRoaXMuU1VGRklYID0gc2NvcGUuT0JKRUNUX0xJQlJBUllfU1VGRklYO1xuICB0aGlzLkxJTktfT1BUSU9OUy5wdXNoKC4uLnNjb3BlLk9CSkVDVF9MSU5LRVJfRkxBR1MubWFwKFZBTFVFID0+IHsgcmV0dXJuIHsgVkFMVUUgfSB9KSk7XG59XG5cbk9iamVjdExpYnJhcnkucHJvdG90eXBlID0gT2JqZWN0LmNyZWF0ZShCYXNlTGlicmFyeS5wcm90b3R5cGUsIHtcbiAgY29uc3RydWN0b3I6IHtcbiAgICB2YWx1ZTogT2JqZWN0TGlicmFyeSxcbiAgICBlbnVtZXJhYmxlOiBmYWxzZSxcbiAgICB3cml0YWJsZTogdHJ1ZSxcbiAgICBjb25maWd1cmFibGU6IHRydWUsXG4gIH0sXG59KTtcblxuT2JqZWN0TGlicmFyeS5jcmVhdGUgPSAoc2NvcGUsIG5hbWUpID0+IHtcbiAgcmV0dXJuIE9iamVjdC5zZWFsKG5ldyBPYmplY3RMaWJyYXJ5KHNjb3BlLCBuYW1lKSk7XG59XG5cbmZ1bmN0aW9uIFN0YXRpY0xpYnJhcnkoc2NvcGUsIG5hbWUpIHtcbiAgQmFzZUxpYnJhcnkuY2FsbCh0aGlzLCBzY29wZSwgbmFtZSk7XG4gIHRoaXMuUFJFRklYID0gc2NvcGUuU1RBVElDX0xJQlJBUllfUFJFRklYO1xuICB0aGlzLlNVRkZJWCA9IHNjb3BlLlNUQVRJQ19MSUJSQVJZX1NVRkZJWDtcbiAgdGhpcy5MSU5LX09QVElPTlMucHVzaCguLi5zY29wZS5TVEFUSUNfTElOS0VSX0ZMQUdTLm1hcChWQUxVRSA9PiB7IHJldHVybiB7IFZBTFVFIH0gfSkpO1xufVxuXG5TdGF0aWNMaWJyYXJ5LnByb3RvdHlwZSA9IE9iamVjdC5jcmVhdGUoQmFzZUxpYnJhcnkucHJvdG90eXBlLCB7XG4gIGNvbnN0cnVjdG9yOiB7XG4gICAgdmFsdWU6IFN0YXRpY0xpYnJhcnksXG4gICAgZW51bWVyYWJsZTogZmFsc2UsXG4gICAgd3JpdGFibGU6IHRydWUsXG4gICAgY29uZmlndXJhYmxlOiB0cnVlLFxuICB9LFxufSk7XG5cblN0YXRpY0xpYnJhcnkuY3JlYXRlID0gKHNjb3BlLCBuYW1lKSA9PiB7XG4gIHJldHVybiBPYmplY3Quc2VhbChuZXcgU3RhdGljTGlicmFyeShzY29wZSwgbmFtZSkpO1xufVxuXG5mdW5jdGlvbiBTaGFyZWRMaWJyYXJ5KHNjb3BlLCBuYW1lKSB7XG4gIEJhc2VMaWJyYXJ5LmNhbGwodGhpcywgc2NvcGUsIG5hbWUpO1xuICB0aGlzLlBSRUZJWCA9IHNjb3BlLlNIQVJFRF9MSUJSQVJZX1BSRUZJWDtcbiAgdGhpcy5TVUZGSVggPSBzY29wZS5TSEFSRURfTElCUkFSWV9TVUZGSVg7XG4gIHRoaXMuTElOS19PUFRJT05TLnB1c2goLi4uc2NvcGUuU0hBUkVEX0xJTktFUl9GTEFHUy5tYXAoVkFMVUUgPT4geyByZXR1cm4geyBWQUxVRSB9IH0pKTtcbn1cblxuU2hhcmVkTGlicmFyeS5wcm90b3R5cGUgPSBPYmplY3QuY3JlYXRlKEJhc2VMaWJyYXJ5LnByb3RvdHlwZSwge1xuICBjb25zdHJ1Y3Rvcjoge1xuICAgIHZhbHVlOiBTaGFyZWRMaWJyYXJ5LFxuICAgIGVudW1lcmFibGU6IGZhbHNlLFxuICAgIHdyaXRhYmxlOiB0cnVlLFxuICAgIGNvbmZpZ3VyYWJsZTogdHJ1ZSxcbiAgfSxcbn0pO1xuXG5TaGFyZWRMaWJyYXJ5LmNyZWF0ZSA9IChzY29wZSwgbmFtZSkgPT4ge1xuICByZXR1cm4gT2JqZWN0LnNlYWwobmV3IFNoYXJlZExpYnJhcnkoc2NvcGUsIG5hbWUpKTtcbn1cblxuZnVuY3Rpb24gRXhlY3V0YWJsZShzY29wZSwgbmFtZSkge1xuICBCYXNlVGFyZ2V0LmNhbGwodGhpcywgc2NvcGUsIG5hbWUpO1xuICB0aGlzLlNVRkZJWCA9IHNjb3BlLkVYRUNVVEFCTEVfU1VGRklYO1xuICB0aGlzLkxJTktfT1BUSU9OUy5wdXNoKC4uLnNjb3BlLkVYRV9MSU5LRVJfRkxBR1MubWFwKFZBTFVFID0+IHsgcmV0dXJuIHsgVkFMVUUgfSB9KSk7XG59XG5cbkV4ZWN1dGFibGUucHJvdG90eXBlID0gT2JqZWN0LmNyZWF0ZShCYXNlVGFyZ2V0LnByb3RvdHlwZSwge1xuICBjb25zdHJ1Y3Rvcjoge1xuICAgIHZhbHVlOiBFeGVjdXRhYmxlLFxuICAgIGVudW1lcmFibGU6IGZhbHNlLFxuICAgIHdyaXRhYmxlOiB0cnVlLFxuICAgIGNvbmZpZ3VyYWJsZTogdHJ1ZSxcbiAgfSxcbn0pO1xuXG5FeGVjdXRhYmxlLmNyZWF0ZSA9IChzY29wZSwgbmFtZSkgPT4ge1xuICByZXR1cm4gT2JqZWN0LnNlYWwobmV3IEV4ZWN1dGFibGUoc2NvcGUsIG5hbWUpKTtcbn1cblxubW9kdWxlLmV4cG9ydHMgPSB7XG4gIEJhc2VUYXJnZXQsXG4gIEJhc2VMaWJyYXJ5LFxuICBPYmplY3RMaWJyYXJ5LFxuICBTdGF0aWNMaWJyYXJ5LFxuICBTaGFyZWRMaWJyYXJ5LFxuICBFeGVjdXRhYmxlLFxufTtcbiIsIlwidXNlIHN0cmljdFwiO1xuXG5jb25zdCBOQU1FICAgICA9IFN5bWJvbChcIk5BTUVcIik7XG5jb25zdCBJTkNMVURFUyA9IFN5bWJvbChcIklOQ0xVREVTXCIpO1xuY29uc3QgU09VUkNFUyAgPSBTeW1ib2woXCJTT1VSQ0VTXCIpO1xuY29uc3QgREVGSU5FUyA9IFN5bWJvbChcIkRFRklORVNcIik7XG5jb25zdCBDT01QSUxFX09QVElPTlMgPSBTeW1ib2woXCJDT01QSUxFX09QVElPTlNcIik7XG5jb25zdCBMSU5LX09QVElPTlMgPSBTeW1ib2woXCJMSU5LX09QVElPTlNcIik7XG5cbmZ1bmN0aW9uIFVua25vd25UYXJnZXQobmFtZSkge1xuICB0aGlzW05BTUVdID0gbmFtZTtcbiAgdGhpc1tJTkNMVURFU10gPSBbXTtcbiAgdGhpc1tTT1VSQ0VTXSA9IFtdO1xuICB0aGlzW0RFRklORVNdID0gW107XG4gIHRoaXNbQ09NUElMRV9PUFRJT05TXSA9IFtdO1xuICB0aGlzW0xJTktfT1BUSU9OU10gPSBbXTtcbn1cblxuVW5rbm93blRhcmdldC5jcmVhdGUgPSAobmFtZSkgPT4ge1xuICByZXR1cm4gT2JqZWN0LnNlYWwobmV3IFVua25vd25UYXJnZXQobmFtZSkpO1xufVxuXG5Vbmtub3duVGFyZ2V0LmVuc3VyZUluc3RhbmNlID0gKHZhbHVlKSA9PiB7XG4gIGlmICh2YWx1ZSBpbnN0YW5jZW9mIFVua25vd25UYXJnZXQpXG4gICAgcmV0dXJuIHZhbHVlO1xuICB0aHJvdyBuZXcgRXJyb3IoYFRoZSAnJHt2YWx1ZX0nIGlzIG5vdCBhIFVua25vd25UYXJnZXRgKTtcbn1cblxuVW5rbm93blRhcmdldC5wcm90b3R5cGUgPSBPYmplY3QuY3JlYXRlKE9iamVjdC5wcm90b3R5cGUsIHtcbiAgY29uc3RydWN0b3I6IHtcbiAgICB2YWx1ZTogVW5rbm93blRhcmdldCxcbiAgICBlbnVtZXJhYmxlOiBmYWxzZSxcbiAgfSxcbiAgTkFNRToge1xuICAgIGdldCAoKSB7IHJldHVybiB0aGlzW05BTUVdOyB9LFxuICAgIGVudW1lcmFibGU6IHRydWUsXG4gIH0sXG4gIElOQ0xVREVTOiB7XG4gICAgZ2V0ICgpIHsgcmV0dXJuIHRoaXNbSU5DTFVERVNdOyB9LFxuICAgIGVudW1lcmFibGU6IHRydWUsXG4gIH0sXG4gIFNPVVJDRVM6IHtcbiAgICBnZXQgKCkgeyByZXR1cm4gdGhpc1tTT1VSQ0VTXTsgfSxcbiAgICBlbnVtZXJhYmxlOiB0cnVlLFxuICB9LFxuICBERUZJTkVTOiB7XG4gICAgZ2V0ICgpIHsgcmV0dXJuIHRoaXNbREVGSU5FU107IH0sXG4gICAgZW51bWVyYWJsZTogdHJ1ZSxcbiAgfSxcbiAgQ09NUElMRV9PUFRJT05TOiB7XG4gICAgZ2V0ICgpIHsgcmV0dXJuIHRoaXNbQ09NUElMRV9PUFRJT05TXTsgfSxcbiAgICBlbnVtZXJhYmxlOiB0cnVlLFxuICB9LFxuICBMSU5LX09QVElPTlM6IHtcbiAgICBnZXQgKCkgeyByZXR1cm4gdGhpc1tMSU5LX09QVElPTlNdOyB9LFxuICAgIGVudW1lcmFibGU6IHRydWUsXG4gIH0sXG59KTtcblxuVW5rbm93blRhcmdldC5wcm90b3R5cGUudG9KU09OID0gZnVuY3Rpb24oKSB7XG4gIGNvbnN0IGpzb24gPSB7fTtcbiAgZm9yIChjb25zdCBrZXkgaW4gdGhpcylcbiAgICBqc29uW2tleV0gPSB0aGlzW2tleV07XG4gIHJldHVybiBqc29uO1xufVxuXG5Vbmtub3duVGFyZ2V0LnByb3RvdHlwZS50b1N0cmluZyA9IGZ1bmN0aW9uKCkge1xuICByZXR1cm4gXCIke1wiICsgdGhpc1tOQU1FXSArIFwifVwiO1xufVxuXG5tb2R1bGUuZXhwb3J0cyA9IHtcbiAgVW5rbm93blRhcmdldCxcbn07XG4iLCJcInVzZSBzdHJpY3RcIjtcblxuY29uc3Qgb3MgPSByZXF1aXJlKFwibm9kZTpvc1wiKTtcbmNvbnN0IHBhdGggPSByZXF1aXJlKFwibm9kZTpwYXRoXCIpO1xuXG5jb25zdCB7IGNvcHlWYWx1ZSB9ID0gcmVxdWlyZShcIkAvdXRpbHMvUHJpbWl0aXZlc1wiKTtcbmNvbnN0IHsgZmlsZUV4aXN0c1N5bmMgfSA9IHJlcXVpcmUoXCJAL3V0aWxzL0ZpbGVTeXN0ZW1cIik7XG5jb25zdCB7IEFic29sdXRlUGF0aCB9ID0gcmVxdWlyZShcIkAvY29yZS9QYXRoXCIpO1xuY29uc3QgeyBJbnRlcmZhY2VUYXJnZXQgfSA9IHJlcXVpcmUoXCJAL2NvcmUvSW50ZXJmYWNlVGFyZ2V0XCIpO1xuY29uc3QgeyBJbnRlcmZhY2VTY3JpcHQgfSA9IHJlcXVpcmUoXCJAL2NvcmUvSW50ZXJmYWNlU2NyaXB0XCIpO1xuY29uc3QgeyBJbnN0YWxsRW50aXR5IH0gPSByZXF1aXJlKFwiQC9jb3JlL0luc3RhbGxFbnRpdHlcIik7XG5jb25zdCB7IE9iamVjdExpYnJhcnksIFN0YXRpY0xpYnJhcnksIFNoYXJlZExpYnJhcnksIEV4ZWN1dGFibGUsIEJhc2VUYXJnZXQgfSA9IHJlcXVpcmUoXCIuL1RhcmdldC5qc1wiKTtcbmNvbnN0IHsgSW5jbHVkZURpcmVjdG9yeSB9ID0gcmVxdWlyZShcIkAvY29yZS9JbmNsdWRlRGlyZWN0b3J5XCIpO1xuY29uc3QgeyBTeXN0ZW1WYXJpYWJsZXMgfSA9IHJlcXVpcmUoXCIuL1N5c3RlbVZhcmlhYmxlcy5qc1wiKTtcbmNvbnN0IHsgQ3VzdG9tU2NyaXB0IH0gPSByZXF1aXJlKFwiQC9jb3JlL0N1c3RvbVNjcmlwdFwiKTtcblxuY29uc3QgcmVxdWlyZUltcGwgPSBldmFsKFwicmVxdWlyZVwiKTtcblxuY29uc3QgY3VycmVudEZ1bmN0aW9uTmFtZSA9ICgpID0+IHtcbiAgY29uc3Qgc3RhY2sgPSBuZXcgRXJyb3IoKS5zdGFjay5zcGxpdChcIlxcblwiKVsyXTtcbiAgcmV0dXJuIHN0YWNrLm1hdGNoKC9hdCAoXFxTKykvKT8uWzFdO1xufTtcblxuZnVuY3Rpb24gc2NvcGVWYWx1ZUFzUHJpbWl0aXZlcyhvKSB7XG4gIGlmICh0eXBlb2YgbyA9PT0gXCJ1bmRlZmluZWRcIilcbiAgICByZXR1cm4gbztcbiAgaWYgKHR5cGVvZiBvID09PSBcImJvb2xlYW5cIilcbiAgICByZXR1cm4gbztcbiAgaWYgKHR5cGVvZiBvID09PSBcIm51bWJlclwiKVxuICAgIHJldHVybiBvO1xuICBpZiAodHlwZW9mIG8gPT09IFwic3RyaW5nXCIpXG4gICAgcmV0dXJuIG87XG4gIGlmICh0eXBlb2YgbyA9PT0gXCJvYmplY3RcIikge1xuICAgIGlmICghbylcbiAgICAgIHJldHVybiBvO1xuICAgIGlmIChvIGluc3RhbmNlb2YgQWJzb2x1dGVQYXRoKSB7XG4gICAgICByZXR1cm4gby50b1N0cmluZygpO1xuICAgIH1cbiAgICBpZiAobyBpbnN0YW5jZW9mIEFycmF5KSB7XG4gICAgICBjb25zdCByZXN1bHQgPSBbXTtcbiAgICAgIGZvciAoY29uc3QgaSBvZiBvKVxuICAgICAgICByZXN1bHQucHVzaChzY29wZVZhbHVlQXNQcmltaXRpdmVzKGkpKTtcbiAgICAgIHJldHVybiByZXN1bHQ7XG4gICAgfVxuICAgIGlmIChvIGluc3RhbmNlb2YgT2JqZWN0KSB7XG4gICAgICBjb25zdCByZXN1bHQgPSB7fTtcbiAgICAgIGZvciAoY29uc3QgW2ssdl0gb2YgT2JqZWN0LmVudHJpZXMobykpXG4gICAgICAgIHJlc3VsdFtrXSA9IHNjb3BlVmFsdWVBc1ByaW1pdGl2ZXModik7XG4gICAgICByZXR1cm4gcmVzdWx0O1xuICAgIH1cbiAgfVxuICB0aHJvdyBuZXcgRXJyb3IoYFVua25vd24gaW5zdGFuY2Ugb2YgJHtvfWApO1xufVxuXG5jb25zdCBHTE9CQUwgPSBTeW1ib2woXCJHTE9CQUxcIik7XG5jb25zdCBTQ09QRSA9IFN5bWJvbChcIlNDT1BFXCIpO1xuXG5mdW5jdGlvbiBVc2VyQ29udGV4dChzY29wZSwgZ2xvYmFsKSB7XG4gIHRoaXNbU0NPUEVdID0gc2NvcGU7XG4gIHRoaXNbR0xPQkFMXSA9IGdsb2JhbDtcblxuICBjb25zdCBwcm9wcyA9IE9iamVjdC5nZXRPd25Qcm9wZXJ0eURlc2NyaXB0b3JzKFN5c3RlbVZhcmlhYmxlcy5wcm90b3R5cGUpO1xuICBmb3IgKGNvbnN0IFtuYW1lLCBkZXNjXSBvZiBPYmplY3QuZW50cmllcyhwcm9wcykpIHtcbiAgICBpZiAoZGVzYy5nZXQgfHwgZGVzYy5zZXQpIHtcbiAgICAgIGNvbnN0IG5ld0Rlc2MgPSB7IGVudW1lcmFibGU6IGRlc2MuZW51bWVyYWJsZSwgY29uZmlndXJhYmxlOiBmYWxzZSB9O1xuICAgICAgaWYgKGRlc2MuZ2V0KVxuICAgICAgICBuZXdEZXNjLmdldCA9IGZ1bmN0aW9uKCkgeyByZXR1cm4gdGhpc1tTQ09QRV1bbmFtZV07IH1cbiAgICAgIGlmIChkZXNjLnNldClcbiAgICAgICAgbmV3RGVzYy5zZXQgPSBmdW5jdGlvbih2YWx1ZSkgeyB0aGlzW1NDT1BFXVtuYW1lXSA9IHZhbHVlOyB9XG4gICAgICBPYmplY3QuZGVmaW5lUHJvcGVydHkodGhpcywgbmFtZSwgbmV3RGVzYyk7XG4gICAgfVxuICB9XG59XG5cblVzZXJDb250ZXh0LmNyZWF0ZSA9IChzY29wZSwgZ2xvYmFsKSA9PiB7XG4gIHJldHVybiBuZXcgVXNlckNvbnRleHQoc2NvcGUsIGdsb2JhbCk7XG59XG5cbmZ1bmN0aW9uIG1ha2VMb2dnZXIobG9nZ2VyRnVuYywgd2l0aFRhZykge1xuICBpZiAoIWxvZ2dlckZ1bmMpXG4gICAgcmV0dXJuICgpID0+IHt9O1xuICByZXR1cm4gZnVuY3Rpb24oKSB7XG4gICAgY29uc3QgbGlzdCA9IFtdO1xuICAgIGlmICh3aXRoVGFnKVxuICAgICAgbGlzdC5wdXNoKFwiW1wiICsgdGhpcy5fX2xvZ1RhZygpICsgXCJdXCIpO1xuICAgIGZvciAoY29uc3QgaXRlciBvZiBhcmd1bWVudHMpIHtcbiAgICAgIGlmIChpdGVyICYmIHR5cGVvZiBpdGVyID09PSBcIm9iamVjdFwiKVxuICAgICAgICBsaXN0LnB1c2goSlNPTi5zdHJpbmdpZnkoaXRlcikpO1xuICAgICAgZWxzZVxuICAgICAgICBsaXN0LnB1c2goaXRlci50b1N0cmluZygpKTtcbiAgICB9XG4gICAgbG9nZ2VyRnVuYyhsaXN0LmpvaW4oXCIgXCIpKTtcbiAgfTtcbn1cblxuVXNlckNvbnRleHQucHJvdG90eXBlLmxvZ0RlZmF1bHQgPSBtYWtlTG9nZ2VyKGNvbnNvbGUubG9nKTtcblVzZXJDb250ZXh0LnByb3RvdHlwZS5sb2dJbmZvID0gbWFrZUxvZ2dlcihjb25zb2xlLmluZm8pO1xuVXNlckNvbnRleHQucHJvdG90eXBlLmxvZ0RlYnVnID0gbWFrZUxvZ2dlcigvKmNvbnNvbGUuZGVidWcqLyk7XG5Vc2VyQ29udGV4dC5wcm90b3R5cGUubG9nV2FybiA9IG1ha2VMb2dnZXIoY29uc29sZS53YXJuKTtcblVzZXJDb250ZXh0LnByb3RvdHlwZS5sb2dFcnJvciA9IG1ha2VMb2dnZXIoY29uc29sZS5lcnJvcik7XG5cblVzZXJDb250ZXh0LnByb3RvdHlwZS5fX2xvZ1RhZyA9IGZ1bmN0aW9uKCkge1xuICBjb25zdCB0YWcgPSB0aGlzLlBST0pFQ1RfU09VUkNFX0RJUi5yZWxhdGl2ZSh0aGlzLlNPVVJDRV9ESVIpO1xuICByZXR1cm4gcGF0aC5wb3NpeC5qb2luKHRoaXMuUFJPSkVDVF9OQU1FLCB0YWcpO1xufVxuXG5Vc2VyQ29udGV4dC5wcm90b3R5cGUuX19zY29wZSA9IGZ1bmN0aW9uKCkge1xuICByZXR1cm4gdGhpc1tTQ09QRV07XG59XG5cblVzZXJDb250ZXh0LnByb3RvdHlwZS5nZXRDYWNoZVZhcmlhYmxlcyA9IGZ1bmN0aW9uKCkge1xuICB0aGlzLmxvZ0RlYnVnKGN1cnJlbnRGdW5jdGlvbk5hbWUoKSk7XG4gIGNvbnN0IHJlc3VsdCA9IHt9O1xuICBmb3IgKGNvbnN0IFtrZXksIGVudHJ5XSBvZiBPYmplY3QuZW50cmllcyh0aGlzW0dMT0JBTF0uQ0FDSEUpKSB7XG4gICAgY29uc3QgdmFsdWUgPSBjb3B5VmFsdWUodGhpc1trZXldKTtcbiAgICByZXN1bHRba2V5XSA9IHtcbiAgICAgIHR5cGU6IGNvcHlWYWx1ZShlbnRyeS50eXBlKSB8fCB0eXBlb2YgdmFsdWUsXG4gICAgICBkZXNjcmlwdGlvbjogZW50cnkuZGVzY3JpcHRpb24gfHwgXCJcIixcbiAgICAgIHZhbHVlLFxuICAgIH07XG4gIH1cbiAgcmV0dXJuIHJlc3VsdDtcbn1cblxuVXNlckNvbnRleHQucHJvdG90eXBlLmFkZENhY2hlVmFyaWFibGVzID0gZnVuY3Rpb24ocGFyYW1zKSB7XG4gIHRoaXMubG9nRGVidWcoY3VycmVudEZ1bmN0aW9uTmFtZSgpKTtcblxuICBpZiAodHlwZW9mIHBhcmFtcyA9PT0gXCJzdHJpbmdcIikge1xuICAgIGNvbnN0IHNjcmlwdHMgPSB0aGlzLlNPVVJDRV9ESVIucmVzb2x2ZShwYXJhbXMpO1xuICAgIHRoaXNbR0xPQkFMXS5sb2FkQ2FjaGVWYXJpYWJsZXMoc2NyaXB0cyk7XG4gIH1cbiAgZWxzZSBpZiAodHlwZW9mIHBhcmFtcyA9PT0gXCJvYmplY3RcIikge1xuICAgIHRoaXNbR0xPQkFMXS5hZGRDYWNoZVZhcmlhYmxlcyhwYXJhbXMpO1xuICB9XG4gIGVsc2Uge1xuICAgIHRocm93IG5ldyBFcnJvcihgVHlwZSAke3BhcmFtc30gY2Fubm90IHVzZSBmb3IgY2FjaGUgdmFyaWFibGVzYCk7XG4gIH1cblxuICB0aGlzW0dMT0JBTF0uY29weUNhY2hlVmFyaWFibGVzKHRoaXMpO1xufVxuXG5Vc2VyQ29udGV4dC5wcm90b3R5cGUuYWRkSW5jbHVkZURpcmVjdG9yaWVzID0gZnVuY3Rpb24oLi4uZGlycykge1xuICBmb3IgKGNvbnN0IGl0ZXIgb2YgZGlycy5mbGF0KDEpKSB7XG4gICAgdGhpcy5JTkNMVURFUy5wdXNoKEluY2x1ZGVEaXJlY3RvcnkuY3JlYXRlKGl0ZXIsIHRoaXMuU09VUkNFX0RJUikpO1xuICB9XG59XG5cblVzZXJDb250ZXh0LnByb3RvdHlwZS5hZGRTdWJkaXJlY3RvcnkgPSBmdW5jdGlvbihzb3VyY2VEaXIsIGJpbmFyeURpcikge1xuICB0aGlzLmxvZ0RlYnVnKGN1cnJlbnRGdW5jdGlvbk5hbWUoKSk7XG5cbiAgYmluYXJ5RGlyID0gYmluYXJ5RGlyIHx8IHBhdGguaXNBYnNvbHV0ZShzb3VyY2VEaXIpID8gdW5kZWZpbmVkIDogc291cmNlRGlyO1xuXG4gIGNvbnN0IFNPVVJDRV9ESVIgPSBwYXRoLmlzQWJzb2x1dGUoc291cmNlRGlyKSA/IEFic29sdXRlUGF0aC5jcmVhdGUoc291cmNlRGlyKSA6IHRoaXMuU09VUkNFX0RJUi5qb2luKHNvdXJjZURpcik7XG4gIGNvbnN0IEJJTkFSWV9ESVIgPSBwYXRoLmlzQWJzb2x1dGUoYmluYXJ5RGlyKSA/IEFic29sdXRlUGF0aC5jcmVhdGUoYmluYXJ5RGlyKSA6IHRoaXMuQklOQVJZX0RJUi5qb2luKGJpbmFyeURpcik7XG5cbiAgY29uc3QgbmV3U2NvcGUgPSB0aGlzW1NDT1BFXS5jbG9uZSgpO1xuXG4gIG5ld1Njb3BlLlNPVVJDRV9ESVIgPSBBYnNvbHV0ZVBhdGguY3JlYXRlKHRoaXNbR0xPQkFMXS5yZXNvbHZlU3ViZGlyZWN0b3J5KFNPVVJDRV9ESVIpLnRvU3RyaW5nKCkpO1xuICBuZXdTY29wZS5CSU5BUllfRElSID0gQklOQVJZX0RJUjtcbiAgXG4gIGNvbnN0IG5ld0NvbnRleCA9IFVzZXJDb250ZXh0LmNyZWF0ZShuZXdTY29wZSwgdGhpc1tHTE9CQUxdKTtcbiAgZm9yIChjb25zdCBba2V5LCB2YWxdIG9mIE9iamVjdC5lbnRyaWVzKHRoaXMpKSB7XG4gICAgaWYgKCFPYmplY3QuaGFzT3duKFN5c3RlbVZhcmlhYmxlcy5wcm90b3R5cGUsIGtleSkpXG4gICAgICBuZXdDb250ZXhba2V5XSA9IHZhbDtcbiAgfVxuXG4gIHRoaXNbR0xPQkFMXS5hZGRTdWJkaXJlY3RvcnkobmV3Q29udGV4KTtcbn1cblxuVXNlckNvbnRleHQucHJvdG90eXBlLmFkZEN1c3RvbVNjcmlwdCA9IGZ1bmN0aW9uKG5hbWUsIHBhcmFtcykge1xuICB0aGlzLmxvZ0RlYnVnKGN1cnJlbnRGdW5jdGlvbk5hbWUoKSwgbmFtZSk7XG5cbiAgY29uc3QgbmV3U2NvcGUgPSB0aGlzW1NDT1BFXS5jbG9uZSgpO1xuICBjb25zdCB0YXJnZXQgPSBDdXN0b21TY3JpcHQuY3JlYXRlKG5ld1Njb3BlLCBuYW1lLCBwYXJhbXMpO1xuICB0aGlzW0dMT0JBTF0uU0NSSVBUUy5zZXQobmFtZSwgdGFyZ2V0KTtcbiAgcmV0dXJuIHRhcmdldDtcbn1cblxuVXNlckNvbnRleHQucHJvdG90eXBlLnRhcmdldCA9IGZ1bmN0aW9uKG5hbWUpIHtcbiAgY29uc3QgdXRhcmdldCA9IHRoaXNbR0xPQkFMXS5nZXRVa25vd25UYXJnZXQobmFtZSk7XG4gIHJldHVybiBJbnRlcmZhY2VUYXJnZXQuY3JlYXRlKHRoaXNbU0NPUEVdLCB1dGFyZ2V0KTtcbn1cblxuVXNlckNvbnRleHQucHJvdG90eXBlLnNjcmlwdCA9IGZ1bmN0aW9uKG5hbWUpIHtcbiAgdGhpcy5sb2dEZWJ1ZyhjdXJyZW50RnVuY3Rpb25OYW1lKCksIG5hbWUpO1xuXG4gIGxldCBzY3JpcHQgPSB0aGlzW0dMT0JBTF0uSU5URVJGQUNFX1NDUklQVFNbbmFtZV07XG4gIGlmICghc2NyaXB0KSB7XG4gICAgc2NyaXB0ID0gSW50ZXJmYWNlU2NyaXB0LmNyZWF0ZShuYW1lKTtcbiAgICB0aGlzW0dMT0JBTF0uSU5URVJGQUNFX1NDUklQVFNbbmFtZV0gPSBzY3JpcHQ7XG4gIH1cblxuICByZXR1cm4gc2NyaXB0O1xufVxuXG5Vc2VyQ29udGV4dC5wcm90b3R5cGUuaW5zdGFsbCA9IGZ1bmN0aW9uKHZhbHVlLCBwYXJhbXMpIHtcbiAgZm9yIChjb25zdCBpdCBvZiBbIHZhbHVlIF0uZmxhdCgxKSkge1xuICAgIGNvbnN0IGl0ZXIgPSAoaXQgaW5zdGFuY2VvZiBCYXNlVGFyZ2V0KSA/IHRoaXMudGFyZ2V0KGl0Lk5BTUUpIDogaXQ7XG4gICAgY29uc3QgZW50aXR5ID0gSW5zdGFsbEVudGl0eS5jcmVhdGUodGhpcywgaXRlciwgcGFyYW1zKTtcbiAgICB0aGlzW0dMT0JBTF0uSU5TVEFMTF9MSVNULnB1c2goZW50aXR5KTtcbiAgfVxufVxuXG5Vc2VyQ29udGV4dC5wcm90b3R5cGUuYWRkU3RhdGljTGlicmFyeSA9IGZ1bmN0aW9uKG5hbWUsIC4uLnNvdXJjZXMpIHtcbiAgdGhpcy5sb2dEZWJ1ZyhjdXJyZW50RnVuY3Rpb25OYW1lKCksIG5hbWUpO1xuXG4gIGNvbnN0IHRhcmdldCA9IFN0YXRpY0xpYnJhcnkuY3JlYXRlKHRoaXNbU0NPUEVdLCBuYW1lKTtcbiAgdGFyZ2V0LmFkZFNvdXJjZXMoLi4uc291cmNlcyk7XG5cbiAgdGhpc1tHTE9CQUxdLlRBUkdFVFMuc2V0KG5hbWUsIHRhcmdldCk7XG4gIHJldHVybiB0YXJnZXQ7XG59XG5cblVzZXJDb250ZXh0LnByb3RvdHlwZS5hZGRPYmplY3RMaWJyYXJ5ID0gZnVuY3Rpb24obmFtZSwgLi4uc291cmNlcykge1xuICB0aGlzLmxvZ0RlYnVnKGN1cnJlbnRGdW5jdGlvbk5hbWUoKSwgbmFtZSk7XG5cbiAgY29uc3QgdGFyZ2V0ID0gT2JqZWN0TGlicmFyeS5jcmVhdGUodGhpc1tTQ09QRV0sIG5hbWUpO1xuICB0YXJnZXQuYWRkU291cmNlcyguLi5zb3VyY2VzKTtcblxuICB0aGlzW0dMT0JBTF0uVEFSR0VUUy5zZXQobmFtZSwgdGFyZ2V0KTtcbiAgcmV0dXJuIHRhcmdldDtcbn1cblxuVXNlckNvbnRleHQucHJvdG90eXBlLmFkZFNoYXJlZExpYnJhcnkgPSBmdW5jdGlvbihuYW1lLCAuLi5zb3VyY2VzKSB7XG4gIHRoaXMubG9nRGVidWcoY3VycmVudEZ1bmN0aW9uTmFtZSgpLCBuYW1lKTtcblxuICBjb25zdCB0YXJnZXQgPSBTaGFyZWRMaWJyYXJ5LmNyZWF0ZSh0aGlzW1NDT1BFXSwgbmFtZSk7XG4gIHRhcmdldC5hZGRTb3VyY2VzKC4uLnNvdXJjZXMpO1xuXG4gIHRoaXNbR0xPQkFMXS5UQVJHRVRTLnNldChuYW1lLCB0YXJnZXQpO1xuICByZXR1cm4gdGFyZ2V0O1xufVxuXG5Vc2VyQ29udGV4dC5wcm90b3R5cGUuYWRkRXhlY3V0YWJsZSA9IGZ1bmN0aW9uKG5hbWUsIC4uLnNvdXJjZXMpIHtcbiAgdGhpcy5sb2dEZWJ1ZyhjdXJyZW50RnVuY3Rpb25OYW1lKCksIG5hbWUpO1xuXG4gIGNvbnN0IHRhcmdldCA9IEV4ZWN1dGFibGUuY3JlYXRlKHRoaXNbU0NPUEVdLCBuYW1lKTtcbiAgdGFyZ2V0LmFkZFNvdXJjZXMoLi4uc291cmNlcyk7XG5cbiAgdGhpc1tHTE9CQUxdLlRBUkdFVFMuc2V0KG5hbWUsIHRhcmdldCk7XG4gIHJldHVybiB0YXJnZXQ7XG59XG5cblVzZXJDb250ZXh0LnByb3RvdHlwZS5maW5kUHJvZ3JhbSA9IGZ1bmN0aW9uKG5hbWUpIHtcbiAgdGhpcy5sb2dEZWJ1ZyhjdXJyZW50RnVuY3Rpb25OYW1lKCksIG5hbWUpO1xuXG4gIGlmIChvcy5wbGF0Zm9ybSgpID09PSBcIndpbjMyXCIgJiYgIW5hbWUuZW5kc1dpdGgoXCIuZXhlXCIpKVxuICAgIG5hbWUgKz0gXCIuZXhlXCI7XG5cbiAgY29uc3QgcGF0aHMgPSBwcm9jZXNzLmVudi5QQVRILnNwbGl0KHBhdGgucG9zaXguZGVsaW1pdGVyKTtcbiAgZm9yIChjb25zdCBpdGVyIG9mIHBhdGhzKSB7XG4gICAgY29uc3QgZmlsZW5hbWUgPSBwYXRoLnBvc2l4LnJlc29sdmUoaXRlciwgbmFtZSk7XG4gICAgaWYgKGZpbGVFeGlzdHNTeW5jKGZpbGVuYW1lKSlcbiAgICAgIHJldHVybiBmaWxlbmFtZTtcbiAgfVxuXG4gIHJldHVybiBudWxsO1xufVxuXG5Vc2VyQ29udGV4dC5wcm90b3R5cGUuZXhlY3V0ZVNjcmlwdCA9IGZ1bmN0aW9uKHNjcmlwdCwgb3B0aW9ucykge1xuICB0aGlzLmxvZ0RlYnVnKGN1cnJlbnRGdW5jdGlvbk5hbWUoKSwgc2NyaXB0KTtcbiAgY29uc3Qgc2NyaXB0UGF0aCA9IHRoaXMuU09VUkNFX0RJUi5yZXNvbHZlKHNjcmlwdCk7XG4gIGNvbnN0IG1vZHVsZSA9IHJlcXVpcmVJbXBsKHNjcmlwdFBhdGgudG9TdHJpbmcoKSk7XG4gIG1vZHVsZShzY29wZVZhbHVlQXNQcmltaXRpdmVzKG9wdGlvbnMpKTtcbn1cblxuVXNlckNvbnRleHQucHJvdG90eXBlLnRvSlNPTiA9IGZ1bmN0aW9uKCkge1xuICBjb25zdCBqc29uID0ge307XG4gIGZvciAoY29uc3Qga2V5IGluIHRoaXMpXG4gICAganNvbltrZXldID0gdGhpc1trZXldO1xuICByZXR1cm4ganNvbjtcbn1cblxubW9kdWxlLmV4cG9ydHMgPSB7XG4gIFVzZXJDb250ZXh0LFxufTtcbiIsIi8qXG4gKiBNSVQgTGljZW5zZVxuICpcbiAqIENvcHlyaWdodCAoYykgMjAyNSAgWXVyaWkgWWFrdWJpbiAoeXVyaWkueWFrdWJpbkBnbWFpbC5jb20pXG4gKlxuICogUGVybWlzc2lvbiBpcyBncmFudGVkIHRvIHVzZSwgY29weSwgbW9kaWZ5LCBhbmQgZGlzdHJpYnV0ZSB0aGlzIHNvZnR3YXJlXG4gKiB1bmRlciB0aGUgTUlUIExpY2Vuc2UuIFNlZSBMSUNFTlNFIGZpbGUgZm9yIGRldGFpbHMuXG4gKi9cblxuZXhwb3J0IGVudW0gQm9vbGVhblR5cGUge1xuICBPTiA9IFwiT05cIixcbiAgT0ZGID0gXCJPRkZcIixcbn07XG5cbi8vIEVudW0gcmVwcmVzZW50aW5nIHZhbHVlIHR5cGVzIHVzZWQgaW4gQ01ha2UgY2FjaGUgdmFyaWFibGVzXG5leHBvcnQgZW51bSBWYWx1ZVR5cGUge1xuICAvLyBSZXByZXNlbnRzIGEgZnVsbCBwYXRoIHRvIGEgZmlsZVxuICBGSUxFUEFUSCA9IFwiRklMRVBBVEhcIixcblxuICAvLyBSZXByZXNlbnRzIGEgcGF0aCB0byBhIGRpcmVjdG9yeVxuICBQQVRIID0gXCJQQVRIXCIsXG5cbiAgLy8gUmVwcmVzZW50cyBhIGJvb2xlYW4gdmFsdWUgKHRydWUvZmFsc2UpXG4gIEJPT0wgPSBcIkJPT0xcIixcblxuICAvLyBSZXByZXNlbnRzIGEgZ2VuZXJpYyBzdHJpbmcgdmFsdWVcbiAgU1RSSU5HID0gXCJTVFJJTkdcIixcbn07XG5cbi8vIEJ1aWxkVHlwZSByZXByZXNlbnRpbmcgY29tbW9uIENNYWtlIGJ1aWxkIHR5cGVzXG5leHBvcnQgZW51bSBCdWlsZFR5cGUge1xuICAvLyBEZWJ1ZyBidWlsZCB0eXBlOiBpbmNsdWRlcyBkZWJ1ZyBzeW1ib2xzLCBubyBvcHRpbWl6YXRpb25cbiAgRGVidWcgPSBcIkRlYnVnXCIsXG5cbiAgLy8gUmVsZWFzZSBidWlsZCB0eXBlOiBvcHRpbWl6ZWQgY29kZSwgbm8gZGVidWcgaW5mb1xuICBSZWxlYXNlID0gXCJSZWxlYXNlXCIsXG5cbiAgLy8gUmVsZWFzZSB3aXRoIGRlYnVnIGluZm86IG9wdGltaXplZCB3aXRoIGRlYnVnIHN5bWJvbHMgaW5jbHVkZWRcbiAgUmVsV2l0aERlYkluZm8gPSBcIlJlbFdpdGhEZWJJbmZvXCIsXG5cbiAgLy8gTWluaW11bSBzaXplIHJlbGVhc2U6IG9wdGltaXplZCBmb3Igc21hbGxlc3QgYmluYXJ5IHNpemVcbiAgTWluU2l6ZVJlbCA9IFwiTWluU2l6ZVJlbFwiLFxufTtcblxuLy8gVGhlIGRlZmF1bHQgbmFtZSBvZiB0aGUgbWFpbiBDTWFrZSBidWlsZCBjb25maWd1cmF0aW9uIGZpbGVcbmV4cG9ydCBjb25zdCBDTUFLRV9MSVNUU19UWFQgPSBcIkNNYWtlTGlzdHMudHh0XCI7XG4iLCIvKlxuICogTUlUIExpY2Vuc2VcbiAqXG4gKiBDb3B5cmlnaHQgKGMpIDIwMjUgIFl1cmlpIFlha3ViaW4gKHl1cmlpLnlha3ViaW5AZ21haWwuY29tKVxuICpcbiAqIFBlcm1pc3Npb24gaXMgZ3JhbnRlZCB0byB1c2UsIGNvcHksIG1vZGlmeSwgYW5kIGRpc3RyaWJ1dGUgdGhpcyBzb2Z0d2FyZVxuICogdW5kZXIgdGhlIE1JVCBMaWNlbnNlLiBTZWUgTElDRU5TRSBmaWxlIGZvciBkZXRhaWxzLlxuICovXG5cbmltcG9ydCB7IEJvb2xlYW5UeXBlIH0gZnJvbSBcIkAvY21ha2UvQ29uc3RhbnRzXCI7XG5cbmV4cG9ydCBmdW5jdGlvbiBjb252ZXJ0VG9WYWx1ZShvYmo6IGFueSk6IHN0cmluZyB7XG4gIGlmIChBcnJheS5pc0FycmF5KG9iaikpXG4gICAgcmV0dXJuIG9iai5tYXAoaSA9PiBjb252ZXJ0VG9WYWx1ZShpKSkuam9pbihcIjtcIik7XG5cbiAgaWYgKHR5cGVvZiBvYmogPT09IFwiYm9vbGVhblwiKVxuICAgIHJldHVybiBvYmogPyBCb29sZWFuVHlwZS5PTiA6IEJvb2xlYW5UeXBlLk9GRjtcblxuICByZXR1cm4gb2JqLnRvU3RyaW5nKCk7XG59XG4iLCIvKlxuICogTUlUIExpY2Vuc2VcbiAqXG4gKiBDb3B5cmlnaHQgKGMpIDIwMjUgIFl1cmlpIFlha3ViaW4gKHl1cmlpLnlha3ViaW5AZ21haWwuY29tKVxuICpcbiAqIFBlcm1pc3Npb24gaXMgZ3JhbnRlZCB0byB1c2UsIGNvcHksIG1vZGlmeSwgYW5kIGRpc3RyaWJ1dGUgdGhpcyBzb2Z0d2FyZVxuICogdW5kZXIgdGhlIE1JVCBMaWNlbnNlLiBTZWUgTElDRU5TRSBmaWxlIGZvciBkZXRhaWxzLlxuICovXG5cbmltcG9ydCBwYXRoIGZyb20gXCJub2RlOnBhdGhcIjtcbmltcG9ydCB1cmwgZnJvbSBcIm5vZGU6dXJsXCI7XG5cbmltcG9ydCB7IGVuc3VyZVN0cmluZyB9IGZyb20gXCJAL3V0aWxzL1N0cmljdFR5cGVcIjtcbmltcG9ydCB7IEFic29sdXRlUGF0aCB9IGZyb20gXCJAL2NvcmUvUGF0aFwiO1xuXG5jb25zdCBUQVJHRVRfU0NPUEUgPSBTeW1ib2woXCJUQVJHRVRfU0NPUEVcIik7XG5jb25zdCBOQU1FICAgICAgICAgPSBTeW1ib2woXCJOQU1FXCIpO1xuY29uc3QgRklMRSAgICAgICAgID0gU3ltYm9sKFwiRklMRVwiKTtcbmNvbnN0IElOUFVUICAgICAgICA9IFN5bWJvbChcIklOUFVUXCIpO1xuY29uc3QgT1VUUFVUICAgICAgID0gU3ltYm9sKFwiT1VUUFVUXCIpO1xuY29uc3QgUEFSQU1TICAgICAgID0gU3ltYm9sKFwiUEFSQU1TXCIpO1xuY29uc3QgUFJPUEVSVElFUyAgID0gU3ltYm9sKFwiUFJPUEVSVElFU1wiKTtcblxuY29uc3QgX19maWxlbmFtZSA9IHVybC5maWxlVVJMVG9QYXRoKGltcG9ydC5tZXRhLnVybCk7XG5jb25zdCBfX2Rpcm5hbWUgPSBwYXRoLmRpcm5hbWUoX19maWxlbmFtZSk7XG5cbmNvbnN0IFNZU1RFTV9TQ1JJUFRTX0RJUiA9IEFic29sdXRlUGF0aC5jcmVhdGUoX19kaXJuYW1lKS5yZXNvbHZlKFwiLi4vYml0bWFrZS9TeXN0ZW1TY3JpcHRzXCIpO1xuXG5leHBvcnQgY2xhc3MgQ3VzdG9tU2NyaXB0IHtcbiAgcHJpdmF0ZSBbVEFSR0VUX1NDT1BFXTogYW55O1xuICBwcml2YXRlIFtOQU1FXTogc3RyaW5nO1xuICBwcml2YXRlIFtGSUxFXTogQWJzb2x1dGVQYXRoO1xuICBwcml2YXRlIFtJTlBVVF06IEFic29sdXRlUGF0aCB8IG51bGw7XG4gIHByaXZhdGUgW09VVFBVVF06IEFic29sdXRlUGF0aDtcbiAgcHJpdmF0ZSBbUEFSQU1TXTogb2JqZWN0O1xuICBwcml2YXRlIFtQUk9QRVJUSUVTXTogYW55O1xuXG4gIHByaXZhdGUgY29uc3RydWN0b3Ioc2NvcGU6IGFueSwgbmFtZTogc3RyaW5nLCBwYXJhbXM6IGFueSkge1xuICAgIHRoaXNbVEFSR0VUX1NDT1BFXSA9IHNjb3BlO1xuICAgIHRoaXNbTkFNRV0gPSBlbnN1cmVTdHJpbmcobmFtZSk7XG4gIFxuICAgIGlmICghcGFyYW1zIHx8ICFwYXJhbXMuc2NyaXB0IHx8ICFwYXJhbXMub3V0cHV0KVxuICAgICAgdGhyb3cgbmV3IEVycm9yKGBVa25vd24gcGFyYW1zICR7SlNPTi5zdHJpbmdpZnkocGFyYW1zKX1gKTtcbiAgXG4gICAgaWYgKC9bLlxcL1xcXFxdLy50ZXN0KHBhcmFtcy5zY3JpcHQpKVxuICAgICAgdGhpc1tGSUxFXSA9IHNjb3BlLlNPVVJDRV9ESVIucmVzb2x2ZShwYXJhbXMuc2NyaXB0KTtcbiAgICBlbHNlXG4gICAgICB0aGlzW0ZJTEVdID0gU1lTVEVNX1NDUklQVFNfRElSLmpvaW4ocGFyYW1zLnNjcmlwdCArIFwiLmpzXCIpO1xuICBcbiAgICB0aGlzW0lOUFVUXSA9IHBhcmFtcy5pbnB1dCB8fCBudWxsO1xuICAgIHRoaXNbT1VUUFVUXSA9IHBhcmFtcy5vdXRwdXQ7XG4gICAgdGhpc1tQQVJBTVNdID0gcGFyYW1zO1xuICAgIHRoaXNbUFJPUEVSVElFU10gPSB7fTtcbiAgfVxuXG4gIHB1YmxpYyBzdGF0aWMgY3JlYXRlKHNjb3BlOiBhbnksIG5hbWU6IHN0cmluZywgcGFyYW1zOiBhbnkpIHtcbiAgICByZXR1cm4gT2JqZWN0LnNlYWwobmV3IEN1c3RvbVNjcmlwdChzY29wZSwgbmFtZSwgcGFyYW1zKSk7XG4gIH1cblxuICBwdWJsaWMgYWRkUHJvcGVydHkoa2V5OiBzdHJpbmcsIC4uLnZhbHM6IGFueVtdKSB7XG4gICAgbGV0IHByb3BlcnR5ID0gdGhpc1tQUk9QRVJUSUVTXVtrZXldO1xuICAgIGlmICghcHJvcGVydHkpIHtcbiAgICAgIHByb3BlcnR5ID0gW107XG4gICAgICB0aGlzW1BST1BFUlRJRVNdW2tleV0gPSBwcm9wZXJ0eTtcbiAgICB9XG4gICAgdmFscy5mb3JFYWNoKHYgPT4gcHJvcGVydHkucHVzaCh2KSk7XG4gIH1cblxuICBwdWJsaWMgZ2V0IE5BTUUoKTogc3RyaW5nIHtcbiAgICByZXR1cm4gdGhpc1tOQU1FXTtcbiAgfVxuXG4gIHB1YmxpYyBnZXQgVEFSR0VUX1NDT1BFKCk6IGFueSB7XG4gICAgcmV0dXJuIHRoaXNbVEFSR0VUX1NDT1BFXTtcbiAgfVxuXG4gIHB1YmxpYyBnZXQgRklMRSgpOiBBYnNvbHV0ZVBhdGgge1xuICAgIHJldHVybiB0aGlzW0ZJTEVdO1xuICB9XG5cbiAgcHVibGljIGdldCBJTlBVVCgpOiBBYnNvbHV0ZVBhdGggfCBudWxsIHtcbiAgICByZXR1cm4gdGhpc1tJTlBVVF07XG4gIH1cblxuICBwdWJsaWMgc2V0IElOUFVUKHZhbHVlOiBBYnNvbHV0ZVBhdGggfCBzdHJpbmcpIHtcbiAgICB0aGlzW0lOUFVUXSA9IHRoaXNbVEFSR0VUX1NDT1BFXS5TT1VSQ0VfRElSLnJlc29sdmUodmFsdWUpO1xuICB9XG5cbiAgcHVibGljIGdldCBPVVRQVVQoKTogQWJzb2x1dGVQYXRoIHtcbiAgICByZXR1cm4gdGhpc1tPVVRQVVRdO1xuICB9XG5cbiAgcHVibGljIHNldCBPVVRQVVQodmFsdWU6IEFic29sdXRlUGF0aCB8IHN0cmluZykge1xuICAgIHRoaXNbT1VUUFVUXSA9IEFic29sdXRlUGF0aC5jcmVhdGUodmFsdWUpO1xuICB9XG5cbiAgcHVibGljIGdldCBQQVJBTVMoKTogb2JqZWN0IHtcbiAgICByZXR1cm4gdGhpc1tQQVJBTVNdO1xuICB9XG5cbiAgcHVibGljIHNldCBQQVJBTVModmFsdWU6IG9iamVjdCkge1xuICAgIHRoaXNbUEFSQU1TXSA9IHZhbHVlO1xuICB9XG5cbiAgcHVibGljIGdldCBQUk9QRVJUSUVTKCkge1xuICAgIHJldHVybiB0aGlzW1BST1BFUlRJRVNdO1xuICB9XG5cbiAgcHVibGljIHRvU3RyaW5nKCk6IHN0cmluZyB7XG4gICAgcmV0dXJuIHRoaXNbTkFNRV0udG9TdHJpbmcoKTtcbiAgfVxuXG4gIHB1YmxpYyB0b0pTT04oKTogb2JqZWN0IHtcbiAgICByZXR1cm4ge1xuICAgICAgTkFNRTogdGhpcy5OQU1FLFxuICAgICAgVEFSR0VUX1NDT1BFOiB0aGlzLlRBUkdFVF9TQ09QRSxcbiAgICAgIEZJTEU6IHRoaXMuRklMRSxcbiAgICAgIElOUFVUOiB0aGlzLklOUFVULFxuICAgICAgT1VUUFVUOiB0aGlzLk9VVFBVVCxcbiAgICAgIFBBUkFNUzogdGhpcy5QQVJBTVMsXG4gICAgICBQUk9QRVJUSUVTOiB0aGlzLlBST1BFUlRJRVMsXG4gICAgfVxuICB9XG59O1xuIiwiLypcbiAqIE1JVCBMaWNlbnNlXG4gKlxuICogQ29weXJpZ2h0IChjKSAyMDI1ICBZdXJpaSBZYWt1YmluICh5dXJpaS55YWt1YmluQGdtYWlsLmNvbSlcbiAqXG4gKiBQZXJtaXNzaW9uIGlzIGdyYW50ZWQgdG8gdXNlLCBjb3B5LCBtb2RpZnksIGFuZCBkaXN0cmlidXRlIHRoaXMgc29mdHdhcmVcbiAqIHVuZGVyIHRoZSBNSVQgTGljZW5zZS4gU2VlIExJQ0VOU0UgZmlsZSBmb3IgZGV0YWlscy5cbiAqL1xuXG5pbXBvcnQgcGF0aCBmcm9tIFwibm9kZTpwYXRoXCI7XG5pbXBvcnQgZnMgZnJvbSBcIm5vZGU6ZnNcIjtcbmltcG9ydCB7IHNwYXduU3luYyB9IGZyb20gXCJub2RlOmNoaWxkX3Byb2Nlc3NcIjtcblxuaW1wb3J0IHsgaW1wb3J0TW9kdWxlIH0gZnJvbSBcIkAvdXRpbHMvTW9kdWxlXCI7XG5cbmltcG9ydCBjb25maWd1cmVfZmlsZSBmcm9tIFwiQC9iaXRtYWtlL1N5c3RlbVNjcmlwdHMvY29uZmlndXJlX2ZpbGUuanNcIjtcbmltcG9ydCBpbnN0YWxsX3NjcmlwdCBmcm9tIFwiQC9iaXRtYWtlL1N5c3RlbVNjcmlwdHMvaW5zdGFsbF9zY3JpcHQuanNcIjtcblxuY29uc3QgRU5UUklFUyA9IFN5bWJvbChcIkVOVFJJRVNcIik7XG5cbmVudW0gR29hbFR5cGUge1xuICBTQ1JJUFQgPSBcInNjcmlwdFwiLFxuICBFWEVDID0gXCJleGVjXCIsXG4gIFRBUkdFVCA9IFwidGFyZ2V0XCIsXG59O1xuXG5pbnRlcmZhY2UgQmFzZUdvYWwge1xuICBuYW1lOiBzdHJpbmc7XG4gIHR5cGU6IEdvYWxUeXBlO1xuICBkZXBlbmRzOiBBcnJheTxzdHJpbmc+O1xuICBtc2c6IHN0cmluZztcbiAgb3V0cHV0OiBzdHJpbmc7XG59O1xuXG5pbnRlcmZhY2UgU2NyaXB0R29hbCBleHRlbmRzIEJhc2VHb2FsIHtcbiAgc2NyaXB0OiBzdHJpbmc7XG4gIHBhcmFtczogYW55O1xufTtcblxuaW50ZXJmYWNlIEV4ZWNHb2FsIGV4dGVuZHMgQmFzZUdvYWwge1xuICBjb21tYW5kOiBzdHJpbmc7XG4gIGFyZ3M6IEFycmF5PHN0cmluZz47XG4gIGN3ZDogc3RyaW5nO1xufTtcblxuZXhwb3J0IGNsYXNzIEdvYWxDb2xsZWN0aW9uIHtcbiAgcHJpdmF0ZSBbRU5UUklFU106IEFycmF5PEJhc2VHb2FsPjtcblxuICBwcml2YXRlIGNvbnN0cnVjdG9yKCkge1xuICAgIHRoaXNbRU5UUklFU10gPSBuZXcgQXJyYXk8QmFzZUdvYWw+O1xuICB9XG5cbiAgcHVibGljIGdldCBFTlRSSUVTKCkge1xuICAgIHJldHVybiB0aGlzW0VOVFJJRVNdO1xuICB9XG5cbiAgcHVibGljIHN0YXRpYyBjcmVhdGUoKSB7XG4gICAgcmV0dXJuIE9iamVjdC5zZWFsKG5ldyBHb2FsQ29sbGVjdGlvbik7XG4gIH1cblxuICBwdWJsaWMgZmluZFNjcmlwdEJ5T3V0cHV0KG91dHB1dDogc3RyaW5nKTogQmFzZUdvYWwgfCB1bmRlZmluZWQge1xuICAgIGlmICghb3V0cHV0KVxuICAgICAgcmV0dXJuIHVuZGVmaW5lZDtcbiAgICByZXR1cm4gdGhpc1tFTlRSSUVTXS5maW5kKChpKSA9PiBpLnR5cGUgPT09IEdvYWxUeXBlLlNDUklQVCAmJiBpLm91dHB1dCA9PT0gb3V0cHV0KTtcbiAgfVxuXG4gIHB1YmxpYyBoYXNTY3JpcHRCeU91dHB1dChvdXRwdXQ6IHN0cmluZyk6IGJvb2xlYW4ge1xuICAgIHJldHVybiAhIXRoaXMuZmluZFNjcmlwdEJ5T3V0cHV0KG91dHB1dCk7XG4gIH1cblxuICBwdWJsaWMgYWRkU2NyaXB0KHNjcmlwdDogc3RyaW5nLCBuYW1lOiBzdHJpbmcsIGRlcGVuZHM6IEFycmF5PHN0cmluZz4sIG91dHB1dDogc3RyaW5nLCBwYXJhbXM6IGFueSwgbXNnOiBzdHJpbmcpIHtcbiAgICBpZiAodGhpcy5oYXNTY3JpcHRCeU91dHB1dChvdXRwdXQudG9TdHJpbmcoKSkpXG4gICAgICB0aHJvdyBuZXcgRXJyb3IoYE91dHB1dCBcIiR7b3V0cHV0fVwiIGV4aXN0c2ApO1xuICAgIHRoaXNbRU5UUklFU10ucHVzaCh7IG5hbWUsIHR5cGU6IEdvYWxUeXBlLlNDUklQVCwgc2NyaXB0LCBvdXRwdXQsIGRlcGVuZHMsIHBhcmFtcywgbXNnIH0gYXMgU2NyaXB0R29hbCk7XG4gIH1cblxuICBwdWJsaWMgYWRkRXhlYyhvdXRwdXQ6IHN0cmluZywgZGVwZW5kczogQXJyYXk8c3RyaW5nPiwgY29tbWFuZDogc3RyaW5nLCBhcmdzOiBBcnJheTxzdHJpbmc+LCBjd2Q6IHN0cmluZywgbXNnOiBzdHJpbmcpIHtcbiAgICB0aGlzW0VOVFJJRVNdLnB1c2goeyBuYW1lOiBcIlwiLCB0eXBlOiBHb2FsVHlwZS5FWEVDLCBkZXBlbmRzLCBvdXRwdXQsIGNvbW1hbmQsIGFyZ3MsIGN3ZCwgbXNnIH0gYXMgRXhlY0dvYWwpO1xuICB9XG5cbiAgcHVibGljIGFkZFRhcmdldChuYW1lOiBzdHJpbmcsIGRlcGVuZHM6IEFycmF5PHN0cmluZz4sIG1zZzogc3RyaW5nKSB7XG4gICAgdGhpc1tFTlRSSUVTXS5wdXNoKHsgbmFtZSwgdHlwZTogR29hbFR5cGUuVEFSR0VULCBkZXBlbmRzLCBtc2csIG91dHB1dDogXCJcIiB9KTtcbiAgfVxuXG4gIHB1YmxpYyBnZXRUYXJnZXQobmFtZTogc3RyaW5nKTogQmFzZUdvYWwgfCB1bmRlZmluZWQge1xuICAgIHJldHVybiB0aGlzW0VOVFJJRVNdLmZpbmQoKGkpID0+IGkudHlwZSA9PT0gR29hbFR5cGUuVEFSR0VUICYmIGkubmFtZSA9PT0gbmFtZSk7XG4gIH1cblxuICBwcml2YXRlIGFkZFRhcmdldExpc3RJbXBsKG5hbWU6IHN0cmluZywgcmVzdWx0OiBBcnJheTxCYXNlR29hbD4pIHtcbiAgICBpZiAocmVzdWx0LmZpbmQoaSA9PiBpLm5hbWUgPT09IG5hbWUgfHwgaS5vdXRwdXQgPT09IG5hbWUpKSB7XG4gICAgICByZXR1cm47XG4gICAgfVxuICBcbiAgICBjb25zdCBnb2FsID0gdGhpc1tFTlRSSUVTXS5maW5kKGkgPT4gaS5uYW1lID09PSBuYW1lIHx8IGkub3V0cHV0ID09PSBuYW1lKTtcbiAgICBpZiAoIWdvYWwpIHtcbiAgICAgIHJldHVybjtcbiAgICB9XG4gIFxuICAgIGZvciAoY29uc3QgaXRlciBvZiBnb2FsLmRlcGVuZHMpIHtcbiAgICAgIHRoaXMuYWRkVGFyZ2V0TGlzdEltcGwoaXRlci50b1N0cmluZygpLCByZXN1bHQpO1xuICAgIH1cbiAgXG4gICAgcmVzdWx0LnB1c2goZ29hbCk7XG4gIH1cbiAgXG4gIHB1YmxpYyBnZXRUYXJnZXRMaXN0KG5hbWU6c3RyaW5nKSB7XG4gICAgY29uc3QgcmVzdWx0ID0gbmV3IEFycmF5PEJhc2VHb2FsPjtcbiAgICB0aGlzLmFkZFRhcmdldExpc3RJbXBsKG5hbWUsIHJlc3VsdCk7XG4gICAgcmV0dXJuIHJlc3VsdDtcbiAgfVxuICBcbiAgcHVibGljIHRvSlNPTigpIHtcbiAgICByZXR1cm4gdGhpc1tFTlRSSUVTXTtcbiAgfVxuXG4gIHB1YmxpYyBzdGF0aWMgYXN5bmMgYnVpbGRHb2Fscyhjb2xsZWN0aW9uOiBBcnJheTxCYXNlR29hbD4pIHtcbiAgICBsZXQgbXNnQ291bnQgPSAwO1xuICAgIGZvciAoY29uc3QgaXRlciBvZiBjb2xsZWN0aW9uKVxuICAgICAgbXNnQ291bnQgKz0gaXRlci5tc2cgPyAxIDogMDtcbiAgXG4gICAgbGV0IG1zZ0luZGV4ID0gMDtcbiAgICBmb3IgKGNvbnN0IGdvYWwgb2YgY29sbGVjdGlvbikge1xuICAgICAgY29uc3QgeyB0eXBlLCBtc2cgfSA9IGdvYWw7XG4gICAgICBpZiAobXNnKSB7XG4gICAgICAgIGNvbnN0IHJlbGF0aW9uT2ZMZW5ndGggPSBNYXRoLnJvdW5kKCgrK21zZ0luZGV4IC8gbXNnQ291bnQpICogMTAwKTtcbiAgICAgICAgY29uc3QgcGVyY2VudCA9IFwiW1wiICsgcmVsYXRpb25PZkxlbmd0aC50b1N0cmluZygpLnBhZFN0YXJ0KDMsIFwiIFwiKSArIFwiJV0gXCI7XG4gICAgICAgIGNvbnNvbGUuaW5mbyhwZXJjZW50ICsgbXNnKTtcbiAgICAgIH1cbiAgICAgIGlmICh0eXBlID09PSBHb2FsVHlwZS5TQ1JJUFQpIHtcbiAgICAgICAgY29uc3QgeyBzY3JpcHQsIHBhcmFtcyB9ID0gZ29hbCBhcyBTY3JpcHRHb2FsO1xuICAgICAgICBsZXQgbW9kdWxlO1xuICAgICAgICBpZiAoc2NyaXB0LnRvU3RyaW5nKCkgPT09IHBhdGgucG9zaXguam9pbihfX2Rpcm5hbWUsIFwiU3lzdGVtU2NyaXB0cy9jb25maWd1cmVfZmlsZS5qc1wiKSlcbiAgICAgICAgICBtb2R1bGUgPSBjb25maWd1cmVfZmlsZTtcbiAgICAgICAgZWxzZSBpZiAoc2NyaXB0LnRvU3RyaW5nKCkgPT09IHBhdGgucG9zaXguam9pbihfX2Rpcm5hbWUsIFwiU3lzdGVtU2NyaXB0cy9pbnN0YWxsX3NjcmlwdC5qc1wiKSlcbiAgICAgICAgICBtb2R1bGUgPSBpbnN0YWxsX3NjcmlwdDtcbiAgICAgICAgZWxzZVxuICAgICAgICAgIG1vZHVsZSA9IChhd2FpdCBpbXBvcnRNb2R1bGUoc2NyaXB0LnRvU3RyaW5nKCkpKS5kZWZhdWx0O1xuICAgICAgICBjb25zdCByZXN1bHQgPSBtb2R1bGUocGFyYW1zKTtcbiAgICAgICAgaWYgKHJlc3VsdCBpbnN0YW5jZW9mIFByb21pc2UpIHtcbiAgICAgICAgICBhd2FpdCByZXN1bHQ7XG4gICAgICAgIH1cbiAgICAgIH1cbiAgICAgIGVsc2UgaWYgKHR5cGUgPT09IEdvYWxUeXBlLkVYRUMpIHtcbiAgICAgICAgY29uc3QgeyBjb21tYW5kLCBhcmdzLCBjd2QsIG91dHB1dCB9ID0gZ29hbCBhcyBFeGVjR29hbDtcbiAgICAgICAgZnMubWtkaXJTeW5jKHBhdGgucG9zaXguZGlybmFtZShvdXRwdXQpLCB7IHJlY3Vyc2l2ZTogdHJ1ZSB9KTtcbiAgICAgICAgY29uc3QgcmVzdWx0ID0gc3Bhd25TeW5jKGNvbW1hbmQsIGFyZ3MsIHsgY3dkLCBlbmNvZGluZzogXCJ1dGYtOFwiIH0pO1xuICAgICAgICBpZiAocmVzdWx0LnN0YXR1cykge1xuICAgICAgICAgIGNvbnNvbGUuaW5mbyhcImNkIFwiICsgY3dkKTtcbiAgICAgICAgICBsZXQgY21kID0gYXJncy5qb2luKFwiIFwiKTtcbiAgICAgICAgICBjbWQgPSBjb21tYW5kICsgKGNtZCA/IFwiIFwiIDogXCJcIikgKyBjbWQ7XG4gICAgICAgICAgY29uc29sZS5pbmZvKGNtZCk7XG4gICAgICAgICAgY29uc29sZS5pbmZvKFwiXCIpO1xuICBcbiAgICAgICAgICBjb25zb2xlLmVycm9yKHJlc3VsdC5zdGRlcnIpO1xuICBcbiAgICAgICAgICB0aHJvdyBuZXcgRXJyb3IoXCJTdGF0dXMgXCIgKyByZXN1bHQuc3RhdHVzKTtcbiAgICAgICAgfVxuICAgICAgfVxuICAgICAgZWxzZSBpZiAodHlwZSA9PT0gR29hbFR5cGUuVEFSR0VUKSB7XG4gICAgICB9XG4gICAgfVxuICB9XG59O1xuIiwiLypcbiAqIE1JVCBMaWNlbnNlXG4gKlxuICogQ29weXJpZ2h0IChjKSAyMDI1ICBZdXJpaSBZYWt1YmluICh5dXJpaS55YWt1YmluQGdtYWlsLmNvbSlcbiAqXG4gKiBQZXJtaXNzaW9uIGlzIGdyYW50ZWQgdG8gdXNlLCBjb3B5LCBtb2RpZnksIGFuZCBkaXN0cmlidXRlIHRoaXMgc29mdHdhcmVcbiAqIHVuZGVyIHRoZSBNSVQgTGljZW5zZS4gU2VlIExJQ0VOU0UgZmlsZSBmb3IgZGV0YWlscy5cbiAqL1xuXG5jb25zdCBOQU1FID0gU3ltYm9sKFwiTkFNRVwiKTtcbmNvbnN0IFBBVEggPSBTeW1ib2woXCJQQVRIXCIpO1xuXG5leHBvcnQgY2xhc3MgSW5jbHVkZURpcmVjdG9yeSB7XG4gIHByaXZhdGUgW05BTUVdOiBhbnk7XG4gIHByaXZhdGUgW1BBVEhdOiBhbnk7XG5cbiAgcHJpdmF0ZSBjb25zdHJ1Y3RvcihkaXJuYW1lOiBhbnksIGJhc2VEaXI6IGFueSkge1xuICAgIHRoaXNbTkFNRV0gPSBkaXJuYW1lLnRvU3RyaW5nKCk7XG4gICAgdGhpc1tQQVRIXSA9IGJhc2VEaXIucmVzb2x2ZShkaXJuYW1lKTtcbiAgfVxuXG4gIHB1YmxpYyBzdGF0aWMgY3JlYXRlKGRpcm5hbWU6IGFueSwgYmFzZURpcjogYW55KSB7XG4gICAgcmV0dXJuIE9iamVjdC5zZWFsKG5ldyBJbmNsdWRlRGlyZWN0b3J5KGRpcm5hbWUsIGJhc2VEaXIpKTtcbiAgfVxuXG4gIGdldCBOQU1FKCkge1xuICAgIHJldHVybiB0aGlzW05BTUVdO1xuICB9XG5cbiAgZ2V0IFBBVEgoKSB7XG4gICAgcmV0dXJuIHRoaXNbUEFUSF07XG4gIH1cblxuICB0b1N0cmluZygpIHtcbiAgICByZXR1cm4gdGhpc1tQQVRIXS50b1N0cmluZygpO1xuICB9XG5cbiAgdG9KU09OKCk6IG9iamVjdCB7XG4gICAgcmV0dXJuIHtcbiAgICAgIE5BTUU6IHRoaXMuTkFNRSxcbiAgICAgIFBBVEg6IHRoaXMuUEFUSCxcbiAgICB9XG4gIH1cbn07XG4iLCIvKlxuICogTUlUIExpY2Vuc2VcbiAqXG4gKiBDb3B5cmlnaHQgKGMpIDIwMjUgIFl1cmlpIFlha3ViaW4gKHl1cmlpLnlha3ViaW5AZ21haWwuY29tKVxuICpcbiAqIFBlcm1pc3Npb24gaXMgZ3JhbnRlZCB0byB1c2UsIGNvcHksIG1vZGlmeSwgYW5kIGRpc3RyaWJ1dGUgdGhpcyBzb2Z0d2FyZVxuICogdW5kZXIgdGhlIE1JVCBMaWNlbnNlLiBTZWUgTElDRU5TRSBmaWxlIGZvciBkZXRhaWxzLlxuICovXG5cbmltcG9ydCB7IEludGVyZmFjZVRhcmdldCB9IGZyb20gXCJAL2NvcmUvSW50ZXJmYWNlVGFyZ2V0XCI7XG5pbXBvcnQgeyBBYnNvbHV0ZVBhdGggfSBmcm9tIFwiQC9jb3JlL1BhdGhcIjtcblxuY29uc3QgVkFMVUUgICAgICAgPSBTeW1ib2woXCJWQUxVRVwiKTtcbmNvbnN0IERFU1RJTkFUSU9OID0gU3ltYm9sKFwiREVTVElOQVRJT05cIik7XG5jb25zdCBCQVNFX0RJUiAgICA9IFN5bWJvbChcIkJBU0VfRElSXCIpO1xuXG5leHBvcnQgY2xhc3MgSW5zdGFsbEVudGl0eSB7XG4gIHByaXZhdGUgW1ZBTFVFXTogQWJzb2x1dGVQYXRoIHwgSW50ZXJmYWNlVGFyZ2V0O1xuICBwcml2YXRlIFtERVNUSU5BVElPTl06IEFic29sdXRlUGF0aDtcbiAgcHJpdmF0ZSBbQkFTRV9ESVJdOiBBYnNvbHV0ZVBhdGggfCBudWxsO1xuXG4gIHByaXZhdGUgY29uc3RydWN0b3Ioc2NvcGU6IGFueSwgdmFsdWU6IHN0cmluZyB8IEFic29sdXRlUGF0aCB8IEludGVyZmFjZVRhcmdldCwgcGFyYW1zOiBzdHJpbmcgfCBhbnkpIHtcbiAgICBsZXQgZGVzdGluYXRpb246IHN0cmluZ3xBYnNvbHV0ZVBhdGh8dW5kZWZpbmVkO1xuICAgIGxldCBiYXNlRGlyO1xuICAgIGlmICh0eXBlb2YgcGFyYW1zID09PSBcInN0cmluZ1wiKVxuICAgICAgZGVzdGluYXRpb24gPSBwYXJhbXM7XG4gICAgZWxzZSBpZiAocGFyYW1zKSB7XG4gICAgICBkZXN0aW5hdGlvbiA9IHBhcmFtcy5kZXN0aW5hdGlvbjtcbiAgICAgIGJhc2VEaXIgPSBwYXJhbXMuYmFzZURpcjtcbiAgICB9XG4gIFxuICAgIGlmICghZGVzdGluYXRpb24pXG4gICAgICB0aHJvdyBuZXcgRXJyb3IoYFBhcmFtZXRlciBkZXN0aW5hdGlvbiBpcyBub3Qgc3BlY2lmaWVkYCk7XG4gIFxuICAgIGlmIChiYXNlRGlyKVxuICAgICAgYmFzZURpciA9IHNjb3BlLlNPVVJDRV9ESVIucmVzb2x2ZShiYXNlRGlyKTtcbiAgXG4gICAgaWYgKHR5cGVvZiB2YWx1ZSA9PT0gXCJzdHJpbmdcIiB8fCB2YWx1ZSBpbnN0YW5jZW9mIEFic29sdXRlUGF0aCkge1xuICAgICAgdmFsdWUgPSBzY29wZS5TT1VSQ0VfRElSLnJlc29sdmUodmFsdWUudG9TdHJpbmcoKSkgYXMgQWJzb2x1dGVQYXRoO1xuICAgICAgdmFsdWUgPSBBYnNvbHV0ZVBhdGguY3JlYXRlRmlsZSh2YWx1ZSk7XG4gICAgICBiYXNlRGlyID0gYmFzZURpciB8fCB2YWx1ZS5kaXJuYW1lKCk7XG4gICAgfVxuICAgIGVsc2UgaWYgKCEodmFsdWUgaW5zdGFuY2VvZiBJbnRlcmZhY2VUYXJnZXQpKSB7XG4gICAgICB0aHJvdyBuZXcgRXJyb3IoYE5vdCBzdXBwb3J0ZXQgdmFsdWUgb2YgJHt2YWx1ZX1gKTtcbiAgICB9XG4gIFxuICAgIHRoaXNbVkFMVUVdID0gdmFsdWU7XG4gICAgdGhpc1tERVNUSU5BVElPTl0gPSBBYnNvbHV0ZVBhdGguY3JlYXRlRGlyKHNjb3BlLklOU1RBTExfUFJFRklYLnJlc29sdmUoZGVzdGluYXRpb24udG9TdHJpbmcoKSkudG9TdHJpbmcoKSk7XG4gICAgdGhpc1tCQVNFX0RJUl0gPSBiYXNlRGlyID8gQWJzb2x1dGVQYXRoLmNyZWF0ZURpcihiYXNlRGlyLnRvU3RyaW5nKCkpIDogbnVsbDtcbiAgfVxuICBcbiAgcHVibGljIHN0YXRpYyBjcmVhdGUoc2NvcGU6IGFueSwgdmFsdWU6IHN0cmluZyB8IEFic29sdXRlUGF0aCB8IEludGVyZmFjZVRhcmdldCwgcGFyYW1zOiBzdHJpbmcgfCBhbnkpIHtcbiAgICByZXR1cm4gT2JqZWN0LnNlYWwobmV3IEluc3RhbGxFbnRpdHkoc2NvcGUsIHZhbHVlLCBwYXJhbXMpKTtcbiAgfVxuXG4gIHB1YmxpYyBnZXQgVkFMVUUgKCkge1xuICAgIHJldHVybiB0aGlzW1ZBTFVFXTtcbiAgfVxuXG4gIHB1YmxpYyBnZXQgREVTVElOQVRJT04gKCkge1xuICAgIHJldHVybiB0aGlzW0RFU1RJTkFUSU9OXTtcbiAgfVxuXG4gIHB1YmxpYyBnZXQgQkFTRV9ESVIgKCkge1xuICAgIHJldHVybiB0aGlzW0JBU0VfRElSXTtcbiAgfVxuXG4gIHB1YmxpYyB0b0pTT04oKTogb2JqZWN0IHtcbiAgICByZXR1cm4ge1xuICAgICAgVkFMVUU6IHRoaXMuVkFMVUUsXG4gICAgICBERVNUSU5BVElPTjogdGhpcy5ERVNUSU5BVElPTixcbiAgICAgIEJBU0VfRElSOiB0aGlzLkJBU0VfRElSLFxuICAgIH07XG4gIH1cbn07XG4iLCIvKlxuICogTUlUIExpY2Vuc2VcbiAqXG4gKiBDb3B5cmlnaHQgKGMpIDIwMjUgIFl1cmlpIFlha3ViaW4gKHl1cmlpLnlha3ViaW5AZ21haWwuY29tKVxuICpcbiAqIFBlcm1pc3Npb24gaXMgZ3JhbnRlZCB0byB1c2UsIGNvcHksIG1vZGlmeSwgYW5kIGRpc3RyaWJ1dGUgdGhpcyBzb2Z0d2FyZVxuICogdW5kZXIgdGhlIE1JVCBMaWNlbnNlLiBTZWUgTElDRU5TRSBmaWxlIGZvciBkZXRhaWxzLlxuICovXG5cbmNvbnN0IE5BTUUgPSBTeW1ib2woXCJOQU1FXCIpO1xuXG5leHBvcnQgY2xhc3MgSW50ZXJmYWNlSW5jbHVkZXMge1xuICBwcml2YXRlIFtOQU1FXTogc3RyaW5nO1xuXG4gIHByaXZhdGUgY29uc3RydWN0b3IobmFtZTogc3RyaW5nKSB7XG4gICAgdGhpc1tOQU1FXSA9IG5hbWU7XG4gIH1cblxuICBwdWJsaWMgZ2V0IHRhcmdldE5hbWUoKSB7XG4gICAgcmV0dXJuIHRoaXNbTkFNRV07XG4gIH1cblxuICBwdWJsaWMgdG9TdHJpbmcoKTogc3RyaW5nIHtcbiAgICByZXR1cm4gXCIke1wiICsgdGhpc1tOQU1FXSArIFwiLmluY2x1ZGVzfVwiO1xuICB9XG5cbiAgcHVibGljIHRvSlNPTigpIHtcbiAgICByZXR1cm4gdGhpcy50b1N0cmluZygpO1xuICB9XG5cbiAgcHVibGljIHN0YXRpYyBjcmVhdGUobmFtZTogc3RyaW5nKSB7XG4gICAgcmV0dXJuIE9iamVjdC5zZWFsKG5ldyBJbnRlcmZhY2VJbmNsdWRlcyhuYW1lKSk7XG4gIH1cblxuICBwdWJsaWMgc3RhdGljIGVuc3VyZUluc3RhbmNlKHZhbHVlOiBhbnkpIHtcbiAgICBpZiAodmFsdWUgaW5zdGFuY2VvZiBJbnRlcmZhY2VJbmNsdWRlcylcbiAgICAgIHJldHVybiB2YWx1ZTtcbiAgICB0aHJvdyBuZXcgRXJyb3IoYFRoZSAnJHt2YWx1ZX0nIGlzIG5vdCBhIEludGVyZmFjZUluY2x1ZGVzYCk7XG4gIH1cbn07XG4iLCIvKlxuICogTUlUIExpY2Vuc2VcbiAqXG4gKiBDb3B5cmlnaHQgKGMpIDIwMjUgIFl1cmlpIFlha3ViaW4gKHl1cmlpLnlha3ViaW5AZ21haWwuY29tKVxuICpcbiAqIFBlcm1pc3Npb24gaXMgZ3JhbnRlZCB0byB1c2UsIGNvcHksIG1vZGlmeSwgYW5kIGRpc3RyaWJ1dGUgdGhpcyBzb2Z0d2FyZVxuICogdW5kZXIgdGhlIE1JVCBMaWNlbnNlLiBTZWUgTElDRU5TRSBmaWxlIGZvciBkZXRhaWxzLlxuICovXG5cbmNvbnN0IE5BTUUgPSBTeW1ib2woXCJOQU1FXCIpO1xuXG5leHBvcnQgY2xhc3MgSW50ZXJmYWNlT2JqZWN0cyB7XG4gIHByaXZhdGUgW05BTUVdOiBzdHJpbmc7XG5cbiAgcHJpdmF0ZSBjb25zdHJ1Y3RvcihuYW1lOiBzdHJpbmcpIHtcbiAgICB0aGlzW05BTUVdID0gbmFtZTtcbiAgfVxuXG4gIHB1YmxpYyBzdGF0aWMgY3JlYXRlKG5hbWU6IHN0cmluZykge1xuICAgIHJldHVybiBPYmplY3Quc2VhbChuZXcgSW50ZXJmYWNlT2JqZWN0cyhuYW1lKSk7XG4gIH1cblxuICBwdWJsaWMgc3RhdGljIGVuc3VyZUluc3RhbmNlKHZhbHVlOiBhbnkpOiBJbnRlcmZhY2VPYmplY3RzIHtcbiAgICBpZiAodmFsdWUgaW5zdGFuY2VvZiBJbnRlcmZhY2VPYmplY3RzKVxuICAgICAgcmV0dXJuIHZhbHVlO1xuICAgIHRocm93IG5ldyBFcnJvcihgVGhlICcke3ZhbHVlfScgaXMgbm90IGEgSW50ZXJmYWNlT2JqZWN0c2ApO1xuICB9XG5cbiAgcHVibGljIGdldCB0YXJnZXROYW1lKCk6IHN0cmluZyB7XG4gICAgcmV0dXJuIHRoaXNbTkFNRV07XG4gIH1cblxuICBwdWJsaWMgdG9TdHJpbmcoKTogc3RyaW5nIHtcbiAgICByZXR1cm4gXCIke1wiICsgdGhpc1tOQU1FXSArIFwiLm9iamVjdHN9XCI7XG4gIH1cblxuICBwdWJsaWMgdG9KU09OKCk6IHN0cmluZyB7XG4gICAgcmV0dXJuIHRoaXMudG9TdHJpbmcoKTtcbiAgfVxufTtcbiIsIi8qXG4gKiBNSVQgTGljZW5zZVxuICpcbiAqIENvcHlyaWdodCAoYykgMjAyNSAgWXVyaWkgWWFrdWJpbiAoeXVyaWkueWFrdWJpbkBnbWFpbC5jb20pXG4gKlxuICogUGVybWlzc2lvbiBpcyBncmFudGVkIHRvIHVzZSwgY29weSwgbW9kaWZ5LCBhbmQgZGlzdHJpYnV0ZSB0aGlzIHNvZnR3YXJlXG4gKiB1bmRlciB0aGUgTUlUIExpY2Vuc2UuIFNlZSBMSUNFTlNFIGZpbGUgZm9yIGRldGFpbHMuXG4gKi9cblxuY29uc3QgTkFNRSAgICAgICA9IFN5bWJvbChcIk5BTUVcIik7XG5jb25zdCBQUk9QRVJUSUVTID0gU3ltYm9sKFwiUFJPUEVSVElFU1wiKTtcblxuZXhwb3J0IGNsYXNzIEludGVyZmFjZVNjcmlwdCB7XG4gIHByaXZhdGUgW05BTUVdOiBzdHJpbmc7XG4gIHByaXZhdGUgW1BST1BFUlRJRVNdOiBhbnk7XG5cbiAgcHJpdmF0ZSBjb25zdHJ1Y3RvcihuYW1lOiBzdHJpbmcpIHtcbiAgICB0aGlzW05BTUVdID0gbmFtZTtcbiAgICB0aGlzW1BST1BFUlRJRVNdID0ge307XG4gIH1cblxuICBwdWJsaWMgZ2V0IE5BTUUoKSB7XG4gICAgcmV0dXJuIHRoaXNbTkFNRV07XG4gIH1cblxuICBwdWJsaWMgZ2V0IFBST1BFUlRJRVMoKSB7XG4gICAgcmV0dXJuIHRoaXNbUFJPUEVSVElFU107XG4gIH1cbiAgXG4gIHB1YmxpYyBhZGRQcm9wZXJ0eShrZXk6IHN0cmluZywgLi4udmFsczogYW55W10pIHtcbiAgICBsZXQgcHJvcGVydHkgPSB0aGlzW1BST1BFUlRJRVNdW2tleV07XG4gICAgaWYgKCFwcm9wZXJ0eSkge1xuICAgICAgcHJvcGVydHkgPSBbXTtcbiAgICAgIHRoaXNbUFJPUEVSVElFU11ba2V5XSA9IHByb3BlcnR5O1xuICAgIH1cbiAgICB2YWxzLmZvckVhY2godiA9PiBwcm9wZXJ0eS5wdXNoKHYpKTtcbiAgfVxuXG4gIHB1YmxpYyB0b0pTT04oKTogb2JqZWN0IHtcbiAgICByZXR1cm4ge1xuICAgICAgTkFNRTogdGhpcy5OQU1FLFxuICAgICAgUFJPUEVSVElFUzogdGhpcy5QUk9QRVJUSUVTLFxuICAgIH07XG4gIH1cbiAgXG4gIHB1YmxpYyB0b1N0cmluZygpOiBzdHJpbmcge1xuICAgIHJldHVybiB0aGlzW05BTUVdO1xuICB9XG5cbiAgcHVibGljIHN0YXRpYyBjcmVhdGUobmFtZTogc3RyaW5nKSB7XG4gICAgcmV0dXJuIE9iamVjdC5zZWFsKG5ldyBJbnRlcmZhY2VTY3JpcHQobmFtZSkpO1xuICB9XG5cbiAgcHVibGljIHN0YXRpYyBlbnN1cmVJbnN0YW5jZSh2YWx1ZTogYW55KSB7XG4gICAgaWYgKHZhbHVlIGluc3RhbmNlb2YgSW50ZXJmYWNlU2NyaXB0KVxuICAgICAgcmV0dXJuIHZhbHVlO1xuICAgIHRocm93IG5ldyBFcnJvcihgVGhlICcke3ZhbHVlfScgaXMgbm90IGEgSW50ZXJmYWNlU2NyaXB0YCk7XG4gIH1cbn07XG4iLCIvKlxuICogTUlUIExpY2Vuc2VcbiAqXG4gKiBDb3B5cmlnaHQgKGMpIDIwMjUgIFl1cmlpIFlha3ViaW4gKHl1cmlpLnlha3ViaW5AZ21haWwuY29tKVxuICpcbiAqIFBlcm1pc3Npb24gaXMgZ3JhbnRlZCB0byB1c2UsIGNvcHksIG1vZGlmeSwgYW5kIGRpc3RyaWJ1dGUgdGhpcyBzb2Z0d2FyZVxuICogdW5kZXIgdGhlIE1JVCBMaWNlbnNlLiBTZWUgTElDRU5TRSBmaWxlIGZvciBkZXRhaWxzLlxuICovXG5cbmltcG9ydCB7IEFic29sdXRlUGF0aCB9IGZyb20gXCJAL2NvcmUvUGF0aFwiO1xuaW1wb3J0IHsgSW50ZXJmYWNlSW5jbHVkZXMgfSBmcm9tIFwiQC9jb3JlL0ludGVyZmFjZUluY2x1ZGVzXCI7XG5pbXBvcnQgeyBJbnRlcmZhY2VPYmplY3RzIH0gZnJvbSBcIkAvY29yZS9JbnRlcmZhY2VPYmplY3RzXCI7XG5pbXBvcnQgeyBJbmNsdWRlRGlyZWN0b3J5IH0gZnJvbSBcIkAvY29yZS9JbmNsdWRlRGlyZWN0b3J5XCI7XG5pbXBvcnQgeyBTb3VyY2VGaWxlIH0gZnJvbSBcIkAvY29yZS9Tb3VyY2VGaWxlXCI7XG5cbmNvbnN0IFVOS05PV05fVEFSR0VUID0gU3ltYm9sKFwiVU5LTk9XTl9UQVJHRVRcIik7XG5jb25zdCBTQ09QRSA9IFN5bWJvbChcIlNDT1BFXCIpO1xuXG5leHBvcnQgY2xhc3MgSW50ZXJmYWNlVGFyZ2V0IHtcbiAgcHJpdmF0ZSBbU0NPUEVdOiBhbnk7XG4gIHByaXZhdGUgW1VOS05PV05fVEFSR0VUXTogYW55O1xuXG4gIHByaXZhdGUgY29uc3RydWN0b3Ioc2NvcGU6IGFueSwgdXRhcmdldDogYW55KSB7XG4gICAgdGhpc1tTQ09QRV0gPSBzY29wZS5jbG9uZSgpO1xuICAgIHRoaXNbVU5LTk9XTl9UQVJHRVRdID0gdXRhcmdldDtcbiAgfVxuXG4gIHB1YmxpYyBzdGF0aWMgY3JlYXRlKHNjb3BlOiBhbnksIHV0YXJnZXQ6IGFueSkge1xuICAgIHJldHVybiBPYmplY3Quc2VhbChuZXcgSW50ZXJmYWNlVGFyZ2V0KHNjb3BlLCB1dGFyZ2V0KSk7XG4gIH1cblxuICBwdWJsaWMgc3RhdGljIGVuc3VyZUluc3RhbmNlKHZhbHVlOiBhbnkpIHtcbiAgICBpZiAodmFsdWUgaW5zdGFuY2VvZiBJbnRlcmZhY2VUYXJnZXQpXG4gICAgICByZXR1cm4gdmFsdWU7XG4gICAgdGhyb3cgbmV3IEVycm9yKGBUaGUgJyR7dmFsdWV9JyBpcyBub3QgYSBJbnRlcmZhY2VUYXJnZXRgKTtcbiAgfVxuXG4gIHB1YmxpYyBnZXQgdGFyZ2V0TmFtZSgpOiBzdHJpbmcge1xuICAgIHJldHVybiB0aGlzW1VOS05PV05fVEFSR0VUXS5OQU1FO1xuICB9XG5cbiAgcHVibGljIGdldCBpbmNsdWRlcygpOiBJbnRlcmZhY2VJbmNsdWRlcyB7XG4gICAgcmV0dXJuIEludGVyZmFjZUluY2x1ZGVzLmNyZWF0ZSh0aGlzLnRhcmdldE5hbWUpO1xuICB9XG5cbiAgcHVibGljIGdldCBvYmplY3RzKCk6IEludGVyZmFjZU9iamVjdHMge1xuICAgIHJldHVybiBJbnRlcmZhY2VPYmplY3RzLmNyZWF0ZSh0aGlzLnRhcmdldE5hbWUpO1xuICB9XG5cbiAgcHVibGljIHRvSlNPTigpOiBzdHJpbmcge1xuICAgIHJldHVybiB0aGlzLnRvU3RyaW5nKCk7XG4gIH1cblxuICBwdWJsaWMgdG9TdHJpbmcoKTogc3RyaW5nIHtcbiAgICByZXR1cm4gXCIke1wiICsgdGhpcy50YXJnZXROYW1lICsgXCJ9XCI7XG4gIH1cblxuICBwdWJsaWMgYWRkU291cmNlcyguLi5zb3VyY2VzOiBBcnJheTxJbnRlcmZhY2VPYmplY3RzfFNvdXJjZUZpbGV8QWJzb2x1dGVQYXRofHN0cmluZz4pOiB2b2lkIHtcbiAgICBmb3IgKGxldCBpdCBvZiBzb3VyY2VzLmZsYXQoMSkpIHtcbiAgICAgIGlmIChpdCBpbnN0YW5jZW9mIEludGVyZmFjZU9iamVjdHMgfHwgaXQgaW5zdGFuY2VvZiBTb3VyY2VGaWxlKVxuICAgICAgICB7fVxuICAgICAgZWxzZSBpZiAodHlwZW9mIGl0ID09PSBcInN0cmluZ1wiIHx8IEFic29sdXRlUGF0aC5pc0Fic29sdXRlKGl0KSlcbiAgICAgICAgaXQgPSBTb3VyY2VGaWxlLmNyZWF0ZSh0aGlzW1NDT1BFXSwgaXQpO1xuICAgICAgZWxzZVxuICAgICAgICB0aHJvdyBuZXcgRXJyb3IoYE5vdCBzdXBwb3J0IGluc3RhbmNlICR7aXR9YCk7XG4gICAgICB0aGlzW1VOS05PV05fVEFSR0VUXS5TT1VSQ0VTLnB1c2goaXQpO1xuICAgIH1cbiAgfVxuXG4gIHB1YmxpYyBhZGRJbmNsdWRlcyguLi5pbmNsdWRlczogQXJyYXk8SW50ZXJmYWNlSW5jbHVkZXN8QWJzb2x1dGVQYXRofHN0cmluZz4pOiB2b2lkIHtcbiAgICBmb3IgKGNvbnN0IGl0IG9mIGluY2x1ZGVzLmZsYXQoMSkpIHtcbiAgICAgIGxldCBWQUxVRTtcbiAgICAgIGlmIChpdCBpbnN0YW5jZW9mIEludGVyZmFjZUluY2x1ZGVzKVxuICAgICAgICBWQUxVRSA9IGl0O1xuICAgICAgZWxzZSBpZiAodHlwZW9mIGl0ID09PSBcInN0cmluZ1wiIHx8IEFic29sdXRlUGF0aC5pc0Fic29sdXRlKGl0KSlcbiAgICAgICAgVkFMVUUgPSBJbmNsdWRlRGlyZWN0b3J5LmNyZWF0ZShpdCwgdGhpc1tTQ09QRV0uU09VUkNFX0RJUik7XG4gICAgICBlbHNlXG4gICAgICAgIHRocm93IG5ldyBFcnJvcihgTm90IHN1cHBvcnQgaW5zdGFuY2UgJHtpdH1gKTtcbiAgICAgIHRoaXNbVU5LTk9XTl9UQVJHRVRdLklOQ0xVREVTLnB1c2goeyBWQUxVRSwgUFVCTElDX09OTFk6IGZhbHNlIH0pO1xuICAgIH1cbiAgfVxuXG4gIHB1YmxpYyBhZGRQdWJsaWNJbmNsdWRlcyguLi5pbmNsdWRlczogQXJyYXk8SW50ZXJmYWNlSW5jbHVkZXN8QWJzb2x1dGVQYXRofHN0cmluZz4pOiB2b2lkIHtcbiAgICBmb3IgKGNvbnN0IGl0IG9mIGluY2x1ZGVzLmZsYXQoMSkpIHtcbiAgICAgIGxldCBWQUxVRTtcbiAgICAgIGlmIChpdCBpbnN0YW5jZW9mIEludGVyZmFjZUluY2x1ZGVzKVxuICAgICAgICBWQUxVRSA9IGl0O1xuICAgICAgZWxzZSBpZiAodHlwZW9mIGl0ID09PSBcInN0cmluZ1wiIHx8IEFic29sdXRlUGF0aC5pc0Fic29sdXRlKGl0KSlcbiAgICAgICAgVkFMVUUgPSBJbmNsdWRlRGlyZWN0b3J5LmNyZWF0ZShpdCwgdGhpc1tTQ09QRV0uU09VUkNFX0RJUik7XG4gICAgICBlbHNlXG4gICAgICAgIHRocm93IG5ldyBFcnJvcihgTm90IHN1cHBvcnQgaW5zdGFuY2UgJHtpdH1gKTtcbiAgICAgIHRoaXNbVU5LTk9XTl9UQVJHRVRdLklOQ0xVREVTLnB1c2goeyBWQUxVRSwgUFVCTElDX09OTFk6IHRydWUgfSk7XG4gICAgfVxuICB9XG5cbiAgcHVibGljIGFkZERlZmluaXRpb25zKC4uLmRlZmluaXRpb25zOiBzdHJpbmdbXSk6IHZvaWQge1xuICAgIGZvciAoY29uc3QgVkFMVUUgb2YgZGVmaW5pdGlvbnMuZmxhdCgxKSlcbiAgICAgIHRoaXNbVU5LTk9XTl9UQVJHRVRdLkRFRklORVMucHVzaCh7IFZBTFVFIH0pO1xuICB9XG5cbiAgcHVibGljIGFkZFB1YmxpY0RlZmluaXRpb25zKC4uLmRlZmluaXRpb25zOiBzdHJpbmdbXSk6IHZvaWQge1xuICAgIGZvciAoY29uc3QgVkFMVUUgb2YgZGVmaW5pdGlvbnMuZmxhdCgxKSlcbiAgICAgIHRoaXNbVU5LTk9XTl9UQVJHRVRdLkRFRklORVMucHVzaCh7IFZBTFVFLCBQVUJMSUNfT05MWTogdHJ1ZSB9KTtcbiAgfVxuXG4gIHB1YmxpYyBhZGRDb21waWxlT3B0aW9ucyguLi5vcHRpb25zOiBzdHJpbmdbXSk6IHZvaWQge1xuICAgIGZvciAoY29uc3QgaXQgb2Ygb3B0aW9ucy5mbGF0KDEpKSB7XG4gICAgICB0aGlzW1VOS05PV05fVEFSR0VUXS5DT01QSUxFX09QVElPTlMucHVzaCh7IFZBTFVFOiBpdCB9KTtcbiAgICB9XG4gIH1cblxuICBwdWJsaWMgYWRkTGlua09wdGlvbnMoLi4ub3B0aW9uczogc3RyaW5nW10pOiB2b2lkIHtcbiAgICBmb3IgKGNvbnN0IGl0IG9mIG9wdGlvbnMuZmxhdCgxKSkge1xuICAgICAgdGhpc1tVTktOT1dOX1RBUkdFVF0uTElOS19PUFRJT05TLnB1c2goeyBWQUxVRTogaXQgfSk7XG4gICAgfVxuICB9XG5cbiAgcHVibGljIGFkZFB1YmxpY0NvbXBpbGVPcHRpb25zKC4uLm9wdGlvbnM6IHN0cmluZ1tdKTogdm9pZCB7XG4gICAgZm9yIChjb25zdCBpdCBvZiBvcHRpb25zLmZsYXQoMSkpIHtcbiAgICAgIHRoaXNbVU5LTk9XTl9UQVJHRVRdLkNPTVBJTEVfT1BUSU9OUy5wdXNoKHsgVkFMVUU6IGl0LCBQVUJMSUNfT05MWTogdHJ1ZSB9KTtcbiAgICB9XG4gIH1cblxuICBwdWJsaWMgYWRkUHVibGljTGlua09wdGlvbnMoLi4ub3B0aW9uczogc3RyaW5nW10pOiB2b2lkIHtcbiAgICBmb3IgKGNvbnN0IGl0IG9mIG9wdGlvbnMuZmxhdCgxKSkge1xuICAgICAgdGhpc1tVTktOT1dOX1RBUkdFVF0uTElOS19PUFRJT05TLnB1c2goeyBWQUxVRTogaXQsIFBVQkxJQ19PTkxZOiB0cnVlIH0pO1xuICAgIH1cbiAgfVxufTtcbiIsIi8qXG4gKiBNSVQgTGljZW5zZVxuICpcbiAqIENvcHlyaWdodCAoYykgMjAyNSAgWXVyaWkgWWFrdWJpbiAoeXVyaWkueWFrdWJpbkBnbWFpbC5jb20pXG4gKlxuICogUGVybWlzc2lvbiBpcyBncmFudGVkIHRvIHVzZSwgY29weSwgbW9kaWZ5LCBhbmQgZGlzdHJpYnV0ZSB0aGlzIHNvZnR3YXJlXG4gKiB1bmRlciB0aGUgTUlUIExpY2Vuc2UuIFNlZSBMSUNFTlNFIGZpbGUgZm9yIGRldGFpbHMuXG4gKi9cblxuaW1wb3J0IHBhdGggZnJvbSBcIm5vZGU6cGF0aFwiO1xuaW1wb3J0IHVybCBmcm9tIFwibm9kZTp1cmxcIjtcblxuY29uc3QgUEFUSCA9IFN5bWJvbChcIlBBVEhcIik7XG5cbmVudW0gUGF0aFR5cGUge1xuICBEaXJUeXBlLFxuICBGaWxlVHlwZSxcbn07XG5cbmNvbnN0IF9wYXRoTWFwID0gbmV3IE1hcDxzdHJpbmcsIFBhdGhUeXBlPigpO1xuXG5leHBvcnQgY2xhc3MgQWJzb2x1dGVQYXRoIHtcbiAgcHJpdmF0ZSBbUEFUSF06IHN0cmluZztcblxuICBwcml2YXRlIGNvbnN0cnVjdG9yKGZpbGVwYXRoOiBzdHJpbmcpIHtcbiAgICBpZiAoIXBhdGguaXNBYnNvbHV0ZShmaWxlcGF0aCkpXG4gICAgICB0aHJvdyBuZXcgRXJyb3IoYE5vdCBzdXBwb3J0ZWQgcmVsYXRpdmUgcGF0aCBvZiBcIiR7ZmlsZXBhdGh9XCJgKTtcbiAgICB0aGlzW1BBVEhdID0gZmlsZXBhdGg7XG4gIH1cblxuICBwdWJsaWMgam9pbiguLi5wYXRoczogQXJyYXk8QWJzb2x1dGVQYXRoIHwgc3RyaW5nPikge1xuICAgIGNvbnN0IGZpbGVwYXRoID0gcGF0aC5wb3NpeC5qb2luKHRoaXNbUEFUSF0sIC4uLnBhdGhzLm1hcChpID0+IGkudG9TdHJpbmcoKSkpO1xuICAgIHJldHVybiBBYnNvbHV0ZVBhdGguY3JlYXRlKGZpbGVwYXRoKTtcbiAgfVxuXG4gIHB1YmxpYyBkaXJuYW1lKCkge1xuICAgIHJldHVybiBBYnNvbHV0ZVBhdGguY3JlYXRlKHBhdGgucG9zaXguZGlybmFtZSh0aGlzW1BBVEhdKSk7XG4gIH1cblxuICBwdWJsaWMgYmFzZW5hbWUoKSB7XG4gICAgcmV0dXJuIHBhdGguYmFzZW5hbWUodGhpc1tQQVRIXSk7XG4gIH1cblxuICBwdWJsaWMgcmVsYXRpdmUodG86IEFic29sdXRlUGF0aCB8IHN0cmluZykge1xuICAgIHJldHVybiBwYXRoLnBvc2l4LnJlbGF0aXZlKHRoaXNbUEFUSF0sKHRvIGluc3RhbmNlb2YgQWJzb2x1dGVQYXRoKSA/IHRvW1BBVEhdIDogdG8pO1xuICB9XG5cbiAgcHVibGljIHJlc29sdmUoLi4ucGF0aHM6IEFycmF5PEFic29sdXRlUGF0aCB8IHN0cmluZz4pIHtcbiAgICByZXR1cm4gQWJzb2x1dGVQYXRoLmNyZWF0ZShwYXRoLnBvc2l4LnJlc29sdmUodGhpc1tQQVRIXSwgLi4ucGF0aHMubWFwKGkgPT4gaS50b1N0cmluZygpKSkpO1xuICB9XG5cbiAgcHVibGljIG1hdGNoKHJlZ2V4cDogUmVnRXhwKSB7XG4gICAgcmV0dXJuIHRoaXNbUEFUSF0ubWF0Y2gocmVnZXhwKTtcbiAgfVxuXG4gIHB1YmxpYyB0b1VSTCgpIHtcbiAgICByZXR1cm4gdXJsLnBhdGhUb0ZpbGVVUkwodGhpc1tQQVRIXSk7XG4gIH1cblxuICBwdWJsaWMgdG9VUkxTdHJpbmcoKSB7XG4gICAgcmV0dXJuIHRoaXMudG9VUkwoKS50b1N0cmluZygpO1xuICB9XG5cbiAgcHVibGljIHRvU3RyaW5nKCkge1xuICAgIHJldHVybiB0aGlzW1BBVEhdO1xuICB9XG5cbiAgcHVibGljIHZhbHVlT2YoKSB7XG4gICAgcmV0dXJuIHRoaXNbUEFUSF07XG4gIH1cblxuICBwdWJsaWMgdG9KU09OKCkge1xuICAgIHJldHVybiB0aGlzW1BBVEhdO1xuICB9XG5cbiAgcHVibGljIHN0YXRpYyBpc0Fic29sdXRlKGZpbGVwYXRoOiBBYnNvbHV0ZVBhdGggfCBzdHJpbmcpIHtcbiAgICBpZiAoZmlsZXBhdGggaW5zdGFuY2VvZiBBYnNvbHV0ZVBhdGgpXG4gICAgICByZXR1cm4gdHJ1ZTtcbiAgICByZXR1cm4gcGF0aC5pc0Fic29sdXRlKGZpbGVwYXRoKTtcbiAgfVxuXG4gIHB1YmxpYyBzdGF0aWMgY3JlYXRlKGZpbGVwYXRoOiBBYnNvbHV0ZVBhdGggfCBzdHJpbmcpIHtcbiAgICBpZiAoZmlsZXBhdGggaW5zdGFuY2VvZiBBYnNvbHV0ZVBhdGgpXG4gICAgICByZXR1cm4gZmlsZXBhdGg7XG4gICAgaWYgKHR5cGVvZiBmaWxlcGF0aCAhPT0gXCJzdHJpbmdcIilcbiAgICAgIHRocm93IG5ldyBFcnJvcihgTm90IGNvcnJlY3QgdHlwZSBvZiAke2ZpbGVwYXRofWApO1xuICAgIHJldHVybiBuZXcgQWJzb2x1dGVQYXRoKGZpbGVwYXRoKTtcbiAgfVxuXG4gIHB1YmxpYyBzdGF0aWMgZW5zdXJlSW5zdGFuY2UodmFsdWU6IGFueSk6IEFic29sdXRlUGF0aCB7XG4gICAgaWYgKHZhbHVlIGluc3RhbmNlb2YgQWJzb2x1dGVQYXRoKVxuICAgICAgcmV0dXJuIHZhbHVlO1xuICAgIHRocm93IG5ldyBFcnJvcihgVGhlICcke3ZhbHVlfScgaXMgbm90IGEgQWJzb2x1dGVQYXRoYCk7XG4gIH1cblxuICBwdWJsaWMgc3RhdGljIGNyZWF0ZURpcihmaWxlcGF0aDogQWJzb2x1dGVQYXRoIHwgc3RyaW5nKSB7XG4gICAgY29uc3Qga2V5ID0gZmlsZXBhdGgudG9TdHJpbmcoKTtcbiAgICBjb25zdCB0eXBlID0gX3BhdGhNYXAuZ2V0KGtleSk7XG4gICAgaWYgKHR5cGUgPT09IHVuZGVmaW5lZClcbiAgICAgIF9wYXRoTWFwLnNldChrZXksIFBhdGhUeXBlLkRpclR5cGUpO1xuICAgIGVsc2UgaWYgKHR5cGUgIT09IFBhdGhUeXBlLkRpclR5cGUpXG4gICAgICB0aHJvdyBuZXcgRXJyb3IoYFRoZSAnJHtmaWxlcGF0aH0nIGlzIG5vdCBhIERpclBhdGhgKTtcbiAgICByZXR1cm4gQWJzb2x1dGVQYXRoLmNyZWF0ZShmaWxlcGF0aCk7XG4gIH1cblxuICBwdWJsaWMgc3RhdGljIGNyZWF0ZUZpbGUoZmlsZXBhdGg6IEFic29sdXRlUGF0aCB8IHN0cmluZykge1xuICAgIGNvbnN0IGtleSA9IGZpbGVwYXRoLnRvU3RyaW5nKCk7XG4gICAgY29uc3QgdHlwZSA9IF9wYXRoTWFwLmdldChrZXkpO1xuICAgIGlmICh0eXBlID09PSB1bmRlZmluZWQpXG4gICAgICBfcGF0aE1hcC5zZXQoa2V5LCBQYXRoVHlwZS5GaWxlVHlwZSk7XG4gICAgZWxzZSBpZiAodHlwZSAhPT0gUGF0aFR5cGUuRmlsZVR5cGUpXG4gICAgICB0aHJvdyBuZXcgRXJyb3IoYFRoZSAnJHtmaWxlcGF0aH0nIGlzIG5vdCBhIEZpbGVQYXRoYCk7XG4gICAgcmV0dXJuIEFic29sdXRlUGF0aC5jcmVhdGUoZmlsZXBhdGgpO1xuICB9XG59O1xuXG5jbGFzcyBCYXNlUGF0aCB7XG4gIHByaXZhdGUgW1BBVEhdOiBzdHJpbmc7XG5cbiAgcHJvdGVjdGVkIGNvbnN0cnVjdG9yKHBhdGhTdHI6IHN0cmluZykge1xuICAgIGlmICghcGF0aC5pc0Fic29sdXRlKHBhdGhTdHIpKVxuICAgICAgdGhyb3cgbmV3IEVycm9yKGBOb3Qgc3VwcG9ydGVkIHJlbGF0aXZlIHBhdGggb2YgXCIke3BhdGhTdHJ9XCJgKTtcbiAgICB0aGlzW1BBVEhdID0gcGF0aFN0cjtcbiAgfVxuXG4gIHB1YmxpYyBtYXRjaChyZWdleHA6IFJlZ0V4cCkge1xuICAgIHJldHVybiB0aGlzW1BBVEhdLm1hdGNoKHJlZ2V4cCk7XG4gIH1cblxuICBwdWJsaWMgam9pbiguLi5wYXRoczogQXJyYXk8YW55Pikge1xuICAgIHJldHVybiBwYXRoLnBvc2l4LmpvaW4odGhpc1tQQVRIXSwgLi4ucGF0aHMubWFwKGkgPT4gaS50b1N0cmluZygpKSk7XG4gIH1cblxuICBwdWJsaWMgZGlybmFtZSgpIHtcbiAgICByZXR1cm4gcGF0aC5wb3NpeC5kaXJuYW1lKHRoaXNbUEFUSF0pO1xuICB9XG5cbiAgcHVibGljIGJhc2VuYW1lKCkge1xuICAgIHJldHVybiBwYXRoLmJhc2VuYW1lKHRoaXNbUEFUSF0pO1xuICB9XG5cbiAgcHVibGljIHJlbGF0aXZlKHRvOiBhbnkpIHtcbiAgICByZXR1cm4gcGF0aC5wb3NpeC5yZWxhdGl2ZSh0aGlzW1BBVEhdLCB0by50b1N0cmluZygpKTtcbiAgfVxuXG4gIHB1YmxpYyByZXNvbHZlKC4uLnBhdGhzOiBBcnJheTxhbnk+KSB7XG4gICAgcmV0dXJuIHBhdGgucG9zaXgucmVzb2x2ZSh0aGlzW1BBVEhdLCAuLi5wYXRocy5tYXAoaSA9PiBpLnRvU3RyaW5nKCkpKTtcbiAgfVxuICBcbiAgcHVibGljIHRvVVJMKCkge1xuICAgIHJldHVybiB1cmwucGF0aFRvRmlsZVVSTCh0aGlzW1BBVEhdKTtcbiAgfVxuICBcbiAgcHVibGljIGdldCBQQVRIKCk6IHN0cmluZyB7XG4gICAgcmV0dXJuIHRoaXNbUEFUSF07XG4gIH1cblxuICBwdWJsaWMgdG9TdHJpbmcoKSB7XG4gICAgcmV0dXJuIHRoaXNbUEFUSF07XG4gIH1cblxuICBwdWJsaWMgdG9KU09OKCkge1xuICAgIHJldHVybiB0aGlzW1BBVEhdO1xuICB9XG59O1xuXG5jb25zdCBfcGF0aHMgPSBuZXcgTWFwPHN0cmluZywgQmFzZVBhdGg+KCk7XG5cbmV4cG9ydCBjbGFzcyBGaWxlUGF0aCBleHRlbmRzIEJhc2VQYXRoIHtcbiAgcHJpdmF0ZSBjb25zdHJ1Y3RvcihwYXRoU3RyOiBzdHJpbmcpIHtcbiAgICBzdXBlcihwYXRoU3RyKTtcbiAgfVxuXG4gIHB1YmxpYyBzdGF0aWMgZW5zdXJlSW5zdGFuY2UodmFsdWU6IGFueSk6IEZpbGVQYXRoIHtcbiAgICBpZiAodmFsdWUgaW5zdGFuY2VvZiBGaWxlUGF0aClcbiAgICAgIHJldHVybiB2YWx1ZTtcbiAgICB0aHJvdyBuZXcgRXJyb3IoYFRoZSAnJHt2YWx1ZX0nIGlzIG5vdCBhIEZpbGVQYXRoYCk7XG4gIH1cbiAgXG4gIHB1YmxpYyBzdGF0aWMgY3JlYXRlKHBhdGg6IGFueSk6IEZpbGVQYXRoIHtcbiAgICBpZiAocGF0aCBpbnN0YW5jZW9mIEZpbGVQYXRoKVxuICAgICAgcmV0dXJuIHBhdGg7XG5cbiAgICBpZiAodHlwZW9mIHBhdGggIT09IFwic3RyaW5nXCIpXG4gICAgICB0aHJvdyBuZXcgRXJyb3IoYFRoZSAnJHtwYXRofScgaXMgbm90IGEgc3RyaW5nYCk7XG5cbiAgICBsZXQgZmlsZVBhdGggPSBfcGF0aHMuZ2V0KHBhdGgpO1xuICAgIGlmIChmaWxlUGF0aClcbiAgICAgIHJldHVybiBGaWxlUGF0aC5lbnN1cmVJbnN0YW5jZShmaWxlUGF0aCk7XG5cbiAgICBmaWxlUGF0aCA9IE9iamVjdC5zZWFsKG5ldyBGaWxlUGF0aChwYXRoKSk7XG4gICAgX3BhdGhzLnNldChwYXRoLCBmaWxlUGF0aCk7XG5cbiAgICByZXR1cm4gZmlsZVBhdGg7XG4gIH1cbn1cblxuZXhwb3J0IGNsYXNzIERpclBhdGggZXh0ZW5kcyBCYXNlUGF0aCB7XG4gIHByaXZhdGUgY29uc3RydWN0b3IocGF0aFN0cjogc3RyaW5nKSB7XG4gICAgc3VwZXIocGF0aFN0cik7XG4gIH1cblxuICBwdWJsaWMgc3RhdGljIGVuc3VyZUluc3RhbmNlKHZhbHVlOiBhbnkpOiBEaXJQYXRoIHtcbiAgICBpZiAodmFsdWUgaW5zdGFuY2VvZiBEaXJQYXRoKVxuICAgICAgcmV0dXJuIHZhbHVlO1xuICAgIHRocm93IG5ldyBFcnJvcihgVGhlICcke3ZhbHVlfScgaXMgbm90IGEgRGlyUGF0aGApO1xuICB9XG5cbiAgcHVibGljIHN0YXRpYyBjcmVhdGUocGF0aDogYW55KSB7XG4gICAgaWYgKHBhdGggaW5zdGFuY2VvZiBEaXJQYXRoKVxuICAgICAgcmV0dXJuIHBhdGg7XG5cbiAgICBpZiAodHlwZW9mIHBhdGggIT09IFwic3RyaW5nXCIpXG4gICAgICB0aHJvdyBuZXcgRXJyb3IoYFRoZSAnJHtwYXRofScgaXMgbm90IGEgc3RyaW5nYCk7XG5cbiAgICBsZXQgZGlyUGF0aCA9IF9wYXRocy5nZXQocGF0aCk7XG4gICAgaWYgKGRpclBhdGgpXG4gICAgICByZXR1cm4gRGlyUGF0aC5lbnN1cmVJbnN0YW5jZShkaXJQYXRoKTtcblxuICAgIGRpclBhdGggPSBPYmplY3Quc2VhbChuZXcgRGlyUGF0aChwYXRoKSk7XG4gICAgX3BhdGhzLnNldChwYXRoLCBkaXJQYXRoKTtcblxuICAgIHJldHVybiBkaXJQYXRoO1xuICB9XG59O1xuIiwiLypcbiAqIE1JVCBMaWNlbnNlXG4gKlxuICogQ29weXJpZ2h0IChjKSAyMDI1ICBZdXJpaSBZYWt1YmluICh5dXJpaS55YWt1YmluQGdtYWlsLmNvbSlcbiAqXG4gKiBQZXJtaXNzaW9uIGlzIGdyYW50ZWQgdG8gdXNlLCBjb3B5LCBtb2RpZnksIGFuZCBkaXN0cmlidXRlIHRoaXMgc29mdHdhcmVcbiAqIHVuZGVyIHRoZSBNSVQgTGljZW5zZS4gU2VlIExJQ0VOU0UgZmlsZSBmb3IgZGV0YWlscy5cbiAqL1xuXG5pbXBvcnQgeyBBYnNvbHV0ZVBhdGggfSBmcm9tIFwiQC9jb3JlL1BhdGhcIjtcblxuY29uc3QgR0xPQkFMID0gU3ltYm9sKFwiR0xPQkFMXCIpO1xuY29uc3QgU0NPUEUgPSBTeW1ib2woXCJTQ09QRVwiKTtcblxuZXhwb3J0IGNsYXNzIFBsdWdpbkNvbnRleHQge1xuICBwcml2YXRlIFtTQ09QRV06IGFueTtcbiAgcHJpdmF0ZSBbR0xPQkFMXTogYW55O1xuXG4gIHByaXZhdGUgY29uc3RydWN0b3Ioc2NvcGU6IGFueSwgZ2xvYmFsOiBhbnkpIHtcbiAgICB0aGlzW1NDT1BFXSA9IHNjb3BlO1xuICAgIHRoaXNbR0xPQkFMXSA9IGdsb2JhbDtcbiAgfVxuXG4gIHB1YmxpYyBzdGF0aWMgY3JlYXRlKHByb3RvU2NvcGU6IGFueSwgZ2xvYmFsOiBhbnkpIHtcbiAgICBjb25zdCBjdHggPSBPYmplY3QuY3JlYXRlKHByb3RvU2NvcGUpO1xuICAgIGN0eFtTQ09QRV0gPSBwcm90b1Njb3BlO1xuICAgIGN0eFtHTE9CQUxdID0gZ2xvYmFsO1xuXG4gICAgY29uc3QgcHJvdG86IGFueSA9IFBsdWdpbkNvbnRleHQucHJvdG90eXBlO1xuICAgIGNvbnN0IG5hbWVzID0gT2JqZWN0LmdldE93blByb3BlcnR5TmFtZXMocHJvdG8pLmZpbHRlcihuYW1lID0+IHR5cGVvZiBwcm90b1tuYW1lXSA9PT0gJ2Z1bmN0aW9uJyAmJiBuYW1lICE9PSAnY29uc3RydWN0b3InKTtcbiAgICBmb3IgKGNvbnN0IG5hbWUgb2YgbmFtZXMpIHtcbiAgICAgIGN0eFtuYW1lXSA9IHByb3RvW25hbWVdO1xuICAgIH1cblxuICAgIHJldHVybiBPYmplY3Quc2VhbChjdHgpO1xuICB9XG5cbiAgcHVibGljIGFkZFN1YmRpcmVjdG9yeUFsaWFzKHNyYzogQWJzb2x1dGVQYXRoIHwgc3RyaW5nLCBkZXN0OiBBYnNvbHV0ZVBhdGggfCBzdHJpbmcpIHtcbiAgICB0aGlzW0dMT0JBTF0uYWRkU3ViZGlyZWN0b3J5QWxpYXMoQWJzb2x1dGVQYXRoLmNyZWF0ZURpcihzcmMpLCBBYnNvbHV0ZVBhdGguY3JlYXRlRGlyKGRlc3QpKTtcbiAgfVxuXG4gIHB1YmxpYyB0b0pTT04oKTogb2JqZWN0IHtcbiAgICByZXR1cm4ge307XG4gIH1cbn07XG4iLCIvKlxuICogTUlUIExpY2Vuc2VcbiAqXG4gKiBDb3B5cmlnaHQgKGMpIDIwMjUgIFl1cmlpIFlha3ViaW4gKHl1cmlpLnlha3ViaW5AZ21haWwuY29tKVxuICpcbiAqIFBlcm1pc3Npb24gaXMgZ3JhbnRlZCB0byB1c2UsIGNvcHksIG1vZGlmeSwgYW5kIGRpc3RyaWJ1dGUgdGhpcyBzb2Z0d2FyZVxuICogdW5kZXIgdGhlIE1JVCBMaWNlbnNlLiBTZWUgTElDRU5TRSBmaWxlIGZvciBkZXRhaWxzLlxuICovXG5cbmNvbnN0IEVOVFJJRVMgPSBTeW1ib2woXCJFTlRSSUVTXCIpO1xuXG5leHBvcnQgY2xhc3MgU2NyaXB0Q29sbGVjdGlvbiB7XG4gIHByaXZhdGUgW0VOVFJJRVNdOiBhbnk7XG5cbiAgcHJpdmF0ZSBjb25zdHJ1Y3RvcigpIHtcbiAgICB0aGlzW0VOVFJJRVNdID0ge307XG4gIH1cblxuICBwdWJsaWMgc3RhdGljIGNyZWF0ZSgpIHtcbiAgICByZXR1cm4gT2JqZWN0LnNlYWwobmV3IFNjcmlwdENvbGxlY3Rpb24pO1xuICB9XG5cbiAgcHVibGljIGdldCBFTlRSSUVTKCkge1xuICAgIHJldHVybiB0aGlzW0VOVFJJRVNdO1xuICB9XG5cbiAgcHVibGljIGdldChuYW1lOiBzdHJpbmcpIHtcbiAgICByZXR1cm4gdGhpc1tFTlRSSUVTXVtuYW1lXTtcbiAgfVxuXG4gIHB1YmxpYyBzZXQobmFtZTogc3RyaW5nLCB0YXJnZXQ6IGFueSkge1xuICAgIGlmICh0aGlzW0VOVFJJRVNdW25hbWVdKVxuICAgICAgdGhyb3cgbmV3IEVycm9yKGBTY3JpcHQgXCIke25hbWV9XCIgZXhpc3RzYCk7XG4gICAgdGhpc1tFTlRSSUVTXVtuYW1lXSA9IHRhcmdldDtcbiAgfVxuICBcbiAgcHVibGljIHRvSlNPTigpOiBvYmplY3Qge1xuICAgIHJldHVybiB0aGlzW0VOVFJJRVNdO1xuICB9XG59O1xuIiwiLypcbiAqIE1JVCBMaWNlbnNlXG4gKlxuICogQ29weXJpZ2h0IChjKSAyMDI1ICBZdXJpaSBZYWt1YmluICh5dXJpaS55YWt1YmluQGdtYWlsLmNvbSlcbiAqXG4gKiBQZXJtaXNzaW9uIGlzIGdyYW50ZWQgdG8gdXNlLCBjb3B5LCBtb2RpZnksIGFuZCBkaXN0cmlidXRlIHRoaXMgc29mdHdhcmVcbiAqIHVuZGVyIHRoZSBNSVQgTGljZW5zZS4gU2VlIExJQ0VOU0UgZmlsZSBmb3IgZGV0YWlscy5cbiAqL1xuXG5pbXBvcnQgeyBlbnN1cmVCb29sZWFuIH0gZnJvbSBcIkAvdXRpbHMvU3RyaWN0VHlwZVwiO1xuaW1wb3J0IHsgQWJzb2x1dGVQYXRoIH0gZnJvbSBcIkAvY29yZS9QYXRoXCI7XG5cbmNvbnN0IE5BTUUgICAgICAgICAgICAgICAgPSBTeW1ib2woXCJOQU1FXCIpO1xuY29uc3QgTEFOR1VBR0UgICAgICAgICAgICA9IFN5bWJvbChcIkxBTkdVQUdFXCIpO1xuY29uc3QgSEVBREVSX0ZJTEVfT05MWSAgICA9IFN5bWJvbChcIkhFQURFUl9GSUxFX09OTFlcIik7XG5jb25zdCBERUZJTkVTICAgICAgICAgICAgID0gU3ltYm9sKFwiREVGSU5FU1wiKTtcbmNvbnN0IENPTVBJTEVfRkxBR1MgICAgICAgPSBTeW1ib2woXCJDT01QSUxFX0ZMQUdTXCIpO1xuY29uc3QgRklMRSAgICAgICAgICAgICAgICA9IFN5bWJvbChcIkZJTEVcIik7XG5jb25zdCBPQkpFQ1RfRklMRSAgICAgICAgID0gU3ltYm9sKFwiT0JKRUNUX0ZJTEVcIik7XG5cbmNvbnN0IF9sYW5ndWFnZUV4dGVuc2lvbnMgPSB7XG4gIEFTTTogWyBcIi5hc21cIiwgXCIuc1wiIF0sXG4gIEM6ICAgWyBcIi5jXCIgXSxcbiAgQ1hYOiBbXCIuY3BwXCIsIFwiLmNjXCIsIFwiLmN4eFwiIF0sXG59O1xuXG5mdW5jdGlvbiBpc1N1cHBvcnRMYW5ndWFnZShsYW5ndWFnZTogc3RyaW5nKSB7XG4gIHJldHVybiBfbGFuZ3VhZ2VFeHRlbnNpb25zLmhhc093blByb3BlcnR5KGxhbmd1YWdlKTtcbn1cblxuZnVuY3Rpb24gZ2V0RmlsZUxhbmd1YWdlKGZpbGVuYW1lOiBhbnkpIHtcbiAgY29uc3QgZmlsZW5hbWVMb3dlckNhc2UgPSBmaWxlbmFtZS50b1N0cmluZygpLnRvTG93ZXJDYXNlKCk7XG4gIGZvciAoY29uc3QgW2xhbmd1YWdlLCBleHRlbnNpb25zXSBvZiBPYmplY3QuZW50cmllcyhfbGFuZ3VhZ2VFeHRlbnNpb25zKSkge1xuICAgIGZvciAoY29uc3QgaXRlciBvZiBleHRlbnNpb25zKSB7XG4gICAgICBpZiAoZmlsZW5hbWVMb3dlckNhc2UuZW5kc1dpdGgoaXRlcikpXG4gICAgICAgIHJldHVybiBsYW5ndWFnZTtcbiAgICB9XG4gIH1cbiAgcmV0dXJuIFwiXCI7XG59XG5cbmZ1bmN0aW9uIG1ha2VMYW5ndWFnZSh2YWx1ZTogc3RyaW5nKSB7XG4gIGlmIChpc1N1cHBvcnRMYW5ndWFnZSh2YWx1ZSkpXG4gICAgcmV0dXJuIHZhbHVlO1xuICB0aHJvdyBuZXcgRXJyb3IoYExhbmd1YWdlIFwiJHt2YWx1ZX1cIiBpcyBub3Qgc3VwcG9ydGVkYCk7XG59XG5cbmV4cG9ydCBjbGFzcyBTb3VyY2VGaWxlIHtcbiAgcHJpdmF0ZSBbTkFNRV06IHN0cmluZztcbiAgcHJpdmF0ZSBbTEFOR1VBR0VdOiBzdHJpbmc7XG4gIHByaXZhdGUgW0hFQURFUl9GSUxFX09OTFldOiBib29sZWFuO1xuICBwcml2YXRlIFtGSUxFXTogQWJzb2x1dGVQYXRoO1xuICBwcml2YXRlIFtPQkpFQ1RfRklMRV06IEFic29sdXRlUGF0aCB8IG51bGw7XG4gIHByaXZhdGUgW0RFRklORVNdOiBzdHJpbmdbXTtcbiAgcHJpdmF0ZSBbQ09NUElMRV9GTEFHU106IHN0cmluZ1tdO1xuXG4gIHByaXZhdGUgY29uc3RydWN0b3Ioc2NvcGU6IGFueSwgZmlsZW5hbWU6IEFic29sdXRlUGF0aHxzdHJpbmcpIHtcbiAgICB0aGlzW05BTUVdID0gZmlsZW5hbWUudG9TdHJpbmcoKTtcbiAgICBjb25zdCBmbmFtZSA9IHNjb3BlLlNPVVJDRV9ESVIucmVzb2x2ZShmaWxlbmFtZSk7XG4gIFxuICAgIGNvbnN0IGxhbmd1YWdlID0gZ2V0RmlsZUxhbmd1YWdlKGZuYW1lKTtcbiAgICB0aGlzW0xBTkdVQUdFXSA9IGxhbmd1YWdlO1xuICAgIHRoaXNbSEVBREVSX0ZJTEVfT05MWV0gPSAhbGFuZ3VhZ2U7XG4gICAgdGhpc1tGSUxFXSA9IGZuYW1lO1xuICAgIHRoaXNbT0JKRUNUX0ZJTEVdID0gbnVsbDtcbiAgICB0aGlzW0RFRklORVNdID0gW107XG4gICAgdGhpc1tDT01QSUxFX0ZMQUdTXSA9ICFsYW5ndWFnZSA/IFtdIDogW1xuICAgICAgLi4uc2NvcGVbbGFuZ3VhZ2UgKyBcIl9GTEFHU1wiXSxcbiAgICAgIC4uLnNjb3BlW2xhbmd1YWdlICsgXCJfRkxBR1NfXCIgKyBzY29wZS5CVUlMRF9UWVBFLnRvVXBwZXJDYXNlKCldLFxuICAgIF07XG4gIH1cblxuICBwdWJsaWMgc3RhdGljIGNyZWF0ZShzY29wZTogYW55LCBmaWxlbmFtZTogQWJzb2x1dGVQYXRofHN0cmluZykge1xuICAgIHJldHVybiBPYmplY3Quc2VhbChuZXcgU291cmNlRmlsZShzY29wZSwgZmlsZW5hbWUpKTtcbiAgfVxuXG4gIHB1YmxpYyBnZXQgTkFNRSgpOiBzdHJpbmcge1xuICAgIHJldHVybiB0aGlzW05BTUVdO1xuICB9XG5cbiAgcHVibGljIGdldCBMQU5HVUFHRSgpOiBzdHJpbmcge1xuICAgIHJldHVybiB0aGlzW0xBTkdVQUdFXTtcbiAgfVxuXG4gIHB1YmxpYyBnZXQgSEVBREVSX0ZJTEVfT05MWSgpOiBib29sZWFuIHtcbiAgICByZXR1cm4gdGhpc1tIRUFERVJfRklMRV9PTkxZXTtcbiAgfVxuXG4gIHB1YmxpYyBzZXQgSEVBREVSX0ZJTEVfT05MWSh2YWx1ZTogYm9vbGVhbikge1xuICAgIHRoaXNbSEVBREVSX0ZJTEVfT05MWV0gPSBlbnN1cmVCb29sZWFuKHZhbHVlKTtcbiAgfVxuXG4gIHB1YmxpYyBnZXQgREVGSU5FUygpIHtcbiAgICByZXR1cm4gdGhpc1tERUZJTkVTXVxuICB9XG5cbiAgcHVibGljIGdldCBDT01QSUxFX0ZMQUdTKCkge1xuICAgIHJldHVybiB0aGlzW0NPTVBJTEVfRkxBR1NdO1xuICB9XG5cbiAgcHVibGljIGdldCBGSUxFKCk6IEFic29sdXRlUGF0aCB7XG4gICAgcmV0dXJuIHRoaXNbRklMRV07XG4gIH1cblxuICBwdWJsaWMgZ2V0IEZJTEVfRElSKCk6IEFic29sdXRlUGF0aCB7XG4gICAgcmV0dXJuIHRoaXNbRklMRV0uZGlybmFtZSgpO1xuICB9XG5cbiAgcHVibGljIGdldCBGSUxFX05BTUUoKTogc3RyaW5nIHtcbiAgICByZXR1cm4gdGhpc1tGSUxFXS5iYXNlbmFtZSgpO1xuICB9XG5cbiAgcHVibGljIGdldCBPQkpFQ1RfRklMRSgpOiBBYnNvbHV0ZVBhdGggfCBudWxsIHtcbiAgICByZXR1cm4gdGhpc1tPQkpFQ1RfRklMRV07XG4gIH1cblxuICBwdWJsaWMgc2V0IE9CSkVDVF9GSUxFKHZhbHVlOiBBYnNvbHV0ZVBhdGgpIHtcbiAgICB0aGlzW09CSkVDVF9GSUxFXSA9IHZhbHVlO1xuICB9XG5cbiAgcHVibGljIGdldCBPQkpFQ1RfRklMRV9ESVIoKTogQWJzb2x1dGVQYXRoIHwgbnVsbCB7XG4gICAgcmV0dXJuIHRoaXNbT0JKRUNUX0ZJTEVdID8gdGhpc1tPQkpFQ1RfRklMRV0uZGlybmFtZSgpIDogbnVsbDtcbiAgfVxuXG4gIHB1YmxpYyBnZXQgT0JKRUNUX0ZJTEVfTkFNRSgpOiBzdHJpbmcgfCBudWxsIHtcbiAgICByZXR1cm4gdGhpc1tPQkpFQ1RfRklMRV0gPyB0aGlzW09CSkVDVF9GSUxFXS5iYXNlbmFtZSgpIDogbnVsbDtcbiAgfVxuXG4gIHB1YmxpYyB0b0pTT04oKTogb2JqZWN0IHtcbiAgICByZXR1cm4ge1xuICAgICAgTkFNRTogdGhpcy5OQU1FLFxuICAgICAgTEFOR1VBR0U6IHRoaXMuTEFOR1VBR0UsXG4gICAgICBIRUFERVJfRklMRV9PTkxZOiB0aGlzLkhFQURFUl9GSUxFX09OTFksXG4gICAgICBERUZJTkVTOiB0aGlzLkRFRklORVMsXG4gICAgICBDT01QSUxFX0ZMQUdTOiB0aGlzLkNPTVBJTEVfRkxBR1MsXG4gICAgICBGSUxFOiB0aGlzLkZJTEUsXG4gICAgICBGSUxFX0RJUjogdGhpcy5GSUxFX0RJUixcbiAgICAgIEZJTEVfTkFNRTogdGhpcy5GSUxFX05BTUUsXG4gICAgICBPQkpFQ1RfRklMRTogdGhpcy5PQkpFQ1RfRklMRSxcbiAgICAgIE9CSkVDVF9GSUxFX0RJUjogdGhpcy5PQkpFQ1RfRklMRV9ESVIsXG4gICAgICBPQkpFQ1RfRklMRV9OQU1FOiB0aGlzLk9CSkVDVF9GSUxFX05BTUUsXG4gICAgfTtcbiAgfVxufVxuIiwiLypcbiAqIE1JVCBMaWNlbnNlXG4gKlxuICogQ29weXJpZ2h0IChjKSAyMDI1ICBZdXJpaSBZYWt1YmluICh5dXJpaS55YWt1YmluQGdtYWlsLmNvbSlcbiAqXG4gKiBQZXJtaXNzaW9uIGlzIGdyYW50ZWQgdG8gdXNlLCBjb3B5LCBtb2RpZnksIGFuZCBkaXN0cmlidXRlIHRoaXMgc29mdHdhcmVcbiAqIHVuZGVyIHRoZSBNSVQgTGljZW5zZS4gU2VlIExJQ0VOU0UgZmlsZSBmb3IgZGV0YWlscy5cbiAqL1xuXG5pbXBvcnQgeyBTb3VyY2VGaWxlIH0gZnJvbSBcIkAvY29yZS9Tb3VyY2VGaWxlXCI7XG5cbmNvbnN0IFNPVVJDRVMgPSBTeW1ib2woXCJTT1VSQ0VTXCIpO1xuXG5leHBvcnQgY2xhc3MgU291cmNlRmlsZUxpc3Qge1xuICBwcml2YXRlIFtTT1VSQ0VTXTogU291cmNlRmlsZVtdO1xuXG4gIHByaXZhdGUgY29uc3RydWN0b3Ioc2NvcGU6IGFueSwgc291cmNlczogU291cmNlRmlsZVtdKSB7XG4gICAgdGhpc1tTT1VSQ0VTXSA9IFtdO1xuICAgIGZvciAoY29uc3QgaXRlciBvZiBzb3VyY2VzKSB7XG4gICAgICBpZiAoIShpdGVyIGluc3RhbmNlb2YgU291cmNlRmlsZSkpXG4gICAgICAgIHRocm93IG5ldyBFcnJvcihgSXRlbSAke2l0ZXJ9IGlzIG5vdCBTb3VyY2VGaWxlYCk7XG4gICAgICB0aGlzW1NPVVJDRVNdLnB1c2goaXRlcik7XG4gICAgfVxuICB9XG5cbiAgcHVibGljIHN0YXRpYyBjcmVhdGUoc2NvcGU6IGFueSwgc291cmNlczogU291cmNlRmlsZVtdKSB7XG4gICAgcmV0dXJuIE9iamVjdC5zZWFsKG5ldyBTb3VyY2VGaWxlTGlzdChzY29wZSwgc291cmNlcykpO1xuICB9XG5cbiAgcHVibGljIGFkZERlZmluaXRpb25zKC4uLmRlZmluaXRpb25zOiBzdHJpbmdbXSkge1xuICAgIGZvciAoY29uc3QgaXRlciBvZiBkZWZpbml0aW9ucy5mbGF0KCkpXG4gICAgICB0aGlzW1NPVVJDRVNdLmZvckVhY2goaSA9PiBpLkRFRklORVMucHVzaChpdGVyKSk7XG4gIH1cblxuICBwdWJsaWMgYWRkQ29tcGlsZUZsYWdzKC4uLmZsYWdzOiBzdHJpbmdbXSkge1xuICAgIGZvciAoY29uc3QgaXRlciBvZiBmbGFncy5mbGF0KCkpXG4gICAgICB0aGlzW1NPVVJDRVNdLmZvckVhY2goaSA9PiBpLkNPTVBJTEVfRkxBR1MucHVzaChpdGVyKSk7XG4gIH1cblxuICBwdWJsaWMgc291cmNlQXQoaW5kZXg6IG51bWJlcik6IFNvdXJjZUZpbGUge1xuICAgIHJldHVybiB0aGlzW1NPVVJDRVNdW2luZGV4XTtcbiAgfVxuXG4gIHB1YmxpYyBzb3VyY2VDb3VudChpbmRleDogbnVtYmVyKTogbnVtYmVyIHtcbiAgICByZXR1cm4gdGhpc1tTT1VSQ0VTXS5sZW5ndGg7XG4gIH1cblxuICBwdWJsaWMgdG9KU09OKCk6IG9iamVjdCB7XG4gICAgcmV0dXJuIHRoaXNbU09VUkNFU107XG4gIH1cbn07XG4iLCIvKlxuICogTUlUIExpY2Vuc2VcbiAqXG4gKiBDb3B5cmlnaHQgKGMpIDIwMjUgIFl1cmlpIFlha3ViaW4gKHl1cmlpLnlha3ViaW5AZ21haWwuY29tKVxuICpcbiAqIFBlcm1pc3Npb24gaXMgZ3JhbnRlZCB0byB1c2UsIGNvcHksIG1vZGlmeSwgYW5kIGRpc3RyaWJ1dGUgdGhpcyBzb2Z0d2FyZVxuICogdW5kZXIgdGhlIE1JVCBMaWNlbnNlLiBTZWUgTElDRU5TRSBmaWxlIGZvciBkZXRhaWxzLlxuICovXG5cbmltcG9ydCBvcyBmcm9tIFwibm9kZTpvc1wiO1xuaW1wb3J0IHsgREVCVUdfQlVJTERfVFlQRSwgUkVMRUFTRV9CVUlMRF9UWVBFIH0gZnJvbSBcIkAvY29yZS9UeXBlc1wiO1xuXG5leHBvcnQgZGVmYXVsdCB7XG4gIFNZU1RFTV9OQU1FOiB7XG4gICAgZGVzY3JpcHRpb246IFwiRGVmaW5lcyB0aGUgdGFyZ2V0IE9TIGZvciB0aGUgYnVpbGQsIHVzZWQgaW4gY3Jvc3MtY29tcGlsYXRpb24gYW5kIG5hdGl2ZSBidWlsZHNcIixcbiAgICB2YWx1ZTogXCJMaW51eFwiLFxuICB9LFxuICBTWVNURU1fUFJPQ0VTU09SOiB7XG4gICAgZGVzY3JpcHRpb246IFwiRGVmaW5lcyB0aGUgdGFyZ2V0IENQVSBhcmNoaXRlY3R1cmVcIixcbiAgICB2YWx1ZTogXCJ3YXNtMzJcIixcbiAgfSxcbiAgUFJPSkVDVF9OQU1FOiB7XG4gICAgZGVzY3JpcHRpb246IFwiTmFtZSBvZiB0aGUgY3VycmVudCBwcm9qZWN0XCIsXG4gICAgdmFsdWU6IFwiXCIsXG4gIH0sXG4gIFBST0pFQ1RfVkVSU0lPTjoge1xuICAgIGRlc2NyaXB0aW9uOiBcIlZlcnNpb24gb2YgdGhlIGN1cnJlbnQgcHJvamVjdFwiLFxuICAgIHZhbHVlOiBcIlwiLFxuICB9LFxuICBQUk9KRUNUX0RFU0NSSVBUSU9OOiB7XG4gICAgZGVzY3JpcHRpb246IFwiRGVzY3JpcHRpb24gb2YgdGhlIGN1cnJlbnQgcHJvamVjdFwiLFxuICAgIHZhbHVlOiBcIlwiLFxuICB9LFxuICBQUk9KRUNUX0hPTUVQQUdFX1VSTDoge1xuICAgIGRlc2NyaXB0aW9uOiBcIkhvbWVwYWdlIFVSTCBvZiB0aGUgY3VycmVudCBwcm9qZWN0XCIsXG4gICAgdmFsdWU6IFwiXCIsXG4gIH0sXG4gIFBST0pFQ1RfU09VUkNFX0RJUjoge1xuICAgIGRlc2NyaXB0aW9uOiBcIkFic29sdXRlIHBhdGggdG8gdGhlIHRvcC1sZXZlbCBzb3VyY2UgZGlyZWN0b3J5IG9mIHRoZSBwcm9qZWN0XCIsXG4gICAgdHlwZTogXCJEaXJQYXRoXCIsXG4gIH0sXG4gIFBST0pFQ1RfQklOQVJZX0RJUjoge1xuICAgIGRlc2NyaXB0aW9uOiBcIkFic29sdXRlIHBhdGggdG8gdGhlIHRvcC1sZXZlbCBidWlsZCAoYmluYXJ5KSBkaXJlY3Rvcnkgb2YgdGhlIHByb2plY3RcIixcbiAgICB0eXBlOiBcIkRpclBhdGhcIixcbiAgfSxcbiAgU0NSSVBUX0ZJTEU6IHtcbiAgICBkZXNjcmlwdGlvbjogXCJGdWxsIHBhdGggdG8gdGhlIGN1cnJlbnQgTWFrZVNjcmlwdCBmaWxlIGJlaW5nIHByb2Nlc3NlZFwiLFxuICAgIHR5cGU6IFwiRmlsZVBhdGhcIixcbiAgfSxcbiAgU0NSSVBUX0RJUjoge1xuICAgIGRlc2NyaXB0aW9uOiBcIkRpcmVjdG9yeSBvZiB0aGUgY3VycmVudCBNYWtlU2NyaXB0IGZpbGUgYmVpbmcgcHJvY2Vzc2VkXCIsXG4gICAgdHlwZTogXCJEaXJQYXRoXCIsXG4gIH0sXG4gIFBBQ0tBR0VfRklMRToge1xuICAgIGRlc2NyaXB0aW9uOiBcIkZpbGVuYW1lIG9mIHByb2plY3QgbWFuaWZlc3QgY29udGFpbmluZyBtZXRhZGF0YSBhbmQgZGVwZW5kZW5jaWVzXCIsXG4gICAgdHlwZTogXCJGaWxlUGF0aFwiLFxuICB9LFxuICBDQUNIRV9GSUxFOiB7XG4gICAgZGVzY3JpcHRpb246IFwiRGVmYXVsdCBmaWxlbmFtZSBvZiB0aGUgQml0TWFrZSBjYWNoZSBzdG9yaW5nIHNldHRpbmdzXCIsXG4gICAgdHlwZTogXCJGaWxlUGF0aFwiLFxuICB9LFxuICBCVUlMRF9UWVBFOiB7XG4gICAgZGVzY3JpcHRpb246IFwiU3BlY2lmaWVzIHRoZSBidWlsZCBjb25maWd1cmF0aW9uIGZvciBjb250cm9sbGluZyBvcHRpbWl6YXRpb24gbGV2ZWxzIGFuZCBkZWJ1ZyBpbmZvcm1hdGlvbiBpbiB0aGUgYnVpbGQgcHJvY2Vzc1wiLFxuICAgIHR5cGU6IFsgREVCVUdfQlVJTERfVFlQRSwgUkVMRUFTRV9CVUlMRF9UWVBFIF0sXG4gICAgdmFsdWU6IFJFTEVBU0VfQlVJTERfVFlQRSxcbiAgfSxcbiAgSU5TVEFMTF9QUkVGSVg6IHtcbiAgICBkZXNjcmlwdGlvbjogXCJUaGUgcm9vdCBkaXJlY3Rvcnkgd2hlcmUgZmlsZXMgd2lsbCBiZSBpbnN0YWxsZWQgYnkgZGVmYXVsdFwiLFxuICAgIHR5cGU6IFwiRGlyUGF0aFwiLFxuICAgIHZhbHVlOiBcIi91c3JcIixcbiAgfSxcbiAgREVTVERJUjoge1xuICAgIGRlc2NyaXB0aW9uOiBcIlRlbXBvcmFyeSBpbnN0YWxsYXRpb24gcm9vdFwiLFxuICAgIHR5cGU6IFwiRGlyUGF0aFwiLFxuICB9LFxuICBTT1VSQ0VfRElSOiB7XG4gICAgZGVzY3JpcHRpb246IFwiUGF0aCB0byB0aGUgc291cmNlIGRpcmVjdG9yeSBjdXJyZW50bHkgYmVpbmcgcHJvY2Vzc2VkXCIsXG4gICAgdHlwZTogXCJEaXJQYXRoXCIsXG4gIH0sXG4gIEJJTkFSWV9ESVI6IHtcbiAgICBkZXNjcmlwdGlvbjogXCJQYXRoIHRvIHRoZSBiaW5hcnkgZGlyZWN0b3J5IGN1cnJlbnRseSBiZWluZyBwcm9jZXNzZWRcIixcbiAgICB0eXBlOiBcIkRpclBhdGhcIixcbiAgfSxcbiAgUE9TSVRJT05fSU5ERVBFTkRFTlRfQ09ERToge1xuICAgIGRlc2NyaXB0aW9uOiBcIkVuYWJsZXMgUG9zaXRpb24tSW5kZXBlbmRlbnQgQ29kZSAoUElDKSBmb3IgYnVpbGRpbmcgc2hhcmVkIGxpYnJhcmllc1wiLFxuICAgIHZhbHVlOiBmYWxzZSxcbiAgfSxcbiAgUFJFVkVOVF9JTlNUQUxMX0ZJTEVTOiB7XG4gICAgZGVzY3JpcHRpb246IFwiUHJldmVudCBpbnN0YWxsYXRpb24gb2YgZmlsZXNcIixcbiAgICB2YWx1ZTogZmFsc2UsXG4gIH0sXG4gIEhPU1RfU1lTVEVNX05BTUU6IHtcbiAgICBkZXNjcmlwdGlvbjogXCJTcGVjaWZpZXMgdGhlIE9TIG9mIHRoZSBtYWNoaW5lIHJ1bm5pbmdcIixcbiAgICB2YWx1ZTogb3MudHlwZSgpLFxuICB9LFxuICBJTkNMVURFUzoge1xuICAgIGRlc2NyaXB0aW9uOiBcIlBhdGhzIHNlYXJjaGVkIGZvciBoZWFkZXIgZmlsZXNcIixcbiAgICB2YWx1ZTogW10sXG4gIH0sXG4gIEFTTV9DT01QSUxFUjoge1xuICAgIGRlc2NyaXB0aW9uOiBcIlBhdGggdG8gdGhlIGFzc2VtYmxlciBjb21waWxlciBkZXRlY3RlZFwiLFxuICAgIHZhbHVlOiBcImNsYW5nXCIsXG4gIH0sXG4gIEFTTV9GTEFHUzoge1xuICAgIGRlc2NyaXB0aW9uOiBcIkZsYWdzIHBhc3NlZCB0byB0aGUgYXNzZW1ibGVyIGNvbXBpbGVyXCIsXG4gICAgdmFsdWU6IFtdLFxuICB9LFxuICBBU01fRkxBR1NfREVCVUc6IHtcbiAgICBkZXNjcmlwdGlvbjogXCJBZGRpdGlvbmFsIGFzc2VtYmxlciBmbGFncyB1c2VkIHdoZW4gYnVpbGRpbmcgaW4gRGVidWcgbW9kZVwiLFxuICAgIHZhbHVlOiBbIFwiLWdcIiBdLFxuICB9LFxuICBBU01fRkxBR1NfUkVMRUFTRToge1xuICAgIGRlc2NyaXB0aW9uOiBcIkFkZGl0aW9uYWwgYXNzZW1ibGVyIGZsYWdzIHVzZWQgd2hlbiBidWlsZGluZyBpbiBSZWxlYXNlIG1vZGVcIixcbiAgICB2YWx1ZTogWyBcIi1PM1wiLCBcIi1ETkRFQlVHXCIgXSxcbiAgfSxcbiAgQ19DT01QSUxFUjoge1xuICAgIGRlc2NyaXB0aW9uOiBcIlBhdGggdG8gdGhlIEMgY29tcGlsZXIgZGV0ZWN0ZWRcIixcbiAgICB2YWx1ZTogXCJjbGFuZ1wiLFxuICB9LFxuICBDX0ZMQUdTOiB7XG4gICAgZGVzY3JpcHRpb246IFwiRmxhZ3MgcGFzc2VkIHRvIHRoZSBDIGNvbXBpbGVyXCIsXG4gICAgdmFsdWU6IFtdLFxuICB9LFxuICBDX0ZMQUdTX0RFQlVHOiB7XG4gICAgZGVzY3JpcHRpb246IFwiQWRkaXRpb25hbCBDIGNvbXBpbGVyIGZsYWdzIHVzZWQgd2hlbiBidWlsZGluZyBpbiBEZWJ1ZyBtb2RlXCIsXG4gICAgdmFsdWU6IFsgXCItZ1wiIF0sXG4gIH0sXG4gIENfRkxBR1NfUkVMRUFTRToge1xuICAgIGRlc2NyaXB0aW9uOiBcIkFkZGl0aW9uYWwgQyBjb21waWxlciBmbGFncyB1c2VkIHdoZW4gYnVpbGRpbmcgaW4gUmVsZWFzZSBtb2RlXCIsXG4gICAgdmFsdWU6IFsgXCItTzNcIiwgXCItRE5ERUJVR1wiIF0sXG4gIH0sXG4gIENYWF9DT01QSUxFUjoge1xuICAgIGRlc2NyaXB0aW9uOiBcIlBhdGggdG8gdGhlIEMrKyBjb21waWxlciBkZXRlY3RlZFwiLFxuICAgIHZhbHVlOiBcImNsYW5nKytcIixcbiAgfSxcbiAgQ1hYX0ZMQUdTOiB7XG4gICAgZGVzY3JpcHRpb246IFwiRmxhZ3MgcGFzc2VkIHRvIHRoZSBDIGNvbXBpbGVyXCIsXG4gICAgdmFsdWU6IFtdLFxuICB9LFxuICBDWFhfRkxBR1NfREVCVUc6IHtcbiAgICBkZXNjcmlwdGlvbjogXCJBZGRpdGlvbmFsIEMrKyBjb21waWxlciBmbGFncyB1c2VkIHdoZW4gYnVpbGRpbmcgaW4gRGVidWcgbW9kZVwiLFxuICAgIHZhbHVlOiBbIFwiLWdcIiBdLFxuICB9LFxuICBDWFhfRkxBR1NfUkVMRUFTRToge1xuICAgIGRlc2NyaXB0aW9uOiBcIkFkZGl0aW9uYWwgQysrIGNvbXBpbGVyIGZsYWdzIHVzZWQgd2hlbiBidWlsZGluZyBpbiBSZWxlYXNlIG1vZGVcIixcbiAgICB2YWx1ZTogWyBcIi1PM1wiLCBcIi1ETkRFQlVHXCIgXSxcbiAgfSxcbiAgQVI6IHtcbiAgICBkZXNjcmlwdGlvbjogXCJQYXRoIHRvIHRoZSBhcmNoaXZlciB0b29sIHVzZWQgdG8gY3JlYXRlIHN0YXRpYyBsaWJyYXJpZXNcIixcbiAgICB2YWx1ZTogXCJsbHZtLWFyXCIsXG4gIH0sXG4gIFJBTkxJQjoge1xuICAgIGRlc2NyaXB0aW9uOiBcIlRvb2wgdXNlZCB0byBnZW5lcmF0ZSBhbiBpbmRleCB0byB0aGUgY29udGVudHMgb2YgYW4gYXJjaGl2ZSAoc3RhdGljIGxpYnJhcnkpXCIsXG4gICAgdmFsdWU6IFwibGx2bS1yYW5saWJcIixcbiAgfSxcbiAgTElOS0VSOiB7XG4gICAgZGVzY3JpcHRpb246IFwiUGF0aCB0byB0aGUgbGlua2VyIHVzZWQgdG8gbGluayBvYmplY3QgZmlsZXMgYW5kIGxpYnJhcmllcyBpbnRvIGV4ZWN1dGFibGVzXCIsXG4gICAgdmFsdWU6IFwid2FzbS1sZFwiLFxuICB9LFxuICBOTToge1xuICAgIGRlc2NyaXB0aW9uOiBcIlBhdGggdG8gdGhlIHRvb2wgdXNlZCB0byBsaXN0IHN5bWJvbHMgZnJvbSBvYmplY3QgZmlsZXMgb3IgYXJjaGl2ZXNcIixcbiAgICB2YWx1ZTogXCJsbHZtLW5tXCIsXG4gIH0sXG4gIE9CSkNPUFk6IHtcbiAgICBkZXNjcmlwdGlvbjogXCJQYXRoIHRvIHRoZSB0b29sIHVzZWQgdG8gY29weSBhbmQgdHJhbnNsYXRlIG9iamVjdCBmaWxlc1wiLFxuICAgIHZhbHVlOiBcImxsdm0tb2JqY29weVwiLFxuICB9LFxuICBPQkpEVU1QOiB7XG4gICAgZGVzY3JpcHRpb246IFwiUGF0aCB0byB0aGUgdG9vbCB1c2VkIHRvIGRpc3BsYXkgaW5mb3JtYXRpb24gYWJvdXQgb2JqZWN0IGZpbGVzLCBzdWNoIGFzIGRpc2Fzc2VtYmx5XCIsXG4gICAgdmFsdWU6IFwibGx2bS1vYmpkdW1wXCIsXG4gIH0sXG4gIFNUUklQOiB7XG4gICAgZGVzY3JpcHRpb246IFwiUGF0aCB0byB0aGUgdG9vbCB1c2VkIHRvIHJlbW92ZSBzeW1ib2xzIGZyb20gb2JqZWN0IGZpbGVzIG9yIGV4ZWN1dGFibGVzIHRvIHJlZHVjZSBzaXplXCIsXG4gICAgdmFsdWU6IFwibGx2bS1zdHJpcFwiLFxuICB9LFxuICBPQkpFQ1RfTElCUkFSWV9QUkVGSVg6IHtcbiAgICBkZXNjcmlwdGlvbjogXCJQcmVmaXggdXNlZCBmb3Igb2JqZWN0IGxpYnJhcmllc1wiLFxuICAgIHZhbHVlOiBcIlwiLFxuICB9LFxuICBPQkpFQ1RfTElCUkFSWV9TVUZGSVg6IHtcbiAgICBkZXNjcmlwdGlvbjogXCJTdWZmaXggdXNlZCBmb3Igb2JqZWN0IGxpYnJhcnkgZmlsZXNcIixcbiAgICB2YWx1ZTogXCIub1wiLFxuICB9LFxuICBPQkpFQ1RfTElOS0VSX0ZMQUdTOiB7XG4gICAgZGVzY3JpcHRpb246IFwiRmxhZ3MgcGFzc2VkIHRvIHRoZSBsaW5rZXIgd2hlbiBjcmVhdGluZyBvYmplY3QgbGlicmFyaWVzXCIsXG4gICAgdmFsdWU6IFtdLFxuICB9LFxuICBTVEFUSUNfTElCUkFSWV9QUkVGSVg6IHtcbiAgICBkZXNjcmlwdGlvbjogXCJQcmVmaXggdXNlZCBmb3Igc3RhdGljIGxpYnJhcnkgZmlsZXNcIixcbiAgICB2YWx1ZTogXCJsaWJcIixcbiAgfSxcbiAgU1RBVElDX0xJQlJBUllfU1VGRklYOiB7XG4gICAgZGVzY3JpcHRpb246IFwiU3VmZml4IHVzZWQgZm9yIHN0YXRpYyBsaWJyYXJ5IGZpbGVzXCIsXG4gICAgdmFsdWU6IFwiLmFcIixcbiAgfSxcbiAgU1RBVElDX0xJTktFUl9GTEFHUzoge1xuICAgIGRlc2NyaXB0aW9uOiBcIkZsYWdzIHBhc3NlZCB0byB0aGUgbGlua2VyIHdoZW4gY3JlYXRpbmcgc3RhdGljIGxpYnJhcmllc1wiLFxuICAgIHZhbHVlOiBbXSxcbiAgfSxcbiAgU0hBUkVEX0xJQlJBUllfUFJFRklYOiB7XG4gICAgZGVzY3JpcHRpb246IFwiUHJlZml4IHVzZWQgZm9yIHNoYXJlZCBsaWJyYXJ5IGZpbGVzXCIsXG4gICAgdmFsdWU6IFwibGliXCIsXG4gIH0sXG4gIFNIQVJFRF9MSUJSQVJZX1NVRkZJWDoge1xuICAgIGRlc2NyaXB0aW9uOiBcIlN1ZmZpeCB1c2VkIGZvciBzaGFyZWQgbGlicmFyeSBmaWxlc1wiLFxuICAgIHZhbHVlOiBcIi5zb1wiLFxuICB9LFxuICBTSEFSRURfTElOS0VSX0ZMQUdTOiB7XG4gICAgZGVzY3JpcHRpb246IFwiRmxhZ3MgcGFzc2VkIHRvIHRoZSBsaW5rZXIgd2hlbiBjcmVhdGluZyBzaGFyZWQgbGlicmFyaWVzXCIsXG4gICAgdmFsdWU6IFtdLFxuICB9LFxuICBFWEVDVVRBQkxFX1NVRkZJWDoge1xuICAgIGRlc2NyaXB0aW9uOiBcIlN1ZmZpeCB1c2VkIGZvciBleGVjdXRhYmxlIGZpbGVzXCIsXG4gICAgdmFsdWU6IFwiXCIsXG4gIH0sXG4gIEVYRV9MSU5LRVJfRkxBR1M6IHtcbiAgICBkZXNjcmlwdGlvbjogXCJGbGFncyBwYXNzZWQgdG8gdGhlIGxpbmtlciB3aGVuIGNyZWF0aW5nIGV4ZWN1dGFibGVzXCIsXG4gICAgdmFsdWU6IFtdLFxuICB9LFxuICBHTE9CQUxfQ09OVEVYVF9KU09OOiB7XG4gICAgZGVzY3JpcHRpb246IFwiRmlsZW5hbWUgZm9yIEpTT04gb2YgdGhlIEdsb2JhbCBjb250ZXh0XCIsXG4gICAgdHlwZTogXCJGaWxlUGF0aFwiLFxuICB9LFxuICBUQVJHRVRfR09BTFNfSlNPTjoge1xuICAgIGRlc2NyaXB0aW9uOiBcIkZpbGVuYW1lIGZvciBKU09OIG9mIHRoZSBUYXJnZXQgR29hbHNcIixcbiAgICB0eXBlOiBcIkZpbGVQYXRoXCIsXG4gIH0sXG59O1xuIiwiLypcbiAqIE1JVCBMaWNlbnNlXG4gKlxuICogQ29weXJpZ2h0IChjKSAyMDI1ICBZdXJpaSBZYWt1YmluICh5dXJpaS55YWt1YmluQGdtYWlsLmNvbSlcbiAqXG4gKiBQZXJtaXNzaW9uIGlzIGdyYW50ZWQgdG8gdXNlLCBjb3B5LCBtb2RpZnksIGFuZCBkaXN0cmlidXRlIHRoaXMgc29mdHdhcmVcbiAqIHVuZGVyIHRoZSBNSVQgTGljZW5zZS4gU2VlIExJQ0VOU0UgZmlsZSBmb3IgZGV0YWlscy5cbiAqL1xuXG5pbXBvcnQgeyBJbmNsdWRlRGlyZWN0b3J5IH0gZnJvbSBcIkAvY29yZS9JbmNsdWRlRGlyZWN0b3J5XCI7XG5pbXBvcnQgeyBJbnRlcmZhY2VJbmNsdWRlcyB9ZnJvbSBcIkAvY29yZS9JbnRlcmZhY2VJbmNsdWRlc1wiO1xuaW1wb3J0IHsgSW50ZXJmYWNlVGFyZ2V0IH0gZnJvbSBcIkAvY29yZS9JbnRlcmZhY2VUYXJnZXRcIjtcblxuY29uc3QgRU5UUklFUyA9IFN5bWJvbChcIkVOVFJJRVNcIik7XG5cbmZ1bmN0aW9uIGdldEhlYWRlcnModGFyZ2V0OiBhbnkpIHtcbiAgcmV0dXJuIHRhcmdldC5TT1VSQ0VTLmZpbHRlcigoaTogYW55KSA9PiBpLkhFQURFUl9GSUxFX09OTFkpO1xufVxuXG5mdW5jdGlvbiBnZXRJbmNsdWRlcyh0YXJnZXQ6IGFueSkge1xuICByZXR1cm4gdGFyZ2V0LklOQ0xVREVTLm1hcCgoaTogYW55KSA9PiBpLlZBTFVFKTtcbn1cblxuZnVuY3Rpb24gZ2V0UHVibGljSW5jbHVkZXModGFyZ2V0OiBhbnkpIHtcbiAgcmV0dXJuIHRhcmdldC5JTkNMVURFUy5maWx0ZXIoKGk6IGFueSkgPT4gaS5QVUJMSUNfT05MWSkubWFwKChpOiBhbnkpID0+IGkuVkFMVUUpO1xufVxuXG5mdW5jdGlvbiBnZXRMaWJyYXJpZXModGFyZ2V0OiBhbnkpIHtcbiAgcmV0dXJuIHRhcmdldC5MSUJSQVJJRVMubWFwKChpOiBhbnkpID0+IGkuVkFMVUUpO1xufVxuXG5mdW5jdGlvbiBnZXRQdWJsaWNMaWJyYXJpZXModGFyZ2V0OiBhbnkpIHtcbiAgcmV0dXJuIHRhcmdldC5MSUJSQVJJRVMuZmlsdGVyKChpOiBhbnkpID0+IGkuUFVCTElDX09OTFkpLm1hcCgoaTogYW55KSA9PiBpLlZBTFVFKTtcbn1cblxuZnVuY3Rpb24gZ2V0RGVmaW5pdGlvbnModGFyZ2V0OiBhbnkpIHtcbiAgcmV0dXJuIHRhcmdldC5ERUZJTkVTLm1hcCgoaTogYW55KSA9PiBpLlZBTFVFKTtcbn1cblxuZnVuY3Rpb24gZ2V0UHVibGljRGVmaW5pdGlvbnModGFyZ2V0OiBhbnkpIHtcbiAgcmV0dXJuIHRhcmdldC5ERUZJTkVTLmZpbHRlcigoaTogYW55KSA9PiBpLlBVQkxJQ19PTkxZKS5tYXAoKGk6IGFueSkgPT4gaS5WQUxVRSk7XG59XG5cbmZ1bmN0aW9uIGdldENvbXBpbGVPcHRpb25zKHRhcmdldDogYW55KSB7XG4gIHJldHVybiB0YXJnZXQuQ09NUElMRV9PUFRJT05TLm1hcCgoaTogYW55KSA9PiBpLlZBTFVFKTtcbn1cblxuZnVuY3Rpb24gZ2V0UHVibGljQ29tcGlsZU9wdGlvbnModGFyZ2V0OiBhbnkpIHtcbiAgcmV0dXJuIHRhcmdldC5DT01QSUxFX09QVElPTlMuZmlsdGVyKChpOiBhbnkpID0+IGkuUFVCTElDX09OTFkpLm1hcCgoaTogYW55KSA9PiBpLlZBTFVFKTtcbn1cblxuZnVuY3Rpb24gZ2V0TGlua09wdGlvbnModGFyZ2V0OiBhbnkpIHtcbiAgcmV0dXJuIHRhcmdldC5MSU5LX09QVElPTlMubWFwKChpOiBhbnkpID0+IGkuVkFMVUUpO1xufVxuXG5mdW5jdGlvbiBnZXRQdWJsaWNMaW5rT3B0aW9ucyh0YXJnZXQ6IGFueSkge1xuICByZXR1cm4gdGFyZ2V0LkxJTktfT1BUSU9OUy5maWx0ZXIoKGk6IGFueSkgPT4gaS5QVUJMSUNfT05MWSkubWFwKChpOiBhbnkpID0+IGkuVkFMVUUpO1xufVxuXG5leHBvcnQgY2xhc3MgVGFyZ2V0Q29sbGVjdGlvbiB7XG4gIHByaXZhdGUgW0VOVFJJRVNdOiBhbnk7XG5cbiAgcHJpdmF0ZSBjb25zdHJ1Y3RvcigpIHtcbiAgICB0aGlzW0VOVFJJRVNdID0ge307XG4gIH1cblxuICBwdWJsaWMgc3RhdGljIGNyZWF0ZSgpIHtcbiAgICByZXR1cm4gT2JqZWN0LnNlYWwobmV3IFRhcmdldENvbGxlY3Rpb24pO1xuICB9XG4gIFxuICBwdWJsaWMgZ2V0IEVOVFJJRVMoKSB7XG4gICAgcmV0dXJuIHRoaXNbRU5UUklFU107XG4gIH1cblxuICBwdWJsaWMgdG9KU09OKCk6IG9iamVjdCB7XG4gICAgcmV0dXJuIHRoaXNbRU5UUklFU107XG4gIH1cblxuICBwdWJsaWMgZ2V0KG5hbWU6IHN0cmluZyk6IGFueSB7XG4gICAgcmV0dXJuIHRoaXNbRU5UUklFU11bbmFtZV07XG4gIH1cblxuICBwdWJsaWMgc2V0KG5hbWU6IHN0cmluZywgdGFyZ2V0OiBhbnkpIHtcbiAgICBpZiAodGhpc1tFTlRSSUVTXVtuYW1lXSlcbiAgICAgIHRocm93IG5ldyBFcnJvcihgVGFyZ2V0IFwiJHtuYW1lfVwiIGV4aXN0c2ApO1xuICAgIHRoaXNbRU5UUklFU11bbmFtZV0gPSB0YXJnZXQ7XG4gIH1cblxuICBwcml2YXRlIF9fZ2V0QWxsSW5jbHVkZXMoaW5jbHVkZXM6IHN0cmluZ1tdLCB0YXJnZXRTZXQ6IFNldDxzdHJpbmc+LCBsaXN0OiBhbnkpIHtcbiAgICBmb3IgKGNvbnN0IGl0ZXIgb2YgbGlzdCkge1xuICAgICAgaWYgKGl0ZXIgaW5zdGFuY2VvZiBJbnRlcmZhY2VJbmNsdWRlcyB8fCBpdGVyIGluc3RhbmNlb2YgSW50ZXJmYWNlVGFyZ2V0KSB7XG4gICAgICAgIGlmICghdGFyZ2V0U2V0LmhhcyhpdGVyLnRhcmdldE5hbWUpKSB7XG4gICAgICAgICAgdGFyZ2V0U2V0LmFkZChpdGVyLnRhcmdldE5hbWUpO1xuICAgICAgICAgIGNvbnN0IHRhcmdldCA9IHRoaXMuZ2V0KGl0ZXIudGFyZ2V0TmFtZSk7XG4gICAgICAgICAgdGhpcy5fX2dldEFsbEluY2x1ZGVzKGluY2x1ZGVzLCB0YXJnZXRTZXQsIGdldFB1YmxpY0luY2x1ZGVzKHRhcmdldCkpO1xuICAgICAgICAgIHRoaXMuX19nZXRBbGxJbmNsdWRlcyhpbmNsdWRlcywgdGFyZ2V0U2V0LCBnZXRQdWJsaWNMaWJyYXJpZXModGFyZ2V0KSk7XG4gICAgICAgIH1cbiAgICAgIH1cbiAgICAgIGVsc2UgaWYgKGl0ZXIgaW5zdGFuY2VvZiBJbmNsdWRlRGlyZWN0b3J5KSB7XG4gICAgICAgIGlmICghaW5jbHVkZXMuaW5jbHVkZXMoaXRlci50b1N0cmluZygpKSlcbiAgICAgICAgICBpbmNsdWRlcy5wdXNoKGl0ZXIudG9TdHJpbmcoKSk7XG4gICAgICB9XG4gICAgICBlbHNlIHtcbiAgICAgICAgdGhyb3cgbmV3IEVycm9yKGBOb3Qgc3VwcG9ydCBpbnN0YW5jZSAke2l0ZXJ9YCk7XG4gICAgICB9XG4gICAgfVxuICB9XG5cbiAgcHVibGljIGFsbEluY2x1ZGVzT2YocGFyYW1zOiBhbnkpOiBzdHJpbmdbXSB7XG4gICAgY29uc3QgdGFyZ2V0ID0gKHR5cGVvZiBwYXJhbXMgPT09IFwic3RyaW5nXCIpID8gdGhpcy5nZXQocGFyYW1zKSA6IHBhcmFtcztcbiAgICBjb25zdCBpbmNsdWRlczogc3RyaW5nW10gPSBbXTtcbiAgICBjb25zdCB0YXJnZXRTZXQgPSBuZXcgU2V0KFsgdGFyZ2V0Lk5BTUUgXSk7XG4gICAgdGhpcy5fX2dldEFsbEluY2x1ZGVzKGluY2x1ZGVzLCB0YXJnZXRTZXQsIGdldEluY2x1ZGVzKHRhcmdldCkpO1xuICAgIHRoaXMuX19nZXRBbGxJbmNsdWRlcyhpbmNsdWRlcywgdGFyZ2V0U2V0LCBnZXRMaWJyYXJpZXModGFyZ2V0KSk7XG4gICAgcmV0dXJuIGluY2x1ZGVzO1xuICB9XG5cbiAgcHJpdmF0ZSBfX2dldEFsbEhlYWRlcnMoaGVhZGVyczogc3RyaW5nW10sIHRhcmdldFNldDogU2V0PHN0cmluZz4sIGxpc3Q6IGFueSkge1xuICAgIGZvciAoY29uc3QgaXRlciBvZiBsaXN0KSB7XG4gICAgICBpZiAoaXRlciBpbnN0YW5jZW9mIEludGVyZmFjZUluY2x1ZGVzIHx8IGl0ZXIgaW5zdGFuY2VvZiBJbnRlcmZhY2VUYXJnZXQpIHtcbiAgICAgICAgaWYgKCF0YXJnZXRTZXQuaGFzKGl0ZXIudGFyZ2V0TmFtZSkpIHtcbiAgICAgICAgICB0YXJnZXRTZXQuYWRkKGl0ZXIudGFyZ2V0TmFtZSk7XG4gICAgICAgICAgY29uc3QgdGFyZ2V0ID0gdGhpcy5nZXQoaXRlci50YXJnZXROYW1lKTtcbiAgICAgICAgICBmb3IgKGNvbnN0IGhlYWRlciBvZiBnZXRIZWFkZXJzKHRhcmdldCkubWFwKChpOiBhbnkpID0+IGkuRklMRS50b1N0cmluZygpKSkge1xuICAgICAgICAgICAgaWYgKCFoZWFkZXJzLmluY2x1ZGVzKGhlYWRlci50b1N0cmluZygpKSlcbiAgICAgICAgICAgICAgaGVhZGVycy5wdXNoKGhlYWRlci50b1N0cmluZygpKTtcbiAgICAgICAgICB9XG4gICAgICAgICAgdGhpcy5fX2dldEFsbEhlYWRlcnMoaGVhZGVycywgdGFyZ2V0U2V0LCBnZXRQdWJsaWNJbmNsdWRlcyh0YXJnZXQpKTtcbiAgICAgICAgICB0aGlzLl9fZ2V0QWxsSGVhZGVycyhoZWFkZXJzLCB0YXJnZXRTZXQsIGdldFB1YmxpY0xpYnJhcmllcyh0YXJnZXQpKTtcbiAgICAgICAgfVxuICAgICAgfVxuICAgIH1cbiAgfVxuXG4gIHB1YmxpYyBhbGxIZWFkZXJzT2YocGFyYW1zOiBhbnkpIHtcbiAgICBjb25zdCB0YXJnZXQgPSAodHlwZW9mIHBhcmFtcyA9PT0gXCJzdHJpbmdcIikgPyB0aGlzLmdldChwYXJhbXMpIDogcGFyYW1zO1xuICAgIGNvbnN0IGhlYWRlcnMgPSBnZXRIZWFkZXJzKHRhcmdldCkubWFwKChpOiBhbnkpID0+IGkuRklMRS50b1N0cmluZygpKTtcbiAgICBjb25zdCB0YXJnZXRTZXQgPSBuZXcgU2V0KFsgdGFyZ2V0Lk5BTUUgXSk7XG4gICAgdGhpcy5fX2dldEFsbEhlYWRlcnMoaGVhZGVycywgdGFyZ2V0U2V0LCBnZXRJbmNsdWRlcyh0YXJnZXQpKTtcbiAgICB0aGlzLl9fZ2V0QWxsSGVhZGVycyhoZWFkZXJzLCB0YXJnZXRTZXQsIGdldExpYnJhcmllcyh0YXJnZXQpKTtcbiAgICByZXR1cm4gaGVhZGVycztcbiAgfVxuXG4gIHByaXZhdGUgX19nZXRBbGxMaWJyYXJpZXMobGlicmFyaWVzOiBzdHJpbmdbXSwgdGFyZ2V0U2V0OiBTZXQ8c3RyaW5nPiwgbGlzdDogYW55KSB7XG4gICAgZm9yIChjb25zdCBpdGVyIG9mIGxpc3QpIHtcbiAgICAgIGNvbnNvbGUuYXNzZXJ0KGl0ZXIgaW5zdGFuY2VvZiBJbnRlcmZhY2VUYXJnZXQpO1xuICAgICAgaWYgKCF0YXJnZXRTZXQuaGFzKGl0ZXIudGFyZ2V0TmFtZSkpIHtcbiAgICAgICAgdGFyZ2V0U2V0LmFkZChpdGVyLnRhcmdldE5hbWUpO1xuICAgICAgICBjb25zdCB0YXJnZXQgPSB0aGlzLmdldChpdGVyLnRhcmdldE5hbWUpO1xuICAgICAgICBsaWJyYXJpZXMucHVzaCh0YXJnZXQuRklMRS50b1N0cmluZygpKTtcbiAgICAgICAgdGhpcy5fX2dldEFsbExpYnJhcmllcyhsaWJyYXJpZXMsIHRhcmdldFNldCwgZ2V0UHVibGljTGlicmFyaWVzKHRhcmdldCkpO1xuICAgICAgfVxuICAgIH1cbiAgfVxuXG4gIHB1YmxpYyBhbGxMaWJyYXJpZXNPZihwYXJhbXM6IGFueSkge1xuICAgIGNvbnN0IHRhcmdldCA9ICh0eXBlb2YgcGFyYW1zID09PSBcInN0cmluZ1wiKSA/IHRoaXMuZ2V0KHBhcmFtcykgOiBwYXJhbXM7XG4gICAgY29uc3QgbGlicmFyaWVzOiBzdHJpbmdbXSA9IFtdO1xuICAgIGNvbnN0IHRhcmdldFNldCA9IG5ldyBTZXQoWyB0YXJnZXQuTkFNRSBdKTtcbiAgICB0aGlzLl9fZ2V0QWxsTGlicmFyaWVzKGxpYnJhcmllcywgdGFyZ2V0U2V0LCBnZXRMaWJyYXJpZXModGFyZ2V0KSk7XG4gICAgcmV0dXJuIGxpYnJhcmllcztcbiAgfVxuXG4gIHByaXZhdGUgX19nZXRBbGxEZWZpbml0aW9ucyhkZWZpbml0aW9uczogc3RyaW5nW10sIHRhcmdldFNldDogU2V0PHN0cmluZz4sIGxpc3Q6IGFueSkge1xuICAgIGZvciAoY29uc3QgaXRlciBvZiBsaXN0KSB7XG4gICAgICBpZiAoaXRlciBpbnN0YW5jZW9mIEludGVyZmFjZVRhcmdldCkge1xuICAgICAgICBpZiAoIXRhcmdldFNldC5oYXMoaXRlci50YXJnZXROYW1lKSkge1xuICAgICAgICAgIHRhcmdldFNldC5hZGQoaXRlci50YXJnZXROYW1lKTtcbiAgICAgICAgICBjb25zdCB0YXJnZXQgPSB0aGlzLmdldChpdGVyLnRhcmdldE5hbWUpO1xuICAgICAgICAgIHRoaXMuX19nZXRBbGxEZWZpbml0aW9ucyhkZWZpbml0aW9ucywgdGFyZ2V0U2V0LCBnZXRQdWJsaWNEZWZpbml0aW9ucyh0YXJnZXQpKTtcbiAgICAgICAgICB0aGlzLl9fZ2V0QWxsRGVmaW5pdGlvbnMoZGVmaW5pdGlvbnMsIHRhcmdldFNldCwgZ2V0UHVibGljTGlicmFyaWVzKHRhcmdldCkpO1xuICAgICAgICB9XG4gICAgICB9XG4gICAgICBlbHNlIGlmICh0eXBlb2YgaXRlciA9PT0gXCJzdHJpbmdcIikge1xuICAgICAgICBpZiAoIWRlZmluaXRpb25zLmluY2x1ZGVzKGl0ZXIpKVxuICAgICAgICAgIGRlZmluaXRpb25zLnB1c2goaXRlcik7XG4gICAgICB9XG4gICAgICBlbHNlIHtcbiAgICAgICAgdGhyb3cgbmV3IEVycm9yKGBOb3Qgc3VwcG9ydCBpbnN0YW5jZSAke2l0ZXJ9YCk7XG4gICAgICB9XG4gICAgfVxuICB9XG5cbiAgcHVibGljIGFsbERlZmluaXRpb25zT2YocGFyYW1zOiBhbnkpIHtcbiAgICBjb25zdCB0YXJnZXQgPSAodHlwZW9mIHBhcmFtcyA9PT0gXCJzdHJpbmdcIikgPyB0aGlzLmdldChwYXJhbXMpIDogcGFyYW1zO1xuICAgIGNvbnN0IGRlZmluaXRpb25zOiBzdHJpbmdbXSA9IFtdO1xuICAgIGNvbnN0IHRhcmdldFNldCA9IG5ldyBTZXQoWyB0YXJnZXQuTkFNRSBdKTtcbiAgICB0aGlzLl9fZ2V0QWxsRGVmaW5pdGlvbnMoZGVmaW5pdGlvbnMsIHRhcmdldFNldCwgZ2V0RGVmaW5pdGlvbnModGFyZ2V0KSk7XG4gICAgdGhpcy5fX2dldEFsbERlZmluaXRpb25zKGRlZmluaXRpb25zLCB0YXJnZXRTZXQsIGdldFB1YmxpY0xpYnJhcmllcyh0YXJnZXQpKTtcbiAgICByZXR1cm4gZGVmaW5pdGlvbnM7XG4gIH1cblxuICBwcml2YXRlIF9fZ2V0QWxsQ29tcGlsZU9wdGlvbnMob3B0aW9uczogQXJyYXk8c3RyaW5nfHN0cmluZ1tdPiwgdGFyZ2V0U2V0OiBTZXQ8c3RyaW5nPiwgbGlzdDogYW55KSB7XG4gICAgZm9yIChjb25zdCBpdGVyIG9mIGxpc3QpIHtcbiAgICAgIGlmIChpdGVyIGluc3RhbmNlb2YgSW50ZXJmYWNlVGFyZ2V0KSB7XG4gICAgICAgIGlmICghdGFyZ2V0U2V0LmhhcyhpdGVyLnRhcmdldE5hbWUpKSB7XG4gICAgICAgICAgdGFyZ2V0U2V0LmFkZChpdGVyLnRhcmdldE5hbWUpO1xuICAgICAgICAgIGNvbnN0IHRhcmdldCA9IHRoaXMuZ2V0KGl0ZXIudGFyZ2V0TmFtZSk7XG4gICAgICAgICAgdGhpcy5fX2dldEFsbENvbXBpbGVPcHRpb25zKG9wdGlvbnMsIHRhcmdldFNldCwgZ2V0UHVibGljQ29tcGlsZU9wdGlvbnModGFyZ2V0KSk7XG4gICAgICAgICAgdGhpcy5fX2dldEFsbENvbXBpbGVPcHRpb25zKG9wdGlvbnMsIHRhcmdldFNldCwgZ2V0UHVibGljTGlicmFyaWVzKHRhcmdldCkpO1xuICAgICAgICB9XG4gICAgICB9XG4gICAgICBlbHNlIGlmICh0eXBlb2YgaXRlciA9PT0gXCJzdHJpbmdcIikge1xuICAgICAgICBpZiAoIW9wdGlvbnMuaW5jbHVkZXMoaXRlcikpXG4gICAgICAgICAgb3B0aW9ucy5wdXNoKGl0ZXIpO1xuICAgICAgfVxuICAgICAgZWxzZSBpZiAoQXJyYXkuaXNBcnJheShpdGVyKSkge1xuICAgICAgICAvLyBUT0RPOiBBZGQgY29tcGFyZSBmb3Igc2FtZSBhcnJheSBpbiBvcHRpb25zXG4gICAgICAgIG9wdGlvbnMucHVzaChpdGVyKTtcbiAgICAgIH1cbiAgICAgIGVsc2Uge1xuICAgICAgICB0aHJvdyBuZXcgRXJyb3IoYE5vdCBzdXBwb3J0IGluc3RhbmNlICR7aXRlcn1gKTtcbiAgICAgIH1cbiAgICB9XG4gIH1cblxuICBwdWJsaWMgYWxsQ29tcGlsZU9wdGlvbnNPZihwYXJhbXM6IGFueSkge1xuICAgIGNvbnN0IHRhcmdldCA9ICh0eXBlb2YgcGFyYW1zID09PSBcInN0cmluZ1wiKSA/IHRoaXMuZ2V0KHBhcmFtcykgOiBwYXJhbXM7XG4gICAgY29uc3Qgb3B0aW9uczogc3RyaW5nW10gPSBbXTtcbiAgICBjb25zdCB0YXJnZXRTZXQgPSBuZXcgU2V0KFsgdGFyZ2V0Lk5BTUUgXSk7XG4gICAgdGhpcy5fX2dldEFsbENvbXBpbGVPcHRpb25zKG9wdGlvbnMsIHRhcmdldFNldCwgZ2V0Q29tcGlsZU9wdGlvbnModGFyZ2V0KSk7XG4gICAgdGhpcy5fX2dldEFsbENvbXBpbGVPcHRpb25zKG9wdGlvbnMsIHRhcmdldFNldCwgZ2V0UHVibGljTGlicmFyaWVzKHRhcmdldCkpO1xuICAgIHJldHVybiBvcHRpb25zLmZsYXQoKTtcbiAgfVxuXG4gIHByaXZhdGUgX19nZXRMaW5rT3B0aW9ucyhvcHRpb25zOiBBcnJheTxzdHJpbmd8c3RyaW5nW10+LCB0YXJnZXRTZXQ6IFNldDxzdHJpbmc+LCBsaXN0OiBhbnkpIHtcbiAgICBmb3IgKGNvbnN0IGl0ZXIgb2YgbGlzdCkge1xuICAgICAgaWYgKGl0ZXIgaW5zdGFuY2VvZiBJbnRlcmZhY2VUYXJnZXQpIHtcbiAgICAgICAgaWYgKCF0YXJnZXRTZXQuaGFzKGl0ZXIudGFyZ2V0TmFtZSkpIHtcbiAgICAgICAgICB0YXJnZXRTZXQuYWRkKGl0ZXIudGFyZ2V0TmFtZSk7XG4gICAgICAgICAgY29uc3QgdGFyZ2V0ID0gdGhpcy5nZXQoaXRlci50YXJnZXROYW1lKTtcbiAgICAgICAgICB0aGlzLl9fZ2V0TGlua09wdGlvbnMob3B0aW9ucywgdGFyZ2V0U2V0LCBnZXRQdWJsaWNMaW5rT3B0aW9ucyh0YXJnZXQpKTtcbiAgICAgICAgICB0aGlzLl9fZ2V0TGlua09wdGlvbnMob3B0aW9ucywgdGFyZ2V0U2V0LCBnZXRQdWJsaWNMaWJyYXJpZXModGFyZ2V0KSk7XG4gICAgICAgIH1cbiAgICAgIH1cbiAgICAgIGVsc2UgaWYgKHR5cGVvZiBpdGVyID09PSBcInN0cmluZ1wiKSB7XG4gICAgICAgIGlmICghb3B0aW9ucy5pbmNsdWRlcyhpdGVyKSlcbiAgICAgICAgICBvcHRpb25zLnB1c2goaXRlcik7XG4gICAgICB9XG4gICAgICBlbHNlIGlmIChBcnJheS5pc0FycmF5KGl0ZXIpKSB7XG4gICAgICAgIC8vIFRPRE86IEFkZCBjb21wYXJlIGZvciBzYW1lIGFycmF5IGluIG9wdGlvbnNcbiAgICAgICAgb3B0aW9ucy5wdXNoKGl0ZXIpO1xuICAgICAgfVxuICAgICAgZWxzZSB7XG4gICAgICAgIHRocm93IG5ldyBFcnJvcihgTm90IHN1cHBvcnQgaW5zdGFuY2UgJHtpdGVyfWApO1xuICAgICAgfVxuICAgIH1cbiAgfVxuXG4gIHB1YmxpYyBhbGxMaW5rT3B0aW9uc09mKHBhcmFtczogYW55KSB7XG4gICAgY29uc3QgdGFyZ2V0ID0gKHR5cGVvZiBwYXJhbXMgPT09IFwic3RyaW5nXCIpID8gdGhpcy5nZXQocGFyYW1zKSA6IHBhcmFtcztcbiAgICBjb25zdCBvcHRpb25zOiBzdHJpbmdbXSA9IFtdO1xuICAgIGNvbnN0IHRhcmdldFNldCA9IG5ldyBTZXQoWyB0YXJnZXQuTkFNRSBdKTtcbiAgICB0aGlzLl9fZ2V0TGlua09wdGlvbnMob3B0aW9ucywgdGFyZ2V0U2V0LCBnZXRMaW5rT3B0aW9ucyh0YXJnZXQpKTtcbiAgICB0aGlzLl9fZ2V0TGlua09wdGlvbnMob3B0aW9ucywgdGFyZ2V0U2V0LCBnZXRQdWJsaWNMaWJyYXJpZXModGFyZ2V0KSk7XG4gICAgcmV0dXJuIG9wdGlvbnMuZmxhdCgpO1xuICB9XG59XG4iLCIvKlxuICogTUlUIExpY2Vuc2VcbiAqXG4gKiBDb3B5cmlnaHQgKGMpIDIwMjUgIFl1cmlpIFlha3ViaW4gKHl1cmlpLnlha3ViaW5AZ21haWwuY29tKVxuICpcbiAqIFBlcm1pc3Npb24gaXMgZ3JhbnRlZCB0byB1c2UsIGNvcHksIG1vZGlmeSwgYW5kIGRpc3RyaWJ1dGUgdGhpcyBzb2Z0d2FyZVxuICogdW5kZXIgdGhlIE1JVCBMaWNlbnNlLiBTZWUgTElDRU5TRSBmaWxlIGZvciBkZXRhaWxzLlxuICovXG5cbmV4cG9ydCBjb25zdCBERUJVR19CVUlMRF9UWVBFID0gXCJEZWJ1Z1wiO1xuZXhwb3J0IGNvbnN0IFJFTEVBU0VfQlVJTERfVFlQRSA9IFwiUmVsZWFzZVwiO1xuIiwiLypcbiAqIE1JVCBMaWNlbnNlXG4gKlxuICogQ29weXJpZ2h0IChjKSAyMDI1ICBZdXJpaSBZYWt1YmluICh5dXJpaS55YWt1YmluQGdtYWlsLmNvbSlcbiAqXG4gKiBQZXJtaXNzaW9uIGlzIGdyYW50ZWQgdG8gdXNlLCBjb3B5LCBtb2RpZnksIGFuZCBkaXN0cmlidXRlIHRoaXMgc29mdHdhcmVcbiAqIHVuZGVyIHRoZSBNSVQgTGljZW5zZS4gU2VlIExJQ0VOU0UgZmlsZSBmb3IgZGV0YWlscy5cbiAqL1xuXG5leHBvcnQgaW50ZXJmYWNlIElMb2dnZXIge1xuICB0cmFjZShtZXNzYWdlPzogYW55LCAuLi5wYXJhbXM6IGFueVtdKTogdm9pZDtcbiAgZGVidWcobWVzc2FnZT86IGFueSwgLi4ucGFyYW1zOiBhbnlbXSk6IHZvaWQ7XG4gIGluZm8obWVzc2FnZT86IGFueSwgLi4ucGFyYW1zOiBhbnlbXSk6IHZvaWQ7XG4gIHdhcm4obWVzc2FnZT86IGFueSwgLi4ucGFyYW1zOiBhbnlbXSk6IHZvaWQ7XG4gIGVycm9yKG1lc3NhZ2U/OiBhbnksIC4uLnBhcmFtczogYW55W10pOiB2b2lkO1xufTtcblxuZXhwb3J0IGZ1bmN0aW9uIGNyZWF0ZUxvZ2dlcih1cmw6IHN0cmluZyk6IElMb2dnZXIge1xuICByZXR1cm4ge1xuICAgIHRyYWNlOiBjb25zb2xlLnRyYWNlLmJpbmQoY29uc29sZSksXG4gICAgZGVidWc6IGNvbnNvbGUuZGVidWcuYmluZChjb25zb2xlKSxcbiAgICBpbmZvOiBjb25zb2xlLmluZm8uYmluZChjb25zb2xlKSxcbiAgICB3YXJuOiBjb25zb2xlLndhcm4uYmluZChjb25zb2xlKSxcbiAgICBlcnJvcjogY29uc29sZS5lcnJvci5iaW5kKGNvbnNvbGUpLFxuICB9O1xufVxuIiwiY29uc3Qgb3MgPSByZXF1aXJlKCdub2RlOm9zJyk7XG5jb25zdCBmcyA9IHJlcXVpcmUoJ25vZGU6ZnMnKTtcbmNvbnN0IHBhdGggPSByZXF1aXJlKCdub2RlOnBhdGgnKTtcblxuY29uc3QgeyBzcGF3bkFzeW5jIH0gPSByZXF1aXJlKFwiQC91dGlscy9DaGlsZFByb2Nlc3NcIik7XG5jb25zdCB7IENNQUtFX0xJU1RTX1RYVCwgVmFsdWVUeXBlIH0gPSByZXF1aXJlKFwiQC9jbWFrZS9Db25zdGFudHNcIik7XG5jb25zdCB7IGNvbnZlcnRUb1ZhbHVlIH0gPSByZXF1aXJlKFwiQC9jbWFrZS9IZWxwZXJcIik7XG5cbmZ1bmN0aW9uIHRvVmFyVHlwZShrZXksIHZhbCkge1xuICBjb25zdCBtYXAgPSB7XG4gICAgQ01BS0VfSU5TVEFMTF9QUkVGSVg6IFZhbHVlVHlwZS5QQVRILFxuICAgIENNQUtFX1RPT0xDSEFJTl9GSUxFOiBWYWx1ZVR5cGUuRklMRVBBVEgsXG4gIH07XG5cbiAgaWYgKHR5cGVvZiB2YWwgPT09IFwiYm9vbGVhblwiKVxuICAgIHJldHVybiBWYWx1ZVR5cGUuQk9PTDtcblxuICBpZiAobWFwLmhhc093blByb3BlcnR5KGtleSkpXG4gICAgcmV0dXJuIG1hcFtrZXldO1xuXG4gIHJldHVybiBWYWx1ZVR5cGUuU1RSSU5HO1xufVxuXG5mdW5jdGlvbiB0b0NhY2hlRW50cnkobmFtZSwgdmFsKVxue1xuICBjb25zdCB0eXBlID0gdG9WYXJUeXBlKG5hbWUsIHZhbCk7XG4gIGNvbnN0IHZhbHVlID0gY29udmVydFRvVmFsdWUodmFsKTtcbiAgcmV0dXJuIGAke25hbWV9OiR7dHlwZX09JHt2YWx1ZX1gO1xufVxuXG5hc3luYyBmdW5jdGlvbiBjb25maWd1cmUoYXJncylcbntcbiAgY29uc3Qgc3Bhd25BcmdzID0gWyAnLUcnLCBhcmdzLmdlbmVyYXRvciBdO1xuICBmb3IgKGNvbnN0IFtrZXksIHZhbF0gb2YgT2JqZWN0LmVudHJpZXMoYXJncy5jYWNoZVZhcmlhYmxlcykpXG4gICAgc3Bhd25BcmdzLnB1c2goJy1EJywgdG9DYWNoZUVudHJ5KGtleSwgdmFsKSk7XG4gIHNwYXduQXJncy5wdXNoKCctUycsIGFyZ3Muc291cmNlRGlyKTtcbiAgc3Bhd25BcmdzLnB1c2goJy1CJywgYXJncy5iaW5hcnlEaXIpO1xuXG4gIGNvbnN0IHJlcyA9IGF3YWl0IHNwYXduQXN5bmMoXCJjbWFrZVwiLCBzcGF3bkFyZ3MsIHtcbiAgICBjd2Q6IGFyZ3MuYmluYXJ5RGlyLFxuICAgIGVudjogYXJncy5lbnZpcm9ubWVudCB8fCBwcm9jZXNzLmVudixcbiAgICBleHRyYToge1xuICAgICAgb3V0cHV0OiBgY21ha2UuY29uZmlndXJlLmxvZ2AsXG4gICAgfSxcbiAgfSk7XG4gIGlmIChyZXMuc3RhdHVzICE9PSAwKSB7XG4gICAgdGhyb3cgYENNYWtlLmNvbmZpZ3VyZSByZXR1cm5lZCBzdGF0dXMgJHtyZXMuc3RhdHVzfWA7XG4gIH1cbn1cblxuYXN5bmMgZnVuY3Rpb24gYnVpbGQoYXJncylcbntcbiAgYXdhaXQgY29uZmlndXJlKGFyZ3MpO1xuXG4gIGNvbnN0IHNwYXduQXJncyA9IFtcbiAgICAnLS1idWlsZCcsICcuJyxcbiAgICAnLS1wYXJhbGxlbCcsIG9zLmF2YWlsYWJsZVBhcmFsbGVsaXNtKCksXG4gIF07XG4gIGNvbnN0IHJlcyA9IGF3YWl0IHNwYXduQXN5bmMoXCJjbWFrZVwiLCBzcGF3bkFyZ3MsIHtcbiAgICBjd2Q6IGFyZ3MuYmluYXJ5RGlyLFxuICAgIGVudjogYXJncy5lbnZpcm9ubWVudCB8fCBwcm9jZXNzLmVudixcbiAgICBleHRyYToge1xuICAgICAgb3V0cHV0OiBgY21ha2UuYnVpbGQubG9nYCxcbiAgICB9LFxuICB9KTtcbiAgaWYgKHJlcy5zdGF0dXMgIT09IDApIHtcbiAgICB0aHJvdyBgQ01ha2UuYnVpbGQgcmV0dXJuZWQgc3RhdHVzICR7cmVzLnN0YXR1c31gO1xuICB9XG59XG5cbmFzeW5jIGZ1bmN0aW9uIGluc3RhbGwoYXJncylcbntcbiAgYXdhaXQgY29uZmlndXJlKGFyZ3MpO1xuXG4gIGNvbnN0IHNwYXduQXJncyA9IFtcbiAgICAnLS1pbnN0YWxsJyxcbiAgICAnLicsXG4gIF07XG4gIGlmIChhcmdzLmluc3RhbGxEaXIpIHtcbiAgICBzcGF3bkFyZ3MucHVzaCgnLS1wcmVmaXgnLCBhcmdzLmluc3RhbGxEaXIpO1xuICB9XG4gIGNvbnN0IHJlcyA9IGF3YWl0IHNwYXduQXN5bmMoXCJjbWFrZVwiLCBzcGF3bkFyZ3MsIHtcbiAgICBjd2Q6IGFyZ3MuYmluYXJ5RGlyLFxuICAgIGVudjogYXJncy5lbnZpcm9ubWVudCB8fCBwcm9jZXNzLmVudixcbiAgICBleHRyYToge1xuICAgICAgb3V0cHV0OiBgY21ha2UuaW5zdGFsbC5sb2dgLFxuICAgIH0sXG4gIH0pO1xuICBpZiAocmVzLnN0YXR1cyAhPT0gMCkge1xuICAgIHRocm93IGBDTWFrZS5pbnN0YWxsIHJldHVybmVkIHN0YXR1cyAke3Jlcy5zdGF0dXN9YDtcbiAgfVxufVxuXG5hc3luYyBmdW5jdGlvbiBjdGVzdChhcmdzKVxue1xuICBhd2FpdCBidWlsZChhcmdzKTtcblxuICBjb25zdCBzcGF3bkFyZ3MgPSBbXG4gIF07XG4gIGNvbnN0IHJlcyA9IGF3YWl0IHNwYXduQXN5bmMoXCJjdGVzdFwiLCBzcGF3bkFyZ3MsIHtcbiAgICBjd2Q6IGFyZ3MuYmluYXJ5RGlyLFxuICAgIGVudjogYXJncy5lbnZpcm9ubWVudCB8fCBwcm9jZXNzLmVudixcbiAgICBleHRyYToge1xuICAgICAgb3V0cHV0OiBgY21ha2UuY3Rlc3QubG9nYCxcbiAgICB9LFxuICB9KTtcbiAgaWYgKHJlcy5zdGF0dXMgIT09IDApIHtcbiAgICB0aHJvdyBgQ1Rlc3QgcmV0dXJuZWQgc3RhdHVzICR7cmVzLnN0YXR1c31gO1xuICB9XG59XG5cbmFzeW5jIGZ1bmN0aW9uIGV4dHJhY3QoYXJncylcbntcbiAgY29uc3Qgc3Bhd25BcmdzID0gWyBcIi1FXCIsIFwidGFyXCIsIFwiLXh2ZlwiLCBhcmdzLmZpbGVuYW1lIF07XG4gIGNvbnN0IHJlcyA9IGF3YWl0IHNwYXduQXN5bmMoXCJjbWFrZVwiLCBzcGF3bkFyZ3MsIHtcbiAgICBjd2Q6IGFyZ3Mud29ya0RpciB8fCBhcmdzLnNvdXJjZURpciB8fCBhcmdzLmJpbmFyeURpcixcbiAgICBlbnY6IGFyZ3MuZW52aXJvbm1lbnQgfHwgcHJvY2Vzcy5lbnYsXG4gICAgZXh0cmE6IHtcbiAgICAgIG91dHB1dDogYXJncy5sb2dGaWxlIHx8IGBjbWFrZS5leHRyYWN0LmxvZ2AsXG4gICAgfSxcbiAgfSk7XG4gIGlmIChyZXMuc3RhdHVzICE9PSAwKSB7XG4gICAgdGhyb3cgYEV4dHJhY3QgcmV0dXJuZWQgc3RhdHVzICR7cmVzLnN0YXR1c31gO1xuICB9XG59XG5cbmFzeW5jIGZ1bmN0aW9uIGdldFByb2plY3RJbmZvKHNvdXJjZSlcbntcbiAgY29uc3Qgc3RhdCA9IGF3YWl0IGZzLnByb21pc2VzLnN0YXQoc291cmNlKTtcbiAgaWYgKHN0YXQuaXNEaXJlY3RvcnkoKSlcbiAgICBzb3VyY2UgPSBwYXRoLnJlc29sdmUoc291cmNlLCBDTUFLRV9MSVNUU19UWFQpO1xuICBjb25zdCBjb250ZW50ID0gYXdhaXQgZnMucHJvbWlzZXMucmVhZEZpbGUoc291cmNlLCB7IGVuY29kaW5nOiAndXRmOCcgfSk7XG5cbiAgY29uc3QgcHJvamVjdFBhdHRlcm4gPSAvcHJvamVjdCAqXFwoICooW14gXSspICooW14pXSopXFwpLztcbiAgY29uc3QgdmVyc2lvblBhdHRlcm4gPSAvVkVSU0lPTiArKFteIF0rKS87XG4gIGxldCBtYXRjaCA9IGNvbnRlbnQubWF0Y2gocHJvamVjdFBhdHRlcm4pO1xuICBjb25zdCBuYW1lID0gbWF0Y2hbMV07XG4gIGNvbnN0IHByb2plY3RDb250ZW50ID0gbWF0Y2hbMl07XG4gIG1hdGNoID0gcHJvamVjdENvbnRlbnQubWF0Y2godmVyc2lvblBhdHRlcm4pO1xuICBjb25zdCB2ZXJzaW9uID0gbWF0Y2hbMV07XG5cbiAgcmV0dXJuIHtcbiAgICBuYW1lLFxuICAgIHZlcnNpb24sXG4gIH07XG59XG5cbmZ1bmN0aW9uIGxpbmVUb1NpbmdsQ29tbWVudChsaW5lKVxue1xuICByZXR1cm4gXCIjIFwiICsgbGluZTtcbn1cblxuZnVuY3Rpb24gbGluZVRvTXVsdGlwbGVDb21tZW50KGxpbmUpXG57XG4gIHJldHVybiBgI1s9PT1bICR7bGluZX0gXT09PV1gO1xufVxuXG5mdW5jdGlvbiBnZW5lcmF0ZWRTY3JpcHROYW1lQ29tbWVudChmaWxlbmFtZSlcbntcbiAgcmV0dXJuIGxpbmVUb1NpbmdsQ29tbWVudChcIkdlbmVyYXRlZCBmcm9tIFwiICsgcGF0aC5iYXNlbmFtZShmaWxlbmFtZSkpO1xufVxuXG5tb2R1bGUuZXhwb3J0cyA9IHtcbiAgY29uZmlndXJlLFxuICBidWlsZCxcbiAgaW5zdGFsbCxcbiAgY3Rlc3QsXG4gIGV4dHJhY3QsXG4gIGdldFByb2plY3RJbmZvLFxuICBsaW5lVG9TaW5nbENvbW1lbnQsXG4gIGxpbmVUb011bHRpcGxlQ29tbWVudCxcbiAgZ2VuZXJhdGVkU2NyaXB0TmFtZUNvbW1lbnQsXG59O1xuIiwiLypcbiAqIE1JVCBMaWNlbnNlXG4gKlxuICogQ29weXJpZ2h0IChjKSAyMDI1ICBZdXJpaSBZYWt1YmluICh5dXJpaS55YWt1YmluQGdtYWlsLmNvbSlcbiAqXG4gKiBQZXJtaXNzaW9uIGlzIGdyYW50ZWQgdG8gdXNlLCBjb3B5LCBtb2RpZnksIGFuZCBkaXN0cmlidXRlIHRoaXMgc29mdHdhcmVcbiAqIHVuZGVyIHRoZSBNSVQgTGljZW5zZS4gU2VlIExJQ0VOU0UgZmlsZSBmb3IgZGV0YWlscy5cbiAqL1xuXG5pbXBvcnQgcGF0aCBmcm9tIFwibm9kZTpwYXRoXCI7XG5pbXBvcnQgZnMgZnJvbSBcIm5vZGU6ZnNcIjtcbmltcG9ydCB7IHNwYXduIH0gZnJvbSBcIm5vZGU6Y2hpbGRfcHJvY2Vzc1wiO1xuXG5leHBvcnQgZnVuY3Rpb24gc3Bhd25Bc3luYyhjb21tYW5kOiBzdHJpbmcsIGFyZ3M6IHN0cmluZ1tdLCBvcHRpb25zPzogYW55KTogUHJvbWlzZTx1bmtub3duPiB7XG4gIGxldCBmZCA9IG51bGw7XG4gIGxldCB2ZXJib3NlID0gZmFsc2U7XG4gIGlmIChvcHRpb25zICYmIG9wdGlvbnMuZXh0cmEpIHtcbiAgICBpZiAob3B0aW9ucy5leHRyYS52ZXJib3NlKVxuICAgICAgdmVyYm9zZSA9IHRydWU7XG4gICAgaWYgKG9wdGlvbnMuZXh0cmEub3V0cHV0KSB7XG4gICAgICBsZXQgbG9nZmlsZSA9IG9wdGlvbnMuZXh0cmEub3V0cHV0O1xuICAgICAgaWYgKCFwYXRoLmlzQWJzb2x1dGUobG9nZmlsZSkgJiYgb3B0aW9ucy5jd2QpIHtcbiAgICAgICAgbG9nZmlsZSA9IHBhdGgucmVzb2x2ZShvcHRpb25zLmN3ZCwgbG9nZmlsZSk7XG4gICAgICB9XG4gICAgICBmZCA9IGZzLm9wZW5TeW5jKGxvZ2ZpbGUsIFwidytcIiwgMG82NjYpO1xuICAgIH1cbiAgfVxuICByZXR1cm4gbmV3IFByb21pc2UoKHJlc29sdmUsIHJlamVjdCkgPT4ge1xuICAgIGlmIChmZCB8fCB2ZXJib3NlKSB7XG4gICAgICB2ZXJib3NlICYmIGNvbnNvbGUuaW5mbyhbIHBhdGguYmFzZW5hbWUoY29tbWFuZCksIC4uLmFyZ3MgXS5qb2luKFwiIFwiKSk7XG4gICAgICBmZCAmJiBmcy53cml0ZVN5bmMoZmQsIEpTT04uc3RyaW5naWZ5KHtjb21tYW5kLCBhcmdzLCBvcHRpb25zIH0sIG51bGwsIDIpICsgXCJcXG5cIik7XG4gICAgfVxuICAgIGNvbnN0IGV4ZWMgPSBzcGF3bihjb21tYW5kLCBhcmdzLCBvcHRpb25zKTtcbiAgICBleGVjLnN0ZG91dC5vbihcImRhdGFcIiwgKGRhdGEpID0+IHtcbiAgICAgIHByb2Nlc3Muc3Rkb3V0LndyaXRlKGRhdGEpO1xuICAgICAgZmQgJiYgZnMud3JpdGVTeW5jKGZkLCBkYXRhKTtcbiAgICB9KTtcbiAgICBleGVjLnN0ZGVyci5vbihcImRhdGFcIiwgKGRhdGEpID0+IHtcbiAgICAgIHByb2Nlc3Muc3RkZXJyLndyaXRlKGRhdGEpO1xuICAgICAgZmQgJiYgZnMud3JpdGVTeW5jKGZkLCBkYXRhKTtcbiAgICB9KTtcbiAgICBleGVjLm9uKFwiY2xvc2VcIiwgKHN0YXR1cykgPT4ge1xuICAgICAgZmQgJiYgZnMuY2xvc2VTeW5jKGZkKTtcbiAgICAgIHJlc29sdmUoe3N0YXR1c30pO1xuICAgIH0pO1xuICB9KTtcbn1cbiIsIi8qXG4gKiBNSVQgTGljZW5zZVxuICpcbiAqIENvcHlyaWdodCAoYykgMjAyNSAgWXVyaWkgWWFrdWJpbiAoeXVyaWkueWFrdWJpbkBnbWFpbC5jb20pXG4gKlxuICogUGVybWlzc2lvbiBpcyBncmFudGVkIHRvIHVzZSwgY29weSwgbW9kaWZ5LCBhbmQgZGlzdHJpYnV0ZSB0aGlzIHNvZnR3YXJlXG4gKiB1bmRlciB0aGUgTUlUIExpY2Vuc2UuIFNlZSBMSUNFTlNFIGZpbGUgZm9yIGRldGFpbHMuXG4gKi9cblxuaW1wb3J0IGZzIGZyb20gXCJub2RlOmZzXCI7XG5pbXBvcnQgcGF0aCBmcm9tIFwibm9kZTpwYXRoXCI7XG5pbXBvcnQgdXJsIGZyb20gXCJub2RlOnVybFwiO1xuXG5leHBvcnQgYXN5bmMgZnVuY3Rpb24gcGF0aEV4aXN0cyhwYXRoOiBzdHJpbmcpIHtcbiAgdHJ5IHtcbiAgICByZXR1cm4gISEoYXdhaXQgZnMucHJvbWlzZXMuc3RhdChwYXRoKSk7XG4gIH0gY2F0Y2gge1xuICAgIHJldHVybiBmYWxzZTtcbiAgfVxufVxuXG5leHBvcnQgZnVuY3Rpb24gcGF0aEV4aXN0c1N5bmMocGF0aDogc3RyaW5nKSB7XG4gIHRyeSB7XG4gICAgcmV0dXJuICEhZnMuc3RhdFN5bmMocGF0aCk7XG4gIH0gY2F0Y2gge1xuICAgIHJldHVybiBmYWxzZTtcbiAgfVxufVxuXG5leHBvcnQgYXN5bmMgZnVuY3Rpb24gZmlsZUV4aXN0cyhwYXRoOiBzdHJpbmcpIHtcbiAgdHJ5IHtcbiAgICByZXR1cm4gKGF3YWl0IGZzLnByb21pc2VzLnN0YXQocGF0aCkpLmlzRmlsZSgpO1xuICB9IGNhdGNoIHtcbiAgICByZXR1cm4gZmFsc2U7XG4gIH1cbn1cblxuZXhwb3J0IGZ1bmN0aW9uIGZpbGVFeGlzdHNTeW5jKHBhdGg6IHN0cmluZykge1xuICB0cnkge1xuICAgIHJldHVybiBmcy5zdGF0U3luYyhwYXRoKS5pc0ZpbGUoKTtcbiAgfSBjYXRjaCB7XG4gICAgcmV0dXJuIGZhbHNlO1xuICB9IFxufVxuXG5leHBvcnQgYXN5bmMgZnVuY3Rpb24gZGlyZWN0b3J5RXhpc3RzKHBhdGg6IHN0cmluZykge1xuICB0cnkge1xuICAgIHJldHVybiAoYXdhaXQgZnMucHJvbWlzZXMuc3RhdChwYXRoKSkuaXNEaXJlY3RvcnkoKTtcbiAgfSBjYXRjaCB7XG4gICAgcmV0dXJuIGZhbHNlO1xuICB9XG59XG5cbmV4cG9ydCBmdW5jdGlvbiBkaXJlY3RvcnlFeGlzdHNTeW5jKHBhdGg6IHN0cmluZykge1xuICB0cnkge1xuICAgcmV0dXJuIGZzLnN0YXRTeW5jKHBhdGgpLmlzRGlyZWN0b3J5KCk7XG4gIH0gY2F0Y2gge1xuICAgIHJldHVybiBmYWxzZTtcbiAgfVxufVxuXG5leHBvcnQgZnVuY3Rpb24gZXh0bmFtZShmdWxscGF0aDogc3RyaW5nLCBvcHRpb25zOiBhbnkpIHtcbiAgaWYgKG9wdGlvbnM/Lmxvbmdlc3QpIHtcbiAgICBjb25zdCBmaWxlbmFtZSA9IHBhdGguYmFzZW5hbWUoZnVsbHBhdGgpO1xuICAgIGNvbnN0IGluZGV4ID0gZmlsZW5hbWUuaW5kZXhPZignLicpO1xuICAgIHJldHVybiBpbmRleCAhPSAtMSA/IGZpbGVuYW1lLnN1YnN0cmluZyhpbmRleCkgOiAnJztcbiAgfVxuXG4gIHJldHVybiBwYXRoLmV4dG5hbWUoZnVsbHBhdGgpO1xufVxuXG5leHBvcnQgYXN5bmMgZnVuY3Rpb24gZmlsZUxpc3QoZGlybmFtZTogc3RyaW5nLCBvcHRpb25zOiBhbnkpOiBQcm9taXNlPEFycmF5PHN0cmluZz4+IHtcbiAgY29uc3QgbGlzdCA9IG5ldyBBcnJheTxzdHJpbmc+O1xuICBpZiAoYXdhaXQgZGlyZWN0b3J5RXhpc3RzKGRpcm5hbWUpKSB7XG4gICAgZm9yIChjb25zdCBpdGVyIG9mIGF3YWl0IGZzLnByb21pc2VzLnJlYWRkaXIoZGlybmFtZSkpIHtcbiAgICAgIGNvbnN0IGZpbGVwYXRoID0gcGF0aC5yZXNvbHZlKGRpcm5hbWUsIGl0ZXIpO1xuICAgICAgY29uc3Qgc3RhdCA9IGF3YWl0IGZzLnByb21pc2VzLnN0YXQoZmlsZXBhdGgpO1xuICAgICAgaWYgKHN0YXQuaXNGaWxlKCkpIHtcbiAgICAgICAgbGlzdC5wdXNoKG9wdGlvbnMucmVsYXRpdmUgPyBwYXRoLnJlbGF0aXZlKG9wdGlvbnMucmVsYXRpdmUsIGZpbGVwYXRoKSA6IGZpbGVwYXRoKTtcbiAgICAgIH1cbiAgICAgIGVsc2UgaWYgKG9wdGlvbnMucmVjdXJzaXZlICYmIHN0YXQuaXNEaXJlY3RvcnkoKSkge1xuICAgICAgICBmb3IgKGNvbnN0IGZuYW1lIG9mIGF3YWl0IGZpbGVMaXN0KGZpbGVwYXRoLCBvcHRpb25zKSlcbiAgICAgICAgICBsaXN0LnB1c2goZm5hbWUpO1xuICAgICAgfVxuICAgIH1cbiAgfVxuICByZXR1cm4gbGlzdDtcbn1cblxuZXhwb3J0IGFzeW5jIGZ1bmN0aW9uIHNhdmVJZkRpZmZlcmVudChmaWxlbmFtZTogc3RyaW5nLCBjb250ZW50OiBzdHJpbmcpIHtcbiAgaWYgKGF3YWl0IGZpbGVFeGlzdHMoZmlsZW5hbWUpKSB7XG4gICAgY29uc3Qgb2xkQ29udGVudCA9IGF3YWl0IGZzLnByb21pc2VzLnJlYWRGaWxlKGZpbGVuYW1lLCB7IGVuY29kaW5nOiBcInV0ZjhcIiB9KTtcbiAgICBpZiAoY29udGVudCA9PSBvbGRDb250ZW50KVxuICAgICAgcmV0dXJuIGZhbHNlO1xuICB9XG5cbiAgYXdhaXQgZnMucHJvbWlzZXMubWtkaXIocGF0aC5kaXJuYW1lKGZpbGVuYW1lKSwgeyByZWN1cnNpdmU6IHRydWUgfSk7XG4gIGF3YWl0IGZzLnByb21pc2VzLndyaXRlRmlsZShmaWxlbmFtZSwgY29udGVudCwgeyBlbmNvZGluZzogXCJ1dGY4XCIgfSk7XG5cbiAgcmV0dXJuIHRydWU7XG59XG5cbmV4cG9ydCBmdW5jdGlvbiBnZXRQYXRoU3RyaW5nKHN0cjogc3RyaW5nKSB7XG4gIHJldHVybiBzdHIuc3RhcnRzV2l0aChcImZpbGU6Ly9cIikgPyB1cmwuZmlsZVVSTFRvUGF0aChzdHIpIDogc3RyO1xufVxuIiwiLypcbiAqIE1JVCBMaWNlbnNlXG4gKlxuICogQ29weXJpZ2h0IChjKSAyMDI1ICBZdXJpaSBZYWt1YmluICh5dXJpaS55YWt1YmluQGdtYWlsLmNvbSlcbiAqXG4gKiBQZXJtaXNzaW9uIGlzIGdyYW50ZWQgdG8gdXNlLCBjb3B5LCBtb2RpZnksIGFuZCBkaXN0cmlidXRlIHRoaXMgc29mdHdhcmVcbiAqIHVuZGVyIHRoZSBNSVQgTGljZW5zZS4gU2VlIExJQ0VOU0UgZmlsZSBmb3IgZGV0YWlscy5cbiAqL1xuXG5pbXBvcnQgcGF0aCBmcm9tIFwibm9kZTpwYXRoXCI7XG5pbXBvcnQgZnMgZnJvbSBcIm5vZGU6ZnNcIjtcbmltcG9ydCBodHRwIGZyb20gXCJodHRwXCI7XG5pbXBvcnQgaHR0cHMgZnJvbSBcImh0dHBzXCI7XG5cbmltcG9ydCB7IGNyZWF0ZUxvZ2dlciB9IGZyb20gXCJAL2xvZ2dlclwiO1xuXG5jb25zdCBsb2dnZXIgPSBjcmVhdGVMb2dnZXIoaW1wb3J0Lm1ldGEudXJsKTtcblxuY29uc3QgaHR0cE9wdGlvbnMgPSB7XG4gIG1ldGhvZDogJ0dFVCcsXG4gIHRpbWVvdXQ6IDUwMDAsXG4gIGhlYWRlcnM6IHtcbiAgICBcIlVzZXItQWdlbnRcIjogUFJPSkVDVF9OQU1FICsgXCIvXCIgKyBQUk9KRUNUX1ZFUlNJT04sXG4gICAgXCJBY2NlcHRcIjogXCIqLypcIixcbiAgfSxcbn07XG5cbmZ1bmN0aW9uIGh0dHBSZXF1ZXN0KHVybDogc3RyaW5nLCBvcHRpb25zOiBodHRwLlJlcXVlc3RPcHRpb25zIHwgaHR0cHMuUmVxdWVzdE9wdGlvbnMsIGNhbGxiYWNrOiBhbnkpIHtcbiAgaWYgKHVybC5zdGFydHNXaXRoKFwiaHR0cHM6Ly9cIikpXG4gICAgcmV0dXJuIGh0dHBzLnJlcXVlc3QodXJsLCBvcHRpb25zLCBjYWxsYmFjayk7XG4gIHJldHVybiBodHRwLnJlcXVlc3QodXJsLCBvcHRpb25zLCBjYWxsYmFjayk7XG59O1xuXG5leHBvcnQgZnVuY3Rpb24gcmVxdWVzdEdldCh1cmw6IHN0cmluZykge1xuICByZXR1cm4gbmV3IFByb21pc2UoKHJlc29sdmUsIHJlamVjdCkgPT4ge1xuXG4gICAgY29uc3Qgb25FcnJvciA9IChlcnI6IGFueSkgPT4ge1xuICAgICAgY29uc3QgbWVzc2FnZSA9IFwiRW5jb3VudGVyZWQgYW4gZXJyb3IgdHJ5aW5nIHRvIG1ha2UgYSByZXF1ZXN0OiBcIiArIGVyci5tZXNzYWdlO1xuICAgICAgbG9nZ2VyLmVycm9yKG1lc3NhZ2UsIGVycik7XG4gICAgICByZWplY3QobWVzc2FnZSk7XG4gICAgfTtcblxuICAgIGNvbnN0IG9uVGltZW91dCA9IChyZXF1ZXN0OiBhbnkpID0+IHtcbiAgICAgIHJlcXVlc3QuZGVzdHJveSgpO1xuICAgICAgbG9nZ2VyLmVycm9yKFwiICBUaW1lb3V0XCIsIHVybCk7XG4gICAgICByZWplY3QoXCJUaW1lb3V0XCIpO1xuICAgIH1cblxuICAgIGNvbnN0IG9uUmVxdWVzdCA9IChyZXNwb25zZTogYW55KSA9PiB7XG4gICAgICBzd2l0Y2ggKHJlc3BvbnNlLnN0YXR1c0NvZGUpIHtcbiAgICAgIGNhc2UgMjAwOlxuICAgICAgICBjb25zdCBjaHVua3M6IEFycmF5PEJ1ZmZlcj4gPSBbXTtcbiAgICAgICAgcmVzcG9uc2Uub24oXCJkYXRhXCIsIChjaHVuazogQnVmZmVyKSA9PiBjaHVua3MucHVzaChjaHVuaykpO1xuICAgICAgICByZXNwb25zZS5vbihcImVuZFwiLCAoKSA9PiByZXNvbHZlKEJ1ZmZlci5jb25jYXQoY2h1bmtzKSkpO1xuICAgICAgICByZXNwb25zZS5vbignY2xvc2UnLCAoKSA9PiBsb2dnZXIuaW5mbygnICBDbG9zZScpKTtcbiAgICAgICAgYnJlYWs7XG5cbiAgICAgIGNhc2UgMzAxOlxuICAgICAgY2FzZSAzMDI6XG4gICAgICAgIHJlc3BvbnNlLnJlc3VtZSgpO1xuICAgICAgICBsb2dnZXIuaW5mbyhgUmVkaXJlY3QgdG8gJHtyZXNwb25zZS5oZWFkZXJzLmxvY2F0aW9ufWApO1xuICAgICAgICBjb25zdCByZXF1ZXN0ID0gaHR0cFJlcXVlc3QocmVzcG9uc2UuaGVhZGVycy5sb2NhdGlvbiwgaHR0cE9wdGlvbnMsIG9uUmVxdWVzdCk7XG4gICAgICAgIHJlcXVlc3Qub24oJ3RpbWVvdXQnLCBvblRpbWVvdXQuYmluZChudWxsLCByZXF1ZXN0KSk7XG4gICAgICAgIHJlcXVlc3Qub24oJ2Vycm9yJywgb25FcnJvcik7XG4gICAgICAgIHJlcXVlc3QuZW5kKCk7XG4gICAgICAgIGJyZWFrO1xuXG4gICAgICBkZWZhdWx0OlxuICAgICAgICByZXNwb25zZS5yZXN1bWUoKTtcbiAgICAgICAgY29uc3QgbWVzc2FnZSA9IFwiRGlkIG5vdCBnZXQgYW4gT0sgZnJvbSB0aGUgc2VydmVyLiBDb2RlOiBcIiArIHJlc3BvbnNlLnN0YXR1c0NvZGU7XG4gICAgICAgIGxvZ2dlci5lcnJvcihtZXNzYWdlKTtcbiAgICAgICAgcmVqZWN0KG1lc3NhZ2UpO1xuICAgICAgICBicmVhaztcbiAgICAgIH1cbiAgICB9O1xuXG4gICAgbG9nZ2VyLmluZm8oYHdnZXQgJHt1cmx9YCk7XG4gICAgY29uc3QgcmVxdWVzdCA9IGh0dHBSZXF1ZXN0KHVybCwgaHR0cE9wdGlvbnMsIG9uUmVxdWVzdCk7XG4gICAgcmVxdWVzdC5vbigndGltZW91dCcsIG9uVGltZW91dC5iaW5kKG51bGwsIHJlcXVlc3QpKTtcbiAgICByZXF1ZXN0Lm9uKCdlcnJvcicsIG9uRXJyb3IpO1xuICAgIHJlcXVlc3QuZW5kKCk7XG4gIH0pO1xufTtcblxuZXhwb3J0IGZ1bmN0aW9uIGRvd25sb2FkRmlsZSh1cmw6IHN0cmluZywgZmlsZTogc3RyaW5nKSB7XG4gIHJldHVybiBuZXcgUHJvbWlzZSgocmVzb2x2ZSwgcmVqZWN0KSA9PiB7XG4gICAgY29uc3QgZmlsZW5hbWUgPSBwYXRoLmJhc2VuYW1lKHVybCk7XG5cbiAgICBjb25zdCBjbGllbnQgPSAoKCkgPT4ge1xuICAgICAgaWYgKGZpbGUpIHtcbiAgICAgICAgY29uc3QgZmQgPSBmcy5vcGVuU3luYyhmaWxlLCBcIndcIik7XG4gICAgICAgIHJldHVybiB7XG4gICAgICAgICAgb25EYXRhOiAoY2h1bms6IEJ1ZmZlcikgPT4ge1xuICAgICAgICAgICAgZnMud3JpdGVTeW5jKGZkLCBjaHVuayk7XG4gICAgICAgICAgfSxcbiAgICAgICAgICBvbkVuZDogKCkgPT4ge1xuICAgICAgICAgICAgZnMuY2xvc2VTeW5jKGZkKTtcbiAgICAgICAgICAgIHJlc29sdmUodW5kZWZpbmVkKTtcbiAgICAgICAgICB9LFxuICAgICAgICB9O1xuICAgICAgfVxuICAgICAgZWxzZSB7XG4gICAgICAgIGNvbnN0IGNodW5rczogQXJyYXk8QnVmZmVyPiA9IFtdO1xuICAgICAgICByZXR1cm4ge1xuICAgICAgICAgIG9uRGF0YTogKGNodW5rOiBCdWZmZXIpID0+IHtcbiAgICAgICAgICAgIGNodW5rcy5wdXNoKGNodW5rKTtcbiAgICAgICAgICB9LFxuICAgICAgICAgIG9uRW5kOiAoKSA9PiB7XG4gICAgICAgICAgICByZXNvbHZlKEJ1ZmZlci5jb25jYXQoY2h1bmtzKSk7XG4gICAgICAgICAgfSxcbiAgICAgICAgfTtcbiAgICAgIH1cbiAgICB9KSgpO1xuICBcbiAgICBjb25zdCBzdGFydFJlcXVlc3QgPSAodXJsOiBzdHJpbmcsIGNhbGxiYWNrOiBhbnkpID0+IHtcbiAgICAgIGNvbnN0IHJlcXVlc3QgPSBodHRwcy5yZXF1ZXN0KHVybCwgaHR0cE9wdGlvbnMsIGNhbGxiYWNrKTtcbiAgICAgIGlmIChyZXF1ZXN0KSB7XG4gICAgICAgIHJlcXVlc3Qub24oJ2Vycm9yJywgKGVycm9yKSA9PiByZWplY3QoZXJyb3IpKTtcbiAgICAgICAgcmVxdWVzdC5lbmQoKTsgXG4gICAgICB9XG4gICAgICBlbHNlIHtcbiAgICAgICAgcmVqZWN0KGBVcmwgc2NoZW1lIG5vdCBzdXBwb3J0ZWQgZm9yICR7dXJsfWApO1xuICAgICAgfVxuICAgIH07XG5cbiAgICBjb25zdCBvblJlcXVlc3QgPSAocmVzcG9uc2U6IGFueSkgPT4ge1xuICAgICAgc3dpdGNoIChyZXNwb25zZS5zdGF0dXNDb2RlKSB7XG4gICAgICBjYXNlIDIwMDpcbiAgICAgICAgbG9nZ2VyLmluZm8oYENvbm5jdGVkIHRvICR7cmVzcG9uc2UucmVxLmhvc3R9YCk7XG4gICAgICAgIGxvZ2dlci5pbmZvKGBEb3dubG9hZGluZyAke2ZpbGVuYW1lfWApO1xuICAgICAgICByZXNwb25zZS5vbignZGF0YScsIGNsaWVudC5vbkRhdGEpO1xuICAgICAgICByZXNwb25zZS5vbignZW5kJywgY2xpZW50Lm9uRW5kKTtcbiAgICAgICAgcmVzcG9uc2Uub24oJ2Nsb3NlJywgKCkgPT4gbG9nZ2VyLmluZm8oYERvbmVgKSk7XG4gICAgICAgIGJyZWFrO1xuXG4gICAgICBjYXNlIDMwMTpcbiAgICAgIGNhc2UgMzAyOlxuICAgICAgICByZXNwb25zZS5yZXN1bWUoKTtcbiAgICAgICAgbG9nZ2VyLmluZm8oYFJlc29sdmluZyAke3Jlc3BvbnNlLmhlYWRlcnMubG9jYXRpb259YCk7XG4gICAgICAgIHN0YXJ0UmVxdWVzdChyZXNwb25zZS5oZWFkZXJzLmxvY2F0aW9uLCBvblJlcXVlc3QpO1xuICAgICAgICBicmVhaztcblxuICAgICAgZGVmYXVsdDpcbiAgICAgICAgcmVzcG9uc2UucmVzdW1lKCk7XG4gICAgICAgIHJlamVjdChgRGlkIG5vdCBnZXQgYW4gT0sgZnJvbSB0aGUgc2VydmVyLiBDb2RlOiAke3Jlc3BvbnNlLnN0YXR1c0NvZGV9YCk7XG4gICAgICAgIGJyZWFrO1xuICAgICAgfVxuICAgIH07XG5cbiAgICBsb2dnZXIuaW5mbyhgUmVxdWVzdCB0byAke3VybH1gKTtcbiAgICBzdGFydFJlcXVlc3QodXJsLCBvblJlcXVlc3QpO1xuICB9KTtcbn1cbiIsIi8qXG4gKiBNSVQgTGljZW5zZVxuICpcbiAqIENvcHlyaWdodCAoYykgMjAyNSAgWXVyaWkgWWFrdWJpbiAoeXVyaWkueWFrdWJpbkBnbWFpbC5jb20pXG4gKlxuICogUGVybWlzc2lvbiBpcyBncmFudGVkIHRvIHVzZSwgY29weSwgbW9kaWZ5LCBhbmQgZGlzdHJpYnV0ZSB0aGlzIHNvZnR3YXJlXG4gKiB1bmRlciB0aGUgTUlUIExpY2Vuc2UuIFNlZSBMSUNFTlNFIGZpbGUgZm9yIGRldGFpbHMuXG4gKi9cblxuZXhwb3J0IGNvbnN0IGltcG9ydE1vZHVsZSA9IGFzeW5jIChuYW1lKSA9PiBpbXBvcnQoLyogd2VicGFja0lnbm9yZTogdHJ1ZSAqLyBuYW1lKTtcbiIsImltcG9ydCBmcyBmcm9tIFwibm9kZTpmc1wiO1xuaW1wb3J0IHBhdGggZnJvbSBcIm5vZGU6cGF0aFwiO1xuXG5pbXBvcnQgeyBmaWxlTGlzdCB9IGZyb20gXCJAL3V0aWxzL0ZpbGVTeXN0ZW1cIjtcbmltcG9ydCB7IGNyZWF0ZUxvZ2dlciB9IGZyb20gXCJAL2xvZ2dlclwiO1xuXG5jb25zdCBsb2dnZXIgPSBjcmVhdGVMb2dnZXIoaW1wb3J0Lm1ldGEudXJsKTtcblxuZXhwb3J0IGFzeW5jIGZ1bmN0aW9uIG1ha2VQYXRjaChzcmNEaXI6IHN0cmluZywgZGVzdERpcjogc3RyaW5nKSB7XG4gIGxvZ2dlci5pbmZvKGBNYWtlIHBhdGNoICR7c3JjRGlyfSB0byAke2Rlc3REaXJ9YCk7XG4gIGNvbnN0IGxpc3QgPSBhd2FpdCBmaWxlTGlzdChzcmNEaXIsIHsgcmVsYXRpdmU6IHNyY0RpciwgcmVjdXJzaXZlOiB0cnVlIH0pO1xuICBmb3IgKGNvbnN0IGl0ZXIgb2YgbGlzdCkge1xuICAgIGNvbnN0IHNvdXJjZSA9IHBhdGgucmVzb2x2ZShzcmNEaXIsIGl0ZXIpO1xuICAgIGNvbnN0IGRlc3RpbmF0aW9uID0gcGF0aC5yZXNvbHZlKGRlc3REaXIsIGl0ZXIpO1xuICAgIGF3YWl0IGZzLnByb21pc2VzLmNwKHNvdXJjZSwgZGVzdGluYXRpb24sIHsgZm9yY2U6IHRydWUgfSk7XG4gICAgbG9nZ2VyLmluZm8oYCBSZXBsYWNlZCAke2l0ZXJ9YCk7XG4gIH1cbn1cbiIsIi8qXG4gKiBNSVQgTGljZW5zZVxuICpcbiAqIENvcHlyaWdodCAoYykgMjAyNSAgWXVyaWkgWWFrdWJpbiAoeXVyaWkueWFrdWJpbkBnbWFpbC5jb20pXG4gKlxuICogUGVybWlzc2lvbiBpcyBncmFudGVkIHRvIHVzZSwgY29weSwgbW9kaWZ5LCBhbmQgZGlzdHJpYnV0ZSB0aGlzIHNvZnR3YXJlXG4gKiB1bmRlciB0aGUgTUlUIExpY2Vuc2UuIFNlZSBMSUNFTlNFIGZpbGUgZm9yIGRldGFpbHMuXG4gKi9cblxuY29uc3QgcmVxdWlyZUltcGwgPSBldmFsKFwicmVxdWlyZVwiKTtcblxuZXhwb3J0IGZ1bmN0aW9uIHJlcXVpcmVSZXNvbHZlKG5hbWU6IHN0cmluZykge1xuICBpZiAodHlwZW9mIGltcG9ydC5tZXRhLnJlc29sdmUgPT09ICdmdW5jdGlvbicpXG4gICAgcmV0dXJuIGltcG9ydC5tZXRhLnJlc29sdmUobmFtZSk7XG4gIGlmICh0eXBlb2YgcmVxdWlyZUltcGwgIT09ICd1bmRlZmluZWQnKVxuICAgIHJldHVybiByZXF1aXJlSW1wbC5yZXNvbHZlKG5hbWUpO1xuICB0aHJvdyBuZXcgRXJyb3IoXCJObyBjb21wYXRpYmxlIG1vZHVsZSByZXNvbHZlciBmb3VuZFwiKTtcbn1cblxuZXhwb3J0IHsgaW1wb3J0TW9kdWxlIH0gZnJvbSBcIi4vSW1wb3J0TW9kdWxlLm1qc1wiO1xuIiwiLypcbiAqIE1JVCBMaWNlbnNlXG4gKlxuICogQ29weXJpZ2h0IChjKSAyMDI1ICBZdXJpaSBZYWt1YmluICh5dXJpaS55YWt1YmluQGdtYWlsLmNvbSlcbiAqXG4gKiBQZXJtaXNzaW9uIGlzIGdyYW50ZWQgdG8gdXNlLCBjb3B5LCBtb2RpZnksIGFuZCBkaXN0cmlidXRlIHRoaXMgc29mdHdhcmVcbiAqIHVuZGVyIHRoZSBNSVQgTGljZW5zZS4gU2VlIExJQ0VOU0UgZmlsZSBmb3IgZGV0YWlscy5cbiAqL1xuXG5leHBvcnQgZnVuY3Rpb24gZXF1YWxWYWx1ZShhOiBhbnksIGI6IGFueSk6IGJvb2xlYW4ge1xuICBpZiAoYSA9PT0gYilcbiAgICByZXR1cm4gdHJ1ZTtcblxuICBpZiAoYSA9PT0gdW5kZWZpbmVkIHx8IGIgPT09IHVuZGVmaW5lZClcbiAgICByZXR1cm4gZmFsc2U7XG5cbiAgaWYgKHR5cGVvZiBhICE9PSBcIm9iamVjdFwiIHx8IHR5cGVvZiBiICE9PSBcIm9iamVjdFwiKVxuICAgIHJldHVybiBmYWxzZTtcblxuICBjb25zdCBrMSA9IE9iamVjdC5rZXlzKGEpO1xuICBjb25zdCBrMiA9IE9iamVjdC5rZXlzKGIpO1xuXG4gIGlmIChrMS5sZW5ndGggIT0gazIubGVuZ3RoKVxuICAgIHJldHVybiBmYWxzZTtcblxuICBmb3IgKGNvbnN0IGtleSBvZiBrMSkge1xuICAgIGlmICghT2JqZWN0Lmhhc093bihiLCBrZXkpIHx8ICFlcXVhbFZhbHVlKGFba2V5XSwgYltrZXldKSlcbiAgICAgIHJldHVybiBmYWxzZTtcbiAgfVxuXG4gIHJldHVybiB0cnVlO1xufVxuXG5leHBvcnQgZnVuY3Rpb24gY29weVZhbHVlKG86IGFueSk6IGFueSB7XG4gIGlmICghbyB8fCB0eXBlb2YgbyAhPT0gXCJvYmplY3RcIilcbiAgICByZXR1cm4gbztcbiAgaWYgKEFycmF5LmlzQXJyYXkobykpIHtcbiAgICBjb25zdCByZXN1bHQgPSBbXTtcbiAgICBmb3IgKGNvbnN0IGl0ZXIgb2YgbylcbiAgICAgIHJlc3VsdC5wdXNoKGNvcHlWYWx1ZShpdGVyKSk7XG4gICAgcmV0dXJuIHJlc3VsdDtcbiAgfVxuICBlbHNlIHtcbiAgICBjb25zdCByZXN1bHQgPSB7fSBhcyBhbnk7XG4gICAgZm9yIChjb25zdCBba2V5LHZhbF0gb2YgT2JqZWN0LmVudHJpZXMobykpXG4gICAgICByZXN1bHRba2V5XSA9IGNvcHlWYWx1ZSh2YWwpO1xuICAgIHJldHVybiByZXN1bHQ7XG4gIH1cbn1cblxuZXhwb3J0IGZ1bmN0aW9uIGFzc2lnbk9iamVjdCh0YXJnZXQ6IGFueSwgc291cmNlOiBhbnkpIHtcbiAgaWYgKEFycmF5LmlzQXJyYXkodGFyZ2V0KSAmJiBBcnJheS5pc0FycmF5KHNvdXJjZSkpIHtcbiAgICBmb3IgKGNvbnN0IGl0ZXIgb2Ygc291cmNlKVxuICAgICAgdGFyZ2V0LnB1c2goaXRlcik7XG4gIH1cbiAgZWxzZSB7XG4gICAgZm9yIChjb25zdCBrZXkgb2YgT2JqZWN0LmtleXMoc291cmNlKSkge1xuICAgICAgY29uc3QgYSA9IHRhcmdldFtrZXldLCBiID0gc291cmNlW2tleV07XG4gICAgICBpZiAoYSAmJiB0eXBlb2YgYSA9PT0gXCJvYmplY3RcIiAmJiBiICYmIHR5cGVvZiBiID09PSBcIm9iamVjdFwiKVxuICAgICAgICBhc3NpZ25PYmplY3QoYSwgYik7XG4gICAgICBlbHNlXG4gICAgICAgIHRhcmdldFtrZXldID0gY29weVZhbHVlKGIpO1xuICAgIH1cbiAgfVxufVxuXG5leHBvcnQgZnVuY3Rpb24gYXJyYXlXcmFwcGVyKHZhbHVlOiBhbnkpIHtcbiAgaWYgKHZhbHVlID09PSB1bmRlZmluZWQgfHwgQXJyYXkuaXNBcnJheSh2YWx1ZSkpXG4gICAgcmV0dXJuIHZhbHVlO1xuICByZXR1cm4gWyB2YWx1ZSBdO1xufVxuIiwiY29uc3QgZnMgPSByZXF1aXJlKCdmcycpO1xuXG5jbGFzcyBTZXR0aW5nc1N0b3JhZ2Uge1xuICBfZmlsZW5hbWU7XG4gIF9lbmNvZGluZyA9IFwidXRmLThcIjtcbiAgX3NldHRpbmdzO1xuICBfY3VycmVudDtcblxuICBjb25zdHJ1Y3RvcihmaWxlbmFtZSlcbiAge1xuICAgIHRoaXMuX2ZpbGVuYW1lID0gZmlsZW5hbWU7XG4gIH1cblxuICBhc3luYyBwdXNoKG5hbWUpXG4gIHtcbiAgICBpZiAoIXRoaXMuX3NldHRpbmdzKVxuICAgICAgYXdhaXQgdGhpcy5sb2FkKCk7XG4gICAgbGV0IG9iamVjdCA9IHRoaXMuX2N1cnJlbnQub2JqZWN0W25hbWVdO1xuICAgIGlmICghb2JqZWN0KVxuICAgICAgb2JqZWN0ID0gdGhpcy5fY3VycmVudC5vYmplY3RbbmFtZV0gPSB7fTtcbiAgICB0aGlzLl9jdXJyZW50ID0geyBwYXJlbnQ6IHRoaXMuX2N1cnJlbnQsIG9iamVjdCB9O1xuICB9XG5cbiAgYXN5bmMgcG9wKClcbiAge1xuICAgIGlmICghdGhpcy5fc2V0dGluZ3MpXG4gICAgICBhd2FpdCB0aGlzLmxvYWQoKTtcbiAgICBjb25zb2xlLmFzc2VydCh0aGlzLl9jdXJyZW50LnBhcmVudCk7XG4gICAgdGhpcy5fY3VycmVudCA9IHRoaXMuX2N1cnJlbnQucGFyZW50O1xuICB9XG5cbiAgYXN5bmMgZ2V0KG5hbWUpXG4gIHtcbiAgICBpZiAoIXRoaXMuX3NldHRpbmdzKVxuICAgICAgYXdhaXQgdGhpcy5sb2FkKCk7XG4gICAgcmV0dXJuIHRoaXMuX2N1cnJlbnQub2JqZWN0W25hbWVdO1xuICB9XG5cbiAgYXN5bmMgc2V0KG5hbWUsIHZhbHVlKVxuICB7XG4gICAgaWYgKCF0aGlzLl9zZXR0aW5ncylcbiAgICAgIGF3YWl0IHRoaXMubG9hZCgpO1xuICAgIHRoaXMuX2N1cnJlbnQub2JqZWN0W25hbWVdID0gdmFsdWU7XG4gICAgYXdhaXQgdGhpcy5zYXZlKCk7XG4gIH1cblxuICBhc3luYyBsb2FkKClcbiAge1xuICAgIHRyeSB7XG4gICAgICBjb25zdCBjb250ZW50ID0gYXdhaXQgZnMucHJvbWlzZXMucmVhZEZpbGUodGhpcy5fZmlsZW5hbWUsIHRoaXMuX2VuY29kaW5nKTtcbiAgICAgIHRoaXMuX3NldHRpbmdzID0gSlNPTi5wYXJzZShjb250ZW50KTtcbiAgICB9XG4gICAgY2F0Y2ggKGUpIHtcbiAgICAgIHRoaXMuX3NldHRpbmdzID0ge307XG4gICAgfVxuICAgIHRoaXMuX2N1cnJlbnQgPVxuICAgIHtcbiAgICAgIHBhcmVudDogbnVsbCxcbiAgICAgIG9iamVjdDogdGhpcy5fc2V0dGluZ3MsXG4gICAgfTtcbiAgfVxuXG4gIGFzeW5jIHNhdmUoKVxuICB7XG4gICAgY29uc3Qgc3BhY2UgPSAyO1xuICAgIGNvbnN0IGNvbnRlbnQgPSBKU09OLnN0cmluZ2lmeSh0aGlzLl9zZXR0aW5ncywgdW5kZWZpbmVkLCBzcGFjZSk7XG4gICAgYXdhaXQgZnMucHJvbWlzZXMud3JpdGVGaWxlKHRoaXMuX2ZpbGVuYW1lLCBjb250ZW50LCB7IGVuY29kaW5nOiB0aGlzLl9lbmNvZGluZywgZmxhZzogJ3cnLCBmbHVzaDogdHJ1ZSB9KTtcbiAgfVxufTtcblxubW9kdWxlLmV4cG9ydHMgPSB7XG4gIFNldHRpbmdzU3RvcmFnZSxcbn07XG4iLCIvKlxuICogTUlUIExpY2Vuc2VcbiAqXG4gKiBDb3B5cmlnaHQgKGMpIDIwMjUgIFl1cmlpIFlha3ViaW4gKHl1cmlpLnlha3ViaW5AZ21haWwuY29tKVxuICpcbiAqIFBlcm1pc3Npb24gaXMgZ3JhbnRlZCB0byB1c2UsIGNvcHksIG1vZGlmeSwgYW5kIGRpc3RyaWJ1dGUgdGhpcyBzb2Z0d2FyZVxuICogdW5kZXIgdGhlIE1JVCBMaWNlbnNlLiBTZWUgTElDRU5TRSBmaWxlIGZvciBkZXRhaWxzLlxuICovXG5cbmV4cG9ydCBmdW5jdGlvbiBlbnN1cmVCb29sZWFuKHZhbHVlOiBhbnkpIHtcbiAgaWYgKHR5cGVvZiB2YWx1ZSA9PT0gXCJib29sZWFuXCIpXG4gICAgcmV0dXJuIHZhbHVlO1xuICB0aHJvdyBuZXcgRXJyb3IoYFRoZSAnJHt2YWx1ZX0nIGlzIG5vdCBhIGJvb2xlYW5gKTtcbn1cblxuZXhwb3J0IGZ1bmN0aW9uIGVuc3VyZVN0cmluZyh2YWx1ZTogYW55KSB7XG4gIGlmICh0eXBlb2YgdmFsdWUgPT09IFwic3RyaW5nXCIpXG4gICAgcmV0dXJuIHZhbHVlO1xuICB0aHJvdyBuZXcgRXJyb3IoYFRoZSAnJHt2YWx1ZX0nIGlzIG5vdCBhIHN0cmluZ2ApO1xufVxuIiwibW9kdWxlLmV4cG9ydHMgPSByZXF1aXJlKFwiZnNcIik7IiwibW9kdWxlLmV4cG9ydHMgPSByZXF1aXJlKFwiaHR0cFwiKTsiLCJtb2R1bGUuZXhwb3J0cyA9IHJlcXVpcmUoXCJodHRwc1wiKTsiLCJtb2R1bGUuZXhwb3J0cyA9IHJlcXVpcmUoXCJub2RlOmNoaWxkX3Byb2Nlc3NcIik7IiwibW9kdWxlLmV4cG9ydHMgPSByZXF1aXJlKFwibm9kZTpmc1wiKTsiLCJtb2R1bGUuZXhwb3J0cyA9IHJlcXVpcmUoXCJub2RlOm9zXCIpOyIsIm1vZHVsZS5leHBvcnRzID0gcmVxdWlyZShcIm5vZGU6cGF0aFwiKTsiLCJtb2R1bGUuZXhwb3J0cyA9IHJlcXVpcmUoXCJub2RlOnVybFwiKTsiLCIvLyBUaGUgbW9kdWxlIGNhY2hlXG52YXIgX193ZWJwYWNrX21vZHVsZV9jYWNoZV9fID0ge307XG5cbi8vIFRoZSByZXF1aXJlIGZ1bmN0aW9uXG5mdW5jdGlvbiBfX3dlYnBhY2tfcmVxdWlyZV9fKG1vZHVsZUlkKSB7XG5cdC8vIENoZWNrIGlmIG1vZHVsZSBpcyBpbiBjYWNoZVxuXHR2YXIgY2FjaGVkTW9kdWxlID0gX193ZWJwYWNrX21vZHVsZV9jYWNoZV9fW21vZHVsZUlkXTtcblx0aWYgKGNhY2hlZE1vZHVsZSAhPT0gdW5kZWZpbmVkKSB7XG5cdFx0cmV0dXJuIGNhY2hlZE1vZHVsZS5leHBvcnRzO1xuXHR9XG5cdC8vIENyZWF0ZSBhIG5ldyBtb2R1bGUgKGFuZCBwdXQgaXQgaW50byB0aGUgY2FjaGUpXG5cdHZhciBtb2R1bGUgPSBfX3dlYnBhY2tfbW9kdWxlX2NhY2hlX19bbW9kdWxlSWRdID0ge1xuXHRcdC8vIG5vIG1vZHVsZS5pZCBuZWVkZWRcblx0XHQvLyBubyBtb2R1bGUubG9hZGVkIG5lZWRlZFxuXHRcdGV4cG9ydHM6IHt9XG5cdH07XG5cblx0Ly8gRXhlY3V0ZSB0aGUgbW9kdWxlIGZ1bmN0aW9uXG5cdF9fd2VicGFja19tb2R1bGVzX19bbW9kdWxlSWRdKG1vZHVsZSwgbW9kdWxlLmV4cG9ydHMsIF9fd2VicGFja19yZXF1aXJlX18pO1xuXG5cdC8vIFJldHVybiB0aGUgZXhwb3J0cyBvZiB0aGUgbW9kdWxlXG5cdHJldHVybiBtb2R1bGUuZXhwb3J0cztcbn1cblxuIiwiLy8gZ2V0RGVmYXVsdEV4cG9ydCBmdW5jdGlvbiBmb3IgY29tcGF0aWJpbGl0eSB3aXRoIG5vbi1oYXJtb255IG1vZHVsZXNcbl9fd2VicGFja19yZXF1aXJlX18ubiA9IChtb2R1bGUpID0+IHtcblx0dmFyIGdldHRlciA9IG1vZHVsZSAmJiBtb2R1bGUuX19lc01vZHVsZSA/XG5cdFx0KCkgPT4gKG1vZHVsZVsnZGVmYXVsdCddKSA6XG5cdFx0KCkgPT4gKG1vZHVsZSk7XG5cdF9fd2VicGFja19yZXF1aXJlX18uZChnZXR0ZXIsIHsgYTogZ2V0dGVyIH0pO1xuXHRyZXR1cm4gZ2V0dGVyO1xufTsiLCIvLyBkZWZpbmUgZ2V0dGVyIGZ1bmN0aW9ucyBmb3IgaGFybW9ueSBleHBvcnRzXG5fX3dlYnBhY2tfcmVxdWlyZV9fLmQgPSAoZXhwb3J0cywgZGVmaW5pdGlvbikgPT4ge1xuXHRmb3IodmFyIGtleSBpbiBkZWZpbml0aW9uKSB7XG5cdFx0aWYoX193ZWJwYWNrX3JlcXVpcmVfXy5vKGRlZmluaXRpb24sIGtleSkgJiYgIV9fd2VicGFja19yZXF1aXJlX18ubyhleHBvcnRzLCBrZXkpKSB7XG5cdFx0XHRPYmplY3QuZGVmaW5lUHJvcGVydHkoZXhwb3J0cywga2V5LCB7IGVudW1lcmFibGU6IHRydWUsIGdldDogZGVmaW5pdGlvbltrZXldIH0pO1xuXHRcdH1cblx0fVxufTsiLCJfX3dlYnBhY2tfcmVxdWlyZV9fLm8gPSAob2JqLCBwcm9wKSA9PiAoT2JqZWN0LnByb3RvdHlwZS5oYXNPd25Qcm9wZXJ0eS5jYWxsKG9iaiwgcHJvcCkpIiwiLy8gZGVmaW5lIF9fZXNNb2R1bGUgb24gZXhwb3J0c1xuX193ZWJwYWNrX3JlcXVpcmVfXy5yID0gKGV4cG9ydHMpID0+IHtcblx0aWYodHlwZW9mIFN5bWJvbCAhPT0gJ3VuZGVmaW5lZCcgJiYgU3ltYm9sLnRvU3RyaW5nVGFnKSB7XG5cdFx0T2JqZWN0LmRlZmluZVByb3BlcnR5KGV4cG9ydHMsIFN5bWJvbC50b1N0cmluZ1RhZywgeyB2YWx1ZTogJ01vZHVsZScgfSk7XG5cdH1cblx0T2JqZWN0LmRlZmluZVByb3BlcnR5KGV4cG9ydHMsICdfX2VzTW9kdWxlJywgeyB2YWx1ZTogdHJ1ZSB9KTtcbn07IiwiaW1wb3J0IHVybCBmcm9tIFwibm9kZTp1cmxcIjtcbmltcG9ydCBwYXRoIGZyb20gXCJub2RlOnBhdGhcIjtcblxuaW1wb3J0IHsgUnVuU2NyaXB0Q29udGV4dCB9IGZyb20gXCIuL1J1blNjcmlwdENvbnRleHQubWpzXCI7XG5pbXBvcnQgaW5pdEhhbmRsZXIgZnJvbSBcIi4vSW5pdEhhbmRsZXIubWpzXCI7XG5pbXBvcnQgYnVpbGRIYW5kbGVyIGZyb20gXCIuL0J1aWxkSGFuZGxlci5tanNcIjtcblxuY29uc3QgX19maWxlbmFtZSA9IHVybC5maWxlVVJMVG9QYXRoKGltcG9ydC5tZXRhLnVybCk7XG5jb25zdCBfX2Rpcm5hbWUgPSBwYXRoLmRpcm5hbWUoX19maWxlbmFtZSk7XG5cbmNvbnN0IGhhbmRsZXJNYXAgPSB7XG4gIGRlZmF1bHQ6IGJ1aWxkSGFuZGxlcixcbiAgaW5pdDogaW5pdEhhbmRsZXIsXG4gIGJ1aWxkOiBidWlsZEhhbmRsZXIsXG59O1xuXG5mdW5jdGlvbiB0b09wdGlvbktleShuYW1lKVxue1xuICBpZiAoIW5hbWUuc3RhcnRzV2l0aChcIi0tXCIpKVxuICAgIHJldHVybiBudWxsO1xuXG4gIG5hbWUgPSBuYW1lLnN1YnN0cmluZygyKS50b0xvd2VyQ2FzZSgpO1xuICBpZiAoIW5hbWUubGVuZ3RoKVxuICAgIHJldHVybiBudWxsO1xuXG4gIGxldCBrZXkgPSBuYW1lLmNoYXJBdCgwKTtcbiAgaWYgKCFrZXkubWF0Y2goL1thLXpdLykpXG4gICAgcmV0dXJuIG51bGw7XG5cbiAgbGV0IGh5cGhlbiA9IDA7XG4gIGZvciAobGV0IGkgPSAxOyBpIDwgbmFtZS5sZW5ndGg7IGkrKykge1xuICAgIGNvbnN0IGNoID0gbmFtZS5jaGFyQXQoaSk7XG4gICAgaWYgKGNoLm1hdGNoKC9bYS16MC05XS8pKSB7XG4gICAgICBrZXkgKz0gKGh5cGhlbiA/IGNoLnRvVXBwZXJDYXNlKCkgOiBjaClcbiAgICAgIGh5cGhlbiA9IDA7XG4gICAgfVxuICAgIGVsc2UgaWYgKGNoID09IFwiLVwiKSB7XG4gICAgICBpZiAoKytoeXBoZW4gPiAxKVxuICAgICAgICByZXR1cm4gbnVsbDtcbiAgICB9XG4gIH1cblxuICByZXR1cm4gaHlwaGVuID8gbnVsbCA6IGtleTtcbn1cblxuYXN5bmMgZnVuY3Rpb24gcnVuU2NyaXB0KClcbntcbiAgY29uc3Qgb3B0aW9ucyA9IHtcbiAgICBoYW5kbGVyOiBcImRlZmF1bHRcIixcbiAgICBub2RlRXhlY3V0YWJsZTogbnVsbCxcbiAgICBjdXJyZW50U2NyaXB0OiBudWxsLFxuICAgIHNjcmlwdERpcjogX19kaXJuYW1lLFxuICAgIHJvb3REaXI6IHBhdGguZGlybmFtZShfX2Rpcm5hbWUpLFxuICAgIHdvcmtEaXI6IHByb2Nlc3MuY3dkKCksXG4gICAgZW52OiB7fSxcbiAgfTtcblxuICBpZiAocHJvY2Vzcy5hcmd2Lmxlbmd0aCA+IDApXG4gICAgb3B0aW9ucy5ub2RlRXhlY3V0YWJsZSA9IHByb2Nlc3MuYXJndlswXTtcbiAgaWYgKHByb2Nlc3MuYXJndi5sZW5ndGggPiAxKVxuICAgIG9wdGlvbnMuY3VycmVudFNjcmlwdCA9IHByb2Nlc3MuYXJndlsxXTtcblxuICBsZXQgYXJnc0luZGV4ID0gcHJvY2Vzcy5hcmd2Lmxlbmd0aDtcbiAgaWYgKHByb2Nlc3MuYXJndi5sZW5ndGggPiAyKSB7XG4gICAgYXJnc0luZGV4ID0gMjtcbiAgICBjb25zdCBoYW5kbGVyID0gcHJvY2Vzcy5hcmd2W2FyZ3NJbmRleF07XG4gICAgaWYgKCFoYW5kbGVyLnN0YXJ0c1dpdGgoXCItLVwiKSkge1xuICAgICAgb3B0aW9ucy5oYW5kbGVyID0gaGFuZGxlcjtcbiAgICAgIGFyZ3NJbmRleCsrO1xuICAgIH1cbiAgfVxuXG4gIGlmICghaGFuZGxlck1hcC5oYXNPd25Qcm9wZXJ0eShvcHRpb25zLmhhbmRsZXIpKSB7XG4gICAgY29uc3Qgc2NyaXB0TmFtZSA9IG9wdGlvbnMuY3VycmVudFNjcmlwdCA/IHBhdGguYmFzZW5hbWUob3B0aW9ucy5jdXJyZW50U2NyaXB0KSA6IFwid2FzbXV4XCI7XG4gICAgdGhyb3cgYFRoZSAke3NjcmlwdE5hbWV9IGRvZXMgbm90IHN1cHBvcnQgdGhlICR7b3B0aW9ucy5oYW5kbGVyfSBjb21tYW5kYDtcbiAgfVxuXG4gIGxldCBsYXN0S2V5ID0gbnVsbDtcbiAgd2hpbGUgKGFyZ3NJbmRleCA8IHByb2Nlc3MuYXJndi5sZW5ndGgpIHtcbiAgICBjb25zdCBpdGVyID0gcHJvY2Vzcy5hcmd2W2FyZ3NJbmRleCsrXTtcbiAgICBpZiAoaXRlci5zdGFydHNXaXRoKFwiLS1cIikpIHtcbiAgICAgIGNvbnN0IGtleSA9IHRvT3B0aW9uS2V5KGl0ZXIpO1xuICAgICAgaWYgKCFrZXkpXG4gICAgICAgIHRocm93IGBPcHRpb24gJHtpdGVyfSBpcyBub3Qgc3VwcG9ydGVkYDtcbiAgICAgIGlmIChvcHRpb25zLmVudi5oYXNPd25Qcm9wZXJ0eShrZXkpKVxuICAgICAgICB0aHJvdyBgQ2Fubm90IHNwZWNpZnkgdGhlIHNhbWUgb3B0aW9uICcke2l0ZXJ9JyBtb3JlIHRoYW4gb25jZWA7XG4gICAgICBsYXN0S2V5ID0ga2V5O1xuICAgICAgb3B0aW9ucy5lbnZba2V5XSA9IHRydWU7XG4gICAgfVxuICAgIGVsc2UgaWYgKGxhc3RLZXkpIHtcbiAgICAgIGNvbnN0IHZhbHVlID0gb3B0aW9ucy5lbnZbbGFzdEtleV07XG4gICAgICBpZiAodHlwZW9mIHZhbHVlID09PSAnYm9vbGVhbicpXG4gICAgICAgIG9wdGlvbnMuZW52W2xhc3RLZXldID0gaXRlcjtcbiAgICAgIGVsc2UgaWYgKHR5cGVvZiB2YWx1ZSA9PT0gJ3N0cmluZycpXG4gICAgICAgIG9wdGlvbnMuZW52W2xhc3RLZXldID0gWyB2YWx1ZSwgaXRlciBdO1xuICAgICAgZWxzZVxuICAgICAgICB2YWx1ZS5wdXNoKGl0ZXIpO1xuICAgIH1cbiAgICBlbHNlIHtcbiAgICAgIHRocm93IGBOZWVkIHRvIHNwZWNpZnkgdGhlIG9wdGlvbiBuYW1lIGJlZm9yZSAnJHtpdGVyfScgcGFyYW1ldGVyYDtcbiAgICB9XG4gIH1cblxuICBjb25zdCBjb250ZXh0ID0gbmV3IFJ1blNjcmlwdENvbnRleHQob3B0aW9ucyk7XG5cbiAgbGV0IGhhbmRsZXIgPSBoYW5kbGVyTWFwW29wdGlvbnMuaGFuZGxlcl07XG4gIGlmICh0eXBlb2YgaGFuZGxlciA9PT0gXCJzdHJpbmdcIikge1xuICAgIGNvbnN0IGZpbGVuYW1lID0gcGF0aC5pc0Fic29sdXRlKGhhbmRsZXIpID8gaGFuZGxlciA6IHBhdGgucmVzb2x2ZShfX2Rpcm5hbWUsIGhhbmRsZXIpO1xuICAgIGNvbnN0IGZpbGVVcmwgPSB1cmwucGF0aFRvRmlsZVVSTChmaWxlbmFtZSk7XG4gICAgY29uc3QgbW9kdWxlID0gYXdhaXQgaW1wb3J0KGZpbGVVcmwpO1xuICAgIGhhbmRsZXIgPSBtb2R1bGUuZGVmYXVsdDtcbiAgfVxuXG4gIGNvbnN0IHJlcyA9IGhhbmRsZXIoY29udGV4dCk7XG4gIGlmIChyZXMgaW5zdGFuY2VvZiBQcm9taXNlKSB7XG4gICAgYXdhaXQgcmVzO1xuICB9XG59XG5cbnJ1blNjcmlwdCgpLnRoZW4oKCkgPT4gcHJvY2Vzcy5leGl0KDApKS5jYXRjaCgoZSkgPT4ge1xuICBpZiAoZSBpbnN0YW5jZW9mIEVycm9yKSB7XG4gICAgY29uc29sZS5lcnJvcihlLnN0YWNrKTtcbiAgfVxuICBlbHNlIHtcbiAgICBjb25zb2xlLmVycm9yKGUpO1xuICB9XG4gIHByb2Nlc3MuZXhpdCgxKTtcbn0pO1xuIl0sIm5hbWVzIjpbXSwic291cmNlUm9vdCI6IiJ9