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
const { PluginContext } = __webpack_require__(/*! ./bitmake/PluginContext.js */ "./src/bitmake/PluginContext.js");
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
const { TargetCollection } = __webpack_require__(/*! ./TargetCollection.js */ "./src/bitmake/TargetCollection.js");
const { ScriptCollection } = __webpack_require__(/*! ./ScriptCollection.js */ "./src/bitmake/ScriptCollection.js");
const { InterfaceTarget } = __webpack_require__(/*! @/core/InterfaceTarget */ "./src/core/InterfaceTarget.ts");
const { UnknownTarget } = __webpack_require__(/*! ./UnknownTarget.js */ "./src/bitmake/UnknownTarget.js");
const { GoalCollection } = __webpack_require__(/*! @/core/GoalCollection */ "./src/core/GoalCollection.ts");
const { InterfaceObjects } = __webpack_require__(/*! @/core/InterfaceObjects */ "./src/core/InterfaceObjects.ts");
const { SourceFile } = __webpack_require__(/*! @/core/SourceFile */ "./src/core/SourceFile.ts");
const { ObjectLibrary, StaticLibrary, SharedLibrary, Executable } = __webpack_require__(/*! ./Target.js */ "./src/bitmake/Target.js");
const { FilePath } = __webpack_require__(/*! @/core/Path */ "./src/core/Path.ts");
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
    if (iter.VALUE instanceof FilePath) {
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

/***/ "./src/bitmake/InstallEntity.js":
/*!**************************************!*\
  !*** ./src/bitmake/InstallEntity.js ***!
  \**************************************/
/***/ ((module, __unused_webpack_exports, __webpack_require__) => {

"use strict";


const { InterfaceTarget } = __webpack_require__(/*! @/core/InterfaceTarget */ "./src/core/InterfaceTarget.ts");
const { AbsolutePath } = __webpack_require__(/*! @/core/Path */ "./src/core/Path.ts");
const { FilePath, DirPath } = __webpack_require__(/*! @/core/Path */ "./src/core/Path.ts");

const VALUE       = Symbol("VALUE");
const DESTINATION = Symbol("DESTINATION");
const BASE_DIR    = Symbol("BASE_DIR");

function InstallEntity(scope, value, params) {
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

  if (typeof value === "string" || value instanceof AbsolutePath) {
    value = scope.SOURCE_DIR.resolve(value.toString());
    value = FilePath.create(value.toString());
    baseDir = baseDir || value.dirname();
  }
  else if (!(value instanceof InterfaceTarget)) {
    throw new Error(`Not supportet value of ${value}`);
  }

  this[VALUE] = value;
  this[DESTINATION] = DirPath.create(scope.INSTALL_PREFIX.resolve(destination.toString()).toString());
  this[BASE_DIR] = baseDir ? DirPath.create(baseDir.toString()) : null;
}

InstallEntity.create = (scope, value, params) => {
  return Object.seal(new InstallEntity(scope, value, params));
}

InstallEntity.prototype = Object.create(Object.prototype, {
  constructor: {
    value: InstallEntity,
    enumerable: false,
  },
  VALUE: {
    get () { return this[VALUE]; },
    enumerable: true,
  },
  DESTINATION: {
    get () { return this[DESTINATION]; },
    enumerable: true,
  },
  BASE_DIR: {
    get () { return this[BASE_DIR]; },
    enumerable: true,
  },
});

InstallEntity.prototype.toJSON = function() {
  const json = {};
  for (const key in this)
    json[key] = this[key];
  return json;
}

module.exports = {
  InstallEntity,
};


/***/ }),

/***/ "./src/bitmake/PluginContext.js":
/*!**************************************!*\
  !*** ./src/bitmake/PluginContext.js ***!
  \**************************************/
/***/ ((module, __unused_webpack_exports, __webpack_require__) => {

"use strict";


const { DirPath } = __webpack_require__(/*! @/core/Path */ "./src/core/Path.ts");

const GLOBAL = Symbol("GLOBAL");
const SCOPE = Symbol("SCOPE");

function PluginContext(scope, global) {
  this[SCOPE] = scope;
  this[GLOBAL] = global;
}

PluginContext.prototype.addSubdirectoryAlias = function(src, dest) {
  this[GLOBAL].addSubdirectoryAlias(DirPath.create(src.toString()), DirPath.create(dest.toString()));
}

PluginContext.prototype.toJSON = function() {
  const json = {};
  for (const key in this)
    json[key] = this[key];
  return json;
}

PluginContext.create = (protoScope, global) => {
  const ctx = Object.create(protoScope);
  PluginContext.call(ctx, protoScope, global);
  for (const [key, val] of Object.entries(PluginContext.prototype))
    ctx[key] = val;
  return Object.seal(ctx);
}

module.exports = {
  PluginContext,
};


/***/ }),

/***/ "./src/bitmake/ScriptCollection.js":
/*!*****************************************!*\
  !*** ./src/bitmake/ScriptCollection.js ***!
  \*****************************************/
/***/ ((module) => {

"use strict";


const ENTRIES = Symbol("ENTRIES");

function ScriptCollection() {
  this[ENTRIES] = {};
}

ScriptCollection.prototype = Object.create(Object.prototype, {
  constructor: {
    value: ScriptCollection,
    enumerable: false,
    writable: true,
    configurable: true,
  },
  ENTRIES: {
    get() { return this[ENTRIES]; },
    enumerable: true,
  },
});

ScriptCollection.create = () => {
  return Object.seal(new ScriptCollection());
}

ScriptCollection.prototype.toJSON = function() {
  return this[ENTRIES];
}

ScriptCollection.prototype.get = function(name) {
  return this[ENTRIES][name];
}

ScriptCollection.prototype.set = function(name, target) {
  if (this[ENTRIES][name])
    throw new Error(`Script "${name}" exists`);
  this[ENTRIES][name] = target;
}

module.exports = {
  ScriptCollection,
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

/***/ "./src/bitmake/TargetCollection.js":
/*!*****************************************!*\
  !*** ./src/bitmake/TargetCollection.js ***!
  \*****************************************/
/***/ ((module, __unused_webpack_exports, __webpack_require__) => {

"use strict";


const { IncludeDirectory } = __webpack_require__(/*! @/core/IncludeDirectory */ "./src/core/IncludeDirectory.ts");
const { InterfaceIncludes } = __webpack_require__(/*! @/core/InterfaceIncludes */ "./src/core/InterfaceIncludes.ts");
const { InterfaceTarget } = __webpack_require__(/*! @/core/InterfaceTarget */ "./src/core/InterfaceTarget.ts");

const ENTRIES = Symbol("ENTRIES");

function TargetCollection() {
  this[ENTRIES] = {};
}

TargetCollection.prototype = Object.create(Object.prototype, {
  constructor: {
    value: TargetCollection,
    enumerable: false,
    writable: true,
    configurable: true,
  },
  ENTRIES: {
    get() { return this[ENTRIES]; },
    enumerable: true,
  },
});

TargetCollection.create = () => {
  return Object.seal(new TargetCollection());
}

TargetCollection.prototype.toJSON = function() {
  return this[ENTRIES];
}

TargetCollection.prototype.get = function(name) {
  return this[ENTRIES][name];
}

TargetCollection.prototype.set = function(name, target) {
  if (this[ENTRIES][name])
    throw new Error(`Target "${name}" exists`);
  this[ENTRIES][name] = target;
}

function getHeaders(target) {
  return target.SOURCES.filter(i => i.HEADER_FILE_ONLY);
}

function getIncludes(target) {
  return target.INCLUDES.map(i => i.VALUE);
}

function getPublicIncludes(target) {
  return target.INCLUDES.filter(i => i.PUBLIC_ONLY).map(i => i.VALUE);
}

function getLibraries(target) {
  return target.LIBRARIES.map(i => i.VALUE);
}

function getPublicLibraries(target) {
  return target.LIBRARIES.filter(i => i.PUBLIC_ONLY).map(i => i.VALUE);
}

function getDefinitions(target) {
  return target.DEFINES.map(i => i.VALUE);
}

function getPublicDefinitions(target) {
  return target.DEFINES.filter(i => i.PUBLIC_ONLY).map(i => i.VALUE);
}

function getCompileOptions(target) {
  return target.COMPILE_OPTIONS.map(i => i.VALUE);
}

function getPublicCompileOptions(target) {
  return target.COMPILE_OPTIONS.filter(i => i.PUBLIC_ONLY).map(i => i.VALUE);
}

function getLinkOptions(target) {
  return target.LINK_OPTIONS.map(i => i.VALUE);
}

function getPublicLinkOptions(target) {
  return target.LINK_OPTIONS.filter(i => i.PUBLIC_ONLY).map(i => i.VALUE);
}

TargetCollection.prototype.__getAllIncludes = function(includes, targetSet, list) {
  for (const iter of list) {
    if (iter instanceof InterfaceIncludes || iter instanceof InterfaceTarget) {
      if (!targetSet.has(iter.targetName)) {
        targetSet.add(iter.targetName);
        const target = this.get(iter.targetName);
        this.__getAllIncludes(includes, targetSet, getPublicIncludes(target));
        this.__getAllIncludes(includes, targetSet, getPublicLibraries(target));
      }
    }
    else if (iter instanceof IncludeDirectory) {
      if (!includes.includes(iter.toString()))
        includes.push(iter.toString());
    }
    else {
      throw new Error(`Not support instance ${iter}`);
    }
  }
}

TargetCollection.prototype.allIncludesOf = function(params) {
  const target = (typeof params === "string") ? this.get(params) : params;
  const includes = [];
  const targetSet = new Set([ target.NAME ]);
  this.__getAllIncludes(includes, targetSet, getIncludes(target));
  this.__getAllIncludes(includes, targetSet, getLibraries(target));
  return includes;
}

TargetCollection.prototype.__getAllHeaders = function(headers, targetSet, list) {
  for (const iter of list) {
    if (iter instanceof InterfaceIncludes || iter instanceof InterfaceTarget) {
      if (!targetSet.has(iter.targetName)) {
        targetSet.add(iter.targetName);
        const target = this.get(iter.targetName);
        for (const header of getHeaders(target).map(i => i.FILE.toString())) {
          if (!headers.includes(header.toString()))
            headers.push(header.toString());
        }
        this.__getAllHeaders(headers, targetSet, getPublicIncludes(target));
        this.__getAllHeaders(headers, targetSet, getPublicLibraries(target));
      }
    }
  }
}

TargetCollection.prototype.allHeadersOf = function(params) {
  const target = (typeof params === "string") ? this.get(params) : params;
  const headers = getHeaders(target).map(i => i.FILE.toString());
  const targetSet = new Set([ target.NAME ]);
  this.__getAllHeaders(headers, targetSet, getIncludes(target));
  this.__getAllHeaders(headers, targetSet, getLibraries(target));
  return headers;
}

TargetCollection.prototype.__getAllLibraries = function(libraries, targetSet, list) {
  for (const iter of list) {
    console.assert(iter instanceof InterfaceTarget);
    if (!targetSet.has(iter.targetName)) {
      targetSet.add(iter.targetName);
      const target = this.get(iter.targetName);
      libraries.push(target.FILE.toString());
      this.__getAllLibraries(libraries, targetSet, getPublicLibraries(target));
    }
  }
}

TargetCollection.prototype.allLibrariesOf = function(params) {
  const target = (typeof params === "string") ? this.get(params) : params;
  const libraries = [];
  const targetSet = new Set([ target.NAME ]);
  this.__getAllLibraries(libraries, targetSet, getLibraries(target));
  return libraries;
}

TargetCollection.prototype.__getAllDefinitions = function(definitions, targetSet, list) {
  for (const iter of list) {
    if (iter instanceof InterfaceTarget) {
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

TargetCollection.prototype.allDefinitionsOf = function(params) {
  const target = (typeof params === "string") ? this.get(params) : params;
  const definitions = [];
  const targetSet = new Set([ target.NAME ]);
  this.__getAllDefinitions(definitions, targetSet, getDefinitions(target));
  this.__getAllDefinitions(definitions, targetSet, getPublicLibraries(target));
  return definitions;
}

TargetCollection.prototype.__getAllCompileOptions = function(options, targetSet, list) {
  for (const iter of list) {
    if (iter instanceof InterfaceTarget) {
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

TargetCollection.prototype.allCompileOptionsOf = function(params) {
  const target = (typeof params === "string") ? this.get(params) : params;
  const options = [];
  const targetSet = new Set([ target.NAME ]);
  this.__getAllCompileOptions(options, targetSet, getCompileOptions(target));
  this.__getAllCompileOptions(options, targetSet, getPublicLibraries(target));
  return options.flat();
}

TargetCollection.prototype.__getLinkOptions = function(options, targetSet, list) {
  for (const iter of list) {
    if (iter instanceof InterfaceTarget) {
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

TargetCollection.prototype.allLinkOptionsOf = function(params) {
  const target = (typeof params === "string") ? this.get(params) : params;
  const options = [];
  const targetSet = new Set([ target.NAME ]);
  this.__getLinkOptions(options, targetSet, getLinkOptions(target));
  this.__getLinkOptions(options, targetSet, getPublicLibraries(target));
  return options.flat();
}

module.exports = {
  TargetCollection,
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
const { InstallEntity } = __webpack_require__(/*! ./InstallEntity.js */ "./src/bitmake/InstallEntity.js");
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
//# sourceMappingURL=data:application/json;charset=utf-8;base64,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O0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLDRCQUE0QixRQUFRO0FBQ3BDOztBQUVBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBOztBQUVBOztBQUVBO0FBQ0E7O0FBRUE7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBOztBQUVBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBOztBQUVBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBOztBQUVBO0FBQ0E7O0FBRUE7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTs7QUFFQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBOztBQUVBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBOztBQUVBO0FBQ0E7O0FBRUE7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTs7Ozs7Ozs7Ozs7Ozs7Ozs7OztBQ25SQTs7Ozs7OztHQU9HO0FBRUgsSUFBWSxXQUdYO0FBSEQsV0FBWSxXQUFXO0lBQ3JCLHdCQUFTO0lBQ1QsMEJBQVc7QUFDYixDQUFDLEVBSFcsV0FBVyxLQUFYLFdBQVcsUUFHdEI7QUFBQSxDQUFDO0FBRUYsOERB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LHlEQUFZO0FBQ3ZCLFFBQVEsd0RBQVc7QUFDbkIsU0FBUyx5REFBWTtBQUNyQjs7QUFFQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBOztBQUVBO0FBQ0Esa0JBQWtCLGlCQUFpQjtBQUNuQztBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsYUFBYSw4Q0FBWTtBQUN6QjtBQUNBLFdBQVc7QUFDWDs7QUFFQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQSwrQ0FBK0MsK0NBQWE7QUFDNUQsaUJBQWlCLFlBQVksdUJBQXVCLGlCQUFpQjtBQUNyRTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSx3QkFBd0IsTUFBTTtBQUM5QjtBQUNBLGlEQUFpRCxLQUFLO0FBQ3REO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsdURBQXVELEtBQUs7QUFDNUQ7QUFDQTs7QUFFQSxzQkFBc0IsbUVBQWdCOztBQUV0QztBQUNBO0FBQ0EscUJBQXFCLGlEQUFlLHNCQUFzQiw4Q0FBWTtBQUN0RSxvQkFBb0IsbURBQWlCO0FBQ3JDLHlCQUF5Qiw0Q0FBTyxPQUFPLENBQUM7QUFDeEM7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSxDQUFDIiwic291cmNlcyI6WyJ3ZWJwYWNrOi8vYml0bWFrZS8uL3NyYy8gbGF6eSBzdHJpY3QgbmFtZXNwYWNlIG9iamVjdCIsIndlYnBhY2s6Ly9iaXRtYWtlLy4vc3JjL0J1aWxkSGFuZGxlci5tanMiLCJ3ZWJwYWNrOi8vYml0bWFrZS8uL3NyYy9Db25zdGFudHMuanMiLCJ3ZWJwYWNrOi8vYml0bWFrZS8uL3NyYy9Jbml0SGFuZGxlci5tanMiLCJ3ZWJwYWNrOi8vYml0bWFrZS8uL3NyYy9NYWtlU2NyaXB0Q29udGV4dC5qcyIsIndlYnBhY2s6Ly9iaXRtYWtlLy4vc3JjL1J1blNjcmlwdENvbnRleHQubWpzIiwid2VicGFjazovL2JpdG1ha2UvLi9zcmMvYml0bWFrZS9HbG9iYWxDb250ZXh0LmpzIiwid2VicGFjazovL2JpdG1ha2UvLi9zcmMvYml0bWFrZS9JbnN0YWxsRW50aXR5LmpzIiwid2VicGFjazovL2JpdG1ha2UvLi9zcmMvYml0bWFrZS9QbHVnaW5Db250ZXh0LmpzIiwid2VicGFjazovL2JpdG1ha2UvLi9zcmMvYml0bWFrZS9TY3JpcHRDb2xsZWN0aW9uLmpzIiwid2VicGFjazovL2JpdG1ha2UvLi9zcmMvYml0bWFrZS9TeXN0ZW1TY3JpcHRzL2NvbmZpZ3VyZV9maWxlLmpzIiwid2VicGFjazovL2JpdG1ha2UvLi9zcmMvYml0bWFrZS9TeXN0ZW1TY3JpcHRzL2luc3RhbGxfc2NyaXB0LmpzIiwid2VicGFjazovL2JpdG1ha2UvLi9zcmMvYml0bWFrZS9TeXN0ZW1WYXJpYWJsZXMuanMiLCJ3ZWJwYWNrOi8vYml0bWFrZS8uL3NyYy9iaXRtYWtlL1RhcmdldC5qcyIsIndlYnBhY2s6Ly9iaXRtYWtlLy4vc3JjL2JpdG1ha2UvVGFyZ2V0Q29sbGVjdGlvbi5qcyIsIndlYnBhY2s6Ly9iaXRtYWtlLy4vc3JjL2JpdG1ha2UvVW5rbm93blRhcmdldC5qcyIsIndlYnBhY2s6Ly9iaXRtYWtlLy4vc3JjL2JpdG1ha2UvVXNlckNvbnRleHQuanMiLCJ3ZWJwYWNrOi8vYml0bWFrZS8uL3NyYy9jbWFrZS9Db25zdGFudHMudHMiLCJ3ZWJwYWNrOi8vYml0bWFrZS8uL3NyYy9jbWFrZS9IZWxwZXIudHMiLCJ3ZWJwYWNrOi8vYml0bWFrZS8uL3NyYy9jb3JlL0N1c3RvbVNjcmlwdC50cyIsIndlYnBhY2s6Ly9iaXRtYWtlLy4vc3JjL2NvcmUvR29hbENvbGxlY3Rpb24udHMiLCJ3ZWJwYWNrOi8vYml0bWFrZS8uL3NyYy9jb3JlL0luY2x1ZGVEaXJlY3RvcnkudHMiLCJ3ZWJwYWNrOi8vYml0bWFrZS8uL3NyYy9jb3JlL0ludGVyZmFjZUluY2x1ZGVzLnRzIiwid2VicGFjazovL2JpdG1ha2UvLi9zcmMvY29yZS9JbnRlcmZhY2VPYmplY3RzLnRzIiwid2VicGFjazovL2JpdG1ha2UvLi9zcmMvY29yZS9JbnRlcmZhY2VTY3JpcHQudHMiLCJ3ZWJwYWNrOi8vYml0bWFrZS8uL3NyYy9jb3JlL0ludGVyZmFjZVRhcmdldC50cyIsIndlYnBhY2s6Ly9iaXRtYWtlLy4vc3JjL2NvcmUvUGF0aC50cyIsIndlYnBhY2s6Ly9iaXRtYWtlLy4vc3JjL2NvcmUvU291cmNlRmlsZS50cyIsIndlYnBhY2s6Ly9iaXRtYWtlLy4vc3JjL2NvcmUvU291cmNlRmlsZUxpc3QudHMiLCJ3ZWJwYWNrOi8vYml0bWFrZS8uL3NyYy9jb3JlL1N5c3RlbVZhcmlhYmxlcy50cyIsIndlYnBhY2s6Ly9iaXRtYWtlLy4vc3JjL2NvcmUvVHlwZXMudHMiLCJ3ZWJwYWNrOi8vYml0bWFrZS8uL3NyYy9sb2dnZXIvaW5kZXgudHMiLCJ3ZWJwYWNrOi8vYml0bWFrZS8uL3NyYy91dGlscy9DTWFrZS5qcyIsIndlYnBhY2s6Ly9iaXRtYWtlLy4vc3JjL3V0aWxzL0NoaWxkUHJvY2Vzcy50cyIsIndlYnBhY2s6Ly9iaXRtYWtlLy4vc3JjL3V0aWxzL0ZpbGVTeXN0ZW0udHMiLCJ3ZWJwYWNrOi8vYml0bWFrZS8uL3NyYy91dGlscy9IdHRwUmVxdWVzdC50cyIsIndlYnBhY2s6Ly9iaXRtYWtlLy4vc3JjL3V0aWxzL0ltcG9ydE1vZHVsZS5tanMiLCJ3ZWJwYWNrOi8vYml0bWFrZS8uL3NyYy91dGlscy9NYWtlUGF0Y2gudHMiLCJ3ZWJwYWNrOi8vYml0bWFrZS8uL3NyYy91dGlscy9Nb2R1bGUudHMiLCJ3ZWJwYWNrOi8vYml0bWFrZS8uL3NyYy91dGlscy9QcmltaXRpdmVzLnRzIiwid2VicGFjazovL2JpdG1ha2UvLi9zcmMvdXRpbHMvU2V0dGluZ3NTdG9yYWdlLmpzIiwid2VicGFjazovL2JpdG1ha2UvLi9zcmMvdXRpbHMvU3RyaWN0VHlwZS50cyIsIndlYnBhY2s6Ly9iaXRtYWtlL2V4dGVybmFsIG5vZGUtY29tbW9uanMgXCJmc1wiIiwid2VicGFjazovL2JpdG1ha2UvZXh0ZXJuYWwgbm9kZS1jb21tb25qcyBcImh0dHBcIiIsIndlYnBhY2s6Ly9iaXRtYWtlL2V4dGVybmFsIG5vZGUtY29tbW9uanMgXCJodHRwc1wiIiwid2VicGFjazovL2JpdG1ha2UvZXh0ZXJuYWwgbm9kZS1jb21tb25qcyBcIm5vZGU6Y2hpbGRfcHJvY2Vzc1wiIiwid2VicGFjazovL2JpdG1ha2UvZXh0ZXJuYWwgbm9kZS1jb21tb25qcyBcIm5vZGU6ZnNcIiIsIndlYnBhY2s6Ly9iaXRtYWtlL2V4dGVybmFsIG5vZGUtY29tbW9uanMgXCJub2RlOm9zXCIiLCJ3ZWJwYWNrOi8vYml0bWFrZS9leHRlcm5hbCBub2RlLWNvbW1vbmpzIFwibm9kZTpwYXRoXCIiLCJ3ZWJwYWNrOi8vYml0bWFrZS9leHRlcm5hbCBub2RlLWNvbW1vbmpzIFwibm9kZTp1cmxcIiIsIndlYnBhY2s6Ly9iaXRtYWtlL3dlYnBhY2svYm9vdHN0cmFwIiwid2VicGFjazovL2JpdG1ha2Uvd2VicGFjay9ydW50aW1lL2NvbXBhdCBnZXQgZGVmYXVsdCBleHBvcnQiLCJ3ZWJwYWNrOi8vYml0bWFrZS93ZWJwYWNrL3J1bnRpbWUvZGVmaW5lIHByb3BlcnR5IGdldHRlcnMiLCJ3ZWJwYWNrOi8vYml0bWFrZS93ZWJwYWNrL3J1bnRpbWUvaGFzT3duUHJvcGVydHkgc2hvcnRoYW5kIiwid2VicGFjazovL2JpdG1ha2Uvd2VicGFjay9ydW50aW1lL21ha2UgbmFtZXNwYWNlIG9iamVjdCIsIndlYnBhY2s6Ly9iaXRtYWtlLy4vc3JjL21haW4ubWpzIl0sInNvdXJjZXNDb250ZW50IjpbImZ1bmN0aW9uIHdlYnBhY2tFbXB0eUFzeW5jQ29udGV4dChyZXEpIHtcblx0Ly8gSGVyZSBQcm9taXNlLnJlc29sdmUoKS50aGVuKCkgaXMgdXNlZCBpbnN0ZWFkIG9mIG5ldyBQcm9taXNlKCkgdG8gcHJldmVudFxuXHQvLyB1bmNhdWdodCBleGNlcHRpb24gcG9wcGluZyB1cCBpbiBkZXZ0b29sc1xuXHRyZXR1cm4gUHJvbWlzZS5yZXNvbHZlKCkudGhlbigoKSA9PiB7XG5cdFx0dmFyIGUgPSBuZXcgRXJyb3IoXCJDYW5ub3QgZmluZCBtb2R1bGUgJ1wiICsgcmVxICsgXCInXCIpO1xuXHRcdGUuY29kZSA9ICdNT0RVTEVfTk9UX0ZPVU5EJztcblx0XHR0aHJvdyBlO1xuXHR9KTtcbn1cbndlYnBhY2tFbXB0eUFzeW5jQ29udGV4dC5rZXlzID0gKCkgPT4gKFtdKTtcbndlYnBhY2tFbXB0eUFzeW5jQ29udGV4dC5yZXNvbHZlID0gd2VicGFja0VtcHR5QXN5bmNDb250ZXh0O1xud2VicGFja0VtcHR5QXN5bmNDb250ZXh0LmlkID0gXCIuL3NyYyBsYXp5IHJlY3Vyc2l2ZVwiO1xubW9kdWxlLmV4cG9ydHMgPSB3ZWJwYWNrRW1wdHlBc3luY0NvbnRleHQ7IiwiaW1wb3J0IGZzIGZyb20gXCJub2RlOmZzXCI7XG5pbXBvcnQgcGF0aCBmcm9tIFwibm9kZTpwYXRoXCI7XG5cbmltcG9ydCBjbWFrZSBmcm9tIFwiQC91dGlscy9DTWFrZS5qc1wiO1xuaW1wb3J0IHsgbWFrZVBhdGNoIH0gZnJvbSBcIkAvdXRpbHMvTWFrZVBhdGNoXCI7XG5pbXBvcnQgeyBzYXZlSWZEaWZmZXJlbnQsIGRpcmVjdG9yeUV4aXN0cywgZ2V0UGF0aFN0cmluZyB9IGZyb20gXCJAL3V0aWxzL0ZpbGVTeXN0ZW1cIjtcbmltcG9ydCB7IFNldHRpbmdzU3RvcmFnZSB9IGZyb20gXCJAL3V0aWxzL1NldHRpbmdzU3RvcmFnZS5qc1wiO1xuaW1wb3J0IHsgc3Bhd25Bc3luYyB9IGZyb20gXCJAL3V0aWxzL0NoaWxkUHJvY2Vzc1wiO1xuaW1wb3J0IHsgYWN0aW9uTWFrZVNjcmlwdCB9IGZyb20gXCJAL01ha2VTY3JpcHRDb250ZXh0LmpzXCI7XG5pbXBvcnQgeyBhcnJheVdyYXBwZXIsIGFzc2lnbk9iamVjdCB9IGZyb20gXCJAL3V0aWxzL1ByaW1pdGl2ZXNcIjtcbmltcG9ydCBjb25zdGFudHMgZnJvbSBcIkAvQ29uc3RhbnRzLmpzXCI7XG5pbXBvcnQgeyByZXF1aXJlUmVzb2x2ZSB9IGZyb20gXCJAL3V0aWxzL01vZHVsZVwiXG5pbXBvcnQgeyBjcmVhdGVMb2dnZXIgfSBmcm9tIFwiQC9sb2dnZXJcIjtcbmltcG9ydCB7IHJlcXVlc3RHZXQgfSBmcm9tIFwiQC91dGlscy9IdHRwUmVxdWVzdFwiO1xuXG5jb25zdCBsb2dnZXIgPSBjcmVhdGVMb2dnZXIoaW1wb3J0Lm1ldGEudXJsKTtcblxuY29uc3QgeyBCVUlMRF9DT05GSUdfRklMRSwgQlVJTERfU0VUVElOR1NfRklMRSB9ID0gY29uc3RhbnRzO1xuXG5mdW5jdGlvbiBtZXJnZUVudmlyb25tZW50KC4uLmFyZ3MpIHtcbiAgY29uc3QgZW52aXJvbm1lbnQgPSB7fTtcbiAgZm9yIChjb25zdCBlbnYgb2YgYXJncykge1xuICAgIGNvbnN0IGxpc3QgPSBPYmplY3QuZW50cmllcyhlbnYgfHwge30pO1xuICAgIHdoaWxlIChsaXN0Lmxlbmd0aCkge1xuICAgICAgbGV0IFtrZXksdmFsXSA9IGxpc3QucG9wKCk7XG4gICAgICBsZXQgZGVsaW1pdGVyO1xuICAgICAgbGV0IGpvaW5BZnRlciA9IHRydWU7XG4gICAgICBzd2l0Y2ggKGtleSkge1xuICAgICAgY2FzZSBcIlBBVEhcIjpcbiAgICAgICAgZGVsaW1pdGVyID0gcGF0aC5kZWxpbWl0ZXI7XG4gICAgICAgIGpvaW5BZnRlciA9IGZhbHNlO1xuICAgICAgICBicmVhaztcbiAgICAgIGNhc2UgXCJDRkxBR1NcIjpcbiAgICAgIGNhc2UgXCJDWFhGTEFHU1wiOlxuICAgICAgY2FzZSBcIkxERkxBR1NcIjpcbiAgICAgICAgZGVsaW1pdGVyID0gXCIgXCI7XG4gICAgICAgIGJyZWFrO1xuICAgICAgfVxuICAgICAgaWYgKHR5cGVvZiB2YWwgPT09ICdudW1iZXInKVxuICAgICAgICB2YWwgPSB2YWwudG9TdHJpbmcoKTtcbiAgICAgIGVsc2UgaWYgKEFycmF5LmlzQXJyYXkodmFsKSlcbiAgICAgICAgdmFsID0gdmFsLmpvaW4oZGVsaW1pdGVyKTtcbiAgICAgIGlmICghZGVsaW1pdGVyIHx8ICFlbnZpcm9ubWVudFtrZXldKVxuICAgICAgICBlbnZpcm9ubWVudFtrZXldID0gdmFsO1xuICAgICAgZWxzZSBpZiAoam9pbkFmdGVyKVxuICAgICAgICBlbnZpcm9ubWVudFtrZXldID0gdmFsICsgZGVsaW1pdGVyICsgZW52aXJvbm1lbnRba2V5XTtcbiAgICAgIGVsc2VcbiAgICAgICAgZW52aXJvbm1lbnRba2V5XSA9IGVudmlyb25tZW50W2tleV0gKyBkZWxpbWl0ZXIgKyB2YWw7XG4gICAgfVxuICB9XG4gIHJldHVybiBlbnZpcm9ubWVudDtcbn1cblxuZnVuY3Rpb24gcmViYXNlQ29uZmlnKGNvbmZpZykge1xuICBjb25zdCBiYXNlQ29uZmlnID0ge307XG4gIGNvbnN0IG90aGVyQ29uZmlnID0ge307XG5cbiAgZm9yIChjb25zdCBba2V5LCBlbnRyeV0gb2YgT2JqZWN0LmVudHJpZXMoY29uZmlnKSkge1xuICAgIChlbnRyeS5iYXNlID8gb3RoZXJDb25maWcgOiBiYXNlQ29uZmlnKVtrZXldID0gZW50cnk7XG4gIH1cblxuICB3aGlsZSAodHJ1ZSkge1xuICAgIGNvbnN0IGtleXMgPSBPYmplY3Qua2V5cyhvdGhlckNvbmZpZyk7XG4gICAgaWYgKGtleXMubGVuZ3RoID09IDApXG4gICAgICBicmVhaztcbiAgICBjb25zdCBkb25lS2V5cyA9IFtdO1xuICAgIGZvciAoY29uc3Qga2V5IG9mIGtleXMpIHtcbiAgICAgIGNvbnN0IG90aGVySXRlciA9IG90aGVyQ29uZmlnW2tleV07XG4gICAgICBjb25zdCBiYXNlTGlzdCA9IFtdO1xuICAgICAgZm9yIChjb25zdCBpdGVyIG9mIGFycmF5V3JhcHBlcihvdGhlckl0ZXIuYmFzZSkpIHtcbiAgICAgICAgY29uc3QgYmFzZUVudHJ5ID0gYmFzZUNvbmZpZ1tpdGVyXTtcbiAgICAgICAgaWYgKCFiYXNlRW50cnkpIHtcbiAgICAgICAgICBiYXNlTGlzdC5sZW5ndGggPSAwO1xuICAgICAgICAgIGJyZWFrO1xuICAgICAgICB9XG4gICAgICAgIGJhc2VMaXN0LnB1c2goYmFzZUVudHJ5KTtcbiAgICAgIH1cbiAgICAgIGlmIChiYXNlTGlzdC5sZW5ndGgpIHtcbiAgICAgICAgYmFzZUxpc3QucHVzaChvdGhlckl0ZXIpO1xuICAgICAgICBsZXQgbmV3RW50cnkgPSB7fTtcbiAgICAgICAgZm9yIChjb25zdCBpdGVyIG9mIGJhc2VMaXN0KSB7XG4gICAgICAgICAgYXNzaWduT2JqZWN0KG5ld0VudHJ5LCBpdGVyKTtcbiAgICAgICAgfVxuICAgICAgICBiYXNlQ29uZmlnW2tleV0gPSBuZXdFbnRyeTtcbiAgICAgICAgZG9uZUtleXMucHVzaChrZXkpO1xuICAgICAgfVxuICAgIH1cbiAgICBpZiAoZG9uZUtleXMubGVuZ3RoID09IDApIHtcbiAgICAgIGZvciAoY29uc3Qga2V5IG9mIGtleXMpXG4gICAgICAgIHRocm93IGBDYW4ndCBzZXQgYmFzZSBjb25maWcgZm9yIFwiJHtrZXl9YDtcbiAgICB9XG4gICAgZm9yIChjb25zdCBrZXkgb2YgZG9uZUtleXMpIHtcbiAgICAgIGRlbGV0ZSBiYXNlQ29uZmlnW2tleV0uYmFzZTtcbiAgICAgIGRlbGV0ZSBvdGhlckNvbmZpZ1trZXldO1xuICAgIH1cbiAgfVxuXG4gIHJldHVybiBiYXNlQ29uZmlnO1xufVxuXG5mdW5jdGlvbiByZXNvbHZlU3RyaW5nV2l0aFZhcmlhYmxlKGNvbmZpZywgZW50cnlDb25maWcsIHJvb3RDb25maWcsIHZhbCkge1xuICByZXR1cm4gdmFsLnJlcGxhY2UoL1xcJFxceyhbXn1dKylcXH0vZywgKG1hdGNoLCB2YWx1ZSkgPT4ge1xuICAgIGxldCBzZWw7XG4gICAgZm9yIChjb25zdCBuYW1lIG9mIHZhbHVlLnNwbGl0KFwiLlwiKSkge1xuICAgICAgaWYgKHNlbCA9PT0gdW5kZWZpbmVkKSB7XG4gICAgICAgIGlmIChjb25maWcuaGFzT3duUHJvcGVydHkobmFtZSkpIHtcbiAgICAgICAgICBzZWwgPSBjb25maWdbbmFtZV07XG4gICAgICAgIH1cbiAgICAgICAgZWxzZSBpZiAoY29uZmlnICE9PSBlbnRyeUNvbmZpZyAmJiBlbnRyeUNvbmZpZy5oYXNPd25Qcm9wZXJ0eShuYW1lKSkge1xuICAgICAgICAgIHNlbCA9IGVudHJ5Q29uZmlnW25hbWVdO1xuICAgICAgICB9XG4gICAgICAgIGVsc2UgaWYgKGNvbmZpZyAhPT0gcm9vdENvbmZpZyAmJiByb290Q29uZmlnLmhhc093blByb3BlcnR5KG5hbWUpKSB7XG4gICAgICAgICAgc2VsID0gcm9vdENvbmZpZ1tuYW1lXTtcbiAgICAgICAgfVxuICAgICAgICBlbHNlIHtcbiAgICAgICAgICB0cnkge1xuICAgICAgICAgICAgY29uc3QgbWFpbkZpbGUgPSByZXF1aXJlUmVzb2x2ZShuYW1lKTtcbiAgICAgICAgICAgIGlmIChtYWluRmlsZSkge1xuICAgICAgICAgICAgICBzZWwgPSB7IG1haW5GaWxlLCBtYWluRGlyOiBwYXRoLnBvc2l4LmRpcm5hbWUobWFpbkZpbGUpLCB9O1xuICAgICAgICAgICAgfVxuICAgICAgICAgIH0gY2F0Y2goZSkge31cbiAgICAgICAgfVxuICAgICAgICBpZiAoc2VsID09PSB1bmRlZmluZWQpXG4gICAgICAgICAgYnJlYWs7XG4gICAgICB9XG4gICAgICBlbHNlIGlmIChzZWwuaGFzT3duUHJvcGVydHkobmFtZSkpIHtcbiAgICAgICAgc2VsID0gc2VsW25hbWVdO1xuICAgICAgfVxuICAgICAgZWxzZSB7XG4gICAgICAgIHNlbCA9IHVuZGVmaW5lZDtcbiAgICAgICAgYnJlYWs7XG4gICAgICB9XG4gICAgfVxuICAgIGlmIChzZWwgPT09IHVuZGVmaW5lZClcbiAgICAgIHRocm93IG5ldyBFcnJvcihgVGhlICR7dmFsdWV9IHZhcmlhYmxlIGRvZXMgbm90IGV4aXN0XCJgKTtcbiAgICByZXR1cm4gc2VsO1xuICB9KTtcbn1cblxuZnVuY3Rpb24gcmVzb2x2ZUNvbmZpZ1N0cmluZ3NJbXBsKGNvbmZpZywgZW50cnlDb25maWcsIHJvb3RDb25maWcpIHtcbiAgbGV0IGNvdW50ID0gMDtcbiAgZm9yIChjb25zdCBba2V5LCB2YWxdIG9mIE9iamVjdC5lbnRyaWVzKGNvbmZpZykpIHtcbiAgICBpZiAodmFsICYmIHR5cGVvZiB2YWwgPT09IFwib2JqZWN0XCIpXG4gICAgICBjb3VudCArPSByZXNvbHZlQ29uZmlnU3RyaW5nc0ltcGwodmFsLCBlbnRyeUNvbmZpZywgcm9vdENvbmZpZyk7XG4gICAgZWxzZSBpZiAodHlwZW9mIHZhbCA9PT0gXCJzdHJpbmdcIikge1xuICAgICAgY29uc3QgdiA9IHJlc29sdmVTdHJpbmdXaXRoVmFyaWFibGUoY29uZmlnLCBlbnRyeUNvbmZpZywgcm9vdENvbmZpZywgdmFsKTtcbiAgICAgIGlmICh2YWwgIT09IHYpIHtcbiAgICAgICAgY29uZmlnW2tleV0gPSB2O1xuICAgICAgICBjb3VudCsrO1xuICAgICAgfVxuICAgIH1cbiAgfVxuICByZXR1cm4gY291bnQ7XG59XG5cbmZ1bmN0aW9uIHJlc29sdmVDb25maWdTdHJpbmdzKGNvbmZpZykge1xuICBmb3IgKDs7KSB7XG4gICAgbGV0IGNvdW50ID0gMDtcbiAgICBmb3IgKGNvbnN0IFtrZXksIHZhbF0gb2YgT2JqZWN0LmVudHJpZXMoY29uZmlnKSkge1xuICAgICAgaWYgKHZhbCAmJiB0eXBlb2YgdmFsID09PSBcIm9iamVjdFwiKVxuICAgICAgICBjb3VudCArPSByZXNvbHZlQ29uZmlnU3RyaW5nc0ltcGwodmFsLCB2YWwsIGNvbmZpZyk7XG4gICAgICBlbHNlICBpZiAodHlwZW9mIHZhbCA9PT0gXCJzdHJpbmdcIikge1xuICAgICAgICBjb25zdCB2ID0gcmVzb2x2ZVN0cmluZ1dpdGhWYXJpYWJsZShjb25maWcsIGNvbmZpZywgY29uZmlnLCB2YWwpO1xuICAgICAgICBpZiAodmFsICE9PSB2KSB7XG4gICAgICAgICAgY29uZmlnW2tleV0gPSB2O1xuICAgICAgICAgIGNvdW50Kys7XG4gICAgICAgIH1cbiAgICAgIH1cbiAgICB9XG4gICAgaWYgKCFjb3VudClcbiAgICAgIGJyZWFrO1xuICB9XG59XG5cbmZ1bmN0aW9uIG1ha2VCdWlsZENvbmZpZyhjdHgsIGNvbmZpZykge1xuICBmb3IgKGNvbnN0IGtleSBvZiBbIFwic291cmNlUm9vdFwiLCBcIndhc211eERpclwiIF0pIHtcbiAgICBpZiAoY29uZmlnW2tleV0pIHtcbiAgICAgIHRocm93IGBUaGUgJHtrZXl9IHZhcmlhYmxlIGNhbm5vdCBiZSBjaGFuZ2VkIHRvIFwiJHtjb25maWcuc291cmNlUm9vdH1cImA7XG4gICAgfVxuICB9XG5cbiAgY29uc3Qgcm9vdENvbmZpZyA9IHJlYmFzZUNvbmZpZyhjb25maWcpO1xuXG4gIHJvb3RDb25maWcuYnVpbGRUeXBlID0gcm9vdENvbmZpZy5idWlsZFR5cGUgfHwgY3R4LmJ1aWxkVHlwZTtcbiAgcm9vdENvbmZpZy5zb3VyY2VSb290ID0gcm9vdENvbmZpZy5zb3VyY2VSb290IHx8IGN0eC53b3JrRGlyO1xuICByb290Q29uZmlnLmJpbmFyeVJvb3QgPSByb290Q29uZmlnLmJpbmFyeVJvb3QgfHwgcGF0aC5wb3NpeC5yZXNvbHZlKGN0eC53b3JrRGlyLFwiYnVpbGRcIik7XG5cbiAgZm9yIChjb25zdCBba2V5LCBlbnRyeV0gb2YgT2JqZWN0LmVudHJpZXMocm9vdENvbmZpZykpIHtcbiAgICBpZiAoZW50cnkgJiYgdHlwZW9mIGVudHJ5ID09PSBcIm9iamVjdFwiICYmIGVudHJ5LmFjdGlvbikge1xuICAgICAgZW50cnkuYnVpbGRUeXBlID0gZW50cnkuYnVpbGRUeXBlIHx8IHJvb3RDb25maWcuYnVpbGRUeXBlO1xuICAgICAgY29uc3QgZm9sZGVyID0ga2V5LnJlcGxhY2UoXCI6XCIsIHBhdGgucG9zaXguc2VwKTtcbiAgICAgIGNvbnN0IHdvcmtEaXIgPSBwYXRoLnBvc2l4LmpvaW4ocm9vdENvbmZpZy5iaW5hcnlSb290LCBmb2xkZXIpO1xuICAgICAgZW50cnkudGVtcERpciA9IGVudHJ5LnRlbXBEaXIgfHwgcGF0aC5wb3NpeC5qb2luKHdvcmtEaXIsIFwidG1wXCIpO1xuICAgICAgaWYgKGVudHJ5LnNvdXJjZVVybCkge1xuICAgICAgICBlbnRyeS5hcmNoaXZlRGlyID0gZW50cnkuYXJjaGl2ZURpciB8fCBwYXRoLnBvc2l4LmpvaW4od29ya0RpciwgXCJhcmNcIik7XG4gICAgICAgIGVudHJ5LmV4dHJhY3REaXIgPSBlbnRyeS5leHRyYWN0RGlyIHx8IHBhdGgucG9zaXguam9pbih3b3JrRGlyLCBcInNyY1wiKTtcbiAgICAgICAgaWYgKCFlbnRyeS5zb3VyY2VEaXIpXG4gICAgICAgICAgZW50cnkuc291cmNlRGlyID0gZW50cnkuZXh0cmFjdERpcjtcbiAgICAgICAgZWxzZSBpZiAoIXBhdGguaXNBYnNvbHV0ZShlbnRyeS5zb3VyY2VEaXIpKVxuICAgICAgICAgIGVudHJ5LnNvdXJjZURpciA9IHBhdGgucG9zaXguam9pbihlbnRyeS5leHRyYWN0RGlyLCBlbnRyeS5zb3VyY2VEaXIpO1xuICAgICAgfVxuICAgICAgZWxzZSBpZiAoIWVudHJ5LnNvdXJjZURpcikge1xuICAgICAgICB0aHJvdyBgTWlzc2luZyBzb3VyY2VEaXIgZm9yICR7a2V5fSBhY3Rpb25cImA7XG4gICAgICB9XG4gICAgICBpZiAoZW50cnkuYmluYXJ5RGlyID09PSBudWxsKVxuICAgICAgICBlbnRyeS5iaW5hcnlEaXIgPSBlbnRyeS5zb3VyY2VEaXI7XG4gICAgICBlbHNlIGlmIChlbnRyeS5iaW5hcnlEaXIgPT09IHVuZGVmaW5lZClcbiAgICAgICAgZW50cnkuYmluYXJ5RGlyID0gcGF0aC5wb3NpeC5qb2luKHdvcmtEaXIsIFwiYmluXCIpO1xuICAgIH1cbiAgfVxuXG4gIHJlc29sdmVDb25maWdTdHJpbmdzKHJvb3RDb25maWcpO1xuXG4gIHJldHVybiByb290Q29uZmlnO1xufVxuXG5hc3luYyBmdW5jdGlvbiB0cnlSZXF1ZXN0R2V0KHNvdXJjZVVybCwgYXJjRmlsZSwgYXR0ZW1wdHMpXG57XG4gIGZvcig7Oykge1xuICAgIHRyeSB7XG4gICAgICBjb25zdCBidWZmZXIgPSBhd2FpdCByZXF1ZXN0R2V0KHNvdXJjZVVybCk7XG4gICAgICBhd2FpdCBmcy5wcm9taXNlcy53cml0ZUZpbGUoYXJjRmlsZSwgYnVmZmVyKTtcbiAgICAgIHJldHVybjtcbiAgICB9XG4gICAgY2F0Y2ggKGUpIHtcbiAgICAgIGlmICgtLWF0dGVtcHRzIDwgMCkge1xuICAgICAgICB0aHJvdyBlO1xuICAgICAgfVxuICAgICAgY29uc29sZS53YXJuKGUpO1xuICAgIH1cbiAgfVxufVxuXG5hc3luYyBmdW5jdGlvbiBkb0V4dHJhY3RBcmNoaXZlKGN0eCwgZW52aXJvbm1lbnQsIGNvbmZpZywgc2V0dGluZ3MpXG57XG4gIGlmICghY29uZmlnLnNvdXJjZVVybClcbiAgICB0aHJvdyBcIlVua25vd24gc291cmNlVXJsXCI7XG4gIGlmICghY29uZmlnLmFyY2hpdmVEaXIpXG4gICAgdGhyb3cgXCJVbmtub3duIGFyY2hpdmVEaXJcIjtcbiAgaWYgKCFjb25maWcuZXh0cmFjdERpcilcbiAgICB0aHJvdyBcIlVua25vd24gZXh0cmFjdERpclwiO1xuXG4gIGlmICghYXdhaXQgZGlyZWN0b3J5RXhpc3RzKGNvbmZpZy5hcmNoaXZlRGlyKSkge1xuICAgIGNvbnNvbGUubG9nKGBta2RpciAtcCAke2NvbmZpZy5hcmNoaXZlRGlyfWApO1xuICAgIGF3YWl0IGZzLnByb21pc2VzLm1rZGlyKGNvbmZpZy5hcmNoaXZlRGlyLCB7IHJlY3Vyc2l2ZTogdHJ1ZSB9KTtcbiAgfVxuXG4gIGlmICghYXdhaXQgZGlyZWN0b3J5RXhpc3RzKGNvbmZpZy50ZW1wRGlyKSkge1xuICAgIGNvbnNvbGUubG9nKGBta2RpciAtcCAke2NvbmZpZy50ZW1wRGlyfWApO1xuICAgIGF3YWl0IGZzLnByb21pc2VzLm1rZGlyKGNvbmZpZy50ZW1wRGlyLCB7IHJlY3Vyc2l2ZTogdHJ1ZSB9KTtcbiAgfVxuXG4gIGNvbnN0IGFyY05hbWUgPSBwYXRoLmJhc2VuYW1lKGNvbmZpZy5zb3VyY2VVcmwpO1xuXG4gIGxldCBhcmNGaWxlO1xuICBsZXQgZG93bmxvYWRVcmxzID0gYXdhaXQgc2V0dGluZ3MuZ2V0KFwiZG93bmxvYWRVcmxzXCIpIHx8IHt9O1xuICBpZiAoZG93bmxvYWRVcmxzW2NvbmZpZy5zb3VyY2VVcmxdKVxuICAgIGFyY0ZpbGUgPSBkb3dubG9hZFVybHNbY29uZmlnLnNvdXJjZVVybF07XG4gIGVsc2Uge1xuICAgIGFyY0ZpbGUgPSBwYXRoLmpvaW4oY29uZmlnLmFyY2hpdmVEaXIsIGFyY05hbWUpO1xuICAgIGF3YWl0IHRyeVJlcXVlc3RHZXQoY29uZmlnLnNvdXJjZVVybCwgYXJjRmlsZSwgY3R4LnJlcXVlc3RBdHRlbXB0cyk7XG4gICAgZG93bmxvYWRVcmxzW2NvbmZpZy5zb3VyY2VVcmxdID0gYXJjRmlsZTtcbiAgICBhd2FpdCBzZXR0aW5ncy5zZXQoXCJkb3dubG9hZFVybHNcIiwgZG93bmxvYWRVcmxzKTtcbiAgfVxuXG4gIGxldCBleHRyYWN0RGlyO1xuICBsZXQgZXh0cmFjdEZpbGVzID0gYXdhaXQgc2V0dGluZ3MuZ2V0KFwiZXh0cmFjdEZpbGVzXCIpIHx8IHt9O1xuICBpZiAoZXh0cmFjdEZpbGVzW2FyY0ZpbGVdKSB7XG4gICAgZXh0cmFjdERpciA9IGV4dHJhY3RGaWxlc1thcmNGaWxlXTtcbiAgfVxuICBlbHNlIHtcbiAgICBleHRyYWN0RGlyID0gYXdhaXQgZnMucHJvbWlzZXMubWtkdGVtcChwYXRoLnJlc29sdmUoY29uZmlnLnRlbXBEaXIsIGFyY05hbWUgKyAnLicpKTtcbiAgXG4gICAgYXdhaXQgY21ha2UuZXh0cmFjdCh7XG4gICAgICBlbnZpcm9ubWVudCxcbiAgICAgIGZpbGVuYW1lOiBhcmNGaWxlLFxuICAgICAgd29ya0RpcjogZXh0cmFjdERpcixcbiAgICAgIGxvZ0ZpbGU6ICBwYXRoLmpvaW4oY29uZmlnLnRlbXBEaXIsIHBhdGguYmFzZW5hbWUoZXh0cmFjdERpcikgKyBcIi5sb2dcIiksXG4gICAgfSk7XG4gIFxuICAgIGNvbnN0IGV4dHJhY3RMaXN0ID0gYXdhaXQgZnMucHJvbWlzZXMucmVhZGRpcihleHRyYWN0RGlyKTtcbiAgICBpZiAoZXh0cmFjdExpc3QubGVuZ3RoID09PSAxKSB7XG4gICAgICBleHRyYWN0RGlyID0gcGF0aC5yZXNvbHZlKGV4dHJhY3REaXIsIGV4dHJhY3RMaXN0WzBdKTtcbiAgICAgIGlmICghYXdhaXQgZGlyZWN0b3J5RXhpc3RzKGV4dHJhY3REaXIpKSB7XG4gICAgICAgIGNvbnNvbGUubG9nKGBybSAtZnIgJHtleHRyYWN0RGlyfWApO1xuICAgICAgICBhd2FpdCBmcy5wcm9taXNlcy5ybShleHRyYWN0RGlyLCB7IHJlY3Vyc2l2ZTogdHJ1ZSB9KTtcbiAgICAgICAgdGhyb3cgYFN1cHBvcnQgb25seSBkaXJlY3RvcnkgZm9yIGFyY2hpdmVgO1xuICAgICAgfVxuICAgIH1cbiAgXG4gICAgaWYgKGF3YWl0IGRpcmVjdG9yeUV4aXN0cyhjb25maWcuZXh0cmFjdERpcikpIHtcbiAgICAgIC8vIFRPRE86IE1hcmdlIGV4dHJhY3REaXIgd2l0aCBvdXRwdXRcbiAgICAgIGNvbnNvbGUubG9nKGBybSAtZnIgJHtjb25maWcuZXh0cmFjdERpcn1gKTtcbiAgICAgIGF3YWl0IGZzLnByb21pc2VzLnJtKGNvbmZpZy5leHRyYWN0RGlyLCB7IHJlY3Vyc2l2ZTogdHJ1ZSB9KTtcbiAgICB9XG4gICAgZWxzZSB7XG4gICAgICBjb25zdCBwYXJlbnREaXIgPSBwYXRoLmRpcm5hbWUoY29uZmlnLmV4dHJhY3REaXIpO1xuICAgICAgaWYgKCFhd2FpdCBkaXJlY3RvcnlFeGlzdHMocGFyZW50RGlyKSkge1xuICAgICAgICBjb25zb2xlLmxvZyhgbWtkaXIgLXAgJHtwYXJlbnREaXJ9YCk7XG4gICAgICAgIGF3YWl0IGZzLnByb21pc2VzLm1rZGlyKHBhcmVudERpciwgeyByZWN1cnNpdmU6IHRydWUgfSk7IFxuICAgICAgfVxuICAgIH1cbiAgXG4gICAgY29uc29sZS5sb2coYG12ICR7ZXh0cmFjdERpcn0gJHtjb25maWcuZXh0cmFjdERpcn1gKTtcbiAgICBhd2FpdCBmcy5wcm9taXNlcy5yZW5hbWUoZXh0cmFjdERpciwgY29uZmlnLmV4dHJhY3REaXIpO1xuICBcbiAgICBleHRyYWN0RmlsZXNbYXJjRmlsZV0gPSBleHRyYWN0RGlyO1xuICAgIGF3YWl0IHNldHRpbmdzLnNldChcImV4dHJhY3RGaWxlc1wiLCBleHRyYWN0RmlsZXMpO1xuICB9XG5cbiAgaWYgKGNvbmZpZy5wYXRjaERpcikge1xuICAgIGxldCBwYXRjaERpcnMgPSBhd2FpdCBzZXR0aW5ncy5nZXQoXCJwYXRjaERpcnNcIikgfHwge307XG4gICAgaWYgKCFwYXRjaERpcnNbY29uZmlnLnBhdGNoRGlyXSkge1xuICAgICAgYXdhaXQgbWFrZVBhdGNoKGNvbmZpZy5wYXRjaERpciwgY29uZmlnLmV4dHJhY3REaXIpO1xuICAgICAgcGF0Y2hEaXJzW2NvbmZpZy5wYXRjaERpcl0gPSBjb25maWcuZXh0cmFjdERpcjtcbiAgICAgIGF3YWl0IHNldHRpbmdzLnNldChcInBhdGNoRGlyc1wiLCBwYXRjaERpcnMpO1xuICAgIH1cbiAgfVxufVxuXG5jb25zdCBhY3Rpb25IYW5kbGVycyA9IHtcbiAgbm9uZTogYXN5bmMgKGNvbmZpZywgZW52aXJvbm1lbnQsIHNldHRpbmdzKSA9PiB7XG4gICAgLyogZG8gbm90aGluZyAqL1xuICB9LFxuICBjbWFrZTogYXN5bmMgKGNvbmZpZywgZW52aXJvbm1lbnQsIHNldHRpbmdzKSA9PiB7XG4gICAgY29uc3Qgc291cmNlRGlyID0gZ2V0UGF0aFN0cmluZyhjb25maWcuc291cmNlRGlyKTtcbiAgICBjb25zdCBiaW5hcnlEaXIgPSBnZXRQYXRoU3RyaW5nKGNvbmZpZy5iaW5hcnlEaXIpO1xuICAgIGNvbnN0IGNtYWtlQXJncyA9IHtcbiAgICAgIGVudmlyb25tZW50OiB7XG4gICAgICAgIC4uLmVudmlyb25tZW50LFxuICAgICAgICBERVNURElSOiBjb25maWcuZGVzdERpcixcbiAgICAgIH0sXG4gICAgICBnZW5lcmF0b3I6IGNvbmZpZy5nZW5lcmF0b3IgfHwgXCJVbml4IE1ha2VmaWxlc1wiLFxuICAgICAgY2FjaGVWYXJpYWJsZXM6IGNvbmZpZy5jYWNoZVZhcmlhYmxlcyxcbiAgICAgIHNvdXJjZURpcixcbiAgICAgIGJpbmFyeURpcixcbiAgICB9O1xuXG4gICAgaWYgKCFjbWFrZUFyZ3MuY2FjaGVWYXJpYWJsZXMuQ01BS0VfQlVJTERfVFlQRSkge1xuICAgICAgY21ha2VBcmdzLmNhY2hlVmFyaWFibGVzLkNNQUtFX0JVSUxEX1RZUEUgPSBjb25maWcuYnVpbGRUeXBlO1xuICAgIH1cblxuICAgIGF3YWl0IGNtYWtlLmNvbmZpZ3VyZShjbWFrZUFyZ3MpO1xuICAgIGF3YWl0IGNtYWtlLmJ1aWxkKGNtYWtlQXJncyk7XG4gICAgYXdhaXQgY21ha2UuaW5zdGFsbChjbWFrZUFyZ3MpO1xuICB9LFxuICBjb25maWd1cmU6IGFzeW5jIChjb25maWcsIGVudmlyb25tZW50LCBzZXR0aW5ncykgPT4ge1xuICAgIGNvbnN0IHNvdXJjZURpciA9IGdldFBhdGhTdHJpbmcoY29uZmlnLnNvdXJjZURpcik7XG4gICAgY29uc3QgYmluYXJ5RGlyID0gZ2V0UGF0aFN0cmluZyhjb25maWcuYmluYXJ5RGlyKTtcbiAgICBsZXQgc3RlcCA9IGF3YWl0IHNldHRpbmdzLmdldChcImNvbmZpZ3VyZVwiKSB8fCBcImNvbmZpZ1wiO1xuICAgIGlmIChzdGVwID09PSBcImNvbmZpZ1wiKSB7XG4gICAgICBjb25zdCBjb21tYW5kID0gcGF0aC5yZXNvbHZlKHNvdXJjZURpciwgXCJjb25maWd1cmVcIik7XG4gICAgICBjb25zdCBwYXJhbXMgPSBbXTtcbiAgICAgIGlmIChBcnJheS5pc0FycmF5KGNvbmZpZy52YXJpYWJsZXMpKSB7XG4gICAgICAgIGZvciAoY29uc3QgaXRlciBvZiBjb25maWcudmFyaWFibGVzKVxuICAgICAgICAgIHBhcmFtcy5wdXNoKGl0ZXIpO1xuICAgICAgfVxuICAgICAgZWxzZSBpZiAoY29uZmlnLnZhcmlhYmxlcykge1xuICAgICAgICBmb3IgKGNvbnN0IFtrZXksdmFsXSBvZiBPYmplY3QuZW50cmllcyhjb25maWcudmFyaWFibGVzKSkge1xuICAgICAgICAgIGlmIChrZXkgPT09IFwiZmVhdHVyZXNcIiAmJiBBcnJheS5pc0FycmF5KHZhbCkpIHtcbiAgICAgICAgICAgIGZvciAoY29uc3QgaXRlciBvZiB2YWwpXG4gICAgICAgICAgICAgIHBhcmFtcy5wdXNoKGAtLSR7aXRlcn1gKTtcbiAgICAgICAgICB9XG4gICAgICAgICAgZWxzZSBpZiAodmFsID09PSBudWxsKVxuICAgICAgICAgICAgcGFyYW1zLnB1c2goYC0tJHtrZXl9YCk7XG4gICAgICAgICAgZWxzZVxuICAgICAgICAgICAgcGFyYW1zLnB1c2goYC0tJHtrZXl9PSR7dmFsfWApO1xuICAgICAgICB9XG4gICAgICB9XG4gICAgICBpZiAoY29uZmlnLmZlYXR1cmVzKSB7XG4gICAgICAgIGZvciAoY29uc3Qga2V5IG9mIGNvbmZpZy5mZWF0dXJlcylcbiAgICAgICAgICBwYXJhbXMucHVzaChgLS0ke2tleX1gKTtcbiAgICAgIH1cbiAgICAgIGNvbnN0IHJlczEgPSBhd2FpdCBzcGF3bkFzeW5jKGNvbW1hbmQsIHBhcmFtcywge1xuICAgICAgICBjd2Q6IGJpbmFyeURpcixcbiAgICAgICAgZW52OiBlbnZpcm9ubWVudCxcbiAgICAgICAgZXh0cmE6IHtcbiAgICAgICAgICBvdXRwdXQ6IGBhYy5jb25maWcubG9nYCxcbiAgICAgICAgfSxcbiAgICAgIH0pO1xuICAgICAgaWYgKHJlczEuc3RhdHVzICE9PSAwKSB7XG4gICAgICAgIHRocm93IGBjb25maWd1cmUgcmV0dXJuZWQgc3RhdHVzICR7cmVzMS5zdGF0dXN9YDtcbiAgICAgIH1cbiAgICAgIHN0ZXAgPSBcImluc3RhbGxcIjtcbiAgICAgIGF3YWl0IHNldHRpbmdzLnNldChcImNvbmZpZ3VyZVwiLCBzdGVwKTtcbiAgICB9XG4gICAgaWYgKHN0ZXAgPT09IFwiaW5zdGFsbFwiKSB7XG4gICAgICBjb25zdCBhcmdzID0gWyAnaW5zdGFsbCcgXTtcbiAgICAgIGlmIChjb25maWcuZGVzdERpcikge1xuICAgICAgICBhcmdzLnB1c2goYERFU1RESVI9JHtjb25maWcuZGVzdERpcn1gKTtcbiAgICAgIH1cbiAgICAgIGNvbnN0IHJlczIgPSBhd2FpdCBzcGF3bkFzeW5jKFwibWFrZVwiLCBhcmdzLCB7XG4gICAgICAgIGN3ZDogYmluYXJ5RGlyLFxuICAgICAgICBlbnY6IGVudmlyb25tZW50LFxuICAgICAgICBleHRyYToge1xuICAgICAgICAgIG91dHB1dDogYGFjLmJ1aWxkLmxvZ2AsXG4gICAgICAgIH0sXG4gICAgICB9KTtcbiAgICAgIGlmIChyZXMyLnN0YXR1cyAhPT0gMCkge1xuICAgICAgICB0aHJvdyBgbWFrZSByZXR1cm5lZCBzdGF0dXMgJHtyZXMyLnN0YXR1c31gO1xuICAgICAgfVxuICAgICAgc3RlcCA9IFwiZG9uZVwiO1xuICAgICAgYXdhaXQgc2V0dGluZ3Muc2V0KFwiY29uZmlndXJlXCIsIHN0ZXApO1xuICAgIH1cbiAgfSxcbiAgbWFrZTogYXN5bmMgKGNvbmZpZywgZW52aXJvbm1lbnQsIHNldHRpbmdzKSA9PiB7XG4gICAgY29uc3QgYmluYXJ5RGlyID0gZ2V0UGF0aFN0cmluZyhjb25maWcuYmluYXJ5RGlyKTtcbiAgICBjb25zdCBhcmdzID0gY29uZmlnLmFyZ3MgfHwgW107XG4gICAgaWYgKGNvbmZpZy5kZXN0RGlyKSB7XG4gICAgICBhcmdzLnB1c2goYERFU1RESVI9JHtjb25maWcuZGVzdERpcn1gKTtcbiAgICB9XG4gICAgY29uc3QgcmVzMiA9IGF3YWl0IHNwYXduQXN5bmMoXCJtYWtlXCIsIGFyZ3MsIHtcbiAgICAgIGN3ZDogYmluYXJ5RGlyLFxuICAgICAgZW52OiBlbnZpcm9ubWVudCxcbiAgICAgIGV4dHJhOiB7XG4gICAgICAgIG91dHB1dDogYG1ha2UubG9nYCxcbiAgICAgIH0sXG4gICAgfSk7XG4gICAgaWYgKHJlczIuc3RhdHVzICE9PSAwKSB7XG4gICAgICB0aHJvdyBgbWFrZSByZXR1cm5lZCBzdGF0dXMgJHtyZXMyLnN0YXR1c31gO1xuICAgIH1cbiAgfSxcbiAgcHJvY2VzczogYXN5bmMgKGNvbmZpZywgZW52aXJvbm1lbnQsIHNldHRpbmdzKSA9PiB7XG4gICAgaWYgKCFjb25maWcuY29tbWFuZClcbiAgICAgIHRocm93IFwiUmVxdWlyZWQgY29tbWFuZCBmaWVsZCBmb3IgcHJvY2VzcyBhY3Rpb25cIjtcbiAgICBjb25zdCBzb3VyY2VEaXIgPSBnZXRQYXRoU3RyaW5nKGNvbmZpZy5zb3VyY2VEaXIpO1xuICAgIGNvbnN0IGJpbmFyeURpciA9IGdldFBhdGhTdHJpbmcoY29uZmlnLmJpbmFyeURpcik7XG4gICAgbGV0IHsgY29tbWFuZCB9ID0gY29uZmlnO1xuICAgIGlmICghcGF0aC5pc0Fic29sdXRlKGNvbW1hbmQpICYmIChjb21tYW5kLmluY2x1ZGVzKHBhdGgucG9zaXguZGVsaW1pdGVyKSB8fCBjb21tYW5kLmluY2x1ZGVzKHBhdGgud2luMzIuZGVsaW1pdGVyKSkpIHtcbiAgICAgIGNvbW1hbmQgPSBwYXRoLnJlc29sdmUoc291cmNlRGlyLCBjb21tYW5kKTtcbiAgICB9XG4gICAgY29uc3QgcmVzID0gYXdhaXQgc3Bhd25Bc3luYyhjb21tYW5kLCBjb25maWcuYXJncyB8fCBbXSwge1xuICAgICAgY3dkOiBiaW5hcnlEaXIsXG4gICAgICBlbnY6IGVudmlyb25tZW50LFxuICAgICAgZXh0cmE6IHtcbiAgICAgICAgb3V0cHV0OiBgcHJvY2Vzcy5sb2dgLFxuICAgICAgfSxcbiAgICB9KTtcbiAgICBpZiAocmVzLnN0YXR1cyAhPT0gMCkge1xuICAgICAgdGhyb3cgYHByb2Nlc3MgcmV0dXJuZWQgc3RhdHVzICR7cmVzLnN0YXR1c31gO1xuICAgIH1cbiAgfSxcbiAgYml0bWFrZTogYWN0aW9uTWFrZVNjcmlwdCxcbn07XG5cbmFzeW5jIGZ1bmN0aW9uIGRvVGFyZ2V0QnVpbGQoY3R4LCBlbnZpcm9ubWVudCwgY29uZmlnLCBzZXR0aW5ncylcbntcbiAgaWYgKGNvbmZpZy5wcmVBY3Rpb24pIHtcbiAgICBhd2FpdCBzZXR0aW5ncy5wdXNoKFwicHJlQWN0aW9uXCIpO1xuICAgIGNvbnN0IG5ld0NvbmZpZyA9IHt9O1xuICAgIGFzc2lnbk9iamVjdChuZXdDb25maWcsIGNvbmZpZyk7XG4gICAgZGVsZXRlIG5ld0NvbmZpZy5hY3Rpb247XG4gICAgZGVsZXRlIG5ld0NvbmZpZy5wcmVBY3Rpb247XG4gICAgZGVsZXRlIG5ld0NvbmZpZy5wb3N0QWN0aW9uO1xuICAgIGFzc2lnbk9iamVjdChuZXdDb25maWcsIGNvbmZpZy5wcmVBY3Rpb24pO1xuICAgIGNvbnN0IG5ld0Vudmlyb25tZW50ID0gbWVyZ2VFbnZpcm9ubWVudChjb25maWcucHJlQWN0aW9uLmVudmlyb25tZW50LCBlbnZpcm9ubWVudCk7XG4gICAgYXdhaXQgZG9UYXJnZXRCdWlsZChjdHgsIG5ld0Vudmlyb25tZW50LCBuZXdDb25maWcsIHNldHRpbmdzKTtcbiAgICBhd2FpdCBzZXR0aW5ncy5wb3AoKTtcbiAgfVxuXG4gIGlmIChBcnJheS5pc0FycmF5KGNvbmZpZy5hY3Rpb24pKSB7XG4gICAgYXdhaXQgc2V0dGluZ3MucHVzaChcImFjdGlvblwiKTtcbiAgICBmb3IgKHZhciBpID0gMDsgaSA8IGNvbmZpZy5hY3Rpb24ubGVuZ3RoOyArK2kpIHtcbiAgICAgIGF3YWl0IHNldHRpbmdzLnB1c2goaSk7XG4gICAgICBjb25zdCBuZXdDb25maWcgPSB7fTtcbiAgICAgIGFzc2lnbk9iamVjdChuZXdDb25maWcsIGNvbmZpZyk7XG4gICAgICBkZWxldGUgbmV3Q29uZmlnLmFjdGlvbjtcbiAgICAgIGRlbGV0ZSBuZXdDb25maWcucHJlQWN0aW9uO1xuICAgICAgZGVsZXRlIG5ld0NvbmZpZy5wb3N0QWN0aW9uO1xuICAgICAgYXNzaWduT2JqZWN0KG5ld0NvbmZpZywgY29uZmlnLmFjdGlvbltpXSk7XG4gICAgICBjb25zdCBuZXdFbnZpcm9ubWVudCA9IG1lcmdlRW52aXJvbm1lbnQoY29uZmlnLmFjdGlvbltpXS5lbnZpcm9ubWVudCwgZW52aXJvbm1lbnQpO1xuICAgICAgYXdhaXQgZG9UYXJnZXRCdWlsZChjdHgsIG5ld0Vudmlyb25tZW50LCBuZXdDb25maWcsIHNldHRpbmdzKTtcbiAgICAgIGF3YWl0IHNldHRpbmdzLnBvcCgpO1xuICAgIH1cbiAgICBhd2FpdCBzZXR0aW5ncy5wb3AoKTtcbiAgfVxuICBlbHNlIHtcbiAgICBpZiAoIWF3YWl0IGRpcmVjdG9yeUV4aXN0cyhjb25maWcuYmluYXJ5RGlyKSkge1xuICAgICAgYXdhaXQgZnMucHJvbWlzZXMubWtkaXIoY29uZmlnLmJpbmFyeURpciwgeyByZWN1cnNpdmU6IHRydWUgfSk7XG4gICAgfVxuICAgIGlmIChhY3Rpb25IYW5kbGVyc1tjb25maWcuYWN0aW9uXSkge1xuICAgICAgY29uZmlnLmRlc2NyaXB0aW9uICYmIGNvbnNvbGUubG9nKGNvbmZpZy5kZXNjcmlwdGlvbik7XG4gICAgICBhd2FpdCBhY3Rpb25IYW5kbGVyc1tjb25maWcuYWN0aW9uXShjb25maWcsIGVudmlyb25tZW50LCBzZXR0aW5ncyk7XG4gICAgfVxuICB9XG5cbiAgaWYgKGNvbmZpZy5wb3N0QWN0aW9uKSB7XG4gICAgYXdhaXQgc2V0dGluZ3MucHVzaChcInBvc3RBY3Rpb25cIik7XG4gICAgY29uc3QgbmV3Q29uZmlnID0ge307XG4gICAgYXNzaWduT2JqZWN0KG5ld0NvbmZpZywgY29uZmlnKTtcbiAgICBkZWxldGUgbmV3Q29uZmlnLmFjdGlvbjtcbiAgICBkZWxldGUgbmV3Q29uZmlnLnByZUFjdGlvbjtcbiAgICBkZWxldGUgbmV3Q29uZmlnLnBvc3RBY3Rpb247XG4gICAgYXNzaWduT2JqZWN0KG5ld0NvbmZpZywgY29uZmlnLnBvc3RBY3Rpb24pO1xuICAgIGNvbnN0IG5ld0Vudmlyb25tZW50ID0gbWVyZ2VFbnZpcm9ubWVudChjb25maWcucG9zdEFjdGlvbi5lbnZpcm9ubWVudCwgZW52aXJvbm1lbnQpO1xuICAgIGF3YWl0IGRvVGFyZ2V0QnVpbGQoY3R4LCBuZXdFbnZpcm9ubWVudCwgbmV3Q29uZmlnLCBzZXR0aW5ncyk7XG4gICAgYXdhaXQgc2V0dGluZ3MucG9wKCk7XG4gIH1cbn1cblxuZXhwb3J0IGRlZmF1bHQgYXN5bmMgZnVuY3Rpb24oY3R4KSB7XG4gIGNvbnN0IHVzZXJDb25maWcgPSBhd2FpdCBjdHguZ2V0VXNlckNvbmZpZygpO1xuICBjb25zdCBidWlsZENvbmZpZyA9IG1ha2VCdWlsZENvbmZpZyhjdHgsIHVzZXJDb25maWcpO1xuXG4gIGNvbnN0IGpzb25Db25maWcgPSBKU09OLnN0cmluZ2lmeShidWlsZENvbmZpZywgbnVsbCwgMik7XG4gIGNvbnN0IGR1bXBDb25maWdQYXRoID0gcGF0aC5wb3NpeC5qb2luKGJ1aWxkQ29uZmlnLmJpbmFyeVJvb3QsIEJVSUxEX0NPTkZJR19GSUxFKTtcbiAgYXdhaXQgc2F2ZUlmRGlmZmVyZW50KGR1bXBDb25maWdQYXRoLCBqc29uQ29uZmlnKTtcblxuICBjb25zdCBzZXR0aW5nc0ZpbGVuYW1lID0gcGF0aC5yZXNvbHZlKGJ1aWxkQ29uZmlnLmJpbmFyeVJvb3QsIEJVSUxEX1NFVFRJTkdTX0ZJTEUpO1xuICBjb25zdCBzZXR0aW5ncyA9IG5ldyBTZXR0aW5nc1N0b3JhZ2Uoc2V0dGluZ3NGaWxlbmFtZSk7XG5cbiAgZm9yIChjb25zdCBba2V5LCBlbnRyeV0gb2YgT2JqZWN0LmVudHJpZXMoYnVpbGRDb25maWcpKSB7XG4gICAgaWYgKGVudHJ5ICYmIHR5cGVvZiBlbnRyeSA9PT0gXCJvYmplY3RcIiAmJiBlbnRyeS5hY3Rpb24gJiYgIWVudHJ5LmRpc2FibGVkKSB7XG4gICAgICBhd2FpdCBzZXR0aW5ncy5wdXNoKGtleSk7XG4gICAgICBjb25zdCBjb21wbGV0ZWQgPSBhd2FpdCBzZXR0aW5ncy5nZXQoXCJjb21wbGV0ZWRcIik7XG4gICAgICBpZiAoZW50cnkucmVidWlsZCB8fCAhY29tcGxldGVkKSB7XG4gICAgICAgIGxvZ2dlci5pbmZvKGBTdGFydGVkIGFjdGlvbjogJHtrZXl9YCk7XG4gICAgICAgIGNvbnN0IGVudmlyb25tZW50ID0gbWVyZ2VFbnZpcm9ubWVudChlbnRyeS5lbnZpcm9ubWVudCwgcHJvY2Vzcy5lbnYpO1xuICAgICAgICBpZiAoZW50cnkuc291cmNlVXJsKSB7XG4gICAgICAgICAgYXdhaXQgZG9FeHRyYWN0QXJjaGl2ZShjdHgsIGVudmlyb25tZW50LCBlbnRyeSwgc2V0dGluZ3MpO1xuICAgICAgICB9XG4gICAgICAgIGF3YWl0IGRvVGFyZ2V0QnVpbGQoY3R4LCBlbnZpcm9ubWVudCwgZW50cnksIHNldHRpbmdzKTtcbiAgICAgICAgYXdhaXQgc2V0dGluZ3Muc2V0KFwiY29tcGxldGVkXCIsIHRydWUpO1xuICAgICAgICBsb2dnZXIuaW5mbyhgQ29tcGxldGVkIGFjdGlvbjogJHtrZXl9YCk7XG4gICAgICB9XG4gICAgICBhd2FpdCBzZXR0aW5ncy5wb3AoKTtcbiAgICB9XG4gIH1cbn1cbiIsIm1vZHVsZS5leHBvcnRzID0ge1xuICBERUZBVUxUX1BSRVNFVDogXCJtYWluXCIsXG4gIFVTRVJfQ09ORklHOiBcImJpdG1ha2UuY29uZmlnLm1qc1wiLFxuICBSRVFVRVNUX0FUVEVNUFRTOiAzMCxcbiAgQlVJTERfQ09ORklHX0ZJTEU6IFwiQnVpbGRDb25maWcuanNvblwiLFxuICBCVUlMRF9TRVRUSU5HU19GSUxFOiBcIkJ1aWxkU2V0dGluZ3MuanNvblwiLFxufTtcbiIsImltcG9ydCBmcyBmcm9tIFwibm9kZTpmc1wiO1xuXG5pbXBvcnQgeyBmaWxlRXhpc3RzIH0gZnJvbSBcIkAvdXRpbHMvRmlsZVN5c3RlbVwiO1xuaW1wb3J0IHsgREVGQVVMVF9QUkVTRVQgfSBmcm9tIFwiQC9Db25zdGFudHMuanNcIjtcblxuZXhwb3J0IGRlZmF1bHQgYXN5bmMgZnVuY3Rpb24oY3R4KVxue1xuICBjb25zdCBwcmVzZXQgPSBjdHguZW52LnByZXNldCB8fCBERUZBVUxUX1BSRVNFVDtcbiAgY29uc3QgcHJlc2V0UGF0aCA9IGN0eC5nZXRQcmVzZXRQYXRoKHByZXNldCk7XG4gIGlmICghYXdhaXQgZmlsZUV4aXN0cyhwcmVzZXRQYXRoKSlcbiAgICB0aHJvdyBgUHJlc2V0ICcke3ByZXNldH0nIGlzIG5vdCBhdmFpbGFibGVgO1xuXG4gIGlmIChhd2FpdCBmaWxlRXhpc3RzKGN0eC51c2VyQ29uZmlnUGF0aCkpXG4gICAgYXdhaXQgZnMucHJvbWlzZXMucm0oY3R4LnVzZXJDb25maWdQYXRoKTtcblxuICBhd2FpdCBmcy5wcm9taXNlcy5jb3B5RmlsZShwcmVzZXRQYXRoLCBjdHgudXNlckNvbmZpZ1BhdGgpO1xuICBjb25zb2xlLmxvZyhgUHJlc2V0ICcke3ByZXNldH0nIGluc3RhbGxlZCBzdWNjZXNzZnVsbHlgKTtcbn1cbiIsIlwidXNlIHN0cmljdFwiO1xuXG5jb25zdCBmcyA9IHJlcXVpcmUoXCJub2RlOmZzXCIpO1xuY29uc3QgcGF0aCA9IHJlcXVpcmUoXCJub2RlOnBhdGhcIik7XG5cbmNvbnN0IHsgVXNlckNvbnRleHQgfSA9IHJlcXVpcmUoXCIuL2JpdG1ha2UvVXNlckNvbnRleHQuanNcIik7XG5jb25zdCB7IFBsdWdpbkNvbnRleHQgfSA9IHJlcXVpcmUoXCIuL2JpdG1ha2UvUGx1Z2luQ29udGV4dC5qc1wiKTtcbmNvbnN0IHsgR2xvYmFsQ29udGV4dCB9ID0gcmVxdWlyZShcIi4vYml0bWFrZS9HbG9iYWxDb250ZXh0LmpzXCIpO1xuY29uc3QgeyBTeXN0ZW1WYXJpYWJsZXMgfSA9IHJlcXVpcmUoXCIuL2JpdG1ha2UvU3lzdGVtVmFyaWFibGVzLmpzXCIpO1xuY29uc3QgeyBHb2FsQ29sbGVjdGlvbiB9ID0gcmVxdWlyZShcIkAvY29yZS9Hb2FsQ29sbGVjdGlvblwiKTtcbmNvbnN0IHsgZ2V0UGF0aFN0cmluZyB9ICA9IHJlcXVpcmUoXCJAL3V0aWxzL0ZpbGVTeXN0ZW1cIik7XG5jb25zdCB7IEZpbGVQYXRoIH0gPSByZXF1aXJlKFwiQC9jb3JlL1BhdGhcIik7XG5jb25zdCB7IGltcG9ydE1vZHVsZSB9ICA9IHJlcXVpcmUoXCJAL3V0aWxzL01vZHVsZVwiKTtcbmNvbnN0IFN5c1ZhcnMgPSByZXF1aXJlKFwiQC9jb3JlL1N5c3RlbVZhcmlhYmxlc1wiKTtcblxuY29uc3QgUEFDS0FHRV9KU09OID0gXCJwYWNrYWdlLmpzb25cIjtcbmNvbnN0IE1BS0VfQ0FDSEUgPSBcIk1ha2VDYWNoZS5qc29uXCI7XG5cbmFzeW5jIGZ1bmN0aW9uIGFjdGlvbk1ha2VTY3JpcHQoY29uZmlnLCBlbnZpcm9ubWVudCwgc2V0dGluZ3MpXG57XG4gIHByb2Nlc3MuZW52ID0gZW52aXJvbm1lbnQ7XG5cbiAgU3lzdGVtVmFyaWFibGVzLmRlZmluZVZhcmlhYmxlcyhTeXN0ZW1WYXJpYWJsZXMucHJvdG90eXBlLCBTeXNWYXJzLmRlZmF1bHQpO1xuICBjb25zdCBzY29wZSA9IFN5c3RlbVZhcmlhYmxlcy5jcmVhdGUoKTtcblxuICBjb25zdCBzb3VyY2VEaXIgPSBnZXRQYXRoU3RyaW5nKGNvbmZpZy5zb3VyY2VEaXIpO1xuICBjb25zdCBiaW5hcnlEaXIgPSBnZXRQYXRoU3RyaW5nKGNvbmZpZy5iaW5hcnlEaXIpO1xuXG4gIHNjb3BlLlBST0pFQ1RfU09VUkNFX0RJUiA9IHNvdXJjZURpcjtcbiAgc2NvcGUuUFJPSkVDVF9CSU5BUllfRElSID0gYmluYXJ5RGlyO1xuXG4gIHNjb3BlLlBBQ0tBR0VfRklMRSA9IHNjb3BlLlBST0pFQ1RfU09VUkNFX0RJUi5qb2luKFBBQ0tBR0VfSlNPTik7XG4gIHNjb3BlLkNBQ0hFX0ZJTEUgPSBzY29wZS5QUk9KRUNUX0JJTkFSWV9ESVIuam9pbihNQUtFX0NBQ0hFKTtcbiAgc2NvcGUuU09VUkNFX0RJUiA9IHNjb3BlLlBST0pFQ1RfU09VUkNFX0RJUjtcbiAgc2NvcGUuQklOQVJZX0RJUiA9IHNjb3BlLlBST0pFQ1RfQklOQVJZX0RJUjtcblxuICBjb25zdCBnbG9iYWwgPSBHbG9iYWxDb250ZXh0LmNyZWF0ZSgpO1xuICBnbG9iYWwubG9hZENhY2hlVmFyaWFibGVzKHNjb3BlLkNBQ0hFX0ZJTEUpO1xuXG4gIGNvbnN0IHBhY2thZ2VKc29uID0gYXdhaXQgZnMucHJvbWlzZXMucmVhZEZpbGUoc2NvcGUuUEFDS0FHRV9GSUxFLnRvU3RyaW5nKCksICd1dGY4Jyk7XG4gIGNvbnN0IHBrZyA9IEpTT04ucGFyc2UocGFja2FnZUpzb24pO1xuXG4gIHNjb3BlLkJVSUxEX1RZUEUgPSBjb25maWcuYnVpbGRUeXBlO1xuICBzY29wZS5QUk9KRUNUX05BTUUgPSBwa2cubmFtZTtcbiAgc2NvcGUuUFJPSkVDVF9WRVJTSU9OID0gcGtnLnZlcnNpb247XG4gIHNjb3BlLlBST0pFQ1RfREVTQ1JJUFRJT04gPSBwa2cuZGVzY3JpcHRpb247XG4gIHNjb3BlLlBST0pFQ1RfSE9NRVBBR0VfVVJMID0gcGtnLmhvbWVwYWdlO1xuXG4gIGlmIChjb25maWcuZGVzdERpcilcbiAgICBzY29wZS5ERVNURElSID0gY29uZmlnLmRlc3REaXI7XG5cbiAgY29uc3Qgcm9vdCA9IFVzZXJDb250ZXh0LmNyZWF0ZShzY29wZSwgZ2xvYmFsKTtcblxuICBpZiAoY29uZmlnLnZhcmlhYmxlcykge1xuICAgIGZvciAoY29uc3QgW2tleSwgdmFsXSBvZiBPYmplY3QuZW50cmllcyhjb25maWcudmFyaWFibGVzKSkge1xuICAgICAgcm9vdFtrZXldID0gdmFsO1xuICAgIH1cbiAgfVxuXG4gIGlmIChyb290LlRPT0xDSEFJTl9GSUxFKSB7XG4gICAgY29uc3QgdG9vbGNoYWluID0gYXdhaXQgaW1wb3J0TW9kdWxlKHJvb3QuVE9PTENIQUlOX0ZJTEUpO1xuICAgIGlmICghdG9vbGNoYWluLmRlZmF1bHQpXG4gICAgICB0aHJvdyBuZXcgRXJyb3IoXCJUb29sY2hhaW4gbW9kdWxlIGhhcyBubyBkZWZhdWx0IGV4cG9ydFwiKTtcbiAgICBjb25zdCByZXN1bHQgPSB0b29sY2hhaW4uZGVmYXVsdChyb290KTtcbiAgICBpZiAocmVzdWx0IGluc3RhbmNlb2YgUHJvbWlzZSlcbiAgICAgIGF3YWl0IHJlc3VsdDtcbiAgfVxuXG4gIGNvbnN0IHBsdWdpbkNvbnRleHQgPSBQbHVnaW5Db250ZXh0LmNyZWF0ZShzY29wZSwgZ2xvYmFsKTtcbiAgZm9yIChjb25zdCBwbHVnaW4gb2YgKHJvb3QuTUFLRV9QTFVHSU5fTElTVCB8fCBbXSkpIHtcbiAgICBjb25zdCBmaWxlbmFtZSA9IEZpbGVQYXRoLmNyZWF0ZShwbHVnaW4pO1xuICAgIGNvbnN0IG1vZHVsZSA9IGF3YWl0IGltcG9ydE1vZHVsZShmaWxlbmFtZS50b1N0cmluZygpKTtcbiAgICBpZiAoIW1vZHVsZS5wbHVnaW5FbnRyeSlcbiAgICAgIHRocm93IG5ldyBFcnJvcihgUGx1Z2luICR7ZmlsZW5hbWUuYmFzZW5hbWUoKX0gbm90IGNvbnRhaW4gcGx1Z2luRW50cnkgZnVuY3Rpb25gKTtcbiAgICBjb25zdCByZXN1bHQgPSBtb2R1bGUucGx1Z2luRW50cnkocGx1Z2luQ29udGV4dCk7XG4gICAgaWYgKHJlc3VsdCBpbnN0YW5jZW9mIFByb21pc2UpXG4gICAgICBhd2FpdCByZXN1bHQ7XG4gIH1cblxuICBnbG9iYWwuYWRkU3ViZGlyZWN0b3J5KHJvb3QpO1xuICBhd2FpdCBnbG9iYWwuZG9TdWJkaXJlY3RvcnkoKTtcbiAgcm9vdC5sb2dJbmZvKFwiQ29uZmlndXJpbmcgZG9uZVwiKTtcblxuICBpZiAocm9vdC5HTE9CQUxfQ09OVEVYVF9KU09OKSB7XG4gICAgY29uc3QgZmlsZW5hbWUgPSByb290LkdMT0JBTF9DT05URVhUX0pTT04udG9TdHJpbmcoKTtcbiAgICBjb25zdCBjb250ZW50ID0gSlNPTi5zdHJpbmdpZnkoZ2xvYmFsLCBudWxsLCAyKTtcbiAgICBmcy5ta2RpclN5bmMocGF0aC5kaXJuYW1lKGZpbGVuYW1lKSwgeyByZWN1cnNpdmU6IHRydWUgfSk7XG4gICAgZnMud3JpdGVGaWxlU3luYyhmaWxlbmFtZSwgY29udGVudCwgeyBlbmNvZGluZzogXCJ1dGY4XCIgfSk7XG4gIH1cblxuICBjb25zdCBhbGxHb2FsTGlzdCA9IGdsb2JhbC5jcmVhdGVHb2Fscyhyb290KTtcbiAgY29uc3QgZ29hbExpc3QgPSBhbGxHb2FsTGlzdC5nZXRUYXJnZXRMaXN0KFwiaW5zdGFsbFwiKTtcblxuICBpZiAocm9vdC5UQVJHRVRfR09BTFNfSlNPTikge1xuICAgIGNvbnN0IGZpbGVuYW1lID0gcm9vdC5UQVJHRVRfR09BTFNfSlNPTi50b1N0cmluZygpO1xuICAgIGNvbnN0IGNvbnRlbnQgPSBKU09OLnN0cmluZ2lmeShnb2FsTGlzdCwgbnVsbCwgMik7XG4gICAgZnMubWtkaXJTeW5jKHBhdGguZGlybmFtZShmaWxlbmFtZSksIHsgcmVjdXJzaXZlOiB0cnVlIH0pO1xuICAgIGZzLndyaXRlRmlsZVN5bmMoZmlsZW5hbWUsIGNvbnRlbnQsIHsgZW5jb2Rpbmc6IFwidXRmOFwiIH0pO1xuICB9XG5cbiAgYXdhaXQgR29hbENvbGxlY3Rpb24uYnVpbGRHb2Fscyhnb2FsTGlzdCk7XG59XG5cbm1vZHVsZS5leHBvcnRzID0ge1xuICBhY3Rpb25NYWtlU2NyaXB0LFxufTtcbiIsImltcG9ydCBwYXRoIGZyb20gXCJub2RlOnBhdGhcIjtcbmltcG9ydCB1cmwgZnJvbSBcIm5vZGU6dXJsXCI7XG5cbmltcG9ydCB7IGZpbGVFeGlzdHMgfSBmcm9tIFwiQC91dGlscy9GaWxlU3lzdGVtXCI7XG5pbXBvcnQgY29uc3RhbnRzIGZyb20gXCJAL0NvbnN0YW50cy5qc1wiO1xuaW1wb3J0IHsgREVCVUdfQlVJTERfVFlQRSwgUkVMRUFTRV9CVUlMRF9UWVBFIH0gZnJvbSBcIkAvY29yZS9UeXBlc1wiO1xuaW1wb3J0IHsgaW1wb3J0TW9kdWxlIH0gZnJvbSBcIkAvdXRpbHMvTW9kdWxlXCI7XG5cbmNvbnN0IHsgVVNFUl9DT05GSUcsIERFRkFVTFRfUFJFU0VULCBSRVFVRVNUX0FUVEVNUFRTIH0gPSBjb25zdGFudHM7XG5cbmV4cG9ydCBjbGFzcyBSdW5TY3JpcHRDb250ZXh0IHtcbiAgX25vZGVFeGVjdXRhYmxlO1xuICBfY3VycmVudFNjcmlwdDtcbiAgX3NjcmlwdERpcjtcbiAgX3Jvb3REaXI7XG4gIF93b3JrRGlyO1xuICBfZW52O1xuICBfdXNlckNvbmZpZztcblxuICBjb25zdHJ1Y3RvcihvcHRpb25zKVxuICB7XG4gICAgdGhpcy5fbm9kZUV4ZWN1dGFibGUgPSBvcHRpb25zLm5vZGVFeGVjdXRhYmxlO1xuICAgIHRoaXMuX2N1cnJlbnRTY3JpcHQgPSBvcHRpb25zLmN1cnJlbnRTY3JpcHQ7XG4gICAgdGhpcy5fc2NyaXB0RGlyID0gb3B0aW9ucy5zY3JpcHREaXI7XG4gICAgdGhpcy5fcm9vdERpciA9IG9wdGlvbnMucm9vdERpcjtcbiAgICB0aGlzLl93b3JrRGlyID0gb3B0aW9ucy53b3JrRGlyO1xuICAgIHRoaXMuX2VudiA9IE9iamVjdC5zZWFsKE9iamVjdC5mcmVlemUob3B0aW9ucy5lbnYpKTtcblxuICAgIGlmIChvcHRpb25zLnVzZXJDb25maWcpIHtcbiAgICAgIHRoaXMuX3VzZXJDb25maWcgPSBvcHRpb25zLnVzZXJDb25maWc7XG4gICAgfVxuICB9XG5cbiAgZ2V0IG5vZGVFeGVjdXRhYmxlKClcbiAge1xuICAgIHJldHVybiB0aGlzLl9ub2RlRXhlY3V0YWJsZTtcbiAgfVxuXG4gIGdldCBjdXJyZW50U2NyaXB0KClcbiAge1xuICAgIHJldHVybiB0aGlzLl9jdXJyZW50U2NyaXB0O1xuICB9XG5cbiAgZ2V0IHNjcmlwdERpcigpXG4gIHtcbiAgICByZXR1cm4gdGhpcy5fc2NyaXB0RGlyO1xuICB9XG5cbiAgZ2V0IHJvb3REaXIoKVxuICB7XG4gICAgcmV0dXJuIHRoaXMuX3Jvb3REaXI7XG4gIH1cblxuICBnZXQgd29ya0RpcigpXG4gIHtcbiAgICByZXR1cm4gdGhpcy5fd29ya0RpcjtcbiAgfVxuXG4gIGdldCBlbnYoKVxuICB7XG4gICAgcmV0dXJuIHRoaXMuX2VudjtcbiAgfVxuXG4gIGdldFByZXNldFBhdGgocHJlc2V0KVxuICB7XG4gICAgcmV0dXJuIHBhdGgucmVzb2x2ZSh0aGlzLl9zY3JpcHREaXIsIGBwcmVzZXQvJHtwcmVzZXR9Lm1qc2ApO1xuICB9XG5cbiAgZ2V0IHVzZXJDb25maWdQYXRoKClcbiAge1xuICAgIHJldHVybiBwYXRoLnJlc29sdmUodGhpcy5fd29ya0RpciwgVVNFUl9DT05GSUcpO1xuICB9XG5cbiAgZ2V0IGJ1aWxkVHlwZSgpXG4gIHtcbiAgICByZXR1cm4gdGhpcy5fZW52LmJ1aWxkVHlwZSA9PSBERUJVR19CVUlMRF9UWVBFID8gdGhpcy5fZW52LmJ1aWxkVHlwZSA6IFJFTEVBU0VfQlVJTERfVFlQRTtcbiAgfVxuXG4gIGFzeW5jIGdldFVzZXJDb25maWcoKVxuICB7XG4gICAgaWYgKCF0aGlzLl91c2VyQ29uZmlnKSB7XG4gICAgICBsZXQgY29uZmlnUGF0aDtcbiAgICAgIGlmICh0aGlzLl9lbnYuY29uZmlnKSB7XG4gICAgICAgIGNvbmZpZ1BhdGggPSBwYXRoLmlzQWJzb2x1dGUodGhpcy5fZW52LmNvbmZpZykgPyB0aGlzLl9lbnYuY29uZmlnIDogcGF0aC5yZXNvbHZlKHRoaXMuX3dvcmtEaXIsIHRoaXMuX2Vudi5jb25maWcpO1xuICAgICAgICBpZiAoIWF3YWl0IGZpbGVFeGlzdHMoY29uZmlnUGF0aCkpXG4gICAgICAgICAgdGhyb3cgYENvbmZpZ3VyYXRpb24gJyR7dGhpcy5fZW52LmNvbmZpZ30nIGZpbGUgZG9lcyBub3QgZXhpc3RgO1xuICAgICAgfVxuICAgICAgZWxzZSB7XG4gICAgICAgIGNvbnN0IHVzZXJDb25maWdQYXRoID0gcGF0aC5yZXNvbHZlKHRoaXMuX3dvcmtEaXIsIFVTRVJfQ09ORklHKTtcbiAgICAgICAgaWYgKGF3YWl0IGZpbGVFeGlzdHModXNlckNvbmZpZ1BhdGgpKVxuICAgICAgICAgIGNvbmZpZ1BhdGggPSB1c2VyQ29uZmlnUGF0aDtcbiAgICAgICAgZWxzZVxuICAgICAgICAgIGNvbmZpZ1BhdGggPSB0aGlzLmdldFByZXNldFBhdGgoREVGQVVMVF9QUkVTRVQpO1xuICAgICAgfVxuXG4gICAgICBsZXQgdXNlckNvbmZpZyA9IHt9O1xuXG4gICAgICBpZiAoY29uZmlnUGF0aCkge1xuICAgICAgICBjb25zdCBjb25maWdVcmwgPSB1cmwucGF0aFRvRmlsZVVSTChjb25maWdQYXRoKTtcbiAgICAgICAgY29uc3QgY29uZmlnTW9kdWxlID0gYXdhaXQgaW1wb3J0TW9kdWxlKGNvbmZpZ1VybCk7XG4gICAgICAgIHN3aXRjaCAodHlwZW9mIGNvbmZpZ01vZHVsZS5kZWZhdWx0KSB7XG4gICAgICAgIGNhc2UgXCJmdW5jdGlvblwiOlxuICAgICAgICAgIHVzZXJDb25maWcgPSBjb25maWdNb2R1bGUuZGVmYXVsdCh0aGlzLl9lbnYsIHt9KTtcbiAgICAgICAgICBpZiAodXNlckNvbmZpZyBpbnN0YW5jZW9mIFByb21pc2UpXG4gICAgICAgICAgICB1c2VyQ29uZmlnID0gYXdhaXQgdXNlckNvbmZpZztcbiAgICAgICAgICBicmVhaztcbiAgICAgICAgY2FzZSBcIm9iamVjdFwiOlxuICAgICAgICAgIHVzZXJDb25maWcgPSBjb25maWdNb2R1bGUuZGVmYXVsdDtcbiAgICAgICAgICBicmVhaztcbiAgICAgICAgZGVmYXVsdDpcbiAgICAgICAgICB0aHJvdyBgVW5rbm93biB1c2VyIGNvbmZpZ3VyYXRpb24gdHlwZWA7XG4gICAgICAgIH1cbiAgICAgIH1cblxuICAgICAgdGhpcy5fdXNlckNvbmZpZyA9IHVzZXJDb25maWc7XG4gICAgfVxuICAgIHJldHVybiB0aGlzLl91c2VyQ29uZmlnO1xuICB9XG5cbiAgZ2V0IHJlcXVlc3RBdHRlbXB0cygpXG4gIHtcbiAgICByZXR1cm4gUkVRVUVTVF9BVFRFTVBUUztcbiAgfVxufTtcbiIsIlwidXNlIHN0cmljdFwiO1xuXG5jb25zdCBwYXRoID0gcmVxdWlyZShcIm5vZGU6cGF0aFwiKTtcbmNvbnN0IGZzID0gcmVxdWlyZShcIm5vZGU6ZnNcIik7XG5cbmNvbnN0IHsgQWJzb2x1dGVQYXRoIH0gPSByZXF1aXJlKFwiQC9jb3JlL1BhdGhcIik7XG5jb25zdCB7IGZpbGVFeGlzdHMsIGZpbGVFeGlzdHNTeW5jIH0gPSByZXF1aXJlKFwiQC91dGlscy9GaWxlU3lzdGVtXCIpO1xuY29uc3QgeyBUYXJnZXRDb2xsZWN0aW9uIH0gPSByZXF1aXJlKFwiLi9UYXJnZXRDb2xsZWN0aW9uLmpzXCIpO1xuY29uc3QgeyBTY3JpcHRDb2xsZWN0aW9uIH0gPSByZXF1aXJlKFwiLi9TY3JpcHRDb2xsZWN0aW9uLmpzXCIpO1xuY29uc3QgeyBJbnRlcmZhY2VUYXJnZXQgfSA9IHJlcXVpcmUoXCJAL2NvcmUvSW50ZXJmYWNlVGFyZ2V0XCIpO1xuY29uc3QgeyBVbmtub3duVGFyZ2V0IH0gPSByZXF1aXJlKFwiLi9Vbmtub3duVGFyZ2V0LmpzXCIpO1xuY29uc3QgeyBHb2FsQ29sbGVjdGlvbiB9ID0gcmVxdWlyZShcIkAvY29yZS9Hb2FsQ29sbGVjdGlvblwiKTtcbmNvbnN0IHsgSW50ZXJmYWNlT2JqZWN0cyB9ID0gcmVxdWlyZShcIkAvY29yZS9JbnRlcmZhY2VPYmplY3RzXCIpO1xuY29uc3QgeyBTb3VyY2VGaWxlIH0gPSByZXF1aXJlKFwiQC9jb3JlL1NvdXJjZUZpbGVcIik7XG5jb25zdCB7IE9iamVjdExpYnJhcnksIFN0YXRpY0xpYnJhcnksIFNoYXJlZExpYnJhcnksIEV4ZWN1dGFibGUgfSA9IHJlcXVpcmUoXCIuL1RhcmdldC5qc1wiKTtcbmNvbnN0IHsgRmlsZVBhdGggfSA9IHJlcXVpcmUoXCJAL2NvcmUvUGF0aFwiKTtcbmNvbnN0IHsgaW1wb3J0TW9kdWxlIH0gPSByZXF1aXJlKFwiQC91dGlscy9Nb2R1bGVcIik7XG5cbmNvbnN0IHJlcXVpcmVJbXBsID0gZXZhbChcInJlcXVpcmVcIik7XG5cbmNvbnN0IFRBUkdFVFMgPSBTeW1ib2woXCJUQVJHRVRTXCIpO1xuY29uc3QgU0NSSVBUUyA9IFN5bWJvbChcIlNDUklQVFNcIik7XG5jb25zdCBDQUNIRSA9IFN5bWJvbChcIkNBQ0hFXCIpO1xuY29uc3QgVU5LTk9XTl9UQVJHRVRTID0gU3ltYm9sKFwiVU5LTk9XTl9UQVJHRVRTXCIpO1xuY29uc3QgSU5URVJGQUNFX1NDUklQVFMgPSBTeW1ib2woXCJJTlRFUkZBQ0VfU0NSSVBUU1wiKTtcbmNvbnN0IElOU1RBTExfTElTVCA9IFN5bWJvbChcIklOU1RBTExfTElTVFwiKTtcbmNvbnN0IFNDUklQVF9WQVJJQUJMRVNfTUFQID0gU3ltYm9sKFwiU0NSSVBUX1ZBUklBQkxFU19NQVBcIik7XG5jb25zdCBTVUJESVJfQUxJQVMgPSBTeW1ib2woXCJTVUJESVJfQUxJQVNcIik7XG5jb25zdCBTVUJESVJfTElTVCA9IFN5bWJvbChcIlNVQkRJUl9MSVNUXCIpO1xuXG5mdW5jdGlvbiBHbG9iYWxDb250ZXh0KCkge1xuICB0aGlzW1RBUkdFVFNdID0gVGFyZ2V0Q29sbGVjdGlvbi5jcmVhdGUoKTtcbiAgdGhpc1tTQ1JJUFRTXSA9IFNjcmlwdENvbGxlY3Rpb24uY3JlYXRlKCk7XG4gIHRoaXNbQ0FDSEVdID0ge307XG4gIHRoaXNbVU5LTk9XTl9UQVJHRVRTXSA9IHt9O1xuICB0aGlzW0lOVEVSRkFDRV9TQ1JJUFRTXSA9IHt9O1xuICB0aGlzW0lOU1RBTExfTElTVF0gPSBbXTtcbiAgdGhpc1tTQ1JJUFRfVkFSSUFCTEVTX01BUF0gPSB7fTtcbiAgdGhpc1tTVUJESVJfQUxJQVNdID0ge307XG4gIHRoaXNbU1VCRElSX0xJU1RdID0gW107XG59XG5cbkdsb2JhbENvbnRleHQuY3JlYXRlID0gKCkgPT4ge1xuICByZXR1cm4gT2JqZWN0LnNlYWwobmV3IEdsb2JhbENvbnRleHQpO1xufVxuXG5HbG9iYWxDb250ZXh0LnByb3RvdHlwZSA9IE9iamVjdC5jcmVhdGUoT2JqZWN0LnByb3RvdHlwZSwge1xuICBjb25zdHJ1Y3Rvcjoge1xuICAgIHZhbHVlOiBHbG9iYWxDb250ZXh0LFxuICAgIGVudW1lcmFibGU6IGZhbHNlLFxuICB9LFxuICBUQVJHRVRTOiB7XG4gICAgZ2V0KCkgeyByZXR1cm4gdGhpc1tUQVJHRVRTXTsgfSxcbiAgICBlbnVtZXJhYmxlOiB0cnVlLFxuICB9LFxuICBTQ1JJUFRTOiB7XG4gICAgZ2V0KCkgeyByZXR1cm4gdGhpc1tTQ1JJUFRTXTsgfSxcbiAgICBlbnVtZXJhYmxlOiB0cnVlLFxuICB9LFxuICBDQUNIRToge1xuICAgIGdldCgpIHsgcmV0dXJuIHRoaXNbQ0FDSEVdOyB9LFxuICAgIGVudW1lcmFibGU6IHRydWUsXG4gIH0sXG4gIFVOS05PV05fVEFSR0VUUzoge1xuICAgIGdldCgpIHsgcmV0dXJuIHRoaXNbVU5LTk9XTl9UQVJHRVRTXTsgfSxcbiAgICBlbnVtZXJhYmxlOiB0cnVlLFxuICB9LFxuICBJTlRFUkZBQ0VfU0NSSVBUUzoge1xuICAgIGdldCgpIHsgcmV0dXJuIHRoaXNbSU5URVJGQUNFX1NDUklQVFNdOyB9LFxuICAgIGVudW1lcmFibGU6IHRydWUsXG4gIH0sXG4gIElOU1RBTExfTElTVDoge1xuICAgIGdldCgpIHsgcmV0dXJuIHRoaXNbSU5TVEFMTF9MSVNUXTsgfSxcbiAgICBlbnVtZXJhYmxlOiB0cnVlLFxuICB9LFxuICBTQ1JJUFRfVkFSSUFCTEVTX01BUDoge1xuICAgIGdldCgpIHsgcmV0dXJuIHRoaXNbU0NSSVBUX1ZBUklBQkxFU19NQVBdOyB9LFxuICAgIGVudW1lcmFibGU6IHRydWUsXG4gIH0sXG4gIFNVQkRJUl9BTElBUzoge1xuICAgIGdldCgpIHsgcmV0dXJuIHRoaXNbU1VCRElSX0FMSUFTXTsgfSxcbiAgICBlbnVtZXJhYmxlOiB0cnVlLFxuICB9LFxufSk7XG5cbkdsb2JhbENvbnRleHQucHJvdG90eXBlLnRvSlNPTiA9IGZ1bmN0aW9uKCkge1xuICBjb25zdCBqc29uID0ge307XG4gIGZvciAoY29uc3Qga2V5IGluIHRoaXMpXG4gICAganNvbltrZXldID0gdGhpc1trZXldO1xuICByZXR1cm4ganNvbjtcbn1cblxuR2xvYmFsQ29udGV4dC5wcm90b3R5cGUuZ2V0VWtub3duVGFyZ2V0ID0gZnVuY3Rpb24obmFtZSkge1xuICBsZXQgdGFyZ2V0ID0gdGhpc1tVTktOT1dOX1RBUkdFVFNdW25hbWVdO1xuICBpZiAoIXRhcmdldCkge1xuICAgIHRoaXNbVU5LTk9XTl9UQVJHRVRTXVtuYW1lXSA9IHRhcmdldCA9IFVua25vd25UYXJnZXQuY3JlYXRlKG5hbWUpO1xuICB9XG4gIHJldHVybiB0YXJnZXQ7XG59XG5cbkdsb2JhbENvbnRleHQucHJvdG90eXBlLmFkZFN5c3RlbVZhcmlhYmxlcyA9IGZ1bmN0aW9uKHZhcmlhYmxlcykge1xuICBjb25zdCBzY3JpcHQgPSB2YXJpYWJsZXMuU0NSSVBUX0ZJTEUudG9TdHJpbmcoKTtcbiAgaWYgKHRoaXNbU0NSSVBUX1ZBUklBQkxFU19NQVBdW3NjcmlwdF0pXG4gICAgdGhyb3cgbmV3IEVycm9yKGBTeXN0ZW1WYXJpYWJsZXMgZXhpc3RzIGZvciAke3NjcmlwdH1gKTtcbiAgdGhpc1tTQ1JJUFRfVkFSSUFCTEVTX01BUF1bc2NyaXB0XSA9IHZhcmlhYmxlcztcbn1cblxuR2xvYmFsQ29udGV4dC5wcm90b3R5cGUucmVzb2x2ZVN1YmRpcmVjdG9yeSA9IGZ1bmN0aW9uKHBhdGgpIHtcbiAgY29uc3QgcmVzb2x2ZWRQYXRoID0gdGhpc1tTVUJESVJfQUxJQVNdW3BhdGgudG9TdHJpbmcoKV07XG4gIHJldHVybiByZXNvbHZlZFBhdGggfHwgcGF0aDtcbn1cblxuR2xvYmFsQ29udGV4dC5wcm90b3R5cGUuYWRkU3ViZGlyZWN0b3J5QWxpYXMgPSBmdW5jdGlvbihzcmMsIGRlc3QpIHtcbiAgdGhpc1tTVUJESVJfQUxJQVNdW3NyYy50b1N0cmluZygpXSA9IGRlc3Q7XG59XG5cbkdsb2JhbENvbnRleHQucHJvdG90eXBlLmxvYWRDYWNoZVZhcmlhYmxlcyA9IGZ1bmN0aW9uKGZpbGVuYW1lKSB7XG4gIGlmIChmaWxlRXhpc3RzU3luYyhmaWxlbmFtZS50b1N0cmluZygpKSkge1xuICAgIGNvbnN0IHZhcmlhYmxlcyA9IHJlcXVpcmVJbXBsKGZpbGVuYW1lLnRvU3RyaW5nKCkpO1xuICAgIHRoaXMuYWRkQ2FjaGVWYXJpYWJsZXModmFyaWFibGVzKTtcbiAgfVxufVxuXG5HbG9iYWxDb250ZXh0LnByb3RvdHlwZS5hZGRDYWNoZVZhcmlhYmxlcyA9IGZ1bmN0aW9uKHZhcmlhYmxlcykge1xuICBjb25zdCBjYWNoZSA9IHRoaXNbQ0FDSEVdO1xuICBmb3IgKGNvbnN0IFtrZXksIGVudHJ5XSBvZiBPYmplY3QuZW50cmllcyh2YXJpYWJsZXMpKSB7XG4gICAgY2FjaGVba2V5XSA9IGVudHJ5O1xuICB9XG59XG5cbkdsb2JhbENvbnRleHQucHJvdG90eXBlLmFkZFN1YmRpcmVjdG9yeSA9IGZ1bmN0aW9uKGNvbnRleHQpIHtcbiAgdGhpc1tTVUJESVJfTElTVF0ucHVzaChjb250ZXh0KTtcbn1cblxuR2xvYmFsQ29udGV4dC5wcm90b3R5cGUuZG9TdWJkaXJlY3RvcnkgPSBhc3luYyBmdW5jdGlvbigpIHtcbiAgd2hpbGUgKHRoaXNbU1VCRElSX0xJU1RdLmxlbmd0aCkge1xuICAgIGNvbnN0IGNvbnRleHQgPSB0aGlzW1NVQkRJUl9MSVNUXS5zaGlmdCgpO1xuXG4gICAgY29uc3Qgc2NvcGUgPSBjb250ZXh0Ll9fc2NvcGUoKTtcblxuICAgIGxldCBzY3JpcHRGaWxlO1xuICAgIGNvbnN0IGZpbGVMaXN0ID0gWyBcIi5qc1wiLCBcIi5tanNcIiBdLm1hcChpID0+IFwiTWFrZVNjcmlwdFwiICsgaSk7XG4gICAgZm9yIChjb25zdCBmaWxlbmFtZSBvZiBmaWxlTGlzdCkge1xuICAgICAgY29uc3QgaXRlciA9IHNjb3BlLlNPVVJDRV9ESVIuam9pbihmaWxlbmFtZSkudG9TdHJpbmcoKTtcbiAgICAgIGlmIChhd2FpdCBmaWxlRXhpc3RzKGl0ZXIpKSB7XG4gICAgICAgIHNjcmlwdEZpbGUgPSBpdGVyO1xuICAgICAgICBicmVhaztcbiAgICAgIH1cbiAgICB9XG5cbiAgICBpZiAoIXNjcmlwdEZpbGUpXG4gICAgICB0aHJvdyBuZXcgRXJyb3IoXCJUaGVyZSBhcmUgbm8gZmlsZXMgZnJvbSB0aGUgbGlzdCBcIiArIGZpbGVMaXN0LmpvaW4oKSk7XG5cbiAgICBzY29wZS5TQ1JJUFRfRklMRSA9IHNjcmlwdEZpbGU7XG4gICAgc2NvcGUuU0NSSVBUX0RJUiA9IHNjb3BlLlNDUklQVF9GSUxFLmRpcm5hbWUoKTtcblxuICAgIHRoaXMuYWRkU3lzdGVtVmFyaWFibGVzKHNjb3BlKTtcbiAgICB0aGlzLmNvcHlDYWNoZVZhcmlhYmxlcyhjb250ZXh0KTtcblxuICAgIGNvbnN0IG1vZHVsZSA9IGF3YWl0IGltcG9ydE1vZHVsZShjb250ZXh0LlNDUklQVF9GSUxFLnRvU3RyaW5nKCkpO1xuXG4gICAgY29uc3QgY3dkU2F2ZSA9IHByb2Nlc3MuY3dkKCk7XG4gICAgcHJvY2Vzcy5jaGRpcihjb250ZXh0LlNPVVJDRV9ESVIudG9TdHJpbmcoKSk7XG5cbiAgICBjb25zdCByZXN1bHQgPSBtb2R1bGUuZGVmYXVsdChjb250ZXh0KTtcbiAgICBpZiAocmVzdWx0IGluc3RhbmNlb2YgUHJvbWlzZSlcbiAgICAgIGF3YWl0IHJlc3VsdDtcblxuICAgIHByb2Nlc3MuY2hkaXIoY3dkU2F2ZSk7XG4gIH1cbn1cblxuZnVuY3Rpb24gZW5zdXJlVmFsdWVCeVR5cGUodHlwZSwgdmFsdWUpIHtcbiAgaWYgKEFycmF5LmlzQXJyYXkodHlwZSkgPyB0eXBlLmluY2x1ZGVzKHZhbHVlKSA6IHR5cGVvZiB2YWx1ZSA9PT0gdHlwZSlcbiAgICByZXR1cm4gdmFsdWU7XG4gIHRocm93IG5ldyBFcnJvcihgVGhlICcke3ZhbHVlfScgaXMgbm90IGEgJHt0eXBlfWApO1xufVxuXG5HbG9iYWxDb250ZXh0LnByb3RvdHlwZS5jb3B5Q2FjaGVWYXJpYWJsZXMgPSBmdW5jdGlvbihzY29wZSkge1xuICBmb3IgKGNvbnN0IFtuYW1lLCBlbnRyeV0gb2YgT2JqZWN0LmVudHJpZXModGhpc1tDQUNIRV0pKSB7XG4gICAgaWYgKCFPYmplY3QuaGFzT3duKHNjb3BlLCBuYW1lKSkge1xuICAgICAgY29uc3QgdHlwZSA9IGVudHJ5LnR5cGUgfHwgdHlwZW9mIGVudHJ5LnZhbHVlO1xuICAgICAgY29uc3QgZGVzY3JpcHRpb24gPSBlbnRyeS5kZXNjcmlwdGlvbiB8fCBcIlwiO1xuICAgICAgbGV0IHZhbHVlID0gQXJyYXkuaXNBcnJheShlbnRyeS52YWx1ZSkgPyBbIC4uLmVudHJ5LnZhbHVlIF0gOiBlbnRyeS52YWx1ZTtcbiAgICAgIGlmICh2YWx1ZSA9PT0gXCIke1BST0pFQ1RfVkVSU0lPTn1cIilcbiAgICAgICAgdmFsdWUgPSBzY29wZS5QUk9KRUNUX1ZFUlNJT047XG4gICAgICBlbHNlIGlmICh2YWx1ZSA9PT0gXCIke1BST0pFQ1RfREVTQ1JJUFRJT059XCIpXG4gICAgICAgIHZhbHVlID0gc2NvcGUuUFJPSkVDVF9ERVNDUklQVElPTjtcbiAgICAgIGVsc2UgaWYgKHZhbHVlID09PSBcIiR7UFJPSkVDVF9IT01FUEFHRV9VUkx9XCIpXG4gICAgICAgIHZhbHVlID0gc2NvcGUuUFJPSkVDVF9IT01FUEFHRV9VUkw7XG4gICAgICBlbHNlIGlmIChlbnRyeS52YWx1ZSA9PT0gXCIke0NNQUtFX1NZU1RFTV9QUk9DRVNTT1J9XCIpXG4gICAgICAgIHZhbHVlID0gc2NvcGUuU1lTVEVNX1BST0NFU1NPUjtcblxuICAgICAgY29uc3QgbmFtZVN5bWJvbCA9IFN5bWJvbChuYW1lKTtcbiAgICAgIHNjb3BlW25hbWVTeW1ib2xdID0gZW5zdXJlVmFsdWVCeVR5cGUodHlwZSwgdmFsdWUpO1xuXG4gICAgICBPYmplY3QuZGVmaW5lUHJvcGVydHkoc2NvcGUsIG5hbWUsIHtcbiAgICAgICAgZW51bWVyYWJsZTogdHJ1ZSxcbiAgICAgICAgZ2V0KCkge1xuICAgICAgICAgIHJldHVybiB0aGlzW25hbWVTeW1ib2xdO1xuICAgICAgICB9LFxuICAgICAgICBzZXQodmFsdWUpIHtcbiAgICAgICAgICB0aGlzW25hbWVTeW1ib2xdID0gZW5zdXJlVmFsdWVCeVR5cGUodHlwZSwgdmFsdWUpO1xuICAgICAgICB9LFxuICAgICAgfSk7XG4gICAgfVxuICB9XG59XG5cbkdsb2JhbENvbnRleHQucHJvdG90eXBlLndyaXRlQ2FjaGVWYXJpYWJsZXMgPSBmdW5jdGlvbihmaWxlbmFtZSkge1xuICBjb25zdCBqc29uID0gSlNPTi5zdHJpbmdpZnkodGhpc1tDQUNIRV0sIG51bGwsIDIpO1xuICBmcy53cml0ZUZpbGVTeW5jKGZpbGVuYW1lLCBqc29uLCBcInV0Zi04XCIpO1xufVxuXG5mdW5jdGlvbiBzY29wZVZhbHVlQXNQcmltaXRpdmVzKG8pIHtcbiAgaWYgKHR5cGVvZiBvID09PSBcInVuZGVmaW5lZFwiKVxuICAgIHJldHVybiBvO1xuICBpZiAodHlwZW9mIG8gPT09IFwiYm9vbGVhblwiKVxuICAgIHJldHVybiBvO1xuICBpZiAodHlwZW9mIG8gPT09IFwibnVtYmVyXCIpXG4gICAgcmV0dXJuIG87XG4gIGlmICh0eXBlb2YgbyA9PT0gXCJzdHJpbmdcIilcbiAgICByZXR1cm4gbztcbiAgaWYgKHR5cGVvZiBvID09PSBcIm9iamVjdFwiKSB7XG4gICAgaWYgKCFvKVxuICAgICAgcmV0dXJuIG87XG4gICAgaWYgKG8gaW5zdGFuY2VvZiBBYnNvbHV0ZVBhdGgpIHtcbiAgICAgIHJldHVybiBvLnRvU3RyaW5nKCk7XG4gICAgfVxuICAgIGlmIChvIGluc3RhbmNlb2YgQXJyYXkpIHtcbiAgICAgIGNvbnN0IHJlc3VsdCA9IFtdO1xuICAgICAgZm9yIChjb25zdCBpIG9mIG8pXG4gICAgICAgIHJlc3VsdC5wdXNoKHNjb3BlVmFsdWVBc1ByaW1pdGl2ZXMoaSkpO1xuICAgICAgcmV0dXJuIHJlc3VsdDtcbiAgICB9XG4gICAgaWYgKG8gaW5zdGFuY2VvZiBPYmplY3QpIHtcbiAgICAgIGNvbnN0IHJlc3VsdCA9IHt9O1xuICAgICAgZm9yIChjb25zdCBbayx2XSBvZiBPYmplY3QuZW50cmllcyhvKSlcbiAgICAgICAgcmVzdWx0W2tdID0gc2NvcGVWYWx1ZUFzUHJpbWl0aXZlcyh2KTtcbiAgICAgIHJldHVybiByZXN1bHQ7XG4gICAgfVxuICB9XG4gIHRocm93IG5ldyBFcnJvcihgVW5rbm93biBpbnN0YW5jZSBvZiAke299YCk7XG59XG5cbkdsb2JhbENvbnRleHQucHJvdG90eXBlLmNyZWF0ZUdvYWxzID0gZnVuY3Rpb24oc2NvcGUpIHtcbiAgZm9yIChjb25zdCBpdGVyIG9mIE9iamVjdC52YWx1ZXModGhpc1tVTktOT1dOX1RBUkdFVFNdKSkge1xuICAgIGNvbnN0IHRhcmdldCA9IHRoaXNbVEFSR0VUU10uZ2V0KGl0ZXIuTkFNRSk7XG4gICAgdGFyZ2V0LmFkZFNvdXJjZXMoaXRlci5TT1VSQ0VTKTtcbiAgICB0YXJnZXQuSU5DTFVERVMucHVzaCguLi5pdGVyLklOQ0xVREVTKTtcbiAgICB0YXJnZXQuREVGSU5FUy5wdXNoKC4uLml0ZXIuREVGSU5FUyk7XG4gICAgdGFyZ2V0LkNPTVBJTEVfT1BUSU9OUy5wdXNoKC4uLml0ZXIuQ09NUElMRV9PUFRJT05TKTtcbiAgICB0YXJnZXQuTElOS19PUFRJT05TLnB1c2goLi4uaXRlci5MSU5LX09QVElPTlMpO1xuICB9XG5cbiAgZm9yIChjb25zdCBpdGVyIG9mIE9iamVjdC52YWx1ZXModGhpc1tJTlRFUkZBQ0VfU0NSSVBUU10pKSB7XG4gICAgY29uc3Qgc2NyaXB0ID0gdGhpc1tTQ1JJUFRTXS5nZXQoaXRlci5OQU1FKTtcbiAgICBmb3IgKGNvbnN0IFtrZXksIHZhbHNdIG9mIE9iamVjdC5lbnRyaWVzKGl0ZXIuUFJPUEVSVElFUykpXG4gICAgICBzY3JpcHQuYWRkUHJvcGVydHkoa2V5LCAuLi52YWxzKTtcbiAgfVxuXG4gIGNvbnN0IGdvYWxMaXN0ID0gR29hbENvbGxlY3Rpb24uY3JlYXRlKCk7XG4gIGZvciAoY29uc3QgW25hbWUsIHNjcmlwdF0gb2YgT2JqZWN0LmVudHJpZXModGhpc1tTQ1JJUFRTXS5FTlRSSUVTKSkgeyAgIFxuICAgIGNvbnN0IGRlcGVuZHMgPSBbIHNjcmlwdC5GSUxFLnRvU3RyaW5nKCkgXTtcbiAgICBpZiAoc2NyaXB0LklOUFVUKVxuICAgICAgZGVwZW5kcy5wdXNoKHNjcmlwdC5JTlBVVC50b1N0cmluZygpKTtcbiAgICBjb25zdCBtc2cgPSBcIlxceDFiWzM2bVwiICsgXCJHZW5lcmF0aW5nIFwiICsgc2NyaXB0LlRBUkdFVF9TQ09QRS5CSU5BUllfRElSLnJlbGF0aXZlKHNjcmlwdC5PVVRQVVQpICsgXCJcXHgxYlswbVwiO1xuICAgIGNvbnN0IHBhcmFtcyA9IHsgLi4uc2NyaXB0LlBST1BFUlRJRVMsIC4uLnNjcmlwdC5QQVJBTVMgfTtcbiAgICBnb2FsTGlzdC5hZGRTY3JpcHQoc2NyaXB0LkZJTEUsIFwiXCIsIGRlcGVuZHMsIHNjcmlwdC5PVVRQVVQudG9TdHJpbmcoKSwgc2NvcGVWYWx1ZUFzUHJpbWl0aXZlcyhwYXJhbXMpLCBtc2cpO1xuICB9XG5cbiAgZm9yIChjb25zdCBbbmFtZSwgdGFyZ2V0XSBvZiBPYmplY3QuZW50cmllcyh0aGlzW1RBUkdFVFNdLkVOVFJJRVMpKSB7XG4gICAgY29uc3QgaGVhZGVycyA9IHRoaXNbVEFSR0VUU10uYWxsSGVhZGVyc09mKHRhcmdldCk7XG4gICAgY29uc3QgZGVwZW5kcyA9IFtdO1xuICAgIGZvciAoY29uc3QgcyBvZiB0YXJnZXQuU09VUkNFUykge1xuICAgICAgaWYgKHMgaW5zdGFuY2VvZiBJbnRlcmZhY2VPYmplY3RzKSB7XG4gICAgICAgIGNvbnN0IHQgPSB0aGlzW1RBUkdFVFNdLmdldChzLnRhcmdldE5hbWUpO1xuICAgICAgICBmb3IgKGNvbnN0IGYgb2YgdC5TT1VSQ0VTKSB7XG4gICAgICAgICAgaWYgKGYgaW5zdGFuY2VvZiBTb3VyY2VGaWxlICYmIGYuT0JKRUNUX0ZJTEUpXG4gICAgICAgICAgICBkZXBlbmRzLnB1c2goZi5PQkpFQ1RfRklMRS50b1N0cmluZygpKTtcbiAgICAgICAgfVxuICAgICAgICBjb250aW51ZTtcbiAgICAgIH1cblxuICAgICAgaWYgKHMuSEVBREVSX0ZJTEVfT05MWSlcbiAgICAgICAgY29udGludWU7XG5cbiAgICAgIGZzLm1rZGlyU3luYyhzLk9CSkVDVF9GSUxFX0RJUi50b1N0cmluZygpLCB7IHJlY3Vyc2l2ZTogdHJ1ZSB9KTtcblxuICAgICAgY29uc3QgcmVsYXRpdmVPYmplY3QgPSB0YXJnZXQuVEFSR0VUX1NDT1BFLkJJTkFSWV9ESVIucmVsYXRpdmUocy5PQkpFQ1RfRklMRSk7XG4gICAgICBjb25zdCByZWxhdGl2ZUJpbmFyeURpciA9IHNjb3BlLlBST0pFQ1RfQklOQVJZX0RJUi5yZWxhdGl2ZSh0YXJnZXQuVEFSR0VUX1NDT1BFLkJJTkFSWV9ESVIpO1xuICAgICAgY29uc3QgbXNnID0gXCJcXHgxYlszMm1cIiArIGBCdWlsZGluZyAke3MuTEFOR1VBR0V9IG9iamVjdCAke3JlbGF0aXZlQmluYXJ5RGlyfS8ke3JlbGF0aXZlT2JqZWN0fWAgKyBcIlxceDFiWzBtXCI7XG5cbiAgICAgIGNvbnN0IGRlZmluaXRpb25zID0gW1xuICAgICAgICAuLi50aGlzW1RBUkdFVFNdLmFsbERlZmluaXRpb25zT2YodGFyZ2V0KSxcbiAgICAgICAgLi4ucy5ERUZJTkVTLFxuICAgICAgXTtcblxuICAgICAgY29uc3QgYXJncyA9IFtdO1xuICAgICAgYXJncy5wdXNoKC4uLmRlZmluaXRpb25zLm1hcChpID0+IFwiLURcIiArIGkpKTtcbiAgICAgIGFyZ3MucHVzaCguLi50aGlzW1RBUkdFVFNdLmFsbEluY2x1ZGVzT2YodGFyZ2V0KS5tYXAoaSA9PiBcIi1JXCIgKyBpKSk7XG4gICAgICBhcmdzLnB1c2goLi4udGhpc1tUQVJHRVRTXS5hbGxDb21waWxlT3B0aW9uc09mKHRhcmdldCkpO1xuICAgICAgaWYgKHRhcmdldC5QT1NJVElPTl9JTkRFUEVOREVOVF9DT0RFKVxuICAgICAgICBhcmdzLnB1c2goXCItZlBJQ1wiKTtcbiAgICAgIGFyZ3MucHVzaCguLi5zLkNPTVBJTEVfRkxBR1MuZmxhdCgpKTtcbiAgICAgIGFyZ3MucHVzaChcIi1vXCIsIHJlbGF0aXZlT2JqZWN0KTtcbiAgICAgIGFyZ3MucHVzaChcIi1jXCIsIHMuRklMRSk7XG4gICAgICBjb25zdCBjd2QgPSB0YXJnZXQuVEFSR0VUX1NDT1BFLkJJTkFSWV9ESVIudG9TdHJpbmcoKTtcblxuICAgICAgY29uc3QgY29tbWFuZCA9IHRhcmdldC5UQVJHRVRfU0NPUEVbcy5MQU5HVUFHRSArIFwiX0NPTVBJTEVSXCJdLnRvU3RyaW5nKCk7XG4gICAgICBjb25zdCBvdXRwdXQgPSB0YXJnZXQuVEFSR0VUX1NDT1BFLkJJTkFSWV9ESVIuam9pbihyZWxhdGl2ZU9iamVjdCkudG9TdHJpbmcoKTtcbiAgICAgIGRlcGVuZHMucHVzaChvdXRwdXQpO1xuXG4gICAgICBnb2FsTGlzdC5hZGRFeGVjKG91dHB1dCwgWyAuLi5oZWFkZXJzLCBzLkZJTEUgXSwgY29tbWFuZCwgYXJncywgY3dkLCBtc2cpO1xuICAgIH1cblxuICAgIGNvbnN0IGxpbmtPcHRpb25zID0gdGhpc1tUQVJHRVRTXS5hbGxMaW5rT3B0aW9uc09mKHRhcmdldCk7XG4gICAgaWYgKHRhcmdldCBpbnN0YW5jZW9mIE9iamVjdExpYnJhcnkpIHtcbiAgICAgIGNvbnN0IG9ianMgPSBkZXBlbmRzLmZpbHRlcihpID0+IGkuZW5kc1dpdGgoXCIub1wiKSB8fCBpLmVuZHNXaXRoKFwiLm9ialwiKSkubWFwKGkgPT4gdGFyZ2V0LkZJTEVfRElSLnJlbGF0aXZlKGkpKTtcbiAgICAgIGlmIChvYmpzLmxlbmd0aCkge1xuICAgICAgICBjb25zdCBhcmdzID0gW1xuICAgICAgICAgIC4uLmxpbmtPcHRpb25zLFxuICAgICAgICAgIFwiLXJcIixcbiAgICAgICAgICBcIi1vXCIsIHRhcmdldC5GSUxFX05BTUUsXG4gICAgICAgICAgLi4ub2Jqc1xuICAgICAgICBdO1xuICAgICAgICBjb25zdCBjd2QgPSB0YXJnZXQuRklMRV9ESVIudG9TdHJpbmcoKTtcbiAgICAgICAgY29uc3QgbXNnID0gYExpbmtpbmcgQ1hYIG9iamVjdCBsaWJyYXJ5ICR7dGFyZ2V0LkZJTEVfTkFNRX1gO1xuICAgICAgICBnb2FsTGlzdC5hZGRFeGVjKHRhcmdldC5GSUxFLnRvU3RyaW5nKCksIGRlcGVuZHMsIHNjb3BlLkxJTktFUiwgYXJncywgY3dkLCBtc2cpO1xuICAgICAgfVxuICAgICAgZWxzZSB7XG4gICAgICAgIGNvbnNvbGUubG9nKGBObyBvYmplY3RzIGZvciBcIiR7dGFyZ2V0Lk5BTUV9XCJgKTtcbiAgICAgIH1cbiAgICB9XG5cbiAgICBpZiAodGFyZ2V0IGluc3RhbmNlb2YgU3RhdGljTGlicmFyeSkge1xuICAgICAgY29uc3Qgb2JqcyA9IGRlcGVuZHMuZmlsdGVyKGkgPT4gaS5lbmRzV2l0aChcIi5vXCIpIHx8IGkuZW5kc1dpdGgoXCIub2JqXCIpKS5tYXAoaSA9PiB0YXJnZXQuRklMRV9ESVIucmVsYXRpdmUoaSkpO1xuICAgICAgaWYgKG9ianMubGVuZ3RoKSB7XG4gICAgICAgIGNvbnN0IGFyZ3MgPSBbIFwicmNcIiwgdGFyZ2V0LkZJTEVfTkFNRSAsIC4uLm9ianMgXTtcbiAgICAgICAgY29uc3QgY3dkID0gdGFyZ2V0LkZJTEVfRElSLnRvU3RyaW5nKCk7XG4gICAgICAgIGNvbnN0IG1zZyA9IGBMaW5raW5nIENYWCBzdGF0aWMgbGlicmFyeSAke3RhcmdldC5GSUxFX05BTUV9YDtcbiAgICAgICAgZ29hbExpc3QuYWRkRXhlYyh0YXJnZXQuRklMRS50b1N0cmluZygpLCBkZXBlbmRzLCBzY29wZS5BUiwgYXJncywgY3dkLCBtc2cpO1xuICAgICAgfVxuICAgICAgZWxzZSB7XG4gICAgICAgIGNvbnNvbGUubG9nKGBObyBvYmplY3RzIGZvciBcIiR7dGFyZ2V0Lk5BTUV9XCJgKTtcbiAgICAgIH1cbiAgICB9XG5cbiAgICBpZiAodGFyZ2V0IGluc3RhbmNlb2YgU2hhcmVkTGlicmFyeSkge1xuICAgICAgdGhyb3cgbmV3IEVycm9yKFwiTm90IGltcGxlbWVudGVkXCIpO1xuICAgIH1cblxuICAgIGlmICh0YXJnZXQgaW5zdGFuY2VvZiBFeGVjdXRhYmxlKSB7XG4gICAgICBjb25zdCBvYmpzID0gZGVwZW5kcy5maWx0ZXIoaSA9PiBpLmVuZHNXaXRoKFwiLm9cIikgfHwgaS5lbmRzV2l0aChcIi5vYmpcIikpLm1hcChpID0+IHRhcmdldC5GSUxFX0RJUi5yZWxhdGl2ZShpKSk7XG4gICAgICBpZiAob2Jqcy5sZW5ndGgpIHtcbiAgICAgICAgY29uc3QgbGlicyA9IHRoaXNbVEFSR0VUU10uYWxsTGlicmFyaWVzT2YodGFyZ2V0KTtcbiAgICAgICAgY29uc3QgYXJncyA9IFtcbiAgICAgICAgICAuLi50YXJnZXQuVEFSR0VUX1NDT1BFLkNYWF9GTEFHUyxcbiAgICAgICAgICAuLi5saW5rT3B0aW9ucyxcbiAgICAgICAgICAuLi5vYmpzLFxuICAgICAgICAgIFwiLW9cIiwgdGFyZ2V0LkZJTEVfTkFNRSxcbiAgICAgICAgICAuLi5saWJzLm1hcChpID0+IHRhcmdldC5GSUxFX0RJUi5yZWxhdGl2ZShpKSksXG4gICAgICAgIF07XG4gICAgICAgIGNvbnN0IGN3ZCA9IHRhcmdldC5GSUxFX0RJUi50b1N0cmluZygpO1xuICAgICAgICBjb25zdCBtc2cgPSBgTGlua2luZyBDWFggZXhlY3V0YWJsZSAke3RhcmdldC5GSUxFX05BTUV9YDtcbiAgICAgICAgZ29hbExpc3QuYWRkRXhlYyh0YXJnZXQuRklMRS50b1N0cmluZygpLCBkZXBlbmRzLmNvbmNhdChsaWJzKSwgc2NvcGUuQ1hYX0NPTVBJTEVSLCBhcmdzLCBjd2QsIG1zZyk7XG4gICAgICB9XG4gICAgICBlbHNlIHtcbiAgICAgICAgY29uc29sZS5sb2coYE5vIG9iamVjdHMgZm9yIFwiJHt0YXJnZXQuTkFNRX1cImApO1xuICAgICAgfVxuICAgIH1cblxuICAgIGdvYWxMaXN0LmFkZFRhcmdldChuYW1lLCBbIHRhcmdldC5GSUxFLnRvU3RyaW5nKCkgXSwgYEJ1aWx0IHRhcmdldCAke25hbWV9YCk7XG4gIH1cblxuICBjb25zdCBpbnN0YWxsX2ZpbGVzID0gW107XG4gIGNvbnN0IGluc3RhbGxfc2NyaXB0ID0gcGF0aC5wb3NpeC5qb2luKF9fZGlybmFtZSwgXCJTeXN0ZW1TY3JpcHRzL2luc3RhbGxfc2NyaXB0LmpzXCIpO1xuICBmb3IgKGNvbnN0IGl0ZXIgb2YgdGhpc1tJTlNUQUxMX0xJU1RdKSB7XG4gICAgbGV0IHNyYywgZGVzdDtcbiAgICBpZiAoaXRlci5WQUxVRSBpbnN0YW5jZW9mIEZpbGVQYXRoKSB7XG4gICAgICBpZiAoc2NvcGUuUFJFVkVOVF9JTlNUQUxMX0ZJTEVTKVxuICAgICAgICBjb250aW51ZTtcbiAgICAgIHNyYyA9IGl0ZXIuVkFMVUUudG9TdHJpbmcoKTtcbiAgICAgIGNvbnN0IHJmaWxlID0gaXRlci5CQVNFX0RJUi5yZWxhdGl2ZShpdGVyLlZBTFVFKTtcbiAgICAgIGRlc3QgPSBpdGVyLkRFU1RJTkFUSU9OLmpvaW4ocmZpbGUpO1xuICAgIH1cbiAgICBlbHNlIGlmIChpdGVyLlZBTFVFIGluc3RhbmNlb2YgSW50ZXJmYWNlVGFyZ2V0KSB7XG4gICAgICBjb25zdCB0YXJnZXQgPSB0aGlzW1RBUkdFVFNdLmdldChpdGVyLlZBTFVFLnRhcmdldE5hbWUpO1xuICAgICAgc3JjID0gdGFyZ2V0LkZJTEUudG9TdHJpbmcoKTtcbiAgICAgIGRlc3QgPSBpdGVyLkRFU1RJTkFUSU9OLmpvaW4odGFyZ2V0LkZJTEVfTkFNRSk7XG4gICAgfVxuICAgIGVsc2Uge1xuICAgICAgdGhyb3cgbmV3IEVycm9yKGBDYW4gbm90IGluc3RhbGwgJHtpdGVyLlZBTFVFfWApXG4gICAgfVxuICAgIGlmIChzY29wZS5ERVNURElSKVxuICAgICAgZGVzdCA9IHNjb3BlLkRFU1RESVIuam9pbihkZXN0KS50b1N0cmluZygpO1xuICAgIGdvYWxMaXN0LmFkZFNjcmlwdChpbnN0YWxsX3NjcmlwdCwgXCJcIiwgWyBzcmMgXSwgZGVzdCwgc2NvcGVWYWx1ZUFzUHJpbWl0aXZlcyh7c3JjLCBkZXN0fSksIFwiXCIpO1xuICAgIGluc3RhbGxfZmlsZXMucHVzaChkZXN0KTtcbiAgfVxuXG4gIGlmIChpbnN0YWxsX2ZpbGVzLmxlbmd0aCkge1xuICAgIGdvYWxMaXN0LmFkZFRhcmdldChcImluc3RhbGxcIiwgaW5zdGFsbF9maWxlcywgXCJcIik7XG4gIH1cblxuICBnb2FsTGlzdC5hZGRUYXJnZXQoXCJhbGxcIiwgT2JqZWN0LmtleXModGhpc1tUQVJHRVRTXS5FTlRSSUVTKSwgXCJcIik7XG5cbiAgcmV0dXJuIGdvYWxMaXN0O1xufVxuXG5tb2R1bGUuZXhwb3J0cyA9IHtcbiAgR2xvYmFsQ29udGV4dCxcbn07XG4iLCJcInVzZSBzdHJpY3RcIjtcblxuY29uc3QgeyBJbnRlcmZhY2VUYXJnZXQgfSA9IHJlcXVpcmUoXCJAL2NvcmUvSW50ZXJmYWNlVGFyZ2V0XCIpO1xuY29uc3QgeyBBYnNvbHV0ZVBhdGggfSA9IHJlcXVpcmUoXCJAL2NvcmUvUGF0aFwiKTtcbmNvbnN0IHsgRmlsZVBhdGgsIERpclBhdGggfSA9IHJlcXVpcmUoXCJAL2NvcmUvUGF0aFwiKTtcblxuY29uc3QgVkFMVUUgICAgICAgPSBTeW1ib2woXCJWQUxVRVwiKTtcbmNvbnN0IERFU1RJTkFUSU9OID0gU3ltYm9sKFwiREVTVElOQVRJT05cIik7XG5jb25zdCBCQVNFX0RJUiAgICA9IFN5bWJvbChcIkJBU0VfRElSXCIpO1xuXG5mdW5jdGlvbiBJbnN0YWxsRW50aXR5KHNjb3BlLCB2YWx1ZSwgcGFyYW1zKSB7XG4gIGxldCBkZXN0aW5hdGlvbjtcbiAgbGV0IGJhc2VEaXI7XG4gIGlmICh0eXBlb2YgcGFyYW1zID09PSBcInN0cmluZ1wiKVxuICAgIGRlc3RpbmF0aW9uID0gcGFyYW1zO1xuICBlbHNlIGlmIChwYXJhbXMpIHtcbiAgICBkZXN0aW5hdGlvbiA9IHBhcmFtcy5kZXN0aW5hdGlvbjtcbiAgICBiYXNlRGlyID0gcGFyYW1zLmJhc2VEaXI7XG4gIH1cblxuICBpZiAoIWRlc3RpbmF0aW9uKVxuICAgIHRocm93IG5ldyBFcnJvcihgUGFyYW1ldGVyIGRlc3RpbmF0aW9uIGlzIG5vdCBzcGVjaWZpZWRgKTtcblxuICBpZiAoYmFzZURpcilcbiAgICBiYXNlRGlyID0gc2NvcGUuU09VUkNFX0RJUi5yZXNvbHZlKGJhc2VEaXIpO1xuXG4gIGlmICh0eXBlb2YgdmFsdWUgPT09IFwic3RyaW5nXCIgfHwgdmFsdWUgaW5zdGFuY2VvZiBBYnNvbHV0ZVBhdGgpIHtcbiAgICB2YWx1ZSA9IHNjb3BlLlNPVVJDRV9ESVIucmVzb2x2ZSh2YWx1ZS50b1N0cmluZygpKTtcbiAgICB2YWx1ZSA9IEZpbGVQYXRoLmNyZWF0ZSh2YWx1ZS50b1N0cmluZygpKTtcbiAgICBiYXNlRGlyID0gYmFzZURpciB8fCB2YWx1ZS5kaXJuYW1lKCk7XG4gIH1cbiAgZWxzZSBpZiAoISh2YWx1ZSBpbnN0YW5jZW9mIEludGVyZmFjZVRhcmdldCkpIHtcbiAgICB0aHJvdyBuZXcgRXJyb3IoYE5vdCBzdXBwb3J0ZXQgdmFsdWUgb2YgJHt2YWx1ZX1gKTtcbiAgfVxuXG4gIHRoaXNbVkFMVUVdID0gdmFsdWU7XG4gIHRoaXNbREVTVElOQVRJT05dID0gRGlyUGF0aC5jcmVhdGUoc2NvcGUuSU5TVEFMTF9QUkVGSVgucmVzb2x2ZShkZXN0aW5hdGlvbi50b1N0cmluZygpKS50b1N0cmluZygpKTtcbiAgdGhpc1tCQVNFX0RJUl0gPSBiYXNlRGlyID8gRGlyUGF0aC5jcmVhdGUoYmFzZURpci50b1N0cmluZygpKSA6IG51bGw7XG59XG5cbkluc3RhbGxFbnRpdHkuY3JlYXRlID0gKHNjb3BlLCB2YWx1ZSwgcGFyYW1zKSA9PiB7XG4gIHJldHVybiBPYmplY3Quc2VhbChuZXcgSW5zdGFsbEVudGl0eShzY29wZSwgdmFsdWUsIHBhcmFtcykpO1xufVxuXG5JbnN0YWxsRW50aXR5LnByb3RvdHlwZSA9IE9iamVjdC5jcmVhdGUoT2JqZWN0LnByb3RvdHlwZSwge1xuICBjb25zdHJ1Y3Rvcjoge1xuICAgIHZhbHVlOiBJbnN0YWxsRW50aXR5LFxuICAgIGVudW1lcmFibGU6IGZhbHNlLFxuICB9LFxuICBWQUxVRToge1xuICAgIGdldCAoKSB7IHJldHVybiB0aGlzW1ZBTFVFXTsgfSxcbiAgICBlbnVtZXJhYmxlOiB0cnVlLFxuICB9LFxuICBERVNUSU5BVElPTjoge1xuICAgIGdldCAoKSB7IHJldHVybiB0aGlzW0RFU1RJTkFUSU9OXTsgfSxcbiAgICBlbnVtZXJhYmxlOiB0cnVlLFxuICB9LFxuICBCQVNFX0RJUjoge1xuICAgIGdldCAoKSB7IHJldHVybiB0aGlzW0JBU0VfRElSXTsgfSxcbiAgICBlbnVtZXJhYmxlOiB0cnVlLFxuICB9LFxufSk7XG5cbkluc3RhbGxFbnRpdHkucHJvdG90eXBlLnRvSlNPTiA9IGZ1bmN0aW9uKCkge1xuICBjb25zdCBqc29uID0ge307XG4gIGZvciAoY29uc3Qga2V5IGluIHRoaXMpXG4gICAganNvbltrZXldID0gdGhpc1trZXldO1xuICByZXR1cm4ganNvbjtcbn1cblxubW9kdWxlLmV4cG9ydHMgPSB7XG4gIEluc3RhbGxFbnRpdHksXG59O1xuIiwiXCJ1c2Ugc3RyaWN0XCI7XG5cbmNvbnN0IHsgRGlyUGF0aCB9ID0gcmVxdWlyZShcIkAvY29yZS9QYXRoXCIpO1xuXG5jb25zdCBHTE9CQUwgPSBTeW1ib2woXCJHTE9CQUxcIik7XG5jb25zdCBTQ09QRSA9IFN5bWJvbChcIlNDT1BFXCIpO1xuXG5mdW5jdGlvbiBQbHVnaW5Db250ZXh0KHNjb3BlLCBnbG9iYWwpIHtcbiAgdGhpc1tTQ09QRV0gPSBzY29wZTtcbiAgdGhpc1tHTE9CQUxdID0gZ2xvYmFsO1xufVxuXG5QbHVnaW5Db250ZXh0LnByb3RvdHlwZS5hZGRTdWJkaXJlY3RvcnlBbGlhcyA9IGZ1bmN0aW9uKHNyYywgZGVzdCkge1xuICB0aGlzW0dMT0JBTF0uYWRkU3ViZGlyZWN0b3J5QWxpYXMoRGlyUGF0aC5jcmVhdGUoc3JjLnRvU3RyaW5nKCkpLCBEaXJQYXRoLmNyZWF0ZShkZXN0LnRvU3RyaW5nKCkpKTtcbn1cblxuUGx1Z2luQ29udGV4dC5wcm90b3R5cGUudG9KU09OID0gZnVuY3Rpb24oKSB7XG4gIGNvbnN0IGpzb24gPSB7fTtcbiAgZm9yIChjb25zdCBrZXkgaW4gdGhpcylcbiAgICBqc29uW2tleV0gPSB0aGlzW2tleV07XG4gIHJldHVybiBqc29uO1xufVxuXG5QbHVnaW5Db250ZXh0LmNyZWF0ZSA9IChwcm90b1Njb3BlLCBnbG9iYWwpID0+IHtcbiAgY29uc3QgY3R4ID0gT2JqZWN0LmNyZWF0ZShwcm90b1Njb3BlKTtcbiAgUGx1Z2luQ29udGV4dC5jYWxsKGN0eCwgcHJvdG9TY29wZSwgZ2xvYmFsKTtcbiAgZm9yIChjb25zdCBba2V5LCB2YWxdIG9mIE9iamVjdC5lbnRyaWVzKFBsdWdpbkNvbnRleHQucHJvdG90eXBlKSlcbiAgICBjdHhba2V5XSA9IHZhbDtcbiAgcmV0dXJuIE9iamVjdC5zZWFsKGN0eCk7XG59XG5cbm1vZHVsZS5leHBvcnRzID0ge1xuICBQbHVnaW5Db250ZXh0LFxufTtcbiIsIlwidXNlIHN0cmljdFwiO1xuXG5jb25zdCBFTlRSSUVTID0gU3ltYm9sKFwiRU5UUklFU1wiKTtcblxuZnVuY3Rpb24gU2NyaXB0Q29sbGVjdGlvbigpIHtcbiAgdGhpc1tFTlRSSUVTXSA9IHt9O1xufVxuXG5TY3JpcHRDb2xsZWN0aW9uLnByb3RvdHlwZSA9IE9iamVjdC5jcmVhdGUoT2JqZWN0LnByb3RvdHlwZSwge1xuICBjb25zdHJ1Y3Rvcjoge1xuICAgIHZhbHVlOiBTY3JpcHRDb2xsZWN0aW9uLFxuICAgIGVudW1lcmFibGU6IGZhbHNlLFxuICAgIHdyaXRhYmxlOiB0cnVlLFxuICAgIGNvbmZpZ3VyYWJsZTogdHJ1ZSxcbiAgfSxcbiAgRU5UUklFUzoge1xuICAgIGdldCgpIHsgcmV0dXJuIHRoaXNbRU5UUklFU107IH0sXG4gICAgZW51bWVyYWJsZTogdHJ1ZSxcbiAgfSxcbn0pO1xuXG5TY3JpcHRDb2xsZWN0aW9uLmNyZWF0ZSA9ICgpID0+IHtcbiAgcmV0dXJuIE9iamVjdC5zZWFsKG5ldyBTY3JpcHRDb2xsZWN0aW9uKCkpO1xufVxuXG5TY3JpcHRDb2xsZWN0aW9uLnByb3RvdHlwZS50b0pTT04gPSBmdW5jdGlvbigpIHtcbiAgcmV0dXJuIHRoaXNbRU5UUklFU107XG59XG5cblNjcmlwdENvbGxlY3Rpb24ucHJvdG90eXBlLmdldCA9IGZ1bmN0aW9uKG5hbWUpIHtcbiAgcmV0dXJuIHRoaXNbRU5UUklFU11bbmFtZV07XG59XG5cblNjcmlwdENvbGxlY3Rpb24ucHJvdG90eXBlLnNldCA9IGZ1bmN0aW9uKG5hbWUsIHRhcmdldCkge1xuICBpZiAodGhpc1tFTlRSSUVTXVtuYW1lXSlcbiAgICB0aHJvdyBuZXcgRXJyb3IoYFNjcmlwdCBcIiR7bmFtZX1cIiBleGlzdHNgKTtcbiAgdGhpc1tFTlRSSUVTXVtuYW1lXSA9IHRhcmdldDtcbn1cblxubW9kdWxlLmV4cG9ydHMgPSB7XG4gIFNjcmlwdENvbGxlY3Rpb24sXG59O1xuIiwiY29uc3QgZnMgPSByZXF1aXJlKFwibm9kZTpmc1wiKTtcbmNvbnN0IHBhdGggPSByZXF1aXJlKFwibm9kZTpwYXRoXCIpO1xuXG5tb2R1bGUuZXhwb3J0cyA9IChwYXJhbXMpID0+IHtcbiAgY29uc3QgY29udGVudCA9IGZzLnJlYWRGaWxlU3luYyhwYXJhbXMuaW5wdXQsIFwidXRmLThcIik7XG4gIGNvbnN0IG5ld0NvbnRlbnQgPSBjb250ZW50LnJlcGxhY2UoL0AoW19BLVphLXpdW19BLVphLXowLTldKylAL2csIChtYXRjaCwgdmFsdWUpID0+IHtcbiAgICBjb25zdCByZXMgPSBwYXJhbXNbdmFsdWVdIHx8IFwiXCI7XG4gICAgaWYgKEFycmF5LmlzQXJyYXkocmVzKSlcbiAgICAgIHJldHVybiByZXMuam9pbihcIlxcblwiKTtcbiAgICByZXR1cm4gcmVzLnRvU3RyaW5nKCk7XG4gIH0pO1xuICBmcy5ta2RpclN5bmMocGF0aC5kaXJuYW1lKHBhcmFtcy5vdXRwdXQpLCB7IHJlY3Vyc2l2ZTogdHJ1ZSB9KTtcbiAgZnMud3JpdGVGaWxlU3luYyhwYXJhbXMub3V0cHV0LCBuZXdDb250ZW50LCBcInV0Zi04XCIpO1xufVxuIiwiY29uc3QgZnMgPSByZXF1aXJlKFwibm9kZTpmc1wiKTtcbmNvbnN0IHBhdGggPSByZXF1aXJlKFwibm9kZTpwYXRoXCIpO1xuXG5tb2R1bGUuZXhwb3J0cyA9ICh7c3JjLCBkZXN0fSkgPT4ge1xuICBjb25zb2xlLmxvZyhcIkluc3RhbGxpbmc6IFwiICsgZGVzdCk7XG4gIGZzLm1rZGlyU3luYyhwYXRoLmRpcm5hbWUoZGVzdCksIHsgcmVjdXJzaXZlOiB0cnVlIH0pO1xuICBmcy5jcFN5bmMoc3JjLCBkZXN0LCB7IGZvcmNlOiB0cnVlIH0pO1xufVxuIiwiXCJ1c2Ugc3RyaWN0XCI7XG5cbmNvbnN0IHsgZW5zdXJlQm9vbGVhbiwgZW5zdXJlU3RyaW5nIH0gPSByZXF1aXJlKFwiQC91dGlscy9TdHJpY3RUeXBlXCIpO1xuY29uc3QgeyBBYnNvbHV0ZVBhdGggfSA9IHJlcXVpcmUoXCJAL2NvcmUvUGF0aFwiKTtcblxuY29uc3QgREVGSU5FX01BUCA9IFN5bWJvbChcIkRFRklORV9NQVBcIik7XG5cbmZ1bmN0aW9uIFN5c3RlbVZhcmlhYmxlcygpIHtcbiAgZm9yIChjb25zdCB7IHN5bWJvbCwgaW5pdFZhbHVlIH0gb2YgT2JqZWN0LnZhbHVlcyh0aGlzW0RFRklORV9NQVBdIHx8IHt9KSkge1xuICAgIHRoaXNbc3ltYm9sXSA9IEFycmF5LmlzQXJyYXkoaW5pdFZhbHVlKSA/IEFycmF5LmZyb20oaW5pdFZhbHVlKSA6IGluaXRWYWx1ZTtcbiAgfVxufVxuXG5TeXN0ZW1WYXJpYWJsZXMuY3JlYXRlID0gZnVuY3Rpb24oKSB7XG4gIHJldHVybiBPYmplY3Quc2VhbChuZXcgU3lzdGVtVmFyaWFibGVzKTtcbn1cblxuU3lzdGVtVmFyaWFibGVzLnByb3RvdHlwZSA9IE9iamVjdC5jcmVhdGUoT2JqZWN0LnByb3RvdHlwZSwge1xuICBjb25zdHJ1Y3Rvcjoge1xuICAgIHZhbHVlOiBTeXN0ZW1WYXJpYWJsZXMsXG4gICAgZW51bWVyYWJsZTogZmFsc2UsXG4gIH0sXG59KTtcblxuU3lzdGVtVmFyaWFibGVzLmRlZmluZVZhcmlhYmxlID0gZnVuY3Rpb24oc2NvcGUsIG5hbWUsIGRlc2NyaXB0b3IpIHtcbiAgaWYgKCFzY29wZVtERUZJTkVfTUFQXSlcbiAgICBzY29wZVtERUZJTkVfTUFQXSA9IHt9O1xuXG4gIGNvbnN0IHR5cGUgPSBkZXNjcmlwdG9yLnR5cGUgfHwgKEFycmF5LmlzQXJyYXkoZGVzY3JpcHRvci52YWx1ZSkgPyBcImFycmF5XCIgOiB0eXBlb2YgZGVzY3JpcHRvci52YWx1ZSk7XG5cbiAgbGV0IGRlZmluZUVudHJ5ID0gc2NvcGVbREVGSU5FX01BUF1bbmFtZV07XG4gIGlmICghZGVmaW5lRW50cnkpIHtcbiAgICBkZWZpbmVFbnRyeSA9IHt9O1xuICAgIHNjb3BlW0RFRklORV9NQVBdW25hbWVdID0gZGVmaW5lRW50cnk7XG4gIH1cblxuICBpZiAoZGVmaW5lRW50cnkudHlwZSAhPT0gdHlwZSkge1xuICAgIGRlZmluZUVudHJ5LnN5bWJvbCA9IFN5bWJvbChuYW1lKTtcbiAgfVxuXG4gIGRlZmluZUVudHJ5LnR5cGUgPSB0eXBlO1xuICBkZWZpbmVFbnRyeS5kZXNjcmlwdGlvbiA9IGRlc2NyaXB0b3IuZGVzY3JpcHRpb24gfHwgXCJcIjtcblxuICBsZXQgZW5zdXJlVmFsdWU7XG4gIGlmIChBcnJheS5pc0FycmF5KHR5cGUpKSB7XG4gICAgbGV0IGl0ZW1UeXBlO1xuICAgIGZvciAoY29uc3QgaXRlciBvZiB0eXBlKSB7XG4gICAgICBjb25zdCBpdCA9IHR5cGVvZiBpdGVyO1xuICAgICAgaWYgKCFpdGVtVHlwZSlcbiAgICAgICAgaXRlbVR5cGUgPSBpdDtcbiAgICAgIGVsc2UgaWYgKGl0ZW1UeXBlICE9PSBpdClcbiAgICAgICAgdGhyb3cgbmV3IEVycm9yKGBBbGwgZWxlbWVudHMgZm9yICR7bmFtZX0gbXVzdCBiZSBvZiB0aGUgc2FtZSB0eXBlYCk7XG4gICAgfVxuICAgIGlmIChpdGVtVHlwZSAhPT0gXCJib29sZWFuXCIgJiYgaXRlbVR5cGUgIT09IFwic3RyaW5nXCIpXG4gICAgICB0aHJvdyBuZXcgRXJyb3IoYFVua25vd24gJHtpdGVtVHlwZX0gZWxlbWVudCB0eXBlIG9mICR7bmFtZX0gdmFyaWFibGVgKTtcbiAgICBlbnN1cmVWYWx1ZSA9ICh2YWx1ZSkgPT4ge1xuICAgICAgaWYgKHR5cGUuaW5jbHVkZXModmFsdWUpKVxuICAgICAgICByZXR1cm4gdmFsdWU7XG4gICAgICB0aHJvdyBuZXcgRXJyb3IoYFRoZSAnJHt2YWx1ZX0nIGlzIG5vdCBhICR7dHlwZX1gKTtcbiAgICB9XG4gIH1cbiAgZWxzZSBpZiAodHlwZSA9PT0gXCJib29sZWFuXCIpXG4gICAgZW5zdXJlVmFsdWUgPSBlbnN1cmVCb29sZWFuO1xuICBlbHNlIGlmICh0eXBlID09PSBcInN0cmluZ1wiKVxuICAgIGVuc3VyZVZhbHVlID0gZW5zdXJlU3RyaW5nO1xuICBlbHNlIGlmICh0eXBlID09PSBcIkRpclBhdGhcIilcbiAgICBlbnN1cmVWYWx1ZSA9IEFic29sdXRlUGF0aC5jcmVhdGVEaXI7XG4gIGVsc2UgaWYgKHR5cGUgPT09IFwiRmlsZVBhdGhcIilcbiAgICBlbnN1cmVWYWx1ZSA9IEFic29sdXRlUGF0aC5jcmVhdGVGaWxlO1xuICBlbHNlIGlmICh0eXBlID09PSBcImFycmF5XCIpXG4gICAgLyogKi87XG4gIGVsc2VcbiAgICB0aHJvdyBuZXcgRXJyb3IoYFVua25vd24gJHt0eXBlfSB0eXBlIG9mICR7bmFtZX0gdmFyaWFibGVgKTtcblxuICBpZiAoZGVzY3JpcHRvci5oYXNPd25Qcm9wZXJ0eShcInZhbHVlXCIpKSB7XG4gICAgZGVmaW5lRW50cnkuaW5pdFZhbHVlID0gKHR5cGUgPT09IFwiYXJyYXlcIikgPyBBcnJheS5mcm9tKGRlc2NyaXB0b3IudmFsdWUpIDogZW5zdXJlVmFsdWUoZGVzY3JpcHRvci52YWx1ZSk7XG4gIH1cbiAgZWxzZSB7XG4gICAgZGVmaW5lRW50cnkuaW5pdFZhbHVlID0gKHR5cGUgPT09IFwiYXJyYXlcIikgPyBbXSA6IG51bGw7XG4gIH1cblxuICBjb25zdCB7IHN5bWJvbCB9ID0gZGVmaW5lRW50cnk7XG4gIGNvbnN0IGRlc2MgPSB7XG4gICAgY29uZmlndXJhYmxlOiB0cnVlLFxuICAgIGVudW1lcmFibGU6IHRydWUsXG4gICAgZ2V0KCkgeyByZXR1cm4gdGhpc1tzeW1ib2xdIH0sXG4gIH07XG5cbiAgaWYgKGVuc3VyZVZhbHVlKVxuICAgIGRlc2Muc2V0ID0gZnVuY3Rpb24odmFsdWUpIHsgdGhpc1tzeW1ib2xdID0gZW5zdXJlVmFsdWUodmFsdWUpIH07XG5cbiAgT2JqZWN0LmRlZmluZVByb3BlcnR5KHNjb3BlLCBuYW1lLCBkZXNjKTtcbn1cblxuU3lzdGVtVmFyaWFibGVzLmRlZmluZVZhcmlhYmxlcyA9IGZ1bmN0aW9uKHNjb3BlLCBkZXNjcmlwdG9ycykge1xuICBmb3IgKGNvbnN0IFsgbmFtZSwgZGVzY3JpcHRvciBdIG9mIE9iamVjdC5lbnRyaWVzKGRlc2NyaXB0b3JzKSlcbiAgICBTeXN0ZW1WYXJpYWJsZXMuZGVmaW5lVmFyaWFibGUoc2NvcGUsIG5hbWUsIGRlc2NyaXB0b3IpO1xufVxuXG5TeXN0ZW1WYXJpYWJsZXMucHJvdG90eXBlLnRvSlNPTiA9IGZ1bmN0aW9uKCkge1xuICBjb25zdCBqc29uID0ge307XG4gIGZvciAoY29uc3Qga2V5IGluIHRoaXMpXG4gICAganNvbltrZXldID0gdGhpc1trZXldO1xuICByZXR1cm4ganNvbjtcbn1cblxuU3lzdGVtVmFyaWFibGVzLnByb3RvdHlwZS5jbG9uZSA9IGZ1bmN0aW9uKCkge1xuICBjb25zdCBvID0gT2JqZWN0LmNyZWF0ZShTeXN0ZW1WYXJpYWJsZXMucHJvdG90eXBlKTtcblxuICBmb3IgKGNvbnN0IHsgc3ltYm9sIH0gb2YgT2JqZWN0LnZhbHVlcyh0aGlzW0RFRklORV9NQVBdIHx8IHt9KSkge1xuICAgIG9bc3ltYm9sXSA9IEFycmF5LmlzQXJyYXkodGhpc1tzeW1ib2xdKSA/IEFycmF5LmZyb20odGhpc1tzeW1ib2xdKSA6IHRoaXNbc3ltYm9sXTtcbiAgfVxuXG4gIHJldHVybiBPYmplY3Quc2VhbChvKTtcbn1cblxubW9kdWxlLmV4cG9ydHMgPSB7XG4gIFN5c3RlbVZhcmlhYmxlcyxcbn07XG4iLCJcInVzZSBzdHJpY3RcIjtcblxuY29uc3QgeyBlbnN1cmVTdHJpbmcgfSA9IHJlcXVpcmUoXCJAL3V0aWxzL1N0cmljdFR5cGVcIik7XG5jb25zdCB7IFNvdXJjZUZpbGUgfSA9IHJlcXVpcmUoXCJAL2NvcmUvU291cmNlRmlsZVwiKTtcbmNvbnN0IHsgU291cmNlRmlsZUxpc3QgfSA9IHJlcXVpcmUoXCJAL2NvcmUvU291cmNlRmlsZUxpc3RcIik7XG5jb25zdCB7IEluY2x1ZGVEaXJlY3RvcnkgfSA9IHJlcXVpcmUoXCJAL2NvcmUvSW5jbHVkZURpcmVjdG9yeVwiKTtcbmNvbnN0IHsgSW50ZXJmYWNlVGFyZ2V0IH0gPSByZXF1aXJlKFwiQC9jb3JlL0ludGVyZmFjZVRhcmdldFwiKTtcbmNvbnN0IHsgSW50ZXJmYWNlSW5jbHVkZXMgfSA9IHJlcXVpcmUoXCJAL2NvcmUvSW50ZXJmYWNlSW5jbHVkZXNcIik7XG5jb25zdCB7IEludGVyZmFjZU9iamVjdHMgfSA9IHJlcXVpcmUoXCJAL2NvcmUvSW50ZXJmYWNlT2JqZWN0c1wiKTtcbmNvbnN0IHsgQWJzb2x1dGVQYXRoIH0gPSByZXF1aXJlKFwiQC9jb3JlL1BhdGhcIik7XG5cbmNvbnN0IE5BTUUgICAgICAgICAgICAgICAgPSBTeW1ib2woXCJOQU1FXCIpO1xuY29uc3QgVEFSR0VUX1NDT1BFICAgICAgICA9IFN5bWJvbChcIlRBUkdFVF9TQ09QRVwiKTtcbmNvbnN0IE9VVFBVVF9OQU1FICAgICAgICAgPSBTeW1ib2woXCJPVVRQVVRfTkFNRVwiKTtcbmNvbnN0IENPTVBJTEVfT1BUSU9OUyAgICAgPSBTeW1ib2woXCJDT01QSUxFX09QVElPTlNcIik7XG5jb25zdCBQUkVGSVggICAgICAgICAgICAgID0gU3ltYm9sKFwiUFJFRklYXCIpO1xuY29uc3QgU1VGRklYICAgICAgICAgICAgICA9IFN5bWJvbChcIlNVRkZJWFwiKTtcbmNvbnN0IExJTktfT1BUSU9OUyAgICAgICAgPSBTeW1ib2woXCJMSU5LX09QVElPTlNcIik7XG5jb25zdCBJTkNMVURFUyAgICAgICAgICAgID0gU3ltYm9sKFwiSU5DTFVERVNcIik7XG5jb25zdCBERUZJTkVTICAgICAgICAgICAgID0gU3ltYm9sKFwiREVGSU5FU1wiKTtcbmNvbnN0IFNPVVJDRVMgICAgICAgICAgICAgPSBTeW1ib2woXCJTT1VSQ0VTXCIpO1xuY29uc3QgTElCUkFSSUVTICAgICAgICAgICA9IFN5bWJvbChcIkxJQlJBUklFU1wiKTtcbmNvbnN0IFBPU0lUSU9OX0lOREVQRU5ERU5UX0NPREUgPSBTeW1ib2woXCJQT1NJVElPTl9JTkRFUEVOREVOVF9DT0RFXCIpO1xuXG5cbmNvbnN0IHJlc2VydmVkVGFnZXROYW1lcyA9IFsgXCJhbGxcIiwgXCJpbnN0YWxsXCIgXTtcbmZ1bmN0aW9uIGVuc3VyZVRhcmdldE5hbWUobmFtZSkge1xuICBpZiAodHlwZW9mIG5hbWUgIT09IFwic3RyaW5nXCIpXG4gICAgdGhyb3cgbmV3IEVycm9yKGBUYXJnZXQgXCIke25hbWV9XCIgaXMgbm90IHN0cmluZyB0eXBlYCk7XG4gIGlmIChyZXNlcnZlZFRhZ2V0TmFtZXMuaW5jbHVkZXMobmFtZSkpXG4gICAgdGhyb3cgbmV3IEVycm9yKGBUYXJnZXQgXCIke25hbWV9XCIgaXMgcmVzZXJ2ZWQgbmFtZWApO1xuICByZXR1cm4gbmFtZTtcbn1cblxuZnVuY3Rpb24gQmFzZVRhcmdldChzY29wZSwgbmFtZSkge1xuICB0aGlzW05BTUVdID0gZW5zdXJlVGFyZ2V0TmFtZShuYW1lKTtcbiAgdGhpc1tUQVJHRVRfU0NPUEVdID0gc2NvcGUuY2xvbmUoKTtcbiAgdGhpc1tPVVRQVVRfTkFNRV0gPSBlbnN1cmVTdHJpbmcobmFtZSk7XG4gIHRoaXNbUFJFRklYXSA9IFwiXCI7XG4gIHRoaXNbU1VGRklYXSA9IFwiXCI7XG4gIHRoaXNbQ09NUElMRV9PUFRJT05TXSA9IFtdO1xuICB0aGlzW0xJTktfT1BUSU9OU10gPSBbXTtcbiAgdGhpc1tTT1VSQ0VTXSA9IFtdO1xuICB0aGlzW0xJQlJBUklFU10gPSBbXTtcbiAgdGhpc1tJTkNMVURFU10gPSBzY29wZS5JTkNMVURFUy5tYXAoVkFMVUUgPT4geyByZXR1cm4ge1ZBTFVFfSB9KTtcbiAgdGhpc1tERUZJTkVTXSA9IFtdO1xuICB0aGlzW1BPU0lUSU9OX0lOREVQRU5ERU5UX0NPREVdID0gc2NvcGUuUE9TSVRJT05fSU5ERVBFTkRFTlRfQ09ERTtcbn1cblxuQmFzZVRhcmdldC5wcm90b3R5cGUgPSBPYmplY3QuY3JlYXRlKE9iamVjdC5wcm90b3R5cGUsIHtcbiAgY29uc3RydWN0b3I6IHtcbiAgICB2YWx1ZTogQmFzZVRhcmdldCxcbiAgICBlbnVtZXJhYmxlOiBmYWxzZSxcbiAgfSxcbiAgTkFNRToge1xuICAgIGdldCgpIHsgcmV0dXJuIHRoaXNbTkFNRV07IH0sXG4gICAgZW51bWVyYWJsZTogdHJ1ZSxcbiAgfSxcbiAgVEFSR0VUX1NDT1BFOiB7XG4gICAgZ2V0KCkgeyByZXR1cm4gdGhpc1tUQVJHRVRfU0NPUEVdOyB9LFxuICAgIGVudW1lcmFibGU6IGZhbHNlLFxuICB9LFxuICBPVVRQVVRfTkFNRToge1xuICAgIGdldCgpIHsgcmV0dXJuIHRoaXNbT1VUUFVUX05BTUVdOyB9LFxuICAgIHNldCh2YWx1ZSkgeyB0aGlzW09VVFBVVF9OQU1FXSA9IGVuc3VyZVN0cmluZyh2YWx1ZSk7IH0sXG4gICAgZW51bWVyYWJsZTogdHJ1ZSxcbiAgfSxcbiAgQ09NUElMRV9PUFRJT05TOiB7XG4gICAgZ2V0KCkgeyByZXR1cm4gdGhpc1tDT01QSUxFX09QVElPTlNdOyB9LFxuICAgIGVudW1lcmFibGU6IHRydWUsXG4gIH0sXG4gIFBSRUZJWDoge1xuICAgIGdldCgpIHsgcmV0dXJuIHRoaXNbUFJFRklYXTsgfSxcbiAgICBzZXQodmFsdWUpIHsgdGhpc1tQUkVGSVhdID0gdmFsdWU7IH0sXG4gICAgZW51bWVyYWJsZTogdHJ1ZSxcbiAgfSxcbiAgU1VGRklYOiB7XG4gICAgZ2V0KCkgeyByZXR1cm4gdGhpc1tTVUZGSVhdOyB9LFxuICAgIHNldCh2YWx1ZSkgeyB0aGlzW1NVRkZJWF0gPSB2YWx1ZTsgfSxcbiAgICBlbnVtZXJhYmxlOiB0cnVlLFxuICB9LFxuICBMSU5LX09QVElPTlM6IHtcbiAgICBnZXQoKSB7IHJldHVybiB0aGlzW0xJTktfT1BUSU9OU107IH0sXG4gICAgZW51bWVyYWJsZTogdHJ1ZSxcbiAgfSxcbiAgSU5DTFVERVM6IHtcbiAgICBnZXQoKSB7IHJldHVybiB0aGlzW0lOQ0xVREVTXTsgfSxcbiAgICBlbnVtZXJhYmxlOiB0cnVlLFxuICB9LFxuICBERUZJTkVTOiB7XG4gICAgZ2V0KCkgeyByZXR1cm4gdGhpc1tERUZJTkVTXTsgfSxcbiAgICBlbnVtZXJhYmxlOiB0cnVlLFxuICB9LFxuICBTT1VSQ0VTOiB7XG4gICAgZ2V0KCkgeyByZXR1cm4gdGhpc1tTT1VSQ0VTXTsgfSxcbiAgICBlbnVtZXJhYmxlOiB0cnVlLFxuICB9LFxuICBMSUJSQVJJRVM6IHtcbiAgICBnZXQoKSB7IHJldHVybiB0aGlzW0xJQlJBUklFU107IH0sXG4gICAgZW51bWVyYWJsZTogdHJ1ZSxcbiAgfSxcbiAgRklMRV9ESVI6IHtcbiAgICBnZXQoKSB7IHJldHVybiB0aGlzW1RBUkdFVF9TQ09QRV0uQklOQVJZX0RJUjsgfSxcbiAgICBlbnVtZXJhYmxlOiB0cnVlLFxuICB9LFxuICBGSUxFX05BTUU6IHtcbiAgICBnZXQoKSB7IHJldHVybiB0aGlzLlBSRUZJWCArIHRoaXMuT1VUUFVUX05BTUUgKyB0aGlzLlNVRkZJWDsgfSxcbiAgICBlbnVtZXJhYmxlOiB0cnVlLFxuICB9LFxuICBGSUxFOiB7XG4gICAgZ2V0KCkgeyByZXR1cm4gdGhpcy5GSUxFX0RJUi5qb2luKHRoaXMuRklMRV9OQU1FKTsgfSxcbiAgICBlbnVtZXJhYmxlOiB0cnVlLFxuICB9LFxuICBQT1NJVElPTl9JTkRFUEVOREVOVF9DT0RFOiB7XG4gICAgZ2V0KCkgeyByZXR1cm4gdGhpc1tQT1NJVElPTl9JTkRFUEVOREVOVF9DT0RFXTsgfSxcbiAgICBzZXQodmFsdWUpIHsgdGhpc1tQT1NJVElPTl9JTkRFUEVOREVOVF9DT0RFXSA9IHZhbHVlOyB9LFxuICAgIGVudW1lcmFibGU6IHRydWUsXG4gIH0sXG59KTtcblxuQmFzZVRhcmdldC5wcm90b3R5cGUuYWRkU291cmNlcyA9IGZ1bmN0aW9uKC4uLnNvdXJjZXMpIHtcbiAgZm9yIChsZXQgaXQgb2Ygc291cmNlcy5mbGF0KDEpKSB7XG4gICAgaWYgKGl0IGluc3RhbmNlb2YgSW50ZXJmYWNlT2JqZWN0cyB8fCBpdCBpbnN0YW5jZW9mIFNvdXJjZUZpbGUpXG4gICAgICAvKiAqLztcbiAgICBlbHNlIGlmICh0eXBlb2YgaXQgPT09IFwic3RyaW5nXCIgfHwgQWJzb2x1dGVQYXRoLmlzQWJzb2x1dGUoaXQpKVxuICAgICAgaXQgPSBTb3VyY2VGaWxlLmNyZWF0ZSh0aGlzW1RBUkdFVF9TQ09QRV0sIGl0KTtcbiAgICBlbHNlXG4gICAgICB0aHJvdyBuZXcgRXJyb3IoYE5vdCBzdXBwb3J0IGluc3RhbmNlICR7aXR9YCk7XG5cbiAgICBpZiAoaXQgaW5zdGFuY2VvZiBTb3VyY2VGaWxlICYmIGl0LkxBTkdVQUdFKSB7XG4gICAgICBjb25zdCByZmlsZTEgPSB0aGlzW1RBUkdFVF9TQ09QRV0uQklOQVJZX0RJUi5yZWxhdGl2ZShpdC5GSUxFKTtcbiAgICAgIGNvbnN0IHJmaWxlMiA9IHRoaXNbVEFSR0VUX1NDT1BFXS5TT1VSQ0VfRElSLnJlbGF0aXZlKGl0LkZJTEUpO1xuICAgICAgY29uc3QgcmZpbGUgPSAocmZpbGUyLmxlbmd0aCA8IHJmaWxlMS5sZW5ndGggPyByZmlsZTIgOiByZmlsZTEpLnJlcGxhY2UoXCIuLi9cIiwgXCJfXy9cIik7XG4gICAgICBpdC5PQkpFQ1RfRklMRSA9IHRoaXNbVEFSR0VUX1NDT1BFXS5CSU5BUllfRElSLmpvaW4oXCJNYWtlRmlsZXNcIiwgdGhpc1tOQU1FXSArIFwiLmRpclwiLCAgcmZpbGUgKyBcIi5vYmpcIik7XG4gICAgfVxuXG4gICAgdGhpc1tTT1VSQ0VTXS5wdXNoKGl0KTtcbiAgfVxufVxuXG5CYXNlVGFyZ2V0LnByb3RvdHlwZS5hZGRJbmNsdWRlcyA9IGZ1bmN0aW9uKC4uLmluY2x1ZGVzKSB7XG4gIGZvciAoY29uc3QgaXQgb2YgaW5jbHVkZXMuZmxhdCgxKSkge1xuICAgIGxldCBWQUxVRTtcbiAgICBpZiAoaXQgaW5zdGFuY2VvZiBJbnRlcmZhY2VJbmNsdWRlcylcbiAgICAgIFZBTFVFID0gaXQ7XG4gICAgZWxzZSBpZiAodHlwZW9mIGl0ID09PSBcInN0cmluZ1wiIHx8IEFic29sdXRlUGF0aC5pc0Fic29sdXRlKGl0KSlcbiAgICAgIFZBTFVFID0gSW5jbHVkZURpcmVjdG9yeS5jcmVhdGUoaXQsIHRoaXNbVEFSR0VUX1NDT1BFXS5TT1VSQ0VfRElSKTtcbiAgICBlbHNlXG4gICAgICB0aHJvdyBuZXcgRXJyb3IoYE5vdCBzdXBwb3J0IGluc3RhbmNlICR7aXR9YCk7XG4gICAgdGhpc1tJTkNMVURFU10ucHVzaCh7VkFMVUV9KTsgLy8gSW5jbHVkZURpcmVjdG9yeVtdXG4gIH1cbn1cblxuQmFzZVRhcmdldC5wcm90b3R5cGUuYWRkTGlicmFyaWVzID0gZnVuY3Rpb24oLi4ubGlicmFyaWVzKSB7XG4gIGZvciAoY29uc3QgaXQgb2YgbGlicmFyaWVzLmZsYXQoMSkpIHtcbiAgICB0aGlzW0xJQlJBUklFU10ucHVzaCh7IFZBTFVFOiBJbnRlcmZhY2VUYXJnZXQuZW5zdXJlSW5zdGFuY2UoaXQpIH0pO1xuICB9XG59XG5cbkJhc2VUYXJnZXQucHJvdG90eXBlLmFkZENvbXBpbGVPcHRpb25zID0gZnVuY3Rpb24oLi4ub3B0aW9ucykge1xuICBmb3IgKGNvbnN0IGl0IG9mIG9wdGlvbnMuZmxhdCgxKSkge1xuICAgIHRoaXNbQ09NUElMRV9PUFRJT05TXS5wdXNoKHsgVkFMVUU6IGl0IH0pO1xuICB9XG59XG5cbkJhc2VUYXJnZXQucHJvdG90eXBlLmFkZExpbmtPcHRpb25zID0gZnVuY3Rpb24oLi4ub3B0aW9ucykge1xuICBmb3IgKGNvbnN0IGl0IG9mIG9wdGlvbnMuZmxhdCgxKSkge1xuICAgIHRoaXNbTElOS19PUFRJT05TXS5wdXNoKHsgVkFMVUU6IGl0IH0pO1xuICB9XG59XG5cbkJhc2VUYXJnZXQucHJvdG90eXBlLmdldFNvdXJjZUZpbGVzID0gZnVuY3Rpb24oLi4uc291cmNlcykge1xuICBjb25zdCByZXN1bHQgPSBbXTtcbiAgZm9yIChjb25zdCBpdCBvZiBzb3VyY2VzLmZsYXQoMSkpIHtcbiAgICBjb25zdCBmaWxlbmFtZSA9IHRoaXNbVEFSR0VUX1NDT1BFXS5TT1VSQ0VfRElSLnJlc29sdmUoaXQpLnRvU3RyaW5nKCk7XG4gICAgY29uc3Qgc3JjID0gdGhpc1tTT1VSQ0VTXS5maW5kKGkgPT4gaSBpbnN0YW5jZW9mIFNvdXJjZUZpbGUgJiYgaS5GSUxFLnRvU3RyaW5nKCkgPT09IGZpbGVuYW1lKTtcbiAgICBpZiAoIXNyYylcbiAgICAgIHRocm93IG5ldyBFcnJvcihgQ2Fubm90IGZpbmQgXCIke2l0fVwiYCk7XG4gICAgcmVzdWx0LnB1c2goc3JjKTtcbiAgfVxuXG4gIGlmIChyZXN1bHQubGVuZ3RoKVxuICAgIHJldHVybiBTb3VyY2VGaWxlTGlzdC5jcmVhdGUodGhpc1tUQVJHRVRfU0NPUEVdLCByZXN1bHQpO1xuXG4gIHJldHVybiBTb3VyY2VGaWxlTGlzdC5jcmVhdGUodGhpc1tUQVJHRVRfU0NPUEVdLCB0aGlzW1NPVVJDRVNdLmZpbHRlcihpID0+IGkgaW5zdGFuY2VvZiBTb3VyY2VGaWxlKSk7XG59XG5cbkJhc2VUYXJnZXQucHJvdG90eXBlLnNldFByZWZpeCA9IGZ1bmN0aW9uKHByZWZpeCkge1xuICB0aGlzW1BSRUZJWF0gPSBwcmVmaXg7XG59XG5cbkJhc2VUYXJnZXQucHJvdG90eXBlLnNldFN1ZmZpeCA9IGZ1bmN0aW9uKHN1ZmZpeCkge1xuICB0aGlzW1NVRkZJWF0gPSBzdWZmaXg7XG59XG5cbkJhc2VUYXJnZXQucHJvdG90eXBlLnNldE91dHB1dE5hbWUgPSBmdW5jdGlvbihvdXRwdXROYW1lKSB7XG4gIHRoaXNbT1VUUFVUX05BTUVdID0gb3V0cHV0TmFtZTtcbn1cblxuQmFzZVRhcmdldC5wcm90b3R5cGUuYWRkRGVmaW5pdGlvbnMgPSBmdW5jdGlvbiguLi5kZWZpbml0aW9ucykge1xuICBmb3IgKGNvbnN0IFZBTFVFIG9mIGRlZmluaXRpb25zLmZsYXQoMSkpXG4gICAgdGhpc1tERUZJTkVTXS5wdXNoKHsgVkFMVUUgfSk7XG59XG5cbkJhc2VUYXJnZXQucHJvdG90eXBlLnRvSlNPTiA9IGZ1bmN0aW9uKCkge1xuICBjb25zdCBqc29uID0ge307XG4gIGZvciAoY29uc3Qga2V5IGluIHRoaXMpXG4gICAganNvbltrZXldID0gdGhpc1trZXldO1xuICByZXR1cm4ganNvbjtcbn1cblxuZnVuY3Rpb24gQmFzZUxpYnJhcnkoc2NvcGUsIG5hbWUpIHtcbiAgQmFzZVRhcmdldC5jYWxsKHRoaXMsIHNjb3BlLCBuYW1lKTtcbn1cblxuQmFzZUxpYnJhcnkucHJvdG90eXBlID0gT2JqZWN0LmNyZWF0ZShCYXNlVGFyZ2V0LnByb3RvdHlwZSwge1xuICBjb25zdHJ1Y3Rvcjoge1xuICAgIHZhbHVlOiBCYXNlTGlicmFyeSxcbiAgICBlbnVtZXJhYmxlOiBmYWxzZSxcbiAgICB3cml0YWJsZTogdHJ1ZSxcbiAgICBjb25maWd1cmFibGU6IHRydWUsXG4gIH0sXG59KTtcblxuQmFzZUxpYnJhcnkucHJvdG90eXBlLmFkZFB1YmxpY0luY2x1ZGVzID0gZnVuY3Rpb24oLi4uaW5jbHVkZXMpIHtcbiAgZm9yIChjb25zdCBpdCBvZiBpbmNsdWRlcy5mbGF0KDEpKSB7XG4gICAgbGV0IFZBTFVFO1xuICAgIGlmIChpdCBpbnN0YW5jZW9mIEludGVyZmFjZUluY2x1ZGVzKVxuICAgICAgVkFMVUUgPSBpdDtcbiAgICBlbHNlIGlmICh0eXBlb2YgaXQgPT09IFwic3RyaW5nXCIgfHwgQWJzb2x1dGVQYXRoLmlzQWJzb2x1dGUoaXQpKVxuICAgICAgVkFMVUUgPSBJbmNsdWRlRGlyZWN0b3J5LmNyZWF0ZShpdCwgdGhpc1tUQVJHRVRfU0NPUEVdLlNPVVJDRV9ESVIpO1xuICAgIGVsc2VcbiAgICAgIHRocm93IG5ldyBFcnJvcihgTm90IHN1cHBvcnQgaW5zdGFuY2UgJHtpdH1gKTtcbiAgICB0aGlzW0lOQ0xVREVTXS5wdXNoKHtWQUxVRSwgUFVCTElDX09OTFk6IHRydWV9KTsgLy8gSW5jbHVkZURpcmVjdG9yeVtdXG4gIH1cbn1cblxuQmFzZUxpYnJhcnkucHJvdG90eXBlLmFkZFB1YmxpY0RlZmluaXRpb25zID0gZnVuY3Rpb24oLi4uZGVmaW5pdGlvbnMpIHtcbiAgZm9yIChjb25zdCBWQUxVRSBvZiBkZWZpbml0aW9ucy5mbGF0KDEpKVxuICAgIHRoaXNbREVGSU5FU10ucHVzaCh7IFZBTFVFLCBQVUJMSUNfT05MWTogdHJ1ZSB9KTtcbn1cblxuQmFzZUxpYnJhcnkucHJvdG90eXBlLmFkZFB1YmxpY0xpYnJhcmllcyA9IGZ1bmN0aW9uKC4uLmxpYnJhcmllcykge1xuICBmb3IgKGNvbnN0IGl0IG9mIGxpYnJhcmllcy5mbGF0KDEpKSB7XG4gICAgdGhpc1tMSUJSQVJJRVNdLnB1c2goe1ZBTFVFOiBJbnRlcmZhY2VUYXJnZXQuZW5zdXJlSW5zdGFuY2UoaXQpLCBQVUJMSUNfT05MWTogdHJ1ZX0pO1xuICB9XG59XG5cbkJhc2VMaWJyYXJ5LnByb3RvdHlwZS5hZGRQdWJsaWNDb21waWxlT3B0aW9ucyA9IGZ1bmN0aW9uKC4uLm9wdGlvbnMpIHtcbiAgZm9yIChjb25zdCBpdCBvZiBvcHRpb25zLmZsYXQoMSkpIHtcbiAgICB0aGlzW0NPTVBJTEVfT1BUSU9OU10ucHVzaCh7IFZBTFVFOiBpdCwgUFVCTElDX09OTFk6IHRydWUgfSk7XG4gIH1cbn1cblxuQmFzZUxpYnJhcnkucHJvdG90eXBlLmFkZFB1YmxpY0xpbmtPcHRpb25zID0gZnVuY3Rpb24oLi4ub3B0aW9ucykge1xuICBmb3IgKGNvbnN0IGl0IG9mIG9wdGlvbnMuZmxhdCgxKSkge1xuICAgIHRoaXNbTElOS19PUFRJT05TXS5wdXNoKHsgVkFMVUU6IGl0LCBQVUJMSUNfT05MWTogdHJ1ZSB9KTtcbiAgfVxufVxuXG5mdW5jdGlvbiBPYmplY3RMaWJyYXJ5KHNjb3BlLCBuYW1lKSB7XG4gIEJhc2VMaWJyYXJ5LmNhbGwodGhpcywgc2NvcGUsIG5hbWUpO1xuICB0aGlzLlBSRUZJWCA9IHNjb3BlLk9CSkVDVF9MSUJSQVJZX1BSRUZJWDtcbiAgdGhpcy5TVUZGSVggPSBzY29wZS5PQkpFQ1RfTElCUkFSWV9TVUZGSVg7XG4gIHRoaXMuTElOS19PUFRJT05TLnB1c2goLi4uc2NvcGUuT0JKRUNUX0xJTktFUl9GTEFHUy5tYXAoVkFMVUUgPT4geyByZXR1cm4geyBWQUxVRSB9IH0pKTtcbn1cblxuT2JqZWN0TGlicmFyeS5wcm90b3R5cGUgPSBPYmplY3QuY3JlYXRlKEJhc2VMaWJyYXJ5LnByb3RvdHlwZSwge1xuICBjb25zdHJ1Y3Rvcjoge1xuICAgIHZhbHVlOiBPYmplY3RMaWJyYXJ5LFxuICAgIGVudW1lcmFibGU6IGZhbHNlLFxuICAgIHdyaXRhYmxlOiB0cnVlLFxuICAgIGNvbmZpZ3VyYWJsZTogdHJ1ZSxcbiAgfSxcbn0pO1xuXG5PYmplY3RMaWJyYXJ5LmNyZWF0ZSA9IChzY29wZSwgbmFtZSkgPT4ge1xuICByZXR1cm4gT2JqZWN0LnNlYWwobmV3IE9iamVjdExpYnJhcnkoc2NvcGUsIG5hbWUpKTtcbn1cblxuZnVuY3Rpb24gU3RhdGljTGlicmFyeShzY29wZSwgbmFtZSkge1xuICBCYXNlTGlicmFyeS5jYWxsKHRoaXMsIHNjb3BlLCBuYW1lKTtcbiAgdGhpcy5QUkVGSVggPSBzY29wZS5TVEFUSUNfTElCUkFSWV9QUkVGSVg7XG4gIHRoaXMuU1VGRklYID0gc2NvcGUuU1RBVElDX0xJQlJBUllfU1VGRklYO1xuICB0aGlzLkxJTktfT1BUSU9OUy5wdXNoKC4uLnNjb3BlLlNUQVRJQ19MSU5LRVJfRkxBR1MubWFwKFZBTFVFID0+IHsgcmV0dXJuIHsgVkFMVUUgfSB9KSk7XG59XG5cblN0YXRpY0xpYnJhcnkucHJvdG90eXBlID0gT2JqZWN0LmNyZWF0ZShCYXNlTGlicmFyeS5wcm90b3R5cGUsIHtcbiAgY29uc3RydWN0b3I6IHtcbiAgICB2YWx1ZTogU3RhdGljTGlicmFyeSxcbiAgICBlbnVtZXJhYmxlOiBmYWxzZSxcbiAgICB3cml0YWJsZTogdHJ1ZSxcbiAgICBjb25maWd1cmFibGU6IHRydWUsXG4gIH0sXG59KTtcblxuU3RhdGljTGlicmFyeS5jcmVhdGUgPSAoc2NvcGUsIG5hbWUpID0+IHtcbiAgcmV0dXJuIE9iamVjdC5zZWFsKG5ldyBTdGF0aWNMaWJyYXJ5KHNjb3BlLCBuYW1lKSk7XG59XG5cbmZ1bmN0aW9uIFNoYXJlZExpYnJhcnkoc2NvcGUsIG5hbWUpIHtcbiAgQmFzZUxpYnJhcnkuY2FsbCh0aGlzLCBzY29wZSwgbmFtZSk7XG4gIHRoaXMuUFJFRklYID0gc2NvcGUuU0hBUkVEX0xJQlJBUllfUFJFRklYO1xuICB0aGlzLlNVRkZJWCA9IHNjb3BlLlNIQVJFRF9MSUJSQVJZX1NVRkZJWDtcbiAgdGhpcy5MSU5LX09QVElPTlMucHVzaCguLi5zY29wZS5TSEFSRURfTElOS0VSX0ZMQUdTLm1hcChWQUxVRSA9PiB7IHJldHVybiB7IFZBTFVFIH0gfSkpO1xufVxuXG5TaGFyZWRMaWJyYXJ5LnByb3RvdHlwZSA9IE9iamVjdC5jcmVhdGUoQmFzZUxpYnJhcnkucHJvdG90eXBlLCB7XG4gIGNvbnN0cnVjdG9yOiB7XG4gICAgdmFsdWU6IFNoYXJlZExpYnJhcnksXG4gICAgZW51bWVyYWJsZTogZmFsc2UsXG4gICAgd3JpdGFibGU6IHRydWUsXG4gICAgY29uZmlndXJhYmxlOiB0cnVlLFxuICB9LFxufSk7XG5cblNoYXJlZExpYnJhcnkuY3JlYXRlID0gKHNjb3BlLCBuYW1lKSA9PiB7XG4gIHJldHVybiBPYmplY3Quc2VhbChuZXcgU2hhcmVkTGlicmFyeShzY29wZSwgbmFtZSkpO1xufVxuXG5mdW5jdGlvbiBFeGVjdXRhYmxlKHNjb3BlLCBuYW1lKSB7XG4gIEJhc2VUYXJnZXQuY2FsbCh0aGlzLCBzY29wZSwgbmFtZSk7XG4gIHRoaXMuU1VGRklYID0gc2NvcGUuRVhFQ1VUQUJMRV9TVUZGSVg7XG4gIHRoaXMuTElOS19PUFRJT05TLnB1c2goLi4uc2NvcGUuRVhFX0xJTktFUl9GTEFHUy5tYXAoVkFMVUUgPT4geyByZXR1cm4geyBWQUxVRSB9IH0pKTtcbn1cblxuRXhlY3V0YWJsZS5wcm90b3R5cGUgPSBPYmplY3QuY3JlYXRlKEJhc2VUYXJnZXQucHJvdG90eXBlLCB7XG4gIGNvbnN0cnVjdG9yOiB7XG4gICAgdmFsdWU6IEV4ZWN1dGFibGUsXG4gICAgZW51bWVyYWJsZTogZmFsc2UsXG4gICAgd3JpdGFibGU6IHRydWUsXG4gICAgY29uZmlndXJhYmxlOiB0cnVlLFxuICB9LFxufSk7XG5cbkV4ZWN1dGFibGUuY3JlYXRlID0gKHNjb3BlLCBuYW1lKSA9PiB7XG4gIHJldHVybiBPYmplY3Quc2VhbChuZXcgRXhlY3V0YWJsZShzY29wZSwgbmFtZSkpO1xufVxuXG5tb2R1bGUuZXhwb3J0cyA9IHtcbiAgQmFzZVRhcmdldCxcbiAgQmFzZUxpYnJhcnksXG4gIE9iamVjdExpYnJhcnksXG4gIFN0YXRpY0xpYnJhcnksXG4gIFNoYXJlZExpYnJhcnksXG4gIEV4ZWN1dGFibGUsXG59O1xuIiwiXCJ1c2Ugc3RyaWN0XCI7XG5cbmNvbnN0IHsgSW5jbHVkZURpcmVjdG9yeSB9ID0gcmVxdWlyZShcIkAvY29yZS9JbmNsdWRlRGlyZWN0b3J5XCIpO1xuY29uc3QgeyBJbnRlcmZhY2VJbmNsdWRlcyB9ID0gcmVxdWlyZShcIkAvY29yZS9JbnRlcmZhY2VJbmNsdWRlc1wiKTtcbmNvbnN0IHsgSW50ZXJmYWNlVGFyZ2V0IH0gPSByZXF1aXJlKFwiQC9jb3JlL0ludGVyZmFjZVRhcmdldFwiKTtcblxuY29uc3QgRU5UUklFUyA9IFN5bWJvbChcIkVOVFJJRVNcIik7XG5cbmZ1bmN0aW9uIFRhcmdldENvbGxlY3Rpb24oKSB7XG4gIHRoaXNbRU5UUklFU10gPSB7fTtcbn1cblxuVGFyZ2V0Q29sbGVjdGlvbi5wcm90b3R5cGUgPSBPYmplY3QuY3JlYXRlKE9iamVjdC5wcm90b3R5cGUsIHtcbiAgY29uc3RydWN0b3I6IHtcbiAgICB2YWx1ZTogVGFyZ2V0Q29sbGVjdGlvbixcbiAgICBlbnVtZXJhYmxlOiBmYWxzZSxcbiAgICB3cml0YWJsZTogdHJ1ZSxcbiAgICBjb25maWd1cmFibGU6IHRydWUsXG4gIH0sXG4gIEVOVFJJRVM6IHtcbiAgICBnZXQoKSB7IHJldHVybiB0aGlzW0VOVFJJRVNdOyB9LFxuICAgIGVudW1lcmFibGU6IHRydWUsXG4gIH0sXG59KTtcblxuVGFyZ2V0Q29sbGVjdGlvbi5jcmVhdGUgPSAoKSA9PiB7XG4gIHJldHVybiBPYmplY3Quc2VhbChuZXcgVGFyZ2V0Q29sbGVjdGlvbigpKTtcbn1cblxuVGFyZ2V0Q29sbGVjdGlvbi5wcm90b3R5cGUudG9KU09OID0gZnVuY3Rpb24oKSB7XG4gIHJldHVybiB0aGlzW0VOVFJJRVNdO1xufVxuXG5UYXJnZXRDb2xsZWN0aW9uLnByb3RvdHlwZS5nZXQgPSBmdW5jdGlvbihuYW1lKSB7XG4gIHJldHVybiB0aGlzW0VOVFJJRVNdW25hbWVdO1xufVxuXG5UYXJnZXRDb2xsZWN0aW9uLnByb3RvdHlwZS5zZXQgPSBmdW5jdGlvbihuYW1lLCB0YXJnZXQpIHtcbiAgaWYgKHRoaXNbRU5UUklFU11bbmFtZV0pXG4gICAgdGhyb3cgbmV3IEVycm9yKGBUYXJnZXQgXCIke25hbWV9XCIgZXhpc3RzYCk7XG4gIHRoaXNbRU5UUklFU11bbmFtZV0gPSB0YXJnZXQ7XG59XG5cbmZ1bmN0aW9uIGdldEhlYWRlcnModGFyZ2V0KSB7XG4gIHJldHVybiB0YXJnZXQuU09VUkNFUy5maWx0ZXIoaSA9PiBpLkhFQURFUl9GSUxFX09OTFkpO1xufVxuXG5mdW5jdGlvbiBnZXRJbmNsdWRlcyh0YXJnZXQpIHtcbiAgcmV0dXJuIHRhcmdldC5JTkNMVURFUy5tYXAoaSA9PiBpLlZBTFVFKTtcbn1cblxuZnVuY3Rpb24gZ2V0UHVibGljSW5jbHVkZXModGFyZ2V0KSB7XG4gIHJldHVybiB0YXJnZXQuSU5DTFVERVMuZmlsdGVyKGkgPT4gaS5QVUJMSUNfT05MWSkubWFwKGkgPT4gaS5WQUxVRSk7XG59XG5cbmZ1bmN0aW9uIGdldExpYnJhcmllcyh0YXJnZXQpIHtcbiAgcmV0dXJuIHRhcmdldC5MSUJSQVJJRVMubWFwKGkgPT4gaS5WQUxVRSk7XG59XG5cbmZ1bmN0aW9uIGdldFB1YmxpY0xpYnJhcmllcyh0YXJnZXQpIHtcbiAgcmV0dXJuIHRhcmdldC5MSUJSQVJJRVMuZmlsdGVyKGkgPT4gaS5QVUJMSUNfT05MWSkubWFwKGkgPT4gaS5WQUxVRSk7XG59XG5cbmZ1bmN0aW9uIGdldERlZmluaXRpb25zKHRhcmdldCkge1xuICByZXR1cm4gdGFyZ2V0LkRFRklORVMubWFwKGkgPT4gaS5WQUxVRSk7XG59XG5cbmZ1bmN0aW9uIGdldFB1YmxpY0RlZmluaXRpb25zKHRhcmdldCkge1xuICByZXR1cm4gdGFyZ2V0LkRFRklORVMuZmlsdGVyKGkgPT4gaS5QVUJMSUNfT05MWSkubWFwKGkgPT4gaS5WQUxVRSk7XG59XG5cbmZ1bmN0aW9uIGdldENvbXBpbGVPcHRpb25zKHRhcmdldCkge1xuICByZXR1cm4gdGFyZ2V0LkNPTVBJTEVfT1BUSU9OUy5tYXAoaSA9PiBpLlZBTFVFKTtcbn1cblxuZnVuY3Rpb24gZ2V0UHVibGljQ29tcGlsZU9wdGlvbnModGFyZ2V0KSB7XG4gIHJldHVybiB0YXJnZXQuQ09NUElMRV9PUFRJT05TLmZpbHRlcihpID0+IGkuUFVCTElDX09OTFkpLm1hcChpID0+IGkuVkFMVUUpO1xufVxuXG5mdW5jdGlvbiBnZXRMaW5rT3B0aW9ucyh0YXJnZXQpIHtcbiAgcmV0dXJuIHRhcmdldC5MSU5LX09QVElPTlMubWFwKGkgPT4gaS5WQUxVRSk7XG59XG5cbmZ1bmN0aW9uIGdldFB1YmxpY0xpbmtPcHRpb25zKHRhcmdldCkge1xuICByZXR1cm4gdGFyZ2V0LkxJTktfT1BUSU9OUy5maWx0ZXIoaSA9PiBpLlBVQkxJQ19PTkxZKS5tYXAoaSA9PiBpLlZBTFVFKTtcbn1cblxuVGFyZ2V0Q29sbGVjdGlvbi5wcm90b3R5cGUuX19nZXRBbGxJbmNsdWRlcyA9IGZ1bmN0aW9uKGluY2x1ZGVzLCB0YXJnZXRTZXQsIGxpc3QpIHtcbiAgZm9yIChjb25zdCBpdGVyIG9mIGxpc3QpIHtcbiAgICBpZiAoaXRlciBpbnN0YW5jZW9mIEludGVyZmFjZUluY2x1ZGVzIHx8IGl0ZXIgaW5zdGFuY2VvZiBJbnRlcmZhY2VUYXJnZXQpIHtcbiAgICAgIGlmICghdGFyZ2V0U2V0LmhhcyhpdGVyLnRhcmdldE5hbWUpKSB7XG4gICAgICAgIHRhcmdldFNldC5hZGQoaXRlci50YXJnZXROYW1lKTtcbiAgICAgICAgY29uc3QgdGFyZ2V0ID0gdGhpcy5nZXQoaXRlci50YXJnZXROYW1lKTtcbiAgICAgICAgdGhpcy5fX2dldEFsbEluY2x1ZGVzKGluY2x1ZGVzLCB0YXJnZXRTZXQsIGdldFB1YmxpY0luY2x1ZGVzKHRhcmdldCkpO1xuICAgICAgICB0aGlzLl9fZ2V0QWxsSW5jbHVkZXMoaW5jbHVkZXMsIHRhcmdldFNldCwgZ2V0UHVibGljTGlicmFyaWVzKHRhcmdldCkpO1xuICAgICAgfVxuICAgIH1cbiAgICBlbHNlIGlmIChpdGVyIGluc3RhbmNlb2YgSW5jbHVkZURpcmVjdG9yeSkge1xuICAgICAgaWYgKCFpbmNsdWRlcy5pbmNsdWRlcyhpdGVyLnRvU3RyaW5nKCkpKVxuICAgICAgICBpbmNsdWRlcy5wdXNoKGl0ZXIudG9TdHJpbmcoKSk7XG4gICAgfVxuICAgIGVsc2Uge1xuICAgICAgdGhyb3cgbmV3IEVycm9yKGBOb3Qgc3VwcG9ydCBpbnN0YW5jZSAke2l0ZXJ9YCk7XG4gICAgfVxuICB9XG59XG5cblRhcmdldENvbGxlY3Rpb24ucHJvdG90eXBlLmFsbEluY2x1ZGVzT2YgPSBmdW5jdGlvbihwYXJhbXMpIHtcbiAgY29uc3QgdGFyZ2V0ID0gKHR5cGVvZiBwYXJhbXMgPT09IFwic3RyaW5nXCIpID8gdGhpcy5nZXQocGFyYW1zKSA6IHBhcmFtcztcbiAgY29uc3QgaW5jbHVkZXMgPSBbXTtcbiAgY29uc3QgdGFyZ2V0U2V0ID0gbmV3IFNldChbIHRhcmdldC5OQU1FIF0pO1xuICB0aGlzLl9fZ2V0QWxsSW5jbHVkZXMoaW5jbHVkZXMsIHRhcmdldFNldCwgZ2V0SW5jbHVkZXModGFyZ2V0KSk7XG4gIHRoaXMuX19nZXRBbGxJbmNsdWRlcyhpbmNsdWRlcywgdGFyZ2V0U2V0LCBnZXRMaWJyYXJpZXModGFyZ2V0KSk7XG4gIHJldHVybiBpbmNsdWRlcztcbn1cblxuVGFyZ2V0Q29sbGVjdGlvbi5wcm90b3R5cGUuX19nZXRBbGxIZWFkZXJzID0gZnVuY3Rpb24oaGVhZGVycywgdGFyZ2V0U2V0LCBsaXN0KSB7XG4gIGZvciAoY29uc3QgaXRlciBvZiBsaXN0KSB7XG4gICAgaWYgKGl0ZXIgaW5zdGFuY2VvZiBJbnRlcmZhY2VJbmNsdWRlcyB8fCBpdGVyIGluc3RhbmNlb2YgSW50ZXJmYWNlVGFyZ2V0KSB7XG4gICAgICBpZiAoIXRhcmdldFNldC5oYXMoaXRlci50YXJnZXROYW1lKSkge1xuICAgICAgICB0YXJnZXRTZXQuYWRkKGl0ZXIudGFyZ2V0TmFtZSk7XG4gICAgICAgIGNvbnN0IHRhcmdldCA9IHRoaXMuZ2V0KGl0ZXIudGFyZ2V0TmFtZSk7XG4gICAgICAgIGZvciAoY29uc3QgaGVhZGVyIG9mIGdldEhlYWRlcnModGFyZ2V0KS5tYXAoaSA9PiBpLkZJTEUudG9TdHJpbmcoKSkpIHtcbiAgICAgICAgICBpZiAoIWhlYWRlcnMuaW5jbHVkZXMoaGVhZGVyLnRvU3RyaW5nKCkpKVxuICAgICAgICAgICAgaGVhZGVycy5wdXNoKGhlYWRlci50b1N0cmluZygpKTtcbiAgICAgICAgfVxuICAgICAgICB0aGlzLl9fZ2V0QWxsSGVhZGVycyhoZWFkZXJzLCB0YXJnZXRTZXQsIGdldFB1YmxpY0luY2x1ZGVzKHRhcmdldCkpO1xuICAgICAgICB0aGlzLl9fZ2V0QWxsSGVhZGVycyhoZWFkZXJzLCB0YXJnZXRTZXQsIGdldFB1YmxpY0xpYnJhcmllcyh0YXJnZXQpKTtcbiAgICAgIH1cbiAgICB9XG4gIH1cbn1cblxuVGFyZ2V0Q29sbGVjdGlvbi5wcm90b3R5cGUuYWxsSGVhZGVyc09mID0gZnVuY3Rpb24ocGFyYW1zKSB7XG4gIGNvbnN0IHRhcmdldCA9ICh0eXBlb2YgcGFyYW1zID09PSBcInN0cmluZ1wiKSA/IHRoaXMuZ2V0KHBhcmFtcykgOiBwYXJhbXM7XG4gIGNvbnN0IGhlYWRlcnMgPSBnZXRIZWFkZXJzKHRhcmdldCkubWFwKGkgPT4gaS5GSUxFLnRvU3RyaW5nKCkpO1xuICBjb25zdCB0YXJnZXRTZXQgPSBuZXcgU2V0KFsgdGFyZ2V0Lk5BTUUgXSk7XG4gIHRoaXMuX19nZXRBbGxIZWFkZXJzKGhlYWRlcnMsIHRhcmdldFNldCwgZ2V0SW5jbHVkZXModGFyZ2V0KSk7XG4gIHRoaXMuX19nZXRBbGxIZWFkZXJzKGhlYWRlcnMsIHRhcmdldFNldCwgZ2V0TGlicmFyaWVzKHRhcmdldCkpO1xuICByZXR1cm4gaGVhZGVycztcbn1cblxuVGFyZ2V0Q29sbGVjdGlvbi5wcm90b3R5cGUuX19nZXRBbGxMaWJyYXJpZXMgPSBmdW5jdGlvbihsaWJyYXJpZXMsIHRhcmdldFNldCwgbGlzdCkge1xuICBmb3IgKGNvbnN0IGl0ZXIgb2YgbGlzdCkge1xuICAgIGNvbnNvbGUuYXNzZXJ0KGl0ZXIgaW5zdGFuY2VvZiBJbnRlcmZhY2VUYXJnZXQpO1xuICAgIGlmICghdGFyZ2V0U2V0LmhhcyhpdGVyLnRhcmdldE5hbWUpKSB7XG4gICAgICB0YXJnZXRTZXQuYWRkKGl0ZXIudGFyZ2V0TmFtZSk7XG4gICAgICBjb25zdCB0YXJnZXQgPSB0aGlzLmdldChpdGVyLnRhcmdldE5hbWUpO1xuICAgICAgbGlicmFyaWVzLnB1c2godGFyZ2V0LkZJTEUudG9TdHJpbmcoKSk7XG4gICAgICB0aGlzLl9fZ2V0QWxsTGlicmFyaWVzKGxpYnJhcmllcywgdGFyZ2V0U2V0LCBnZXRQdWJsaWNMaWJyYXJpZXModGFyZ2V0KSk7XG4gICAgfVxuICB9XG59XG5cblRhcmdldENvbGxlY3Rpb24ucHJvdG90eXBlLmFsbExpYnJhcmllc09mID0gZnVuY3Rpb24ocGFyYW1zKSB7XG4gIGNvbnN0IHRhcmdldCA9ICh0eXBlb2YgcGFyYW1zID09PSBcInN0cmluZ1wiKSA/IHRoaXMuZ2V0KHBhcmFtcykgOiBwYXJhbXM7XG4gIGNvbnN0IGxpYnJhcmllcyA9IFtdO1xuICBjb25zdCB0YXJnZXRTZXQgPSBuZXcgU2V0KFsgdGFyZ2V0Lk5BTUUgXSk7XG4gIHRoaXMuX19nZXRBbGxMaWJyYXJpZXMobGlicmFyaWVzLCB0YXJnZXRTZXQsIGdldExpYnJhcmllcyh0YXJnZXQpKTtcbiAgcmV0dXJuIGxpYnJhcmllcztcbn1cblxuVGFyZ2V0Q29sbGVjdGlvbi5wcm90b3R5cGUuX19nZXRBbGxEZWZpbml0aW9ucyA9IGZ1bmN0aW9uKGRlZmluaXRpb25zLCB0YXJnZXRTZXQsIGxpc3QpIHtcbiAgZm9yIChjb25zdCBpdGVyIG9mIGxpc3QpIHtcbiAgICBpZiAoaXRlciBpbnN0YW5jZW9mIEludGVyZmFjZVRhcmdldCkge1xuICAgICAgaWYgKCF0YXJnZXRTZXQuaGFzKGl0ZXIudGFyZ2V0TmFtZSkpIHtcbiAgICAgICAgdGFyZ2V0U2V0LmFkZChpdGVyLnRhcmdldE5hbWUpO1xuICAgICAgICBjb25zdCB0YXJnZXQgPSB0aGlzLmdldChpdGVyLnRhcmdldE5hbWUpO1xuICAgICAgICB0aGlzLl9fZ2V0QWxsRGVmaW5pdGlvbnMoZGVmaW5pdGlvbnMsIHRhcmdldFNldCwgZ2V0UHVibGljRGVmaW5pdGlvbnModGFyZ2V0KSk7XG4gICAgICAgIHRoaXMuX19nZXRBbGxEZWZpbml0aW9ucyhkZWZpbml0aW9ucywgdGFyZ2V0U2V0LCBnZXRQdWJsaWNMaWJyYXJpZXModGFyZ2V0KSk7XG4gICAgICB9XG4gICAgfVxuICAgIGVsc2UgaWYgKHR5cGVvZiBpdGVyID09PSBcInN0cmluZ1wiKSB7XG4gICAgICBpZiAoIWRlZmluaXRpb25zLmluY2x1ZGVzKGl0ZXIpKVxuICAgICAgICBkZWZpbml0aW9ucy5wdXNoKGl0ZXIpO1xuICAgIH1cbiAgICBlbHNlIHtcbiAgICAgIHRocm93IG5ldyBFcnJvcihgTm90IHN1cHBvcnQgaW5zdGFuY2UgJHtpdGVyfWApO1xuICAgIH1cbiAgfVxufVxuXG5UYXJnZXRDb2xsZWN0aW9uLnByb3RvdHlwZS5hbGxEZWZpbml0aW9uc09mID0gZnVuY3Rpb24ocGFyYW1zKSB7XG4gIGNvbnN0IHRhcmdldCA9ICh0eXBlb2YgcGFyYW1zID09PSBcInN0cmluZ1wiKSA/IHRoaXMuZ2V0KHBhcmFtcykgOiBwYXJhbXM7XG4gIGNvbnN0IGRlZmluaXRpb25zID0gW107XG4gIGNvbnN0IHRhcmdldFNldCA9IG5ldyBTZXQoWyB0YXJnZXQuTkFNRSBdKTtcbiAgdGhpcy5fX2dldEFsbERlZmluaXRpb25zKGRlZmluaXRpb25zLCB0YXJnZXRTZXQsIGdldERlZmluaXRpb25zKHRhcmdldCkpO1xuICB0aGlzLl9fZ2V0QWxsRGVmaW5pdGlvbnMoZGVmaW5pdGlvbnMsIHRhcmdldFNldCwgZ2V0UHVibGljTGlicmFyaWVzKHRhcmdldCkpO1xuICByZXR1cm4gZGVmaW5pdGlvbnM7XG59XG5cblRhcmdldENvbGxlY3Rpb24ucHJvdG90eXBlLl9fZ2V0QWxsQ29tcGlsZU9wdGlvbnMgPSBmdW5jdGlvbihvcHRpb25zLCB0YXJnZXRTZXQsIGxpc3QpIHtcbiAgZm9yIChjb25zdCBpdGVyIG9mIGxpc3QpIHtcbiAgICBpZiAoaXRlciBpbnN0YW5jZW9mIEludGVyZmFjZVRhcmdldCkge1xuICAgICAgaWYgKCF0YXJnZXRTZXQuaGFzKGl0ZXIudGFyZ2V0TmFtZSkpIHtcbiAgICAgICAgdGFyZ2V0U2V0LmFkZChpdGVyLnRhcmdldE5hbWUpO1xuICAgICAgICBjb25zdCB0YXJnZXQgPSB0aGlzLmdldChpdGVyLnRhcmdldE5hbWUpO1xuICAgICAgICB0aGlzLl9fZ2V0QWxsQ29tcGlsZU9wdGlvbnMob3B0aW9ucywgdGFyZ2V0U2V0LCBnZXRQdWJsaWNDb21waWxlT3B0aW9ucyh0YXJnZXQpKTtcbiAgICAgICAgdGhpcy5fX2dldEFsbENvbXBpbGVPcHRpb25zKG9wdGlvbnMsIHRhcmdldFNldCwgZ2V0UHVibGljTGlicmFyaWVzKHRhcmdldCkpO1xuICAgICAgfVxuICAgIH1cbiAgICBlbHNlIGlmICh0eXBlb2YgaXRlciA9PT0gXCJzdHJpbmdcIikge1xuICAgICAgaWYgKCFvcHRpb25zLmluY2x1ZGVzKGl0ZXIpKVxuICAgICAgICBvcHRpb25zLnB1c2goaXRlcik7XG4gICAgfVxuICAgIGVsc2UgaWYgKEFycmF5LmlzQXJyYXkoaXRlcikpIHtcbiAgICAgIC8vIFRPRE86IEFkZCBjb21wYXJlIGZvciBzYW1lIGFycmF5IGluIG9wdGlvbnNcbiAgICAgIG9wdGlvbnMucHVzaChpdGVyKTtcbiAgICB9XG4gICAgZWxzZSB7XG4gICAgICB0aHJvdyBuZXcgRXJyb3IoYE5vdCBzdXBwb3J0IGluc3RhbmNlICR7aXRlcn1gKTtcbiAgICB9XG4gIH1cbn1cblxuVGFyZ2V0Q29sbGVjdGlvbi5wcm90b3R5cGUuYWxsQ29tcGlsZU9wdGlvbnNPZiA9IGZ1bmN0aW9uKHBhcmFtcykge1xuICBjb25zdCB0YXJnZXQgPSAodHlwZW9mIHBhcmFtcyA9PT0gXCJzdHJpbmdcIikgPyB0aGlzLmdldChwYXJhbXMpIDogcGFyYW1zO1xuICBjb25zdCBvcHRpb25zID0gW107XG4gIGNvbnN0IHRhcmdldFNldCA9IG5ldyBTZXQoWyB0YXJnZXQuTkFNRSBdKTtcbiAgdGhpcy5fX2dldEFsbENvbXBpbGVPcHRpb25zKG9wdGlvbnMsIHRhcmdldFNldCwgZ2V0Q29tcGlsZU9wdGlvbnModGFyZ2V0KSk7XG4gIHRoaXMuX19nZXRBbGxDb21waWxlT3B0aW9ucyhvcHRpb25zLCB0YXJnZXRTZXQsIGdldFB1YmxpY0xpYnJhcmllcyh0YXJnZXQpKTtcbiAgcmV0dXJuIG9wdGlvbnMuZmxhdCgpO1xufVxuXG5UYXJnZXRDb2xsZWN0aW9uLnByb3RvdHlwZS5fX2dldExpbmtPcHRpb25zID0gZnVuY3Rpb24ob3B0aW9ucywgdGFyZ2V0U2V0LCBsaXN0KSB7XG4gIGZvciAoY29uc3QgaXRlciBvZiBsaXN0KSB7XG4gICAgaWYgKGl0ZXIgaW5zdGFuY2VvZiBJbnRlcmZhY2VUYXJnZXQpIHtcbiAgICAgIGlmICghdGFyZ2V0U2V0LmhhcyhpdGVyLnRhcmdldE5hbWUpKSB7XG4gICAgICAgIHRhcmdldFNldC5hZGQoaXRlci50YXJnZXROYW1lKTtcbiAgICAgICAgY29uc3QgdGFyZ2V0ID0gdGhpcy5nZXQoaXRlci50YXJnZXROYW1lKTtcbiAgICAgICAgdGhpcy5fX2dldExpbmtPcHRpb25zKG9wdGlvbnMsIHRhcmdldFNldCwgZ2V0UHVibGljTGlua09wdGlvbnModGFyZ2V0KSk7XG4gICAgICAgIHRoaXMuX19nZXRMaW5rT3B0aW9ucyhvcHRpb25zLCB0YXJnZXRTZXQsIGdldFB1YmxpY0xpYnJhcmllcyh0YXJnZXQpKTtcbiAgICAgIH1cbiAgICB9XG4gICAgZWxzZSBpZiAodHlwZW9mIGl0ZXIgPT09IFwic3RyaW5nXCIpIHtcbiAgICAgIGlmICghb3B0aW9ucy5pbmNsdWRlcyhpdGVyKSlcbiAgICAgICAgb3B0aW9ucy5wdXNoKGl0ZXIpO1xuICAgIH1cbiAgICBlbHNlIGlmIChBcnJheS5pc0FycmF5KGl0ZXIpKSB7XG4gICAgICAvLyBUT0RPOiBBZGQgY29tcGFyZSBmb3Igc2FtZSBhcnJheSBpbiBvcHRpb25zXG4gICAgICBvcHRpb25zLnB1c2goaXRlcik7XG4gICAgfVxuICAgIGVsc2Uge1xuICAgICAgdGhyb3cgbmV3IEVycm9yKGBOb3Qgc3VwcG9ydCBpbnN0YW5jZSAke2l0ZXJ9YCk7XG4gICAgfVxuICB9XG59XG5cblRhcmdldENvbGxlY3Rpb24ucHJvdG90eXBlLmFsbExpbmtPcHRpb25zT2YgPSBmdW5jdGlvbihwYXJhbXMpIHtcbiAgY29uc3QgdGFyZ2V0ID0gKHR5cGVvZiBwYXJhbXMgPT09IFwic3RyaW5nXCIpID8gdGhpcy5nZXQocGFyYW1zKSA6IHBhcmFtcztcbiAgY29uc3Qgb3B0aW9ucyA9IFtdO1xuICBjb25zdCB0YXJnZXRTZXQgPSBuZXcgU2V0KFsgdGFyZ2V0Lk5BTUUgXSk7XG4gIHRoaXMuX19nZXRMaW5rT3B0aW9ucyhvcHRpb25zLCB0YXJnZXRTZXQsIGdldExpbmtPcHRpb25zKHRhcmdldCkpO1xuICB0aGlzLl9fZ2V0TGlua09wdGlvbnMob3B0aW9ucywgdGFyZ2V0U2V0LCBnZXRQdWJsaWNMaWJyYXJpZXModGFyZ2V0KSk7XG4gIHJldHVybiBvcHRpb25zLmZsYXQoKTtcbn1cblxubW9kdWxlLmV4cG9ydHMgPSB7XG4gIFRhcmdldENvbGxlY3Rpb24sXG59O1xuIiwiXCJ1c2Ugc3RyaWN0XCI7XG5cbmNvbnN0IE5BTUUgICAgID0gU3ltYm9sKFwiTkFNRVwiKTtcbmNvbnN0IElOQ0xVREVTID0gU3ltYm9sKFwiSU5DTFVERVNcIik7XG5jb25zdCBTT1VSQ0VTICA9IFN5bWJvbChcIlNPVVJDRVNcIik7XG5jb25zdCBERUZJTkVTID0gU3ltYm9sKFwiREVGSU5FU1wiKTtcbmNvbnN0IENPTVBJTEVfT1BUSU9OUyA9IFN5bWJvbChcIkNPTVBJTEVfT1BUSU9OU1wiKTtcbmNvbnN0IExJTktfT1BUSU9OUyA9IFN5bWJvbChcIkxJTktfT1BUSU9OU1wiKTtcblxuZnVuY3Rpb24gVW5rbm93blRhcmdldChuYW1lKSB7XG4gIHRoaXNbTkFNRV0gPSBuYW1lO1xuICB0aGlzW0lOQ0xVREVTXSA9IFtdO1xuICB0aGlzW1NPVVJDRVNdID0gW107XG4gIHRoaXNbREVGSU5FU10gPSBbXTtcbiAgdGhpc1tDT01QSUxFX09QVElPTlNdID0gW107XG4gIHRoaXNbTElOS19PUFRJT05TXSA9IFtdO1xufVxuXG5Vbmtub3duVGFyZ2V0LmNyZWF0ZSA9IChuYW1lKSA9PiB7XG4gIHJldHVybiBPYmplY3Quc2VhbChuZXcgVW5rbm93blRhcmdldChuYW1lKSk7XG59XG5cblVua25vd25UYXJnZXQuZW5zdXJlSW5zdGFuY2UgPSAodmFsdWUpID0+IHtcbiAgaWYgKHZhbHVlIGluc3RhbmNlb2YgVW5rbm93blRhcmdldClcbiAgICByZXR1cm4gdmFsdWU7XG4gIHRocm93IG5ldyBFcnJvcihgVGhlICcke3ZhbHVlfScgaXMgbm90IGEgVW5rbm93blRhcmdldGApO1xufVxuXG5Vbmtub3duVGFyZ2V0LnByb3RvdHlwZSA9IE9iamVjdC5jcmVhdGUoT2JqZWN0LnByb3RvdHlwZSwge1xuICBjb25zdHJ1Y3Rvcjoge1xuICAgIHZhbHVlOiBVbmtub3duVGFyZ2V0LFxuICAgIGVudW1lcmFibGU6IGZhbHNlLFxuICB9LFxuICBOQU1FOiB7XG4gICAgZ2V0ICgpIHsgcmV0dXJuIHRoaXNbTkFNRV07IH0sXG4gICAgZW51bWVyYWJsZTogdHJ1ZSxcbiAgfSxcbiAgSU5DTFVERVM6IHtcbiAgICBnZXQgKCkgeyByZXR1cm4gdGhpc1tJTkNMVURFU107IH0sXG4gICAgZW51bWVyYWJsZTogdHJ1ZSxcbiAgfSxcbiAgU09VUkNFUzoge1xuICAgIGdldCAoKSB7IHJldHVybiB0aGlzW1NPVVJDRVNdOyB9LFxuICAgIGVudW1lcmFibGU6IHRydWUsXG4gIH0sXG4gIERFRklORVM6IHtcbiAgICBnZXQgKCkgeyByZXR1cm4gdGhpc1tERUZJTkVTXTsgfSxcbiAgICBlbnVtZXJhYmxlOiB0cnVlLFxuICB9LFxuICBDT01QSUxFX09QVElPTlM6IHtcbiAgICBnZXQgKCkgeyByZXR1cm4gdGhpc1tDT01QSUxFX09QVElPTlNdOyB9LFxuICAgIGVudW1lcmFibGU6IHRydWUsXG4gIH0sXG4gIExJTktfT1BUSU9OUzoge1xuICAgIGdldCAoKSB7IHJldHVybiB0aGlzW0xJTktfT1BUSU9OU107IH0sXG4gICAgZW51bWVyYWJsZTogdHJ1ZSxcbiAgfSxcbn0pO1xuXG5Vbmtub3duVGFyZ2V0LnByb3RvdHlwZS50b0pTT04gPSBmdW5jdGlvbigpIHtcbiAgY29uc3QganNvbiA9IHt9O1xuICBmb3IgKGNvbnN0IGtleSBpbiB0aGlzKVxuICAgIGpzb25ba2V5XSA9IHRoaXNba2V5XTtcbiAgcmV0dXJuIGpzb247XG59XG5cblVua25vd25UYXJnZXQucHJvdG90eXBlLnRvU3RyaW5nID0gZnVuY3Rpb24oKSB7XG4gIHJldHVybiBcIiR7XCIgKyB0aGlzW05BTUVdICsgXCJ9XCI7XG59XG5cbm1vZHVsZS5leHBvcnRzID0ge1xuICBVbmtub3duVGFyZ2V0LFxufTtcbiIsIlwidXNlIHN0cmljdFwiO1xuXG5jb25zdCBvcyA9IHJlcXVpcmUoXCJub2RlOm9zXCIpO1xuY29uc3QgcGF0aCA9IHJlcXVpcmUoXCJub2RlOnBhdGhcIik7XG5cbmNvbnN0IHsgY29weVZhbHVlIH0gPSByZXF1aXJlKFwiQC91dGlscy9QcmltaXRpdmVzXCIpO1xuY29uc3QgeyBmaWxlRXhpc3RzU3luYyB9ID0gcmVxdWlyZShcIkAvdXRpbHMvRmlsZVN5c3RlbVwiKTtcbmNvbnN0IHsgQWJzb2x1dGVQYXRoIH0gPSByZXF1aXJlKFwiQC9jb3JlL1BhdGhcIik7XG5jb25zdCB7IEludGVyZmFjZVRhcmdldCB9ID0gcmVxdWlyZShcIkAvY29yZS9JbnRlcmZhY2VUYXJnZXRcIik7XG5jb25zdCB7IEludGVyZmFjZVNjcmlwdCB9ID0gcmVxdWlyZShcIkAvY29yZS9JbnRlcmZhY2VTY3JpcHRcIik7XG5jb25zdCB7IEluc3RhbGxFbnRpdHkgfSA9IHJlcXVpcmUoXCIuL0luc3RhbGxFbnRpdHkuanNcIik7XG5jb25zdCB7IE9iamVjdExpYnJhcnksIFN0YXRpY0xpYnJhcnksIFNoYXJlZExpYnJhcnksIEV4ZWN1dGFibGUsIEJhc2VUYXJnZXQgfSA9IHJlcXVpcmUoXCIuL1RhcmdldC5qc1wiKTtcbmNvbnN0IHsgSW5jbHVkZURpcmVjdG9yeSB9ID0gcmVxdWlyZShcIkAvY29yZS9JbmNsdWRlRGlyZWN0b3J5XCIpO1xuY29uc3QgeyBTeXN0ZW1WYXJpYWJsZXMgfSA9IHJlcXVpcmUoXCIuL1N5c3RlbVZhcmlhYmxlcy5qc1wiKTtcbmNvbnN0IHsgQ3VzdG9tU2NyaXB0IH0gPSByZXF1aXJlKFwiQC9jb3JlL0N1c3RvbVNjcmlwdFwiKTtcblxuY29uc3QgcmVxdWlyZUltcGwgPSBldmFsKFwicmVxdWlyZVwiKTtcblxuY29uc3QgY3VycmVudEZ1bmN0aW9uTmFtZSA9ICgpID0+IHtcbiAgY29uc3Qgc3RhY2sgPSBuZXcgRXJyb3IoKS5zdGFjay5zcGxpdChcIlxcblwiKVsyXTtcbiAgcmV0dXJuIHN0YWNrLm1hdGNoKC9hdCAoXFxTKykvKT8uWzFdO1xufTtcblxuZnVuY3Rpb24gc2NvcGVWYWx1ZUFzUHJpbWl0aXZlcyhvKSB7XG4gIGlmICh0eXBlb2YgbyA9PT0gXCJ1bmRlZmluZWRcIilcbiAgICByZXR1cm4gbztcbiAgaWYgKHR5cGVvZiBvID09PSBcImJvb2xlYW5cIilcbiAgICByZXR1cm4gbztcbiAgaWYgKHR5cGVvZiBvID09PSBcIm51bWJlclwiKVxuICAgIHJldHVybiBvO1xuICBpZiAodHlwZW9mIG8gPT09IFwic3RyaW5nXCIpXG4gICAgcmV0dXJuIG87XG4gIGlmICh0eXBlb2YgbyA9PT0gXCJvYmplY3RcIikge1xuICAgIGlmICghbylcbiAgICAgIHJldHVybiBvO1xuICAgIGlmIChvIGluc3RhbmNlb2YgQWJzb2x1dGVQYXRoKSB7XG4gICAgICByZXR1cm4gby50b1N0cmluZygpO1xuICAgIH1cbiAgICBpZiAobyBpbnN0YW5jZW9mIEFycmF5KSB7XG4gICAgICBjb25zdCByZXN1bHQgPSBbXTtcbiAgICAgIGZvciAoY29uc3QgaSBvZiBvKVxuICAgICAgICByZXN1bHQucHVzaChzY29wZVZhbHVlQXNQcmltaXRpdmVzKGkpKTtcbiAgICAgIHJldHVybiByZXN1bHQ7XG4gICAgfVxuICAgIGlmIChvIGluc3RhbmNlb2YgT2JqZWN0KSB7XG4gICAgICBjb25zdCByZXN1bHQgPSB7fTtcbiAgICAgIGZvciAoY29uc3QgW2ssdl0gb2YgT2JqZWN0LmVudHJpZXMobykpXG4gICAgICAgIHJlc3VsdFtrXSA9IHNjb3BlVmFsdWVBc1ByaW1pdGl2ZXModik7XG4gICAgICByZXR1cm4gcmVzdWx0O1xuICAgIH1cbiAgfVxuICB0aHJvdyBuZXcgRXJyb3IoYFVua25vd24gaW5zdGFuY2Ugb2YgJHtvfWApO1xufVxuXG5jb25zdCBHTE9CQUwgPSBTeW1ib2woXCJHTE9CQUxcIik7XG5jb25zdCBTQ09QRSA9IFN5bWJvbChcIlNDT1BFXCIpO1xuXG5mdW5jdGlvbiBVc2VyQ29udGV4dChzY29wZSwgZ2xvYmFsKSB7XG4gIHRoaXNbU0NPUEVdID0gc2NvcGU7XG4gIHRoaXNbR0xPQkFMXSA9IGdsb2JhbDtcblxuICBjb25zdCBwcm9wcyA9IE9iamVjdC5nZXRPd25Qcm9wZXJ0eURlc2NyaXB0b3JzKFN5c3RlbVZhcmlhYmxlcy5wcm90b3R5cGUpO1xuICBmb3IgKGNvbnN0IFtuYW1lLCBkZXNjXSBvZiBPYmplY3QuZW50cmllcyhwcm9wcykpIHtcbiAgICBpZiAoZGVzYy5nZXQgfHwgZGVzYy5zZXQpIHtcbiAgICAgIGNvbnN0IG5ld0Rlc2MgPSB7IGVudW1lcmFibGU6IGRlc2MuZW51bWVyYWJsZSwgY29uZmlndXJhYmxlOiBmYWxzZSB9O1xuICAgICAgaWYgKGRlc2MuZ2V0KVxuICAgICAgICBuZXdEZXNjLmdldCA9IGZ1bmN0aW9uKCkgeyByZXR1cm4gdGhpc1tTQ09QRV1bbmFtZV07IH1cbiAgICAgIGlmIChkZXNjLnNldClcbiAgICAgICAgbmV3RGVzYy5zZXQgPSBmdW5jdGlvbih2YWx1ZSkgeyB0aGlzW1NDT1BFXVtuYW1lXSA9IHZhbHVlOyB9XG4gICAgICBPYmplY3QuZGVmaW5lUHJvcGVydHkodGhpcywgbmFtZSwgbmV3RGVzYyk7XG4gICAgfVxuICB9XG59XG5cblVzZXJDb250ZXh0LmNyZWF0ZSA9IChzY29wZSwgZ2xvYmFsKSA9PiB7XG4gIHJldHVybiBuZXcgVXNlckNvbnRleHQoc2NvcGUsIGdsb2JhbCk7XG59XG5cbmZ1bmN0aW9uIG1ha2VMb2dnZXIobG9nZ2VyRnVuYywgd2l0aFRhZykge1xuICBpZiAoIWxvZ2dlckZ1bmMpXG4gICAgcmV0dXJuICgpID0+IHt9O1xuICByZXR1cm4gZnVuY3Rpb24oKSB7XG4gICAgY29uc3QgbGlzdCA9IFtdO1xuICAgIGlmICh3aXRoVGFnKVxuICAgICAgbGlzdC5wdXNoKFwiW1wiICsgdGhpcy5fX2xvZ1RhZygpICsgXCJdXCIpO1xuICAgIGZvciAoY29uc3QgaXRlciBvZiBhcmd1bWVudHMpIHtcbiAgICAgIGlmIChpdGVyICYmIHR5cGVvZiBpdGVyID09PSBcIm9iamVjdFwiKVxuICAgICAgICBsaXN0LnB1c2goSlNPTi5zdHJpbmdpZnkoaXRlcikpO1xuICAgICAgZWxzZVxuICAgICAgICBsaXN0LnB1c2goaXRlci50b1N0cmluZygpKTtcbiAgICB9XG4gICAgbG9nZ2VyRnVuYyhsaXN0LmpvaW4oXCIgXCIpKTtcbiAgfTtcbn1cblxuVXNlckNvbnRleHQucHJvdG90eXBlLmxvZ0RlZmF1bHQgPSBtYWtlTG9nZ2VyKGNvbnNvbGUubG9nKTtcblVzZXJDb250ZXh0LnByb3RvdHlwZS5sb2dJbmZvID0gbWFrZUxvZ2dlcihjb25zb2xlLmluZm8pO1xuVXNlckNvbnRleHQucHJvdG90eXBlLmxvZ0RlYnVnID0gbWFrZUxvZ2dlcigvKmNvbnNvbGUuZGVidWcqLyk7XG5Vc2VyQ29udGV4dC5wcm90b3R5cGUubG9nV2FybiA9IG1ha2VMb2dnZXIoY29uc29sZS53YXJuKTtcblVzZXJDb250ZXh0LnByb3RvdHlwZS5sb2dFcnJvciA9IG1ha2VMb2dnZXIoY29uc29sZS5lcnJvcik7XG5cblVzZXJDb250ZXh0LnByb3RvdHlwZS5fX2xvZ1RhZyA9IGZ1bmN0aW9uKCkge1xuICBjb25zdCB0YWcgPSB0aGlzLlBST0pFQ1RfU09VUkNFX0RJUi5yZWxhdGl2ZSh0aGlzLlNPVVJDRV9ESVIpO1xuICByZXR1cm4gcGF0aC5wb3NpeC5qb2luKHRoaXMuUFJPSkVDVF9OQU1FLCB0YWcpO1xufVxuXG5Vc2VyQ29udGV4dC5wcm90b3R5cGUuX19zY29wZSA9IGZ1bmN0aW9uKCkge1xuICByZXR1cm4gdGhpc1tTQ09QRV07XG59XG5cblVzZXJDb250ZXh0LnByb3RvdHlwZS5nZXRDYWNoZVZhcmlhYmxlcyA9IGZ1bmN0aW9uKCkge1xuICB0aGlzLmxvZ0RlYnVnKGN1cnJlbnRGdW5jdGlvbk5hbWUoKSk7XG4gIGNvbnN0IHJlc3VsdCA9IHt9O1xuICBmb3IgKGNvbnN0IFtrZXksIGVudHJ5XSBvZiBPYmplY3QuZW50cmllcyh0aGlzW0dMT0JBTF0uQ0FDSEUpKSB7XG4gICAgY29uc3QgdmFsdWUgPSBjb3B5VmFsdWUodGhpc1trZXldKTtcbiAgICByZXN1bHRba2V5XSA9IHtcbiAgICAgIHR5cGU6IGNvcHlWYWx1ZShlbnRyeS50eXBlKSB8fCB0eXBlb2YgdmFsdWUsXG4gICAgICBkZXNjcmlwdGlvbjogZW50cnkuZGVzY3JpcHRpb24gfHwgXCJcIixcbiAgICAgIHZhbHVlLFxuICAgIH07XG4gIH1cbiAgcmV0dXJuIHJlc3VsdDtcbn1cblxuVXNlckNvbnRleHQucHJvdG90eXBlLmFkZENhY2hlVmFyaWFibGVzID0gZnVuY3Rpb24ocGFyYW1zKSB7XG4gIHRoaXMubG9nRGVidWcoY3VycmVudEZ1bmN0aW9uTmFtZSgpKTtcblxuICBpZiAodHlwZW9mIHBhcmFtcyA9PT0gXCJzdHJpbmdcIikge1xuICAgIGNvbnN0IHNjcmlwdHMgPSB0aGlzLlNPVVJDRV9ESVIucmVzb2x2ZShwYXJhbXMpO1xuICAgIHRoaXNbR0xPQkFMXS5sb2FkQ2FjaGVWYXJpYWJsZXMoc2NyaXB0cyk7XG4gIH1cbiAgZWxzZSBpZiAodHlwZW9mIHBhcmFtcyA9PT0gXCJvYmplY3RcIikge1xuICAgIHRoaXNbR0xPQkFMXS5hZGRDYWNoZVZhcmlhYmxlcyhwYXJhbXMpO1xuICB9XG4gIGVsc2Uge1xuICAgIHRocm93IG5ldyBFcnJvcihgVHlwZSAke3BhcmFtc30gY2Fubm90IHVzZSBmb3IgY2FjaGUgdmFyaWFibGVzYCk7XG4gIH1cblxuICB0aGlzW0dMT0JBTF0uY29weUNhY2hlVmFyaWFibGVzKHRoaXMpO1xufVxuXG5Vc2VyQ29udGV4dC5wcm90b3R5cGUuYWRkSW5jbHVkZURpcmVjdG9yaWVzID0gZnVuY3Rpb24oLi4uZGlycykge1xuICBmb3IgKGNvbnN0IGl0ZXIgb2YgZGlycy5mbGF0KDEpKSB7XG4gICAgdGhpcy5JTkNMVURFUy5wdXNoKEluY2x1ZGVEaXJlY3RvcnkuY3JlYXRlKGl0ZXIsIHRoaXMuU09VUkNFX0RJUikpO1xuICB9XG59XG5cblVzZXJDb250ZXh0LnByb3RvdHlwZS5hZGRTdWJkaXJlY3RvcnkgPSBmdW5jdGlvbihzb3VyY2VEaXIsIGJpbmFyeURpcikge1xuICB0aGlzLmxvZ0RlYnVnKGN1cnJlbnRGdW5jdGlvbk5hbWUoKSk7XG5cbiAgYmluYXJ5RGlyID0gYmluYXJ5RGlyIHx8IHBhdGguaXNBYnNvbHV0ZShzb3VyY2VEaXIpID8gdW5kZWZpbmVkIDogc291cmNlRGlyO1xuXG4gIGNvbnN0IFNPVVJDRV9ESVIgPSBwYXRoLmlzQWJzb2x1dGUoc291cmNlRGlyKSA/IEFic29sdXRlUGF0aC5jcmVhdGUoc291cmNlRGlyKSA6IHRoaXMuU09VUkNFX0RJUi5qb2luKHNvdXJjZURpcik7XG4gIGNvbnN0IEJJTkFSWV9ESVIgPSBwYXRoLmlzQWJzb2x1dGUoYmluYXJ5RGlyKSA/IEFic29sdXRlUGF0aC5jcmVhdGUoYmluYXJ5RGlyKSA6IHRoaXMuQklOQVJZX0RJUi5qb2luKGJpbmFyeURpcik7XG5cbiAgY29uc3QgbmV3U2NvcGUgPSB0aGlzW1NDT1BFXS5jbG9uZSgpO1xuXG4gIG5ld1Njb3BlLlNPVVJDRV9ESVIgPSBBYnNvbHV0ZVBhdGguY3JlYXRlKHRoaXNbR0xPQkFMXS5yZXNvbHZlU3ViZGlyZWN0b3J5KFNPVVJDRV9ESVIpLnRvU3RyaW5nKCkpO1xuICBuZXdTY29wZS5CSU5BUllfRElSID0gQklOQVJZX0RJUjtcbiAgXG4gIGNvbnN0IG5ld0NvbnRleCA9IFVzZXJDb250ZXh0LmNyZWF0ZShuZXdTY29wZSwgdGhpc1tHTE9CQUxdKTtcbiAgZm9yIChjb25zdCBba2V5LCB2YWxdIG9mIE9iamVjdC5lbnRyaWVzKHRoaXMpKSB7XG4gICAgaWYgKCFPYmplY3QuaGFzT3duKFN5c3RlbVZhcmlhYmxlcy5wcm90b3R5cGUsIGtleSkpXG4gICAgICBuZXdDb250ZXhba2V5XSA9IHZhbDtcbiAgfVxuXG4gIHRoaXNbR0xPQkFMXS5hZGRTdWJkaXJlY3RvcnkobmV3Q29udGV4KTtcbn1cblxuVXNlckNvbnRleHQucHJvdG90eXBlLmFkZEN1c3RvbVNjcmlwdCA9IGZ1bmN0aW9uKG5hbWUsIHBhcmFtcykge1xuICB0aGlzLmxvZ0RlYnVnKGN1cnJlbnRGdW5jdGlvbk5hbWUoKSwgbmFtZSk7XG5cbiAgY29uc3QgbmV3U2NvcGUgPSB0aGlzW1NDT1BFXS5jbG9uZSgpO1xuICBjb25zdCB0YXJnZXQgPSBDdXN0b21TY3JpcHQuY3JlYXRlKG5ld1Njb3BlLCBuYW1lLCBwYXJhbXMpO1xuICB0aGlzW0dMT0JBTF0uU0NSSVBUUy5zZXQobmFtZSwgdGFyZ2V0KTtcbiAgcmV0dXJuIHRhcmdldDtcbn1cblxuVXNlckNvbnRleHQucHJvdG90eXBlLnRhcmdldCA9IGZ1bmN0aW9uKG5hbWUpIHtcbiAgY29uc3QgdXRhcmdldCA9IHRoaXNbR0xPQkFMXS5nZXRVa25vd25UYXJnZXQobmFtZSk7XG4gIHJldHVybiBJbnRlcmZhY2VUYXJnZXQuY3JlYXRlKHRoaXNbU0NPUEVdLCB1dGFyZ2V0KTtcbn1cblxuVXNlckNvbnRleHQucHJvdG90eXBlLnNjcmlwdCA9IGZ1bmN0aW9uKG5hbWUpIHtcbiAgdGhpcy5sb2dEZWJ1ZyhjdXJyZW50RnVuY3Rpb25OYW1lKCksIG5hbWUpO1xuXG4gIGxldCBzY3JpcHQgPSB0aGlzW0dMT0JBTF0uSU5URVJGQUNFX1NDUklQVFNbbmFtZV07XG4gIGlmICghc2NyaXB0KSB7XG4gICAgc2NyaXB0ID0gSW50ZXJmYWNlU2NyaXB0LmNyZWF0ZShuYW1lKTtcbiAgICB0aGlzW0dMT0JBTF0uSU5URVJGQUNFX1NDUklQVFNbbmFtZV0gPSBzY3JpcHQ7XG4gIH1cblxuICByZXR1cm4gc2NyaXB0O1xufVxuXG5Vc2VyQ29udGV4dC5wcm90b3R5cGUuaW5zdGFsbCA9IGZ1bmN0aW9uKHZhbHVlLCBwYXJhbXMpIHtcbiAgZm9yIChjb25zdCBpdCBvZiBbIHZhbHVlIF0uZmxhdCgxKSkge1xuICAgIGNvbnN0IGl0ZXIgPSAoaXQgaW5zdGFuY2VvZiBCYXNlVGFyZ2V0KSA/IHRoaXMudGFyZ2V0KGl0Lk5BTUUpIDogaXQ7XG4gICAgY29uc3QgZW50aXR5ID0gSW5zdGFsbEVudGl0eS5jcmVhdGUodGhpcywgaXRlciwgcGFyYW1zKTtcbiAgICB0aGlzW0dMT0JBTF0uSU5TVEFMTF9MSVNULnB1c2goZW50aXR5KTtcbiAgfVxufVxuXG5Vc2VyQ29udGV4dC5wcm90b3R5cGUuYWRkU3RhdGljTGlicmFyeSA9IGZ1bmN0aW9uKG5hbWUsIC4uLnNvdXJjZXMpIHtcbiAgdGhpcy5sb2dEZWJ1ZyhjdXJyZW50RnVuY3Rpb25OYW1lKCksIG5hbWUpO1xuXG4gIGNvbnN0IHRhcmdldCA9IFN0YXRpY0xpYnJhcnkuY3JlYXRlKHRoaXNbU0NPUEVdLCBuYW1lKTtcbiAgdGFyZ2V0LmFkZFNvdXJjZXMoLi4uc291cmNlcyk7XG5cbiAgdGhpc1tHTE9CQUxdLlRBUkdFVFMuc2V0KG5hbWUsIHRhcmdldCk7XG4gIHJldHVybiB0YXJnZXQ7XG59XG5cblVzZXJDb250ZXh0LnByb3RvdHlwZS5hZGRPYmplY3RMaWJyYXJ5ID0gZnVuY3Rpb24obmFtZSwgLi4uc291cmNlcykge1xuICB0aGlzLmxvZ0RlYnVnKGN1cnJlbnRGdW5jdGlvbk5hbWUoKSwgbmFtZSk7XG5cbiAgY29uc3QgdGFyZ2V0ID0gT2JqZWN0TGlicmFyeS5jcmVhdGUodGhpc1tTQ09QRV0sIG5hbWUpO1xuICB0YXJnZXQuYWRkU291cmNlcyguLi5zb3VyY2VzKTtcblxuICB0aGlzW0dMT0JBTF0uVEFSR0VUUy5zZXQobmFtZSwgdGFyZ2V0KTtcbiAgcmV0dXJuIHRhcmdldDtcbn1cblxuVXNlckNvbnRleHQucHJvdG90eXBlLmFkZFNoYXJlZExpYnJhcnkgPSBmdW5jdGlvbihuYW1lLCAuLi5zb3VyY2VzKSB7XG4gIHRoaXMubG9nRGVidWcoY3VycmVudEZ1bmN0aW9uTmFtZSgpLCBuYW1lKTtcblxuICBjb25zdCB0YXJnZXQgPSBTaGFyZWRMaWJyYXJ5LmNyZWF0ZSh0aGlzW1NDT1BFXSwgbmFtZSk7XG4gIHRhcmdldC5hZGRTb3VyY2VzKC4uLnNvdXJjZXMpO1xuXG4gIHRoaXNbR0xPQkFMXS5UQVJHRVRTLnNldChuYW1lLCB0YXJnZXQpO1xuICByZXR1cm4gdGFyZ2V0O1xufVxuXG5Vc2VyQ29udGV4dC5wcm90b3R5cGUuYWRkRXhlY3V0YWJsZSA9IGZ1bmN0aW9uKG5hbWUsIC4uLnNvdXJjZXMpIHtcbiAgdGhpcy5sb2dEZWJ1ZyhjdXJyZW50RnVuY3Rpb25OYW1lKCksIG5hbWUpO1xuXG4gIGNvbnN0IHRhcmdldCA9IEV4ZWN1dGFibGUuY3JlYXRlKHRoaXNbU0NPUEVdLCBuYW1lKTtcbiAgdGFyZ2V0LmFkZFNvdXJjZXMoLi4uc291cmNlcyk7XG5cbiAgdGhpc1tHTE9CQUxdLlRBUkdFVFMuc2V0KG5hbWUsIHRhcmdldCk7XG4gIHJldHVybiB0YXJnZXQ7XG59XG5cblVzZXJDb250ZXh0LnByb3RvdHlwZS5maW5kUHJvZ3JhbSA9IGZ1bmN0aW9uKG5hbWUpIHtcbiAgdGhpcy5sb2dEZWJ1ZyhjdXJyZW50RnVuY3Rpb25OYW1lKCksIG5hbWUpO1xuXG4gIGlmIChvcy5wbGF0Zm9ybSgpID09PSBcIndpbjMyXCIgJiYgIW5hbWUuZW5kc1dpdGgoXCIuZXhlXCIpKVxuICAgIG5hbWUgKz0gXCIuZXhlXCI7XG5cbiAgY29uc3QgcGF0aHMgPSBwcm9jZXNzLmVudi5QQVRILnNwbGl0KHBhdGgucG9zaXguZGVsaW1pdGVyKTtcbiAgZm9yIChjb25zdCBpdGVyIG9mIHBhdGhzKSB7XG4gICAgY29uc3QgZmlsZW5hbWUgPSBwYXRoLnBvc2l4LnJlc29sdmUoaXRlciwgbmFtZSk7XG4gICAgaWYgKGZpbGVFeGlzdHNTeW5jKGZpbGVuYW1lKSlcbiAgICAgIHJldHVybiBmaWxlbmFtZTtcbiAgfVxuXG4gIHJldHVybiBudWxsO1xufVxuXG5Vc2VyQ29udGV4dC5wcm90b3R5cGUuZXhlY3V0ZVNjcmlwdCA9IGZ1bmN0aW9uKHNjcmlwdCwgb3B0aW9ucykge1xuICB0aGlzLmxvZ0RlYnVnKGN1cnJlbnRGdW5jdGlvbk5hbWUoKSwgc2NyaXB0KTtcbiAgY29uc3Qgc2NyaXB0UGF0aCA9IHRoaXMuU09VUkNFX0RJUi5yZXNvbHZlKHNjcmlwdCk7XG4gIGNvbnN0IG1vZHVsZSA9IHJlcXVpcmVJbXBsKHNjcmlwdFBhdGgudG9TdHJpbmcoKSk7XG4gIG1vZHVsZShzY29wZVZhbHVlQXNQcmltaXRpdmVzKG9wdGlvbnMpKTtcbn1cblxuVXNlckNvbnRleHQucHJvdG90eXBlLnRvSlNPTiA9IGZ1bmN0aW9uKCkge1xuICBjb25zdCBqc29uID0ge307XG4gIGZvciAoY29uc3Qga2V5IGluIHRoaXMpXG4gICAganNvbltrZXldID0gdGhpc1trZXldO1xuICByZXR1cm4ganNvbjtcbn1cblxubW9kdWxlLmV4cG9ydHMgPSB7XG4gIFVzZXJDb250ZXh0LFxufTtcbiIsIi8qXG4gKiBNSVQgTGljZW5zZVxuICpcbiAqIENvcHlyaWdodCAoYykgMjAyNSAgWXVyaWkgWWFrdWJpbiAoeXVyaWkueWFrdWJpbkBnbWFpbC5jb20pXG4gKlxuICogUGVybWlzc2lvbiBpcyBncmFudGVkIHRvIHVzZSwgY29weSwgbW9kaWZ5LCBhbmQgZGlzdHJpYnV0ZSB0aGlzIHNvZnR3YXJlXG4gKiB1bmRlciB0aGUgTUlUIExpY2Vuc2UuIFNlZSBMSUNFTlNFIGZpbGUgZm9yIGRldGFpbHMuXG4gKi9cblxuZXhwb3J0IGVudW0gQm9vbGVhblR5cGUge1xuICBPTiA9IFwiT05cIixcbiAgT0ZGID0gXCJPRkZcIixcbn07XG5cbi8vIEVudW0gcmVwcmVzZW50aW5nIHZhbHVlIHR5cGVzIHVzZWQgaW4gQ01ha2UgY2FjaGUgdmFyaWFibGVzXG5leHBvcnQgZW51bSBWYWx1ZVR5cGUge1xuICAvLyBSZXByZXNlbnRzIGEgZnVsbCBwYXRoIHRvIGEgZmlsZVxuICBGSUxFUEFUSCA9IFwiRklMRVBBVEhcIixcblxuICAvLyBSZXByZXNlbnRzIGEgcGF0aCB0byBhIGRpcmVjdG9yeVxuICBQQVRIID0gXCJQQVRIXCIsXG5cbiAgLy8gUmVwcmVzZW50cyBhIGJvb2xlYW4gdmFsdWUgKHRydWUvZmFsc2UpXG4gIEJPT0wgPSBcIkJPT0xcIixcblxuICAvLyBSZXByZXNlbnRzIGEgZ2VuZXJpYyBzdHJpbmcgdmFsdWVcbiAgU1RSSU5HID0gXCJTVFJJTkdcIixcbn07XG5cbi8vIEJ1aWxkVHlwZSByZXByZXNlbnRpbmcgY29tbW9uIENNYWtlIGJ1aWxkIHR5cGVzXG5leHBvcnQgZW51bSBCdWlsZFR5cGUge1xuICAvLyBEZWJ1ZyBidWlsZCB0eXBlOiBpbmNsdWRlcyBkZWJ1ZyBzeW1ib2xzLCBubyBvcHRpbWl6YXRpb25cbiAgRGVidWcgPSBcIkRlYnVnXCIsXG5cbiAgLy8gUmVsZWFzZSBidWlsZCB0eXBlOiBvcHRpbWl6ZWQgY29kZSwgbm8gZGVidWcgaW5mb1xuICBSZWxlYXNlID0gXCJSZWxlYXNlXCIsXG5cbiAgLy8gUmVsZWFzZSB3aXRoIGRlYnVnIGluZm86IG9wdGltaXplZCB3aXRoIGRlYnVnIHN5bWJvbHMgaW5jbHVkZWRcbiAgUmVsV2l0aERlYkluZm8gPSBcIlJlbFdpdGhEZWJJbmZvXCIsXG5cbiAgLy8gTWluaW11bSBzaXplIHJlbGVhc2U6IG9wdGltaXplZCBmb3Igc21hbGxlc3QgYmluYXJ5IHNpemVcbiAgTWluU2l6ZVJlbCA9IFwiTWluU2l6ZVJlbFwiLFxufTtcblxuLy8gVGhlIGRlZmF1bHQgbmFtZSBvZiB0aGUgbWFpbiBDTWFrZSBidWlsZCBjb25maWd1cmF0aW9uIGZpbGVcbmV4cG9ydCBjb25zdCBDTUFLRV9MSVNUU19UWFQgPSBcIkNNYWtlTGlzdHMudHh0XCI7XG4iLCIvKlxuICogTUlUIExpY2Vuc2VcbiAqXG4gKiBDb3B5cmlnaHQgKGMpIDIwMjUgIFl1cmlpIFlha3ViaW4gKHl1cmlpLnlha3ViaW5AZ21haWwuY29tKVxuICpcbiAqIFBlcm1pc3Npb24gaXMgZ3JhbnRlZCB0byB1c2UsIGNvcHksIG1vZGlmeSwgYW5kIGRpc3RyaWJ1dGUgdGhpcyBzb2Z0d2FyZVxuICogdW5kZXIgdGhlIE1JVCBMaWNlbnNlLiBTZWUgTElDRU5TRSBmaWxlIGZvciBkZXRhaWxzLlxuICovXG5cbmltcG9ydCB7IEJvb2xlYW5UeXBlIH0gZnJvbSBcIkAvY21ha2UvQ29uc3RhbnRzXCI7XG5cbmV4cG9ydCBmdW5jdGlvbiBjb252ZXJ0VG9WYWx1ZShvYmo6IGFueSk6IHN0cmluZyB7XG4gIGlmIChBcnJheS5pc0FycmF5KG9iaikpXG4gICAgcmV0dXJuIG9iai5tYXAoaSA9PiBjb252ZXJ0VG9WYWx1ZShpKSkuam9pbihcIjtcIik7XG5cbiAgaWYgKHR5cGVvZiBvYmogPT09IFwiYm9vbGVhblwiKVxuICAgIHJldHVybiBvYmogPyBCb29sZWFuVHlwZS5PTiA6IEJvb2xlYW5UeXBlLk9GRjtcblxuICByZXR1cm4gb2JqLnRvU3RyaW5nKCk7XG59XG4iLCIvKlxuICogTUlUIExpY2Vuc2VcbiAqXG4gKiBDb3B5cmlnaHQgKGMpIDIwMjUgIFl1cmlpIFlha3ViaW4gKHl1cmlpLnlha3ViaW5AZ21haWwuY29tKVxuICpcbiAqIFBlcm1pc3Npb24gaXMgZ3JhbnRlZCB0byB1c2UsIGNvcHksIG1vZGlmeSwgYW5kIGRpc3RyaWJ1dGUgdGhpcyBzb2Z0d2FyZVxuICogdW5kZXIgdGhlIE1JVCBMaWNlbnNlLiBTZWUgTElDRU5TRSBmaWxlIGZvciBkZXRhaWxzLlxuICovXG5cbmltcG9ydCBwYXRoIGZyb20gXCJub2RlOnBhdGhcIjtcbmltcG9ydCB1cmwgZnJvbSBcIm5vZGU6dXJsXCI7XG5cbmltcG9ydCB7IGVuc3VyZVN0cmluZyB9IGZyb20gXCJAL3V0aWxzL1N0cmljdFR5cGVcIjtcbmltcG9ydCB7IEFic29sdXRlUGF0aCB9IGZyb20gXCJAL2NvcmUvUGF0aFwiO1xuXG5jb25zdCBUQVJHRVRfU0NPUEUgPSBTeW1ib2woXCJUQVJHRVRfU0NPUEVcIik7XG5jb25zdCBOQU1FICAgICAgICAgPSBTeW1ib2woXCJOQU1FXCIpO1xuY29uc3QgRklMRSAgICAgICAgID0gU3ltYm9sKFwiRklMRVwiKTtcbmNvbnN0IElOUFVUICAgICAgICA9IFN5bWJvbChcIklOUFVUXCIpO1xuY29uc3QgT1VUUFVUICAgICAgID0gU3ltYm9sKFwiT1VUUFVUXCIpO1xuY29uc3QgUEFSQU1TICAgICAgID0gU3ltYm9sKFwiUEFSQU1TXCIpO1xuY29uc3QgUFJPUEVSVElFUyAgID0gU3ltYm9sKFwiUFJPUEVSVElFU1wiKTtcblxuY29uc3QgX19maWxlbmFtZSA9IHVybC5maWxlVVJMVG9QYXRoKGltcG9ydC5tZXRhLnVybCk7XG5jb25zdCBfX2Rpcm5hbWUgPSBwYXRoLmRpcm5hbWUoX19maWxlbmFtZSk7XG5cbmNvbnN0IFNZU1RFTV9TQ1JJUFRTX0RJUiA9IEFic29sdXRlUGF0aC5jcmVhdGUoX19kaXJuYW1lKS5yZXNvbHZlKFwiLi4vYml0bWFrZS9TeXN0ZW1TY3JpcHRzXCIpO1xuXG5leHBvcnQgY2xhc3MgQ3VzdG9tU2NyaXB0IHtcbiAgcHJpdmF0ZSBbVEFSR0VUX1NDT1BFXTogYW55O1xuICBwcml2YXRlIFtOQU1FXTogc3RyaW5nO1xuICBwcml2YXRlIFtGSUxFXTogQWJzb2x1dGVQYXRoO1xuICBwcml2YXRlIFtJTlBVVF06IEFic29sdXRlUGF0aCB8IG51bGw7XG4gIHByaXZhdGUgW09VVFBVVF06IEFic29sdXRlUGF0aDtcbiAgcHJpdmF0ZSBbUEFSQU1TXTogb2JqZWN0O1xuICBwcml2YXRlIFtQUk9QRVJUSUVTXTogYW55O1xuXG4gIHByaXZhdGUgY29uc3RydWN0b3Ioc2NvcGU6IGFueSwgbmFtZTogc3RyaW5nLCBwYXJhbXM6IGFueSkge1xuICAgIHRoaXNbVEFSR0VUX1NDT1BFXSA9IHNjb3BlO1xuICAgIHRoaXNbTkFNRV0gPSBlbnN1cmVTdHJpbmcobmFtZSk7XG4gIFxuICAgIGlmICghcGFyYW1zIHx8ICFwYXJhbXMuc2NyaXB0IHx8ICFwYXJhbXMub3V0cHV0KVxuICAgICAgdGhyb3cgbmV3IEVycm9yKGBVa25vd24gcGFyYW1zICR7SlNPTi5zdHJpbmdpZnkocGFyYW1zKX1gKTtcbiAgXG4gICAgaWYgKC9bLlxcL1xcXFxdLy50ZXN0KHBhcmFtcy5zY3JpcHQpKVxuICAgICAgdGhpc1tGSUxFXSA9IHNjb3BlLlNPVVJDRV9ESVIucmVzb2x2ZShwYXJhbXMuc2NyaXB0KTtcbiAgICBlbHNlXG4gICAgICB0aGlzW0ZJTEVdID0gU1lTVEVNX1NDUklQVFNfRElSLmpvaW4ocGFyYW1zLnNjcmlwdCArIFwiLmpzXCIpO1xuICBcbiAgICB0aGlzW0lOUFVUXSA9IHBhcmFtcy5pbnB1dCB8fCBudWxsO1xuICAgIHRoaXNbT1VUUFVUXSA9IHBhcmFtcy5vdXRwdXQ7XG4gICAgdGhpc1tQQVJBTVNdID0gcGFyYW1zO1xuICAgIHRoaXNbUFJPUEVSVElFU10gPSB7fTtcbiAgfVxuXG4gIHB1YmxpYyBzdGF0aWMgY3JlYXRlKHNjb3BlOiBhbnksIG5hbWU6IHN0cmluZywgcGFyYW1zOiBhbnkpIHtcbiAgICByZXR1cm4gT2JqZWN0LnNlYWwobmV3IEN1c3RvbVNjcmlwdChzY29wZSwgbmFtZSwgcGFyYW1zKSk7XG4gIH1cblxuICBwdWJsaWMgYWRkUHJvcGVydHkoa2V5OiBzdHJpbmcsIC4uLnZhbHM6IGFueVtdKSB7XG4gICAgbGV0IHByb3BlcnR5ID0gdGhpc1tQUk9QRVJUSUVTXVtrZXldO1xuICAgIGlmICghcHJvcGVydHkpIHtcbiAgICAgIHByb3BlcnR5ID0gW107XG4gICAgICB0aGlzW1BST1BFUlRJRVNdW2tleV0gPSBwcm9wZXJ0eTtcbiAgICB9XG4gICAgdmFscy5mb3JFYWNoKHYgPT4gcHJvcGVydHkucHVzaCh2KSk7XG4gIH1cblxuICBwdWJsaWMgZ2V0IE5BTUUoKTogc3RyaW5nIHtcbiAgICByZXR1cm4gdGhpc1tOQU1FXTtcbiAgfVxuXG4gIHB1YmxpYyBnZXQgVEFSR0VUX1NDT1BFKCk6IGFueSB7XG4gICAgcmV0dXJuIHRoaXNbVEFSR0VUX1NDT1BFXTtcbiAgfVxuXG4gIHB1YmxpYyBnZXQgRklMRSgpOiBBYnNvbHV0ZVBhdGgge1xuICAgIHJldHVybiB0aGlzW0ZJTEVdO1xuICB9XG5cbiAgcHVibGljIGdldCBJTlBVVCgpOiBBYnNvbHV0ZVBhdGggfCBudWxsIHtcbiAgICByZXR1cm4gdGhpc1tJTlBVVF07XG4gIH1cblxuICBwdWJsaWMgc2V0IElOUFVUKHZhbHVlOiBBYnNvbHV0ZVBhdGggfCBzdHJpbmcpIHtcbiAgICB0aGlzW0lOUFVUXSA9IHRoaXNbVEFSR0VUX1NDT1BFXS5TT1VSQ0VfRElSLnJlc29sdmUodmFsdWUpO1xuICB9XG5cbiAgcHVibGljIGdldCBPVVRQVVQoKTogQWJzb2x1dGVQYXRoIHtcbiAgICByZXR1cm4gdGhpc1tPVVRQVVRdO1xuICB9XG5cbiAgcHVibGljIHNldCBPVVRQVVQodmFsdWU6IEFic29sdXRlUGF0aCB8IHN0cmluZykge1xuICAgIHRoaXNbT1VUUFVUXSA9IEFic29sdXRlUGF0aC5jcmVhdGUodmFsdWUpO1xuICB9XG5cbiAgcHVibGljIGdldCBQQVJBTVMoKTogb2JqZWN0IHtcbiAgICByZXR1cm4gdGhpc1tQQVJBTVNdO1xuICB9XG5cbiAgcHVibGljIHNldCBQQVJBTVModmFsdWU6IG9iamVjdCkge1xuICAgIHRoaXNbUEFSQU1TXSA9IHZhbHVlO1xuICB9XG5cbiAgcHVibGljIGdldCBQUk9QRVJUSUVTKCkge1xuICAgIHJldHVybiB0aGlzW1BST1BFUlRJRVNdO1xuICB9XG5cbiAgcHVibGljIHRvU3RyaW5nKCk6IHN0cmluZyB7XG4gICAgcmV0dXJuIHRoaXNbTkFNRV0udG9TdHJpbmcoKTtcbiAgfVxuXG4gIHB1YmxpYyB0b0pTT04oKTogb2JqZWN0IHtcbiAgICByZXR1cm4ge1xuICAgICAgTkFNRTogdGhpcy5OQU1FLFxuICAgICAgVEFSR0VUX1NDT1BFOiB0aGlzLlRBUkdFVF9TQ09QRSxcbiAgICAgIEZJTEU6IHRoaXMuRklMRSxcbiAgICAgIElOUFVUOiB0aGlzLklOUFVULFxuICAgICAgT1VUUFVUOiB0aGlzLk9VVFBVVCxcbiAgICAgIFBBUkFNUzogdGhpcy5QQVJBTVMsXG4gICAgICBQUk9QRVJUSUVTOiB0aGlzLlBST1BFUlRJRVMsXG4gICAgfVxuICB9XG59O1xuIiwiLypcbiAqIE1JVCBMaWNlbnNlXG4gKlxuICogQ29weXJpZ2h0IChjKSAyMDI1ICBZdXJpaSBZYWt1YmluICh5dXJpaS55YWt1YmluQGdtYWlsLmNvbSlcbiAqXG4gKiBQZXJtaXNzaW9uIGlzIGdyYW50ZWQgdG8gdXNlLCBjb3B5LCBtb2RpZnksIGFuZCBkaXN0cmlidXRlIHRoaXMgc29mdHdhcmVcbiAqIHVuZGVyIHRoZSBNSVQgTGljZW5zZS4gU2VlIExJQ0VOU0UgZmlsZSBmb3IgZGV0YWlscy5cbiAqL1xuXG5pbXBvcnQgcGF0aCBmcm9tIFwibm9kZTpwYXRoXCI7XG5pbXBvcnQgZnMgZnJvbSBcIm5vZGU6ZnNcIjtcbmltcG9ydCB7IHNwYXduU3luYyB9IGZyb20gXCJub2RlOmNoaWxkX3Byb2Nlc3NcIjtcblxuaW1wb3J0IHsgaW1wb3J0TW9kdWxlIH0gZnJvbSBcIkAvdXRpbHMvTW9kdWxlXCI7XG5cbmltcG9ydCBjb25maWd1cmVfZmlsZSBmcm9tIFwiQC9iaXRtYWtlL1N5c3RlbVNjcmlwdHMvY29uZmlndXJlX2ZpbGUuanNcIjtcbmltcG9ydCBpbnN0YWxsX3NjcmlwdCBmcm9tIFwiQC9iaXRtYWtlL1N5c3RlbVNjcmlwdHMvaW5zdGFsbF9zY3JpcHQuanNcIjtcblxuY29uc3QgRU5UUklFUyA9IFN5bWJvbChcIkVOVFJJRVNcIik7XG5cbmVudW0gR29hbFR5cGUge1xuICBTQ1JJUFQgPSBcInNjcmlwdFwiLFxuICBFWEVDID0gXCJleGVjXCIsXG4gIFRBUkdFVCA9IFwidGFyZ2V0XCIsXG59O1xuXG5pbnRlcmZhY2UgQmFzZUdvYWwge1xuICBuYW1lOiBzdHJpbmc7XG4gIHR5cGU6IEdvYWxUeXBlO1xuICBkZXBlbmRzOiBBcnJheTxzdHJpbmc+O1xuICBtc2c6IHN0cmluZztcbiAgb3V0cHV0OiBzdHJpbmc7XG59O1xuXG5pbnRlcmZhY2UgU2NyaXB0R29hbCBleHRlbmRzIEJhc2VHb2FsIHtcbiAgc2NyaXB0OiBzdHJpbmc7XG4gIHBhcmFtczogYW55O1xufTtcblxuaW50ZXJmYWNlIEV4ZWNHb2FsIGV4dGVuZHMgQmFzZUdvYWwge1xuICBjb21tYW5kOiBzdHJpbmc7XG4gIGFyZ3M6IEFycmF5PHN0cmluZz47XG4gIGN3ZDogc3RyaW5nO1xufTtcblxuZXhwb3J0IGNsYXNzIEdvYWxDb2xsZWN0aW9uIHtcbiAgcHJpdmF0ZSBbRU5UUklFU106IEFycmF5PEJhc2VHb2FsPjtcblxuICBwcml2YXRlIGNvbnN0cnVjdG9yKCkge1xuICAgIHRoaXNbRU5UUklFU10gPSBuZXcgQXJyYXk8QmFzZUdvYWw+O1xuICB9XG5cbiAgcHVibGljIGdldCBFTlRSSUVTKCkge1xuICAgIHJldHVybiB0aGlzW0VOVFJJRVNdO1xuICB9XG5cbiAgcHVibGljIHN0YXRpYyBjcmVhdGUoKSB7XG4gICAgcmV0dXJuIE9iamVjdC5zZWFsKG5ldyBHb2FsQ29sbGVjdGlvbik7XG4gIH1cblxuICBwdWJsaWMgZmluZFNjcmlwdEJ5T3V0cHV0KG91dHB1dDogc3RyaW5nKTogQmFzZUdvYWwgfCB1bmRlZmluZWQge1xuICAgIGlmICghb3V0cHV0KVxuICAgICAgcmV0dXJuIHVuZGVmaW5lZDtcbiAgICByZXR1cm4gdGhpc1tFTlRSSUVTXS5maW5kKChpKSA9PiBpLnR5cGUgPT09IEdvYWxUeXBlLlNDUklQVCAmJiBpLm91dHB1dCA9PT0gb3V0cHV0KTtcbiAgfVxuXG4gIHB1YmxpYyBoYXNTY3JpcHRCeU91dHB1dChvdXRwdXQ6IHN0cmluZyk6IGJvb2xlYW4ge1xuICAgIHJldHVybiAhIXRoaXMuZmluZFNjcmlwdEJ5T3V0cHV0KG91dHB1dCk7XG4gIH1cblxuICBwdWJsaWMgYWRkU2NyaXB0KHNjcmlwdDogc3RyaW5nLCBuYW1lOiBzdHJpbmcsIGRlcGVuZHM6IEFycmF5PHN0cmluZz4sIG91dHB1dDogc3RyaW5nLCBwYXJhbXM6IGFueSwgbXNnOiBzdHJpbmcpIHtcbiAgICBpZiAodGhpcy5oYXNTY3JpcHRCeU91dHB1dChvdXRwdXQudG9TdHJpbmcoKSkpXG4gICAgICB0aHJvdyBuZXcgRXJyb3IoYE91dHB1dCBcIiR7b3V0cHV0fVwiIGV4aXN0c2ApO1xuICAgIHRoaXNbRU5UUklFU10ucHVzaCh7IG5hbWUsIHR5cGU6IEdvYWxUeXBlLlNDUklQVCwgc2NyaXB0LCBvdXRwdXQsIGRlcGVuZHMsIHBhcmFtcywgbXNnIH0gYXMgU2NyaXB0R29hbCk7XG4gIH1cblxuICBwdWJsaWMgYWRkRXhlYyhvdXRwdXQ6IHN0cmluZywgZGVwZW5kczogQXJyYXk8c3RyaW5nPiwgY29tbWFuZDogc3RyaW5nLCBhcmdzOiBBcnJheTxzdHJpbmc+LCBjd2Q6IHN0cmluZywgbXNnOiBzdHJpbmcpIHtcbiAgICB0aGlzW0VOVFJJRVNdLnB1c2goeyBuYW1lOiBcIlwiLCB0eXBlOiBHb2FsVHlwZS5FWEVDLCBkZXBlbmRzLCBvdXRwdXQsIGNvbW1hbmQsIGFyZ3MsIGN3ZCwgbXNnIH0gYXMgRXhlY0dvYWwpO1xuICB9XG5cbiAgcHVibGljIGFkZFRhcmdldChuYW1lOiBzdHJpbmcsIGRlcGVuZHM6IEFycmF5PHN0cmluZz4sIG1zZzogc3RyaW5nKSB7XG4gICAgdGhpc1tFTlRSSUVTXS5wdXNoKHsgbmFtZSwgdHlwZTogR29hbFR5cGUuVEFSR0VULCBkZXBlbmRzLCBtc2csIG91dHB1dDogXCJcIiB9KTtcbiAgfVxuXG4gIHB1YmxpYyBnZXRUYXJnZXQobmFtZTogc3RyaW5nKTogQmFzZUdvYWwgfCB1bmRlZmluZWQge1xuICAgIHJldHVybiB0aGlzW0VOVFJJRVNdLmZpbmQoKGkpID0+IGkudHlwZSA9PT0gR29hbFR5cGUuVEFSR0VUICYmIGkubmFtZSA9PT0gbmFtZSk7XG4gIH1cblxuICBwcml2YXRlIGFkZFRhcmdldExpc3RJbXBsKG5hbWU6IHN0cmluZywgcmVzdWx0OiBBcnJheTxCYXNlR29hbD4pIHtcbiAgICBpZiAocmVzdWx0LmZpbmQoaSA9PiBpLm5hbWUgPT09IG5hbWUgfHwgaS5vdXRwdXQgPT09IG5hbWUpKSB7XG4gICAgICByZXR1cm47XG4gICAgfVxuICBcbiAgICBjb25zdCBnb2FsID0gdGhpc1tFTlRSSUVTXS5maW5kKGkgPT4gaS5uYW1lID09PSBuYW1lIHx8IGkub3V0cHV0ID09PSBuYW1lKTtcbiAgICBpZiAoIWdvYWwpIHtcbiAgICAgIHJldHVybjtcbiAgICB9XG4gIFxuICAgIGZvciAoY29uc3QgaXRlciBvZiBnb2FsLmRlcGVuZHMpIHtcbiAgICAgIHRoaXMuYWRkVGFyZ2V0TGlzdEltcGwoaXRlci50b1N0cmluZygpLCByZXN1bHQpO1xuICAgIH1cbiAgXG4gICAgcmVzdWx0LnB1c2goZ29hbCk7XG4gIH1cbiAgXG4gIHB1YmxpYyBnZXRUYXJnZXRMaXN0KG5hbWU6c3RyaW5nKSB7XG4gICAgY29uc3QgcmVzdWx0ID0gbmV3IEFycmF5PEJhc2VHb2FsPjtcbiAgICB0aGlzLmFkZFRhcmdldExpc3RJbXBsKG5hbWUsIHJlc3VsdCk7XG4gICAgcmV0dXJuIHJlc3VsdDtcbiAgfVxuICBcbiAgcHVibGljIHRvSlNPTigpIHtcbiAgICByZXR1cm4gdGhpc1tFTlRSSUVTXTtcbiAgfVxuXG4gIHB1YmxpYyBzdGF0aWMgYXN5bmMgYnVpbGRHb2Fscyhjb2xsZWN0aW9uOiBBcnJheTxCYXNlR29hbD4pIHtcbiAgICBsZXQgbXNnQ291bnQgPSAwO1xuICAgIGZvciAoY29uc3QgaXRlciBvZiBjb2xsZWN0aW9uKVxuICAgICAgbXNnQ291bnQgKz0gaXRlci5tc2cgPyAxIDogMDtcbiAgXG4gICAgbGV0IG1zZ0luZGV4ID0gMDtcbiAgICBmb3IgKGNvbnN0IGdvYWwgb2YgY29sbGVjdGlvbikge1xuICAgICAgY29uc3QgeyB0eXBlLCBtc2cgfSA9IGdvYWw7XG4gICAgICBpZiAobXNnKSB7XG4gICAgICAgIGNvbnN0IHJlbGF0aW9uT2ZMZW5ndGggPSBNYXRoLnJvdW5kKCgrK21zZ0luZGV4IC8gbXNnQ291bnQpICogMTAwKTtcbiAgICAgICAgY29uc3QgcGVyY2VudCA9IFwiW1wiICsgcmVsYXRpb25PZkxlbmd0aC50b1N0cmluZygpLnBhZFN0YXJ0KDMsIFwiIFwiKSArIFwiJV0gXCI7XG4gICAgICAgIGNvbnNvbGUuaW5mbyhwZXJjZW50ICsgbXNnKTtcbiAgICAgIH1cbiAgICAgIGlmICh0eXBlID09PSBHb2FsVHlwZS5TQ1JJUFQpIHtcbiAgICAgICAgY29uc3QgeyBzY3JpcHQsIHBhcmFtcyB9ID0gZ29hbCBhcyBTY3JpcHRHb2FsO1xuICAgICAgICBsZXQgbW9kdWxlO1xuICAgICAgICBpZiAoc2NyaXB0LnRvU3RyaW5nKCkgPT09IHBhdGgucG9zaXguam9pbihfX2Rpcm5hbWUsIFwiU3lzdGVtU2NyaXB0cy9jb25maWd1cmVfZmlsZS5qc1wiKSlcbiAgICAgICAgICBtb2R1bGUgPSBjb25maWd1cmVfZmlsZTtcbiAgICAgICAgZWxzZSBpZiAoc2NyaXB0LnRvU3RyaW5nKCkgPT09IHBhdGgucG9zaXguam9pbihfX2Rpcm5hbWUsIFwiU3lzdGVtU2NyaXB0cy9pbnN0YWxsX3NjcmlwdC5qc1wiKSlcbiAgICAgICAgICBtb2R1bGUgPSBpbnN0YWxsX3NjcmlwdDtcbiAgICAgICAgZWxzZVxuICAgICAgICAgIG1vZHVsZSA9IChhd2FpdCBpbXBvcnRNb2R1bGUoc2NyaXB0LnRvU3RyaW5nKCkpKS5kZWZhdWx0O1xuICAgICAgICBjb25zdCByZXN1bHQgPSBtb2R1bGUocGFyYW1zKTtcbiAgICAgICAgaWYgKHJlc3VsdCBpbnN0YW5jZW9mIFByb21pc2UpIHtcbiAgICAgICAgICBhd2FpdCByZXN1bHQ7XG4gICAgICAgIH1cbiAgICAgIH1cbiAgICAgIGVsc2UgaWYgKHR5cGUgPT09IEdvYWxUeXBlLkVYRUMpIHtcbiAgICAgICAgY29uc3QgeyBjb21tYW5kLCBhcmdzLCBjd2QsIG91dHB1dCB9ID0gZ29hbCBhcyBFeGVjR29hbDtcbiAgICAgICAgZnMubWtkaXJTeW5jKHBhdGgucG9zaXguZGlybmFtZShvdXRwdXQpLCB7IHJlY3Vyc2l2ZTogdHJ1ZSB9KTtcbiAgICAgICAgY29uc3QgcmVzdWx0ID0gc3Bhd25TeW5jKGNvbW1hbmQsIGFyZ3MsIHsgY3dkLCBlbmNvZGluZzogXCJ1dGYtOFwiIH0pO1xuICAgICAgICBpZiAocmVzdWx0LnN0YXR1cykge1xuICAgICAgICAgIGNvbnNvbGUuaW5mbyhcImNkIFwiICsgY3dkKTtcbiAgICAgICAgICBsZXQgY21kID0gYXJncy5qb2luKFwiIFwiKTtcbiAgICAgICAgICBjbWQgPSBjb21tYW5kICsgKGNtZCA/IFwiIFwiIDogXCJcIikgKyBjbWQ7XG4gICAgICAgICAgY29uc29sZS5pbmZvKGNtZCk7XG4gICAgICAgICAgY29uc29sZS5pbmZvKFwiXCIpO1xuICBcbiAgICAgICAgICBjb25zb2xlLmVycm9yKHJlc3VsdC5zdGRlcnIpO1xuICBcbiAgICAgICAgICB0aHJvdyBuZXcgRXJyb3IoXCJTdGF0dXMgXCIgKyByZXN1bHQuc3RhdHVzKTtcbiAgICAgICAgfVxuICAgICAgfVxuICAgICAgZWxzZSBpZiAodHlwZSA9PT0gR29hbFR5cGUuVEFSR0VUKSB7XG4gICAgICB9XG4gICAgfVxuICB9XG59O1xuIiwiLypcbiAqIE1JVCBMaWNlbnNlXG4gKlxuICogQ29weXJpZ2h0IChjKSAyMDI1ICBZdXJpaSBZYWt1YmluICh5dXJpaS55YWt1YmluQGdtYWlsLmNvbSlcbiAqXG4gKiBQZXJtaXNzaW9uIGlzIGdyYW50ZWQgdG8gdXNlLCBjb3B5LCBtb2RpZnksIGFuZCBkaXN0cmlidXRlIHRoaXMgc29mdHdhcmVcbiAqIHVuZGVyIHRoZSBNSVQgTGljZW5zZS4gU2VlIExJQ0VOU0UgZmlsZSBmb3IgZGV0YWlscy5cbiAqL1xuXG5jb25zdCBOQU1FID0gU3ltYm9sKFwiTkFNRVwiKTtcbmNvbnN0IFBBVEggPSBTeW1ib2woXCJQQVRIXCIpO1xuXG5leHBvcnQgY2xhc3MgSW5jbHVkZURpcmVjdG9yeSB7XG4gIHByaXZhdGUgW05BTUVdOiBhbnk7XG4gIHByaXZhdGUgW1BBVEhdOiBhbnk7XG5cbiAgcHJpdmF0ZSBjb25zdHJ1Y3RvcihkaXJuYW1lOiBhbnksIGJhc2VEaXI6IGFueSkge1xuICAgIHRoaXNbTkFNRV0gPSBkaXJuYW1lLnRvU3RyaW5nKCk7XG4gICAgdGhpc1tQQVRIXSA9IGJhc2VEaXIucmVzb2x2ZShkaXJuYW1lKTtcbiAgfVxuXG4gIHB1YmxpYyBzdGF0aWMgY3JlYXRlKGRpcm5hbWU6IGFueSwgYmFzZURpcjogYW55KSB7XG4gICAgcmV0dXJuIE9iamVjdC5zZWFsKG5ldyBJbmNsdWRlRGlyZWN0b3J5KGRpcm5hbWUsIGJhc2VEaXIpKTtcbiAgfVxuXG4gIGdldCBOQU1FKCkge1xuICAgIHJldHVybiB0aGlzW05BTUVdO1xuICB9XG5cbiAgZ2V0IFBBVEgoKSB7XG4gICAgcmV0dXJuIHRoaXNbUEFUSF07XG4gIH1cblxuICB0b1N0cmluZygpIHtcbiAgICByZXR1cm4gdGhpc1tQQVRIXS50b1N0cmluZygpO1xuICB9XG5cbiAgdG9KU09OKCk6IG9iamVjdCB7XG4gICAgcmV0dXJuIHtcbiAgICAgIE5BTUU6IHRoaXMuTkFNRSxcbiAgICAgIFBBVEg6IHRoaXMuUEFUSCxcbiAgICB9XG4gIH1cbn07XG4iLCIvKlxuICogTUlUIExpY2Vuc2VcbiAqXG4gKiBDb3B5cmlnaHQgKGMpIDIwMjUgIFl1cmlpIFlha3ViaW4gKHl1cmlpLnlha3ViaW5AZ21haWwuY29tKVxuICpcbiAqIFBlcm1pc3Npb24gaXMgZ3JhbnRlZCB0byB1c2UsIGNvcHksIG1vZGlmeSwgYW5kIGRpc3RyaWJ1dGUgdGhpcyBzb2Z0d2FyZVxuICogdW5kZXIgdGhlIE1JVCBMaWNlbnNlLiBTZWUgTElDRU5TRSBmaWxlIGZvciBkZXRhaWxzLlxuICovXG5cbmNvbnN0IE5BTUUgPSBTeW1ib2woXCJOQU1FXCIpO1xuXG5leHBvcnQgY2xhc3MgSW50ZXJmYWNlSW5jbHVkZXMge1xuICBwcml2YXRlIFtOQU1FXTogc3RyaW5nO1xuXG4gIHByaXZhdGUgY29uc3RydWN0b3IobmFtZTogc3RyaW5nKSB7XG4gICAgdGhpc1tOQU1FXSA9IG5hbWU7XG4gIH1cblxuICBwdWJsaWMgZ2V0IHRhcmdldE5hbWUoKSB7XG4gICAgcmV0dXJuIHRoaXNbTkFNRV07XG4gIH1cblxuICBwdWJsaWMgdG9TdHJpbmcoKTogc3RyaW5nIHtcbiAgICByZXR1cm4gXCIke1wiICsgdGhpc1tOQU1FXSArIFwiLmluY2x1ZGVzfVwiO1xuICB9XG5cbiAgcHVibGljIHRvSlNPTigpIHtcbiAgICByZXR1cm4gdGhpcy50b1N0cmluZygpO1xuICB9XG5cbiAgcHVibGljIHN0YXRpYyBjcmVhdGUobmFtZTogc3RyaW5nKSB7XG4gICAgcmV0dXJuIE9iamVjdC5zZWFsKG5ldyBJbnRlcmZhY2VJbmNsdWRlcyhuYW1lKSk7XG4gIH1cblxuICBwdWJsaWMgc3RhdGljIGVuc3VyZUluc3RhbmNlKHZhbHVlOiBhbnkpIHtcbiAgICBpZiAodmFsdWUgaW5zdGFuY2VvZiBJbnRlcmZhY2VJbmNsdWRlcylcbiAgICAgIHJldHVybiB2YWx1ZTtcbiAgICB0aHJvdyBuZXcgRXJyb3IoYFRoZSAnJHt2YWx1ZX0nIGlzIG5vdCBhIEludGVyZmFjZUluY2x1ZGVzYCk7XG4gIH1cbn07XG4iLCIvKlxuICogTUlUIExpY2Vuc2VcbiAqXG4gKiBDb3B5cmlnaHQgKGMpIDIwMjUgIFl1cmlpIFlha3ViaW4gKHl1cmlpLnlha3ViaW5AZ21haWwuY29tKVxuICpcbiAqIFBlcm1pc3Npb24gaXMgZ3JhbnRlZCB0byB1c2UsIGNvcHksIG1vZGlmeSwgYW5kIGRpc3RyaWJ1dGUgdGhpcyBzb2Z0d2FyZVxuICogdW5kZXIgdGhlIE1JVCBMaWNlbnNlLiBTZWUgTElDRU5TRSBmaWxlIGZvciBkZXRhaWxzLlxuICovXG5cbmNvbnN0IE5BTUUgPSBTeW1ib2woXCJOQU1FXCIpO1xuXG5leHBvcnQgY2xhc3MgSW50ZXJmYWNlT2JqZWN0cyB7XG4gIHByaXZhdGUgW05BTUVdOiBzdHJpbmc7XG5cbiAgcHJpdmF0ZSBjb25zdHJ1Y3RvcihuYW1lOiBzdHJpbmcpIHtcbiAgICB0aGlzW05BTUVdID0gbmFtZTtcbiAgfVxuXG4gIHB1YmxpYyBzdGF0aWMgY3JlYXRlKG5hbWU6IHN0cmluZykge1xuICAgIHJldHVybiBPYmplY3Quc2VhbChuZXcgSW50ZXJmYWNlT2JqZWN0cyhuYW1lKSk7XG4gIH1cblxuICBwdWJsaWMgc3RhdGljIGVuc3VyZUluc3RhbmNlKHZhbHVlOiBhbnkpOiBJbnRlcmZhY2VPYmplY3RzIHtcbiAgICBpZiAodmFsdWUgaW5zdGFuY2VvZiBJbnRlcmZhY2VPYmplY3RzKVxuICAgICAgcmV0dXJuIHZhbHVlO1xuICAgIHRocm93IG5ldyBFcnJvcihgVGhlICcke3ZhbHVlfScgaXMgbm90IGEgSW50ZXJmYWNlT2JqZWN0c2ApO1xuICB9XG5cbiAgcHVibGljIGdldCB0YXJnZXROYW1lKCk6IHN0cmluZyB7XG4gICAgcmV0dXJuIHRoaXNbTkFNRV07XG4gIH1cblxuICBwdWJsaWMgdG9TdHJpbmcoKTogc3RyaW5nIHtcbiAgICByZXR1cm4gXCIke1wiICsgdGhpc1tOQU1FXSArIFwiLm9iamVjdHN9XCI7XG4gIH1cblxuICBwdWJsaWMgdG9KU09OKCk6IHN0cmluZyB7XG4gICAgcmV0dXJuIHRoaXMudG9TdHJpbmcoKTtcbiAgfVxufTtcbiIsIi8qXG4gKiBNSVQgTGljZW5zZVxuICpcbiAqIENvcHlyaWdodCAoYykgMjAyNSAgWXVyaWkgWWFrdWJpbiAoeXVyaWkueWFrdWJpbkBnbWFpbC5jb20pXG4gKlxuICogUGVybWlzc2lvbiBpcyBncmFudGVkIHRvIHVzZSwgY29weSwgbW9kaWZ5LCBhbmQgZGlzdHJpYnV0ZSB0aGlzIHNvZnR3YXJlXG4gKiB1bmRlciB0aGUgTUlUIExpY2Vuc2UuIFNlZSBMSUNFTlNFIGZpbGUgZm9yIGRldGFpbHMuXG4gKi9cblxuY29uc3QgTkFNRSAgICAgICA9IFN5bWJvbChcIk5BTUVcIik7XG5jb25zdCBQUk9QRVJUSUVTID0gU3ltYm9sKFwiUFJPUEVSVElFU1wiKTtcblxuZXhwb3J0IGNsYXNzIEludGVyZmFjZVNjcmlwdCB7XG4gIHByaXZhdGUgW05BTUVdOiBzdHJpbmc7XG4gIHByaXZhdGUgW1BST1BFUlRJRVNdOiBhbnk7XG5cbiAgcHJpdmF0ZSBjb25zdHJ1Y3RvcihuYW1lOiBzdHJpbmcpIHtcbiAgICB0aGlzW05BTUVdID0gbmFtZTtcbiAgICB0aGlzW1BST1BFUlRJRVNdID0ge307XG4gIH1cblxuICBwdWJsaWMgZ2V0IE5BTUUoKSB7XG4gICAgcmV0dXJuIHRoaXNbTkFNRV07XG4gIH1cblxuICBwdWJsaWMgZ2V0IFBST1BFUlRJRVMoKSB7XG4gICAgcmV0dXJuIHRoaXNbUFJPUEVSVElFU107XG4gIH1cbiAgXG4gIHB1YmxpYyBhZGRQcm9wZXJ0eShrZXk6IHN0cmluZywgLi4udmFsczogYW55W10pIHtcbiAgICBsZXQgcHJvcGVydHkgPSB0aGlzW1BST1BFUlRJRVNdW2tleV07XG4gICAgaWYgKCFwcm9wZXJ0eSkge1xuICAgICAgcHJvcGVydHkgPSBbXTtcbiAgICAgIHRoaXNbUFJPUEVSVElFU11ba2V5XSA9IHByb3BlcnR5O1xuICAgIH1cbiAgICB2YWxzLmZvckVhY2godiA9PiBwcm9wZXJ0eS5wdXNoKHYpKTtcbiAgfVxuXG4gIHB1YmxpYyB0b0pTT04oKTogb2JqZWN0IHtcbiAgICByZXR1cm4ge1xuICAgICAgTkFNRTogdGhpcy5OQU1FLFxuICAgICAgUFJPUEVSVElFUzogdGhpcy5QUk9QRVJUSUVTLFxuICAgIH07XG4gIH1cbiAgXG4gIHB1YmxpYyB0b1N0cmluZygpOiBzdHJpbmcge1xuICAgIHJldHVybiB0aGlzW05BTUVdO1xuICB9XG5cbiAgcHVibGljIHN0YXRpYyBjcmVhdGUobmFtZTogc3RyaW5nKSB7XG4gICAgcmV0dXJuIE9iamVjdC5zZWFsKG5ldyBJbnRlcmZhY2VTY3JpcHQobmFtZSkpO1xuICB9XG5cbiAgcHVibGljIHN0YXRpYyBlbnN1cmVJbnN0YW5jZSh2YWx1ZTogYW55KSB7XG4gICAgaWYgKHZhbHVlIGluc3RhbmNlb2YgSW50ZXJmYWNlU2NyaXB0KVxuICAgICAgcmV0dXJuIHZhbHVlO1xuICAgIHRocm93IG5ldyBFcnJvcihgVGhlICcke3ZhbHVlfScgaXMgbm90IGEgSW50ZXJmYWNlU2NyaXB0YCk7XG4gIH1cbn07XG4iLCIvKlxuICogTUlUIExpY2Vuc2VcbiAqXG4gKiBDb3B5cmlnaHQgKGMpIDIwMjUgIFl1cmlpIFlha3ViaW4gKHl1cmlpLnlha3ViaW5AZ21haWwuY29tKVxuICpcbiAqIFBlcm1pc3Npb24gaXMgZ3JhbnRlZCB0byB1c2UsIGNvcHksIG1vZGlmeSwgYW5kIGRpc3RyaWJ1dGUgdGhpcyBzb2Z0d2FyZVxuICogdW5kZXIgdGhlIE1JVCBMaWNlbnNlLiBTZWUgTElDRU5TRSBmaWxlIGZvciBkZXRhaWxzLlxuICovXG5cbmltcG9ydCB7IEFic29sdXRlUGF0aCB9IGZyb20gXCJAL2NvcmUvUGF0aFwiO1xuaW1wb3J0IHsgSW50ZXJmYWNlSW5jbHVkZXMgfSBmcm9tIFwiQC9jb3JlL0ludGVyZmFjZUluY2x1ZGVzXCI7XG5pbXBvcnQgeyBJbnRlcmZhY2VPYmplY3RzIH0gZnJvbSBcIkAvY29yZS9JbnRlcmZhY2VPYmplY3RzXCI7XG5pbXBvcnQgeyBJbmNsdWRlRGlyZWN0b3J5IH0gZnJvbSBcIkAvY29yZS9JbmNsdWRlRGlyZWN0b3J5XCI7XG5pbXBvcnQgeyBTb3VyY2VGaWxlIH0gZnJvbSBcIkAvY29yZS9Tb3VyY2VGaWxlXCI7XG5cbmNvbnN0IFVOS05PV05fVEFSR0VUID0gU3ltYm9sKFwiVU5LTk9XTl9UQVJHRVRcIik7XG5jb25zdCBTQ09QRSA9IFN5bWJvbChcIlNDT1BFXCIpO1xuXG5leHBvcnQgY2xhc3MgSW50ZXJmYWNlVGFyZ2V0IHtcbiAgcHJpdmF0ZSBbU0NPUEVdOiBhbnk7XG4gIHByaXZhdGUgW1VOS05PV05fVEFSR0VUXTogYW55O1xuXG4gIHByaXZhdGUgY29uc3RydWN0b3Ioc2NvcGU6IGFueSwgdXRhcmdldDogYW55KSB7XG4gICAgdGhpc1tTQ09QRV0gPSBzY29wZS5jbG9uZSgpO1xuICAgIHRoaXNbVU5LTk9XTl9UQVJHRVRdID0gdXRhcmdldDtcbiAgfVxuXG4gIHB1YmxpYyBzdGF0aWMgY3JlYXRlKHNjb3BlOiBhbnksIHV0YXJnZXQ6IGFueSkge1xuICAgIHJldHVybiBPYmplY3Quc2VhbChuZXcgSW50ZXJmYWNlVGFyZ2V0KHNjb3BlLCB1dGFyZ2V0KSk7XG4gIH1cblxuICBwdWJsaWMgc3RhdGljIGVuc3VyZUluc3RhbmNlKHZhbHVlOiBhbnkpIHtcbiAgICBpZiAodmFsdWUgaW5zdGFuY2VvZiBJbnRlcmZhY2VUYXJnZXQpXG4gICAgICByZXR1cm4gdmFsdWU7XG4gICAgdGhyb3cgbmV3IEVycm9yKGBUaGUgJyR7dmFsdWV9JyBpcyBub3QgYSBJbnRlcmZhY2VUYXJnZXRgKTtcbiAgfVxuXG4gIHB1YmxpYyBnZXQgdGFyZ2V0TmFtZSgpOiBzdHJpbmcge1xuICAgIHJldHVybiB0aGlzW1VOS05PV05fVEFSR0VUXS5OQU1FO1xuICB9XG5cbiAgcHVibGljIGdldCBpbmNsdWRlcygpOiBJbnRlcmZhY2VJbmNsdWRlcyB7XG4gICAgcmV0dXJuIEludGVyZmFjZUluY2x1ZGVzLmNyZWF0ZSh0aGlzLnRhcmdldE5hbWUpO1xuICB9XG5cbiAgcHVibGljIGdldCBvYmplY3RzKCk6IEludGVyZmFjZU9iamVjdHMge1xuICAgIHJldHVybiBJbnRlcmZhY2VPYmplY3RzLmNyZWF0ZSh0aGlzLnRhcmdldE5hbWUpO1xuICB9XG5cbiAgcHVibGljIHRvSlNPTigpOiBzdHJpbmcge1xuICAgIHJldHVybiB0aGlzLnRvU3RyaW5nKCk7XG4gIH1cblxuICBwdWJsaWMgdG9TdHJpbmcoKTogc3RyaW5nIHtcbiAgICByZXR1cm4gXCIke1wiICsgdGhpcy50YXJnZXROYW1lICsgXCJ9XCI7XG4gIH1cblxuICBwdWJsaWMgYWRkU291cmNlcyguLi5zb3VyY2VzOiBBcnJheTxJbnRlcmZhY2VPYmplY3RzfFNvdXJjZUZpbGV8QWJzb2x1dGVQYXRofHN0cmluZz4pOiB2b2lkIHtcbiAgICBmb3IgKGxldCBpdCBvZiBzb3VyY2VzLmZsYXQoMSkpIHtcbiAgICAgIGlmIChpdCBpbnN0YW5jZW9mIEludGVyZmFjZU9iamVjdHMgfHwgaXQgaW5zdGFuY2VvZiBTb3VyY2VGaWxlKVxuICAgICAgICB7fVxuICAgICAgZWxzZSBpZiAodHlwZW9mIGl0ID09PSBcInN0cmluZ1wiIHx8IEFic29sdXRlUGF0aC5pc0Fic29sdXRlKGl0KSlcbiAgICAgICAgaXQgPSBTb3VyY2VGaWxlLmNyZWF0ZSh0aGlzW1NDT1BFXSwgaXQpO1xuICAgICAgZWxzZVxuICAgICAgICB0aHJvdyBuZXcgRXJyb3IoYE5vdCBzdXBwb3J0IGluc3RhbmNlICR7aXR9YCk7XG4gICAgICB0aGlzW1VOS05PV05fVEFSR0VUXS5TT1VSQ0VTLnB1c2goaXQpO1xuICAgIH1cbiAgfVxuXG4gIHB1YmxpYyBhZGRJbmNsdWRlcyguLi5pbmNsdWRlczogQXJyYXk8SW50ZXJmYWNlSW5jbHVkZXN8QWJzb2x1dGVQYXRofHN0cmluZz4pOiB2b2lkIHtcbiAgICBmb3IgKGNvbnN0IGl0IG9mIGluY2x1ZGVzLmZsYXQoMSkpIHtcbiAgICAgIGxldCBWQUxVRTtcbiAgICAgIGlmIChpdCBpbnN0YW5jZW9mIEludGVyZmFjZUluY2x1ZGVzKVxuICAgICAgICBWQUxVRSA9IGl0O1xuICAgICAgZWxzZSBpZiAodHlwZW9mIGl0ID09PSBcInN0cmluZ1wiIHx8IEFic29sdXRlUGF0aC5pc0Fic29sdXRlKGl0KSlcbiAgICAgICAgVkFMVUUgPSBJbmNsdWRlRGlyZWN0b3J5LmNyZWF0ZShpdCwgdGhpc1tTQ09QRV0uU09VUkNFX0RJUik7XG4gICAgICBlbHNlXG4gICAgICAgIHRocm93IG5ldyBFcnJvcihgTm90IHN1cHBvcnQgaW5zdGFuY2UgJHtpdH1gKTtcbiAgICAgIHRoaXNbVU5LTk9XTl9UQVJHRVRdLklOQ0xVREVTLnB1c2goeyBWQUxVRSwgUFVCTElDX09OTFk6IGZhbHNlIH0pO1xuICAgIH1cbiAgfVxuXG4gIHB1YmxpYyBhZGRQdWJsaWNJbmNsdWRlcyguLi5pbmNsdWRlczogQXJyYXk8SW50ZXJmYWNlSW5jbHVkZXN8QWJzb2x1dGVQYXRofHN0cmluZz4pOiB2b2lkIHtcbiAgICBmb3IgKGNvbnN0IGl0IG9mIGluY2x1ZGVzLmZsYXQoMSkpIHtcbiAgICAgIGxldCBWQUxVRTtcbiAgICAgIGlmIChpdCBpbnN0YW5jZW9mIEludGVyZmFjZUluY2x1ZGVzKVxuICAgICAgICBWQUxVRSA9IGl0O1xuICAgICAgZWxzZSBpZiAodHlwZW9mIGl0ID09PSBcInN0cmluZ1wiIHx8IEFic29sdXRlUGF0aC5pc0Fic29sdXRlKGl0KSlcbiAgICAgICAgVkFMVUUgPSBJbmNsdWRlRGlyZWN0b3J5LmNyZWF0ZShpdCwgdGhpc1tTQ09QRV0uU09VUkNFX0RJUik7XG4gICAgICBlbHNlXG4gICAgICAgIHRocm93IG5ldyBFcnJvcihgTm90IHN1cHBvcnQgaW5zdGFuY2UgJHtpdH1gKTtcbiAgICAgIHRoaXNbVU5LTk9XTl9UQVJHRVRdLklOQ0xVREVTLnB1c2goeyBWQUxVRSwgUFVCTElDX09OTFk6IHRydWUgfSk7XG4gICAgfVxuICB9XG5cbiAgcHVibGljIGFkZERlZmluaXRpb25zKC4uLmRlZmluaXRpb25zOiBzdHJpbmdbXSk6IHZvaWQge1xuICAgIGZvciAoY29uc3QgVkFMVUUgb2YgZGVmaW5pdGlvbnMuZmxhdCgxKSlcbiAgICAgIHRoaXNbVU5LTk9XTl9UQVJHRVRdLkRFRklORVMucHVzaCh7IFZBTFVFIH0pO1xuICB9XG5cbiAgcHVibGljIGFkZFB1YmxpY0RlZmluaXRpb25zKC4uLmRlZmluaXRpb25zOiBzdHJpbmdbXSk6IHZvaWQge1xuICAgIGZvciAoY29uc3QgVkFMVUUgb2YgZGVmaW5pdGlvbnMuZmxhdCgxKSlcbiAgICAgIHRoaXNbVU5LTk9XTl9UQVJHRVRdLkRFRklORVMucHVzaCh7IFZBTFVFLCBQVUJMSUNfT05MWTogdHJ1ZSB9KTtcbiAgfVxuXG4gIHB1YmxpYyBhZGRDb21waWxlT3B0aW9ucyguLi5vcHRpb25zOiBzdHJpbmdbXSk6IHZvaWQge1xuICAgIGZvciAoY29uc3QgaXQgb2Ygb3B0aW9ucy5mbGF0KDEpKSB7XG4gICAgICB0aGlzW1VOS05PV05fVEFSR0VUXS5DT01QSUxFX09QVElPTlMucHVzaCh7IFZBTFVFOiBpdCB9KTtcbiAgICB9XG4gIH1cblxuICBwdWJsaWMgYWRkTGlua09wdGlvbnMoLi4ub3B0aW9uczogc3RyaW5nW10pOiB2b2lkIHtcbiAgICBmb3IgKGNvbnN0IGl0IG9mIG9wdGlvbnMuZmxhdCgxKSkge1xuICAgICAgdGhpc1tVTktOT1dOX1RBUkdFVF0uTElOS19PUFRJT05TLnB1c2goeyBWQUxVRTogaXQgfSk7XG4gICAgfVxuICB9XG5cbiAgcHVibGljIGFkZFB1YmxpY0NvbXBpbGVPcHRpb25zKC4uLm9wdGlvbnM6IHN0cmluZ1tdKTogdm9pZCB7XG4gICAgZm9yIChjb25zdCBpdCBvZiBvcHRpb25zLmZsYXQoMSkpIHtcbiAgICAgIHRoaXNbVU5LTk9XTl9UQVJHRVRdLkNPTVBJTEVfT1BUSU9OUy5wdXNoKHsgVkFMVUU6IGl0LCBQVUJMSUNfT05MWTogdHJ1ZSB9KTtcbiAgICB9XG4gIH1cblxuICBwdWJsaWMgYWRkUHVibGljTGlua09wdGlvbnMoLi4ub3B0aW9uczogc3RyaW5nW10pOiB2b2lkIHtcbiAgICBmb3IgKGNvbnN0IGl0IG9mIG9wdGlvbnMuZmxhdCgxKSkge1xuICAgICAgdGhpc1tVTktOT1dOX1RBUkdFVF0uTElOS19PUFRJT05TLnB1c2goeyBWQUxVRTogaXQsIFBVQkxJQ19PTkxZOiB0cnVlIH0pO1xuICAgIH1cbiAgfVxufTtcbiIsIi8qXG4gKiBNSVQgTGljZW5zZVxuICpcbiAqIENvcHlyaWdodCAoYykgMjAyNSAgWXVyaWkgWWFrdWJpbiAoeXVyaWkueWFrdWJpbkBnbWFpbC5jb20pXG4gKlxuICogUGVybWlzc2lvbiBpcyBncmFudGVkIHRvIHVzZSwgY29weSwgbW9kaWZ5LCBhbmQgZGlzdHJpYnV0ZSB0aGlzIHNvZnR3YXJlXG4gKiB1bmRlciB0aGUgTUlUIExpY2Vuc2UuIFNlZSBMSUNFTlNFIGZpbGUgZm9yIGRldGFpbHMuXG4gKi9cblxuaW1wb3J0IHBhdGggZnJvbSBcIm5vZGU6cGF0aFwiO1xuaW1wb3J0IHVybCBmcm9tIFwibm9kZTp1cmxcIjtcblxuY29uc3QgUEFUSCA9IFN5bWJvbChcIlBBVEhcIik7XG5cbmVudW0gUGF0aFR5cGUge1xuICBEaXJUeXBlLFxuICBGaWxlVHlwZSxcbn07XG5cbmNvbnN0IF9wYXRoTWFwID0gbmV3IE1hcDxzdHJpbmcsIFBhdGhUeXBlPigpO1xuXG5leHBvcnQgY2xhc3MgQWJzb2x1dGVQYXRoIHtcbiAgcHJpdmF0ZSBbUEFUSF06IHN0cmluZztcblxuICBwcml2YXRlIGNvbnN0cnVjdG9yKGZpbGVwYXRoOiBzdHJpbmcpIHtcbiAgICBpZiAoIXBhdGguaXNBYnNvbHV0ZShmaWxlcGF0aCkpXG4gICAgICB0aHJvdyBuZXcgRXJyb3IoYE5vdCBzdXBwb3J0ZWQgcmVsYXRpdmUgcGF0aCBvZiBcIiR7ZmlsZXBhdGh9XCJgKTtcbiAgICB0aGlzW1BBVEhdID0gZmlsZXBhdGg7XG4gIH1cblxuICBwdWJsaWMgam9pbiguLi5wYXRoczogQXJyYXk8QWJzb2x1dGVQYXRoIHwgc3RyaW5nPikge1xuICAgIGNvbnN0IGZpbGVwYXRoID0gcGF0aC5wb3NpeC5qb2luKHRoaXNbUEFUSF0sIC4uLnBhdGhzLm1hcChpID0+IGkudG9TdHJpbmcoKSkpO1xuICAgIHJldHVybiBBYnNvbHV0ZVBhdGguY3JlYXRlKGZpbGVwYXRoKTtcbiAgfVxuXG4gIHB1YmxpYyBkaXJuYW1lKCkge1xuICAgIHJldHVybiBBYnNvbHV0ZVBhdGguY3JlYXRlKHBhdGgucG9zaXguZGlybmFtZSh0aGlzW1BBVEhdKSk7XG4gIH1cblxuICBwdWJsaWMgYmFzZW5hbWUoKSB7XG4gICAgcmV0dXJuIHBhdGguYmFzZW5hbWUodGhpc1tQQVRIXSk7XG4gIH1cblxuICBwdWJsaWMgcmVsYXRpdmUodG86IEFic29sdXRlUGF0aCB8IHN0cmluZykge1xuICAgIHJldHVybiBwYXRoLnBvc2l4LnJlbGF0aXZlKHRoaXNbUEFUSF0sKHRvIGluc3RhbmNlb2YgQWJzb2x1dGVQYXRoKSA/IHRvW1BBVEhdIDogdG8pO1xuICB9XG5cbiAgcHVibGljIHJlc29sdmUoLi4ucGF0aHM6IEFycmF5PEFic29sdXRlUGF0aCB8IHN0cmluZz4pIHtcbiAgICByZXR1cm4gQWJzb2x1dGVQYXRoLmNyZWF0ZShwYXRoLnBvc2l4LnJlc29sdmUodGhpc1tQQVRIXSwgLi4ucGF0aHMubWFwKGkgPT4gaS50b1N0cmluZygpKSkpO1xuICB9XG5cbiAgcHVibGljIG1hdGNoKHJlZ2V4cDogUmVnRXhwKSB7XG4gICAgcmV0dXJuIHRoaXNbUEFUSF0ubWF0Y2gocmVnZXhwKTtcbiAgfVxuXG4gIHB1YmxpYyB0b1VSTCgpIHtcbiAgICByZXR1cm4gdXJsLnBhdGhUb0ZpbGVVUkwodGhpc1tQQVRIXSk7XG4gIH1cblxuICBwdWJsaWMgdG9VUkxTdHJpbmcoKSB7XG4gICAgcmV0dXJuIHRoaXMudG9VUkwoKS50b1N0cmluZygpO1xuICB9XG5cbiAgcHVibGljIHRvU3RyaW5nKCkge1xuICAgIHJldHVybiB0aGlzW1BBVEhdO1xuICB9XG5cbiAgcHVibGljIHZhbHVlT2YoKSB7XG4gICAgcmV0dXJuIHRoaXNbUEFUSF07XG4gIH1cblxuICBwdWJsaWMgdG9KU09OKCkge1xuICAgIHJldHVybiB0aGlzW1BBVEhdO1xuICB9XG5cbiAgcHVibGljIHN0YXRpYyBpc0Fic29sdXRlKGZpbGVwYXRoOiBBYnNvbHV0ZVBhdGggfCBzdHJpbmcpIHtcbiAgICBpZiAoZmlsZXBhdGggaW5zdGFuY2VvZiBBYnNvbHV0ZVBhdGgpXG4gICAgICByZXR1cm4gdHJ1ZTtcbiAgICByZXR1cm4gcGF0aC5pc0Fic29sdXRlKGZpbGVwYXRoKTtcbiAgfVxuXG4gIHB1YmxpYyBzdGF0aWMgY3JlYXRlKGZpbGVwYXRoOiBBYnNvbHV0ZVBhdGggfCBzdHJpbmcpIHtcbiAgICBpZiAoZmlsZXBhdGggaW5zdGFuY2VvZiBBYnNvbHV0ZVBhdGgpXG4gICAgICByZXR1cm4gZmlsZXBhdGg7XG4gICAgaWYgKHR5cGVvZiBmaWxlcGF0aCAhPT0gXCJzdHJpbmdcIilcbiAgICAgIHRocm93IG5ldyBFcnJvcihgTm90IGNvcnJlY3QgdHlwZSBvZiAke2ZpbGVwYXRofWApO1xuICAgIHJldHVybiBuZXcgQWJzb2x1dGVQYXRoKGZpbGVwYXRoKTtcbiAgfVxuXG4gIHB1YmxpYyBzdGF0aWMgZW5zdXJlSW5zdGFuY2UodmFsdWU6IGFueSk6IEFic29sdXRlUGF0aCB7XG4gICAgaWYgKHZhbHVlIGluc3RhbmNlb2YgQWJzb2x1dGVQYXRoKVxuICAgICAgcmV0dXJuIHZhbHVlO1xuICAgIHRocm93IG5ldyBFcnJvcihgVGhlICcke3ZhbHVlfScgaXMgbm90IGEgQWJzb2x1dGVQYXRoYCk7XG4gIH1cblxuICBwdWJsaWMgc3RhdGljIGNyZWF0ZURpcihmaWxlcGF0aDogQWJzb2x1dGVQYXRoIHwgc3RyaW5nKSB7XG4gICAgY29uc3Qga2V5ID0gZmlsZXBhdGgudG9TdHJpbmcoKTtcbiAgICBjb25zdCB0eXBlID0gX3BhdGhNYXAuZ2V0KGtleSk7XG4gICAgaWYgKHR5cGUgPT09IHVuZGVmaW5lZClcbiAgICAgIF9wYXRoTWFwLnNldChrZXksIFBhdGhUeXBlLkRpclR5cGUpO1xuICAgIGVsc2UgaWYgKHR5cGUgIT09IFBhdGhUeXBlLkRpclR5cGUpXG4gICAgICB0aHJvdyBuZXcgRXJyb3IoYFRoZSAnJHtmaWxlcGF0aH0nIGlzIG5vdCBhIERpclBhdGhgKTtcbiAgICByZXR1cm4gQWJzb2x1dGVQYXRoLmNyZWF0ZShmaWxlcGF0aCk7XG4gIH1cblxuICBwdWJsaWMgc3RhdGljIGNyZWF0ZUZpbGUoZmlsZXBhdGg6IEFic29sdXRlUGF0aCB8IHN0cmluZykge1xuICAgIGNvbnN0IGtleSA9IGZpbGVwYXRoLnRvU3RyaW5nKCk7XG4gICAgY29uc3QgdHlwZSA9IF9wYXRoTWFwLmdldChrZXkpO1xuICAgIGlmICh0eXBlID09PSB1bmRlZmluZWQpXG4gICAgICBfcGF0aE1hcC5zZXQoa2V5LCBQYXRoVHlwZS5GaWxlVHlwZSk7XG4gICAgZWxzZSBpZiAodHlwZSAhPT0gUGF0aFR5cGUuRmlsZVR5cGUpXG4gICAgICB0aHJvdyBuZXcgRXJyb3IoYFRoZSAnJHtmaWxlcGF0aH0nIGlzIG5vdCBhIEZpbGVQYXRoYCk7XG4gICAgcmV0dXJuIEFic29sdXRlUGF0aC5jcmVhdGUoZmlsZXBhdGgpO1xuICB9XG59O1xuXG5jbGFzcyBCYXNlUGF0aCB7XG4gIHByaXZhdGUgW1BBVEhdOiBzdHJpbmc7XG5cbiAgcHJvdGVjdGVkIGNvbnN0cnVjdG9yKHBhdGhTdHI6IHN0cmluZykge1xuICAgIGlmICghcGF0aC5pc0Fic29sdXRlKHBhdGhTdHIpKVxuICAgICAgdGhyb3cgbmV3IEVycm9yKGBOb3Qgc3VwcG9ydGVkIHJlbGF0aXZlIHBhdGggb2YgXCIke3BhdGhTdHJ9XCJgKTtcbiAgICB0aGlzW1BBVEhdID0gcGF0aFN0cjtcbiAgfVxuXG4gIHB1YmxpYyBtYXRjaChyZWdleHA6IFJlZ0V4cCkge1xuICAgIHJldHVybiB0aGlzW1BBVEhdLm1hdGNoKHJlZ2V4cCk7XG4gIH1cblxuICBwdWJsaWMgam9pbiguLi5wYXRoczogQXJyYXk8YW55Pikge1xuICAgIHJldHVybiBwYXRoLnBvc2l4LmpvaW4odGhpc1tQQVRIXSwgLi4ucGF0aHMubWFwKGkgPT4gaS50b1N0cmluZygpKSk7XG4gIH1cblxuICBwdWJsaWMgZGlybmFtZSgpIHtcbiAgICByZXR1cm4gcGF0aC5wb3NpeC5kaXJuYW1lKHRoaXNbUEFUSF0pO1xuICB9XG5cbiAgcHVibGljIGJhc2VuYW1lKCkge1xuICAgIHJldHVybiBwYXRoLmJhc2VuYW1lKHRoaXNbUEFUSF0pO1xuICB9XG5cbiAgcHVibGljIHJlbGF0aXZlKHRvOiBhbnkpIHtcbiAgICByZXR1cm4gcGF0aC5wb3NpeC5yZWxhdGl2ZSh0aGlzW1BBVEhdLCB0by50b1N0cmluZygpKTtcbiAgfVxuXG4gIHB1YmxpYyByZXNvbHZlKC4uLnBhdGhzOiBBcnJheTxhbnk+KSB7XG4gICAgcmV0dXJuIHBhdGgucG9zaXgucmVzb2x2ZSh0aGlzW1BBVEhdLCAuLi5wYXRocy5tYXAoaSA9PiBpLnRvU3RyaW5nKCkpKTtcbiAgfVxuICBcbiAgcHVibGljIHRvVVJMKCkge1xuICAgIHJldHVybiB1cmwucGF0aFRvRmlsZVVSTCh0aGlzW1BBVEhdKTtcbiAgfVxuICBcbiAgcHVibGljIGdldCBQQVRIKCk6IHN0cmluZyB7XG4gICAgcmV0dXJuIHRoaXNbUEFUSF07XG4gIH1cblxuICBwdWJsaWMgdG9TdHJpbmcoKSB7XG4gICAgcmV0dXJuIHRoaXNbUEFUSF07XG4gIH1cblxuICBwdWJsaWMgdG9KU09OKCkge1xuICAgIHJldHVybiB0aGlzW1BBVEhdO1xuICB9XG59O1xuXG5jb25zdCBfcGF0aHMgPSBuZXcgTWFwPHN0cmluZywgQmFzZVBhdGg+KCk7XG5cbmV4cG9ydCBjbGFzcyBGaWxlUGF0aCBleHRlbmRzIEJhc2VQYXRoIHtcbiAgcHJpdmF0ZSBjb25zdHJ1Y3RvcihwYXRoU3RyOiBzdHJpbmcpIHtcbiAgICBzdXBlcihwYXRoU3RyKTtcbiAgfVxuXG4gIHB1YmxpYyBzdGF0aWMgZW5zdXJlSW5zdGFuY2UodmFsdWU6IGFueSk6IEZpbGVQYXRoIHtcbiAgICBpZiAodmFsdWUgaW5zdGFuY2VvZiBGaWxlUGF0aClcbiAgICAgIHJldHVybiB2YWx1ZTtcbiAgICB0aHJvdyBuZXcgRXJyb3IoYFRoZSAnJHt2YWx1ZX0nIGlzIG5vdCBhIEZpbGVQYXRoYCk7XG4gIH1cbiAgXG4gIHB1YmxpYyBzdGF0aWMgY3JlYXRlKHBhdGg6IGFueSk6IEZpbGVQYXRoIHtcbiAgICBpZiAocGF0aCBpbnN0YW5jZW9mIEZpbGVQYXRoKVxuICAgICAgcmV0dXJuIHBhdGg7XG5cbiAgICBpZiAodHlwZW9mIHBhdGggIT09IFwic3RyaW5nXCIpXG4gICAgICB0aHJvdyBuZXcgRXJyb3IoYFRoZSAnJHtwYXRofScgaXMgbm90IGEgc3RyaW5nYCk7XG5cbiAgICBsZXQgZmlsZVBhdGggPSBfcGF0aHMuZ2V0KHBhdGgpO1xuICAgIGlmIChmaWxlUGF0aClcbiAgICAgIHJldHVybiBGaWxlUGF0aC5lbnN1cmVJbnN0YW5jZShmaWxlUGF0aCk7XG5cbiAgICBmaWxlUGF0aCA9IE9iamVjdC5zZWFsKG5ldyBGaWxlUGF0aChwYXRoKSk7XG4gICAgX3BhdGhzLnNldChwYXRoLCBmaWxlUGF0aCk7XG5cbiAgICByZXR1cm4gZmlsZVBhdGg7XG4gIH1cbn1cblxuZXhwb3J0IGNsYXNzIERpclBhdGggZXh0ZW5kcyBCYXNlUGF0aCB7XG4gIHByaXZhdGUgY29uc3RydWN0b3IocGF0aFN0cjogc3RyaW5nKSB7XG4gICAgc3VwZXIocGF0aFN0cik7XG4gIH1cblxuICBwdWJsaWMgc3RhdGljIGVuc3VyZUluc3RhbmNlKHZhbHVlOiBhbnkpOiBEaXJQYXRoIHtcbiAgICBpZiAodmFsdWUgaW5zdGFuY2VvZiBEaXJQYXRoKVxuICAgICAgcmV0dXJuIHZhbHVlO1xuICAgIHRocm93IG5ldyBFcnJvcihgVGhlICcke3ZhbHVlfScgaXMgbm90IGEgRGlyUGF0aGApO1xuICB9XG5cbiAgcHVibGljIHN0YXRpYyBjcmVhdGUocGF0aDogYW55KSB7XG4gICAgaWYgKHBhdGggaW5zdGFuY2VvZiBEaXJQYXRoKVxuICAgICAgcmV0dXJuIHBhdGg7XG5cbiAgICBpZiAodHlwZW9mIHBhdGggIT09IFwic3RyaW5nXCIpXG4gICAgICB0aHJvdyBuZXcgRXJyb3IoYFRoZSAnJHtwYXRofScgaXMgbm90IGEgc3RyaW5nYCk7XG5cbiAgICBsZXQgZGlyUGF0aCA9IF9wYXRocy5nZXQocGF0aCk7XG4gICAgaWYgKGRpclBhdGgpXG4gICAgICByZXR1cm4gRGlyUGF0aC5lbnN1cmVJbnN0YW5jZShkaXJQYXRoKTtcblxuICAgIGRpclBhdGggPSBPYmplY3Quc2VhbChuZXcgRGlyUGF0aChwYXRoKSk7XG4gICAgX3BhdGhzLnNldChwYXRoLCBkaXJQYXRoKTtcblxuICAgIHJldHVybiBkaXJQYXRoO1xuICB9XG59O1xuIiwiLypcbiAqIE1JVCBMaWNlbnNlXG4gKlxuICogQ29weXJpZ2h0IChjKSAyMDI1ICBZdXJpaSBZYWt1YmluICh5dXJpaS55YWt1YmluQGdtYWlsLmNvbSlcbiAqXG4gKiBQZXJtaXNzaW9uIGlzIGdyYW50ZWQgdG8gdXNlLCBjb3B5LCBtb2RpZnksIGFuZCBkaXN0cmlidXRlIHRoaXMgc29mdHdhcmVcbiAqIHVuZGVyIHRoZSBNSVQgTGljZW5zZS4gU2VlIExJQ0VOU0UgZmlsZSBmb3IgZGV0YWlscy5cbiAqL1xuXG5pbXBvcnQgeyBlbnN1cmVCb29sZWFuIH0gZnJvbSBcIkAvdXRpbHMvU3RyaWN0VHlwZVwiO1xuaW1wb3J0IHsgQWJzb2x1dGVQYXRoIH0gZnJvbSBcIkAvY29yZS9QYXRoXCI7XG5cbmNvbnN0IE5BTUUgICAgICAgICAgICAgICAgPSBTeW1ib2woXCJOQU1FXCIpO1xuY29uc3QgTEFOR1VBR0UgICAgICAgICAgICA9IFN5bWJvbChcIkxBTkdVQUdFXCIpO1xuY29uc3QgSEVBREVSX0ZJTEVfT05MWSAgICA9IFN5bWJvbChcIkhFQURFUl9GSUxFX09OTFlcIik7XG5jb25zdCBERUZJTkVTICAgICAgICAgICAgID0gU3ltYm9sKFwiREVGSU5FU1wiKTtcbmNvbnN0IENPTVBJTEVfRkxBR1MgICAgICAgPSBTeW1ib2woXCJDT01QSUxFX0ZMQUdTXCIpO1xuY29uc3QgRklMRSAgICAgICAgICAgICAgICA9IFN5bWJvbChcIkZJTEVcIik7XG5jb25zdCBPQkpFQ1RfRklMRSAgICAgICAgID0gU3ltYm9sKFwiT0JKRUNUX0ZJTEVcIik7XG5cbmNvbnN0IF9sYW5ndWFnZUV4dGVuc2lvbnMgPSB7XG4gIEFTTTogWyBcIi5hc21cIiwgXCIuc1wiIF0sXG4gIEM6ICAgWyBcIi5jXCIgXSxcbiAgQ1hYOiBbXCIuY3BwXCIsIFwiLmNjXCIsIFwiLmN4eFwiIF0sXG59O1xuXG5mdW5jdGlvbiBpc1N1cHBvcnRMYW5ndWFnZShsYW5ndWFnZTogc3RyaW5nKSB7XG4gIHJldHVybiBfbGFuZ3VhZ2VFeHRlbnNpb25zLmhhc093blByb3BlcnR5KGxhbmd1YWdlKTtcbn1cblxuZnVuY3Rpb24gZ2V0RmlsZUxhbmd1YWdlKGZpbGVuYW1lOiBhbnkpIHtcbiAgY29uc3QgZmlsZW5hbWVMb3dlckNhc2UgPSBmaWxlbmFtZS50b1N0cmluZygpLnRvTG93ZXJDYXNlKCk7XG4gIGZvciAoY29uc3QgW2xhbmd1YWdlLCBleHRlbnNpb25zXSBvZiBPYmplY3QuZW50cmllcyhfbGFuZ3VhZ2VFeHRlbnNpb25zKSkge1xuICAgIGZvciAoY29uc3QgaXRlciBvZiBleHRlbnNpb25zKSB7XG4gICAgICBpZiAoZmlsZW5hbWVMb3dlckNhc2UuZW5kc1dpdGgoaXRlcikpXG4gICAgICAgIHJldHVybiBsYW5ndWFnZTtcbiAgICB9XG4gIH1cbiAgcmV0dXJuIFwiXCI7XG59XG5cbmZ1bmN0aW9uIG1ha2VMYW5ndWFnZSh2YWx1ZTogc3RyaW5nKSB7XG4gIGlmIChpc1N1cHBvcnRMYW5ndWFnZSh2YWx1ZSkpXG4gICAgcmV0dXJuIHZhbHVlO1xuICB0aHJvdyBuZXcgRXJyb3IoYExhbmd1YWdlIFwiJHt2YWx1ZX1cIiBpcyBub3Qgc3VwcG9ydGVkYCk7XG59XG5cbmV4cG9ydCBjbGFzcyBTb3VyY2VGaWxlIHtcbiAgcHJpdmF0ZSBbTkFNRV06IHN0cmluZztcbiAgcHJpdmF0ZSBbTEFOR1VBR0VdOiBzdHJpbmc7XG4gIHByaXZhdGUgW0hFQURFUl9GSUxFX09OTFldOiBib29sZWFuO1xuICBwcml2YXRlIFtGSUxFXTogQWJzb2x1dGVQYXRoO1xuICBwcml2YXRlIFtPQkpFQ1RfRklMRV06IEFic29sdXRlUGF0aCB8IG51bGw7XG4gIHByaXZhdGUgW0RFRklORVNdOiBzdHJpbmdbXTtcbiAgcHJpdmF0ZSBbQ09NUElMRV9GTEFHU106IHN0cmluZ1tdO1xuXG4gIHByaXZhdGUgY29uc3RydWN0b3Ioc2NvcGU6IGFueSwgZmlsZW5hbWU6IEFic29sdXRlUGF0aHxzdHJpbmcpIHtcbiAgICB0aGlzW05BTUVdID0gZmlsZW5hbWUudG9TdHJpbmcoKTtcbiAgICBjb25zdCBmbmFtZSA9IHNjb3BlLlNPVVJDRV9ESVIucmVzb2x2ZShmaWxlbmFtZSk7XG4gIFxuICAgIGNvbnN0IGxhbmd1YWdlID0gZ2V0RmlsZUxhbmd1YWdlKGZuYW1lKTtcbiAgICB0aGlzW0xBTkdVQUdFXSA9IGxhbmd1YWdlO1xuICAgIHRoaXNbSEVBREVSX0ZJTEVfT05MWV0gPSAhbGFuZ3VhZ2U7XG4gICAgdGhpc1tGSUxFXSA9IGZuYW1lO1xuICAgIHRoaXNbT0JKRUNUX0ZJTEVdID0gbnVsbDtcbiAgICB0aGlzW0RFRklORVNdID0gW107XG4gICAgdGhpc1tDT01QSUxFX0ZMQUdTXSA9ICFsYW5ndWFnZSA/IFtdIDogW1xuICAgICAgLi4uc2NvcGVbbGFuZ3VhZ2UgKyBcIl9GTEFHU1wiXSxcbiAgICAgIC4uLnNjb3BlW2xhbmd1YWdlICsgXCJfRkxBR1NfXCIgKyBzY29wZS5CVUlMRF9UWVBFLnRvVXBwZXJDYXNlKCldLFxuICAgIF07XG4gIH1cblxuICBwdWJsaWMgc3RhdGljIGNyZWF0ZShzY29wZTogYW55LCBmaWxlbmFtZTogQWJzb2x1dGVQYXRofHN0cmluZykge1xuICAgIHJldHVybiBPYmplY3Quc2VhbChuZXcgU291cmNlRmlsZShzY29wZSwgZmlsZW5hbWUpKTtcbiAgfVxuXG4gIHB1YmxpYyBnZXQgTkFNRSgpOiBzdHJpbmcge1xuICAgIHJldHVybiB0aGlzW05BTUVdO1xuICB9XG5cbiAgcHVibGljIGdldCBMQU5HVUFHRSgpOiBzdHJpbmcge1xuICAgIHJldHVybiB0aGlzW0xBTkdVQUdFXTtcbiAgfVxuXG4gIHB1YmxpYyBnZXQgSEVBREVSX0ZJTEVfT05MWSgpOiBib29sZWFuIHtcbiAgICByZXR1cm4gdGhpc1tIRUFERVJfRklMRV9PTkxZXTtcbiAgfVxuXG4gIHB1YmxpYyBzZXQgSEVBREVSX0ZJTEVfT05MWSh2YWx1ZTogYm9vbGVhbikge1xuICAgIHRoaXNbSEVBREVSX0ZJTEVfT05MWV0gPSBlbnN1cmVCb29sZWFuKHZhbHVlKTtcbiAgfVxuXG4gIHB1YmxpYyBnZXQgREVGSU5FUygpIHtcbiAgICByZXR1cm4gdGhpc1tERUZJTkVTXVxuICB9XG5cbiAgcHVibGljIGdldCBDT01QSUxFX0ZMQUdTKCkge1xuICAgIHJldHVybiB0aGlzW0NPTVBJTEVfRkxBR1NdO1xuICB9XG5cbiAgcHVibGljIGdldCBGSUxFKCk6IEFic29sdXRlUGF0aCB7XG4gICAgcmV0dXJuIHRoaXNbRklMRV07XG4gIH1cblxuICBwdWJsaWMgZ2V0IEZJTEVfRElSKCk6IEFic29sdXRlUGF0aCB7XG4gICAgcmV0dXJuIHRoaXNbRklMRV0uZGlybmFtZSgpO1xuICB9XG5cbiAgcHVibGljIGdldCBGSUxFX05BTUUoKTogc3RyaW5nIHtcbiAgICByZXR1cm4gdGhpc1tGSUxFXS5iYXNlbmFtZSgpO1xuICB9XG5cbiAgcHVibGljIGdldCBPQkpFQ1RfRklMRSgpOiBBYnNvbHV0ZVBhdGggfCBudWxsIHtcbiAgICByZXR1cm4gdGhpc1tPQkpFQ1RfRklMRV07XG4gIH1cblxuICBwdWJsaWMgc2V0IE9CSkVDVF9GSUxFKHZhbHVlOiBBYnNvbHV0ZVBhdGgpIHtcbiAgICB0aGlzW09CSkVDVF9GSUxFXSA9IHZhbHVlO1xuICB9XG5cbiAgcHVibGljIGdldCBPQkpFQ1RfRklMRV9ESVIoKTogQWJzb2x1dGVQYXRoIHwgbnVsbCB7XG4gICAgcmV0dXJuIHRoaXNbT0JKRUNUX0ZJTEVdID8gdGhpc1tPQkpFQ1RfRklMRV0uZGlybmFtZSgpIDogbnVsbDtcbiAgfVxuXG4gIHB1YmxpYyBnZXQgT0JKRUNUX0ZJTEVfTkFNRSgpOiBzdHJpbmcgfCBudWxsIHtcbiAgICByZXR1cm4gdGhpc1tPQkpFQ1RfRklMRV0gPyB0aGlzW09CSkVDVF9GSUxFXS5iYXNlbmFtZSgpIDogbnVsbDtcbiAgfVxuXG4gIHB1YmxpYyB0b0pTT04oKTogb2JqZWN0IHtcbiAgICByZXR1cm4ge1xuICAgICAgTkFNRTogdGhpcy5OQU1FLFxuICAgICAgTEFOR1VBR0U6IHRoaXMuTEFOR1VBR0UsXG4gICAgICBIRUFERVJfRklMRV9PTkxZOiB0aGlzLkhFQURFUl9GSUxFX09OTFksXG4gICAgICBERUZJTkVTOiB0aGlzLkRFRklORVMsXG4gICAgICBDT01QSUxFX0ZMQUdTOiB0aGlzLkNPTVBJTEVfRkxBR1MsXG4gICAgICBGSUxFOiB0aGlzLkZJTEUsXG4gICAgICBGSUxFX0RJUjogdGhpcy5GSUxFX0RJUixcbiAgICAgIEZJTEVfTkFNRTogdGhpcy5GSUxFX05BTUUsXG4gICAgICBPQkpFQ1RfRklMRTogdGhpcy5PQkpFQ1RfRklMRSxcbiAgICAgIE9CSkVDVF9GSUxFX0RJUjogdGhpcy5PQkpFQ1RfRklMRV9ESVIsXG4gICAgICBPQkpFQ1RfRklMRV9OQU1FOiB0aGlzLk9CSkVDVF9GSUxFX05BTUUsXG4gICAgfTtcbiAgfVxufVxuIiwiLypcbiAqIE1JVCBMaWNlbnNlXG4gKlxuICogQ29weXJpZ2h0IChjKSAyMDI1ICBZdXJpaSBZYWt1YmluICh5dXJpaS55YWt1YmluQGdtYWlsLmNvbSlcbiAqXG4gKiBQZXJtaXNzaW9uIGlzIGdyYW50ZWQgdG8gdXNlLCBjb3B5LCBtb2RpZnksIGFuZCBkaXN0cmlidXRlIHRoaXMgc29mdHdhcmVcbiAqIHVuZGVyIHRoZSBNSVQgTGljZW5zZS4gU2VlIExJQ0VOU0UgZmlsZSBmb3IgZGV0YWlscy5cbiAqL1xuXG5pbXBvcnQgeyBTb3VyY2VGaWxlIH0gZnJvbSBcIkAvY29yZS9Tb3VyY2VGaWxlXCI7XG5cbmNvbnN0IFNPVVJDRVMgPSBTeW1ib2woXCJTT1VSQ0VTXCIpO1xuXG5leHBvcnQgY2xhc3MgU291cmNlRmlsZUxpc3Qge1xuICBwcml2YXRlIFtTT1VSQ0VTXTogU291cmNlRmlsZVtdO1xuXG4gIHByaXZhdGUgY29uc3RydWN0b3Ioc2NvcGU6IGFueSwgc291cmNlczogU291cmNlRmlsZVtdKSB7XG4gICAgdGhpc1tTT1VSQ0VTXSA9IFtdO1xuICAgIGZvciAoY29uc3QgaXRlciBvZiBzb3VyY2VzKSB7XG4gICAgICBpZiAoIShpdGVyIGluc3RhbmNlb2YgU291cmNlRmlsZSkpXG4gICAgICAgIHRocm93IG5ldyBFcnJvcihgSXRlbSAke2l0ZXJ9IGlzIG5vdCBTb3VyY2VGaWxlYCk7XG4gICAgICB0aGlzW1NPVVJDRVNdLnB1c2goaXRlcik7XG4gICAgfVxuICB9XG5cbiAgcHVibGljIHN0YXRpYyBjcmVhdGUoc2NvcGU6IGFueSwgc291cmNlczogU291cmNlRmlsZVtdKSB7XG4gICAgcmV0dXJuIE9iamVjdC5zZWFsKG5ldyBTb3VyY2VGaWxlTGlzdChzY29wZSwgc291cmNlcykpO1xuICB9XG5cbiAgcHVibGljIGFkZERlZmluaXRpb25zKC4uLmRlZmluaXRpb25zOiBzdHJpbmdbXSkge1xuICAgIGZvciAoY29uc3QgaXRlciBvZiBkZWZpbml0aW9ucy5mbGF0KCkpXG4gICAgICB0aGlzW1NPVVJDRVNdLmZvckVhY2goaSA9PiBpLkRFRklORVMucHVzaChpdGVyKSk7XG4gIH1cblxuICBwdWJsaWMgYWRkQ29tcGlsZUZsYWdzKC4uLmZsYWdzOiBzdHJpbmdbXSkge1xuICAgIGZvciAoY29uc3QgaXRlciBvZiBmbGFncy5mbGF0KCkpXG4gICAgICB0aGlzW1NPVVJDRVNdLmZvckVhY2goaSA9PiBpLkNPTVBJTEVfRkxBR1MucHVzaChpdGVyKSk7XG4gIH1cblxuICBwdWJsaWMgc291cmNlQXQoaW5kZXg6IG51bWJlcik6IFNvdXJjZUZpbGUge1xuICAgIHJldHVybiB0aGlzW1NPVVJDRVNdW2luZGV4XTtcbiAgfVxuXG4gIHB1YmxpYyBzb3VyY2VDb3VudChpbmRleDogbnVtYmVyKTogbnVtYmVyIHtcbiAgICByZXR1cm4gdGhpc1tTT1VSQ0VTXS5sZW5ndGg7XG4gIH1cblxuICBwdWJsaWMgdG9KU09OKCk6IG9iamVjdCB7XG4gICAgcmV0dXJuIHRoaXNbU09VUkNFU107XG4gIH1cbn07XG4iLCIvKlxuICogTUlUIExpY2Vuc2VcbiAqXG4gKiBDb3B5cmlnaHQgKGMpIDIwMjUgIFl1cmlpIFlha3ViaW4gKHl1cmlpLnlha3ViaW5AZ21haWwuY29tKVxuICpcbiAqIFBlcm1pc3Npb24gaXMgZ3JhbnRlZCB0byB1c2UsIGNvcHksIG1vZGlmeSwgYW5kIGRpc3RyaWJ1dGUgdGhpcyBzb2Z0d2FyZVxuICogdW5kZXIgdGhlIE1JVCBMaWNlbnNlLiBTZWUgTElDRU5TRSBmaWxlIGZvciBkZXRhaWxzLlxuICovXG5cbmltcG9ydCBvcyBmcm9tIFwibm9kZTpvc1wiO1xuaW1wb3J0IHsgREVCVUdfQlVJTERfVFlQRSwgUkVMRUFTRV9CVUlMRF9UWVBFIH0gZnJvbSBcIkAvY29yZS9UeXBlc1wiO1xuXG5leHBvcnQgZGVmYXVsdCB7XG4gIFNZU1RFTV9OQU1FOiB7XG4gICAgZGVzY3JpcHRpb246IFwiRGVmaW5lcyB0aGUgdGFyZ2V0IE9TIGZvciB0aGUgYnVpbGQsIHVzZWQgaW4gY3Jvc3MtY29tcGlsYXRpb24gYW5kIG5hdGl2ZSBidWlsZHNcIixcbiAgICB2YWx1ZTogXCJMaW51eFwiLFxuICB9LFxuICBTWVNURU1fUFJPQ0VTU09SOiB7XG4gICAgZGVzY3JpcHRpb246IFwiRGVmaW5lcyB0aGUgdGFyZ2V0IENQVSBhcmNoaXRlY3R1cmVcIixcbiAgICB2YWx1ZTogXCJ3YXNtMzJcIixcbiAgfSxcbiAgUFJPSkVDVF9OQU1FOiB7XG4gICAgZGVzY3JpcHRpb246IFwiTmFtZSBvZiB0aGUgY3VycmVudCBwcm9qZWN0XCIsXG4gICAgdmFsdWU6IFwiXCIsXG4gIH0sXG4gIFBST0pFQ1RfVkVSU0lPTjoge1xuICAgIGRlc2NyaXB0aW9uOiBcIlZlcnNpb24gb2YgdGhlIGN1cnJlbnQgcHJvamVjdFwiLFxuICAgIHZhbHVlOiBcIlwiLFxuICB9LFxuICBQUk9KRUNUX0RFU0NSSVBUSU9OOiB7XG4gICAgZGVzY3JpcHRpb246IFwiRGVzY3JpcHRpb24gb2YgdGhlIGN1cnJlbnQgcHJvamVjdFwiLFxuICAgIHZhbHVlOiBcIlwiLFxuICB9LFxuICBQUk9KRUNUX0hPTUVQQUdFX1VSTDoge1xuICAgIGRlc2NyaXB0aW9uOiBcIkhvbWVwYWdlIFVSTCBvZiB0aGUgY3VycmVudCBwcm9qZWN0XCIsXG4gICAgdmFsdWU6IFwiXCIsXG4gIH0sXG4gIFBST0pFQ1RfU09VUkNFX0RJUjoge1xuICAgIGRlc2NyaXB0aW9uOiBcIkFic29sdXRlIHBhdGggdG8gdGhlIHRvcC1sZXZlbCBzb3VyY2UgZGlyZWN0b3J5IG9mIHRoZSBwcm9qZWN0XCIsXG4gICAgdHlwZTogXCJEaXJQYXRoXCIsXG4gIH0sXG4gIFBST0pFQ1RfQklOQVJZX0RJUjoge1xuICAgIGRlc2NyaXB0aW9uOiBcIkFic29sdXRlIHBhdGggdG8gdGhlIHRvcC1sZXZlbCBidWlsZCAoYmluYXJ5KSBkaXJlY3Rvcnkgb2YgdGhlIHByb2plY3RcIixcbiAgICB0eXBlOiBcIkRpclBhdGhcIixcbiAgfSxcbiAgU0NSSVBUX0ZJTEU6IHtcbiAgICBkZXNjcmlwdGlvbjogXCJGdWxsIHBhdGggdG8gdGhlIGN1cnJlbnQgTWFrZVNjcmlwdCBmaWxlIGJlaW5nIHByb2Nlc3NlZFwiLFxuICAgIHR5cGU6IFwiRmlsZVBhdGhcIixcbiAgfSxcbiAgU0NSSVBUX0RJUjoge1xuICAgIGRlc2NyaXB0aW9uOiBcIkRpcmVjdG9yeSBvZiB0aGUgY3VycmVudCBNYWtlU2NyaXB0IGZpbGUgYmVpbmcgcHJvY2Vzc2VkXCIsXG4gICAgdHlwZTogXCJEaXJQYXRoXCIsXG4gIH0sXG4gIFBBQ0tBR0VfRklMRToge1xuICAgIGRlc2NyaXB0aW9uOiBcIkZpbGVuYW1lIG9mIHByb2plY3QgbWFuaWZlc3QgY29udGFpbmluZyBtZXRhZGF0YSBhbmQgZGVwZW5kZW5jaWVzXCIsXG4gICAgdHlwZTogXCJGaWxlUGF0aFwiLFxuICB9LFxuICBDQUNIRV9GSUxFOiB7XG4gICAgZGVzY3JpcHRpb246IFwiRGVmYXVsdCBmaWxlbmFtZSBvZiB0aGUgQml0TWFrZSBjYWNoZSBzdG9yaW5nIHNldHRpbmdzXCIsXG4gICAgdHlwZTogXCJGaWxlUGF0aFwiLFxuICB9LFxuICBCVUlMRF9UWVBFOiB7XG4gICAgZGVzY3JpcHRpb246IFwiU3BlY2lmaWVzIHRoZSBidWlsZCBjb25maWd1cmF0aW9uIGZvciBjb250cm9sbGluZyBvcHRpbWl6YXRpb24gbGV2ZWxzIGFuZCBkZWJ1ZyBpbmZvcm1hdGlvbiBpbiB0aGUgYnVpbGQgcHJvY2Vzc1wiLFxuICAgIHR5cGU6IFsgREVCVUdfQlVJTERfVFlQRSwgUkVMRUFTRV9CVUlMRF9UWVBFIF0sXG4gICAgdmFsdWU6IFJFTEVBU0VfQlVJTERfVFlQRSxcbiAgfSxcbiAgSU5TVEFMTF9QUkVGSVg6IHtcbiAgICBkZXNjcmlwdGlvbjogXCJUaGUgcm9vdCBkaXJlY3Rvcnkgd2hlcmUgZmlsZXMgd2lsbCBiZSBpbnN0YWxsZWQgYnkgZGVmYXVsdFwiLFxuICAgIHR5cGU6IFwiRGlyUGF0aFwiLFxuICAgIHZhbHVlOiBcIi91c3JcIixcbiAgfSxcbiAgREVTVERJUjoge1xuICAgIGRlc2NyaXB0aW9uOiBcIlRlbXBvcmFyeSBpbnN0YWxsYXRpb24gcm9vdFwiLFxuICAgIHR5cGU6IFwiRGlyUGF0aFwiLFxuICB9LFxuICBTT1VSQ0VfRElSOiB7XG4gICAgZGVzY3JpcHRpb246IFwiUGF0aCB0byB0aGUgc291cmNlIGRpcmVjdG9yeSBjdXJyZW50bHkgYmVpbmcgcHJvY2Vzc2VkXCIsXG4gICAgdHlwZTogXCJEaXJQYXRoXCIsXG4gIH0sXG4gIEJJTkFSWV9ESVI6IHtcbiAgICBkZXNjcmlwdGlvbjogXCJQYXRoIHRvIHRoZSBiaW5hcnkgZGlyZWN0b3J5IGN1cnJlbnRseSBiZWluZyBwcm9jZXNzZWRcIixcbiAgICB0eXBlOiBcIkRpclBhdGhcIixcbiAgfSxcbiAgUE9TSVRJT05fSU5ERVBFTkRFTlRfQ09ERToge1xuICAgIGRlc2NyaXB0aW9uOiBcIkVuYWJsZXMgUG9zaXRpb24tSW5kZXBlbmRlbnQgQ29kZSAoUElDKSBmb3IgYnVpbGRpbmcgc2hhcmVkIGxpYnJhcmllc1wiLFxuICAgIHZhbHVlOiBmYWxzZSxcbiAgfSxcbiAgUFJFVkVOVF9JTlNUQUxMX0ZJTEVTOiB7XG4gICAgZGVzY3JpcHRpb246IFwiUHJldmVudCBpbnN0YWxsYXRpb24gb2YgZmlsZXNcIixcbiAgICB2YWx1ZTogZmFsc2UsXG4gIH0sXG4gIEhPU1RfU1lTVEVNX05BTUU6IHtcbiAgICBkZXNjcmlwdGlvbjogXCJTcGVjaWZpZXMgdGhlIE9TIG9mIHRoZSBtYWNoaW5lIHJ1bm5pbmdcIixcbiAgICB2YWx1ZTogb3MudHlwZSgpLFxuICB9LFxuICBJTkNMVURFUzoge1xuICAgIGRlc2NyaXB0aW9uOiBcIlBhdGhzIHNlYXJjaGVkIGZvciBoZWFkZXIgZmlsZXNcIixcbiAgICB2YWx1ZTogW10sXG4gIH0sXG4gIEFTTV9DT01QSUxFUjoge1xuICAgIGRlc2NyaXB0aW9uOiBcIlBhdGggdG8gdGhlIGFzc2VtYmxlciBjb21waWxlciBkZXRlY3RlZFwiLFxuICAgIHZhbHVlOiBcImNsYW5nXCIsXG4gIH0sXG4gIEFTTV9GTEFHUzoge1xuICAgIGRlc2NyaXB0aW9uOiBcIkZsYWdzIHBhc3NlZCB0byB0aGUgYXNzZW1ibGVyIGNvbXBpbGVyXCIsXG4gICAgdmFsdWU6IFtdLFxuICB9LFxuICBBU01fRkxBR1NfREVCVUc6IHtcbiAgICBkZXNjcmlwdGlvbjogXCJBZGRpdGlvbmFsIGFzc2VtYmxlciBmbGFncyB1c2VkIHdoZW4gYnVpbGRpbmcgaW4gRGVidWcgbW9kZVwiLFxuICAgIHZhbHVlOiBbIFwiLWdcIiBdLFxuICB9LFxuICBBU01fRkxBR1NfUkVMRUFTRToge1xuICAgIGRlc2NyaXB0aW9uOiBcIkFkZGl0aW9uYWwgYXNzZW1ibGVyIGZsYWdzIHVzZWQgd2hlbiBidWlsZGluZyBpbiBSZWxlYXNlIG1vZGVcIixcbiAgICB2YWx1ZTogWyBcIi1PM1wiLCBcIi1ETkRFQlVHXCIgXSxcbiAgfSxcbiAgQ19DT01QSUxFUjoge1xuICAgIGRlc2NyaXB0aW9uOiBcIlBhdGggdG8gdGhlIEMgY29tcGlsZXIgZGV0ZWN0ZWRcIixcbiAgICB2YWx1ZTogXCJjbGFuZ1wiLFxuICB9LFxuICBDX0ZMQUdTOiB7XG4gICAgZGVzY3JpcHRpb246IFwiRmxhZ3MgcGFzc2VkIHRvIHRoZSBDIGNvbXBpbGVyXCIsXG4gICAgdmFsdWU6IFtdLFxuICB9LFxuICBDX0ZMQUdTX0RFQlVHOiB7XG4gICAgZGVzY3JpcHRpb246IFwiQWRkaXRpb25hbCBDIGNvbXBpbGVyIGZsYWdzIHVzZWQgd2hlbiBidWlsZGluZyBpbiBEZWJ1ZyBtb2RlXCIsXG4gICAgdmFsdWU6IFsgXCItZ1wiIF0sXG4gIH0sXG4gIENfRkxBR1NfUkVMRUFTRToge1xuICAgIGRlc2NyaXB0aW9uOiBcIkFkZGl0aW9uYWwgQyBjb21waWxlciBmbGFncyB1c2VkIHdoZW4gYnVpbGRpbmcgaW4gUmVsZWFzZSBtb2RlXCIsXG4gICAgdmFsdWU6IFsgXCItTzNcIiwgXCItRE5ERUJVR1wiIF0sXG4gIH0sXG4gIENYWF9DT01QSUxFUjoge1xuICAgIGRlc2NyaXB0aW9uOiBcIlBhdGggdG8gdGhlIEMrKyBjb21waWxlciBkZXRlY3RlZFwiLFxuICAgIHZhbHVlOiBcImNsYW5nKytcIixcbiAgfSxcbiAgQ1hYX0ZMQUdTOiB7XG4gICAgZGVzY3JpcHRpb246IFwiRmxhZ3MgcGFzc2VkIHRvIHRoZSBDIGNvbXBpbGVyXCIsXG4gICAgdmFsdWU6IFtdLFxuICB9LFxuICBDWFhfRkxBR1NfREVCVUc6IHtcbiAgICBkZXNjcmlwdGlvbjogXCJBZGRpdGlvbmFsIEMrKyBjb21waWxlciBmbGFncyB1c2VkIHdoZW4gYnVpbGRpbmcgaW4gRGVidWcgbW9kZVwiLFxuICAgIHZhbHVlOiBbIFwiLWdcIiBdLFxuICB9LFxuICBDWFhfRkxBR1NfUkVMRUFTRToge1xuICAgIGRlc2NyaXB0aW9uOiBcIkFkZGl0aW9uYWwgQysrIGNvbXBpbGVyIGZsYWdzIHVzZWQgd2hlbiBidWlsZGluZyBpbiBSZWxlYXNlIG1vZGVcIixcbiAgICB2YWx1ZTogWyBcIi1PM1wiLCBcIi1ETkRFQlVHXCIgXSxcbiAgfSxcbiAgQVI6IHtcbiAgICBkZXNjcmlwdGlvbjogXCJQYXRoIHRvIHRoZSBhcmNoaXZlciB0b29sIHVzZWQgdG8gY3JlYXRlIHN0YXRpYyBsaWJyYXJpZXNcIixcbiAgICB2YWx1ZTogXCJsbHZtLWFyXCIsXG4gIH0sXG4gIFJBTkxJQjoge1xuICAgIGRlc2NyaXB0aW9uOiBcIlRvb2wgdXNlZCB0byBnZW5lcmF0ZSBhbiBpbmRleCB0byB0aGUgY29udGVudHMgb2YgYW4gYXJjaGl2ZSAoc3RhdGljIGxpYnJhcnkpXCIsXG4gICAgdmFsdWU6IFwibGx2bS1yYW5saWJcIixcbiAgfSxcbiAgTElOS0VSOiB7XG4gICAgZGVzY3JpcHRpb246IFwiUGF0aCB0byB0aGUgbGlua2VyIHVzZWQgdG8gbGluayBvYmplY3QgZmlsZXMgYW5kIGxpYnJhcmllcyBpbnRvIGV4ZWN1dGFibGVzXCIsXG4gICAgdmFsdWU6IFwid2FzbS1sZFwiLFxuICB9LFxuICBOTToge1xuICAgIGRlc2NyaXB0aW9uOiBcIlBhdGggdG8gdGhlIHRvb2wgdXNlZCB0byBsaXN0IHN5bWJvbHMgZnJvbSBvYmplY3QgZmlsZXMgb3IgYXJjaGl2ZXNcIixcbiAgICB2YWx1ZTogXCJsbHZtLW5tXCIsXG4gIH0sXG4gIE9CSkNPUFk6IHtcbiAgICBkZXNjcmlwdGlvbjogXCJQYXRoIHRvIHRoZSB0b29sIHVzZWQgdG8gY29weSBhbmQgdHJhbnNsYXRlIG9iamVjdCBmaWxlc1wiLFxuICAgIHZhbHVlOiBcImxsdm0tb2JqY29weVwiLFxuICB9LFxuICBPQkpEVU1QOiB7XG4gICAgZGVzY3JpcHRpb246IFwiUGF0aCB0byB0aGUgdG9vbCB1c2VkIHRvIGRpc3BsYXkgaW5mb3JtYXRpb24gYWJvdXQgb2JqZWN0IGZpbGVzLCBzdWNoIGFzIGRpc2Fzc2VtYmx5XCIsXG4gICAgdmFsdWU6IFwibGx2bS1vYmpkdW1wXCIsXG4gIH0sXG4gIFNUUklQOiB7XG4gICAgZGVzY3JpcHRpb246IFwiUGF0aCB0byB0aGUgdG9vbCB1c2VkIHRvIHJlbW92ZSBzeW1ib2xzIGZyb20gb2JqZWN0IGZpbGVzIG9yIGV4ZWN1dGFibGVzIHRvIHJlZHVjZSBzaXplXCIsXG4gICAgdmFsdWU6IFwibGx2bS1zdHJpcFwiLFxuICB9LFxuICBPQkpFQ1RfTElCUkFSWV9QUkVGSVg6IHtcbiAgICBkZXNjcmlwdGlvbjogXCJQcmVmaXggdXNlZCBmb3Igb2JqZWN0IGxpYnJhcmllc1wiLFxuICAgIHZhbHVlOiBcIlwiLFxuICB9LFxuICBPQkpFQ1RfTElCUkFSWV9TVUZGSVg6IHtcbiAgICBkZXNjcmlwdGlvbjogXCJTdWZmaXggdXNlZCBmb3Igb2JqZWN0IGxpYnJhcnkgZmlsZXNcIixcbiAgICB2YWx1ZTogXCIub1wiLFxuICB9LFxuICBPQkpFQ1RfTElOS0VSX0ZMQUdTOiB7XG4gICAgZGVzY3JpcHRpb246IFwiRmxhZ3MgcGFzc2VkIHRvIHRoZSBsaW5rZXIgd2hlbiBjcmVhdGluZyBvYmplY3QgbGlicmFyaWVzXCIsXG4gICAgdmFsdWU6IFtdLFxuICB9LFxuICBTVEFUSUNfTElCUkFSWV9QUkVGSVg6IHtcbiAgICBkZXNjcmlwdGlvbjogXCJQcmVmaXggdXNlZCBmb3Igc3RhdGljIGxpYnJhcnkgZmlsZXNcIixcbiAgICB2YWx1ZTogXCJsaWJcIixcbiAgfSxcbiAgU1RBVElDX0xJQlJBUllfU1VGRklYOiB7XG4gICAgZGVzY3JpcHRpb246IFwiU3VmZml4IHVzZWQgZm9yIHN0YXRpYyBsaWJyYXJ5IGZpbGVzXCIsXG4gICAgdmFsdWU6IFwiLmFcIixcbiAgfSxcbiAgU1RBVElDX0xJTktFUl9GTEFHUzoge1xuICAgIGRlc2NyaXB0aW9uOiBcIkZsYWdzIHBhc3NlZCB0byB0aGUgbGlua2VyIHdoZW4gY3JlYXRpbmcgc3RhdGljIGxpYnJhcmllc1wiLFxuICAgIHZhbHVlOiBbXSxcbiAgfSxcbiAgU0hBUkVEX0xJQlJBUllfUFJFRklYOiB7XG4gICAgZGVzY3JpcHRpb246IFwiUHJlZml4IHVzZWQgZm9yIHNoYXJlZCBsaWJyYXJ5IGZpbGVzXCIsXG4gICAgdmFsdWU6IFwibGliXCIsXG4gIH0sXG4gIFNIQVJFRF9MSUJSQVJZX1NVRkZJWDoge1xuICAgIGRlc2NyaXB0aW9uOiBcIlN1ZmZpeCB1c2VkIGZvciBzaGFyZWQgbGlicmFyeSBmaWxlc1wiLFxuICAgIHZhbHVlOiBcIi5zb1wiLFxuICB9LFxuICBTSEFSRURfTElOS0VSX0ZMQUdTOiB7XG4gICAgZGVzY3JpcHRpb246IFwiRmxhZ3MgcGFzc2VkIHRvIHRoZSBsaW5rZXIgd2hlbiBjcmVhdGluZyBzaGFyZWQgbGlicmFyaWVzXCIsXG4gICAgdmFsdWU6IFtdLFxuICB9LFxuICBFWEVDVVRBQkxFX1NVRkZJWDoge1xuICAgIGRlc2NyaXB0aW9uOiBcIlN1ZmZpeCB1c2VkIGZvciBleGVjdXRhYmxlIGZpbGVzXCIsXG4gICAgdmFsdWU6IFwiXCIsXG4gIH0sXG4gIEVYRV9MSU5LRVJfRkxBR1M6IHtcbiAgICBkZXNjcmlwdGlvbjogXCJGbGFncyBwYXNzZWQgdG8gdGhlIGxpbmtlciB3aGVuIGNyZWF0aW5nIGV4ZWN1dGFibGVzXCIsXG4gICAgdmFsdWU6IFtdLFxuICB9LFxuICBHTE9CQUxfQ09OVEVYVF9KU09OOiB7XG4gICAgZGVzY3JpcHRpb246IFwiRmlsZW5hbWUgZm9yIEpTT04gb2YgdGhlIEdsb2JhbCBjb250ZXh0XCIsXG4gICAgdHlwZTogXCJGaWxlUGF0aFwiLFxuICB9LFxuICBUQVJHRVRfR09BTFNfSlNPTjoge1xuICAgIGRlc2NyaXB0aW9uOiBcIkZpbGVuYW1lIGZvciBKU09OIG9mIHRoZSBUYXJnZXQgR29hbHNcIixcbiAgICB0eXBlOiBcIkZpbGVQYXRoXCIsXG4gIH0sXG59O1xuIiwiLypcbiAqIE1JVCBMaWNlbnNlXG4gKlxuICogQ29weXJpZ2h0IChjKSAyMDI1ICBZdXJpaSBZYWt1YmluICh5dXJpaS55YWt1YmluQGdtYWlsLmNvbSlcbiAqXG4gKiBQZXJtaXNzaW9uIGlzIGdyYW50ZWQgdG8gdXNlLCBjb3B5LCBtb2RpZnksIGFuZCBkaXN0cmlidXRlIHRoaXMgc29mdHdhcmVcbiAqIHVuZGVyIHRoZSBNSVQgTGljZW5zZS4gU2VlIExJQ0VOU0UgZmlsZSBmb3IgZGV0YWlscy5cbiAqL1xuXG5leHBvcnQgY29uc3QgREVCVUdfQlVJTERfVFlQRSA9IFwiRGVidWdcIjtcbmV4cG9ydCBjb25zdCBSRUxFQVNFX0JVSUxEX1RZUEUgPSBcIlJlbGVhc2VcIjtcbiIsIi8qXG4gKiBNSVQgTGljZW5zZVxuICpcbiAqIENvcHlyaWdodCAoYykgMjAyNSAgWXVyaWkgWWFrdWJpbiAoeXVyaWkueWFrdWJpbkBnbWFpbC5jb20pXG4gKlxuICogUGVybWlzc2lvbiBpcyBncmFudGVkIHRvIHVzZSwgY29weSwgbW9kaWZ5LCBhbmQgZGlzdHJpYnV0ZSB0aGlzIHNvZnR3YXJlXG4gKiB1bmRlciB0aGUgTUlUIExpY2Vuc2UuIFNlZSBMSUNFTlNFIGZpbGUgZm9yIGRldGFpbHMuXG4gKi9cblxuZXhwb3J0IGludGVyZmFjZSBJTG9nZ2VyIHtcbiAgdHJhY2UobWVzc2FnZT86IGFueSwgLi4ucGFyYW1zOiBhbnlbXSk6IHZvaWQ7XG4gIGRlYnVnKG1lc3NhZ2U/OiBhbnksIC4uLnBhcmFtczogYW55W10pOiB2b2lkO1xuICBpbmZvKG1lc3NhZ2U/OiBhbnksIC4uLnBhcmFtczogYW55W10pOiB2b2lkO1xuICB3YXJuKG1lc3NhZ2U/OiBhbnksIC4uLnBhcmFtczogYW55W10pOiB2b2lkO1xuICBlcnJvcihtZXNzYWdlPzogYW55LCAuLi5wYXJhbXM6IGFueVtdKTogdm9pZDtcbn07XG5cbmV4cG9ydCBmdW5jdGlvbiBjcmVhdGVMb2dnZXIodXJsOiBzdHJpbmcpOiBJTG9nZ2VyIHtcbiAgcmV0dXJuIHtcbiAgICB0cmFjZTogY29uc29sZS50cmFjZS5iaW5kKGNvbnNvbGUpLFxuICAgIGRlYnVnOiBjb25zb2xlLmRlYnVnLmJpbmQoY29uc29sZSksXG4gICAgaW5mbzogY29uc29sZS5pbmZvLmJpbmQoY29uc29sZSksXG4gICAgd2FybjogY29uc29sZS53YXJuLmJpbmQoY29uc29sZSksXG4gICAgZXJyb3I6IGNvbnNvbGUuZXJyb3IuYmluZChjb25zb2xlKSxcbiAgfTtcbn1cbiIsImNvbnN0IG9zID0gcmVxdWlyZSgnbm9kZTpvcycpO1xuY29uc3QgZnMgPSByZXF1aXJlKCdub2RlOmZzJyk7XG5jb25zdCBwYXRoID0gcmVxdWlyZSgnbm9kZTpwYXRoJyk7XG5cbmNvbnN0IHsgc3Bhd25Bc3luYyB9ID0gcmVxdWlyZShcIkAvdXRpbHMvQ2hpbGRQcm9jZXNzXCIpO1xuY29uc3QgeyBDTUFLRV9MSVNUU19UWFQsIFZhbHVlVHlwZSB9ID0gcmVxdWlyZShcIkAvY21ha2UvQ29uc3RhbnRzXCIpO1xuY29uc3QgeyBjb252ZXJ0VG9WYWx1ZSB9ID0gcmVxdWlyZShcIkAvY21ha2UvSGVscGVyXCIpO1xuXG5mdW5jdGlvbiB0b1ZhclR5cGUoa2V5LCB2YWwpIHtcbiAgY29uc3QgbWFwID0ge1xuICAgIENNQUtFX0lOU1RBTExfUFJFRklYOiBWYWx1ZVR5cGUuUEFUSCxcbiAgICBDTUFLRV9UT09MQ0hBSU5fRklMRTogVmFsdWVUeXBlLkZJTEVQQVRILFxuICB9O1xuXG4gIGlmICh0eXBlb2YgdmFsID09PSBcImJvb2xlYW5cIilcbiAgICByZXR1cm4gVmFsdWVUeXBlLkJPT0w7XG5cbiAgaWYgKG1hcC5oYXNPd25Qcm9wZXJ0eShrZXkpKVxuICAgIHJldHVybiBtYXBba2V5XTtcblxuICByZXR1cm4gVmFsdWVUeXBlLlNUUklORztcbn1cblxuZnVuY3Rpb24gdG9DYWNoZUVudHJ5KG5hbWUsIHZhbClcbntcbiAgY29uc3QgdHlwZSA9IHRvVmFyVHlwZShuYW1lLCB2YWwpO1xuICBjb25zdCB2YWx1ZSA9IGNvbnZlcnRUb1ZhbHVlKHZhbCk7XG4gIHJldHVybiBgJHtuYW1lfToke3R5cGV9PSR7dmFsdWV9YDtcbn1cblxuYXN5bmMgZnVuY3Rpb24gY29uZmlndXJlKGFyZ3MpXG57XG4gIGNvbnN0IHNwYXduQXJncyA9IFsgJy1HJywgYXJncy5nZW5lcmF0b3IgXTtcbiAgZm9yIChjb25zdCBba2V5LCB2YWxdIG9mIE9iamVjdC5lbnRyaWVzKGFyZ3MuY2FjaGVWYXJpYWJsZXMpKVxuICAgIHNwYXduQXJncy5wdXNoKCctRCcsIHRvQ2FjaGVFbnRyeShrZXksIHZhbCkpO1xuICBzcGF3bkFyZ3MucHVzaCgnLVMnLCBhcmdzLnNvdXJjZURpcik7XG4gIHNwYXduQXJncy5wdXNoKCctQicsIGFyZ3MuYmluYXJ5RGlyKTtcblxuICBjb25zdCByZXMgPSBhd2FpdCBzcGF3bkFzeW5jKFwiY21ha2VcIiwgc3Bhd25BcmdzLCB7XG4gICAgY3dkOiBhcmdzLmJpbmFyeURpcixcbiAgICBlbnY6IGFyZ3MuZW52aXJvbm1lbnQgfHwgcHJvY2Vzcy5lbnYsXG4gICAgZXh0cmE6IHtcbiAgICAgIG91dHB1dDogYGNtYWtlLmNvbmZpZ3VyZS5sb2dgLFxuICAgIH0sXG4gIH0pO1xuICBpZiAocmVzLnN0YXR1cyAhPT0gMCkge1xuICAgIHRocm93IGBDTWFrZS5jb25maWd1cmUgcmV0dXJuZWQgc3RhdHVzICR7cmVzLnN0YXR1c31gO1xuICB9XG59XG5cbmFzeW5jIGZ1bmN0aW9uIGJ1aWxkKGFyZ3MpXG57XG4gIGF3YWl0IGNvbmZpZ3VyZShhcmdzKTtcblxuICBjb25zdCBzcGF3bkFyZ3MgPSBbXG4gICAgJy0tYnVpbGQnLCAnLicsXG4gICAgJy0tcGFyYWxsZWwnLCBvcy5hdmFpbGFibGVQYXJhbGxlbGlzbSgpLFxuICBdO1xuICBjb25zdCByZXMgPSBhd2FpdCBzcGF3bkFzeW5jKFwiY21ha2VcIiwgc3Bhd25BcmdzLCB7XG4gICAgY3dkOiBhcmdzLmJpbmFyeURpcixcbiAgICBlbnY6IGFyZ3MuZW52aXJvbm1lbnQgfHwgcHJvY2Vzcy5lbnYsXG4gICAgZXh0cmE6IHtcbiAgICAgIG91dHB1dDogYGNtYWtlLmJ1aWxkLmxvZ2AsXG4gICAgfSxcbiAgfSk7XG4gIGlmIChyZXMuc3RhdHVzICE9PSAwKSB7XG4gICAgdGhyb3cgYENNYWtlLmJ1aWxkIHJldHVybmVkIHN0YXR1cyAke3Jlcy5zdGF0dXN9YDtcbiAgfVxufVxuXG5hc3luYyBmdW5jdGlvbiBpbnN0YWxsKGFyZ3MpXG57XG4gIGF3YWl0IGNvbmZpZ3VyZShhcmdzKTtcblxuICBjb25zdCBzcGF3bkFyZ3MgPSBbXG4gICAgJy0taW5zdGFsbCcsXG4gICAgJy4nLFxuICBdO1xuICBpZiAoYXJncy5pbnN0YWxsRGlyKSB7XG4gICAgc3Bhd25BcmdzLnB1c2goJy0tcHJlZml4JywgYXJncy5pbnN0YWxsRGlyKTtcbiAgfVxuICBjb25zdCByZXMgPSBhd2FpdCBzcGF3bkFzeW5jKFwiY21ha2VcIiwgc3Bhd25BcmdzLCB7XG4gICAgY3dkOiBhcmdzLmJpbmFyeURpcixcbiAgICBlbnY6IGFyZ3MuZW52aXJvbm1lbnQgfHwgcHJvY2Vzcy5lbnYsXG4gICAgZXh0cmE6IHtcbiAgICAgIG91dHB1dDogYGNtYWtlLmluc3RhbGwubG9nYCxcbiAgICB9LFxuICB9KTtcbiAgaWYgKHJlcy5zdGF0dXMgIT09IDApIHtcbiAgICB0aHJvdyBgQ01ha2UuaW5zdGFsbCByZXR1cm5lZCBzdGF0dXMgJHtyZXMuc3RhdHVzfWA7XG4gIH1cbn1cblxuYXN5bmMgZnVuY3Rpb24gY3Rlc3QoYXJncylcbntcbiAgYXdhaXQgYnVpbGQoYXJncyk7XG5cbiAgY29uc3Qgc3Bhd25BcmdzID0gW1xuICBdO1xuICBjb25zdCByZXMgPSBhd2FpdCBzcGF3bkFzeW5jKFwiY3Rlc3RcIiwgc3Bhd25BcmdzLCB7XG4gICAgY3dkOiBhcmdzLmJpbmFyeURpcixcbiAgICBlbnY6IGFyZ3MuZW52aXJvbm1lbnQgfHwgcHJvY2Vzcy5lbnYsXG4gICAgZXh0cmE6IHtcbiAgICAgIG91dHB1dDogYGNtYWtlLmN0ZXN0LmxvZ2AsXG4gICAgfSxcbiAgfSk7XG4gIGlmIChyZXMuc3RhdHVzICE9PSAwKSB7XG4gICAgdGhyb3cgYENUZXN0IHJldHVybmVkIHN0YXR1cyAke3Jlcy5zdGF0dXN9YDtcbiAgfVxufVxuXG5hc3luYyBmdW5jdGlvbiBleHRyYWN0KGFyZ3MpXG57XG4gIGNvbnN0IHNwYXduQXJncyA9IFsgXCItRVwiLCBcInRhclwiLCBcIi14dmZcIiwgYXJncy5maWxlbmFtZSBdO1xuICBjb25zdCByZXMgPSBhd2FpdCBzcGF3bkFzeW5jKFwiY21ha2VcIiwgc3Bhd25BcmdzLCB7XG4gICAgY3dkOiBhcmdzLndvcmtEaXIgfHwgYXJncy5zb3VyY2VEaXIgfHwgYXJncy5iaW5hcnlEaXIsXG4gICAgZW52OiBhcmdzLmVudmlyb25tZW50IHx8IHByb2Nlc3MuZW52LFxuICAgIGV4dHJhOiB7XG4gICAgICBvdXRwdXQ6IGFyZ3MubG9nRmlsZSB8fCBgY21ha2UuZXh0cmFjdC5sb2dgLFxuICAgIH0sXG4gIH0pO1xuICBpZiAocmVzLnN0YXR1cyAhPT0gMCkge1xuICAgIHRocm93IGBFeHRyYWN0IHJldHVybmVkIHN0YXR1cyAke3Jlcy5zdGF0dXN9YDtcbiAgfVxufVxuXG5hc3luYyBmdW5jdGlvbiBnZXRQcm9qZWN0SW5mbyhzb3VyY2UpXG57XG4gIGNvbnN0IHN0YXQgPSBhd2FpdCBmcy5wcm9taXNlcy5zdGF0KHNvdXJjZSk7XG4gIGlmIChzdGF0LmlzRGlyZWN0b3J5KCkpXG4gICAgc291cmNlID0gcGF0aC5yZXNvbHZlKHNvdXJjZSwgQ01BS0VfTElTVFNfVFhUKTtcbiAgY29uc3QgY29udGVudCA9IGF3YWl0IGZzLnByb21pc2VzLnJlYWRGaWxlKHNvdXJjZSwgeyBlbmNvZGluZzogJ3V0ZjgnIH0pO1xuXG4gIGNvbnN0IHByb2plY3RQYXR0ZXJuID0gL3Byb2plY3QgKlxcKCAqKFteIF0rKSAqKFteKV0qKVxcKS87XG4gIGNvbnN0IHZlcnNpb25QYXR0ZXJuID0gL1ZFUlNJT04gKyhbXiBdKykvO1xuICBsZXQgbWF0Y2ggPSBjb250ZW50Lm1hdGNoKHByb2plY3RQYXR0ZXJuKTtcbiAgY29uc3QgbmFtZSA9IG1hdGNoWzFdO1xuICBjb25zdCBwcm9qZWN0Q29udGVudCA9IG1hdGNoWzJdO1xuICBtYXRjaCA9IHByb2plY3RDb250ZW50Lm1hdGNoKHZlcnNpb25QYXR0ZXJuKTtcbiAgY29uc3QgdmVyc2lvbiA9IG1hdGNoWzFdO1xuXG4gIHJldHVybiB7XG4gICAgbmFtZSxcbiAgICB2ZXJzaW9uLFxuICB9O1xufVxuXG5mdW5jdGlvbiBsaW5lVG9TaW5nbENvbW1lbnQobGluZSlcbntcbiAgcmV0dXJuIFwiIyBcIiArIGxpbmU7XG59XG5cbmZ1bmN0aW9uIGxpbmVUb011bHRpcGxlQ29tbWVudChsaW5lKVxue1xuICByZXR1cm4gYCNbPT09WyAke2xpbmV9IF09PT1dYDtcbn1cblxuZnVuY3Rpb24gZ2VuZXJhdGVkU2NyaXB0TmFtZUNvbW1lbnQoZmlsZW5hbWUpXG57XG4gIHJldHVybiBsaW5lVG9TaW5nbENvbW1lbnQoXCJHZW5lcmF0ZWQgZnJvbSBcIiArIHBhdGguYmFzZW5hbWUoZmlsZW5hbWUpKTtcbn1cblxubW9kdWxlLmV4cG9ydHMgPSB7XG4gIGNvbmZpZ3VyZSxcbiAgYnVpbGQsXG4gIGluc3RhbGwsXG4gIGN0ZXN0LFxuICBleHRyYWN0LFxuICBnZXRQcm9qZWN0SW5mbyxcbiAgbGluZVRvU2luZ2xDb21tZW50LFxuICBsaW5lVG9NdWx0aXBsZUNvbW1lbnQsXG4gIGdlbmVyYXRlZFNjcmlwdE5hbWVDb21tZW50LFxufTtcbiIsIi8qXG4gKiBNSVQgTGljZW5zZVxuICpcbiAqIENvcHlyaWdodCAoYykgMjAyNSAgWXVyaWkgWWFrdWJpbiAoeXVyaWkueWFrdWJpbkBnbWFpbC5jb20pXG4gKlxuICogUGVybWlzc2lvbiBpcyBncmFudGVkIHRvIHVzZSwgY29weSwgbW9kaWZ5LCBhbmQgZGlzdHJpYnV0ZSB0aGlzIHNvZnR3YXJlXG4gKiB1bmRlciB0aGUgTUlUIExpY2Vuc2UuIFNlZSBMSUNFTlNFIGZpbGUgZm9yIGRldGFpbHMuXG4gKi9cblxuaW1wb3J0IHBhdGggZnJvbSBcIm5vZGU6cGF0aFwiO1xuaW1wb3J0IGZzIGZyb20gXCJub2RlOmZzXCI7XG5pbXBvcnQgeyBzcGF3biB9IGZyb20gXCJub2RlOmNoaWxkX3Byb2Nlc3NcIjtcblxuZXhwb3J0IGZ1bmN0aW9uIHNwYXduQXN5bmMoY29tbWFuZDogc3RyaW5nLCBhcmdzOiBzdHJpbmdbXSwgb3B0aW9ucz86IGFueSk6IFByb21pc2U8dW5rbm93bj4ge1xuICBsZXQgZmQgPSBudWxsO1xuICBsZXQgdmVyYm9zZSA9IGZhbHNlO1xuICBpZiAob3B0aW9ucyAmJiBvcHRpb25zLmV4dHJhKSB7XG4gICAgaWYgKG9wdGlvbnMuZXh0cmEudmVyYm9zZSlcbiAgICAgIHZlcmJvc2UgPSB0cnVlO1xuICAgIGlmIChvcHRpb25zLmV4dHJhLm91dHB1dCkge1xuICAgICAgbGV0IGxvZ2ZpbGUgPSBvcHRpb25zLmV4dHJhLm91dHB1dDtcbiAgICAgIGlmICghcGF0aC5pc0Fic29sdXRlKGxvZ2ZpbGUpICYmIG9wdGlvbnMuY3dkKSB7XG4gICAgICAgIGxvZ2ZpbGUgPSBwYXRoLnJlc29sdmUob3B0aW9ucy5jd2QsIGxvZ2ZpbGUpO1xuICAgICAgfVxuICAgICAgZmQgPSBmcy5vcGVuU3luYyhsb2dmaWxlLCBcIncrXCIsIDBvNjY2KTtcbiAgICB9XG4gIH1cbiAgcmV0dXJuIG5ldyBQcm9taXNlKChyZXNvbHZlLCByZWplY3QpID0+IHtcbiAgICBpZiAoZmQgfHwgdmVyYm9zZSkge1xuICAgICAgdmVyYm9zZSAmJiBjb25zb2xlLmluZm8oWyBwYXRoLmJhc2VuYW1lKGNvbW1hbmQpLCAuLi5hcmdzIF0uam9pbihcIiBcIikpO1xuICAgICAgZmQgJiYgZnMud3JpdGVTeW5jKGZkLCBKU09OLnN0cmluZ2lmeSh7Y29tbWFuZCwgYXJncywgb3B0aW9ucyB9LCBudWxsLCAyKSArIFwiXFxuXCIpO1xuICAgIH1cbiAgICBjb25zdCBleGVjID0gc3Bhd24oY29tbWFuZCwgYXJncywgb3B0aW9ucyk7XG4gICAgZXhlYy5zdGRvdXQub24oXCJkYXRhXCIsIChkYXRhKSA9PiB7XG4gICAgICBwcm9jZXNzLnN0ZG91dC53cml0ZShkYXRhKTtcbiAgICAgIGZkICYmIGZzLndyaXRlU3luYyhmZCwgZGF0YSk7XG4gICAgfSk7XG4gICAgZXhlYy5zdGRlcnIub24oXCJkYXRhXCIsIChkYXRhKSA9PiB7XG4gICAgICBwcm9jZXNzLnN0ZGVyci53cml0ZShkYXRhKTtcbiAgICAgIGZkICYmIGZzLndyaXRlU3luYyhmZCwgZGF0YSk7XG4gICAgfSk7XG4gICAgZXhlYy5vbihcImNsb3NlXCIsIChzdGF0dXMpID0+IHtcbiAgICAgIGZkICYmIGZzLmNsb3NlU3luYyhmZCk7XG4gICAgICByZXNvbHZlKHtzdGF0dXN9KTtcbiAgICB9KTtcbiAgfSk7XG59XG4iLCIvKlxuICogTUlUIExpY2Vuc2VcbiAqXG4gKiBDb3B5cmlnaHQgKGMpIDIwMjUgIFl1cmlpIFlha3ViaW4gKHl1cmlpLnlha3ViaW5AZ21haWwuY29tKVxuICpcbiAqIFBlcm1pc3Npb24gaXMgZ3JhbnRlZCB0byB1c2UsIGNvcHksIG1vZGlmeSwgYW5kIGRpc3RyaWJ1dGUgdGhpcyBzb2Z0d2FyZVxuICogdW5kZXIgdGhlIE1JVCBMaWNlbnNlLiBTZWUgTElDRU5TRSBmaWxlIGZvciBkZXRhaWxzLlxuICovXG5cbmltcG9ydCBmcyBmcm9tIFwibm9kZTpmc1wiO1xuaW1wb3J0IHBhdGggZnJvbSBcIm5vZGU6cGF0aFwiO1xuaW1wb3J0IHVybCBmcm9tIFwibm9kZTp1cmxcIjtcblxuZXhwb3J0IGFzeW5jIGZ1bmN0aW9uIHBhdGhFeGlzdHMocGF0aDogc3RyaW5nKSB7XG4gIHRyeSB7XG4gICAgcmV0dXJuICEhKGF3YWl0IGZzLnByb21pc2VzLnN0YXQocGF0aCkpO1xuICB9IGNhdGNoIHtcbiAgICByZXR1cm4gZmFsc2U7XG4gIH1cbn1cblxuZXhwb3J0IGZ1bmN0aW9uIHBhdGhFeGlzdHNTeW5jKHBhdGg6IHN0cmluZykge1xuICB0cnkge1xuICAgIHJldHVybiAhIWZzLnN0YXRTeW5jKHBhdGgpO1xuICB9IGNhdGNoIHtcbiAgICByZXR1cm4gZmFsc2U7XG4gIH1cbn1cblxuZXhwb3J0IGFzeW5jIGZ1bmN0aW9uIGZpbGVFeGlzdHMocGF0aDogc3RyaW5nKSB7XG4gIHRyeSB7XG4gICAgcmV0dXJuIChhd2FpdCBmcy5wcm9taXNlcy5zdGF0KHBhdGgpKS5pc0ZpbGUoKTtcbiAgfSBjYXRjaCB7XG4gICAgcmV0dXJuIGZhbHNlO1xuICB9XG59XG5cbmV4cG9ydCBmdW5jdGlvbiBmaWxlRXhpc3RzU3luYyhwYXRoOiBzdHJpbmcpIHtcbiAgdHJ5IHtcbiAgICByZXR1cm4gZnMuc3RhdFN5bmMocGF0aCkuaXNGaWxlKCk7XG4gIH0gY2F0Y2gge1xuICAgIHJldHVybiBmYWxzZTtcbiAgfSBcbn1cblxuZXhwb3J0IGFzeW5jIGZ1bmN0aW9uIGRpcmVjdG9yeUV4aXN0cyhwYXRoOiBzdHJpbmcpIHtcbiAgdHJ5IHtcbiAgICByZXR1cm4gKGF3YWl0IGZzLnByb21pc2VzLnN0YXQocGF0aCkpLmlzRGlyZWN0b3J5KCk7XG4gIH0gY2F0Y2gge1xuICAgIHJldHVybiBmYWxzZTtcbiAgfVxufVxuXG5leHBvcnQgZnVuY3Rpb24gZGlyZWN0b3J5RXhpc3RzU3luYyhwYXRoOiBzdHJpbmcpIHtcbiAgdHJ5IHtcbiAgIHJldHVybiBmcy5zdGF0U3luYyhwYXRoKS5pc0RpcmVjdG9yeSgpO1xuICB9IGNhdGNoIHtcbiAgICByZXR1cm4gZmFsc2U7XG4gIH1cbn1cblxuZXhwb3J0IGZ1bmN0aW9uIGV4dG5hbWUoZnVsbHBhdGg6IHN0cmluZywgb3B0aW9uczogYW55KSB7XG4gIGlmIChvcHRpb25zPy5sb25nZXN0KSB7XG4gICAgY29uc3QgZmlsZW5hbWUgPSBwYXRoLmJhc2VuYW1lKGZ1bGxwYXRoKTtcbiAgICBjb25zdCBpbmRleCA9IGZpbGVuYW1lLmluZGV4T2YoJy4nKTtcbiAgICByZXR1cm4gaW5kZXggIT0gLTEgPyBmaWxlbmFtZS5zdWJzdHJpbmcoaW5kZXgpIDogJyc7XG4gIH1cblxuICByZXR1cm4gcGF0aC5leHRuYW1lKGZ1bGxwYXRoKTtcbn1cblxuZXhwb3J0IGFzeW5jIGZ1bmN0aW9uIGZpbGVMaXN0KGRpcm5hbWU6IHN0cmluZywgb3B0aW9uczogYW55KTogUHJvbWlzZTxBcnJheTxzdHJpbmc+PiB7XG4gIGNvbnN0IGxpc3QgPSBuZXcgQXJyYXk8c3RyaW5nPjtcbiAgaWYgKGF3YWl0IGRpcmVjdG9yeUV4aXN0cyhkaXJuYW1lKSkge1xuICAgIGZvciAoY29uc3QgaXRlciBvZiBhd2FpdCBmcy5wcm9taXNlcy5yZWFkZGlyKGRpcm5hbWUpKSB7XG4gICAgICBjb25zdCBmaWxlcGF0aCA9IHBhdGgucmVzb2x2ZShkaXJuYW1lLCBpdGVyKTtcbiAgICAgIGNvbnN0IHN0YXQgPSBhd2FpdCBmcy5wcm9taXNlcy5zdGF0KGZpbGVwYXRoKTtcbiAgICAgIGlmIChzdGF0LmlzRmlsZSgpKSB7XG4gICAgICAgIGxpc3QucHVzaChvcHRpb25zLnJlbGF0aXZlID8gcGF0aC5yZWxhdGl2ZShvcHRpb25zLnJlbGF0aXZlLCBmaWxlcGF0aCkgOiBmaWxlcGF0aCk7XG4gICAgICB9XG4gICAgICBlbHNlIGlmIChvcHRpb25zLnJlY3Vyc2l2ZSAmJiBzdGF0LmlzRGlyZWN0b3J5KCkpIHtcbiAgICAgICAgZm9yIChjb25zdCBmbmFtZSBvZiBhd2FpdCBmaWxlTGlzdChmaWxlcGF0aCwgb3B0aW9ucykpXG4gICAgICAgICAgbGlzdC5wdXNoKGZuYW1lKTtcbiAgICAgIH1cbiAgICB9XG4gIH1cbiAgcmV0dXJuIGxpc3Q7XG59XG5cbmV4cG9ydCBhc3luYyBmdW5jdGlvbiBzYXZlSWZEaWZmZXJlbnQoZmlsZW5hbWU6IHN0cmluZywgY29udGVudDogc3RyaW5nKSB7XG4gIGlmIChhd2FpdCBmaWxlRXhpc3RzKGZpbGVuYW1lKSkge1xuICAgIGNvbnN0IG9sZENvbnRlbnQgPSBhd2FpdCBmcy5wcm9taXNlcy5yZWFkRmlsZShmaWxlbmFtZSwgeyBlbmNvZGluZzogXCJ1dGY4XCIgfSk7XG4gICAgaWYgKGNvbnRlbnQgPT0gb2xkQ29udGVudClcbiAgICAgIHJldHVybiBmYWxzZTtcbiAgfVxuXG4gIGF3YWl0IGZzLnByb21pc2VzLm1rZGlyKHBhdGguZGlybmFtZShmaWxlbmFtZSksIHsgcmVjdXJzaXZlOiB0cnVlIH0pO1xuICBhd2FpdCBmcy5wcm9taXNlcy53cml0ZUZpbGUoZmlsZW5hbWUsIGNvbnRlbnQsIHsgZW5jb2Rpbmc6IFwidXRmOFwiIH0pO1xuXG4gIHJldHVybiB0cnVlO1xufVxuXG5leHBvcnQgZnVuY3Rpb24gZ2V0UGF0aFN0cmluZyhzdHI6IHN0cmluZykge1xuICByZXR1cm4gc3RyLnN0YXJ0c1dpdGgoXCJmaWxlOi8vXCIpID8gdXJsLmZpbGVVUkxUb1BhdGgoc3RyKSA6IHN0cjtcbn1cbiIsIi8qXG4gKiBNSVQgTGljZW5zZVxuICpcbiAqIENvcHlyaWdodCAoYykgMjAyNSAgWXVyaWkgWWFrdWJpbiAoeXVyaWkueWFrdWJpbkBnbWFpbC5jb20pXG4gKlxuICogUGVybWlzc2lvbiBpcyBncmFudGVkIHRvIHVzZSwgY29weSwgbW9kaWZ5LCBhbmQgZGlzdHJpYnV0ZSB0aGlzIHNvZnR3YXJlXG4gKiB1bmRlciB0aGUgTUlUIExpY2Vuc2UuIFNlZSBMSUNFTlNFIGZpbGUgZm9yIGRldGFpbHMuXG4gKi9cblxuaW1wb3J0IHBhdGggZnJvbSBcIm5vZGU6cGF0aFwiO1xuaW1wb3J0IGZzIGZyb20gXCJub2RlOmZzXCI7XG5pbXBvcnQgaHR0cCBmcm9tIFwiaHR0cFwiO1xuaW1wb3J0IGh0dHBzIGZyb20gXCJodHRwc1wiO1xuXG5pbXBvcnQgeyBjcmVhdGVMb2dnZXIgfSBmcm9tIFwiQC9sb2dnZXJcIjtcblxuY29uc3QgbG9nZ2VyID0gY3JlYXRlTG9nZ2VyKGltcG9ydC5tZXRhLnVybCk7XG5cbmNvbnN0IGh0dHBPcHRpb25zID0ge1xuICBtZXRob2Q6ICdHRVQnLFxuICB0aW1lb3V0OiA1MDAwLFxuICBoZWFkZXJzOiB7XG4gICAgXCJVc2VyLUFnZW50XCI6IFBST0pFQ1RfTkFNRSArIFwiL1wiICsgUFJPSkVDVF9WRVJTSU9OLFxuICAgIFwiQWNjZXB0XCI6IFwiKi8qXCIsXG4gIH0sXG59O1xuXG5mdW5jdGlvbiBodHRwUmVxdWVzdCh1cmw6IHN0cmluZywgb3B0aW9uczogaHR0cC5SZXF1ZXN0T3B0aW9ucyB8IGh0dHBzLlJlcXVlc3RPcHRpb25zLCBjYWxsYmFjazogYW55KSB7XG4gIGlmICh1cmwuc3RhcnRzV2l0aChcImh0dHBzOi8vXCIpKVxuICAgIHJldHVybiBodHRwcy5yZXF1ZXN0KHVybCwgb3B0aW9ucywgY2FsbGJhY2spO1xuICByZXR1cm4gaHR0cC5yZXF1ZXN0KHVybCwgb3B0aW9ucywgY2FsbGJhY2spO1xufTtcblxuZXhwb3J0IGZ1bmN0aW9uIHJlcXVlc3RHZXQodXJsOiBzdHJpbmcpIHtcbiAgcmV0dXJuIG5ldyBQcm9taXNlKChyZXNvbHZlLCByZWplY3QpID0+IHtcblxuICAgIGNvbnN0IG9uRXJyb3IgPSAoZXJyOiBhbnkpID0+IHtcbiAgICAgIGNvbnN0IG1lc3NhZ2UgPSBcIkVuY291bnRlcmVkIGFuIGVycm9yIHRyeWluZyB0byBtYWtlIGEgcmVxdWVzdDogXCIgKyBlcnIubWVzc2FnZTtcbiAgICAgIGxvZ2dlci5lcnJvcihtZXNzYWdlLCBlcnIpO1xuICAgICAgcmVqZWN0KG1lc3NhZ2UpO1xuICAgIH07XG5cbiAgICBjb25zdCBvblRpbWVvdXQgPSAocmVxdWVzdDogYW55KSA9PiB7XG4gICAgICByZXF1ZXN0LmRlc3Ryb3koKTtcbiAgICAgIGxvZ2dlci5lcnJvcihcIiAgVGltZW91dFwiLCB1cmwpO1xuICAgICAgcmVqZWN0KFwiVGltZW91dFwiKTtcbiAgICB9XG5cbiAgICBjb25zdCBvblJlcXVlc3QgPSAocmVzcG9uc2U6IGFueSkgPT4ge1xuICAgICAgc3dpdGNoIChyZXNwb25zZS5zdGF0dXNDb2RlKSB7XG4gICAgICBjYXNlIDIwMDpcbiAgICAgICAgY29uc3QgY2h1bmtzOiBBcnJheTxCdWZmZXI+ID0gW107XG4gICAgICAgIHJlc3BvbnNlLm9uKFwiZGF0YVwiLCAoY2h1bms6IEJ1ZmZlcikgPT4gY2h1bmtzLnB1c2goY2h1bmspKTtcbiAgICAgICAgcmVzcG9uc2Uub24oXCJlbmRcIiwgKCkgPT4gcmVzb2x2ZShCdWZmZXIuY29uY2F0KGNodW5rcykpKTtcbiAgICAgICAgcmVzcG9uc2Uub24oJ2Nsb3NlJywgKCkgPT4gbG9nZ2VyLmluZm8oJyAgQ2xvc2UnKSk7XG4gICAgICAgIGJyZWFrO1xuXG4gICAgICBjYXNlIDMwMTpcbiAgICAgIGNhc2UgMzAyOlxuICAgICAgICByZXNwb25zZS5yZXN1bWUoKTtcbiAgICAgICAgbG9nZ2VyLmluZm8oYFJlZGlyZWN0IHRvICR7cmVzcG9uc2UuaGVhZGVycy5sb2NhdGlvbn1gKTtcbiAgICAgICAgY29uc3QgcmVxdWVzdCA9IGh0dHBSZXF1ZXN0KHJlc3BvbnNlLmhlYWRlcnMubG9jYXRpb24sIGh0dHBPcHRpb25zLCBvblJlcXVlc3QpO1xuICAgICAgICByZXF1ZXN0Lm9uKCd0aW1lb3V0Jywgb25UaW1lb3V0LmJpbmQobnVsbCwgcmVxdWVzdCkpO1xuICAgICAgICByZXF1ZXN0Lm9uKCdlcnJvcicsIG9uRXJyb3IpO1xuICAgICAgICByZXF1ZXN0LmVuZCgpO1xuICAgICAgICBicmVhaztcblxuICAgICAgZGVmYXVsdDpcbiAgICAgICAgcmVzcG9uc2UucmVzdW1lKCk7XG4gICAgICAgIGNvbnN0IG1lc3NhZ2UgPSBcIkRpZCBub3QgZ2V0IGFuIE9LIGZyb20gdGhlIHNlcnZlci4gQ29kZTogXCIgKyByZXNwb25zZS5zdGF0dXNDb2RlO1xuICAgICAgICBsb2dnZXIuZXJyb3IobWVzc2FnZSk7XG4gICAgICAgIHJlamVjdChtZXNzYWdlKTtcbiAgICAgICAgYnJlYWs7XG4gICAgICB9XG4gICAgfTtcblxuICAgIGxvZ2dlci5pbmZvKGB3Z2V0ICR7dXJsfWApO1xuICAgIGNvbnN0IHJlcXVlc3QgPSBodHRwUmVxdWVzdCh1cmwsIGh0dHBPcHRpb25zLCBvblJlcXVlc3QpO1xuICAgIHJlcXVlc3Qub24oJ3RpbWVvdXQnLCBvblRpbWVvdXQuYmluZChudWxsLCByZXF1ZXN0KSk7XG4gICAgcmVxdWVzdC5vbignZXJyb3InLCBvbkVycm9yKTtcbiAgICByZXF1ZXN0LmVuZCgpO1xuICB9KTtcbn07XG5cbmV4cG9ydCBmdW5jdGlvbiBkb3dubG9hZEZpbGUodXJsOiBzdHJpbmcsIGZpbGU6IHN0cmluZykge1xuICByZXR1cm4gbmV3IFByb21pc2UoKHJlc29sdmUsIHJlamVjdCkgPT4ge1xuICAgIGNvbnN0IGZpbGVuYW1lID0gcGF0aC5iYXNlbmFtZSh1cmwpO1xuXG4gICAgY29uc3QgY2xpZW50ID0gKCgpID0+IHtcbiAgICAgIGlmIChmaWxlKSB7XG4gICAgICAgIGNvbnN0IGZkID0gZnMub3BlblN5bmMoZmlsZSwgXCJ3XCIpO1xuICAgICAgICByZXR1cm4ge1xuICAgICAgICAgIG9uRGF0YTogKGNodW5rOiBCdWZmZXIpID0+IHtcbiAgICAgICAgICAgIGZzLndyaXRlU3luYyhmZCwgY2h1bmspO1xuICAgICAgICAgIH0sXG4gICAgICAgICAgb25FbmQ6ICgpID0+IHtcbiAgICAgICAgICAgIGZzLmNsb3NlU3luYyhmZCk7XG4gICAgICAgICAgICByZXNvbHZlKHVuZGVmaW5lZCk7XG4gICAgICAgICAgfSxcbiAgICAgICAgfTtcbiAgICAgIH1cbiAgICAgIGVsc2Uge1xuICAgICAgICBjb25zdCBjaHVua3M6IEFycmF5PEJ1ZmZlcj4gPSBbXTtcbiAgICAgICAgcmV0dXJuIHtcbiAgICAgICAgICBvbkRhdGE6IChjaHVuazogQnVmZmVyKSA9PiB7XG4gICAgICAgICAgICBjaHVua3MucHVzaChjaHVuayk7XG4gICAgICAgICAgfSxcbiAgICAgICAgICBvbkVuZDogKCkgPT4ge1xuICAgICAgICAgICAgcmVzb2x2ZShCdWZmZXIuY29uY2F0KGNodW5rcykpO1xuICAgICAgICAgIH0sXG4gICAgICAgIH07XG4gICAgICB9XG4gICAgfSkoKTtcbiAgXG4gICAgY29uc3Qgc3RhcnRSZXF1ZXN0ID0gKHVybDogc3RyaW5nLCBjYWxsYmFjazogYW55KSA9PiB7XG4gICAgICBjb25zdCByZXF1ZXN0ID0gaHR0cHMucmVxdWVzdCh1cmwsIGh0dHBPcHRpb25zLCBjYWxsYmFjayk7XG4gICAgICBpZiAocmVxdWVzdCkge1xuICAgICAgICByZXF1ZXN0Lm9uKCdlcnJvcicsIChlcnJvcikgPT4gcmVqZWN0KGVycm9yKSk7XG4gICAgICAgIHJlcXVlc3QuZW5kKCk7IFxuICAgICAgfVxuICAgICAgZWxzZSB7XG4gICAgICAgIHJlamVjdChgVXJsIHNjaGVtZSBub3Qgc3VwcG9ydGVkIGZvciAke3VybH1gKTtcbiAgICAgIH1cbiAgICB9O1xuXG4gICAgY29uc3Qgb25SZXF1ZXN0ID0gKHJlc3BvbnNlOiBhbnkpID0+IHtcbiAgICAgIHN3aXRjaCAocmVzcG9uc2Uuc3RhdHVzQ29kZSkge1xuICAgICAgY2FzZSAyMDA6XG4gICAgICAgIGxvZ2dlci5pbmZvKGBDb25uY3RlZCB0byAke3Jlc3BvbnNlLnJlcS5ob3N0fWApO1xuICAgICAgICBsb2dnZXIuaW5mbyhgRG93bmxvYWRpbmcgJHtmaWxlbmFtZX1gKTtcbiAgICAgICAgcmVzcG9uc2Uub24oJ2RhdGEnLCBjbGllbnQub25EYXRhKTtcbiAgICAgICAgcmVzcG9uc2Uub24oJ2VuZCcsIGNsaWVudC5vbkVuZCk7XG4gICAgICAgIHJlc3BvbnNlLm9uKCdjbG9zZScsICgpID0+IGxvZ2dlci5pbmZvKGBEb25lYCkpO1xuICAgICAgICBicmVhaztcblxuICAgICAgY2FzZSAzMDE6XG4gICAgICBjYXNlIDMwMjpcbiAgICAgICAgcmVzcG9uc2UucmVzdW1lKCk7XG4gICAgICAgIGxvZ2dlci5pbmZvKGBSZXNvbHZpbmcgJHtyZXNwb25zZS5oZWFkZXJzLmxvY2F0aW9ufWApO1xuICAgICAgICBzdGFydFJlcXVlc3QocmVzcG9uc2UuaGVhZGVycy5sb2NhdGlvbiwgb25SZXF1ZXN0KTtcbiAgICAgICAgYnJlYWs7XG5cbiAgICAgIGRlZmF1bHQ6XG4gICAgICAgIHJlc3BvbnNlLnJlc3VtZSgpO1xuICAgICAgICByZWplY3QoYERpZCBub3QgZ2V0IGFuIE9LIGZyb20gdGhlIHNlcnZlci4gQ29kZTogJHtyZXNwb25zZS5zdGF0dXNDb2RlfWApO1xuICAgICAgICBicmVhaztcbiAgICAgIH1cbiAgICB9O1xuXG4gICAgbG9nZ2VyLmluZm8oYFJlcXVlc3QgdG8gJHt1cmx9YCk7XG4gICAgc3RhcnRSZXF1ZXN0KHVybCwgb25SZXF1ZXN0KTtcbiAgfSk7XG59XG4iLCIvKlxuICogTUlUIExpY2Vuc2VcbiAqXG4gKiBDb3B5cmlnaHQgKGMpIDIwMjUgIFl1cmlpIFlha3ViaW4gKHl1cmlpLnlha3ViaW5AZ21haWwuY29tKVxuICpcbiAqIFBlcm1pc3Npb24gaXMgZ3JhbnRlZCB0byB1c2UsIGNvcHksIG1vZGlmeSwgYW5kIGRpc3RyaWJ1dGUgdGhpcyBzb2Z0d2FyZVxuICogdW5kZXIgdGhlIE1JVCBMaWNlbnNlLiBTZWUgTElDRU5TRSBmaWxlIGZvciBkZXRhaWxzLlxuICovXG5cbmV4cG9ydCBjb25zdCBpbXBvcnRNb2R1bGUgPSBhc3luYyAobmFtZSkgPT4gaW1wb3J0KC8qIHdlYnBhY2tJZ25vcmU6IHRydWUgKi8gbmFtZSk7XG4iLCJpbXBvcnQgZnMgZnJvbSBcIm5vZGU6ZnNcIjtcbmltcG9ydCBwYXRoIGZyb20gXCJub2RlOnBhdGhcIjtcblxuaW1wb3J0IHsgZmlsZUxpc3QgfSBmcm9tIFwiQC91dGlscy9GaWxlU3lzdGVtXCI7XG5pbXBvcnQgeyBjcmVhdGVMb2dnZXIgfSBmcm9tIFwiQC9sb2dnZXJcIjtcblxuY29uc3QgbG9nZ2VyID0gY3JlYXRlTG9nZ2VyKGltcG9ydC5tZXRhLnVybCk7XG5cbmV4cG9ydCBhc3luYyBmdW5jdGlvbiBtYWtlUGF0Y2goc3JjRGlyOiBzdHJpbmcsIGRlc3REaXI6IHN0cmluZykge1xuICBsb2dnZXIuaW5mbyhgTWFrZSBwYXRjaCAke3NyY0Rpcn0gdG8gJHtkZXN0RGlyfWApO1xuICBjb25zdCBsaXN0ID0gYXdhaXQgZmlsZUxpc3Qoc3JjRGlyLCB7IHJlbGF0aXZlOiBzcmNEaXIsIHJlY3Vyc2l2ZTogdHJ1ZSB9KTtcbiAgZm9yIChjb25zdCBpdGVyIG9mIGxpc3QpIHtcbiAgICBjb25zdCBzb3VyY2UgPSBwYXRoLnJlc29sdmUoc3JjRGlyLCBpdGVyKTtcbiAgICBjb25zdCBkZXN0aW5hdGlvbiA9IHBhdGgucmVzb2x2ZShkZXN0RGlyLCBpdGVyKTtcbiAgICBhd2FpdCBmcy5wcm9taXNlcy5jcChzb3VyY2UsIGRlc3RpbmF0aW9uLCB7IGZvcmNlOiB0cnVlIH0pO1xuICAgIGxvZ2dlci5pbmZvKGAgUmVwbGFjZWQgJHtpdGVyfWApO1xuICB9XG59XG4iLCIvKlxuICogTUlUIExpY2Vuc2VcbiAqXG4gKiBDb3B5cmlnaHQgKGMpIDIwMjUgIFl1cmlpIFlha3ViaW4gKHl1cmlpLnlha3ViaW5AZ21haWwuY29tKVxuICpcbiAqIFBlcm1pc3Npb24gaXMgZ3JhbnRlZCB0byB1c2UsIGNvcHksIG1vZGlmeSwgYW5kIGRpc3RyaWJ1dGUgdGhpcyBzb2Z0d2FyZVxuICogdW5kZXIgdGhlIE1JVCBMaWNlbnNlLiBTZWUgTElDRU5TRSBmaWxlIGZvciBkZXRhaWxzLlxuICovXG5cbmNvbnN0IHJlcXVpcmVJbXBsID0gZXZhbChcInJlcXVpcmVcIik7XG5cbmV4cG9ydCBmdW5jdGlvbiByZXF1aXJlUmVzb2x2ZShuYW1lOiBzdHJpbmcpIHtcbiAgaWYgKHR5cGVvZiBpbXBvcnQubWV0YS5yZXNvbHZlID09PSAnZnVuY3Rpb24nKVxuICAgIHJldHVybiBpbXBvcnQubWV0YS5yZXNvbHZlKG5hbWUpO1xuICBpZiAodHlwZW9mIHJlcXVpcmVJbXBsICE9PSAndW5kZWZpbmVkJylcbiAgICByZXR1cm4gcmVxdWlyZUltcGwucmVzb2x2ZShuYW1lKTtcbiAgdGhyb3cgbmV3IEVycm9yKFwiTm8gY29tcGF0aWJsZSBtb2R1bGUgcmVzb2x2ZXIgZm91bmRcIik7XG59XG5cbmV4cG9ydCB7IGltcG9ydE1vZHVsZSB9IGZyb20gXCIuL0ltcG9ydE1vZHVsZS5tanNcIjtcbiIsIi8qXG4gKiBNSVQgTGljZW5zZVxuICpcbiAqIENvcHlyaWdodCAoYykgMjAyNSAgWXVyaWkgWWFrdWJpbiAoeXVyaWkueWFrdWJpbkBnbWFpbC5jb20pXG4gKlxuICogUGVybWlzc2lvbiBpcyBncmFudGVkIHRvIHVzZSwgY29weSwgbW9kaWZ5LCBhbmQgZGlzdHJpYnV0ZSB0aGlzIHNvZnR3YXJlXG4gKiB1bmRlciB0aGUgTUlUIExpY2Vuc2UuIFNlZSBMSUNFTlNFIGZpbGUgZm9yIGRldGFpbHMuXG4gKi9cblxuZXhwb3J0IGZ1bmN0aW9uIGVxdWFsVmFsdWUoYTogYW55LCBiOiBhbnkpOiBib29sZWFuIHtcbiAgaWYgKGEgPT09IGIpXG4gICAgcmV0dXJuIHRydWU7XG5cbiAgaWYgKGEgPT09IHVuZGVmaW5lZCB8fCBiID09PSB1bmRlZmluZWQpXG4gICAgcmV0dXJuIGZhbHNlO1xuXG4gIGlmICh0eXBlb2YgYSAhPT0gXCJvYmplY3RcIiB8fCB0eXBlb2YgYiAhPT0gXCJvYmplY3RcIilcbiAgICByZXR1cm4gZmFsc2U7XG5cbiAgY29uc3QgazEgPSBPYmplY3Qua2V5cyhhKTtcbiAgY29uc3QgazIgPSBPYmplY3Qua2V5cyhiKTtcblxuICBpZiAoazEubGVuZ3RoICE9IGsyLmxlbmd0aClcbiAgICByZXR1cm4gZmFsc2U7XG5cbiAgZm9yIChjb25zdCBrZXkgb2YgazEpIHtcbiAgICBpZiAoIU9iamVjdC5oYXNPd24oYiwga2V5KSB8fCAhZXF1YWxWYWx1ZShhW2tleV0sIGJba2V5XSkpXG4gICAgICByZXR1cm4gZmFsc2U7XG4gIH1cblxuICByZXR1cm4gdHJ1ZTtcbn1cblxuZXhwb3J0IGZ1bmN0aW9uIGNvcHlWYWx1ZShvOiBhbnkpOiBhbnkge1xuICBpZiAoIW8gfHwgdHlwZW9mIG8gIT09IFwib2JqZWN0XCIpXG4gICAgcmV0dXJuIG87XG4gIGlmIChBcnJheS5pc0FycmF5KG8pKSB7XG4gICAgY29uc3QgcmVzdWx0ID0gW107XG4gICAgZm9yIChjb25zdCBpdGVyIG9mIG8pXG4gICAgICByZXN1bHQucHVzaChjb3B5VmFsdWUoaXRlcikpO1xuICAgIHJldHVybiByZXN1bHQ7XG4gIH1cbiAgZWxzZSB7XG4gICAgY29uc3QgcmVzdWx0ID0ge30gYXMgYW55O1xuICAgIGZvciAoY29uc3QgW2tleSx2YWxdIG9mIE9iamVjdC5lbnRyaWVzKG8pKVxuICAgICAgcmVzdWx0W2tleV0gPSBjb3B5VmFsdWUodmFsKTtcbiAgICByZXR1cm4gcmVzdWx0O1xuICB9XG59XG5cbmV4cG9ydCBmdW5jdGlvbiBhc3NpZ25PYmplY3QodGFyZ2V0OiBhbnksIHNvdXJjZTogYW55KSB7XG4gIGlmIChBcnJheS5pc0FycmF5KHRhcmdldCkgJiYgQXJyYXkuaXNBcnJheShzb3VyY2UpKSB7XG4gICAgZm9yIChjb25zdCBpdGVyIG9mIHNvdXJjZSlcbiAgICAgIHRhcmdldC5wdXNoKGl0ZXIpO1xuICB9XG4gIGVsc2Uge1xuICAgIGZvciAoY29uc3Qga2V5IG9mIE9iamVjdC5rZXlzKHNvdXJjZSkpIHtcbiAgICAgIGNvbnN0IGEgPSB0YXJnZXRba2V5XSwgYiA9IHNvdXJjZVtrZXldO1xuICAgICAgaWYgKGEgJiYgdHlwZW9mIGEgPT09IFwib2JqZWN0XCIgJiYgYiAmJiB0eXBlb2YgYiA9PT0gXCJvYmplY3RcIilcbiAgICAgICAgYXNzaWduT2JqZWN0KGEsIGIpO1xuICAgICAgZWxzZVxuICAgICAgICB0YXJnZXRba2V5XSA9IGNvcHlWYWx1ZShiKTtcbiAgICB9XG4gIH1cbn1cblxuZXhwb3J0IGZ1bmN0aW9uIGFycmF5V3JhcHBlcih2YWx1ZTogYW55KSB7XG4gIGlmICh2YWx1ZSA9PT0gdW5kZWZpbmVkIHx8IEFycmF5LmlzQXJyYXkodmFsdWUpKVxuICAgIHJldHVybiB2YWx1ZTtcbiAgcmV0dXJuIFsgdmFsdWUgXTtcbn1cbiIsImNvbnN0IGZzID0gcmVxdWlyZSgnZnMnKTtcblxuY2xhc3MgU2V0dGluZ3NTdG9yYWdlIHtcbiAgX2ZpbGVuYW1lO1xuICBfZW5jb2RpbmcgPSBcInV0Zi04XCI7XG4gIF9zZXR0aW5ncztcbiAgX2N1cnJlbnQ7XG5cbiAgY29uc3RydWN0b3IoZmlsZW5hbWUpXG4gIHtcbiAgICB0aGlzLl9maWxlbmFtZSA9IGZpbGVuYW1lO1xuICB9XG5cbiAgYXN5bmMgcHVzaChuYW1lKVxuICB7XG4gICAgaWYgKCF0aGlzLl9zZXR0aW5ncylcbiAgICAgIGF3YWl0IHRoaXMubG9hZCgpO1xuICAgIGxldCBvYmplY3QgPSB0aGlzLl9jdXJyZW50Lm9iamVjdFtuYW1lXTtcbiAgICBpZiAoIW9iamVjdClcbiAgICAgIG9iamVjdCA9IHRoaXMuX2N1cnJlbnQub2JqZWN0W25hbWVdID0ge307XG4gICAgdGhpcy5fY3VycmVudCA9IHsgcGFyZW50OiB0aGlzLl9jdXJyZW50LCBvYmplY3QgfTtcbiAgfVxuXG4gIGFzeW5jIHBvcCgpXG4gIHtcbiAgICBpZiAoIXRoaXMuX3NldHRpbmdzKVxuICAgICAgYXdhaXQgdGhpcy5sb2FkKCk7XG4gICAgY29uc29sZS5hc3NlcnQodGhpcy5fY3VycmVudC5wYXJlbnQpO1xuICAgIHRoaXMuX2N1cnJlbnQgPSB0aGlzLl9jdXJyZW50LnBhcmVudDtcbiAgfVxuXG4gIGFzeW5jIGdldChuYW1lKVxuICB7XG4gICAgaWYgKCF0aGlzLl9zZXR0aW5ncylcbiAgICAgIGF3YWl0IHRoaXMubG9hZCgpO1xuICAgIHJldHVybiB0aGlzLl9jdXJyZW50Lm9iamVjdFtuYW1lXTtcbiAgfVxuXG4gIGFzeW5jIHNldChuYW1lLCB2YWx1ZSlcbiAge1xuICAgIGlmICghdGhpcy5fc2V0dGluZ3MpXG4gICAgICBhd2FpdCB0aGlzLmxvYWQoKTtcbiAgICB0aGlzLl9jdXJyZW50Lm9iamVjdFtuYW1lXSA9IHZhbHVlO1xuICAgIGF3YWl0IHRoaXMuc2F2ZSgpO1xuICB9XG5cbiAgYXN5bmMgbG9hZCgpXG4gIHtcbiAgICB0cnkge1xuICAgICAgY29uc3QgY29udGVudCA9IGF3YWl0IGZzLnByb21pc2VzLnJlYWRGaWxlKHRoaXMuX2ZpbGVuYW1lLCB0aGlzLl9lbmNvZGluZyk7XG4gICAgICB0aGlzLl9zZXR0aW5ncyA9IEpTT04ucGFyc2UoY29udGVudCk7XG4gICAgfVxuICAgIGNhdGNoIChlKSB7XG4gICAgICB0aGlzLl9zZXR0aW5ncyA9IHt9O1xuICAgIH1cbiAgICB0aGlzLl9jdXJyZW50ID1cbiAgICB7XG4gICAgICBwYXJlbnQ6IG51bGwsXG4gICAgICBvYmplY3Q6IHRoaXMuX3NldHRpbmdzLFxuICAgIH07XG4gIH1cblxuICBhc3luYyBzYXZlKClcbiAge1xuICAgIGNvbnN0IHNwYWNlID0gMjtcbiAgICBjb25zdCBjb250ZW50ID0gSlNPTi5zdHJpbmdpZnkodGhpcy5fc2V0dGluZ3MsIHVuZGVmaW5lZCwgc3BhY2UpO1xuICAgIGF3YWl0IGZzLnByb21pc2VzLndyaXRlRmlsZSh0aGlzLl9maWxlbmFtZSwgY29udGVudCwgeyBlbmNvZGluZzogdGhpcy5fZW5jb2RpbmcsIGZsYWc6ICd3JywgZmx1c2g6IHRydWUgfSk7XG4gIH1cbn07XG5cbm1vZHVsZS5leHBvcnRzID0ge1xuICBTZXR0aW5nc1N0b3JhZ2UsXG59O1xuIiwiLypcbiAqIE1JVCBMaWNlbnNlXG4gKlxuICogQ29weXJpZ2h0IChjKSAyMDI1ICBZdXJpaSBZYWt1YmluICh5dXJpaS55YWt1YmluQGdtYWlsLmNvbSlcbiAqXG4gKiBQZXJtaXNzaW9uIGlzIGdyYW50ZWQgdG8gdXNlLCBjb3B5LCBtb2RpZnksIGFuZCBkaXN0cmlidXRlIHRoaXMgc29mdHdhcmVcbiAqIHVuZGVyIHRoZSBNSVQgTGljZW5zZS4gU2VlIExJQ0VOU0UgZmlsZSBmb3IgZGV0YWlscy5cbiAqL1xuXG5leHBvcnQgZnVuY3Rpb24gZW5zdXJlQm9vbGVhbih2YWx1ZTogYW55KSB7XG4gIGlmICh0eXBlb2YgdmFsdWUgPT09IFwiYm9vbGVhblwiKVxuICAgIHJldHVybiB2YWx1ZTtcbiAgdGhyb3cgbmV3IEVycm9yKGBUaGUgJyR7dmFsdWV9JyBpcyBub3QgYSBib29sZWFuYCk7XG59XG5cbmV4cG9ydCBmdW5jdGlvbiBlbnN1cmVTdHJpbmcodmFsdWU6IGFueSkge1xuICBpZiAodHlwZW9mIHZhbHVlID09PSBcInN0cmluZ1wiKVxuICAgIHJldHVybiB2YWx1ZTtcbiAgdGhyb3cgbmV3IEVycm9yKGBUaGUgJyR7dmFsdWV9JyBpcyBub3QgYSBzdHJpbmdgKTtcbn1cbiIsIm1vZHVsZS5leHBvcnRzID0gcmVxdWlyZShcImZzXCIpOyIsIm1vZHVsZS5leHBvcnRzID0gcmVxdWlyZShcImh0dHBcIik7IiwibW9kdWxlLmV4cG9ydHMgPSByZXF1aXJlKFwiaHR0cHNcIik7IiwibW9kdWxlLmV4cG9ydHMgPSByZXF1aXJlKFwibm9kZTpjaGlsZF9wcm9jZXNzXCIpOyIsIm1vZHVsZS5leHBvcnRzID0gcmVxdWlyZShcIm5vZGU6ZnNcIik7IiwibW9kdWxlLmV4cG9ydHMgPSByZXF1aXJlKFwibm9kZTpvc1wiKTsiLCJtb2R1bGUuZXhwb3J0cyA9IHJlcXVpcmUoXCJub2RlOnBhdGhcIik7IiwibW9kdWxlLmV4cG9ydHMgPSByZXF1aXJlKFwibm9kZTp1cmxcIik7IiwiLy8gVGhlIG1vZHVsZSBjYWNoZVxudmFyIF9fd2VicGFja19tb2R1bGVfY2FjaGVfXyA9IHt9O1xuXG4vLyBUaGUgcmVxdWlyZSBmdW5jdGlvblxuZnVuY3Rpb24gX193ZWJwYWNrX3JlcXVpcmVfXyhtb2R1bGVJZCkge1xuXHQvLyBDaGVjayBpZiBtb2R1bGUgaXMgaW4gY2FjaGVcblx0dmFyIGNhY2hlZE1vZHVsZSA9IF9fd2VicGFja19tb2R1bGVfY2FjaGVfX1ttb2R1bGVJZF07XG5cdGlmIChjYWNoZWRNb2R1bGUgIT09IHVuZGVmaW5lZCkge1xuXHRcdHJldHVybiBjYWNoZWRNb2R1bGUuZXhwb3J0cztcblx0fVxuXHQvLyBDcmVhdGUgYSBuZXcgbW9kdWxlIChhbmQgcHV0IGl0IGludG8gdGhlIGNhY2hlKVxuXHR2YXIgbW9kdWxlID0gX193ZWJwYWNrX21vZHVsZV9jYWNoZV9fW21vZHVsZUlkXSA9IHtcblx0XHQvLyBubyBtb2R1bGUuaWQgbmVlZGVkXG5cdFx0Ly8gbm8gbW9kdWxlLmxvYWRlZCBuZWVkZWRcblx0XHRleHBvcnRzOiB7fVxuXHR9O1xuXG5cdC8vIEV4ZWN1dGUgdGhlIG1vZHVsZSBmdW5jdGlvblxuXHRfX3dlYnBhY2tfbW9kdWxlc19fW21vZHVsZUlkXShtb2R1bGUsIG1vZHVsZS5leHBvcnRzLCBfX3dlYnBhY2tfcmVxdWlyZV9fKTtcblxuXHQvLyBSZXR1cm4gdGhlIGV4cG9ydHMgb2YgdGhlIG1vZHVsZVxuXHRyZXR1cm4gbW9kdWxlLmV4cG9ydHM7XG59XG5cbiIsIi8vIGdldERlZmF1bHRFeHBvcnQgZnVuY3Rpb24gZm9yIGNvbXBhdGliaWxpdHkgd2l0aCBub24taGFybW9ueSBtb2R1bGVzXG5fX3dlYnBhY2tfcmVxdWlyZV9fLm4gPSAobW9kdWxlKSA9PiB7XG5cdHZhciBnZXR0ZXIgPSBtb2R1bGUgJiYgbW9kdWxlLl9fZXNNb2R1bGUgP1xuXHRcdCgpID0+IChtb2R1bGVbJ2RlZmF1bHQnXSkgOlxuXHRcdCgpID0+IChtb2R1bGUpO1xuXHRfX3dlYnBhY2tfcmVxdWlyZV9fLmQoZ2V0dGVyLCB7IGE6IGdldHRlciB9KTtcblx0cmV0dXJuIGdldHRlcjtcbn07IiwiLy8gZGVmaW5lIGdldHRlciBmdW5jdGlvbnMgZm9yIGhhcm1vbnkgZXhwb3J0c1xuX193ZWJwYWNrX3JlcXVpcmVfXy5kID0gKGV4cG9ydHMsIGRlZmluaXRpb24pID0+IHtcblx0Zm9yKHZhciBrZXkgaW4gZGVmaW5pdGlvbikge1xuXHRcdGlmKF9fd2VicGFja19yZXF1aXJlX18ubyhkZWZpbml0aW9uLCBrZXkpICYmICFfX3dlYnBhY2tfcmVxdWlyZV9fLm8oZXhwb3J0cywga2V5KSkge1xuXHRcdFx0T2JqZWN0LmRlZmluZVByb3BlcnR5KGV4cG9ydHMsIGtleSwgeyBlbnVtZXJhYmxlOiB0cnVlLCBnZXQ6IGRlZmluaXRpb25ba2V5XSB9KTtcblx0XHR9XG5cdH1cbn07IiwiX193ZWJwYWNrX3JlcXVpcmVfXy5vID0gKG9iaiwgcHJvcCkgPT4gKE9iamVjdC5wcm90b3R5cGUuaGFzT3duUHJvcGVydHkuY2FsbChvYmosIHByb3ApKSIsIi8vIGRlZmluZSBfX2VzTW9kdWxlIG9uIGV4cG9ydHNcbl9fd2VicGFja19yZXF1aXJlX18uciA9IChleHBvcnRzKSA9PiB7XG5cdGlmKHR5cGVvZiBTeW1ib2wgIT09ICd1bmRlZmluZWQnICYmIFN5bWJvbC50b1N0cmluZ1RhZykge1xuXHRcdE9iamVjdC5kZWZpbmVQcm9wZXJ0eShleHBvcnRzLCBTeW1ib2wudG9TdHJpbmdUYWcsIHsgdmFsdWU6ICdNb2R1bGUnIH0pO1xuXHR9XG5cdE9iamVjdC5kZWZpbmVQcm9wZXJ0eShleHBvcnRzLCAnX19lc01vZHVsZScsIHsgdmFsdWU6IHRydWUgfSk7XG59OyIsImltcG9ydCB1cmwgZnJvbSBcIm5vZGU6dXJsXCI7XG5pbXBvcnQgcGF0aCBmcm9tIFwibm9kZTpwYXRoXCI7XG5cbmltcG9ydCB7IFJ1blNjcmlwdENvbnRleHQgfSBmcm9tIFwiLi9SdW5TY3JpcHRDb250ZXh0Lm1qc1wiO1xuaW1wb3J0IGluaXRIYW5kbGVyIGZyb20gXCIuL0luaXRIYW5kbGVyLm1qc1wiO1xuaW1wb3J0IGJ1aWxkSGFuZGxlciBmcm9tIFwiLi9CdWlsZEhhbmRsZXIubWpzXCI7XG5cbmNvbnN0IF9fZmlsZW5hbWUgPSB1cmwuZmlsZVVSTFRvUGF0aChpbXBvcnQubWV0YS51cmwpO1xuY29uc3QgX19kaXJuYW1lID0gcGF0aC5kaXJuYW1lKF9fZmlsZW5hbWUpO1xuXG5jb25zdCBoYW5kbGVyTWFwID0ge1xuICBkZWZhdWx0OiBidWlsZEhhbmRsZXIsXG4gIGluaXQ6IGluaXRIYW5kbGVyLFxuICBidWlsZDogYnVpbGRIYW5kbGVyLFxufTtcblxuZnVuY3Rpb24gdG9PcHRpb25LZXkobmFtZSlcbntcbiAgaWYgKCFuYW1lLnN0YXJ0c1dpdGgoXCItLVwiKSlcbiAgICByZXR1cm4gbnVsbDtcblxuICBuYW1lID0gbmFtZS5zdWJzdHJpbmcoMikudG9Mb3dlckNhc2UoKTtcbiAgaWYgKCFuYW1lLmxlbmd0aClcbiAgICByZXR1cm4gbnVsbDtcblxuICBsZXQga2V5ID0gbmFtZS5jaGFyQXQoMCk7XG4gIGlmICgha2V5Lm1hdGNoKC9bYS16XS8pKVxuICAgIHJldHVybiBudWxsO1xuXG4gIGxldCBoeXBoZW4gPSAwO1xuICBmb3IgKGxldCBpID0gMTsgaSA8IG5hbWUubGVuZ3RoOyBpKyspIHtcbiAgICBjb25zdCBjaCA9IG5hbWUuY2hhckF0KGkpO1xuICAgIGlmIChjaC5tYXRjaCgvW2EtejAtOV0vKSkge1xuICAgICAga2V5ICs9IChoeXBoZW4gPyBjaC50b1VwcGVyQ2FzZSgpIDogY2gpXG4gICAgICBoeXBoZW4gPSAwO1xuICAgIH1cbiAgICBlbHNlIGlmIChjaCA9PSBcIi1cIikge1xuICAgICAgaWYgKCsraHlwaGVuID4gMSlcbiAgICAgICAgcmV0dXJuIG51bGw7XG4gICAgfVxuICB9XG5cbiAgcmV0dXJuIGh5cGhlbiA/IG51bGwgOiBrZXk7XG59XG5cbmFzeW5jIGZ1bmN0aW9uIHJ1blNjcmlwdCgpXG57XG4gIGNvbnN0IG9wdGlvbnMgPSB7XG4gICAgaGFuZGxlcjogXCJkZWZhdWx0XCIsXG4gICAgbm9kZUV4ZWN1dGFibGU6IG51bGwsXG4gICAgY3VycmVudFNjcmlwdDogbnVsbCxcbiAgICBzY3JpcHREaXI6IF9fZGlybmFtZSxcbiAgICByb290RGlyOiBwYXRoLmRpcm5hbWUoX19kaXJuYW1lKSxcbiAgICB3b3JrRGlyOiBwcm9jZXNzLmN3ZCgpLFxuICAgIGVudjoge30sXG4gIH07XG5cbiAgaWYgKHByb2Nlc3MuYXJndi5sZW5ndGggPiAwKVxuICAgIG9wdGlvbnMubm9kZUV4ZWN1dGFibGUgPSBwcm9jZXNzLmFyZ3ZbMF07XG4gIGlmIChwcm9jZXNzLmFyZ3YubGVuZ3RoID4gMSlcbiAgICBvcHRpb25zLmN1cnJlbnRTY3JpcHQgPSBwcm9jZXNzLmFyZ3ZbMV07XG5cbiAgbGV0IGFyZ3NJbmRleCA9IHByb2Nlc3MuYXJndi5sZW5ndGg7XG4gIGlmIChwcm9jZXNzLmFyZ3YubGVuZ3RoID4gMikge1xuICAgIGFyZ3NJbmRleCA9IDI7XG4gICAgY29uc3QgaGFuZGxlciA9IHByb2Nlc3MuYXJndlthcmdzSW5kZXhdO1xuICAgIGlmICghaGFuZGxlci5zdGFydHNXaXRoKFwiLS1cIikpIHtcbiAgICAgIG9wdGlvbnMuaGFuZGxlciA9IGhhbmRsZXI7XG4gICAgICBhcmdzSW5kZXgrKztcbiAgICB9XG4gIH1cblxuICBpZiAoIWhhbmRsZXJNYXAuaGFzT3duUHJvcGVydHkob3B0aW9ucy5oYW5kbGVyKSkge1xuICAgIGNvbnN0IHNjcmlwdE5hbWUgPSBvcHRpb25zLmN1cnJlbnRTY3JpcHQgPyBwYXRoLmJhc2VuYW1lKG9wdGlvbnMuY3VycmVudFNjcmlwdCkgOiBcIndhc211eFwiO1xuICAgIHRocm93IGBUaGUgJHtzY3JpcHROYW1lfSBkb2VzIG5vdCBzdXBwb3J0IHRoZSAke29wdGlvbnMuaGFuZGxlcn0gY29tbWFuZGA7XG4gIH1cblxuICBsZXQgbGFzdEtleSA9IG51bGw7XG4gIHdoaWxlIChhcmdzSW5kZXggPCBwcm9jZXNzLmFyZ3YubGVuZ3RoKSB7XG4gICAgY29uc3QgaXRlciA9IHByb2Nlc3MuYXJndlthcmdzSW5kZXgrK107XG4gICAgaWYgKGl0ZXIuc3RhcnRzV2l0aChcIi0tXCIpKSB7XG4gICAgICBjb25zdCBrZXkgPSB0b09wdGlvbktleShpdGVyKTtcbiAgICAgIGlmICgha2V5KVxuICAgICAgICB0aHJvdyBgT3B0aW9uICR7aXRlcn0gaXMgbm90IHN1cHBvcnRlZGA7XG4gICAgICBpZiAob3B0aW9ucy5lbnYuaGFzT3duUHJvcGVydHkoa2V5KSlcbiAgICAgICAgdGhyb3cgYENhbm5vdCBzcGVjaWZ5IHRoZSBzYW1lIG9wdGlvbiAnJHtpdGVyfScgbW9yZSB0aGFuIG9uY2VgO1xuICAgICAgbGFzdEtleSA9IGtleTtcbiAgICAgIG9wdGlvbnMuZW52W2tleV0gPSB0cnVlO1xuICAgIH1cbiAgICBlbHNlIGlmIChsYXN0S2V5KSB7XG4gICAgICBjb25zdCB2YWx1ZSA9IG9wdGlvbnMuZW52W2xhc3RLZXldO1xuICAgICAgaWYgKHR5cGVvZiB2YWx1ZSA9PT0gJ2Jvb2xlYW4nKVxuICAgICAgICBvcHRpb25zLmVudltsYXN0S2V5XSA9IGl0ZXI7XG4gICAgICBlbHNlIGlmICh0eXBlb2YgdmFsdWUgPT09ICdzdHJpbmcnKVxuICAgICAgICBvcHRpb25zLmVudltsYXN0S2V5XSA9IFsgdmFsdWUsIGl0ZXIgXTtcbiAgICAgIGVsc2VcbiAgICAgICAgdmFsdWUucHVzaChpdGVyKTtcbiAgICB9XG4gICAgZWxzZSB7XG4gICAgICB0aHJvdyBgTmVlZCB0byBzcGVjaWZ5IHRoZSBvcHRpb24gbmFtZSBiZWZvcmUgJyR7aXRlcn0nIHBhcmFtZXRlcmA7XG4gICAgfVxuICB9XG5cbiAgY29uc3QgY29udGV4dCA9IG5ldyBSdW5TY3JpcHRDb250ZXh0KG9wdGlvbnMpO1xuXG4gIGxldCBoYW5kbGVyID0gaGFuZGxlck1hcFtvcHRpb25zLmhhbmRsZXJdO1xuICBpZiAodHlwZW9mIGhhbmRsZXIgPT09IFwic3RyaW5nXCIpIHtcbiAgICBjb25zdCBmaWxlbmFtZSA9IHBhdGguaXNBYnNvbHV0ZShoYW5kbGVyKSA/IGhhbmRsZXIgOiBwYXRoLnJlc29sdmUoX19kaXJuYW1lLCBoYW5kbGVyKTtcbiAgICBjb25zdCBmaWxlVXJsID0gdXJsLnBhdGhUb0ZpbGVVUkwoZmlsZW5hbWUpO1xuICAgIGNvbnN0IG1vZHVsZSA9IGF3YWl0IGltcG9ydChmaWxlVXJsKTtcbiAgICBoYW5kbGVyID0gbW9kdWxlLmRlZmF1bHQ7XG4gIH1cblxuICBjb25zdCByZXMgPSBoYW5kbGVyKGNvbnRleHQpO1xuICBpZiAocmVzIGluc3RhbmNlb2YgUHJvbWlzZSkge1xuICAgIGF3YWl0IHJlcztcbiAgfVxufVxuXG5ydW5TY3JpcHQoKS50aGVuKCgpID0+IHByb2Nlc3MuZXhpdCgwKSkuY2F0Y2goKGUpID0+IHtcbiAgaWYgKGUgaW5zdGFuY2VvZiBFcnJvcikge1xuICAgIGNvbnNvbGUuZXJyb3IoZS5zdGFjayk7XG4gIH1cbiAgZWxzZSB7XG4gICAgY29uc29sZS5lcnJvcihlKTtcbiAgfVxuICBwcm9jZXNzLmV4aXQoMSk7XG59KTtcbiJdLCJuYW1lcyI6W10sInNvdXJjZVJvb3QiOiIifQ==