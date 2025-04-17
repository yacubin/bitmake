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
/* harmony import */ var _utils_MakePatch_mjs__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! @/utils/MakePatch.mjs */ "./src/utils/MakePatch.mjs");
/* harmony import */ var _utils_FileSystem__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! @/utils/FileSystem */ "./src/utils/FileSystem.ts");
/* harmony import */ var _utils_SettingsStorage_js__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(/*! @/utils/SettingsStorage.js */ "./src/utils/SettingsStorage.js");
/* harmony import */ var _utils_ChildProcess_js__WEBPACK_IMPORTED_MODULE_6__ = __webpack_require__(/*! @/utils/ChildProcess.js */ "./src/utils/ChildProcess.js");
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
      await (0,_utils_MakePatch_mjs__WEBPACK_IMPORTED_MODULE_3__.makePatch)(config.patchDir, config.extractDir);
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
      const res1 = await (0,_utils_ChildProcess_js__WEBPACK_IMPORTED_MODULE_6__.spawnAsync)(command, params, {
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
      const res2 = await (0,_utils_ChildProcess_js__WEBPACK_IMPORTED_MODULE_6__.spawnAsync)("make", args, {
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
    const res2 = await (0,_utils_ChildProcess_js__WEBPACK_IMPORTED_MODULE_6__.spawnAsync)("make", args, {
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
    const res = await (0,_utils_ChildProcess_js__WEBPACK_IMPORTED_MODULE_6__.spawnAsync)(command, config.args || [], {
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
      if (key === "INSTALL_PREFIX")
        root.INSTALL_PREFIX = val;
      else if (key === "GLOBAL_CONTEXT_JSON")
        root.GLOBAL_CONTEXT_JSON = FilePath.create(val);
      else if (key === "TARGET_GOALS_JSON")
        root.TARGET_GOALS_JSON = FilePath.create(val);
      else
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

/***/ "./src/bitmake/CustomScript.js":
/*!*************************************!*\
  !*** ./src/bitmake/CustomScript.js ***!
  \*************************************/
/***/ ((module, __unused_webpack_exports, __webpack_require__) => {

"use strict";


const { ensureString } = __webpack_require__(/*! @/utils/StrictType */ "./src/utils/StrictType.ts");
const { AbsolutePath } = __webpack_require__(/*! @/core/Path */ "./src/core/Path.ts");

const TARGET_SCOPE = Symbol("TARGET_SCOPE");
const NAME         = Symbol("NAME");
const FILE         = Symbol("FILE");
const INPUT        = Symbol("INPUT");
const OUTPUT       = Symbol("OUTPUT");
const PARAMS       = Symbol("PARAMS");
const PROPERTIES   = Symbol("PROPERTIES");

const SYSTEM_SCRIPTS_DIR = AbsolutePath.create(__dirname).join("SystemScripts");

function CustomScript(scope, name, params) {
  this[TARGET_SCOPE] = scope;
  this[NAME] = ensureString(name);

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

CustomScript.create = function(scope, name, params) {
  return Object.seal(new CustomScript(scope, name, params));
}

CustomScript.prototype = Object.create(Object.prototype, {
  constructor: {
    value: CustomScript,
    enumerable: false,
  },
  NAME: {
    get() { return this[NAME]; },
    enumerable: true,
  },
  TARGET_SCOPE: {
    get() { return this[TARGET_SCOPE]; },
    enumerable: true,
  },
  FILE: {
    get() { return this[FILE]; },
    enumerable: true,
  },
  INPUT: {
    get() { return this[INPUT]; },
    set(value) { this[INPUT] = this[TARGET_SCOPE].SOURCE_DIR.resolve(value); },
    enumerable: true,
  },
  OUTPUT: {
    get() { return this[OUTPUT]; },
    set(value) { this[OUTPUT] = AbsolutePath.create(value); },
    enumerable: true,
  },
  PARAMS: {
    get() { return this[PARAMS]; },
    set(value) { this[PARAMS] = value; },
    enumerable: true,
  },
  PROPERTIES: {
    get () { return this[PROPERTIES]; },
    enumerable: true,
  },
});

CustomScript.prototype.toString = function() {
  return this[NAME].toString();
}

CustomScript.prototype.toJSON = function() {
  const json = {};
  for (const key in this)
    json[key] = this[key];
  return json;
}

CustomScript.prototype.addProperty = function(key, ...vals) {
  let property = this[PROPERTIES][key];
  if (!property) {
    property = [];
    this[PROPERTIES][key] = property;
  }
  vals.forEach(v => property.push(v));
}

module.exports = {
  CustomScript,
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
const { InterfaceTarget } = __webpack_require__(/*! ./InterfaceTarget.js */ "./src/bitmake/InterfaceTarget.js");
const { UnknownTarget } = __webpack_require__(/*! ./UnknownTarget.js */ "./src/bitmake/UnknownTarget.js");
const { GoalCollection } = __webpack_require__(/*! @/core/GoalCollection */ "./src/core/GoalCollection.ts");
const { InterfaceObjects } = __webpack_require__(/*! ./InterfaceObjects.js */ "./src/bitmake/InterfaceObjects.js");
const { SourceFile } = __webpack_require__(/*! ./SourceFile.js */ "./src/bitmake/SourceFile.js");
const { ObjectLibrary, StaticLibrary, SharedLibrary, Executable } = __webpack_require__(/*! ./Target.js */ "./src/bitmake/Target.js");
const { DirPath, FilePath } = __webpack_require__(/*! @/core/Path */ "./src/core/Path.ts");
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


const { InterfaceTarget } = __webpack_require__(/*! ./InterfaceTarget.js */ "./src/bitmake/InterfaceTarget.js");
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

/***/ "./src/bitmake/InterfaceIncludes.js":
/*!******************************************!*\
  !*** ./src/bitmake/InterfaceIncludes.js ***!
  \******************************************/
/***/ ((module) => {

"use strict";


const NAME = Symbol("NAME");

function InterfaceIncludes(name) {
  this[NAME] = name;
}

InterfaceIncludes.create = (name) => {
  return Object.seal(new InterfaceIncludes(name));
}

InterfaceIncludes.ensureInstance = (value) => {
  if (value instanceof InterfaceIncludes)
    return value;
  throw new Error(`The '${value}' is not a InterfaceIncludes`);
}

InterfaceIncludes.prototype = Object.create(Object.prototype, {
  constructor: {
    value: InterfaceIncludes,
    enumerable: false,
  },
  targetName: {
    get () { return this[NAME]; },
    enumerable: true,
  },
});

InterfaceIncludes.prototype.toJSON = function() {
  return this.toString();
}

InterfaceIncludes.prototype.toString = function() {
  return "${" + this[NAME] + ".includes}";
}

module.exports = {
  InterfaceIncludes,
};


/***/ }),

/***/ "./src/bitmake/InterfaceObjects.js":
/*!*****************************************!*\
  !*** ./src/bitmake/InterfaceObjects.js ***!
  \*****************************************/
/***/ ((module) => {

"use strict";


const NAME = Symbol("NAME");

function InterfaceObjects(name) {
  this[NAME] = name;
}

InterfaceObjects.create = (name) => {
  return Object.seal(new InterfaceObjects(name));
}

InterfaceObjects.ensureInstance = (value) => {
  if (value instanceof InterfaceObjects)
    return value;
  throw new Error(`The '${value}' is not a InterfaceObjects`);
}

InterfaceObjects.prototype = Object.create(Object.prototype, {
  constructor: {
    value: InterfaceObjects,
    enumerable: false,
  },
  targetName: {
    get () { return this[NAME]; },
    enumerable: false,
  },
});

InterfaceObjects.prototype.toJSON = function() {
  return this.toString();
}

InterfaceObjects.prototype.toString = function() {
  return "${" + this[NAME] + ".objects}";
}

module.exports = {
  InterfaceObjects,
};


/***/ }),

/***/ "./src/bitmake/InterfaceScript.js":
/*!****************************************!*\
  !*** ./src/bitmake/InterfaceScript.js ***!
  \****************************************/
/***/ ((module) => {

"use strict";


const NAME       = Symbol("NAME");
const PROPERTIES = Symbol("PROPERTIES");

function InterfaceScript(name) {
  this[NAME] = name;
  this[PROPERTIES] = {};
}

InterfaceScript.create = (name) => {
  return Object.seal(new InterfaceScript(name));
}

InterfaceScript.ensureInstance = (value) => {
  if (value instanceof InterfaceScript)
    return value;
  throw new Error(`The '${value}' is not a InterfaceScript`);
}

InterfaceScript.prototype = Object.create(Object.prototype, {
  constructor: {
    value: InterfaceScript,
    enumerable: false,
  },
  NAME: {
    get () { return this[NAME]; },
    enumerable: true,
  },
  PROPERTIES: {
    get () { return this[PROPERTIES]; },
    enumerable: true,
  },
});

InterfaceScript.prototype.addProperty = function(key, ...vals) {
  let property = this[PROPERTIES][key];
  if (!property) {
    property = [];
    this[PROPERTIES][key] = property;
  }
  vals.forEach(v => property.push(v));
}

InterfaceScript.prototype.toJSON = function() {
  const json = {};
  for (const key in this)
    json[key] = (typeof this[key].toJSON === "function") ? this[key].toJSON() : this[key];
  return json;
}

InterfaceScript.prototype.toString = function() {
  return this[NAME];
}

module.exports = {
  InterfaceScript,
};


/***/ }),

/***/ "./src/bitmake/InterfaceTarget.js":
/*!****************************************!*\
  !*** ./src/bitmake/InterfaceTarget.js ***!
  \****************************************/
/***/ ((module, __unused_webpack_exports, __webpack_require__) => {

"use strict";


const { AbsolutePath } = __webpack_require__(/*! @/core/Path */ "./src/core/Path.ts");
const { InterfaceIncludes } = __webpack_require__(/*! ./InterfaceIncludes.js */ "./src/bitmake/InterfaceIncludes.js");
const { InterfaceObjects } = __webpack_require__(/*! ./InterfaceObjects.js */ "./src/bitmake/InterfaceObjects.js");
const { IncludeDirectory } = __webpack_require__(/*! @/core/IncludeDirectory */ "./src/core/IncludeDirectory.ts");
const { SourceFile } = __webpack_require__(/*! ./SourceFile.js */ "./src/bitmake/SourceFile.js");

const UNKNOWN_TARGET = Symbol("UNKNOWN_TARGET");
const SCOPE = Symbol("SCOPE");

function InterfaceTarget(scope, utarget) {
  this[SCOPE] = scope.clone();
  this[UNKNOWN_TARGET] = utarget;
}

InterfaceTarget.create = (scope, utarget) => {
  return Object.seal(new InterfaceTarget(scope, utarget));
}

InterfaceTarget.ensureInstance = (value) => {
  if (value instanceof InterfaceTarget)
    return value;
  throw new Error(`The '${value}' is not a InterfaceTarget`);
}

InterfaceTarget.prototype = Object.create(Object.prototype, {
  constructor: {
    value: InterfaceTarget,
    enumerable: false,
  },
  targetName: {
    get () { return this[UNKNOWN_TARGET].NAME; },
    enumerable: true,
  },
  includes: {
    get () { return InterfaceIncludes.create(this.targetName); },
    enumerable: true,
  },
  objects: {
    get () { return InterfaceObjects.create(this.targetName); },
    enumerable: true,
  },
});

InterfaceTarget.prototype.toJSON = function() {
  return this.toString();
}

InterfaceTarget.prototype.toString = function() {
  return "${" + this.targetName + "}";
}

InterfaceTarget.prototype.addSources = function(...sources) {
  for (let it of sources.flat(1)) {
    if (it instanceof InterfaceObjects || it instanceof SourceFile)
      /* */;
    else if (typeof it === "string" || AbsolutePath.isAbsolute(it))
      it = SourceFile.create(this[SCOPE], it);
    else
      throw new Error(`Not support instance ${it}`);
    this[UNKNOWN_TARGET].SOURCES.push(it);
  }
}

InterfaceTarget.prototype.addIncludes = function(...includes) {
  for (const it of includes.flat(1)) {
    let VALUE;
    if (it instanceof InterfaceIncludes)
      VALUE = it;
    else if (typeof it === "string" || AbsolutePath.isAbsolute(it))
      VALUE = IncludeDirectory.create(it, this[SCOPE].SOURCE_DIR);
    else
      throw new Error(`Not support instance ${it}`);
    this[UNKNOWN_TARGET].INCLUDES.push({ VALUE, PUBLIC_ONLY: false });
  }
}

InterfaceTarget.prototype.addPublicIncludes = function(...includes) {
  for (const it of includes.flat(1)) {
    let VALUE;
    if (it instanceof InterfaceIncludes)
      VALUE = it;
    else if (typeof it === "string" || AbsolutePath.isAbsolute(it))
      VALUE = IncludeDirectory.create(it, this[SCOPE].SOURCE_DIR);
    else
      throw new Error(`Not support instance ${it}`);
    this[UNKNOWN_TARGET].INCLUDES.push({ VALUE, PUBLIC_ONLY: true });
  }
}

InterfaceTarget.prototype.addDefinitions = function(...definitions) {
  for (const VALUE of definitions.flat(1))
    this[UNKNOWN_TARGET].DEFINES.push({ VALUE });
}

InterfaceTarget.prototype.addPublicDefinitions = function(...definitions) {
  for (const VALUE of definitions.flat(1))
    this[UNKNOWN_TARGET].DEFINES.push({ VALUE, PUBLIC_ONLY: true });
}

InterfaceTarget.prototype.addCompileOptions = function(...options) {
  for (const it of options.flat(1)) {
    this[UNKNOWN_TARGET].COMPILE_OPTIONS.push({ VALUE: it });
  }
}

InterfaceTarget.prototype.addLinkOptions = function(...options) {
  for (const it of options.flat(1)) {
    this[UNKNOWN_TARGET].LINK_OPTIONS.push({ VALUE: it });
  }
}

InterfaceTarget.prototype.addPublicCompileOptions = function(...options) {
  for (const it of options.flat(1)) {
    this[UNKNOWN_TARGET].COMPILE_OPTIONS.push({ VALUE: it, PUBLIC_ONLY: true });
  }
}

InterfaceTarget.prototype.addPublicLinkOptions = function(...options) {
  for (const it of options.flat(1)) {
    this[UNKNOWN_TARGET].LINK_OPTIONS.push({ VALUE: it, PUBLIC_ONLY: true });
  }
}

module.exports = {
  InterfaceTarget,
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

/***/ "./src/bitmake/SourceFile.js":
/*!***********************************!*\
  !*** ./src/bitmake/SourceFile.js ***!
  \***********************************/
/***/ ((module, __unused_webpack_exports, __webpack_require__) => {

"use strict";


const { ensureBoolean } = __webpack_require__(/*! @/utils/StrictType */ "./src/utils/StrictType.ts");

const NAME                = Symbol("NAME");
const LANGUAGE            = Symbol("LANGUAGE");
const HEADER_FILE_ONLY    = Symbol("HEADER_FILE_ONLY");
const DEFINES             = Symbol("DEFINES");
const COMPILE_FLAGS       = Symbol("COMPILE_FLAGS");
const FILE                = Symbol("FILE");
const OBJECT_FILE         = Symbol("OBJECT_FILE");

const _languageExtensions = {
  ASM: [ ".asm", ".s" ],
  C:   [ ".c" ],
  CXX: [".cpp", ".cc", ".cxx" ],
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

function SourceFile(scope, filename) {
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

SourceFile.create = (target, filename) => {
  return Object.seal(new SourceFile(target, filename));
}

SourceFile.prototype = Object.create(Object.prototype, {
  constructor: {
    value: SourceFile,
    enumerable: false,
  },
  NAME: {
    get () { return this[NAME]; },
    enumerable: true,
  },
  LANGUAGE: {
    get () { return this[LANGUAGE]; },
    enumerable: true,
  },
  HEADER_FILE_ONLY: {
    get() { return this[HEADER_FILE_ONLY]; },
    set(value) { this[HEADER_FILE_ONLY] = ensureBoolean(value); },
    enumerable: true,
  },
  DEFINES: {
    get() { return this[DEFINES]; },
    enumerable: true,
  },
  COMPILE_FLAGS: {
    get() { return this[COMPILE_FLAGS]; },
    enumerable: true,
  },
  FILE: {
    get() { return this[FILE]; },
    enumerable: true,
  },
  FILE_DIR: {
    get() { return this[FILE].dirname(); },
    enumerable: true,
  },
  FILE_NAME: {
    get() { return this[FILE].basename(); },
    enumerable: true,
  },
  OBJECT_FILE: {
    get() { return this[OBJECT_FILE]; },
    set(value) { this[OBJECT_FILE] = value; },
    enumerable: true,
  },
  OBJECT_FILE_DIR: {
    get() { return this[OBJECT_FILE] ? this[OBJECT_FILE].dirname() : null; },
    enumerable: true,
  },
  OBJECT_FILE_NAME: {
    get() { return this[OBJECT_FILE] ? this[OBJECT_FILE].basename() : null; },
    enumerable: true,
  },
});

SourceFile.prototype.toJSON = function() {
  const json = {};
  for (const key in this)
    json[key] = this[key];
  return json;
}

module.exports = {
  SourceFile,
};


/***/ }),

/***/ "./src/bitmake/SourceFileList.js":
/*!***************************************!*\
  !*** ./src/bitmake/SourceFileList.js ***!
  \***************************************/
/***/ ((module, __unused_webpack_exports, __webpack_require__) => {

"use strict";


const { SourceFile } = __webpack_require__(/*! @/bitmake/SourceFile.js */ "./src/bitmake/SourceFile.js");

const SOURCES = Symbol("SOURCES");

function SourceFileList(scope, sources) {
  this[SOURCES] = [];
  for (const iter of sources) {
    if (!(iter instanceof SourceFile))
      throw new Error(`Item ${iter} is not SourceFile`);
    this[SOURCES].push(iter);
  }
}

SourceFileList.prototype = Object.create(Object.prototype, {
  constructor: {
    value: SourceFile,
    enumerable: false,
  },
});

SourceFileList.prototype.addDefinitions = function(...definitions) {
  for (const iter of definitions.flat())
    this[SOURCES].forEach(i => i.DEFINES.push(iter));
}

SourceFileList.prototype.addCompileFlags = function(...flags) {
  for (const iter of flags.flat())
    this[SOURCES].forEach(i => i.COMPILE_FLAGS.push(iter));
}

SourceFileList.prototype.sourceAt = function(index) {
  return this[SOURCES][index];
}

SourceFileList.prototype.sourceCount = function(index) {
  return this[SOURCES].length;
}

SourceFileList.prototype.toJSON = function() {
  return this[SOURCES];
}

SourceFileList.create = function(scope, sources) {
  return Object.seal(new SourceFileList(scope, sources));
}

module.exports = {
  SourceFileList,
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

const DEFINE_MAP            = Symbol("DEFINE_MAP");

const C_COMPILER            = Symbol("C_COMPILER");
const C_FLAGS               = Symbol("C_FLAGS");
const C_FLAGS_DEBUG         = Symbol("C_FLAGS_DEBUG");
const C_FLAGS_RELEASE       = Symbol("C_FLAGS_RELEASE");
const CXX_COMPILER          = Symbol("CXX_COMPILER");
const CXX_FLAGS             = Symbol("CXX_FLAGS");
const CXX_FLAGS_DEBUG       = Symbol("CXX_FLAGS_DEBUG");
const CXX_FLAGS_RELEASE     = Symbol("CXX_FLAGS_RELEASE");
const AR                    = Symbol("AR");
const RANLIB                = Symbol("RANLIB");
const LINKER                = Symbol("LINKER");
const NM                    = Symbol("NM");
const OBJCOPY               = Symbol("OBJCOPY");
const OBJDUMP               = Symbol("OBJDUMP");
const STRIP                 = Symbol("STRIP");
const OBJECT_LIBRARY_PREFIX = Symbol("OBJECT_LIBRARY_PREFIX");
const OBJECT_LIBRARY_SUFFIX = Symbol("OBJECT_LIBRARY_SUFFIX");
const OBJECT_LINKER_FLAGS   = Symbol("OBJECT_LINKER_FLAGS");
const STATIC_LIBRARY_PREFIX = Symbol("STATIC_LIBRARY_PREFIX");
const STATIC_LIBRARY_SUFFIX = Symbol("STATIC_LIBRARY_SUFFIX");
const STATIC_LINKER_FLAGS   = Symbol("STATIC_LINKER_FLAGS");
const SHARED_LIBRARY_PREFIX = Symbol("SHARED_LIBRARY_PREFIX");
const SHARED_LIBRARY_SUFFIX = Symbol("SHARED_LIBRARY_SUFFIX");
const SHARED_LINKER_FLAGS   = Symbol("SHARED_LINKER_FLAGS");
const EXECUTABLE_SUFFIX     = Symbol("EXECUTABLE_SUFFIX");
const EXE_LINKER_FLAGS      = Symbol("EXE_LINKER_FLAGS");

function SystemVariables() {
  this[C_COMPILER]            = "clang";
  this[C_FLAGS]               = [];
  this[C_FLAGS_DEBUG]         = [ "-g" ];
  this[C_FLAGS_RELEASE]       = [ "-O3", "-DNDEBUG" ];
  this[CXX_COMPILER]          = "clang++";
  this[CXX_FLAGS]             = [];
  this[CXX_FLAGS_DEBUG]       = [ "-g" ];
  this[CXX_FLAGS_RELEASE]     = [ "-O3", "-DNDEBUG" ];
  this[AR]                    = "llvm-ar";
  this[RANLIB]                = "llvm-ranlib";
  this[LINKER]                = "wasm-ld";
  this[NM]                    = "llvm-nm";
  this[OBJCOPY]               = "llvm-objcopy";
  this[OBJDUMP]               = "llvm-objdump";
  this[STRIP]                 = "llvm-strip";
  this[OBJECT_LIBRARY_PREFIX] = "";
  this[OBJECT_LIBRARY_SUFFIX] = ".o";
  this[OBJECT_LINKER_FLAGS]   = [];
  this[STATIC_LIBRARY_PREFIX] = "lib";
  this[STATIC_LIBRARY_SUFFIX] = ".a";
  this[STATIC_LINKER_FLAGS]   = [];
  this[SHARED_LIBRARY_PREFIX] = "lib";
  this[SHARED_LIBRARY_SUFFIX] = ".so";
  this[SHARED_LINKER_FLAGS]   = [];
  this[EXECUTABLE_SUFFIX]     = "";
  this[EXE_LINKER_FLAGS]      = [];

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
  C_COMPILER: {
    get () { return this[C_COMPILER]; },
    set(value) { this[C_COMPILER] = value; },
    enumerable: true,
  },
  C_FLAGS: {
    get () { return this[C_FLAGS]; },
    set(value) { this[C_FLAGS] = value; },
    enumerable: true,
  },
  C_FLAGS_DEBUG: {
    get () { return this[C_FLAGS_DEBUG]; },
    set(value) { this[C_FLAGS_DEBUG] = value; },
    enumerable: true,
  },
  C_FLAGS_RELEASE: {
    get () { return this[C_FLAGS_RELEASE]; },
    set(value) { this[C_FLAGS_RELEASE] = value; },
    enumerable: true,
  },
  CXX_COMPILER: {
    get () { return this[CXX_COMPILER]; },
    set(value) { this[CXX_COMPILER] = value; },
    enumerable: true,
  },
  CXX_FLAGS: {
    get () { return this[CXX_FLAGS]; },
    set(value) { this[CXX_FLAGS] = value; },
    enumerable: true,
  },
  CXX_FLAGS_DEBUG: {
    get () { return this[CXX_FLAGS_DEBUG]; },
    set(value) { this[CXX_FLAGS_DEBUG] = value; },
    enumerable: true,
  },
  CXX_FLAGS_RELEASE: {
    get () { return this[CXX_FLAGS_RELEASE]; },
    set(value) { this[CXX_FLAGS_RELEASE] = value; },
    enumerable: true,
  },
  AR: {
    get () { return this[AR]; },
    set(value) { this[AR] = value; },
    enumerable: true,
  },
  RANLIB: {
    get () { return this[RANLIB]; },
    set(value) { this[RANLIB] = value; },
    enumerable: true,
  },
  LINKER: {
    get () { return this[LINKER]; },
    set(value) { this[LINKER] = value; },
    enumerable: true,
  },
  NM: {
    get () { return this[NM]; },
    set(value) { this[NM] = value; },
    enumerable: true,
  },
  OBJCOPY: {
    get () { return this[OBJCOPY]; },
    set(value) { this[OBJCOPY] = value; },
    enumerable: true,
  },
  OBJDUMP: {
    get () { return this[OBJDUMP]; },
    set(value) { this[OBJDUMP] = value; },
    enumerable: true,
  },
  STRIP: {
    get () { return this[STRIP]; },
    set(value) { this[STRIP] = value; },
    enumerable: true,
  },
  OBJECT_LIBRARY_PREFIX: {
    get () { return this[OBJECT_LIBRARY_PREFIX]; },
    set(value) { this[OBJECT_LIBRARY_PREFIX] = value; },
    enumerable: true,
  },
  OBJECT_LIBRARY_SUFFIX: {
    get () { return this[OBJECT_LIBRARY_SUFFIX]; },
    set(value) { this[OBJECT_LIBRARY_SUFFIX] = value; },
    enumerable: true,
  },
  OBJECT_LINKER_FLAGS: {
    get() { return this[OBJECT_LINKER_FLAGS]; },
    set(value) { this[OBJECT_LINKER_FLAGS] = value; },
    enumerable: true,
  },
  STATIC_LIBRARY_PREFIX: {
    get () { return this[STATIC_LIBRARY_PREFIX]; },
    set(value) { this[STATIC_LIBRARY_PREFIX] = value; },
    enumerable: true,
  },
  STATIC_LIBRARY_SUFFIX: {
    get () { return this[STATIC_LIBRARY_SUFFIX]; },
    set(value) { this[STATIC_LIBRARY_SUFFIX] = value; },
    enumerable: true,
  },
  STATIC_LINKER_FLAGS: {
    get() { return this[STATIC_LINKER_FLAGS]; },
    set(value) { this[STATIC_LINKER_FLAGS] = value; },
    enumerable: true,
  },
  SHARED_LIBRARY_PREFIX: {
    get() { return this[SHARED_LIBRARY_PREFIX]; },
    set(value) { this[SHARED_LIBRARY_PREFIX] = value; },
    enumerable: true,
  },
  SHARED_LIBRARY_SUFFIX: {
    get() { return this[SHARED_LIBRARY_SUFFIX]; },
    set(value) { this[SHARED_LIBRARY_SUFFIX] = value; },
    enumerable: true,
  },
  SHARED_LINKER_FLAGS: {
    get() { return this[SHARED_LINKER_FLAGS]; },
    set(value) { this[SHARED_LINKER_FLAGS] = value; },
    enumerable: true,
  },
  EXECUTABLE_SUFFIX: {
    get() { return this[EXECUTABLE_SUFFIX]; },
    set(value) { this[EXECUTABLE_SUFFIX] = value; },
    enumerable: true,
  },
  EXE_LINKER_FLAGS: {
    get() { return this[EXE_LINKER_FLAGS]; },
    set(value) { this[EXE_LINKER_FLAGS] = value; },
    enumerable: true,
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

  o[ASM_COMPILER]          = this[ASM_COMPILER];
  o[ASM_FLAGS]             = [ ...this[ASM_FLAGS] ];
  o[ASM_FLAGS_DEBUG]       = [ ...this[ASM_FLAGS_DEBUG] ];
  o[ASM_FLAGS_RELEASE]     = [ ...this[ASM_FLAGS_RELEASE] ];
  o[C_COMPILER]            = this[C_COMPILER];
  o[C_FLAGS]               = [ ...this[C_FLAGS] ];
  o[C_FLAGS_DEBUG]         = [ ...this[C_FLAGS_DEBUG] ];
  o[C_FLAGS_RELEASE]       = [ ...this[C_FLAGS_RELEASE] ];
  o[CXX_COMPILER]          = this[CXX_COMPILER];
  o[CXX_FLAGS]             = [ ...this[CXX_FLAGS] ];
  o[CXX_FLAGS_DEBUG]       = [ ...this[CXX_FLAGS_DEBUG] ];
  o[CXX_FLAGS_RELEASE]     = [ ...this[CXX_FLAGS_RELEASE] ];
  o[AR]                    = this[AR];
  o[RANLIB]                = this[RANLIB];
  o[LINKER]                = this[LINKER];
  o[NM]                    = this[NM];
  o[OBJCOPY]               = this[OBJCOPY];
  o[OBJDUMP]               = this[OBJDUMP];
  o[STRIP]                 = this[STRIP];
  o[OBJECT_LIBRARY_PREFIX] = this[OBJECT_LIBRARY_PREFIX];
  o[OBJECT_LIBRARY_SUFFIX] = this[OBJECT_LIBRARY_SUFFIX];
  o[OBJECT_LINKER_FLAGS]   = [ ...this[OBJECT_LINKER_FLAGS] ];
  o[STATIC_LIBRARY_PREFIX] = this[STATIC_LIBRARY_PREFIX];
  o[STATIC_LIBRARY_SUFFIX] = this[STATIC_LIBRARY_SUFFIX];
  o[STATIC_LINKER_FLAGS]   = [ ...this[STATIC_LINKER_FLAGS] ];
  o[SHARED_LIBRARY_PREFIX] = this[SHARED_LIBRARY_PREFIX];
  o[SHARED_LIBRARY_SUFFIX] = this[SHARED_LIBRARY_SUFFIX];
  o[SHARED_LINKER_FLAGS]   = [ ...this[SHARED_LINKER_FLAGS] ];
  o[EXECUTABLE_SUFFIX]     = this[EXECUTABLE_SUFFIX];
  o[EXE_LINKER_FLAGS]      = [ ...this[EXE_LINKER_FLAGS] ];

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
const { SourceFile } = __webpack_require__(/*! @/bitmake/SourceFile.js */ "./src/bitmake/SourceFile.js");
const { SourceFileList } = __webpack_require__(/*! @/bitmake/SourceFileList.js */ "./src/bitmake/SourceFileList.js");
const { IncludeDirectory } = __webpack_require__(/*! @/core/IncludeDirectory */ "./src/core/IncludeDirectory.ts");
const { InterfaceTarget } = __webpack_require__(/*! @/bitmake/InterfaceTarget.js */ "./src/bitmake/InterfaceTarget.js");
const { InterfaceIncludes } = __webpack_require__(/*! ./InterfaceIncludes.js */ "./src/bitmake/InterfaceIncludes.js");
const { InterfaceObjects } = __webpack_require__(/*! ./InterfaceObjects.js */ "./src/bitmake/InterfaceObjects.js");
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
const { InterfaceIncludes } = __webpack_require__(/*! ./InterfaceIncludes.js */ "./src/bitmake/InterfaceIncludes.js");
const { InterfaceTarget } = __webpack_require__(/*! ./InterfaceTarget.js */ "./src/bitmake/InterfaceTarget.js");

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
const { InterfaceTarget } = __webpack_require__(/*! ./InterfaceTarget.js */ "./src/bitmake/InterfaceTarget.js");
const { BaseTarget } = __webpack_require__(/*! ./Target.js */ "./src/bitmake/Target.js");
const { IncludeDirectory } = __webpack_require__(/*! @/core/IncludeDirectory */ "./src/core/IncludeDirectory.ts");
const { SystemVariables } = __webpack_require__(/*! ./SystemVariables.js */ "./src/bitmake/SystemVariables.js");
const bitmake = __webpack_require__(/*! @/bitmake/index.js */ "./src/bitmake/index.js");

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
  const target = bitmake.CustomScript.create(newScope, name, params);
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
    script = bitmake.InterfaceScript.create(name);
    this[GLOBAL].INTERFACE_SCRIPTS[name] = script;
  }

  return script;
}

UserContext.prototype.install = function(value, params) {
  for (const it of [ value ].flat(1)) {
    const iter = (it instanceof BaseTarget) ? this.target(it.NAME) : it;
    const entity = bitmake.InstallEntity.create(this, iter, params);
    this[GLOBAL].INSTALL_LIST.push(entity);
  }
}

UserContext.prototype.addStaticLibrary = function(name, ...sources) {
  this.logDebug(currentFunctionName(), name);

  const target = bitmake.StaticLibrary.create(this[SCOPE], name);
  target.addSources(...sources);

  this[GLOBAL].TARGETS.set(name, target);
  return target;
}

UserContext.prototype.addObjectLibrary = function(name, ...sources) {
  this.logDebug(currentFunctionName(), name);

  const target = bitmake.ObjectLibrary.create(this[SCOPE], name);
  target.addSources(...sources);

  this[GLOBAL].TARGETS.set(name, target);
  return target;
}

UserContext.prototype.addSharedLibrary = function(name, ...sources) {
  this.logDebug(currentFunctionName(), name);

  const target = bitmake.SharedLibrary.create(this[SCOPE], name);
  target.addSources(...sources);

  this[GLOBAL].TARGETS.set(name, target);
  return target;
}

UserContext.prototype.addExecutable = function(name, ...sources) {
  this.logDebug(currentFunctionName(), name);

  const target = bitmake.Executable.create(this[SCOPE], name);
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

/***/ "./src/bitmake/index.js":
/*!******************************!*\
  !*** ./src/bitmake/index.js ***!
  \******************************/
/***/ ((module, __unused_webpack_exports, __webpack_require__) => {

"use strict";


const { SystemVariables } = __webpack_require__(/*! ./SystemVariables.js */ "./src/bitmake/SystemVariables.js");
const { SourceFile } = __webpack_require__(/*! ./SourceFile.js */ "./src/bitmake/SourceFile.js");
const { SourceFileList } = __webpack_require__(/*! ./SourceFileList.js */ "./src/bitmake/SourceFileList.js");
const { ObjectLibrary, StaticLibrary, SharedLibrary, Executable } = __webpack_require__(/*! ./Target.js */ "./src/bitmake/Target.js");
const { CustomScript } = __webpack_require__(/*! ./CustomScript.js */ "./src/bitmake/CustomScript.js");
const { InterfaceTarget } = __webpack_require__(/*! ./InterfaceTarget.js */ "./src/bitmake/InterfaceTarget.js");
const { InterfaceIncludes } = __webpack_require__(/*! ./InterfaceIncludes.js */ "./src/bitmake/InterfaceIncludes.js");
const { InterfaceObjects } = __webpack_require__(/*! ./InterfaceObjects.js */ "./src/bitmake/InterfaceObjects.js");
const { InterfaceScript } = __webpack_require__(/*! ./InterfaceScript.js */ "./src/bitmake/InterfaceScript.js");
const { ScriptCollection } = __webpack_require__(/*! ./ScriptCollection.js */ "./src/bitmake/ScriptCollection.js");
const { TargetCollection } = __webpack_require__(/*! ./TargetCollection.js */ "./src/bitmake/TargetCollection.js");
const { InstallEntity } = __webpack_require__(/*! ./InstallEntity.js */ "./src/bitmake/InstallEntity.js");
const { GlobalContext } = __webpack_require__(/*! ./GlobalContext.js */ "./src/bitmake/GlobalContext.js");

module.exports = {
  SystemVariables,
  SourceFile,
  SourceFileList,
  ObjectLibrary,
  StaticLibrary,
  SharedLibrary,
  Executable,
  CustomScript,
  InterfaceTarget,
  InterfaceIncludes,
  InterfaceObjects,
  InterfaceScript,
  ScriptCollection,
  TargetCollection,
  InstallEntity,
  GlobalContext,
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
        const json = {};
        for (const key in this)
            json[key] = this[key];
        return json;
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
        type: "array",
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

const { spawnAsync } = __webpack_require__(/*! ./ChildProcess.js */ "./src/utils/ChildProcess.js");
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

/***/ "./src/utils/ChildProcess.js":
/*!***********************************!*\
  !*** ./src/utils/ChildProcess.js ***!
  \***********************************/
/***/ ((module, __unused_webpack_exports, __webpack_require__) => {

const { spawn } = __webpack_require__(/*! child_process */ "child_process");
const fs = __webpack_require__(/*! fs */ "fs");
const path = __webpack_require__(/*! path */ "path");

function spawnAsync(command, args, options) {
  let fd = null;
  let verbose = false;
  if (options && options.extra) {
    if (options.extra.verbose)
      verbose = true;
    if (options.extra.output) {
      let logfile = options.extra.output;
      if (!path.isAbsolute(logfile) && options.cwd) {
        logfile = path.resolve(options.cwd, logfile);
      }
      fd = fs.openSync(logfile, 'w+', 0o666);
    }
  }
  return new Promise((resolve, reject) => {
    if (fd || verbose) {
      verbose && console.info([ path.basename(command), ...args ].join(' '));
      fd && fs.writeSync(fd, JSON.stringify({command, args, options }, null, 2) + "\n");
    }
    const exec = spawn(command, args, options);
    exec.stdout.on('data', (data) => {
      process.stdout.write(data);
      fd && fs.writeSync(fd, data);
    });
    exec.stderr.on('data', (data) => {
      process.stderr.write(data);
      fd && fs.writeSync(fd, data);
    });
    exec.on('close', (status) => {
      fd && fs.closeSync(fd);
      resolve({status});
    });
  });
}

module.exports = {
  spawnAsync,
};


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

/***/ "./src/utils/MakePatch.mjs":
/*!*********************************!*\
  !*** ./src/utils/MakePatch.mjs ***!
  \*********************************/
/***/ ((__unused_webpack___webpack_module__, __webpack_exports__, __webpack_require__) => {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   makePatch: () => (/* binding */ makePatch)
/* harmony export */ });
/* harmony import */ var node_fs__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! node:fs */ "node:fs");
/* harmony import */ var node_path__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! node:path */ "node:path");
/* harmony import */ var _utils_FileSystem__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! @/utils/FileSystem */ "./src/utils/FileSystem.ts");
/* harmony import */ var _logger__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! @/logger */ "./src/logger/index.ts");






const logger = (0,_logger__WEBPACK_IMPORTED_MODULE_3__.createLogger)("file:///mnt/c/opt/work/source/darkit-sdk/external/bitmake/src/utils/MakePatch.mjs");

async function makePatch(srcDir, destDir) {
  logger.info(`Make patch ${srcDir} to ${destDir}`);
  const list = await (0,_utils_FileSystem__WEBPACK_IMPORTED_MODULE_2__.fileList)(srcDir, { relative: srcDir, recursive: true });
  for (const iter of list) {
    const source = node_path__WEBPACK_IMPORTED_MODULE_1__.resolve(srcDir, iter);
    const destination = node_path__WEBPACK_IMPORTED_MODULE_1__.resolve(destDir, iter);
    await node_fs__WEBPACK_IMPORTED_MODULE_0__.promises.cp(source, destination, { force: true });
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

/***/ "child_process":
/*!********************************!*\
  !*** external "child_process" ***!
  \********************************/
/***/ ((module) => {

"use strict";
module.exports = require("child_process");

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

/***/ }),

/***/ "path":
/*!***********************!*\
  !*** external "path" ***!
  \***********************/
/***/ ((module) => {

"use strict";
module.exports = require("path");

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
//# sourceMappingURL=data:application/json;charset=utf-8;base64,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QUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLDRCQUE0QixRQUFRO0FBQ3BDOztBQUVBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBOztBQUVBOztBQUVBO0FBQ0E7O0FBRUE7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBOztBQUVBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBOztBQUVBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBOztBQUVBO0FBQ0E7O0FBRUE7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTs7QUFFQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBOztBQUVBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBOztBQUVBO0FBQ0E7O0FBRUE7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTs7Ozs7Ozs7Ozs7O0FDalJhOztBQUViLFFBQVEsa0JB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OztBQUVBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSxhQUFhLDhDQUFZO0FBQ3pCO0FBQ0EsV0FBVztBQUNYOztBQUVBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBLCtDQUErQywrQ0FBYTtBQUM1RCxpQkFBaUIsWUFBWSx1QkFBdUIsaUJBQWlCO0FBQ3JFOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLHdCQUF3QixNQUFNO0FBQzlCO0FBQ0EsaURBQWlELEtBQUs7QUFDdEQ7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSx1REFBdUQsS0FBSztBQUM1RDtBQUNBOztBQUVBLHNCQUFzQixtRUFBZ0I7O0FBRXRDO0FBQ0E7QUFDQSxxQkFBcUIsaURBQWUsc0JBQXNCLDhDQUFZO0FBQ3RFLG9CQUFvQixtREFBaUI7QUFDckMseUJBQXlCLDRDQUFPLE9BQU8sQ0FBQztBQUN4QztBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLENBQUMiLCJzb3VyY2VzIjpbIndlYnBhY2s6Ly9iaXRtYWtlLy4vc3JjLyBsYXp5IHN0cmljdCBuYW1lc3BhY2Ugb2JqZWN0Iiwid2VicGFjazovL2JpdG1ha2UvLi9zcmMvQnVpbGRIYW5kbGVyLm1qcyIsIndlYnBhY2s6Ly9iaXRtYWtlLy4vc3JjL0NvbnN0YW50cy5qcyIsIndlYnBhY2s6Ly9iaXRtYWtlLy4vc3JjL0luaXRIYW5kbGVyLm1qcyIsIndlYnBhY2s6Ly9iaXRtYWtlLy4vc3JjL01ha2VTY3JpcHRDb250ZXh0LmpzIiwid2VicGFjazovL2JpdG1ha2UvLi9zcmMvUnVuU2NyaXB0Q29udGV4dC5tanMiLCJ3ZWJwYWNrOi8vYml0bWFrZS8uL3NyYy9iaXRtYWtlL0N1c3RvbVNjcmlwdC5qcyIsIndlYnBhY2s6Ly9iaXRtYWtlLy4vc3JjL2JpdG1ha2UvR2xvYmFsQ29udGV4dC5qcyIsIndlYnBhY2s6Ly9iaXRtYWtlLy4vc3JjL2JpdG1ha2UvSW5zdGFsbEVudGl0eS5qcyIsIndlYnBhY2s6Ly9iaXRtYWtlLy4vc3JjL2JpdG1ha2UvSW50ZXJmYWNlSW5jbHVkZXMuanMiLCJ3ZWJwYWNrOi8vYml0bWFrZS8uL3NyYy9iaXRtYWtlL0ludGVyZmFjZU9iamVjdHMuanMiLCJ3ZWJwYWNrOi8vYml0bWFrZS8uL3NyYy9iaXRtYWtlL0ludGVyZmFjZVNjcmlwdC5qcyIsIndlYnBhY2s6Ly9iaXRtYWtlLy4vc3JjL2JpdG1ha2UvSW50ZXJmYWNlVGFyZ2V0LmpzIiwid2VicGFjazovL2JpdG1ha2UvLi9zcmMvYml0bWFrZS9QbHVnaW5Db250ZXh0LmpzIiwid2VicGFjazovL2JpdG1ha2UvLi9zcmMvYml0bWFrZS9TY3JpcHRDb2xsZWN0aW9uLmpzIiwid2VicGFjazovL2JpdG1ha2UvLi9zcmMvYml0bWFrZS9Tb3VyY2VGaWxlLmpzIiwid2VicGFjazovL2JpdG1ha2UvLi9zcmMvYml0bWFrZS9Tb3VyY2VGaWxlTGlzdC5qcyIsIndlYnBhY2s6Ly9iaXRtYWtlLy4vc3JjL2JpdG1ha2UvU3lzdGVtU2NyaXB0cy9jb25maWd1cmVfZmlsZS5qcyIsIndlYnBhY2s6Ly9iaXRtYWtlLy4vc3JjL2JpdG1ha2UvU3lzdGVtU2NyaXB0cy9pbnN0YWxsX3NjcmlwdC5qcyIsIndlYnBhY2s6Ly9iaXRtYWtlLy4vc3JjL2JpdG1ha2UvU3lzdGVtVmFyaWFibGVzLmpzIiwid2VicGFjazovL2JpdG1ha2UvLi9zcmMvYml0bWFrZS9UYXJnZXQuanMiLCJ3ZWJwYWNrOi8vYml0bWFrZS8uL3NyYy9iaXRtYWtlL1RhcmdldENvbGxlY3Rpb24uanMiLCJ3ZWJwYWNrOi8vYml0bWFrZS8uL3NyYy9iaXRtYWtlL1Vua25vd25UYXJnZXQuanMiLCJ3ZWJwYWNrOi8vYml0bWFrZS8uL3NyYy9iaXRtYWtlL1VzZXJDb250ZXh0LmpzIiwid2VicGFjazovL2JpdG1ha2UvLi9zcmMvYml0bWFrZS9pbmRleC5qcyIsIndlYnBhY2s6Ly9iaXRtYWtlLy4vc3JjL2NtYWtlL0NvbnN0YW50cy50cyIsIndlYnBhY2s6Ly9iaXRtYWtlLy4vc3JjL2NtYWtlL0hlbHBlci50cyIsIndlYnBhY2s6Ly9iaXRtYWtlLy4vc3JjL2NvcmUvR29hbENvbGxlY3Rpb24udHMiLCJ3ZWJwYWNrOi8vYml0bWFrZS8uL3NyYy9jb3JlL0luY2x1ZGVEaXJlY3RvcnkudHMiLCJ3ZWJwYWNrOi8vYml0bWFrZS8uL3NyYy9jb3JlL1BhdGgudHMiLCJ3ZWJwYWNrOi8vYml0bWFrZS8uL3NyYy9jb3JlL1N5c3RlbVZhcmlhYmxlcy50cyIsIndlYnBhY2s6Ly9iaXRtYWtlLy4vc3JjL2NvcmUvVHlwZXMudHMiLCJ3ZWJwYWNrOi8vYml0bWFrZS8uL3NyYy9sb2dnZXIvaW5kZXgudHMiLCJ3ZWJwYWNrOi8vYml0bWFrZS8uL3NyYy91dGlscy9DTWFrZS5qcyIsIndlYnBhY2s6Ly9iaXRtYWtlLy4vc3JjL3V0aWxzL0NoaWxkUHJvY2Vzcy5qcyIsIndlYnBhY2s6Ly9iaXRtYWtlLy4vc3JjL3V0aWxzL0ZpbGVTeXN0ZW0udHMiLCJ3ZWJwYWNrOi8vYml0bWFrZS8uL3NyYy91dGlscy9IdHRwUmVxdWVzdC50cyIsIndlYnBhY2s6Ly9iaXRtYWtlLy4vc3JjL3V0aWxzL0ltcG9ydE1vZHVsZS5tanMiLCJ3ZWJwYWNrOi8vYml0bWFrZS8uL3NyYy91dGlscy9NYWtlUGF0Y2gubWpzIiwid2VicGFjazovL2JpdG1ha2UvLi9zcmMvdXRpbHMvTW9kdWxlLnRzIiwid2VicGFjazovL2JpdG1ha2UvLi9zcmMvdXRpbHMvUHJpbWl0aXZlcy50cyIsIndlYnBhY2s6Ly9iaXRtYWtlLy4vc3JjL3V0aWxzL1NldHRpbmdzU3RvcmFnZS5qcyIsIndlYnBhY2s6Ly9iaXRtYWtlLy4vc3JjL3V0aWxzL1N0cmljdFR5cGUudHMiLCJ3ZWJwYWNrOi8vYml0bWFrZS9leHRlcm5hbCBub2RlLWNvbW1vbmpzIFwiY2hpbGRfcHJvY2Vzc1wiIiwid2VicGFjazovL2JpdG1ha2UvZXh0ZXJuYWwgbm9kZS1jb21tb25qcyBcImZzXCIiLCJ3ZWJwYWNrOi8vYml0bWFrZS9leHRlcm5hbCBub2RlLWNvbW1vbmpzIFwiaHR0cFwiIiwid2VicGFjazovL2JpdG1ha2UvZXh0ZXJuYWwgbm9kZS1jb21tb25qcyBcImh0dHBzXCIiLCJ3ZWJwYWNrOi8vYml0bWFrZS9leHRlcm5hbCBub2RlLWNvbW1vbmpzIFwibm9kZTpjaGlsZF9wcm9jZXNzXCIiLCJ3ZWJwYWNrOi8vYml0bWFrZS9leHRlcm5hbCBub2RlLWNvbW1vbmpzIFwibm9kZTpmc1wiIiwid2VicGFjazovL2JpdG1ha2UvZXh0ZXJuYWwgbm9kZS1jb21tb25qcyBcIm5vZGU6b3NcIiIsIndlYnBhY2s6Ly9iaXRtYWtlL2V4dGVybmFsIG5vZGUtY29tbW9uanMgXCJub2RlOnBhdGhcIiIsIndlYnBhY2s6Ly9iaXRtYWtlL2V4dGVybmFsIG5vZGUtY29tbW9uanMgXCJub2RlOnVybFwiIiwid2VicGFjazovL2JpdG1ha2UvZXh0ZXJuYWwgbm9kZS1jb21tb25qcyBcInBhdGhcIiIsIndlYnBhY2s6Ly9iaXRtYWtlL3dlYnBhY2svYm9vdHN0cmFwIiwid2VicGFjazovL2JpdG1ha2Uvd2VicGFjay9ydW50aW1lL2NvbXBhdCBnZXQgZGVmYXVsdCBleHBvcnQiLCJ3ZWJwYWNrOi8vYml0bWFrZS93ZWJwYWNrL3J1bnRpbWUvZGVmaW5lIHByb3BlcnR5IGdldHRlcnMiLCJ3ZWJwYWNrOi8vYml0bWFrZS93ZWJwYWNrL3J1bnRpbWUvaGFzT3duUHJvcGVydHkgc2hvcnRoYW5kIiwid2VicGFjazovL2JpdG1ha2Uvd2VicGFjay9ydW50aW1lL21ha2UgbmFtZXNwYWNlIG9iamVjdCIsIndlYnBhY2s6Ly9iaXRtYWtlLy4vc3JjL21haW4ubWpzIl0sInNvdXJjZXNDb250ZW50IjpbImZ1bmN0aW9uIHdlYnBhY2tFbXB0eUFzeW5jQ29udGV4dChyZXEpIHtcblx0Ly8gSGVyZSBQcm9taXNlLnJlc29sdmUoKS50aGVuKCkgaXMgdXNlZCBpbnN0ZWFkIG9mIG5ldyBQcm9taXNlKCkgdG8gcHJldmVudFxuXHQvLyB1bmNhdWdodCBleGNlcHRpb24gcG9wcGluZyB1cCBpbiBkZXZ0b29sc1xuXHRyZXR1cm4gUHJvbWlzZS5yZXNvbHZlKCkudGhlbigoKSA9PiB7XG5cdFx0dmFyIGUgPSBuZXcgRXJyb3IoXCJDYW5ub3QgZmluZCBtb2R1bGUgJ1wiICsgcmVxICsgXCInXCIpO1xuXHRcdGUuY29kZSA9ICdNT0RVTEVfTk9UX0ZPVU5EJztcblx0XHR0aHJvdyBlO1xuXHR9KTtcbn1cbndlYnBhY2tFbXB0eUFzeW5jQ29udGV4dC5rZXlzID0gKCkgPT4gKFtdKTtcbndlYnBhY2tFbXB0eUFzeW5jQ29udGV4dC5yZXNvbHZlID0gd2VicGFja0VtcHR5QXN5bmNDb250ZXh0O1xud2VicGFja0VtcHR5QXN5bmNDb250ZXh0LmlkID0gXCIuL3NyYyBsYXp5IHJlY3Vyc2l2ZVwiO1xubW9kdWxlLmV4cG9ydHMgPSB3ZWJwYWNrRW1wdHlBc3luY0NvbnRleHQ7IiwiaW1wb3J0IGZzIGZyb20gXCJub2RlOmZzXCI7XG5pbXBvcnQgcGF0aCBmcm9tIFwibm9kZTpwYXRoXCI7XG5cbmltcG9ydCBjbWFrZSBmcm9tIFwiQC91dGlscy9DTWFrZS5qc1wiO1xuaW1wb3J0IHsgbWFrZVBhdGNoIH0gZnJvbSBcIkAvdXRpbHMvTWFrZVBhdGNoLm1qc1wiO1xuaW1wb3J0IHsgc2F2ZUlmRGlmZmVyZW50LCBkaXJlY3RvcnlFeGlzdHMsIGdldFBhdGhTdHJpbmcgfSBmcm9tIFwiQC91dGlscy9GaWxlU3lzdGVtXCI7XG5pbXBvcnQgeyBTZXR0aW5nc1N0b3JhZ2UgfSBmcm9tIFwiQC91dGlscy9TZXR0aW5nc1N0b3JhZ2UuanNcIjtcbmltcG9ydCB7IHNwYXduQXN5bmMgfSBmcm9tIFwiQC91dGlscy9DaGlsZFByb2Nlc3MuanNcIjtcbmltcG9ydCB7IGFjdGlvbk1ha2VTY3JpcHQgfSBmcm9tIFwiQC9NYWtlU2NyaXB0Q29udGV4dC5qc1wiO1xuaW1wb3J0IHsgYXJyYXlXcmFwcGVyLCBhc3NpZ25PYmplY3QgfSBmcm9tIFwiQC91dGlscy9QcmltaXRpdmVzXCI7XG5pbXBvcnQgY29uc3RhbnRzIGZyb20gXCJAL0NvbnN0YW50cy5qc1wiO1xuaW1wb3J0IHsgcmVxdWlyZVJlc29sdmUgfSBmcm9tIFwiQC91dGlscy9Nb2R1bGVcIlxuaW1wb3J0IHsgY3JlYXRlTG9nZ2VyIH0gZnJvbSBcIkAvbG9nZ2VyXCI7XG5pbXBvcnQgeyByZXF1ZXN0R2V0IH0gZnJvbSBcIkAvdXRpbHMvSHR0cFJlcXVlc3RcIjtcblxuY29uc3QgbG9nZ2VyID0gY3JlYXRlTG9nZ2VyKGltcG9ydC5tZXRhLnVybCk7XG5cbmNvbnN0IHsgQlVJTERfQ09ORklHX0ZJTEUsIEJVSUxEX1NFVFRJTkdTX0ZJTEUgfSA9IGNvbnN0YW50cztcblxuZnVuY3Rpb24gbWVyZ2VFbnZpcm9ubWVudCguLi5hcmdzKSB7XG4gIGNvbnN0IGVudmlyb25tZW50ID0ge307XG4gIGZvciAoY29uc3QgZW52IG9mIGFyZ3MpIHtcbiAgICBjb25zdCBsaXN0ID0gT2JqZWN0LmVudHJpZXMoZW52IHx8IHt9KTtcbiAgICB3aGlsZSAobGlzdC5sZW5ndGgpIHtcbiAgICAgIGxldCBba2V5LHZhbF0gPSBsaXN0LnBvcCgpO1xuICAgICAgbGV0IGRlbGltaXRlcjtcbiAgICAgIGxldCBqb2luQWZ0ZXIgPSB0cnVlO1xuICAgICAgc3dpdGNoIChrZXkpIHtcbiAgICAgIGNhc2UgXCJQQVRIXCI6XG4gICAgICAgIGRlbGltaXRlciA9IHBhdGguZGVsaW1pdGVyO1xuICAgICAgICBqb2luQWZ0ZXIgPSBmYWxzZTtcbiAgICAgICAgYnJlYWs7XG4gICAgICBjYXNlIFwiQ0ZMQUdTXCI6XG4gICAgICBjYXNlIFwiQ1hYRkxBR1NcIjpcbiAgICAgIGNhc2UgXCJMREZMQUdTXCI6XG4gICAgICAgIGRlbGltaXRlciA9IFwiIFwiO1xuICAgICAgICBicmVhaztcbiAgICAgIH1cbiAgICAgIGlmICh0eXBlb2YgdmFsID09PSAnbnVtYmVyJylcbiAgICAgICAgdmFsID0gdmFsLnRvU3RyaW5nKCk7XG4gICAgICBlbHNlIGlmIChBcnJheS5pc0FycmF5KHZhbCkpXG4gICAgICAgIHZhbCA9IHZhbC5qb2luKGRlbGltaXRlcik7XG4gICAgICBpZiAoIWRlbGltaXRlciB8fCAhZW52aXJvbm1lbnRba2V5XSlcbiAgICAgICAgZW52aXJvbm1lbnRba2V5XSA9IHZhbDtcbiAgICAgIGVsc2UgaWYgKGpvaW5BZnRlcilcbiAgICAgICAgZW52aXJvbm1lbnRba2V5XSA9IHZhbCArIGRlbGltaXRlciArIGVudmlyb25tZW50W2tleV07XG4gICAgICBlbHNlXG4gICAgICAgIGVudmlyb25tZW50W2tleV0gPSBlbnZpcm9ubWVudFtrZXldICsgZGVsaW1pdGVyICsgdmFsO1xuICAgIH1cbiAgfVxuICByZXR1cm4gZW52aXJvbm1lbnQ7XG59XG5cbmZ1bmN0aW9uIHJlYmFzZUNvbmZpZyhjb25maWcpIHtcbiAgY29uc3QgYmFzZUNvbmZpZyA9IHt9O1xuICBjb25zdCBvdGhlckNvbmZpZyA9IHt9O1xuXG4gIGZvciAoY29uc3QgW2tleSwgZW50cnldIG9mIE9iamVjdC5lbnRyaWVzKGNvbmZpZykpIHtcbiAgICAoZW50cnkuYmFzZSA/IG90aGVyQ29uZmlnIDogYmFzZUNvbmZpZylba2V5XSA9IGVudHJ5O1xuICB9XG5cbiAgd2hpbGUgKHRydWUpIHtcbiAgICBjb25zdCBrZXlzID0gT2JqZWN0LmtleXMob3RoZXJDb25maWcpO1xuICAgIGlmIChrZXlzLmxlbmd0aCA9PSAwKVxuICAgICAgYnJlYWs7XG4gICAgY29uc3QgZG9uZUtleXMgPSBbXTtcbiAgICBmb3IgKGNvbnN0IGtleSBvZiBrZXlzKSB7XG4gICAgICBjb25zdCBvdGhlckl0ZXIgPSBvdGhlckNvbmZpZ1trZXldO1xuICAgICAgY29uc3QgYmFzZUxpc3QgPSBbXTtcbiAgICAgIGZvciAoY29uc3QgaXRlciBvZiBhcnJheVdyYXBwZXIob3RoZXJJdGVyLmJhc2UpKSB7XG4gICAgICAgIGNvbnN0IGJhc2VFbnRyeSA9IGJhc2VDb25maWdbaXRlcl07XG4gICAgICAgIGlmICghYmFzZUVudHJ5KSB7XG4gICAgICAgICAgYmFzZUxpc3QubGVuZ3RoID0gMDtcbiAgICAgICAgICBicmVhaztcbiAgICAgICAgfVxuICAgICAgICBiYXNlTGlzdC5wdXNoKGJhc2VFbnRyeSk7XG4gICAgICB9XG4gICAgICBpZiAoYmFzZUxpc3QubGVuZ3RoKSB7XG4gICAgICAgIGJhc2VMaXN0LnB1c2gob3RoZXJJdGVyKTtcbiAgICAgICAgbGV0IG5ld0VudHJ5ID0ge307XG4gICAgICAgIGZvciAoY29uc3QgaXRlciBvZiBiYXNlTGlzdCkge1xuICAgICAgICAgIGFzc2lnbk9iamVjdChuZXdFbnRyeSwgaXRlcik7XG4gICAgICAgIH1cbiAgICAgICAgYmFzZUNvbmZpZ1trZXldID0gbmV3RW50cnk7XG4gICAgICAgIGRvbmVLZXlzLnB1c2goa2V5KTtcbiAgICAgIH1cbiAgICB9XG4gICAgaWYgKGRvbmVLZXlzLmxlbmd0aCA9PSAwKSB7XG4gICAgICBmb3IgKGNvbnN0IGtleSBvZiBrZXlzKVxuICAgICAgICB0aHJvdyBgQ2FuJ3Qgc2V0IGJhc2UgY29uZmlnIGZvciBcIiR7a2V5fWA7XG4gICAgfVxuICAgIGZvciAoY29uc3Qga2V5IG9mIGRvbmVLZXlzKSB7XG4gICAgICBkZWxldGUgYmFzZUNvbmZpZ1trZXldLmJhc2U7XG4gICAgICBkZWxldGUgb3RoZXJDb25maWdba2V5XTtcbiAgICB9XG4gIH1cblxuICByZXR1cm4gYmFzZUNvbmZpZztcbn1cblxuZnVuY3Rpb24gcmVzb2x2ZVN0cmluZ1dpdGhWYXJpYWJsZShjb25maWcsIGVudHJ5Q29uZmlnLCByb290Q29uZmlnLCB2YWwpIHtcbiAgcmV0dXJuIHZhbC5yZXBsYWNlKC9cXCRcXHsoW159XSspXFx9L2csIChtYXRjaCwgdmFsdWUpID0+IHtcbiAgICBsZXQgc2VsO1xuICAgIGZvciAoY29uc3QgbmFtZSBvZiB2YWx1ZS5zcGxpdChcIi5cIikpIHtcbiAgICAgIGlmIChzZWwgPT09IHVuZGVmaW5lZCkge1xuICAgICAgICBpZiAoY29uZmlnLmhhc093blByb3BlcnR5KG5hbWUpKSB7XG4gICAgICAgICAgc2VsID0gY29uZmlnW25hbWVdO1xuICAgICAgICB9XG4gICAgICAgIGVsc2UgaWYgKGNvbmZpZyAhPT0gZW50cnlDb25maWcgJiYgZW50cnlDb25maWcuaGFzT3duUHJvcGVydHkobmFtZSkpIHtcbiAgICAgICAgICBzZWwgPSBlbnRyeUNvbmZpZ1tuYW1lXTtcbiAgICAgICAgfVxuICAgICAgICBlbHNlIGlmIChjb25maWcgIT09IHJvb3RDb25maWcgJiYgcm9vdENvbmZpZy5oYXNPd25Qcm9wZXJ0eShuYW1lKSkge1xuICAgICAgICAgIHNlbCA9IHJvb3RDb25maWdbbmFtZV07XG4gICAgICAgIH1cbiAgICAgICAgZWxzZSB7XG4gICAgICAgICAgdHJ5IHtcbiAgICAgICAgICAgIGNvbnN0IG1haW5GaWxlID0gcmVxdWlyZVJlc29sdmUobmFtZSk7XG4gICAgICAgICAgICBpZiAobWFpbkZpbGUpIHtcbiAgICAgICAgICAgICAgc2VsID0geyBtYWluRmlsZSwgbWFpbkRpcjogcGF0aC5wb3NpeC5kaXJuYW1lKG1haW5GaWxlKSwgfTtcbiAgICAgICAgICAgIH1cbiAgICAgICAgICB9IGNhdGNoKGUpIHt9XG4gICAgICAgIH1cbiAgICAgICAgaWYgKHNlbCA9PT0gdW5kZWZpbmVkKVxuICAgICAgICAgIGJyZWFrO1xuICAgICAgfVxuICAgICAgZWxzZSBpZiAoc2VsLmhhc093blByb3BlcnR5KG5hbWUpKSB7XG4gICAgICAgIHNlbCA9IHNlbFtuYW1lXTtcbiAgICAgIH1cbiAgICAgIGVsc2Uge1xuICAgICAgICBzZWwgPSB1bmRlZmluZWQ7XG4gICAgICAgIGJyZWFrO1xuICAgICAgfVxuICAgIH1cbiAgICBpZiAoc2VsID09PSB1bmRlZmluZWQpXG4gICAgICB0aHJvdyBuZXcgRXJyb3IoYFRoZSAke3ZhbHVlfSB2YXJpYWJsZSBkb2VzIG5vdCBleGlzdFwiYCk7XG4gICAgcmV0dXJuIHNlbDtcbiAgfSk7XG59XG5cbmZ1bmN0aW9uIHJlc29sdmVDb25maWdTdHJpbmdzSW1wbChjb25maWcsIGVudHJ5Q29uZmlnLCByb290Q29uZmlnKSB7XG4gIGxldCBjb3VudCA9IDA7XG4gIGZvciAoY29uc3QgW2tleSwgdmFsXSBvZiBPYmplY3QuZW50cmllcyhjb25maWcpKSB7XG4gICAgaWYgKHZhbCAmJiB0eXBlb2YgdmFsID09PSBcIm9iamVjdFwiKVxuICAgICAgY291bnQgKz0gcmVzb2x2ZUNvbmZpZ1N0cmluZ3NJbXBsKHZhbCwgZW50cnlDb25maWcsIHJvb3RDb25maWcpO1xuICAgIGVsc2UgaWYgKHR5cGVvZiB2YWwgPT09IFwic3RyaW5nXCIpIHtcbiAgICAgIGNvbnN0IHYgPSByZXNvbHZlU3RyaW5nV2l0aFZhcmlhYmxlKGNvbmZpZywgZW50cnlDb25maWcsIHJvb3RDb25maWcsIHZhbCk7XG4gICAgICBpZiAodmFsICE9PSB2KSB7XG4gICAgICAgIGNvbmZpZ1trZXldID0gdjtcbiAgICAgICAgY291bnQrKztcbiAgICAgIH1cbiAgICB9XG4gIH1cbiAgcmV0dXJuIGNvdW50O1xufVxuXG5mdW5jdGlvbiByZXNvbHZlQ29uZmlnU3RyaW5ncyhjb25maWcpIHtcbiAgZm9yICg7Oykge1xuICAgIGxldCBjb3VudCA9IDA7XG4gICAgZm9yIChjb25zdCBba2V5LCB2YWxdIG9mIE9iamVjdC5lbnRyaWVzKGNvbmZpZykpIHtcbiAgICAgIGlmICh2YWwgJiYgdHlwZW9mIHZhbCA9PT0gXCJvYmplY3RcIilcbiAgICAgICAgY291bnQgKz0gcmVzb2x2ZUNvbmZpZ1N0cmluZ3NJbXBsKHZhbCwgdmFsLCBjb25maWcpO1xuICAgICAgZWxzZSAgaWYgKHR5cGVvZiB2YWwgPT09IFwic3RyaW5nXCIpIHtcbiAgICAgICAgY29uc3QgdiA9IHJlc29sdmVTdHJpbmdXaXRoVmFyaWFibGUoY29uZmlnLCBjb25maWcsIGNvbmZpZywgdmFsKTtcbiAgICAgICAgaWYgKHZhbCAhPT0gdikge1xuICAgICAgICAgIGNvbmZpZ1trZXldID0gdjtcbiAgICAgICAgICBjb3VudCsrO1xuICAgICAgICB9XG4gICAgICB9XG4gICAgfVxuICAgIGlmICghY291bnQpXG4gICAgICBicmVhaztcbiAgfVxufVxuXG5mdW5jdGlvbiBtYWtlQnVpbGRDb25maWcoY3R4LCBjb25maWcpIHtcbiAgZm9yIChjb25zdCBrZXkgb2YgWyBcInNvdXJjZVJvb3RcIiwgXCJ3YXNtdXhEaXJcIiBdKSB7XG4gICAgaWYgKGNvbmZpZ1trZXldKSB7XG4gICAgICB0aHJvdyBgVGhlICR7a2V5fSB2YXJpYWJsZSBjYW5ub3QgYmUgY2hhbmdlZCB0byBcIiR7Y29uZmlnLnNvdXJjZVJvb3R9XCJgO1xuICAgIH1cbiAgfVxuXG4gIGNvbnN0IHJvb3RDb25maWcgPSByZWJhc2VDb25maWcoY29uZmlnKTtcblxuICByb290Q29uZmlnLmJ1aWxkVHlwZSA9IHJvb3RDb25maWcuYnVpbGRUeXBlIHx8IGN0eC5idWlsZFR5cGU7XG4gIHJvb3RDb25maWcuc291cmNlUm9vdCA9IHJvb3RDb25maWcuc291cmNlUm9vdCB8fCBjdHgud29ya0RpcjtcbiAgcm9vdENvbmZpZy5iaW5hcnlSb290ID0gcm9vdENvbmZpZy5iaW5hcnlSb290IHx8IHBhdGgucG9zaXgucmVzb2x2ZShjdHgud29ya0RpcixcImJ1aWxkXCIpO1xuXG4gIGZvciAoY29uc3QgW2tleSwgZW50cnldIG9mIE9iamVjdC5lbnRyaWVzKHJvb3RDb25maWcpKSB7XG4gICAgaWYgKGVudHJ5ICYmIHR5cGVvZiBlbnRyeSA9PT0gXCJvYmplY3RcIiAmJiBlbnRyeS5hY3Rpb24pIHtcbiAgICAgIGVudHJ5LmJ1aWxkVHlwZSA9IGVudHJ5LmJ1aWxkVHlwZSB8fCByb290Q29uZmlnLmJ1aWxkVHlwZTtcbiAgICAgIGNvbnN0IGZvbGRlciA9IGtleS5yZXBsYWNlKFwiOlwiLCBwYXRoLnBvc2l4LnNlcCk7XG4gICAgICBjb25zdCB3b3JrRGlyID0gcGF0aC5wb3NpeC5qb2luKHJvb3RDb25maWcuYmluYXJ5Um9vdCwgZm9sZGVyKTtcbiAgICAgIGVudHJ5LnRlbXBEaXIgPSBlbnRyeS50ZW1wRGlyIHx8IHBhdGgucG9zaXguam9pbih3b3JrRGlyLCBcInRtcFwiKTtcbiAgICAgIGlmIChlbnRyeS5zb3VyY2VVcmwpIHtcbiAgICAgICAgZW50cnkuYXJjaGl2ZURpciA9IGVudHJ5LmFyY2hpdmVEaXIgfHwgcGF0aC5wb3NpeC5qb2luKHdvcmtEaXIsIFwiYXJjXCIpO1xuICAgICAgICBlbnRyeS5leHRyYWN0RGlyID0gZW50cnkuZXh0cmFjdERpciB8fCBwYXRoLnBvc2l4LmpvaW4od29ya0RpciwgXCJzcmNcIik7XG4gICAgICAgIGlmICghZW50cnkuc291cmNlRGlyKVxuICAgICAgICAgIGVudHJ5LnNvdXJjZURpciA9IGVudHJ5LmV4dHJhY3REaXI7XG4gICAgICAgIGVsc2UgaWYgKCFwYXRoLmlzQWJzb2x1dGUoZW50cnkuc291cmNlRGlyKSlcbiAgICAgICAgICBlbnRyeS5zb3VyY2VEaXIgPSBwYXRoLnBvc2l4LmpvaW4oZW50cnkuZXh0cmFjdERpciwgZW50cnkuc291cmNlRGlyKTtcbiAgICAgIH1cbiAgICAgIGVsc2UgaWYgKCFlbnRyeS5zb3VyY2VEaXIpIHtcbiAgICAgICAgdGhyb3cgYE1pc3Npbmcgc291cmNlRGlyIGZvciAke2tleX0gYWN0aW9uXCJgO1xuICAgICAgfVxuICAgICAgaWYgKGVudHJ5LmJpbmFyeURpciA9PT0gbnVsbClcbiAgICAgICAgZW50cnkuYmluYXJ5RGlyID0gZW50cnkuc291cmNlRGlyO1xuICAgICAgZWxzZSBpZiAoZW50cnkuYmluYXJ5RGlyID09PSB1bmRlZmluZWQpXG4gICAgICAgIGVudHJ5LmJpbmFyeURpciA9IHBhdGgucG9zaXguam9pbih3b3JrRGlyLCBcImJpblwiKTtcbiAgICB9XG4gIH1cblxuICByZXNvbHZlQ29uZmlnU3RyaW5ncyhyb290Q29uZmlnKTtcblxuICByZXR1cm4gcm9vdENvbmZpZztcbn1cblxuYXN5bmMgZnVuY3Rpb24gdHJ5UmVxdWVzdEdldChzb3VyY2VVcmwsIGFyY0ZpbGUsIGF0dGVtcHRzKVxue1xuICBmb3IoOzspIHtcbiAgICB0cnkge1xuICAgICAgY29uc3QgYnVmZmVyID0gYXdhaXQgcmVxdWVzdEdldChzb3VyY2VVcmwpO1xuICAgICAgYXdhaXQgZnMucHJvbWlzZXMud3JpdGVGaWxlKGFyY0ZpbGUsIGJ1ZmZlcik7XG4gICAgICByZXR1cm47XG4gICAgfVxuICAgIGNhdGNoIChlKSB7XG4gICAgICBpZiAoLS1hdHRlbXB0cyA8IDApIHtcbiAgICAgICAgdGhyb3cgZTtcbiAgICAgIH1cbiAgICAgIGNvbnNvbGUud2FybihlKTtcbiAgICB9XG4gIH1cbn1cblxuYXN5bmMgZnVuY3Rpb24gZG9FeHRyYWN0QXJjaGl2ZShjdHgsIGVudmlyb25tZW50LCBjb25maWcsIHNldHRpbmdzKVxue1xuICBpZiAoIWNvbmZpZy5zb3VyY2VVcmwpXG4gICAgdGhyb3cgXCJVbmtub3duIHNvdXJjZVVybFwiO1xuICBpZiAoIWNvbmZpZy5hcmNoaXZlRGlyKVxuICAgIHRocm93IFwiVW5rbm93biBhcmNoaXZlRGlyXCI7XG4gIGlmICghY29uZmlnLmV4dHJhY3REaXIpXG4gICAgdGhyb3cgXCJVbmtub3duIGV4dHJhY3REaXJcIjtcblxuICBpZiAoIWF3YWl0IGRpcmVjdG9yeUV4aXN0cyhjb25maWcuYXJjaGl2ZURpcikpIHtcbiAgICBjb25zb2xlLmxvZyhgbWtkaXIgLXAgJHtjb25maWcuYXJjaGl2ZURpcn1gKTtcbiAgICBhd2FpdCBmcy5wcm9taXNlcy5ta2Rpcihjb25maWcuYXJjaGl2ZURpciwgeyByZWN1cnNpdmU6IHRydWUgfSk7XG4gIH1cblxuICBpZiAoIWF3YWl0IGRpcmVjdG9yeUV4aXN0cyhjb25maWcudGVtcERpcikpIHtcbiAgICBjb25zb2xlLmxvZyhgbWtkaXIgLXAgJHtjb25maWcudGVtcERpcn1gKTtcbiAgICBhd2FpdCBmcy5wcm9taXNlcy5ta2Rpcihjb25maWcudGVtcERpciwgeyByZWN1cnNpdmU6IHRydWUgfSk7XG4gIH1cblxuICBjb25zdCBhcmNOYW1lID0gcGF0aC5iYXNlbmFtZShjb25maWcuc291cmNlVXJsKTtcblxuICBsZXQgYXJjRmlsZTtcbiAgbGV0IGRvd25sb2FkVXJscyA9IGF3YWl0IHNldHRpbmdzLmdldChcImRvd25sb2FkVXJsc1wiKSB8fCB7fTtcbiAgaWYgKGRvd25sb2FkVXJsc1tjb25maWcuc291cmNlVXJsXSlcbiAgICBhcmNGaWxlID0gZG93bmxvYWRVcmxzW2NvbmZpZy5zb3VyY2VVcmxdO1xuICBlbHNlIHtcbiAgICBhcmNGaWxlID0gcGF0aC5qb2luKGNvbmZpZy5hcmNoaXZlRGlyLCBhcmNOYW1lKTtcbiAgICBhd2FpdCB0cnlSZXF1ZXN0R2V0KGNvbmZpZy5zb3VyY2VVcmwsIGFyY0ZpbGUsIGN0eC5yZXF1ZXN0QXR0ZW1wdHMpO1xuICAgIGRvd25sb2FkVXJsc1tjb25maWcuc291cmNlVXJsXSA9IGFyY0ZpbGU7XG4gICAgYXdhaXQgc2V0dGluZ3Muc2V0KFwiZG93bmxvYWRVcmxzXCIsIGRvd25sb2FkVXJscyk7XG4gIH1cblxuICBsZXQgZXh0cmFjdERpcjtcbiAgbGV0IGV4dHJhY3RGaWxlcyA9IGF3YWl0IHNldHRpbmdzLmdldChcImV4dHJhY3RGaWxlc1wiKSB8fCB7fTtcbiAgaWYgKGV4dHJhY3RGaWxlc1thcmNGaWxlXSkge1xuICAgIGV4dHJhY3REaXIgPSBleHRyYWN0RmlsZXNbYXJjRmlsZV07XG4gIH1cbiAgZWxzZSB7XG4gICAgZXh0cmFjdERpciA9IGF3YWl0IGZzLnByb21pc2VzLm1rZHRlbXAocGF0aC5yZXNvbHZlKGNvbmZpZy50ZW1wRGlyLCBhcmNOYW1lICsgJy4nKSk7XG4gIFxuICAgIGF3YWl0IGNtYWtlLmV4dHJhY3Qoe1xuICAgICAgZW52aXJvbm1lbnQsXG4gICAgICBmaWxlbmFtZTogYXJjRmlsZSxcbiAgICAgIHdvcmtEaXI6IGV4dHJhY3REaXIsXG4gICAgICBsb2dGaWxlOiAgcGF0aC5qb2luKGNvbmZpZy50ZW1wRGlyLCBwYXRoLmJhc2VuYW1lKGV4dHJhY3REaXIpICsgXCIubG9nXCIpLFxuICAgIH0pO1xuICBcbiAgICBjb25zdCBleHRyYWN0TGlzdCA9IGF3YWl0IGZzLnByb21pc2VzLnJlYWRkaXIoZXh0cmFjdERpcik7XG4gICAgaWYgKGV4dHJhY3RMaXN0Lmxlbmd0aCA9PT0gMSkge1xuICAgICAgZXh0cmFjdERpciA9IHBhdGgucmVzb2x2ZShleHRyYWN0RGlyLCBleHRyYWN0TGlzdFswXSk7XG4gICAgICBpZiAoIWF3YWl0IGRpcmVjdG9yeUV4aXN0cyhleHRyYWN0RGlyKSkge1xuICAgICAgICBjb25zb2xlLmxvZyhgcm0gLWZyICR7ZXh0cmFjdERpcn1gKTtcbiAgICAgICAgYXdhaXQgZnMucHJvbWlzZXMucm0oZXh0cmFjdERpciwgeyByZWN1cnNpdmU6IHRydWUgfSk7XG4gICAgICAgIHRocm93IGBTdXBwb3J0IG9ubHkgZGlyZWN0b3J5IGZvciBhcmNoaXZlYDtcbiAgICAgIH1cbiAgICB9XG4gIFxuICAgIGlmIChhd2FpdCBkaXJlY3RvcnlFeGlzdHMoY29uZmlnLmV4dHJhY3REaXIpKSB7XG4gICAgICAvLyBUT0RPOiBNYXJnZSBleHRyYWN0RGlyIHdpdGggb3V0cHV0XG4gICAgICBjb25zb2xlLmxvZyhgcm0gLWZyICR7Y29uZmlnLmV4dHJhY3REaXJ9YCk7XG4gICAgICBhd2FpdCBmcy5wcm9taXNlcy5ybShjb25maWcuZXh0cmFjdERpciwgeyByZWN1cnNpdmU6IHRydWUgfSk7XG4gICAgfVxuICAgIGVsc2Uge1xuICAgICAgY29uc3QgcGFyZW50RGlyID0gcGF0aC5kaXJuYW1lKGNvbmZpZy5leHRyYWN0RGlyKTtcbiAgICAgIGlmICghYXdhaXQgZGlyZWN0b3J5RXhpc3RzKHBhcmVudERpcikpIHtcbiAgICAgICAgY29uc29sZS5sb2coYG1rZGlyIC1wICR7cGFyZW50RGlyfWApO1xuICAgICAgICBhd2FpdCBmcy5wcm9taXNlcy5ta2RpcihwYXJlbnREaXIsIHsgcmVjdXJzaXZlOiB0cnVlIH0pOyBcbiAgICAgIH1cbiAgICB9XG4gIFxuICAgIGNvbnNvbGUubG9nKGBtdiAke2V4dHJhY3REaXJ9ICR7Y29uZmlnLmV4dHJhY3REaXJ9YCk7XG4gICAgYXdhaXQgZnMucHJvbWlzZXMucmVuYW1lKGV4dHJhY3REaXIsIGNvbmZpZy5leHRyYWN0RGlyKTtcbiAgXG4gICAgZXh0cmFjdEZpbGVzW2FyY0ZpbGVdID0gZXh0cmFjdERpcjtcbiAgICBhd2FpdCBzZXR0aW5ncy5zZXQoXCJleHRyYWN0RmlsZXNcIiwgZXh0cmFjdEZpbGVzKTtcbiAgfVxuXG4gIGlmIChjb25maWcucGF0Y2hEaXIpIHtcbiAgICBsZXQgcGF0Y2hEaXJzID0gYXdhaXQgc2V0dGluZ3MuZ2V0KFwicGF0Y2hEaXJzXCIpIHx8IHt9O1xuICAgIGlmICghcGF0Y2hEaXJzW2NvbmZpZy5wYXRjaERpcl0pIHtcbiAgICAgIGF3YWl0IG1ha2VQYXRjaChjb25maWcucGF0Y2hEaXIsIGNvbmZpZy5leHRyYWN0RGlyKTtcbiAgICAgIHBhdGNoRGlyc1tjb25maWcucGF0Y2hEaXJdID0gY29uZmlnLmV4dHJhY3REaXI7XG4gICAgICBhd2FpdCBzZXR0aW5ncy5zZXQoXCJwYXRjaERpcnNcIiwgcGF0Y2hEaXJzKTtcbiAgICB9XG4gIH1cbn1cblxuY29uc3QgYWN0aW9uSGFuZGxlcnMgPSB7XG4gIG5vbmU6IGFzeW5jIChjb25maWcsIGVudmlyb25tZW50LCBzZXR0aW5ncykgPT4ge1xuICAgIC8qIGRvIG5vdGhpbmcgKi9cbiAgfSxcbiAgY21ha2U6IGFzeW5jIChjb25maWcsIGVudmlyb25tZW50LCBzZXR0aW5ncykgPT4ge1xuICAgIGNvbnN0IHNvdXJjZURpciA9IGdldFBhdGhTdHJpbmcoY29uZmlnLnNvdXJjZURpcik7XG4gICAgY29uc3QgYmluYXJ5RGlyID0gZ2V0UGF0aFN0cmluZyhjb25maWcuYmluYXJ5RGlyKTtcbiAgICBjb25zdCBjbWFrZUFyZ3MgPSB7XG4gICAgICBlbnZpcm9ubWVudDoge1xuICAgICAgICAuLi5lbnZpcm9ubWVudCxcbiAgICAgICAgREVTVERJUjogY29uZmlnLmRlc3REaXIsXG4gICAgICB9LFxuICAgICAgZ2VuZXJhdG9yOiBjb25maWcuZ2VuZXJhdG9yIHx8IFwiVW5peCBNYWtlZmlsZXNcIixcbiAgICAgIGNhY2hlVmFyaWFibGVzOiBjb25maWcuY2FjaGVWYXJpYWJsZXMsXG4gICAgICBzb3VyY2VEaXIsXG4gICAgICBiaW5hcnlEaXIsXG4gICAgfTtcblxuICAgIGlmICghY21ha2VBcmdzLmNhY2hlVmFyaWFibGVzLkNNQUtFX0JVSUxEX1RZUEUpIHtcbiAgICAgIGNtYWtlQXJncy5jYWNoZVZhcmlhYmxlcy5DTUFLRV9CVUlMRF9UWVBFID0gY29uZmlnLmJ1aWxkVHlwZTtcbiAgICB9XG5cbiAgICBhd2FpdCBjbWFrZS5jb25maWd1cmUoY21ha2VBcmdzKTtcbiAgICBhd2FpdCBjbWFrZS5idWlsZChjbWFrZUFyZ3MpO1xuICAgIGF3YWl0IGNtYWtlLmluc3RhbGwoY21ha2VBcmdzKTtcbiAgfSxcbiAgY29uZmlndXJlOiBhc3luYyAoY29uZmlnLCBlbnZpcm9ubWVudCwgc2V0dGluZ3MpID0+IHtcbiAgICBjb25zdCBzb3VyY2VEaXIgPSBnZXRQYXRoU3RyaW5nKGNvbmZpZy5zb3VyY2VEaXIpO1xuICAgIGNvbnN0IGJpbmFyeURpciA9IGdldFBhdGhTdHJpbmcoY29uZmlnLmJpbmFyeURpcik7XG4gICAgbGV0IHN0ZXAgPSBhd2FpdCBzZXR0aW5ncy5nZXQoXCJjb25maWd1cmVcIikgfHwgXCJjb25maWdcIjtcbiAgICBpZiAoc3RlcCA9PT0gXCJjb25maWdcIikge1xuICAgICAgY29uc3QgY29tbWFuZCA9IHBhdGgucmVzb2x2ZShzb3VyY2VEaXIsIFwiY29uZmlndXJlXCIpO1xuICAgICAgY29uc3QgcGFyYW1zID0gW107XG4gICAgICBpZiAoQXJyYXkuaXNBcnJheShjb25maWcudmFyaWFibGVzKSkge1xuICAgICAgICBmb3IgKGNvbnN0IGl0ZXIgb2YgY29uZmlnLnZhcmlhYmxlcylcbiAgICAgICAgICBwYXJhbXMucHVzaChpdGVyKTtcbiAgICAgIH1cbiAgICAgIGVsc2UgaWYgKGNvbmZpZy52YXJpYWJsZXMpIHtcbiAgICAgICAgZm9yIChjb25zdCBba2V5LHZhbF0gb2YgT2JqZWN0LmVudHJpZXMoY29uZmlnLnZhcmlhYmxlcykpIHtcbiAgICAgICAgICBpZiAoa2V5ID09PSBcImZlYXR1cmVzXCIgJiYgQXJyYXkuaXNBcnJheSh2YWwpKSB7XG4gICAgICAgICAgICBmb3IgKGNvbnN0IGl0ZXIgb2YgdmFsKVxuICAgICAgICAgICAgICBwYXJhbXMucHVzaChgLS0ke2l0ZXJ9YCk7XG4gICAgICAgICAgfVxuICAgICAgICAgIGVsc2UgaWYgKHZhbCA9PT0gbnVsbClcbiAgICAgICAgICAgIHBhcmFtcy5wdXNoKGAtLSR7a2V5fWApO1xuICAgICAgICAgIGVsc2VcbiAgICAgICAgICAgIHBhcmFtcy5wdXNoKGAtLSR7a2V5fT0ke3ZhbH1gKTtcbiAgICAgICAgfVxuICAgICAgfVxuICAgICAgaWYgKGNvbmZpZy5mZWF0dXJlcykge1xuICAgICAgICBmb3IgKGNvbnN0IGtleSBvZiBjb25maWcuZmVhdHVyZXMpXG4gICAgICAgICAgcGFyYW1zLnB1c2goYC0tJHtrZXl9YCk7XG4gICAgICB9XG4gICAgICBjb25zdCByZXMxID0gYXdhaXQgc3Bhd25Bc3luYyhjb21tYW5kLCBwYXJhbXMsIHtcbiAgICAgICAgY3dkOiBiaW5hcnlEaXIsXG4gICAgICAgIGVudjogZW52aXJvbm1lbnQsXG4gICAgICAgIGV4dHJhOiB7XG4gICAgICAgICAgb3V0cHV0OiBgYWMuY29uZmlnLmxvZ2AsXG4gICAgICAgIH0sXG4gICAgICB9KTtcbiAgICAgIGlmIChyZXMxLnN0YXR1cyAhPT0gMCkge1xuICAgICAgICB0aHJvdyBgY29uZmlndXJlIHJldHVybmVkIHN0YXR1cyAke3JlczEuc3RhdHVzfWA7XG4gICAgICB9XG4gICAgICBzdGVwID0gXCJpbnN0YWxsXCI7XG4gICAgICBhd2FpdCBzZXR0aW5ncy5zZXQoXCJjb25maWd1cmVcIiwgc3RlcCk7XG4gICAgfVxuICAgIGlmIChzdGVwID09PSBcImluc3RhbGxcIikge1xuICAgICAgY29uc3QgYXJncyA9IFsgJ2luc3RhbGwnIF07XG4gICAgICBpZiAoY29uZmlnLmRlc3REaXIpIHtcbiAgICAgICAgYXJncy5wdXNoKGBERVNURElSPSR7Y29uZmlnLmRlc3REaXJ9YCk7XG4gICAgICB9XG4gICAgICBjb25zdCByZXMyID0gYXdhaXQgc3Bhd25Bc3luYyhcIm1ha2VcIiwgYXJncywge1xuICAgICAgICBjd2Q6IGJpbmFyeURpcixcbiAgICAgICAgZW52OiBlbnZpcm9ubWVudCxcbiAgICAgICAgZXh0cmE6IHtcbiAgICAgICAgICBvdXRwdXQ6IGBhYy5idWlsZC5sb2dgLFxuICAgICAgICB9LFxuICAgICAgfSk7XG4gICAgICBpZiAocmVzMi5zdGF0dXMgIT09IDApIHtcbiAgICAgICAgdGhyb3cgYG1ha2UgcmV0dXJuZWQgc3RhdHVzICR7cmVzMi5zdGF0dXN9YDtcbiAgICAgIH1cbiAgICAgIHN0ZXAgPSBcImRvbmVcIjtcbiAgICAgIGF3YWl0IHNldHRpbmdzLnNldChcImNvbmZpZ3VyZVwiLCBzdGVwKTtcbiAgICB9XG4gIH0sXG4gIG1ha2U6IGFzeW5jIChjb25maWcsIGVudmlyb25tZW50LCBzZXR0aW5ncykgPT4ge1xuICAgIGNvbnN0IGJpbmFyeURpciA9IGdldFBhdGhTdHJpbmcoY29uZmlnLmJpbmFyeURpcik7XG4gICAgY29uc3QgYXJncyA9IGNvbmZpZy5hcmdzIHx8IFtdO1xuICAgIGlmIChjb25maWcuZGVzdERpcikge1xuICAgICAgYXJncy5wdXNoKGBERVNURElSPSR7Y29uZmlnLmRlc3REaXJ9YCk7XG4gICAgfVxuICAgIGNvbnN0IHJlczIgPSBhd2FpdCBzcGF3bkFzeW5jKFwibWFrZVwiLCBhcmdzLCB7XG4gICAgICBjd2Q6IGJpbmFyeURpcixcbiAgICAgIGVudjogZW52aXJvbm1lbnQsXG4gICAgICBleHRyYToge1xuICAgICAgICBvdXRwdXQ6IGBtYWtlLmxvZ2AsXG4gICAgICB9LFxuICAgIH0pO1xuICAgIGlmIChyZXMyLnN0YXR1cyAhPT0gMCkge1xuICAgICAgdGhyb3cgYG1ha2UgcmV0dXJuZWQgc3RhdHVzICR7cmVzMi5zdGF0dXN9YDtcbiAgICB9XG4gIH0sXG4gIHByb2Nlc3M6IGFzeW5jIChjb25maWcsIGVudmlyb25tZW50LCBzZXR0aW5ncykgPT4ge1xuICAgIGlmICghY29uZmlnLmNvbW1hbmQpXG4gICAgICB0aHJvdyBcIlJlcXVpcmVkIGNvbW1hbmQgZmllbGQgZm9yIHByb2Nlc3MgYWN0aW9uXCI7XG4gICAgY29uc3Qgc291cmNlRGlyID0gZ2V0UGF0aFN0cmluZyhjb25maWcuc291cmNlRGlyKTtcbiAgICBjb25zdCBiaW5hcnlEaXIgPSBnZXRQYXRoU3RyaW5nKGNvbmZpZy5iaW5hcnlEaXIpO1xuICAgIGxldCB7IGNvbW1hbmQgfSA9IGNvbmZpZztcbiAgICBpZiAoIXBhdGguaXNBYnNvbHV0ZShjb21tYW5kKSAmJiAoY29tbWFuZC5pbmNsdWRlcyhwYXRoLnBvc2l4LmRlbGltaXRlcikgfHwgY29tbWFuZC5pbmNsdWRlcyhwYXRoLndpbjMyLmRlbGltaXRlcikpKSB7XG4gICAgICBjb21tYW5kID0gcGF0aC5yZXNvbHZlKHNvdXJjZURpciwgY29tbWFuZCk7XG4gICAgfVxuICAgIGNvbnN0IHJlcyA9IGF3YWl0IHNwYXduQXN5bmMoY29tbWFuZCwgY29uZmlnLmFyZ3MgfHwgW10sIHtcbiAgICAgIGN3ZDogYmluYXJ5RGlyLFxuICAgICAgZW52OiBlbnZpcm9ubWVudCxcbiAgICAgIGV4dHJhOiB7XG4gICAgICAgIG91dHB1dDogYHByb2Nlc3MubG9nYCxcbiAgICAgIH0sXG4gICAgfSk7XG4gICAgaWYgKHJlcy5zdGF0dXMgIT09IDApIHtcbiAgICAgIHRocm93IGBwcm9jZXNzIHJldHVybmVkIHN0YXR1cyAke3Jlcy5zdGF0dXN9YDtcbiAgICB9XG4gIH0sXG4gIGJpdG1ha2U6IGFjdGlvbk1ha2VTY3JpcHQsXG59O1xuXG5hc3luYyBmdW5jdGlvbiBkb1RhcmdldEJ1aWxkKGN0eCwgZW52aXJvbm1lbnQsIGNvbmZpZywgc2V0dGluZ3MpXG57XG4gIGlmIChjb25maWcucHJlQWN0aW9uKSB7XG4gICAgYXdhaXQgc2V0dGluZ3MucHVzaChcInByZUFjdGlvblwiKTtcbiAgICBjb25zdCBuZXdDb25maWcgPSB7fTtcbiAgICBhc3NpZ25PYmplY3QobmV3Q29uZmlnLCBjb25maWcpO1xuICAgIGRlbGV0ZSBuZXdDb25maWcuYWN0aW9uO1xuICAgIGRlbGV0ZSBuZXdDb25maWcucHJlQWN0aW9uO1xuICAgIGRlbGV0ZSBuZXdDb25maWcucG9zdEFjdGlvbjtcbiAgICBhc3NpZ25PYmplY3QobmV3Q29uZmlnLCBjb25maWcucHJlQWN0aW9uKTtcbiAgICBjb25zdCBuZXdFbnZpcm9ubWVudCA9IG1lcmdlRW52aXJvbm1lbnQoY29uZmlnLnByZUFjdGlvbi5lbnZpcm9ubWVudCwgZW52aXJvbm1lbnQpO1xuICAgIGF3YWl0IGRvVGFyZ2V0QnVpbGQoY3R4LCBuZXdFbnZpcm9ubWVudCwgbmV3Q29uZmlnLCBzZXR0aW5ncyk7XG4gICAgYXdhaXQgc2V0dGluZ3MucG9wKCk7XG4gIH1cblxuICBpZiAoQXJyYXkuaXNBcnJheShjb25maWcuYWN0aW9uKSkge1xuICAgIGF3YWl0IHNldHRpbmdzLnB1c2goXCJhY3Rpb25cIik7XG4gICAgZm9yICh2YXIgaSA9IDA7IGkgPCBjb25maWcuYWN0aW9uLmxlbmd0aDsgKytpKSB7XG4gICAgICBhd2FpdCBzZXR0aW5ncy5wdXNoKGkpO1xuICAgICAgY29uc3QgbmV3Q29uZmlnID0ge307XG4gICAgICBhc3NpZ25PYmplY3QobmV3Q29uZmlnLCBjb25maWcpO1xuICAgICAgZGVsZXRlIG5ld0NvbmZpZy5hY3Rpb247XG4gICAgICBkZWxldGUgbmV3Q29uZmlnLnByZUFjdGlvbjtcbiAgICAgIGRlbGV0ZSBuZXdDb25maWcucG9zdEFjdGlvbjtcbiAgICAgIGFzc2lnbk9iamVjdChuZXdDb25maWcsIGNvbmZpZy5hY3Rpb25baV0pO1xuICAgICAgY29uc3QgbmV3RW52aXJvbm1lbnQgPSBtZXJnZUVudmlyb25tZW50KGNvbmZpZy5hY3Rpb25baV0uZW52aXJvbm1lbnQsIGVudmlyb25tZW50KTtcbiAgICAgIGF3YWl0IGRvVGFyZ2V0QnVpbGQoY3R4LCBuZXdFbnZpcm9ubWVudCwgbmV3Q29uZmlnLCBzZXR0aW5ncyk7XG4gICAgICBhd2FpdCBzZXR0aW5ncy5wb3AoKTtcbiAgICB9XG4gICAgYXdhaXQgc2V0dGluZ3MucG9wKCk7XG4gIH1cbiAgZWxzZSB7XG4gICAgaWYgKCFhd2FpdCBkaXJlY3RvcnlFeGlzdHMoY29uZmlnLmJpbmFyeURpcikpIHtcbiAgICAgIGF3YWl0IGZzLnByb21pc2VzLm1rZGlyKGNvbmZpZy5iaW5hcnlEaXIsIHsgcmVjdXJzaXZlOiB0cnVlIH0pO1xuICAgIH1cbiAgICBpZiAoYWN0aW9uSGFuZGxlcnNbY29uZmlnLmFjdGlvbl0pIHtcbiAgICAgIGNvbmZpZy5kZXNjcmlwdGlvbiAmJiBjb25zb2xlLmxvZyhjb25maWcuZGVzY3JpcHRpb24pO1xuICAgICAgYXdhaXQgYWN0aW9uSGFuZGxlcnNbY29uZmlnLmFjdGlvbl0oY29uZmlnLCBlbnZpcm9ubWVudCwgc2V0dGluZ3MpO1xuICAgIH1cbiAgfVxuXG4gIGlmIChjb25maWcucG9zdEFjdGlvbikge1xuICAgIGF3YWl0IHNldHRpbmdzLnB1c2goXCJwb3N0QWN0aW9uXCIpO1xuICAgIGNvbnN0IG5ld0NvbmZpZyA9IHt9O1xuICAgIGFzc2lnbk9iamVjdChuZXdDb25maWcsIGNvbmZpZyk7XG4gICAgZGVsZXRlIG5ld0NvbmZpZy5hY3Rpb247XG4gICAgZGVsZXRlIG5ld0NvbmZpZy5wcmVBY3Rpb247XG4gICAgZGVsZXRlIG5ld0NvbmZpZy5wb3N0QWN0aW9uO1xuICAgIGFzc2lnbk9iamVjdChuZXdDb25maWcsIGNvbmZpZy5wb3N0QWN0aW9uKTtcbiAgICBjb25zdCBuZXdFbnZpcm9ubWVudCA9IG1lcmdlRW52aXJvbm1lbnQoY29uZmlnLnBvc3RBY3Rpb24uZW52aXJvbm1lbnQsIGVudmlyb25tZW50KTtcbiAgICBhd2FpdCBkb1RhcmdldEJ1aWxkKGN0eCwgbmV3RW52aXJvbm1lbnQsIG5ld0NvbmZpZywgc2V0dGluZ3MpO1xuICAgIGF3YWl0IHNldHRpbmdzLnBvcCgpO1xuICB9XG59XG5cbmV4cG9ydCBkZWZhdWx0IGFzeW5jIGZ1bmN0aW9uKGN0eCkge1xuICBjb25zdCB1c2VyQ29uZmlnID0gYXdhaXQgY3R4LmdldFVzZXJDb25maWcoKTtcbiAgY29uc3QgYnVpbGRDb25maWcgPSBtYWtlQnVpbGRDb25maWcoY3R4LCB1c2VyQ29uZmlnKTtcblxuICBjb25zdCBqc29uQ29uZmlnID0gSlNPTi5zdHJpbmdpZnkoYnVpbGRDb25maWcsIG51bGwsIDIpO1xuICBjb25zdCBkdW1wQ29uZmlnUGF0aCA9IHBhdGgucG9zaXguam9pbihidWlsZENvbmZpZy5iaW5hcnlSb290LCBCVUlMRF9DT05GSUdfRklMRSk7XG4gIGF3YWl0IHNhdmVJZkRpZmZlcmVudChkdW1wQ29uZmlnUGF0aCwganNvbkNvbmZpZyk7XG5cbiAgY29uc3Qgc2V0dGluZ3NGaWxlbmFtZSA9IHBhdGgucmVzb2x2ZShidWlsZENvbmZpZy5iaW5hcnlSb290LCBCVUlMRF9TRVRUSU5HU19GSUxFKTtcbiAgY29uc3Qgc2V0dGluZ3MgPSBuZXcgU2V0dGluZ3NTdG9yYWdlKHNldHRpbmdzRmlsZW5hbWUpO1xuXG4gIGZvciAoY29uc3QgW2tleSwgZW50cnldIG9mIE9iamVjdC5lbnRyaWVzKGJ1aWxkQ29uZmlnKSkge1xuICAgIGlmIChlbnRyeSAmJiB0eXBlb2YgZW50cnkgPT09IFwib2JqZWN0XCIgJiYgZW50cnkuYWN0aW9uICYmICFlbnRyeS5kaXNhYmxlZCkge1xuICAgICAgYXdhaXQgc2V0dGluZ3MucHVzaChrZXkpO1xuICAgICAgY29uc3QgY29tcGxldGVkID0gYXdhaXQgc2V0dGluZ3MuZ2V0KFwiY29tcGxldGVkXCIpO1xuICAgICAgaWYgKGVudHJ5LnJlYnVpbGQgfHwgIWNvbXBsZXRlZCkge1xuICAgICAgICBsb2dnZXIuaW5mbyhgU3RhcnRlZCBhY3Rpb246ICR7a2V5fWApO1xuICAgICAgICBjb25zdCBlbnZpcm9ubWVudCA9IG1lcmdlRW52aXJvbm1lbnQoZW50cnkuZW52aXJvbm1lbnQsIHByb2Nlc3MuZW52KTtcbiAgICAgICAgaWYgKGVudHJ5LnNvdXJjZVVybCkge1xuICAgICAgICAgIGF3YWl0IGRvRXh0cmFjdEFyY2hpdmUoY3R4LCBlbnZpcm9ubWVudCwgZW50cnksIHNldHRpbmdzKTtcbiAgICAgICAgfVxuICAgICAgICBhd2FpdCBkb1RhcmdldEJ1aWxkKGN0eCwgZW52aXJvbm1lbnQsIGVudHJ5LCBzZXR0aW5ncyk7XG4gICAgICAgIGF3YWl0IHNldHRpbmdzLnNldChcImNvbXBsZXRlZFwiLCB0cnVlKTtcbiAgICAgICAgbG9nZ2VyLmluZm8oYENvbXBsZXRlZCBhY3Rpb246ICR7a2V5fWApO1xuICAgICAgfVxuICAgICAgYXdhaXQgc2V0dGluZ3MucG9wKCk7XG4gICAgfVxuICB9XG59XG4iLCJtb2R1bGUuZXhwb3J0cyA9IHtcbiAgREVGQVVMVF9QUkVTRVQ6IFwibWFpblwiLFxuICBVU0VSX0NPTkZJRzogXCJiaXRtYWtlLmNvbmZpZy5tanNcIixcbiAgUkVRVUVTVF9BVFRFTVBUUzogMzAsXG4gIEJVSUxEX0NPTkZJR19GSUxFOiBcIkJ1aWxkQ29uZmlnLmpzb25cIixcbiAgQlVJTERfU0VUVElOR1NfRklMRTogXCJCdWlsZFNldHRpbmdzLmpzb25cIixcbn07XG4iLCJpbXBvcnQgZnMgZnJvbSBcIm5vZGU6ZnNcIjtcblxuaW1wb3J0IHsgZmlsZUV4aXN0cyB9IGZyb20gXCJAL3V0aWxzL0ZpbGVTeXN0ZW1cIjtcbmltcG9ydCB7IERFRkFVTFRfUFJFU0VUIH0gZnJvbSBcIkAvQ29uc3RhbnRzLmpzXCI7XG5cbmV4cG9ydCBkZWZhdWx0IGFzeW5jIGZ1bmN0aW9uKGN0eClcbntcbiAgY29uc3QgcHJlc2V0ID0gY3R4LmVudi5wcmVzZXQgfHwgREVGQVVMVF9QUkVTRVQ7XG4gIGNvbnN0IHByZXNldFBhdGggPSBjdHguZ2V0UHJlc2V0UGF0aChwcmVzZXQpO1xuICBpZiAoIWF3YWl0IGZpbGVFeGlzdHMocHJlc2V0UGF0aCkpXG4gICAgdGhyb3cgYFByZXNldCAnJHtwcmVzZXR9JyBpcyBub3QgYXZhaWxhYmxlYDtcblxuICBpZiAoYXdhaXQgZmlsZUV4aXN0cyhjdHgudXNlckNvbmZpZ1BhdGgpKVxuICAgIGF3YWl0IGZzLnByb21pc2VzLnJtKGN0eC51c2VyQ29uZmlnUGF0aCk7XG5cbiAgYXdhaXQgZnMucHJvbWlzZXMuY29weUZpbGUocHJlc2V0UGF0aCwgY3R4LnVzZXJDb25maWdQYXRoKTtcbiAgY29uc29sZS5sb2coYFByZXNldCAnJHtwcmVzZXR9JyBpbnN0YWxsZWQgc3VjY2Vzc2Z1bGx5YCk7XG59XG4iLCJcInVzZSBzdHJpY3RcIjtcblxuY29uc3QgZnMgPSByZXF1aXJlKFwibm9kZTpmc1wiKTtcbmNvbnN0IHBhdGggPSByZXF1aXJlKFwibm9kZTpwYXRoXCIpO1xuXG5jb25zdCB7IFVzZXJDb250ZXh0IH0gPSByZXF1aXJlKFwiLi9iaXRtYWtlL1VzZXJDb250ZXh0LmpzXCIpO1xuY29uc3QgeyBQbHVnaW5Db250ZXh0IH0gPSByZXF1aXJlKFwiLi9iaXRtYWtlL1BsdWdpbkNvbnRleHQuanNcIik7XG5jb25zdCB7IEdsb2JhbENvbnRleHQgfSA9IHJlcXVpcmUoXCIuL2JpdG1ha2UvR2xvYmFsQ29udGV4dC5qc1wiKTtcbmNvbnN0IHsgU3lzdGVtVmFyaWFibGVzIH0gPSByZXF1aXJlKFwiLi9iaXRtYWtlL1N5c3RlbVZhcmlhYmxlcy5qc1wiKTtcbmNvbnN0IHsgR29hbENvbGxlY3Rpb24gfSA9IHJlcXVpcmUoXCJAL2NvcmUvR29hbENvbGxlY3Rpb25cIik7XG5jb25zdCB7IGdldFBhdGhTdHJpbmcgfSAgPSByZXF1aXJlKFwiQC91dGlscy9GaWxlU3lzdGVtXCIpO1xuY29uc3QgeyBGaWxlUGF0aCB9ID0gcmVxdWlyZShcIkAvY29yZS9QYXRoXCIpO1xuY29uc3QgeyBpbXBvcnRNb2R1bGUgfSAgPSByZXF1aXJlKFwiQC91dGlscy9Nb2R1bGVcIik7XG5jb25zdCBTeXNWYXJzID0gcmVxdWlyZShcIkAvY29yZS9TeXN0ZW1WYXJpYWJsZXNcIik7XG5cbmNvbnN0IFBBQ0tBR0VfSlNPTiA9IFwicGFja2FnZS5qc29uXCI7XG5jb25zdCBNQUtFX0NBQ0hFID0gXCJNYWtlQ2FjaGUuanNvblwiO1xuXG5hc3luYyBmdW5jdGlvbiBhY3Rpb25NYWtlU2NyaXB0KGNvbmZpZywgZW52aXJvbm1lbnQsIHNldHRpbmdzKVxue1xuICBwcm9jZXNzLmVudiA9IGVudmlyb25tZW50O1xuXG4gIFN5c3RlbVZhcmlhYmxlcy5kZWZpbmVWYXJpYWJsZXMoU3lzdGVtVmFyaWFibGVzLnByb3RvdHlwZSwgU3lzVmFycy5kZWZhdWx0KTtcbiAgY29uc3Qgc2NvcGUgPSBTeXN0ZW1WYXJpYWJsZXMuY3JlYXRlKCk7XG5cbiAgY29uc3Qgc291cmNlRGlyID0gZ2V0UGF0aFN0cmluZyhjb25maWcuc291cmNlRGlyKTtcbiAgY29uc3QgYmluYXJ5RGlyID0gZ2V0UGF0aFN0cmluZyhjb25maWcuYmluYXJ5RGlyKTtcblxuICBzY29wZS5QUk9KRUNUX1NPVVJDRV9ESVIgPSBzb3VyY2VEaXI7XG4gIHNjb3BlLlBST0pFQ1RfQklOQVJZX0RJUiA9IGJpbmFyeURpcjtcblxuICBzY29wZS5QQUNLQUdFX0ZJTEUgPSBzY29wZS5QUk9KRUNUX1NPVVJDRV9ESVIuam9pbihQQUNLQUdFX0pTT04pO1xuICBzY29wZS5DQUNIRV9GSUxFID0gc2NvcGUuUFJPSkVDVF9CSU5BUllfRElSLmpvaW4oTUFLRV9DQUNIRSk7XG4gIHNjb3BlLlNPVVJDRV9ESVIgPSBzY29wZS5QUk9KRUNUX1NPVVJDRV9ESVI7XG4gIHNjb3BlLkJJTkFSWV9ESVIgPSBzY29wZS5QUk9KRUNUX0JJTkFSWV9ESVI7XG5cbiAgY29uc3QgZ2xvYmFsID0gR2xvYmFsQ29udGV4dC5jcmVhdGUoKTtcbiAgZ2xvYmFsLmxvYWRDYWNoZVZhcmlhYmxlcyhzY29wZS5DQUNIRV9GSUxFKTtcblxuICBjb25zdCBwYWNrYWdlSnNvbiA9IGF3YWl0IGZzLnByb21pc2VzLnJlYWRGaWxlKHNjb3BlLlBBQ0tBR0VfRklMRS50b1N0cmluZygpLCAndXRmOCcpO1xuICBjb25zdCBwa2cgPSBKU09OLnBhcnNlKHBhY2thZ2VKc29uKTtcblxuICBzY29wZS5CVUlMRF9UWVBFID0gY29uZmlnLmJ1aWxkVHlwZTtcbiAgc2NvcGUuUFJPSkVDVF9OQU1FID0gcGtnLm5hbWU7XG4gIHNjb3BlLlBST0pFQ1RfVkVSU0lPTiA9IHBrZy52ZXJzaW9uO1xuICBzY29wZS5QUk9KRUNUX0RFU0NSSVBUSU9OID0gcGtnLmRlc2NyaXB0aW9uO1xuICBzY29wZS5QUk9KRUNUX0hPTUVQQUdFX1VSTCA9IHBrZy5ob21lcGFnZTtcblxuICBpZiAoY29uZmlnLmRlc3REaXIpXG4gICAgc2NvcGUuREVTVERJUiA9IGNvbmZpZy5kZXN0RGlyO1xuXG4gIGNvbnN0IHJvb3QgPSBVc2VyQ29udGV4dC5jcmVhdGUoc2NvcGUsIGdsb2JhbCk7XG5cbiAgaWYgKGNvbmZpZy52YXJpYWJsZXMpIHtcbiAgICBmb3IgKGNvbnN0IFtrZXksIHZhbF0gb2YgT2JqZWN0LmVudHJpZXMoY29uZmlnLnZhcmlhYmxlcykpIHtcbiAgICAgIGlmIChrZXkgPT09IFwiSU5TVEFMTF9QUkVGSVhcIilcbiAgICAgICAgcm9vdC5JTlNUQUxMX1BSRUZJWCA9IHZhbDtcbiAgICAgIGVsc2UgaWYgKGtleSA9PT0gXCJHTE9CQUxfQ09OVEVYVF9KU09OXCIpXG4gICAgICAgIHJvb3QuR0xPQkFMX0NPTlRFWFRfSlNPTiA9IEZpbGVQYXRoLmNyZWF0ZSh2YWwpO1xuICAgICAgZWxzZSBpZiAoa2V5ID09PSBcIlRBUkdFVF9HT0FMU19KU09OXCIpXG4gICAgICAgIHJvb3QuVEFSR0VUX0dPQUxTX0pTT04gPSBGaWxlUGF0aC5jcmVhdGUodmFsKTtcbiAgICAgIGVsc2VcbiAgICAgICAgcm9vdFtrZXldID0gdmFsO1xuICAgIH1cbiAgfVxuXG4gIGlmIChyb290LlRPT0xDSEFJTl9GSUxFKSB7XG4gICAgY29uc3QgdG9vbGNoYWluID0gYXdhaXQgaW1wb3J0TW9kdWxlKHJvb3QuVE9PTENIQUlOX0ZJTEUpO1xuICAgIGlmICghdG9vbGNoYWluLmRlZmF1bHQpXG4gICAgICB0aHJvdyBuZXcgRXJyb3IoXCJUb29sY2hhaW4gbW9kdWxlIGhhcyBubyBkZWZhdWx0IGV4cG9ydFwiKTtcbiAgICBjb25zdCByZXN1bHQgPSB0b29sY2hhaW4uZGVmYXVsdChyb290KTtcbiAgICBpZiAocmVzdWx0IGluc3RhbmNlb2YgUHJvbWlzZSlcbiAgICAgIGF3YWl0IHJlc3VsdDtcbiAgfVxuXG4gIGNvbnN0IHBsdWdpbkNvbnRleHQgPSBQbHVnaW5Db250ZXh0LmNyZWF0ZShzY29wZSwgZ2xvYmFsKTtcbiAgZm9yIChjb25zdCBwbHVnaW4gb2YgKHJvb3QuTUFLRV9QTFVHSU5fTElTVCB8fCBbXSkpIHtcbiAgICBjb25zdCBmaWxlbmFtZSA9IEZpbGVQYXRoLmNyZWF0ZShwbHVnaW4pO1xuICAgIGNvbnN0IG1vZHVsZSA9IGF3YWl0IGltcG9ydE1vZHVsZShmaWxlbmFtZS50b1N0cmluZygpKTtcbiAgICBpZiAoIW1vZHVsZS5wbHVnaW5FbnRyeSlcbiAgICAgIHRocm93IG5ldyBFcnJvcihgUGx1Z2luICR7ZmlsZW5hbWUuYmFzZW5hbWUoKX0gbm90IGNvbnRhaW4gcGx1Z2luRW50cnkgZnVuY3Rpb25gKTtcbiAgICBjb25zdCByZXN1bHQgPSBtb2R1bGUucGx1Z2luRW50cnkocGx1Z2luQ29udGV4dCk7XG4gICAgaWYgKHJlc3VsdCBpbnN0YW5jZW9mIFByb21pc2UpXG4gICAgICBhd2FpdCByZXN1bHQ7XG4gIH1cblxuICBnbG9iYWwuYWRkU3ViZGlyZWN0b3J5KHJvb3QpO1xuICBhd2FpdCBnbG9iYWwuZG9TdWJkaXJlY3RvcnkoKTtcbiAgcm9vdC5sb2dJbmZvKFwiQ29uZmlndXJpbmcgZG9uZVwiKTtcblxuICBpZiAocm9vdC5HTE9CQUxfQ09OVEVYVF9KU09OKSB7XG4gICAgY29uc3QgZmlsZW5hbWUgPSByb290LkdMT0JBTF9DT05URVhUX0pTT04udG9TdHJpbmcoKTtcbiAgICBjb25zdCBjb250ZW50ID0gSlNPTi5zdHJpbmdpZnkoZ2xvYmFsLCBudWxsLCAyKTtcbiAgICBmcy5ta2RpclN5bmMocGF0aC5kaXJuYW1lKGZpbGVuYW1lKSwgeyByZWN1cnNpdmU6IHRydWUgfSk7XG4gICAgZnMud3JpdGVGaWxlU3luYyhmaWxlbmFtZSwgY29udGVudCwgeyBlbmNvZGluZzogXCJ1dGY4XCIgfSk7XG4gIH1cblxuICBjb25zdCBhbGxHb2FsTGlzdCA9IGdsb2JhbC5jcmVhdGVHb2Fscyhyb290KTtcbiAgY29uc3QgZ29hbExpc3QgPSBhbGxHb2FsTGlzdC5nZXRUYXJnZXRMaXN0KFwiaW5zdGFsbFwiKTtcblxuICBpZiAocm9vdC5UQVJHRVRfR09BTFNfSlNPTikge1xuICAgIGNvbnN0IGZpbGVuYW1lID0gcm9vdC5UQVJHRVRfR09BTFNfSlNPTi50b1N0cmluZygpO1xuICAgIGNvbnN0IGNvbnRlbnQgPSBKU09OLnN0cmluZ2lmeShnb2FsTGlzdCwgbnVsbCwgMik7XG4gICAgZnMubWtkaXJTeW5jKHBhdGguZGlybmFtZShmaWxlbmFtZSksIHsgcmVjdXJzaXZlOiB0cnVlIH0pO1xuICAgIGZzLndyaXRlRmlsZVN5bmMoZmlsZW5hbWUsIGNvbnRlbnQsIHsgZW5jb2Rpbmc6IFwidXRmOFwiIH0pO1xuICB9XG5cbiAgYXdhaXQgR29hbENvbGxlY3Rpb24uYnVpbGRHb2Fscyhnb2FsTGlzdCk7XG59XG5cbm1vZHVsZS5leHBvcnRzID0ge1xuICBhY3Rpb25NYWtlU2NyaXB0LFxufTtcbiIsImltcG9ydCBwYXRoIGZyb20gXCJub2RlOnBhdGhcIjtcbmltcG9ydCB1cmwgZnJvbSBcIm5vZGU6dXJsXCI7XG5cbmltcG9ydCB7IGZpbGVFeGlzdHMgfSBmcm9tIFwiQC91dGlscy9GaWxlU3lzdGVtXCI7XG5pbXBvcnQgY29uc3RhbnRzIGZyb20gXCJAL0NvbnN0YW50cy5qc1wiO1xuaW1wb3J0IHsgREVCVUdfQlVJTERfVFlQRSwgUkVMRUFTRV9CVUlMRF9UWVBFIH0gZnJvbSBcIkAvY29yZS9UeXBlc1wiO1xuaW1wb3J0IHsgaW1wb3J0TW9kdWxlIH0gZnJvbSBcIkAvdXRpbHMvTW9kdWxlXCI7XG5cbmNvbnN0IHsgVVNFUl9DT05GSUcsIERFRkFVTFRfUFJFU0VULCBSRVFVRVNUX0FUVEVNUFRTIH0gPSBjb25zdGFudHM7XG5cbmV4cG9ydCBjbGFzcyBSdW5TY3JpcHRDb250ZXh0IHtcbiAgX25vZGVFeGVjdXRhYmxlO1xuICBfY3VycmVudFNjcmlwdDtcbiAgX3NjcmlwdERpcjtcbiAgX3Jvb3REaXI7XG4gIF93b3JrRGlyO1xuICBfZW52O1xuICBfdXNlckNvbmZpZztcblxuICBjb25zdHJ1Y3RvcihvcHRpb25zKVxuICB7XG4gICAgdGhpcy5fbm9kZUV4ZWN1dGFibGUgPSBvcHRpb25zLm5vZGVFeGVjdXRhYmxlO1xuICAgIHRoaXMuX2N1cnJlbnRTY3JpcHQgPSBvcHRpb25zLmN1cnJlbnRTY3JpcHQ7XG4gICAgdGhpcy5fc2NyaXB0RGlyID0gb3B0aW9ucy5zY3JpcHREaXI7XG4gICAgdGhpcy5fcm9vdERpciA9IG9wdGlvbnMucm9vdERpcjtcbiAgICB0aGlzLl93b3JrRGlyID0gb3B0aW9ucy53b3JrRGlyO1xuICAgIHRoaXMuX2VudiA9IE9iamVjdC5zZWFsKE9iamVjdC5mcmVlemUob3B0aW9ucy5lbnYpKTtcblxuICAgIGlmIChvcHRpb25zLnVzZXJDb25maWcpIHtcbiAgICAgIHRoaXMuX3VzZXJDb25maWcgPSBvcHRpb25zLnVzZXJDb25maWc7XG4gICAgfVxuICB9XG5cbiAgZ2V0IG5vZGVFeGVjdXRhYmxlKClcbiAge1xuICAgIHJldHVybiB0aGlzLl9ub2RlRXhlY3V0YWJsZTtcbiAgfVxuXG4gIGdldCBjdXJyZW50U2NyaXB0KClcbiAge1xuICAgIHJldHVybiB0aGlzLl9jdXJyZW50U2NyaXB0O1xuICB9XG5cbiAgZ2V0IHNjcmlwdERpcigpXG4gIHtcbiAgICByZXR1cm4gdGhpcy5fc2NyaXB0RGlyO1xuICB9XG5cbiAgZ2V0IHJvb3REaXIoKVxuICB7XG4gICAgcmV0dXJuIHRoaXMuX3Jvb3REaXI7XG4gIH1cblxuICBnZXQgd29ya0RpcigpXG4gIHtcbiAgICByZXR1cm4gdGhpcy5fd29ya0RpcjtcbiAgfVxuXG4gIGdldCBlbnYoKVxuICB7XG4gICAgcmV0dXJuIHRoaXMuX2VudjtcbiAgfVxuXG4gIGdldFByZXNldFBhdGgocHJlc2V0KVxuICB7XG4gICAgcmV0dXJuIHBhdGgucmVzb2x2ZSh0aGlzLl9zY3JpcHREaXIsIGBwcmVzZXQvJHtwcmVzZXR9Lm1qc2ApO1xuICB9XG5cbiAgZ2V0IHVzZXJDb25maWdQYXRoKClcbiAge1xuICAgIHJldHVybiBwYXRoLnJlc29sdmUodGhpcy5fd29ya0RpciwgVVNFUl9DT05GSUcpO1xuICB9XG5cbiAgZ2V0IGJ1aWxkVHlwZSgpXG4gIHtcbiAgICByZXR1cm4gdGhpcy5fZW52LmJ1aWxkVHlwZSA9PSBERUJVR19CVUlMRF9UWVBFID8gdGhpcy5fZW52LmJ1aWxkVHlwZSA6IFJFTEVBU0VfQlVJTERfVFlQRTtcbiAgfVxuXG4gIGFzeW5jIGdldFVzZXJDb25maWcoKVxuICB7XG4gICAgaWYgKCF0aGlzLl91c2VyQ29uZmlnKSB7XG4gICAgICBsZXQgY29uZmlnUGF0aDtcbiAgICAgIGlmICh0aGlzLl9lbnYuY29uZmlnKSB7XG4gICAgICAgIGNvbmZpZ1BhdGggPSBwYXRoLmlzQWJzb2x1dGUodGhpcy5fZW52LmNvbmZpZykgPyB0aGlzLl9lbnYuY29uZmlnIDogcGF0aC5yZXNvbHZlKHRoaXMuX3dvcmtEaXIsIHRoaXMuX2Vudi5jb25maWcpO1xuICAgICAgICBpZiAoIWF3YWl0IGZpbGVFeGlzdHMoY29uZmlnUGF0aCkpXG4gICAgICAgICAgdGhyb3cgYENvbmZpZ3VyYXRpb24gJyR7dGhpcy5fZW52LmNvbmZpZ30nIGZpbGUgZG9lcyBub3QgZXhpc3RgO1xuICAgICAgfVxuICAgICAgZWxzZSB7XG4gICAgICAgIGNvbnN0IHVzZXJDb25maWdQYXRoID0gcGF0aC5yZXNvbHZlKHRoaXMuX3dvcmtEaXIsIFVTRVJfQ09ORklHKTtcbiAgICAgICAgaWYgKGF3YWl0IGZpbGVFeGlzdHModXNlckNvbmZpZ1BhdGgpKVxuICAgICAgICAgIGNvbmZpZ1BhdGggPSB1c2VyQ29uZmlnUGF0aDtcbiAgICAgICAgZWxzZVxuICAgICAgICAgIGNvbmZpZ1BhdGggPSB0aGlzLmdldFByZXNldFBhdGgoREVGQVVMVF9QUkVTRVQpO1xuICAgICAgfVxuXG4gICAgICBsZXQgdXNlckNvbmZpZyA9IHt9O1xuXG4gICAgICBpZiAoY29uZmlnUGF0aCkge1xuICAgICAgICBjb25zdCBjb25maWdVcmwgPSB1cmwucGF0aFRvRmlsZVVSTChjb25maWdQYXRoKTtcbiAgICAgICAgY29uc3QgY29uZmlnTW9kdWxlID0gYXdhaXQgaW1wb3J0TW9kdWxlKGNvbmZpZ1VybCk7XG4gICAgICAgIHN3aXRjaCAodHlwZW9mIGNvbmZpZ01vZHVsZS5kZWZhdWx0KSB7XG4gICAgICAgIGNhc2UgXCJmdW5jdGlvblwiOlxuICAgICAgICAgIHVzZXJDb25maWcgPSBjb25maWdNb2R1bGUuZGVmYXVsdCh0aGlzLl9lbnYsIHt9KTtcbiAgICAgICAgICBpZiAodXNlckNvbmZpZyBpbnN0YW5jZW9mIFByb21pc2UpXG4gICAgICAgICAgICB1c2VyQ29uZmlnID0gYXdhaXQgdXNlckNvbmZpZztcbiAgICAgICAgICBicmVhaztcbiAgICAgICAgY2FzZSBcIm9iamVjdFwiOlxuICAgICAgICAgIHVzZXJDb25maWcgPSBjb25maWdNb2R1bGUuZGVmYXVsdDtcbiAgICAgICAgICBicmVhaztcbiAgICAgICAgZGVmYXVsdDpcbiAgICAgICAgICB0aHJvdyBgVW5rbm93biB1c2VyIGNvbmZpZ3VyYXRpb24gdHlwZWA7XG4gICAgICAgIH1cbiAgICAgIH1cblxuICAgICAgdGhpcy5fdXNlckNvbmZpZyA9IHVzZXJDb25maWc7XG4gICAgfVxuICAgIHJldHVybiB0aGlzLl91c2VyQ29uZmlnO1xuICB9XG5cbiAgZ2V0IHJlcXVlc3RBdHRlbXB0cygpXG4gIHtcbiAgICByZXR1cm4gUkVRVUVTVF9BVFRFTVBUUztcbiAgfVxufTtcbiIsIlwidXNlIHN0cmljdFwiO1xuXG5jb25zdCB7IGVuc3VyZVN0cmluZyB9ID0gcmVxdWlyZShcIkAvdXRpbHMvU3RyaWN0VHlwZVwiKTtcbmNvbnN0IHsgQWJzb2x1dGVQYXRoIH0gPSByZXF1aXJlKFwiQC9jb3JlL1BhdGhcIik7XG5cbmNvbnN0IFRBUkdFVF9TQ09QRSA9IFN5bWJvbChcIlRBUkdFVF9TQ09QRVwiKTtcbmNvbnN0IE5BTUUgICAgICAgICA9IFN5bWJvbChcIk5BTUVcIik7XG5jb25zdCBGSUxFICAgICAgICAgPSBTeW1ib2woXCJGSUxFXCIpO1xuY29uc3QgSU5QVVQgICAgICAgID0gU3ltYm9sKFwiSU5QVVRcIik7XG5jb25zdCBPVVRQVVQgICAgICAgPSBTeW1ib2woXCJPVVRQVVRcIik7XG5jb25zdCBQQVJBTVMgICAgICAgPSBTeW1ib2woXCJQQVJBTVNcIik7XG5jb25zdCBQUk9QRVJUSUVTICAgPSBTeW1ib2woXCJQUk9QRVJUSUVTXCIpO1xuXG5jb25zdCBTWVNURU1fU0NSSVBUU19ESVIgPSBBYnNvbHV0ZVBhdGguY3JlYXRlKF9fZGlybmFtZSkuam9pbihcIlN5c3RlbVNjcmlwdHNcIik7XG5cbmZ1bmN0aW9uIEN1c3RvbVNjcmlwdChzY29wZSwgbmFtZSwgcGFyYW1zKSB7XG4gIHRoaXNbVEFSR0VUX1NDT1BFXSA9IHNjb3BlO1xuICB0aGlzW05BTUVdID0gZW5zdXJlU3RyaW5nKG5hbWUpO1xuXG4gIGlmICghcGFyYW1zIHx8ICFwYXJhbXMuc2NyaXB0IHx8ICFwYXJhbXMub3V0cHV0KVxuICAgIHRocm93IG5ldyBFcnJvcihgVWtub3duIHBhcmFtcyAke0pTT04uc3RyaW5naWZ5KHBhcmFtcyl9YCk7XG5cbiAgaWYgKC9bLlxcL1xcXFxdLy50ZXN0KHBhcmFtcy5zY3JpcHQpKVxuICAgIHRoaXNbRklMRV0gPSBzY29wZS5TT1VSQ0VfRElSLnJlc29sdmUocGFyYW1zLnNjcmlwdCk7XG4gIGVsc2VcbiAgICB0aGlzW0ZJTEVdID0gU1lTVEVNX1NDUklQVFNfRElSLmpvaW4ocGFyYW1zLnNjcmlwdCArIFwiLmpzXCIpO1xuXG4gIHRoaXNbSU5QVVRdID0gcGFyYW1zLmlucHV0IHx8IG51bGw7XG4gIHRoaXNbT1VUUFVUXSA9IHBhcmFtcy5vdXRwdXQ7XG4gIHRoaXNbUEFSQU1TXSA9IHBhcmFtcztcbiAgdGhpc1tQUk9QRVJUSUVTXSA9IHt9O1xufVxuXG5DdXN0b21TY3JpcHQuY3JlYXRlID0gZnVuY3Rpb24oc2NvcGUsIG5hbWUsIHBhcmFtcykge1xuICByZXR1cm4gT2JqZWN0LnNlYWwobmV3IEN1c3RvbVNjcmlwdChzY29wZSwgbmFtZSwgcGFyYW1zKSk7XG59XG5cbkN1c3RvbVNjcmlwdC5wcm90b3R5cGUgPSBPYmplY3QuY3JlYXRlKE9iamVjdC5wcm90b3R5cGUsIHtcbiAgY29uc3RydWN0b3I6IHtcbiAgICB2YWx1ZTogQ3VzdG9tU2NyaXB0LFxuICAgIGVudW1lcmFibGU6IGZhbHNlLFxuICB9LFxuICBOQU1FOiB7XG4gICAgZ2V0KCkgeyByZXR1cm4gdGhpc1tOQU1FXTsgfSxcbiAgICBlbnVtZXJhYmxlOiB0cnVlLFxuICB9LFxuICBUQVJHRVRfU0NPUEU6IHtcbiAgICBnZXQoKSB7IHJldHVybiB0aGlzW1RBUkdFVF9TQ09QRV07IH0sXG4gICAgZW51bWVyYWJsZTogdHJ1ZSxcbiAgfSxcbiAgRklMRToge1xuICAgIGdldCgpIHsgcmV0dXJuIHRoaXNbRklMRV07IH0sXG4gICAgZW51bWVyYWJsZTogdHJ1ZSxcbiAgfSxcbiAgSU5QVVQ6IHtcbiAgICBnZXQoKSB7IHJldHVybiB0aGlzW0lOUFVUXTsgfSxcbiAgICBzZXQodmFsdWUpIHsgdGhpc1tJTlBVVF0gPSB0aGlzW1RBUkdFVF9TQ09QRV0uU09VUkNFX0RJUi5yZXNvbHZlKHZhbHVlKTsgfSxcbiAgICBlbnVtZXJhYmxlOiB0cnVlLFxuICB9LFxuICBPVVRQVVQ6IHtcbiAgICBnZXQoKSB7IHJldHVybiB0aGlzW09VVFBVVF07IH0sXG4gICAgc2V0KHZhbHVlKSB7IHRoaXNbT1VUUFVUXSA9IEFic29sdXRlUGF0aC5jcmVhdGUodmFsdWUpOyB9LFxuICAgIGVudW1lcmFibGU6IHRydWUsXG4gIH0sXG4gIFBBUkFNUzoge1xuICAgIGdldCgpIHsgcmV0dXJuIHRoaXNbUEFSQU1TXTsgfSxcbiAgICBzZXQodmFsdWUpIHsgdGhpc1tQQVJBTVNdID0gdmFsdWU7IH0sXG4gICAgZW51bWVyYWJsZTogdHJ1ZSxcbiAgfSxcbiAgUFJPUEVSVElFUzoge1xuICAgIGdldCAoKSB7IHJldHVybiB0aGlzW1BST1BFUlRJRVNdOyB9LFxuICAgIGVudW1lcmFibGU6IHRydWUsXG4gIH0sXG59KTtcblxuQ3VzdG9tU2NyaXB0LnByb3RvdHlwZS50b1N0cmluZyA9IGZ1bmN0aW9uKCkge1xuICByZXR1cm4gdGhpc1tOQU1FXS50b1N0cmluZygpO1xufVxuXG5DdXN0b21TY3JpcHQucHJvdG90eXBlLnRvSlNPTiA9IGZ1bmN0aW9uKCkge1xuICBjb25zdCBqc29uID0ge307XG4gIGZvciAoY29uc3Qga2V5IGluIHRoaXMpXG4gICAganNvbltrZXldID0gdGhpc1trZXldO1xuICByZXR1cm4ganNvbjtcbn1cblxuQ3VzdG9tU2NyaXB0LnByb3RvdHlwZS5hZGRQcm9wZXJ0eSA9IGZ1bmN0aW9uKGtleSwgLi4udmFscykge1xuICBsZXQgcHJvcGVydHkgPSB0aGlzW1BST1BFUlRJRVNdW2tleV07XG4gIGlmICghcHJvcGVydHkpIHtcbiAgICBwcm9wZXJ0eSA9IFtdO1xuICAgIHRoaXNbUFJPUEVSVElFU11ba2V5XSA9IHByb3BlcnR5O1xuICB9XG4gIHZhbHMuZm9yRWFjaCh2ID0+IHByb3BlcnR5LnB1c2godikpO1xufVxuXG5tb2R1bGUuZXhwb3J0cyA9IHtcbiAgQ3VzdG9tU2NyaXB0LFxufTtcbiIsIlwidXNlIHN0cmljdFwiO1xuXG5jb25zdCBwYXRoID0gcmVxdWlyZShcIm5vZGU6cGF0aFwiKTtcbmNvbnN0IGZzID0gcmVxdWlyZShcIm5vZGU6ZnNcIik7XG5cbmNvbnN0IHsgQWJzb2x1dGVQYXRoIH0gPSByZXF1aXJlKFwiQC9jb3JlL1BhdGhcIik7XG5jb25zdCB7IGZpbGVFeGlzdHMsIGZpbGVFeGlzdHNTeW5jIH0gPSByZXF1aXJlKFwiQC91dGlscy9GaWxlU3lzdGVtXCIpO1xuY29uc3QgeyBUYXJnZXRDb2xsZWN0aW9uIH0gPSByZXF1aXJlKFwiLi9UYXJnZXRDb2xsZWN0aW9uLmpzXCIpO1xuY29uc3QgeyBTY3JpcHRDb2xsZWN0aW9uIH0gPSByZXF1aXJlKFwiLi9TY3JpcHRDb2xsZWN0aW9uLmpzXCIpO1xuY29uc3QgeyBJbnRlcmZhY2VUYXJnZXQgfSA9IHJlcXVpcmUoXCIuL0ludGVyZmFjZVRhcmdldC5qc1wiKTtcbmNvbnN0IHsgVW5rbm93blRhcmdldCB9ID0gcmVxdWlyZShcIi4vVW5rbm93blRhcmdldC5qc1wiKTtcbmNvbnN0IHsgR29hbENvbGxlY3Rpb24gfSA9IHJlcXVpcmUoXCJAL2NvcmUvR29hbENvbGxlY3Rpb25cIik7XG5jb25zdCB7IEludGVyZmFjZU9iamVjdHMgfSA9IHJlcXVpcmUoXCIuL0ludGVyZmFjZU9iamVjdHMuanNcIik7XG5jb25zdCB7IFNvdXJjZUZpbGUgfSA9IHJlcXVpcmUoXCIuL1NvdXJjZUZpbGUuanNcIik7XG5jb25zdCB7IE9iamVjdExpYnJhcnksIFN0YXRpY0xpYnJhcnksIFNoYXJlZExpYnJhcnksIEV4ZWN1dGFibGUgfSA9IHJlcXVpcmUoXCIuL1RhcmdldC5qc1wiKTtcbmNvbnN0IHsgRGlyUGF0aCwgRmlsZVBhdGggfSA9IHJlcXVpcmUoXCJAL2NvcmUvUGF0aFwiKTtcbmNvbnN0IHsgaW1wb3J0TW9kdWxlIH0gPSByZXF1aXJlKFwiQC91dGlscy9Nb2R1bGVcIik7XG5cbmNvbnN0IHJlcXVpcmVJbXBsID0gZXZhbChcInJlcXVpcmVcIik7XG5cbmNvbnN0IFRBUkdFVFMgPSBTeW1ib2woXCJUQVJHRVRTXCIpO1xuY29uc3QgU0NSSVBUUyA9IFN5bWJvbChcIlNDUklQVFNcIik7XG5jb25zdCBDQUNIRSA9IFN5bWJvbChcIkNBQ0hFXCIpO1xuY29uc3QgVU5LTk9XTl9UQVJHRVRTID0gU3ltYm9sKFwiVU5LTk9XTl9UQVJHRVRTXCIpO1xuY29uc3QgSU5URVJGQUNFX1NDUklQVFMgPSBTeW1ib2woXCJJTlRFUkZBQ0VfU0NSSVBUU1wiKTtcbmNvbnN0IElOU1RBTExfTElTVCA9IFN5bWJvbChcIklOU1RBTExfTElTVFwiKTtcbmNvbnN0IFNDUklQVF9WQVJJQUJMRVNfTUFQID0gU3ltYm9sKFwiU0NSSVBUX1ZBUklBQkxFU19NQVBcIik7XG5jb25zdCBTVUJESVJfQUxJQVMgPSBTeW1ib2woXCJTVUJESVJfQUxJQVNcIik7XG5jb25zdCBTVUJESVJfTElTVCA9IFN5bWJvbChcIlNVQkRJUl9MSVNUXCIpO1xuXG5mdW5jdGlvbiBHbG9iYWxDb250ZXh0KCkge1xuICB0aGlzW1RBUkdFVFNdID0gVGFyZ2V0Q29sbGVjdGlvbi5jcmVhdGUoKTtcbiAgdGhpc1tTQ1JJUFRTXSA9IFNjcmlwdENvbGxlY3Rpb24uY3JlYXRlKCk7XG4gIHRoaXNbQ0FDSEVdID0ge307XG4gIHRoaXNbVU5LTk9XTl9UQVJHRVRTXSA9IHt9O1xuICB0aGlzW0lOVEVSRkFDRV9TQ1JJUFRTXSA9IHt9O1xuICB0aGlzW0lOU1RBTExfTElTVF0gPSBbXTtcbiAgdGhpc1tTQ1JJUFRfVkFSSUFCTEVTX01BUF0gPSB7fTtcbiAgdGhpc1tTVUJESVJfQUxJQVNdID0ge307XG4gIHRoaXNbU1VCRElSX0xJU1RdID0gW107XG59XG5cbkdsb2JhbENvbnRleHQuY3JlYXRlID0gKCkgPT4ge1xuICByZXR1cm4gT2JqZWN0LnNlYWwobmV3IEdsb2JhbENvbnRleHQpO1xufVxuXG5HbG9iYWxDb250ZXh0LnByb3RvdHlwZSA9IE9iamVjdC5jcmVhdGUoT2JqZWN0LnByb3RvdHlwZSwge1xuICBjb25zdHJ1Y3Rvcjoge1xuICAgIHZhbHVlOiBHbG9iYWxDb250ZXh0LFxuICAgIGVudW1lcmFibGU6IGZhbHNlLFxuICB9LFxuICBUQVJHRVRTOiB7XG4gICAgZ2V0KCkgeyByZXR1cm4gdGhpc1tUQVJHRVRTXTsgfSxcbiAgICBlbnVtZXJhYmxlOiB0cnVlLFxuICB9LFxuICBTQ1JJUFRTOiB7XG4gICAgZ2V0KCkgeyByZXR1cm4gdGhpc1tTQ1JJUFRTXTsgfSxcbiAgICBlbnVtZXJhYmxlOiB0cnVlLFxuICB9LFxuICBDQUNIRToge1xuICAgIGdldCgpIHsgcmV0dXJuIHRoaXNbQ0FDSEVdOyB9LFxuICAgIGVudW1lcmFibGU6IHRydWUsXG4gIH0sXG4gIFVOS05PV05fVEFSR0VUUzoge1xuICAgIGdldCgpIHsgcmV0dXJuIHRoaXNbVU5LTk9XTl9UQVJHRVRTXTsgfSxcbiAgICBlbnVtZXJhYmxlOiB0cnVlLFxuICB9LFxuICBJTlRFUkZBQ0VfU0NSSVBUUzoge1xuICAgIGdldCgpIHsgcmV0dXJuIHRoaXNbSU5URVJGQUNFX1NDUklQVFNdOyB9LFxuICAgIGVudW1lcmFibGU6IHRydWUsXG4gIH0sXG4gIElOU1RBTExfTElTVDoge1xuICAgIGdldCgpIHsgcmV0dXJuIHRoaXNbSU5TVEFMTF9MSVNUXTsgfSxcbiAgICBlbnVtZXJhYmxlOiB0cnVlLFxuICB9LFxuICBTQ1JJUFRfVkFSSUFCTEVTX01BUDoge1xuICAgIGdldCgpIHsgcmV0dXJuIHRoaXNbU0NSSVBUX1ZBUklBQkxFU19NQVBdOyB9LFxuICAgIGVudW1lcmFibGU6IHRydWUsXG4gIH0sXG4gIFNVQkRJUl9BTElBUzoge1xuICAgIGdldCgpIHsgcmV0dXJuIHRoaXNbU1VCRElSX0FMSUFTXTsgfSxcbiAgICBlbnVtZXJhYmxlOiB0cnVlLFxuICB9LFxufSk7XG5cbkdsb2JhbENvbnRleHQucHJvdG90eXBlLnRvSlNPTiA9IGZ1bmN0aW9uKCkge1xuICBjb25zdCBqc29uID0ge307XG4gIGZvciAoY29uc3Qga2V5IGluIHRoaXMpXG4gICAganNvbltrZXldID0gdGhpc1trZXldO1xuICByZXR1cm4ganNvbjtcbn1cblxuR2xvYmFsQ29udGV4dC5wcm90b3R5cGUuZ2V0VWtub3duVGFyZ2V0ID0gZnVuY3Rpb24obmFtZSkge1xuICBsZXQgdGFyZ2V0ID0gdGhpc1tVTktOT1dOX1RBUkdFVFNdW25hbWVdO1xuICBpZiAoIXRhcmdldCkge1xuICAgIHRoaXNbVU5LTk9XTl9UQVJHRVRTXVtuYW1lXSA9IHRhcmdldCA9IFVua25vd25UYXJnZXQuY3JlYXRlKG5hbWUpO1xuICB9XG4gIHJldHVybiB0YXJnZXQ7XG59XG5cbkdsb2JhbENvbnRleHQucHJvdG90eXBlLmFkZFN5c3RlbVZhcmlhYmxlcyA9IGZ1bmN0aW9uKHZhcmlhYmxlcykge1xuICBjb25zdCBzY3JpcHQgPSB2YXJpYWJsZXMuU0NSSVBUX0ZJTEUudG9TdHJpbmcoKTtcbiAgaWYgKHRoaXNbU0NSSVBUX1ZBUklBQkxFU19NQVBdW3NjcmlwdF0pXG4gICAgdGhyb3cgbmV3IEVycm9yKGBTeXN0ZW1WYXJpYWJsZXMgZXhpc3RzIGZvciAke3NjcmlwdH1gKTtcbiAgdGhpc1tTQ1JJUFRfVkFSSUFCTEVTX01BUF1bc2NyaXB0XSA9IHZhcmlhYmxlcztcbn1cblxuR2xvYmFsQ29udGV4dC5wcm90b3R5cGUucmVzb2x2ZVN1YmRpcmVjdG9yeSA9IGZ1bmN0aW9uKHBhdGgpIHtcbiAgY29uc3QgcmVzb2x2ZWRQYXRoID0gdGhpc1tTVUJESVJfQUxJQVNdW3BhdGgudG9TdHJpbmcoKV07XG4gIHJldHVybiByZXNvbHZlZFBhdGggfHwgcGF0aDtcbn1cblxuR2xvYmFsQ29udGV4dC5wcm90b3R5cGUuYWRkU3ViZGlyZWN0b3J5QWxpYXMgPSBmdW5jdGlvbihzcmMsIGRlc3QpIHtcbiAgdGhpc1tTVUJESVJfQUxJQVNdW3NyYy50b1N0cmluZygpXSA9IGRlc3Q7XG59XG5cbkdsb2JhbENvbnRleHQucHJvdG90eXBlLmxvYWRDYWNoZVZhcmlhYmxlcyA9IGZ1bmN0aW9uKGZpbGVuYW1lKSB7XG4gIGlmIChmaWxlRXhpc3RzU3luYyhmaWxlbmFtZS50b1N0cmluZygpKSkge1xuICAgIGNvbnN0IHZhcmlhYmxlcyA9IHJlcXVpcmVJbXBsKGZpbGVuYW1lLnRvU3RyaW5nKCkpO1xuICAgIHRoaXMuYWRkQ2FjaGVWYXJpYWJsZXModmFyaWFibGVzKTtcbiAgfVxufVxuXG5HbG9iYWxDb250ZXh0LnByb3RvdHlwZS5hZGRDYWNoZVZhcmlhYmxlcyA9IGZ1bmN0aW9uKHZhcmlhYmxlcykge1xuICBjb25zdCBjYWNoZSA9IHRoaXNbQ0FDSEVdO1xuICBmb3IgKGNvbnN0IFtrZXksIGVudHJ5XSBvZiBPYmplY3QuZW50cmllcyh2YXJpYWJsZXMpKSB7XG4gICAgY2FjaGVba2V5XSA9IGVudHJ5O1xuICB9XG59XG5cbkdsb2JhbENvbnRleHQucHJvdG90eXBlLmFkZFN1YmRpcmVjdG9yeSA9IGZ1bmN0aW9uKGNvbnRleHQpIHtcbiAgdGhpc1tTVUJESVJfTElTVF0ucHVzaChjb250ZXh0KTtcbn1cblxuR2xvYmFsQ29udGV4dC5wcm90b3R5cGUuZG9TdWJkaXJlY3RvcnkgPSBhc3luYyBmdW5jdGlvbigpIHtcbiAgd2hpbGUgKHRoaXNbU1VCRElSX0xJU1RdLmxlbmd0aCkge1xuICAgIGNvbnN0IGNvbnRleHQgPSB0aGlzW1NVQkRJUl9MSVNUXS5zaGlmdCgpO1xuXG4gICAgY29uc3Qgc2NvcGUgPSBjb250ZXh0Ll9fc2NvcGUoKTtcblxuICAgIGxldCBzY3JpcHRGaWxlO1xuICAgIGNvbnN0IGZpbGVMaXN0ID0gWyBcIi5qc1wiLCBcIi5tanNcIiBdLm1hcChpID0+IFwiTWFrZVNjcmlwdFwiICsgaSk7XG4gICAgZm9yIChjb25zdCBmaWxlbmFtZSBvZiBmaWxlTGlzdCkge1xuICAgICAgY29uc3QgaXRlciA9IHNjb3BlLlNPVVJDRV9ESVIuam9pbihmaWxlbmFtZSkudG9TdHJpbmcoKTtcbiAgICAgIGlmIChhd2FpdCBmaWxlRXhpc3RzKGl0ZXIpKSB7XG4gICAgICAgIHNjcmlwdEZpbGUgPSBpdGVyO1xuICAgICAgICBicmVhaztcbiAgICAgIH1cbiAgICB9XG5cbiAgICBpZiAoIXNjcmlwdEZpbGUpXG4gICAgICB0aHJvdyBuZXcgRXJyb3IoXCJUaGVyZSBhcmUgbm8gZmlsZXMgZnJvbSB0aGUgbGlzdCBcIiArIGZpbGVMaXN0LmpvaW4oKSk7XG5cbiAgICBzY29wZS5TQ1JJUFRfRklMRSA9IHNjcmlwdEZpbGU7XG4gICAgc2NvcGUuU0NSSVBUX0RJUiA9IHNjb3BlLlNDUklQVF9GSUxFLmRpcm5hbWUoKTtcblxuICAgIHRoaXMuYWRkU3lzdGVtVmFyaWFibGVzKHNjb3BlKTtcbiAgICB0aGlzLmNvcHlDYWNoZVZhcmlhYmxlcyhjb250ZXh0KTtcblxuICAgIGNvbnN0IG1vZHVsZSA9IGF3YWl0IGltcG9ydE1vZHVsZShjb250ZXh0LlNDUklQVF9GSUxFLnRvU3RyaW5nKCkpO1xuXG4gICAgY29uc3QgY3dkU2F2ZSA9IHByb2Nlc3MuY3dkKCk7XG4gICAgcHJvY2Vzcy5jaGRpcihjb250ZXh0LlNPVVJDRV9ESVIudG9TdHJpbmcoKSk7XG5cbiAgICBjb25zdCByZXN1bHQgPSBtb2R1bGUuZGVmYXVsdChjb250ZXh0KTtcbiAgICBpZiAocmVzdWx0IGluc3RhbmNlb2YgUHJvbWlzZSlcbiAgICAgIGF3YWl0IHJlc3VsdDtcblxuICAgIHByb2Nlc3MuY2hkaXIoY3dkU2F2ZSk7XG4gIH1cbn1cblxuZnVuY3Rpb24gZW5zdXJlVmFsdWVCeVR5cGUodHlwZSwgdmFsdWUpIHtcbiAgaWYgKEFycmF5LmlzQXJyYXkodHlwZSkgPyB0eXBlLmluY2x1ZGVzKHZhbHVlKSA6IHR5cGVvZiB2YWx1ZSA9PT0gdHlwZSlcbiAgICByZXR1cm4gdmFsdWU7XG4gIHRocm93IG5ldyBFcnJvcihgVGhlICcke3ZhbHVlfScgaXMgbm90IGEgJHt0eXBlfWApO1xufVxuXG5HbG9iYWxDb250ZXh0LnByb3RvdHlwZS5jb3B5Q2FjaGVWYXJpYWJsZXMgPSBmdW5jdGlvbihzY29wZSkge1xuICBmb3IgKGNvbnN0IFtuYW1lLCBlbnRyeV0gb2YgT2JqZWN0LmVudHJpZXModGhpc1tDQUNIRV0pKSB7XG4gICAgaWYgKCFPYmplY3QuaGFzT3duKHNjb3BlLCBuYW1lKSkge1xuICAgICAgY29uc3QgdHlwZSA9IGVudHJ5LnR5cGUgfHwgdHlwZW9mIGVudHJ5LnZhbHVlO1xuICAgICAgY29uc3QgZGVzY3JpcHRpb24gPSBlbnRyeS5kZXNjcmlwdGlvbiB8fCBcIlwiO1xuICAgICAgbGV0IHZhbHVlID0gQXJyYXkuaXNBcnJheShlbnRyeS52YWx1ZSkgPyBbIC4uLmVudHJ5LnZhbHVlIF0gOiBlbnRyeS52YWx1ZTtcbiAgICAgIGlmICh2YWx1ZSA9PT0gXCIke1BST0pFQ1RfVkVSU0lPTn1cIilcbiAgICAgICAgdmFsdWUgPSBzY29wZS5QUk9KRUNUX1ZFUlNJT047XG4gICAgICBlbHNlIGlmICh2YWx1ZSA9PT0gXCIke1BST0pFQ1RfREVTQ1JJUFRJT059XCIpXG4gICAgICAgIHZhbHVlID0gc2NvcGUuUFJPSkVDVF9ERVNDUklQVElPTjtcbiAgICAgIGVsc2UgaWYgKHZhbHVlID09PSBcIiR7UFJPSkVDVF9IT01FUEFHRV9VUkx9XCIpXG4gICAgICAgIHZhbHVlID0gc2NvcGUuUFJPSkVDVF9IT01FUEFHRV9VUkw7XG4gICAgICBlbHNlIGlmIChlbnRyeS52YWx1ZSA9PT0gXCIke0NNQUtFX1NZU1RFTV9QUk9DRVNTT1J9XCIpXG4gICAgICAgIHZhbHVlID0gc2NvcGUuU1lTVEVNX1BST0NFU1NPUjtcblxuICAgICAgY29uc3QgbmFtZVN5bWJvbCA9IFN5bWJvbChuYW1lKTtcbiAgICAgIHNjb3BlW25hbWVTeW1ib2xdID0gZW5zdXJlVmFsdWVCeVR5cGUodHlwZSwgdmFsdWUpO1xuXG4gICAgICBPYmplY3QuZGVmaW5lUHJvcGVydHkoc2NvcGUsIG5hbWUsIHtcbiAgICAgICAgZW51bWVyYWJsZTogdHJ1ZSxcbiAgICAgICAgZ2V0KCkge1xuICAgICAgICAgIHJldHVybiB0aGlzW25hbWVTeW1ib2xdO1xuICAgICAgICB9LFxuICAgICAgICBzZXQodmFsdWUpIHtcbiAgICAgICAgICB0aGlzW25hbWVTeW1ib2xdID0gZW5zdXJlVmFsdWVCeVR5cGUodHlwZSwgdmFsdWUpO1xuICAgICAgICB9LFxuICAgICAgfSk7XG4gICAgfVxuICB9XG59XG5cbkdsb2JhbENvbnRleHQucHJvdG90eXBlLndyaXRlQ2FjaGVWYXJpYWJsZXMgPSBmdW5jdGlvbihmaWxlbmFtZSkge1xuICBjb25zdCBqc29uID0gSlNPTi5zdHJpbmdpZnkodGhpc1tDQUNIRV0sIG51bGwsIDIpO1xuICBmcy53cml0ZUZpbGVTeW5jKGZpbGVuYW1lLCBqc29uLCBcInV0Zi04XCIpO1xufVxuXG5mdW5jdGlvbiBzY29wZVZhbHVlQXNQcmltaXRpdmVzKG8pIHtcbiAgaWYgKHR5cGVvZiBvID09PSBcInVuZGVmaW5lZFwiKVxuICAgIHJldHVybiBvO1xuICBpZiAodHlwZW9mIG8gPT09IFwiYm9vbGVhblwiKVxuICAgIHJldHVybiBvO1xuICBpZiAodHlwZW9mIG8gPT09IFwibnVtYmVyXCIpXG4gICAgcmV0dXJuIG87XG4gIGlmICh0eXBlb2YgbyA9PT0gXCJzdHJpbmdcIilcbiAgICByZXR1cm4gbztcbiAgaWYgKHR5cGVvZiBvID09PSBcIm9iamVjdFwiKSB7XG4gICAgaWYgKCFvKVxuICAgICAgcmV0dXJuIG87XG4gICAgaWYgKG8gaW5zdGFuY2VvZiBBYnNvbHV0ZVBhdGgpIHtcbiAgICAgIHJldHVybiBvLnRvU3RyaW5nKCk7XG4gICAgfVxuICAgIGlmIChvIGluc3RhbmNlb2YgQXJyYXkpIHtcbiAgICAgIGNvbnN0IHJlc3VsdCA9IFtdO1xuICAgICAgZm9yIChjb25zdCBpIG9mIG8pXG4gICAgICAgIHJlc3VsdC5wdXNoKHNjb3BlVmFsdWVBc1ByaW1pdGl2ZXMoaSkpO1xuICAgICAgcmV0dXJuIHJlc3VsdDtcbiAgICB9XG4gICAgaWYgKG8gaW5zdGFuY2VvZiBPYmplY3QpIHtcbiAgICAgIGNvbnN0IHJlc3VsdCA9IHt9O1xuICAgICAgZm9yIChjb25zdCBbayx2XSBvZiBPYmplY3QuZW50cmllcyhvKSlcbiAgICAgICAgcmVzdWx0W2tdID0gc2NvcGVWYWx1ZUFzUHJpbWl0aXZlcyh2KTtcbiAgICAgIHJldHVybiByZXN1bHQ7XG4gICAgfVxuICB9XG4gIHRocm93IG5ldyBFcnJvcihgVW5rbm93biBpbnN0YW5jZSBvZiAke299YCk7XG59XG5cbkdsb2JhbENvbnRleHQucHJvdG90eXBlLmNyZWF0ZUdvYWxzID0gZnVuY3Rpb24oc2NvcGUpIHtcbiAgZm9yIChjb25zdCBpdGVyIG9mIE9iamVjdC52YWx1ZXModGhpc1tVTktOT1dOX1RBUkdFVFNdKSkge1xuICAgIGNvbnN0IHRhcmdldCA9IHRoaXNbVEFSR0VUU10uZ2V0KGl0ZXIuTkFNRSk7XG4gICAgdGFyZ2V0LmFkZFNvdXJjZXMoaXRlci5TT1VSQ0VTKTtcbiAgICB0YXJnZXQuSU5DTFVERVMucHVzaCguLi5pdGVyLklOQ0xVREVTKTtcbiAgICB0YXJnZXQuREVGSU5FUy5wdXNoKC4uLml0ZXIuREVGSU5FUyk7XG4gICAgdGFyZ2V0LkNPTVBJTEVfT1BUSU9OUy5wdXNoKC4uLml0ZXIuQ09NUElMRV9PUFRJT05TKTtcbiAgICB0YXJnZXQuTElOS19PUFRJT05TLnB1c2goLi4uaXRlci5MSU5LX09QVElPTlMpO1xuICB9XG5cbiAgZm9yIChjb25zdCBpdGVyIG9mIE9iamVjdC52YWx1ZXModGhpc1tJTlRFUkZBQ0VfU0NSSVBUU10pKSB7XG4gICAgY29uc3Qgc2NyaXB0ID0gdGhpc1tTQ1JJUFRTXS5nZXQoaXRlci5OQU1FKTtcbiAgICBmb3IgKGNvbnN0IFtrZXksIHZhbHNdIG9mIE9iamVjdC5lbnRyaWVzKGl0ZXIuUFJPUEVSVElFUykpXG4gICAgICBzY3JpcHQuYWRkUHJvcGVydHkoa2V5LCAuLi52YWxzKTtcbiAgfVxuXG4gIGNvbnN0IGdvYWxMaXN0ID0gR29hbENvbGxlY3Rpb24uY3JlYXRlKCk7XG4gIGZvciAoY29uc3QgW25hbWUsIHNjcmlwdF0gb2YgT2JqZWN0LmVudHJpZXModGhpc1tTQ1JJUFRTXS5FTlRSSUVTKSkgeyAgIFxuICAgIGNvbnN0IGRlcGVuZHMgPSBbIHNjcmlwdC5GSUxFLnRvU3RyaW5nKCkgXTtcbiAgICBpZiAoc2NyaXB0LklOUFVUKVxuICAgICAgZGVwZW5kcy5wdXNoKHNjcmlwdC5JTlBVVC50b1N0cmluZygpKTtcbiAgICBjb25zdCBtc2cgPSBcIlxceDFiWzM2bVwiICsgXCJHZW5lcmF0aW5nIFwiICsgc2NyaXB0LlRBUkdFVF9TQ09QRS5CSU5BUllfRElSLnJlbGF0aXZlKHNjcmlwdC5PVVRQVVQpICsgXCJcXHgxYlswbVwiO1xuICAgIGNvbnN0IHBhcmFtcyA9IHsgLi4uc2NyaXB0LlBST1BFUlRJRVMsIC4uLnNjcmlwdC5QQVJBTVMgfTtcbiAgICBnb2FsTGlzdC5hZGRTY3JpcHQoc2NyaXB0LkZJTEUsIFwiXCIsIGRlcGVuZHMsIHNjcmlwdC5PVVRQVVQudG9TdHJpbmcoKSwgc2NvcGVWYWx1ZUFzUHJpbWl0aXZlcyhwYXJhbXMpLCBtc2cpO1xuICB9XG5cbiAgZm9yIChjb25zdCBbbmFtZSwgdGFyZ2V0XSBvZiBPYmplY3QuZW50cmllcyh0aGlzW1RBUkdFVFNdLkVOVFJJRVMpKSB7XG4gICAgY29uc3QgaGVhZGVycyA9IHRoaXNbVEFSR0VUU10uYWxsSGVhZGVyc09mKHRhcmdldCk7XG4gICAgY29uc3QgZGVwZW5kcyA9IFtdO1xuICAgIGZvciAoY29uc3QgcyBvZiB0YXJnZXQuU09VUkNFUykge1xuICAgICAgaWYgKHMgaW5zdGFuY2VvZiBJbnRlcmZhY2VPYmplY3RzKSB7XG4gICAgICAgIGNvbnN0IHQgPSB0aGlzW1RBUkdFVFNdLmdldChzLnRhcmdldE5hbWUpO1xuICAgICAgICBmb3IgKGNvbnN0IGYgb2YgdC5TT1VSQ0VTKSB7XG4gICAgICAgICAgaWYgKGYgaW5zdGFuY2VvZiBTb3VyY2VGaWxlICYmIGYuT0JKRUNUX0ZJTEUpXG4gICAgICAgICAgICBkZXBlbmRzLnB1c2goZi5PQkpFQ1RfRklMRS50b1N0cmluZygpKTtcbiAgICAgICAgfVxuICAgICAgICBjb250aW51ZTtcbiAgICAgIH1cblxuICAgICAgaWYgKHMuSEVBREVSX0ZJTEVfT05MWSlcbiAgICAgICAgY29udGludWU7XG5cbiAgICAgIGZzLm1rZGlyU3luYyhzLk9CSkVDVF9GSUxFX0RJUi50b1N0cmluZygpLCB7IHJlY3Vyc2l2ZTogdHJ1ZSB9KTtcblxuICAgICAgY29uc3QgcmVsYXRpdmVPYmplY3QgPSB0YXJnZXQuVEFSR0VUX1NDT1BFLkJJTkFSWV9ESVIucmVsYXRpdmUocy5PQkpFQ1RfRklMRSk7XG4gICAgICBjb25zdCByZWxhdGl2ZUJpbmFyeURpciA9IHNjb3BlLlBST0pFQ1RfQklOQVJZX0RJUi5yZWxhdGl2ZSh0YXJnZXQuVEFSR0VUX1NDT1BFLkJJTkFSWV9ESVIpO1xuICAgICAgY29uc3QgbXNnID0gXCJcXHgxYlszMm1cIiArIGBCdWlsZGluZyAke3MuTEFOR1VBR0V9IG9iamVjdCAke3JlbGF0aXZlQmluYXJ5RGlyfS8ke3JlbGF0aXZlT2JqZWN0fWAgKyBcIlxceDFiWzBtXCI7XG5cbiAgICAgIGNvbnN0IGRlZmluaXRpb25zID0gW1xuICAgICAgICAuLi50aGlzW1RBUkdFVFNdLmFsbERlZmluaXRpb25zT2YodGFyZ2V0KSxcbiAgICAgICAgLi4ucy5ERUZJTkVTLFxuICAgICAgXTtcblxuICAgICAgY29uc3QgYXJncyA9IFtdO1xuICAgICAgYXJncy5wdXNoKC4uLmRlZmluaXRpb25zLm1hcChpID0+IFwiLURcIiArIGkpKTtcbiAgICAgIGFyZ3MucHVzaCguLi50aGlzW1RBUkdFVFNdLmFsbEluY2x1ZGVzT2YodGFyZ2V0KS5tYXAoaSA9PiBcIi1JXCIgKyBpKSk7XG4gICAgICBhcmdzLnB1c2goLi4udGhpc1tUQVJHRVRTXS5hbGxDb21waWxlT3B0aW9uc09mKHRhcmdldCkpO1xuICAgICAgaWYgKHRhcmdldC5QT1NJVElPTl9JTkRFUEVOREVOVF9DT0RFKVxuICAgICAgICBhcmdzLnB1c2goXCItZlBJQ1wiKTtcbiAgICAgIGFyZ3MucHVzaCguLi5zLkNPTVBJTEVfRkxBR1MuZmxhdCgpKTtcbiAgICAgIGFyZ3MucHVzaChcIi1vXCIsIHJlbGF0aXZlT2JqZWN0KTtcbiAgICAgIGFyZ3MucHVzaChcIi1jXCIsIHMuRklMRSk7XG4gICAgICBjb25zdCBjd2QgPSB0YXJnZXQuVEFSR0VUX1NDT1BFLkJJTkFSWV9ESVIudG9TdHJpbmcoKTtcblxuICAgICAgY29uc3QgY29tbWFuZCA9IHRhcmdldC5UQVJHRVRfU0NPUEVbcy5MQU5HVUFHRSArIFwiX0NPTVBJTEVSXCJdLnRvU3RyaW5nKCk7XG4gICAgICBjb25zdCBvdXRwdXQgPSB0YXJnZXQuVEFSR0VUX1NDT1BFLkJJTkFSWV9ESVIuam9pbihyZWxhdGl2ZU9iamVjdCkudG9TdHJpbmcoKTtcbiAgICAgIGRlcGVuZHMucHVzaChvdXRwdXQpO1xuXG4gICAgICBnb2FsTGlzdC5hZGRFeGVjKG91dHB1dCwgWyAuLi5oZWFkZXJzLCBzLkZJTEUgXSwgY29tbWFuZCwgYXJncywgY3dkLCBtc2cpO1xuICAgIH1cblxuICAgIGNvbnN0IGxpbmtPcHRpb25zID0gdGhpc1tUQVJHRVRTXS5hbGxMaW5rT3B0aW9uc09mKHRhcmdldCk7XG4gICAgaWYgKHRhcmdldCBpbnN0YW5jZW9mIE9iamVjdExpYnJhcnkpIHtcbiAgICAgIGNvbnN0IG9ianMgPSBkZXBlbmRzLmZpbHRlcihpID0+IGkuZW5kc1dpdGgoXCIub1wiKSB8fCBpLmVuZHNXaXRoKFwiLm9ialwiKSkubWFwKGkgPT4gdGFyZ2V0LkZJTEVfRElSLnJlbGF0aXZlKGkpKTtcbiAgICAgIGlmIChvYmpzLmxlbmd0aCkge1xuICAgICAgICBjb25zdCBhcmdzID0gW1xuICAgICAgICAgIC4uLmxpbmtPcHRpb25zLFxuICAgICAgICAgIFwiLXJcIixcbiAgICAgICAgICBcIi1vXCIsIHRhcmdldC5GSUxFX05BTUUsXG4gICAgICAgICAgLi4ub2Jqc1xuICAgICAgICBdO1xuICAgICAgICBjb25zdCBjd2QgPSB0YXJnZXQuRklMRV9ESVIudG9TdHJpbmcoKTtcbiAgICAgICAgY29uc3QgbXNnID0gYExpbmtpbmcgQ1hYIG9iamVjdCBsaWJyYXJ5ICR7dGFyZ2V0LkZJTEVfTkFNRX1gO1xuICAgICAgICBnb2FsTGlzdC5hZGRFeGVjKHRhcmdldC5GSUxFLnRvU3RyaW5nKCksIGRlcGVuZHMsIHNjb3BlLkxJTktFUiwgYXJncywgY3dkLCBtc2cpO1xuICAgICAgfVxuICAgICAgZWxzZSB7XG4gICAgICAgIGNvbnNvbGUubG9nKGBObyBvYmplY3RzIGZvciBcIiR7dGFyZ2V0Lk5BTUV9XCJgKTtcbiAgICAgIH1cbiAgICB9XG5cbiAgICBpZiAodGFyZ2V0IGluc3RhbmNlb2YgU3RhdGljTGlicmFyeSkge1xuICAgICAgY29uc3Qgb2JqcyA9IGRlcGVuZHMuZmlsdGVyKGkgPT4gaS5lbmRzV2l0aChcIi5vXCIpIHx8IGkuZW5kc1dpdGgoXCIub2JqXCIpKS5tYXAoaSA9PiB0YXJnZXQuRklMRV9ESVIucmVsYXRpdmUoaSkpO1xuICAgICAgaWYgKG9ianMubGVuZ3RoKSB7XG4gICAgICAgIGNvbnN0IGFyZ3MgPSBbIFwicmNcIiwgdGFyZ2V0LkZJTEVfTkFNRSAsIC4uLm9ianMgXTtcbiAgICAgICAgY29uc3QgY3dkID0gdGFyZ2V0LkZJTEVfRElSLnRvU3RyaW5nKCk7XG4gICAgICAgIGNvbnN0IG1zZyA9IGBMaW5raW5nIENYWCBzdGF0aWMgbGlicmFyeSAke3RhcmdldC5GSUxFX05BTUV9YDtcbiAgICAgICAgZ29hbExpc3QuYWRkRXhlYyh0YXJnZXQuRklMRS50b1N0cmluZygpLCBkZXBlbmRzLCBzY29wZS5BUiwgYXJncywgY3dkLCBtc2cpO1xuICAgICAgfVxuICAgICAgZWxzZSB7XG4gICAgICAgIGNvbnNvbGUubG9nKGBObyBvYmplY3RzIGZvciBcIiR7dGFyZ2V0Lk5BTUV9XCJgKTtcbiAgICAgIH1cbiAgICB9XG5cbiAgICBpZiAodGFyZ2V0IGluc3RhbmNlb2YgU2hhcmVkTGlicmFyeSkge1xuICAgICAgdGhyb3cgbmV3IEVycm9yKFwiTm90IGltcGxlbWVudGVkXCIpO1xuICAgIH1cblxuICAgIGlmICh0YXJnZXQgaW5zdGFuY2VvZiBFeGVjdXRhYmxlKSB7XG4gICAgICBjb25zdCBvYmpzID0gZGVwZW5kcy5maWx0ZXIoaSA9PiBpLmVuZHNXaXRoKFwiLm9cIikgfHwgaS5lbmRzV2l0aChcIi5vYmpcIikpLm1hcChpID0+IHRhcmdldC5GSUxFX0RJUi5yZWxhdGl2ZShpKSk7XG4gICAgICBpZiAob2Jqcy5sZW5ndGgpIHtcbiAgICAgICAgY29uc3QgbGlicyA9IHRoaXNbVEFSR0VUU10uYWxsTGlicmFyaWVzT2YodGFyZ2V0KTtcbiAgICAgICAgY29uc3QgYXJncyA9IFtcbiAgICAgICAgICAuLi50YXJnZXQuVEFSR0VUX1NDT1BFLkNYWF9GTEFHUyxcbiAgICAgICAgICAuLi5saW5rT3B0aW9ucyxcbiAgICAgICAgICAuLi5vYmpzLFxuICAgICAgICAgIFwiLW9cIiwgdGFyZ2V0LkZJTEVfTkFNRSxcbiAgICAgICAgICAuLi5saWJzLm1hcChpID0+IHRhcmdldC5GSUxFX0RJUi5yZWxhdGl2ZShpKSksXG4gICAgICAgIF07XG4gICAgICAgIGNvbnN0IGN3ZCA9IHRhcmdldC5GSUxFX0RJUi50b1N0cmluZygpO1xuICAgICAgICBjb25zdCBtc2cgPSBgTGlua2luZyBDWFggZXhlY3V0YWJsZSAke3RhcmdldC5GSUxFX05BTUV9YDtcbiAgICAgICAgZ29hbExpc3QuYWRkRXhlYyh0YXJnZXQuRklMRS50b1N0cmluZygpLCBkZXBlbmRzLmNvbmNhdChsaWJzKSwgc2NvcGUuQ1hYX0NPTVBJTEVSLCBhcmdzLCBjd2QsIG1zZyk7XG4gICAgICB9XG4gICAgICBlbHNlIHtcbiAgICAgICAgY29uc29sZS5sb2coYE5vIG9iamVjdHMgZm9yIFwiJHt0YXJnZXQuTkFNRX1cImApO1xuICAgICAgfVxuICAgIH1cblxuICAgIGdvYWxMaXN0LmFkZFRhcmdldChuYW1lLCBbIHRhcmdldC5GSUxFLnRvU3RyaW5nKCkgXSwgYEJ1aWx0IHRhcmdldCAke25hbWV9YCk7XG4gIH1cblxuICBjb25zdCBpbnN0YWxsX2ZpbGVzID0gW107XG4gIGNvbnN0IGluc3RhbGxfc2NyaXB0ID0gcGF0aC5wb3NpeC5qb2luKF9fZGlybmFtZSwgXCJTeXN0ZW1TY3JpcHRzL2luc3RhbGxfc2NyaXB0LmpzXCIpO1xuICBmb3IgKGNvbnN0IGl0ZXIgb2YgdGhpc1tJTlNUQUxMX0xJU1RdKSB7XG4gICAgbGV0IHNyYywgZGVzdDtcbiAgICBpZiAoaXRlci5WQUxVRSBpbnN0YW5jZW9mIEZpbGVQYXRoKSB7XG4gICAgICBpZiAoc2NvcGUuUFJFVkVOVF9JTlNUQUxMX0ZJTEVTKVxuICAgICAgICBjb250aW51ZTtcbiAgICAgIHNyYyA9IGl0ZXIuVkFMVUUudG9TdHJpbmcoKTtcbiAgICAgIGNvbnN0IHJmaWxlID0gaXRlci5CQVNFX0RJUi5yZWxhdGl2ZShpdGVyLlZBTFVFKTtcbiAgICAgIGRlc3QgPSBpdGVyLkRFU1RJTkFUSU9OLmpvaW4ocmZpbGUpO1xuICAgIH1cbiAgICBlbHNlIGlmIChpdGVyLlZBTFVFIGluc3RhbmNlb2YgSW50ZXJmYWNlVGFyZ2V0KSB7XG4gICAgICBjb25zdCB0YXJnZXQgPSB0aGlzW1RBUkdFVFNdLmdldChpdGVyLlZBTFVFLnRhcmdldE5hbWUpO1xuICAgICAgc3JjID0gdGFyZ2V0LkZJTEUudG9TdHJpbmcoKTtcbiAgICAgIGRlc3QgPSBpdGVyLkRFU1RJTkFUSU9OLmpvaW4odGFyZ2V0LkZJTEVfTkFNRSk7XG4gICAgfVxuICAgIGVsc2Uge1xuICAgICAgdGhyb3cgbmV3IEVycm9yKGBDYW4gbm90IGluc3RhbGwgJHtpdGVyLlZBTFVFfWApXG4gICAgfVxuICAgIGlmIChzY29wZS5ERVNURElSKVxuICAgICAgZGVzdCA9IHNjb3BlLkRFU1RESVIuam9pbihkZXN0KS50b1N0cmluZygpO1xuICAgIGdvYWxMaXN0LmFkZFNjcmlwdChpbnN0YWxsX3NjcmlwdCwgXCJcIiwgWyBzcmMgXSwgZGVzdCwgc2NvcGVWYWx1ZUFzUHJpbWl0aXZlcyh7c3JjLCBkZXN0fSksIFwiXCIpO1xuICAgIGluc3RhbGxfZmlsZXMucHVzaChkZXN0KTtcbiAgfVxuXG4gIGlmIChpbnN0YWxsX2ZpbGVzLmxlbmd0aCkge1xuICAgIGdvYWxMaXN0LmFkZFRhcmdldChcImluc3RhbGxcIiwgaW5zdGFsbF9maWxlcywgXCJcIik7XG4gIH1cblxuICBnb2FsTGlzdC5hZGRUYXJnZXQoXCJhbGxcIiwgT2JqZWN0LmtleXModGhpc1tUQVJHRVRTXS5FTlRSSUVTKSwgXCJcIik7XG5cbiAgcmV0dXJuIGdvYWxMaXN0O1xufVxuXG5tb2R1bGUuZXhwb3J0cyA9IHtcbiAgR2xvYmFsQ29udGV4dCxcbn07XG4iLCJcInVzZSBzdHJpY3RcIjtcblxuY29uc3QgeyBJbnRlcmZhY2VUYXJnZXQgfSA9IHJlcXVpcmUoXCIuL0ludGVyZmFjZVRhcmdldC5qc1wiKTtcbmNvbnN0IHsgQWJzb2x1dGVQYXRoIH0gPSByZXF1aXJlKFwiQC9jb3JlL1BhdGhcIik7XG5jb25zdCB7IEZpbGVQYXRoLCBEaXJQYXRoIH0gPSByZXF1aXJlKFwiQC9jb3JlL1BhdGhcIik7XG5cbmNvbnN0IFZBTFVFICAgICAgID0gU3ltYm9sKFwiVkFMVUVcIik7XG5jb25zdCBERVNUSU5BVElPTiA9IFN5bWJvbChcIkRFU1RJTkFUSU9OXCIpO1xuY29uc3QgQkFTRV9ESVIgICAgPSBTeW1ib2woXCJCQVNFX0RJUlwiKTtcblxuZnVuY3Rpb24gSW5zdGFsbEVudGl0eShzY29wZSwgdmFsdWUsIHBhcmFtcykge1xuICBsZXQgZGVzdGluYXRpb247XG4gIGxldCBiYXNlRGlyO1xuICBpZiAodHlwZW9mIHBhcmFtcyA9PT0gXCJzdHJpbmdcIilcbiAgICBkZXN0aW5hdGlvbiA9IHBhcmFtcztcbiAgZWxzZSBpZiAocGFyYW1zKSB7XG4gICAgZGVzdGluYXRpb24gPSBwYXJhbXMuZGVzdGluYXRpb247XG4gICAgYmFzZURpciA9IHBhcmFtcy5iYXNlRGlyO1xuICB9XG5cbiAgaWYgKCFkZXN0aW5hdGlvbilcbiAgICB0aHJvdyBuZXcgRXJyb3IoYFBhcmFtZXRlciBkZXN0aW5hdGlvbiBpcyBub3Qgc3BlY2lmaWVkYCk7XG5cbiAgaWYgKGJhc2VEaXIpXG4gICAgYmFzZURpciA9IHNjb3BlLlNPVVJDRV9ESVIucmVzb2x2ZShiYXNlRGlyKTtcblxuICBpZiAodHlwZW9mIHZhbHVlID09PSBcInN0cmluZ1wiIHx8IHZhbHVlIGluc3RhbmNlb2YgQWJzb2x1dGVQYXRoKSB7XG4gICAgdmFsdWUgPSBzY29wZS5TT1VSQ0VfRElSLnJlc29sdmUodmFsdWUudG9TdHJpbmcoKSk7XG4gICAgdmFsdWUgPSBGaWxlUGF0aC5jcmVhdGUodmFsdWUudG9TdHJpbmcoKSk7XG4gICAgYmFzZURpciA9IGJhc2VEaXIgfHwgdmFsdWUuZGlybmFtZSgpO1xuICB9XG4gIGVsc2UgaWYgKCEodmFsdWUgaW5zdGFuY2VvZiBJbnRlcmZhY2VUYXJnZXQpKSB7XG4gICAgdGhyb3cgbmV3IEVycm9yKGBOb3Qgc3VwcG9ydGV0IHZhbHVlIG9mICR7dmFsdWV9YCk7XG4gIH1cblxuICB0aGlzW1ZBTFVFXSA9IHZhbHVlO1xuICB0aGlzW0RFU1RJTkFUSU9OXSA9IERpclBhdGguY3JlYXRlKHNjb3BlLklOU1RBTExfUFJFRklYLnJlc29sdmUoZGVzdGluYXRpb24udG9TdHJpbmcoKSkudG9TdHJpbmcoKSk7XG4gIHRoaXNbQkFTRV9ESVJdID0gYmFzZURpciA/IERpclBhdGguY3JlYXRlKGJhc2VEaXIudG9TdHJpbmcoKSkgOiBudWxsO1xufVxuXG5JbnN0YWxsRW50aXR5LmNyZWF0ZSA9IChzY29wZSwgdmFsdWUsIHBhcmFtcykgPT4ge1xuICByZXR1cm4gT2JqZWN0LnNlYWwobmV3IEluc3RhbGxFbnRpdHkoc2NvcGUsIHZhbHVlLCBwYXJhbXMpKTtcbn1cblxuSW5zdGFsbEVudGl0eS5wcm90b3R5cGUgPSBPYmplY3QuY3JlYXRlKE9iamVjdC5wcm90b3R5cGUsIHtcbiAgY29uc3RydWN0b3I6IHtcbiAgICB2YWx1ZTogSW5zdGFsbEVudGl0eSxcbiAgICBlbnVtZXJhYmxlOiBmYWxzZSxcbiAgfSxcbiAgVkFMVUU6IHtcbiAgICBnZXQgKCkgeyByZXR1cm4gdGhpc1tWQUxVRV07IH0sXG4gICAgZW51bWVyYWJsZTogdHJ1ZSxcbiAgfSxcbiAgREVTVElOQVRJT046IHtcbiAgICBnZXQgKCkgeyByZXR1cm4gdGhpc1tERVNUSU5BVElPTl07IH0sXG4gICAgZW51bWVyYWJsZTogdHJ1ZSxcbiAgfSxcbiAgQkFTRV9ESVI6IHtcbiAgICBnZXQgKCkgeyByZXR1cm4gdGhpc1tCQVNFX0RJUl07IH0sXG4gICAgZW51bWVyYWJsZTogdHJ1ZSxcbiAgfSxcbn0pO1xuXG5JbnN0YWxsRW50aXR5LnByb3RvdHlwZS50b0pTT04gPSBmdW5jdGlvbigpIHtcbiAgY29uc3QganNvbiA9IHt9O1xuICBmb3IgKGNvbnN0IGtleSBpbiB0aGlzKVxuICAgIGpzb25ba2V5XSA9IHRoaXNba2V5XTtcbiAgcmV0dXJuIGpzb247XG59XG5cbm1vZHVsZS5leHBvcnRzID0ge1xuICBJbnN0YWxsRW50aXR5LFxufTtcbiIsIlwidXNlIHN0cmljdFwiO1xuXG5jb25zdCBOQU1FID0gU3ltYm9sKFwiTkFNRVwiKTtcblxuZnVuY3Rpb24gSW50ZXJmYWNlSW5jbHVkZXMobmFtZSkge1xuICB0aGlzW05BTUVdID0gbmFtZTtcbn1cblxuSW50ZXJmYWNlSW5jbHVkZXMuY3JlYXRlID0gKG5hbWUpID0+IHtcbiAgcmV0dXJuIE9iamVjdC5zZWFsKG5ldyBJbnRlcmZhY2VJbmNsdWRlcyhuYW1lKSk7XG59XG5cbkludGVyZmFjZUluY2x1ZGVzLmVuc3VyZUluc3RhbmNlID0gKHZhbHVlKSA9PiB7XG4gIGlmICh2YWx1ZSBpbnN0YW5jZW9mIEludGVyZmFjZUluY2x1ZGVzKVxuICAgIHJldHVybiB2YWx1ZTtcbiAgdGhyb3cgbmV3IEVycm9yKGBUaGUgJyR7dmFsdWV9JyBpcyBub3QgYSBJbnRlcmZhY2VJbmNsdWRlc2ApO1xufVxuXG5JbnRlcmZhY2VJbmNsdWRlcy5wcm90b3R5cGUgPSBPYmplY3QuY3JlYXRlKE9iamVjdC5wcm90b3R5cGUsIHtcbiAgY29uc3RydWN0b3I6IHtcbiAgICB2YWx1ZTogSW50ZXJmYWNlSW5jbHVkZXMsXG4gICAgZW51bWVyYWJsZTogZmFsc2UsXG4gIH0sXG4gIHRhcmdldE5hbWU6IHtcbiAgICBnZXQgKCkgeyByZXR1cm4gdGhpc1tOQU1FXTsgfSxcbiAgICBlbnVtZXJhYmxlOiB0cnVlLFxuICB9LFxufSk7XG5cbkludGVyZmFjZUluY2x1ZGVzLnByb3RvdHlwZS50b0pTT04gPSBmdW5jdGlvbigpIHtcbiAgcmV0dXJuIHRoaXMudG9TdHJpbmcoKTtcbn1cblxuSW50ZXJmYWNlSW5jbHVkZXMucHJvdG90eXBlLnRvU3RyaW5nID0gZnVuY3Rpb24oKSB7XG4gIHJldHVybiBcIiR7XCIgKyB0aGlzW05BTUVdICsgXCIuaW5jbHVkZXN9XCI7XG59XG5cbm1vZHVsZS5leHBvcnRzID0ge1xuICBJbnRlcmZhY2VJbmNsdWRlcyxcbn07XG4iLCJcInVzZSBzdHJpY3RcIjtcblxuY29uc3QgTkFNRSA9IFN5bWJvbChcIk5BTUVcIik7XG5cbmZ1bmN0aW9uIEludGVyZmFjZU9iamVjdHMobmFtZSkge1xuICB0aGlzW05BTUVdID0gbmFtZTtcbn1cblxuSW50ZXJmYWNlT2JqZWN0cy5jcmVhdGUgPSAobmFtZSkgPT4ge1xuICByZXR1cm4gT2JqZWN0LnNlYWwobmV3IEludGVyZmFjZU9iamVjdHMobmFtZSkpO1xufVxuXG5JbnRlcmZhY2VPYmplY3RzLmVuc3VyZUluc3RhbmNlID0gKHZhbHVlKSA9PiB7XG4gIGlmICh2YWx1ZSBpbnN0YW5jZW9mIEludGVyZmFjZU9iamVjdHMpXG4gICAgcmV0dXJuIHZhbHVlO1xuICB0aHJvdyBuZXcgRXJyb3IoYFRoZSAnJHt2YWx1ZX0nIGlzIG5vdCBhIEludGVyZmFjZU9iamVjdHNgKTtcbn1cblxuSW50ZXJmYWNlT2JqZWN0cy5wcm90b3R5cGUgPSBPYmplY3QuY3JlYXRlKE9iamVjdC5wcm90b3R5cGUsIHtcbiAgY29uc3RydWN0b3I6IHtcbiAgICB2YWx1ZTogSW50ZXJmYWNlT2JqZWN0cyxcbiAgICBlbnVtZXJhYmxlOiBmYWxzZSxcbiAgfSxcbiAgdGFyZ2V0TmFtZToge1xuICAgIGdldCAoKSB7IHJldHVybiB0aGlzW05BTUVdOyB9LFxuICAgIGVudW1lcmFibGU6IGZhbHNlLFxuICB9LFxufSk7XG5cbkludGVyZmFjZU9iamVjdHMucHJvdG90eXBlLnRvSlNPTiA9IGZ1bmN0aW9uKCkge1xuICByZXR1cm4gdGhpcy50b1N0cmluZygpO1xufVxuXG5JbnRlcmZhY2VPYmplY3RzLnByb3RvdHlwZS50b1N0cmluZyA9IGZ1bmN0aW9uKCkge1xuICByZXR1cm4gXCIke1wiICsgdGhpc1tOQU1FXSArIFwiLm9iamVjdHN9XCI7XG59XG5cbm1vZHVsZS5leHBvcnRzID0ge1xuICBJbnRlcmZhY2VPYmplY3RzLFxufTtcbiIsIlwidXNlIHN0cmljdFwiO1xuXG5jb25zdCBOQU1FICAgICAgID0gU3ltYm9sKFwiTkFNRVwiKTtcbmNvbnN0IFBST1BFUlRJRVMgPSBTeW1ib2woXCJQUk9QRVJUSUVTXCIpO1xuXG5mdW5jdGlvbiBJbnRlcmZhY2VTY3JpcHQobmFtZSkge1xuICB0aGlzW05BTUVdID0gbmFtZTtcbiAgdGhpc1tQUk9QRVJUSUVTXSA9IHt9O1xufVxuXG5JbnRlcmZhY2VTY3JpcHQuY3JlYXRlID0gKG5hbWUpID0+IHtcbiAgcmV0dXJuIE9iamVjdC5zZWFsKG5ldyBJbnRlcmZhY2VTY3JpcHQobmFtZSkpO1xufVxuXG5JbnRlcmZhY2VTY3JpcHQuZW5zdXJlSW5zdGFuY2UgPSAodmFsdWUpID0+IHtcbiAgaWYgKHZhbHVlIGluc3RhbmNlb2YgSW50ZXJmYWNlU2NyaXB0KVxuICAgIHJldHVybiB2YWx1ZTtcbiAgdGhyb3cgbmV3IEVycm9yKGBUaGUgJyR7dmFsdWV9JyBpcyBub3QgYSBJbnRlcmZhY2VTY3JpcHRgKTtcbn1cblxuSW50ZXJmYWNlU2NyaXB0LnByb3RvdHlwZSA9IE9iamVjdC5jcmVhdGUoT2JqZWN0LnByb3RvdHlwZSwge1xuICBjb25zdHJ1Y3Rvcjoge1xuICAgIHZhbHVlOiBJbnRlcmZhY2VTY3JpcHQsXG4gICAgZW51bWVyYWJsZTogZmFsc2UsXG4gIH0sXG4gIE5BTUU6IHtcbiAgICBnZXQgKCkgeyByZXR1cm4gdGhpc1tOQU1FXTsgfSxcbiAgICBlbnVtZXJhYmxlOiB0cnVlLFxuICB9LFxuICBQUk9QRVJUSUVTOiB7XG4gICAgZ2V0ICgpIHsgcmV0dXJuIHRoaXNbUFJPUEVSVElFU107IH0sXG4gICAgZW51bWVyYWJsZTogdHJ1ZSxcbiAgfSxcbn0pO1xuXG5JbnRlcmZhY2VTY3JpcHQucHJvdG90eXBlLmFkZFByb3BlcnR5ID0gZnVuY3Rpb24oa2V5LCAuLi52YWxzKSB7XG4gIGxldCBwcm9wZXJ0eSA9IHRoaXNbUFJPUEVSVElFU11ba2V5XTtcbiAgaWYgKCFwcm9wZXJ0eSkge1xuICAgIHByb3BlcnR5ID0gW107XG4gICAgdGhpc1tQUk9QRVJUSUVTXVtrZXldID0gcHJvcGVydHk7XG4gIH1cbiAgdmFscy5mb3JFYWNoKHYgPT4gcHJvcGVydHkucHVzaCh2KSk7XG59XG5cbkludGVyZmFjZVNjcmlwdC5wcm90b3R5cGUudG9KU09OID0gZnVuY3Rpb24oKSB7XG4gIGNvbnN0IGpzb24gPSB7fTtcbiAgZm9yIChjb25zdCBrZXkgaW4gdGhpcylcbiAgICBqc29uW2tleV0gPSAodHlwZW9mIHRoaXNba2V5XS50b0pTT04gPT09IFwiZnVuY3Rpb25cIikgPyB0aGlzW2tleV0udG9KU09OKCkgOiB0aGlzW2tleV07XG4gIHJldHVybiBqc29uO1xufVxuXG5JbnRlcmZhY2VTY3JpcHQucHJvdG90eXBlLnRvU3RyaW5nID0gZnVuY3Rpb24oKSB7XG4gIHJldHVybiB0aGlzW05BTUVdO1xufVxuXG5tb2R1bGUuZXhwb3J0cyA9IHtcbiAgSW50ZXJmYWNlU2NyaXB0LFxufTtcbiIsIlwidXNlIHN0cmljdFwiO1xuXG5jb25zdCB7IEFic29sdXRlUGF0aCB9ID0gcmVxdWlyZShcIkAvY29yZS9QYXRoXCIpO1xuY29uc3QgeyBJbnRlcmZhY2VJbmNsdWRlcyB9ID0gcmVxdWlyZShcIi4vSW50ZXJmYWNlSW5jbHVkZXMuanNcIik7XG5jb25zdCB7IEludGVyZmFjZU9iamVjdHMgfSA9IHJlcXVpcmUoXCIuL0ludGVyZmFjZU9iamVjdHMuanNcIik7XG5jb25zdCB7IEluY2x1ZGVEaXJlY3RvcnkgfSA9IHJlcXVpcmUoXCJAL2NvcmUvSW5jbHVkZURpcmVjdG9yeVwiKTtcbmNvbnN0IHsgU291cmNlRmlsZSB9ID0gcmVxdWlyZShcIi4vU291cmNlRmlsZS5qc1wiKTtcblxuY29uc3QgVU5LTk9XTl9UQVJHRVQgPSBTeW1ib2woXCJVTktOT1dOX1RBUkdFVFwiKTtcbmNvbnN0IFNDT1BFID0gU3ltYm9sKFwiU0NPUEVcIik7XG5cbmZ1bmN0aW9uIEludGVyZmFjZVRhcmdldChzY29wZSwgdXRhcmdldCkge1xuICB0aGlzW1NDT1BFXSA9IHNjb3BlLmNsb25lKCk7XG4gIHRoaXNbVU5LTk9XTl9UQVJHRVRdID0gdXRhcmdldDtcbn1cblxuSW50ZXJmYWNlVGFyZ2V0LmNyZWF0ZSA9IChzY29wZSwgdXRhcmdldCkgPT4ge1xuICByZXR1cm4gT2JqZWN0LnNlYWwobmV3IEludGVyZmFjZVRhcmdldChzY29wZSwgdXRhcmdldCkpO1xufVxuXG5JbnRlcmZhY2VUYXJnZXQuZW5zdXJlSW5zdGFuY2UgPSAodmFsdWUpID0+IHtcbiAgaWYgKHZhbHVlIGluc3RhbmNlb2YgSW50ZXJmYWNlVGFyZ2V0KVxuICAgIHJldHVybiB2YWx1ZTtcbiAgdGhyb3cgbmV3IEVycm9yKGBUaGUgJyR7dmFsdWV9JyBpcyBub3QgYSBJbnRlcmZhY2VUYXJnZXRgKTtcbn1cblxuSW50ZXJmYWNlVGFyZ2V0LnByb3RvdHlwZSA9IE9iamVjdC5jcmVhdGUoT2JqZWN0LnByb3RvdHlwZSwge1xuICBjb25zdHJ1Y3Rvcjoge1xuICAgIHZhbHVlOiBJbnRlcmZhY2VUYXJnZXQsXG4gICAgZW51bWVyYWJsZTogZmFsc2UsXG4gIH0sXG4gIHRhcmdldE5hbWU6IHtcbiAgICBnZXQgKCkgeyByZXR1cm4gdGhpc1tVTktOT1dOX1RBUkdFVF0uTkFNRTsgfSxcbiAgICBlbnVtZXJhYmxlOiB0cnVlLFxuICB9LFxuICBpbmNsdWRlczoge1xuICAgIGdldCAoKSB7IHJldHVybiBJbnRlcmZhY2VJbmNsdWRlcy5jcmVhdGUodGhpcy50YXJnZXROYW1lKTsgfSxcbiAgICBlbnVtZXJhYmxlOiB0cnVlLFxuICB9LFxuICBvYmplY3RzOiB7XG4gICAgZ2V0ICgpIHsgcmV0dXJuIEludGVyZmFjZU9iamVjdHMuY3JlYXRlKHRoaXMudGFyZ2V0TmFtZSk7IH0sXG4gICAgZW51bWVyYWJsZTogdHJ1ZSxcbiAgfSxcbn0pO1xuXG5JbnRlcmZhY2VUYXJnZXQucHJvdG90eXBlLnRvSlNPTiA9IGZ1bmN0aW9uKCkge1xuICByZXR1cm4gdGhpcy50b1N0cmluZygpO1xufVxuXG5JbnRlcmZhY2VUYXJnZXQucHJvdG90eXBlLnRvU3RyaW5nID0gZnVuY3Rpb24oKSB7XG4gIHJldHVybiBcIiR7XCIgKyB0aGlzLnRhcmdldE5hbWUgKyBcIn1cIjtcbn1cblxuSW50ZXJmYWNlVGFyZ2V0LnByb3RvdHlwZS5hZGRTb3VyY2VzID0gZnVuY3Rpb24oLi4uc291cmNlcykge1xuICBmb3IgKGxldCBpdCBvZiBzb3VyY2VzLmZsYXQoMSkpIHtcbiAgICBpZiAoaXQgaW5zdGFuY2VvZiBJbnRlcmZhY2VPYmplY3RzIHx8IGl0IGluc3RhbmNlb2YgU291cmNlRmlsZSlcbiAgICAgIC8qICovO1xuICAgIGVsc2UgaWYgKHR5cGVvZiBpdCA9PT0gXCJzdHJpbmdcIiB8fCBBYnNvbHV0ZVBhdGguaXNBYnNvbHV0ZShpdCkpXG4gICAgICBpdCA9IFNvdXJjZUZpbGUuY3JlYXRlKHRoaXNbU0NPUEVdLCBpdCk7XG4gICAgZWxzZVxuICAgICAgdGhyb3cgbmV3IEVycm9yKGBOb3Qgc3VwcG9ydCBpbnN0YW5jZSAke2l0fWApO1xuICAgIHRoaXNbVU5LTk9XTl9UQVJHRVRdLlNPVVJDRVMucHVzaChpdCk7XG4gIH1cbn1cblxuSW50ZXJmYWNlVGFyZ2V0LnByb3RvdHlwZS5hZGRJbmNsdWRlcyA9IGZ1bmN0aW9uKC4uLmluY2x1ZGVzKSB7XG4gIGZvciAoY29uc3QgaXQgb2YgaW5jbHVkZXMuZmxhdCgxKSkge1xuICAgIGxldCBWQUxVRTtcbiAgICBpZiAoaXQgaW5zdGFuY2VvZiBJbnRlcmZhY2VJbmNsdWRlcylcbiAgICAgIFZBTFVFID0gaXQ7XG4gICAgZWxzZSBpZiAodHlwZW9mIGl0ID09PSBcInN0cmluZ1wiIHx8IEFic29sdXRlUGF0aC5pc0Fic29sdXRlKGl0KSlcbiAgICAgIFZBTFVFID0gSW5jbHVkZURpcmVjdG9yeS5jcmVhdGUoaXQsIHRoaXNbU0NPUEVdLlNPVVJDRV9ESVIpO1xuICAgIGVsc2VcbiAgICAgIHRocm93IG5ldyBFcnJvcihgTm90IHN1cHBvcnQgaW5zdGFuY2UgJHtpdH1gKTtcbiAgICB0aGlzW1VOS05PV05fVEFSR0VUXS5JTkNMVURFUy5wdXNoKHsgVkFMVUUsIFBVQkxJQ19PTkxZOiBmYWxzZSB9KTtcbiAgfVxufVxuXG5JbnRlcmZhY2VUYXJnZXQucHJvdG90eXBlLmFkZFB1YmxpY0luY2x1ZGVzID0gZnVuY3Rpb24oLi4uaW5jbHVkZXMpIHtcbiAgZm9yIChjb25zdCBpdCBvZiBpbmNsdWRlcy5mbGF0KDEpKSB7XG4gICAgbGV0IFZBTFVFO1xuICAgIGlmIChpdCBpbnN0YW5jZW9mIEludGVyZmFjZUluY2x1ZGVzKVxuICAgICAgVkFMVUUgPSBpdDtcbiAgICBlbHNlIGlmICh0eXBlb2YgaXQgPT09IFwic3RyaW5nXCIgfHwgQWJzb2x1dGVQYXRoLmlzQWJzb2x1dGUoaXQpKVxuICAgICAgVkFMVUUgPSBJbmNsdWRlRGlyZWN0b3J5LmNyZWF0ZShpdCwgdGhpc1tTQ09QRV0uU09VUkNFX0RJUik7XG4gICAgZWxzZVxuICAgICAgdGhyb3cgbmV3IEVycm9yKGBOb3Qgc3VwcG9ydCBpbnN0YW5jZSAke2l0fWApO1xuICAgIHRoaXNbVU5LTk9XTl9UQVJHRVRdLklOQ0xVREVTLnB1c2goeyBWQUxVRSwgUFVCTElDX09OTFk6IHRydWUgfSk7XG4gIH1cbn1cblxuSW50ZXJmYWNlVGFyZ2V0LnByb3RvdHlwZS5hZGREZWZpbml0aW9ucyA9IGZ1bmN0aW9uKC4uLmRlZmluaXRpb25zKSB7XG4gIGZvciAoY29uc3QgVkFMVUUgb2YgZGVmaW5pdGlvbnMuZmxhdCgxKSlcbiAgICB0aGlzW1VOS05PV05fVEFSR0VUXS5ERUZJTkVTLnB1c2goeyBWQUxVRSB9KTtcbn1cblxuSW50ZXJmYWNlVGFyZ2V0LnByb3RvdHlwZS5hZGRQdWJsaWNEZWZpbml0aW9ucyA9IGZ1bmN0aW9uKC4uLmRlZmluaXRpb25zKSB7XG4gIGZvciAoY29uc3QgVkFMVUUgb2YgZGVmaW5pdGlvbnMuZmxhdCgxKSlcbiAgICB0aGlzW1VOS05PV05fVEFSR0VUXS5ERUZJTkVTLnB1c2goeyBWQUxVRSwgUFVCTElDX09OTFk6IHRydWUgfSk7XG59XG5cbkludGVyZmFjZVRhcmdldC5wcm90b3R5cGUuYWRkQ29tcGlsZU9wdGlvbnMgPSBmdW5jdGlvbiguLi5vcHRpb25zKSB7XG4gIGZvciAoY29uc3QgaXQgb2Ygb3B0aW9ucy5mbGF0KDEpKSB7XG4gICAgdGhpc1tVTktOT1dOX1RBUkdFVF0uQ09NUElMRV9PUFRJT05TLnB1c2goeyBWQUxVRTogaXQgfSk7XG4gIH1cbn1cblxuSW50ZXJmYWNlVGFyZ2V0LnByb3RvdHlwZS5hZGRMaW5rT3B0aW9ucyA9IGZ1bmN0aW9uKC4uLm9wdGlvbnMpIHtcbiAgZm9yIChjb25zdCBpdCBvZiBvcHRpb25zLmZsYXQoMSkpIHtcbiAgICB0aGlzW1VOS05PV05fVEFSR0VUXS5MSU5LX09QVElPTlMucHVzaCh7IFZBTFVFOiBpdCB9KTtcbiAgfVxufVxuXG5JbnRlcmZhY2VUYXJnZXQucHJvdG90eXBlLmFkZFB1YmxpY0NvbXBpbGVPcHRpb25zID0gZnVuY3Rpb24oLi4ub3B0aW9ucykge1xuICBmb3IgKGNvbnN0IGl0IG9mIG9wdGlvbnMuZmxhdCgxKSkge1xuICAgIHRoaXNbVU5LTk9XTl9UQVJHRVRdLkNPTVBJTEVfT1BUSU9OUy5wdXNoKHsgVkFMVUU6IGl0LCBQVUJMSUNfT05MWTogdHJ1ZSB9KTtcbiAgfVxufVxuXG5JbnRlcmZhY2VUYXJnZXQucHJvdG90eXBlLmFkZFB1YmxpY0xpbmtPcHRpb25zID0gZnVuY3Rpb24oLi4ub3B0aW9ucykge1xuICBmb3IgKGNvbnN0IGl0IG9mIG9wdGlvbnMuZmxhdCgxKSkge1xuICAgIHRoaXNbVU5LTk9XTl9UQVJHRVRdLkxJTktfT1BUSU9OUy5wdXNoKHsgVkFMVUU6IGl0LCBQVUJMSUNfT05MWTogdHJ1ZSB9KTtcbiAgfVxufVxuXG5tb2R1bGUuZXhwb3J0cyA9IHtcbiAgSW50ZXJmYWNlVGFyZ2V0LFxufTtcbiIsIlwidXNlIHN0cmljdFwiO1xuXG5jb25zdCB7IERpclBhdGggfSA9IHJlcXVpcmUoXCJAL2NvcmUvUGF0aFwiKTtcblxuY29uc3QgR0xPQkFMID0gU3ltYm9sKFwiR0xPQkFMXCIpO1xuY29uc3QgU0NPUEUgPSBTeW1ib2woXCJTQ09QRVwiKTtcblxuZnVuY3Rpb24gUGx1Z2luQ29udGV4dChzY29wZSwgZ2xvYmFsKSB7XG4gIHRoaXNbU0NPUEVdID0gc2NvcGU7XG4gIHRoaXNbR0xPQkFMXSA9IGdsb2JhbDtcbn1cblxuUGx1Z2luQ29udGV4dC5wcm90b3R5cGUuYWRkU3ViZGlyZWN0b3J5QWxpYXMgPSBmdW5jdGlvbihzcmMsIGRlc3QpIHtcbiAgdGhpc1tHTE9CQUxdLmFkZFN1YmRpcmVjdG9yeUFsaWFzKERpclBhdGguY3JlYXRlKHNyYy50b1N0cmluZygpKSwgRGlyUGF0aC5jcmVhdGUoZGVzdC50b1N0cmluZygpKSk7XG59XG5cblBsdWdpbkNvbnRleHQucHJvdG90eXBlLnRvSlNPTiA9IGZ1bmN0aW9uKCkge1xuICBjb25zdCBqc29uID0ge307XG4gIGZvciAoY29uc3Qga2V5IGluIHRoaXMpXG4gICAganNvbltrZXldID0gdGhpc1trZXldO1xuICByZXR1cm4ganNvbjtcbn1cblxuUGx1Z2luQ29udGV4dC5jcmVhdGUgPSAocHJvdG9TY29wZSwgZ2xvYmFsKSA9PiB7XG4gIGNvbnN0IGN0eCA9IE9iamVjdC5jcmVhdGUocHJvdG9TY29wZSk7XG4gIFBsdWdpbkNvbnRleHQuY2FsbChjdHgsIHByb3RvU2NvcGUsIGdsb2JhbCk7XG4gIGZvciAoY29uc3QgW2tleSwgdmFsXSBvZiBPYmplY3QuZW50cmllcyhQbHVnaW5Db250ZXh0LnByb3RvdHlwZSkpXG4gICAgY3R4W2tleV0gPSB2YWw7XG4gIHJldHVybiBPYmplY3Quc2VhbChjdHgpO1xufVxuXG5tb2R1bGUuZXhwb3J0cyA9IHtcbiAgUGx1Z2luQ29udGV4dCxcbn07XG4iLCJcInVzZSBzdHJpY3RcIjtcblxuY29uc3QgRU5UUklFUyA9IFN5bWJvbChcIkVOVFJJRVNcIik7XG5cbmZ1bmN0aW9uIFNjcmlwdENvbGxlY3Rpb24oKSB7XG4gIHRoaXNbRU5UUklFU10gPSB7fTtcbn1cblxuU2NyaXB0Q29sbGVjdGlvbi5wcm90b3R5cGUgPSBPYmplY3QuY3JlYXRlKE9iamVjdC5wcm90b3R5cGUsIHtcbiAgY29uc3RydWN0b3I6IHtcbiAgICB2YWx1ZTogU2NyaXB0Q29sbGVjdGlvbixcbiAgICBlbnVtZXJhYmxlOiBmYWxzZSxcbiAgICB3cml0YWJsZTogdHJ1ZSxcbiAgICBjb25maWd1cmFibGU6IHRydWUsXG4gIH0sXG4gIEVOVFJJRVM6IHtcbiAgICBnZXQoKSB7IHJldHVybiB0aGlzW0VOVFJJRVNdOyB9LFxuICAgIGVudW1lcmFibGU6IHRydWUsXG4gIH0sXG59KTtcblxuU2NyaXB0Q29sbGVjdGlvbi5jcmVhdGUgPSAoKSA9PiB7XG4gIHJldHVybiBPYmplY3Quc2VhbChuZXcgU2NyaXB0Q29sbGVjdGlvbigpKTtcbn1cblxuU2NyaXB0Q29sbGVjdGlvbi5wcm90b3R5cGUudG9KU09OID0gZnVuY3Rpb24oKSB7XG4gIHJldHVybiB0aGlzW0VOVFJJRVNdO1xufVxuXG5TY3JpcHRDb2xsZWN0aW9uLnByb3RvdHlwZS5nZXQgPSBmdW5jdGlvbihuYW1lKSB7XG4gIHJldHVybiB0aGlzW0VOVFJJRVNdW25hbWVdO1xufVxuXG5TY3JpcHRDb2xsZWN0aW9uLnByb3RvdHlwZS5zZXQgPSBmdW5jdGlvbihuYW1lLCB0YXJnZXQpIHtcbiAgaWYgKHRoaXNbRU5UUklFU11bbmFtZV0pXG4gICAgdGhyb3cgbmV3IEVycm9yKGBTY3JpcHQgXCIke25hbWV9XCIgZXhpc3RzYCk7XG4gIHRoaXNbRU5UUklFU11bbmFtZV0gPSB0YXJnZXQ7XG59XG5cbm1vZHVsZS5leHBvcnRzID0ge1xuICBTY3JpcHRDb2xsZWN0aW9uLFxufTtcbiIsIlwidXNlIHN0cmljdFwiO1xuXG5jb25zdCB7IGVuc3VyZUJvb2xlYW4gfSA9IHJlcXVpcmUoXCJAL3V0aWxzL1N0cmljdFR5cGVcIik7XG5cbmNvbnN0IE5BTUUgICAgICAgICAgICAgICAgPSBTeW1ib2woXCJOQU1FXCIpO1xuY29uc3QgTEFOR1VBR0UgICAgICAgICAgICA9IFN5bWJvbChcIkxBTkdVQUdFXCIpO1xuY29uc3QgSEVBREVSX0ZJTEVfT05MWSAgICA9IFN5bWJvbChcIkhFQURFUl9GSUxFX09OTFlcIik7XG5jb25zdCBERUZJTkVTICAgICAgICAgICAgID0gU3ltYm9sKFwiREVGSU5FU1wiKTtcbmNvbnN0IENPTVBJTEVfRkxBR1MgICAgICAgPSBTeW1ib2woXCJDT01QSUxFX0ZMQUdTXCIpO1xuY29uc3QgRklMRSAgICAgICAgICAgICAgICA9IFN5bWJvbChcIkZJTEVcIik7XG5jb25zdCBPQkpFQ1RfRklMRSAgICAgICAgID0gU3ltYm9sKFwiT0JKRUNUX0ZJTEVcIik7XG5cbmNvbnN0IF9sYW5ndWFnZUV4dGVuc2lvbnMgPSB7XG4gIEFTTTogWyBcIi5hc21cIiwgXCIuc1wiIF0sXG4gIEM6ICAgWyBcIi5jXCIgXSxcbiAgQ1hYOiBbXCIuY3BwXCIsIFwiLmNjXCIsIFwiLmN4eFwiIF0sXG59O1xuXG5mdW5jdGlvbiBpc1N1cHBvcnRMYW5ndWFnZShsYW5ndWFnZSkge1xuICByZXR1cm4gX2xhbmd1YWdlRXh0ZW5zaW9ucy5oYXNPd25Qcm9wZXJ0eShsYW5ndWFnZSk7XG59XG5cbmZ1bmN0aW9uIGdldEZpbGVMYW5ndWFnZShmaWxlbmFtZSkge1xuICBjb25zdCBmaWxlbmFtZUxvd2VyQ2FzZSA9IGZpbGVuYW1lLnRvU3RyaW5nKCkudG9Mb3dlckNhc2UoKTtcbiAgZm9yIChjb25zdCBbbGFuZ3VhZ2UsIGV4dGVuc2lvbnNdIG9mIE9iamVjdC5lbnRyaWVzKF9sYW5ndWFnZUV4dGVuc2lvbnMpKSB7XG4gICAgZm9yIChjb25zdCBpdGVyIG9mIGV4dGVuc2lvbnMpIHtcbiAgICAgIGlmIChmaWxlbmFtZUxvd2VyQ2FzZS5lbmRzV2l0aChpdGVyKSlcbiAgICAgICAgcmV0dXJuIGxhbmd1YWdlO1xuICAgIH1cbiAgfVxuICByZXR1cm4gXCJcIjtcbn1cblxuZnVuY3Rpb24gbWFrZUxhbmd1YWdlKHZhbHVlKSB7XG4gIGlmIChpc1N1cHBvcnRMYW5ndWFnZSh2YWx1ZSkpXG4gICAgcmV0dXJuIHZhbHVlO1xuICB0aHJvdyBuZXcgRXJyb3IoYExhbmd1YWdlIFwiJHt2YWx1ZX1cIiBpcyBub3Qgc3VwcG9ydGVkYCk7XG59XG5cbmZ1bmN0aW9uIFNvdXJjZUZpbGUoc2NvcGUsIGZpbGVuYW1lKSB7XG4gIHRoaXNbTkFNRV0gPSBmaWxlbmFtZS50b1N0cmluZygpO1xuICBjb25zdCBmbmFtZSA9IHNjb3BlLlNPVVJDRV9ESVIucmVzb2x2ZShmaWxlbmFtZSk7XG5cbiAgY29uc3QgbGFuZ3VhZ2UgPSBnZXRGaWxlTGFuZ3VhZ2UoZm5hbWUpO1xuICB0aGlzW0xBTkdVQUdFXSA9IGxhbmd1YWdlO1xuICB0aGlzW0hFQURFUl9GSUxFX09OTFldID0gIWxhbmd1YWdlO1xuICB0aGlzW0ZJTEVdID0gZm5hbWU7XG4gIHRoaXNbT0JKRUNUX0ZJTEVdID0gbnVsbDtcbiAgdGhpc1tERUZJTkVTXSA9IFtdO1xuICB0aGlzW0NPTVBJTEVfRkxBR1NdID0gIWxhbmd1YWdlID8gW10gOiBbXG4gICAgLi4uc2NvcGVbbGFuZ3VhZ2UgKyBcIl9GTEFHU1wiXSxcbiAgICAuLi5zY29wZVtsYW5ndWFnZSArIFwiX0ZMQUdTX1wiICsgc2NvcGUuQlVJTERfVFlQRS50b1VwcGVyQ2FzZSgpXSxcbiAgXTtcbn1cblxuU291cmNlRmlsZS5jcmVhdGUgPSAodGFyZ2V0LCBmaWxlbmFtZSkgPT4ge1xuICByZXR1cm4gT2JqZWN0LnNlYWwobmV3IFNvdXJjZUZpbGUodGFyZ2V0LCBmaWxlbmFtZSkpO1xufVxuXG5Tb3VyY2VGaWxlLnByb3RvdHlwZSA9IE9iamVjdC5jcmVhdGUoT2JqZWN0LnByb3RvdHlwZSwge1xuICBjb25zdHJ1Y3Rvcjoge1xuICAgIHZhbHVlOiBTb3VyY2VGaWxlLFxuICAgIGVudW1lcmFibGU6IGZhbHNlLFxuICB9LFxuICBOQU1FOiB7XG4gICAgZ2V0ICgpIHsgcmV0dXJuIHRoaXNbTkFNRV07IH0sXG4gICAgZW51bWVyYWJsZTogdHJ1ZSxcbiAgfSxcbiAgTEFOR1VBR0U6IHtcbiAgICBnZXQgKCkgeyByZXR1cm4gdGhpc1tMQU5HVUFHRV07IH0sXG4gICAgZW51bWVyYWJsZTogdHJ1ZSxcbiAgfSxcbiAgSEVBREVSX0ZJTEVfT05MWToge1xuICAgIGdldCgpIHsgcmV0dXJuIHRoaXNbSEVBREVSX0ZJTEVfT05MWV07IH0sXG4gICAgc2V0KHZhbHVlKSB7IHRoaXNbSEVBREVSX0ZJTEVfT05MWV0gPSBlbnN1cmVCb29sZWFuKHZhbHVlKTsgfSxcbiAgICBlbnVtZXJhYmxlOiB0cnVlLFxuICB9LFxuICBERUZJTkVTOiB7XG4gICAgZ2V0KCkgeyByZXR1cm4gdGhpc1tERUZJTkVTXTsgfSxcbiAgICBlbnVtZXJhYmxlOiB0cnVlLFxuICB9LFxuICBDT01QSUxFX0ZMQUdTOiB7XG4gICAgZ2V0KCkgeyByZXR1cm4gdGhpc1tDT01QSUxFX0ZMQUdTXTsgfSxcbiAgICBlbnVtZXJhYmxlOiB0cnVlLFxuICB9LFxuICBGSUxFOiB7XG4gICAgZ2V0KCkgeyByZXR1cm4gdGhpc1tGSUxFXTsgfSxcbiAgICBlbnVtZXJhYmxlOiB0cnVlLFxuICB9LFxuICBGSUxFX0RJUjoge1xuICAgIGdldCgpIHsgcmV0dXJuIHRoaXNbRklMRV0uZGlybmFtZSgpOyB9LFxuICAgIGVudW1lcmFibGU6IHRydWUsXG4gIH0sXG4gIEZJTEVfTkFNRToge1xuICAgIGdldCgpIHsgcmV0dXJuIHRoaXNbRklMRV0uYmFzZW5hbWUoKTsgfSxcbiAgICBlbnVtZXJhYmxlOiB0cnVlLFxuICB9LFxuICBPQkpFQ1RfRklMRToge1xuICAgIGdldCgpIHsgcmV0dXJuIHRoaXNbT0JKRUNUX0ZJTEVdOyB9LFxuICAgIHNldCh2YWx1ZSkgeyB0aGlzW09CSkVDVF9GSUxFXSA9IHZhbHVlOyB9LFxuICAgIGVudW1lcmFibGU6IHRydWUsXG4gIH0sXG4gIE9CSkVDVF9GSUxFX0RJUjoge1xuICAgIGdldCgpIHsgcmV0dXJuIHRoaXNbT0JKRUNUX0ZJTEVdID8gdGhpc1tPQkpFQ1RfRklMRV0uZGlybmFtZSgpIDogbnVsbDsgfSxcbiAgICBlbnVtZXJhYmxlOiB0cnVlLFxuICB9LFxuICBPQkpFQ1RfRklMRV9OQU1FOiB7XG4gICAgZ2V0KCkgeyByZXR1cm4gdGhpc1tPQkpFQ1RfRklMRV0gPyB0aGlzW09CSkVDVF9GSUxFXS5iYXNlbmFtZSgpIDogbnVsbDsgfSxcbiAgICBlbnVtZXJhYmxlOiB0cnVlLFxuICB9LFxufSk7XG5cblNvdXJjZUZpbGUucHJvdG90eXBlLnRvSlNPTiA9IGZ1bmN0aW9uKCkge1xuICBjb25zdCBqc29uID0ge307XG4gIGZvciAoY29uc3Qga2V5IGluIHRoaXMpXG4gICAganNvbltrZXldID0gdGhpc1trZXldO1xuICByZXR1cm4ganNvbjtcbn1cblxubW9kdWxlLmV4cG9ydHMgPSB7XG4gIFNvdXJjZUZpbGUsXG59O1xuIiwiXCJ1c2Ugc3RyaWN0XCI7XG5cbmNvbnN0IHsgU291cmNlRmlsZSB9ID0gcmVxdWlyZShcIkAvYml0bWFrZS9Tb3VyY2VGaWxlLmpzXCIpO1xuXG5jb25zdCBTT1VSQ0VTID0gU3ltYm9sKFwiU09VUkNFU1wiKTtcblxuZnVuY3Rpb24gU291cmNlRmlsZUxpc3Qoc2NvcGUsIHNvdXJjZXMpIHtcbiAgdGhpc1tTT1VSQ0VTXSA9IFtdO1xuICBmb3IgKGNvbnN0IGl0ZXIgb2Ygc291cmNlcykge1xuICAgIGlmICghKGl0ZXIgaW5zdGFuY2VvZiBTb3VyY2VGaWxlKSlcbiAgICAgIHRocm93IG5ldyBFcnJvcihgSXRlbSAke2l0ZXJ9IGlzIG5vdCBTb3VyY2VGaWxlYCk7XG4gICAgdGhpc1tTT1VSQ0VTXS5wdXNoKGl0ZXIpO1xuICB9XG59XG5cblNvdXJjZUZpbGVMaXN0LnByb3RvdHlwZSA9IE9iamVjdC5jcmVhdGUoT2JqZWN0LnByb3RvdHlwZSwge1xuICBjb25zdHJ1Y3Rvcjoge1xuICAgIHZhbHVlOiBTb3VyY2VGaWxlLFxuICAgIGVudW1lcmFibGU6IGZhbHNlLFxuICB9LFxufSk7XG5cblNvdXJjZUZpbGVMaXN0LnByb3RvdHlwZS5hZGREZWZpbml0aW9ucyA9IGZ1bmN0aW9uKC4uLmRlZmluaXRpb25zKSB7XG4gIGZvciAoY29uc3QgaXRlciBvZiBkZWZpbml0aW9ucy5mbGF0KCkpXG4gICAgdGhpc1tTT1VSQ0VTXS5mb3JFYWNoKGkgPT4gaS5ERUZJTkVTLnB1c2goaXRlcikpO1xufVxuXG5Tb3VyY2VGaWxlTGlzdC5wcm90b3R5cGUuYWRkQ29tcGlsZUZsYWdzID0gZnVuY3Rpb24oLi4uZmxhZ3MpIHtcbiAgZm9yIChjb25zdCBpdGVyIG9mIGZsYWdzLmZsYXQoKSlcbiAgICB0aGlzW1NPVVJDRVNdLmZvckVhY2goaSA9PiBpLkNPTVBJTEVfRkxBR1MucHVzaChpdGVyKSk7XG59XG5cblNvdXJjZUZpbGVMaXN0LnByb3RvdHlwZS5zb3VyY2VBdCA9IGZ1bmN0aW9uKGluZGV4KSB7XG4gIHJldHVybiB0aGlzW1NPVVJDRVNdW2luZGV4XTtcbn1cblxuU291cmNlRmlsZUxpc3QucHJvdG90eXBlLnNvdXJjZUNvdW50ID0gZnVuY3Rpb24oaW5kZXgpIHtcbiAgcmV0dXJuIHRoaXNbU09VUkNFU10ubGVuZ3RoO1xufVxuXG5Tb3VyY2VGaWxlTGlzdC5wcm90b3R5cGUudG9KU09OID0gZnVuY3Rpb24oKSB7XG4gIHJldHVybiB0aGlzW1NPVVJDRVNdO1xufVxuXG5Tb3VyY2VGaWxlTGlzdC5jcmVhdGUgPSBmdW5jdGlvbihzY29wZSwgc291cmNlcykge1xuICByZXR1cm4gT2JqZWN0LnNlYWwobmV3IFNvdXJjZUZpbGVMaXN0KHNjb3BlLCBzb3VyY2VzKSk7XG59XG5cbm1vZHVsZS5leHBvcnRzID0ge1xuICBTb3VyY2VGaWxlTGlzdCxcbn07XG4iLCJjb25zdCBmcyA9IHJlcXVpcmUoXCJub2RlOmZzXCIpO1xuY29uc3QgcGF0aCA9IHJlcXVpcmUoXCJub2RlOnBhdGhcIik7XG5cbm1vZHVsZS5leHBvcnRzID0gKHBhcmFtcykgPT4ge1xuICBjb25zdCBjb250ZW50ID0gZnMucmVhZEZpbGVTeW5jKHBhcmFtcy5pbnB1dCwgXCJ1dGYtOFwiKTtcbiAgY29uc3QgbmV3Q29udGVudCA9IGNvbnRlbnQucmVwbGFjZSgvQChbX0EtWmEtel1bX0EtWmEtejAtOV0rKUAvZywgKG1hdGNoLCB2YWx1ZSkgPT4ge1xuICAgIGNvbnN0IHJlcyA9IHBhcmFtc1t2YWx1ZV0gfHwgXCJcIjtcbiAgICBpZiAoQXJyYXkuaXNBcnJheShyZXMpKVxuICAgICAgcmV0dXJuIHJlcy5qb2luKFwiXFxuXCIpO1xuICAgIHJldHVybiByZXMudG9TdHJpbmcoKTtcbiAgfSk7XG4gIGZzLm1rZGlyU3luYyhwYXRoLmRpcm5hbWUocGFyYW1zLm91dHB1dCksIHsgcmVjdXJzaXZlOiB0cnVlIH0pO1xuICBmcy53cml0ZUZpbGVTeW5jKHBhcmFtcy5vdXRwdXQsIG5ld0NvbnRlbnQsIFwidXRmLThcIik7XG59XG4iLCJjb25zdCBmcyA9IHJlcXVpcmUoXCJub2RlOmZzXCIpO1xuY29uc3QgcGF0aCA9IHJlcXVpcmUoXCJub2RlOnBhdGhcIik7XG5cbm1vZHVsZS5leHBvcnRzID0gKHtzcmMsIGRlc3R9KSA9PiB7XG4gIGNvbnNvbGUubG9nKFwiSW5zdGFsbGluZzogXCIgKyBkZXN0KTtcbiAgZnMubWtkaXJTeW5jKHBhdGguZGlybmFtZShkZXN0KSwgeyByZWN1cnNpdmU6IHRydWUgfSk7XG4gIGZzLmNwU3luYyhzcmMsIGRlc3QsIHsgZm9yY2U6IHRydWUgfSk7XG59XG4iLCJcInVzZSBzdHJpY3RcIjtcblxuY29uc3QgeyBlbnN1cmVCb29sZWFuLCBlbnN1cmVTdHJpbmcgfSA9IHJlcXVpcmUoXCJAL3V0aWxzL1N0cmljdFR5cGVcIik7XG5jb25zdCB7IEFic29sdXRlUGF0aCB9ID0gcmVxdWlyZShcIkAvY29yZS9QYXRoXCIpO1xuXG5jb25zdCBERUZJTkVfTUFQICAgICAgICAgICAgPSBTeW1ib2woXCJERUZJTkVfTUFQXCIpO1xuXG5jb25zdCBDX0NPTVBJTEVSICAgICAgICAgICAgPSBTeW1ib2woXCJDX0NPTVBJTEVSXCIpO1xuY29uc3QgQ19GTEFHUyAgICAgICAgICAgICAgID0gU3ltYm9sKFwiQ19GTEFHU1wiKTtcbmNvbnN0IENfRkxBR1NfREVCVUcgICAgICAgICA9IFN5bWJvbChcIkNfRkxBR1NfREVCVUdcIik7XG5jb25zdCBDX0ZMQUdTX1JFTEVBU0UgICAgICAgPSBTeW1ib2woXCJDX0ZMQUdTX1JFTEVBU0VcIik7XG5jb25zdCBDWFhfQ09NUElMRVIgICAgICAgICAgPSBTeW1ib2woXCJDWFhfQ09NUElMRVJcIik7XG5jb25zdCBDWFhfRkxBR1MgICAgICAgICAgICAgPSBTeW1ib2woXCJDWFhfRkxBR1NcIik7XG5jb25zdCBDWFhfRkxBR1NfREVCVUcgICAgICAgPSBTeW1ib2woXCJDWFhfRkxBR1NfREVCVUdcIik7XG5jb25zdCBDWFhfRkxBR1NfUkVMRUFTRSAgICAgPSBTeW1ib2woXCJDWFhfRkxBR1NfUkVMRUFTRVwiKTtcbmNvbnN0IEFSICAgICAgICAgICAgICAgICAgICA9IFN5bWJvbChcIkFSXCIpO1xuY29uc3QgUkFOTElCICAgICAgICAgICAgICAgID0gU3ltYm9sKFwiUkFOTElCXCIpO1xuY29uc3QgTElOS0VSICAgICAgICAgICAgICAgID0gU3ltYm9sKFwiTElOS0VSXCIpO1xuY29uc3QgTk0gICAgICAgICAgICAgICAgICAgID0gU3ltYm9sKFwiTk1cIik7XG5jb25zdCBPQkpDT1BZICAgICAgICAgICAgICAgPSBTeW1ib2woXCJPQkpDT1BZXCIpO1xuY29uc3QgT0JKRFVNUCAgICAgICAgICAgICAgID0gU3ltYm9sKFwiT0JKRFVNUFwiKTtcbmNvbnN0IFNUUklQICAgICAgICAgICAgICAgICA9IFN5bWJvbChcIlNUUklQXCIpO1xuY29uc3QgT0JKRUNUX0xJQlJBUllfUFJFRklYID0gU3ltYm9sKFwiT0JKRUNUX0xJQlJBUllfUFJFRklYXCIpO1xuY29uc3QgT0JKRUNUX0xJQlJBUllfU1VGRklYID0gU3ltYm9sKFwiT0JKRUNUX0xJQlJBUllfU1VGRklYXCIpO1xuY29uc3QgT0JKRUNUX0xJTktFUl9GTEFHUyAgID0gU3ltYm9sKFwiT0JKRUNUX0xJTktFUl9GTEFHU1wiKTtcbmNvbnN0IFNUQVRJQ19MSUJSQVJZX1BSRUZJWCA9IFN5bWJvbChcIlNUQVRJQ19MSUJSQVJZX1BSRUZJWFwiKTtcbmNvbnN0IFNUQVRJQ19MSUJSQVJZX1NVRkZJWCA9IFN5bWJvbChcIlNUQVRJQ19MSUJSQVJZX1NVRkZJWFwiKTtcbmNvbnN0IFNUQVRJQ19MSU5LRVJfRkxBR1MgICA9IFN5bWJvbChcIlNUQVRJQ19MSU5LRVJfRkxBR1NcIik7XG5jb25zdCBTSEFSRURfTElCUkFSWV9QUkVGSVggPSBTeW1ib2woXCJTSEFSRURfTElCUkFSWV9QUkVGSVhcIik7XG5jb25zdCBTSEFSRURfTElCUkFSWV9TVUZGSVggPSBTeW1ib2woXCJTSEFSRURfTElCUkFSWV9TVUZGSVhcIik7XG5jb25zdCBTSEFSRURfTElOS0VSX0ZMQUdTICAgPSBTeW1ib2woXCJTSEFSRURfTElOS0VSX0ZMQUdTXCIpO1xuY29uc3QgRVhFQ1VUQUJMRV9TVUZGSVggICAgID0gU3ltYm9sKFwiRVhFQ1VUQUJMRV9TVUZGSVhcIik7XG5jb25zdCBFWEVfTElOS0VSX0ZMQUdTICAgICAgPSBTeW1ib2woXCJFWEVfTElOS0VSX0ZMQUdTXCIpO1xuXG5mdW5jdGlvbiBTeXN0ZW1WYXJpYWJsZXMoKSB7XG4gIHRoaXNbQ19DT01QSUxFUl0gICAgICAgICAgICA9IFwiY2xhbmdcIjtcbiAgdGhpc1tDX0ZMQUdTXSAgICAgICAgICAgICAgID0gW107XG4gIHRoaXNbQ19GTEFHU19ERUJVR10gICAgICAgICA9IFsgXCItZ1wiIF07XG4gIHRoaXNbQ19GTEFHU19SRUxFQVNFXSAgICAgICA9IFsgXCItTzNcIiwgXCItRE5ERUJVR1wiIF07XG4gIHRoaXNbQ1hYX0NPTVBJTEVSXSAgICAgICAgICA9IFwiY2xhbmcrK1wiO1xuICB0aGlzW0NYWF9GTEFHU10gICAgICAgICAgICAgPSBbXTtcbiAgdGhpc1tDWFhfRkxBR1NfREVCVUddICAgICAgID0gWyBcIi1nXCIgXTtcbiAgdGhpc1tDWFhfRkxBR1NfUkVMRUFTRV0gICAgID0gWyBcIi1PM1wiLCBcIi1ETkRFQlVHXCIgXTtcbiAgdGhpc1tBUl0gICAgICAgICAgICAgICAgICAgID0gXCJsbHZtLWFyXCI7XG4gIHRoaXNbUkFOTElCXSAgICAgICAgICAgICAgICA9IFwibGx2bS1yYW5saWJcIjtcbiAgdGhpc1tMSU5LRVJdICAgICAgICAgICAgICAgID0gXCJ3YXNtLWxkXCI7XG4gIHRoaXNbTk1dICAgICAgICAgICAgICAgICAgICA9IFwibGx2bS1ubVwiO1xuICB0aGlzW09CSkNPUFldICAgICAgICAgICAgICAgPSBcImxsdm0tb2JqY29weVwiO1xuICB0aGlzW09CSkRVTVBdICAgICAgICAgICAgICAgPSBcImxsdm0tb2JqZHVtcFwiO1xuICB0aGlzW1NUUklQXSAgICAgICAgICAgICAgICAgPSBcImxsdm0tc3RyaXBcIjtcbiAgdGhpc1tPQkpFQ1RfTElCUkFSWV9QUkVGSVhdID0gXCJcIjtcbiAgdGhpc1tPQkpFQ1RfTElCUkFSWV9TVUZGSVhdID0gXCIub1wiO1xuICB0aGlzW09CSkVDVF9MSU5LRVJfRkxBR1NdICAgPSBbXTtcbiAgdGhpc1tTVEFUSUNfTElCUkFSWV9QUkVGSVhdID0gXCJsaWJcIjtcbiAgdGhpc1tTVEFUSUNfTElCUkFSWV9TVUZGSVhdID0gXCIuYVwiO1xuICB0aGlzW1NUQVRJQ19MSU5LRVJfRkxBR1NdICAgPSBbXTtcbiAgdGhpc1tTSEFSRURfTElCUkFSWV9QUkVGSVhdID0gXCJsaWJcIjtcbiAgdGhpc1tTSEFSRURfTElCUkFSWV9TVUZGSVhdID0gXCIuc29cIjtcbiAgdGhpc1tTSEFSRURfTElOS0VSX0ZMQUdTXSAgID0gW107XG4gIHRoaXNbRVhFQ1VUQUJMRV9TVUZGSVhdICAgICA9IFwiXCI7XG4gIHRoaXNbRVhFX0xJTktFUl9GTEFHU10gICAgICA9IFtdO1xuXG4gIGZvciAoY29uc3QgeyBzeW1ib2wsIGluaXRWYWx1ZSB9IG9mIE9iamVjdC52YWx1ZXModGhpc1tERUZJTkVfTUFQXSB8fCB7fSkpIHtcbiAgICB0aGlzW3N5bWJvbF0gPSBBcnJheS5pc0FycmF5KGluaXRWYWx1ZSkgPyBBcnJheS5mcm9tKGluaXRWYWx1ZSkgOiBpbml0VmFsdWU7XG4gIH1cbn1cblxuU3lzdGVtVmFyaWFibGVzLmNyZWF0ZSA9IGZ1bmN0aW9uKCkge1xuICByZXR1cm4gT2JqZWN0LnNlYWwobmV3IFN5c3RlbVZhcmlhYmxlcyk7XG59XG5cblN5c3RlbVZhcmlhYmxlcy5wcm90b3R5cGUgPSBPYmplY3QuY3JlYXRlKE9iamVjdC5wcm90b3R5cGUsIHtcbiAgY29uc3RydWN0b3I6IHtcbiAgICB2YWx1ZTogU3lzdGVtVmFyaWFibGVzLFxuICAgIGVudW1lcmFibGU6IGZhbHNlLFxuICB9LFxuICBDX0NPTVBJTEVSOiB7XG4gICAgZ2V0ICgpIHsgcmV0dXJuIHRoaXNbQ19DT01QSUxFUl07IH0sXG4gICAgc2V0KHZhbHVlKSB7IHRoaXNbQ19DT01QSUxFUl0gPSB2YWx1ZTsgfSxcbiAgICBlbnVtZXJhYmxlOiB0cnVlLFxuICB9LFxuICBDX0ZMQUdTOiB7XG4gICAgZ2V0ICgpIHsgcmV0dXJuIHRoaXNbQ19GTEFHU107IH0sXG4gICAgc2V0KHZhbHVlKSB7IHRoaXNbQ19GTEFHU10gPSB2YWx1ZTsgfSxcbiAgICBlbnVtZXJhYmxlOiB0cnVlLFxuICB9LFxuICBDX0ZMQUdTX0RFQlVHOiB7XG4gICAgZ2V0ICgpIHsgcmV0dXJuIHRoaXNbQ19GTEFHU19ERUJVR107IH0sXG4gICAgc2V0KHZhbHVlKSB7IHRoaXNbQ19GTEFHU19ERUJVR10gPSB2YWx1ZTsgfSxcbiAgICBlbnVtZXJhYmxlOiB0cnVlLFxuICB9LFxuICBDX0ZMQUdTX1JFTEVBU0U6IHtcbiAgICBnZXQgKCkgeyByZXR1cm4gdGhpc1tDX0ZMQUdTX1JFTEVBU0VdOyB9LFxuICAgIHNldCh2YWx1ZSkgeyB0aGlzW0NfRkxBR1NfUkVMRUFTRV0gPSB2YWx1ZTsgfSxcbiAgICBlbnVtZXJhYmxlOiB0cnVlLFxuICB9LFxuICBDWFhfQ09NUElMRVI6IHtcbiAgICBnZXQgKCkgeyByZXR1cm4gdGhpc1tDWFhfQ09NUElMRVJdOyB9LFxuICAgIHNldCh2YWx1ZSkgeyB0aGlzW0NYWF9DT01QSUxFUl0gPSB2YWx1ZTsgfSxcbiAgICBlbnVtZXJhYmxlOiB0cnVlLFxuICB9LFxuICBDWFhfRkxBR1M6IHtcbiAgICBnZXQgKCkgeyByZXR1cm4gdGhpc1tDWFhfRkxBR1NdOyB9LFxuICAgIHNldCh2YWx1ZSkgeyB0aGlzW0NYWF9GTEFHU10gPSB2YWx1ZTsgfSxcbiAgICBlbnVtZXJhYmxlOiB0cnVlLFxuICB9LFxuICBDWFhfRkxBR1NfREVCVUc6IHtcbiAgICBnZXQgKCkgeyByZXR1cm4gdGhpc1tDWFhfRkxBR1NfREVCVUddOyB9LFxuICAgIHNldCh2YWx1ZSkgeyB0aGlzW0NYWF9GTEFHU19ERUJVR10gPSB2YWx1ZTsgfSxcbiAgICBlbnVtZXJhYmxlOiB0cnVlLFxuICB9LFxuICBDWFhfRkxBR1NfUkVMRUFTRToge1xuICAgIGdldCAoKSB7IHJldHVybiB0aGlzW0NYWF9GTEFHU19SRUxFQVNFXTsgfSxcbiAgICBzZXQodmFsdWUpIHsgdGhpc1tDWFhfRkxBR1NfUkVMRUFTRV0gPSB2YWx1ZTsgfSxcbiAgICBlbnVtZXJhYmxlOiB0cnVlLFxuICB9LFxuICBBUjoge1xuICAgIGdldCAoKSB7IHJldHVybiB0aGlzW0FSXTsgfSxcbiAgICBzZXQodmFsdWUpIHsgdGhpc1tBUl0gPSB2YWx1ZTsgfSxcbiAgICBlbnVtZXJhYmxlOiB0cnVlLFxuICB9LFxuICBSQU5MSUI6IHtcbiAgICBnZXQgKCkgeyByZXR1cm4gdGhpc1tSQU5MSUJdOyB9LFxuICAgIHNldCh2YWx1ZSkgeyB0aGlzW1JBTkxJQl0gPSB2YWx1ZTsgfSxcbiAgICBlbnVtZXJhYmxlOiB0cnVlLFxuICB9LFxuICBMSU5LRVI6IHtcbiAgICBnZXQgKCkgeyByZXR1cm4gdGhpc1tMSU5LRVJdOyB9LFxuICAgIHNldCh2YWx1ZSkgeyB0aGlzW0xJTktFUl0gPSB2YWx1ZTsgfSxcbiAgICBlbnVtZXJhYmxlOiB0cnVlLFxuICB9LFxuICBOTToge1xuICAgIGdldCAoKSB7IHJldHVybiB0aGlzW05NXTsgfSxcbiAgICBzZXQodmFsdWUpIHsgdGhpc1tOTV0gPSB2YWx1ZTsgfSxcbiAgICBlbnVtZXJhYmxlOiB0cnVlLFxuICB9LFxuICBPQkpDT1BZOiB7XG4gICAgZ2V0ICgpIHsgcmV0dXJuIHRoaXNbT0JKQ09QWV07IH0sXG4gICAgc2V0KHZhbHVlKSB7IHRoaXNbT0JKQ09QWV0gPSB2YWx1ZTsgfSxcbiAgICBlbnVtZXJhYmxlOiB0cnVlLFxuICB9LFxuICBPQkpEVU1QOiB7XG4gICAgZ2V0ICgpIHsgcmV0dXJuIHRoaXNbT0JKRFVNUF07IH0sXG4gICAgc2V0KHZhbHVlKSB7IHRoaXNbT0JKRFVNUF0gPSB2YWx1ZTsgfSxcbiAgICBlbnVtZXJhYmxlOiB0cnVlLFxuICB9LFxuICBTVFJJUDoge1xuICAgIGdldCAoKSB7IHJldHVybiB0aGlzW1NUUklQXTsgfSxcbiAgICBzZXQodmFsdWUpIHsgdGhpc1tTVFJJUF0gPSB2YWx1ZTsgfSxcbiAgICBlbnVtZXJhYmxlOiB0cnVlLFxuICB9LFxuICBPQkpFQ1RfTElCUkFSWV9QUkVGSVg6IHtcbiAgICBnZXQgKCkgeyByZXR1cm4gdGhpc1tPQkpFQ1RfTElCUkFSWV9QUkVGSVhdOyB9LFxuICAgIHNldCh2YWx1ZSkgeyB0aGlzW09CSkVDVF9MSUJSQVJZX1BSRUZJWF0gPSB2YWx1ZTsgfSxcbiAgICBlbnVtZXJhYmxlOiB0cnVlLFxuICB9LFxuICBPQkpFQ1RfTElCUkFSWV9TVUZGSVg6IHtcbiAgICBnZXQgKCkgeyByZXR1cm4gdGhpc1tPQkpFQ1RfTElCUkFSWV9TVUZGSVhdOyB9LFxuICAgIHNldCh2YWx1ZSkgeyB0aGlzW09CSkVDVF9MSUJSQVJZX1NVRkZJWF0gPSB2YWx1ZTsgfSxcbiAgICBlbnVtZXJhYmxlOiB0cnVlLFxuICB9LFxuICBPQkpFQ1RfTElOS0VSX0ZMQUdTOiB7XG4gICAgZ2V0KCkgeyByZXR1cm4gdGhpc1tPQkpFQ1RfTElOS0VSX0ZMQUdTXTsgfSxcbiAgICBzZXQodmFsdWUpIHsgdGhpc1tPQkpFQ1RfTElOS0VSX0ZMQUdTXSA9IHZhbHVlOyB9LFxuICAgIGVudW1lcmFibGU6IHRydWUsXG4gIH0sXG4gIFNUQVRJQ19MSUJSQVJZX1BSRUZJWDoge1xuICAgIGdldCAoKSB7IHJldHVybiB0aGlzW1NUQVRJQ19MSUJSQVJZX1BSRUZJWF07IH0sXG4gICAgc2V0KHZhbHVlKSB7IHRoaXNbU1RBVElDX0xJQlJBUllfUFJFRklYXSA9IHZhbHVlOyB9LFxuICAgIGVudW1lcmFibGU6IHRydWUsXG4gIH0sXG4gIFNUQVRJQ19MSUJSQVJZX1NVRkZJWDoge1xuICAgIGdldCAoKSB7IHJldHVybiB0aGlzW1NUQVRJQ19MSUJSQVJZX1NVRkZJWF07IH0sXG4gICAgc2V0KHZhbHVlKSB7IHRoaXNbU1RBVElDX0xJQlJBUllfU1VGRklYXSA9IHZhbHVlOyB9LFxuICAgIGVudW1lcmFibGU6IHRydWUsXG4gIH0sXG4gIFNUQVRJQ19MSU5LRVJfRkxBR1M6IHtcbiAgICBnZXQoKSB7IHJldHVybiB0aGlzW1NUQVRJQ19MSU5LRVJfRkxBR1NdOyB9LFxuICAgIHNldCh2YWx1ZSkgeyB0aGlzW1NUQVRJQ19MSU5LRVJfRkxBR1NdID0gdmFsdWU7IH0sXG4gICAgZW51bWVyYWJsZTogdHJ1ZSxcbiAgfSxcbiAgU0hBUkVEX0xJQlJBUllfUFJFRklYOiB7XG4gICAgZ2V0KCkgeyByZXR1cm4gdGhpc1tTSEFSRURfTElCUkFSWV9QUkVGSVhdOyB9LFxuICAgIHNldCh2YWx1ZSkgeyB0aGlzW1NIQVJFRF9MSUJSQVJZX1BSRUZJWF0gPSB2YWx1ZTsgfSxcbiAgICBlbnVtZXJhYmxlOiB0cnVlLFxuICB9LFxuICBTSEFSRURfTElCUkFSWV9TVUZGSVg6IHtcbiAgICBnZXQoKSB7IHJldHVybiB0aGlzW1NIQVJFRF9MSUJSQVJZX1NVRkZJWF07IH0sXG4gICAgc2V0KHZhbHVlKSB7IHRoaXNbU0hBUkVEX0xJQlJBUllfU1VGRklYXSA9IHZhbHVlOyB9LFxuICAgIGVudW1lcmFibGU6IHRydWUsXG4gIH0sXG4gIFNIQVJFRF9MSU5LRVJfRkxBR1M6IHtcbiAgICBnZXQoKSB7IHJldHVybiB0aGlzW1NIQVJFRF9MSU5LRVJfRkxBR1NdOyB9LFxuICAgIHNldCh2YWx1ZSkgeyB0aGlzW1NIQVJFRF9MSU5LRVJfRkxBR1NdID0gdmFsdWU7IH0sXG4gICAgZW51bWVyYWJsZTogdHJ1ZSxcbiAgfSxcbiAgRVhFQ1VUQUJMRV9TVUZGSVg6IHtcbiAgICBnZXQoKSB7IHJldHVybiB0aGlzW0VYRUNVVEFCTEVfU1VGRklYXTsgfSxcbiAgICBzZXQodmFsdWUpIHsgdGhpc1tFWEVDVVRBQkxFX1NVRkZJWF0gPSB2YWx1ZTsgfSxcbiAgICBlbnVtZXJhYmxlOiB0cnVlLFxuICB9LFxuICBFWEVfTElOS0VSX0ZMQUdTOiB7XG4gICAgZ2V0KCkgeyByZXR1cm4gdGhpc1tFWEVfTElOS0VSX0ZMQUdTXTsgfSxcbiAgICBzZXQodmFsdWUpIHsgdGhpc1tFWEVfTElOS0VSX0ZMQUdTXSA9IHZhbHVlOyB9LFxuICAgIGVudW1lcmFibGU6IHRydWUsXG4gIH0sXG59KTtcblxuU3lzdGVtVmFyaWFibGVzLmRlZmluZVZhcmlhYmxlID0gZnVuY3Rpb24oc2NvcGUsIG5hbWUsIGRlc2NyaXB0b3IpIHtcbiAgaWYgKCFzY29wZVtERUZJTkVfTUFQXSlcbiAgICBzY29wZVtERUZJTkVfTUFQXSA9IHt9O1xuXG4gIGNvbnN0IHR5cGUgPSBkZXNjcmlwdG9yLnR5cGUgfHwgKEFycmF5LmlzQXJyYXkoZGVzY3JpcHRvci52YWx1ZSkgPyBcImFycmF5XCIgOiB0eXBlb2YgZGVzY3JpcHRvci52YWx1ZSk7XG5cbiAgbGV0IGRlZmluZUVudHJ5ID0gc2NvcGVbREVGSU5FX01BUF1bbmFtZV07XG4gIGlmICghZGVmaW5lRW50cnkpIHtcbiAgICBkZWZpbmVFbnRyeSA9IHt9O1xuICAgIHNjb3BlW0RFRklORV9NQVBdW25hbWVdID0gZGVmaW5lRW50cnk7XG4gIH1cblxuICBpZiAoZGVmaW5lRW50cnkudHlwZSAhPT0gdHlwZSkge1xuICAgIGRlZmluZUVudHJ5LnN5bWJvbCA9IFN5bWJvbChuYW1lKTtcbiAgfVxuXG4gIGRlZmluZUVudHJ5LnR5cGUgPSB0eXBlO1xuICBkZWZpbmVFbnRyeS5kZXNjcmlwdGlvbiA9IGRlc2NyaXB0b3IuZGVzY3JpcHRpb24gfHwgXCJcIjtcblxuICBsZXQgZW5zdXJlVmFsdWU7XG4gIGlmIChBcnJheS5pc0FycmF5KHR5cGUpKSB7XG4gICAgbGV0IGl0ZW1UeXBlO1xuICAgIGZvciAoY29uc3QgaXRlciBvZiB0eXBlKSB7XG4gICAgICBjb25zdCBpdCA9IHR5cGVvZiBpdGVyO1xuICAgICAgaWYgKCFpdGVtVHlwZSlcbiAgICAgICAgaXRlbVR5cGUgPSBpdDtcbiAgICAgIGVsc2UgaWYgKGl0ZW1UeXBlICE9PSBpdClcbiAgICAgICAgdGhyb3cgbmV3IEVycm9yKGBBbGwgZWxlbWVudHMgZm9yICR7bmFtZX0gbXVzdCBiZSBvZiB0aGUgc2FtZSB0eXBlYCk7XG4gICAgfVxuICAgIGlmIChpdGVtVHlwZSAhPT0gXCJib29sZWFuXCIgJiYgaXRlbVR5cGUgIT09IFwic3RyaW5nXCIpXG4gICAgICB0aHJvdyBuZXcgRXJyb3IoYFVua25vd24gJHtpdGVtVHlwZX0gZWxlbWVudCB0eXBlIG9mICR7bmFtZX0gdmFyaWFibGVgKTtcbiAgICBlbnN1cmVWYWx1ZSA9ICh2YWx1ZSkgPT4ge1xuICAgICAgaWYgKHR5cGUuaW5jbHVkZXModmFsdWUpKVxuICAgICAgICByZXR1cm4gdmFsdWU7XG4gICAgICB0aHJvdyBuZXcgRXJyb3IoYFRoZSAnJHt2YWx1ZX0nIGlzIG5vdCBhICR7dHlwZX1gKTtcbiAgICB9XG4gIH1cbiAgZWxzZSBpZiAodHlwZSA9PT0gXCJib29sZWFuXCIpXG4gICAgZW5zdXJlVmFsdWUgPSBlbnN1cmVCb29sZWFuO1xuICBlbHNlIGlmICh0eXBlID09PSBcInN0cmluZ1wiKVxuICAgIGVuc3VyZVZhbHVlID0gZW5zdXJlU3RyaW5nO1xuICBlbHNlIGlmICh0eXBlID09PSBcIkRpclBhdGhcIilcbiAgICBlbnN1cmVWYWx1ZSA9IEFic29sdXRlUGF0aC5jcmVhdGVEaXI7XG4gIGVsc2UgaWYgKHR5cGUgPT09IFwiRmlsZVBhdGhcIilcbiAgICBlbnN1cmVWYWx1ZSA9IEFic29sdXRlUGF0aC5jcmVhdGVGaWxlO1xuICBlbHNlIGlmICh0eXBlID09PSBcImFycmF5XCIpXG4gICAgLyogKi87XG4gIGVsc2VcbiAgICB0aHJvdyBuZXcgRXJyb3IoYFVua25vd24gJHt0eXBlfSB0eXBlIG9mICR7bmFtZX0gdmFyaWFibGVgKTtcblxuICBpZiAoZGVzY3JpcHRvci5oYXNPd25Qcm9wZXJ0eShcInZhbHVlXCIpKSB7XG4gICAgZGVmaW5lRW50cnkuaW5pdFZhbHVlID0gKHR5cGUgPT09IFwiYXJyYXlcIikgPyBBcnJheS5mcm9tKGRlc2NyaXB0b3IudmFsdWUpIDogZW5zdXJlVmFsdWUoZGVzY3JpcHRvci52YWx1ZSk7XG4gIH1cbiAgZWxzZSB7XG4gICAgZGVmaW5lRW50cnkuaW5pdFZhbHVlID0gKHR5cGUgPT09IFwiYXJyYXlcIikgPyBbXSA6IG51bGw7XG4gIH1cblxuICBjb25zdCB7IHN5bWJvbCB9ID0gZGVmaW5lRW50cnk7XG4gIGNvbnN0IGRlc2MgPSB7XG4gICAgY29uZmlndXJhYmxlOiB0cnVlLFxuICAgIGVudW1lcmFibGU6IHRydWUsXG4gICAgZ2V0KCkgeyByZXR1cm4gdGhpc1tzeW1ib2xdIH0sXG4gIH07XG5cbiAgaWYgKGVuc3VyZVZhbHVlKVxuICAgIGRlc2Muc2V0ID0gZnVuY3Rpb24odmFsdWUpIHsgdGhpc1tzeW1ib2xdID0gZW5zdXJlVmFsdWUodmFsdWUpIH07XG5cbiAgT2JqZWN0LmRlZmluZVByb3BlcnR5KHNjb3BlLCBuYW1lLCBkZXNjKTtcbn1cblxuU3lzdGVtVmFyaWFibGVzLmRlZmluZVZhcmlhYmxlcyA9IGZ1bmN0aW9uKHNjb3BlLCBkZXNjcmlwdG9ycykge1xuICBmb3IgKGNvbnN0IFsgbmFtZSwgZGVzY3JpcHRvciBdIG9mIE9iamVjdC5lbnRyaWVzKGRlc2NyaXB0b3JzKSlcbiAgICBTeXN0ZW1WYXJpYWJsZXMuZGVmaW5lVmFyaWFibGUoc2NvcGUsIG5hbWUsIGRlc2NyaXB0b3IpO1xufVxuXG5TeXN0ZW1WYXJpYWJsZXMucHJvdG90eXBlLnRvSlNPTiA9IGZ1bmN0aW9uKCkge1xuICBjb25zdCBqc29uID0ge307XG4gIGZvciAoY29uc3Qga2V5IGluIHRoaXMpXG4gICAganNvbltrZXldID0gdGhpc1trZXldO1xuICByZXR1cm4ganNvbjtcbn1cblxuU3lzdGVtVmFyaWFibGVzLnByb3RvdHlwZS5jbG9uZSA9IGZ1bmN0aW9uKCkge1xuICBjb25zdCBvID0gT2JqZWN0LmNyZWF0ZShTeXN0ZW1WYXJpYWJsZXMucHJvdG90eXBlKTtcblxuICBvW0FTTV9DT01QSUxFUl0gICAgICAgICAgPSB0aGlzW0FTTV9DT01QSUxFUl07XG4gIG9bQVNNX0ZMQUdTXSAgICAgICAgICAgICA9IFsgLi4udGhpc1tBU01fRkxBR1NdIF07XG4gIG9bQVNNX0ZMQUdTX0RFQlVHXSAgICAgICA9IFsgLi4udGhpc1tBU01fRkxBR1NfREVCVUddIF07XG4gIG9bQVNNX0ZMQUdTX1JFTEVBU0VdICAgICA9IFsgLi4udGhpc1tBU01fRkxBR1NfUkVMRUFTRV0gXTtcbiAgb1tDX0NPTVBJTEVSXSAgICAgICAgICAgID0gdGhpc1tDX0NPTVBJTEVSXTtcbiAgb1tDX0ZMQUdTXSAgICAgICAgICAgICAgID0gWyAuLi50aGlzW0NfRkxBR1NdIF07XG4gIG9bQ19GTEFHU19ERUJVR10gICAgICAgICA9IFsgLi4udGhpc1tDX0ZMQUdTX0RFQlVHXSBdO1xuICBvW0NfRkxBR1NfUkVMRUFTRV0gICAgICAgPSBbIC4uLnRoaXNbQ19GTEFHU19SRUxFQVNFXSBdO1xuICBvW0NYWF9DT01QSUxFUl0gICAgICAgICAgPSB0aGlzW0NYWF9DT01QSUxFUl07XG4gIG9bQ1hYX0ZMQUdTXSAgICAgICAgICAgICA9IFsgLi4udGhpc1tDWFhfRkxBR1NdIF07XG4gIG9bQ1hYX0ZMQUdTX0RFQlVHXSAgICAgICA9IFsgLi4udGhpc1tDWFhfRkxBR1NfREVCVUddIF07XG4gIG9bQ1hYX0ZMQUdTX1JFTEVBU0VdICAgICA9IFsgLi4udGhpc1tDWFhfRkxBR1NfUkVMRUFTRV0gXTtcbiAgb1tBUl0gICAgICAgICAgICAgICAgICAgID0gdGhpc1tBUl07XG4gIG9bUkFOTElCXSAgICAgICAgICAgICAgICA9IHRoaXNbUkFOTElCXTtcbiAgb1tMSU5LRVJdICAgICAgICAgICAgICAgID0gdGhpc1tMSU5LRVJdO1xuICBvW05NXSAgICAgICAgICAgICAgICAgICAgPSB0aGlzW05NXTtcbiAgb1tPQkpDT1BZXSAgICAgICAgICAgICAgID0gdGhpc1tPQkpDT1BZXTtcbiAgb1tPQkpEVU1QXSAgICAgICAgICAgICAgID0gdGhpc1tPQkpEVU1QXTtcbiAgb1tTVFJJUF0gICAgICAgICAgICAgICAgID0gdGhpc1tTVFJJUF07XG4gIG9bT0JKRUNUX0xJQlJBUllfUFJFRklYXSA9IHRoaXNbT0JKRUNUX0xJQlJBUllfUFJFRklYXTtcbiAgb1tPQkpFQ1RfTElCUkFSWV9TVUZGSVhdID0gdGhpc1tPQkpFQ1RfTElCUkFSWV9TVUZGSVhdO1xuICBvW09CSkVDVF9MSU5LRVJfRkxBR1NdICAgPSBbIC4uLnRoaXNbT0JKRUNUX0xJTktFUl9GTEFHU10gXTtcbiAgb1tTVEFUSUNfTElCUkFSWV9QUkVGSVhdID0gdGhpc1tTVEFUSUNfTElCUkFSWV9QUkVGSVhdO1xuICBvW1NUQVRJQ19MSUJSQVJZX1NVRkZJWF0gPSB0aGlzW1NUQVRJQ19MSUJSQVJZX1NVRkZJWF07XG4gIG9bU1RBVElDX0xJTktFUl9GTEFHU10gICA9IFsgLi4udGhpc1tTVEFUSUNfTElOS0VSX0ZMQUdTXSBdO1xuICBvW1NIQVJFRF9MSUJSQVJZX1BSRUZJWF0gPSB0aGlzW1NIQVJFRF9MSUJSQVJZX1BSRUZJWF07XG4gIG9bU0hBUkVEX0xJQlJBUllfU1VGRklYXSA9IHRoaXNbU0hBUkVEX0xJQlJBUllfU1VGRklYXTtcbiAgb1tTSEFSRURfTElOS0VSX0ZMQUdTXSAgID0gWyAuLi50aGlzW1NIQVJFRF9MSU5LRVJfRkxBR1NdIF07XG4gIG9bRVhFQ1VUQUJMRV9TVUZGSVhdICAgICA9IHRoaXNbRVhFQ1VUQUJMRV9TVUZGSVhdO1xuICBvW0VYRV9MSU5LRVJfRkxBR1NdICAgICAgPSBbIC4uLnRoaXNbRVhFX0xJTktFUl9GTEFHU10gXTtcblxuICBmb3IgKGNvbnN0IHsgc3ltYm9sIH0gb2YgT2JqZWN0LnZhbHVlcyh0aGlzW0RFRklORV9NQVBdIHx8IHt9KSkge1xuICAgIG9bc3ltYm9sXSA9IEFycmF5LmlzQXJyYXkodGhpc1tzeW1ib2xdKSA/IEFycmF5LmZyb20odGhpc1tzeW1ib2xdKSA6IHRoaXNbc3ltYm9sXTtcbiAgfVxuXG4gIHJldHVybiBPYmplY3Quc2VhbChvKTtcbn1cblxubW9kdWxlLmV4cG9ydHMgPSB7XG4gIFN5c3RlbVZhcmlhYmxlcyxcbn07XG4iLCJcInVzZSBzdHJpY3RcIjtcblxuY29uc3QgeyBlbnN1cmVTdHJpbmcgfSA9IHJlcXVpcmUoXCJAL3V0aWxzL1N0cmljdFR5cGVcIik7XG5jb25zdCB7IFNvdXJjZUZpbGUgfSA9IHJlcXVpcmUoXCJAL2JpdG1ha2UvU291cmNlRmlsZS5qc1wiKTtcbmNvbnN0IHsgU291cmNlRmlsZUxpc3QgfSA9IHJlcXVpcmUoXCJAL2JpdG1ha2UvU291cmNlRmlsZUxpc3QuanNcIik7XG5jb25zdCB7IEluY2x1ZGVEaXJlY3RvcnkgfSA9IHJlcXVpcmUoXCJAL2NvcmUvSW5jbHVkZURpcmVjdG9yeVwiKTtcbmNvbnN0IHsgSW50ZXJmYWNlVGFyZ2V0IH0gPSByZXF1aXJlKFwiQC9iaXRtYWtlL0ludGVyZmFjZVRhcmdldC5qc1wiKTtcbmNvbnN0IHsgSW50ZXJmYWNlSW5jbHVkZXMgfSA9IHJlcXVpcmUoXCIuL0ludGVyZmFjZUluY2x1ZGVzLmpzXCIpO1xuY29uc3QgeyBJbnRlcmZhY2VPYmplY3RzIH0gPSByZXF1aXJlKFwiLi9JbnRlcmZhY2VPYmplY3RzLmpzXCIpO1xuY29uc3QgeyBBYnNvbHV0ZVBhdGggfSA9IHJlcXVpcmUoXCJAL2NvcmUvUGF0aFwiKTtcblxuY29uc3QgTkFNRSAgICAgICAgICAgICAgICA9IFN5bWJvbChcIk5BTUVcIik7XG5jb25zdCBUQVJHRVRfU0NPUEUgICAgICAgID0gU3ltYm9sKFwiVEFSR0VUX1NDT1BFXCIpO1xuY29uc3QgT1VUUFVUX05BTUUgICAgICAgICA9IFN5bWJvbChcIk9VVFBVVF9OQU1FXCIpO1xuY29uc3QgQ09NUElMRV9PUFRJT05TICAgICA9IFN5bWJvbChcIkNPTVBJTEVfT1BUSU9OU1wiKTtcbmNvbnN0IFBSRUZJWCAgICAgICAgICAgICAgPSBTeW1ib2woXCJQUkVGSVhcIik7XG5jb25zdCBTVUZGSVggICAgICAgICAgICAgID0gU3ltYm9sKFwiU1VGRklYXCIpO1xuY29uc3QgTElOS19PUFRJT05TICAgICAgICA9IFN5bWJvbChcIkxJTktfT1BUSU9OU1wiKTtcbmNvbnN0IElOQ0xVREVTICAgICAgICAgICAgPSBTeW1ib2woXCJJTkNMVURFU1wiKTtcbmNvbnN0IERFRklORVMgICAgICAgICAgICAgPSBTeW1ib2woXCJERUZJTkVTXCIpO1xuY29uc3QgU09VUkNFUyAgICAgICAgICAgICA9IFN5bWJvbChcIlNPVVJDRVNcIik7XG5jb25zdCBMSUJSQVJJRVMgICAgICAgICAgID0gU3ltYm9sKFwiTElCUkFSSUVTXCIpO1xuY29uc3QgUE9TSVRJT05fSU5ERVBFTkRFTlRfQ09ERSA9IFN5bWJvbChcIlBPU0lUSU9OX0lOREVQRU5ERU5UX0NPREVcIik7XG5cblxuY29uc3QgcmVzZXJ2ZWRUYWdldE5hbWVzID0gWyBcImFsbFwiLCBcImluc3RhbGxcIiBdO1xuZnVuY3Rpb24gZW5zdXJlVGFyZ2V0TmFtZShuYW1lKSB7XG4gIGlmICh0eXBlb2YgbmFtZSAhPT0gXCJzdHJpbmdcIilcbiAgICB0aHJvdyBuZXcgRXJyb3IoYFRhcmdldCBcIiR7bmFtZX1cIiBpcyBub3Qgc3RyaW5nIHR5cGVgKTtcbiAgaWYgKHJlc2VydmVkVGFnZXROYW1lcy5pbmNsdWRlcyhuYW1lKSlcbiAgICB0aHJvdyBuZXcgRXJyb3IoYFRhcmdldCBcIiR7bmFtZX1cIiBpcyByZXNlcnZlZCBuYW1lYCk7XG4gIHJldHVybiBuYW1lO1xufVxuXG5mdW5jdGlvbiBCYXNlVGFyZ2V0KHNjb3BlLCBuYW1lKSB7XG4gIHRoaXNbTkFNRV0gPSBlbnN1cmVUYXJnZXROYW1lKG5hbWUpO1xuICB0aGlzW1RBUkdFVF9TQ09QRV0gPSBzY29wZS5jbG9uZSgpO1xuICB0aGlzW09VVFBVVF9OQU1FXSA9IGVuc3VyZVN0cmluZyhuYW1lKTtcbiAgdGhpc1tQUkVGSVhdID0gXCJcIjtcbiAgdGhpc1tTVUZGSVhdID0gXCJcIjtcbiAgdGhpc1tDT01QSUxFX09QVElPTlNdID0gW107XG4gIHRoaXNbTElOS19PUFRJT05TXSA9IFtdO1xuICB0aGlzW1NPVVJDRVNdID0gW107XG4gIHRoaXNbTElCUkFSSUVTXSA9IFtdO1xuICB0aGlzW0lOQ0xVREVTXSA9IHNjb3BlLklOQ0xVREVTLm1hcChWQUxVRSA9PiB7IHJldHVybiB7VkFMVUV9IH0pO1xuICB0aGlzW0RFRklORVNdID0gW107XG4gIHRoaXNbUE9TSVRJT05fSU5ERVBFTkRFTlRfQ09ERV0gPSBzY29wZS5QT1NJVElPTl9JTkRFUEVOREVOVF9DT0RFO1xufVxuXG5CYXNlVGFyZ2V0LnByb3RvdHlwZSA9IE9iamVjdC5jcmVhdGUoT2JqZWN0LnByb3RvdHlwZSwge1xuICBjb25zdHJ1Y3Rvcjoge1xuICAgIHZhbHVlOiBCYXNlVGFyZ2V0LFxuICAgIGVudW1lcmFibGU6IGZhbHNlLFxuICB9LFxuICBOQU1FOiB7XG4gICAgZ2V0KCkgeyByZXR1cm4gdGhpc1tOQU1FXTsgfSxcbiAgICBlbnVtZXJhYmxlOiB0cnVlLFxuICB9LFxuICBUQVJHRVRfU0NPUEU6IHtcbiAgICBnZXQoKSB7IHJldHVybiB0aGlzW1RBUkdFVF9TQ09QRV07IH0sXG4gICAgZW51bWVyYWJsZTogZmFsc2UsXG4gIH0sXG4gIE9VVFBVVF9OQU1FOiB7XG4gICAgZ2V0KCkgeyByZXR1cm4gdGhpc1tPVVRQVVRfTkFNRV07IH0sXG4gICAgc2V0KHZhbHVlKSB7IHRoaXNbT1VUUFVUX05BTUVdID0gZW5zdXJlU3RyaW5nKHZhbHVlKTsgfSxcbiAgICBlbnVtZXJhYmxlOiB0cnVlLFxuICB9LFxuICBDT01QSUxFX09QVElPTlM6IHtcbiAgICBnZXQoKSB7IHJldHVybiB0aGlzW0NPTVBJTEVfT1BUSU9OU107IH0sXG4gICAgZW51bWVyYWJsZTogdHJ1ZSxcbiAgfSxcbiAgUFJFRklYOiB7XG4gICAgZ2V0KCkgeyByZXR1cm4gdGhpc1tQUkVGSVhdOyB9LFxuICAgIHNldCh2YWx1ZSkgeyB0aGlzW1BSRUZJWF0gPSB2YWx1ZTsgfSxcbiAgICBlbnVtZXJhYmxlOiB0cnVlLFxuICB9LFxuICBTVUZGSVg6IHtcbiAgICBnZXQoKSB7IHJldHVybiB0aGlzW1NVRkZJWF07IH0sXG4gICAgc2V0KHZhbHVlKSB7IHRoaXNbU1VGRklYXSA9IHZhbHVlOyB9LFxuICAgIGVudW1lcmFibGU6IHRydWUsXG4gIH0sXG4gIExJTktfT1BUSU9OUzoge1xuICAgIGdldCgpIHsgcmV0dXJuIHRoaXNbTElOS19PUFRJT05TXTsgfSxcbiAgICBlbnVtZXJhYmxlOiB0cnVlLFxuICB9LFxuICBJTkNMVURFUzoge1xuICAgIGdldCgpIHsgcmV0dXJuIHRoaXNbSU5DTFVERVNdOyB9LFxuICAgIGVudW1lcmFibGU6IHRydWUsXG4gIH0sXG4gIERFRklORVM6IHtcbiAgICBnZXQoKSB7IHJldHVybiB0aGlzW0RFRklORVNdOyB9LFxuICAgIGVudW1lcmFibGU6IHRydWUsXG4gIH0sXG4gIFNPVVJDRVM6IHtcbiAgICBnZXQoKSB7IHJldHVybiB0aGlzW1NPVVJDRVNdOyB9LFxuICAgIGVudW1lcmFibGU6IHRydWUsXG4gIH0sXG4gIExJQlJBUklFUzoge1xuICAgIGdldCgpIHsgcmV0dXJuIHRoaXNbTElCUkFSSUVTXTsgfSxcbiAgICBlbnVtZXJhYmxlOiB0cnVlLFxuICB9LFxuICBGSUxFX0RJUjoge1xuICAgIGdldCgpIHsgcmV0dXJuIHRoaXNbVEFSR0VUX1NDT1BFXS5CSU5BUllfRElSOyB9LFxuICAgIGVudW1lcmFibGU6IHRydWUsXG4gIH0sXG4gIEZJTEVfTkFNRToge1xuICAgIGdldCgpIHsgcmV0dXJuIHRoaXMuUFJFRklYICsgdGhpcy5PVVRQVVRfTkFNRSArIHRoaXMuU1VGRklYOyB9LFxuICAgIGVudW1lcmFibGU6IHRydWUsXG4gIH0sXG4gIEZJTEU6IHtcbiAgICBnZXQoKSB7IHJldHVybiB0aGlzLkZJTEVfRElSLmpvaW4odGhpcy5GSUxFX05BTUUpOyB9LFxuICAgIGVudW1lcmFibGU6IHRydWUsXG4gIH0sXG4gIFBPU0lUSU9OX0lOREVQRU5ERU5UX0NPREU6IHtcbiAgICBnZXQoKSB7IHJldHVybiB0aGlzW1BPU0lUSU9OX0lOREVQRU5ERU5UX0NPREVdOyB9LFxuICAgIHNldCh2YWx1ZSkgeyB0aGlzW1BPU0lUSU9OX0lOREVQRU5ERU5UX0NPREVdID0gdmFsdWU7IH0sXG4gICAgZW51bWVyYWJsZTogdHJ1ZSxcbiAgfSxcbn0pO1xuXG5CYXNlVGFyZ2V0LnByb3RvdHlwZS5hZGRTb3VyY2VzID0gZnVuY3Rpb24oLi4uc291cmNlcykge1xuICBmb3IgKGxldCBpdCBvZiBzb3VyY2VzLmZsYXQoMSkpIHtcbiAgICBpZiAoaXQgaW5zdGFuY2VvZiBJbnRlcmZhY2VPYmplY3RzIHx8IGl0IGluc3RhbmNlb2YgU291cmNlRmlsZSlcbiAgICAgIC8qICovO1xuICAgIGVsc2UgaWYgKHR5cGVvZiBpdCA9PT0gXCJzdHJpbmdcIiB8fCBBYnNvbHV0ZVBhdGguaXNBYnNvbHV0ZShpdCkpXG4gICAgICBpdCA9IFNvdXJjZUZpbGUuY3JlYXRlKHRoaXNbVEFSR0VUX1NDT1BFXSwgaXQpO1xuICAgIGVsc2VcbiAgICAgIHRocm93IG5ldyBFcnJvcihgTm90IHN1cHBvcnQgaW5zdGFuY2UgJHtpdH1gKTtcblxuICAgIGlmIChpdCBpbnN0YW5jZW9mIFNvdXJjZUZpbGUgJiYgaXQuTEFOR1VBR0UpIHtcbiAgICAgIGNvbnN0IHJmaWxlMSA9IHRoaXNbVEFSR0VUX1NDT1BFXS5CSU5BUllfRElSLnJlbGF0aXZlKGl0LkZJTEUpO1xuICAgICAgY29uc3QgcmZpbGUyID0gdGhpc1tUQVJHRVRfU0NPUEVdLlNPVVJDRV9ESVIucmVsYXRpdmUoaXQuRklMRSk7XG4gICAgICBjb25zdCByZmlsZSA9IChyZmlsZTIubGVuZ3RoIDwgcmZpbGUxLmxlbmd0aCA/IHJmaWxlMiA6IHJmaWxlMSkucmVwbGFjZShcIi4uL1wiLCBcIl9fL1wiKTtcbiAgICAgIGl0Lk9CSkVDVF9GSUxFID0gdGhpc1tUQVJHRVRfU0NPUEVdLkJJTkFSWV9ESVIuam9pbihcIk1ha2VGaWxlc1wiLCB0aGlzW05BTUVdICsgXCIuZGlyXCIsICByZmlsZSArIFwiLm9ialwiKTtcbiAgICB9XG5cbiAgICB0aGlzW1NPVVJDRVNdLnB1c2goaXQpO1xuICB9XG59XG5cbkJhc2VUYXJnZXQucHJvdG90eXBlLmFkZEluY2x1ZGVzID0gZnVuY3Rpb24oLi4uaW5jbHVkZXMpIHtcbiAgZm9yIChjb25zdCBpdCBvZiBpbmNsdWRlcy5mbGF0KDEpKSB7XG4gICAgbGV0IFZBTFVFO1xuICAgIGlmIChpdCBpbnN0YW5jZW9mIEludGVyZmFjZUluY2x1ZGVzKVxuICAgICAgVkFMVUUgPSBpdDtcbiAgICBlbHNlIGlmICh0eXBlb2YgaXQgPT09IFwic3RyaW5nXCIgfHwgQWJzb2x1dGVQYXRoLmlzQWJzb2x1dGUoaXQpKVxuICAgICAgVkFMVUUgPSBJbmNsdWRlRGlyZWN0b3J5LmNyZWF0ZShpdCwgdGhpc1tUQVJHRVRfU0NPUEVdLlNPVVJDRV9ESVIpO1xuICAgIGVsc2VcbiAgICAgIHRocm93IG5ldyBFcnJvcihgTm90IHN1cHBvcnQgaW5zdGFuY2UgJHtpdH1gKTtcbiAgICB0aGlzW0lOQ0xVREVTXS5wdXNoKHtWQUxVRX0pOyAvLyBJbmNsdWRlRGlyZWN0b3J5W11cbiAgfVxufVxuXG5CYXNlVGFyZ2V0LnByb3RvdHlwZS5hZGRMaWJyYXJpZXMgPSBmdW5jdGlvbiguLi5saWJyYXJpZXMpIHtcbiAgZm9yIChjb25zdCBpdCBvZiBsaWJyYXJpZXMuZmxhdCgxKSkge1xuICAgIHRoaXNbTElCUkFSSUVTXS5wdXNoKHsgVkFMVUU6IEludGVyZmFjZVRhcmdldC5lbnN1cmVJbnN0YW5jZShpdCkgfSk7XG4gIH1cbn1cblxuQmFzZVRhcmdldC5wcm90b3R5cGUuYWRkQ29tcGlsZU9wdGlvbnMgPSBmdW5jdGlvbiguLi5vcHRpb25zKSB7XG4gIGZvciAoY29uc3QgaXQgb2Ygb3B0aW9ucy5mbGF0KDEpKSB7XG4gICAgdGhpc1tDT01QSUxFX09QVElPTlNdLnB1c2goeyBWQUxVRTogaXQgfSk7XG4gIH1cbn1cblxuQmFzZVRhcmdldC5wcm90b3R5cGUuYWRkTGlua09wdGlvbnMgPSBmdW5jdGlvbiguLi5vcHRpb25zKSB7XG4gIGZvciAoY29uc3QgaXQgb2Ygb3B0aW9ucy5mbGF0KDEpKSB7XG4gICAgdGhpc1tMSU5LX09QVElPTlNdLnB1c2goeyBWQUxVRTogaXQgfSk7XG4gIH1cbn1cblxuQmFzZVRhcmdldC5wcm90b3R5cGUuZ2V0U291cmNlRmlsZXMgPSBmdW5jdGlvbiguLi5zb3VyY2VzKSB7XG4gIGNvbnN0IHJlc3VsdCA9IFtdO1xuICBmb3IgKGNvbnN0IGl0IG9mIHNvdXJjZXMuZmxhdCgxKSkge1xuICAgIGNvbnN0IGZpbGVuYW1lID0gdGhpc1tUQVJHRVRfU0NPUEVdLlNPVVJDRV9ESVIucmVzb2x2ZShpdCkudG9TdHJpbmcoKTtcbiAgICBjb25zdCBzcmMgPSB0aGlzW1NPVVJDRVNdLmZpbmQoaSA9PiBpIGluc3RhbmNlb2YgU291cmNlRmlsZSAmJiBpLkZJTEUudG9TdHJpbmcoKSA9PT0gZmlsZW5hbWUpO1xuICAgIGlmICghc3JjKVxuICAgICAgdGhyb3cgbmV3IEVycm9yKGBDYW5ub3QgZmluZCBcIiR7aXR9XCJgKTtcbiAgICByZXN1bHQucHVzaChzcmMpO1xuICB9XG5cbiAgaWYgKHJlc3VsdC5sZW5ndGgpXG4gICAgcmV0dXJuIFNvdXJjZUZpbGVMaXN0LmNyZWF0ZSh0aGlzW1RBUkdFVF9TQ09QRV0sIHJlc3VsdCk7XG5cbiAgcmV0dXJuIFNvdXJjZUZpbGVMaXN0LmNyZWF0ZSh0aGlzW1RBUkdFVF9TQ09QRV0sIHRoaXNbU09VUkNFU10uZmlsdGVyKGkgPT4gaSBpbnN0YW5jZW9mIFNvdXJjZUZpbGUpKTtcbn1cblxuQmFzZVRhcmdldC5wcm90b3R5cGUuc2V0UHJlZml4ID0gZnVuY3Rpb24ocHJlZml4KSB7XG4gIHRoaXNbUFJFRklYXSA9IHByZWZpeDtcbn1cblxuQmFzZVRhcmdldC5wcm90b3R5cGUuc2V0U3VmZml4ID0gZnVuY3Rpb24oc3VmZml4KSB7XG4gIHRoaXNbU1VGRklYXSA9IHN1ZmZpeDtcbn1cblxuQmFzZVRhcmdldC5wcm90b3R5cGUuc2V0T3V0cHV0TmFtZSA9IGZ1bmN0aW9uKG91dHB1dE5hbWUpIHtcbiAgdGhpc1tPVVRQVVRfTkFNRV0gPSBvdXRwdXROYW1lO1xufVxuXG5CYXNlVGFyZ2V0LnByb3RvdHlwZS5hZGREZWZpbml0aW9ucyA9IGZ1bmN0aW9uKC4uLmRlZmluaXRpb25zKSB7XG4gIGZvciAoY29uc3QgVkFMVUUgb2YgZGVmaW5pdGlvbnMuZmxhdCgxKSlcbiAgICB0aGlzW0RFRklORVNdLnB1c2goeyBWQUxVRSB9KTtcbn1cblxuQmFzZVRhcmdldC5wcm90b3R5cGUudG9KU09OID0gZnVuY3Rpb24oKSB7XG4gIGNvbnN0IGpzb24gPSB7fTtcbiAgZm9yIChjb25zdCBrZXkgaW4gdGhpcylcbiAgICBqc29uW2tleV0gPSB0aGlzW2tleV07XG4gIHJldHVybiBqc29uO1xufVxuXG5mdW5jdGlvbiBCYXNlTGlicmFyeShzY29wZSwgbmFtZSkge1xuICBCYXNlVGFyZ2V0LmNhbGwodGhpcywgc2NvcGUsIG5hbWUpO1xufVxuXG5CYXNlTGlicmFyeS5wcm90b3R5cGUgPSBPYmplY3QuY3JlYXRlKEJhc2VUYXJnZXQucHJvdG90eXBlLCB7XG4gIGNvbnN0cnVjdG9yOiB7XG4gICAgdmFsdWU6IEJhc2VMaWJyYXJ5LFxuICAgIGVudW1lcmFibGU6IGZhbHNlLFxuICAgIHdyaXRhYmxlOiB0cnVlLFxuICAgIGNvbmZpZ3VyYWJsZTogdHJ1ZSxcbiAgfSxcbn0pO1xuXG5CYXNlTGlicmFyeS5wcm90b3R5cGUuYWRkUHVibGljSW5jbHVkZXMgPSBmdW5jdGlvbiguLi5pbmNsdWRlcykge1xuICBmb3IgKGNvbnN0IGl0IG9mIGluY2x1ZGVzLmZsYXQoMSkpIHtcbiAgICBsZXQgVkFMVUU7XG4gICAgaWYgKGl0IGluc3RhbmNlb2YgSW50ZXJmYWNlSW5jbHVkZXMpXG4gICAgICBWQUxVRSA9IGl0O1xuICAgIGVsc2UgaWYgKHR5cGVvZiBpdCA9PT0gXCJzdHJpbmdcIiB8fCBBYnNvbHV0ZVBhdGguaXNBYnNvbHV0ZShpdCkpXG4gICAgICBWQUxVRSA9IEluY2x1ZGVEaXJlY3RvcnkuY3JlYXRlKGl0LCB0aGlzW1RBUkdFVF9TQ09QRV0uU09VUkNFX0RJUik7XG4gICAgZWxzZVxuICAgICAgdGhyb3cgbmV3IEVycm9yKGBOb3Qgc3VwcG9ydCBpbnN0YW5jZSAke2l0fWApO1xuICAgIHRoaXNbSU5DTFVERVNdLnB1c2goe1ZBTFVFLCBQVUJMSUNfT05MWTogdHJ1ZX0pOyAvLyBJbmNsdWRlRGlyZWN0b3J5W11cbiAgfVxufVxuXG5CYXNlTGlicmFyeS5wcm90b3R5cGUuYWRkUHVibGljRGVmaW5pdGlvbnMgPSBmdW5jdGlvbiguLi5kZWZpbml0aW9ucykge1xuICBmb3IgKGNvbnN0IFZBTFVFIG9mIGRlZmluaXRpb25zLmZsYXQoMSkpXG4gICAgdGhpc1tERUZJTkVTXS5wdXNoKHsgVkFMVUUsIFBVQkxJQ19PTkxZOiB0cnVlIH0pO1xufVxuXG5CYXNlTGlicmFyeS5wcm90b3R5cGUuYWRkUHVibGljTGlicmFyaWVzID0gZnVuY3Rpb24oLi4ubGlicmFyaWVzKSB7XG4gIGZvciAoY29uc3QgaXQgb2YgbGlicmFyaWVzLmZsYXQoMSkpIHtcbiAgICB0aGlzW0xJQlJBUklFU10ucHVzaCh7VkFMVUU6IEludGVyZmFjZVRhcmdldC5lbnN1cmVJbnN0YW5jZShpdCksIFBVQkxJQ19PTkxZOiB0cnVlfSk7XG4gIH1cbn1cblxuQmFzZUxpYnJhcnkucHJvdG90eXBlLmFkZFB1YmxpY0NvbXBpbGVPcHRpb25zID0gZnVuY3Rpb24oLi4ub3B0aW9ucykge1xuICBmb3IgKGNvbnN0IGl0IG9mIG9wdGlvbnMuZmxhdCgxKSkge1xuICAgIHRoaXNbQ09NUElMRV9PUFRJT05TXS5wdXNoKHsgVkFMVUU6IGl0LCBQVUJMSUNfT05MWTogdHJ1ZSB9KTtcbiAgfVxufVxuXG5CYXNlTGlicmFyeS5wcm90b3R5cGUuYWRkUHVibGljTGlua09wdGlvbnMgPSBmdW5jdGlvbiguLi5vcHRpb25zKSB7XG4gIGZvciAoY29uc3QgaXQgb2Ygb3B0aW9ucy5mbGF0KDEpKSB7XG4gICAgdGhpc1tMSU5LX09QVElPTlNdLnB1c2goeyBWQUxVRTogaXQsIFBVQkxJQ19PTkxZOiB0cnVlIH0pO1xuICB9XG59XG5cbmZ1bmN0aW9uIE9iamVjdExpYnJhcnkoc2NvcGUsIG5hbWUpIHtcbiAgQmFzZUxpYnJhcnkuY2FsbCh0aGlzLCBzY29wZSwgbmFtZSk7XG4gIHRoaXMuUFJFRklYID0gc2NvcGUuT0JKRUNUX0xJQlJBUllfUFJFRklYO1xuICB0aGlzLlNVRkZJWCA9IHNjb3BlLk9CSkVDVF9MSUJSQVJZX1NVRkZJWDtcbiAgdGhpcy5MSU5LX09QVElPTlMucHVzaCguLi5zY29wZS5PQkpFQ1RfTElOS0VSX0ZMQUdTLm1hcChWQUxVRSA9PiB7IHJldHVybiB7IFZBTFVFIH0gfSkpO1xufVxuXG5PYmplY3RMaWJyYXJ5LnByb3RvdHlwZSA9IE9iamVjdC5jcmVhdGUoQmFzZUxpYnJhcnkucHJvdG90eXBlLCB7XG4gIGNvbnN0cnVjdG9yOiB7XG4gICAgdmFsdWU6IE9iamVjdExpYnJhcnksXG4gICAgZW51bWVyYWJsZTogZmFsc2UsXG4gICAgd3JpdGFibGU6IHRydWUsXG4gICAgY29uZmlndXJhYmxlOiB0cnVlLFxuICB9LFxufSk7XG5cbk9iamVjdExpYnJhcnkuY3JlYXRlID0gKHNjb3BlLCBuYW1lKSA9PiB7XG4gIHJldHVybiBPYmplY3Quc2VhbChuZXcgT2JqZWN0TGlicmFyeShzY29wZSwgbmFtZSkpO1xufVxuXG5mdW5jdGlvbiBTdGF0aWNMaWJyYXJ5KHNjb3BlLCBuYW1lKSB7XG4gIEJhc2VMaWJyYXJ5LmNhbGwodGhpcywgc2NvcGUsIG5hbWUpO1xuICB0aGlzLlBSRUZJWCA9IHNjb3BlLlNUQVRJQ19MSUJSQVJZX1BSRUZJWDtcbiAgdGhpcy5TVUZGSVggPSBzY29wZS5TVEFUSUNfTElCUkFSWV9TVUZGSVg7XG4gIHRoaXMuTElOS19PUFRJT05TLnB1c2goLi4uc2NvcGUuU1RBVElDX0xJTktFUl9GTEFHUy5tYXAoVkFMVUUgPT4geyByZXR1cm4geyBWQUxVRSB9IH0pKTtcbn1cblxuU3RhdGljTGlicmFyeS5wcm90b3R5cGUgPSBPYmplY3QuY3JlYXRlKEJhc2VMaWJyYXJ5LnByb3RvdHlwZSwge1xuICBjb25zdHJ1Y3Rvcjoge1xuICAgIHZhbHVlOiBTdGF0aWNMaWJyYXJ5LFxuICAgIGVudW1lcmFibGU6IGZhbHNlLFxuICAgIHdyaXRhYmxlOiB0cnVlLFxuICAgIGNvbmZpZ3VyYWJsZTogdHJ1ZSxcbiAgfSxcbn0pO1xuXG5TdGF0aWNMaWJyYXJ5LmNyZWF0ZSA9IChzY29wZSwgbmFtZSkgPT4ge1xuICByZXR1cm4gT2JqZWN0LnNlYWwobmV3IFN0YXRpY0xpYnJhcnkoc2NvcGUsIG5hbWUpKTtcbn1cblxuZnVuY3Rpb24gU2hhcmVkTGlicmFyeShzY29wZSwgbmFtZSkge1xuICBCYXNlTGlicmFyeS5jYWxsKHRoaXMsIHNjb3BlLCBuYW1lKTtcbiAgdGhpcy5QUkVGSVggPSBzY29wZS5TSEFSRURfTElCUkFSWV9QUkVGSVg7XG4gIHRoaXMuU1VGRklYID0gc2NvcGUuU0hBUkVEX0xJQlJBUllfU1VGRklYO1xuICB0aGlzLkxJTktfT1BUSU9OUy5wdXNoKC4uLnNjb3BlLlNIQVJFRF9MSU5LRVJfRkxBR1MubWFwKFZBTFVFID0+IHsgcmV0dXJuIHsgVkFMVUUgfSB9KSk7XG59XG5cblNoYXJlZExpYnJhcnkucHJvdG90eXBlID0gT2JqZWN0LmNyZWF0ZShCYXNlTGlicmFyeS5wcm90b3R5cGUsIHtcbiAgY29uc3RydWN0b3I6IHtcbiAgICB2YWx1ZTogU2hhcmVkTGlicmFyeSxcbiAgICBlbnVtZXJhYmxlOiBmYWxzZSxcbiAgICB3cml0YWJsZTogdHJ1ZSxcbiAgICBjb25maWd1cmFibGU6IHRydWUsXG4gIH0sXG59KTtcblxuU2hhcmVkTGlicmFyeS5jcmVhdGUgPSAoc2NvcGUsIG5hbWUpID0+IHtcbiAgcmV0dXJuIE9iamVjdC5zZWFsKG5ldyBTaGFyZWRMaWJyYXJ5KHNjb3BlLCBuYW1lKSk7XG59XG5cbmZ1bmN0aW9uIEV4ZWN1dGFibGUoc2NvcGUsIG5hbWUpIHtcbiAgQmFzZVRhcmdldC5jYWxsKHRoaXMsIHNjb3BlLCBuYW1lKTtcbiAgdGhpcy5TVUZGSVggPSBzY29wZS5FWEVDVVRBQkxFX1NVRkZJWDtcbiAgdGhpcy5MSU5LX09QVElPTlMucHVzaCguLi5zY29wZS5FWEVfTElOS0VSX0ZMQUdTLm1hcChWQUxVRSA9PiB7IHJldHVybiB7IFZBTFVFIH0gfSkpO1xufVxuXG5FeGVjdXRhYmxlLnByb3RvdHlwZSA9IE9iamVjdC5jcmVhdGUoQmFzZVRhcmdldC5wcm90b3R5cGUsIHtcbiAgY29uc3RydWN0b3I6IHtcbiAgICB2YWx1ZTogRXhlY3V0YWJsZSxcbiAgICBlbnVtZXJhYmxlOiBmYWxzZSxcbiAgICB3cml0YWJsZTogdHJ1ZSxcbiAgICBjb25maWd1cmFibGU6IHRydWUsXG4gIH0sXG59KTtcblxuRXhlY3V0YWJsZS5jcmVhdGUgPSAoc2NvcGUsIG5hbWUpID0+IHtcbiAgcmV0dXJuIE9iamVjdC5zZWFsKG5ldyBFeGVjdXRhYmxlKHNjb3BlLCBuYW1lKSk7XG59XG5cbm1vZHVsZS5leHBvcnRzID0ge1xuICBCYXNlVGFyZ2V0LFxuICBCYXNlTGlicmFyeSxcbiAgT2JqZWN0TGlicmFyeSxcbiAgU3RhdGljTGlicmFyeSxcbiAgU2hhcmVkTGlicmFyeSxcbiAgRXhlY3V0YWJsZSxcbn07XG4iLCJcInVzZSBzdHJpY3RcIjtcblxuY29uc3QgeyBJbmNsdWRlRGlyZWN0b3J5IH0gPSByZXF1aXJlKFwiQC9jb3JlL0luY2x1ZGVEaXJlY3RvcnlcIik7XG5jb25zdCB7IEludGVyZmFjZUluY2x1ZGVzIH0gPSByZXF1aXJlKFwiLi9JbnRlcmZhY2VJbmNsdWRlcy5qc1wiKTtcbmNvbnN0IHsgSW50ZXJmYWNlVGFyZ2V0IH0gPSByZXF1aXJlKFwiLi9JbnRlcmZhY2VUYXJnZXQuanNcIik7XG5cbmNvbnN0IEVOVFJJRVMgPSBTeW1ib2woXCJFTlRSSUVTXCIpO1xuXG5mdW5jdGlvbiBUYXJnZXRDb2xsZWN0aW9uKCkge1xuICB0aGlzW0VOVFJJRVNdID0ge307XG59XG5cblRhcmdldENvbGxlY3Rpb24ucHJvdG90eXBlID0gT2JqZWN0LmNyZWF0ZShPYmplY3QucHJvdG90eXBlLCB7XG4gIGNvbnN0cnVjdG9yOiB7XG4gICAgdmFsdWU6IFRhcmdldENvbGxlY3Rpb24sXG4gICAgZW51bWVyYWJsZTogZmFsc2UsXG4gICAgd3JpdGFibGU6IHRydWUsXG4gICAgY29uZmlndXJhYmxlOiB0cnVlLFxuICB9LFxuICBFTlRSSUVTOiB7XG4gICAgZ2V0KCkgeyByZXR1cm4gdGhpc1tFTlRSSUVTXTsgfSxcbiAgICBlbnVtZXJhYmxlOiB0cnVlLFxuICB9LFxufSk7XG5cblRhcmdldENvbGxlY3Rpb24uY3JlYXRlID0gKCkgPT4ge1xuICByZXR1cm4gT2JqZWN0LnNlYWwobmV3IFRhcmdldENvbGxlY3Rpb24oKSk7XG59XG5cblRhcmdldENvbGxlY3Rpb24ucHJvdG90eXBlLnRvSlNPTiA9IGZ1bmN0aW9uKCkge1xuICByZXR1cm4gdGhpc1tFTlRSSUVTXTtcbn1cblxuVGFyZ2V0Q29sbGVjdGlvbi5wcm90b3R5cGUuZ2V0ID0gZnVuY3Rpb24obmFtZSkge1xuICByZXR1cm4gdGhpc1tFTlRSSUVTXVtuYW1lXTtcbn1cblxuVGFyZ2V0Q29sbGVjdGlvbi5wcm90b3R5cGUuc2V0ID0gZnVuY3Rpb24obmFtZSwgdGFyZ2V0KSB7XG4gIGlmICh0aGlzW0VOVFJJRVNdW25hbWVdKVxuICAgIHRocm93IG5ldyBFcnJvcihgVGFyZ2V0IFwiJHtuYW1lfVwiIGV4aXN0c2ApO1xuICB0aGlzW0VOVFJJRVNdW25hbWVdID0gdGFyZ2V0O1xufVxuXG5mdW5jdGlvbiBnZXRIZWFkZXJzKHRhcmdldCkge1xuICByZXR1cm4gdGFyZ2V0LlNPVVJDRVMuZmlsdGVyKGkgPT4gaS5IRUFERVJfRklMRV9PTkxZKTtcbn1cblxuZnVuY3Rpb24gZ2V0SW5jbHVkZXModGFyZ2V0KSB7XG4gIHJldHVybiB0YXJnZXQuSU5DTFVERVMubWFwKGkgPT4gaS5WQUxVRSk7XG59XG5cbmZ1bmN0aW9uIGdldFB1YmxpY0luY2x1ZGVzKHRhcmdldCkge1xuICByZXR1cm4gdGFyZ2V0LklOQ0xVREVTLmZpbHRlcihpID0+IGkuUFVCTElDX09OTFkpLm1hcChpID0+IGkuVkFMVUUpO1xufVxuXG5mdW5jdGlvbiBnZXRMaWJyYXJpZXModGFyZ2V0KSB7XG4gIHJldHVybiB0YXJnZXQuTElCUkFSSUVTLm1hcChpID0+IGkuVkFMVUUpO1xufVxuXG5mdW5jdGlvbiBnZXRQdWJsaWNMaWJyYXJpZXModGFyZ2V0KSB7XG4gIHJldHVybiB0YXJnZXQuTElCUkFSSUVTLmZpbHRlcihpID0+IGkuUFVCTElDX09OTFkpLm1hcChpID0+IGkuVkFMVUUpO1xufVxuXG5mdW5jdGlvbiBnZXREZWZpbml0aW9ucyh0YXJnZXQpIHtcbiAgcmV0dXJuIHRhcmdldC5ERUZJTkVTLm1hcChpID0+IGkuVkFMVUUpO1xufVxuXG5mdW5jdGlvbiBnZXRQdWJsaWNEZWZpbml0aW9ucyh0YXJnZXQpIHtcbiAgcmV0dXJuIHRhcmdldC5ERUZJTkVTLmZpbHRlcihpID0+IGkuUFVCTElDX09OTFkpLm1hcChpID0+IGkuVkFMVUUpO1xufVxuXG5mdW5jdGlvbiBnZXRDb21waWxlT3B0aW9ucyh0YXJnZXQpIHtcbiAgcmV0dXJuIHRhcmdldC5DT01QSUxFX09QVElPTlMubWFwKGkgPT4gaS5WQUxVRSk7XG59XG5cbmZ1bmN0aW9uIGdldFB1YmxpY0NvbXBpbGVPcHRpb25zKHRhcmdldCkge1xuICByZXR1cm4gdGFyZ2V0LkNPTVBJTEVfT1BUSU9OUy5maWx0ZXIoaSA9PiBpLlBVQkxJQ19PTkxZKS5tYXAoaSA9PiBpLlZBTFVFKTtcbn1cblxuZnVuY3Rpb24gZ2V0TGlua09wdGlvbnModGFyZ2V0KSB7XG4gIHJldHVybiB0YXJnZXQuTElOS19PUFRJT05TLm1hcChpID0+IGkuVkFMVUUpO1xufVxuXG5mdW5jdGlvbiBnZXRQdWJsaWNMaW5rT3B0aW9ucyh0YXJnZXQpIHtcbiAgcmV0dXJuIHRhcmdldC5MSU5LX09QVElPTlMuZmlsdGVyKGkgPT4gaS5QVUJMSUNfT05MWSkubWFwKGkgPT4gaS5WQUxVRSk7XG59XG5cblRhcmdldENvbGxlY3Rpb24ucHJvdG90eXBlLl9fZ2V0QWxsSW5jbHVkZXMgPSBmdW5jdGlvbihpbmNsdWRlcywgdGFyZ2V0U2V0LCBsaXN0KSB7XG4gIGZvciAoY29uc3QgaXRlciBvZiBsaXN0KSB7XG4gICAgaWYgKGl0ZXIgaW5zdGFuY2VvZiBJbnRlcmZhY2VJbmNsdWRlcyB8fCBpdGVyIGluc3RhbmNlb2YgSW50ZXJmYWNlVGFyZ2V0KSB7XG4gICAgICBpZiAoIXRhcmdldFNldC5oYXMoaXRlci50YXJnZXROYW1lKSkge1xuICAgICAgICB0YXJnZXRTZXQuYWRkKGl0ZXIudGFyZ2V0TmFtZSk7XG4gICAgICAgIGNvbnN0IHRhcmdldCA9IHRoaXMuZ2V0KGl0ZXIudGFyZ2V0TmFtZSk7XG4gICAgICAgIHRoaXMuX19nZXRBbGxJbmNsdWRlcyhpbmNsdWRlcywgdGFyZ2V0U2V0LCBnZXRQdWJsaWNJbmNsdWRlcyh0YXJnZXQpKTtcbiAgICAgICAgdGhpcy5fX2dldEFsbEluY2x1ZGVzKGluY2x1ZGVzLCB0YXJnZXRTZXQsIGdldFB1YmxpY0xpYnJhcmllcyh0YXJnZXQpKTtcbiAgICAgIH1cbiAgICB9XG4gICAgZWxzZSBpZiAoaXRlciBpbnN0YW5jZW9mIEluY2x1ZGVEaXJlY3RvcnkpIHtcbiAgICAgIGlmICghaW5jbHVkZXMuaW5jbHVkZXMoaXRlci50b1N0cmluZygpKSlcbiAgICAgICAgaW5jbHVkZXMucHVzaChpdGVyLnRvU3RyaW5nKCkpO1xuICAgIH1cbiAgICBlbHNlIHtcbiAgICAgIHRocm93IG5ldyBFcnJvcihgTm90IHN1cHBvcnQgaW5zdGFuY2UgJHtpdGVyfWApO1xuICAgIH1cbiAgfVxufVxuXG5UYXJnZXRDb2xsZWN0aW9uLnByb3RvdHlwZS5hbGxJbmNsdWRlc09mID0gZnVuY3Rpb24ocGFyYW1zKSB7XG4gIGNvbnN0IHRhcmdldCA9ICh0eXBlb2YgcGFyYW1zID09PSBcInN0cmluZ1wiKSA/IHRoaXMuZ2V0KHBhcmFtcykgOiBwYXJhbXM7XG4gIGNvbnN0IGluY2x1ZGVzID0gW107XG4gIGNvbnN0IHRhcmdldFNldCA9IG5ldyBTZXQoWyB0YXJnZXQuTkFNRSBdKTtcbiAgdGhpcy5fX2dldEFsbEluY2x1ZGVzKGluY2x1ZGVzLCB0YXJnZXRTZXQsIGdldEluY2x1ZGVzKHRhcmdldCkpO1xuICB0aGlzLl9fZ2V0QWxsSW5jbHVkZXMoaW5jbHVkZXMsIHRhcmdldFNldCwgZ2V0TGlicmFyaWVzKHRhcmdldCkpO1xuICByZXR1cm4gaW5jbHVkZXM7XG59XG5cblRhcmdldENvbGxlY3Rpb24ucHJvdG90eXBlLl9fZ2V0QWxsSGVhZGVycyA9IGZ1bmN0aW9uKGhlYWRlcnMsIHRhcmdldFNldCwgbGlzdCkge1xuICBmb3IgKGNvbnN0IGl0ZXIgb2YgbGlzdCkge1xuICAgIGlmIChpdGVyIGluc3RhbmNlb2YgSW50ZXJmYWNlSW5jbHVkZXMgfHwgaXRlciBpbnN0YW5jZW9mIEludGVyZmFjZVRhcmdldCkge1xuICAgICAgaWYgKCF0YXJnZXRTZXQuaGFzKGl0ZXIudGFyZ2V0TmFtZSkpIHtcbiAgICAgICAgdGFyZ2V0U2V0LmFkZChpdGVyLnRhcmdldE5hbWUpO1xuICAgICAgICBjb25zdCB0YXJnZXQgPSB0aGlzLmdldChpdGVyLnRhcmdldE5hbWUpO1xuICAgICAgICBmb3IgKGNvbnN0IGhlYWRlciBvZiBnZXRIZWFkZXJzKHRhcmdldCkubWFwKGkgPT4gaS5GSUxFLnRvU3RyaW5nKCkpKSB7XG4gICAgICAgICAgaWYgKCFoZWFkZXJzLmluY2x1ZGVzKGhlYWRlci50b1N0cmluZygpKSlcbiAgICAgICAgICAgIGhlYWRlcnMucHVzaChoZWFkZXIudG9TdHJpbmcoKSk7XG4gICAgICAgIH1cbiAgICAgICAgdGhpcy5fX2dldEFsbEhlYWRlcnMoaGVhZGVycywgdGFyZ2V0U2V0LCBnZXRQdWJsaWNJbmNsdWRlcyh0YXJnZXQpKTtcbiAgICAgICAgdGhpcy5fX2dldEFsbEhlYWRlcnMoaGVhZGVycywgdGFyZ2V0U2V0LCBnZXRQdWJsaWNMaWJyYXJpZXModGFyZ2V0KSk7XG4gICAgICB9XG4gICAgfVxuICB9XG59XG5cblRhcmdldENvbGxlY3Rpb24ucHJvdG90eXBlLmFsbEhlYWRlcnNPZiA9IGZ1bmN0aW9uKHBhcmFtcykge1xuICBjb25zdCB0YXJnZXQgPSAodHlwZW9mIHBhcmFtcyA9PT0gXCJzdHJpbmdcIikgPyB0aGlzLmdldChwYXJhbXMpIDogcGFyYW1zO1xuICBjb25zdCBoZWFkZXJzID0gZ2V0SGVhZGVycyh0YXJnZXQpLm1hcChpID0+IGkuRklMRS50b1N0cmluZygpKTtcbiAgY29uc3QgdGFyZ2V0U2V0ID0gbmV3IFNldChbIHRhcmdldC5OQU1FIF0pO1xuICB0aGlzLl9fZ2V0QWxsSGVhZGVycyhoZWFkZXJzLCB0YXJnZXRTZXQsIGdldEluY2x1ZGVzKHRhcmdldCkpO1xuICB0aGlzLl9fZ2V0QWxsSGVhZGVycyhoZWFkZXJzLCB0YXJnZXRTZXQsIGdldExpYnJhcmllcyh0YXJnZXQpKTtcbiAgcmV0dXJuIGhlYWRlcnM7XG59XG5cblRhcmdldENvbGxlY3Rpb24ucHJvdG90eXBlLl9fZ2V0QWxsTGlicmFyaWVzID0gZnVuY3Rpb24obGlicmFyaWVzLCB0YXJnZXRTZXQsIGxpc3QpIHtcbiAgZm9yIChjb25zdCBpdGVyIG9mIGxpc3QpIHtcbiAgICBjb25zb2xlLmFzc2VydChpdGVyIGluc3RhbmNlb2YgSW50ZXJmYWNlVGFyZ2V0KTtcbiAgICBpZiAoIXRhcmdldFNldC5oYXMoaXRlci50YXJnZXROYW1lKSkge1xuICAgICAgdGFyZ2V0U2V0LmFkZChpdGVyLnRhcmdldE5hbWUpO1xuICAgICAgY29uc3QgdGFyZ2V0ID0gdGhpcy5nZXQoaXRlci50YXJnZXROYW1lKTtcbiAgICAgIGxpYnJhcmllcy5wdXNoKHRhcmdldC5GSUxFLnRvU3RyaW5nKCkpO1xuICAgICAgdGhpcy5fX2dldEFsbExpYnJhcmllcyhsaWJyYXJpZXMsIHRhcmdldFNldCwgZ2V0UHVibGljTGlicmFyaWVzKHRhcmdldCkpO1xuICAgIH1cbiAgfVxufVxuXG5UYXJnZXRDb2xsZWN0aW9uLnByb3RvdHlwZS5hbGxMaWJyYXJpZXNPZiA9IGZ1bmN0aW9uKHBhcmFtcykge1xuICBjb25zdCB0YXJnZXQgPSAodHlwZW9mIHBhcmFtcyA9PT0gXCJzdHJpbmdcIikgPyB0aGlzLmdldChwYXJhbXMpIDogcGFyYW1zO1xuICBjb25zdCBsaWJyYXJpZXMgPSBbXTtcbiAgY29uc3QgdGFyZ2V0U2V0ID0gbmV3IFNldChbIHRhcmdldC5OQU1FIF0pO1xuICB0aGlzLl9fZ2V0QWxsTGlicmFyaWVzKGxpYnJhcmllcywgdGFyZ2V0U2V0LCBnZXRMaWJyYXJpZXModGFyZ2V0KSk7XG4gIHJldHVybiBsaWJyYXJpZXM7XG59XG5cblRhcmdldENvbGxlY3Rpb24ucHJvdG90eXBlLl9fZ2V0QWxsRGVmaW5pdGlvbnMgPSBmdW5jdGlvbihkZWZpbml0aW9ucywgdGFyZ2V0U2V0LCBsaXN0KSB7XG4gIGZvciAoY29uc3QgaXRlciBvZiBsaXN0KSB7XG4gICAgaWYgKGl0ZXIgaW5zdGFuY2VvZiBJbnRlcmZhY2VUYXJnZXQpIHtcbiAgICAgIGlmICghdGFyZ2V0U2V0LmhhcyhpdGVyLnRhcmdldE5hbWUpKSB7XG4gICAgICAgIHRhcmdldFNldC5hZGQoaXRlci50YXJnZXROYW1lKTtcbiAgICAgICAgY29uc3QgdGFyZ2V0ID0gdGhpcy5nZXQoaXRlci50YXJnZXROYW1lKTtcbiAgICAgICAgdGhpcy5fX2dldEFsbERlZmluaXRpb25zKGRlZmluaXRpb25zLCB0YXJnZXRTZXQsIGdldFB1YmxpY0RlZmluaXRpb25zKHRhcmdldCkpO1xuICAgICAgICB0aGlzLl9fZ2V0QWxsRGVmaW5pdGlvbnMoZGVmaW5pdGlvbnMsIHRhcmdldFNldCwgZ2V0UHVibGljTGlicmFyaWVzKHRhcmdldCkpO1xuICAgICAgfVxuICAgIH1cbiAgICBlbHNlIGlmICh0eXBlb2YgaXRlciA9PT0gXCJzdHJpbmdcIikge1xuICAgICAgaWYgKCFkZWZpbml0aW9ucy5pbmNsdWRlcyhpdGVyKSlcbiAgICAgICAgZGVmaW5pdGlvbnMucHVzaChpdGVyKTtcbiAgICB9XG4gICAgZWxzZSB7XG4gICAgICB0aHJvdyBuZXcgRXJyb3IoYE5vdCBzdXBwb3J0IGluc3RhbmNlICR7aXRlcn1gKTtcbiAgICB9XG4gIH1cbn1cblxuVGFyZ2V0Q29sbGVjdGlvbi5wcm90b3R5cGUuYWxsRGVmaW5pdGlvbnNPZiA9IGZ1bmN0aW9uKHBhcmFtcykge1xuICBjb25zdCB0YXJnZXQgPSAodHlwZW9mIHBhcmFtcyA9PT0gXCJzdHJpbmdcIikgPyB0aGlzLmdldChwYXJhbXMpIDogcGFyYW1zO1xuICBjb25zdCBkZWZpbml0aW9ucyA9IFtdO1xuICBjb25zdCB0YXJnZXRTZXQgPSBuZXcgU2V0KFsgdGFyZ2V0Lk5BTUUgXSk7XG4gIHRoaXMuX19nZXRBbGxEZWZpbml0aW9ucyhkZWZpbml0aW9ucywgdGFyZ2V0U2V0LCBnZXREZWZpbml0aW9ucyh0YXJnZXQpKTtcbiAgdGhpcy5fX2dldEFsbERlZmluaXRpb25zKGRlZmluaXRpb25zLCB0YXJnZXRTZXQsIGdldFB1YmxpY0xpYnJhcmllcyh0YXJnZXQpKTtcbiAgcmV0dXJuIGRlZmluaXRpb25zO1xufVxuXG5UYXJnZXRDb2xsZWN0aW9uLnByb3RvdHlwZS5fX2dldEFsbENvbXBpbGVPcHRpb25zID0gZnVuY3Rpb24ob3B0aW9ucywgdGFyZ2V0U2V0LCBsaXN0KSB7XG4gIGZvciAoY29uc3QgaXRlciBvZiBsaXN0KSB7XG4gICAgaWYgKGl0ZXIgaW5zdGFuY2VvZiBJbnRlcmZhY2VUYXJnZXQpIHtcbiAgICAgIGlmICghdGFyZ2V0U2V0LmhhcyhpdGVyLnRhcmdldE5hbWUpKSB7XG4gICAgICAgIHRhcmdldFNldC5hZGQoaXRlci50YXJnZXROYW1lKTtcbiAgICAgICAgY29uc3QgdGFyZ2V0ID0gdGhpcy5nZXQoaXRlci50YXJnZXROYW1lKTtcbiAgICAgICAgdGhpcy5fX2dldEFsbENvbXBpbGVPcHRpb25zKG9wdGlvbnMsIHRhcmdldFNldCwgZ2V0UHVibGljQ29tcGlsZU9wdGlvbnModGFyZ2V0KSk7XG4gICAgICAgIHRoaXMuX19nZXRBbGxDb21waWxlT3B0aW9ucyhvcHRpb25zLCB0YXJnZXRTZXQsIGdldFB1YmxpY0xpYnJhcmllcyh0YXJnZXQpKTtcbiAgICAgIH1cbiAgICB9XG4gICAgZWxzZSBpZiAodHlwZW9mIGl0ZXIgPT09IFwic3RyaW5nXCIpIHtcbiAgICAgIGlmICghb3B0aW9ucy5pbmNsdWRlcyhpdGVyKSlcbiAgICAgICAgb3B0aW9ucy5wdXNoKGl0ZXIpO1xuICAgIH1cbiAgICBlbHNlIGlmIChBcnJheS5pc0FycmF5KGl0ZXIpKSB7XG4gICAgICAvLyBUT0RPOiBBZGQgY29tcGFyZSBmb3Igc2FtZSBhcnJheSBpbiBvcHRpb25zXG4gICAgICBvcHRpb25zLnB1c2goaXRlcik7XG4gICAgfVxuICAgIGVsc2Uge1xuICAgICAgdGhyb3cgbmV3IEVycm9yKGBOb3Qgc3VwcG9ydCBpbnN0YW5jZSAke2l0ZXJ9YCk7XG4gICAgfVxuICB9XG59XG5cblRhcmdldENvbGxlY3Rpb24ucHJvdG90eXBlLmFsbENvbXBpbGVPcHRpb25zT2YgPSBmdW5jdGlvbihwYXJhbXMpIHtcbiAgY29uc3QgdGFyZ2V0ID0gKHR5cGVvZiBwYXJhbXMgPT09IFwic3RyaW5nXCIpID8gdGhpcy5nZXQocGFyYW1zKSA6IHBhcmFtcztcbiAgY29uc3Qgb3B0aW9ucyA9IFtdO1xuICBjb25zdCB0YXJnZXRTZXQgPSBuZXcgU2V0KFsgdGFyZ2V0Lk5BTUUgXSk7XG4gIHRoaXMuX19nZXRBbGxDb21waWxlT3B0aW9ucyhvcHRpb25zLCB0YXJnZXRTZXQsIGdldENvbXBpbGVPcHRpb25zKHRhcmdldCkpO1xuICB0aGlzLl9fZ2V0QWxsQ29tcGlsZU9wdGlvbnMob3B0aW9ucywgdGFyZ2V0U2V0LCBnZXRQdWJsaWNMaWJyYXJpZXModGFyZ2V0KSk7XG4gIHJldHVybiBvcHRpb25zLmZsYXQoKTtcbn1cblxuVGFyZ2V0Q29sbGVjdGlvbi5wcm90b3R5cGUuX19nZXRMaW5rT3B0aW9ucyA9IGZ1bmN0aW9uKG9wdGlvbnMsIHRhcmdldFNldCwgbGlzdCkge1xuICBmb3IgKGNvbnN0IGl0ZXIgb2YgbGlzdCkge1xuICAgIGlmIChpdGVyIGluc3RhbmNlb2YgSW50ZXJmYWNlVGFyZ2V0KSB7XG4gICAgICBpZiAoIXRhcmdldFNldC5oYXMoaXRlci50YXJnZXROYW1lKSkge1xuICAgICAgICB0YXJnZXRTZXQuYWRkKGl0ZXIudGFyZ2V0TmFtZSk7XG4gICAgICAgIGNvbnN0IHRhcmdldCA9IHRoaXMuZ2V0KGl0ZXIudGFyZ2V0TmFtZSk7XG4gICAgICAgIHRoaXMuX19nZXRMaW5rT3B0aW9ucyhvcHRpb25zLCB0YXJnZXRTZXQsIGdldFB1YmxpY0xpbmtPcHRpb25zKHRhcmdldCkpO1xuICAgICAgICB0aGlzLl9fZ2V0TGlua09wdGlvbnMob3B0aW9ucywgdGFyZ2V0U2V0LCBnZXRQdWJsaWNMaWJyYXJpZXModGFyZ2V0KSk7XG4gICAgICB9XG4gICAgfVxuICAgIGVsc2UgaWYgKHR5cGVvZiBpdGVyID09PSBcInN0cmluZ1wiKSB7XG4gICAgICBpZiAoIW9wdGlvbnMuaW5jbHVkZXMoaXRlcikpXG4gICAgICAgIG9wdGlvbnMucHVzaChpdGVyKTtcbiAgICB9XG4gICAgZWxzZSBpZiAoQXJyYXkuaXNBcnJheShpdGVyKSkge1xuICAgICAgLy8gVE9ETzogQWRkIGNvbXBhcmUgZm9yIHNhbWUgYXJyYXkgaW4gb3B0aW9uc1xuICAgICAgb3B0aW9ucy5wdXNoKGl0ZXIpO1xuICAgIH1cbiAgICBlbHNlIHtcbiAgICAgIHRocm93IG5ldyBFcnJvcihgTm90IHN1cHBvcnQgaW5zdGFuY2UgJHtpdGVyfWApO1xuICAgIH1cbiAgfVxufVxuXG5UYXJnZXRDb2xsZWN0aW9uLnByb3RvdHlwZS5hbGxMaW5rT3B0aW9uc09mID0gZnVuY3Rpb24ocGFyYW1zKSB7XG4gIGNvbnN0IHRhcmdldCA9ICh0eXBlb2YgcGFyYW1zID09PSBcInN0cmluZ1wiKSA/IHRoaXMuZ2V0KHBhcmFtcykgOiBwYXJhbXM7XG4gIGNvbnN0IG9wdGlvbnMgPSBbXTtcbiAgY29uc3QgdGFyZ2V0U2V0ID0gbmV3IFNldChbIHRhcmdldC5OQU1FIF0pO1xuICB0aGlzLl9fZ2V0TGlua09wdGlvbnMob3B0aW9ucywgdGFyZ2V0U2V0LCBnZXRMaW5rT3B0aW9ucyh0YXJnZXQpKTtcbiAgdGhpcy5fX2dldExpbmtPcHRpb25zKG9wdGlvbnMsIHRhcmdldFNldCwgZ2V0UHVibGljTGlicmFyaWVzKHRhcmdldCkpO1xuICByZXR1cm4gb3B0aW9ucy5mbGF0KCk7XG59XG5cbm1vZHVsZS5leHBvcnRzID0ge1xuICBUYXJnZXRDb2xsZWN0aW9uLFxufTtcbiIsIlwidXNlIHN0cmljdFwiO1xuXG5jb25zdCBOQU1FICAgICA9IFN5bWJvbChcIk5BTUVcIik7XG5jb25zdCBJTkNMVURFUyA9IFN5bWJvbChcIklOQ0xVREVTXCIpO1xuY29uc3QgU09VUkNFUyAgPSBTeW1ib2woXCJTT1VSQ0VTXCIpO1xuY29uc3QgREVGSU5FUyA9IFN5bWJvbChcIkRFRklORVNcIik7XG5jb25zdCBDT01QSUxFX09QVElPTlMgPSBTeW1ib2woXCJDT01QSUxFX09QVElPTlNcIik7XG5jb25zdCBMSU5LX09QVElPTlMgPSBTeW1ib2woXCJMSU5LX09QVElPTlNcIik7XG5cbmZ1bmN0aW9uIFVua25vd25UYXJnZXQobmFtZSkge1xuICB0aGlzW05BTUVdID0gbmFtZTtcbiAgdGhpc1tJTkNMVURFU10gPSBbXTtcbiAgdGhpc1tTT1VSQ0VTXSA9IFtdO1xuICB0aGlzW0RFRklORVNdID0gW107XG4gIHRoaXNbQ09NUElMRV9PUFRJT05TXSA9IFtdO1xuICB0aGlzW0xJTktfT1BUSU9OU10gPSBbXTtcbn1cblxuVW5rbm93blRhcmdldC5jcmVhdGUgPSAobmFtZSkgPT4ge1xuICByZXR1cm4gT2JqZWN0LnNlYWwobmV3IFVua25vd25UYXJnZXQobmFtZSkpO1xufVxuXG5Vbmtub3duVGFyZ2V0LmVuc3VyZUluc3RhbmNlID0gKHZhbHVlKSA9PiB7XG4gIGlmICh2YWx1ZSBpbnN0YW5jZW9mIFVua25vd25UYXJnZXQpXG4gICAgcmV0dXJuIHZhbHVlO1xuICB0aHJvdyBuZXcgRXJyb3IoYFRoZSAnJHt2YWx1ZX0nIGlzIG5vdCBhIFVua25vd25UYXJnZXRgKTtcbn1cblxuVW5rbm93blRhcmdldC5wcm90b3R5cGUgPSBPYmplY3QuY3JlYXRlKE9iamVjdC5wcm90b3R5cGUsIHtcbiAgY29uc3RydWN0b3I6IHtcbiAgICB2YWx1ZTogVW5rbm93blRhcmdldCxcbiAgICBlbnVtZXJhYmxlOiBmYWxzZSxcbiAgfSxcbiAgTkFNRToge1xuICAgIGdldCAoKSB7IHJldHVybiB0aGlzW05BTUVdOyB9LFxuICAgIGVudW1lcmFibGU6IHRydWUsXG4gIH0sXG4gIElOQ0xVREVTOiB7XG4gICAgZ2V0ICgpIHsgcmV0dXJuIHRoaXNbSU5DTFVERVNdOyB9LFxuICAgIGVudW1lcmFibGU6IHRydWUsXG4gIH0sXG4gIFNPVVJDRVM6IHtcbiAgICBnZXQgKCkgeyByZXR1cm4gdGhpc1tTT1VSQ0VTXTsgfSxcbiAgICBlbnVtZXJhYmxlOiB0cnVlLFxuICB9LFxuICBERUZJTkVTOiB7XG4gICAgZ2V0ICgpIHsgcmV0dXJuIHRoaXNbREVGSU5FU107IH0sXG4gICAgZW51bWVyYWJsZTogdHJ1ZSxcbiAgfSxcbiAgQ09NUElMRV9PUFRJT05TOiB7XG4gICAgZ2V0ICgpIHsgcmV0dXJuIHRoaXNbQ09NUElMRV9PUFRJT05TXTsgfSxcbiAgICBlbnVtZXJhYmxlOiB0cnVlLFxuICB9LFxuICBMSU5LX09QVElPTlM6IHtcbiAgICBnZXQgKCkgeyByZXR1cm4gdGhpc1tMSU5LX09QVElPTlNdOyB9LFxuICAgIGVudW1lcmFibGU6IHRydWUsXG4gIH0sXG59KTtcblxuVW5rbm93blRhcmdldC5wcm90b3R5cGUudG9KU09OID0gZnVuY3Rpb24oKSB7XG4gIGNvbnN0IGpzb24gPSB7fTtcbiAgZm9yIChjb25zdCBrZXkgaW4gdGhpcylcbiAgICBqc29uW2tleV0gPSB0aGlzW2tleV07XG4gIHJldHVybiBqc29uO1xufVxuXG5Vbmtub3duVGFyZ2V0LnByb3RvdHlwZS50b1N0cmluZyA9IGZ1bmN0aW9uKCkge1xuICByZXR1cm4gXCIke1wiICsgdGhpc1tOQU1FXSArIFwifVwiO1xufVxuXG5tb2R1bGUuZXhwb3J0cyA9IHtcbiAgVW5rbm93blRhcmdldCxcbn07XG4iLCJcInVzZSBzdHJpY3RcIjtcblxuY29uc3Qgb3MgPSByZXF1aXJlKFwibm9kZTpvc1wiKTtcbmNvbnN0IHBhdGggPSByZXF1aXJlKFwibm9kZTpwYXRoXCIpO1xuXG5jb25zdCB7IGNvcHlWYWx1ZSB9ID0gcmVxdWlyZShcIkAvdXRpbHMvUHJpbWl0aXZlc1wiKTtcbmNvbnN0IHsgZmlsZUV4aXN0c1N5bmMgfSA9IHJlcXVpcmUoXCJAL3V0aWxzL0ZpbGVTeXN0ZW1cIik7XG5jb25zdCB7IEFic29sdXRlUGF0aCB9ID0gcmVxdWlyZShcIkAvY29yZS9QYXRoXCIpO1xuY29uc3QgeyBJbnRlcmZhY2VUYXJnZXQgfSA9IHJlcXVpcmUoXCIuL0ludGVyZmFjZVRhcmdldC5qc1wiKTtcbmNvbnN0IHsgQmFzZVRhcmdldCB9ID0gcmVxdWlyZShcIi4vVGFyZ2V0LmpzXCIpO1xuY29uc3QgeyBJbmNsdWRlRGlyZWN0b3J5IH0gPSByZXF1aXJlKFwiQC9jb3JlL0luY2x1ZGVEaXJlY3RvcnlcIik7XG5jb25zdCB7IFN5c3RlbVZhcmlhYmxlcyB9ID0gcmVxdWlyZShcIi4vU3lzdGVtVmFyaWFibGVzLmpzXCIpO1xuY29uc3QgYml0bWFrZSA9IHJlcXVpcmUoXCJAL2JpdG1ha2UvaW5kZXguanNcIik7XG5cbmNvbnN0IHJlcXVpcmVJbXBsID0gZXZhbChcInJlcXVpcmVcIik7XG5cbmNvbnN0IGN1cnJlbnRGdW5jdGlvbk5hbWUgPSAoKSA9PiB7XG4gIGNvbnN0IHN0YWNrID0gbmV3IEVycm9yKCkuc3RhY2suc3BsaXQoXCJcXG5cIilbMl07XG4gIHJldHVybiBzdGFjay5tYXRjaCgvYXQgKFxcUyspLyk/LlsxXTtcbn07XG5cbmZ1bmN0aW9uIHNjb3BlVmFsdWVBc1ByaW1pdGl2ZXMobykge1xuICBpZiAodHlwZW9mIG8gPT09IFwidW5kZWZpbmVkXCIpXG4gICAgcmV0dXJuIG87XG4gIGlmICh0eXBlb2YgbyA9PT0gXCJib29sZWFuXCIpXG4gICAgcmV0dXJuIG87XG4gIGlmICh0eXBlb2YgbyA9PT0gXCJudW1iZXJcIilcbiAgICByZXR1cm4gbztcbiAgaWYgKHR5cGVvZiBvID09PSBcInN0cmluZ1wiKVxuICAgIHJldHVybiBvO1xuICBpZiAodHlwZW9mIG8gPT09IFwib2JqZWN0XCIpIHtcbiAgICBpZiAoIW8pXG4gICAgICByZXR1cm4gbztcbiAgICBpZiAobyBpbnN0YW5jZW9mIEFic29sdXRlUGF0aCkge1xuICAgICAgcmV0dXJuIG8udG9TdHJpbmcoKTtcbiAgICB9XG4gICAgaWYgKG8gaW5zdGFuY2VvZiBBcnJheSkge1xuICAgICAgY29uc3QgcmVzdWx0ID0gW107XG4gICAgICBmb3IgKGNvbnN0IGkgb2YgbylcbiAgICAgICAgcmVzdWx0LnB1c2goc2NvcGVWYWx1ZUFzUHJpbWl0aXZlcyhpKSk7XG4gICAgICByZXR1cm4gcmVzdWx0O1xuICAgIH1cbiAgICBpZiAobyBpbnN0YW5jZW9mIE9iamVjdCkge1xuICAgICAgY29uc3QgcmVzdWx0ID0ge307XG4gICAgICBmb3IgKGNvbnN0IFtrLHZdIG9mIE9iamVjdC5lbnRyaWVzKG8pKVxuICAgICAgICByZXN1bHRba10gPSBzY29wZVZhbHVlQXNQcmltaXRpdmVzKHYpO1xuICAgICAgcmV0dXJuIHJlc3VsdDtcbiAgICB9XG4gIH1cbiAgdGhyb3cgbmV3IEVycm9yKGBVbmtub3duIGluc3RhbmNlIG9mICR7b31gKTtcbn1cblxuY29uc3QgR0xPQkFMID0gU3ltYm9sKFwiR0xPQkFMXCIpO1xuY29uc3QgU0NPUEUgPSBTeW1ib2woXCJTQ09QRVwiKTtcblxuZnVuY3Rpb24gVXNlckNvbnRleHQoc2NvcGUsIGdsb2JhbCkge1xuICB0aGlzW1NDT1BFXSA9IHNjb3BlO1xuICB0aGlzW0dMT0JBTF0gPSBnbG9iYWw7XG5cbiAgY29uc3QgcHJvcHMgPSBPYmplY3QuZ2V0T3duUHJvcGVydHlEZXNjcmlwdG9ycyhTeXN0ZW1WYXJpYWJsZXMucHJvdG90eXBlKTtcbiAgZm9yIChjb25zdCBbbmFtZSwgZGVzY10gb2YgT2JqZWN0LmVudHJpZXMocHJvcHMpKSB7XG4gICAgaWYgKGRlc2MuZ2V0IHx8IGRlc2Muc2V0KSB7XG4gICAgICBjb25zdCBuZXdEZXNjID0geyBlbnVtZXJhYmxlOiBkZXNjLmVudW1lcmFibGUsIGNvbmZpZ3VyYWJsZTogZmFsc2UgfTtcbiAgICAgIGlmIChkZXNjLmdldClcbiAgICAgICAgbmV3RGVzYy5nZXQgPSBmdW5jdGlvbigpIHsgcmV0dXJuIHRoaXNbU0NPUEVdW25hbWVdOyB9XG4gICAgICBpZiAoZGVzYy5zZXQpXG4gICAgICAgIG5ld0Rlc2Muc2V0ID0gZnVuY3Rpb24odmFsdWUpIHsgdGhpc1tTQ09QRV1bbmFtZV0gPSB2YWx1ZTsgfVxuICAgICAgT2JqZWN0LmRlZmluZVByb3BlcnR5KHRoaXMsIG5hbWUsIG5ld0Rlc2MpO1xuICAgIH1cbiAgfVxufVxuXG5Vc2VyQ29udGV4dC5jcmVhdGUgPSAoc2NvcGUsIGdsb2JhbCkgPT4ge1xuICByZXR1cm4gbmV3IFVzZXJDb250ZXh0KHNjb3BlLCBnbG9iYWwpO1xufVxuXG5mdW5jdGlvbiBtYWtlTG9nZ2VyKGxvZ2dlckZ1bmMsIHdpdGhUYWcpIHtcbiAgaWYgKCFsb2dnZXJGdW5jKVxuICAgIHJldHVybiAoKSA9PiB7fTtcbiAgcmV0dXJuIGZ1bmN0aW9uKCkge1xuICAgIGNvbnN0IGxpc3QgPSBbXTtcbiAgICBpZiAod2l0aFRhZylcbiAgICAgIGxpc3QucHVzaChcIltcIiArIHRoaXMuX19sb2dUYWcoKSArIFwiXVwiKTtcbiAgICBmb3IgKGNvbnN0IGl0ZXIgb2YgYXJndW1lbnRzKSB7XG4gICAgICBpZiAoaXRlciAmJiB0eXBlb2YgaXRlciA9PT0gXCJvYmplY3RcIilcbiAgICAgICAgbGlzdC5wdXNoKEpTT04uc3RyaW5naWZ5KGl0ZXIpKTtcbiAgICAgIGVsc2VcbiAgICAgICAgbGlzdC5wdXNoKGl0ZXIudG9TdHJpbmcoKSk7XG4gICAgfVxuICAgIGxvZ2dlckZ1bmMobGlzdC5qb2luKFwiIFwiKSk7XG4gIH07XG59XG5cblVzZXJDb250ZXh0LnByb3RvdHlwZS5sb2dEZWZhdWx0ID0gbWFrZUxvZ2dlcihjb25zb2xlLmxvZyk7XG5Vc2VyQ29udGV4dC5wcm90b3R5cGUubG9nSW5mbyA9IG1ha2VMb2dnZXIoY29uc29sZS5pbmZvKTtcblVzZXJDb250ZXh0LnByb3RvdHlwZS5sb2dEZWJ1ZyA9IG1ha2VMb2dnZXIoLypjb25zb2xlLmRlYnVnKi8pO1xuVXNlckNvbnRleHQucHJvdG90eXBlLmxvZ1dhcm4gPSBtYWtlTG9nZ2VyKGNvbnNvbGUud2Fybik7XG5Vc2VyQ29udGV4dC5wcm90b3R5cGUubG9nRXJyb3IgPSBtYWtlTG9nZ2VyKGNvbnNvbGUuZXJyb3IpO1xuXG5Vc2VyQ29udGV4dC5wcm90b3R5cGUuX19sb2dUYWcgPSBmdW5jdGlvbigpIHtcbiAgY29uc3QgdGFnID0gdGhpcy5QUk9KRUNUX1NPVVJDRV9ESVIucmVsYXRpdmUodGhpcy5TT1VSQ0VfRElSKTtcbiAgcmV0dXJuIHBhdGgucG9zaXguam9pbih0aGlzLlBST0pFQ1RfTkFNRSwgdGFnKTtcbn1cblxuVXNlckNvbnRleHQucHJvdG90eXBlLl9fc2NvcGUgPSBmdW5jdGlvbigpIHtcbiAgcmV0dXJuIHRoaXNbU0NPUEVdO1xufVxuXG5Vc2VyQ29udGV4dC5wcm90b3R5cGUuZ2V0Q2FjaGVWYXJpYWJsZXMgPSBmdW5jdGlvbigpIHtcbiAgdGhpcy5sb2dEZWJ1ZyhjdXJyZW50RnVuY3Rpb25OYW1lKCkpO1xuICBjb25zdCByZXN1bHQgPSB7fTtcbiAgZm9yIChjb25zdCBba2V5LCBlbnRyeV0gb2YgT2JqZWN0LmVudHJpZXModGhpc1tHTE9CQUxdLkNBQ0hFKSkge1xuICAgIGNvbnN0IHZhbHVlID0gY29weVZhbHVlKHRoaXNba2V5XSk7XG4gICAgcmVzdWx0W2tleV0gPSB7XG4gICAgICB0eXBlOiBjb3B5VmFsdWUoZW50cnkudHlwZSkgfHwgdHlwZW9mIHZhbHVlLFxuICAgICAgZGVzY3JpcHRpb246IGVudHJ5LmRlc2NyaXB0aW9uIHx8IFwiXCIsXG4gICAgICB2YWx1ZSxcbiAgICB9O1xuICB9XG4gIHJldHVybiByZXN1bHQ7XG59XG5cblVzZXJDb250ZXh0LnByb3RvdHlwZS5hZGRDYWNoZVZhcmlhYmxlcyA9IGZ1bmN0aW9uKHBhcmFtcykge1xuICB0aGlzLmxvZ0RlYnVnKGN1cnJlbnRGdW5jdGlvbk5hbWUoKSk7XG5cbiAgaWYgKHR5cGVvZiBwYXJhbXMgPT09IFwic3RyaW5nXCIpIHtcbiAgICBjb25zdCBzY3JpcHRzID0gdGhpcy5TT1VSQ0VfRElSLnJlc29sdmUocGFyYW1zKTtcbiAgICB0aGlzW0dMT0JBTF0ubG9hZENhY2hlVmFyaWFibGVzKHNjcmlwdHMpO1xuICB9XG4gIGVsc2UgaWYgKHR5cGVvZiBwYXJhbXMgPT09IFwib2JqZWN0XCIpIHtcbiAgICB0aGlzW0dMT0JBTF0uYWRkQ2FjaGVWYXJpYWJsZXMocGFyYW1zKTtcbiAgfVxuICBlbHNlIHtcbiAgICB0aHJvdyBuZXcgRXJyb3IoYFR5cGUgJHtwYXJhbXN9IGNhbm5vdCB1c2UgZm9yIGNhY2hlIHZhcmlhYmxlc2ApO1xuICB9XG5cbiAgdGhpc1tHTE9CQUxdLmNvcHlDYWNoZVZhcmlhYmxlcyh0aGlzKTtcbn1cblxuVXNlckNvbnRleHQucHJvdG90eXBlLmFkZEluY2x1ZGVEaXJlY3RvcmllcyA9IGZ1bmN0aW9uKC4uLmRpcnMpIHtcbiAgZm9yIChjb25zdCBpdGVyIG9mIGRpcnMuZmxhdCgxKSkge1xuICAgIHRoaXMuSU5DTFVERVMucHVzaChJbmNsdWRlRGlyZWN0b3J5LmNyZWF0ZShpdGVyLCB0aGlzLlNPVVJDRV9ESVIpKTtcbiAgfVxufVxuXG5Vc2VyQ29udGV4dC5wcm90b3R5cGUuYWRkU3ViZGlyZWN0b3J5ID0gZnVuY3Rpb24oc291cmNlRGlyLCBiaW5hcnlEaXIpIHtcbiAgdGhpcy5sb2dEZWJ1ZyhjdXJyZW50RnVuY3Rpb25OYW1lKCkpO1xuXG4gIGJpbmFyeURpciA9IGJpbmFyeURpciB8fCBwYXRoLmlzQWJzb2x1dGUoc291cmNlRGlyKSA/IHVuZGVmaW5lZCA6IHNvdXJjZURpcjtcblxuICBjb25zdCBTT1VSQ0VfRElSID0gcGF0aC5pc0Fic29sdXRlKHNvdXJjZURpcikgPyBBYnNvbHV0ZVBhdGguY3JlYXRlKHNvdXJjZURpcikgOiB0aGlzLlNPVVJDRV9ESVIuam9pbihzb3VyY2VEaXIpO1xuICBjb25zdCBCSU5BUllfRElSID0gcGF0aC5pc0Fic29sdXRlKGJpbmFyeURpcikgPyBBYnNvbHV0ZVBhdGguY3JlYXRlKGJpbmFyeURpcikgOiB0aGlzLkJJTkFSWV9ESVIuam9pbihiaW5hcnlEaXIpO1xuXG4gIGNvbnN0IG5ld1Njb3BlID0gdGhpc1tTQ09QRV0uY2xvbmUoKTtcblxuICBuZXdTY29wZS5TT1VSQ0VfRElSID0gQWJzb2x1dGVQYXRoLmNyZWF0ZSh0aGlzW0dMT0JBTF0ucmVzb2x2ZVN1YmRpcmVjdG9yeShTT1VSQ0VfRElSKS50b1N0cmluZygpKTtcbiAgbmV3U2NvcGUuQklOQVJZX0RJUiA9IEJJTkFSWV9ESVI7XG4gIFxuICBjb25zdCBuZXdDb250ZXggPSBVc2VyQ29udGV4dC5jcmVhdGUobmV3U2NvcGUsIHRoaXNbR0xPQkFMXSk7XG4gIGZvciAoY29uc3QgW2tleSwgdmFsXSBvZiBPYmplY3QuZW50cmllcyh0aGlzKSkge1xuICAgIGlmICghT2JqZWN0Lmhhc093bihTeXN0ZW1WYXJpYWJsZXMucHJvdG90eXBlLCBrZXkpKVxuICAgICAgbmV3Q29udGV4W2tleV0gPSB2YWw7XG4gIH1cblxuICB0aGlzW0dMT0JBTF0uYWRkU3ViZGlyZWN0b3J5KG5ld0NvbnRleCk7XG59XG5cblVzZXJDb250ZXh0LnByb3RvdHlwZS5hZGRDdXN0b21TY3JpcHQgPSBmdW5jdGlvbihuYW1lLCBwYXJhbXMpIHtcbiAgdGhpcy5sb2dEZWJ1ZyhjdXJyZW50RnVuY3Rpb25OYW1lKCksIG5hbWUpO1xuXG4gIGNvbnN0IG5ld1Njb3BlID0gdGhpc1tTQ09QRV0uY2xvbmUoKTtcbiAgY29uc3QgdGFyZ2V0ID0gYml0bWFrZS5DdXN0b21TY3JpcHQuY3JlYXRlKG5ld1Njb3BlLCBuYW1lLCBwYXJhbXMpO1xuICB0aGlzW0dMT0JBTF0uU0NSSVBUUy5zZXQobmFtZSwgdGFyZ2V0KTtcbiAgcmV0dXJuIHRhcmdldDtcbn1cblxuVXNlckNvbnRleHQucHJvdG90eXBlLnRhcmdldCA9IGZ1bmN0aW9uKG5hbWUpIHtcbiAgY29uc3QgdXRhcmdldCA9IHRoaXNbR0xPQkFMXS5nZXRVa25vd25UYXJnZXQobmFtZSk7XG4gIHJldHVybiBJbnRlcmZhY2VUYXJnZXQuY3JlYXRlKHRoaXNbU0NPUEVdLCB1dGFyZ2V0KTtcbn1cblxuVXNlckNvbnRleHQucHJvdG90eXBlLnNjcmlwdCA9IGZ1bmN0aW9uKG5hbWUpIHtcbiAgdGhpcy5sb2dEZWJ1ZyhjdXJyZW50RnVuY3Rpb25OYW1lKCksIG5hbWUpO1xuXG4gIGxldCBzY3JpcHQgPSB0aGlzW0dMT0JBTF0uSU5URVJGQUNFX1NDUklQVFNbbmFtZV07XG4gIGlmICghc2NyaXB0KSB7XG4gICAgc2NyaXB0ID0gYml0bWFrZS5JbnRlcmZhY2VTY3JpcHQuY3JlYXRlKG5hbWUpO1xuICAgIHRoaXNbR0xPQkFMXS5JTlRFUkZBQ0VfU0NSSVBUU1tuYW1lXSA9IHNjcmlwdDtcbiAgfVxuXG4gIHJldHVybiBzY3JpcHQ7XG59XG5cblVzZXJDb250ZXh0LnByb3RvdHlwZS5pbnN0YWxsID0gZnVuY3Rpb24odmFsdWUsIHBhcmFtcykge1xuICBmb3IgKGNvbnN0IGl0IG9mIFsgdmFsdWUgXS5mbGF0KDEpKSB7XG4gICAgY29uc3QgaXRlciA9IChpdCBpbnN0YW5jZW9mIEJhc2VUYXJnZXQpID8gdGhpcy50YXJnZXQoaXQuTkFNRSkgOiBpdDtcbiAgICBjb25zdCBlbnRpdHkgPSBiaXRtYWtlLkluc3RhbGxFbnRpdHkuY3JlYXRlKHRoaXMsIGl0ZXIsIHBhcmFtcyk7XG4gICAgdGhpc1tHTE9CQUxdLklOU1RBTExfTElTVC5wdXNoKGVudGl0eSk7XG4gIH1cbn1cblxuVXNlckNvbnRleHQucHJvdG90eXBlLmFkZFN0YXRpY0xpYnJhcnkgPSBmdW5jdGlvbihuYW1lLCAuLi5zb3VyY2VzKSB7XG4gIHRoaXMubG9nRGVidWcoY3VycmVudEZ1bmN0aW9uTmFtZSgpLCBuYW1lKTtcblxuICBjb25zdCB0YXJnZXQgPSBiaXRtYWtlLlN0YXRpY0xpYnJhcnkuY3JlYXRlKHRoaXNbU0NPUEVdLCBuYW1lKTtcbiAgdGFyZ2V0LmFkZFNvdXJjZXMoLi4uc291cmNlcyk7XG5cbiAgdGhpc1tHTE9CQUxdLlRBUkdFVFMuc2V0KG5hbWUsIHRhcmdldCk7XG4gIHJldHVybiB0YXJnZXQ7XG59XG5cblVzZXJDb250ZXh0LnByb3RvdHlwZS5hZGRPYmplY3RMaWJyYXJ5ID0gZnVuY3Rpb24obmFtZSwgLi4uc291cmNlcykge1xuICB0aGlzLmxvZ0RlYnVnKGN1cnJlbnRGdW5jdGlvbk5hbWUoKSwgbmFtZSk7XG5cbiAgY29uc3QgdGFyZ2V0ID0gYml0bWFrZS5PYmplY3RMaWJyYXJ5LmNyZWF0ZSh0aGlzW1NDT1BFXSwgbmFtZSk7XG4gIHRhcmdldC5hZGRTb3VyY2VzKC4uLnNvdXJjZXMpO1xuXG4gIHRoaXNbR0xPQkFMXS5UQVJHRVRTLnNldChuYW1lLCB0YXJnZXQpO1xuICByZXR1cm4gdGFyZ2V0O1xufVxuXG5Vc2VyQ29udGV4dC5wcm90b3R5cGUuYWRkU2hhcmVkTGlicmFyeSA9IGZ1bmN0aW9uKG5hbWUsIC4uLnNvdXJjZXMpIHtcbiAgdGhpcy5sb2dEZWJ1ZyhjdXJyZW50RnVuY3Rpb25OYW1lKCksIG5hbWUpO1xuXG4gIGNvbnN0IHRhcmdldCA9IGJpdG1ha2UuU2hhcmVkTGlicmFyeS5jcmVhdGUodGhpc1tTQ09QRV0sIG5hbWUpO1xuICB0YXJnZXQuYWRkU291cmNlcyguLi5zb3VyY2VzKTtcblxuICB0aGlzW0dMT0JBTF0uVEFSR0VUUy5zZXQobmFtZSwgdGFyZ2V0KTtcbiAgcmV0dXJuIHRhcmdldDtcbn1cblxuVXNlckNvbnRleHQucHJvdG90eXBlLmFkZEV4ZWN1dGFibGUgPSBmdW5jdGlvbihuYW1lLCAuLi5zb3VyY2VzKSB7XG4gIHRoaXMubG9nRGVidWcoY3VycmVudEZ1bmN0aW9uTmFtZSgpLCBuYW1lKTtcblxuICBjb25zdCB0YXJnZXQgPSBiaXRtYWtlLkV4ZWN1dGFibGUuY3JlYXRlKHRoaXNbU0NPUEVdLCBuYW1lKTtcbiAgdGFyZ2V0LmFkZFNvdXJjZXMoLi4uc291cmNlcyk7XG5cbiAgdGhpc1tHTE9CQUxdLlRBUkdFVFMuc2V0KG5hbWUsIHRhcmdldCk7XG4gIHJldHVybiB0YXJnZXQ7XG59XG5cblVzZXJDb250ZXh0LnByb3RvdHlwZS5maW5kUHJvZ3JhbSA9IGZ1bmN0aW9uKG5hbWUpIHtcbiAgdGhpcy5sb2dEZWJ1ZyhjdXJyZW50RnVuY3Rpb25OYW1lKCksIG5hbWUpO1xuXG4gIGlmIChvcy5wbGF0Zm9ybSgpID09PSBcIndpbjMyXCIgJiYgIW5hbWUuZW5kc1dpdGgoXCIuZXhlXCIpKVxuICAgIG5hbWUgKz0gXCIuZXhlXCI7XG5cbiAgY29uc3QgcGF0aHMgPSBwcm9jZXNzLmVudi5QQVRILnNwbGl0KHBhdGgucG9zaXguZGVsaW1pdGVyKTtcbiAgZm9yIChjb25zdCBpdGVyIG9mIHBhdGhzKSB7XG4gICAgY29uc3QgZmlsZW5hbWUgPSBwYXRoLnBvc2l4LnJlc29sdmUoaXRlciwgbmFtZSk7XG4gICAgaWYgKGZpbGVFeGlzdHNTeW5jKGZpbGVuYW1lKSlcbiAgICAgIHJldHVybiBmaWxlbmFtZTtcbiAgfVxuXG4gIHJldHVybiBudWxsO1xufVxuXG5Vc2VyQ29udGV4dC5wcm90b3R5cGUuZXhlY3V0ZVNjcmlwdCA9IGZ1bmN0aW9uKHNjcmlwdCwgb3B0aW9ucykge1xuICB0aGlzLmxvZ0RlYnVnKGN1cnJlbnRGdW5jdGlvbk5hbWUoKSwgc2NyaXB0KTtcbiAgY29uc3Qgc2NyaXB0UGF0aCA9IHRoaXMuU09VUkNFX0RJUi5yZXNvbHZlKHNjcmlwdCk7XG4gIGNvbnN0IG1vZHVsZSA9IHJlcXVpcmVJbXBsKHNjcmlwdFBhdGgudG9TdHJpbmcoKSk7XG4gIG1vZHVsZShzY29wZVZhbHVlQXNQcmltaXRpdmVzKG9wdGlvbnMpKTtcbn1cblxuVXNlckNvbnRleHQucHJvdG90eXBlLnRvSlNPTiA9IGZ1bmN0aW9uKCkge1xuICBjb25zdCBqc29uID0ge307XG4gIGZvciAoY29uc3Qga2V5IGluIHRoaXMpXG4gICAganNvbltrZXldID0gdGhpc1trZXldO1xuICByZXR1cm4ganNvbjtcbn1cblxubW9kdWxlLmV4cG9ydHMgPSB7XG4gIFVzZXJDb250ZXh0LFxufTtcbiIsIlwidXNlIHN0cmljdFwiO1xuXG5jb25zdCB7IFN5c3RlbVZhcmlhYmxlcyB9ID0gcmVxdWlyZShcIi4vU3lzdGVtVmFyaWFibGVzLmpzXCIpO1xuY29uc3QgeyBTb3VyY2VGaWxlIH0gPSByZXF1aXJlKFwiLi9Tb3VyY2VGaWxlLmpzXCIpO1xuY29uc3QgeyBTb3VyY2VGaWxlTGlzdCB9ID0gcmVxdWlyZShcIi4vU291cmNlRmlsZUxpc3QuanNcIik7XG5jb25zdCB7IE9iamVjdExpYnJhcnksIFN0YXRpY0xpYnJhcnksIFNoYXJlZExpYnJhcnksIEV4ZWN1dGFibGUgfSA9IHJlcXVpcmUoXCIuL1RhcmdldC5qc1wiKTtcbmNvbnN0IHsgQ3VzdG9tU2NyaXB0IH0gPSByZXF1aXJlKFwiLi9DdXN0b21TY3JpcHQuanNcIik7XG5jb25zdCB7IEludGVyZmFjZVRhcmdldCB9ID0gcmVxdWlyZShcIi4vSW50ZXJmYWNlVGFyZ2V0LmpzXCIpO1xuY29uc3QgeyBJbnRlcmZhY2VJbmNsdWRlcyB9ID0gcmVxdWlyZShcIi4vSW50ZXJmYWNlSW5jbHVkZXMuanNcIik7XG5jb25zdCB7IEludGVyZmFjZU9iamVjdHMgfSA9IHJlcXVpcmUoXCIuL0ludGVyZmFjZU9iamVjdHMuanNcIik7XG5jb25zdCB7IEludGVyZmFjZVNjcmlwdCB9ID0gcmVxdWlyZShcIi4vSW50ZXJmYWNlU2NyaXB0LmpzXCIpO1xuY29uc3QgeyBTY3JpcHRDb2xsZWN0aW9uIH0gPSByZXF1aXJlKFwiLi9TY3JpcHRDb2xsZWN0aW9uLmpzXCIpO1xuY29uc3QgeyBUYXJnZXRDb2xsZWN0aW9uIH0gPSByZXF1aXJlKFwiLi9UYXJnZXRDb2xsZWN0aW9uLmpzXCIpO1xuY29uc3QgeyBJbnN0YWxsRW50aXR5IH0gPSByZXF1aXJlKFwiLi9JbnN0YWxsRW50aXR5LmpzXCIpO1xuY29uc3QgeyBHbG9iYWxDb250ZXh0IH0gPSByZXF1aXJlKFwiLi9HbG9iYWxDb250ZXh0LmpzXCIpO1xuXG5tb2R1bGUuZXhwb3J0cyA9IHtcbiAgU3lzdGVtVmFyaWFibGVzLFxuICBTb3VyY2VGaWxlLFxuICBTb3VyY2VGaWxlTGlzdCxcbiAgT2JqZWN0TGlicmFyeSxcbiAgU3RhdGljTGlicmFyeSxcbiAgU2hhcmVkTGlicmFyeSxcbiAgRXhlY3V0YWJsZSxcbiAgQ3VzdG9tU2NyaXB0LFxuICBJbnRlcmZhY2VUYXJnZXQsXG4gIEludGVyZmFjZUluY2x1ZGVzLFxuICBJbnRlcmZhY2VPYmplY3RzLFxuICBJbnRlcmZhY2VTY3JpcHQsXG4gIFNjcmlwdENvbGxlY3Rpb24sXG4gIFRhcmdldENvbGxlY3Rpb24sXG4gIEluc3RhbGxFbnRpdHksXG4gIEdsb2JhbENvbnRleHQsXG59O1xuIiwiLypcbiAqIE1JVCBMaWNlbnNlXG4gKlxuICogQ29weXJpZ2h0IChjKSAyMDI1ICBZdXJpaSBZYWt1YmluICh5dXJpaS55YWt1YmluQGdtYWlsLmNvbSlcbiAqXG4gKiBQZXJtaXNzaW9uIGlzIGdyYW50ZWQgdG8gdXNlLCBjb3B5LCBtb2RpZnksIGFuZCBkaXN0cmlidXRlIHRoaXMgc29mdHdhcmVcbiAqIHVuZGVyIHRoZSBNSVQgTGljZW5zZS4gU2VlIExJQ0VOU0UgZmlsZSBmb3IgZGV0YWlscy5cbiAqL1xuXG5leHBvcnQgZW51bSBCb29sZWFuVHlwZSB7XG4gIE9OID0gXCJPTlwiLFxuICBPRkYgPSBcIk9GRlwiLFxufTtcblxuLy8gRW51bSByZXByZXNlbnRpbmcgdmFsdWUgdHlwZXMgdXNlZCBpbiBDTWFrZSBjYWNoZSB2YXJpYWJsZXNcbmV4cG9ydCBlbnVtIFZhbHVlVHlwZSB7XG4gIC8vIFJlcHJlc2VudHMgYSBmdWxsIHBhdGggdG8gYSBmaWxlXG4gIEZJTEVQQVRIID0gXCJGSUxFUEFUSFwiLFxuXG4gIC8vIFJlcHJlc2VudHMgYSBwYXRoIHRvIGEgZGlyZWN0b3J5XG4gIFBBVEggPSBcIlBBVEhcIixcblxuICAvLyBSZXByZXNlbnRzIGEgYm9vbGVhbiB2YWx1ZSAodHJ1ZS9mYWxzZSlcbiAgQk9PTCA9IFwiQk9PTFwiLFxuXG4gIC8vIFJlcHJlc2VudHMgYSBnZW5lcmljIHN0cmluZyB2YWx1ZVxuICBTVFJJTkcgPSBcIlNUUklOR1wiLFxufTtcblxuLy8gQnVpbGRUeXBlIHJlcHJlc2VudGluZyBjb21tb24gQ01ha2UgYnVpbGQgdHlwZXNcbmV4cG9ydCBlbnVtIEJ1aWxkVHlwZSB7XG4gIC8vIERlYnVnIGJ1aWxkIHR5cGU6IGluY2x1ZGVzIGRlYnVnIHN5bWJvbHMsIG5vIG9wdGltaXphdGlvblxuICBEZWJ1ZyA9IFwiRGVidWdcIixcblxuICAvLyBSZWxlYXNlIGJ1aWxkIHR5cGU6IG9wdGltaXplZCBjb2RlLCBubyBkZWJ1ZyBpbmZvXG4gIFJlbGVhc2UgPSBcIlJlbGVhc2VcIixcblxuICAvLyBSZWxlYXNlIHdpdGggZGVidWcgaW5mbzogb3B0aW1pemVkIHdpdGggZGVidWcgc3ltYm9scyBpbmNsdWRlZFxuICBSZWxXaXRoRGViSW5mbyA9IFwiUmVsV2l0aERlYkluZm9cIixcblxuICAvLyBNaW5pbXVtIHNpemUgcmVsZWFzZTogb3B0aW1pemVkIGZvciBzbWFsbGVzdCBiaW5hcnkgc2l6ZVxuICBNaW5TaXplUmVsID0gXCJNaW5TaXplUmVsXCIsXG59O1xuXG4vLyBUaGUgZGVmYXVsdCBuYW1lIG9mIHRoZSBtYWluIENNYWtlIGJ1aWxkIGNvbmZpZ3VyYXRpb24gZmlsZVxuZXhwb3J0IGNvbnN0IENNQUtFX0xJU1RTX1RYVCA9IFwiQ01ha2VMaXN0cy50eHRcIjtcbiIsIi8qXG4gKiBNSVQgTGljZW5zZVxuICpcbiAqIENvcHlyaWdodCAoYykgMjAyNSAgWXVyaWkgWWFrdWJpbiAoeXVyaWkueWFrdWJpbkBnbWFpbC5jb20pXG4gKlxuICogUGVybWlzc2lvbiBpcyBncmFudGVkIHRvIHVzZSwgY29weSwgbW9kaWZ5LCBhbmQgZGlzdHJpYnV0ZSB0aGlzIHNvZnR3YXJlXG4gKiB1bmRlciB0aGUgTUlUIExpY2Vuc2UuIFNlZSBMSUNFTlNFIGZpbGUgZm9yIGRldGFpbHMuXG4gKi9cblxuaW1wb3J0IHsgQm9vbGVhblR5cGUgfSBmcm9tIFwiQC9jbWFrZS9Db25zdGFudHNcIjtcblxuZXhwb3J0IGZ1bmN0aW9uIGNvbnZlcnRUb1ZhbHVlKG9iajogYW55KTogc3RyaW5nIHtcbiAgaWYgKEFycmF5LmlzQXJyYXkob2JqKSlcbiAgICByZXR1cm4gb2JqLm1hcChpID0+IGNvbnZlcnRUb1ZhbHVlKGkpKS5qb2luKFwiO1wiKTtcblxuICBpZiAodHlwZW9mIG9iaiA9PT0gXCJib29sZWFuXCIpXG4gICAgcmV0dXJuIG9iaiA/IEJvb2xlYW5UeXBlLk9OIDogQm9vbGVhblR5cGUuT0ZGO1xuXG4gIHJldHVybiBvYmoudG9TdHJpbmcoKTtcbn1cbiIsIi8qXG4gKiBNSVQgTGljZW5zZVxuICpcbiAqIENvcHlyaWdodCAoYykgMjAyNSAgWXVyaWkgWWFrdWJpbiAoeXVyaWkueWFrdWJpbkBnbWFpbC5jb20pXG4gKlxuICogUGVybWlzc2lvbiBpcyBncmFudGVkIHRvIHVzZSwgY29weSwgbW9kaWZ5LCBhbmQgZGlzdHJpYnV0ZSB0aGlzIHNvZnR3YXJlXG4gKiB1bmRlciB0aGUgTUlUIExpY2Vuc2UuIFNlZSBMSUNFTlNFIGZpbGUgZm9yIGRldGFpbHMuXG4gKi9cblxuaW1wb3J0IHBhdGggZnJvbSBcIm5vZGU6cGF0aFwiO1xuaW1wb3J0IGZzIGZyb20gXCJub2RlOmZzXCI7XG5pbXBvcnQgeyBzcGF3blN5bmMgfSBmcm9tIFwibm9kZTpjaGlsZF9wcm9jZXNzXCI7XG5cbmltcG9ydCB7IGltcG9ydE1vZHVsZSB9IGZyb20gXCJAL3V0aWxzL01vZHVsZVwiO1xuXG5pbXBvcnQgY29uZmlndXJlX2ZpbGUgZnJvbSBcIkAvYml0bWFrZS9TeXN0ZW1TY3JpcHRzL2NvbmZpZ3VyZV9maWxlLmpzXCI7XG5pbXBvcnQgaW5zdGFsbF9zY3JpcHQgZnJvbSBcIkAvYml0bWFrZS9TeXN0ZW1TY3JpcHRzL2luc3RhbGxfc2NyaXB0LmpzXCI7XG5cbmNvbnN0IEVOVFJJRVMgPSBTeW1ib2woXCJFTlRSSUVTXCIpO1xuXG5lbnVtIEdvYWxUeXBlIHtcbiAgU0NSSVBUID0gXCJzY3JpcHRcIixcbiAgRVhFQyA9IFwiZXhlY1wiLFxuICBUQVJHRVQgPSBcInRhcmdldFwiLFxufTtcblxuaW50ZXJmYWNlIEJhc2VHb2FsIHtcbiAgbmFtZTogc3RyaW5nO1xuICB0eXBlOiBHb2FsVHlwZTtcbiAgZGVwZW5kczogQXJyYXk8c3RyaW5nPjtcbiAgbXNnOiBzdHJpbmc7XG4gIG91dHB1dDogc3RyaW5nO1xufTtcblxuaW50ZXJmYWNlIFNjcmlwdEdvYWwgZXh0ZW5kcyBCYXNlR29hbCB7XG4gIHNjcmlwdDogc3RyaW5nO1xuICBwYXJhbXM6IGFueTtcbn07XG5cbmludGVyZmFjZSBFeGVjR29hbCBleHRlbmRzIEJhc2VHb2FsIHtcbiAgY29tbWFuZDogc3RyaW5nO1xuICBhcmdzOiBBcnJheTxzdHJpbmc+O1xuICBjd2Q6IHN0cmluZztcbn07XG5cbmV4cG9ydCBjbGFzcyBHb2FsQ29sbGVjdGlvbiB7XG4gIHByaXZhdGUgW0VOVFJJRVNdOiBBcnJheTxCYXNlR29hbD47XG5cbiAgcHJpdmF0ZSBjb25zdHJ1Y3RvcigpIHtcbiAgICB0aGlzW0VOVFJJRVNdID0gbmV3IEFycmF5PEJhc2VHb2FsPjtcbiAgfVxuXG4gIHB1YmxpYyBnZXQgRU5UUklFUygpIHtcbiAgICByZXR1cm4gdGhpc1tFTlRSSUVTXTtcbiAgfVxuXG4gIHB1YmxpYyBzdGF0aWMgY3JlYXRlKCkge1xuICAgIHJldHVybiBPYmplY3Quc2VhbChuZXcgR29hbENvbGxlY3Rpb24pO1xuICB9XG5cbiAgcHVibGljIGZpbmRTY3JpcHRCeU91dHB1dChvdXRwdXQ6IHN0cmluZyk6IEJhc2VHb2FsIHwgdW5kZWZpbmVkIHtcbiAgICBpZiAoIW91dHB1dClcbiAgICAgIHJldHVybiB1bmRlZmluZWQ7XG4gICAgcmV0dXJuIHRoaXNbRU5UUklFU10uZmluZCgoaSkgPT4gaS50eXBlID09PSBHb2FsVHlwZS5TQ1JJUFQgJiYgaS5vdXRwdXQgPT09IG91dHB1dCk7XG4gIH1cblxuICBwdWJsaWMgaGFzU2NyaXB0QnlPdXRwdXQob3V0cHV0OiBzdHJpbmcpOiBib29sZWFuIHtcbiAgICByZXR1cm4gISF0aGlzLmZpbmRTY3JpcHRCeU91dHB1dChvdXRwdXQpO1xuICB9XG5cbiAgcHVibGljIGFkZFNjcmlwdChzY3JpcHQ6IHN0cmluZywgbmFtZTogc3RyaW5nLCBkZXBlbmRzOiBBcnJheTxzdHJpbmc+LCBvdXRwdXQ6IHN0cmluZywgcGFyYW1zOiBhbnksIG1zZzogc3RyaW5nKSB7XG4gICAgaWYgKHRoaXMuaGFzU2NyaXB0QnlPdXRwdXQob3V0cHV0LnRvU3RyaW5nKCkpKVxuICAgICAgdGhyb3cgbmV3IEVycm9yKGBPdXRwdXQgXCIke291dHB1dH1cIiBleGlzdHNgKTtcbiAgICB0aGlzW0VOVFJJRVNdLnB1c2goeyBuYW1lLCB0eXBlOiBHb2FsVHlwZS5TQ1JJUFQsIHNjcmlwdCwgb3V0cHV0LCBkZXBlbmRzLCBwYXJhbXMsIG1zZyB9IGFzIFNjcmlwdEdvYWwpO1xuICB9XG5cbiAgcHVibGljIGFkZEV4ZWMob3V0cHV0OiBzdHJpbmcsIGRlcGVuZHM6IEFycmF5PHN0cmluZz4sIGNvbW1hbmQ6IHN0cmluZywgYXJnczogQXJyYXk8c3RyaW5nPiwgY3dkOiBzdHJpbmcsIG1zZzogc3RyaW5nKSB7XG4gICAgdGhpc1tFTlRSSUVTXS5wdXNoKHsgbmFtZTogXCJcIiwgdHlwZTogR29hbFR5cGUuRVhFQywgZGVwZW5kcywgb3V0cHV0LCBjb21tYW5kLCBhcmdzLCBjd2QsIG1zZyB9IGFzIEV4ZWNHb2FsKTtcbiAgfVxuXG4gIHB1YmxpYyBhZGRUYXJnZXQobmFtZTogc3RyaW5nLCBkZXBlbmRzOiBBcnJheTxzdHJpbmc+LCBtc2c6IHN0cmluZykge1xuICAgIHRoaXNbRU5UUklFU10ucHVzaCh7IG5hbWUsIHR5cGU6IEdvYWxUeXBlLlRBUkdFVCwgZGVwZW5kcywgbXNnLCBvdXRwdXQ6IFwiXCIgfSk7XG4gIH1cblxuICBwdWJsaWMgZ2V0VGFyZ2V0KG5hbWU6IHN0cmluZyk6IEJhc2VHb2FsIHwgdW5kZWZpbmVkIHtcbiAgICByZXR1cm4gdGhpc1tFTlRSSUVTXS5maW5kKChpKSA9PiBpLnR5cGUgPT09IEdvYWxUeXBlLlRBUkdFVCAmJiBpLm5hbWUgPT09IG5hbWUpO1xuICB9XG5cbiAgcHJpdmF0ZSBhZGRUYXJnZXRMaXN0SW1wbChuYW1lOiBzdHJpbmcsIHJlc3VsdDogQXJyYXk8QmFzZUdvYWw+KSB7XG4gICAgaWYgKHJlc3VsdC5maW5kKGkgPT4gaS5uYW1lID09PSBuYW1lIHx8IGkub3V0cHV0ID09PSBuYW1lKSkge1xuICAgICAgcmV0dXJuO1xuICAgIH1cbiAgXG4gICAgY29uc3QgZ29hbCA9IHRoaXNbRU5UUklFU10uZmluZChpID0+IGkubmFtZSA9PT0gbmFtZSB8fCBpLm91dHB1dCA9PT0gbmFtZSk7XG4gICAgaWYgKCFnb2FsKSB7XG4gICAgICByZXR1cm47XG4gICAgfVxuICBcbiAgICBmb3IgKGNvbnN0IGl0ZXIgb2YgZ29hbC5kZXBlbmRzKSB7XG4gICAgICB0aGlzLmFkZFRhcmdldExpc3RJbXBsKGl0ZXIudG9TdHJpbmcoKSwgcmVzdWx0KTtcbiAgICB9XG4gIFxuICAgIHJlc3VsdC5wdXNoKGdvYWwpO1xuICB9XG4gIFxuICBwdWJsaWMgZ2V0VGFyZ2V0TGlzdChuYW1lOnN0cmluZykge1xuICAgIGNvbnN0IHJlc3VsdCA9IG5ldyBBcnJheTxCYXNlR29hbD47XG4gICAgdGhpcy5hZGRUYXJnZXRMaXN0SW1wbChuYW1lLCByZXN1bHQpO1xuICAgIHJldHVybiByZXN1bHQ7XG4gIH1cbiAgXG4gIHB1YmxpYyB0b0pTT04oKSB7XG4gICAgcmV0dXJuIHRoaXNbRU5UUklFU107XG4gIH1cblxuICBwdWJsaWMgc3RhdGljIGFzeW5jIGJ1aWxkR29hbHMoY29sbGVjdGlvbjogQXJyYXk8QmFzZUdvYWw+KSB7XG4gICAgbGV0IG1zZ0NvdW50ID0gMDtcbiAgICBmb3IgKGNvbnN0IGl0ZXIgb2YgY29sbGVjdGlvbilcbiAgICAgIG1zZ0NvdW50ICs9IGl0ZXIubXNnID8gMSA6IDA7XG4gIFxuICAgIGxldCBtc2dJbmRleCA9IDA7XG4gICAgZm9yIChjb25zdCBnb2FsIG9mIGNvbGxlY3Rpb24pIHtcbiAgICAgIGNvbnN0IHsgdHlwZSwgbXNnIH0gPSBnb2FsO1xuICAgICAgaWYgKG1zZykge1xuICAgICAgICBjb25zdCByZWxhdGlvbk9mTGVuZ3RoID0gTWF0aC5yb3VuZCgoKyttc2dJbmRleCAvIG1zZ0NvdW50KSAqIDEwMCk7XG4gICAgICAgIGNvbnN0IHBlcmNlbnQgPSBcIltcIiArIHJlbGF0aW9uT2ZMZW5ndGgudG9TdHJpbmcoKS5wYWRTdGFydCgzLCBcIiBcIikgKyBcIiVdIFwiO1xuICAgICAgICBjb25zb2xlLmluZm8ocGVyY2VudCArIG1zZyk7XG4gICAgICB9XG4gICAgICBpZiAodHlwZSA9PT0gR29hbFR5cGUuU0NSSVBUKSB7XG4gICAgICAgIGNvbnN0IHsgc2NyaXB0LCBwYXJhbXMgfSA9IGdvYWwgYXMgU2NyaXB0R29hbDtcbiAgICAgICAgbGV0IG1vZHVsZTtcbiAgICAgICAgaWYgKHNjcmlwdC50b1N0cmluZygpID09PSBwYXRoLnBvc2l4LmpvaW4oX19kaXJuYW1lLCBcIlN5c3RlbVNjcmlwdHMvY29uZmlndXJlX2ZpbGUuanNcIikpXG4gICAgICAgICAgbW9kdWxlID0gY29uZmlndXJlX2ZpbGU7XG4gICAgICAgIGVsc2UgaWYgKHNjcmlwdC50b1N0cmluZygpID09PSBwYXRoLnBvc2l4LmpvaW4oX19kaXJuYW1lLCBcIlN5c3RlbVNjcmlwdHMvaW5zdGFsbF9zY3JpcHQuanNcIikpXG4gICAgICAgICAgbW9kdWxlID0gaW5zdGFsbF9zY3JpcHQ7XG4gICAgICAgIGVsc2VcbiAgICAgICAgICBtb2R1bGUgPSAoYXdhaXQgaW1wb3J0TW9kdWxlKHNjcmlwdC50b1N0cmluZygpKSkuZGVmYXVsdDtcbiAgICAgICAgY29uc3QgcmVzdWx0ID0gbW9kdWxlKHBhcmFtcyk7XG4gICAgICAgIGlmIChyZXN1bHQgaW5zdGFuY2VvZiBQcm9taXNlKSB7XG4gICAgICAgICAgYXdhaXQgcmVzdWx0O1xuICAgICAgICB9XG4gICAgICB9XG4gICAgICBlbHNlIGlmICh0eXBlID09PSBHb2FsVHlwZS5FWEVDKSB7XG4gICAgICAgIGNvbnN0IHsgY29tbWFuZCwgYXJncywgY3dkLCBvdXRwdXQgfSA9IGdvYWwgYXMgRXhlY0dvYWw7XG4gICAgICAgIGZzLm1rZGlyU3luYyhwYXRoLnBvc2l4LmRpcm5hbWUob3V0cHV0KSwgeyByZWN1cnNpdmU6IHRydWUgfSk7XG4gICAgICAgIGNvbnN0IHJlc3VsdCA9IHNwYXduU3luYyhjb21tYW5kLCBhcmdzLCB7IGN3ZCwgZW5jb2Rpbmc6IFwidXRmLThcIiB9KTtcbiAgICAgICAgaWYgKHJlc3VsdC5zdGF0dXMpIHtcbiAgICAgICAgICBjb25zb2xlLmluZm8oXCJjZCBcIiArIGN3ZCk7XG4gICAgICAgICAgbGV0IGNtZCA9IGFyZ3Muam9pbihcIiBcIik7XG4gICAgICAgICAgY21kID0gY29tbWFuZCArIChjbWQgPyBcIiBcIiA6IFwiXCIpICsgY21kO1xuICAgICAgICAgIGNvbnNvbGUuaW5mbyhjbWQpO1xuICAgICAgICAgIGNvbnNvbGUuaW5mbyhcIlwiKTtcbiAgXG4gICAgICAgICAgY29uc29sZS5lcnJvcihyZXN1bHQuc3RkZXJyKTtcbiAgXG4gICAgICAgICAgdGhyb3cgbmV3IEVycm9yKFwiU3RhdHVzIFwiICsgcmVzdWx0LnN0YXR1cyk7XG4gICAgICAgIH1cbiAgICAgIH1cbiAgICAgIGVsc2UgaWYgKHR5cGUgPT09IEdvYWxUeXBlLlRBUkdFVCkge1xuICAgICAgfVxuICAgIH1cbiAgfVxufTtcbiIsIi8qXG4gKiBNSVQgTGljZW5zZVxuICpcbiAqIENvcHlyaWdodCAoYykgMjAyNSAgWXVyaWkgWWFrdWJpbiAoeXVyaWkueWFrdWJpbkBnbWFpbC5jb20pXG4gKlxuICogUGVybWlzc2lvbiBpcyBncmFudGVkIHRvIHVzZSwgY29weSwgbW9kaWZ5LCBhbmQgZGlzdHJpYnV0ZSB0aGlzIHNvZnR3YXJlXG4gKiB1bmRlciB0aGUgTUlUIExpY2Vuc2UuIFNlZSBMSUNFTlNFIGZpbGUgZm9yIGRldGFpbHMuXG4gKi9cblxuY29uc3QgTkFNRSA9IFN5bWJvbChcIk5BTUVcIik7XG5jb25zdCBQQVRIID0gU3ltYm9sKFwiUEFUSFwiKTtcblxuZXhwb3J0IGNsYXNzIEluY2x1ZGVEaXJlY3Rvcnkge1xuICBwcml2YXRlIFtOQU1FXTogYW55O1xuICBwcml2YXRlIFtQQVRIXTogYW55O1xuXG4gIHByaXZhdGUgY29uc3RydWN0b3IoZGlybmFtZTogYW55LCBiYXNlRGlyOiBhbnkpIHtcbiAgICB0aGlzW05BTUVdID0gZGlybmFtZS50b1N0cmluZygpO1xuICAgIHRoaXNbUEFUSF0gPSBiYXNlRGlyLnJlc29sdmUoZGlybmFtZSk7XG4gIH1cblxuICBwdWJsaWMgc3RhdGljIGNyZWF0ZShkaXJuYW1lOiBhbnksIGJhc2VEaXI6IGFueSkge1xuICAgIHJldHVybiBPYmplY3Quc2VhbChuZXcgSW5jbHVkZURpcmVjdG9yeShkaXJuYW1lLCBiYXNlRGlyKSk7XG4gIH1cblxuICBnZXQgTkFNRSgpIHtcbiAgICByZXR1cm4gdGhpc1tOQU1FXTtcbiAgfVxuXG4gIGdldCBQQVRIKCkge1xuICAgIHJldHVybiB0aGlzW1BBVEhdO1xuICB9XG5cbiAgdG9TdHJpbmcoKSB7XG4gICAgcmV0dXJuIHRoaXNbUEFUSF0udG9TdHJpbmcoKTtcbiAgfVxuXG4gIHRvSlNPTigpIHtcbiAgICBjb25zdCBqc29uOiBhbnkgPSB7fTtcbiAgICBmb3IgKGNvbnN0IGtleSBpbiB0aGlzKVxuICAgICAganNvbltrZXldID0gdGhpc1trZXldO1xuICAgIHJldHVybiBqc29uO1xuICB9XG59O1xuIiwiLypcbiAqIE1JVCBMaWNlbnNlXG4gKlxuICogQ29weXJpZ2h0IChjKSAyMDI1ICBZdXJpaSBZYWt1YmluICh5dXJpaS55YWt1YmluQGdtYWlsLmNvbSlcbiAqXG4gKiBQZXJtaXNzaW9uIGlzIGdyYW50ZWQgdG8gdXNlLCBjb3B5LCBtb2RpZnksIGFuZCBkaXN0cmlidXRlIHRoaXMgc29mdHdhcmVcbiAqIHVuZGVyIHRoZSBNSVQgTGljZW5zZS4gU2VlIExJQ0VOU0UgZmlsZSBmb3IgZGV0YWlscy5cbiAqL1xuXG5pbXBvcnQgcGF0aCBmcm9tIFwibm9kZTpwYXRoXCI7XG5pbXBvcnQgdXJsIGZyb20gXCJub2RlOnVybFwiO1xuXG5jb25zdCBQQVRIID0gU3ltYm9sKFwiUEFUSFwiKTtcblxuZW51bSBQYXRoVHlwZSB7XG4gIERpclR5cGUsXG4gIEZpbGVUeXBlLFxufTtcblxuY29uc3QgX3BhdGhNYXAgPSBuZXcgTWFwPHN0cmluZywgUGF0aFR5cGU+KCk7XG5cbmV4cG9ydCBjbGFzcyBBYnNvbHV0ZVBhdGgge1xuICBwcml2YXRlIFtQQVRIXTogc3RyaW5nO1xuXG4gIHByaXZhdGUgY29uc3RydWN0b3IoZmlsZXBhdGg6IHN0cmluZykge1xuICAgIGlmICghcGF0aC5pc0Fic29sdXRlKGZpbGVwYXRoKSlcbiAgICAgIHRocm93IG5ldyBFcnJvcihgTm90IHN1cHBvcnRlZCByZWxhdGl2ZSBwYXRoIG9mIFwiJHtmaWxlcGF0aH1cImApO1xuICAgIHRoaXNbUEFUSF0gPSBmaWxlcGF0aDtcbiAgfVxuXG4gIHB1YmxpYyBqb2luKC4uLnBhdGhzOiBBcnJheTxBYnNvbHV0ZVBhdGggfCBzdHJpbmc+KSB7XG4gICAgY29uc3QgZmlsZXBhdGggPSBwYXRoLnBvc2l4LmpvaW4odGhpc1tQQVRIXSwgLi4ucGF0aHMubWFwKGkgPT4gaS50b1N0cmluZygpKSk7XG4gICAgcmV0dXJuIEFic29sdXRlUGF0aC5jcmVhdGUoZmlsZXBhdGgpO1xuICB9XG5cbiAgcHVibGljIGRpcm5hbWUoKSB7XG4gICAgcmV0dXJuIEFic29sdXRlUGF0aC5jcmVhdGUocGF0aC5wb3NpeC5kaXJuYW1lKHRoaXNbUEFUSF0pKTtcbiAgfVxuXG4gIHB1YmxpYyBiYXNlbmFtZSgpIHtcbiAgICByZXR1cm4gcGF0aC5iYXNlbmFtZSh0aGlzW1BBVEhdKTtcbiAgfVxuXG4gIHB1YmxpYyByZWxhdGl2ZSh0bzogQWJzb2x1dGVQYXRoIHwgc3RyaW5nKSB7XG4gICAgcmV0dXJuIHBhdGgucG9zaXgucmVsYXRpdmUodGhpc1tQQVRIXSwodG8gaW5zdGFuY2VvZiBBYnNvbHV0ZVBhdGgpID8gdG9bUEFUSF0gOiB0byk7XG4gIH1cblxuICBwdWJsaWMgcmVzb2x2ZSguLi5wYXRoczogQXJyYXk8QWJzb2x1dGVQYXRoIHwgc3RyaW5nPikge1xuICAgIHJldHVybiBBYnNvbHV0ZVBhdGguY3JlYXRlKHBhdGgucG9zaXgucmVzb2x2ZSh0aGlzW1BBVEhdLCAuLi5wYXRocy5tYXAoaSA9PiBpLnRvU3RyaW5nKCkpKSk7XG4gIH1cblxuICBwdWJsaWMgbWF0Y2gocmVnZXhwOiBSZWdFeHApIHtcbiAgICByZXR1cm4gdGhpc1tQQVRIXS5tYXRjaChyZWdleHApO1xuICB9XG5cbiAgcHVibGljIHRvVVJMKCkge1xuICAgIHJldHVybiB1cmwucGF0aFRvRmlsZVVSTCh0aGlzW1BBVEhdKTtcbiAgfVxuXG4gIHB1YmxpYyB0b1VSTFN0cmluZygpIHtcbiAgICByZXR1cm4gdGhpcy50b1VSTCgpLnRvU3RyaW5nKCk7XG4gIH1cblxuICBwdWJsaWMgdG9TdHJpbmcoKSB7XG4gICAgcmV0dXJuIHRoaXNbUEFUSF07XG4gIH1cblxuICBwdWJsaWMgdmFsdWVPZigpIHtcbiAgICByZXR1cm4gdGhpc1tQQVRIXTtcbiAgfVxuXG4gIHB1YmxpYyB0b0pTT04oKSB7XG4gICAgcmV0dXJuIHRoaXNbUEFUSF07XG4gIH1cblxuICBwdWJsaWMgc3RhdGljIGlzQWJzb2x1dGUoZmlsZXBhdGg6IEFic29sdXRlUGF0aCB8IHN0cmluZykge1xuICAgIGlmIChmaWxlcGF0aCBpbnN0YW5jZW9mIEFic29sdXRlUGF0aClcbiAgICAgIHJldHVybiB0cnVlO1xuICAgIHJldHVybiBwYXRoLmlzQWJzb2x1dGUoZmlsZXBhdGgpO1xuICB9XG5cbiAgcHVibGljIHN0YXRpYyBjcmVhdGUoZmlsZXBhdGg6IEFic29sdXRlUGF0aCB8IHN0cmluZykge1xuICAgIGlmIChmaWxlcGF0aCBpbnN0YW5jZW9mIEFic29sdXRlUGF0aClcbiAgICAgIHJldHVybiBmaWxlcGF0aDtcbiAgICBpZiAodHlwZW9mIGZpbGVwYXRoICE9PSBcInN0cmluZ1wiKVxuICAgICAgdGhyb3cgbmV3IEVycm9yKGBOb3QgY29ycmVjdCB0eXBlIG9mICR7ZmlsZXBhdGh9YCk7XG4gICAgcmV0dXJuIG5ldyBBYnNvbHV0ZVBhdGgoZmlsZXBhdGgpO1xuICB9XG5cbiAgcHVibGljIHN0YXRpYyBlbnN1cmVJbnN0YW5jZSh2YWx1ZTogYW55KTogQWJzb2x1dGVQYXRoIHtcbiAgICBpZiAodmFsdWUgaW5zdGFuY2VvZiBBYnNvbHV0ZVBhdGgpXG4gICAgICByZXR1cm4gdmFsdWU7XG4gICAgdGhyb3cgbmV3IEVycm9yKGBUaGUgJyR7dmFsdWV9JyBpcyBub3QgYSBBYnNvbHV0ZVBhdGhgKTtcbiAgfVxuXG4gIHB1YmxpYyBzdGF0aWMgY3JlYXRlRGlyKGZpbGVwYXRoOiBBYnNvbHV0ZVBhdGggfCBzdHJpbmcpIHtcbiAgICBjb25zdCBrZXkgPSBmaWxlcGF0aC50b1N0cmluZygpO1xuICAgIGNvbnN0IHR5cGUgPSBfcGF0aE1hcC5nZXQoa2V5KTtcbiAgICBpZiAodHlwZSA9PT0gdW5kZWZpbmVkKVxuICAgICAgX3BhdGhNYXAuc2V0KGtleSwgUGF0aFR5cGUuRGlyVHlwZSk7XG4gICAgZWxzZSBpZiAodHlwZSAhPT0gUGF0aFR5cGUuRGlyVHlwZSlcbiAgICAgIHRocm93IG5ldyBFcnJvcihgVGhlICcke2ZpbGVwYXRofScgaXMgbm90IGEgRGlyUGF0aGApO1xuICAgIHJldHVybiBBYnNvbHV0ZVBhdGguY3JlYXRlKGZpbGVwYXRoKTtcbiAgfVxuXG4gIHB1YmxpYyBzdGF0aWMgY3JlYXRlRmlsZShmaWxlcGF0aDogQWJzb2x1dGVQYXRoIHwgc3RyaW5nKSB7XG4gICAgY29uc3Qga2V5ID0gZmlsZXBhdGgudG9TdHJpbmcoKTtcbiAgICBjb25zdCB0eXBlID0gX3BhdGhNYXAuZ2V0KGtleSk7XG4gICAgaWYgKHR5cGUgPT09IHVuZGVmaW5lZClcbiAgICAgIF9wYXRoTWFwLnNldChrZXksIFBhdGhUeXBlLkZpbGVUeXBlKTtcbiAgICBlbHNlIGlmICh0eXBlICE9PSBQYXRoVHlwZS5GaWxlVHlwZSlcbiAgICAgIHRocm93IG5ldyBFcnJvcihgVGhlICcke2ZpbGVwYXRofScgaXMgbm90IGEgRmlsZVBhdGhgKTtcbiAgICByZXR1cm4gQWJzb2x1dGVQYXRoLmNyZWF0ZShmaWxlcGF0aCk7XG4gIH1cbn07XG5cbmNsYXNzIEJhc2VQYXRoIHtcbiAgcHJpdmF0ZSBbUEFUSF06IHN0cmluZztcblxuICBwcm90ZWN0ZWQgY29uc3RydWN0b3IocGF0aFN0cjogc3RyaW5nKSB7XG4gICAgaWYgKCFwYXRoLmlzQWJzb2x1dGUocGF0aFN0cikpXG4gICAgICB0aHJvdyBuZXcgRXJyb3IoYE5vdCBzdXBwb3J0ZWQgcmVsYXRpdmUgcGF0aCBvZiBcIiR7cGF0aFN0cn1cImApO1xuICAgIHRoaXNbUEFUSF0gPSBwYXRoU3RyO1xuICB9XG5cbiAgcHVibGljIG1hdGNoKHJlZ2V4cDogUmVnRXhwKSB7XG4gICAgcmV0dXJuIHRoaXNbUEFUSF0ubWF0Y2gocmVnZXhwKTtcbiAgfVxuXG4gIHB1YmxpYyBqb2luKC4uLnBhdGhzOiBBcnJheTxhbnk+KSB7XG4gICAgcmV0dXJuIHBhdGgucG9zaXguam9pbih0aGlzW1BBVEhdLCAuLi5wYXRocy5tYXAoaSA9PiBpLnRvU3RyaW5nKCkpKTtcbiAgfVxuXG4gIHB1YmxpYyBkaXJuYW1lKCkge1xuICAgIHJldHVybiBwYXRoLnBvc2l4LmRpcm5hbWUodGhpc1tQQVRIXSk7XG4gIH1cblxuICBwdWJsaWMgYmFzZW5hbWUoKSB7XG4gICAgcmV0dXJuIHBhdGguYmFzZW5hbWUodGhpc1tQQVRIXSk7XG4gIH1cblxuICBwdWJsaWMgcmVsYXRpdmUodG86IGFueSkge1xuICAgIHJldHVybiBwYXRoLnBvc2l4LnJlbGF0aXZlKHRoaXNbUEFUSF0sIHRvLnRvU3RyaW5nKCkpO1xuICB9XG5cbiAgcHVibGljIHJlc29sdmUoLi4ucGF0aHM6IEFycmF5PGFueT4pIHtcbiAgICByZXR1cm4gcGF0aC5wb3NpeC5yZXNvbHZlKHRoaXNbUEFUSF0sIC4uLnBhdGhzLm1hcChpID0+IGkudG9TdHJpbmcoKSkpO1xuICB9XG4gIFxuICBwdWJsaWMgdG9VUkwoKSB7XG4gICAgcmV0dXJuIHVybC5wYXRoVG9GaWxlVVJMKHRoaXNbUEFUSF0pO1xuICB9XG4gIFxuICBwdWJsaWMgZ2V0IFBBVEgoKTogc3RyaW5nIHtcbiAgICByZXR1cm4gdGhpc1tQQVRIXTtcbiAgfVxuXG4gIHB1YmxpYyB0b1N0cmluZygpIHtcbiAgICByZXR1cm4gdGhpc1tQQVRIXTtcbiAgfVxuXG4gIHB1YmxpYyB0b0pTT04oKSB7XG4gICAgcmV0dXJuIHRoaXNbUEFUSF07XG4gIH1cbn07XG5cbmNvbnN0IF9wYXRocyA9IG5ldyBNYXA8c3RyaW5nLCBCYXNlUGF0aD4oKTtcblxuZXhwb3J0IGNsYXNzIEZpbGVQYXRoIGV4dGVuZHMgQmFzZVBhdGgge1xuICBwcml2YXRlIGNvbnN0cnVjdG9yKHBhdGhTdHI6IHN0cmluZykge1xuICAgIHN1cGVyKHBhdGhTdHIpO1xuICB9XG5cbiAgcHVibGljIHN0YXRpYyBlbnN1cmVJbnN0YW5jZSh2YWx1ZTogYW55KTogRmlsZVBhdGgge1xuICAgIGlmICh2YWx1ZSBpbnN0YW5jZW9mIEZpbGVQYXRoKVxuICAgICAgcmV0dXJuIHZhbHVlO1xuICAgIHRocm93IG5ldyBFcnJvcihgVGhlICcke3ZhbHVlfScgaXMgbm90IGEgRmlsZVBhdGhgKTtcbiAgfVxuICBcbiAgcHVibGljIHN0YXRpYyBjcmVhdGUocGF0aDogYW55KTogRmlsZVBhdGgge1xuICAgIGlmIChwYXRoIGluc3RhbmNlb2YgRmlsZVBhdGgpXG4gICAgICByZXR1cm4gcGF0aDtcblxuICAgIGlmICh0eXBlb2YgcGF0aCAhPT0gXCJzdHJpbmdcIilcbiAgICAgIHRocm93IG5ldyBFcnJvcihgVGhlICcke3BhdGh9JyBpcyBub3QgYSBzdHJpbmdgKTtcblxuICAgIGxldCBmaWxlUGF0aCA9IF9wYXRocy5nZXQocGF0aCk7XG4gICAgaWYgKGZpbGVQYXRoKVxuICAgICAgcmV0dXJuIEZpbGVQYXRoLmVuc3VyZUluc3RhbmNlKGZpbGVQYXRoKTtcblxuICAgIGZpbGVQYXRoID0gT2JqZWN0LnNlYWwobmV3IEZpbGVQYXRoKHBhdGgpKTtcbiAgICBfcGF0aHMuc2V0KHBhdGgsIGZpbGVQYXRoKTtcblxuICAgIHJldHVybiBmaWxlUGF0aDtcbiAgfVxufVxuXG5leHBvcnQgY2xhc3MgRGlyUGF0aCBleHRlbmRzIEJhc2VQYXRoIHtcbiAgcHJpdmF0ZSBjb25zdHJ1Y3RvcihwYXRoU3RyOiBzdHJpbmcpIHtcbiAgICBzdXBlcihwYXRoU3RyKTtcbiAgfVxuXG4gIHB1YmxpYyBzdGF0aWMgZW5zdXJlSW5zdGFuY2UodmFsdWU6IGFueSk6IERpclBhdGgge1xuICAgIGlmICh2YWx1ZSBpbnN0YW5jZW9mIERpclBhdGgpXG4gICAgICByZXR1cm4gdmFsdWU7XG4gICAgdGhyb3cgbmV3IEVycm9yKGBUaGUgJyR7dmFsdWV9JyBpcyBub3QgYSBEaXJQYXRoYCk7XG4gIH1cblxuICBwdWJsaWMgc3RhdGljIGNyZWF0ZShwYXRoOiBhbnkpIHtcbiAgICBpZiAocGF0aCBpbnN0YW5jZW9mIERpclBhdGgpXG4gICAgICByZXR1cm4gcGF0aDtcblxuICAgIGlmICh0eXBlb2YgcGF0aCAhPT0gXCJzdHJpbmdcIilcbiAgICAgIHRocm93IG5ldyBFcnJvcihgVGhlICcke3BhdGh9JyBpcyBub3QgYSBzdHJpbmdgKTtcblxuICAgIGxldCBkaXJQYXRoID0gX3BhdGhzLmdldChwYXRoKTtcbiAgICBpZiAoZGlyUGF0aClcbiAgICAgIHJldHVybiBEaXJQYXRoLmVuc3VyZUluc3RhbmNlKGRpclBhdGgpO1xuXG4gICAgZGlyUGF0aCA9IE9iamVjdC5zZWFsKG5ldyBEaXJQYXRoKHBhdGgpKTtcbiAgICBfcGF0aHMuc2V0KHBhdGgsIGRpclBhdGgpO1xuXG4gICAgcmV0dXJuIGRpclBhdGg7XG4gIH1cbn07XG4iLCIvKlxuICogTUlUIExpY2Vuc2VcbiAqXG4gKiBDb3B5cmlnaHQgKGMpIDIwMjUgIFl1cmlpIFlha3ViaW4gKHl1cmlpLnlha3ViaW5AZ21haWwuY29tKVxuICpcbiAqIFBlcm1pc3Npb24gaXMgZ3JhbnRlZCB0byB1c2UsIGNvcHksIG1vZGlmeSwgYW5kIGRpc3RyaWJ1dGUgdGhpcyBzb2Z0d2FyZVxuICogdW5kZXIgdGhlIE1JVCBMaWNlbnNlLiBTZWUgTElDRU5TRSBmaWxlIGZvciBkZXRhaWxzLlxuICovXG5cbmltcG9ydCBvcyBmcm9tIFwibm9kZTpvc1wiO1xuaW1wb3J0IHsgREVCVUdfQlVJTERfVFlQRSwgUkVMRUFTRV9CVUlMRF9UWVBFIH0gZnJvbSBcIkAvY29yZS9UeXBlc1wiO1xuXG5leHBvcnQgZGVmYXVsdCB7XG4gIFNZU1RFTV9OQU1FOiB7XG4gICAgZGVzY3JpcHRpb246IFwiRGVmaW5lcyB0aGUgdGFyZ2V0IE9TIGZvciB0aGUgYnVpbGQsIHVzZWQgaW4gY3Jvc3MtY29tcGlsYXRpb24gYW5kIG5hdGl2ZSBidWlsZHNcIixcbiAgICB2YWx1ZTogXCJMaW51eFwiLFxuICB9LFxuICBTWVNURU1fUFJPQ0VTU09SOiB7XG4gICAgZGVzY3JpcHRpb246IFwiRGVmaW5lcyB0aGUgdGFyZ2V0IENQVSBhcmNoaXRlY3R1cmVcIixcbiAgICB2YWx1ZTogXCJ3YXNtMzJcIixcbiAgfSxcbiAgUFJPSkVDVF9OQU1FOiB7XG4gICAgZGVzY3JpcHRpb246IFwiTmFtZSBvZiB0aGUgY3VycmVudCBwcm9qZWN0XCIsXG4gICAgdmFsdWU6IFwiXCIsXG4gIH0sXG4gIFBST0pFQ1RfVkVSU0lPTjoge1xuICAgIGRlc2NyaXB0aW9uOiBcIlZlcnNpb24gb2YgdGhlIGN1cnJlbnQgcHJvamVjdFwiLFxuICAgIHZhbHVlOiBcIlwiLFxuICB9LFxuICBQUk9KRUNUX0RFU0NSSVBUSU9OOiB7XG4gICAgZGVzY3JpcHRpb246IFwiRGVzY3JpcHRpb24gb2YgdGhlIGN1cnJlbnQgcHJvamVjdFwiLFxuICAgIHZhbHVlOiBcIlwiLFxuICB9LFxuICBQUk9KRUNUX0hPTUVQQUdFX1VSTDoge1xuICAgIGRlc2NyaXB0aW9uOiBcIkhvbWVwYWdlIFVSTCBvZiB0aGUgY3VycmVudCBwcm9qZWN0XCIsXG4gICAgdmFsdWU6IFwiXCIsXG4gIH0sXG4gIFBST0pFQ1RfU09VUkNFX0RJUjoge1xuICAgIGRlc2NyaXB0aW9uOiBcIkFic29sdXRlIHBhdGggdG8gdGhlIHRvcC1sZXZlbCBzb3VyY2UgZGlyZWN0b3J5IG9mIHRoZSBwcm9qZWN0XCIsXG4gICAgdHlwZTogXCJEaXJQYXRoXCIsXG4gIH0sXG4gIFBST0pFQ1RfQklOQVJZX0RJUjoge1xuICAgIGRlc2NyaXB0aW9uOiBcIkFic29sdXRlIHBhdGggdG8gdGhlIHRvcC1sZXZlbCBidWlsZCAoYmluYXJ5KSBkaXJlY3Rvcnkgb2YgdGhlIHByb2plY3RcIixcbiAgICB0eXBlOiBcIkRpclBhdGhcIixcbiAgfSxcbiAgU0NSSVBUX0ZJTEU6IHtcbiAgICBkZXNjcmlwdGlvbjogXCJGdWxsIHBhdGggdG8gdGhlIGN1cnJlbnQgTWFrZVNjcmlwdCBmaWxlIGJlaW5nIHByb2Nlc3NlZFwiLFxuICAgIHR5cGU6IFwiRmlsZVBhdGhcIixcbiAgfSxcbiAgU0NSSVBUX0RJUjoge1xuICAgIGRlc2NyaXB0aW9uOiBcIkRpcmVjdG9yeSBvZiB0aGUgY3VycmVudCBNYWtlU2NyaXB0IGZpbGUgYmVpbmcgcHJvY2Vzc2VkXCIsXG4gICAgdHlwZTogXCJEaXJQYXRoXCIsXG4gIH0sXG4gIFBBQ0tBR0VfRklMRToge1xuICAgIGRlc2NyaXB0aW9uOiBcIkZpbGVuYW1lIG9mIHByb2plY3QgbWFuaWZlc3QgY29udGFpbmluZyBtZXRhZGF0YSBhbmQgZGVwZW5kZW5jaWVzXCIsXG4gICAgdHlwZTogXCJGaWxlUGF0aFwiLFxuICB9LFxuICBDQUNIRV9GSUxFOiB7XG4gICAgZGVzY3JpcHRpb246IFwiRGVmYXVsdCBmaWxlbmFtZSBvZiB0aGUgQml0TWFrZSBjYWNoZSBzdG9yaW5nIHNldHRpbmdzXCIsXG4gICAgdHlwZTogXCJGaWxlUGF0aFwiLFxuICB9LFxuICBCVUlMRF9UWVBFOiB7XG4gICAgZGVzY3JpcHRpb246IFwiU3BlY2lmaWVzIHRoZSBidWlsZCBjb25maWd1cmF0aW9uIGZvciBjb250cm9sbGluZyBvcHRpbWl6YXRpb24gbGV2ZWxzIGFuZCBkZWJ1ZyBpbmZvcm1hdGlvbiBpbiB0aGUgYnVpbGQgcHJvY2Vzc1wiLFxuICAgIHR5cGU6IFsgREVCVUdfQlVJTERfVFlQRSwgUkVMRUFTRV9CVUlMRF9UWVBFIF0sXG4gICAgdmFsdWU6IFJFTEVBU0VfQlVJTERfVFlQRSxcbiAgfSxcbiAgSU5TVEFMTF9QUkVGSVg6IHtcbiAgICBkZXNjcmlwdGlvbjogXCJUaGUgcm9vdCBkaXJlY3Rvcnkgd2hlcmUgZmlsZXMgd2lsbCBiZSBpbnN0YWxsZWQgYnkgZGVmYXVsdFwiLFxuICAgIHR5cGU6IFwiRGlyUGF0aFwiLFxuICAgIHZhbHVlOiBcIi91c3JcIixcbiAgfSxcbiAgREVTVERJUjoge1xuICAgIGRlc2NyaXB0aW9uOiBcIlRlbXBvcmFyeSBpbnN0YWxsYXRpb24gcm9vdFwiLFxuICAgIHR5cGU6IFwiRGlyUGF0aFwiLFxuICB9LFxuICBTT1VSQ0VfRElSOiB7XG4gICAgZGVzY3JpcHRpb246IFwiUGF0aCB0byB0aGUgc291cmNlIGRpcmVjdG9yeSBjdXJyZW50bHkgYmVpbmcgcHJvY2Vzc2VkXCIsXG4gICAgdHlwZTogXCJEaXJQYXRoXCIsXG4gIH0sXG4gIEJJTkFSWV9ESVI6IHtcbiAgICBkZXNjcmlwdGlvbjogXCJQYXRoIHRvIHRoZSBiaW5hcnkgZGlyZWN0b3J5IGN1cnJlbnRseSBiZWluZyBwcm9jZXNzZWRcIixcbiAgICB0eXBlOiBcIkRpclBhdGhcIixcbiAgfSxcbiAgUE9TSVRJT05fSU5ERVBFTkRFTlRfQ09ERToge1xuICAgIGRlc2NyaXB0aW9uOiBcIkVuYWJsZXMgUG9zaXRpb24tSW5kZXBlbmRlbnQgQ29kZSAoUElDKSBmb3IgYnVpbGRpbmcgc2hhcmVkIGxpYnJhcmllc1wiLFxuICAgIHZhbHVlOiBmYWxzZSxcbiAgfSxcbiAgUFJFVkVOVF9JTlNUQUxMX0ZJTEVTOiB7XG4gICAgZGVzY3JpcHRpb246IFwiUHJldmVudCBpbnN0YWxsYXRpb24gb2YgZmlsZXNcIixcbiAgICB2YWx1ZTogZmFsc2UsXG4gIH0sXG4gIEhPU1RfU1lTVEVNX05BTUU6IHtcbiAgICBkZXNjcmlwdGlvbjogXCJTcGVjaWZpZXMgdGhlIE9TIG9mIHRoZSBtYWNoaW5lIHJ1bm5pbmdcIixcbiAgICB2YWx1ZTogb3MudHlwZSgpLFxuICB9LFxuICBJTkNMVURFUzoge1xuICAgIGRlc2NyaXB0aW9uOiBcIlBhdGhzIHNlYXJjaGVkIGZvciBoZWFkZXIgZmlsZXNcIixcbiAgICB0eXBlOiBcImFycmF5XCIsXG4gIH0sXG4gIEFTTV9DT01QSUxFUjoge1xuICAgIGRlc2NyaXB0aW9uOiBcIlBhdGggdG8gdGhlIGFzc2VtYmxlciBjb21waWxlciBkZXRlY3RlZFwiLFxuICAgIHZhbHVlOiBcImNsYW5nXCIsXG4gIH0sXG4gIEFTTV9GTEFHUzoge1xuICAgIGRlc2NyaXB0aW9uOiBcIkZsYWdzIHBhc3NlZCB0byB0aGUgYXNzZW1ibGVyIGNvbXBpbGVyXCIsXG4gICAgdmFsdWU6IFtdLFxuICB9LFxuICBBU01fRkxBR1NfREVCVUc6IHtcbiAgICBkZXNjcmlwdGlvbjogXCJBZGRpdGlvbmFsIGFzc2VtYmxlciBmbGFncyB1c2VkIHdoZW4gYnVpbGRpbmcgaW4gRGVidWcgbW9kZVwiLFxuICAgIHZhbHVlOiBbIFwiLWdcIiBdLFxuICB9LFxuICBBU01fRkxBR1NfUkVMRUFTRToge1xuICAgIGRlc2NyaXB0aW9uOiBcIkFkZGl0aW9uYWwgYXNzZW1ibGVyIGZsYWdzIHVzZWQgd2hlbiBidWlsZGluZyBpbiBSZWxlYXNlIG1vZGVcIixcbiAgICB2YWx1ZTogWyBcIi1PM1wiLCBcIi1ETkRFQlVHXCIgXSxcbiAgfSxcbn07XG4iLCIvKlxuICogTUlUIExpY2Vuc2VcbiAqXG4gKiBDb3B5cmlnaHQgKGMpIDIwMjUgIFl1cmlpIFlha3ViaW4gKHl1cmlpLnlha3ViaW5AZ21haWwuY29tKVxuICpcbiAqIFBlcm1pc3Npb24gaXMgZ3JhbnRlZCB0byB1c2UsIGNvcHksIG1vZGlmeSwgYW5kIGRpc3RyaWJ1dGUgdGhpcyBzb2Z0d2FyZVxuICogdW5kZXIgdGhlIE1JVCBMaWNlbnNlLiBTZWUgTElDRU5TRSBmaWxlIGZvciBkZXRhaWxzLlxuICovXG5cbmV4cG9ydCBjb25zdCBERUJVR19CVUlMRF9UWVBFID0gXCJEZWJ1Z1wiO1xuZXhwb3J0IGNvbnN0IFJFTEVBU0VfQlVJTERfVFlQRSA9IFwiUmVsZWFzZVwiO1xuIiwiLypcbiAqIE1JVCBMaWNlbnNlXG4gKlxuICogQ29weXJpZ2h0IChjKSAyMDI1ICBZdXJpaSBZYWt1YmluICh5dXJpaS55YWt1YmluQGdtYWlsLmNvbSlcbiAqXG4gKiBQZXJtaXNzaW9uIGlzIGdyYW50ZWQgdG8gdXNlLCBjb3B5LCBtb2RpZnksIGFuZCBkaXN0cmlidXRlIHRoaXMgc29mdHdhcmVcbiAqIHVuZGVyIHRoZSBNSVQgTGljZW5zZS4gU2VlIExJQ0VOU0UgZmlsZSBmb3IgZGV0YWlscy5cbiAqL1xuXG5leHBvcnQgaW50ZXJmYWNlIElMb2dnZXIge1xuICB0cmFjZShtZXNzYWdlPzogYW55LCAuLi5wYXJhbXM6IGFueVtdKTogdm9pZDtcbiAgZGVidWcobWVzc2FnZT86IGFueSwgLi4ucGFyYW1zOiBhbnlbXSk6IHZvaWQ7XG4gIGluZm8obWVzc2FnZT86IGFueSwgLi4ucGFyYW1zOiBhbnlbXSk6IHZvaWQ7XG4gIHdhcm4obWVzc2FnZT86IGFueSwgLi4ucGFyYW1zOiBhbnlbXSk6IHZvaWQ7XG4gIGVycm9yKG1lc3NhZ2U/OiBhbnksIC4uLnBhcmFtczogYW55W10pOiB2b2lkO1xufTtcblxuZXhwb3J0IGZ1bmN0aW9uIGNyZWF0ZUxvZ2dlcih1cmw6IHN0cmluZyk6IElMb2dnZXIge1xuICByZXR1cm4ge1xuICAgIHRyYWNlOiBjb25zb2xlLnRyYWNlLmJpbmQoY29uc29sZSksXG4gICAgZGVidWc6IGNvbnNvbGUuZGVidWcuYmluZChjb25zb2xlKSxcbiAgICBpbmZvOiBjb25zb2xlLmluZm8uYmluZChjb25zb2xlKSxcbiAgICB3YXJuOiBjb25zb2xlLndhcm4uYmluZChjb25zb2xlKSxcbiAgICBlcnJvcjogY29uc29sZS5lcnJvci5iaW5kKGNvbnNvbGUpLFxuICB9O1xufVxuIiwiY29uc3Qgb3MgPSByZXF1aXJlKCdub2RlOm9zJyk7XG5jb25zdCBmcyA9IHJlcXVpcmUoJ25vZGU6ZnMnKTtcbmNvbnN0IHBhdGggPSByZXF1aXJlKCdub2RlOnBhdGgnKTtcblxuY29uc3QgeyBzcGF3bkFzeW5jIH0gPSByZXF1aXJlKCcuL0NoaWxkUHJvY2Vzcy5qcycpO1xuY29uc3QgeyBDTUFLRV9MSVNUU19UWFQsIFZhbHVlVHlwZSB9ID0gcmVxdWlyZShcIkAvY21ha2UvQ29uc3RhbnRzXCIpO1xuY29uc3QgeyBjb252ZXJ0VG9WYWx1ZSB9ID0gcmVxdWlyZShcIkAvY21ha2UvSGVscGVyXCIpO1xuXG5mdW5jdGlvbiB0b1ZhclR5cGUoa2V5LCB2YWwpIHtcbiAgY29uc3QgbWFwID0ge1xuICAgIENNQUtFX0lOU1RBTExfUFJFRklYOiBWYWx1ZVR5cGUuUEFUSCxcbiAgICBDTUFLRV9UT09MQ0hBSU5fRklMRTogVmFsdWVUeXBlLkZJTEVQQVRILFxuICB9O1xuXG4gIGlmICh0eXBlb2YgdmFsID09PSBcImJvb2xlYW5cIilcbiAgICByZXR1cm4gVmFsdWVUeXBlLkJPT0w7XG5cbiAgaWYgKG1hcC5oYXNPd25Qcm9wZXJ0eShrZXkpKVxuICAgIHJldHVybiBtYXBba2V5XTtcblxuICByZXR1cm4gVmFsdWVUeXBlLlNUUklORztcbn1cblxuZnVuY3Rpb24gdG9DYWNoZUVudHJ5KG5hbWUsIHZhbClcbntcbiAgY29uc3QgdHlwZSA9IHRvVmFyVHlwZShuYW1lLCB2YWwpO1xuICBjb25zdCB2YWx1ZSA9IGNvbnZlcnRUb1ZhbHVlKHZhbCk7XG4gIHJldHVybiBgJHtuYW1lfToke3R5cGV9PSR7dmFsdWV9YDtcbn1cblxuYXN5bmMgZnVuY3Rpb24gY29uZmlndXJlKGFyZ3MpXG57XG4gIGNvbnN0IHNwYXduQXJncyA9IFsgJy1HJywgYXJncy5nZW5lcmF0b3IgXTtcbiAgZm9yIChjb25zdCBba2V5LCB2YWxdIG9mIE9iamVjdC5lbnRyaWVzKGFyZ3MuY2FjaGVWYXJpYWJsZXMpKVxuICAgIHNwYXduQXJncy5wdXNoKCctRCcsIHRvQ2FjaGVFbnRyeShrZXksIHZhbCkpO1xuICBzcGF3bkFyZ3MucHVzaCgnLVMnLCBhcmdzLnNvdXJjZURpcik7XG4gIHNwYXduQXJncy5wdXNoKCctQicsIGFyZ3MuYmluYXJ5RGlyKTtcblxuICBjb25zdCByZXMgPSBhd2FpdCBzcGF3bkFzeW5jKFwiY21ha2VcIiwgc3Bhd25BcmdzLCB7XG4gICAgY3dkOiBhcmdzLmJpbmFyeURpcixcbiAgICBlbnY6IGFyZ3MuZW52aXJvbm1lbnQgfHwgcHJvY2Vzcy5lbnYsXG4gICAgZXh0cmE6IHtcbiAgICAgIG91dHB1dDogYGNtYWtlLmNvbmZpZ3VyZS5sb2dgLFxuICAgIH0sXG4gIH0pO1xuICBpZiAocmVzLnN0YXR1cyAhPT0gMCkge1xuICAgIHRocm93IGBDTWFrZS5jb25maWd1cmUgcmV0dXJuZWQgc3RhdHVzICR7cmVzLnN0YXR1c31gO1xuICB9XG59XG5cbmFzeW5jIGZ1bmN0aW9uIGJ1aWxkKGFyZ3MpXG57XG4gIGF3YWl0IGNvbmZpZ3VyZShhcmdzKTtcblxuICBjb25zdCBzcGF3bkFyZ3MgPSBbXG4gICAgJy0tYnVpbGQnLCAnLicsXG4gICAgJy0tcGFyYWxsZWwnLCBvcy5hdmFpbGFibGVQYXJhbGxlbGlzbSgpLFxuICBdO1xuICBjb25zdCByZXMgPSBhd2FpdCBzcGF3bkFzeW5jKFwiY21ha2VcIiwgc3Bhd25BcmdzLCB7XG4gICAgY3dkOiBhcmdzLmJpbmFyeURpcixcbiAgICBlbnY6IGFyZ3MuZW52aXJvbm1lbnQgfHwgcHJvY2Vzcy5lbnYsXG4gICAgZXh0cmE6IHtcbiAgICAgIG91dHB1dDogYGNtYWtlLmJ1aWxkLmxvZ2AsXG4gICAgfSxcbiAgfSk7XG4gIGlmIChyZXMuc3RhdHVzICE9PSAwKSB7XG4gICAgdGhyb3cgYENNYWtlLmJ1aWxkIHJldHVybmVkIHN0YXR1cyAke3Jlcy5zdGF0dXN9YDtcbiAgfVxufVxuXG5hc3luYyBmdW5jdGlvbiBpbnN0YWxsKGFyZ3MpXG57XG4gIGF3YWl0IGNvbmZpZ3VyZShhcmdzKTtcblxuICBjb25zdCBzcGF3bkFyZ3MgPSBbXG4gICAgJy0taW5zdGFsbCcsXG4gICAgJy4nLFxuICBdO1xuICBpZiAoYXJncy5pbnN0YWxsRGlyKSB7XG4gICAgc3Bhd25BcmdzLnB1c2goJy0tcHJlZml4JywgYXJncy5pbnN0YWxsRGlyKTtcbiAgfVxuICBjb25zdCByZXMgPSBhd2FpdCBzcGF3bkFzeW5jKFwiY21ha2VcIiwgc3Bhd25BcmdzLCB7XG4gICAgY3dkOiBhcmdzLmJpbmFyeURpcixcbiAgICBlbnY6IGFyZ3MuZW52aXJvbm1lbnQgfHwgcHJvY2Vzcy5lbnYsXG4gICAgZXh0cmE6IHtcbiAgICAgIG91dHB1dDogYGNtYWtlLmluc3RhbGwubG9nYCxcbiAgICB9LFxuICB9KTtcbiAgaWYgKHJlcy5zdGF0dXMgIT09IDApIHtcbiAgICB0aHJvdyBgQ01ha2UuaW5zdGFsbCByZXR1cm5lZCBzdGF0dXMgJHtyZXMuc3RhdHVzfWA7XG4gIH1cbn1cblxuYXN5bmMgZnVuY3Rpb24gY3Rlc3QoYXJncylcbntcbiAgYXdhaXQgYnVpbGQoYXJncyk7XG5cbiAgY29uc3Qgc3Bhd25BcmdzID0gW1xuICBdO1xuICBjb25zdCByZXMgPSBhd2FpdCBzcGF3bkFzeW5jKFwiY3Rlc3RcIiwgc3Bhd25BcmdzLCB7XG4gICAgY3dkOiBhcmdzLmJpbmFyeURpcixcbiAgICBlbnY6IGFyZ3MuZW52aXJvbm1lbnQgfHwgcHJvY2Vzcy5lbnYsXG4gICAgZXh0cmE6IHtcbiAgICAgIG91dHB1dDogYGNtYWtlLmN0ZXN0LmxvZ2AsXG4gICAgfSxcbiAgfSk7XG4gIGlmIChyZXMuc3RhdHVzICE9PSAwKSB7XG4gICAgdGhyb3cgYENUZXN0IHJldHVybmVkIHN0YXR1cyAke3Jlcy5zdGF0dXN9YDtcbiAgfVxufVxuXG5hc3luYyBmdW5jdGlvbiBleHRyYWN0KGFyZ3MpXG57XG4gIGNvbnN0IHNwYXduQXJncyA9IFsgXCItRVwiLCBcInRhclwiLCBcIi14dmZcIiwgYXJncy5maWxlbmFtZSBdO1xuICBjb25zdCByZXMgPSBhd2FpdCBzcGF3bkFzeW5jKFwiY21ha2VcIiwgc3Bhd25BcmdzLCB7XG4gICAgY3dkOiBhcmdzLndvcmtEaXIgfHwgYXJncy5zb3VyY2VEaXIgfHwgYXJncy5iaW5hcnlEaXIsXG4gICAgZW52OiBhcmdzLmVudmlyb25tZW50IHx8IHByb2Nlc3MuZW52LFxuICAgIGV4dHJhOiB7XG4gICAgICBvdXRwdXQ6IGFyZ3MubG9nRmlsZSB8fCBgY21ha2UuZXh0cmFjdC5sb2dgLFxuICAgIH0sXG4gIH0pO1xuICBpZiAocmVzLnN0YXR1cyAhPT0gMCkge1xuICAgIHRocm93IGBFeHRyYWN0IHJldHVybmVkIHN0YXR1cyAke3Jlcy5zdGF0dXN9YDtcbiAgfVxufVxuXG5hc3luYyBmdW5jdGlvbiBnZXRQcm9qZWN0SW5mbyhzb3VyY2UpXG57XG4gIGNvbnN0IHN0YXQgPSBhd2FpdCBmcy5wcm9taXNlcy5zdGF0KHNvdXJjZSk7XG4gIGlmIChzdGF0LmlzRGlyZWN0b3J5KCkpXG4gICAgc291cmNlID0gcGF0aC5yZXNvbHZlKHNvdXJjZSwgQ01BS0VfTElTVFNfVFhUKTtcbiAgY29uc3QgY29udGVudCA9IGF3YWl0IGZzLnByb21pc2VzLnJlYWRGaWxlKHNvdXJjZSwgeyBlbmNvZGluZzogJ3V0ZjgnIH0pO1xuXG4gIGNvbnN0IHByb2plY3RQYXR0ZXJuID0gL3Byb2plY3QgKlxcKCAqKFteIF0rKSAqKFteKV0qKVxcKS87XG4gIGNvbnN0IHZlcnNpb25QYXR0ZXJuID0gL1ZFUlNJT04gKyhbXiBdKykvO1xuICBsZXQgbWF0Y2ggPSBjb250ZW50Lm1hdGNoKHByb2plY3RQYXR0ZXJuKTtcbiAgY29uc3QgbmFtZSA9IG1hdGNoWzFdO1xuICBjb25zdCBwcm9qZWN0Q29udGVudCA9IG1hdGNoWzJdO1xuICBtYXRjaCA9IHByb2plY3RDb250ZW50Lm1hdGNoKHZlcnNpb25QYXR0ZXJuKTtcbiAgY29uc3QgdmVyc2lvbiA9IG1hdGNoWzFdO1xuXG4gIHJldHVybiB7XG4gICAgbmFtZSxcbiAgICB2ZXJzaW9uLFxuICB9O1xufVxuXG5mdW5jdGlvbiBsaW5lVG9TaW5nbENvbW1lbnQobGluZSlcbntcbiAgcmV0dXJuIFwiIyBcIiArIGxpbmU7XG59XG5cbmZ1bmN0aW9uIGxpbmVUb011bHRpcGxlQ29tbWVudChsaW5lKVxue1xuICByZXR1cm4gYCNbPT09WyAke2xpbmV9IF09PT1dYDtcbn1cblxuZnVuY3Rpb24gZ2VuZXJhdGVkU2NyaXB0TmFtZUNvbW1lbnQoZmlsZW5hbWUpXG57XG4gIHJldHVybiBsaW5lVG9TaW5nbENvbW1lbnQoXCJHZW5lcmF0ZWQgZnJvbSBcIiArIHBhdGguYmFzZW5hbWUoZmlsZW5hbWUpKTtcbn1cblxubW9kdWxlLmV4cG9ydHMgPSB7XG4gIGNvbmZpZ3VyZSxcbiAgYnVpbGQsXG4gIGluc3RhbGwsXG4gIGN0ZXN0LFxuICBleHRyYWN0LFxuICBnZXRQcm9qZWN0SW5mbyxcbiAgbGluZVRvU2luZ2xDb21tZW50LFxuICBsaW5lVG9NdWx0aXBsZUNvbW1lbnQsXG4gIGdlbmVyYXRlZFNjcmlwdE5hbWVDb21tZW50LFxufTtcbiIsImNvbnN0IHsgc3Bhd24gfSA9IHJlcXVpcmUoJ2NoaWxkX3Byb2Nlc3MnKTtcbmNvbnN0IGZzID0gcmVxdWlyZSgnZnMnKTtcbmNvbnN0IHBhdGggPSByZXF1aXJlKCdwYXRoJyk7XG5cbmZ1bmN0aW9uIHNwYXduQXN5bmMoY29tbWFuZCwgYXJncywgb3B0aW9ucykge1xuICBsZXQgZmQgPSBudWxsO1xuICBsZXQgdmVyYm9zZSA9IGZhbHNlO1xuICBpZiAob3B0aW9ucyAmJiBvcHRpb25zLmV4dHJhKSB7XG4gICAgaWYgKG9wdGlvbnMuZXh0cmEudmVyYm9zZSlcbiAgICAgIHZlcmJvc2UgPSB0cnVlO1xuICAgIGlmIChvcHRpb25zLmV4dHJhLm91dHB1dCkge1xuICAgICAgbGV0IGxvZ2ZpbGUgPSBvcHRpb25zLmV4dHJhLm91dHB1dDtcbiAgICAgIGlmICghcGF0aC5pc0Fic29sdXRlKGxvZ2ZpbGUpICYmIG9wdGlvbnMuY3dkKSB7XG4gICAgICAgIGxvZ2ZpbGUgPSBwYXRoLnJlc29sdmUob3B0aW9ucy5jd2QsIGxvZ2ZpbGUpO1xuICAgICAgfVxuICAgICAgZmQgPSBmcy5vcGVuU3luYyhsb2dmaWxlLCAndysnLCAwbzY2Nik7XG4gICAgfVxuICB9XG4gIHJldHVybiBuZXcgUHJvbWlzZSgocmVzb2x2ZSwgcmVqZWN0KSA9PiB7XG4gICAgaWYgKGZkIHx8IHZlcmJvc2UpIHtcbiAgICAgIHZlcmJvc2UgJiYgY29uc29sZS5pbmZvKFsgcGF0aC5iYXNlbmFtZShjb21tYW5kKSwgLi4uYXJncyBdLmpvaW4oJyAnKSk7XG4gICAgICBmZCAmJiBmcy53cml0ZVN5bmMoZmQsIEpTT04uc3RyaW5naWZ5KHtjb21tYW5kLCBhcmdzLCBvcHRpb25zIH0sIG51bGwsIDIpICsgXCJcXG5cIik7XG4gICAgfVxuICAgIGNvbnN0IGV4ZWMgPSBzcGF3bihjb21tYW5kLCBhcmdzLCBvcHRpb25zKTtcbiAgICBleGVjLnN0ZG91dC5vbignZGF0YScsIChkYXRhKSA9PiB7XG4gICAgICBwcm9jZXNzLnN0ZG91dC53cml0ZShkYXRhKTtcbiAgICAgIGZkICYmIGZzLndyaXRlU3luYyhmZCwgZGF0YSk7XG4gICAgfSk7XG4gICAgZXhlYy5zdGRlcnIub24oJ2RhdGEnLCAoZGF0YSkgPT4ge1xuICAgICAgcHJvY2Vzcy5zdGRlcnIud3JpdGUoZGF0YSk7XG4gICAgICBmZCAmJiBmcy53cml0ZVN5bmMoZmQsIGRhdGEpO1xuICAgIH0pO1xuICAgIGV4ZWMub24oJ2Nsb3NlJywgKHN0YXR1cykgPT4ge1xuICAgICAgZmQgJiYgZnMuY2xvc2VTeW5jKGZkKTtcbiAgICAgIHJlc29sdmUoe3N0YXR1c30pO1xuICAgIH0pO1xuICB9KTtcbn1cblxubW9kdWxlLmV4cG9ydHMgPSB7XG4gIHNwYXduQXN5bmMsXG59O1xuIiwiLypcbiAqIE1JVCBMaWNlbnNlXG4gKlxuICogQ29weXJpZ2h0IChjKSAyMDI1ICBZdXJpaSBZYWt1YmluICh5dXJpaS55YWt1YmluQGdtYWlsLmNvbSlcbiAqXG4gKiBQZXJtaXNzaW9uIGlzIGdyYW50ZWQgdG8gdXNlLCBjb3B5LCBtb2RpZnksIGFuZCBkaXN0cmlidXRlIHRoaXMgc29mdHdhcmVcbiAqIHVuZGVyIHRoZSBNSVQgTGljZW5zZS4gU2VlIExJQ0VOU0UgZmlsZSBmb3IgZGV0YWlscy5cbiAqL1xuXG5pbXBvcnQgZnMgZnJvbSBcIm5vZGU6ZnNcIjtcbmltcG9ydCBwYXRoIGZyb20gXCJub2RlOnBhdGhcIjtcbmltcG9ydCB1cmwgZnJvbSBcIm5vZGU6dXJsXCI7XG5cbmV4cG9ydCBhc3luYyBmdW5jdGlvbiBwYXRoRXhpc3RzKHBhdGg6IHN0cmluZykge1xuICB0cnkge1xuICAgIHJldHVybiAhIShhd2FpdCBmcy5wcm9taXNlcy5zdGF0KHBhdGgpKTtcbiAgfSBjYXRjaCB7XG4gICAgcmV0dXJuIGZhbHNlO1xuICB9XG59XG5cbmV4cG9ydCBmdW5jdGlvbiBwYXRoRXhpc3RzU3luYyhwYXRoOiBzdHJpbmcpIHtcbiAgdHJ5IHtcbiAgICByZXR1cm4gISFmcy5zdGF0U3luYyhwYXRoKTtcbiAgfSBjYXRjaCB7XG4gICAgcmV0dXJuIGZhbHNlO1xuICB9XG59XG5cbmV4cG9ydCBhc3luYyBmdW5jdGlvbiBmaWxlRXhpc3RzKHBhdGg6IHN0cmluZykge1xuICB0cnkge1xuICAgIHJldHVybiAoYXdhaXQgZnMucHJvbWlzZXMuc3RhdChwYXRoKSkuaXNGaWxlKCk7XG4gIH0gY2F0Y2gge1xuICAgIHJldHVybiBmYWxzZTtcbiAgfVxufVxuXG5leHBvcnQgZnVuY3Rpb24gZmlsZUV4aXN0c1N5bmMocGF0aDogc3RyaW5nKSB7XG4gIHRyeSB7XG4gICAgcmV0dXJuIGZzLnN0YXRTeW5jKHBhdGgpLmlzRmlsZSgpO1xuICB9IGNhdGNoIHtcbiAgICByZXR1cm4gZmFsc2U7XG4gIH0gXG59XG5cbmV4cG9ydCBhc3luYyBmdW5jdGlvbiBkaXJlY3RvcnlFeGlzdHMocGF0aDogc3RyaW5nKSB7XG4gIHRyeSB7XG4gICAgcmV0dXJuIChhd2FpdCBmcy5wcm9taXNlcy5zdGF0KHBhdGgpKS5pc0RpcmVjdG9yeSgpO1xuICB9IGNhdGNoIHtcbiAgICByZXR1cm4gZmFsc2U7XG4gIH1cbn1cblxuZXhwb3J0IGZ1bmN0aW9uIGRpcmVjdG9yeUV4aXN0c1N5bmMocGF0aDogc3RyaW5nKSB7XG4gIHRyeSB7XG4gICByZXR1cm4gZnMuc3RhdFN5bmMocGF0aCkuaXNEaXJlY3RvcnkoKTtcbiAgfSBjYXRjaCB7XG4gICAgcmV0dXJuIGZhbHNlO1xuICB9XG59XG5cbmV4cG9ydCBmdW5jdGlvbiBleHRuYW1lKGZ1bGxwYXRoOiBzdHJpbmcsIG9wdGlvbnM6IGFueSkge1xuICBpZiAob3B0aW9ucz8ubG9uZ2VzdCkge1xuICAgIGNvbnN0IGZpbGVuYW1lID0gcGF0aC5iYXNlbmFtZShmdWxscGF0aCk7XG4gICAgY29uc3QgaW5kZXggPSBmaWxlbmFtZS5pbmRleE9mKCcuJyk7XG4gICAgcmV0dXJuIGluZGV4ICE9IC0xID8gZmlsZW5hbWUuc3Vic3RyaW5nKGluZGV4KSA6ICcnO1xuICB9XG5cbiAgcmV0dXJuIHBhdGguZXh0bmFtZShmdWxscGF0aCk7XG59XG5cbmV4cG9ydCBhc3luYyBmdW5jdGlvbiBmaWxlTGlzdChkaXJuYW1lOiBzdHJpbmcsIG9wdGlvbnM6IGFueSk6IFByb21pc2U8QXJyYXk8c3RyaW5nPj4ge1xuICBjb25zdCBsaXN0ID0gbmV3IEFycmF5PHN0cmluZz47XG4gIGlmIChhd2FpdCBkaXJlY3RvcnlFeGlzdHMoZGlybmFtZSkpIHtcbiAgICBmb3IgKGNvbnN0IGl0ZXIgb2YgYXdhaXQgZnMucHJvbWlzZXMucmVhZGRpcihkaXJuYW1lKSkge1xuICAgICAgY29uc3QgZmlsZXBhdGggPSBwYXRoLnJlc29sdmUoZGlybmFtZSwgaXRlcik7XG4gICAgICBjb25zdCBzdGF0ID0gYXdhaXQgZnMucHJvbWlzZXMuc3RhdChmaWxlcGF0aCk7XG4gICAgICBpZiAoc3RhdC5pc0ZpbGUoKSkge1xuICAgICAgICBsaXN0LnB1c2gob3B0aW9ucy5yZWxhdGl2ZSA/IHBhdGgucmVsYXRpdmUob3B0aW9ucy5yZWxhdGl2ZSwgZmlsZXBhdGgpIDogZmlsZXBhdGgpO1xuICAgICAgfVxuICAgICAgZWxzZSBpZiAob3B0aW9ucy5yZWN1cnNpdmUgJiYgc3RhdC5pc0RpcmVjdG9yeSgpKSB7XG4gICAgICAgIGZvciAoY29uc3QgZm5hbWUgb2YgYXdhaXQgZmlsZUxpc3QoZmlsZXBhdGgsIG9wdGlvbnMpKVxuICAgICAgICAgIGxpc3QucHVzaChmbmFtZSk7XG4gICAgICB9XG4gICAgfVxuICB9XG4gIHJldHVybiBsaXN0O1xufVxuXG5leHBvcnQgYXN5bmMgZnVuY3Rpb24gc2F2ZUlmRGlmZmVyZW50KGZpbGVuYW1lOiBzdHJpbmcsIGNvbnRlbnQ6IHN0cmluZykge1xuICBpZiAoYXdhaXQgZmlsZUV4aXN0cyhmaWxlbmFtZSkpIHtcbiAgICBjb25zdCBvbGRDb250ZW50ID0gYXdhaXQgZnMucHJvbWlzZXMucmVhZEZpbGUoZmlsZW5hbWUsIHsgZW5jb2Rpbmc6IFwidXRmOFwiIH0pO1xuICAgIGlmIChjb250ZW50ID09IG9sZENvbnRlbnQpXG4gICAgICByZXR1cm4gZmFsc2U7XG4gIH1cblxuICBhd2FpdCBmcy5wcm9taXNlcy5ta2RpcihwYXRoLmRpcm5hbWUoZmlsZW5hbWUpLCB7IHJlY3Vyc2l2ZTogdHJ1ZSB9KTtcbiAgYXdhaXQgZnMucHJvbWlzZXMud3JpdGVGaWxlKGZpbGVuYW1lLCBjb250ZW50LCB7IGVuY29kaW5nOiBcInV0ZjhcIiB9KTtcblxuICByZXR1cm4gdHJ1ZTtcbn1cblxuZXhwb3J0IGZ1bmN0aW9uIGdldFBhdGhTdHJpbmcoc3RyOiBzdHJpbmcpIHtcbiAgcmV0dXJuIHN0ci5zdGFydHNXaXRoKFwiZmlsZTovL1wiKSA/IHVybC5maWxlVVJMVG9QYXRoKHN0cikgOiBzdHI7XG59XG4iLCIvKlxuICogTUlUIExpY2Vuc2VcbiAqXG4gKiBDb3B5cmlnaHQgKGMpIDIwMjUgIFl1cmlpIFlha3ViaW4gKHl1cmlpLnlha3ViaW5AZ21haWwuY29tKVxuICpcbiAqIFBlcm1pc3Npb24gaXMgZ3JhbnRlZCB0byB1c2UsIGNvcHksIG1vZGlmeSwgYW5kIGRpc3RyaWJ1dGUgdGhpcyBzb2Z0d2FyZVxuICogdW5kZXIgdGhlIE1JVCBMaWNlbnNlLiBTZWUgTElDRU5TRSBmaWxlIGZvciBkZXRhaWxzLlxuICovXG5cbmltcG9ydCBwYXRoIGZyb20gXCJub2RlOnBhdGhcIjtcbmltcG9ydCBmcyBmcm9tIFwibm9kZTpmc1wiO1xuaW1wb3J0IGh0dHAgZnJvbSBcImh0dHBcIjtcbmltcG9ydCBodHRwcyBmcm9tIFwiaHR0cHNcIjtcblxuaW1wb3J0IHsgY3JlYXRlTG9nZ2VyIH0gZnJvbSBcIkAvbG9nZ2VyXCI7XG5cbmNvbnN0IGxvZ2dlciA9IGNyZWF0ZUxvZ2dlcihpbXBvcnQubWV0YS51cmwpO1xuXG5jb25zdCBodHRwT3B0aW9ucyA9IHtcbiAgbWV0aG9kOiAnR0VUJyxcbiAgdGltZW91dDogNTAwMCxcbiAgaGVhZGVyczoge1xuICAgIFwiVXNlci1BZ2VudFwiOiBQUk9KRUNUX05BTUUgKyBcIi9cIiArIFBST0pFQ1RfVkVSU0lPTixcbiAgICBcIkFjY2VwdFwiOiBcIiovKlwiLFxuICB9LFxufTtcblxuZnVuY3Rpb24gaHR0cFJlcXVlc3QodXJsOiBzdHJpbmcsIG9wdGlvbnM6IGh0dHAuUmVxdWVzdE9wdGlvbnMgfCBodHRwcy5SZXF1ZXN0T3B0aW9ucywgY2FsbGJhY2s6IGFueSkge1xuICBpZiAodXJsLnN0YXJ0c1dpdGgoXCJodHRwczovL1wiKSlcbiAgICByZXR1cm4gaHR0cHMucmVxdWVzdCh1cmwsIG9wdGlvbnMsIGNhbGxiYWNrKTtcbiAgcmV0dXJuIGh0dHAucmVxdWVzdCh1cmwsIG9wdGlvbnMsIGNhbGxiYWNrKTtcbn07XG5cbmV4cG9ydCBmdW5jdGlvbiByZXF1ZXN0R2V0KHVybDogc3RyaW5nKSB7XG4gIHJldHVybiBuZXcgUHJvbWlzZSgocmVzb2x2ZSwgcmVqZWN0KSA9PiB7XG5cbiAgICBjb25zdCBvbkVycm9yID0gKGVycjogYW55KSA9PiB7XG4gICAgICBjb25zdCBtZXNzYWdlID0gXCJFbmNvdW50ZXJlZCBhbiBlcnJvciB0cnlpbmcgdG8gbWFrZSBhIHJlcXVlc3Q6IFwiICsgZXJyLm1lc3NhZ2U7XG4gICAgICBsb2dnZXIuZXJyb3IobWVzc2FnZSwgZXJyKTtcbiAgICAgIHJlamVjdChtZXNzYWdlKTtcbiAgICB9O1xuXG4gICAgY29uc3Qgb25UaW1lb3V0ID0gKHJlcXVlc3Q6IGFueSkgPT4ge1xuICAgICAgcmVxdWVzdC5kZXN0cm95KCk7XG4gICAgICBsb2dnZXIuZXJyb3IoXCIgIFRpbWVvdXRcIiwgdXJsKTtcbiAgICAgIHJlamVjdChcIlRpbWVvdXRcIik7XG4gICAgfVxuXG4gICAgY29uc3Qgb25SZXF1ZXN0ID0gKHJlc3BvbnNlOiBhbnkpID0+IHtcbiAgICAgIHN3aXRjaCAocmVzcG9uc2Uuc3RhdHVzQ29kZSkge1xuICAgICAgY2FzZSAyMDA6XG4gICAgICAgIGNvbnN0IGNodW5rczogQXJyYXk8QnVmZmVyPiA9IFtdO1xuICAgICAgICByZXNwb25zZS5vbihcImRhdGFcIiwgKGNodW5rOiBCdWZmZXIpID0+IGNodW5rcy5wdXNoKGNodW5rKSk7XG4gICAgICAgIHJlc3BvbnNlLm9uKFwiZW5kXCIsICgpID0+IHJlc29sdmUoQnVmZmVyLmNvbmNhdChjaHVua3MpKSk7XG4gICAgICAgIHJlc3BvbnNlLm9uKCdjbG9zZScsICgpID0+IGxvZ2dlci5pbmZvKCcgIENsb3NlJykpO1xuICAgICAgICBicmVhaztcblxuICAgICAgY2FzZSAzMDE6XG4gICAgICBjYXNlIDMwMjpcbiAgICAgICAgcmVzcG9uc2UucmVzdW1lKCk7XG4gICAgICAgIGxvZ2dlci5pbmZvKGBSZWRpcmVjdCB0byAke3Jlc3BvbnNlLmhlYWRlcnMubG9jYXRpb259YCk7XG4gICAgICAgIGNvbnN0IHJlcXVlc3QgPSBodHRwUmVxdWVzdChyZXNwb25zZS5oZWFkZXJzLmxvY2F0aW9uLCBodHRwT3B0aW9ucywgb25SZXF1ZXN0KTtcbiAgICAgICAgcmVxdWVzdC5vbigndGltZW91dCcsIG9uVGltZW91dC5iaW5kKG51bGwsIHJlcXVlc3QpKTtcbiAgICAgICAgcmVxdWVzdC5vbignZXJyb3InLCBvbkVycm9yKTtcbiAgICAgICAgcmVxdWVzdC5lbmQoKTtcbiAgICAgICAgYnJlYWs7XG5cbiAgICAgIGRlZmF1bHQ6XG4gICAgICAgIHJlc3BvbnNlLnJlc3VtZSgpO1xuICAgICAgICBjb25zdCBtZXNzYWdlID0gXCJEaWQgbm90IGdldCBhbiBPSyBmcm9tIHRoZSBzZXJ2ZXIuIENvZGU6IFwiICsgcmVzcG9uc2Uuc3RhdHVzQ29kZTtcbiAgICAgICAgbG9nZ2VyLmVycm9yKG1lc3NhZ2UpO1xuICAgICAgICByZWplY3QobWVzc2FnZSk7XG4gICAgICAgIGJyZWFrO1xuICAgICAgfVxuICAgIH07XG5cbiAgICBsb2dnZXIuaW5mbyhgd2dldCAke3VybH1gKTtcbiAgICBjb25zdCByZXF1ZXN0ID0gaHR0cFJlcXVlc3QodXJsLCBodHRwT3B0aW9ucywgb25SZXF1ZXN0KTtcbiAgICByZXF1ZXN0Lm9uKCd0aW1lb3V0Jywgb25UaW1lb3V0LmJpbmQobnVsbCwgcmVxdWVzdCkpO1xuICAgIHJlcXVlc3Qub24oJ2Vycm9yJywgb25FcnJvcik7XG4gICAgcmVxdWVzdC5lbmQoKTtcbiAgfSk7XG59O1xuXG5leHBvcnQgZnVuY3Rpb24gZG93bmxvYWRGaWxlKHVybDogc3RyaW5nLCBmaWxlOiBzdHJpbmcpIHtcbiAgcmV0dXJuIG5ldyBQcm9taXNlKChyZXNvbHZlLCByZWplY3QpID0+IHtcbiAgICBjb25zdCBmaWxlbmFtZSA9IHBhdGguYmFzZW5hbWUodXJsKTtcblxuICAgIGNvbnN0IGNsaWVudCA9ICgoKSA9PiB7XG4gICAgICBpZiAoZmlsZSkge1xuICAgICAgICBjb25zdCBmZCA9IGZzLm9wZW5TeW5jKGZpbGUsIFwid1wiKTtcbiAgICAgICAgcmV0dXJuIHtcbiAgICAgICAgICBvbkRhdGE6IChjaHVuazogQnVmZmVyKSA9PiB7XG4gICAgICAgICAgICBmcy53cml0ZVN5bmMoZmQsIGNodW5rKTtcbiAgICAgICAgICB9LFxuICAgICAgICAgIG9uRW5kOiAoKSA9PiB7XG4gICAgICAgICAgICBmcy5jbG9zZVN5bmMoZmQpO1xuICAgICAgICAgICAgcmVzb2x2ZSh1bmRlZmluZWQpO1xuICAgICAgICAgIH0sXG4gICAgICAgIH07XG4gICAgICB9XG4gICAgICBlbHNlIHtcbiAgICAgICAgY29uc3QgY2h1bmtzOiBBcnJheTxCdWZmZXI+ID0gW107XG4gICAgICAgIHJldHVybiB7XG4gICAgICAgICAgb25EYXRhOiAoY2h1bms6IEJ1ZmZlcikgPT4ge1xuICAgICAgICAgICAgY2h1bmtzLnB1c2goY2h1bmspO1xuICAgICAgICAgIH0sXG4gICAgICAgICAgb25FbmQ6ICgpID0+IHtcbiAgICAgICAgICAgIHJlc29sdmUoQnVmZmVyLmNvbmNhdChjaHVua3MpKTtcbiAgICAgICAgICB9LFxuICAgICAgICB9O1xuICAgICAgfVxuICAgIH0pKCk7XG4gIFxuICAgIGNvbnN0IHN0YXJ0UmVxdWVzdCA9ICh1cmw6IHN0cmluZywgY2FsbGJhY2s6IGFueSkgPT4ge1xuICAgICAgY29uc3QgcmVxdWVzdCA9IGh0dHBzLnJlcXVlc3QodXJsLCBodHRwT3B0aW9ucywgY2FsbGJhY2spO1xuICAgICAgaWYgKHJlcXVlc3QpIHtcbiAgICAgICAgcmVxdWVzdC5vbignZXJyb3InLCAoZXJyb3IpID0+IHJlamVjdChlcnJvcikpO1xuICAgICAgICByZXF1ZXN0LmVuZCgpOyBcbiAgICAgIH1cbiAgICAgIGVsc2Uge1xuICAgICAgICByZWplY3QoYFVybCBzY2hlbWUgbm90IHN1cHBvcnRlZCBmb3IgJHt1cmx9YCk7XG4gICAgICB9XG4gICAgfTtcblxuICAgIGNvbnN0IG9uUmVxdWVzdCA9IChyZXNwb25zZTogYW55KSA9PiB7XG4gICAgICBzd2l0Y2ggKHJlc3BvbnNlLnN0YXR1c0NvZGUpIHtcbiAgICAgIGNhc2UgMjAwOlxuICAgICAgICBsb2dnZXIuaW5mbyhgQ29ubmN0ZWQgdG8gJHtyZXNwb25zZS5yZXEuaG9zdH1gKTtcbiAgICAgICAgbG9nZ2VyLmluZm8oYERvd25sb2FkaW5nICR7ZmlsZW5hbWV9YCk7XG4gICAgICAgIHJlc3BvbnNlLm9uKCdkYXRhJywgY2xpZW50Lm9uRGF0YSk7XG4gICAgICAgIHJlc3BvbnNlLm9uKCdlbmQnLCBjbGllbnQub25FbmQpO1xuICAgICAgICByZXNwb25zZS5vbignY2xvc2UnLCAoKSA9PiBsb2dnZXIuaW5mbyhgRG9uZWApKTtcbiAgICAgICAgYnJlYWs7XG5cbiAgICAgIGNhc2UgMzAxOlxuICAgICAgY2FzZSAzMDI6XG4gICAgICAgIHJlc3BvbnNlLnJlc3VtZSgpO1xuICAgICAgICBsb2dnZXIuaW5mbyhgUmVzb2x2aW5nICR7cmVzcG9uc2UuaGVhZGVycy5sb2NhdGlvbn1gKTtcbiAgICAgICAgc3RhcnRSZXF1ZXN0KHJlc3BvbnNlLmhlYWRlcnMubG9jYXRpb24sIG9uUmVxdWVzdCk7XG4gICAgICAgIGJyZWFrO1xuXG4gICAgICBkZWZhdWx0OlxuICAgICAgICByZXNwb25zZS5yZXN1bWUoKTtcbiAgICAgICAgcmVqZWN0KGBEaWQgbm90IGdldCBhbiBPSyBmcm9tIHRoZSBzZXJ2ZXIuIENvZGU6ICR7cmVzcG9uc2Uuc3RhdHVzQ29kZX1gKTtcbiAgICAgICAgYnJlYWs7XG4gICAgICB9XG4gICAgfTtcblxuICAgIGxvZ2dlci5pbmZvKGBSZXF1ZXN0IHRvICR7dXJsfWApO1xuICAgIHN0YXJ0UmVxdWVzdCh1cmwsIG9uUmVxdWVzdCk7XG4gIH0pO1xufVxuIiwiLypcbiAqIE1JVCBMaWNlbnNlXG4gKlxuICogQ29weXJpZ2h0IChjKSAyMDI1ICBZdXJpaSBZYWt1YmluICh5dXJpaS55YWt1YmluQGdtYWlsLmNvbSlcbiAqXG4gKiBQZXJtaXNzaW9uIGlzIGdyYW50ZWQgdG8gdXNlLCBjb3B5LCBtb2RpZnksIGFuZCBkaXN0cmlidXRlIHRoaXMgc29mdHdhcmVcbiAqIHVuZGVyIHRoZSBNSVQgTGljZW5zZS4gU2VlIExJQ0VOU0UgZmlsZSBmb3IgZGV0YWlscy5cbiAqL1xuXG5leHBvcnQgY29uc3QgaW1wb3J0TW9kdWxlID0gYXN5bmMgKG5hbWUpID0+IGltcG9ydCgvKiB3ZWJwYWNrSWdub3JlOiB0cnVlICovIG5hbWUpO1xuIiwiaW1wb3J0IGZzIGZyb20gXCJub2RlOmZzXCI7XG5pbXBvcnQgcGF0aCBmcm9tIFwibm9kZTpwYXRoXCI7XG5cbmltcG9ydCB7IGZpbGVMaXN0IH0gZnJvbSBcIkAvdXRpbHMvRmlsZVN5c3RlbVwiO1xuaW1wb3J0IHsgY3JlYXRlTG9nZ2VyIH0gZnJvbSBcIkAvbG9nZ2VyXCI7XG5cbmNvbnN0IGxvZ2dlciA9IGNyZWF0ZUxvZ2dlcihpbXBvcnQubWV0YS51cmwpO1xuXG5leHBvcnQgYXN5bmMgZnVuY3Rpb24gbWFrZVBhdGNoKHNyY0RpciwgZGVzdERpcikge1xuICBsb2dnZXIuaW5mbyhgTWFrZSBwYXRjaCAke3NyY0Rpcn0gdG8gJHtkZXN0RGlyfWApO1xuICBjb25zdCBsaXN0ID0gYXdhaXQgZmlsZUxpc3Qoc3JjRGlyLCB7IHJlbGF0aXZlOiBzcmNEaXIsIHJlY3Vyc2l2ZTogdHJ1ZSB9KTtcbiAgZm9yIChjb25zdCBpdGVyIG9mIGxpc3QpIHtcbiAgICBjb25zdCBzb3VyY2UgPSBwYXRoLnJlc29sdmUoc3JjRGlyLCBpdGVyKTtcbiAgICBjb25zdCBkZXN0aW5hdGlvbiA9IHBhdGgucmVzb2x2ZShkZXN0RGlyLCBpdGVyKTtcbiAgICBhd2FpdCBmcy5wcm9taXNlcy5jcChzb3VyY2UsIGRlc3RpbmF0aW9uLCB7IGZvcmNlOiB0cnVlIH0pO1xuICAgIGxvZ2dlci5pbmZvKGAgUmVwbGFjZWQgJHtpdGVyfWApO1xuICB9XG59XG4iLCIvKlxuICogTUlUIExpY2Vuc2VcbiAqXG4gKiBDb3B5cmlnaHQgKGMpIDIwMjUgIFl1cmlpIFlha3ViaW4gKHl1cmlpLnlha3ViaW5AZ21haWwuY29tKVxuICpcbiAqIFBlcm1pc3Npb24gaXMgZ3JhbnRlZCB0byB1c2UsIGNvcHksIG1vZGlmeSwgYW5kIGRpc3RyaWJ1dGUgdGhpcyBzb2Z0d2FyZVxuICogdW5kZXIgdGhlIE1JVCBMaWNlbnNlLiBTZWUgTElDRU5TRSBmaWxlIGZvciBkZXRhaWxzLlxuICovXG5cbmNvbnN0IHJlcXVpcmVJbXBsID0gZXZhbChcInJlcXVpcmVcIik7XG5cbmV4cG9ydCBmdW5jdGlvbiByZXF1aXJlUmVzb2x2ZShuYW1lOiBzdHJpbmcpIHtcbiAgaWYgKHR5cGVvZiBpbXBvcnQubWV0YS5yZXNvbHZlID09PSAnZnVuY3Rpb24nKVxuICAgIHJldHVybiBpbXBvcnQubWV0YS5yZXNvbHZlKG5hbWUpO1xuICBpZiAodHlwZW9mIHJlcXVpcmVJbXBsICE9PSAndW5kZWZpbmVkJylcbiAgICByZXR1cm4gcmVxdWlyZUltcGwucmVzb2x2ZShuYW1lKTtcbiAgdGhyb3cgbmV3IEVycm9yKFwiTm8gY29tcGF0aWJsZSBtb2R1bGUgcmVzb2x2ZXIgZm91bmRcIik7XG59XG5cbmV4cG9ydCB7IGltcG9ydE1vZHVsZSB9IGZyb20gXCIuL0ltcG9ydE1vZHVsZS5tanNcIjtcbiIsIi8qXG4gKiBNSVQgTGljZW5zZVxuICpcbiAqIENvcHlyaWdodCAoYykgMjAyNSAgWXVyaWkgWWFrdWJpbiAoeXVyaWkueWFrdWJpbkBnbWFpbC5jb20pXG4gKlxuICogUGVybWlzc2lvbiBpcyBncmFudGVkIHRvIHVzZSwgY29weSwgbW9kaWZ5LCBhbmQgZGlzdHJpYnV0ZSB0aGlzIHNvZnR3YXJlXG4gKiB1bmRlciB0aGUgTUlUIExpY2Vuc2UuIFNlZSBMSUNFTlNFIGZpbGUgZm9yIGRldGFpbHMuXG4gKi9cblxuZXhwb3J0IGZ1bmN0aW9uIGVxdWFsVmFsdWUoYTogYW55LCBiOiBhbnkpOiBib29sZWFuIHtcbiAgaWYgKGEgPT09IGIpXG4gICAgcmV0dXJuIHRydWU7XG5cbiAgaWYgKGEgPT09IHVuZGVmaW5lZCB8fCBiID09PSB1bmRlZmluZWQpXG4gICAgcmV0dXJuIGZhbHNlO1xuXG4gIGlmICh0eXBlb2YgYSAhPT0gXCJvYmplY3RcIiB8fCB0eXBlb2YgYiAhPT0gXCJvYmplY3RcIilcbiAgICByZXR1cm4gZmFsc2U7XG5cbiAgY29uc3QgazEgPSBPYmplY3Qua2V5cyhhKTtcbiAgY29uc3QgazIgPSBPYmplY3Qua2V5cyhiKTtcblxuICBpZiAoazEubGVuZ3RoICE9IGsyLmxlbmd0aClcbiAgICByZXR1cm4gZmFsc2U7XG5cbiAgZm9yIChjb25zdCBrZXkgb2YgazEpIHtcbiAgICBpZiAoIU9iamVjdC5oYXNPd24oYiwga2V5KSB8fCAhZXF1YWxWYWx1ZShhW2tleV0sIGJba2V5XSkpXG4gICAgICByZXR1cm4gZmFsc2U7XG4gIH1cblxuICByZXR1cm4gdHJ1ZTtcbn1cblxuZXhwb3J0IGZ1bmN0aW9uIGNvcHlWYWx1ZShvOiBhbnkpOiBhbnkge1xuICBpZiAoIW8gfHwgdHlwZW9mIG8gIT09IFwib2JqZWN0XCIpXG4gICAgcmV0dXJuIG87XG4gIGlmIChBcnJheS5pc0FycmF5KG8pKSB7XG4gICAgY29uc3QgcmVzdWx0ID0gW107XG4gICAgZm9yIChjb25zdCBpdGVyIG9mIG8pXG4gICAgICByZXN1bHQucHVzaChjb3B5VmFsdWUoaXRlcikpO1xuICAgIHJldHVybiByZXN1bHQ7XG4gIH1cbiAgZWxzZSB7XG4gICAgY29uc3QgcmVzdWx0ID0ge30gYXMgYW55O1xuICAgIGZvciAoY29uc3QgW2tleSx2YWxdIG9mIE9iamVjdC5lbnRyaWVzKG8pKVxuICAgICAgcmVzdWx0W2tleV0gPSBjb3B5VmFsdWUodmFsKTtcbiAgICByZXR1cm4gcmVzdWx0O1xuICB9XG59XG5cbmV4cG9ydCBmdW5jdGlvbiBhc3NpZ25PYmplY3QodGFyZ2V0OiBhbnksIHNvdXJjZTogYW55KSB7XG4gIGlmIChBcnJheS5pc0FycmF5KHRhcmdldCkgJiYgQXJyYXkuaXNBcnJheShzb3VyY2UpKSB7XG4gICAgZm9yIChjb25zdCBpdGVyIG9mIHNvdXJjZSlcbiAgICAgIHRhcmdldC5wdXNoKGl0ZXIpO1xuICB9XG4gIGVsc2Uge1xuICAgIGZvciAoY29uc3Qga2V5IG9mIE9iamVjdC5rZXlzKHNvdXJjZSkpIHtcbiAgICAgIGNvbnN0IGEgPSB0YXJnZXRba2V5XSwgYiA9IHNvdXJjZVtrZXldO1xuICAgICAgaWYgKGEgJiYgdHlwZW9mIGEgPT09IFwib2JqZWN0XCIgJiYgYiAmJiB0eXBlb2YgYiA9PT0gXCJvYmplY3RcIilcbiAgICAgICAgYXNzaWduT2JqZWN0KGEsIGIpO1xuICAgICAgZWxzZVxuICAgICAgICB0YXJnZXRba2V5XSA9IGNvcHlWYWx1ZShiKTtcbiAgICB9XG4gIH1cbn1cblxuZXhwb3J0IGZ1bmN0aW9uIGFycmF5V3JhcHBlcih2YWx1ZTogYW55KSB7XG4gIGlmICh2YWx1ZSA9PT0gdW5kZWZpbmVkIHx8IEFycmF5LmlzQXJyYXkodmFsdWUpKVxuICAgIHJldHVybiB2YWx1ZTtcbiAgcmV0dXJuIFsgdmFsdWUgXTtcbn1cbiIsImNvbnN0IGZzID0gcmVxdWlyZSgnZnMnKTtcblxuY2xhc3MgU2V0dGluZ3NTdG9yYWdlIHtcbiAgX2ZpbGVuYW1lO1xuICBfZW5jb2RpbmcgPSBcInV0Zi04XCI7XG4gIF9zZXR0aW5ncztcbiAgX2N1cnJlbnQ7XG5cbiAgY29uc3RydWN0b3IoZmlsZW5hbWUpXG4gIHtcbiAgICB0aGlzLl9maWxlbmFtZSA9IGZpbGVuYW1lO1xuICB9XG5cbiAgYXN5bmMgcHVzaChuYW1lKVxuICB7XG4gICAgaWYgKCF0aGlzLl9zZXR0aW5ncylcbiAgICAgIGF3YWl0IHRoaXMubG9hZCgpO1xuICAgIGxldCBvYmplY3QgPSB0aGlzLl9jdXJyZW50Lm9iamVjdFtuYW1lXTtcbiAgICBpZiAoIW9iamVjdClcbiAgICAgIG9iamVjdCA9IHRoaXMuX2N1cnJlbnQub2JqZWN0W25hbWVdID0ge307XG4gICAgdGhpcy5fY3VycmVudCA9IHsgcGFyZW50OiB0aGlzLl9jdXJyZW50LCBvYmplY3QgfTtcbiAgfVxuXG4gIGFzeW5jIHBvcCgpXG4gIHtcbiAgICBpZiAoIXRoaXMuX3NldHRpbmdzKVxuICAgICAgYXdhaXQgdGhpcy5sb2FkKCk7XG4gICAgY29uc29sZS5hc3NlcnQodGhpcy5fY3VycmVudC5wYXJlbnQpO1xuICAgIHRoaXMuX2N1cnJlbnQgPSB0aGlzLl9jdXJyZW50LnBhcmVudDtcbiAgfVxuXG4gIGFzeW5jIGdldChuYW1lKVxuICB7XG4gICAgaWYgKCF0aGlzLl9zZXR0aW5ncylcbiAgICAgIGF3YWl0IHRoaXMubG9hZCgpO1xuICAgIHJldHVybiB0aGlzLl9jdXJyZW50Lm9iamVjdFtuYW1lXTtcbiAgfVxuXG4gIGFzeW5jIHNldChuYW1lLCB2YWx1ZSlcbiAge1xuICAgIGlmICghdGhpcy5fc2V0dGluZ3MpXG4gICAgICBhd2FpdCB0aGlzLmxvYWQoKTtcbiAgICB0aGlzLl9jdXJyZW50Lm9iamVjdFtuYW1lXSA9IHZhbHVlO1xuICAgIGF3YWl0IHRoaXMuc2F2ZSgpO1xuICB9XG5cbiAgYXN5bmMgbG9hZCgpXG4gIHtcbiAgICB0cnkge1xuICAgICAgY29uc3QgY29udGVudCA9IGF3YWl0IGZzLnByb21pc2VzLnJlYWRGaWxlKHRoaXMuX2ZpbGVuYW1lLCB0aGlzLl9lbmNvZGluZyk7XG4gICAgICB0aGlzLl9zZXR0aW5ncyA9IEpTT04ucGFyc2UoY29udGVudCk7XG4gICAgfVxuICAgIGNhdGNoIChlKSB7XG4gICAgICB0aGlzLl9zZXR0aW5ncyA9IHt9O1xuICAgIH1cbiAgICB0aGlzLl9jdXJyZW50ID1cbiAgICB7XG4gICAgICBwYXJlbnQ6IG51bGwsXG4gICAgICBvYmplY3Q6IHRoaXMuX3NldHRpbmdzLFxuICAgIH07XG4gIH1cblxuICBhc3luYyBzYXZlKClcbiAge1xuICAgIGNvbnN0IHNwYWNlID0gMjtcbiAgICBjb25zdCBjb250ZW50ID0gSlNPTi5zdHJpbmdpZnkodGhpcy5fc2V0dGluZ3MsIHVuZGVmaW5lZCwgc3BhY2UpO1xuICAgIGF3YWl0IGZzLnByb21pc2VzLndyaXRlRmlsZSh0aGlzLl9maWxlbmFtZSwgY29udGVudCwgeyBlbmNvZGluZzogdGhpcy5fZW5jb2RpbmcsIGZsYWc6ICd3JywgZmx1c2g6IHRydWUgfSk7XG4gIH1cbn07XG5cbm1vZHVsZS5leHBvcnRzID0ge1xuICBTZXR0aW5nc1N0b3JhZ2UsXG59O1xuIiwiLypcbiAqIE1JVCBMaWNlbnNlXG4gKlxuICogQ29weXJpZ2h0IChjKSAyMDI1ICBZdXJpaSBZYWt1YmluICh5dXJpaS55YWt1YmluQGdtYWlsLmNvbSlcbiAqXG4gKiBQZXJtaXNzaW9uIGlzIGdyYW50ZWQgdG8gdXNlLCBjb3B5LCBtb2RpZnksIGFuZCBkaXN0cmlidXRlIHRoaXMgc29mdHdhcmVcbiAqIHVuZGVyIHRoZSBNSVQgTGljZW5zZS4gU2VlIExJQ0VOU0UgZmlsZSBmb3IgZGV0YWlscy5cbiAqL1xuXG5leHBvcnQgZnVuY3Rpb24gZW5zdXJlQm9vbGVhbih2YWx1ZTogYW55KSB7XG4gIGlmICh0eXBlb2YgdmFsdWUgPT09IFwiYm9vbGVhblwiKVxuICAgIHJldHVybiB2YWx1ZTtcbiAgdGhyb3cgbmV3IEVycm9yKGBUaGUgJyR7dmFsdWV9JyBpcyBub3QgYSBib29sZWFuYCk7XG59XG5cbmV4cG9ydCBmdW5jdGlvbiBlbnN1cmVTdHJpbmcodmFsdWU6IGFueSkge1xuICBpZiAodHlwZW9mIHZhbHVlID09PSBcInN0cmluZ1wiKVxuICAgIHJldHVybiB2YWx1ZTtcbiAgdGhyb3cgbmV3IEVycm9yKGBUaGUgJyR7dmFsdWV9JyBpcyBub3QgYSBzdHJpbmdgKTtcbn1cbiIsIm1vZHVsZS5leHBvcnRzID0gcmVxdWlyZShcImNoaWxkX3Byb2Nlc3NcIik7IiwibW9kdWxlLmV4cG9ydHMgPSByZXF1aXJlKFwiZnNcIik7IiwibW9kdWxlLmV4cG9ydHMgPSByZXF1aXJlKFwiaHR0cFwiKTsiLCJtb2R1bGUuZXhwb3J0cyA9IHJlcXVpcmUoXCJodHRwc1wiKTsiLCJtb2R1bGUuZXhwb3J0cyA9IHJlcXVpcmUoXCJub2RlOmNoaWxkX3Byb2Nlc3NcIik7IiwibW9kdWxlLmV4cG9ydHMgPSByZXF1aXJlKFwibm9kZTpmc1wiKTsiLCJtb2R1bGUuZXhwb3J0cyA9IHJlcXVpcmUoXCJub2RlOm9zXCIpOyIsIm1vZHVsZS5leHBvcnRzID0gcmVxdWlyZShcIm5vZGU6cGF0aFwiKTsiLCJtb2R1bGUuZXhwb3J0cyA9IHJlcXVpcmUoXCJub2RlOnVybFwiKTsiLCJtb2R1bGUuZXhwb3J0cyA9IHJlcXVpcmUoXCJwYXRoXCIpOyIsIi8vIFRoZSBtb2R1bGUgY2FjaGVcbnZhciBfX3dlYnBhY2tfbW9kdWxlX2NhY2hlX18gPSB7fTtcblxuLy8gVGhlIHJlcXVpcmUgZnVuY3Rpb25cbmZ1bmN0aW9uIF9fd2VicGFja19yZXF1aXJlX18obW9kdWxlSWQpIHtcblx0Ly8gQ2hlY2sgaWYgbW9kdWxlIGlzIGluIGNhY2hlXG5cdHZhciBjYWNoZWRNb2R1bGUgPSBfX3dlYnBhY2tfbW9kdWxlX2NhY2hlX19bbW9kdWxlSWRdO1xuXHRpZiAoY2FjaGVkTW9kdWxlICE9PSB1bmRlZmluZWQpIHtcblx0XHRyZXR1cm4gY2FjaGVkTW9kdWxlLmV4cG9ydHM7XG5cdH1cblx0Ly8gQ3JlYXRlIGEgbmV3IG1vZHVsZSAoYW5kIHB1dCBpdCBpbnRvIHRoZSBjYWNoZSlcblx0dmFyIG1vZHVsZSA9IF9fd2VicGFja19tb2R1bGVfY2FjaGVfX1ttb2R1bGVJZF0gPSB7XG5cdFx0Ly8gbm8gbW9kdWxlLmlkIG5lZWRlZFxuXHRcdC8vIG5vIG1vZHVsZS5sb2FkZWQgbmVlZGVkXG5cdFx0ZXhwb3J0czoge31cblx0fTtcblxuXHQvLyBFeGVjdXRlIHRoZSBtb2R1bGUgZnVuY3Rpb25cblx0X193ZWJwYWNrX21vZHVsZXNfX1ttb2R1bGVJZF0obW9kdWxlLCBtb2R1bGUuZXhwb3J0cywgX193ZWJwYWNrX3JlcXVpcmVfXyk7XG5cblx0Ly8gUmV0dXJuIHRoZSBleHBvcnRzIG9mIHRoZSBtb2R1bGVcblx0cmV0dXJuIG1vZHVsZS5leHBvcnRzO1xufVxuXG4iLCIvLyBnZXREZWZhdWx0RXhwb3J0IGZ1bmN0aW9uIGZvciBjb21wYXRpYmlsaXR5IHdpdGggbm9uLWhhcm1vbnkgbW9kdWxlc1xuX193ZWJwYWNrX3JlcXVpcmVfXy5uID0gKG1vZHVsZSkgPT4ge1xuXHR2YXIgZ2V0dGVyID0gbW9kdWxlICYmIG1vZHVsZS5fX2VzTW9kdWxlID9cblx0XHQoKSA9PiAobW9kdWxlWydkZWZhdWx0J10pIDpcblx0XHQoKSA9PiAobW9kdWxlKTtcblx0X193ZWJwYWNrX3JlcXVpcmVfXy5kKGdldHRlciwgeyBhOiBnZXR0ZXIgfSk7XG5cdHJldHVybiBnZXR0ZXI7XG59OyIsIi8vIGRlZmluZSBnZXR0ZXIgZnVuY3Rpb25zIGZvciBoYXJtb255IGV4cG9ydHNcbl9fd2VicGFja19yZXF1aXJlX18uZCA9IChleHBvcnRzLCBkZWZpbml0aW9uKSA9PiB7XG5cdGZvcih2YXIga2V5IGluIGRlZmluaXRpb24pIHtcblx0XHRpZihfX3dlYnBhY2tfcmVxdWlyZV9fLm8oZGVmaW5pdGlvbiwga2V5KSAmJiAhX193ZWJwYWNrX3JlcXVpcmVfXy5vKGV4cG9ydHMsIGtleSkpIHtcblx0XHRcdE9iamVjdC5kZWZpbmVQcm9wZXJ0eShleHBvcnRzLCBrZXksIHsgZW51bWVyYWJsZTogdHJ1ZSwgZ2V0OiBkZWZpbml0aW9uW2tleV0gfSk7XG5cdFx0fVxuXHR9XG59OyIsIl9fd2VicGFja19yZXF1aXJlX18ubyA9IChvYmosIHByb3ApID0+IChPYmplY3QucHJvdG90eXBlLmhhc093blByb3BlcnR5LmNhbGwob2JqLCBwcm9wKSkiLCIvLyBkZWZpbmUgX19lc01vZHVsZSBvbiBleHBvcnRzXG5fX3dlYnBhY2tfcmVxdWlyZV9fLnIgPSAoZXhwb3J0cykgPT4ge1xuXHRpZih0eXBlb2YgU3ltYm9sICE9PSAndW5kZWZpbmVkJyAmJiBTeW1ib2wudG9TdHJpbmdUYWcpIHtcblx0XHRPYmplY3QuZGVmaW5lUHJvcGVydHkoZXhwb3J0cywgU3ltYm9sLnRvU3RyaW5nVGFnLCB7IHZhbHVlOiAnTW9kdWxlJyB9KTtcblx0fVxuXHRPYmplY3QuZGVmaW5lUHJvcGVydHkoZXhwb3J0cywgJ19fZXNNb2R1bGUnLCB7IHZhbHVlOiB0cnVlIH0pO1xufTsiLCJpbXBvcnQgdXJsIGZyb20gXCJub2RlOnVybFwiO1xuaW1wb3J0IHBhdGggZnJvbSBcIm5vZGU6cGF0aFwiO1xuXG5pbXBvcnQgeyBSdW5TY3JpcHRDb250ZXh0IH0gZnJvbSBcIi4vUnVuU2NyaXB0Q29udGV4dC5tanNcIjtcbmltcG9ydCBpbml0SGFuZGxlciBmcm9tIFwiLi9Jbml0SGFuZGxlci5tanNcIjtcbmltcG9ydCBidWlsZEhhbmRsZXIgZnJvbSBcIi4vQnVpbGRIYW5kbGVyLm1qc1wiO1xuXG5jb25zdCBfX2ZpbGVuYW1lID0gdXJsLmZpbGVVUkxUb1BhdGgoaW1wb3J0Lm1ldGEudXJsKTtcbmNvbnN0IF9fZGlybmFtZSA9IHBhdGguZGlybmFtZShfX2ZpbGVuYW1lKTtcblxuY29uc3QgaGFuZGxlck1hcCA9IHtcbiAgZGVmYXVsdDogYnVpbGRIYW5kbGVyLFxuICBpbml0OiBpbml0SGFuZGxlcixcbiAgYnVpbGQ6IGJ1aWxkSGFuZGxlcixcbn07XG5cbmZ1bmN0aW9uIHRvT3B0aW9uS2V5KG5hbWUpXG57XG4gIGlmICghbmFtZS5zdGFydHNXaXRoKFwiLS1cIikpXG4gICAgcmV0dXJuIG51bGw7XG5cbiAgbmFtZSA9IG5hbWUuc3Vic3RyaW5nKDIpLnRvTG93ZXJDYXNlKCk7XG4gIGlmICghbmFtZS5sZW5ndGgpXG4gICAgcmV0dXJuIG51bGw7XG5cbiAgbGV0IGtleSA9IG5hbWUuY2hhckF0KDApO1xuICBpZiAoIWtleS5tYXRjaCgvW2Etel0vKSlcbiAgICByZXR1cm4gbnVsbDtcblxuICBsZXQgaHlwaGVuID0gMDtcbiAgZm9yIChsZXQgaSA9IDE7IGkgPCBuYW1lLmxlbmd0aDsgaSsrKSB7XG4gICAgY29uc3QgY2ggPSBuYW1lLmNoYXJBdChpKTtcbiAgICBpZiAoY2gubWF0Y2goL1thLXowLTldLykpIHtcbiAgICAgIGtleSArPSAoaHlwaGVuID8gY2gudG9VcHBlckNhc2UoKSA6IGNoKVxuICAgICAgaHlwaGVuID0gMDtcbiAgICB9XG4gICAgZWxzZSBpZiAoY2ggPT0gXCItXCIpIHtcbiAgICAgIGlmICgrK2h5cGhlbiA+IDEpXG4gICAgICAgIHJldHVybiBudWxsO1xuICAgIH1cbiAgfVxuXG4gIHJldHVybiBoeXBoZW4gPyBudWxsIDoga2V5O1xufVxuXG5hc3luYyBmdW5jdGlvbiBydW5TY3JpcHQoKVxue1xuICBjb25zdCBvcHRpb25zID0ge1xuICAgIGhhbmRsZXI6IFwiZGVmYXVsdFwiLFxuICAgIG5vZGVFeGVjdXRhYmxlOiBudWxsLFxuICAgIGN1cnJlbnRTY3JpcHQ6IG51bGwsXG4gICAgc2NyaXB0RGlyOiBfX2Rpcm5hbWUsXG4gICAgcm9vdERpcjogcGF0aC5kaXJuYW1lKF9fZGlybmFtZSksXG4gICAgd29ya0RpcjogcHJvY2Vzcy5jd2QoKSxcbiAgICBlbnY6IHt9LFxuICB9O1xuXG4gIGlmIChwcm9jZXNzLmFyZ3YubGVuZ3RoID4gMClcbiAgICBvcHRpb25zLm5vZGVFeGVjdXRhYmxlID0gcHJvY2Vzcy5hcmd2WzBdO1xuICBpZiAocHJvY2Vzcy5hcmd2Lmxlbmd0aCA+IDEpXG4gICAgb3B0aW9ucy5jdXJyZW50U2NyaXB0ID0gcHJvY2Vzcy5hcmd2WzFdO1xuXG4gIGxldCBhcmdzSW5kZXggPSBwcm9jZXNzLmFyZ3YubGVuZ3RoO1xuICBpZiAocHJvY2Vzcy5hcmd2Lmxlbmd0aCA+IDIpIHtcbiAgICBhcmdzSW5kZXggPSAyO1xuICAgIGNvbnN0IGhhbmRsZXIgPSBwcm9jZXNzLmFyZ3ZbYXJnc0luZGV4XTtcbiAgICBpZiAoIWhhbmRsZXIuc3RhcnRzV2l0aChcIi0tXCIpKSB7XG4gICAgICBvcHRpb25zLmhhbmRsZXIgPSBoYW5kbGVyO1xuICAgICAgYXJnc0luZGV4Kys7XG4gICAgfVxuICB9XG5cbiAgaWYgKCFoYW5kbGVyTWFwLmhhc093blByb3BlcnR5KG9wdGlvbnMuaGFuZGxlcikpIHtcbiAgICBjb25zdCBzY3JpcHROYW1lID0gb3B0aW9ucy5jdXJyZW50U2NyaXB0ID8gcGF0aC5iYXNlbmFtZShvcHRpb25zLmN1cnJlbnRTY3JpcHQpIDogXCJ3YXNtdXhcIjtcbiAgICB0aHJvdyBgVGhlICR7c2NyaXB0TmFtZX0gZG9lcyBub3Qgc3VwcG9ydCB0aGUgJHtvcHRpb25zLmhhbmRsZXJ9IGNvbW1hbmRgO1xuICB9XG5cbiAgbGV0IGxhc3RLZXkgPSBudWxsO1xuICB3aGlsZSAoYXJnc0luZGV4IDwgcHJvY2Vzcy5hcmd2Lmxlbmd0aCkge1xuICAgIGNvbnN0IGl0ZXIgPSBwcm9jZXNzLmFyZ3ZbYXJnc0luZGV4KytdO1xuICAgIGlmIChpdGVyLnN0YXJ0c1dpdGgoXCItLVwiKSkge1xuICAgICAgY29uc3Qga2V5ID0gdG9PcHRpb25LZXkoaXRlcik7XG4gICAgICBpZiAoIWtleSlcbiAgICAgICAgdGhyb3cgYE9wdGlvbiAke2l0ZXJ9IGlzIG5vdCBzdXBwb3J0ZWRgO1xuICAgICAgaWYgKG9wdGlvbnMuZW52Lmhhc093blByb3BlcnR5KGtleSkpXG4gICAgICAgIHRocm93IGBDYW5ub3Qgc3BlY2lmeSB0aGUgc2FtZSBvcHRpb24gJyR7aXRlcn0nIG1vcmUgdGhhbiBvbmNlYDtcbiAgICAgIGxhc3RLZXkgPSBrZXk7XG4gICAgICBvcHRpb25zLmVudltrZXldID0gdHJ1ZTtcbiAgICB9XG4gICAgZWxzZSBpZiAobGFzdEtleSkge1xuICAgICAgY29uc3QgdmFsdWUgPSBvcHRpb25zLmVudltsYXN0S2V5XTtcbiAgICAgIGlmICh0eXBlb2YgdmFsdWUgPT09ICdib29sZWFuJylcbiAgICAgICAgb3B0aW9ucy5lbnZbbGFzdEtleV0gPSBpdGVyO1xuICAgICAgZWxzZSBpZiAodHlwZW9mIHZhbHVlID09PSAnc3RyaW5nJylcbiAgICAgICAgb3B0aW9ucy5lbnZbbGFzdEtleV0gPSBbIHZhbHVlLCBpdGVyIF07XG4gICAgICBlbHNlXG4gICAgICAgIHZhbHVlLnB1c2goaXRlcik7XG4gICAgfVxuICAgIGVsc2Uge1xuICAgICAgdGhyb3cgYE5lZWQgdG8gc3BlY2lmeSB0aGUgb3B0aW9uIG5hbWUgYmVmb3JlICcke2l0ZXJ9JyBwYXJhbWV0ZXJgO1xuICAgIH1cbiAgfVxuXG4gIGNvbnN0IGNvbnRleHQgPSBuZXcgUnVuU2NyaXB0Q29udGV4dChvcHRpb25zKTtcblxuICBsZXQgaGFuZGxlciA9IGhhbmRsZXJNYXBbb3B0aW9ucy5oYW5kbGVyXTtcbiAgaWYgKHR5cGVvZiBoYW5kbGVyID09PSBcInN0cmluZ1wiKSB7XG4gICAgY29uc3QgZmlsZW5hbWUgPSBwYXRoLmlzQWJzb2x1dGUoaGFuZGxlcikgPyBoYW5kbGVyIDogcGF0aC5yZXNvbHZlKF9fZGlybmFtZSwgaGFuZGxlcik7XG4gICAgY29uc3QgZmlsZVVybCA9IHVybC5wYXRoVG9GaWxlVVJMKGZpbGVuYW1lKTtcbiAgICBjb25zdCBtb2R1bGUgPSBhd2FpdCBpbXBvcnQoZmlsZVVybCk7XG4gICAgaGFuZGxlciA9IG1vZHVsZS5kZWZhdWx0O1xuICB9XG5cbiAgY29uc3QgcmVzID0gaGFuZGxlcihjb250ZXh0KTtcbiAgaWYgKHJlcyBpbnN0YW5jZW9mIFByb21pc2UpIHtcbiAgICBhd2FpdCByZXM7XG4gIH1cbn1cblxucnVuU2NyaXB0KCkudGhlbigoKSA9PiBwcm9jZXNzLmV4aXQoMCkpLmNhdGNoKChlKSA9PiB7XG4gIGlmIChlIGluc3RhbmNlb2YgRXJyb3IpIHtcbiAgICBjb25zb2xlLmVycm9yKGUuc3RhY2spO1xuICB9XG4gIGVsc2Uge1xuICAgIGNvbnNvbGUuZXJyb3IoZSk7XG4gIH1cbiAgcHJvY2Vzcy5leGl0KDEpO1xufSk7XG4iXSwibmFtZXMiOltdLCJzb3VyY2VSb290IjoiIn0=