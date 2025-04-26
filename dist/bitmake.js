(function webpackUniversalModuleDefinition(root, factory) {
	if(typeof exports === 'object' && typeof module === 'object')
		module.exports = factory();
	else if(typeof define === 'function' && define.amd)
		define([], factory);
	else if(typeof exports === 'object')
		exports["bitmake"] = factory();
	else
		root["bitmake"] = factory();
})(global, () => {
return /******/ (() => { // webpackBootstrap
/******/ 	"use strict";
/******/ 	var __webpack_modules__ = ({

/***/ "./src/BuildHandler.ts":
/*!*****************************!*\
  !*** ./src/BuildHandler.ts ***!
  \*****************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (__WEBPACK_DEFAULT_EXPORT__)
/* harmony export */ });
/* harmony import */ var node_fs__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! node:fs */ "node:fs");
/* harmony import */ var node_fs__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(node_fs__WEBPACK_IMPORTED_MODULE_0__);
/* harmony import */ var node_path__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! node:path */ "node:path");
/* harmony import */ var node_path__WEBPACK_IMPORTED_MODULE_1___default = /*#__PURE__*/__webpack_require__.n(node_path__WEBPACK_IMPORTED_MODULE_1__);
/* harmony import */ var _cmake__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! @/cmake */ "./src/cmake/index.ts");
/* harmony import */ var _utils_MakePatch__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! @/utils/MakePatch */ "./src/utils/MakePatch.ts");
/* harmony import */ var _utils_FileSystem__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! @/utils/FileSystem */ "./src/utils/FileSystem.ts");
/* harmony import */ var _utils_SettingsStorage__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(/*! @/utils/SettingsStorage */ "./src/utils/SettingsStorage.ts");
/* harmony import */ var _utils_ChildProcess__WEBPACK_IMPORTED_MODULE_6__ = __webpack_require__(/*! @/utils/ChildProcess */ "./src/utils/ChildProcess.ts");
/* harmony import */ var _MakeScriptAction__WEBPACK_IMPORTED_MODULE_7__ = __webpack_require__(/*! @/MakeScriptAction */ "./src/MakeScriptAction.ts");
/* harmony import */ var _utils_Primitives__WEBPACK_IMPORTED_MODULE_8__ = __webpack_require__(/*! @/utils/Primitives */ "./src/utils/Primitives.ts");
/* harmony import */ var _Constants__WEBPACK_IMPORTED_MODULE_9__ = __webpack_require__(/*! @/Constants */ "./src/Constants.ts");
/* harmony import */ var _utils_Module__WEBPACK_IMPORTED_MODULE_10__ = __webpack_require__(/*! @/utils/Module */ "./src/utils/Module.ts");
/* harmony import */ var _utils_HttpRequest__WEBPACK_IMPORTED_MODULE_11__ = __webpack_require__(/*! @/utils/HttpRequest */ "./src/utils/HttpRequest.ts");
/* harmony import */ var _RunScriptContext__WEBPACK_IMPORTED_MODULE_12__ = __webpack_require__(/*! @/RunScriptContext */ "./src/RunScriptContext.ts");
/* harmony import */ var _logger__WEBPACK_IMPORTED_MODULE_13__ = __webpack_require__(/*! @/logger */ "./src/logger/index.ts");
/*
 * MIT License
 *
 * Copyright (c) 2025  Yurii Yakubin (yurii.yakubin@gmail.com)
 *
 * Permission is granted to use, copy, modify, and distribute this software
 * under the MIT License. See LICENSE file for details.
 */














const logger = (0,_logger__WEBPACK_IMPORTED_MODULE_13__.createLogger)("file:///mnt/c/opt/work/source/darkit-sdk/external/bitmake/src/BuildHandler.ts");
function mergeEnvironment(...args) {
    const environment = {};
    for (const env of args) {
        const list = Object.entries(env || {});
        while (list.length) {
            let [key, val] = list.pop();
            let delimiter;
            let joinAfter = true;
            switch (key) {
                case "PATH":
                    delimiter = (node_path__WEBPACK_IMPORTED_MODULE_1___default().delimiter);
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
                            sel = { mainFile, mainDir: node_path__WEBPACK_IMPORTED_MODULE_1___default().posix.dirname(mainFile), };
                        }
                    }
                    catch (e) { }
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
            else if (typeof val === "string") {
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
    for (const key of ["sourceRoot", "wasmuxDir"]) {
        if (config[key]) {
            throw `The ${key} variable cannot be changed to "${config.sourceRoot}"`;
        }
    }
    const rootConfig = rebaseConfig(config);
    rootConfig.buildType = rootConfig.buildType || ctx.buildType;
    rootConfig.sourceRoot = rootConfig.sourceRoot || ctx.workDir;
    rootConfig.binaryRoot = rootConfig.binaryRoot || node_path__WEBPACK_IMPORTED_MODULE_1___default().posix.resolve(ctx.workDir, "build");
    for (const [key, entry] of Object.entries(rootConfig)) {
        if (entry && typeof entry === "object" && entry.action) {
            entry.buildType = entry.buildType || rootConfig.buildType;
            const folder = key.replace(":", (node_path__WEBPACK_IMPORTED_MODULE_1___default().posix).sep);
            const workDir = node_path__WEBPACK_IMPORTED_MODULE_1___default().posix.join(rootConfig.binaryRoot, folder);
            entry.tempDir = entry.tempDir || node_path__WEBPACK_IMPORTED_MODULE_1___default().posix.join(workDir, "tmp");
            if (entry.sourceUrl) {
                entry.archiveDir = entry.archiveDir || node_path__WEBPACK_IMPORTED_MODULE_1___default().posix.join(workDir, "arc");
                entry.extractDir = entry.extractDir || node_path__WEBPACK_IMPORTED_MODULE_1___default().posix.join(workDir, "src");
                if (!entry.sourceDir)
                    entry.sourceDir = entry.extractDir;
                else if (!node_path__WEBPACK_IMPORTED_MODULE_1___default().isAbsolute(entry.sourceDir))
                    entry.sourceDir = node_path__WEBPACK_IMPORTED_MODULE_1___default().posix.join(entry.extractDir, entry.sourceDir);
            }
            else if (!entry.sourceDir) {
                throw `Missing sourceDir for ${key} action"`;
            }
            if (entry.binaryDir === null)
                entry.binaryDir = entry.sourceDir;
            else if (entry.binaryDir === undefined)
                entry.binaryDir = node_path__WEBPACK_IMPORTED_MODULE_1___default().posix.join(workDir, "bin");
        }
    }
    resolveConfigStrings(rootConfig);
    return rootConfig;
}
async function tryRequestGet(sourceUrl, arcFile, attempts) {
    for (;;) {
        try {
            const buffer = await (0,_utils_HttpRequest__WEBPACK_IMPORTED_MODULE_11__.requestGet)(sourceUrl);
            await node_fs__WEBPACK_IMPORTED_MODULE_0___default().promises.writeFile(arcFile, buffer);
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
async function doExtractArchive(ctx, environment, config, settings) {
    if (!config.sourceUrl)
        throw "Unknown sourceUrl";
    if (!config.archiveDir)
        throw "Unknown archiveDir";
    if (!config.extractDir)
        throw "Unknown extractDir";
    if (!await (0,_utils_FileSystem__WEBPACK_IMPORTED_MODULE_4__.directoryExists)(config.archiveDir)) {
        console.log(`mkdir -p ${config.archiveDir}`);
        await node_fs__WEBPACK_IMPORTED_MODULE_0___default().promises.mkdir(config.archiveDir, { recursive: true });
    }
    if (!await (0,_utils_FileSystem__WEBPACK_IMPORTED_MODULE_4__.directoryExists)(config.tempDir)) {
        console.log(`mkdir -p ${config.tempDir}`);
        await node_fs__WEBPACK_IMPORTED_MODULE_0___default().promises.mkdir(config.tempDir, { recursive: true });
    }
    const arcName = node_path__WEBPACK_IMPORTED_MODULE_1___default().basename(config.sourceUrl);
    let arcFile;
    let downloadUrls = await settings.get("downloadUrls") || {};
    if (downloadUrls[config.sourceUrl])
        arcFile = downloadUrls[config.sourceUrl];
    else {
        arcFile = node_path__WEBPACK_IMPORTED_MODULE_1___default().join(config.archiveDir, arcName);
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
        extractDir = await node_fs__WEBPACK_IMPORTED_MODULE_0___default().promises.mkdtemp(node_path__WEBPACK_IMPORTED_MODULE_1___default().resolve(config.tempDir, arcName + '.'));
        await _cmake__WEBPACK_IMPORTED_MODULE_2__.extract({
            environment,
            filename: arcFile,
            workDir: extractDir,
            logFile: node_path__WEBPACK_IMPORTED_MODULE_1___default().join(config.tempDir, node_path__WEBPACK_IMPORTED_MODULE_1___default().basename(extractDir) + ".log"),
        });
        const extractList = await node_fs__WEBPACK_IMPORTED_MODULE_0___default().promises.readdir(extractDir);
        if (extractList.length === 1) {
            extractDir = node_path__WEBPACK_IMPORTED_MODULE_1___default().resolve(extractDir, extractList[0]);
            if (!await (0,_utils_FileSystem__WEBPACK_IMPORTED_MODULE_4__.directoryExists)(extractDir)) {
                console.log(`rm -fr ${extractDir}`);
                await node_fs__WEBPACK_IMPORTED_MODULE_0___default().promises.rm(extractDir, { recursive: true });
                throw `Support only directory for archive`;
            }
        }
        if (await (0,_utils_FileSystem__WEBPACK_IMPORTED_MODULE_4__.directoryExists)(config.extractDir)) {
            // TODO: Marge extractDir with output
            console.log(`rm -fr ${config.extractDir}`);
            await node_fs__WEBPACK_IMPORTED_MODULE_0___default().promises.rm(config.extractDir, { recursive: true });
        }
        else {
            const parentDir = node_path__WEBPACK_IMPORTED_MODULE_1___default().dirname(config.extractDir);
            if (!await (0,_utils_FileSystem__WEBPACK_IMPORTED_MODULE_4__.directoryExists)(parentDir)) {
                console.log(`mkdir -p ${parentDir}`);
                await node_fs__WEBPACK_IMPORTED_MODULE_0___default().promises.mkdir(parentDir, { recursive: true });
            }
        }
        console.log(`mv ${extractDir} ${config.extractDir}`);
        await node_fs__WEBPACK_IMPORTED_MODULE_0___default().promises.rename(extractDir, config.extractDir);
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
        await _cmake__WEBPACK_IMPORTED_MODULE_2__.configure(cmakeArgs);
        await _cmake__WEBPACK_IMPORTED_MODULE_2__.build(cmakeArgs);
        await _cmake__WEBPACK_IMPORTED_MODULE_2__.install(cmakeArgs);
    },
    configure: async (config, environment, settings) => {
        const sourceDir = (0,_utils_FileSystem__WEBPACK_IMPORTED_MODULE_4__.getPathString)(config.sourceDir);
        const binaryDir = (0,_utils_FileSystem__WEBPACK_IMPORTED_MODULE_4__.getPathString)(config.binaryDir);
        let step = await settings.get("configure") || "config";
        if (step === "config") {
            const command = node_path__WEBPACK_IMPORTED_MODULE_1___default().resolve(sourceDir, "configure");
            const params = [];
            if (Array.isArray(config.variables)) {
                for (const iter of config.variables)
                    params.push(iter);
            }
            else if (config.variables) {
                for (const [key, val] of Object.entries(config.variables)) {
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
            const args = ['install'];
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
        if (!node_path__WEBPACK_IMPORTED_MODULE_1___default().isAbsolute(command) && (command.includes((node_path__WEBPACK_IMPORTED_MODULE_1___default().posix).delimiter) || command.includes((node_path__WEBPACK_IMPORTED_MODULE_1___default().win32).delimiter))) {
            command = node_path__WEBPACK_IMPORTED_MODULE_1___default().resolve(sourceDir, command);
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
    bitmake: _MakeScriptAction__WEBPACK_IMPORTED_MODULE_7__.makeScriptAction,
};
async function doTargetBuild(ctx, environment, config, settings) {
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
            await node_fs__WEBPACK_IMPORTED_MODULE_0___default().promises.mkdir(config.binaryDir, { recursive: true });
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
/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = (async (options) => {
    const ctx = new _RunScriptContext__WEBPACK_IMPORTED_MODULE_12__.RunScriptContext(options);
    const userConfig = await ctx.getUserConfig();
    const buildConfig = makeBuildConfig(ctx, userConfig);
    if (buildConfig.RECIPE_CONTENT_FILE) {
        const jsonConfig = JSON.stringify(buildConfig, null, 2);
        await (0,_utils_FileSystem__WEBPACK_IMPORTED_MODULE_4__.saveIfDifferent)(buildConfig.RECIPE_CONTENT_FILE, jsonConfig);
    }
    const settingsFilename = node_path__WEBPACK_IMPORTED_MODULE_1___default().resolve(buildConfig.binaryRoot, _Constants__WEBPACK_IMPORTED_MODULE_9__.BUILD_SETTINGS_FILE);
    const settings = new _utils_SettingsStorage__WEBPACK_IMPORTED_MODULE_5__.SettingsStorage(settingsFilename);
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
});


/***/ }),

/***/ "./src/Constants.ts":
/*!**************************!*\
  !*** ./src/Constants.ts ***!
  \**************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   ALL_TARGET: () => (/* binding */ ALL_TARGET),
/* harmony export */   BUILD_SETTINGS_FILE: () => (/* binding */ BUILD_SETTINGS_FILE),
/* harmony export */   INSTALL_TARGET: () => (/* binding */ INSTALL_TARGET),
/* harmony export */   REQUEST_ATTEMPTS: () => (/* binding */ REQUEST_ATTEMPTS),
/* harmony export */   USER_CONFIG: () => (/* binding */ USER_CONFIG)
/* harmony export */ });
/*
 * MIT License
 *
 * Copyright (c) 2025  Yurii Yakubin (yurii.yakubin@gmail.com)
 *
 * Permission is granted to use, copy, modify, and distribute this software
 * under the MIT License. See LICENSE file for details.
 */
const USER_CONFIG = "bitmake.config.mjs";
const REQUEST_ATTEMPTS = 30;
const BUILD_SETTINGS_FILE = "BuildSettings.json";
const ALL_TARGET = "all";
const INSTALL_TARGET = "install";


/***/ }),

/***/ "./src/InitHandler.ts":
/*!****************************!*\
  !*** ./src/InitHandler.ts ***!
  \****************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (/* export default binding */ __WEBPACK_DEFAULT_EXPORT__)
/* harmony export */ });
/* harmony import */ var node_fs__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! node:fs */ "node:fs");
/* harmony import */ var node_fs__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(node_fs__WEBPACK_IMPORTED_MODULE_0__);
/* harmony import */ var _utils_FileSystem__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! @/utils/FileSystem */ "./src/utils/FileSystem.ts");
/* harmony import */ var _RunScriptContext__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! @/RunScriptContext */ "./src/RunScriptContext.ts");
/* harmony import */ var _utils_Module__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! @/utils/Module */ "./src/utils/Module.ts");
/* harmony import */ var _logger__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! @/logger */ "./src/logger/index.ts");
/*
 * MIT License
 *
 * Copyright (c) 2025  Yurii Yakubin (yurii.yakubin@gmail.com)
 *
 * Permission is granted to use, copy, modify, and distribute this software
 * under the MIT License. See LICENSE file for details.
 */





const logger = (0,_logger__WEBPACK_IMPORTED_MODULE_4__.createLogger)("file:///mnt/c/opt/work/source/darkit-sdk/external/bitmake/src/InitHandler.ts");
/* harmony default export */ async function __WEBPACK_DEFAULT_EXPORT__(options) {
    const ctx = new _RunScriptContext__WEBPACK_IMPORTED_MODULE_2__.RunScriptContext(options);
    const preset = ctx.env.preset;
    let presetPath;
    if (await (0,_utils_FileSystem__WEBPACK_IMPORTED_MODULE_1__.fileExists)(preset))
        presetPath = preset;
    else {
        const components = preset.split("/");
        if (components.length === 2) {
            try {
                presetPath = (0,_utils_Module__WEBPACK_IMPORTED_MODULE_3__.requireResolve)(`${components[0]}/bitmake/presets/${components[1]}`);
            }
            catch (e) { }
        }
    }
    if (!presetPath)
        throw `Preset '${preset}' is not available`;
    if (await (0,_utils_FileSystem__WEBPACK_IMPORTED_MODULE_1__.fileExists)(ctx.userConfigPath))
        await node_fs__WEBPACK_IMPORTED_MODULE_0___default().promises.rm(ctx.userConfigPath);
    await node_fs__WEBPACK_IMPORTED_MODULE_0___default().promises.copyFile(presetPath, ctx.userConfigPath);
    logger.info(`Preset '${preset}' installed successfully`);
}


/***/ }),

/***/ "./src/MakeScriptAction.ts":
/*!*********************************!*\
  !*** ./src/MakeScriptAction.ts ***!
  \*********************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   makeScriptAction: () => (/* binding */ makeScriptAction)
/* harmony export */ });
/* harmony import */ var node_fs__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! node:fs */ "node:fs");
/* harmony import */ var node_fs__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(node_fs__WEBPACK_IMPORTED_MODULE_0__);
/* harmony import */ var node_path__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! node:path */ "node:path");
/* harmony import */ var node_path__WEBPACK_IMPORTED_MODULE_1___default = /*#__PURE__*/__webpack_require__.n(node_path__WEBPACK_IMPORTED_MODULE_1__);
/* harmony import */ var _core_PluginContext__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! @/core/PluginContext */ "./src/core/PluginContext.ts");
/* harmony import */ var _core_GlobalContext__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! @/core/GlobalContext */ "./src/core/GlobalContext.ts");
/* harmony import */ var _core_Scope__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! @/core/Scope */ "./src/core/Scope.ts");
/* harmony import */ var _core_GoalCollection__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(/*! @/core/GoalCollection */ "./src/core/GoalCollection.ts");
/* harmony import */ var _core_ToolchainContext__WEBPACK_IMPORTED_MODULE_6__ = __webpack_require__(/*! @/core/ToolchainContext */ "./src/core/ToolchainContext.ts");
/* harmony import */ var _utils_FileSystem__WEBPACK_IMPORTED_MODULE_7__ = __webpack_require__(/*! @/utils/FileSystem */ "./src/utils/FileSystem.ts");
/* harmony import */ var _core_Path__WEBPACK_IMPORTED_MODULE_8__ = __webpack_require__(/*! @/core/Path */ "./src/core/Path.ts");
/* harmony import */ var _utils_Module__WEBPACK_IMPORTED_MODULE_9__ = __webpack_require__(/*! @/utils/Module */ "./src/utils/Module.ts");
/* harmony import */ var _core_SystemVariables__WEBPACK_IMPORTED_MODULE_10__ = __webpack_require__(/*! @/core/SystemVariables */ "./src/core/SystemVariables.ts");
/*
 * MIT License
 *
 * Copyright (c) 2025  Yurii Yakubin (yurii.yakubin@gmail.com)
 *
 * Permission is granted to use, copy, modify, and distribute this software
 * under the MIT License. See LICENSE file for details.
 */











const PACKAGE_JSON = "package.json";
const MAKE_CACHE = "MakeCache.json";
async function makeScriptAction(config, environment, settings) {
    process.env = environment;
    let scope = {};
    _core_Scope__WEBPACK_IMPORTED_MODULE_4__.ScopeHelper.defineVariables(scope, "system", _core_SystemVariables__WEBPACK_IMPORTED_MODULE_10__["default"]);
    const sourceDir = (0,_utils_FileSystem__WEBPACK_IMPORTED_MODULE_7__.getPathString)(config.sourceDir);
    const binaryDir = (0,_utils_FileSystem__WEBPACK_IMPORTED_MODULE_7__.getPathString)(config.binaryDir);
    scope.PROJECT_SOURCE_DIR = sourceDir;
    scope.PROJECT_BINARY_DIR = binaryDir;
    scope.PACKAGE_FILE = scope.PROJECT_SOURCE_DIR.join(PACKAGE_JSON);
    scope.CACHE_FILE = scope.PROJECT_BINARY_DIR.join(MAKE_CACHE);
    scope.SOURCE_DIR = scope.PROJECT_SOURCE_DIR;
    scope.BINARY_DIR = scope.PROJECT_BINARY_DIR;
    const packageJson = await node_fs__WEBPACK_IMPORTED_MODULE_0___default().promises.readFile(scope.PACKAGE_FILE.toString(), 'utf8');
    const pkg = JSON.parse(packageJson);
    scope.BUILD_TYPE = config.buildType;
    scope.PROJECT_NAME = pkg.name;
    scope.PROJECT_VERSION = pkg.version;
    scope.PROJECT_DESCRIPTION = pkg.description;
    scope.PROJECT_HOMEPAGE_URL = pkg.homepage;
    if (config.destDir)
        scope.DESTDIR = config.destDir;
    _core_Scope__WEBPACK_IMPORTED_MODULE_4__.ScopeHelper.applyVariables(scope, config.variables || {});
    const global = _core_GlobalContext__WEBPACK_IMPORTED_MODULE_3__.GlobalContext.create();
    if (scope.TOOLCHAIN_FILE) {
        const toolchain = await (0,_utils_Module__WEBPACK_IMPORTED_MODULE_9__.importModule)(scope.TOOLCHAIN_FILE);
        if (!toolchain.default)
            throw new Error("Toolchain module has no default export");
        const mk = _core_ToolchainContext__WEBPACK_IMPORTED_MODULE_6__.ToolchainContext.create(scope, global);
        const result = toolchain.default(mk);
        if (result instanceof Promise)
            await result;
        scope = mk._scope();
        _core_Scope__WEBPACK_IMPORTED_MODULE_4__.ScopeHelper.applyVariables(scope, mk);
    }
    for (const plugin of (scope.MAKE_PLUGIN_LIST || [])) {
        const filename = _core_Path__WEBPACK_IMPORTED_MODULE_8__.FilePath.create(plugin);
        const module = await (0,_utils_Module__WEBPACK_IMPORTED_MODULE_9__.importModule)(filename.toString());
        if (!module.pluginEntry)
            throw new Error(`Plugin ${filename.basename()} not contain pluginEntry function`);
        const mk = _core_PluginContext__WEBPACK_IMPORTED_MODULE_2__.PluginContext.create(scope, global);
        const result = module.pluginEntry(mk);
        if (result instanceof Promise)
            await result;
        scope = mk._scope();
        _core_Scope__WEBPACK_IMPORTED_MODULE_4__.ScopeHelper.applyVariables(scope, mk);
    }
    global.addSubdirectory(scope);
    await global.doSubdirectory();
    console.info("Configuring done");
    if (scope.GLOBAL_CONTEXT_JSON) {
        const filename = scope.GLOBAL_CONTEXT_JSON.toString();
        const content = JSON.stringify(global, null, 2);
        node_fs__WEBPACK_IMPORTED_MODULE_0___default().mkdirSync(node_path__WEBPACK_IMPORTED_MODULE_1___default().dirname(filename), { recursive: true });
        node_fs__WEBPACK_IMPORTED_MODULE_0___default().writeFileSync(filename, content, { encoding: "utf8" });
    }
    const allGoalList = global.createGoals(scope);
    const goalList = allGoalList.getTargetList("install");
    if (scope.TARGET_GOALS_JSON) {
        const filename = scope.TARGET_GOALS_JSON.toString();
        const content = JSON.stringify(goalList, null, 2);
        node_fs__WEBPACK_IMPORTED_MODULE_0___default().mkdirSync(node_path__WEBPACK_IMPORTED_MODULE_1___default().dirname(filename), { recursive: true });
        node_fs__WEBPACK_IMPORTED_MODULE_0___default().writeFileSync(filename, content, { encoding: "utf8" });
    }
    await _core_GoalCollection__WEBPACK_IMPORTED_MODULE_5__.GoalCollection.buildGoals(goalList);
}


/***/ }),

/***/ "./src/RunScriptContext.ts":
/*!*********************************!*\
  !*** ./src/RunScriptContext.ts ***!
  \*********************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   RunScriptContext: () => (/* binding */ RunScriptContext)
/* harmony export */ });
/* harmony import */ var node_path__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! node:path */ "node:path");
/* harmony import */ var node_path__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(node_path__WEBPACK_IMPORTED_MODULE_0__);
/* harmony import */ var node_url__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! node:url */ "node:url");
/* harmony import */ var node_url__WEBPACK_IMPORTED_MODULE_1___default = /*#__PURE__*/__webpack_require__.n(node_url__WEBPACK_IMPORTED_MODULE_1__);
/* harmony import */ var _utils_FileSystem__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! @/utils/FileSystem */ "./src/utils/FileSystem.ts");
/* harmony import */ var _Constants__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! @/Constants */ "./src/Constants.ts");
/* harmony import */ var _core_Types__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! @/core/Types */ "./src/core/Types.ts");
/* harmony import */ var _utils_Module__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(/*! @/utils/Module */ "./src/utils/Module.ts");
/*
 * MIT License
 *
 * Copyright (c) 2025  Yurii Yakubin (yurii.yakubin@gmail.com)
 *
 * Permission is granted to use, copy, modify, and distribute this software
 * under the MIT License. See LICENSE file for details.
 */






class RunScriptContext {
    _nodeExecutable;
    _currentScript;
    _scriptDir;
    _rootDir;
    _workDir;
    _env;
    _userConfig;
    constructor(options) {
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
    get nodeExecutable() {
        return this._nodeExecutable;
    }
    get currentScript() {
        return this._currentScript;
    }
    get scriptDir() {
        return this._scriptDir;
    }
    get rootDir() {
        return this._rootDir;
    }
    get workDir() {
        return this._workDir;
    }
    get env() {
        return this._env;
    }
    getPresetPath(preset) {
        return node_path__WEBPACK_IMPORTED_MODULE_0___default().resolve(this._scriptDir, `preset/${preset}.mjs`);
    }
    get userConfigPath() {
        return node_path__WEBPACK_IMPORTED_MODULE_0___default().resolve(this._workDir, _Constants__WEBPACK_IMPORTED_MODULE_3__.USER_CONFIG);
    }
    get buildType() {
        return this._env.buildType == _core_Types__WEBPACK_IMPORTED_MODULE_4__.DEBUG_BUILD_TYPE ? this._env.buildType : _core_Types__WEBPACK_IMPORTED_MODULE_4__.RELEASE_BUILD_TYPE;
    }
    async getUserConfig() {
        if (!this._userConfig) {
            let configPath;
            if (this._env.config) {
                configPath = node_path__WEBPACK_IMPORTED_MODULE_0___default().isAbsolute(this._env.config) ? this._env.config : node_path__WEBPACK_IMPORTED_MODULE_0___default().resolve(this._workDir, this._env.config);
                if (!await (0,_utils_FileSystem__WEBPACK_IMPORTED_MODULE_2__.fileExists)(configPath))
                    throw `Configuration '${this._env.config}' file does not exist`;
            }
            else {
                const userConfigPath = node_path__WEBPACK_IMPORTED_MODULE_0___default().resolve(this._workDir, _Constants__WEBPACK_IMPORTED_MODULE_3__.USER_CONFIG);
                if (await (0,_utils_FileSystem__WEBPACK_IMPORTED_MODULE_2__.fileExists)(userConfigPath))
                    configPath = userConfigPath;
                else
                    throw `Config file '${_Constants__WEBPACK_IMPORTED_MODULE_3__.USER_CONFIG}' is not available`;
            }
            let userConfig = {};
            if (configPath) {
                const configUrl = node_url__WEBPACK_IMPORTED_MODULE_1___default().pathToFileURL(configPath);
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
    get requestAttempts() {
        return _Constants__WEBPACK_IMPORTED_MODULE_3__.REQUEST_ATTEMPTS;
    }
}
;


/***/ }),

/***/ "./src/cmake/Constants.ts":
/*!********************************!*\
  !*** ./src/cmake/Constants.ts ***!
  \********************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

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

/***/ "./src/cmake/index.ts":
/*!****************************!*\
  !*** ./src/cmake/index.ts ***!
  \****************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   build: () => (/* binding */ build),
/* harmony export */   configure: () => (/* binding */ configure),
/* harmony export */   ctest: () => (/* binding */ ctest),
/* harmony export */   extract: () => (/* binding */ extract),
/* harmony export */   generatedScriptNameComment: () => (/* binding */ generatedScriptNameComment),
/* harmony export */   getProjectInfo: () => (/* binding */ getProjectInfo),
/* harmony export */   install: () => (/* binding */ install),
/* harmony export */   lineToMultipleComment: () => (/* binding */ lineToMultipleComment),
/* harmony export */   lineToSinglComment: () => (/* binding */ lineToSinglComment)
/* harmony export */ });
/* harmony import */ var node_os__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! node:os */ "node:os");
/* harmony import */ var node_os__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(node_os__WEBPACK_IMPORTED_MODULE_0__);
/* harmony import */ var node_fs__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! node:fs */ "node:fs");
/* harmony import */ var node_fs__WEBPACK_IMPORTED_MODULE_1___default = /*#__PURE__*/__webpack_require__.n(node_fs__WEBPACK_IMPORTED_MODULE_1__);
/* harmony import */ var node_path__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! node:path */ "node:path");
/* harmony import */ var node_path__WEBPACK_IMPORTED_MODULE_2___default = /*#__PURE__*/__webpack_require__.n(node_path__WEBPACK_IMPORTED_MODULE_2__);
/* harmony import */ var _utils_ChildProcess__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! @/utils/ChildProcess */ "./src/utils/ChildProcess.ts");
/* harmony import */ var _cmake_Constants__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! @/cmake/Constants */ "./src/cmake/Constants.ts");
/* harmony import */ var _cmake_Helper__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(/*! @/cmake/Helper */ "./src/cmake/Helper.ts");
/*
 * MIT License
 *
 * Copyright (c) 2025  Yurii Yakubin (yurii.yakubin@gmail.com)
 *
 * Permission is granted to use, copy, modify, and distribute this software
 * under the MIT License. See LICENSE file for details.
 */






function toVarType(key, val) {
    const map = {
        CMAKE_INSTALL_PREFIX: _cmake_Constants__WEBPACK_IMPORTED_MODULE_4__.ValueType.PATH,
        CMAKE_TOOLCHAIN_FILE: _cmake_Constants__WEBPACK_IMPORTED_MODULE_4__.ValueType.FILEPATH,
    };
    if (typeof val === "boolean")
        return _cmake_Constants__WEBPACK_IMPORTED_MODULE_4__.ValueType.BOOL;
    if (map.hasOwnProperty(key))
        return map[key];
    return _cmake_Constants__WEBPACK_IMPORTED_MODULE_4__.ValueType.STRING;
}
function toCacheEntry(name, val) {
    const type = toVarType(name, val);
    const value = (0,_cmake_Helper__WEBPACK_IMPORTED_MODULE_5__.convertToValue)(val);
    return `${name}:${type}=${value}`;
}
async function configure(args) {
    const spawnArgs = ['-G', args.generator];
    for (const [key, val] of Object.entries(args.cacheVariables))
        spawnArgs.push('-D', toCacheEntry(key, val));
    spawnArgs.push('-S', args.sourceDir);
    spawnArgs.push('-B', args.binaryDir);
    const res = await (0,_utils_ChildProcess__WEBPACK_IMPORTED_MODULE_3__.spawnAsync)("cmake", spawnArgs, {
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
async function build(args) {
    await configure(args);
    const spawnArgs = [
        '--build', '.',
        '--parallel', node_os__WEBPACK_IMPORTED_MODULE_0___default().availableParallelism().toString(),
    ];
    const res = await (0,_utils_ChildProcess__WEBPACK_IMPORTED_MODULE_3__.spawnAsync)("cmake", spawnArgs, {
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
async function install(args) {
    await configure(args);
    const spawnArgs = [
        '--install',
        '.',
    ];
    if (args.installDir) {
        spawnArgs.push('--prefix', args.installDir);
    }
    const res = await (0,_utils_ChildProcess__WEBPACK_IMPORTED_MODULE_3__.spawnAsync)("cmake", spawnArgs, {
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
async function ctest(args) {
    await build(args);
    const spawnArgs = [];
    const res = await (0,_utils_ChildProcess__WEBPACK_IMPORTED_MODULE_3__.spawnAsync)("ctest", spawnArgs, {
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
async function extract(args) {
    const spawnArgs = ["-E", "tar", "-xvf", args.filename];
    const res = await (0,_utils_ChildProcess__WEBPACK_IMPORTED_MODULE_3__.spawnAsync)("cmake", spawnArgs, {
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
async function getProjectInfo(source) {
    const stat = await node_fs__WEBPACK_IMPORTED_MODULE_1___default().promises.stat(source);
    if (stat.isDirectory())
        source = node_path__WEBPACK_IMPORTED_MODULE_2___default().resolve(source, _cmake_Constants__WEBPACK_IMPORTED_MODULE_4__.CMAKE_LISTS_TXT);
    const content = await node_fs__WEBPACK_IMPORTED_MODULE_1___default().promises.readFile(source, { encoding: 'utf8' });
    const projectPattern = /project *\( *([^ ]+) *([^)]*)\)/;
    const versionPattern = /VERSION +([^ ]+)/;
    const result = {};
    let match = content.match(projectPattern);
    if (match) {
        result.name = match[1];
        const projectContent = match[2];
        match = projectContent.match(versionPattern);
        if (match)
            result.version = match[1];
    }
    return result;
}
function lineToSinglComment(line) {
    return "# " + line;
}
function lineToMultipleComment(line) {
    return `#[===[ ${line} ]===]`;
}
function generatedScriptNameComment(filename) {
    return lineToSinglComment("Generated from " + node_path__WEBPACK_IMPORTED_MODULE_2___default().basename(filename));
}


/***/ }),

/***/ "./src/core/BuildinScripts/configure_file.ts":
/*!***************************************************!*\
  !*** ./src/core/BuildinScripts/configure_file.ts ***!
  \***************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (/* export default binding */ __WEBPACK_DEFAULT_EXPORT__)
/* harmony export */ });
/* harmony import */ var node_fs__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! node:fs */ "node:fs");
/* harmony import */ var node_fs__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(node_fs__WEBPACK_IMPORTED_MODULE_0__);
/* harmony import */ var node_path__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! node:path */ "node:path");
/* harmony import */ var node_path__WEBPACK_IMPORTED_MODULE_1___default = /*#__PURE__*/__webpack_require__.n(node_path__WEBPACK_IMPORTED_MODULE_1__);
/*
 * MIT License
 *
 * Copyright (c) 2025  Yurii Yakubin (yurii.yakubin@gmail.com)
 *
 * Permission is granted to use, copy, modify, and distribute this software
 * under the MIT License. See LICENSE file for details.
 */


/* harmony default export */ function __WEBPACK_DEFAULT_EXPORT__(params) {
    const content = node_fs__WEBPACK_IMPORTED_MODULE_0___default().readFileSync(params.input, "utf-8");
    const newContent = content.replace(/@([_A-Za-z][_A-Za-z0-9]+)@/g, (match, value) => {
        const res = params[value] || "";
        if (Array.isArray(res))
            return res.join("\n");
        return res.toString();
    });
    node_fs__WEBPACK_IMPORTED_MODULE_0___default().mkdirSync(node_path__WEBPACK_IMPORTED_MODULE_1___default().dirname(params.output), { recursive: true });
    node_fs__WEBPACK_IMPORTED_MODULE_0___default().writeFileSync(params.output, newContent, "utf-8");
}


/***/ }),

/***/ "./src/core/BuildinScripts/install_script.ts":
/*!***************************************************!*\
  !*** ./src/core/BuildinScripts/install_script.ts ***!
  \***************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (/* export default binding */ __WEBPACK_DEFAULT_EXPORT__)
/* harmony export */ });
/* harmony import */ var node_fs__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! node:fs */ "node:fs");
/* harmony import */ var node_fs__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(node_fs__WEBPACK_IMPORTED_MODULE_0__);
/* harmony import */ var node_path__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! node:path */ "node:path");
/* harmony import */ var node_path__WEBPACK_IMPORTED_MODULE_1___default = /*#__PURE__*/__webpack_require__.n(node_path__WEBPACK_IMPORTED_MODULE_1__);
/*
 * MIT License
 *
 * Copyright (c) 2025  Yurii Yakubin (yurii.yakubin@gmail.com)
 *
 * Permission is granted to use, copy, modify, and distribute this software
 * under the MIT License. See LICENSE file for details.
 */


/* harmony default export */ function __WEBPACK_DEFAULT_EXPORT__(params) {
    console.log("Installing: " + params.dest);
    node_fs__WEBPACK_IMPORTED_MODULE_0___default().mkdirSync(node_path__WEBPACK_IMPORTED_MODULE_1___default().dirname(params.dest), { recursive: true });
    node_fs__WEBPACK_IMPORTED_MODULE_0___default().cpSync(params.src, params.dest, { force: true });
}


/***/ }),

/***/ "./src/core/CustomScript.ts":
/*!**********************************!*\
  !*** ./src/core/CustomScript.ts ***!
  \**********************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   CustomScript: () => (/* binding */ CustomScript)
/* harmony export */ });
/* harmony import */ var _utils_StrictType__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! @/utils/StrictType */ "./src/utils/StrictType.ts");
/* harmony import */ var _core_Path__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! @/core/Path */ "./src/core/Path.ts");
/* harmony import */ var _core_Scope__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! @/core/Scope */ "./src/core/Scope.ts");
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
const SCRIPT = Symbol("SCRIPT");
const INPUT = Symbol("INPUT");
const OUTPUT = Symbol("OUTPUT");
const PARAMS = Symbol("PARAMS");
const PROPERTIES = Symbol("PROPERTIES");
class CustomScript {
    [TARGET_SCOPE];
    [NAME];
    [SCRIPT];
    [INPUT];
    [OUTPUT];
    [PARAMS];
    [PROPERTIES];
    constructor(scope, name, script, output, params) {
        this[TARGET_SCOPE] = _core_Scope__WEBPACK_IMPORTED_MODULE_2__.ScopeHelper.clone({}, scope);
        this[NAME] = (0,_utils_StrictType__WEBPACK_IMPORTED_MODULE_0__.ensureString)(name);
        this[INPUT] = params.input || null;
        this[SCRIPT] = script;
        this[OUTPUT] = output;
        this[PARAMS] = params;
        this[PROPERTIES] = {};
    }
    static create(scope, name, script, output, params) {
        return Object.seal(new CustomScript(scope, name, script, output, params));
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
    get SCRIPT() {
        return this[SCRIPT];
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
        this[OUTPUT] = _core_Path__WEBPACK_IMPORTED_MODULE_1__.AbsolutePath.create(value);
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
            SCRIPT: this.SCRIPT,
            INPUT: this.INPUT,
            OUTPUT: this.OUTPUT,
            PARAMS: this.PARAMS,
            PROPERTIES: this.PROPERTIES,
        };
    }
}
;


/***/ }),

/***/ "./src/core/FindProgram.ts":
/*!*********************************!*\
  !*** ./src/core/FindProgram.ts ***!
  \*********************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   findProgram: () => (/* binding */ findProgram)
/* harmony export */ });
/* harmony import */ var node_os__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! node:os */ "node:os");
/* harmony import */ var node_os__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(node_os__WEBPACK_IMPORTED_MODULE_0__);
/* harmony import */ var node_path__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! node:path */ "node:path");
/* harmony import */ var node_path__WEBPACK_IMPORTED_MODULE_1___default = /*#__PURE__*/__webpack_require__.n(node_path__WEBPACK_IMPORTED_MODULE_1__);
/* harmony import */ var _utils_FileSystem__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! @/utils/FileSystem */ "./src/utils/FileSystem.ts");
/*
 * MIT License
 *
 * Copyright (c) 2025  Yurii Yakubin (yurii.yakubin@gmail.com)
 *
 * Permission is granted to use, copy, modify, and distribute this software
 * under the MIT License. See LICENSE file for details.
 */



function findProgram(name) {
    if (node_os__WEBPACK_IMPORTED_MODULE_0___default().platform() === "win32" && !name.endsWith(".exe"))
        name += ".exe";
    const paths = (process.env.PATH || "").split((node_path__WEBPACK_IMPORTED_MODULE_1___default().posix).delimiter);
    for (const iter of paths) {
        const filename = node_path__WEBPACK_IMPORTED_MODULE_1___default().posix.resolve(iter, name);
        if ((0,_utils_FileSystem__WEBPACK_IMPORTED_MODULE_2__.fileExistsSync)(filename))
            return filename;
    }
    return undefined;
}


/***/ }),

/***/ "./src/core/GetSizeofVoidp.ts":
/*!************************************!*\
  !*** ./src/core/GetSizeofVoidp.ts ***!
  \************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   getSizeofVoidp: () => (/* binding */ getSizeofVoidp)
/* harmony export */ });
/* harmony import */ var node_os__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! node:os */ "node:os");
/* harmony import */ var node_os__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(node_os__WEBPACK_IMPORTED_MODULE_0__);
/*
 * MIT License
 *
 * Copyright (c) 2025  Yurii Yakubin (yurii.yakubin@gmail.com)
 *
 * Permission is granted to use, copy, modify, and distribute this software
 * under the MIT License. See LICENSE file for details.
 */

function getSizeofVoidp() {
    const sizeofVoidpBits = {
        arm: 4,
        arm64: 8,
        ia32: 4,
        loong64: 8,
        mips: 4,
        mipsel: 4,
        ppc: 4,
        ppc64: 8,
        riscv64: 8,
        s390: 4,
        s390x: 8,
        x64: 4,
    };
    const result = sizeofVoidpBits[node_os__WEBPACK_IMPORTED_MODULE_0___default().arch()];
    if (!result)
        throw new Error(`Unknown ${node_os__WEBPACK_IMPORTED_MODULE_0___default().arch()} arch`);
    return result;
}


/***/ }),

/***/ "./src/core/GlobalContext.ts":
/*!***********************************!*\
  !*** ./src/core/GlobalContext.ts ***!
  \***********************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   GlobalContext: () => (/* binding */ GlobalContext)
/* harmony export */ });
/* harmony import */ var node_fs__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! node:fs */ "node:fs");
/* harmony import */ var node_fs__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(node_fs__WEBPACK_IMPORTED_MODULE_0__);
/* harmony import */ var _Constants__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! @/Constants */ "./src/Constants.ts");
/* harmony import */ var _core_Path__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! @/core/Path */ "./src/core/Path.ts");
/* harmony import */ var _utils_FileSystem__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! @/utils/FileSystem */ "./src/utils/FileSystem.ts");
/* harmony import */ var _core_TargetCollection__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! @/core//TargetCollection */ "./src/core/TargetCollection.ts");
/* harmony import */ var _core_ScriptCollection__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(/*! @/core/ScriptCollection */ "./src/core/ScriptCollection.ts");
/* harmony import */ var _core_InterfaceTarget__WEBPACK_IMPORTED_MODULE_6__ = __webpack_require__(/*! @/core/InterfaceTarget */ "./src/core/InterfaceTarget.ts");
/* harmony import */ var _core_UnknownTarget__WEBPACK_IMPORTED_MODULE_7__ = __webpack_require__(/*! @/core/UnknownTarget */ "./src/core/UnknownTarget.ts");
/* harmony import */ var _core_GoalCollection__WEBPACK_IMPORTED_MODULE_8__ = __webpack_require__(/*! @/core/GoalCollection */ "./src/core/GoalCollection.ts");
/* harmony import */ var _core_InterfaceObjects__WEBPACK_IMPORTED_MODULE_9__ = __webpack_require__(/*! @/core/InterfaceObjects */ "./src/core/InterfaceObjects.ts");
/* harmony import */ var _core_SourceFile__WEBPACK_IMPORTED_MODULE_10__ = __webpack_require__(/*! @/core/SourceFile */ "./src/core/SourceFile.ts");
/* harmony import */ var _core_UserContext__WEBPACK_IMPORTED_MODULE_11__ = __webpack_require__(/*! @/core/UserContext */ "./src/core/UserContext.ts");
/* harmony import */ var _core_Target__WEBPACK_IMPORTED_MODULE_12__ = __webpack_require__(/*! @/core/Target */ "./src/core/Target.ts");
/* harmony import */ var _core_Scope__WEBPACK_IMPORTED_MODULE_13__ = __webpack_require__(/*! @/core/Scope */ "./src/core/Scope.ts");
/* harmony import */ var _utils_Module__WEBPACK_IMPORTED_MODULE_14__ = __webpack_require__(/*! @/utils/Module */ "./src/utils/Module.ts");
/* harmony import */ var _logger__WEBPACK_IMPORTED_MODULE_15__ = __webpack_require__(/*! @/logger */ "./src/logger/index.ts");
/* harmony import */ var _core_BuildinScripts_configure_file__WEBPACK_IMPORTED_MODULE_16__ = __webpack_require__(/*! @/core/BuildinScripts/configure_file */ "./src/core/BuildinScripts/configure_file.ts");
/* harmony import */ var _core_BuildinScripts_install_script__WEBPACK_IMPORTED_MODULE_17__ = __webpack_require__(/*! @/core/BuildinScripts/install_script */ "./src/core/BuildinScripts/install_script.ts");
/*
 * MIT License
 *
 * Copyright (c) 2025  Yurii Yakubin (yurii.yakubin@gmail.com)
 *
 * Permission is granted to use, copy, modify, and distribute this software
 * under the MIT License. See LICENSE file for details.
 */


















const logger = (0,_logger__WEBPACK_IMPORTED_MODULE_15__.createLogger)("file:///mnt/c/opt/work/source/darkit-sdk/external/bitmake/src/core/GlobalContext.ts");
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
const BUILTIN_SCRIPTS = Symbol("BUILTIN_SCRIPTS");
function ensureValueByType(type, value) {
    if (Array.isArray(type) ? type.includes(value) : typeof value === type)
        return value;
    throw new Error(`The '${value}' is not a ${type}`);
}
class GlobalContext {
    [TARGETS];
    [SCRIPTS];
    [CACHE];
    [UNKNOWN_TARGETS];
    [INTERFACE_SCRIPTS];
    [INSTALL_LIST];
    [SCRIPT_VARIABLES_MAP];
    [SUBDIR_ALIAS];
    [SUBDIR_LIST];
    [BUILTIN_SCRIPTS];
    constructor() {
        this[TARGETS] = _core_TargetCollection__WEBPACK_IMPORTED_MODULE_4__.TargetCollection.create();
        this[SCRIPTS] = _core_ScriptCollection__WEBPACK_IMPORTED_MODULE_5__.ScriptCollection.create();
        this[CACHE] = {};
        this[UNKNOWN_TARGETS] = {};
        this[INTERFACE_SCRIPTS] = {};
        this[INSTALL_LIST] = [];
        this[SCRIPT_VARIABLES_MAP] = {};
        this[SUBDIR_ALIAS] = {};
        this[SUBDIR_LIST] = [];
        this[BUILTIN_SCRIPTS] = {
            configure_file: _core_BuildinScripts_configure_file__WEBPACK_IMPORTED_MODULE_16__["default"],
            install_script: _core_BuildinScripts_install_script__WEBPACK_IMPORTED_MODULE_17__["default"],
        };
    }
    static create() {
        return Object.seal(new GlobalContext);
    }
    get TARGETS() {
        return this[TARGETS];
    }
    get SCRIPTS() {
        return this[SCRIPTS];
    }
    get CACHE() {
        return this[CACHE];
    }
    get UNKNOWN_TARGETS() {
        return this[UNKNOWN_TARGETS];
    }
    get INTERFACE_SCRIPTS() {
        return this[INTERFACE_SCRIPTS];
    }
    get INSTALL_LIST() {
        return this[INSTALL_LIST];
    }
    get SCRIPT_VARIABLES_MAP() {
        return this[SCRIPT_VARIABLES_MAP];
    }
    get SUBDIR_ALIAS() {
        return this[SUBDIR_ALIAS];
    }
    getUknownTarget(name) {
        let target = this[UNKNOWN_TARGETS][name];
        if (!target) {
            this[UNKNOWN_TARGETS][name] = target = _core_UnknownTarget__WEBPACK_IMPORTED_MODULE_7__.UnknownTarget.create(name);
        }
        return target;
    }
    addSystemVariables(variables) {
        const script = variables.SCRIPT_FILE.toString();
        if (this[SCRIPT_VARIABLES_MAP][script])
            throw new Error(`SystemVariables exists for ${script}`);
        this[SCRIPT_VARIABLES_MAP][script] = variables;
    }
    resolveSubdirectory(path) {
        const resolvedPath = this[SUBDIR_ALIAS][path.toString()];
        return resolvedPath || path;
    }
    addSubdirectoryAlias(src, dest) {
        this[SUBDIR_ALIAS][src.toString()] = dest;
    }
    addCacheVariables(variables) {
        const cache = this[CACHE];
        for (const [key, entry] of Object.entries(variables)) {
            cache[key] = entry;
        }
    }
    loadCacheVariables(filename) {
        if ((0,_utils_FileSystem__WEBPACK_IMPORTED_MODULE_3__.fileExistsSync)(filename.toString())) {
            const variables = requireImpl(filename.toString());
            this.addCacheVariables(variables);
        }
    }
    copyCacheVariables(scope) {
        for (const [name, entry] of Object.entries(this[CACHE])) {
            if (!Object.hasOwn(scope, name)) {
                const type = entry.type || typeof entry.value;
                const description = entry.description || "";
                let value = Array.isArray(entry.value) ? [...entry.value] : entry.value;
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
    writeCacheVariables(filename) {
        const json = JSON.stringify(this[CACHE], null, 2);
        node_fs__WEBPACK_IMPORTED_MODULE_0___default().writeFileSync(filename, json, "utf-8");
    }
    addSubdirectory(scope) {
        this[SUBDIR_LIST].push(scope);
    }
    findScriptFunction(name) {
        return this[BUILTIN_SCRIPTS][name];
    }
    async doSubdirectory() {
        while (this[SUBDIR_LIST].length) {
            const scope = this[SUBDIR_LIST].shift();
            if (!scope)
                continue;
            let scriptFile;
            const fileList = [".js", ".mjs"].map(i => "MakeScript" + i);
            for (const filename of fileList) {
                const iter = scope.SOURCE_DIR.join(filename);
                if (await (0,_utils_FileSystem__WEBPACK_IMPORTED_MODULE_3__.fileExists)(iter.toString())) {
                    scriptFile = iter;
                    break;
                }
            }
            if (!scriptFile)
                throw new Error("There are no files from the list " + fileList.join());
            scope.SCRIPT_FILE = scriptFile;
            scope.SCRIPT_DIR = scope.SCRIPT_FILE.dirname();
            this.addSystemVariables(scope);
            const cwdSave = process.cwd();
            process.chdir(scope.SOURCE_DIR.toString());
            const mk = _core_UserContext__WEBPACK_IMPORTED_MODULE_11__.UserContext.create(scope, this);
            const module = await (0,_utils_Module__WEBPACK_IMPORTED_MODULE_14__.importModule)(scope.SCRIPT_FILE.toString());
            const result = module.default(mk);
            if (result instanceof Promise)
                await result;
            _core_Scope__WEBPACK_IMPORTED_MODULE_13__.ScopeHelper.applyVariables(scope, mk);
            process.chdir(cwdSave);
        }
    }
    createGoals(scope) {
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
        const goalList = _core_GoalCollection__WEBPACK_IMPORTED_MODULE_8__.GoalCollection.create();
        for (const [name, script] of Object.entries(this[SCRIPTS].ENTRIES)) {
            const depends = [];
            if (script.SCRIPT instanceof _core_Path__WEBPACK_IMPORTED_MODULE_2__.AbsolutePath)
                depends.push(script.SCRIPT.toString());
            if (script.INPUT)
                depends.push(script.INPUT.toString());
            const msg = "\x1b[36m" + "Generating " + script.TARGET_SCOPE.BINARY_DIR.relative(script.OUTPUT) + "\x1b[0m";
            const params = { ...script.PROPERTIES, ...script.PARAMS };
            goalList.addScript(script.SCRIPT, "", depends, script.OUTPUT.toString(), params, msg);
        }
        for (const [name, target] of Object.entries(this[TARGETS].ENTRIES)) {
            const headers = this[TARGETS].allHeadersOf(target);
            const depends = [];
            for (const s of target.SOURCES) {
                if (s instanceof _core_InterfaceObjects__WEBPACK_IMPORTED_MODULE_9__.InterfaceObjects) {
                    const t = this[TARGETS].get(s.targetName);
                    for (const f of t.SOURCES) {
                        if (f instanceof _core_SourceFile__WEBPACK_IMPORTED_MODULE_10__.SourceFile && f.OBJECT_FILE)
                            depends.push(f.OBJECT_FILE.toString());
                    }
                    continue;
                }
                if (s.HEADER_FILE_ONLY)
                    continue;
                node_fs__WEBPACK_IMPORTED_MODULE_0___default().mkdirSync(s.OBJECT_FILE_DIR.toString(), { recursive: true });
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
                goalList.addExec(output, [...headers, s.FILE], command, args, cwd, msg);
            }
            const linkOptions = this[TARGETS].allLinkOptionsOf(target);
            if (target instanceof _core_Target__WEBPACK_IMPORTED_MODULE_12__.ObjectLibrary) {
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
                    logger.info(`No objects for "${target.NAME}"`);
                }
            }
            if (target instanceof _core_Target__WEBPACK_IMPORTED_MODULE_12__.StaticLibrary) {
                const objs = depends.filter(i => i.endsWith(".o") || i.endsWith(".obj")).map(i => target.FILE_DIR.relative(i));
                if (objs.length) {
                    const args = ["rc", target.FILE_NAME, ...objs];
                    const cwd = target.FILE_DIR.toString();
                    const msg = `Linking CXX static library ${target.FILE_NAME}`;
                    goalList.addExec(target.FILE.toString(), depends, scope.AR, args, cwd, msg);
                }
                else {
                    logger.info(`No objects for "${target.NAME}"`);
                }
            }
            if (target instanceof _core_Target__WEBPACK_IMPORTED_MODULE_12__.SharedLibrary) {
                throw new Error("Not implemented");
            }
            if (target instanceof _core_Target__WEBPACK_IMPORTED_MODULE_12__.Executable) {
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
                    logger.info(`No objects for "${target.NAME}"`);
                }
            }
            goalList.addTarget(name, [target.FILE.toString()], `Built target ${name}`);
        }
        const install_files = [];
        for (const iter of this[INSTALL_LIST]) {
            let src, dest;
            if (iter.VALUE instanceof _core_Path__WEBPACK_IMPORTED_MODULE_2__.AbsolutePath) {
                if (scope.PREVENT_INSTALL_FILES)
                    continue;
                src = iter.VALUE.toString();
                const rfile = iter.BASE_DIR.relative(iter.VALUE);
                dest = iter.DESTINATION.join(rfile);
            }
            else if (iter.VALUE instanceof _core_InterfaceTarget__WEBPACK_IMPORTED_MODULE_6__.InterfaceTarget) {
                const target = this[TARGETS].get(iter.VALUE.targetName);
                src = target.FILE.toString();
                dest = iter.DESTINATION.join(target.FILE_NAME);
            }
            else {
                throw new Error(`Can not install ${iter.VALUE}`);
            }
            if (scope.DESTDIR)
                dest = scope.DESTDIR.join(dest).toString();
            goalList.addScript(_core_BuildinScripts_install_script__WEBPACK_IMPORTED_MODULE_17__["default"], "", [src], dest, { src, dest }, "");
            install_files.push(dest);
        }
        if (install_files.length) {
            goalList.addTarget(_Constants__WEBPACK_IMPORTED_MODULE_1__.INSTALL_TARGET, install_files, "");
        }
        goalList.addTarget(_Constants__WEBPACK_IMPORTED_MODULE_1__.ALL_TARGET, Object.keys(this[TARGETS].ENTRIES), "");
        return goalList;
    }
    toJSON() {
        return {
            TARGETS: this.TARGETS,
            SCRIPTS: this.SCRIPTS,
            CACHE: this.CACHE,
            UNKNOWN_TARGETS: this.UNKNOWN_TARGETS,
            INTERFACE_SCRIPTS: this.INTERFACE_SCRIPTS,
            INSTALL_LIST: this.INSTALL_LIST,
            SCRIPT_VARIABLES_MAP: this.SCRIPT_VARIABLES_MAP,
            SUBDIR_ALIAS: this.SUBDIR_ALIAS,
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
/* harmony import */ var _core_Path__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! @/core/Path */ "./src/core/Path.ts");
/* harmony import */ var _utils_Module__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! @/utils/Module */ "./src/utils/Module.ts");
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
        if (o instanceof _core_Path__WEBPACK_IMPORTED_MODULE_3__.AbsolutePath) {
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
            for (const [k, v] of Object.entries(o))
                result[k] = scopeValueAsPrimitives(v);
            return result;
        }
    }
    throw new Error(`Unknown instance of ${o}`);
}
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
                if (typeof script === "function")
                    module = script;
                else
                    module = (await (0,_utils_Module__WEBPACK_IMPORTED_MODULE_4__.importModule)(script.toString())).default;
                const result = module(scopeValueAsPrimitives(params));
                if (result instanceof Promise) {
                    await result;
                }
            }
            else if (type === GoalType.EXEC) {
                const { command, args, cwd, output } = goal;
                node_fs__WEBPACK_IMPORTED_MODULE_1___default().mkdirSync(node_path__WEBPACK_IMPORTED_MODULE_0___default().posix.dirname(output), { recursive: true });
                const result = (0,node_child_process__WEBPACK_IMPORTED_MODULE_2__.spawnSync)(command, args, { cwd, encoding: "utf-8" });
                if (result.error || result.status) {
                    console.info("cd " + cwd);
                    let cmd = args.join(" ");
                    cmd = command + (cmd ? " " : "") + cmd;
                    console.info(cmd);
                    console.info("");
                    console.error(result.stderr);
                    if (result.error)
                        throw result.error;
                    throw new Error(result.error || "Status " + result.status);
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
            value = _core_Path__WEBPACK_IMPORTED_MODULE_1__.FilePath.create(value);
            baseDir = baseDir || value.dirname();
        }
        else if (!(value instanceof _core_InterfaceTarget__WEBPACK_IMPORTED_MODULE_0__.InterfaceTarget)) {
            throw new Error(`Not supportet value of ${value}`);
        }
        this[VALUE] = value;
        this[DESTINATION] = _core_Path__WEBPACK_IMPORTED_MODULE_1__.DirPath.create(scope.INSTALL_PREFIX.resolve(destination.toString()).toString());
        this[BASE_DIR] = baseDir ? _core_Path__WEBPACK_IMPORTED_MODULE_1__.DirPath.create(baseDir.toString()) : null;
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

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   InterfaceTarget: () => (/* binding */ InterfaceTarget)
/* harmony export */ });
/* harmony import */ var _core_Path__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! @/core/Path */ "./src/core/Path.ts");
/* harmony import */ var _core_InterfaceIncludes__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! @/core/InterfaceIncludes */ "./src/core/InterfaceIncludes.ts");
/* harmony import */ var _core_InterfaceObjects__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! @/core/InterfaceObjects */ "./src/core/InterfaceObjects.ts");
/* harmony import */ var _core_IncludeDirectory__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! @/core/IncludeDirectory */ "./src/core/IncludeDirectory.ts");
/* harmony import */ var _core_SourceFile__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! @/core/SourceFile */ "./src/core/SourceFile.ts");
/* harmony import */ var _core_Scope__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(/*! @/core/Scope */ "./src/core/Scope.ts");
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
        this[SCOPE] = _core_Scope__WEBPACK_IMPORTED_MODULE_5__.ScopeHelper.clone({}, scope);
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
const _paths = new Map();
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
        return DirPath.create(node_path__WEBPACK_IMPORTED_MODULE_0___default().posix.dirname(this[PATH]));
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
    static ensureInstance(value) {
        if (value instanceof AbsolutePath)
            return value;
        throw new Error(`The '${value}' is not a AbsolutePath`);
    }
    static create(path) {
        const result = _paths.get(path.toString());
        if (result)
            return result;
        if (path instanceof AbsolutePath)
            return path;
        return Object.seal(new AbsolutePath(path));
    }
}
;
class FilePath extends AbsolutePath {
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
        if (path instanceof AbsolutePath)
            path = path.toString();
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
class DirPath extends AbsolutePath {
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
        if (path instanceof AbsolutePath)
            path = path.toString();
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

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   PluginContext: () => (/* binding */ PluginContext)
/* harmony export */ });
/* harmony import */ var _core_Path__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! @/core/Path */ "./src/core/Path.ts");
/* harmony import */ var _core_Scope__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! @/core/Scope */ "./src/core/Scope.ts");
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
    static create(scope, global) {
        const proto = PluginContext.prototype;
        const newScope = Object.create(proto);
        _core_Scope__WEBPACK_IMPORTED_MODULE_1__.ScopeHelper.clone(newScope, scope);
        const self = Object.create(newScope);
        self[SCOPE] = newScope;
        self[GLOBAL] = global;
        return self;
    }
    addSubdirectoryAlias(src, dest) {
        this[GLOBAL].addSubdirectoryAlias(_core_Path__WEBPACK_IMPORTED_MODULE_0__.DirPath.create(src), _core_Path__WEBPACK_IMPORTED_MODULE_0__.DirPath.create(dest));
    }
    _scope() {
        return this[SCOPE];
    }
}
;


/***/ }),

/***/ "./src/core/Scope.ts":
/*!***************************!*\
  !*** ./src/core/Scope.ts ***!
  \***************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   ScopeHelper: () => (/* binding */ ScopeHelper)
/* harmony export */ });
/* harmony import */ var _utils_StrictType__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! @/utils/StrictType */ "./src/utils/StrictType.ts");
/* harmony import */ var _core_Path__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! @/core/Path */ "./src/core/Path.ts");
/*
 * MIT License
 *
 * Copyright (c) 2025  Yurii Yakubin (yurii.yakubin@gmail.com)
 *
 * Permission is granted to use, copy, modify, and distribute this software
 * under the MIT License. See LICENSE file for details.
 */


const DEFINE_MAP = Symbol("DEFINE_MAP");
var ScopeHelper;
(function (ScopeHelper) {
    function defineVariableImpl(scope, group, name, descriptor) {
        if (name === "DEFINE_MAP") {
            throw new Error(`${name} is reserved and cannot be used as a variable`);
        }
        if (!scope[DEFINE_MAP])
            scope[DEFINE_MAP] = {};
        const type = descriptor.type || (Array.isArray(descriptor.value) ? "array" : typeof descriptor.value);
        let defineEntry = scope[DEFINE_MAP][name];
        if (!defineEntry) {
            defineEntry = { group, type, symbol: Symbol(name) };
            scope[DEFINE_MAP][name] = defineEntry;
        }
        else if (group !== defineEntry.group) {
            if (defineEntry.group)
                throw new Error(`Attempting to recreate "${name}" variable with "${defineEntry.group}" group in another "${group}"`);
            defineEntry.group = group;
        }
        defineEntry.description = descriptor.description || defineEntry.description || "";
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
            if (itemType !== "boolean" && itemType !== "number" && itemType !== "string")
                throw new Error(`Enum ${name} not support ${itemType} type`);
            ensureValue = (value) => {
                if (type.includes(value))
                    return value;
                throw new Error(`The '${value}' is not a ${type}`);
            };
        }
        else if (type === "boolean")
            ensureValue = _utils_StrictType__WEBPACK_IMPORTED_MODULE_0__.ensureBoolean;
        else if (type === "number")
            ensureValue = _utils_StrictType__WEBPACK_IMPORTED_MODULE_0__.ensureNumber;
        else if (type === "string")
            ensureValue = _utils_StrictType__WEBPACK_IMPORTED_MODULE_0__.ensureString;
        else if (type === "array")
            ensureValue = _utils_StrictType__WEBPACK_IMPORTED_MODULE_0__.ensureArray;
        else if (type === "DirPath")
            ensureValue = _core_Path__WEBPACK_IMPORTED_MODULE_1__.DirPath.create;
        else if (type === "FilePath")
            ensureValue = _core_Path__WEBPACK_IMPORTED_MODULE_1__.FilePath.create;
        else
            throw new Error(`Variable "${name}" has wrong ${type} type`);
        if (descriptor.value !== undefined) {
            defineEntry.value = (type === "array") ? Array.from(descriptor.value) : ensureValue(descriptor.value);
        }
        else {
            defineEntry.value = (type === "array") ? [] : undefined;
        }
        const { symbol, value } = defineEntry;
        if (scope[symbol] === undefined && value !== undefined)
            scope[symbol] = Array.isArray(value) ? Array.from(value) : value;
        const desc = {
            configurable: true,
            enumerable: true,
            get() {
                const value = scope[symbol];
                /*if (value === undefined)
                  throw new Error(`Value of ${name} cannot be obtained because it has not been established`);*/
                return value;
            },
            set(value) {
                scope[symbol] = ensureValue(value);
            },
        };
        Object.defineProperty(scope, name, desc);
    }
    function defineVariable(scope, group, name, descriptor) {
        if (!group) {
            throw new Error(`Attempting to create "${name}" variable with an empty group`);
        }
        defineVariableImpl(scope, group, name, descriptor);
    }
    ScopeHelper.defineVariable = defineVariable;
    function defineVariables(scope, group, descriptors) {
        for (const [name, descriptor] of Object.entries(descriptors))
            ScopeHelper.defineVariable(scope, group, name, descriptor);
    }
    ScopeHelper.defineVariables = defineVariables;
    function clone(target, scope) {
        if (scope[DEFINE_MAP]) {
            for (const [name, { group, symbol, type, value, description }] of Object.entries(scope[DEFINE_MAP])) {
                defineVariableImpl(target, group, name, { type, value, description });
                if (scope[symbol] !== undefined)
                    target[name] = scope[symbol];
            }
        }
        return target;
    }
    ScopeHelper.clone = clone;
    function getVariablesByGroup(scope, grp) {
        const result = {};
        for (const [name, { type, group, symbol, description }] of Object.entries(scope[DEFINE_MAP])) {
            if (group && group !== grp)
                continue;
            result[name] = { type, description, value: scope[symbol] };
        }
        return result;
    }
    ScopeHelper.getVariablesByGroup = getVariablesByGroup;
    function applyVariable(scope, name, value) {
        if (Object.getOwnPropertyDescriptor(scope, name))
            scope[name] = value;
        else
            defineVariableImpl(scope, "", name, { value });
    }
    ScopeHelper.applyVariable = applyVariable;
    function applyVariables(scope, variables) {
        for (const [name, value] of Object.entries(variables))
            ScopeHelper.applyVariable(scope, name, value);
    }
    ScopeHelper.applyVariables = applyVariables;
})(ScopeHelper || (ScopeHelper = {})); // ScopeHelper


/***/ }),

/***/ "./src/core/ScriptCollection.ts":
/*!**************************************!*\
  !*** ./src/core/ScriptCollection.ts ***!
  \**************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

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

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (__WEBPACK_DEFAULT_EXPORT__)
/* harmony export */ });
/* harmony import */ var node_os__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! node:os */ "node:os");
/* harmony import */ var node_os__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(node_os__WEBPACK_IMPORTED_MODULE_0__);
/* harmony import */ var _core_Types__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! @/core/Types */ "./src/core/Types.ts");
/* harmony import */ var _core_GetSizeofVoidp__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! @/core/GetSizeofVoidp */ "./src/core/GetSizeofVoidp.ts");
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
    TOOLCHAIN_FILE: {
        description: "Specifies the path to a toolchain file used for cross-compilation",
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
    SIZEOF_VOID_P: {
        description: "Defines the size (in bytes) of a void pointer on the target architecture",
        type: [4, 8],
        value: (0,_core_GetSizeofVoidp__WEBPACK_IMPORTED_MODULE_2__.getSizeofVoidp)(),
    }
});


/***/ }),

/***/ "./src/core/Target.ts":
/*!****************************!*\
  !*** ./src/core/Target.ts ***!
  \****************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

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
/* harmony import */ var _Constants__WEBPACK_IMPORTED_MODULE_8__ = __webpack_require__(/*! @/Constants */ "./src/Constants.ts");
/* harmony import */ var _core_Scope__WEBPACK_IMPORTED_MODULE_9__ = __webpack_require__(/*! @/core/Scope */ "./src/core/Scope.ts");
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
function ensureTargetName(name) {
    if (typeof name !== "string")
        throw new Error(`Target "${name}" is not string type`);
    if ([_Constants__WEBPACK_IMPORTED_MODULE_8__.ALL_TARGET, _Constants__WEBPACK_IMPORTED_MODULE_8__.INSTALL_TARGET].includes(name))
        throw new Error(`Target "${name}" is reserved name`);
    return name;
}
;
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
        this[TARGET_SCOPE] = _core_Scope__WEBPACK_IMPORTED_MODULE_9__.ScopeHelper.clone({}, scope);
        this[OUTPUT_NAME] = (0,_utils_StrictType__WEBPACK_IMPORTED_MODULE_0__.ensureString)(name);
        this[PREFIX] = "";
        this[SUFFIX] = "";
        this[COMPILE_OPTIONS] = [];
        this[LINK_OPTIONS] = [];
        this[SOURCES] = [];
        this[LIBRARIES] = [];
        this[INCLUDES] = scope.INCLUDES.map((VALUE) => ({ VALUE }));
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
        this.LINK_OPTIONS.push(...scope.OBJECT_LINKER_FLAGS.map((VALUE) => ({ VALUE })));
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
        this.LINK_OPTIONS.push(...scope.STATIC_LINKER_FLAGS.map((VALUE) => ({ VALUE })));
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
        this.LINK_OPTIONS.push(...scope.SHARED_LINKER_FLAGS.map((VALUE) => ({ VALUE })));
    }
    static create(scope, name) {
        return Object.seal(new SharedLibrary(scope, name));
    }
}
class Executable extends BaseTarget {
    constructor(scope, name) {
        super(scope, name);
        this.SUFFIX = scope.EXECUTABLE_SUFFIX;
        this.LINK_OPTIONS.push(...scope.EXE_LINKER_FLAGS.map((VALUE) => ({ VALUE })));
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

/***/ "./src/core/ToolchainContext.ts":
/*!**************************************!*\
  !*** ./src/core/ToolchainContext.ts ***!
  \**************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   ToolchainContext: () => (/* binding */ ToolchainContext)
/* harmony export */ });
/* harmony import */ var _core_FindProgram__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! @/core/FindProgram */ "./src/core/FindProgram.ts");
/* harmony import */ var _core_Scope__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! @/core/Scope */ "./src/core/Scope.ts");
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
class ToolchainContext {
    [SCOPE];
    [GLOBAL];
    constructor(scope, global) {
        this[SCOPE] = scope;
        this[GLOBAL] = global;
    }
    static create(scope, global) {
        const proto = ToolchainContext.prototype;
        const newScope = Object.create(proto);
        _core_Scope__WEBPACK_IMPORTED_MODULE_1__.ScopeHelper.clone(newScope, scope);
        const self = Object.create(newScope);
        self[SCOPE] = newScope;
        self[GLOBAL] = global;
        return self;
    }
    _scope() {
        return this[SCOPE];
    }
}
;
Object.defineProperty(ToolchainContext.prototype, "findProgram", {
    value: _core_FindProgram__WEBPACK_IMPORTED_MODULE_0__.findProgram,
    enumerable: false,
});


/***/ }),

/***/ "./src/core/Types.ts":
/*!***************************!*\
  !*** ./src/core/Types.ts ***!
  \***************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

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

/***/ "./src/core/UserContext.ts":
/*!*********************************!*\
  !*** ./src/core/UserContext.ts ***!
  \*********************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   UserContext: () => (/* binding */ UserContext)
/* harmony export */ });
/* harmony import */ var node_path__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! node:path */ "node:path");
/* harmony import */ var node_path__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(node_path__WEBPACK_IMPORTED_MODULE_0__);
/* harmony import */ var _utils_FileSystem__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! @/utils/FileSystem */ "./src/utils/FileSystem.ts");
/* harmony import */ var _core_Path__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! @/core/Path */ "./src/core/Path.ts");
/* harmony import */ var _core_InterfaceTarget__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! @/core/InterfaceTarget */ "./src/core/InterfaceTarget.ts");
/* harmony import */ var _core_InterfaceScript__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! @/core/InterfaceScript */ "./src/core/InterfaceScript.ts");
/* harmony import */ var _core_InstallEntity__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(/*! @/core/InstallEntity */ "./src/core/InstallEntity.ts");
/* harmony import */ var _core_Target__WEBPACK_IMPORTED_MODULE_6__ = __webpack_require__(/*! @/core/Target */ "./src/core/Target.ts");
/* harmony import */ var _core_IncludeDirectory__WEBPACK_IMPORTED_MODULE_7__ = __webpack_require__(/*! @/core/IncludeDirectory */ "./src/core/IncludeDirectory.ts");
/* harmony import */ var _core_CustomScript__WEBPACK_IMPORTED_MODULE_8__ = __webpack_require__(/*! @/core/CustomScript */ "./src/core/CustomScript.ts");
/* harmony import */ var _core_Scope__WEBPACK_IMPORTED_MODULE_9__ = __webpack_require__(/*! @/core/Scope */ "./src/core/Scope.ts");
/* harmony import */ var _core_FindProgram__WEBPACK_IMPORTED_MODULE_10__ = __webpack_require__(/*! @/core/FindProgram */ "./src/core/FindProgram.ts");
/* harmony import */ var _logger__WEBPACK_IMPORTED_MODULE_11__ = __webpack_require__(/*! @/logger */ "./src/logger/index.ts");
/*
 * MIT License
 *
 * Copyright (c) 2025  Yurii Yakubin (yurii.yakubin@gmail.com)
 *
 * Permission is granted to use, copy, modify, and distribute this software
 * under the MIT License. See LICENSE file for details.
 */












const logger = (0,_logger__WEBPACK_IMPORTED_MODULE_11__.createLogger)("file:///mnt/c/opt/work/source/darkit-sdk/external/bitmake/src/core/UserContext.ts");
const requireImpl = eval("require");
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
        if (o instanceof _core_Path__WEBPACK_IMPORTED_MODULE_2__.AbsolutePath) {
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
            for (const [k, v] of Object.entries(o))
                result[k] = scopeValueAsPrimitives(v);
            return result;
        }
    }
    throw new Error(`Unknown instance of ${o}`);
}
const GLOBAL = Symbol("GLOBAL");
const SCOPE = Symbol("SCOPE");
class UserContext {
    [SCOPE];
    [GLOBAL];
    constructor(scope, global) {
        this[SCOPE] = scope;
        this[GLOBAL] = global;
    }
    static create(scope, global) {
        const proto = UserContext.prototype;
        const newScope = Object.create(proto);
        _core_Scope__WEBPACK_IMPORTED_MODULE_9__.ScopeHelper.clone(newScope, scope);
        const obj = Object.create(newScope);
        obj[SCOPE] = newScope;
        obj[GLOBAL] = global;
        return obj;
    }
    getCacheVariables() {
        return _core_Scope__WEBPACK_IMPORTED_MODULE_9__.ScopeHelper.getVariablesByGroup(this[SCOPE], "cache");
    }
    addCacheVariables(params) {
        let variables = params;
        if (typeof params === "string") {
            const filename = this[SCOPE].SOURCE_DIR.resolve(params).toString();
            if (!(0,_utils_FileSystem__WEBPACK_IMPORTED_MODULE_1__.fileExistsSync)(filename))
                return;
            variables = requireImpl(filename);
        }
        _core_Scope__WEBPACK_IMPORTED_MODULE_9__.ScopeHelper.defineVariables(this[SCOPE], "cache", variables);
    }
    addIncludeDirectories(...dirs) {
        const sourceDir = this[SCOPE].SOURCE_DIR;
        for (const iter of dirs.flat(1)) {
            this[SCOPE].INCLUDES.push(_core_IncludeDirectory__WEBPACK_IMPORTED_MODULE_7__.IncludeDirectory.create(iter, sourceDir));
        }
    }
    addSubdirectory(sourceDir, binaryDir) {
        binaryDir = binaryDir || node_path__WEBPACK_IMPORTED_MODULE_0___default().isAbsolute(sourceDir) ? undefined : sourceDir;
        const SOURCE_DIR = node_path__WEBPACK_IMPORTED_MODULE_0___default().isAbsolute(sourceDir) ? _core_Path__WEBPACK_IMPORTED_MODULE_2__.AbsolutePath.create(sourceDir) : this[SCOPE].SOURCE_DIR.join(sourceDir);
        const BINARY_DIR = node_path__WEBPACK_IMPORTED_MODULE_0___default().isAbsolute(binaryDir) ? _core_Path__WEBPACK_IMPORTED_MODULE_2__.AbsolutePath.create(binaryDir) : this[SCOPE].BINARY_DIR.join(binaryDir);
        const newScope = _core_Scope__WEBPACK_IMPORTED_MODULE_9__.ScopeHelper.clone({}, this[SCOPE]);
        _core_Scope__WEBPACK_IMPORTED_MODULE_9__.ScopeHelper.applyVariables(newScope, this);
        newScope.SOURCE_DIR = _core_Path__WEBPACK_IMPORTED_MODULE_2__.AbsolutePath.create(this[GLOBAL].resolveSubdirectory(SOURCE_DIR).toString());
        newScope.BINARY_DIR = BINARY_DIR;
        this[GLOBAL].addSubdirectory(newScope);
    }
    addCustomScript(name, params) {
        if (!params || !params.script || !params.output)
            throw new Error(`Uknown params ${JSON.stringify(params)}`);
        let script;
        if (typeof params.script === "string")
            script = this[GLOBAL].findScriptFunction(params.script);
        if (!script)
            script = this[SCOPE].SOURCE_DIR.resolve(params.script);
        const target = _core_CustomScript__WEBPACK_IMPORTED_MODULE_8__.CustomScript.create(this[SCOPE], name, script, params.output, params);
        this[GLOBAL].SCRIPTS.set(name, target);
        return target;
    }
    target(name) {
        const utarget = this[GLOBAL].getUknownTarget(name);
        return _core_InterfaceTarget__WEBPACK_IMPORTED_MODULE_3__.InterfaceTarget.create(this[SCOPE], utarget);
    }
    script(name) {
        let script = this[GLOBAL].INTERFACE_SCRIPTS[name];
        if (!script) {
            script = _core_InterfaceScript__WEBPACK_IMPORTED_MODULE_4__.InterfaceScript.create(name);
            this[GLOBAL].INTERFACE_SCRIPTS[name] = script;
        }
        return script;
    }
    install(value, params) {
        for (const it of [value].flat(1)) {
            const iter = (it instanceof _core_Target__WEBPACK_IMPORTED_MODULE_6__.BaseTarget) ? this.target(it.NAME) : it;
            const entity = _core_InstallEntity__WEBPACK_IMPORTED_MODULE_5__.InstallEntity.create(this, iter, params);
            this[GLOBAL].INSTALL_LIST.push(entity);
        }
    }
    addStaticLibrary(name, ...sources) {
        const target = _core_Target__WEBPACK_IMPORTED_MODULE_6__.StaticLibrary.create(this[SCOPE], name);
        target.addSources(...sources);
        this[GLOBAL].TARGETS.set(name, target);
        return target;
    }
    addObjectLibrary(name, ...sources) {
        const target = _core_Target__WEBPACK_IMPORTED_MODULE_6__.ObjectLibrary.create(this[SCOPE], name);
        target.addSources(...sources);
        this[GLOBAL].TARGETS.set(name, target);
        return target;
    }
    addSharedLibrary(name, ...sources) {
        const target = _core_Target__WEBPACK_IMPORTED_MODULE_6__.SharedLibrary.create(this[SCOPE], name);
        target.addSources(...sources);
        this[GLOBAL].TARGETS.set(name, target);
        return target;
    }
    addExecutable(name, ...sources) {
        const target = _core_Target__WEBPACK_IMPORTED_MODULE_6__.Executable.create(this[SCOPE], name);
        target.addSources(...sources);
        this[GLOBAL].TARGETS.set(name, target);
        return target;
    }
    executeScript(script, options) {
        const scriptPath = this[SCOPE].SOURCE_DIR.resolve(script);
        const module = requireImpl(scriptPath.toString());
        module(scopeValueAsPrimitives(options));
    }
}
;
Object.defineProperty(UserContext.prototype, "findProgram", {
    value: _core_FindProgram__WEBPACK_IMPORTED_MODULE_10__.findProgram,
    enumerable: false,
});


/***/ }),

/***/ "./src/cxx/index.ts":
/*!**************************!*\
  !*** ./src/cxx/index.ts ***!
  \**************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   filenameToPragmaOnceMacro: () => (/* binding */ filenameToPragmaOnceMacro),
/* harmony export */   generatedScriptNameComment: () => (/* binding */ generatedScriptNameComment),
/* harmony export */   lineToMultipleComment: () => (/* binding */ lineToMultipleComment),
/* harmony export */   lineToSinglComment: () => (/* binding */ lineToSinglComment)
/* harmony export */ });
/* harmony import */ var node_path__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! node:path */ "node:path");
/* harmony import */ var node_path__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(node_path__WEBPACK_IMPORTED_MODULE_0__);
/*
 * MIT License
 *
 * Copyright (c) 2025  Yurii Yakubin (yurii.yakubin@gmail.com)
 *
 * Permission is granted to use, copy, modify, and distribute this software
 * under the MIT License. See LICENSE file for details.
 */

function filenameToPragmaOnceMacro(filepath, deep) {
    if (typeof deep === 'undefined')
        deep = 3;
    let components = node_path__WEBPACK_IMPORTED_MODULE_0___default().normalize(filepath).split((node_path__WEBPACK_IMPORTED_MODULE_0___default().sep));
    if (components.length > deep)
        components = components.slice(components.length - deep);
    return "_" + components.join('_').replace(/[- .:%~]/g, '_').toUpperCase();
}
function lineToSinglComment(line) {
    return "//" + line;
}
function lineToMultipleComment(line) {
    return `/* ${line} */`;
}
function generatedScriptNameComment(filename) {
    return lineToMultipleComment("Generated from " + node_path__WEBPACK_IMPORTED_MODULE_0___default().basename(filename));
}


/***/ }),

/***/ "./src/logger/index.ts":
/*!*****************************!*\
  !*** ./src/logger/index.ts ***!
  \*****************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

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

/***/ "./src/utils/ChildProcess.ts":
/*!***********************************!*\
  !*** ./src/utils/ChildProcess.ts ***!
  \***********************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

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
        "User-Agent": "bitmake" + "/" + "0.0.1-develop.6",
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

/***/ "./src/utils/SettingsStorage.ts":
/*!**************************************!*\
  !*** ./src/utils/SettingsStorage.ts ***!
  \**************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   SettingsStorage: () => (/* binding */ SettingsStorage)
/* harmony export */ });
/* harmony import */ var node_fs__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! node:fs */ "node:fs");
/* harmony import */ var node_fs__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(node_fs__WEBPACK_IMPORTED_MODULE_0__);
/*
 * MIT License
 *
 * Copyright (c) 2025  Yurii Yakubin (yurii.yakubin@gmail.com)
 *
 * Permission is granted to use, copy, modify, and distribute this software
 * under the MIT License. See LICENSE file for details.
 */

class SettingsStorage {
    _filename;
    _settings;
    _current;
    constructor(filename) {
        this._filename = filename;
    }
    async push(name) {
        if (!this._settings)
            await this.load();
        let object = this._current.object[name];
        if (!object)
            object = this._current.object[name] = {};
        this._current = { parent: this._current, object };
    }
    async pop() {
        if (!this._settings)
            await this.load();
        console.assert(this._current.parent);
        this._current = this._current.parent;
    }
    async get(name) {
        if (!this._settings)
            await this.load();
        return this._current.object[name];
    }
    async set(name, value) {
        if (!this._settings)
            await this.load();
        this._current.object[name] = value;
        await this.save();
    }
    async load() {
        try {
            const content = await node_fs__WEBPACK_IMPORTED_MODULE_0___default().promises.readFile(this._filename, "utf-8");
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
    async save() {
        const space = 2;
        const content = JSON.stringify(this._settings, undefined, space);
        await node_fs__WEBPACK_IMPORTED_MODULE_0___default().promises.writeFile(this._filename, content, { encoding: "utf-8", flag: "w", flush: true });
    }
}
;


/***/ }),

/***/ "./src/utils/StrictType.ts":
/*!*********************************!*\
  !*** ./src/utils/StrictType.ts ***!
  \*********************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   ensureArray: () => (/* binding */ ensureArray),
/* harmony export */   ensureBoolean: () => (/* binding */ ensureBoolean),
/* harmony export */   ensureNumber: () => (/* binding */ ensureNumber),
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
function ensureNumber(value) {
    if (typeof value === "number")
        return value;
    throw new Error(`The '${value}' is not a string`);
}
function ensureString(value) {
    if (typeof value === "string")
        return value;
    throw new Error(`The '${value}' is not a string`);
}
function ensureArray(value) {
    if (Array.isArray(value))
        return Array.from(value);
    throw new Error(`The '${value}' is not a array`);
}


/***/ }),

/***/ "http":
/*!***********************!*\
  !*** external "http" ***!
  \***********************/
/***/ ((module) => {

module.exports = require("http");

/***/ }),

/***/ "https":
/*!************************!*\
  !*** external "https" ***!
  \************************/
/***/ ((module) => {

module.exports = require("https");

/***/ }),

/***/ "node:child_process":
/*!*************************************!*\
  !*** external "node:child_process" ***!
  \*************************************/
/***/ ((module) => {

module.exports = require("node:child_process");

/***/ }),

/***/ "node:fs":
/*!**************************!*\
  !*** external "node:fs" ***!
  \**************************/
/***/ ((module) => {

module.exports = require("node:fs");

/***/ }),

/***/ "node:os":
/*!**************************!*\
  !*** external "node:os" ***!
  \**************************/
/***/ ((module) => {

module.exports = require("node:os");

/***/ }),

/***/ "node:path":
/*!****************************!*\
  !*** external "node:path" ***!
  \****************************/
/***/ ((module) => {

module.exports = require("node:path");

/***/ }),

/***/ "node:url":
/*!***************************!*\
  !*** external "node:url" ***!
  \***************************/
/***/ ((module) => {

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
// This entry needs to be wrapped in an IIFE because it needs to be isolated against other modules in the chunk.
(() => {
/*!**********************!*\
  !*** ./src/index.ts ***!
  \**********************/
__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (__WEBPACK_DEFAULT_EXPORT__)
/* harmony export */ });
/* harmony import */ var _cxx__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! @/cxx */ "./src/cxx/index.ts");
/* harmony import */ var _InitHandler__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! @/InitHandler */ "./src/InitHandler.ts");
/* harmony import */ var _BuildHandler__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! @/BuildHandler */ "./src/BuildHandler.ts");
/*
 * MIT License
 *
 * Copyright (c) 2025  Yurii Yakubin (yurii.yakubin@gmail.com)
 *
 * Permission is granted to use, copy, modify, and distribute this software
 * under the MIT License. See LICENSE file for details.
 */
/// <reference path="global.d.ts" />



/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = ({
    cxx: _cxx__WEBPACK_IMPORTED_MODULE_0__,
    handlers: {
        default: _BuildHandler__WEBPACK_IMPORTED_MODULE_2__["default"],
        init: _InitHandler__WEBPACK_IMPORTED_MODULE_1__["default"],
        build: _BuildHandler__WEBPACK_IMPORTED_MODULE_2__["default"],
    },
});

})();

__webpack_exports__ = __webpack_exports__["default"];
/******/ 	return __webpack_exports__;
/******/ })()
;
});
//# sourceMappingURL=data:application/json;charset=utf-8;base64,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LENBQUMsSUFBSSxDQUFDLElBQVk7UUFDNUIsSUFBSSxDQUFDLElBQUksQ0FBQyxTQUFTO1lBQ2pCLE1BQU0sSUFBSSxDQUFDLElBQUksRUFBRSxDQUFDO1FBQ3BCLElBQUksTUFBTSxHQUFHLElBQUksQ0FBQyxRQUFRLENBQUMsTUFBTSxDQUFDLElBQUksQ0FBQyxDQUFDO1FBQ3hDLElBQUksQ0FBQyxNQUFNO1lBQ1QsTUFBTSxHQUFHLElBQUksQ0FBQyxRQUFRLENBQUMsTUFBTSxDQUFDLElBQUksQ0FBQyxHQUFHLEVBQUUsQ0FBQztRQUMzQyxJQUFJLENBQUMsUUFBUSxHQUFHLEVBQUUsTUFBTSxFQUFFLElBQUksQ0FBQyxRQUFRLEVBQUUsTUFBTSxFQUFFLENBQUM7SUFDcEQsQ0FBQztJQUVNLEtBQUssQ0FBQyxHQUFHO1FBQ2QsSUFBSSxDQUFDLElBQUksQ0FBQyxTQUFTO1lBQ2pCLE1BQU0sSUFBSSxDQUFDLElBQUksRUFBRSxDQUFDO1FBQ3BCLE9BQU8sQ0FBQyxNQUFNLENBQUMsSUFBSSxDQUFDLFFBQVEsQ0FBQyxNQUFNLENBQUMsQ0FBQztRQUNyQyxJQUFJLENBQUMsUUFBUSxHQUFHLElBQUksQ0FBQyxRQUFRLENBQUMsTUFBTSxDQUFDO0lBQ3ZDLENBQUM7SUFFTSxLQUFLLENBQUMsR0FBRyxDQUFDLElBQVk7UUFDM0IsSUFBSSxDQUFDLElBQUksQ0FBQyxTQUFTO1lBQ2pCLE1BQU0sSUFBSSxDQUFDLElBQUksRUFBRSxDQUFDO1FBQ3BCLE9BQU8sSUFBSSxDQUFDLFFBQVEsQ0FBQyxNQUFNLENBQUMsSUFBSSxDQUFDLENBQUM7SUFDcEMsQ0FBQztJQUVNLEtBQUssQ0FBQyxHQUFHLENBQUMsSUFBWSxFQUFFLEtBQVU7UUFDdkMsSUFBSSxDQUFDLElBQUksQ0FBQyxTQUFTO1lBQ2pCLE1BQU0sSUFBSSxDQUFDLElBQUksRUFBRSxDQUFDO1FBQ3BCLElBQUksQ0FBQyxRQUFRLENBQUMsTUFBTSxDQUFDLElBQUksQ0FBQyxHQUFHLEtBQUssQ0FBQztRQUNuQyxNQUFNLElBQUksQ0FBQyxJ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QVEsRUFBRTtRQUNSLE9BQU8sRUFBRSxxREFBWTtRQUNyQixJQUFJLEVBQUUsb0RBQVc7UUFDakIsS0FBSyxFQUFFLHFEQUFZO0tBQ3BCO0NBQ0YsRUFBQyIsInNvdXJjZXMiOlsid2VicGFjazovL2JpdG1ha2Uvd2VicGFjay91bml2ZXJzYWxNb2R1bGVEZWZpbml0aW9uIiwid2VicGFjazovL2JpdG1ha2UvLi9zcmMvQnVpbGRIYW5kbGVyLnRzIiwid2VicGFjazovL2JpdG1ha2UvLi9zcmMvQ29uc3RhbnRzLnRzIiwid2VicGFjazovL2JpdG1ha2UvLi9zcmMvSW5pdEhhbmRsZXIudHMiLCJ3ZWJwYWNrOi8vYml0bWFrZS8uL3NyYy9NYWtlU2NyaXB0QWN0aW9uLnRzIiwid2VicGFjazovL2JpdG1ha2UvLi9zcmMvUnVuU2NyaXB0Q29udGV4dC50cyIsIndlYnBhY2s6Ly9iaXRtYWtlLy4vc3JjL2NtYWtlL0NvbnN0YW50cy50cyIsIndlYnBhY2s6Ly9iaXRtYWtlLy4vc3JjL2NtYWtlL0hlbHBlci50cyIsIndlYnBhY2s6Ly9iaXRtYWtlLy4vc3JjL2NtYWtlL2luZGV4LnRzIiwid2VicGFjazovL2JpdG1ha2UvLi9zcmMvY29yZS9CdWlsZGluU2NyaXB0cy9jb25maWd1cmVfZmlsZS50cyIsIndlYnBhY2s6Ly9iaXRtYWtlLy4vc3JjL2NvcmUvQnVpbGRpblNjcmlwdHMvaW5zdGFsbF9zY3JpcHQudHMiLCJ3ZWJwYWNrOi8vYml0bWFrZS8uL3NyYy9jb3JlL0N1c3RvbVNjcmlwdC50cyIsIndlYnBhY2s6Ly9iaXRtYWtlLy4vc3JjL2NvcmUvRmluZFByb2dyYW0udHMiLCJ3ZWJwYWNrOi8vYml0bWFrZS8uL3NyYy9jb3JlL0dldFNpemVvZlZvaWRwLnRzIiwid2VicGFjazovL2JpdG1ha2UvLi9zcmMvY29yZS9HbG9iYWxDb250ZXh0LnRzIiwid2VicGFjazovL2JpdG1ha2UvLi9zcmMvY29yZS9Hb2FsQ29sbGVjdGlvbi50cyIsIndlYnBhY2s6Ly9iaXRtYWtlLy4vc3JjL2NvcmUvSW5jbHVkZURpcmVjdG9yeS50cyIsIndlYnBhY2s6Ly9iaXRtYWtlLy4vc3JjL2NvcmUvSW5zdGFsbEVudGl0eS50cyIsIndlYnBhY2s6Ly9iaXRtYWtlLy4vc3JjL2NvcmUvSW50ZXJmYWNlSW5jbHVkZXMudHMiLCJ3ZWJwYWNrOi8vYml0bWFrZS8uL3NyYy9jb3JlL0ludGVyZmFjZU9iamVjdHMudHMiLCJ3ZWJwYWNrOi8vYml0bWFrZS8uL3NyYy9jb3JlL0ludGVyZmFjZVNjcmlwdC50cyIsIndlYnBhY2s6Ly9iaXRtYWtlLy4vc3JjL2NvcmUvSW50ZXJmYWNlVGFyZ2V0LnRzIiwid2VicGFjazovL2JpdG1ha2UvLi9zcmMvY29yZS9QYXRoLnRzIiwid2VicGFjazovL2JpdG1ha2UvLi9zcmMvY29yZS9QbHVnaW5Db250ZXh0LnRzIiwid2VicGFjazovL2JpdG1ha2UvLi9zcmMvY29yZS9TY29wZS50cyIsIndlYnBhY2s6Ly9iaXRtYWtlLy4vc3JjL2NvcmUvU2NyaXB0Q29sbGVjdGlvbi50cyIsIndlYnBhY2s6Ly9iaXRtYWtlLy4vc3JjL2NvcmUvU291cmNlRmlsZS50cyIsIndlYnBhY2s6Ly9iaXRtYWtlLy4vc3JjL2NvcmUvU291cmNlRmlsZUxpc3QudHMiLCJ3ZWJwYWNrOi8vYml0bWFrZS8uL3NyYy9jb3JlL1N5c3RlbVZhcmlhYmxlcy50cyIsIndlYnBhY2s6Ly9iaXRtYWtlLy4vc3JjL2NvcmUvVGFyZ2V0LnRzIiwid2VicGFjazovL2JpdG1ha2UvLi9zcmMvY29yZS9UYXJnZXRDb2xsZWN0aW9uLnRzIiwid2VicGFjazovL2JpdG1ha2UvLi9zcmMvY29yZS9Ub29sY2hhaW5Db250ZXh0LnRzIiwid2VicGFjazovL2JpdG1ha2UvLi9zcmMvY29yZS9UeXBlcy50cyIsIndlYnBhY2s6Ly9iaXRtYWtlLy4vc3JjL2NvcmUvVW5rbm93blRhcmdldC50cyIsIndlYnBhY2s6Ly9iaXRtYWtlLy4vc3JjL2NvcmUvVXNlckNvbnRleHQudHMiLCJ3ZWJwYWNrOi8vYml0bWFrZS8uL3NyYy9jeHgvaW5kZXgudHMiLCJ3ZWJwYWNrOi8vYml0bWFrZS8uL3NyYy9sb2dnZXIvaW5kZXgudHMiLCJ3ZWJwYWNrOi8vYml0bWFrZS8uL3NyYy91dGlscy9DaGlsZFByb2Nlc3MudHMiLCJ3ZWJwYWNrOi8vYml0bWFrZS8uL3NyYy91dGlscy9GaWxlU3lzdGVtLnRzIiwid2VicGFjazovL2JpdG1ha2UvLi9zcmMvdXRpbHMvSHR0cFJlcXVlc3QudHMiLCJ3ZWJwYWNrOi8vYml0bWFrZS8uL3NyYy91dGlscy9JbXBvcnRNb2R1bGUubWpzIiwid2VicGFjazovL2JpdG1ha2UvLi9zcmMvdXRpbHMvTWFrZVBhdGNoLnRzIiwid2VicGFjazovL2JpdG1ha2UvLi9zcmMvdXRpbHMvTW9kdWxlLnRzIiwid2VicGFjazovL2JpdG1ha2UvLi9zcmMvdXRpbHMvUHJpbWl0aXZlcy50cyIsIndlYnBhY2s6Ly9iaXRtYWtlLy4vc3JjL3V0aWxzL1NldHRpbmdzU3RvcmFnZS50cyIsIndlYnBhY2s6Ly9iaXRtYWtlLy4vc3JjL3V0aWxzL1N0cmljdFR5cGUudHMiLCJ3ZWJwYWNrOi8vYml0bWFrZS9leHRlcm5hbCBub2RlLWNvbW1vbmpzIFwiaHR0cFwiIiwid2VicGFjazovL2JpdG1ha2UvZXh0ZXJuYWwgbm9kZS1jb21tb25qcyBcImh0dHBzXCIiLCJ3ZWJwYWNrOi8vYml0bWFrZS9leHRlcm5hbCBub2RlLWNvbW1vbmpzIFwibm9kZTpjaGlsZF9wcm9jZXNzXCIiLCJ3ZWJwYWNrOi8vYml0bWFrZS9leHRlcm5hbCBub2RlLWNvbW1vbmpzIFwibm9kZTpmc1wiIiwid2VicGFjazovL2JpdG1ha2UvZXh0ZXJuYWwgbm9kZS1jb21tb25qcyBcIm5vZGU6b3NcIiIsIndlYnBhY2s6Ly9iaXRtYWtlL2V4dGVybmFsIG5vZGUtY29tbW9uanMgXCJub2RlOnBhdGhcIiIsIndlYnBhY2s6Ly9iaXRtYWtlL2V4dGVybmFsIG5vZGUtY29tbW9uanMgXCJub2RlOnVybFwiIiwid2VicGFjazovL2JpdG1ha2Uvd2VicGFjay9ib290c3RyYXAiLCJ3ZWJwYWNrOi8vYml0bWFrZS93ZWJwYWNrL3J1bnRpbWUvY29tcGF0IGdldCBkZWZhdWx0IGV4cG9ydCIsIndlYnBhY2s6Ly9iaXRtYWtlL3dlYnBhY2svcnVudGltZS9kZWZpbmUgcHJvcGVydHkgZ2V0dGVycyIsIndlYnBhY2s6Ly9iaXRtYWtlL3dlYnBhY2svcnVudGltZS9oYXNPd25Qcm9wZXJ0eSBzaG9ydGhhbmQiLCJ3ZWJwYWNrOi8vYml0bWFrZS93ZWJwYWNrL3J1bnRpbWUvbWFrZSBuYW1lc3BhY2Ugb2JqZWN0Iiwid2VicGFjazovL2JpdG1ha2UvLi9zcmMvaW5kZXgudHMiXSwic291cmNlc0NvbnRlbnQiOlsiKGZ1bmN0aW9uIHdlYnBhY2tVbml2ZXJzYWxNb2R1bGVEZWZpbml0aW9uKHJvb3QsIGZhY3RvcnkpIHtcblx0aWYodHlwZW9mIGV4cG9ydHMgPT09ICdvYmplY3QnICYmIHR5cGVvZiBtb2R1bGUgPT09ICdvYmplY3QnKVxuXHRcdG1vZHVsZS5leHBvcnRzID0gZmFjdG9yeSgpO1xuXHRlbHNlIGlmKHR5cGVvZiBkZWZpbmUgPT09ICdmdW5jdGlvbicgJiYgZGVmaW5lLmFtZClcblx0XHRkZWZpbmUoW10sIGZhY3RvcnkpO1xuXHRlbHNlIGlmKHR5cGVvZiBleHBvcnRzID09PSAnb2JqZWN0Jylcblx0XHRleHBvcnRzW1wiYml0bWFrZVwiXSA9IGZhY3RvcnkoKTtcblx0ZWxzZVxuXHRcdHJvb3RbXCJiaXRtYWtlXCJdID0gZmFjdG9yeSgpO1xufSkoZ2xvYmFsLCAoKSA9PiB7XG5yZXR1cm4gIiwiLypcbiAqIE1JVCBMaWNlbnNlXG4gKlxuICogQ29weXJpZ2h0IChjKSAyMDI1ICBZdXJpaSBZYWt1YmluICh5dXJpaS55YWt1YmluQGdtYWlsLmNvbSlcbiAqXG4gKiBQZXJtaXNzaW9uIGlzIGdyYW50ZWQgdG8gdXNlLCBjb3B5LCBtb2RpZnksIGFuZCBkaXN0cmlidXRlIHRoaXMgc29mdHdhcmVcbiAqIHVuZGVyIHRoZSBNSVQgTGljZW5zZS4gU2VlIExJQ0VOU0UgZmlsZSBmb3IgZGV0YWlscy5cbiAqL1xuXG5pbXBvcnQgZnMgZnJvbSBcIm5vZGU6ZnNcIjtcbmltcG9ydCBwYXRoIGZyb20gXCJub2RlOnBhdGhcIjtcblxuaW1wb3J0ICogYXMgY21ha2UgZnJvbSBcIkAvY21ha2VcIjtcbmltcG9ydCB7IG1ha2VQYXRjaCB9IGZyb20gXCJAL3V0aWxzL01ha2VQYXRjaFwiO1xuaW1wb3J0IHsgc2F2ZUlmRGlmZmVyZW50LCBkaXJlY3RvcnlFeGlzdHMsIGdldFBhdGhTdHJpbmcgfSBmcm9tIFwiQC91dGlscy9GaWxlU3lzdGVtXCI7XG5pbXBvcnQgeyBTZXR0aW5nc1N0b3JhZ2UgfSBmcm9tIFwiQC91dGlscy9TZXR0aW5nc1N0b3JhZ2VcIjtcbmltcG9ydCB7IHNwYXduQXN5bmMgfSBmcm9tIFwiQC91dGlscy9DaGlsZFByb2Nlc3NcIjtcbmltcG9ydCB7IG1ha2VTY3JpcHRBY3Rpb24gfSBmcm9tIFwiQC9NYWtlU2NyaXB0QWN0aW9uXCI7XG5pbXBvcnQgeyBhcnJheVdyYXBwZXIsIGFzc2lnbk9iamVjdCB9IGZyb20gXCJAL3V0aWxzL1ByaW1pdGl2ZXNcIjtcbmltcG9ydCB7IEJVSUxEX1NFVFRJTkdTX0ZJTEUgfSBmcm9tIFwiQC9Db25zdGFudHNcIjtcbmltcG9ydCB7IHJlcXVpcmVSZXNvbHZlIH0gZnJvbSBcIkAvdXRpbHMvTW9kdWxlXCI7XG5pbXBvcnQgeyByZXF1ZXN0R2V0IH0gZnJvbSBcIkAvdXRpbHMvSHR0cFJlcXVlc3RcIjtcbmltcG9ydCB7IFJ1blNjcmlwdENvbnRleHQgfSBmcm9tIFwiQC9SdW5TY3JpcHRDb250ZXh0XCI7XG5pbXBvcnQgeyBjcmVhdGVMb2dnZXIgfSBmcm9tIFwiQC9sb2dnZXJcIjtcblxuY29uc3QgbG9nZ2VyID0gY3JlYXRlTG9nZ2VyKGltcG9ydC5tZXRhLnVybCk7XG5cbmZ1bmN0aW9uIG1lcmdlRW52aXJvbm1lbnQoLi4uYXJnczogYW55KSB7XG4gIGNvbnN0IGVudmlyb25tZW50OiBhbnkgPSB7fTtcbiAgZm9yIChjb25zdCBlbnYgb2YgYXJncykge1xuICAgIGNvbnN0IGxpc3Q6IGFueSA9IE9iamVjdC5lbnRyaWVzKGVudiB8fCB7fSk7XG4gICAgd2hpbGUgKGxpc3QubGVuZ3RoKSB7XG4gICAgICBsZXQgW2tleSx2YWxdID0gbGlzdC5wb3AoKTtcbiAgICAgIGxldCBkZWxpbWl0ZXI7XG4gICAgICBsZXQgam9pbkFmdGVyID0gdHJ1ZTtcbiAgICAgIHN3aXRjaCAoa2V5KSB7XG4gICAgICBjYXNlIFwiUEFUSFwiOlxuICAgICAgICBkZWxpbWl0ZXIgPSBwYXRoLmRlbGltaXRlcjtcbiAgICAgICAgam9pbkFmdGVyID0gZmFsc2U7XG4gICAgICAgIGJyZWFrO1xuICAgICAgY2FzZSBcIkNGTEFHU1wiOlxuICAgICAgY2FzZSBcIkNYWEZMQUdTXCI6XG4gICAgICBjYXNlIFwiTERGTEFHU1wiOlxuICAgICAgICBkZWxpbWl0ZXIgPSBcIiBcIjtcbiAgICAgICAgYnJlYWs7XG4gICAgICB9XG4gICAgICBpZiAodHlwZW9mIHZhbCA9PT0gJ251bWJlcicpXG4gICAgICAgIHZhbCA9IHZhbC50b1N0cmluZygpO1xuICAgICAgZWxzZSBpZiAoQXJyYXkuaXNBcnJheSh2YWwpKVxuICAgICAgICB2YWwgPSB2YWwuam9pbihkZWxpbWl0ZXIpO1xuICAgICAgaWYgKCFkZWxpbWl0ZXIgfHwgIWVudmlyb25tZW50W2tleV0pXG4gICAgICAgIGVudmlyb25tZW50W2tleV0gPSB2YWw7XG4gICAgICBlbHNlIGlmIChqb2luQWZ0ZXIpXG4gICAgICAgIGVudmlyb25tZW50W2tleV0gPSB2YWwgKyBkZWxpbWl0ZXIgKyBlbnZpcm9ubWVudFtrZXldO1xuICAgICAgZWxzZVxuICAgICAgICBlbnZpcm9ubWVudFtrZXldID0gZW52aXJvbm1lbnRba2V5XSArIGRlbGltaXRlciArIHZhbDtcbiAgICB9XG4gIH1cbiAgcmV0dXJuIGVudmlyb25tZW50O1xufVxuXG5mdW5jdGlvbiByZWJhc2VDb25maWcoY29uZmlnOiBhbnkpIHtcbiAgY29uc3QgYmFzZUNvbmZpZzogYW55ID0ge307XG4gIGNvbnN0IG90aGVyQ29uZmlnOiBhbnkgPSB7fTtcblxuICBmb3IgKGNvbnN0IFtrZXksIGVudHJ5XSBvZiBPYmplY3QuZW50cmllcyhjb25maWcpIGFzIGFueSkge1xuICAgIChlbnRyeS5iYXNlID8gb3RoZXJDb25maWcgOiBiYXNlQ29uZmlnKVtrZXldID0gZW50cnk7XG4gIH1cblxuICB3aGlsZSAodHJ1ZSkge1xuICAgIGNvbnN0IGtleXMgPSBPYmplY3Qua2V5cyhvdGhlckNvbmZpZyk7XG4gICAgaWYgKGtleXMubGVuZ3RoID09IDApXG4gICAgICBicmVhaztcbiAgICBjb25zdCBkb25lS2V5cyA9IFtdO1xuICAgIGZvciAoY29uc3Qga2V5IG9mIGtleXMpIHtcbiAgICAgIGNvbnN0IG90aGVySXRlciA9IG90aGVyQ29uZmlnW2tleV07XG4gICAgICBjb25zdCBiYXNlTGlzdCA9IFtdO1xuICAgICAgZm9yIChjb25zdCBpdGVyIG9mIGFycmF5V3JhcHBlcihvdGhlckl0ZXIuYmFzZSkpIHtcbiAgICAgICAgY29uc3QgYmFzZUVudHJ5ID0gYmFzZUNvbmZpZ1tpdGVyXTtcbiAgICAgICAgaWYgKCFiYXNlRW50cnkpIHtcbiAgICAgICAgICBiYXNlTGlzdC5sZW5ndGggPSAwO1xuICAgICAgICAgIGJyZWFrO1xuICAgICAgICB9XG4gICAgICAgIGJhc2VMaXN0LnB1c2goYmFzZUVudHJ5KTtcbiAgICAgIH1cbiAgICAgIGlmIChiYXNlTGlzdC5sZW5ndGgpIHtcbiAgICAgICAgYmFzZUxpc3QucHVzaChvdGhlckl0ZXIpO1xuICAgICAgICBsZXQgbmV3RW50cnkgPSB7fTtcbiAgICAgICAgZm9yIChjb25zdCBpdGVyIG9mIGJhc2VMaXN0KSB7XG4gICAgICAgICAgYXNzaWduT2JqZWN0KG5ld0VudHJ5LCBpdGVyKTtcbiAgICAgICAgfVxuICAgICAgICBiYXNlQ29uZmlnW2tleV0gPSBuZXdFbnRyeTtcbiAgICAgICAgZG9uZUtleXMucHVzaChrZXkpO1xuICAgICAgfVxuICAgIH1cbiAgICBpZiAoZG9uZUtleXMubGVuZ3RoID09IDApIHtcbiAgICAgIGZvciAoY29uc3Qga2V5IG9mIGtleXMpXG4gICAgICAgIHRocm93IGBDYW4ndCBzZXQgYmFzZSBjb25maWcgZm9yIFwiJHtrZXl9YDtcbiAgICB9XG4gICAgZm9yIChjb25zdCBrZXkgb2YgZG9uZUtleXMpIHtcbiAgICAgIGRlbGV0ZSBiYXNlQ29uZmlnW2tleV0uYmFzZTtcbiAgICAgIGRlbGV0ZSBvdGhlckNvbmZpZ1trZXldO1xuICAgIH1cbiAgfVxuXG4gIHJldHVybiBiYXNlQ29uZmlnO1xufVxuXG5mdW5jdGlvbiByZXNvbHZlU3RyaW5nV2l0aFZhcmlhYmxlKGNvbmZpZzogYW55LCBlbnRyeUNvbmZpZzogYW55LCByb290Q29uZmlnOiBhbnksIHZhbDogYW55KSB7XG4gIHJldHVybiB2YWwucmVwbGFjZSgvXFwkXFx7KFtefV0rKVxcfS9nLCAobWF0Y2g6IGFueSwgdmFsdWU6IGFueSkgPT4ge1xuICAgIGxldCBzZWw7XG4gICAgZm9yIChjb25zdCBuYW1lIG9mIHZhbHVlLnNwbGl0KFwiLlwiKSkge1xuICAgICAgaWYgKHNlbCA9PT0gdW5kZWZpbmVkKSB7XG4gICAgICAgIGlmIChjb25maWcuaGFzT3duUHJvcGVydHkobmFtZSkpIHtcbiAgICAgICAgICBzZWwgPSBjb25maWdbbmFtZV07XG4gICAgICAgIH1cbiAgICAgICAgZWxzZSBpZiAoY29uZmlnICE9PSBlbnRyeUNvbmZpZyAmJiBlbnRyeUNvbmZpZy5oYXNPd25Qcm9wZXJ0eShuYW1lKSkge1xuICAgICAgICAgIHNlbCA9IGVudHJ5Q29uZmlnW25hbWVdO1xuICAgICAgICB9XG4gICAgICAgIGVsc2UgaWYgKGNvbmZpZyAhPT0gcm9vdENvbmZpZyAmJiByb290Q29uZmlnLmhhc093blByb3BlcnR5KG5hbWUpKSB7XG4gICAgICAgICAgc2VsID0gcm9vdENvbmZpZ1tuYW1lXTtcbiAgICAgICAgfVxuICAgICAgICBlbHNlIHtcbiAgICAgICAgICB0cnkge1xuICAgICAgICAgICAgY29uc3QgbWFpbkZpbGUgPSByZXF1aXJlUmVzb2x2ZShuYW1lKTtcbiAgICAgICAgICAgIGlmIChtYWluRmlsZSkge1xuICAgICAgICAgICAgICBzZWwgPSB7IG1haW5GaWxlLCBtYWluRGlyOiBwYXRoLnBvc2l4LmRpcm5hbWUobWFpbkZpbGUpLCB9O1xuICAgICAgICAgICAgfVxuICAgICAgICAgIH0gY2F0Y2goZSkge31cbiAgICAgICAgfVxuICAgICAgICBpZiAoc2VsID09PSB1bmRlZmluZWQpXG4gICAgICAgICAgYnJlYWs7XG4gICAgICB9XG4gICAgICBlbHNlIGlmIChzZWwuaGFzT3duUHJvcGVydHkobmFtZSkpIHtcbiAgICAgICAgc2VsID0gc2VsW25hbWVdO1xuICAgICAgfVxuICAgICAgZWxzZSB7XG4gICAgICAgIHNlbCA9IHVuZGVmaW5lZDtcbiAgICAgICAgYnJlYWs7XG4gICAgICB9XG4gICAgfVxuICAgIGlmIChzZWwgPT09IHVuZGVmaW5lZClcbiAgICAgIHRocm93IG5ldyBFcnJvcihgVGhlICR7dmFsdWV9IHZhcmlhYmxlIGRvZXMgbm90IGV4aXN0XCJgKTtcbiAgICByZXR1cm4gc2VsO1xuICB9KTtcbn1cblxuZnVuY3Rpb24gcmVzb2x2ZUNvbmZpZ1N0cmluZ3NJbXBsKGNvbmZpZzogYW55LCBlbnRyeUNvbmZpZzogYW55LCByb290Q29uZmlnOiBhbnkpIHtcbiAgbGV0IGNvdW50ID0gMDtcbiAgZm9yIChjb25zdCBba2V5LCB2YWxdIG9mIE9iamVjdC5lbnRyaWVzKGNvbmZpZykpIHtcbiAgICBpZiAodmFsICYmIHR5cGVvZiB2YWwgPT09IFwib2JqZWN0XCIpXG4gICAgICBjb3VudCArPSByZXNvbHZlQ29uZmlnU3RyaW5nc0ltcGwodmFsLCBlbnRyeUNvbmZpZywgcm9vdENvbmZpZyk7XG4gICAgZWxzZSBpZiAodHlwZW9mIHZhbCA9PT0gXCJzdHJpbmdcIikge1xuICAgICAgY29uc3QgdiA9IHJlc29sdmVTdHJpbmdXaXRoVmFyaWFibGUoY29uZmlnLCBlbnRyeUNvbmZpZywgcm9vdENvbmZpZywgdmFsKTtcbiAgICAgIGlmICh2YWwgIT09IHYpIHtcbiAgICAgICAgY29uZmlnW2tleV0gPSB2O1xuICAgICAgICBjb3VudCsrO1xuICAgICAgfVxuICAgIH1cbiAgfVxuICByZXR1cm4gY291bnQ7XG59XG5cbmZ1bmN0aW9uIHJlc29sdmVDb25maWdTdHJpbmdzKGNvbmZpZzogYW55KSB7XG4gIGZvciAoOzspIHtcbiAgICBsZXQgY291bnQgPSAwO1xuICAgIGZvciAoY29uc3QgW2tleSwgdmFsXSBvZiBPYmplY3QuZW50cmllcyhjb25maWcpKSB7XG4gICAgICBpZiAodmFsICYmIHR5cGVvZiB2YWwgPT09IFwib2JqZWN0XCIpXG4gICAgICAgIGNvdW50ICs9IHJlc29sdmVDb25maWdTdHJpbmdzSW1wbCh2YWwsIHZhbCwgY29uZmlnKTtcbiAgICAgIGVsc2UgIGlmICh0eXBlb2YgdmFsID09PSBcInN0cmluZ1wiKSB7XG4gICAgICAgIGNvbnN0IHYgPSByZXNvbHZlU3RyaW5nV2l0aFZhcmlhYmxlKGNvbmZpZywgY29uZmlnLCBjb25maWcsIHZhbCk7XG4gICAgICAgIGlmICh2YWwgIT09IHYpIHtcbiAgICAgICAgICBjb25maWdba2V5XSA9IHY7XG4gICAgICAgICAgY291bnQrKztcbiAgICAgICAgfVxuICAgICAgfVxuICAgIH1cbiAgICBpZiAoIWNvdW50KVxuICAgICAgYnJlYWs7XG4gIH1cbn1cblxuZnVuY3Rpb24gbWFrZUJ1aWxkQ29uZmlnKGN0eDogYW55LCBjb25maWc6IGFueSkge1xuICBmb3IgKGNvbnN0IGtleSBvZiBbIFwic291cmNlUm9vdFwiLCBcIndhc211eERpclwiIF0pIHtcbiAgICBpZiAoY29uZmlnW2tleV0pIHtcbiAgICAgIHRocm93IGBUaGUgJHtrZXl9IHZhcmlhYmxlIGNhbm5vdCBiZSBjaGFuZ2VkIHRvIFwiJHtjb25maWcuc291cmNlUm9vdH1cImA7XG4gICAgfVxuICB9XG5cbiAgY29uc3Qgcm9vdENvbmZpZyA9IHJlYmFzZUNvbmZpZyhjb25maWcpO1xuXG4gIHJvb3RDb25maWcuYnVpbGRUeXBlID0gcm9vdENvbmZpZy5idWlsZFR5cGUgfHwgY3R4LmJ1aWxkVHlwZTtcbiAgcm9vdENvbmZpZy5zb3VyY2VSb290ID0gcm9vdENvbmZpZy5zb3VyY2VSb290IHx8IGN0eC53b3JrRGlyO1xuICByb290Q29uZmlnLmJpbmFyeVJvb3QgPSByb290Q29uZmlnLmJpbmFyeVJvb3QgfHwgcGF0aC5wb3NpeC5yZXNvbHZlKGN0eC53b3JrRGlyLFwiYnVpbGRcIik7XG5cbiAgZm9yIChjb25zdCBba2V5LCBlbnRyeV0gb2YgT2JqZWN0LmVudHJpZXMocm9vdENvbmZpZykgYXMgYW55KSB7XG4gICAgaWYgKGVudHJ5ICYmIHR5cGVvZiBlbnRyeSA9PT0gXCJvYmplY3RcIiAmJiBlbnRyeS5hY3Rpb24pIHtcbiAgICAgIGVudHJ5LmJ1aWxkVHlwZSA9IGVudHJ5LmJ1aWxkVHlwZSB8fCByb290Q29uZmlnLmJ1aWxkVHlwZTtcbiAgICAgIGNvbnN0IGZvbGRlciA9IGtleS5yZXBsYWNlKFwiOlwiLCBwYXRoLnBvc2l4LnNlcCk7XG4gICAgICBjb25zdCB3b3JrRGlyID0gcGF0aC5wb3NpeC5qb2luKHJvb3RDb25maWcuYmluYXJ5Um9vdCwgZm9sZGVyKTtcbiAgICAgIGVudHJ5LnRlbXBEaXIgPSBlbnRyeS50ZW1wRGlyIHx8IHBhdGgucG9zaXguam9pbih3b3JrRGlyLCBcInRtcFwiKTtcbiAgICAgIGlmIChlbnRyeS5zb3VyY2VVcmwpIHtcbiAgICAgICAgZW50cnkuYXJjaGl2ZURpciA9IGVudHJ5LmFyY2hpdmVEaXIgfHwgcGF0aC5wb3NpeC5qb2luKHdvcmtEaXIsIFwiYXJjXCIpO1xuICAgICAgICBlbnRyeS5leHRyYWN0RGlyID0gZW50cnkuZXh0cmFjdERpciB8fCBwYXRoLnBvc2l4LmpvaW4od29ya0RpciwgXCJzcmNcIik7XG4gICAgICAgIGlmICghZW50cnkuc291cmNlRGlyKVxuICAgICAgICAgIGVudHJ5LnNvdXJjZURpciA9IGVudHJ5LmV4dHJhY3REaXI7XG4gICAgICAgIGVsc2UgaWYgKCFwYXRoLmlzQWJzb2x1dGUoZW50cnkuc291cmNlRGlyKSlcbiAgICAgICAgICBlbnRyeS5zb3VyY2VEaXIgPSBwYXRoLnBvc2l4LmpvaW4oZW50cnkuZXh0cmFjdERpciwgZW50cnkuc291cmNlRGlyKTtcbiAgICAgIH1cbiAgICAgIGVsc2UgaWYgKCFlbnRyeS5zb3VyY2VEaXIpIHtcbiAgICAgICAgdGhyb3cgYE1pc3Npbmcgc291cmNlRGlyIGZvciAke2tleX0gYWN0aW9uXCJgO1xuICAgICAgfVxuICAgICAgaWYgKGVudHJ5LmJpbmFyeURpciA9PT0gbnVsbClcbiAgICAgICAgZW50cnkuYmluYXJ5RGlyID0gZW50cnkuc291cmNlRGlyO1xuICAgICAgZWxzZSBpZiAoZW50cnkuYmluYXJ5RGlyID09PSB1bmRlZmluZWQpXG4gICAgICAgIGVudHJ5LmJpbmFyeURpciA9IHBhdGgucG9zaXguam9pbih3b3JrRGlyLCBcImJpblwiKTtcbiAgICB9XG4gIH1cblxuICByZXNvbHZlQ29uZmlnU3RyaW5ncyhyb290Q29uZmlnKTtcblxuICByZXR1cm4gcm9vdENvbmZpZztcbn1cblxuYXN5bmMgZnVuY3Rpb24gdHJ5UmVxdWVzdEdldChzb3VyY2VVcmw6IHN0cmluZywgYXJjRmlsZTogc3RyaW5nLCBhdHRlbXB0czogbnVtYmVyKSB7XG4gIGZvcig7Oykge1xuICAgIHRyeSB7XG4gICAgICBjb25zdCBidWZmZXIgPSBhd2FpdCByZXF1ZXN0R2V0KHNvdXJjZVVybCk7XG4gICAgICBhd2FpdCBmcy5wcm9taXNlcy53cml0ZUZpbGUoYXJjRmlsZSwgYnVmZmVyKTtcbiAgICAgIHJldHVybjtcbiAgICB9XG4gICAgY2F0Y2ggKGUpIHtcbiAgICAgIGlmICgtLWF0dGVtcHRzIDwgMCkge1xuICAgICAgICB0aHJvdyBlO1xuICAgICAgfVxuICAgICAgY29uc29sZS53YXJuKGUpO1xuICAgIH1cbiAgfVxufVxuXG5hc3luYyBmdW5jdGlvbiBkb0V4dHJhY3RBcmNoaXZlKGN0eDogUnVuU2NyaXB0Q29udGV4dCwgZW52aXJvbm1lbnQ6IGFueSwgY29uZmlnOiBhbnksIHNldHRpbmdzOiBhbnkpXG57XG4gIGlmICghY29uZmlnLnNvdXJjZVVybClcbiAgICB0aHJvdyBcIlVua25vd24gc291cmNlVXJsXCI7XG4gIGlmICghY29uZmlnLmFyY2hpdmVEaXIpXG4gICAgdGhyb3cgXCJVbmtub3duIGFyY2hpdmVEaXJcIjtcbiAgaWYgKCFjb25maWcuZXh0cmFjdERpcilcbiAgICB0aHJvdyBcIlVua25vd24gZXh0cmFjdERpclwiO1xuXG4gIGlmICghYXdhaXQgZGlyZWN0b3J5RXhpc3RzKGNvbmZpZy5hcmNoaXZlRGlyKSkge1xuICAgIGNvbnNvbGUubG9nKGBta2RpciAtcCAke2NvbmZpZy5hcmNoaXZlRGlyfWApO1xuICAgIGF3YWl0IGZzLnByb21pc2VzLm1rZGlyKGNvbmZpZy5hcmNoaXZlRGlyLCB7IHJlY3Vyc2l2ZTogdHJ1ZSB9KTtcbiAgfVxuXG4gIGlmICghYXdhaXQgZGlyZWN0b3J5RXhpc3RzKGNvbmZpZy50ZW1wRGlyKSkge1xuICAgIGNvbnNvbGUubG9nKGBta2RpciAtcCAke2NvbmZpZy50ZW1wRGlyfWApO1xuICAgIGF3YWl0IGZzLnByb21pc2VzLm1rZGlyKGNvbmZpZy50ZW1wRGlyLCB7IHJlY3Vyc2l2ZTogdHJ1ZSB9KTtcbiAgfVxuXG4gIGNvbnN0IGFyY05hbWUgPSBwYXRoLmJhc2VuYW1lKGNvbmZpZy5zb3VyY2VVcmwpO1xuXG4gIGxldCBhcmNGaWxlO1xuICBsZXQgZG93bmxvYWRVcmxzID0gYXdhaXQgc2V0dGluZ3MuZ2V0KFwiZG93bmxvYWRVcmxzXCIpIHx8IHt9O1xuICBpZiAoZG93bmxvYWRVcmxzW2NvbmZpZy5zb3VyY2VVcmxdKVxuICAgIGFyY0ZpbGUgPSBkb3dubG9hZFVybHNbY29uZmlnLnNvdXJjZVVybF07XG4gIGVsc2Uge1xuICAgIGFyY0ZpbGUgPSBwYXRoLmpvaW4oY29uZmlnLmFyY2hpdmVEaXIsIGFyY05hbWUpO1xuICAgIGF3YWl0IHRyeVJlcXVlc3RHZXQoY29uZmlnLnNvdXJjZVVybCwgYXJjRmlsZSwgY3R4LnJlcXVlc3RBdHRlbXB0cyk7XG4gICAgZG93bmxvYWRVcmxzW2NvbmZpZy5zb3VyY2VVcmxdID0gYXJjRmlsZTtcbiAgICBhd2FpdCBzZXR0aW5ncy5zZXQoXCJkb3dubG9hZFVybHNcIiwgZG93bmxvYWRVcmxzKTtcbiAgfVxuXG4gIGxldCBleHRyYWN0RGlyO1xuICBsZXQgZXh0cmFjdEZpbGVzID0gYXdhaXQgc2V0dGluZ3MuZ2V0KFwiZXh0cmFjdEZpbGVzXCIpIHx8IHt9O1xuICBpZiAoZXh0cmFjdEZpbGVzW2FyY0ZpbGVdKSB7XG4gICAgZXh0cmFjdERpciA9IGV4dHJhY3RGaWxlc1thcmNGaWxlXTtcbiAgfVxuICBlbHNlIHtcbiAgICBleHRyYWN0RGlyID0gYXdhaXQgZnMucHJvbWlzZXMubWtkdGVtcChwYXRoLnJlc29sdmUoY29uZmlnLnRlbXBEaXIsIGFyY05hbWUgKyAnLicpKTtcbiAgXG4gICAgYXdhaXQgY21ha2UuZXh0cmFjdCh7XG4gICAgICBlbnZpcm9ubWVudCxcbiAgICAgIGZpbGVuYW1lOiBhcmNGaWxlLFxuICAgICAgd29ya0RpcjogZXh0cmFjdERpcixcbiAgICAgIGxvZ0ZpbGU6ICBwYXRoLmpvaW4oY29uZmlnLnRlbXBEaXIsIHBhdGguYmFzZW5hbWUoZXh0cmFjdERpcikgKyBcIi5sb2dcIiksXG4gICAgfSk7XG4gIFxuICAgIGNvbnN0IGV4dHJhY3RMaXN0ID0gYXdhaXQgZnMucHJvbWlzZXMucmVhZGRpcihleHRyYWN0RGlyKTtcbiAgICBpZiAoZXh0cmFjdExpc3QubGVuZ3RoID09PSAxKSB7XG4gICAgICBleHRyYWN0RGlyID0gcGF0aC5yZXNvbHZlKGV4dHJhY3REaXIsIGV4dHJhY3RMaXN0WzBdKTtcbiAgICAgIGlmICghYXdhaXQgZGlyZWN0b3J5RXhpc3RzKGV4dHJhY3REaXIpKSB7XG4gICAgICAgIGNvbnNvbGUubG9nKGBybSAtZnIgJHtleHRyYWN0RGlyfWApO1xuICAgICAgICBhd2FpdCBmcy5wcm9taXNlcy5ybShleHRyYWN0RGlyLCB7IHJlY3Vyc2l2ZTogdHJ1ZSB9KTtcbiAgICAgICAgdGhyb3cgYFN1cHBvcnQgb25seSBkaXJlY3RvcnkgZm9yIGFyY2hpdmVgO1xuICAgICAgfVxuICAgIH1cbiAgXG4gICAgaWYgKGF3YWl0IGRpcmVjdG9yeUV4aXN0cyhjb25maWcuZXh0cmFjdERpcikpIHtcbiAgICAgIC8vIFRPRE86IE1hcmdlIGV4dHJhY3REaXIgd2l0aCBvdXRwdXRcbiAgICAgIGNvbnNvbGUubG9nKGBybSAtZnIgJHtjb25maWcuZXh0cmFjdERpcn1gKTtcbiAgICAgIGF3YWl0IGZzLnByb21pc2VzLnJtKGNvbmZpZy5leHRyYWN0RGlyLCB7IHJlY3Vyc2l2ZTogdHJ1ZSB9KTtcbiAgICB9XG4gICAgZWxzZSB7XG4gICAgICBjb25zdCBwYXJlbnREaXIgPSBwYXRoLmRpcm5hbWUoY29uZmlnLmV4dHJhY3REaXIpO1xuICAgICAgaWYgKCFhd2FpdCBkaXJlY3RvcnlFeGlzdHMocGFyZW50RGlyKSkge1xuICAgICAgICBjb25zb2xlLmxvZyhgbWtkaXIgLXAgJHtwYXJlbnREaXJ9YCk7XG4gICAgICAgIGF3YWl0IGZzLnByb21pc2VzLm1rZGlyKHBhcmVudERpciwgeyByZWN1cnNpdmU6IHRydWUgfSk7IFxuICAgICAgfVxuICAgIH1cbiAgXG4gICAgY29uc29sZS5sb2coYG12ICR7ZXh0cmFjdERpcn0gJHtjb25maWcuZXh0cmFjdERpcn1gKTtcbiAgICBhd2FpdCBmcy5wcm9taXNlcy5yZW5hbWUoZXh0cmFjdERpciwgY29uZmlnLmV4dHJhY3REaXIpO1xuICBcbiAgICBleHRyYWN0RmlsZXNbYXJjRmlsZV0gPSBleHRyYWN0RGlyO1xuICAgIGF3YWl0IHNldHRpbmdzLnNldChcImV4dHJhY3RGaWxlc1wiLCBleHRyYWN0RmlsZXMpO1xuICB9XG5cbiAgaWYgKGNvbmZpZy5wYXRjaERpcikge1xuICAgIGxldCBwYXRjaERpcnMgPSBhd2FpdCBzZXR0aW5ncy5nZXQoXCJwYXRjaERpcnNcIikgfHwge307XG4gICAgaWYgKCFwYXRjaERpcnNbY29uZmlnLnBhdGNoRGlyXSkge1xuICAgICAgYXdhaXQgbWFrZVBhdGNoKGNvbmZpZy5wYXRjaERpciwgY29uZmlnLmV4dHJhY3REaXIpO1xuICAgICAgcGF0Y2hEaXJzW2NvbmZpZy5wYXRjaERpcl0gPSBjb25maWcuZXh0cmFjdERpcjtcbiAgICAgIGF3YWl0IHNldHRpbmdzLnNldChcInBhdGNoRGlyc1wiLCBwYXRjaERpcnMpO1xuICAgIH1cbiAgfVxufVxuXG5jb25zdCBhY3Rpb25IYW5kbGVyczogYW55ID0ge1xuICBub25lOiBhc3luYyAoY29uZmlnOiBhbnksIGVudmlyb25tZW50OiBhbnksIHNldHRpbmdzOiBhbnkpID0+IHtcbiAgICAvKiBkbyBub3RoaW5nICovXG4gIH0sXG4gIGNtYWtlOiBhc3luYyAoY29uZmlnOiBhbnksIGVudmlyb25tZW50OiBhbnksIHNldHRpbmdzOiBhbnkpID0+IHtcbiAgICBjb25zdCBzb3VyY2VEaXIgPSBnZXRQYXRoU3RyaW5nKGNvbmZpZy5zb3VyY2VEaXIpO1xuICAgIGNvbnN0IGJpbmFyeURpciA9IGdldFBhdGhTdHJpbmcoY29uZmlnLmJpbmFyeURpcik7XG4gICAgY29uc3QgY21ha2VBcmdzID0ge1xuICAgICAgZW52aXJvbm1lbnQ6IHtcbiAgICAgICAgLi4uZW52aXJvbm1lbnQsXG4gICAgICAgIERFU1RESVI6IGNvbmZpZy5kZXN0RGlyLFxuICAgICAgfSxcbiAgICAgIGdlbmVyYXRvcjogY29uZmlnLmdlbmVyYXRvciB8fCBcIlVuaXggTWFrZWZpbGVzXCIsXG4gICAgICBjYWNoZVZhcmlhYmxlczogY29uZmlnLmNhY2hlVmFyaWFibGVzLFxuICAgICAgc291cmNlRGlyLFxuICAgICAgYmluYXJ5RGlyLFxuICAgIH07XG5cbiAgICBpZiAoIWNtYWtlQXJncy5jYWNoZVZhcmlhYmxlcy5DTUFLRV9CVUlMRF9UWVBFKSB7XG4gICAgICBjbWFrZUFyZ3MuY2FjaGVWYXJpYWJsZXMuQ01BS0VfQlVJTERfVFlQRSA9IGNvbmZpZy5idWlsZFR5cGU7XG4gICAgfVxuXG4gICAgYXdhaXQgY21ha2UuY29uZmlndXJlKGNtYWtlQXJncyk7XG4gICAgYXdhaXQgY21ha2UuYnVpbGQoY21ha2VBcmdzKTtcbiAgICBhd2FpdCBjbWFrZS5pbnN0YWxsKGNtYWtlQXJncyk7XG4gIH0sXG4gIGNvbmZpZ3VyZTogYXN5bmMgKGNvbmZpZzogYW55LCBlbnZpcm9ubWVudDogYW55LCBzZXR0aW5nczogYW55KSA9PiB7XG4gICAgY29uc3Qgc291cmNlRGlyID0gZ2V0UGF0aFN0cmluZyhjb25maWcuc291cmNlRGlyKTtcbiAgICBjb25zdCBiaW5hcnlEaXIgPSBnZXRQYXRoU3RyaW5nKGNvbmZpZy5iaW5hcnlEaXIpO1xuICAgIGxldCBzdGVwID0gYXdhaXQgc2V0dGluZ3MuZ2V0KFwiY29uZmlndXJlXCIpIHx8IFwiY29uZmlnXCI7XG4gICAgaWYgKHN0ZXAgPT09IFwiY29uZmlnXCIpIHtcbiAgICAgIGNvbnN0IGNvbW1hbmQgPSBwYXRoLnJlc29sdmUoc291cmNlRGlyLCBcImNvbmZpZ3VyZVwiKTtcbiAgICAgIGNvbnN0IHBhcmFtcyA9IFtdO1xuICAgICAgaWYgKEFycmF5LmlzQXJyYXkoY29uZmlnLnZhcmlhYmxlcykpIHtcbiAgICAgICAgZm9yIChjb25zdCBpdGVyIG9mIGNvbmZpZy52YXJpYWJsZXMpXG4gICAgICAgICAgcGFyYW1zLnB1c2goaXRlcik7XG4gICAgICB9XG4gICAgICBlbHNlIGlmIChjb25maWcudmFyaWFibGVzKSB7XG4gICAgICAgIGZvciAoY29uc3QgW2tleSx2YWxdIG9mIE9iamVjdC5lbnRyaWVzKGNvbmZpZy52YXJpYWJsZXMpKSB7XG4gICAgICAgICAgaWYgKGtleSA9PT0gXCJmZWF0dXJlc1wiICYmIEFycmF5LmlzQXJyYXkodmFsKSkge1xuICAgICAgICAgICAgZm9yIChjb25zdCBpdGVyIG9mIHZhbClcbiAgICAgICAgICAgICAgcGFyYW1zLnB1c2goYC0tJHtpdGVyfWApO1xuICAgICAgICAgIH1cbiAgICAgICAgICBlbHNlIGlmICh2YWwgPT09IG51bGwpXG4gICAgICAgICAgICBwYXJhbXMucHVzaChgLS0ke2tleX1gKTtcbiAgICAgICAgICBlbHNlXG4gICAgICAgICAgICBwYXJhbXMucHVzaChgLS0ke2tleX09JHt2YWx9YCk7XG4gICAgICAgIH1cbiAgICAgIH1cbiAgICAgIGlmIChjb25maWcuZmVhdHVyZXMpIHtcbiAgICAgICAgZm9yIChjb25zdCBrZXkgb2YgY29uZmlnLmZlYXR1cmVzKVxuICAgICAgICAgIHBhcmFtcy5wdXNoKGAtLSR7a2V5fWApO1xuICAgICAgfVxuICAgICAgY29uc3QgcmVzMSA9IGF3YWl0IHNwYXduQXN5bmMoY29tbWFuZCwgcGFyYW1zLCB7XG4gICAgICAgIGN3ZDogYmluYXJ5RGlyLFxuICAgICAgICBlbnY6IGVudmlyb25tZW50LFxuICAgICAgICBleHRyYToge1xuICAgICAgICAgIG91dHB1dDogYGFjLmNvbmZpZy5sb2dgLFxuICAgICAgICB9LFxuICAgICAgfSk7XG4gICAgICBpZiAocmVzMS5zdGF0dXMgIT09IDApIHtcbiAgICAgICAgdGhyb3cgYGNvbmZpZ3VyZSByZXR1cm5lZCBzdGF0dXMgJHtyZXMxLnN0YXR1c31gO1xuICAgICAgfVxuICAgICAgc3RlcCA9IFwiaW5zdGFsbFwiO1xuICAgICAgYXdhaXQgc2V0dGluZ3Muc2V0KFwiY29uZmlndXJlXCIsIHN0ZXApO1xuICAgIH1cbiAgICBpZiAoc3RlcCA9PT0gXCJpbnN0YWxsXCIpIHtcbiAgICAgIGNvbnN0IGFyZ3MgPSBbICdpbnN0YWxsJyBdO1xuICAgICAgaWYgKGNvbmZpZy5kZXN0RGlyKSB7XG4gICAgICAgIGFyZ3MucHVzaChgREVTVERJUj0ke2NvbmZpZy5kZXN0RGlyfWApO1xuICAgICAgfVxuICAgICAgY29uc3QgcmVzMiA9IGF3YWl0IHNwYXduQXN5bmMoXCJtYWtlXCIsIGFyZ3MsIHtcbiAgICAgICAgY3dkOiBiaW5hcnlEaXIsXG4gICAgICAgIGVudjogZW52aXJvbm1lbnQsXG4gICAgICAgIGV4dHJhOiB7XG4gICAgICAgICAgb3V0cHV0OiBgYWMuYnVpbGQubG9nYCxcbiAgICAgICAgfSxcbiAgICAgIH0pO1xuICAgICAgaWYgKHJlczIuc3RhdHVzICE9PSAwKSB7XG4gICAgICAgIHRocm93IGBtYWtlIHJldHVybmVkIHN0YXR1cyAke3JlczIuc3RhdHVzfWA7XG4gICAgICB9XG4gICAgICBzdGVwID0gXCJkb25lXCI7XG4gICAgICBhd2FpdCBzZXR0aW5ncy5zZXQoXCJjb25maWd1cmVcIiwgc3RlcCk7XG4gICAgfVxuICB9LFxuICBtYWtlOiBhc3luYyAoY29uZmlnOiBhbnksIGVudmlyb25tZW50OiBhbnksIHNldHRpbmdzOiBhbnkpID0+IHtcbiAgICBjb25zdCBiaW5hcnlEaXIgPSBnZXRQYXRoU3RyaW5nKGNvbmZpZy5iaW5hcnlEaXIpO1xuICAgIGNvbnN0IGFyZ3MgPSBjb25maWcuYXJncyB8fCBbXTtcbiAgICBpZiAoY29uZmlnLmRlc3REaXIpIHtcbiAgICAgIGFyZ3MucHVzaChgREVTVERJUj0ke2NvbmZpZy5kZXN0RGlyfWApO1xuICAgIH1cbiAgICBjb25zdCByZXMyID0gYXdhaXQgc3Bhd25Bc3luYyhcIm1ha2VcIiwgYXJncywge1xuICAgICAgY3dkOiBiaW5hcnlEaXIsXG4gICAgICBlbnY6IGVudmlyb25tZW50LFxuICAgICAgZXh0cmE6IHtcbiAgICAgICAgb3V0cHV0OiBgbWFrZS5sb2dgLFxuICAgICAgfSxcbiAgICB9KTtcbiAgICBpZiAocmVzMi5zdGF0dXMgIT09IDApIHtcbiAgICAgIHRocm93IGBtYWtlIHJldHVybmVkIHN0YXR1cyAke3JlczIuc3RhdHVzfWA7XG4gICAgfVxuICB9LFxuICBwcm9jZXNzOiBhc3luYyAoY29uZmlnOiBhbnksIGVudmlyb25tZW50OiBhbnksIHNldHRpbmdzOiBhbnkpID0+IHtcbiAgICBpZiAoIWNvbmZpZy5jb21tYW5kKVxuICAgICAgdGhyb3cgXCJSZXF1aXJlZCBjb21tYW5kIGZpZWxkIGZvciBwcm9jZXNzIGFjdGlvblwiO1xuICAgIGNvbnN0IHNvdXJjZURpciA9IGdldFBhdGhTdHJpbmcoY29uZmlnLnNvdXJjZURpcik7XG4gICAgY29uc3QgYmluYXJ5RGlyID0gZ2V0UGF0aFN0cmluZyhjb25maWcuYmluYXJ5RGlyKTtcbiAgICBsZXQgeyBjb21tYW5kIH0gPSBjb25maWc7XG4gICAgaWYgKCFwYXRoLmlzQWJzb2x1dGUoY29tbWFuZCkgJiYgKGNvbW1hbmQuaW5jbHVkZXMocGF0aC5wb3NpeC5kZWxpbWl0ZXIpIHx8IGNvbW1hbmQuaW5jbHVkZXMocGF0aC53aW4zMi5kZWxpbWl0ZXIpKSkge1xuICAgICAgY29tbWFuZCA9IHBhdGgucmVzb2x2ZShzb3VyY2VEaXIsIGNvbW1hbmQpO1xuICAgIH1cbiAgICBjb25zdCByZXMgPSBhd2FpdCBzcGF3bkFzeW5jKGNvbW1hbmQsIGNvbmZpZy5hcmdzIHx8IFtdLCB7XG4gICAgICBjd2Q6IGJpbmFyeURpcixcbiAgICAgIGVudjogZW52aXJvbm1lbnQsXG4gICAgICBleHRyYToge1xuICAgICAgICBvdXRwdXQ6IGBwcm9jZXNzLmxvZ2AsXG4gICAgICB9LFxuICAgIH0pO1xuICAgIGlmIChyZXMuc3RhdHVzICE9PSAwKSB7XG4gICAgICB0aHJvdyBgcHJvY2VzcyByZXR1cm5lZCBzdGF0dXMgJHtyZXMuc3RhdHVzfWA7XG4gICAgfVxuICB9LFxuICBiaXRtYWtlOiBtYWtlU2NyaXB0QWN0aW9uLFxufTtcblxuYXN5bmMgZnVuY3Rpb24gZG9UYXJnZXRCdWlsZChjdHg6IFJ1blNjcmlwdENvbnRleHQsIGVudmlyb25tZW50OiBhbnksIGNvbmZpZzogYW55LCBzZXR0aW5nczogYW55KSB7XG4gIGlmIChjb25maWcucHJlQWN0aW9uKSB7XG4gICAgYXdhaXQgc2V0dGluZ3MucHVzaChcInByZUFjdGlvblwiKTtcbiAgICBjb25zdCBuZXdDb25maWc6IGFueSA9IHt9O1xuICAgIGFzc2lnbk9iamVjdChuZXdDb25maWcsIGNvbmZpZyk7XG4gICAgZGVsZXRlIG5ld0NvbmZpZy5hY3Rpb247XG4gICAgZGVsZXRlIG5ld0NvbmZpZy5wcmVBY3Rpb247XG4gICAgZGVsZXRlIG5ld0NvbmZpZy5wb3N0QWN0aW9uO1xuICAgIGFzc2lnbk9iamVjdChuZXdDb25maWcsIGNvbmZpZy5wcmVBY3Rpb24pO1xuICAgIGNvbnN0IG5ld0Vudmlyb25tZW50ID0gbWVyZ2VFbnZpcm9ubWVudChjb25maWcucHJlQWN0aW9uLmVudmlyb25tZW50LCBlbnZpcm9ubWVudCk7XG4gICAgYXdhaXQgZG9UYXJnZXRCdWlsZChjdHgsIG5ld0Vudmlyb25tZW50LCBuZXdDb25maWcsIHNldHRpbmdzKTtcbiAgICBhd2FpdCBzZXR0aW5ncy5wb3AoKTtcbiAgfVxuXG4gIGlmIChBcnJheS5pc0FycmF5KGNvbmZpZy5hY3Rpb24pKSB7XG4gICAgYXdhaXQgc2V0dGluZ3MucHVzaChcImFjdGlvblwiKTtcbiAgICBmb3IgKHZhciBpID0gMDsgaSA8IGNvbmZpZy5hY3Rpb24ubGVuZ3RoOyArK2kpIHtcbiAgICAgIGF3YWl0IHNldHRpbmdzLnB1c2goaSk7XG4gICAgICBjb25zdCBuZXdDb25maWc6IGFueSA9IHt9O1xuICAgICAgYXNzaWduT2JqZWN0KG5ld0NvbmZpZywgY29uZmlnKTtcbiAgICAgIGRlbGV0ZSBuZXdDb25maWcuYWN0aW9uO1xuICAgICAgZGVsZXRlIG5ld0NvbmZpZy5wcmVBY3Rpb247XG4gICAgICBkZWxldGUgbmV3Q29uZmlnLnBvc3RBY3Rpb247XG4gICAgICBhc3NpZ25PYmplY3QobmV3Q29uZmlnLCBjb25maWcuYWN0aW9uW2ldKTtcbiAgICAgIGNvbnN0IG5ld0Vudmlyb25tZW50ID0gbWVyZ2VFbnZpcm9ubWVudChjb25maWcuYWN0aW9uW2ldLmVudmlyb25tZW50LCBlbnZpcm9ubWVudCk7XG4gICAgICBhd2FpdCBkb1RhcmdldEJ1aWxkKGN0eCwgbmV3RW52aXJvbm1lbnQsIG5ld0NvbmZpZywgc2V0dGluZ3MpO1xuICAgICAgYXdhaXQgc2V0dGluZ3MucG9wKCk7XG4gICAgfVxuICAgIGF3YWl0IHNldHRpbmdzLnBvcCgpO1xuICB9XG4gIGVsc2Uge1xuICAgIGlmICghYXdhaXQgZGlyZWN0b3J5RXhpc3RzKGNvbmZpZy5iaW5hcnlEaXIpKSB7XG4gICAgICBhd2FpdCBmcy5wcm9taXNlcy5ta2Rpcihjb25maWcuYmluYXJ5RGlyLCB7IHJlY3Vyc2l2ZTogdHJ1ZSB9KTtcbiAgICB9XG4gICAgaWYgKGFjdGlvbkhhbmRsZXJzW2NvbmZpZy5hY3Rpb25dKSB7XG4gICAgICBjb25maWcuZGVzY3JpcHRpb24gJiYgY29uc29sZS5sb2coY29uZmlnLmRlc2NyaXB0aW9uKTtcbiAgICAgIGF3YWl0IGFjdGlvbkhhbmRsZXJzW2NvbmZpZy5hY3Rpb25dKGNvbmZpZywgZW52aXJvbm1lbnQsIHNldHRpbmdzKTtcbiAgICB9XG4gIH1cblxuICBpZiAoY29uZmlnLnBvc3RBY3Rpb24pIHtcbiAgICBhd2FpdCBzZXR0aW5ncy5wdXNoKFwicG9zdEFjdGlvblwiKTtcbiAgICBjb25zdCBuZXdDb25maWc6IGFueSA9IHt9O1xuICAgIGFzc2lnbk9iamVjdChuZXdDb25maWcsIGNvbmZpZyk7XG4gICAgZGVsZXRlIG5ld0NvbmZpZy5hY3Rpb247XG4gICAgZGVsZXRlIG5ld0NvbmZpZy5wcmVBY3Rpb247XG4gICAgZGVsZXRlIG5ld0NvbmZpZy5wb3N0QWN0aW9uO1xuICAgIGFzc2lnbk9iamVjdChuZXdDb25maWcsIGNvbmZpZy5wb3N0QWN0aW9uKTtcbiAgICBjb25zdCBuZXdFbnZpcm9ubWVudCA9IG1lcmdlRW52aXJvbm1lbnQoY29uZmlnLnBvc3RBY3Rpb24uZW52aXJvbm1lbnQsIGVudmlyb25tZW50KTtcbiAgICBhd2FpdCBkb1RhcmdldEJ1aWxkKGN0eCwgbmV3RW52aXJvbm1lbnQsIG5ld0NvbmZpZywgc2V0dGluZ3MpO1xuICAgIGF3YWl0IHNldHRpbmdzLnBvcCgpO1xuICB9XG59XG5cbmV4cG9ydCBkZWZhdWx0IGFzeW5jIChvcHRpb25zOiBhbnkpID0+IHtcbiAgY29uc3QgY3R4ID0gbmV3IFJ1blNjcmlwdENvbnRleHQob3B0aW9ucyk7XG4gIGNvbnN0IHVzZXJDb25maWcgPSBhd2FpdCBjdHguZ2V0VXNlckNvbmZpZygpO1xuICBjb25zdCBidWlsZENvbmZpZyA9IG1ha2VCdWlsZENvbmZpZyhjdHgsIHVzZXJDb25maWcpO1xuXG4gIGlmIChidWlsZENvbmZpZy5SRUNJUEVfQ09OVEVOVF9GSUxFKSB7XG4gICAgY29uc3QganNvbkNvbmZpZyA9IEpTT04uc3RyaW5naWZ5KGJ1aWxkQ29uZmlnLCBudWxsLCAyKTtcbiAgICBhd2FpdCBzYXZlSWZEaWZmZXJlbnQoYnVpbGRDb25maWcuUkVDSVBFX0NPTlRFTlRfRklMRSwganNvbkNvbmZpZyk7XG4gIH1cblxuICBjb25zdCBzZXR0aW5nc0ZpbGVuYW1lID0gcGF0aC5yZXNvbHZlKGJ1aWxkQ29uZmlnLmJpbmFyeVJvb3QsIEJVSUxEX1NFVFRJTkdTX0ZJTEUpO1xuICBjb25zdCBzZXR0aW5ncyA9IG5ldyBTZXR0aW5nc1N0b3JhZ2Uoc2V0dGluZ3NGaWxlbmFtZSk7XG5cbiAgZm9yIChjb25zdCBba2V5LCBlbnRyeV0gb2YgT2JqZWN0LmVudHJpZXMoYnVpbGRDb25maWcpIGFzIGFueSkge1xuICAgIGlmIChlbnRyeSAmJiB0eXBlb2YgZW50cnkgPT09IFwib2JqZWN0XCIgJiYgZW50cnkuYWN0aW9uICYmICFlbnRyeS5kaXNhYmxlZCkge1xuICAgICAgYXdhaXQgc2V0dGluZ3MucHVzaChrZXkpO1xuICAgICAgY29uc3QgY29tcGxldGVkID0gYXdhaXQgc2V0dGluZ3MuZ2V0KFwiY29tcGxldGVkXCIpO1xuICAgICAgaWYgKGVudHJ5LnJlYnVpbGQgfHwgIWNvbXBsZXRlZCkge1xuICAgICAgICBsb2dnZXIuaW5mbyhgU3RhcnRlZCBhY3Rpb246ICR7a2V5fWApO1xuICAgICAgICBjb25zdCBlbnZpcm9ubWVudCA9IG1lcmdlRW52aXJvbm1lbnQoZW50cnkuZW52aXJvbm1lbnQsIHByb2Nlc3MuZW52KTtcbiAgICAgICAgaWYgKGVudHJ5LnNvdXJjZVVybCkge1xuICAgICAgICAgIGF3YWl0IGRvRXh0cmFjdEFyY2hpdmUoY3R4LCBlbnZpcm9ubWVudCwgZW50cnksIHNldHRpbmdzKTtcbiAgICAgICAgfVxuICAgICAgICBhd2FpdCBkb1RhcmdldEJ1aWxkKGN0eCwgZW52aXJvbm1lbnQsIGVudHJ5LCBzZXR0aW5ncyk7XG4gICAgICAgIGF3YWl0IHNldHRpbmdzLnNldChcImNvbXBsZXRlZFwiLCB0cnVlKTtcbiAgICAgICAgbG9nZ2VyLmluZm8oYENvbXBsZXRlZCBhY3Rpb246ICR7a2V5fWApO1xuICAgICAgfVxuICAgICAgYXdhaXQgc2V0dGluZ3MucG9wKCk7XG4gICAgfVxuICB9XG59XG4iLCIvKlxuICogTUlUIExpY2Vuc2VcbiAqXG4gKiBDb3B5cmlnaHQgKGMpIDIwMjUgIFl1cmlpIFlha3ViaW4gKHl1cmlpLnlha3ViaW5AZ21haWwuY29tKVxuICpcbiAqIFBlcm1pc3Npb24gaXMgZ3JhbnRlZCB0byB1c2UsIGNvcHksIG1vZGlmeSwgYW5kIGRpc3RyaWJ1dGUgdGhpcyBzb2Z0d2FyZVxuICogdW5kZXIgdGhlIE1JVCBMaWNlbnNlLiBTZWUgTElDRU5TRSBmaWxlIGZvciBkZXRhaWxzLlxuICovXG5cbmV4cG9ydCBjb25zdCBVU0VSX0NPTkZJRyA9IFwiYml0bWFrZS5jb25maWcubWpzXCI7XG5leHBvcnQgY29uc3QgUkVRVUVTVF9BVFRFTVBUUyA9IDMwO1xuZXhwb3J0IGNvbnN0IEJVSUxEX1NFVFRJTkdTX0ZJTEUgPSBcIkJ1aWxkU2V0dGluZ3MuanNvblwiO1xuZXhwb3J0IGNvbnN0IEFMTF9UQVJHRVQgPSBcImFsbFwiO1xuZXhwb3J0IGNvbnN0IElOU1RBTExfVEFSR0VUID0gXCJpbnN0YWxsXCI7XG4iLCIvKlxuICogTUlUIExpY2Vuc2VcbiAqXG4gKiBDb3B5cmlnaHQgKGMpIDIwMjUgIFl1cmlpIFlha3ViaW4gKHl1cmlpLnlha3ViaW5AZ21haWwuY29tKVxuICpcbiAqIFBlcm1pc3Npb24gaXMgZ3JhbnRlZCB0byB1c2UsIGNvcHksIG1vZGlmeSwgYW5kIGRpc3RyaWJ1dGUgdGhpcyBzb2Z0d2FyZVxuICogdW5kZXIgdGhlIE1JVCBMaWNlbnNlLiBTZWUgTElDRU5TRSBmaWxlIGZvciBkZXRhaWxzLlxuICovXG5cbmltcG9ydCBmcyBmcm9tIFwibm9kZTpmc1wiO1xuXG5pbXBvcnQgeyBmaWxlRXhpc3RzIH0gZnJvbSBcIkAvdXRpbHMvRmlsZVN5c3RlbVwiO1xuaW1wb3J0IHsgUnVuU2NyaXB0Q29udGV4dCB9IGZyb20gXCJAL1J1blNjcmlwdENvbnRleHRcIjtcbmltcG9ydCB7IHJlcXVpcmVSZXNvbHZlIH0gZnJvbSBcIkAvdXRpbHMvTW9kdWxlXCI7XG5pbXBvcnQgeyBjcmVhdGVMb2dnZXIgfSBmcm9tIFwiQC9sb2dnZXJcIjtcblxuY29uc3QgbG9nZ2VyID0gY3JlYXRlTG9nZ2VyKGltcG9ydC5tZXRhLnVybCk7XG5cbmV4cG9ydCBkZWZhdWx0IGFzeW5jIGZ1bmN0aW9uKG9wdGlvbnM6IGFueSkge1xuICBjb25zdCBjdHggPSBuZXcgUnVuU2NyaXB0Q29udGV4dChvcHRpb25zKTtcbiAgY29uc3QgcHJlc2V0OiBzdHJpbmcgPSBjdHguZW52LnByZXNldDtcblxuICBsZXQgcHJlc2V0UGF0aDtcbiAgaWYgKGF3YWl0IGZpbGVFeGlzdHMocHJlc2V0KSlcbiAgICBwcmVzZXRQYXRoID0gcHJlc2V0O1xuICBlbHNlIHtcbiAgICBjb25zdCBjb21wb25lbnRzID0gcHJlc2V0LnNwbGl0KFwiL1wiKTtcbiAgICBpZiAoY29tcG9uZW50cy5sZW5ndGggPT09IDIpIHtcbiAgICAgICAgdHJ5IHsgcHJlc2V0UGF0aCA9IHJlcXVpcmVSZXNvbHZlKGAke2NvbXBvbmVudHNbMF19L2JpdG1ha2UvcHJlc2V0cy8ke2NvbXBvbmVudHNbMV19YCkgfSBjYXRjaChlKSB7fVxuICAgIH1cbiAgfVxuXG4gIGlmICghcHJlc2V0UGF0aClcbiAgICB0aHJvdyBgUHJlc2V0ICcke3ByZXNldH0nIGlzIG5vdCBhdmFpbGFibGVgO1xuXG4gIGlmIChhd2FpdCBmaWxlRXhpc3RzKGN0eC51c2VyQ29uZmlnUGF0aCkpXG4gICAgYXdhaXQgZnMucHJvbWlzZXMucm0oY3R4LnVzZXJDb25maWdQYXRoKTtcblxuICBhd2FpdCBmcy5wcm9taXNlcy5jb3B5RmlsZShwcmVzZXRQYXRoLCBjdHgudXNlckNvbmZpZ1BhdGgpO1xuICBsb2dnZXIuaW5mbyhgUHJlc2V0ICcke3ByZXNldH0nIGluc3RhbGxlZCBzdWNjZXNzZnVsbHlgKTtcbn1cbiIsIi8qXG4gKiBNSVQgTGljZW5zZVxuICpcbiAqIENvcHlyaWdodCAoYykgMjAyNSAgWXVyaWkgWWFrdWJpbiAoeXVyaWkueWFrdWJpbkBnbWFpbC5jb20pXG4gKlxuICogUGVybWlzc2lvbiBpcyBncmFudGVkIHRvIHVzZSwgY29weSwgbW9kaWZ5LCBhbmQgZGlzdHJpYnV0ZSB0aGlzIHNvZnR3YXJlXG4gKiB1bmRlciB0aGUgTUlUIExpY2Vuc2UuIFNlZSBMSUNFTlNFIGZpbGUgZm9yIGRldGFpbHMuXG4gKi9cblxuaW1wb3J0IGZzIGZyb20gXCJub2RlOmZzXCI7XG5pbXBvcnQgcGF0aCBmcm9tIFwibm9kZTpwYXRoXCI7XG5cbmltcG9ydCB7IFBsdWdpbkNvbnRleHQgfSBmcm9tIFwiQC9jb3JlL1BsdWdpbkNvbnRleHRcIjtcbmltcG9ydCB7IEdsb2JhbENvbnRleHQgfSBmcm9tIFwiQC9jb3JlL0dsb2JhbENvbnRleHRcIjtcbmltcG9ydCB7IFNjb3BlSGVscGVyIH0gZnJvbSBcIkAvY29yZS9TY29wZVwiO1xuaW1wb3J0IHsgR29hbENvbGxlY3Rpb24gfSBmcm9tIFwiQC9jb3JlL0dvYWxDb2xsZWN0aW9uXCI7XG5pbXBvcnQgeyBUb29sY2hhaW5Db250ZXh0IH0gZnJvbSBcIkAvY29yZS9Ub29sY2hhaW5Db250ZXh0XCI7XG5pbXBvcnQgeyBnZXRQYXRoU3RyaW5nIH0gIGZyb20gXCJAL3V0aWxzL0ZpbGVTeXN0ZW1cIjtcbmltcG9ydCB7IEZpbGVQYXRoIH0gZnJvbSBcIkAvY29yZS9QYXRoXCI7XG5pbXBvcnQgeyBpbXBvcnRNb2R1bGUgfSAgZnJvbSBcIkAvdXRpbHMvTW9kdWxlXCI7XG5pbXBvcnQgU3lzdGVtVmFyaWFibGVzIGZyb20gXCJAL2NvcmUvU3lzdGVtVmFyaWFibGVzXCI7XG5cbmNvbnN0IFBBQ0tBR0VfSlNPTiA9IFwicGFja2FnZS5qc29uXCI7XG5jb25zdCBNQUtFX0NBQ0hFID0gXCJNYWtlQ2FjaGUuanNvblwiO1xuXG5leHBvcnQgYXN5bmMgZnVuY3Rpb24gbWFrZVNjcmlwdEFjdGlvbihjb25maWc6IGFueSwgZW52aXJvbm1lbnQ6IGFueSwgc2V0dGluZ3M6IGFueSkge1xuICBwcm9jZXNzLmVudiA9IGVudmlyb25tZW50O1xuXG4gIGxldCBzY29wZTogYW55ID0ge307XG4gIFNjb3BlSGVscGVyLmRlZmluZVZhcmlhYmxlcyhzY29wZSwgXCJzeXN0ZW1cIiwgU3lzdGVtVmFyaWFibGVzKTtcblxuICBjb25zdCBzb3VyY2VEaXIgPSBnZXRQYXRoU3RyaW5nKGNvbmZpZy5zb3VyY2VEaXIpO1xuICBjb25zdCBiaW5hcnlEaXIgPSBnZXRQYXRoU3RyaW5nKGNvbmZpZy5iaW5hcnlEaXIpO1xuXG4gIHNjb3BlLlBST0pFQ1RfU09VUkNFX0RJUiA9IHNvdXJjZURpcjtcbiAgc2NvcGUuUFJPSkVDVF9CSU5BUllfRElSID0gYmluYXJ5RGlyO1xuXG4gIHNjb3BlLlBBQ0tBR0VfRklMRSA9IHNjb3BlLlBST0pFQ1RfU09VUkNFX0RJUi5qb2luKFBBQ0tBR0VfSlNPTik7XG4gIHNjb3BlLkNBQ0hFX0ZJTEUgPSBzY29wZS5QUk9KRUNUX0JJTkFSWV9ESVIuam9pbihNQUtFX0NBQ0hFKTtcbiAgc2NvcGUuU09VUkNFX0RJUiA9IHNjb3BlLlBST0pFQ1RfU09VUkNFX0RJUjtcbiAgc2NvcGUuQklOQVJZX0RJUiA9IHNjb3BlLlBST0pFQ1RfQklOQVJZX0RJUjtcblxuICBjb25zdCBwYWNrYWdlSnNvbiA9IGF3YWl0IGZzLnByb21pc2VzLnJlYWRGaWxlKHNjb3BlLlBBQ0tBR0VfRklMRS50b1N0cmluZygpLCAndXRmOCcpO1xuICBjb25zdCBwa2cgPSBKU09OLnBhcnNlKHBhY2thZ2VKc29uKTtcblxuICBzY29wZS5CVUlMRF9UWVBFID0gY29uZmlnLmJ1aWxkVHlwZTtcbiAgc2NvcGUuUFJPSkVDVF9OQU1FID0gcGtnLm5hbWU7XG4gIHNjb3BlLlBST0pFQ1RfVkVSU0lPTiA9IHBrZy52ZXJzaW9uO1xuICBzY29wZS5QUk9KRUNUX0RFU0NSSVBUSU9OID0gcGtnLmRlc2NyaXB0aW9uO1xuICBzY29wZS5QUk9KRUNUX0hPTUVQQUdFX1VSTCA9IHBrZy5ob21lcGFnZTtcblxuICBpZiAoY29uZmlnLmRlc3REaXIpXG4gICAgc2NvcGUuREVTVERJUiA9IGNvbmZpZy5kZXN0RGlyO1xuXG4gIFNjb3BlSGVscGVyLmFwcGx5VmFyaWFibGVzKHNjb3BlLCBjb25maWcudmFyaWFibGVzIHx8IHt9KTtcblxuICBjb25zdCBnbG9iYWwgPSBHbG9iYWxDb250ZXh0LmNyZWF0ZSgpO1xuICBpZiAoc2NvcGUuVE9PTENIQUlOX0ZJTEUpIHtcbiAgICBjb25zdCB0b29sY2hhaW4gPSBhd2FpdCBpbXBvcnRNb2R1bGUoc2NvcGUuVE9PTENIQUlOX0ZJTEUpO1xuICAgIGlmICghdG9vbGNoYWluLmRlZmF1bHQpXG4gICAgICB0aHJvdyBuZXcgRXJyb3IoXCJUb29sY2hhaW4gbW9kdWxlIGhhcyBubyBkZWZhdWx0IGV4cG9ydFwiKTtcbiAgICBjb25zdCBtayA9IFRvb2xjaGFpbkNvbnRleHQuY3JlYXRlKHNjb3BlLCBnbG9iYWwpO1xuICAgIGNvbnN0IHJlc3VsdCA9IHRvb2xjaGFpbi5kZWZhdWx0KG1rKTtcbiAgICBpZiAocmVzdWx0IGluc3RhbmNlb2YgUHJvbWlzZSlcbiAgICAgIGF3YWl0IHJlc3VsdDtcbiAgICBzY29wZSA9IG1rLl9zY29wZSgpO1xuICAgIFNjb3BlSGVscGVyLmFwcGx5VmFyaWFibGVzKHNjb3BlLCBtayk7XG4gIH1cblxuICBmb3IgKGNvbnN0IHBsdWdpbiBvZiAoc2NvcGUuTUFLRV9QTFVHSU5fTElTVCB8fCBbXSkpIHtcbiAgICBjb25zdCBmaWxlbmFtZSA9IEZpbGVQYXRoLmNyZWF0ZShwbHVnaW4pO1xuICAgIGNvbnN0IG1vZHVsZSA9IGF3YWl0IGltcG9ydE1vZHVsZShmaWxlbmFtZS50b1N0cmluZygpKTtcbiAgICBpZiAoIW1vZHVsZS5wbHVnaW5FbnRyeSlcbiAgICAgIHRocm93IG5ldyBFcnJvcihgUGx1Z2luICR7ZmlsZW5hbWUuYmFzZW5hbWUoKX0gbm90IGNvbnRhaW4gcGx1Z2luRW50cnkgZnVuY3Rpb25gKTtcbiAgICBjb25zdCBtayA9IFBsdWdpbkNvbnRleHQuY3JlYXRlKHNjb3BlLCBnbG9iYWwpO1xuICAgIGNvbnN0IHJlc3VsdCA9IG1vZHVsZS5wbHVnaW5FbnRyeShtayk7XG4gICAgaWYgKHJlc3VsdCBpbnN0YW5jZW9mIFByb21pc2UpXG4gICAgICBhd2FpdCByZXN1bHQ7XG4gICAgc2NvcGUgPSBtay5fc2NvcGUoKTtcbiAgICBTY29wZUhlbHBlci5hcHBseVZhcmlhYmxlcyhzY29wZSwgbWspO1xuICB9XG5cbiAgZ2xvYmFsLmFkZFN1YmRpcmVjdG9yeShzY29wZSk7XG5cbiAgYXdhaXQgZ2xvYmFsLmRvU3ViZGlyZWN0b3J5KCk7XG4gIGNvbnNvbGUuaW5mbyhcIkNvbmZpZ3VyaW5nIGRvbmVcIik7XG5cbiAgaWYgKHNjb3BlLkdMT0JBTF9DT05URVhUX0pTT04pIHtcbiAgICBjb25zdCBmaWxlbmFtZSA9IHNjb3BlLkdMT0JBTF9DT05URVhUX0pTT04udG9TdHJpbmcoKTtcbiAgICBjb25zdCBjb250ZW50ID0gSlNPTi5zdHJpbmdpZnkoZ2xvYmFsLCBudWxsLCAyKTtcbiAgICBmcy5ta2RpclN5bmMocGF0aC5kaXJuYW1lKGZpbGVuYW1lKSwgeyByZWN1cnNpdmU6IHRydWUgfSk7XG4gICAgZnMud3JpdGVGaWxlU3luYyhmaWxlbmFtZSwgY29udGVudCwgeyBlbmNvZGluZzogXCJ1dGY4XCIgfSk7XG4gIH1cblxuICBjb25zdCBhbGxHb2FsTGlzdCA9IGdsb2JhbC5jcmVhdGVHb2FscyhzY29wZSk7XG4gIGNvbnN0IGdvYWxMaXN0ID0gYWxsR29hbExpc3QuZ2V0VGFyZ2V0TGlzdChcImluc3RhbGxcIik7XG5cbiAgaWYgKHNjb3BlLlRBUkdFVF9HT0FMU19KU09OKSB7XG4gICAgY29uc3QgZmlsZW5hbWUgPSBzY29wZS5UQVJHRVRfR09BTFNfSlNPTi50b1N0cmluZygpO1xuICAgIGNvbnN0IGNvbnRlbnQgPSBKU09OLnN0cmluZ2lmeShnb2FsTGlzdCwgbnVsbCwgMik7XG4gICAgZnMubWtkaXJTeW5jKHBhdGguZGlybmFtZShmaWxlbmFtZSksIHsgcmVjdXJzaXZlOiB0cnVlIH0pO1xuICAgIGZzLndyaXRlRmlsZVN5bmMoZmlsZW5hbWUsIGNvbnRlbnQsIHsgZW5jb2Rpbmc6IFwidXRmOFwiIH0pO1xuICB9XG5cbiAgYXdhaXQgR29hbENvbGxlY3Rpb24uYnVpbGRHb2Fscyhnb2FsTGlzdCk7XG59XG4iLCIvKlxuICogTUlUIExpY2Vuc2VcbiAqXG4gKiBDb3B5cmlnaHQgKGMpIDIwMjUgIFl1cmlpIFlha3ViaW4gKHl1cmlpLnlha3ViaW5AZ21haWwuY29tKVxuICpcbiAqIFBlcm1pc3Npb24gaXMgZ3JhbnRlZCB0byB1c2UsIGNvcHksIG1vZGlmeSwgYW5kIGRpc3RyaWJ1dGUgdGhpcyBzb2Z0d2FyZVxuICogdW5kZXIgdGhlIE1JVCBMaWNlbnNlLiBTZWUgTElDRU5TRSBmaWxlIGZvciBkZXRhaWxzLlxuICovXG5cbmltcG9ydCBwYXRoIGZyb20gXCJub2RlOnBhdGhcIjtcbmltcG9ydCB1cmwgZnJvbSBcIm5vZGU6dXJsXCI7XG5cbmltcG9ydCB7IGZpbGVFeGlzdHMgfSBmcm9tIFwiQC91dGlscy9GaWxlU3lzdGVtXCI7XG5pbXBvcnQgeyBVU0VSX0NPTkZJRywgUkVRVUVTVF9BVFRFTVBUUyB9IGZyb20gXCJAL0NvbnN0YW50c1wiO1xuaW1wb3J0IHsgREVCVUdfQlVJTERfVFlQRSwgUkVMRUFTRV9CVUlMRF9UWVBFIH0gZnJvbSBcIkAvY29yZS9UeXBlc1wiO1xuaW1wb3J0IHsgaW1wb3J0TW9kdWxlIH0gZnJvbSBcIkAvdXRpbHMvTW9kdWxlXCI7XG5cbmV4cG9ydCBjbGFzcyBSdW5TY3JpcHRDb250ZXh0IHtcbiAgX25vZGVFeGVjdXRhYmxlO1xuICBfY3VycmVudFNjcmlwdDtcbiAgX3NjcmlwdERpcjtcbiAgX3Jvb3REaXI7XG4gIF93b3JrRGlyO1xuICBfZW52O1xuICBfdXNlckNvbmZpZztcblxuICBjb25zdHJ1Y3RvcihvcHRpb25zOiBhbnkpIHtcbiAgICB0aGlzLl9ub2RlRXhlY3V0YWJsZSA9IG9wdGlvbnMubm9kZUV4ZWN1dGFibGU7XG4gICAgdGhpcy5fY3VycmVudFNjcmlwdCA9IG9wdGlvbnMuY3VycmVudFNjcmlwdDtcbiAgICB0aGlzLl9zY3JpcHREaXIgPSBvcHRpb25zLnNjcmlwdERpcjtcbiAgICB0aGlzLl9yb290RGlyID0gb3B0aW9ucy5yb290RGlyO1xuICAgIHRoaXMuX3dvcmtEaXIgPSBvcHRpb25zLndvcmtEaXI7XG4gICAgdGhpcy5fZW52ID0gT2JqZWN0LnNlYWwoT2JqZWN0LmZyZWV6ZShvcHRpb25zLmVudikpO1xuXG4gICAgaWYgKG9wdGlvbnMudXNlckNvbmZpZykge1xuICAgICAgdGhpcy5fdXNlckNvbmZpZyA9IG9wdGlvbnMudXNlckNvbmZpZztcbiAgICB9XG4gIH1cblxuICBnZXQgbm9kZUV4ZWN1dGFibGUoKSB7XG4gICAgcmV0dXJuIHRoaXMuX25vZGVFeGVjdXRhYmxlO1xuICB9XG5cbiAgZ2V0IGN1cnJlbnRTY3JpcHQoKSB7XG4gICAgcmV0dXJuIHRoaXMuX2N1cnJlbnRTY3JpcHQ7XG4gIH1cblxuICBnZXQgc2NyaXB0RGlyKCkge1xuICAgIHJldHVybiB0aGlzLl9zY3JpcHREaXI7XG4gIH1cblxuICBnZXQgcm9vdERpcigpIHtcbiAgICByZXR1cm4gdGhpcy5fcm9vdERpcjtcbiAgfVxuXG4gIGdldCB3b3JrRGlyKCkge1xuICAgIHJldHVybiB0aGlzLl93b3JrRGlyO1xuICB9XG5cbiAgZ2V0IGVudigpIHtcbiAgICByZXR1cm4gdGhpcy5fZW52O1xuICB9XG5cbiAgZ2V0UHJlc2V0UGF0aChwcmVzZXQ6IHN0cmluZykge1xuICAgIHJldHVybiBwYXRoLnJlc29sdmUodGhpcy5fc2NyaXB0RGlyLCBgcHJlc2V0LyR7cHJlc2V0fS5tanNgKTtcbiAgfVxuXG4gIGdldCB1c2VyQ29uZmlnUGF0aCgpIHtcbiAgICByZXR1cm4gcGF0aC5yZXNvbHZlKHRoaXMuX3dvcmtEaXIsIFVTRVJfQ09ORklHKTtcbiAgfVxuXG4gIGdldCBidWlsZFR5cGUoKSB7XG4gICAgcmV0dXJuIHRoaXMuX2Vudi5idWlsZFR5cGUgPT0gREVCVUdfQlVJTERfVFlQRSA/IHRoaXMuX2Vudi5idWlsZFR5cGUgOiBSRUxFQVNFX0JVSUxEX1RZUEU7XG4gIH1cblxuICBhc3luYyBnZXRVc2VyQ29uZmlnKCkge1xuICAgIGlmICghdGhpcy5fdXNlckNvbmZpZykge1xuICAgICAgbGV0IGNvbmZpZ1BhdGg7XG4gICAgICBpZiAodGhpcy5fZW52LmNvbmZpZykge1xuICAgICAgICBjb25maWdQYXRoID0gcGF0aC5pc0Fic29sdXRlKHRoaXMuX2Vudi5jb25maWcpID8gdGhpcy5fZW52LmNvbmZpZyA6IHBhdGgucmVzb2x2ZSh0aGlzLl93b3JrRGlyLCB0aGlzLl9lbnYuY29uZmlnKTtcbiAgICAgICAgaWYgKCFhd2FpdCBmaWxlRXhpc3RzKGNvbmZpZ1BhdGgpKVxuICAgICAgICAgIHRocm93IGBDb25maWd1cmF0aW9uICcke3RoaXMuX2Vudi5jb25maWd9JyBmaWxlIGRvZXMgbm90IGV4aXN0YDtcbiAgICAgIH1cbiAgICAgIGVsc2Uge1xuICAgICAgICBjb25zdCB1c2VyQ29uZmlnUGF0aCA9IHBhdGgucmVzb2x2ZSh0aGlzLl93b3JrRGlyLCBVU0VSX0NPTkZJRyk7XG4gICAgICAgIGlmIChhd2FpdCBmaWxlRXhpc3RzKHVzZXJDb25maWdQYXRoKSlcbiAgICAgICAgICBjb25maWdQYXRoID0gdXNlckNvbmZpZ1BhdGg7XG4gICAgICAgIGVsc2VcbiAgICAgICAgICB0aHJvdyBgQ29uZmlnIGZpbGUgJyR7VVNFUl9DT05GSUd9JyBpcyBub3QgYXZhaWxhYmxlYDtcbiAgICAgIH1cblxuICAgICAgbGV0IHVzZXJDb25maWcgPSB7fTtcblxuICAgICAgaWYgKGNvbmZpZ1BhdGgpIHtcbiAgICAgICAgY29uc3QgY29uZmlnVXJsID0gdXJsLnBhdGhUb0ZpbGVVUkwoY29uZmlnUGF0aCk7XG4gICAgICAgIGNvbnN0IGNvbmZpZ01vZHVsZSA9IGF3YWl0IGltcG9ydE1vZHVsZShjb25maWdVcmwpO1xuICAgICAgICBzd2l0Y2ggKHR5cGVvZiBjb25maWdNb2R1bGUuZGVmYXVsdCkge1xuICAgICAgICBjYXNlIFwiZnVuY3Rpb25cIjpcbiAgICAgICAgICB1c2VyQ29uZmlnID0gY29uZmlnTW9kdWxlLmRlZmF1bHQodGhpcy5fZW52LCB7fSk7XG4gICAgICAgICAgaWYgKHVzZXJDb25maWcgaW5zdGFuY2VvZiBQcm9taXNlKVxuICAgICAgICAgICAgdXNlckNvbmZpZyA9IGF3YWl0IHVzZXJDb25maWc7XG4gICAgICAgICAgYnJlYWs7XG4gICAgICAgIGNhc2UgXCJvYmplY3RcIjpcbiAgICAgICAgICB1c2VyQ29uZmlnID0gY29uZmlnTW9kdWxlLmRlZmF1bHQ7XG4gICAgICAgICAgYnJlYWs7XG4gICAgICAgIGRlZmF1bHQ6XG4gICAgICAgICAgdGhyb3cgYFVua25vd24gdXNlciBjb25maWd1cmF0aW9uIHR5cGVgO1xuICAgICAgICB9XG4gICAgICB9XG5cbiAgICAgIHRoaXMuX3VzZXJDb25maWcgPSB1c2VyQ29uZmlnO1xuICAgIH1cbiAgICByZXR1cm4gdGhpcy5fdXNlckNvbmZpZztcbiAgfVxuXG4gIGdldCByZXF1ZXN0QXR0ZW1wdHMoKSB7XG4gICAgcmV0dXJuIFJFUVVFU1RfQVRURU1QVFM7XG4gIH1cbn07XG4iLCIvKlxuICogTUlUIExpY2Vuc2VcbiAqXG4gKiBDb3B5cmlnaHQgKGMpIDIwMjUgIFl1cmlpIFlha3ViaW4gKHl1cmlpLnlha3ViaW5AZ21haWwuY29tKVxuICpcbiAqIFBlcm1pc3Npb24gaXMgZ3JhbnRlZCB0byB1c2UsIGNvcHksIG1vZGlmeSwgYW5kIGRpc3RyaWJ1dGUgdGhpcyBzb2Z0d2FyZVxuICogdW5kZXIgdGhlIE1JVCBMaWNlbnNlLiBTZWUgTElDRU5TRSBmaWxlIGZvciBkZXRhaWxzLlxuICovXG5cbmV4cG9ydCBlbnVtIEJvb2xlYW5UeXBlIHtcbiAgT04gPSBcIk9OXCIsXG4gIE9GRiA9IFwiT0ZGXCIsXG59O1xuXG4vLyBFbnVtIHJlcHJlc2VudGluZyB2YWx1ZSB0eXBlcyB1c2VkIGluIENNYWtlIGNhY2hlIHZhcmlhYmxlc1xuZXhwb3J0IGVudW0gVmFsdWVUeXBlIHtcbiAgLy8gUmVwcmVzZW50cyBhIGZ1bGwgcGF0aCB0byBhIGZpbGVcbiAgRklMRVBBVEggPSBcIkZJTEVQQVRIXCIsXG5cbiAgLy8gUmVwcmVzZW50cyBhIHBhdGggdG8gYSBkaXJlY3RvcnlcbiAgUEFUSCA9IFwiUEFUSFwiLFxuXG4gIC8vIFJlcHJlc2VudHMgYSBib29sZWFuIHZhbHVlICh0cnVlL2ZhbHNlKVxuICBCT09MID0gXCJCT09MXCIsXG5cbiAgLy8gUmVwcmVzZW50cyBhIGdlbmVyaWMgc3RyaW5nIHZhbHVlXG4gIFNUUklORyA9IFwiU1RSSU5HXCIsXG59O1xuXG4vLyBCdWlsZFR5cGUgcmVwcmVzZW50aW5nIGNvbW1vbiBDTWFrZSBidWlsZCB0eXBlc1xuZXhwb3J0IGVudW0gQnVpbGRUeXBlIHtcbiAgLy8gRGVidWcgYnVpbGQgdHlwZTogaW5jbHVkZXMgZGVidWcgc3ltYm9scywgbm8gb3B0aW1pemF0aW9uXG4gIERlYnVnID0gXCJEZWJ1Z1wiLFxuXG4gIC8vIFJlbGVhc2UgYnVpbGQgdHlwZTogb3B0aW1pemVkIGNvZGUsIG5vIGRlYnVnIGluZm9cbiAgUmVsZWFzZSA9IFwiUmVsZWFzZVwiLFxuXG4gIC8vIFJlbGVhc2Ugd2l0aCBkZWJ1ZyBpbmZvOiBvcHRpbWl6ZWQgd2l0aCBkZWJ1ZyBzeW1ib2xzIGluY2x1ZGVkXG4gIFJlbFdpdGhEZWJJbmZvID0gXCJSZWxXaXRoRGViSW5mb1wiLFxuXG4gIC8vIE1pbmltdW0gc2l6ZSByZWxlYXNlOiBvcHRpbWl6ZWQgZm9yIHNtYWxsZXN0IGJpbmFyeSBzaXplXG4gIE1pblNpemVSZWwgPSBcIk1pblNpemVSZWxcIixcbn07XG5cbi8vIFRoZSBkZWZhdWx0IG5hbWUgb2YgdGhlIG1haW4gQ01ha2UgYnVpbGQgY29uZmlndXJhdGlvbiBmaWxlXG5leHBvcnQgY29uc3QgQ01BS0VfTElTVFNfVFhUID0gXCJDTWFrZUxpc3RzLnR4dFwiO1xuIiwiLypcbiAqIE1JVCBMaWNlbnNlXG4gKlxuICogQ29weXJpZ2h0IChjKSAyMDI1ICBZdXJpaSBZYWt1YmluICh5dXJpaS55YWt1YmluQGdtYWlsLmNvbSlcbiAqXG4gKiBQZXJtaXNzaW9uIGlzIGdyYW50ZWQgdG8gdXNlLCBjb3B5LCBtb2RpZnksIGFuZCBkaXN0cmlidXRlIHRoaXMgc29mdHdhcmVcbiAqIHVuZGVyIHRoZSBNSVQgTGljZW5zZS4gU2VlIExJQ0VOU0UgZmlsZSBmb3IgZGV0YWlscy5cbiAqL1xuXG5pbXBvcnQgeyBCb29sZWFuVHlwZSB9IGZyb20gXCJAL2NtYWtlL0NvbnN0YW50c1wiO1xuXG5leHBvcnQgZnVuY3Rpb24gY29udmVydFRvVmFsdWUob2JqOiBhbnkpOiBzdHJpbmcge1xuICBpZiAoQXJyYXkuaXNBcnJheShvYmopKVxuICAgIHJldHVybiBvYmoubWFwKGkgPT4gY29udmVydFRvVmFsdWUoaSkpLmpvaW4oXCI7XCIpO1xuXG4gIGlmICh0eXBlb2Ygb2JqID09PSBcImJvb2xlYW5cIilcbiAgICByZXR1cm4gb2JqID8gQm9vbGVhblR5cGUuT04gOiBCb29sZWFuVHlwZS5PRkY7XG5cbiAgcmV0dXJuIG9iai50b1N0cmluZygpO1xufVxuIiwiLypcbiAqIE1JVCBMaWNlbnNlXG4gKlxuICogQ29weXJpZ2h0IChjKSAyMDI1ICBZdXJpaSBZYWt1YmluICh5dXJpaS55YWt1YmluQGdtYWlsLmNvbSlcbiAqXG4gKiBQZXJtaXNzaW9uIGlzIGdyYW50ZWQgdG8gdXNlLCBjb3B5LCBtb2RpZnksIGFuZCBkaXN0cmlidXRlIHRoaXMgc29mdHdhcmVcbiAqIHVuZGVyIHRoZSBNSVQgTGljZW5zZS4gU2VlIExJQ0VOU0UgZmlsZSBmb3IgZGV0YWlscy5cbiAqL1xuXG5pbXBvcnQgb3MgZnJvbSBcIm5vZGU6b3NcIjtcbmltcG9ydCBmcyBmcm9tIFwibm9kZTpmc1wiO1xuaW1wb3J0IHBhdGggZnJvbSBcIm5vZGU6cGF0aFwiO1xuXG5pbXBvcnQgeyBzcGF3bkFzeW5jIH0gZnJvbSBcIkAvdXRpbHMvQ2hpbGRQcm9jZXNzXCI7XG5pbXBvcnQgeyBDTUFLRV9MSVNUU19UWFQsIFZhbHVlVHlwZSB9IGZyb20gXCJAL2NtYWtlL0NvbnN0YW50c1wiO1xuaW1wb3J0IHsgY29udmVydFRvVmFsdWUgfSBmcm9tIFwiQC9jbWFrZS9IZWxwZXJcIjtcblxuZnVuY3Rpb24gdG9WYXJUeXBlKGtleTogc3RyaW5nLCB2YWw6IGFueSkge1xuICBjb25zdCBtYXA6IGFueSA9IHtcbiAgICBDTUFLRV9JTlNUQUxMX1BSRUZJWDogVmFsdWVUeXBlLlBBVEgsXG4gICAgQ01BS0VfVE9PTENIQUlOX0ZJTEU6IFZhbHVlVHlwZS5GSUxFUEFUSCxcbiAgfTtcblxuICBpZiAodHlwZW9mIHZhbCA9PT0gXCJib29sZWFuXCIpXG4gICAgcmV0dXJuIFZhbHVlVHlwZS5CT09MO1xuXG4gIGlmIChtYXAuaGFzT3duUHJvcGVydHkoa2V5KSlcbiAgICByZXR1cm4gbWFwW2tleV07XG5cbiAgcmV0dXJuIFZhbHVlVHlwZS5TVFJJTkc7XG59XG5cbmZ1bmN0aW9uIHRvQ2FjaGVFbnRyeShuYW1lOiBzdHJpbmcsIHZhbDogYW55KSB7XG4gIGNvbnN0IHR5cGUgPSB0b1ZhclR5cGUobmFtZSwgdmFsKTtcbiAgY29uc3QgdmFsdWUgPSBjb252ZXJ0VG9WYWx1ZSh2YWwpO1xuICByZXR1cm4gYCR7bmFtZX06JHt0eXBlfT0ke3ZhbHVlfWA7XG59XG5cbmV4cG9ydCBhc3luYyBmdW5jdGlvbiBjb25maWd1cmUoYXJnczogYW55KSB7XG4gIGNvbnN0IHNwYXduQXJncyA9IFsgJy1HJywgYXJncy5nZW5lcmF0b3IgXTtcbiAgZm9yIChjb25zdCBba2V5LCB2YWxdIG9mIE9iamVjdC5lbnRyaWVzKGFyZ3MuY2FjaGVWYXJpYWJsZXMpKVxuICAgIHNwYXduQXJncy5wdXNoKCctRCcsIHRvQ2FjaGVFbnRyeShrZXksIHZhbCkpO1xuICBzcGF3bkFyZ3MucHVzaCgnLVMnLCBhcmdzLnNvdXJjZURpcik7XG4gIHNwYXduQXJncy5wdXNoKCctQicsIGFyZ3MuYmluYXJ5RGlyKTtcblxuICBjb25zdCByZXM6IGFueSA9IGF3YWl0IHNwYXduQXN5bmMoXCJjbWFrZVwiLCBzcGF3bkFyZ3MsIHtcbiAgICBjd2Q6IGFyZ3MuYmluYXJ5RGlyLFxuICAgIGVudjogYXJncy5lbnZpcm9ubWVudCB8fCBwcm9jZXNzLmVudixcbiAgICBleHRyYToge1xuICAgICAgb3V0cHV0OiBgY21ha2UuY29uZmlndXJlLmxvZ2AsXG4gICAgfSxcbiAgfSk7XG4gIGlmIChyZXMuc3RhdHVzICE9PSAwKSB7XG4gICAgdGhyb3cgYENNYWtlLmNvbmZpZ3VyZSByZXR1cm5lZCBzdGF0dXMgJHtyZXMuc3RhdHVzfWA7XG4gIH1cbn1cblxuZXhwb3J0IGFzeW5jIGZ1bmN0aW9uIGJ1aWxkKGFyZ3M6IGFueSkge1xuICBhd2FpdCBjb25maWd1cmUoYXJncyk7XG5cbiAgY29uc3Qgc3Bhd25BcmdzOiBzdHJpbmdbXSA9IFtcbiAgICAnLS1idWlsZCcsICcuJyxcbiAgICAnLS1wYXJhbGxlbCcsIG9zLmF2YWlsYWJsZVBhcmFsbGVsaXNtKCkudG9TdHJpbmcoKSxcbiAgXTtcbiAgY29uc3QgcmVzOiBhbnkgPSBhd2FpdCBzcGF3bkFzeW5jKFwiY21ha2VcIiwgc3Bhd25BcmdzLCB7XG4gICAgY3dkOiBhcmdzLmJpbmFyeURpcixcbiAgICBlbnY6IGFyZ3MuZW52aXJvbm1lbnQgfHwgcHJvY2Vzcy5lbnYsXG4gICAgZXh0cmE6IHtcbiAgICAgIG91dHB1dDogYGNtYWtlLmJ1aWxkLmxvZ2AsXG4gICAgfSxcbiAgfSk7XG4gIGlmIChyZXMuc3RhdHVzICE9PSAwKSB7XG4gICAgdGhyb3cgYENNYWtlLmJ1aWxkIHJldHVybmVkIHN0YXR1cyAke3Jlcy5zdGF0dXN9YDtcbiAgfVxufVxuXG5leHBvcnQgYXN5bmMgZnVuY3Rpb24gaW5zdGFsbChhcmdzOiBhbnkpIHtcbiAgYXdhaXQgY29uZmlndXJlKGFyZ3MpO1xuXG4gIGNvbnN0IHNwYXduQXJncyA9IFtcbiAgICAnLS1pbnN0YWxsJyxcbiAgICAnLicsXG4gIF07XG4gIGlmIChhcmdzLmluc3RhbGxEaXIpIHtcbiAgICBzcGF3bkFyZ3MucHVzaCgnLS1wcmVmaXgnLCBhcmdzLmluc3RhbGxEaXIpO1xuICB9XG4gIGNvbnN0IHJlczogYW55ID0gYXdhaXQgc3Bhd25Bc3luYyhcImNtYWtlXCIsIHNwYXduQXJncywge1xuICAgIGN3ZDogYXJncy5iaW5hcnlEaXIsXG4gICAgZW52OiBhcmdzLmVudmlyb25tZW50IHx8IHByb2Nlc3MuZW52LFxuICAgIGV4dHJhOiB7XG4gICAgICBvdXRwdXQ6IGBjbWFrZS5pbnN0YWxsLmxvZ2AsXG4gICAgfSxcbiAgfSk7XG4gIGlmIChyZXMuc3RhdHVzICE9PSAwKSB7XG4gICAgdGhyb3cgYENNYWtlLmluc3RhbGwgcmV0dXJuZWQgc3RhdHVzICR7cmVzLnN0YXR1c31gO1xuICB9XG59XG5cbmV4cG9ydCBhc3luYyBmdW5jdGlvbiBjdGVzdChhcmdzOiBhbnkpIHtcbiAgYXdhaXQgYnVpbGQoYXJncyk7XG5cbiAgY29uc3Qgc3Bhd25BcmdzOiBzdHJpbmdbXSA9IFtdO1xuICBjb25zdCByZXM6IGFueSA9IGF3YWl0IHNwYXduQXN5bmMoXCJjdGVzdFwiLCBzcGF3bkFyZ3MsIHtcbiAgICBjd2Q6IGFyZ3MuYmluYXJ5RGlyLFxuICAgIGVudjogYXJncy5lbnZpcm9ubWVudCB8fCBwcm9jZXNzLmVudixcbiAgICBleHRyYToge1xuICAgICAgb3V0cHV0OiBgY21ha2UuY3Rlc3QubG9nYCxcbiAgICB9LFxuICB9KTtcbiAgaWYgKHJlcy5zdGF0dXMgIT09IDApIHtcbiAgICB0aHJvdyBgQ1Rlc3QgcmV0dXJuZWQgc3RhdHVzICR7cmVzLnN0YXR1c31gO1xuICB9XG59XG5cbmV4cG9ydCBhc3luYyBmdW5jdGlvbiBleHRyYWN0KGFyZ3M6IGFueSkge1xuICBjb25zdCBzcGF3bkFyZ3MgPSBbIFwiLUVcIiwgXCJ0YXJcIiwgXCIteHZmXCIsIGFyZ3MuZmlsZW5hbWUgXTtcbiAgY29uc3QgcmVzOiBhbnkgPSBhd2FpdCBzcGF3bkFzeW5jKFwiY21ha2VcIiwgc3Bhd25BcmdzLCB7XG4gICAgY3dkOiBhcmdzLndvcmtEaXIgfHwgYXJncy5zb3VyY2VEaXIgfHwgYXJncy5iaW5hcnlEaXIsXG4gICAgZW52OiBhcmdzLmVudmlyb25tZW50IHx8IHByb2Nlc3MuZW52LFxuICAgIGV4dHJhOiB7XG4gICAgICBvdXRwdXQ6IGFyZ3MubG9nRmlsZSB8fCBgY21ha2UuZXh0cmFjdC5sb2dgLFxuICAgIH0sXG4gIH0pO1xuICBpZiAocmVzLnN0YXR1cyAhPT0gMCkge1xuICAgIHRocm93IGBFeHRyYWN0IHJldHVybmVkIHN0YXR1cyAke3Jlcy5zdGF0dXN9YDtcbiAgfVxufVxuXG5leHBvcnQgYXN5bmMgZnVuY3Rpb24gZ2V0UHJvamVjdEluZm8oc291cmNlOiBzdHJpbmcpIHtcbiAgY29uc3Qgc3RhdCA9IGF3YWl0IGZzLnByb21pc2VzLnN0YXQoc291cmNlKTtcbiAgaWYgKHN0YXQuaXNEaXJlY3RvcnkoKSlcbiAgICBzb3VyY2UgPSBwYXRoLnJlc29sdmUoc291cmNlLCBDTUFLRV9MSVNUU19UWFQpO1xuICBjb25zdCBjb250ZW50ID0gYXdhaXQgZnMucHJvbWlzZXMucmVhZEZpbGUoc291cmNlLCB7IGVuY29kaW5nOiAndXRmOCcgfSk7XG5cbiAgY29uc3QgcHJvamVjdFBhdHRlcm4gPSAvcHJvamVjdCAqXFwoICooW14gXSspICooW14pXSopXFwpLztcbiAgY29uc3QgdmVyc2lvblBhdHRlcm4gPSAvVkVSU0lPTiArKFteIF0rKS87XG5cbiAgY29uc3QgcmVzdWx0OiBhbnkgPSB7fTtcbiAgbGV0IG1hdGNoID0gY29udGVudC5tYXRjaChwcm9qZWN0UGF0dGVybik7XG4gIGlmIChtYXRjaCkge1xuICAgIHJlc3VsdC5uYW1lID0gbWF0Y2hbMV07XG4gICAgY29uc3QgcHJvamVjdENvbnRlbnQgPSBtYXRjaFsyXTtcbiAgICBtYXRjaCA9IHByb2plY3RDb250ZW50Lm1hdGNoKHZlcnNpb25QYXR0ZXJuKTtcbiAgICBpZiAobWF0Y2gpXG4gICAgICByZXN1bHQudmVyc2lvbiA9IG1hdGNoWzFdO1xuICB9XG5cbiAgcmV0dXJuIHJlc3VsdDtcbn1cblxuZXhwb3J0IGZ1bmN0aW9uIGxpbmVUb1NpbmdsQ29tbWVudChsaW5lOiBzdHJpbmcpIHtcbiAgcmV0dXJuIFwiIyBcIiArIGxpbmU7XG59XG5cbmV4cG9ydCBmdW5jdGlvbiBsaW5lVG9NdWx0aXBsZUNvbW1lbnQobGluZTogc3RyaW5nKSB7XG4gIHJldHVybiBgI1s9PT1bICR7bGluZX0gXT09PV1gO1xufVxuXG5leHBvcnQgZnVuY3Rpb24gZ2VuZXJhdGVkU2NyaXB0TmFtZUNvbW1lbnQoZmlsZW5hbWU6IHN0cmluZykge1xuICByZXR1cm4gbGluZVRvU2luZ2xDb21tZW50KFwiR2VuZXJhdGVkIGZyb20gXCIgKyBwYXRoLmJhc2VuYW1lKGZpbGVuYW1lKSk7XG59XG4iLCIvKlxuICogTUlUIExpY2Vuc2VcbiAqXG4gKiBDb3B5cmlnaHQgKGMpIDIwMjUgIFl1cmlpIFlha3ViaW4gKHl1cmlpLnlha3ViaW5AZ21haWwuY29tKVxuICpcbiAqIFBlcm1pc3Npb24gaXMgZ3JhbnRlZCB0byB1c2UsIGNvcHksIG1vZGlmeSwgYW5kIGRpc3RyaWJ1dGUgdGhpcyBzb2Z0d2FyZVxuICogdW5kZXIgdGhlIE1JVCBMaWNlbnNlLiBTZWUgTElDRU5TRSBmaWxlIGZvciBkZXRhaWxzLlxuICovXG5cbmltcG9ydCBmcyBmcm9tIFwibm9kZTpmc1wiO1xuaW1wb3J0IHBhdGggZnJvbSBcIm5vZGU6cGF0aFwiO1xuXG5leHBvcnQgZGVmYXVsdCBmdW5jdGlvbihwYXJhbXM6IGFueSkge1xuICBjb25zdCBjb250ZW50ID0gZnMucmVhZEZpbGVTeW5jKHBhcmFtcy5pbnB1dCwgXCJ1dGYtOFwiKTtcbiAgY29uc3QgbmV3Q29udGVudCA9IGNvbnRlbnQucmVwbGFjZSgvQChbX0EtWmEtel1bX0EtWmEtejAtOV0rKUAvZywgKG1hdGNoLCB2YWx1ZSkgPT4ge1xuICAgIGNvbnN0IHJlcyA9IHBhcmFtc1t2YWx1ZV0gfHwgXCJcIjtcbiAgICBpZiAoQXJyYXkuaXNBcnJheShyZXMpKVxuICAgICAgcmV0dXJuIHJlcy5qb2luKFwiXFxuXCIpO1xuICAgIHJldHVybiByZXMudG9TdHJpbmcoKTtcbiAgfSk7XG4gIGZzLm1rZGlyU3luYyhwYXRoLmRpcm5hbWUocGFyYW1zLm91dHB1dCksIHsgcmVjdXJzaXZlOiB0cnVlIH0pO1xuICBmcy53cml0ZUZpbGVTeW5jKHBhcmFtcy5vdXRwdXQsIG5ld0NvbnRlbnQsIFwidXRmLThcIik7XG59XG4iLCIvKlxuICogTUlUIExpY2Vuc2VcbiAqXG4gKiBDb3B5cmlnaHQgKGMpIDIwMjUgIFl1cmlpIFlha3ViaW4gKHl1cmlpLnlha3ViaW5AZ21haWwuY29tKVxuICpcbiAqIFBlcm1pc3Npb24gaXMgZ3JhbnRlZCB0byB1c2UsIGNvcHksIG1vZGlmeSwgYW5kIGRpc3RyaWJ1dGUgdGhpcyBzb2Z0d2FyZVxuICogdW5kZXIgdGhlIE1JVCBMaWNlbnNlLiBTZWUgTElDRU5TRSBmaWxlIGZvciBkZXRhaWxzLlxuICovXG5cbmltcG9ydCBmcyBmcm9tIFwibm9kZTpmc1wiO1xuaW1wb3J0IHBhdGggZnJvbSBcIm5vZGU6cGF0aFwiO1xuXG5leHBvcnQgZGVmYXVsdCBmdW5jdGlvbihwYXJhbXM6IGFueSkge1xuICBjb25zb2xlLmxvZyhcIkluc3RhbGxpbmc6IFwiICsgcGFyYW1zLmRlc3QpO1xuICBmcy5ta2RpclN5bmMocGF0aC5kaXJuYW1lKHBhcmFtcy5kZXN0KSwgeyByZWN1cnNpdmU6IHRydWUgfSk7XG4gIGZzLmNwU3luYyhwYXJhbXMuc3JjLCBwYXJhbXMuZGVzdCwgeyBmb3JjZTogdHJ1ZSB9KTtcbn1cbiIsIi8qXG4gKiBNSVQgTGljZW5zZVxuICpcbiAqIENvcHlyaWdodCAoYykgMjAyNSAgWXVyaWkgWWFrdWJpbiAoeXVyaWkueWFrdWJpbkBnbWFpbC5jb20pXG4gKlxuICogUGVybWlzc2lvbiBpcyBncmFudGVkIHRvIHVzZSwgY29weSwgbW9kaWZ5LCBhbmQgZGlzdHJpYnV0ZSB0aGlzIHNvZnR3YXJlXG4gKiB1bmRlciB0aGUgTUlUIExpY2Vuc2UuIFNlZSBMSUNFTlNFIGZpbGUgZm9yIGRldGFpbHMuXG4gKi9cblxuaW1wb3J0IHsgZW5zdXJlU3RyaW5nIH0gZnJvbSBcIkAvdXRpbHMvU3RyaWN0VHlwZVwiO1xuaW1wb3J0IHsgQWJzb2x1dGVQYXRoIH0gZnJvbSBcIkAvY29yZS9QYXRoXCI7XG5pbXBvcnQgeyBTY29wZUhlbHBlciB9IGZyb20gXCJAL2NvcmUvU2NvcGVcIjtcbmltcG9ydCB7IFN5c3RlbVNjb3BlIH0gZnJvbSBcIkAvY29yZS9TeXN0ZW1TY29wZVwiO1xuXG5jb25zdCBUQVJHRVRfU0NPUEUgPSBTeW1ib2woXCJUQVJHRVRfU0NPUEVcIik7XG5jb25zdCBOQU1FICAgICAgICAgPSBTeW1ib2woXCJOQU1FXCIpO1xuY29uc3QgU0NSSVBUICAgICAgID0gU3ltYm9sKFwiU0NSSVBUXCIpO1xuY29uc3QgSU5QVVQgICAgICAgID0gU3ltYm9sKFwiSU5QVVRcIik7XG5jb25zdCBPVVRQVVQgICAgICAgPSBTeW1ib2woXCJPVVRQVVRcIik7XG5jb25zdCBQQVJBTVMgICAgICAgPSBTeW1ib2woXCJQQVJBTVNcIik7XG5jb25zdCBQUk9QRVJUSUVTICAgPSBTeW1ib2woXCJQUk9QRVJUSUVTXCIpO1xuXG5leHBvcnQgY2xhc3MgQ3VzdG9tU2NyaXB0IHtcbiAgcHJpdmF0ZSBbVEFSR0VUX1NDT1BFXTogU3lzdGVtU2NvcGU7XG4gIHByaXZhdGUgW05BTUVdOiBzdHJpbmc7XG4gIHByaXZhdGUgW1NDUklQVF06IEFic29sdXRlUGF0aCB8IEZ1bmN0aW9uO1xuICBwcml2YXRlIFtJTlBVVF06IEFic29sdXRlUGF0aCB8IG51bGw7XG4gIHByaXZhdGUgW09VVFBVVF06IEFic29sdXRlUGF0aDtcbiAgcHJpdmF0ZSBbUEFSQU1TXTogb2JqZWN0O1xuICBwcml2YXRlIFtQUk9QRVJUSUVTXTogYW55O1xuXG4gIHByaXZhdGUgY29uc3RydWN0b3Ioc2NvcGU6IFN5c3RlbVNjb3BlLCBuYW1lOiBzdHJpbmcsIHNjcmlwdDogQWJzb2x1dGVQYXRoIHwgRnVuY3Rpb24sIG91dHB1dDogQWJzb2x1dGVQYXRoLCBwYXJhbXM6IGFueSkge1xuICAgIHRoaXNbVEFSR0VUX1NDT1BFXSA9IFNjb3BlSGVscGVyLmNsb25lKHt9LCBzY29wZSk7XG4gICAgdGhpc1tOQU1FXSA9IGVuc3VyZVN0cmluZyhuYW1lKTtcbiAgICB0aGlzW0lOUFVUXSA9IHBhcmFtcy5pbnB1dCB8fCBudWxsO1xuICAgIHRoaXNbU0NSSVBUXSA9IHNjcmlwdDtcbiAgICB0aGlzW09VVFBVVF0gPSBvdXRwdXQ7XG4gICAgdGhpc1tQQVJBTVNdID0gcGFyYW1zO1xuICAgIHRoaXNbUFJPUEVSVElFU10gPSB7fTtcbiAgfVxuXG4gIHB1YmxpYyBzdGF0aWMgY3JlYXRlKHNjb3BlOiBTeXN0ZW1TY29wZSwgbmFtZTogc3RyaW5nLCBzY3JpcHQ6IEFic29sdXRlUGF0aCB8IEZ1bmN0aW9uLCBvdXRwdXQ6IEFic29sdXRlUGF0aCwgcGFyYW1zOiBhbnkpOiBDdXN0b21TY3JpcHQge1xuICAgIHJldHVybiBPYmplY3Quc2VhbChuZXcgQ3VzdG9tU2NyaXB0KHNjb3BlLCBuYW1lLCBzY3JpcHQsIG91dHB1dCwgcGFyYW1zKSk7XG4gIH1cblxuICBwdWJsaWMgYWRkUHJvcGVydHkoa2V5OiBzdHJpbmcsIC4uLnZhbHM6IGFueVtdKSB7XG4gICAgbGV0IHByb3BlcnR5ID0gdGhpc1tQUk9QRVJUSUVTXVtrZXldO1xuICAgIGlmICghcHJvcGVydHkpIHtcbiAgICAgIHByb3BlcnR5ID0gW107XG4gICAgICB0aGlzW1BST1BFUlRJRVNdW2tleV0gPSBwcm9wZXJ0eTtcbiAgICB9XG4gICAgdmFscy5mb3JFYWNoKHYgPT4gcHJvcGVydHkucHVzaCh2KSk7XG4gIH1cblxuICBwdWJsaWMgZ2V0IE5BTUUoKTogc3RyaW5nIHtcbiAgICByZXR1cm4gdGhpc1tOQU1FXTtcbiAgfVxuXG4gIHB1YmxpYyBnZXQgVEFSR0VUX1NDT1BFKCk6IFN5c3RlbVNjb3BlIHtcbiAgICByZXR1cm4gdGhpc1tUQVJHRVRfU0NPUEVdO1xuICB9XG5cbiAgcHVibGljIGdldCBTQ1JJUFQoKSB7XG4gICAgcmV0dXJuIHRoaXNbU0NSSVBUXTtcbiAgfVxuXG4gIHB1YmxpYyBnZXQgSU5QVVQoKTogQWJzb2x1dGVQYXRoIHwgbnVsbCB7XG4gICAgcmV0dXJuIHRoaXNbSU5QVVRdO1xuICB9XG5cbiAgcHVibGljIHNldCBJTlBVVCh2YWx1ZTogQWJzb2x1dGVQYXRoIHwgc3RyaW5nKSB7XG4gICAgdGhpc1tJTlBVVF0gPSB0aGlzW1RBUkdFVF9TQ09QRV0uU09VUkNFX0RJUi5yZXNvbHZlKHZhbHVlKTtcbiAgfVxuXG4gIHB1YmxpYyBnZXQgT1VUUFVUKCk6IEFic29sdXRlUGF0aCB7XG4gICAgcmV0dXJuIHRoaXNbT1VUUFVUXTtcbiAgfVxuXG4gIHB1YmxpYyBzZXQgT1VUUFVUKHZhbHVlOiBBYnNvbHV0ZVBhdGggfCBzdHJpbmcpIHtcbiAgICB0aGlzW09VVFBVVF0gPSBBYnNvbHV0ZVBhdGguY3JlYXRlKHZhbHVlKTtcbiAgfVxuXG4gIHB1YmxpYyBnZXQgUEFSQU1TKCk6IG9iamVjdCB7XG4gICAgcmV0dXJuIHRoaXNbUEFSQU1TXTtcbiAgfVxuXG4gIHB1YmxpYyBzZXQgUEFSQU1TKHZhbHVlOiBvYmplY3QpIHtcbiAgICB0aGlzW1BBUkFNU10gPSB2YWx1ZTtcbiAgfVxuXG4gIHB1YmxpYyBnZXQgUFJPUEVSVElFUygpIHtcbiAgICByZXR1cm4gdGhpc1tQUk9QRVJUSUVTXTtcbiAgfVxuXG4gIHB1YmxpYyB0b1N0cmluZygpOiBzdHJpbmcge1xuICAgIHJldHVybiB0aGlzW05BTUVdLnRvU3RyaW5nKCk7XG4gIH1cblxuICBwdWJsaWMgdG9KU09OKCk6IG9iamVjdCB7XG4gICAgcmV0dXJuIHtcbiAgICAgIE5BTUU6IHRoaXMuTkFNRSxcbiAgICAgIFRBUkdFVF9TQ09QRTogdGhpcy5UQVJHRVRfU0NPUEUsXG4gICAgICBTQ1JJUFQ6IHRoaXMuU0NSSVBULFxuICAgICAgSU5QVVQ6IHRoaXMuSU5QVVQsXG4gICAgICBPVVRQVVQ6IHRoaXMuT1VUUFVULFxuICAgICAgUEFSQU1TOiB0aGlzLlBBUkFNUyxcbiAgICAgIFBST1BFUlRJRVM6IHRoaXMuUFJPUEVSVElFUyxcbiAgICB9XG4gIH1cbn07XG4iLCIvKlxuICogTUlUIExpY2Vuc2VcbiAqXG4gKiBDb3B5cmlnaHQgKGMpIDIwMjUgIFl1cmlpIFlha3ViaW4gKHl1cmlpLnlha3ViaW5AZ21haWwuY29tKVxuICpcbiAqIFBlcm1pc3Npb24gaXMgZ3JhbnRlZCB0byB1c2UsIGNvcHksIG1vZGlmeSwgYW5kIGRpc3RyaWJ1dGUgdGhpcyBzb2Z0d2FyZVxuICogdW5kZXIgdGhlIE1JVCBMaWNlbnNlLiBTZWUgTElDRU5TRSBmaWxlIGZvciBkZXRhaWxzLlxuICovXG5cbmltcG9ydCBvcyBmcm9tIFwibm9kZTpvc1wiO1xuaW1wb3J0IHBhdGggZnJvbSBcIm5vZGU6cGF0aFwiO1xuXG5pbXBvcnQgeyBmaWxlRXhpc3RzU3luYyB9IGZyb20gXCJAL3V0aWxzL0ZpbGVTeXN0ZW1cIjtcblxuZXhwb3J0IGZ1bmN0aW9uIGZpbmRQcm9ncmFtKG5hbWU6IHN0cmluZyk6IHN0cmluZyB8IHVuZGVmaW5lZCB7XG4gIGlmIChvcy5wbGF0Zm9ybSgpID09PSBcIndpbjMyXCIgJiYgIW5hbWUuZW5kc1dpdGgoXCIuZXhlXCIpKVxuICAgIG5hbWUgKz0gXCIuZXhlXCI7XG5cbiAgY29uc3QgcGF0aHMgPSAocHJvY2Vzcy5lbnYuUEFUSCB8fCBcIlwiKS5zcGxpdChwYXRoLnBvc2l4LmRlbGltaXRlcik7XG4gIGZvciAoY29uc3QgaXRlciBvZiBwYXRocykge1xuICAgIGNvbnN0IGZpbGVuYW1lID0gcGF0aC5wb3NpeC5yZXNvbHZlKGl0ZXIsIG5hbWUpO1xuICAgIGlmIChmaWxlRXhpc3RzU3luYyhmaWxlbmFtZSkpXG4gICAgICByZXR1cm4gZmlsZW5hbWU7XG4gIH1cblxuICByZXR1cm4gdW5kZWZpbmVkO1xufVxuIiwiLypcbiAqIE1JVCBMaWNlbnNlXG4gKlxuICogQ29weXJpZ2h0IChjKSAyMDI1ICBZdXJpaSBZYWt1YmluICh5dXJpaS55YWt1YmluQGdtYWlsLmNvbSlcbiAqXG4gKiBQZXJtaXNzaW9uIGlzIGdyYW50ZWQgdG8gdXNlLCBjb3B5LCBtb2RpZnksIGFuZCBkaXN0cmlidXRlIHRoaXMgc29mdHdhcmVcbiAqIHVuZGVyIHRoZSBNSVQgTGljZW5zZS4gU2VlIExJQ0VOU0UgZmlsZSBmb3IgZGV0YWlscy5cbiAqL1xuXG5pbXBvcnQgb3MgZnJvbSBcIm5vZGU6b3NcIjtcblxuZXhwb3J0IGZ1bmN0aW9uIGdldFNpemVvZlZvaWRwKCkge1xuICBjb25zdCBzaXplb2ZWb2lkcEJpdHM6IGFueSA9XG4gIHtcbiAgICBhcm06ICAgICA0LFxuICAgIGFybTY0OiAgIDgsXG4gICAgaWEzMjogICAgNCxcbiAgICBsb29uZzY0OiA4LFxuICAgIG1pcHM6ICAgIDQsXG4gICAgbWlwc2VsOiAgNCxcbiAgICBwcGM6ICAgICA0LFxuICAgIHBwYzY0OiAgIDgsXG4gICAgcmlzY3Y2NDogOCxcbiAgICBzMzkwOiAgICA0LFxuICAgIHMzOTB4OiAgIDgsXG4gICAgeDY0OiAgICAgNCxcbiAgfTtcbiAgY29uc3QgcmVzdWx0ID0gc2l6ZW9mVm9pZHBCaXRzW29zLmFyY2goKV07XG4gIGlmICghcmVzdWx0KVxuICAgIHRocm93IG5ldyBFcnJvcihgVW5rbm93biAke29zLmFyY2goKX0gYXJjaGApO1xuICByZXR1cm4gcmVzdWx0O1xufVxuIiwiLypcbiAqIE1JVCBMaWNlbnNlXG4gKlxuICogQ29weXJpZ2h0IChjKSAyMDI1ICBZdXJpaSBZYWt1YmluICh5dXJpaS55YWt1YmluQGdtYWlsLmNvbSlcbiAqXG4gKiBQZXJtaXNzaW9uIGlzIGdyYW50ZWQgdG8gdXNlLCBjb3B5LCBtb2RpZnksIGFuZCBkaXN0cmlidXRlIHRoaXMgc29mdHdhcmVcbiAqIHVuZGVyIHRoZSBNSVQgTGljZW5zZS4gU2VlIExJQ0VOU0UgZmlsZSBmb3IgZGV0YWlscy5cbiAqL1xuXG5pbXBvcnQgZnMgZnJvbSBcIm5vZGU6ZnNcIjtcblxuaW1wb3J0IHsgQUxMX1RBUkdFVCwgSU5TVEFMTF9UQVJHRVQgfSBmcm9tIFwiQC9Db25zdGFudHNcIjtcbmltcG9ydCB7IEFic29sdXRlUGF0aCB9IGZyb20gXCJAL2NvcmUvUGF0aFwiO1xuaW1wb3J0IHsgZmlsZUV4aXN0cywgZmlsZUV4aXN0c1N5bmMgfSBmcm9tIFwiQC91dGlscy9GaWxlU3lzdGVtXCI7XG5pbXBvcnQgeyBUYXJnZXRDb2xsZWN0aW9uIH0gZnJvbSBcIkAvY29yZS8vVGFyZ2V0Q29sbGVjdGlvblwiO1xuaW1wb3J0IHsgU2NyaXB0Q29sbGVjdGlvbiB9IGZyb20gXCJAL2NvcmUvU2NyaXB0Q29sbGVjdGlvblwiO1xuaW1wb3J0IHsgSW50ZXJmYWNlVGFyZ2V0IH0gZnJvbSBcIkAvY29yZS9JbnRlcmZhY2VUYXJnZXRcIjtcbmltcG9ydCB7IFVua25vd25UYXJnZXQgfSBmcm9tIFwiQC9jb3JlL1Vua25vd25UYXJnZXRcIjtcbmltcG9ydCB7IEdvYWxDb2xsZWN0aW9uIH0gZnJvbSBcIkAvY29yZS9Hb2FsQ29sbGVjdGlvblwiO1xuaW1wb3J0IHsgSW50ZXJmYWNlT2JqZWN0cyB9IGZyb20gXCJAL2NvcmUvSW50ZXJmYWNlT2JqZWN0c1wiO1xuaW1wb3J0IHsgSW50ZXJmYWNlU2NyaXB0IH0gZnJvbSBcIkAvY29yZS9JbnRlcmZhY2VTY3JpcHRcIjtcbmltcG9ydCB7IFNvdXJjZUZpbGUgfSBmcm9tIFwiQC9jb3JlL1NvdXJjZUZpbGVcIjtcbmltcG9ydCB7IFVzZXJDb250ZXh0IH0gZnJvbSBcIkAvY29yZS9Vc2VyQ29udGV4dFwiO1xuaW1wb3J0IHsgT2JqZWN0TGlicmFyeSwgU3RhdGljTGlicmFyeSwgU2hhcmVkTGlicmFyeSwgRXhlY3V0YWJsZSB9IGZyb20gXCJAL2NvcmUvVGFyZ2V0XCI7XG5pbXBvcnQgeyBTY29wZUhlbHBlciB9IGZyb20gXCJAL2NvcmUvU2NvcGVcIjtcbmltcG9ydCB7IFN5c3RlbVNjb3BlIH0gZnJvbSBcIkAvY29yZS9TeXN0ZW1TY29wZVwiO1xuaW1wb3J0IHsgaW1wb3J0TW9kdWxlIH0gZnJvbSBcIkAvdXRpbHMvTW9kdWxlXCI7XG5pbXBvcnQgeyBjcmVhdGVMb2dnZXIgfSBmcm9tIFwiQC9sb2dnZXJcIjtcblxuaW1wb3J0IGNvbmZpZ3VyZV9maWxlIGZyb20gXCJAL2NvcmUvQnVpbGRpblNjcmlwdHMvY29uZmlndXJlX2ZpbGVcIjtcbmltcG9ydCBpbnN0YWxsX3NjcmlwdCBmcm9tIFwiQC9jb3JlL0J1aWxkaW5TY3JpcHRzL2luc3RhbGxfc2NyaXB0XCI7XG5cbmNvbnN0IGxvZ2dlciA9IGNyZWF0ZUxvZ2dlcihpbXBvcnQubWV0YS51cmwpO1xuXG5jb25zdCByZXF1aXJlSW1wbCA9IGV2YWwoXCJyZXF1aXJlXCIpO1xuXG5jb25zdCBUQVJHRVRTID0gU3ltYm9sKFwiVEFSR0VUU1wiKTtcbmNvbnN0IFNDUklQVFMgPSBTeW1ib2woXCJTQ1JJUFRTXCIpO1xuY29uc3QgQ0FDSEUgPSBTeW1ib2woXCJDQUNIRVwiKTtcbmNvbnN0IFVOS05PV05fVEFSR0VUUyA9IFN5bWJvbChcIlVOS05PV05fVEFSR0VUU1wiKTtcbmNvbnN0IElOVEVSRkFDRV9TQ1JJUFRTID0gU3ltYm9sKFwiSU5URVJGQUNFX1NDUklQVFNcIik7XG5jb25zdCBJTlNUQUxMX0xJU1QgPSBTeW1ib2woXCJJTlNUQUxMX0xJU1RcIik7XG5jb25zdCBTQ1JJUFRfVkFSSUFCTEVTX01BUCA9IFN5bWJvbChcIlNDUklQVF9WQVJJQUJMRVNfTUFQXCIpO1xuY29uc3QgU1VCRElSX0FMSUFTID0gU3ltYm9sKFwiU1VCRElSX0FMSUFTXCIpO1xuY29uc3QgU1VCRElSX0xJU1QgPSBTeW1ib2woXCJTVUJESVJfTElTVFwiKTtcbmNvbnN0IEJVSUxUSU5fU0NSSVBUUyA9IFN5bWJvbChcIkJVSUxUSU5fU0NSSVBUU1wiKTtcblxudHlwZSBVbmtub3duVGFyZ2V0cyA9IHtcbiAgW25hbWU6IHN0cmluZ106IFVua25vd25UYXJnZXQ7XG59O1xuXG50eXBlIFN1YmRpcmVjdG9yeUFsaWFzID0ge1xuICBbbmFtZTogc3RyaW5nXTogQWJzb2x1dGVQYXRoIHwgc3RyaW5nO1xufTtcblxudHlwZSBJbnRlcmZhY2VTY3JpcHRzID0ge1xuICBbbmFtZTogc3RyaW5nXTogSW50ZXJmYWNlU2NyaXB0O1xufTtcblxudHlwZSBDYWNoZVZhcmlhYmxlRGVzY3JpcHRvciA9IHtcbiAgdHlwZT86IGFueTtcbiAgdmFsdWU/OiBhbnk7XG4gIGRlc2NyaXB0aW9uPzogc3RyaW5nO1xufTtcblxudHlwZSBDYWNoZVZhcmlhYmxlRGVzY3JpcHRvcnMgPSB7XG4gIFtuYW1lOiBzdHJpbmddOiBDYWNoZVZhcmlhYmxlRGVzY3JpcHRvcjtcbn07XG5cbnR5cGUgQnVpbGRpblNjcmlwdHMgPSB7XG4gIFtuYW1lOiBzdHJpbmddOiBGdW5jdGlvbjtcbn07XG5cbmZ1bmN0aW9uIGVuc3VyZVZhbHVlQnlUeXBlKHR5cGU6IGFueSwgdmFsdWU6IGFueSkge1xuICBpZiAoQXJyYXkuaXNBcnJheSh0eXBlKSA/IHR5cGUuaW5jbHVkZXModmFsdWUpIDogdHlwZW9mIHZhbHVlID09PSB0eXBlKVxuICAgIHJldHVybiB2YWx1ZTtcbiAgdGhyb3cgbmV3IEVycm9yKGBUaGUgJyR7dmFsdWV9JyBpcyBub3QgYSAke3R5cGV9YCk7XG59XG5cbmV4cG9ydCBjbGFzcyBHbG9iYWxDb250ZXh0IHtcbiAgcHJpdmF0ZSBbVEFSR0VUU106IFRhcmdldENvbGxlY3Rpb247XG4gIHByaXZhdGUgW1NDUklQVFNdOiBTY3JpcHRDb2xsZWN0aW9uO1xuICBwcml2YXRlIFtDQUNIRV06IENhY2hlVmFyaWFibGVEZXNjcmlwdG9ycztcbiAgcHJpdmF0ZSBbVU5LTk9XTl9UQVJHRVRTXTogVW5rbm93blRhcmdldHM7XG4gIHByaXZhdGUgW0lOVEVSRkFDRV9TQ1JJUFRTXTogSW50ZXJmYWNlU2NyaXB0cztcbiAgcHJpdmF0ZSBbSU5TVEFMTF9MSVNUXTogYW55O1xuICBwcml2YXRlIFtTQ1JJUFRfVkFSSUFCTEVTX01BUF06IGFueTtcbiAgcHJpdmF0ZSBbU1VCRElSX0FMSUFTXTogU3ViZGlyZWN0b3J5QWxpYXM7XG4gIHByaXZhdGUgW1NVQkRJUl9MSVNUXTogU3lzdGVtU2NvcGVbXTtcbiAgcHJpdmF0ZSBbQlVJTFRJTl9TQ1JJUFRTXTogQnVpbGRpblNjcmlwdHM7XG5cbiAgcHJpdmF0ZSBjb25zdHJ1Y3RvcigpIHtcbiAgICB0aGlzW1RBUkdFVFNdID0gVGFyZ2V0Q29sbGVjdGlvbi5jcmVhdGUoKTtcbiAgICB0aGlzW1NDUklQVFNdID0gU2NyaXB0Q29sbGVjdGlvbi5jcmVhdGUoKTtcbiAgICB0aGlzW0NBQ0hFXSA9IHt9O1xuICAgIHRoaXNbVU5LTk9XTl9UQVJHRVRTXSA9IHt9O1xuICAgIHRoaXNbSU5URVJGQUNFX1NDUklQVFNdID0ge307XG4gICAgdGhpc1tJTlNUQUxMX0xJU1RdID0gW107XG4gICAgdGhpc1tTQ1JJUFRfVkFSSUFCTEVTX01BUF0gPSB7fTtcbiAgICB0aGlzW1NVQkRJUl9BTElBU10gPSB7fTtcbiAgICB0aGlzW1NVQkRJUl9MSVNUXSA9IFtdO1xuICAgIHRoaXNbQlVJTFRJTl9TQ1JJUFRTXSA9IHtcbiAgICAgIGNvbmZpZ3VyZV9maWxlLFxuICAgICAgaW5zdGFsbF9zY3JpcHQsXG4gICAgfTtcbiAgfVxuXG4gIHB1YmxpYyBzdGF0aWMgY3JlYXRlKCkge1xuICAgIHJldHVybiBPYmplY3Quc2VhbChuZXcgR2xvYmFsQ29udGV4dCk7XG4gIH1cblxuICBwdWJsaWMgZ2V0IFRBUkdFVFMoKSB7XG4gICAgcmV0dXJuIHRoaXNbVEFSR0VUU107XG4gIH1cblxuICBwdWJsaWMgZ2V0IFNDUklQVFMoKSB7XG4gICAgcmV0dXJuIHRoaXNbU0NSSVBUU107XG4gIH1cblxuICBwdWJsaWMgZ2V0IENBQ0hFKCkge1xuICAgIHJldHVybiB0aGlzW0NBQ0hFXTtcbiAgfVxuXG4gIHB1YmxpYyBnZXQgVU5LTk9XTl9UQVJHRVRTKCkge1xuICAgIHJldHVybiB0aGlzW1VOS05PV05fVEFSR0VUU107XG4gIH1cblxuICBwdWJsaWMgZ2V0IElOVEVSRkFDRV9TQ1JJUFRTKCkge1xuICAgIHJldHVybiB0aGlzW0lOVEVSRkFDRV9TQ1JJUFRTXTtcbiAgfVxuXG4gIHB1YmxpYyBnZXQgSU5TVEFMTF9MSVNUKCkge1xuICAgIHJldHVybiB0aGlzW0lOU1RBTExfTElTVF07XG4gIH1cblxuICBwdWJsaWMgZ2V0IFNDUklQVF9WQVJJQUJMRVNfTUFQKCkge1xuICAgIHJldHVybiB0aGlzW1NDUklQVF9WQVJJQUJMRVNfTUFQXTtcbiAgfVxuXG4gIHB1YmxpYyBnZXQgU1VCRElSX0FMSUFTKCkge1xuICAgIHJldHVybiB0aGlzW1NVQkRJUl9BTElBU107XG4gIH1cblxuICBwdWJsaWMgZ2V0VWtub3duVGFyZ2V0KG5hbWU6IHN0cmluZyk6IFVua25vd25UYXJnZXQge1xuICAgIGxldCB0YXJnZXQgPSB0aGlzW1VOS05PV05fVEFSR0VUU11bbmFtZV07XG4gICAgaWYgKCF0YXJnZXQpIHtcbiAgICAgIHRoaXNbVU5LTk9XTl9UQVJHRVRTXVtuYW1lXSA9IHRhcmdldCA9IFVua25vd25UYXJnZXQuY3JlYXRlKG5hbWUpO1xuICAgIH1cbiAgICByZXR1cm4gdGFyZ2V0O1xuICB9XG5cbiAgcHVibGljIGFkZFN5c3RlbVZhcmlhYmxlcyh2YXJpYWJsZXM6IGFueSkge1xuICAgIGNvbnN0IHNjcmlwdCA9IHZhcmlhYmxlcy5TQ1JJUFRfRklMRS50b1N0cmluZygpO1xuICAgIGlmICh0aGlzW1NDUklQVF9WQVJJQUJMRVNfTUFQXVtzY3JpcHRdKVxuICAgICAgdGhyb3cgbmV3IEVycm9yKGBTeXN0ZW1WYXJpYWJsZXMgZXhpc3RzIGZvciAke3NjcmlwdH1gKTtcbiAgICB0aGlzW1NDUklQVF9WQVJJQUJMRVNfTUFQXVtzY3JpcHRdID0gdmFyaWFibGVzO1xuICB9XG5cbiAgcHVibGljIHJlc29sdmVTdWJkaXJlY3RvcnkocGF0aDogQWJzb2x1dGVQYXRoIHwgc3RyaW5nKSB7XG4gICAgY29uc3QgcmVzb2x2ZWRQYXRoID0gdGhpc1tTVUJESVJfQUxJQVNdW3BhdGgudG9TdHJpbmcoKV07XG4gICAgcmV0dXJuIHJlc29sdmVkUGF0aCB8fCBwYXRoO1xuICB9XG5cbiAgcHVibGljIGFkZFN1YmRpcmVjdG9yeUFsaWFzKHNyYzogQWJzb2x1dGVQYXRoIHwgc3RyaW5nLCBkZXN0OiBBYnNvbHV0ZVBhdGggfCBzdHJpbmcpIHtcbiAgICB0aGlzW1NVQkRJUl9BTElBU11bc3JjLnRvU3RyaW5nKCldID0gZGVzdDtcbiAgfVxuXG4gIHB1YmxpYyBhZGRDYWNoZVZhcmlhYmxlcyh2YXJpYWJsZXM6IENhY2hlVmFyaWFibGVEZXNjcmlwdG9ycykge1xuICAgIGNvbnN0IGNhY2hlID0gdGhpc1tDQUNIRV07XG4gICAgZm9yIChjb25zdCBba2V5LCBlbnRyeV0gb2YgT2JqZWN0LmVudHJpZXModmFyaWFibGVzKSkge1xuICAgICAgY2FjaGVba2V5XSA9IGVudHJ5O1xuICAgIH1cbiAgfVxuXG4gIHB1YmxpYyBsb2FkQ2FjaGVWYXJpYWJsZXMoZmlsZW5hbWU6IEFic29sdXRlUGF0aCB8IHN0cmluZykge1xuICAgIGlmIChmaWxlRXhpc3RzU3luYyhmaWxlbmFtZS50b1N0cmluZygpKSkge1xuICAgICAgY29uc3QgdmFyaWFibGVzID0gcmVxdWlyZUltcGwoZmlsZW5hbWUudG9TdHJpbmcoKSk7XG4gICAgICB0aGlzLmFkZENhY2hlVmFyaWFibGVzKHZhcmlhYmxlcyk7XG4gICAgfVxuICB9XG5cbiAgcHVibGljIGNvcHlDYWNoZVZhcmlhYmxlcyhzY29wZTogYW55KSB7XG4gICAgZm9yIChjb25zdCBbbmFtZSwgZW50cnldIG9mIE9iamVjdC5lbnRyaWVzKHRoaXNbQ0FDSEVdKSkge1xuICAgICAgaWYgKCFPYmplY3QuaGFzT3duKHNjb3BlLCBuYW1lKSkge1xuICAgICAgICBjb25zdCB0eXBlID0gZW50cnkudHlwZSB8fCB0eXBlb2YgZW50cnkudmFsdWU7XG4gICAgICAgIGNvbnN0IGRlc2NyaXB0aW9uID0gZW50cnkuZGVzY3JpcHRpb24gfHwgXCJcIjtcbiAgICAgICAgbGV0IHZhbHVlID0gQXJyYXkuaXNBcnJheShlbnRyeS52YWx1ZSkgPyBbIC4uLmVudHJ5LnZhbHVlIF0gOiBlbnRyeS52YWx1ZTtcbiAgICAgICAgaWYgKHZhbHVlID09PSBcIiR7UFJPSkVDVF9WRVJTSU9OfVwiKVxuICAgICAgICAgIHZhbHVlID0gc2NvcGUuUFJPSkVDVF9WRVJTSU9OO1xuICAgICAgICBlbHNlIGlmICh2YWx1ZSA9PT0gXCIke1BST0pFQ1RfREVTQ1JJUFRJT059XCIpXG4gICAgICAgICAgdmFsdWUgPSBzY29wZS5QUk9KRUNUX0RFU0NSSVBUSU9OO1xuICAgICAgICBlbHNlIGlmICh2YWx1ZSA9PT0gXCIke1BST0pFQ1RfSE9NRVBBR0VfVVJMfVwiKVxuICAgICAgICAgIHZhbHVlID0gc2NvcGUuUFJPSkVDVF9IT01FUEFHRV9VUkw7XG4gICAgICAgIGVsc2UgaWYgKGVudHJ5LnZhbHVlID09PSBcIiR7Q01BS0VfU1lTVEVNX1BST0NFU1NPUn1cIilcbiAgICAgICAgICB2YWx1ZSA9IHNjb3BlLlNZU1RFTV9QUk9DRVNTT1I7XG4gIFxuICAgICAgICBjb25zdCBuYW1lU3ltYm9sID0gU3ltYm9sKG5hbWUpO1xuICAgICAgICBzY29wZVtuYW1lU3ltYm9sXSA9IGVuc3VyZVZhbHVlQnlUeXBlKHR5cGUsIHZhbHVlKTtcbiAgXG4gICAgICAgIE9iamVjdC5kZWZpbmVQcm9wZXJ0eShzY29wZSwgbmFtZSwge1xuICAgICAgICAgIGVudW1lcmFibGU6IHRydWUsXG4gICAgICAgICAgZ2V0KCkge1xuICAgICAgICAgICAgcmV0dXJuIHRoaXNbbmFtZVN5bWJvbF07XG4gICAgICAgICAgfSxcbiAgICAgICAgICBzZXQodmFsdWUpIHtcbiAgICAgICAgICAgIHRoaXNbbmFtZVN5bWJvbF0gPSBlbnN1cmVWYWx1ZUJ5VHlwZSh0eXBlLCB2YWx1ZSk7XG4gICAgICAgICAgfSxcbiAgICAgICAgfSk7XG4gICAgICB9XG4gICAgfVxuICB9XG4gIFxuICBwdWJsaWMgd3JpdGVDYWNoZVZhcmlhYmxlcyhmaWxlbmFtZTogc3RyaW5nKSB7XG4gICAgY29uc3QganNvbiA9IEpTT04uc3RyaW5naWZ5KHRoaXNbQ0FDSEVdLCBudWxsLCAyKTtcbiAgICBmcy53cml0ZUZpbGVTeW5jKGZpbGVuYW1lLCBqc29uLCBcInV0Zi04XCIpO1xuICB9XG5cbiAgcHVibGljIGFkZFN1YmRpcmVjdG9yeShzY29wZTogYW55KSB7XG4gICAgdGhpc1tTVUJESVJfTElTVF0ucHVzaChzY29wZSk7XG4gIH1cblxuICBwdWJsaWMgZmluZFNjcmlwdEZ1bmN0aW9uKG5hbWU6IHN0cmluZyk6IEZ1bmN0aW9uIHwgdW5kZWZpbmVkIHtcbiAgICByZXR1cm4gdGhpc1tCVUlMVElOX1NDUklQVFNdW25hbWVdO1xuICB9XG4gIFxuICBwdWJsaWMgYXN5bmMgZG9TdWJkaXJlY3RvcnkoKSB7XG4gICAgd2hpbGUgKHRoaXNbU1VCRElSX0xJU1RdLmxlbmd0aCkge1xuICAgICAgY29uc3Qgc2NvcGUgPSB0aGlzW1NVQkRJUl9MSVNUXS5zaGlmdCgpO1xuICAgICAgaWYgKCFzY29wZSlcbiAgICAgICAgY29udGludWU7XG5cbiAgICAgIGxldCBzY3JpcHRGaWxlOiBBYnNvbHV0ZVBhdGggfCB1bmRlZmluZWQ7XG4gICAgICBjb25zdCBmaWxlTGlzdCA9IFsgXCIuanNcIiwgXCIubWpzXCIgXS5tYXAoaSA9PiBcIk1ha2VTY3JpcHRcIiArIGkpO1xuICAgICAgZm9yIChjb25zdCBmaWxlbmFtZSBvZiBmaWxlTGlzdCkge1xuICAgICAgICBjb25zdCBpdGVyID0gc2NvcGUuU09VUkNFX0RJUi5qb2luKGZpbGVuYW1lKTtcbiAgICAgICAgaWYgKGF3YWl0IGZpbGVFeGlzdHMoaXRlci50b1N0cmluZygpKSkge1xuICAgICAgICAgIHNjcmlwdEZpbGUgPSBpdGVyO1xuICAgICAgICAgIGJyZWFrO1xuICAgICAgICB9XG4gICAgICB9XG5cbiAgICAgIGlmICghc2NyaXB0RmlsZSlcbiAgICAgICAgdGhyb3cgbmV3IEVycm9yKFwiVGhlcmUgYXJlIG5vIGZpbGVzIGZyb20gdGhlIGxpc3QgXCIgKyBmaWxlTGlzdC5qb2luKCkpO1xuXG4gICAgICBzY29wZS5TQ1JJUFRfRklMRSA9IHNjcmlwdEZpbGU7XG4gICAgICBzY29wZS5TQ1JJUFRfRElSID0gc2NvcGUuU0NSSVBUX0ZJTEUuZGlybmFtZSgpO1xuXG4gICAgICB0aGlzLmFkZFN5c3RlbVZhcmlhYmxlcyhzY29wZSk7XG5cbiAgICAgIGNvbnN0IGN3ZFNhdmUgPSBwcm9jZXNzLmN3ZCgpO1xuICAgICAgcHJvY2Vzcy5jaGRpcihzY29wZS5TT1VSQ0VfRElSLnRvU3RyaW5nKCkpO1xuXG4gICAgICBjb25zdCBtayA9IFVzZXJDb250ZXh0LmNyZWF0ZShzY29wZSwgdGhpcyk7XG4gICAgICBjb25zdCBtb2R1bGUgPSBhd2FpdCBpbXBvcnRNb2R1bGUoc2NvcGUuU0NSSVBUX0ZJTEUudG9TdHJpbmcoKSk7XG4gICAgICBjb25zdCByZXN1bHQgPSBtb2R1bGUuZGVmYXVsdChtayk7XG4gICAgICBpZiAocmVzdWx0IGluc3RhbmNlb2YgUHJvbWlzZSlcbiAgICAgICAgYXdhaXQgcmVzdWx0O1xuICAgICAgU2NvcGVIZWxwZXIuYXBwbHlWYXJpYWJsZXMoc2NvcGUsIG1rKTtcblxuICAgICAgcHJvY2Vzcy5jaGRpcihjd2RTYXZlKTtcbiAgICB9XG4gIH1cblxuICBwdWJsaWMgY3JlYXRlR29hbHMoc2NvcGU6IGFueSkge1xuICAgIGZvciAoY29uc3QgaXRlciBvZiBPYmplY3QudmFsdWVzKHRoaXNbVU5LTk9XTl9UQVJHRVRTXSkpIHtcbiAgICAgIGNvbnN0IHRhcmdldCA9IHRoaXNbVEFSR0VUU10uZ2V0KGl0ZXIuTkFNRSk7XG4gICAgICB0YXJnZXQuYWRkU291cmNlcyhpdGVyLlNPVVJDRVMpO1xuICAgICAgdGFyZ2V0LklOQ0xVREVTLnB1c2goLi4uaXRlci5JTkNMVURFUyk7XG4gICAgICB0YXJnZXQuREVGSU5FUy5wdXNoKC4uLml0ZXIuREVGSU5FUyk7XG4gICAgICB0YXJnZXQuQ09NUElMRV9PUFRJT05TLnB1c2goLi4uaXRlci5DT01QSUxFX09QVElPTlMpO1xuICAgICAgdGFyZ2V0LkxJTktfT1BUSU9OUy5wdXNoKC4uLml0ZXIuTElOS19PUFRJT05TKTtcbiAgICB9XG4gIFxuICAgIGZvciAoY29uc3QgaXRlciBvZiBPYmplY3QudmFsdWVzKHRoaXNbSU5URVJGQUNFX1NDUklQVFNdKSkge1xuICAgICAgY29uc3Qgc2NyaXB0ID0gdGhpc1tTQ1JJUFRTXS5nZXQoaXRlci5OQU1FKTtcbiAgICAgIGZvciAoY29uc3QgW2tleSwgdmFsc10gb2YgT2JqZWN0LmVudHJpZXMoaXRlci5QUk9QRVJUSUVTKSlcbiAgICAgICAgc2NyaXB0LmFkZFByb3BlcnR5KGtleSwgLi4udmFscyk7XG4gICAgfVxuICBcbiAgICBjb25zdCBnb2FsTGlzdCA9IEdvYWxDb2xsZWN0aW9uLmNyZWF0ZSgpO1xuICAgIGZvciAoY29uc3QgW25hbWUsIHNjcmlwdF0gb2YgT2JqZWN0LmVudHJpZXModGhpc1tTQ1JJUFRTXS5FTlRSSUVTKSkgeyAgIFxuICAgICAgY29uc3QgZGVwZW5kcyA9IFtdO1xuICAgICAgaWYgKHNjcmlwdC5TQ1JJUFQgaW5zdGFuY2VvZiBBYnNvbHV0ZVBhdGgpXG4gICAgICAgIGRlcGVuZHMucHVzaChzY3JpcHQuU0NSSVBULnRvU3RyaW5nKCkpO1xuICAgICAgaWYgKHNjcmlwdC5JTlBVVClcbiAgICAgICAgZGVwZW5kcy5wdXNoKHNjcmlwdC5JTlBVVC50b1N0cmluZygpKTtcbiAgICAgIGNvbnN0IG1zZyA9IFwiXFx4MWJbMzZtXCIgKyBcIkdlbmVyYXRpbmcgXCIgKyBzY3JpcHQuVEFSR0VUX1NDT1BFLkJJTkFSWV9ESVIucmVsYXRpdmUoc2NyaXB0Lk9VVFBVVCkgKyBcIlxceDFiWzBtXCI7XG4gICAgICBjb25zdCBwYXJhbXMgPSB7IC4uLnNjcmlwdC5QUk9QRVJUSUVTLCAuLi5zY3JpcHQuUEFSQU1TIH07XG4gICAgICBnb2FsTGlzdC5hZGRTY3JpcHQoc2NyaXB0LlNDUklQVCwgXCJcIiwgZGVwZW5kcywgc2NyaXB0Lk9VVFBVVC50b1N0cmluZygpLCBwYXJhbXMsIG1zZyk7XG4gICAgfVxuICBcbiAgICBmb3IgKGNvbnN0IFtuYW1lLCB0YXJnZXRdIG9mIE9iamVjdC5lbnRyaWVzKHRoaXNbVEFSR0VUU10uRU5UUklFUykgYXMgYW55KSB7XG4gICAgICBjb25zdCBoZWFkZXJzID0gdGhpc1tUQVJHRVRTXS5hbGxIZWFkZXJzT2YodGFyZ2V0KTtcbiAgICAgIGNvbnN0IGRlcGVuZHMgPSBbXTtcbiAgICAgIGZvciAoY29uc3QgcyBvZiB0YXJnZXQuU09VUkNFUykge1xuICAgICAgICBpZiAocyBpbnN0YW5jZW9mIEludGVyZmFjZU9iamVjdHMpIHtcbiAgICAgICAgICBjb25zdCB0ID0gdGhpc1tUQVJHRVRTXS5nZXQocy50YXJnZXROYW1lKTtcbiAgICAgICAgICBmb3IgKGNvbnN0IGYgb2YgdC5TT1VSQ0VTKSB7XG4gICAgICAgICAgICBpZiAoZiBpbnN0YW5jZW9mIFNvdXJjZUZpbGUgJiYgZi5PQkpFQ1RfRklMRSlcbiAgICAgICAgICAgICAgZGVwZW5kcy5wdXNoKGYuT0JKRUNUX0ZJTEUudG9TdHJpbmcoKSk7XG4gICAgICAgICAgfVxuICAgICAgICAgIGNvbnRpbnVlO1xuICAgICAgICB9XG4gIFxuICAgICAgICBpZiAocy5IRUFERVJfRklMRV9PTkxZKVxuICAgICAgICAgIGNvbnRpbnVlO1xuICBcbiAgICAgICAgZnMubWtkaXJTeW5jKHMuT0JKRUNUX0ZJTEVfRElSLnRvU3RyaW5nKCksIHsgcmVjdXJzaXZlOiB0cnVlIH0pO1xuICBcbiAgICAgICAgY29uc3QgcmVsYXRpdmVPYmplY3QgPSB0YXJnZXQuVEFSR0VUX1NDT1BFLkJJTkFSWV9ESVIucmVsYXRpdmUocy5PQkpFQ1RfRklMRSk7XG4gICAgICAgIGNvbnN0IHJlbGF0aXZlQmluYXJ5RGlyID0gc2NvcGUuUFJPSkVDVF9CSU5BUllfRElSLnJlbGF0aXZlKHRhcmdldC5UQVJHRVRfU0NPUEUuQklOQVJZX0RJUik7XG4gICAgICAgIGNvbnN0IG1zZyA9IFwiXFx4MWJbMzJtXCIgKyBgQnVpbGRpbmcgJHtzLkxBTkdVQUdFfSBvYmplY3QgJHtyZWxhdGl2ZUJpbmFyeURpcn0vJHtyZWxhdGl2ZU9iamVjdH1gICsgXCJcXHgxYlswbVwiO1xuICBcbiAgICAgICAgY29uc3QgZGVmaW5pdGlvbnMgPSBbXG4gICAgICAgICAgLi4udGhpc1tUQVJHRVRTXS5hbGxEZWZpbml0aW9uc09mKHRhcmdldCksXG4gICAgICAgICAgLi4ucy5ERUZJTkVTLFxuICAgICAgICBdO1xuICBcbiAgICAgICAgY29uc3QgYXJncyA9IFtdO1xuICAgICAgICBhcmdzLnB1c2goLi4uZGVmaW5pdGlvbnMubWFwKGkgPT4gXCItRFwiICsgaSkpO1xuICAgICAgICBhcmdzLnB1c2goLi4udGhpc1tUQVJHRVRTXS5hbGxJbmNsdWRlc09mKHRhcmdldCkubWFwKGkgPT4gXCItSVwiICsgaSkpO1xuICAgICAgICBhcmdzLnB1c2goLi4udGhpc1tUQVJHRVRTXS5hbGxDb21waWxlT3B0aW9uc09mKHRhcmdldCkpO1xuICAgICAgICBpZiAodGFyZ2V0LlBPU0lUSU9OX0lOREVQRU5ERU5UX0NPREUpXG4gICAgICAgICAgYXJncy5wdXNoKFwiLWZQSUNcIik7XG4gICAgICAgIGFyZ3MucHVzaCguLi5zLkNPTVBJTEVfRkxBR1MuZmxhdCgpKTtcbiAgICAgICAgYXJncy5wdXNoKFwiLW9cIiwgcmVsYXRpdmVPYmplY3QpO1xuICAgICAgICBhcmdzLnB1c2goXCItY1wiLCBzLkZJTEUpO1xuICAgICAgICBjb25zdCBjd2QgPSB0YXJnZXQuVEFSR0VUX1NDT1BFLkJJTkFSWV9ESVIudG9TdHJpbmcoKTtcbiAgXG4gICAgICAgIGNvbnN0IGNvbW1hbmQgPSB0YXJnZXQuVEFSR0VUX1NDT1BFW3MuTEFOR1VBR0UgKyBcIl9DT01QSUxFUlwiXS50b1N0cmluZygpO1xuICAgICAgICBjb25zdCBvdXRwdXQgPSB0YXJnZXQuVEFSR0VUX1NDT1BFLkJJTkFSWV9ESVIuam9pbihyZWxhdGl2ZU9iamVjdCkudG9TdHJpbmcoKTtcbiAgICAgICAgZGVwZW5kcy5wdXNoKG91dHB1dCk7XG4gIFxuICAgICAgICBnb2FsTGlzdC5hZGRFeGVjKG91dHB1dCwgWyAuLi5oZWFkZXJzLCBzLkZJTEUgXSwgY29tbWFuZCwgYXJncywgY3dkLCBtc2cpO1xuICAgICAgfVxuICBcbiAgICAgIGNvbnN0IGxpbmtPcHRpb25zID0gdGhpc1tUQVJHRVRTXS5hbGxMaW5rT3B0aW9uc09mKHRhcmdldCk7XG4gICAgICBpZiAodGFyZ2V0IGluc3RhbmNlb2YgT2JqZWN0TGlicmFyeSkge1xuICAgICAgICBjb25zdCBvYmpzID0gZGVwZW5kcy5maWx0ZXIoaSA9PiBpLmVuZHNXaXRoKFwiLm9cIikgfHwgaS5lbmRzV2l0aChcIi5vYmpcIikpLm1hcChpID0+IHRhcmdldC5GSUxFX0RJUi5yZWxhdGl2ZShpKSk7XG4gICAgICAgIGlmIChvYmpzLmxlbmd0aCkge1xuICAgICAgICAgIGNvbnN0IGFyZ3MgPSBbXG4gICAgICAgICAgICAuLi5saW5rT3B0aW9ucyxcbiAgICAgICAgICAgIFwiLXJcIixcbiAgICAgICAgICAgIFwiLW9cIiwgdGFyZ2V0LkZJTEVfTkFNRSxcbiAgICAgICAgICAgIC4uLm9ianNcbiAgICAgICAgICBdO1xuICAgICAgICAgIGNvbnN0IGN3ZCA9IHRhcmdldC5GSUxFX0RJUi50b1N0cmluZygpO1xuICAgICAgICAgIGNvbnN0IG1zZyA9IGBMaW5raW5nIENYWCBvYmplY3QgbGlicmFyeSAke3RhcmdldC5GSUxFX05BTUV9YDtcbiAgICAgICAgICBnb2FsTGlzdC5hZGRFeGVjKHRhcmdldC5GSUxFLnRvU3RyaW5nKCksIGRlcGVuZHMsIHNjb3BlLkxJTktFUiwgYXJncywgY3dkLCBtc2cpO1xuICAgICAgICB9XG4gICAgICAgIGVsc2Uge1xuICAgICAgICAgIGxvZ2dlci5pbmZvKGBObyBvYmplY3RzIGZvciBcIiR7dGFyZ2V0Lk5BTUV9XCJgKTtcbiAgICAgICAgfVxuICAgICAgfVxuICBcbiAgICAgIGlmICh0YXJnZXQgaW5zdGFuY2VvZiBTdGF0aWNMaWJyYXJ5KSB7XG4gICAgICAgIGNvbnN0IG9ianMgPSBkZXBlbmRzLmZpbHRlcihpID0+IGkuZW5kc1dpdGgoXCIub1wiKSB8fCBpLmVuZHNXaXRoKFwiLm9ialwiKSkubWFwKGkgPT4gdGFyZ2V0LkZJTEVfRElSLnJlbGF0aXZlKGkpKTtcbiAgICAgICAgaWYgKG9ianMubGVuZ3RoKSB7XG4gICAgICAgICAgY29uc3QgYXJncyA9IFsgXCJyY1wiLCB0YXJnZXQuRklMRV9OQU1FICwgLi4ub2JqcyBdO1xuICAgICAgICAgIGNvbnN0IGN3ZCA9IHRhcmdldC5GSUxFX0RJUi50b1N0cmluZygpO1xuICAgICAgICAgIGNvbnN0IG1zZyA9IGBMaW5raW5nIENYWCBzdGF0aWMgbGlicmFyeSAke3RhcmdldC5GSUxFX05BTUV9YDtcbiAgICAgICAgICBnb2FsTGlzdC5hZGRFeGVjKHRhcmdldC5GSUxFLnRvU3RyaW5nKCksIGRlcGVuZHMsIHNjb3BlLkFSLCBhcmdzLCBjd2QsIG1zZyk7XG4gICAgICAgIH1cbiAgICAgICAgZWxzZSB7XG4gICAgICAgICAgbG9nZ2VyLmluZm8oYE5vIG9iamVjdHMgZm9yIFwiJHt0YXJnZXQuTkFNRX1cImApO1xuICAgICAgICB9XG4gICAgICB9XG4gIFxuICAgICAgaWYgKHRhcmdldCBpbnN0YW5jZW9mIFNoYXJlZExpYnJhcnkpIHtcbiAgICAgICAgdGhyb3cgbmV3IEVycm9yKFwiTm90IGltcGxlbWVudGVkXCIpO1xuICAgICAgfVxuICBcbiAgICAgIGlmICh0YXJnZXQgaW5zdGFuY2VvZiBFeGVjdXRhYmxlKSB7XG4gICAgICAgIGNvbnN0IG9ianMgPSBkZXBlbmRzLmZpbHRlcihpID0+IGkuZW5kc1dpdGgoXCIub1wiKSB8fCBpLmVuZHNXaXRoKFwiLm9ialwiKSkubWFwKGkgPT4gdGFyZ2V0LkZJTEVfRElSLnJlbGF0aXZlKGkpKTtcbiAgICAgICAgaWYgKG9ianMubGVuZ3RoKSB7XG4gICAgICAgICAgY29uc3QgbGlicyA9IHRoaXNbVEFSR0VUU10uYWxsTGlicmFyaWVzT2YodGFyZ2V0KTtcbiAgICAgICAgICBjb25zdCBhcmdzID0gW1xuICAgICAgICAgICAgLi4udGFyZ2V0LlRBUkdFVF9TQ09QRS5DWFhfRkxBR1MsXG4gICAgICAgICAgICAuLi5saW5rT3B0aW9ucyxcbiAgICAgICAgICAgIC4uLm9ianMsXG4gICAgICAgICAgICBcIi1vXCIsIHRhcmdldC5GSUxFX05BTUUsXG4gICAgICAgICAgICAuLi5saWJzLm1hcChpID0+IHRhcmdldC5GSUxFX0RJUi5yZWxhdGl2ZShpKSksXG4gICAgICAgICAgXTtcbiAgICAgICAgICBjb25zdCBjd2QgPSB0YXJnZXQuRklMRV9ESVIudG9TdHJpbmcoKTtcbiAgICAgICAgICBjb25zdCBtc2cgPSBgTGlua2luZyBDWFggZXhlY3V0YWJsZSAke3RhcmdldC5GSUxFX05BTUV9YDtcbiAgICAgICAgICBnb2FsTGlzdC5hZGRFeGVjKHRhcmdldC5GSUxFLnRvU3RyaW5nKCksIGRlcGVuZHMuY29uY2F0KGxpYnMpLCBzY29wZS5DWFhfQ09NUElMRVIsIGFyZ3MsIGN3ZCwgbXNnKTtcbiAgICAgICAgfVxuICAgICAgICBlbHNlIHtcbiAgICAgICAgICBsb2dnZXIuaW5mbyhgTm8gb2JqZWN0cyBmb3IgXCIke3RhcmdldC5OQU1FfVwiYCk7XG4gICAgICAgIH1cbiAgICAgIH1cbiAgXG4gICAgICBnb2FsTGlzdC5hZGRUYXJnZXQobmFtZSwgWyB0YXJnZXQuRklMRS50b1N0cmluZygpIF0sIGBCdWlsdCB0YXJnZXQgJHtuYW1lfWApO1xuICAgIH1cbiAgXG4gICAgY29uc3QgaW5zdGFsbF9maWxlcyA9IFtdO1xuICAgIGZvciAoY29uc3QgaXRlciBvZiB0aGlzW0lOU1RBTExfTElTVF0pIHtcbiAgICAgIGxldCBzcmMsIGRlc3Q7XG4gICAgICBpZiAoaXRlci5WQUxVRSBpbnN0YW5jZW9mIEFic29sdXRlUGF0aCkge1xuICAgICAgICBpZiAoc2NvcGUuUFJFVkVOVF9JTlNUQUxMX0ZJTEVTKVxuICAgICAgICAgIGNvbnRpbnVlO1xuICAgICAgICBzcmMgPSBpdGVyLlZBTFVFLnRvU3RyaW5nKCk7XG4gICAgICAgIGNvbnN0IHJmaWxlID0gaXRlci5CQVNFX0RJUi5yZWxhdGl2ZShpdGVyLlZBTFVFKTtcbiAgICAgICAgZGVzdCA9IGl0ZXIuREVTVElOQVRJT04uam9pbihyZmlsZSk7XG4gICAgICB9XG4gICAgICBlbHNlIGlmIChpdGVyLlZBTFVFIGluc3RhbmNlb2YgSW50ZXJmYWNlVGFyZ2V0KSB7XG4gICAgICAgIGNvbnN0IHRhcmdldCA9IHRoaXNbVEFSR0VUU10uZ2V0KGl0ZXIuVkFMVUUudGFyZ2V0TmFtZSk7XG4gICAgICAgIHNyYyA9IHRhcmdldC5GSUxFLnRvU3RyaW5nKCk7XG4gICAgICAgIGRlc3QgPSBpdGVyLkRFU1RJTkFUSU9OLmpvaW4odGFyZ2V0LkZJTEVfTkFNRSk7XG4gICAgICB9XG4gICAgICBlbHNlIHtcbiAgICAgICAgdGhyb3cgbmV3IEVycm9yKGBDYW4gbm90IGluc3RhbGwgJHtpdGVyLlZBTFVFfWApXG4gICAgICB9XG4gICAgICBpZiAoc2NvcGUuREVTVERJUilcbiAgICAgICAgZGVzdCA9IHNjb3BlLkRFU1RESVIuam9pbihkZXN0KS50b1N0cmluZygpO1xuICAgICAgZ29hbExpc3QuYWRkU2NyaXB0KGluc3RhbGxfc2NyaXB0LCBcIlwiLCBbIHNyYyBdLCBkZXN0LCB7c3JjLCBkZXN0fSwgXCJcIik7XG4gICAgICBpbnN0YWxsX2ZpbGVzLnB1c2goZGVzdCk7XG4gICAgfVxuICBcbiAgICBpZiAoaW5zdGFsbF9maWxlcy5sZW5ndGgpIHtcbiAgICAgIGdvYWxMaXN0LmFkZFRhcmdldChJTlNUQUxMX1RBUkdFVCwgaW5zdGFsbF9maWxlcywgXCJcIik7XG4gICAgfVxuICBcbiAgICBnb2FsTGlzdC5hZGRUYXJnZXQoQUxMX1RBUkdFVCwgT2JqZWN0LmtleXModGhpc1tUQVJHRVRTXS5FTlRSSUVTKSwgXCJcIik7XG4gIFxuICAgIHJldHVybiBnb2FsTGlzdDtcbiAgfVxuXG4gIHB1YmxpYyB0b0pTT04oKTogb2JqZWN0IHtcbiAgICByZXR1cm4ge1xuICAgICAgVEFSR0VUUzogdGhpcy5UQVJHRVRTLFxuICAgICAgU0NSSVBUUzogdGhpcy5TQ1JJUFRTLFxuICAgICAgQ0FDSEU6IHRoaXMuQ0FDSEUsXG4gICAgICBVTktOT1dOX1RBUkdFVFM6IHRoaXMuVU5LTk9XTl9UQVJHRVRTLFxuICAgICAgSU5URVJGQUNFX1NDUklQVFM6IHRoaXMuSU5URVJGQUNFX1NDUklQVFMsXG4gICAgICBJTlNUQUxMX0xJU1Q6IHRoaXMuSU5TVEFMTF9MSVNULFxuICAgICAgU0NSSVBUX1ZBUklBQkxFU19NQVA6IHRoaXMuU0NSSVBUX1ZBUklBQkxFU19NQVAsXG4gICAgICBTVUJESVJfQUxJQVM6IHRoaXMuU1VCRElSX0FMSUFTLFxuICAgIH07XG4gIH1cbn07XG4iLCIvKlxuICogTUlUIExpY2Vuc2VcbiAqXG4gKiBDb3B5cmlnaHQgKGMpIDIwMjUgIFl1cmlpIFlha3ViaW4gKHl1cmlpLnlha3ViaW5AZ21haWwuY29tKVxuICpcbiAqIFBlcm1pc3Npb24gaXMgZ3JhbnRlZCB0byB1c2UsIGNvcHksIG1vZGlmeSwgYW5kIGRpc3RyaWJ1dGUgdGhpcyBzb2Z0d2FyZVxuICogdW5kZXIgdGhlIE1JVCBMaWNlbnNlLiBTZWUgTElDRU5TRSBmaWxlIGZvciBkZXRhaWxzLlxuICovXG5cbmltcG9ydCBwYXRoIGZyb20gXCJub2RlOnBhdGhcIjtcbmltcG9ydCBmcyBmcm9tIFwibm9kZTpmc1wiO1xuaW1wb3J0IHsgc3Bhd25TeW5jIH0gZnJvbSBcIm5vZGU6Y2hpbGRfcHJvY2Vzc1wiO1xuXG5pbXBvcnQgeyBBYnNvbHV0ZVBhdGggfSBmcm9tIFwiQC9jb3JlL1BhdGhcIjtcbmltcG9ydCB7IGltcG9ydE1vZHVsZSB9IGZyb20gXCJAL3V0aWxzL01vZHVsZVwiO1xuXG5jb25zdCBFTlRSSUVTID0gU3ltYm9sKFwiRU5UUklFU1wiKTtcblxuZW51bSBHb2FsVHlwZSB7XG4gIFNDUklQVCA9IFwic2NyaXB0XCIsXG4gIEVYRUMgPSBcImV4ZWNcIixcbiAgVEFSR0VUID0gXCJ0YXJnZXRcIixcbn07XG5cbmludGVyZmFjZSBCYXNlR29hbCB7XG4gIG5hbWU6IHN0cmluZztcbiAgdHlwZTogR29hbFR5cGU7XG4gIGRlcGVuZHM6IEFycmF5PHN0cmluZz47XG4gIG1zZzogc3RyaW5nO1xuICBvdXRwdXQ6IHN0cmluZztcbn07XG5cbmludGVyZmFjZSBTY3JpcHRHb2FsIGV4dGVuZHMgQmFzZUdvYWwge1xuICBzY3JpcHQ6IEFic29sdXRlUGF0aCB8IEZ1bmN0aW9uO1xuICBwYXJhbXM6IGFueTtcbn07XG5cbmludGVyZmFjZSBFeGVjR29hbCBleHRlbmRzIEJhc2VHb2FsIHtcbiAgY29tbWFuZDogc3RyaW5nO1xuICBhcmdzOiBBcnJheTxzdHJpbmc+O1xuICBjd2Q6IHN0cmluZztcbn07XG5cbmZ1bmN0aW9uIHNjb3BlVmFsdWVBc1ByaW1pdGl2ZXMobzogYW55KTogYW55IHtcbiAgaWYgKHR5cGVvZiBvID09PSBcInVuZGVmaW5lZFwiKVxuICAgIHJldHVybiBvO1xuICBpZiAodHlwZW9mIG8gPT09IFwiYm9vbGVhblwiKVxuICAgIHJldHVybiBvO1xuICBpZiAodHlwZW9mIG8gPT09IFwibnVtYmVyXCIpXG4gICAgcmV0dXJuIG87XG4gIGlmICh0eXBlb2YgbyA9PT0gXCJzdHJpbmdcIilcbiAgICByZXR1cm4gbztcbiAgaWYgKHR5cGVvZiBvID09PSBcIm9iamVjdFwiKSB7XG4gICAgaWYgKCFvKVxuICAgICAgcmV0dXJuIG87XG4gICAgaWYgKG8gaW5zdGFuY2VvZiBBYnNvbHV0ZVBhdGgpIHtcbiAgICAgIHJldHVybiBvLnRvU3RyaW5nKCk7XG4gICAgfVxuICAgIGlmIChvIGluc3RhbmNlb2YgQXJyYXkpIHtcbiAgICAgIGNvbnN0IHJlc3VsdCA9IFtdO1xuICAgICAgZm9yIChjb25zdCBpIG9mIG8pXG4gICAgICAgIHJlc3VsdC5wdXNoKHNjb3BlVmFsdWVBc1ByaW1pdGl2ZXMoaSkpO1xuICAgICAgcmV0dXJuIHJlc3VsdDtcbiAgICB9XG4gICAgaWYgKG8gaW5zdGFuY2VvZiBPYmplY3QpIHtcbiAgICAgIGNvbnN0IHJlc3VsdDogYW55ID0ge307XG4gICAgICBmb3IgKGNvbnN0IFtrLHZdIG9mIE9iamVjdC5lbnRyaWVzKG8pKVxuICAgICAgICByZXN1bHRba10gPSBzY29wZVZhbHVlQXNQcmltaXRpdmVzKHYpO1xuICAgICAgcmV0dXJuIHJlc3VsdDtcbiAgICB9XG4gIH1cbiAgdGhyb3cgbmV3IEVycm9yKGBVbmtub3duIGluc3RhbmNlIG9mICR7b31gKTtcbn1cblxuZXhwb3J0IGNsYXNzIEdvYWxDb2xsZWN0aW9uIHtcbiAgcHJpdmF0ZSBbRU5UUklFU106IEFycmF5PEJhc2VHb2FsPjtcblxuICBwcml2YXRlIGNvbnN0cnVjdG9yKCkge1xuICAgIHRoaXNbRU5UUklFU10gPSBuZXcgQXJyYXk8QmFzZUdvYWw+O1xuICB9XG5cbiAgcHVibGljIGdldCBFTlRSSUVTKCkge1xuICAgIHJldHVybiB0aGlzW0VOVFJJRVNdO1xuICB9XG5cbiAgcHVibGljIHN0YXRpYyBjcmVhdGUoKSB7XG4gICAgcmV0dXJuIE9iamVjdC5zZWFsKG5ldyBHb2FsQ29sbGVjdGlvbik7XG4gIH1cblxuICBwdWJsaWMgZmluZFNjcmlwdEJ5T3V0cHV0KG91dHB1dDogc3RyaW5nKTogQmFzZUdvYWwgfCB1bmRlZmluZWQge1xuICAgIGlmICghb3V0cHV0KVxuICAgICAgcmV0dXJuIHVuZGVmaW5lZDtcbiAgICByZXR1cm4gdGhpc1tFTlRSSUVTXS5maW5kKChpKSA9PiBpLnR5cGUgPT09IEdvYWxUeXBlLlNDUklQVCAmJiBpLm91dHB1dCA9PT0gb3V0cHV0KTtcbiAgfVxuXG4gIHB1YmxpYyBoYXNTY3JpcHRCeU91dHB1dChvdXRwdXQ6IHN0cmluZyk6IGJvb2xlYW4ge1xuICAgIHJldHVybiAhIXRoaXMuZmluZFNjcmlwdEJ5T3V0cHV0KG91dHB1dCk7XG4gIH1cblxuICBwdWJsaWMgYWRkU2NyaXB0KHNjcmlwdDogQWJzb2x1dGVQYXRoIHwgRnVuY3Rpb24sIG5hbWU6IHN0cmluZywgZGVwZW5kczogQXJyYXk8c3RyaW5nPiwgb3V0cHV0OiBzdHJpbmcsIHBhcmFtczogYW55LCBtc2c6IHN0cmluZykge1xuICAgIGlmICh0aGlzLmhhc1NjcmlwdEJ5T3V0cHV0KG91dHB1dC50b1N0cmluZygpKSlcbiAgICAgIHRocm93IG5ldyBFcnJvcihgT3V0cHV0IFwiJHtvdXRwdXR9XCIgZXhpc3RzYCk7XG4gICAgdGhpc1tFTlRSSUVTXS5wdXNoKHsgbmFtZSwgdHlwZTogR29hbFR5cGUuU0NSSVBULCBzY3JpcHQsIG91dHB1dCwgZGVwZW5kcywgcGFyYW1zLCBtc2cgfSBhcyBTY3JpcHRHb2FsKTtcbiAgfVxuXG4gIHB1YmxpYyBhZGRFeGVjKG91dHB1dDogc3RyaW5nLCBkZXBlbmRzOiBBcnJheTxzdHJpbmc+LCBjb21tYW5kOiBzdHJpbmcsIGFyZ3M6IEFycmF5PHN0cmluZz4sIGN3ZDogc3RyaW5nLCBtc2c6IHN0cmluZykge1xuICAgIHRoaXNbRU5UUklFU10ucHVzaCh7IG5hbWU6IFwiXCIsIHR5cGU6IEdvYWxUeXBlLkVYRUMsIGRlcGVuZHMsIG91dHB1dCwgY29tbWFuZCwgYXJncywgY3dkLCBtc2cgfSBhcyBFeGVjR29hbCk7XG4gIH1cblxuICBwdWJsaWMgYWRkVGFyZ2V0KG5hbWU6IHN0cmluZywgZGVwZW5kczogQXJyYXk8c3RyaW5nPiwgbXNnOiBzdHJpbmcpIHtcbiAgICB0aGlzW0VOVFJJRVNdLnB1c2goeyBuYW1lLCB0eXBlOiBHb2FsVHlwZS5UQVJHRVQsIGRlcGVuZHMsIG1zZywgb3V0cHV0OiBcIlwiIH0pO1xuICB9XG5cbiAgcHVibGljIGdldFRhcmdldChuYW1lOiBzdHJpbmcpOiBCYXNlR29hbCB8IHVuZGVmaW5lZCB7XG4gICAgcmV0dXJuIHRoaXNbRU5UUklFU10uZmluZCgoaSkgPT4gaS50eXBlID09PSBHb2FsVHlwZS5UQVJHRVQgJiYgaS5uYW1lID09PSBuYW1lKTtcbiAgfVxuXG4gIHByaXZhdGUgYWRkVGFyZ2V0TGlzdEltcGwobmFtZTogc3RyaW5nLCByZXN1bHQ6IEFycmF5PEJhc2VHb2FsPikge1xuICAgIGlmIChyZXN1bHQuZmluZChpID0+IGkubmFtZSA9PT0gbmFtZSB8fCBpLm91dHB1dCA9PT0gbmFtZSkpIHtcbiAgICAgIHJldHVybjtcbiAgICB9XG4gIFxuICAgIGNvbnN0IGdvYWwgPSB0aGlzW0VOVFJJRVNdLmZpbmQoaSA9PiBpLm5hbWUgPT09IG5hbWUgfHwgaS5vdXRwdXQgPT09IG5hbWUpO1xuICAgIGlmICghZ29hbCkge1xuICAgICAgcmV0dXJuO1xuICAgIH1cbiAgXG4gICAgZm9yIChjb25zdCBpdGVyIG9mIGdvYWwuZGVwZW5kcykge1xuICAgICAgdGhpcy5hZGRUYXJnZXRMaXN0SW1wbChpdGVyLnRvU3RyaW5nKCksIHJlc3VsdCk7XG4gICAgfVxuICBcbiAgICByZXN1bHQucHVzaChnb2FsKTtcbiAgfVxuICBcbiAgcHVibGljIGdldFRhcmdldExpc3QobmFtZTpzdHJpbmcpIHtcbiAgICBjb25zdCByZXN1bHQgPSBuZXcgQXJyYXk8QmFzZUdvYWw+O1xuICAgIHRoaXMuYWRkVGFyZ2V0TGlzdEltcGwobmFtZSwgcmVzdWx0KTtcbiAgICByZXR1cm4gcmVzdWx0O1xuICB9XG4gIFxuICBwdWJsaWMgdG9KU09OKCkge1xuICAgIHJldHVybiB0aGlzW0VOVFJJRVNdO1xuICB9XG5cbiAgcHVibGljIHN0YXRpYyBhc3luYyBidWlsZEdvYWxzKGNvbGxlY3Rpb246IEFycmF5PEJhc2VHb2FsPikge1xuICAgIGxldCBtc2dDb3VudCA9IDA7XG4gICAgZm9yIChjb25zdCBpdGVyIG9mIGNvbGxlY3Rpb24pXG4gICAgICBtc2dDb3VudCArPSBpdGVyLm1zZyA/IDEgOiAwO1xuICBcbiAgICBsZXQgbXNnSW5kZXggPSAwO1xuICAgIGZvciAoY29uc3QgZ29hbCBvZiBjb2xsZWN0aW9uKSB7XG4gICAgICBjb25zdCB7IHR5cGUsIG1zZyB9ID0gZ29hbDtcbiAgICAgIGlmIChtc2cpIHtcbiAgICAgICAgY29uc3QgcmVsYXRpb25PZkxlbmd0aCA9IE1hdGgucm91bmQoKCsrbXNnSW5kZXggLyBtc2dDb3VudCkgKiAxMDApO1xuICAgICAgICBjb25zdCBwZXJjZW50ID0gXCJbXCIgKyByZWxhdGlvbk9mTGVuZ3RoLnRvU3RyaW5nKCkucGFkU3RhcnQoMywgXCIgXCIpICsgXCIlXSBcIjtcbiAgICAgICAgY29uc29sZS5pbmZvKHBlcmNlbnQgKyBtc2cpO1xuICAgICAgfVxuICAgICAgaWYgKHR5cGUgPT09IEdvYWxUeXBlLlNDUklQVCkge1xuICAgICAgICBjb25zdCB7IHNjcmlwdCwgcGFyYW1zIH0gPSBnb2FsIGFzIFNjcmlwdEdvYWw7XG4gICAgICAgIGxldCBtb2R1bGU7XG4gICAgICAgIGlmICh0eXBlb2Ygc2NyaXB0ID09PSBcImZ1bmN0aW9uXCIpXG4gICAgICAgICAgbW9kdWxlID0gc2NyaXB0O1xuICAgICAgICBlbHNlXG4gICAgICAgICAgbW9kdWxlID0gKGF3YWl0IGltcG9ydE1vZHVsZShzY3JpcHQudG9TdHJpbmcoKSkpLmRlZmF1bHQ7XG4gICAgICAgIGNvbnN0IHJlc3VsdCA9IG1vZHVsZShzY29wZVZhbHVlQXNQcmltaXRpdmVzKHBhcmFtcykpO1xuICAgICAgICBpZiAocmVzdWx0IGluc3RhbmNlb2YgUHJvbWlzZSkge1xuICAgICAgICAgIGF3YWl0IHJlc3VsdDtcbiAgICAgICAgfVxuICAgICAgfVxuICAgICAgZWxzZSBpZiAodHlwZSA9PT0gR29hbFR5cGUuRVhFQykge1xuICAgICAgICBjb25zdCB7IGNvbW1hbmQsIGFyZ3MsIGN3ZCwgb3V0cHV0IH0gPSBnb2FsIGFzIEV4ZWNHb2FsO1xuICAgICAgICBmcy5ta2RpclN5bmMocGF0aC5wb3NpeC5kaXJuYW1lKG91dHB1dCksIHsgcmVjdXJzaXZlOiB0cnVlIH0pO1xuICAgICAgICBjb25zdCByZXN1bHQgPSBzcGF3blN5bmMoY29tbWFuZCwgYXJncywgeyBjd2QsIGVuY29kaW5nOiBcInV0Zi04XCIgfSk7XG4gICAgICAgIGlmIChyZXN1bHQuZXJyb3IgfHwgcmVzdWx0LnN0YXR1cykge1xuICAgICAgICAgIGNvbnNvbGUuaW5mbyhcImNkIFwiICsgY3dkKTtcbiAgICAgICAgICBsZXQgY21kID0gYXJncy5qb2luKFwiIFwiKTtcbiAgICAgICAgICBjbWQgPSBjb21tYW5kICsgKGNtZCA/IFwiIFwiIDogXCJcIikgKyBjbWQ7XG4gICAgICAgICAgY29uc29sZS5pbmZvKGNtZCk7XG4gICAgICAgICAgY29uc29sZS5pbmZvKFwiXCIpO1xuICBcbiAgICAgICAgICBjb25zb2xlLmVycm9yKHJlc3VsdC5zdGRlcnIpO1xuXG4gICAgICAgICAgaWYgKHJlc3VsdC5lcnJvcilcbiAgICAgICAgICAgICAgdGhyb3cgcmVzdWx0LmVycm9yO1xuICBcbiAgICAgICAgICB0aHJvdyBuZXcgRXJyb3IocmVzdWx0LmVycm9yIGFzIGFueSB8fCBcIlN0YXR1cyBcIiArIHJlc3VsdC5zdGF0dXMpO1xuICAgICAgICB9XG4gICAgICB9XG4gICAgICBlbHNlIGlmICh0eXBlID09PSBHb2FsVHlwZS5UQVJHRVQpIHtcbiAgICAgIH1cbiAgICB9XG4gIH1cbn07XG4iLCIvKlxuICogTUlUIExpY2Vuc2VcbiAqXG4gKiBDb3B5cmlnaHQgKGMpIDIwMjUgIFl1cmlpIFlha3ViaW4gKHl1cmlpLnlha3ViaW5AZ21haWwuY29tKVxuICpcbiAqIFBlcm1pc3Npb24gaXMgZ3JhbnRlZCB0byB1c2UsIGNvcHksIG1vZGlmeSwgYW5kIGRpc3RyaWJ1dGUgdGhpcyBzb2Z0d2FyZVxuICogdW5kZXIgdGhlIE1JVCBMaWNlbnNlLiBTZWUgTElDRU5TRSBmaWxlIGZvciBkZXRhaWxzLlxuICovXG5cbmltcG9ydCB7IEFic29sdXRlUGF0aCB9IGZyb20gXCJAL2NvcmUvUGF0aFwiO1xuXG5jb25zdCBOQU1FID0gU3ltYm9sKFwiTkFNRVwiKTtcbmNvbnN0IFBBVEggPSBTeW1ib2woXCJQQVRIXCIpO1xuXG5leHBvcnQgY2xhc3MgSW5jbHVkZURpcmVjdG9yeSB7XG4gIHByaXZhdGUgW05BTUVdOiBzdHJpbmc7XG4gIHByaXZhdGUgW1BBVEhdOiBBYnNvbHV0ZVBhdGg7XG5cbiAgcHJpdmF0ZSBjb25zdHJ1Y3RvcihkaXJuYW1lOiBhbnksIGJhc2VEaXI6IEFic29sdXRlUGF0aCkge1xuICAgIHRoaXNbTkFNRV0gPSBkaXJuYW1lLnRvU3RyaW5nKCk7XG4gICAgdGhpc1tQQVRIXSA9IGJhc2VEaXIucmVzb2x2ZShkaXJuYW1lKTtcbiAgfVxuXG4gIHB1YmxpYyBzdGF0aWMgY3JlYXRlKGRpcm5hbWU6IGFueSwgYmFzZURpcjogQWJzb2x1dGVQYXRoKSB7XG4gICAgcmV0dXJuIE9iamVjdC5zZWFsKG5ldyBJbmNsdWRlRGlyZWN0b3J5KGRpcm5hbWUsIGJhc2VEaXIpKTtcbiAgfVxuXG4gIGdldCBOQU1FKCkge1xuICAgIHJldHVybiB0aGlzW05BTUVdO1xuICB9XG5cbiAgZ2V0IFBBVEgoKSB7XG4gICAgcmV0dXJuIHRoaXNbUEFUSF07XG4gIH1cblxuICB0b1N0cmluZygpIHtcbiAgICByZXR1cm4gdGhpc1tQQVRIXS50b1N0cmluZygpO1xuICB9XG5cbiAgdG9KU09OKCk6IG9iamVjdCB7XG4gICAgcmV0dXJuIHtcbiAgICAgIE5BTUU6IHRoaXMuTkFNRSxcbiAgICAgIFBBVEg6IHRoaXMuUEFUSCxcbiAgICB9XG4gIH1cbn07XG4iLCIvKlxuICogTUlUIExpY2Vuc2VcbiAqXG4gKiBDb3B5cmlnaHQgKGMpIDIwMjUgIFl1cmlpIFlha3ViaW4gKHl1cmlpLnlha3ViaW5AZ21haWwuY29tKVxuICpcbiAqIFBlcm1pc3Npb24gaXMgZ3JhbnRlZCB0byB1c2UsIGNvcHksIG1vZGlmeSwgYW5kIGRpc3RyaWJ1dGUgdGhpcyBzb2Z0d2FyZVxuICogdW5kZXIgdGhlIE1JVCBMaWNlbnNlLiBTZWUgTElDRU5TRSBmaWxlIGZvciBkZXRhaWxzLlxuICovXG5cbmltcG9ydCB7IEludGVyZmFjZVRhcmdldCB9IGZyb20gXCJAL2NvcmUvSW50ZXJmYWNlVGFyZ2V0XCI7XG5pbXBvcnQgeyBEaXJQYXRoLCBGaWxlUGF0aCwgQWJzb2x1dGVQYXRoIH0gZnJvbSBcIkAvY29yZS9QYXRoXCI7XG5pbXBvcnQgeyBTeXN0ZW1TY29wZSB9IGZyb20gXCJAL2NvcmUvU3lzdGVtU2NvcGVcIjtcblxuY29uc3QgVkFMVUUgICAgICAgPSBTeW1ib2woXCJWQUxVRVwiKTtcbmNvbnN0IERFU1RJTkFUSU9OID0gU3ltYm9sKFwiREVTVElOQVRJT05cIik7XG5jb25zdCBCQVNFX0RJUiAgICA9IFN5bWJvbChcIkJBU0VfRElSXCIpO1xuXG5leHBvcnQgY2xhc3MgSW5zdGFsbEVudGl0eSB7XG4gIHByaXZhdGUgW1ZBTFVFXTogQWJzb2x1dGVQYXRoIHwgSW50ZXJmYWNlVGFyZ2V0O1xuICBwcml2YXRlIFtERVNUSU5BVElPTl06IERpclBhdGg7XG4gIHByaXZhdGUgW0JBU0VfRElSXTogRGlyUGF0aCB8IG51bGw7XG5cbiAgcHJpdmF0ZSBjb25zdHJ1Y3RvcihzY29wZTogU3lzdGVtU2NvcGUsIHZhbHVlOiBzdHJpbmcgfCBBYnNvbHV0ZVBhdGggfCBJbnRlcmZhY2VUYXJnZXQsIHBhcmFtczogc3RyaW5nIHwgYW55KSB7XG4gICAgbGV0IGRlc3RpbmF0aW9uOiBzdHJpbmd8QWJzb2x1dGVQYXRofHVuZGVmaW5lZDtcbiAgICBsZXQgYmFzZURpcjtcbiAgICBpZiAodHlwZW9mIHBhcmFtcyA9PT0gXCJzdHJpbmdcIilcbiAgICAgIGRlc3RpbmF0aW9uID0gcGFyYW1zO1xuICAgIGVsc2UgaWYgKHBhcmFtcykge1xuICAgICAgZGVzdGluYXRpb24gPSBwYXJhbXMuZGVzdGluYXRpb247XG4gICAgICBiYXNlRGlyID0gcGFyYW1zLmJhc2VEaXI7XG4gICAgfVxuICBcbiAgICBpZiAoIWRlc3RpbmF0aW9uKVxuICAgICAgdGhyb3cgbmV3IEVycm9yKGBQYXJhbWV0ZXIgZGVzdGluYXRpb24gaXMgbm90IHNwZWNpZmllZGApO1xuICBcbiAgICBpZiAoYmFzZURpcilcbiAgICAgIGJhc2VEaXIgPSBzY29wZS5TT1VSQ0VfRElSLnJlc29sdmUoYmFzZURpcik7XG4gIFxuICAgIGlmICh0eXBlb2YgdmFsdWUgPT09IFwic3RyaW5nXCIgfHwgdmFsdWUgaW5zdGFuY2VvZiBBYnNvbHV0ZVBhdGgpIHtcbiAgICAgIHZhbHVlID0gc2NvcGUuU09VUkNFX0RJUi5yZXNvbHZlKHZhbHVlLnRvU3RyaW5nKCkpIGFzIEFic29sdXRlUGF0aDtcbiAgICAgIHZhbHVlID0gRmlsZVBhdGguY3JlYXRlKHZhbHVlKTtcbiAgICAgIGJhc2VEaXIgPSBiYXNlRGlyIHx8IHZhbHVlLmRpcm5hbWUoKTtcbiAgICB9XG4gICAgZWxzZSBpZiAoISh2YWx1ZSBpbnN0YW5jZW9mIEludGVyZmFjZVRhcmdldCkpIHtcbiAgICAgIHRocm93IG5ldyBFcnJvcihgTm90IHN1cHBvcnRldCB2YWx1ZSBvZiAke3ZhbHVlfWApO1xuICAgIH1cbiAgXG4gICAgdGhpc1tWQUxVRV0gPSB2YWx1ZTtcbiAgICB0aGlzW0RFU1RJTkFUSU9OXSA9IERpclBhdGguY3JlYXRlKHNjb3BlLklOU1RBTExfUFJFRklYLnJlc29sdmUoZGVzdGluYXRpb24udG9TdHJpbmcoKSkudG9TdHJpbmcoKSk7XG4gICAgdGhpc1tCQVNFX0RJUl0gPSBiYXNlRGlyID8gRGlyUGF0aC5jcmVhdGUoYmFzZURpci50b1N0cmluZygpKSA6IG51bGw7XG4gIH1cbiAgXG4gIHB1YmxpYyBzdGF0aWMgY3JlYXRlKHNjb3BlOiBhbnksIHZhbHVlOiBzdHJpbmcgfCBBYnNvbHV0ZVBhdGggfCBJbnRlcmZhY2VUYXJnZXQsIHBhcmFtczogc3RyaW5nIHwgYW55KSB7XG4gICAgcmV0dXJuIE9iamVjdC5zZWFsKG5ldyBJbnN0YWxsRW50aXR5KHNjb3BlLCB2YWx1ZSwgcGFyYW1zKSk7XG4gIH1cblxuICBwdWJsaWMgZ2V0IFZBTFVFICgpIHtcbiAgICByZXR1cm4gdGhpc1tWQUxVRV07XG4gIH1cblxuICBwdWJsaWMgZ2V0IERFU1RJTkFUSU9OICgpIHtcbiAgICByZXR1cm4gdGhpc1tERVNUSU5BVElPTl07XG4gIH1cblxuICBwdWJsaWMgZ2V0IEJBU0VfRElSICgpIHtcbiAgICByZXR1cm4gdGhpc1tCQVNFX0RJUl07XG4gIH1cblxuICBwdWJsaWMgdG9KU09OKCk6IG9iamVjdCB7XG4gICAgcmV0dXJuIHtcbiAgICAgIFZBTFVFOiB0aGlzLlZBTFVFLFxuICAgICAgREVTVElOQVRJT046IHRoaXMuREVTVElOQVRJT04sXG4gICAgICBCQVNFX0RJUjogdGhpcy5CQVNFX0RJUixcbiAgICB9O1xuICB9XG59O1xuIiwiLypcbiAqIE1JVCBMaWNlbnNlXG4gKlxuICogQ29weXJpZ2h0IChjKSAyMDI1ICBZdXJpaSBZYWt1YmluICh5dXJpaS55YWt1YmluQGdtYWlsLmNvbSlcbiAqXG4gKiBQZXJtaXNzaW9uIGlzIGdyYW50ZWQgdG8gdXNlLCBjb3B5LCBtb2RpZnksIGFuZCBkaXN0cmlidXRlIHRoaXMgc29mdHdhcmVcbiAqIHVuZGVyIHRoZSBNSVQgTGljZW5zZS4gU2VlIExJQ0VOU0UgZmlsZSBmb3IgZGV0YWlscy5cbiAqL1xuXG5jb25zdCBOQU1FID0gU3ltYm9sKFwiTkFNRVwiKTtcblxuZXhwb3J0IGNsYXNzIEludGVyZmFjZUluY2x1ZGVzIHtcbiAgcHJpdmF0ZSBbTkFNRV06IHN0cmluZztcblxuICBwcml2YXRlIGNvbnN0cnVjdG9yKG5hbWU6IHN0cmluZykge1xuICAgIHRoaXNbTkFNRV0gPSBuYW1lO1xuICB9XG5cbiAgcHVibGljIGdldCB0YXJnZXROYW1lKCkge1xuICAgIHJldHVybiB0aGlzW05BTUVdO1xuICB9XG5cbiAgcHVibGljIHRvU3RyaW5nKCk6IHN0cmluZyB7XG4gICAgcmV0dXJuIFwiJHtcIiArIHRoaXNbTkFNRV0gKyBcIi5pbmNsdWRlc31cIjtcbiAgfVxuXG4gIHB1YmxpYyB0b0pTT04oKSB7XG4gICAgcmV0dXJuIHRoaXMudG9TdHJpbmcoKTtcbiAgfVxuXG4gIHB1YmxpYyBzdGF0aWMgY3JlYXRlKG5hbWU6IHN0cmluZykge1xuICAgIHJldHVybiBPYmplY3Quc2VhbChuZXcgSW50ZXJmYWNlSW5jbHVkZXMobmFtZSkpO1xuICB9XG5cbiAgcHVibGljIHN0YXRpYyBlbnN1cmVJbnN0YW5jZSh2YWx1ZTogYW55KSB7XG4gICAgaWYgKHZhbHVlIGluc3RhbmNlb2YgSW50ZXJmYWNlSW5jbHVkZXMpXG4gICAgICByZXR1cm4gdmFsdWU7XG4gICAgdGhyb3cgbmV3IEVycm9yKGBUaGUgJyR7dmFsdWV9JyBpcyBub3QgYSBJbnRlcmZhY2VJbmNsdWRlc2ApO1xuICB9XG59O1xuIiwiLypcbiAqIE1JVCBMaWNlbnNlXG4gKlxuICogQ29weXJpZ2h0IChjKSAyMDI1ICBZdXJpaSBZYWt1YmluICh5dXJpaS55YWt1YmluQGdtYWlsLmNvbSlcbiAqXG4gKiBQZXJtaXNzaW9uIGlzIGdyYW50ZWQgdG8gdXNlLCBjb3B5LCBtb2RpZnksIGFuZCBkaXN0cmlidXRlIHRoaXMgc29mdHdhcmVcbiAqIHVuZGVyIHRoZSBNSVQgTGljZW5zZS4gU2VlIExJQ0VOU0UgZmlsZSBmb3IgZGV0YWlscy5cbiAqL1xuXG5jb25zdCBOQU1FID0gU3ltYm9sKFwiTkFNRVwiKTtcblxuZXhwb3J0IGNsYXNzIEludGVyZmFjZU9iamVjdHMge1xuICBwcml2YXRlIFtOQU1FXTogc3RyaW5nO1xuXG4gIHByaXZhdGUgY29uc3RydWN0b3IobmFtZTogc3RyaW5nKSB7XG4gICAgdGhpc1tOQU1FXSA9IG5hbWU7XG4gIH1cblxuICBwdWJsaWMgc3RhdGljIGNyZWF0ZShuYW1lOiBzdHJpbmcpIHtcbiAgICByZXR1cm4gT2JqZWN0LnNlYWwobmV3IEludGVyZmFjZU9iamVjdHMobmFtZSkpO1xuICB9XG5cbiAgcHVibGljIHN0YXRpYyBlbnN1cmVJbnN0YW5jZSh2YWx1ZTogYW55KTogSW50ZXJmYWNlT2JqZWN0cyB7XG4gICAgaWYgKHZhbHVlIGluc3RhbmNlb2YgSW50ZXJmYWNlT2JqZWN0cylcbiAgICAgIHJldHVybiB2YWx1ZTtcbiAgICB0aHJvdyBuZXcgRXJyb3IoYFRoZSAnJHt2YWx1ZX0nIGlzIG5vdCBhIEludGVyZmFjZU9iamVjdHNgKTtcbiAgfVxuXG4gIHB1YmxpYyBnZXQgdGFyZ2V0TmFtZSgpOiBzdHJpbmcge1xuICAgIHJldHVybiB0aGlzW05BTUVdO1xuICB9XG5cbiAgcHVibGljIHRvU3RyaW5nKCk6IHN0cmluZyB7XG4gICAgcmV0dXJuIFwiJHtcIiArIHRoaXNbTkFNRV0gKyBcIi5vYmplY3RzfVwiO1xuICB9XG5cbiAgcHVibGljIHRvSlNPTigpOiBzdHJpbmcge1xuICAgIHJldHVybiB0aGlzLnRvU3RyaW5nKCk7XG4gIH1cbn07XG4iLCIvKlxuICogTUlUIExpY2Vuc2VcbiAqXG4gKiBDb3B5cmlnaHQgKGMpIDIwMjUgIFl1cmlpIFlha3ViaW4gKHl1cmlpLnlha3ViaW5AZ21haWwuY29tKVxuICpcbiAqIFBlcm1pc3Npb24gaXMgZ3JhbnRlZCB0byB1c2UsIGNvcHksIG1vZGlmeSwgYW5kIGRpc3RyaWJ1dGUgdGhpcyBzb2Z0d2FyZVxuICogdW5kZXIgdGhlIE1JVCBMaWNlbnNlLiBTZWUgTElDRU5TRSBmaWxlIGZvciBkZXRhaWxzLlxuICovXG5cbmNvbnN0IE5BTUUgICAgICAgPSBTeW1ib2woXCJOQU1FXCIpO1xuY29uc3QgUFJPUEVSVElFUyA9IFN5bWJvbChcIlBST1BFUlRJRVNcIik7XG5cbnR5cGUgU2NyaXB0UHJvcGVydGllcyA9IHtcbiAgW25hbWU6IHN0cmluZ106IGFueVtdO1xufTtcblxuZXhwb3J0IGNsYXNzIEludGVyZmFjZVNjcmlwdCB7XG4gIHByaXZhdGUgW05BTUVdOiBzdHJpbmc7XG4gIHByaXZhdGUgW1BST1BFUlRJRVNdOiBTY3JpcHRQcm9wZXJ0aWVzO1xuXG4gIHByaXZhdGUgY29uc3RydWN0b3IobmFtZTogc3RyaW5nKSB7XG4gICAgdGhpc1tOQU1FXSA9IG5hbWU7XG4gICAgdGhpc1tQUk9QRVJUSUVTXSA9IHt9O1xuICB9XG5cbiAgcHVibGljIGdldCBOQU1FKCkge1xuICAgIHJldHVybiB0aGlzW05BTUVdO1xuICB9XG5cbiAgcHVibGljIGdldCBQUk9QRVJUSUVTKCkge1xuICAgIHJldHVybiB0aGlzW1BST1BFUlRJRVNdO1xuICB9XG4gIFxuICBwdWJsaWMgYWRkUHJvcGVydHkoa2V5OiBzdHJpbmcsIC4uLnZhbHM6IGFueVtdKSB7XG4gICAgbGV0IHByb3BlcnR5ID0gdGhpc1tQUk9QRVJUSUVTXVtrZXldO1xuICAgIGlmICghcHJvcGVydHkpIHtcbiAgICAgIHByb3BlcnR5ID0gW107XG4gICAgICB0aGlzW1BST1BFUlRJRVNdW2tleV0gPSBwcm9wZXJ0eTtcbiAgICB9XG4gICAgdmFscy5mb3JFYWNoKHYgPT4gcHJvcGVydHkucHVzaCh2KSk7XG4gIH1cblxuICBwdWJsaWMgdG9KU09OKCk6IG9iamVjdCB7XG4gICAgcmV0dXJuIHtcbiAgICAgIE5BTUU6IHRoaXMuTkFNRSxcbiAgICAgIFBST1BFUlRJRVM6IHRoaXMuUFJPUEVSVElFUyxcbiAgICB9O1xuICB9XG4gIFxuICBwdWJsaWMgdG9TdHJpbmcoKTogc3RyaW5nIHtcbiAgICByZXR1cm4gdGhpc1tOQU1FXTtcbiAgfVxuXG4gIHB1YmxpYyBzdGF0aWMgY3JlYXRlKG5hbWU6IHN0cmluZykge1xuICAgIHJldHVybiBPYmplY3Quc2VhbChuZXcgSW50ZXJmYWNlU2NyaXB0KG5hbWUpKTtcbiAgfVxuXG4gIHB1YmxpYyBzdGF0aWMgZW5zdXJlSW5zdGFuY2UodmFsdWU6IGFueSkge1xuICAgIGlmICh2YWx1ZSBpbnN0YW5jZW9mIEludGVyZmFjZVNjcmlwdClcbiAgICAgIHJldHVybiB2YWx1ZTtcbiAgICB0aHJvdyBuZXcgRXJyb3IoYFRoZSAnJHt2YWx1ZX0nIGlzIG5vdCBhIEludGVyZmFjZVNjcmlwdGApO1xuICB9XG59O1xuIiwiLypcbiAqIE1JVCBMaWNlbnNlXG4gKlxuICogQ29weXJpZ2h0IChjKSAyMDI1ICBZdXJpaSBZYWt1YmluICh5dXJpaS55YWt1YmluQGdtYWlsLmNvbSlcbiAqXG4gKiBQZXJtaXNzaW9uIGlzIGdyYW50ZWQgdG8gdXNlLCBjb3B5LCBtb2RpZnksIGFuZCBkaXN0cmlidXRlIHRoaXMgc29mdHdhcmVcbiAqIHVuZGVyIHRoZSBNSVQgTGljZW5zZS4gU2VlIExJQ0VOU0UgZmlsZSBmb3IgZGV0YWlscy5cbiAqL1xuXG5pbXBvcnQgeyBBYnNvbHV0ZVBhdGggfSBmcm9tIFwiQC9jb3JlL1BhdGhcIjtcbmltcG9ydCB7IEludGVyZmFjZUluY2x1ZGVzIH0gZnJvbSBcIkAvY29yZS9JbnRlcmZhY2VJbmNsdWRlc1wiO1xuaW1wb3J0IHsgSW50ZXJmYWNlT2JqZWN0cyB9IGZyb20gXCJAL2NvcmUvSW50ZXJmYWNlT2JqZWN0c1wiO1xuaW1wb3J0IHsgSW5jbHVkZURpcmVjdG9yeSB9IGZyb20gXCJAL2NvcmUvSW5jbHVkZURpcmVjdG9yeVwiO1xuaW1wb3J0IHsgU291cmNlRmlsZSB9IGZyb20gXCJAL2NvcmUvU291cmNlRmlsZVwiO1xuaW1wb3J0IHsgU3lzdGVtU2NvcGUgfSBmcm9tIFwiQC9jb3JlL1N5c3RlbVNjb3BlXCI7XG5pbXBvcnQgeyBTY29wZUhlbHBlciB9IGZyb20gXCJAL2NvcmUvU2NvcGVcIjtcblxuY29uc3QgVU5LTk9XTl9UQVJHRVQgPSBTeW1ib2woXCJVTktOT1dOX1RBUkdFVFwiKTtcbmNvbnN0IFNDT1BFID0gU3ltYm9sKFwiU0NPUEVcIik7XG5cbmV4cG9ydCBjbGFzcyBJbnRlcmZhY2VUYXJnZXQge1xuICBwcml2YXRlIFtTQ09QRV06IFN5c3RlbVNjb3BlO1xuICBwcml2YXRlIFtVTktOT1dOX1RBUkdFVF06IGFueTtcblxuICBwcml2YXRlIGNvbnN0cnVjdG9yKHNjb3BlOiBhbnksIHV0YXJnZXQ6IGFueSkge1xuICAgIHRoaXNbU0NPUEVdID0gU2NvcGVIZWxwZXIuY2xvbmUoe30sIHNjb3BlKTtcbiAgICB0aGlzW1VOS05PV05fVEFSR0VUXSA9IHV0YXJnZXQ7XG4gIH1cblxuICBwdWJsaWMgc3RhdGljIGNyZWF0ZShzY29wZTogYW55LCB1dGFyZ2V0OiBhbnkpIHtcbiAgICByZXR1cm4gT2JqZWN0LnNlYWwobmV3IEludGVyZmFjZVRhcmdldChzY29wZSwgdXRhcmdldCkpO1xuICB9XG5cbiAgcHVibGljIHN0YXRpYyBlbnN1cmVJbnN0YW5jZSh2YWx1ZTogYW55KSB7XG4gICAgaWYgKHZhbHVlIGluc3RhbmNlb2YgSW50ZXJmYWNlVGFyZ2V0KVxuICAgICAgcmV0dXJuIHZhbHVlO1xuICAgIHRocm93IG5ldyBFcnJvcihgVGhlICcke3ZhbHVlfScgaXMgbm90IGEgSW50ZXJmYWNlVGFyZ2V0YCk7XG4gIH1cblxuICBwdWJsaWMgZ2V0IHRhcmdldE5hbWUoKTogc3RyaW5nIHtcbiAgICByZXR1cm4gdGhpc1tVTktOT1dOX1RBUkdFVF0uTkFNRTtcbiAgfVxuXG4gIHB1YmxpYyBnZXQgaW5jbHVkZXMoKTogSW50ZXJmYWNlSW5jbHVkZXMge1xuICAgIHJldHVybiBJbnRlcmZhY2VJbmNsdWRlcy5jcmVhdGUodGhpcy50YXJnZXROYW1lKTtcbiAgfVxuXG4gIHB1YmxpYyBnZXQgb2JqZWN0cygpOiBJbnRlcmZhY2VPYmplY3RzIHtcbiAgICByZXR1cm4gSW50ZXJmYWNlT2JqZWN0cy5jcmVhdGUodGhpcy50YXJnZXROYW1lKTtcbiAgfVxuXG4gIHB1YmxpYyB0b0pTT04oKTogc3RyaW5nIHtcbiAgICByZXR1cm4gdGhpcy50b1N0cmluZygpO1xuICB9XG5cbiAgcHVibGljIHRvU3RyaW5nKCk6IHN0cmluZyB7XG4gICAgcmV0dXJuIFwiJHtcIiArIHRoaXMudGFyZ2V0TmFtZSArIFwifVwiO1xuICB9XG5cbiAgcHVibGljIGFkZFNvdXJjZXMoLi4uc291cmNlczogQXJyYXk8SW50ZXJmYWNlT2JqZWN0c3xTb3VyY2VGaWxlfEFic29sdXRlUGF0aHxzdHJpbmc+KTogdm9pZCB7XG4gICAgZm9yIChsZXQgaXQgb2Ygc291cmNlcy5mbGF0KDEpKSB7XG4gICAgICBpZiAoaXQgaW5zdGFuY2VvZiBJbnRlcmZhY2VPYmplY3RzIHx8IGl0IGluc3RhbmNlb2YgU291cmNlRmlsZSlcbiAgICAgICAge31cbiAgICAgIGVsc2UgaWYgKHR5cGVvZiBpdCA9PT0gXCJzdHJpbmdcIiB8fCBBYnNvbHV0ZVBhdGguaXNBYnNvbHV0ZShpdCkpXG4gICAgICAgIGl0ID0gU291cmNlRmlsZS5jcmVhdGUodGhpc1tTQ09QRV0sIGl0KTtcbiAgICAgIGVsc2VcbiAgICAgICAgdGhyb3cgbmV3IEVycm9yKGBOb3Qgc3VwcG9ydCBpbnN0YW5jZSAke2l0fWApO1xuICAgICAgdGhpc1tVTktOT1dOX1RBUkdFVF0uU09VUkNFUy5wdXNoKGl0KTtcbiAgICB9XG4gIH1cblxuICBwdWJsaWMgYWRkSW5jbHVkZXMoLi4uaW5jbHVkZXM6IEFycmF5PEludGVyZmFjZUluY2x1ZGVzfEFic29sdXRlUGF0aHxzdHJpbmc+KTogdm9pZCB7XG4gICAgZm9yIChjb25zdCBpdCBvZiBpbmNsdWRlcy5mbGF0KDEpKSB7XG4gICAgICBsZXQgVkFMVUU7XG4gICAgICBpZiAoaXQgaW5zdGFuY2VvZiBJbnRlcmZhY2VJbmNsdWRlcylcbiAgICAgICAgVkFMVUUgPSBpdDtcbiAgICAgIGVsc2UgaWYgKHR5cGVvZiBpdCA9PT0gXCJzdHJpbmdcIiB8fCBBYnNvbHV0ZVBhdGguaXNBYnNvbHV0ZShpdCkpXG4gICAgICAgIFZBTFVFID0gSW5jbHVkZURpcmVjdG9yeS5jcmVhdGUoaXQsIHRoaXNbU0NPUEVdLlNPVVJDRV9ESVIpO1xuICAgICAgZWxzZVxuICAgICAgICB0aHJvdyBuZXcgRXJyb3IoYE5vdCBzdXBwb3J0IGluc3RhbmNlICR7aXR9YCk7XG4gICAgICB0aGlzW1VOS05PV05fVEFSR0VUXS5JTkNMVURFUy5wdXNoKHsgVkFMVUUsIFBVQkxJQ19PTkxZOiBmYWxzZSB9KTtcbiAgICB9XG4gIH1cblxuICBwdWJsaWMgYWRkUHVibGljSW5jbHVkZXMoLi4uaW5jbHVkZXM6IEFycmF5PEludGVyZmFjZUluY2x1ZGVzfEFic29sdXRlUGF0aHxzdHJpbmc+KTogdm9pZCB7XG4gICAgZm9yIChjb25zdCBpdCBvZiBpbmNsdWRlcy5mbGF0KDEpKSB7XG4gICAgICBsZXQgVkFMVUU7XG4gICAgICBpZiAoaXQgaW5zdGFuY2VvZiBJbnRlcmZhY2VJbmNsdWRlcylcbiAgICAgICAgVkFMVUUgPSBpdDtcbiAgICAgIGVsc2UgaWYgKHR5cGVvZiBpdCA9PT0gXCJzdHJpbmdcIiB8fCBBYnNvbHV0ZVBhdGguaXNBYnNvbHV0ZShpdCkpXG4gICAgICAgIFZBTFVFID0gSW5jbHVkZURpcmVjdG9yeS5jcmVhdGUoaXQsIHRoaXNbU0NPUEVdLlNPVVJDRV9ESVIpO1xuICAgICAgZWxzZVxuICAgICAgICB0aHJvdyBuZXcgRXJyb3IoYE5vdCBzdXBwb3J0IGluc3RhbmNlICR7aXR9YCk7XG4gICAgICB0aGlzW1VOS05PV05fVEFSR0VUXS5JTkNMVURFUy5wdXNoKHsgVkFMVUUsIFBVQkxJQ19PTkxZOiB0cnVlIH0pO1xuICAgIH1cbiAgfVxuXG4gIHB1YmxpYyBhZGREZWZpbml0aW9ucyguLi5kZWZpbml0aW9uczogc3RyaW5nW10pOiB2b2lkIHtcbiAgICBmb3IgKGNvbnN0IFZBTFVFIG9mIGRlZmluaXRpb25zLmZsYXQoMSkpXG4gICAgICB0aGlzW1VOS05PV05fVEFSR0VUXS5ERUZJTkVTLnB1c2goeyBWQUxVRSB9KTtcbiAgfVxuXG4gIHB1YmxpYyBhZGRQdWJsaWNEZWZpbml0aW9ucyguLi5kZWZpbml0aW9uczogc3RyaW5nW10pOiB2b2lkIHtcbiAgICBmb3IgKGNvbnN0IFZBTFVFIG9mIGRlZmluaXRpb25zLmZsYXQoMSkpXG4gICAgICB0aGlzW1VOS05PV05fVEFSR0VUXS5ERUZJTkVTLnB1c2goeyBWQUxVRSwgUFVCTElDX09OTFk6IHRydWUgfSk7XG4gIH1cblxuICBwdWJsaWMgYWRkQ29tcGlsZU9wdGlvbnMoLi4ub3B0aW9uczogc3RyaW5nW10pOiB2b2lkIHtcbiAgICBmb3IgKGNvbnN0IGl0IG9mIG9wdGlvbnMuZmxhdCgxKSkge1xuICAgICAgdGhpc1tVTktOT1dOX1RBUkdFVF0uQ09NUElMRV9PUFRJT05TLnB1c2goeyBWQUxVRTogaXQgfSk7XG4gICAgfVxuICB9XG5cbiAgcHVibGljIGFkZExpbmtPcHRpb25zKC4uLm9wdGlvbnM6IHN0cmluZ1tdKTogdm9pZCB7XG4gICAgZm9yIChjb25zdCBpdCBvZiBvcHRpb25zLmZsYXQoMSkpIHtcbiAgICAgIHRoaXNbVU5LTk9XTl9UQVJHRVRdLkxJTktfT1BUSU9OUy5wdXNoKHsgVkFMVUU6IGl0IH0pO1xuICAgIH1cbiAgfVxuXG4gIHB1YmxpYyBhZGRQdWJsaWNDb21waWxlT3B0aW9ucyguLi5vcHRpb25zOiBzdHJpbmdbXSk6IHZvaWQge1xuICAgIGZvciAoY29uc3QgaXQgb2Ygb3B0aW9ucy5mbGF0KDEpKSB7XG4gICAgICB0aGlzW1VOS05PV05fVEFSR0VUXS5DT01QSUxFX09QVElPTlMucHVzaCh7IFZBTFVFOiBpdCwgUFVCTElDX09OTFk6IHRydWUgfSk7XG4gICAgfVxuICB9XG5cbiAgcHVibGljIGFkZFB1YmxpY0xpbmtPcHRpb25zKC4uLm9wdGlvbnM6IHN0cmluZ1tdKTogdm9pZCB7XG4gICAgZm9yIChjb25zdCBpdCBvZiBvcHRpb25zLmZsYXQoMSkpIHtcbiAgICAgIHRoaXNbVU5LTk9XTl9UQVJHRVRdLkxJTktfT1BUSU9OUy5wdXNoKHsgVkFMVUU6IGl0LCBQVUJMSUNfT05MWTogdHJ1ZSB9KTtcbiAgICB9XG4gIH1cbn07XG4iLCIvKlxuICogTUlUIExpY2Vuc2VcbiAqXG4gKiBDb3B5cmlnaHQgKGMpIDIwMjUgIFl1cmlpIFlha3ViaW4gKHl1cmlpLnlha3ViaW5AZ21haWwuY29tKVxuICpcbiAqIFBlcm1pc3Npb24gaXMgZ3JhbnRlZCB0byB1c2UsIGNvcHksIG1vZGlmeSwgYW5kIGRpc3RyaWJ1dGUgdGhpcyBzb2Z0d2FyZVxuICogdW5kZXIgdGhlIE1JVCBMaWNlbnNlLiBTZWUgTElDRU5TRSBmaWxlIGZvciBkZXRhaWxzLlxuICovXG5cbmltcG9ydCBwYXRoIGZyb20gXCJub2RlOnBhdGhcIjtcbmltcG9ydCB1cmwgZnJvbSBcIm5vZGU6dXJsXCI7XG5cbmNvbnN0IFBBVEggPSBTeW1ib2woXCJQQVRIXCIpO1xuXG5jb25zdCBfcGF0aHMgPSBuZXcgTWFwPHN0cmluZywgRGlyUGF0aCB8IEZpbGVQYXRoPigpO1xuXG5leHBvcnQgY2xhc3MgQWJzb2x1dGVQYXRoIHtcbiAgcHJpdmF0ZSBbUEFUSF06IHN0cmluZztcblxuICBwcm90ZWN0ZWQgY29uc3RydWN0b3IoZmlsZXBhdGg6IHN0cmluZykge1xuICAgIGlmICghcGF0aC5pc0Fic29sdXRlKGZpbGVwYXRoKSlcbiAgICAgIHRocm93IG5ldyBFcnJvcihgTm90IHN1cHBvcnRlZCByZWxhdGl2ZSBwYXRoIG9mIFwiJHtmaWxlcGF0aH1cImApO1xuICAgIHRoaXNbUEFUSF0gPSBmaWxlcGF0aDtcbiAgfVxuXG4gIHB1YmxpYyBqb2luKC4uLnBhdGhzOiBBcnJheTxBYnNvbHV0ZVBhdGggfCBzdHJpbmc+KSB7XG4gICAgY29uc3QgZmlsZXBhdGggPSBwYXRoLnBvc2l4LmpvaW4odGhpc1tQQVRIXSwgLi4ucGF0aHMubWFwKGkgPT4gaS50b1N0cmluZygpKSk7XG4gICAgcmV0dXJuIEFic29sdXRlUGF0aC5jcmVhdGUoZmlsZXBhdGgpO1xuICB9XG5cbiAgcHVibGljIGRpcm5hbWUoKSB7XG4gICAgcmV0dXJuIERpclBhdGguY3JlYXRlKHBhdGgucG9zaXguZGlybmFtZSh0aGlzW1BBVEhdKSk7XG4gIH1cblxuICBwdWJsaWMgYmFzZW5hbWUoKSB7XG4gICAgcmV0dXJuIHBhdGguYmFzZW5hbWUodGhpc1tQQVRIXSk7XG4gIH1cblxuICBwdWJsaWMgcmVsYXRpdmUodG86IEFic29sdXRlUGF0aCB8IHN0cmluZykge1xuICAgIHJldHVybiBwYXRoLnBvc2l4LnJlbGF0aXZlKHRoaXNbUEFUSF0sICh0byBpbnN0YW5jZW9mIEFic29sdXRlUGF0aCkgPyB0b1tQQVRIXSA6IHRvKTtcbiAgfVxuXG4gIHB1YmxpYyByZXNvbHZlKC4uLnBhdGhzOiBBcnJheTxBYnNvbHV0ZVBhdGggfCBzdHJpbmc+KSB7XG4gICAgcmV0dXJuIEFic29sdXRlUGF0aC5jcmVhdGUocGF0aC5wb3NpeC5yZXNvbHZlKHRoaXNbUEFUSF0sIC4uLnBhdGhzLm1hcChpID0+IGkudG9TdHJpbmcoKSkpKTtcbiAgfVxuXG4gIHB1YmxpYyBtYXRjaChyZWdleHA6IFJlZ0V4cCkge1xuICAgIHJldHVybiB0aGlzW1BBVEhdLm1hdGNoKHJlZ2V4cCk7XG4gIH1cblxuICBwdWJsaWMgdG9VUkwoKSB7XG4gICAgcmV0dXJuIHVybC5wYXRoVG9GaWxlVVJMKHRoaXNbUEFUSF0pO1xuICB9XG5cbiAgcHVibGljIHRvVVJMU3RyaW5nKCkge1xuICAgIHJldHVybiB0aGlzLnRvVVJMKCkudG9TdHJpbmcoKTtcbiAgfVxuXG4gIHB1YmxpYyB0b1N0cmluZygpIHtcbiAgICByZXR1cm4gdGhpc1tQQVRIXTtcbiAgfVxuXG4gIHB1YmxpYyB2YWx1ZU9mKCkge1xuICAgIHJldHVybiB0aGlzW1BBVEhdO1xuICB9XG5cbiAgcHVibGljIHRvSlNPTigpIHtcbiAgICByZXR1cm4gdGhpc1tQQVRIXTtcbiAgfVxuXG4gIHB1YmxpYyBzdGF0aWMgaXNBYnNvbHV0ZShmaWxlcGF0aDogQWJzb2x1dGVQYXRoIHwgc3RyaW5nKSB7XG4gICAgaWYgKGZpbGVwYXRoIGluc3RhbmNlb2YgQWJzb2x1dGVQYXRoKVxuICAgICAgcmV0dXJuIHRydWU7XG4gICAgcmV0dXJuIHBhdGguaXNBYnNvbHV0ZShmaWxlcGF0aCk7XG4gIH1cblxuICBwdWJsaWMgc3RhdGljIGVuc3VyZUluc3RhbmNlKHZhbHVlOiBhbnkpOiBBYnNvbHV0ZVBhdGgge1xuICAgIGlmICh2YWx1ZSBpbnN0YW5jZW9mIEFic29sdXRlUGF0aClcbiAgICAgIHJldHVybiB2YWx1ZTtcbiAgICB0aHJvdyBuZXcgRXJyb3IoYFRoZSAnJHt2YWx1ZX0nIGlzIG5vdCBhIEFic29sdXRlUGF0aGApO1xuICB9XG5cbiAgcHVibGljIHN0YXRpYyBjcmVhdGUocGF0aDogQWJzb2x1dGVQYXRoIHwgc3RyaW5nKTogQWJzb2x1dGVQYXRoIHwgRGlyUGF0aCB8IEZpbGVQYXRoIHtcbiAgICBjb25zdCByZXN1bHQgPSBfcGF0aHMuZ2V0KHBhdGgudG9TdHJpbmcoKSk7XG4gICAgaWYgKHJlc3VsdClcbiAgICAgIHJldHVybiByZXN1bHQ7XG5cbiAgICBpZiAocGF0aCBpbnN0YW5jZW9mIEFic29sdXRlUGF0aClcbiAgICAgIHJldHVybiBwYXRoO1xuXG4gICAgcmV0dXJuIE9iamVjdC5zZWFsKG5ldyBBYnNvbHV0ZVBhdGgocGF0aCkpO1xuICB9XG59O1xuXG5leHBvcnQgY2xhc3MgRmlsZVBhdGggZXh0ZW5kcyBBYnNvbHV0ZVBhdGgge1xuICBwcml2YXRlIGNvbnN0cnVjdG9yKHBhdGhTdHI6IHN0cmluZykge1xuICAgIHN1cGVyKHBhdGhTdHIpO1xuICB9XG5cbiAgcHVibGljIHN0YXRpYyBlbnN1cmVJbnN0YW5jZSh2YWx1ZTogYW55KTogRmlsZVBhdGgge1xuICAgIGlmICh2YWx1ZSBpbnN0YW5jZW9mIEZpbGVQYXRoKVxuICAgICAgcmV0dXJuIHZhbHVlO1xuICAgIHRocm93IG5ldyBFcnJvcihgVGhlICcke3ZhbHVlfScgaXMgbm90IGEgRmlsZVBhdGhgKTtcbiAgfVxuICBcbiAgcHVibGljIHN0YXRpYyBjcmVhdGUocGF0aDogYW55KTogRmlsZVBhdGgge1xuICAgIGlmIChwYXRoIGluc3RhbmNlb2YgRmlsZVBhdGgpXG4gICAgICByZXR1cm4gcGF0aDtcblxuICAgIGlmIChwYXRoIGluc3RhbmNlb2YgQWJzb2x1dGVQYXRoKVxuICAgICAgcGF0aCA9IHBhdGgudG9TdHJpbmcoKTtcblxuICAgIGlmICh0eXBlb2YgcGF0aCAhPT0gXCJzdHJpbmdcIilcbiAgICAgIHRocm93IG5ldyBFcnJvcihgVGhlICcke3BhdGh9JyBpcyBub3QgYSBzdHJpbmdgKTtcblxuICAgIGxldCBmaWxlUGF0aCA9IF9wYXRocy5nZXQocGF0aCk7XG4gICAgaWYgKGZpbGVQYXRoKVxuICAgICAgcmV0dXJuIEZpbGVQYXRoLmVuc3VyZUluc3RhbmNlKGZpbGVQYXRoKTtcblxuICAgIGZpbGVQYXRoID0gT2JqZWN0LnNlYWwobmV3IEZpbGVQYXRoKHBhdGgpKTtcbiAgICBfcGF0aHMuc2V0KHBhdGgsIGZpbGVQYXRoKTtcblxuICAgIHJldHVybiBmaWxlUGF0aDtcbiAgfVxufVxuXG5leHBvcnQgY2xhc3MgRGlyUGF0aCBleHRlbmRzIEFic29sdXRlUGF0aCB7XG4gIHByaXZhdGUgY29uc3RydWN0b3IocGF0aFN0cjogc3RyaW5nKSB7XG4gICAgc3VwZXIocGF0aFN0cik7XG4gIH1cblxuICBwdWJsaWMgc3RhdGljIGVuc3VyZUluc3RhbmNlKHZhbHVlOiBhbnkpOiBEaXJQYXRoIHtcbiAgICBpZiAodmFsdWUgaW5zdGFuY2VvZiBEaXJQYXRoKVxuICAgICAgcmV0dXJuIHZhbHVlO1xuICAgIHRocm93IG5ldyBFcnJvcihgVGhlICcke3ZhbHVlfScgaXMgbm90IGEgRGlyUGF0aGApO1xuICB9XG5cbiAgcHVibGljIHN0YXRpYyBjcmVhdGUocGF0aDogYW55KTogRGlyUGF0aCB7XG4gICAgaWYgKHBhdGggaW5zdGFuY2VvZiBEaXJQYXRoKVxuICAgICAgcmV0dXJuIHBhdGg7XG5cbiAgICBpZiAocGF0aCBpbnN0YW5jZW9mIEFic29sdXRlUGF0aClcbiAgICAgIHBhdGggPSBwYXRoLnRvU3RyaW5nKCk7XG5cbiAgICBpZiAodHlwZW9mIHBhdGggIT09IFwic3RyaW5nXCIpXG4gICAgICB0aHJvdyBuZXcgRXJyb3IoYFRoZSAnJHtwYXRofScgaXMgbm90IGEgc3RyaW5nYCk7XG5cbiAgICBsZXQgZGlyUGF0aCA9IF9wYXRocy5nZXQocGF0aCk7XG4gICAgaWYgKGRpclBhdGgpXG4gICAgICByZXR1cm4gRGlyUGF0aC5lbnN1cmVJbnN0YW5jZShkaXJQYXRoKTtcblxuICAgIGRpclBhdGggPSBPYmplY3Quc2VhbChuZXcgRGlyUGF0aChwYXRoKSk7XG4gICAgX3BhdGhzLnNldChwYXRoLCBkaXJQYXRoKTtcblxuICAgIHJldHVybiBkaXJQYXRoO1xuICB9XG59O1xuIiwiLypcbiAqIE1JVCBMaWNlbnNlXG4gKlxuICogQ29weXJpZ2h0IChjKSAyMDI1ICBZdXJpaSBZYWt1YmluICh5dXJpaS55YWt1YmluQGdtYWlsLmNvbSlcbiAqXG4gKiBQZXJtaXNzaW9uIGlzIGdyYW50ZWQgdG8gdXNlLCBjb3B5LCBtb2RpZnksIGFuZCBkaXN0cmlidXRlIHRoaXMgc29mdHdhcmVcbiAqIHVuZGVyIHRoZSBNSVQgTGljZW5zZS4gU2VlIExJQ0VOU0UgZmlsZSBmb3IgZGV0YWlscy5cbiAqL1xuXG5pbXBvcnQgeyBEaXJQYXRoIH0gZnJvbSBcIkAvY29yZS9QYXRoXCI7XG5pbXBvcnQgeyBHbG9iYWxDb250ZXh0IH0gZnJvbSBcIkAvY29yZS9HbG9iYWxDb250ZXh0XCI7XG5pbXBvcnQgeyBTY29wZUhlbHBlciB9IGZyb20gXCJAL2NvcmUvU2NvcGVcIjtcbmltcG9ydCB7IFN5c3RlbVNjb3BlIH0gZnJvbSBcIkAvY29yZS9TeXN0ZW1TY29wZVwiO1xuXG5jb25zdCBHTE9CQUwgPSBTeW1ib2woXCJHTE9CQUxcIik7XG5jb25zdCBTQ09QRSA9IFN5bWJvbChcIlNDT1BFXCIpO1xuXG5leHBvcnQgY2xhc3MgUGx1Z2luQ29udGV4dCB7XG4gIHByaXZhdGUgW1NDT1BFXTogU3lzdGVtU2NvcGU7XG4gIHByaXZhdGUgW0dMT0JBTF06IEdsb2JhbENvbnRleHQ7XG5cbiAgcHJpdmF0ZSBjb25zdHJ1Y3RvcihzY29wZTogU3lzdGVtU2NvcGUsIGdsb2JhbDogYW55KSB7XG4gICAgdGhpc1tTQ09QRV0gPSBzY29wZTtcbiAgICB0aGlzW0dMT0JBTF0gPSBnbG9iYWw7XG4gIH1cblxuICBwdWJsaWMgc3RhdGljIGNyZWF0ZShzY29wZTogU3lzdGVtU2NvcGUsIGdsb2JhbDogR2xvYmFsQ29udGV4dCkge1xuICAgIGNvbnN0IHByb3RvID0gUGx1Z2luQ29udGV4dC5wcm90b3R5cGU7XG4gICAgY29uc3QgbmV3U2NvcGUgPSBPYmplY3QuY3JlYXRlKHByb3RvKTtcbiAgICBTY29wZUhlbHBlci5jbG9uZShuZXdTY29wZSwgc2NvcGUpO1xuICAgIGNvbnN0IHNlbGYgPSBPYmplY3QuY3JlYXRlKG5ld1Njb3BlKTtcbiAgICBzZWxmW1NDT1BFXSA9IG5ld1Njb3BlO1xuICAgIHNlbGZbR0xPQkFMXSA9IGdsb2JhbDtcbiAgICByZXR1cm4gc2VsZjtcbiAgfVxuXG4gIHB1YmxpYyBhZGRTdWJkaXJlY3RvcnlBbGlhcyhzcmM6IGFueSwgZGVzdDogYW55KSB7XG4gICAgdGhpc1tHTE9CQUxdLmFkZFN1YmRpcmVjdG9yeUFsaWFzKERpclBhdGguY3JlYXRlKHNyYyksIERpclBhdGguY3JlYXRlKGRlc3QpKTtcbiAgfVxuXG4gIHB1YmxpYyBfc2NvcGUoKSB7XG4gICAgcmV0dXJuIHRoaXNbU0NPUEVdO1xuICB9XG59O1xuIiwiLypcbiAqIE1JVCBMaWNlbnNlXG4gKlxuICogQ29weXJpZ2h0IChjKSAyMDI1ICBZdXJpaSBZYWt1YmluICh5dXJpaS55YWt1YmluQGdtYWlsLmNvbSlcbiAqXG4gKiBQZXJtaXNzaW9uIGlzIGdyYW50ZWQgdG8gdXNlLCBjb3B5LCBtb2RpZnksIGFuZCBkaXN0cmlidXRlIHRoaXMgc29mdHdhcmVcbiAqIHVuZGVyIHRoZSBNSVQgTGljZW5zZS4gU2VlIExJQ0VOU0UgZmlsZSBmb3IgZGV0YWlscy5cbiAqL1xuXG5pbXBvcnQgeyBlbnN1cmVCb29sZWFuLCBlbnN1cmVTdHJpbmcsIGVuc3VyZU51bWJlciwgZW5zdXJlQXJyYXkgfSBmcm9tIFwiQC91dGlscy9TdHJpY3RUeXBlXCI7XG5pbXBvcnQgeyBEaXJQYXRoLCBGaWxlUGF0aCB9IGZyb20gXCJAL2NvcmUvUGF0aFwiO1xuXG5jb25zdCBERUZJTkVfTUFQID0gU3ltYm9sKFwiREVGSU5FX01BUFwiKTtcblxuZXhwb3J0IG5hbWVzcGFjZSBTY29wZUhlbHBlciB7XG5cbmZ1bmN0aW9uIGRlZmluZVZhcmlhYmxlSW1wbChzY29wZTogYW55LCBncm91cDogc3RyaW5nLCBuYW1lOiBzdHJpbmcsIGRlc2NyaXB0b3I6IGFueSkge1xuICBpZiAobmFtZSA9PT0gXCJERUZJTkVfTUFQXCIpIHtcbiAgICB0aHJvdyBuZXcgRXJyb3IoYCR7bmFtZX0gaXMgcmVzZXJ2ZWQgYW5kIGNhbm5vdCBiZSB1c2VkIGFzIGEgdmFyaWFibGVgKTtcbiAgfVxuXG4gIGlmICghc2NvcGVbREVGSU5FX01BUF0pXG4gICAgc2NvcGVbREVGSU5FX01BUF0gPSB7fTtcblxuICBjb25zdCB0eXBlID0gZGVzY3JpcHRvci50eXBlIHx8IChBcnJheS5pc0FycmF5KGRlc2NyaXB0b3IudmFsdWUpID8gXCJhcnJheVwiIDogdHlwZW9mIGRlc2NyaXB0b3IudmFsdWUpO1xuXG4gIGxldCBkZWZpbmVFbnRyeSA9IHNjb3BlW0RFRklORV9NQVBdW25hbWVdO1xuICBpZiAoIWRlZmluZUVudHJ5KSB7XG4gICAgZGVmaW5lRW50cnkgPSB7IGdyb3VwLCB0eXBlLCBzeW1ib2w6IFN5bWJvbChuYW1lKSB9O1xuICAgIHNjb3BlW0RFRklORV9NQVBdW25hbWVdID0gZGVmaW5lRW50cnk7XG4gIH1cbiAgZWxzZSBpZiAoZ3JvdXAgIT09IGRlZmluZUVudHJ5Lmdyb3VwKSB7XG4gICAgaWYgKGRlZmluZUVudHJ5Lmdyb3VwKVxuICAgICAgdGhyb3cgbmV3IEVycm9yKGBBdHRlbXB0aW5nIHRvIHJlY3JlYXRlIFwiJHtuYW1lfVwiIHZhcmlhYmxlIHdpdGggXCIke2RlZmluZUVudHJ5Lmdyb3VwfVwiIGdyb3VwIGluIGFub3RoZXIgXCIke2dyb3VwfVwiYCk7XG4gICAgZGVmaW5lRW50cnkuZ3JvdXAgPSBncm91cDtcbiAgfVxuXG4gIGRlZmluZUVudHJ5LmRlc2NyaXB0aW9uID0gZGVzY3JpcHRvci5kZXNjcmlwdGlvbiB8fCBkZWZpbmVFbnRyeS5kZXNjcmlwdGlvbiB8fCBcIlwiO1xuXG4gIGxldCBlbnN1cmVWYWx1ZTogKHZhbHVlOiBhbnkpID0+IHt9O1xuICBpZiAoQXJyYXkuaXNBcnJheSh0eXBlKSkge1xuICAgIGxldCBpdGVtVHlwZTtcbiAgICBmb3IgKGNvbnN0IGl0ZXIgb2YgdHlwZSkge1xuICAgICAgY29uc3QgaXQgPSB0eXBlb2YgaXRlcjtcbiAgICAgIGlmICghaXRlbVR5cGUpXG4gICAgICAgIGl0ZW1UeXBlID0gaXQ7XG4gICAgICBlbHNlIGlmIChpdGVtVHlwZSAhPT0gaXQpXG4gICAgICAgIHRocm93IG5ldyBFcnJvcihgQWxsIGVsZW1lbnRzIGZvciAke25hbWV9IG11c3QgYmUgb2YgdGhlIHNhbWUgdHlwZWApO1xuICAgIH1cbiAgICBpZiAoaXRlbVR5cGUgIT09IFwiYm9vbGVhblwiICYmIGl0ZW1UeXBlICE9PSBcIm51bWJlclwiICYmIGl0ZW1UeXBlICE9PSBcInN0cmluZ1wiKVxuICAgICAgdGhyb3cgbmV3IEVycm9yKGBFbnVtICR7bmFtZX0gbm90IHN1cHBvcnQgJHtpdGVtVHlwZX0gdHlwZWApO1xuICAgIGVuc3VyZVZhbHVlID0gKHZhbHVlOiBhbnkpID0+IHtcbiAgICAgIGlmICh0eXBlLmluY2x1ZGVzKHZhbHVlKSlcbiAgICAgICAgcmV0dXJuIHZhbHVlO1xuICAgICAgdGhyb3cgbmV3IEVycm9yKGBUaGUgJyR7dmFsdWV9JyBpcyBub3QgYSAke3R5cGV9YCk7XG4gICAgfVxuICB9XG4gIGVsc2UgaWYgKHR5cGUgPT09IFwiYm9vbGVhblwiKVxuICAgIGVuc3VyZVZhbHVlID0gZW5zdXJlQm9vbGVhbjtcbiAgZWxzZSBpZiAodHlwZSA9PT0gXCJudW1iZXJcIilcbiAgICBlbnN1cmVWYWx1ZSA9IGVuc3VyZU51bWJlcjtcbiAgZWxzZSBpZiAodHlwZSA9PT0gXCJzdHJpbmdcIilcbiAgICBlbnN1cmVWYWx1ZSA9IGVuc3VyZVN0cmluZztcbiAgZWxzZSBpZiAodHlwZSA9PT0gXCJhcnJheVwiKVxuICAgIGVuc3VyZVZhbHVlID0gZW5zdXJlQXJyYXk7XG4gIGVsc2UgaWYgKHR5cGUgPT09IFwiRGlyUGF0aFwiKVxuICAgIGVuc3VyZVZhbHVlID0gRGlyUGF0aC5jcmVhdGU7XG4gIGVsc2UgaWYgKHR5cGUgPT09IFwiRmlsZVBhdGhcIilcbiAgICBlbnN1cmVWYWx1ZSA9IEZpbGVQYXRoLmNyZWF0ZTtcbiAgZWxzZVxuICAgIHRocm93IG5ldyBFcnJvcihgVmFyaWFibGUgXCIke25hbWV9XCIgaGFzIHdyb25nICR7dHlwZX0gdHlwZWApO1xuXG4gIGlmIChkZXNjcmlwdG9yLnZhbHVlICE9PSB1bmRlZmluZWQpIHtcbiAgICBkZWZpbmVFbnRyeS52YWx1ZSA9ICh0eXBlID09PSBcImFycmF5XCIpID8gQXJyYXkuZnJvbShkZXNjcmlwdG9yLnZhbHVlKSA6IGVuc3VyZVZhbHVlKGRlc2NyaXB0b3IudmFsdWUpO1xuICB9XG4gIGVsc2Uge1xuICAgIGRlZmluZUVudHJ5LnZhbHVlID0gKHR5cGUgPT09IFwiYXJyYXlcIikgPyBbXSA6IHVuZGVmaW5lZDtcbiAgfVxuXG4gIGNvbnN0IHsgc3ltYm9sLCB2YWx1ZSB9ID0gZGVmaW5lRW50cnk7XG5cbiAgaWYgKHNjb3BlW3N5bWJvbF0gPT09IHVuZGVmaW5lZCAmJiB2YWx1ZSAhPT0gdW5kZWZpbmVkKVxuICAgIHNjb3BlW3N5bWJvbF0gPSBBcnJheS5pc0FycmF5KHZhbHVlKSA/IEFycmF5LmZyb20odmFsdWUpIDogdmFsdWU7XG5cbiAgY29uc3QgZGVzYzogYW55ID0ge1xuICAgIGNvbmZpZ3VyYWJsZTogdHJ1ZSxcbiAgICBlbnVtZXJhYmxlOiB0cnVlLFxuICAgIGdldCgpIHtcbiAgICAgIGNvbnN0IHZhbHVlID0gc2NvcGVbc3ltYm9sXTtcbiAgICAgIC8qaWYgKHZhbHVlID09PSB1bmRlZmluZWQpXG4gICAgICAgIHRocm93IG5ldyBFcnJvcihgVmFsdWUgb2YgJHtuYW1lfSBjYW5ub3QgYmUgb2J0YWluZWQgYmVjYXVzZSBpdCBoYXMgbm90IGJlZW4gZXN0YWJsaXNoZWRgKTsqL1xuICAgICAgcmV0dXJuIHZhbHVlO1xuICAgIH0sXG4gICAgc2V0KHZhbHVlOiBhbnkpIHtcbiAgICAgIHNjb3BlW3N5bWJvbF0gPSBlbnN1cmVWYWx1ZSh2YWx1ZSk7XG4gICAgfSxcbiAgfTtcblxuICBPYmplY3QuZGVmaW5lUHJvcGVydHkoc2NvcGUsIG5hbWUsIGRlc2MpO1xufVxuXG5leHBvcnQgZnVuY3Rpb24gZGVmaW5lVmFyaWFibGUoc2NvcGU6IGFueSwgZ3JvdXA6IHN0cmluZywgbmFtZTogc3RyaW5nLCBkZXNjcmlwdG9yOiBhbnkpIHtcbiAgaWYgKCFncm91cCkge1xuICAgIHRocm93IG5ldyBFcnJvcihgQXR0ZW1wdGluZyB0byBjcmVhdGUgXCIke25hbWV9XCIgdmFyaWFibGUgd2l0aCBhbiBlbXB0eSBncm91cGApO1xuICB9XG4gIGRlZmluZVZhcmlhYmxlSW1wbChzY29wZSwgZ3JvdXAsIG5hbWUsIGRlc2NyaXB0b3IpO1xufVxuXG5leHBvcnQgZnVuY3Rpb24gZGVmaW5lVmFyaWFibGVzKHNjb3BlOiBhbnksIGdyb3VwOiBzdHJpbmcsIGRlc2NyaXB0b3JzOiBhbnkpIHtcbiAgZm9yIChjb25zdCBbIG5hbWUsIGRlc2NyaXB0b3IgXSBvZiBPYmplY3QuZW50cmllcyhkZXNjcmlwdG9ycykpXG4gICAgU2NvcGVIZWxwZXIuZGVmaW5lVmFyaWFibGUoc2NvcGUsIGdyb3VwLCBuYW1lLCBkZXNjcmlwdG9yKTtcbn1cblxuZXhwb3J0IGZ1bmN0aW9uIGNsb25lKHRhcmdldDogYW55LCBzY29wZTogYW55KSB7XG4gIGlmIChzY29wZVtERUZJTkVfTUFQXSkge1xuICAgIGZvciAoY29uc3QgWyBuYW1lLCB7IGdyb3VwLCBzeW1ib2wsIHR5cGUsIHZhbHVlLCBkZXNjcmlwdGlvbiB9IF0gb2YgT2JqZWN0LmVudHJpZXMoc2NvcGVbREVGSU5FX01BUF0pIGFzIGFueSkge1xuICAgICAgZGVmaW5lVmFyaWFibGVJbXBsKHRhcmdldCwgZ3JvdXAsIG5hbWUsIHsgdHlwZSwgdmFsdWUsIGRlc2NyaXB0aW9uIH0pO1xuICAgICAgaWYgKHNjb3BlW3N5bWJvbF0gIT09IHVuZGVmaW5lZClcbiAgICAgICAgdGFyZ2V0W25hbWVdID0gc2NvcGVbc3ltYm9sXTtcbiAgICB9XG4gIH1cbiAgcmV0dXJuIHRhcmdldDtcbn1cblxuZXhwb3J0IGZ1bmN0aW9uIGdldFZhcmlhYmxlc0J5R3JvdXAoc2NvcGU6IGFueSwgZ3JwPzogc3RyaW5nKSB7XG4gIGNvbnN0IHJlc3VsdDogYW55ID0ge307XG4gIGZvciAoY29uc3QgWyBuYW1lLCB7IHR5cGUsIGdyb3VwLCBzeW1ib2wsIGRlc2NyaXB0aW9uIH0gXSBvZiBPYmplY3QuZW50cmllcyhzY29wZVtERUZJTkVfTUFQXSkgYXMgYW55KSB7XG4gICAgaWYgKGdyb3VwICYmIGdyb3VwICE9PSBncnApXG4gICAgICBjb250aW51ZTtcbiAgICByZXN1bHRbbmFtZV0gPSB7IHR5cGUsIGRlc2NyaXB0aW9uLCB2YWx1ZTogc2NvcGVbc3ltYm9sXSB9O1xuICB9XG4gIHJldHVybiByZXN1bHQ7XG59XG5cbmV4cG9ydCBmdW5jdGlvbiBhcHBseVZhcmlhYmxlKHNjb3BlOiBhbnksIG5hbWU6IHN0cmluZywgdmFsdWU6IGFueSkge1xuICBpZiAoT2JqZWN0LmdldE93blByb3BlcnR5RGVzY3JpcHRvcihzY29wZSwgbmFtZSkpXG4gICAgc2NvcGVbbmFtZV0gPSB2YWx1ZTtcbiAgZWxzZVxuICAgIGRlZmluZVZhcmlhYmxlSW1wbChzY29wZSwgXCJcIiwgbmFtZSwgeyB2YWx1ZSB9KTtcbn1cblxuZXhwb3J0IGZ1bmN0aW9uIGFwcGx5VmFyaWFibGVzKHNjb3BlOiBhbnksIHZhcmlhYmxlczogb2JqZWN0KSB7XG4gIGZvciAoY29uc3QgWyBuYW1lLCB2YWx1ZSBdIG9mIE9iamVjdC5lbnRyaWVzKHZhcmlhYmxlcykpXG4gICAgU2NvcGVIZWxwZXIuYXBwbHlWYXJpYWJsZShzY29wZSwgbmFtZSwgdmFsdWUpO1xufVxuXG59IC8vIFNjb3BlSGVscGVyXG4iLCIvKlxuICogTUlUIExpY2Vuc2VcbiAqXG4gKiBDb3B5cmlnaHQgKGMpIDIwMjUgIFl1cmlpIFlha3ViaW4gKHl1cmlpLnlha3ViaW5AZ21haWwuY29tKVxuICpcbiAqIFBlcm1pc3Npb24gaXMgZ3JhbnRlZCB0byB1c2UsIGNvcHksIG1vZGlmeSwgYW5kIGRpc3RyaWJ1dGUgdGhpcyBzb2Z0d2FyZVxuICogdW5kZXIgdGhlIE1JVCBMaWNlbnNlLiBTZWUgTElDRU5TRSBmaWxlIGZvciBkZXRhaWxzLlxuICovXG5cbmltcG9ydCB7IEN1c3RvbVNjcmlwdCB9IGZyb20gXCJAL2NvcmUvQ3VzdG9tU2NyaXB0XCI7XG5cbmNvbnN0IEVOVFJJRVMgPSBTeW1ib2woXCJFTlRSSUVTXCIpO1xuXG5leHBvcnQgY2xhc3MgU2NyaXB0Q29sbGVjdGlvbiB7XG4gIHByaXZhdGUgW0VOVFJJRVNdOiB7IFtuYW1lOiBzdHJpbmddOiBDdXN0b21TY3JpcHQgfTtcblxuICBwcml2YXRlIGNvbnN0cnVjdG9yKCkge1xuICAgIHRoaXNbRU5UUklFU10gPSB7fTtcbiAgfVxuXG4gIHB1YmxpYyBzdGF0aWMgY3JlYXRlKCkge1xuICAgIHJldHVybiBPYmplY3Quc2VhbChuZXcgU2NyaXB0Q29sbGVjdGlvbik7XG4gIH1cblxuICBwdWJsaWMgZ2V0IEVOVFJJRVMoKSB7XG4gICAgcmV0dXJuIHRoaXNbRU5UUklFU107XG4gIH1cblxuICBwdWJsaWMgZ2V0KG5hbWU6IHN0cmluZykge1xuICAgIHJldHVybiB0aGlzW0VOVFJJRVNdW25hbWVdO1xuICB9XG5cbiAgcHVibGljIHNldChuYW1lOiBzdHJpbmcsIHRhcmdldDogYW55KSB7XG4gICAgaWYgKHRoaXNbRU5UUklFU11bbmFtZV0pXG4gICAgICB0aHJvdyBuZXcgRXJyb3IoYFNjcmlwdCBcIiR7bmFtZX1cIiBleGlzdHNgKTtcbiAgICB0aGlzW0VOVFJJRVNdW25hbWVdID0gdGFyZ2V0O1xuICB9XG4gIFxuICBwdWJsaWMgdG9KU09OKCk6IG9iamVjdCB7XG4gICAgcmV0dXJuIHRoaXNbRU5UUklFU107XG4gIH1cbn07XG4iLCIvKlxuICogTUlUIExpY2Vuc2VcbiAqXG4gKiBDb3B5cmlnaHQgKGMpIDIwMjUgIFl1cmlpIFlha3ViaW4gKHl1cmlpLnlha3ViaW5AZ21haWwuY29tKVxuICpcbiAqIFBlcm1pc3Npb24gaXMgZ3JhbnRlZCB0byB1c2UsIGNvcHksIG1vZGlmeSwgYW5kIGRpc3RyaWJ1dGUgdGhpcyBzb2Z0d2FyZVxuICogdW5kZXIgdGhlIE1JVCBMaWNlbnNlLiBTZWUgTElDRU5TRSBmaWxlIGZvciBkZXRhaWxzLlxuICovXG5cbmltcG9ydCB7IGVuc3VyZUJvb2xlYW4gfSBmcm9tIFwiQC91dGlscy9TdHJpY3RUeXBlXCI7XG5pbXBvcnQgeyBBYnNvbHV0ZVBhdGggfSBmcm9tIFwiQC9jb3JlL1BhdGhcIjtcbmltcG9ydCB7IFN5c3RlbVNjb3BlIH0gZnJvbSBcIkAvY29yZS9TeXN0ZW1TY29wZVwiO1xuXG5jb25zdCBOQU1FICAgICAgICAgICAgICAgID0gU3ltYm9sKFwiTkFNRVwiKTtcbmNvbnN0IExBTkdVQUdFICAgICAgICAgICAgPSBTeW1ib2woXCJMQU5HVUFHRVwiKTtcbmNvbnN0IEhFQURFUl9GSUxFX09OTFkgICAgPSBTeW1ib2woXCJIRUFERVJfRklMRV9PTkxZXCIpO1xuY29uc3QgREVGSU5FUyAgICAgICAgICAgICA9IFN5bWJvbChcIkRFRklORVNcIik7XG5jb25zdCBDT01QSUxFX0ZMQUdTICAgICAgID0gU3ltYm9sKFwiQ09NUElMRV9GTEFHU1wiKTtcbmNvbnN0IEZJTEUgICAgICAgICAgICAgICAgPSBTeW1ib2woXCJGSUxFXCIpO1xuY29uc3QgT0JKRUNUX0ZJTEUgICAgICAgICA9IFN5bWJvbChcIk9CSkVDVF9GSUxFXCIpO1xuXG5jb25zdCBfbGFuZ3VhZ2VFeHRlbnNpb25zID0ge1xuICBBU006IFsgXCIuYXNtXCIsIFwiLnNcIiBdLFxuICBDOiAgIFsgXCIuY1wiIF0sXG4gIENYWDogW1wiLmNwcFwiLCBcIi5jY1wiLCBcIi5jeHhcIiBdLFxufTtcblxuZnVuY3Rpb24gaXNTdXBwb3J0TGFuZ3VhZ2UobGFuZ3VhZ2U6IHN0cmluZykge1xuICByZXR1cm4gX2xhbmd1YWdlRXh0ZW5zaW9ucy5oYXNPd25Qcm9wZXJ0eShsYW5ndWFnZSk7XG59XG5cbmZ1bmN0aW9uIGdldEZpbGVMYW5ndWFnZShmaWxlbmFtZTogYW55KSB7XG4gIGNvbnN0IGZpbGVuYW1lTG93ZXJDYXNlID0gZmlsZW5hbWUudG9TdHJpbmcoKS50b0xvd2VyQ2FzZSgpO1xuICBmb3IgKGNvbnN0IFtsYW5ndWFnZSwgZXh0ZW5zaW9uc10gb2YgT2JqZWN0LmVudHJpZXMoX2xhbmd1YWdlRXh0ZW5zaW9ucykpIHtcbiAgICBmb3IgKGNvbnN0IGl0ZXIgb2YgZXh0ZW5zaW9ucykge1xuICAgICAgaWYgKGZpbGVuYW1lTG93ZXJDYXNlLmVuZHNXaXRoKGl0ZXIpKVxuICAgICAgICByZXR1cm4gbGFuZ3VhZ2U7XG4gICAgfVxuICB9XG4gIHJldHVybiBcIlwiO1xufVxuXG5mdW5jdGlvbiBtYWtlTGFuZ3VhZ2UodmFsdWU6IHN0cmluZykge1xuICBpZiAoaXNTdXBwb3J0TGFuZ3VhZ2UodmFsdWUpKVxuICAgIHJldHVybiB2YWx1ZTtcbiAgdGhyb3cgbmV3IEVycm9yKGBMYW5ndWFnZSBcIiR7dmFsdWV9XCIgaXMgbm90IHN1cHBvcnRlZGApO1xufVxuXG5leHBvcnQgY2xhc3MgU291cmNlRmlsZSB7XG4gIHByaXZhdGUgW05BTUVdOiBzdHJpbmc7XG4gIHByaXZhdGUgW0xBTkdVQUdFXTogc3RyaW5nO1xuICBwcml2YXRlIFtIRUFERVJfRklMRV9PTkxZXTogYm9vbGVhbjtcbiAgcHJpdmF0ZSBbRklMRV06IEFic29sdXRlUGF0aDtcbiAgcHJpdmF0ZSBbT0JKRUNUX0ZJTEVdOiBBYnNvbHV0ZVBhdGggfCBudWxsO1xuICBwcml2YXRlIFtERUZJTkVTXTogc3RyaW5nW107XG4gIHByaXZhdGUgW0NPTVBJTEVfRkxBR1NdOiBzdHJpbmdbXTtcblxuICBwcml2YXRlIGNvbnN0cnVjdG9yKHNjb3BlOiBTeXN0ZW1TY29wZSwgZmlsZW5hbWU6IEFic29sdXRlUGF0aHxzdHJpbmcpIHtcbiAgICB0aGlzW05BTUVdID0gZmlsZW5hbWUudG9TdHJpbmcoKTtcbiAgICBjb25zdCBmbmFtZSA9IHNjb3BlLlNPVVJDRV9ESVIucmVzb2x2ZShmaWxlbmFtZSk7XG4gIFxuICAgIGNvbnN0IGxhbmd1YWdlID0gZ2V0RmlsZUxhbmd1YWdlKGZuYW1lKTtcbiAgICB0aGlzW0xBTkdVQUdFXSA9IGxhbmd1YWdlO1xuICAgIHRoaXNbSEVBREVSX0ZJTEVfT05MWV0gPSAhbGFuZ3VhZ2U7XG4gICAgdGhpc1tGSUxFXSA9IGZuYW1lO1xuICAgIHRoaXNbT0JKRUNUX0ZJTEVdID0gbnVsbDtcbiAgICB0aGlzW0RFRklORVNdID0gW107XG4gICAgdGhpc1tDT01QSUxFX0ZMQUdTXSA9ICFsYW5ndWFnZSA/IFtdIDogW1xuICAgICAgLi4uKHNjb3BlIGFzIGFueSlbbGFuZ3VhZ2UgKyBcIl9GTEFHU1wiXSxcbiAgICAgIC4uLihzY29wZSBhcyBhbnkpW2xhbmd1YWdlICsgXCJfRkxBR1NfXCIgKyBzY29wZS5CVUlMRF9UWVBFLnRvVXBwZXJDYXNlKCldLFxuICAgIF07XG4gIH1cblxuICBwdWJsaWMgc3RhdGljIGNyZWF0ZShzY29wZTogYW55LCBmaWxlbmFtZTogQWJzb2x1dGVQYXRofHN0cmluZykge1xuICAgIHJldHVybiBPYmplY3Quc2VhbChuZXcgU291cmNlRmlsZShzY29wZSwgZmlsZW5hbWUpKTtcbiAgfVxuXG4gIHB1YmxpYyBnZXQgTkFNRSgpOiBzdHJpbmcge1xuICAgIHJldHVybiB0aGlzW05BTUVdO1xuICB9XG5cbiAgcHVibGljIGdldCBMQU5HVUFHRSgpOiBzdHJpbmcge1xuICAgIHJldHVybiB0aGlzW0xBTkdVQUdFXTtcbiAgfVxuXG4gIHB1YmxpYyBnZXQgSEVBREVSX0ZJTEVfT05MWSgpOiBib29sZWFuIHtcbiAgICByZXR1cm4gdGhpc1tIRUFERVJfRklMRV9PTkxZXTtcbiAgfVxuXG4gIHB1YmxpYyBzZXQgSEVBREVSX0ZJTEVfT05MWSh2YWx1ZTogYm9vbGVhbikge1xuICAgIHRoaXNbSEVBREVSX0ZJTEVfT05MWV0gPSBlbnN1cmVCb29sZWFuKHZhbHVlKTtcbiAgfVxuXG4gIHB1YmxpYyBnZXQgREVGSU5FUygpIHtcbiAgICByZXR1cm4gdGhpc1tERUZJTkVTXVxuICB9XG5cbiAgcHVibGljIGdldCBDT01QSUxFX0ZMQUdTKCkge1xuICAgIHJldHVybiB0aGlzW0NPTVBJTEVfRkxBR1NdO1xuICB9XG5cbiAgcHVibGljIGdldCBGSUxFKCk6IEFic29sdXRlUGF0aCB7XG4gICAgcmV0dXJuIHRoaXNbRklMRV07XG4gIH1cblxuICBwdWJsaWMgZ2V0IEZJTEVfRElSKCk6IEFic29sdXRlUGF0aCB7XG4gICAgcmV0dXJuIHRoaXNbRklMRV0uZGlybmFtZSgpO1xuICB9XG5cbiAgcHVibGljIGdldCBGSUxFX05BTUUoKTogc3RyaW5nIHtcbiAgICByZXR1cm4gdGhpc1tGSUxFXS5iYXNlbmFtZSgpO1xuICB9XG5cbiAgcHVibGljIGdldCBPQkpFQ1RfRklMRSgpOiBBYnNvbHV0ZVBhdGggfCBudWxsIHtcbiAgICByZXR1cm4gdGhpc1tPQkpFQ1RfRklMRV07XG4gIH1cblxuICBwdWJsaWMgc2V0IE9CSkVDVF9GSUxFKHZhbHVlOiBBYnNvbHV0ZVBhdGgpIHtcbiAgICB0aGlzW09CSkVDVF9GSUxFXSA9IHZhbHVlO1xuICB9XG5cbiAgcHVibGljIGdldCBPQkpFQ1RfRklMRV9ESVIoKTogQWJzb2x1dGVQYXRoIHwgbnVsbCB7XG4gICAgcmV0dXJuIHRoaXNbT0JKRUNUX0ZJTEVdID8gdGhpc1tPQkpFQ1RfRklMRV0uZGlybmFtZSgpIDogbnVsbDtcbiAgfVxuXG4gIHB1YmxpYyBnZXQgT0JKRUNUX0ZJTEVfTkFNRSgpOiBzdHJpbmcgfCBudWxsIHtcbiAgICByZXR1cm4gdGhpc1tPQkpFQ1RfRklMRV0gPyB0aGlzW09CSkVDVF9GSUxFXS5iYXNlbmFtZSgpIDogbnVsbDtcbiAgfVxuXG4gIHB1YmxpYyB0b0pTT04oKTogb2JqZWN0IHtcbiAgICByZXR1cm4ge1xuICAgICAgTkFNRTogdGhpcy5OQU1FLFxuICAgICAgTEFOR1VBR0U6IHRoaXMuTEFOR1VBR0UsXG4gICAgICBIRUFERVJfRklMRV9PTkxZOiB0aGlzLkhFQURFUl9GSUxFX09OTFksXG4gICAgICBERUZJTkVTOiB0aGlzLkRFRklORVMsXG4gICAgICBDT01QSUxFX0ZMQUdTOiB0aGlzLkNPTVBJTEVfRkxBR1MsXG4gICAgICBGSUxFOiB0aGlzLkZJTEUsXG4gICAgICBGSUxFX0RJUjogdGhpcy5GSUxFX0RJUixcbiAgICAgIEZJTEVfTkFNRTogdGhpcy5GSUxFX05BTUUsXG4gICAgICBPQkpFQ1RfRklMRTogdGhpcy5PQkpFQ1RfRklMRSxcbiAgICAgIE9CSkVDVF9GSUxFX0RJUjogdGhpcy5PQkpFQ1RfRklMRV9ESVIsXG4gICAgICBPQkpFQ1RfRklMRV9OQU1FOiB0aGlzLk9CSkVDVF9GSUxFX05BTUUsXG4gICAgfTtcbiAgfVxufVxuIiwiLypcbiAqIE1JVCBMaWNlbnNlXG4gKlxuICogQ29weXJpZ2h0IChjKSAyMDI1ICBZdXJpaSBZYWt1YmluICh5dXJpaS55YWt1YmluQGdtYWlsLmNvbSlcbiAqXG4gKiBQZXJtaXNzaW9uIGlzIGdyYW50ZWQgdG8gdXNlLCBjb3B5LCBtb2RpZnksIGFuZCBkaXN0cmlidXRlIHRoaXMgc29mdHdhcmVcbiAqIHVuZGVyIHRoZSBNSVQgTGljZW5zZS4gU2VlIExJQ0VOU0UgZmlsZSBmb3IgZGV0YWlscy5cbiAqL1xuXG5pbXBvcnQgeyBTb3VyY2VGaWxlIH0gZnJvbSBcIkAvY29yZS9Tb3VyY2VGaWxlXCI7XG5pbXBvcnQgeyBTeXN0ZW1TY29wZSB9IGZyb20gXCJAL2NvcmUvU3lzdGVtU2NvcGVcIjtcblxuY29uc3QgU09VUkNFUyA9IFN5bWJvbChcIlNPVVJDRVNcIik7XG5cbmV4cG9ydCBjbGFzcyBTb3VyY2VGaWxlTGlzdCB7XG4gIHByaXZhdGUgW1NPVVJDRVNdOiBTb3VyY2VGaWxlW107XG5cbiAgcHJpdmF0ZSBjb25zdHJ1Y3RvcihzY29wZTogU3lzdGVtU2NvcGUsIHNvdXJjZXM6IFNvdXJjZUZpbGVbXSkge1xuICAgIHRoaXNbU09VUkNFU10gPSBbXTtcbiAgICBmb3IgKGNvbnN0IGl0ZXIgb2Ygc291cmNlcykge1xuICAgICAgaWYgKCEoaXRlciBpbnN0YW5jZW9mIFNvdXJjZUZpbGUpKVxuICAgICAgICB0aHJvdyBuZXcgRXJyb3IoYEl0ZW0gJHtpdGVyfSBpcyBub3QgU291cmNlRmlsZWApO1xuICAgICAgdGhpc1tTT1VSQ0VTXS5wdXNoKGl0ZXIpO1xuICAgIH1cbiAgfVxuXG4gIHB1YmxpYyBzdGF0aWMgY3JlYXRlKHNjb3BlOiBTeXN0ZW1TY29wZSwgc291cmNlczogU291cmNlRmlsZVtdKSB7XG4gICAgcmV0dXJuIE9iamVjdC5zZWFsKG5ldyBTb3VyY2VGaWxlTGlzdChzY29wZSwgc291cmNlcykpO1xuICB9XG5cbiAgcHVibGljIGFkZERlZmluaXRpb25zKC4uLmRlZmluaXRpb25zOiBzdHJpbmdbXSkge1xuICAgIGZvciAoY29uc3QgaXRlciBvZiBkZWZpbml0aW9ucy5mbGF0KCkpXG4gICAgICB0aGlzW1NPVVJDRVNdLmZvckVhY2goaSA9PiBpLkRFRklORVMucHVzaChpdGVyKSk7XG4gIH1cblxuICBwdWJsaWMgYWRkQ29tcGlsZUZsYWdzKC4uLmZsYWdzOiBzdHJpbmdbXSkge1xuICAgIGZvciAoY29uc3QgaXRlciBvZiBmbGFncy5mbGF0KCkpXG4gICAgICB0aGlzW1NPVVJDRVNdLmZvckVhY2goaSA9PiBpLkNPTVBJTEVfRkxBR1MucHVzaChpdGVyKSk7XG4gIH1cblxuICBwdWJsaWMgc291cmNlQXQoaW5kZXg6IG51bWJlcik6IFNvdXJjZUZpbGUge1xuICAgIHJldHVybiB0aGlzW1NPVVJDRVNdW2luZGV4XTtcbiAgfVxuXG4gIHB1YmxpYyBzb3VyY2VDb3VudChpbmRleDogbnVtYmVyKTogbnVtYmVyIHtcbiAgICByZXR1cm4gdGhpc1tTT1VSQ0VTXS5sZW5ndGg7XG4gIH1cblxuICBwdWJsaWMgdG9KU09OKCk6IG9iamVjdCB7XG4gICAgcmV0dXJuIHRoaXNbU09VUkNFU107XG4gIH1cbn07XG4iLCIvKlxuICogTUlUIExpY2Vuc2VcbiAqXG4gKiBDb3B5cmlnaHQgKGMpIDIwMjUgIFl1cmlpIFlha3ViaW4gKHl1cmlpLnlha3ViaW5AZ21haWwuY29tKVxuICpcbiAqIFBlcm1pc3Npb24gaXMgZ3JhbnRlZCB0byB1c2UsIGNvcHksIG1vZGlmeSwgYW5kIGRpc3RyaWJ1dGUgdGhpcyBzb2Z0d2FyZVxuICogdW5kZXIgdGhlIE1JVCBMaWNlbnNlLiBTZWUgTElDRU5TRSBmaWxlIGZvciBkZXRhaWxzLlxuICovXG5cbmltcG9ydCBvcyBmcm9tIFwibm9kZTpvc1wiO1xuaW1wb3J0IHsgREVCVUdfQlVJTERfVFlQRSwgUkVMRUFTRV9CVUlMRF9UWVBFIH0gZnJvbSBcIkAvY29yZS9UeXBlc1wiO1xuaW1wb3J0IHsgZ2V0U2l6ZW9mVm9pZHAgfSBmcm9tIFwiQC9jb3JlL0dldFNpemVvZlZvaWRwXCI7XG5cbmV4cG9ydCBkZWZhdWx0IHtcbiAgU1lTVEVNX05BTUU6IHtcbiAgICBkZXNjcmlwdGlvbjogXCJEZWZpbmVzIHRoZSB0YXJnZXQgT1MgZm9yIHRoZSBidWlsZCwgdXNlZCBpbiBjcm9zcy1jb21waWxhdGlvbiBhbmQgbmF0aXZlIGJ1aWxkc1wiLFxuICAgIHZhbHVlOiBcIkxpbnV4XCIsXG4gIH0sXG4gIFNZU1RFTV9QUk9DRVNTT1I6IHtcbiAgICBkZXNjcmlwdGlvbjogXCJEZWZpbmVzIHRoZSB0YXJnZXQgQ1BVIGFyY2hpdGVjdHVyZVwiLFxuICAgIHZhbHVlOiBcIndhc20zMlwiLFxuICB9LFxuICBQUk9KRUNUX05BTUU6IHtcbiAgICBkZXNjcmlwdGlvbjogXCJOYW1lIG9mIHRoZSBjdXJyZW50IHByb2plY3RcIixcbiAgICB2YWx1ZTogXCJcIixcbiAgfSxcbiAgUFJPSkVDVF9WRVJTSU9OOiB7XG4gICAgZGVzY3JpcHRpb246IFwiVmVyc2lvbiBvZiB0aGUgY3VycmVudCBwcm9qZWN0XCIsXG4gICAgdmFsdWU6IFwiXCIsXG4gIH0sXG4gIFBST0pFQ1RfREVTQ1JJUFRJT046IHtcbiAgICBkZXNjcmlwdGlvbjogXCJEZXNjcmlwdGlvbiBvZiB0aGUgY3VycmVudCBwcm9qZWN0XCIsXG4gICAgdmFsdWU6IFwiXCIsXG4gIH0sXG4gIFBST0pFQ1RfSE9NRVBBR0VfVVJMOiB7XG4gICAgZGVzY3JpcHRpb246IFwiSG9tZXBhZ2UgVVJMIG9mIHRoZSBjdXJyZW50IHByb2plY3RcIixcbiAgICB2YWx1ZTogXCJcIixcbiAgfSxcbiAgUFJPSkVDVF9TT1VSQ0VfRElSOiB7XG4gICAgZGVzY3JpcHRpb246IFwiQWJzb2x1dGUgcGF0aCB0byB0aGUgdG9wLWxldmVsIHNvdXJjZSBkaXJlY3Rvcnkgb2YgdGhlIHByb2plY3RcIixcbiAgICB0eXBlOiBcIkRpclBhdGhcIixcbiAgfSxcbiAgUFJPSkVDVF9CSU5BUllfRElSOiB7XG4gICAgZGVzY3JpcHRpb246IFwiQWJzb2x1dGUgcGF0aCB0byB0aGUgdG9wLWxldmVsIGJ1aWxkIChiaW5hcnkpIGRpcmVjdG9yeSBvZiB0aGUgcHJvamVjdFwiLFxuICAgIHR5cGU6IFwiRGlyUGF0aFwiLFxuICB9LFxuICBTQ1JJUFRfRklMRToge1xuICAgIGRlc2NyaXB0aW9uOiBcIkZ1bGwgcGF0aCB0byB0aGUgY3VycmVudCBNYWtlU2NyaXB0IGZpbGUgYmVpbmcgcHJvY2Vzc2VkXCIsXG4gICAgdHlwZTogXCJGaWxlUGF0aFwiLFxuICB9LFxuICBTQ1JJUFRfRElSOiB7XG4gICAgZGVzY3JpcHRpb246IFwiRGlyZWN0b3J5IG9mIHRoZSBjdXJyZW50IE1ha2VTY3JpcHQgZmlsZSBiZWluZyBwcm9jZXNzZWRcIixcbiAgICB0eXBlOiBcIkRpclBhdGhcIixcbiAgfSxcbiAgUEFDS0FHRV9GSUxFOiB7XG4gICAgZGVzY3JpcHRpb246IFwiRmlsZW5hbWUgb2YgcHJvamVjdCBtYW5pZmVzdCBjb250YWluaW5nIG1ldGFkYXRhIGFuZCBkZXBlbmRlbmNpZXNcIixcbiAgICB0eXBlOiBcIkZpbGVQYXRoXCIsXG4gIH0sXG4gIENBQ0hFX0ZJTEU6IHtcbiAgICBkZXNjcmlwdGlvbjogXCJEZWZhdWx0IGZpbGVuYW1lIG9mIHRoZSBCaXRNYWtlIGNhY2hlIHN0b3Jpbmcgc2V0dGluZ3NcIixcbiAgICB0eXBlOiBcIkZpbGVQYXRoXCIsXG4gIH0sXG4gIFRPT0xDSEFJTl9GSUxFOiB7XG4gICAgZGVzY3JpcHRpb246IFwiU3BlY2lmaWVzIHRoZSBwYXRoIHRvIGEgdG9vbGNoYWluIGZpbGUgdXNlZCBmb3IgY3Jvc3MtY29tcGlsYXRpb25cIixcbiAgICB0eXBlOiBcIkZpbGVQYXRoXCIsXG4gIH0sXG4gIEJVSUxEX1RZUEU6IHtcbiAgICBkZXNjcmlwdGlvbjogXCJTcGVjaWZpZXMgdGhlIGJ1aWxkIGNvbmZpZ3VyYXRpb24gZm9yIGNvbnRyb2xsaW5nIG9wdGltaXphdGlvbiBsZXZlbHMgYW5kIGRlYnVnIGluZm9ybWF0aW9uIGluIHRoZSBidWlsZCBwcm9jZXNzXCIsXG4gICAgdHlwZTogWyBERUJVR19CVUlMRF9UWVBFLCBSRUxFQVNFX0JVSUxEX1RZUEUgXSxcbiAgICB2YWx1ZTogUkVMRUFTRV9CVUlMRF9UWVBFLFxuICB9LFxuICBJTlNUQUxMX1BSRUZJWDoge1xuICAgIGRlc2NyaXB0aW9uOiBcIlRoZSByb290IGRpcmVjdG9yeSB3aGVyZSBmaWxlcyB3aWxsIGJlIGluc3RhbGxlZCBieSBkZWZhdWx0XCIsXG4gICAgdHlwZTogXCJEaXJQYXRoXCIsXG4gICAgdmFsdWU6IFwiL3VzclwiLFxuICB9LFxuICBERVNURElSOiB7XG4gICAgZGVzY3JpcHRpb246IFwiVGVtcG9yYXJ5IGluc3RhbGxhdGlvbiByb290XCIsXG4gICAgdHlwZTogXCJEaXJQYXRoXCIsXG4gIH0sXG4gIFNPVVJDRV9ESVI6IHtcbiAgICBkZXNjcmlwdGlvbjogXCJQYXRoIHRvIHRoZSBzb3VyY2UgZGlyZWN0b3J5IGN1cnJlbnRseSBiZWluZyBwcm9jZXNzZWRcIixcbiAgICB0eXBlOiBcIkRpclBhdGhcIixcbiAgfSxcbiAgQklOQVJZX0RJUjoge1xuICAgIGRlc2NyaXB0aW9uOiBcIlBhdGggdG8gdGhlIGJpbmFyeSBkaXJlY3RvcnkgY3VycmVudGx5IGJlaW5nIHByb2Nlc3NlZFwiLFxuICAgIHR5cGU6IFwiRGlyUGF0aFwiLFxuICB9LFxuICBQT1NJVElPTl9JTkRFUEVOREVOVF9DT0RFOiB7XG4gICAgZGVzY3JpcHRpb246IFwiRW5hYmxlcyBQb3NpdGlvbi1JbmRlcGVuZGVudCBDb2RlIChQSUMpIGZvciBidWlsZGluZyBzaGFyZWQgbGlicmFyaWVzXCIsXG4gICAgdmFsdWU6IGZhbHNlLFxuICB9LFxuICBQUkVWRU5UX0lOU1RBTExfRklMRVM6IHtcbiAgICBkZXNjcmlwdGlvbjogXCJQcmV2ZW50IGluc3RhbGxhdGlvbiBvZiBmaWxlc1wiLFxuICAgIHZhbHVlOiBmYWxzZSxcbiAgfSxcbiAgSE9TVF9TWVNURU1fTkFNRToge1xuICAgIGRlc2NyaXB0aW9uOiBcIlNwZWNpZmllcyB0aGUgT1Mgb2YgdGhlIG1hY2hpbmUgcnVubmluZ1wiLFxuICAgIHZhbHVlOiBvcy50eXBlKCksXG4gIH0sXG4gIElOQ0xVREVTOiB7XG4gICAgZGVzY3JpcHRpb246IFwiUGF0aHMgc2VhcmNoZWQgZm9yIGhlYWRlciBmaWxlc1wiLFxuICAgIHZhbHVlOiBbXSxcbiAgfSxcbiAgQVNNX0NPTVBJTEVSOiB7XG4gICAgZGVzY3JpcHRpb246IFwiUGF0aCB0byB0aGUgYXNzZW1ibGVyIGNvbXBpbGVyIGRldGVjdGVkXCIsXG4gICAgdmFsdWU6IFwiY2xhbmdcIixcbiAgfSxcbiAgQVNNX0ZMQUdTOiB7XG4gICAgZGVzY3JpcHRpb246IFwiRmxhZ3MgcGFzc2VkIHRvIHRoZSBhc3NlbWJsZXIgY29tcGlsZXJcIixcbiAgICB2YWx1ZTogW10sXG4gIH0sXG4gIEFTTV9GTEFHU19ERUJVRzoge1xuICAgIGRlc2NyaXB0aW9uOiBcIkFkZGl0aW9uYWwgYXNzZW1ibGVyIGZsYWdzIHVzZWQgd2hlbiBidWlsZGluZyBpbiBEZWJ1ZyBtb2RlXCIsXG4gICAgdmFsdWU6IFsgXCItZ1wiIF0sXG4gIH0sXG4gIEFTTV9GTEFHU19SRUxFQVNFOiB7XG4gICAgZGVzY3JpcHRpb246IFwiQWRkaXRpb25hbCBhc3NlbWJsZXIgZmxhZ3MgdXNlZCB3aGVuIGJ1aWxkaW5nIGluIFJlbGVhc2UgbW9kZVwiLFxuICAgIHZhbHVlOiBbIFwiLU8zXCIsIFwiLUROREVCVUdcIiBdLFxuICB9LFxuICBDX0NPTVBJTEVSOiB7XG4gICAgZGVzY3JpcHRpb246IFwiUGF0aCB0byB0aGUgQyBjb21waWxlciBkZXRlY3RlZFwiLFxuICAgIHZhbHVlOiBcImNsYW5nXCIsXG4gIH0sXG4gIENfRkxBR1M6IHtcbiAgICBkZXNjcmlwdGlvbjogXCJGbGFncyBwYXNzZWQgdG8gdGhlIEMgY29tcGlsZXJcIixcbiAgICB2YWx1ZTogW10sXG4gIH0sXG4gIENfRkxBR1NfREVCVUc6IHtcbiAgICBkZXNjcmlwdGlvbjogXCJBZGRpdGlvbmFsIEMgY29tcGlsZXIgZmxhZ3MgdXNlZCB3aGVuIGJ1aWxkaW5nIGluIERlYnVnIG1vZGVcIixcbiAgICB2YWx1ZTogWyBcIi1nXCIgXSxcbiAgfSxcbiAgQ19GTEFHU19SRUxFQVNFOiB7XG4gICAgZGVzY3JpcHRpb246IFwiQWRkaXRpb25hbCBDIGNvbXBpbGVyIGZsYWdzIHVzZWQgd2hlbiBidWlsZGluZyBpbiBSZWxlYXNlIG1vZGVcIixcbiAgICB2YWx1ZTogWyBcIi1PM1wiLCBcIi1ETkRFQlVHXCIgXSxcbiAgfSxcbiAgQ1hYX0NPTVBJTEVSOiB7XG4gICAgZGVzY3JpcHRpb246IFwiUGF0aCB0byB0aGUgQysrIGNvbXBpbGVyIGRldGVjdGVkXCIsXG4gICAgdmFsdWU6IFwiY2xhbmcrK1wiLFxuICB9LFxuICBDWFhfRkxBR1M6IHtcbiAgICBkZXNjcmlwdGlvbjogXCJGbGFncyBwYXNzZWQgdG8gdGhlIEMgY29tcGlsZXJcIixcbiAgICB2YWx1ZTogW10sXG4gIH0sXG4gIENYWF9GTEFHU19ERUJVRzoge1xuICAgIGRlc2NyaXB0aW9uOiBcIkFkZGl0aW9uYWwgQysrIGNvbXBpbGVyIGZsYWdzIHVzZWQgd2hlbiBidWlsZGluZyBpbiBEZWJ1ZyBtb2RlXCIsXG4gICAgdmFsdWU6IFsgXCItZ1wiIF0sXG4gIH0sXG4gIENYWF9GTEFHU19SRUxFQVNFOiB7XG4gICAgZGVzY3JpcHRpb246IFwiQWRkaXRpb25hbCBDKysgY29tcGlsZXIgZmxhZ3MgdXNlZCB3aGVuIGJ1aWxkaW5nIGluIFJlbGVhc2UgbW9kZVwiLFxuICAgIHZhbHVlOiBbIFwiLU8zXCIsIFwiLUROREVCVUdcIiBdLFxuICB9LFxuICBBUjoge1xuICAgIGRlc2NyaXB0aW9uOiBcIlBhdGggdG8gdGhlIGFyY2hpdmVyIHRvb2wgdXNlZCB0byBjcmVhdGUgc3RhdGljIGxpYnJhcmllc1wiLFxuICAgIHZhbHVlOiBcImxsdm0tYXJcIixcbiAgfSxcbiAgUkFOTElCOiB7XG4gICAgZGVzY3JpcHRpb246IFwiVG9vbCB1c2VkIHRvIGdlbmVyYXRlIGFuIGluZGV4IHRvIHRoZSBjb250ZW50cyBvZiBhbiBhcmNoaXZlIChzdGF0aWMgbGlicmFyeSlcIixcbiAgICB2YWx1ZTogXCJsbHZtLXJhbmxpYlwiLFxuICB9LFxuICBMSU5LRVI6IHtcbiAgICBkZXNjcmlwdGlvbjogXCJQYXRoIHRvIHRoZSBsaW5rZXIgdXNlZCB0byBsaW5rIG9iamVjdCBmaWxlcyBhbmQgbGlicmFyaWVzIGludG8gZXhlY3V0YWJsZXNcIixcbiAgICB2YWx1ZTogXCJ3YXNtLWxkXCIsXG4gIH0sXG4gIE5NOiB7XG4gICAgZGVzY3JpcHRpb246IFwiUGF0aCB0byB0aGUgdG9vbCB1c2VkIHRvIGxpc3Qgc3ltYm9scyBmcm9tIG9iamVjdCBmaWxlcyBvciBhcmNoaXZlc1wiLFxuICAgIHZhbHVlOiBcImxsdm0tbm1cIixcbiAgfSxcbiAgT0JKQ09QWToge1xuICAgIGRlc2NyaXB0aW9uOiBcIlBhdGggdG8gdGhlIHRvb2wgdXNlZCB0byBjb3B5IGFuZCB0cmFuc2xhdGUgb2JqZWN0IGZpbGVzXCIsXG4gICAgdmFsdWU6IFwibGx2bS1vYmpjb3B5XCIsXG4gIH0sXG4gIE9CSkRVTVA6IHtcbiAgICBkZXNjcmlwdGlvbjogXCJQYXRoIHRvIHRoZSB0b29sIHVzZWQgdG8gZGlzcGxheSBpbmZvcm1hdGlvbiBhYm91dCBvYmplY3QgZmlsZXMsIHN1Y2ggYXMgZGlzYXNzZW1ibHlcIixcbiAgICB2YWx1ZTogXCJsbHZtLW9iamR1bXBcIixcbiAgfSxcbiAgU1RSSVA6IHtcbiAgICBkZXNjcmlwdGlvbjogXCJQYXRoIHRvIHRoZSB0b29sIHVzZWQgdG8gcmVtb3ZlIHN5bWJvbHMgZnJvbSBvYmplY3QgZmlsZXMgb3IgZXhlY3V0YWJsZXMgdG8gcmVkdWNlIHNpemVcIixcbiAgICB2YWx1ZTogXCJsbHZtLXN0cmlwXCIsXG4gIH0sXG4gIE9CSkVDVF9MSUJSQVJZX1BSRUZJWDoge1xuICAgIGRlc2NyaXB0aW9uOiBcIlByZWZpeCB1c2VkIGZvciBvYmplY3QgbGlicmFyaWVzXCIsXG4gICAgdmFsdWU6IFwiXCIsXG4gIH0sXG4gIE9CSkVDVF9MSUJSQVJZX1NVRkZJWDoge1xuICAgIGRlc2NyaXB0aW9uOiBcIlN1ZmZpeCB1c2VkIGZvciBvYmplY3QgbGlicmFyeSBmaWxlc1wiLFxuICAgIHZhbHVlOiBcIi5vXCIsXG4gIH0sXG4gIE9CSkVDVF9MSU5LRVJfRkxBR1M6IHtcbiAgICBkZXNjcmlwdGlvbjogXCJGbGFncyBwYXNzZWQgdG8gdGhlIGxpbmtlciB3aGVuIGNyZWF0aW5nIG9iamVjdCBsaWJyYXJpZXNcIixcbiAgICB2YWx1ZTogW10sXG4gIH0sXG4gIFNUQVRJQ19MSUJSQVJZX1BSRUZJWDoge1xuICAgIGRlc2NyaXB0aW9uOiBcIlByZWZpeCB1c2VkIGZvciBzdGF0aWMgbGlicmFyeSBmaWxlc1wiLFxuICAgIHZhbHVlOiBcImxpYlwiLFxuICB9LFxuICBTVEFUSUNfTElCUkFSWV9TVUZGSVg6IHtcbiAgICBkZXNjcmlwdGlvbjogXCJTdWZmaXggdXNlZCBmb3Igc3RhdGljIGxpYnJhcnkgZmlsZXNcIixcbiAgICB2YWx1ZTogXCIuYVwiLFxuICB9LFxuICBTVEFUSUNfTElOS0VSX0ZMQUdTOiB7XG4gICAgZGVzY3JpcHRpb246IFwiRmxhZ3MgcGFzc2VkIHRvIHRoZSBsaW5rZXIgd2hlbiBjcmVhdGluZyBzdGF0aWMgbGlicmFyaWVzXCIsXG4gICAgdmFsdWU6IFtdLFxuICB9LFxuICBTSEFSRURfTElCUkFSWV9QUkVGSVg6IHtcbiAgICBkZXNjcmlwdGlvbjogXCJQcmVmaXggdXNlZCBmb3Igc2hhcmVkIGxpYnJhcnkgZmlsZXNcIixcbiAgICB2YWx1ZTogXCJsaWJcIixcbiAgfSxcbiAgU0hBUkVEX0xJQlJBUllfU1VGRklYOiB7XG4gICAgZGVzY3JpcHRpb246IFwiU3VmZml4IHVzZWQgZm9yIHNoYXJlZCBsaWJyYXJ5IGZpbGVzXCIsXG4gICAgdmFsdWU6IFwiLnNvXCIsXG4gIH0sXG4gIFNIQVJFRF9MSU5LRVJfRkxBR1M6IHtcbiAgICBkZXNjcmlwdGlvbjogXCJGbGFncyBwYXNzZWQgdG8gdGhlIGxpbmtlciB3aGVuIGNyZWF0aW5nIHNoYXJlZCBsaWJyYXJpZXNcIixcbiAgICB2YWx1ZTogW10sXG4gIH0sXG4gIEVYRUNVVEFCTEVfU1VGRklYOiB7XG4gICAgZGVzY3JpcHRpb246IFwiU3VmZml4IHVzZWQgZm9yIGV4ZWN1dGFibGUgZmlsZXNcIixcbiAgICB2YWx1ZTogXCJcIixcbiAgfSxcbiAgRVhFX0xJTktFUl9GTEFHUzoge1xuICAgIGRlc2NyaXB0aW9uOiBcIkZsYWdzIHBhc3NlZCB0byB0aGUgbGlua2VyIHdoZW4gY3JlYXRpbmcgZXhlY3V0YWJsZXNcIixcbiAgICB2YWx1ZTogW10sXG4gIH0sXG4gIEdMT0JBTF9DT05URVhUX0pTT046IHtcbiAgICBkZXNjcmlwdGlvbjogXCJGaWxlbmFtZSBmb3IgSlNPTiBvZiB0aGUgR2xvYmFsIGNvbnRleHRcIixcbiAgICB0eXBlOiBcIkZpbGVQYXRoXCIsXG4gIH0sXG4gIFRBUkdFVF9HT0FMU19KU09OOiB7XG4gICAgZGVzY3JpcHRpb246IFwiRmlsZW5hbWUgZm9yIEpTT04gb2YgdGhlIFRhcmdldCBHb2Fsc1wiLFxuICAgIHR5cGU6IFwiRmlsZVBhdGhcIixcbiAgfSxcbiAgU0laRU9GX1ZPSURfUDoge1xuICAgIGRlc2NyaXB0aW9uOiBcIkRlZmluZXMgdGhlIHNpemUgKGluIGJ5dGVzKSBvZiBhIHZvaWQgcG9pbnRlciBvbiB0aGUgdGFyZ2V0IGFyY2hpdGVjdHVyZVwiLFxuICAgIHR5cGU6IFsgNCwgOCBdLFxuICAgIHZhbHVlOiBnZXRTaXplb2ZWb2lkcCgpLFxuICB9XG59O1xuIiwiLypcbiAqIE1JVCBMaWNlbnNlXG4gKlxuICogQ29weXJpZ2h0IChjKSAyMDI1ICBZdXJpaSBZYWt1YmluICh5dXJpaS55YWt1YmluQGdtYWlsLmNvbSlcbiAqXG4gKiBQZXJtaXNzaW9uIGlzIGdyYW50ZWQgdG8gdXNlLCBjb3B5LCBtb2RpZnksIGFuZCBkaXN0cmlidXRlIHRoaXMgc29mdHdhcmVcbiAqIHVuZGVyIHRoZSBNSVQgTGljZW5zZS4gU2VlIExJQ0VOU0UgZmlsZSBmb3IgZGV0YWlscy5cbiAqL1xuXG5pbXBvcnQgeyBlbnN1cmVTdHJpbmcgfSBmcm9tIFwiQC91dGlscy9TdHJpY3RUeXBlXCI7XG5pbXBvcnQgeyBTb3VyY2VGaWxlIH0gZnJvbSBcIkAvY29yZS9Tb3VyY2VGaWxlXCI7XG5pbXBvcnQgeyBTb3VyY2VGaWxlTGlzdCB9IGZyb20gXCJAL2NvcmUvU291cmNlRmlsZUxpc3RcIjtcbmltcG9ydCB7IEluY2x1ZGVEaXJlY3RvcnkgfSBmcm9tIFwiQC9jb3JlL0luY2x1ZGVEaXJlY3RvcnlcIjtcbmltcG9ydCB7IEludGVyZmFjZVRhcmdldCB9IGZyb20gXCJAL2NvcmUvSW50ZXJmYWNlVGFyZ2V0XCI7XG5pbXBvcnQgeyBJbnRlcmZhY2VJbmNsdWRlcyB9IGZyb20gXCJAL2NvcmUvSW50ZXJmYWNlSW5jbHVkZXNcIjtcbmltcG9ydCB7IEludGVyZmFjZU9iamVjdHMgfSBmcm9tIFwiQC9jb3JlL0ludGVyZmFjZU9iamVjdHNcIjtcbmltcG9ydCB7IEFic29sdXRlUGF0aCB9IGZyb20gXCJAL2NvcmUvUGF0aFwiO1xuaW1wb3J0IHsgQUxMX1RBUkdFVCwgSU5TVEFMTF9UQVJHRVQgfSBmcm9tIFwiQC9Db25zdGFudHNcIjtcbmltcG9ydCB7IFNjb3BlSGVscGVyIH0gZnJvbSBcIkAvY29yZS9TY29wZVwiO1xuaW1wb3J0IHsgU3lzdGVtU2NvcGUgfSBmcm9tIFwiQC9jb3JlL1N5c3RlbVNjb3BlXCI7XG5cbmNvbnN0IE5BTUUgICAgICAgICAgICAgICAgPSBTeW1ib2woXCJOQU1FXCIpO1xuY29uc3QgVEFSR0VUX1NDT1BFICAgICAgICA9IFN5bWJvbChcIlRBUkdFVF9TQ09QRVwiKTtcbmNvbnN0IE9VVFBVVF9OQU1FICAgICAgICAgPSBTeW1ib2woXCJPVVRQVVRfTkFNRVwiKTtcbmNvbnN0IENPTVBJTEVfT1BUSU9OUyAgICAgPSBTeW1ib2woXCJDT01QSUxFX09QVElPTlNcIik7XG5jb25zdCBQUkVGSVggICAgICAgICAgICAgID0gU3ltYm9sKFwiUFJFRklYXCIpO1xuY29uc3QgU1VGRklYICAgICAgICAgICAgICA9IFN5bWJvbChcIlNVRkZJWFwiKTtcbmNvbnN0IExJTktfT1BUSU9OUyAgICAgICAgPSBTeW1ib2woXCJMSU5LX09QVElPTlNcIik7XG5jb25zdCBJTkNMVURFUyAgICAgICAgICAgID0gU3ltYm9sKFwiSU5DTFVERVNcIik7XG5jb25zdCBERUZJTkVTICAgICAgICAgICAgID0gU3ltYm9sKFwiREVGSU5FU1wiKTtcbmNvbnN0IFNPVVJDRVMgICAgICAgICAgICAgPSBTeW1ib2woXCJTT1VSQ0VTXCIpO1xuY29uc3QgTElCUkFSSUVTICAgICAgICAgICA9IFN5bWJvbChcIkxJQlJBUklFU1wiKTtcbmNvbnN0IFBPU0lUSU9OX0lOREVQRU5ERU5UX0NPREUgPSBTeW1ib2woXCJQT1NJVElPTl9JTkRFUEVOREVOVF9DT0RFXCIpO1xuXG5mdW5jdGlvbiBlbnN1cmVUYXJnZXROYW1lKG5hbWU6IHN0cmluZyk6IHN0cmluZyB7XG4gIGlmICh0eXBlb2YgbmFtZSAhPT0gXCJzdHJpbmdcIilcbiAgICB0aHJvdyBuZXcgRXJyb3IoYFRhcmdldCBcIiR7bmFtZX1cIiBpcyBub3Qgc3RyaW5nIHR5cGVgKTtcbiAgaWYgKFsgQUxMX1RBUkdFVCwgSU5TVEFMTF9UQVJHRVQgXS5pbmNsdWRlcyhuYW1lKSlcbiAgICB0aHJvdyBuZXcgRXJyb3IoYFRhcmdldCBcIiR7bmFtZX1cIiBpcyByZXNlcnZlZCBuYW1lYCk7XG4gIHJldHVybiBuYW1lO1xufVxuXG5pbnRlcmZhY2UgSW5jbHVkZUVudHJ5IHtcbiAgVkFMVUU6IEludGVyZmFjZUluY2x1ZGVzIHwgSW5jbHVkZURpcmVjdG9yeSB8IHN0cmluZztcbiAgUFVCTElDX09OTFk/OiBib29sZWFuO1xufTtcblxuZXhwb3J0IGNsYXNzIEJhc2VUYXJnZXQge1xuICBwcml2YXRlIFtOQU1FXTogc3RyaW5nO1xuICBwcml2YXRlIFtUQVJHRVRfU0NPUEVdOiBTeXN0ZW1TY29wZTtcbiAgcHJpdmF0ZSBbT1VUUFVUX05BTUVdOiBzdHJpbmc7XG4gIHByaXZhdGUgW1BSRUZJWF06IHN0cmluZztcbiAgcHJpdmF0ZSBbU1VGRklYXTogc3RyaW5nXG4gIHByaXZhdGUgW0NPTVBJTEVfT1BUSU9OU106IGFueVtdO1xuICBwcml2YXRlIFtMSU5LX09QVElPTlNdOiBhbnlbXTtcbiAgcHJpdmF0ZSBbU09VUkNFU106IGFueVtdO1xuICBwcml2YXRlIFtMSUJSQVJJRVNdOiBhbnlbXTtcbiAgcHJpdmF0ZSBbSU5DTFVERVNdOiBJbmNsdWRlRW50cnlbXTtcbiAgcHJpdmF0ZSBbREVGSU5FU106IGFueVtdO1xuICBwcml2YXRlIFtQT1NJVElPTl9JTkRFUEVOREVOVF9DT0RFXTogYm9vbGVhbjtcblxuICBwcm90ZWN0ZWQgY29uc3RydWN0b3Ioc2NvcGU6IFN5c3RlbVNjb3BlLCBuYW1lOiBzdHJpbmcpIHtcbiAgICB0aGlzW05BTUVdID0gZW5zdXJlVGFyZ2V0TmFtZShuYW1lKTtcbiAgICB0aGlzW1RBUkdFVF9TQ09QRV0gPSBTY29wZUhlbHBlci5jbG9uZSh7fSwgc2NvcGUpO1xuICAgIHRoaXNbT1VUUFVUX05BTUVdID0gZW5zdXJlU3RyaW5nKG5hbWUpO1xuICAgIHRoaXNbUFJFRklYXSA9IFwiXCI7XG4gICAgdGhpc1tTVUZGSVhdID0gXCJcIjtcbiAgICB0aGlzW0NPTVBJTEVfT1BUSU9OU10gPSBbXTtcbiAgICB0aGlzW0xJTktfT1BUSU9OU10gPSBbXTtcbiAgICB0aGlzW1NPVVJDRVNdID0gW107XG4gICAgdGhpc1tMSUJSQVJJRVNdID0gW107XG4gICAgdGhpc1tJTkNMVURFU10gPSBzY29wZS5JTkNMVURFUy5tYXAoKFZBTFVFOiBhbnkpID0+ICh7IFZBTFVFIH0pKTtcbiAgICB0aGlzW0RFRklORVNdID0gW107XG4gICAgdGhpc1tQT1NJVElPTl9JTkRFUEVOREVOVF9DT0RFXSA9IHNjb3BlLlBPU0lUSU9OX0lOREVQRU5ERU5UX0NPREU7XG4gIH1cblxuICBwdWJsaWMgZ2V0IE5BTUUoKSB7XG4gICAgcmV0dXJuIHRoaXNbTkFNRV07XG4gIH1cblxuICBwdWJsaWMgZ2V0IFRBUkdFVF9TQ09QRSgpIHtcbiAgICByZXR1cm4gdGhpc1tUQVJHRVRfU0NPUEVdO1xuICB9XG5cbiAgcHVibGljIGdldCBPVVRQVVRfTkFNRSgpIHtcbiAgICByZXR1cm4gdGhpc1tPVVRQVVRfTkFNRV07XG4gIH1cblxuICBwdWJsaWMgc2V0IE9VVFBVVF9OQU1FKHZhbHVlOiBzdHJpbmcpIHtcbiAgICB0aGlzW09VVFBVVF9OQU1FXSA9IGVuc3VyZVN0cmluZyh2YWx1ZSk7XG4gIH1cblxuICBwdWJsaWMgZ2V0IENPTVBJTEVfT1BUSU9OUygpOiBzdHJpbmdbXSB7XG4gICAgcmV0dXJuIHRoaXNbQ09NUElMRV9PUFRJT05TXTtcbiAgfVxuXG4gIHB1YmxpYyBnZXQgUFJFRklYKCkge1xuICAgIHJldHVybiB0aGlzW1BSRUZJWF07XG4gIH1cblxuICBwdWJsaWMgc2V0IFBSRUZJWCh2YWx1ZTogc3RyaW5nKSB7XG4gICAgdGhpc1tQUkVGSVhdID0gZW5zdXJlU3RyaW5nKHZhbHVlKTtcbiAgfVxuXG4gIHB1YmxpYyBnZXQgU1VGRklYKCkge1xuICAgIHJldHVybiB0aGlzW1NVRkZJWF07XG4gIH1cblxuICBwdWJsaWMgc2V0IFNVRkZJWCh2YWx1ZTogc3RyaW5nKSB7XG4gICAgdGhpc1tTVUZGSVhdID0gZW5zdXJlU3RyaW5nKHZhbHVlKTtcbiAgfVxuXG4gIHB1YmxpYyBnZXQgTElOS19PUFRJT05TKCk6IHN0cmluZ1tdIHtcbiAgICByZXR1cm4gdGhpc1tMSU5LX09QVElPTlNdO1xuICB9XG5cbiAgcHVibGljIGdldCBJTkNMVURFUygpIHtcbiAgICByZXR1cm4gdGhpc1tJTkNMVURFU107XG4gIH1cblxuICBwdWJsaWMgZ2V0IERFRklORVMoKTogc3RyaW5nW10ge1xuICAgIHJldHVybiB0aGlzW0RFRklORVNdO1xuICB9XG5cbiAgcHVibGljIGdldCBTT1VSQ0VTKCk6IHN0cmluZ1tdIHtcbiAgICByZXR1cm4gdGhpc1tTT1VSQ0VTXTtcbiAgfVxuXG4gIHB1YmxpYyBnZXQgTElCUkFSSUVTKCk6IHN0cmluZ1tdIHtcbiAgICByZXR1cm4gdGhpc1tMSUJSQVJJRVNdO1xuICB9XG5cbiAgcHVibGljIGdldCBGSUxFX0RJUigpOiBBYnNvbHV0ZVBhdGgge1xuICAgIHJldHVybiB0aGlzW1RBUkdFVF9TQ09QRV0uQklOQVJZX0RJUjtcbiAgfVxuXG4gIHB1YmxpYyBnZXQgRklMRV9OQU1FKCk6IHN0cmluZyB7XG4gICAgcmV0dXJuIHRoaXMuUFJFRklYICsgdGhpcy5PVVRQVVRfTkFNRSArIHRoaXMuU1VGRklYO1xuICB9XG5cbiAgcHVibGljIGdldCBGSUxFKCk6IEFic29sdXRlUGF0aCB7XG4gICAgcmV0dXJuIHRoaXMuRklMRV9ESVIuam9pbih0aGlzLkZJTEVfTkFNRSk7XG4gIH1cblxuICBwdWJsaWMgZ2V0IFBPU0lUSU9OX0lOREVQRU5ERU5UX0NPREUoKTogYm9vbGVhbiB7XG4gICAgcmV0dXJuIHRoaXNbUE9TSVRJT05fSU5ERVBFTkRFTlRfQ09ERV07XG4gIH1cblxuICBwdWJsaWMgYWRkU291cmNlcyguLi5zb3VyY2VzOiBBcnJheTxJbnRlcmZhY2VPYmplY3RzIHwgU291cmNlRmlsZSB8IEFic29sdXRlUGF0aCB8IHN0cmluZz4pIHtcbiAgICBmb3IgKGxldCBpdCBvZiBzb3VyY2VzLmZsYXQoMSkpIHtcbiAgICAgIGlmIChpdCBpbnN0YW5jZW9mIEludGVyZmFjZU9iamVjdHMgfHwgaXQgaW5zdGFuY2VvZiBTb3VyY2VGaWxlKVxuICAgICAgICB7fVxuICAgICAgZWxzZSBpZiAodHlwZW9mIGl0ID09PSBcInN0cmluZ1wiIHx8IEFic29sdXRlUGF0aC5pc0Fic29sdXRlKGl0KSlcbiAgICAgICAgaXQgPSBTb3VyY2VGaWxlLmNyZWF0ZSh0aGlzW1RBUkdFVF9TQ09QRV0sIGl0KTtcbiAgICAgIGVsc2VcbiAgICAgICAgdGhyb3cgbmV3IEVycm9yKGBOb3Qgc3VwcG9ydCBpbnN0YW5jZSAke2l0fWApO1xuICBcbiAgICAgIGlmIChpdCBpbnN0YW5jZW9mIFNvdXJjZUZpbGUgJiYgaXQuTEFOR1VBR0UpIHtcbiAgICAgICAgY29uc3QgcmZpbGUxID0gdGhpc1tUQVJHRVRfU0NPUEVdLkJJTkFSWV9ESVIucmVsYXRpdmUoaXQuRklMRSk7XG4gICAgICAgIGNvbnN0IHJmaWxlMiA9IHRoaXNbVEFSR0VUX1NDT1BFXS5TT1VSQ0VfRElSLnJlbGF0aXZlKGl0LkZJTEUpO1xuICAgICAgICBjb25zdCByZmlsZSA9IChyZmlsZTIubGVuZ3RoIDwgcmZpbGUxLmxlbmd0aCA/IHJmaWxlMiA6IHJmaWxlMSkucmVwbGFjZShcIi4uL1wiLCBcIl9fL1wiKTtcbiAgICAgICAgaXQuT0JKRUNUX0ZJTEUgPSB0aGlzW1RBUkdFVF9TQ09QRV0uQklOQVJZX0RJUi5qb2luKFwiTWFrZUZpbGVzXCIsIHRoaXNbTkFNRV0gKyBcIi5kaXJcIiwgIHJmaWxlICsgXCIub2JqXCIpO1xuICAgICAgfVxuICBcbiAgICAgIHRoaXNbU09VUkNFU10ucHVzaChpdCk7XG4gICAgfVxuICB9XG5cbiAgcHVibGljIGFkZEluY2x1ZGVzKC4uLmluY2x1ZGVzOiBBcnJheTxJbnRlcmZhY2VJbmNsdWRlcyB8IEFic29sdXRlUGF0aCB8IHN0cmluZz4pIHtcbiAgICBmb3IgKGNvbnN0IGl0IG9mIGluY2x1ZGVzLmZsYXQoMSkpIHtcbiAgICAgIGxldCBWQUxVRTtcbiAgICAgIGlmIChpdCBpbnN0YW5jZW9mIEludGVyZmFjZUluY2x1ZGVzKVxuICAgICAgICBWQUxVRSA9IGl0O1xuICAgICAgZWxzZSBpZiAodHlwZW9mIGl0ID09PSBcInN0cmluZ1wiIHx8IEFic29sdXRlUGF0aC5pc0Fic29sdXRlKGl0KSlcbiAgICAgICAgVkFMVUUgPSBJbmNsdWRlRGlyZWN0b3J5LmNyZWF0ZShpdCwgdGhpc1tUQVJHRVRfU0NPUEVdLlNPVVJDRV9ESVIpO1xuICAgICAgZWxzZVxuICAgICAgICB0aHJvdyBuZXcgRXJyb3IoYE5vdCBzdXBwb3J0IGluc3RhbmNlICR7aXR9YCk7XG4gICAgICB0aGlzW0lOQ0xVREVTXS5wdXNoKHtWQUxVRX0pOyAvLyBJbmNsdWRlRGlyZWN0b3J5W11cbiAgICB9XG4gIH1cblxuICBwdWJsaWMgYWRkTGlicmFyaWVzKC4uLmxpYnJhcmllczogYW55KSB7XG4gICAgZm9yIChjb25zdCBpdCBvZiBsaWJyYXJpZXMuZmxhdCgxKSkge1xuICAgICAgdGhpc1tMSUJSQVJJRVNdLnB1c2goeyBWQUxVRTogSW50ZXJmYWNlVGFyZ2V0LmVuc3VyZUluc3RhbmNlKGl0KSB9KTtcbiAgICB9XG4gIH1cblxuICBwdWJsaWMgYWRkQ29tcGlsZU9wdGlvbnMoLi4ub3B0aW9uczogc3RyaW5nW10pIHtcbiAgICBmb3IgKGNvbnN0IGl0IG9mIG9wdGlvbnMuZmxhdCgxKSkge1xuICAgICAgdGhpc1tDT01QSUxFX09QVElPTlNdLnB1c2goeyBWQUxVRTogaXQgfSk7XG4gICAgfVxuICB9XG5cbiAgcHVibGljIGFkZExpbmtPcHRpb25zKC4uLm9wdGlvbnM6IHN0cmluZ1tdKSB7XG4gICAgZm9yIChjb25zdCBpdCBvZiBvcHRpb25zLmZsYXQoMSkpIHtcbiAgICAgIHRoaXNbTElOS19PUFRJT05TXS5wdXNoKHsgVkFMVUU6IGl0IH0pO1xuICAgIH1cbiAgfVxuXG4gIHB1YmxpYyBnZXRTb3VyY2VGaWxlcyguLi5zb3VyY2VzOiBhbnlbXSk6IFNvdXJjZUZpbGVMaXN0IHtcbiAgICBjb25zdCByZXN1bHQgPSBbXTtcbiAgICBmb3IgKGNvbnN0IGl0IG9mIHNvdXJjZXMuZmxhdCgxKSkge1xuICAgICAgY29uc3QgZmlsZW5hbWUgPSB0aGlzW1RBUkdFVF9TQ09QRV0uU09VUkNFX0RJUi5yZXNvbHZlKGl0KS50b1N0cmluZygpO1xuICAgICAgY29uc3Qgc3JjID0gdGhpc1tTT1VSQ0VTXS5maW5kKGkgPT4gaSBpbnN0YW5jZW9mIFNvdXJjZUZpbGUgJiYgaS5GSUxFLnRvU3RyaW5nKCkgPT09IGZpbGVuYW1lKTtcbiAgICAgIGlmICghc3JjKVxuICAgICAgICB0aHJvdyBuZXcgRXJyb3IoYENhbm5vdCBmaW5kIFwiJHtpdH1cImApO1xuICAgICAgcmVzdWx0LnB1c2goc3JjKTtcbiAgICB9XG4gIFxuICAgIGlmIChyZXN1bHQubGVuZ3RoKVxuICAgICAgcmV0dXJuIFNvdXJjZUZpbGVMaXN0LmNyZWF0ZSh0aGlzW1RBUkdFVF9TQ09QRV0sIHJlc3VsdCk7XG4gIFxuICAgIHJldHVybiBTb3VyY2VGaWxlTGlzdC5jcmVhdGUodGhpc1tUQVJHRVRfU0NPUEVdLCB0aGlzW1NPVVJDRVNdLmZpbHRlcihpID0+IGkgaW5zdGFuY2VvZiBTb3VyY2VGaWxlKSk7XG4gIH1cblxuICBwdWJsaWMgc2V0UHJlZml4KHByZWZpeDogc3RyaW5nKSB7XG4gICAgdGhpc1tQUkVGSVhdID0gcHJlZml4O1xuICB9XG4gIFxuICBwdWJsaWMgc2V0U3VmZml4KHN1ZmZpeDogc3RyaW5nKSB7XG4gICAgdGhpc1tTVUZGSVhdID0gc3VmZml4O1xuICB9XG4gIFxuICBwdWJsaWMgc2V0T3V0cHV0TmFtZShvdXRwdXROYW1lOiBzdHJpbmcpIHtcbiAgICB0aGlzW09VVFBVVF9OQU1FXSA9IG91dHB1dE5hbWU7XG4gIH1cbiAgXG4gIHB1YmxpYyBhZGREZWZpbml0aW9ucyguLi5kZWZpbml0aW9uczogc3RyaW5nW10pIHtcbiAgICBmb3IgKGNvbnN0IFZBTFVFIG9mIGRlZmluaXRpb25zLmZsYXQoMSkpXG4gICAgICB0aGlzW0RFRklORVNdLnB1c2goeyBWQUxVRSB9KTtcbiAgfVxuXG4gIHB1YmxpYyB0b0pTT04oKTogb2JqZWN0IHtcbiAgICByZXR1cm4ge1xuICAgICAgTkFNRTogdGhpcy5OQU1FLFxuICAgICAgVEFSR0VUX1NDT1BFOiB0aGlzLlRBUkdFVF9TQ09QRSxcbiAgICAgIE9VVFBVVF9OQU1FOiB0aGlzLk9VVFBVVF9OQU1FLFxuICAgICAgQ09NUElMRV9PUFRJT05TOiB0aGlzLkNPTVBJTEVfT1BUSU9OUyxcbiAgICAgIFBSRUZJWDogdGhpcy5QUkVGSVgsXG4gICAgICBTVUZGSVg6IHRoaXMuU1VGRklYLFxuICAgICAgTElOS19PUFRJT05TOiB0aGlzLkxJTktfT1BUSU9OUyxcbiAgICAgIElOQ0xVREVTOiB0aGlzLklOQ0xVREVTLFxuICAgICAgREVGSU5FUzogdGhpcy5ERUZJTkVTLFxuICAgICAgU09VUkNFUzogdGhpcy5TT1VSQ0VTLFxuICAgICAgTElCUkFSSUVTOiB0aGlzLkxJQlJBUklFUyxcbiAgICAgIEZJTEVfRElSOiB0aGlzLkZJTEVfRElSLFxuICAgICAgRklMRV9OQU1FOiB0aGlzLkZJTEVfTkFNRSxcbiAgICAgIEZJTEU6IHRoaXMuRklMRSxcbiAgICB9XG4gIH1cbn07XG5cbmV4cG9ydCBjbGFzcyBCYXNlTGlicmFyeSBleHRlbmRzIEJhc2VUYXJnZXQge1xuICBwcm90ZWN0ZWQgY29uc3RydWN0b3Ioc2NvcGU6IFN5c3RlbVNjb3BlLCBuYW1lOiBzdHJpbmcpIHtcbiAgICBzdXBlcihzY29wZSwgbmFtZSk7XG4gIH1cblxuICBwdWJsaWMgYWRkUHVibGljSW5jbHVkZXMoLi4uaW5jbHVkZXM6IEFycmF5PEludGVyZmFjZUluY2x1ZGVzIHwgQWJzb2x1dGVQYXRoIHwgc3RyaW5nPikge1xuICAgIGZvciAoY29uc3QgaXQgb2YgaW5jbHVkZXMuZmxhdCgxKSkge1xuICAgICAgbGV0IFZBTFVFO1xuICAgICAgaWYgKGl0IGluc3RhbmNlb2YgSW50ZXJmYWNlSW5jbHVkZXMpXG4gICAgICAgIFZBTFVFID0gaXQ7XG4gICAgICBlbHNlIGlmICh0eXBlb2YgaXQgPT09IFwic3RyaW5nXCIgfHwgQWJzb2x1dGVQYXRoLmlzQWJzb2x1dGUoaXQpKVxuICAgICAgICBWQUxVRSA9IEluY2x1ZGVEaXJlY3RvcnkuY3JlYXRlKGl0LCB0aGlzW1RBUkdFVF9TQ09QRV0uU09VUkNFX0RJUik7XG4gICAgICBlbHNlXG4gICAgICAgIHRocm93IG5ldyBFcnJvcihgTm90IHN1cHBvcnQgaW5zdGFuY2UgJHtpdH1gKTtcbiAgICAgIHRoaXNbSU5DTFVERVNdLnB1c2goe1ZBTFVFLCBQVUJMSUNfT05MWTogdHJ1ZX0pOyAvLyBJbmNsdWRlRGlyZWN0b3J5W11cbiAgICB9XG4gIH1cblxuICBwdWJsaWMgYWRkUHVibGljRGVmaW5pdGlvbnMoLi4uZGVmaW5pdGlvbnM6IHN0cmluZ1tdKSB7XG4gICAgZm9yIChjb25zdCBWQUxVRSBvZiBkZWZpbml0aW9ucy5mbGF0KDEpKVxuICAgICAgdGhpc1tERUZJTkVTXS5wdXNoKHsgVkFMVUUsIFBVQkxJQ19PTkxZOiB0cnVlIH0pO1xuICB9XG5cbiAgcHVibGljIGFkZFB1YmxpY0xpYnJhcmllcyguLi5saWJyYXJpZXM6IGFueVtdKSB7XG4gICAgZm9yIChjb25zdCBpdCBvZiBsaWJyYXJpZXMuZmxhdCgxKSkge1xuICAgICAgdGhpc1tMSUJSQVJJRVNdLnB1c2goe1ZBTFVFOiBJbnRlcmZhY2VUYXJnZXQuZW5zdXJlSW5zdGFuY2UoaXQpLCBQVUJMSUNfT05MWTogdHJ1ZX0pO1xuICAgIH1cbiAgfVxuXG4gIHB1YmxpYyBhZGRQdWJsaWNDb21waWxlT3B0aW9ucyguLi5vcHRpb25zOiBzdHJpbmdbXSkge1xuICAgIGZvciAoY29uc3QgaXQgb2Ygb3B0aW9ucy5mbGF0KDEpKSB7XG4gICAgICB0aGlzW0NPTVBJTEVfT1BUSU9OU10ucHVzaCh7IFZBTFVFOiBpdCwgUFVCTElDX09OTFk6IHRydWUgfSk7XG4gICAgfVxuICB9XG5cbiAgcHVibGljIGFkZFB1YmxpY0xpbmtPcHRpb25zKC4uLm9wdGlvbnM6IGFueVtdKSB7XG4gICAgZm9yIChjb25zdCBpdCBvZiBvcHRpb25zLmZsYXQoMSkpIHtcbiAgICAgIHRoaXNbTElOS19PUFRJT05TXS5wdXNoKHsgVkFMVUU6IGl0LCBQVUJMSUNfT05MWTogdHJ1ZSB9KTtcbiAgICB9XG4gIH1cbn07XG5cbmV4cG9ydCBjbGFzcyBPYmplY3RMaWJyYXJ5IGV4dGVuZHMgQmFzZUxpYnJhcnkge1xuICBwcml2YXRlIGNvbnN0cnVjdG9yKHNjb3BlOiBTeXN0ZW1TY29wZSwgbmFtZTogc3RyaW5nKSB7XG4gICAgc3VwZXIoc2NvcGUsIG5hbWUpO1xuICAgIHRoaXMuUFJFRklYID0gc2NvcGUuT0JKRUNUX0xJQlJBUllfUFJFRklYO1xuICAgIHRoaXMuU1VGRklYID0gc2NvcGUuT0JKRUNUX0xJQlJBUllfU1VGRklYO1xuICAgIHRoaXMuTElOS19PUFRJT05TLnB1c2goLi4uKHNjb3BlIGFzIGFueSkuT0JKRUNUX0xJTktFUl9GTEFHUy5tYXAoKFZBTFVFOiBhbnkpID0+ICh7IFZBTFVFIH0pKSk7XG4gIH1cblxuICBwdWJsaWMgc3RhdGljIGNyZWF0ZShzY29wZTogU3lzdGVtU2NvcGUsIG5hbWU6IHN0cmluZykge1xuICAgIHJldHVybiBPYmplY3Quc2VhbChuZXcgT2JqZWN0TGlicmFyeShzY29wZSwgbmFtZSkpO1xuICB9XG59O1xuXG5leHBvcnQgY2xhc3MgU3RhdGljTGlicmFyeSBleHRlbmRzIEJhc2VMaWJyYXJ5IHtcbiAgcHJpdmF0ZSBjb25zdHJ1Y3RvcihzY29wZTogU3lzdGVtU2NvcGUsIG5hbWU6IHN0cmluZykge1xuICAgIHN1cGVyKHNjb3BlLCBuYW1lKTtcbiAgICB0aGlzLlBSRUZJWCA9IHNjb3BlLlNUQVRJQ19MSUJSQVJZX1BSRUZJWDtcbiAgICB0aGlzLlNVRkZJWCA9IHNjb3BlLlNUQVRJQ19MSUJSQVJZX1NVRkZJWDtcbiAgICB0aGlzLkxJTktfT1BUSU9OUy5wdXNoKC4uLihzY29wZSBhcyBhbnkpLlNUQVRJQ19MSU5LRVJfRkxBR1MubWFwKChWQUxVRTogYW55KSA9PiAoeyBWQUxVRSB9KSkpO1xuICB9XG5cbiAgcHVibGljIHN0YXRpYyBjcmVhdGUoc2NvcGU6IGFueSwgbmFtZTogc3RyaW5nKSB7XG4gICAgcmV0dXJuIE9iamVjdC5zZWFsKG5ldyBTdGF0aWNMaWJyYXJ5KHNjb3BlLCBuYW1lKSk7XG4gIH1cbn07XG5cbmV4cG9ydCBjbGFzcyBTaGFyZWRMaWJyYXJ5IGV4dGVuZHMgQmFzZUxpYnJhcnkge1xuICBwcml2YXRlIGNvbnN0cnVjdG9yKHNjb3BlOiBTeXN0ZW1TY29wZSwgbmFtZTogc3RyaW5nKSB7XG4gICAgc3VwZXIoc2NvcGUsIG5hbWUpO1xuICAgIHRoaXMuUFJFRklYID0gc2NvcGUuU0hBUkVEX0xJQlJBUllfUFJFRklYO1xuICAgIHRoaXMuU1VGRklYID0gc2NvcGUuU0hBUkVEX0xJQlJBUllfU1VGRklYO1xuICAgIHRoaXMuTElOS19PUFRJT05TLnB1c2goLi4uKHNjb3BlIGFzIGFueSkuU0hBUkVEX0xJTktFUl9GTEFHUy5tYXAoKFZBTFVFOiBhbnkpID0+ICh7IFZBTFVFIH0pKSk7XG4gIH1cblxuICBwdWJsaWMgc3RhdGljIGNyZWF0ZShzY29wZTogYW55LCBuYW1lOiBzdHJpbmcpIHtcbiAgICByZXR1cm4gT2JqZWN0LnNlYWwobmV3IFNoYXJlZExpYnJhcnkoc2NvcGUsIG5hbWUpKTtcbiAgfVxufVxuXG5leHBvcnQgY2xhc3MgRXhlY3V0YWJsZSBleHRlbmRzIEJhc2VUYXJnZXQge1xuICBwcml2YXRlIGNvbnN0cnVjdG9yKHNjb3BlOiBTeXN0ZW1TY29wZSwgbmFtZTogc3RyaW5nKSB7XG4gICAgc3VwZXIoc2NvcGUsIG5hbWUpO1xuICAgIHRoaXMuU1VGRklYID0gc2NvcGUuRVhFQ1VUQUJMRV9TVUZGSVg7XG4gICAgdGhpcy5MSU5LX09QVElPTlMucHVzaCguLi4oc2NvcGUgYXMgYW55KS5FWEVfTElOS0VSX0ZMQUdTLm1hcCgoVkFMVUU6IGFueSkgPT4gKHsgVkFMVUUgfSkpKTtcbiAgfVxuXG4gIHB1YmxpYyBzdGF0aWMgY3JlYXRlKHNjb3BlOiBTeXN0ZW1TY29wZSwgbmFtZTogc3RyaW5nKSB7XG4gICAgcmV0dXJuIE9iamVjdC5zZWFsKG5ldyBFeGVjdXRhYmxlKHNjb3BlLCBuYW1lKSk7XG4gIH1cbn07XG4iLCIvKlxuICogTUlUIExpY2Vuc2VcbiAqXG4gKiBDb3B5cmlnaHQgKGMpIDIwMjUgIFl1cmlpIFlha3ViaW4gKHl1cmlpLnlha3ViaW5AZ21haWwuY29tKVxuICpcbiAqIFBlcm1pc3Npb24gaXMgZ3JhbnRlZCB0byB1c2UsIGNvcHksIG1vZGlmeSwgYW5kIGRpc3RyaWJ1dGUgdGhpcyBzb2Z0d2FyZVxuICogdW5kZXIgdGhlIE1JVCBMaWNlbnNlLiBTZWUgTElDRU5TRSBmaWxlIGZvciBkZXRhaWxzLlxuICovXG5cbmltcG9ydCB7IEluY2x1ZGVEaXJlY3RvcnkgfSBmcm9tIFwiQC9jb3JlL0luY2x1ZGVEaXJlY3RvcnlcIjtcbmltcG9ydCB7IEludGVyZmFjZUluY2x1ZGVzIH1mcm9tIFwiQC9jb3JlL0ludGVyZmFjZUluY2x1ZGVzXCI7XG5pbXBvcnQgeyBJbnRlcmZhY2VUYXJnZXQgfSBmcm9tIFwiQC9jb3JlL0ludGVyZmFjZVRhcmdldFwiO1xuXG5jb25zdCBFTlRSSUVTID0gU3ltYm9sKFwiRU5UUklFU1wiKTtcblxuZnVuY3Rpb24gZ2V0SGVhZGVycyh0YXJnZXQ6IGFueSkge1xuICByZXR1cm4gdGFyZ2V0LlNPVVJDRVMuZmlsdGVyKChpOiBhbnkpID0+IGkuSEVBREVSX0ZJTEVfT05MWSk7XG59XG5cbmZ1bmN0aW9uIGdldEluY2x1ZGVzKHRhcmdldDogYW55KSB7XG4gIHJldHVybiB0YXJnZXQuSU5DTFVERVMubWFwKChpOiBhbnkpID0+IGkuVkFMVUUpO1xufVxuXG5mdW5jdGlvbiBnZXRQdWJsaWNJbmNsdWRlcyh0YXJnZXQ6IGFueSkge1xuICByZXR1cm4gdGFyZ2V0LklOQ0xVREVTLmZpbHRlcigoaTogYW55KSA9PiBpLlBVQkxJQ19PTkxZKS5tYXAoKGk6IGFueSkgPT4gaS5WQUxVRSk7XG59XG5cbmZ1bmN0aW9uIGdldExpYnJhcmllcyh0YXJnZXQ6IGFueSkge1xuICByZXR1cm4gdGFyZ2V0LkxJQlJBUklFUy5tYXAoKGk6IGFueSkgPT4gaS5WQUxVRSk7XG59XG5cbmZ1bmN0aW9uIGdldFB1YmxpY0xpYnJhcmllcyh0YXJnZXQ6IGFueSkge1xuICByZXR1cm4gdGFyZ2V0LkxJQlJBUklFUy5maWx0ZXIoKGk6IGFueSkgPT4gaS5QVUJMSUNfT05MWSkubWFwKChpOiBhbnkpID0+IGkuVkFMVUUpO1xufVxuXG5mdW5jdGlvbiBnZXREZWZpbml0aW9ucyh0YXJnZXQ6IGFueSkge1xuICByZXR1cm4gdGFyZ2V0LkRFRklORVMubWFwKChpOiBhbnkpID0+IGkuVkFMVUUpO1xufVxuXG5mdW5jdGlvbiBnZXRQdWJsaWNEZWZpbml0aW9ucyh0YXJnZXQ6IGFueSkge1xuICByZXR1cm4gdGFyZ2V0LkRFRklORVMuZmlsdGVyKChpOiBhbnkpID0+IGkuUFVCTElDX09OTFkpLm1hcCgoaTogYW55KSA9PiBpLlZBTFVFKTtcbn1cblxuZnVuY3Rpb24gZ2V0Q29tcGlsZU9wdGlvbnModGFyZ2V0OiBhbnkpIHtcbiAgcmV0dXJuIHRhcmdldC5DT01QSUxFX09QVElPTlMubWFwKChpOiBhbnkpID0+IGkuVkFMVUUpO1xufVxuXG5mdW5jdGlvbiBnZXRQdWJsaWNDb21waWxlT3B0aW9ucyh0YXJnZXQ6IGFueSkge1xuICByZXR1cm4gdGFyZ2V0LkNPTVBJTEVfT1BUSU9OUy5maWx0ZXIoKGk6IGFueSkgPT4gaS5QVUJMSUNfT05MWSkubWFwKChpOiBhbnkpID0+IGkuVkFMVUUpO1xufVxuXG5mdW5jdGlvbiBnZXRMaW5rT3B0aW9ucyh0YXJnZXQ6IGFueSkge1xuICByZXR1cm4gdGFyZ2V0LkxJTktfT1BUSU9OUy5tYXAoKGk6IGFueSkgPT4gaS5WQUxVRSk7XG59XG5cbmZ1bmN0aW9uIGdldFB1YmxpY0xpbmtPcHRpb25zKHRhcmdldDogYW55KSB7XG4gIHJldHVybiB0YXJnZXQuTElOS19PUFRJT05TLmZpbHRlcigoaTogYW55KSA9PiBpLlBVQkxJQ19PTkxZKS5tYXAoKGk6IGFueSkgPT4gaS5WQUxVRSk7XG59XG5cbmV4cG9ydCBjbGFzcyBUYXJnZXRDb2xsZWN0aW9uIHtcbiAgcHJpdmF0ZSBbRU5UUklFU106IGFueTtcblxuICBwcml2YXRlIGNvbnN0cnVjdG9yKCkge1xuICAgIHRoaXNbRU5UUklFU10gPSB7fTtcbiAgfVxuXG4gIHB1YmxpYyBzdGF0aWMgY3JlYXRlKCkge1xuICAgIHJldHVybiBPYmplY3Quc2VhbChuZXcgVGFyZ2V0Q29sbGVjdGlvbik7XG4gIH1cbiAgXG4gIHB1YmxpYyBnZXQgRU5UUklFUygpIHtcbiAgICByZXR1cm4gdGhpc1tFTlRSSUVTXTtcbiAgfVxuXG4gIHB1YmxpYyB0b0pTT04oKTogb2JqZWN0IHtcbiAgICByZXR1cm4gdGhpc1tFTlRSSUVTXTtcbiAgfVxuXG4gIHB1YmxpYyBnZXQobmFtZTogc3RyaW5nKTogYW55IHtcbiAgICByZXR1cm4gdGhpc1tFTlRSSUVTXVtuYW1lXTtcbiAgfVxuXG4gIHB1YmxpYyBzZXQobmFtZTogc3RyaW5nLCB0YXJnZXQ6IGFueSkge1xuICAgIGlmICh0aGlzW0VOVFJJRVNdW25hbWVdKVxuICAgICAgdGhyb3cgbmV3IEVycm9yKGBUYXJnZXQgXCIke25hbWV9XCIgZXhpc3RzYCk7XG4gICAgdGhpc1tFTlRSSUVTXVtuYW1lXSA9IHRhcmdldDtcbiAgfVxuXG4gIHByaXZhdGUgX19nZXRBbGxJbmNsdWRlcyhpbmNsdWRlczogc3RyaW5nW10sIHRhcmdldFNldDogU2V0PHN0cmluZz4sIGxpc3Q6IGFueSkge1xuICAgIGZvciAoY29uc3QgaXRlciBvZiBsaXN0KSB7XG4gICAgICBpZiAoaXRlciBpbnN0YW5jZW9mIEludGVyZmFjZUluY2x1ZGVzIHx8IGl0ZXIgaW5zdGFuY2VvZiBJbnRlcmZhY2VUYXJnZXQpIHtcbiAgICAgICAgaWYgKCF0YXJnZXRTZXQuaGFzKGl0ZXIudGFyZ2V0TmFtZSkpIHtcbiAgICAgICAgICB0YXJnZXRTZXQuYWRkKGl0ZXIudGFyZ2V0TmFtZSk7XG4gICAgICAgICAgY29uc3QgdGFyZ2V0ID0gdGhpcy5nZXQoaXRlci50YXJnZXROYW1lKTtcbiAgICAgICAgICB0aGlzLl9fZ2V0QWxsSW5jbHVkZXMoaW5jbHVkZXMsIHRhcmdldFNldCwgZ2V0UHVibGljSW5jbHVkZXModGFyZ2V0KSk7XG4gICAgICAgICAgdGhpcy5fX2dldEFsbEluY2x1ZGVzKGluY2x1ZGVzLCB0YXJnZXRTZXQsIGdldFB1YmxpY0xpYnJhcmllcyh0YXJnZXQpKTtcbiAgICAgICAgfVxuICAgICAgfVxuICAgICAgZWxzZSBpZiAoaXRlciBpbnN0YW5jZW9mIEluY2x1ZGVEaXJlY3RvcnkpIHtcbiAgICAgICAgaWYgKCFpbmNsdWRlcy5pbmNsdWRlcyhpdGVyLnRvU3RyaW5nKCkpKVxuICAgICAgICAgIGluY2x1ZGVzLnB1c2goaXRlci50b1N0cmluZygpKTtcbiAgICAgIH1cbiAgICAgIGVsc2Uge1xuICAgICAgICB0aHJvdyBuZXcgRXJyb3IoYE5vdCBzdXBwb3J0IGluc3RhbmNlICR7aXRlcn1gKTtcbiAgICAgIH1cbiAgICB9XG4gIH1cblxuICBwdWJsaWMgYWxsSW5jbHVkZXNPZihwYXJhbXM6IGFueSk6IHN0cmluZ1tdIHtcbiAgICBjb25zdCB0YXJnZXQgPSAodHlwZW9mIHBhcmFtcyA9PT0gXCJzdHJpbmdcIikgPyB0aGlzLmdldChwYXJhbXMpIDogcGFyYW1zO1xuICAgIGNvbnN0IGluY2x1ZGVzOiBzdHJpbmdbXSA9IFtdO1xuICAgIGNvbnN0IHRhcmdldFNldCA9IG5ldyBTZXQoWyB0YXJnZXQuTkFNRSBdKTtcbiAgICB0aGlzLl9fZ2V0QWxsSW5jbHVkZXMoaW5jbHVkZXMsIHRhcmdldFNldCwgZ2V0SW5jbHVkZXModGFyZ2V0KSk7XG4gICAgdGhpcy5fX2dldEFsbEluY2x1ZGVzKGluY2x1ZGVzLCB0YXJnZXRTZXQsIGdldExpYnJhcmllcyh0YXJnZXQpKTtcbiAgICByZXR1cm4gaW5jbHVkZXM7XG4gIH1cblxuICBwcml2YXRlIF9fZ2V0QWxsSGVhZGVycyhoZWFkZXJzOiBzdHJpbmdbXSwgdGFyZ2V0U2V0OiBTZXQ8c3RyaW5nPiwgbGlzdDogYW55KSB7XG4gICAgZm9yIChjb25zdCBpdGVyIG9mIGxpc3QpIHtcbiAgICAgIGlmIChpdGVyIGluc3RhbmNlb2YgSW50ZXJmYWNlSW5jbHVkZXMgfHwgaXRlciBpbnN0YW5jZW9mIEludGVyZmFjZVRhcmdldCkge1xuICAgICAgICBpZiAoIXRhcmdldFNldC5oYXMoaXRlci50YXJnZXROYW1lKSkge1xuICAgICAgICAgIHRhcmdldFNldC5hZGQoaXRlci50YXJnZXROYW1lKTtcbiAgICAgICAgICBjb25zdCB0YXJnZXQgPSB0aGlzLmdldChpdGVyLnRhcmdldE5hbWUpO1xuICAgICAgICAgIGZvciAoY29uc3QgaGVhZGVyIG9mIGdldEhlYWRlcnModGFyZ2V0KS5tYXAoKGk6IGFueSkgPT4gaS5GSUxFLnRvU3RyaW5nKCkpKSB7XG4gICAgICAgICAgICBpZiAoIWhlYWRlcnMuaW5jbHVkZXMoaGVhZGVyLnRvU3RyaW5nKCkpKVxuICAgICAgICAgICAgICBoZWFkZXJzLnB1c2goaGVhZGVyLnRvU3RyaW5nKCkpO1xuICAgICAgICAgIH1cbiAgICAgICAgICB0aGlzLl9fZ2V0QWxsSGVhZGVycyhoZWFkZXJzLCB0YXJnZXRTZXQsIGdldFB1YmxpY0luY2x1ZGVzKHRhcmdldCkpO1xuICAgICAgICAgIHRoaXMuX19nZXRBbGxIZWFkZXJzKGhlYWRlcnMsIHRhcmdldFNldCwgZ2V0UHVibGljTGlicmFyaWVzKHRhcmdldCkpO1xuICAgICAgICB9XG4gICAgICB9XG4gICAgfVxuICB9XG5cbiAgcHVibGljIGFsbEhlYWRlcnNPZihwYXJhbXM6IGFueSkge1xuICAgIGNvbnN0IHRhcmdldCA9ICh0eXBlb2YgcGFyYW1zID09PSBcInN0cmluZ1wiKSA/IHRoaXMuZ2V0KHBhcmFtcykgOiBwYXJhbXM7XG4gICAgY29uc3QgaGVhZGVycyA9IGdldEhlYWRlcnModGFyZ2V0KS5tYXAoKGk6IGFueSkgPT4gaS5GSUxFLnRvU3RyaW5nKCkpO1xuICAgIGNvbnN0IHRhcmdldFNldCA9IG5ldyBTZXQoWyB0YXJnZXQuTkFNRSBdKTtcbiAgICB0aGlzLl9fZ2V0QWxsSGVhZGVycyhoZWFkZXJzLCB0YXJnZXRTZXQsIGdldEluY2x1ZGVzKHRhcmdldCkpO1xuICAgIHRoaXMuX19nZXRBbGxIZWFkZXJzKGhlYWRlcnMsIHRhcmdldFNldCwgZ2V0TGlicmFyaWVzKHRhcmdldCkpO1xuICAgIHJldHVybiBoZWFkZXJzO1xuICB9XG5cbiAgcHJpdmF0ZSBfX2dldEFsbExpYnJhcmllcyhsaWJyYXJpZXM6IHN0cmluZ1tdLCB0YXJnZXRTZXQ6IFNldDxzdHJpbmc+LCBsaXN0OiBhbnkpIHtcbiAgICBmb3IgKGNvbnN0IGl0ZXIgb2YgbGlzdCkge1xuICAgICAgY29uc29sZS5hc3NlcnQoaXRlciBpbnN0YW5jZW9mIEludGVyZmFjZVRhcmdldCk7XG4gICAgICBpZiAoIXRhcmdldFNldC5oYXMoaXRlci50YXJnZXROYW1lKSkge1xuICAgICAgICB0YXJnZXRTZXQuYWRkKGl0ZXIudGFyZ2V0TmFtZSk7XG4gICAgICAgIGNvbnN0IHRhcmdldCA9IHRoaXMuZ2V0KGl0ZXIudGFyZ2V0TmFtZSk7XG4gICAgICAgIGxpYnJhcmllcy5wdXNoKHRhcmdldC5GSUxFLnRvU3RyaW5nKCkpO1xuICAgICAgICB0aGlzLl9fZ2V0QWxsTGlicmFyaWVzKGxpYnJhcmllcywgdGFyZ2V0U2V0LCBnZXRQdWJsaWNMaWJyYXJpZXModGFyZ2V0KSk7XG4gICAgICB9XG4gICAgfVxuICB9XG5cbiAgcHVibGljIGFsbExpYnJhcmllc09mKHBhcmFtczogYW55KSB7XG4gICAgY29uc3QgdGFyZ2V0ID0gKHR5cGVvZiBwYXJhbXMgPT09IFwic3RyaW5nXCIpID8gdGhpcy5nZXQocGFyYW1zKSA6IHBhcmFtcztcbiAgICBjb25zdCBsaWJyYXJpZXM6IHN0cmluZ1tdID0gW107XG4gICAgY29uc3QgdGFyZ2V0U2V0ID0gbmV3IFNldChbIHRhcmdldC5OQU1FIF0pO1xuICAgIHRoaXMuX19nZXRBbGxMaWJyYXJpZXMobGlicmFyaWVzLCB0YXJnZXRTZXQsIGdldExpYnJhcmllcyh0YXJnZXQpKTtcbiAgICByZXR1cm4gbGlicmFyaWVzO1xuICB9XG5cbiAgcHJpdmF0ZSBfX2dldEFsbERlZmluaXRpb25zKGRlZmluaXRpb25zOiBzdHJpbmdbXSwgdGFyZ2V0U2V0OiBTZXQ8c3RyaW5nPiwgbGlzdDogYW55KSB7XG4gICAgZm9yIChjb25zdCBpdGVyIG9mIGxpc3QpIHtcbiAgICAgIGlmIChpdGVyIGluc3RhbmNlb2YgSW50ZXJmYWNlVGFyZ2V0KSB7XG4gICAgICAgIGlmICghdGFyZ2V0U2V0LmhhcyhpdGVyLnRhcmdldE5hbWUpKSB7XG4gICAgICAgICAgdGFyZ2V0U2V0LmFkZChpdGVyLnRhcmdldE5hbWUpO1xuICAgICAgICAgIGNvbnN0IHRhcmdldCA9IHRoaXMuZ2V0KGl0ZXIudGFyZ2V0TmFtZSk7XG4gICAgICAgICAgdGhpcy5fX2dldEFsbERlZmluaXRpb25zKGRlZmluaXRpb25zLCB0YXJnZXRTZXQsIGdldFB1YmxpY0RlZmluaXRpb25zKHRhcmdldCkpO1xuICAgICAgICAgIHRoaXMuX19nZXRBbGxEZWZpbml0aW9ucyhkZWZpbml0aW9ucywgdGFyZ2V0U2V0LCBnZXRQdWJsaWNMaWJyYXJpZXModGFyZ2V0KSk7XG4gICAgICAgIH1cbiAgICAgIH1cbiAgICAgIGVsc2UgaWYgKHR5cGVvZiBpdGVyID09PSBcInN0cmluZ1wiKSB7XG4gICAgICAgIGlmICghZGVmaW5pdGlvbnMuaW5jbHVkZXMoaXRlcikpXG4gICAgICAgICAgZGVmaW5pdGlvbnMucHVzaChpdGVyKTtcbiAgICAgIH1cbiAgICAgIGVsc2Uge1xuICAgICAgICB0aHJvdyBuZXcgRXJyb3IoYE5vdCBzdXBwb3J0IGluc3RhbmNlICR7aXRlcn1gKTtcbiAgICAgIH1cbiAgICB9XG4gIH1cblxuICBwdWJsaWMgYWxsRGVmaW5pdGlvbnNPZihwYXJhbXM6IGFueSkge1xuICAgIGNvbnN0IHRhcmdldCA9ICh0eXBlb2YgcGFyYW1zID09PSBcInN0cmluZ1wiKSA/IHRoaXMuZ2V0KHBhcmFtcykgOiBwYXJhbXM7XG4gICAgY29uc3QgZGVmaW5pdGlvbnM6IHN0cmluZ1tdID0gW107XG4gICAgY29uc3QgdGFyZ2V0U2V0ID0gbmV3IFNldChbIHRhcmdldC5OQU1FIF0pO1xuICAgIHRoaXMuX19nZXRBbGxEZWZpbml0aW9ucyhkZWZpbml0aW9ucywgdGFyZ2V0U2V0LCBnZXREZWZpbml0aW9ucyh0YXJnZXQpKTtcbiAgICB0aGlzLl9fZ2V0QWxsRGVmaW5pdGlvbnMoZGVmaW5pdGlvbnMsIHRhcmdldFNldCwgZ2V0UHVibGljTGlicmFyaWVzKHRhcmdldCkpO1xuICAgIHJldHVybiBkZWZpbml0aW9ucztcbiAgfVxuXG4gIHByaXZhdGUgX19nZXRBbGxDb21waWxlT3B0aW9ucyhvcHRpb25zOiBBcnJheTxzdHJpbmd8c3RyaW5nW10+LCB0YXJnZXRTZXQ6IFNldDxzdHJpbmc+LCBsaXN0OiBhbnkpIHtcbiAgICBmb3IgKGNvbnN0IGl0ZXIgb2YgbGlzdCkge1xuICAgICAgaWYgKGl0ZXIgaW5zdGFuY2VvZiBJbnRlcmZhY2VUYXJnZXQpIHtcbiAgICAgICAgaWYgKCF0YXJnZXRTZXQuaGFzKGl0ZXIudGFyZ2V0TmFtZSkpIHtcbiAgICAgICAgICB0YXJnZXRTZXQuYWRkKGl0ZXIudGFyZ2V0TmFtZSk7XG4gICAgICAgICAgY29uc3QgdGFyZ2V0ID0gdGhpcy5nZXQoaXRlci50YXJnZXROYW1lKTtcbiAgICAgICAgICB0aGlzLl9fZ2V0QWxsQ29tcGlsZU9wdGlvbnMob3B0aW9ucywgdGFyZ2V0U2V0LCBnZXRQdWJsaWNDb21waWxlT3B0aW9ucyh0YXJnZXQpKTtcbiAgICAgICAgICB0aGlzLl9fZ2V0QWxsQ29tcGlsZU9wdGlvbnMob3B0aW9ucywgdGFyZ2V0U2V0LCBnZXRQdWJsaWNMaWJyYXJpZXModGFyZ2V0KSk7XG4gICAgICAgIH1cbiAgICAgIH1cbiAgICAgIGVsc2UgaWYgKHR5cGVvZiBpdGVyID09PSBcInN0cmluZ1wiKSB7XG4gICAgICAgIGlmICghb3B0aW9ucy5pbmNsdWRlcyhpdGVyKSlcbiAgICAgICAgICBvcHRpb25zLnB1c2goaXRlcik7XG4gICAgICB9XG4gICAgICBlbHNlIGlmIChBcnJheS5pc0FycmF5KGl0ZXIpKSB7XG4gICAgICAgIC8vIFRPRE86IEFkZCBjb21wYXJlIGZvciBzYW1lIGFycmF5IGluIG9wdGlvbnNcbiAgICAgICAgb3B0aW9ucy5wdXNoKGl0ZXIpO1xuICAgICAgfVxuICAgICAgZWxzZSB7XG4gICAgICAgIHRocm93IG5ldyBFcnJvcihgTm90IHN1cHBvcnQgaW5zdGFuY2UgJHtpdGVyfWApO1xuICAgICAgfVxuICAgIH1cbiAgfVxuXG4gIHB1YmxpYyBhbGxDb21waWxlT3B0aW9uc09mKHBhcmFtczogYW55KSB7XG4gICAgY29uc3QgdGFyZ2V0ID0gKHR5cGVvZiBwYXJhbXMgPT09IFwic3RyaW5nXCIpID8gdGhpcy5nZXQocGFyYW1zKSA6IHBhcmFtcztcbiAgICBjb25zdCBvcHRpb25zOiBzdHJpbmdbXSA9IFtdO1xuICAgIGNvbnN0IHRhcmdldFNldCA9IG5ldyBTZXQoWyB0YXJnZXQuTkFNRSBdKTtcbiAgICB0aGlzLl9fZ2V0QWxsQ29tcGlsZU9wdGlvbnMob3B0aW9ucywgdGFyZ2V0U2V0LCBnZXRDb21waWxlT3B0aW9ucyh0YXJnZXQpKTtcbiAgICB0aGlzLl9fZ2V0QWxsQ29tcGlsZU9wdGlvbnMob3B0aW9ucywgdGFyZ2V0U2V0LCBnZXRQdWJsaWNMaWJyYXJpZXModGFyZ2V0KSk7XG4gICAgcmV0dXJuIG9wdGlvbnMuZmxhdCgpO1xuICB9XG5cbiAgcHJpdmF0ZSBfX2dldExpbmtPcHRpb25zKG9wdGlvbnM6IEFycmF5PHN0cmluZ3xzdHJpbmdbXT4sIHRhcmdldFNldDogU2V0PHN0cmluZz4sIGxpc3Q6IGFueSkge1xuICAgIGZvciAoY29uc3QgaXRlciBvZiBsaXN0KSB7XG4gICAgICBpZiAoaXRlciBpbnN0YW5jZW9mIEludGVyZmFjZVRhcmdldCkge1xuICAgICAgICBpZiAoIXRhcmdldFNldC5oYXMoaXRlci50YXJnZXROYW1lKSkge1xuICAgICAgICAgIHRhcmdldFNldC5hZGQoaXRlci50YXJnZXROYW1lKTtcbiAgICAgICAgICBjb25zdCB0YXJnZXQgPSB0aGlzLmdldChpdGVyLnRhcmdldE5hbWUpO1xuICAgICAgICAgIHRoaXMuX19nZXRMaW5rT3B0aW9ucyhvcHRpb25zLCB0YXJnZXRTZXQsIGdldFB1YmxpY0xpbmtPcHRpb25zKHRhcmdldCkpO1xuICAgICAgICAgIHRoaXMuX19nZXRMaW5rT3B0aW9ucyhvcHRpb25zLCB0YXJnZXRTZXQsIGdldFB1YmxpY0xpYnJhcmllcyh0YXJnZXQpKTtcbiAgICAgICAgfVxuICAgICAgfVxuICAgICAgZWxzZSBpZiAodHlwZW9mIGl0ZXIgPT09IFwic3RyaW5nXCIpIHtcbiAgICAgICAgaWYgKCFvcHRpb25zLmluY2x1ZGVzKGl0ZXIpKVxuICAgICAgICAgIG9wdGlvbnMucHVzaChpdGVyKTtcbiAgICAgIH1cbiAgICAgIGVsc2UgaWYgKEFycmF5LmlzQXJyYXkoaXRlcikpIHtcbiAgICAgICAgLy8gVE9ETzogQWRkIGNvbXBhcmUgZm9yIHNhbWUgYXJyYXkgaW4gb3B0aW9uc1xuICAgICAgICBvcHRpb25zLnB1c2goaXRlcik7XG4gICAgICB9XG4gICAgICBlbHNlIHtcbiAgICAgICAgdGhyb3cgbmV3IEVycm9yKGBOb3Qgc3VwcG9ydCBpbnN0YW5jZSAke2l0ZXJ9YCk7XG4gICAgICB9XG4gICAgfVxuICB9XG5cbiAgcHVibGljIGFsbExpbmtPcHRpb25zT2YocGFyYW1zOiBhbnkpIHtcbiAgICBjb25zdCB0YXJnZXQgPSAodHlwZW9mIHBhcmFtcyA9PT0gXCJzdHJpbmdcIikgPyB0aGlzLmdldChwYXJhbXMpIDogcGFyYW1zO1xuICAgIGNvbnN0IG9wdGlvbnM6IHN0cmluZ1tdID0gW107XG4gICAgY29uc3QgdGFyZ2V0U2V0ID0gbmV3IFNldChbIHRhcmdldC5OQU1FIF0pO1xuICAgIHRoaXMuX19nZXRMaW5rT3B0aW9ucyhvcHRpb25zLCB0YXJnZXRTZXQsIGdldExpbmtPcHRpb25zKHRhcmdldCkpO1xuICAgIHRoaXMuX19nZXRMaW5rT3B0aW9ucyhvcHRpb25zLCB0YXJnZXRTZXQsIGdldFB1YmxpY0xpYnJhcmllcyh0YXJnZXQpKTtcbiAgICByZXR1cm4gb3B0aW9ucy5mbGF0KCk7XG4gIH1cbn1cbiIsIi8qXG4gKiBNSVQgTGljZW5zZVxuICpcbiAqIENvcHlyaWdodCAoYykgMjAyNSAgWXVyaWkgWWFrdWJpbiAoeXVyaWkueWFrdWJpbkBnbWFpbC5jb20pXG4gKlxuICogUGVybWlzc2lvbiBpcyBncmFudGVkIHRvIHVzZSwgY29weSwgbW9kaWZ5LCBhbmQgZGlzdHJpYnV0ZSB0aGlzIHNvZnR3YXJlXG4gKiB1bmRlciB0aGUgTUlUIExpY2Vuc2UuIFNlZSBMSUNFTlNFIGZpbGUgZm9yIGRldGFpbHMuXG4gKi9cblxuaW1wb3J0IHsgZmluZFByb2dyYW0gfSBmcm9tIFwiQC9jb3JlL0ZpbmRQcm9ncmFtXCI7XG5pbXBvcnQgeyBHbG9iYWxDb250ZXh0IH0gZnJvbSBcIkAvY29yZS9HbG9iYWxDb250ZXh0XCI7XG5pbXBvcnQgeyBTY29wZUhlbHBlciB9IGZyb20gXCJAL2NvcmUvU2NvcGVcIjtcbmltcG9ydCB7IFN5c3RlbVNjb3BlIH0gZnJvbSBcIkAvY29yZS9TeXN0ZW1TY29wZVwiO1xuXG5jb25zdCBHTE9CQUwgPSBTeW1ib2woXCJHTE9CQUxcIik7XG5jb25zdCBTQ09QRSA9IFN5bWJvbChcIlNDT1BFXCIpO1xuXG5leHBvcnQgY2xhc3MgVG9vbGNoYWluQ29udGV4dCB7XG4gIHByaXZhdGUgW1NDT1BFXTogU3lzdGVtU2NvcGU7XG4gIHByaXZhdGUgW0dMT0JBTF06IEdsb2JhbENvbnRleHQ7XG5cbiAgcHJpdmF0ZSBjb25zdHJ1Y3RvcihzY29wZTogU3lzdGVtU2NvcGUsIGdsb2JhbDogR2xvYmFsQ29udGV4dCkge1xuICAgIHRoaXNbU0NPUEVdID0gc2NvcGU7XG4gICAgdGhpc1tHTE9CQUxdID0gZ2xvYmFsO1xuICB9XG5cbiAgcHVibGljIHN0YXRpYyBjcmVhdGUoc2NvcGU6IFN5c3RlbVNjb3BlLCBnbG9iYWw6IEdsb2JhbENvbnRleHQpIHtcbiAgICBjb25zdCBwcm90byA9IFRvb2xjaGFpbkNvbnRleHQucHJvdG90eXBlO1xuICAgIGNvbnN0IG5ld1Njb3BlID0gT2JqZWN0LmNyZWF0ZShwcm90byk7XG4gICAgU2NvcGVIZWxwZXIuY2xvbmUobmV3U2NvcGUsIHNjb3BlKTtcbiAgICBjb25zdCBzZWxmID0gT2JqZWN0LmNyZWF0ZShuZXdTY29wZSk7XG4gICAgc2VsZltTQ09QRV0gPSBuZXdTY29wZTtcbiAgICBzZWxmW0dMT0JBTF0gPSBnbG9iYWw7XG4gICAgcmV0dXJuIHNlbGY7XG4gIH1cblxuICBwdWJsaWMgX3Njb3BlKCkge1xuICAgIHJldHVybiB0aGlzW1NDT1BFXTtcbiAgfVxufTtcblxuT2JqZWN0LmRlZmluZVByb3BlcnR5KFRvb2xjaGFpbkNvbnRleHQucHJvdG90eXBlLCBcImZpbmRQcm9ncmFtXCIsIHtcbiAgdmFsdWU6IGZpbmRQcm9ncmFtLFxuICBlbnVtZXJhYmxlOiBmYWxzZSxcbn0pO1xuIiwiLypcbiAqIE1JVCBMaWNlbnNlXG4gKlxuICogQ29weXJpZ2h0IChjKSAyMDI1ICBZdXJpaSBZYWt1YmluICh5dXJpaS55YWt1YmluQGdtYWlsLmNvbSlcbiAqXG4gKiBQZXJtaXNzaW9uIGlzIGdyYW50ZWQgdG8gdXNlLCBjb3B5LCBtb2RpZnksIGFuZCBkaXN0cmlidXRlIHRoaXMgc29mdHdhcmVcbiAqIHVuZGVyIHRoZSBNSVQgTGljZW5zZS4gU2VlIExJQ0VOU0UgZmlsZSBmb3IgZGV0YWlscy5cbiAqL1xuXG5leHBvcnQgY29uc3QgREVCVUdfQlVJTERfVFlQRSA9IFwiRGVidWdcIjtcbmV4cG9ydCBjb25zdCBSRUxFQVNFX0JVSUxEX1RZUEUgPSBcIlJlbGVhc2VcIjtcbiIsIi8qXG4gKiBNSVQgTGljZW5zZVxuICpcbiAqIENvcHlyaWdodCAoYykgMjAyNSAgWXVyaWkgWWFrdWJpbiAoeXVyaWkueWFrdWJpbkBnbWFpbC5jb20pXG4gKlxuICogUGVybWlzc2lvbiBpcyBncmFudGVkIHRvIHVzZSwgY29weSwgbW9kaWZ5LCBhbmQgZGlzdHJpYnV0ZSB0aGlzIHNvZnR3YXJlXG4gKiB1bmRlciB0aGUgTUlUIExpY2Vuc2UuIFNlZSBMSUNFTlNFIGZpbGUgZm9yIGRldGFpbHMuXG4gKi9cblxuY29uc3QgTkFNRSA9IFN5bWJvbChcIk5BTUVcIik7XG5jb25zdCBJTkNMVURFUyA9IFN5bWJvbChcIklOQ0xVREVTXCIpO1xuY29uc3QgU09VUkNFUyA9IFN5bWJvbChcIlNPVVJDRVNcIik7XG5jb25zdCBERUZJTkVTID0gU3ltYm9sKFwiREVGSU5FU1wiKTtcbmNvbnN0IENPTVBJTEVfT1BUSU9OUyA9IFN5bWJvbChcIkNPTVBJTEVfT1BUSU9OU1wiKTtcbmNvbnN0IExJTktfT1BUSU9OUyA9IFN5bWJvbChcIkxJTktfT1BUSU9OU1wiKTtcblxuZXhwb3J0IGNsYXNzIFVua25vd25UYXJnZXQge1xuICBwcml2YXRlIFtOQU1FXTogc3RyaW5nO1xuICBwcml2YXRlIFtJTkNMVURFU106IGFueVtdO1xuICBwcml2YXRlIFtTT1VSQ0VTXTogYW55W107XG4gIHByaXZhdGUgW0RFRklORVNdOiBhbnlbXTtcbiAgcHJpdmF0ZSBbQ09NUElMRV9PUFRJT05TXTogYW55W107XG4gIHByaXZhdGUgW0xJTktfT1BUSU9OU106IGFueVtdO1xuXG4gIHByaXZhdGUgY29uc3RydWN0b3IobmFtZTogc3RyaW5nKSB7XG4gICAgdGhpc1tOQU1FXSA9IG5hbWU7XG4gICAgdGhpc1tJTkNMVURFU10gPSBbXTtcbiAgICB0aGlzW1NPVVJDRVNdID0gW107XG4gICAgdGhpc1tERUZJTkVTXSA9IFtdO1xuICAgIHRoaXNbQ09NUElMRV9PUFRJT05TXSA9IFtdO1xuICAgIHRoaXNbTElOS19PUFRJT05TXSA9IFtdO1xuICB9XG5cbiAgcHVibGljIHN0YXRpYyBjcmVhdGUobmFtZTogc3RyaW5nKSB7XG4gICAgcmV0dXJuIE9iamVjdC5zZWFsKG5ldyBVbmtub3duVGFyZ2V0KG5hbWUpKTtcbiAgfVxuXG4gIHB1YmxpYyBzdGF0aWMgZW5zdXJlSW5zdGFuY2UodmFsdWU6IGFueSkge1xuICAgIGlmICh2YWx1ZSBpbnN0YW5jZW9mIFVua25vd25UYXJnZXQpXG4gICAgICByZXR1cm4gdmFsdWU7XG4gICAgdGhyb3cgbmV3IEVycm9yKGBUaGUgJyR7dmFsdWV9JyBpcyBub3QgYSBVbmtub3duVGFyZ2V0YCk7XG4gIH1cblxuICBwdWJsaWMgZ2V0IE5BTUUgKCkge1xuICAgIHJldHVybiB0aGlzW05BTUVdO1xuICB9XG5cbiAgcHVibGljIGdldCBJTkNMVURFUyAoKSB7XG4gICAgcmV0dXJuIHRoaXNbSU5DTFVERVNdO1xuICB9XG5cbiAgcHVibGljIGdldCBTT1VSQ0VTICgpIHtcbiAgICByZXR1cm4gdGhpc1tTT1VSQ0VTXTtcbiAgfVxuXG4gIHB1YmxpYyBnZXQgREVGSU5FUyAoKSB7XG4gICAgcmV0dXJuIHRoaXNbREVGSU5FU107XG4gIH1cblxuICBwdWJsaWMgZ2V0IENPTVBJTEVfT1BUSU9OUyAoKSB7XG4gICAgcmV0dXJuIHRoaXNbQ09NUElMRV9PUFRJT05TXTtcbiAgfVxuXG4gIHB1YmxpYyBnZXQgTElOS19PUFRJT05TICgpIHtcbiAgICByZXR1cm4gdGhpc1tMSU5LX09QVElPTlNdO1xuICB9XG5cbiAgcHVibGljIHRvSlNPTigpOiBvYmplY3Qge1xuICAgIHJldHVybiB7XG4gICAgICBOQU1FOiB0aGlzLk5BTUUsXG4gICAgICBJTkNMVURFUzogdGhpcy5JTkNMVURFUyxcbiAgICAgIFNPVVJDRVM6IHRoaXMuU09VUkNFUyxcbiAgICAgIERFRklORVM6IHRoaXMuREVGSU5FUyxcbiAgICAgIENPTVBJTEVfT1BUSU9OUzogdGhpcy5DT01QSUxFX09QVElPTlMsXG4gICAgICBMSU5LX09QVElPTlM6IHRoaXMuTElOS19PUFRJT05TLFxuICAgIH07XG4gIH1cblxuICBwdWJsaWMgdG9TdHJpbmcoKTogc3RyaW5nIHtcbiAgICByZXR1cm4gXCIke1wiICsgdGhpc1tOQU1FXSArIFwifVwiO1xuICB9XG59O1xuIiwiLypcbiAqIE1JVCBMaWNlbnNlXG4gKlxuICogQ29weXJpZ2h0IChjKSAyMDI1ICBZdXJpaSBZYWt1YmluICh5dXJpaS55YWt1YmluQGdtYWlsLmNvbSlcbiAqXG4gKiBQZXJtaXNzaW9uIGlzIGdyYW50ZWQgdG8gdXNlLCBjb3B5LCBtb2RpZnksIGFuZCBkaXN0cmlidXRlIHRoaXMgc29mdHdhcmVcbiAqIHVuZGVyIHRoZSBNSVQgTGljZW5zZS4gU2VlIExJQ0VOU0UgZmlsZSBmb3IgZGV0YWlscy5cbiAqL1xuXG5pbXBvcnQgcGF0aCBmcm9tIFwibm9kZTpwYXRoXCI7XG5cbmltcG9ydCB7IGZpbGVFeGlzdHNTeW5jIH0gZnJvbSBcIkAvdXRpbHMvRmlsZVN5c3RlbVwiO1xuaW1wb3J0IHsgQWJzb2x1dGVQYXRoIH0gZnJvbSBcIkAvY29yZS9QYXRoXCI7XG5pbXBvcnQgeyBJbnRlcmZhY2VUYXJnZXQgfSBmcm9tIFwiQC9jb3JlL0ludGVyZmFjZVRhcmdldFwiO1xuaW1wb3J0IHsgSW50ZXJmYWNlU2NyaXB0IH0gZnJvbSBcIkAvY29yZS9JbnRlcmZhY2VTY3JpcHRcIjtcbmltcG9ydCB7IEluc3RhbGxFbnRpdHkgfSBmcm9tIFwiQC9jb3JlL0luc3RhbGxFbnRpdHlcIjtcbmltcG9ydCB7IE9iamVjdExpYnJhcnksIFN0YXRpY0xpYnJhcnksIFNoYXJlZExpYnJhcnksIEV4ZWN1dGFibGUsIEJhc2VUYXJnZXQgfSBmcm9tIFwiQC9jb3JlL1RhcmdldFwiO1xuaW1wb3J0IHsgSW5jbHVkZURpcmVjdG9yeSB9IGZyb20gXCJAL2NvcmUvSW5jbHVkZURpcmVjdG9yeVwiO1xuaW1wb3J0IHsgQ3VzdG9tU2NyaXB0IH0gZnJvbSBcIkAvY29yZS9DdXN0b21TY3JpcHRcIjtcbmltcG9ydCB7IEdsb2JhbENvbnRleHQgfSBmcm9tIFwiQC9jb3JlL0dsb2JhbENvbnRleHRcIjtcbmltcG9ydCB7IFNjb3BlSGVscGVyIH0gZnJvbSBcIkAvY29yZS9TY29wZVwiO1xuaW1wb3J0IHsgU3lzdGVtU2NvcGUgfSBmcm9tIFwiQC9jb3JlL1N5c3RlbVNjb3BlXCI7XG5pbXBvcnQgeyBmaW5kUHJvZ3JhbSB9IGZyb20gXCJAL2NvcmUvRmluZFByb2dyYW1cIjtcbmltcG9ydCB7IGNyZWF0ZUxvZ2dlciB9IGZyb20gXCJAL2xvZ2dlclwiO1xuXG5jb25zdCBsb2dnZXIgPSBjcmVhdGVMb2dnZXIoaW1wb3J0Lm1ldGEudXJsKTtcblxuY29uc3QgcmVxdWlyZUltcGwgPSBldmFsKFwicmVxdWlyZVwiKTtcblxuZnVuY3Rpb24gc2NvcGVWYWx1ZUFzUHJpbWl0aXZlcyhvOiBhbnkpOiBhbnkge1xuICBpZiAodHlwZW9mIG8gPT09IFwidW5kZWZpbmVkXCIpXG4gICAgcmV0dXJuIG87XG4gIGlmICh0eXBlb2YgbyA9PT0gXCJib29sZWFuXCIpXG4gICAgcmV0dXJuIG87XG4gIGlmICh0eXBlb2YgbyA9PT0gXCJudW1iZXJcIilcbiAgICByZXR1cm4gbztcbiAgaWYgKHR5cGVvZiBvID09PSBcInN0cmluZ1wiKVxuICAgIHJldHVybiBvO1xuICBpZiAodHlwZW9mIG8gPT09IFwib2JqZWN0XCIpIHtcbiAgICBpZiAoIW8pXG4gICAgICByZXR1cm4gbztcbiAgICBpZiAobyBpbnN0YW5jZW9mIEFic29sdXRlUGF0aCkge1xuICAgICAgcmV0dXJuIG8udG9TdHJpbmcoKTtcbiAgICB9XG4gICAgaWYgKG8gaW5zdGFuY2VvZiBBcnJheSkge1xuICAgICAgY29uc3QgcmVzdWx0ID0gW107XG4gICAgICBmb3IgKGNvbnN0IGkgb2YgbylcbiAgICAgICAgcmVzdWx0LnB1c2goc2NvcGVWYWx1ZUFzUHJpbWl0aXZlcyhpKSk7XG4gICAgICByZXR1cm4gcmVzdWx0O1xuICAgIH1cbiAgICBpZiAobyBpbnN0YW5jZW9mIE9iamVjdCkge1xuICAgICAgY29uc3QgcmVzdWx0OiBhbnkgPSB7fTtcbiAgICAgIGZvciAoY29uc3QgW2ssdl0gb2YgT2JqZWN0LmVudHJpZXMobykpXG4gICAgICAgIHJlc3VsdFtrXSA9IHNjb3BlVmFsdWVBc1ByaW1pdGl2ZXModik7XG4gICAgICByZXR1cm4gcmVzdWx0O1xuICAgIH1cbiAgfVxuICB0aHJvdyBuZXcgRXJyb3IoYFVua25vd24gaW5zdGFuY2Ugb2YgJHtvfWApO1xufVxuXG5jb25zdCBHTE9CQUwgPSBTeW1ib2woXCJHTE9CQUxcIik7XG5jb25zdCBTQ09QRSA9IFN5bWJvbChcIlNDT1BFXCIpO1xuXG5leHBvcnQgY2xhc3MgVXNlckNvbnRleHQge1xuICBwcml2YXRlIFtTQ09QRV06IFN5c3RlbVNjb3BlO1xuICBwcml2YXRlIFtHTE9CQUxdOiBHbG9iYWxDb250ZXh0O1xuXG4gIHByaXZhdGUgY29uc3RydWN0b3Ioc2NvcGU6IFN5c3RlbVNjb3BlLCBnbG9iYWw6IEdsb2JhbENvbnRleHQpIHtcbiAgICB0aGlzW1NDT1BFXSA9IHNjb3BlO1xuICAgIHRoaXNbR0xPQkFMXSA9IGdsb2JhbDtcbiAgfVxuXG4gIHB1YmxpYyBzdGF0aWMgY3JlYXRlKHNjb3BlOiBTeXN0ZW1TY29wZSwgZ2xvYmFsOiBHbG9iYWxDb250ZXh0KTogVXNlckNvbnRleHQge1xuICAgIGNvbnN0IHByb3RvID0gVXNlckNvbnRleHQucHJvdG90eXBlO1xuICAgIGNvbnN0IG5ld1Njb3BlID0gT2JqZWN0LmNyZWF0ZShwcm90byk7XG4gICAgU2NvcGVIZWxwZXIuY2xvbmUobmV3U2NvcGUsIHNjb3BlKTtcbiAgICBjb25zdCBvYmogPSBPYmplY3QuY3JlYXRlKG5ld1Njb3BlKTtcbiAgICBvYmpbU0NPUEVdID0gbmV3U2NvcGU7XG4gICAgb2JqW0dMT0JBTF0gPSBnbG9iYWw7XG4gICAgcmV0dXJuIG9iajtcbiAgfVxuXG4gIHB1YmxpYyBnZXRDYWNoZVZhcmlhYmxlcygpIHtcbiAgICByZXR1cm4gU2NvcGVIZWxwZXIuZ2V0VmFyaWFibGVzQnlHcm91cCh0aGlzW1NDT1BFXSwgXCJjYWNoZVwiKTtcbiAgfVxuXG4gIHB1YmxpYyBhZGRDYWNoZVZhcmlhYmxlcyhwYXJhbXM6IGFueSkge1xuICAgIGxldCB2YXJpYWJsZXMgPSBwYXJhbXM7XG4gICAgaWYgKHR5cGVvZiBwYXJhbXMgPT09IFwic3RyaW5nXCIpIHtcbiAgICAgIGNvbnN0IGZpbGVuYW1lID0gdGhpc1tTQ09QRV0uU09VUkNFX0RJUi5yZXNvbHZlKHBhcmFtcykudG9TdHJpbmcoKTtcbiAgICAgIGlmICghZmlsZUV4aXN0c1N5bmMoZmlsZW5hbWUpKVxuICAgICAgICByZXR1cm47XG4gICAgICB2YXJpYWJsZXMgPSByZXF1aXJlSW1wbChmaWxlbmFtZSk7XG4gICAgfVxuICAgIFxuICAgIFNjb3BlSGVscGVyLmRlZmluZVZhcmlhYmxlcyh0aGlzW1NDT1BFXSwgXCJjYWNoZVwiLCB2YXJpYWJsZXMpO1xuICB9XG5cbiAgcHVibGljIGFkZEluY2x1ZGVEaXJlY3RvcmllcyguLi5kaXJzOiBhbnlbXSkge1xuICAgIGNvbnN0IHNvdXJjZURpciA9IHRoaXNbU0NPUEVdLlNPVVJDRV9ESVI7XG4gICAgZm9yIChjb25zdCBpdGVyIG9mIGRpcnMuZmxhdCgxKSkge1xuICAgICAgdGhpc1tTQ09QRV0uSU5DTFVERVMucHVzaChJbmNsdWRlRGlyZWN0b3J5LmNyZWF0ZShpdGVyLCBzb3VyY2VEaXIpKTtcbiAgICB9XG4gIH1cblxuICBwdWJsaWMgYWRkU3ViZGlyZWN0b3J5KHNvdXJjZURpcjogYW55LCBiaW5hcnlEaXI6IGFueSkge1xuICAgIGJpbmFyeURpciA9IGJpbmFyeURpciB8fCBwYXRoLmlzQWJzb2x1dGUoc291cmNlRGlyKSA/IHVuZGVmaW5lZCA6IHNvdXJjZURpcjtcblxuICAgIGNvbnN0IFNPVVJDRV9ESVIgPSBwYXRoLmlzQWJzb2x1dGUoc291cmNlRGlyKSA/IEFic29sdXRlUGF0aC5jcmVhdGUoc291cmNlRGlyKSA6IHRoaXNbU0NPUEVdLlNPVVJDRV9ESVIuam9pbihzb3VyY2VEaXIpO1xuICAgIGNvbnN0IEJJTkFSWV9ESVIgPSBwYXRoLmlzQWJzb2x1dGUoYmluYXJ5RGlyKSA/IEFic29sdXRlUGF0aC5jcmVhdGUoYmluYXJ5RGlyKSA6IHRoaXNbU0NPUEVdLkJJTkFSWV9ESVIuam9pbihiaW5hcnlEaXIpO1xuXG4gICAgY29uc3QgbmV3U2NvcGUgPSBTY29wZUhlbHBlci5jbG9uZSh7fSwgdGhpc1tTQ09QRV0pO1xuICAgIFNjb3BlSGVscGVyLmFwcGx5VmFyaWFibGVzKG5ld1Njb3BlLCB0aGlzKTtcblxuICAgIG5ld1Njb3BlLlNPVVJDRV9ESVIgPSBBYnNvbHV0ZVBhdGguY3JlYXRlKHRoaXNbR0xPQkFMXS5yZXNvbHZlU3ViZGlyZWN0b3J5KFNPVVJDRV9ESVIpLnRvU3RyaW5nKCkpO1xuICAgIG5ld1Njb3BlLkJJTkFSWV9ESVIgPSBCSU5BUllfRElSO1xuXG4gICAgdGhpc1tHTE9CQUxdLmFkZFN1YmRpcmVjdG9yeShuZXdTY29wZSk7XG4gIH1cblxuICBwdWJsaWMgYWRkQ3VzdG9tU2NyaXB0KG5hbWU6IHN0cmluZywgcGFyYW1zOiBhbnkpOiBDdXN0b21TY3JpcHQge1xuICAgIGlmICghcGFyYW1zIHx8ICFwYXJhbXMuc2NyaXB0IHx8ICFwYXJhbXMub3V0cHV0KVxuICAgICAgdGhyb3cgbmV3IEVycm9yKGBVa25vd24gcGFyYW1zICR7SlNPTi5zdHJpbmdpZnkocGFyYW1zKX1gKTtcblxuICAgIGxldCBzY3JpcHQ7XG4gICAgaWYgKHR5cGVvZiBwYXJhbXMuc2NyaXB0ID09PSBcInN0cmluZ1wiKVxuICAgICAgc2NyaXB0ID0gdGhpc1tHTE9CQUxdLmZpbmRTY3JpcHRGdW5jdGlvbihwYXJhbXMuc2NyaXB0KTtcbiAgICBpZiAoIXNjcmlwdClcbiAgICAgIHNjcmlwdCA9IHRoaXNbU0NPUEVdLlNPVVJDRV9ESVIucmVzb2x2ZShwYXJhbXMuc2NyaXB0KTtcblxuICAgIGNvbnN0IHRhcmdldCA9IEN1c3RvbVNjcmlwdC5jcmVhdGUodGhpc1tTQ09QRV0sIG5hbWUsIHNjcmlwdCwgcGFyYW1zLm91dHB1dCwgcGFyYW1zKTtcbiAgICB0aGlzW0dMT0JBTF0uU0NSSVBUUy5zZXQobmFtZSwgdGFyZ2V0KTtcbiAgICByZXR1cm4gdGFyZ2V0O1xuICB9XG5cbiAgcHVibGljIHRhcmdldChuYW1lOiBzdHJpbmcpIHtcbiAgICBjb25zdCB1dGFyZ2V0ID0gdGhpc1tHTE9CQUxdLmdldFVrbm93blRhcmdldChuYW1lKTtcbiAgICByZXR1cm4gSW50ZXJmYWNlVGFyZ2V0LmNyZWF0ZSh0aGlzW1NDT1BFXSwgdXRhcmdldCk7XG4gIH1cblxuICBwdWJsaWMgc2NyaXB0KG5hbWU6IHN0cmluZykge1xuICAgIGxldCBzY3JpcHQgPSB0aGlzW0dMT0JBTF0uSU5URVJGQUNFX1NDUklQVFNbbmFtZV07XG4gICAgaWYgKCFzY3JpcHQpIHtcbiAgICAgIHNjcmlwdCA9IEludGVyZmFjZVNjcmlwdC5jcmVhdGUobmFtZSk7XG4gICAgICB0aGlzW0dMT0JBTF0uSU5URVJGQUNFX1NDUklQVFNbbmFtZV0gPSBzY3JpcHQ7XG4gICAgfVxuICAgIHJldHVybiBzY3JpcHQ7XG4gIH1cblxuICBwdWJsaWMgaW5zdGFsbCh2YWx1ZTogYW55LCBwYXJhbXM6IGFueSkge1xuICAgIGZvciAoY29uc3QgaXQgb2YgWyB2YWx1ZSBdLmZsYXQoMSkpIHtcbiAgICAgIGNvbnN0IGl0ZXIgPSAoaXQgaW5zdGFuY2VvZiBCYXNlVGFyZ2V0KSA/IHRoaXMudGFyZ2V0KGl0Lk5BTUUpIDogaXQ7XG4gICAgICBjb25zdCBlbnRpdHkgPSBJbnN0YWxsRW50aXR5LmNyZWF0ZSh0aGlzLCBpdGVyLCBwYXJhbXMpO1xuICAgICAgdGhpc1tHTE9CQUxdLklOU1RBTExfTElTVC5wdXNoKGVudGl0eSk7XG4gICAgfVxuICB9XG5cbiAgcHVibGljIGFkZFN0YXRpY0xpYnJhcnkobmFtZTogYW55LCAuLi5zb3VyY2VzOiBhbnlbXSkge1xuICAgIGNvbnN0IHRhcmdldCA9IFN0YXRpY0xpYnJhcnkuY3JlYXRlKHRoaXNbU0NPUEVdLCBuYW1lKTtcbiAgICB0YXJnZXQuYWRkU291cmNlcyguLi5zb3VyY2VzKTtcbiAgXG4gICAgdGhpc1tHTE9CQUxdLlRBUkdFVFMuc2V0KG5hbWUsIHRhcmdldCk7XG4gICAgcmV0dXJuIHRhcmdldDtcbiAgfVxuXG4gIHB1YmxpYyBhZGRPYmplY3RMaWJyYXJ5KG5hbWU6IGFueSwgLi4uc291cmNlczogYW55W10pIHtcbiAgICBjb25zdCB0YXJnZXQgPSBPYmplY3RMaWJyYXJ5LmNyZWF0ZSh0aGlzW1NDT1BFXSwgbmFtZSk7XG4gICAgdGFyZ2V0LmFkZFNvdXJjZXMoLi4uc291cmNlcyk7XG5cbiAgICB0aGlzW0dMT0JBTF0uVEFSR0VUUy5zZXQobmFtZSwgdGFyZ2V0KTtcbiAgICByZXR1cm4gdGFyZ2V0O1xuICB9XG5cbiAgcHVibGljIGFkZFNoYXJlZExpYnJhcnkobmFtZTogYW55LCAuLi5zb3VyY2VzOiBhbnlbXSkge1xuICAgIGNvbnN0IHRhcmdldCA9IFNoYXJlZExpYnJhcnkuY3JlYXRlKHRoaXNbU0NPUEVdLCBuYW1lKTtcbiAgICB0YXJnZXQuYWRkU291cmNlcyguLi5zb3VyY2VzKTtcbiAgXG4gICAgdGhpc1tHTE9CQUxdLlRBUkdFVFMuc2V0KG5hbWUsIHRhcmdldCk7XG4gICAgcmV0dXJuIHRhcmdldDtcbiAgfVxuXG4gIHB1YmxpYyBhZGRFeGVjdXRhYmxlKG5hbWU6IHN0cmluZywgLi4uc291cmNlczogYW55W10pIHtcbiAgICBjb25zdCB0YXJnZXQgPSBFeGVjdXRhYmxlLmNyZWF0ZSh0aGlzW1NDT1BFXSwgbmFtZSk7XG4gICAgdGFyZ2V0LmFkZFNvdXJjZXMoLi4uc291cmNlcyk7XG4gIFxuICAgIHRoaXNbR0xPQkFMXS5UQVJHRVRTLnNldChuYW1lLCB0YXJnZXQpO1xuICAgIHJldHVybiB0YXJnZXQ7XG4gIH1cblxuICBwdWJsaWMgZXhlY3V0ZVNjcmlwdChzY3JpcHQ6IGFueSwgb3B0aW9uczogYW55KSB7XG4gICAgY29uc3Qgc2NyaXB0UGF0aCA9IHRoaXNbU0NPUEVdLlNPVVJDRV9ESVIucmVzb2x2ZShzY3JpcHQpO1xuICAgIGNvbnN0IG1vZHVsZSA9IHJlcXVpcmVJbXBsKHNjcmlwdFBhdGgudG9TdHJpbmcoKSk7XG4gICAgbW9kdWxlKHNjb3BlVmFsdWVBc1ByaW1pdGl2ZXMob3B0aW9ucykpO1xuICB9XG59O1xuXG5PYmplY3QuZGVmaW5lUHJvcGVydHkoVXNlckNvbnRleHQucHJvdG90eXBlLCBcImZpbmRQcm9ncmFtXCIsIHtcbiAgdmFsdWU6IGZpbmRQcm9ncmFtLFxuICBlbnVtZXJhYmxlOiBmYWxzZSxcbn0pO1xuIiwiLypcbiAqIE1JVCBMaWNlbnNlXG4gKlxuICogQ29weXJpZ2h0IChjKSAyMDI1ICBZdXJpaSBZYWt1YmluICh5dXJpaS55YWt1YmluQGdtYWlsLmNvbSlcbiAqXG4gKiBQZXJtaXNzaW9uIGlzIGdyYW50ZWQgdG8gdXNlLCBjb3B5LCBtb2RpZnksIGFuZCBkaXN0cmlidXRlIHRoaXMgc29mdHdhcmVcbiAqIHVuZGVyIHRoZSBNSVQgTGljZW5zZS4gU2VlIExJQ0VOU0UgZmlsZSBmb3IgZGV0YWlscy5cbiAqL1xuXG5pbXBvcnQgcGF0aCBmcm9tIFwibm9kZTpwYXRoXCI7XG5cbmV4cG9ydCBmdW5jdGlvbiBmaWxlbmFtZVRvUHJhZ21hT25jZU1hY3JvKGZpbGVwYXRoOiBzdHJpbmcsIGRlZXA6IG51bWJlcikge1xuICBpZiAodHlwZW9mIGRlZXAgPT09ICd1bmRlZmluZWQnKVxuICAgIGRlZXAgPSAzO1xuXG4gIGxldCBjb21wb25lbnRzID0gcGF0aC5ub3JtYWxpemUoZmlsZXBhdGgpLnNwbGl0KHBhdGguc2VwKTtcbiAgaWYgKGNvbXBvbmVudHMubGVuZ3RoID4gZGVlcClcbiAgICBjb21wb25lbnRzID0gY29tcG9uZW50cy5zbGljZShjb21wb25lbnRzLmxlbmd0aCAtIGRlZXApO1xuXG4gIHJldHVybiBcIl9cIiArIGNvbXBvbmVudHMuam9pbignXycpLnJlcGxhY2UoL1stIC46JX5dL2csICdfJykudG9VcHBlckNhc2UoKTtcbn1cblxuZXhwb3J0IGZ1bmN0aW9uIGxpbmVUb1NpbmdsQ29tbWVudChsaW5lOiBzdHJpbmcpIHtcbiAgcmV0dXJuIFwiLy9cIiArIGxpbmU7XG59XG5cbmV4cG9ydCBmdW5jdGlvbiBsaW5lVG9NdWx0aXBsZUNvbW1lbnQobGluZTogc3RyaW5nKSB7XG4gIHJldHVybiBgLyogJHtsaW5lfSAqL2A7XG59XG5cbmV4cG9ydCBmdW5jdGlvbiBnZW5lcmF0ZWRTY3JpcHROYW1lQ29tbWVudChmaWxlbmFtZTogc3RyaW5nKSB7XG4gIHJldHVybiBsaW5lVG9NdWx0aXBsZUNvbW1lbnQoXCJHZW5lcmF0ZWQgZnJvbSBcIiArIHBhdGguYmFzZW5hbWUoZmlsZW5hbWUpKTtcbn1cbiIsIi8qXG4gKiBNSVQgTGljZW5zZVxuICpcbiAqIENvcHlyaWdodCAoYykgMjAyNSAgWXVyaWkgWWFrdWJpbiAoeXVyaWkueWFrdWJpbkBnbWFpbC5jb20pXG4gKlxuICogUGVybWlzc2lvbiBpcyBncmFudGVkIHRvIHVzZSwgY29weSwgbW9kaWZ5LCBhbmQgZGlzdHJpYnV0ZSB0aGlzIHNvZnR3YXJlXG4gKiB1bmRlciB0aGUgTUlUIExpY2Vuc2UuIFNlZSBMSUNFTlNFIGZpbGUgZm9yIGRldGFpbHMuXG4gKi9cblxuZXhwb3J0IGludGVyZmFjZSBJTG9nZ2VyIHtcbiAgdHJhY2UobWVzc2FnZT86IGFueSwgLi4ucGFyYW1zOiBhbnlbXSk6IHZvaWQ7XG4gIGRlYnVnKG1lc3NhZ2U/OiBhbnksIC4uLnBhcmFtczogYW55W10pOiB2b2lkO1xuICBpbmZvKG1lc3NhZ2U/OiBhbnksIC4uLnBhcmFtczogYW55W10pOiB2b2lkO1xuICB3YXJuKG1lc3NhZ2U/OiBhbnksIC4uLnBhcmFtczogYW55W10pOiB2b2lkO1xuICBlcnJvcihtZXNzYWdlPzogYW55LCAuLi5wYXJhbXM6IGFueVtdKTogdm9pZDtcbn07XG5cbmV4cG9ydCBmdW5jdGlvbiBjcmVhdGVMb2dnZXIodXJsOiBzdHJpbmcpOiBJTG9nZ2VyIHtcbiAgcmV0dXJuIHtcbiAgICB0cmFjZTogY29uc29sZS50cmFjZS5iaW5kKGNvbnNvbGUpLFxuICAgIGRlYnVnOiBjb25zb2xlLmRlYnVnLmJpbmQoY29uc29sZSksXG4gICAgaW5mbzogY29uc29sZS5pbmZvLmJpbmQoY29uc29sZSksXG4gICAgd2FybjogY29uc29sZS53YXJuLmJpbmQoY29uc29sZSksXG4gICAgZXJyb3I6IGNvbnNvbGUuZXJyb3IuYmluZChjb25zb2xlKSxcbiAgfTtcbn1cbiIsIi8qXG4gKiBNSVQgTGljZW5zZVxuICpcbiAqIENvcHlyaWdodCAoYykgMjAyNSAgWXVyaWkgWWFrdWJpbiAoeXVyaWkueWFrdWJpbkBnbWFpbC5jb20pXG4gKlxuICogUGVybWlzc2lvbiBpcyBncmFudGVkIHRvIHVzZSwgY29weSwgbW9kaWZ5LCBhbmQgZGlzdHJpYnV0ZSB0aGlzIHNvZnR3YXJlXG4gKiB1bmRlciB0aGUgTUlUIExpY2Vuc2UuIFNlZSBMSUNFTlNFIGZpbGUgZm9yIGRldGFpbHMuXG4gKi9cblxuaW1wb3J0IHBhdGggZnJvbSBcIm5vZGU6cGF0aFwiO1xuaW1wb3J0IGZzIGZyb20gXCJub2RlOmZzXCI7XG5pbXBvcnQgeyBzcGF3biB9IGZyb20gXCJub2RlOmNoaWxkX3Byb2Nlc3NcIjtcblxudHlwZSBSZXN1bHQgPSB7XG4gIHN0YXR1czogbnVtYmVyO1xufTtcblxuZXhwb3J0IGZ1bmN0aW9uIHNwYXduQXN5bmMoY29tbWFuZDogc3RyaW5nLCBhcmdzOiBzdHJpbmdbXSwgb3B0aW9ucz86IGFueSk6IFByb21pc2U8UmVzdWx0PiB7XG4gIGxldCBmZCA9IG51bGw7XG4gIGxldCB2ZXJib3NlID0gZmFsc2U7XG4gIGlmIChvcHRpb25zICYmIG9wdGlvbnMuZXh0cmEpIHtcbiAgICBpZiAob3B0aW9ucy5leHRyYS52ZXJib3NlKVxuICAgICAgdmVyYm9zZSA9IHRydWU7XG4gICAgaWYgKG9wdGlvbnMuZXh0cmEub3V0cHV0KSB7XG4gICAgICBsZXQgbG9nZmlsZSA9IG9wdGlvbnMuZXh0cmEub3V0cHV0O1xuICAgICAgaWYgKCFwYXRoLmlzQWJzb2x1dGUobG9nZmlsZSkgJiYgb3B0aW9ucy5jd2QpIHtcbiAgICAgICAgbG9nZmlsZSA9IHBhdGgucmVzb2x2ZShvcHRpb25zLmN3ZCwgbG9nZmlsZSk7XG4gICAgICB9XG4gICAgICBmZCA9IGZzLm9wZW5TeW5jKGxvZ2ZpbGUsIFwidytcIiwgMG82NjYpO1xuICAgIH1cbiAgfVxuICByZXR1cm4gbmV3IFByb21pc2UoKHJlc29sdmUsIHJlamVjdCkgPT4ge1xuICAgIGlmIChmZCB8fCB2ZXJib3NlKSB7XG4gICAgICB2ZXJib3NlICYmIGNvbnNvbGUuaW5mbyhbIHBhdGguYmFzZW5hbWUoY29tbWFuZCksIC4uLmFyZ3MgXS5qb2luKFwiIFwiKSk7XG4gICAgICBmZCAmJiBmcy53cml0ZVN5bmMoZmQsIEpTT04uc3RyaW5naWZ5KHtjb21tYW5kLCBhcmdzLCBvcHRpb25zIH0sIG51bGwsIDIpICsgXCJcXG5cIik7XG4gICAgfVxuICAgIGNvbnN0IGV4ZWMgPSBzcGF3bihjb21tYW5kLCBhcmdzLCBvcHRpb25zKTtcbiAgICBleGVjLnN0ZG91dC5vbihcImRhdGFcIiwgKGRhdGEpID0+IHtcbiAgICAgIHByb2Nlc3Muc3Rkb3V0LndyaXRlKGRhdGEpO1xuICAgICAgZmQgJiYgZnMud3JpdGVTeW5jKGZkLCBkYXRhKTtcbiAgICB9KTtcbiAgICBleGVjLnN0ZGVyci5vbihcImRhdGFcIiwgKGRhdGEpID0+IHtcbiAgICAgIHByb2Nlc3Muc3RkZXJyLndyaXRlKGRhdGEpO1xuICAgICAgZmQgJiYgZnMud3JpdGVTeW5jKGZkLCBkYXRhKTtcbiAgICB9KTtcbiAgICBleGVjLm9uKFwiY2xvc2VcIiwgKHN0YXR1czogbnVtYmVyKSA9PiB7XG4gICAgICBmZCAmJiBmcy5jbG9zZVN5bmMoZmQpO1xuICAgICAgcmVzb2x2ZSh7c3RhdHVzfSk7XG4gICAgfSk7XG4gIH0pO1xufVxuIiwiLypcbiAqIE1JVCBMaWNlbnNlXG4gKlxuICogQ29weXJpZ2h0IChjKSAyMDI1ICBZdXJpaSBZYWt1YmluICh5dXJpaS55YWt1YmluQGdtYWlsLmNvbSlcbiAqXG4gKiBQZXJtaXNzaW9uIGlzIGdyYW50ZWQgdG8gdXNlLCBjb3B5LCBtb2RpZnksIGFuZCBkaXN0cmlidXRlIHRoaXMgc29mdHdhcmVcbiAqIHVuZGVyIHRoZSBNSVQgTGljZW5zZS4gU2VlIExJQ0VOU0UgZmlsZSBmb3IgZGV0YWlscy5cbiAqL1xuXG5pbXBvcnQgZnMgZnJvbSBcIm5vZGU6ZnNcIjtcbmltcG9ydCBwYXRoIGZyb20gXCJub2RlOnBhdGhcIjtcbmltcG9ydCB1cmwgZnJvbSBcIm5vZGU6dXJsXCI7XG5cbmV4cG9ydCBhc3luYyBmdW5jdGlvbiBwYXRoRXhpc3RzKHBhdGg6IHN0cmluZykge1xuICB0cnkge1xuICAgIHJldHVybiAhIShhd2FpdCBmcy5wcm9taXNlcy5zdGF0KHBhdGgpKTtcbiAgfSBjYXRjaCB7XG4gICAgcmV0dXJuIGZhbHNlO1xuICB9XG59XG5cbmV4cG9ydCBmdW5jdGlvbiBwYXRoRXhpc3RzU3luYyhwYXRoOiBzdHJpbmcpIHtcbiAgdHJ5IHtcbiAgICByZXR1cm4gISFmcy5zdGF0U3luYyhwYXRoKTtcbiAgfSBjYXRjaCB7XG4gICAgcmV0dXJuIGZhbHNlO1xuICB9XG59XG5cbmV4cG9ydCBhc3luYyBmdW5jdGlvbiBmaWxlRXhpc3RzKHBhdGg6IHN0cmluZykge1xuICB0cnkge1xuICAgIHJldHVybiAoYXdhaXQgZnMucHJvbWlzZXMuc3RhdChwYXRoKSkuaXNGaWxlKCk7XG4gIH0gY2F0Y2gge1xuICAgIHJldHVybiBmYWxzZTtcbiAgfVxufVxuXG5leHBvcnQgZnVuY3Rpb24gZmlsZUV4aXN0c1N5bmMocGF0aDogc3RyaW5nKSB7XG4gIHRyeSB7XG4gICAgcmV0dXJuIGZzLnN0YXRTeW5jKHBhdGgpLmlzRmlsZSgpO1xuICB9IGNhdGNoIHtcbiAgICByZXR1cm4gZmFsc2U7XG4gIH0gXG59XG5cbmV4cG9ydCBhc3luYyBmdW5jdGlvbiBkaXJlY3RvcnlFeGlzdHMocGF0aDogc3RyaW5nKSB7XG4gIHRyeSB7XG4gICAgcmV0dXJuIChhd2FpdCBmcy5wcm9taXNlcy5zdGF0KHBhdGgpKS5pc0RpcmVjdG9yeSgpO1xuICB9IGNhdGNoIHtcbiAgICByZXR1cm4gZmFsc2U7XG4gIH1cbn1cblxuZXhwb3J0IGZ1bmN0aW9uIGRpcmVjdG9yeUV4aXN0c1N5bmMocGF0aDogc3RyaW5nKSB7XG4gIHRyeSB7XG4gICByZXR1cm4gZnMuc3RhdFN5bmMocGF0aCkuaXNEaXJlY3RvcnkoKTtcbiAgfSBjYXRjaCB7XG4gICAgcmV0dXJuIGZhbHNlO1xuICB9XG59XG5cbmV4cG9ydCBmdW5jdGlvbiBleHRuYW1lKGZ1bGxwYXRoOiBzdHJpbmcsIG9wdGlvbnM6IGFueSkge1xuICBpZiAob3B0aW9ucz8ubG9uZ2VzdCkge1xuICAgIGNvbnN0IGZpbGVuYW1lID0gcGF0aC5iYXNlbmFtZShmdWxscGF0aCk7XG4gICAgY29uc3QgaW5kZXggPSBmaWxlbmFtZS5pbmRleE9mKCcuJyk7XG4gICAgcmV0dXJuIGluZGV4ICE9IC0xID8gZmlsZW5hbWUuc3Vic3RyaW5nKGluZGV4KSA6ICcnO1xuICB9XG5cbiAgcmV0dXJuIHBhdGguZXh0bmFtZShmdWxscGF0aCk7XG59XG5cbmV4cG9ydCBhc3luYyBmdW5jdGlvbiBmaWxlTGlzdChkaXJuYW1lOiBzdHJpbmcsIG9wdGlvbnM6IGFueSk6IFByb21pc2U8QXJyYXk8c3RyaW5nPj4ge1xuICBjb25zdCBsaXN0ID0gbmV3IEFycmF5PHN0cmluZz47XG4gIGlmIChhd2FpdCBkaXJlY3RvcnlFeGlzdHMoZGlybmFtZSkpIHtcbiAgICBmb3IgKGNvbnN0IGl0ZXIgb2YgYXdhaXQgZnMucHJvbWlzZXMucmVhZGRpcihkaXJuYW1lKSkge1xuICAgICAgY29uc3QgZmlsZXBhdGggPSBwYXRoLnJlc29sdmUoZGlybmFtZSwgaXRlcik7XG4gICAgICBjb25zdCBzdGF0ID0gYXdhaXQgZnMucHJvbWlzZXMuc3RhdChmaWxlcGF0aCk7XG4gICAgICBpZiAoc3RhdC5pc0ZpbGUoKSkge1xuICAgICAgICBsaXN0LnB1c2gob3B0aW9ucy5yZWxhdGl2ZSA/IHBhdGgucmVsYXRpdmUob3B0aW9ucy5yZWxhdGl2ZSwgZmlsZXBhdGgpIDogZmlsZXBhdGgpO1xuICAgICAgfVxuICAgICAgZWxzZSBpZiAob3B0aW9ucy5yZWN1cnNpdmUgJiYgc3RhdC5pc0RpcmVjdG9yeSgpKSB7XG4gICAgICAgIGZvciAoY29uc3QgZm5hbWUgb2YgYXdhaXQgZmlsZUxpc3QoZmlsZXBhdGgsIG9wdGlvbnMpKVxuICAgICAgICAgIGxpc3QucHVzaChmbmFtZSk7XG4gICAgICB9XG4gICAgfVxuICB9XG4gIHJldHVybiBsaXN0O1xufVxuXG5leHBvcnQgYXN5bmMgZnVuY3Rpb24gc2F2ZUlmRGlmZmVyZW50KGZpbGVuYW1lOiBzdHJpbmcsIGNvbnRlbnQ6IHN0cmluZykge1xuICBpZiAoYXdhaXQgZmlsZUV4aXN0cyhmaWxlbmFtZSkpIHtcbiAgICBjb25zdCBvbGRDb250ZW50ID0gYXdhaXQgZnMucHJvbWlzZXMucmVhZEZpbGUoZmlsZW5hbWUsIHsgZW5jb2Rpbmc6IFwidXRmOFwiIH0pO1xuICAgIGlmIChjb250ZW50ID09IG9sZENvbnRlbnQpXG4gICAgICByZXR1cm4gZmFsc2U7XG4gIH1cblxuICBhd2FpdCBmcy5wcm9taXNlcy5ta2RpcihwYXRoLmRpcm5hbWUoZmlsZW5hbWUpLCB7IHJlY3Vyc2l2ZTogdHJ1ZSB9KTtcbiAgYXdhaXQgZnMucHJvbWlzZXMud3JpdGVGaWxlKGZpbGVuYW1lLCBjb250ZW50LCB7IGVuY29kaW5nOiBcInV0ZjhcIiB9KTtcblxuICByZXR1cm4gdHJ1ZTtcbn1cblxuZXhwb3J0IGZ1bmN0aW9uIGdldFBhdGhTdHJpbmcoc3RyOiBzdHJpbmcpIHtcbiAgcmV0dXJuIHN0ci5zdGFydHNXaXRoKFwiZmlsZTovL1wiKSA/IHVybC5maWxlVVJMVG9QYXRoKHN0cikgOiBzdHI7XG59XG4iLCIvKlxuICogTUlUIExpY2Vuc2VcbiAqXG4gKiBDb3B5cmlnaHQgKGMpIDIwMjUgIFl1cmlpIFlha3ViaW4gKHl1cmlpLnlha3ViaW5AZ21haWwuY29tKVxuICpcbiAqIFBlcm1pc3Npb24gaXMgZ3JhbnRlZCB0byB1c2UsIGNvcHksIG1vZGlmeSwgYW5kIGRpc3RyaWJ1dGUgdGhpcyBzb2Z0d2FyZVxuICogdW5kZXIgdGhlIE1JVCBMaWNlbnNlLiBTZWUgTElDRU5TRSBmaWxlIGZvciBkZXRhaWxzLlxuICovXG5cbmltcG9ydCBwYXRoIGZyb20gXCJub2RlOnBhdGhcIjtcbmltcG9ydCBmcyBmcm9tIFwibm9kZTpmc1wiO1xuaW1wb3J0IGh0dHAgZnJvbSBcImh0dHBcIjtcbmltcG9ydCBodHRwcyBmcm9tIFwiaHR0cHNcIjtcblxuaW1wb3J0IHsgY3JlYXRlTG9nZ2VyIH0gZnJvbSBcIkAvbG9nZ2VyXCI7XG5cbmNvbnN0IGxvZ2dlciA9IGNyZWF0ZUxvZ2dlcihpbXBvcnQubWV0YS51cmwpO1xuXG5jb25zdCBodHRwT3B0aW9ucyA9IHtcbiAgbWV0aG9kOiAnR0VUJyxcbiAgdGltZW91dDogNTAwMCxcbiAgaGVhZGVyczoge1xuICAgIFwiVXNlci1BZ2VudFwiOiBQUk9KRUNUX05BTUUgKyBcIi9cIiArIFBST0pFQ1RfVkVSU0lPTixcbiAgICBcIkFjY2VwdFwiOiBcIiovKlwiLFxuICB9LFxufTtcblxuZnVuY3Rpb24gaHR0cFJlcXVlc3QodXJsOiBzdHJpbmcsIG9wdGlvbnM6IGh0dHAuUmVxdWVzdE9wdGlvbnMgfCBodHRwcy5SZXF1ZXN0T3B0aW9ucywgY2FsbGJhY2s6IGFueSkge1xuICBpZiAodXJsLnN0YXJ0c1dpdGgoXCJodHRwczovL1wiKSlcbiAgICByZXR1cm4gaHR0cHMucmVxdWVzdCh1cmwsIG9wdGlvbnMsIGNhbGxiYWNrKTtcbiAgcmV0dXJuIGh0dHAucmVxdWVzdCh1cmwsIG9wdGlvbnMsIGNhbGxiYWNrKTtcbn07XG5cbmV4cG9ydCBmdW5jdGlvbiByZXF1ZXN0R2V0KHVybDogc3RyaW5nKTogUHJvbWlzZTxCdWZmZXI+IHtcbiAgcmV0dXJuIG5ldyBQcm9taXNlKChyZXNvbHZlLCByZWplY3QpID0+IHtcblxuICAgIGNvbnN0IG9uRXJyb3IgPSAoZXJyOiBhbnkpID0+IHtcbiAgICAgIGNvbnN0IG1lc3NhZ2UgPSBcIkVuY291bnRlcmVkIGFuIGVycm9yIHRyeWluZyB0byBtYWtlIGEgcmVxdWVzdDogXCIgKyBlcnIubWVzc2FnZTtcbiAgICAgIGxvZ2dlci5lcnJvcihtZXNzYWdlLCBlcnIpO1xuICAgICAgcmVqZWN0KG1lc3NhZ2UpO1xuICAgIH07XG5cbiAgICBjb25zdCBvblRpbWVvdXQgPSAocmVxdWVzdDogYW55KSA9PiB7XG4gICAgICByZXF1ZXN0LmRlc3Ryb3koKTtcbiAgICAgIGxvZ2dlci5lcnJvcihcIiAgVGltZW91dFwiLCB1cmwpO1xuICAgICAgcmVqZWN0KFwiVGltZW91dFwiKTtcbiAgICB9XG5cbiAgICBjb25zdCBvblJlcXVlc3QgPSAocmVzcG9uc2U6IGFueSkgPT4ge1xuICAgICAgc3dpdGNoIChyZXNwb25zZS5zdGF0dXNDb2RlKSB7XG4gICAgICBjYXNlIDIwMDpcbiAgICAgICAgY29uc3QgY2h1bmtzOiBBcnJheTxCdWZmZXI+ID0gW107XG4gICAgICAgIHJlc3BvbnNlLm9uKFwiZGF0YVwiLCAoY2h1bms6IEJ1ZmZlcikgPT4gY2h1bmtzLnB1c2goY2h1bmspKTtcbiAgICAgICAgcmVzcG9uc2Uub24oXCJlbmRcIiwgKCkgPT4gcmVzb2x2ZShCdWZmZXIuY29uY2F0KGNodW5rcykpKTtcbiAgICAgICAgcmVzcG9uc2Uub24oJ2Nsb3NlJywgKCkgPT4gbG9nZ2VyLmluZm8oJyAgQ2xvc2UnKSk7XG4gICAgICAgIGJyZWFrO1xuXG4gICAgICBjYXNlIDMwMTpcbiAgICAgIGNhc2UgMzAyOlxuICAgICAgICByZXNwb25zZS5yZXN1bWUoKTtcbiAgICAgICAgbG9nZ2VyLmluZm8oYFJlZGlyZWN0IHRvICR7cmVzcG9uc2UuaGVhZGVycy5sb2NhdGlvbn1gKTtcbiAgICAgICAgY29uc3QgcmVxdWVzdCA9IGh0dHBSZXF1ZXN0KHJlc3BvbnNlLmhlYWRlcnMubG9jYXRpb24sIGh0dHBPcHRpb25zLCBvblJlcXVlc3QpO1xuICAgICAgICByZXF1ZXN0Lm9uKCd0aW1lb3V0Jywgb25UaW1lb3V0LmJpbmQobnVsbCwgcmVxdWVzdCkpO1xuICAgICAgICByZXF1ZXN0Lm9uKCdlcnJvcicsIG9uRXJyb3IpO1xuICAgICAgICByZXF1ZXN0LmVuZCgpO1xuICAgICAgICBicmVhaztcblxuICAgICAgZGVmYXVsdDpcbiAgICAgICAgcmVzcG9uc2UucmVzdW1lKCk7XG4gICAgICAgIGNvbnN0IG1lc3NhZ2UgPSBcIkRpZCBub3QgZ2V0IGFuIE9LIGZyb20gdGhlIHNlcnZlci4gQ29kZTogXCIgKyByZXNwb25zZS5zdGF0dXNDb2RlO1xuICAgICAgICBsb2dnZXIuZXJyb3IobWVzc2FnZSk7XG4gICAgICAgIHJlamVjdChtZXNzYWdlKTtcbiAgICAgICAgYnJlYWs7XG4gICAgICB9XG4gICAgfTtcblxuICAgIGxvZ2dlci5pbmZvKGB3Z2V0ICR7dXJsfWApO1xuICAgIGNvbnN0IHJlcXVlc3QgPSBodHRwUmVxdWVzdCh1cmwsIGh0dHBPcHRpb25zLCBvblJlcXVlc3QpO1xuICAgIHJlcXVlc3Qub24oJ3RpbWVvdXQnLCBvblRpbWVvdXQuYmluZChudWxsLCByZXF1ZXN0KSk7XG4gICAgcmVxdWVzdC5vbignZXJyb3InLCBvbkVycm9yKTtcbiAgICByZXF1ZXN0LmVuZCgpO1xuICB9KTtcbn07XG5cbmV4cG9ydCBmdW5jdGlvbiBkb3dubG9hZEZpbGUodXJsOiBzdHJpbmcsIGZpbGU6IHN0cmluZykge1xuICByZXR1cm4gbmV3IFByb21pc2UoKHJlc29sdmUsIHJlamVjdCkgPT4ge1xuICAgIGNvbnN0IGZpbGVuYW1lID0gcGF0aC5iYXNlbmFtZSh1cmwpO1xuXG4gICAgY29uc3QgY2xpZW50ID0gKCgpID0+IHtcbiAgICAgIGlmIChmaWxlKSB7XG4gICAgICAgIGNvbnN0IGZkID0gZnMub3BlblN5bmMoZmlsZSwgXCJ3XCIpO1xuICAgICAgICByZXR1cm4ge1xuICAgICAgICAgIG9uRGF0YTogKGNodW5rOiBCdWZmZXIpID0+IHtcbiAgICAgICAgICAgIGZzLndyaXRlU3luYyhmZCwgY2h1bmspO1xuICAgICAgICAgIH0sXG4gICAgICAgICAgb25FbmQ6ICgpID0+IHtcbiAgICAgICAgICAgIGZzLmNsb3NlU3luYyhmZCk7XG4gICAgICAgICAgICByZXNvbHZlKHVuZGVmaW5lZCk7XG4gICAgICAgICAgfSxcbiAgICAgICAgfTtcbiAgICAgIH1cbiAgICAgIGVsc2Uge1xuICAgICAgICBjb25zdCBjaHVua3M6IEFycmF5PEJ1ZmZlcj4gPSBbXTtcbiAgICAgICAgcmV0dXJuIHtcbiAgICAgICAgICBvbkRhdGE6IChjaHVuazogQnVmZmVyKSA9PiB7XG4gICAgICAgICAgICBjaHVua3MucHVzaChjaHVuayk7XG4gICAgICAgICAgfSxcbiAgICAgICAgICBvbkVuZDogKCkgPT4ge1xuICAgICAgICAgICAgcmVzb2x2ZShCdWZmZXIuY29uY2F0KGNodW5rcykpO1xuICAgICAgICAgIH0sXG4gICAgICAgIH07XG4gICAgICB9XG4gICAgfSkoKTtcbiAgXG4gICAgY29uc3Qgc3RhcnRSZXF1ZXN0ID0gKHVybDogc3RyaW5nLCBjYWxsYmFjazogYW55KSA9PiB7XG4gICAgICBjb25zdCByZXF1ZXN0ID0gaHR0cHMucmVxdWVzdCh1cmwsIGh0dHBPcHRpb25zLCBjYWxsYmFjayk7XG4gICAgICBpZiAocmVxdWVzdCkge1xuICAgICAgICByZXF1ZXN0Lm9uKCdlcnJvcicsIChlcnJvcikgPT4gcmVqZWN0KGVycm9yKSk7XG4gICAgICAgIHJlcXVlc3QuZW5kKCk7IFxuICAgICAgfVxuICAgICAgZWxzZSB7XG4gICAgICAgIHJlamVjdChgVXJsIHNjaGVtZSBub3Qgc3VwcG9ydGVkIGZvciAke3VybH1gKTtcbiAgICAgIH1cbiAgICB9O1xuXG4gICAgY29uc3Qgb25SZXF1ZXN0ID0gKHJlc3BvbnNlOiBhbnkpID0+IHtcbiAgICAgIHN3aXRjaCAocmVzcG9uc2Uuc3RhdHVzQ29kZSkge1xuICAgICAgY2FzZSAyMDA6XG4gICAgICAgIGxvZ2dlci5pbmZvKGBDb25uY3RlZCB0byAke3Jlc3BvbnNlLnJlcS5ob3N0fWApO1xuICAgICAgICBsb2dnZXIuaW5mbyhgRG93bmxvYWRpbmcgJHtmaWxlbmFtZX1gKTtcbiAgICAgICAgcmVzcG9uc2Uub24oJ2RhdGEnLCBjbGllbnQub25EYXRhKTtcbiAgICAgICAgcmVzcG9uc2Uub24oJ2VuZCcsIGNsaWVudC5vbkVuZCk7XG4gICAgICAgIHJlc3BvbnNlLm9uKCdjbG9zZScsICgpID0+IGxvZ2dlci5pbmZvKGBEb25lYCkpO1xuICAgICAgICBicmVhaztcblxuICAgICAgY2FzZSAzMDE6XG4gICAgICBjYXNlIDMwMjpcbiAgICAgICAgcmVzcG9uc2UucmVzdW1lKCk7XG4gICAgICAgIGxvZ2dlci5pbmZvKGBSZXNvbHZpbmcgJHtyZXNwb25zZS5oZWFkZXJzLmxvY2F0aW9ufWApO1xuICAgICAgICBzdGFydFJlcXVlc3QocmVzcG9uc2UuaGVhZGVycy5sb2NhdGlvbiwgb25SZXF1ZXN0KTtcbiAgICAgICAgYnJlYWs7XG5cbiAgICAgIGRlZmF1bHQ6XG4gICAgICAgIHJlc3BvbnNlLnJlc3VtZSgpO1xuICAgICAgICByZWplY3QoYERpZCBub3QgZ2V0IGFuIE9LIGZyb20gdGhlIHNlcnZlci4gQ29kZTogJHtyZXNwb25zZS5zdGF0dXNDb2RlfWApO1xuICAgICAgICBicmVhaztcbiAgICAgIH1cbiAgICB9O1xuXG4gICAgbG9nZ2VyLmluZm8oYFJlcXVlc3QgdG8gJHt1cmx9YCk7XG4gICAgc3RhcnRSZXF1ZXN0KHVybCwgb25SZXF1ZXN0KTtcbiAgfSk7XG59XG4iLCIvKlxuICogTUlUIExpY2Vuc2VcbiAqXG4gKiBDb3B5cmlnaHQgKGMpIDIwMjUgIFl1cmlpIFlha3ViaW4gKHl1cmlpLnlha3ViaW5AZ21haWwuY29tKVxuICpcbiAqIFBlcm1pc3Npb24gaXMgZ3JhbnRlZCB0byB1c2UsIGNvcHksIG1vZGlmeSwgYW5kIGRpc3RyaWJ1dGUgdGhpcyBzb2Z0d2FyZVxuICogdW5kZXIgdGhlIE1JVCBMaWNlbnNlLiBTZWUgTElDRU5TRSBmaWxlIGZvciBkZXRhaWxzLlxuICovXG5cbmV4cG9ydCBjb25zdCBpbXBvcnRNb2R1bGUgPSBhc3luYyAobmFtZSkgPT4gaW1wb3J0KC8qIHdlYnBhY2tJZ25vcmU6IHRydWUgKi8gbmFtZSk7XG4iLCJpbXBvcnQgZnMgZnJvbSBcIm5vZGU6ZnNcIjtcbmltcG9ydCBwYXRoIGZyb20gXCJub2RlOnBhdGhcIjtcblxuaW1wb3J0IHsgZmlsZUxpc3QgfSBmcm9tIFwiQC91dGlscy9GaWxlU3lzdGVtXCI7XG5pbXBvcnQgeyBjcmVhdGVMb2dnZXIgfSBmcm9tIFwiQC9sb2dnZXJcIjtcblxuY29uc3QgbG9nZ2VyID0gY3JlYXRlTG9nZ2VyKGltcG9ydC5tZXRhLnVybCk7XG5cbmV4cG9ydCBhc3luYyBmdW5jdGlvbiBtYWtlUGF0Y2goc3JjRGlyOiBzdHJpbmcsIGRlc3REaXI6IHN0cmluZykge1xuICBsb2dnZXIuaW5mbyhgTWFrZSBwYXRjaCAke3NyY0Rpcn0gdG8gJHtkZXN0RGlyfWApO1xuICBjb25zdCBsaXN0ID0gYXdhaXQgZmlsZUxpc3Qoc3JjRGlyLCB7IHJlbGF0aXZlOiBzcmNEaXIsIHJlY3Vyc2l2ZTogdHJ1ZSB9KTtcbiAgZm9yIChjb25zdCBpdGVyIG9mIGxpc3QpIHtcbiAgICBjb25zdCBzb3VyY2UgPSBwYXRoLnJlc29sdmUoc3JjRGlyLCBpdGVyKTtcbiAgICBjb25zdCBkZXN0aW5hdGlvbiA9IHBhdGgucmVzb2x2ZShkZXN0RGlyLCBpdGVyKTtcbiAgICBhd2FpdCBmcy5wcm9taXNlcy5jcChzb3VyY2UsIGRlc3RpbmF0aW9uLCB7IGZvcmNlOiB0cnVlIH0pO1xuICAgIGxvZ2dlci5pbmZvKGAgUmVwbGFjZWQgJHtpdGVyfWApO1xuICB9XG59XG4iLCIvKlxuICogTUlUIExpY2Vuc2VcbiAqXG4gKiBDb3B5cmlnaHQgKGMpIDIwMjUgIFl1cmlpIFlha3ViaW4gKHl1cmlpLnlha3ViaW5AZ21haWwuY29tKVxuICpcbiAqIFBlcm1pc3Npb24gaXMgZ3JhbnRlZCB0byB1c2UsIGNvcHksIG1vZGlmeSwgYW5kIGRpc3RyaWJ1dGUgdGhpcyBzb2Z0d2FyZVxuICogdW5kZXIgdGhlIE1JVCBMaWNlbnNlLiBTZWUgTElDRU5TRSBmaWxlIGZvciBkZXRhaWxzLlxuICovXG5cbmNvbnN0IHJlcXVpcmVJbXBsID0gZXZhbChcInJlcXVpcmVcIik7XG5cbmV4cG9ydCBmdW5jdGlvbiByZXF1aXJlUmVzb2x2ZShuYW1lOiBzdHJpbmcpIHtcbiAgaWYgKHR5cGVvZiBpbXBvcnQubWV0YS5yZXNvbHZlID09PSAnZnVuY3Rpb24nKVxuICAgIHJldHVybiBpbXBvcnQubWV0YS5yZXNvbHZlKG5hbWUpO1xuICBpZiAodHlwZW9mIHJlcXVpcmVJbXBsICE9PSAndW5kZWZpbmVkJylcbiAgICByZXR1cm4gcmVxdWlyZUltcGwucmVzb2x2ZShuYW1lKTtcbiAgdGhyb3cgbmV3IEVycm9yKFwiTm8gY29tcGF0aWJsZSBtb2R1bGUgcmVzb2x2ZXIgZm91bmRcIik7XG59XG5cbmV4cG9ydCB7IGltcG9ydE1vZHVsZSB9IGZyb20gXCIuL0ltcG9ydE1vZHVsZS5tanNcIjtcbiIsIi8qXG4gKiBNSVQgTGljZW5zZVxuICpcbiAqIENvcHlyaWdodCAoYykgMjAyNSAgWXVyaWkgWWFrdWJpbiAoeXVyaWkueWFrdWJpbkBnbWFpbC5jb20pXG4gKlxuICogUGVybWlzc2lvbiBpcyBncmFudGVkIHRvIHVzZSwgY29weSwgbW9kaWZ5LCBhbmQgZGlzdHJpYnV0ZSB0aGlzIHNvZnR3YXJlXG4gKiB1bmRlciB0aGUgTUlUIExpY2Vuc2UuIFNlZSBMSUNFTlNFIGZpbGUgZm9yIGRldGFpbHMuXG4gKi9cblxuZXhwb3J0IGZ1bmN0aW9uIGVxdWFsVmFsdWUoYTogYW55LCBiOiBhbnkpOiBib29sZWFuIHtcbiAgaWYgKGEgPT09IGIpXG4gICAgcmV0dXJuIHRydWU7XG5cbiAgaWYgKGEgPT09IHVuZGVmaW5lZCB8fCBiID09PSB1bmRlZmluZWQpXG4gICAgcmV0dXJuIGZhbHNlO1xuXG4gIGlmICh0eXBlb2YgYSAhPT0gXCJvYmplY3RcIiB8fCB0eXBlb2YgYiAhPT0gXCJvYmplY3RcIilcbiAgICByZXR1cm4gZmFsc2U7XG5cbiAgY29uc3QgazEgPSBPYmplY3Qua2V5cyhhKTtcbiAgY29uc3QgazIgPSBPYmplY3Qua2V5cyhiKTtcblxuICBpZiAoazEubGVuZ3RoICE9IGsyLmxlbmd0aClcbiAgICByZXR1cm4gZmFsc2U7XG5cbiAgZm9yIChjb25zdCBrZXkgb2YgazEpIHtcbiAgICBpZiAoIU9iamVjdC5oYXNPd24oYiwga2V5KSB8fCAhZXF1YWxWYWx1ZShhW2tleV0sIGJba2V5XSkpXG4gICAgICByZXR1cm4gZmFsc2U7XG4gIH1cblxuICByZXR1cm4gdHJ1ZTtcbn1cblxuZXhwb3J0IGZ1bmN0aW9uIGNvcHlWYWx1ZShvOiBhbnkpOiBhbnkge1xuICBpZiAoIW8gfHwgdHlwZW9mIG8gIT09IFwib2JqZWN0XCIpXG4gICAgcmV0dXJuIG87XG4gIGlmIChBcnJheS5pc0FycmF5KG8pKSB7XG4gICAgY29uc3QgcmVzdWx0ID0gW107XG4gICAgZm9yIChjb25zdCBpdGVyIG9mIG8pXG4gICAgICByZXN1bHQucHVzaChjb3B5VmFsdWUoaXRlcikpO1xuICAgIHJldHVybiByZXN1bHQ7XG4gIH1cbiAgZWxzZSB7XG4gICAgY29uc3QgcmVzdWx0ID0ge30gYXMgYW55O1xuICAgIGZvciAoY29uc3QgW2tleSx2YWxdIG9mIE9iamVjdC5lbnRyaWVzKG8pKVxuICAgICAgcmVzdWx0W2tleV0gPSBjb3B5VmFsdWUodmFsKTtcbiAgICByZXR1cm4gcmVzdWx0O1xuICB9XG59XG5cbmV4cG9ydCBmdW5jdGlvbiBhc3NpZ25PYmplY3QodGFyZ2V0OiBhbnksIHNvdXJjZTogYW55KSB7XG4gIGlmIChBcnJheS5pc0FycmF5KHRhcmdldCkgJiYgQXJyYXkuaXNBcnJheShzb3VyY2UpKSB7XG4gICAgZm9yIChjb25zdCBpdGVyIG9mIHNvdXJjZSlcbiAgICAgIHRhcmdldC5wdXNoKGl0ZXIpO1xuICB9XG4gIGVsc2Uge1xuICAgIGZvciAoY29uc3Qga2V5IG9mIE9iamVjdC5rZXlzKHNvdXJjZSkpIHtcbiAgICAgIGNvbnN0IGEgPSB0YXJnZXRba2V5XSwgYiA9IHNvdXJjZVtrZXldO1xuICAgICAgaWYgKGEgJiYgdHlwZW9mIGEgPT09IFwib2JqZWN0XCIgJiYgYiAmJiB0eXBlb2YgYiA9PT0gXCJvYmplY3RcIilcbiAgICAgICAgYXNzaWduT2JqZWN0KGEsIGIpO1xuICAgICAgZWxzZVxuICAgICAgICB0YXJnZXRba2V5XSA9IGNvcHlWYWx1ZShiKTtcbiAgICB9XG4gIH1cbn1cblxuZXhwb3J0IGZ1bmN0aW9uIGFycmF5V3JhcHBlcih2YWx1ZTogYW55KSB7XG4gIGlmICh2YWx1ZSA9PT0gdW5kZWZpbmVkIHx8IEFycmF5LmlzQXJyYXkodmFsdWUpKVxuICAgIHJldHVybiB2YWx1ZTtcbiAgcmV0dXJuIFsgdmFsdWUgXTtcbn1cbiIsIi8qXG4gKiBNSVQgTGljZW5zZVxuICpcbiAqIENvcHlyaWdodCAoYykgMjAyNSAgWXVyaWkgWWFrdWJpbiAoeXVyaWkueWFrdWJpbkBnbWFpbC5jb20pXG4gKlxuICogUGVybWlzc2lvbiBpcyBncmFudGVkIHRvIHVzZSwgY29weSwgbW9kaWZ5LCBhbmQgZGlzdHJpYnV0ZSB0aGlzIHNvZnR3YXJlXG4gKiB1bmRlciB0aGUgTUlUIExpY2Vuc2UuIFNlZSBMSUNFTlNFIGZpbGUgZm9yIGRldGFpbHMuXG4gKi9cblxuaW1wb3J0IGZzIGZyb20gXCJub2RlOmZzXCI7XG5cbmV4cG9ydCBjbGFzcyBTZXR0aW5nc1N0b3JhZ2Uge1xuICBwcml2YXRlIF9maWxlbmFtZTogc3RyaW5nO1xuICBwcml2YXRlIF9zZXR0aW5nczogYW55O1xuICBwcml2YXRlIF9jdXJyZW50OiBhbnk7XG5cbiAgY29uc3RydWN0b3IoZmlsZW5hbWU6IHN0cmluZykge1xuICAgIHRoaXMuX2ZpbGVuYW1lID0gZmlsZW5hbWU7XG4gIH1cblxuICBwdWJsaWMgYXN5bmMgcHVzaChuYW1lOiBzdHJpbmcpIHtcbiAgICBpZiAoIXRoaXMuX3NldHRpbmdzKVxuICAgICAgYXdhaXQgdGhpcy5sb2FkKCk7XG4gICAgbGV0IG9iamVjdCA9IHRoaXMuX2N1cnJlbnQub2JqZWN0W25hbWVdO1xuICAgIGlmICghb2JqZWN0KVxuICAgICAgb2JqZWN0ID0gdGhpcy5fY3VycmVudC5vYmplY3RbbmFtZV0gPSB7fTtcbiAgICB0aGlzLl9jdXJyZW50ID0geyBwYXJlbnQ6IHRoaXMuX2N1cnJlbnQsIG9iamVjdCB9O1xuICB9XG5cbiAgcHVibGljIGFzeW5jIHBvcCgpIHtcbiAgICBpZiAoIXRoaXMuX3NldHRpbmdzKVxuICAgICAgYXdhaXQgdGhpcy5sb2FkKCk7XG4gICAgY29uc29sZS5hc3NlcnQodGhpcy5fY3VycmVudC5wYXJlbnQpO1xuICAgIHRoaXMuX2N1cnJlbnQgPSB0aGlzLl9jdXJyZW50LnBhcmVudDtcbiAgfVxuXG4gIHB1YmxpYyBhc3luYyBnZXQobmFtZTogc3RyaW5nKSB7XG4gICAgaWYgKCF0aGlzLl9zZXR0aW5ncylcbiAgICAgIGF3YWl0IHRoaXMubG9hZCgpO1xuICAgIHJldHVybiB0aGlzLl9jdXJyZW50Lm9iamVjdFtuYW1lXTtcbiAgfVxuXG4gIHB1YmxpYyBhc3luYyBzZXQobmFtZTogc3RyaW5nLCB2YWx1ZTogYW55KSB7XG4gICAgaWYgKCF0aGlzLl9zZXR0aW5ncylcbiAgICAgIGF3YWl0IHRoaXMubG9hZCgpO1xuICAgIHRoaXMuX2N1cnJlbnQub2JqZWN0W25hbWVdID0gdmFsdWU7XG4gICAgYXdhaXQgdGhpcy5zYXZlKCk7XG4gIH1cblxuICBwdWJsaWMgYXN5bmMgbG9hZCgpIHtcbiAgICB0cnkge1xuICAgICAgY29uc3QgY29udGVudCA9IGF3YWl0IGZzLnByb21pc2VzLnJlYWRGaWxlKHRoaXMuX2ZpbGVuYW1lLCBcInV0Zi04XCIpO1xuICAgICAgdGhpcy5fc2V0dGluZ3MgPSBKU09OLnBhcnNlKGNvbnRlbnQpO1xuICAgIH1cbiAgICBjYXRjaCAoZSkge1xuICAgICAgdGhpcy5fc2V0dGluZ3MgPSB7fTtcbiAgICB9XG4gICAgdGhpcy5fY3VycmVudCA9XG4gICAge1xuICAgICAgcGFyZW50OiBudWxsLFxuICAgICAgb2JqZWN0OiB0aGlzLl9zZXR0aW5ncyxcbiAgICB9O1xuICB9XG5cbiAgcHVibGljIGFzeW5jIHNhdmUoKSB7XG4gICAgY29uc3Qgc3BhY2UgPSAyO1xuICAgIGNvbnN0IGNvbnRlbnQgPSBKU09OLnN0cmluZ2lmeSh0aGlzLl9zZXR0aW5ncywgdW5kZWZpbmVkLCBzcGFjZSk7XG4gICAgYXdhaXQgZnMucHJvbWlzZXMud3JpdGVGaWxlKHRoaXMuX2ZpbGVuYW1lLCBjb250ZW50LCB7IGVuY29kaW5nOiBcInV0Zi04XCIsIGZsYWc6IFwid1wiLCBmbHVzaDogdHJ1ZSB9KTtcbiAgfVxufTtcbiIsIi8qXG4gKiBNSVQgTGljZW5zZVxuICpcbiAqIENvcHlyaWdodCAoYykgMjAyNSAgWXVyaWkgWWFrdWJpbiAoeXVyaWkueWFrdWJpbkBnbWFpbC5jb20pXG4gKlxuICogUGVybWlzc2lvbiBpcyBncmFudGVkIHRvIHVzZSwgY29weSwgbW9kaWZ5LCBhbmQgZGlzdHJpYnV0ZSB0aGlzIHNvZnR3YXJlXG4gKiB1bmRlciB0aGUgTUlUIExpY2Vuc2UuIFNlZSBMSUNFTlNFIGZpbGUgZm9yIGRldGFpbHMuXG4gKi9cblxuZXhwb3J0IGZ1bmN0aW9uIGVuc3VyZUJvb2xlYW4odmFsdWU6IGFueSkge1xuICBpZiAodHlwZW9mIHZhbHVlID09PSBcImJvb2xlYW5cIilcbiAgICByZXR1cm4gdmFsdWU7XG4gIHRocm93IG5ldyBFcnJvcihgVGhlICcke3ZhbHVlfScgaXMgbm90IGEgYm9vbGVhbmApO1xufVxuXG5leHBvcnQgZnVuY3Rpb24gZW5zdXJlTnVtYmVyKHZhbHVlOiBhbnkpIHtcbiAgaWYgKHR5cGVvZiB2YWx1ZSA9PT0gXCJudW1iZXJcIilcbiAgICByZXR1cm4gdmFsdWU7XG4gIHRocm93IG5ldyBFcnJvcihgVGhlICcke3ZhbHVlfScgaXMgbm90IGEgc3RyaW5nYCk7XG59XG5cbmV4cG9ydCBmdW5jdGlvbiBlbnN1cmVTdHJpbmcodmFsdWU6IGFueSkge1xuICBpZiAodHlwZW9mIHZhbHVlID09PSBcInN0cmluZ1wiKVxuICAgIHJldHVybiB2YWx1ZTtcbiAgdGhyb3cgbmV3IEVycm9yKGBUaGUgJyR7dmFsdWV9JyBpcyBub3QgYSBzdHJpbmdgKTtcbn1cblxuZXhwb3J0IGZ1bmN0aW9uIGVuc3VyZUFycmF5KHZhbHVlOiBhbnkpIHtcbiAgaWYgKEFycmF5LmlzQXJyYXkodmFsdWUpKVxuICAgIHJldHVybiBBcnJheS5mcm9tKHZhbHVlKTtcbiAgdGhyb3cgbmV3IEVycm9yKGBUaGUgJyR7dmFsdWV9JyBpcyBub3QgYSBhcnJheWApO1xufVxuIiwibW9kdWxlLmV4cG9ydHMgPSByZXF1aXJlKFwiaHR0cFwiKTsiLCJtb2R1bGUuZXhwb3J0cyA9IHJlcXVpcmUoXCJodHRwc1wiKTsiLCJtb2R1bGUuZXhwb3J0cyA9IHJlcXVpcmUoXCJub2RlOmNoaWxkX3Byb2Nlc3NcIik7IiwibW9kdWxlLmV4cG9ydHMgPSByZXF1aXJlKFwibm9kZTpmc1wiKTsiLCJtb2R1bGUuZXhwb3J0cyA9IHJlcXVpcmUoXCJub2RlOm9zXCIpOyIsIm1vZHVsZS5leHBvcnRzID0gcmVxdWlyZShcIm5vZGU6cGF0aFwiKTsiLCJtb2R1bGUuZXhwb3J0cyA9IHJlcXVpcmUoXCJub2RlOnVybFwiKTsiLCIvLyBUaGUgbW9kdWxlIGNhY2hlXG52YXIgX193ZWJwYWNrX21vZHVsZV9jYWNoZV9fID0ge307XG5cbi8vIFRoZSByZXF1aXJlIGZ1bmN0aW9uXG5mdW5jdGlvbiBfX3dlYnBhY2tfcmVxdWlyZV9fKG1vZHVsZUlkKSB7XG5cdC8vIENoZWNrIGlmIG1vZHVsZSBpcyBpbiBjYWNoZVxuXHR2YXIgY2FjaGVkTW9kdWxlID0gX193ZWJwYWNrX21vZHVsZV9jYWNoZV9fW21vZHVsZUlkXTtcblx0aWYgKGNhY2hlZE1vZHVsZSAhPT0gdW5kZWZpbmVkKSB7XG5cdFx0cmV0dXJuIGNhY2hlZE1vZHVsZS5leHBvcnRzO1xuXHR9XG5cdC8vIENyZWF0ZSBhIG5ldyBtb2R1bGUgKGFuZCBwdXQgaXQgaW50byB0aGUgY2FjaGUpXG5cdHZhciBtb2R1bGUgPSBfX3dlYnBhY2tfbW9kdWxlX2NhY2hlX19bbW9kdWxlSWRdID0ge1xuXHRcdC8vIG5vIG1vZHVsZS5pZCBuZWVkZWRcblx0XHQvLyBubyBtb2R1bGUubG9hZGVkIG5lZWRlZFxuXHRcdGV4cG9ydHM6IHt9XG5cdH07XG5cblx0Ly8gRXhlY3V0ZSB0aGUgbW9kdWxlIGZ1bmN0aW9uXG5cdF9fd2VicGFja19tb2R1bGVzX19bbW9kdWxlSWRdKG1vZHVsZSwgbW9kdWxlLmV4cG9ydHMsIF9fd2VicGFja19yZXF1aXJlX18pO1xuXG5cdC8vIFJldHVybiB0aGUgZXhwb3J0cyBvZiB0aGUgbW9kdWxlXG5cdHJldHVybiBtb2R1bGUuZXhwb3J0cztcbn1cblxuIiwiLy8gZ2V0RGVmYXVsdEV4cG9ydCBmdW5jdGlvbiBmb3IgY29tcGF0aWJpbGl0eSB3aXRoIG5vbi1oYXJtb255IG1vZHVsZXNcbl9fd2VicGFja19yZXF1aXJlX18ubiA9IChtb2R1bGUpID0+IHtcblx0dmFyIGdldHRlciA9IG1vZHVsZSAmJiBtb2R1bGUuX19lc01vZHVsZSA/XG5cdFx0KCkgPT4gKG1vZHVsZVsnZGVmYXVsdCddKSA6XG5cdFx0KCkgPT4gKG1vZHVsZSk7XG5cdF9fd2VicGFja19yZXF1aXJlX18uZChnZXR0ZXIsIHsgYTogZ2V0dGVyIH0pO1xuXHRyZXR1cm4gZ2V0dGVyO1xufTsiLCIvLyBkZWZpbmUgZ2V0dGVyIGZ1bmN0aW9ucyBmb3IgaGFybW9ueSBleHBvcnRzXG5fX3dlYnBhY2tfcmVxdWlyZV9fLmQgPSAoZXhwb3J0cywgZGVmaW5pdGlvbikgPT4ge1xuXHRmb3IodmFyIGtleSBpbiBkZWZpbml0aW9uKSB7XG5cdFx0aWYoX193ZWJwYWNrX3JlcXVpcmVfXy5vKGRlZmluaXRpb24sIGtleSkgJiYgIV9fd2VicGFja19yZXF1aXJlX18ubyhleHBvcnRzLCBrZXkpKSB7XG5cdFx0XHRPYmplY3QuZGVmaW5lUHJvcGVydHkoZXhwb3J0cywga2V5LCB7IGVudW1lcmFibGU6IHRydWUsIGdldDogZGVmaW5pdGlvbltrZXldIH0pO1xuXHRcdH1cblx0fVxufTsiLCJfX3dlYnBhY2tfcmVxdWlyZV9fLm8gPSAob2JqLCBwcm9wKSA9PiAoT2JqZWN0LnByb3RvdHlwZS5oYXNPd25Qcm9wZXJ0eS5jYWxsKG9iaiwgcHJvcCkpIiwiLy8gZGVmaW5lIF9fZXNNb2R1bGUgb24gZXhwb3J0c1xuX193ZWJwYWNrX3JlcXVpcmVfXy5yID0gKGV4cG9ydHMpID0+IHtcblx0aWYodHlwZW9mIFN5bWJvbCAhPT0gJ3VuZGVmaW5lZCcgJiYgU3ltYm9sLnRvU3RyaW5nVGFnKSB7XG5cdFx0T2JqZWN0LmRlZmluZVByb3BlcnR5KGV4cG9ydHMsIFN5bWJvbC50b1N0cmluZ1RhZywgeyB2YWx1ZTogJ01vZHVsZScgfSk7XG5cdH1cblx0T2JqZWN0LmRlZmluZVByb3BlcnR5KGV4cG9ydHMsICdfX2VzTW9kdWxlJywgeyB2YWx1ZTogdHJ1ZSB9KTtcbn07IiwiLypcbiAqIE1JVCBMaWNlbnNlXG4gKlxuICogQ29weXJpZ2h0IChjKSAyMDI1ICBZdXJpaSBZYWt1YmluICh5dXJpaS55YWt1YmluQGdtYWlsLmNvbSlcbiAqXG4gKiBQZXJtaXNzaW9uIGlzIGdyYW50ZWQgdG8gdXNlLCBjb3B5LCBtb2RpZnksIGFuZCBkaXN0cmlidXRlIHRoaXMgc29mdHdhcmVcbiAqIHVuZGVyIHRoZSBNSVQgTGljZW5zZS4gU2VlIExJQ0VOU0UgZmlsZSBmb3IgZGV0YWlscy5cbiAqL1xuXG4vLy8gPHJlZmVyZW5jZSBwYXRoPVwiZ2xvYmFsLmQudHNcIiAvPlxuXG5pbXBvcnQgKiBhcyBjeHggZnJvbSBcIkAvY3h4XCI7XG5cbmltcG9ydCBpbml0SGFuZGxlciBmcm9tIFwiQC9Jbml0SGFuZGxlclwiO1xuaW1wb3J0IGJ1aWxkSGFuZGxlciBmcm9tIFwiQC9CdWlsZEhhbmRsZXJcIjtcblxuZXhwb3J0IGRlZmF1bHQge1xuICBjeHgsXG4gIGhhbmRsZXJzOiB7XG4gICAgZGVmYXVsdDogYnVpbGRIYW5kbGVyLFxuICAgIGluaXQ6IGluaXRIYW5kbGVyLFxuICAgIGJ1aWxkOiBidWlsZEhhbmRsZXIsXG4gIH0sXG59O1xuIl0sIm5hbWVzIjpbXSwic291cmNlUm9vdCI6IiJ9