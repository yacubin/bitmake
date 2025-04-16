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

const { AbsolutePath } = __webpack_require__(/*! @/utils/AbsolutePath.js */ "./src/utils/AbsolutePath.js");
const { UserContext } = __webpack_require__(/*! ./bitmake/UserContext.js */ "./src/bitmake/UserContext.js");
const { PluginContext } = __webpack_require__(/*! ./bitmake/PluginContext.js */ "./src/bitmake/PluginContext.js");
const { GlobalContext } = __webpack_require__(/*! ./bitmake/GlobalContext.js */ "./src/bitmake/GlobalContext.js");
const { SystemVariables } = __webpack_require__(/*! ./bitmake/SystemVariables.js */ "./src/bitmake/SystemVariables.js");
const { GoalCollection } = __webpack_require__(/*! @/core/GoalCollection */ "./src/core/GoalCollection.ts");
const { getPathString }  = __webpack_require__(/*! @/utils/FileSystem */ "./src/utils/FileSystem.ts");
const { FilePath, DirPath } = __webpack_require__(/*! @/core/Path */ "./src/core/Path.ts");
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

  scope.PROJECT_SOURCE_DIR = DirPath.create(sourceDir);
  scope.PROJECT_BINARY_DIR = DirPath.create(binaryDir);

  scope.PACKAGE_FILE = FilePath.create(scope.PROJECT_SOURCE_DIR.join(PACKAGE_JSON).toString());
  scope.CACHE_FILE = FilePath.create(scope.PROJECT_BINARY_DIR.join(MAKE_CACHE).toString());
  scope.SOURCE_DIR = AbsolutePath.create(sourceDir);
  scope.BINARY_DIR = AbsolutePath.create(binaryDir);

  const global = GlobalContext.create();
  global.loadCacheVariables(scope.CACHE_FILE.toString());

  const packageJson = await fs.promises.readFile(scope.PACKAGE_FILE.toString(), 'utf8');
  const pkg = JSON.parse(packageJson);

  scope.BUILD_TYPE = config.buildType;
  scope.PROJECT_NAME = pkg.name;
  scope.PROJECT_VERSION = pkg.version;
  scope.PROJECT_DESCRIPTION = pkg.description;
  scope.PROJECT_HOMEPAGE_URL = pkg.homepage;
  scope.DESTDIR = config.destDir ? DirPath.create(config.destDir) : null;

  const root = UserContext.create(scope, global);

  if (config.variables) {
    for (const [key, val] of Object.entries(config.variables)) {
      if (key === "INSTALL_PREFIX")
        root.INSTALL_PREFIX = DirPath.create(val);
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
const { AbsolutePath } = __webpack_require__(/*! @/utils/AbsolutePath.js */ "./src/utils/AbsolutePath.js");

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

const { AbsolutePath } = __webpack_require__(/*! @/utils/AbsolutePath.js */ "./src/utils/AbsolutePath.js");
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

    scope.SCRIPT_FILE = FilePath.create(scriptFile);
    scope.SCRIPT_DIR = DirPath.create(scope.SCRIPT_FILE.dirname());

    this.addSystemVariables(scope);
    this.copyCacheVariables(context);

    const module = await importModule(context.SCRIPT_FILE.toString());

    const cwdSave = process.cwd();
    process.chdir(context.SCRIPT_FILE.dirname().toString());

    const result = module.default(context);
    if (result instanceof Promise)
      await result;

    process.chdir(cwdSave);

    // this.writeCacheVariables(context.CACHE_FILE.toString());
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
      dest = DirPath.create(scope.DESTDIR).join(dest);
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
const { AbsolutePath } = __webpack_require__(/*! @/utils/AbsolutePath.js */ "./src/utils/AbsolutePath.js");
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
  this[DESTINATION] = DirPath.create(scope.INSTALL_PREFIX.resolve(destination.toString()));
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


const { AbsolutePath } = __webpack_require__(/*! @/utils/AbsolutePath.js */ "./src/utils/AbsolutePath.js");
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
    if (typeof it === "string" || AbsolutePath.isAbsolute(it))
      it = SourceFile.create(this[SCOPE], it);
    else if (!(it instanceof InterfaceObjects || it instanceof SourceFile))
      throw new Error(`Not support instance ${it}`);
    this[UNKNOWN_TARGET].SOURCES.push(it);
  }
}

InterfaceTarget.prototype.addIncludes = function(...includes) {
  for (const it of includes.flat(1)) {
    let VALUE;
    if (typeof it === "string" || AbsolutePath.isAbsolute(it))
      VALUE = IncludeDirectory.create(it, this[SCOPE].SOURCE_DIR);
    else
      VALUE = InterfaceIncludes.ensureInstance(it);
    this[UNKNOWN_TARGET].INCLUDES.push({ VALUE, PUBLIC_ONLY: false });
  }
}

InterfaceTarget.prototype.addPublicIncludes = function(...includes) {
  for (const it of includes.flat(1)) {
    let VALUE;
    if (typeof it === "string" || AbsolutePath.isAbsolute(it))
      VALUE = IncludeDirectory.create(it, this[SCOPE].SOURCE_DIR);
    else
      VALUE = InterfaceIncludes.ensureInstance(it);
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
const { DirPath } = __webpack_require__(/*! @/core/Path */ "./src/core/Path.ts");

const DEFINE_MAP            = Symbol("DEFINE_MAP");

const PROJECT_SOURCE_DIR    = Symbol("PROJECT_SOURCE_DIR");
const PROJECT_BINARY_DIR    = Symbol("PROJECT_BINARY_DIR");
const DESTDIR               = Symbol("DESTDIR");
const INSTALL_PREFIX        = Symbol("INSTALL_PREFIX");
const SCRIPT_FILE           = Symbol("SCRIPT_FILE");
const SCRIPT_DIR            = Symbol("SCRIPT_DIR");
const PACKAGE_FILE          = Symbol("PACKAGE_FILE");
const CACHE_FILE            = Symbol("CACHE_FILE");
const SOURCE_DIR            = Symbol("SOURCE_DIR");
const BINARY_DIR            = Symbol("BINARY_DIR");
const MODULE_PATH           = Symbol("MODULE_PATH");
const INCLUDES              = Symbol("INCLUDES");
const ASM_COMPILER          = Symbol("ASM_COMPILER");
const ASM_FLAGS             = Symbol("ASM_FLAGS");
const ASM_FLAGS_DEBUG       = Symbol("ASM_FLAGS_DEBUG");
const ASM_FLAGS_RELEASE     = Symbol("ASM_FLAGS_RELEASE");
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
  this[PROJECT_SOURCE_DIR]    = null;
  this[PROJECT_BINARY_DIR]    = null;
  this[DESTDIR]               = null;
  this[INSTALL_PREFIX]        = DirPath.create("/usr");
  this[SCRIPT_FILE]           = null;
  this[SCRIPT_DIR]            = null;
  this[PACKAGE_FILE]          = null;
  this[CACHE_FILE]            = null;
  this[SOURCE_DIR]            = this[PROJECT_SOURCE_DIR];
  this[BINARY_DIR]            = this[PROJECT_BINARY_DIR];
  this[MODULE_PATH]           = [];
  this[INCLUDES]              = [];
  this[ASM_COMPILER]          = "clang";
  this[ASM_FLAGS]             = [];
  this[ASM_FLAGS_DEBUG]       = [ "-g" ];
  this[ASM_FLAGS_RELEASE]     = [ "-O3", "-DNDEBUG" ];
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
    this[symbol] = initValue;
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
  PROJECT_SOURCE_DIR: {
    get () { return this[PROJECT_SOURCE_DIR]; },
    set(value) { this[PROJECT_SOURCE_DIR] = value; },
    enumerable: true,
  },
  PROJECT_BINARY_DIR: {
    get () { return this[PROJECT_BINARY_DIR]; },
    set(value) { this[PROJECT_BINARY_DIR] = value; },
    enumerable: true,
  },
  DESTDIR: {
    get () { return this[DESTDIR]; },
    set(value) { this[DESTDIR] = value; },
    enumerable: true,
  },
  INSTALL_PREFIX: {
    get () { return this[INSTALL_PREFIX]; },
    set(value) { this[INSTALL_PREFIX] = DirPath.create(value); },
    enumerable: true,
  },
  SCRIPT_FILE: {
    get () { return this[SCRIPT_FILE]; },
    set(value) { this[SCRIPT_FILE] = value; },
    enumerable: true,
  },
  SCRIPT_DIR: {
    get () { return this[SCRIPT_DIR]; },
    set(value) { this[SCRIPT_DIR] = value; },
    enumerable: true,
  },
  PACKAGE_FILE: {
    get () { return this[PACKAGE_FILE]; },
    set(value) { this[PACKAGE_FILE] = value; },
    enumerable: true,
  },
  CACHE_FILE: {
    get () { return this[CACHE_FILE]; },
    set(value) { this[CACHE_FILE] = value; },
    enumerable: true,
  },
  SOURCE_DIR: {
    get () { return this[SOURCE_DIR]; },
    set(value) { this[SOURCE_DIR] = value; },
    enumerable: true,
  },
  BINARY_DIR: {
    get () { return this[BINARY_DIR]; },
    set(value) { this[BINARY_DIR] = value; },
    enumerable: true,
  },
  MODULE_PATH: {
    get () { return this[MODULE_PATH]; },
    set(value) { this[MODULE_PATH] = value; },
    enumerable: true,
  },
  ASM_COMPILER: {
    get () { return this[ASM_COMPILER]; },
    set(value) { this[ASM_COMPILER] = value; },
    enumerable: true,
  },
  ASM_FLAGS: {
    get () { return this[ASM_FLAGS]; },
    set(value) { this[ASM_FLAGS] = value; },
    enumerable: true,
  },
  ASM_FLAGS_DEBUG: {
    get () { return this[ASM_FLAGS_DEBUG]; },
    set(value) { this[ASM_FLAGS_DEBUG] = value; },
    enumerable: true,
  },
  ASM_FLAGS_RELEASE: {
    get () { return this[ASM_FLAGS_RELEASE]; },
    set(value) { this[ASM_FLAGS_RELEASE] = value; },
    enumerable: true,
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
  INCLUDES: {
    get () { return this[INCLUDES]; },
    set(value) { this[INCLUDES] = value; },
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

  const type = descriptor.type || typeof descriptor.value;

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
  defineEntry.initValue = descriptor.value;

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
  else
    throw new Error(`Unknown ${type} type of ${name} variable`);

  ensureValue(defineEntry.initValue);

  const { symbol } = defineEntry;
  const desc = {
    configurable: true,
    enumerable: true,
    get() { return this[symbol] },
    set(value) { this[symbol] = ensureValue(value) },
  };

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

  o[PROJECT_SOURCE_DIR]    = this[PROJECT_SOURCE_DIR];
  o[PROJECT_BINARY_DIR]    = this[PROJECT_BINARY_DIR];
  o[DESTDIR]               = this[DESTDIR];
  o[INSTALL_PREFIX]        = this[INSTALL_PREFIX];
  o[SOURCE_DIR]            = this[SOURCE_DIR];
  o[BINARY_DIR]            = this[BINARY_DIR];
  o[SCRIPT_FILE]           = this[SCRIPT_FILE];
  o[SCRIPT_DIR]            = this[SCRIPT_DIR];
  o[PACKAGE_FILE]          = this[PACKAGE_FILE];
  o[CACHE_FILE]            = this[CACHE_FILE];
  o[MODULE_PATH]           = Array.from(this[MODULE_PATH]);
  o[INCLUDES]              = [ ...this[INCLUDES] ];
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
    if (Array.isArray(this[symbol]))
      o[symbol] = Array.from(this[symbol]);
    else
      o[symbol] = this[symbol];
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
const { AbsolutePath } = __webpack_require__(/*! @/utils/AbsolutePath.js */ "./src/utils/AbsolutePath.js");

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
    if (typeof it === "string" || AbsolutePath.isAbsolute(it))
      it = SourceFile.create(this[TARGET_SCOPE], it);
    else if (!(it instanceof InterfaceObjects || it instanceof SourceFile))
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
    if (typeof it === "string" || AbsolutePath.isAbsolute(it))
      VALUE = IncludeDirectory.create(it, this[TARGET_SCOPE].SOURCE_DIR);
    else
      VALUE = InterfaceIncludes.ensureInstance(it);
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
    if (typeof it === "string" || AbsolutePath.isAbsolute(it))
      VALUE = IncludeDirectory.create(it, this[TARGET_SCOPE].SOURCE_DIR);
    else
      VALUE = InterfaceIncludes.ensureInstance(it);
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
const { AbsolutePath } = __webpack_require__(/*! @/utils/AbsolutePath.js */ "./src/utils/AbsolutePath.js");
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
    if (desc.get && desc.set) {
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
    isParentDir(dirpath) {
        return this[PATH].startsWith(dirpath.toString());
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
    SYSTEM_NAME: {
        description: "Defines the target OS for the build, used in cross-compilation and native builds",
        value: "Linux",
    },
    SYSTEM_PROCESSOR: {
        description: "Defines the target CPU architecture",
        value: "wasm32",
    },
    BUILD_TYPE: {
        description: "Specifies the build configuration for controlling optimization levels and debug information in the build process",
        type: [_core_Types__WEBPACK_IMPORTED_MODULE_1__.DEBUG_BUILD_TYPE, _core_Types__WEBPACK_IMPORTED_MODULE_1__.RELEASE_BUILD_TYPE],
        value: _core_Types__WEBPACK_IMPORTED_MODULE_1__.RELEASE_BUILD_TYPE,
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

/***/ "./src/utils/AbsolutePath.js":
/*!***********************************!*\
  !*** ./src/utils/AbsolutePath.js ***!
  \***********************************/
/***/ ((module, __unused_webpack_exports, __webpack_require__) => {

const path = __webpack_require__(/*! node:path */ "node:path");
const url = __webpack_require__(/*! node:url */ "node:url");

class AbsolutePath {
  _filepath;

  constructor(filepath) {
    if (!path.isAbsolute(filepath))
      throw new Error(`Not supported relative path of "${filepath}"`);
    this._filepath = filepath;
  }

  join(...paths) {
    const filepath = path.posix.join(this._filepath, ...paths.map(i => i.toString()));
    return new AbsolutePath(filepath);
  }

  dirname() {
    return new AbsolutePath(path.posix.dirname(this._filepath));
  }

  basename() {
    return path.basename(this._filepath);
  }

  relative(to) {
    if (to instanceof AbsolutePath)
      to = to._filepath;
    const filepath = path.posix.relative(this._filepath, to);
    return filepath;
  }

  resolve(...paths) {
    return new AbsolutePath(path.posix.resolve(this._filepath, ...paths.map(i => i.toString())));
  }

  match(regexp) {
    return this._filepath.match(regexp);
  }

  isParentDir(dirpath) {
    const dir = AbsolutePath.create(dirpath);
    return this._filepath.startsWith(dir._filepath);
  }

  toURL() {
    return url.pathToFileURL(this._filepath);
  }

  toURLString() {
    return this.toURL().toString();
  }

  toString() {
    return this._filepath;
  }

  valueOf() {
    return this._filepath;
  }

  toJSON() {
    return this._filepath;
  }

  static isAbsolute(filepath) {
    return path.isAbsolute(filepath.toString());
  }

  static create(filepath) {
    if (filepath instanceof AbsolutePath)
      return filepath;
    if (typeof filepath !== "string")
      throw new Error(`Not correct type of ${filepath}`);
    return new AbsolutePath(filepath);
  }
};

function cloneAbsolutePath(value) {
  if (value instanceof AbsolutePath)
    return value;
  throw new Error(`The '${value}' is not a AbsolutePath`);
}

module.exports = {
  AbsolutePath,
  cloneAbsolutePath,
};


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
//# sourceMappingURL=data:application/json;charset=utf-8;base64,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QUs7QUFDbkQ7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLDhDQUE4QyxLQUFLO0FBQ25EO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsOENBQThDLEtBQUs7QUFDbkQ7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSw4Q0FBOEMsS0FBSztBQUNuRDtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7Ozs7Ozs7Ozs7OztBQ25RYTs7QUFFYjtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0EsMEJBQTBCLE1BQU07QUFDaEM7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQSxHQUFHO0FBQ0g7QUFDQSxhQUFhLG9CQUFvQjtBQUNqQztBQUNBLEdBQUc7QUFDSDtBQUNBLGFBQWEsd0JBQXdCO0FBQ3JDO0FBQ0EsR0FBRztBQUNIO0FBQ0EsYUFBYSx1QkFBdUI7QUFDcEM7QUFDQSxHQUFHO0FBQ0g7QUFDQSxhQUFhLHVCQUF1QjtBQUNwQztBQUNBLEdBQUc7QUFDSDtBQUNBLGFBQWEsK0JBQStCO0FBQzVDO0FBQ0EsR0FBRztBQUNIO0FBQ0EsYUFBYSw0QkFBNEI7QUFDekM7QUFDQSxHQUFHO0FBQ0gsQ0FBQzs7QUFFRDtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQSxZQUFZLG1CQUFtQjtBQUMvQjs7QUFFQTtBQUNBO0FBQ0E7Ozs7Ozs7Ozs7OztBQ3hFYTs7QUFFYixXQUFXLG1CQUFPLENBQUMsd0JBQVM7QUFDNUIsYUFBYSxtQkFBTyxDQUFDLDRCQUFXOztBQUVoQyxRQUFRLFlBQVksRUFBRSxtQkFBTyxDQUFDLHFEQUFvQjtBQUNsRCxRQUFRLGlCQUFpQixFQUFFLG1CQUFPLENBQUMscURBQW9CO0FBQ3ZELFFBQVEsZUFBZSxFQUFFLG1CQUFPLENBQUMsNERBQXlCO0FBQzFELFFBQVEsa0JBQWtCLEVBQUUsbUJBQU8sQ0FBQyw4REFBc0I7QUFDMUQsUUFBUSxhQUFhLEVBQUUsbUJBQU8sQ0FBQyw0Q0FBYTtBQUM1QyxRQUFRLG1CQUFtQixFQUFFLG1CQUFPLENBQUMsK0RBQXlCO0FBQzlELFFBQVEsa0JBQWtCLEVBQUUsbUJBQU8sQ0FBQyw4REFBc0I7QUFDMUQsZ0JBQWdCLG1CQUFPLENBQUMsa0RBQW9COztBQUU1Qzs7QUFFQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLHlDQUF5QyxFQUFFO0FBQzNDOztBQUVBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBLHdCQUF3QjtBQUN4QjtBQUNBLG1DQUFtQztBQUNuQztBQUNBLHdDQUF3QztBQUN4QztBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsNEJBQTRCLFFBQVE7QUFDcEM7O0FBRUE7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7O0FBRUE7O0FBRUE7QUFDQTs7QUFFQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7O0FBRUE7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7O0FBRUE7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTs7QUFFQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBOztBQUVBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBOztBQUVBO0FBQ0E7O0FBRUE7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTs7QUFFQTtBQUNBOztB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Q0EsdURBQXVELEtBQUs7QUFDNUQ7QUFDQTs7QUFFQSxzQkFBc0IsbUVBQWdCOztBQUV0QztBQUNBO0FBQ0EscUJBQXFCLGlEQUFlLHNCQUFzQiw4Q0FBWTtBQUN0RSxvQkFBb0IsbURBQWlCO0FBQ3JDLHlCQUF5Qiw0Q0FBTyxPQUFPLENBQUM7QUFDeEM7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSxDQUFDIiwic291cmNlcyI6WyJ3ZWJwYWNrOi8vYml0bWFrZS8uL3NyYy8gbGF6eSBzdHJpY3QgbmFtZXNwYWNlIG9iamVjdCIsIndlYnBhY2s6Ly9iaXRtYWtlLy4vc3JjL0J1aWxkSGFuZGxlci5tanMiLCJ3ZWJwYWNrOi8vYml0bWFrZS8uL3NyYy9Db25zdGFudHMuanMiLCJ3ZWJwYWNrOi8vYml0bWFrZS8uL3NyYy9Jbml0SGFuZGxlci5tanMiLCJ3ZWJwYWNrOi8vYml0bWFrZS8uL3NyYy9NYWtlU2NyaXB0Q29udGV4dC5qcyIsIndlYnBhY2s6Ly9iaXRtYWtlLy4vc3JjL1J1blNjcmlwdENvbnRleHQubWpzIiwid2VicGFjazovL2JpdG1ha2UvLi9zcmMvYml0bWFrZS9DdXN0b21TY3JpcHQuanMiLCJ3ZWJwYWNrOi8vYml0bWFrZS8uL3NyYy9iaXRtYWtlL0dsb2JhbENvbnRleHQuanMiLCJ3ZWJwYWNrOi8vYml0bWFrZS8uL3NyYy9iaXRtYWtlL0luc3RhbGxFbnRpdHkuanMiLCJ3ZWJwYWNrOi8vYml0bWFrZS8uL3NyYy9iaXRtYWtlL0ludGVyZmFjZUluY2x1ZGVzLmpzIiwid2VicGFjazovL2JpdG1ha2UvLi9zcmMvYml0bWFrZS9JbnRlcmZhY2VPYmplY3RzLmpzIiwid2VicGFjazovL2JpdG1ha2UvLi9zcmMvYml0bWFrZS9JbnRlcmZhY2VTY3JpcHQuanMiLCJ3ZWJwYWNrOi8vYml0bWFrZS8uL3NyYy9iaXRtYWtlL0ludGVyZmFjZVRhcmdldC5qcyIsIndlYnBhY2s6Ly9iaXRtYWtlLy4vc3JjL2JpdG1ha2UvUGx1Z2luQ29udGV4dC5qcyIsIndlYnBhY2s6Ly9iaXRtYWtlLy4vc3JjL2JpdG1ha2UvU2NyaXB0Q29sbGVjdGlvbi5qcyIsIndlYnBhY2s6Ly9iaXRtYWtlLy4vc3JjL2JpdG1ha2UvU291cmNlRmlsZS5qcyIsIndlYnBhY2s6Ly9iaXRtYWtlLy4vc3JjL2JpdG1ha2UvU291cmNlRmlsZUxpc3QuanMiLCJ3ZWJwYWNrOi8vYml0bWFrZS8uL3NyYy9iaXRtYWtlL1N5c3RlbVNjcmlwdHMvY29uZmlndXJlX2ZpbGUuanMiLCJ3ZWJwYWNrOi8vYml0bWFrZS8uL3NyYy9iaXRtYWtlL1N5c3RlbVNjcmlwdHMvaW5zdGFsbF9zY3JpcHQuanMiLCJ3ZWJwYWNrOi8vYml0bWFrZS8uL3NyYy9iaXRtYWtlL1N5c3RlbVZhcmlhYmxlcy5qcyIsIndlYnBhY2s6Ly9iaXRtYWtlLy4vc3JjL2JpdG1ha2UvVGFyZ2V0LmpzIiwid2VicGFjazovL2JpdG1ha2UvLi9zcmMvYml0bWFrZS9UYXJnZXRDb2xsZWN0aW9uLmpzIiwid2VicGFjazovL2JpdG1ha2UvLi9zcmMvYml0bWFrZS9Vbmtub3duVGFyZ2V0LmpzIiwid2VicGFjazovL2JpdG1ha2UvLi9zcmMvYml0bWFrZS9Vc2VyQ29udGV4dC5qcyIsIndlYnBhY2s6Ly9iaXRtYWtlLy4vc3JjL2JpdG1ha2UvaW5kZXguanMiLCJ3ZWJwYWNrOi8vYml0bWFrZS8uL3NyYy9jbWFrZS9Db25zdGFudHMudHMiLCJ3ZWJwYWNrOi8vYml0bWFrZS8uL3NyYy9jbWFrZS9IZWxwZXIudHMiLCJ3ZWJwYWNrOi8vYml0bWFrZS8uL3NyYy9jb3JlL0dvYWxDb2xsZWN0aW9uLnRzIiwid2VicGFjazovL2JpdG1ha2UvLi9zcmMvY29yZS9JbmNsdWRlRGlyZWN0b3J5LnRzIiwid2VicGFjazovL2JpdG1ha2UvLi9zcmMvY29yZS9QYXRoLnRzIiwid2VicGFjazovL2JpdG1ha2UvLi9zcmMvY29yZS9TeXN0ZW1WYXJpYWJsZXMudHMiLCJ3ZWJwYWNrOi8vYml0bWFrZS8uL3NyYy9jb3JlL1R5cGVzLnRzIiwid2VicGFjazovL2JpdG1ha2UvLi9zcmMvbG9nZ2VyL2luZGV4LnRzIiwid2VicGFjazovL2JpdG1ha2UvLi9zcmMvdXRpbHMvQWJzb2x1dGVQYXRoLmpzIiwid2VicGFjazovL2JpdG1ha2UvLi9zcmMvdXRpbHMvQ01ha2UuanMiLCJ3ZWJwYWNrOi8vYml0bWFrZS8uL3NyYy91dGlscy9DaGlsZFByb2Nlc3MuanMiLCJ3ZWJwYWNrOi8vYml0bWFrZS8uL3NyYy91dGlscy9GaWxlU3lzdGVtLnRzIiwid2VicGFjazovL2JpdG1ha2UvLi9zcmMvdXRpbHMvSHR0cFJlcXVlc3QudHMiLCJ3ZWJwYWNrOi8vYml0bWFrZS8uL3NyYy91dGlscy9JbXBvcnRNb2R1bGUubWpzIiwid2VicGFjazovL2JpdG1ha2UvLi9zcmMvdXRpbHMvTWFrZVBhdGNoLm1qcyIsIndlYnBhY2s6Ly9iaXRtYWtlLy4vc3JjL3V0aWxzL01vZHVsZS50cyIsIndlYnBhY2s6Ly9iaXRtYWtlLy4vc3JjL3V0aWxzL1ByaW1pdGl2ZXMudHMiLCJ3ZWJwYWNrOi8vYml0bWFrZS8uL3NyYy91dGlscy9TZXR0aW5nc1N0b3JhZ2UuanMiLCJ3ZWJwYWNrOi8vYml0bWFrZS8uL3NyYy91dGlscy9TdHJpY3RUeXBlLnRzIiwid2VicGFjazovL2JpdG1ha2UvZXh0ZXJuYWwgbm9kZS1jb21tb25qcyBcImNoaWxkX3Byb2Nlc3NcIiIsIndlYnBhY2s6Ly9iaXRtYWtlL2V4dGVybmFsIG5vZGUtY29tbW9uanMgXCJmc1wiIiwid2VicGFjazovL2JpdG1ha2UvZXh0ZXJuYWwgbm9kZS1jb21tb25qcyBcImh0dHBcIiIsIndlYnBhY2s6Ly9iaXRtYWtlL2V4dGVybmFsIG5vZGUtY29tbW9uanMgXCJodHRwc1wiIiwid2VicGFjazovL2JpdG1ha2UvZXh0ZXJuYWwgbm9kZS1jb21tb25qcyBcIm5vZGU6Y2hpbGRfcHJvY2Vzc1wiIiwid2VicGFjazovL2JpdG1ha2UvZXh0ZXJuYWwgbm9kZS1jb21tb25qcyBcIm5vZGU6ZnNcIiIsIndlYnBhY2s6Ly9iaXRtYWtlL2V4dGVybmFsIG5vZGUtY29tbW9uanMgXCJub2RlOm9zXCIiLCJ3ZWJwYWNrOi8vYml0bWFrZS9leHRlcm5hbCBub2RlLWNvbW1vbmpzIFwibm9kZTpwYXRoXCIiLCJ3ZWJwYWNrOi8vYml0bWFrZS9leHRlcm5hbCBub2RlLWNvbW1vbmpzIFwibm9kZTp1cmxcIiIsIndlYnBhY2s6Ly9iaXRtYWtlL2V4dGVybmFsIG5vZGUtY29tbW9uanMgXCJwYXRoXCIiLCJ3ZWJwYWNrOi8vYml0bWFrZS93ZWJwYWNrL2Jvb3RzdHJhcCIsIndlYnBhY2s6Ly9iaXRtYWtlL3dlYnBhY2svcnVudGltZS9jb21wYXQgZ2V0IGRlZmF1bHQgZXhwb3J0Iiwid2VicGFjazovL2JpdG1ha2Uvd2VicGFjay9ydW50aW1lL2RlZmluZSBwcm9wZXJ0eSBnZXR0ZXJzIiwid2VicGFjazovL2JpdG1ha2Uvd2VicGFjay9ydW50aW1lL2hhc093blByb3BlcnR5IHNob3J0aGFuZCIsIndlYnBhY2s6Ly9iaXRtYWtlL3dlYnBhY2svcnVudGltZS9tYWtlIG5hbWVzcGFjZSBvYmplY3QiLCJ3ZWJwYWNrOi8vYml0bWFrZS8uL3NyYy9tYWluLm1qcyJdLCJzb3VyY2VzQ29udGVudCI6WyJmdW5jdGlvbiB3ZWJwYWNrRW1wdHlBc3luY0NvbnRleHQocmVxKSB7XG5cdC8vIEhlcmUgUHJvbWlzZS5yZXNvbHZlKCkudGhlbigpIGlzIHVzZWQgaW5zdGVhZCBvZiBuZXcgUHJvbWlzZSgpIHRvIHByZXZlbnRcblx0Ly8gdW5jYXVnaHQgZXhjZXB0aW9uIHBvcHBpbmcgdXAgaW4gZGV2dG9vbHNcblx0cmV0dXJuIFByb21pc2UucmVzb2x2ZSgpLnRoZW4oKCkgPT4ge1xuXHRcdHZhciBlID0gbmV3IEVycm9yKFwiQ2Fubm90IGZpbmQgbW9kdWxlICdcIiArIHJlcSArIFwiJ1wiKTtcblx0XHRlLmNvZGUgPSAnTU9EVUxFX05PVF9GT1VORCc7XG5cdFx0dGhyb3cgZTtcblx0fSk7XG59XG53ZWJwYWNrRW1wdHlBc3luY0NvbnRleHQua2V5cyA9ICgpID0+IChbXSk7XG53ZWJwYWNrRW1wdHlBc3luY0NvbnRleHQucmVzb2x2ZSA9IHdlYnBhY2tFbXB0eUFzeW5jQ29udGV4dDtcbndlYnBhY2tFbXB0eUFzeW5jQ29udGV4dC5pZCA9IFwiLi9zcmMgbGF6eSByZWN1cnNpdmVcIjtcbm1vZHVsZS5leHBvcnRzID0gd2VicGFja0VtcHR5QXN5bmNDb250ZXh0OyIsImltcG9ydCBmcyBmcm9tIFwibm9kZTpmc1wiO1xuaW1wb3J0IHBhdGggZnJvbSBcIm5vZGU6cGF0aFwiO1xuXG5pbXBvcnQgY21ha2UgZnJvbSBcIkAvdXRpbHMvQ01ha2UuanNcIjtcbmltcG9ydCB7IG1ha2VQYXRjaCB9IGZyb20gXCJAL3V0aWxzL01ha2VQYXRjaC5tanNcIjtcbmltcG9ydCB7IHNhdmVJZkRpZmZlcmVudCwgZGlyZWN0b3J5RXhpc3RzLCBnZXRQYXRoU3RyaW5nIH0gZnJvbSBcIkAvdXRpbHMvRmlsZVN5c3RlbVwiO1xuaW1wb3J0IHsgU2V0dGluZ3NTdG9yYWdlIH0gZnJvbSBcIkAvdXRpbHMvU2V0dGluZ3NTdG9yYWdlLmpzXCI7XG5pbXBvcnQgeyBzcGF3bkFzeW5jIH0gZnJvbSBcIkAvdXRpbHMvQ2hpbGRQcm9jZXNzLmpzXCI7XG5pbXBvcnQgeyBhY3Rpb25NYWtlU2NyaXB0IH0gZnJvbSBcIkAvTWFrZVNjcmlwdENvbnRleHQuanNcIjtcbmltcG9ydCB7IGFycmF5V3JhcHBlciwgYXNzaWduT2JqZWN0IH0gZnJvbSBcIkAvdXRpbHMvUHJpbWl0aXZlc1wiO1xuaW1wb3J0IGNvbnN0YW50cyBmcm9tIFwiQC9Db25zdGFudHMuanNcIjtcbmltcG9ydCB7IHJlcXVpcmVSZXNvbHZlIH0gZnJvbSBcIkAvdXRpbHMvTW9kdWxlXCJcbmltcG9ydCB7IGNyZWF0ZUxvZ2dlciB9IGZyb20gXCJAL2xvZ2dlclwiO1xuaW1wb3J0IHsgcmVxdWVzdEdldCB9IGZyb20gXCJAL3V0aWxzL0h0dHBSZXF1ZXN0XCI7XG5cbmNvbnN0IGxvZ2dlciA9IGNyZWF0ZUxvZ2dlcihpbXBvcnQubWV0YS51cmwpO1xuXG5jb25zdCB7IEJVSUxEX0NPTkZJR19GSUxFLCBCVUlMRF9TRVRUSU5HU19GSUxFIH0gPSBjb25zdGFudHM7XG5cbmZ1bmN0aW9uIG1lcmdlRW52aXJvbm1lbnQoLi4uYXJncykge1xuICBjb25zdCBlbnZpcm9ubWVudCA9IHt9O1xuICBmb3IgKGNvbnN0IGVudiBvZiBhcmdzKSB7XG4gICAgY29uc3QgbGlzdCA9IE9iamVjdC5lbnRyaWVzKGVudiB8fCB7fSk7XG4gICAgd2hpbGUgKGxpc3QubGVuZ3RoKSB7XG4gICAgICBsZXQgW2tleSx2YWxdID0gbGlzdC5wb3AoKTtcbiAgICAgIGxldCBkZWxpbWl0ZXI7XG4gICAgICBsZXQgam9pbkFmdGVyID0gdHJ1ZTtcbiAgICAgIHN3aXRjaCAoa2V5KSB7XG4gICAgICBjYXNlIFwiUEFUSFwiOlxuICAgICAgICBkZWxpbWl0ZXIgPSBwYXRoLmRlbGltaXRlcjtcbiAgICAgICAgam9pbkFmdGVyID0gZmFsc2U7XG4gICAgICAgIGJyZWFrO1xuICAgICAgY2FzZSBcIkNGTEFHU1wiOlxuICAgICAgY2FzZSBcIkNYWEZMQUdTXCI6XG4gICAgICBjYXNlIFwiTERGTEFHU1wiOlxuICAgICAgICBkZWxpbWl0ZXIgPSBcIiBcIjtcbiAgICAgICAgYnJlYWs7XG4gICAgICB9XG4gICAgICBpZiAodHlwZW9mIHZhbCA9PT0gJ251bWJlcicpXG4gICAgICAgIHZhbCA9IHZhbC50b1N0cmluZygpO1xuICAgICAgZWxzZSBpZiAoQXJyYXkuaXNBcnJheSh2YWwpKVxuICAgICAgICB2YWwgPSB2YWwuam9pbihkZWxpbWl0ZXIpO1xuICAgICAgaWYgKCFkZWxpbWl0ZXIgfHwgIWVudmlyb25tZW50W2tleV0pXG4gICAgICAgIGVudmlyb25tZW50W2tleV0gPSB2YWw7XG4gICAgICBlbHNlIGlmIChqb2luQWZ0ZXIpXG4gICAgICAgIGVudmlyb25tZW50W2tleV0gPSB2YWwgKyBkZWxpbWl0ZXIgKyBlbnZpcm9ubWVudFtrZXldO1xuICAgICAgZWxzZVxuICAgICAgICBlbnZpcm9ubWVudFtrZXldID0gZW52aXJvbm1lbnRba2V5XSArIGRlbGltaXRlciArIHZhbDtcbiAgICB9XG4gIH1cbiAgcmV0dXJuIGVudmlyb25tZW50O1xufVxuXG5mdW5jdGlvbiByZWJhc2VDb25maWcoY29uZmlnKSB7XG4gIGNvbnN0IGJhc2VDb25maWcgPSB7fTtcbiAgY29uc3Qgb3RoZXJDb25maWcgPSB7fTtcblxuICBmb3IgKGNvbnN0IFtrZXksIGVudHJ5XSBvZiBPYmplY3QuZW50cmllcyhjb25maWcpKSB7XG4gICAgKGVudHJ5LmJhc2UgPyBvdGhlckNvbmZpZyA6IGJhc2VDb25maWcpW2tleV0gPSBlbnRyeTtcbiAgfVxuXG4gIHdoaWxlICh0cnVlKSB7XG4gICAgY29uc3Qga2V5cyA9IE9iamVjdC5rZXlzKG90aGVyQ29uZmlnKTtcbiAgICBpZiAoa2V5cy5sZW5ndGggPT0gMClcbiAgICAgIGJyZWFrO1xuICAgIGNvbnN0IGRvbmVLZXlzID0gW107XG4gICAgZm9yIChjb25zdCBrZXkgb2Yga2V5cykge1xuICAgICAgY29uc3Qgb3RoZXJJdGVyID0gb3RoZXJDb25maWdba2V5XTtcbiAgICAgIGNvbnN0IGJhc2VMaXN0ID0gW107XG4gICAgICBmb3IgKGNvbnN0IGl0ZXIgb2YgYXJyYXlXcmFwcGVyKG90aGVySXRlci5iYXNlKSkge1xuICAgICAgICBjb25zdCBiYXNlRW50cnkgPSBiYXNlQ29uZmlnW2l0ZXJdO1xuICAgICAgICBpZiAoIWJhc2VFbnRyeSkge1xuICAgICAgICAgIGJhc2VMaXN0Lmxlbmd0aCA9IDA7XG4gICAgICAgICAgYnJlYWs7XG4gICAgICAgIH1cbiAgICAgICAgYmFzZUxpc3QucHVzaChiYXNlRW50cnkpO1xuICAgICAgfVxuICAgICAgaWYgKGJhc2VMaXN0Lmxlbmd0aCkge1xuICAgICAgICBiYXNlTGlzdC5wdXNoKG90aGVySXRlcik7XG4gICAgICAgIGxldCBuZXdFbnRyeSA9IHt9O1xuICAgICAgICBmb3IgKGNvbnN0IGl0ZXIgb2YgYmFzZUxpc3QpIHtcbiAgICAgICAgICBhc3NpZ25PYmplY3QobmV3RW50cnksIGl0ZXIpO1xuICAgICAgICB9XG4gICAgICAgIGJhc2VDb25maWdba2V5XSA9IG5ld0VudHJ5O1xuICAgICAgICBkb25lS2V5cy5wdXNoKGtleSk7XG4gICAgICB9XG4gICAgfVxuICAgIGlmIChkb25lS2V5cy5sZW5ndGggPT0gMCkge1xuICAgICAgZm9yIChjb25zdCBrZXkgb2Yga2V5cylcbiAgICAgICAgdGhyb3cgYENhbid0IHNldCBiYXNlIGNvbmZpZyBmb3IgXCIke2tleX1gO1xuICAgIH1cbiAgICBmb3IgKGNvbnN0IGtleSBvZiBkb25lS2V5cykge1xuICAgICAgZGVsZXRlIGJhc2VDb25maWdba2V5XS5iYXNlO1xuICAgICAgZGVsZXRlIG90aGVyQ29uZmlnW2tleV07XG4gICAgfVxuICB9XG5cbiAgcmV0dXJuIGJhc2VDb25maWc7XG59XG5cbmZ1bmN0aW9uIHJlc29sdmVTdHJpbmdXaXRoVmFyaWFibGUoY29uZmlnLCBlbnRyeUNvbmZpZywgcm9vdENvbmZpZywgdmFsKSB7XG4gIHJldHVybiB2YWwucmVwbGFjZSgvXFwkXFx7KFtefV0rKVxcfS9nLCAobWF0Y2gsIHZhbHVlKSA9PiB7XG4gICAgbGV0IHNlbDtcbiAgICBmb3IgKGNvbnN0IG5hbWUgb2YgdmFsdWUuc3BsaXQoXCIuXCIpKSB7XG4gICAgICBpZiAoc2VsID09PSB1bmRlZmluZWQpIHtcbiAgICAgICAgaWYgKGNvbmZpZy5oYXNPd25Qcm9wZXJ0eShuYW1lKSkge1xuICAgICAgICAgIHNlbCA9IGNvbmZpZ1tuYW1lXTtcbiAgICAgICAgfVxuICAgICAgICBlbHNlIGlmIChjb25maWcgIT09IGVudHJ5Q29uZmlnICYmIGVudHJ5Q29uZmlnLmhhc093blByb3BlcnR5KG5hbWUpKSB7XG4gICAgICAgICAgc2VsID0gZW50cnlDb25maWdbbmFtZV07XG4gICAgICAgIH1cbiAgICAgICAgZWxzZSBpZiAoY29uZmlnICE9PSByb290Q29uZmlnICYmIHJvb3RDb25maWcuaGFzT3duUHJvcGVydHkobmFtZSkpIHtcbiAgICAgICAgICBzZWwgPSByb290Q29uZmlnW25hbWVdO1xuICAgICAgICB9XG4gICAgICAgIGVsc2Uge1xuICAgICAgICAgIHRyeSB7XG4gICAgICAgICAgICBjb25zdCBtYWluRmlsZSA9IHJlcXVpcmVSZXNvbHZlKG5hbWUpO1xuICAgICAgICAgICAgaWYgKG1haW5GaWxlKSB7XG4gICAgICAgICAgICAgIHNlbCA9IHsgbWFpbkZpbGUsIG1haW5EaXI6IHBhdGgucG9zaXguZGlybmFtZShtYWluRmlsZSksIH07XG4gICAgICAgICAgICB9XG4gICAgICAgICAgfSBjYXRjaChlKSB7fVxuICAgICAgICB9XG4gICAgICAgIGlmIChzZWwgPT09IHVuZGVmaW5lZClcbiAgICAgICAgICBicmVhaztcbiAgICAgIH1cbiAgICAgIGVsc2UgaWYgKHNlbC5oYXNPd25Qcm9wZXJ0eShuYW1lKSkge1xuICAgICAgICBzZWwgPSBzZWxbbmFtZV07XG4gICAgICB9XG4gICAgICBlbHNlIHtcbiAgICAgICAgc2VsID0gdW5kZWZpbmVkO1xuICAgICAgICBicmVhaztcbiAgICAgIH1cbiAgICB9XG4gICAgaWYgKHNlbCA9PT0gdW5kZWZpbmVkKVxuICAgICAgdGhyb3cgbmV3IEVycm9yKGBUaGUgJHt2YWx1ZX0gdmFyaWFibGUgZG9lcyBub3QgZXhpc3RcImApO1xuICAgIHJldHVybiBzZWw7XG4gIH0pO1xufVxuXG5mdW5jdGlvbiByZXNvbHZlQ29uZmlnU3RyaW5nc0ltcGwoY29uZmlnLCBlbnRyeUNvbmZpZywgcm9vdENvbmZpZykge1xuICBsZXQgY291bnQgPSAwO1xuICBmb3IgKGNvbnN0IFtrZXksIHZhbF0gb2YgT2JqZWN0LmVudHJpZXMoY29uZmlnKSkge1xuICAgIGlmICh2YWwgJiYgdHlwZW9mIHZhbCA9PT0gXCJvYmplY3RcIilcbiAgICAgIGNvdW50ICs9IHJlc29sdmVDb25maWdTdHJpbmdzSW1wbCh2YWwsIGVudHJ5Q29uZmlnLCByb290Q29uZmlnKTtcbiAgICBlbHNlIGlmICh0eXBlb2YgdmFsID09PSBcInN0cmluZ1wiKSB7XG4gICAgICBjb25zdCB2ID0gcmVzb2x2ZVN0cmluZ1dpdGhWYXJpYWJsZShjb25maWcsIGVudHJ5Q29uZmlnLCByb290Q29uZmlnLCB2YWwpO1xuICAgICAgaWYgKHZhbCAhPT0gdikge1xuICAgICAgICBjb25maWdba2V5XSA9IHY7XG4gICAgICAgIGNvdW50Kys7XG4gICAgICB9XG4gICAgfVxuICB9XG4gIHJldHVybiBjb3VudDtcbn1cblxuZnVuY3Rpb24gcmVzb2x2ZUNvbmZpZ1N0cmluZ3MoY29uZmlnKSB7XG4gIGZvciAoOzspIHtcbiAgICBsZXQgY291bnQgPSAwO1xuICAgIGZvciAoY29uc3QgW2tleSwgdmFsXSBvZiBPYmplY3QuZW50cmllcyhjb25maWcpKSB7XG4gICAgICBpZiAodmFsICYmIHR5cGVvZiB2YWwgPT09IFwib2JqZWN0XCIpXG4gICAgICAgIGNvdW50ICs9IHJlc29sdmVDb25maWdTdHJpbmdzSW1wbCh2YWwsIHZhbCwgY29uZmlnKTtcbiAgICAgIGVsc2UgIGlmICh0eXBlb2YgdmFsID09PSBcInN0cmluZ1wiKSB7XG4gICAgICAgIGNvbnN0IHYgPSByZXNvbHZlU3RyaW5nV2l0aFZhcmlhYmxlKGNvbmZpZywgY29uZmlnLCBjb25maWcsIHZhbCk7XG4gICAgICAgIGlmICh2YWwgIT09IHYpIHtcbiAgICAgICAgICBjb25maWdba2V5XSA9IHY7XG4gICAgICAgICAgY291bnQrKztcbiAgICAgICAgfVxuICAgICAgfVxuICAgIH1cbiAgICBpZiAoIWNvdW50KVxuICAgICAgYnJlYWs7XG4gIH1cbn1cblxuZnVuY3Rpb24gbWFrZUJ1aWxkQ29uZmlnKGN0eCwgY29uZmlnKSB7XG4gIGZvciAoY29uc3Qga2V5IG9mIFsgXCJzb3VyY2VSb290XCIsIFwid2FzbXV4RGlyXCIgXSkge1xuICAgIGlmIChjb25maWdba2V5XSkge1xuICAgICAgdGhyb3cgYFRoZSAke2tleX0gdmFyaWFibGUgY2Fubm90IGJlIGNoYW5nZWQgdG8gXCIke2NvbmZpZy5zb3VyY2VSb290fVwiYDtcbiAgICB9XG4gIH1cblxuICBjb25zdCByb290Q29uZmlnID0gcmViYXNlQ29uZmlnKGNvbmZpZyk7XG5cbiAgcm9vdENvbmZpZy5idWlsZFR5cGUgPSByb290Q29uZmlnLmJ1aWxkVHlwZSB8fCBjdHguYnVpbGRUeXBlO1xuICByb290Q29uZmlnLnNvdXJjZVJvb3QgPSByb290Q29uZmlnLnNvdXJjZVJvb3QgfHwgY3R4LndvcmtEaXI7XG4gIHJvb3RDb25maWcuYmluYXJ5Um9vdCA9IHJvb3RDb25maWcuYmluYXJ5Um9vdCB8fCBwYXRoLnBvc2l4LnJlc29sdmUoY3R4LndvcmtEaXIsXCJidWlsZFwiKTtcblxuICBmb3IgKGNvbnN0IFtrZXksIGVudHJ5XSBvZiBPYmplY3QuZW50cmllcyhyb290Q29uZmlnKSkge1xuICAgIGlmIChlbnRyeSAmJiB0eXBlb2YgZW50cnkgPT09IFwib2JqZWN0XCIgJiYgZW50cnkuYWN0aW9uKSB7XG4gICAgICBlbnRyeS5idWlsZFR5cGUgPSBlbnRyeS5idWlsZFR5cGUgfHwgcm9vdENvbmZpZy5idWlsZFR5cGU7XG4gICAgICBjb25zdCBmb2xkZXIgPSBrZXkucmVwbGFjZShcIjpcIiwgcGF0aC5wb3NpeC5zZXApO1xuICAgICAgY29uc3Qgd29ya0RpciA9IHBhdGgucG9zaXguam9pbihyb290Q29uZmlnLmJpbmFyeVJvb3QsIGZvbGRlcik7XG4gICAgICBlbnRyeS50ZW1wRGlyID0gZW50cnkudGVtcERpciB8fCBwYXRoLnBvc2l4LmpvaW4od29ya0RpciwgXCJ0bXBcIik7XG4gICAgICBpZiAoZW50cnkuc291cmNlVXJsKSB7XG4gICAgICAgIGVudHJ5LmFyY2hpdmVEaXIgPSBlbnRyeS5hcmNoaXZlRGlyIHx8IHBhdGgucG9zaXguam9pbih3b3JrRGlyLCBcImFyY1wiKTtcbiAgICAgICAgZW50cnkuZXh0cmFjdERpciA9IGVudHJ5LmV4dHJhY3REaXIgfHwgcGF0aC5wb3NpeC5qb2luKHdvcmtEaXIsIFwic3JjXCIpO1xuICAgICAgICBpZiAoIWVudHJ5LnNvdXJjZURpcilcbiAgICAgICAgICBlbnRyeS5zb3VyY2VEaXIgPSBlbnRyeS5leHRyYWN0RGlyO1xuICAgICAgICBlbHNlIGlmICghcGF0aC5pc0Fic29sdXRlKGVudHJ5LnNvdXJjZURpcikpXG4gICAgICAgICAgZW50cnkuc291cmNlRGlyID0gcGF0aC5wb3NpeC5qb2luKGVudHJ5LmV4dHJhY3REaXIsIGVudHJ5LnNvdXJjZURpcik7XG4gICAgICB9XG4gICAgICBlbHNlIGlmICghZW50cnkuc291cmNlRGlyKSB7XG4gICAgICAgIHRocm93IGBNaXNzaW5nIHNvdXJjZURpciBmb3IgJHtrZXl9IGFjdGlvblwiYDtcbiAgICAgIH1cbiAgICAgIGlmIChlbnRyeS5iaW5hcnlEaXIgPT09IG51bGwpXG4gICAgICAgIGVudHJ5LmJpbmFyeURpciA9IGVudHJ5LnNvdXJjZURpcjtcbiAgICAgIGVsc2UgaWYgKGVudHJ5LmJpbmFyeURpciA9PT0gdW5kZWZpbmVkKVxuICAgICAgICBlbnRyeS5iaW5hcnlEaXIgPSBwYXRoLnBvc2l4LmpvaW4od29ya0RpciwgXCJiaW5cIik7XG4gICAgfVxuICB9XG5cbiAgcmVzb2x2ZUNvbmZpZ1N0cmluZ3Mocm9vdENvbmZpZyk7XG5cbiAgcmV0dXJuIHJvb3RDb25maWc7XG59XG5cbmFzeW5jIGZ1bmN0aW9uIHRyeVJlcXVlc3RHZXQoc291cmNlVXJsLCBhcmNGaWxlLCBhdHRlbXB0cylcbntcbiAgZm9yKDs7KSB7XG4gICAgdHJ5IHtcbiAgICAgIGNvbnN0IGJ1ZmZlciA9IGF3YWl0IHJlcXVlc3RHZXQoc291cmNlVXJsKTtcbiAgICAgIGF3YWl0IGZzLnByb21pc2VzLndyaXRlRmlsZShhcmNGaWxlLCBidWZmZXIpO1xuICAgICAgcmV0dXJuO1xuICAgIH1cbiAgICBjYXRjaCAoZSkge1xuICAgICAgaWYgKC0tYXR0ZW1wdHMgPCAwKSB7XG4gICAgICAgIHRocm93IGU7XG4gICAgICB9XG4gICAgICBjb25zb2xlLndhcm4oZSk7XG4gICAgfVxuICB9XG59XG5cbmFzeW5jIGZ1bmN0aW9uIGRvRXh0cmFjdEFyY2hpdmUoY3R4LCBlbnZpcm9ubWVudCwgY29uZmlnLCBzZXR0aW5ncylcbntcbiAgaWYgKCFjb25maWcuc291cmNlVXJsKVxuICAgIHRocm93IFwiVW5rbm93biBzb3VyY2VVcmxcIjtcbiAgaWYgKCFjb25maWcuYXJjaGl2ZURpcilcbiAgICB0aHJvdyBcIlVua25vd24gYXJjaGl2ZURpclwiO1xuICBpZiAoIWNvbmZpZy5leHRyYWN0RGlyKVxuICAgIHRocm93IFwiVW5rbm93biBleHRyYWN0RGlyXCI7XG5cbiAgaWYgKCFhd2FpdCBkaXJlY3RvcnlFeGlzdHMoY29uZmlnLmFyY2hpdmVEaXIpKSB7XG4gICAgY29uc29sZS5sb2coYG1rZGlyIC1wICR7Y29uZmlnLmFyY2hpdmVEaXJ9YCk7XG4gICAgYXdhaXQgZnMucHJvbWlzZXMubWtkaXIoY29uZmlnLmFyY2hpdmVEaXIsIHsgcmVjdXJzaXZlOiB0cnVlIH0pO1xuICB9XG5cbiAgaWYgKCFhd2FpdCBkaXJlY3RvcnlFeGlzdHMoY29uZmlnLnRlbXBEaXIpKSB7XG4gICAgY29uc29sZS5sb2coYG1rZGlyIC1wICR7Y29uZmlnLnRlbXBEaXJ9YCk7XG4gICAgYXdhaXQgZnMucHJvbWlzZXMubWtkaXIoY29uZmlnLnRlbXBEaXIsIHsgcmVjdXJzaXZlOiB0cnVlIH0pO1xuICB9XG5cbiAgY29uc3QgYXJjTmFtZSA9IHBhdGguYmFzZW5hbWUoY29uZmlnLnNvdXJjZVVybCk7XG5cbiAgbGV0IGFyY0ZpbGU7XG4gIGxldCBkb3dubG9hZFVybHMgPSBhd2FpdCBzZXR0aW5ncy5nZXQoXCJkb3dubG9hZFVybHNcIikgfHwge307XG4gIGlmIChkb3dubG9hZFVybHNbY29uZmlnLnNvdXJjZVVybF0pXG4gICAgYXJjRmlsZSA9IGRvd25sb2FkVXJsc1tjb25maWcuc291cmNlVXJsXTtcbiAgZWxzZSB7XG4gICAgYXJjRmlsZSA9IHBhdGguam9pbihjb25maWcuYXJjaGl2ZURpciwgYXJjTmFtZSk7XG4gICAgYXdhaXQgdHJ5UmVxdWVzdEdldChjb25maWcuc291cmNlVXJsLCBhcmNGaWxlLCBjdHgucmVxdWVzdEF0dGVtcHRzKTtcbiAgICBkb3dubG9hZFVybHNbY29uZmlnLnNvdXJjZVVybF0gPSBhcmNGaWxlO1xuICAgIGF3YWl0IHNldHRpbmdzLnNldChcImRvd25sb2FkVXJsc1wiLCBkb3dubG9hZFVybHMpO1xuICB9XG5cbiAgbGV0IGV4dHJhY3REaXI7XG4gIGxldCBleHRyYWN0RmlsZXMgPSBhd2FpdCBzZXR0aW5ncy5nZXQoXCJleHRyYWN0RmlsZXNcIikgfHwge307XG4gIGlmIChleHRyYWN0RmlsZXNbYXJjRmlsZV0pIHtcbiAgICBleHRyYWN0RGlyID0gZXh0cmFjdEZpbGVzW2FyY0ZpbGVdO1xuICB9XG4gIGVsc2Uge1xuICAgIGV4dHJhY3REaXIgPSBhd2FpdCBmcy5wcm9taXNlcy5ta2R0ZW1wKHBhdGgucmVzb2x2ZShjb25maWcudGVtcERpciwgYXJjTmFtZSArICcuJykpO1xuICBcbiAgICBhd2FpdCBjbWFrZS5leHRyYWN0KHtcbiAgICAgIGVudmlyb25tZW50LFxuICAgICAgZmlsZW5hbWU6IGFyY0ZpbGUsXG4gICAgICB3b3JrRGlyOiBleHRyYWN0RGlyLFxuICAgICAgbG9nRmlsZTogIHBhdGguam9pbihjb25maWcudGVtcERpciwgcGF0aC5iYXNlbmFtZShleHRyYWN0RGlyKSArIFwiLmxvZ1wiKSxcbiAgICB9KTtcbiAgXG4gICAgY29uc3QgZXh0cmFjdExpc3QgPSBhd2FpdCBmcy5wcm9taXNlcy5yZWFkZGlyKGV4dHJhY3REaXIpO1xuICAgIGlmIChleHRyYWN0TGlzdC5sZW5ndGggPT09IDEpIHtcbiAgICAgIGV4dHJhY3REaXIgPSBwYXRoLnJlc29sdmUoZXh0cmFjdERpciwgZXh0cmFjdExpc3RbMF0pO1xuICAgICAgaWYgKCFhd2FpdCBkaXJlY3RvcnlFeGlzdHMoZXh0cmFjdERpcikpIHtcbiAgICAgICAgY29uc29sZS5sb2coYHJtIC1mciAke2V4dHJhY3REaXJ9YCk7XG4gICAgICAgIGF3YWl0IGZzLnByb21pc2VzLnJtKGV4dHJhY3REaXIsIHsgcmVjdXJzaXZlOiB0cnVlIH0pO1xuICAgICAgICB0aHJvdyBgU3VwcG9ydCBvbmx5IGRpcmVjdG9yeSBmb3IgYXJjaGl2ZWA7XG4gICAgICB9XG4gICAgfVxuICBcbiAgICBpZiAoYXdhaXQgZGlyZWN0b3J5RXhpc3RzKGNvbmZpZy5leHRyYWN0RGlyKSkge1xuICAgICAgLy8gVE9ETzogTWFyZ2UgZXh0cmFjdERpciB3aXRoIG91dHB1dFxuICAgICAgY29uc29sZS5sb2coYHJtIC1mciAke2NvbmZpZy5leHRyYWN0RGlyfWApO1xuICAgICAgYXdhaXQgZnMucHJvbWlzZXMucm0oY29uZmlnLmV4dHJhY3REaXIsIHsgcmVjdXJzaXZlOiB0cnVlIH0pO1xuICAgIH1cbiAgICBlbHNlIHtcbiAgICAgIGNvbnN0IHBhcmVudERpciA9IHBhdGguZGlybmFtZShjb25maWcuZXh0cmFjdERpcik7XG4gICAgICBpZiAoIWF3YWl0IGRpcmVjdG9yeUV4aXN0cyhwYXJlbnREaXIpKSB7XG4gICAgICAgIGNvbnNvbGUubG9nKGBta2RpciAtcCAke3BhcmVudERpcn1gKTtcbiAgICAgICAgYXdhaXQgZnMucHJvbWlzZXMubWtkaXIocGFyZW50RGlyLCB7IHJlY3Vyc2l2ZTogdHJ1ZSB9KTsgXG4gICAgICB9XG4gICAgfVxuICBcbiAgICBjb25zb2xlLmxvZyhgbXYgJHtleHRyYWN0RGlyfSAke2NvbmZpZy5leHRyYWN0RGlyfWApO1xuICAgIGF3YWl0IGZzLnByb21pc2VzLnJlbmFtZShleHRyYWN0RGlyLCBjb25maWcuZXh0cmFjdERpcik7XG4gIFxuICAgIGV4dHJhY3RGaWxlc1thcmNGaWxlXSA9IGV4dHJhY3REaXI7XG4gICAgYXdhaXQgc2V0dGluZ3Muc2V0KFwiZXh0cmFjdEZpbGVzXCIsIGV4dHJhY3RGaWxlcyk7XG4gIH1cblxuICBpZiAoY29uZmlnLnBhdGNoRGlyKSB7XG4gICAgbGV0IHBhdGNoRGlycyA9IGF3YWl0IHNldHRpbmdzLmdldChcInBhdGNoRGlyc1wiKSB8fCB7fTtcbiAgICBpZiAoIXBhdGNoRGlyc1tjb25maWcucGF0Y2hEaXJdKSB7XG4gICAgICBhd2FpdCBtYWtlUGF0Y2goY29uZmlnLnBhdGNoRGlyLCBjb25maWcuZXh0cmFjdERpcik7XG4gICAgICBwYXRjaERpcnNbY29uZmlnLnBhdGNoRGlyXSA9IGNvbmZpZy5leHRyYWN0RGlyO1xuICAgICAgYXdhaXQgc2V0dGluZ3Muc2V0KFwicGF0Y2hEaXJzXCIsIHBhdGNoRGlycyk7XG4gICAgfVxuICB9XG59XG5cbmNvbnN0IGFjdGlvbkhhbmRsZXJzID0ge1xuICBub25lOiBhc3luYyAoY29uZmlnLCBlbnZpcm9ubWVudCwgc2V0dGluZ3MpID0+IHtcbiAgICAvKiBkbyBub3RoaW5nICovXG4gIH0sXG4gIGNtYWtlOiBhc3luYyAoY29uZmlnLCBlbnZpcm9ubWVudCwgc2V0dGluZ3MpID0+IHtcbiAgICBjb25zdCBzb3VyY2VEaXIgPSBnZXRQYXRoU3RyaW5nKGNvbmZpZy5zb3VyY2VEaXIpO1xuICAgIGNvbnN0IGJpbmFyeURpciA9IGdldFBhdGhTdHJpbmcoY29uZmlnLmJpbmFyeURpcik7XG4gICAgY29uc3QgY21ha2VBcmdzID0ge1xuICAgICAgZW52aXJvbm1lbnQ6IHtcbiAgICAgICAgLi4uZW52aXJvbm1lbnQsXG4gICAgICAgIERFU1RESVI6IGNvbmZpZy5kZXN0RGlyLFxuICAgICAgfSxcbiAgICAgIGdlbmVyYXRvcjogY29uZmlnLmdlbmVyYXRvciB8fCBcIlVuaXggTWFrZWZpbGVzXCIsXG4gICAgICBjYWNoZVZhcmlhYmxlczogY29uZmlnLmNhY2hlVmFyaWFibGVzLFxuICAgICAgc291cmNlRGlyLFxuICAgICAgYmluYXJ5RGlyLFxuICAgIH07XG5cbiAgICBpZiAoIWNtYWtlQXJncy5jYWNoZVZhcmlhYmxlcy5DTUFLRV9CVUlMRF9UWVBFKSB7XG4gICAgICBjbWFrZUFyZ3MuY2FjaGVWYXJpYWJsZXMuQ01BS0VfQlVJTERfVFlQRSA9IGNvbmZpZy5idWlsZFR5cGU7XG4gICAgfVxuXG4gICAgYXdhaXQgY21ha2UuY29uZmlndXJlKGNtYWtlQXJncyk7XG4gICAgYXdhaXQgY21ha2UuYnVpbGQoY21ha2VBcmdzKTtcbiAgICBhd2FpdCBjbWFrZS5pbnN0YWxsKGNtYWtlQXJncyk7XG4gIH0sXG4gIGNvbmZpZ3VyZTogYXN5bmMgKGNvbmZpZywgZW52aXJvbm1lbnQsIHNldHRpbmdzKSA9PiB7XG4gICAgY29uc3Qgc291cmNlRGlyID0gZ2V0UGF0aFN0cmluZyhjb25maWcuc291cmNlRGlyKTtcbiAgICBjb25zdCBiaW5hcnlEaXIgPSBnZXRQYXRoU3RyaW5nKGNvbmZpZy5iaW5hcnlEaXIpO1xuICAgIGxldCBzdGVwID0gYXdhaXQgc2V0dGluZ3MuZ2V0KFwiY29uZmlndXJlXCIpIHx8IFwiY29uZmlnXCI7XG4gICAgaWYgKHN0ZXAgPT09IFwiY29uZmlnXCIpIHtcbiAgICAgIGNvbnN0IGNvbW1hbmQgPSBwYXRoLnJlc29sdmUoc291cmNlRGlyLCBcImNvbmZpZ3VyZVwiKTtcbiAgICAgIGNvbnN0IHBhcmFtcyA9IFtdO1xuICAgICAgaWYgKEFycmF5LmlzQXJyYXkoY29uZmlnLnZhcmlhYmxlcykpIHtcbiAgICAgICAgZm9yIChjb25zdCBpdGVyIG9mIGNvbmZpZy52YXJpYWJsZXMpXG4gICAgICAgICAgcGFyYW1zLnB1c2goaXRlcik7XG4gICAgICB9XG4gICAgICBlbHNlIGlmIChjb25maWcudmFyaWFibGVzKSB7XG4gICAgICAgIGZvciAoY29uc3QgW2tleSx2YWxdIG9mIE9iamVjdC5lbnRyaWVzKGNvbmZpZy52YXJpYWJsZXMpKSB7XG4gICAgICAgICAgaWYgKGtleSA9PT0gXCJmZWF0dXJlc1wiICYmIEFycmF5LmlzQXJyYXkodmFsKSkge1xuICAgICAgICAgICAgZm9yIChjb25zdCBpdGVyIG9mIHZhbClcbiAgICAgICAgICAgICAgcGFyYW1zLnB1c2goYC0tJHtpdGVyfWApO1xuICAgICAgICAgIH1cbiAgICAgICAgICBlbHNlIGlmICh2YWwgPT09IG51bGwpXG4gICAgICAgICAgICBwYXJhbXMucHVzaChgLS0ke2tleX1gKTtcbiAgICAgICAgICBlbHNlXG4gICAgICAgICAgICBwYXJhbXMucHVzaChgLS0ke2tleX09JHt2YWx9YCk7XG4gICAgICAgIH1cbiAgICAgIH1cbiAgICAgIGlmIChjb25maWcuZmVhdHVyZXMpIHtcbiAgICAgICAgZm9yIChjb25zdCBrZXkgb2YgY29uZmlnLmZlYXR1cmVzKVxuICAgICAgICAgIHBhcmFtcy5wdXNoKGAtLSR7a2V5fWApO1xuICAgICAgfVxuICAgICAgY29uc3QgcmVzMSA9IGF3YWl0IHNwYXduQXN5bmMoY29tbWFuZCwgcGFyYW1zLCB7XG4gICAgICAgIGN3ZDogYmluYXJ5RGlyLFxuICAgICAgICBlbnY6IGVudmlyb25tZW50LFxuICAgICAgICBleHRyYToge1xuICAgICAgICAgIG91dHB1dDogYGFjLmNvbmZpZy5sb2dgLFxuICAgICAgICB9LFxuICAgICAgfSk7XG4gICAgICBpZiAocmVzMS5zdGF0dXMgIT09IDApIHtcbiAgICAgICAgdGhyb3cgYGNvbmZpZ3VyZSByZXR1cm5lZCBzdGF0dXMgJHtyZXMxLnN0YXR1c31gO1xuICAgICAgfVxuICAgICAgc3RlcCA9IFwiaW5zdGFsbFwiO1xuICAgICAgYXdhaXQgc2V0dGluZ3Muc2V0KFwiY29uZmlndXJlXCIsIHN0ZXApO1xuICAgIH1cbiAgICBpZiAoc3RlcCA9PT0gXCJpbnN0YWxsXCIpIHtcbiAgICAgIGNvbnN0IGFyZ3MgPSBbICdpbnN0YWxsJyBdO1xuICAgICAgaWYgKGNvbmZpZy5kZXN0RGlyKSB7XG4gICAgICAgIGFyZ3MucHVzaChgREVTVERJUj0ke2NvbmZpZy5kZXN0RGlyfWApO1xuICAgICAgfVxuICAgICAgY29uc3QgcmVzMiA9IGF3YWl0IHNwYXduQXN5bmMoXCJtYWtlXCIsIGFyZ3MsIHtcbiAgICAgICAgY3dkOiBiaW5hcnlEaXIsXG4gICAgICAgIGVudjogZW52aXJvbm1lbnQsXG4gICAgICAgIGV4dHJhOiB7XG4gICAgICAgICAgb3V0cHV0OiBgYWMuYnVpbGQubG9nYCxcbiAgICAgICAgfSxcbiAgICAgIH0pO1xuICAgICAgaWYgKHJlczIuc3RhdHVzICE9PSAwKSB7XG4gICAgICAgIHRocm93IGBtYWtlIHJldHVybmVkIHN0YXR1cyAke3JlczIuc3RhdHVzfWA7XG4gICAgICB9XG4gICAgICBzdGVwID0gXCJkb25lXCI7XG4gICAgICBhd2FpdCBzZXR0aW5ncy5zZXQoXCJjb25maWd1cmVcIiwgc3RlcCk7XG4gICAgfVxuICB9LFxuICBtYWtlOiBhc3luYyAoY29uZmlnLCBlbnZpcm9ubWVudCwgc2V0dGluZ3MpID0+IHtcbiAgICBjb25zdCBiaW5hcnlEaXIgPSBnZXRQYXRoU3RyaW5nKGNvbmZpZy5iaW5hcnlEaXIpO1xuICAgIGNvbnN0IGFyZ3MgPSBjb25maWcuYXJncyB8fCBbXTtcbiAgICBpZiAoY29uZmlnLmRlc3REaXIpIHtcbiAgICAgIGFyZ3MucHVzaChgREVTVERJUj0ke2NvbmZpZy5kZXN0RGlyfWApO1xuICAgIH1cbiAgICBjb25zdCByZXMyID0gYXdhaXQgc3Bhd25Bc3luYyhcIm1ha2VcIiwgYXJncywge1xuICAgICAgY3dkOiBiaW5hcnlEaXIsXG4gICAgICBlbnY6IGVudmlyb25tZW50LFxuICAgICAgZXh0cmE6IHtcbiAgICAgICAgb3V0cHV0OiBgbWFrZS5sb2dgLFxuICAgICAgfSxcbiAgICB9KTtcbiAgICBpZiAocmVzMi5zdGF0dXMgIT09IDApIHtcbiAgICAgIHRocm93IGBtYWtlIHJldHVybmVkIHN0YXR1cyAke3JlczIuc3RhdHVzfWA7XG4gICAgfVxuICB9LFxuICBwcm9jZXNzOiBhc3luYyAoY29uZmlnLCBlbnZpcm9ubWVudCwgc2V0dGluZ3MpID0+IHtcbiAgICBpZiAoIWNvbmZpZy5jb21tYW5kKVxuICAgICAgdGhyb3cgXCJSZXF1aXJlZCBjb21tYW5kIGZpZWxkIGZvciBwcm9jZXNzIGFjdGlvblwiO1xuICAgIGNvbnN0IHNvdXJjZURpciA9IGdldFBhdGhTdHJpbmcoY29uZmlnLnNvdXJjZURpcik7XG4gICAgY29uc3QgYmluYXJ5RGlyID0gZ2V0UGF0aFN0cmluZyhjb25maWcuYmluYXJ5RGlyKTtcbiAgICBsZXQgeyBjb21tYW5kIH0gPSBjb25maWc7XG4gICAgaWYgKCFwYXRoLmlzQWJzb2x1dGUoY29tbWFuZCkgJiYgKGNvbW1hbmQuaW5jbHVkZXMocGF0aC5wb3NpeC5kZWxpbWl0ZXIpIHx8IGNvbW1hbmQuaW5jbHVkZXMocGF0aC53aW4zMi5kZWxpbWl0ZXIpKSkge1xuICAgICAgY29tbWFuZCA9IHBhdGgucmVzb2x2ZShzb3VyY2VEaXIsIGNvbW1hbmQpO1xuICAgIH1cbiAgICBjb25zdCByZXMgPSBhd2FpdCBzcGF3bkFzeW5jKGNvbW1hbmQsIGNvbmZpZy5hcmdzIHx8IFtdLCB7XG4gICAgICBjd2Q6IGJpbmFyeURpcixcbiAgICAgIGVudjogZW52aXJvbm1lbnQsXG4gICAgICBleHRyYToge1xuICAgICAgICBvdXRwdXQ6IGBwcm9jZXNzLmxvZ2AsXG4gICAgICB9LFxuICAgIH0pO1xuICAgIGlmIChyZXMuc3RhdHVzICE9PSAwKSB7XG4gICAgICB0aHJvdyBgcHJvY2VzcyByZXR1cm5lZCBzdGF0dXMgJHtyZXMuc3RhdHVzfWA7XG4gICAgfVxuICB9LFxuICBiaXRtYWtlOiBhY3Rpb25NYWtlU2NyaXB0LFxufTtcblxuYXN5bmMgZnVuY3Rpb24gZG9UYXJnZXRCdWlsZChjdHgsIGVudmlyb25tZW50LCBjb25maWcsIHNldHRpbmdzKVxue1xuICBpZiAoY29uZmlnLnByZUFjdGlvbikge1xuICAgIGF3YWl0IHNldHRpbmdzLnB1c2goXCJwcmVBY3Rpb25cIik7XG4gICAgY29uc3QgbmV3Q29uZmlnID0ge307XG4gICAgYXNzaWduT2JqZWN0KG5ld0NvbmZpZywgY29uZmlnKTtcbiAgICBkZWxldGUgbmV3Q29uZmlnLmFjdGlvbjtcbiAgICBkZWxldGUgbmV3Q29uZmlnLnByZUFjdGlvbjtcbiAgICBkZWxldGUgbmV3Q29uZmlnLnBvc3RBY3Rpb247XG4gICAgYXNzaWduT2JqZWN0KG5ld0NvbmZpZywgY29uZmlnLnByZUFjdGlvbik7XG4gICAgY29uc3QgbmV3RW52aXJvbm1lbnQgPSBtZXJnZUVudmlyb25tZW50KGNvbmZpZy5wcmVBY3Rpb24uZW52aXJvbm1lbnQsIGVudmlyb25tZW50KTtcbiAgICBhd2FpdCBkb1RhcmdldEJ1aWxkKGN0eCwgbmV3RW52aXJvbm1lbnQsIG5ld0NvbmZpZywgc2V0dGluZ3MpO1xuICAgIGF3YWl0IHNldHRpbmdzLnBvcCgpO1xuICB9XG5cbiAgaWYgKEFycmF5LmlzQXJyYXkoY29uZmlnLmFjdGlvbikpIHtcbiAgICBhd2FpdCBzZXR0aW5ncy5wdXNoKFwiYWN0aW9uXCIpO1xuICAgIGZvciAodmFyIGkgPSAwOyBpIDwgY29uZmlnLmFjdGlvbi5sZW5ndGg7ICsraSkge1xuICAgICAgYXdhaXQgc2V0dGluZ3MucHVzaChpKTtcbiAgICAgIGNvbnN0IG5ld0NvbmZpZyA9IHt9O1xuICAgICAgYXNzaWduT2JqZWN0KG5ld0NvbmZpZywgY29uZmlnKTtcbiAgICAgIGRlbGV0ZSBuZXdDb25maWcuYWN0aW9uO1xuICAgICAgZGVsZXRlIG5ld0NvbmZpZy5wcmVBY3Rpb247XG4gICAgICBkZWxldGUgbmV3Q29uZmlnLnBvc3RBY3Rpb247XG4gICAgICBhc3NpZ25PYmplY3QobmV3Q29uZmlnLCBjb25maWcuYWN0aW9uW2ldKTtcbiAgICAgIGNvbnN0IG5ld0Vudmlyb25tZW50ID0gbWVyZ2VFbnZpcm9ubWVudChjb25maWcuYWN0aW9uW2ldLmVudmlyb25tZW50LCBlbnZpcm9ubWVudCk7XG4gICAgICBhd2FpdCBkb1RhcmdldEJ1aWxkKGN0eCwgbmV3RW52aXJvbm1lbnQsIG5ld0NvbmZpZywgc2V0dGluZ3MpO1xuICAgICAgYXdhaXQgc2V0dGluZ3MucG9wKCk7XG4gICAgfVxuICAgIGF3YWl0IHNldHRpbmdzLnBvcCgpO1xuICB9XG4gIGVsc2Uge1xuICAgIGlmICghYXdhaXQgZGlyZWN0b3J5RXhpc3RzKGNvbmZpZy5iaW5hcnlEaXIpKSB7XG4gICAgICBhd2FpdCBmcy5wcm9taXNlcy5ta2Rpcihjb25maWcuYmluYXJ5RGlyLCB7IHJlY3Vyc2l2ZTogdHJ1ZSB9KTtcbiAgICB9XG4gICAgaWYgKGFjdGlvbkhhbmRsZXJzW2NvbmZpZy5hY3Rpb25dKSB7XG4gICAgICBjb25maWcuZGVzY3JpcHRpb24gJiYgY29uc29sZS5sb2coY29uZmlnLmRlc2NyaXB0aW9uKTtcbiAgICAgIGF3YWl0IGFjdGlvbkhhbmRsZXJzW2NvbmZpZy5hY3Rpb25dKGNvbmZpZywgZW52aXJvbm1lbnQsIHNldHRpbmdzKTtcbiAgICB9XG4gIH1cblxuICBpZiAoY29uZmlnLnBvc3RBY3Rpb24pIHtcbiAgICBhd2FpdCBzZXR0aW5ncy5wdXNoKFwicG9zdEFjdGlvblwiKTtcbiAgICBjb25zdCBuZXdDb25maWcgPSB7fTtcbiAgICBhc3NpZ25PYmplY3QobmV3Q29uZmlnLCBjb25maWcpO1xuICAgIGRlbGV0ZSBuZXdDb25maWcuYWN0aW9uO1xuICAgIGRlbGV0ZSBuZXdDb25maWcucHJlQWN0aW9uO1xuICAgIGRlbGV0ZSBuZXdDb25maWcucG9zdEFjdGlvbjtcbiAgICBhc3NpZ25PYmplY3QobmV3Q29uZmlnLCBjb25maWcucG9zdEFjdGlvbik7XG4gICAgY29uc3QgbmV3RW52aXJvbm1lbnQgPSBtZXJnZUVudmlyb25tZW50KGNvbmZpZy5wb3N0QWN0aW9uLmVudmlyb25tZW50LCBlbnZpcm9ubWVudCk7XG4gICAgYXdhaXQgZG9UYXJnZXRCdWlsZChjdHgsIG5ld0Vudmlyb25tZW50LCBuZXdDb25maWcsIHNldHRpbmdzKTtcbiAgICBhd2FpdCBzZXR0aW5ncy5wb3AoKTtcbiAgfVxufVxuXG5leHBvcnQgZGVmYXVsdCBhc3luYyBmdW5jdGlvbihjdHgpIHtcbiAgY29uc3QgdXNlckNvbmZpZyA9IGF3YWl0IGN0eC5nZXRVc2VyQ29uZmlnKCk7XG4gIGNvbnN0IGJ1aWxkQ29uZmlnID0gbWFrZUJ1aWxkQ29uZmlnKGN0eCwgdXNlckNvbmZpZyk7XG5cbiAgY29uc3QganNvbkNvbmZpZyA9IEpTT04uc3RyaW5naWZ5KGJ1aWxkQ29uZmlnLCBudWxsLCAyKTtcbiAgY29uc3QgZHVtcENvbmZpZ1BhdGggPSBwYXRoLnBvc2l4LmpvaW4oYnVpbGRDb25maWcuYmluYXJ5Um9vdCwgQlVJTERfQ09ORklHX0ZJTEUpO1xuICBhd2FpdCBzYXZlSWZEaWZmZXJlbnQoZHVtcENvbmZpZ1BhdGgsIGpzb25Db25maWcpO1xuXG4gIGNvbnN0IHNldHRpbmdzRmlsZW5hbWUgPSBwYXRoLnJlc29sdmUoYnVpbGRDb25maWcuYmluYXJ5Um9vdCwgQlVJTERfU0VUVElOR1NfRklMRSk7XG4gIGNvbnN0IHNldHRpbmdzID0gbmV3IFNldHRpbmdzU3RvcmFnZShzZXR0aW5nc0ZpbGVuYW1lKTtcblxuICBmb3IgKGNvbnN0IFtrZXksIGVudHJ5XSBvZiBPYmplY3QuZW50cmllcyhidWlsZENvbmZpZykpIHtcbiAgICBpZiAoZW50cnkgJiYgdHlwZW9mIGVudHJ5ID09PSBcIm9iamVjdFwiICYmIGVudHJ5LmFjdGlvbiAmJiAhZW50cnkuZGlzYWJsZWQpIHtcbiAgICAgIGF3YWl0IHNldHRpbmdzLnB1c2goa2V5KTtcbiAgICAgIGNvbnN0IGNvbXBsZXRlZCA9IGF3YWl0IHNldHRpbmdzLmdldChcImNvbXBsZXRlZFwiKTtcbiAgICAgIGlmIChlbnRyeS5yZWJ1aWxkIHx8ICFjb21wbGV0ZWQpIHtcbiAgICAgICAgbG9nZ2VyLmluZm8oYFN0YXJ0ZWQgYWN0aW9uOiAke2tleX1gKTtcbiAgICAgICAgY29uc3QgZW52aXJvbm1lbnQgPSBtZXJnZUVudmlyb25tZW50KGVudHJ5LmVudmlyb25tZW50LCBwcm9jZXNzLmVudik7XG4gICAgICAgIGlmIChlbnRyeS5zb3VyY2VVcmwpIHtcbiAgICAgICAgICBhd2FpdCBkb0V4dHJhY3RBcmNoaXZlKGN0eCwgZW52aXJvbm1lbnQsIGVudHJ5LCBzZXR0aW5ncyk7XG4gICAgICAgIH1cbiAgICAgICAgYXdhaXQgZG9UYXJnZXRCdWlsZChjdHgsIGVudmlyb25tZW50LCBlbnRyeSwgc2V0dGluZ3MpO1xuICAgICAgICBhd2FpdCBzZXR0aW5ncy5zZXQoXCJjb21wbGV0ZWRcIiwgdHJ1ZSk7XG4gICAgICAgIGxvZ2dlci5pbmZvKGBDb21wbGV0ZWQgYWN0aW9uOiAke2tleX1gKTtcbiAgICAgIH1cbiAgICAgIGF3YWl0IHNldHRpbmdzLnBvcCgpO1xuICAgIH1cbiAgfVxufVxuIiwibW9kdWxlLmV4cG9ydHMgPSB7XG4gIERFRkFVTFRfUFJFU0VUOiBcIm1haW5cIixcbiAgVVNFUl9DT05GSUc6IFwiYml0bWFrZS5jb25maWcubWpzXCIsXG4gIFJFUVVFU1RfQVRURU1QVFM6IDMwLFxuICBCVUlMRF9DT05GSUdfRklMRTogXCJCdWlsZENvbmZpZy5qc29uXCIsXG4gIEJVSUxEX1NFVFRJTkdTX0ZJTEU6IFwiQnVpbGRTZXR0aW5ncy5qc29uXCIsXG59O1xuIiwiaW1wb3J0IGZzIGZyb20gXCJub2RlOmZzXCI7XG5cbmltcG9ydCB7IGZpbGVFeGlzdHMgfSBmcm9tIFwiQC91dGlscy9GaWxlU3lzdGVtXCI7XG5pbXBvcnQgeyBERUZBVUxUX1BSRVNFVCB9IGZyb20gXCJAL0NvbnN0YW50cy5qc1wiO1xuXG5leHBvcnQgZGVmYXVsdCBhc3luYyBmdW5jdGlvbihjdHgpXG57XG4gIGNvbnN0IHByZXNldCA9IGN0eC5lbnYucHJlc2V0IHx8IERFRkFVTFRfUFJFU0VUO1xuICBjb25zdCBwcmVzZXRQYXRoID0gY3R4LmdldFByZXNldFBhdGgocHJlc2V0KTtcbiAgaWYgKCFhd2FpdCBmaWxlRXhpc3RzKHByZXNldFBhdGgpKVxuICAgIHRocm93IGBQcmVzZXQgJyR7cHJlc2V0fScgaXMgbm90IGF2YWlsYWJsZWA7XG5cbiAgaWYgKGF3YWl0IGZpbGVFeGlzdHMoY3R4LnVzZXJDb25maWdQYXRoKSlcbiAgICBhd2FpdCBmcy5wcm9taXNlcy5ybShjdHgudXNlckNvbmZpZ1BhdGgpO1xuXG4gIGF3YWl0IGZzLnByb21pc2VzLmNvcHlGaWxlKHByZXNldFBhdGgsIGN0eC51c2VyQ29uZmlnUGF0aCk7XG4gIGNvbnNvbGUubG9nKGBQcmVzZXQgJyR7cHJlc2V0fScgaW5zdGFsbGVkIHN1Y2Nlc3NmdWxseWApO1xufVxuIiwiXCJ1c2Ugc3RyaWN0XCI7XG5cbmNvbnN0IGZzID0gcmVxdWlyZShcIm5vZGU6ZnNcIik7XG5jb25zdCBwYXRoID0gcmVxdWlyZShcIm5vZGU6cGF0aFwiKTtcblxuY29uc3QgeyBBYnNvbHV0ZVBhdGggfSA9IHJlcXVpcmUoXCJAL3V0aWxzL0Fic29sdXRlUGF0aC5qc1wiKTtcbmNvbnN0IHsgVXNlckNvbnRleHQgfSA9IHJlcXVpcmUoXCIuL2JpdG1ha2UvVXNlckNvbnRleHQuanNcIik7XG5jb25zdCB7IFBsdWdpbkNvbnRleHQgfSA9IHJlcXVpcmUoXCIuL2JpdG1ha2UvUGx1Z2luQ29udGV4dC5qc1wiKTtcbmNvbnN0IHsgR2xvYmFsQ29udGV4dCB9ID0gcmVxdWlyZShcIi4vYml0bWFrZS9HbG9iYWxDb250ZXh0LmpzXCIpO1xuY29uc3QgeyBTeXN0ZW1WYXJpYWJsZXMgfSA9IHJlcXVpcmUoXCIuL2JpdG1ha2UvU3lzdGVtVmFyaWFibGVzLmpzXCIpO1xuY29uc3QgeyBHb2FsQ29sbGVjdGlvbiB9ID0gcmVxdWlyZShcIkAvY29yZS9Hb2FsQ29sbGVjdGlvblwiKTtcbmNvbnN0IHsgZ2V0UGF0aFN0cmluZyB9ICA9IHJlcXVpcmUoXCJAL3V0aWxzL0ZpbGVTeXN0ZW1cIik7XG5jb25zdCB7IEZpbGVQYXRoLCBEaXJQYXRoIH0gPSByZXF1aXJlKFwiQC9jb3JlL1BhdGhcIik7XG5jb25zdCB7IGltcG9ydE1vZHVsZSB9ICA9IHJlcXVpcmUoXCJAL3V0aWxzL01vZHVsZVwiKTtcbmNvbnN0IFN5c1ZhcnMgPSByZXF1aXJlKFwiQC9jb3JlL1N5c3RlbVZhcmlhYmxlc1wiKTtcblxuY29uc3QgUEFDS0FHRV9KU09OID0gXCJwYWNrYWdlLmpzb25cIjtcbmNvbnN0IE1BS0VfQ0FDSEUgPSBcIk1ha2VDYWNoZS5qc29uXCI7XG5cbmFzeW5jIGZ1bmN0aW9uIGFjdGlvbk1ha2VTY3JpcHQoY29uZmlnLCBlbnZpcm9ubWVudCwgc2V0dGluZ3MpXG57XG4gIHByb2Nlc3MuZW52ID0gZW52aXJvbm1lbnQ7XG5cbiAgU3lzdGVtVmFyaWFibGVzLmRlZmluZVZhcmlhYmxlcyhTeXN0ZW1WYXJpYWJsZXMucHJvdG90eXBlLCBTeXNWYXJzLmRlZmF1bHQpO1xuICBjb25zdCBzY29wZSA9IFN5c3RlbVZhcmlhYmxlcy5jcmVhdGUoKTtcblxuICBjb25zdCBzb3VyY2VEaXIgPSBnZXRQYXRoU3RyaW5nKGNvbmZpZy5zb3VyY2VEaXIpO1xuICBjb25zdCBiaW5hcnlEaXIgPSBnZXRQYXRoU3RyaW5nKGNvbmZpZy5iaW5hcnlEaXIpO1xuXG4gIHNjb3BlLlBST0pFQ1RfU09VUkNFX0RJUiA9IERpclBhdGguY3JlYXRlKHNvdXJjZURpcik7XG4gIHNjb3BlLlBST0pFQ1RfQklOQVJZX0RJUiA9IERpclBhdGguY3JlYXRlKGJpbmFyeURpcik7XG5cbiAgc2NvcGUuUEFDS0FHRV9GSUxFID0gRmlsZVBhdGguY3JlYXRlKHNjb3BlLlBST0pFQ1RfU09VUkNFX0RJUi5qb2luKFBBQ0tBR0VfSlNPTikudG9TdHJpbmcoKSk7XG4gIHNjb3BlLkNBQ0hFX0ZJTEUgPSBGaWxlUGF0aC5jcmVhdGUoc2NvcGUuUFJPSkVDVF9CSU5BUllfRElSLmpvaW4oTUFLRV9DQUNIRSkudG9TdHJpbmcoKSk7XG4gIHNjb3BlLlNPVVJDRV9ESVIgPSBBYnNvbHV0ZVBhdGguY3JlYXRlKHNvdXJjZURpcik7XG4gIHNjb3BlLkJJTkFSWV9ESVIgPSBBYnNvbHV0ZVBhdGguY3JlYXRlKGJpbmFyeURpcik7XG5cbiAgY29uc3QgZ2xvYmFsID0gR2xvYmFsQ29udGV4dC5jcmVhdGUoKTtcbiAgZ2xvYmFsLmxvYWRDYWNoZVZhcmlhYmxlcyhzY29wZS5DQUNIRV9GSUxFLnRvU3RyaW5nKCkpO1xuXG4gIGNvbnN0IHBhY2thZ2VKc29uID0gYXdhaXQgZnMucHJvbWlzZXMucmVhZEZpbGUoc2NvcGUuUEFDS0FHRV9GSUxFLnRvU3RyaW5nKCksICd1dGY4Jyk7XG4gIGNvbnN0IHBrZyA9IEpTT04ucGFyc2UocGFja2FnZUpzb24pO1xuXG4gIHNjb3BlLkJVSUxEX1RZUEUgPSBjb25maWcuYnVpbGRUeXBlO1xuICBzY29wZS5QUk9KRUNUX05BTUUgPSBwa2cubmFtZTtcbiAgc2NvcGUuUFJPSkVDVF9WRVJTSU9OID0gcGtnLnZlcnNpb247XG4gIHNjb3BlLlBST0pFQ1RfREVTQ1JJUFRJT04gPSBwa2cuZGVzY3JpcHRpb247XG4gIHNjb3BlLlBST0pFQ1RfSE9NRVBBR0VfVVJMID0gcGtnLmhvbWVwYWdlO1xuICBzY29wZS5ERVNURElSID0gY29uZmlnLmRlc3REaXIgPyBEaXJQYXRoLmNyZWF0ZShjb25maWcuZGVzdERpcikgOiBudWxsO1xuXG4gIGNvbnN0IHJvb3QgPSBVc2VyQ29udGV4dC5jcmVhdGUoc2NvcGUsIGdsb2JhbCk7XG5cbiAgaWYgKGNvbmZpZy52YXJpYWJsZXMpIHtcbiAgICBmb3IgKGNvbnN0IFtrZXksIHZhbF0gb2YgT2JqZWN0LmVudHJpZXMoY29uZmlnLnZhcmlhYmxlcykpIHtcbiAgICAgIGlmIChrZXkgPT09IFwiSU5TVEFMTF9QUkVGSVhcIilcbiAgICAgICAgcm9vdC5JTlNUQUxMX1BSRUZJWCA9IERpclBhdGguY3JlYXRlKHZhbCk7XG4gICAgICBlbHNlIGlmIChrZXkgPT09IFwiR0xPQkFMX0NPTlRFWFRfSlNPTlwiKVxuICAgICAgICByb290LkdMT0JBTF9DT05URVhUX0pTT04gPSBGaWxlUGF0aC5jcmVhdGUodmFsKTtcbiAgICAgIGVsc2UgaWYgKGtleSA9PT0gXCJUQVJHRVRfR09BTFNfSlNPTlwiKVxuICAgICAgICByb290LlRBUkdFVF9HT0FMU19KU09OID0gRmlsZVBhdGguY3JlYXRlKHZhbCk7XG4gICAgICBlbHNlXG4gICAgICAgIHJvb3Rba2V5XSA9IHZhbDtcbiAgICB9XG4gIH1cblxuICBpZiAocm9vdC5UT09MQ0hBSU5fRklMRSkge1xuICAgIGNvbnN0IHRvb2xjaGFpbiA9IGF3YWl0IGltcG9ydE1vZHVsZShyb290LlRPT0xDSEFJTl9GSUxFKTtcbiAgICBpZiAoIXRvb2xjaGFpbi5kZWZhdWx0KVxuICAgICAgdGhyb3cgbmV3IEVycm9yKFwiVG9vbGNoYWluIG1vZHVsZSBoYXMgbm8gZGVmYXVsdCBleHBvcnRcIik7XG4gICAgY29uc3QgcmVzdWx0ID0gdG9vbGNoYWluLmRlZmF1bHQocm9vdCk7XG4gICAgaWYgKHJlc3VsdCBpbnN0YW5jZW9mIFByb21pc2UpXG4gICAgICBhd2FpdCByZXN1bHQ7XG4gIH1cblxuICBjb25zdCBwbHVnaW5Db250ZXh0ID0gUGx1Z2luQ29udGV4dC5jcmVhdGUoc2NvcGUsIGdsb2JhbCk7XG4gIGZvciAoY29uc3QgcGx1Z2luIG9mIChyb290Lk1BS0VfUExVR0lOX0xJU1QgfHwgW10pKSB7XG4gICAgY29uc3QgZmlsZW5hbWUgPSBGaWxlUGF0aC5jcmVhdGUocGx1Z2luKTtcbiAgICBjb25zdCBtb2R1bGUgPSBhd2FpdCBpbXBvcnRNb2R1bGUoZmlsZW5hbWUudG9TdHJpbmcoKSk7XG4gICAgaWYgKCFtb2R1bGUucGx1Z2luRW50cnkpXG4gICAgICB0aHJvdyBuZXcgRXJyb3IoYFBsdWdpbiAke2ZpbGVuYW1lLmJhc2VuYW1lKCl9IG5vdCBjb250YWluIHBsdWdpbkVudHJ5IGZ1bmN0aW9uYCk7XG4gICAgY29uc3QgcmVzdWx0ID0gbW9kdWxlLnBsdWdpbkVudHJ5KHBsdWdpbkNvbnRleHQpO1xuICAgIGlmIChyZXN1bHQgaW5zdGFuY2VvZiBQcm9taXNlKVxuICAgICAgYXdhaXQgcmVzdWx0O1xuICB9XG5cbiAgZ2xvYmFsLmFkZFN1YmRpcmVjdG9yeShyb290KTtcbiAgYXdhaXQgZ2xvYmFsLmRvU3ViZGlyZWN0b3J5KCk7XG4gIHJvb3QubG9nSW5mbyhcIkNvbmZpZ3VyaW5nIGRvbmVcIik7XG5cbiAgaWYgKHJvb3QuR0xPQkFMX0NPTlRFWFRfSlNPTikge1xuICAgIGNvbnN0IGZpbGVuYW1lID0gcm9vdC5HTE9CQUxfQ09OVEVYVF9KU09OLnRvU3RyaW5nKCk7XG4gICAgY29uc3QgY29udGVudCA9IEpTT04uc3RyaW5naWZ5KGdsb2JhbCwgbnVsbCwgMik7XG4gICAgZnMubWtkaXJTeW5jKHBhdGguZGlybmFtZShmaWxlbmFtZSksIHsgcmVjdXJzaXZlOiB0cnVlIH0pO1xuICAgIGZzLndyaXRlRmlsZVN5bmMoZmlsZW5hbWUsIGNvbnRlbnQsIHsgZW5jb2Rpbmc6IFwidXRmOFwiIH0pO1xuICB9XG5cbiAgY29uc3QgYWxsR29hbExpc3QgPSBnbG9iYWwuY3JlYXRlR29hbHMocm9vdCk7XG4gIGNvbnN0IGdvYWxMaXN0ID0gYWxsR29hbExpc3QuZ2V0VGFyZ2V0TGlzdChcImluc3RhbGxcIik7XG5cbiAgaWYgKHJvb3QuVEFSR0VUX0dPQUxTX0pTT04pIHtcbiAgICBjb25zdCBmaWxlbmFtZSA9IHJvb3QuVEFSR0VUX0dPQUxTX0pTT04udG9TdHJpbmcoKTtcbiAgICBjb25zdCBjb250ZW50ID0gSlNPTi5zdHJpbmdpZnkoZ29hbExpc3QsIG51bGwsIDIpO1xuICAgIGZzLm1rZGlyU3luYyhwYXRoLmRpcm5hbWUoZmlsZW5hbWUpLCB7IHJlY3Vyc2l2ZTogdHJ1ZSB9KTtcbiAgICBmcy53cml0ZUZpbGVTeW5jKGZpbGVuYW1lLCBjb250ZW50LCB7IGVuY29kaW5nOiBcInV0ZjhcIiB9KTtcbiAgfVxuXG4gIGF3YWl0IEdvYWxDb2xsZWN0aW9uLmJ1aWxkR29hbHMoZ29hbExpc3QpO1xufVxuXG5tb2R1bGUuZXhwb3J0cyA9IHtcbiAgYWN0aW9uTWFrZVNjcmlwdCxcbn07XG4iLCJpbXBvcnQgcGF0aCBmcm9tIFwibm9kZTpwYXRoXCI7XG5pbXBvcnQgdXJsIGZyb20gXCJub2RlOnVybFwiO1xuXG5pbXBvcnQgeyBmaWxlRXhpc3RzIH0gZnJvbSBcIkAvdXRpbHMvRmlsZVN5c3RlbVwiO1xuaW1wb3J0IGNvbnN0YW50cyBmcm9tIFwiQC9Db25zdGFudHMuanNcIjtcbmltcG9ydCB7IERFQlVHX0JVSUxEX1RZUEUsIFJFTEVBU0VfQlVJTERfVFlQRSB9IGZyb20gXCJAL2NvcmUvVHlwZXNcIjtcbmltcG9ydCB7IGltcG9ydE1vZHVsZSB9IGZyb20gXCJAL3V0aWxzL01vZHVsZVwiO1xuXG5jb25zdCB7IFVTRVJfQ09ORklHLCBERUZBVUxUX1BSRVNFVCwgUkVRVUVTVF9BVFRFTVBUUyB9ID0gY29uc3RhbnRzO1xuXG5leHBvcnQgY2xhc3MgUnVuU2NyaXB0Q29udGV4dCB7XG4gIF9ub2RlRXhlY3V0YWJsZTtcbiAgX2N1cnJlbnRTY3JpcHQ7XG4gIF9zY3JpcHREaXI7XG4gIF9yb290RGlyO1xuICBfd29ya0RpcjtcbiAgX2VudjtcbiAgX3VzZXJDb25maWc7XG5cbiAgY29uc3RydWN0b3Iob3B0aW9ucylcbiAge1xuICAgIHRoaXMuX25vZGVFeGVjdXRhYmxlID0gb3B0aW9ucy5ub2RlRXhlY3V0YWJsZTtcbiAgICB0aGlzLl9jdXJyZW50U2NyaXB0ID0gb3B0aW9ucy5jdXJyZW50U2NyaXB0O1xuICAgIHRoaXMuX3NjcmlwdERpciA9IG9wdGlvbnMuc2NyaXB0RGlyO1xuICAgIHRoaXMuX3Jvb3REaXIgPSBvcHRpb25zLnJvb3REaXI7XG4gICAgdGhpcy5fd29ya0RpciA9IG9wdGlvbnMud29ya0RpcjtcbiAgICB0aGlzLl9lbnYgPSBPYmplY3Quc2VhbChPYmplY3QuZnJlZXplKG9wdGlvbnMuZW52KSk7XG5cbiAgICBpZiAob3B0aW9ucy51c2VyQ29uZmlnKSB7XG4gICAgICB0aGlzLl91c2VyQ29uZmlnID0gb3B0aW9ucy51c2VyQ29uZmlnO1xuICAgIH1cbiAgfVxuXG4gIGdldCBub2RlRXhlY3V0YWJsZSgpXG4gIHtcbiAgICByZXR1cm4gdGhpcy5fbm9kZUV4ZWN1dGFibGU7XG4gIH1cblxuICBnZXQgY3VycmVudFNjcmlwdCgpXG4gIHtcbiAgICByZXR1cm4gdGhpcy5fY3VycmVudFNjcmlwdDtcbiAgfVxuXG4gIGdldCBzY3JpcHREaXIoKVxuICB7XG4gICAgcmV0dXJuIHRoaXMuX3NjcmlwdERpcjtcbiAgfVxuXG4gIGdldCByb290RGlyKClcbiAge1xuICAgIHJldHVybiB0aGlzLl9yb290RGlyO1xuICB9XG5cbiAgZ2V0IHdvcmtEaXIoKVxuICB7XG4gICAgcmV0dXJuIHRoaXMuX3dvcmtEaXI7XG4gIH1cblxuICBnZXQgZW52KClcbiAge1xuICAgIHJldHVybiB0aGlzLl9lbnY7XG4gIH1cblxuICBnZXRQcmVzZXRQYXRoKHByZXNldClcbiAge1xuICAgIHJldHVybiBwYXRoLnJlc29sdmUodGhpcy5fc2NyaXB0RGlyLCBgcHJlc2V0LyR7cHJlc2V0fS5tanNgKTtcbiAgfVxuXG4gIGdldCB1c2VyQ29uZmlnUGF0aCgpXG4gIHtcbiAgICByZXR1cm4gcGF0aC5yZXNvbHZlKHRoaXMuX3dvcmtEaXIsIFVTRVJfQ09ORklHKTtcbiAgfVxuXG4gIGdldCBidWlsZFR5cGUoKVxuICB7XG4gICAgcmV0dXJuIHRoaXMuX2Vudi5idWlsZFR5cGUgPT0gREVCVUdfQlVJTERfVFlQRSA/IHRoaXMuX2Vudi5idWlsZFR5cGUgOiBSRUxFQVNFX0JVSUxEX1RZUEU7XG4gIH1cblxuICBhc3luYyBnZXRVc2VyQ29uZmlnKClcbiAge1xuICAgIGlmICghdGhpcy5fdXNlckNvbmZpZykge1xuICAgICAgbGV0IGNvbmZpZ1BhdGg7XG4gICAgICBpZiAodGhpcy5fZW52LmNvbmZpZykge1xuICAgICAgICBjb25maWdQYXRoID0gcGF0aC5pc0Fic29sdXRlKHRoaXMuX2Vudi5jb25maWcpID8gdGhpcy5fZW52LmNvbmZpZyA6IHBhdGgucmVzb2x2ZSh0aGlzLl93b3JrRGlyLCB0aGlzLl9lbnYuY29uZmlnKTtcbiAgICAgICAgaWYgKCFhd2FpdCBmaWxlRXhpc3RzKGNvbmZpZ1BhdGgpKVxuICAgICAgICAgIHRocm93IGBDb25maWd1cmF0aW9uICcke3RoaXMuX2Vudi5jb25maWd9JyBmaWxlIGRvZXMgbm90IGV4aXN0YDtcbiAgICAgIH1cbiAgICAgIGVsc2Uge1xuICAgICAgICBjb25zdCB1c2VyQ29uZmlnUGF0aCA9IHBhdGgucmVzb2x2ZSh0aGlzLl93b3JrRGlyLCBVU0VSX0NPTkZJRyk7XG4gICAgICAgIGlmIChhd2FpdCBmaWxlRXhpc3RzKHVzZXJDb25maWdQYXRoKSlcbiAgICAgICAgICBjb25maWdQYXRoID0gdXNlckNvbmZpZ1BhdGg7XG4gICAgICAgIGVsc2VcbiAgICAgICAgICBjb25maWdQYXRoID0gdGhpcy5nZXRQcmVzZXRQYXRoKERFRkFVTFRfUFJFU0VUKTtcbiAgICAgIH1cblxuICAgICAgbGV0IHVzZXJDb25maWcgPSB7fTtcblxuICAgICAgaWYgKGNvbmZpZ1BhdGgpIHtcbiAgICAgICAgY29uc3QgY29uZmlnVXJsID0gdXJsLnBhdGhUb0ZpbGVVUkwoY29uZmlnUGF0aCk7XG4gICAgICAgIGNvbnN0IGNvbmZpZ01vZHVsZSA9IGF3YWl0IGltcG9ydE1vZHVsZShjb25maWdVcmwpO1xuICAgICAgICBzd2l0Y2ggKHR5cGVvZiBjb25maWdNb2R1bGUuZGVmYXVsdCkge1xuICAgICAgICBjYXNlIFwiZnVuY3Rpb25cIjpcbiAgICAgICAgICB1c2VyQ29uZmlnID0gY29uZmlnTW9kdWxlLmRlZmF1bHQodGhpcy5fZW52LCB7fSk7XG4gICAgICAgICAgaWYgKHVzZXJDb25maWcgaW5zdGFuY2VvZiBQcm9taXNlKVxuICAgICAgICAgICAgdXNlckNvbmZpZyA9IGF3YWl0IHVzZXJDb25maWc7XG4gICAgICAgICAgYnJlYWs7XG4gICAgICAgIGNhc2UgXCJvYmplY3RcIjpcbiAgICAgICAgICB1c2VyQ29uZmlnID0gY29uZmlnTW9kdWxlLmRlZmF1bHQ7XG4gICAgICAgICAgYnJlYWs7XG4gICAgICAgIGRlZmF1bHQ6XG4gICAgICAgICAgdGhyb3cgYFVua25vd24gdXNlciBjb25maWd1cmF0aW9uIHR5cGVgO1xuICAgICAgICB9XG4gICAgICB9XG5cbiAgICAgIHRoaXMuX3VzZXJDb25maWcgPSB1c2VyQ29uZmlnO1xuICAgIH1cbiAgICByZXR1cm4gdGhpcy5fdXNlckNvbmZpZztcbiAgfVxuXG4gIGdldCByZXF1ZXN0QXR0ZW1wdHMoKVxuICB7XG4gICAgcmV0dXJuIFJFUVVFU1RfQVRURU1QVFM7XG4gIH1cbn07XG4iLCJcInVzZSBzdHJpY3RcIjtcblxuY29uc3QgeyBlbnN1cmVTdHJpbmcgfSA9IHJlcXVpcmUoXCJAL3V0aWxzL1N0cmljdFR5cGVcIik7XG5jb25zdCB7IEFic29sdXRlUGF0aCB9ID0gcmVxdWlyZShcIkAvdXRpbHMvQWJzb2x1dGVQYXRoLmpzXCIpO1xuXG5jb25zdCBUQVJHRVRfU0NPUEUgPSBTeW1ib2woXCJUQVJHRVRfU0NPUEVcIik7XG5jb25zdCBOQU1FICAgICAgICAgPSBTeW1ib2woXCJOQU1FXCIpO1xuY29uc3QgRklMRSAgICAgICAgID0gU3ltYm9sKFwiRklMRVwiKTtcbmNvbnN0IElOUFVUICAgICAgICA9IFN5bWJvbChcIklOUFVUXCIpO1xuY29uc3QgT1VUUFVUICAgICAgID0gU3ltYm9sKFwiT1VUUFVUXCIpO1xuY29uc3QgUEFSQU1TICAgICAgID0gU3ltYm9sKFwiUEFSQU1TXCIpO1xuY29uc3QgUFJPUEVSVElFUyAgID0gU3ltYm9sKFwiUFJPUEVSVElFU1wiKTtcblxuY29uc3QgU1lTVEVNX1NDUklQVFNfRElSID0gQWJzb2x1dGVQYXRoLmNyZWF0ZShfX2Rpcm5hbWUpLmpvaW4oXCJTeXN0ZW1TY3JpcHRzXCIpO1xuXG5mdW5jdGlvbiBDdXN0b21TY3JpcHQoc2NvcGUsIG5hbWUsIHBhcmFtcykge1xuICB0aGlzW1RBUkdFVF9TQ09QRV0gPSBzY29wZTtcbiAgdGhpc1tOQU1FXSA9IGVuc3VyZVN0cmluZyhuYW1lKTtcblxuICBpZiAoIXBhcmFtcyB8fCAhcGFyYW1zLnNjcmlwdCB8fCAhcGFyYW1zLm91dHB1dClcbiAgICB0aHJvdyBuZXcgRXJyb3IoYFVrbm93biBwYXJhbXMgJHtKU09OLnN0cmluZ2lmeShwYXJhbXMpfWApO1xuXG4gIGlmICgvWy5cXC9cXFxcXS8udGVzdChwYXJhbXMuc2NyaXB0KSlcbiAgICB0aGlzW0ZJTEVdID0gc2NvcGUuU09VUkNFX0RJUi5yZXNvbHZlKHBhcmFtcy5zY3JpcHQpO1xuICBlbHNlXG4gICAgdGhpc1tGSUxFXSA9IFNZU1RFTV9TQ1JJUFRTX0RJUi5qb2luKHBhcmFtcy5zY3JpcHQgKyBcIi5qc1wiKTtcblxuICB0aGlzW0lOUFVUXSA9IHBhcmFtcy5pbnB1dCB8fCBudWxsO1xuICB0aGlzW09VVFBVVF0gPSBwYXJhbXMub3V0cHV0O1xuICB0aGlzW1BBUkFNU10gPSBwYXJhbXM7XG4gIHRoaXNbUFJPUEVSVElFU10gPSB7fTtcbn1cblxuQ3VzdG9tU2NyaXB0LmNyZWF0ZSA9IGZ1bmN0aW9uKHNjb3BlLCBuYW1lLCBwYXJhbXMpIHtcbiAgcmV0dXJuIE9iamVjdC5zZWFsKG5ldyBDdXN0b21TY3JpcHQoc2NvcGUsIG5hbWUsIHBhcmFtcykpO1xufVxuXG5DdXN0b21TY3JpcHQucHJvdG90eXBlID0gT2JqZWN0LmNyZWF0ZShPYmplY3QucHJvdG90eXBlLCB7XG4gIGNvbnN0cnVjdG9yOiB7XG4gICAgdmFsdWU6IEN1c3RvbVNjcmlwdCxcbiAgICBlbnVtZXJhYmxlOiBmYWxzZSxcbiAgfSxcbiAgTkFNRToge1xuICAgIGdldCgpIHsgcmV0dXJuIHRoaXNbTkFNRV07IH0sXG4gICAgZW51bWVyYWJsZTogdHJ1ZSxcbiAgfSxcbiAgVEFSR0VUX1NDT1BFOiB7XG4gICAgZ2V0KCkgeyByZXR1cm4gdGhpc1tUQVJHRVRfU0NPUEVdOyB9LFxuICAgIGVudW1lcmFibGU6IHRydWUsXG4gIH0sXG4gIEZJTEU6IHtcbiAgICBnZXQoKSB7IHJldHVybiB0aGlzW0ZJTEVdOyB9LFxuICAgIGVudW1lcmFibGU6IHRydWUsXG4gIH0sXG4gIElOUFVUOiB7XG4gICAgZ2V0KCkgeyByZXR1cm4gdGhpc1tJTlBVVF07IH0sXG4gICAgc2V0KHZhbHVlKSB7IHRoaXNbSU5QVVRdID0gdGhpc1tUQVJHRVRfU0NPUEVdLlNPVVJDRV9ESVIucmVzb2x2ZSh2YWx1ZSk7IH0sXG4gICAgZW51bWVyYWJsZTogdHJ1ZSxcbiAgfSxcbiAgT1VUUFVUOiB7XG4gICAgZ2V0KCkgeyByZXR1cm4gdGhpc1tPVVRQVVRdOyB9LFxuICAgIHNldCh2YWx1ZSkgeyB0aGlzW09VVFBVVF0gPSBBYnNvbHV0ZVBhdGguY3JlYXRlKHZhbHVlKTsgfSxcbiAgICBlbnVtZXJhYmxlOiB0cnVlLFxuICB9LFxuICBQQVJBTVM6IHtcbiAgICBnZXQoKSB7IHJldHVybiB0aGlzW1BBUkFNU107IH0sXG4gICAgc2V0KHZhbHVlKSB7IHRoaXNbUEFSQU1TXSA9IHZhbHVlOyB9LFxuICAgIGVudW1lcmFibGU6IHRydWUsXG4gIH0sXG4gIFBST1BFUlRJRVM6IHtcbiAgICBnZXQgKCkgeyByZXR1cm4gdGhpc1tQUk9QRVJUSUVTXTsgfSxcbiAgICBlbnVtZXJhYmxlOiB0cnVlLFxuICB9LFxufSk7XG5cbkN1c3RvbVNjcmlwdC5wcm90b3R5cGUudG9TdHJpbmcgPSBmdW5jdGlvbigpIHtcbiAgcmV0dXJuIHRoaXNbTkFNRV0udG9TdHJpbmcoKTtcbn1cblxuQ3VzdG9tU2NyaXB0LnByb3RvdHlwZS50b0pTT04gPSBmdW5jdGlvbigpIHtcbiAgY29uc3QganNvbiA9IHt9O1xuICBmb3IgKGNvbnN0IGtleSBpbiB0aGlzKVxuICAgIGpzb25ba2V5XSA9IHRoaXNba2V5XTtcbiAgcmV0dXJuIGpzb247XG59XG5cbkN1c3RvbVNjcmlwdC5wcm90b3R5cGUuYWRkUHJvcGVydHkgPSBmdW5jdGlvbihrZXksIC4uLnZhbHMpIHtcbiAgbGV0IHByb3BlcnR5ID0gdGhpc1tQUk9QRVJUSUVTXVtrZXldO1xuICBpZiAoIXByb3BlcnR5KSB7XG4gICAgcHJvcGVydHkgPSBbXTtcbiAgICB0aGlzW1BST1BFUlRJRVNdW2tleV0gPSBwcm9wZXJ0eTtcbiAgfVxuICB2YWxzLmZvckVhY2godiA9PiBwcm9wZXJ0eS5wdXNoKHYpKTtcbn1cblxubW9kdWxlLmV4cG9ydHMgPSB7XG4gIEN1c3RvbVNjcmlwdCxcbn07XG4iLCJcInVzZSBzdHJpY3RcIjtcblxuY29uc3QgcGF0aCA9IHJlcXVpcmUoXCJub2RlOnBhdGhcIik7XG5jb25zdCBmcyA9IHJlcXVpcmUoXCJub2RlOmZzXCIpO1xuXG5jb25zdCB7IEFic29sdXRlUGF0aCB9ID0gcmVxdWlyZShcIkAvdXRpbHMvQWJzb2x1dGVQYXRoLmpzXCIpO1xuY29uc3QgeyBmaWxlRXhpc3RzLCBmaWxlRXhpc3RzU3luYyB9ID0gcmVxdWlyZShcIkAvdXRpbHMvRmlsZVN5c3RlbVwiKTtcbmNvbnN0IHsgVGFyZ2V0Q29sbGVjdGlvbiB9ID0gcmVxdWlyZShcIi4vVGFyZ2V0Q29sbGVjdGlvbi5qc1wiKTtcbmNvbnN0IHsgU2NyaXB0Q29sbGVjdGlvbiB9ID0gcmVxdWlyZShcIi4vU2NyaXB0Q29sbGVjdGlvbi5qc1wiKTtcbmNvbnN0IHsgSW50ZXJmYWNlVGFyZ2V0IH0gPSByZXF1aXJlKFwiLi9JbnRlcmZhY2VUYXJnZXQuanNcIik7XG5jb25zdCB7IFVua25vd25UYXJnZXQgfSA9IHJlcXVpcmUoXCIuL1Vua25vd25UYXJnZXQuanNcIik7XG5jb25zdCB7IEdvYWxDb2xsZWN0aW9uIH0gPSByZXF1aXJlKFwiQC9jb3JlL0dvYWxDb2xsZWN0aW9uXCIpO1xuY29uc3QgeyBJbnRlcmZhY2VPYmplY3RzIH0gPSByZXF1aXJlKFwiLi9JbnRlcmZhY2VPYmplY3RzLmpzXCIpO1xuY29uc3QgeyBTb3VyY2VGaWxlIH0gPSByZXF1aXJlKFwiLi9Tb3VyY2VGaWxlLmpzXCIpO1xuY29uc3QgeyBPYmplY3RMaWJyYXJ5LCBTdGF0aWNMaWJyYXJ5LCBTaGFyZWRMaWJyYXJ5LCBFeGVjdXRhYmxlIH0gPSByZXF1aXJlKFwiLi9UYXJnZXQuanNcIik7XG5jb25zdCB7IERpclBhdGgsIEZpbGVQYXRoIH0gPSByZXF1aXJlKFwiQC9jb3JlL1BhdGhcIik7XG5jb25zdCB7IGltcG9ydE1vZHVsZSB9ID0gcmVxdWlyZShcIkAvdXRpbHMvTW9kdWxlXCIpO1xuXG5jb25zdCByZXF1aXJlSW1wbCA9IGV2YWwoXCJyZXF1aXJlXCIpO1xuXG5jb25zdCBUQVJHRVRTID0gU3ltYm9sKFwiVEFSR0VUU1wiKTtcbmNvbnN0IFNDUklQVFMgPSBTeW1ib2woXCJTQ1JJUFRTXCIpO1xuY29uc3QgQ0FDSEUgPSBTeW1ib2woXCJDQUNIRVwiKTtcbmNvbnN0IFVOS05PV05fVEFSR0VUUyA9IFN5bWJvbChcIlVOS05PV05fVEFSR0VUU1wiKTtcbmNvbnN0IElOVEVSRkFDRV9TQ1JJUFRTID0gU3ltYm9sKFwiSU5URVJGQUNFX1NDUklQVFNcIik7XG5jb25zdCBJTlNUQUxMX0xJU1QgPSBTeW1ib2woXCJJTlNUQUxMX0xJU1RcIik7XG5jb25zdCBTQ1JJUFRfVkFSSUFCTEVTX01BUCA9IFN5bWJvbChcIlNDUklQVF9WQVJJQUJMRVNfTUFQXCIpO1xuY29uc3QgU1VCRElSX0FMSUFTID0gU3ltYm9sKFwiU1VCRElSX0FMSUFTXCIpO1xuY29uc3QgU1VCRElSX0xJU1QgPSBTeW1ib2woXCJTVUJESVJfTElTVFwiKTtcblxuZnVuY3Rpb24gR2xvYmFsQ29udGV4dCgpIHtcbiAgdGhpc1tUQVJHRVRTXSA9IFRhcmdldENvbGxlY3Rpb24uY3JlYXRlKCk7XG4gIHRoaXNbU0NSSVBUU10gPSBTY3JpcHRDb2xsZWN0aW9uLmNyZWF0ZSgpO1xuICB0aGlzW0NBQ0hFXSA9IHt9O1xuICB0aGlzW1VOS05PV05fVEFSR0VUU10gPSB7fTtcbiAgdGhpc1tJTlRFUkZBQ0VfU0NSSVBUU10gPSB7fTtcbiAgdGhpc1tJTlNUQUxMX0xJU1RdID0gW107XG4gIHRoaXNbU0NSSVBUX1ZBUklBQkxFU19NQVBdID0ge307XG4gIHRoaXNbU1VCRElSX0FMSUFTXSA9IHt9O1xuICB0aGlzW1NVQkRJUl9MSVNUXSA9IFtdO1xufVxuXG5HbG9iYWxDb250ZXh0LmNyZWF0ZSA9ICgpID0+IHtcbiAgcmV0dXJuIE9iamVjdC5zZWFsKG5ldyBHbG9iYWxDb250ZXh0KTtcbn1cblxuR2xvYmFsQ29udGV4dC5wcm90b3R5cGUgPSBPYmplY3QuY3JlYXRlKE9iamVjdC5wcm90b3R5cGUsIHtcbiAgY29uc3RydWN0b3I6IHtcbiAgICB2YWx1ZTogR2xvYmFsQ29udGV4dCxcbiAgICBlbnVtZXJhYmxlOiBmYWxzZSxcbiAgfSxcbiAgVEFSR0VUUzoge1xuICAgIGdldCgpIHsgcmV0dXJuIHRoaXNbVEFSR0VUU107IH0sXG4gICAgZW51bWVyYWJsZTogdHJ1ZSxcbiAgfSxcbiAgU0NSSVBUUzoge1xuICAgIGdldCgpIHsgcmV0dXJuIHRoaXNbU0NSSVBUU107IH0sXG4gICAgZW51bWVyYWJsZTogdHJ1ZSxcbiAgfSxcbiAgQ0FDSEU6IHtcbiAgICBnZXQoKSB7IHJldHVybiB0aGlzW0NBQ0hFXTsgfSxcbiAgICBlbnVtZXJhYmxlOiB0cnVlLFxuICB9LFxuICBVTktOT1dOX1RBUkdFVFM6IHtcbiAgICBnZXQoKSB7IHJldHVybiB0aGlzW1VOS05PV05fVEFSR0VUU107IH0sXG4gICAgZW51bWVyYWJsZTogdHJ1ZSxcbiAgfSxcbiAgSU5URVJGQUNFX1NDUklQVFM6IHtcbiAgICBnZXQoKSB7IHJldHVybiB0aGlzW0lOVEVSRkFDRV9TQ1JJUFRTXTsgfSxcbiAgICBlbnVtZXJhYmxlOiB0cnVlLFxuICB9LFxuICBJTlNUQUxMX0xJU1Q6IHtcbiAgICBnZXQoKSB7IHJldHVybiB0aGlzW0lOU1RBTExfTElTVF07IH0sXG4gICAgZW51bWVyYWJsZTogdHJ1ZSxcbiAgfSxcbiAgU0NSSVBUX1ZBUklBQkxFU19NQVA6IHtcbiAgICBnZXQoKSB7IHJldHVybiB0aGlzW1NDUklQVF9WQVJJQUJMRVNfTUFQXTsgfSxcbiAgICBlbnVtZXJhYmxlOiB0cnVlLFxuICB9LFxuICBTVUJESVJfQUxJQVM6IHtcbiAgICBnZXQoKSB7IHJldHVybiB0aGlzW1NVQkRJUl9BTElBU107IH0sXG4gICAgZW51bWVyYWJsZTogdHJ1ZSxcbiAgfSxcbn0pO1xuXG5HbG9iYWxDb250ZXh0LnByb3RvdHlwZS50b0pTT04gPSBmdW5jdGlvbigpIHtcbiAgY29uc3QganNvbiA9IHt9O1xuICBmb3IgKGNvbnN0IGtleSBpbiB0aGlzKVxuICAgIGpzb25ba2V5XSA9IHRoaXNba2V5XTtcbiAgcmV0dXJuIGpzb247XG59XG5cbkdsb2JhbENvbnRleHQucHJvdG90eXBlLmdldFVrbm93blRhcmdldCA9IGZ1bmN0aW9uKG5hbWUpIHtcbiAgbGV0IHRhcmdldCA9IHRoaXNbVU5LTk9XTl9UQVJHRVRTXVtuYW1lXTtcbiAgaWYgKCF0YXJnZXQpIHtcbiAgICB0aGlzW1VOS05PV05fVEFSR0VUU11bbmFtZV0gPSB0YXJnZXQgPSBVbmtub3duVGFyZ2V0LmNyZWF0ZShuYW1lKTtcbiAgfVxuICByZXR1cm4gdGFyZ2V0O1xufVxuXG5HbG9iYWxDb250ZXh0LnByb3RvdHlwZS5hZGRTeXN0ZW1WYXJpYWJsZXMgPSBmdW5jdGlvbih2YXJpYWJsZXMpIHtcbiAgY29uc3Qgc2NyaXB0ID0gdmFyaWFibGVzLlNDUklQVF9GSUxFLnRvU3RyaW5nKCk7XG4gIGlmICh0aGlzW1NDUklQVF9WQVJJQUJMRVNfTUFQXVtzY3JpcHRdKVxuICAgIHRocm93IG5ldyBFcnJvcihgU3lzdGVtVmFyaWFibGVzIGV4aXN0cyBmb3IgJHtzY3JpcHR9YCk7XG4gIHRoaXNbU0NSSVBUX1ZBUklBQkxFU19NQVBdW3NjcmlwdF0gPSB2YXJpYWJsZXM7XG59XG5cbkdsb2JhbENvbnRleHQucHJvdG90eXBlLnJlc29sdmVTdWJkaXJlY3RvcnkgPSBmdW5jdGlvbihwYXRoKSB7XG4gIGNvbnN0IHJlc29sdmVkUGF0aCA9IHRoaXNbU1VCRElSX0FMSUFTXVtwYXRoLnRvU3RyaW5nKCldO1xuICByZXR1cm4gcmVzb2x2ZWRQYXRoIHx8IHBhdGg7XG59XG5cbkdsb2JhbENvbnRleHQucHJvdG90eXBlLmFkZFN1YmRpcmVjdG9yeUFsaWFzID0gZnVuY3Rpb24oc3JjLCBkZXN0KSB7XG4gIHRoaXNbU1VCRElSX0FMSUFTXVtzcmMudG9TdHJpbmcoKV0gPSBkZXN0O1xufVxuXG5HbG9iYWxDb250ZXh0LnByb3RvdHlwZS5sb2FkQ2FjaGVWYXJpYWJsZXMgPSBmdW5jdGlvbihmaWxlbmFtZSkge1xuICBpZiAoZmlsZUV4aXN0c1N5bmMoZmlsZW5hbWUudG9TdHJpbmcoKSkpIHtcbiAgICBjb25zdCB2YXJpYWJsZXMgPSByZXF1aXJlSW1wbChmaWxlbmFtZS50b1N0cmluZygpKTtcbiAgICB0aGlzLmFkZENhY2hlVmFyaWFibGVzKHZhcmlhYmxlcyk7XG4gIH1cbn1cblxuR2xvYmFsQ29udGV4dC5wcm90b3R5cGUuYWRkQ2FjaGVWYXJpYWJsZXMgPSBmdW5jdGlvbih2YXJpYWJsZXMpIHtcbiAgY29uc3QgY2FjaGUgPSB0aGlzW0NBQ0hFXTtcbiAgZm9yIChjb25zdCBba2V5LCBlbnRyeV0gb2YgT2JqZWN0LmVudHJpZXModmFyaWFibGVzKSkge1xuICAgIGNhY2hlW2tleV0gPSBlbnRyeTtcbiAgfVxufVxuXG5HbG9iYWxDb250ZXh0LnByb3RvdHlwZS5hZGRTdWJkaXJlY3RvcnkgPSBmdW5jdGlvbihjb250ZXh0KSB7XG4gIHRoaXNbU1VCRElSX0xJU1RdLnB1c2goY29udGV4dCk7XG59XG5cbkdsb2JhbENvbnRleHQucHJvdG90eXBlLmRvU3ViZGlyZWN0b3J5ID0gYXN5bmMgZnVuY3Rpb24oKSB7XG4gIHdoaWxlICh0aGlzW1NVQkRJUl9MSVNUXS5sZW5ndGgpIHtcbiAgICBjb25zdCBjb250ZXh0ID0gdGhpc1tTVUJESVJfTElTVF0uc2hpZnQoKTtcblxuICAgIGNvbnN0IHNjb3BlID0gY29udGV4dC5fX3Njb3BlKCk7XG5cbiAgICBsZXQgc2NyaXB0RmlsZTtcbiAgICBjb25zdCBmaWxlTGlzdCA9IFsgXCIuanNcIiwgXCIubWpzXCIgXS5tYXAoaSA9PiBcIk1ha2VTY3JpcHRcIiArIGkpO1xuICAgIGZvciAoY29uc3QgZmlsZW5hbWUgb2YgZmlsZUxpc3QpIHtcbiAgICAgIGNvbnN0IGl0ZXIgPSBzY29wZS5TT1VSQ0VfRElSLmpvaW4oZmlsZW5hbWUpLnRvU3RyaW5nKCk7XG4gICAgICBpZiAoYXdhaXQgZmlsZUV4aXN0cyhpdGVyKSkge1xuICAgICAgICBzY3JpcHRGaWxlID0gaXRlcjtcbiAgICAgICAgYnJlYWs7XG4gICAgICB9XG4gICAgfVxuXG4gICAgaWYgKCFzY3JpcHRGaWxlKVxuICAgICAgdGhyb3cgbmV3IEVycm9yKFwiVGhlcmUgYXJlIG5vIGZpbGVzIGZyb20gdGhlIGxpc3QgXCIgKyBmaWxlTGlzdC5qb2luKCkpO1xuXG4gICAgc2NvcGUuU0NSSVBUX0ZJTEUgPSBGaWxlUGF0aC5jcmVhdGUoc2NyaXB0RmlsZSk7XG4gICAgc2NvcGUuU0NSSVBUX0RJUiA9IERpclBhdGguY3JlYXRlKHNjb3BlLlNDUklQVF9GSUxFLmRpcm5hbWUoKSk7XG5cbiAgICB0aGlzLmFkZFN5c3RlbVZhcmlhYmxlcyhzY29wZSk7XG4gICAgdGhpcy5jb3B5Q2FjaGVWYXJpYWJsZXMoY29udGV4dCk7XG5cbiAgICBjb25zdCBtb2R1bGUgPSBhd2FpdCBpbXBvcnRNb2R1bGUoY29udGV4dC5TQ1JJUFRfRklMRS50b1N0cmluZygpKTtcblxuICAgIGNvbnN0IGN3ZFNhdmUgPSBwcm9jZXNzLmN3ZCgpO1xuICAgIHByb2Nlc3MuY2hkaXIoY29udGV4dC5TQ1JJUFRfRklMRS5kaXJuYW1lKCkudG9TdHJpbmcoKSk7XG5cbiAgICBjb25zdCByZXN1bHQgPSBtb2R1bGUuZGVmYXVsdChjb250ZXh0KTtcbiAgICBpZiAocmVzdWx0IGluc3RhbmNlb2YgUHJvbWlzZSlcbiAgICAgIGF3YWl0IHJlc3VsdDtcblxuICAgIHByb2Nlc3MuY2hkaXIoY3dkU2F2ZSk7XG5cbiAgICAvLyB0aGlzLndyaXRlQ2FjaGVWYXJpYWJsZXMoY29udGV4dC5DQUNIRV9GSUxFLnRvU3RyaW5nKCkpO1xuICB9XG59XG5cbmZ1bmN0aW9uIGVuc3VyZVZhbHVlQnlUeXBlKHR5cGUsIHZhbHVlKSB7XG4gIGlmIChBcnJheS5pc0FycmF5KHR5cGUpID8gdHlwZS5pbmNsdWRlcyh2YWx1ZSkgOiB0eXBlb2YgdmFsdWUgPT09IHR5cGUpXG4gICAgcmV0dXJuIHZhbHVlO1xuICB0aHJvdyBuZXcgRXJyb3IoYFRoZSAnJHt2YWx1ZX0nIGlzIG5vdCBhICR7dHlwZX1gKTtcbn1cblxuR2xvYmFsQ29udGV4dC5wcm90b3R5cGUuY29weUNhY2hlVmFyaWFibGVzID0gZnVuY3Rpb24oc2NvcGUpIHtcbiAgZm9yIChjb25zdCBbbmFtZSwgZW50cnldIG9mIE9iamVjdC5lbnRyaWVzKHRoaXNbQ0FDSEVdKSkge1xuICAgIGlmICghT2JqZWN0Lmhhc093bihzY29wZSwgbmFtZSkpIHtcbiAgICAgIGNvbnN0IHR5cGUgPSBlbnRyeS50eXBlIHx8IHR5cGVvZiBlbnRyeS52YWx1ZTtcbiAgICAgIGNvbnN0IGRlc2NyaXB0aW9uID0gZW50cnkuZGVzY3JpcHRpb24gfHwgXCJcIjtcbiAgICAgIGxldCB2YWx1ZSA9IEFycmF5LmlzQXJyYXkoZW50cnkudmFsdWUpID8gWyAuLi5lbnRyeS52YWx1ZSBdIDogZW50cnkudmFsdWU7XG4gICAgICBpZiAodmFsdWUgPT09IFwiJHtQUk9KRUNUX1ZFUlNJT059XCIpXG4gICAgICAgIHZhbHVlID0gc2NvcGUuUFJPSkVDVF9WRVJTSU9OO1xuICAgICAgZWxzZSBpZiAodmFsdWUgPT09IFwiJHtQUk9KRUNUX0RFU0NSSVBUSU9OfVwiKVxuICAgICAgICB2YWx1ZSA9IHNjb3BlLlBST0pFQ1RfREVTQ1JJUFRJT047XG4gICAgICBlbHNlIGlmICh2YWx1ZSA9PT0gXCIke1BST0pFQ1RfSE9NRVBBR0VfVVJMfVwiKVxuICAgICAgICB2YWx1ZSA9IHNjb3BlLlBST0pFQ1RfSE9NRVBBR0VfVVJMO1xuICAgICAgZWxzZSBpZiAoZW50cnkudmFsdWUgPT09IFwiJHtDTUFLRV9TWVNURU1fUFJPQ0VTU09SfVwiKVxuICAgICAgICB2YWx1ZSA9IHNjb3BlLlNZU1RFTV9QUk9DRVNTT1I7XG5cbiAgICAgIGNvbnN0IG5hbWVTeW1ib2wgPSBTeW1ib2wobmFtZSk7XG4gICAgICBzY29wZVtuYW1lU3ltYm9sXSA9IGVuc3VyZVZhbHVlQnlUeXBlKHR5cGUsIHZhbHVlKTtcblxuICAgICAgT2JqZWN0LmRlZmluZVByb3BlcnR5KHNjb3BlLCBuYW1lLCB7XG4gICAgICAgIGVudW1lcmFibGU6IHRydWUsXG4gICAgICAgIGdldCgpIHtcbiAgICAgICAgICByZXR1cm4gdGhpc1tuYW1lU3ltYm9sXTtcbiAgICAgICAgfSxcbiAgICAgICAgc2V0KHZhbHVlKSB7XG4gICAgICAgICAgdGhpc1tuYW1lU3ltYm9sXSA9IGVuc3VyZVZhbHVlQnlUeXBlKHR5cGUsIHZhbHVlKTtcbiAgICAgICAgfSxcbiAgICAgIH0pO1xuICAgIH1cbiAgfVxufVxuXG5HbG9iYWxDb250ZXh0LnByb3RvdHlwZS53cml0ZUNhY2hlVmFyaWFibGVzID0gZnVuY3Rpb24oZmlsZW5hbWUpIHtcbiAgY29uc3QganNvbiA9IEpTT04uc3RyaW5naWZ5KHRoaXNbQ0FDSEVdLCBudWxsLCAyKTtcbiAgZnMud3JpdGVGaWxlU3luYyhmaWxlbmFtZSwganNvbiwgXCJ1dGYtOFwiKTtcbn1cblxuZnVuY3Rpb24gc2NvcGVWYWx1ZUFzUHJpbWl0aXZlcyhvKSB7XG4gIGlmICh0eXBlb2YgbyA9PT0gXCJ1bmRlZmluZWRcIilcbiAgICByZXR1cm4gbztcbiAgaWYgKHR5cGVvZiBvID09PSBcImJvb2xlYW5cIilcbiAgICByZXR1cm4gbztcbiAgaWYgKHR5cGVvZiBvID09PSBcIm51bWJlclwiKVxuICAgIHJldHVybiBvO1xuICBpZiAodHlwZW9mIG8gPT09IFwic3RyaW5nXCIpXG4gICAgcmV0dXJuIG87XG4gIGlmICh0eXBlb2YgbyA9PT0gXCJvYmplY3RcIikge1xuICAgIGlmICghbylcbiAgICAgIHJldHVybiBvO1xuICAgIGlmIChvIGluc3RhbmNlb2YgQWJzb2x1dGVQYXRoKSB7XG4gICAgICByZXR1cm4gby50b1N0cmluZygpO1xuICAgIH1cbiAgICBpZiAobyBpbnN0YW5jZW9mIEFycmF5KSB7XG4gICAgICBjb25zdCByZXN1bHQgPSBbXTtcbiAgICAgIGZvciAoY29uc3QgaSBvZiBvKVxuICAgICAgICByZXN1bHQucHVzaChzY29wZVZhbHVlQXNQcmltaXRpdmVzKGkpKTtcbiAgICAgIHJldHVybiByZXN1bHQ7XG4gICAgfVxuICAgIGlmIChvIGluc3RhbmNlb2YgT2JqZWN0KSB7XG4gICAgICBjb25zdCByZXN1bHQgPSB7fTtcbiAgICAgIGZvciAoY29uc3QgW2ssdl0gb2YgT2JqZWN0LmVudHJpZXMobykpXG4gICAgICAgIHJlc3VsdFtrXSA9IHNjb3BlVmFsdWVBc1ByaW1pdGl2ZXModik7XG4gICAgICByZXR1cm4gcmVzdWx0O1xuICAgIH1cbiAgfVxuICB0aHJvdyBuZXcgRXJyb3IoYFVua25vd24gaW5zdGFuY2Ugb2YgJHtvfWApO1xufVxuXG5HbG9iYWxDb250ZXh0LnByb3RvdHlwZS5jcmVhdGVHb2FscyA9IGZ1bmN0aW9uKHNjb3BlKSB7XG4gIGZvciAoY29uc3QgaXRlciBvZiBPYmplY3QudmFsdWVzKHRoaXNbVU5LTk9XTl9UQVJHRVRTXSkpIHtcbiAgICBjb25zdCB0YXJnZXQgPSB0aGlzW1RBUkdFVFNdLmdldChpdGVyLk5BTUUpO1xuICAgIHRhcmdldC5hZGRTb3VyY2VzKGl0ZXIuU09VUkNFUyk7XG4gICAgdGFyZ2V0LklOQ0xVREVTLnB1c2goLi4uaXRlci5JTkNMVURFUyk7XG4gICAgdGFyZ2V0LkRFRklORVMucHVzaCguLi5pdGVyLkRFRklORVMpO1xuICAgIHRhcmdldC5DT01QSUxFX09QVElPTlMucHVzaCguLi5pdGVyLkNPTVBJTEVfT1BUSU9OUyk7XG4gICAgdGFyZ2V0LkxJTktfT1BUSU9OUy5wdXNoKC4uLml0ZXIuTElOS19PUFRJT05TKTtcbiAgfVxuXG4gIGZvciAoY29uc3QgaXRlciBvZiBPYmplY3QudmFsdWVzKHRoaXNbSU5URVJGQUNFX1NDUklQVFNdKSkge1xuICAgIGNvbnN0IHNjcmlwdCA9IHRoaXNbU0NSSVBUU10uZ2V0KGl0ZXIuTkFNRSk7XG4gICAgZm9yIChjb25zdCBba2V5LCB2YWxzXSBvZiBPYmplY3QuZW50cmllcyhpdGVyLlBST1BFUlRJRVMpKVxuICAgICAgc2NyaXB0LmFkZFByb3BlcnR5KGtleSwgLi4udmFscyk7XG4gIH1cblxuICBjb25zdCBnb2FsTGlzdCA9IEdvYWxDb2xsZWN0aW9uLmNyZWF0ZSgpO1xuICBmb3IgKGNvbnN0IFtuYW1lLCBzY3JpcHRdIG9mIE9iamVjdC5lbnRyaWVzKHRoaXNbU0NSSVBUU10uRU5UUklFUykpIHsgICBcbiAgICBjb25zdCBkZXBlbmRzID0gWyBzY3JpcHQuRklMRS50b1N0cmluZygpIF07XG4gICAgaWYgKHNjcmlwdC5JTlBVVClcbiAgICAgIGRlcGVuZHMucHVzaChzY3JpcHQuSU5QVVQudG9TdHJpbmcoKSk7XG4gICAgY29uc3QgbXNnID0gXCJcXHgxYlszNm1cIiArIFwiR2VuZXJhdGluZyBcIiArIHNjcmlwdC5UQVJHRVRfU0NPUEUuQklOQVJZX0RJUi5yZWxhdGl2ZShzY3JpcHQuT1VUUFVUKSArIFwiXFx4MWJbMG1cIjtcbiAgICBjb25zdCBwYXJhbXMgPSB7IC4uLnNjcmlwdC5QUk9QRVJUSUVTLCAuLi5zY3JpcHQuUEFSQU1TIH07XG4gICAgZ29hbExpc3QuYWRkU2NyaXB0KHNjcmlwdC5GSUxFLCBcIlwiLCBkZXBlbmRzLCBzY3JpcHQuT1VUUFVULnRvU3RyaW5nKCksIHNjb3BlVmFsdWVBc1ByaW1pdGl2ZXMocGFyYW1zKSwgbXNnKTtcbiAgfVxuXG4gIGZvciAoY29uc3QgW25hbWUsIHRhcmdldF0gb2YgT2JqZWN0LmVudHJpZXModGhpc1tUQVJHRVRTXS5FTlRSSUVTKSkge1xuICAgIGNvbnN0IGhlYWRlcnMgPSB0aGlzW1RBUkdFVFNdLmFsbEhlYWRlcnNPZih0YXJnZXQpO1xuICAgIGNvbnN0IGRlcGVuZHMgPSBbXTtcbiAgICBmb3IgKGNvbnN0IHMgb2YgdGFyZ2V0LlNPVVJDRVMpIHtcbiAgICAgIGlmIChzIGluc3RhbmNlb2YgSW50ZXJmYWNlT2JqZWN0cykge1xuICAgICAgICBjb25zdCB0ID0gdGhpc1tUQVJHRVRTXS5nZXQocy50YXJnZXROYW1lKTtcbiAgICAgICAgZm9yIChjb25zdCBmIG9mIHQuU09VUkNFUykge1xuICAgICAgICAgIGlmIChmIGluc3RhbmNlb2YgU291cmNlRmlsZSAmJiBmLk9CSkVDVF9GSUxFKVxuICAgICAgICAgICAgZGVwZW5kcy5wdXNoKGYuT0JKRUNUX0ZJTEUudG9TdHJpbmcoKSk7XG4gICAgICAgIH1cbiAgICAgICAgY29udGludWU7XG4gICAgICB9XG5cbiAgICAgIGlmIChzLkhFQURFUl9GSUxFX09OTFkpXG4gICAgICAgIGNvbnRpbnVlO1xuXG4gICAgICBmcy5ta2RpclN5bmMocy5PQkpFQ1RfRklMRV9ESVIudG9TdHJpbmcoKSwgeyByZWN1cnNpdmU6IHRydWUgfSk7XG5cbiAgICAgIGNvbnN0IHJlbGF0aXZlT2JqZWN0ID0gdGFyZ2V0LlRBUkdFVF9TQ09QRS5CSU5BUllfRElSLnJlbGF0aXZlKHMuT0JKRUNUX0ZJTEUpO1xuICAgICAgY29uc3QgcmVsYXRpdmVCaW5hcnlEaXIgPSBzY29wZS5QUk9KRUNUX0JJTkFSWV9ESVIucmVsYXRpdmUodGFyZ2V0LlRBUkdFVF9TQ09QRS5CSU5BUllfRElSKTtcbiAgICAgIGNvbnN0IG1zZyA9IFwiXFx4MWJbMzJtXCIgKyBgQnVpbGRpbmcgJHtzLkxBTkdVQUdFfSBvYmplY3QgJHtyZWxhdGl2ZUJpbmFyeURpcn0vJHtyZWxhdGl2ZU9iamVjdH1gICsgXCJcXHgxYlswbVwiO1xuXG4gICAgICBjb25zdCBkZWZpbml0aW9ucyA9IFtcbiAgICAgICAgLi4udGhpc1tUQVJHRVRTXS5hbGxEZWZpbml0aW9uc09mKHRhcmdldCksXG4gICAgICAgIC4uLnMuREVGSU5FUyxcbiAgICAgIF07XG5cbiAgICAgIGNvbnN0IGFyZ3MgPSBbXTtcbiAgICAgIGFyZ3MucHVzaCguLi5kZWZpbml0aW9ucy5tYXAoaSA9PiBcIi1EXCIgKyBpKSk7XG4gICAgICBhcmdzLnB1c2goLi4udGhpc1tUQVJHRVRTXS5hbGxJbmNsdWRlc09mKHRhcmdldCkubWFwKGkgPT4gXCItSVwiICsgaSkpO1xuICAgICAgYXJncy5wdXNoKC4uLnRoaXNbVEFSR0VUU10uYWxsQ29tcGlsZU9wdGlvbnNPZih0YXJnZXQpKTtcbiAgICAgIGlmICh0YXJnZXQuUE9TSVRJT05fSU5ERVBFTkRFTlRfQ09ERSlcbiAgICAgICAgYXJncy5wdXNoKFwiLWZQSUNcIik7XG4gICAgICBhcmdzLnB1c2goLi4ucy5DT01QSUxFX0ZMQUdTLmZsYXQoKSk7XG4gICAgICBhcmdzLnB1c2goXCItb1wiLCByZWxhdGl2ZU9iamVjdCk7XG4gICAgICBhcmdzLnB1c2goXCItY1wiLCBzLkZJTEUpO1xuICAgICAgY29uc3QgY3dkID0gdGFyZ2V0LlRBUkdFVF9TQ09QRS5CSU5BUllfRElSLnRvU3RyaW5nKCk7XG5cbiAgICAgIGNvbnN0IGNvbW1hbmQgPSB0YXJnZXQuVEFSR0VUX1NDT1BFW3MuTEFOR1VBR0UgKyBcIl9DT01QSUxFUlwiXS50b1N0cmluZygpO1xuICAgICAgY29uc3Qgb3V0cHV0ID0gdGFyZ2V0LlRBUkdFVF9TQ09QRS5CSU5BUllfRElSLmpvaW4ocmVsYXRpdmVPYmplY3QpLnRvU3RyaW5nKCk7XG4gICAgICBkZXBlbmRzLnB1c2gob3V0cHV0KTtcblxuICAgICAgZ29hbExpc3QuYWRkRXhlYyhvdXRwdXQsIFsgLi4uaGVhZGVycywgcy5GSUxFIF0sIGNvbW1hbmQsIGFyZ3MsIGN3ZCwgbXNnKTtcbiAgICB9XG5cbiAgICBjb25zdCBsaW5rT3B0aW9ucyA9IHRoaXNbVEFSR0VUU10uYWxsTGlua09wdGlvbnNPZih0YXJnZXQpO1xuICAgIGlmICh0YXJnZXQgaW5zdGFuY2VvZiBPYmplY3RMaWJyYXJ5KSB7XG4gICAgICBjb25zdCBvYmpzID0gZGVwZW5kcy5maWx0ZXIoaSA9PiBpLmVuZHNXaXRoKFwiLm9cIikgfHwgaS5lbmRzV2l0aChcIi5vYmpcIikpLm1hcChpID0+IHRhcmdldC5GSUxFX0RJUi5yZWxhdGl2ZShpKSk7XG4gICAgICBpZiAob2Jqcy5sZW5ndGgpIHtcbiAgICAgICAgY29uc3QgYXJncyA9IFtcbiAgICAgICAgICAuLi5saW5rT3B0aW9ucyxcbiAgICAgICAgICBcIi1yXCIsXG4gICAgICAgICAgXCItb1wiLCB0YXJnZXQuRklMRV9OQU1FLFxuICAgICAgICAgIC4uLm9ianNcbiAgICAgICAgXTtcbiAgICAgICAgY29uc3QgY3dkID0gdGFyZ2V0LkZJTEVfRElSLnRvU3RyaW5nKCk7XG4gICAgICAgIGNvbnN0IG1zZyA9IGBMaW5raW5nIENYWCBvYmplY3QgbGlicmFyeSAke3RhcmdldC5GSUxFX05BTUV9YDtcbiAgICAgICAgZ29hbExpc3QuYWRkRXhlYyh0YXJnZXQuRklMRS50b1N0cmluZygpLCBkZXBlbmRzLCBzY29wZS5MSU5LRVIsIGFyZ3MsIGN3ZCwgbXNnKTtcbiAgICAgIH1cbiAgICAgIGVsc2Uge1xuICAgICAgICBjb25zb2xlLmxvZyhgTm8gb2JqZWN0cyBmb3IgXCIke3RhcmdldC5OQU1FfVwiYCk7XG4gICAgICB9XG4gICAgfVxuXG4gICAgaWYgKHRhcmdldCBpbnN0YW5jZW9mIFN0YXRpY0xpYnJhcnkpIHtcbiAgICAgIGNvbnN0IG9ianMgPSBkZXBlbmRzLmZpbHRlcihpID0+IGkuZW5kc1dpdGgoXCIub1wiKSB8fCBpLmVuZHNXaXRoKFwiLm9ialwiKSkubWFwKGkgPT4gdGFyZ2V0LkZJTEVfRElSLnJlbGF0aXZlKGkpKTtcbiAgICAgIGlmIChvYmpzLmxlbmd0aCkge1xuICAgICAgICBjb25zdCBhcmdzID0gWyBcInJjXCIsIHRhcmdldC5GSUxFX05BTUUgLCAuLi5vYmpzIF07XG4gICAgICAgIGNvbnN0IGN3ZCA9IHRhcmdldC5GSUxFX0RJUi50b1N0cmluZygpO1xuICAgICAgICBjb25zdCBtc2cgPSBgTGlua2luZyBDWFggc3RhdGljIGxpYnJhcnkgJHt0YXJnZXQuRklMRV9OQU1FfWA7XG4gICAgICAgIGdvYWxMaXN0LmFkZEV4ZWModGFyZ2V0LkZJTEUudG9TdHJpbmcoKSwgZGVwZW5kcywgc2NvcGUuQVIsIGFyZ3MsIGN3ZCwgbXNnKTtcbiAgICAgIH1cbiAgICAgIGVsc2Uge1xuICAgICAgICBjb25zb2xlLmxvZyhgTm8gb2JqZWN0cyBmb3IgXCIke3RhcmdldC5OQU1FfVwiYCk7XG4gICAgICB9XG4gICAgfVxuXG4gICAgaWYgKHRhcmdldCBpbnN0YW5jZW9mIFNoYXJlZExpYnJhcnkpIHtcbiAgICAgIHRocm93IG5ldyBFcnJvcihcIk5vdCBpbXBsZW1lbnRlZFwiKTtcbiAgICB9XG5cbiAgICBpZiAodGFyZ2V0IGluc3RhbmNlb2YgRXhlY3V0YWJsZSkge1xuICAgICAgY29uc3Qgb2JqcyA9IGRlcGVuZHMuZmlsdGVyKGkgPT4gaS5lbmRzV2l0aChcIi5vXCIpIHx8IGkuZW5kc1dpdGgoXCIub2JqXCIpKS5tYXAoaSA9PiB0YXJnZXQuRklMRV9ESVIucmVsYXRpdmUoaSkpO1xuICAgICAgaWYgKG9ianMubGVuZ3RoKSB7XG4gICAgICAgIGNvbnN0IGxpYnMgPSB0aGlzW1RBUkdFVFNdLmFsbExpYnJhcmllc09mKHRhcmdldCk7XG4gICAgICAgIGNvbnN0IGFyZ3MgPSBbXG4gICAgICAgICAgLi4udGFyZ2V0LlRBUkdFVF9TQ09QRS5DWFhfRkxBR1MsXG4gICAgICAgICAgLi4ubGlua09wdGlvbnMsXG4gICAgICAgICAgLi4ub2JqcyxcbiAgICAgICAgICBcIi1vXCIsIHRhcmdldC5GSUxFX05BTUUsXG4gICAgICAgICAgLi4ubGlicy5tYXAoaSA9PiB0YXJnZXQuRklMRV9ESVIucmVsYXRpdmUoaSkpLFxuICAgICAgICBdO1xuICAgICAgICBjb25zdCBjd2QgPSB0YXJnZXQuRklMRV9ESVIudG9TdHJpbmcoKTtcbiAgICAgICAgY29uc3QgbXNnID0gYExpbmtpbmcgQ1hYIGV4ZWN1dGFibGUgJHt0YXJnZXQuRklMRV9OQU1FfWA7XG4gICAgICAgIGdvYWxMaXN0LmFkZEV4ZWModGFyZ2V0LkZJTEUudG9TdHJpbmcoKSwgZGVwZW5kcy5jb25jYXQobGlicyksIHNjb3BlLkNYWF9DT01QSUxFUiwgYXJncywgY3dkLCBtc2cpO1xuICAgICAgfVxuICAgICAgZWxzZSB7XG4gICAgICAgIGNvbnNvbGUubG9nKGBObyBvYmplY3RzIGZvciBcIiR7dGFyZ2V0Lk5BTUV9XCJgKTtcbiAgICAgIH1cbiAgICB9XG5cbiAgICBnb2FsTGlzdC5hZGRUYXJnZXQobmFtZSwgWyB0YXJnZXQuRklMRS50b1N0cmluZygpIF0sIGBCdWlsdCB0YXJnZXQgJHtuYW1lfWApO1xuICB9XG5cbiAgY29uc3QgaW5zdGFsbF9maWxlcyA9IFtdO1xuICBjb25zdCBpbnN0YWxsX3NjcmlwdCA9IHBhdGgucG9zaXguam9pbihfX2Rpcm5hbWUsIFwiU3lzdGVtU2NyaXB0cy9pbnN0YWxsX3NjcmlwdC5qc1wiKTtcbiAgZm9yIChjb25zdCBpdGVyIG9mIHRoaXNbSU5TVEFMTF9MSVNUXSkge1xuICAgIGxldCBzcmMsIGRlc3Q7XG4gICAgaWYgKGl0ZXIuVkFMVUUgaW5zdGFuY2VvZiBGaWxlUGF0aCkge1xuICAgICAgaWYgKHNjb3BlLlBSRVZFTlRfSU5TVEFMTF9GSUxFUylcbiAgICAgICAgY29udGludWU7XG4gICAgICBzcmMgPSBpdGVyLlZBTFVFLnRvU3RyaW5nKCk7XG4gICAgICBjb25zdCByZmlsZSA9IGl0ZXIuQkFTRV9ESVIucmVsYXRpdmUoaXRlci5WQUxVRSk7XG4gICAgICBkZXN0ID0gaXRlci5ERVNUSU5BVElPTi5qb2luKHJmaWxlKTtcbiAgICB9XG4gICAgZWxzZSBpZiAoaXRlci5WQUxVRSBpbnN0YW5jZW9mIEludGVyZmFjZVRhcmdldCkge1xuICAgICAgY29uc3QgdGFyZ2V0ID0gdGhpc1tUQVJHRVRTXS5nZXQoaXRlci5WQUxVRS50YXJnZXROYW1lKTtcbiAgICAgIHNyYyA9IHRhcmdldC5GSUxFLnRvU3RyaW5nKCk7XG4gICAgICBkZXN0ID0gaXRlci5ERVNUSU5BVElPTi5qb2luKHRhcmdldC5GSUxFX05BTUUpO1xuICAgIH1cbiAgICBlbHNlIHtcbiAgICAgIHRocm93IG5ldyBFcnJvcihgQ2FuIG5vdCBpbnN0YWxsICR7aXRlci5WQUxVRX1gKVxuICAgIH1cbiAgICBpZiAoc2NvcGUuREVTVERJUilcbiAgICAgIGRlc3QgPSBEaXJQYXRoLmNyZWF0ZShzY29wZS5ERVNURElSKS5qb2luKGRlc3QpO1xuICAgIGdvYWxMaXN0LmFkZFNjcmlwdChpbnN0YWxsX3NjcmlwdCwgXCJcIiwgWyBzcmMgXSwgZGVzdCwgc2NvcGVWYWx1ZUFzUHJpbWl0aXZlcyh7c3JjLCBkZXN0fSksIFwiXCIpO1xuICAgIGluc3RhbGxfZmlsZXMucHVzaChkZXN0KTtcbiAgfVxuXG4gIGlmIChpbnN0YWxsX2ZpbGVzLmxlbmd0aCkge1xuICAgIGdvYWxMaXN0LmFkZFRhcmdldChcImluc3RhbGxcIiwgaW5zdGFsbF9maWxlcywgXCJcIik7XG4gIH1cblxuICBnb2FsTGlzdC5hZGRUYXJnZXQoXCJhbGxcIiwgT2JqZWN0LmtleXModGhpc1tUQVJHRVRTXS5FTlRSSUVTKSwgXCJcIik7XG5cbiAgcmV0dXJuIGdvYWxMaXN0O1xufVxuXG5tb2R1bGUuZXhwb3J0cyA9IHtcbiAgR2xvYmFsQ29udGV4dCxcbn07XG4iLCJcInVzZSBzdHJpY3RcIjtcblxuY29uc3QgeyBJbnRlcmZhY2VUYXJnZXQgfSA9IHJlcXVpcmUoXCIuL0ludGVyZmFjZVRhcmdldC5qc1wiKTtcbmNvbnN0IHsgQWJzb2x1dGVQYXRoIH0gPSByZXF1aXJlKFwiQC91dGlscy9BYnNvbHV0ZVBhdGguanNcIik7XG5jb25zdCB7IEZpbGVQYXRoLCBEaXJQYXRoIH0gPSByZXF1aXJlKFwiQC9jb3JlL1BhdGhcIik7XG5cbmNvbnN0IFZBTFVFICAgICAgID0gU3ltYm9sKFwiVkFMVUVcIik7XG5jb25zdCBERVNUSU5BVElPTiA9IFN5bWJvbChcIkRFU1RJTkFUSU9OXCIpO1xuY29uc3QgQkFTRV9ESVIgICAgPSBTeW1ib2woXCJCQVNFX0RJUlwiKTtcblxuZnVuY3Rpb24gSW5zdGFsbEVudGl0eShzY29wZSwgdmFsdWUsIHBhcmFtcykge1xuICBsZXQgZGVzdGluYXRpb247XG4gIGxldCBiYXNlRGlyO1xuICBpZiAodHlwZW9mIHBhcmFtcyA9PT0gXCJzdHJpbmdcIilcbiAgICBkZXN0aW5hdGlvbiA9IHBhcmFtcztcbiAgZWxzZSBpZiAocGFyYW1zKSB7XG4gICAgZGVzdGluYXRpb24gPSBwYXJhbXMuZGVzdGluYXRpb247XG4gICAgYmFzZURpciA9IHBhcmFtcy5iYXNlRGlyO1xuICB9XG5cbiAgaWYgKCFkZXN0aW5hdGlvbilcbiAgICB0aHJvdyBuZXcgRXJyb3IoYFBhcmFtZXRlciBkZXN0aW5hdGlvbiBpcyBub3Qgc3BlY2lmaWVkYCk7XG5cbiAgaWYgKGJhc2VEaXIpXG4gICAgYmFzZURpciA9IHNjb3BlLlNPVVJDRV9ESVIucmVzb2x2ZShiYXNlRGlyKTtcblxuICBpZiAodHlwZW9mIHZhbHVlID09PSBcInN0cmluZ1wiIHx8IHZhbHVlIGluc3RhbmNlb2YgQWJzb2x1dGVQYXRoKSB7XG4gICAgdmFsdWUgPSBzY29wZS5TT1VSQ0VfRElSLnJlc29sdmUodmFsdWUudG9TdHJpbmcoKSk7XG4gICAgdmFsdWUgPSBGaWxlUGF0aC5jcmVhdGUodmFsdWUudG9TdHJpbmcoKSk7XG4gICAgYmFzZURpciA9IGJhc2VEaXIgfHwgdmFsdWUuZGlybmFtZSgpO1xuICB9XG4gIGVsc2UgaWYgKCEodmFsdWUgaW5zdGFuY2VvZiBJbnRlcmZhY2VUYXJnZXQpKSB7XG4gICAgdGhyb3cgbmV3IEVycm9yKGBOb3Qgc3VwcG9ydGV0IHZhbHVlIG9mICR7dmFsdWV9YCk7XG4gIH1cblxuICB0aGlzW1ZBTFVFXSA9IHZhbHVlO1xuICB0aGlzW0RFU1RJTkFUSU9OXSA9IERpclBhdGguY3JlYXRlKHNjb3BlLklOU1RBTExfUFJFRklYLnJlc29sdmUoZGVzdGluYXRpb24udG9TdHJpbmcoKSkpO1xuICB0aGlzW0JBU0VfRElSXSA9IGJhc2VEaXIgPyBEaXJQYXRoLmNyZWF0ZShiYXNlRGlyLnRvU3RyaW5nKCkpIDogbnVsbDtcbn1cblxuSW5zdGFsbEVudGl0eS5jcmVhdGUgPSAoc2NvcGUsIHZhbHVlLCBwYXJhbXMpID0+IHtcbiAgcmV0dXJuIE9iamVjdC5zZWFsKG5ldyBJbnN0YWxsRW50aXR5KHNjb3BlLCB2YWx1ZSwgcGFyYW1zKSk7XG59XG5cbkluc3RhbGxFbnRpdHkucHJvdG90eXBlID0gT2JqZWN0LmNyZWF0ZShPYmplY3QucHJvdG90eXBlLCB7XG4gIGNvbnN0cnVjdG9yOiB7XG4gICAgdmFsdWU6IEluc3RhbGxFbnRpdHksXG4gICAgZW51bWVyYWJsZTogZmFsc2UsXG4gIH0sXG4gIFZBTFVFOiB7XG4gICAgZ2V0ICgpIHsgcmV0dXJuIHRoaXNbVkFMVUVdOyB9LFxuICAgIGVudW1lcmFibGU6IHRydWUsXG4gIH0sXG4gIERFU1RJTkFUSU9OOiB7XG4gICAgZ2V0ICgpIHsgcmV0dXJuIHRoaXNbREVTVElOQVRJT05dOyB9LFxuICAgIGVudW1lcmFibGU6IHRydWUsXG4gIH0sXG4gIEJBU0VfRElSOiB7XG4gICAgZ2V0ICgpIHsgcmV0dXJuIHRoaXNbQkFTRV9ESVJdOyB9LFxuICAgIGVudW1lcmFibGU6IHRydWUsXG4gIH0sXG59KTtcblxuSW5zdGFsbEVudGl0eS5wcm90b3R5cGUudG9KU09OID0gZnVuY3Rpb24oKSB7XG4gIGNvbnN0IGpzb24gPSB7fTtcbiAgZm9yIChjb25zdCBrZXkgaW4gdGhpcylcbiAgICBqc29uW2tleV0gPSB0aGlzW2tleV07XG4gIHJldHVybiBqc29uO1xufVxuXG5tb2R1bGUuZXhwb3J0cyA9IHtcbiAgSW5zdGFsbEVudGl0eSxcbn07XG4iLCJcInVzZSBzdHJpY3RcIjtcblxuY29uc3QgTkFNRSA9IFN5bWJvbChcIk5BTUVcIik7XG5cbmZ1bmN0aW9uIEludGVyZmFjZUluY2x1ZGVzKG5hbWUpIHtcbiAgdGhpc1tOQU1FXSA9IG5hbWU7XG59XG5cbkludGVyZmFjZUluY2x1ZGVzLmNyZWF0ZSA9IChuYW1lKSA9PiB7XG4gIHJldHVybiBPYmplY3Quc2VhbChuZXcgSW50ZXJmYWNlSW5jbHVkZXMobmFtZSkpO1xufVxuXG5JbnRlcmZhY2VJbmNsdWRlcy5lbnN1cmVJbnN0YW5jZSA9ICh2YWx1ZSkgPT4ge1xuICBpZiAodmFsdWUgaW5zdGFuY2VvZiBJbnRlcmZhY2VJbmNsdWRlcylcbiAgICByZXR1cm4gdmFsdWU7XG4gIHRocm93IG5ldyBFcnJvcihgVGhlICcke3ZhbHVlfScgaXMgbm90IGEgSW50ZXJmYWNlSW5jbHVkZXNgKTtcbn1cblxuSW50ZXJmYWNlSW5jbHVkZXMucHJvdG90eXBlID0gT2JqZWN0LmNyZWF0ZShPYmplY3QucHJvdG90eXBlLCB7XG4gIGNvbnN0cnVjdG9yOiB7XG4gICAgdmFsdWU6IEludGVyZmFjZUluY2x1ZGVzLFxuICAgIGVudW1lcmFibGU6IGZhbHNlLFxuICB9LFxuICB0YXJnZXROYW1lOiB7XG4gICAgZ2V0ICgpIHsgcmV0dXJuIHRoaXNbTkFNRV07IH0sXG4gICAgZW51bWVyYWJsZTogdHJ1ZSxcbiAgfSxcbn0pO1xuXG5JbnRlcmZhY2VJbmNsdWRlcy5wcm90b3R5cGUudG9KU09OID0gZnVuY3Rpb24oKSB7XG4gIHJldHVybiB0aGlzLnRvU3RyaW5nKCk7XG59XG5cbkludGVyZmFjZUluY2x1ZGVzLnByb3RvdHlwZS50b1N0cmluZyA9IGZ1bmN0aW9uKCkge1xuICByZXR1cm4gXCIke1wiICsgdGhpc1tOQU1FXSArIFwiLmluY2x1ZGVzfVwiO1xufVxuXG5tb2R1bGUuZXhwb3J0cyA9IHtcbiAgSW50ZXJmYWNlSW5jbHVkZXMsXG59O1xuIiwiXCJ1c2Ugc3RyaWN0XCI7XG5cbmNvbnN0IE5BTUUgPSBTeW1ib2woXCJOQU1FXCIpO1xuXG5mdW5jdGlvbiBJbnRlcmZhY2VPYmplY3RzKG5hbWUpIHtcbiAgdGhpc1tOQU1FXSA9IG5hbWU7XG59XG5cbkludGVyZmFjZU9iamVjdHMuY3JlYXRlID0gKG5hbWUpID0+IHtcbiAgcmV0dXJuIE9iamVjdC5zZWFsKG5ldyBJbnRlcmZhY2VPYmplY3RzKG5hbWUpKTtcbn1cblxuSW50ZXJmYWNlT2JqZWN0cy5lbnN1cmVJbnN0YW5jZSA9ICh2YWx1ZSkgPT4ge1xuICBpZiAodmFsdWUgaW5zdGFuY2VvZiBJbnRlcmZhY2VPYmplY3RzKVxuICAgIHJldHVybiB2YWx1ZTtcbiAgdGhyb3cgbmV3IEVycm9yKGBUaGUgJyR7dmFsdWV9JyBpcyBub3QgYSBJbnRlcmZhY2VPYmplY3RzYCk7XG59XG5cbkludGVyZmFjZU9iamVjdHMucHJvdG90eXBlID0gT2JqZWN0LmNyZWF0ZShPYmplY3QucHJvdG90eXBlLCB7XG4gIGNvbnN0cnVjdG9yOiB7XG4gICAgdmFsdWU6IEludGVyZmFjZU9iamVjdHMsXG4gICAgZW51bWVyYWJsZTogZmFsc2UsXG4gIH0sXG4gIHRhcmdldE5hbWU6IHtcbiAgICBnZXQgKCkgeyByZXR1cm4gdGhpc1tOQU1FXTsgfSxcbiAgICBlbnVtZXJhYmxlOiBmYWxzZSxcbiAgfSxcbn0pO1xuXG5JbnRlcmZhY2VPYmplY3RzLnByb3RvdHlwZS50b0pTT04gPSBmdW5jdGlvbigpIHtcbiAgcmV0dXJuIHRoaXMudG9TdHJpbmcoKTtcbn1cblxuSW50ZXJmYWNlT2JqZWN0cy5wcm90b3R5cGUudG9TdHJpbmcgPSBmdW5jdGlvbigpIHtcbiAgcmV0dXJuIFwiJHtcIiArIHRoaXNbTkFNRV0gKyBcIi5vYmplY3RzfVwiO1xufVxuXG5tb2R1bGUuZXhwb3J0cyA9IHtcbiAgSW50ZXJmYWNlT2JqZWN0cyxcbn07XG4iLCJcInVzZSBzdHJpY3RcIjtcblxuY29uc3QgTkFNRSAgICAgICA9IFN5bWJvbChcIk5BTUVcIik7XG5jb25zdCBQUk9QRVJUSUVTID0gU3ltYm9sKFwiUFJPUEVSVElFU1wiKTtcblxuZnVuY3Rpb24gSW50ZXJmYWNlU2NyaXB0KG5hbWUpIHtcbiAgdGhpc1tOQU1FXSA9IG5hbWU7XG4gIHRoaXNbUFJPUEVSVElFU10gPSB7fTtcbn1cblxuSW50ZXJmYWNlU2NyaXB0LmNyZWF0ZSA9IChuYW1lKSA9PiB7XG4gIHJldHVybiBPYmplY3Quc2VhbChuZXcgSW50ZXJmYWNlU2NyaXB0KG5hbWUpKTtcbn1cblxuSW50ZXJmYWNlU2NyaXB0LmVuc3VyZUluc3RhbmNlID0gKHZhbHVlKSA9PiB7XG4gIGlmICh2YWx1ZSBpbnN0YW5jZW9mIEludGVyZmFjZVNjcmlwdClcbiAgICByZXR1cm4gdmFsdWU7XG4gIHRocm93IG5ldyBFcnJvcihgVGhlICcke3ZhbHVlfScgaXMgbm90IGEgSW50ZXJmYWNlU2NyaXB0YCk7XG59XG5cbkludGVyZmFjZVNjcmlwdC5wcm90b3R5cGUgPSBPYmplY3QuY3JlYXRlKE9iamVjdC5wcm90b3R5cGUsIHtcbiAgY29uc3RydWN0b3I6IHtcbiAgICB2YWx1ZTogSW50ZXJmYWNlU2NyaXB0LFxuICAgIGVudW1lcmFibGU6IGZhbHNlLFxuICB9LFxuICBOQU1FOiB7XG4gICAgZ2V0ICgpIHsgcmV0dXJuIHRoaXNbTkFNRV07IH0sXG4gICAgZW51bWVyYWJsZTogdHJ1ZSxcbiAgfSxcbiAgUFJPUEVSVElFUzoge1xuICAgIGdldCAoKSB7IHJldHVybiB0aGlzW1BST1BFUlRJRVNdOyB9LFxuICAgIGVudW1lcmFibGU6IHRydWUsXG4gIH0sXG59KTtcblxuSW50ZXJmYWNlU2NyaXB0LnByb3RvdHlwZS5hZGRQcm9wZXJ0eSA9IGZ1bmN0aW9uKGtleSwgLi4udmFscykge1xuICBsZXQgcHJvcGVydHkgPSB0aGlzW1BST1BFUlRJRVNdW2tleV07XG4gIGlmICghcHJvcGVydHkpIHtcbiAgICBwcm9wZXJ0eSA9IFtdO1xuICAgIHRoaXNbUFJPUEVSVElFU11ba2V5XSA9IHByb3BlcnR5O1xuICB9XG4gIHZhbHMuZm9yRWFjaCh2ID0+IHByb3BlcnR5LnB1c2godikpO1xufVxuXG5JbnRlcmZhY2VTY3JpcHQucHJvdG90eXBlLnRvSlNPTiA9IGZ1bmN0aW9uKCkge1xuICBjb25zdCBqc29uID0ge307XG4gIGZvciAoY29uc3Qga2V5IGluIHRoaXMpXG4gICAganNvbltrZXldID0gKHR5cGVvZiB0aGlzW2tleV0udG9KU09OID09PSBcImZ1bmN0aW9uXCIpID8gdGhpc1trZXldLnRvSlNPTigpIDogdGhpc1trZXldO1xuICByZXR1cm4ganNvbjtcbn1cblxuSW50ZXJmYWNlU2NyaXB0LnByb3RvdHlwZS50b1N0cmluZyA9IGZ1bmN0aW9uKCkge1xuICByZXR1cm4gdGhpc1tOQU1FXTtcbn1cblxubW9kdWxlLmV4cG9ydHMgPSB7XG4gIEludGVyZmFjZVNjcmlwdCxcbn07XG4iLCJcInVzZSBzdHJpY3RcIjtcblxuY29uc3QgeyBBYnNvbHV0ZVBhdGggfSA9IHJlcXVpcmUoXCJAL3V0aWxzL0Fic29sdXRlUGF0aC5qc1wiKTtcbmNvbnN0IHsgSW50ZXJmYWNlSW5jbHVkZXMgfSA9IHJlcXVpcmUoXCIuL0ludGVyZmFjZUluY2x1ZGVzLmpzXCIpO1xuY29uc3QgeyBJbnRlcmZhY2VPYmplY3RzIH0gPSByZXF1aXJlKFwiLi9JbnRlcmZhY2VPYmplY3RzLmpzXCIpO1xuY29uc3QgeyBJbmNsdWRlRGlyZWN0b3J5IH0gPSByZXF1aXJlKFwiQC9jb3JlL0luY2x1ZGVEaXJlY3RvcnlcIik7XG5jb25zdCB7IFNvdXJjZUZpbGUgfSA9IHJlcXVpcmUoXCIuL1NvdXJjZUZpbGUuanNcIik7XG5cbmNvbnN0IFVOS05PV05fVEFSR0VUID0gU3ltYm9sKFwiVU5LTk9XTl9UQVJHRVRcIik7XG5jb25zdCBTQ09QRSA9IFN5bWJvbChcIlNDT1BFXCIpO1xuXG5mdW5jdGlvbiBJbnRlcmZhY2VUYXJnZXQoc2NvcGUsIHV0YXJnZXQpIHtcbiAgdGhpc1tTQ09QRV0gPSBzY29wZS5jbG9uZSgpO1xuICB0aGlzW1VOS05PV05fVEFSR0VUXSA9IHV0YXJnZXQ7XG59XG5cbkludGVyZmFjZVRhcmdldC5jcmVhdGUgPSAoc2NvcGUsIHV0YXJnZXQpID0+IHtcbiAgcmV0dXJuIE9iamVjdC5zZWFsKG5ldyBJbnRlcmZhY2VUYXJnZXQoc2NvcGUsIHV0YXJnZXQpKTtcbn1cblxuSW50ZXJmYWNlVGFyZ2V0LmVuc3VyZUluc3RhbmNlID0gKHZhbHVlKSA9PiB7XG4gIGlmICh2YWx1ZSBpbnN0YW5jZW9mIEludGVyZmFjZVRhcmdldClcbiAgICByZXR1cm4gdmFsdWU7XG4gIHRocm93IG5ldyBFcnJvcihgVGhlICcke3ZhbHVlfScgaXMgbm90IGEgSW50ZXJmYWNlVGFyZ2V0YCk7XG59XG5cbkludGVyZmFjZVRhcmdldC5wcm90b3R5cGUgPSBPYmplY3QuY3JlYXRlKE9iamVjdC5wcm90b3R5cGUsIHtcbiAgY29uc3RydWN0b3I6IHtcbiAgICB2YWx1ZTogSW50ZXJmYWNlVGFyZ2V0LFxuICAgIGVudW1lcmFibGU6IGZhbHNlLFxuICB9LFxuICB0YXJnZXROYW1lOiB7XG4gICAgZ2V0ICgpIHsgcmV0dXJuIHRoaXNbVU5LTk9XTl9UQVJHRVRdLk5BTUU7IH0sXG4gICAgZW51bWVyYWJsZTogdHJ1ZSxcbiAgfSxcbiAgaW5jbHVkZXM6IHtcbiAgICBnZXQgKCkgeyByZXR1cm4gSW50ZXJmYWNlSW5jbHVkZXMuY3JlYXRlKHRoaXMudGFyZ2V0TmFtZSk7IH0sXG4gICAgZW51bWVyYWJsZTogdHJ1ZSxcbiAgfSxcbiAgb2JqZWN0czoge1xuICAgIGdldCAoKSB7IHJldHVybiBJbnRlcmZhY2VPYmplY3RzLmNyZWF0ZSh0aGlzLnRhcmdldE5hbWUpOyB9LFxuICAgIGVudW1lcmFibGU6IHRydWUsXG4gIH0sXG59KTtcblxuSW50ZXJmYWNlVGFyZ2V0LnByb3RvdHlwZS50b0pTT04gPSBmdW5jdGlvbigpIHtcbiAgcmV0dXJuIHRoaXMudG9TdHJpbmcoKTtcbn1cblxuSW50ZXJmYWNlVGFyZ2V0LnByb3RvdHlwZS50b1N0cmluZyA9IGZ1bmN0aW9uKCkge1xuICByZXR1cm4gXCIke1wiICsgdGhpcy50YXJnZXROYW1lICsgXCJ9XCI7XG59XG5cbkludGVyZmFjZVRhcmdldC5wcm90b3R5cGUuYWRkU291cmNlcyA9IGZ1bmN0aW9uKC4uLnNvdXJjZXMpIHtcbiAgZm9yIChsZXQgaXQgb2Ygc291cmNlcy5mbGF0KDEpKSB7XG4gICAgaWYgKHR5cGVvZiBpdCA9PT0gXCJzdHJpbmdcIiB8fCBBYnNvbHV0ZVBhdGguaXNBYnNvbHV0ZShpdCkpXG4gICAgICBpdCA9IFNvdXJjZUZpbGUuY3JlYXRlKHRoaXNbU0NPUEVdLCBpdCk7XG4gICAgZWxzZSBpZiAoIShpdCBpbnN0YW5jZW9mIEludGVyZmFjZU9iamVjdHMgfHwgaXQgaW5zdGFuY2VvZiBTb3VyY2VGaWxlKSlcbiAgICAgIHRocm93IG5ldyBFcnJvcihgTm90IHN1cHBvcnQgaW5zdGFuY2UgJHtpdH1gKTtcbiAgICB0aGlzW1VOS05PV05fVEFSR0VUXS5TT1VSQ0VTLnB1c2goaXQpO1xuICB9XG59XG5cbkludGVyZmFjZVRhcmdldC5wcm90b3R5cGUuYWRkSW5jbHVkZXMgPSBmdW5jdGlvbiguLi5pbmNsdWRlcykge1xuICBmb3IgKGNvbnN0IGl0IG9mIGluY2x1ZGVzLmZsYXQoMSkpIHtcbiAgICBsZXQgVkFMVUU7XG4gICAgaWYgKHR5cGVvZiBpdCA9PT0gXCJzdHJpbmdcIiB8fCBBYnNvbHV0ZVBhdGguaXNBYnNvbHV0ZShpdCkpXG4gICAgICBWQUxVRSA9IEluY2x1ZGVEaXJlY3RvcnkuY3JlYXRlKGl0LCB0aGlzW1NDT1BFXS5TT1VSQ0VfRElSKTtcbiAgICBlbHNlXG4gICAgICBWQUxVRSA9IEludGVyZmFjZUluY2x1ZGVzLmVuc3VyZUluc3RhbmNlKGl0KTtcbiAgICB0aGlzW1VOS05PV05fVEFSR0VUXS5JTkNMVURFUy5wdXNoKHsgVkFMVUUsIFBVQkxJQ19PTkxZOiBmYWxzZSB9KTtcbiAgfVxufVxuXG5JbnRlcmZhY2VUYXJnZXQucHJvdG90eXBlLmFkZFB1YmxpY0luY2x1ZGVzID0gZnVuY3Rpb24oLi4uaW5jbHVkZXMpIHtcbiAgZm9yIChjb25zdCBpdCBvZiBpbmNsdWRlcy5mbGF0KDEpKSB7XG4gICAgbGV0IFZBTFVFO1xuICAgIGlmICh0eXBlb2YgaXQgPT09IFwic3RyaW5nXCIgfHwgQWJzb2x1dGVQYXRoLmlzQWJzb2x1dGUoaXQpKVxuICAgICAgVkFMVUUgPSBJbmNsdWRlRGlyZWN0b3J5LmNyZWF0ZShpdCwgdGhpc1tTQ09QRV0uU09VUkNFX0RJUik7XG4gICAgZWxzZVxuICAgICAgVkFMVUUgPSBJbnRlcmZhY2VJbmNsdWRlcy5lbnN1cmVJbnN0YW5jZShpdCk7XG4gICAgdGhpc1tVTktOT1dOX1RBUkdFVF0uSU5DTFVERVMucHVzaCh7IFZBTFVFLCBQVUJMSUNfT05MWTogdHJ1ZSB9KTtcbiAgfVxufVxuXG5JbnRlcmZhY2VUYXJnZXQucHJvdG90eXBlLmFkZERlZmluaXRpb25zID0gZnVuY3Rpb24oLi4uZGVmaW5pdGlvbnMpIHtcbiAgZm9yIChjb25zdCBWQUxVRSBvZiBkZWZpbml0aW9ucy5mbGF0KDEpKVxuICAgIHRoaXNbVU5LTk9XTl9UQVJHRVRdLkRFRklORVMucHVzaCh7IFZBTFVFIH0pO1xufVxuXG5JbnRlcmZhY2VUYXJnZXQucHJvdG90eXBlLmFkZFB1YmxpY0RlZmluaXRpb25zID0gZnVuY3Rpb24oLi4uZGVmaW5pdGlvbnMpIHtcbiAgZm9yIChjb25zdCBWQUxVRSBvZiBkZWZpbml0aW9ucy5mbGF0KDEpKVxuICAgIHRoaXNbVU5LTk9XTl9UQVJHRVRdLkRFRklORVMucHVzaCh7IFZBTFVFLCBQVUJMSUNfT05MWTogdHJ1ZSB9KTtcbn1cblxuSW50ZXJmYWNlVGFyZ2V0LnByb3RvdHlwZS5hZGRDb21waWxlT3B0aW9ucyA9IGZ1bmN0aW9uKC4uLm9wdGlvbnMpIHtcbiAgZm9yIChjb25zdCBpdCBvZiBvcHRpb25zLmZsYXQoMSkpIHtcbiAgICB0aGlzW1VOS05PV05fVEFSR0VUXS5DT01QSUxFX09QVElPTlMucHVzaCh7IFZBTFVFOiBpdCB9KTtcbiAgfVxufVxuXG5JbnRlcmZhY2VUYXJnZXQucHJvdG90eXBlLmFkZExpbmtPcHRpb25zID0gZnVuY3Rpb24oLi4ub3B0aW9ucykge1xuICBmb3IgKGNvbnN0IGl0IG9mIG9wdGlvbnMuZmxhdCgxKSkge1xuICAgIHRoaXNbVU5LTk9XTl9UQVJHRVRdLkxJTktfT1BUSU9OUy5wdXNoKHsgVkFMVUU6IGl0IH0pO1xuICB9XG59XG5cbkludGVyZmFjZVRhcmdldC5wcm90b3R5cGUuYWRkUHVibGljQ29tcGlsZU9wdGlvbnMgPSBmdW5jdGlvbiguLi5vcHRpb25zKSB7XG4gIGZvciAoY29uc3QgaXQgb2Ygb3B0aW9ucy5mbGF0KDEpKSB7XG4gICAgdGhpc1tVTktOT1dOX1RBUkdFVF0uQ09NUElMRV9PUFRJT05TLnB1c2goeyBWQUxVRTogaXQsIFBVQkxJQ19PTkxZOiB0cnVlIH0pO1xuICB9XG59XG5cbkludGVyZmFjZVRhcmdldC5wcm90b3R5cGUuYWRkUHVibGljTGlua09wdGlvbnMgPSBmdW5jdGlvbiguLi5vcHRpb25zKSB7XG4gIGZvciAoY29uc3QgaXQgb2Ygb3B0aW9ucy5mbGF0KDEpKSB7XG4gICAgdGhpc1tVTktOT1dOX1RBUkdFVF0uTElOS19PUFRJT05TLnB1c2goeyBWQUxVRTogaXQsIFBVQkxJQ19PTkxZOiB0cnVlIH0pO1xuICB9XG59XG5cbm1vZHVsZS5leHBvcnRzID0ge1xuICBJbnRlcmZhY2VUYXJnZXQsXG59O1xuIiwiXCJ1c2Ugc3RyaWN0XCI7XG5cbmNvbnN0IHsgRGlyUGF0aCB9ID0gcmVxdWlyZShcIkAvY29yZS9QYXRoXCIpO1xuXG5jb25zdCBHTE9CQUwgPSBTeW1ib2woXCJHTE9CQUxcIik7XG5jb25zdCBTQ09QRSA9IFN5bWJvbChcIlNDT1BFXCIpO1xuXG5mdW5jdGlvbiBQbHVnaW5Db250ZXh0KHNjb3BlLCBnbG9iYWwpIHtcbiAgdGhpc1tTQ09QRV0gPSBzY29wZTtcbiAgdGhpc1tHTE9CQUxdID0gZ2xvYmFsO1xufVxuXG5QbHVnaW5Db250ZXh0LnByb3RvdHlwZS5hZGRTdWJkaXJlY3RvcnlBbGlhcyA9IGZ1bmN0aW9uKHNyYywgZGVzdCkge1xuICB0aGlzW0dMT0JBTF0uYWRkU3ViZGlyZWN0b3J5QWxpYXMoRGlyUGF0aC5jcmVhdGUoc3JjLnRvU3RyaW5nKCkpLCBEaXJQYXRoLmNyZWF0ZShkZXN0LnRvU3RyaW5nKCkpKTtcbn1cblxuUGx1Z2luQ29udGV4dC5wcm90b3R5cGUudG9KU09OID0gZnVuY3Rpb24oKSB7XG4gIGNvbnN0IGpzb24gPSB7fTtcbiAgZm9yIChjb25zdCBrZXkgaW4gdGhpcylcbiAgICBqc29uW2tleV0gPSB0aGlzW2tleV07XG4gIHJldHVybiBqc29uO1xufVxuXG5QbHVnaW5Db250ZXh0LmNyZWF0ZSA9IChwcm90b1Njb3BlLCBnbG9iYWwpID0+IHtcbiAgY29uc3QgY3R4ID0gT2JqZWN0LmNyZWF0ZShwcm90b1Njb3BlKTtcbiAgUGx1Z2luQ29udGV4dC5jYWxsKGN0eCwgcHJvdG9TY29wZSwgZ2xvYmFsKTtcbiAgZm9yIChjb25zdCBba2V5LCB2YWxdIG9mIE9iamVjdC5lbnRyaWVzKFBsdWdpbkNvbnRleHQucHJvdG90eXBlKSlcbiAgICBjdHhba2V5XSA9IHZhbDtcbiAgcmV0dXJuIE9iamVjdC5zZWFsKGN0eCk7XG59XG5cbm1vZHVsZS5leHBvcnRzID0ge1xuICBQbHVnaW5Db250ZXh0LFxufTtcbiIsIlwidXNlIHN0cmljdFwiO1xuXG5jb25zdCBFTlRSSUVTID0gU3ltYm9sKFwiRU5UUklFU1wiKTtcblxuZnVuY3Rpb24gU2NyaXB0Q29sbGVjdGlvbigpIHtcbiAgdGhpc1tFTlRSSUVTXSA9IHt9O1xufVxuXG5TY3JpcHRDb2xsZWN0aW9uLnByb3RvdHlwZSA9IE9iamVjdC5jcmVhdGUoT2JqZWN0LnByb3RvdHlwZSwge1xuICBjb25zdHJ1Y3Rvcjoge1xuICAgIHZhbHVlOiBTY3JpcHRDb2xsZWN0aW9uLFxuICAgIGVudW1lcmFibGU6IGZhbHNlLFxuICAgIHdyaXRhYmxlOiB0cnVlLFxuICAgIGNvbmZpZ3VyYWJsZTogdHJ1ZSxcbiAgfSxcbiAgRU5UUklFUzoge1xuICAgIGdldCgpIHsgcmV0dXJuIHRoaXNbRU5UUklFU107IH0sXG4gICAgZW51bWVyYWJsZTogdHJ1ZSxcbiAgfSxcbn0pO1xuXG5TY3JpcHRDb2xsZWN0aW9uLmNyZWF0ZSA9ICgpID0+IHtcbiAgcmV0dXJuIE9iamVjdC5zZWFsKG5ldyBTY3JpcHRDb2xsZWN0aW9uKCkpO1xufVxuXG5TY3JpcHRDb2xsZWN0aW9uLnByb3RvdHlwZS50b0pTT04gPSBmdW5jdGlvbigpIHtcbiAgcmV0dXJuIHRoaXNbRU5UUklFU107XG59XG5cblNjcmlwdENvbGxlY3Rpb24ucHJvdG90eXBlLmdldCA9IGZ1bmN0aW9uKG5hbWUpIHtcbiAgcmV0dXJuIHRoaXNbRU5UUklFU11bbmFtZV07XG59XG5cblNjcmlwdENvbGxlY3Rpb24ucHJvdG90eXBlLnNldCA9IGZ1bmN0aW9uKG5hbWUsIHRhcmdldCkge1xuICBpZiAodGhpc1tFTlRSSUVTXVtuYW1lXSlcbiAgICB0aHJvdyBuZXcgRXJyb3IoYFNjcmlwdCBcIiR7bmFtZX1cIiBleGlzdHNgKTtcbiAgdGhpc1tFTlRSSUVTXVtuYW1lXSA9IHRhcmdldDtcbn1cblxubW9kdWxlLmV4cG9ydHMgPSB7XG4gIFNjcmlwdENvbGxlY3Rpb24sXG59O1xuIiwiXCJ1c2Ugc3RyaWN0XCI7XG5cbmNvbnN0IHsgZW5zdXJlQm9vbGVhbiB9ID0gcmVxdWlyZShcIkAvdXRpbHMvU3RyaWN0VHlwZVwiKTtcblxuY29uc3QgTkFNRSAgICAgICAgICAgICAgICA9IFN5bWJvbChcIk5BTUVcIik7XG5jb25zdCBMQU5HVUFHRSAgICAgICAgICAgID0gU3ltYm9sKFwiTEFOR1VBR0VcIik7XG5jb25zdCBIRUFERVJfRklMRV9PTkxZICAgID0gU3ltYm9sKFwiSEVBREVSX0ZJTEVfT05MWVwiKTtcbmNvbnN0IERFRklORVMgICAgICAgICAgICAgPSBTeW1ib2woXCJERUZJTkVTXCIpO1xuY29uc3QgQ09NUElMRV9GTEFHUyAgICAgICA9IFN5bWJvbChcIkNPTVBJTEVfRkxBR1NcIik7XG5jb25zdCBGSUxFICAgICAgICAgICAgICAgID0gU3ltYm9sKFwiRklMRVwiKTtcbmNvbnN0IE9CSkVDVF9GSUxFICAgICAgICAgPSBTeW1ib2woXCJPQkpFQ1RfRklMRVwiKTtcblxuY29uc3QgX2xhbmd1YWdlRXh0ZW5zaW9ucyA9IHtcbiAgQVNNOiBbIFwiLmFzbVwiLCBcIi5zXCIgXSxcbiAgQzogICBbIFwiLmNcIiBdLFxuICBDWFg6IFtcIi5jcHBcIiwgXCIuY2NcIiwgXCIuY3h4XCIgXSxcbn07XG5cbmZ1bmN0aW9uIGlzU3VwcG9ydExhbmd1YWdlKGxhbmd1YWdlKSB7XG4gIHJldHVybiBfbGFuZ3VhZ2VFeHRlbnNpb25zLmhhc093blByb3BlcnR5KGxhbmd1YWdlKTtcbn1cblxuZnVuY3Rpb24gZ2V0RmlsZUxhbmd1YWdlKGZpbGVuYW1lKSB7XG4gIGNvbnN0IGZpbGVuYW1lTG93ZXJDYXNlID0gZmlsZW5hbWUudG9TdHJpbmcoKS50b0xvd2VyQ2FzZSgpO1xuICBmb3IgKGNvbnN0IFtsYW5ndWFnZSwgZXh0ZW5zaW9uc10gb2YgT2JqZWN0LmVudHJpZXMoX2xhbmd1YWdlRXh0ZW5zaW9ucykpIHtcbiAgICBmb3IgKGNvbnN0IGl0ZXIgb2YgZXh0ZW5zaW9ucykge1xuICAgICAgaWYgKGZpbGVuYW1lTG93ZXJDYXNlLmVuZHNXaXRoKGl0ZXIpKVxuICAgICAgICByZXR1cm4gbGFuZ3VhZ2U7XG4gICAgfVxuICB9XG4gIHJldHVybiBcIlwiO1xufVxuXG5mdW5jdGlvbiBtYWtlTGFuZ3VhZ2UodmFsdWUpIHtcbiAgaWYgKGlzU3VwcG9ydExhbmd1YWdlKHZhbHVlKSlcbiAgICByZXR1cm4gdmFsdWU7XG4gIHRocm93IG5ldyBFcnJvcihgTGFuZ3VhZ2UgXCIke3ZhbHVlfVwiIGlzIG5vdCBzdXBwb3J0ZWRgKTtcbn1cblxuZnVuY3Rpb24gU291cmNlRmlsZShzY29wZSwgZmlsZW5hbWUpIHtcbiAgdGhpc1tOQU1FXSA9IGZpbGVuYW1lLnRvU3RyaW5nKCk7XG4gIGNvbnN0IGZuYW1lID0gc2NvcGUuU09VUkNFX0RJUi5yZXNvbHZlKGZpbGVuYW1lKTtcblxuICBjb25zdCBsYW5ndWFnZSA9IGdldEZpbGVMYW5ndWFnZShmbmFtZSk7XG4gIHRoaXNbTEFOR1VBR0VdID0gbGFuZ3VhZ2U7XG4gIHRoaXNbSEVBREVSX0ZJTEVfT05MWV0gPSAhbGFuZ3VhZ2U7XG4gIHRoaXNbRklMRV0gPSBmbmFtZTtcbiAgdGhpc1tPQkpFQ1RfRklMRV0gPSBudWxsO1xuICB0aGlzW0RFRklORVNdID0gW107XG4gIHRoaXNbQ09NUElMRV9GTEFHU10gPSAhbGFuZ3VhZ2UgPyBbXSA6IFtcbiAgICAuLi5zY29wZVtsYW5ndWFnZSArIFwiX0ZMQUdTXCJdLFxuICAgIC4uLnNjb3BlW2xhbmd1YWdlICsgXCJfRkxBR1NfXCIgKyBzY29wZS5CVUlMRF9UWVBFLnRvVXBwZXJDYXNlKCldLFxuICBdO1xufVxuXG5Tb3VyY2VGaWxlLmNyZWF0ZSA9ICh0YXJnZXQsIGZpbGVuYW1lKSA9PiB7XG4gIHJldHVybiBPYmplY3Quc2VhbChuZXcgU291cmNlRmlsZSh0YXJnZXQsIGZpbGVuYW1lKSk7XG59XG5cblNvdXJjZUZpbGUucHJvdG90eXBlID0gT2JqZWN0LmNyZWF0ZShPYmplY3QucHJvdG90eXBlLCB7XG4gIGNvbnN0cnVjdG9yOiB7XG4gICAgdmFsdWU6IFNvdXJjZUZpbGUsXG4gICAgZW51bWVyYWJsZTogZmFsc2UsXG4gIH0sXG4gIE5BTUU6IHtcbiAgICBnZXQgKCkgeyByZXR1cm4gdGhpc1tOQU1FXTsgfSxcbiAgICBlbnVtZXJhYmxlOiB0cnVlLFxuICB9LFxuICBMQU5HVUFHRToge1xuICAgIGdldCAoKSB7IHJldHVybiB0aGlzW0xBTkdVQUdFXTsgfSxcbiAgICBlbnVtZXJhYmxlOiB0cnVlLFxuICB9LFxuICBIRUFERVJfRklMRV9PTkxZOiB7XG4gICAgZ2V0KCkgeyByZXR1cm4gdGhpc1tIRUFERVJfRklMRV9PTkxZXTsgfSxcbiAgICBzZXQodmFsdWUpIHsgdGhpc1tIRUFERVJfRklMRV9PTkxZXSA9IGVuc3VyZUJvb2xlYW4odmFsdWUpOyB9LFxuICAgIGVudW1lcmFibGU6IHRydWUsXG4gIH0sXG4gIERFRklORVM6IHtcbiAgICBnZXQoKSB7IHJldHVybiB0aGlzW0RFRklORVNdOyB9LFxuICAgIGVudW1lcmFibGU6IHRydWUsXG4gIH0sXG4gIENPTVBJTEVfRkxBR1M6IHtcbiAgICBnZXQoKSB7IHJldHVybiB0aGlzW0NPTVBJTEVfRkxBR1NdOyB9LFxuICAgIGVudW1lcmFibGU6IHRydWUsXG4gIH0sXG4gIEZJTEU6IHtcbiAgICBnZXQoKSB7IHJldHVybiB0aGlzW0ZJTEVdOyB9LFxuICAgIGVudW1lcmFibGU6IHRydWUsXG4gIH0sXG4gIEZJTEVfRElSOiB7XG4gICAgZ2V0KCkgeyByZXR1cm4gdGhpc1tGSUxFXS5kaXJuYW1lKCk7IH0sXG4gICAgZW51bWVyYWJsZTogdHJ1ZSxcbiAgfSxcbiAgRklMRV9OQU1FOiB7XG4gICAgZ2V0KCkgeyByZXR1cm4gdGhpc1tGSUxFXS5iYXNlbmFtZSgpOyB9LFxuICAgIGVudW1lcmFibGU6IHRydWUsXG4gIH0sXG4gIE9CSkVDVF9GSUxFOiB7XG4gICAgZ2V0KCkgeyByZXR1cm4gdGhpc1tPQkpFQ1RfRklMRV07IH0sXG4gICAgc2V0KHZhbHVlKSB7IHRoaXNbT0JKRUNUX0ZJTEVdID0gdmFsdWU7IH0sXG4gICAgZW51bWVyYWJsZTogdHJ1ZSxcbiAgfSxcbiAgT0JKRUNUX0ZJTEVfRElSOiB7XG4gICAgZ2V0KCkgeyByZXR1cm4gdGhpc1tPQkpFQ1RfRklMRV0gPyB0aGlzW09CSkVDVF9GSUxFXS5kaXJuYW1lKCkgOiBudWxsOyB9LFxuICAgIGVudW1lcmFibGU6IHRydWUsXG4gIH0sXG4gIE9CSkVDVF9GSUxFX05BTUU6IHtcbiAgICBnZXQoKSB7IHJldHVybiB0aGlzW09CSkVDVF9GSUxFXSA/IHRoaXNbT0JKRUNUX0ZJTEVdLmJhc2VuYW1lKCkgOiBudWxsOyB9LFxuICAgIGVudW1lcmFibGU6IHRydWUsXG4gIH0sXG59KTtcblxuU291cmNlRmlsZS5wcm90b3R5cGUudG9KU09OID0gZnVuY3Rpb24oKSB7XG4gIGNvbnN0IGpzb24gPSB7fTtcbiAgZm9yIChjb25zdCBrZXkgaW4gdGhpcylcbiAgICBqc29uW2tleV0gPSB0aGlzW2tleV07XG4gIHJldHVybiBqc29uO1xufVxuXG5tb2R1bGUuZXhwb3J0cyA9IHtcbiAgU291cmNlRmlsZSxcbn07XG4iLCJcInVzZSBzdHJpY3RcIjtcblxuY29uc3QgeyBTb3VyY2VGaWxlIH0gPSByZXF1aXJlKFwiQC9iaXRtYWtlL1NvdXJjZUZpbGUuanNcIik7XG5cbmNvbnN0IFNPVVJDRVMgPSBTeW1ib2woXCJTT1VSQ0VTXCIpO1xuXG5mdW5jdGlvbiBTb3VyY2VGaWxlTGlzdChzY29wZSwgc291cmNlcykge1xuICB0aGlzW1NPVVJDRVNdID0gW107XG4gIGZvciAoY29uc3QgaXRlciBvZiBzb3VyY2VzKSB7XG4gICAgaWYgKCEoaXRlciBpbnN0YW5jZW9mIFNvdXJjZUZpbGUpKVxuICAgICAgdGhyb3cgbmV3IEVycm9yKGBJdGVtICR7aXRlcn0gaXMgbm90IFNvdXJjZUZpbGVgKTtcbiAgICB0aGlzW1NPVVJDRVNdLnB1c2goaXRlcik7XG4gIH1cbn1cblxuU291cmNlRmlsZUxpc3QucHJvdG90eXBlID0gT2JqZWN0LmNyZWF0ZShPYmplY3QucHJvdG90eXBlLCB7XG4gIGNvbnN0cnVjdG9yOiB7XG4gICAgdmFsdWU6IFNvdXJjZUZpbGUsXG4gICAgZW51bWVyYWJsZTogZmFsc2UsXG4gIH0sXG59KTtcblxuU291cmNlRmlsZUxpc3QucHJvdG90eXBlLmFkZERlZmluaXRpb25zID0gZnVuY3Rpb24oLi4uZGVmaW5pdGlvbnMpIHtcbiAgZm9yIChjb25zdCBpdGVyIG9mIGRlZmluaXRpb25zLmZsYXQoKSlcbiAgICB0aGlzW1NPVVJDRVNdLmZvckVhY2goaSA9PiBpLkRFRklORVMucHVzaChpdGVyKSk7XG59XG5cblNvdXJjZUZpbGVMaXN0LnByb3RvdHlwZS5hZGRDb21waWxlRmxhZ3MgPSBmdW5jdGlvbiguLi5mbGFncykge1xuICBmb3IgKGNvbnN0IGl0ZXIgb2YgZmxhZ3MuZmxhdCgpKVxuICAgIHRoaXNbU09VUkNFU10uZm9yRWFjaChpID0+IGkuQ09NUElMRV9GTEFHUy5wdXNoKGl0ZXIpKTtcbn1cblxuU291cmNlRmlsZUxpc3QucHJvdG90eXBlLnNvdXJjZUF0ID0gZnVuY3Rpb24oaW5kZXgpIHtcbiAgcmV0dXJuIHRoaXNbU09VUkNFU11baW5kZXhdO1xufVxuXG5Tb3VyY2VGaWxlTGlzdC5wcm90b3R5cGUuc291cmNlQ291bnQgPSBmdW5jdGlvbihpbmRleCkge1xuICByZXR1cm4gdGhpc1tTT1VSQ0VTXS5sZW5ndGg7XG59XG5cblNvdXJjZUZpbGVMaXN0LnByb3RvdHlwZS50b0pTT04gPSBmdW5jdGlvbigpIHtcbiAgcmV0dXJuIHRoaXNbU09VUkNFU107XG59XG5cblNvdXJjZUZpbGVMaXN0LmNyZWF0ZSA9IGZ1bmN0aW9uKHNjb3BlLCBzb3VyY2VzKSB7XG4gIHJldHVybiBPYmplY3Quc2VhbChuZXcgU291cmNlRmlsZUxpc3Qoc2NvcGUsIHNvdXJjZXMpKTtcbn1cblxubW9kdWxlLmV4cG9ydHMgPSB7XG4gIFNvdXJjZUZpbGVMaXN0LFxufTtcbiIsImNvbnN0IGZzID0gcmVxdWlyZShcIm5vZGU6ZnNcIik7XG5jb25zdCBwYXRoID0gcmVxdWlyZShcIm5vZGU6cGF0aFwiKTtcblxubW9kdWxlLmV4cG9ydHMgPSAocGFyYW1zKSA9PiB7XG4gIGNvbnN0IGNvbnRlbnQgPSBmcy5yZWFkRmlsZVN5bmMocGFyYW1zLmlucHV0LCBcInV0Zi04XCIpO1xuICBjb25zdCBuZXdDb250ZW50ID0gY29udGVudC5yZXBsYWNlKC9AKFtfQS1aYS16XVtfQS1aYS16MC05XSspQC9nLCAobWF0Y2gsIHZhbHVlKSA9PiB7XG4gICAgY29uc3QgcmVzID0gcGFyYW1zW3ZhbHVlXSB8fCBcIlwiO1xuICAgIGlmIChBcnJheS5pc0FycmF5KHJlcykpXG4gICAgICByZXR1cm4gcmVzLmpvaW4oXCJcXG5cIik7XG4gICAgcmV0dXJuIHJlcy50b1N0cmluZygpO1xuICB9KTtcbiAgZnMubWtkaXJTeW5jKHBhdGguZGlybmFtZShwYXJhbXMub3V0cHV0KSwgeyByZWN1cnNpdmU6IHRydWUgfSk7XG4gIGZzLndyaXRlRmlsZVN5bmMocGFyYW1zLm91dHB1dCwgbmV3Q29udGVudCwgXCJ1dGYtOFwiKTtcbn1cbiIsImNvbnN0IGZzID0gcmVxdWlyZShcIm5vZGU6ZnNcIik7XG5jb25zdCBwYXRoID0gcmVxdWlyZShcIm5vZGU6cGF0aFwiKTtcblxubW9kdWxlLmV4cG9ydHMgPSAoe3NyYywgZGVzdH0pID0+IHtcbiAgY29uc29sZS5sb2coXCJJbnN0YWxsaW5nOiBcIiArIGRlc3QpO1xuICBmcy5ta2RpclN5bmMocGF0aC5kaXJuYW1lKGRlc3QpLCB7IHJlY3Vyc2l2ZTogdHJ1ZSB9KTtcbiAgZnMuY3BTeW5jKHNyYywgZGVzdCwgeyBmb3JjZTogdHJ1ZSB9KTtcbn1cbiIsIlwidXNlIHN0cmljdFwiO1xuXG5jb25zdCB7IGVuc3VyZUJvb2xlYW4sIGVuc3VyZVN0cmluZyB9ID0gcmVxdWlyZShcIkAvdXRpbHMvU3RyaWN0VHlwZVwiKTtcbmNvbnN0IHsgRGlyUGF0aCB9ID0gcmVxdWlyZShcIkAvY29yZS9QYXRoXCIpO1xuXG5jb25zdCBERUZJTkVfTUFQICAgICAgICAgICAgPSBTeW1ib2woXCJERUZJTkVfTUFQXCIpO1xuXG5jb25zdCBQUk9KRUNUX1NPVVJDRV9ESVIgICAgPSBTeW1ib2woXCJQUk9KRUNUX1NPVVJDRV9ESVJcIik7XG5jb25zdCBQUk9KRUNUX0JJTkFSWV9ESVIgICAgPSBTeW1ib2woXCJQUk9KRUNUX0JJTkFSWV9ESVJcIik7XG5jb25zdCBERVNURElSICAgICAgICAgICAgICAgPSBTeW1ib2woXCJERVNURElSXCIpO1xuY29uc3QgSU5TVEFMTF9QUkVGSVggICAgICAgID0gU3ltYm9sKFwiSU5TVEFMTF9QUkVGSVhcIik7XG5jb25zdCBTQ1JJUFRfRklMRSAgICAgICAgICAgPSBTeW1ib2woXCJTQ1JJUFRfRklMRVwiKTtcbmNvbnN0IFNDUklQVF9ESVIgICAgICAgICAgICA9IFN5bWJvbChcIlNDUklQVF9ESVJcIik7XG5jb25zdCBQQUNLQUdFX0ZJTEUgICAgICAgICAgPSBTeW1ib2woXCJQQUNLQUdFX0ZJTEVcIik7XG5jb25zdCBDQUNIRV9GSUxFICAgICAgICAgICAgPSBTeW1ib2woXCJDQUNIRV9GSUxFXCIpO1xuY29uc3QgU09VUkNFX0RJUiAgICAgICAgICAgID0gU3ltYm9sKFwiU09VUkNFX0RJUlwiKTtcbmNvbnN0IEJJTkFSWV9ESVIgICAgICAgICAgICA9IFN5bWJvbChcIkJJTkFSWV9ESVJcIik7XG5jb25zdCBNT0RVTEVfUEFUSCAgICAgICAgICAgPSBTeW1ib2woXCJNT0RVTEVfUEFUSFwiKTtcbmNvbnN0IElOQ0xVREVTICAgICAgICAgICAgICA9IFN5bWJvbChcIklOQ0xVREVTXCIpO1xuY29uc3QgQVNNX0NPTVBJTEVSICAgICAgICAgID0gU3ltYm9sKFwiQVNNX0NPTVBJTEVSXCIpO1xuY29uc3QgQVNNX0ZMQUdTICAgICAgICAgICAgID0gU3ltYm9sKFwiQVNNX0ZMQUdTXCIpO1xuY29uc3QgQVNNX0ZMQUdTX0RFQlVHICAgICAgID0gU3ltYm9sKFwiQVNNX0ZMQUdTX0RFQlVHXCIpO1xuY29uc3QgQVNNX0ZMQUdTX1JFTEVBU0UgICAgID0gU3ltYm9sKFwiQVNNX0ZMQUdTX1JFTEVBU0VcIik7XG5jb25zdCBDX0NPTVBJTEVSICAgICAgICAgICAgPSBTeW1ib2woXCJDX0NPTVBJTEVSXCIpO1xuY29uc3QgQ19GTEFHUyAgICAgICAgICAgICAgID0gU3ltYm9sKFwiQ19GTEFHU1wiKTtcbmNvbnN0IENfRkxBR1NfREVCVUcgICAgICAgICA9IFN5bWJvbChcIkNfRkxBR1NfREVCVUdcIik7XG5jb25zdCBDX0ZMQUdTX1JFTEVBU0UgICAgICAgPSBTeW1ib2woXCJDX0ZMQUdTX1JFTEVBU0VcIik7XG5jb25zdCBDWFhfQ09NUElMRVIgICAgICAgICAgPSBTeW1ib2woXCJDWFhfQ09NUElMRVJcIik7XG5jb25zdCBDWFhfRkxBR1MgICAgICAgICAgICAgPSBTeW1ib2woXCJDWFhfRkxBR1NcIik7XG5jb25zdCBDWFhfRkxBR1NfREVCVUcgICAgICAgPSBTeW1ib2woXCJDWFhfRkxBR1NfREVCVUdcIik7XG5jb25zdCBDWFhfRkxBR1NfUkVMRUFTRSAgICAgPSBTeW1ib2woXCJDWFhfRkxBR1NfUkVMRUFTRVwiKTtcbmNvbnN0IEFSICAgICAgICAgICAgICAgICAgICA9IFN5bWJvbChcIkFSXCIpO1xuY29uc3QgUkFOTElCICAgICAgICAgICAgICAgID0gU3ltYm9sKFwiUkFOTElCXCIpO1xuY29uc3QgTElOS0VSICAgICAgICAgICAgICAgID0gU3ltYm9sKFwiTElOS0VSXCIpO1xuY29uc3QgTk0gICAgICAgICAgICAgICAgICAgID0gU3ltYm9sKFwiTk1cIik7XG5jb25zdCBPQkpDT1BZICAgICAgICAgICAgICAgPSBTeW1ib2woXCJPQkpDT1BZXCIpO1xuY29uc3QgT0JKRFVNUCAgICAgICAgICAgICAgID0gU3ltYm9sKFwiT0JKRFVNUFwiKTtcbmNvbnN0IFNUUklQICAgICAgICAgICAgICAgICA9IFN5bWJvbChcIlNUUklQXCIpO1xuY29uc3QgT0JKRUNUX0xJQlJBUllfUFJFRklYID0gU3ltYm9sKFwiT0JKRUNUX0xJQlJBUllfUFJFRklYXCIpO1xuY29uc3QgT0JKRUNUX0xJQlJBUllfU1VGRklYID0gU3ltYm9sKFwiT0JKRUNUX0xJQlJBUllfU1VGRklYXCIpO1xuY29uc3QgT0JKRUNUX0xJTktFUl9GTEFHUyAgID0gU3ltYm9sKFwiT0JKRUNUX0xJTktFUl9GTEFHU1wiKTtcbmNvbnN0IFNUQVRJQ19MSUJSQVJZX1BSRUZJWCA9IFN5bWJvbChcIlNUQVRJQ19MSUJSQVJZX1BSRUZJWFwiKTtcbmNvbnN0IFNUQVRJQ19MSUJSQVJZX1NVRkZJWCA9IFN5bWJvbChcIlNUQVRJQ19MSUJSQVJZX1NVRkZJWFwiKTtcbmNvbnN0IFNUQVRJQ19MSU5LRVJfRkxBR1MgICA9IFN5bWJvbChcIlNUQVRJQ19MSU5LRVJfRkxBR1NcIik7XG5jb25zdCBTSEFSRURfTElCUkFSWV9QUkVGSVggPSBTeW1ib2woXCJTSEFSRURfTElCUkFSWV9QUkVGSVhcIik7XG5jb25zdCBTSEFSRURfTElCUkFSWV9TVUZGSVggPSBTeW1ib2woXCJTSEFSRURfTElCUkFSWV9TVUZGSVhcIik7XG5jb25zdCBTSEFSRURfTElOS0VSX0ZMQUdTICAgPSBTeW1ib2woXCJTSEFSRURfTElOS0VSX0ZMQUdTXCIpO1xuY29uc3QgRVhFQ1VUQUJMRV9TVUZGSVggICAgID0gU3ltYm9sKFwiRVhFQ1VUQUJMRV9TVUZGSVhcIik7XG5jb25zdCBFWEVfTElOS0VSX0ZMQUdTICAgICAgPSBTeW1ib2woXCJFWEVfTElOS0VSX0ZMQUdTXCIpO1xuXG5mdW5jdGlvbiBTeXN0ZW1WYXJpYWJsZXMoKSB7XG4gIHRoaXNbUFJPSkVDVF9TT1VSQ0VfRElSXSAgICA9IG51bGw7XG4gIHRoaXNbUFJPSkVDVF9CSU5BUllfRElSXSAgICA9IG51bGw7XG4gIHRoaXNbREVTVERJUl0gICAgICAgICAgICAgICA9IG51bGw7XG4gIHRoaXNbSU5TVEFMTF9QUkVGSVhdICAgICAgICA9IERpclBhdGguY3JlYXRlKFwiL3VzclwiKTtcbiAgdGhpc1tTQ1JJUFRfRklMRV0gICAgICAgICAgID0gbnVsbDtcbiAgdGhpc1tTQ1JJUFRfRElSXSAgICAgICAgICAgID0gbnVsbDtcbiAgdGhpc1tQQUNLQUdFX0ZJTEVdICAgICAgICAgID0gbnVsbDtcbiAgdGhpc1tDQUNIRV9GSUxFXSAgICAgICAgICAgID0gbnVsbDtcbiAgdGhpc1tTT1VSQ0VfRElSXSAgICAgICAgICAgID0gdGhpc1tQUk9KRUNUX1NPVVJDRV9ESVJdO1xuICB0aGlzW0JJTkFSWV9ESVJdICAgICAgICAgICAgPSB0aGlzW1BST0pFQ1RfQklOQVJZX0RJUl07XG4gIHRoaXNbTU9EVUxFX1BBVEhdICAgICAgICAgICA9IFtdO1xuICB0aGlzW0lOQ0xVREVTXSAgICAgICAgICAgICAgPSBbXTtcbiAgdGhpc1tBU01fQ09NUElMRVJdICAgICAgICAgID0gXCJjbGFuZ1wiO1xuICB0aGlzW0FTTV9GTEFHU10gICAgICAgICAgICAgPSBbXTtcbiAgdGhpc1tBU01fRkxBR1NfREVCVUddICAgICAgID0gWyBcIi1nXCIgXTtcbiAgdGhpc1tBU01fRkxBR1NfUkVMRUFTRV0gICAgID0gWyBcIi1PM1wiLCBcIi1ETkRFQlVHXCIgXTtcbiAgdGhpc1tDX0NPTVBJTEVSXSAgICAgICAgICAgID0gXCJjbGFuZ1wiO1xuICB0aGlzW0NfRkxBR1NdICAgICAgICAgICAgICAgPSBbXTtcbiAgdGhpc1tDX0ZMQUdTX0RFQlVHXSAgICAgICAgID0gWyBcIi1nXCIgXTtcbiAgdGhpc1tDX0ZMQUdTX1JFTEVBU0VdICAgICAgID0gWyBcIi1PM1wiLCBcIi1ETkRFQlVHXCIgXTtcbiAgdGhpc1tDWFhfQ09NUElMRVJdICAgICAgICAgID0gXCJjbGFuZysrXCI7XG4gIHRoaXNbQ1hYX0ZMQUdTXSAgICAgICAgICAgICA9IFtdO1xuICB0aGlzW0NYWF9GTEFHU19ERUJVR10gICAgICAgPSBbIFwiLWdcIiBdO1xuICB0aGlzW0NYWF9GTEFHU19SRUxFQVNFXSAgICAgPSBbIFwiLU8zXCIsIFwiLUROREVCVUdcIiBdO1xuICB0aGlzW0FSXSAgICAgICAgICAgICAgICAgICAgPSBcImxsdm0tYXJcIjtcbiAgdGhpc1tSQU5MSUJdICAgICAgICAgICAgICAgID0gXCJsbHZtLXJhbmxpYlwiO1xuICB0aGlzW0xJTktFUl0gICAgICAgICAgICAgICAgPSBcIndhc20tbGRcIjtcbiAgdGhpc1tOTV0gICAgICAgICAgICAgICAgICAgID0gXCJsbHZtLW5tXCI7XG4gIHRoaXNbT0JKQ09QWV0gICAgICAgICAgICAgICA9IFwibGx2bS1vYmpjb3B5XCI7XG4gIHRoaXNbT0JKRFVNUF0gICAgICAgICAgICAgICA9IFwibGx2bS1vYmpkdW1wXCI7XG4gIHRoaXNbU1RSSVBdICAgICAgICAgICAgICAgICA9IFwibGx2bS1zdHJpcFwiO1xuICB0aGlzW09CSkVDVF9MSUJSQVJZX1BSRUZJWF0gPSBcIlwiO1xuICB0aGlzW09CSkVDVF9MSUJSQVJZX1NVRkZJWF0gPSBcIi5vXCI7XG4gIHRoaXNbT0JKRUNUX0xJTktFUl9GTEFHU10gICA9IFtdO1xuICB0aGlzW1NUQVRJQ19MSUJSQVJZX1BSRUZJWF0gPSBcImxpYlwiO1xuICB0aGlzW1NUQVRJQ19MSUJSQVJZX1NVRkZJWF0gPSBcIi5hXCI7XG4gIHRoaXNbU1RBVElDX0xJTktFUl9GTEFHU10gICA9IFtdO1xuICB0aGlzW1NIQVJFRF9MSUJSQVJZX1BSRUZJWF0gPSBcImxpYlwiO1xuICB0aGlzW1NIQVJFRF9MSUJSQVJZX1NVRkZJWF0gPSBcIi5zb1wiO1xuICB0aGlzW1NIQVJFRF9MSU5LRVJfRkxBR1NdICAgPSBbXTtcbiAgdGhpc1tFWEVDVVRBQkxFX1NVRkZJWF0gICAgID0gXCJcIjtcbiAgdGhpc1tFWEVfTElOS0VSX0ZMQUdTXSAgICAgID0gW107XG5cbiAgZm9yIChjb25zdCB7IHN5bWJvbCwgaW5pdFZhbHVlIH0gb2YgT2JqZWN0LnZhbHVlcyh0aGlzW0RFRklORV9NQVBdIHx8IHt9KSkge1xuICAgIHRoaXNbc3ltYm9sXSA9IGluaXRWYWx1ZTtcbiAgfVxufVxuXG5TeXN0ZW1WYXJpYWJsZXMuY3JlYXRlID0gZnVuY3Rpb24oKSB7XG4gIHJldHVybiBPYmplY3Quc2VhbChuZXcgU3lzdGVtVmFyaWFibGVzKTtcbn1cblxuU3lzdGVtVmFyaWFibGVzLnByb3RvdHlwZSA9IE9iamVjdC5jcmVhdGUoT2JqZWN0LnByb3RvdHlwZSwge1xuICBjb25zdHJ1Y3Rvcjoge1xuICAgIHZhbHVlOiBTeXN0ZW1WYXJpYWJsZXMsXG4gICAgZW51bWVyYWJsZTogZmFsc2UsXG4gIH0sXG4gIFBST0pFQ1RfU09VUkNFX0RJUjoge1xuICAgIGdldCAoKSB7IHJldHVybiB0aGlzW1BST0pFQ1RfU09VUkNFX0RJUl07IH0sXG4gICAgc2V0KHZhbHVlKSB7IHRoaXNbUFJPSkVDVF9TT1VSQ0VfRElSXSA9IHZhbHVlOyB9LFxuICAgIGVudW1lcmFibGU6IHRydWUsXG4gIH0sXG4gIFBST0pFQ1RfQklOQVJZX0RJUjoge1xuICAgIGdldCAoKSB7IHJldHVybiB0aGlzW1BST0pFQ1RfQklOQVJZX0RJUl07IH0sXG4gICAgc2V0KHZhbHVlKSB7IHRoaXNbUFJPSkVDVF9CSU5BUllfRElSXSA9IHZhbHVlOyB9LFxuICAgIGVudW1lcmFibGU6IHRydWUsXG4gIH0sXG4gIERFU1RESVI6IHtcbiAgICBnZXQgKCkgeyByZXR1cm4gdGhpc1tERVNURElSXTsgfSxcbiAgICBzZXQodmFsdWUpIHsgdGhpc1tERVNURElSXSA9IHZhbHVlOyB9LFxuICAgIGVudW1lcmFibGU6IHRydWUsXG4gIH0sXG4gIElOU1RBTExfUFJFRklYOiB7XG4gICAgZ2V0ICgpIHsgcmV0dXJuIHRoaXNbSU5TVEFMTF9QUkVGSVhdOyB9LFxuICAgIHNldCh2YWx1ZSkgeyB0aGlzW0lOU1RBTExfUFJFRklYXSA9IERpclBhdGguY3JlYXRlKHZhbHVlKTsgfSxcbiAgICBlbnVtZXJhYmxlOiB0cnVlLFxuICB9LFxuICBTQ1JJUFRfRklMRToge1xuICAgIGdldCAoKSB7IHJldHVybiB0aGlzW1NDUklQVF9GSUxFXTsgfSxcbiAgICBzZXQodmFsdWUpIHsgdGhpc1tTQ1JJUFRfRklMRV0gPSB2YWx1ZTsgfSxcbiAgICBlbnVtZXJhYmxlOiB0cnVlLFxuICB9LFxuICBTQ1JJUFRfRElSOiB7XG4gICAgZ2V0ICgpIHsgcmV0dXJuIHRoaXNbU0NSSVBUX0RJUl07IH0sXG4gICAgc2V0KHZhbHVlKSB7IHRoaXNbU0NSSVBUX0RJUl0gPSB2YWx1ZTsgfSxcbiAgICBlbnVtZXJhYmxlOiB0cnVlLFxuICB9LFxuICBQQUNLQUdFX0ZJTEU6IHtcbiAgICBnZXQgKCkgeyByZXR1cm4gdGhpc1tQQUNLQUdFX0ZJTEVdOyB9LFxuICAgIHNldCh2YWx1ZSkgeyB0aGlzW1BBQ0tBR0VfRklMRV0gPSB2YWx1ZTsgfSxcbiAgICBlbnVtZXJhYmxlOiB0cnVlLFxuICB9LFxuICBDQUNIRV9GSUxFOiB7XG4gICAgZ2V0ICgpIHsgcmV0dXJuIHRoaXNbQ0FDSEVfRklMRV07IH0sXG4gICAgc2V0KHZhbHVlKSB7IHRoaXNbQ0FDSEVfRklMRV0gPSB2YWx1ZTsgfSxcbiAgICBlbnVtZXJhYmxlOiB0cnVlLFxuICB9LFxuICBTT1VSQ0VfRElSOiB7XG4gICAgZ2V0ICgpIHsgcmV0dXJuIHRoaXNbU09VUkNFX0RJUl07IH0sXG4gICAgc2V0KHZhbHVlKSB7IHRoaXNbU09VUkNFX0RJUl0gPSB2YWx1ZTsgfSxcbiAgICBlbnVtZXJhYmxlOiB0cnVlLFxuICB9LFxuICBCSU5BUllfRElSOiB7XG4gICAgZ2V0ICgpIHsgcmV0dXJuIHRoaXNbQklOQVJZX0RJUl07IH0sXG4gICAgc2V0KHZhbHVlKSB7IHRoaXNbQklOQVJZX0RJUl0gPSB2YWx1ZTsgfSxcbiAgICBlbnVtZXJhYmxlOiB0cnVlLFxuICB9LFxuICBNT0RVTEVfUEFUSDoge1xuICAgIGdldCAoKSB7IHJldHVybiB0aGlzW01PRFVMRV9QQVRIXTsgfSxcbiAgICBzZXQodmFsdWUpIHsgdGhpc1tNT0RVTEVfUEFUSF0gPSB2YWx1ZTsgfSxcbiAgICBlbnVtZXJhYmxlOiB0cnVlLFxuICB9LFxuICBBU01fQ09NUElMRVI6IHtcbiAgICBnZXQgKCkgeyByZXR1cm4gdGhpc1tBU01fQ09NUElMRVJdOyB9LFxuICAgIHNldCh2YWx1ZSkgeyB0aGlzW0FTTV9DT01QSUxFUl0gPSB2YWx1ZTsgfSxcbiAgICBlbnVtZXJhYmxlOiB0cnVlLFxuICB9LFxuICBBU01fRkxBR1M6IHtcbiAgICBnZXQgKCkgeyByZXR1cm4gdGhpc1tBU01fRkxBR1NdOyB9LFxuICAgIHNldCh2YWx1ZSkgeyB0aGlzW0FTTV9GTEFHU10gPSB2YWx1ZTsgfSxcbiAgICBlbnVtZXJhYmxlOiB0cnVlLFxuICB9LFxuICBBU01fRkxBR1NfREVCVUc6IHtcbiAgICBnZXQgKCkgeyByZXR1cm4gdGhpc1tBU01fRkxBR1NfREVCVUddOyB9LFxuICAgIHNldCh2YWx1ZSkgeyB0aGlzW0FTTV9GTEFHU19ERUJVR10gPSB2YWx1ZTsgfSxcbiAgICBlbnVtZXJhYmxlOiB0cnVlLFxuICB9LFxuICBBU01fRkxBR1NfUkVMRUFTRToge1xuICAgIGdldCAoKSB7IHJldHVybiB0aGlzW0FTTV9GTEFHU19SRUxFQVNFXTsgfSxcbiAgICBzZXQodmFsdWUpIHsgdGhpc1tBU01fRkxBR1NfUkVMRUFTRV0gPSB2YWx1ZTsgfSxcbiAgICBlbnVtZXJhYmxlOiB0cnVlLFxuICB9LFxuICBDX0NPTVBJTEVSOiB7XG4gICAgZ2V0ICgpIHsgcmV0dXJuIHRoaXNbQ19DT01QSUxFUl07IH0sXG4gICAgc2V0KHZhbHVlKSB7IHRoaXNbQ19DT01QSUxFUl0gPSB2YWx1ZTsgfSxcbiAgICBlbnVtZXJhYmxlOiB0cnVlLFxuICB9LFxuICBDX0ZMQUdTOiB7XG4gICAgZ2V0ICgpIHsgcmV0dXJuIHRoaXNbQ19GTEFHU107IH0sXG4gICAgc2V0KHZhbHVlKSB7IHRoaXNbQ19GTEFHU10gPSB2YWx1ZTsgfSxcbiAgICBlbnVtZXJhYmxlOiB0cnVlLFxuICB9LFxuICBDX0ZMQUdTX0RFQlVHOiB7XG4gICAgZ2V0ICgpIHsgcmV0dXJuIHRoaXNbQ19GTEFHU19ERUJVR107IH0sXG4gICAgc2V0KHZhbHVlKSB7IHRoaXNbQ19GTEFHU19ERUJVR10gPSB2YWx1ZTsgfSxcbiAgICBlbnVtZXJhYmxlOiB0cnVlLFxuICB9LFxuICBDX0ZMQUdTX1JFTEVBU0U6IHtcbiAgICBnZXQgKCkgeyByZXR1cm4gdGhpc1tDX0ZMQUdTX1JFTEVBU0VdOyB9LFxuICAgIHNldCh2YWx1ZSkgeyB0aGlzW0NfRkxBR1NfUkVMRUFTRV0gPSB2YWx1ZTsgfSxcbiAgICBlbnVtZXJhYmxlOiB0cnVlLFxuICB9LFxuICBDWFhfQ09NUElMRVI6IHtcbiAgICBnZXQgKCkgeyByZXR1cm4gdGhpc1tDWFhfQ09NUElMRVJdOyB9LFxuICAgIHNldCh2YWx1ZSkgeyB0aGlzW0NYWF9DT01QSUxFUl0gPSB2YWx1ZTsgfSxcbiAgICBlbnVtZXJhYmxlOiB0cnVlLFxuICB9LFxuICBDWFhfRkxBR1M6IHtcbiAgICBnZXQgKCkgeyByZXR1cm4gdGhpc1tDWFhfRkxBR1NdOyB9LFxuICAgIHNldCh2YWx1ZSkgeyB0aGlzW0NYWF9GTEFHU10gPSB2YWx1ZTsgfSxcbiAgICBlbnVtZXJhYmxlOiB0cnVlLFxuICB9LFxuICBDWFhfRkxBR1NfREVCVUc6IHtcbiAgICBnZXQgKCkgeyByZXR1cm4gdGhpc1tDWFhfRkxBR1NfREVCVUddOyB9LFxuICAgIHNldCh2YWx1ZSkgeyB0aGlzW0NYWF9GTEFHU19ERUJVR10gPSB2YWx1ZTsgfSxcbiAgICBlbnVtZXJhYmxlOiB0cnVlLFxuICB9LFxuICBDWFhfRkxBR1NfUkVMRUFTRToge1xuICAgIGdldCAoKSB7IHJldHVybiB0aGlzW0NYWF9GTEFHU19SRUxFQVNFXTsgfSxcbiAgICBzZXQodmFsdWUpIHsgdGhpc1tDWFhfRkxBR1NfUkVMRUFTRV0gPSB2YWx1ZTsgfSxcbiAgICBlbnVtZXJhYmxlOiB0cnVlLFxuICB9LFxuICBBUjoge1xuICAgIGdldCAoKSB7IHJldHVybiB0aGlzW0FSXTsgfSxcbiAgICBzZXQodmFsdWUpIHsgdGhpc1tBUl0gPSB2YWx1ZTsgfSxcbiAgICBlbnVtZXJhYmxlOiB0cnVlLFxuICB9LFxuICBSQU5MSUI6IHtcbiAgICBnZXQgKCkgeyByZXR1cm4gdGhpc1tSQU5MSUJdOyB9LFxuICAgIHNldCh2YWx1ZSkgeyB0aGlzW1JBTkxJQl0gPSB2YWx1ZTsgfSxcbiAgICBlbnVtZXJhYmxlOiB0cnVlLFxuICB9LFxuICBMSU5LRVI6IHtcbiAgICBnZXQgKCkgeyByZXR1cm4gdGhpc1tMSU5LRVJdOyB9LFxuICAgIHNldCh2YWx1ZSkgeyB0aGlzW0xJTktFUl0gPSB2YWx1ZTsgfSxcbiAgICBlbnVtZXJhYmxlOiB0cnVlLFxuICB9LFxuICBOTToge1xuICAgIGdldCAoKSB7IHJldHVybiB0aGlzW05NXTsgfSxcbiAgICBzZXQodmFsdWUpIHsgdGhpc1tOTV0gPSB2YWx1ZTsgfSxcbiAgICBlbnVtZXJhYmxlOiB0cnVlLFxuICB9LFxuICBPQkpDT1BZOiB7XG4gICAgZ2V0ICgpIHsgcmV0dXJuIHRoaXNbT0JKQ09QWV07IH0sXG4gICAgc2V0KHZhbHVlKSB7IHRoaXNbT0JKQ09QWV0gPSB2YWx1ZTsgfSxcbiAgICBlbnVtZXJhYmxlOiB0cnVlLFxuICB9LFxuICBPQkpEVU1QOiB7XG4gICAgZ2V0ICgpIHsgcmV0dXJuIHRoaXNbT0JKRFVNUF07IH0sXG4gICAgc2V0KHZhbHVlKSB7IHRoaXNbT0JKRFVNUF0gPSB2YWx1ZTsgfSxcbiAgICBlbnVtZXJhYmxlOiB0cnVlLFxuICB9LFxuICBTVFJJUDoge1xuICAgIGdldCAoKSB7IHJldHVybiB0aGlzW1NUUklQXTsgfSxcbiAgICBzZXQodmFsdWUpIHsgdGhpc1tTVFJJUF0gPSB2YWx1ZTsgfSxcbiAgICBlbnVtZXJhYmxlOiB0cnVlLFxuICB9LFxuICBJTkNMVURFUzoge1xuICAgIGdldCAoKSB7IHJldHVybiB0aGlzW0lOQ0xVREVTXTsgfSxcbiAgICBzZXQodmFsdWUpIHsgdGhpc1tJTkNMVURFU10gPSB2YWx1ZTsgfSxcbiAgICBlbnVtZXJhYmxlOiB0cnVlLFxuICB9LFxuICBPQkpFQ1RfTElCUkFSWV9QUkVGSVg6IHtcbiAgICBnZXQgKCkgeyByZXR1cm4gdGhpc1tPQkpFQ1RfTElCUkFSWV9QUkVGSVhdOyB9LFxuICAgIHNldCh2YWx1ZSkgeyB0aGlzW09CSkVDVF9MSUJSQVJZX1BSRUZJWF0gPSB2YWx1ZTsgfSxcbiAgICBlbnVtZXJhYmxlOiB0cnVlLFxuICB9LFxuICBPQkpFQ1RfTElCUkFSWV9TVUZGSVg6IHtcbiAgICBnZXQgKCkgeyByZXR1cm4gdGhpc1tPQkpFQ1RfTElCUkFSWV9TVUZGSVhdOyB9LFxuICAgIHNldCh2YWx1ZSkgeyB0aGlzW09CSkVDVF9MSUJSQVJZX1NVRkZJWF0gPSB2YWx1ZTsgfSxcbiAgICBlbnVtZXJhYmxlOiB0cnVlLFxuICB9LFxuICBPQkpFQ1RfTElOS0VSX0ZMQUdTOiB7XG4gICAgZ2V0KCkgeyByZXR1cm4gdGhpc1tPQkpFQ1RfTElOS0VSX0ZMQUdTXTsgfSxcbiAgICBzZXQodmFsdWUpIHsgdGhpc1tPQkpFQ1RfTElOS0VSX0ZMQUdTXSA9IHZhbHVlOyB9LFxuICAgIGVudW1lcmFibGU6IHRydWUsXG4gIH0sXG4gIFNUQVRJQ19MSUJSQVJZX1BSRUZJWDoge1xuICAgIGdldCAoKSB7IHJldHVybiB0aGlzW1NUQVRJQ19MSUJSQVJZX1BSRUZJWF07IH0sXG4gICAgc2V0KHZhbHVlKSB7IHRoaXNbU1RBVElDX0xJQlJBUllfUFJFRklYXSA9IHZhbHVlOyB9LFxuICAgIGVudW1lcmFibGU6IHRydWUsXG4gIH0sXG4gIFNUQVRJQ19MSUJSQVJZX1NVRkZJWDoge1xuICAgIGdldCAoKSB7IHJldHVybiB0aGlzW1NUQVRJQ19MSUJSQVJZX1NVRkZJWF07IH0sXG4gICAgc2V0KHZhbHVlKSB7IHRoaXNbU1RBVElDX0xJQlJBUllfU1VGRklYXSA9IHZhbHVlOyB9LFxuICAgIGVudW1lcmFibGU6IHRydWUsXG4gIH0sXG4gIFNUQVRJQ19MSU5LRVJfRkxBR1M6IHtcbiAgICBnZXQoKSB7IHJldHVybiB0aGlzW1NUQVRJQ19MSU5LRVJfRkxBR1NdOyB9LFxuICAgIHNldCh2YWx1ZSkgeyB0aGlzW1NUQVRJQ19MSU5LRVJfRkxBR1NdID0gdmFsdWU7IH0sXG4gICAgZW51bWVyYWJsZTogdHJ1ZSxcbiAgfSxcbiAgU0hBUkVEX0xJQlJBUllfUFJFRklYOiB7XG4gICAgZ2V0KCkgeyByZXR1cm4gdGhpc1tTSEFSRURfTElCUkFSWV9QUkVGSVhdOyB9LFxuICAgIHNldCh2YWx1ZSkgeyB0aGlzW1NIQVJFRF9MSUJSQVJZX1BSRUZJWF0gPSB2YWx1ZTsgfSxcbiAgICBlbnVtZXJhYmxlOiB0cnVlLFxuICB9LFxuICBTSEFSRURfTElCUkFSWV9TVUZGSVg6IHtcbiAgICBnZXQoKSB7IHJldHVybiB0aGlzW1NIQVJFRF9MSUJSQVJZX1NVRkZJWF07IH0sXG4gICAgc2V0KHZhbHVlKSB7IHRoaXNbU0hBUkVEX0xJQlJBUllfU1VGRklYXSA9IHZhbHVlOyB9LFxuICAgIGVudW1lcmFibGU6IHRydWUsXG4gIH0sXG4gIFNIQVJFRF9MSU5LRVJfRkxBR1M6IHtcbiAgICBnZXQoKSB7IHJldHVybiB0aGlzW1NIQVJFRF9MSU5LRVJfRkxBR1NdOyB9LFxuICAgIHNldCh2YWx1ZSkgeyB0aGlzW1NIQVJFRF9MSU5LRVJfRkxBR1NdID0gdmFsdWU7IH0sXG4gICAgZW51bWVyYWJsZTogdHJ1ZSxcbiAgfSxcbiAgRVhFQ1VUQUJMRV9TVUZGSVg6IHtcbiAgICBnZXQoKSB7IHJldHVybiB0aGlzW0VYRUNVVEFCTEVfU1VGRklYXTsgfSxcbiAgICBzZXQodmFsdWUpIHsgdGhpc1tFWEVDVVRBQkxFX1NVRkZJWF0gPSB2YWx1ZTsgfSxcbiAgICBlbnVtZXJhYmxlOiB0cnVlLFxuICB9LFxuICBFWEVfTElOS0VSX0ZMQUdTOiB7XG4gICAgZ2V0KCkgeyByZXR1cm4gdGhpc1tFWEVfTElOS0VSX0ZMQUdTXTsgfSxcbiAgICBzZXQodmFsdWUpIHsgdGhpc1tFWEVfTElOS0VSX0ZMQUdTXSA9IHZhbHVlOyB9LFxuICAgIGVudW1lcmFibGU6IHRydWUsXG4gIH0sXG59KTtcblxuU3lzdGVtVmFyaWFibGVzLmRlZmluZVZhcmlhYmxlID0gZnVuY3Rpb24oc2NvcGUsIG5hbWUsIGRlc2NyaXB0b3IpIHtcbiAgaWYgKCFzY29wZVtERUZJTkVfTUFQXSlcbiAgICBzY29wZVtERUZJTkVfTUFQXSA9IHt9O1xuXG4gIGNvbnN0IHR5cGUgPSBkZXNjcmlwdG9yLnR5cGUgfHwgdHlwZW9mIGRlc2NyaXB0b3IudmFsdWU7XG5cbiAgbGV0IGRlZmluZUVudHJ5ID0gc2NvcGVbREVGSU5FX01BUF1bbmFtZV07XG4gIGlmICghZGVmaW5lRW50cnkpIHtcbiAgICBkZWZpbmVFbnRyeSA9IHt9O1xuICAgIHNjb3BlW0RFRklORV9NQVBdW25hbWVdID0gZGVmaW5lRW50cnk7XG4gIH1cblxuICBpZiAoZGVmaW5lRW50cnkudHlwZSAhPT0gdHlwZSkge1xuICAgIGRlZmluZUVudHJ5LnN5bWJvbCA9IFN5bWJvbChuYW1lKTtcbiAgfVxuXG4gIGRlZmluZUVudHJ5LnR5cGUgPSB0eXBlO1xuICBkZWZpbmVFbnRyeS5kZXNjcmlwdGlvbiA9IGRlc2NyaXB0b3IuZGVzY3JpcHRpb24gfHwgXCJcIjtcbiAgZGVmaW5lRW50cnkuaW5pdFZhbHVlID0gZGVzY3JpcHRvci52YWx1ZTtcblxuICBsZXQgZW5zdXJlVmFsdWU7XG4gIGlmIChBcnJheS5pc0FycmF5KHR5cGUpKSB7XG4gICAgbGV0IGl0ZW1UeXBlO1xuICAgIGZvciAoY29uc3QgaXRlciBvZiB0eXBlKSB7XG4gICAgICBjb25zdCBpdCA9IHR5cGVvZiBpdGVyO1xuICAgICAgaWYgKCFpdGVtVHlwZSlcbiAgICAgICAgaXRlbVR5cGUgPSBpdDtcbiAgICAgIGVsc2UgaWYgKGl0ZW1UeXBlICE9PSBpdClcbiAgICAgICAgdGhyb3cgbmV3IEVycm9yKGBBbGwgZWxlbWVudHMgZm9yICR7bmFtZX0gbXVzdCBiZSBvZiB0aGUgc2FtZSB0eXBlYCk7XG4gICAgfVxuICAgIGlmIChpdGVtVHlwZSAhPT0gXCJib29sZWFuXCIgJiYgaXRlbVR5cGUgIT09IFwic3RyaW5nXCIpXG4gICAgICB0aHJvdyBuZXcgRXJyb3IoYFVua25vd24gJHtpdGVtVHlwZX0gZWxlbWVudCB0eXBlIG9mICR7bmFtZX0gdmFyaWFibGVgKTtcbiAgICBlbnN1cmVWYWx1ZSA9ICh2YWx1ZSkgPT4ge1xuICAgICAgaWYgKHR5cGUuaW5jbHVkZXModmFsdWUpKVxuICAgICAgICByZXR1cm4gdmFsdWU7XG4gICAgICB0aHJvdyBuZXcgRXJyb3IoYFRoZSAnJHt2YWx1ZX0nIGlzIG5vdCBhICR7dHlwZX1gKTtcbiAgICB9XG4gIH1cbiAgZWxzZSBpZiAodHlwZSA9PT0gXCJib29sZWFuXCIpXG4gICAgZW5zdXJlVmFsdWUgPSBlbnN1cmVCb29sZWFuO1xuICBlbHNlIGlmICh0eXBlID09PSBcInN0cmluZ1wiKVxuICAgIGVuc3VyZVZhbHVlID0gZW5zdXJlU3RyaW5nO1xuICBlbHNlXG4gICAgdGhyb3cgbmV3IEVycm9yKGBVbmtub3duICR7dHlwZX0gdHlwZSBvZiAke25hbWV9IHZhcmlhYmxlYCk7XG5cbiAgZW5zdXJlVmFsdWUoZGVmaW5lRW50cnkuaW5pdFZhbHVlKTtcblxuICBjb25zdCB7IHN5bWJvbCB9ID0gZGVmaW5lRW50cnk7XG4gIGNvbnN0IGRlc2MgPSB7XG4gICAgY29uZmlndXJhYmxlOiB0cnVlLFxuICAgIGVudW1lcmFibGU6IHRydWUsXG4gICAgZ2V0KCkgeyByZXR1cm4gdGhpc1tzeW1ib2xdIH0sXG4gICAgc2V0KHZhbHVlKSB7IHRoaXNbc3ltYm9sXSA9IGVuc3VyZVZhbHVlKHZhbHVlKSB9LFxuICB9O1xuXG4gIE9iamVjdC5kZWZpbmVQcm9wZXJ0eShzY29wZSwgbmFtZSwgZGVzYyk7XG59XG5cblN5c3RlbVZhcmlhYmxlcy5kZWZpbmVWYXJpYWJsZXMgPSBmdW5jdGlvbihzY29wZSwgZGVzY3JpcHRvcnMpIHtcbiAgZm9yIChjb25zdCBbIG5hbWUsIGRlc2NyaXB0b3IgXSBvZiBPYmplY3QuZW50cmllcyhkZXNjcmlwdG9ycykpXG4gICAgU3lzdGVtVmFyaWFibGVzLmRlZmluZVZhcmlhYmxlKHNjb3BlLCBuYW1lLCBkZXNjcmlwdG9yKTtcbn1cblxuU3lzdGVtVmFyaWFibGVzLnByb3RvdHlwZS50b0pTT04gPSBmdW5jdGlvbigpIHtcbiAgY29uc3QganNvbiA9IHt9O1xuICBmb3IgKGNvbnN0IGtleSBpbiB0aGlzKVxuICAgIGpzb25ba2V5XSA9IHRoaXNba2V5XTtcbiAgcmV0dXJuIGpzb247XG59XG5cblN5c3RlbVZhcmlhYmxlcy5wcm90b3R5cGUuY2xvbmUgPSBmdW5jdGlvbigpIHtcbiAgY29uc3QgbyA9IE9iamVjdC5jcmVhdGUoU3lzdGVtVmFyaWFibGVzLnByb3RvdHlwZSk7XG5cbiAgb1tQUk9KRUNUX1NPVVJDRV9ESVJdICAgID0gdGhpc1tQUk9KRUNUX1NPVVJDRV9ESVJdO1xuICBvW1BST0pFQ1RfQklOQVJZX0RJUl0gICAgPSB0aGlzW1BST0pFQ1RfQklOQVJZX0RJUl07XG4gIG9bREVTVERJUl0gICAgICAgICAgICAgICA9IHRoaXNbREVTVERJUl07XG4gIG9bSU5TVEFMTF9QUkVGSVhdICAgICAgICA9IHRoaXNbSU5TVEFMTF9QUkVGSVhdO1xuICBvW1NPVVJDRV9ESVJdICAgICAgICAgICAgPSB0aGlzW1NPVVJDRV9ESVJdO1xuICBvW0JJTkFSWV9ESVJdICAgICAgICAgICAgPSB0aGlzW0JJTkFSWV9ESVJdO1xuICBvW1NDUklQVF9GSUxFXSAgICAgICAgICAgPSB0aGlzW1NDUklQVF9GSUxFXTtcbiAgb1tTQ1JJUFRfRElSXSAgICAgICAgICAgID0gdGhpc1tTQ1JJUFRfRElSXTtcbiAgb1tQQUNLQUdFX0ZJTEVdICAgICAgICAgID0gdGhpc1tQQUNLQUdFX0ZJTEVdO1xuICBvW0NBQ0hFX0ZJTEVdICAgICAgICAgICAgPSB0aGlzW0NBQ0hFX0ZJTEVdO1xuICBvW01PRFVMRV9QQVRIXSAgICAgICAgICAgPSBBcnJheS5mcm9tKHRoaXNbTU9EVUxFX1BBVEhdKTtcbiAgb1tJTkNMVURFU10gICAgICAgICAgICAgID0gWyAuLi50aGlzW0lOQ0xVREVTXSBdO1xuICBvW0FTTV9DT01QSUxFUl0gICAgICAgICAgPSB0aGlzW0FTTV9DT01QSUxFUl07XG4gIG9bQVNNX0ZMQUdTXSAgICAgICAgICAgICA9IFsgLi4udGhpc1tBU01fRkxBR1NdIF07XG4gIG9bQVNNX0ZMQUdTX0RFQlVHXSAgICAgICA9IFsgLi4udGhpc1tBU01fRkxBR1NfREVCVUddIF07XG4gIG9bQVNNX0ZMQUdTX1JFTEVBU0VdICAgICA9IFsgLi4udGhpc1tBU01fRkxBR1NfUkVMRUFTRV0gXTtcbiAgb1tDX0NPTVBJTEVSXSAgICAgICAgICAgID0gdGhpc1tDX0NPTVBJTEVSXTtcbiAgb1tDX0ZMQUdTXSAgICAgICAgICAgICAgID0gWyAuLi50aGlzW0NfRkxBR1NdIF07XG4gIG9bQ19GTEFHU19ERUJVR10gICAgICAgICA9IFsgLi4udGhpc1tDX0ZMQUdTX0RFQlVHXSBdO1xuICBvW0NfRkxBR1NfUkVMRUFTRV0gICAgICAgPSBbIC4uLnRoaXNbQ19GTEFHU19SRUxFQVNFXSBdO1xuICBvW0NYWF9DT01QSUxFUl0gICAgICAgICAgPSB0aGlzW0NYWF9DT01QSUxFUl07XG4gIG9bQ1hYX0ZMQUdTXSAgICAgICAgICAgICA9IFsgLi4udGhpc1tDWFhfRkxBR1NdIF07XG4gIG9bQ1hYX0ZMQUdTX0RFQlVHXSAgICAgICA9IFsgLi4udGhpc1tDWFhfRkxBR1NfREVCVUddIF07XG4gIG9bQ1hYX0ZMQUdTX1JFTEVBU0VdICAgICA9IFsgLi4udGhpc1tDWFhfRkxBR1NfUkVMRUFTRV0gXTtcbiAgb1tBUl0gICAgICAgICAgICAgICAgICAgID0gdGhpc1tBUl07XG4gIG9bUkFOTElCXSAgICAgICAgICAgICAgICA9IHRoaXNbUkFOTElCXTtcbiAgb1tMSU5LRVJdICAgICAgICAgICAgICAgID0gdGhpc1tMSU5LRVJdO1xuICBvW05NXSAgICAgICAgICAgICAgICAgICAgPSB0aGlzW05NXTtcbiAgb1tPQkpDT1BZXSAgICAgICAgICAgICAgID0gdGhpc1tPQkpDT1BZXTtcbiAgb1tPQkpEVU1QXSAgICAgICAgICAgICAgID0gdGhpc1tPQkpEVU1QXTtcbiAgb1tTVFJJUF0gICAgICAgICAgICAgICAgID0gdGhpc1tTVFJJUF07XG4gIG9bT0JKRUNUX0xJQlJBUllfUFJFRklYXSA9IHRoaXNbT0JKRUNUX0xJQlJBUllfUFJFRklYXTtcbiAgb1tPQkpFQ1RfTElCUkFSWV9TVUZGSVhdID0gdGhpc1tPQkpFQ1RfTElCUkFSWV9TVUZGSVhdO1xuICBvW09CSkVDVF9MSU5LRVJfRkxBR1NdICAgPSBbIC4uLnRoaXNbT0JKRUNUX0xJTktFUl9GTEFHU10gXTtcbiAgb1tTVEFUSUNfTElCUkFSWV9QUkVGSVhdID0gdGhpc1tTVEFUSUNfTElCUkFSWV9QUkVGSVhdO1xuICBvW1NUQVRJQ19MSUJSQVJZX1NVRkZJWF0gPSB0aGlzW1NUQVRJQ19MSUJSQVJZX1NVRkZJWF07XG4gIG9bU1RBVElDX0xJTktFUl9GTEFHU10gICA9IFsgLi4udGhpc1tTVEFUSUNfTElOS0VSX0ZMQUdTXSBdO1xuICBvW1NIQVJFRF9MSUJSQVJZX1BSRUZJWF0gPSB0aGlzW1NIQVJFRF9MSUJSQVJZX1BSRUZJWF07XG4gIG9bU0hBUkVEX0xJQlJBUllfU1VGRklYXSA9IHRoaXNbU0hBUkVEX0xJQlJBUllfU1VGRklYXTtcbiAgb1tTSEFSRURfTElOS0VSX0ZMQUdTXSAgID0gWyAuLi50aGlzW1NIQVJFRF9MSU5LRVJfRkxBR1NdIF07XG4gIG9bRVhFQ1VUQUJMRV9TVUZGSVhdICAgICA9IHRoaXNbRVhFQ1VUQUJMRV9TVUZGSVhdO1xuICBvW0VYRV9MSU5LRVJfRkxBR1NdICAgICAgPSBbIC4uLnRoaXNbRVhFX0xJTktFUl9GTEFHU10gXTtcblxuICBmb3IgKGNvbnN0IHsgc3ltYm9sIH0gb2YgT2JqZWN0LnZhbHVlcyh0aGlzW0RFRklORV9NQVBdIHx8IHt9KSkge1xuICAgIGlmIChBcnJheS5pc0FycmF5KHRoaXNbc3ltYm9sXSkpXG4gICAgICBvW3N5bWJvbF0gPSBBcnJheS5mcm9tKHRoaXNbc3ltYm9sXSk7XG4gICAgZWxzZVxuICAgICAgb1tzeW1ib2xdID0gdGhpc1tzeW1ib2xdO1xuICB9XG5cbiAgcmV0dXJuIE9iamVjdC5zZWFsKG8pO1xufVxuXG5tb2R1bGUuZXhwb3J0cyA9IHtcbiAgU3lzdGVtVmFyaWFibGVzLFxufTtcbiIsIlwidXNlIHN0cmljdFwiO1xuXG5jb25zdCB7IGVuc3VyZVN0cmluZyB9ID0gcmVxdWlyZShcIkAvdXRpbHMvU3RyaWN0VHlwZVwiKTtcbmNvbnN0IHsgU291cmNlRmlsZSB9ID0gcmVxdWlyZShcIkAvYml0bWFrZS9Tb3VyY2VGaWxlLmpzXCIpO1xuY29uc3QgeyBTb3VyY2VGaWxlTGlzdCB9ID0gcmVxdWlyZShcIkAvYml0bWFrZS9Tb3VyY2VGaWxlTGlzdC5qc1wiKTtcbmNvbnN0IHsgSW5jbHVkZURpcmVjdG9yeSB9ID0gcmVxdWlyZShcIkAvY29yZS9JbmNsdWRlRGlyZWN0b3J5XCIpO1xuY29uc3QgeyBJbnRlcmZhY2VUYXJnZXQgfSA9IHJlcXVpcmUoXCJAL2JpdG1ha2UvSW50ZXJmYWNlVGFyZ2V0LmpzXCIpO1xuY29uc3QgeyBJbnRlcmZhY2VJbmNsdWRlcyB9ID0gcmVxdWlyZShcIi4vSW50ZXJmYWNlSW5jbHVkZXMuanNcIik7XG5jb25zdCB7IEludGVyZmFjZU9iamVjdHMgfSA9IHJlcXVpcmUoXCIuL0ludGVyZmFjZU9iamVjdHMuanNcIik7XG5jb25zdCB7IEFic29sdXRlUGF0aCB9ID0gcmVxdWlyZShcIkAvdXRpbHMvQWJzb2x1dGVQYXRoLmpzXCIpO1xuXG5jb25zdCBOQU1FICAgICAgICAgICAgICAgID0gU3ltYm9sKFwiTkFNRVwiKTtcbmNvbnN0IFRBUkdFVF9TQ09QRSAgICAgICAgPSBTeW1ib2woXCJUQVJHRVRfU0NPUEVcIik7XG5jb25zdCBPVVRQVVRfTkFNRSAgICAgICAgID0gU3ltYm9sKFwiT1VUUFVUX05BTUVcIik7XG5jb25zdCBDT01QSUxFX09QVElPTlMgICAgID0gU3ltYm9sKFwiQ09NUElMRV9PUFRJT05TXCIpO1xuY29uc3QgUFJFRklYICAgICAgICAgICAgICA9IFN5bWJvbChcIlBSRUZJWFwiKTtcbmNvbnN0IFNVRkZJWCAgICAgICAgICAgICAgPSBTeW1ib2woXCJTVUZGSVhcIik7XG5jb25zdCBMSU5LX09QVElPTlMgICAgICAgID0gU3ltYm9sKFwiTElOS19PUFRJT05TXCIpO1xuY29uc3QgSU5DTFVERVMgICAgICAgICAgICA9IFN5bWJvbChcIklOQ0xVREVTXCIpO1xuY29uc3QgREVGSU5FUyAgICAgICAgICAgICA9IFN5bWJvbChcIkRFRklORVNcIik7XG5jb25zdCBTT1VSQ0VTICAgICAgICAgICAgID0gU3ltYm9sKFwiU09VUkNFU1wiKTtcbmNvbnN0IExJQlJBUklFUyAgICAgICAgICAgPSBTeW1ib2woXCJMSUJSQVJJRVNcIik7XG5jb25zdCBQT1NJVElPTl9JTkRFUEVOREVOVF9DT0RFID0gU3ltYm9sKFwiUE9TSVRJT05fSU5ERVBFTkRFTlRfQ09ERVwiKTtcblxuXG5jb25zdCByZXNlcnZlZFRhZ2V0TmFtZXMgPSBbIFwiYWxsXCIsIFwiaW5zdGFsbFwiIF07XG5mdW5jdGlvbiBlbnN1cmVUYXJnZXROYW1lKG5hbWUpIHtcbiAgaWYgKHR5cGVvZiBuYW1lICE9PSBcInN0cmluZ1wiKVxuICAgIHRocm93IG5ldyBFcnJvcihgVGFyZ2V0IFwiJHtuYW1lfVwiIGlzIG5vdCBzdHJpbmcgdHlwZWApO1xuICBpZiAocmVzZXJ2ZWRUYWdldE5hbWVzLmluY2x1ZGVzKG5hbWUpKVxuICAgIHRocm93IG5ldyBFcnJvcihgVGFyZ2V0IFwiJHtuYW1lfVwiIGlzIHJlc2VydmVkIG5hbWVgKTtcbiAgcmV0dXJuIG5hbWU7XG59XG5cbmZ1bmN0aW9uIEJhc2VUYXJnZXQoc2NvcGUsIG5hbWUpIHtcbiAgdGhpc1tOQU1FXSA9IGVuc3VyZVRhcmdldE5hbWUobmFtZSk7XG4gIHRoaXNbVEFSR0VUX1NDT1BFXSA9IHNjb3BlLmNsb25lKCk7XG4gIHRoaXNbT1VUUFVUX05BTUVdID0gZW5zdXJlU3RyaW5nKG5hbWUpO1xuICB0aGlzW1BSRUZJWF0gPSBcIlwiO1xuICB0aGlzW1NVRkZJWF0gPSBcIlwiO1xuICB0aGlzW0NPTVBJTEVfT1BUSU9OU10gPSBbXTtcbiAgdGhpc1tMSU5LX09QVElPTlNdID0gW107XG4gIHRoaXNbU09VUkNFU10gPSBbXTtcbiAgdGhpc1tMSUJSQVJJRVNdID0gW107XG4gIHRoaXNbSU5DTFVERVNdID0gc2NvcGUuSU5DTFVERVMubWFwKFZBTFVFID0+IHsgcmV0dXJuIHtWQUxVRX0gfSk7XG4gIHRoaXNbREVGSU5FU10gPSBbXTtcbiAgdGhpc1tQT1NJVElPTl9JTkRFUEVOREVOVF9DT0RFXSA9IHNjb3BlLlBPU0lUSU9OX0lOREVQRU5ERU5UX0NPREU7XG59XG5cbkJhc2VUYXJnZXQucHJvdG90eXBlID0gT2JqZWN0LmNyZWF0ZShPYmplY3QucHJvdG90eXBlLCB7XG4gIGNvbnN0cnVjdG9yOiB7XG4gICAgdmFsdWU6IEJhc2VUYXJnZXQsXG4gICAgZW51bWVyYWJsZTogZmFsc2UsXG4gIH0sXG4gIE5BTUU6IHtcbiAgICBnZXQoKSB7IHJldHVybiB0aGlzW05BTUVdOyB9LFxuICAgIGVudW1lcmFibGU6IHRydWUsXG4gIH0sXG4gIFRBUkdFVF9TQ09QRToge1xuICAgIGdldCgpIHsgcmV0dXJuIHRoaXNbVEFSR0VUX1NDT1BFXTsgfSxcbiAgICBlbnVtZXJhYmxlOiBmYWxzZSxcbiAgfSxcbiAgT1VUUFVUX05BTUU6IHtcbiAgICBnZXQoKSB7IHJldHVybiB0aGlzW09VVFBVVF9OQU1FXTsgfSxcbiAgICBzZXQodmFsdWUpIHsgdGhpc1tPVVRQVVRfTkFNRV0gPSBlbnN1cmVTdHJpbmcodmFsdWUpOyB9LFxuICAgIGVudW1lcmFibGU6IHRydWUsXG4gIH0sXG4gIENPTVBJTEVfT1BUSU9OUzoge1xuICAgIGdldCgpIHsgcmV0dXJuIHRoaXNbQ09NUElMRV9PUFRJT05TXTsgfSxcbiAgICBlbnVtZXJhYmxlOiB0cnVlLFxuICB9LFxuICBQUkVGSVg6IHtcbiAgICBnZXQoKSB7IHJldHVybiB0aGlzW1BSRUZJWF07IH0sXG4gICAgc2V0KHZhbHVlKSB7IHRoaXNbUFJFRklYXSA9IHZhbHVlOyB9LFxuICAgIGVudW1lcmFibGU6IHRydWUsXG4gIH0sXG4gIFNVRkZJWDoge1xuICAgIGdldCgpIHsgcmV0dXJuIHRoaXNbU1VGRklYXTsgfSxcbiAgICBzZXQodmFsdWUpIHsgdGhpc1tTVUZGSVhdID0gdmFsdWU7IH0sXG4gICAgZW51bWVyYWJsZTogdHJ1ZSxcbiAgfSxcbiAgTElOS19PUFRJT05TOiB7XG4gICAgZ2V0KCkgeyByZXR1cm4gdGhpc1tMSU5LX09QVElPTlNdOyB9LFxuICAgIGVudW1lcmFibGU6IHRydWUsXG4gIH0sXG4gIElOQ0xVREVTOiB7XG4gICAgZ2V0KCkgeyByZXR1cm4gdGhpc1tJTkNMVURFU107IH0sXG4gICAgZW51bWVyYWJsZTogdHJ1ZSxcbiAgfSxcbiAgREVGSU5FUzoge1xuICAgIGdldCgpIHsgcmV0dXJuIHRoaXNbREVGSU5FU107IH0sXG4gICAgZW51bWVyYWJsZTogdHJ1ZSxcbiAgfSxcbiAgU09VUkNFUzoge1xuICAgIGdldCgpIHsgcmV0dXJuIHRoaXNbU09VUkNFU107IH0sXG4gICAgZW51bWVyYWJsZTogdHJ1ZSxcbiAgfSxcbiAgTElCUkFSSUVTOiB7XG4gICAgZ2V0KCkgeyByZXR1cm4gdGhpc1tMSUJSQVJJRVNdOyB9LFxuICAgIGVudW1lcmFibGU6IHRydWUsXG4gIH0sXG4gIEZJTEVfRElSOiB7XG4gICAgZ2V0KCkgeyByZXR1cm4gdGhpc1tUQVJHRVRfU0NPUEVdLkJJTkFSWV9ESVI7IH0sXG4gICAgZW51bWVyYWJsZTogdHJ1ZSxcbiAgfSxcbiAgRklMRV9OQU1FOiB7XG4gICAgZ2V0KCkgeyByZXR1cm4gdGhpcy5QUkVGSVggKyB0aGlzLk9VVFBVVF9OQU1FICsgdGhpcy5TVUZGSVg7IH0sXG4gICAgZW51bWVyYWJsZTogdHJ1ZSxcbiAgfSxcbiAgRklMRToge1xuICAgIGdldCgpIHsgcmV0dXJuIHRoaXMuRklMRV9ESVIuam9pbih0aGlzLkZJTEVfTkFNRSk7IH0sXG4gICAgZW51bWVyYWJsZTogdHJ1ZSxcbiAgfSxcbiAgUE9TSVRJT05fSU5ERVBFTkRFTlRfQ09ERToge1xuICAgIGdldCgpIHsgcmV0dXJuIHRoaXNbUE9TSVRJT05fSU5ERVBFTkRFTlRfQ09ERV07IH0sXG4gICAgc2V0KHZhbHVlKSB7IHRoaXNbUE9TSVRJT05fSU5ERVBFTkRFTlRfQ09ERV0gPSB2YWx1ZTsgfSxcbiAgICBlbnVtZXJhYmxlOiB0cnVlLFxuICB9LFxufSk7XG5cbkJhc2VUYXJnZXQucHJvdG90eXBlLmFkZFNvdXJjZXMgPSBmdW5jdGlvbiguLi5zb3VyY2VzKSB7XG4gIGZvciAobGV0IGl0IG9mIHNvdXJjZXMuZmxhdCgxKSkge1xuICAgIGlmICh0eXBlb2YgaXQgPT09IFwic3RyaW5nXCIgfHwgQWJzb2x1dGVQYXRoLmlzQWJzb2x1dGUoaXQpKVxuICAgICAgaXQgPSBTb3VyY2VGaWxlLmNyZWF0ZSh0aGlzW1RBUkdFVF9TQ09QRV0sIGl0KTtcbiAgICBlbHNlIGlmICghKGl0IGluc3RhbmNlb2YgSW50ZXJmYWNlT2JqZWN0cyB8fCBpdCBpbnN0YW5jZW9mIFNvdXJjZUZpbGUpKVxuICAgICAgdGhyb3cgbmV3IEVycm9yKGBOb3Qgc3VwcG9ydCBpbnN0YW5jZSAke2l0fWApO1xuXG4gICAgaWYgKGl0IGluc3RhbmNlb2YgU291cmNlRmlsZSAmJiBpdC5MQU5HVUFHRSkge1xuICAgICAgY29uc3QgcmZpbGUxID0gdGhpc1tUQVJHRVRfU0NPUEVdLkJJTkFSWV9ESVIucmVsYXRpdmUoaXQuRklMRSk7XG4gICAgICBjb25zdCByZmlsZTIgPSB0aGlzW1RBUkdFVF9TQ09QRV0uU09VUkNFX0RJUi5yZWxhdGl2ZShpdC5GSUxFKTtcbiAgICAgIGNvbnN0IHJmaWxlID0gKHJmaWxlMi5sZW5ndGggPCByZmlsZTEubGVuZ3RoID8gcmZpbGUyIDogcmZpbGUxKS5yZXBsYWNlKFwiLi4vXCIsIFwiX18vXCIpO1xuICAgICAgaXQuT0JKRUNUX0ZJTEUgPSB0aGlzW1RBUkdFVF9TQ09QRV0uQklOQVJZX0RJUi5qb2luKFwiTWFrZUZpbGVzXCIsIHRoaXNbTkFNRV0gKyBcIi5kaXJcIiwgIHJmaWxlICsgXCIub2JqXCIpO1xuICAgIH1cblxuICAgIHRoaXNbU09VUkNFU10ucHVzaChpdCk7XG4gIH1cbn1cblxuQmFzZVRhcmdldC5wcm90b3R5cGUuYWRkSW5jbHVkZXMgPSBmdW5jdGlvbiguLi5pbmNsdWRlcykge1xuICBmb3IgKGNvbnN0IGl0IG9mIGluY2x1ZGVzLmZsYXQoMSkpIHtcbiAgICBsZXQgVkFMVUU7XG4gICAgaWYgKHR5cGVvZiBpdCA9PT0gXCJzdHJpbmdcIiB8fCBBYnNvbHV0ZVBhdGguaXNBYnNvbHV0ZShpdCkpXG4gICAgICBWQUxVRSA9IEluY2x1ZGVEaXJlY3RvcnkuY3JlYXRlKGl0LCB0aGlzW1RBUkdFVF9TQ09QRV0uU09VUkNFX0RJUik7XG4gICAgZWxzZVxuICAgICAgVkFMVUUgPSBJbnRlcmZhY2VJbmNsdWRlcy5lbnN1cmVJbnN0YW5jZShpdCk7XG4gICAgdGhpc1tJTkNMVURFU10ucHVzaCh7VkFMVUV9KTsgLy8gSW5jbHVkZURpcmVjdG9yeVtdXG4gIH1cbn1cblxuQmFzZVRhcmdldC5wcm90b3R5cGUuYWRkTGlicmFyaWVzID0gZnVuY3Rpb24oLi4ubGlicmFyaWVzKSB7XG4gIGZvciAoY29uc3QgaXQgb2YgbGlicmFyaWVzLmZsYXQoMSkpIHtcbiAgICB0aGlzW0xJQlJBUklFU10ucHVzaCh7IFZBTFVFOiBJbnRlcmZhY2VUYXJnZXQuZW5zdXJlSW5zdGFuY2UoaXQpIH0pO1xuICB9XG59XG5cbkJhc2VUYXJnZXQucHJvdG90eXBlLmFkZENvbXBpbGVPcHRpb25zID0gZnVuY3Rpb24oLi4ub3B0aW9ucykge1xuICBmb3IgKGNvbnN0IGl0IG9mIG9wdGlvbnMuZmxhdCgxKSkge1xuICAgIHRoaXNbQ09NUElMRV9PUFRJT05TXS5wdXNoKHsgVkFMVUU6IGl0IH0pO1xuICB9XG59XG5cbkJhc2VUYXJnZXQucHJvdG90eXBlLmFkZExpbmtPcHRpb25zID0gZnVuY3Rpb24oLi4ub3B0aW9ucykge1xuICBmb3IgKGNvbnN0IGl0IG9mIG9wdGlvbnMuZmxhdCgxKSkge1xuICAgIHRoaXNbTElOS19PUFRJT05TXS5wdXNoKHsgVkFMVUU6IGl0IH0pO1xuICB9XG59XG5cbkJhc2VUYXJnZXQucHJvdG90eXBlLmdldFNvdXJjZUZpbGVzID0gZnVuY3Rpb24oLi4uc291cmNlcykge1xuICBjb25zdCByZXN1bHQgPSBbXTtcbiAgZm9yIChjb25zdCBpdCBvZiBzb3VyY2VzLmZsYXQoMSkpIHtcbiAgICBjb25zdCBmaWxlbmFtZSA9IHRoaXNbVEFSR0VUX1NDT1BFXS5TT1VSQ0VfRElSLnJlc29sdmUoaXQpLnRvU3RyaW5nKCk7XG4gICAgY29uc3Qgc3JjID0gdGhpc1tTT1VSQ0VTXS5maW5kKGkgPT4gaSBpbnN0YW5jZW9mIFNvdXJjZUZpbGUgJiYgaS5GSUxFLnRvU3RyaW5nKCkgPT09IGZpbGVuYW1lKTtcbiAgICBpZiAoIXNyYylcbiAgICAgIHRocm93IG5ldyBFcnJvcihgQ2Fubm90IGZpbmQgXCIke2l0fVwiYCk7XG4gICAgcmVzdWx0LnB1c2goc3JjKTtcbiAgfVxuXG4gIGlmIChyZXN1bHQubGVuZ3RoKVxuICAgIHJldHVybiBTb3VyY2VGaWxlTGlzdC5jcmVhdGUodGhpc1tUQVJHRVRfU0NPUEVdLCByZXN1bHQpO1xuXG4gIHJldHVybiBTb3VyY2VGaWxlTGlzdC5jcmVhdGUodGhpc1tUQVJHRVRfU0NPUEVdLCB0aGlzW1NPVVJDRVNdLmZpbHRlcihpID0+IGkgaW5zdGFuY2VvZiBTb3VyY2VGaWxlKSk7XG59XG5cbkJhc2VUYXJnZXQucHJvdG90eXBlLnNldFByZWZpeCA9IGZ1bmN0aW9uKHByZWZpeCkge1xuICB0aGlzW1BSRUZJWF0gPSBwcmVmaXg7XG59XG5cbkJhc2VUYXJnZXQucHJvdG90eXBlLnNldFN1ZmZpeCA9IGZ1bmN0aW9uKHN1ZmZpeCkge1xuICB0aGlzW1NVRkZJWF0gPSBzdWZmaXg7XG59XG5cbkJhc2VUYXJnZXQucHJvdG90eXBlLnNldE91dHB1dE5hbWUgPSBmdW5jdGlvbihvdXRwdXROYW1lKSB7XG4gIHRoaXNbT1VUUFVUX05BTUVdID0gb3V0cHV0TmFtZTtcbn1cblxuQmFzZVRhcmdldC5wcm90b3R5cGUuYWRkRGVmaW5pdGlvbnMgPSBmdW5jdGlvbiguLi5kZWZpbml0aW9ucykge1xuICBmb3IgKGNvbnN0IFZBTFVFIG9mIGRlZmluaXRpb25zLmZsYXQoMSkpXG4gICAgdGhpc1tERUZJTkVTXS5wdXNoKHsgVkFMVUUgfSk7XG59XG5cbkJhc2VUYXJnZXQucHJvdG90eXBlLnRvSlNPTiA9IGZ1bmN0aW9uKCkge1xuICBjb25zdCBqc29uID0ge307XG4gIGZvciAoY29uc3Qga2V5IGluIHRoaXMpXG4gICAganNvbltrZXldID0gdGhpc1trZXldO1xuICByZXR1cm4ganNvbjtcbn1cblxuZnVuY3Rpb24gQmFzZUxpYnJhcnkoc2NvcGUsIG5hbWUpIHtcbiAgQmFzZVRhcmdldC5jYWxsKHRoaXMsIHNjb3BlLCBuYW1lKTtcbn1cblxuQmFzZUxpYnJhcnkucHJvdG90eXBlID0gT2JqZWN0LmNyZWF0ZShCYXNlVGFyZ2V0LnByb3RvdHlwZSwge1xuICBjb25zdHJ1Y3Rvcjoge1xuICAgIHZhbHVlOiBCYXNlTGlicmFyeSxcbiAgICBlbnVtZXJhYmxlOiBmYWxzZSxcbiAgICB3cml0YWJsZTogdHJ1ZSxcbiAgICBjb25maWd1cmFibGU6IHRydWUsXG4gIH0sXG59KTtcblxuQmFzZUxpYnJhcnkucHJvdG90eXBlLmFkZFB1YmxpY0luY2x1ZGVzID0gZnVuY3Rpb24oLi4uaW5jbHVkZXMpIHtcbiAgZm9yIChjb25zdCBpdCBvZiBpbmNsdWRlcy5mbGF0KDEpKSB7XG4gICAgbGV0IFZBTFVFO1xuICAgIGlmICh0eXBlb2YgaXQgPT09IFwic3RyaW5nXCIgfHwgQWJzb2x1dGVQYXRoLmlzQWJzb2x1dGUoaXQpKVxuICAgICAgVkFMVUUgPSBJbmNsdWRlRGlyZWN0b3J5LmNyZWF0ZShpdCwgdGhpc1tUQVJHRVRfU0NPUEVdLlNPVVJDRV9ESVIpO1xuICAgIGVsc2VcbiAgICAgIFZBTFVFID0gSW50ZXJmYWNlSW5jbHVkZXMuZW5zdXJlSW5zdGFuY2UoaXQpO1xuICAgIHRoaXNbSU5DTFVERVNdLnB1c2goe1ZBTFVFLCBQVUJMSUNfT05MWTogdHJ1ZX0pOyAvLyBJbmNsdWRlRGlyZWN0b3J5W11cbiAgfVxufVxuXG5CYXNlTGlicmFyeS5wcm90b3R5cGUuYWRkUHVibGljRGVmaW5pdGlvbnMgPSBmdW5jdGlvbiguLi5kZWZpbml0aW9ucykge1xuICBmb3IgKGNvbnN0IFZBTFVFIG9mIGRlZmluaXRpb25zLmZsYXQoMSkpXG4gICAgdGhpc1tERUZJTkVTXS5wdXNoKHsgVkFMVUUsIFBVQkxJQ19PTkxZOiB0cnVlIH0pO1xufVxuXG5CYXNlTGlicmFyeS5wcm90b3R5cGUuYWRkUHVibGljTGlicmFyaWVzID0gZnVuY3Rpb24oLi4ubGlicmFyaWVzKSB7XG4gIGZvciAoY29uc3QgaXQgb2YgbGlicmFyaWVzLmZsYXQoMSkpIHtcbiAgICB0aGlzW0xJQlJBUklFU10ucHVzaCh7VkFMVUU6IEludGVyZmFjZVRhcmdldC5lbnN1cmVJbnN0YW5jZShpdCksIFBVQkxJQ19PTkxZOiB0cnVlfSk7XG4gIH1cbn1cblxuQmFzZUxpYnJhcnkucHJvdG90eXBlLmFkZFB1YmxpY0NvbXBpbGVPcHRpb25zID0gZnVuY3Rpb24oLi4ub3B0aW9ucykge1xuICBmb3IgKGNvbnN0IGl0IG9mIG9wdGlvbnMuZmxhdCgxKSkge1xuICAgIHRoaXNbQ09NUElMRV9PUFRJT05TXS5wdXNoKHsgVkFMVUU6IGl0LCBQVUJMSUNfT05MWTogdHJ1ZSB9KTtcbiAgfVxufVxuXG5CYXNlTGlicmFyeS5wcm90b3R5cGUuYWRkUHVibGljTGlua09wdGlvbnMgPSBmdW5jdGlvbiguLi5vcHRpb25zKSB7XG4gIGZvciAoY29uc3QgaXQgb2Ygb3B0aW9ucy5mbGF0KDEpKSB7XG4gICAgdGhpc1tMSU5LX09QVElPTlNdLnB1c2goeyBWQUxVRTogaXQsIFBVQkxJQ19PTkxZOiB0cnVlIH0pO1xuICB9XG59XG5cbmZ1bmN0aW9uIE9iamVjdExpYnJhcnkoc2NvcGUsIG5hbWUpIHtcbiAgQmFzZUxpYnJhcnkuY2FsbCh0aGlzLCBzY29wZSwgbmFtZSk7XG4gIHRoaXMuUFJFRklYID0gc2NvcGUuT0JKRUNUX0xJQlJBUllfUFJFRklYO1xuICB0aGlzLlNVRkZJWCA9IHNjb3BlLk9CSkVDVF9MSUJSQVJZX1NVRkZJWDtcbiAgdGhpcy5MSU5LX09QVElPTlMucHVzaCguLi5zY29wZS5PQkpFQ1RfTElOS0VSX0ZMQUdTLm1hcChWQUxVRSA9PiB7IHJldHVybiB7IFZBTFVFIH0gfSkpO1xufVxuXG5PYmplY3RMaWJyYXJ5LnByb3RvdHlwZSA9IE9iamVjdC5jcmVhdGUoQmFzZUxpYnJhcnkucHJvdG90eXBlLCB7XG4gIGNvbnN0cnVjdG9yOiB7XG4gICAgdmFsdWU6IE9iamVjdExpYnJhcnksXG4gICAgZW51bWVyYWJsZTogZmFsc2UsXG4gICAgd3JpdGFibGU6IHRydWUsXG4gICAgY29uZmlndXJhYmxlOiB0cnVlLFxuICB9LFxufSk7XG5cbk9iamVjdExpYnJhcnkuY3JlYXRlID0gKHNjb3BlLCBuYW1lKSA9PiB7XG4gIHJldHVybiBPYmplY3Quc2VhbChuZXcgT2JqZWN0TGlicmFyeShzY29wZSwgbmFtZSkpO1xufVxuXG5mdW5jdGlvbiBTdGF0aWNMaWJyYXJ5KHNjb3BlLCBuYW1lKSB7XG4gIEJhc2VMaWJyYXJ5LmNhbGwodGhpcywgc2NvcGUsIG5hbWUpO1xuICB0aGlzLlBSRUZJWCA9IHNjb3BlLlNUQVRJQ19MSUJSQVJZX1BSRUZJWDtcbiAgdGhpcy5TVUZGSVggPSBzY29wZS5TVEFUSUNfTElCUkFSWV9TVUZGSVg7XG4gIHRoaXMuTElOS19PUFRJT05TLnB1c2goLi4uc2NvcGUuU1RBVElDX0xJTktFUl9GTEFHUy5tYXAoVkFMVUUgPT4geyByZXR1cm4geyBWQUxVRSB9IH0pKTtcbn1cblxuU3RhdGljTGlicmFyeS5wcm90b3R5cGUgPSBPYmplY3QuY3JlYXRlKEJhc2VMaWJyYXJ5LnByb3RvdHlwZSwge1xuICBjb25zdHJ1Y3Rvcjoge1xuICAgIHZhbHVlOiBTdGF0aWNMaWJyYXJ5LFxuICAgIGVudW1lcmFibGU6IGZhbHNlLFxuICAgIHdyaXRhYmxlOiB0cnVlLFxuICAgIGNvbmZpZ3VyYWJsZTogdHJ1ZSxcbiAgfSxcbn0pO1xuXG5TdGF0aWNMaWJyYXJ5LmNyZWF0ZSA9IChzY29wZSwgbmFtZSkgPT4ge1xuICByZXR1cm4gT2JqZWN0LnNlYWwobmV3IFN0YXRpY0xpYnJhcnkoc2NvcGUsIG5hbWUpKTtcbn1cblxuZnVuY3Rpb24gU2hhcmVkTGlicmFyeShzY29wZSwgbmFtZSkge1xuICBCYXNlTGlicmFyeS5jYWxsKHRoaXMsIHNjb3BlLCBuYW1lKTtcbiAgdGhpcy5QUkVGSVggPSBzY29wZS5TSEFSRURfTElCUkFSWV9QUkVGSVg7XG4gIHRoaXMuU1VGRklYID0gc2NvcGUuU0hBUkVEX0xJQlJBUllfU1VGRklYO1xuICB0aGlzLkxJTktfT1BUSU9OUy5wdXNoKC4uLnNjb3BlLlNIQVJFRF9MSU5LRVJfRkxBR1MubWFwKFZBTFVFID0+IHsgcmV0dXJuIHsgVkFMVUUgfSB9KSk7XG59XG5cblNoYXJlZExpYnJhcnkucHJvdG90eXBlID0gT2JqZWN0LmNyZWF0ZShCYXNlTGlicmFyeS5wcm90b3R5cGUsIHtcbiAgY29uc3RydWN0b3I6IHtcbiAgICB2YWx1ZTogU2hhcmVkTGlicmFyeSxcbiAgICBlbnVtZXJhYmxlOiBmYWxzZSxcbiAgICB3cml0YWJsZTogdHJ1ZSxcbiAgICBjb25maWd1cmFibGU6IHRydWUsXG4gIH0sXG59KTtcblxuU2hhcmVkTGlicmFyeS5jcmVhdGUgPSAoc2NvcGUsIG5hbWUpID0+IHtcbiAgcmV0dXJuIE9iamVjdC5zZWFsKG5ldyBTaGFyZWRMaWJyYXJ5KHNjb3BlLCBuYW1lKSk7XG59XG5cbmZ1bmN0aW9uIEV4ZWN1dGFibGUoc2NvcGUsIG5hbWUpIHtcbiAgQmFzZVRhcmdldC5jYWxsKHRoaXMsIHNjb3BlLCBuYW1lKTtcbiAgdGhpcy5TVUZGSVggPSBzY29wZS5FWEVDVVRBQkxFX1NVRkZJWDtcbiAgdGhpcy5MSU5LX09QVElPTlMucHVzaCguLi5zY29wZS5FWEVfTElOS0VSX0ZMQUdTLm1hcChWQUxVRSA9PiB7IHJldHVybiB7IFZBTFVFIH0gfSkpO1xufVxuXG5FeGVjdXRhYmxlLnByb3RvdHlwZSA9IE9iamVjdC5jcmVhdGUoQmFzZVRhcmdldC5wcm90b3R5cGUsIHtcbiAgY29uc3RydWN0b3I6IHtcbiAgICB2YWx1ZTogRXhlY3V0YWJsZSxcbiAgICBlbnVtZXJhYmxlOiBmYWxzZSxcbiAgICB3cml0YWJsZTogdHJ1ZSxcbiAgICBjb25maWd1cmFibGU6IHRydWUsXG4gIH0sXG59KTtcblxuRXhlY3V0YWJsZS5jcmVhdGUgPSAoc2NvcGUsIG5hbWUpID0+IHtcbiAgcmV0dXJuIE9iamVjdC5zZWFsKG5ldyBFeGVjdXRhYmxlKHNjb3BlLCBuYW1lKSk7XG59XG5cbm1vZHVsZS5leHBvcnRzID0ge1xuICBCYXNlVGFyZ2V0LFxuICBCYXNlTGlicmFyeSxcbiAgT2JqZWN0TGlicmFyeSxcbiAgU3RhdGljTGlicmFyeSxcbiAgU2hhcmVkTGlicmFyeSxcbiAgRXhlY3V0YWJsZSxcbn07XG4iLCJcInVzZSBzdHJpY3RcIjtcblxuY29uc3QgeyBJbmNsdWRlRGlyZWN0b3J5IH0gPSByZXF1aXJlKFwiQC9jb3JlL0luY2x1ZGVEaXJlY3RvcnlcIik7XG5jb25zdCB7IEludGVyZmFjZUluY2x1ZGVzIH0gPSByZXF1aXJlKFwiLi9JbnRlcmZhY2VJbmNsdWRlcy5qc1wiKTtcbmNvbnN0IHsgSW50ZXJmYWNlVGFyZ2V0IH0gPSByZXF1aXJlKFwiLi9JbnRlcmZhY2VUYXJnZXQuanNcIik7XG5cbmNvbnN0IEVOVFJJRVMgPSBTeW1ib2woXCJFTlRSSUVTXCIpO1xuXG5mdW5jdGlvbiBUYXJnZXRDb2xsZWN0aW9uKCkge1xuICB0aGlzW0VOVFJJRVNdID0ge307XG59XG5cblRhcmdldENvbGxlY3Rpb24ucHJvdG90eXBlID0gT2JqZWN0LmNyZWF0ZShPYmplY3QucHJvdG90eXBlLCB7XG4gIGNvbnN0cnVjdG9yOiB7XG4gICAgdmFsdWU6IFRhcmdldENvbGxlY3Rpb24sXG4gICAgZW51bWVyYWJsZTogZmFsc2UsXG4gICAgd3JpdGFibGU6IHRydWUsXG4gICAgY29uZmlndXJhYmxlOiB0cnVlLFxuICB9LFxuICBFTlRSSUVTOiB7XG4gICAgZ2V0KCkgeyByZXR1cm4gdGhpc1tFTlRSSUVTXTsgfSxcbiAgICBlbnVtZXJhYmxlOiB0cnVlLFxuICB9LFxufSk7XG5cblRhcmdldENvbGxlY3Rpb24uY3JlYXRlID0gKCkgPT4ge1xuICByZXR1cm4gT2JqZWN0LnNlYWwobmV3IFRhcmdldENvbGxlY3Rpb24oKSk7XG59XG5cblRhcmdldENvbGxlY3Rpb24ucHJvdG90eXBlLnRvSlNPTiA9IGZ1bmN0aW9uKCkge1xuICByZXR1cm4gdGhpc1tFTlRSSUVTXTtcbn1cblxuVGFyZ2V0Q29sbGVjdGlvbi5wcm90b3R5cGUuZ2V0ID0gZnVuY3Rpb24obmFtZSkge1xuICByZXR1cm4gdGhpc1tFTlRSSUVTXVtuYW1lXTtcbn1cblxuVGFyZ2V0Q29sbGVjdGlvbi5wcm90b3R5cGUuc2V0ID0gZnVuY3Rpb24obmFtZSwgdGFyZ2V0KSB7XG4gIGlmICh0aGlzW0VOVFJJRVNdW25hbWVdKVxuICAgIHRocm93IG5ldyBFcnJvcihgVGFyZ2V0IFwiJHtuYW1lfVwiIGV4aXN0c2ApO1xuICB0aGlzW0VOVFJJRVNdW25hbWVdID0gdGFyZ2V0O1xufVxuXG5mdW5jdGlvbiBnZXRIZWFkZXJzKHRhcmdldCkge1xuICByZXR1cm4gdGFyZ2V0LlNPVVJDRVMuZmlsdGVyKGkgPT4gaS5IRUFERVJfRklMRV9PTkxZKTtcbn1cblxuZnVuY3Rpb24gZ2V0SW5jbHVkZXModGFyZ2V0KSB7XG4gIHJldHVybiB0YXJnZXQuSU5DTFVERVMubWFwKGkgPT4gaS5WQUxVRSk7XG59XG5cbmZ1bmN0aW9uIGdldFB1YmxpY0luY2x1ZGVzKHRhcmdldCkge1xuICByZXR1cm4gdGFyZ2V0LklOQ0xVREVTLmZpbHRlcihpID0+IGkuUFVCTElDX09OTFkpLm1hcChpID0+IGkuVkFMVUUpO1xufVxuXG5mdW5jdGlvbiBnZXRMaWJyYXJpZXModGFyZ2V0KSB7XG4gIHJldHVybiB0YXJnZXQuTElCUkFSSUVTLm1hcChpID0+IGkuVkFMVUUpO1xufVxuXG5mdW5jdGlvbiBnZXRQdWJsaWNMaWJyYXJpZXModGFyZ2V0KSB7XG4gIHJldHVybiB0YXJnZXQuTElCUkFSSUVTLmZpbHRlcihpID0+IGkuUFVCTElDX09OTFkpLm1hcChpID0+IGkuVkFMVUUpO1xufVxuXG5mdW5jdGlvbiBnZXREZWZpbml0aW9ucyh0YXJnZXQpIHtcbiAgcmV0dXJuIHRhcmdldC5ERUZJTkVTLm1hcChpID0+IGkuVkFMVUUpO1xufVxuXG5mdW5jdGlvbiBnZXRQdWJsaWNEZWZpbml0aW9ucyh0YXJnZXQpIHtcbiAgcmV0dXJuIHRhcmdldC5ERUZJTkVTLmZpbHRlcihpID0+IGkuUFVCTElDX09OTFkpLm1hcChpID0+IGkuVkFMVUUpO1xufVxuXG5mdW5jdGlvbiBnZXRDb21waWxlT3B0aW9ucyh0YXJnZXQpIHtcbiAgcmV0dXJuIHRhcmdldC5DT01QSUxFX09QVElPTlMubWFwKGkgPT4gaS5WQUxVRSk7XG59XG5cbmZ1bmN0aW9uIGdldFB1YmxpY0NvbXBpbGVPcHRpb25zKHRhcmdldCkge1xuICByZXR1cm4gdGFyZ2V0LkNPTVBJTEVfT1BUSU9OUy5maWx0ZXIoaSA9PiBpLlBVQkxJQ19PTkxZKS5tYXAoaSA9PiBpLlZBTFVFKTtcbn1cblxuZnVuY3Rpb24gZ2V0TGlua09wdGlvbnModGFyZ2V0KSB7XG4gIHJldHVybiB0YXJnZXQuTElOS19PUFRJT05TLm1hcChpID0+IGkuVkFMVUUpO1xufVxuXG5mdW5jdGlvbiBnZXRQdWJsaWNMaW5rT3B0aW9ucyh0YXJnZXQpIHtcbiAgcmV0dXJuIHRhcmdldC5MSU5LX09QVElPTlMuZmlsdGVyKGkgPT4gaS5QVUJMSUNfT05MWSkubWFwKGkgPT4gaS5WQUxVRSk7XG59XG5cblRhcmdldENvbGxlY3Rpb24ucHJvdG90eXBlLl9fZ2V0QWxsSW5jbHVkZXMgPSBmdW5jdGlvbihpbmNsdWRlcywgdGFyZ2V0U2V0LCBsaXN0KSB7XG4gIGZvciAoY29uc3QgaXRlciBvZiBsaXN0KSB7XG4gICAgaWYgKGl0ZXIgaW5zdGFuY2VvZiBJbnRlcmZhY2VJbmNsdWRlcyB8fCBpdGVyIGluc3RhbmNlb2YgSW50ZXJmYWNlVGFyZ2V0KSB7XG4gICAgICBpZiAoIXRhcmdldFNldC5oYXMoaXRlci50YXJnZXROYW1lKSkge1xuICAgICAgICB0YXJnZXRTZXQuYWRkKGl0ZXIudGFyZ2V0TmFtZSk7XG4gICAgICAgIGNvbnN0IHRhcmdldCA9IHRoaXMuZ2V0KGl0ZXIudGFyZ2V0TmFtZSk7XG4gICAgICAgIHRoaXMuX19nZXRBbGxJbmNsdWRlcyhpbmNsdWRlcywgdGFyZ2V0U2V0LCBnZXRQdWJsaWNJbmNsdWRlcyh0YXJnZXQpKTtcbiAgICAgICAgdGhpcy5fX2dldEFsbEluY2x1ZGVzKGluY2x1ZGVzLCB0YXJnZXRTZXQsIGdldFB1YmxpY0xpYnJhcmllcyh0YXJnZXQpKTtcbiAgICAgIH1cbiAgICB9XG4gICAgZWxzZSBpZiAoaXRlciBpbnN0YW5jZW9mIEluY2x1ZGVEaXJlY3RvcnkpIHtcbiAgICAgIGlmICghaW5jbHVkZXMuaW5jbHVkZXMoaXRlci50b1N0cmluZygpKSlcbiAgICAgICAgaW5jbHVkZXMucHVzaChpdGVyLnRvU3RyaW5nKCkpO1xuICAgIH1cbiAgICBlbHNlIHtcbiAgICAgIHRocm93IG5ldyBFcnJvcihgTm90IHN1cHBvcnQgaW5zdGFuY2UgJHtpdGVyfWApO1xuICAgIH1cbiAgfVxufVxuXG5UYXJnZXRDb2xsZWN0aW9uLnByb3RvdHlwZS5hbGxJbmNsdWRlc09mID0gZnVuY3Rpb24ocGFyYW1zKSB7XG4gIGNvbnN0IHRhcmdldCA9ICh0eXBlb2YgcGFyYW1zID09PSBcInN0cmluZ1wiKSA/IHRoaXMuZ2V0KHBhcmFtcykgOiBwYXJhbXM7XG4gIGNvbnN0IGluY2x1ZGVzID0gW107XG4gIGNvbnN0IHRhcmdldFNldCA9IG5ldyBTZXQoWyB0YXJnZXQuTkFNRSBdKTtcbiAgdGhpcy5fX2dldEFsbEluY2x1ZGVzKGluY2x1ZGVzLCB0YXJnZXRTZXQsIGdldEluY2x1ZGVzKHRhcmdldCkpO1xuICB0aGlzLl9fZ2V0QWxsSW5jbHVkZXMoaW5jbHVkZXMsIHRhcmdldFNldCwgZ2V0TGlicmFyaWVzKHRhcmdldCkpO1xuICByZXR1cm4gaW5jbHVkZXM7XG59XG5cblRhcmdldENvbGxlY3Rpb24ucHJvdG90eXBlLl9fZ2V0QWxsSGVhZGVycyA9IGZ1bmN0aW9uKGhlYWRlcnMsIHRhcmdldFNldCwgbGlzdCkge1xuICBmb3IgKGNvbnN0IGl0ZXIgb2YgbGlzdCkge1xuICAgIGlmIChpdGVyIGluc3RhbmNlb2YgSW50ZXJmYWNlSW5jbHVkZXMgfHwgaXRlciBpbnN0YW5jZW9mIEludGVyZmFjZVRhcmdldCkge1xuICAgICAgaWYgKCF0YXJnZXRTZXQuaGFzKGl0ZXIudGFyZ2V0TmFtZSkpIHtcbiAgICAgICAgdGFyZ2V0U2V0LmFkZChpdGVyLnRhcmdldE5hbWUpO1xuICAgICAgICBjb25zdCB0YXJnZXQgPSB0aGlzLmdldChpdGVyLnRhcmdldE5hbWUpO1xuICAgICAgICBmb3IgKGNvbnN0IGhlYWRlciBvZiBnZXRIZWFkZXJzKHRhcmdldCkubWFwKGkgPT4gaS5GSUxFLnRvU3RyaW5nKCkpKSB7XG4gICAgICAgICAgaWYgKCFoZWFkZXJzLmluY2x1ZGVzKGhlYWRlci50b1N0cmluZygpKSlcbiAgICAgICAgICAgIGhlYWRlcnMucHVzaChoZWFkZXIudG9TdHJpbmcoKSk7XG4gICAgICAgIH1cbiAgICAgICAgdGhpcy5fX2dldEFsbEhlYWRlcnMoaGVhZGVycywgdGFyZ2V0U2V0LCBnZXRQdWJsaWNJbmNsdWRlcyh0YXJnZXQpKTtcbiAgICAgICAgdGhpcy5fX2dldEFsbEhlYWRlcnMoaGVhZGVycywgdGFyZ2V0U2V0LCBnZXRQdWJsaWNMaWJyYXJpZXModGFyZ2V0KSk7XG4gICAgICB9XG4gICAgfVxuICB9XG59XG5cblRhcmdldENvbGxlY3Rpb24ucHJvdG90eXBlLmFsbEhlYWRlcnNPZiA9IGZ1bmN0aW9uKHBhcmFtcykge1xuICBjb25zdCB0YXJnZXQgPSAodHlwZW9mIHBhcmFtcyA9PT0gXCJzdHJpbmdcIikgPyB0aGlzLmdldChwYXJhbXMpIDogcGFyYW1zO1xuICBjb25zdCBoZWFkZXJzID0gZ2V0SGVhZGVycyh0YXJnZXQpLm1hcChpID0+IGkuRklMRS50b1N0cmluZygpKTtcbiAgY29uc3QgdGFyZ2V0U2V0ID0gbmV3IFNldChbIHRhcmdldC5OQU1FIF0pO1xuICB0aGlzLl9fZ2V0QWxsSGVhZGVycyhoZWFkZXJzLCB0YXJnZXRTZXQsIGdldEluY2x1ZGVzKHRhcmdldCkpO1xuICB0aGlzLl9fZ2V0QWxsSGVhZGVycyhoZWFkZXJzLCB0YXJnZXRTZXQsIGdldExpYnJhcmllcyh0YXJnZXQpKTtcbiAgcmV0dXJuIGhlYWRlcnM7XG59XG5cblRhcmdldENvbGxlY3Rpb24ucHJvdG90eXBlLl9fZ2V0QWxsTGlicmFyaWVzID0gZnVuY3Rpb24obGlicmFyaWVzLCB0YXJnZXRTZXQsIGxpc3QpIHtcbiAgZm9yIChjb25zdCBpdGVyIG9mIGxpc3QpIHtcbiAgICBjb25zb2xlLmFzc2VydChpdGVyIGluc3RhbmNlb2YgSW50ZXJmYWNlVGFyZ2V0KTtcbiAgICBpZiAoIXRhcmdldFNldC5oYXMoaXRlci50YXJnZXROYW1lKSkge1xuICAgICAgdGFyZ2V0U2V0LmFkZChpdGVyLnRhcmdldE5hbWUpO1xuICAgICAgY29uc3QgdGFyZ2V0ID0gdGhpcy5nZXQoaXRlci50YXJnZXROYW1lKTtcbiAgICAgIGxpYnJhcmllcy5wdXNoKHRhcmdldC5GSUxFLnRvU3RyaW5nKCkpO1xuICAgICAgdGhpcy5fX2dldEFsbExpYnJhcmllcyhsaWJyYXJpZXMsIHRhcmdldFNldCwgZ2V0UHVibGljTGlicmFyaWVzKHRhcmdldCkpO1xuICAgIH1cbiAgfVxufVxuXG5UYXJnZXRDb2xsZWN0aW9uLnByb3RvdHlwZS5hbGxMaWJyYXJpZXNPZiA9IGZ1bmN0aW9uKHBhcmFtcykge1xuICBjb25zdCB0YXJnZXQgPSAodHlwZW9mIHBhcmFtcyA9PT0gXCJzdHJpbmdcIikgPyB0aGlzLmdldChwYXJhbXMpIDogcGFyYW1zO1xuICBjb25zdCBsaWJyYXJpZXMgPSBbXTtcbiAgY29uc3QgdGFyZ2V0U2V0ID0gbmV3IFNldChbIHRhcmdldC5OQU1FIF0pO1xuICB0aGlzLl9fZ2V0QWxsTGlicmFyaWVzKGxpYnJhcmllcywgdGFyZ2V0U2V0LCBnZXRMaWJyYXJpZXModGFyZ2V0KSk7XG4gIHJldHVybiBsaWJyYXJpZXM7XG59XG5cblRhcmdldENvbGxlY3Rpb24ucHJvdG90eXBlLl9fZ2V0QWxsRGVmaW5pdGlvbnMgPSBmdW5jdGlvbihkZWZpbml0aW9ucywgdGFyZ2V0U2V0LCBsaXN0KSB7XG4gIGZvciAoY29uc3QgaXRlciBvZiBsaXN0KSB7XG4gICAgaWYgKGl0ZXIgaW5zdGFuY2VvZiBJbnRlcmZhY2VUYXJnZXQpIHtcbiAgICAgIGlmICghdGFyZ2V0U2V0LmhhcyhpdGVyLnRhcmdldE5hbWUpKSB7XG4gICAgICAgIHRhcmdldFNldC5hZGQoaXRlci50YXJnZXROYW1lKTtcbiAgICAgICAgY29uc3QgdGFyZ2V0ID0gdGhpcy5nZXQoaXRlci50YXJnZXROYW1lKTtcbiAgICAgICAgdGhpcy5fX2dldEFsbERlZmluaXRpb25zKGRlZmluaXRpb25zLCB0YXJnZXRTZXQsIGdldFB1YmxpY0RlZmluaXRpb25zKHRhcmdldCkpO1xuICAgICAgICB0aGlzLl9fZ2V0QWxsRGVmaW5pdGlvbnMoZGVmaW5pdGlvbnMsIHRhcmdldFNldCwgZ2V0UHVibGljTGlicmFyaWVzKHRhcmdldCkpO1xuICAgICAgfVxuICAgIH1cbiAgICBlbHNlIGlmICh0eXBlb2YgaXRlciA9PT0gXCJzdHJpbmdcIikge1xuICAgICAgaWYgKCFkZWZpbml0aW9ucy5pbmNsdWRlcyhpdGVyKSlcbiAgICAgICAgZGVmaW5pdGlvbnMucHVzaChpdGVyKTtcbiAgICB9XG4gICAgZWxzZSB7XG4gICAgICB0aHJvdyBuZXcgRXJyb3IoYE5vdCBzdXBwb3J0IGluc3RhbmNlICR7aXRlcn1gKTtcbiAgICB9XG4gIH1cbn1cblxuVGFyZ2V0Q29sbGVjdGlvbi5wcm90b3R5cGUuYWxsRGVmaW5pdGlvbnNPZiA9IGZ1bmN0aW9uKHBhcmFtcykge1xuICBjb25zdCB0YXJnZXQgPSAodHlwZW9mIHBhcmFtcyA9PT0gXCJzdHJpbmdcIikgPyB0aGlzLmdldChwYXJhbXMpIDogcGFyYW1zO1xuICBjb25zdCBkZWZpbml0aW9ucyA9IFtdO1xuICBjb25zdCB0YXJnZXRTZXQgPSBuZXcgU2V0KFsgdGFyZ2V0Lk5BTUUgXSk7XG4gIHRoaXMuX19nZXRBbGxEZWZpbml0aW9ucyhkZWZpbml0aW9ucywgdGFyZ2V0U2V0LCBnZXREZWZpbml0aW9ucyh0YXJnZXQpKTtcbiAgdGhpcy5fX2dldEFsbERlZmluaXRpb25zKGRlZmluaXRpb25zLCB0YXJnZXRTZXQsIGdldFB1YmxpY0xpYnJhcmllcyh0YXJnZXQpKTtcbiAgcmV0dXJuIGRlZmluaXRpb25zO1xufVxuXG5UYXJnZXRDb2xsZWN0aW9uLnByb3RvdHlwZS5fX2dldEFsbENvbXBpbGVPcHRpb25zID0gZnVuY3Rpb24ob3B0aW9ucywgdGFyZ2V0U2V0LCBsaXN0KSB7XG4gIGZvciAoY29uc3QgaXRlciBvZiBsaXN0KSB7XG4gICAgaWYgKGl0ZXIgaW5zdGFuY2VvZiBJbnRlcmZhY2VUYXJnZXQpIHtcbiAgICAgIGlmICghdGFyZ2V0U2V0LmhhcyhpdGVyLnRhcmdldE5hbWUpKSB7XG4gICAgICAgIHRhcmdldFNldC5hZGQoaXRlci50YXJnZXROYW1lKTtcbiAgICAgICAgY29uc3QgdGFyZ2V0ID0gdGhpcy5nZXQoaXRlci50YXJnZXROYW1lKTtcbiAgICAgICAgdGhpcy5fX2dldEFsbENvbXBpbGVPcHRpb25zKG9wdGlvbnMsIHRhcmdldFNldCwgZ2V0UHVibGljQ29tcGlsZU9wdGlvbnModGFyZ2V0KSk7XG4gICAgICAgIHRoaXMuX19nZXRBbGxDb21waWxlT3B0aW9ucyhvcHRpb25zLCB0YXJnZXRTZXQsIGdldFB1YmxpY0xpYnJhcmllcyh0YXJnZXQpKTtcbiAgICAgIH1cbiAgICB9XG4gICAgZWxzZSBpZiAodHlwZW9mIGl0ZXIgPT09IFwic3RyaW5nXCIpIHtcbiAgICAgIGlmICghb3B0aW9ucy5pbmNsdWRlcyhpdGVyKSlcbiAgICAgICAgb3B0aW9ucy5wdXNoKGl0ZXIpO1xuICAgIH1cbiAgICBlbHNlIGlmIChBcnJheS5pc0FycmF5KGl0ZXIpKSB7XG4gICAgICAvLyBUT0RPOiBBZGQgY29tcGFyZSBmb3Igc2FtZSBhcnJheSBpbiBvcHRpb25zXG4gICAgICBvcHRpb25zLnB1c2goaXRlcik7XG4gICAgfVxuICAgIGVsc2Uge1xuICAgICAgdGhyb3cgbmV3IEVycm9yKGBOb3Qgc3VwcG9ydCBpbnN0YW5jZSAke2l0ZXJ9YCk7XG4gICAgfVxuICB9XG59XG5cblRhcmdldENvbGxlY3Rpb24ucHJvdG90eXBlLmFsbENvbXBpbGVPcHRpb25zT2YgPSBmdW5jdGlvbihwYXJhbXMpIHtcbiAgY29uc3QgdGFyZ2V0ID0gKHR5cGVvZiBwYXJhbXMgPT09IFwic3RyaW5nXCIpID8gdGhpcy5nZXQocGFyYW1zKSA6IHBhcmFtcztcbiAgY29uc3Qgb3B0aW9ucyA9IFtdO1xuICBjb25zdCB0YXJnZXRTZXQgPSBuZXcgU2V0KFsgdGFyZ2V0Lk5BTUUgXSk7XG4gIHRoaXMuX19nZXRBbGxDb21waWxlT3B0aW9ucyhvcHRpb25zLCB0YXJnZXRTZXQsIGdldENvbXBpbGVPcHRpb25zKHRhcmdldCkpO1xuICB0aGlzLl9fZ2V0QWxsQ29tcGlsZU9wdGlvbnMob3B0aW9ucywgdGFyZ2V0U2V0LCBnZXRQdWJsaWNMaWJyYXJpZXModGFyZ2V0KSk7XG4gIHJldHVybiBvcHRpb25zLmZsYXQoKTtcbn1cblxuVGFyZ2V0Q29sbGVjdGlvbi5wcm90b3R5cGUuX19nZXRMaW5rT3B0aW9ucyA9IGZ1bmN0aW9uKG9wdGlvbnMsIHRhcmdldFNldCwgbGlzdCkge1xuICBmb3IgKGNvbnN0IGl0ZXIgb2YgbGlzdCkge1xuICAgIGlmIChpdGVyIGluc3RhbmNlb2YgSW50ZXJmYWNlVGFyZ2V0KSB7XG4gICAgICBpZiAoIXRhcmdldFNldC5oYXMoaXRlci50YXJnZXROYW1lKSkge1xuICAgICAgICB0YXJnZXRTZXQuYWRkKGl0ZXIudGFyZ2V0TmFtZSk7XG4gICAgICAgIGNvbnN0IHRhcmdldCA9IHRoaXMuZ2V0KGl0ZXIudGFyZ2V0TmFtZSk7XG4gICAgICAgIHRoaXMuX19nZXRMaW5rT3B0aW9ucyhvcHRpb25zLCB0YXJnZXRTZXQsIGdldFB1YmxpY0xpbmtPcHRpb25zKHRhcmdldCkpO1xuICAgICAgICB0aGlzLl9fZ2V0TGlua09wdGlvbnMob3B0aW9ucywgdGFyZ2V0U2V0LCBnZXRQdWJsaWNMaWJyYXJpZXModGFyZ2V0KSk7XG4gICAgICB9XG4gICAgfVxuICAgIGVsc2UgaWYgKHR5cGVvZiBpdGVyID09PSBcInN0cmluZ1wiKSB7XG4gICAgICBpZiAoIW9wdGlvbnMuaW5jbHVkZXMoaXRlcikpXG4gICAgICAgIG9wdGlvbnMucHVzaChpdGVyKTtcbiAgICB9XG4gICAgZWxzZSBpZiAoQXJyYXkuaXNBcnJheShpdGVyKSkge1xuICAgICAgLy8gVE9ETzogQWRkIGNvbXBhcmUgZm9yIHNhbWUgYXJyYXkgaW4gb3B0aW9uc1xuICAgICAgb3B0aW9ucy5wdXNoKGl0ZXIpO1xuICAgIH1cbiAgICBlbHNlIHtcbiAgICAgIHRocm93IG5ldyBFcnJvcihgTm90IHN1cHBvcnQgaW5zdGFuY2UgJHtpdGVyfWApO1xuICAgIH1cbiAgfVxufVxuXG5UYXJnZXRDb2xsZWN0aW9uLnByb3RvdHlwZS5hbGxMaW5rT3B0aW9uc09mID0gZnVuY3Rpb24ocGFyYW1zKSB7XG4gIGNvbnN0IHRhcmdldCA9ICh0eXBlb2YgcGFyYW1zID09PSBcInN0cmluZ1wiKSA/IHRoaXMuZ2V0KHBhcmFtcykgOiBwYXJhbXM7XG4gIGNvbnN0IG9wdGlvbnMgPSBbXTtcbiAgY29uc3QgdGFyZ2V0U2V0ID0gbmV3IFNldChbIHRhcmdldC5OQU1FIF0pO1xuICB0aGlzLl9fZ2V0TGlua09wdGlvbnMob3B0aW9ucywgdGFyZ2V0U2V0LCBnZXRMaW5rT3B0aW9ucyh0YXJnZXQpKTtcbiAgdGhpcy5fX2dldExpbmtPcHRpb25zKG9wdGlvbnMsIHRhcmdldFNldCwgZ2V0UHVibGljTGlicmFyaWVzKHRhcmdldCkpO1xuICByZXR1cm4gb3B0aW9ucy5mbGF0KCk7XG59XG5cbm1vZHVsZS5leHBvcnRzID0ge1xuICBUYXJnZXRDb2xsZWN0aW9uLFxufTtcbiIsIlwidXNlIHN0cmljdFwiO1xuXG5jb25zdCBOQU1FICAgICA9IFN5bWJvbChcIk5BTUVcIik7XG5jb25zdCBJTkNMVURFUyA9IFN5bWJvbChcIklOQ0xVREVTXCIpO1xuY29uc3QgU09VUkNFUyAgPSBTeW1ib2woXCJTT1VSQ0VTXCIpO1xuY29uc3QgREVGSU5FUyA9IFN5bWJvbChcIkRFRklORVNcIik7XG5jb25zdCBDT01QSUxFX09QVElPTlMgPSBTeW1ib2woXCJDT01QSUxFX09QVElPTlNcIik7XG5jb25zdCBMSU5LX09QVElPTlMgPSBTeW1ib2woXCJMSU5LX09QVElPTlNcIik7XG5cbmZ1bmN0aW9uIFVua25vd25UYXJnZXQobmFtZSkge1xuICB0aGlzW05BTUVdID0gbmFtZTtcbiAgdGhpc1tJTkNMVURFU10gPSBbXTtcbiAgdGhpc1tTT1VSQ0VTXSA9IFtdO1xuICB0aGlzW0RFRklORVNdID0gW107XG4gIHRoaXNbQ09NUElMRV9PUFRJT05TXSA9IFtdO1xuICB0aGlzW0xJTktfT1BUSU9OU10gPSBbXTtcbn1cblxuVW5rbm93blRhcmdldC5jcmVhdGUgPSAobmFtZSkgPT4ge1xuICByZXR1cm4gT2JqZWN0LnNlYWwobmV3IFVua25vd25UYXJnZXQobmFtZSkpO1xufVxuXG5Vbmtub3duVGFyZ2V0LmVuc3VyZUluc3RhbmNlID0gKHZhbHVlKSA9PiB7XG4gIGlmICh2YWx1ZSBpbnN0YW5jZW9mIFVua25vd25UYXJnZXQpXG4gICAgcmV0dXJuIHZhbHVlO1xuICB0aHJvdyBuZXcgRXJyb3IoYFRoZSAnJHt2YWx1ZX0nIGlzIG5vdCBhIFVua25vd25UYXJnZXRgKTtcbn1cblxuVW5rbm93blRhcmdldC5wcm90b3R5cGUgPSBPYmplY3QuY3JlYXRlKE9iamVjdC5wcm90b3R5cGUsIHtcbiAgY29uc3RydWN0b3I6IHtcbiAgICB2YWx1ZTogVW5rbm93blRhcmdldCxcbiAgICBlbnVtZXJhYmxlOiBmYWxzZSxcbiAgfSxcbiAgTkFNRToge1xuICAgIGdldCAoKSB7IHJldHVybiB0aGlzW05BTUVdOyB9LFxuICAgIGVudW1lcmFibGU6IHRydWUsXG4gIH0sXG4gIElOQ0xVREVTOiB7XG4gICAgZ2V0ICgpIHsgcmV0dXJuIHRoaXNbSU5DTFVERVNdOyB9LFxuICAgIGVudW1lcmFibGU6IHRydWUsXG4gIH0sXG4gIFNPVVJDRVM6IHtcbiAgICBnZXQgKCkgeyByZXR1cm4gdGhpc1tTT1VSQ0VTXTsgfSxcbiAgICBlbnVtZXJhYmxlOiB0cnVlLFxuICB9LFxuICBERUZJTkVTOiB7XG4gICAgZ2V0ICgpIHsgcmV0dXJuIHRoaXNbREVGSU5FU107IH0sXG4gICAgZW51bWVyYWJsZTogdHJ1ZSxcbiAgfSxcbiAgQ09NUElMRV9PUFRJT05TOiB7XG4gICAgZ2V0ICgpIHsgcmV0dXJuIHRoaXNbQ09NUElMRV9PUFRJT05TXTsgfSxcbiAgICBlbnVtZXJhYmxlOiB0cnVlLFxuICB9LFxuICBMSU5LX09QVElPTlM6IHtcbiAgICBnZXQgKCkgeyByZXR1cm4gdGhpc1tMSU5LX09QVElPTlNdOyB9LFxuICAgIGVudW1lcmFibGU6IHRydWUsXG4gIH0sXG59KTtcblxuVW5rbm93blRhcmdldC5wcm90b3R5cGUudG9KU09OID0gZnVuY3Rpb24oKSB7XG4gIGNvbnN0IGpzb24gPSB7fTtcbiAgZm9yIChjb25zdCBrZXkgaW4gdGhpcylcbiAgICBqc29uW2tleV0gPSB0aGlzW2tleV07XG4gIHJldHVybiBqc29uO1xufVxuXG5Vbmtub3duVGFyZ2V0LnByb3RvdHlwZS50b1N0cmluZyA9IGZ1bmN0aW9uKCkge1xuICByZXR1cm4gXCIke1wiICsgdGhpc1tOQU1FXSArIFwifVwiO1xufVxuXG5tb2R1bGUuZXhwb3J0cyA9IHtcbiAgVW5rbm93blRhcmdldCxcbn07XG4iLCJcInVzZSBzdHJpY3RcIjtcblxuY29uc3Qgb3MgPSByZXF1aXJlKFwibm9kZTpvc1wiKTtcbmNvbnN0IHBhdGggPSByZXF1aXJlKFwibm9kZTpwYXRoXCIpO1xuXG5jb25zdCB7IGNvcHlWYWx1ZSB9ID0gcmVxdWlyZShcIkAvdXRpbHMvUHJpbWl0aXZlc1wiKTtcbmNvbnN0IHsgZmlsZUV4aXN0c1N5bmMgfSA9IHJlcXVpcmUoXCJAL3V0aWxzL0ZpbGVTeXN0ZW1cIik7XG5jb25zdCB7IEFic29sdXRlUGF0aCB9ID0gcmVxdWlyZShcIkAvdXRpbHMvQWJzb2x1dGVQYXRoLmpzXCIpO1xuY29uc3QgeyBJbnRlcmZhY2VUYXJnZXQgfSA9IHJlcXVpcmUoXCIuL0ludGVyZmFjZVRhcmdldC5qc1wiKTtcbmNvbnN0IHsgQmFzZVRhcmdldCB9ID0gcmVxdWlyZShcIi4vVGFyZ2V0LmpzXCIpO1xuY29uc3QgeyBJbmNsdWRlRGlyZWN0b3J5IH0gPSByZXF1aXJlKFwiQC9jb3JlL0luY2x1ZGVEaXJlY3RvcnlcIik7XG5jb25zdCB7IFN5c3RlbVZhcmlhYmxlcyB9ID0gcmVxdWlyZShcIi4vU3lzdGVtVmFyaWFibGVzLmpzXCIpO1xuY29uc3QgYml0bWFrZSA9IHJlcXVpcmUoXCJAL2JpdG1ha2UvaW5kZXguanNcIik7XG5cbmNvbnN0IHJlcXVpcmVJbXBsID0gZXZhbChcInJlcXVpcmVcIik7XG5cbmNvbnN0IGN1cnJlbnRGdW5jdGlvbk5hbWUgPSAoKSA9PiB7XG4gIGNvbnN0IHN0YWNrID0gbmV3IEVycm9yKCkuc3RhY2suc3BsaXQoXCJcXG5cIilbMl07XG4gIHJldHVybiBzdGFjay5tYXRjaCgvYXQgKFxcUyspLyk/LlsxXTtcbn07XG5cbmZ1bmN0aW9uIHNjb3BlVmFsdWVBc1ByaW1pdGl2ZXMobykge1xuICBpZiAodHlwZW9mIG8gPT09IFwidW5kZWZpbmVkXCIpXG4gICAgcmV0dXJuIG87XG4gIGlmICh0eXBlb2YgbyA9PT0gXCJib29sZWFuXCIpXG4gICAgcmV0dXJuIG87XG4gIGlmICh0eXBlb2YgbyA9PT0gXCJudW1iZXJcIilcbiAgICByZXR1cm4gbztcbiAgaWYgKHR5cGVvZiBvID09PSBcInN0cmluZ1wiKVxuICAgIHJldHVybiBvO1xuICBpZiAodHlwZW9mIG8gPT09IFwib2JqZWN0XCIpIHtcbiAgICBpZiAoIW8pXG4gICAgICByZXR1cm4gbztcbiAgICBpZiAobyBpbnN0YW5jZW9mIEFic29sdXRlUGF0aCkge1xuICAgICAgcmV0dXJuIG8udG9TdHJpbmcoKTtcbiAgICB9XG4gICAgaWYgKG8gaW5zdGFuY2VvZiBBcnJheSkge1xuICAgICAgY29uc3QgcmVzdWx0ID0gW107XG4gICAgICBmb3IgKGNvbnN0IGkgb2YgbylcbiAgICAgICAgcmVzdWx0LnB1c2goc2NvcGVWYWx1ZUFzUHJpbWl0aXZlcyhpKSk7XG4gICAgICByZXR1cm4gcmVzdWx0O1xuICAgIH1cbiAgICBpZiAobyBpbnN0YW5jZW9mIE9iamVjdCkge1xuICAgICAgY29uc3QgcmVzdWx0ID0ge307XG4gICAgICBmb3IgKGNvbnN0IFtrLHZdIG9mIE9iamVjdC5lbnRyaWVzKG8pKVxuICAgICAgICByZXN1bHRba10gPSBzY29wZVZhbHVlQXNQcmltaXRpdmVzKHYpO1xuICAgICAgcmV0dXJuIHJlc3VsdDtcbiAgICB9XG4gIH1cbiAgdGhyb3cgbmV3IEVycm9yKGBVbmtub3duIGluc3RhbmNlIG9mICR7b31gKTtcbn1cblxuY29uc3QgR0xPQkFMID0gU3ltYm9sKFwiR0xPQkFMXCIpO1xuY29uc3QgU0NPUEUgPSBTeW1ib2woXCJTQ09QRVwiKTtcblxuZnVuY3Rpb24gVXNlckNvbnRleHQoc2NvcGUsIGdsb2JhbCkge1xuICB0aGlzW1NDT1BFXSA9IHNjb3BlO1xuICB0aGlzW0dMT0JBTF0gPSBnbG9iYWw7XG5cbiAgY29uc3QgcHJvcHMgPSBPYmplY3QuZ2V0T3duUHJvcGVydHlEZXNjcmlwdG9ycyhTeXN0ZW1WYXJpYWJsZXMucHJvdG90eXBlKTtcbiAgZm9yIChjb25zdCBbbmFtZSwgZGVzY10gb2YgT2JqZWN0LmVudHJpZXMocHJvcHMpKSB7XG4gICAgaWYgKGRlc2MuZ2V0ICYmIGRlc2Muc2V0KSB7XG4gICAgICBjb25zdCBuZXdEZXNjID0geyBlbnVtZXJhYmxlOiBkZXNjLmVudW1lcmFibGUsIGNvbmZpZ3VyYWJsZTogZmFsc2UgfTtcbiAgICAgIGlmIChkZXNjLmdldClcbiAgICAgICAgbmV3RGVzYy5nZXQgPSBmdW5jdGlvbigpIHsgcmV0dXJuIHRoaXNbU0NPUEVdW25hbWVdOyB9XG4gICAgICBpZiAoZGVzYy5zZXQpXG4gICAgICAgIG5ld0Rlc2Muc2V0ID0gZnVuY3Rpb24odmFsdWUpIHsgdGhpc1tTQ09QRV1bbmFtZV0gPSB2YWx1ZTsgfVxuICAgICAgT2JqZWN0LmRlZmluZVByb3BlcnR5KHRoaXMsIG5hbWUsIG5ld0Rlc2MpO1xuICAgIH1cbiAgfVxufVxuXG5Vc2VyQ29udGV4dC5jcmVhdGUgPSAoc2NvcGUsIGdsb2JhbCkgPT4ge1xuICByZXR1cm4gbmV3IFVzZXJDb250ZXh0KHNjb3BlLCBnbG9iYWwpO1xufVxuXG5mdW5jdGlvbiBtYWtlTG9nZ2VyKGxvZ2dlckZ1bmMsIHdpdGhUYWcpIHtcbiAgaWYgKCFsb2dnZXJGdW5jKVxuICAgIHJldHVybiAoKSA9PiB7fTtcbiAgcmV0dXJuIGZ1bmN0aW9uKCkge1xuICAgIGNvbnN0IGxpc3QgPSBbXTtcbiAgICBpZiAod2l0aFRhZylcbiAgICAgIGxpc3QucHVzaChcIltcIiArIHRoaXMuX19sb2dUYWcoKSArIFwiXVwiKTtcbiAgICBmb3IgKGNvbnN0IGl0ZXIgb2YgYXJndW1lbnRzKSB7XG4gICAgICBpZiAoaXRlciAmJiB0eXBlb2YgaXRlciA9PT0gXCJvYmplY3RcIilcbiAgICAgICAgbGlzdC5wdXNoKEpTT04uc3RyaW5naWZ5KGl0ZXIpKTtcbiAgICAgIGVsc2VcbiAgICAgICAgbGlzdC5wdXNoKGl0ZXIudG9TdHJpbmcoKSk7XG4gICAgfVxuICAgIGxvZ2dlckZ1bmMobGlzdC5qb2luKFwiIFwiKSk7XG4gIH07XG59XG5cblVzZXJDb250ZXh0LnByb3RvdHlwZS5sb2dEZWZhdWx0ID0gbWFrZUxvZ2dlcihjb25zb2xlLmxvZyk7XG5Vc2VyQ29udGV4dC5wcm90b3R5cGUubG9nSW5mbyA9IG1ha2VMb2dnZXIoY29uc29sZS5pbmZvKTtcblVzZXJDb250ZXh0LnByb3RvdHlwZS5sb2dEZWJ1ZyA9IG1ha2VMb2dnZXIoLypjb25zb2xlLmRlYnVnKi8pO1xuVXNlckNvbnRleHQucHJvdG90eXBlLmxvZ1dhcm4gPSBtYWtlTG9nZ2VyKGNvbnNvbGUud2Fybik7XG5Vc2VyQ29udGV4dC5wcm90b3R5cGUubG9nRXJyb3IgPSBtYWtlTG9nZ2VyKGNvbnNvbGUuZXJyb3IpO1xuXG5Vc2VyQ29udGV4dC5wcm90b3R5cGUuX19sb2dUYWcgPSBmdW5jdGlvbigpIHtcbiAgY29uc3QgdGFnID0gdGhpcy5QUk9KRUNUX1NPVVJDRV9ESVIucmVsYXRpdmUodGhpcy5TT1VSQ0VfRElSKTtcbiAgcmV0dXJuIHBhdGgucG9zaXguam9pbih0aGlzLlBST0pFQ1RfTkFNRSwgdGFnKTtcbn1cblxuVXNlckNvbnRleHQucHJvdG90eXBlLl9fc2NvcGUgPSBmdW5jdGlvbigpIHtcbiAgcmV0dXJuIHRoaXNbU0NPUEVdO1xufVxuXG5Vc2VyQ29udGV4dC5wcm90b3R5cGUuZ2V0Q2FjaGVWYXJpYWJsZXMgPSBmdW5jdGlvbigpIHtcbiAgdGhpcy5sb2dEZWJ1ZyhjdXJyZW50RnVuY3Rpb25OYW1lKCkpO1xuICBjb25zdCByZXN1bHQgPSB7fTtcbiAgZm9yIChjb25zdCBba2V5LCBlbnRyeV0gb2YgT2JqZWN0LmVudHJpZXModGhpc1tHTE9CQUxdLkNBQ0hFKSkge1xuICAgIGNvbnN0IHZhbHVlID0gY29weVZhbHVlKHRoaXNba2V5XSk7XG4gICAgcmVzdWx0W2tleV0gPSB7XG4gICAgICB0eXBlOiBjb3B5VmFsdWUoZW50cnkudHlwZSkgfHwgdHlwZW9mIHZhbHVlLFxuICAgICAgZGVzY3JpcHRpb246IGVudHJ5LmRlc2NyaXB0aW9uIHx8IFwiXCIsXG4gICAgICB2YWx1ZSxcbiAgICB9O1xuICB9XG4gIHJldHVybiByZXN1bHQ7XG59XG5cblVzZXJDb250ZXh0LnByb3RvdHlwZS5hZGRDYWNoZVZhcmlhYmxlcyA9IGZ1bmN0aW9uKHBhcmFtcykge1xuICB0aGlzLmxvZ0RlYnVnKGN1cnJlbnRGdW5jdGlvbk5hbWUoKSk7XG5cbiAgaWYgKHR5cGVvZiBwYXJhbXMgPT09IFwic3RyaW5nXCIpIHtcbiAgICBjb25zdCBzY3JpcHRzID0gdGhpcy5TT1VSQ0VfRElSLnJlc29sdmUocGFyYW1zKTtcbiAgICB0aGlzW0dMT0JBTF0ubG9hZENhY2hlVmFyaWFibGVzKHNjcmlwdHMpO1xuICB9XG4gIGVsc2UgaWYgKHR5cGVvZiBwYXJhbXMgPT09IFwib2JqZWN0XCIpIHtcbiAgICB0aGlzW0dMT0JBTF0uYWRkQ2FjaGVWYXJpYWJsZXMocGFyYW1zKTtcbiAgfVxuICBlbHNlIHtcbiAgICB0aHJvdyBuZXcgRXJyb3IoYFR5cGUgJHtwYXJhbXN9IGNhbm5vdCB1c2UgZm9yIGNhY2hlIHZhcmlhYmxlc2ApO1xuICB9XG5cbiAgdGhpc1tHTE9CQUxdLmNvcHlDYWNoZVZhcmlhYmxlcyh0aGlzKTtcbn1cblxuVXNlckNvbnRleHQucHJvdG90eXBlLmFkZEluY2x1ZGVEaXJlY3RvcmllcyA9IGZ1bmN0aW9uKC4uLmRpcnMpIHtcbiAgZm9yIChjb25zdCBpdGVyIG9mIGRpcnMuZmxhdCgxKSkge1xuICAgIHRoaXMuSU5DTFVERVMucHVzaChJbmNsdWRlRGlyZWN0b3J5LmNyZWF0ZShpdGVyLCB0aGlzLlNPVVJDRV9ESVIpKTtcbiAgfVxufVxuXG5Vc2VyQ29udGV4dC5wcm90b3R5cGUuYWRkU3ViZGlyZWN0b3J5ID0gZnVuY3Rpb24oc291cmNlRGlyLCBiaW5hcnlEaXIpIHtcbiAgdGhpcy5sb2dEZWJ1ZyhjdXJyZW50RnVuY3Rpb25OYW1lKCkpO1xuXG4gIGJpbmFyeURpciA9IGJpbmFyeURpciB8fCBwYXRoLmlzQWJzb2x1dGUoc291cmNlRGlyKSA/IHVuZGVmaW5lZCA6IHNvdXJjZURpcjtcblxuICBjb25zdCBTT1VSQ0VfRElSID0gcGF0aC5pc0Fic29sdXRlKHNvdXJjZURpcikgPyBBYnNvbHV0ZVBhdGguY3JlYXRlKHNvdXJjZURpcikgOiB0aGlzLlNPVVJDRV9ESVIuam9pbihzb3VyY2VEaXIpO1xuICBjb25zdCBCSU5BUllfRElSID0gcGF0aC5pc0Fic29sdXRlKGJpbmFyeURpcikgPyBBYnNvbHV0ZVBhdGguY3JlYXRlKGJpbmFyeURpcikgOiB0aGlzLkJJTkFSWV9ESVIuam9pbihiaW5hcnlEaXIpO1xuXG4gIGNvbnN0IG5ld1Njb3BlID0gdGhpc1tTQ09QRV0uY2xvbmUoKTtcblxuICBuZXdTY29wZS5TT1VSQ0VfRElSID0gQWJzb2x1dGVQYXRoLmNyZWF0ZSh0aGlzW0dMT0JBTF0ucmVzb2x2ZVN1YmRpcmVjdG9yeShTT1VSQ0VfRElSKS50b1N0cmluZygpKTtcbiAgbmV3U2NvcGUuQklOQVJZX0RJUiA9IEJJTkFSWV9ESVI7XG4gIFxuICBjb25zdCBuZXdDb250ZXggPSBVc2VyQ29udGV4dC5jcmVhdGUobmV3U2NvcGUsIHRoaXNbR0xPQkFMXSk7XG4gIGZvciAoY29uc3QgW2tleSwgdmFsXSBvZiBPYmplY3QuZW50cmllcyh0aGlzKSkge1xuICAgIGlmICghT2JqZWN0Lmhhc093bihTeXN0ZW1WYXJpYWJsZXMucHJvdG90eXBlLCBrZXkpKVxuICAgICAgbmV3Q29udGV4W2tleV0gPSB2YWw7XG4gIH1cblxuICB0aGlzW0dMT0JBTF0uYWRkU3ViZGlyZWN0b3J5KG5ld0NvbnRleCk7XG59XG5cblVzZXJDb250ZXh0LnByb3RvdHlwZS5hZGRDdXN0b21TY3JpcHQgPSBmdW5jdGlvbihuYW1lLCBwYXJhbXMpIHtcbiAgdGhpcy5sb2dEZWJ1ZyhjdXJyZW50RnVuY3Rpb25OYW1lKCksIG5hbWUpO1xuXG4gIGNvbnN0IG5ld1Njb3BlID0gdGhpc1tTQ09QRV0uY2xvbmUoKTtcbiAgY29uc3QgdGFyZ2V0ID0gYml0bWFrZS5DdXN0b21TY3JpcHQuY3JlYXRlKG5ld1Njb3BlLCBuYW1lLCBwYXJhbXMpO1xuICB0aGlzW0dMT0JBTF0uU0NSSVBUUy5zZXQobmFtZSwgdGFyZ2V0KTtcbiAgcmV0dXJuIHRhcmdldDtcbn1cblxuVXNlckNvbnRleHQucHJvdG90eXBlLnRhcmdldCA9IGZ1bmN0aW9uKG5hbWUpIHtcbiAgY29uc3QgdXRhcmdldCA9IHRoaXNbR0xPQkFMXS5nZXRVa25vd25UYXJnZXQobmFtZSk7XG4gIHJldHVybiBJbnRlcmZhY2VUYXJnZXQuY3JlYXRlKHRoaXNbU0NPUEVdLCB1dGFyZ2V0KTtcbn1cblxuVXNlckNvbnRleHQucHJvdG90eXBlLnNjcmlwdCA9IGZ1bmN0aW9uKG5hbWUpIHtcbiAgdGhpcy5sb2dEZWJ1ZyhjdXJyZW50RnVuY3Rpb25OYW1lKCksIG5hbWUpO1xuXG4gIGxldCBzY3JpcHQgPSB0aGlzW0dMT0JBTF0uSU5URVJGQUNFX1NDUklQVFNbbmFtZV07XG4gIGlmICghc2NyaXB0KSB7XG4gICAgc2NyaXB0ID0gYml0bWFrZS5JbnRlcmZhY2VTY3JpcHQuY3JlYXRlKG5hbWUpO1xuICAgIHRoaXNbR0xPQkFMXS5JTlRFUkZBQ0VfU0NSSVBUU1tuYW1lXSA9IHNjcmlwdDtcbiAgfVxuXG4gIHJldHVybiBzY3JpcHQ7XG59XG5cblVzZXJDb250ZXh0LnByb3RvdHlwZS5pbnN0YWxsID0gZnVuY3Rpb24odmFsdWUsIHBhcmFtcykge1xuICBmb3IgKGNvbnN0IGl0IG9mIFsgdmFsdWUgXS5mbGF0KDEpKSB7XG4gICAgY29uc3QgaXRlciA9IChpdCBpbnN0YW5jZW9mIEJhc2VUYXJnZXQpID8gdGhpcy50YXJnZXQoaXQuTkFNRSkgOiBpdDtcbiAgICBjb25zdCBlbnRpdHkgPSBiaXRtYWtlLkluc3RhbGxFbnRpdHkuY3JlYXRlKHRoaXMsIGl0ZXIsIHBhcmFtcyk7XG4gICAgdGhpc1tHTE9CQUxdLklOU1RBTExfTElTVC5wdXNoKGVudGl0eSk7XG4gIH1cbn1cblxuVXNlckNvbnRleHQucHJvdG90eXBlLmFkZFN0YXRpY0xpYnJhcnkgPSBmdW5jdGlvbihuYW1lLCAuLi5zb3VyY2VzKSB7XG4gIHRoaXMubG9nRGVidWcoY3VycmVudEZ1bmN0aW9uTmFtZSgpLCBuYW1lKTtcblxuICBjb25zdCB0YXJnZXQgPSBiaXRtYWtlLlN0YXRpY0xpYnJhcnkuY3JlYXRlKHRoaXNbU0NPUEVdLCBuYW1lKTtcbiAgdGFyZ2V0LmFkZFNvdXJjZXMoLi4uc291cmNlcyk7XG5cbiAgdGhpc1tHTE9CQUxdLlRBUkdFVFMuc2V0KG5hbWUsIHRhcmdldCk7XG4gIHJldHVybiB0YXJnZXQ7XG59XG5cblVzZXJDb250ZXh0LnByb3RvdHlwZS5hZGRPYmplY3RMaWJyYXJ5ID0gZnVuY3Rpb24obmFtZSwgLi4uc291cmNlcykge1xuICB0aGlzLmxvZ0RlYnVnKGN1cnJlbnRGdW5jdGlvbk5hbWUoKSwgbmFtZSk7XG5cbiAgY29uc3QgdGFyZ2V0ID0gYml0bWFrZS5PYmplY3RMaWJyYXJ5LmNyZWF0ZSh0aGlzW1NDT1BFXSwgbmFtZSk7XG4gIHRhcmdldC5hZGRTb3VyY2VzKC4uLnNvdXJjZXMpO1xuXG4gIHRoaXNbR0xPQkFMXS5UQVJHRVRTLnNldChuYW1lLCB0YXJnZXQpO1xuICByZXR1cm4gdGFyZ2V0O1xufVxuXG5Vc2VyQ29udGV4dC5wcm90b3R5cGUuYWRkU2hhcmVkTGlicmFyeSA9IGZ1bmN0aW9uKG5hbWUsIC4uLnNvdXJjZXMpIHtcbiAgdGhpcy5sb2dEZWJ1ZyhjdXJyZW50RnVuY3Rpb25OYW1lKCksIG5hbWUpO1xuXG4gIGNvbnN0IHRhcmdldCA9IGJpdG1ha2UuU2hhcmVkTGlicmFyeS5jcmVhdGUodGhpc1tTQ09QRV0sIG5hbWUpO1xuICB0YXJnZXQuYWRkU291cmNlcyguLi5zb3VyY2VzKTtcblxuICB0aGlzW0dMT0JBTF0uVEFSR0VUUy5zZXQobmFtZSwgdGFyZ2V0KTtcbiAgcmV0dXJuIHRhcmdldDtcbn1cblxuVXNlckNvbnRleHQucHJvdG90eXBlLmFkZEV4ZWN1dGFibGUgPSBmdW5jdGlvbihuYW1lLCAuLi5zb3VyY2VzKSB7XG4gIHRoaXMubG9nRGVidWcoY3VycmVudEZ1bmN0aW9uTmFtZSgpLCBuYW1lKTtcblxuICBjb25zdCB0YXJnZXQgPSBiaXRtYWtlLkV4ZWN1dGFibGUuY3JlYXRlKHRoaXNbU0NPUEVdLCBuYW1lKTtcbiAgdGFyZ2V0LmFkZFNvdXJjZXMoLi4uc291cmNlcyk7XG5cbiAgdGhpc1tHTE9CQUxdLlRBUkdFVFMuc2V0KG5hbWUsIHRhcmdldCk7XG4gIHJldHVybiB0YXJnZXQ7XG59XG5cblVzZXJDb250ZXh0LnByb3RvdHlwZS5maW5kUHJvZ3JhbSA9IGZ1bmN0aW9uKG5hbWUpIHtcbiAgdGhpcy5sb2dEZWJ1ZyhjdXJyZW50RnVuY3Rpb25OYW1lKCksIG5hbWUpO1xuXG4gIGlmIChvcy5wbGF0Zm9ybSgpID09PSBcIndpbjMyXCIgJiYgIW5hbWUuZW5kc1dpdGgoXCIuZXhlXCIpKVxuICAgIG5hbWUgKz0gXCIuZXhlXCI7XG5cbiAgY29uc3QgcGF0aHMgPSBwcm9jZXNzLmVudi5QQVRILnNwbGl0KHBhdGgucG9zaXguZGVsaW1pdGVyKTtcbiAgZm9yIChjb25zdCBpdGVyIG9mIHBhdGhzKSB7XG4gICAgY29uc3QgZmlsZW5hbWUgPSBwYXRoLnBvc2l4LnJlc29sdmUoaXRlciwgbmFtZSk7XG4gICAgaWYgKGZpbGVFeGlzdHNTeW5jKGZpbGVuYW1lKSlcbiAgICAgIHJldHVybiBmaWxlbmFtZTtcbiAgfVxuXG4gIHJldHVybiBudWxsO1xufVxuXG5Vc2VyQ29udGV4dC5wcm90b3R5cGUuZXhlY3V0ZVNjcmlwdCA9IGZ1bmN0aW9uKHNjcmlwdCwgb3B0aW9ucykge1xuICB0aGlzLmxvZ0RlYnVnKGN1cnJlbnRGdW5jdGlvbk5hbWUoKSwgc2NyaXB0KTtcbiAgY29uc3Qgc2NyaXB0UGF0aCA9IHRoaXMuU09VUkNFX0RJUi5yZXNvbHZlKHNjcmlwdCk7XG4gIGNvbnN0IG1vZHVsZSA9IHJlcXVpcmVJbXBsKHNjcmlwdFBhdGgudG9TdHJpbmcoKSk7XG4gIG1vZHVsZShzY29wZVZhbHVlQXNQcmltaXRpdmVzKG9wdGlvbnMpKTtcbn1cblxuVXNlckNvbnRleHQucHJvdG90eXBlLnRvSlNPTiA9IGZ1bmN0aW9uKCkge1xuICBjb25zdCBqc29uID0ge307XG4gIGZvciAoY29uc3Qga2V5IGluIHRoaXMpXG4gICAganNvbltrZXldID0gdGhpc1trZXldO1xuICByZXR1cm4ganNvbjtcbn1cblxubW9kdWxlLmV4cG9ydHMgPSB7XG4gIFVzZXJDb250ZXh0LFxufTtcbiIsIlwidXNlIHN0cmljdFwiO1xuXG5jb25zdCB7IFN5c3RlbVZhcmlhYmxlcyB9ID0gcmVxdWlyZShcIi4vU3lzdGVtVmFyaWFibGVzLmpzXCIpO1xuY29uc3QgeyBTb3VyY2VGaWxlIH0gPSByZXF1aXJlKFwiLi9Tb3VyY2VGaWxlLmpzXCIpO1xuY29uc3QgeyBTb3VyY2VGaWxlTGlzdCB9ID0gcmVxdWlyZShcIi4vU291cmNlRmlsZUxpc3QuanNcIik7XG5jb25zdCB7IE9iamVjdExpYnJhcnksIFN0YXRpY0xpYnJhcnksIFNoYXJlZExpYnJhcnksIEV4ZWN1dGFibGUgfSA9IHJlcXVpcmUoXCIuL1RhcmdldC5qc1wiKTtcbmNvbnN0IHsgQ3VzdG9tU2NyaXB0IH0gPSByZXF1aXJlKFwiLi9DdXN0b21TY3JpcHQuanNcIik7XG5jb25zdCB7IEludGVyZmFjZVRhcmdldCB9ID0gcmVxdWlyZShcIi4vSW50ZXJmYWNlVGFyZ2V0LmpzXCIpO1xuY29uc3QgeyBJbnRlcmZhY2VJbmNsdWRlcyB9ID0gcmVxdWlyZShcIi4vSW50ZXJmYWNlSW5jbHVkZXMuanNcIik7XG5jb25zdCB7IEludGVyZmFjZU9iamVjdHMgfSA9IHJlcXVpcmUoXCIuL0ludGVyZmFjZU9iamVjdHMuanNcIik7XG5jb25zdCB7IEludGVyZmFjZVNjcmlwdCB9ID0gcmVxdWlyZShcIi4vSW50ZXJmYWNlU2NyaXB0LmpzXCIpO1xuY29uc3QgeyBTY3JpcHRDb2xsZWN0aW9uIH0gPSByZXF1aXJlKFwiLi9TY3JpcHRDb2xsZWN0aW9uLmpzXCIpO1xuY29uc3QgeyBUYXJnZXRDb2xsZWN0aW9uIH0gPSByZXF1aXJlKFwiLi9UYXJnZXRDb2xsZWN0aW9uLmpzXCIpO1xuY29uc3QgeyBJbnN0YWxsRW50aXR5IH0gPSByZXF1aXJlKFwiLi9JbnN0YWxsRW50aXR5LmpzXCIpO1xuY29uc3QgeyBHbG9iYWxDb250ZXh0IH0gPSByZXF1aXJlKFwiLi9HbG9iYWxDb250ZXh0LmpzXCIpO1xuXG5tb2R1bGUuZXhwb3J0cyA9IHtcbiAgU3lzdGVtVmFyaWFibGVzLFxuICBTb3VyY2VGaWxlLFxuICBTb3VyY2VGaWxlTGlzdCxcbiAgT2JqZWN0TGlicmFyeSxcbiAgU3RhdGljTGlicmFyeSxcbiAgU2hhcmVkTGlicmFyeSxcbiAgRXhlY3V0YWJsZSxcbiAgQ3VzdG9tU2NyaXB0LFxuICBJbnRlcmZhY2VUYXJnZXQsXG4gIEludGVyZmFjZUluY2x1ZGVzLFxuICBJbnRlcmZhY2VPYmplY3RzLFxuICBJbnRlcmZhY2VTY3JpcHQsXG4gIFNjcmlwdENvbGxlY3Rpb24sXG4gIFRhcmdldENvbGxlY3Rpb24sXG4gIEluc3RhbGxFbnRpdHksXG4gIEdsb2JhbENvbnRleHQsXG59O1xuIiwiLypcbiAqIE1JVCBMaWNlbnNlXG4gKlxuICogQ29weXJpZ2h0IChjKSAyMDI1ICBZdXJpaSBZYWt1YmluICh5dXJpaS55YWt1YmluQGdtYWlsLmNvbSlcbiAqXG4gKiBQZXJtaXNzaW9uIGlzIGdyYW50ZWQgdG8gdXNlLCBjb3B5LCBtb2RpZnksIGFuZCBkaXN0cmlidXRlIHRoaXMgc29mdHdhcmVcbiAqIHVuZGVyIHRoZSBNSVQgTGljZW5zZS4gU2VlIExJQ0VOU0UgZmlsZSBmb3IgZGV0YWlscy5cbiAqL1xuXG5leHBvcnQgZW51bSBCb29sZWFuVHlwZSB7XG4gIE9OID0gXCJPTlwiLFxuICBPRkYgPSBcIk9GRlwiLFxufTtcblxuLy8gRW51bSByZXByZXNlbnRpbmcgdmFsdWUgdHlwZXMgdXNlZCBpbiBDTWFrZSBjYWNoZSB2YXJpYWJsZXNcbmV4cG9ydCBlbnVtIFZhbHVlVHlwZSB7XG4gIC8vIFJlcHJlc2VudHMgYSBmdWxsIHBhdGggdG8gYSBmaWxlXG4gIEZJTEVQQVRIID0gXCJGSUxFUEFUSFwiLFxuXG4gIC8vIFJlcHJlc2VudHMgYSBwYXRoIHRvIGEgZGlyZWN0b3J5XG4gIFBBVEggPSBcIlBBVEhcIixcblxuICAvLyBSZXByZXNlbnRzIGEgYm9vbGVhbiB2YWx1ZSAodHJ1ZS9mYWxzZSlcbiAgQk9PTCA9IFwiQk9PTFwiLFxuXG4gIC8vIFJlcHJlc2VudHMgYSBnZW5lcmljIHN0cmluZyB2YWx1ZVxuICBTVFJJTkcgPSBcIlNUUklOR1wiLFxufTtcblxuLy8gQnVpbGRUeXBlIHJlcHJlc2VudGluZyBjb21tb24gQ01ha2UgYnVpbGQgdHlwZXNcbmV4cG9ydCBlbnVtIEJ1aWxkVHlwZSB7XG4gIC8vIERlYnVnIGJ1aWxkIHR5cGU6IGluY2x1ZGVzIGRlYnVnIHN5bWJvbHMsIG5vIG9wdGltaXphdGlvblxuICBEZWJ1ZyA9IFwiRGVidWdcIixcblxuICAvLyBSZWxlYXNlIGJ1aWxkIHR5cGU6IG9wdGltaXplZCBjb2RlLCBubyBkZWJ1ZyBpbmZvXG4gIFJlbGVhc2UgPSBcIlJlbGVhc2VcIixcblxuICAvLyBSZWxlYXNlIHdpdGggZGVidWcgaW5mbzogb3B0aW1pemVkIHdpdGggZGVidWcgc3ltYm9scyBpbmNsdWRlZFxuICBSZWxXaXRoRGViSW5mbyA9IFwiUmVsV2l0aERlYkluZm9cIixcblxuICAvLyBNaW5pbXVtIHNpemUgcmVsZWFzZTogb3B0aW1pemVkIGZvciBzbWFsbGVzdCBiaW5hcnkgc2l6ZVxuICBNaW5TaXplUmVsID0gXCJNaW5TaXplUmVsXCIsXG59O1xuXG4vLyBUaGUgZGVmYXVsdCBuYW1lIG9mIHRoZSBtYWluIENNYWtlIGJ1aWxkIGNvbmZpZ3VyYXRpb24gZmlsZVxuZXhwb3J0IGNvbnN0IENNQUtFX0xJU1RTX1RYVCA9IFwiQ01ha2VMaXN0cy50eHRcIjtcbiIsIi8qXG4gKiBNSVQgTGljZW5zZVxuICpcbiAqIENvcHlyaWdodCAoYykgMjAyNSAgWXVyaWkgWWFrdWJpbiAoeXVyaWkueWFrdWJpbkBnbWFpbC5jb20pXG4gKlxuICogUGVybWlzc2lvbiBpcyBncmFudGVkIHRvIHVzZSwgY29weSwgbW9kaWZ5LCBhbmQgZGlzdHJpYnV0ZSB0aGlzIHNvZnR3YXJlXG4gKiB1bmRlciB0aGUgTUlUIExpY2Vuc2UuIFNlZSBMSUNFTlNFIGZpbGUgZm9yIGRldGFpbHMuXG4gKi9cblxuaW1wb3J0IHsgQm9vbGVhblR5cGUgfSBmcm9tIFwiQC9jbWFrZS9Db25zdGFudHNcIjtcblxuZXhwb3J0IGZ1bmN0aW9uIGNvbnZlcnRUb1ZhbHVlKG9iajogYW55KTogc3RyaW5nIHtcbiAgaWYgKEFycmF5LmlzQXJyYXkob2JqKSlcbiAgICByZXR1cm4gb2JqLm1hcChpID0+IGNvbnZlcnRUb1ZhbHVlKGkpKS5qb2luKFwiO1wiKTtcblxuICBpZiAodHlwZW9mIG9iaiA9PT0gXCJib29sZWFuXCIpXG4gICAgcmV0dXJuIG9iaiA/IEJvb2xlYW5UeXBlLk9OIDogQm9vbGVhblR5cGUuT0ZGO1xuXG4gIHJldHVybiBvYmoudG9TdHJpbmcoKTtcbn1cbiIsIi8qXG4gKiBNSVQgTGljZW5zZVxuICpcbiAqIENvcHlyaWdodCAoYykgMjAyNSAgWXVyaWkgWWFrdWJpbiAoeXVyaWkueWFrdWJpbkBnbWFpbC5jb20pXG4gKlxuICogUGVybWlzc2lvbiBpcyBncmFudGVkIHRvIHVzZSwgY29weSwgbW9kaWZ5LCBhbmQgZGlzdHJpYnV0ZSB0aGlzIHNvZnR3YXJlXG4gKiB1bmRlciB0aGUgTUlUIExpY2Vuc2UuIFNlZSBMSUNFTlNFIGZpbGUgZm9yIGRldGFpbHMuXG4gKi9cblxuaW1wb3J0IHBhdGggZnJvbSBcIm5vZGU6cGF0aFwiO1xuaW1wb3J0IGZzIGZyb20gXCJub2RlOmZzXCI7XG5pbXBvcnQgeyBzcGF3blN5bmMgfSBmcm9tIFwibm9kZTpjaGlsZF9wcm9jZXNzXCI7XG5cbmltcG9ydCB7IGltcG9ydE1vZHVsZSB9IGZyb20gXCJAL3V0aWxzL01vZHVsZVwiO1xuXG5pbXBvcnQgY29uZmlndXJlX2ZpbGUgZnJvbSBcIkAvYml0bWFrZS9TeXN0ZW1TY3JpcHRzL2NvbmZpZ3VyZV9maWxlLmpzXCI7XG5pbXBvcnQgaW5zdGFsbF9zY3JpcHQgZnJvbSBcIkAvYml0bWFrZS9TeXN0ZW1TY3JpcHRzL2luc3RhbGxfc2NyaXB0LmpzXCI7XG5cbmNvbnN0IEVOVFJJRVMgPSBTeW1ib2woXCJFTlRSSUVTXCIpO1xuXG5lbnVtIEdvYWxUeXBlIHtcbiAgU0NSSVBUID0gXCJzY3JpcHRcIixcbiAgRVhFQyA9IFwiZXhlY1wiLFxuICBUQVJHRVQgPSBcInRhcmdldFwiLFxufTtcblxuaW50ZXJmYWNlIEJhc2VHb2FsIHtcbiAgbmFtZTogc3RyaW5nO1xuICB0eXBlOiBHb2FsVHlwZTtcbiAgZGVwZW5kczogQXJyYXk8c3RyaW5nPjtcbiAgbXNnOiBzdHJpbmc7XG4gIG91dHB1dDogc3RyaW5nO1xufTtcblxuaW50ZXJmYWNlIFNjcmlwdEdvYWwgZXh0ZW5kcyBCYXNlR29hbCB7XG4gIHNjcmlwdDogc3RyaW5nO1xuICBwYXJhbXM6IGFueTtcbn07XG5cbmludGVyZmFjZSBFeGVjR29hbCBleHRlbmRzIEJhc2VHb2FsIHtcbiAgY29tbWFuZDogc3RyaW5nO1xuICBhcmdzOiBBcnJheTxzdHJpbmc+O1xuICBjd2Q6IHN0cmluZztcbn07XG5cbmV4cG9ydCBjbGFzcyBHb2FsQ29sbGVjdGlvbiB7XG4gIHByaXZhdGUgW0VOVFJJRVNdOiBBcnJheTxCYXNlR29hbD47XG5cbiAgcHJpdmF0ZSBjb25zdHJ1Y3RvcigpIHtcbiAgICB0aGlzW0VOVFJJRVNdID0gbmV3IEFycmF5PEJhc2VHb2FsPjtcbiAgfVxuXG4gIHB1YmxpYyBnZXQgRU5UUklFUygpIHtcbiAgICByZXR1cm4gdGhpc1tFTlRSSUVTXTtcbiAgfVxuXG4gIHB1YmxpYyBzdGF0aWMgY3JlYXRlKCkge1xuICAgIHJldHVybiBPYmplY3Quc2VhbChuZXcgR29hbENvbGxlY3Rpb24pO1xuICB9XG5cbiAgcHVibGljIGZpbmRTY3JpcHRCeU91dHB1dChvdXRwdXQ6IHN0cmluZyk6IEJhc2VHb2FsIHwgdW5kZWZpbmVkIHtcbiAgICBpZiAoIW91dHB1dClcbiAgICAgIHJldHVybiB1bmRlZmluZWQ7XG4gICAgcmV0dXJuIHRoaXNbRU5UUklFU10uZmluZCgoaSkgPT4gaS50eXBlID09PSBHb2FsVHlwZS5TQ1JJUFQgJiYgaS5vdXRwdXQgPT09IG91dHB1dCk7XG4gIH1cblxuICBwdWJsaWMgaGFzU2NyaXB0QnlPdXRwdXQob3V0cHV0OiBzdHJpbmcpOiBib29sZWFuIHtcbiAgICByZXR1cm4gISF0aGlzLmZpbmRTY3JpcHRCeU91dHB1dChvdXRwdXQpO1xuICB9XG5cbiAgcHVibGljIGFkZFNjcmlwdChzY3JpcHQ6IHN0cmluZywgbmFtZTogc3RyaW5nLCBkZXBlbmRzOiBBcnJheTxzdHJpbmc+LCBvdXRwdXQ6IHN0cmluZywgcGFyYW1zOiBhbnksIG1zZzogc3RyaW5nKSB7XG4gICAgaWYgKHRoaXMuaGFzU2NyaXB0QnlPdXRwdXQob3V0cHV0LnRvU3RyaW5nKCkpKVxuICAgICAgdGhyb3cgbmV3IEVycm9yKGBPdXRwdXQgXCIke291dHB1dH1cIiBleGlzdHNgKTtcbiAgICB0aGlzW0VOVFJJRVNdLnB1c2goeyBuYW1lLCB0eXBlOiBHb2FsVHlwZS5TQ1JJUFQsIHNjcmlwdCwgb3V0cHV0LCBkZXBlbmRzLCBwYXJhbXMsIG1zZyB9IGFzIFNjcmlwdEdvYWwpO1xuICB9XG5cbiAgcHVibGljIGFkZEV4ZWMob3V0cHV0OiBzdHJpbmcsIGRlcGVuZHM6IEFycmF5PHN0cmluZz4sIGNvbW1hbmQ6IHN0cmluZywgYXJnczogQXJyYXk8c3RyaW5nPiwgY3dkOiBzdHJpbmcsIG1zZzogc3RyaW5nKSB7XG4gICAgdGhpc1tFTlRSSUVTXS5wdXNoKHsgbmFtZTogXCJcIiwgdHlwZTogR29hbFR5cGUuRVhFQywgZGVwZW5kcywgb3V0cHV0LCBjb21tYW5kLCBhcmdzLCBjd2QsIG1zZyB9IGFzIEV4ZWNHb2FsKTtcbiAgfVxuXG4gIHB1YmxpYyBhZGRUYXJnZXQobmFtZTogc3RyaW5nLCBkZXBlbmRzOiBBcnJheTxzdHJpbmc+LCBtc2c6IHN0cmluZykge1xuICAgIHRoaXNbRU5UUklFU10ucHVzaCh7IG5hbWUsIHR5cGU6IEdvYWxUeXBlLlRBUkdFVCwgZGVwZW5kcywgbXNnLCBvdXRwdXQ6IFwiXCIgfSk7XG4gIH1cblxuICBwdWJsaWMgZ2V0VGFyZ2V0KG5hbWU6IHN0cmluZyk6IEJhc2VHb2FsIHwgdW5kZWZpbmVkIHtcbiAgICByZXR1cm4gdGhpc1tFTlRSSUVTXS5maW5kKChpKSA9PiBpLnR5cGUgPT09IEdvYWxUeXBlLlRBUkdFVCAmJiBpLm5hbWUgPT09IG5hbWUpO1xuICB9XG5cbiAgcHJpdmF0ZSBhZGRUYXJnZXRMaXN0SW1wbChuYW1lOiBzdHJpbmcsIHJlc3VsdDogQXJyYXk8QmFzZUdvYWw+KSB7XG4gICAgaWYgKHJlc3VsdC5maW5kKGkgPT4gaS5uYW1lID09PSBuYW1lIHx8IGkub3V0cHV0ID09PSBuYW1lKSkge1xuICAgICAgcmV0dXJuO1xuICAgIH1cbiAgXG4gICAgY29uc3QgZ29hbCA9IHRoaXNbRU5UUklFU10uZmluZChpID0+IGkubmFtZSA9PT0gbmFtZSB8fCBpLm91dHB1dCA9PT0gbmFtZSk7XG4gICAgaWYgKCFnb2FsKSB7XG4gICAgICByZXR1cm47XG4gICAgfVxuICBcbiAgICBmb3IgKGNvbnN0IGl0ZXIgb2YgZ29hbC5kZXBlbmRzKSB7XG4gICAgICB0aGlzLmFkZFRhcmdldExpc3RJbXBsKGl0ZXIudG9TdHJpbmcoKSwgcmVzdWx0KTtcbiAgICB9XG4gIFxuICAgIHJlc3VsdC5wdXNoKGdvYWwpO1xuICB9XG4gIFxuICBwdWJsaWMgZ2V0VGFyZ2V0TGlzdChuYW1lOnN0cmluZykge1xuICAgIGNvbnN0IHJlc3VsdCA9IG5ldyBBcnJheTxCYXNlR29hbD47XG4gICAgdGhpcy5hZGRUYXJnZXRMaXN0SW1wbChuYW1lLCByZXN1bHQpO1xuICAgIHJldHVybiByZXN1bHQ7XG4gIH1cbiAgXG4gIHB1YmxpYyB0b0pTT04oKSB7XG4gICAgcmV0dXJuIHRoaXNbRU5UUklFU107XG4gIH1cblxuICBwdWJsaWMgc3RhdGljIGFzeW5jIGJ1aWxkR29hbHMoY29sbGVjdGlvbjogQXJyYXk8QmFzZUdvYWw+KSB7XG4gICAgbGV0IG1zZ0NvdW50ID0gMDtcbiAgICBmb3IgKGNvbnN0IGl0ZXIgb2YgY29sbGVjdGlvbilcbiAgICAgIG1zZ0NvdW50ICs9IGl0ZXIubXNnID8gMSA6IDA7XG4gIFxuICAgIGxldCBtc2dJbmRleCA9IDA7XG4gICAgZm9yIChjb25zdCBnb2FsIG9mIGNvbGxlY3Rpb24pIHtcbiAgICAgIGNvbnN0IHsgdHlwZSwgbXNnIH0gPSBnb2FsO1xuICAgICAgaWYgKG1zZykge1xuICAgICAgICBjb25zdCByZWxhdGlvbk9mTGVuZ3RoID0gTWF0aC5yb3VuZCgoKyttc2dJbmRleCAvIG1zZ0NvdW50KSAqIDEwMCk7XG4gICAgICAgIGNvbnN0IHBlcmNlbnQgPSBcIltcIiArIHJlbGF0aW9uT2ZMZW5ndGgudG9TdHJpbmcoKS5wYWRTdGFydCgzLCBcIiBcIikgKyBcIiVdIFwiO1xuICAgICAgICBjb25zb2xlLmluZm8ocGVyY2VudCArIG1zZyk7XG4gICAgICB9XG4gICAgICBpZiAodHlwZSA9PT0gR29hbFR5cGUuU0NSSVBUKSB7XG4gICAgICAgIGNvbnN0IHsgc2NyaXB0LCBwYXJhbXMgfSA9IGdvYWwgYXMgU2NyaXB0R29hbDtcbiAgICAgICAgbGV0IG1vZHVsZTtcbiAgICAgICAgaWYgKHNjcmlwdC50b1N0cmluZygpID09PSBwYXRoLnBvc2l4LmpvaW4oX19kaXJuYW1lLCBcIlN5c3RlbVNjcmlwdHMvY29uZmlndXJlX2ZpbGUuanNcIikpXG4gICAgICAgICAgbW9kdWxlID0gY29uZmlndXJlX2ZpbGU7XG4gICAgICAgIGVsc2UgaWYgKHNjcmlwdC50b1N0cmluZygpID09PSBwYXRoLnBvc2l4LmpvaW4oX19kaXJuYW1lLCBcIlN5c3RlbVNjcmlwdHMvaW5zdGFsbF9zY3JpcHQuanNcIikpXG4gICAgICAgICAgbW9kdWxlID0gaW5zdGFsbF9zY3JpcHQ7XG4gICAgICAgIGVsc2VcbiAgICAgICAgICBtb2R1bGUgPSAoYXdhaXQgaW1wb3J0TW9kdWxlKHNjcmlwdC50b1N0cmluZygpKSkuZGVmYXVsdDtcbiAgICAgICAgY29uc3QgcmVzdWx0ID0gbW9kdWxlKHBhcmFtcyk7XG4gICAgICAgIGlmIChyZXN1bHQgaW5zdGFuY2VvZiBQcm9taXNlKSB7XG4gICAgICAgICAgYXdhaXQgcmVzdWx0O1xuICAgICAgICB9XG4gICAgICB9XG4gICAgICBlbHNlIGlmICh0eXBlID09PSBHb2FsVHlwZS5FWEVDKSB7XG4gICAgICAgIGNvbnN0IHsgY29tbWFuZCwgYXJncywgY3dkLCBvdXRwdXQgfSA9IGdvYWwgYXMgRXhlY0dvYWw7XG4gICAgICAgIGZzLm1rZGlyU3luYyhwYXRoLnBvc2l4LmRpcm5hbWUob3V0cHV0KSwgeyByZWN1cnNpdmU6IHRydWUgfSk7XG4gICAgICAgIGNvbnN0IHJlc3VsdCA9IHNwYXduU3luYyhjb21tYW5kLCBhcmdzLCB7IGN3ZCwgZW5jb2Rpbmc6IFwidXRmLThcIiB9KTtcbiAgICAgICAgaWYgKHJlc3VsdC5zdGF0dXMpIHtcbiAgICAgICAgICBjb25zb2xlLmluZm8oXCJjZCBcIiArIGN3ZCk7XG4gICAgICAgICAgbGV0IGNtZCA9IGFyZ3Muam9pbihcIiBcIik7XG4gICAgICAgICAgY21kID0gY29tbWFuZCArIChjbWQgPyBcIiBcIiA6IFwiXCIpICsgY21kO1xuICAgICAgICAgIGNvbnNvbGUuaW5mbyhjbWQpO1xuICAgICAgICAgIGNvbnNvbGUuaW5mbyhcIlwiKTtcbiAgXG4gICAgICAgICAgY29uc29sZS5lcnJvcihyZXN1bHQuc3RkZXJyKTtcbiAgXG4gICAgICAgICAgdGhyb3cgbmV3IEVycm9yKFwiU3RhdHVzIFwiICsgcmVzdWx0LnN0YXR1cyk7XG4gICAgICAgIH1cbiAgICAgIH1cbiAgICAgIGVsc2UgaWYgKHR5cGUgPT09IEdvYWxUeXBlLlRBUkdFVCkge1xuICAgICAgfVxuICAgIH1cbiAgfVxufTtcbiIsIi8qXG4gKiBNSVQgTGljZW5zZVxuICpcbiAqIENvcHlyaWdodCAoYykgMjAyNSAgWXVyaWkgWWFrdWJpbiAoeXVyaWkueWFrdWJpbkBnbWFpbC5jb20pXG4gKlxuICogUGVybWlzc2lvbiBpcyBncmFudGVkIHRvIHVzZSwgY29weSwgbW9kaWZ5LCBhbmQgZGlzdHJpYnV0ZSB0aGlzIHNvZnR3YXJlXG4gKiB1bmRlciB0aGUgTUlUIExpY2Vuc2UuIFNlZSBMSUNFTlNFIGZpbGUgZm9yIGRldGFpbHMuXG4gKi9cblxuY29uc3QgTkFNRSA9IFN5bWJvbChcIk5BTUVcIik7XG5jb25zdCBQQVRIID0gU3ltYm9sKFwiUEFUSFwiKTtcblxuZXhwb3J0IGNsYXNzIEluY2x1ZGVEaXJlY3Rvcnkge1xuICBwcml2YXRlIFtOQU1FXTogYW55O1xuICBwcml2YXRlIFtQQVRIXTogYW55O1xuXG4gIHByaXZhdGUgY29uc3RydWN0b3IoZGlybmFtZTogYW55LCBiYXNlRGlyOiBhbnkpIHtcbiAgICB0aGlzW05BTUVdID0gZGlybmFtZS50b1N0cmluZygpO1xuICAgIHRoaXNbUEFUSF0gPSBiYXNlRGlyLnJlc29sdmUoZGlybmFtZSk7XG4gIH1cblxuICBwdWJsaWMgc3RhdGljIGNyZWF0ZShkaXJuYW1lOiBhbnksIGJhc2VEaXI6IGFueSkge1xuICAgIHJldHVybiBPYmplY3Quc2VhbChuZXcgSW5jbHVkZURpcmVjdG9yeShkaXJuYW1lLCBiYXNlRGlyKSk7XG4gIH1cblxuICBnZXQgTkFNRSgpIHtcbiAgICByZXR1cm4gdGhpc1tOQU1FXTtcbiAgfVxuXG4gIGdldCBQQVRIKCkge1xuICAgIHJldHVybiB0aGlzW1BBVEhdO1xuICB9XG5cbiAgdG9TdHJpbmcoKSB7XG4gICAgcmV0dXJuIHRoaXNbUEFUSF0udG9TdHJpbmcoKTtcbiAgfVxuXG4gIHRvSlNPTigpIHtcbiAgICBjb25zdCBqc29uOiBhbnkgPSB7fTtcbiAgICBmb3IgKGNvbnN0IGtleSBpbiB0aGlzKVxuICAgICAganNvbltrZXldID0gdGhpc1trZXldO1xuICAgIHJldHVybiBqc29uO1xuICB9XG59O1xuIiwiLypcbiAqIE1JVCBMaWNlbnNlXG4gKlxuICogQ29weXJpZ2h0IChjKSAyMDI1ICBZdXJpaSBZYWt1YmluICh5dXJpaS55YWt1YmluQGdtYWlsLmNvbSlcbiAqXG4gKiBQZXJtaXNzaW9uIGlzIGdyYW50ZWQgdG8gdXNlLCBjb3B5LCBtb2RpZnksIGFuZCBkaXN0cmlidXRlIHRoaXMgc29mdHdhcmVcbiAqIHVuZGVyIHRoZSBNSVQgTGljZW5zZS4gU2VlIExJQ0VOU0UgZmlsZSBmb3IgZGV0YWlscy5cbiAqL1xuXG5pbXBvcnQgcGF0aCBmcm9tIFwibm9kZTpwYXRoXCI7XG5pbXBvcnQgdXJsIGZyb20gXCJub2RlOnVybFwiO1xuXG5jb25zdCBQQVRIID0gU3ltYm9sKFwiUEFUSFwiKTtcblxuY2xhc3MgQmFzZVBhdGgge1xuICBwcml2YXRlIFtQQVRIXTogc3RyaW5nO1xuXG4gIHByb3RlY3RlZCBjb25zdHJ1Y3RvcihwYXRoU3RyOiBzdHJpbmcpIHtcbiAgICBpZiAoIXBhdGguaXNBYnNvbHV0ZShwYXRoU3RyKSlcbiAgICAgIHRocm93IG5ldyBFcnJvcihgTm90IHN1cHBvcnRlZCByZWxhdGl2ZSBwYXRoIG9mIFwiJHtwYXRoU3RyfVwiYCk7XG4gICAgdGhpc1tQQVRIXSA9IHBhdGhTdHI7XG4gIH1cblxuICBwdWJsaWMgbWF0Y2gocmVnZXhwOiBSZWdFeHApIHtcbiAgICByZXR1cm4gdGhpc1tQQVRIXS5tYXRjaChyZWdleHApO1xuICB9XG5cbiAgcHVibGljIGpvaW4oLi4ucGF0aHM6IEFycmF5PGFueT4pIHtcbiAgICByZXR1cm4gcGF0aC5wb3NpeC5qb2luKHRoaXNbUEFUSF0sIC4uLnBhdGhzLm1hcChpID0+IGkudG9TdHJpbmcoKSkpO1xuICB9XG5cbiAgcHVibGljIGRpcm5hbWUoKSB7XG4gICAgcmV0dXJuIHBhdGgucG9zaXguZGlybmFtZSh0aGlzW1BBVEhdKTtcbiAgfVxuXG4gIHB1YmxpYyBiYXNlbmFtZSgpIHtcbiAgICByZXR1cm4gcGF0aC5iYXNlbmFtZSh0aGlzW1BBVEhdKTtcbiAgfVxuXG4gIHB1YmxpYyByZWxhdGl2ZSh0bzogYW55KSB7XG4gICAgcmV0dXJuIHBhdGgucG9zaXgucmVsYXRpdmUodGhpc1tQQVRIXSwgdG8udG9TdHJpbmcoKSk7XG4gIH1cblxuICBwdWJsaWMgcmVzb2x2ZSguLi5wYXRoczogQXJyYXk8YW55Pikge1xuICAgIHJldHVybiBwYXRoLnBvc2l4LnJlc29sdmUodGhpc1tQQVRIXSwgLi4ucGF0aHMubWFwKGkgPT4gaS50b1N0cmluZygpKSk7XG4gIH1cbiAgXG4gIHB1YmxpYyBpc1BhcmVudERpcihkaXJwYXRoOiBhbnkpIHtcbiAgICByZXR1cm4gdGhpc1tQQVRIXS5zdGFydHNXaXRoKGRpcnBhdGgudG9TdHJpbmcoKSk7XG4gIH1cbiAgXG4gIHB1YmxpYyB0b1VSTCgpIHtcbiAgICByZXR1cm4gdXJsLnBhdGhUb0ZpbGVVUkwodGhpc1tQQVRIXSk7XG4gIH1cbiAgXG4gIHB1YmxpYyBnZXQgUEFUSCgpOiBzdHJpbmcge1xuICAgIHJldHVybiB0aGlzW1BBVEhdO1xuICB9XG5cbiAgcHVibGljIHRvU3RyaW5nKCkge1xuICAgIHJldHVybiB0aGlzW1BBVEhdO1xuICB9XG5cbiAgcHVibGljIHRvSlNPTigpIHtcbiAgICByZXR1cm4gdGhpc1tQQVRIXTtcbiAgfVxufTtcblxuY29uc3QgX3BhdGhzID0gbmV3IE1hcDxzdHJpbmcsIEJhc2VQYXRoPigpO1xuXG5leHBvcnQgY2xhc3MgRmlsZVBhdGggZXh0ZW5kcyBCYXNlUGF0aCB7XG4gIHByaXZhdGUgY29uc3RydWN0b3IocGF0aFN0cjogc3RyaW5nKSB7XG4gICAgc3VwZXIocGF0aFN0cik7XG4gIH1cblxuICBwdWJsaWMgc3RhdGljIGVuc3VyZUluc3RhbmNlKHZhbHVlOiBhbnkpOiBGaWxlUGF0aCB7XG4gICAgaWYgKHZhbHVlIGluc3RhbmNlb2YgRmlsZVBhdGgpXG4gICAgICByZXR1cm4gdmFsdWU7XG4gICAgdGhyb3cgbmV3IEVycm9yKGBUaGUgJyR7dmFsdWV9JyBpcyBub3QgYSBGaWxlUGF0aGApO1xuICB9XG4gIFxuICBwdWJsaWMgc3RhdGljIGNyZWF0ZShwYXRoOiBhbnkpOiBGaWxlUGF0aCB7XG4gICAgaWYgKHBhdGggaW5zdGFuY2VvZiBGaWxlUGF0aClcbiAgICAgIHJldHVybiBwYXRoO1xuXG4gICAgaWYgKHR5cGVvZiBwYXRoICE9PSBcInN0cmluZ1wiKVxuICAgICAgdGhyb3cgbmV3IEVycm9yKGBUaGUgJyR7cGF0aH0nIGlzIG5vdCBhIHN0cmluZ2ApO1xuXG4gICAgbGV0IGZpbGVQYXRoID0gX3BhdGhzLmdldChwYXRoKTtcbiAgICBpZiAoZmlsZVBhdGgpXG4gICAgICByZXR1cm4gRmlsZVBhdGguZW5zdXJlSW5zdGFuY2UoZmlsZVBhdGgpO1xuXG4gICAgZmlsZVBhdGggPSBPYmplY3Quc2VhbChuZXcgRmlsZVBhdGgocGF0aCkpO1xuICAgIF9wYXRocy5zZXQocGF0aCwgZmlsZVBhdGgpO1xuXG4gICAgcmV0dXJuIGZpbGVQYXRoO1xuICB9XG59XG5cbmV4cG9ydCBjbGFzcyBEaXJQYXRoIGV4dGVuZHMgQmFzZVBhdGgge1xuICBwcml2YXRlIGNvbnN0cnVjdG9yKHBhdGhTdHI6IHN0cmluZykge1xuICAgIHN1cGVyKHBhdGhTdHIpO1xuICB9XG5cbiAgcHVibGljIHN0YXRpYyBlbnN1cmVJbnN0YW5jZSh2YWx1ZTogYW55KTogRGlyUGF0aCB7XG4gICAgaWYgKHZhbHVlIGluc3RhbmNlb2YgRGlyUGF0aClcbiAgICAgIHJldHVybiB2YWx1ZTtcbiAgICB0aHJvdyBuZXcgRXJyb3IoYFRoZSAnJHt2YWx1ZX0nIGlzIG5vdCBhIERpclBhdGhgKTtcbiAgfVxuXG4gIHB1YmxpYyBzdGF0aWMgY3JlYXRlKHBhdGg6IGFueSkge1xuICAgIGlmIChwYXRoIGluc3RhbmNlb2YgRGlyUGF0aClcbiAgICAgIHJldHVybiBwYXRoO1xuXG4gICAgaWYgKHR5cGVvZiBwYXRoICE9PSBcInN0cmluZ1wiKVxuICAgICAgdGhyb3cgbmV3IEVycm9yKGBUaGUgJyR7cGF0aH0nIGlzIG5vdCBhIHN0cmluZ2ApO1xuXG4gICAgbGV0IGRpclBhdGggPSBfcGF0aHMuZ2V0KHBhdGgpO1xuICAgIGlmIChkaXJQYXRoKVxuICAgICAgcmV0dXJuIERpclBhdGguZW5zdXJlSW5zdGFuY2UoZGlyUGF0aCk7XG5cbiAgICBkaXJQYXRoID0gT2JqZWN0LnNlYWwobmV3IERpclBhdGgocGF0aCkpO1xuICAgIF9wYXRocy5zZXQocGF0aCwgZGlyUGF0aCk7XG5cbiAgICByZXR1cm4gZGlyUGF0aDtcbiAgfVxufTtcbiIsIi8qXG4gKiBNSVQgTGljZW5zZVxuICpcbiAqIENvcHlyaWdodCAoYykgMjAyNSAgWXVyaWkgWWFrdWJpbiAoeXVyaWkueWFrdWJpbkBnbWFpbC5jb20pXG4gKlxuICogUGVybWlzc2lvbiBpcyBncmFudGVkIHRvIHVzZSwgY29weSwgbW9kaWZ5LCBhbmQgZGlzdHJpYnV0ZSB0aGlzIHNvZnR3YXJlXG4gKiB1bmRlciB0aGUgTUlUIExpY2Vuc2UuIFNlZSBMSUNFTlNFIGZpbGUgZm9yIGRldGFpbHMuXG4gKi9cblxuaW1wb3J0IG9zIGZyb20gXCJub2RlOm9zXCI7XG5pbXBvcnQgeyBERUJVR19CVUlMRF9UWVBFLCBSRUxFQVNFX0JVSUxEX1RZUEUgfSBmcm9tIFwiQC9jb3JlL1R5cGVzXCI7XG5cbmV4cG9ydCBkZWZhdWx0IHtcbiAgUFJPSkVDVF9OQU1FOiB7XG4gICAgZGVzY3JpcHRpb246IFwiTmFtZSBvZiB0aGUgY3VycmVudCBwcm9qZWN0XCIsXG4gICAgdmFsdWU6IFwiXCIsXG4gIH0sXG4gIFBST0pFQ1RfVkVSU0lPTjoge1xuICAgIGRlc2NyaXB0aW9uOiBcIlZlcnNpb24gb2YgdGhlIGN1cnJlbnQgcHJvamVjdFwiLFxuICAgIHZhbHVlOiBcIlwiLFxuICB9LFxuICBQUk9KRUNUX0RFU0NSSVBUSU9OOiB7XG4gICAgZGVzY3JpcHRpb246IFwiRGVzY3JpcHRpb24gb2YgdGhlIGN1cnJlbnQgcHJvamVjdFwiLFxuICAgIHZhbHVlOiBcIlwiLFxuICB9LFxuICBQUk9KRUNUX0hPTUVQQUdFX1VSTDoge1xuICAgIGRlc2NyaXB0aW9uOiBcIkhvbWVwYWdlIFVSTCBvZiB0aGUgY3VycmVudCBwcm9qZWN0XCIsXG4gICAgdmFsdWU6IFwiXCIsXG4gIH0sXG4gIFNZU1RFTV9OQU1FOiB7XG4gICAgZGVzY3JpcHRpb246IFwiRGVmaW5lcyB0aGUgdGFyZ2V0IE9TIGZvciB0aGUgYnVpbGQsIHVzZWQgaW4gY3Jvc3MtY29tcGlsYXRpb24gYW5kIG5hdGl2ZSBidWlsZHNcIixcbiAgICB2YWx1ZTogXCJMaW51eFwiLFxuICB9LFxuICBTWVNURU1fUFJPQ0VTU09SOiB7XG4gICAgZGVzY3JpcHRpb246IFwiRGVmaW5lcyB0aGUgdGFyZ2V0IENQVSBhcmNoaXRlY3R1cmVcIixcbiAgICB2YWx1ZTogXCJ3YXNtMzJcIixcbiAgfSxcbiAgQlVJTERfVFlQRToge1xuICAgIGRlc2NyaXB0aW9uOiBcIlNwZWNpZmllcyB0aGUgYnVpbGQgY29uZmlndXJhdGlvbiBmb3IgY29udHJvbGxpbmcgb3B0aW1pemF0aW9uIGxldmVscyBhbmQgZGVidWcgaW5mb3JtYXRpb24gaW4gdGhlIGJ1aWxkIHByb2Nlc3NcIixcbiAgICB0eXBlOiBbIERFQlVHX0JVSUxEX1RZUEUsIFJFTEVBU0VfQlVJTERfVFlQRSBdLFxuICAgIHZhbHVlOiBSRUxFQVNFX0JVSUxEX1RZUEUsXG4gIH0sXG4gIFBPU0lUSU9OX0lOREVQRU5ERU5UX0NPREU6IHtcbiAgICBkZXNjcmlwdGlvbjogXCJFbmFibGVzIFBvc2l0aW9uLUluZGVwZW5kZW50IENvZGUgKFBJQykgZm9yIGJ1aWxkaW5nIHNoYXJlZCBsaWJyYXJpZXNcIixcbiAgICB2YWx1ZTogZmFsc2UsXG4gIH0sXG4gIFBSRVZFTlRfSU5TVEFMTF9GSUxFUzoge1xuICAgIGRlc2NyaXB0aW9uOiBcIlByZXZlbnQgaW5zdGFsbGF0aW9uIG9mIGZpbGVzXCIsXG4gICAgdmFsdWU6IGZhbHNlLFxuICB9LFxuICBIT1NUX1NZU1RFTV9OQU1FOiB7XG4gICAgZGVzY3JpcHRpb246IFwiU3BlY2lmaWVzIHRoZSBPUyBvZiB0aGUgbWFjaGluZSBydW5uaW5nXCIsXG4gICAgdmFsdWU6IG9zLnR5cGUoKSxcbiAgfSxcbn07XG4iLCIvKlxuICogTUlUIExpY2Vuc2VcbiAqXG4gKiBDb3B5cmlnaHQgKGMpIDIwMjUgIFl1cmlpIFlha3ViaW4gKHl1cmlpLnlha3ViaW5AZ21haWwuY29tKVxuICpcbiAqIFBlcm1pc3Npb24gaXMgZ3JhbnRlZCB0byB1c2UsIGNvcHksIG1vZGlmeSwgYW5kIGRpc3RyaWJ1dGUgdGhpcyBzb2Z0d2FyZVxuICogdW5kZXIgdGhlIE1JVCBMaWNlbnNlLiBTZWUgTElDRU5TRSBmaWxlIGZvciBkZXRhaWxzLlxuICovXG5cbmV4cG9ydCBjb25zdCBERUJVR19CVUlMRF9UWVBFID0gXCJEZWJ1Z1wiO1xuZXhwb3J0IGNvbnN0IFJFTEVBU0VfQlVJTERfVFlQRSA9IFwiUmVsZWFzZVwiO1xuIiwiLypcbiAqIE1JVCBMaWNlbnNlXG4gKlxuICogQ29weXJpZ2h0IChjKSAyMDI1ICBZdXJpaSBZYWt1YmluICh5dXJpaS55YWt1YmluQGdtYWlsLmNvbSlcbiAqXG4gKiBQZXJtaXNzaW9uIGlzIGdyYW50ZWQgdG8gdXNlLCBjb3B5LCBtb2RpZnksIGFuZCBkaXN0cmlidXRlIHRoaXMgc29mdHdhcmVcbiAqIHVuZGVyIHRoZSBNSVQgTGljZW5zZS4gU2VlIExJQ0VOU0UgZmlsZSBmb3IgZGV0YWlscy5cbiAqL1xuXG5leHBvcnQgaW50ZXJmYWNlIElMb2dnZXIge1xuICB0cmFjZShtZXNzYWdlPzogYW55LCAuLi5wYXJhbXM6IGFueVtdKTogdm9pZDtcbiAgZGVidWcobWVzc2FnZT86IGFueSwgLi4ucGFyYW1zOiBhbnlbXSk6IHZvaWQ7XG4gIGluZm8obWVzc2FnZT86IGFueSwgLi4ucGFyYW1zOiBhbnlbXSk6IHZvaWQ7XG4gIHdhcm4obWVzc2FnZT86IGFueSwgLi4ucGFyYW1zOiBhbnlbXSk6IHZvaWQ7XG4gIGVycm9yKG1lc3NhZ2U/OiBhbnksIC4uLnBhcmFtczogYW55W10pOiB2b2lkO1xufTtcblxuZXhwb3J0IGZ1bmN0aW9uIGNyZWF0ZUxvZ2dlcih1cmw6IHN0cmluZyk6IElMb2dnZXIge1xuICByZXR1cm4ge1xuICAgIHRyYWNlOiBjb25zb2xlLnRyYWNlLmJpbmQoY29uc29sZSksXG4gICAgZGVidWc6IGNvbnNvbGUuZGVidWcuYmluZChjb25zb2xlKSxcbiAgICBpbmZvOiBjb25zb2xlLmluZm8uYmluZChjb25zb2xlKSxcbiAgICB3YXJuOiBjb25zb2xlLndhcm4uYmluZChjb25zb2xlKSxcbiAgICBlcnJvcjogY29uc29sZS5lcnJvci5iaW5kKGNvbnNvbGUpLFxuICB9O1xufVxuIiwiY29uc3QgcGF0aCA9IHJlcXVpcmUoXCJub2RlOnBhdGhcIik7XG5jb25zdCB1cmwgPSByZXF1aXJlKFwibm9kZTp1cmxcIik7XG5cbmNsYXNzIEFic29sdXRlUGF0aCB7XG4gIF9maWxlcGF0aDtcblxuICBjb25zdHJ1Y3RvcihmaWxlcGF0aCkge1xuICAgIGlmICghcGF0aC5pc0Fic29sdXRlKGZpbGVwYXRoKSlcbiAgICAgIHRocm93IG5ldyBFcnJvcihgTm90IHN1cHBvcnRlZCByZWxhdGl2ZSBwYXRoIG9mIFwiJHtmaWxlcGF0aH1cImApO1xuICAgIHRoaXMuX2ZpbGVwYXRoID0gZmlsZXBhdGg7XG4gIH1cblxuICBqb2luKC4uLnBhdGhzKSB7XG4gICAgY29uc3QgZmlsZXBhdGggPSBwYXRoLnBvc2l4LmpvaW4odGhpcy5fZmlsZXBhdGgsIC4uLnBhdGhzLm1hcChpID0+IGkudG9TdHJpbmcoKSkpO1xuICAgIHJldHVybiBuZXcgQWJzb2x1dGVQYXRoKGZpbGVwYXRoKTtcbiAgfVxuXG4gIGRpcm5hbWUoKSB7XG4gICAgcmV0dXJuIG5ldyBBYnNvbHV0ZVBhdGgocGF0aC5wb3NpeC5kaXJuYW1lKHRoaXMuX2ZpbGVwYXRoKSk7XG4gIH1cblxuICBiYXNlbmFtZSgpIHtcbiAgICByZXR1cm4gcGF0aC5iYXNlbmFtZSh0aGlzLl9maWxlcGF0aCk7XG4gIH1cblxuICByZWxhdGl2ZSh0bykge1xuICAgIGlmICh0byBpbnN0YW5jZW9mIEFic29sdXRlUGF0aClcbiAgICAgIHRvID0gdG8uX2ZpbGVwYXRoO1xuICAgIGNvbnN0IGZpbGVwYXRoID0gcGF0aC5wb3NpeC5yZWxhdGl2ZSh0aGlzLl9maWxlcGF0aCwgdG8pO1xuICAgIHJldHVybiBmaWxlcGF0aDtcbiAgfVxuXG4gIHJlc29sdmUoLi4ucGF0aHMpIHtcbiAgICByZXR1cm4gbmV3IEFic29sdXRlUGF0aChwYXRoLnBvc2l4LnJlc29sdmUodGhpcy5fZmlsZXBhdGgsIC4uLnBhdGhzLm1hcChpID0+IGkudG9TdHJpbmcoKSkpKTtcbiAgfVxuXG4gIG1hdGNoKHJlZ2V4cCkge1xuICAgIHJldHVybiB0aGlzLl9maWxlcGF0aC5tYXRjaChyZWdleHApO1xuICB9XG5cbiAgaXNQYXJlbnREaXIoZGlycGF0aCkge1xuICAgIGNvbnN0IGRpciA9IEFic29sdXRlUGF0aC5jcmVhdGUoZGlycGF0aCk7XG4gICAgcmV0dXJuIHRoaXMuX2ZpbGVwYXRoLnN0YXJ0c1dpdGgoZGlyLl9maWxlcGF0aCk7XG4gIH1cblxuICB0b1VSTCgpIHtcbiAgICByZXR1cm4gdXJsLnBhdGhUb0ZpbGVVUkwodGhpcy5fZmlsZXBhdGgpO1xuICB9XG5cbiAgdG9VUkxTdHJpbmcoKSB7XG4gICAgcmV0dXJuIHRoaXMudG9VUkwoKS50b1N0cmluZygpO1xuICB9XG5cbiAgdG9TdHJpbmcoKSB7XG4gICAgcmV0dXJuIHRoaXMuX2ZpbGVwYXRoO1xuICB9XG5cbiAgdmFsdWVPZigpIHtcbiAgICByZXR1cm4gdGhpcy5fZmlsZXBhdGg7XG4gIH1cblxuICB0b0pTT04oKSB7XG4gICAgcmV0dXJuIHRoaXMuX2ZpbGVwYXRoO1xuICB9XG5cbiAgc3RhdGljIGlzQWJzb2x1dGUoZmlsZXBhdGgpIHtcbiAgICByZXR1cm4gcGF0aC5pc0Fic29sdXRlKGZpbGVwYXRoLnRvU3RyaW5nKCkpO1xuICB9XG5cbiAgc3RhdGljIGNyZWF0ZShmaWxlcGF0aCkge1xuICAgIGlmIChmaWxlcGF0aCBpbnN0YW5jZW9mIEFic29sdXRlUGF0aClcbiAgICAgIHJldHVybiBmaWxlcGF0aDtcbiAgICBpZiAodHlwZW9mIGZpbGVwYXRoICE9PSBcInN0cmluZ1wiKVxuICAgICAgdGhyb3cgbmV3IEVycm9yKGBOb3QgY29ycmVjdCB0eXBlIG9mICR7ZmlsZXBhdGh9YCk7XG4gICAgcmV0dXJuIG5ldyBBYnNvbHV0ZVBhdGgoZmlsZXBhdGgpO1xuICB9XG59O1xuXG5mdW5jdGlvbiBjbG9uZUFic29sdXRlUGF0aCh2YWx1ZSkge1xuICBpZiAodmFsdWUgaW5zdGFuY2VvZiBBYnNvbHV0ZVBhdGgpXG4gICAgcmV0dXJuIHZhbHVlO1xuICB0aHJvdyBuZXcgRXJyb3IoYFRoZSAnJHt2YWx1ZX0nIGlzIG5vdCBhIEFic29sdXRlUGF0aGApO1xufVxuXG5tb2R1bGUuZXhwb3J0cyA9IHtcbiAgQWJzb2x1dGVQYXRoLFxuICBjbG9uZUFic29sdXRlUGF0aCxcbn07XG4iLCJjb25zdCBvcyA9IHJlcXVpcmUoJ25vZGU6b3MnKTtcbmNvbnN0IGZzID0gcmVxdWlyZSgnbm9kZTpmcycpO1xuY29uc3QgcGF0aCA9IHJlcXVpcmUoJ25vZGU6cGF0aCcpO1xuXG5jb25zdCB7IHNwYXduQXN5bmMgfSA9IHJlcXVpcmUoJy4vQ2hpbGRQcm9jZXNzLmpzJyk7XG5jb25zdCB7IENNQUtFX0xJU1RTX1RYVCwgVmFsdWVUeXBlIH0gPSByZXF1aXJlKFwiQC9jbWFrZS9Db25zdGFudHNcIik7XG5jb25zdCB7IGNvbnZlcnRUb1ZhbHVlIH0gPSByZXF1aXJlKFwiQC9jbWFrZS9IZWxwZXJcIik7XG5cbmZ1bmN0aW9uIHRvVmFyVHlwZShrZXksIHZhbCkge1xuICBjb25zdCBtYXAgPSB7XG4gICAgQ01BS0VfSU5TVEFMTF9QUkVGSVg6IFZhbHVlVHlwZS5QQVRILFxuICAgIENNQUtFX1RPT0xDSEFJTl9GSUxFOiBWYWx1ZVR5cGUuRklMRVBBVEgsXG4gIH07XG5cbiAgaWYgKHR5cGVvZiB2YWwgPT09IFwiYm9vbGVhblwiKVxuICAgIHJldHVybiBWYWx1ZVR5cGUuQk9PTDtcblxuICBpZiAobWFwLmhhc093blByb3BlcnR5KGtleSkpXG4gICAgcmV0dXJuIG1hcFtrZXldO1xuXG4gIHJldHVybiBWYWx1ZVR5cGUuU1RSSU5HO1xufVxuXG5mdW5jdGlvbiB0b0NhY2hlRW50cnkobmFtZSwgdmFsKVxue1xuICBjb25zdCB0eXBlID0gdG9WYXJUeXBlKG5hbWUsIHZhbCk7XG4gIGNvbnN0IHZhbHVlID0gY29udmVydFRvVmFsdWUodmFsKTtcbiAgcmV0dXJuIGAke25hbWV9OiR7dHlwZX09JHt2YWx1ZX1gO1xufVxuXG5hc3luYyBmdW5jdGlvbiBjb25maWd1cmUoYXJncylcbntcbiAgY29uc3Qgc3Bhd25BcmdzID0gWyAnLUcnLCBhcmdzLmdlbmVyYXRvciBdO1xuICBmb3IgKGNvbnN0IFtrZXksIHZhbF0gb2YgT2JqZWN0LmVudHJpZXMoYXJncy5jYWNoZVZhcmlhYmxlcykpXG4gICAgc3Bhd25BcmdzLnB1c2goJy1EJywgdG9DYWNoZUVudHJ5KGtleSwgdmFsKSk7XG4gIHNwYXduQXJncy5wdXNoKCctUycsIGFyZ3Muc291cmNlRGlyKTtcbiAgc3Bhd25BcmdzLnB1c2goJy1CJywgYXJncy5iaW5hcnlEaXIpO1xuXG4gIGNvbnN0IHJlcyA9IGF3YWl0IHNwYXduQXN5bmMoXCJjbWFrZVwiLCBzcGF3bkFyZ3MsIHtcbiAgICBjd2Q6IGFyZ3MuYmluYXJ5RGlyLFxuICAgIGVudjogYXJncy5lbnZpcm9ubWVudCB8fCBwcm9jZXNzLmVudixcbiAgICBleHRyYToge1xuICAgICAgb3V0cHV0OiBgY21ha2UuY29uZmlndXJlLmxvZ2AsXG4gICAgfSxcbiAgfSk7XG4gIGlmIChyZXMuc3RhdHVzICE9PSAwKSB7XG4gICAgdGhyb3cgYENNYWtlLmNvbmZpZ3VyZSByZXR1cm5lZCBzdGF0dXMgJHtyZXMuc3RhdHVzfWA7XG4gIH1cbn1cblxuYXN5bmMgZnVuY3Rpb24gYnVpbGQoYXJncylcbntcbiAgYXdhaXQgY29uZmlndXJlKGFyZ3MpO1xuXG4gIGNvbnN0IHNwYXduQXJncyA9IFtcbiAgICAnLS1idWlsZCcsICcuJyxcbiAgICAnLS1wYXJhbGxlbCcsIG9zLmF2YWlsYWJsZVBhcmFsbGVsaXNtKCksXG4gIF07XG4gIGNvbnN0IHJlcyA9IGF3YWl0IHNwYXduQXN5bmMoXCJjbWFrZVwiLCBzcGF3bkFyZ3MsIHtcbiAgICBjd2Q6IGFyZ3MuYmluYXJ5RGlyLFxuICAgIGVudjogYXJncy5lbnZpcm9ubWVudCB8fCBwcm9jZXNzLmVudixcbiAgICBleHRyYToge1xuICAgICAgb3V0cHV0OiBgY21ha2UuYnVpbGQubG9nYCxcbiAgICB9LFxuICB9KTtcbiAgaWYgKHJlcy5zdGF0dXMgIT09IDApIHtcbiAgICB0aHJvdyBgQ01ha2UuYnVpbGQgcmV0dXJuZWQgc3RhdHVzICR7cmVzLnN0YXR1c31gO1xuICB9XG59XG5cbmFzeW5jIGZ1bmN0aW9uIGluc3RhbGwoYXJncylcbntcbiAgYXdhaXQgY29uZmlndXJlKGFyZ3MpO1xuXG4gIGNvbnN0IHNwYXduQXJncyA9IFtcbiAgICAnLS1pbnN0YWxsJyxcbiAgICAnLicsXG4gIF07XG4gIGlmIChhcmdzLmluc3RhbGxEaXIpIHtcbiAgICBzcGF3bkFyZ3MucHVzaCgnLS1wcmVmaXgnLCBhcmdzLmluc3RhbGxEaXIpO1xuICB9XG4gIGNvbnN0IHJlcyA9IGF3YWl0IHNwYXduQXN5bmMoXCJjbWFrZVwiLCBzcGF3bkFyZ3MsIHtcbiAgICBjd2Q6IGFyZ3MuYmluYXJ5RGlyLFxuICAgIGVudjogYXJncy5lbnZpcm9ubWVudCB8fCBwcm9jZXNzLmVudixcbiAgICBleHRyYToge1xuICAgICAgb3V0cHV0OiBgY21ha2UuaW5zdGFsbC5sb2dgLFxuICAgIH0sXG4gIH0pO1xuICBpZiAocmVzLnN0YXR1cyAhPT0gMCkge1xuICAgIHRocm93IGBDTWFrZS5pbnN0YWxsIHJldHVybmVkIHN0YXR1cyAke3Jlcy5zdGF0dXN9YDtcbiAgfVxufVxuXG5hc3luYyBmdW5jdGlvbiBjdGVzdChhcmdzKVxue1xuICBhd2FpdCBidWlsZChhcmdzKTtcblxuICBjb25zdCBzcGF3bkFyZ3MgPSBbXG4gIF07XG4gIGNvbnN0IHJlcyA9IGF3YWl0IHNwYXduQXN5bmMoXCJjdGVzdFwiLCBzcGF3bkFyZ3MsIHtcbiAgICBjd2Q6IGFyZ3MuYmluYXJ5RGlyLFxuICAgIGVudjogYXJncy5lbnZpcm9ubWVudCB8fCBwcm9jZXNzLmVudixcbiAgICBleHRyYToge1xuICAgICAgb3V0cHV0OiBgY21ha2UuY3Rlc3QubG9nYCxcbiAgICB9LFxuICB9KTtcbiAgaWYgKHJlcy5zdGF0dXMgIT09IDApIHtcbiAgICB0aHJvdyBgQ1Rlc3QgcmV0dXJuZWQgc3RhdHVzICR7cmVzLnN0YXR1c31gO1xuICB9XG59XG5cbmFzeW5jIGZ1bmN0aW9uIGV4dHJhY3QoYXJncylcbntcbiAgY29uc3Qgc3Bhd25BcmdzID0gWyBcIi1FXCIsIFwidGFyXCIsIFwiLXh2ZlwiLCBhcmdzLmZpbGVuYW1lIF07XG4gIGNvbnN0IHJlcyA9IGF3YWl0IHNwYXduQXN5bmMoXCJjbWFrZVwiLCBzcGF3bkFyZ3MsIHtcbiAgICBjd2Q6IGFyZ3Mud29ya0RpciB8fCBhcmdzLnNvdXJjZURpciB8fCBhcmdzLmJpbmFyeURpcixcbiAgICBlbnY6IGFyZ3MuZW52aXJvbm1lbnQgfHwgcHJvY2Vzcy5lbnYsXG4gICAgZXh0cmE6IHtcbiAgICAgIG91dHB1dDogYXJncy5sb2dGaWxlIHx8IGBjbWFrZS5leHRyYWN0LmxvZ2AsXG4gICAgfSxcbiAgfSk7XG4gIGlmIChyZXMuc3RhdHVzICE9PSAwKSB7XG4gICAgdGhyb3cgYEV4dHJhY3QgcmV0dXJuZWQgc3RhdHVzICR7cmVzLnN0YXR1c31gO1xuICB9XG59XG5cbmFzeW5jIGZ1bmN0aW9uIGdldFByb2plY3RJbmZvKHNvdXJjZSlcbntcbiAgY29uc3Qgc3RhdCA9IGF3YWl0IGZzLnByb21pc2VzLnN0YXQoc291cmNlKTtcbiAgaWYgKHN0YXQuaXNEaXJlY3RvcnkoKSlcbiAgICBzb3VyY2UgPSBwYXRoLnJlc29sdmUoc291cmNlLCBDTUFLRV9MSVNUU19UWFQpO1xuICBjb25zdCBjb250ZW50ID0gYXdhaXQgZnMucHJvbWlzZXMucmVhZEZpbGUoc291cmNlLCB7IGVuY29kaW5nOiAndXRmOCcgfSk7XG5cbiAgY29uc3QgcHJvamVjdFBhdHRlcm4gPSAvcHJvamVjdCAqXFwoICooW14gXSspICooW14pXSopXFwpLztcbiAgY29uc3QgdmVyc2lvblBhdHRlcm4gPSAvVkVSU0lPTiArKFteIF0rKS87XG4gIGxldCBtYXRjaCA9IGNvbnRlbnQubWF0Y2gocHJvamVjdFBhdHRlcm4pO1xuICBjb25zdCBuYW1lID0gbWF0Y2hbMV07XG4gIGNvbnN0IHByb2plY3RDb250ZW50ID0gbWF0Y2hbMl07XG4gIG1hdGNoID0gcHJvamVjdENvbnRlbnQubWF0Y2godmVyc2lvblBhdHRlcm4pO1xuICBjb25zdCB2ZXJzaW9uID0gbWF0Y2hbMV07XG5cbiAgcmV0dXJuIHtcbiAgICBuYW1lLFxuICAgIHZlcnNpb24sXG4gIH07XG59XG5cbmZ1bmN0aW9uIGxpbmVUb1NpbmdsQ29tbWVudChsaW5lKVxue1xuICByZXR1cm4gXCIjIFwiICsgbGluZTtcbn1cblxuZnVuY3Rpb24gbGluZVRvTXVsdGlwbGVDb21tZW50KGxpbmUpXG57XG4gIHJldHVybiBgI1s9PT1bICR7bGluZX0gXT09PV1gO1xufVxuXG5mdW5jdGlvbiBnZW5lcmF0ZWRTY3JpcHROYW1lQ29tbWVudChmaWxlbmFtZSlcbntcbiAgcmV0dXJuIGxpbmVUb1NpbmdsQ29tbWVudChcIkdlbmVyYXRlZCBmcm9tIFwiICsgcGF0aC5iYXNlbmFtZShmaWxlbmFtZSkpO1xufVxuXG5tb2R1bGUuZXhwb3J0cyA9IHtcbiAgY29uZmlndXJlLFxuICBidWlsZCxcbiAgaW5zdGFsbCxcbiAgY3Rlc3QsXG4gIGV4dHJhY3QsXG4gIGdldFByb2plY3RJbmZvLFxuICBsaW5lVG9TaW5nbENvbW1lbnQsXG4gIGxpbmVUb011bHRpcGxlQ29tbWVudCxcbiAgZ2VuZXJhdGVkU2NyaXB0TmFtZUNvbW1lbnQsXG59O1xuIiwiY29uc3QgeyBzcGF3biB9ID0gcmVxdWlyZSgnY2hpbGRfcHJvY2VzcycpO1xuY29uc3QgZnMgPSByZXF1aXJlKCdmcycpO1xuY29uc3QgcGF0aCA9IHJlcXVpcmUoJ3BhdGgnKTtcblxuZnVuY3Rpb24gc3Bhd25Bc3luYyhjb21tYW5kLCBhcmdzLCBvcHRpb25zKSB7XG4gIGxldCBmZCA9IG51bGw7XG4gIGxldCB2ZXJib3NlID0gZmFsc2U7XG4gIGlmIChvcHRpb25zICYmIG9wdGlvbnMuZXh0cmEpIHtcbiAgICBpZiAob3B0aW9ucy5leHRyYS52ZXJib3NlKVxuICAgICAgdmVyYm9zZSA9IHRydWU7XG4gICAgaWYgKG9wdGlvbnMuZXh0cmEub3V0cHV0KSB7XG4gICAgICBsZXQgbG9nZmlsZSA9IG9wdGlvbnMuZXh0cmEub3V0cHV0O1xuICAgICAgaWYgKCFwYXRoLmlzQWJzb2x1dGUobG9nZmlsZSkgJiYgb3B0aW9ucy5jd2QpIHtcbiAgICAgICAgbG9nZmlsZSA9IHBhdGgucmVzb2x2ZShvcHRpb25zLmN3ZCwgbG9nZmlsZSk7XG4gICAgICB9XG4gICAgICBmZCA9IGZzLm9wZW5TeW5jKGxvZ2ZpbGUsICd3KycsIDBvNjY2KTtcbiAgICB9XG4gIH1cbiAgcmV0dXJuIG5ldyBQcm9taXNlKChyZXNvbHZlLCByZWplY3QpID0+IHtcbiAgICBpZiAoZmQgfHwgdmVyYm9zZSkge1xuICAgICAgdmVyYm9zZSAmJiBjb25zb2xlLmluZm8oWyBwYXRoLmJhc2VuYW1lKGNvbW1hbmQpLCAuLi5hcmdzIF0uam9pbignICcpKTtcbiAgICAgIGZkICYmIGZzLndyaXRlU3luYyhmZCwgSlNPTi5zdHJpbmdpZnkoe2NvbW1hbmQsIGFyZ3MsIG9wdGlvbnMgfSwgbnVsbCwgMikgKyBcIlxcblwiKTtcbiAgICB9XG4gICAgY29uc3QgZXhlYyA9IHNwYXduKGNvbW1hbmQsIGFyZ3MsIG9wdGlvbnMpO1xuICAgIGV4ZWMuc3Rkb3V0Lm9uKCdkYXRhJywgKGRhdGEpID0+IHtcbiAgICAgIHByb2Nlc3Muc3Rkb3V0LndyaXRlKGRhdGEpO1xuICAgICAgZmQgJiYgZnMud3JpdGVTeW5jKGZkLCBkYXRhKTtcbiAgICB9KTtcbiAgICBleGVjLnN0ZGVyci5vbignZGF0YScsIChkYXRhKSA9PiB7XG4gICAgICBwcm9jZXNzLnN0ZGVyci53cml0ZShkYXRhKTtcbiAgICAgIGZkICYmIGZzLndyaXRlU3luYyhmZCwgZGF0YSk7XG4gICAgfSk7XG4gICAgZXhlYy5vbignY2xvc2UnLCAoc3RhdHVzKSA9PiB7XG4gICAgICBmZCAmJiBmcy5jbG9zZVN5bmMoZmQpO1xuICAgICAgcmVzb2x2ZSh7c3RhdHVzfSk7XG4gICAgfSk7XG4gIH0pO1xufVxuXG5tb2R1bGUuZXhwb3J0cyA9IHtcbiAgc3Bhd25Bc3luYyxcbn07XG4iLCIvKlxuICogTUlUIExpY2Vuc2VcbiAqXG4gKiBDb3B5cmlnaHQgKGMpIDIwMjUgIFl1cmlpIFlha3ViaW4gKHl1cmlpLnlha3ViaW5AZ21haWwuY29tKVxuICpcbiAqIFBlcm1pc3Npb24gaXMgZ3JhbnRlZCB0byB1c2UsIGNvcHksIG1vZGlmeSwgYW5kIGRpc3RyaWJ1dGUgdGhpcyBzb2Z0d2FyZVxuICogdW5kZXIgdGhlIE1JVCBMaWNlbnNlLiBTZWUgTElDRU5TRSBmaWxlIGZvciBkZXRhaWxzLlxuICovXG5cbmltcG9ydCBmcyBmcm9tIFwibm9kZTpmc1wiO1xuaW1wb3J0IHBhdGggZnJvbSBcIm5vZGU6cGF0aFwiO1xuaW1wb3J0IHVybCBmcm9tIFwibm9kZTp1cmxcIjtcblxuZXhwb3J0IGFzeW5jIGZ1bmN0aW9uIHBhdGhFeGlzdHMocGF0aDogc3RyaW5nKSB7XG4gIHRyeSB7XG4gICAgcmV0dXJuICEhKGF3YWl0IGZzLnByb21pc2VzLnN0YXQocGF0aCkpO1xuICB9IGNhdGNoIHtcbiAgICByZXR1cm4gZmFsc2U7XG4gIH1cbn1cblxuZXhwb3J0IGZ1bmN0aW9uIHBhdGhFeGlzdHNTeW5jKHBhdGg6IHN0cmluZykge1xuICB0cnkge1xuICAgIHJldHVybiAhIWZzLnN0YXRTeW5jKHBhdGgpO1xuICB9IGNhdGNoIHtcbiAgICByZXR1cm4gZmFsc2U7XG4gIH1cbn1cblxuZXhwb3J0IGFzeW5jIGZ1bmN0aW9uIGZpbGVFeGlzdHMocGF0aDogc3RyaW5nKSB7XG4gIHRyeSB7XG4gICAgcmV0dXJuIChhd2FpdCBmcy5wcm9taXNlcy5zdGF0KHBhdGgpKS5pc0ZpbGUoKTtcbiAgfSBjYXRjaCB7XG4gICAgcmV0dXJuIGZhbHNlO1xuICB9XG59XG5cbmV4cG9ydCBmdW5jdGlvbiBmaWxlRXhpc3RzU3luYyhwYXRoOiBzdHJpbmcpIHtcbiAgdHJ5IHtcbiAgICByZXR1cm4gZnMuc3RhdFN5bmMocGF0aCkuaXNGaWxlKCk7XG4gIH0gY2F0Y2gge1xuICAgIHJldHVybiBmYWxzZTtcbiAgfSBcbn1cblxuZXhwb3J0IGFzeW5jIGZ1bmN0aW9uIGRpcmVjdG9yeUV4aXN0cyhwYXRoOiBzdHJpbmcpIHtcbiAgdHJ5IHtcbiAgICByZXR1cm4gKGF3YWl0IGZzLnByb21pc2VzLnN0YXQocGF0aCkpLmlzRGlyZWN0b3J5KCk7XG4gIH0gY2F0Y2gge1xuICAgIHJldHVybiBmYWxzZTtcbiAgfVxufVxuXG5leHBvcnQgZnVuY3Rpb24gZGlyZWN0b3J5RXhpc3RzU3luYyhwYXRoOiBzdHJpbmcpIHtcbiAgdHJ5IHtcbiAgIHJldHVybiBmcy5zdGF0U3luYyhwYXRoKS5pc0RpcmVjdG9yeSgpO1xuICB9IGNhdGNoIHtcbiAgICByZXR1cm4gZmFsc2U7XG4gIH1cbn1cblxuZXhwb3J0IGZ1bmN0aW9uIGV4dG5hbWUoZnVsbHBhdGg6IHN0cmluZywgb3B0aW9uczogYW55KSB7XG4gIGlmIChvcHRpb25zPy5sb25nZXN0KSB7XG4gICAgY29uc3QgZmlsZW5hbWUgPSBwYXRoLmJhc2VuYW1lKGZ1bGxwYXRoKTtcbiAgICBjb25zdCBpbmRleCA9IGZpbGVuYW1lLmluZGV4T2YoJy4nKTtcbiAgICByZXR1cm4gaW5kZXggIT0gLTEgPyBmaWxlbmFtZS5zdWJzdHJpbmcoaW5kZXgpIDogJyc7XG4gIH1cblxuICByZXR1cm4gcGF0aC5leHRuYW1lKGZ1bGxwYXRoKTtcbn1cblxuZXhwb3J0IGFzeW5jIGZ1bmN0aW9uIGZpbGVMaXN0KGRpcm5hbWU6IHN0cmluZywgb3B0aW9uczogYW55KTogUHJvbWlzZTxBcnJheTxzdHJpbmc+PiB7XG4gIGNvbnN0IGxpc3QgPSBuZXcgQXJyYXk8c3RyaW5nPjtcbiAgaWYgKGF3YWl0IGRpcmVjdG9yeUV4aXN0cyhkaXJuYW1lKSkge1xuICAgIGZvciAoY29uc3QgaXRlciBvZiBhd2FpdCBmcy5wcm9taXNlcy5yZWFkZGlyKGRpcm5hbWUpKSB7XG4gICAgICBjb25zdCBmaWxlcGF0aCA9IHBhdGgucmVzb2x2ZShkaXJuYW1lLCBpdGVyKTtcbiAgICAgIGNvbnN0IHN0YXQgPSBhd2FpdCBmcy5wcm9taXNlcy5zdGF0KGZpbGVwYXRoKTtcbiAgICAgIGlmIChzdGF0LmlzRmlsZSgpKSB7XG4gICAgICAgIGxpc3QucHVzaChvcHRpb25zLnJlbGF0aXZlID8gcGF0aC5yZWxhdGl2ZShvcHRpb25zLnJlbGF0aXZlLCBmaWxlcGF0aCkgOiBmaWxlcGF0aCk7XG4gICAgICB9XG4gICAgICBlbHNlIGlmIChvcHRpb25zLnJlY3Vyc2l2ZSAmJiBzdGF0LmlzRGlyZWN0b3J5KCkpIHtcbiAgICAgICAgZm9yIChjb25zdCBmbmFtZSBvZiBhd2FpdCBmaWxlTGlzdChmaWxlcGF0aCwgb3B0aW9ucykpXG4gICAgICAgICAgbGlzdC5wdXNoKGZuYW1lKTtcbiAgICAgIH1cbiAgICB9XG4gIH1cbiAgcmV0dXJuIGxpc3Q7XG59XG5cbmV4cG9ydCBhc3luYyBmdW5jdGlvbiBzYXZlSWZEaWZmZXJlbnQoZmlsZW5hbWU6IHN0cmluZywgY29udGVudDogc3RyaW5nKSB7XG4gIGlmIChhd2FpdCBmaWxlRXhpc3RzKGZpbGVuYW1lKSkge1xuICAgIGNvbnN0IG9sZENvbnRlbnQgPSBhd2FpdCBmcy5wcm9taXNlcy5yZWFkRmlsZShmaWxlbmFtZSwgeyBlbmNvZGluZzogXCJ1dGY4XCIgfSk7XG4gICAgaWYgKGNvbnRlbnQgPT0gb2xkQ29udGVudClcbiAgICAgIHJldHVybiBmYWxzZTtcbiAgfVxuXG4gIGF3YWl0IGZzLnByb21pc2VzLm1rZGlyKHBhdGguZGlybmFtZShmaWxlbmFtZSksIHsgcmVjdXJzaXZlOiB0cnVlIH0pO1xuICBhd2FpdCBmcy5wcm9taXNlcy53cml0ZUZpbGUoZmlsZW5hbWUsIGNvbnRlbnQsIHsgZW5jb2Rpbmc6IFwidXRmOFwiIH0pO1xuXG4gIHJldHVybiB0cnVlO1xufVxuXG5leHBvcnQgZnVuY3Rpb24gZ2V0UGF0aFN0cmluZyhzdHI6IHN0cmluZykge1xuICByZXR1cm4gc3RyLnN0YXJ0c1dpdGgoXCJmaWxlOi8vXCIpID8gdXJsLmZpbGVVUkxUb1BhdGgoc3RyKSA6IHN0cjtcbn1cbiIsIi8qXG4gKiBNSVQgTGljZW5zZVxuICpcbiAqIENvcHlyaWdodCAoYykgMjAyNSAgWXVyaWkgWWFrdWJpbiAoeXVyaWkueWFrdWJpbkBnbWFpbC5jb20pXG4gKlxuICogUGVybWlzc2lvbiBpcyBncmFudGVkIHRvIHVzZSwgY29weSwgbW9kaWZ5LCBhbmQgZGlzdHJpYnV0ZSB0aGlzIHNvZnR3YXJlXG4gKiB1bmRlciB0aGUgTUlUIExpY2Vuc2UuIFNlZSBMSUNFTlNFIGZpbGUgZm9yIGRldGFpbHMuXG4gKi9cblxuaW1wb3J0IHBhdGggZnJvbSBcIm5vZGU6cGF0aFwiO1xuaW1wb3J0IGZzIGZyb20gXCJub2RlOmZzXCI7XG5pbXBvcnQgaHR0cCBmcm9tIFwiaHR0cFwiO1xuaW1wb3J0IGh0dHBzIGZyb20gXCJodHRwc1wiO1xuXG5pbXBvcnQgeyBjcmVhdGVMb2dnZXIgfSBmcm9tIFwiQC9sb2dnZXJcIjtcblxuY29uc3QgbG9nZ2VyID0gY3JlYXRlTG9nZ2VyKGltcG9ydC5tZXRhLnVybCk7XG5cbmNvbnN0IGh0dHBPcHRpb25zID0ge1xuICBtZXRob2Q6ICdHRVQnLFxuICB0aW1lb3V0OiA1MDAwLFxuICBoZWFkZXJzOiB7XG4gICAgXCJVc2VyLUFnZW50XCI6IFBST0pFQ1RfTkFNRSArIFwiL1wiICsgUFJPSkVDVF9WRVJTSU9OLFxuICAgIFwiQWNjZXB0XCI6IFwiKi8qXCIsXG4gIH0sXG59O1xuXG5mdW5jdGlvbiBodHRwUmVxdWVzdCh1cmw6IHN0cmluZywgb3B0aW9uczogaHR0cC5SZXF1ZXN0T3B0aW9ucyB8IGh0dHBzLlJlcXVlc3RPcHRpb25zLCBjYWxsYmFjazogYW55KSB7XG4gIGlmICh1cmwuc3RhcnRzV2l0aChcImh0dHBzOi8vXCIpKVxuICAgIHJldHVybiBodHRwcy5yZXF1ZXN0KHVybCwgb3B0aW9ucywgY2FsbGJhY2spO1xuICByZXR1cm4gaHR0cC5yZXF1ZXN0KHVybCwgb3B0aW9ucywgY2FsbGJhY2spO1xufTtcblxuZXhwb3J0IGZ1bmN0aW9uIHJlcXVlc3RHZXQodXJsOiBzdHJpbmcpIHtcbiAgcmV0dXJuIG5ldyBQcm9taXNlKChyZXNvbHZlLCByZWplY3QpID0+IHtcblxuICAgIGNvbnN0IG9uRXJyb3IgPSAoZXJyOiBhbnkpID0+IHtcbiAgICAgIGNvbnN0IG1lc3NhZ2UgPSBcIkVuY291bnRlcmVkIGFuIGVycm9yIHRyeWluZyB0byBtYWtlIGEgcmVxdWVzdDogXCIgKyBlcnIubWVzc2FnZTtcbiAgICAgIGxvZ2dlci5lcnJvcihtZXNzYWdlLCBlcnIpO1xuICAgICAgcmVqZWN0KG1lc3NhZ2UpO1xuICAgIH07XG5cbiAgICBjb25zdCBvblRpbWVvdXQgPSAocmVxdWVzdDogYW55KSA9PiB7XG4gICAgICByZXF1ZXN0LmRlc3Ryb3koKTtcbiAgICAgIGxvZ2dlci5lcnJvcihcIiAgVGltZW91dFwiLCB1cmwpO1xuICAgICAgcmVqZWN0KFwiVGltZW91dFwiKTtcbiAgICB9XG5cbiAgICBjb25zdCBvblJlcXVlc3QgPSAocmVzcG9uc2U6IGFueSkgPT4ge1xuICAgICAgc3dpdGNoIChyZXNwb25zZS5zdGF0dXNDb2RlKSB7XG4gICAgICBjYXNlIDIwMDpcbiAgICAgICAgY29uc3QgY2h1bmtzOiBBcnJheTxCdWZmZXI+ID0gW107XG4gICAgICAgIHJlc3BvbnNlLm9uKFwiZGF0YVwiLCAoY2h1bms6IEJ1ZmZlcikgPT4gY2h1bmtzLnB1c2goY2h1bmspKTtcbiAgICAgICAgcmVzcG9uc2Uub24oXCJlbmRcIiwgKCkgPT4gcmVzb2x2ZShCdWZmZXIuY29uY2F0KGNodW5rcykpKTtcbiAgICAgICAgcmVzcG9uc2Uub24oJ2Nsb3NlJywgKCkgPT4gbG9nZ2VyLmluZm8oJyAgQ2xvc2UnKSk7XG4gICAgICAgIGJyZWFrO1xuXG4gICAgICBjYXNlIDMwMTpcbiAgICAgIGNhc2UgMzAyOlxuICAgICAgICByZXNwb25zZS5yZXN1bWUoKTtcbiAgICAgICAgbG9nZ2VyLmluZm8oYFJlZGlyZWN0IHRvICR7cmVzcG9uc2UuaGVhZGVycy5sb2NhdGlvbn1gKTtcbiAgICAgICAgY29uc3QgcmVxdWVzdCA9IGh0dHBSZXF1ZXN0KHJlc3BvbnNlLmhlYWRlcnMubG9jYXRpb24sIGh0dHBPcHRpb25zLCBvblJlcXVlc3QpO1xuICAgICAgICByZXF1ZXN0Lm9uKCd0aW1lb3V0Jywgb25UaW1lb3V0LmJpbmQobnVsbCwgcmVxdWVzdCkpO1xuICAgICAgICByZXF1ZXN0Lm9uKCdlcnJvcicsIG9uRXJyb3IpO1xuICAgICAgICByZXF1ZXN0LmVuZCgpO1xuICAgICAgICBicmVhaztcblxuICAgICAgZGVmYXVsdDpcbiAgICAgICAgcmVzcG9uc2UucmVzdW1lKCk7XG4gICAgICAgIGNvbnN0IG1lc3NhZ2UgPSBcIkRpZCBub3QgZ2V0IGFuIE9LIGZyb20gdGhlIHNlcnZlci4gQ29kZTogXCIgKyByZXNwb25zZS5zdGF0dXNDb2RlO1xuICAgICAgICBsb2dnZXIuZXJyb3IobWVzc2FnZSk7XG4gICAgICAgIHJlamVjdChtZXNzYWdlKTtcbiAgICAgICAgYnJlYWs7XG4gICAgICB9XG4gICAgfTtcblxuICAgIGxvZ2dlci5pbmZvKGB3Z2V0ICR7dXJsfWApO1xuICAgIGNvbnN0IHJlcXVlc3QgPSBodHRwUmVxdWVzdCh1cmwsIGh0dHBPcHRpb25zLCBvblJlcXVlc3QpO1xuICAgIHJlcXVlc3Qub24oJ3RpbWVvdXQnLCBvblRpbWVvdXQuYmluZChudWxsLCByZXF1ZXN0KSk7XG4gICAgcmVxdWVzdC5vbignZXJyb3InLCBvbkVycm9yKTtcbiAgICByZXF1ZXN0LmVuZCgpO1xuICB9KTtcbn07XG5cbmV4cG9ydCBmdW5jdGlvbiBkb3dubG9hZEZpbGUodXJsOiBzdHJpbmcsIGZpbGU6IHN0cmluZykge1xuICByZXR1cm4gbmV3IFByb21pc2UoKHJlc29sdmUsIHJlamVjdCkgPT4ge1xuICAgIGNvbnN0IGZpbGVuYW1lID0gcGF0aC5iYXNlbmFtZSh1cmwpO1xuXG4gICAgY29uc3QgY2xpZW50ID0gKCgpID0+IHtcbiAgICAgIGlmIChmaWxlKSB7XG4gICAgICAgIGNvbnN0IGZkID0gZnMub3BlblN5bmMoZmlsZSwgXCJ3XCIpO1xuICAgICAgICByZXR1cm4ge1xuICAgICAgICAgIG9uRGF0YTogKGNodW5rOiBCdWZmZXIpID0+IHtcbiAgICAgICAgICAgIGZzLndyaXRlU3luYyhmZCwgY2h1bmspO1xuICAgICAgICAgIH0sXG4gICAgICAgICAgb25FbmQ6ICgpID0+IHtcbiAgICAgICAgICAgIGZzLmNsb3NlU3luYyhmZCk7XG4gICAgICAgICAgICByZXNvbHZlKHVuZGVmaW5lZCk7XG4gICAgICAgICAgfSxcbiAgICAgICAgfTtcbiAgICAgIH1cbiAgICAgIGVsc2Uge1xuICAgICAgICBjb25zdCBjaHVua3M6IEFycmF5PEJ1ZmZlcj4gPSBbXTtcbiAgICAgICAgcmV0dXJuIHtcbiAgICAgICAgICBvbkRhdGE6IChjaHVuazogQnVmZmVyKSA9PiB7XG4gICAgICAgICAgICBjaHVua3MucHVzaChjaHVuayk7XG4gICAgICAgICAgfSxcbiAgICAgICAgICBvbkVuZDogKCkgPT4ge1xuICAgICAgICAgICAgcmVzb2x2ZShCdWZmZXIuY29uY2F0KGNodW5rcykpO1xuICAgICAgICAgIH0sXG4gICAgICAgIH07XG4gICAgICB9XG4gICAgfSkoKTtcbiAgXG4gICAgY29uc3Qgc3RhcnRSZXF1ZXN0ID0gKHVybDogc3RyaW5nLCBjYWxsYmFjazogYW55KSA9PiB7XG4gICAgICBjb25zdCByZXF1ZXN0ID0gaHR0cHMucmVxdWVzdCh1cmwsIGh0dHBPcHRpb25zLCBjYWxsYmFjayk7XG4gICAgICBpZiAocmVxdWVzdCkge1xuICAgICAgICByZXF1ZXN0Lm9uKCdlcnJvcicsIChlcnJvcikgPT4gcmVqZWN0KGVycm9yKSk7XG4gICAgICAgIHJlcXVlc3QuZW5kKCk7IFxuICAgICAgfVxuICAgICAgZWxzZSB7XG4gICAgICAgIHJlamVjdChgVXJsIHNjaGVtZSBub3Qgc3VwcG9ydGVkIGZvciAke3VybH1gKTtcbiAgICAgIH1cbiAgICB9O1xuXG4gICAgY29uc3Qgb25SZXF1ZXN0ID0gKHJlc3BvbnNlOiBhbnkpID0+IHtcbiAgICAgIHN3aXRjaCAocmVzcG9uc2Uuc3RhdHVzQ29kZSkge1xuICAgICAgY2FzZSAyMDA6XG4gICAgICAgIGxvZ2dlci5pbmZvKGBDb25uY3RlZCB0byAke3Jlc3BvbnNlLnJlcS5ob3N0fWApO1xuICAgICAgICBsb2dnZXIuaW5mbyhgRG93bmxvYWRpbmcgJHtmaWxlbmFtZX1gKTtcbiAgICAgICAgcmVzcG9uc2Uub24oJ2RhdGEnLCBjbGllbnQub25EYXRhKTtcbiAgICAgICAgcmVzcG9uc2Uub24oJ2VuZCcsIGNsaWVudC5vbkVuZCk7XG4gICAgICAgIHJlc3BvbnNlLm9uKCdjbG9zZScsICgpID0+IGxvZ2dlci5pbmZvKGBEb25lYCkpO1xuICAgICAgICBicmVhaztcblxuICAgICAgY2FzZSAzMDE6XG4gICAgICBjYXNlIDMwMjpcbiAgICAgICAgcmVzcG9uc2UucmVzdW1lKCk7XG4gICAgICAgIGxvZ2dlci5pbmZvKGBSZXNvbHZpbmcgJHtyZXNwb25zZS5oZWFkZXJzLmxvY2F0aW9ufWApO1xuICAgICAgICBzdGFydFJlcXVlc3QocmVzcG9uc2UuaGVhZGVycy5sb2NhdGlvbiwgb25SZXF1ZXN0KTtcbiAgICAgICAgYnJlYWs7XG5cbiAgICAgIGRlZmF1bHQ6XG4gICAgICAgIHJlc3BvbnNlLnJlc3VtZSgpO1xuICAgICAgICByZWplY3QoYERpZCBub3QgZ2V0IGFuIE9LIGZyb20gdGhlIHNlcnZlci4gQ29kZTogJHtyZXNwb25zZS5zdGF0dXNDb2RlfWApO1xuICAgICAgICBicmVhaztcbiAgICAgIH1cbiAgICB9O1xuXG4gICAgbG9nZ2VyLmluZm8oYFJlcXVlc3QgdG8gJHt1cmx9YCk7XG4gICAgc3RhcnRSZXF1ZXN0KHVybCwgb25SZXF1ZXN0KTtcbiAgfSk7XG59XG4iLCIvKlxuICogTUlUIExpY2Vuc2VcbiAqXG4gKiBDb3B5cmlnaHQgKGMpIDIwMjUgIFl1cmlpIFlha3ViaW4gKHl1cmlpLnlha3ViaW5AZ21haWwuY29tKVxuICpcbiAqIFBlcm1pc3Npb24gaXMgZ3JhbnRlZCB0byB1c2UsIGNvcHksIG1vZGlmeSwgYW5kIGRpc3RyaWJ1dGUgdGhpcyBzb2Z0d2FyZVxuICogdW5kZXIgdGhlIE1JVCBMaWNlbnNlLiBTZWUgTElDRU5TRSBmaWxlIGZvciBkZXRhaWxzLlxuICovXG5cbmV4cG9ydCBjb25zdCBpbXBvcnRNb2R1bGUgPSBhc3luYyAobmFtZSkgPT4gaW1wb3J0KC8qIHdlYnBhY2tJZ25vcmU6IHRydWUgKi8gbmFtZSk7XG4iLCJpbXBvcnQgZnMgZnJvbSBcIm5vZGU6ZnNcIjtcbmltcG9ydCBwYXRoIGZyb20gXCJub2RlOnBhdGhcIjtcblxuaW1wb3J0IHsgZmlsZUxpc3QgfSBmcm9tIFwiQC91dGlscy9GaWxlU3lzdGVtXCI7XG5pbXBvcnQgeyBjcmVhdGVMb2dnZXIgfSBmcm9tIFwiQC9sb2dnZXJcIjtcblxuY29uc3QgbG9nZ2VyID0gY3JlYXRlTG9nZ2VyKGltcG9ydC5tZXRhLnVybCk7XG5cbmV4cG9ydCBhc3luYyBmdW5jdGlvbiBtYWtlUGF0Y2goc3JjRGlyLCBkZXN0RGlyKSB7XG4gIGxvZ2dlci5pbmZvKGBNYWtlIHBhdGNoICR7c3JjRGlyfSB0byAke2Rlc3REaXJ9YCk7XG4gIGNvbnN0IGxpc3QgPSBhd2FpdCBmaWxlTGlzdChzcmNEaXIsIHsgcmVsYXRpdmU6IHNyY0RpciwgcmVjdXJzaXZlOiB0cnVlIH0pO1xuICBmb3IgKGNvbnN0IGl0ZXIgb2YgbGlzdCkge1xuICAgIGNvbnN0IHNvdXJjZSA9IHBhdGgucmVzb2x2ZShzcmNEaXIsIGl0ZXIpO1xuICAgIGNvbnN0IGRlc3RpbmF0aW9uID0gcGF0aC5yZXNvbHZlKGRlc3REaXIsIGl0ZXIpO1xuICAgIGF3YWl0IGZzLnByb21pc2VzLmNwKHNvdXJjZSwgZGVzdGluYXRpb24sIHsgZm9yY2U6IHRydWUgfSk7XG4gICAgbG9nZ2VyLmluZm8oYCBSZXBsYWNlZCAke2l0ZXJ9YCk7XG4gIH1cbn1cbiIsIi8qXG4gKiBNSVQgTGljZW5zZVxuICpcbiAqIENvcHlyaWdodCAoYykgMjAyNSAgWXVyaWkgWWFrdWJpbiAoeXVyaWkueWFrdWJpbkBnbWFpbC5jb20pXG4gKlxuICogUGVybWlzc2lvbiBpcyBncmFudGVkIHRvIHVzZSwgY29weSwgbW9kaWZ5LCBhbmQgZGlzdHJpYnV0ZSB0aGlzIHNvZnR3YXJlXG4gKiB1bmRlciB0aGUgTUlUIExpY2Vuc2UuIFNlZSBMSUNFTlNFIGZpbGUgZm9yIGRldGFpbHMuXG4gKi9cblxuY29uc3QgcmVxdWlyZUltcGwgPSBldmFsKFwicmVxdWlyZVwiKTtcblxuZXhwb3J0IGZ1bmN0aW9uIHJlcXVpcmVSZXNvbHZlKG5hbWU6IHN0cmluZykge1xuICBpZiAodHlwZW9mIGltcG9ydC5tZXRhLnJlc29sdmUgPT09ICdmdW5jdGlvbicpXG4gICAgcmV0dXJuIGltcG9ydC5tZXRhLnJlc29sdmUobmFtZSk7XG4gIGlmICh0eXBlb2YgcmVxdWlyZUltcGwgIT09ICd1bmRlZmluZWQnKVxuICAgIHJldHVybiByZXF1aXJlSW1wbC5yZXNvbHZlKG5hbWUpO1xuICB0aHJvdyBuZXcgRXJyb3IoXCJObyBjb21wYXRpYmxlIG1vZHVsZSByZXNvbHZlciBmb3VuZFwiKTtcbn1cblxuZXhwb3J0IHsgaW1wb3J0TW9kdWxlIH0gZnJvbSBcIi4vSW1wb3J0TW9kdWxlLm1qc1wiO1xuIiwiLypcbiAqIE1JVCBMaWNlbnNlXG4gKlxuICogQ29weXJpZ2h0IChjKSAyMDI1ICBZdXJpaSBZYWt1YmluICh5dXJpaS55YWt1YmluQGdtYWlsLmNvbSlcbiAqXG4gKiBQZXJtaXNzaW9uIGlzIGdyYW50ZWQgdG8gdXNlLCBjb3B5LCBtb2RpZnksIGFuZCBkaXN0cmlidXRlIHRoaXMgc29mdHdhcmVcbiAqIHVuZGVyIHRoZSBNSVQgTGljZW5zZS4gU2VlIExJQ0VOU0UgZmlsZSBmb3IgZGV0YWlscy5cbiAqL1xuXG5leHBvcnQgZnVuY3Rpb24gZXF1YWxWYWx1ZShhOiBhbnksIGI6IGFueSk6IGJvb2xlYW4ge1xuICBpZiAoYSA9PT0gYilcbiAgICByZXR1cm4gdHJ1ZTtcblxuICBpZiAoYSA9PT0gdW5kZWZpbmVkIHx8IGIgPT09IHVuZGVmaW5lZClcbiAgICByZXR1cm4gZmFsc2U7XG5cbiAgaWYgKHR5cGVvZiBhICE9PSBcIm9iamVjdFwiIHx8IHR5cGVvZiBiICE9PSBcIm9iamVjdFwiKVxuICAgIHJldHVybiBmYWxzZTtcblxuICBjb25zdCBrMSA9IE9iamVjdC5rZXlzKGEpO1xuICBjb25zdCBrMiA9IE9iamVjdC5rZXlzKGIpO1xuXG4gIGlmIChrMS5sZW5ndGggIT0gazIubGVuZ3RoKVxuICAgIHJldHVybiBmYWxzZTtcblxuICBmb3IgKGNvbnN0IGtleSBvZiBrMSkge1xuICAgIGlmICghT2JqZWN0Lmhhc093bihiLCBrZXkpIHx8ICFlcXVhbFZhbHVlKGFba2V5XSwgYltrZXldKSlcbiAgICAgIHJldHVybiBmYWxzZTtcbiAgfVxuXG4gIHJldHVybiB0cnVlO1xufVxuXG5leHBvcnQgZnVuY3Rpb24gY29weVZhbHVlKG86IGFueSk6IGFueSB7XG4gIGlmICghbyB8fCB0eXBlb2YgbyAhPT0gXCJvYmplY3RcIilcbiAgICByZXR1cm4gbztcbiAgaWYgKEFycmF5LmlzQXJyYXkobykpIHtcbiAgICBjb25zdCByZXN1bHQgPSBbXTtcbiAgICBmb3IgKGNvbnN0IGl0ZXIgb2YgbylcbiAgICAgIHJlc3VsdC5wdXNoKGNvcHlWYWx1ZShpdGVyKSk7XG4gICAgcmV0dXJuIHJlc3VsdDtcbiAgfVxuICBlbHNlIHtcbiAgICBjb25zdCByZXN1bHQgPSB7fSBhcyBhbnk7XG4gICAgZm9yIChjb25zdCBba2V5LHZhbF0gb2YgT2JqZWN0LmVudHJpZXMobykpXG4gICAgICByZXN1bHRba2V5XSA9IGNvcHlWYWx1ZSh2YWwpO1xuICAgIHJldHVybiByZXN1bHQ7XG4gIH1cbn1cblxuZXhwb3J0IGZ1bmN0aW9uIGFzc2lnbk9iamVjdCh0YXJnZXQ6IGFueSwgc291cmNlOiBhbnkpIHtcbiAgaWYgKEFycmF5LmlzQXJyYXkodGFyZ2V0KSAmJiBBcnJheS5pc0FycmF5KHNvdXJjZSkpIHtcbiAgICBmb3IgKGNvbnN0IGl0ZXIgb2Ygc291cmNlKVxuICAgICAgdGFyZ2V0LnB1c2goaXRlcik7XG4gIH1cbiAgZWxzZSB7XG4gICAgZm9yIChjb25zdCBrZXkgb2YgT2JqZWN0LmtleXMoc291cmNlKSkge1xuICAgICAgY29uc3QgYSA9IHRhcmdldFtrZXldLCBiID0gc291cmNlW2tleV07XG4gICAgICBpZiAoYSAmJiB0eXBlb2YgYSA9PT0gXCJvYmplY3RcIiAmJiBiICYmIHR5cGVvZiBiID09PSBcIm9iamVjdFwiKVxuICAgICAgICBhc3NpZ25PYmplY3QoYSwgYik7XG4gICAgICBlbHNlXG4gICAgICAgIHRhcmdldFtrZXldID0gY29weVZhbHVlKGIpO1xuICAgIH1cbiAgfVxufVxuXG5leHBvcnQgZnVuY3Rpb24gYXJyYXlXcmFwcGVyKHZhbHVlOiBhbnkpIHtcbiAgaWYgKHZhbHVlID09PSB1bmRlZmluZWQgfHwgQXJyYXkuaXNBcnJheSh2YWx1ZSkpXG4gICAgcmV0dXJuIHZhbHVlO1xuICByZXR1cm4gWyB2YWx1ZSBdO1xufVxuIiwiY29uc3QgZnMgPSByZXF1aXJlKCdmcycpO1xuXG5jbGFzcyBTZXR0aW5nc1N0b3JhZ2Uge1xuICBfZmlsZW5hbWU7XG4gIF9lbmNvZGluZyA9IFwidXRmLThcIjtcbiAgX3NldHRpbmdzO1xuICBfY3VycmVudDtcblxuICBjb25zdHJ1Y3RvcihmaWxlbmFtZSlcbiAge1xuICAgIHRoaXMuX2ZpbGVuYW1lID0gZmlsZW5hbWU7XG4gIH1cblxuICBhc3luYyBwdXNoKG5hbWUpXG4gIHtcbiAgICBpZiAoIXRoaXMuX3NldHRpbmdzKVxuICAgICAgYXdhaXQgdGhpcy5sb2FkKCk7XG4gICAgbGV0IG9iamVjdCA9IHRoaXMuX2N1cnJlbnQub2JqZWN0W25hbWVdO1xuICAgIGlmICghb2JqZWN0KVxuICAgICAgb2JqZWN0ID0gdGhpcy5fY3VycmVudC5vYmplY3RbbmFtZV0gPSB7fTtcbiAgICB0aGlzLl9jdXJyZW50ID0geyBwYXJlbnQ6IHRoaXMuX2N1cnJlbnQsIG9iamVjdCB9O1xuICB9XG5cbiAgYXN5bmMgcG9wKClcbiAge1xuICAgIGlmICghdGhpcy5fc2V0dGluZ3MpXG4gICAgICBhd2FpdCB0aGlzLmxvYWQoKTtcbiAgICBjb25zb2xlLmFzc2VydCh0aGlzLl9jdXJyZW50LnBhcmVudCk7XG4gICAgdGhpcy5fY3VycmVudCA9IHRoaXMuX2N1cnJlbnQucGFyZW50O1xuICB9XG5cbiAgYXN5bmMgZ2V0KG5hbWUpXG4gIHtcbiAgICBpZiAoIXRoaXMuX3NldHRpbmdzKVxuICAgICAgYXdhaXQgdGhpcy5sb2FkKCk7XG4gICAgcmV0dXJuIHRoaXMuX2N1cnJlbnQub2JqZWN0W25hbWVdO1xuICB9XG5cbiAgYXN5bmMgc2V0KG5hbWUsIHZhbHVlKVxuICB7XG4gICAgaWYgKCF0aGlzLl9zZXR0aW5ncylcbiAgICAgIGF3YWl0IHRoaXMubG9hZCgpO1xuICAgIHRoaXMuX2N1cnJlbnQub2JqZWN0W25hbWVdID0gdmFsdWU7XG4gICAgYXdhaXQgdGhpcy5zYXZlKCk7XG4gIH1cblxuICBhc3luYyBsb2FkKClcbiAge1xuICAgIHRyeSB7XG4gICAgICBjb25zdCBjb250ZW50ID0gYXdhaXQgZnMucHJvbWlzZXMucmVhZEZpbGUodGhpcy5fZmlsZW5hbWUsIHRoaXMuX2VuY29kaW5nKTtcbiAgICAgIHRoaXMuX3NldHRpbmdzID0gSlNPTi5wYXJzZShjb250ZW50KTtcbiAgICB9XG4gICAgY2F0Y2ggKGUpIHtcbiAgICAgIHRoaXMuX3NldHRpbmdzID0ge307XG4gICAgfVxuICAgIHRoaXMuX2N1cnJlbnQgPVxuICAgIHtcbiAgICAgIHBhcmVudDogbnVsbCxcbiAgICAgIG9iamVjdDogdGhpcy5fc2V0dGluZ3MsXG4gICAgfTtcbiAgfVxuXG4gIGFzeW5jIHNhdmUoKVxuICB7XG4gICAgY29uc3Qgc3BhY2UgPSAyO1xuICAgIGNvbnN0IGNvbnRlbnQgPSBKU09OLnN0cmluZ2lmeSh0aGlzLl9zZXR0aW5ncywgdW5kZWZpbmVkLCBzcGFjZSk7XG4gICAgYXdhaXQgZnMucHJvbWlzZXMud3JpdGVGaWxlKHRoaXMuX2ZpbGVuYW1lLCBjb250ZW50LCB7IGVuY29kaW5nOiB0aGlzLl9lbmNvZGluZywgZmxhZzogJ3cnLCBmbHVzaDogdHJ1ZSB9KTtcbiAgfVxufTtcblxubW9kdWxlLmV4cG9ydHMgPSB7XG4gIFNldHRpbmdzU3RvcmFnZSxcbn07XG4iLCIvKlxuICogTUlUIExpY2Vuc2VcbiAqXG4gKiBDb3B5cmlnaHQgKGMpIDIwMjUgIFl1cmlpIFlha3ViaW4gKHl1cmlpLnlha3ViaW5AZ21haWwuY29tKVxuICpcbiAqIFBlcm1pc3Npb24gaXMgZ3JhbnRlZCB0byB1c2UsIGNvcHksIG1vZGlmeSwgYW5kIGRpc3RyaWJ1dGUgdGhpcyBzb2Z0d2FyZVxuICogdW5kZXIgdGhlIE1JVCBMaWNlbnNlLiBTZWUgTElDRU5TRSBmaWxlIGZvciBkZXRhaWxzLlxuICovXG5cbmV4cG9ydCBmdW5jdGlvbiBlbnN1cmVCb29sZWFuKHZhbHVlOiBhbnkpIHtcbiAgaWYgKHR5cGVvZiB2YWx1ZSA9PT0gXCJib29sZWFuXCIpXG4gICAgcmV0dXJuIHZhbHVlO1xuICB0aHJvdyBuZXcgRXJyb3IoYFRoZSAnJHt2YWx1ZX0nIGlzIG5vdCBhIGJvb2xlYW5gKTtcbn1cblxuZXhwb3J0IGZ1bmN0aW9uIGVuc3VyZVN0cmluZyh2YWx1ZTogYW55KSB7XG4gIGlmICh0eXBlb2YgdmFsdWUgPT09IFwic3RyaW5nXCIpXG4gICAgcmV0dXJuIHZhbHVlO1xuICB0aHJvdyBuZXcgRXJyb3IoYFRoZSAnJHt2YWx1ZX0nIGlzIG5vdCBhIHN0cmluZ2ApO1xufVxuIiwibW9kdWxlLmV4cG9ydHMgPSByZXF1aXJlKFwiY2hpbGRfcHJvY2Vzc1wiKTsiLCJtb2R1bGUuZXhwb3J0cyA9IHJlcXVpcmUoXCJmc1wiKTsiLCJtb2R1bGUuZXhwb3J0cyA9IHJlcXVpcmUoXCJodHRwXCIpOyIsIm1vZHVsZS5leHBvcnRzID0gcmVxdWlyZShcImh0dHBzXCIpOyIsIm1vZHVsZS5leHBvcnRzID0gcmVxdWlyZShcIm5vZGU6Y2hpbGRfcHJvY2Vzc1wiKTsiLCJtb2R1bGUuZXhwb3J0cyA9IHJlcXVpcmUoXCJub2RlOmZzXCIpOyIsIm1vZHVsZS5leHBvcnRzID0gcmVxdWlyZShcIm5vZGU6b3NcIik7IiwibW9kdWxlLmV4cG9ydHMgPSByZXF1aXJlKFwibm9kZTpwYXRoXCIpOyIsIm1vZHVsZS5leHBvcnRzID0gcmVxdWlyZShcIm5vZGU6dXJsXCIpOyIsIm1vZHVsZS5leHBvcnRzID0gcmVxdWlyZShcInBhdGhcIik7IiwiLy8gVGhlIG1vZHVsZSBjYWNoZVxudmFyIF9fd2VicGFja19tb2R1bGVfY2FjaGVfXyA9IHt9O1xuXG4vLyBUaGUgcmVxdWlyZSBmdW5jdGlvblxuZnVuY3Rpb24gX193ZWJwYWNrX3JlcXVpcmVfXyhtb2R1bGVJZCkge1xuXHQvLyBDaGVjayBpZiBtb2R1bGUgaXMgaW4gY2FjaGVcblx0dmFyIGNhY2hlZE1vZHVsZSA9IF9fd2VicGFja19tb2R1bGVfY2FjaGVfX1ttb2R1bGVJZF07XG5cdGlmIChjYWNoZWRNb2R1bGUgIT09IHVuZGVmaW5lZCkge1xuXHRcdHJldHVybiBjYWNoZWRNb2R1bGUuZXhwb3J0cztcblx0fVxuXHQvLyBDcmVhdGUgYSBuZXcgbW9kdWxlIChhbmQgcHV0IGl0IGludG8gdGhlIGNhY2hlKVxuXHR2YXIgbW9kdWxlID0gX193ZWJwYWNrX21vZHVsZV9jYWNoZV9fW21vZHVsZUlkXSA9IHtcblx0XHQvLyBubyBtb2R1bGUuaWQgbmVlZGVkXG5cdFx0Ly8gbm8gbW9kdWxlLmxvYWRlZCBuZWVkZWRcblx0XHRleHBvcnRzOiB7fVxuXHR9O1xuXG5cdC8vIEV4ZWN1dGUgdGhlIG1vZHVsZSBmdW5jdGlvblxuXHRfX3dlYnBhY2tfbW9kdWxlc19fW21vZHVsZUlkXShtb2R1bGUsIG1vZHVsZS5leHBvcnRzLCBfX3dlYnBhY2tfcmVxdWlyZV9fKTtcblxuXHQvLyBSZXR1cm4gdGhlIGV4cG9ydHMgb2YgdGhlIG1vZHVsZVxuXHRyZXR1cm4gbW9kdWxlLmV4cG9ydHM7XG59XG5cbiIsIi8vIGdldERlZmF1bHRFeHBvcnQgZnVuY3Rpb24gZm9yIGNvbXBhdGliaWxpdHkgd2l0aCBub24taGFybW9ueSBtb2R1bGVzXG5fX3dlYnBhY2tfcmVxdWlyZV9fLm4gPSAobW9kdWxlKSA9PiB7XG5cdHZhciBnZXR0ZXIgPSBtb2R1bGUgJiYgbW9kdWxlLl9fZXNNb2R1bGUgP1xuXHRcdCgpID0+IChtb2R1bGVbJ2RlZmF1bHQnXSkgOlxuXHRcdCgpID0+IChtb2R1bGUpO1xuXHRfX3dlYnBhY2tfcmVxdWlyZV9fLmQoZ2V0dGVyLCB7IGE6IGdldHRlciB9KTtcblx0cmV0dXJuIGdldHRlcjtcbn07IiwiLy8gZGVmaW5lIGdldHRlciBmdW5jdGlvbnMgZm9yIGhhcm1vbnkgZXhwb3J0c1xuX193ZWJwYWNrX3JlcXVpcmVfXy5kID0gKGV4cG9ydHMsIGRlZmluaXRpb24pID0+IHtcblx0Zm9yKHZhciBrZXkgaW4gZGVmaW5pdGlvbikge1xuXHRcdGlmKF9fd2VicGFja19yZXF1aXJlX18ubyhkZWZpbml0aW9uLCBrZXkpICYmICFfX3dlYnBhY2tfcmVxdWlyZV9fLm8oZXhwb3J0cywga2V5KSkge1xuXHRcdFx0T2JqZWN0LmRlZmluZVByb3BlcnR5KGV4cG9ydHMsIGtleSwgeyBlbnVtZXJhYmxlOiB0cnVlLCBnZXQ6IGRlZmluaXRpb25ba2V5XSB9KTtcblx0XHR9XG5cdH1cbn07IiwiX193ZWJwYWNrX3JlcXVpcmVfXy5vID0gKG9iaiwgcHJvcCkgPT4gKE9iamVjdC5wcm90b3R5cGUuaGFzT3duUHJvcGVydHkuY2FsbChvYmosIHByb3ApKSIsIi8vIGRlZmluZSBfX2VzTW9kdWxlIG9uIGV4cG9ydHNcbl9fd2VicGFja19yZXF1aXJlX18uciA9IChleHBvcnRzKSA9PiB7XG5cdGlmKHR5cGVvZiBTeW1ib2wgIT09ICd1bmRlZmluZWQnICYmIFN5bWJvbC50b1N0cmluZ1RhZykge1xuXHRcdE9iamVjdC5kZWZpbmVQcm9wZXJ0eShleHBvcnRzLCBTeW1ib2wudG9TdHJpbmdUYWcsIHsgdmFsdWU6ICdNb2R1bGUnIH0pO1xuXHR9XG5cdE9iamVjdC5kZWZpbmVQcm9wZXJ0eShleHBvcnRzLCAnX19lc01vZHVsZScsIHsgdmFsdWU6IHRydWUgfSk7XG59OyIsImltcG9ydCB1cmwgZnJvbSBcIm5vZGU6dXJsXCI7XG5pbXBvcnQgcGF0aCBmcm9tIFwibm9kZTpwYXRoXCI7XG5cbmltcG9ydCB7IFJ1blNjcmlwdENvbnRleHQgfSBmcm9tIFwiLi9SdW5TY3JpcHRDb250ZXh0Lm1qc1wiO1xuaW1wb3J0IGluaXRIYW5kbGVyIGZyb20gXCIuL0luaXRIYW5kbGVyLm1qc1wiO1xuaW1wb3J0IGJ1aWxkSGFuZGxlciBmcm9tIFwiLi9CdWlsZEhhbmRsZXIubWpzXCI7XG5cbmNvbnN0IF9fZmlsZW5hbWUgPSB1cmwuZmlsZVVSTFRvUGF0aChpbXBvcnQubWV0YS51cmwpO1xuY29uc3QgX19kaXJuYW1lID0gcGF0aC5kaXJuYW1lKF9fZmlsZW5hbWUpO1xuXG5jb25zdCBoYW5kbGVyTWFwID0ge1xuICBkZWZhdWx0OiBidWlsZEhhbmRsZXIsXG4gIGluaXQ6IGluaXRIYW5kbGVyLFxuICBidWlsZDogYnVpbGRIYW5kbGVyLFxufTtcblxuZnVuY3Rpb24gdG9PcHRpb25LZXkobmFtZSlcbntcbiAgaWYgKCFuYW1lLnN0YXJ0c1dpdGgoXCItLVwiKSlcbiAgICByZXR1cm4gbnVsbDtcblxuICBuYW1lID0gbmFtZS5zdWJzdHJpbmcoMikudG9Mb3dlckNhc2UoKTtcbiAgaWYgKCFuYW1lLmxlbmd0aClcbiAgICByZXR1cm4gbnVsbDtcblxuICBsZXQga2V5ID0gbmFtZS5jaGFyQXQoMCk7XG4gIGlmICgha2V5Lm1hdGNoKC9bYS16XS8pKVxuICAgIHJldHVybiBudWxsO1xuXG4gIGxldCBoeXBoZW4gPSAwO1xuICBmb3IgKGxldCBpID0gMTsgaSA8IG5hbWUubGVuZ3RoOyBpKyspIHtcbiAgICBjb25zdCBjaCA9IG5hbWUuY2hhckF0KGkpO1xuICAgIGlmIChjaC5tYXRjaCgvW2EtejAtOV0vKSkge1xuICAgICAga2V5ICs9IChoeXBoZW4gPyBjaC50b1VwcGVyQ2FzZSgpIDogY2gpXG4gICAgICBoeXBoZW4gPSAwO1xuICAgIH1cbiAgICBlbHNlIGlmIChjaCA9PSBcIi1cIikge1xuICAgICAgaWYgKCsraHlwaGVuID4gMSlcbiAgICAgICAgcmV0dXJuIG51bGw7XG4gICAgfVxuICB9XG5cbiAgcmV0dXJuIGh5cGhlbiA/IG51bGwgOiBrZXk7XG59XG5cbmFzeW5jIGZ1bmN0aW9uIHJ1blNjcmlwdCgpXG57XG4gIGNvbnN0IG9wdGlvbnMgPSB7XG4gICAgaGFuZGxlcjogXCJkZWZhdWx0XCIsXG4gICAgbm9kZUV4ZWN1dGFibGU6IG51bGwsXG4gICAgY3VycmVudFNjcmlwdDogbnVsbCxcbiAgICBzY3JpcHREaXI6IF9fZGlybmFtZSxcbiAgICByb290RGlyOiBwYXRoLmRpcm5hbWUoX19kaXJuYW1lKSxcbiAgICB3b3JrRGlyOiBwcm9jZXNzLmN3ZCgpLFxuICAgIGVudjoge30sXG4gIH07XG5cbiAgaWYgKHByb2Nlc3MuYXJndi5sZW5ndGggPiAwKVxuICAgIG9wdGlvbnMubm9kZUV4ZWN1dGFibGUgPSBwcm9jZXNzLmFyZ3ZbMF07XG4gIGlmIChwcm9jZXNzLmFyZ3YubGVuZ3RoID4gMSlcbiAgICBvcHRpb25zLmN1cnJlbnRTY3JpcHQgPSBwcm9jZXNzLmFyZ3ZbMV07XG5cbiAgbGV0IGFyZ3NJbmRleCA9IHByb2Nlc3MuYXJndi5sZW5ndGg7XG4gIGlmIChwcm9jZXNzLmFyZ3YubGVuZ3RoID4gMikge1xuICAgIGFyZ3NJbmRleCA9IDI7XG4gICAgY29uc3QgaGFuZGxlciA9IHByb2Nlc3MuYXJndlthcmdzSW5kZXhdO1xuICAgIGlmICghaGFuZGxlci5zdGFydHNXaXRoKFwiLS1cIikpIHtcbiAgICAgIG9wdGlvbnMuaGFuZGxlciA9IGhhbmRsZXI7XG4gICAgICBhcmdzSW5kZXgrKztcbiAgICB9XG4gIH1cblxuICBpZiAoIWhhbmRsZXJNYXAuaGFzT3duUHJvcGVydHkob3B0aW9ucy5oYW5kbGVyKSkge1xuICAgIGNvbnN0IHNjcmlwdE5hbWUgPSBvcHRpb25zLmN1cnJlbnRTY3JpcHQgPyBwYXRoLmJhc2VuYW1lKG9wdGlvbnMuY3VycmVudFNjcmlwdCkgOiBcIndhc211eFwiO1xuICAgIHRocm93IGBUaGUgJHtzY3JpcHROYW1lfSBkb2VzIG5vdCBzdXBwb3J0IHRoZSAke29wdGlvbnMuaGFuZGxlcn0gY29tbWFuZGA7XG4gIH1cblxuICBsZXQgbGFzdEtleSA9IG51bGw7XG4gIHdoaWxlIChhcmdzSW5kZXggPCBwcm9jZXNzLmFyZ3YubGVuZ3RoKSB7XG4gICAgY29uc3QgaXRlciA9IHByb2Nlc3MuYXJndlthcmdzSW5kZXgrK107XG4gICAgaWYgKGl0ZXIuc3RhcnRzV2l0aChcIi0tXCIpKSB7XG4gICAgICBjb25zdCBrZXkgPSB0b09wdGlvbktleShpdGVyKTtcbiAgICAgIGlmICgha2V5KVxuICAgICAgICB0aHJvdyBgT3B0aW9uICR7aXRlcn0gaXMgbm90IHN1cHBvcnRlZGA7XG4gICAgICBpZiAob3B0aW9ucy5lbnYuaGFzT3duUHJvcGVydHkoa2V5KSlcbiAgICAgICAgdGhyb3cgYENhbm5vdCBzcGVjaWZ5IHRoZSBzYW1lIG9wdGlvbiAnJHtpdGVyfScgbW9yZSB0aGFuIG9uY2VgO1xuICAgICAgbGFzdEtleSA9IGtleTtcbiAgICAgIG9wdGlvbnMuZW52W2tleV0gPSB0cnVlO1xuICAgIH1cbiAgICBlbHNlIGlmIChsYXN0S2V5KSB7XG4gICAgICBjb25zdCB2YWx1ZSA9IG9wdGlvbnMuZW52W2xhc3RLZXldO1xuICAgICAgaWYgKHR5cGVvZiB2YWx1ZSA9PT0gJ2Jvb2xlYW4nKVxuICAgICAgICBvcHRpb25zLmVudltsYXN0S2V5XSA9IGl0ZXI7XG4gICAgICBlbHNlIGlmICh0eXBlb2YgdmFsdWUgPT09ICdzdHJpbmcnKVxuICAgICAgICBvcHRpb25zLmVudltsYXN0S2V5XSA9IFsgdmFsdWUsIGl0ZXIgXTtcbiAgICAgIGVsc2VcbiAgICAgICAgdmFsdWUucHVzaChpdGVyKTtcbiAgICB9XG4gICAgZWxzZSB7XG4gICAgICB0aHJvdyBgTmVlZCB0byBzcGVjaWZ5IHRoZSBvcHRpb24gbmFtZSBiZWZvcmUgJyR7aXRlcn0nIHBhcmFtZXRlcmA7XG4gICAgfVxuICB9XG5cbiAgY29uc3QgY29udGV4dCA9IG5ldyBSdW5TY3JpcHRDb250ZXh0KG9wdGlvbnMpO1xuXG4gIGxldCBoYW5kbGVyID0gaGFuZGxlck1hcFtvcHRpb25zLmhhbmRsZXJdO1xuICBpZiAodHlwZW9mIGhhbmRsZXIgPT09IFwic3RyaW5nXCIpIHtcbiAgICBjb25zdCBmaWxlbmFtZSA9IHBhdGguaXNBYnNvbHV0ZShoYW5kbGVyKSA/IGhhbmRsZXIgOiBwYXRoLnJlc29sdmUoX19kaXJuYW1lLCBoYW5kbGVyKTtcbiAgICBjb25zdCBmaWxlVXJsID0gdXJsLnBhdGhUb0ZpbGVVUkwoZmlsZW5hbWUpO1xuICAgIGNvbnN0IG1vZHVsZSA9IGF3YWl0IGltcG9ydChmaWxlVXJsKTtcbiAgICBoYW5kbGVyID0gbW9kdWxlLmRlZmF1bHQ7XG4gIH1cblxuICBjb25zdCByZXMgPSBoYW5kbGVyKGNvbnRleHQpO1xuICBpZiAocmVzIGluc3RhbmNlb2YgUHJvbWlzZSkge1xuICAgIGF3YWl0IHJlcztcbiAgfVxufVxuXG5ydW5TY3JpcHQoKS50aGVuKCgpID0+IHByb2Nlc3MuZXhpdCgwKSkuY2F0Y2goKGUpID0+IHtcbiAgaWYgKGUgaW5zdGFuY2VvZiBFcnJvcikge1xuICAgIGNvbnNvbGUuZXJyb3IoZS5zdGFjayk7XG4gIH1cbiAgZWxzZSB7XG4gICAgY29uc29sZS5lcnJvcihlKTtcbiAgfVxuICBwcm9jZXNzLmV4aXQoMSk7XG59KTtcbiJdLCJuYW1lcyI6W10sInNvdXJjZVJvb3QiOiIifQ==