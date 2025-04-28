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
/* harmony import */ var node_url__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! node:url */ "node:url");
/* harmony import */ var node_url__WEBPACK_IMPORTED_MODULE_2___default = /*#__PURE__*/__webpack_require__.n(node_url__WEBPACK_IMPORTED_MODULE_2__);
/* harmony import */ var _cmake__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! @/cmake */ "./src/cmake/index.ts");
/* harmony import */ var _utils_MakePatch__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! @/utils/MakePatch */ "./src/utils/MakePatch.ts");
/* harmony import */ var _utils_FileSystem__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(/*! @/utils/FileSystem */ "./src/utils/FileSystem.ts");
/* harmony import */ var _utils_SettingsStorage__WEBPACK_IMPORTED_MODULE_6__ = __webpack_require__(/*! @/utils/SettingsStorage */ "./src/utils/SettingsStorage.ts");
/* harmony import */ var _utils_ChildProcess__WEBPACK_IMPORTED_MODULE_7__ = __webpack_require__(/*! @/utils/ChildProcess */ "./src/utils/ChildProcess.ts");
/* harmony import */ var _MakeScriptAction__WEBPACK_IMPORTED_MODULE_8__ = __webpack_require__(/*! @/MakeScriptAction */ "./src/MakeScriptAction.ts");
/* harmony import */ var _utils_Primitives__WEBPACK_IMPORTED_MODULE_9__ = __webpack_require__(/*! @/utils/Primitives */ "./src/utils/Primitives.ts");
/* harmony import */ var _Constants__WEBPACK_IMPORTED_MODULE_10__ = __webpack_require__(/*! @/Constants */ "./src/Constants.ts");
/* harmony import */ var _utils_Module__WEBPACK_IMPORTED_MODULE_11__ = __webpack_require__(/*! @/utils/Module */ "./src/utils/Module.ts");
/* harmony import */ var _utils_HttpRequest__WEBPACK_IMPORTED_MODULE_12__ = __webpack_require__(/*! @/utils/HttpRequest */ "./src/utils/HttpRequest.ts");
/* harmony import */ var _RunScriptContext__WEBPACK_IMPORTED_MODULE_13__ = __webpack_require__(/*! @/RunScriptContext */ "./src/RunScriptContext.ts");
/* harmony import */ var _logger__WEBPACK_IMPORTED_MODULE_14__ = __webpack_require__(/*! @/logger */ "./src/logger/index.ts");
/*
 * MIT License
 *
 * Copyright (c) 2025  Yurii Yakubin (yurii.yakubin@gmail.com)
 *
 * Permission is granted to use, copy, modify, and distribute this software
 * under the MIT License. See LICENSE file for details.
 */

















const logger = (0,_logger__WEBPACK_IMPORTED_MODULE_14__.createLogger)("file:///mnt/c/opt/work/source/darkit-sdk/external/bitmake/src/BuildHandler.ts");
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
            for (const iter of (0,_utils_Primitives__WEBPACK_IMPORTED_MODULE_9__.arrayWrapper)(otherIter.base)) {
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
                    (0,_utils_Primitives__WEBPACK_IMPORTED_MODULE_9__.assignObject)(newEntry, iter);
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
                        const mainFile = (0,_utils_Module__WEBPACK_IMPORTED_MODULE_11__.requireResolve)(name);
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
            throw new Error(`The ${key} variable cannot be changed to "${config.sourceRoot}"`);
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
                throw new Error(`Missing sourceDir for ${key} action"`);
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
            const buffer = await (0,_utils_HttpRequest__WEBPACK_IMPORTED_MODULE_12__.requestGet)(sourceUrl);
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
        throw new Error("Unknown sourceUrl");
    if (!config.archiveDir)
        throw new Error("Unknown archiveDir");
    if (!config.extractDir)
        throw new Error("Unknown extractDir");
    if (!await (0,_utils_FileSystem__WEBPACK_IMPORTED_MODULE_5__.directoryExists)(config.archiveDir)) {
        console.log(`mkdir -p ${config.archiveDir}`);
        await node_fs__WEBPACK_IMPORTED_MODULE_0___default().promises.mkdir(config.archiveDir, { recursive: true });
    }
    if (!await (0,_utils_FileSystem__WEBPACK_IMPORTED_MODULE_5__.directoryExists)(config.tempDir)) {
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
        await tryRequestGet(config.sourceUrl, arcFile, _Constants__WEBPACK_IMPORTED_MODULE_10__.REQUEST_ATTEMPTS);
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
        await _cmake__WEBPACK_IMPORTED_MODULE_3__["default"].extract({
            environment,
            filename: arcFile,
            workDir: extractDir,
            logFile: node_path__WEBPACK_IMPORTED_MODULE_1___default().join(config.tempDir, node_path__WEBPACK_IMPORTED_MODULE_1___default().basename(extractDir) + ".log"),
        });
        const extractList = await node_fs__WEBPACK_IMPORTED_MODULE_0___default().promises.readdir(extractDir);
        if (extractList.length === 1) {
            extractDir = node_path__WEBPACK_IMPORTED_MODULE_1___default().resolve(extractDir, extractList[0]);
            if (!await (0,_utils_FileSystem__WEBPACK_IMPORTED_MODULE_5__.directoryExists)(extractDir)) {
                console.log(`rm -fr ${extractDir}`);
                await node_fs__WEBPACK_IMPORTED_MODULE_0___default().promises.rm(extractDir, { recursive: true });
                throw new Error(`Support only directory for archive`);
            }
        }
        if (await (0,_utils_FileSystem__WEBPACK_IMPORTED_MODULE_5__.directoryExists)(config.extractDir)) {
            // TODO: Marge extractDir with output
            console.log(`rm -fr ${config.extractDir}`);
            await node_fs__WEBPACK_IMPORTED_MODULE_0___default().promises.rm(config.extractDir, { recursive: true });
        }
        else {
            const parentDir = node_path__WEBPACK_IMPORTED_MODULE_1___default().dirname(config.extractDir);
            if (!await (0,_utils_FileSystem__WEBPACK_IMPORTED_MODULE_5__.directoryExists)(parentDir)) {
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
            await (0,_utils_MakePatch__WEBPACK_IMPORTED_MODULE_4__.makePatch)(config.patchDir, config.extractDir);
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
        const sourceDir = (0,_utils_FileSystem__WEBPACK_IMPORTED_MODULE_5__.getPathString)(config.sourceDir);
        const binaryDir = (0,_utils_FileSystem__WEBPACK_IMPORTED_MODULE_5__.getPathString)(config.binaryDir);
        const cmakeArgs = {
            environment: {
                ...environment,
                DESTDIR: config.destDir,
            },
            generator: config.generator || _cmake__WEBPACK_IMPORTED_MODULE_3__["default"].DEFAULT_GENERATOR,
            cacheVariables: config.cacheVariables,
            sourceDir,
            binaryDir,
        };
        if (!cmakeArgs.cacheVariables.CMAKE_BUILD_TYPE) {
            cmakeArgs.cacheVariables.CMAKE_BUILD_TYPE = config.buildType;
        }
        await _cmake__WEBPACK_IMPORTED_MODULE_3__["default"].configure(cmakeArgs);
        await _cmake__WEBPACK_IMPORTED_MODULE_3__["default"].build(cmakeArgs);
        await _cmake__WEBPACK_IMPORTED_MODULE_3__["default"].install(cmakeArgs);
    },
    configure: async (config, environment, settings) => {
        const sourceDir = (0,_utils_FileSystem__WEBPACK_IMPORTED_MODULE_5__.getPathString)(config.sourceDir);
        const binaryDir = (0,_utils_FileSystem__WEBPACK_IMPORTED_MODULE_5__.getPathString)(config.binaryDir);
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
            const res1 = await (0,_utils_ChildProcess__WEBPACK_IMPORTED_MODULE_7__.spawnAsync)(command, params, {
                cwd: binaryDir,
                env: environment,
                extra: {
                    output: `ac.config.log`,
                },
            });
            if (res1.status !== 0) {
                throw new Error(`configure returned status ${res1.status}`);
            }
            step = "install";
            await settings.set("configure", step);
        }
        if (step === "install") {
            const args = ['install'];
            if (config.destDir) {
                args.push(`DESTDIR=${config.destDir}`);
            }
            const res2 = await (0,_utils_ChildProcess__WEBPACK_IMPORTED_MODULE_7__.spawnAsync)("make", args, {
                cwd: binaryDir,
                env: environment,
                extra: {
                    output: `ac.build.log`,
                },
            });
            if (res2.status !== 0) {
                throw new Error(`make returned status ${res2.status}`);
            }
            step = "done";
            await settings.set("configure", step);
        }
    },
    make: async (config, environment, settings) => {
        const binaryDir = (0,_utils_FileSystem__WEBPACK_IMPORTED_MODULE_5__.getPathString)(config.binaryDir);
        const args = config.args || [];
        if (config.destDir) {
            args.push(`DESTDIR=${config.destDir}`);
        }
        const res2 = await (0,_utils_ChildProcess__WEBPACK_IMPORTED_MODULE_7__.spawnAsync)("make", args, {
            cwd: binaryDir,
            env: environment,
            extra: {
                output: `make.log`,
            },
        });
        if (res2.status !== 0) {
            throw new Error(`make returned status ${res2.status}`);
        }
    },
    process: async (config, environment, settings) => {
        if (!config.command)
            throw new Error("Required command field for process action");
        const sourceDir = (0,_utils_FileSystem__WEBPACK_IMPORTED_MODULE_5__.getPathString)(config.sourceDir);
        const binaryDir = (0,_utils_FileSystem__WEBPACK_IMPORTED_MODULE_5__.getPathString)(config.binaryDir);
        let { command } = config;
        if (!node_path__WEBPACK_IMPORTED_MODULE_1___default().isAbsolute(command) && (command.includes((node_path__WEBPACK_IMPORTED_MODULE_1___default().posix).delimiter) || command.includes((node_path__WEBPACK_IMPORTED_MODULE_1___default().win32).delimiter))) {
            command = node_path__WEBPACK_IMPORTED_MODULE_1___default().resolve(sourceDir, command);
        }
        const res = await (0,_utils_ChildProcess__WEBPACK_IMPORTED_MODULE_7__.spawnAsync)(command, config.args || [], {
            cwd: binaryDir,
            env: environment,
            extra: {
                output: `process.log`,
            },
        });
        if (res.status !== 0) {
            throw new Error(`process returned status ${res.status}`);
        }
    },
    bitmake: _MakeScriptAction__WEBPACK_IMPORTED_MODULE_8__.makeScriptAction,
};
async function doTargetBuild(ctx, environment, config, settings) {
    if (config.preAction) {
        await settings.push("preAction");
        const newConfig = {};
        (0,_utils_Primitives__WEBPACK_IMPORTED_MODULE_9__.assignObject)(newConfig, config);
        delete newConfig.action;
        delete newConfig.preAction;
        delete newConfig.postAction;
        (0,_utils_Primitives__WEBPACK_IMPORTED_MODULE_9__.assignObject)(newConfig, config.preAction);
        const newEnvironment = mergeEnvironment(config.preAction.environment, environment);
        await doTargetBuild(ctx, newEnvironment, newConfig, settings);
        await settings.pop();
    }
    if (Array.isArray(config.action)) {
        await settings.push("action");
        for (var i = 0; i < config.action.length; ++i) {
            await settings.push(i);
            const newConfig = {};
            (0,_utils_Primitives__WEBPACK_IMPORTED_MODULE_9__.assignObject)(newConfig, config);
            delete newConfig.action;
            delete newConfig.preAction;
            delete newConfig.postAction;
            (0,_utils_Primitives__WEBPACK_IMPORTED_MODULE_9__.assignObject)(newConfig, config.action[i]);
            const newEnvironment = mergeEnvironment(config.action[i].environment, environment);
            await doTargetBuild(ctx, newEnvironment, newConfig, settings);
            await settings.pop();
        }
        await settings.pop();
    }
    else {
        if (!await (0,_utils_FileSystem__WEBPACK_IMPORTED_MODULE_5__.directoryExists)(config.binaryDir)) {
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
        (0,_utils_Primitives__WEBPACK_IMPORTED_MODULE_9__.assignObject)(newConfig, config);
        delete newConfig.action;
        delete newConfig.preAction;
        delete newConfig.postAction;
        (0,_utils_Primitives__WEBPACK_IMPORTED_MODULE_9__.assignObject)(newConfig, config.postAction);
        const newEnvironment = mergeEnvironment(config.postAction.environment, environment);
        await doTargetBuild(ctx, newEnvironment, newConfig, settings);
        await settings.pop();
    }
}
async function getUserConfig(options) {
    let configPath;
    if (options.env.config) {
        configPath = node_path__WEBPACK_IMPORTED_MODULE_1___default().isAbsolute(options.env.config) ? options.env.config : node_path__WEBPACK_IMPORTED_MODULE_1___default().resolve(options.workDir, options.env.config);
        if (!await (0,_utils_FileSystem__WEBPACK_IMPORTED_MODULE_5__.fileExists)(configPath))
            throw `Configuration '${options.env.config}' file does not exist`;
    }
    else {
        const userConfigPath = node_path__WEBPACK_IMPORTED_MODULE_1___default().resolve(options.workDir, _Constants__WEBPACK_IMPORTED_MODULE_10__.USER_CONFIG);
        if (await (0,_utils_FileSystem__WEBPACK_IMPORTED_MODULE_5__.fileExists)(userConfigPath))
            configPath = userConfigPath;
        else {
            logger.warn(`Config file '${_Constants__WEBPACK_IMPORTED_MODULE_10__.USER_CONFIG}' is not available`);
        }
    }
    if (!configPath) {
        return {
            "bundle:output": {
                action: "bitmake",
                variables: {
                    INSTALL_PREFIX: "/usr",
                },
                sourceDir: "${sourceRoot}",
                destDir: "${binaryRoot}/output",
            }
        };
    }
    const configUrl = node_url__WEBPACK_IMPORTED_MODULE_2___default().pathToFileURL(configPath);
    const configModule = await (0,_utils_Module__WEBPACK_IMPORTED_MODULE_11__.importModule)(configUrl);
    switch (typeof configModule.default) {
        case "function":
            const userConfig = configModule.default(options.env, {});
            if (userConfig instanceof Promise)
                return await userConfig;
            return userConfig;
        case "object":
            return configModule.default;
        default:
            throw new Error(`Unknown user configuration type`);
    }
}
/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = (async (options) => {
    const ctx = new _RunScriptContext__WEBPACK_IMPORTED_MODULE_13__.RunScriptContext(options);
    const userConfig = await getUserConfig(options);
    const buildConfig = makeBuildConfig(ctx, userConfig);
    if (buildConfig.RECIPE_CONTENT_FILE) {
        const jsonConfig = JSON.stringify(buildConfig, null, 2);
        await (0,_utils_FileSystem__WEBPACK_IMPORTED_MODULE_5__.saveIfDifferent)(buildConfig.RECIPE_CONTENT_FILE, jsonConfig);
    }
    const settingsFilename = node_path__WEBPACK_IMPORTED_MODULE_1___default().resolve(buildConfig.binaryRoot, _Constants__WEBPACK_IMPORTED_MODULE_10__.BUILD_SETTINGS_FILE);
    const settings = new _utils_SettingsStorage__WEBPACK_IMPORTED_MODULE_6__.SettingsStorage(settingsFilename);
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
    if (preset) {
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
    }
    if (!presetPath)
        throw new Error(`Preset '${preset}' is not available`);
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
/* harmony import */ var _core_DetermineCompiler__WEBPACK_IMPORTED_MODULE_10__ = __webpack_require__(/*! @/core/DetermineCompiler */ "./src/core/DetermineCompiler.ts");
/* harmony import */ var _core_SystemVariables__WEBPACK_IMPORTED_MODULE_11__ = __webpack_require__(/*! @/core/SystemVariables */ "./src/core/SystemVariables.ts");
/* harmony import */ var _Constants__WEBPACK_IMPORTED_MODULE_12__ = __webpack_require__(/*! @/Constants */ "./src/Constants.ts");
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
    _core_Scope__WEBPACK_IMPORTED_MODULE_4__.ScopeHelper.defineVariables(scope, "system", _core_SystemVariables__WEBPACK_IMPORTED_MODULE_11__["default"]);
    const sourceDir = (0,_utils_FileSystem__WEBPACK_IMPORTED_MODULE_7__.getPathString)(config.sourceDir);
    const binaryDir = (0,_utils_FileSystem__WEBPACK_IMPORTED_MODULE_7__.getPathString)(config.binaryDir);
    scope.PROJECT_SOURCE_DIR = _core_Path__WEBPACK_IMPORTED_MODULE_8__.DirPath.create(sourceDir);
    scope.PROJECT_BINARY_DIR = _core_Path__WEBPACK_IMPORTED_MODULE_8__.DirPath.create(binaryDir);
    scope.PACKAGE_FILE = scope.PROJECT_SOURCE_DIR.join(PACKAGE_JSON);
    scope.CACHE_FILE = scope.PROJECT_BINARY_DIR.join(MAKE_CACHE);
    scope.SOURCE_DIR = scope.PROJECT_SOURCE_DIR;
    scope.BINARY_DIR = scope.PROJECT_BINARY_DIR;
    const packageJson = await node_fs__WEBPACK_IMPORTED_MODULE_0___default().promises.readFile(scope.PACKAGE_FILE.toString(), 'utf8');
    const pkg = JSON.parse(packageJson);
    scope.BUILD_TYPE = config.buildType;
    scope.PROJECT_NAME = pkg.name;
    scope.PROJECT_VERSION = pkg.version;
    scope.PROJECT_DESCRIPTION = pkg.description || "";
    scope.PROJECT_HOMEPAGE_URL = pkg.homepage || "";
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
        _core_Scope__WEBPACK_IMPORTED_MODULE_4__.ScopeHelper.applyVariables(scope, mk);
    }
    else {
        await (0,_core_DetermineCompiler__WEBPACK_IMPORTED_MODULE_10__.determineCompiler)(scope);
    }
    for (const plugin of (scope.MAKE_PLUGIN_LIST || [])) {
        const cwdSave = process.cwd();
        scope.SCRIPT_FILE = _core_Path__WEBPACK_IMPORTED_MODULE_8__.FilePath.create(plugin);
        scope.SCRIPT_DIR = scope.SCRIPT_FILE.dirname();
        process.chdir(scope.SCRIPT_DIR.toString());
        const module = await (0,_utils_Module__WEBPACK_IMPORTED_MODULE_9__.importModule)(scope.SCRIPT_FILE.toString());
        if (!module.default)
            throw new Error(`Plugin ${scope.SCRIPT_FILE.basename()} not contain default function`);
        const mk = _core_PluginContext__WEBPACK_IMPORTED_MODULE_2__.PluginContext.create(scope, global);
        const result = module.default(mk);
        if (result instanceof Promise)
            await result;
        _core_Scope__WEBPACK_IMPORTED_MODULE_4__.ScopeHelper.applyVariables(scope, mk);
        process.chdir(cwdSave);
    }
    global.addSubdirectory(scope);
    await global.doSubdirectory();
    console.info("Configuring done");
    if (scope.GLOBAL_CONTEXT_JSON) {
        const filename = scope.GLOBAL_CONTEXT_JSON.toString();
        const content = JSON.stringify(global, null, 2);
        await node_fs__WEBPACK_IMPORTED_MODULE_0___default().promises.mkdir(node_path__WEBPACK_IMPORTED_MODULE_1___default().dirname(filename), { recursive: true });
        await node_fs__WEBPACK_IMPORTED_MODULE_0___default().promises.writeFile(filename, content, { encoding: "utf8" });
    }
    const allGoalList = global.createGoals(scope);
    const goalList = allGoalList.getTargetList(_Constants__WEBPACK_IMPORTED_MODULE_12__.INSTALL_TARGET);
    if (scope.TARGET_GOALS_JSON) {
        const filename = scope.TARGET_GOALS_JSON.toString();
        const content = JSON.stringify(goalList, null, 2);
        await node_fs__WEBPACK_IMPORTED_MODULE_0___default().promises.mkdir(node_path__WEBPACK_IMPORTED_MODULE_1___default().dirname(filename), { recursive: true });
        await node_fs__WEBPACK_IMPORTED_MODULE_0___default().promises.writeFile(filename, content, { encoding: "utf8" });
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
/* harmony import */ var _Constants__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! @/Constants */ "./src/Constants.ts");
/* harmony import */ var _core_Types__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! @/core/Types */ "./src/core/Types.ts");
/*
 * MIT License
 *
 * Copyright (c) 2025  Yurii Yakubin (yurii.yakubin@gmail.com)
 *
 * Permission is granted to use, copy, modify, and distribute this software
 * under the MIT License. See LICENSE file for details.
 */



;
class RunScriptContext {
    _nodeExecutable;
    _currentScript;
    _workDir;
    _env;
    _userConfig;
    constructor(options) {
        this._nodeExecutable = options.nodeExecutable;
        this._currentScript = options.currentScript;
        this._workDir = options.workDir;
        this._env = options.env;
    }
    get nodeExecutable() {
        return this._nodeExecutable;
    }
    get currentScript() {
        return this._currentScript;
    }
    get workDir() {
        return this._workDir;
    }
    get env() {
        return this._env;
    }
    get userConfigPath() {
        return node_path__WEBPACK_IMPORTED_MODULE_0___default().resolve(this._workDir, _Constants__WEBPACK_IMPORTED_MODULE_1__.USER_CONFIG);
    }
    get buildType() {
        return this._env.buildType == _core_Types__WEBPACK_IMPORTED_MODULE_2__.DEBUG_BUILD_TYPE ? this._env.buildType : _core_Types__WEBPACK_IMPORTED_MODULE_2__.RELEASE_BUILD_TYPE;
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
/* harmony export */   DEFAULT_GENERATOR: () => (/* binding */ DEFAULT_GENERATOR),
/* harmony export */   GeneratorType: () => (/* binding */ GeneratorType),
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
var GeneratorType;
(function (GeneratorType) {
    // Name of the CMake generator for standard Unix 'make' build system
    GeneratorType["UnixMakefiles"] = "Unix Makefiles";
})(GeneratorType || (GeneratorType = {}));
;
// Name of the CMake generator for standard Unix 'make' build system
const DEFAULT_GENERATOR = GeneratorType.UnixMakefiles;


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
/* harmony export */   "default": () => (__WEBPACK_DEFAULT_EXPORT__),
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
/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = ({
    DEFAULT_GENERATOR: _cmake_Constants__WEBPACK_IMPORTED_MODULE_4__.DEFAULT_GENERATOR,
    configure,
    build,
    install,
    ctest,
    extract,
});


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


/* harmony default export */ async function __WEBPACK_DEFAULT_EXPORT__(mk, params) {
    let content = await node_fs__WEBPACK_IMPORTED_MODULE_0___default().promises.readFile(params.input, "utf-8");
    content = content.replace(/@([_A-Za-z][_A-Za-z0-9]+)@/g, (match, v1) => {
        const res = params[v1] || mk[v1] || "";
        if (Array.isArray(res))
            return res.join("\n");
        return res.toString();
    });
    content = content.replace(/#cmakedefine +([_A-Za-z][_A-Za-z0-9]+) *(.*)/g, (match, v1, v2) => {
        return params[v1] || mk[v1] ? `#define ${v1} ${v2}` : `/* #undef ${v1} */`;
    });
    await node_fs__WEBPACK_IMPORTED_MODULE_0___default().promises.mkdir(node_path__WEBPACK_IMPORTED_MODULE_1___default().dirname(params.output), { recursive: true });
    await node_fs__WEBPACK_IMPORTED_MODULE_0___default().promises.writeFile(params.output, content, "utf-8");
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
/* harmony import */ var _logger__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! @/logger */ "./src/logger/index.ts");
/*
 * MIT License
 *
 * Copyright (c) 2025  Yurii Yakubin (yurii.yakubin@gmail.com)
 *
 * Permission is granted to use, copy, modify, and distribute this software
 * under the MIT License. See LICENSE file for details.
 */



const logger = (0,_logger__WEBPACK_IMPORTED_MODULE_2__.createLogger)("file:///mnt/c/opt/work/source/darkit-sdk/external/bitmake/src/core/BuildinScripts/install_script.ts");
/* harmony default export */ async function __WEBPACK_DEFAULT_EXPORT__(params) {
    logger.info("Installing: " + params.dest);
    await node_fs__WEBPACK_IMPORTED_MODULE_0___default().promises.mkdir(node_path__WEBPACK_IMPORTED_MODULE_1___default().dirname(params.dest), { recursive: true });
    await node_fs__WEBPACK_IMPORTED_MODULE_0___default().promises.cp(params.src, params.dest, { force: true });
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
/* harmony import */ var _core_Scope__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! @/core/Scope */ "./src/core/Scope.ts");
/*
 * MIT License
 *
 * Copyright (c) 2025  Yurii Yakubin (yurii.yakubin@gmail.com)
 *
 * Permission is granted to use, copy, modify, and distribute this software
 * under the MIT License. See LICENSE file for details.
 */

const SCOPE = Symbol("SCOPE");
const NAME = Symbol("NAME");
const SCRIPT = Symbol("SCRIPT");
const INPUT = Symbol("INPUT");
const OUTPUT = Symbol("OUTPUT");
const PARAMS = Symbol("PARAMS");
const WORK_DIR = Symbol("WORK_DIR");
const VARIABLES = Symbol("VARIABLES");
class CustomScript {
    [SCOPE];
    [NAME];
    [SCRIPT];
    [INPUT];
    [OUTPUT];
    [PARAMS];
    [WORK_DIR];
    [VARIABLES];
    constructor(options) {
        this[SCOPE] = options.scope;
        this[NAME] = options.name || null;
        this[INPUT] = options.input;
        this[SCRIPT] = options.script;
        this[OUTPUT] = options.output;
        this[PARAMS] = options.params;
        this[WORK_DIR] = options.workDir;
        this[VARIABLES] = options.variables;
    }
    static create(options) {
        return Object.seal(new CustomScript(options));
    }
    mergeVariables(variables) {
        _core_Scope__WEBPACK_IMPORTED_MODULE_0__.ScopeHelper.mergeVariables(this[VARIABLES], variables);
    }
    get SCRIPT() {
        return this[SCRIPT];
    }
    get INPUT() {
        return this[INPUT];
    }
    get OUTPUT() {
        return this[OUTPUT];
    }
    get PARAMS() {
        return this[PARAMS];
    }
    set PARAMS(value) {
        this[PARAMS] = value;
    }
    get workDir() {
        return this[WORK_DIR];
    }
    get VARIABLES() {
        return this[VARIABLES];
    }
    get SCOPE() {
        return this[SCOPE];
    }
    toJSON() {
        return {
            SCOPE: this[SCOPE],
            NAME: this[NAME],
            SCRIPT: this.SCRIPT,
            INPUT: this.INPUT,
            OUTPUT: this.OUTPUT,
            PARAMS: this.PARAMS,
            VARIABLES: this.VARIABLES,
        };
    }
}
;
(function (CustomScript) {
    ;
})(CustomScript || (CustomScript = {})); // namespace CustomScript


/***/ }),

/***/ "./src/core/DefinitionHelper.ts":
/*!**************************************!*\
  !*** ./src/core/DefinitionHelper.ts ***!
  \**************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   normalizeDefinitions: () => (/* binding */ normalizeDefinitions)
/* harmony export */ });
/*
 * MIT License
 *
 * Copyright (c) 2025  Yurii Yakubin (yurii.yakubin@gmail.com)
 *
 * Permission is granted to use, copy, modify, and distribute this software
 * under the MIT License. See LICENSE file for details.
 */
function convertValueToDefinition(value) {
    if (value === undefined)
        throw `Definition undefined`;
    if (typeof value === "object")
        return '"' + JSON.stringify(value) + '"';
    return value.toString();
}
function normalizeDefinitions(...definitions) {
    const result = [];
    for (const iter of definitions) {
        if (typeof iter === "string")
            result.push(iter);
        else if (!iter)
            throw new Error(`Defenition ${iter} not supported`);
        else if (Array.isArray(iter)) {
            for (const val of iter)
                result.push(convertValueToDefinition(val));
        }
        else if (typeof iter === "object") {
            for (const [key, val] of Object.entries(iter))
                result.push(`${key}=${convertValueToDefinition(val)}`);
        }
        else
            throw new Error(`Defenition ${iter} not supported`);
    }
    return result;
}


/***/ }),

/***/ "./src/core/DetermineCompiler.ts":
/*!***************************************!*\
  !*** ./src/core/DetermineCompiler.ts ***!
  \***************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   determineCompiler: () => (/* binding */ determineCompiler)
/* harmony export */ });
/* harmony import */ var _core_FindProgram__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! @/core/FindProgram */ "./src/core/FindProgram.ts");
/* harmony import */ var _logger__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! @/logger */ "./src/logger/index.ts");
/*
 * MIT License
 *
 * Copyright (c) 2025  Yurii Yakubin (yurii.yakubin@gmail.com)
 *
 * Permission is granted to use, copy, modify, and distribute this software
 * under the MIT License. See LICENSE file for details.
 */


const logger = (0,_logger__WEBPACK_IMPORTED_MODULE_1__.createLogger)("file:///mnt/c/opt/work/source/darkit-sdk/external/bitmake/src/core/DetermineCompiler.ts");
async function determineCompiler(scope) {
    const clangPath = await (0,_core_FindProgram__WEBPACK_IMPORTED_MODULE_0__.findProgram)("clang");
    if (clangPath) {
        logger.info("The C compiler identification is Clang a.b.c");
        scope.ASM_COMPILER = "clang";
        scope.C_COMPILER = "clang";
        scope.CXX_COMPILER = "clang++";
        scope.AR = "llvm-ar";
        scope.RANLIB = "llvm-ranlib";
        scope.LINKER = "lld";
        scope.NM = "llvm-nm";
        scope.OBJCOPY = "llvm-objcopy";
        scope.OBJDUMP = "llvm-objdump";
        scope.STRIP = "llvm-strip";
        return;
    }
    const gccPath = await (0,_core_FindProgram__WEBPACK_IMPORTED_MODULE_0__.findProgram)("gcc");
    if (gccPath) {
        logger.info("The C compiler identification is GNU a.b.c");
        scope.ASM_COMPILER = "gcc";
        scope.C_COMPILER = "gcc";
        scope.CXX_COMPILER = "g++";
        scope.AR = "ar";
        scope.RANLIB = "ranlib";
        scope.LINKER = "ld";
        scope.NM = "nm";
        scope.OBJCOPY = "objcopy";
        scope.OBJDUMP = "objdump";
        scope.STRIP = "strip";
        return;
    }
    throw `Can not determine compiler`;
}


/***/ }),

/***/ "./src/core/FindProgram.ts":
/*!*********************************!*\
  !*** ./src/core/FindProgram.ts ***!
  \*********************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   findProgram: () => (/* binding */ findProgram),
/* harmony export */   findProgramSync: () => (/* binding */ findProgramSync)
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



function possibleProgramList(name) {
    if (node_os__WEBPACK_IMPORTED_MODULE_0___default().platform() === "win32" && !name.endsWith(".exe"))
        name += ".exe";
    const result = [];
    const paths = (process.env.PATH || "").split((node_path__WEBPACK_IMPORTED_MODULE_1___default().posix).delimiter);
    for (const iter of paths) {
        const filename = node_path__WEBPACK_IMPORTED_MODULE_1___default().posix.resolve(iter, name);
        result.push(filename);
    }
    return result;
}
async function findProgram(name) {
    for (const iter of possibleProgramList(name)) {
        if (await (0,_utils_FileSystem__WEBPACK_IMPORTED_MODULE_2__.fileExists)(iter))
            return iter;
    }
    return undefined;
}
function findProgramSync(name) {
    for (const iter of possibleProgramList(name)) {
        if ((0,_utils_FileSystem__WEBPACK_IMPORTED_MODULE_2__.fileExistsSync)(iter))
            return iter;
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
/* harmony import */ var _core_MakeContext__WEBPACK_IMPORTED_MODULE_11__ = __webpack_require__(/*! @/core/MakeContext */ "./src/core/MakeContext.ts");
/* harmony import */ var _core_Target__WEBPACK_IMPORTED_MODULE_12__ = __webpack_require__(/*! @/core/Target */ "./src/core/Target.ts");
/* harmony import */ var _core_Scope__WEBPACK_IMPORTED_MODULE_13__ = __webpack_require__(/*! @/core/Scope */ "./src/core/Scope.ts");
/* harmony import */ var _utils_Module__WEBPACK_IMPORTED_MODULE_14__ = __webpack_require__(/*! @/utils/Module */ "./src/utils/Module.ts");
/* harmony import */ var _logger__WEBPACK_IMPORTED_MODULE_15__ = __webpack_require__(/*! @/logger */ "./src/logger/index.ts");
/* harmony import */ var _core_CustomScript__WEBPACK_IMPORTED_MODULE_16__ = __webpack_require__(/*! @/core/CustomScript */ "./src/core/CustomScript.ts");
/* harmony import */ var _core_ScriptContext__WEBPACK_IMPORTED_MODULE_17__ = __webpack_require__(/*! @/core/ScriptContext */ "./src/core/ScriptContext.ts");
/* harmony import */ var _core_BuildinScripts_configure_file__WEBPACK_IMPORTED_MODULE_18__ = __webpack_require__(/*! @/core/BuildinScripts/configure_file */ "./src/core/BuildinScripts/configure_file.ts");
/* harmony import */ var _core_BuildinScripts_install_script__WEBPACK_IMPORTED_MODULE_19__ = __webpack_require__(/*! @/core/BuildinScripts/install_script */ "./src/core/BuildinScripts/install_script.ts");
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
const CUSTOM_SCRIPTS = Symbol("CUSTOM_SCRIPTS");
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
class GlobalContext {
    [TARGETS];
    [CUSTOM_SCRIPTS];
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
        this[CUSTOM_SCRIPTS] = _core_ScriptCollection__WEBPACK_IMPORTED_MODULE_5__.ScriptCollection.create();
        this[CACHE] = {};
        this[UNKNOWN_TARGETS] = {};
        this[INTERFACE_SCRIPTS] = {};
        this[INSTALL_LIST] = [];
        this[SCRIPT_VARIABLES_MAP] = {};
        this[SUBDIR_ALIAS] = {};
        this[SUBDIR_LIST] = [];
        this[BUILTIN_SCRIPTS] = {
            configure_file: _core_BuildinScripts_configure_file__WEBPACK_IMPORTED_MODULE_18__["default"],
            install_script: _core_BuildinScripts_install_script__WEBPACK_IMPORTED_MODULE_19__["default"],
        };
    }
    static create() {
        return Object.seal(new GlobalContext);
    }
    get TARGETS() {
        return this[TARGETS];
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
    get SCRIPT_VARIABLES_MAP() {
        return this[SCRIPT_VARIABLES_MAP];
    }
    get SUBDIR_ALIAS() {
        return this[SUBDIR_ALIAS];
    }
    addCustomScript(scope, script, params) {
        if (!params)
            throw new Error("Argument with parameters is missing");
        const sourceDir = scope.SOURCE_DIR;
        const binaryDir = scope.BINARY_DIR;
        let scriptObj;
        if (typeof script === "string")
            scriptObj = this.findScriptFunction(script);
        if (!scriptObj)
            scriptObj = _core_Path__WEBPACK_IMPORTED_MODULE_2__.FilePath.create(sourceDir.resolve(script));
        let inputFile = params.input;
        if (inputFile)
            inputFile = _core_Path__WEBPACK_IMPORTED_MODULE_2__.FilePath.create(sourceDir.resolve(inputFile));
        if (!params.output)
            throw new Error("CustomScript parameters required output entity");
        const outputFile = _core_Path__WEBPACK_IMPORTED_MODULE_2__.FilePath.create(sourceDir.resolve(params.output));
        const options = {
            scope,
            name: params.name,
            script: scriptObj,
            params,
            output: outputFile,
            input: inputFile,
            workDir: binaryDir,
            variables: params.variables || {},
        };
        const target = _core_CustomScript__WEBPACK_IMPORTED_MODULE_16__.CustomScript.create(options);
        if (options.name)
            this[CUSTOM_SCRIPTS].set(options.name, target);
        else
            this[CUSTOM_SCRIPTS].add(target);
        return target;
    }
    getUknownTarget(name) {
        let target = this[UNKNOWN_TARGETS][name];
        if (!target) {
            this[UNKNOWN_TARGETS][name] = target = _core_UnknownTarget__WEBPACK_IMPORTED_MODULE_7__.UnknownTarget.create(name);
        }
        return target;
    }
    registerSystemScope(name, scope) {
        if (this[SCRIPT_VARIABLES_MAP][name])
            throw new Error(`SystemVariables exists for ${name}`);
        this[SCRIPT_VARIABLES_MAP][name] = scope;
    }
    resolveSubdirectory(path) {
        const resolvedPath = this[SUBDIR_ALIAS][path.toString()];
        return resolvedPath || path;
    }
    addSubdirectoryAlias(src, dest) {
        const srcStr = src.toString();
        if (this[SUBDIR_ALIAS].hasOwnProperty(srcStr))
            logger.warn(`Owerride "${srcStr}" subdirectory alias`);
        this[SUBDIR_ALIAS][srcStr] = dest;
    }
    addInstallEntry(entry) {
        return this[INSTALL_LIST].push(entry);
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
                throw new Error(`There are no files ${fileList.join(", ")} in "${scope.SOURCE_DIR}"`);
            this.registerSystemScope(scriptFile.toString(), scope);
            scope.SCRIPT_FILE = scriptFile;
            scope.SCRIPT_DIR = scope.SCRIPT_FILE.dirname();
            const cwdSave = process.cwd();
            process.chdir(scope.SOURCE_DIR.toString());
            const module = await (0,_utils_Module__WEBPACK_IMPORTED_MODULE_14__.importModule)(scope.SCRIPT_FILE.toString());
            if (!module.default)
                throw new Error(`Subdirectory ${scope.SCRIPT_FILE.basename()} not contain default function`);
            const mk = _core_MakeContext__WEBPACK_IMPORTED_MODULE_11__.MakeContext.create(scope, this);
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
            const script = this[CUSTOM_SCRIPTS].get(iter.NAME);
            if (!script)
                throw new Error(`There is no CustomScript named ${iter.NAME}`);
            script.mergeVariables(iter.VARIABLES);
        }
        const goalList = _core_GoalCollection__WEBPACK_IMPORTED_MODULE_8__.GoalCollection.create();
        for (const script of this[CUSTOM_SCRIPTS].ENTRIES) {
            const depends = [];
            if (script.SCRIPT instanceof _core_Path__WEBPACK_IMPORTED_MODULE_2__.FilePath)
                depends.push(script.SCRIPT.toString());
            if (script.INPUT)
                depends.push(script.INPUT.toString());
            const msg = "\x1b[36m" + "Generating " + script.workDir.relative(script.OUTPUT) + "\x1b[0m";
            const params = { ...script.VARIABLES, ...script.PARAMS };
            let func = script.SCRIPT;
            const scope = script.SCOPE;
            const handler = async () => {
                if (func instanceof _core_Path__WEBPACK_IMPORTED_MODULE_2__.FilePath)
                    func = (await (0,_utils_Module__WEBPACK_IMPORTED_MODULE_14__.importModule)(func.toString())).default;
                if (func instanceof Function) {
                    const mk = _core_ScriptContext__WEBPACK_IMPORTED_MODULE_17__.ScriptContext.create(scope, this);
                    const result = func(mk, scopeValueAsPrimitives(params));
                    if (result instanceof Promise)
                        await result;
                }
                else {
                    throw new Error(`There is no Function`);
                }
            };
            goalList.addScript(handler, depends, script.OUTPUT.toString(), msg);
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
            const handler = async () => {
                const params = scopeValueAsPrimitives({ src, dest });
                await (0,_core_BuildinScripts_install_script__WEBPACK_IMPORTED_MODULE_19__["default"])(params);
            };
            goalList.addScript(handler, [src], dest.toString(), "");
            install_files.push(dest.toString());
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
            CUSTOM_SCRIPTS: this[CUSTOM_SCRIPTS],
            CACHE: this.CACHE,
            UNKNOWN_TARGETS: this.UNKNOWN_TARGETS,
            INTERFACE_SCRIPTS: this.INTERFACE_SCRIPTS,
            INSTALL_LIST: this[INSTALL_LIST],
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
    addScript(handler, depends, output, msg) {
        if (this.hasScriptByOutput(output.toString()))
            throw new Error(`Output "${output}" exists`);
        this[ENTRIES].push({ name: "", type: GoalType.SCRIPT, handler, output, depends, msg });
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
                const { handler } = goal;
                await handler();
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
/* harmony import */ var _core_Scope__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! @/core/Scope */ "./src/core/Scope.ts");
/*
 * MIT License
 *
 * Copyright (c) 2025  Yurii Yakubin (yurii.yakubin@gmail.com)
 *
 * Permission is granted to use, copy, modify, and distribute this software
 * under the MIT License. See LICENSE file for details.
 */

const NAME = Symbol("NAME");
const VARIABLES = Symbol("VARIABLES");
class InterfaceScript {
    [NAME];
    [VARIABLES];
    constructor(name) {
        this[NAME] = name;
        this[VARIABLES] = {};
    }
    get NAME() {
        return this[NAME];
    }
    get VARIABLES() {
        return this[VARIABLES];
    }
    mergeVariables(variables) {
        _core_Scope__WEBPACK_IMPORTED_MODULE_0__.ScopeHelper.mergeVariables(this[VARIABLES], variables);
    }
    toJSON() {
        return {
            NAME: this.NAME,
            VARIABLES: this.VARIABLES,
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

/***/ "./src/core/MakeContext.ts":
/*!*********************************!*\
  !*** ./src/core/MakeContext.ts ***!
  \*********************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   MakeContext: () => (/* binding */ MakeContext)
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
/* harmony import */ var _core_Scope__WEBPACK_IMPORTED_MODULE_8__ = __webpack_require__(/*! @/core/Scope */ "./src/core/Scope.ts");
/* harmony import */ var _core_FindProgram__WEBPACK_IMPORTED_MODULE_9__ = __webpack_require__(/*! @/core/FindProgram */ "./src/core/FindProgram.ts");
/* harmony import */ var _logger__WEBPACK_IMPORTED_MODULE_10__ = __webpack_require__(/*! @/logger */ "./src/logger/index.ts");
/*
 * MIT License
 *
 * Copyright (c) 2025  Yurii Yakubin (yurii.yakubin@gmail.com)
 *
 * Permission is granted to use, copy, modify, and distribute this software
 * under the MIT License. See LICENSE file for details.
 */











const logger = (0,_logger__WEBPACK_IMPORTED_MODULE_10__.createLogger)("file:///mnt/c/opt/work/source/darkit-sdk/external/bitmake/src/core/MakeContext.ts");
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
var MakeContext;
(function (MakeContext) {
    ;
    const methods = {
        findProgram: _core_FindProgram__WEBPACK_IMPORTED_MODULE_9__.findProgramSync,
        getCacheVariables() {
            return _core_Scope__WEBPACK_IMPORTED_MODULE_8__.ScopeHelper.getVariablesByGroup(this[SCOPE], "cache");
        },
        addCacheVariables(params) {
            let variables = params;
            if (typeof params === "string") {
                const filename = this[SCOPE].SOURCE_DIR.resolve(params).toString();
                if (!(0,_utils_FileSystem__WEBPACK_IMPORTED_MODULE_1__.fileExistsSync)(filename))
                    return;
                variables = requireImpl(filename);
            }
            _core_Scope__WEBPACK_IMPORTED_MODULE_8__.ScopeHelper.defineVariables(this[SCOPE], "cache", variables);
        },
        addIncludeDirectories(...dirs) {
            const sourceDir = this[SCOPE].SOURCE_DIR;
            for (const iter of dirs.flat(1)) {
                this[SCOPE].INCLUDES.push(_core_IncludeDirectory__WEBPACK_IMPORTED_MODULE_7__.IncludeDirectory.create(iter, sourceDir));
            }
        },
        addSubdirectory(sourceDir, binaryDir) {
            binaryDir = binaryDir || node_path__WEBPACK_IMPORTED_MODULE_0___default().isAbsolute(sourceDir) ? undefined : sourceDir;
            const SOURCE_DIR = node_path__WEBPACK_IMPORTED_MODULE_0___default().isAbsolute(sourceDir) ? _core_Path__WEBPACK_IMPORTED_MODULE_2__.AbsolutePath.create(sourceDir) : this[SCOPE].SOURCE_DIR.join(sourceDir);
            const BINARY_DIR = node_path__WEBPACK_IMPORTED_MODULE_0___default().isAbsolute(binaryDir) ? _core_Path__WEBPACK_IMPORTED_MODULE_2__.AbsolutePath.create(binaryDir) : this[SCOPE].BINARY_DIR.join(binaryDir);
            const newScope = _core_Scope__WEBPACK_IMPORTED_MODULE_8__.ScopeHelper.clone({}, this[SCOPE]);
            _core_Scope__WEBPACK_IMPORTED_MODULE_8__.ScopeHelper.applyVariables(newScope, this);
            newScope.SOURCE_DIR = _core_Path__WEBPACK_IMPORTED_MODULE_2__.AbsolutePath.create(this[GLOBAL].resolveSubdirectory(SOURCE_DIR).toString());
            newScope.BINARY_DIR = BINARY_DIR;
            this[GLOBAL].addSubdirectory(newScope);
        },
        addCustomScript(script, params) {
            const newScope = _core_Scope__WEBPACK_IMPORTED_MODULE_8__.ScopeHelper.clone({}, this[SCOPE]);
            _core_Scope__WEBPACK_IMPORTED_MODULE_8__.ScopeHelper.applyVariables(newScope, this);
            return this[GLOBAL].addCustomScript(newScope, script, params);
        },
        target(name) {
            const utarget = this[GLOBAL].getUknownTarget(name);
            return _core_InterfaceTarget__WEBPACK_IMPORTED_MODULE_3__.InterfaceTarget.create(this[SCOPE], utarget);
        },
        script(name) {
            let script = this[GLOBAL].INTERFACE_SCRIPTS[name];
            if (!script) {
                script = _core_InterfaceScript__WEBPACK_IMPORTED_MODULE_4__.InterfaceScript.create(name);
                this[GLOBAL].INTERFACE_SCRIPTS[name] = script;
            }
            return script;
        },
        install(value, params) {
            for (const it of [value].flat(1)) {
                const iter = (it instanceof _core_Target__WEBPACK_IMPORTED_MODULE_6__.BaseTarget) ? this.target(it.NAME) : it;
                const entity = _core_InstallEntity__WEBPACK_IMPORTED_MODULE_5__.InstallEntity.create(this, iter, params);
                this[GLOBAL].addInstallEntry(entity);
            }
        },
        addStaticLibrary(name, ...sources) {
            const target = _core_Target__WEBPACK_IMPORTED_MODULE_6__.StaticLibrary.create(this[SCOPE], name);
            target.addSources(...sources);
            this[GLOBAL].TARGETS.set(name, target);
            return target;
        },
        addObjectLibrary(name, ...sources) {
            const target = _core_Target__WEBPACK_IMPORTED_MODULE_6__.ObjectLibrary.create(this[SCOPE], name);
            target.addSources(...sources);
            this[GLOBAL].TARGETS.set(name, target);
            return target;
        },
        addSharedLibrary(name, ...sources) {
            const target = _core_Target__WEBPACK_IMPORTED_MODULE_6__.SharedLibrary.create(this[SCOPE], name);
            target.addSources(...sources);
            this[GLOBAL].TARGETS.set(name, target);
            return target;
        },
        addExecutable(name, ...sources) {
            const target = _core_Target__WEBPACK_IMPORTED_MODULE_6__.Executable.create(this[SCOPE], name);
            target.addSources(...sources);
            this[GLOBAL].TARGETS.set(name, target);
            return target;
        },
        executeScript(script, options) {
            const scriptPath = this[SCOPE].SOURCE_DIR.resolve(script);
            const module = requireImpl(scriptPath.toString());
            module(scopeValueAsPrimitives(options));
        },
    };
    function create(scope, global) {
        const props = {};
        for (const [key, value] of Object.entries(methods)) {
            props[key] = {
                value,
                enumerable: false,
                writable: false,
                configurable: false,
            };
        }
        const mk = Object.create(scope, props);
        mk[SCOPE] = scope;
        mk[GLOBAL] = global;
        return mk;
    }
    MakeContext.create = create;
})(MakeContext || (MakeContext = {})); // namespace MakeContext


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
/* harmony import */ var _core_FindProgram__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! @/core/FindProgram */ "./src/core/FindProgram.ts");
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
var PluginContext;
(function (PluginContext) {
    ;
    function addSubdirectoryAlias(src, dest) {
        const srcPath = this[SCOPE].SCRIPT_DIR.resolve(src);
        const destPath = this[SCOPE].SCRIPT_DIR.resolve(dest);
        this[GLOBAL].addSubdirectoryAlias(_core_Path__WEBPACK_IMPORTED_MODULE_0__.DirPath.create(srcPath), _core_Path__WEBPACK_IMPORTED_MODULE_0__.DirPath.create(destPath));
    }
    function create(scope, global) {
        const mk = Object.create(scope, {
            findProgram: {
                value: _core_FindProgram__WEBPACK_IMPORTED_MODULE_1__.findProgramSync,
                enumerable: false,
                writable: false,
                configurable: false,
            },
            addSubdirectoryAlias: {
                value: addSubdirectoryAlias,
                enumerable: false,
                writable: false,
                configurable: false,
            },
        });
        mk[SCOPE] = scope;
        mk[GLOBAL] = global;
        return mk;
    }
    PluginContext.create = create;
})(PluginContext || (PluginContext = {})); // namespace PluginContext


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
    function mergeVariables(target, source) {
        if (!target || typeof target !== "object")
            throw new Error(`Target ${target} is not object`);
        if (!source || typeof source !== "object")
            throw new Error(`Source ${source} is not object`);
        for (const [key, val] of Object.entries(source)) {
            if (!Object.hasOwn(target, key)) {
                target[key] = val;
            }
            else if (Array.isArray(target[key])) {
                if (!Array.isArray(val))
                    throw new Error(`Source ${key} has ${val} which is not an array`);
                for (const iter of val)
                    target[key].push(iter);
            }
            else if (target[key] && typeof target[key] === "object") {
                if (!val || typeof val !== "object")
                    throw new Error(`Source ${key} has ${val} which is not an object`);
                mergeVariables(target[key], val);
            }
            else {
                throw new Error(`Source ${key} has ${val} which is not ${typeof target[key]}`);
            }
        }
        return target;
    }
    ScopeHelper.mergeVariables = mergeVariables;
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
const MAP = Symbol("MAP");
const ENTRIES = Symbol("ENTRIES");
class ScriptCollection {
    [MAP];
    [ENTRIES];
    constructor() {
        this[MAP] = {};
        this[ENTRIES] = [];
    }
    static create() {
        return Object.seal(new ScriptCollection);
    }
    get ENTRIES() {
        return this[ENTRIES];
    }
    get(name) {
        return this[MAP][name];
    }
    set(name, target) {
        if (!name)
            throw new Error("Not supported mpty name for CustomScript");
        if (this[MAP][name])
            throw new Error(`Script "${name}" exists`);
        this[MAP][name] = target;
        this[ENTRIES].push(target);
    }
    add(target) {
        this[ENTRIES].push(target);
    }
    toJSON() {
        return this[ENTRIES];
    }
}
;


/***/ }),

/***/ "./src/core/ScriptContext.ts":
/*!***********************************!*\
  !*** ./src/core/ScriptContext.ts ***!
  \***********************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   ScriptContext: () => (/* binding */ ScriptContext)
/* harmony export */ });
/* harmony import */ var _core_FindProgram__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! @/core/FindProgram */ "./src/core/FindProgram.ts");
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
var ScriptContext;
(function (ScriptContext) {
    ;
    function create(scope, global) {
        const mk = Object.create(scope, {
            findProgram: {
                value: _core_FindProgram__WEBPACK_IMPORTED_MODULE_0__.findProgramSync,
                enumerable: false,
                writable: false,
                configurable: false,
            },
        });
        mk[SCOPE] = scope;
        mk[GLOBAL] = global;
        return mk;
    }
    ScriptContext.create = create;
})(ScriptContext || (ScriptContext = {})); // namespace ScriptContext


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
/* harmony import */ var _core_DefinitionHelper__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! @/core/DefinitionHelper */ "./src/core/DefinitionHelper.ts");
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
        for (const iter of (0,_core_DefinitionHelper__WEBPACK_IMPORTED_MODULE_1__.normalizeDefinitions)(...definitions))
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
        value: "",
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
        value: "",
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
        value: "",
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
        value: "",
    },
    RANLIB: {
        description: "Tool used to generate an index to the contents of an archive (static library)",
        value: "",
    },
    LINKER: {
        description: "Path to the linker used to link object files and libraries into executables",
        value: "",
    },
    NM: {
        description: "Path to the tool used to list symbols from object files or archives",
        value: "",
    },
    OBJCOPY: {
        description: "Path to the tool used to copy and translate object files",
        value: "",
    },
    OBJDUMP: {
        description: "Path to the tool used to display information about object files, such as disassembly",
        value: "",
    },
    STRIP: {
        description: "Path to the tool used to remove symbols from object files or executables to reduce size",
        value: "",
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
    },
    MAKE_PLUGIN_LIST: {
        description: "List of paths to plugins",
        value: [],
    },
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
/* harmony import */ var _core_DefinitionHelper__WEBPACK_IMPORTED_MODULE_10__ = __webpack_require__(/*! @/core/DefinitionHelper */ "./src/core/DefinitionHelper.ts");
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
        for (const VALUE of (0,_core_DefinitionHelper__WEBPACK_IMPORTED_MODULE_10__.normalizeDefinitions)(...definitions))
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
    setPositionIndependentCode(value) {
        this[POSITION_INDEPENDENT_CODE] = value;
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
var ToolchainContext;
(function (ToolchainContext) {
    ;
    function create(scope, global) {
        const mk = Object.create(scope, {
            findProgram: {
                value: _core_FindProgram__WEBPACK_IMPORTED_MODULE_0__.findProgramSync,
                enumerable: false,
                writable: false,
                configurable: false,
            },
        });
        mk[SCOPE] = scope;
        mk[GLOBAL] = global;
        return mk;
    }
    ToolchainContext.create = create;
})(ToolchainContext || (ToolchainContext = {})); // namespace ToolchainContext


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
//# sourceMappingURL=data:application/json;charset=utf-8;base64,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LEtBQUssQ0FBQyxRQUFRLEtBQUssa0JBQWtCLENBQUMsQ0FBQztBQUNuRCxDQUFDOzs7Ozs7Ozs7OztBQy9CRDs7Ozs7Ozs7OztBQ0FBOzs7Ozs7Ozs7O0FDQUE7Ozs7Ozs7Ozs7QUNBQTs7Ozs7Ozs7OztBQ0FBOzs7Ozs7Ozs7O0FDQUE7Ozs7Ozs7Ozs7QUNBQTs7Ozs7O1VDQUE7VUFDQTs7VUFFQTtVQUNBO1VBQ0E7VUFDQTtVQUNBO1VBQ0E7VUFDQTtVQUNBO1VBQ0E7VUFDQTtVQUNBO1VBQ0E7VUFDQTs7VUFFQTtVQUNBOztVQUVBO1VBQ0E7VUFDQTs7Ozs7V0N0QkE7V0FDQTtXQUNBO1dBQ0E7V0FDQTtXQUNBLGlDQUFpQyxXQUFXO1dBQzVDO1dBQ0E7Ozs7O1dDUEE7V0FDQTtXQUNBO1dBQ0E7V0FDQSx5Q0FBeUMsd0NBQXdDO1dBQ2pGO1dBQ0E7V0FDQTs7Ozs7V0NQQTs7Ozs7V0NBQTtXQUNBO1dBQ0E7V0FDQSx1REFBdUQsaUJBQWlCO1dBQ3hFO1dBQ0EsZ0RBQWdELGFBQWE7V0FDN0Q7Ozs7Ozs7Ozs7Ozs7Ozs7O0FDTkE7Ozs7Ozs7R0FPRztBQUVILG9DQUFvQztBQUVQO0FBRVc7QUFDRTtBQUUxQyxpRUFBZTtJQUNiLEdBQUc7SUFDSCxRQUFRLEVBQUU7UUFDUixPQUFPLEVBQUUscURBQVk7UUFDckIsSUFBSSxFQUFFLG9EQUFXO1FBQ2pCLEtBQUssRUFBRSxxREFBWTtLQUNwQjtDQUNGLEVBQUMiLCJzb3VyY2VzIjpbIndlYnBhY2s6Ly9iaXRtYWtlL3dlYnBhY2svdW5pdmVyc2FsTW9kdWxlRGVmaW5pdGlvbiIsIndlYnBhY2s6Ly9iaXRtYWtlLy4vc3JjL0J1aWxkSGFuZGxlci50cyIsIndlYnBhY2s6Ly9iaXRtYWtlLy4vc3JjL0NvbnN0YW50cy50cyIsIndlYnBhY2s6Ly9iaXRtYWtlLy4vc3JjL0luaXRIYW5kbGVyLnRzIiwid2VicGFjazovL2JpdG1ha2UvLi9zcmMvTWFrZVNjcmlwdEFjdGlvbi50cyIsIndlYnBhY2s6Ly9iaXRtYWtlLy4vc3JjL1J1blNjcmlwdENvbnRleHQudHMiLCJ3ZWJwYWNrOi8vYml0bWFrZS8uL3NyYy9jbWFrZS9Db25zdGFudHMudHMiLCJ3ZWJwYWNrOi8vYml0bWFrZS8uL3NyYy9jbWFrZS9IZWxwZXIudHMiLCJ3ZWJwYWNrOi8vYml0bWFrZS8uL3NyYy9jbWFrZS9pbmRleC50cyIsIndlYnBhY2s6Ly9iaXRtYWtlLy4vc3JjL2NvcmUvQnVpbGRpblNjcmlwdHMvY29uZmlndXJlX2ZpbGUudHMiLCJ3ZWJwYWNrOi8vYml0bWFrZS8uL3NyYy9jb3JlL0J1aWxkaW5TY3JpcHRzL2luc3RhbGxfc2NyaXB0LnRzIiwid2VicGFjazovL2JpdG1ha2UvLi9zcmMvY29yZS9DdXN0b21TY3JpcHQudHMiLCJ3ZWJwYWNrOi8vYml0bWFrZS8uL3NyYy9jb3JlL0RlZmluaXRpb25IZWxwZXIudHMiLCJ3ZWJwYWNrOi8vYml0bWFrZS8uL3NyYy9jb3JlL0RldGVybWluZUNvbXBpbGVyLnRzIiwid2VicGFjazovL2JpdG1ha2UvLi9zcmMvY29yZS9GaW5kUHJvZ3JhbS50cyIsIndlYnBhY2s6Ly9iaXRtYWtlLy4vc3JjL2NvcmUvR2V0U2l6ZW9mVm9pZHAudHMiLCJ3ZWJwYWNrOi8vYml0bWFrZS8uL3NyYy9jb3JlL0dsb2JhbENvbnRleHQudHMiLCJ3ZWJwYWNrOi8vYml0bWFrZS8uL3NyYy9jb3JlL0dvYWxDb2xsZWN0aW9uLnRzIiwid2VicGFjazovL2JpdG1ha2UvLi9zcmMvY29yZS9JbmNsdWRlRGlyZWN0b3J5LnRzIiwid2VicGFjazovL2JpdG1ha2UvLi9zcmMvY29yZS9JbnN0YWxsRW50aXR5LnRzIiwid2VicGFjazovL2JpdG1ha2UvLi9zcmMvY29yZS9JbnRlcmZhY2VJbmNsdWRlcy50cyIsIndlYnBhY2s6Ly9iaXRtYWtlLy4vc3JjL2NvcmUvSW50ZXJmYWNlT2JqZWN0cy50cyIsIndlYnBhY2s6Ly9iaXRtYWtlLy4vc3JjL2NvcmUvSW50ZXJmYWNlU2NyaXB0LnRzIiwid2VicGFjazovL2JpdG1ha2UvLi9zcmMvY29yZS9JbnRlcmZhY2VUYXJnZXQudHMiLCJ3ZWJwYWNrOi8vYml0bWFrZS8uL3NyYy9jb3JlL01ha2VDb250ZXh0LnRzIiwid2VicGFjazovL2JpdG1ha2UvLi9zcmMvY29yZS9QYXRoLnRzIiwid2VicGFjazovL2JpdG1ha2UvLi9zcmMvY29yZS9QbHVnaW5Db250ZXh0LnRzIiwid2VicGFjazovL2JpdG1ha2UvLi9zcmMvY29yZS9TY29wZS50cyIsIndlYnBhY2s6Ly9iaXRtYWtlLy4vc3JjL2NvcmUvU2NyaXB0Q29sbGVjdGlvbi50cyIsIndlYnBhY2s6Ly9iaXRtYWtlLy4vc3JjL2NvcmUvU2NyaXB0Q29udGV4dC50cyIsIndlYnBhY2s6Ly9iaXRtYWtlLy4vc3JjL2NvcmUvU291cmNlRmlsZS50cyIsIndlYnBhY2s6Ly9iaXRtYWtlLy4vc3JjL2NvcmUvU291cmNlRmlsZUxpc3QudHMiLCJ3ZWJwYWNrOi8vYml0bWFrZS8uL3NyYy9jb3JlL1N5c3RlbVZhcmlhYmxlcy50cyIsIndlYnBhY2s6Ly9iaXRtYWtlLy4vc3JjL2NvcmUvVGFyZ2V0LnRzIiwid2VicGFjazovL2JpdG1ha2UvLi9zcmMvY29yZS9UYXJnZXRDb2xsZWN0aW9uLnRzIiwid2VicGFjazovL2JpdG1ha2UvLi9zcmMvY29yZS9Ub29sY2hhaW5Db250ZXh0LnRzIiwid2VicGFjazovL2JpdG1ha2UvLi9zcmMvY29yZS9UeXBlcy50cyIsIndlYnBhY2s6Ly9iaXRtYWtlLy4vc3JjL2NvcmUvVW5rbm93blRhcmdldC50cyIsIndlYnBhY2s6Ly9iaXRtYWtlLy4vc3JjL2N4eC9pbmRleC50cyIsIndlYnBhY2s6Ly9iaXRtYWtlLy4vc3JjL2xvZ2dlci9pbmRleC50cyIsIndlYnBhY2s6Ly9iaXRtYWtlLy4vc3JjL3V0aWxzL0NoaWxkUHJvY2Vzcy50cyIsIndlYnBhY2s6Ly9iaXRtYWtlLy4vc3JjL3V0aWxzL0ZpbGVTeXN0ZW0udHMiLCJ3ZWJwYWNrOi8vYml0bWFrZS8uL3NyYy91dGlscy9IdHRwUmVxdWVzdC50cyIsIndlYnBhY2s6Ly9iaXRtYWtlLy4vc3JjL3V0aWxzL0ltcG9ydE1vZHVsZS5tanMiLCJ3ZWJwYWNrOi8vYml0bWFrZS8uL3NyYy91dGlscy9NYWtlUGF0Y2gudHMiLCJ3ZWJwYWNrOi8vYml0bWFrZS8uL3NyYy91dGlscy9Nb2R1bGUudHMiLCJ3ZWJwYWNrOi8vYml0bWFrZS8uL3NyYy91dGlscy9QcmltaXRpdmVzLnRzIiwid2VicGFjazovL2JpdG1ha2UvLi9zcmMvdXRpbHMvU2V0dGluZ3NTdG9yYWdlLnRzIiwid2VicGFjazovL2JpdG1ha2UvLi9zcmMvdXRpbHMvU3RyaWN0VHlwZS50cyIsIndlYnBhY2s6Ly9iaXRtYWtlL2V4dGVybmFsIG5vZGUtY29tbW9uanMgXCJodHRwXCIiLCJ3ZWJwYWNrOi8vYml0bWFrZS9leHRlcm5hbCBub2RlLWNvbW1vbmpzIFwiaHR0cHNcIiIsIndlYnBhY2s6Ly9iaXRtYWtlL2V4dGVybmFsIG5vZGUtY29tbW9uanMgXCJub2RlOmNoaWxkX3Byb2Nlc3NcIiIsIndlYnBhY2s6Ly9iaXRtYWtlL2V4dGVybmFsIG5vZGUtY29tbW9uanMgXCJub2RlOmZzXCIiLCJ3ZWJwYWNrOi8vYml0bWFrZS9leHRlcm5hbCBub2RlLWNvbW1vbmpzIFwibm9kZTpvc1wiIiwid2VicGFjazovL2JpdG1ha2UvZXh0ZXJuYWwgbm9kZS1jb21tb25qcyBcIm5vZGU6cGF0aFwiIiwid2VicGFjazovL2JpdG1ha2UvZXh0ZXJuYWwgbm9kZS1jb21tb25qcyBcIm5vZGU6dXJsXCIiLCJ3ZWJwYWNrOi8vYml0bWFrZS93ZWJwYWNrL2Jvb3RzdHJhcCIsIndlYnBhY2s6Ly9iaXRtYWtlL3dlYnBhY2svcnVudGltZS9jb21wYXQgZ2V0IGRlZmF1bHQgZXhwb3J0Iiwid2VicGFjazovL2JpdG1ha2Uvd2VicGFjay9ydW50aW1lL2RlZmluZSBwcm9wZXJ0eSBnZXR0ZXJzIiwid2VicGFjazovL2JpdG1ha2Uvd2VicGFjay9ydW50aW1lL2hhc093blByb3BlcnR5IHNob3J0aGFuZCIsIndlYnBhY2s6Ly9iaXRtYWtlL3dlYnBhY2svcnVudGltZS9tYWtlIG5hbWVzcGFjZSBvYmplY3QiLCJ3ZWJwYWNrOi8vYml0bWFrZS8uL3NyYy9pbmRleC50cyJdLCJzb3VyY2VzQ29udGVudCI6WyIoZnVuY3Rpb24gd2VicGFja1VuaXZlcnNhbE1vZHVsZURlZmluaXRpb24ocm9vdCwgZmFjdG9yeSkge1xuXHRpZih0eXBlb2YgZXhwb3J0cyA9PT0gJ29iamVjdCcgJiYgdHlwZW9mIG1vZHVsZSA9PT0gJ29iamVjdCcpXG5cdFx0bW9kdWxlLmV4cG9ydHMgPSBmYWN0b3J5KCk7XG5cdGVsc2UgaWYodHlwZW9mIGRlZmluZSA9PT0gJ2Z1bmN0aW9uJyAmJiBkZWZpbmUuYW1kKVxuXHRcdGRlZmluZShbXSwgZmFjdG9yeSk7XG5cdGVsc2UgaWYodHlwZW9mIGV4cG9ydHMgPT09ICdvYmplY3QnKVxuXHRcdGV4cG9ydHNbXCJiaXRtYWtlXCJdID0gZmFjdG9yeSgpO1xuXHRlbHNlXG5cdFx0cm9vdFtcImJpdG1ha2VcIl0gPSBmYWN0b3J5KCk7XG59KShnbG9iYWwsICgpID0+IHtcbnJldHVybiAiLCIvKlxuICogTUlUIExpY2Vuc2VcbiAqXG4gKiBDb3B5cmlnaHQgKGMpIDIwMjUgIFl1cmlpIFlha3ViaW4gKHl1cmlpLnlha3ViaW5AZ21haWwuY29tKVxuICpcbiAqIFBlcm1pc3Npb24gaXMgZ3JhbnRlZCB0byB1c2UsIGNvcHksIG1vZGlmeSwgYW5kIGRpc3RyaWJ1dGUgdGhpcyBzb2Z0d2FyZVxuICogdW5kZXIgdGhlIE1JVCBMaWNlbnNlLiBTZWUgTElDRU5TRSBmaWxlIGZvciBkZXRhaWxzLlxuICovXG5cbmltcG9ydCBmcyBmcm9tIFwibm9kZTpmc1wiO1xuaW1wb3J0IHBhdGggZnJvbSBcIm5vZGU6cGF0aFwiO1xuaW1wb3J0IHVybCBmcm9tIFwibm9kZTp1cmxcIjtcblxuaW1wb3J0IGNtYWtlICBmcm9tIFwiQC9jbWFrZVwiO1xuaW1wb3J0IHsgbWFrZVBhdGNoIH0gZnJvbSBcIkAvdXRpbHMvTWFrZVBhdGNoXCI7XG5pbXBvcnQgeyBzYXZlSWZEaWZmZXJlbnQsIGRpcmVjdG9yeUV4aXN0cywgZ2V0UGF0aFN0cmluZyB9IGZyb20gXCJAL3V0aWxzL0ZpbGVTeXN0ZW1cIjtcbmltcG9ydCB7IFNldHRpbmdzU3RvcmFnZSB9IGZyb20gXCJAL3V0aWxzL1NldHRpbmdzU3RvcmFnZVwiO1xuaW1wb3J0IHsgc3Bhd25Bc3luYyB9IGZyb20gXCJAL3V0aWxzL0NoaWxkUHJvY2Vzc1wiO1xuaW1wb3J0IHsgbWFrZVNjcmlwdEFjdGlvbiB9IGZyb20gXCJAL01ha2VTY3JpcHRBY3Rpb25cIjtcbmltcG9ydCB7IGFycmF5V3JhcHBlciwgYXNzaWduT2JqZWN0IH0gZnJvbSBcIkAvdXRpbHMvUHJpbWl0aXZlc1wiO1xuaW1wb3J0IHsgVVNFUl9DT05GSUcsIEJVSUxEX1NFVFRJTkdTX0ZJTEUsIFJFUVVFU1RfQVRURU1QVFMgfSBmcm9tIFwiQC9Db25zdGFudHNcIjtcbmltcG9ydCB7IHJlcXVpcmVSZXNvbHZlIH0gZnJvbSBcIkAvdXRpbHMvTW9kdWxlXCI7XG5pbXBvcnQgeyByZXF1ZXN0R2V0IH0gZnJvbSBcIkAvdXRpbHMvSHR0cFJlcXVlc3RcIjtcbmltcG9ydCB7IFJ1blNjcmlwdENvbnRleHQsIFJ1blNjcmlwdE9wdGlvbnMgfSBmcm9tIFwiQC9SdW5TY3JpcHRDb250ZXh0XCI7XG5pbXBvcnQgeyBjcmVhdGVMb2dnZXIgfSBmcm9tIFwiQC9sb2dnZXJcIjtcblxuaW1wb3J0IHsgZmlsZUV4aXN0cyB9IGZyb20gXCJAL3V0aWxzL0ZpbGVTeXN0ZW1cIjtcbmltcG9ydCB7IGltcG9ydE1vZHVsZSB9IGZyb20gXCJAL3V0aWxzL01vZHVsZVwiO1xuXG5jb25zdCBsb2dnZXIgPSBjcmVhdGVMb2dnZXIoaW1wb3J0Lm1ldGEudXJsKTtcblxuZnVuY3Rpb24gbWVyZ2VFbnZpcm9ubWVudCguLi5hcmdzOiBhbnkpIHtcbiAgY29uc3QgZW52aXJvbm1lbnQ6IGFueSA9IHt9O1xuICBmb3IgKGNvbnN0IGVudiBvZiBhcmdzKSB7XG4gICAgY29uc3QgbGlzdDogYW55ID0gT2JqZWN0LmVudHJpZXMoZW52IHx8IHt9KTtcbiAgICB3aGlsZSAobGlzdC5sZW5ndGgpIHtcbiAgICAgIGxldCBba2V5LHZhbF0gPSBsaXN0LnBvcCgpO1xuICAgICAgbGV0IGRlbGltaXRlcjtcbiAgICAgIGxldCBqb2luQWZ0ZXIgPSB0cnVlO1xuICAgICAgc3dpdGNoIChrZXkpIHtcbiAgICAgIGNhc2UgXCJQQVRIXCI6XG4gICAgICAgIGRlbGltaXRlciA9IHBhdGguZGVsaW1pdGVyO1xuICAgICAgICBqb2luQWZ0ZXIgPSBmYWxzZTtcbiAgICAgICAgYnJlYWs7XG4gICAgICBjYXNlIFwiQ0ZMQUdTXCI6XG4gICAgICBjYXNlIFwiQ1hYRkxBR1NcIjpcbiAgICAgIGNhc2UgXCJMREZMQUdTXCI6XG4gICAgICAgIGRlbGltaXRlciA9IFwiIFwiO1xuICAgICAgICBicmVhaztcbiAgICAgIH1cbiAgICAgIGlmICh0eXBlb2YgdmFsID09PSAnbnVtYmVyJylcbiAgICAgICAgdmFsID0gdmFsLnRvU3RyaW5nKCk7XG4gICAgICBlbHNlIGlmIChBcnJheS5pc0FycmF5KHZhbCkpXG4gICAgICAgIHZhbCA9IHZhbC5qb2luKGRlbGltaXRlcik7XG4gICAgICBpZiAoIWRlbGltaXRlciB8fCAhZW52aXJvbm1lbnRba2V5XSlcbiAgICAgICAgZW52aXJvbm1lbnRba2V5XSA9IHZhbDtcbiAgICAgIGVsc2UgaWYgKGpvaW5BZnRlcilcbiAgICAgICAgZW52aXJvbm1lbnRba2V5XSA9IHZhbCArIGRlbGltaXRlciArIGVudmlyb25tZW50W2tleV07XG4gICAgICBlbHNlXG4gICAgICAgIGVudmlyb25tZW50W2tleV0gPSBlbnZpcm9ubWVudFtrZXldICsgZGVsaW1pdGVyICsgdmFsO1xuICAgIH1cbiAgfVxuICByZXR1cm4gZW52aXJvbm1lbnQ7XG59XG5cbmZ1bmN0aW9uIHJlYmFzZUNvbmZpZyhjb25maWc6IGFueSkge1xuICBjb25zdCBiYXNlQ29uZmlnOiBhbnkgPSB7fTtcbiAgY29uc3Qgb3RoZXJDb25maWc6IGFueSA9IHt9O1xuXG4gIGZvciAoY29uc3QgW2tleSwgZW50cnldIG9mIE9iamVjdC5lbnRyaWVzKGNvbmZpZykgYXMgYW55KSB7XG4gICAgKGVudHJ5LmJhc2UgPyBvdGhlckNvbmZpZyA6IGJhc2VDb25maWcpW2tleV0gPSBlbnRyeTtcbiAgfVxuXG4gIHdoaWxlICh0cnVlKSB7XG4gICAgY29uc3Qga2V5cyA9IE9iamVjdC5rZXlzKG90aGVyQ29uZmlnKTtcbiAgICBpZiAoa2V5cy5sZW5ndGggPT0gMClcbiAgICAgIGJyZWFrO1xuICAgIGNvbnN0IGRvbmVLZXlzID0gW107XG4gICAgZm9yIChjb25zdCBrZXkgb2Yga2V5cykge1xuICAgICAgY29uc3Qgb3RoZXJJdGVyID0gb3RoZXJDb25maWdba2V5XTtcbiAgICAgIGNvbnN0IGJhc2VMaXN0ID0gW107XG4gICAgICBmb3IgKGNvbnN0IGl0ZXIgb2YgYXJyYXlXcmFwcGVyKG90aGVySXRlci5iYXNlKSkge1xuICAgICAgICBjb25zdCBiYXNlRW50cnkgPSBiYXNlQ29uZmlnW2l0ZXJdO1xuICAgICAgICBpZiAoIWJhc2VFbnRyeSkge1xuICAgICAgICAgIGJhc2VMaXN0Lmxlbmd0aCA9IDA7XG4gICAgICAgICAgYnJlYWs7XG4gICAgICAgIH1cbiAgICAgICAgYmFzZUxpc3QucHVzaChiYXNlRW50cnkpO1xuICAgICAgfVxuICAgICAgaWYgKGJhc2VMaXN0Lmxlbmd0aCkge1xuICAgICAgICBiYXNlTGlzdC5wdXNoKG90aGVySXRlcik7XG4gICAgICAgIGxldCBuZXdFbnRyeSA9IHt9O1xuICAgICAgICBmb3IgKGNvbnN0IGl0ZXIgb2YgYmFzZUxpc3QpIHtcbiAgICAgICAgICBhc3NpZ25PYmplY3QobmV3RW50cnksIGl0ZXIpO1xuICAgICAgICB9XG4gICAgICAgIGJhc2VDb25maWdba2V5XSA9IG5ld0VudHJ5O1xuICAgICAgICBkb25lS2V5cy5wdXNoKGtleSk7XG4gICAgICB9XG4gICAgfVxuICAgIGlmIChkb25lS2V5cy5sZW5ndGggPT0gMCkge1xuICAgICAgZm9yIChjb25zdCBrZXkgb2Yga2V5cylcbiAgICAgICAgdGhyb3cgYENhbid0IHNldCBiYXNlIGNvbmZpZyBmb3IgXCIke2tleX1gO1xuICAgIH1cbiAgICBmb3IgKGNvbnN0IGtleSBvZiBkb25lS2V5cykge1xuICAgICAgZGVsZXRlIGJhc2VDb25maWdba2V5XS5iYXNlO1xuICAgICAgZGVsZXRlIG90aGVyQ29uZmlnW2tleV07XG4gICAgfVxuICB9XG5cbiAgcmV0dXJuIGJhc2VDb25maWc7XG59XG5cbmZ1bmN0aW9uIHJlc29sdmVTdHJpbmdXaXRoVmFyaWFibGUoY29uZmlnOiBhbnksIGVudHJ5Q29uZmlnOiBhbnksIHJvb3RDb25maWc6IGFueSwgdmFsOiBhbnkpIHtcbiAgcmV0dXJuIHZhbC5yZXBsYWNlKC9cXCRcXHsoW159XSspXFx9L2csIChtYXRjaDogYW55LCB2YWx1ZTogYW55KSA9PiB7XG4gICAgbGV0IHNlbDtcbiAgICBmb3IgKGNvbnN0IG5hbWUgb2YgdmFsdWUuc3BsaXQoXCIuXCIpKSB7XG4gICAgICBpZiAoc2VsID09PSB1bmRlZmluZWQpIHtcbiAgICAgICAgaWYgKGNvbmZpZy5oYXNPd25Qcm9wZXJ0eShuYW1lKSkge1xuICAgICAgICAgIHNlbCA9IGNvbmZpZ1tuYW1lXTtcbiAgICAgICAgfVxuICAgICAgICBlbHNlIGlmIChjb25maWcgIT09IGVudHJ5Q29uZmlnICYmIGVudHJ5Q29uZmlnLmhhc093blByb3BlcnR5KG5hbWUpKSB7XG4gICAgICAgICAgc2VsID0gZW50cnlDb25maWdbbmFtZV07XG4gICAgICAgIH1cbiAgICAgICAgZWxzZSBpZiAoY29uZmlnICE9PSByb290Q29uZmlnICYmIHJvb3RDb25maWcuaGFzT3duUHJvcGVydHkobmFtZSkpIHtcbiAgICAgICAgICBzZWwgPSByb290Q29uZmlnW25hbWVdO1xuICAgICAgICB9XG4gICAgICAgIGVsc2Uge1xuICAgICAgICAgIHRyeSB7XG4gICAgICAgICAgICBjb25zdCBtYWluRmlsZSA9IHJlcXVpcmVSZXNvbHZlKG5hbWUpO1xuICAgICAgICAgICAgaWYgKG1haW5GaWxlKSB7XG4gICAgICAgICAgICAgIHNlbCA9IHsgbWFpbkZpbGUsIG1haW5EaXI6IHBhdGgucG9zaXguZGlybmFtZShtYWluRmlsZSksIH07XG4gICAgICAgICAgICB9XG4gICAgICAgICAgfSBjYXRjaChlKSB7fVxuICAgICAgICB9XG4gICAgICAgIGlmIChzZWwgPT09IHVuZGVmaW5lZClcbiAgICAgICAgICBicmVhaztcbiAgICAgIH1cbiAgICAgIGVsc2UgaWYgKHNlbC5oYXNPd25Qcm9wZXJ0eShuYW1lKSkge1xuICAgICAgICBzZWwgPSBzZWxbbmFtZV07XG4gICAgICB9XG4gICAgICBlbHNlIHtcbiAgICAgICAgc2VsID0gdW5kZWZpbmVkO1xuICAgICAgICBicmVhaztcbiAgICAgIH1cbiAgICB9XG4gICAgaWYgKHNlbCA9PT0gdW5kZWZpbmVkKVxuICAgICAgdGhyb3cgbmV3IEVycm9yKGBUaGUgJHt2YWx1ZX0gdmFyaWFibGUgZG9lcyBub3QgZXhpc3RcImApO1xuICAgIHJldHVybiBzZWw7XG4gIH0pO1xufVxuXG5mdW5jdGlvbiByZXNvbHZlQ29uZmlnU3RyaW5nc0ltcGwoY29uZmlnOiBhbnksIGVudHJ5Q29uZmlnOiBhbnksIHJvb3RDb25maWc6IGFueSkge1xuICBsZXQgY291bnQgPSAwO1xuICBmb3IgKGNvbnN0IFtrZXksIHZhbF0gb2YgT2JqZWN0LmVudHJpZXMoY29uZmlnKSkge1xuICAgIGlmICh2YWwgJiYgdHlwZW9mIHZhbCA9PT0gXCJvYmplY3RcIilcbiAgICAgIGNvdW50ICs9IHJlc29sdmVDb25maWdTdHJpbmdzSW1wbCh2YWwsIGVudHJ5Q29uZmlnLCByb290Q29uZmlnKTtcbiAgICBlbHNlIGlmICh0eXBlb2YgdmFsID09PSBcInN0cmluZ1wiKSB7XG4gICAgICBjb25zdCB2ID0gcmVzb2x2ZVN0cmluZ1dpdGhWYXJpYWJsZShjb25maWcsIGVudHJ5Q29uZmlnLCByb290Q29uZmlnLCB2YWwpO1xuICAgICAgaWYgKHZhbCAhPT0gdikge1xuICAgICAgICBjb25maWdba2V5XSA9IHY7XG4gICAgICAgIGNvdW50Kys7XG4gICAgICB9XG4gICAgfVxuICB9XG4gIHJldHVybiBjb3VudDtcbn1cblxuZnVuY3Rpb24gcmVzb2x2ZUNvbmZpZ1N0cmluZ3MoY29uZmlnOiBhbnkpIHtcbiAgZm9yICg7Oykge1xuICAgIGxldCBjb3VudCA9IDA7XG4gICAgZm9yIChjb25zdCBba2V5LCB2YWxdIG9mIE9iamVjdC5lbnRyaWVzKGNvbmZpZykpIHtcbiAgICAgIGlmICh2YWwgJiYgdHlwZW9mIHZhbCA9PT0gXCJvYmplY3RcIilcbiAgICAgICAgY291bnQgKz0gcmVzb2x2ZUNvbmZpZ1N0cmluZ3NJbXBsKHZhbCwgdmFsLCBjb25maWcpO1xuICAgICAgZWxzZSAgaWYgKHR5cGVvZiB2YWwgPT09IFwic3RyaW5nXCIpIHtcbiAgICAgICAgY29uc3QgdiA9IHJlc29sdmVTdHJpbmdXaXRoVmFyaWFibGUoY29uZmlnLCBjb25maWcsIGNvbmZpZywgdmFsKTtcbiAgICAgICAgaWYgKHZhbCAhPT0gdikge1xuICAgICAgICAgIGNvbmZpZ1trZXldID0gdjtcbiAgICAgICAgICBjb3VudCsrO1xuICAgICAgICB9XG4gICAgICB9XG4gICAgfVxuICAgIGlmICghY291bnQpXG4gICAgICBicmVhaztcbiAgfVxufVxuXG5mdW5jdGlvbiBtYWtlQnVpbGRDb25maWcoY3R4OiBhbnksIGNvbmZpZzogYW55KSB7XG4gIGZvciAoY29uc3Qga2V5IG9mIFsgXCJzb3VyY2VSb290XCIsIFwid2FzbXV4RGlyXCIgXSkge1xuICAgIGlmIChjb25maWdba2V5XSkge1xuICAgICAgdGhyb3cgbmV3IEVycm9yKGBUaGUgJHtrZXl9IHZhcmlhYmxlIGNhbm5vdCBiZSBjaGFuZ2VkIHRvIFwiJHtjb25maWcuc291cmNlUm9vdH1cImApO1xuICAgIH1cbiAgfVxuXG4gIGNvbnN0IHJvb3RDb25maWcgPSByZWJhc2VDb25maWcoY29uZmlnKTtcblxuICByb290Q29uZmlnLmJ1aWxkVHlwZSA9IHJvb3RDb25maWcuYnVpbGRUeXBlIHx8IGN0eC5idWlsZFR5cGU7XG4gIHJvb3RDb25maWcuc291cmNlUm9vdCA9IHJvb3RDb25maWcuc291cmNlUm9vdCB8fCBjdHgud29ya0RpcjtcbiAgcm9vdENvbmZpZy5iaW5hcnlSb290ID0gcm9vdENvbmZpZy5iaW5hcnlSb290IHx8IHBhdGgucG9zaXgucmVzb2x2ZShjdHgud29ya0RpcixcImJ1aWxkXCIpO1xuXG4gIGZvciAoY29uc3QgW2tleSwgZW50cnldIG9mIE9iamVjdC5lbnRyaWVzKHJvb3RDb25maWcpIGFzIGFueSkge1xuICAgIGlmIChlbnRyeSAmJiB0eXBlb2YgZW50cnkgPT09IFwib2JqZWN0XCIgJiYgZW50cnkuYWN0aW9uKSB7XG4gICAgICBlbnRyeS5idWlsZFR5cGUgPSBlbnRyeS5idWlsZFR5cGUgfHwgcm9vdENvbmZpZy5idWlsZFR5cGU7XG4gICAgICBjb25zdCBmb2xkZXIgPSBrZXkucmVwbGFjZShcIjpcIiwgcGF0aC5wb3NpeC5zZXApO1xuICAgICAgY29uc3Qgd29ya0RpciA9IHBhdGgucG9zaXguam9pbihyb290Q29uZmlnLmJpbmFyeVJvb3QsIGZvbGRlcik7XG4gICAgICBlbnRyeS50ZW1wRGlyID0gZW50cnkudGVtcERpciB8fCBwYXRoLnBvc2l4LmpvaW4od29ya0RpciwgXCJ0bXBcIik7XG4gICAgICBpZiAoZW50cnkuc291cmNlVXJsKSB7XG4gICAgICAgIGVudHJ5LmFyY2hpdmVEaXIgPSBlbnRyeS5hcmNoaXZlRGlyIHx8IHBhdGgucG9zaXguam9pbih3b3JrRGlyLCBcImFyY1wiKTtcbiAgICAgICAgZW50cnkuZXh0cmFjdERpciA9IGVudHJ5LmV4dHJhY3REaXIgfHwgcGF0aC5wb3NpeC5qb2luKHdvcmtEaXIsIFwic3JjXCIpO1xuICAgICAgICBpZiAoIWVudHJ5LnNvdXJjZURpcilcbiAgICAgICAgICBlbnRyeS5zb3VyY2VEaXIgPSBlbnRyeS5leHRyYWN0RGlyO1xuICAgICAgICBlbHNlIGlmICghcGF0aC5pc0Fic29sdXRlKGVudHJ5LnNvdXJjZURpcikpXG4gICAgICAgICAgZW50cnkuc291cmNlRGlyID0gcGF0aC5wb3NpeC5qb2luKGVudHJ5LmV4dHJhY3REaXIsIGVudHJ5LnNvdXJjZURpcik7XG4gICAgICB9XG4gICAgICBlbHNlIGlmICghZW50cnkuc291cmNlRGlyKSB7XG4gICAgICAgIHRocm93IG5ldyBFcnJvcihgTWlzc2luZyBzb3VyY2VEaXIgZm9yICR7a2V5fSBhY3Rpb25cImApO1xuICAgICAgfVxuICAgICAgaWYgKGVudHJ5LmJpbmFyeURpciA9PT0gbnVsbClcbiAgICAgICAgZW50cnkuYmluYXJ5RGlyID0gZW50cnkuc291cmNlRGlyO1xuICAgICAgZWxzZSBpZiAoZW50cnkuYmluYXJ5RGlyID09PSB1bmRlZmluZWQpXG4gICAgICAgIGVudHJ5LmJpbmFyeURpciA9IHBhdGgucG9zaXguam9pbih3b3JrRGlyLCBcImJpblwiKTtcbiAgICB9XG4gIH1cblxuICByZXNvbHZlQ29uZmlnU3RyaW5ncyhyb290Q29uZmlnKTtcblxuICByZXR1cm4gcm9vdENvbmZpZztcbn1cblxuYXN5bmMgZnVuY3Rpb24gdHJ5UmVxdWVzdEdldChzb3VyY2VVcmw6IHN0cmluZywgYXJjRmlsZTogc3RyaW5nLCBhdHRlbXB0czogbnVtYmVyKSB7XG4gIGZvcig7Oykge1xuICAgIHRyeSB7XG4gICAgICBjb25zdCBidWZmZXIgPSBhd2FpdCByZXF1ZXN0R2V0KHNvdXJjZVVybCk7XG4gICAgICBhd2FpdCBmcy5wcm9taXNlcy53cml0ZUZpbGUoYXJjRmlsZSwgYnVmZmVyKTtcbiAgICAgIHJldHVybjtcbiAgICB9XG4gICAgY2F0Y2ggKGUpIHtcbiAgICAgIGlmICgtLWF0dGVtcHRzIDwgMCkge1xuICAgICAgICB0aHJvdyBlO1xuICAgICAgfVxuICAgICAgY29uc29sZS53YXJuKGUpO1xuICAgIH1cbiAgfVxufVxuXG5hc3luYyBmdW5jdGlvbiBkb0V4dHJhY3RBcmNoaXZlKGN0eDogUnVuU2NyaXB0Q29udGV4dCwgZW52aXJvbm1lbnQ6IGFueSwgY29uZmlnOiBhbnksIHNldHRpbmdzOiBhbnkpXG57XG4gIGlmICghY29uZmlnLnNvdXJjZVVybClcbiAgICB0aHJvdyBuZXcgRXJyb3IoXCJVbmtub3duIHNvdXJjZVVybFwiKTtcbiAgaWYgKCFjb25maWcuYXJjaGl2ZURpcilcbiAgICB0aHJvdyBuZXcgRXJyb3IoXCJVbmtub3duIGFyY2hpdmVEaXJcIik7XG4gIGlmICghY29uZmlnLmV4dHJhY3REaXIpXG4gICAgdGhyb3cgbmV3IEVycm9yKFwiVW5rbm93biBleHRyYWN0RGlyXCIpO1xuXG4gIGlmICghYXdhaXQgZGlyZWN0b3J5RXhpc3RzKGNvbmZpZy5hcmNoaXZlRGlyKSkge1xuICAgIGNvbnNvbGUubG9nKGBta2RpciAtcCAke2NvbmZpZy5hcmNoaXZlRGlyfWApO1xuICAgIGF3YWl0IGZzLnByb21pc2VzLm1rZGlyKGNvbmZpZy5hcmNoaXZlRGlyLCB7IHJlY3Vyc2l2ZTogdHJ1ZSB9KTtcbiAgfVxuXG4gIGlmICghYXdhaXQgZGlyZWN0b3J5RXhpc3RzKGNvbmZpZy50ZW1wRGlyKSkge1xuICAgIGNvbnNvbGUubG9nKGBta2RpciAtcCAke2NvbmZpZy50ZW1wRGlyfWApO1xuICAgIGF3YWl0IGZzLnByb21pc2VzLm1rZGlyKGNvbmZpZy50ZW1wRGlyLCB7IHJlY3Vyc2l2ZTogdHJ1ZSB9KTtcbiAgfVxuXG4gIGNvbnN0IGFyY05hbWUgPSBwYXRoLmJhc2VuYW1lKGNvbmZpZy5zb3VyY2VVcmwpO1xuXG4gIGxldCBhcmNGaWxlO1xuICBsZXQgZG93bmxvYWRVcmxzID0gYXdhaXQgc2V0dGluZ3MuZ2V0KFwiZG93bmxvYWRVcmxzXCIpIHx8IHt9O1xuICBpZiAoZG93bmxvYWRVcmxzW2NvbmZpZy5zb3VyY2VVcmxdKVxuICAgIGFyY0ZpbGUgPSBkb3dubG9hZFVybHNbY29uZmlnLnNvdXJjZVVybF07XG4gIGVsc2Uge1xuICAgIGFyY0ZpbGUgPSBwYXRoLmpvaW4oY29uZmlnLmFyY2hpdmVEaXIsIGFyY05hbWUpO1xuICAgIGF3YWl0IHRyeVJlcXVlc3RHZXQoY29uZmlnLnNvdXJjZVVybCwgYXJjRmlsZSwgUkVRVUVTVF9BVFRFTVBUUyk7XG4gICAgZG93bmxvYWRVcmxzW2NvbmZpZy5zb3VyY2VVcmxdID0gYXJjRmlsZTtcbiAgICBhd2FpdCBzZXR0aW5ncy5zZXQoXCJkb3dubG9hZFVybHNcIiwgZG93bmxvYWRVcmxzKTtcbiAgfVxuXG4gIGxldCBleHRyYWN0RGlyO1xuICBsZXQgZXh0cmFjdEZpbGVzID0gYXdhaXQgc2V0dGluZ3MuZ2V0KFwiZXh0cmFjdEZpbGVzXCIpIHx8IHt9O1xuICBpZiAoZXh0cmFjdEZpbGVzW2FyY0ZpbGVdKSB7XG4gICAgZXh0cmFjdERpciA9IGV4dHJhY3RGaWxlc1thcmNGaWxlXTtcbiAgfVxuICBlbHNlIHtcbiAgICBleHRyYWN0RGlyID0gYXdhaXQgZnMucHJvbWlzZXMubWtkdGVtcChwYXRoLnJlc29sdmUoY29uZmlnLnRlbXBEaXIsIGFyY05hbWUgKyAnLicpKTtcbiAgXG4gICAgYXdhaXQgY21ha2UuZXh0cmFjdCh7XG4gICAgICBlbnZpcm9ubWVudCxcbiAgICAgIGZpbGVuYW1lOiBhcmNGaWxlLFxuICAgICAgd29ya0RpcjogZXh0cmFjdERpcixcbiAgICAgIGxvZ0ZpbGU6ICBwYXRoLmpvaW4oY29uZmlnLnRlbXBEaXIsIHBhdGguYmFzZW5hbWUoZXh0cmFjdERpcikgKyBcIi5sb2dcIiksXG4gICAgfSk7XG4gIFxuICAgIGNvbnN0IGV4dHJhY3RMaXN0ID0gYXdhaXQgZnMucHJvbWlzZXMucmVhZGRpcihleHRyYWN0RGlyKTtcbiAgICBpZiAoZXh0cmFjdExpc3QubGVuZ3RoID09PSAxKSB7XG4gICAgICBleHRyYWN0RGlyID0gcGF0aC5yZXNvbHZlKGV4dHJhY3REaXIsIGV4dHJhY3RMaXN0WzBdKTtcbiAgICAgIGlmICghYXdhaXQgZGlyZWN0b3J5RXhpc3RzKGV4dHJhY3REaXIpKSB7XG4gICAgICAgIGNvbnNvbGUubG9nKGBybSAtZnIgJHtleHRyYWN0RGlyfWApO1xuICAgICAgICBhd2FpdCBmcy5wcm9taXNlcy5ybShleHRyYWN0RGlyLCB7IHJlY3Vyc2l2ZTogdHJ1ZSB9KTtcbiAgICAgICAgdGhyb3cgbmV3IEVycm9yKGBTdXBwb3J0IG9ubHkgZGlyZWN0b3J5IGZvciBhcmNoaXZlYCk7XG4gICAgICB9XG4gICAgfVxuICBcbiAgICBpZiAoYXdhaXQgZGlyZWN0b3J5RXhpc3RzKGNvbmZpZy5leHRyYWN0RGlyKSkge1xuICAgICAgLy8gVE9ETzogTWFyZ2UgZXh0cmFjdERpciB3aXRoIG91dHB1dFxuICAgICAgY29uc29sZS5sb2coYHJtIC1mciAke2NvbmZpZy5leHRyYWN0RGlyfWApO1xuICAgICAgYXdhaXQgZnMucHJvbWlzZXMucm0oY29uZmlnLmV4dHJhY3REaXIsIHsgcmVjdXJzaXZlOiB0cnVlIH0pO1xuICAgIH1cbiAgICBlbHNlIHtcbiAgICAgIGNvbnN0IHBhcmVudERpciA9IHBhdGguZGlybmFtZShjb25maWcuZXh0cmFjdERpcik7XG4gICAgICBpZiAoIWF3YWl0IGRpcmVjdG9yeUV4aXN0cyhwYXJlbnREaXIpKSB7XG4gICAgICAgIGNvbnNvbGUubG9nKGBta2RpciAtcCAke3BhcmVudERpcn1gKTtcbiAgICAgICAgYXdhaXQgZnMucHJvbWlzZXMubWtkaXIocGFyZW50RGlyLCB7IHJlY3Vyc2l2ZTogdHJ1ZSB9KTsgXG4gICAgICB9XG4gICAgfVxuICBcbiAgICBjb25zb2xlLmxvZyhgbXYgJHtleHRyYWN0RGlyfSAke2NvbmZpZy5leHRyYWN0RGlyfWApO1xuICAgIGF3YWl0IGZzLnByb21pc2VzLnJlbmFtZShleHRyYWN0RGlyLCBjb25maWcuZXh0cmFjdERpcik7XG4gIFxuICAgIGV4dHJhY3RGaWxlc1thcmNGaWxlXSA9IGV4dHJhY3REaXI7XG4gICAgYXdhaXQgc2V0dGluZ3Muc2V0KFwiZXh0cmFjdEZpbGVzXCIsIGV4dHJhY3RGaWxlcyk7XG4gIH1cblxuICBpZiAoY29uZmlnLnBhdGNoRGlyKSB7XG4gICAgbGV0IHBhdGNoRGlycyA9IGF3YWl0IHNldHRpbmdzLmdldChcInBhdGNoRGlyc1wiKSB8fCB7fTtcbiAgICBpZiAoIXBhdGNoRGlyc1tjb25maWcucGF0Y2hEaXJdKSB7XG4gICAgICBhd2FpdCBtYWtlUGF0Y2goY29uZmlnLnBhdGNoRGlyLCBjb25maWcuZXh0cmFjdERpcik7XG4gICAgICBwYXRjaERpcnNbY29uZmlnLnBhdGNoRGlyXSA9IGNvbmZpZy5leHRyYWN0RGlyO1xuICAgICAgYXdhaXQgc2V0dGluZ3Muc2V0KFwicGF0Y2hEaXJzXCIsIHBhdGNoRGlycyk7XG4gICAgfVxuICB9XG59XG5cbmNvbnN0IGFjdGlvbkhhbmRsZXJzOiBhbnkgPSB7XG4gIG5vbmU6IGFzeW5jIChjb25maWc6IGFueSwgZW52aXJvbm1lbnQ6IGFueSwgc2V0dGluZ3M6IGFueSkgPT4ge1xuICAgIC8qIGRvIG5vdGhpbmcgKi9cbiAgfSxcbiAgY21ha2U6IGFzeW5jIChjb25maWc6IGFueSwgZW52aXJvbm1lbnQ6IGFueSwgc2V0dGluZ3M6IGFueSkgPT4ge1xuICAgIGNvbnN0IHNvdXJjZURpciA9IGdldFBhdGhTdHJpbmcoY29uZmlnLnNvdXJjZURpcik7XG4gICAgY29uc3QgYmluYXJ5RGlyID0gZ2V0UGF0aFN0cmluZyhjb25maWcuYmluYXJ5RGlyKTtcbiAgICBjb25zdCBjbWFrZUFyZ3MgPSB7XG4gICAgICBlbnZpcm9ubWVudDoge1xuICAgICAgICAuLi5lbnZpcm9ubWVudCxcbiAgICAgICAgREVTVERJUjogY29uZmlnLmRlc3REaXIsXG4gICAgICB9LFxuICAgICAgZ2VuZXJhdG9yOiBjb25maWcuZ2VuZXJhdG9yIHx8IGNtYWtlLkRFRkFVTFRfR0VORVJBVE9SLFxuICAgICAgY2FjaGVWYXJpYWJsZXM6IGNvbmZpZy5jYWNoZVZhcmlhYmxlcyxcbiAgICAgIHNvdXJjZURpcixcbiAgICAgIGJpbmFyeURpcixcbiAgICB9O1xuXG4gICAgaWYgKCFjbWFrZUFyZ3MuY2FjaGVWYXJpYWJsZXMuQ01BS0VfQlVJTERfVFlQRSkge1xuICAgICAgY21ha2VBcmdzLmNhY2hlVmFyaWFibGVzLkNNQUtFX0JVSUxEX1RZUEUgPSBjb25maWcuYnVpbGRUeXBlO1xuICAgIH1cblxuICAgIGF3YWl0IGNtYWtlLmNvbmZpZ3VyZShjbWFrZUFyZ3MpO1xuICAgIGF3YWl0IGNtYWtlLmJ1aWxkKGNtYWtlQXJncyk7XG4gICAgYXdhaXQgY21ha2UuaW5zdGFsbChjbWFrZUFyZ3MpO1xuICB9LFxuICBjb25maWd1cmU6IGFzeW5jIChjb25maWc6IGFueSwgZW52aXJvbm1lbnQ6IGFueSwgc2V0dGluZ3M6IGFueSkgPT4ge1xuICAgIGNvbnN0IHNvdXJjZURpciA9IGdldFBhdGhTdHJpbmcoY29uZmlnLnNvdXJjZURpcik7XG4gICAgY29uc3QgYmluYXJ5RGlyID0gZ2V0UGF0aFN0cmluZyhjb25maWcuYmluYXJ5RGlyKTtcbiAgICBsZXQgc3RlcCA9IGF3YWl0IHNldHRpbmdzLmdldChcImNvbmZpZ3VyZVwiKSB8fCBcImNvbmZpZ1wiO1xuICAgIGlmIChzdGVwID09PSBcImNvbmZpZ1wiKSB7XG4gICAgICBjb25zdCBjb21tYW5kID0gcGF0aC5yZXNvbHZlKHNvdXJjZURpciwgXCJjb25maWd1cmVcIik7XG4gICAgICBjb25zdCBwYXJhbXMgPSBbXTtcbiAgICAgIGlmIChBcnJheS5pc0FycmF5KGNvbmZpZy52YXJpYWJsZXMpKSB7XG4gICAgICAgIGZvciAoY29uc3QgaXRlciBvZiBjb25maWcudmFyaWFibGVzKVxuICAgICAgICAgIHBhcmFtcy5wdXNoKGl0ZXIpO1xuICAgICAgfVxuICAgICAgZWxzZSBpZiAoY29uZmlnLnZhcmlhYmxlcykge1xuICAgICAgICBmb3IgKGNvbnN0IFtrZXksdmFsXSBvZiBPYmplY3QuZW50cmllcyhjb25maWcudmFyaWFibGVzKSkge1xuICAgICAgICAgIGlmIChrZXkgPT09IFwiZmVhdHVyZXNcIiAmJiBBcnJheS5pc0FycmF5KHZhbCkpIHtcbiAgICAgICAgICAgIGZvciAoY29uc3QgaXRlciBvZiB2YWwpXG4gICAgICAgICAgICAgIHBhcmFtcy5wdXNoKGAtLSR7aXRlcn1gKTtcbiAgICAgICAgICB9XG4gICAgICAgICAgZWxzZSBpZiAodmFsID09PSBudWxsKVxuICAgICAgICAgICAgcGFyYW1zLnB1c2goYC0tJHtrZXl9YCk7XG4gICAgICAgICAgZWxzZVxuICAgICAgICAgICAgcGFyYW1zLnB1c2goYC0tJHtrZXl9PSR7dmFsfWApO1xuICAgICAgICB9XG4gICAgICB9XG4gICAgICBpZiAoY29uZmlnLmZlYXR1cmVzKSB7XG4gICAgICAgIGZvciAoY29uc3Qga2V5IG9mIGNvbmZpZy5mZWF0dXJlcylcbiAgICAgICAgICBwYXJhbXMucHVzaChgLS0ke2tleX1gKTtcbiAgICAgIH1cbiAgICAgIGNvbnN0IHJlczEgPSBhd2FpdCBzcGF3bkFzeW5jKGNvbW1hbmQsIHBhcmFtcywge1xuICAgICAgICBjd2Q6IGJpbmFyeURpcixcbiAgICAgICAgZW52OiBlbnZpcm9ubWVudCxcbiAgICAgICAgZXh0cmE6IHtcbiAgICAgICAgICBvdXRwdXQ6IGBhYy5jb25maWcubG9nYCxcbiAgICAgICAgfSxcbiAgICAgIH0pO1xuICAgICAgaWYgKHJlczEuc3RhdHVzICE9PSAwKSB7XG4gICAgICAgIHRocm93IG5ldyBFcnJvcihgY29uZmlndXJlIHJldHVybmVkIHN0YXR1cyAke3JlczEuc3RhdHVzfWApO1xuICAgICAgfVxuICAgICAgc3RlcCA9IFwiaW5zdGFsbFwiO1xuICAgICAgYXdhaXQgc2V0dGluZ3Muc2V0KFwiY29uZmlndXJlXCIsIHN0ZXApO1xuICAgIH1cbiAgICBpZiAoc3RlcCA9PT0gXCJpbnN0YWxsXCIpIHtcbiAgICAgIGNvbnN0IGFyZ3MgPSBbICdpbnN0YWxsJyBdO1xuICAgICAgaWYgKGNvbmZpZy5kZXN0RGlyKSB7XG4gICAgICAgIGFyZ3MucHVzaChgREVTVERJUj0ke2NvbmZpZy5kZXN0RGlyfWApO1xuICAgICAgfVxuICAgICAgY29uc3QgcmVzMiA9IGF3YWl0IHNwYXduQXN5bmMoXCJtYWtlXCIsIGFyZ3MsIHtcbiAgICAgICAgY3dkOiBiaW5hcnlEaXIsXG4gICAgICAgIGVudjogZW52aXJvbm1lbnQsXG4gICAgICAgIGV4dHJhOiB7XG4gICAgICAgICAgb3V0cHV0OiBgYWMuYnVpbGQubG9nYCxcbiAgICAgICAgfSxcbiAgICAgIH0pO1xuICAgICAgaWYgKHJlczIuc3RhdHVzICE9PSAwKSB7XG4gICAgICAgIHRocm93IG5ldyBFcnJvcihgbWFrZSByZXR1cm5lZCBzdGF0dXMgJHtyZXMyLnN0YXR1c31gKTtcbiAgICAgIH1cbiAgICAgIHN0ZXAgPSBcImRvbmVcIjtcbiAgICAgIGF3YWl0IHNldHRpbmdzLnNldChcImNvbmZpZ3VyZVwiLCBzdGVwKTtcbiAgICB9XG4gIH0sXG4gIG1ha2U6IGFzeW5jIChjb25maWc6IGFueSwgZW52aXJvbm1lbnQ6IGFueSwgc2V0dGluZ3M6IGFueSkgPT4ge1xuICAgIGNvbnN0IGJpbmFyeURpciA9IGdldFBhdGhTdHJpbmcoY29uZmlnLmJpbmFyeURpcik7XG4gICAgY29uc3QgYXJncyA9IGNvbmZpZy5hcmdzIHx8IFtdO1xuICAgIGlmIChjb25maWcuZGVzdERpcikge1xuICAgICAgYXJncy5wdXNoKGBERVNURElSPSR7Y29uZmlnLmRlc3REaXJ9YCk7XG4gICAgfVxuICAgIGNvbnN0IHJlczIgPSBhd2FpdCBzcGF3bkFzeW5jKFwibWFrZVwiLCBhcmdzLCB7XG4gICAgICBjd2Q6IGJpbmFyeURpcixcbiAgICAgIGVudjogZW52aXJvbm1lbnQsXG4gICAgICBleHRyYToge1xuICAgICAgICBvdXRwdXQ6IGBtYWtlLmxvZ2AsXG4gICAgICB9LFxuICAgIH0pO1xuICAgIGlmIChyZXMyLnN0YXR1cyAhPT0gMCkge1xuICAgICAgdGhyb3cgbmV3IEVycm9yKGBtYWtlIHJldHVybmVkIHN0YXR1cyAke3JlczIuc3RhdHVzfWApO1xuICAgIH1cbiAgfSxcbiAgcHJvY2VzczogYXN5bmMgKGNvbmZpZzogYW55LCBlbnZpcm9ubWVudDogYW55LCBzZXR0aW5nczogYW55KSA9PiB7XG4gICAgaWYgKCFjb25maWcuY29tbWFuZClcbiAgICAgIHRocm93IG5ldyBFcnJvcihcIlJlcXVpcmVkIGNvbW1hbmQgZmllbGQgZm9yIHByb2Nlc3MgYWN0aW9uXCIpO1xuICAgIGNvbnN0IHNvdXJjZURpciA9IGdldFBhdGhTdHJpbmcoY29uZmlnLnNvdXJjZURpcik7XG4gICAgY29uc3QgYmluYXJ5RGlyID0gZ2V0UGF0aFN0cmluZyhjb25maWcuYmluYXJ5RGlyKTtcbiAgICBsZXQgeyBjb21tYW5kIH0gPSBjb25maWc7XG4gICAgaWYgKCFwYXRoLmlzQWJzb2x1dGUoY29tbWFuZCkgJiYgKGNvbW1hbmQuaW5jbHVkZXMocGF0aC5wb3NpeC5kZWxpbWl0ZXIpIHx8IGNvbW1hbmQuaW5jbHVkZXMocGF0aC53aW4zMi5kZWxpbWl0ZXIpKSkge1xuICAgICAgY29tbWFuZCA9IHBhdGgucmVzb2x2ZShzb3VyY2VEaXIsIGNvbW1hbmQpO1xuICAgIH1cbiAgICBjb25zdCByZXMgPSBhd2FpdCBzcGF3bkFzeW5jKGNvbW1hbmQsIGNvbmZpZy5hcmdzIHx8IFtdLCB7XG4gICAgICBjd2Q6IGJpbmFyeURpcixcbiAgICAgIGVudjogZW52aXJvbm1lbnQsXG4gICAgICBleHRyYToge1xuICAgICAgICBvdXRwdXQ6IGBwcm9jZXNzLmxvZ2AsXG4gICAgICB9LFxuICAgIH0pO1xuICAgIGlmIChyZXMuc3RhdHVzICE9PSAwKSB7XG4gICAgICB0aHJvdyBuZXcgRXJyb3IoYHByb2Nlc3MgcmV0dXJuZWQgc3RhdHVzICR7cmVzLnN0YXR1c31gKTtcbiAgICB9XG4gIH0sXG4gIGJpdG1ha2U6IG1ha2VTY3JpcHRBY3Rpb24sXG59O1xuXG5hc3luYyBmdW5jdGlvbiBkb1RhcmdldEJ1aWxkKGN0eDogUnVuU2NyaXB0Q29udGV4dCwgZW52aXJvbm1lbnQ6IGFueSwgY29uZmlnOiBhbnksIHNldHRpbmdzOiBhbnkpIHtcbiAgaWYgKGNvbmZpZy5wcmVBY3Rpb24pIHtcbiAgICBhd2FpdCBzZXR0aW5ncy5wdXNoKFwicHJlQWN0aW9uXCIpO1xuICAgIGNvbnN0IG5ld0NvbmZpZzogYW55ID0ge307XG4gICAgYXNzaWduT2JqZWN0KG5ld0NvbmZpZywgY29uZmlnKTtcbiAgICBkZWxldGUgbmV3Q29uZmlnLmFjdGlvbjtcbiAgICBkZWxldGUgbmV3Q29uZmlnLnByZUFjdGlvbjtcbiAgICBkZWxldGUgbmV3Q29uZmlnLnBvc3RBY3Rpb247XG4gICAgYXNzaWduT2JqZWN0KG5ld0NvbmZpZywgY29uZmlnLnByZUFjdGlvbik7XG4gICAgY29uc3QgbmV3RW52aXJvbm1lbnQgPSBtZXJnZUVudmlyb25tZW50KGNvbmZpZy5wcmVBY3Rpb24uZW52aXJvbm1lbnQsIGVudmlyb25tZW50KTtcbiAgICBhd2FpdCBkb1RhcmdldEJ1aWxkKGN0eCwgbmV3RW52aXJvbm1lbnQsIG5ld0NvbmZpZywgc2V0dGluZ3MpO1xuICAgIGF3YWl0IHNldHRpbmdzLnBvcCgpO1xuICB9XG5cbiAgaWYgKEFycmF5LmlzQXJyYXkoY29uZmlnLmFjdGlvbikpIHtcbiAgICBhd2FpdCBzZXR0aW5ncy5wdXNoKFwiYWN0aW9uXCIpO1xuICAgIGZvciAodmFyIGkgPSAwOyBpIDwgY29uZmlnLmFjdGlvbi5sZW5ndGg7ICsraSkge1xuICAgICAgYXdhaXQgc2V0dGluZ3MucHVzaChpKTtcbiAgICAgIGNvbnN0IG5ld0NvbmZpZzogYW55ID0ge307XG4gICAgICBhc3NpZ25PYmplY3QobmV3Q29uZmlnLCBjb25maWcpO1xuICAgICAgZGVsZXRlIG5ld0NvbmZpZy5hY3Rpb247XG4gICAgICBkZWxldGUgbmV3Q29uZmlnLnByZUFjdGlvbjtcbiAgICAgIGRlbGV0ZSBuZXdDb25maWcucG9zdEFjdGlvbjtcbiAgICAgIGFzc2lnbk9iamVjdChuZXdDb25maWcsIGNvbmZpZy5hY3Rpb25baV0pO1xuICAgICAgY29uc3QgbmV3RW52aXJvbm1lbnQgPSBtZXJnZUVudmlyb25tZW50KGNvbmZpZy5hY3Rpb25baV0uZW52aXJvbm1lbnQsIGVudmlyb25tZW50KTtcbiAgICAgIGF3YWl0IGRvVGFyZ2V0QnVpbGQoY3R4LCBuZXdFbnZpcm9ubWVudCwgbmV3Q29uZmlnLCBzZXR0aW5ncyk7XG4gICAgICBhd2FpdCBzZXR0aW5ncy5wb3AoKTtcbiAgICB9XG4gICAgYXdhaXQgc2V0dGluZ3MucG9wKCk7XG4gIH1cbiAgZWxzZSB7XG4gICAgaWYgKCFhd2FpdCBkaXJlY3RvcnlFeGlzdHMoY29uZmlnLmJpbmFyeURpcikpIHtcbiAgICAgIGF3YWl0IGZzLnByb21pc2VzLm1rZGlyKGNvbmZpZy5iaW5hcnlEaXIsIHsgcmVjdXJzaXZlOiB0cnVlIH0pO1xuICAgIH1cbiAgICBpZiAoYWN0aW9uSGFuZGxlcnNbY29uZmlnLmFjdGlvbl0pIHtcbiAgICAgIGNvbmZpZy5kZXNjcmlwdGlvbiAmJiBjb25zb2xlLmxvZyhjb25maWcuZGVzY3JpcHRpb24pO1xuICAgICAgYXdhaXQgYWN0aW9uSGFuZGxlcnNbY29uZmlnLmFjdGlvbl0oY29uZmlnLCBlbnZpcm9ubWVudCwgc2V0dGluZ3MpO1xuICAgIH1cbiAgfVxuXG4gIGlmIChjb25maWcucG9zdEFjdGlvbikge1xuICAgIGF3YWl0IHNldHRpbmdzLnB1c2goXCJwb3N0QWN0aW9uXCIpO1xuICAgIGNvbnN0IG5ld0NvbmZpZzogYW55ID0ge307XG4gICAgYXNzaWduT2JqZWN0KG5ld0NvbmZpZywgY29uZmlnKTtcbiAgICBkZWxldGUgbmV3Q29uZmlnLmFjdGlvbjtcbiAgICBkZWxldGUgbmV3Q29uZmlnLnByZUFjdGlvbjtcbiAgICBkZWxldGUgbmV3Q29uZmlnLnBvc3RBY3Rpb247XG4gICAgYXNzaWduT2JqZWN0KG5ld0NvbmZpZywgY29uZmlnLnBvc3RBY3Rpb24pO1xuICAgIGNvbnN0IG5ld0Vudmlyb25tZW50ID0gbWVyZ2VFbnZpcm9ubWVudChjb25maWcucG9zdEFjdGlvbi5lbnZpcm9ubWVudCwgZW52aXJvbm1lbnQpO1xuICAgIGF3YWl0IGRvVGFyZ2V0QnVpbGQoY3R4LCBuZXdFbnZpcm9ubWVudCwgbmV3Q29uZmlnLCBzZXR0aW5ncyk7XG4gICAgYXdhaXQgc2V0dGluZ3MucG9wKCk7XG4gIH1cbn1cblxuYXN5bmMgZnVuY3Rpb24gZ2V0VXNlckNvbmZpZyhvcHRpb25zOiBSdW5TY3JpcHRPcHRpb25zKSB7XG4gIGxldCBjb25maWdQYXRoO1xuICBpZiAob3B0aW9ucy5lbnYuY29uZmlnKSB7XG4gICAgY29uZmlnUGF0aCA9IHBhdGguaXNBYnNvbHV0ZShvcHRpb25zLmVudi5jb25maWcpID8gb3B0aW9ucy5lbnYuY29uZmlnIDogcGF0aC5yZXNvbHZlKG9wdGlvbnMud29ya0Rpciwgb3B0aW9ucy5lbnYuY29uZmlnKTtcbiAgICBpZiAoIWF3YWl0IGZpbGVFeGlzdHMoY29uZmlnUGF0aCkpXG4gICAgICB0aHJvdyBgQ29uZmlndXJhdGlvbiAnJHtvcHRpb25zLmVudi5jb25maWd9JyBmaWxlIGRvZXMgbm90IGV4aXN0YDtcbiAgfVxuICBlbHNlIHtcbiAgICBjb25zdCB1c2VyQ29uZmlnUGF0aCA9IHBhdGgucmVzb2x2ZShvcHRpb25zLndvcmtEaXIsIFVTRVJfQ09ORklHKTtcbiAgICBpZiAoYXdhaXQgZmlsZUV4aXN0cyh1c2VyQ29uZmlnUGF0aCkpXG4gICAgICBjb25maWdQYXRoID0gdXNlckNvbmZpZ1BhdGg7XG4gICAgZWxzZSB7XG4gICAgICBsb2dnZXIud2FybihgQ29uZmlnIGZpbGUgJyR7VVNFUl9DT05GSUd9JyBpcyBub3QgYXZhaWxhYmxlYCk7XG4gICAgfVxuICB9XG5cbiAgaWYgKCFjb25maWdQYXRoKSB7XG4gICAgcmV0dXJuIHtcbiAgICAgIFwiYnVuZGxlOm91dHB1dFwiOiB7XG4gICAgICAgIGFjdGlvbjogXCJiaXRtYWtlXCIsXG4gICAgICAgIHZhcmlhYmxlczoge1xuICAgICAgICAgIElOU1RBTExfUFJFRklYOiBcIi91c3JcIixcbiAgICAgICAgfSxcbiAgICAgICAgc291cmNlRGlyOiBcIiR7c291cmNlUm9vdH1cIixcbiAgICAgICAgZGVzdERpcjogXCIke2JpbmFyeVJvb3R9L291dHB1dFwiLFxuICAgICAgfVxuICAgIH07XG4gIH1cblxuICBjb25zdCBjb25maWdVcmwgPSB1cmwucGF0aFRvRmlsZVVSTChjb25maWdQYXRoKTtcbiAgY29uc3QgY29uZmlnTW9kdWxlID0gYXdhaXQgaW1wb3J0TW9kdWxlKGNvbmZpZ1VybCk7XG4gIHN3aXRjaCAodHlwZW9mIGNvbmZpZ01vZHVsZS5kZWZhdWx0KSB7XG4gIGNhc2UgXCJmdW5jdGlvblwiOlxuICAgIGNvbnN0IHVzZXJDb25maWcgPSBjb25maWdNb2R1bGUuZGVmYXVsdChvcHRpb25zLmVudiwge30pO1xuICAgIGlmICh1c2VyQ29uZmlnIGluc3RhbmNlb2YgUHJvbWlzZSlcbiAgICAgIHJldHVybiBhd2FpdCB1c2VyQ29uZmlnO1xuICAgIHJldHVybiB1c2VyQ29uZmlnO1xuXG4gIGNhc2UgXCJvYmplY3RcIjpcbiAgICByZXR1cm4gY29uZmlnTW9kdWxlLmRlZmF1bHQ7XG5cbiAgZGVmYXVsdDpcbiAgICB0aHJvdyBuZXcgRXJyb3IoYFVua25vd24gdXNlciBjb25maWd1cmF0aW9uIHR5cGVgKTtcbiAgfVxufVxuXG5leHBvcnQgZGVmYXVsdCBhc3luYyAob3B0aW9uczogUnVuU2NyaXB0T3B0aW9ucykgPT4ge1xuICBjb25zdCBjdHggPSBuZXcgUnVuU2NyaXB0Q29udGV4dChvcHRpb25zKTtcbiAgY29uc3QgdXNlckNvbmZpZyA9IGF3YWl0IGdldFVzZXJDb25maWcob3B0aW9ucyk7XG4gIGNvbnN0IGJ1aWxkQ29uZmlnID0gbWFrZUJ1aWxkQ29uZmlnKGN0eCwgdXNlckNvbmZpZyk7XG5cbiAgaWYgKGJ1aWxkQ29uZmlnLlJFQ0lQRV9DT05URU5UX0ZJTEUpIHtcbiAgICBjb25zdCBqc29uQ29uZmlnID0gSlNPTi5zdHJpbmdpZnkoYnVpbGRDb25maWcsIG51bGwsIDIpO1xuICAgIGF3YWl0IHNhdmVJZkRpZmZlcmVudChidWlsZENvbmZpZy5SRUNJUEVfQ09OVEVOVF9GSUxFLCBqc29uQ29uZmlnKTtcbiAgfVxuXG4gIGNvbnN0IHNldHRpbmdzRmlsZW5hbWUgPSBwYXRoLnJlc29sdmUoYnVpbGRDb25maWcuYmluYXJ5Um9vdCwgQlVJTERfU0VUVElOR1NfRklMRSk7XG4gIGNvbnN0IHNldHRpbmdzID0gbmV3IFNldHRpbmdzU3RvcmFnZShzZXR0aW5nc0ZpbGVuYW1lKTtcblxuICBmb3IgKGNvbnN0IFtrZXksIGVudHJ5XSBvZiBPYmplY3QuZW50cmllcyhidWlsZENvbmZpZykgYXMgYW55KSB7XG4gICAgaWYgKGVudHJ5ICYmIHR5cGVvZiBlbnRyeSA9PT0gXCJvYmplY3RcIiAmJiBlbnRyeS5hY3Rpb24gJiYgIWVudHJ5LmRpc2FibGVkKSB7XG4gICAgICBhd2FpdCBzZXR0aW5ncy5wdXNoKGtleSk7XG4gICAgICBjb25zdCBjb21wbGV0ZWQgPSBhd2FpdCBzZXR0aW5ncy5nZXQoXCJjb21wbGV0ZWRcIik7XG4gICAgICBpZiAoZW50cnkucmVidWlsZCB8fCAhY29tcGxldGVkKSB7XG4gICAgICAgIGxvZ2dlci5pbmZvKGBTdGFydGVkIGFjdGlvbjogJHtrZXl9YCk7XG4gICAgICAgIGNvbnN0IGVudmlyb25tZW50ID0gbWVyZ2VFbnZpcm9ubWVudChlbnRyeS5lbnZpcm9ubWVudCwgcHJvY2Vzcy5lbnYpO1xuICAgICAgICBpZiAoZW50cnkuc291cmNlVXJsKSB7XG4gICAgICAgICAgYXdhaXQgZG9FeHRyYWN0QXJjaGl2ZShjdHgsIGVudmlyb25tZW50LCBlbnRyeSwgc2V0dGluZ3MpO1xuICAgICAgICB9XG4gICAgICAgIGF3YWl0IGRvVGFyZ2V0QnVpbGQoY3R4LCBlbnZpcm9ubWVudCwgZW50cnksIHNldHRpbmdzKTtcbiAgICAgICAgYXdhaXQgc2V0dGluZ3Muc2V0KFwiY29tcGxldGVkXCIsIHRydWUpO1xuICAgICAgICBsb2dnZXIuaW5mbyhgQ29tcGxldGVkIGFjdGlvbjogJHtrZXl9YCk7XG4gICAgICB9XG4gICAgICBhd2FpdCBzZXR0aW5ncy5wb3AoKTtcbiAgICB9XG4gIH1cbn1cbiIsIi8qXG4gKiBNSVQgTGljZW5zZVxuICpcbiAqIENvcHlyaWdodCAoYykgMjAyNSAgWXVyaWkgWWFrdWJpbiAoeXVyaWkueWFrdWJpbkBnbWFpbC5jb20pXG4gKlxuICogUGVybWlzc2lvbiBpcyBncmFudGVkIHRvIHVzZSwgY29weSwgbW9kaWZ5LCBhbmQgZGlzdHJpYnV0ZSB0aGlzIHNvZnR3YXJlXG4gKiB1bmRlciB0aGUgTUlUIExpY2Vuc2UuIFNlZSBMSUNFTlNFIGZpbGUgZm9yIGRldGFpbHMuXG4gKi9cblxuZXhwb3J0IGNvbnN0IFVTRVJfQ09ORklHID0gXCJiaXRtYWtlLmNvbmZpZy5tanNcIjtcbmV4cG9ydCBjb25zdCBSRVFVRVNUX0FUVEVNUFRTID0gMzA7XG5leHBvcnQgY29uc3QgQlVJTERfU0VUVElOR1NfRklMRSA9IFwiQnVpbGRTZXR0aW5ncy5qc29uXCI7XG5leHBvcnQgY29uc3QgQUxMX1RBUkdFVCA9IFwiYWxsXCI7XG5leHBvcnQgY29uc3QgSU5TVEFMTF9UQVJHRVQgPSBcImluc3RhbGxcIjtcbiIsIi8qXG4gKiBNSVQgTGljZW5zZVxuICpcbiAqIENvcHlyaWdodCAoYykgMjAyNSAgWXVyaWkgWWFrdWJpbiAoeXVyaWkueWFrdWJpbkBnbWFpbC5jb20pXG4gKlxuICogUGVybWlzc2lvbiBpcyBncmFudGVkIHRvIHVzZSwgY29weSwgbW9kaWZ5LCBhbmQgZGlzdHJpYnV0ZSB0aGlzIHNvZnR3YXJlXG4gKiB1bmRlciB0aGUgTUlUIExpY2Vuc2UuIFNlZSBMSUNFTlNFIGZpbGUgZm9yIGRldGFpbHMuXG4gKi9cblxuaW1wb3J0IGZzIGZyb20gXCJub2RlOmZzXCI7XG5cbmltcG9ydCB7IGZpbGVFeGlzdHMgfSBmcm9tIFwiQC91dGlscy9GaWxlU3lzdGVtXCI7XG5pbXBvcnQgeyBSdW5TY3JpcHRDb250ZXh0IH0gZnJvbSBcIkAvUnVuU2NyaXB0Q29udGV4dFwiO1xuaW1wb3J0IHsgcmVxdWlyZVJlc29sdmUgfSBmcm9tIFwiQC91dGlscy9Nb2R1bGVcIjtcbmltcG9ydCB7IGNyZWF0ZUxvZ2dlciB9IGZyb20gXCJAL2xvZ2dlclwiO1xuXG5jb25zdCBsb2dnZXIgPSBjcmVhdGVMb2dnZXIoaW1wb3J0Lm1ldGEudXJsKTtcblxuZXhwb3J0IGRlZmF1bHQgYXN5bmMgZnVuY3Rpb24ob3B0aW9uczogYW55KSB7XG4gIGNvbnN0IGN0eCA9IG5ldyBSdW5TY3JpcHRDb250ZXh0KG9wdGlvbnMpO1xuICBjb25zdCBwcmVzZXQgPSBjdHguZW52LnByZXNldDtcblxuICBsZXQgcHJlc2V0UGF0aDtcbiAgaWYgKHByZXNldCkge1xuICAgIGlmIChhd2FpdCBmaWxlRXhpc3RzKHByZXNldCkpXG4gICAgICBwcmVzZXRQYXRoID0gcHJlc2V0O1xuICAgIGVsc2Uge1xuICAgICAgY29uc3QgY29tcG9uZW50cyA9IHByZXNldC5zcGxpdChcIi9cIik7XG4gICAgICBpZiAoY29tcG9uZW50cy5sZW5ndGggPT09IDIpIHtcbiAgICAgICAgICB0cnkgeyBwcmVzZXRQYXRoID0gcmVxdWlyZVJlc29sdmUoYCR7Y29tcG9uZW50c1swXX0vYml0bWFrZS9wcmVzZXRzLyR7Y29tcG9uZW50c1sxXX1gKSB9IGNhdGNoKGUpIHt9XG4gICAgICB9XG4gICAgfVxuICB9XG5cbiAgaWYgKCFwcmVzZXRQYXRoKVxuICAgIHRocm93IG5ldyBFcnJvcihgUHJlc2V0ICcke3ByZXNldH0nIGlzIG5vdCBhdmFpbGFibGVgKTtcblxuICBpZiAoYXdhaXQgZmlsZUV4aXN0cyhjdHgudXNlckNvbmZpZ1BhdGgpKVxuICAgIGF3YWl0IGZzLnByb21pc2VzLnJtKGN0eC51c2VyQ29uZmlnUGF0aCk7XG5cbiAgYXdhaXQgZnMucHJvbWlzZXMuY29weUZpbGUocHJlc2V0UGF0aCwgY3R4LnVzZXJDb25maWdQYXRoKTtcbiAgbG9nZ2VyLmluZm8oYFByZXNldCAnJHtwcmVzZXR9JyBpbnN0YWxsZWQgc3VjY2Vzc2Z1bGx5YCk7XG59XG4iLCIvKlxuICogTUlUIExpY2Vuc2VcbiAqXG4gKiBDb3B5cmlnaHQgKGMpIDIwMjUgIFl1cmlpIFlha3ViaW4gKHl1cmlpLnlha3ViaW5AZ21haWwuY29tKVxuICpcbiAqIFBlcm1pc3Npb24gaXMgZ3JhbnRlZCB0byB1c2UsIGNvcHksIG1vZGlmeSwgYW5kIGRpc3RyaWJ1dGUgdGhpcyBzb2Z0d2FyZVxuICogdW5kZXIgdGhlIE1JVCBMaWNlbnNlLiBTZWUgTElDRU5TRSBmaWxlIGZvciBkZXRhaWxzLlxuICovXG5cbmltcG9ydCBmcyBmcm9tIFwibm9kZTpmc1wiO1xuaW1wb3J0IHBhdGggZnJvbSBcIm5vZGU6cGF0aFwiO1xuXG5pbXBvcnQgeyBQbHVnaW5Db250ZXh0IH0gZnJvbSBcIkAvY29yZS9QbHVnaW5Db250ZXh0XCI7XG5pbXBvcnQgeyBHbG9iYWxDb250ZXh0IH0gZnJvbSBcIkAvY29yZS9HbG9iYWxDb250ZXh0XCI7XG5pbXBvcnQgeyBTY29wZUhlbHBlciB9IGZyb20gXCJAL2NvcmUvU2NvcGVcIjtcbmltcG9ydCB7IEdvYWxDb2xsZWN0aW9uIH0gZnJvbSBcIkAvY29yZS9Hb2FsQ29sbGVjdGlvblwiO1xuaW1wb3J0IHsgVG9vbGNoYWluQ29udGV4dCB9IGZyb20gXCJAL2NvcmUvVG9vbGNoYWluQ29udGV4dFwiO1xuaW1wb3J0IHsgZ2V0UGF0aFN0cmluZyB9ICBmcm9tIFwiQC91dGlscy9GaWxlU3lzdGVtXCI7XG5pbXBvcnQgeyBEaXJQYXRoLCBGaWxlUGF0aCB9IGZyb20gXCJAL2NvcmUvUGF0aFwiO1xuaW1wb3J0IHsgaW1wb3J0TW9kdWxlIH0gIGZyb20gXCJAL3V0aWxzL01vZHVsZVwiO1xuaW1wb3J0IHsgZGV0ZXJtaW5lQ29tcGlsZXIgfSAgZnJvbSBcIkAvY29yZS9EZXRlcm1pbmVDb21waWxlclwiO1xuaW1wb3J0IFN5c3RlbVZhcmlhYmxlcyBmcm9tIFwiQC9jb3JlL1N5c3RlbVZhcmlhYmxlc1wiO1xuaW1wb3J0IHsgU3lzdGVtU2NvcGUgfSBmcm9tIFwiQC9jb3JlL1N5c3RlbVNjb3BlXCI7XG5pbXBvcnQgeyBJTlNUQUxMX1RBUkdFVCB9IGZyb20gXCJAL0NvbnN0YW50c1wiO1xuXG5jb25zdCBQQUNLQUdFX0pTT04gPSBcInBhY2thZ2UuanNvblwiO1xuY29uc3QgTUFLRV9DQUNIRSA9IFwiTWFrZUNhY2hlLmpzb25cIjtcblxuZXhwb3J0IGFzeW5jIGZ1bmN0aW9uIG1ha2VTY3JpcHRBY3Rpb24oY29uZmlnOiBhbnksIGVudmlyb25tZW50OiBhbnksIHNldHRpbmdzOiBhbnkpIHtcbiAgcHJvY2Vzcy5lbnYgPSBlbnZpcm9ubWVudDtcblxuICBsZXQgc2NvcGUgPSB7fSBhcyBTeXN0ZW1TY29wZTtcbiAgU2NvcGVIZWxwZXIuZGVmaW5lVmFyaWFibGVzKHNjb3BlLCBcInN5c3RlbVwiLCBTeXN0ZW1WYXJpYWJsZXMpO1xuXG4gIGNvbnN0IHNvdXJjZURpciA9IGdldFBhdGhTdHJpbmcoY29uZmlnLnNvdXJjZURpcik7XG4gIGNvbnN0IGJpbmFyeURpciA9IGdldFBhdGhTdHJpbmcoY29uZmlnLmJpbmFyeURpcik7XG5cbiAgc2NvcGUuUFJPSkVDVF9TT1VSQ0VfRElSID0gRGlyUGF0aC5jcmVhdGUoc291cmNlRGlyKTtcbiAgc2NvcGUuUFJPSkVDVF9CSU5BUllfRElSID0gRGlyUGF0aC5jcmVhdGUoYmluYXJ5RGlyKTtcblxuICBzY29wZS5QQUNLQUdFX0ZJTEUgPSBzY29wZS5QUk9KRUNUX1NPVVJDRV9ESVIuam9pbihQQUNLQUdFX0pTT04pO1xuICBzY29wZS5DQUNIRV9GSUxFID0gc2NvcGUuUFJPSkVDVF9CSU5BUllfRElSLmpvaW4oTUFLRV9DQUNIRSk7XG4gIHNjb3BlLlNPVVJDRV9ESVIgPSBzY29wZS5QUk9KRUNUX1NPVVJDRV9ESVI7XG4gIHNjb3BlLkJJTkFSWV9ESVIgPSBzY29wZS5QUk9KRUNUX0JJTkFSWV9ESVI7XG5cbiAgY29uc3QgcGFja2FnZUpzb24gPSBhd2FpdCBmcy5wcm9taXNlcy5yZWFkRmlsZShzY29wZS5QQUNLQUdFX0ZJTEUudG9TdHJpbmcoKSwgJ3V0ZjgnKTtcbiAgY29uc3QgcGtnID0gSlNPTi5wYXJzZShwYWNrYWdlSnNvbik7XG5cbiAgc2NvcGUuQlVJTERfVFlQRSA9IGNvbmZpZy5idWlsZFR5cGU7XG4gIHNjb3BlLlBST0pFQ1RfTkFNRSA9IHBrZy5uYW1lO1xuICBzY29wZS5QUk9KRUNUX1ZFUlNJT04gPSBwa2cudmVyc2lvbjtcbiAgc2NvcGUuUFJPSkVDVF9ERVNDUklQVElPTiA9IHBrZy5kZXNjcmlwdGlvbiB8fCBcIlwiO1xuICBzY29wZS5QUk9KRUNUX0hPTUVQQUdFX1VSTCA9IHBrZy5ob21lcGFnZSB8fCBcIlwiO1xuXG4gIGlmIChjb25maWcuZGVzdERpcilcbiAgICBzY29wZS5ERVNURElSID0gY29uZmlnLmRlc3REaXI7XG5cbiAgU2NvcGVIZWxwZXIuYXBwbHlWYXJpYWJsZXMoc2NvcGUsIGNvbmZpZy52YXJpYWJsZXMgfHwge30pO1xuXG4gIGNvbnN0IGdsb2JhbCA9IEdsb2JhbENvbnRleHQuY3JlYXRlKCk7XG4gIGlmIChzY29wZS5UT09MQ0hBSU5fRklMRSkge1xuICAgIGNvbnN0IHRvb2xjaGFpbiA9IGF3YWl0IGltcG9ydE1vZHVsZShzY29wZS5UT09MQ0hBSU5fRklMRSk7XG4gICAgaWYgKCF0b29sY2hhaW4uZGVmYXVsdClcbiAgICAgIHRocm93IG5ldyBFcnJvcihcIlRvb2xjaGFpbiBtb2R1bGUgaGFzIG5vIGRlZmF1bHQgZXhwb3J0XCIpO1xuICAgIGNvbnN0IG1rID0gVG9vbGNoYWluQ29udGV4dC5jcmVhdGUoc2NvcGUsIGdsb2JhbCk7XG4gICAgY29uc3QgcmVzdWx0ID0gdG9vbGNoYWluLmRlZmF1bHQobWspO1xuICAgIGlmIChyZXN1bHQgaW5zdGFuY2VvZiBQcm9taXNlKVxuICAgICAgYXdhaXQgcmVzdWx0O1xuICAgIFNjb3BlSGVscGVyLmFwcGx5VmFyaWFibGVzKHNjb3BlLCBtayk7XG4gIH1cbiAgZWxzZSB7XG4gICAgYXdhaXQgZGV0ZXJtaW5lQ29tcGlsZXIoc2NvcGUpO1xuICB9XG5cbiAgZm9yIChjb25zdCBwbHVnaW4gb2YgKHNjb3BlLk1BS0VfUExVR0lOX0xJU1QgfHwgW10pKSB7XG4gICAgY29uc3QgY3dkU2F2ZSA9IHByb2Nlc3MuY3dkKCk7XG4gICAgXG4gICAgc2NvcGUuU0NSSVBUX0ZJTEUgPSBGaWxlUGF0aC5jcmVhdGUocGx1Z2luKTtcbiAgICBzY29wZS5TQ1JJUFRfRElSID0gc2NvcGUuU0NSSVBUX0ZJTEUuZGlybmFtZSgpO1xuXG4gICAgcHJvY2Vzcy5jaGRpcihzY29wZS5TQ1JJUFRfRElSLnRvU3RyaW5nKCkpO1xuICAgIGNvbnN0IG1vZHVsZSA9IGF3YWl0IGltcG9ydE1vZHVsZShzY29wZS5TQ1JJUFRfRklMRS50b1N0cmluZygpKTtcbiAgICBpZiAoIW1vZHVsZS5kZWZhdWx0KVxuICAgICAgdGhyb3cgbmV3IEVycm9yKGBQbHVnaW4gJHtzY29wZS5TQ1JJUFRfRklMRS5iYXNlbmFtZSgpfSBub3QgY29udGFpbiBkZWZhdWx0IGZ1bmN0aW9uYCk7XG4gICAgY29uc3QgbWsgPSBQbHVnaW5Db250ZXh0LmNyZWF0ZShzY29wZSwgZ2xvYmFsKTtcbiAgICBjb25zdCByZXN1bHQgPSBtb2R1bGUuZGVmYXVsdChtayk7XG4gICAgaWYgKHJlc3VsdCBpbnN0YW5jZW9mIFByb21pc2UpXG4gICAgICBhd2FpdCByZXN1bHQ7XG4gICAgU2NvcGVIZWxwZXIuYXBwbHlWYXJpYWJsZXMoc2NvcGUsIG1rKTtcblxuICAgIHByb2Nlc3MuY2hkaXIoY3dkU2F2ZSk7XG4gIH1cblxuICBnbG9iYWwuYWRkU3ViZGlyZWN0b3J5KHNjb3BlKTtcblxuICBhd2FpdCBnbG9iYWwuZG9TdWJkaXJlY3RvcnkoKTtcbiAgY29uc29sZS5pbmZvKFwiQ29uZmlndXJpbmcgZG9uZVwiKTtcblxuICBpZiAoc2NvcGUuR0xPQkFMX0NPTlRFWFRfSlNPTikge1xuICAgIGNvbnN0IGZpbGVuYW1lID0gc2NvcGUuR0xPQkFMX0NPTlRFWFRfSlNPTi50b1N0cmluZygpO1xuICAgIGNvbnN0IGNvbnRlbnQgPSBKU09OLnN0cmluZ2lmeShnbG9iYWwsIG51bGwsIDIpO1xuICAgIGF3YWl0IGZzLnByb21pc2VzLm1rZGlyKHBhdGguZGlybmFtZShmaWxlbmFtZSksIHsgcmVjdXJzaXZlOiB0cnVlIH0pO1xuICAgIGF3YWl0IGZzLnByb21pc2VzLndyaXRlRmlsZShmaWxlbmFtZSwgY29udGVudCwgeyBlbmNvZGluZzogXCJ1dGY4XCIgfSk7XG4gIH1cblxuICBjb25zdCBhbGxHb2FsTGlzdCA9IGdsb2JhbC5jcmVhdGVHb2FscyhzY29wZSk7XG4gIGNvbnN0IGdvYWxMaXN0ID0gYWxsR29hbExpc3QuZ2V0VGFyZ2V0TGlzdChJTlNUQUxMX1RBUkdFVCk7XG5cbiAgaWYgKHNjb3BlLlRBUkdFVF9HT0FMU19KU09OKSB7XG4gICAgY29uc3QgZmlsZW5hbWUgPSBzY29wZS5UQVJHRVRfR09BTFNfSlNPTi50b1N0cmluZygpO1xuICAgIGNvbnN0IGNvbnRlbnQgPSBKU09OLnN0cmluZ2lmeShnb2FsTGlzdCwgbnVsbCwgMik7XG4gICAgYXdhaXQgZnMucHJvbWlzZXMubWtkaXIocGF0aC5kaXJuYW1lKGZpbGVuYW1lKSwgeyByZWN1cnNpdmU6IHRydWUgfSk7XG4gICAgYXdhaXQgZnMucHJvbWlzZXMud3JpdGVGaWxlKGZpbGVuYW1lLCBjb250ZW50LCB7IGVuY29kaW5nOiBcInV0ZjhcIiB9KTtcbiAgfVxuXG4gIGF3YWl0IEdvYWxDb2xsZWN0aW9uLmJ1aWxkR29hbHMoZ29hbExpc3QpO1xufVxuIiwiLypcbiAqIE1JVCBMaWNlbnNlXG4gKlxuICogQ29weXJpZ2h0IChjKSAyMDI1ICBZdXJpaSBZYWt1YmluICh5dXJpaS55YWt1YmluQGdtYWlsLmNvbSlcbiAqXG4gKiBQZXJtaXNzaW9uIGlzIGdyYW50ZWQgdG8gdXNlLCBjb3B5LCBtb2RpZnksIGFuZCBkaXN0cmlidXRlIHRoaXMgc29mdHdhcmVcbiAqIHVuZGVyIHRoZSBNSVQgTGljZW5zZS4gU2VlIExJQ0VOU0UgZmlsZSBmb3IgZGV0YWlscy5cbiAqL1xuXG5pbXBvcnQgcGF0aCBmcm9tIFwibm9kZTpwYXRoXCI7XG5cbmltcG9ydCB7IFVTRVJfQ09ORklHIH0gZnJvbSBcIkAvQ29uc3RhbnRzXCI7XG5pbXBvcnQgeyBERUJVR19CVUlMRF9UWVBFLCBSRUxFQVNFX0JVSUxEX1RZUEUgfSBmcm9tIFwiQC9jb3JlL1R5cGVzXCI7XG5cbmV4cG9ydCBpbnRlcmZhY2UgUnVuU2NyaXB0T3B0aW9ucyB7XG4gIGhhbmRsZXI6IHN0cmluZztcbiAgbm9kZUV4ZWN1dGFibGU6IHN0cmluZztcbiAgY3VycmVudFNjcmlwdDogc3RyaW5nO1xuICB3b3JrRGlyOiBzdHJpbmc7XG4gIGVudjoge1xuICAgIGJ1aWxkVHlwZT86IHN0cmluZztcbiAgICBjb25maWc/OiBzdHJpbmc7XG4gICAgcHJlc2V0Pzogc3RyaW5nO1xuICB9O1xufTtcblxuZXhwb3J0IGNsYXNzIFJ1blNjcmlwdENvbnRleHQge1xuICBfbm9kZUV4ZWN1dGFibGU7XG4gIF9jdXJyZW50U2NyaXB0O1xuICBfd29ya0RpcjtcbiAgcmVhZG9ubHkgX2VudjtcbiAgX3VzZXJDb25maWc/OiBvYmplY3Q7XG5cbiAgY29uc3RydWN0b3Iob3B0aW9uczogUnVuU2NyaXB0T3B0aW9ucykge1xuICAgIHRoaXMuX25vZGVFeGVjdXRhYmxlID0gb3B0aW9ucy5ub2RlRXhlY3V0YWJsZTtcbiAgICB0aGlzLl9jdXJyZW50U2NyaXB0ID0gb3B0aW9ucy5jdXJyZW50U2NyaXB0O1xuICAgIHRoaXMuX3dvcmtEaXIgPSBvcHRpb25zLndvcmtEaXI7XG4gICAgdGhpcy5fZW52ID0gb3B0aW9ucy5lbnY7XG4gIH1cblxuICBnZXQgbm9kZUV4ZWN1dGFibGUoKSB7XG4gICAgcmV0dXJuIHRoaXMuX25vZGVFeGVjdXRhYmxlO1xuICB9XG5cbiAgZ2V0IGN1cnJlbnRTY3JpcHQoKSB7XG4gICAgcmV0dXJuIHRoaXMuX2N1cnJlbnRTY3JpcHQ7XG4gIH1cblxuICBnZXQgd29ya0RpcigpIHtcbiAgICByZXR1cm4gdGhpcy5fd29ya0RpcjtcbiAgfVxuXG4gIGdldCBlbnYoKSB7XG4gICAgcmV0dXJuIHRoaXMuX2VudjtcbiAgfVxuXG4gIGdldCB1c2VyQ29uZmlnUGF0aCgpIHtcbiAgICByZXR1cm4gcGF0aC5yZXNvbHZlKHRoaXMuX3dvcmtEaXIsIFVTRVJfQ09ORklHKTtcbiAgfVxuXG4gIGdldCBidWlsZFR5cGUoKSB7XG4gICAgcmV0dXJuIHRoaXMuX2Vudi5idWlsZFR5cGUgPT0gREVCVUdfQlVJTERfVFlQRSA/IHRoaXMuX2Vudi5idWlsZFR5cGUgOiBSRUxFQVNFX0JVSUxEX1RZUEU7XG4gIH1cbn07XG4iLCIvKlxuICogTUlUIExpY2Vuc2VcbiAqXG4gKiBDb3B5cmlnaHQgKGMpIDIwMjUgIFl1cmlpIFlha3ViaW4gKHl1cmlpLnlha3ViaW5AZ21haWwuY29tKVxuICpcbiAqIFBlcm1pc3Npb24gaXMgZ3JhbnRlZCB0byB1c2UsIGNvcHksIG1vZGlmeSwgYW5kIGRpc3RyaWJ1dGUgdGhpcyBzb2Z0d2FyZVxuICogdW5kZXIgdGhlIE1JVCBMaWNlbnNlLiBTZWUgTElDRU5TRSBmaWxlIGZvciBkZXRhaWxzLlxuICovXG5cbmV4cG9ydCBlbnVtIEJvb2xlYW5UeXBlIHtcbiAgT04gPSBcIk9OXCIsXG4gIE9GRiA9IFwiT0ZGXCIsXG59O1xuXG4vLyBFbnVtIHJlcHJlc2VudGluZyB2YWx1ZSB0eXBlcyB1c2VkIGluIENNYWtlIGNhY2hlIHZhcmlhYmxlc1xuZXhwb3J0IGVudW0gVmFsdWVUeXBlIHtcbiAgLy8gUmVwcmVzZW50cyBhIGZ1bGwgcGF0aCB0byBhIGZpbGVcbiAgRklMRVBBVEggPSBcIkZJTEVQQVRIXCIsXG5cbiAgLy8gUmVwcmVzZW50cyBhIHBhdGggdG8gYSBkaXJlY3RvcnlcbiAgUEFUSCA9IFwiUEFUSFwiLFxuXG4gIC8vIFJlcHJlc2VudHMgYSBib29sZWFuIHZhbHVlICh0cnVlL2ZhbHNlKVxuICBCT09MID0gXCJCT09MXCIsXG5cbiAgLy8gUmVwcmVzZW50cyBhIGdlbmVyaWMgc3RyaW5nIHZhbHVlXG4gIFNUUklORyA9IFwiU1RSSU5HXCIsXG59O1xuXG4vLyBCdWlsZFR5cGUgcmVwcmVzZW50aW5nIGNvbW1vbiBDTWFrZSBidWlsZCB0eXBlc1xuZXhwb3J0IGVudW0gQnVpbGRUeXBlIHtcbiAgLy8gRGVidWcgYnVpbGQgdHlwZTogaW5jbHVkZXMgZGVidWcgc3ltYm9scywgbm8gb3B0aW1pemF0aW9uXG4gIERlYnVnID0gXCJEZWJ1Z1wiLFxuXG4gIC8vIFJlbGVhc2UgYnVpbGQgdHlwZTogb3B0aW1pemVkIGNvZGUsIG5vIGRlYnVnIGluZm9cbiAgUmVsZWFzZSA9IFwiUmVsZWFzZVwiLFxuXG4gIC8vIFJlbGVhc2Ugd2l0aCBkZWJ1ZyBpbmZvOiBvcHRpbWl6ZWQgd2l0aCBkZWJ1ZyBzeW1ib2xzIGluY2x1ZGVkXG4gIFJlbFdpdGhEZWJJbmZvID0gXCJSZWxXaXRoRGViSW5mb1wiLFxuXG4gIC8vIE1pbmltdW0gc2l6ZSByZWxlYXNlOiBvcHRpbWl6ZWQgZm9yIHNtYWxsZXN0IGJpbmFyeSBzaXplXG4gIE1pblNpemVSZWwgPSBcIk1pblNpemVSZWxcIixcbn07XG5cbi8vIFRoZSBkZWZhdWx0IG5hbWUgb2YgdGhlIG1haW4gQ01ha2UgYnVpbGQgY29uZmlndXJhdGlvbiBmaWxlXG5leHBvcnQgY29uc3QgQ01BS0VfTElTVFNfVFhUID0gXCJDTWFrZUxpc3RzLnR4dFwiO1xuXG5leHBvcnQgZW51bSBHZW5lcmF0b3JUeXBlIHtcbiAgLy8gTmFtZSBvZiB0aGUgQ01ha2UgZ2VuZXJhdG9yIGZvciBzdGFuZGFyZCBVbml4ICdtYWtlJyBidWlsZCBzeXN0ZW1cbiAgVW5peE1ha2VmaWxlcyA9IFwiVW5peCBNYWtlZmlsZXNcIixcbn07XG5cbi8vIE5hbWUgb2YgdGhlIENNYWtlIGdlbmVyYXRvciBmb3Igc3RhbmRhcmQgVW5peCAnbWFrZScgYnVpbGQgc3lzdGVtXG5leHBvcnQgY29uc3QgREVGQVVMVF9HRU5FUkFUT1I6IEdlbmVyYXRvclR5cGUgPSBHZW5lcmF0b3JUeXBlLlVuaXhNYWtlZmlsZXM7XG4iLCIvKlxuICogTUlUIExpY2Vuc2VcbiAqXG4gKiBDb3B5cmlnaHQgKGMpIDIwMjUgIFl1cmlpIFlha3ViaW4gKHl1cmlpLnlha3ViaW5AZ21haWwuY29tKVxuICpcbiAqIFBlcm1pc3Npb24gaXMgZ3JhbnRlZCB0byB1c2UsIGNvcHksIG1vZGlmeSwgYW5kIGRpc3RyaWJ1dGUgdGhpcyBzb2Z0d2FyZVxuICogdW5kZXIgdGhlIE1JVCBMaWNlbnNlLiBTZWUgTElDRU5TRSBmaWxlIGZvciBkZXRhaWxzLlxuICovXG5cbmltcG9ydCB7IEJvb2xlYW5UeXBlIH0gZnJvbSBcIkAvY21ha2UvQ29uc3RhbnRzXCI7XG5cbmV4cG9ydCBmdW5jdGlvbiBjb252ZXJ0VG9WYWx1ZShvYmo6IGFueSk6IHN0cmluZyB7XG4gIGlmIChBcnJheS5pc0FycmF5KG9iaikpXG4gICAgcmV0dXJuIG9iai5tYXAoaSA9PiBjb252ZXJ0VG9WYWx1ZShpKSkuam9pbihcIjtcIik7XG5cbiAgaWYgKHR5cGVvZiBvYmogPT09IFwiYm9vbGVhblwiKVxuICAgIHJldHVybiBvYmogPyBCb29sZWFuVHlwZS5PTiA6IEJvb2xlYW5UeXBlLk9GRjtcblxuICByZXR1cm4gb2JqLnRvU3RyaW5nKCk7XG59XG4iLCIvKlxuICogTUlUIExpY2Vuc2VcbiAqXG4gKiBDb3B5cmlnaHQgKGMpIDIwMjUgIFl1cmlpIFlha3ViaW4gKHl1cmlpLnlha3ViaW5AZ21haWwuY29tKVxuICpcbiAqIFBlcm1pc3Npb24gaXMgZ3JhbnRlZCB0byB1c2UsIGNvcHksIG1vZGlmeSwgYW5kIGRpc3RyaWJ1dGUgdGhpcyBzb2Z0d2FyZVxuICogdW5kZXIgdGhlIE1JVCBMaWNlbnNlLiBTZWUgTElDRU5TRSBmaWxlIGZvciBkZXRhaWxzLlxuICovXG5cbmltcG9ydCBvcyBmcm9tIFwibm9kZTpvc1wiO1xuaW1wb3J0IGZzIGZyb20gXCJub2RlOmZzXCI7XG5pbXBvcnQgcGF0aCBmcm9tIFwibm9kZTpwYXRoXCI7XG5cbmltcG9ydCB7IHNwYXduQXN5bmMgfSBmcm9tIFwiQC91dGlscy9DaGlsZFByb2Nlc3NcIjtcbmltcG9ydCB7IENNQUtFX0xJU1RTX1RYVCwgREVGQVVMVF9HRU5FUkFUT1IsIFZhbHVlVHlwZSB9IGZyb20gXCJAL2NtYWtlL0NvbnN0YW50c1wiO1xuaW1wb3J0IHsgY29udmVydFRvVmFsdWUgfSBmcm9tIFwiQC9jbWFrZS9IZWxwZXJcIjtcblxuZnVuY3Rpb24gdG9WYXJUeXBlKGtleTogc3RyaW5nLCB2YWw6IGFueSkge1xuICBjb25zdCBtYXA6IGFueSA9IHtcbiAgICBDTUFLRV9JTlNUQUxMX1BSRUZJWDogVmFsdWVUeXBlLlBBVEgsXG4gICAgQ01BS0VfVE9PTENIQUlOX0ZJTEU6IFZhbHVlVHlwZS5GSUxFUEFUSCxcbiAgfTtcblxuICBpZiAodHlwZW9mIHZhbCA9PT0gXCJib29sZWFuXCIpXG4gICAgcmV0dXJuIFZhbHVlVHlwZS5CT09MO1xuXG4gIGlmIChtYXAuaGFzT3duUHJvcGVydHkoa2V5KSlcbiAgICByZXR1cm4gbWFwW2tleV07XG5cbiAgcmV0dXJuIFZhbHVlVHlwZS5TVFJJTkc7XG59XG5cbmZ1bmN0aW9uIHRvQ2FjaGVFbnRyeShuYW1lOiBzdHJpbmcsIHZhbDogYW55KSB7XG4gIGNvbnN0IHR5cGUgPSB0b1ZhclR5cGUobmFtZSwgdmFsKTtcbiAgY29uc3QgdmFsdWUgPSBjb252ZXJ0VG9WYWx1ZSh2YWwpO1xuICByZXR1cm4gYCR7bmFtZX06JHt0eXBlfT0ke3ZhbHVlfWA7XG59XG5cbmV4cG9ydCBhc3luYyBmdW5jdGlvbiBjb25maWd1cmUoYXJnczogYW55KSB7XG4gIGNvbnN0IHNwYXduQXJncyA9IFsgJy1HJywgYXJncy5nZW5lcmF0b3IgXTtcbiAgZm9yIChjb25zdCBba2V5LCB2YWxdIG9mIE9iamVjdC5lbnRyaWVzKGFyZ3MuY2FjaGVWYXJpYWJsZXMpKVxuICAgIHNwYXduQXJncy5wdXNoKCctRCcsIHRvQ2FjaGVFbnRyeShrZXksIHZhbCkpO1xuICBzcGF3bkFyZ3MucHVzaCgnLVMnLCBhcmdzLnNvdXJjZURpcik7XG4gIHNwYXduQXJncy5wdXNoKCctQicsIGFyZ3MuYmluYXJ5RGlyKTtcblxuICBjb25zdCByZXM6IGFueSA9IGF3YWl0IHNwYXduQXN5bmMoXCJjbWFrZVwiLCBzcGF3bkFyZ3MsIHtcbiAgICBjd2Q6IGFyZ3MuYmluYXJ5RGlyLFxuICAgIGVudjogYXJncy5lbnZpcm9ubWVudCB8fCBwcm9jZXNzLmVudixcbiAgICBleHRyYToge1xuICAgICAgb3V0cHV0OiBgY21ha2UuY29uZmlndXJlLmxvZ2AsXG4gICAgfSxcbiAgfSk7XG4gIGlmIChyZXMuc3RhdHVzICE9PSAwKSB7XG4gICAgdGhyb3cgYENNYWtlLmNvbmZpZ3VyZSByZXR1cm5lZCBzdGF0dXMgJHtyZXMuc3RhdHVzfWA7XG4gIH1cbn1cblxuZXhwb3J0IGFzeW5jIGZ1bmN0aW9uIGJ1aWxkKGFyZ3M6IGFueSkge1xuICBhd2FpdCBjb25maWd1cmUoYXJncyk7XG5cbiAgY29uc3Qgc3Bhd25BcmdzOiBzdHJpbmdbXSA9IFtcbiAgICAnLS1idWlsZCcsICcuJyxcbiAgICAnLS1wYXJhbGxlbCcsIG9zLmF2YWlsYWJsZVBhcmFsbGVsaXNtKCkudG9TdHJpbmcoKSxcbiAgXTtcbiAgY29uc3QgcmVzOiBhbnkgPSBhd2FpdCBzcGF3bkFzeW5jKFwiY21ha2VcIiwgc3Bhd25BcmdzLCB7XG4gICAgY3dkOiBhcmdzLmJpbmFyeURpcixcbiAgICBlbnY6IGFyZ3MuZW52aXJvbm1lbnQgfHwgcHJvY2Vzcy5lbnYsXG4gICAgZXh0cmE6IHtcbiAgICAgIG91dHB1dDogYGNtYWtlLmJ1aWxkLmxvZ2AsXG4gICAgfSxcbiAgfSk7XG4gIGlmIChyZXMuc3RhdHVzICE9PSAwKSB7XG4gICAgdGhyb3cgYENNYWtlLmJ1aWxkIHJldHVybmVkIHN0YXR1cyAke3Jlcy5zdGF0dXN9YDtcbiAgfVxufVxuXG5leHBvcnQgYXN5bmMgZnVuY3Rpb24gaW5zdGFsbChhcmdzOiBhbnkpIHtcbiAgYXdhaXQgY29uZmlndXJlKGFyZ3MpO1xuXG4gIGNvbnN0IHNwYXduQXJncyA9IFtcbiAgICAnLS1pbnN0YWxsJyxcbiAgICAnLicsXG4gIF07XG4gIGlmIChhcmdzLmluc3RhbGxEaXIpIHtcbiAgICBzcGF3bkFyZ3MucHVzaCgnLS1wcmVmaXgnLCBhcmdzLmluc3RhbGxEaXIpO1xuICB9XG4gIGNvbnN0IHJlczogYW55ID0gYXdhaXQgc3Bhd25Bc3luYyhcImNtYWtlXCIsIHNwYXduQXJncywge1xuICAgIGN3ZDogYXJncy5iaW5hcnlEaXIsXG4gICAgZW52OiBhcmdzLmVudmlyb25tZW50IHx8IHByb2Nlc3MuZW52LFxuICAgIGV4dHJhOiB7XG4gICAgICBvdXRwdXQ6IGBjbWFrZS5pbnN0YWxsLmxvZ2AsXG4gICAgfSxcbiAgfSk7XG4gIGlmIChyZXMuc3RhdHVzICE9PSAwKSB7XG4gICAgdGhyb3cgYENNYWtlLmluc3RhbGwgcmV0dXJuZWQgc3RhdHVzICR7cmVzLnN0YXR1c31gO1xuICB9XG59XG5cbmV4cG9ydCBhc3luYyBmdW5jdGlvbiBjdGVzdChhcmdzOiBhbnkpIHtcbiAgYXdhaXQgYnVpbGQoYXJncyk7XG5cbiAgY29uc3Qgc3Bhd25BcmdzOiBzdHJpbmdbXSA9IFtdO1xuICBjb25zdCByZXM6IGFueSA9IGF3YWl0IHNwYXduQXN5bmMoXCJjdGVzdFwiLCBzcGF3bkFyZ3MsIHtcbiAgICBjd2Q6IGFyZ3MuYmluYXJ5RGlyLFxuICAgIGVudjogYXJncy5lbnZpcm9ubWVudCB8fCBwcm9jZXNzLmVudixcbiAgICBleHRyYToge1xuICAgICAgb3V0cHV0OiBgY21ha2UuY3Rlc3QubG9nYCxcbiAgICB9LFxuICB9KTtcbiAgaWYgKHJlcy5zdGF0dXMgIT09IDApIHtcbiAgICB0aHJvdyBgQ1Rlc3QgcmV0dXJuZWQgc3RhdHVzICR7cmVzLnN0YXR1c31gO1xuICB9XG59XG5cbmV4cG9ydCBhc3luYyBmdW5jdGlvbiBleHRyYWN0KGFyZ3M6IGFueSkge1xuICBjb25zdCBzcGF3bkFyZ3MgPSBbIFwiLUVcIiwgXCJ0YXJcIiwgXCIteHZmXCIsIGFyZ3MuZmlsZW5hbWUgXTtcbiAgY29uc3QgcmVzOiBhbnkgPSBhd2FpdCBzcGF3bkFzeW5jKFwiY21ha2VcIiwgc3Bhd25BcmdzLCB7XG4gICAgY3dkOiBhcmdzLndvcmtEaXIgfHwgYXJncy5zb3VyY2VEaXIgfHwgYXJncy5iaW5hcnlEaXIsXG4gICAgZW52OiBhcmdzLmVudmlyb25tZW50IHx8IHByb2Nlc3MuZW52LFxuICAgIGV4dHJhOiB7XG4gICAgICBvdXRwdXQ6IGFyZ3MubG9nRmlsZSB8fCBgY21ha2UuZXh0cmFjdC5sb2dgLFxuICAgIH0sXG4gIH0pO1xuICBpZiAocmVzLnN0YXR1cyAhPT0gMCkge1xuICAgIHRocm93IGBFeHRyYWN0IHJldHVybmVkIHN0YXR1cyAke3Jlcy5zdGF0dXN9YDtcbiAgfVxufVxuXG5leHBvcnQgYXN5bmMgZnVuY3Rpb24gZ2V0UHJvamVjdEluZm8oc291cmNlOiBzdHJpbmcpIHtcbiAgY29uc3Qgc3RhdCA9IGF3YWl0IGZzLnByb21pc2VzLnN0YXQoc291cmNlKTtcbiAgaWYgKHN0YXQuaXNEaXJlY3RvcnkoKSlcbiAgICBzb3VyY2UgPSBwYXRoLnJlc29sdmUoc291cmNlLCBDTUFLRV9MSVNUU19UWFQpO1xuICBjb25zdCBjb250ZW50ID0gYXdhaXQgZnMucHJvbWlzZXMucmVhZEZpbGUoc291cmNlLCB7IGVuY29kaW5nOiAndXRmOCcgfSk7XG5cbiAgY29uc3QgcHJvamVjdFBhdHRlcm4gPSAvcHJvamVjdCAqXFwoICooW14gXSspICooW14pXSopXFwpLztcbiAgY29uc3QgdmVyc2lvblBhdHRlcm4gPSAvVkVSU0lPTiArKFteIF0rKS87XG5cbiAgY29uc3QgcmVzdWx0OiBhbnkgPSB7fTtcbiAgbGV0IG1hdGNoID0gY29udGVudC5tYXRjaChwcm9qZWN0UGF0dGVybik7XG4gIGlmIChtYXRjaCkge1xuICAgIHJlc3VsdC5uYW1lID0gbWF0Y2hbMV07XG4gICAgY29uc3QgcHJvamVjdENvbnRlbnQgPSBtYXRjaFsyXTtcbiAgICBtYXRjaCA9IHByb2plY3RDb250ZW50Lm1hdGNoKHZlcnNpb25QYXR0ZXJuKTtcbiAgICBpZiAobWF0Y2gpXG4gICAgICByZXN1bHQudmVyc2lvbiA9IG1hdGNoWzFdO1xuICB9XG5cbiAgcmV0dXJuIHJlc3VsdDtcbn1cblxuZXhwb3J0IGZ1bmN0aW9uIGxpbmVUb1NpbmdsQ29tbWVudChsaW5lOiBzdHJpbmcpIHtcbiAgcmV0dXJuIFwiIyBcIiArIGxpbmU7XG59XG5cbmV4cG9ydCBmdW5jdGlvbiBsaW5lVG9NdWx0aXBsZUNvbW1lbnQobGluZTogc3RyaW5nKSB7XG4gIHJldHVybiBgI1s9PT1bICR7bGluZX0gXT09PV1gO1xufVxuXG5leHBvcnQgZnVuY3Rpb24gZ2VuZXJhdGVkU2NyaXB0TmFtZUNvbW1lbnQoZmlsZW5hbWU6IHN0cmluZykge1xuICByZXR1cm4gbGluZVRvU2luZ2xDb21tZW50KFwiR2VuZXJhdGVkIGZyb20gXCIgKyBwYXRoLmJhc2VuYW1lKGZpbGVuYW1lKSk7XG59XG5cbmV4cG9ydCBkZWZhdWx0IHtcbiAgREVGQVVMVF9HRU5FUkFUT1IsXG4gIGNvbmZpZ3VyZSxcbiAgYnVpbGQsXG4gIGluc3RhbGwsXG4gIGN0ZXN0LFxuICBleHRyYWN0LFxufTtcbiIsIi8qXG4gKiBNSVQgTGljZW5zZVxuICpcbiAqIENvcHlyaWdodCAoYykgMjAyNSAgWXVyaWkgWWFrdWJpbiAoeXVyaWkueWFrdWJpbkBnbWFpbC5jb20pXG4gKlxuICogUGVybWlzc2lvbiBpcyBncmFudGVkIHRvIHVzZSwgY29weSwgbW9kaWZ5LCBhbmQgZGlzdHJpYnV0ZSB0aGlzIHNvZnR3YXJlXG4gKiB1bmRlciB0aGUgTUlUIExpY2Vuc2UuIFNlZSBMSUNFTlNFIGZpbGUgZm9yIGRldGFpbHMuXG4gKi9cblxuaW1wb3J0IGZzIGZyb20gXCJub2RlOmZzXCI7XG5pbXBvcnQgcGF0aCBmcm9tIFwibm9kZTpwYXRoXCI7XG5cbmV4cG9ydCBkZWZhdWx0IGFzeW5jIGZ1bmN0aW9uKG1rOiBhbnksIHBhcmFtczogYW55KSB7XG4gIGxldCBjb250ZW50ID0gYXdhaXQgZnMucHJvbWlzZXMucmVhZEZpbGUocGFyYW1zLmlucHV0LCBcInV0Zi04XCIpO1xuICBjb250ZW50ID0gY29udGVudC5yZXBsYWNlKC9AKFtfQS1aYS16XVtfQS1aYS16MC05XSspQC9nLCAobWF0Y2gsIHYxKSA9PiB7XG4gICAgY29uc3QgcmVzID0gcGFyYW1zW3YxXSB8fCBta1t2MV0gfHwgXCJcIjtcbiAgICBpZiAoQXJyYXkuaXNBcnJheShyZXMpKVxuICAgICAgcmV0dXJuIHJlcy5qb2luKFwiXFxuXCIpO1xuICAgIHJldHVybiByZXMudG9TdHJpbmcoKTtcbiAgfSk7XG4gIGNvbnRlbnQgPSBjb250ZW50LnJlcGxhY2UoLyNjbWFrZWRlZmluZSArKFtfQS1aYS16XVtfQS1aYS16MC05XSspICooLiopL2csIChtYXRjaCwgdjEsIHYyKSA9PiB7XG4gICAgcmV0dXJuIHBhcmFtc1t2MV0gfHwgbWtbdjFdID8gYCNkZWZpbmUgJHt2MX0gJHt2Mn1gIDogYC8qICN1bmRlZiAke3YxfSAqL2A7XG4gIH0pO1xuICBhd2FpdCBmcy5wcm9taXNlcy5ta2RpcihwYXRoLmRpcm5hbWUocGFyYW1zLm91dHB1dCksIHsgcmVjdXJzaXZlOiB0cnVlIH0pO1xuICBhd2FpdCBmcy5wcm9taXNlcy53cml0ZUZpbGUocGFyYW1zLm91dHB1dCwgY29udGVudCwgXCJ1dGYtOFwiKTtcbn1cbiIsIi8qXG4gKiBNSVQgTGljZW5zZVxuICpcbiAqIENvcHlyaWdodCAoYykgMjAyNSAgWXVyaWkgWWFrdWJpbiAoeXVyaWkueWFrdWJpbkBnbWFpbC5jb20pXG4gKlxuICogUGVybWlzc2lvbiBpcyBncmFudGVkIHRvIHVzZSwgY29weSwgbW9kaWZ5LCBhbmQgZGlzdHJpYnV0ZSB0aGlzIHNvZnR3YXJlXG4gKiB1bmRlciB0aGUgTUlUIExpY2Vuc2UuIFNlZSBMSUNFTlNFIGZpbGUgZm9yIGRldGFpbHMuXG4gKi9cblxuaW1wb3J0IGZzIGZyb20gXCJub2RlOmZzXCI7XG5pbXBvcnQgcGF0aCBmcm9tIFwibm9kZTpwYXRoXCI7XG5pbXBvcnQgeyBjcmVhdGVMb2dnZXIgfSBmcm9tIFwiQC9sb2dnZXJcIjtcblxuY29uc3QgbG9nZ2VyID0gY3JlYXRlTG9nZ2VyKGltcG9ydC5tZXRhLnVybCk7XG5cbmV4cG9ydCBkZWZhdWx0IGFzeW5jIGZ1bmN0aW9uKHBhcmFtczogYW55KSB7XG4gIGxvZ2dlci5pbmZvKFwiSW5zdGFsbGluZzogXCIgKyBwYXJhbXMuZGVzdCk7XG4gIGF3YWl0IGZzLnByb21pc2VzLm1rZGlyKHBhdGguZGlybmFtZShwYXJhbXMuZGVzdCksIHsgcmVjdXJzaXZlOiB0cnVlIH0pO1xuICBhd2FpdCBmcy5wcm9taXNlcy5jcChwYXJhbXMuc3JjLCBwYXJhbXMuZGVzdCwgeyBmb3JjZTogdHJ1ZSB9KTtcbn1cbiIsIi8qXG4gKiBNSVQgTGljZW5zZVxuICpcbiAqIENvcHlyaWdodCAoYykgMjAyNSAgWXVyaWkgWWFrdWJpbiAoeXVyaWkueWFrdWJpbkBnbWFpbC5jb20pXG4gKlxuICogUGVybWlzc2lvbiBpcyBncmFudGVkIHRvIHVzZSwgY29weSwgbW9kaWZ5LCBhbmQgZGlzdHJpYnV0ZSB0aGlzIHNvZnR3YXJlXG4gKiB1bmRlciB0aGUgTUlUIExpY2Vuc2UuIFNlZSBMSUNFTlNFIGZpbGUgZm9yIGRldGFpbHMuXG4gKi9cblxuaW1wb3J0IHsgRmlsZVBhdGgsIERpclBhdGggfSBmcm9tIFwiQC9jb3JlL1BhdGhcIjtcbmltcG9ydCB7IFNjb3BlSGVscGVyIH0gZnJvbSBcIkAvY29yZS9TY29wZVwiO1xuaW1wb3J0IHsgU3lzdGVtU2NvcGUgfSBmcm9tIFwiQC9jb3JlL1N5c3RlbVNjb3BlXCI7XG5cbmNvbnN0IFNDT1BFICAgICAgICA9IFN5bWJvbChcIlNDT1BFXCIpO1xuY29uc3QgTkFNRSAgICAgICAgID0gU3ltYm9sKFwiTkFNRVwiKTtcbmNvbnN0IFNDUklQVCAgICAgICA9IFN5bWJvbChcIlNDUklQVFwiKTtcbmNvbnN0IElOUFVUICAgICAgICA9IFN5bWJvbChcIklOUFVUXCIpO1xuY29uc3QgT1VUUFVUICAgICAgID0gU3ltYm9sKFwiT1VUUFVUXCIpO1xuY29uc3QgUEFSQU1TICAgICAgID0gU3ltYm9sKFwiUEFSQU1TXCIpO1xuY29uc3QgV09SS19ESVIgICAgID0gU3ltYm9sKFwiV09SS19ESVJcIik7XG5jb25zdCBWQVJJQUJMRVMgICAgPSBTeW1ib2woXCJWQVJJQUJMRVNcIik7XG5cbmV4cG9ydCBjbGFzcyBDdXN0b21TY3JpcHQge1xuICBwcml2YXRlIFtTQ09QRV06IFN5c3RlbVNjb3BlO1xuICBwcml2YXRlIFtOQU1FXTogc3RyaW5nIHwgbnVsbDtcbiAgcHJpdmF0ZSBbU0NSSVBUXTogRmlsZVBhdGggfCBGdW5jdGlvbjtcbiAgcHJpdmF0ZSBbSU5QVVRdOiBGaWxlUGF0aCB8IHVuZGVmaW5lZDtcbiAgcHJpdmF0ZSBbT1VUUFVUXTogRmlsZVBhdGg7XG4gIHByaXZhdGUgW1BBUkFNU106IG9iamVjdDtcbiAgcHJpdmF0ZSBbV09SS19ESVJdOiBEaXJQYXRoO1xuICBwcml2YXRlIFtWQVJJQUJMRVNdOiBvYmplY3Q7XG5cbiAgcHJpdmF0ZSBjb25zdHJ1Y3RvcihvcHRpb25zOiBDdXN0b21TY3JpcHQuT3B0aW9ucykge1xuICAgIHRoaXNbU0NPUEVdID0gb3B0aW9ucy5zY29wZTtcbiAgICB0aGlzW05BTUVdID0gb3B0aW9ucy5uYW1lIHx8IG51bGw7XG4gICAgdGhpc1tJTlBVVF0gPSBvcHRpb25zLmlucHV0O1xuICAgIHRoaXNbU0NSSVBUXSA9IG9wdGlvbnMuc2NyaXB0O1xuICAgIHRoaXNbT1VUUFVUXSA9IG9wdGlvbnMub3V0cHV0O1xuICAgIHRoaXNbUEFSQU1TXSA9IG9wdGlvbnMucGFyYW1zO1xuICAgIHRoaXNbV09SS19ESVJdID0gb3B0aW9ucy53b3JrRGlyO1xuICAgIHRoaXNbVkFSSUFCTEVTXSA9IG9wdGlvbnMudmFyaWFibGVzO1xuICB9XG5cbiAgcHVibGljIHN0YXRpYyBjcmVhdGUob3B0aW9uczogQ3VzdG9tU2NyaXB0Lk9wdGlvbnMpOiBDdXN0b21TY3JpcHQge1xuICAgIHJldHVybiBPYmplY3Quc2VhbChuZXcgQ3VzdG9tU2NyaXB0KG9wdGlvbnMpKTtcbiAgfVxuXG4gIHB1YmxpYyBtZXJnZVZhcmlhYmxlcyh2YXJpYWJsZXM6IGFueSkge1xuICAgIFNjb3BlSGVscGVyLm1lcmdlVmFyaWFibGVzKHRoaXNbVkFSSUFCTEVTXSwgdmFyaWFibGVzKTtcbiAgfVxuXG4gIHB1YmxpYyBnZXQgU0NSSVBUKCkge1xuICAgIHJldHVybiB0aGlzW1NDUklQVF07XG4gIH1cblxuICBwdWJsaWMgZ2V0IElOUFVUKCk6IEZpbGVQYXRoIHwgdW5kZWZpbmVkIHtcbiAgICByZXR1cm4gdGhpc1tJTlBVVF07XG4gIH1cblxuICBwdWJsaWMgZ2V0IE9VVFBVVCgpOiBGaWxlUGF0aCB7XG4gICAgcmV0dXJuIHRoaXNbT1VUUFVUXTtcbiAgfVxuXG4gIHB1YmxpYyBnZXQgUEFSQU1TKCk6IG9iamVjdCB7XG4gICAgcmV0dXJuIHRoaXNbUEFSQU1TXTtcbiAgfVxuXG4gIHB1YmxpYyBzZXQgUEFSQU1TKHZhbHVlOiBvYmplY3QpIHtcbiAgICB0aGlzW1BBUkFNU10gPSB2YWx1ZTtcbiAgfVxuXG4gIHB1YmxpYyBnZXQgd29ya0RpcigpOiBGaWxlUGF0aCB7XG4gICAgcmV0dXJuIHRoaXNbV09SS19ESVJdO1xuICB9XG5cbiAgcHVibGljIGdldCBWQVJJQUJMRVMoKSB7XG4gICAgcmV0dXJuIHRoaXNbVkFSSUFCTEVTXTtcbiAgfVxuXG4gIHB1YmxpYyBnZXQgU0NPUEUoKSB7XG4gICAgcmV0dXJuIHRoaXNbU0NPUEVdO1xuICB9XG5cbiAgcHVibGljIHRvSlNPTigpOiBvYmplY3Qge1xuICAgIHJldHVybiB7XG4gICAgICBTQ09QRTogdGhpc1tTQ09QRV0sXG4gICAgICBOQU1FOiB0aGlzW05BTUVdLFxuICAgICAgU0NSSVBUOiB0aGlzLlNDUklQVCxcbiAgICAgIElOUFVUOiB0aGlzLklOUFVULFxuICAgICAgT1VUUFVUOiB0aGlzLk9VVFBVVCxcbiAgICAgIFBBUkFNUzogdGhpcy5QQVJBTVMsXG4gICAgICBWQVJJQUJMRVM6IHRoaXMuVkFSSUFCTEVTLFxuICAgIH1cbiAgfVxufTtcblxuZXhwb3J0IG5hbWVzcGFjZSBDdXN0b21TY3JpcHQge1xuXG5leHBvcnQgaW50ZXJmYWNlIE9wdGlvbnMge1xuICBzY29wZTogU3lzdGVtU2NvcGUsXG4gIG5hbWU/OiBzdHJpbmcsXG4gIHBhcmFtczogYW55LFxuICBzY3JpcHQ6IEZpbGVQYXRoIHwgRnVuY3Rpb24sXG4gIGlucHV0PzogRmlsZVBhdGgsXG4gIG91dHB1dDogRmlsZVBhdGgsXG4gIHdvcmtEaXI6IERpclBhdGgsXG4gIHZhcmlhYmxlczogb2JqZWN0O1xufTtcblxufSAvLyBuYW1lc3BhY2UgQ3VzdG9tU2NyaXB0XG4iLCIvKlxuICogTUlUIExpY2Vuc2VcbiAqXG4gKiBDb3B5cmlnaHQgKGMpIDIwMjUgIFl1cmlpIFlha3ViaW4gKHl1cmlpLnlha3ViaW5AZ21haWwuY29tKVxuICpcbiAqIFBlcm1pc3Npb24gaXMgZ3JhbnRlZCB0byB1c2UsIGNvcHksIG1vZGlmeSwgYW5kIGRpc3RyaWJ1dGUgdGhpcyBzb2Z0d2FyZVxuICogdW5kZXIgdGhlIE1JVCBMaWNlbnNlLiBTZWUgTElDRU5TRSBmaWxlIGZvciBkZXRhaWxzLlxuICovXG5cbmZ1bmN0aW9uIGNvbnZlcnRWYWx1ZVRvRGVmaW5pdGlvbih2YWx1ZTogYW55KTogc3RyaW5nIHtcbiAgaWYgKHZhbHVlID09PSB1bmRlZmluZWQpXG4gICAgdGhyb3cgYERlZmluaXRpb24gdW5kZWZpbmVkYDtcbiAgaWYgKHR5cGVvZiB2YWx1ZSA9PT0gXCJvYmplY3RcIilcbiAgICByZXR1cm4gJ1wiJyArIEpTT04uc3RyaW5naWZ5KHZhbHVlKSArICdcIic7XG4gIHJldHVybiB2YWx1ZS50b1N0cmluZygpO1xufVxuXG5leHBvcnQgZnVuY3Rpb24gbm9ybWFsaXplRGVmaW5pdGlvbnMoLi4uZGVmaW5pdGlvbnM6IGFueVtdKTogc3RyaW5nW10ge1xuICBjb25zdCByZXN1bHQgPSBbXTtcbiAgZm9yIChjb25zdCBpdGVyIG9mIGRlZmluaXRpb25zKSB7XG4gICAgaWYgKHR5cGVvZiBpdGVyID09PSBcInN0cmluZ1wiKVxuICAgICAgcmVzdWx0LnB1c2goaXRlcik7XG4gICAgZWxzZSBpZiAoIWl0ZXIpXG4gICAgICB0aHJvdyBuZXcgRXJyb3IoYERlZmVuaXRpb24gJHtpdGVyfSBub3Qgc3VwcG9ydGVkYClcbiAgICBlbHNlIGlmIChBcnJheS5pc0FycmF5KGl0ZXIpKSB7XG4gICAgICBmb3IgKGNvbnN0IHZhbCBvZiBpdGVyKVxuICAgICAgICByZXN1bHQucHVzaChjb252ZXJ0VmFsdWVUb0RlZmluaXRpb24odmFsKSk7XG4gICAgfVxuICAgIGVsc2UgaWYgKHR5cGVvZiBpdGVyID09PSBcIm9iamVjdFwiKSB7XG4gICAgICBmb3IgKGNvbnN0IFtrZXksIHZhbF0gb2YgT2JqZWN0LmVudHJpZXMoaXRlcikpXG4gICAgICAgIHJlc3VsdC5wdXNoKGAke2tleX09JHtjb252ZXJ0VmFsdWVUb0RlZmluaXRpb24odmFsKX1gKTtcbiAgICB9XG4gICAgZWxzZVxuICAgICAgdGhyb3cgbmV3IEVycm9yKGBEZWZlbml0aW9uICR7aXRlcn0gbm90IHN1cHBvcnRlZGApXG4gIH1cbiAgcmV0dXJuIHJlc3VsdDtcbn1cbiIsIi8qXG4gKiBNSVQgTGljZW5zZVxuICpcbiAqIENvcHlyaWdodCAoYykgMjAyNSAgWXVyaWkgWWFrdWJpbiAoeXVyaWkueWFrdWJpbkBnbWFpbC5jb20pXG4gKlxuICogUGVybWlzc2lvbiBpcyBncmFudGVkIHRvIHVzZSwgY29weSwgbW9kaWZ5LCBhbmQgZGlzdHJpYnV0ZSB0aGlzIHNvZnR3YXJlXG4gKiB1bmRlciB0aGUgTUlUIExpY2Vuc2UuIFNlZSBMSUNFTlNFIGZpbGUgZm9yIGRldGFpbHMuXG4gKi9cblxuaW1wb3J0IHsgZmluZFByb2dyYW0gfSBmcm9tIFwiQC9jb3JlL0ZpbmRQcm9ncmFtXCI7XG5pbXBvcnQgeyBTeXN0ZW1TY29wZSB9IGZyb20gXCJAL2NvcmUvU3lzdGVtU2NvcGVcIjtcbmltcG9ydCB7IGNyZWF0ZUxvZ2dlciB9IGZyb20gXCJAL2xvZ2dlclwiO1xuXG5jb25zdCBsb2dnZXIgPSBjcmVhdGVMb2dnZXIoaW1wb3J0Lm1ldGEudXJsKTtcblxuZXhwb3J0IGFzeW5jIGZ1bmN0aW9uIGRldGVybWluZUNvbXBpbGVyKHNjb3BlOiBTeXN0ZW1TY29wZSkge1xuICBjb25zdCBjbGFuZ1BhdGggPSBhd2FpdCBmaW5kUHJvZ3JhbShcImNsYW5nXCIpO1xuICBpZiAoY2xhbmdQYXRoKSB7XG4gICAgbG9nZ2VyLmluZm8oXCJUaGUgQyBjb21waWxlciBpZGVudGlmaWNhdGlvbiBpcyBDbGFuZyBhLmIuY1wiKTtcbiAgICBzY29wZS5BU01fQ09NUElMRVIgPSBcImNsYW5nXCI7XG4gICAgc2NvcGUuQ19DT01QSUxFUiA9IFwiY2xhbmdcIjtcbiAgICBzY29wZS5DWFhfQ09NUElMRVIgPSBcImNsYW5nKytcIjtcbiAgICBzY29wZS5BUiA9IFwibGx2bS1hclwiO1xuICAgIHNjb3BlLlJBTkxJQiA9IFwibGx2bS1yYW5saWJcIjtcbiAgICBzY29wZS5MSU5LRVIgPSBcImxsZFwiO1xuICAgIHNjb3BlLk5NID0gXCJsbHZtLW5tXCI7XG4gICAgc2NvcGUuT0JKQ09QWSA9IFwibGx2bS1vYmpjb3B5XCI7XG4gICAgc2NvcGUuT0JKRFVNUCA9IFwibGx2bS1vYmpkdW1wXCI7XG4gICAgc2NvcGUuU1RSSVAgPSBcImxsdm0tc3RyaXBcIjtcbiAgICByZXR1cm47XG4gIH1cblxuICBjb25zdCBnY2NQYXRoID0gYXdhaXQgZmluZFByb2dyYW0oXCJnY2NcIik7XG4gIGlmIChnY2NQYXRoKSB7XG4gICAgbG9nZ2VyLmluZm8oXCJUaGUgQyBjb21waWxlciBpZGVudGlmaWNhdGlvbiBpcyBHTlUgYS5iLmNcIik7XG4gICAgc2NvcGUuQVNNX0NPTVBJTEVSID0gXCJnY2NcIjtcbiAgICBzY29wZS5DX0NPTVBJTEVSID0gXCJnY2NcIjtcbiAgICBzY29wZS5DWFhfQ09NUElMRVIgPSBcImcrK1wiO1xuICAgIHNjb3BlLkFSID0gXCJhclwiO1xuICAgIHNjb3BlLlJBTkxJQiA9IFwicmFubGliXCI7XG4gICAgc2NvcGUuTElOS0VSID0gXCJsZFwiO1xuICAgIHNjb3BlLk5NID0gXCJubVwiO1xuICAgIHNjb3BlLk9CSkNPUFkgPSBcIm9iamNvcHlcIjtcbiAgICBzY29wZS5PQkpEVU1QID0gXCJvYmpkdW1wXCI7XG4gICAgc2NvcGUuU1RSSVAgPSBcInN0cmlwXCI7XG4gICAgcmV0dXJuO1xuICB9XG5cbiAgdGhyb3cgYENhbiBub3QgZGV0ZXJtaW5lIGNvbXBpbGVyYDtcbn1cbiIsIi8qXG4gKiBNSVQgTGljZW5zZVxuICpcbiAqIENvcHlyaWdodCAoYykgMjAyNSAgWXVyaWkgWWFrdWJpbiAoeXVyaWkueWFrdWJpbkBnbWFpbC5jb20pXG4gKlxuICogUGVybWlzc2lvbiBpcyBncmFudGVkIHRvIHVzZSwgY29weSwgbW9kaWZ5LCBhbmQgZGlzdHJpYnV0ZSB0aGlzIHNvZnR3YXJlXG4gKiB1bmRlciB0aGUgTUlUIExpY2Vuc2UuIFNlZSBMSUNFTlNFIGZpbGUgZm9yIGRldGFpbHMuXG4gKi9cblxuaW1wb3J0IG9zIGZyb20gXCJub2RlOm9zXCI7XG5pbXBvcnQgcGF0aCBmcm9tIFwibm9kZTpwYXRoXCI7XG5cbmltcG9ydCB7IGZpbGVFeGlzdHMsIGZpbGVFeGlzdHNTeW5jIH0gZnJvbSBcIkAvdXRpbHMvRmlsZVN5c3RlbVwiO1xuXG5mdW5jdGlvbiBwb3NzaWJsZVByb2dyYW1MaXN0KG5hbWU6IHN0cmluZykge1xuICBpZiAob3MucGxhdGZvcm0oKSA9PT0gXCJ3aW4zMlwiICYmICFuYW1lLmVuZHNXaXRoKFwiLmV4ZVwiKSlcbiAgICBuYW1lICs9IFwiLmV4ZVwiO1xuXG4gIGNvbnN0IHJlc3VsdCA9IFtdO1xuICBjb25zdCBwYXRocyA9IChwcm9jZXNzLmVudi5QQVRIIHx8IFwiXCIpLnNwbGl0KHBhdGgucG9zaXguZGVsaW1pdGVyKTtcbiAgZm9yIChjb25zdCBpdGVyIG9mIHBhdGhzKSB7XG4gICAgY29uc3QgZmlsZW5hbWUgPSBwYXRoLnBvc2l4LnJlc29sdmUoaXRlciwgbmFtZSk7XG4gICAgcmVzdWx0LnB1c2goZmlsZW5hbWUpO1xuICB9XG5cbiAgcmV0dXJuIHJlc3VsdDtcbn1cblxuZXhwb3J0IGFzeW5jIGZ1bmN0aW9uIGZpbmRQcm9ncmFtKG5hbWU6IHN0cmluZyk6IFByb21pc2U8c3RyaW5nIHwgdW5kZWZpbmVkPiB7XG4gIGZvciAoY29uc3QgaXRlciBvZiBwb3NzaWJsZVByb2dyYW1MaXN0KG5hbWUpKSB7XG4gICAgaWYgKGF3YWl0IGZpbGVFeGlzdHMoaXRlcikpXG4gICAgICByZXR1cm4gaXRlcjtcbiAgfVxuICByZXR1cm4gdW5kZWZpbmVkO1xufVxuXG5leHBvcnQgZnVuY3Rpb24gZmluZFByb2dyYW1TeW5jKG5hbWU6IHN0cmluZyk6IHN0cmluZyB8IHVuZGVmaW5lZCB7XG4gIGZvciAoY29uc3QgaXRlciBvZiBwb3NzaWJsZVByb2dyYW1MaXN0KG5hbWUpKSB7XG4gICAgaWYgKGZpbGVFeGlzdHNTeW5jKGl0ZXIpKVxuICAgICAgcmV0dXJuIGl0ZXI7XG4gIH1cbiAgcmV0dXJuIHVuZGVmaW5lZDtcbn1cbiIsIi8qXG4gKiBNSVQgTGljZW5zZVxuICpcbiAqIENvcHlyaWdodCAoYykgMjAyNSAgWXVyaWkgWWFrdWJpbiAoeXVyaWkueWFrdWJpbkBnbWFpbC5jb20pXG4gKlxuICogUGVybWlzc2lvbiBpcyBncmFudGVkIHRvIHVzZSwgY29weSwgbW9kaWZ5LCBhbmQgZGlzdHJpYnV0ZSB0aGlzIHNvZnR3YXJlXG4gKiB1bmRlciB0aGUgTUlUIExpY2Vuc2UuIFNlZSBMSUNFTlNFIGZpbGUgZm9yIGRldGFpbHMuXG4gKi9cblxuaW1wb3J0IG9zIGZyb20gXCJub2RlOm9zXCI7XG5cbmV4cG9ydCBmdW5jdGlvbiBnZXRTaXplb2ZWb2lkcCgpIHtcbiAgY29uc3Qgc2l6ZW9mVm9pZHBCaXRzOiBhbnkgPVxuICB7XG4gICAgYXJtOiAgICAgNCxcbiAgICBhcm02NDogICA4LFxuICAgIGlhMzI6ICAgIDQsXG4gICAgbG9vbmc2NDogOCxcbiAgICBtaXBzOiAgICA0LFxuICAgIG1pcHNlbDogIDQsXG4gICAgcHBjOiAgICAgNCxcbiAgICBwcGM2NDogICA4LFxuICAgIHJpc2N2NjQ6IDgsXG4gICAgczM5MDogICAgNCxcbiAgICBzMzkweDogICA4LFxuICAgIHg2NDogICAgIDQsXG4gIH07XG4gIGNvbnN0IHJlc3VsdCA9IHNpemVvZlZvaWRwQml0c1tvcy5hcmNoKCldO1xuICBpZiAoIXJlc3VsdClcbiAgICB0aHJvdyBuZXcgRXJyb3IoYFVua25vd24gJHtvcy5hcmNoKCl9IGFyY2hgKTtcbiAgcmV0dXJuIHJlc3VsdDtcbn1cbiIsIi8qXG4gKiBNSVQgTGljZW5zZVxuICpcbiAqIENvcHlyaWdodCAoYykgMjAyNSAgWXVyaWkgWWFrdWJpbiAoeXVyaWkueWFrdWJpbkBnbWFpbC5jb20pXG4gKlxuICogUGVybWlzc2lvbiBpcyBncmFudGVkIHRvIHVzZSwgY29weSwgbW9kaWZ5LCBhbmQgZGlzdHJpYnV0ZSB0aGlzIHNvZnR3YXJlXG4gKiB1bmRlciB0aGUgTUlUIExpY2Vuc2UuIFNlZSBMSUNFTlNFIGZpbGUgZm9yIGRldGFpbHMuXG4gKi9cblxuaW1wb3J0IGZzIGZyb20gXCJub2RlOmZzXCI7XG5cbmltcG9ydCB7IEFMTF9UQVJHRVQsIElOU1RBTExfVEFSR0VUIH0gZnJvbSBcIkAvQ29uc3RhbnRzXCI7XG5pbXBvcnQgeyBGaWxlUGF0aCwgRGlyUGF0aCwgQWJzb2x1dGVQYXRoIH0gZnJvbSBcIkAvY29yZS9QYXRoXCI7XG5pbXBvcnQgeyBmaWxlRXhpc3RzLCBmaWxlRXhpc3RzU3luYyB9IGZyb20gXCJAL3V0aWxzL0ZpbGVTeXN0ZW1cIjtcbmltcG9ydCB7IFRhcmdldENvbGxlY3Rpb24gfSBmcm9tIFwiQC9jb3JlLy9UYXJnZXRDb2xsZWN0aW9uXCI7XG5pbXBvcnQgeyBTY3JpcHRDb2xsZWN0aW9uIH0gZnJvbSBcIkAvY29yZS9TY3JpcHRDb2xsZWN0aW9uXCI7XG5pbXBvcnQgeyBJbnRlcmZhY2VUYXJnZXQgfSBmcm9tIFwiQC9jb3JlL0ludGVyZmFjZVRhcmdldFwiO1xuaW1wb3J0IHsgVW5rbm93blRhcmdldCB9IGZyb20gXCJAL2NvcmUvVW5rbm93blRhcmdldFwiO1xuaW1wb3J0IHsgR29hbENvbGxlY3Rpb24gfSBmcm9tIFwiQC9jb3JlL0dvYWxDb2xsZWN0aW9uXCI7XG5pbXBvcnQgeyBJbnRlcmZhY2VPYmplY3RzIH0gZnJvbSBcIkAvY29yZS9JbnRlcmZhY2VPYmplY3RzXCI7XG5pbXBvcnQgeyBJbnRlcmZhY2VTY3JpcHQgfSBmcm9tIFwiQC9jb3JlL0ludGVyZmFjZVNjcmlwdFwiO1xuaW1wb3J0IHsgU291cmNlRmlsZSB9IGZyb20gXCJAL2NvcmUvU291cmNlRmlsZVwiO1xuaW1wb3J0IHsgTWFrZUNvbnRleHQgfSBmcm9tIFwiQC9jb3JlL01ha2VDb250ZXh0XCI7XG5pbXBvcnQgeyBPYmplY3RMaWJyYXJ5LCBTdGF0aWNMaWJyYXJ5LCBTaGFyZWRMaWJyYXJ5LCBFeGVjdXRhYmxlIH0gZnJvbSBcIkAvY29yZS9UYXJnZXRcIjtcbmltcG9ydCB7IFNjb3BlSGVscGVyIH0gZnJvbSBcIkAvY29yZS9TY29wZVwiO1xuaW1wb3J0IHsgU3lzdGVtU2NvcGUgfSBmcm9tIFwiQC9jb3JlL1N5c3RlbVNjb3BlXCI7XG5pbXBvcnQgeyBpbXBvcnRNb2R1bGUgfSBmcm9tIFwiQC91dGlscy9Nb2R1bGVcIjtcbmltcG9ydCB7IGNyZWF0ZUxvZ2dlciB9IGZyb20gXCJAL2xvZ2dlclwiO1xuaW1wb3J0IHsgSW5zdGFsbEVudGl0eSB9IGZyb20gXCJAL2NvcmUvSW5zdGFsbEVudGl0eVwiO1xuaW1wb3J0IHsgQ3VzdG9tU2NyaXB0IH0gZnJvbSBcIkAvY29yZS9DdXN0b21TY3JpcHRcIjtcbmltcG9ydCB7IFNjcmlwdENvbnRleHQgfSBmcm9tIFwiQC9jb3JlL1NjcmlwdENvbnRleHRcIjtcblxuaW1wb3J0IGNvbmZpZ3VyZV9maWxlIGZyb20gXCJAL2NvcmUvQnVpbGRpblNjcmlwdHMvY29uZmlndXJlX2ZpbGVcIjtcbmltcG9ydCBpbnN0YWxsX3NjcmlwdCBmcm9tIFwiQC9jb3JlL0J1aWxkaW5TY3JpcHRzL2luc3RhbGxfc2NyaXB0XCI7XG5cbmNvbnN0IGxvZ2dlciA9IGNyZWF0ZUxvZ2dlcihpbXBvcnQubWV0YS51cmwpO1xuXG5jb25zdCByZXF1aXJlSW1wbCA9IGV2YWwoXCJyZXF1aXJlXCIpO1xuXG5jb25zdCBUQVJHRVRTID0gU3ltYm9sKFwiVEFSR0VUU1wiKTtcbmNvbnN0IENVU1RPTV9TQ1JJUFRTID0gU3ltYm9sKFwiQ1VTVE9NX1NDUklQVFNcIik7XG5jb25zdCBDQUNIRSA9IFN5bWJvbChcIkNBQ0hFXCIpO1xuY29uc3QgVU5LTk9XTl9UQVJHRVRTID0gU3ltYm9sKFwiVU5LTk9XTl9UQVJHRVRTXCIpO1xuY29uc3QgSU5URVJGQUNFX1NDUklQVFMgPSBTeW1ib2woXCJJTlRFUkZBQ0VfU0NSSVBUU1wiKTtcbmNvbnN0IElOU1RBTExfTElTVCA9IFN5bWJvbChcIklOU1RBTExfTElTVFwiKTtcbmNvbnN0IFNDUklQVF9WQVJJQUJMRVNfTUFQID0gU3ltYm9sKFwiU0NSSVBUX1ZBUklBQkxFU19NQVBcIik7XG5jb25zdCBTVUJESVJfQUxJQVMgPSBTeW1ib2woXCJTVUJESVJfQUxJQVNcIik7XG5jb25zdCBTVUJESVJfTElTVCA9IFN5bWJvbChcIlNVQkRJUl9MSVNUXCIpO1xuY29uc3QgQlVJTFRJTl9TQ1JJUFRTID0gU3ltYm9sKFwiQlVJTFRJTl9TQ1JJUFRTXCIpO1xuXG50eXBlIFVua25vd25UYXJnZXRzID0ge1xuICBbbmFtZTogc3RyaW5nXTogVW5rbm93blRhcmdldDtcbn07XG5cbnR5cGUgU3ViZGlyZWN0b3J5QWxpYXMgPSB7XG4gIFtuYW1lOiBzdHJpbmddOiBEaXJQYXRoO1xufTtcblxudHlwZSBJbnRlcmZhY2VTY3JpcHRzID0ge1xuICBbbmFtZTogc3RyaW5nXTogSW50ZXJmYWNlU2NyaXB0O1xufTtcblxudHlwZSBDYWNoZVZhcmlhYmxlRGVzY3JpcHRvciA9IHtcbiAgdHlwZT86IGFueTtcbiAgdmFsdWU/OiBhbnk7XG4gIGRlc2NyaXB0aW9uPzogc3RyaW5nO1xufTtcblxudHlwZSBDYWNoZVZhcmlhYmxlRGVzY3JpcHRvcnMgPSB7XG4gIFtuYW1lOiBzdHJpbmddOiBDYWNoZVZhcmlhYmxlRGVzY3JpcHRvcjtcbn07XG5cbnR5cGUgQnVpbGRpblNjcmlwdHMgPSB7XG4gIFtuYW1lOiBzdHJpbmddOiBGdW5jdGlvbjtcbn07XG5cbmZ1bmN0aW9uIGVuc3VyZVZhbHVlQnlUeXBlKHR5cGU6IGFueSwgdmFsdWU6IGFueSkge1xuICBpZiAoQXJyYXkuaXNBcnJheSh0eXBlKSA/IHR5cGUuaW5jbHVkZXModmFsdWUpIDogdHlwZW9mIHZhbHVlID09PSB0eXBlKVxuICAgIHJldHVybiB2YWx1ZTtcbiAgdGhyb3cgbmV3IEVycm9yKGBUaGUgJyR7dmFsdWV9JyBpcyBub3QgYSAke3R5cGV9YCk7XG59XG5cbmZ1bmN0aW9uIHNjb3BlVmFsdWVBc1ByaW1pdGl2ZXMobzogYW55KTogYW55IHtcbiAgaWYgKHR5cGVvZiBvID09PSBcInVuZGVmaW5lZFwiKVxuICAgIHJldHVybiBvO1xuICBpZiAodHlwZW9mIG8gPT09IFwiYm9vbGVhblwiKVxuICAgIHJldHVybiBvO1xuICBpZiAodHlwZW9mIG8gPT09IFwibnVtYmVyXCIpXG4gICAgcmV0dXJuIG87XG4gIGlmICh0eXBlb2YgbyA9PT0gXCJzdHJpbmdcIilcbiAgICByZXR1cm4gbztcbiAgaWYgKHR5cGVvZiBvID09PSBcIm9iamVjdFwiKSB7XG4gICAgaWYgKCFvKVxuICAgICAgcmV0dXJuIG87XG4gICAgaWYgKG8gaW5zdGFuY2VvZiBBYnNvbHV0ZVBhdGgpIHtcbiAgICAgIHJldHVybiBvLnRvU3RyaW5nKCk7XG4gICAgfVxuICAgIGlmIChvIGluc3RhbmNlb2YgQXJyYXkpIHtcbiAgICAgIGNvbnN0IHJlc3VsdCA9IFtdO1xuICAgICAgZm9yIChjb25zdCBpIG9mIG8pXG4gICAgICAgIHJlc3VsdC5wdXNoKHNjb3BlVmFsdWVBc1ByaW1pdGl2ZXMoaSkpO1xuICAgICAgcmV0dXJuIHJlc3VsdDtcbiAgICB9XG4gICAgaWYgKG8gaW5zdGFuY2VvZiBPYmplY3QpIHtcbiAgICAgIGNvbnN0IHJlc3VsdDogYW55ID0ge307XG4gICAgICBmb3IgKGNvbnN0IFtrLHZdIG9mIE9iamVjdC5lbnRyaWVzKG8pKVxuICAgICAgICByZXN1bHRba10gPSBzY29wZVZhbHVlQXNQcmltaXRpdmVzKHYpO1xuICAgICAgcmV0dXJuIHJlc3VsdDtcbiAgICB9XG4gIH1cbiAgdGhyb3cgbmV3IEVycm9yKGBVbmtub3duIGluc3RhbmNlIG9mICR7b31gKTtcbn1cblxuZXhwb3J0IGNsYXNzIEdsb2JhbENvbnRleHQge1xuICBwcml2YXRlIFtUQVJHRVRTXTogVGFyZ2V0Q29sbGVjdGlvbjtcbiAgcHJpdmF0ZSBbQ1VTVE9NX1NDUklQVFNdOiBTY3JpcHRDb2xsZWN0aW9uO1xuICBwcml2YXRlIFtDQUNIRV06IENhY2hlVmFyaWFibGVEZXNjcmlwdG9ycztcbiAgcHJpdmF0ZSBbVU5LTk9XTl9UQVJHRVRTXTogVW5rbm93blRhcmdldHM7XG4gIHByaXZhdGUgW0lOVEVSRkFDRV9TQ1JJUFRTXTogSW50ZXJmYWNlU2NyaXB0cztcbiAgcHJpdmF0ZSBbSU5TVEFMTF9MSVNUXTogSW5zdGFsbEVudGl0eVtdO1xuICBwcml2YXRlIFtTQ1JJUFRfVkFSSUFCTEVTX01BUF06IGFueTtcbiAgcHJpdmF0ZSBbU1VCRElSX0FMSUFTXTogU3ViZGlyZWN0b3J5QWxpYXM7XG4gIHByaXZhdGUgW1NVQkRJUl9MSVNUXTogU3lzdGVtU2NvcGVbXTtcbiAgcHJpdmF0ZSBbQlVJTFRJTl9TQ1JJUFRTXTogQnVpbGRpblNjcmlwdHM7XG5cbiAgcHJpdmF0ZSBjb25zdHJ1Y3RvcigpIHtcbiAgICB0aGlzW1RBUkdFVFNdID0gVGFyZ2V0Q29sbGVjdGlvbi5jcmVhdGUoKTtcbiAgICB0aGlzW0NVU1RPTV9TQ1JJUFRTXSA9IFNjcmlwdENvbGxlY3Rpb24uY3JlYXRlKCk7XG4gICAgdGhpc1tDQUNIRV0gPSB7fTtcbiAgICB0aGlzW1VOS05PV05fVEFSR0VUU10gPSB7fTtcbiAgICB0aGlzW0lOVEVSRkFDRV9TQ1JJUFRTXSA9IHt9O1xuICAgIHRoaXNbSU5TVEFMTF9MSVNUXSA9IFtdO1xuICAgIHRoaXNbU0NSSVBUX1ZBUklBQkxFU19NQVBdID0ge307XG4gICAgdGhpc1tTVUJESVJfQUxJQVNdID0ge307XG4gICAgdGhpc1tTVUJESVJfTElTVF0gPSBbXTtcbiAgICB0aGlzW0JVSUxUSU5fU0NSSVBUU10gPSB7XG4gICAgICBjb25maWd1cmVfZmlsZSxcbiAgICAgIGluc3RhbGxfc2NyaXB0LFxuICAgIH07XG4gIH1cblxuICBwdWJsaWMgc3RhdGljIGNyZWF0ZSgpIHtcbiAgICByZXR1cm4gT2JqZWN0LnNlYWwobmV3IEdsb2JhbENvbnRleHQpO1xuICB9XG5cbiAgcHVibGljIGdldCBUQVJHRVRTKCkge1xuICAgIHJldHVybiB0aGlzW1RBUkdFVFNdO1xuICB9XG5cbiAgcHVibGljIGdldCBDQUNIRSgpIHtcbiAgICByZXR1cm4gdGhpc1tDQUNIRV07XG4gIH1cblxuICBwdWJsaWMgZ2V0IFVOS05PV05fVEFSR0VUUygpIHtcbiAgICByZXR1cm4gdGhpc1tVTktOT1dOX1RBUkdFVFNdO1xuICB9XG5cbiAgcHVibGljIGdldCBJTlRFUkZBQ0VfU0NSSVBUUygpIHtcbiAgICByZXR1cm4gdGhpc1tJTlRFUkZBQ0VfU0NSSVBUU107XG4gIH1cblxuICBwdWJsaWMgZ2V0IFNDUklQVF9WQVJJQUJMRVNfTUFQKCkge1xuICAgIHJldHVybiB0aGlzW1NDUklQVF9WQVJJQUJMRVNfTUFQXTtcbiAgfVxuXG4gIHB1YmxpYyBnZXQgU1VCRElSX0FMSUFTKCkge1xuICAgIHJldHVybiB0aGlzW1NVQkRJUl9BTElBU107XG4gIH1cbiAgXG4gIHB1YmxpYyBhZGRDdXN0b21TY3JpcHQoc2NvcGU6IFN5c3RlbVNjb3BlLCBzY3JpcHQ6IGFueSwgcGFyYW1zOiBhbnkpOiBDdXN0b21TY3JpcHQge1xuICAgIGlmICghcGFyYW1zKVxuICAgICAgdGhyb3cgbmV3IEVycm9yKFwiQXJndW1lbnQgd2l0aCBwYXJhbWV0ZXJzIGlzIG1pc3NpbmdcIik7XG5cbiAgICBjb25zdCBzb3VyY2VEaXIgPSBzY29wZS5TT1VSQ0VfRElSO1xuICAgIGNvbnN0IGJpbmFyeURpciA9IHNjb3BlLkJJTkFSWV9ESVI7XG5cbiAgICBsZXQgc2NyaXB0T2JqOiBGdW5jdGlvbiB8IEZpbGVQYXRoIHwgdW5kZWZpbmVkO1xuICAgIGlmICh0eXBlb2Ygc2NyaXB0ID09PSBcInN0cmluZ1wiKVxuICAgICAgc2NyaXB0T2JqID0gdGhpcy5maW5kU2NyaXB0RnVuY3Rpb24oc2NyaXB0KTtcbiAgICBpZiAoIXNjcmlwdE9iailcbiAgICAgIHNjcmlwdE9iaiA9IEZpbGVQYXRoLmNyZWF0ZShzb3VyY2VEaXIucmVzb2x2ZShzY3JpcHQpKTtcblxuICAgIGxldCBpbnB1dEZpbGUgPSBwYXJhbXMuaW5wdXQ7XG4gICAgaWYgKGlucHV0RmlsZSlcbiAgICAgIGlucHV0RmlsZSA9IEZpbGVQYXRoLmNyZWF0ZShzb3VyY2VEaXIucmVzb2x2ZShpbnB1dEZpbGUpKTtcblxuICAgIGlmICghcGFyYW1zLm91dHB1dClcbiAgICAgIHRocm93IG5ldyBFcnJvcihcIkN1c3RvbVNjcmlwdCBwYXJhbWV0ZXJzIHJlcXVpcmVkIG91dHB1dCBlbnRpdHlcIik7XG4gICAgY29uc3Qgb3V0cHV0RmlsZSA9IEZpbGVQYXRoLmNyZWF0ZShzb3VyY2VEaXIucmVzb2x2ZShwYXJhbXMub3V0cHV0KSk7XG5cbiAgICBjb25zdCBvcHRpb25zOiBDdXN0b21TY3JpcHQuT3B0aW9ucyA9IHtcbiAgICAgIHNjb3BlLFxuICAgICAgbmFtZTogcGFyYW1zLm5hbWUsXG4gICAgICBzY3JpcHQ6IHNjcmlwdE9iaixcbiAgICAgIHBhcmFtcyxcbiAgICAgIG91dHB1dDogb3V0cHV0RmlsZSxcbiAgICAgIGlucHV0OiBpbnB1dEZpbGUsXG4gICAgICB3b3JrRGlyOiBiaW5hcnlEaXIsXG4gICAgICB2YXJpYWJsZXM6IHBhcmFtcy52YXJpYWJsZXMgfHwge30sXG4gICAgfTtcblxuICAgIGNvbnN0IHRhcmdldCA9IEN1c3RvbVNjcmlwdC5jcmVhdGUob3B0aW9ucyk7XG4gICAgaWYgKG9wdGlvbnMubmFtZSlcbiAgICAgIHRoaXNbQ1VTVE9NX1NDUklQVFNdLnNldChvcHRpb25zLm5hbWUsIHRhcmdldCk7XG4gICAgZWxzZVxuICAgICAgdGhpc1tDVVNUT01fU0NSSVBUU10uYWRkKHRhcmdldCk7XG5cbiAgICByZXR1cm4gdGFyZ2V0O1xuICB9XG5cbiAgcHVibGljIGdldFVrbm93blRhcmdldChuYW1lOiBzdHJpbmcpOiBVbmtub3duVGFyZ2V0IHtcbiAgICBsZXQgdGFyZ2V0ID0gdGhpc1tVTktOT1dOX1RBUkdFVFNdW25hbWVdO1xuICAgIGlmICghdGFyZ2V0KSB7XG4gICAgICB0aGlzW1VOS05PV05fVEFSR0VUU11bbmFtZV0gPSB0YXJnZXQgPSBVbmtub3duVGFyZ2V0LmNyZWF0ZShuYW1lKTtcbiAgICB9XG4gICAgcmV0dXJuIHRhcmdldDtcbiAgfVxuXG4gIHB1YmxpYyByZWdpc3RlclN5c3RlbVNjb3BlKG5hbWU6IHN0cmluZywgc2NvcGU6IFN5c3RlbVNjb3BlKSB7XG4gICAgaWYgKHRoaXNbU0NSSVBUX1ZBUklBQkxFU19NQVBdW25hbWVdKVxuICAgICAgdGhyb3cgbmV3IEVycm9yKGBTeXN0ZW1WYXJpYWJsZXMgZXhpc3RzIGZvciAke25hbWV9YCk7XG4gICAgdGhpc1tTQ1JJUFRfVkFSSUFCTEVTX01BUF1bbmFtZV0gPSBzY29wZTtcbiAgfVxuXG4gIHB1YmxpYyByZXNvbHZlU3ViZGlyZWN0b3J5KHBhdGg6IEFic29sdXRlUGF0aCB8IHN0cmluZykge1xuICAgIGNvbnN0IHJlc29sdmVkUGF0aCA9IHRoaXNbU1VCRElSX0FMSUFTXVtwYXRoLnRvU3RyaW5nKCldO1xuICAgIHJldHVybiByZXNvbHZlZFBhdGggfHwgcGF0aDtcbiAgfVxuXG4gIHB1YmxpYyBhZGRTdWJkaXJlY3RvcnlBbGlhcyhzcmM6IERpclBhdGgsIGRlc3Q6IERpclBhdGgpIHtcbiAgICBjb25zdCBzcmNTdHIgPSBzcmMudG9TdHJpbmcoKTtcbiAgICBpZiAodGhpc1tTVUJESVJfQUxJQVNdLmhhc093blByb3BlcnR5KHNyY1N0cikpXG4gICAgICBsb2dnZXIud2FybihgT3dlcnJpZGUgXCIke3NyY1N0cn1cIiBzdWJkaXJlY3RvcnkgYWxpYXNgKTtcbiAgICB0aGlzW1NVQkRJUl9BTElBU11bc3JjU3RyXSA9IGRlc3Q7XG4gIH1cblxuICBwdWJsaWMgYWRkSW5zdGFsbEVudHJ5KGVudHJ5OiBJbnN0YWxsRW50aXR5KSB7XG4gICAgcmV0dXJuIHRoaXNbSU5TVEFMTF9MSVNUXS5wdXNoKGVudHJ5KTtcbiAgfVxuXG4gIHB1YmxpYyBhZGRDYWNoZVZhcmlhYmxlcyh2YXJpYWJsZXM6IENhY2hlVmFyaWFibGVEZXNjcmlwdG9ycykge1xuICAgIGNvbnN0IGNhY2hlID0gdGhpc1tDQUNIRV07XG4gICAgZm9yIChjb25zdCBba2V5LCBlbnRyeV0gb2YgT2JqZWN0LmVudHJpZXModmFyaWFibGVzKSkge1xuICAgICAgY2FjaGVba2V5XSA9IGVudHJ5O1xuICAgIH1cbiAgfVxuXG4gIHB1YmxpYyBsb2FkQ2FjaGVWYXJpYWJsZXMoZmlsZW5hbWU6IEFic29sdXRlUGF0aCB8IHN0cmluZykge1xuICAgIGlmIChmaWxlRXhpc3RzU3luYyhmaWxlbmFtZS50b1N0cmluZygpKSkge1xuICAgICAgY29uc3QgdmFyaWFibGVzID0gcmVxdWlyZUltcGwoZmlsZW5hbWUudG9TdHJpbmcoKSk7XG4gICAgICB0aGlzLmFkZENhY2hlVmFyaWFibGVzKHZhcmlhYmxlcyk7XG4gICAgfVxuICB9XG5cbiAgcHVibGljIGNvcHlDYWNoZVZhcmlhYmxlcyhzY29wZTogYW55KSB7XG4gICAgZm9yIChjb25zdCBbbmFtZSwgZW50cnldIG9mIE9iamVjdC5lbnRyaWVzKHRoaXNbQ0FDSEVdKSkge1xuICAgICAgaWYgKCFPYmplY3QuaGFzT3duKHNjb3BlLCBuYW1lKSkge1xuICAgICAgICBjb25zdCB0eXBlID0gZW50cnkudHlwZSB8fCB0eXBlb2YgZW50cnkudmFsdWU7XG4gICAgICAgIGNvbnN0IGRlc2NyaXB0aW9uID0gZW50cnkuZGVzY3JpcHRpb24gfHwgXCJcIjtcbiAgICAgICAgbGV0IHZhbHVlID0gQXJyYXkuaXNBcnJheShlbnRyeS52YWx1ZSkgPyBbIC4uLmVudHJ5LnZhbHVlIF0gOiBlbnRyeS52YWx1ZTtcbiAgICAgICAgaWYgKHZhbHVlID09PSBcIiR7UFJPSkVDVF9WRVJTSU9OfVwiKVxuICAgICAgICAgIHZhbHVlID0gc2NvcGUuUFJPSkVDVF9WRVJTSU9OO1xuICAgICAgICBlbHNlIGlmICh2YWx1ZSA9PT0gXCIke1BST0pFQ1RfREVTQ1JJUFRJT059XCIpXG4gICAgICAgICAgdmFsdWUgPSBzY29wZS5QUk9KRUNUX0RFU0NSSVBUSU9OO1xuICAgICAgICBlbHNlIGlmICh2YWx1ZSA9PT0gXCIke1BST0pFQ1RfSE9NRVBBR0VfVVJMfVwiKVxuICAgICAgICAgIHZhbHVlID0gc2NvcGUuUFJPSkVDVF9IT01FUEFHRV9VUkw7XG4gICAgICAgIGVsc2UgaWYgKGVudHJ5LnZhbHVlID09PSBcIiR7Q01BS0VfU1lTVEVNX1BST0NFU1NPUn1cIilcbiAgICAgICAgICB2YWx1ZSA9IHNjb3BlLlNZU1RFTV9QUk9DRVNTT1I7XG4gIFxuICAgICAgICBjb25zdCBuYW1lU3ltYm9sID0gU3ltYm9sKG5hbWUpO1xuICAgICAgICBzY29wZVtuYW1lU3ltYm9sXSA9IGVuc3VyZVZhbHVlQnlUeXBlKHR5cGUsIHZhbHVlKTtcbiAgXG4gICAgICAgIE9iamVjdC5kZWZpbmVQcm9wZXJ0eShzY29wZSwgbmFtZSwge1xuICAgICAgICAgIGVudW1lcmFibGU6IHRydWUsXG4gICAgICAgICAgZ2V0KCkge1xuICAgICAgICAgICAgcmV0dXJuIHRoaXNbbmFtZVN5bWJvbF07XG4gICAgICAgICAgfSxcbiAgICAgICAgICBzZXQodmFsdWUpIHtcbiAgICAgICAgICAgIHRoaXNbbmFtZVN5bWJvbF0gPSBlbnN1cmVWYWx1ZUJ5VHlwZSh0eXBlLCB2YWx1ZSk7XG4gICAgICAgICAgfSxcbiAgICAgICAgfSk7XG4gICAgICB9XG4gICAgfVxuICB9XG4gIFxuICBwdWJsaWMgd3JpdGVDYWNoZVZhcmlhYmxlcyhmaWxlbmFtZTogc3RyaW5nKSB7XG4gICAgY29uc3QganNvbiA9IEpTT04uc3RyaW5naWZ5KHRoaXNbQ0FDSEVdLCBudWxsLCAyKTtcbiAgICBmcy53cml0ZUZpbGVTeW5jKGZpbGVuYW1lLCBqc29uLCBcInV0Zi04XCIpO1xuICB9XG5cbiAgcHVibGljIGFkZFN1YmRpcmVjdG9yeShzY29wZTogYW55KSB7XG4gICAgdGhpc1tTVUJESVJfTElTVF0ucHVzaChzY29wZSk7XG4gIH1cblxuICBwdWJsaWMgZmluZFNjcmlwdEZ1bmN0aW9uKG5hbWU6IHN0cmluZyk6IEZ1bmN0aW9uIHwgdW5kZWZpbmVkIHtcbiAgICByZXR1cm4gdGhpc1tCVUlMVElOX1NDUklQVFNdW25hbWVdO1xuICB9XG4gIFxuICBwdWJsaWMgYXN5bmMgZG9TdWJkaXJlY3RvcnkoKSB7XG4gICAgd2hpbGUgKHRoaXNbU1VCRElSX0xJU1RdLmxlbmd0aCkge1xuICAgICAgY29uc3Qgc2NvcGUgPSB0aGlzW1NVQkRJUl9MSVNUXS5zaGlmdCgpO1xuICAgICAgaWYgKCFzY29wZSlcbiAgICAgICAgY29udGludWU7XG5cbiAgICAgIGxldCBzY3JpcHRGaWxlOiBBYnNvbHV0ZVBhdGggfCB1bmRlZmluZWQ7XG4gICAgICBjb25zdCBmaWxlTGlzdCA9IFsgXCIuanNcIiwgXCIubWpzXCIgXS5tYXAoaSA9PiBcIk1ha2VTY3JpcHRcIiArIGkpO1xuICAgICAgZm9yIChjb25zdCBmaWxlbmFtZSBvZiBmaWxlTGlzdCkge1xuICAgICAgICBjb25zdCBpdGVyID0gc2NvcGUuU09VUkNFX0RJUi5qb2luKGZpbGVuYW1lKTtcbiAgICAgICAgaWYgKGF3YWl0IGZpbGVFeGlzdHMoaXRlci50b1N0cmluZygpKSkge1xuICAgICAgICAgIHNjcmlwdEZpbGUgPSBpdGVyO1xuICAgICAgICAgIGJyZWFrO1xuICAgICAgICB9XG4gICAgICB9XG5cbiAgICAgIGlmICghc2NyaXB0RmlsZSlcbiAgICAgICAgdGhyb3cgbmV3IEVycm9yKGBUaGVyZSBhcmUgbm8gZmlsZXMgJHtmaWxlTGlzdC5qb2luKFwiLCBcIil9IGluIFwiJHtzY29wZS5TT1VSQ0VfRElSfVwiYCk7XG5cbiAgICAgIHRoaXMucmVnaXN0ZXJTeXN0ZW1TY29wZShzY3JpcHRGaWxlLnRvU3RyaW5nKCksIHNjb3BlKTtcblxuICAgICAgc2NvcGUuU0NSSVBUX0ZJTEUgPSBzY3JpcHRGaWxlO1xuICAgICAgc2NvcGUuU0NSSVBUX0RJUiA9IHNjb3BlLlNDUklQVF9GSUxFLmRpcm5hbWUoKTtcblxuICAgICAgY29uc3QgY3dkU2F2ZSA9IHByb2Nlc3MuY3dkKCk7XG4gICAgICBwcm9jZXNzLmNoZGlyKHNjb3BlLlNPVVJDRV9ESVIudG9TdHJpbmcoKSk7XG5cbiAgICAgIGNvbnN0IG1vZHVsZSA9IGF3YWl0IGltcG9ydE1vZHVsZShzY29wZS5TQ1JJUFRfRklMRS50b1N0cmluZygpKTtcbiAgICAgIGlmICghbW9kdWxlLmRlZmF1bHQpXG4gICAgICAgIHRocm93IG5ldyBFcnJvcihgU3ViZGlyZWN0b3J5ICR7c2NvcGUuU0NSSVBUX0ZJTEUuYmFzZW5hbWUoKX0gbm90IGNvbnRhaW4gZGVmYXVsdCBmdW5jdGlvbmApO1xuICAgICAgY29uc3QgbWsgPSBNYWtlQ29udGV4dC5jcmVhdGUoc2NvcGUsIHRoaXMpO1xuICAgICAgY29uc3QgcmVzdWx0ID0gbW9kdWxlLmRlZmF1bHQobWspO1xuICAgICAgaWYgKHJlc3VsdCBpbnN0YW5jZW9mIFByb21pc2UpXG4gICAgICAgIGF3YWl0IHJlc3VsdDtcbiAgICAgIFNjb3BlSGVscGVyLmFwcGx5VmFyaWFibGVzKHNjb3BlLCBtayk7XG5cbiAgICAgIHByb2Nlc3MuY2hkaXIoY3dkU2F2ZSk7XG4gICAgfVxuICB9XG5cbiAgcHVibGljIGNyZWF0ZUdvYWxzKHNjb3BlOiBTeXN0ZW1TY29wZSk6IEdvYWxDb2xsZWN0aW9uIHtcbiAgICBmb3IgKGNvbnN0IGl0ZXIgb2YgT2JqZWN0LnZhbHVlcyh0aGlzW1VOS05PV05fVEFSR0VUU10pKSB7XG4gICAgICBjb25zdCB0YXJnZXQgPSB0aGlzW1RBUkdFVFNdLmdldChpdGVyLk5BTUUpO1xuICAgICAgdGFyZ2V0LmFkZFNvdXJjZXMoaXRlci5TT1VSQ0VTKTtcbiAgICAgIHRhcmdldC5JTkNMVURFUy5wdXNoKC4uLml0ZXIuSU5DTFVERVMpO1xuICAgICAgdGFyZ2V0LkRFRklORVMucHVzaCguLi5pdGVyLkRFRklORVMpO1xuICAgICAgdGFyZ2V0LkNPTVBJTEVfT1BUSU9OUy5wdXNoKC4uLml0ZXIuQ09NUElMRV9PUFRJT05TKTtcbiAgICAgIHRhcmdldC5MSU5LX09QVElPTlMucHVzaCguLi5pdGVyLkxJTktfT1BUSU9OUyk7XG4gICAgfVxuICBcbiAgICBmb3IgKGNvbnN0IGl0ZXIgb2YgT2JqZWN0LnZhbHVlcyh0aGlzW0lOVEVSRkFDRV9TQ1JJUFRTXSkpIHtcbiAgICAgIGNvbnN0IHNjcmlwdCA9IHRoaXNbQ1VTVE9NX1NDUklQVFNdLmdldChpdGVyLk5BTUUpO1xuICAgICAgaWYgKCFzY3JpcHQpXG4gICAgICAgIHRocm93IG5ldyBFcnJvcihgVGhlcmUgaXMgbm8gQ3VzdG9tU2NyaXB0IG5hbWVkICR7aXRlci5OQU1FfWApO1xuICAgICAgc2NyaXB0Lm1lcmdlVmFyaWFibGVzKGl0ZXIuVkFSSUFCTEVTKTtcbiAgICB9XG4gIFxuICAgIGNvbnN0IGdvYWxMaXN0ID0gR29hbENvbGxlY3Rpb24uY3JlYXRlKCk7XG4gICAgZm9yIChjb25zdCBzY3JpcHQgb2YgdGhpc1tDVVNUT01fU0NSSVBUU10uRU5UUklFUykgeyAgIFxuICAgICAgY29uc3QgZGVwZW5kcyA9IFtdO1xuICAgICAgaWYgKHNjcmlwdC5TQ1JJUFQgaW5zdGFuY2VvZiBGaWxlUGF0aClcbiAgICAgICAgZGVwZW5kcy5wdXNoKHNjcmlwdC5TQ1JJUFQudG9TdHJpbmcoKSk7XG4gICAgICBpZiAoc2NyaXB0LklOUFVUKVxuICAgICAgICBkZXBlbmRzLnB1c2goc2NyaXB0LklOUFVULnRvU3RyaW5nKCkpO1xuICAgICAgY29uc3QgbXNnID0gXCJcXHgxYlszNm1cIiArIFwiR2VuZXJhdGluZyBcIiArIHNjcmlwdC53b3JrRGlyLnJlbGF0aXZlKHNjcmlwdC5PVVRQVVQpICsgXCJcXHgxYlswbVwiO1xuICAgICAgY29uc3QgcGFyYW1zID0geyAuLi5zY3JpcHQuVkFSSUFCTEVTLCAuLi5zY3JpcHQuUEFSQU1TIH07XG4gICAgICBsZXQgZnVuYyA9IHNjcmlwdC5TQ1JJUFQ7XG4gICAgICBjb25zdCBzY29wZSA9IHNjcmlwdC5TQ09QRTtcbiAgICAgIGNvbnN0IGhhbmRsZXIgPSBhc3luYyAoKSA9PiB7XG4gICAgICAgIGlmIChmdW5jIGluc3RhbmNlb2YgRmlsZVBhdGgpXG4gICAgICAgICAgZnVuYyA9IChhd2FpdCBpbXBvcnRNb2R1bGUoZnVuYy50b1N0cmluZygpKSkuZGVmYXVsdDtcbiAgICAgICAgaWYgKGZ1bmMgaW5zdGFuY2VvZiBGdW5jdGlvbikge1xuICAgICAgICAgIGNvbnN0IG1rID0gU2NyaXB0Q29udGV4dC5jcmVhdGUoc2NvcGUsIHRoaXMpO1xuICAgICAgICAgIGNvbnN0IHJlc3VsdCA9IGZ1bmMobWssIHNjb3BlVmFsdWVBc1ByaW1pdGl2ZXMocGFyYW1zKSk7XG4gICAgICAgICAgaWYgKHJlc3VsdCBpbnN0YW5jZW9mIFByb21pc2UpXG4gICAgICAgICAgICBhd2FpdCByZXN1bHQ7XG4gICAgICAgIH1cbiAgICAgICAgZWxzZSB7XG4gICAgICAgICAgdGhyb3cgbmV3IEVycm9yKGBUaGVyZSBpcyBubyBGdW5jdGlvbmApO1xuICAgICAgICB9XG4gICAgICB9O1xuICAgICAgZ29hbExpc3QuYWRkU2NyaXB0KGhhbmRsZXIsIGRlcGVuZHMsIHNjcmlwdC5PVVRQVVQudG9TdHJpbmcoKSwgbXNnKTtcbiAgICB9XG4gIFxuICAgIGZvciAoY29uc3QgW25hbWUsIHRhcmdldF0gb2YgT2JqZWN0LmVudHJpZXModGhpc1tUQVJHRVRTXS5FTlRSSUVTKSBhcyBhbnkpIHtcbiAgICAgIGNvbnN0IGhlYWRlcnMgPSB0aGlzW1RBUkdFVFNdLmFsbEhlYWRlcnNPZih0YXJnZXQpO1xuICAgICAgY29uc3QgZGVwZW5kcyA9IFtdO1xuICAgICAgZm9yIChjb25zdCBzIG9mIHRhcmdldC5TT1VSQ0VTKSB7XG4gICAgICAgIGlmIChzIGluc3RhbmNlb2YgSW50ZXJmYWNlT2JqZWN0cykge1xuICAgICAgICAgIGNvbnN0IHQgPSB0aGlzW1RBUkdFVFNdLmdldChzLnRhcmdldE5hbWUpO1xuICAgICAgICAgIGZvciAoY29uc3QgZiBvZiB0LlNPVVJDRVMpIHtcbiAgICAgICAgICAgIGlmIChmIGluc3RhbmNlb2YgU291cmNlRmlsZSAmJiBmLk9CSkVDVF9GSUxFKVxuICAgICAgICAgICAgICBkZXBlbmRzLnB1c2goZi5PQkpFQ1RfRklMRS50b1N0cmluZygpKTtcbiAgICAgICAgICB9XG4gICAgICAgICAgY29udGludWU7XG4gICAgICAgIH1cbiAgXG4gICAgICAgIGlmIChzLkhFQURFUl9GSUxFX09OTFkpXG4gICAgICAgICAgY29udGludWU7XG4gIFxuICAgICAgICBmcy5ta2RpclN5bmMocy5PQkpFQ1RfRklMRV9ESVIudG9TdHJpbmcoKSwgeyByZWN1cnNpdmU6IHRydWUgfSk7XG4gIFxuICAgICAgICBjb25zdCByZWxhdGl2ZU9iamVjdCA9IHRhcmdldC5UQVJHRVRfU0NPUEUuQklOQVJZX0RJUi5yZWxhdGl2ZShzLk9CSkVDVF9GSUxFKTtcbiAgICAgICAgY29uc3QgcmVsYXRpdmVCaW5hcnlEaXIgPSBzY29wZS5QUk9KRUNUX0JJTkFSWV9ESVIucmVsYXRpdmUodGFyZ2V0LlRBUkdFVF9TQ09QRS5CSU5BUllfRElSKTtcbiAgICAgICAgY29uc3QgbXNnID0gXCJcXHgxYlszMm1cIiArIGBCdWlsZGluZyAke3MuTEFOR1VBR0V9IG9iamVjdCAke3JlbGF0aXZlQmluYXJ5RGlyfS8ke3JlbGF0aXZlT2JqZWN0fWAgKyBcIlxceDFiWzBtXCI7XG4gIFxuICAgICAgICBjb25zdCBkZWZpbml0aW9ucyA9IFtcbiAgICAgICAgICAuLi50aGlzW1RBUkdFVFNdLmFsbERlZmluaXRpb25zT2YodGFyZ2V0KSxcbiAgICAgICAgICAuLi5zLkRFRklORVMsXG4gICAgICAgIF07XG4gIFxuICAgICAgICBjb25zdCBhcmdzID0gW107XG4gICAgICAgIGFyZ3MucHVzaCguLi5kZWZpbml0aW9ucy5tYXAoaSA9PiBcIi1EXCIgKyBpKSk7XG4gICAgICAgIGFyZ3MucHVzaCguLi50aGlzW1RBUkdFVFNdLmFsbEluY2x1ZGVzT2YodGFyZ2V0KS5tYXAoaSA9PiBcIi1JXCIgKyBpKSk7XG4gICAgICAgIGFyZ3MucHVzaCguLi50aGlzW1RBUkdFVFNdLmFsbENvbXBpbGVPcHRpb25zT2YodGFyZ2V0KSk7XG4gICAgICAgIGlmICh0YXJnZXQuUE9TSVRJT05fSU5ERVBFTkRFTlRfQ09ERSlcbiAgICAgICAgICBhcmdzLnB1c2goXCItZlBJQ1wiKTtcbiAgICAgICAgYXJncy5wdXNoKC4uLnMuQ09NUElMRV9GTEFHUy5mbGF0KCkpO1xuICAgICAgICBhcmdzLnB1c2goXCItb1wiLCByZWxhdGl2ZU9iamVjdCk7XG4gICAgICAgIGFyZ3MucHVzaChcIi1jXCIsIHMuRklMRSk7XG4gICAgICAgIGNvbnN0IGN3ZCA9IHRhcmdldC5UQVJHRVRfU0NPUEUuQklOQVJZX0RJUi50b1N0cmluZygpO1xuICBcbiAgICAgICAgY29uc3QgY29tbWFuZCA9IHRhcmdldC5UQVJHRVRfU0NPUEVbcy5MQU5HVUFHRSArIFwiX0NPTVBJTEVSXCJdLnRvU3RyaW5nKCk7XG4gICAgICAgIGNvbnN0IG91dHB1dCA9IHRhcmdldC5UQVJHRVRfU0NPUEUuQklOQVJZX0RJUi5qb2luKHJlbGF0aXZlT2JqZWN0KS50b1N0cmluZygpO1xuICAgICAgICBkZXBlbmRzLnB1c2gob3V0cHV0KTtcbiAgXG4gICAgICAgIGdvYWxMaXN0LmFkZEV4ZWMob3V0cHV0LCBbIC4uLmhlYWRlcnMsIHMuRklMRSBdLCBjb21tYW5kLCBhcmdzLCBjd2QsIG1zZyk7XG4gICAgICB9XG4gIFxuICAgICAgY29uc3QgbGlua09wdGlvbnMgPSB0aGlzW1RBUkdFVFNdLmFsbExpbmtPcHRpb25zT2YodGFyZ2V0KTtcbiAgICAgIGlmICh0YXJnZXQgaW5zdGFuY2VvZiBPYmplY3RMaWJyYXJ5KSB7XG4gICAgICAgIGNvbnN0IG9ianMgPSBkZXBlbmRzLmZpbHRlcihpID0+IGkuZW5kc1dpdGgoXCIub1wiKSB8fCBpLmVuZHNXaXRoKFwiLm9ialwiKSkubWFwKGkgPT4gdGFyZ2V0LkZJTEVfRElSLnJlbGF0aXZlKGkpKTtcbiAgICAgICAgaWYgKG9ianMubGVuZ3RoKSB7XG4gICAgICAgICAgY29uc3QgYXJncyA9IFtcbiAgICAgICAgICAgIC4uLmxpbmtPcHRpb25zLFxuICAgICAgICAgICAgXCItclwiLFxuICAgICAgICAgICAgXCItb1wiLCB0YXJnZXQuRklMRV9OQU1FLFxuICAgICAgICAgICAgLi4ub2Jqc1xuICAgICAgICAgIF07XG4gICAgICAgICAgY29uc3QgY3dkID0gdGFyZ2V0LkZJTEVfRElSLnRvU3RyaW5nKCk7XG4gICAgICAgICAgY29uc3QgbXNnID0gYExpbmtpbmcgQ1hYIG9iamVjdCBsaWJyYXJ5ICR7dGFyZ2V0LkZJTEVfTkFNRX1gO1xuICAgICAgICAgIGdvYWxMaXN0LmFkZEV4ZWModGFyZ2V0LkZJTEUudG9TdHJpbmcoKSwgZGVwZW5kcywgc2NvcGUuTElOS0VSLCBhcmdzLCBjd2QsIG1zZyk7XG4gICAgICAgIH1cbiAgICAgICAgZWxzZSB7XG4gICAgICAgICAgbG9nZ2VyLmluZm8oYE5vIG9iamVjdHMgZm9yIFwiJHt0YXJnZXQuTkFNRX1cImApO1xuICAgICAgICB9XG4gICAgICB9XG4gIFxuICAgICAgaWYgKHRhcmdldCBpbnN0YW5jZW9mIFN0YXRpY0xpYnJhcnkpIHtcbiAgICAgICAgY29uc3Qgb2JqcyA9IGRlcGVuZHMuZmlsdGVyKGkgPT4gaS5lbmRzV2l0aChcIi5vXCIpIHx8IGkuZW5kc1dpdGgoXCIub2JqXCIpKS5tYXAoaSA9PiB0YXJnZXQuRklMRV9ESVIucmVsYXRpdmUoaSkpO1xuICAgICAgICBpZiAob2Jqcy5sZW5ndGgpIHtcbiAgICAgICAgICBjb25zdCBhcmdzID0gWyBcInJjXCIsIHRhcmdldC5GSUxFX05BTUUgLCAuLi5vYmpzIF07XG4gICAgICAgICAgY29uc3QgY3dkID0gdGFyZ2V0LkZJTEVfRElSLnRvU3RyaW5nKCk7XG4gICAgICAgICAgY29uc3QgbXNnID0gYExpbmtpbmcgQ1hYIHN0YXRpYyBsaWJyYXJ5ICR7dGFyZ2V0LkZJTEVfTkFNRX1gO1xuICAgICAgICAgIGdvYWxMaXN0LmFkZEV4ZWModGFyZ2V0LkZJTEUudG9TdHJpbmcoKSwgZGVwZW5kcywgc2NvcGUuQVIsIGFyZ3MsIGN3ZCwgbXNnKTtcbiAgICAgICAgfVxuICAgICAgICBlbHNlIHtcbiAgICAgICAgICBsb2dnZXIuaW5mbyhgTm8gb2JqZWN0cyBmb3IgXCIke3RhcmdldC5OQU1FfVwiYCk7XG4gICAgICAgIH1cbiAgICAgIH1cbiAgXG4gICAgICBpZiAodGFyZ2V0IGluc3RhbmNlb2YgU2hhcmVkTGlicmFyeSkge1xuICAgICAgICB0aHJvdyBuZXcgRXJyb3IoXCJOb3QgaW1wbGVtZW50ZWRcIik7XG4gICAgICB9XG4gIFxuICAgICAgaWYgKHRhcmdldCBpbnN0YW5jZW9mIEV4ZWN1dGFibGUpIHtcbiAgICAgICAgY29uc3Qgb2JqcyA9IGRlcGVuZHMuZmlsdGVyKGkgPT4gaS5lbmRzV2l0aChcIi5vXCIpIHx8IGkuZW5kc1dpdGgoXCIub2JqXCIpKS5tYXAoaSA9PiB0YXJnZXQuRklMRV9ESVIucmVsYXRpdmUoaSkpO1xuICAgICAgICBpZiAob2Jqcy5sZW5ndGgpIHtcbiAgICAgICAgICBjb25zdCBsaWJzID0gdGhpc1tUQVJHRVRTXS5hbGxMaWJyYXJpZXNPZih0YXJnZXQpO1xuICAgICAgICAgIGNvbnN0IGFyZ3MgPSBbXG4gICAgICAgICAgICAuLi50YXJnZXQuVEFSR0VUX1NDT1BFLkNYWF9GTEFHUyxcbiAgICAgICAgICAgIC4uLmxpbmtPcHRpb25zLFxuICAgICAgICAgICAgLi4ub2JqcyxcbiAgICAgICAgICAgIFwiLW9cIiwgdGFyZ2V0LkZJTEVfTkFNRSxcbiAgICAgICAgICAgIC4uLmxpYnMubWFwKGkgPT4gdGFyZ2V0LkZJTEVfRElSLnJlbGF0aXZlKGkpKSxcbiAgICAgICAgICBdO1xuICAgICAgICAgIGNvbnN0IGN3ZCA9IHRhcmdldC5GSUxFX0RJUi50b1N0cmluZygpO1xuICAgICAgICAgIGNvbnN0IG1zZyA9IGBMaW5raW5nIENYWCBleGVjdXRhYmxlICR7dGFyZ2V0LkZJTEVfTkFNRX1gO1xuICAgICAgICAgIGdvYWxMaXN0LmFkZEV4ZWModGFyZ2V0LkZJTEUudG9TdHJpbmcoKSwgZGVwZW5kcy5jb25jYXQobGlicyksIHNjb3BlLkNYWF9DT01QSUxFUiwgYXJncywgY3dkLCBtc2cpO1xuICAgICAgICB9XG4gICAgICAgIGVsc2Uge1xuICAgICAgICAgIGxvZ2dlci5pbmZvKGBObyBvYmplY3RzIGZvciBcIiR7dGFyZ2V0Lk5BTUV9XCJgKTtcbiAgICAgICAgfVxuICAgICAgfVxuICBcbiAgICAgIGdvYWxMaXN0LmFkZFRhcmdldChuYW1lLCBbIHRhcmdldC5GSUxFLnRvU3RyaW5nKCkgXSwgYEJ1aWx0IHRhcmdldCAke25hbWV9YCk7XG4gICAgfVxuICBcbiAgICBjb25zdCBpbnN0YWxsX2ZpbGVzOiBzdHJpbmdbXSA9IFtdO1xuICAgIGZvciAoY29uc3QgaXRlciBvZiB0aGlzW0lOU1RBTExfTElTVF0pIHtcbiAgICAgIGxldCBzcmMsIGRlc3Q7XG4gICAgICBpZiAoaXRlci5WQUxVRSBpbnN0YW5jZW9mIEFic29sdXRlUGF0aCkge1xuICAgICAgICBpZiAoc2NvcGUuUFJFVkVOVF9JTlNUQUxMX0ZJTEVTKVxuICAgICAgICAgIGNvbnRpbnVlO1xuICAgICAgICBzcmMgPSBpdGVyLlZBTFVFLnRvU3RyaW5nKCk7XG4gICAgICAgIGNvbnN0IHJmaWxlID0gKGl0ZXIuQkFTRV9ESVIgYXMgYW55KS5yZWxhdGl2ZShpdGVyLlZBTFVFKTtcbiAgICAgICAgZGVzdCA9IGl0ZXIuREVTVElOQVRJT04uam9pbihyZmlsZSk7XG4gICAgICB9XG4gICAgICBlbHNlIGlmIChpdGVyLlZBTFVFIGluc3RhbmNlb2YgSW50ZXJmYWNlVGFyZ2V0KSB7XG4gICAgICAgIGNvbnN0IHRhcmdldCA9IHRoaXNbVEFSR0VUU10uZ2V0KGl0ZXIuVkFMVUUudGFyZ2V0TmFtZSk7XG4gICAgICAgIHNyYyA9IHRhcmdldC5GSUxFLnRvU3RyaW5nKCk7XG4gICAgICAgIGRlc3QgPSBpdGVyLkRFU1RJTkFUSU9OLmpvaW4odGFyZ2V0LkZJTEVfTkFNRSk7XG4gICAgICB9XG4gICAgICBlbHNlIHtcbiAgICAgICAgdGhyb3cgbmV3IEVycm9yKGBDYW4gbm90IGluc3RhbGwgJHtpdGVyLlZBTFVFfWApXG4gICAgICB9XG4gICAgICBpZiAoc2NvcGUuREVTVERJUilcbiAgICAgICAgZGVzdCA9IHNjb3BlLkRFU1RESVIuam9pbihkZXN0KS50b1N0cmluZygpO1xuICAgICAgY29uc3QgaGFuZGxlciA9IGFzeW5jICgpID0+IHtcbiAgICAgICAgY29uc3QgcGFyYW1zID0gc2NvcGVWYWx1ZUFzUHJpbWl0aXZlcyh7c3JjLCBkZXN0fSk7XG4gICAgICAgIGF3YWl0IGluc3RhbGxfc2NyaXB0KHBhcmFtcyk7XG4gICAgICB9O1xuICAgICAgZ29hbExpc3QuYWRkU2NyaXB0KGhhbmRsZXIsIFsgc3JjIF0sIGRlc3QudG9TdHJpbmcoKSwgXCJcIik7XG4gICAgICBpbnN0YWxsX2ZpbGVzLnB1c2goZGVzdC50b1N0cmluZygpKTtcbiAgICB9XG5cbiAgICBpZiAoaW5zdGFsbF9maWxlcy5sZW5ndGgpIHtcbiAgICAgIGdvYWxMaXN0LmFkZFRhcmdldChJTlNUQUxMX1RBUkdFVCwgaW5zdGFsbF9maWxlcywgXCJcIik7XG4gICAgfVxuICBcbiAgICBnb2FsTGlzdC5hZGRUYXJnZXQoQUxMX1RBUkdFVCwgT2JqZWN0LmtleXModGhpc1tUQVJHRVRTXS5FTlRSSUVTKSwgXCJcIik7XG4gIFxuICAgIHJldHVybiBnb2FsTGlzdDtcbiAgfVxuXG4gIHB1YmxpYyB0b0pTT04oKTogb2JqZWN0IHtcbiAgICByZXR1cm4ge1xuICAgICAgVEFSR0VUUzogdGhpcy5UQVJHRVRTLFxuICAgICAgQ1VTVE9NX1NDUklQVFM6IHRoaXNbQ1VTVE9NX1NDUklQVFNdLFxuICAgICAgQ0FDSEU6IHRoaXMuQ0FDSEUsXG4gICAgICBVTktOT1dOX1RBUkdFVFM6IHRoaXMuVU5LTk9XTl9UQVJHRVRTLFxuICAgICAgSU5URVJGQUNFX1NDUklQVFM6IHRoaXMuSU5URVJGQUNFX1NDUklQVFMsXG4gICAgICBJTlNUQUxMX0xJU1Q6IHRoaXNbSU5TVEFMTF9MSVNUXSxcbiAgICAgIFNDUklQVF9WQVJJQUJMRVNfTUFQOiB0aGlzLlNDUklQVF9WQVJJQUJMRVNfTUFQLFxuICAgICAgU1VCRElSX0FMSUFTOiB0aGlzLlNVQkRJUl9BTElBUyxcbiAgICB9O1xuICB9XG59O1xuIiwiLypcbiAqIE1JVCBMaWNlbnNlXG4gKlxuICogQ29weXJpZ2h0IChjKSAyMDI1ICBZdXJpaSBZYWt1YmluICh5dXJpaS55YWt1YmluQGdtYWlsLmNvbSlcbiAqXG4gKiBQZXJtaXNzaW9uIGlzIGdyYW50ZWQgdG8gdXNlLCBjb3B5LCBtb2RpZnksIGFuZCBkaXN0cmlidXRlIHRoaXMgc29mdHdhcmVcbiAqIHVuZGVyIHRoZSBNSVQgTGljZW5zZS4gU2VlIExJQ0VOU0UgZmlsZSBmb3IgZGV0YWlscy5cbiAqL1xuXG5pbXBvcnQgcGF0aCBmcm9tIFwibm9kZTpwYXRoXCI7XG5pbXBvcnQgZnMgZnJvbSBcIm5vZGU6ZnNcIjtcbmltcG9ydCB7IHNwYXduU3luYyB9IGZyb20gXCJub2RlOmNoaWxkX3Byb2Nlc3NcIjtcblxuaW1wb3J0IHsgQWJzb2x1dGVQYXRoIH0gZnJvbSBcIkAvY29yZS9QYXRoXCI7XG5cbmNvbnN0IEVOVFJJRVMgPSBTeW1ib2woXCJFTlRSSUVTXCIpO1xuXG5lbnVtIEdvYWxUeXBlIHtcbiAgU0NSSVBUID0gXCJzY3JpcHRcIixcbiAgRVhFQyA9IFwiZXhlY1wiLFxuICBUQVJHRVQgPSBcInRhcmdldFwiLFxufTtcblxuaW50ZXJmYWNlIEJhc2VHb2FsIHtcbiAgbmFtZTogc3RyaW5nO1xuICB0eXBlOiBHb2FsVHlwZTtcbiAgZGVwZW5kczogQXJyYXk8c3RyaW5nPjtcbiAgbXNnOiBzdHJpbmc7XG4gIG91dHB1dDogc3RyaW5nO1xufTtcblxudHlwZSBTY3JpcHRIYW5kbGVyID0gKCkgPT4gUHJvbWlzZTx2b2lkPjtcblxuaW50ZXJmYWNlIFNjcmlwdEdvYWwgZXh0ZW5kcyBCYXNlR29hbCB7XG4gIGhhbmRsZXI6IFNjcmlwdEhhbmRsZXI7XG59O1xuXG5pbnRlcmZhY2UgRXhlY0dvYWwgZXh0ZW5kcyBCYXNlR29hbCB7XG4gIGNvbW1hbmQ6IHN0cmluZztcbiAgYXJnczogQXJyYXk8c3RyaW5nPjtcbiAgY3dkOiBzdHJpbmc7XG59O1xuXG5leHBvcnQgY2xhc3MgR29hbENvbGxlY3Rpb24ge1xuICBwcml2YXRlIFtFTlRSSUVTXTogQXJyYXk8QmFzZUdvYWw+O1xuXG4gIHByaXZhdGUgY29uc3RydWN0b3IoKSB7XG4gICAgdGhpc1tFTlRSSUVTXSA9IG5ldyBBcnJheTxCYXNlR29hbD47XG4gIH1cblxuICBwdWJsaWMgZ2V0IEVOVFJJRVMoKSB7XG4gICAgcmV0dXJuIHRoaXNbRU5UUklFU107XG4gIH1cblxuICBwdWJsaWMgc3RhdGljIGNyZWF0ZSgpIHtcbiAgICByZXR1cm4gT2JqZWN0LnNlYWwobmV3IEdvYWxDb2xsZWN0aW9uKTtcbiAgfVxuXG4gIHB1YmxpYyBmaW5kU2NyaXB0QnlPdXRwdXQob3V0cHV0OiBzdHJpbmcpOiBCYXNlR29hbCB8IHVuZGVmaW5lZCB7XG4gICAgaWYgKCFvdXRwdXQpXG4gICAgICByZXR1cm4gdW5kZWZpbmVkO1xuICAgIHJldHVybiB0aGlzW0VOVFJJRVNdLmZpbmQoKGkpID0+IGkudHlwZSA9PT0gR29hbFR5cGUuU0NSSVBUICYmIGkub3V0cHV0ID09PSBvdXRwdXQpO1xuICB9XG5cbiAgcHVibGljIGhhc1NjcmlwdEJ5T3V0cHV0KG91dHB1dDogc3RyaW5nKTogYm9vbGVhbiB7XG4gICAgcmV0dXJuICEhdGhpcy5maW5kU2NyaXB0QnlPdXRwdXQob3V0cHV0KTtcbiAgfVxuXG4gIHB1YmxpYyBhZGRTY3JpcHQoaGFuZGxlcjogU2NyaXB0SGFuZGxlciwgZGVwZW5kczogQXJyYXk8c3RyaW5nPiwgb3V0cHV0OiBzdHJpbmcsIG1zZzogc3RyaW5nKSB7XG4gICAgaWYgKHRoaXMuaGFzU2NyaXB0QnlPdXRwdXQob3V0cHV0LnRvU3RyaW5nKCkpKVxuICAgICAgdGhyb3cgbmV3IEVycm9yKGBPdXRwdXQgXCIke291dHB1dH1cIiBleGlzdHNgKTtcbiAgICB0aGlzW0VOVFJJRVNdLnB1c2goeyBuYW1lOiBcIlwiLCB0eXBlOiBHb2FsVHlwZS5TQ1JJUFQsIGhhbmRsZXIsIG91dHB1dCwgZGVwZW5kcywgbXNnIH0gYXMgU2NyaXB0R29hbCk7XG4gIH1cblxuICBwdWJsaWMgYWRkRXhlYyhvdXRwdXQ6IHN0cmluZywgZGVwZW5kczogQXJyYXk8c3RyaW5nPiwgY29tbWFuZDogc3RyaW5nLCBhcmdzOiBBcnJheTxzdHJpbmc+LCBjd2Q6IHN0cmluZywgbXNnOiBzdHJpbmcpIHtcbiAgICB0aGlzW0VOVFJJRVNdLnB1c2goeyBuYW1lOiBcIlwiLCB0eXBlOiBHb2FsVHlwZS5FWEVDLCBkZXBlbmRzLCBvdXRwdXQsIGNvbW1hbmQsIGFyZ3MsIGN3ZCwgbXNnIH0gYXMgRXhlY0dvYWwpO1xuICB9XG5cbiAgcHVibGljIGFkZFRhcmdldChuYW1lOiBzdHJpbmcsIGRlcGVuZHM6IEFycmF5PHN0cmluZz4sIG1zZzogc3RyaW5nKSB7XG4gICAgdGhpc1tFTlRSSUVTXS5wdXNoKHsgbmFtZSwgdHlwZTogR29hbFR5cGUuVEFSR0VULCBkZXBlbmRzLCBtc2csIG91dHB1dDogXCJcIiB9KTtcbiAgfVxuXG4gIHB1YmxpYyBnZXRUYXJnZXQobmFtZTogc3RyaW5nKTogQmFzZUdvYWwgfCB1bmRlZmluZWQge1xuICAgIHJldHVybiB0aGlzW0VOVFJJRVNdLmZpbmQoKGkpID0+IGkudHlwZSA9PT0gR29hbFR5cGUuVEFSR0VUICYmIGkubmFtZSA9PT0gbmFtZSk7XG4gIH1cblxuICBwcml2YXRlIGFkZFRhcmdldExpc3RJbXBsKG5hbWU6IHN0cmluZywgcmVzdWx0OiBBcnJheTxCYXNlR29hbD4pIHtcbiAgICBpZiAocmVzdWx0LmZpbmQoaSA9PiBpLm5hbWUgPT09IG5hbWUgfHwgaS5vdXRwdXQgPT09IG5hbWUpKSB7XG4gICAgICByZXR1cm47XG4gICAgfVxuICBcbiAgICBjb25zdCBnb2FsID0gdGhpc1tFTlRSSUVTXS5maW5kKGkgPT4gaS5uYW1lID09PSBuYW1lIHx8IGkub3V0cHV0ID09PSBuYW1lKTtcbiAgICBpZiAoIWdvYWwpIHtcbiAgICAgIHJldHVybjtcbiAgICB9XG4gIFxuICAgIGZvciAoY29uc3QgaXRlciBvZiBnb2FsLmRlcGVuZHMpIHtcbiAgICAgIHRoaXMuYWRkVGFyZ2V0TGlzdEltcGwoaXRlci50b1N0cmluZygpLCByZXN1bHQpO1xuICAgIH1cbiAgXG4gICAgcmVzdWx0LnB1c2goZ29hbCk7XG4gIH1cbiAgXG4gIHB1YmxpYyBnZXRUYXJnZXRMaXN0KG5hbWU6c3RyaW5nKSB7XG4gICAgY29uc3QgcmVzdWx0ID0gbmV3IEFycmF5PEJhc2VHb2FsPjtcbiAgICB0aGlzLmFkZFRhcmdldExpc3RJbXBsKG5hbWUsIHJlc3VsdCk7XG4gICAgcmV0dXJuIHJlc3VsdDtcbiAgfVxuICBcbiAgcHVibGljIHRvSlNPTigpIHtcbiAgICByZXR1cm4gdGhpc1tFTlRSSUVTXTtcbiAgfVxuXG4gIHB1YmxpYyBzdGF0aWMgYXN5bmMgYnVpbGRHb2Fscyhjb2xsZWN0aW9uOiBBcnJheTxCYXNlR29hbD4pIHtcbiAgICBsZXQgbXNnQ291bnQgPSAwO1xuICAgIGZvciAoY29uc3QgaXRlciBvZiBjb2xsZWN0aW9uKVxuICAgICAgbXNnQ291bnQgKz0gaXRlci5tc2cgPyAxIDogMDtcbiAgXG4gICAgbGV0IG1zZ0luZGV4ID0gMDtcbiAgICBmb3IgKGNvbnN0IGdvYWwgb2YgY29sbGVjdGlvbikge1xuICAgICAgY29uc3QgeyB0eXBlLCBtc2cgfSA9IGdvYWw7XG4gICAgICBpZiAobXNnKSB7XG4gICAgICAgIGNvbnN0IHJlbGF0aW9uT2ZMZW5ndGggPSBNYXRoLnJvdW5kKCgrK21zZ0luZGV4IC8gbXNnQ291bnQpICogMTAwKTtcbiAgICAgICAgY29uc3QgcGVyY2VudCA9IFwiW1wiICsgcmVsYXRpb25PZkxlbmd0aC50b1N0cmluZygpLnBhZFN0YXJ0KDMsIFwiIFwiKSArIFwiJV0gXCI7XG4gICAgICAgIGNvbnNvbGUuaW5mbyhwZXJjZW50ICsgbXNnKTtcbiAgICAgIH1cbiAgICAgIGlmICh0eXBlID09PSBHb2FsVHlwZS5TQ1JJUFQpIHtcbiAgICAgICAgY29uc3QgeyBoYW5kbGVyIH0gPSBnb2FsIGFzIFNjcmlwdEdvYWw7XG4gICAgICAgIGF3YWl0IGhhbmRsZXIoKTtcbiAgICAgIH1cbiAgICAgIGVsc2UgaWYgKHR5cGUgPT09IEdvYWxUeXBlLkVYRUMpIHtcbiAgICAgICAgY29uc3QgeyBjb21tYW5kLCBhcmdzLCBjd2QsIG91dHB1dCB9ID0gZ29hbCBhcyBFeGVjR29hbDtcbiAgICAgICAgZnMubWtkaXJTeW5jKHBhdGgucG9zaXguZGlybmFtZShvdXRwdXQpLCB7IHJlY3Vyc2l2ZTogdHJ1ZSB9KTtcbiAgICAgICAgY29uc3QgcmVzdWx0ID0gc3Bhd25TeW5jKGNvbW1hbmQsIGFyZ3MsIHsgY3dkLCBlbmNvZGluZzogXCJ1dGYtOFwiIH0pO1xuICAgICAgICBpZiAocmVzdWx0LmVycm9yIHx8IHJlc3VsdC5zdGF0dXMpIHtcbiAgICAgICAgICBjb25zb2xlLmluZm8oXCJjZCBcIiArIGN3ZCk7XG4gICAgICAgICAgbGV0IGNtZCA9IGFyZ3Muam9pbihcIiBcIik7XG4gICAgICAgICAgY21kID0gY29tbWFuZCArIChjbWQgPyBcIiBcIiA6IFwiXCIpICsgY21kO1xuICAgICAgICAgIGNvbnNvbGUuaW5mbyhjbWQpO1xuICAgICAgICAgIGNvbnNvbGUuaW5mbyhcIlwiKTtcbiAgXG4gICAgICAgICAgY29uc29sZS5lcnJvcihyZXN1bHQuc3RkZXJyKTtcblxuICAgICAgICAgIGlmIChyZXN1bHQuZXJyb3IpXG4gICAgICAgICAgICAgIHRocm93IHJlc3VsdC5lcnJvcjtcbiAgXG4gICAgICAgICAgdGhyb3cgbmV3IEVycm9yKHJlc3VsdC5lcnJvciBhcyBhbnkgfHwgXCJTdGF0dXMgXCIgKyByZXN1bHQuc3RhdHVzKTtcbiAgICAgICAgfVxuICAgICAgfVxuICAgICAgZWxzZSBpZiAodHlwZSA9PT0gR29hbFR5cGUuVEFSR0VUKSB7XG4gICAgICB9XG4gICAgfVxuICB9XG59O1xuIiwiLypcbiAqIE1JVCBMaWNlbnNlXG4gKlxuICogQ29weXJpZ2h0IChjKSAyMDI1ICBZdXJpaSBZYWt1YmluICh5dXJpaS55YWt1YmluQGdtYWlsLmNvbSlcbiAqXG4gKiBQZXJtaXNzaW9uIGlzIGdyYW50ZWQgdG8gdXNlLCBjb3B5LCBtb2RpZnksIGFuZCBkaXN0cmlidXRlIHRoaXMgc29mdHdhcmVcbiAqIHVuZGVyIHRoZSBNSVQgTGljZW5zZS4gU2VlIExJQ0VOU0UgZmlsZSBmb3IgZGV0YWlscy5cbiAqL1xuXG5pbXBvcnQgeyBBYnNvbHV0ZVBhdGggfSBmcm9tIFwiQC9jb3JlL1BhdGhcIjtcblxuY29uc3QgTkFNRSA9IFN5bWJvbChcIk5BTUVcIik7XG5jb25zdCBQQVRIID0gU3ltYm9sKFwiUEFUSFwiKTtcblxuZXhwb3J0IGNsYXNzIEluY2x1ZGVEaXJlY3Rvcnkge1xuICBwcml2YXRlIFtOQU1FXTogc3RyaW5nO1xuICBwcml2YXRlIFtQQVRIXTogQWJzb2x1dGVQYXRoO1xuXG4gIHByaXZhdGUgY29uc3RydWN0b3IoZGlybmFtZTogYW55LCBiYXNlRGlyOiBBYnNvbHV0ZVBhdGgpIHtcbiAgICB0aGlzW05BTUVdID0gZGlybmFtZS50b1N0cmluZygpO1xuICAgIHRoaXNbUEFUSF0gPSBiYXNlRGlyLnJlc29sdmUoZGlybmFtZSk7XG4gIH1cblxuICBwdWJsaWMgc3RhdGljIGNyZWF0ZShkaXJuYW1lOiBhbnksIGJhc2VEaXI6IEFic29sdXRlUGF0aCkge1xuICAgIHJldHVybiBPYmplY3Quc2VhbChuZXcgSW5jbHVkZURpcmVjdG9yeShkaXJuYW1lLCBiYXNlRGlyKSk7XG4gIH1cblxuICBnZXQgTkFNRSgpIHtcbiAgICByZXR1cm4gdGhpc1tOQU1FXTtcbiAgfVxuXG4gIGdldCBQQVRIKCkge1xuICAgIHJldHVybiB0aGlzW1BBVEhdO1xuICB9XG5cbiAgdG9TdHJpbmcoKSB7XG4gICAgcmV0dXJuIHRoaXNbUEFUSF0udG9TdHJpbmcoKTtcbiAgfVxuXG4gIHRvSlNPTigpOiBvYmplY3Qge1xuICAgIHJldHVybiB7XG4gICAgICBOQU1FOiB0aGlzLk5BTUUsXG4gICAgICBQQVRIOiB0aGlzLlBBVEgsXG4gICAgfVxuICB9XG59O1xuIiwiLypcbiAqIE1JVCBMaWNlbnNlXG4gKlxuICogQ29weXJpZ2h0IChjKSAyMDI1ICBZdXJpaSBZYWt1YmluICh5dXJpaS55YWt1YmluQGdtYWlsLmNvbSlcbiAqXG4gKiBQZXJtaXNzaW9uIGlzIGdyYW50ZWQgdG8gdXNlLCBjb3B5LCBtb2RpZnksIGFuZCBkaXN0cmlidXRlIHRoaXMgc29mdHdhcmVcbiAqIHVuZGVyIHRoZSBNSVQgTGljZW5zZS4gU2VlIExJQ0VOU0UgZmlsZSBmb3IgZGV0YWlscy5cbiAqL1xuXG5pbXBvcnQgeyBJbnRlcmZhY2VUYXJnZXQgfSBmcm9tIFwiQC9jb3JlL0ludGVyZmFjZVRhcmdldFwiO1xuaW1wb3J0IHsgRGlyUGF0aCwgRmlsZVBhdGgsIEFic29sdXRlUGF0aCB9IGZyb20gXCJAL2NvcmUvUGF0aFwiO1xuaW1wb3J0IHsgU3lzdGVtU2NvcGUgfSBmcm9tIFwiQC9jb3JlL1N5c3RlbVNjb3BlXCI7XG5cbmNvbnN0IFZBTFVFICAgICAgID0gU3ltYm9sKFwiVkFMVUVcIik7XG5jb25zdCBERVNUSU5BVElPTiA9IFN5bWJvbChcIkRFU1RJTkFUSU9OXCIpO1xuY29uc3QgQkFTRV9ESVIgICAgPSBTeW1ib2woXCJCQVNFX0RJUlwiKTtcblxuZXhwb3J0IGNsYXNzIEluc3RhbGxFbnRpdHkge1xuICBwcml2YXRlIFtWQUxVRV06IEFic29sdXRlUGF0aCB8IEludGVyZmFjZVRhcmdldDtcbiAgcHJpdmF0ZSBbREVTVElOQVRJT05dOiBEaXJQYXRoO1xuICBwcml2YXRlIFtCQVNFX0RJUl06IERpclBhdGggfCBudWxsO1xuXG4gIHByaXZhdGUgY29uc3RydWN0b3Ioc2NvcGU6IFN5c3RlbVNjb3BlLCB2YWx1ZTogc3RyaW5nIHwgQWJzb2x1dGVQYXRoIHwgSW50ZXJmYWNlVGFyZ2V0LCBwYXJhbXM6IHN0cmluZyB8IGFueSkge1xuICAgIGxldCBkZXN0aW5hdGlvbjogc3RyaW5nIHwgQWJzb2x1dGVQYXRoIHwgdW5kZWZpbmVkO1xuICAgIGxldCBiYXNlRGlyO1xuICAgIGlmICh0eXBlb2YgcGFyYW1zID09PSBcInN0cmluZ1wiKVxuICAgICAgZGVzdGluYXRpb24gPSBwYXJhbXM7XG4gICAgZWxzZSBpZiAocGFyYW1zKSB7XG4gICAgICBkZXN0aW5hdGlvbiA9IHBhcmFtcy5kZXN0aW5hdGlvbjtcbiAgICAgIGJhc2VEaXIgPSBwYXJhbXMuYmFzZURpcjtcbiAgICB9XG4gIFxuICAgIGlmICghZGVzdGluYXRpb24pXG4gICAgICB0aHJvdyBuZXcgRXJyb3IoYFBhcmFtZXRlciBkZXN0aW5hdGlvbiBpcyBub3Qgc3BlY2lmaWVkYCk7XG4gIFxuICAgIGlmIChiYXNlRGlyKVxuICAgICAgYmFzZURpciA9IHNjb3BlLlNPVVJDRV9ESVIucmVzb2x2ZShiYXNlRGlyKTtcbiAgXG4gICAgaWYgKHR5cGVvZiB2YWx1ZSA9PT0gXCJzdHJpbmdcIiB8fCB2YWx1ZSBpbnN0YW5jZW9mIEFic29sdXRlUGF0aCkge1xuICAgICAgdmFsdWUgPSBzY29wZS5TT1VSQ0VfRElSLnJlc29sdmUodmFsdWUudG9TdHJpbmcoKSkgYXMgQWJzb2x1dGVQYXRoO1xuICAgICAgdmFsdWUgPSBGaWxlUGF0aC5jcmVhdGUodmFsdWUpO1xuICAgICAgYmFzZURpciA9IGJhc2VEaXIgfHwgdmFsdWUuZGlybmFtZSgpO1xuICAgIH1cbiAgICBlbHNlIGlmICghKHZhbHVlIGluc3RhbmNlb2YgSW50ZXJmYWNlVGFyZ2V0KSkge1xuICAgICAgdGhyb3cgbmV3IEVycm9yKGBOb3Qgc3VwcG9ydGV0IHZhbHVlIG9mICR7dmFsdWV9YCk7XG4gICAgfVxuICBcbiAgICB0aGlzW1ZBTFVFXSA9IHZhbHVlO1xuICAgIHRoaXNbREVTVElOQVRJT05dID0gRGlyUGF0aC5jcmVhdGUoc2NvcGUuSU5TVEFMTF9QUkVGSVgucmVzb2x2ZShkZXN0aW5hdGlvbi50b1N0cmluZygpKS50b1N0cmluZygpKTtcbiAgICB0aGlzW0JBU0VfRElSXSA9IGJhc2VEaXIgPyBEaXJQYXRoLmNyZWF0ZShiYXNlRGlyLnRvU3RyaW5nKCkpIDogbnVsbDtcbiAgfVxuICBcbiAgcHVibGljIHN0YXRpYyBjcmVhdGUoc2NvcGU6IGFueSwgdmFsdWU6IHN0cmluZyB8IEFic29sdXRlUGF0aCB8IEludGVyZmFjZVRhcmdldCwgcGFyYW1zOiBzdHJpbmcgfCBhbnkpIHtcbiAgICByZXR1cm4gT2JqZWN0LnNlYWwobmV3IEluc3RhbGxFbnRpdHkoc2NvcGUsIHZhbHVlLCBwYXJhbXMpKTtcbiAgfVxuXG4gIHB1YmxpYyBnZXQgVkFMVUUgKCkge1xuICAgIHJldHVybiB0aGlzW1ZBTFVFXTtcbiAgfVxuXG4gIHB1YmxpYyBnZXQgREVTVElOQVRJT04gKCkge1xuICAgIHJldHVybiB0aGlzW0RFU1RJTkFUSU9OXTtcbiAgfVxuXG4gIHB1YmxpYyBnZXQgQkFTRV9ESVIgKCkge1xuICAgIHJldHVybiB0aGlzW0JBU0VfRElSXTtcbiAgfVxuXG4gIHB1YmxpYyB0b0pTT04oKTogb2JqZWN0IHtcbiAgICByZXR1cm4ge1xuICAgICAgVkFMVUU6IHRoaXMuVkFMVUUsXG4gICAgICBERVNUSU5BVElPTjogdGhpcy5ERVNUSU5BVElPTixcbiAgICAgIEJBU0VfRElSOiB0aGlzLkJBU0VfRElSLFxuICAgIH07XG4gIH1cbn07XG4iLCIvKlxuICogTUlUIExpY2Vuc2VcbiAqXG4gKiBDb3B5cmlnaHQgKGMpIDIwMjUgIFl1cmlpIFlha3ViaW4gKHl1cmlpLnlha3ViaW5AZ21haWwuY29tKVxuICpcbiAqIFBlcm1pc3Npb24gaXMgZ3JhbnRlZCB0byB1c2UsIGNvcHksIG1vZGlmeSwgYW5kIGRpc3RyaWJ1dGUgdGhpcyBzb2Z0d2FyZVxuICogdW5kZXIgdGhlIE1JVCBMaWNlbnNlLiBTZWUgTElDRU5TRSBmaWxlIGZvciBkZXRhaWxzLlxuICovXG5cbmNvbnN0IE5BTUUgPSBTeW1ib2woXCJOQU1FXCIpO1xuXG5leHBvcnQgY2xhc3MgSW50ZXJmYWNlSW5jbHVkZXMge1xuICBwcml2YXRlIFtOQU1FXTogc3RyaW5nO1xuXG4gIHByaXZhdGUgY29uc3RydWN0b3IobmFtZTogc3RyaW5nKSB7XG4gICAgdGhpc1tOQU1FXSA9IG5hbWU7XG4gIH1cblxuICBwdWJsaWMgZ2V0IHRhcmdldE5hbWUoKSB7XG4gICAgcmV0dXJuIHRoaXNbTkFNRV07XG4gIH1cblxuICBwdWJsaWMgdG9TdHJpbmcoKTogc3RyaW5nIHtcbiAgICByZXR1cm4gXCIke1wiICsgdGhpc1tOQU1FXSArIFwiLmluY2x1ZGVzfVwiO1xuICB9XG5cbiAgcHVibGljIHRvSlNPTigpIHtcbiAgICByZXR1cm4gdGhpcy50b1N0cmluZygpO1xuICB9XG5cbiAgcHVibGljIHN0YXRpYyBjcmVhdGUobmFtZTogc3RyaW5nKSB7XG4gICAgcmV0dXJuIE9iamVjdC5zZWFsKG5ldyBJbnRlcmZhY2VJbmNsdWRlcyhuYW1lKSk7XG4gIH1cblxuICBwdWJsaWMgc3RhdGljIGVuc3VyZUluc3RhbmNlKHZhbHVlOiBhbnkpIHtcbiAgICBpZiAodmFsdWUgaW5zdGFuY2VvZiBJbnRlcmZhY2VJbmNsdWRlcylcbiAgICAgIHJldHVybiB2YWx1ZTtcbiAgICB0aHJvdyBuZXcgRXJyb3IoYFRoZSAnJHt2YWx1ZX0nIGlzIG5vdCBhIEludGVyZmFjZUluY2x1ZGVzYCk7XG4gIH1cbn07XG4iLCIvKlxuICogTUlUIExpY2Vuc2VcbiAqXG4gKiBDb3B5cmlnaHQgKGMpIDIwMjUgIFl1cmlpIFlha3ViaW4gKHl1cmlpLnlha3ViaW5AZ21haWwuY29tKVxuICpcbiAqIFBlcm1pc3Npb24gaXMgZ3JhbnRlZCB0byB1c2UsIGNvcHksIG1vZGlmeSwgYW5kIGRpc3RyaWJ1dGUgdGhpcyBzb2Z0d2FyZVxuICogdW5kZXIgdGhlIE1JVCBMaWNlbnNlLiBTZWUgTElDRU5TRSBmaWxlIGZvciBkZXRhaWxzLlxuICovXG5cbmNvbnN0IE5BTUUgPSBTeW1ib2woXCJOQU1FXCIpO1xuXG5leHBvcnQgY2xhc3MgSW50ZXJmYWNlT2JqZWN0cyB7XG4gIHByaXZhdGUgW05BTUVdOiBzdHJpbmc7XG5cbiAgcHJpdmF0ZSBjb25zdHJ1Y3RvcihuYW1lOiBzdHJpbmcpIHtcbiAgICB0aGlzW05BTUVdID0gbmFtZTtcbiAgfVxuXG4gIHB1YmxpYyBzdGF0aWMgY3JlYXRlKG5hbWU6IHN0cmluZykge1xuICAgIHJldHVybiBPYmplY3Quc2VhbChuZXcgSW50ZXJmYWNlT2JqZWN0cyhuYW1lKSk7XG4gIH1cblxuICBwdWJsaWMgc3RhdGljIGVuc3VyZUluc3RhbmNlKHZhbHVlOiBhbnkpOiBJbnRlcmZhY2VPYmplY3RzIHtcbiAgICBpZiAodmFsdWUgaW5zdGFuY2VvZiBJbnRlcmZhY2VPYmplY3RzKVxuICAgICAgcmV0dXJuIHZhbHVlO1xuICAgIHRocm93IG5ldyBFcnJvcihgVGhlICcke3ZhbHVlfScgaXMgbm90IGEgSW50ZXJmYWNlT2JqZWN0c2ApO1xuICB9XG5cbiAgcHVibGljIGdldCB0YXJnZXROYW1lKCk6IHN0cmluZyB7XG4gICAgcmV0dXJuIHRoaXNbTkFNRV07XG4gIH1cblxuICBwdWJsaWMgdG9TdHJpbmcoKTogc3RyaW5nIHtcbiAgICByZXR1cm4gXCIke1wiICsgdGhpc1tOQU1FXSArIFwiLm9iamVjdHN9XCI7XG4gIH1cblxuICBwdWJsaWMgdG9KU09OKCk6IHN0cmluZyB7XG4gICAgcmV0dXJuIHRoaXMudG9TdHJpbmcoKTtcbiAgfVxufTtcbiIsIi8qXG4gKiBNSVQgTGljZW5zZVxuICpcbiAqIENvcHlyaWdodCAoYykgMjAyNSAgWXVyaWkgWWFrdWJpbiAoeXVyaWkueWFrdWJpbkBnbWFpbC5jb20pXG4gKlxuICogUGVybWlzc2lvbiBpcyBncmFudGVkIHRvIHVzZSwgY29weSwgbW9kaWZ5LCBhbmQgZGlzdHJpYnV0ZSB0aGlzIHNvZnR3YXJlXG4gKiB1bmRlciB0aGUgTUlUIExpY2Vuc2UuIFNlZSBMSUNFTlNFIGZpbGUgZm9yIGRldGFpbHMuXG4gKi9cblxuaW1wb3J0IHsgU2NvcGVIZWxwZXIgfSBmcm9tIFwiQC9jb3JlL1Njb3BlXCI7XG5cbmNvbnN0IE5BTUUgICAgICAgPSBTeW1ib2woXCJOQU1FXCIpO1xuY29uc3QgVkFSSUFCTEVTID0gU3ltYm9sKFwiVkFSSUFCTEVTXCIpO1xuXG5leHBvcnQgY2xhc3MgSW50ZXJmYWNlU2NyaXB0IHtcbiAgcHJpdmF0ZSBbTkFNRV06IHN0cmluZztcbiAgcHJpdmF0ZSBbVkFSSUFCTEVTXTogb2JqZWN0O1xuXG4gIHByaXZhdGUgY29uc3RydWN0b3IobmFtZTogc3RyaW5nKSB7XG4gICAgdGhpc1tOQU1FXSA9IG5hbWU7XG4gICAgdGhpc1tWQVJJQUJMRVNdID0ge307XG4gIH1cblxuICBwdWJsaWMgZ2V0IE5BTUUoKSB7XG4gICAgcmV0dXJuIHRoaXNbTkFNRV07XG4gIH1cblxuICBwdWJsaWMgZ2V0IFZBUklBQkxFUygpIHtcbiAgICByZXR1cm4gdGhpc1tWQVJJQUJMRVNdO1xuICB9XG5cbiAgcHVibGljIG1lcmdlVmFyaWFibGVzKHZhcmlhYmxlczogYW55KSB7XG4gICAgU2NvcGVIZWxwZXIubWVyZ2VWYXJpYWJsZXModGhpc1tWQVJJQUJMRVNdLCB2YXJpYWJsZXMpO1xuICB9XG5cbiAgcHVibGljIHRvSlNPTigpOiBvYmplY3Qge1xuICAgIHJldHVybiB7XG4gICAgICBOQU1FOiB0aGlzLk5BTUUsXG4gICAgICBWQVJJQUJMRVM6IHRoaXMuVkFSSUFCTEVTLFxuICAgIH07XG4gIH1cbiAgXG4gIHB1YmxpYyB0b1N0cmluZygpOiBzdHJpbmcge1xuICAgIHJldHVybiB0aGlzW05BTUVdO1xuICB9XG5cbiAgcHVibGljIHN0YXRpYyBjcmVhdGUobmFtZTogc3RyaW5nKSB7XG4gICAgcmV0dXJuIE9iamVjdC5zZWFsKG5ldyBJbnRlcmZhY2VTY3JpcHQobmFtZSkpO1xuICB9XG5cbiAgcHVibGljIHN0YXRpYyBlbnN1cmVJbnN0YW5jZSh2YWx1ZTogYW55KSB7XG4gICAgaWYgKHZhbHVlIGluc3RhbmNlb2YgSW50ZXJmYWNlU2NyaXB0KVxuICAgICAgcmV0dXJuIHZhbHVlO1xuICAgIHRocm93IG5ldyBFcnJvcihgVGhlICcke3ZhbHVlfScgaXMgbm90IGEgSW50ZXJmYWNlU2NyaXB0YCk7XG4gIH1cbn07XG4iLCIvKlxuICogTUlUIExpY2Vuc2VcbiAqXG4gKiBDb3B5cmlnaHQgKGMpIDIwMjUgIFl1cmlpIFlha3ViaW4gKHl1cmlpLnlha3ViaW5AZ21haWwuY29tKVxuICpcbiAqIFBlcm1pc3Npb24gaXMgZ3JhbnRlZCB0byB1c2UsIGNvcHksIG1vZGlmeSwgYW5kIGRpc3RyaWJ1dGUgdGhpcyBzb2Z0d2FyZVxuICogdW5kZXIgdGhlIE1JVCBMaWNlbnNlLiBTZWUgTElDRU5TRSBmaWxlIGZvciBkZXRhaWxzLlxuICovXG5cbmltcG9ydCB7IEFic29sdXRlUGF0aCB9IGZyb20gXCJAL2NvcmUvUGF0aFwiO1xuaW1wb3J0IHsgSW50ZXJmYWNlSW5jbHVkZXMgfSBmcm9tIFwiQC9jb3JlL0ludGVyZmFjZUluY2x1ZGVzXCI7XG5pbXBvcnQgeyBJbnRlcmZhY2VPYmplY3RzIH0gZnJvbSBcIkAvY29yZS9JbnRlcmZhY2VPYmplY3RzXCI7XG5pbXBvcnQgeyBJbmNsdWRlRGlyZWN0b3J5IH0gZnJvbSBcIkAvY29yZS9JbmNsdWRlRGlyZWN0b3J5XCI7XG5pbXBvcnQgeyBTb3VyY2VGaWxlIH0gZnJvbSBcIkAvY29yZS9Tb3VyY2VGaWxlXCI7XG5pbXBvcnQgeyBTeXN0ZW1TY29wZSB9IGZyb20gXCJAL2NvcmUvU3lzdGVtU2NvcGVcIjtcbmltcG9ydCB7IFNjb3BlSGVscGVyIH0gZnJvbSBcIkAvY29yZS9TY29wZVwiO1xuXG5jb25zdCBVTktOT1dOX1RBUkdFVCA9IFN5bWJvbChcIlVOS05PV05fVEFSR0VUXCIpO1xuY29uc3QgU0NPUEUgPSBTeW1ib2woXCJTQ09QRVwiKTtcblxuZXhwb3J0IGNsYXNzIEludGVyZmFjZVRhcmdldCB7XG4gIHByaXZhdGUgW1NDT1BFXTogU3lzdGVtU2NvcGU7XG4gIHByaXZhdGUgW1VOS05PV05fVEFSR0VUXTogYW55O1xuXG4gIHByaXZhdGUgY29uc3RydWN0b3Ioc2NvcGU6IGFueSwgdXRhcmdldDogYW55KSB7XG4gICAgdGhpc1tTQ09QRV0gPSBTY29wZUhlbHBlci5jbG9uZSh7fSwgc2NvcGUpO1xuICAgIHRoaXNbVU5LTk9XTl9UQVJHRVRdID0gdXRhcmdldDtcbiAgfVxuXG4gIHB1YmxpYyBzdGF0aWMgY3JlYXRlKHNjb3BlOiBhbnksIHV0YXJnZXQ6IGFueSkge1xuICAgIHJldHVybiBPYmplY3Quc2VhbChuZXcgSW50ZXJmYWNlVGFyZ2V0KHNjb3BlLCB1dGFyZ2V0KSk7XG4gIH1cblxuICBwdWJsaWMgc3RhdGljIGVuc3VyZUluc3RhbmNlKHZhbHVlOiBhbnkpIHtcbiAgICBpZiAodmFsdWUgaW5zdGFuY2VvZiBJbnRlcmZhY2VUYXJnZXQpXG4gICAgICByZXR1cm4gdmFsdWU7XG4gICAgdGhyb3cgbmV3IEVycm9yKGBUaGUgJyR7dmFsdWV9JyBpcyBub3QgYSBJbnRlcmZhY2VUYXJnZXRgKTtcbiAgfVxuXG4gIHB1YmxpYyBnZXQgdGFyZ2V0TmFtZSgpOiBzdHJpbmcge1xuICAgIHJldHVybiB0aGlzW1VOS05PV05fVEFSR0VUXS5OQU1FO1xuICB9XG5cbiAgcHVibGljIGdldCBpbmNsdWRlcygpOiBJbnRlcmZhY2VJbmNsdWRlcyB7XG4gICAgcmV0dXJuIEludGVyZmFjZUluY2x1ZGVzLmNyZWF0ZSh0aGlzLnRhcmdldE5hbWUpO1xuICB9XG5cbiAgcHVibGljIGdldCBvYmplY3RzKCk6IEludGVyZmFjZU9iamVjdHMge1xuICAgIHJldHVybiBJbnRlcmZhY2VPYmplY3RzLmNyZWF0ZSh0aGlzLnRhcmdldE5hbWUpO1xuICB9XG5cbiAgcHVibGljIHRvSlNPTigpOiBzdHJpbmcge1xuICAgIHJldHVybiB0aGlzLnRvU3RyaW5nKCk7XG4gIH1cblxuICBwdWJsaWMgdG9TdHJpbmcoKTogc3RyaW5nIHtcbiAgICByZXR1cm4gXCIke1wiICsgdGhpcy50YXJnZXROYW1lICsgXCJ9XCI7XG4gIH1cblxuICBwdWJsaWMgYWRkU291cmNlcyguLi5zb3VyY2VzOiBBcnJheTxJbnRlcmZhY2VPYmplY3RzfFNvdXJjZUZpbGV8QWJzb2x1dGVQYXRofHN0cmluZz4pOiB2b2lkIHtcbiAgICBmb3IgKGxldCBpdCBvZiBzb3VyY2VzLmZsYXQoMSkpIHtcbiAgICAgIGlmIChpdCBpbnN0YW5jZW9mIEludGVyZmFjZU9iamVjdHMgfHwgaXQgaW5zdGFuY2VvZiBTb3VyY2VGaWxlKVxuICAgICAgICB7fVxuICAgICAgZWxzZSBpZiAodHlwZW9mIGl0ID09PSBcInN0cmluZ1wiIHx8IEFic29sdXRlUGF0aC5pc0Fic29sdXRlKGl0KSlcbiAgICAgICAgaXQgPSBTb3VyY2VGaWxlLmNyZWF0ZSh0aGlzW1NDT1BFXSwgaXQpO1xuICAgICAgZWxzZVxuICAgICAgICB0aHJvdyBuZXcgRXJyb3IoYE5vdCBzdXBwb3J0IGluc3RhbmNlICR7aXR9YCk7XG4gICAgICB0aGlzW1VOS05PV05fVEFSR0VUXS5TT1VSQ0VTLnB1c2goaXQpO1xuICAgIH1cbiAgfVxuXG4gIHB1YmxpYyBhZGRJbmNsdWRlcyguLi5pbmNsdWRlczogQXJyYXk8SW50ZXJmYWNlSW5jbHVkZXN8QWJzb2x1dGVQYXRofHN0cmluZz4pOiB2b2lkIHtcbiAgICBmb3IgKGNvbnN0IGl0IG9mIGluY2x1ZGVzLmZsYXQoMSkpIHtcbiAgICAgIGxldCBWQUxVRTtcbiAgICAgIGlmIChpdCBpbnN0YW5jZW9mIEludGVyZmFjZUluY2x1ZGVzKVxuICAgICAgICBWQUxVRSA9IGl0O1xuICAgICAgZWxzZSBpZiAodHlwZW9mIGl0ID09PSBcInN0cmluZ1wiIHx8IEFic29sdXRlUGF0aC5pc0Fic29sdXRlKGl0KSlcbiAgICAgICAgVkFMVUUgPSBJbmNsdWRlRGlyZWN0b3J5LmNyZWF0ZShpdCwgdGhpc1tTQ09QRV0uU09VUkNFX0RJUik7XG4gICAgICBlbHNlXG4gICAgICAgIHRocm93IG5ldyBFcnJvcihgTm90IHN1cHBvcnQgaW5zdGFuY2UgJHtpdH1gKTtcbiAgICAgIHRoaXNbVU5LTk9XTl9UQVJHRVRdLklOQ0xVREVTLnB1c2goeyBWQUxVRSwgUFVCTElDX09OTFk6IGZhbHNlIH0pO1xuICAgIH1cbiAgfVxuXG4gIHB1YmxpYyBhZGRQdWJsaWNJbmNsdWRlcyguLi5pbmNsdWRlczogQXJyYXk8SW50ZXJmYWNlSW5jbHVkZXN8QWJzb2x1dGVQYXRofHN0cmluZz4pOiB2b2lkIHtcbiAgICBmb3IgKGNvbnN0IGl0IG9mIGluY2x1ZGVzLmZsYXQoMSkpIHtcbiAgICAgIGxldCBWQUxVRTtcbiAgICAgIGlmIChpdCBpbnN0YW5jZW9mIEludGVyZmFjZUluY2x1ZGVzKVxuICAgICAgICBWQUxVRSA9IGl0O1xuICAgICAgZWxzZSBpZiAodHlwZW9mIGl0ID09PSBcInN0cmluZ1wiIHx8IEFic29sdXRlUGF0aC5pc0Fic29sdXRlKGl0KSlcbiAgICAgICAgVkFMVUUgPSBJbmNsdWRlRGlyZWN0b3J5LmNyZWF0ZShpdCwgdGhpc1tTQ09QRV0uU09VUkNFX0RJUik7XG4gICAgICBlbHNlXG4gICAgICAgIHRocm93IG5ldyBFcnJvcihgTm90IHN1cHBvcnQgaW5zdGFuY2UgJHtpdH1gKTtcbiAgICAgIHRoaXNbVU5LTk9XTl9UQVJHRVRdLklOQ0xVREVTLnB1c2goeyBWQUxVRSwgUFVCTElDX09OTFk6IHRydWUgfSk7XG4gICAgfVxuICB9XG5cbiAgcHVibGljIGFkZERlZmluaXRpb25zKC4uLmRlZmluaXRpb25zOiBzdHJpbmdbXSk6IHZvaWQge1xuICAgIGZvciAoY29uc3QgVkFMVUUgb2YgZGVmaW5pdGlvbnMuZmxhdCgxKSlcbiAgICAgIHRoaXNbVU5LTk9XTl9UQVJHRVRdLkRFRklORVMucHVzaCh7IFZBTFVFIH0pO1xuICB9XG5cbiAgcHVibGljIGFkZFB1YmxpY0RlZmluaXRpb25zKC4uLmRlZmluaXRpb25zOiBzdHJpbmdbXSk6IHZvaWQge1xuICAgIGZvciAoY29uc3QgVkFMVUUgb2YgZGVmaW5pdGlvbnMuZmxhdCgxKSlcbiAgICAgIHRoaXNbVU5LTk9XTl9UQVJHRVRdLkRFRklORVMucHVzaCh7IFZBTFVFLCBQVUJMSUNfT05MWTogdHJ1ZSB9KTtcbiAgfVxuXG4gIHB1YmxpYyBhZGRDb21waWxlT3B0aW9ucyguLi5vcHRpb25zOiBzdHJpbmdbXSk6IHZvaWQge1xuICAgIGZvciAoY29uc3QgaXQgb2Ygb3B0aW9ucy5mbGF0KDEpKSB7XG4gICAgICB0aGlzW1VOS05PV05fVEFSR0VUXS5DT01QSUxFX09QVElPTlMucHVzaCh7IFZBTFVFOiBpdCB9KTtcbiAgICB9XG4gIH1cblxuICBwdWJsaWMgYWRkTGlua09wdGlvbnMoLi4ub3B0aW9uczogc3RyaW5nW10pOiB2b2lkIHtcbiAgICBmb3IgKGNvbnN0IGl0IG9mIG9wdGlvbnMuZmxhdCgxKSkge1xuICAgICAgdGhpc1tVTktOT1dOX1RBUkdFVF0uTElOS19PUFRJT05TLnB1c2goeyBWQUxVRTogaXQgfSk7XG4gICAgfVxuICB9XG5cbiAgcHVibGljIGFkZFB1YmxpY0NvbXBpbGVPcHRpb25zKC4uLm9wdGlvbnM6IHN0cmluZ1tdKTogdm9pZCB7XG4gICAgZm9yIChjb25zdCBpdCBvZiBvcHRpb25zLmZsYXQoMSkpIHtcbiAgICAgIHRoaXNbVU5LTk9XTl9UQVJHRVRdLkNPTVBJTEVfT1BUSU9OUy5wdXNoKHsgVkFMVUU6IGl0LCBQVUJMSUNfT05MWTogdHJ1ZSB9KTtcbiAgICB9XG4gIH1cblxuICBwdWJsaWMgYWRkUHVibGljTGlua09wdGlvbnMoLi4ub3B0aW9uczogc3RyaW5nW10pOiB2b2lkIHtcbiAgICBmb3IgKGNvbnN0IGl0IG9mIG9wdGlvbnMuZmxhdCgxKSkge1xuICAgICAgdGhpc1tVTktOT1dOX1RBUkdFVF0uTElOS19PUFRJT05TLnB1c2goeyBWQUxVRTogaXQsIFBVQkxJQ19PTkxZOiB0cnVlIH0pO1xuICAgIH1cbiAgfVxufTtcbiIsIi8qXG4gKiBNSVQgTGljZW5zZVxuICpcbiAqIENvcHlyaWdodCAoYykgMjAyNSAgWXVyaWkgWWFrdWJpbiAoeXVyaWkueWFrdWJpbkBnbWFpbC5jb20pXG4gKlxuICogUGVybWlzc2lvbiBpcyBncmFudGVkIHRvIHVzZSwgY29weSwgbW9kaWZ5LCBhbmQgZGlzdHJpYnV0ZSB0aGlzIHNvZnR3YXJlXG4gKiB1bmRlciB0aGUgTUlUIExpY2Vuc2UuIFNlZSBMSUNFTlNFIGZpbGUgZm9yIGRldGFpbHMuXG4gKi9cblxuaW1wb3J0IHBhdGggZnJvbSBcIm5vZGU6cGF0aFwiO1xuXG5pbXBvcnQgeyBmaWxlRXhpc3RzU3luYyB9IGZyb20gXCJAL3V0aWxzL0ZpbGVTeXN0ZW1cIjtcbmltcG9ydCB7IEFic29sdXRlUGF0aCB9IGZyb20gXCJAL2NvcmUvUGF0aFwiO1xuaW1wb3J0IHsgSW50ZXJmYWNlVGFyZ2V0IH0gZnJvbSBcIkAvY29yZS9JbnRlcmZhY2VUYXJnZXRcIjtcbmltcG9ydCB7IEludGVyZmFjZVNjcmlwdCB9IGZyb20gXCJAL2NvcmUvSW50ZXJmYWNlU2NyaXB0XCI7XG5pbXBvcnQgeyBJbnN0YWxsRW50aXR5IH0gZnJvbSBcIkAvY29yZS9JbnN0YWxsRW50aXR5XCI7XG5pbXBvcnQgeyBPYmplY3RMaWJyYXJ5LCBTdGF0aWNMaWJyYXJ5LCBTaGFyZWRMaWJyYXJ5LCBFeGVjdXRhYmxlLCBCYXNlVGFyZ2V0IH0gZnJvbSBcIkAvY29yZS9UYXJnZXRcIjtcbmltcG9ydCB7IEluY2x1ZGVEaXJlY3RvcnkgfSBmcm9tIFwiQC9jb3JlL0luY2x1ZGVEaXJlY3RvcnlcIjtcbmltcG9ydCB7IEN1c3RvbVNjcmlwdCB9IGZyb20gXCJAL2NvcmUvQ3VzdG9tU2NyaXB0XCI7XG5pbXBvcnQgeyBHbG9iYWxDb250ZXh0IH0gZnJvbSBcIkAvY29yZS9HbG9iYWxDb250ZXh0XCI7XG5pbXBvcnQgeyBTY29wZUhlbHBlciB9IGZyb20gXCJAL2NvcmUvU2NvcGVcIjtcbmltcG9ydCB7IFN5c3RlbVNjb3BlIH0gZnJvbSBcIkAvY29yZS9TeXN0ZW1TY29wZVwiO1xuaW1wb3J0IHsgZmluZFByb2dyYW1TeW5jIH0gZnJvbSBcIkAvY29yZS9GaW5kUHJvZ3JhbVwiO1xuaW1wb3J0IHsgY3JlYXRlTG9nZ2VyIH0gZnJvbSBcIkAvbG9nZ2VyXCI7XG5cbmNvbnN0IGxvZ2dlciA9IGNyZWF0ZUxvZ2dlcihpbXBvcnQubWV0YS51cmwpO1xuXG5jb25zdCByZXF1aXJlSW1wbCA9IGV2YWwoXCJyZXF1aXJlXCIpO1xuXG5mdW5jdGlvbiBzY29wZVZhbHVlQXNQcmltaXRpdmVzKG86IGFueSk6IGFueSB7XG4gIGlmICh0eXBlb2YgbyA9PT0gXCJ1bmRlZmluZWRcIilcbiAgICByZXR1cm4gbztcbiAgaWYgKHR5cGVvZiBvID09PSBcImJvb2xlYW5cIilcbiAgICByZXR1cm4gbztcbiAgaWYgKHR5cGVvZiBvID09PSBcIm51bWJlclwiKVxuICAgIHJldHVybiBvO1xuICBpZiAodHlwZW9mIG8gPT09IFwic3RyaW5nXCIpXG4gICAgcmV0dXJuIG87XG4gIGlmICh0eXBlb2YgbyA9PT0gXCJvYmplY3RcIikge1xuICAgIGlmICghbylcbiAgICAgIHJldHVybiBvO1xuICAgIGlmIChvIGluc3RhbmNlb2YgQWJzb2x1dGVQYXRoKSB7XG4gICAgICByZXR1cm4gby50b1N0cmluZygpO1xuICAgIH1cbiAgICBpZiAobyBpbnN0YW5jZW9mIEFycmF5KSB7XG4gICAgICBjb25zdCByZXN1bHQgPSBbXTtcbiAgICAgIGZvciAoY29uc3QgaSBvZiBvKVxuICAgICAgICByZXN1bHQucHVzaChzY29wZVZhbHVlQXNQcmltaXRpdmVzKGkpKTtcbiAgICAgIHJldHVybiByZXN1bHQ7XG4gICAgfVxuICAgIGlmIChvIGluc3RhbmNlb2YgT2JqZWN0KSB7XG4gICAgICBjb25zdCByZXN1bHQ6IGFueSA9IHt9O1xuICAgICAgZm9yIChjb25zdCBbayx2XSBvZiBPYmplY3QuZW50cmllcyhvKSlcbiAgICAgICAgcmVzdWx0W2tdID0gc2NvcGVWYWx1ZUFzUHJpbWl0aXZlcyh2KTtcbiAgICAgIHJldHVybiByZXN1bHQ7XG4gICAgfVxuICB9XG4gIHRocm93IG5ldyBFcnJvcihgVW5rbm93biBpbnN0YW5jZSBvZiAke299YCk7XG59XG5cbmNvbnN0IEdMT0JBTCA9IFN5bWJvbChcIkdMT0JBTFwiKTtcbmNvbnN0IFNDT1BFID0gU3ltYm9sKFwiU0NPUEVcIik7XG5cbmV4cG9ydCBuYW1lc3BhY2UgTWFrZUNvbnRleHQge1xuXG5pbnRlcmZhY2UgSU1ha2VDb250ZXh0IGV4dGVuZHMgU3lzdGVtU2NvcGUge1xuICBmaW5kUHJvZ3JhbShuYW1lOiBzdHJpbmcpOiBzdHJpbmcgfCB1bmRlZmluZWQ7XG5cbiAgZ2V0Q2FjaGVWYXJpYWJsZXMoKTogYW55O1xuICBhZGRDYWNoZVZhcmlhYmxlcyhwYXJhbXM6IGFueSk6IHZvaWQ7XG4gIGFkZEluY2x1ZGVEaXJlY3RvcmllcyguLi5kaXJzOiBhbnlbXSk6IHZvaWQ7XG4gIGFkZFN1YmRpcmVjdG9yeShzb3VyY2VEaXI6IGFueSwgYmluYXJ5RGlyOiBhbnkpOiB2b2lkO1xuICBhZGRDdXN0b21TY3JpcHQoc2NyaXB0OiBhbnksIHBhcmFtczogYW55KTogQ3VzdG9tU2NyaXB0O1xuICB0YXJnZXQobmFtZTogc3RyaW5nKTogSW50ZXJmYWNlVGFyZ2V0O1xuICBzY3JpcHQobmFtZTogc3RyaW5nKTogSW50ZXJmYWNlU2NyaXB0O1xuICBpbnN0YWxsKHZhbHVlOiBhbnksIHBhcmFtczogYW55KTogdm9pZDtcbiAgYWRkU3RhdGljTGlicmFyeShuYW1lOiBhbnksIC4uLnNvdXJjZXM6IGFueVtdKTogU3RhdGljTGlicmFyeTtcbiAgYWRkU2hhcmVkTGlicmFyeShuYW1lOiBhbnksIC4uLnNvdXJjZXM6IGFueVtdKTogU2hhcmVkTGlicmFyeTtcbiAgYWRkRXhlY3V0YWJsZShuYW1lOiBzdHJpbmcsIC4uLnNvdXJjZXM6IGFueVtdKTogRXhlY3V0YWJsZTtcbiAgZXhlY3V0ZVNjcmlwdCh0aGlzOiBJTWFrZUNvbnRleHQsIHNjcmlwdDogYW55LCBvcHRpb25zOiBhbnkpOiB2b2lkO1xuXG4gIFtTQ09QRV06IFN5c3RlbVNjb3BlO1xuICBbR0xPQkFMXTogR2xvYmFsQ29udGV4dDtcbn07XG5cbmNvbnN0IG1ldGhvZHMgPSB7XG4gIGZpbmRQcm9ncmFtOiBmaW5kUHJvZ3JhbVN5bmMsXG5cbiAgZ2V0Q2FjaGVWYXJpYWJsZXModGhpczogSU1ha2VDb250ZXh0KSB7XG4gICAgcmV0dXJuIFNjb3BlSGVscGVyLmdldFZhcmlhYmxlc0J5R3JvdXAodGhpc1tTQ09QRV0sIFwiY2FjaGVcIik7XG4gIH0sXG5cbiAgYWRkQ2FjaGVWYXJpYWJsZXModGhpczogSU1ha2VDb250ZXh0LCBwYXJhbXM6IGFueSkge1xuICAgIGxldCB2YXJpYWJsZXMgPSBwYXJhbXM7XG4gICAgaWYgKHR5cGVvZiBwYXJhbXMgPT09IFwic3RyaW5nXCIpIHtcbiAgICAgIGNvbnN0IGZpbGVuYW1lID0gdGhpc1tTQ09QRV0uU09VUkNFX0RJUi5yZXNvbHZlKHBhcmFtcykudG9TdHJpbmcoKTtcbiAgICAgIGlmICghZmlsZUV4aXN0c1N5bmMoZmlsZW5hbWUpKVxuICAgICAgICByZXR1cm47XG4gICAgICB2YXJpYWJsZXMgPSByZXF1aXJlSW1wbChmaWxlbmFtZSk7XG4gICAgfVxuICAgIFxuICAgIFNjb3BlSGVscGVyLmRlZmluZVZhcmlhYmxlcyh0aGlzW1NDT1BFXSwgXCJjYWNoZVwiLCB2YXJpYWJsZXMpO1xuICB9LFxuICBcbiAgYWRkSW5jbHVkZURpcmVjdG9yaWVzKHRoaXM6IElNYWtlQ29udGV4dCwgLi4uZGlyczogYW55W10pIHtcbiAgICBjb25zdCBzb3VyY2VEaXIgPSB0aGlzW1NDT1BFXS5TT1VSQ0VfRElSO1xuICAgIGZvciAoY29uc3QgaXRlciBvZiBkaXJzLmZsYXQoMSkpIHtcbiAgICAgIHRoaXNbU0NPUEVdLklOQ0xVREVTLnB1c2goSW5jbHVkZURpcmVjdG9yeS5jcmVhdGUoaXRlciwgc291cmNlRGlyKSk7XG4gICAgfVxuICB9LFxuICBcbiAgYWRkU3ViZGlyZWN0b3J5KHRoaXM6IElNYWtlQ29udGV4dCwgc291cmNlRGlyOiBhbnksIGJpbmFyeURpcjogYW55KSB7XG4gICAgYmluYXJ5RGlyID0gYmluYXJ5RGlyIHx8IHBhdGguaXNBYnNvbHV0ZShzb3VyY2VEaXIpID8gdW5kZWZpbmVkIDogc291cmNlRGlyO1xuICBcbiAgICBjb25zdCBTT1VSQ0VfRElSID0gcGF0aC5pc0Fic29sdXRlKHNvdXJjZURpcikgPyBBYnNvbHV0ZVBhdGguY3JlYXRlKHNvdXJjZURpcikgOiB0aGlzW1NDT1BFXS5TT1VSQ0VfRElSLmpvaW4oc291cmNlRGlyKTtcbiAgICBjb25zdCBCSU5BUllfRElSID0gcGF0aC5pc0Fic29sdXRlKGJpbmFyeURpcikgPyBBYnNvbHV0ZVBhdGguY3JlYXRlKGJpbmFyeURpcikgOiB0aGlzW1NDT1BFXS5CSU5BUllfRElSLmpvaW4oYmluYXJ5RGlyKTtcbiAgXG4gICAgY29uc3QgbmV3U2NvcGUgPSBTY29wZUhlbHBlci5jbG9uZSh7fSwgdGhpc1tTQ09QRV0pO1xuICAgIFNjb3BlSGVscGVyLmFwcGx5VmFyaWFibGVzKG5ld1Njb3BlLCB0aGlzKTtcbiAgXG4gICAgbmV3U2NvcGUuU09VUkNFX0RJUiA9IEFic29sdXRlUGF0aC5jcmVhdGUodGhpc1tHTE9CQUxdLnJlc29sdmVTdWJkaXJlY3RvcnkoU09VUkNFX0RJUikudG9TdHJpbmcoKSk7XG4gICAgbmV3U2NvcGUuQklOQVJZX0RJUiA9IEJJTkFSWV9ESVI7XG4gIFxuICAgIHRoaXNbR0xPQkFMXS5hZGRTdWJkaXJlY3RvcnkobmV3U2NvcGUpO1xuICB9LFxuICBcbiAgYWRkQ3VzdG9tU2NyaXB0KHRoaXM6IElNYWtlQ29udGV4dCwgc2NyaXB0OiBhbnksIHBhcmFtczogYW55KTogQ3VzdG9tU2NyaXB0IHtcbiAgICBjb25zdCBuZXdTY29wZSA9IFNjb3BlSGVscGVyLmNsb25lKHt9LCB0aGlzW1NDT1BFXSk7XG4gICAgU2NvcGVIZWxwZXIuYXBwbHlWYXJpYWJsZXMobmV3U2NvcGUsIHRoaXMpO1xuICAgIHJldHVybiB0aGlzW0dMT0JBTF0uYWRkQ3VzdG9tU2NyaXB0KG5ld1Njb3BlLCBzY3JpcHQsIHBhcmFtcyk7XG4gIH0sXG4gIFxuICB0YXJnZXQodGhpczogSU1ha2VDb250ZXh0LCBuYW1lOiBzdHJpbmcpOiBJbnRlcmZhY2VUYXJnZXQge1xuICAgIGNvbnN0IHV0YXJnZXQgPSB0aGlzW0dMT0JBTF0uZ2V0VWtub3duVGFyZ2V0KG5hbWUpO1xuICAgIHJldHVybiBJbnRlcmZhY2VUYXJnZXQuY3JlYXRlKHRoaXNbU0NPUEVdLCB1dGFyZ2V0KTtcbiAgfSxcbiAgXG4gIHNjcmlwdCh0aGlzOiBJTWFrZUNvbnRleHQsIG5hbWU6IHN0cmluZyk6IEludGVyZmFjZVNjcmlwdCB7XG4gICAgbGV0IHNjcmlwdCA9IHRoaXNbR0xPQkFMXS5JTlRFUkZBQ0VfU0NSSVBUU1tuYW1lXTtcbiAgICBpZiAoIXNjcmlwdCkge1xuICAgICAgc2NyaXB0ID0gSW50ZXJmYWNlU2NyaXB0LmNyZWF0ZShuYW1lKTtcbiAgICAgIHRoaXNbR0xPQkFMXS5JTlRFUkZBQ0VfU0NSSVBUU1tuYW1lXSA9IHNjcmlwdDtcbiAgICB9XG4gICAgcmV0dXJuIHNjcmlwdDtcbiAgfSxcbiAgXG4gIGluc3RhbGwodGhpczogSU1ha2VDb250ZXh0LCB2YWx1ZTogYW55LCBwYXJhbXM6IGFueSk6IHZvaWQge1xuICAgIGZvciAoY29uc3QgaXQgb2YgWyB2YWx1ZSBdLmZsYXQoMSkpIHtcbiAgICAgIGNvbnN0IGl0ZXIgPSAoaXQgaW5zdGFuY2VvZiBCYXNlVGFyZ2V0KSA/IHRoaXMudGFyZ2V0KGl0Lk5BTUUpIDogaXQ7XG4gICAgICBjb25zdCBlbnRpdHkgPSBJbnN0YWxsRW50aXR5LmNyZWF0ZSh0aGlzLCBpdGVyLCBwYXJhbXMpO1xuICAgICAgdGhpc1tHTE9CQUxdLmFkZEluc3RhbGxFbnRyeShlbnRpdHkpO1xuICAgIH1cbiAgfSxcbiAgXG4gIGFkZFN0YXRpY0xpYnJhcnkodGhpczogSU1ha2VDb250ZXh0LCBuYW1lOiBhbnksIC4uLnNvdXJjZXM6IGFueVtdKTogU3RhdGljTGlicmFyeSB7XG4gICAgY29uc3QgdGFyZ2V0ID0gU3RhdGljTGlicmFyeS5jcmVhdGUodGhpc1tTQ09QRV0sIG5hbWUpO1xuICAgIHRhcmdldC5hZGRTb3VyY2VzKC4uLnNvdXJjZXMpO1xuICBcbiAgICB0aGlzW0dMT0JBTF0uVEFSR0VUUy5zZXQobmFtZSwgdGFyZ2V0KTtcbiAgICByZXR1cm4gdGFyZ2V0O1xuICB9LFxuXG4gIGFkZE9iamVjdExpYnJhcnkodGhpczogSU1ha2VDb250ZXh0LCBuYW1lOiBhbnksIC4uLnNvdXJjZXM6IGFueVtdKTogT2JqZWN0TGlicmFyeSB7XG4gICAgY29uc3QgdGFyZ2V0ID0gT2JqZWN0TGlicmFyeS5jcmVhdGUodGhpc1tTQ09QRV0sIG5hbWUpO1xuICAgIHRhcmdldC5hZGRTb3VyY2VzKC4uLnNvdXJjZXMpO1xuICBcbiAgICB0aGlzW0dMT0JBTF0uVEFSR0VUUy5zZXQobmFtZSwgdGFyZ2V0KTtcbiAgICByZXR1cm4gdGFyZ2V0O1xuICB9LFxuXG4gIGFkZFNoYXJlZExpYnJhcnkodGhpczogSU1ha2VDb250ZXh0LCBuYW1lOiBhbnksIC4uLnNvdXJjZXM6IGFueVtdKTogU2hhcmVkTGlicmFyeSB7XG4gICAgY29uc3QgdGFyZ2V0ID0gU2hhcmVkTGlicmFyeS5jcmVhdGUodGhpc1tTQ09QRV0sIG5hbWUpO1xuICAgIHRhcmdldC5hZGRTb3VyY2VzKC4uLnNvdXJjZXMpO1xuXG4gICAgdGhpc1tHTE9CQUxdLlRBUkdFVFMuc2V0KG5hbWUsIHRhcmdldCk7XG4gICAgcmV0dXJuIHRhcmdldDtcbiAgfSxcblxuICBhZGRFeGVjdXRhYmxlKHRoaXM6IElNYWtlQ29udGV4dCwgbmFtZTogc3RyaW5nLCAuLi5zb3VyY2VzOiBhbnlbXSk6IEV4ZWN1dGFibGUge1xuICAgIGNvbnN0IHRhcmdldCA9IEV4ZWN1dGFibGUuY3JlYXRlKHRoaXNbU0NPUEVdLCBuYW1lKTtcbiAgICB0YXJnZXQuYWRkU291cmNlcyguLi5zb3VyY2VzKTtcbiAgXG4gICAgdGhpc1tHTE9CQUxdLlRBUkdFVFMuc2V0KG5hbWUsIHRhcmdldCk7XG4gICAgcmV0dXJuIHRhcmdldDtcbiAgfSxcblxuICBleGVjdXRlU2NyaXB0KHRoaXM6IElNYWtlQ29udGV4dCwgc2NyaXB0OiBhbnksIG9wdGlvbnM6IGFueSkge1xuICAgIGNvbnN0IHNjcmlwdFBhdGggPSB0aGlzW1NDT1BFXS5TT1VSQ0VfRElSLnJlc29sdmUoc2NyaXB0KTtcbiAgICBjb25zdCBtb2R1bGUgPSByZXF1aXJlSW1wbChzY3JpcHRQYXRoLnRvU3RyaW5nKCkpO1xuICAgIG1vZHVsZShzY29wZVZhbHVlQXNQcmltaXRpdmVzKG9wdGlvbnMpKTtcbiAgfSxcbn07XG5cbmV4cG9ydCBmdW5jdGlvbiBjcmVhdGUoc2NvcGU6IFN5c3RlbVNjb3BlLCBnbG9iYWw6IEdsb2JhbENvbnRleHQpOiBJTWFrZUNvbnRleHQge1xuICBjb25zdCBwcm9wczogYW55ID0ge307XG4gIGZvciAoY29uc3QgW2tleSwgdmFsdWVdIG9mIE9iamVjdC5lbnRyaWVzKG1ldGhvZHMpKSB7XG4gICAgcHJvcHNba2V5XSA9IHtcbiAgICAgIHZhbHVlLFxuICAgICAgZW51bWVyYWJsZTogZmFsc2UsXG4gICAgICB3cml0YWJsZTogZmFsc2UsXG4gICAgICBjb25maWd1cmFibGU6IGZhbHNlLFxuICAgIH1cbiAgfVxuXG4gIGNvbnN0IG1rID0gT2JqZWN0LmNyZWF0ZShzY29wZSwgcHJvcHMpO1xuXG4gIG1rW1NDT1BFXSA9IHNjb3BlO1xuICBta1tHTE9CQUxdID0gZ2xvYmFsO1xuXG4gIHJldHVybiBtaztcbn1cblxufSAvLyBuYW1lc3BhY2UgTWFrZUNvbnRleHRcbiIsIi8qXG4gKiBNSVQgTGljZW5zZVxuICpcbiAqIENvcHlyaWdodCAoYykgMjAyNSAgWXVyaWkgWWFrdWJpbiAoeXVyaWkueWFrdWJpbkBnbWFpbC5jb20pXG4gKlxuICogUGVybWlzc2lvbiBpcyBncmFudGVkIHRvIHVzZSwgY29weSwgbW9kaWZ5LCBhbmQgZGlzdHJpYnV0ZSB0aGlzIHNvZnR3YXJlXG4gKiB1bmRlciB0aGUgTUlUIExpY2Vuc2UuIFNlZSBMSUNFTlNFIGZpbGUgZm9yIGRldGFpbHMuXG4gKi9cblxuaW1wb3J0IHBhdGggZnJvbSBcIm5vZGU6cGF0aFwiO1xuaW1wb3J0IHVybCBmcm9tIFwibm9kZTp1cmxcIjtcblxuY29uc3QgUEFUSCA9IFN5bWJvbChcIlBBVEhcIik7XG5cbmNvbnN0IF9wYXRocyA9IG5ldyBNYXA8c3RyaW5nLCBEaXJQYXRoIHwgRmlsZVBhdGg+KCk7XG5cbmV4cG9ydCBjbGFzcyBBYnNvbHV0ZVBhdGgge1xuICBwcml2YXRlIFtQQVRIXTogc3RyaW5nO1xuXG4gIHByb3RlY3RlZCBjb25zdHJ1Y3RvcihmaWxlcGF0aDogc3RyaW5nKSB7XG4gICAgaWYgKCFwYXRoLmlzQWJzb2x1dGUoZmlsZXBhdGgpKVxuICAgICAgdGhyb3cgbmV3IEVycm9yKGBOb3Qgc3VwcG9ydGVkIHJlbGF0aXZlIHBhdGggb2YgXCIke2ZpbGVwYXRofVwiYCk7XG4gICAgdGhpc1tQQVRIXSA9IGZpbGVwYXRoO1xuICB9XG5cbiAgcHVibGljIGpvaW4oLi4ucGF0aHM6IEFycmF5PEFic29sdXRlUGF0aCB8IHN0cmluZz4pIHtcbiAgICBjb25zdCBmaWxlcGF0aCA9IHBhdGgucG9zaXguam9pbih0aGlzW1BBVEhdLCAuLi5wYXRocy5tYXAoaSA9PiBpLnRvU3RyaW5nKCkpKTtcbiAgICByZXR1cm4gQWJzb2x1dGVQYXRoLmNyZWF0ZShmaWxlcGF0aCk7XG4gIH1cblxuICBwdWJsaWMgZGlybmFtZSgpIHtcbiAgICByZXR1cm4gRGlyUGF0aC5jcmVhdGUocGF0aC5wb3NpeC5kaXJuYW1lKHRoaXNbUEFUSF0pKTtcbiAgfVxuXG4gIHB1YmxpYyBiYXNlbmFtZSgpIHtcbiAgICByZXR1cm4gcGF0aC5iYXNlbmFtZSh0aGlzW1BBVEhdKTtcbiAgfVxuXG4gIHB1YmxpYyByZWxhdGl2ZSh0bzogQWJzb2x1dGVQYXRoIHwgc3RyaW5nKSB7XG4gICAgcmV0dXJuIHBhdGgucG9zaXgucmVsYXRpdmUodGhpc1tQQVRIXSwgKHRvIGluc3RhbmNlb2YgQWJzb2x1dGVQYXRoKSA/IHRvW1BBVEhdIDogdG8pO1xuICB9XG5cbiAgcHVibGljIHJlc29sdmUoLi4ucGF0aHM6IEFycmF5PEFic29sdXRlUGF0aCB8IHN0cmluZz4pIHtcbiAgICByZXR1cm4gQWJzb2x1dGVQYXRoLmNyZWF0ZShwYXRoLnBvc2l4LnJlc29sdmUodGhpc1tQQVRIXSwgLi4ucGF0aHMubWFwKGkgPT4gaS50b1N0cmluZygpKSkpO1xuICB9XG5cbiAgcHVibGljIG1hdGNoKHJlZ2V4cDogUmVnRXhwKSB7XG4gICAgcmV0dXJuIHRoaXNbUEFUSF0ubWF0Y2gocmVnZXhwKTtcbiAgfVxuXG4gIHB1YmxpYyB0b1VSTCgpIHtcbiAgICByZXR1cm4gdXJsLnBhdGhUb0ZpbGVVUkwodGhpc1tQQVRIXSk7XG4gIH1cblxuICBwdWJsaWMgdG9VUkxTdHJpbmcoKSB7XG4gICAgcmV0dXJuIHRoaXMudG9VUkwoKS50b1N0cmluZygpO1xuICB9XG5cbiAgcHVibGljIHRvU3RyaW5nKCkge1xuICAgIHJldHVybiB0aGlzW1BBVEhdO1xuICB9XG5cbiAgcHVibGljIHZhbHVlT2YoKSB7XG4gICAgcmV0dXJuIHRoaXNbUEFUSF07XG4gIH1cblxuICBwdWJsaWMgdG9KU09OKCkge1xuICAgIHJldHVybiB0aGlzW1BBVEhdO1xuICB9XG5cbiAgcHVibGljIHN0YXRpYyBpc0Fic29sdXRlKGZpbGVwYXRoOiBBYnNvbHV0ZVBhdGggfCBzdHJpbmcpIHtcbiAgICBpZiAoZmlsZXBhdGggaW5zdGFuY2VvZiBBYnNvbHV0ZVBhdGgpXG4gICAgICByZXR1cm4gdHJ1ZTtcbiAgICByZXR1cm4gcGF0aC5pc0Fic29sdXRlKGZpbGVwYXRoKTtcbiAgfVxuXG4gIHB1YmxpYyBzdGF0aWMgZW5zdXJlSW5zdGFuY2UodmFsdWU6IGFueSk6IEFic29sdXRlUGF0aCB7XG4gICAgaWYgKHZhbHVlIGluc3RhbmNlb2YgQWJzb2x1dGVQYXRoKVxuICAgICAgcmV0dXJuIHZhbHVlO1xuICAgIHRocm93IG5ldyBFcnJvcihgVGhlICcke3ZhbHVlfScgaXMgbm90IGEgQWJzb2x1dGVQYXRoYCk7XG4gIH1cblxuICBwdWJsaWMgc3RhdGljIGNyZWF0ZShwYXRoOiBBYnNvbHV0ZVBhdGggfCBzdHJpbmcpOiBBYnNvbHV0ZVBhdGggfCBEaXJQYXRoIHwgRmlsZVBhdGgge1xuICAgIGNvbnN0IHJlc3VsdCA9IF9wYXRocy5nZXQocGF0aC50b1N0cmluZygpKTtcbiAgICBpZiAocmVzdWx0KVxuICAgICAgcmV0dXJuIHJlc3VsdDtcblxuICAgIGlmIChwYXRoIGluc3RhbmNlb2YgQWJzb2x1dGVQYXRoKVxuICAgICAgcmV0dXJuIHBhdGg7XG5cbiAgICByZXR1cm4gT2JqZWN0LnNlYWwobmV3IEFic29sdXRlUGF0aChwYXRoKSk7XG4gIH1cbn07XG5cbmV4cG9ydCBjbGFzcyBGaWxlUGF0aCBleHRlbmRzIEFic29sdXRlUGF0aCB7XG4gIHByaXZhdGUgY29uc3RydWN0b3IocGF0aFN0cjogc3RyaW5nKSB7XG4gICAgc3VwZXIocGF0aFN0cik7XG4gIH1cblxuICBwdWJsaWMgc3RhdGljIGVuc3VyZUluc3RhbmNlKHZhbHVlOiBhbnkpOiBGaWxlUGF0aCB7XG4gICAgaWYgKHZhbHVlIGluc3RhbmNlb2YgRmlsZVBhdGgpXG4gICAgICByZXR1cm4gdmFsdWU7XG4gICAgdGhyb3cgbmV3IEVycm9yKGBUaGUgJyR7dmFsdWV9JyBpcyBub3QgYSBGaWxlUGF0aGApO1xuICB9XG4gIFxuICBwdWJsaWMgc3RhdGljIGNyZWF0ZShwYXRoOiBhbnkpOiBGaWxlUGF0aCB7XG4gICAgaWYgKHBhdGggaW5zdGFuY2VvZiBGaWxlUGF0aClcbiAgICAgIHJldHVybiBwYXRoO1xuXG4gICAgaWYgKHBhdGggaW5zdGFuY2VvZiBBYnNvbHV0ZVBhdGgpXG4gICAgICBwYXRoID0gcGF0aC50b1N0cmluZygpO1xuXG4gICAgaWYgKHR5cGVvZiBwYXRoICE9PSBcInN0cmluZ1wiKVxuICAgICAgdGhyb3cgbmV3IEVycm9yKGBUaGUgJyR7cGF0aH0nIGlzIG5vdCBhIHN0cmluZ2ApO1xuXG4gICAgbGV0IGZpbGVQYXRoID0gX3BhdGhzLmdldChwYXRoKTtcbiAgICBpZiAoZmlsZVBhdGgpXG4gICAgICByZXR1cm4gRmlsZVBhdGguZW5zdXJlSW5zdGFuY2UoZmlsZVBhdGgpO1xuXG4gICAgZmlsZVBhdGggPSBPYmplY3Quc2VhbChuZXcgRmlsZVBhdGgocGF0aCkpO1xuICAgIF9wYXRocy5zZXQocGF0aCwgZmlsZVBhdGgpO1xuXG4gICAgcmV0dXJuIGZpbGVQYXRoO1xuICB9XG59XG5cbmV4cG9ydCBjbGFzcyBEaXJQYXRoIGV4dGVuZHMgQWJzb2x1dGVQYXRoIHtcbiAgcHJpdmF0ZSBjb25zdHJ1Y3RvcihwYXRoU3RyOiBzdHJpbmcpIHtcbiAgICBzdXBlcihwYXRoU3RyKTtcbiAgfVxuXG4gIHB1YmxpYyBzdGF0aWMgZW5zdXJlSW5zdGFuY2UodmFsdWU6IGFueSk6IERpclBhdGgge1xuICAgIGlmICh2YWx1ZSBpbnN0YW5jZW9mIERpclBhdGgpXG4gICAgICByZXR1cm4gdmFsdWU7XG4gICAgdGhyb3cgbmV3IEVycm9yKGBUaGUgJyR7dmFsdWV9JyBpcyBub3QgYSBEaXJQYXRoYCk7XG4gIH1cblxuICBwdWJsaWMgc3RhdGljIGNyZWF0ZShwYXRoOiBhbnkpOiBEaXJQYXRoIHtcbiAgICBpZiAocGF0aCBpbnN0YW5jZW9mIERpclBhdGgpXG4gICAgICByZXR1cm4gcGF0aDtcblxuICAgIGlmIChwYXRoIGluc3RhbmNlb2YgQWJzb2x1dGVQYXRoKVxuICAgICAgcGF0aCA9IHBhdGgudG9TdHJpbmcoKTtcblxuICAgIGlmICh0eXBlb2YgcGF0aCAhPT0gXCJzdHJpbmdcIilcbiAgICAgIHRocm93IG5ldyBFcnJvcihgVGhlICcke3BhdGh9JyBpcyBub3QgYSBzdHJpbmdgKTtcblxuICAgIGxldCBkaXJQYXRoID0gX3BhdGhzLmdldChwYXRoKTtcbiAgICBpZiAoZGlyUGF0aClcbiAgICAgIHJldHVybiBEaXJQYXRoLmVuc3VyZUluc3RhbmNlKGRpclBhdGgpO1xuXG4gICAgZGlyUGF0aCA9IE9iamVjdC5zZWFsKG5ldyBEaXJQYXRoKHBhdGgpKTtcbiAgICBfcGF0aHMuc2V0KHBhdGgsIGRpclBhdGgpO1xuXG4gICAgcmV0dXJuIGRpclBhdGg7XG4gIH1cbn07XG4iLCIvKlxuICogTUlUIExpY2Vuc2VcbiAqXG4gKiBDb3B5cmlnaHQgKGMpIDIwMjUgIFl1cmlpIFlha3ViaW4gKHl1cmlpLnlha3ViaW5AZ21haWwuY29tKVxuICpcbiAqIFBlcm1pc3Npb24gaXMgZ3JhbnRlZCB0byB1c2UsIGNvcHksIG1vZGlmeSwgYW5kIGRpc3RyaWJ1dGUgdGhpcyBzb2Z0d2FyZVxuICogdW5kZXIgdGhlIE1JVCBMaWNlbnNlLiBTZWUgTElDRU5TRSBmaWxlIGZvciBkZXRhaWxzLlxuICovXG5cbmltcG9ydCB7IERpclBhdGggfSBmcm9tIFwiQC9jb3JlL1BhdGhcIjtcbmltcG9ydCB7IEdsb2JhbENvbnRleHQgfSBmcm9tIFwiQC9jb3JlL0dsb2JhbENvbnRleHRcIjtcbmltcG9ydCB7IFN5c3RlbVNjb3BlIH0gZnJvbSBcIkAvY29yZS9TeXN0ZW1TY29wZVwiO1xuaW1wb3J0IHsgZmluZFByb2dyYW1TeW5jIH0gZnJvbSBcIkAvY29yZS9GaW5kUHJvZ3JhbVwiO1xuXG5jb25zdCBHTE9CQUwgPSBTeW1ib2woXCJHTE9CQUxcIik7XG5jb25zdCBTQ09QRSA9IFN5bWJvbChcIlNDT1BFXCIpO1xuXG5leHBvcnQgbmFtZXNwYWNlIFBsdWdpbkNvbnRleHQge1xuXG5pbnRlcmZhY2UgSVBsdWdpbkNvbnRleHQgZXh0ZW5kcyBTeXN0ZW1TY29wZSB7XG4gIGZpbmRQcm9ncmFtKG5hbWU6IHN0cmluZyk6IHN0cmluZyB8IHVuZGVmaW5lZDtcbiAgYWRkU3ViZGlyZWN0b3J5QWxpYXMoc3JjOiBhbnksIGRlc3Q6IGFueSk6IHZvaWQ7XG59O1xuXG5mdW5jdGlvbiBhZGRTdWJkaXJlY3RvcnlBbGlhcyh0aGlzOiBhbnksIHNyYzogYW55LCBkZXN0OiBhbnkpIHtcbiAgY29uc3Qgc3JjUGF0aCA9IHRoaXNbU0NPUEVdLlNDUklQVF9ESVIucmVzb2x2ZShzcmMpO1xuICBjb25zdCBkZXN0UGF0aCA9IHRoaXNbU0NPUEVdLlNDUklQVF9ESVIucmVzb2x2ZShkZXN0KTtcbiAgdGhpc1tHTE9CQUxdLmFkZFN1YmRpcmVjdG9yeUFsaWFzKERpclBhdGguY3JlYXRlKHNyY1BhdGgpLCBEaXJQYXRoLmNyZWF0ZShkZXN0UGF0aCkpO1xufVxuXG5leHBvcnQgZnVuY3Rpb24gY3JlYXRlKHNjb3BlOiBTeXN0ZW1TY29wZSwgZ2xvYmFsOiBHbG9iYWxDb250ZXh0KTogSVBsdWdpbkNvbnRleHQge1xuICBjb25zdCBtayA9IE9iamVjdC5jcmVhdGUoc2NvcGUsIHtcbiAgICBmaW5kUHJvZ3JhbToge1xuICAgICAgdmFsdWU6IGZpbmRQcm9ncmFtU3luYyxcbiAgICAgIGVudW1lcmFibGU6IGZhbHNlLFxuICAgICAgd3JpdGFibGU6IGZhbHNlLFxuICAgICAgY29uZmlndXJhYmxlOiBmYWxzZSxcbiAgICB9LFxuICAgIGFkZFN1YmRpcmVjdG9yeUFsaWFzOiB7XG4gICAgICB2YWx1ZTogYWRkU3ViZGlyZWN0b3J5QWxpYXMsXG4gICAgICBlbnVtZXJhYmxlOiBmYWxzZSxcbiAgICAgIHdyaXRhYmxlOiBmYWxzZSxcbiAgICAgIGNvbmZpZ3VyYWJsZTogZmFsc2UsXG4gICAgfSxcbiAgfSk7XG5cbiAgbWtbU0NPUEVdID0gc2NvcGU7XG4gIG1rW0dMT0JBTF0gPSBnbG9iYWw7XG5cbiAgcmV0dXJuIG1rO1xufVxuXG59IC8vIG5hbWVzcGFjZSBQbHVnaW5Db250ZXh0XG4iLCIvKlxuICogTUlUIExpY2Vuc2VcbiAqXG4gKiBDb3B5cmlnaHQgKGMpIDIwMjUgIFl1cmlpIFlha3ViaW4gKHl1cmlpLnlha3ViaW5AZ21haWwuY29tKVxuICpcbiAqIFBlcm1pc3Npb24gaXMgZ3JhbnRlZCB0byB1c2UsIGNvcHksIG1vZGlmeSwgYW5kIGRpc3RyaWJ1dGUgdGhpcyBzb2Z0d2FyZVxuICogdW5kZXIgdGhlIE1JVCBMaWNlbnNlLiBTZWUgTElDRU5TRSBmaWxlIGZvciBkZXRhaWxzLlxuICovXG5cbmltcG9ydCB7IGVuc3VyZUJvb2xlYW4sIGVuc3VyZVN0cmluZywgZW5zdXJlTnVtYmVyLCBlbnN1cmVBcnJheSB9IGZyb20gXCJAL3V0aWxzL1N0cmljdFR5cGVcIjtcbmltcG9ydCB7IERpclBhdGgsIEZpbGVQYXRoIH0gZnJvbSBcIkAvY29yZS9QYXRoXCI7XG5cbmNvbnN0IERFRklORV9NQVAgPSBTeW1ib2woXCJERUZJTkVfTUFQXCIpO1xuXG5leHBvcnQgbmFtZXNwYWNlIFNjb3BlSGVscGVyIHtcblxuZnVuY3Rpb24gZGVmaW5lVmFyaWFibGVJbXBsKHNjb3BlOiBhbnksIGdyb3VwOiBzdHJpbmcsIG5hbWU6IHN0cmluZywgZGVzY3JpcHRvcjogYW55KSB7XG4gIGlmIChuYW1lID09PSBcIkRFRklORV9NQVBcIikge1xuICAgIHRocm93IG5ldyBFcnJvcihgJHtuYW1lfSBpcyByZXNlcnZlZCBhbmQgY2Fubm90IGJlIHVzZWQgYXMgYSB2YXJpYWJsZWApO1xuICB9XG5cbiAgaWYgKCFzY29wZVtERUZJTkVfTUFQXSlcbiAgICBzY29wZVtERUZJTkVfTUFQXSA9IHt9O1xuXG4gIGNvbnN0IHR5cGUgPSBkZXNjcmlwdG9yLnR5cGUgfHwgKEFycmF5LmlzQXJyYXkoZGVzY3JpcHRvci52YWx1ZSkgPyBcImFycmF5XCIgOiB0eXBlb2YgZGVzY3JpcHRvci52YWx1ZSk7XG5cbiAgbGV0IGRlZmluZUVudHJ5ID0gc2NvcGVbREVGSU5FX01BUF1bbmFtZV07XG4gIGlmICghZGVmaW5lRW50cnkpIHtcbiAgICBkZWZpbmVFbnRyeSA9IHsgZ3JvdXAsIHR5cGUsIHN5bWJvbDogU3ltYm9sKG5hbWUpIH07XG4gICAgc2NvcGVbREVGSU5FX01BUF1bbmFtZV0gPSBkZWZpbmVFbnRyeTtcbiAgfVxuICBlbHNlIGlmIChncm91cCAhPT0gZGVmaW5lRW50cnkuZ3JvdXApIHtcbiAgICBpZiAoZGVmaW5lRW50cnkuZ3JvdXApXG4gICAgICB0aHJvdyBuZXcgRXJyb3IoYEF0dGVtcHRpbmcgdG8gcmVjcmVhdGUgXCIke25hbWV9XCIgdmFyaWFibGUgd2l0aCBcIiR7ZGVmaW5lRW50cnkuZ3JvdXB9XCIgZ3JvdXAgaW4gYW5vdGhlciBcIiR7Z3JvdXB9XCJgKTtcbiAgICBkZWZpbmVFbnRyeS5ncm91cCA9IGdyb3VwO1xuICB9XG5cbiAgZGVmaW5lRW50cnkuZGVzY3JpcHRpb24gPSBkZXNjcmlwdG9yLmRlc2NyaXB0aW9uIHx8IGRlZmluZUVudHJ5LmRlc2NyaXB0aW9uIHx8IFwiXCI7XG5cbiAgbGV0IGVuc3VyZVZhbHVlOiAodmFsdWU6IGFueSkgPT4ge307XG4gIGlmIChBcnJheS5pc0FycmF5KHR5cGUpKSB7XG4gICAgbGV0IGl0ZW1UeXBlO1xuICAgIGZvciAoY29uc3QgaXRlciBvZiB0eXBlKSB7XG4gICAgICBjb25zdCBpdCA9IHR5cGVvZiBpdGVyO1xuICAgICAgaWYgKCFpdGVtVHlwZSlcbiAgICAgICAgaXRlbVR5cGUgPSBpdDtcbiAgICAgIGVsc2UgaWYgKGl0ZW1UeXBlICE9PSBpdClcbiAgICAgICAgdGhyb3cgbmV3IEVycm9yKGBBbGwgZWxlbWVudHMgZm9yICR7bmFtZX0gbXVzdCBiZSBvZiB0aGUgc2FtZSB0eXBlYCk7XG4gICAgfVxuICAgIGlmIChpdGVtVHlwZSAhPT0gXCJib29sZWFuXCIgJiYgaXRlbVR5cGUgIT09IFwibnVtYmVyXCIgJiYgaXRlbVR5cGUgIT09IFwic3RyaW5nXCIpXG4gICAgICB0aHJvdyBuZXcgRXJyb3IoYEVudW0gJHtuYW1lfSBub3Qgc3VwcG9ydCAke2l0ZW1UeXBlfSB0eXBlYCk7XG4gICAgZW5zdXJlVmFsdWUgPSAodmFsdWU6IGFueSkgPT4ge1xuICAgICAgaWYgKHR5cGUuaW5jbHVkZXModmFsdWUpKVxuICAgICAgICByZXR1cm4gdmFsdWU7XG4gICAgICB0aHJvdyBuZXcgRXJyb3IoYFRoZSAnJHt2YWx1ZX0nIGlzIG5vdCBhICR7dHlwZX1gKTtcbiAgICB9XG4gIH1cbiAgZWxzZSBpZiAodHlwZSA9PT0gXCJib29sZWFuXCIpXG4gICAgZW5zdXJlVmFsdWUgPSBlbnN1cmVCb29sZWFuO1xuICBlbHNlIGlmICh0eXBlID09PSBcIm51bWJlclwiKVxuICAgIGVuc3VyZVZhbHVlID0gZW5zdXJlTnVtYmVyO1xuICBlbHNlIGlmICh0eXBlID09PSBcInN0cmluZ1wiKVxuICAgIGVuc3VyZVZhbHVlID0gZW5zdXJlU3RyaW5nO1xuICBlbHNlIGlmICh0eXBlID09PSBcImFycmF5XCIpXG4gICAgZW5zdXJlVmFsdWUgPSBlbnN1cmVBcnJheTtcbiAgZWxzZSBpZiAodHlwZSA9PT0gXCJEaXJQYXRoXCIpXG4gICAgZW5zdXJlVmFsdWUgPSBEaXJQYXRoLmNyZWF0ZTtcbiAgZWxzZSBpZiAodHlwZSA9PT0gXCJGaWxlUGF0aFwiKVxuICAgIGVuc3VyZVZhbHVlID0gRmlsZVBhdGguY3JlYXRlO1xuICBlbHNlXG4gICAgdGhyb3cgbmV3IEVycm9yKGBWYXJpYWJsZSBcIiR7bmFtZX1cIiBoYXMgd3JvbmcgJHt0eXBlfSB0eXBlYCk7XG5cbiAgaWYgKGRlc2NyaXB0b3IudmFsdWUgIT09IHVuZGVmaW5lZCkge1xuICAgIGRlZmluZUVudHJ5LnZhbHVlID0gKHR5cGUgPT09IFwiYXJyYXlcIikgPyBBcnJheS5mcm9tKGRlc2NyaXB0b3IudmFsdWUpIDogZW5zdXJlVmFsdWUoZGVzY3JpcHRvci52YWx1ZSk7XG4gIH1cbiAgZWxzZSB7XG4gICAgZGVmaW5lRW50cnkudmFsdWUgPSAodHlwZSA9PT0gXCJhcnJheVwiKSA/IFtdIDogdW5kZWZpbmVkO1xuICB9XG5cbiAgY29uc3QgeyBzeW1ib2wsIHZhbHVlIH0gPSBkZWZpbmVFbnRyeTtcblxuICBpZiAoc2NvcGVbc3ltYm9sXSA9PT0gdW5kZWZpbmVkICYmIHZhbHVlICE9PSB1bmRlZmluZWQpXG4gICAgc2NvcGVbc3ltYm9sXSA9IEFycmF5LmlzQXJyYXkodmFsdWUpID8gQXJyYXkuZnJvbSh2YWx1ZSkgOiB2YWx1ZTtcblxuICBjb25zdCBkZXNjOiBhbnkgPSB7XG4gICAgY29uZmlndXJhYmxlOiB0cnVlLFxuICAgIGVudW1lcmFibGU6IHRydWUsXG4gICAgZ2V0KCkge1xuICAgICAgY29uc3QgdmFsdWUgPSBzY29wZVtzeW1ib2xdO1xuICAgICAgLyppZiAodmFsdWUgPT09IHVuZGVmaW5lZClcbiAgICAgICAgdGhyb3cgbmV3IEVycm9yKGBWYWx1ZSBvZiAke25hbWV9IGNhbm5vdCBiZSBvYnRhaW5lZCBiZWNhdXNlIGl0IGhhcyBub3QgYmVlbiBlc3RhYmxpc2hlZGApOyovXG4gICAgICByZXR1cm4gdmFsdWU7XG4gICAgfSxcbiAgICBzZXQodmFsdWU6IGFueSkge1xuICAgICAgc2NvcGVbc3ltYm9sXSA9IGVuc3VyZVZhbHVlKHZhbHVlKTtcbiAgICB9LFxuICB9O1xuXG4gIE9iamVjdC5kZWZpbmVQcm9wZXJ0eShzY29wZSwgbmFtZSwgZGVzYyk7XG59XG5cbmV4cG9ydCBmdW5jdGlvbiBkZWZpbmVWYXJpYWJsZShzY29wZTogYW55LCBncm91cDogc3RyaW5nLCBuYW1lOiBzdHJpbmcsIGRlc2NyaXB0b3I6IGFueSkge1xuICBpZiAoIWdyb3VwKSB7XG4gICAgdGhyb3cgbmV3IEVycm9yKGBBdHRlbXB0aW5nIHRvIGNyZWF0ZSBcIiR7bmFtZX1cIiB2YXJpYWJsZSB3aXRoIGFuIGVtcHR5IGdyb3VwYCk7XG4gIH1cbiAgZGVmaW5lVmFyaWFibGVJbXBsKHNjb3BlLCBncm91cCwgbmFtZSwgZGVzY3JpcHRvcik7XG59XG5cbmV4cG9ydCBmdW5jdGlvbiBkZWZpbmVWYXJpYWJsZXMoc2NvcGU6IGFueSwgZ3JvdXA6IHN0cmluZywgZGVzY3JpcHRvcnM6IGFueSkge1xuICBmb3IgKGNvbnN0IFsgbmFtZSwgZGVzY3JpcHRvciBdIG9mIE9iamVjdC5lbnRyaWVzKGRlc2NyaXB0b3JzKSlcbiAgICBTY29wZUhlbHBlci5kZWZpbmVWYXJpYWJsZShzY29wZSwgZ3JvdXAsIG5hbWUsIGRlc2NyaXB0b3IpO1xufVxuXG5leHBvcnQgZnVuY3Rpb24gY2xvbmUodGFyZ2V0OiBhbnksIHNjb3BlOiBhbnkpIHtcbiAgaWYgKHNjb3BlW0RFRklORV9NQVBdKSB7XG4gICAgZm9yIChjb25zdCBbIG5hbWUsIHsgZ3JvdXAsIHN5bWJvbCwgdHlwZSwgdmFsdWUsIGRlc2NyaXB0aW9uIH0gXSBvZiBPYmplY3QuZW50cmllcyhzY29wZVtERUZJTkVfTUFQXSkgYXMgYW55KSB7XG4gICAgICBkZWZpbmVWYXJpYWJsZUltcGwodGFyZ2V0LCBncm91cCwgbmFtZSwgeyB0eXBlLCB2YWx1ZSwgZGVzY3JpcHRpb24gfSk7XG4gICAgICBpZiAoc2NvcGVbc3ltYm9sXSAhPT0gdW5kZWZpbmVkKVxuICAgICAgICB0YXJnZXRbbmFtZV0gPSBzY29wZVtzeW1ib2xdO1xuICAgIH1cbiAgfVxuICByZXR1cm4gdGFyZ2V0O1xufVxuXG5leHBvcnQgZnVuY3Rpb24gZ2V0VmFyaWFibGVzQnlHcm91cChzY29wZTogYW55LCBncnA/OiBzdHJpbmcpIHtcbiAgY29uc3QgcmVzdWx0OiBhbnkgPSB7fTtcbiAgZm9yIChjb25zdCBbIG5hbWUsIHsgdHlwZSwgZ3JvdXAsIHN5bWJvbCwgZGVzY3JpcHRpb24gfSBdIG9mIE9iamVjdC5lbnRyaWVzKHNjb3BlW0RFRklORV9NQVBdKSBhcyBhbnkpIHtcbiAgICBpZiAoZ3JvdXAgJiYgZ3JvdXAgIT09IGdycClcbiAgICAgIGNvbnRpbnVlO1xuICAgIHJlc3VsdFtuYW1lXSA9IHsgdHlwZSwgZGVzY3JpcHRpb24sIHZhbHVlOiBzY29wZVtzeW1ib2xdIH07XG4gIH1cbiAgcmV0dXJuIHJlc3VsdDtcbn1cblxuZXhwb3J0IGZ1bmN0aW9uIGFwcGx5VmFyaWFibGUoc2NvcGU6IGFueSwgbmFtZTogc3RyaW5nLCB2YWx1ZTogYW55KSB7XG4gIGlmIChPYmplY3QuZ2V0T3duUHJvcGVydHlEZXNjcmlwdG9yKHNjb3BlLCBuYW1lKSlcbiAgICBzY29wZVtuYW1lXSA9IHZhbHVlO1xuICBlbHNlXG4gICAgZGVmaW5lVmFyaWFibGVJbXBsKHNjb3BlLCBcIlwiLCBuYW1lLCB7IHZhbHVlIH0pO1xufVxuXG5leHBvcnQgZnVuY3Rpb24gYXBwbHlWYXJpYWJsZXMoc2NvcGU6IGFueSwgdmFyaWFibGVzOiBvYmplY3QpIHtcbiAgZm9yIChjb25zdCBbIG5hbWUsIHZhbHVlIF0gb2YgT2JqZWN0LmVudHJpZXModmFyaWFibGVzKSlcbiAgICBTY29wZUhlbHBlci5hcHBseVZhcmlhYmxlKHNjb3BlLCBuYW1lLCB2YWx1ZSk7XG59XG5cbmV4cG9ydCBmdW5jdGlvbiBtZXJnZVZhcmlhYmxlcyh0YXJnZXQ6IGFueSwgc291cmNlOiBhbnkpOiBvYmplY3Qge1xuICBpZiAoIXRhcmdldCB8fCB0eXBlb2YgdGFyZ2V0ICE9PSBcIm9iamVjdFwiKVxuICAgIHRocm93IG5ldyBFcnJvcihgVGFyZ2V0ICR7dGFyZ2V0fSBpcyBub3Qgb2JqZWN0YCk7XG4gIGlmICghc291cmNlIHx8IHR5cGVvZiBzb3VyY2UgIT09IFwib2JqZWN0XCIpXG4gICAgdGhyb3cgbmV3IEVycm9yKGBTb3VyY2UgJHtzb3VyY2V9IGlzIG5vdCBvYmplY3RgKTtcbiAgZm9yIChjb25zdCBbIGtleSwgdmFsIF0gb2YgT2JqZWN0LmVudHJpZXMoc291cmNlKSkge1xuICAgIGlmICghT2JqZWN0Lmhhc093bih0YXJnZXQsIGtleSkpIHtcbiAgICAgIHRhcmdldFtrZXldID0gdmFsO1xuICAgIH1cbiAgICBlbHNlIGlmIChBcnJheS5pc0FycmF5KHRhcmdldFtrZXldKSkge1xuICAgICAgaWYgKCFBcnJheS5pc0FycmF5KHZhbCkpXG4gICAgICAgIHRocm93IG5ldyBFcnJvcihgU291cmNlICR7a2V5fSBoYXMgJHt2YWx9IHdoaWNoIGlzIG5vdCBhbiBhcnJheWApO1xuICAgICAgZm9yIChjb25zdCBpdGVyIG9mIHZhbClcbiAgICAgICAgdGFyZ2V0W2tleV0ucHVzaChpdGVyKTtcbiAgICB9XG4gICAgZWxzZSBpZiAodGFyZ2V0W2tleV0gJiYgdHlwZW9mIHRhcmdldFtrZXldID09PSBcIm9iamVjdFwiKSB7XG4gICAgICBpZiAoIXZhbCB8fCB0eXBlb2YgdmFsICE9PSBcIm9iamVjdFwiKVxuICAgICAgICB0aHJvdyBuZXcgRXJyb3IoYFNvdXJjZSAke2tleX0gaGFzICR7dmFsfSB3aGljaCBpcyBub3QgYW4gb2JqZWN0YCk7XG4gICAgICBtZXJnZVZhcmlhYmxlcyh0YXJnZXRba2V5XSwgdmFsKTtcbiAgICB9XG4gICAgZWxzZSB7XG4gICAgICB0aHJvdyBuZXcgRXJyb3IoYFNvdXJjZSAke2tleX0gaGFzICR7dmFsfSB3aGljaCBpcyBub3QgJHt0eXBlb2YgdGFyZ2V0W2tleV19YCk7XG4gICAgfVxuICB9XG4gIHJldHVybiB0YXJnZXQ7XG59XG5cbn0gLy8gU2NvcGVIZWxwZXJcbiIsIi8qXG4gKiBNSVQgTGljZW5zZVxuICpcbiAqIENvcHlyaWdodCAoYykgMjAyNSAgWXVyaWkgWWFrdWJpbiAoeXVyaWkueWFrdWJpbkBnbWFpbC5jb20pXG4gKlxuICogUGVybWlzc2lvbiBpcyBncmFudGVkIHRvIHVzZSwgY29weSwgbW9kaWZ5LCBhbmQgZGlzdHJpYnV0ZSB0aGlzIHNvZnR3YXJlXG4gKiB1bmRlciB0aGUgTUlUIExpY2Vuc2UuIFNlZSBMSUNFTlNFIGZpbGUgZm9yIGRldGFpbHMuXG4gKi9cblxuaW1wb3J0IHsgQ3VzdG9tU2NyaXB0IH0gZnJvbSBcIkAvY29yZS9DdXN0b21TY3JpcHRcIjtcblxuY29uc3QgTUFQID0gU3ltYm9sKFwiTUFQXCIpO1xuY29uc3QgRU5UUklFUyA9IFN5bWJvbChcIkVOVFJJRVNcIik7XG5cbmV4cG9ydCBjbGFzcyBTY3JpcHRDb2xsZWN0aW9uIHtcbiAgcHJpdmF0ZSBbTUFQXTogeyBbbmFtZTogc3RyaW5nXTogQ3VzdG9tU2NyaXB0IH07XG4gIHByaXZhdGUgW0VOVFJJRVNdOiBDdXN0b21TY3JpcHRbXTtcblxuICBwcml2YXRlIGNvbnN0cnVjdG9yKCkge1xuICAgIHRoaXNbTUFQXSA9IHt9O1xuICAgIHRoaXNbRU5UUklFU10gPSBbXTtcbiAgfVxuXG4gIHB1YmxpYyBzdGF0aWMgY3JlYXRlKCkge1xuICAgIHJldHVybiBPYmplY3Quc2VhbChuZXcgU2NyaXB0Q29sbGVjdGlvbik7XG4gIH1cblxuICBwdWJsaWMgZ2V0IEVOVFJJRVMoKSB7XG4gICAgcmV0dXJuIHRoaXNbRU5UUklFU107XG4gIH1cblxuICBwdWJsaWMgZ2V0KG5hbWU6IHN0cmluZyk6IEN1c3RvbVNjcmlwdCB8IHVuZGVmaW5lZCB7XG4gICAgcmV0dXJuIHRoaXNbTUFQXVtuYW1lXTtcbiAgfVxuXG4gIHB1YmxpYyBzZXQobmFtZTogc3RyaW5nLCB0YXJnZXQ6IEN1c3RvbVNjcmlwdCkge1xuICAgIGlmICghbmFtZSlcbiAgICAgIHRocm93IG5ldyBFcnJvcihcIk5vdCBzdXBwb3J0ZWQgbXB0eSBuYW1lIGZvciBDdXN0b21TY3JpcHRcIik7XG4gICAgaWYgKHRoaXNbTUFQXVtuYW1lXSlcbiAgICAgIHRocm93IG5ldyBFcnJvcihgU2NyaXB0IFwiJHtuYW1lfVwiIGV4aXN0c2ApO1xuICAgIHRoaXNbTUFQXVtuYW1lXSA9IHRhcmdldDtcbiAgICB0aGlzW0VOVFJJRVNdLnB1c2godGFyZ2V0KTtcbiAgfVxuXG4gIHB1YmxpYyBhZGQodGFyZ2V0OiBDdXN0b21TY3JpcHQpIHtcbiAgICB0aGlzW0VOVFJJRVNdLnB1c2godGFyZ2V0KTtcbiAgfVxuICBcbiAgcHVibGljIHRvSlNPTigpOiBvYmplY3Qge1xuICAgIHJldHVybiB0aGlzW0VOVFJJRVNdO1xuICB9XG59O1xuIiwiLypcbiAqIE1JVCBMaWNlbnNlXG4gKlxuICogQ29weXJpZ2h0IChjKSAyMDI1ICBZdXJpaSBZYWt1YmluICh5dXJpaS55YWt1YmluQGdtYWlsLmNvbSlcbiAqXG4gKiBQZXJtaXNzaW9uIGlzIGdyYW50ZWQgdG8gdXNlLCBjb3B5LCBtb2RpZnksIGFuZCBkaXN0cmlidXRlIHRoaXMgc29mdHdhcmVcbiAqIHVuZGVyIHRoZSBNSVQgTGljZW5zZS4gU2VlIExJQ0VOU0UgZmlsZSBmb3IgZGV0YWlscy5cbiAqL1xuXG5pbXBvcnQgeyBmaW5kUHJvZ3JhbVN5bmMgfSBmcm9tIFwiQC9jb3JlL0ZpbmRQcm9ncmFtXCI7XG5pbXBvcnQgeyBHbG9iYWxDb250ZXh0IH0gZnJvbSBcIkAvY29yZS9HbG9iYWxDb250ZXh0XCI7XG5pbXBvcnQgeyBTeXN0ZW1TY29wZSB9IGZyb20gXCJAL2NvcmUvU3lzdGVtU2NvcGVcIjtcblxuY29uc3QgR0xPQkFMID0gU3ltYm9sKFwiR0xPQkFMXCIpO1xuY29uc3QgU0NPUEUgPSBTeW1ib2woXCJTQ09QRVwiKTtcblxuZXhwb3J0IG5hbWVzcGFjZSBTY3JpcHRDb250ZXh0IHtcblxuaW50ZXJmYWNlIElTY3JpcHRDb250ZXh0IGV4dGVuZHMgU3lzdGVtU2NvcGUge1xuICBmaW5kUHJvZ3JhbShuYW1lOiBzdHJpbmcpOiBzdHJpbmcgfCB1bmRlZmluZWQ7XG59O1xuICBcbmV4cG9ydCBmdW5jdGlvbiBjcmVhdGUoc2NvcGU6IFN5c3RlbVNjb3BlLCBnbG9iYWw6IEdsb2JhbENvbnRleHQpOiBJU2NyaXB0Q29udGV4dCB7XG4gIGNvbnN0IG1rID0gT2JqZWN0LmNyZWF0ZShzY29wZSwge1xuICAgIGZpbmRQcm9ncmFtOiB7XG4gICAgICB2YWx1ZTogZmluZFByb2dyYW1TeW5jLFxuICAgICAgZW51bWVyYWJsZTogZmFsc2UsXG4gICAgICB3cml0YWJsZTogZmFsc2UsXG4gICAgICBjb25maWd1cmFibGU6IGZhbHNlLFxuICAgIH0sXG4gIH0pO1xuXG4gIG1rW1NDT1BFXSA9IHNjb3BlO1xuICBta1tHTE9CQUxdID0gZ2xvYmFsO1xuXG4gIHJldHVybiBtaztcbn1cblxufSAvLyBuYW1lc3BhY2UgU2NyaXB0Q29udGV4dFxuIiwiLypcbiAqIE1JVCBMaWNlbnNlXG4gKlxuICogQ29weXJpZ2h0IChjKSAyMDI1ICBZdXJpaSBZYWt1YmluICh5dXJpaS55YWt1YmluQGdtYWlsLmNvbSlcbiAqXG4gKiBQZXJtaXNzaW9uIGlzIGdyYW50ZWQgdG8gdXNlLCBjb3B5LCBtb2RpZnksIGFuZCBkaXN0cmlidXRlIHRoaXMgc29mdHdhcmVcbiAqIHVuZGVyIHRoZSBNSVQgTGljZW5zZS4gU2VlIExJQ0VOU0UgZmlsZSBmb3IgZGV0YWlscy5cbiAqL1xuXG5pbXBvcnQgeyBlbnN1cmVCb29sZWFuIH0gZnJvbSBcIkAvdXRpbHMvU3RyaWN0VHlwZVwiO1xuaW1wb3J0IHsgQWJzb2x1dGVQYXRoIH0gZnJvbSBcIkAvY29yZS9QYXRoXCI7XG5pbXBvcnQgeyBTeXN0ZW1TY29wZSB9IGZyb20gXCJAL2NvcmUvU3lzdGVtU2NvcGVcIjtcblxuY29uc3QgTkFNRSAgICAgICAgICAgICAgICA9IFN5bWJvbChcIk5BTUVcIik7XG5jb25zdCBMQU5HVUFHRSAgICAgICAgICAgID0gU3ltYm9sKFwiTEFOR1VBR0VcIik7XG5jb25zdCBIRUFERVJfRklMRV9PTkxZICAgID0gU3ltYm9sKFwiSEVBREVSX0ZJTEVfT05MWVwiKTtcbmNvbnN0IERFRklORVMgICAgICAgICAgICAgPSBTeW1ib2woXCJERUZJTkVTXCIpO1xuY29uc3QgQ09NUElMRV9GTEFHUyAgICAgICA9IFN5bWJvbChcIkNPTVBJTEVfRkxBR1NcIik7XG5jb25zdCBGSUxFICAgICAgICAgICAgICAgID0gU3ltYm9sKFwiRklMRVwiKTtcbmNvbnN0IE9CSkVDVF9GSUxFICAgICAgICAgPSBTeW1ib2woXCJPQkpFQ1RfRklMRVwiKTtcblxuY29uc3QgX2xhbmd1YWdlRXh0ZW5zaW9ucyA9IHtcbiAgQVNNOiBbIFwiLmFzbVwiLCBcIi5zXCIgXSxcbiAgQzogICBbIFwiLmNcIiBdLFxuICBDWFg6IFtcIi5jcHBcIiwgXCIuY2NcIiwgXCIuY3h4XCIgXSxcbn07XG5cbmZ1bmN0aW9uIGlzU3VwcG9ydExhbmd1YWdlKGxhbmd1YWdlOiBzdHJpbmcpIHtcbiAgcmV0dXJuIF9sYW5ndWFnZUV4dGVuc2lvbnMuaGFzT3duUHJvcGVydHkobGFuZ3VhZ2UpO1xufVxuXG5mdW5jdGlvbiBnZXRGaWxlTGFuZ3VhZ2UoZmlsZW5hbWU6IGFueSkge1xuICBjb25zdCBmaWxlbmFtZUxvd2VyQ2FzZSA9IGZpbGVuYW1lLnRvU3RyaW5nKCkudG9Mb3dlckNhc2UoKTtcbiAgZm9yIChjb25zdCBbbGFuZ3VhZ2UsIGV4dGVuc2lvbnNdIG9mIE9iamVjdC5lbnRyaWVzKF9sYW5ndWFnZUV4dGVuc2lvbnMpKSB7XG4gICAgZm9yIChjb25zdCBpdGVyIG9mIGV4dGVuc2lvbnMpIHtcbiAgICAgIGlmIChmaWxlbmFtZUxvd2VyQ2FzZS5lbmRzV2l0aChpdGVyKSlcbiAgICAgICAgcmV0dXJuIGxhbmd1YWdlO1xuICAgIH1cbiAgfVxuICByZXR1cm4gXCJcIjtcbn1cblxuZnVuY3Rpb24gbWFrZUxhbmd1YWdlKHZhbHVlOiBzdHJpbmcpIHtcbiAgaWYgKGlzU3VwcG9ydExhbmd1YWdlKHZhbHVlKSlcbiAgICByZXR1cm4gdmFsdWU7XG4gIHRocm93IG5ldyBFcnJvcihgTGFuZ3VhZ2UgXCIke3ZhbHVlfVwiIGlzIG5vdCBzdXBwb3J0ZWRgKTtcbn1cblxuZXhwb3J0IGNsYXNzIFNvdXJjZUZpbGUge1xuICBwcml2YXRlIFtOQU1FXTogc3RyaW5nO1xuICBwcml2YXRlIFtMQU5HVUFHRV06IHN0cmluZztcbiAgcHJpdmF0ZSBbSEVBREVSX0ZJTEVfT05MWV06IGJvb2xlYW47XG4gIHByaXZhdGUgW0ZJTEVdOiBBYnNvbHV0ZVBhdGg7XG4gIHByaXZhdGUgW09CSkVDVF9GSUxFXTogQWJzb2x1dGVQYXRoIHwgbnVsbDtcbiAgcHJpdmF0ZSBbREVGSU5FU106IHN0cmluZ1tdO1xuICBwcml2YXRlIFtDT01QSUxFX0ZMQUdTXTogc3RyaW5nW107XG5cbiAgcHJpdmF0ZSBjb25zdHJ1Y3RvcihzY29wZTogU3lzdGVtU2NvcGUsIGZpbGVuYW1lOiBBYnNvbHV0ZVBhdGh8c3RyaW5nKSB7XG4gICAgdGhpc1tOQU1FXSA9IGZpbGVuYW1lLnRvU3RyaW5nKCk7XG4gICAgY29uc3QgZm5hbWUgPSBzY29wZS5TT1VSQ0VfRElSLnJlc29sdmUoZmlsZW5hbWUpO1xuICBcbiAgICBjb25zdCBsYW5ndWFnZSA9IGdldEZpbGVMYW5ndWFnZShmbmFtZSk7XG4gICAgdGhpc1tMQU5HVUFHRV0gPSBsYW5ndWFnZTtcbiAgICB0aGlzW0hFQURFUl9GSUxFX09OTFldID0gIWxhbmd1YWdlO1xuICAgIHRoaXNbRklMRV0gPSBmbmFtZTtcbiAgICB0aGlzW09CSkVDVF9GSUxFXSA9IG51bGw7XG4gICAgdGhpc1tERUZJTkVTXSA9IFtdO1xuICAgIHRoaXNbQ09NUElMRV9GTEFHU10gPSAhbGFuZ3VhZ2UgPyBbXSA6IFtcbiAgICAgIC4uLihzY29wZSBhcyBhbnkpW2xhbmd1YWdlICsgXCJfRkxBR1NcIl0sXG4gICAgICAuLi4oc2NvcGUgYXMgYW55KVtsYW5ndWFnZSArIFwiX0ZMQUdTX1wiICsgc2NvcGUuQlVJTERfVFlQRS50b1VwcGVyQ2FzZSgpXSxcbiAgICBdO1xuICB9XG5cbiAgcHVibGljIHN0YXRpYyBjcmVhdGUoc2NvcGU6IGFueSwgZmlsZW5hbWU6IEFic29sdXRlUGF0aHxzdHJpbmcpIHtcbiAgICByZXR1cm4gT2JqZWN0LnNlYWwobmV3IFNvdXJjZUZpbGUoc2NvcGUsIGZpbGVuYW1lKSk7XG4gIH1cblxuICBwdWJsaWMgZ2V0IE5BTUUoKTogc3RyaW5nIHtcbiAgICByZXR1cm4gdGhpc1tOQU1FXTtcbiAgfVxuXG4gIHB1YmxpYyBnZXQgTEFOR1VBR0UoKTogc3RyaW5nIHtcbiAgICByZXR1cm4gdGhpc1tMQU5HVUFHRV07XG4gIH1cblxuICBwdWJsaWMgZ2V0IEhFQURFUl9GSUxFX09OTFkoKTogYm9vbGVhbiB7XG4gICAgcmV0dXJuIHRoaXNbSEVBREVSX0ZJTEVfT05MWV07XG4gIH1cblxuICBwdWJsaWMgc2V0IEhFQURFUl9GSUxFX09OTFkodmFsdWU6IGJvb2xlYW4pIHtcbiAgICB0aGlzW0hFQURFUl9GSUxFX09OTFldID0gZW5zdXJlQm9vbGVhbih2YWx1ZSk7XG4gIH1cblxuICBwdWJsaWMgZ2V0IERFRklORVMoKSB7XG4gICAgcmV0dXJuIHRoaXNbREVGSU5FU11cbiAgfVxuXG4gIHB1YmxpYyBnZXQgQ09NUElMRV9GTEFHUygpIHtcbiAgICByZXR1cm4gdGhpc1tDT01QSUxFX0ZMQUdTXTtcbiAgfVxuXG4gIHB1YmxpYyBnZXQgRklMRSgpOiBBYnNvbHV0ZVBhdGgge1xuICAgIHJldHVybiB0aGlzW0ZJTEVdO1xuICB9XG5cbiAgcHVibGljIGdldCBGSUxFX0RJUigpOiBBYnNvbHV0ZVBhdGgge1xuICAgIHJldHVybiB0aGlzW0ZJTEVdLmRpcm5hbWUoKTtcbiAgfVxuXG4gIHB1YmxpYyBnZXQgRklMRV9OQU1FKCk6IHN0cmluZyB7XG4gICAgcmV0dXJuIHRoaXNbRklMRV0uYmFzZW5hbWUoKTtcbiAgfVxuXG4gIHB1YmxpYyBnZXQgT0JKRUNUX0ZJTEUoKTogQWJzb2x1dGVQYXRoIHwgbnVsbCB7XG4gICAgcmV0dXJuIHRoaXNbT0JKRUNUX0ZJTEVdO1xuICB9XG5cbiAgcHVibGljIHNldCBPQkpFQ1RfRklMRSh2YWx1ZTogQWJzb2x1dGVQYXRoKSB7XG4gICAgdGhpc1tPQkpFQ1RfRklMRV0gPSB2YWx1ZTtcbiAgfVxuXG4gIHB1YmxpYyBnZXQgT0JKRUNUX0ZJTEVfRElSKCk6IEFic29sdXRlUGF0aCB8IG51bGwge1xuICAgIHJldHVybiB0aGlzW09CSkVDVF9GSUxFXSA/IHRoaXNbT0JKRUNUX0ZJTEVdLmRpcm5hbWUoKSA6IG51bGw7XG4gIH1cblxuICBwdWJsaWMgZ2V0IE9CSkVDVF9GSUxFX05BTUUoKTogc3RyaW5nIHwgbnVsbCB7XG4gICAgcmV0dXJuIHRoaXNbT0JKRUNUX0ZJTEVdID8gdGhpc1tPQkpFQ1RfRklMRV0uYmFzZW5hbWUoKSA6IG51bGw7XG4gIH1cblxuICBwdWJsaWMgdG9KU09OKCk6IG9iamVjdCB7XG4gICAgcmV0dXJuIHtcbiAgICAgIE5BTUU6IHRoaXMuTkFNRSxcbiAgICAgIExBTkdVQUdFOiB0aGlzLkxBTkdVQUdFLFxuICAgICAgSEVBREVSX0ZJTEVfT05MWTogdGhpcy5IRUFERVJfRklMRV9PTkxZLFxuICAgICAgREVGSU5FUzogdGhpcy5ERUZJTkVTLFxuICAgICAgQ09NUElMRV9GTEFHUzogdGhpcy5DT01QSUxFX0ZMQUdTLFxuICAgICAgRklMRTogdGhpcy5GSUxFLFxuICAgICAgRklMRV9ESVI6IHRoaXMuRklMRV9ESVIsXG4gICAgICBGSUxFX05BTUU6IHRoaXMuRklMRV9OQU1FLFxuICAgICAgT0JKRUNUX0ZJTEU6IHRoaXMuT0JKRUNUX0ZJTEUsXG4gICAgICBPQkpFQ1RfRklMRV9ESVI6IHRoaXMuT0JKRUNUX0ZJTEVfRElSLFxuICAgICAgT0JKRUNUX0ZJTEVfTkFNRTogdGhpcy5PQkpFQ1RfRklMRV9OQU1FLFxuICAgIH07XG4gIH1cbn1cbiIsIi8qXG4gKiBNSVQgTGljZW5zZVxuICpcbiAqIENvcHlyaWdodCAoYykgMjAyNSAgWXVyaWkgWWFrdWJpbiAoeXVyaWkueWFrdWJpbkBnbWFpbC5jb20pXG4gKlxuICogUGVybWlzc2lvbiBpcyBncmFudGVkIHRvIHVzZSwgY29weSwgbW9kaWZ5LCBhbmQgZGlzdHJpYnV0ZSB0aGlzIHNvZnR3YXJlXG4gKiB1bmRlciB0aGUgTUlUIExpY2Vuc2UuIFNlZSBMSUNFTlNFIGZpbGUgZm9yIGRldGFpbHMuXG4gKi9cblxuaW1wb3J0IHsgU291cmNlRmlsZSB9IGZyb20gXCJAL2NvcmUvU291cmNlRmlsZVwiO1xuaW1wb3J0IHsgU3lzdGVtU2NvcGUgfSBmcm9tIFwiQC9jb3JlL1N5c3RlbVNjb3BlXCI7XG5pbXBvcnQgeyBub3JtYWxpemVEZWZpbml0aW9ucyB9IGZyb20gXCJAL2NvcmUvRGVmaW5pdGlvbkhlbHBlclwiO1xuXG5jb25zdCBTT1VSQ0VTID0gU3ltYm9sKFwiU09VUkNFU1wiKTtcblxuZXhwb3J0IGNsYXNzIFNvdXJjZUZpbGVMaXN0IHtcbiAgcHJpdmF0ZSBbU09VUkNFU106IFNvdXJjZUZpbGVbXTtcblxuICBwcml2YXRlIGNvbnN0cnVjdG9yKHNjb3BlOiBTeXN0ZW1TY29wZSwgc291cmNlczogU291cmNlRmlsZVtdKSB7XG4gICAgdGhpc1tTT1VSQ0VTXSA9IFtdO1xuICAgIGZvciAoY29uc3QgaXRlciBvZiBzb3VyY2VzKSB7XG4gICAgICBpZiAoIShpdGVyIGluc3RhbmNlb2YgU291cmNlRmlsZSkpXG4gICAgICAgIHRocm93IG5ldyBFcnJvcihgSXRlbSAke2l0ZXJ9IGlzIG5vdCBTb3VyY2VGaWxlYCk7XG4gICAgICB0aGlzW1NPVVJDRVNdLnB1c2goaXRlcik7XG4gICAgfVxuICB9XG5cbiAgcHVibGljIHN0YXRpYyBjcmVhdGUoc2NvcGU6IFN5c3RlbVNjb3BlLCBzb3VyY2VzOiBTb3VyY2VGaWxlW10pIHtcbiAgICByZXR1cm4gT2JqZWN0LnNlYWwobmV3IFNvdXJjZUZpbGVMaXN0KHNjb3BlLCBzb3VyY2VzKSk7XG4gIH1cblxuICBwdWJsaWMgYWRkRGVmaW5pdGlvbnMoLi4uZGVmaW5pdGlvbnM6IHN0cmluZ1tdKSB7XG4gICAgZm9yIChjb25zdCBpdGVyIG9mIG5vcm1hbGl6ZURlZmluaXRpb25zKC4uLmRlZmluaXRpb25zKSlcbiAgICAgIHRoaXNbU09VUkNFU10uZm9yRWFjaChpID0+IGkuREVGSU5FUy5wdXNoKGl0ZXIpKTtcbiAgfVxuXG4gIHB1YmxpYyBhZGRDb21waWxlRmxhZ3MoLi4uZmxhZ3M6IHN0cmluZ1tdKSB7XG4gICAgZm9yIChjb25zdCBpdGVyIG9mIGZsYWdzLmZsYXQoKSlcbiAgICAgIHRoaXNbU09VUkNFU10uZm9yRWFjaChpID0+IGkuQ09NUElMRV9GTEFHUy5wdXNoKGl0ZXIpKTtcbiAgfVxuXG4gIHB1YmxpYyBzb3VyY2VBdChpbmRleDogbnVtYmVyKTogU291cmNlRmlsZSB7XG4gICAgcmV0dXJuIHRoaXNbU09VUkNFU11baW5kZXhdO1xuICB9XG5cbiAgcHVibGljIHNvdXJjZUNvdW50KGluZGV4OiBudW1iZXIpOiBudW1iZXIge1xuICAgIHJldHVybiB0aGlzW1NPVVJDRVNdLmxlbmd0aDtcbiAgfVxuXG4gIHB1YmxpYyB0b0pTT04oKTogb2JqZWN0IHtcbiAgICByZXR1cm4gdGhpc1tTT1VSQ0VTXTtcbiAgfVxufTtcbiIsIi8qXG4gKiBNSVQgTGljZW5zZVxuICpcbiAqIENvcHlyaWdodCAoYykgMjAyNSAgWXVyaWkgWWFrdWJpbiAoeXVyaWkueWFrdWJpbkBnbWFpbC5jb20pXG4gKlxuICogUGVybWlzc2lvbiBpcyBncmFudGVkIHRvIHVzZSwgY29weSwgbW9kaWZ5LCBhbmQgZGlzdHJpYnV0ZSB0aGlzIHNvZnR3YXJlXG4gKiB1bmRlciB0aGUgTUlUIExpY2Vuc2UuIFNlZSBMSUNFTlNFIGZpbGUgZm9yIGRldGFpbHMuXG4gKi9cblxuaW1wb3J0IG9zIGZyb20gXCJub2RlOm9zXCI7XG5pbXBvcnQgeyBERUJVR19CVUlMRF9UWVBFLCBSRUxFQVNFX0JVSUxEX1RZUEUgfSBmcm9tIFwiQC9jb3JlL1R5cGVzXCI7XG5pbXBvcnQgeyBnZXRTaXplb2ZWb2lkcCB9IGZyb20gXCJAL2NvcmUvR2V0U2l6ZW9mVm9pZHBcIjtcblxuZXhwb3J0IGRlZmF1bHQge1xuICBTWVNURU1fTkFNRToge1xuICAgIGRlc2NyaXB0aW9uOiBcIkRlZmluZXMgdGhlIHRhcmdldCBPUyBmb3IgdGhlIGJ1aWxkLCB1c2VkIGluIGNyb3NzLWNvbXBpbGF0aW9uIGFuZCBuYXRpdmUgYnVpbGRzXCIsXG4gICAgdmFsdWU6IFwiTGludXhcIixcbiAgfSxcbiAgU1lTVEVNX1BST0NFU1NPUjoge1xuICAgIGRlc2NyaXB0aW9uOiBcIkRlZmluZXMgdGhlIHRhcmdldCBDUFUgYXJjaGl0ZWN0dXJlXCIsXG4gICAgdmFsdWU6IFwid2FzbTMyXCIsXG4gIH0sXG4gIFBST0pFQ1RfTkFNRToge1xuICAgIGRlc2NyaXB0aW9uOiBcIk5hbWUgb2YgdGhlIGN1cnJlbnQgcHJvamVjdFwiLFxuICAgIHZhbHVlOiBcIlwiLFxuICB9LFxuICBQUk9KRUNUX1ZFUlNJT046IHtcbiAgICBkZXNjcmlwdGlvbjogXCJWZXJzaW9uIG9mIHRoZSBjdXJyZW50IHByb2plY3RcIixcbiAgICB2YWx1ZTogXCJcIixcbiAgfSxcbiAgUFJPSkVDVF9ERVNDUklQVElPTjoge1xuICAgIGRlc2NyaXB0aW9uOiBcIkRlc2NyaXB0aW9uIG9mIHRoZSBjdXJyZW50IHByb2plY3RcIixcbiAgICB2YWx1ZTogXCJcIixcbiAgfSxcbiAgUFJPSkVDVF9IT01FUEFHRV9VUkw6IHtcbiAgICBkZXNjcmlwdGlvbjogXCJIb21lcGFnZSBVUkwgb2YgdGhlIGN1cnJlbnQgcHJvamVjdFwiLFxuICAgIHZhbHVlOiBcIlwiLFxuICB9LFxuICBQUk9KRUNUX1NPVVJDRV9ESVI6IHtcbiAgICBkZXNjcmlwdGlvbjogXCJBYnNvbHV0ZSBwYXRoIHRvIHRoZSB0b3AtbGV2ZWwgc291cmNlIGRpcmVjdG9yeSBvZiB0aGUgcHJvamVjdFwiLFxuICAgIHR5cGU6IFwiRGlyUGF0aFwiLFxuICB9LFxuICBQUk9KRUNUX0JJTkFSWV9ESVI6IHtcbiAgICBkZXNjcmlwdGlvbjogXCJBYnNvbHV0ZSBwYXRoIHRvIHRoZSB0b3AtbGV2ZWwgYnVpbGQgKGJpbmFyeSkgZGlyZWN0b3J5IG9mIHRoZSBwcm9qZWN0XCIsXG4gICAgdHlwZTogXCJEaXJQYXRoXCIsXG4gIH0sXG4gIFNDUklQVF9GSUxFOiB7XG4gICAgZGVzY3JpcHRpb246IFwiRnVsbCBwYXRoIHRvIHRoZSBjdXJyZW50IE1ha2VTY3JpcHQgZmlsZSBiZWluZyBwcm9jZXNzZWRcIixcbiAgICB0eXBlOiBcIkZpbGVQYXRoXCIsXG4gIH0sXG4gIFNDUklQVF9ESVI6IHtcbiAgICBkZXNjcmlwdGlvbjogXCJEaXJlY3Rvcnkgb2YgdGhlIGN1cnJlbnQgTWFrZVNjcmlwdCBmaWxlIGJlaW5nIHByb2Nlc3NlZFwiLFxuICAgIHR5cGU6IFwiRGlyUGF0aFwiLFxuICB9LFxuICBQQUNLQUdFX0ZJTEU6IHtcbiAgICBkZXNjcmlwdGlvbjogXCJGaWxlbmFtZSBvZiBwcm9qZWN0IG1hbmlmZXN0IGNvbnRhaW5pbmcgbWV0YWRhdGEgYW5kIGRlcGVuZGVuY2llc1wiLFxuICAgIHR5cGU6IFwiRmlsZVBhdGhcIixcbiAgfSxcbiAgQ0FDSEVfRklMRToge1xuICAgIGRlc2NyaXB0aW9uOiBcIkRlZmF1bHQgZmlsZW5hbWUgb2YgdGhlIEJpdE1ha2UgY2FjaGUgc3RvcmluZyBzZXR0aW5nc1wiLFxuICAgIHR5cGU6IFwiRmlsZVBhdGhcIixcbiAgfSxcbiAgVE9PTENIQUlOX0ZJTEU6IHtcbiAgICBkZXNjcmlwdGlvbjogXCJTcGVjaWZpZXMgdGhlIHBhdGggdG8gYSB0b29sY2hhaW4gZmlsZSB1c2VkIGZvciBjcm9zcy1jb21waWxhdGlvblwiLFxuICAgIHR5cGU6IFwiRmlsZVBhdGhcIixcbiAgfSxcbiAgQlVJTERfVFlQRToge1xuICAgIGRlc2NyaXB0aW9uOiBcIlNwZWNpZmllcyB0aGUgYnVpbGQgY29uZmlndXJhdGlvbiBmb3IgY29udHJvbGxpbmcgb3B0aW1pemF0aW9uIGxldmVscyBhbmQgZGVidWcgaW5mb3JtYXRpb24gaW4gdGhlIGJ1aWxkIHByb2Nlc3NcIixcbiAgICB0eXBlOiBbIERFQlVHX0JVSUxEX1RZUEUsIFJFTEVBU0VfQlVJTERfVFlQRSBdLFxuICAgIHZhbHVlOiBSRUxFQVNFX0JVSUxEX1RZUEUsXG4gIH0sXG4gIElOU1RBTExfUFJFRklYOiB7XG4gICAgZGVzY3JpcHRpb246IFwiVGhlIHJvb3QgZGlyZWN0b3J5IHdoZXJlIGZpbGVzIHdpbGwgYmUgaW5zdGFsbGVkIGJ5IGRlZmF1bHRcIixcbiAgICB0eXBlOiBcIkRpclBhdGhcIixcbiAgICB2YWx1ZTogXCIvdXNyXCIsXG4gIH0sXG4gIERFU1RESVI6IHtcbiAgICBkZXNjcmlwdGlvbjogXCJUZW1wb3JhcnkgaW5zdGFsbGF0aW9uIHJvb3RcIixcbiAgICB0eXBlOiBcIkRpclBhdGhcIixcbiAgfSxcbiAgU09VUkNFX0RJUjoge1xuICAgIGRlc2NyaXB0aW9uOiBcIlBhdGggdG8gdGhlIHNvdXJjZSBkaXJlY3RvcnkgY3VycmVudGx5IGJlaW5nIHByb2Nlc3NlZFwiLFxuICAgIHR5cGU6IFwiRGlyUGF0aFwiLFxuICB9LFxuICBCSU5BUllfRElSOiB7XG4gICAgZGVzY3JpcHRpb246IFwiUGF0aCB0byB0aGUgYmluYXJ5IGRpcmVjdG9yeSBjdXJyZW50bHkgYmVpbmcgcHJvY2Vzc2VkXCIsXG4gICAgdHlwZTogXCJEaXJQYXRoXCIsXG4gIH0sXG4gIFBPU0lUSU9OX0lOREVQRU5ERU5UX0NPREU6IHtcbiAgICBkZXNjcmlwdGlvbjogXCJFbmFibGVzIFBvc2l0aW9uLUluZGVwZW5kZW50IENvZGUgKFBJQykgZm9yIGJ1aWxkaW5nIHNoYXJlZCBsaWJyYXJpZXNcIixcbiAgICB2YWx1ZTogZmFsc2UsXG4gIH0sXG4gIFBSRVZFTlRfSU5TVEFMTF9GSUxFUzoge1xuICAgIGRlc2NyaXB0aW9uOiBcIlByZXZlbnQgaW5zdGFsbGF0aW9uIG9mIGZpbGVzXCIsXG4gICAgdmFsdWU6IGZhbHNlLFxuICB9LFxuICBIT1NUX1NZU1RFTV9OQU1FOiB7XG4gICAgZGVzY3JpcHRpb246IFwiU3BlY2lmaWVzIHRoZSBPUyBvZiB0aGUgbWFjaGluZSBydW5uaW5nXCIsXG4gICAgdmFsdWU6IG9zLnR5cGUoKSxcbiAgfSxcbiAgSU5DTFVERVM6IHtcbiAgICBkZXNjcmlwdGlvbjogXCJQYXRocyBzZWFyY2hlZCBmb3IgaGVhZGVyIGZpbGVzXCIsXG4gICAgdmFsdWU6IFtdLFxuICB9LFxuICBBU01fQ09NUElMRVI6IHtcbiAgICBkZXNjcmlwdGlvbjogXCJQYXRoIHRvIHRoZSBhc3NlbWJsZXIgY29tcGlsZXIgZGV0ZWN0ZWRcIixcbiAgICB2YWx1ZTogXCJcIixcbiAgfSxcbiAgQVNNX0ZMQUdTOiB7XG4gICAgZGVzY3JpcHRpb246IFwiRmxhZ3MgcGFzc2VkIHRvIHRoZSBhc3NlbWJsZXIgY29tcGlsZXJcIixcbiAgICB2YWx1ZTogW10sXG4gIH0sXG4gIEFTTV9GTEFHU19ERUJVRzoge1xuICAgIGRlc2NyaXB0aW9uOiBcIkFkZGl0aW9uYWwgYXNzZW1ibGVyIGZsYWdzIHVzZWQgd2hlbiBidWlsZGluZyBpbiBEZWJ1ZyBtb2RlXCIsXG4gICAgdmFsdWU6IFsgXCItZ1wiIF0sXG4gIH0sXG4gIEFTTV9GTEFHU19SRUxFQVNFOiB7XG4gICAgZGVzY3JpcHRpb246IFwiQWRkaXRpb25hbCBhc3NlbWJsZXIgZmxhZ3MgdXNlZCB3aGVuIGJ1aWxkaW5nIGluIFJlbGVhc2UgbW9kZVwiLFxuICAgIHZhbHVlOiBbIFwiLU8zXCIsIFwiLUROREVCVUdcIiBdLFxuICB9LFxuICBDX0NPTVBJTEVSOiB7XG4gICAgZGVzY3JpcHRpb246IFwiUGF0aCB0byB0aGUgQyBjb21waWxlciBkZXRlY3RlZFwiLFxuICAgIHZhbHVlOiBcIlwiLFxuICB9LFxuICBDX0ZMQUdTOiB7XG4gICAgZGVzY3JpcHRpb246IFwiRmxhZ3MgcGFzc2VkIHRvIHRoZSBDIGNvbXBpbGVyXCIsXG4gICAgdmFsdWU6IFtdLFxuICB9LFxuICBDX0ZMQUdTX0RFQlVHOiB7XG4gICAgZGVzY3JpcHRpb246IFwiQWRkaXRpb25hbCBDIGNvbXBpbGVyIGZsYWdzIHVzZWQgd2hlbiBidWlsZGluZyBpbiBEZWJ1ZyBtb2RlXCIsXG4gICAgdmFsdWU6IFsgXCItZ1wiIF0sXG4gIH0sXG4gIENfRkxBR1NfUkVMRUFTRToge1xuICAgIGRlc2NyaXB0aW9uOiBcIkFkZGl0aW9uYWwgQyBjb21waWxlciBmbGFncyB1c2VkIHdoZW4gYnVpbGRpbmcgaW4gUmVsZWFzZSBtb2RlXCIsXG4gICAgdmFsdWU6IFsgXCItTzNcIiwgXCItRE5ERUJVR1wiIF0sXG4gIH0sXG4gIENYWF9DT01QSUxFUjoge1xuICAgIGRlc2NyaXB0aW9uOiBcIlBhdGggdG8gdGhlIEMrKyBjb21waWxlciBkZXRlY3RlZFwiLFxuICAgIHZhbHVlOiBcIlwiLFxuICB9LFxuICBDWFhfRkxBR1M6IHtcbiAgICBkZXNjcmlwdGlvbjogXCJGbGFncyBwYXNzZWQgdG8gdGhlIEMgY29tcGlsZXJcIixcbiAgICB2YWx1ZTogW10sXG4gIH0sXG4gIENYWF9GTEFHU19ERUJVRzoge1xuICAgIGRlc2NyaXB0aW9uOiBcIkFkZGl0aW9uYWwgQysrIGNvbXBpbGVyIGZsYWdzIHVzZWQgd2hlbiBidWlsZGluZyBpbiBEZWJ1ZyBtb2RlXCIsXG4gICAgdmFsdWU6IFsgXCItZ1wiIF0sXG4gIH0sXG4gIENYWF9GTEFHU19SRUxFQVNFOiB7XG4gICAgZGVzY3JpcHRpb246IFwiQWRkaXRpb25hbCBDKysgY29tcGlsZXIgZmxhZ3MgdXNlZCB3aGVuIGJ1aWxkaW5nIGluIFJlbGVhc2UgbW9kZVwiLFxuICAgIHZhbHVlOiBbIFwiLU8zXCIsIFwiLUROREVCVUdcIiBdLFxuICB9LFxuICBBUjoge1xuICAgIGRlc2NyaXB0aW9uOiBcIlBhdGggdG8gdGhlIGFyY2hpdmVyIHRvb2wgdXNlZCB0byBjcmVhdGUgc3RhdGljIGxpYnJhcmllc1wiLFxuICAgIHZhbHVlOiBcIlwiLFxuICB9LFxuICBSQU5MSUI6IHtcbiAgICBkZXNjcmlwdGlvbjogXCJUb29sIHVzZWQgdG8gZ2VuZXJhdGUgYW4gaW5kZXggdG8gdGhlIGNvbnRlbnRzIG9mIGFuIGFyY2hpdmUgKHN0YXRpYyBsaWJyYXJ5KVwiLFxuICAgIHZhbHVlOiBcIlwiLFxuICB9LFxuICBMSU5LRVI6IHtcbiAgICBkZXNjcmlwdGlvbjogXCJQYXRoIHRvIHRoZSBsaW5rZXIgdXNlZCB0byBsaW5rIG9iamVjdCBmaWxlcyBhbmQgbGlicmFyaWVzIGludG8gZXhlY3V0YWJsZXNcIixcbiAgICB2YWx1ZTogXCJcIixcbiAgfSxcbiAgTk06IHtcbiAgICBkZXNjcmlwdGlvbjogXCJQYXRoIHRvIHRoZSB0b29sIHVzZWQgdG8gbGlzdCBzeW1ib2xzIGZyb20gb2JqZWN0IGZpbGVzIG9yIGFyY2hpdmVzXCIsXG4gICAgdmFsdWU6IFwiXCIsXG4gIH0sXG4gIE9CSkNPUFk6IHtcbiAgICBkZXNjcmlwdGlvbjogXCJQYXRoIHRvIHRoZSB0b29sIHVzZWQgdG8gY29weSBhbmQgdHJhbnNsYXRlIG9iamVjdCBmaWxlc1wiLFxuICAgIHZhbHVlOiBcIlwiLFxuICB9LFxuICBPQkpEVU1QOiB7XG4gICAgZGVzY3JpcHRpb246IFwiUGF0aCB0byB0aGUgdG9vbCB1c2VkIHRvIGRpc3BsYXkgaW5mb3JtYXRpb24gYWJvdXQgb2JqZWN0IGZpbGVzLCBzdWNoIGFzIGRpc2Fzc2VtYmx5XCIsXG4gICAgdmFsdWU6IFwiXCIsXG4gIH0sXG4gIFNUUklQOiB7XG4gICAgZGVzY3JpcHRpb246IFwiUGF0aCB0byB0aGUgdG9vbCB1c2VkIHRvIHJlbW92ZSBzeW1ib2xzIGZyb20gb2JqZWN0IGZpbGVzIG9yIGV4ZWN1dGFibGVzIHRvIHJlZHVjZSBzaXplXCIsXG4gICAgdmFsdWU6IFwiXCIsXG4gIH0sXG4gIE9CSkVDVF9MSUJSQVJZX1BSRUZJWDoge1xuICAgIGRlc2NyaXB0aW9uOiBcIlByZWZpeCB1c2VkIGZvciBvYmplY3QgbGlicmFyaWVzXCIsXG4gICAgdmFsdWU6IFwiXCIsXG4gIH0sXG4gIE9CSkVDVF9MSUJSQVJZX1NVRkZJWDoge1xuICAgIGRlc2NyaXB0aW9uOiBcIlN1ZmZpeCB1c2VkIGZvciBvYmplY3QgbGlicmFyeSBmaWxlc1wiLFxuICAgIHZhbHVlOiBcIi5vXCIsXG4gIH0sXG4gIE9CSkVDVF9MSU5LRVJfRkxBR1M6IHtcbiAgICBkZXNjcmlwdGlvbjogXCJGbGFncyBwYXNzZWQgdG8gdGhlIGxpbmtlciB3aGVuIGNyZWF0aW5nIG9iamVjdCBsaWJyYXJpZXNcIixcbiAgICB2YWx1ZTogW10sXG4gIH0sXG4gIFNUQVRJQ19MSUJSQVJZX1BSRUZJWDoge1xuICAgIGRlc2NyaXB0aW9uOiBcIlByZWZpeCB1c2VkIGZvciBzdGF0aWMgbGlicmFyeSBmaWxlc1wiLFxuICAgIHZhbHVlOiBcImxpYlwiLFxuICB9LFxuICBTVEFUSUNfTElCUkFSWV9TVUZGSVg6IHtcbiAgICBkZXNjcmlwdGlvbjogXCJTdWZmaXggdXNlZCBmb3Igc3RhdGljIGxpYnJhcnkgZmlsZXNcIixcbiAgICB2YWx1ZTogXCIuYVwiLFxuICB9LFxuICBTVEFUSUNfTElOS0VSX0ZMQUdTOiB7XG4gICAgZGVzY3JpcHRpb246IFwiRmxhZ3MgcGFzc2VkIHRvIHRoZSBsaW5rZXIgd2hlbiBjcmVhdGluZyBzdGF0aWMgbGlicmFyaWVzXCIsXG4gICAgdmFsdWU6IFtdLFxuICB9LFxuICBTSEFSRURfTElCUkFSWV9QUkVGSVg6IHtcbiAgICBkZXNjcmlwdGlvbjogXCJQcmVmaXggdXNlZCBmb3Igc2hhcmVkIGxpYnJhcnkgZmlsZXNcIixcbiAgICB2YWx1ZTogXCJsaWJcIixcbiAgfSxcbiAgU0hBUkVEX0xJQlJBUllfU1VGRklYOiB7XG4gICAgZGVzY3JpcHRpb246IFwiU3VmZml4IHVzZWQgZm9yIHNoYXJlZCBsaWJyYXJ5IGZpbGVzXCIsXG4gICAgdmFsdWU6IFwiLnNvXCIsXG4gIH0sXG4gIFNIQVJFRF9MSU5LRVJfRkxBR1M6IHtcbiAgICBkZXNjcmlwdGlvbjogXCJGbGFncyBwYXNzZWQgdG8gdGhlIGxpbmtlciB3aGVuIGNyZWF0aW5nIHNoYXJlZCBsaWJyYXJpZXNcIixcbiAgICB2YWx1ZTogW10sXG4gIH0sXG4gIEVYRUNVVEFCTEVfU1VGRklYOiB7XG4gICAgZGVzY3JpcHRpb246IFwiU3VmZml4IHVzZWQgZm9yIGV4ZWN1dGFibGUgZmlsZXNcIixcbiAgICB2YWx1ZTogXCJcIixcbiAgfSxcbiAgRVhFX0xJTktFUl9GTEFHUzoge1xuICAgIGRlc2NyaXB0aW9uOiBcIkZsYWdzIHBhc3NlZCB0byB0aGUgbGlua2VyIHdoZW4gY3JlYXRpbmcgZXhlY3V0YWJsZXNcIixcbiAgICB2YWx1ZTogW10sXG4gIH0sXG4gIEdMT0JBTF9DT05URVhUX0pTT046IHtcbiAgICBkZXNjcmlwdGlvbjogXCJGaWxlbmFtZSBmb3IgSlNPTiBvZiB0aGUgR2xvYmFsIGNvbnRleHRcIixcbiAgICB0eXBlOiBcIkZpbGVQYXRoXCIsXG4gIH0sXG4gIFRBUkdFVF9HT0FMU19KU09OOiB7XG4gICAgZGVzY3JpcHRpb246IFwiRmlsZW5hbWUgZm9yIEpTT04gb2YgdGhlIFRhcmdldCBHb2Fsc1wiLFxuICAgIHR5cGU6IFwiRmlsZVBhdGhcIixcbiAgfSxcbiAgU0laRU9GX1ZPSURfUDoge1xuICAgIGRlc2NyaXB0aW9uOiBcIkRlZmluZXMgdGhlIHNpemUgKGluIGJ5dGVzKSBvZiBhIHZvaWQgcG9pbnRlciBvbiB0aGUgdGFyZ2V0IGFyY2hpdGVjdHVyZVwiLFxuICAgIHR5cGU6IFsgNCwgOCBdLFxuICAgIHZhbHVlOiBnZXRTaXplb2ZWb2lkcCgpLFxuICB9LFxuICBNQUtFX1BMVUdJTl9MSVNUOiB7XG4gICAgZGVzY3JpcHRpb246IFwiTGlzdCBvZiBwYXRocyB0byBwbHVnaW5zXCIsXG4gICAgdmFsdWU6IFtdLFxuICB9LFxufTtcbiIsIi8qXG4gKiBNSVQgTGljZW5zZVxuICpcbiAqIENvcHlyaWdodCAoYykgMjAyNSAgWXVyaWkgWWFrdWJpbiAoeXVyaWkueWFrdWJpbkBnbWFpbC5jb20pXG4gKlxuICogUGVybWlzc2lvbiBpcyBncmFudGVkIHRvIHVzZSwgY29weSwgbW9kaWZ5LCBhbmQgZGlzdHJpYnV0ZSB0aGlzIHNvZnR3YXJlXG4gKiB1bmRlciB0aGUgTUlUIExpY2Vuc2UuIFNlZSBMSUNFTlNFIGZpbGUgZm9yIGRldGFpbHMuXG4gKi9cblxuaW1wb3J0IHsgZW5zdXJlU3RyaW5nIH0gZnJvbSBcIkAvdXRpbHMvU3RyaWN0VHlwZVwiO1xuaW1wb3J0IHsgU291cmNlRmlsZSB9IGZyb20gXCJAL2NvcmUvU291cmNlRmlsZVwiO1xuaW1wb3J0IHsgU291cmNlRmlsZUxpc3QgfSBmcm9tIFwiQC9jb3JlL1NvdXJjZUZpbGVMaXN0XCI7XG5pbXBvcnQgeyBJbmNsdWRlRGlyZWN0b3J5IH0gZnJvbSBcIkAvY29yZS9JbmNsdWRlRGlyZWN0b3J5XCI7XG5pbXBvcnQgeyBJbnRlcmZhY2VUYXJnZXQgfSBmcm9tIFwiQC9jb3JlL0ludGVyZmFjZVRhcmdldFwiO1xuaW1wb3J0IHsgSW50ZXJmYWNlSW5jbHVkZXMgfSBmcm9tIFwiQC9jb3JlL0ludGVyZmFjZUluY2x1ZGVzXCI7XG5pbXBvcnQgeyBJbnRlcmZhY2VPYmplY3RzIH0gZnJvbSBcIkAvY29yZS9JbnRlcmZhY2VPYmplY3RzXCI7XG5pbXBvcnQgeyBBYnNvbHV0ZVBhdGggfSBmcm9tIFwiQC9jb3JlL1BhdGhcIjtcbmltcG9ydCB7IEFMTF9UQVJHRVQsIElOU1RBTExfVEFSR0VUIH0gZnJvbSBcIkAvQ29uc3RhbnRzXCI7XG5pbXBvcnQgeyBTY29wZUhlbHBlciB9IGZyb20gXCJAL2NvcmUvU2NvcGVcIjtcbmltcG9ydCB7IFN5c3RlbVNjb3BlIH0gZnJvbSBcIkAvY29yZS9TeXN0ZW1TY29wZVwiO1xuaW1wb3J0IHsgbm9ybWFsaXplRGVmaW5pdGlvbnMgfSBmcm9tIFwiQC9jb3JlL0RlZmluaXRpb25IZWxwZXJcIjtcblxuY29uc3QgTkFNRSAgICAgICAgICAgICAgICA9IFN5bWJvbChcIk5BTUVcIik7XG5jb25zdCBUQVJHRVRfU0NPUEUgICAgICAgID0gU3ltYm9sKFwiVEFSR0VUX1NDT1BFXCIpO1xuY29uc3QgT1VUUFVUX05BTUUgICAgICAgICA9IFN5bWJvbChcIk9VVFBVVF9OQU1FXCIpO1xuY29uc3QgQ09NUElMRV9PUFRJT05TICAgICA9IFN5bWJvbChcIkNPTVBJTEVfT1BUSU9OU1wiKTtcbmNvbnN0IFBSRUZJWCAgICAgICAgICAgICAgPSBTeW1ib2woXCJQUkVGSVhcIik7XG5jb25zdCBTVUZGSVggICAgICAgICAgICAgID0gU3ltYm9sKFwiU1VGRklYXCIpO1xuY29uc3QgTElOS19PUFRJT05TICAgICAgICA9IFN5bWJvbChcIkxJTktfT1BUSU9OU1wiKTtcbmNvbnN0IElOQ0xVREVTICAgICAgICAgICAgPSBTeW1ib2woXCJJTkNMVURFU1wiKTtcbmNvbnN0IERFRklORVMgICAgICAgICAgICAgPSBTeW1ib2woXCJERUZJTkVTXCIpO1xuY29uc3QgU09VUkNFUyAgICAgICAgICAgICA9IFN5bWJvbChcIlNPVVJDRVNcIik7XG5jb25zdCBMSUJSQVJJRVMgICAgICAgICAgID0gU3ltYm9sKFwiTElCUkFSSUVTXCIpO1xuY29uc3QgUE9TSVRJT05fSU5ERVBFTkRFTlRfQ09ERSA9IFN5bWJvbChcIlBPU0lUSU9OX0lOREVQRU5ERU5UX0NPREVcIik7XG5cbmZ1bmN0aW9uIGVuc3VyZVRhcmdldE5hbWUobmFtZTogc3RyaW5nKTogc3RyaW5nIHtcbiAgaWYgKHR5cGVvZiBuYW1lICE9PSBcInN0cmluZ1wiKVxuICAgIHRocm93IG5ldyBFcnJvcihgVGFyZ2V0IFwiJHtuYW1lfVwiIGlzIG5vdCBzdHJpbmcgdHlwZWApO1xuICBpZiAoWyBBTExfVEFSR0VULCBJTlNUQUxMX1RBUkdFVCBdLmluY2x1ZGVzKG5hbWUpKVxuICAgIHRocm93IG5ldyBFcnJvcihgVGFyZ2V0IFwiJHtuYW1lfVwiIGlzIHJlc2VydmVkIG5hbWVgKTtcbiAgcmV0dXJuIG5hbWU7XG59XG5cbmludGVyZmFjZSBJbmNsdWRlRW50cnkge1xuICBWQUxVRTogSW50ZXJmYWNlSW5jbHVkZXMgfCBJbmNsdWRlRGlyZWN0b3J5IHwgc3RyaW5nO1xuICBQVUJMSUNfT05MWT86IGJvb2xlYW47XG59O1xuXG5leHBvcnQgY2xhc3MgQmFzZVRhcmdldCB7XG4gIHByaXZhdGUgW05BTUVdOiBzdHJpbmc7XG4gIHByaXZhdGUgW1RBUkdFVF9TQ09QRV06IFN5c3RlbVNjb3BlO1xuICBwcml2YXRlIFtPVVRQVVRfTkFNRV06IHN0cmluZztcbiAgcHJpdmF0ZSBbUFJFRklYXTogc3RyaW5nO1xuICBwcml2YXRlIFtTVUZGSVhdOiBzdHJpbmdcbiAgcHJpdmF0ZSBbQ09NUElMRV9PUFRJT05TXTogYW55W107XG4gIHByaXZhdGUgW0xJTktfT1BUSU9OU106IGFueVtdO1xuICBwcml2YXRlIFtTT1VSQ0VTXTogYW55W107XG4gIHByaXZhdGUgW0xJQlJBUklFU106IGFueVtdO1xuICBwcml2YXRlIFtJTkNMVURFU106IEluY2x1ZGVFbnRyeVtdO1xuICBwcml2YXRlIFtERUZJTkVTXTogYW55W107XG4gIHByaXZhdGUgW1BPU0lUSU9OX0lOREVQRU5ERU5UX0NPREVdOiBib29sZWFuO1xuXG4gIHByb3RlY3RlZCBjb25zdHJ1Y3RvcihzY29wZTogU3lzdGVtU2NvcGUsIG5hbWU6IHN0cmluZykge1xuICAgIHRoaXNbTkFNRV0gPSBlbnN1cmVUYXJnZXROYW1lKG5hbWUpO1xuICAgIHRoaXNbVEFSR0VUX1NDT1BFXSA9IFNjb3BlSGVscGVyLmNsb25lKHt9LCBzY29wZSk7XG4gICAgdGhpc1tPVVRQVVRfTkFNRV0gPSBlbnN1cmVTdHJpbmcobmFtZSk7XG4gICAgdGhpc1tQUkVGSVhdID0gXCJcIjtcbiAgICB0aGlzW1NVRkZJWF0gPSBcIlwiO1xuICAgIHRoaXNbQ09NUElMRV9PUFRJT05TXSA9IFtdO1xuICAgIHRoaXNbTElOS19PUFRJT05TXSA9IFtdO1xuICAgIHRoaXNbU09VUkNFU10gPSBbXTtcbiAgICB0aGlzW0xJQlJBUklFU10gPSBbXTtcbiAgICB0aGlzW0lOQ0xVREVTXSA9IHNjb3BlLklOQ0xVREVTLm1hcCgoVkFMVUU6IGFueSkgPT4gKHsgVkFMVUUgfSkpO1xuICAgIHRoaXNbREVGSU5FU10gPSBbXTtcbiAgICB0aGlzW1BPU0lUSU9OX0lOREVQRU5ERU5UX0NPREVdID0gc2NvcGUuUE9TSVRJT05fSU5ERVBFTkRFTlRfQ09ERTtcbiAgfVxuXG4gIHB1YmxpYyBnZXQgTkFNRSgpIHtcbiAgICByZXR1cm4gdGhpc1tOQU1FXTtcbiAgfVxuXG4gIHB1YmxpYyBnZXQgVEFSR0VUX1NDT1BFKCkge1xuICAgIHJldHVybiB0aGlzW1RBUkdFVF9TQ09QRV07XG4gIH1cblxuICBwdWJsaWMgZ2V0IE9VVFBVVF9OQU1FKCkge1xuICAgIHJldHVybiB0aGlzW09VVFBVVF9OQU1FXTtcbiAgfVxuXG4gIHB1YmxpYyBzZXQgT1VUUFVUX05BTUUodmFsdWU6IHN0cmluZykge1xuICAgIHRoaXNbT1VUUFVUX05BTUVdID0gZW5zdXJlU3RyaW5nKHZhbHVlKTtcbiAgfVxuXG4gIHB1YmxpYyBnZXQgQ09NUElMRV9PUFRJT05TKCk6IHN0cmluZ1tdIHtcbiAgICByZXR1cm4gdGhpc1tDT01QSUxFX09QVElPTlNdO1xuICB9XG5cbiAgcHVibGljIGdldCBQUkVGSVgoKSB7XG4gICAgcmV0dXJuIHRoaXNbUFJFRklYXTtcbiAgfVxuXG4gIHB1YmxpYyBzZXQgUFJFRklYKHZhbHVlOiBzdHJpbmcpIHtcbiAgICB0aGlzW1BSRUZJWF0gPSBlbnN1cmVTdHJpbmcodmFsdWUpO1xuICB9XG5cbiAgcHVibGljIGdldCBTVUZGSVgoKSB7XG4gICAgcmV0dXJuIHRoaXNbU1VGRklYXTtcbiAgfVxuXG4gIHB1YmxpYyBzZXQgU1VGRklYKHZhbHVlOiBzdHJpbmcpIHtcbiAgICB0aGlzW1NVRkZJWF0gPSBlbnN1cmVTdHJpbmcodmFsdWUpO1xuICB9XG5cbiAgcHVibGljIGdldCBMSU5LX09QVElPTlMoKTogc3RyaW5nW10ge1xuICAgIHJldHVybiB0aGlzW0xJTktfT1BUSU9OU107XG4gIH1cblxuICBwdWJsaWMgZ2V0IElOQ0xVREVTKCkge1xuICAgIHJldHVybiB0aGlzW0lOQ0xVREVTXTtcbiAgfVxuXG4gIHB1YmxpYyBnZXQgREVGSU5FUygpOiBzdHJpbmdbXSB7XG4gICAgcmV0dXJuIHRoaXNbREVGSU5FU107XG4gIH1cblxuICBwdWJsaWMgZ2V0IFNPVVJDRVMoKTogc3RyaW5nW10ge1xuICAgIHJldHVybiB0aGlzW1NPVVJDRVNdO1xuICB9XG5cbiAgcHVibGljIGdldCBMSUJSQVJJRVMoKTogc3RyaW5nW10ge1xuICAgIHJldHVybiB0aGlzW0xJQlJBUklFU107XG4gIH1cblxuICBwdWJsaWMgZ2V0IEZJTEVfRElSKCk6IEFic29sdXRlUGF0aCB7XG4gICAgcmV0dXJuIHRoaXNbVEFSR0VUX1NDT1BFXS5CSU5BUllfRElSO1xuICB9XG5cbiAgcHVibGljIGdldCBGSUxFX05BTUUoKTogc3RyaW5nIHtcbiAgICByZXR1cm4gdGhpcy5QUkVGSVggKyB0aGlzLk9VVFBVVF9OQU1FICsgdGhpcy5TVUZGSVg7XG4gIH1cblxuICBwdWJsaWMgZ2V0IEZJTEUoKTogQWJzb2x1dGVQYXRoIHtcbiAgICByZXR1cm4gdGhpcy5GSUxFX0RJUi5qb2luKHRoaXMuRklMRV9OQU1FKTtcbiAgfVxuXG4gIHB1YmxpYyBnZXQgUE9TSVRJT05fSU5ERVBFTkRFTlRfQ09ERSgpOiBib29sZWFuIHtcbiAgICByZXR1cm4gdGhpc1tQT1NJVElPTl9JTkRFUEVOREVOVF9DT0RFXTtcbiAgfVxuXG4gIHB1YmxpYyBhZGRTb3VyY2VzKC4uLnNvdXJjZXM6IEFycmF5PEludGVyZmFjZU9iamVjdHMgfCBTb3VyY2VGaWxlIHwgQWJzb2x1dGVQYXRoIHwgc3RyaW5nPikge1xuICAgIGZvciAobGV0IGl0IG9mIHNvdXJjZXMuZmxhdCgxKSkge1xuICAgICAgaWYgKGl0IGluc3RhbmNlb2YgSW50ZXJmYWNlT2JqZWN0cyB8fCBpdCBpbnN0YW5jZW9mIFNvdXJjZUZpbGUpXG4gICAgICAgIHt9XG4gICAgICBlbHNlIGlmICh0eXBlb2YgaXQgPT09IFwic3RyaW5nXCIgfHwgQWJzb2x1dGVQYXRoLmlzQWJzb2x1dGUoaXQpKVxuICAgICAgICBpdCA9IFNvdXJjZUZpbGUuY3JlYXRlKHRoaXNbVEFSR0VUX1NDT1BFXSwgaXQpO1xuICAgICAgZWxzZVxuICAgICAgICB0aHJvdyBuZXcgRXJyb3IoYE5vdCBzdXBwb3J0IGluc3RhbmNlICR7aXR9YCk7XG4gIFxuICAgICAgaWYgKGl0IGluc3RhbmNlb2YgU291cmNlRmlsZSAmJiBpdC5MQU5HVUFHRSkge1xuICAgICAgICBjb25zdCByZmlsZTEgPSB0aGlzW1RBUkdFVF9TQ09QRV0uQklOQVJZX0RJUi5yZWxhdGl2ZShpdC5GSUxFKTtcbiAgICAgICAgY29uc3QgcmZpbGUyID0gdGhpc1tUQVJHRVRfU0NPUEVdLlNPVVJDRV9ESVIucmVsYXRpdmUoaXQuRklMRSk7XG4gICAgICAgIGNvbnN0IHJmaWxlID0gKHJmaWxlMi5sZW5ndGggPCByZmlsZTEubGVuZ3RoID8gcmZpbGUyIDogcmZpbGUxKS5yZXBsYWNlKFwiLi4vXCIsIFwiX18vXCIpO1xuICAgICAgICBpdC5PQkpFQ1RfRklMRSA9IHRoaXNbVEFSR0VUX1NDT1BFXS5CSU5BUllfRElSLmpvaW4oXCJNYWtlRmlsZXNcIiwgdGhpc1tOQU1FXSArIFwiLmRpclwiLCAgcmZpbGUgKyBcIi5vYmpcIik7XG4gICAgICB9XG4gIFxuICAgICAgdGhpc1tTT1VSQ0VTXS5wdXNoKGl0KTtcbiAgICB9XG4gIH1cblxuICBwdWJsaWMgYWRkSW5jbHVkZXMoLi4uaW5jbHVkZXM6IEFycmF5PEludGVyZmFjZUluY2x1ZGVzIHwgQWJzb2x1dGVQYXRoIHwgc3RyaW5nPikge1xuICAgIGZvciAoY29uc3QgaXQgb2YgaW5jbHVkZXMuZmxhdCgxKSkge1xuICAgICAgbGV0IFZBTFVFO1xuICAgICAgaWYgKGl0IGluc3RhbmNlb2YgSW50ZXJmYWNlSW5jbHVkZXMpXG4gICAgICAgIFZBTFVFID0gaXQ7XG4gICAgICBlbHNlIGlmICh0eXBlb2YgaXQgPT09IFwic3RyaW5nXCIgfHwgQWJzb2x1dGVQYXRoLmlzQWJzb2x1dGUoaXQpKVxuICAgICAgICBWQUxVRSA9IEluY2x1ZGVEaXJlY3RvcnkuY3JlYXRlKGl0LCB0aGlzW1RBUkdFVF9TQ09QRV0uU09VUkNFX0RJUik7XG4gICAgICBlbHNlXG4gICAgICAgIHRocm93IG5ldyBFcnJvcihgTm90IHN1cHBvcnQgaW5zdGFuY2UgJHtpdH1gKTtcbiAgICAgIHRoaXNbSU5DTFVERVNdLnB1c2goe1ZBTFVFfSk7IC8vIEluY2x1ZGVEaXJlY3RvcnlbXVxuICAgIH1cbiAgfVxuXG4gIHB1YmxpYyBhZGRMaWJyYXJpZXMoLi4ubGlicmFyaWVzOiBhbnkpIHtcbiAgICBmb3IgKGNvbnN0IGl0IG9mIGxpYnJhcmllcy5mbGF0KDEpKSB7XG4gICAgICB0aGlzW0xJQlJBUklFU10ucHVzaCh7IFZBTFVFOiBJbnRlcmZhY2VUYXJnZXQuZW5zdXJlSW5zdGFuY2UoaXQpIH0pO1xuICAgIH1cbiAgfVxuXG4gIHB1YmxpYyBhZGRDb21waWxlT3B0aW9ucyguLi5vcHRpb25zOiBzdHJpbmdbXSkge1xuICAgIGZvciAoY29uc3QgaXQgb2Ygb3B0aW9ucy5mbGF0KDEpKSB7XG4gICAgICB0aGlzW0NPTVBJTEVfT1BUSU9OU10ucHVzaCh7IFZBTFVFOiBpdCB9KTtcbiAgICB9XG4gIH1cblxuICBwdWJsaWMgYWRkTGlua09wdGlvbnMoLi4ub3B0aW9uczogc3RyaW5nW10pIHtcbiAgICBmb3IgKGNvbnN0IGl0IG9mIG9wdGlvbnMuZmxhdCgxKSkge1xuICAgICAgdGhpc1tMSU5LX09QVElPTlNdLnB1c2goeyBWQUxVRTogaXQgfSk7XG4gICAgfVxuICB9XG5cbiAgcHVibGljIGdldFNvdXJjZUZpbGVzKC4uLnNvdXJjZXM6IGFueVtdKTogU291cmNlRmlsZUxpc3Qge1xuICAgIGNvbnN0IHJlc3VsdCA9IFtdO1xuICAgIGZvciAoY29uc3QgaXQgb2Ygc291cmNlcy5mbGF0KDEpKSB7XG4gICAgICBjb25zdCBmaWxlbmFtZSA9IHRoaXNbVEFSR0VUX1NDT1BFXS5TT1VSQ0VfRElSLnJlc29sdmUoaXQpLnRvU3RyaW5nKCk7XG4gICAgICBjb25zdCBzcmMgPSB0aGlzW1NPVVJDRVNdLmZpbmQoaSA9PiBpIGluc3RhbmNlb2YgU291cmNlRmlsZSAmJiBpLkZJTEUudG9TdHJpbmcoKSA9PT0gZmlsZW5hbWUpO1xuICAgICAgaWYgKCFzcmMpXG4gICAgICAgIHRocm93IG5ldyBFcnJvcihgQ2Fubm90IGZpbmQgXCIke2l0fVwiYCk7XG4gICAgICByZXN1bHQucHVzaChzcmMpO1xuICAgIH1cbiAgXG4gICAgaWYgKHJlc3VsdC5sZW5ndGgpXG4gICAgICByZXR1cm4gU291cmNlRmlsZUxpc3QuY3JlYXRlKHRoaXNbVEFSR0VUX1NDT1BFXSwgcmVzdWx0KTtcbiAgXG4gICAgcmV0dXJuIFNvdXJjZUZpbGVMaXN0LmNyZWF0ZSh0aGlzW1RBUkdFVF9TQ09QRV0sIHRoaXNbU09VUkNFU10uZmlsdGVyKGkgPT4gaSBpbnN0YW5jZW9mIFNvdXJjZUZpbGUpKTtcbiAgfVxuXG4gIHB1YmxpYyBzZXRQcmVmaXgocHJlZml4OiBzdHJpbmcpIHtcbiAgICB0aGlzW1BSRUZJWF0gPSBwcmVmaXg7XG4gIH1cbiAgXG4gIHB1YmxpYyBzZXRTdWZmaXgoc3VmZml4OiBzdHJpbmcpIHtcbiAgICB0aGlzW1NVRkZJWF0gPSBzdWZmaXg7XG4gIH1cbiAgXG4gIHB1YmxpYyBzZXRPdXRwdXROYW1lKG91dHB1dE5hbWU6IHN0cmluZykge1xuICAgIHRoaXNbT1VUUFVUX05BTUVdID0gb3V0cHV0TmFtZTtcbiAgfVxuICBcbiAgcHVibGljIGFkZERlZmluaXRpb25zKC4uLmRlZmluaXRpb25zOiBhbnlbXSkge1xuICAgIGZvciAoY29uc3QgVkFMVUUgb2Ygbm9ybWFsaXplRGVmaW5pdGlvbnMoLi4uZGVmaW5pdGlvbnMpKVxuICAgICAgdGhpc1tERUZJTkVTXS5wdXNoKHsgVkFMVUUgfSk7XG4gIH1cblxuICBwdWJsaWMgdG9KU09OKCk6IG9iamVjdCB7XG4gICAgcmV0dXJuIHtcbiAgICAgIE5BTUU6IHRoaXMuTkFNRSxcbiAgICAgIFRBUkdFVF9TQ09QRTogdGhpcy5UQVJHRVRfU0NPUEUsXG4gICAgICBPVVRQVVRfTkFNRTogdGhpcy5PVVRQVVRfTkFNRSxcbiAgICAgIENPTVBJTEVfT1BUSU9OUzogdGhpcy5DT01QSUxFX09QVElPTlMsXG4gICAgICBQUkVGSVg6IHRoaXMuUFJFRklYLFxuICAgICAgU1VGRklYOiB0aGlzLlNVRkZJWCxcbiAgICAgIExJTktfT1BUSU9OUzogdGhpcy5MSU5LX09QVElPTlMsXG4gICAgICBJTkNMVURFUzogdGhpcy5JTkNMVURFUyxcbiAgICAgIERFRklORVM6IHRoaXMuREVGSU5FUyxcbiAgICAgIFNPVVJDRVM6IHRoaXMuU09VUkNFUyxcbiAgICAgIExJQlJBUklFUzogdGhpcy5MSUJSQVJJRVMsXG4gICAgICBGSUxFX0RJUjogdGhpcy5GSUxFX0RJUixcbiAgICAgIEZJTEVfTkFNRTogdGhpcy5GSUxFX05BTUUsXG4gICAgICBGSUxFOiB0aGlzLkZJTEUsXG4gICAgfVxuICB9XG59O1xuXG5leHBvcnQgY2xhc3MgQmFzZUxpYnJhcnkgZXh0ZW5kcyBCYXNlVGFyZ2V0IHtcbiAgcHJvdGVjdGVkIGNvbnN0cnVjdG9yKHNjb3BlOiBTeXN0ZW1TY29wZSwgbmFtZTogc3RyaW5nKSB7XG4gICAgc3VwZXIoc2NvcGUsIG5hbWUpO1xuICB9XG5cbiAgcHVibGljIHNldFBvc2l0aW9uSW5kZXBlbmRlbnRDb2RlKHZhbHVlOiBib29sZWFuKSB7XG4gICAgdGhpc1tQT1NJVElPTl9JTkRFUEVOREVOVF9DT0RFXSA9IHZhbHVlO1xuICB9XG5cbiAgcHVibGljIGFkZFB1YmxpY0luY2x1ZGVzKC4uLmluY2x1ZGVzOiBBcnJheTxJbnRlcmZhY2VJbmNsdWRlcyB8IEFic29sdXRlUGF0aCB8IHN0cmluZz4pIHtcbiAgICBmb3IgKGNvbnN0IGl0IG9mIGluY2x1ZGVzLmZsYXQoMSkpIHtcbiAgICAgIGxldCBWQUxVRTtcbiAgICAgIGlmIChpdCBpbnN0YW5jZW9mIEludGVyZmFjZUluY2x1ZGVzKVxuICAgICAgICBWQUxVRSA9IGl0O1xuICAgICAgZWxzZSBpZiAodHlwZW9mIGl0ID09PSBcInN0cmluZ1wiIHx8IEFic29sdXRlUGF0aC5pc0Fic29sdXRlKGl0KSlcbiAgICAgICAgVkFMVUUgPSBJbmNsdWRlRGlyZWN0b3J5LmNyZWF0ZShpdCwgdGhpc1tUQVJHRVRfU0NPUEVdLlNPVVJDRV9ESVIpO1xuICAgICAgZWxzZVxuICAgICAgICB0aHJvdyBuZXcgRXJyb3IoYE5vdCBzdXBwb3J0IGluc3RhbmNlICR7aXR9YCk7XG4gICAgICB0aGlzW0lOQ0xVREVTXS5wdXNoKHtWQUxVRSwgUFVCTElDX09OTFk6IHRydWV9KTsgLy8gSW5jbHVkZURpcmVjdG9yeVtdXG4gICAgfVxuICB9XG5cbiAgcHVibGljIGFkZFB1YmxpY0RlZmluaXRpb25zKC4uLmRlZmluaXRpb25zOiBzdHJpbmdbXSkge1xuICAgIGZvciAoY29uc3QgVkFMVUUgb2YgZGVmaW5pdGlvbnMuZmxhdCgxKSlcbiAgICAgIHRoaXNbREVGSU5FU10ucHVzaCh7IFZBTFVFLCBQVUJMSUNfT05MWTogdHJ1ZSB9KTtcbiAgfVxuXG4gIHB1YmxpYyBhZGRQdWJsaWNMaWJyYXJpZXMoLi4ubGlicmFyaWVzOiBhbnlbXSkge1xuICAgIGZvciAoY29uc3QgaXQgb2YgbGlicmFyaWVzLmZsYXQoMSkpIHtcbiAgICAgIHRoaXNbTElCUkFSSUVTXS5wdXNoKHtWQUxVRTogSW50ZXJmYWNlVGFyZ2V0LmVuc3VyZUluc3RhbmNlKGl0KSwgUFVCTElDX09OTFk6IHRydWV9KTtcbiAgICB9XG4gIH1cblxuICBwdWJsaWMgYWRkUHVibGljQ29tcGlsZU9wdGlvbnMoLi4ub3B0aW9uczogc3RyaW5nW10pIHtcbiAgICBmb3IgKGNvbnN0IGl0IG9mIG9wdGlvbnMuZmxhdCgxKSkge1xuICAgICAgdGhpc1tDT01QSUxFX09QVElPTlNdLnB1c2goeyBWQUxVRTogaXQsIFBVQkxJQ19PTkxZOiB0cnVlIH0pO1xuICAgIH1cbiAgfVxuXG4gIHB1YmxpYyBhZGRQdWJsaWNMaW5rT3B0aW9ucyguLi5vcHRpb25zOiBhbnlbXSkge1xuICAgIGZvciAoY29uc3QgaXQgb2Ygb3B0aW9ucy5mbGF0KDEpKSB7XG4gICAgICB0aGlzW0xJTktfT1BUSU9OU10ucHVzaCh7IFZBTFVFOiBpdCwgUFVCTElDX09OTFk6IHRydWUgfSk7XG4gICAgfVxuICB9XG59O1xuXG5leHBvcnQgY2xhc3MgT2JqZWN0TGlicmFyeSBleHRlbmRzIEJhc2VMaWJyYXJ5IHtcbiAgcHJpdmF0ZSBjb25zdHJ1Y3RvcihzY29wZTogU3lzdGVtU2NvcGUsIG5hbWU6IHN0cmluZykge1xuICAgIHN1cGVyKHNjb3BlLCBuYW1lKTtcbiAgICB0aGlzLlBSRUZJWCA9IHNjb3BlLk9CSkVDVF9MSUJSQVJZX1BSRUZJWDtcbiAgICB0aGlzLlNVRkZJWCA9IHNjb3BlLk9CSkVDVF9MSUJSQVJZX1NVRkZJWDtcbiAgICB0aGlzLkxJTktfT1BUSU9OUy5wdXNoKC4uLihzY29wZSBhcyBhbnkpLk9CSkVDVF9MSU5LRVJfRkxBR1MubWFwKChWQUxVRTogYW55KSA9PiAoeyBWQUxVRSB9KSkpO1xuICB9XG5cbiAgcHVibGljIHN0YXRpYyBjcmVhdGUoc2NvcGU6IFN5c3RlbVNjb3BlLCBuYW1lOiBzdHJpbmcpIHtcbiAgICByZXR1cm4gT2JqZWN0LnNlYWwobmV3IE9iamVjdExpYnJhcnkoc2NvcGUsIG5hbWUpKTtcbiAgfVxufTtcblxuZXhwb3J0IGNsYXNzIFN0YXRpY0xpYnJhcnkgZXh0ZW5kcyBCYXNlTGlicmFyeSB7XG4gIHByaXZhdGUgY29uc3RydWN0b3Ioc2NvcGU6IFN5c3RlbVNjb3BlLCBuYW1lOiBzdHJpbmcpIHtcbiAgICBzdXBlcihzY29wZSwgbmFtZSk7XG4gICAgdGhpcy5QUkVGSVggPSBzY29wZS5TVEFUSUNfTElCUkFSWV9QUkVGSVg7XG4gICAgdGhpcy5TVUZGSVggPSBzY29wZS5TVEFUSUNfTElCUkFSWV9TVUZGSVg7XG4gICAgdGhpcy5MSU5LX09QVElPTlMucHVzaCguLi4oc2NvcGUgYXMgYW55KS5TVEFUSUNfTElOS0VSX0ZMQUdTLm1hcCgoVkFMVUU6IGFueSkgPT4gKHsgVkFMVUUgfSkpKTtcbiAgfVxuXG4gIHB1YmxpYyBzdGF0aWMgY3JlYXRlKHNjb3BlOiBhbnksIG5hbWU6IHN0cmluZykge1xuICAgIHJldHVybiBPYmplY3Quc2VhbChuZXcgU3RhdGljTGlicmFyeShzY29wZSwgbmFtZSkpO1xuICB9XG59O1xuXG5leHBvcnQgY2xhc3MgU2hhcmVkTGlicmFyeSBleHRlbmRzIEJhc2VMaWJyYXJ5IHtcbiAgcHJpdmF0ZSBjb25zdHJ1Y3RvcihzY29wZTogU3lzdGVtU2NvcGUsIG5hbWU6IHN0cmluZykge1xuICAgIHN1cGVyKHNjb3BlLCBuYW1lKTtcbiAgICB0aGlzLlBSRUZJWCA9IHNjb3BlLlNIQVJFRF9MSUJSQVJZX1BSRUZJWDtcbiAgICB0aGlzLlNVRkZJWCA9IHNjb3BlLlNIQVJFRF9MSUJSQVJZX1NVRkZJWDtcbiAgICB0aGlzLkxJTktfT1BUSU9OUy5wdXNoKC4uLihzY29wZSBhcyBhbnkpLlNIQVJFRF9MSU5LRVJfRkxBR1MubWFwKChWQUxVRTogYW55KSA9PiAoeyBWQUxVRSB9KSkpO1xuICB9XG5cbiAgcHVibGljIHN0YXRpYyBjcmVhdGUoc2NvcGU6IGFueSwgbmFtZTogc3RyaW5nKSB7XG4gICAgcmV0dXJuIE9iamVjdC5zZWFsKG5ldyBTaGFyZWRMaWJyYXJ5KHNjb3BlLCBuYW1lKSk7XG4gIH1cbn1cblxuZXhwb3J0IGNsYXNzIEV4ZWN1dGFibGUgZXh0ZW5kcyBCYXNlVGFyZ2V0IHtcbiAgcHJpdmF0ZSBjb25zdHJ1Y3RvcihzY29wZTogU3lzdGVtU2NvcGUsIG5hbWU6IHN0cmluZykge1xuICAgIHN1cGVyKHNjb3BlLCBuYW1lKTtcbiAgICB0aGlzLlNVRkZJWCA9IHNjb3BlLkVYRUNVVEFCTEVfU1VGRklYO1xuICAgIHRoaXMuTElOS19PUFRJT05TLnB1c2goLi4uKHNjb3BlIGFzIGFueSkuRVhFX0xJTktFUl9GTEFHUy5tYXAoKFZBTFVFOiBhbnkpID0+ICh7IFZBTFVFIH0pKSk7XG4gIH1cblxuICBwdWJsaWMgc3RhdGljIGNyZWF0ZShzY29wZTogU3lzdGVtU2NvcGUsIG5hbWU6IHN0cmluZykge1xuICAgIHJldHVybiBPYmplY3Quc2VhbChuZXcgRXhlY3V0YWJsZShzY29wZSwgbmFtZSkpO1xuICB9XG59O1xuIiwiLypcbiAqIE1JVCBMaWNlbnNlXG4gKlxuICogQ29weXJpZ2h0IChjKSAyMDI1ICBZdXJpaSBZYWt1YmluICh5dXJpaS55YWt1YmluQGdtYWlsLmNvbSlcbiAqXG4gKiBQZXJtaXNzaW9uIGlzIGdyYW50ZWQgdG8gdXNlLCBjb3B5LCBtb2RpZnksIGFuZCBkaXN0cmlidXRlIHRoaXMgc29mdHdhcmVcbiAqIHVuZGVyIHRoZSBNSVQgTGljZW5zZS4gU2VlIExJQ0VOU0UgZmlsZSBmb3IgZGV0YWlscy5cbiAqL1xuXG5pbXBvcnQgeyBJbmNsdWRlRGlyZWN0b3J5IH0gZnJvbSBcIkAvY29yZS9JbmNsdWRlRGlyZWN0b3J5XCI7XG5pbXBvcnQgeyBJbnRlcmZhY2VJbmNsdWRlcyB9ZnJvbSBcIkAvY29yZS9JbnRlcmZhY2VJbmNsdWRlc1wiO1xuaW1wb3J0IHsgSW50ZXJmYWNlVGFyZ2V0IH0gZnJvbSBcIkAvY29yZS9JbnRlcmZhY2VUYXJnZXRcIjtcblxuY29uc3QgRU5UUklFUyA9IFN5bWJvbChcIkVOVFJJRVNcIik7XG5cbmZ1bmN0aW9uIGdldEhlYWRlcnModGFyZ2V0OiBhbnkpIHtcbiAgcmV0dXJuIHRhcmdldC5TT1VSQ0VTLmZpbHRlcigoaTogYW55KSA9PiBpLkhFQURFUl9GSUxFX09OTFkpO1xufVxuXG5mdW5jdGlvbiBnZXRJbmNsdWRlcyh0YXJnZXQ6IGFueSkge1xuICByZXR1cm4gdGFyZ2V0LklOQ0xVREVTLm1hcCgoaTogYW55KSA9PiBpLlZBTFVFKTtcbn1cblxuZnVuY3Rpb24gZ2V0UHVibGljSW5jbHVkZXModGFyZ2V0OiBhbnkpIHtcbiAgcmV0dXJuIHRhcmdldC5JTkNMVURFUy5maWx0ZXIoKGk6IGFueSkgPT4gaS5QVUJMSUNfT05MWSkubWFwKChpOiBhbnkpID0+IGkuVkFMVUUpO1xufVxuXG5mdW5jdGlvbiBnZXRMaWJyYXJpZXModGFyZ2V0OiBhbnkpIHtcbiAgcmV0dXJuIHRhcmdldC5MSUJSQVJJRVMubWFwKChpOiBhbnkpID0+IGkuVkFMVUUpO1xufVxuXG5mdW5jdGlvbiBnZXRQdWJsaWNMaWJyYXJpZXModGFyZ2V0OiBhbnkpIHtcbiAgcmV0dXJuIHRhcmdldC5MSUJSQVJJRVMuZmlsdGVyKChpOiBhbnkpID0+IGkuUFVCTElDX09OTFkpLm1hcCgoaTogYW55KSA9PiBpLlZBTFVFKTtcbn1cblxuZnVuY3Rpb24gZ2V0RGVmaW5pdGlvbnModGFyZ2V0OiBhbnkpIHtcbiAgcmV0dXJuIHRhcmdldC5ERUZJTkVTLm1hcCgoaTogYW55KSA9PiBpLlZBTFVFKTtcbn1cblxuZnVuY3Rpb24gZ2V0UHVibGljRGVmaW5pdGlvbnModGFyZ2V0OiBhbnkpIHtcbiAgcmV0dXJuIHRhcmdldC5ERUZJTkVTLmZpbHRlcigoaTogYW55KSA9PiBpLlBVQkxJQ19PTkxZKS5tYXAoKGk6IGFueSkgPT4gaS5WQUxVRSk7XG59XG5cbmZ1bmN0aW9uIGdldENvbXBpbGVPcHRpb25zKHRhcmdldDogYW55KSB7XG4gIHJldHVybiB0YXJnZXQuQ09NUElMRV9PUFRJT05TLm1hcCgoaTogYW55KSA9PiBpLlZBTFVFKTtcbn1cblxuZnVuY3Rpb24gZ2V0UHVibGljQ29tcGlsZU9wdGlvbnModGFyZ2V0OiBhbnkpIHtcbiAgcmV0dXJuIHRhcmdldC5DT01QSUxFX09QVElPTlMuZmlsdGVyKChpOiBhbnkpID0+IGkuUFVCTElDX09OTFkpLm1hcCgoaTogYW55KSA9PiBpLlZBTFVFKTtcbn1cblxuZnVuY3Rpb24gZ2V0TGlua09wdGlvbnModGFyZ2V0OiBhbnkpIHtcbiAgcmV0dXJuIHRhcmdldC5MSU5LX09QVElPTlMubWFwKChpOiBhbnkpID0+IGkuVkFMVUUpO1xufVxuXG5mdW5jdGlvbiBnZXRQdWJsaWNMaW5rT3B0aW9ucyh0YXJnZXQ6IGFueSkge1xuICByZXR1cm4gdGFyZ2V0LkxJTktfT1BUSU9OUy5maWx0ZXIoKGk6IGFueSkgPT4gaS5QVUJMSUNfT05MWSkubWFwKChpOiBhbnkpID0+IGkuVkFMVUUpO1xufVxuXG5leHBvcnQgY2xhc3MgVGFyZ2V0Q29sbGVjdGlvbiB7XG4gIHByaXZhdGUgW0VOVFJJRVNdOiBhbnk7XG5cbiAgcHJpdmF0ZSBjb25zdHJ1Y3RvcigpIHtcbiAgICB0aGlzW0VOVFJJRVNdID0ge307XG4gIH1cblxuICBwdWJsaWMgc3RhdGljIGNyZWF0ZSgpIHtcbiAgICByZXR1cm4gT2JqZWN0LnNlYWwobmV3IFRhcmdldENvbGxlY3Rpb24pO1xuICB9XG4gIFxuICBwdWJsaWMgZ2V0IEVOVFJJRVMoKSB7XG4gICAgcmV0dXJuIHRoaXNbRU5UUklFU107XG4gIH1cblxuICBwdWJsaWMgdG9KU09OKCk6IG9iamVjdCB7XG4gICAgcmV0dXJuIHRoaXNbRU5UUklFU107XG4gIH1cblxuICBwdWJsaWMgZ2V0KG5hbWU6IHN0cmluZyk6IGFueSB7XG4gICAgcmV0dXJuIHRoaXNbRU5UUklFU11bbmFtZV07XG4gIH1cblxuICBwdWJsaWMgc2V0KG5hbWU6IHN0cmluZywgdGFyZ2V0OiBhbnkpIHtcbiAgICBpZiAodGhpc1tFTlRSSUVTXVtuYW1lXSlcbiAgICAgIHRocm93IG5ldyBFcnJvcihgVGFyZ2V0IFwiJHtuYW1lfVwiIGV4aXN0c2ApO1xuICAgIHRoaXNbRU5UUklFU11bbmFtZV0gPSB0YXJnZXQ7XG4gIH1cblxuICBwcml2YXRlIF9fZ2V0QWxsSW5jbHVkZXMoaW5jbHVkZXM6IHN0cmluZ1tdLCB0YXJnZXRTZXQ6IFNldDxzdHJpbmc+LCBsaXN0OiBhbnkpIHtcbiAgICBmb3IgKGNvbnN0IGl0ZXIgb2YgbGlzdCkge1xuICAgICAgaWYgKGl0ZXIgaW5zdGFuY2VvZiBJbnRlcmZhY2VJbmNsdWRlcyB8fCBpdGVyIGluc3RhbmNlb2YgSW50ZXJmYWNlVGFyZ2V0KSB7XG4gICAgICAgIGlmICghdGFyZ2V0U2V0LmhhcyhpdGVyLnRhcmdldE5hbWUpKSB7XG4gICAgICAgICAgdGFyZ2V0U2V0LmFkZChpdGVyLnRhcmdldE5hbWUpO1xuICAgICAgICAgIGNvbnN0IHRhcmdldCA9IHRoaXMuZ2V0KGl0ZXIudGFyZ2V0TmFtZSk7XG4gICAgICAgICAgdGhpcy5fX2dldEFsbEluY2x1ZGVzKGluY2x1ZGVzLCB0YXJnZXRTZXQsIGdldFB1YmxpY0luY2x1ZGVzKHRhcmdldCkpO1xuICAgICAgICAgIHRoaXMuX19nZXRBbGxJbmNsdWRlcyhpbmNsdWRlcywgdGFyZ2V0U2V0LCBnZXRQdWJsaWNMaWJyYXJpZXModGFyZ2V0KSk7XG4gICAgICAgIH1cbiAgICAgIH1cbiAgICAgIGVsc2UgaWYgKGl0ZXIgaW5zdGFuY2VvZiBJbmNsdWRlRGlyZWN0b3J5KSB7XG4gICAgICAgIGlmICghaW5jbHVkZXMuaW5jbHVkZXMoaXRlci50b1N0cmluZygpKSlcbiAgICAgICAgICBpbmNsdWRlcy5wdXNoKGl0ZXIudG9TdHJpbmcoKSk7XG4gICAgICB9XG4gICAgICBlbHNlIHtcbiAgICAgICAgdGhyb3cgbmV3IEVycm9yKGBOb3Qgc3VwcG9ydCBpbnN0YW5jZSAke2l0ZXJ9YCk7XG4gICAgICB9XG4gICAgfVxuICB9XG5cbiAgcHVibGljIGFsbEluY2x1ZGVzT2YocGFyYW1zOiBhbnkpOiBzdHJpbmdbXSB7XG4gICAgY29uc3QgdGFyZ2V0ID0gKHR5cGVvZiBwYXJhbXMgPT09IFwic3RyaW5nXCIpID8gdGhpcy5nZXQocGFyYW1zKSA6IHBhcmFtcztcbiAgICBjb25zdCBpbmNsdWRlczogc3RyaW5nW10gPSBbXTtcbiAgICBjb25zdCB0YXJnZXRTZXQgPSBuZXcgU2V0KFsgdGFyZ2V0Lk5BTUUgXSk7XG4gICAgdGhpcy5fX2dldEFsbEluY2x1ZGVzKGluY2x1ZGVzLCB0YXJnZXRTZXQsIGdldEluY2x1ZGVzKHRhcmdldCkpO1xuICAgIHRoaXMuX19nZXRBbGxJbmNsdWRlcyhpbmNsdWRlcywgdGFyZ2V0U2V0LCBnZXRMaWJyYXJpZXModGFyZ2V0KSk7XG4gICAgcmV0dXJuIGluY2x1ZGVzO1xuICB9XG5cbiAgcHJpdmF0ZSBfX2dldEFsbEhlYWRlcnMoaGVhZGVyczogc3RyaW5nW10sIHRhcmdldFNldDogU2V0PHN0cmluZz4sIGxpc3Q6IGFueSkge1xuICAgIGZvciAoY29uc3QgaXRlciBvZiBsaXN0KSB7XG4gICAgICBpZiAoaXRlciBpbnN0YW5jZW9mIEludGVyZmFjZUluY2x1ZGVzIHx8IGl0ZXIgaW5zdGFuY2VvZiBJbnRlcmZhY2VUYXJnZXQpIHtcbiAgICAgICAgaWYgKCF0YXJnZXRTZXQuaGFzKGl0ZXIudGFyZ2V0TmFtZSkpIHtcbiAgICAgICAgICB0YXJnZXRTZXQuYWRkKGl0ZXIudGFyZ2V0TmFtZSk7XG4gICAgICAgICAgY29uc3QgdGFyZ2V0ID0gdGhpcy5nZXQoaXRlci50YXJnZXROYW1lKTtcbiAgICAgICAgICBmb3IgKGNvbnN0IGhlYWRlciBvZiBnZXRIZWFkZXJzKHRhcmdldCkubWFwKChpOiBhbnkpID0+IGkuRklMRS50b1N0cmluZygpKSkge1xuICAgICAgICAgICAgaWYgKCFoZWFkZXJzLmluY2x1ZGVzKGhlYWRlci50b1N0cmluZygpKSlcbiAgICAgICAgICAgICAgaGVhZGVycy5wdXNoKGhlYWRlci50b1N0cmluZygpKTtcbiAgICAgICAgICB9XG4gICAgICAgICAgdGhpcy5fX2dldEFsbEhlYWRlcnMoaGVhZGVycywgdGFyZ2V0U2V0LCBnZXRQdWJsaWNJbmNsdWRlcyh0YXJnZXQpKTtcbiAgICAgICAgICB0aGlzLl9fZ2V0QWxsSGVhZGVycyhoZWFkZXJzLCB0YXJnZXRTZXQsIGdldFB1YmxpY0xpYnJhcmllcyh0YXJnZXQpKTtcbiAgICAgICAgfVxuICAgICAgfVxuICAgIH1cbiAgfVxuXG4gIHB1YmxpYyBhbGxIZWFkZXJzT2YocGFyYW1zOiBhbnkpIHtcbiAgICBjb25zdCB0YXJnZXQgPSAodHlwZW9mIHBhcmFtcyA9PT0gXCJzdHJpbmdcIikgPyB0aGlzLmdldChwYXJhbXMpIDogcGFyYW1zO1xuICAgIGNvbnN0IGhlYWRlcnMgPSBnZXRIZWFkZXJzKHRhcmdldCkubWFwKChpOiBhbnkpID0+IGkuRklMRS50b1N0cmluZygpKTtcbiAgICBjb25zdCB0YXJnZXRTZXQgPSBuZXcgU2V0KFsgdGFyZ2V0Lk5BTUUgXSk7XG4gICAgdGhpcy5fX2dldEFsbEhlYWRlcnMoaGVhZGVycywgdGFyZ2V0U2V0LCBnZXRJbmNsdWRlcyh0YXJnZXQpKTtcbiAgICB0aGlzLl9fZ2V0QWxsSGVhZGVycyhoZWFkZXJzLCB0YXJnZXRTZXQsIGdldExpYnJhcmllcyh0YXJnZXQpKTtcbiAgICByZXR1cm4gaGVhZGVycztcbiAgfVxuXG4gIHByaXZhdGUgX19nZXRBbGxMaWJyYXJpZXMobGlicmFyaWVzOiBzdHJpbmdbXSwgdGFyZ2V0U2V0OiBTZXQ8c3RyaW5nPiwgbGlzdDogYW55KSB7XG4gICAgZm9yIChjb25zdCBpdGVyIG9mIGxpc3QpIHtcbiAgICAgIGNvbnNvbGUuYXNzZXJ0KGl0ZXIgaW5zdGFuY2VvZiBJbnRlcmZhY2VUYXJnZXQpO1xuICAgICAgaWYgKCF0YXJnZXRTZXQuaGFzKGl0ZXIudGFyZ2V0TmFtZSkpIHtcbiAgICAgICAgdGFyZ2V0U2V0LmFkZChpdGVyLnRhcmdldE5hbWUpO1xuICAgICAgICBjb25zdCB0YXJnZXQgPSB0aGlzLmdldChpdGVyLnRhcmdldE5hbWUpO1xuICAgICAgICBsaWJyYXJpZXMucHVzaCh0YXJnZXQuRklMRS50b1N0cmluZygpKTtcbiAgICAgICAgdGhpcy5fX2dldEFsbExpYnJhcmllcyhsaWJyYXJpZXMsIHRhcmdldFNldCwgZ2V0UHVibGljTGlicmFyaWVzKHRhcmdldCkpO1xuICAgICAgfVxuICAgIH1cbiAgfVxuXG4gIHB1YmxpYyBhbGxMaWJyYXJpZXNPZihwYXJhbXM6IGFueSkge1xuICAgIGNvbnN0IHRhcmdldCA9ICh0eXBlb2YgcGFyYW1zID09PSBcInN0cmluZ1wiKSA/IHRoaXMuZ2V0KHBhcmFtcykgOiBwYXJhbXM7XG4gICAgY29uc3QgbGlicmFyaWVzOiBzdHJpbmdbXSA9IFtdO1xuICAgIGNvbnN0IHRhcmdldFNldCA9IG5ldyBTZXQoWyB0YXJnZXQuTkFNRSBdKTtcbiAgICB0aGlzLl9fZ2V0QWxsTGlicmFyaWVzKGxpYnJhcmllcywgdGFyZ2V0U2V0LCBnZXRMaWJyYXJpZXModGFyZ2V0KSk7XG4gICAgcmV0dXJuIGxpYnJhcmllcztcbiAgfVxuXG4gIHByaXZhdGUgX19nZXRBbGxEZWZpbml0aW9ucyhkZWZpbml0aW9uczogc3RyaW5nW10sIHRhcmdldFNldDogU2V0PHN0cmluZz4sIGxpc3Q6IGFueSkge1xuICAgIGZvciAoY29uc3QgaXRlciBvZiBsaXN0KSB7XG4gICAgICBpZiAoaXRlciBpbnN0YW5jZW9mIEludGVyZmFjZVRhcmdldCkge1xuICAgICAgICBpZiAoIXRhcmdldFNldC5oYXMoaXRlci50YXJnZXROYW1lKSkge1xuICAgICAgICAgIHRhcmdldFNldC5hZGQoaXRlci50YXJnZXROYW1lKTtcbiAgICAgICAgICBjb25zdCB0YXJnZXQgPSB0aGlzLmdldChpdGVyLnRhcmdldE5hbWUpO1xuICAgICAgICAgIHRoaXMuX19nZXRBbGxEZWZpbml0aW9ucyhkZWZpbml0aW9ucywgdGFyZ2V0U2V0LCBnZXRQdWJsaWNEZWZpbml0aW9ucyh0YXJnZXQpKTtcbiAgICAgICAgICB0aGlzLl9fZ2V0QWxsRGVmaW5pdGlvbnMoZGVmaW5pdGlvbnMsIHRhcmdldFNldCwgZ2V0UHVibGljTGlicmFyaWVzKHRhcmdldCkpO1xuICAgICAgICB9XG4gICAgICB9XG4gICAgICBlbHNlIGlmICh0eXBlb2YgaXRlciA9PT0gXCJzdHJpbmdcIikge1xuICAgICAgICBpZiAoIWRlZmluaXRpb25zLmluY2x1ZGVzKGl0ZXIpKVxuICAgICAgICAgIGRlZmluaXRpb25zLnB1c2goaXRlcik7XG4gICAgICB9XG4gICAgICBlbHNlIHtcbiAgICAgICAgdGhyb3cgbmV3IEVycm9yKGBOb3Qgc3VwcG9ydCBpbnN0YW5jZSAke2l0ZXJ9YCk7XG4gICAgICB9XG4gICAgfVxuICB9XG5cbiAgcHVibGljIGFsbERlZmluaXRpb25zT2YocGFyYW1zOiBhbnkpIHtcbiAgICBjb25zdCB0YXJnZXQgPSAodHlwZW9mIHBhcmFtcyA9PT0gXCJzdHJpbmdcIikgPyB0aGlzLmdldChwYXJhbXMpIDogcGFyYW1zO1xuICAgIGNvbnN0IGRlZmluaXRpb25zOiBzdHJpbmdbXSA9IFtdO1xuICAgIGNvbnN0IHRhcmdldFNldCA9IG5ldyBTZXQoWyB0YXJnZXQuTkFNRSBdKTtcbiAgICB0aGlzLl9fZ2V0QWxsRGVmaW5pdGlvbnMoZGVmaW5pdGlvbnMsIHRhcmdldFNldCwgZ2V0RGVmaW5pdGlvbnModGFyZ2V0KSk7XG4gICAgdGhpcy5fX2dldEFsbERlZmluaXRpb25zKGRlZmluaXRpb25zLCB0YXJnZXRTZXQsIGdldFB1YmxpY0xpYnJhcmllcyh0YXJnZXQpKTtcbiAgICByZXR1cm4gZGVmaW5pdGlvbnM7XG4gIH1cblxuICBwcml2YXRlIF9fZ2V0QWxsQ29tcGlsZU9wdGlvbnMob3B0aW9uczogQXJyYXk8c3RyaW5nfHN0cmluZ1tdPiwgdGFyZ2V0U2V0OiBTZXQ8c3RyaW5nPiwgbGlzdDogYW55KSB7XG4gICAgZm9yIChjb25zdCBpdGVyIG9mIGxpc3QpIHtcbiAgICAgIGlmIChpdGVyIGluc3RhbmNlb2YgSW50ZXJmYWNlVGFyZ2V0KSB7XG4gICAgICAgIGlmICghdGFyZ2V0U2V0LmhhcyhpdGVyLnRhcmdldE5hbWUpKSB7XG4gICAgICAgICAgdGFyZ2V0U2V0LmFkZChpdGVyLnRhcmdldE5hbWUpO1xuICAgICAgICAgIGNvbnN0IHRhcmdldCA9IHRoaXMuZ2V0KGl0ZXIudGFyZ2V0TmFtZSk7XG4gICAgICAgICAgdGhpcy5fX2dldEFsbENvbXBpbGVPcHRpb25zKG9wdGlvbnMsIHRhcmdldFNldCwgZ2V0UHVibGljQ29tcGlsZU9wdGlvbnModGFyZ2V0KSk7XG4gICAgICAgICAgdGhpcy5fX2dldEFsbENvbXBpbGVPcHRpb25zKG9wdGlvbnMsIHRhcmdldFNldCwgZ2V0UHVibGljTGlicmFyaWVzKHRhcmdldCkpO1xuICAgICAgICB9XG4gICAgICB9XG4gICAgICBlbHNlIGlmICh0eXBlb2YgaXRlciA9PT0gXCJzdHJpbmdcIikge1xuICAgICAgICBpZiAoIW9wdGlvbnMuaW5jbHVkZXMoaXRlcikpXG4gICAgICAgICAgb3B0aW9ucy5wdXNoKGl0ZXIpO1xuICAgICAgfVxuICAgICAgZWxzZSBpZiAoQXJyYXkuaXNBcnJheShpdGVyKSkge1xuICAgICAgICAvLyBUT0RPOiBBZGQgY29tcGFyZSBmb3Igc2FtZSBhcnJheSBpbiBvcHRpb25zXG4gICAgICAgIG9wdGlvbnMucHVzaChpdGVyKTtcbiAgICAgIH1cbiAgICAgIGVsc2Uge1xuICAgICAgICB0aHJvdyBuZXcgRXJyb3IoYE5vdCBzdXBwb3J0IGluc3RhbmNlICR7aXRlcn1gKTtcbiAgICAgIH1cbiAgICB9XG4gIH1cblxuICBwdWJsaWMgYWxsQ29tcGlsZU9wdGlvbnNPZihwYXJhbXM6IGFueSkge1xuICAgIGNvbnN0IHRhcmdldCA9ICh0eXBlb2YgcGFyYW1zID09PSBcInN0cmluZ1wiKSA/IHRoaXMuZ2V0KHBhcmFtcykgOiBwYXJhbXM7XG4gICAgY29uc3Qgb3B0aW9uczogc3RyaW5nW10gPSBbXTtcbiAgICBjb25zdCB0YXJnZXRTZXQgPSBuZXcgU2V0KFsgdGFyZ2V0Lk5BTUUgXSk7XG4gICAgdGhpcy5fX2dldEFsbENvbXBpbGVPcHRpb25zKG9wdGlvbnMsIHRhcmdldFNldCwgZ2V0Q29tcGlsZU9wdGlvbnModGFyZ2V0KSk7XG4gICAgdGhpcy5fX2dldEFsbENvbXBpbGVPcHRpb25zKG9wdGlvbnMsIHRhcmdldFNldCwgZ2V0UHVibGljTGlicmFyaWVzKHRhcmdldCkpO1xuICAgIHJldHVybiBvcHRpb25zLmZsYXQoKTtcbiAgfVxuXG4gIHByaXZhdGUgX19nZXRMaW5rT3B0aW9ucyhvcHRpb25zOiBBcnJheTxzdHJpbmd8c3RyaW5nW10+LCB0YXJnZXRTZXQ6IFNldDxzdHJpbmc+LCBsaXN0OiBhbnkpIHtcbiAgICBmb3IgKGNvbnN0IGl0ZXIgb2YgbGlzdCkge1xuICAgICAgaWYgKGl0ZXIgaW5zdGFuY2VvZiBJbnRlcmZhY2VUYXJnZXQpIHtcbiAgICAgICAgaWYgKCF0YXJnZXRTZXQuaGFzKGl0ZXIudGFyZ2V0TmFtZSkpIHtcbiAgICAgICAgICB0YXJnZXRTZXQuYWRkKGl0ZXIudGFyZ2V0TmFtZSk7XG4gICAgICAgICAgY29uc3QgdGFyZ2V0ID0gdGhpcy5nZXQoaXRlci50YXJnZXROYW1lKTtcbiAgICAgICAgICB0aGlzLl9fZ2V0TGlua09wdGlvbnMob3B0aW9ucywgdGFyZ2V0U2V0LCBnZXRQdWJsaWNMaW5rT3B0aW9ucyh0YXJnZXQpKTtcbiAgICAgICAgICB0aGlzLl9fZ2V0TGlua09wdGlvbnMob3B0aW9ucywgdGFyZ2V0U2V0LCBnZXRQdWJsaWNMaWJyYXJpZXModGFyZ2V0KSk7XG4gICAgICAgIH1cbiAgICAgIH1cbiAgICAgIGVsc2UgaWYgKHR5cGVvZiBpdGVyID09PSBcInN0cmluZ1wiKSB7XG4gICAgICAgIGlmICghb3B0aW9ucy5pbmNsdWRlcyhpdGVyKSlcbiAgICAgICAgICBvcHRpb25zLnB1c2goaXRlcik7XG4gICAgICB9XG4gICAgICBlbHNlIGlmIChBcnJheS5pc0FycmF5KGl0ZXIpKSB7XG4gICAgICAgIC8vIFRPRE86IEFkZCBjb21wYXJlIGZvciBzYW1lIGFycmF5IGluIG9wdGlvbnNcbiAgICAgICAgb3B0aW9ucy5wdXNoKGl0ZXIpO1xuICAgICAgfVxuICAgICAgZWxzZSB7XG4gICAgICAgIHRocm93IG5ldyBFcnJvcihgTm90IHN1cHBvcnQgaW5zdGFuY2UgJHtpdGVyfWApO1xuICAgICAgfVxuICAgIH1cbiAgfVxuXG4gIHB1YmxpYyBhbGxMaW5rT3B0aW9uc09mKHBhcmFtczogYW55KSB7XG4gICAgY29uc3QgdGFyZ2V0ID0gKHR5cGVvZiBwYXJhbXMgPT09IFwic3RyaW5nXCIpID8gdGhpcy5nZXQocGFyYW1zKSA6IHBhcmFtcztcbiAgICBjb25zdCBvcHRpb25zOiBzdHJpbmdbXSA9IFtdO1xuICAgIGNvbnN0IHRhcmdldFNldCA9IG5ldyBTZXQoWyB0YXJnZXQuTkFNRSBdKTtcbiAgICB0aGlzLl9fZ2V0TGlua09wdGlvbnMob3B0aW9ucywgdGFyZ2V0U2V0LCBnZXRMaW5rT3B0aW9ucyh0YXJnZXQpKTtcbiAgICB0aGlzLl9fZ2V0TGlua09wdGlvbnMob3B0aW9ucywgdGFyZ2V0U2V0LCBnZXRQdWJsaWNMaWJyYXJpZXModGFyZ2V0KSk7XG4gICAgcmV0dXJuIG9wdGlvbnMuZmxhdCgpO1xuICB9XG59XG4iLCIvKlxuICogTUlUIExpY2Vuc2VcbiAqXG4gKiBDb3B5cmlnaHQgKGMpIDIwMjUgIFl1cmlpIFlha3ViaW4gKHl1cmlpLnlha3ViaW5AZ21haWwuY29tKVxuICpcbiAqIFBlcm1pc3Npb24gaXMgZ3JhbnRlZCB0byB1c2UsIGNvcHksIG1vZGlmeSwgYW5kIGRpc3RyaWJ1dGUgdGhpcyBzb2Z0d2FyZVxuICogdW5kZXIgdGhlIE1JVCBMaWNlbnNlLiBTZWUgTElDRU5TRSBmaWxlIGZvciBkZXRhaWxzLlxuICovXG5cbmltcG9ydCB7IEdsb2JhbENvbnRleHQgfSBmcm9tIFwiQC9jb3JlL0dsb2JhbENvbnRleHRcIjtcbmltcG9ydCB7IFN5c3RlbVNjb3BlIH0gZnJvbSBcIkAvY29yZS9TeXN0ZW1TY29wZVwiO1xuaW1wb3J0IHsgZmluZFByb2dyYW1TeW5jIH0gZnJvbSBcIkAvY29yZS9GaW5kUHJvZ3JhbVwiO1xuXG5jb25zdCBHTE9CQUwgPSBTeW1ib2woXCJHTE9CQUxcIik7XG5jb25zdCBTQ09QRSA9IFN5bWJvbChcIlNDT1BFXCIpO1xuXG5leHBvcnQgbmFtZXNwYWNlIFRvb2xjaGFpbkNvbnRleHQge1xuXG5pbnRlcmZhY2UgSVRvb2xjaGFpbkNvbnRleHQgZXh0ZW5kcyBTeXN0ZW1TY29wZSB7XG4gIGZpbmRQcm9ncmFtKG5hbWU6IHN0cmluZyk6IHN0cmluZyB8IHVuZGVmaW5lZDtcbn07XG5cbmV4cG9ydCBmdW5jdGlvbiBjcmVhdGUoc2NvcGU6IFN5c3RlbVNjb3BlLCBnbG9iYWw6IEdsb2JhbENvbnRleHQpOiBJVG9vbGNoYWluQ29udGV4dCB7XG4gIGNvbnN0IG1rID0gT2JqZWN0LmNyZWF0ZShzY29wZSwge1xuICAgIGZpbmRQcm9ncmFtOiB7XG4gICAgICB2YWx1ZTogZmluZFByb2dyYW1TeW5jLFxuICAgICAgZW51bWVyYWJsZTogZmFsc2UsXG4gICAgICB3cml0YWJsZTogZmFsc2UsXG4gICAgICBjb25maWd1cmFibGU6IGZhbHNlLFxuICAgIH0sXG4gIH0pO1xuXG4gIG1rW1NDT1BFXSA9IHNjb3BlO1xuICBta1tHTE9CQUxdID0gZ2xvYmFsO1xuXG4gIHJldHVybiBtaztcbn1cblxufSAvLyBuYW1lc3BhY2UgVG9vbGNoYWluQ29udGV4dFxuIiwiLypcbiAqIE1JVCBMaWNlbnNlXG4gKlxuICogQ29weXJpZ2h0IChjKSAyMDI1ICBZdXJpaSBZYWt1YmluICh5dXJpaS55YWt1YmluQGdtYWlsLmNvbSlcbiAqXG4gKiBQZXJtaXNzaW9uIGlzIGdyYW50ZWQgdG8gdXNlLCBjb3B5LCBtb2RpZnksIGFuZCBkaXN0cmlidXRlIHRoaXMgc29mdHdhcmVcbiAqIHVuZGVyIHRoZSBNSVQgTGljZW5zZS4gU2VlIExJQ0VOU0UgZmlsZSBmb3IgZGV0YWlscy5cbiAqL1xuXG5leHBvcnQgY29uc3QgREVCVUdfQlVJTERfVFlQRSA9IFwiRGVidWdcIjtcbmV4cG9ydCBjb25zdCBSRUxFQVNFX0JVSUxEX1RZUEUgPSBcIlJlbGVhc2VcIjtcbiIsIi8qXG4gKiBNSVQgTGljZW5zZVxuICpcbiAqIENvcHlyaWdodCAoYykgMjAyNSAgWXVyaWkgWWFrdWJpbiAoeXVyaWkueWFrdWJpbkBnbWFpbC5jb20pXG4gKlxuICogUGVybWlzc2lvbiBpcyBncmFudGVkIHRvIHVzZSwgY29weSwgbW9kaWZ5LCBhbmQgZGlzdHJpYnV0ZSB0aGlzIHNvZnR3YXJlXG4gKiB1bmRlciB0aGUgTUlUIExpY2Vuc2UuIFNlZSBMSUNFTlNFIGZpbGUgZm9yIGRldGFpbHMuXG4gKi9cblxuY29uc3QgTkFNRSA9IFN5bWJvbChcIk5BTUVcIik7XG5jb25zdCBJTkNMVURFUyA9IFN5bWJvbChcIklOQ0xVREVTXCIpO1xuY29uc3QgU09VUkNFUyA9IFN5bWJvbChcIlNPVVJDRVNcIik7XG5jb25zdCBERUZJTkVTID0gU3ltYm9sKFwiREVGSU5FU1wiKTtcbmNvbnN0IENPTVBJTEVfT1BUSU9OUyA9IFN5bWJvbChcIkNPTVBJTEVfT1BUSU9OU1wiKTtcbmNvbnN0IExJTktfT1BUSU9OUyA9IFN5bWJvbChcIkxJTktfT1BUSU9OU1wiKTtcblxuZXhwb3J0IGNsYXNzIFVua25vd25UYXJnZXQge1xuICBwcml2YXRlIFtOQU1FXTogc3RyaW5nO1xuICBwcml2YXRlIFtJTkNMVURFU106IGFueVtdO1xuICBwcml2YXRlIFtTT1VSQ0VTXTogYW55W107XG4gIHByaXZhdGUgW0RFRklORVNdOiBhbnlbXTtcbiAgcHJpdmF0ZSBbQ09NUElMRV9PUFRJT05TXTogYW55W107XG4gIHByaXZhdGUgW0xJTktfT1BUSU9OU106IGFueVtdO1xuXG4gIHByaXZhdGUgY29uc3RydWN0b3IobmFtZTogc3RyaW5nKSB7XG4gICAgdGhpc1tOQU1FXSA9IG5hbWU7XG4gICAgdGhpc1tJTkNMVURFU10gPSBbXTtcbiAgICB0aGlzW1NPVVJDRVNdID0gW107XG4gICAgdGhpc1tERUZJTkVTXSA9IFtdO1xuICAgIHRoaXNbQ09NUElMRV9PUFRJT05TXSA9IFtdO1xuICAgIHRoaXNbTElOS19PUFRJT05TXSA9IFtdO1xuICB9XG5cbiAgcHVibGljIHN0YXRpYyBjcmVhdGUobmFtZTogc3RyaW5nKSB7XG4gICAgcmV0dXJuIE9iamVjdC5zZWFsKG5ldyBVbmtub3duVGFyZ2V0KG5hbWUpKTtcbiAgfVxuXG4gIHB1YmxpYyBzdGF0aWMgZW5zdXJlSW5zdGFuY2UodmFsdWU6IGFueSkge1xuICAgIGlmICh2YWx1ZSBpbnN0YW5jZW9mIFVua25vd25UYXJnZXQpXG4gICAgICByZXR1cm4gdmFsdWU7XG4gICAgdGhyb3cgbmV3IEVycm9yKGBUaGUgJyR7dmFsdWV9JyBpcyBub3QgYSBVbmtub3duVGFyZ2V0YCk7XG4gIH1cblxuICBwdWJsaWMgZ2V0IE5BTUUgKCkge1xuICAgIHJldHVybiB0aGlzW05BTUVdO1xuICB9XG5cbiAgcHVibGljIGdldCBJTkNMVURFUyAoKSB7XG4gICAgcmV0dXJuIHRoaXNbSU5DTFVERVNdO1xuICB9XG5cbiAgcHVibGljIGdldCBTT1VSQ0VTICgpIHtcbiAgICByZXR1cm4gdGhpc1tTT1VSQ0VTXTtcbiAgfVxuXG4gIHB1YmxpYyBnZXQgREVGSU5FUyAoKSB7XG4gICAgcmV0dXJuIHRoaXNbREVGSU5FU107XG4gIH1cblxuICBwdWJsaWMgZ2V0IENPTVBJTEVfT1BUSU9OUyAoKSB7XG4gICAgcmV0dXJuIHRoaXNbQ09NUElMRV9PUFRJT05TXTtcbiAgfVxuXG4gIHB1YmxpYyBnZXQgTElOS19PUFRJT05TICgpIHtcbiAgICByZXR1cm4gdGhpc1tMSU5LX09QVElPTlNdO1xuICB9XG5cbiAgcHVibGljIHRvSlNPTigpOiBvYmplY3Qge1xuICAgIHJldHVybiB7XG4gICAgICBOQU1FOiB0aGlzLk5BTUUsXG4gICAgICBJTkNMVURFUzogdGhpcy5JTkNMVURFUyxcbiAgICAgIFNPVVJDRVM6IHRoaXMuU09VUkNFUyxcbiAgICAgIERFRklORVM6IHRoaXMuREVGSU5FUyxcbiAgICAgIENPTVBJTEVfT1BUSU9OUzogdGhpcy5DT01QSUxFX09QVElPTlMsXG4gICAgICBMSU5LX09QVElPTlM6IHRoaXMuTElOS19PUFRJT05TLFxuICAgIH07XG4gIH1cblxuICBwdWJsaWMgdG9TdHJpbmcoKTogc3RyaW5nIHtcbiAgICByZXR1cm4gXCIke1wiICsgdGhpc1tOQU1FXSArIFwifVwiO1xuICB9XG59O1xuIiwiLypcbiAqIE1JVCBMaWNlbnNlXG4gKlxuICogQ29weXJpZ2h0IChjKSAyMDI1ICBZdXJpaSBZYWt1YmluICh5dXJpaS55YWt1YmluQGdtYWlsLmNvbSlcbiAqXG4gKiBQZXJtaXNzaW9uIGlzIGdyYW50ZWQgdG8gdXNlLCBjb3B5LCBtb2RpZnksIGFuZCBkaXN0cmlidXRlIHRoaXMgc29mdHdhcmVcbiAqIHVuZGVyIHRoZSBNSVQgTGljZW5zZS4gU2VlIExJQ0VOU0UgZmlsZSBmb3IgZGV0YWlscy5cbiAqL1xuXG5pbXBvcnQgcGF0aCBmcm9tIFwibm9kZTpwYXRoXCI7XG5cbmV4cG9ydCBmdW5jdGlvbiBmaWxlbmFtZVRvUHJhZ21hT25jZU1hY3JvKGZpbGVwYXRoOiBzdHJpbmcsIGRlZXA6IG51bWJlcikge1xuICBpZiAodHlwZW9mIGRlZXAgPT09ICd1bmRlZmluZWQnKVxuICAgIGRlZXAgPSAzO1xuXG4gIGxldCBjb21wb25lbnRzID0gcGF0aC5ub3JtYWxpemUoZmlsZXBhdGgpLnNwbGl0KHBhdGguc2VwKTtcbiAgaWYgKGNvbXBvbmVudHMubGVuZ3RoID4gZGVlcClcbiAgICBjb21wb25lbnRzID0gY29tcG9uZW50cy5zbGljZShjb21wb25lbnRzLmxlbmd0aCAtIGRlZXApO1xuXG4gIHJldHVybiBcIl9cIiArIGNvbXBvbmVudHMuam9pbignXycpLnJlcGxhY2UoL1stIC46JX5dL2csICdfJykudG9VcHBlckNhc2UoKTtcbn1cblxuZXhwb3J0IGZ1bmN0aW9uIGxpbmVUb1NpbmdsQ29tbWVudChsaW5lOiBzdHJpbmcpIHtcbiAgcmV0dXJuIFwiLy9cIiArIGxpbmU7XG59XG5cbmV4cG9ydCBmdW5jdGlvbiBsaW5lVG9NdWx0aXBsZUNvbW1lbnQobGluZTogc3RyaW5nKSB7XG4gIHJldHVybiBgLyogJHtsaW5lfSAqL2A7XG59XG5cbmV4cG9ydCBmdW5jdGlvbiBnZW5lcmF0ZWRTY3JpcHROYW1lQ29tbWVudChmaWxlbmFtZTogc3RyaW5nKSB7XG4gIHJldHVybiBsaW5lVG9NdWx0aXBsZUNvbW1lbnQoXCJHZW5lcmF0ZWQgZnJvbSBcIiArIHBhdGguYmFzZW5hbWUoZmlsZW5hbWUpKTtcbn1cbiIsIi8qXG4gKiBNSVQgTGljZW5zZVxuICpcbiAqIENvcHlyaWdodCAoYykgMjAyNSAgWXVyaWkgWWFrdWJpbiAoeXVyaWkueWFrdWJpbkBnbWFpbC5jb20pXG4gKlxuICogUGVybWlzc2lvbiBpcyBncmFudGVkIHRvIHVzZSwgY29weSwgbW9kaWZ5LCBhbmQgZGlzdHJpYnV0ZSB0aGlzIHNvZnR3YXJlXG4gKiB1bmRlciB0aGUgTUlUIExpY2Vuc2UuIFNlZSBMSUNFTlNFIGZpbGUgZm9yIGRldGFpbHMuXG4gKi9cblxuZXhwb3J0IGludGVyZmFjZSBJTG9nZ2VyIHtcbiAgdHJhY2UobWVzc2FnZT86IGFueSwgLi4ucGFyYW1zOiBhbnlbXSk6IHZvaWQ7XG4gIGRlYnVnKG1lc3NhZ2U/OiBhbnksIC4uLnBhcmFtczogYW55W10pOiB2b2lkO1xuICBpbmZvKG1lc3NhZ2U/OiBhbnksIC4uLnBhcmFtczogYW55W10pOiB2b2lkO1xuICB3YXJuKG1lc3NhZ2U/OiBhbnksIC4uLnBhcmFtczogYW55W10pOiB2b2lkO1xuICBlcnJvcihtZXNzYWdlPzogYW55LCAuLi5wYXJhbXM6IGFueVtdKTogdm9pZDtcbn07XG5cbmV4cG9ydCBmdW5jdGlvbiBjcmVhdGVMb2dnZXIodXJsOiBzdHJpbmcpOiBJTG9nZ2VyIHtcbiAgcmV0dXJuIHtcbiAgICB0cmFjZTogY29uc29sZS50cmFjZS5iaW5kKGNvbnNvbGUpLFxuICAgIGRlYnVnOiBjb25zb2xlLmRlYnVnLmJpbmQoY29uc29sZSksXG4gICAgaW5mbzogY29uc29sZS5pbmZvLmJpbmQoY29uc29sZSksXG4gICAgd2FybjogY29uc29sZS53YXJuLmJpbmQoY29uc29sZSksXG4gICAgZXJyb3I6IGNvbnNvbGUuZXJyb3IuYmluZChjb25zb2xlKSxcbiAgfTtcbn1cbiIsIi8qXG4gKiBNSVQgTGljZW5zZVxuICpcbiAqIENvcHlyaWdodCAoYykgMjAyNSAgWXVyaWkgWWFrdWJpbiAoeXVyaWkueWFrdWJpbkBnbWFpbC5jb20pXG4gKlxuICogUGVybWlzc2lvbiBpcyBncmFudGVkIHRvIHVzZSwgY29weSwgbW9kaWZ5LCBhbmQgZGlzdHJpYnV0ZSB0aGlzIHNvZnR3YXJlXG4gKiB1bmRlciB0aGUgTUlUIExpY2Vuc2UuIFNlZSBMSUNFTlNFIGZpbGUgZm9yIGRldGFpbHMuXG4gKi9cblxuaW1wb3J0IHBhdGggZnJvbSBcIm5vZGU6cGF0aFwiO1xuaW1wb3J0IGZzIGZyb20gXCJub2RlOmZzXCI7XG5pbXBvcnQgeyBzcGF3biB9IGZyb20gXCJub2RlOmNoaWxkX3Byb2Nlc3NcIjtcblxudHlwZSBSZXN1bHQgPSB7XG4gIHN0YXR1czogbnVtYmVyO1xufTtcblxuZXhwb3J0IGZ1bmN0aW9uIHNwYXduQXN5bmMoY29tbWFuZDogc3RyaW5nLCBhcmdzOiBzdHJpbmdbXSwgb3B0aW9ucz86IGFueSk6IFByb21pc2U8UmVzdWx0PiB7XG4gIGxldCBmZCA9IG51bGw7XG4gIGxldCB2ZXJib3NlID0gZmFsc2U7XG4gIGlmIChvcHRpb25zICYmIG9wdGlvbnMuZXh0cmEpIHtcbiAgICBpZiAob3B0aW9ucy5leHRyYS52ZXJib3NlKVxuICAgICAgdmVyYm9zZSA9IHRydWU7XG4gICAgaWYgKG9wdGlvbnMuZXh0cmEub3V0cHV0KSB7XG4gICAgICBsZXQgbG9nZmlsZSA9IG9wdGlvbnMuZXh0cmEub3V0cHV0O1xuICAgICAgaWYgKCFwYXRoLmlzQWJzb2x1dGUobG9nZmlsZSkgJiYgb3B0aW9ucy5jd2QpIHtcbiAgICAgICAgbG9nZmlsZSA9IHBhdGgucmVzb2x2ZShvcHRpb25zLmN3ZCwgbG9nZmlsZSk7XG4gICAgICB9XG4gICAgICBmZCA9IGZzLm9wZW5TeW5jKGxvZ2ZpbGUsIFwidytcIiwgMG82NjYpO1xuICAgIH1cbiAgfVxuICByZXR1cm4gbmV3IFByb21pc2UoKHJlc29sdmUsIHJlamVjdCkgPT4ge1xuICAgIGlmIChmZCB8fCB2ZXJib3NlKSB7XG4gICAgICB2ZXJib3NlICYmIGNvbnNvbGUuaW5mbyhbIHBhdGguYmFzZW5hbWUoY29tbWFuZCksIC4uLmFyZ3MgXS5qb2luKFwiIFwiKSk7XG4gICAgICBmZCAmJiBmcy53cml0ZVN5bmMoZmQsIEpTT04uc3RyaW5naWZ5KHtjb21tYW5kLCBhcmdzLCBvcHRpb25zIH0sIG51bGwsIDIpICsgXCJcXG5cIik7XG4gICAgfVxuICAgIGNvbnN0IGV4ZWMgPSBzcGF3bihjb21tYW5kLCBhcmdzLCBvcHRpb25zKTtcbiAgICBleGVjLnN0ZG91dC5vbihcImRhdGFcIiwgKGRhdGEpID0+IHtcbiAgICAgIHByb2Nlc3Muc3Rkb3V0LndyaXRlKGRhdGEpO1xuICAgICAgZmQgJiYgZnMud3JpdGVTeW5jKGZkLCBkYXRhKTtcbiAgICB9KTtcbiAgICBleGVjLnN0ZGVyci5vbihcImRhdGFcIiwgKGRhdGEpID0+IHtcbiAgICAgIHByb2Nlc3Muc3RkZXJyLndyaXRlKGRhdGEpO1xuICAgICAgZmQgJiYgZnMud3JpdGVTeW5jKGZkLCBkYXRhKTtcbiAgICB9KTtcbiAgICBleGVjLm9uKFwiY2xvc2VcIiwgKHN0YXR1czogbnVtYmVyKSA9PiB7XG4gICAgICBmZCAmJiBmcy5jbG9zZVN5bmMoZmQpO1xuICAgICAgcmVzb2x2ZSh7c3RhdHVzfSk7XG4gICAgfSk7XG4gIH0pO1xufVxuIiwiLypcbiAqIE1JVCBMaWNlbnNlXG4gKlxuICogQ29weXJpZ2h0IChjKSAyMDI1ICBZdXJpaSBZYWt1YmluICh5dXJpaS55YWt1YmluQGdtYWlsLmNvbSlcbiAqXG4gKiBQZXJtaXNzaW9uIGlzIGdyYW50ZWQgdG8gdXNlLCBjb3B5LCBtb2RpZnksIGFuZCBkaXN0cmlidXRlIHRoaXMgc29mdHdhcmVcbiAqIHVuZGVyIHRoZSBNSVQgTGljZW5zZS4gU2VlIExJQ0VOU0UgZmlsZSBmb3IgZGV0YWlscy5cbiAqL1xuXG5pbXBvcnQgZnMgZnJvbSBcIm5vZGU6ZnNcIjtcbmltcG9ydCBwYXRoIGZyb20gXCJub2RlOnBhdGhcIjtcbmltcG9ydCB1cmwgZnJvbSBcIm5vZGU6dXJsXCI7XG5cbmV4cG9ydCBhc3luYyBmdW5jdGlvbiBwYXRoRXhpc3RzKHBhdGg6IHN0cmluZykge1xuICB0cnkge1xuICAgIHJldHVybiAhIShhd2FpdCBmcy5wcm9taXNlcy5zdGF0KHBhdGgpKTtcbiAgfSBjYXRjaCB7XG4gICAgcmV0dXJuIGZhbHNlO1xuICB9XG59XG5cbmV4cG9ydCBmdW5jdGlvbiBwYXRoRXhpc3RzU3luYyhwYXRoOiBzdHJpbmcpIHtcbiAgdHJ5IHtcbiAgICByZXR1cm4gISFmcy5zdGF0U3luYyhwYXRoKTtcbiAgfSBjYXRjaCB7XG4gICAgcmV0dXJuIGZhbHNlO1xuICB9XG59XG5cbmV4cG9ydCBhc3luYyBmdW5jdGlvbiBmaWxlRXhpc3RzKHBhdGg6IHN0cmluZykge1xuICB0cnkge1xuICAgIHJldHVybiAoYXdhaXQgZnMucHJvbWlzZXMuc3RhdChwYXRoKSkuaXNGaWxlKCk7XG4gIH0gY2F0Y2gge1xuICAgIHJldHVybiBmYWxzZTtcbiAgfVxufVxuXG5leHBvcnQgZnVuY3Rpb24gZmlsZUV4aXN0c1N5bmMocGF0aDogc3RyaW5nKSB7XG4gIHRyeSB7XG4gICAgcmV0dXJuIGZzLnN0YXRTeW5jKHBhdGgpLmlzRmlsZSgpO1xuICB9IGNhdGNoIHtcbiAgICByZXR1cm4gZmFsc2U7XG4gIH0gXG59XG5cbmV4cG9ydCBhc3luYyBmdW5jdGlvbiBkaXJlY3RvcnlFeGlzdHMocGF0aDogc3RyaW5nKSB7XG4gIHRyeSB7XG4gICAgcmV0dXJuIChhd2FpdCBmcy5wcm9taXNlcy5zdGF0KHBhdGgpKS5pc0RpcmVjdG9yeSgpO1xuICB9IGNhdGNoIHtcbiAgICByZXR1cm4gZmFsc2U7XG4gIH1cbn1cblxuZXhwb3J0IGZ1bmN0aW9uIGRpcmVjdG9yeUV4aXN0c1N5bmMocGF0aDogc3RyaW5nKSB7XG4gIHRyeSB7XG4gICByZXR1cm4gZnMuc3RhdFN5bmMocGF0aCkuaXNEaXJlY3RvcnkoKTtcbiAgfSBjYXRjaCB7XG4gICAgcmV0dXJuIGZhbHNlO1xuICB9XG59XG5cbmV4cG9ydCBmdW5jdGlvbiBleHRuYW1lKGZ1bGxwYXRoOiBzdHJpbmcsIG9wdGlvbnM6IGFueSkge1xuICBpZiAob3B0aW9ucz8ubG9uZ2VzdCkge1xuICAgIGNvbnN0IGZpbGVuYW1lID0gcGF0aC5iYXNlbmFtZShmdWxscGF0aCk7XG4gICAgY29uc3QgaW5kZXggPSBmaWxlbmFtZS5pbmRleE9mKCcuJyk7XG4gICAgcmV0dXJuIGluZGV4ICE9IC0xID8gZmlsZW5hbWUuc3Vic3RyaW5nKGluZGV4KSA6ICcnO1xuICB9XG5cbiAgcmV0dXJuIHBhdGguZXh0bmFtZShmdWxscGF0aCk7XG59XG5cbmV4cG9ydCBhc3luYyBmdW5jdGlvbiBmaWxlTGlzdChkaXJuYW1lOiBzdHJpbmcsIG9wdGlvbnM6IGFueSk6IFByb21pc2U8QXJyYXk8c3RyaW5nPj4ge1xuICBjb25zdCBsaXN0ID0gbmV3IEFycmF5PHN0cmluZz47XG4gIGlmIChhd2FpdCBkaXJlY3RvcnlFeGlzdHMoZGlybmFtZSkpIHtcbiAgICBmb3IgKGNvbnN0IGl0ZXIgb2YgYXdhaXQgZnMucHJvbWlzZXMucmVhZGRpcihkaXJuYW1lKSkge1xuICAgICAgY29uc3QgZmlsZXBhdGggPSBwYXRoLnJlc29sdmUoZGlybmFtZSwgaXRlcik7XG4gICAgICBjb25zdCBzdGF0ID0gYXdhaXQgZnMucHJvbWlzZXMuc3RhdChmaWxlcGF0aCk7XG4gICAgICBpZiAoc3RhdC5pc0ZpbGUoKSkge1xuICAgICAgICBsaXN0LnB1c2gob3B0aW9ucy5yZWxhdGl2ZSA/IHBhdGgucmVsYXRpdmUob3B0aW9ucy5yZWxhdGl2ZSwgZmlsZXBhdGgpIDogZmlsZXBhdGgpO1xuICAgICAgfVxuICAgICAgZWxzZSBpZiAob3B0aW9ucy5yZWN1cnNpdmUgJiYgc3RhdC5pc0RpcmVjdG9yeSgpKSB7XG4gICAgICAgIGZvciAoY29uc3QgZm5hbWUgb2YgYXdhaXQgZmlsZUxpc3QoZmlsZXBhdGgsIG9wdGlvbnMpKVxuICAgICAgICAgIGxpc3QucHVzaChmbmFtZSk7XG4gICAgICB9XG4gICAgfVxuICB9XG4gIHJldHVybiBsaXN0O1xufVxuXG5leHBvcnQgYXN5bmMgZnVuY3Rpb24gc2F2ZUlmRGlmZmVyZW50KGZpbGVuYW1lOiBzdHJpbmcsIGNvbnRlbnQ6IHN0cmluZykge1xuICBpZiAoYXdhaXQgZmlsZUV4aXN0cyhmaWxlbmFtZSkpIHtcbiAgICBjb25zdCBvbGRDb250ZW50ID0gYXdhaXQgZnMucHJvbWlzZXMucmVhZEZpbGUoZmlsZW5hbWUsIHsgZW5jb2Rpbmc6IFwidXRmOFwiIH0pO1xuICAgIGlmIChjb250ZW50ID09IG9sZENvbnRlbnQpXG4gICAgICByZXR1cm4gZmFsc2U7XG4gIH1cblxuICBhd2FpdCBmcy5wcm9taXNlcy5ta2RpcihwYXRoLmRpcm5hbWUoZmlsZW5hbWUpLCB7IHJlY3Vyc2l2ZTogdHJ1ZSB9KTtcbiAgYXdhaXQgZnMucHJvbWlzZXMud3JpdGVGaWxlKGZpbGVuYW1lLCBjb250ZW50LCB7IGVuY29kaW5nOiBcInV0ZjhcIiB9KTtcblxuICByZXR1cm4gdHJ1ZTtcbn1cblxuZXhwb3J0IGZ1bmN0aW9uIGdldFBhdGhTdHJpbmcoc3RyOiBzdHJpbmcpIHtcbiAgcmV0dXJuIHN0ci5zdGFydHNXaXRoKFwiZmlsZTovL1wiKSA/IHVybC5maWxlVVJMVG9QYXRoKHN0cikgOiBzdHI7XG59XG4iLCIvKlxuICogTUlUIExpY2Vuc2VcbiAqXG4gKiBDb3B5cmlnaHQgKGMpIDIwMjUgIFl1cmlpIFlha3ViaW4gKHl1cmlpLnlha3ViaW5AZ21haWwuY29tKVxuICpcbiAqIFBlcm1pc3Npb24gaXMgZ3JhbnRlZCB0byB1c2UsIGNvcHksIG1vZGlmeSwgYW5kIGRpc3RyaWJ1dGUgdGhpcyBzb2Z0d2FyZVxuICogdW5kZXIgdGhlIE1JVCBMaWNlbnNlLiBTZWUgTElDRU5TRSBmaWxlIGZvciBkZXRhaWxzLlxuICovXG5cbmltcG9ydCBwYXRoIGZyb20gXCJub2RlOnBhdGhcIjtcbmltcG9ydCBmcyBmcm9tIFwibm9kZTpmc1wiO1xuaW1wb3J0IGh0dHAgZnJvbSBcImh0dHBcIjtcbmltcG9ydCBodHRwcyBmcm9tIFwiaHR0cHNcIjtcblxuaW1wb3J0IHsgY3JlYXRlTG9nZ2VyIH0gZnJvbSBcIkAvbG9nZ2VyXCI7XG5cbmNvbnN0IGxvZ2dlciA9IGNyZWF0ZUxvZ2dlcihpbXBvcnQubWV0YS51cmwpO1xuXG5jb25zdCBodHRwT3B0aW9ucyA9IHtcbiAgbWV0aG9kOiAnR0VUJyxcbiAgdGltZW91dDogNTAwMCxcbiAgaGVhZGVyczoge1xuICAgIFwiVXNlci1BZ2VudFwiOiBQUk9KRUNUX05BTUUgKyBcIi9cIiArIFBST0pFQ1RfVkVSU0lPTixcbiAgICBcIkFjY2VwdFwiOiBcIiovKlwiLFxuICB9LFxufTtcblxuZnVuY3Rpb24gaHR0cFJlcXVlc3QodXJsOiBzdHJpbmcsIG9wdGlvbnM6IGh0dHAuUmVxdWVzdE9wdGlvbnMgfCBodHRwcy5SZXF1ZXN0T3B0aW9ucywgY2FsbGJhY2s6IGFueSkge1xuICBpZiAodXJsLnN0YXJ0c1dpdGgoXCJodHRwczovL1wiKSlcbiAgICByZXR1cm4gaHR0cHMucmVxdWVzdCh1cmwsIG9wdGlvbnMsIGNhbGxiYWNrKTtcbiAgcmV0dXJuIGh0dHAucmVxdWVzdCh1cmwsIG9wdGlvbnMsIGNhbGxiYWNrKTtcbn07XG5cbmV4cG9ydCBmdW5jdGlvbiByZXF1ZXN0R2V0KHVybDogc3RyaW5nKTogUHJvbWlzZTxCdWZmZXI+IHtcbiAgcmV0dXJuIG5ldyBQcm9taXNlKChyZXNvbHZlLCByZWplY3QpID0+IHtcblxuICAgIGNvbnN0IG9uRXJyb3IgPSAoZXJyOiBhbnkpID0+IHtcbiAgICAgIGNvbnN0IG1lc3NhZ2UgPSBcIkVuY291bnRlcmVkIGFuIGVycm9yIHRyeWluZyB0byBtYWtlIGEgcmVxdWVzdDogXCIgKyBlcnIubWVzc2FnZTtcbiAgICAgIGxvZ2dlci5lcnJvcihtZXNzYWdlLCBlcnIpO1xuICAgICAgcmVqZWN0KG1lc3NhZ2UpO1xuICAgIH07XG5cbiAgICBjb25zdCBvblRpbWVvdXQgPSAocmVxdWVzdDogYW55KSA9PiB7XG4gICAgICByZXF1ZXN0LmRlc3Ryb3koKTtcbiAgICAgIGxvZ2dlci5lcnJvcihcIiAgVGltZW91dFwiLCB1cmwpO1xuICAgICAgcmVqZWN0KFwiVGltZW91dFwiKTtcbiAgICB9XG5cbiAgICBjb25zdCBvblJlcXVlc3QgPSAocmVzcG9uc2U6IGFueSkgPT4ge1xuICAgICAgc3dpdGNoIChyZXNwb25zZS5zdGF0dXNDb2RlKSB7XG4gICAgICBjYXNlIDIwMDpcbiAgICAgICAgY29uc3QgY2h1bmtzOiBBcnJheTxCdWZmZXI+ID0gW107XG4gICAgICAgIHJlc3BvbnNlLm9uKFwiZGF0YVwiLCAoY2h1bms6IEJ1ZmZlcikgPT4gY2h1bmtzLnB1c2goY2h1bmspKTtcbiAgICAgICAgcmVzcG9uc2Uub24oXCJlbmRcIiwgKCkgPT4gcmVzb2x2ZShCdWZmZXIuY29uY2F0KGNodW5rcykpKTtcbiAgICAgICAgcmVzcG9uc2Uub24oJ2Nsb3NlJywgKCkgPT4gbG9nZ2VyLmluZm8oJyAgQ2xvc2UnKSk7XG4gICAgICAgIGJyZWFrO1xuXG4gICAgICBjYXNlIDMwMTpcbiAgICAgIGNhc2UgMzAyOlxuICAgICAgICByZXNwb25zZS5yZXN1bWUoKTtcbiAgICAgICAgbG9nZ2VyLmluZm8oYFJlZGlyZWN0IHRvICR7cmVzcG9uc2UuaGVhZGVycy5sb2NhdGlvbn1gKTtcbiAgICAgICAgY29uc3QgcmVxdWVzdCA9IGh0dHBSZXF1ZXN0KHJlc3BvbnNlLmhlYWRlcnMubG9jYXRpb24sIGh0dHBPcHRpb25zLCBvblJlcXVlc3QpO1xuICAgICAgICByZXF1ZXN0Lm9uKCd0aW1lb3V0Jywgb25UaW1lb3V0LmJpbmQobnVsbCwgcmVxdWVzdCkpO1xuICAgICAgICByZXF1ZXN0Lm9uKCdlcnJvcicsIG9uRXJyb3IpO1xuICAgICAgICByZXF1ZXN0LmVuZCgpO1xuICAgICAgICBicmVhaztcblxuICAgICAgZGVmYXVsdDpcbiAgICAgICAgcmVzcG9uc2UucmVzdW1lKCk7XG4gICAgICAgIGNvbnN0IG1lc3NhZ2UgPSBcIkRpZCBub3QgZ2V0IGFuIE9LIGZyb20gdGhlIHNlcnZlci4gQ29kZTogXCIgKyByZXNwb25zZS5zdGF0dXNDb2RlO1xuICAgICAgICBsb2dnZXIuZXJyb3IobWVzc2FnZSk7XG4gICAgICAgIHJlamVjdChtZXNzYWdlKTtcbiAgICAgICAgYnJlYWs7XG4gICAgICB9XG4gICAgfTtcblxuICAgIGxvZ2dlci5pbmZvKGB3Z2V0ICR7dXJsfWApO1xuICAgIGNvbnN0IHJlcXVlc3QgPSBodHRwUmVxdWVzdCh1cmwsIGh0dHBPcHRpb25zLCBvblJlcXVlc3QpO1xuICAgIHJlcXVlc3Qub24oJ3RpbWVvdXQnLCBvblRpbWVvdXQuYmluZChudWxsLCByZXF1ZXN0KSk7XG4gICAgcmVxdWVzdC5vbignZXJyb3InLCBvbkVycm9yKTtcbiAgICByZXF1ZXN0LmVuZCgpO1xuICB9KTtcbn07XG5cbmV4cG9ydCBmdW5jdGlvbiBkb3dubG9hZEZpbGUodXJsOiBzdHJpbmcsIGZpbGU6IHN0cmluZykge1xuICByZXR1cm4gbmV3IFByb21pc2UoKHJlc29sdmUsIHJlamVjdCkgPT4ge1xuICAgIGNvbnN0IGZpbGVuYW1lID0gcGF0aC5iYXNlbmFtZSh1cmwpO1xuXG4gICAgY29uc3QgY2xpZW50ID0gKCgpID0+IHtcbiAgICAgIGlmIChmaWxlKSB7XG4gICAgICAgIGNvbnN0IGZkID0gZnMub3BlblN5bmMoZmlsZSwgXCJ3XCIpO1xuICAgICAgICByZXR1cm4ge1xuICAgICAgICAgIG9uRGF0YTogKGNodW5rOiBCdWZmZXIpID0+IHtcbiAgICAgICAgICAgIGZzLndyaXRlU3luYyhmZCwgY2h1bmspO1xuICAgICAgICAgIH0sXG4gICAgICAgICAgb25FbmQ6ICgpID0+IHtcbiAgICAgICAgICAgIGZzLmNsb3NlU3luYyhmZCk7XG4gICAgICAgICAgICByZXNvbHZlKHVuZGVmaW5lZCk7XG4gICAgICAgICAgfSxcbiAgICAgICAgfTtcbiAgICAgIH1cbiAgICAgIGVsc2Uge1xuICAgICAgICBjb25zdCBjaHVua3M6IEFycmF5PEJ1ZmZlcj4gPSBbXTtcbiAgICAgICAgcmV0dXJuIHtcbiAgICAgICAgICBvbkRhdGE6IChjaHVuazogQnVmZmVyKSA9PiB7XG4gICAgICAgICAgICBjaHVua3MucHVzaChjaHVuayk7XG4gICAgICAgICAgfSxcbiAgICAgICAgICBvbkVuZDogKCkgPT4ge1xuICAgICAgICAgICAgcmVzb2x2ZShCdWZmZXIuY29uY2F0KGNodW5rcykpO1xuICAgICAgICAgIH0sXG4gICAgICAgIH07XG4gICAgICB9XG4gICAgfSkoKTtcbiAgXG4gICAgY29uc3Qgc3RhcnRSZXF1ZXN0ID0gKHVybDogc3RyaW5nLCBjYWxsYmFjazogYW55KSA9PiB7XG4gICAgICBjb25zdCByZXF1ZXN0ID0gaHR0cHMucmVxdWVzdCh1cmwsIGh0dHBPcHRpb25zLCBjYWxsYmFjayk7XG4gICAgICBpZiAocmVxdWVzdCkge1xuICAgICAgICByZXF1ZXN0Lm9uKCdlcnJvcicsIChlcnJvcikgPT4gcmVqZWN0KGVycm9yKSk7XG4gICAgICAgIHJlcXVlc3QuZW5kKCk7IFxuICAgICAgfVxuICAgICAgZWxzZSB7XG4gICAgICAgIHJlamVjdChgVXJsIHNjaGVtZSBub3Qgc3VwcG9ydGVkIGZvciAke3VybH1gKTtcbiAgICAgIH1cbiAgICB9O1xuXG4gICAgY29uc3Qgb25SZXF1ZXN0ID0gKHJlc3BvbnNlOiBhbnkpID0+IHtcbiAgICAgIHN3aXRjaCAocmVzcG9uc2Uuc3RhdHVzQ29kZSkge1xuICAgICAgY2FzZSAyMDA6XG4gICAgICAgIGxvZ2dlci5pbmZvKGBDb25uY3RlZCB0byAke3Jlc3BvbnNlLnJlcS5ob3N0fWApO1xuICAgICAgICBsb2dnZXIuaW5mbyhgRG93bmxvYWRpbmcgJHtmaWxlbmFtZX1gKTtcbiAgICAgICAgcmVzcG9uc2Uub24oJ2RhdGEnLCBjbGllbnQub25EYXRhKTtcbiAgICAgICAgcmVzcG9uc2Uub24oJ2VuZCcsIGNsaWVudC5vbkVuZCk7XG4gICAgICAgIHJlc3BvbnNlLm9uKCdjbG9zZScsICgpID0+IGxvZ2dlci5pbmZvKGBEb25lYCkpO1xuICAgICAgICBicmVhaztcblxuICAgICAgY2FzZSAzMDE6XG4gICAgICBjYXNlIDMwMjpcbiAgICAgICAgcmVzcG9uc2UucmVzdW1lKCk7XG4gICAgICAgIGxvZ2dlci5pbmZvKGBSZXNvbHZpbmcgJHtyZXNwb25zZS5oZWFkZXJzLmxvY2F0aW9ufWApO1xuICAgICAgICBzdGFydFJlcXVlc3QocmVzcG9uc2UuaGVhZGVycy5sb2NhdGlvbiwgb25SZXF1ZXN0KTtcbiAgICAgICAgYnJlYWs7XG5cbiAgICAgIGRlZmF1bHQ6XG4gICAgICAgIHJlc3BvbnNlLnJlc3VtZSgpO1xuICAgICAgICByZWplY3QoYERpZCBub3QgZ2V0IGFuIE9LIGZyb20gdGhlIHNlcnZlci4gQ29kZTogJHtyZXNwb25zZS5zdGF0dXNDb2RlfWApO1xuICAgICAgICBicmVhaztcbiAgICAgIH1cbiAgICB9O1xuXG4gICAgbG9nZ2VyLmluZm8oYFJlcXVlc3QgdG8gJHt1cmx9YCk7XG4gICAgc3RhcnRSZXF1ZXN0KHVybCwgb25SZXF1ZXN0KTtcbiAgfSk7XG59XG4iLCIvKlxuICogTUlUIExpY2Vuc2VcbiAqXG4gKiBDb3B5cmlnaHQgKGMpIDIwMjUgIFl1cmlpIFlha3ViaW4gKHl1cmlpLnlha3ViaW5AZ21haWwuY29tKVxuICpcbiAqIFBlcm1pc3Npb24gaXMgZ3JhbnRlZCB0byB1c2UsIGNvcHksIG1vZGlmeSwgYW5kIGRpc3RyaWJ1dGUgdGhpcyBzb2Z0d2FyZVxuICogdW5kZXIgdGhlIE1JVCBMaWNlbnNlLiBTZWUgTElDRU5TRSBmaWxlIGZvciBkZXRhaWxzLlxuICovXG5cbmV4cG9ydCBjb25zdCBpbXBvcnRNb2R1bGUgPSBhc3luYyAobmFtZSkgPT4gaW1wb3J0KC8qIHdlYnBhY2tJZ25vcmU6IHRydWUgKi8gbmFtZSk7XG4iLCJpbXBvcnQgZnMgZnJvbSBcIm5vZGU6ZnNcIjtcbmltcG9ydCBwYXRoIGZyb20gXCJub2RlOnBhdGhcIjtcblxuaW1wb3J0IHsgZmlsZUxpc3QgfSBmcm9tIFwiQC91dGlscy9GaWxlU3lzdGVtXCI7XG5pbXBvcnQgeyBjcmVhdGVMb2dnZXIgfSBmcm9tIFwiQC9sb2dnZXJcIjtcblxuY29uc3QgbG9nZ2VyID0gY3JlYXRlTG9nZ2VyKGltcG9ydC5tZXRhLnVybCk7XG5cbmV4cG9ydCBhc3luYyBmdW5jdGlvbiBtYWtlUGF0Y2goc3JjRGlyOiBzdHJpbmcsIGRlc3REaXI6IHN0cmluZykge1xuICBsb2dnZXIuaW5mbyhgTWFrZSBwYXRjaCAke3NyY0Rpcn0gdG8gJHtkZXN0RGlyfWApO1xuICBjb25zdCBsaXN0ID0gYXdhaXQgZmlsZUxpc3Qoc3JjRGlyLCB7IHJlbGF0aXZlOiBzcmNEaXIsIHJlY3Vyc2l2ZTogdHJ1ZSB9KTtcbiAgZm9yIChjb25zdCBpdGVyIG9mIGxpc3QpIHtcbiAgICBjb25zdCBzb3VyY2UgPSBwYXRoLnJlc29sdmUoc3JjRGlyLCBpdGVyKTtcbiAgICBjb25zdCBkZXN0aW5hdGlvbiA9IHBhdGgucmVzb2x2ZShkZXN0RGlyLCBpdGVyKTtcbiAgICBhd2FpdCBmcy5wcm9taXNlcy5jcChzb3VyY2UsIGRlc3RpbmF0aW9uLCB7IGZvcmNlOiB0cnVlIH0pO1xuICAgIGxvZ2dlci5pbmZvKGAgUmVwbGFjZWQgJHtpdGVyfWApO1xuICB9XG59XG4iLCIvKlxuICogTUlUIExpY2Vuc2VcbiAqXG4gKiBDb3B5cmlnaHQgKGMpIDIwMjUgIFl1cmlpIFlha3ViaW4gKHl1cmlpLnlha3ViaW5AZ21haWwuY29tKVxuICpcbiAqIFBlcm1pc3Npb24gaXMgZ3JhbnRlZCB0byB1c2UsIGNvcHksIG1vZGlmeSwgYW5kIGRpc3RyaWJ1dGUgdGhpcyBzb2Z0d2FyZVxuICogdW5kZXIgdGhlIE1JVCBMaWNlbnNlLiBTZWUgTElDRU5TRSBmaWxlIGZvciBkZXRhaWxzLlxuICovXG5cbmNvbnN0IHJlcXVpcmVJbXBsID0gZXZhbChcInJlcXVpcmVcIik7XG5cbmV4cG9ydCBmdW5jdGlvbiByZXF1aXJlUmVzb2x2ZShuYW1lOiBzdHJpbmcpIHtcbiAgaWYgKHR5cGVvZiBpbXBvcnQubWV0YS5yZXNvbHZlID09PSAnZnVuY3Rpb24nKVxuICAgIHJldHVybiBpbXBvcnQubWV0YS5yZXNvbHZlKG5hbWUpO1xuICBpZiAodHlwZW9mIHJlcXVpcmVJbXBsICE9PSAndW5kZWZpbmVkJylcbiAgICByZXR1cm4gcmVxdWlyZUltcGwucmVzb2x2ZShuYW1lKTtcbiAgdGhyb3cgbmV3IEVycm9yKFwiTm8gY29tcGF0aWJsZSBtb2R1bGUgcmVzb2x2ZXIgZm91bmRcIik7XG59XG5cbmV4cG9ydCB7IGltcG9ydE1vZHVsZSB9IGZyb20gXCIuL0ltcG9ydE1vZHVsZS5tanNcIjtcbiIsIi8qXG4gKiBNSVQgTGljZW5zZVxuICpcbiAqIENvcHlyaWdodCAoYykgMjAyNSAgWXVyaWkgWWFrdWJpbiAoeXVyaWkueWFrdWJpbkBnbWFpbC5jb20pXG4gKlxuICogUGVybWlzc2lvbiBpcyBncmFudGVkIHRvIHVzZSwgY29weSwgbW9kaWZ5LCBhbmQgZGlzdHJpYnV0ZSB0aGlzIHNvZnR3YXJlXG4gKiB1bmRlciB0aGUgTUlUIExpY2Vuc2UuIFNlZSBMSUNFTlNFIGZpbGUgZm9yIGRldGFpbHMuXG4gKi9cblxuZXhwb3J0IGZ1bmN0aW9uIGVxdWFsVmFsdWUoYTogYW55LCBiOiBhbnkpOiBib29sZWFuIHtcbiAgaWYgKGEgPT09IGIpXG4gICAgcmV0dXJuIHRydWU7XG5cbiAgaWYgKGEgPT09IHVuZGVmaW5lZCB8fCBiID09PSB1bmRlZmluZWQpXG4gICAgcmV0dXJuIGZhbHNlO1xuXG4gIGlmICh0eXBlb2YgYSAhPT0gXCJvYmplY3RcIiB8fCB0eXBlb2YgYiAhPT0gXCJvYmplY3RcIilcbiAgICByZXR1cm4gZmFsc2U7XG5cbiAgY29uc3QgazEgPSBPYmplY3Qua2V5cyhhKTtcbiAgY29uc3QgazIgPSBPYmplY3Qua2V5cyhiKTtcblxuICBpZiAoazEubGVuZ3RoICE9IGsyLmxlbmd0aClcbiAgICByZXR1cm4gZmFsc2U7XG5cbiAgZm9yIChjb25zdCBrZXkgb2YgazEpIHtcbiAgICBpZiAoIU9iamVjdC5oYXNPd24oYiwga2V5KSB8fCAhZXF1YWxWYWx1ZShhW2tleV0sIGJba2V5XSkpXG4gICAgICByZXR1cm4gZmFsc2U7XG4gIH1cblxuICByZXR1cm4gdHJ1ZTtcbn1cblxuZXhwb3J0IGZ1bmN0aW9uIGNvcHlWYWx1ZShvOiBhbnkpOiBhbnkge1xuICBpZiAoIW8gfHwgdHlwZW9mIG8gIT09IFwib2JqZWN0XCIpXG4gICAgcmV0dXJuIG87XG4gIGlmIChBcnJheS5pc0FycmF5KG8pKSB7XG4gICAgY29uc3QgcmVzdWx0ID0gW107XG4gICAgZm9yIChjb25zdCBpdGVyIG9mIG8pXG4gICAgICByZXN1bHQucHVzaChjb3B5VmFsdWUoaXRlcikpO1xuICAgIHJldHVybiByZXN1bHQ7XG4gIH1cbiAgZWxzZSB7XG4gICAgY29uc3QgcmVzdWx0ID0ge30gYXMgYW55O1xuICAgIGZvciAoY29uc3QgW2tleSx2YWxdIG9mIE9iamVjdC5lbnRyaWVzKG8pKVxuICAgICAgcmVzdWx0W2tleV0gPSBjb3B5VmFsdWUodmFsKTtcbiAgICByZXR1cm4gcmVzdWx0O1xuICB9XG59XG5cbmV4cG9ydCBmdW5jdGlvbiBhc3NpZ25PYmplY3QodGFyZ2V0OiBhbnksIHNvdXJjZTogYW55KSB7XG4gIGlmIChBcnJheS5pc0FycmF5KHRhcmdldCkgJiYgQXJyYXkuaXNBcnJheShzb3VyY2UpKSB7XG4gICAgZm9yIChjb25zdCBpdGVyIG9mIHNvdXJjZSlcbiAgICAgIHRhcmdldC5wdXNoKGl0ZXIpO1xuICB9XG4gIGVsc2Uge1xuICAgIGZvciAoY29uc3Qga2V5IG9mIE9iamVjdC5rZXlzKHNvdXJjZSkpIHtcbiAgICAgIGNvbnN0IGEgPSB0YXJnZXRba2V5XSwgYiA9IHNvdXJjZVtrZXldO1xuICAgICAgaWYgKGEgJiYgdHlwZW9mIGEgPT09IFwib2JqZWN0XCIgJiYgYiAmJiB0eXBlb2YgYiA9PT0gXCJvYmplY3RcIilcbiAgICAgICAgYXNzaWduT2JqZWN0KGEsIGIpO1xuICAgICAgZWxzZVxuICAgICAgICB0YXJnZXRba2V5XSA9IGNvcHlWYWx1ZShiKTtcbiAgICB9XG4gIH1cbn1cblxuZXhwb3J0IGZ1bmN0aW9uIGFycmF5V3JhcHBlcih2YWx1ZTogYW55KSB7XG4gIGlmICh2YWx1ZSA9PT0gdW5kZWZpbmVkIHx8IEFycmF5LmlzQXJyYXkodmFsdWUpKVxuICAgIHJldHVybiB2YWx1ZTtcbiAgcmV0dXJuIFsgdmFsdWUgXTtcbn1cbiIsIi8qXG4gKiBNSVQgTGljZW5zZVxuICpcbiAqIENvcHlyaWdodCAoYykgMjAyNSAgWXVyaWkgWWFrdWJpbiAoeXVyaWkueWFrdWJpbkBnbWFpbC5jb20pXG4gKlxuICogUGVybWlzc2lvbiBpcyBncmFudGVkIHRvIHVzZSwgY29weSwgbW9kaWZ5LCBhbmQgZGlzdHJpYnV0ZSB0aGlzIHNvZnR3YXJlXG4gKiB1bmRlciB0aGUgTUlUIExpY2Vuc2UuIFNlZSBMSUNFTlNFIGZpbGUgZm9yIGRldGFpbHMuXG4gKi9cblxuaW1wb3J0IGZzIGZyb20gXCJub2RlOmZzXCI7XG5cbmV4cG9ydCBjbGFzcyBTZXR0aW5nc1N0b3JhZ2Uge1xuICBwcml2YXRlIF9maWxlbmFtZTogc3RyaW5nO1xuICBwcml2YXRlIF9zZXR0aW5nczogYW55O1xuICBwcml2YXRlIF9jdXJyZW50OiBhbnk7XG5cbiAgY29uc3RydWN0b3IoZmlsZW5hbWU6IHN0cmluZykge1xuICAgIHRoaXMuX2ZpbGVuYW1lID0gZmlsZW5hbWU7XG4gIH1cblxuICBwdWJsaWMgYXN5bmMgcHVzaChuYW1lOiBzdHJpbmcpIHtcbiAgICBpZiAoIXRoaXMuX3NldHRpbmdzKVxuICAgICAgYXdhaXQgdGhpcy5sb2FkKCk7XG4gICAgbGV0IG9iamVjdCA9IHRoaXMuX2N1cnJlbnQub2JqZWN0W25hbWVdO1xuICAgIGlmICghb2JqZWN0KVxuICAgICAgb2JqZWN0ID0gdGhpcy5fY3VycmVudC5vYmplY3RbbmFtZV0gPSB7fTtcbiAgICB0aGlzLl9jdXJyZW50ID0geyBwYXJlbnQ6IHRoaXMuX2N1cnJlbnQsIG9iamVjdCB9O1xuICB9XG5cbiAgcHVibGljIGFzeW5jIHBvcCgpIHtcbiAgICBpZiAoIXRoaXMuX3NldHRpbmdzKVxuICAgICAgYXdhaXQgdGhpcy5sb2FkKCk7XG4gICAgY29uc29sZS5hc3NlcnQodGhpcy5fY3VycmVudC5wYXJlbnQpO1xuICAgIHRoaXMuX2N1cnJlbnQgPSB0aGlzLl9jdXJyZW50LnBhcmVudDtcbiAgfVxuXG4gIHB1YmxpYyBhc3luYyBnZXQobmFtZTogc3RyaW5nKSB7XG4gICAgaWYgKCF0aGlzLl9zZXR0aW5ncylcbiAgICAgIGF3YWl0IHRoaXMubG9hZCgpO1xuICAgIHJldHVybiB0aGlzLl9jdXJyZW50Lm9iamVjdFtuYW1lXTtcbiAgfVxuXG4gIHB1YmxpYyBhc3luYyBzZXQobmFtZTogc3RyaW5nLCB2YWx1ZTogYW55KSB7XG4gICAgaWYgKCF0aGlzLl9zZXR0aW5ncylcbiAgICAgIGF3YWl0IHRoaXMubG9hZCgpO1xuICAgIHRoaXMuX2N1cnJlbnQub2JqZWN0W25hbWVdID0gdmFsdWU7XG4gICAgYXdhaXQgdGhpcy5zYXZlKCk7XG4gIH1cblxuICBwdWJsaWMgYXN5bmMgbG9hZCgpIHtcbiAgICB0cnkge1xuICAgICAgY29uc3QgY29udGVudCA9IGF3YWl0IGZzLnByb21pc2VzLnJlYWRGaWxlKHRoaXMuX2ZpbGVuYW1lLCBcInV0Zi04XCIpO1xuICAgICAgdGhpcy5fc2V0dGluZ3MgPSBKU09OLnBhcnNlKGNvbnRlbnQpO1xuICAgIH1cbiAgICBjYXRjaCAoZSkge1xuICAgICAgdGhpcy5fc2V0dGluZ3MgPSB7fTtcbiAgICB9XG4gICAgdGhpcy5fY3VycmVudCA9XG4gICAge1xuICAgICAgcGFyZW50OiBudWxsLFxuICAgICAgb2JqZWN0OiB0aGlzLl9zZXR0aW5ncyxcbiAgICB9O1xuICB9XG5cbiAgcHVibGljIGFzeW5jIHNhdmUoKSB7XG4gICAgY29uc3Qgc3BhY2UgPSAyO1xuICAgIGNvbnN0IGNvbnRlbnQgPSBKU09OLnN0cmluZ2lmeSh0aGlzLl9zZXR0aW5ncywgdW5kZWZpbmVkLCBzcGFjZSk7XG4gICAgYXdhaXQgZnMucHJvbWlzZXMud3JpdGVGaWxlKHRoaXMuX2ZpbGVuYW1lLCBjb250ZW50LCB7IGVuY29kaW5nOiBcInV0Zi04XCIsIGZsYWc6IFwid1wiLCBmbHVzaDogdHJ1ZSB9KTtcbiAgfVxufTtcbiIsIi8qXG4gKiBNSVQgTGljZW5zZVxuICpcbiAqIENvcHlyaWdodCAoYykgMjAyNSAgWXVyaWkgWWFrdWJpbiAoeXVyaWkueWFrdWJpbkBnbWFpbC5jb20pXG4gKlxuICogUGVybWlzc2lvbiBpcyBncmFudGVkIHRvIHVzZSwgY29weSwgbW9kaWZ5LCBhbmQgZGlzdHJpYnV0ZSB0aGlzIHNvZnR3YXJlXG4gKiB1bmRlciB0aGUgTUlUIExpY2Vuc2UuIFNlZSBMSUNFTlNFIGZpbGUgZm9yIGRldGFpbHMuXG4gKi9cblxuZXhwb3J0IGZ1bmN0aW9uIGVuc3VyZUJvb2xlYW4odmFsdWU6IGFueSkge1xuICBpZiAodHlwZW9mIHZhbHVlID09PSBcImJvb2xlYW5cIilcbiAgICByZXR1cm4gdmFsdWU7XG4gIHRocm93IG5ldyBFcnJvcihgVGhlICcke3ZhbHVlfScgaXMgbm90IGEgYm9vbGVhbmApO1xufVxuXG5leHBvcnQgZnVuY3Rpb24gZW5zdXJlTnVtYmVyKHZhbHVlOiBhbnkpIHtcbiAgaWYgKHR5cGVvZiB2YWx1ZSA9PT0gXCJudW1iZXJcIilcbiAgICByZXR1cm4gdmFsdWU7XG4gIHRocm93IG5ldyBFcnJvcihgVGhlICcke3ZhbHVlfScgaXMgbm90IGEgc3RyaW5nYCk7XG59XG5cbmV4cG9ydCBmdW5jdGlvbiBlbnN1cmVTdHJpbmcodmFsdWU6IGFueSkge1xuICBpZiAodHlwZW9mIHZhbHVlID09PSBcInN0cmluZ1wiKVxuICAgIHJldHVybiB2YWx1ZTtcbiAgdGhyb3cgbmV3IEVycm9yKGBUaGUgJyR7dmFsdWV9JyBpcyBub3QgYSBzdHJpbmdgKTtcbn1cblxuZXhwb3J0IGZ1bmN0aW9uIGVuc3VyZUFycmF5KHZhbHVlOiBhbnkpIHtcbiAgaWYgKEFycmF5LmlzQXJyYXkodmFsdWUpKVxuICAgIHJldHVybiBBcnJheS5mcm9tKHZhbHVlKTtcbiAgdGhyb3cgbmV3IEVycm9yKGBUaGUgJyR7dmFsdWV9JyBpcyBub3QgYSBhcnJheWApO1xufVxuIiwibW9kdWxlLmV4cG9ydHMgPSByZXF1aXJlKFwiaHR0cFwiKTsiLCJtb2R1bGUuZXhwb3J0cyA9IHJlcXVpcmUoXCJodHRwc1wiKTsiLCJtb2R1bGUuZXhwb3J0cyA9IHJlcXVpcmUoXCJub2RlOmNoaWxkX3Byb2Nlc3NcIik7IiwibW9kdWxlLmV4cG9ydHMgPSByZXF1aXJlKFwibm9kZTpmc1wiKTsiLCJtb2R1bGUuZXhwb3J0cyA9IHJlcXVpcmUoXCJub2RlOm9zXCIpOyIsIm1vZHVsZS5leHBvcnRzID0gcmVxdWlyZShcIm5vZGU6cGF0aFwiKTsiLCJtb2R1bGUuZXhwb3J0cyA9IHJlcXVpcmUoXCJub2RlOnVybFwiKTsiLCIvLyBUaGUgbW9kdWxlIGNhY2hlXG52YXIgX193ZWJwYWNrX21vZHVsZV9jYWNoZV9fID0ge307XG5cbi8vIFRoZSByZXF1aXJlIGZ1bmN0aW9uXG5mdW5jdGlvbiBfX3dlYnBhY2tfcmVxdWlyZV9fKG1vZHVsZUlkKSB7XG5cdC8vIENoZWNrIGlmIG1vZHVsZSBpcyBpbiBjYWNoZVxuXHR2YXIgY2FjaGVkTW9kdWxlID0gX193ZWJwYWNrX21vZHVsZV9jYWNoZV9fW21vZHVsZUlkXTtcblx0aWYgKGNhY2hlZE1vZHVsZSAhPT0gdW5kZWZpbmVkKSB7XG5cdFx0cmV0dXJuIGNhY2hlZE1vZHVsZS5leHBvcnRzO1xuXHR9XG5cdC8vIENyZWF0ZSBhIG5ldyBtb2R1bGUgKGFuZCBwdXQgaXQgaW50byB0aGUgY2FjaGUpXG5cdHZhciBtb2R1bGUgPSBfX3dlYnBhY2tfbW9kdWxlX2NhY2hlX19bbW9kdWxlSWRdID0ge1xuXHRcdC8vIG5vIG1vZHVsZS5pZCBuZWVkZWRcblx0XHQvLyBubyBtb2R1bGUubG9hZGVkIG5lZWRlZFxuXHRcdGV4cG9ydHM6IHt9XG5cdH07XG5cblx0Ly8gRXhlY3V0ZSB0aGUgbW9kdWxlIGZ1bmN0aW9uXG5cdF9fd2VicGFja19tb2R1bGVzX19bbW9kdWxlSWRdKG1vZHVsZSwgbW9kdWxlLmV4cG9ydHMsIF9fd2VicGFja19yZXF1aXJlX18pO1xuXG5cdC8vIFJldHVybiB0aGUgZXhwb3J0cyBvZiB0aGUgbW9kdWxlXG5cdHJldHVybiBtb2R1bGUuZXhwb3J0cztcbn1cblxuIiwiLy8gZ2V0RGVmYXVsdEV4cG9ydCBmdW5jdGlvbiBmb3IgY29tcGF0aWJpbGl0eSB3aXRoIG5vbi1oYXJtb255IG1vZHVsZXNcbl9fd2VicGFja19yZXF1aXJlX18ubiA9IChtb2R1bGUpID0+IHtcblx0dmFyIGdldHRlciA9IG1vZHVsZSAmJiBtb2R1bGUuX19lc01vZHVsZSA/XG5cdFx0KCkgPT4gKG1vZHVsZVsnZGVmYXVsdCddKSA6XG5cdFx0KCkgPT4gKG1vZHVsZSk7XG5cdF9fd2VicGFja19yZXF1aXJlX18uZChnZXR0ZXIsIHsgYTogZ2V0dGVyIH0pO1xuXHRyZXR1cm4gZ2V0dGVyO1xufTsiLCIvLyBkZWZpbmUgZ2V0dGVyIGZ1bmN0aW9ucyBmb3IgaGFybW9ueSBleHBvcnRzXG5fX3dlYnBhY2tfcmVxdWlyZV9fLmQgPSAoZXhwb3J0cywgZGVmaW5pdGlvbikgPT4ge1xuXHRmb3IodmFyIGtleSBpbiBkZWZpbml0aW9uKSB7XG5cdFx0aWYoX193ZWJwYWNrX3JlcXVpcmVfXy5vKGRlZmluaXRpb24sIGtleSkgJiYgIV9fd2VicGFja19yZXF1aXJlX18ubyhleHBvcnRzLCBrZXkpKSB7XG5cdFx0XHRPYmplY3QuZGVmaW5lUHJvcGVydHkoZXhwb3J0cywga2V5LCB7IGVudW1lcmFibGU6IHRydWUsIGdldDogZGVmaW5pdGlvbltrZXldIH0pO1xuXHRcdH1cblx0fVxufTsiLCJfX3dlYnBhY2tfcmVxdWlyZV9fLm8gPSAob2JqLCBwcm9wKSA9PiAoT2JqZWN0LnByb3RvdHlwZS5oYXNPd25Qcm9wZXJ0eS5jYWxsKG9iaiwgcHJvcCkpIiwiLy8gZGVmaW5lIF9fZXNNb2R1bGUgb24gZXhwb3J0c1xuX193ZWJwYWNrX3JlcXVpcmVfXy5yID0gKGV4cG9ydHMpID0+IHtcblx0aWYodHlwZW9mIFN5bWJvbCAhPT0gJ3VuZGVmaW5lZCcgJiYgU3ltYm9sLnRvU3RyaW5nVGFnKSB7XG5cdFx0T2JqZWN0LmRlZmluZVByb3BlcnR5KGV4cG9ydHMsIFN5bWJvbC50b1N0cmluZ1RhZywgeyB2YWx1ZTogJ01vZHVsZScgfSk7XG5cdH1cblx0T2JqZWN0LmRlZmluZVByb3BlcnR5KGV4cG9ydHMsICdfX2VzTW9kdWxlJywgeyB2YWx1ZTogdHJ1ZSB9KTtcbn07IiwiLypcbiAqIE1JVCBMaWNlbnNlXG4gKlxuICogQ29weXJpZ2h0IChjKSAyMDI1ICBZdXJpaSBZYWt1YmluICh5dXJpaS55YWt1YmluQGdtYWlsLmNvbSlcbiAqXG4gKiBQZXJtaXNzaW9uIGlzIGdyYW50ZWQgdG8gdXNlLCBjb3B5LCBtb2RpZnksIGFuZCBkaXN0cmlidXRlIHRoaXMgc29mdHdhcmVcbiAqIHVuZGVyIHRoZSBNSVQgTGljZW5zZS4gU2VlIExJQ0VOU0UgZmlsZSBmb3IgZGV0YWlscy5cbiAqL1xuXG4vLy8gPHJlZmVyZW5jZSBwYXRoPVwiZ2xvYmFsLmQudHNcIiAvPlxuXG5pbXBvcnQgKiBhcyBjeHggZnJvbSBcIkAvY3h4XCI7XG5cbmltcG9ydCBpbml0SGFuZGxlciBmcm9tIFwiQC9Jbml0SGFuZGxlclwiO1xuaW1wb3J0IGJ1aWxkSGFuZGxlciBmcm9tIFwiQC9CdWlsZEhhbmRsZXJcIjtcblxuZXhwb3J0IGRlZmF1bHQge1xuICBjeHgsXG4gIGhhbmRsZXJzOiB7XG4gICAgZGVmYXVsdDogYnVpbGRIYW5kbGVyLFxuICAgIGluaXQ6IGluaXRIYW5kbGVyLFxuICAgIGJ1aWxkOiBidWlsZEhhbmRsZXIsXG4gIH0sXG59O1xuIl0sIm5hbWVzIjpbXSwic291cmNlUm9vdCI6IiJ9