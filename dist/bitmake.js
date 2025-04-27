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
        scope = mk._scope();
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
        scope = mk._scope();
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


const TARGET_SCOPE = Symbol("TARGET_SCOPE");
const SCRIPT = Symbol("SCRIPT");
const INPUT = Symbol("INPUT");
const OUTPUT = Symbol("OUTPUT");
const PARAMS = Symbol("PARAMS");
const PROPERTIES = Symbol("PROPERTIES");
class CustomScript {
    [TARGET_SCOPE];
    [SCRIPT];
    [INPUT];
    [OUTPUT];
    [PARAMS];
    [PROPERTIES];
    constructor(scope, script, output, params) {
        this[TARGET_SCOPE] = _core_Scope__WEBPACK_IMPORTED_MODULE_1__.ScopeHelper.clone({}, scope);
        this[INPUT] = params.input || null;
        this[SCRIPT] = script;
        this[OUTPUT] = output;
        this[PARAMS] = params;
        this[PROPERTIES] = {};
    }
    static create(scope, script, output, params) {
        return Object.seal(new CustomScript(scope, script, output, params));
    }
    addProperty(key, ...vals) {
        let property = this[PROPERTIES][key];
        if (!property) {
            property = [];
            this[PROPERTIES][key] = property;
        }
        vals.forEach(v => property.push(v));
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
        this[OUTPUT] = _core_Path__WEBPACK_IMPORTED_MODULE_0__.AbsolutePath.create(value);
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
    toJSON() {
        return {
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
    setCustomScript(target, name) {
        if (name)
            this[CUSTOM_SCRIPTS].set(name, target);
        else
            this[CUSTOM_SCRIPTS].add(target);
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
            scope.SCRIPT_FILE = scriptFile;
            scope.SCRIPT_DIR = scope.SCRIPT_FILE.dirname();
            this.addSystemVariables(scope);
            const cwdSave = process.cwd();
            process.chdir(scope.SOURCE_DIR.toString());
            const module = await (0,_utils_Module__WEBPACK_IMPORTED_MODULE_14__.importModule)(scope.SCRIPT_FILE.toString());
            if (!module.default)
                throw new Error(`Subdirectory ${scope.SCRIPT_FILE.basename()} not contain default function`);
            const mk = _core_UserContext__WEBPACK_IMPORTED_MODULE_11__.UserContext.create(scope, this);
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
            for (const [key, vals] of Object.entries(iter.PROPERTIES))
                script.addProperty(key, ...vals);
        }
        const goalList = _core_GoalCollection__WEBPACK_IMPORTED_MODULE_8__.GoalCollection.create();
        for (const script of this[CUSTOM_SCRIPTS].ENTRIES) {
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
        const srcPath = this[SCOPE].SCRIPT_DIR.resolve(src);
        const destPath = this[SCOPE].SCRIPT_DIR.resolve(dest);
        this[GLOBAL].addSubdirectoryAlias(_core_Path__WEBPACK_IMPORTED_MODULE_0__.DirPath.create(srcPath), _core_Path__WEBPACK_IMPORTED_MODULE_0__.DirPath.create(destPath));
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
    value: _core_FindProgram__WEBPACK_IMPORTED_MODULE_0__.findProgramSync,
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
    addCustomScript(script, params) {
        if (!params || !params.output)
            throw new Error(`Uknown params ${JSON.stringify(params)}`);
        let scriptObj;
        if (typeof script === "string")
            scriptObj = this[GLOBAL].findScriptFunction(script);
        if (!scriptObj)
            scriptObj = _core_Path__WEBPACK_IMPORTED_MODULE_2__.FilePath.create(this[SCOPE].SOURCE_DIR.resolve(script));
        const target = _core_CustomScript__WEBPACK_IMPORTED_MODULE_8__.CustomScript.create(this[SCOPE], scriptObj, params.output, params);
        this[GLOBAL].setCustomScript(target, params.name);
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
            this[GLOBAL].addInstallEntry(entity);
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
    value: _core_FindProgram__WEBPACK_IMPORTED_MODULE_10__.findProgramSync,
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
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiYml0bWFrZS5qcyIsIm1hcHBpbmdzIjoiQUFBQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSxDQUFDO0FBQ0QsTzs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7QUNWQTs7Ozs7OztHQU9HO0FBRXNCO0FBQ0k7QUFDRjtBQUVFO0FBQ2lCO0FBQ3VDO0FBQzNCO0FBQ1I7QUFDSTtBQUNVO0FBQ2lCO0FBQ2pDO0FBQ0M7QUFDdUI7QUFDaEM7QUFFUTtBQUNGO0FBRTlDLE1BQU0sTUFBTSxHQUFHLHNEQUFZLENBQUMsK0VBQWUsQ0FBQyxDQUFDO0FBRTdDLFNBQVMsZ0JBQWdCLENBQUMsR0FBRyxJQUFTO0lBQ3BDLE1BQU0sV0FBVyxHQUFRLEVBQUUsQ0FBQztJQUM1QixLQUFLLE1BQU0sR0FBRyxJQUFJLElBQUksRUFBRSxDQUFDO1FBQ3ZCLE1BQU0sSUFBSSxHQUFRLE1BQU0sQ0FBQyxPQUFPLENBQUMsR0FBRyxJQUFJLEVBQUUsQ0FBQyxDQUFDO1FBQzVDLE9BQU8sSUFBSSxDQUFDLE1BQU0sRUFBRSxDQUFDO1lBQ25CLElBQUksQ0FBQyxHQUFHLEVBQUMsR0FBRyxDQUFDLEdBQUcsSUFBSSxDQUFDLEdBQUcsRUFBRSxDQUFDO1lBQzNCLElBQUksU0FBUyxDQUFDO1lBQ2QsSUFBSSxTQUFTLEdBQUcsSUFBSSxDQUFDO1lBQ3JCLFFBQVEsR0FBRyxFQUFFLENBQUM7Z0JBQ2QsS0FBSyxNQUFNO29CQUNULFNBQVMsR0FBRyw0REFBYyxDQUFDO29CQUMzQixTQUFTLEdBQUcsS0FBSyxDQUFDO29CQUNsQixNQUFNO2dCQUNSLEtBQUssUUFBUSxDQUFDO2dCQUNkLEtBQUssVUFBVSxDQUFDO2dCQUNoQixLQUFLLFNBQVM7b0JBQ1osU0FBUyxHQUFHLEdBQUcsQ0FBQztvQkFDaEIsTUFBTTtZQUNSLENBQUM7WUFDRCxJQUFJLE9BQU8sR0FBRyxLQUFLLFFBQVE7Z0JBQ3pCLEdBQUcsR0FBRyxHQUFHLENBQUMsUUFBUSxFQUFFLENBQUM7aUJBQ2xCLElBQUksS0FBSyxDQUFDLE9BQU8sQ0FBQyxHQUFHLENBQUM7Z0JBQ3pCLEdBQUcsR0FBRyxHQUFHLENBQUMsSUFBSSxDQUFDLFNBQVMsQ0FBQyxDQUFDO1lBQzVCLElBQUksQ0FBQyxTQUFTLElBQUksQ0FBQyxXQUFXLENBQUMsR0FBRyxDQUFDO2dCQUNqQyxXQUFXLENBQUMsR0FBRyxDQUFDLEdBQUcsR0FBRyxDQUFDO2lCQUNwQixJQUFJLFNBQVM7Z0JBQ2hCLFdBQVcsQ0FBQyxHQUFHLENBQUMsR0FBRyxHQUFHLEdBQUcsU0FBUyxHQUFHLFdBQVcsQ0FBQyxHQUFHLENBQUMsQ0FBQzs7Z0JBRXRELFdBQVcsQ0FBQyxHQUFHLENBQUMsR0FBRyxXQUFXLENBQUMsR0FBRyxDQUFDLEdBQUcsU0FBUyxHQUFHLEdBQUcsQ0FBQztRQUMxRCxDQUFDO0lBQ0gsQ0FBQztJQUNELE9BQU8sV0FBVyxDQUFDO0FBQ3JCLENBQUM7QUFFRCxTQUFTLFlBQVksQ0FBQyxNQUFXO0lBQy9CLE1BQU0sVUFBVSxHQUFRLEVBQUUsQ0FBQztJQUMzQixNQUFNLFdBQVcsR0FBUSxFQUFFLENBQUM7SUFFNUIsS0FBSyxNQUFNLENBQUMsR0FBRyxFQUFFLEtBQUssQ0FBQyxJQUFJLE1BQU0sQ0FBQyxPQUFPLENBQUMsTUFBTSxDQUFRLEVBQUUsQ0FBQztRQUN6RCxDQUFDLEtBQUssQ0FBQyxJQUFJLENBQUMsQ0FBQyxDQUFDLFdBQVcsQ0FBQyxDQUFDLENBQUMsVUFBVSxDQUFDLENBQUMsR0FBRyxDQUFDLEdBQUcsS0FBSyxDQUFDO0lBQ3ZELENBQUM7SUFFRCxPQUFPLElBQUksRUFBRSxDQUFDO1FBQ1osTUFBTSxJQUFJLEdBQUcsTUFBTSxDQUFDLElBQUksQ0FBQyxXQUFXLENBQUMsQ0FBQztRQUN0QyxJQUFJLElBQUksQ0FBQyxNQUFNLElBQUksQ0FBQztZQUNsQixNQUFNO1FBQ1IsTUFBTSxRQUFRLEdBQUcsRUFBRSxDQUFDO1FBQ3BCLEtBQUssTUFBTSxHQUFHLElBQUksSUFBSSxFQUFFLENBQUM7WUFDdkIsTUFBTSxTQUFTLEdBQUcsV0FBVyxDQUFDLEdBQUcsQ0FBQyxDQUFDO1lBQ25DLE1BQU0sUUFBUSxHQUFHLEVBQUUsQ0FBQztZQUNwQixLQUFLLE1BQU0sSUFBSSxJQUFJLCtEQUFZLENBQUMsU0FBUyxDQUFDLElBQUksQ0FBQyxFQUFFLENBQUM7Z0JBQ2hELE1BQU0sU0FBUyxHQUFHLFVBQVUsQ0FBQyxJQUFJLENBQUMsQ0FBQztnQkFDbkMsSUFBSSxDQUFDLFNBQVMsRUFBRSxDQUFDO29CQUNmLFFBQVEsQ0FBQyxNQUFNLEdBQUcsQ0FBQyxDQUFDO29CQUNwQixNQUFNO2dCQUNSLENBQUM7Z0JBQ0QsUUFBUSxDQUFDLElBQUksQ0FBQyxTQUFTLENBQUMsQ0FBQztZQUMzQixDQUFDO1lBQ0QsSUFBSSxRQUFRLENBQUMsTUFBTSxFQUFFLENBQUM7Z0JBQ3BCLFFBQVEsQ0FBQyxJQUFJLENBQUMsU0FBUyxDQUFDLENBQUM7Z0JBQ3pCLElBQUksUUFBUSxHQUFHLEVBQUUsQ0FBQztnQkFDbEIsS0FBSyxNQUFNLElBQUksSUFBSSxRQUFRLEVBQUUsQ0FBQztvQkFDNUIsK0RBQVksQ0FBQyxRQUFRLEVBQUUsSUFBSSxDQUFDLENBQUM7Z0JBQy9CLENBQUM7Z0JBQ0QsVUFBVSxDQUFDLEdBQUcsQ0FBQyxHQUFHLFFBQVEsQ0FBQztnQkFDM0IsUUFBUSxDQUFDLElBQUksQ0FBQyxHQUFHLENBQUMsQ0FBQztZQUNyQixDQUFDO1FBQ0gsQ0FBQztRQUNELElBQUksUUFBUSxDQUFDLE1BQU0sSUFBSSxDQUFDLEVBQUUsQ0FBQztZQUN6QixLQUFLLE1BQU0sR0FBRyxJQUFJLElBQUk7Z0JBQ3BCLE1BQU0sOEJBQThCLEdBQUcsRUFBRSxDQUFDO1FBQzlDLENBQUM7UUFDRCxLQUFLLE1BQU0sR0FBRyxJQUFJLFFBQVEsRUFBRSxDQUFDO1lBQzNCLE9BQU8sVUFBVSxDQUFDLEdBQUcsQ0FBQyxDQUFDLElBQUksQ0FBQztZQUM1QixPQUFPLFdBQVcsQ0FBQyxHQUFHLENBQUMsQ0FBQztRQUMxQixDQUFDO0lBQ0gsQ0FBQztJQUVELE9BQU8sVUFBVSxDQUFDO0FBQ3BCLENBQUM7QUFFRCxTQUFTLHlCQUF5QixDQUFDLE1BQVcsRUFBRSxXQUFnQixFQUFFLFVBQWUsRUFBRSxHQUFRO0lBQ3pGLE9BQU8sR0FBRyxDQUFDLE9BQU8sQ0FBQyxnQkFBZ0IsRUFBRSxDQUFDLEtBQVUsRUFBRSxLQUFVLEVBQUUsRUFBRTtRQUM5RCxJQUFJLEdBQUcsQ0FBQztRQUNSLEtBQUssTUFBTSxJQUFJLElBQUksS0FBSyxDQUFDLEtBQUssQ0FBQyxHQUFHLENBQUMsRUFBRSxDQUFDO1lBQ3BDLElBQUksR0FBRyxLQUFLLFNBQVMsRUFBRSxDQUFDO2dCQUN0QixJQUFJLE1BQU0sQ0FBQyxjQUFjLENBQUMsSUFBSSxDQUFDLEVBQUUsQ0FBQztvQkFDaEMsR0FBRyxHQUFHLE1BQU0sQ0FBQyxJQUFJLENBQUMsQ0FBQztnQkFDckIsQ0FBQztxQkFDSSxJQUFJLE1BQU0sS0FBSyxXQUFXLElBQUksV0FBVyxDQUFDLGNBQWMsQ0FBQyxJQUFJLENBQUMsRUFBRSxDQUFDO29CQUNwRSxHQUFHLEdBQUcsV0FBVyxDQUFDLElBQUksQ0FBQyxDQUFDO2dCQUMxQixDQUFDO3FCQUNJLElBQUksTUFBTSxLQUFLLFVBQVUsSUFBSSxVQUFVLENBQUMsY0FBYyxDQUFDLElBQUksQ0FBQyxFQUFFLENBQUM7b0JBQ2xFLEdBQUcsR0FBRyxVQUFVLENBQUMsSUFBSSxDQUFDLENBQUM7Z0JBQ3pCLENBQUM7cUJBQ0ksQ0FBQztvQkFDSixJQUFJLENBQUM7d0JBQ0gsTUFBTSxRQUFRLEdBQUcsOERBQWMsQ0FBQyxJQUFJLENBQUMsQ0FBQzt3QkFDdEMsSUFBSSxRQUFRLEVBQUUsQ0FBQzs0QkFDYixHQUFHLEdBQUcsRUFBRSxRQUFRLEVBQUUsT0FBTyxFQUFFLHNEQUFVLENBQUMsT0FBTyxDQUFDLFFBQVEsQ0FBQyxHQUFHLENBQUM7d0JBQzdELENBQUM7b0JBQ0gsQ0FBQztvQkFBQyxPQUFNLENBQUMsRUFBRSxDQUFDLEVBQUM7Z0JBQ2YsQ0FBQztnQkFDRCxJQUFJLEdBQUcsS0FBSyxTQUFTO29CQUNuQixNQUFNO1lBQ1YsQ0FBQztpQkFDSSxJQUFJLEdBQUcsQ0FBQyxjQUFjLENBQUMsSUFBSSxDQUFDLEVBQUUsQ0FBQztnQkFDbEMsR0FBRyxHQUFHLEdBQUcsQ0FBQyxJQUFJLENBQUMsQ0FBQztZQUNsQixDQUFDO2lCQUNJLENBQUM7Z0JBQ0osR0FBRyxHQUFHLFNBQVMsQ0FBQztnQkFDaEIsTUFBTTtZQUNSLENBQUM7UUFDSCxDQUFDO1FBQ0QsSUFBSSxHQUFHLEtBQUssU0FBUztZQUNuQixNQUFNLElBQUksS0FBSyxDQUFDLE9BQU8sS0FBSywyQkFBMkIsQ0FBQyxDQUFDO1FBQzNELE9BQU8sR0FBRyxDQUFDO0lBQ2IsQ0FBQyxDQUFDLENBQUM7QUFDTCxDQUFDO0FBRUQsU0FBUyx3QkFBd0IsQ0FBQyxNQUFXLEVBQUUsV0FBZ0IsRUFBRSxVQUFlO0lBQzlFLElBQUksS0FBSyxHQUFHLENBQUMsQ0FBQztJQUNkLEtBQUssTUFBTSxDQUFDLEdBQUcsRUFBRSxHQUFHLENBQUMsSUFBSSxNQUFNLENBQUMsT0FBTyxDQUFDLE1BQU0sQ0FBQyxFQUFFLENBQUM7UUFDaEQsSUFBSSxHQUFHLElBQUksT0FBTyxHQUFHLEtBQUssUUFBUTtZQUNoQyxLQUFLLElBQUksd0JBQXdCLENBQUMsR0FBRyxFQUFFLFdBQVcsRUFBRSxVQUFVLENBQUMsQ0FBQzthQUM3RCxJQUFJLE9BQU8sR0FBRyxLQUFLLFFBQVEsRUFBRSxDQUFDO1lBQ2pDLE1BQU0sQ0FBQyxHQUFHLHlCQUF5QixDQUFDLE1BQU0sRUFBRSxXQUFXLEVBQUUsVUFBVSxFQUFFLEdBQUcsQ0FBQyxDQUFDO1lBQzFFLElBQUksR0FBRyxLQUFLLENBQUMsRUFBRSxDQUFDO2dCQUNkLE1BQU0sQ0FBQyxHQUFHLENBQUMsR0FBRyxDQUFDLENBQUM7Z0JBQ2hCLEtBQUssRUFBRSxDQUFDO1lBQ1YsQ0FBQztRQUNILENBQUM7SUFDSCxDQUFDO0lBQ0QsT0FBTyxLQUFLLENBQUM7QUFDZixDQUFDO0FBRUQsU0FBUyxvQkFBb0IsQ0FBQyxNQUFXO0lBQ3ZDLFNBQVMsQ0FBQztRQUNSLElBQUksS0FBSyxHQUFHLENBQUMsQ0FBQztRQUNkLEtBQUssTUFBTSxDQUFDLEdBQUcsRUFBRSxHQUFHLENBQUMsSUFBSSxNQUFNLENBQUMsT0FBTyxDQUFDLE1BQU0sQ0FBQyxFQUFFLENBQUM7WUFDaEQsSUFBSSxHQUFHLElBQUksT0FBTyxHQUFHLEtBQUssUUFBUTtnQkFDaEMsS0FBSyxJQUFJLHdCQUF3QixDQUFDLEdBQUcsRUFBRSxHQUFHLEVBQUUsTUFBTSxDQUFDLENBQUM7aUJBQ2hELElBQUksT0FBTyxHQUFHLEtBQUssUUFBUSxFQUFFLENBQUM7Z0JBQ2xDLE1BQU0sQ0FBQyxHQUFHLHlCQUF5QixDQUFDLE1BQU0sRUFBRSxNQUFNLEVBQUUsTUFBTSxFQUFFLEdBQUcsQ0FBQyxDQUFDO2dCQUNqRSxJQUFJLEdBQUcsS0FBSyxDQUFDLEVBQUUsQ0FBQztvQkFDZCxNQUFNLENBQUMsR0FBRyxDQUFDLEdBQUcsQ0FBQyxDQUFDO29CQUNoQixLQUFLLEVBQUUsQ0FBQztnQkFDVixDQUFDO1lBQ0gsQ0FBQztRQUNILENBQUM7UUFDRCxJQUFJLENBQUMsS0FBSztZQUNSLE1BQU07SUFDVixDQUFDO0FBQ0gsQ0FBQztBQUVELFNBQVMsZUFBZSxDQUFDLEdBQVEsRUFBRSxNQUFXO0lBQzVDLEtBQUssTUFBTSxHQUFHLElBQUksQ0FBRSxZQUFZLEVBQUUsV0FBVyxDQUFFLEVBQUUsQ0FBQztRQUNoRCxJQUFJLE1BQU0sQ0FBQyxHQUFHLENBQUMsRUFBRSxDQUFDO1lBQ2hCLE1BQU0sSUFBSSxLQUFLLENBQUMsT0FBTyxHQUFHLG1DQUFtQyxNQUFNLENBQUMsVUFBVSxHQUFHLENBQUMsQ0FBQztRQUNyRixDQUFDO0lBQ0gsQ0FBQztJQUVELE1BQU0sVUFBVSxHQUFHLFlBQVksQ0FBQyxNQUFNLENBQUMsQ0FBQztJQUV4QyxVQUFVLENBQUMsU0FBUyxHQUFHLFVBQVUsQ0FBQyxTQUFTLElBQUksR0FBRyxDQUFDLFNBQVMsQ0FBQztJQUM3RCxVQUFVLENBQUMsVUFBVSxHQUFHLFVBQVUsQ0FBQyxVQUFVLElBQUksR0FBRyxDQUFDLE9BQU8sQ0FBQztJQUM3RCxVQUFVLENBQUMsVUFBVSxHQUFHLFVBQVUsQ0FBQyxVQUFVLElBQUksc0RBQVUsQ0FBQyxPQUFPLENBQUMsR0FBRyxDQUFDLE9BQU8sRUFBQyxPQUFPLENBQUMsQ0FBQztJQUV6RixLQUFLLE1BQU0sQ0FBQyxHQUFHLEVBQUUsS0FBSyxDQUFDLElBQUksTUFBTSxDQUFDLE9BQU8sQ0FBQyxVQUFVLENBQVEsRUFBRSxDQUFDO1FBQzdELElBQUksS0FBSyxJQUFJLE9BQU8sS0FBSyxLQUFLLFFBQVEsSUFBSSxLQUFLLENBQUMsTUFBTSxFQUFFLENBQUM7WUFDdkQsS0FBSyxDQUFDLFNBQVMsR0FBRyxLQUFLLENBQUMsU0FBUyxJQUFJLFVBQVUsQ0FBQyxTQUFTLENBQUM7WUFDMUQsTUFBTSxNQUFNLEdBQUcsR0FBRyxDQUFDLE9BQU8sQ0FBQyxHQUFHLEVBQUUsd0RBQVUsQ0FBQyxHQUFHLENBQUMsQ0FBQztZQUNoRCxNQUFNLE9BQU8sR0FBRyxzREFBVSxDQUFDLElBQUksQ0FBQyxVQUFVLENBQUMsVUFBVSxFQUFFLE1BQU0sQ0FBQyxDQUFDO1lBQy9ELEtBQUssQ0FBQyxPQUFPLEdBQUcsS0FBSyxDQUFDLE9BQU8sSUFBSSxzREFBVSxDQUFDLElBQUksQ0FBQyxPQUFPLEVBQUUsS0FBSyxDQUFDLENBQUM7WUFDakUsSUFBSSxLQUFLLENBQUMsU0FBUyxFQUFFLENBQUM7Z0JBQ3BCLEtBQUssQ0FBQyxVQUFVLEdBQUcsS0FBSyxDQUFDLFVBQVUsSUFBSSxzREFBVSxDQUFDLElBQUksQ0FBQyxPQUFPLEVBQUUsS0FBSyxDQUFDLENBQUM7Z0JBQ3ZFLEtBQUssQ0FBQyxVQUFVLEdBQUcsS0FBSyxDQUFDLFVBQVUsSUFBSSxzREFBVSxDQUFDLElBQUksQ0FBQyxPQUFPLEVBQUUsS0FBSyxDQUFDLENBQUM7Z0JBQ3ZFLElBQUksQ0FBQyxLQUFLLENBQUMsU0FBUztvQkFDbEIsS0FBSyxDQUFDLFNBQVMsR0FBRyxLQUFLLENBQUMsVUFBVSxDQUFDO3FCQUNoQyxJQUFJLENBQUMsMkRBQWUsQ0FBQyxLQUFLLENBQUMsU0FBUyxDQUFDO29CQUN4QyxLQUFLLENBQUMsU0FBUyxHQUFHLHNEQUFVLENBQUMsSUFBSSxDQUFDLEtBQUssQ0FBQyxVQUFVLEVBQUUsS0FBSyxDQUFDLFNBQVMsQ0FBQyxDQUFDO1lBQ3pFLENBQUM7aUJBQ0ksSUFBSSxDQUFDLEtBQUssQ0FBQyxTQUFTLEVBQUUsQ0FBQztnQkFDMUIsTUFBTSxJQUFJLEtBQUssQ0FBQyx5QkFBeUIsR0FBRyxVQUFVLENBQUMsQ0FBQztZQUMxRCxDQUFDO1lBQ0QsSUFBSSxLQUFLLENBQUMsU0FBUyxLQUFLLElBQUk7Z0JBQzFCLEtBQUssQ0FBQyxTQUFTLEdBQUcsS0FBSyxDQUFDLFNBQVMsQ0FBQztpQkFDL0IsSUFBSSxLQUFLLENBQUMsU0FBUyxLQUFLLFNBQVM7Z0JBQ3BDLEtBQUssQ0FBQyxTQUFTLEdBQUcsc0RBQVUsQ0FBQyxJQUFJLENBQUMsT0FBTyxFQUFFLEtBQUssQ0FBQyxDQUFDO1FBQ3RELENBQUM7SUFDSCxDQUFDO0lBRUQsb0JBQW9CLENBQUMsVUFBVSxDQUFDLENBQUM7SUFFakMsT0FBTyxVQUFVLENBQUM7QUFDcEIsQ0FBQztBQUVELEtBQUssVUFBVSxhQUFhLENBQUMsU0FBaUIsRUFBRSxPQUFlLEVBQUUsUUFBZ0I7SUFDL0UsU0FBUSxDQUFDO1FBQ1AsSUFBSSxDQUFDO1lBQ0gsTUFBTSxNQUFNLEdBQUcsTUFBTSwrREFBVSxDQUFDLFNBQVMsQ0FBQyxDQUFDO1lBQzNDLE1BQU0sdURBQVcsQ0FBQyxTQUFTLENBQUMsT0FBTyxFQUFFLE1BQU0sQ0FBQyxDQUFDO1lBQzdDLE9BQU87UUFDVCxDQUFDO1FBQ0QsT0FBTyxDQUFDLEVBQUUsQ0FBQztZQUNULElBQUksRUFBRSxRQUFRLEdBQUcsQ0FBQyxFQUFFLENBQUM7Z0JBQ25CLE1BQU0sQ0FBQyxDQUFDO1lBQ1YsQ0FBQztZQUNELE9BQU8sQ0FBQyxJQUFJLENBQUMsQ0FBQyxDQUFDLENBQUM7UUFDbEIsQ0FBQztJQUNILENBQUM7QUFDSCxDQUFDO0FBRUQsS0FBSyxVQUFVLGdCQUFnQixDQUFDLEdBQXFCLEVBQUUsV0FBZ0IsRUFBRSxNQUFXLEVBQUUsUUFBYTtJQUVqRyxJQUFJLENBQUMsTUFBTSxDQUFDLFNBQVM7UUFDbkIsTUFBTSxJQUFJLEtBQUssQ0FBQyxtQkFBbUIsQ0FBQyxDQUFDO0lBQ3ZDLElBQUksQ0FBQyxNQUFNLENBQUMsVUFBVTtRQUNwQixNQUFNLElBQUksS0FBSyxDQUFDLG9CQUFvQixDQUFDLENBQUM7SUFDeEMsSUFBSSxDQUFDLE1BQU0sQ0FBQyxVQUFVO1FBQ3BCLE1BQU0sSUFBSSxLQUFLLENBQUMsb0JBQW9CLENBQUMsQ0FBQztJQUV4QyxJQUFJLENBQUMsTUFBTSxrRUFBZSxDQUFDLE1BQU0sQ0FBQyxVQUFVLENBQUMsRUFBRSxDQUFDO1FBQzlDLE9BQU8sQ0FBQyxHQUFHLENBQUMsWUFBWSxNQUFNLENBQUMsVUFBVSxFQUFFLENBQUMsQ0FBQztRQUM3QyxNQUFNLHVEQUFXLENBQUMsS0FBSyxDQUFDLE1BQU0sQ0FBQyxVQUFVLEVBQUUsRUFBRSxTQUFTLEVBQUUsSUFBSSxFQUFFLENBQUMsQ0FBQztJQUNsRSxDQUFDO0lBRUQsSUFBSSxDQUFDLE1BQU0sa0VBQWUsQ0FBQyxNQUFNLENBQUMsT0FBTyxDQUFDLEVBQUUsQ0FBQztRQUMzQyxPQUFPLENBQUMsR0FBRyxDQUFDLFlBQVksTUFBTSxDQUFDLE9BQU8sRUFBRSxDQUFDLENBQUM7UUFDMUMsTUFBTSx1REFBVyxDQUFDLEtBQUssQ0FBQyxNQUFNLENBQUMsT0FBTyxFQUFFLEVBQUUsU0FBUyxFQUFFLElBQUksRUFBRSxDQUFDLENBQUM7SUFDL0QsQ0FBQztJQUVELE1BQU0sT0FBTyxHQUFHLHlEQUFhLENBQUMsTUFBTSxDQUFDLFNBQVMsQ0FBQyxDQUFDO0lBRWhELElBQUksT0FBTyxDQUFDO0lBQ1osSUFBSSxZQUFZLEdBQUcsTUFBTSxRQUFRLENBQUMsR0FBRyxDQUFDLGNBQWMsQ0FBQyxJQUFJLEVBQUUsQ0FBQztJQUM1RCxJQUFJLFlBQVksQ0FBQyxNQUFNLENBQUMsU0FBUyxDQUFDO1FBQ2hDLE9BQU8sR0FBRyxZQUFZLENBQUMsTUFBTSxDQUFDLFNBQVMsQ0FBQyxDQUFDO1NBQ3RDLENBQUM7UUFDSixPQUFPLEdBQUcscURBQVMsQ0FBQyxNQUFNLENBQUMsVUFBVSxFQUFFLE9BQU8sQ0FBQyxDQUFDO1FBQ2hELE1BQU0sYUFBYSxDQUFDLE1BQU0sQ0FBQyxTQUFTLEVBQUUsT0FBTyxFQUFFLHlEQUFnQixDQUFDLENBQUM7UUFDakUsWUFBWSxDQUFDLE1BQU0sQ0FBQyxTQUFTLENBQUMsR0FBRyxPQUFPLENBQUM7UUFDekMsTUFBTSxRQUFRLENBQUMsR0FBRyxDQUFDLGNBQWMsRUFBRSxZQUFZLENBQUMsQ0FBQztJQUNuRCxDQUFDO0lBRUQsSUFBSSxVQUFVLENBQUM7SUFDZixJQUFJLFlBQVksR0FBRyxNQUFNLFFBQVEsQ0FBQyxHQUFHLENBQUMsY0FBYyxDQUFDLElBQUksRUFBRSxDQUFDO0lBQzVELElBQUksWUFBWSxDQUFDLE9BQU8sQ0FBQyxFQUFFLENBQUM7UUFDMUIsVUFBVSxHQUFHLFlBQVksQ0FBQyxPQUFPLENBQUMsQ0FBQztJQUNyQyxDQUFDO1NBQ0ksQ0FBQztRQUNKLFVBQVUsR0FBRyxNQUFNLHVEQUFXLENBQUMsT0FBTyxDQUFDLHdEQUFZLENBQUMsTUFBTSxDQUFDLE9BQU8sRUFBRSxPQUFPLEdBQUcsR0FBRyxDQUFDLENBQUMsQ0FBQztRQUVwRixNQUFNLHNEQUFhLENBQUM7WUFDbEIsV0FBVztZQUNYLFFBQVEsRUFBRSxPQUFPO1lBQ2pCLE9BQU8sRUFBRSxVQUFVO1lBQ25CLE9BQU8sRUFBRyxxREFBUyxDQUFDLE1BQU0sQ0FBQyxPQUFPLEVBQUUseURBQWEsQ0FBQyxVQUFVLENBQUMsR0FBRyxNQUFNLENBQUM7U0FDeEUsQ0FBQyxDQUFDO1FBRUgsTUFBTSxXQUFXLEdBQUcsTUFBTSx1REFBVyxDQUFDLE9BQU8sQ0FBQyxVQUFVLENBQUMsQ0FBQztRQUMxRCxJQUFJLFdBQVcsQ0FBQyxNQUFNLEtBQUssQ0FBQyxFQUFFLENBQUM7WUFDN0IsVUFBVSxHQUFHLHdEQUFZLENBQUMsVUFBVSxFQUFFLFdBQVcsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDO1lBQ3RELElBQUksQ0FBQyxNQUFNLGtFQUFlLENBQUMsVUFBVSxDQUFDLEVBQUUsQ0FBQztnQkFDdkMsT0FBTyxDQUFDLEdBQUcsQ0FBQyxVQUFVLFVBQVUsRUFBRSxDQUFDLENBQUM7Z0JBQ3BDLE1BQU0sdURBQVcsQ0FBQyxFQUFFLENBQUMsVUFBVSxFQUFFLEVBQUUsU0FBUyxFQUFFLElBQUksRUFBRSxDQUFDLENBQUM7Z0JBQ3RELE1BQU0sSUFBSSxLQUFLLENBQUMsb0NBQW9DLENBQUMsQ0FBQztZQUN4RCxDQUFDO1FBQ0gsQ0FBQztRQUVELElBQUksTUFBTSxrRUFBZSxDQUFDLE1BQU0sQ0FBQyxVQUFVLENBQUMsRUFBRSxDQUFDO1lBQzdDLHFDQUFxQztZQUNyQyxPQUFPLENBQUMsR0FBRyxDQUFDLFVBQVUsTUFBTSxDQUFDLFVBQVUsRUFBRSxDQUFDLENBQUM7WUFDM0MsTUFBTSx1REFBVyxDQUFDLEVBQUUsQ0FBQyxNQUFNLENBQUMsVUFBVSxFQUFFLEVBQUUsU0FBUyxFQUFFLElBQUksRUFBRSxDQUFDLENBQUM7UUFDL0QsQ0FBQzthQUNJLENBQUM7WUFDSixNQUFNLFNBQVMsR0FBRyx3REFBWSxDQUFDLE1BQU0sQ0FBQyxVQUFVLENBQUMsQ0FBQztZQUNsRCxJQUFJLENBQUMsTUFBTSxrRUFBZSxDQUFDLFNBQVMsQ0FBQyxFQUFFLENBQUM7Z0JBQ3RDLE9BQU8sQ0FBQyxHQUFHLENBQUMsWUFBWSxTQUFTLEVBQUUsQ0FBQyxDQUFDO2dCQUNyQyxNQUFNLHVEQUFXLENBQUMsS0FBSyxDQUFDLFNBQVMsRUFBRSxFQUFFLFNBQVMsRUFBRSxJQUFJLEVBQUUsQ0FBQyxDQUFDO1lBQzFELENBQUM7UUFDSCxDQUFDO1FBRUQsT0FBTyxDQUFDLEdBQUcsQ0FBQyxNQUFNLFVBQVUsSUFBSSxNQUFNLENBQUMsVUFBVSxFQUFFLENBQUMsQ0FBQztRQUNyRCxNQUFNLHVEQUFXLENBQUMsTUFBTSxDQUFDLFVBQVUsRUFBRSxNQUFNLENBQUMsVUFBVSxDQUFDLENBQUM7UUFFeEQsWUFBWSxDQUFDLE9BQU8sQ0FBQyxHQUFHLFVBQVUsQ0FBQztRQUNuQyxNQUFNLFFBQVEsQ0FBQyxHQUFHLENBQUMsY0FBYyxFQUFFLFlBQVksQ0FBQyxDQUFDO0lBQ25ELENBQUM7SUFFRCxJQUFJLE1BQU0sQ0FBQyxRQUFRLEVBQUUsQ0FBQztRQUNwQixJQUFJLFNBQVMsR0FBRyxNQUFNLFFBQVEsQ0FBQyxHQUFHLENBQUMsV0FBVyxDQUFDLElBQUksRUFBRSxDQUFDO1FBQ3RELElBQUksQ0FBQyxTQUFTLENBQUMsTUFBTSxDQUFDLFFBQVEsQ0FBQyxFQUFFLENBQUM7WUFDaEMsTUFBTSwyREFBUyxDQUFDLE1BQU0sQ0FBQyxRQUFRLEVBQUUsTUFBTSxDQUFDLFVBQVUsQ0FBQyxDQUFDO1lBQ3BELFNBQVMsQ0FBQyxNQUFNLENBQUMsUUFBUSxDQUFDLEdBQUcsTUFBTSxDQUFDLFVBQVUsQ0FBQztZQUMvQyxNQUFNLFFBQVEsQ0FBQyxHQUFHLENBQUMsV0FBVyxFQUFFLFNBQVMsQ0FBQyxDQUFDO1FBQzdDLENBQUM7SUFDSCxDQUFDO0FBQ0gsQ0FBQztBQUVELE1BQU0sY0FBYyxHQUFRO0lBQzFCLElBQUksRUFBRSxLQUFLLEVBQUUsTUFBVyxFQUFFLFdBQWdCLEVBQUUsUUFBYSxFQUFFLEVBQUU7UUFDM0QsZ0JBQWdCO0lBQ2xCLENBQUM7SUFDRCxLQUFLLEVBQUUsS0FBSyxFQUFFLE1BQVcsRUFBRSxXQUFnQixFQUFFLFFBQWEsRUFBRSxFQUFFO1FBQzVELE1BQU0sU0FBUyxHQUFHLGdFQUFhLENBQUMsTUFBTSxDQUFDLFNBQVMsQ0FBQyxDQUFDO1FBQ2xELE1BQU0sU0FBUyxHQUFHLGdFQUFhLENBQUMsTUFBTSxDQUFDLFNBQVMsQ0FBQyxDQUFDO1FBQ2xELE1BQU0sU0FBUyxHQUFHO1lBQ2hCLFdBQVcsRUFBRTtnQkFDWCxHQUFHLFdBQVc7Z0JBQ2QsT0FBTyxFQUFFLE1BQU0sQ0FBQyxPQUFPO2FBQ3hCO1lBQ0QsU0FBUyxFQUFFLE1BQU0sQ0FBQyxTQUFTLElBQUksOENBQUssQ0FBQyxpQkFBaUI7WUFDdEQsY0FBYyxFQUFFLE1BQU0sQ0FBQyxjQUFjO1lBQ3JDLFNBQVM7WUFDVCxTQUFTO1NBQ1YsQ0FBQztRQUVGLElBQUksQ0FBQyxTQUFTLENBQUMsY0FBYyxDQUFDLGdCQUFnQixFQUFFLENBQUM7WUFDL0MsU0FBUyxDQUFDLGNBQWMsQ0FBQyxnQkFBZ0IsR0FBRyxNQUFNLENBQUMsU0FBUyxDQUFDO1FBQy9ELENBQUM7UUFFRCxNQUFNLHdEQUFlLENBQUMsU0FBUyxDQUFDLENBQUM7UUFDakMsTUFBTSxvREFBVyxDQUFDLFNBQVMsQ0FBQyxDQUFDO1FBQzdCLE1BQU0sc0RBQWEsQ0FBQyxTQUFTLENBQUMsQ0FBQztJQUNqQyxDQUFDO0lBQ0QsU0FBUyxFQUFFLEtBQUssRUFBRSxNQUFXLEVBQUUsV0FBZ0IsRUFBRSxRQUFhLEVBQUUsRUFBRTtRQUNoRSxNQUFNLFNBQVMsR0FBRyxnRUFBYSxDQUFDLE1BQU0sQ0FBQyxTQUFTLENBQUMsQ0FBQztRQUNsRCxNQUFNLFNBQVMsR0FBRyxnRUFBYSxDQUFDLE1BQU0sQ0FBQyxTQUFTLENBQUMsQ0FBQztRQUNsRCxJQUFJLElBQUksR0FBRyxNQUFNLFFBQVEsQ0FBQyxHQUFHLENBQUMsV0FBVyxDQUFDLElBQUksUUFBUSxDQUFDO1FBQ3ZELElBQUksSUFBSSxLQUFLLFFBQVEsRUFBRSxDQUFDO1lBQ3RCLE1BQU0sT0FBTyxHQUFHLHdEQUFZLENBQUMsU0FBUyxFQUFFLFdBQVcsQ0FBQyxDQUFDO1lBQ3JELE1BQU0sTUFBTSxHQUFHLEVBQUUsQ0FBQztZQUNsQixJQUFJLEtBQUssQ0FBQyxPQUFPLENBQUMsTUFBTSxDQUFDLFNBQVMsQ0FBQyxFQUFFLENBQUM7Z0JBQ3BDLEtBQUssTUFBTSxJQUFJLElBQUksTUFBTSxDQUFDLFNBQVM7b0JBQ2pDLE1BQU0sQ0FBQyxJQUFJLENBQUMsSUFBSSxDQUFDLENBQUM7WUFDdEIsQ0FBQztpQkFDSSxJQUFJLE1BQU0sQ0FBQyxTQUFTLEVBQUUsQ0FBQztnQkFDMUIsS0FBSyxNQUFNLENBQUMsR0FBRyxFQUFDLEdBQUcsQ0FBQyxJQUFJLE1BQU0sQ0FBQyxPQUFPLENBQUMsTUFBTSxDQUFDLFNBQVMsQ0FBQyxFQUFFLENBQUM7b0JBQ3pELElBQUksR0FBRyxLQUFLLFVBQVUsSUFBSSxLQUFLLENBQUMsT0FBTyxDQUFDLEdBQUcsQ0FBQyxFQUFFLENBQUM7d0JBQzdDLEtBQUssTUFBTSxJQUFJLElBQUksR0FBRzs0QkFDcEIsTUFBTSxDQUFDLElBQUksQ0FBQyxLQUFLLElBQUksRUFBRSxDQUFDLENBQUM7b0JBQzdCLENBQUM7eUJBQ0ksSUFBSSxHQUFHLEtBQUssSUFBSTt3QkFDbkIsTUFBTSxDQUFDLElBQUksQ0FBQyxLQUFLLEdBQUcsRUFBRSxDQUFDLENBQUM7O3dCQUV4QixNQUFNLENBQUMsSUFBSSxDQUFDLEtBQUssR0FBRyxJQUFJLEdBQUcsRUFBRSxDQUFDLENBQUM7Z0JBQ25DLENBQUM7WUFDSCxDQUFDO1lBQ0QsSUFBSSxNQUFNLENBQUMsUUFBUSxFQUFFLENBQUM7Z0JBQ3BCLEtBQUssTUFBTSxHQUFHLElBQUksTUFBTSxDQUFDLFFBQVE7b0JBQy9CLE1BQU0sQ0FBQyxJQUFJLENBQUMsS0FBSyxHQUFHLEVBQUUsQ0FBQyxDQUFDO1lBQzVCLENBQUM7WUFDRCxNQUFNLElBQUksR0FBRyxNQUFNLCtEQUFVLENBQUMsT0FBTyxFQUFFLE1BQU0sRUFBRTtnQkFDN0MsR0FBRyxFQUFFLFNBQVM7Z0JBQ2QsR0FBRyxFQUFFLFdBQVc7Z0JBQ2hCLEtBQUssRUFBRTtvQkFDTCxNQUFNLEVBQUUsZUFBZTtpQkFDeEI7YUFDRixDQUFDLENBQUM7WUFDSCxJQUFJLElBQUksQ0FBQyxNQUFNLEtBQUssQ0FBQyxFQUFFLENBQUM7Z0JBQ3RCLE1BQU0sSUFBSSxLQUFLLENBQUMsNkJBQTZCLElBQUksQ0FBQyxNQUFNLEVBQUUsQ0FBQyxDQUFDO1lBQzlELENBQUM7WUFDRCxJQUFJLEdBQUcsU0FBUyxDQUFDO1lBQ2pCLE1BQU0sUUFBUSxDQUFDLEdBQUcsQ0FBQyxXQUFXLEVBQUUsSUFBSSxDQUFDLENBQUM7UUFDeEMsQ0FBQztRQUNELElBQUksSUFBSSxLQUFLLFNBQVMsRUFBRSxDQUFDO1lBQ3ZCLE1BQU0sSUFBSSxHQUFHLENBQUUsU0FBUyxDQUFFLENBQUM7WUFDM0IsSUFBSSxNQUFNLENBQUMsT0FBTyxFQUFFLENBQUM7Z0JBQ25CLElBQUksQ0FBQyxJQUFJLENBQUMsV0FBVyxNQUFNLENBQUMsT0FBTyxFQUFFLENBQUMsQ0FBQztZQUN6QyxDQUFDO1lBQ0QsTUFBTSxJQUFJLEdBQUcsTUFBTSwrREFBVSxDQUFDLE1BQU0sRUFBRSxJQUFJLEVBQUU7Z0JBQzFDLEdBQUcsRUFBRSxTQUFTO2dCQUNkLEdBQUcsRUFBRSxXQUFXO2dCQUNoQixLQUFLLEVBQUU7b0JBQ0wsTUFBTSxFQUFFLGNBQWM7aUJBQ3ZCO2FBQ0YsQ0FBQyxDQUFDO1lBQ0gsSUFBSSxJQUFJLENBQUMsTUFBTSxLQUFLLENBQUMsRUFBRSxDQUFDO2dCQUN0QixNQUFNLElBQUksS0FBSyxDQUFDLHdCQUF3QixJQUFJLENBQUMsTUFBTSxFQUFFLENBQUMsQ0FBQztZQUN6RCxDQUFDO1lBQ0QsSUFBSSxHQUFHLE1BQU0sQ0FBQztZQUNkLE1BQU0sUUFBUSxDQUFDLEdBQUcsQ0FBQyxXQUFXLEVBQUUsSUFBSSxDQUFDLENBQUM7UUFDeEMsQ0FBQztJQUNILENBQUM7SUFDRCxJQUFJLEVBQUUsS0FBSyxFQUFFLE1BQVcsRUFBRSxXQUFnQixFQUFFLFFBQWEsRUFBRSxFQUFFO1FBQzNELE1BQU0sU0FBUyxHQUFHLGdFQUFhLENBQUMsTUFBTSxDQUFDLFNBQVMsQ0FBQyxDQUFDO1FBQ2xELE1BQU0sSUFBSSxHQUFHLE1BQU0sQ0FBQyxJQUFJLElBQUksRUFBRSxDQUFDO1FBQy9CLElBQUksTUFBTSxDQUFDLE9BQU8sRUFBRSxDQUFDO1lBQ25CLElBQUksQ0FBQyxJQUFJLENBQUMsV0FBVyxNQUFNLENBQUMsT0FBTyxFQUFFLENBQUMsQ0FBQztRQUN6QyxDQUFDO1FBQ0QsTUFBTSxJQUFJLEdBQUcsTUFBTSwrREFBVSxDQUFDLE1BQU0sRUFBRSxJQUFJLEVBQUU7WUFDMUMsR0FBRyxFQUFFLFNBQVM7WUFDZCxHQUFHLEVBQUUsV0FBVztZQUNoQixLQUFLLEVBQUU7Z0JBQ0wsTUFBTSxFQUFFLFVBQVU7YUFDbkI7U0FDRixDQUFDLENBQUM7UUFDSCxJQUFJLElBQUksQ0FBQyxNQUFNLEtBQUssQ0FBQyxFQUFFLENBQUM7WUFDdEIsTUFBTSxJQUFJLEtBQUssQ0FBQyx3QkFBd0IsSUFBSSxDQUFDLE1BQU0sRUFBRSxDQUFDLENBQUM7UUFDekQsQ0FBQztJQUNILENBQUM7SUFDRCxPQUFPLEVBQUUsS0FBSyxFQUFFLE1BQVcsRUFBRSxXQUFnQixFQUFFLFFBQWEsRUFBRSxFQUFFO1FBQzlELElBQUksQ0FBQyxNQUFNLENBQUMsT0FBTztZQUNqQixNQUFNLElBQUksS0FBSyxDQUFDLDJDQUEyQyxDQUFDLENBQUM7UUFDL0QsTUFBTSxTQUFTLEdBQUcsZ0VBQWEsQ0FBQyxNQUFNLENBQUMsU0FBUyxDQUFDLENBQUM7UUFDbEQsTUFBTSxTQUFTLEdBQUcsZ0VBQWEsQ0FBQyxNQUFNLENBQUMsU0FBUyxDQUFDLENBQUM7UUFDbEQsSUFBSSxFQUFFLE9BQU8sRUFBRSxHQUFHLE1BQU0sQ0FBQztRQUN6QixJQUFJLENBQUMsMkRBQWUsQ0FBQyxPQUFPLENBQUMsSUFBSSxDQUFDLE9BQU8sQ0FBQyxRQUFRLENBQUMsd0RBQVUsQ0FBQyxTQUFTLENBQUMsSUFBSSxPQUFPLENBQUMsUUFBUSxDQUFDLHdEQUFVLENBQUMsU0FBUyxDQUFDLENBQUMsRUFBRSxDQUFDO1lBQ3BILE9BQU8sR0FBRyx3REFBWSxDQUFDLFNBQVMsRUFBRSxPQUFPLENBQUMsQ0FBQztRQUM3QyxDQUFDO1FBQ0QsTUFBTSxHQUFHLEdBQUcsTUFBTSwrREFBVSxDQUFDLE9BQU8sRUFBRSxNQUFNLENBQUMsSUFBSSxJQUFJLEVBQUUsRUFBRTtZQUN2RCxHQUFHLEVBQUUsU0FBUztZQUNkLEdBQUcsRUFBRSxXQUFXO1lBQ2hCLEtBQUssRUFBRTtnQkFDTCxNQUFNLEVBQUUsYUFBYTthQUN0QjtTQUNGLENBQUMsQ0FBQztRQUNILElBQUksR0FBRyxDQUFDLE1BQU0sS0FBSyxDQUFDLEVBQUUsQ0FBQztZQUNyQixNQUFNLElBQUksS0FBSyxDQUFDLDJCQUEyQixHQUFHLENBQUMsTUFBTSxFQUFFLENBQUMsQ0FBQztRQUMzRCxDQUFDO0lBQ0gsQ0FBQztJQUNELE9BQU8sRUFBRSwrREFBZ0I7Q0FDMUIsQ0FBQztBQUVGLEtBQUssVUFBVSxhQUFhLENBQUMsR0FBcUIsRUFBRSxXQUFnQixFQUFFLE1BQVcsRUFBRSxRQUFhO0lBQzlGLElBQUksTUFBTSxDQUFDLFNBQVMsRUFBRSxDQUFDO1FBQ3JCLE1BQU0sUUFBUSxDQUFDLElBQUksQ0FBQyxXQUFXLENBQUMsQ0FBQztRQUNqQyxNQUFNLFNBQVMsR0FBUSxFQUFFLENBQUM7UUFDMUIsK0RBQVksQ0FBQyxTQUFTLEVBQUUsTUFBTSxDQUFDLENBQUM7UUFDaEMsT0FBTyxTQUFTLENBQUMsTUFBTSxDQUFDO1FBQ3hCLE9BQU8sU0FBUyxDQUFDLFNBQVMsQ0FBQztRQUMzQixPQUFPLFNBQVMsQ0FBQyxVQUFVLENBQUM7UUFDNUIsK0RBQVksQ0FBQyxTQUFTLEVBQUUsTUFBTSxDQUFDLFNBQVMsQ0FBQyxDQUFDO1FBQzFDLE1BQU0sY0FBYyxHQUFHLGdCQUFnQixDQUFDLE1BQU0sQ0FBQyxTQUFTLENBQUMsV0FBVyxFQUFFLFdBQVcsQ0FBQyxDQUFDO1FBQ25GLE1BQU0sYUFBYSxDQUFDLEdBQUcsRUFBRSxjQUFjLEVBQUUsU0FBUyxFQUFFLFFBQVEsQ0FBQyxDQUFDO1FBQzlELE1BQU0sUUFBUSxDQUFDLEdBQUcsRUFBRSxDQUFDO0lBQ3ZCLENBQUM7SUFFRCxJQUFJLEtBQUssQ0FBQyxPQUFPLENBQUMsTUFBTSxDQUFDLE1BQU0sQ0FBQyxFQUFFLENBQUM7UUFDakMsTUFBTSxRQUFRLENBQUMsSUFBSSxDQUFDLFFBQVEsQ0FBQyxDQUFDO1FBQzlCLEtBQUssSUFBSSxDQUFDLEdBQUcsQ0FBQyxFQUFFLENBQUMsR0FBRyxNQUFNLENBQUMsTUFBTSxDQUFDLE1BQU0sRUFBRSxFQUFFLENBQUMsRUFBRSxDQUFDO1lBQzlDLE1BQU0sUUFBUSxDQUFDLElBQUksQ0FBQyxDQUFDLENBQUMsQ0FBQztZQUN2QixNQUFNLFNBQVMsR0FBUSxFQUFFLENBQUM7WUFDMUIsK0RBQVksQ0FBQyxTQUFTLEVBQUUsTUFBTSxDQUFDLENBQUM7WUFDaEMsT0FBTyxTQUFTLENBQUMsTUFBTSxDQUFDO1lBQ3hCLE9BQU8sU0FBUyxDQUFDLFNBQVMsQ0FBQztZQUMzQixPQUFPLFNBQVMsQ0FBQyxVQUFVLENBQUM7WUFDNUIsK0RBQVksQ0FBQyxTQUFTLEVBQUUsTUFBTSxDQUFDLE1BQU0sQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDO1lBQzFDLE1BQU0sY0FBYyxHQUFHLGdCQUFnQixDQUFDLE1BQU0sQ0FBQyxNQUFNLENBQUMsQ0FBQyxDQUFDLENBQUMsV0FBVyxFQUFFLFdBQVcsQ0FBQyxDQUFDO1lBQ25GLE1BQU0sYUFBYSxDQUFDLEdBQUcsRUFBRSxjQUFjLEVBQUUsU0FBUyxFQUFFLFFBQVEsQ0FBQyxDQUFDO1lBQzlELE1BQU0sUUFBUSxDQUFDLEdBQUcsRUFBRSxDQUFDO1FBQ3ZCLENBQUM7UUFDRCxNQUFNLFFBQVEsQ0FBQyxHQUFHLEVBQUUsQ0FBQztJQUN2QixDQUFDO1NBQ0ksQ0FBQztRQUNKLElBQUksQ0FBQyxNQUFNLGtFQUFlLENBQUMsTUFBTSxDQUFDLFNBQVMsQ0FBQyxFQUFFLENBQUM7WUFDN0MsTUFBTSx1REFBVyxDQUFDLEtBQUssQ0FBQyxNQUFNLENBQUMsU0FBUyxFQUFFLEVBQUUsU0FBUyxFQUFFLElBQUksRUFBRSxDQUFDLENBQUM7UUFDakUsQ0FBQztRQUNELElBQUksY0FBYyxDQUFDLE1BQU0sQ0FBQyxNQUFNLENBQUMsRUFBRSxDQUFDO1lBQ2xDLE1BQU0sQ0FBQyxXQUFXLElBQUksT0FBTyxDQUFDLEdBQUcsQ0FBQyxNQUFNLENBQUMsV0FBVyxDQUFDLENBQUM7WUFDdEQsTUFBTSxjQUFjLENBQUMsTUFBTSxDQUFDLE1BQU0sQ0FBQyxDQUFDLE1BQU0sRUFBRSxXQUFXLEVBQUUsUUFBUSxDQUFDLENBQUM7UUFDckUsQ0FBQztJQUNILENBQUM7SUFFRCxJQUFJLE1BQU0sQ0FBQyxVQUFVLEVBQUUsQ0FBQztRQUN0QixNQUFNLFFBQVEsQ0FBQyxJQUFJLENBQUMsWUFBWSxDQUFDLENBQUM7UUFDbEMsTUFBTSxTQUFTLEdBQVEsRUFBRSxDQUFDO1FBQzFCLCtEQUFZLENBQUMsU0FBUyxFQUFFLE1BQU0sQ0FBQyxDQUFDO1FBQ2hDLE9BQU8sU0FBUyxDQUFDLE1BQU0sQ0FBQztRQUN4QixPQUFPLFNBQVMsQ0FBQyxTQUFTLENBQUM7UUFDM0IsT0FBTyxTQUFTLENBQUMsVUFBVSxDQUFDO1FBQzVCLCtEQUFZLENBQUMsU0FBUyxFQUFFLE1BQU0sQ0FBQyxVQUFVLENBQUMsQ0FBQztRQUMzQyxNQUFNLGNBQWMsR0FBRyxnQkFBZ0IsQ0FBQyxNQUFNLENBQUMsVUFBVSxDQUFDLFdBQVcsRUFBRSxXQUFXLENBQUMsQ0FBQztRQUNwRixNQUFNLGFBQWEsQ0FBQyxHQUFHLEVBQUUsY0FBYyxFQUFFLFNBQVMsRUFBRSxRQUFRLENBQUMsQ0FBQztRQUM5RCxNQUFNLFFBQVEsQ0FBQyxHQUFHLEVBQUUsQ0FBQztJQUN2QixDQUFDO0FBQ0gsQ0FBQztBQUVELEtBQUssVUFBVSxhQUFhLENBQUMsT0FBeUI7SUFDcEQsSUFBSSxVQUFVLENBQUM7SUFDZixJQUFJLE9BQU8sQ0FBQyxHQUFHLENBQUMsTUFBTSxFQUFFLENBQUM7UUFDdkIsVUFBVSxHQUFHLDJEQUFlLENBQUMsT0FBTyxDQUFDLEdBQUcsQ0FBQyxNQUFNLENBQUMsQ0FBQyxDQUFDLENBQUMsT0FBTyxDQUFDLEdBQUcsQ0FBQyxNQUFNLENBQUMsQ0FBQyxDQUFDLHdEQUFZLENBQUMsT0FBTyxDQUFDLE9BQU8sRUFBRSxPQUFPLENBQUMsR0FBRyxDQUFDLE1BQU0sQ0FBQyxDQUFDO1FBQzFILElBQUksQ0FBQyxNQUFNLDZEQUFVLENBQUMsVUFBVSxDQUFDO1lBQy9CLE1BQU0sa0JBQWtCLE9BQU8sQ0FBQyxHQUFHLENBQUMsTUFBTSx1QkFBdUIsQ0FBQztJQUN0RSxDQUFDO1NBQ0ksQ0FBQztRQUNKLE1BQU0sY0FBYyxHQUFHLHdEQUFZLENBQUMsT0FBTyxDQUFDLE9BQU8sRUFBRSxvREFBVyxDQUFDLENBQUM7UUFDbEUsSUFBSSxNQUFNLDZEQUFVLENBQUMsY0FBYyxDQUFDO1lBQ2xDLFVBQVUsR0FBRyxjQUFjLENBQUM7YUFDekIsQ0FBQztZQUNKLE1BQU0sQ0FBQyxJQUFJLENBQUMsZ0JBQWdCLG9EQUFXLG9CQUFvQixDQUFDLENBQUM7UUFDL0QsQ0FBQztJQUNILENBQUM7SUFFRCxJQUFJLENBQUMsVUFBVSxFQUFFLENBQUM7UUFDaEIsT0FBTztZQUNMLGVBQWUsRUFBRTtnQkFDZixNQUFNLEVBQUUsU0FBUztnQkFDakIsU0FBUyxFQUFFO29CQUNULGNBQWMsRUFBRSxNQUFNO2lCQUN2QjtnQkFDRCxTQUFTLEVBQUUsZUFBZTtnQkFDMUIsT0FBTyxFQUFFLHNCQUFzQjthQUNoQztTQUNGLENBQUM7SUFDSixDQUFDO0lBRUQsTUFBTSxTQUFTLEdBQUcsNkRBQWlCLENBQUMsVUFBVSxDQUFDLENBQUM7SUFDaEQsTUFBTSxZQUFZLEdBQUcsTUFBTSw0REFBWSxDQUFDLFNBQVMsQ0FBQyxDQUFDO0lBQ25ELFFBQVEsT0FBTyxZQUFZLENBQUMsT0FBTyxFQUFFLENBQUM7UUFDdEMsS0FBSyxVQUFVO1lBQ2IsTUFBTSxVQUFVLEdBQUcsWUFBWSxDQUFDLE9BQU8sQ0FBQyxPQUFPLENBQUMsR0FBRyxFQUFFLEVBQUUsQ0FBQyxDQUFDO1lBQ3pELElBQUksVUFBVSxZQUFZLE9BQU87Z0JBQy9CLE9BQU8sTUFBTSxVQUFVLENBQUM7WUFDMUIsT0FBTyxVQUFVLENBQUM7UUFFcEIsS0FBSyxRQUFRO1lBQ1gsT0FBTyxZQUFZLENBQUMsT0FBTyxDQUFDO1FBRTlCO1lBQ0UsTUFBTSxJQUFJLEtBQUssQ0FBQyxpQ0FBaUMsQ0FBQyxDQUFDO0lBQ3JELENBQUM7QUFDSCxDQUFDO0FBRUQsaUVBQWUsS0FBSyxFQUFFLE9BQXlCLEVBQUUsRUFBRTtJQUNqRCxNQUFNLEdBQUcsR0FBRyxJQUFJLGdFQUFnQixDQUFDLE9BQU8sQ0FBQyxDQUFDO0lBQzFDLE1BQU0sVUFBVSxHQUFHLE1BQU0sYUFBYSxDQUFDLE9BQU8sQ0FBQyxDQUFDO0lBQ2hELE1BQU0sV0FBVyxHQUFHLGVBQWUsQ0FBQyxHQUFHLEVBQUUsVUFBVSxDQUFDLENBQUM7SUFFckQsSUFBSSxXQUFXLENBQUMsbUJBQW1CLEVBQUUsQ0FBQztRQUNwQyxNQUFNLFVBQVUsR0FBRyxJQUFJLENBQUMsU0FBUyxDQUFDLFdBQVcsRUFBRSxJQUFJLEVBQUUsQ0FBQyxDQUFDLENBQUM7UUFDeEQsTUFBTSxrRUFBZSxDQUFDLFdBQVcsQ0FBQyxtQkFBbUIsRUFBRSxVQUFVLENBQUMsQ0FBQztJQUNyRSxDQUFDO0lBRUQsTUFBTSxnQkFBZ0IsR0FBRyx3REFBWSxDQUFDLFdBQVcsQ0FBQyxVQUFVLEVBQUUsNERBQW1CLENBQUMsQ0FBQztJQUNuRixNQUFNLFFBQVEsR0FBRyxJQUFJLG1FQUFlLENBQUMsZ0JBQWdCLENBQUMsQ0FBQztJQUV2RCxLQUFLLE1BQU0sQ0FBQyxHQUFHLEVBQUUsS0FBSyxDQUFDLElBQUksTUFBTSxDQUFDLE9BQU8sQ0FBQyxXQUFXLENBQVEsRUFBRSxDQUFDO1FBQzlELElBQUksS0FBSyxJQUFJLE9BQU8sS0FBSyxLQUFLLFFBQVEsSUFBSSxLQUFLLENBQUMsTUFBTSxJQUFJLENBQUMsS0FBSyxDQUFDLFFBQVEsRUFBRSxDQUFDO1lBQzFFLE1BQU0sUUFBUSxDQUFDLElBQUksQ0FBQyxHQUFHLENBQUMsQ0FBQztZQUN6QixNQUFNLFNBQVMsR0FBRyxNQUFNLFFBQVEsQ0FBQyxHQUFHLENBQUMsV0FBVyxDQUFDLENBQUM7WUFDbEQsSUFBSSxLQUFLLENBQUMsT0FBTyxJQUFJLENBQUMsU0FBUyxFQUFFLENBQUM7Z0JBQ2hDLE1BQU0sQ0FBQyxJQUFJLENBQUMsbUJBQW1CLEdBQUcsRUFBRSxDQUFDLENBQUM7Z0JBQ3RDLE1BQU0sV0FBVyxHQUFHLGdCQUFnQixDQUFDLEtBQUssQ0FBQyxXQUFXLEVBQUUsT0FBTyxDQUFDLEdBQUcsQ0FBQyxDQUFDO2dCQUNyRSxJQUFJLEtBQUssQ0FBQyxTQUFTLEVBQUUsQ0FBQztvQkFDcEIsTUFBTSxnQkFBZ0IsQ0FBQyxHQUFHLEVBQUUsV0FBVyxFQUFFLEtBQUssRUFBRSxRQUFRLENBQUMsQ0FBQztnQkFDNUQsQ0FBQztnQkFDRCxNQUFNLGFBQWEsQ0FBQyxHQUFHLEVBQUUsV0FBVyxFQUFFLEtBQUssRUFBRSxRQUFRLENBQUMsQ0FBQztnQkFDdkQsTUFBTSxRQUFRLENBQUMsR0FBRyxDQUFDLFdBQVcsRUFBRSxJQUFJLENBQUMsQ0FBQztnQkFDdEMsTUFBTSxDQUFDLElBQUksQ0FBQyxxQkFBcUIsR0FBRyxFQUFFLENBQUMsQ0FBQztZQUMxQyxDQUFDO1lBQ0QsTUFBTSxRQUFRLENBQUMsR0FBRyxFQUFFLENBQUM7UUFDdkIsQ0FBQztJQUNILENBQUM7QUFDSCxDQUFDOzs7Ozs7Ozs7Ozs7Ozs7Ozs7O0FDMWtCRDs7Ozs7OztHQU9HO0FBRUksTUFBTSxXQUFXLEdBQUcsb0JBQW9CLENBQUM7QUFDekMsTUFBTSxnQkFBZ0IsR0FBRyxFQUFFLENBQUM7QUFDNUIsTUFBTSxtQkFBbUIsR0FBRyxvQkFBb0IsQ0FBQztBQUNqRCxNQUFNLFVBQVUsR0FBRyxLQUFLLENBQUM7QUFDekIsTUFBTSxjQUFjLEdBQUcsU0FBUyxDQUFDOzs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7QUNieEM7Ozs7Ozs7R0FPRztBQUVzQjtBQUV1QjtBQUNNO0FBQ047QUFDUjtBQUV4QyxNQUFNLE1BQU0sR0FBRyxxREFBWSxDQUFDLDhFQUFlLENBQUMsQ0FBQztBQUU3Qyw2QkFBZSwwQ0FBZSxPQUFZO0lBQ3hDLE1BQU0sR0FBRyxHQUFHLElBQUksK0RBQWdCLENBQUMsT0FBTyxDQUFDLENBQUM7SUFDMUMsTUFBTSxNQUFNLEdBQUcsR0FBRyxDQUFDLEdBQUcsQ0FBQyxNQUFNLENBQUM7SUFFOUIsSUFBSSxVQUFVLENBQUM7SUFDZixJQUFJLE1BQU0sRUFBRSxDQUFDO1FBQ1gsSUFBSSxNQUFNLDZEQUFVLENBQUMsTUFBTSxDQUFDO1lBQzFCLFVBQVUsR0FBRyxNQUFNLENBQUM7YUFDakIsQ0FBQztZQUNKLE1BQU0sVUFBVSxHQUFHLE1BQU0sQ0FBQyxLQUFLLENBQUMsR0FBRyxDQUFDLENBQUM7WUFDckMsSUFBSSxVQUFVLENBQUMsTUFBTSxLQUFLLENBQUMsRUFBRSxDQUFDO2dCQUMxQixJQUFJLENBQUM7b0JBQUMsVUFBVSxHQUFHLDZEQUFjLENBQUMsR0FBRyxVQUFVLENBQUMsQ0FBQyxDQUFDLG9CQUFvQixVQUFVLENBQUMsQ0FBQyxDQUFDLEVBQUUsQ0FBQztnQkFBQyxDQUFDO2dCQUFDLE9BQU0sQ0FBQyxFQUFFLENBQUMsRUFBQztZQUN4RyxDQUFDO1FBQ0gsQ0FBQztJQUNILENBQUM7SUFFRCxJQUFJLENBQUMsVUFBVTtRQUNiLE1BQU0sSUFBSSxLQUFLLENBQUMsV0FBVyxNQUFNLG9CQUFvQixDQUFDLENBQUM7SUFFekQsSUFBSSxNQUFNLDZEQUFVLENBQUMsR0FBRyxDQUFDLGNBQWMsQ0FBQztRQUN0QyxNQUFNLHVEQUFXLENBQUMsRUFBRSxDQUFDLEdBQUcsQ0FBQyxjQUFjLENBQUMsQ0FBQztJQUUzQyxNQUFNLHVEQUFXLENBQUMsUUFBUSxDQUFDLFVBQVUsRUFBRSxHQUFHLENBQUMsY0FBYyxDQUFDLENBQUM7SUFDM0QsTUFBTSxDQUFDLElBQUksQ0FBQyxXQUFXLE1BQU0sMEJBQTBCLENBQUMsQ0FBQztBQUMzRCxDQUFDOzs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7QUMxQ0Q7Ozs7Ozs7R0FPRztBQUVzQjtBQUNJO0FBRXdCO0FBQ0E7QUFDVjtBQUNZO0FBQ0k7QUFDUDtBQUNKO0FBQ0Q7QUFDZTtBQUNUO0FBRVI7QUFFN0MsTUFBTSxZQUFZLEdBQUcsY0FBYyxDQUFDO0FBQ3BDLE1BQU0sVUFBVSxHQUFHLGdCQUFnQixDQUFDO0FBRTdCLEtBQUssVUFBVSxnQkFBZ0IsQ0FBQyxNQUFXLEVBQUUsV0FBZ0IsRUFBRSxRQUFhO0lBQ2pGLE9BQU8sQ0FBQyxHQUFHLEdBQUcsV0FBVyxDQUFDO0lBRTFCLElBQUksS0FBSyxHQUFHLEVBQWlCLENBQUM7SUFDOUIsb0RBQVcsQ0FBQyxlQUFlLENBQUMsS0FBSyxFQUFFLFFBQVEsRUFBRSw4REFBZSxDQUFDLENBQUM7SUFFOUQsTUFBTSxTQUFTLEdBQUcsZ0VBQWEsQ0FBQyxNQUFNLENBQUMsU0FBUyxDQUFDLENBQUM7SUFDbEQsTUFBTSxTQUFTLEdBQUcsZ0VBQWEsQ0FBQyxNQUFNLENBQUMsU0FBUyxDQUFDLENBQUM7SUFFbEQsS0FBSyxDQUFDLGtCQUFrQixHQUFHLCtDQUFPLENBQUMsTUFBTSxDQUFDLFNBQVMsQ0FBQyxDQUFDO0lBQ3JELEtBQUssQ0FBQyxrQkFBa0IsR0FBRywrQ0FBTyxDQUFDLE1BQU0sQ0FBQyxTQUFTLENBQUMsQ0FBQztJQUVyRCxLQUFLLENBQUMsWUFBWSxHQUFHLEtBQUssQ0FBQyxrQkFBa0IsQ0FBQyxJQUFJLENBQUMsWUFBWSxDQUFDLENBQUM7SUFDakUsS0FBSyxDQUFDLFVBQVUsR0FBRyxLQUFLLENBQUMsa0JBQWtCLENBQUMsSUFBSSxDQUFDLFVBQVUsQ0FBQyxDQUFDO0lBQzdELEtBQUssQ0FBQyxVQUFVLEdBQUcsS0FBSyxDQUFDLGtCQUFrQixDQUFDO0lBQzVDLEtBQUssQ0FBQyxVQUFVLEdBQUcsS0FBSyxDQUFDLGtCQUFrQixDQUFDO0lBRTVDLE1BQU0sV0FBVyxHQUFHLE1BQU0sdURBQVcsQ0FBQyxRQUFRLENBQUMsS0FBSyxDQUFDLFlBQVksQ0FBQyxRQUFRLEVBQUUsRUFBRSxNQUFNLENBQUMsQ0FBQztJQUN0RixNQUFNLEdBQUcsR0FBRyxJQUFJLENBQUMsS0FBSyxDQUFDLFdBQVcsQ0FBQyxDQUFDO0lBRXBDLEtBQUssQ0FBQyxVQUFVLEdBQUcsTUFBTSxDQUFDLFNBQVMsQ0FBQztJQUNwQyxLQUFLLENBQUMsWUFBWSxHQUFHLEdBQUcsQ0FBQyxJQUFJLENBQUM7SUFDOUIsS0FBSyxDQUFDLGVBQWUsR0FBRyxHQUFHLENBQUMsT0FBTyxDQUFDO0lBQ3BDLEtBQUssQ0FBQyxtQkFBbUIsR0FBRyxHQUFHLENBQUMsV0FBVyxJQUFJLEVBQUUsQ0FBQztJQUNsRCxLQUFLLENBQUMsb0JBQW9CLEdBQUcsR0FBRyxDQUFDLFFBQVEsSUFBSSxFQUFFLENBQUM7SUFFaEQsSUFBSSxNQUFNLENBQUMsT0FBTztRQUNoQixLQUFLLENBQUMsT0FBTyxHQUFHLE1BQU0sQ0FBQyxPQUFPLENBQUM7SUFFakMsb0RBQVcsQ0FBQyxjQUFjLENBQUMsS0FBSyxFQUFFLE1BQU0sQ0FBQyxTQUFTLElBQUksRUFBRSxDQUFDLENBQUM7SUFFMUQsTUFBTSxNQUFNLEdBQUcsOERBQWEsQ0FBQyxNQUFNLEVBQUUsQ0FBQztJQUN0QyxJQUFJLEtBQUssQ0FBQyxjQUFjLEVBQUUsQ0FBQztRQUN6QixNQUFNLFNBQVMsR0FBRyxNQUFNLDJEQUFZLENBQUMsS0FBSyxDQUFDLGNBQWMsQ0FBQyxDQUFDO1FBQzNELElBQUksQ0FBQyxTQUFTLENBQUMsT0FBTztZQUNwQixNQUFNLElBQUksS0FBSyxDQUFDLHdDQUF3QyxDQUFDLENBQUM7UUFDNUQsTUFBTSxFQUFFLEdBQUcsb0VBQWdCLENBQUMsTUFBTSxDQUFDLEtBQUssRUFBRSxNQUFNLENBQUMsQ0FBQztRQUNsRCxNQUFNLE1BQU0sR0FBRyxTQUFTLENBQUMsT0FBTyxDQUFDLEVBQUUsQ0FBQyxDQUFDO1FBQ3JDLElBQUksTUFBTSxZQUFZLE9BQU87WUFDM0IsTUFBTSxNQUFNLENBQUM7UUFDZixLQUFLLEdBQUcsRUFBRSxDQUFDLE1BQU0sRUFBRSxDQUFDO1FBQ3BCLG9EQUFXLENBQUMsY0FBYyxDQUFDLEtBQUssRUFBRSxFQUFFLENBQUMsQ0FBQztJQUN4QyxDQUFDO1NBQ0ksQ0FBQztRQUNKLE1BQU0sMkVBQWlCLENBQUMsS0FBSyxDQUFDLENBQUM7SUFDakMsQ0FBQztJQUVELEtBQUssTUFBTSxNQUFNLElBQUksQ0FBQyxLQUFLLENBQUMsZ0JBQWdCLElBQUksRUFBRSxDQUFDLEVBQUUsQ0FBQztRQUNwRCxNQUFNLE9BQU8sR0FBRyxPQUFPLENBQUMsR0FBRyxFQUFFLENBQUM7UUFFOUIsS0FBSyxDQUFDLFdBQVcsR0FBRyxnREFBUSxDQUFDLE1BQU0sQ0FBQyxNQUFNLENBQUMsQ0FBQztRQUM1QyxLQUFLLENBQUMsVUFBVSxHQUFHLEtBQUssQ0FBQyxXQUFXLENBQUMsT0FBTyxFQUFFLENBQUM7UUFFL0MsT0FBTyxDQUFDLEtBQUssQ0FBQyxLQUFLLENBQUMsVUFBVSxDQUFDLFFBQVEsRUFBRSxDQUFDLENBQUM7UUFDM0MsTUFBTSxNQUFNLEdBQUcsTUFBTSwyREFBWSxDQUFDLEtBQUssQ0FBQyxXQUFXLENBQUMsUUFBUSxFQUFFLENBQUMsQ0FBQztRQUNoRSxJQUFJLENBQUMsTUFBTSxDQUFDLE9BQU87WUFDakIsTUFBTSxJQUFJLEtBQUssQ0FBQyxVQUFVLEtBQUssQ0FBQyxXQUFXLENBQUMsUUFBUSxFQUFFLCtCQUErQixDQUFDLENBQUM7UUFDekYsTUFBTSxFQUFFLEdBQUcsOERBQWEsQ0FBQyxNQUFNLENBQUMsS0FBSyxFQUFFLE1BQU0sQ0FBQyxDQUFDO1FBQy9DLE1BQU0sTUFBTSxHQUFHLE1BQU0sQ0FBQyxPQUFPLENBQUMsRUFBRSxDQUFDLENBQUM7UUFDbEMsSUFBSSxNQUFNLFlBQVksT0FBTztZQUMzQixNQUFNLE1BQU0sQ0FBQztRQUNmLEtBQUssR0FBRyxFQUFFLENBQUMsTUFBTSxFQUFFLENBQUM7UUFDcEIsb0RBQVcsQ0FBQyxjQUFjLENBQUMsS0FBSyxFQUFFLEVBQUUsQ0FBQyxDQUFDO1FBRXRDLE9BQU8sQ0FBQyxLQUFLLENBQUMsT0FBTyxDQUFDLENBQUM7SUFDekIsQ0FBQztJQUVELE1BQU0sQ0FBQyxlQUFlLENBQUMsS0FBSyxDQUFDLENBQUM7SUFFOUIsTUFBTSxNQUFNLENBQUMsY0FBYyxFQUFFLENBQUM7SUFDOUIsT0FBTyxDQUFDLElBQUksQ0FBQyxrQkFBa0IsQ0FBQyxDQUFDO0lBRWpDLElBQUksS0FBSyxDQUFDLG1CQUFtQixFQUFFLENBQUM7UUFDOUIsTUFBTSxRQUFRLEdBQUcsS0FBSyxDQUFDLG1CQUFtQixDQUFDLFFBQVEsRUFBRSxDQUFDO1FBQ3RELE1BQU0sT0FBTyxHQUFHLElBQUksQ0FBQyxTQUFTLENBQUMsTUFBTSxFQUFFLElBQUksRUFBRSxDQUFDLENBQUMsQ0FBQztRQUNoRCxNQUFNLHVEQUFXLENBQUMsS0FBSyxDQUFDLHdEQUFZLENBQUMsUUFBUSxDQUFDLEVBQUUsRUFBRSxTQUFTLEVBQUUsSUFBSSxFQUFFLENBQUMsQ0FBQztRQUNyRSxNQUFNLHVEQUFXLENBQUMsU0FBUyxDQUFDLFFBQVEsRUFBRSxPQUFPLEVBQUUsRUFBRSxRQUFRLEVBQUUsTUFBTSxFQUFFLENBQUMsQ0FBQztJQUN2RSxDQUFDO0lBRUQsTUFBTSxXQUFXLEdBQUcsTUFBTSxDQUFDLFdBQVcsQ0FBQyxLQUFLLENBQUMsQ0FBQztJQUM5QyxNQUFNLFFBQVEsR0FBRyxXQUFXLENBQUMsYUFBYSxDQUFDLHVEQUFjLENBQUMsQ0FBQztJQUUzRCxJQUFJLEtBQUssQ0FBQyxpQkFBaUIsRUFBRSxDQUFDO1FBQzVCLE1BQU0sUUFBUSxHQUFHLEtBQUssQ0FBQyxpQkFBaUIsQ0FBQyxRQUFRLEVBQUUsQ0FBQztRQUNwRCxNQUFNLE9BQU8sR0FBRyxJQUFJLENBQUMsU0FBUyxDQUFDLFFBQVEsRUFBRSxJQUFJLEVBQUUsQ0FBQyxDQUFDLENBQUM7UUFDbEQsTUFBTSx1REFBVyxDQUFDLEtBQUssQ0FBQyx3REFBWSxDQUFDLFFBQVEsQ0FBQyxFQUFFLEVBQUUsU0FBUyxFQUFFLElBQUksRUFBRSxDQUFDLENBQUM7UUFDckUsTUFBTSx1REFBVyxDQUFDLFNBQVMsQ0FBQyxRQUFRLEVBQUUsT0FBTyxFQUFFLEVBQUUsUUFBUSxFQUFFLE1BQU0sRUFBRSxDQUFDLENBQUM7SUFDdkUsQ0FBQztJQUVELE1BQU0sZ0VBQWMsQ0FBQyxVQUFVLENBQUMsUUFBUSxDQUFDLENBQUM7QUFDNUMsQ0FBQzs7Ozs7Ozs7Ozs7Ozs7Ozs7OztBQ3RIRDs7Ozs7OztHQU9HO0FBRTBCO0FBRWE7QUFDMEI7QUFZbkUsQ0FBQztBQUVLLE1BQU0sZ0JBQWdCO0lBQzNCLGVBQWUsQ0FBQztJQUNoQixjQUFjLENBQUM7SUFDZixRQUFRLENBQUM7SUFDQSxJQUFJLENBQUM7SUFDZCxXQUFXLENBQVU7SUFFckIsWUFBWSxPQUF5QjtRQUNuQyxJQUFJLENBQUMsZUFBZSxHQUFHLE9BQU8sQ0FBQyxjQUFjLENBQUM7UUFDOUMsSUFBSSxDQUFDLGNBQWMsR0FBRyxPQUFPLENBQUMsYUFBYSxDQUFDO1FBQzVDLElBQUksQ0FBQyxRQUFRLEdBQUcsT0FBTyxDQUFDLE9BQU8sQ0FBQztRQUNoQyxJQUFJLENBQUMsSUFBSSxHQUFHLE9BQU8sQ0FBQyxHQUFHLENBQUM7SUFDMUIsQ0FBQztJQUVELElBQUksY0FBYztRQUNoQixPQUFPLElBQUksQ0FBQyxlQUFlLENBQUM7SUFDOUIsQ0FBQztJQUVELElBQUksYUFBYTtRQUNmLE9BQU8sSUFBSSxDQUFDLGNBQWMsQ0FBQztJQUM3QixDQUFDO0lBRUQsSUFBSSxPQUFPO1FBQ1QsT0FBTyxJQUFJLENBQUMsUUFBUSxDQUFDO0lBQ3ZCLENBQUM7SUFFRCxJQUFJLEdBQUc7UUFDTCxPQUFPLElBQUksQ0FBQyxJQUFJLENBQUM7SUFDbkIsQ0FBQztJQUVELElBQUksY0FBYztRQUNoQixPQUFPLHdEQUFZLENBQUMsSUFBSSxDQUFDLFFBQVEsRUFBRSxtREFBVyxDQUFDLENBQUM7SUFDbEQsQ0FBQztJQUVELElBQUksU0FBUztRQUNYLE9BQU8sSUFBSSxDQUFDLElBQUksQ0FBQyxTQUFTLElBQUkseURBQWdCLENBQUMsQ0FBQyxDQUFDLElBQUksQ0FBQyxJQUFJLENBQUMsU0FBUyxDQUFDLENBQUMsQ0FBQywyREFBa0IsQ0FBQztJQUM1RixDQUFDO0NBQ0Y7QUFBQSxDQUFDOzs7Ozs7Ozs7Ozs7Ozs7Ozs7OztBQy9ERjs7Ozs7OztHQU9HO0FBRUgsSUFBWSxXQUdYO0FBSEQsV0FBWSxXQUFXO0lBQ3JCLHdCQUFTO0lBQ1QsMEJBQVc7QUFDYixDQUFDLEVBSFcsV0FBVyxLQUFYLFdBQVcsUUFHdEI7QUFBQSxDQUFDO0FBRUYsOERBQThEO0FBQzlELElBQVksU0FZWDtBQVpELFdBQVksU0FBUztJQUNuQixtQ0FBbUM7SUFDbkMsa0NBQXFCO0lBRXJCLG1DQUFtQztJQUNuQywwQkFBYTtJQUViLDBDQUEwQztJQUMxQywwQkFBYTtJQUViLG9DQUFvQztJQUNwQyw4QkFBaUI7QUFDbkIsQ0FBQyxFQVpXLFNBQVMsS0FBVCxTQUFTLFFBWXBCO0FBQUEsQ0FBQztBQUVGLGtEQUFrRDtBQUNsRCxJQUFZLFNBWVg7QUFaRCxXQUFZLFNBQVM7SUFDbkIsNERBQTREO0lBQzVELDRCQUFlO0lBRWYsb0RBQW9EO0lBQ3BELGdDQUFtQjtJQUVuQixpRUFBaUU7SUFDakUsOENBQWlDO0lBRWpDLDJEQUEyRDtJQUMzRCxzQ0FBeUI7QUFDM0IsQ0FBQyxFQVpXLFNBQVMsS0FBVCxTQUFTLFFBWXBCO0FBQUEsQ0FBQztBQUVGLDhEQUE4RDtBQUN2RCxNQUFNLGVBQWUsR0FBRyxnQkFBZ0IsQ0FBQztBQUVoRCxJQUFZLGFBR1g7QUFIRCxXQUFZLGFBQWE7SUFDdkIsb0VBQW9FO0lBQ3BFLGlEQUFnQztBQUNsQyxDQUFDLEVBSFcsYUFBYSxLQUFiLGFBQWEsUUFHeEI7QUFBQSxDQUFDO0FBRUYsb0VBQW9FO0FBQzdELE1BQU0saUJBQWlCLEdBQWtCLGFBQWEsQ0FBQyxhQUFhLENBQUM7Ozs7Ozs7Ozs7Ozs7Ozs7QUNyRDVFOzs7Ozs7O0dBT0c7QUFFNkM7QUFFekMsU0FBUyxjQUFjLENBQUMsR0FBUTtJQUNyQyxJQUFJLEtBQUssQ0FBQyxPQUFPLENBQUMsR0FBRyxDQUFDO1FBQ3BCLE9BQU8sR0FBRyxDQUFDLEdBQUcsQ0FBQyxDQUFDLENBQUMsRUFBRSxDQUFDLGNBQWMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLElBQUksQ0FBQyxHQUFHLENBQUMsQ0FBQztJQUVuRCxJQUFJLE9BQU8sR0FBRyxLQUFLLFNBQVM7UUFDMUIsT0FBTyxHQUFHLENBQUMsQ0FBQyxDQUFDLHlEQUFXLENBQUMsRUFBRSxDQUFDLENBQUMsQ0FBQyx5REFBVyxDQUFDLEdBQUcsQ0FBQztJQUVoRCxPQUFPLEdBQUcsQ0FBQyxRQUFRLEVBQUUsQ0FBQztBQUN4QixDQUFDOzs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7QUNuQkQ7Ozs7Ozs7R0FPRztBQUVzQjtBQUNBO0FBQ0k7QUFFcUI7QUFDZ0M7QUFDbEM7QUFFaEQsU0FBUyxTQUFTLENBQUMsR0FBVyxFQUFFLEdBQVE7SUFDdEMsTUFBTSxHQUFHLEdBQVE7UUFDZixvQkFBb0IsRUFBRSx1REFBUyxDQUFDLElBQUk7UUFDcEMsb0JBQW9CLEVBQUUsdURBQVMsQ0FBQyxRQUFRO0tBQ3pDLENBQUM7SUFFRixJQUFJLE9BQU8sR0FBRyxLQUFLLFNBQVM7UUFDMUIsT0FBTyx1REFBUyxDQUFDLElBQUksQ0FBQztJQUV4QixJQUFJLEdBQUcsQ0FBQyxjQUFjLENBQUMsR0FBRyxDQUFDO1FBQ3pCLE9BQU8sR0FBRyxDQUFDLEdBQUcsQ0FBQyxDQUFDO0lBRWxCLE9BQU8sdURBQVMsQ0FBQyxNQUFNLENBQUM7QUFDMUIsQ0FBQztBQUVELFNBQVMsWUFBWSxDQUFDLElBQVksRUFBRSxHQUFRO0lBQzFDLE1BQU0sSUFBSSxHQUFHLFNBQVMsQ0FBQyxJQUFJLEVBQUUsR0FBRyxDQUFDLENBQUM7SUFDbEMsTUFBTSxLQUFLLEdBQUcsNkRBQWMsQ0FBQyxHQUFHLENBQUMsQ0FBQztJQUNsQyxPQUFPLEdBQUcsSUFBSSxJQUFJLElBQUksSUFBSSxLQUFLLEVBQUUsQ0FBQztBQUNwQyxDQUFDO0FBRU0sS0FBSyxVQUFVLFNBQVMsQ0FBQyxJQUFTO0lBQ3ZDLE1BQU0sU0FBUyxHQUFHLENBQUUsSUFBSSxFQUFFLElBQUksQ0FBQyxTQUFTLENBQUUsQ0FBQztJQUMzQyxLQUFLLE1BQU0sQ0FBQyxHQUFHLEVBQUUsR0FBRyxDQUFDLElBQUksTUFBTSxDQUFDLE9BQU8sQ0FBQyxJQUFJLENBQUMsY0FBYyxDQUFDO1FBQzFELFNBQVMsQ0FBQyxJQUFJLENBQUMsSUFBSSxFQUFFLFlBQVksQ0FBQyxHQUFHLEVBQUUsR0FBRyxDQUFDLENBQUMsQ0FBQztJQUMvQyxTQUFTLENBQUMsSUFBSSxDQUFDLElBQUksRUFBRSxJQUFJLENBQUMsU0FBUyxDQUFDLENBQUM7SUFDckMsU0FBUyxDQUFDLElBQUksQ0FBQyxJQUFJLEVBQUUsSUFBSSxDQUFDLFNBQVMsQ0FBQyxDQUFDO0lBRXJDLE1BQU0sR0FBRyxHQUFRLE1BQU0sK0RBQVUsQ0FBQyxPQUFPLEVBQUUsU0FBUyxFQUFFO1FBQ3BELEdBQUcsRUFBRSxJQUFJLENBQUMsU0FBUztRQUNuQixHQUFHLEVBQUUsSUFBSSxDQUFDLFdBQVcsSUFBSSxPQUFPLENBQUMsR0FBRztRQUNwQyxLQUFLLEVBQUU7WUFDTCxNQUFNLEVBQUUscUJBQXFCO1NBQzlCO0tBQ0YsQ0FBQyxDQUFDO0lBQ0gsSUFBSSxHQUFHLENBQUMsTUFBTSxLQUFLLENBQUMsRUFBRSxDQUFDO1FBQ3JCLE1BQU0sbUNBQW1DLEdBQUcsQ0FBQyxNQUFNLEVBQUUsQ0FBQztJQUN4RCxDQUFDO0FBQ0gsQ0FBQztBQUVNLEtBQUssVUFBVSxLQUFLLENBQUMsSUFBUztJQUNuQyxNQUFNLFNBQVMsQ0FBQyxJQUFJLENBQUMsQ0FBQztJQUV0QixNQUFNLFNBQVMsR0FBYTtRQUMxQixTQUFTLEVBQUUsR0FBRztRQUNkLFlBQVksRUFBRSxtRUFBdUIsRUFBRSxDQUFDLFFBQVEsRUFBRTtLQUNuRCxDQUFDO0lBQ0YsTUFBTSxHQUFHLEdBQVEsTUFBTSwrREFBVSxDQUFDLE9BQU8sRUFBRSxTQUFTLEVBQUU7UUFDcEQsR0FBRyxFQUFFLElBQUksQ0FBQyxTQUFTO1FBQ25CLEdBQUcsRUFBRSxJQUFJLENBQUMsV0FBVyxJQUFJLE9BQU8sQ0FBQyxHQUFHO1FBQ3BDLEtBQUssRUFBRTtZQUNMLE1BQU0sRUFBRSxpQkFBaUI7U0FDMUI7S0FDRixDQUFDLENBQUM7SUFDSCxJQUFJLEdBQUcsQ0FBQyxNQUFNLEtBQUssQ0FBQyxFQUFFLENBQUM7UUFDckIsTUFBTSwrQkFBK0IsR0FBRyxDQUFDLE1BQU0sRUFBRSxDQUFDO0lBQ3BELENBQUM7QUFDSCxDQUFDO0FBRU0sS0FBSyxVQUFVLE9BQU8sQ0FBQyxJQUFTO0lBQ3JDLE1BQU0sU0FBUyxDQUFDLElBQUksQ0FBQyxDQUFDO0lBRXRCLE1BQU0sU0FBUyxHQUFHO1FBQ2hCLFdBQVc7UUFDWCxHQUFHO0tBQ0osQ0FBQztJQUNGLElBQUksSUFBSSxDQUFDLFVBQVUsRUFBRSxDQUFDO1FBQ3BCLFNBQVMsQ0FBQyxJQUFJLENBQUMsVUFBVSxFQUFFLElBQUksQ0FBQyxVQUFVLENBQUMsQ0FBQztJQUM5QyxDQUFDO0lBQ0QsTUFBTSxHQUFHLEdBQVEsTUFBTSwrREFBVSxDQUFDLE9BQU8sRUFBRSxTQUFTLEVBQUU7UUFDcEQsR0FBRyxFQUFFLElBQUksQ0FBQyxTQUFTO1FBQ25CLEdBQUcsRUFBRSxJQUFJLENBQUMsV0FBVyxJQUFJLE9BQU8sQ0FBQyxHQUFHO1FBQ3BDLEtBQUssRUFBRTtZQUNMLE1BQU0sRUFBRSxtQkFBbUI7U0FDNUI7S0FDRixDQUFDLENBQUM7SUFDSCxJQUFJLEdBQUcsQ0FBQyxNQUFNLEtBQUssQ0FBQyxFQUFFLENBQUM7UUFDckIsTUFBTSxpQ0FBaUMsR0FBRyxDQUFDLE1BQU0sRUFBRSxDQUFDO0lBQ3RELENBQUM7QUFDSCxDQUFDO0FBRU0sS0FBSyxVQUFVLEtBQUssQ0FBQyxJQUFTO0lBQ25DLE1BQU0sS0FBSyxDQUFDLElBQUksQ0FBQyxDQUFDO0lBRWxCLE1BQU0sU0FBUyxHQUFhLEVBQUUsQ0FBQztJQUMvQixNQUFNLEdBQUcsR0FBUSxNQUFNLCtEQUFVLENBQUMsT0FBTyxFQUFFLFNBQVMsRUFBRTtRQUNwRCxHQUFHLEVBQUUsSUFBSSxDQUFDLFNBQVM7UUFDbkIsR0FBRyxFQUFFLElBQUksQ0FBQyxXQUFXLElBQUksT0FBTyxDQUFDLEdBQUc7UUFDcEMsS0FBSyxFQUFFO1lBQ0wsTUFBTSxFQUFFLGlCQUFpQjtTQUMxQjtLQUNGLENBQUMsQ0FBQztJQUNILElBQUksR0FBRyxDQUFDLE1BQU0sS0FBSyxDQUFDLEVBQUUsQ0FBQztRQUNyQixNQUFNLHlCQUF5QixHQUFHLENBQUMsTUFBTSxFQUFFLENBQUM7SUFDOUMsQ0FBQztBQUNILENBQUM7QUFFTSxLQUFLLFVBQVUsT0FBTyxDQUFDLElBQVM7SUFDckMsTUFBTSxTQUFTLEdBQUcsQ0FBRSxJQUFJLEVBQUUsS0FBSyxFQUFFLE1BQU0sRUFBRSxJQUFJLENBQUMsUUFBUSxDQUFFLENBQUM7SUFDekQsTUFBTSxHQUFHLEdBQVEsTUFBTSwrREFBVSxDQUFDLE9BQU8sRUFBRSxTQUFTLEVBQUU7UUFDcEQsR0FBRyxFQUFFLElBQUksQ0FBQyxPQUFPLElBQUksSUFBSSxDQUFDLFNBQVMsSUFBSSxJQUFJLENBQUMsU0FBUztRQUNyRCxHQUFHLEVBQUUsSUFBSSxDQUFDLFdBQVcsSUFBSSxPQUFPLENBQUMsR0FBRztRQUNwQyxLQUFLLEVBQUU7WUFDTCxNQUFNLEVBQUUsSUFBSSxDQUFDLE9BQU8sSUFBSSxtQkFBbUI7U0FDNUM7S0FDRixDQUFDLENBQUM7SUFDSCxJQUFJLEdBQUcsQ0FBQyxNQUFNLEtBQUssQ0FBQyxFQUFFLENBQUM7UUFDckIsTUFBTSwyQkFBMkIsR0FBRyxDQUFDLE1BQU0sRUFBRSxDQUFDO0lBQ2hELENBQUM7QUFDSCxDQUFDO0FBRU0sS0FBSyxVQUFVLGNBQWMsQ0FBQyxNQUFjO0lBQ2pELE1BQU0sSUFBSSxHQUFHLE1BQU0sdURBQVcsQ0FBQyxJQUFJLENBQUMsTUFBTSxDQUFDLENBQUM7SUFDNUMsSUFBSSxJQUFJLENBQUMsV0FBVyxFQUFFO1FBQ3BCLE1BQU0sR0FBRyx3REFBWSxDQUFDLE1BQU0sRUFBRSw2REFBZSxDQUFDLENBQUM7SUFDakQsTUFBTSxPQUFPLEdBQUcsTUFBTSx1REFBVyxDQUFDLFFBQVEsQ0FBQyxNQUFNLEVBQUUsRUFBRSxRQUFRLEVBQUUsTUFBTSxFQUFFLENBQUMsQ0FBQztJQUV6RSxNQUFNLGNBQWMsR0FBRyxpQ0FBaUMsQ0FBQztJQUN6RCxNQUFNLGNBQWMsR0FBRyxrQkFBa0IsQ0FBQztJQUUxQyxNQUFNLE1BQU0sR0FBUSxFQUFFLENBQUM7SUFDdkIsSUFBSSxLQUFLLEdBQUcsT0FBTyxDQUFDLEtBQUssQ0FBQyxjQUFjLENBQUMsQ0FBQztJQUMxQyxJQUFJLEtBQUssRUFBRSxDQUFDO1FBQ1YsTUFBTSxDQUFDLElBQUksR0FBRyxLQUFLLENBQUMsQ0FBQyxDQUFDLENBQUM7UUFDdkIsTUFBTSxjQUFjLEdBQUcsS0FBSyxDQUFDLENBQUMsQ0FBQyxDQUFDO1FBQ2hDLEtBQUssR0FBRyxjQUFjLENBQUMsS0FBSyxDQUFDLGNBQWMsQ0FBQyxDQUFDO1FBQzdDLElBQUksS0FBSztZQUNQLE1BQU0sQ0FBQyxPQUFPLEdBQUcsS0FBSyxDQUFDLENBQUMsQ0FBQyxDQUFDO0lBQzlCLENBQUM7SUFFRCxPQUFPLE1BQU0sQ0FBQztBQUNoQixDQUFDO0FBRU0sU0FBUyxrQkFBa0IsQ0FBQyxJQUFZO0lBQzdDLE9BQU8sSUFBSSxHQUFHLElBQUksQ0FBQztBQUNyQixDQUFDO0FBRU0sU0FBUyxxQkFBcUIsQ0FBQyxJQUFZO0lBQ2hELE9BQU8sVUFBVSxJQUFJLFFBQVEsQ0FBQztBQUNoQyxDQUFDO0FBRU0sU0FBUywwQkFBMEIsQ0FBQyxRQUFnQjtJQUN6RCxPQUFPLGtCQUFrQixDQUFDLGlCQUFpQixHQUFHLHlEQUFhLENBQUMsUUFBUSxDQUFDLENBQUMsQ0FBQztBQUN6RSxDQUFDO0FBRUQsaUVBQWU7SUFDYixpQkFBaUI7SUFDakIsU0FBUztJQUNULEtBQUs7SUFDTCxPQUFPO0lBQ1AsS0FBSztJQUNMLE9BQU87Q0FDUixFQUFDOzs7Ozs7Ozs7Ozs7Ozs7Ozs7O0FDektGOzs7Ozs7O0dBT0c7QUFFc0I7QUFDSTtBQUU3Qiw2QkFBZSxvQ0FBUyxNQUFXO0lBQ2pDLE1BQU0sT0FBTyxHQUFHLDJEQUFlLENBQUMsTUFBTSxDQUFDLEtBQUssRUFBRSxPQUFPLENBQUMsQ0FBQztJQUN2RCxNQUFNLFVBQVUsR0FBRyxPQUFPLENBQUMsT0FBTyxDQUFDLDZCQUE2QixFQUFFLENBQUMsS0FBSyxFQUFFLEtBQUssRUFBRSxFQUFFO1FBQ2pGLE1BQU0sR0FBRyxHQUFHLE1BQU0sQ0FBQyxLQUFLLENBQUMsSUFBSSxFQUFFLENBQUM7UUFDaEMsSUFBSSxLQUFLLENBQUMsT0FBTyxDQUFDLEdBQUcsQ0FBQztZQUNwQixPQUFPLEdBQUcsQ0FBQyxJQUFJLENBQUMsSUFBSSxDQUFDLENBQUM7UUFDeEIsT0FBTyxHQUFHLENBQUMsUUFBUSxFQUFFLENBQUM7SUFDeEIsQ0FBQyxDQUFDLENBQUM7SUFDSCx3REFBWSxDQUFDLHdEQUFZLENBQUMsTUFBTSxDQUFDLE1BQU0sQ0FBQyxFQUFFLEVBQUUsU0FBUyxFQUFFLElBQUksRUFBRSxDQUFDLENBQUM7SUFDL0QsNERBQWdCLENBQUMsTUFBTSxDQUFDLE1BQU0sRUFBRSxVQUFVLEVBQUUsT0FBTyxDQUFDLENBQUM7QUFDdkQsQ0FBQzs7Ozs7Ozs7Ozs7Ozs7Ozs7OztBQ3RCRDs7Ozs7OztHQU9HO0FBRXNCO0FBQ0k7QUFFN0IsNkJBQWUsb0NBQVMsTUFBVztJQUNqQyxPQUFPLENBQUMsR0FBRyxDQUFDLGNBQWMsR0FBRyxNQUFNLENBQUMsSUFBSSxDQUFDLENBQUM7SUFDMUMsd0RBQVksQ0FBQyx3REFBWSxDQUFDLE1BQU0sQ0FBQyxJQUFJLENBQUMsRUFBRSxFQUFFLFNBQVMsRUFBRSxJQUFJLEVBQUUsQ0FBQyxDQUFDO0lBQzdELHFEQUFTLENBQUMsTUFBTSxDQUFDLEdBQUcsRUFBRSxNQUFNLENBQUMsSUFBSSxFQUFFLEVBQUUsS0FBSyxFQUFFLElBQUksRUFBRSxDQUFDLENBQUM7QUFDdEQsQ0FBQzs7Ozs7Ozs7Ozs7Ozs7Ozs7QUNoQkQ7Ozs7Ozs7R0FPRztBQUVrRDtBQUNWO0FBRzNDLE1BQU0sWUFBWSxHQUFHLE1BQU0sQ0FBQyxjQUFjLENBQUMsQ0FBQztBQUM1QyxNQUFNLE1BQU0sR0FBUyxNQUFNLENBQUMsUUFBUSxDQUFDLENBQUM7QUFDdEMsTUFBTSxLQUFLLEdBQVUsTUFBTSxDQUFDLE9BQU8sQ0FBQyxDQUFDO0FBQ3JDLE1BQU0sTUFBTSxHQUFTLE1BQU0sQ0FBQyxRQUFRLENBQUMsQ0FBQztBQUN0QyxNQUFNLE1BQU0sR0FBUyxNQUFNLENBQUMsUUFBUSxDQUFDLENBQUM7QUFDdEMsTUFBTSxVQUFVLEdBQUssTUFBTSxDQUFDLFlBQVksQ0FBQyxDQUFDO0FBRW5DLE1BQU0sWUFBWTtJQUNmLENBQUMsWUFBWSxDQUFDLENBQWM7SUFDNUIsQ0FBQyxNQUFNLENBQUMsQ0FBMEI7SUFDbEMsQ0FBQyxLQUFLLENBQUMsQ0FBc0I7SUFDN0IsQ0FBQyxNQUFNLENBQUMsQ0FBZTtJQUN2QixDQUFDLE1BQU0sQ0FBQyxDQUFTO0lBQ2pCLENBQUMsVUFBVSxDQUFDLENBQU07SUFFMUIsWUFBb0IsS0FBa0IsRUFBRSxNQUEyQixFQUFFLE1BQW9CLEVBQUUsTUFBVztRQUNwRyxJQUFJLENBQUMsWUFBWSxDQUFDLEdBQUcsb0RBQVcsQ0FBQyxLQUFLLENBQUMsRUFBRSxFQUFFLEtBQUssQ0FBQyxDQUFDO1FBQ2xELElBQUksQ0FBQyxLQUFLLENBQUMsR0FBRyxNQUFNLENBQUMsS0FBSyxJQUFJLElBQUksQ0FBQztRQUNuQyxJQUFJLENBQUMsTUFBTSxDQUFDLEdBQUcsTUFBTSxDQUFDO1FBQ3RCLElBQUksQ0FBQyxNQUFNLENBQUMsR0FBRyxNQUFNLENBQUM7UUFDdEIsSUFBSSxDQUFDLE1BQU0sQ0FBQyxHQUFHLE1BQU0sQ0FBQztRQUN0QixJQUFJLENBQUMsVUFBVSxDQUFDLEdBQUcsRUFBRSxDQUFDO0lBQ3hCLENBQUM7SUFFTSxNQUFNLENBQUMsTUFBTSxDQUFDLEtBQWtCLEVBQUUsTUFBMkIsRUFBRSxNQUFvQixFQUFFLE1BQVc7UUFDckcsT0FBTyxNQUFNLENBQUMsSUFBSSxDQUFDLElBQUksWUFBWSxDQUFDLEtBQUssRUFBRSxNQUFNLEVBQUUsTUFBTSxFQUFFLE1BQU0sQ0FBQyxDQUFDLENBQUM7SUFDdEUsQ0FBQztJQUVNLFdBQVcsQ0FBQyxHQUFXLEVBQUUsR0FBRyxJQUFXO1FBQzVDLElBQUksUUFBUSxHQUFHLElBQUksQ0FBQyxVQUFVLENBQUMsQ0FBQyxHQUFHLENBQUMsQ0FBQztRQUNyQyxJQUFJLENBQUMsUUFBUSxFQUFFLENBQUM7WUFDZCxRQUFRLEdBQUcsRUFBRSxDQUFDO1lBQ2QsSUFBSSxDQUFDLFVBQVUsQ0FBQyxDQUFDLEdBQUcsQ0FBQyxHQUFHLFFBQVEsQ0FBQztRQUNuQyxDQUFDO1FBQ0QsSUFBSSxDQUFDLE9BQU8sQ0FBQyxDQUFDLENBQUMsRUFBRSxDQUFDLFFBQVEsQ0FBQyxJQUFJLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQztJQUN0QyxDQUFDO0lBRUQsSUFBVyxZQUFZO1FBQ3JCLE9BQU8sSUFBSSxDQUFDLFlBQVksQ0FBQyxDQUFDO0lBQzVCLENBQUM7SUFFRCxJQUFXLE1BQU07UUFDZixPQUFPLElBQUksQ0FBQyxNQUFNLENBQUMsQ0FBQztJQUN0QixDQUFDO0lBRUQsSUFBVyxLQUFLO1FBQ2QsT0FBTyxJQUFJLENBQUMsS0FBSyxDQUFDLENBQUM7SUFDckIsQ0FBQztJQUVELElBQVcsS0FBSyxDQUFDLEtBQTRCO1FBQzNDLElBQUksQ0FBQyxLQUFLLENBQUMsR0FBRyxJQUFJLENBQUMsWUFBWSxDQUFDLENBQUMsVUFBVSxDQUFDLE9BQU8sQ0FBQyxLQUFLLENBQUMsQ0FBQztJQUM3RCxDQUFDO0lBRUQsSUFBVyxNQUFNO1FBQ2YsT0FBTyxJQUFJLENBQUMsTUFBTSxDQUFDLENBQUM7SUFDdEIsQ0FBQztJQUVELElBQVcsTUFBTSxDQUFDLEtBQTRCO1FBQzVDLElBQUksQ0FBQyxNQUFNLENBQUMsR0FBRyxvREFBWSxDQUFDLE1BQU0sQ0FBQyxLQUFLLENBQUMsQ0FBQztJQUM1QyxDQUFDO0lBRUQsSUFBVyxNQUFNO1FBQ2YsT0FBTyxJQUFJLENBQUMsTUFBTSxDQUFDLENBQUM7SUFDdEIsQ0FBQztJQUVELElBQVcsTUFBTSxDQUFDLEtBQWE7UUFDN0IsSUFBSSxDQUFDLE1BQU0sQ0FBQyxHQUFHLEtBQUssQ0FBQztJQUN2QixDQUFDO0lBRUQsSUFBVyxVQUFVO1FBQ25CLE9BQU8sSUFBSSxDQUFDLFVBQVUsQ0FBQyxDQUFDO0lBQzFCLENBQUM7SUFFTSxNQUFNO1FBQ1gsT0FBTztZQUNMLFlBQVksRUFBRSxJQUFJLENBQUMsWUFBWTtZQUMvQixNQUFNLEVBQUUsSUFBSSxDQUFDLE1BQU07WUFDbkIsS0FBSyxFQUFFLElBQUksQ0FBQyxLQUFLO1lBQ2pCLE1BQU0sRUFBRSxJQUFJLENBQUMsTUFBTTtZQUNuQixNQUFNLEVBQUUsSUFBSSxDQUFDLE1BQU07WUFDbkIsVUFBVSxFQUFFLElBQUksQ0FBQyxVQUFVO1NBQzVCO0lBQ0gsQ0FBQztDQUNGO0FBQUEsQ0FBQzs7Ozs7Ozs7Ozs7Ozs7Ozs7QUNoR0Y7Ozs7Ozs7R0FPRztBQUU4QztBQUVUO0FBRXhDLE1BQU0sTUFBTSxHQUFHLHFEQUFZLENBQUMseUZBQWUsQ0FBQyxDQUFDO0FBRXRDLEtBQUssVUFBVSxpQkFBaUIsQ0FBQyxLQUFrQjtJQUN4RCxNQUFNLFNBQVMsR0FBRyxNQUFNLDhEQUFXLENBQUMsT0FBTyxDQUFDLENBQUM7SUFDN0MsSUFBSSxTQUFTLEVBQUUsQ0FBQztRQUNkLE1BQU0sQ0FBQyxJQUFJLENBQUMsOENBQThDLENBQUMsQ0FBQztRQUM1RCxLQUFLLENBQUMsWUFBWSxHQUFHLE9BQU8sQ0FBQztRQUM3QixLQUFLLENBQUMsVUFBVSxHQUFHLE9BQU8sQ0FBQztRQUMzQixLQUFLLENBQUMsWUFBWSxHQUFHLFNBQVMsQ0FBQztRQUMvQixLQUFLLENBQUMsRUFBRSxHQUFHLFNBQVMsQ0FBQztRQUNyQixLQUFLLENBQUMsTUFBTSxHQUFHLGFBQWEsQ0FBQztRQUM3QixLQUFLLENBQUMsTUFBTSxHQUFHLEtBQUssQ0FBQztRQUNyQixLQUFLLENBQUMsRUFBRSxHQUFHLFNBQVMsQ0FBQztRQUNyQixLQUFLLENBQUMsT0FBTyxHQUFHLGNBQWMsQ0FBQztRQUMvQixLQUFLLENBQUMsT0FBTyxHQUFHLGNBQWMsQ0FBQztRQUMvQixLQUFLLENBQUMsS0FBSyxHQUFHLFlBQVksQ0FBQztRQUMzQixPQUFPO0lBQ1QsQ0FBQztJQUVELE1BQU0sT0FBTyxHQUFHLE1BQU0sOERBQVcsQ0FBQyxLQUFLLENBQUMsQ0FBQztJQUN6QyxJQUFJLE9BQU8sRUFBRSxDQUFDO1FBQ1osTUFBTSxDQUFDLElBQUksQ0FBQyw0Q0FBNEMsQ0FBQyxDQUFDO1FBQzFELEtBQUssQ0FBQyxZQUFZLEdBQUcsS0FBSyxDQUFDO1FBQzNCLEtBQUssQ0FBQyxVQUFVLEdBQUcsS0FBSyxDQUFDO1FBQ3pCLEtBQUssQ0FBQyxZQUFZLEdBQUcsS0FBSyxDQUFDO1FBQzNCLEtBQUssQ0FBQyxFQUFFLEdBQUcsSUFBSSxDQUFDO1FBQ2hCLEtBQUssQ0FBQyxNQUFNLEdBQUcsUUFBUSxDQUFDO1FBQ3hCLEtBQUssQ0FBQyxNQUFNLEdBQUcsSUFBSSxDQUFDO1FBQ3BCLEtBQUssQ0FBQyxFQUFFLEdBQUcsSUFBSSxDQUFDO1FBQ2hCLEtBQUssQ0FBQyxPQUFPLEdBQUcsU0FBUyxDQUFDO1FBQzFCLEtBQUssQ0FBQyxPQUFPLEdBQUcsU0FBUyxDQUFDO1FBQzFCLEtBQUssQ0FBQyxLQUFLLEdBQUcsT0FBTyxDQUFDO1FBQ3RCLE9BQU87SUFDVCxDQUFDO0lBRUQsTUFBTSw0QkFBNEIsQ0FBQztBQUNyQyxDQUFDOzs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7QUNqREQ7Ozs7Ozs7R0FPRztBQUVzQjtBQUNJO0FBRW1DO0FBRWhFLFNBQVMsbUJBQW1CLENBQUMsSUFBWTtJQUN2QyxJQUFJLHVEQUFXLEVBQUUsS0FBSyxPQUFPLElBQUksQ0FBQyxJQUFJLENBQUMsUUFBUSxDQUFDLE1BQU0sQ0FBQztRQUNyRCxJQUFJLElBQUksTUFBTSxDQUFDO0lBRWpCLE1BQU0sTUFBTSxHQUFHLEVBQUUsQ0FBQztJQUNsQixNQUFNLEtBQUssR0FBRyxDQUFDLE9BQU8sQ0FBQyxHQUFHLENBQUMsSUFBSSxJQUFJLEVBQUUsQ0FBQyxDQUFDLEtBQUssQ0FBQyx3REFBVSxDQUFDLFNBQVMsQ0FBQyxDQUFDO0lBQ25FLEtBQUssTUFBTSxJQUFJLElBQUksS0FBSyxFQUFFLENBQUM7UUFDekIsTUFBTSxRQUFRLEdBQUcsc0RBQVUsQ0FBQyxPQUFPLENBQUMsSUFBSSxFQUFFLElBQUksQ0FBQyxDQUFDO1FBQ2hELE1BQU0sQ0FBQyxJQUFJLENBQUMsUUFBUSxDQUFDLENBQUM7SUFDeEIsQ0FBQztJQUVELE9BQU8sTUFBTSxDQUFDO0FBQ2hCLENBQUM7QUFFTSxLQUFLLFVBQVUsV0FBVyxDQUFDLElBQVk7SUFDNUMsS0FBSyxNQUFNLElBQUksSUFBSSxtQkFBbUIsQ0FBQyxJQUFJLENBQUMsRUFBRSxDQUFDO1FBQzdDLElBQUksTUFBTSw2REFBVSxDQUFDLElBQUksQ0FBQztZQUN4QixPQUFPLElBQUksQ0FBQztJQUNoQixDQUFDO0lBQ0QsT0FBTyxTQUFTLENBQUM7QUFDbkIsQ0FBQztBQUVNLFNBQVMsZUFBZSxDQUFDLElBQVk7SUFDMUMsS0FBSyxNQUFNLElBQUksSUFBSSxtQkFBbUIsQ0FBQyxJQUFJLENBQUMsRUFBRSxDQUFDO1FBQzdDLElBQUksaUVBQWMsQ0FBQyxJQUFJLENBQUM7WUFDdEIsT0FBTyxJQUFJLENBQUM7SUFDaEIsQ0FBQztJQUNELE9BQU8sU0FBUyxDQUFDO0FBQ25CLENBQUM7Ozs7Ozs7Ozs7Ozs7Ozs7O0FDMUNEOzs7Ozs7O0dBT0c7QUFFc0I7QUFFbEIsU0FBUyxjQUFjO0lBQzVCLE1BQU0sZUFBZSxHQUNyQjtRQUNFLEdBQUcsRUFBTSxDQUFDO1FBQ1YsS0FBSyxFQUFJLENBQUM7UUFDVixJQUFJLEVBQUssQ0FBQztRQUNWLE9BQU8sRUFBRSxDQUFDO1FBQ1YsSUFBSSxFQUFLLENBQUM7UUFDVixNQUFNLEVBQUcsQ0FBQztRQUNWLEdBQUcsRUFBTSxDQUFDO1FBQ1YsS0FBSyxFQUFJLENBQUM7UUFDVixPQUFPLEVBQUUsQ0FBQztRQUNWLElBQUksRUFBSyxDQUFDO1FBQ1YsS0FBSyxFQUFJLENBQUM7UUFDVixHQUFHLEVBQU0sQ0FBQztLQUNYLENBQUM7SUFDRixNQUFNLE1BQU0sR0FBRyxlQUFlLENBQUMsbURBQU8sRUFBRSxDQUFDLENBQUM7SUFDMUMsSUFBSSxDQUFDLE1BQU07UUFDVCxNQUFNLElBQUksS0FBSyxDQUFDLFdBQVcsbURBQU8sRUFBRSxPQUFPLENBQUMsQ0FBQztJQUMvQyxPQUFPLE1BQU0sQ0FBQztBQUNoQixDQUFDOzs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7O0FDL0JEOzs7Ozs7O0dBT0c7QUFFc0I7QUFFZ0M7QUFDTDtBQUNZO0FBQ0o7QUFDRDtBQUNGO0FBQ0o7QUFDRTtBQUNJO0FBRVo7QUFDRTtBQUN1QztBQUM3QztBQUVHO0FBQ047QUFJMEI7QUFDQTtBQUVsRSxNQUFNLE1BQU0sR0FBRyxzREFBWSxDQUFDLHFGQUFlLENBQUMsQ0FBQztBQUU3QyxNQUFNLFdBQVcsR0FBRyxJQUFJLENBQUMsU0FBUyxDQUFDLENBQUM7QUFFcEMsTUFBTSxPQUFPLEdBQUcsTUFBTSxDQUFDLFNBQVMsQ0FBQyxDQUFDO0FBQ2xDLE1BQU0sY0FBYyxHQUFHLE1BQU0sQ0FBQyxnQkFBZ0IsQ0FBQyxDQUFDO0FBQ2hELE1BQU0sS0FBSyxHQUFHLE1BQU0sQ0FBQyxPQUFPLENBQUMsQ0FBQztBQUM5QixNQUFNLGVBQWUsR0FBRyxNQUFNLENBQUMsaUJBQWlCLENBQUMsQ0FBQztBQUNsRCxNQUFNLGlCQUFpQixHQUFHLE1BQU0sQ0FBQyxtQkFBbUIsQ0FBQyxDQUFDO0FBQ3RELE1BQU0sWUFBWSxHQUFHLE1BQU0sQ0FBQyxjQUFjLENBQUMsQ0FBQztBQUM1QyxNQUFNLG9CQUFvQixHQUFHLE1BQU0sQ0FBQyxzQkFBc0IsQ0FBQyxDQUFDO0FBQzVELE1BQU0sWUFBWSxHQUFHLE1BQU0sQ0FBQyxjQUFjLENBQUMsQ0FBQztBQUM1QyxNQUFNLFdBQVcsR0FBRyxNQUFNLENBQUMsYUFBYSxDQUFDLENBQUM7QUFDMUMsTUFBTSxlQUFlLEdBQUcsTUFBTSxDQUFDLGlCQUFpQixDQUFDLENBQUM7QUE0QmxELFNBQVMsaUJBQWlCLENBQUMsSUFBUyxFQUFFLEtBQVU7SUFDOUMsSUFBSSxLQUFLLENBQUMsT0FBTyxDQUFDLElBQUksQ0FBQyxDQUFDLENBQUMsQ0FBQyxJQUFJLENBQUMsUUFBUSxDQUFDLEtBQUssQ0FBQyxDQUFDLENBQUMsQ0FBQyxPQUFPLEtBQUssS0FBSyxJQUFJO1FBQ3BFLE9BQU8sS0FBSyxDQUFDO0lBQ2YsTUFBTSxJQUFJLEtBQUssQ0FBQyxRQUFRLEtBQUssY0FBYyxJQUFJLEVBQUUsQ0FBQyxDQUFDO0FBQ3JELENBQUM7QUFFTSxNQUFNLGFBQWE7SUFDaEIsQ0FBQyxPQUFPLENBQUMsQ0FBbUI7SUFDNUIsQ0FBQyxjQUFjLENBQUMsQ0FBbUI7SUFDbkMsQ0FBQyxLQUFLLENBQUMsQ0FBMkI7SUFDbEMsQ0FBQyxlQUFlLENBQUMsQ0FBaUI7SUFDbEMsQ0FBQyxpQkFBaUIsQ0FBQyxDQUFtQjtJQUN0QyxDQUFDLFlBQVksQ0FBQyxDQUFrQjtJQUNoQyxDQUFDLG9CQUFvQixDQUFDLENBQU07SUFDNUIsQ0FBQyxZQUFZLENBQUMsQ0FBb0I7SUFDbEMsQ0FBQyxXQUFXLENBQUMsQ0FBZ0I7SUFDN0IsQ0FBQyxlQUFlLENBQUMsQ0FBaUI7SUFFMUM7UUFDRSxJQUFJLENBQUMsT0FBTyxDQUFDLEdBQUcsb0VBQWdCLENBQUMsTUFBTSxFQUFFLENBQUM7UUFDMUMsSUFBSSxDQUFDLGNBQWMsQ0FBQyxHQUFHLG9FQUFnQixDQUFDLE1BQU0sRUFBRSxDQUFDO1FBQ2pELElBQUksQ0FBQyxLQUFLLENBQUMsR0FBRyxFQUFFLENBQUM7UUFDakIsSUFBSSxDQUFDLGVBQWUsQ0FBQyxHQUFHLEVBQUUsQ0FBQztRQUMzQixJQUFJLENBQUMsaUJBQWlCLENBQUMsR0FBRyxFQUFFLENBQUM7UUFDN0IsSUFBSSxDQUFDLFlBQVksQ0FBQyxHQUFHLEVBQUUsQ0FBQztRQUN4QixJQUFJLENBQUMsb0JBQW9CLENBQUMsR0FBRyxFQUFFLENBQUM7UUFDaEMsSUFBSSxDQUFDLFlBQVksQ0FBQyxHQUFHLEVBQUUsQ0FBQztRQUN4QixJQUFJLENBQUMsV0FBVyxDQUFDLEdBQUcsRUFBRSxDQUFDO1FBQ3ZCLElBQUksQ0FBQyxlQUFlLENBQUMsR0FBRztZQUN0QixjQUFjO1lBQ2QsY0FBYztTQUNmLENBQUM7SUFDSixDQUFDO0lBRU0sTUFBTSxDQUFDLE1BQU07UUFDbEIsT0FBTyxNQUFNLENBQUMsSUFBSSxDQUFDLElBQUksYUFBYSxDQUFDLENBQUM7SUFDeEMsQ0FBQztJQUVELElBQVcsT0FBTztRQUNoQixPQUFPLElBQUksQ0FBQyxPQUFPLENBQUMsQ0FBQztJQUN2QixDQUFDO0lBRUQsSUFBVyxLQUFLO1FBQ2QsT0FBTyxJQUFJLENBQUMsS0FBSyxDQUFDLENBQUM7SUFDckIsQ0FBQztJQUVELElBQVcsZUFBZTtRQUN4QixPQUFPLElBQUksQ0FBQyxlQUFlLENBQUMsQ0FBQztJQUMvQixDQUFDO0lBRUQsSUFBVyxpQkFBaUI7UUFDMUIsT0FBTyxJQUFJLENBQUMsaUJBQWlCLENBQUMsQ0FBQztJQUNqQyxDQUFDO0lBRUQsSUFBVyxvQkFBb0I7UUFDN0IsT0FBTyxJQUFJLENBQUMsb0JBQW9CLENBQUMsQ0FBQztJQUNwQyxDQUFDO0lBRUQsSUFBVyxZQUFZO1FBQ3JCLE9BQU8sSUFBSSxDQUFDLFlBQVksQ0FBQyxDQUFDO0lBQzVCLENBQUM7SUFFTSxlQUFlLENBQUMsTUFBb0IsRUFBRSxJQUFhO1FBQ3hELElBQUksSUFBSTtZQUNOLElBQUksQ0FBQyxjQUFjLENBQUMsQ0FBQyxHQUFHLENBQUMsSUFBSSxFQUFFLE1BQU0sQ0FBQyxDQUFDOztZQUV2QyxJQUFJLENBQUMsY0FBYyxDQUFDLENBQUMsR0FBRyxDQUFDLE1BQU0sQ0FBQyxDQUFDO0lBQ3JDLENBQUM7SUFFTSxlQUFlLENBQUMsSUFBWTtRQUNqQyxJQUFJLE1BQU0sR0FBRyxJQUFJLENBQUMsZUFBZSxDQUFDLENBQUMsSUFBSSxDQUFDLENBQUM7UUFDekMsSUFBSSxDQUFDLE1BQU0sRUFBRSxDQUFDO1lBQ1osSUFBSSxDQUFDLGVBQWUsQ0FBQyxDQUFDLElBQUksQ0FBQyxHQUFHLE1BQU0sR0FBRyw4REFBYSxDQUFDLE1BQU0sQ0FBQyxJQUFJLENBQUMsQ0FBQztRQUNwRSxDQUFDO1FBQ0QsT0FBTyxNQUFNLENBQUM7SUFDaEIsQ0FBQztJQUVNLGtCQUFrQixDQUFDLFNBQWM7UUFDdEMsTUFBTSxNQUFNLEdBQUcsU0FBUyxDQUFDLFdBQVcsQ0FBQyxRQUFRLEVBQUUsQ0FBQztRQUNoRCxJQUFJLElBQUksQ0FBQyxvQkFBb0IsQ0FBQyxDQUFDLE1BQU0sQ0FBQztZQUNwQyxNQUFNLElBQUksS0FBSyxDQUFDLDhCQUE4QixNQUFNLEVBQUUsQ0FBQyxDQUFDO1FBQzFELElBQUksQ0FBQyxvQkFBb0IsQ0FBQyxDQUFDLE1BQU0sQ0FBQyxHQUFHLFNBQVMsQ0FBQztJQUNqRCxDQUFDO0lBRU0sbUJBQW1CLENBQUMsSUFBMkI7UUFDcEQsTUFBTSxZQUFZLEdBQUcsSUFBSSxDQUFDLFlBQVksQ0FBQyxDQUFDLElBQUksQ0FBQyxRQUFRLEVBQUUsQ0FBQyxDQUFDO1FBQ3pELE9BQU8sWUFBWSxJQUFJLElBQUksQ0FBQztJQUM5QixDQUFDO0lBRU0sb0JBQW9CLENBQUMsR0FBWSxFQUFFLElBQWE7UUFDckQsTUFBTSxNQUFNLEdBQUcsR0FBRyxDQUFDLFFBQVEsRUFBRSxDQUFDO1FBQzlCLElBQUksSUFBSSxDQUFDLFlBQVksQ0FBQyxDQUFDLGNBQWMsQ0FBQyxNQUFNLENBQUM7WUFDM0MsTUFBTSxDQUFDLElBQUksQ0FBQyxhQUFhLE1BQU0sc0JBQXNCLENBQUMsQ0FBQztRQUN6RCxJQUFJLENBQUMsWUFBWSxDQUFDLENBQUMsTUFBTSxDQUFDLEdBQUcsSUFBSSxDQUFDO0lBQ3BDLENBQUM7SUFFTSxlQUFlLENBQUMsS0FBb0I7UUFDekMsT0FBTyxJQUFJLENBQUMsWUFBWSxDQUFDLENBQUMsSUFBSSxDQUFDLEtBQUssQ0FBQyxDQUFDO0lBQ3hDLENBQUM7SUFFTSxpQkFBaUIsQ0FBQyxTQUFtQztRQUMxRCxNQUFNLEtBQUssR0FBRyxJQUFJLENBQUMsS0FBSyxDQUFDLENBQUM7UUFDMUIsS0FBSyxNQUFNLENBQUMsR0FBRyxFQUFFLEtBQUssQ0FBQyxJQUFJLE1BQU0sQ0FBQyxPQUFPLENBQUMsU0FBUyxDQUFDLEVBQUUsQ0FBQztZQUNyRCxLQUFLLENBQUMsR0FBRyxDQUFDLEdBQUcsS0FBSyxDQUFDO1FBQ3JCLENBQUM7SUFDSCxDQUFDO0lBRU0sa0JBQWtCLENBQUMsUUFBK0I7UUFDdkQsSUFBSSxpRUFBYyxDQUFDLFFBQVEsQ0FBQyxRQUFRLEVBQUUsQ0FBQyxFQUFFLENBQUM7WUFDeEMsTUFBTSxTQUFTLEdBQUcsV0FBVyxDQUFDLFFBQVEsQ0FBQyxRQUFRLEVBQUUsQ0FBQyxDQUFDO1lBQ25ELElBQUksQ0FBQyxpQkFBaUIsQ0FBQyxTQUFTLENBQUMsQ0FBQztRQUNwQyxDQUFDO0lBQ0gsQ0FBQztJQUVNLGtCQUFrQixDQUFDLEtBQVU7UUFDbEMsS0FBSyxNQUFNLENBQUMsSUFBSSxFQUFFLEtBQUssQ0FBQyxJQUFJLE1BQU0sQ0FBQyxPQUFPLENBQUMsSUFBSSxDQUFDLEtBQUssQ0FBQyxDQUFDLEVBQUUsQ0FBQztZQUN4RCxJQUFJLENBQUMsTUFBTSxDQUFDLE1BQU0sQ0FBQyxLQUFLLEVBQUUsSUFBSSxDQUFDLEVBQUUsQ0FBQztnQkFDaEMsTUFBTSxJQUFJLEdBQUcsS0FBSyxDQUFDLElBQUksSUFBSSxPQUFPLEtBQUssQ0FBQyxLQUFLLENBQUM7Z0JBQzlDLE1BQU0sV0FBVyxHQUFHLEtBQUssQ0FBQyxXQUFXLElBQUksRUFBRSxDQUFDO2dCQUM1QyxJQUFJLEtBQUssR0FBRyxLQUFLLENBQUMsT0FBTyxDQUFDLEtBQUssQ0FBQyxLQUFLLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBRSxHQUFHLEtBQUssQ0FBQyxLQUFLLENBQUUsQ0FBQyxDQUFDLENBQUMsS0FBSyxDQUFDLEtBQUssQ0FBQztnQkFDMUUsSUFBSSxLQUFLLEtBQUssb0JBQW9CO29CQUNoQyxLQUFLLEdBQUcsS0FBSyxDQUFDLGVBQWUsQ0FBQztxQkFDM0IsSUFBSSxLQUFLLEtBQUssd0JBQXdCO29CQUN6QyxLQUFLLEdBQUcsS0FBSyxDQUFDLG1CQUFtQixDQUFDO3FCQUMvQixJQUFJLEtBQUssS0FBSyx5QkFBeUI7b0JBQzFDLEtBQUssR0FBRyxLQUFLLENBQUMsb0JBQW9CLENBQUM7cUJBQ2hDLElBQUksS0FBSyxDQUFDLEtBQUssS0FBSywyQkFBMkI7b0JBQ2xELEtBQUssR0FBRyxLQUFLLENBQUMsZ0JBQWdCLENBQUM7Z0JBRWpDLE1BQU0sVUFBVSxHQUFHLE1BQU0sQ0FBQyxJQUFJLENBQUMsQ0FBQztnQkFDaEMsS0FBSyxDQUFDLFVBQVUsQ0FBQyxHQUFHLGlCQUFpQixDQUFDLElBQUksRUFBRSxLQUFLLENBQUMsQ0FBQztnQkFFbkQsTUFBTSxDQUFDLGNBQWMsQ0FBQyxLQUFLLEVBQUUsSUFBSSxFQUFFO29CQUNqQyxVQUFVLEVBQUUsSUFBSTtvQkFDaEIsR0FBRzt3QkFDRCxPQUFPLElBQUksQ0FBQyxVQUFVLENBQUMsQ0FBQztvQkFDMUIsQ0FBQztvQkFDRCxHQUFHLENBQUMsS0FBSzt3QkFDUCxJQUFJLENBQUMsVUFBVSxDQUFDLEdBQUcsaUJBQWlCLENBQUMsSUFBSSxFQUFFLEtBQUssQ0FBQyxDQUFDO29CQUNwRCxDQUFDO2lCQUNGLENBQUMsQ0FBQztZQUNMLENBQUM7UUFDSCxDQUFDO0lBQ0gsQ0FBQztJQUVNLG1CQUFtQixDQUFDLFFBQWdCO1FBQ3pDLE1BQU0sSUFBSSxHQUFHLElBQUksQ0FBQyxTQUFTLENBQUMsSUFBSSxDQUFDLEtBQUssQ0FBQyxFQUFFLElBQUksRUFBRSxDQUFDLENBQUMsQ0FBQztRQUNsRCw0REFBZ0IsQ0FBQyxRQUFRLEVBQUUsSUFBSSxFQUFFLE9BQU8sQ0FBQyxDQUFDO0lBQzVDLENBQUM7SUFFTSxlQUFlLENBQUMsS0FBVTtRQUMvQixJQUFJLENBQUMsV0FBVyxDQUFDLENBQUMsSUFBSSxDQUFDLEtBQUssQ0FBQyxDQUFDO0lBQ2hDLENBQUM7SUFFTSxrQkFBa0IsQ0FBQyxJQUFZO1FBQ3BDLE9BQU8sSUFBSSxDQUFDLGVBQWUsQ0FBQyxDQUFDLElBQUksQ0FBQyxDQUFDO0lBQ3JDLENBQUM7SUFFTSxLQUFLLENBQUMsY0FBYztRQUN6QixPQUFPLElBQUksQ0FBQyxXQUFXLENBQUMsQ0FBQyxNQUFNLEVBQUUsQ0FBQztZQUNoQyxNQUFNLEtBQUssR0FBRyxJQUFJLENBQUMsV0FBVyxDQUFDLENBQUMsS0FBSyxFQUFFLENBQUM7WUFDeEMsSUFBSSxDQUFDLEtBQUs7Z0JBQ1IsU0FBUztZQUVYLElBQUksVUFBb0MsQ0FBQztZQUN6QyxNQUFNLFFBQVEsR0FBRyxDQUFFLEtBQUssRUFBRSxNQUFNLENBQUUsQ0FBQyxHQUFHLENBQUMsQ0FBQyxDQUFDLEVBQUUsQ0FBQyxZQUFZLEdBQUcsQ0FBQyxDQUFDLENBQUM7WUFDOUQsS0FBSyxNQUFNLFFBQVEsSUFBSSxRQUFRLEVBQUUsQ0FBQztnQkFDaEMsTUFBTSxJQUFJLEdBQUcsS0FBSyxDQUFDLFVBQVUsQ0FBQyxJQUFJLENBQUMsUUFBUSxDQUFDLENBQUM7Z0JBQzdDLElBQUksTUFBTSw2REFBVSxDQUFDLElBQUksQ0FBQyxRQUFRLEVBQUUsQ0FBQyxFQUFFLENBQUM7b0JBQ3RDLFVBQVUsR0FBRyxJQUFJLENBQUM7b0JBQ2xCLE1BQU07Z0JBQ1IsQ0FBQztZQUNILENBQUM7WUFFRCxJQUFJLENBQUMsVUFBVTtnQkFDYixNQUFNLElBQUksS0FBSyxDQUFDLHNCQUFzQixRQUFRLENBQUMsSUFBSSxDQUFDLElBQUksQ0FBQyxRQUFRLEtBQUssQ0FBQyxVQUFVLEdBQUcsQ0FBQyxDQUFDO1lBRXhGLEtBQUssQ0FBQyxXQUFXLEdBQUcsVUFBVSxDQUFDO1lBQy9CLEtBQUssQ0FBQyxVQUFVLEdBQUcsS0FBSyxDQUFDLFdBQVcsQ0FBQyxPQUFPLEVBQUUsQ0FBQztZQUUvQyxJQUFJLENBQUMsa0JBQWtCLENBQUMsS0FBSyxDQUFDLENBQUM7WUFFL0IsTUFBTSxPQUFPLEdBQUcsT0FBTyxDQUFDLEdBQUcsRUFBRSxDQUFDO1lBQzlCLE9BQU8sQ0FBQyxLQUFLLENBQUMsS0FBSyxDQUFDLFVBQVUsQ0FBQyxRQUFRLEVBQUUsQ0FBQyxDQUFDO1lBRTNDLE1BQU0sTUFBTSxHQUFHLE1BQU0sNERBQVksQ0FBQyxLQUFLLENBQUMsV0FBVyxDQUFDLFFBQVEsRUFBRSxDQUFDLENBQUM7WUFDaEUsSUFBSSxDQUFDLE1BQU0sQ0FBQyxPQUFPO2dCQUNqQixNQUFNLElBQUksS0FBSyxDQUFDLGdCQUFnQixLQUFLLENBQUMsV0FBVyxDQUFDLFFBQVEsRUFBRSwrQkFBK0IsQ0FBQyxDQUFDO1lBQy9GLE1BQU0sRUFBRSxHQUFHLDJEQUFXLENBQUMsTUFBTSxDQUFDLEtBQUssRUFBRSxJQUFJLENBQUMsQ0FBQztZQUMzQyxNQUFNLE1BQU0sR0FBRyxNQUFNLENBQUMsT0FBTyxDQUFDLEVBQUUsQ0FBQyxDQUFDO1lBQ2xDLElBQUksTUFBTSxZQUFZLE9BQU87Z0JBQzNCLE1BQU0sTUFBTSxDQUFDO1lBQ2YscURBQVcsQ0FBQyxjQUFjLENBQUMsS0FBSyxFQUFFLEVBQUUsQ0FBQyxDQUFDO1lBRXRDLE9BQU8sQ0FBQyxLQUFLLENBQUMsT0FBTyxDQUFDLENBQUM7UUFDekIsQ0FBQztJQUNILENBQUM7SUFFTSxXQUFXLENBQUMsS0FBVTtRQUMzQixLQUFLLE1BQU0sSUFBSSxJQUFJLE1BQU0sQ0FBQyxNQUFNLENBQUMsSUFBSSxDQUFDLGVBQWUsQ0FBQyxDQUFDLEVBQUUsQ0FBQztZQUN4RCxNQUFNLE1BQU0sR0FBRyxJQUFJLENBQUMsT0FBTyxDQUFDLENBQUMsR0FBRyxDQUFDLElBQUksQ0FBQyxJQUFJLENBQUMsQ0FBQztZQUM1QyxNQUFNLENBQUMsVUFBVSxDQUFDLElBQUksQ0FBQyxPQUFPLENBQUMsQ0FBQztZQUNoQyxNQUFNLENBQUMsUUFBUSxDQUFDLElBQUksQ0FBQyxHQUFHLElBQUksQ0FBQyxRQUFRLENBQUMsQ0FBQztZQUN2QyxNQUFNLENBQUMsT0FBTyxDQUFDLElBQUksQ0FBQyxHQUFHLElBQUksQ0FBQyxPQUFPLENBQUMsQ0FBQztZQUNyQyxNQUFNLENBQUMsZUFBZSxDQUFDLElBQUksQ0FBQyxHQUFHLElBQUksQ0FBQyxlQUFlLENBQUMsQ0FBQztZQUNyRCxNQUFNLENBQUMsWUFBWSxDQUFDLElBQUksQ0FBQyxHQUFHLElBQUksQ0FBQyxZQUFZLENBQUMsQ0FBQztRQUNqRCxDQUFDO1FBRUQsS0FBSyxNQUFNLElBQUksSUFBSSxNQUFNLENBQUMsTUFBTSxDQUFDLElBQUksQ0FBQyxpQkFBaUIsQ0FBQyxDQUFDLEVBQUUsQ0FBQztZQUMxRCxNQUFNLE1BQU0sR0FBRyxJQUFJLENBQUMsY0FBYyxDQUFDLENBQUMsR0FBRyxDQUFDLElBQUksQ0FBQyxJQUFJLENBQUMsQ0FBQztZQUNuRCxJQUFJLENBQUMsTUFBTTtnQkFDVCxNQUFNLElBQUksS0FBSyxDQUFDLGtDQUFrQyxJQUFJLENBQUMsSUFBSSxFQUFFLENBQUMsQ0FBQztZQUNqRSxLQUFLLE1BQU0sQ0FBQyxHQUFHLEVBQUUsSUFBSSxDQUFDLElBQUksTUFBTSxDQUFDLE9BQU8sQ0FBQyxJQUFJLENBQUMsVUFBVSxDQUFDO2dCQUN2RCxNQUFNLENBQUMsV0FBVyxDQUFDLEdBQUcsRUFBRSxHQUFHLElBQUksQ0FBQyxDQUFDO1FBQ3JDLENBQUM7UUFFRCxNQUFNLFFBQVEsR0FBRyxnRUFBYyxDQUFDLE1BQU0sRUFBRSxDQUFDO1FBQ3pDLEtBQUssTUFBTSxNQUFNLElBQUksSUFBSSxDQUFDLGNBQWMsQ0FBQyxDQUFDLE9BQU8sRUFBRSxDQUFDO1lBQ2xELE1BQU0sT0FBTyxHQUFHLEVBQUUsQ0FBQztZQUNuQixJQUFJLE1BQU0sQ0FBQyxNQUFNLFlBQVksb0RBQVk7Z0JBQ3ZDLE9BQU8sQ0FBQyxJQUFJLENBQUMsTUFBTSxDQUFDLE1BQU0sQ0FBQyxRQUFRLEVBQUUsQ0FBQyxDQUFDO1lBQ3pDLElBQUksTUFBTSxDQUFDLEtBQUs7Z0JBQ2QsT0FBTyxDQUFDLElBQUksQ0FBQyxNQUFNLENBQUMsS0FBSyxDQUFDLFFBQVEsRUFBRSxDQUFDLENBQUM7WUFDeEMsTUFBTSxHQUFHLEdBQUcsVUFBVSxHQUFHLGFBQWEsR0FBRyxNQUFNLENBQUMsWUFBWSxDQUFDLFVBQVUsQ0FBQyxRQUFRLENBQUMsTUFBTSxDQUFDLE1BQU0sQ0FBQyxHQUFHLFNBQVMsQ0FBQztZQUM1RyxNQUFNLE1BQU0sR0FBRyxFQUFFLEdBQUcsTUFBTSxDQUFDLFVBQVUsRUFBRSxHQUFHLE1BQU0sQ0FBQyxNQUFNLEVBQUUsQ0FBQztZQUMxRCxRQUFRLENBQUMsU0FBUyxDQUFDLE1BQU0sQ0FBQyxNQUFNLEVBQUUsRUFBRSxFQUFFLE9BQU8sRUFBRSxNQUFNLENBQUMsTUFBTSxDQUFDLFFBQVEsRUFBRSxFQUFFLE1BQU0sRUFBRSxHQUFHLENBQUMsQ0FBQztRQUN4RixDQUFDO1FBRUQsS0FBSyxNQUFNLENBQUMsSUFBSSxFQUFFLE1BQU0sQ0FBQyxJQUFJLE1BQU0sQ0FBQyxPQUFPLENBQUMsSUFBSSxDQUFDLE9BQU8sQ0FBQyxDQUFDLE9BQU8sQ0FBUSxFQUFFLENBQUM7WUFDMUUsTUFBTSxPQUFPLEdBQUcsSUFBSSxDQUFDLE9BQU8sQ0FBQyxDQUFDLFlBQVksQ0FBQyxNQUFNLENBQUMsQ0FBQztZQUNuRCxNQUFNLE9BQU8sR0FBRyxFQUFFLENBQUM7WUFDbkIsS0FBSyxNQUFNLENBQUMsSUFBSSxNQUFNLENBQUMsT0FBTyxFQUFFLENBQUM7Z0JBQy9CLElBQUksQ0FBQyxZQUFZLG9FQUFnQixFQUFFLENBQUM7b0JBQ2xDLE1BQU0sQ0FBQyxHQUFHLElBQUksQ0FBQyxPQUFPLENBQUMsQ0FBQyxHQUFHLENBQUMsQ0FBQyxDQUFDLFVBQVUsQ0FBQyxDQUFDO29CQUMxQyxLQUFLLE1BQU0sQ0FBQyxJQUFJLENBQUMsQ0FBQyxPQUFPLEVBQUUsQ0FBQzt3QkFDMUIsSUFBSSxDQUFDLFlBQVkseURBQVUsSUFBSSxDQUFDLENBQUMsV0FBVzs0QkFDMUMsT0FBTyxDQUFDLElBQUksQ0FBQyxDQUFDLENBQUMsV0FBVyxDQUFDLFFBQVEsRUFBRSxDQUFDLENBQUM7b0JBQzNDLENBQUM7b0JBQ0QsU0FBUztnQkFDWCxDQUFDO2dCQUVELElBQUksQ0FBQyxDQUFDLGdCQUFnQjtvQkFDcEIsU0FBUztnQkFFWCx3REFBWSxDQUFDLENBQUMsQ0FBQyxlQUFlLENBQUMsUUFBUSxFQUFFLEVBQUUsRUFBRSxTQUFTLEVBQUUsSUFBSSxFQUFFLENBQUMsQ0FBQztnQkFFaEUsTUFBTSxjQUFjLEdBQUcsTUFBTSxDQUFDLFlBQVksQ0FBQyxVQUFVLENBQUMsUUFBUSxDQUFDLENBQUMsQ0FBQyxXQUFXLENBQUMsQ0FBQztnQkFDOUUsTUFBTSxpQkFBaUIsR0FBRyxLQUFLLENBQUMsa0JBQWtCLENBQUMsUUFBUSxDQUFDLE1BQU0sQ0FBQyxZQUFZLENBQUMsVUFBVSxDQUFDLENBQUM7Z0JBQzVGLE1BQU0sR0FBRyxHQUFHLFVBQVUsR0FBRyxZQUFZLENBQUMsQ0FBQyxRQUFRLFdBQVcsaUJBQWlCLElBQUksY0FBYyxFQUFFLEdBQUcsU0FBUyxDQUFDO2dCQUU1RyxNQUFNLFdBQVcsR0FBRztvQkFDbEIsR0FBRyxJQUFJLENBQUMsT0FBTyxDQUFDLENBQUMsZ0JBQWdCLENBQUMsTUFBTSxDQUFDO29CQUN6QyxHQUFHLENBQUMsQ0FBQyxPQUFPO2lCQUNiLENBQUM7Z0JBRUYsTUFBTSxJQUFJLEdBQUcsRUFBRSxDQUFDO2dCQUNoQixJQUFJLENBQUMsSUFBSSxDQUFDLEdBQUcsV0FBVyxDQUFDLEdBQUcsQ0FBQyxDQUFDLENBQUMsRUFBRSxDQUFDLElBQUksR0FBRyxDQUFDLENBQUMsQ0FBQyxDQUFDO2dCQUM3QyxJQUFJLENBQUMsSUFBSSxDQUFDLEdBQUcsSUFBSSxDQUFDLE9BQU8sQ0FBQyxDQUFDLGFBQWEsQ0FBQyxNQUFNLENBQUMsQ0FBQyxHQUFHLENBQUMsQ0FBQyxDQUFDLEVBQUUsQ0FBQyxJQUFJLEdBQUcsQ0FBQyxDQUFDLENBQUMsQ0FBQztnQkFDckUsSUFBSSxDQUFDLElBQUksQ0FBQyxHQUFHLElBQUksQ0FBQyxPQUFPLENBQUMsQ0FBQyxtQkFBbUIsQ0FBQyxNQUFNLENBQUMsQ0FBQyxDQUFDO2dCQUN4RCxJQUFJLE1BQU0sQ0FBQyx5QkFBeUI7b0JBQ2xDLElBQUksQ0FBQyxJQUFJLENBQUMsT0FBTyxDQUFDLENBQUM7Z0JBQ3JCLElBQUksQ0FBQyxJQUFJLENBQUMsR0FBRyxDQUFDLENBQUMsYUFBYSxDQUFDLElBQUksRUFBRSxDQUFDLENBQUM7Z0JBQ3JDLElBQUksQ0FBQyxJQUFJLENBQUMsSUFBSSxFQUFFLGNBQWMsQ0FBQyxDQUFDO2dCQUNoQyxJQUFJLENBQUMsSUFBSSxDQUFDLElBQUksRUFBRSxDQUFDLENBQUMsSUFBSSxDQUFDLENBQUM7Z0JBQ3hCLE1BQU0sR0FBRyxHQUFHLE1BQU0sQ0FBQyxZQUFZLENBQUMsVUFBVSxDQUFDLFFBQVEsRUFBRSxDQUFDO2dCQUV0RCxNQUFNLE9BQU8sR0FBRyxNQUFNLENBQUMsWUFBWSxDQUFDLENBQUMsQ0FBQyxRQUFRLEdBQUcsV0FBVyxDQUFDLENBQUMsUUFBUSxFQUFFLENBQUM7Z0JBQ3pFLE1BQU0sTUFBTSxHQUFHLE1BQU0sQ0FBQyxZQUFZLENBQUMsVUFBVSxDQUFDLElBQUksQ0FBQyxjQUFjLENBQUMsQ0FBQyxRQUFRLEVBQUUsQ0FBQztnQkFDOUUsT0FBTyxDQUFDLElBQUksQ0FBQyxNQUFNLENBQUMsQ0FBQztnQkFFckIsUUFBUSxDQUFDLE9BQU8sQ0FBQyxNQUFNLEVBQUUsQ0FBRSxHQUFHLE9BQU8sRUFBRSxDQUFDLENBQUMsSUFBSSxDQUFFLEVBQUUsT0FBTyxFQUFFLElBQUksRUFBRSxHQUFHLEVBQUUsR0FBRyxDQUFDLENBQUM7WUFDNUUsQ0FBQztZQUVELE1BQU0sV0FBVyxHQUFHLElBQUksQ0FBQyxPQUFPLENBQUMsQ0FBQyxnQkFBZ0IsQ0FBQyxNQUFNLENBQUMsQ0FBQztZQUMzRCxJQUFJLE1BQU0sWUFBWSx3REFBYSxFQUFFLENBQUM7Z0JBQ3BDLE1BQU0sSUFBSSxHQUFHLE9BQU8sQ0FBQyxNQUFNLENBQUMsQ0FBQyxDQUFDLEVBQUUsQ0FBQyxDQUFDLENBQUMsUUFBUSxDQUFDLElBQUksQ0FBQyxJQUFJLENBQUMsQ0FBQyxRQUFRLENBQUMsTUFBTSxDQUFDLENBQUMsQ0FBQyxHQUFHLENBQUMsQ0FBQyxDQUFDLEVBQUUsQ0FBQyxNQUFNLENBQUMsUUFBUSxDQUFDLFFBQVEsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDO2dCQUMvRyxJQUFJLElBQUksQ0FBQyxNQUFNLEVBQUUsQ0FBQztvQkFDaEIsTUFBTSxJQUFJLEdBQUc7d0JBQ1gsR0FBRyxXQUFXO3dCQUNkLElBQUk7d0JBQ0osSUFBSSxFQUFFLE1BQU0sQ0FBQyxTQUFTO3dCQUN0QixHQUFHLElBQUk7cUJBQ1IsQ0FBQztvQkFDRixNQUFNLEdBQUcsR0FBRyxNQUFNLENBQUMsUUFBUSxDQUFDLFFBQVEsRUFBRSxDQUFDO29CQUN2QyxNQUFNLEdBQUcsR0FBRyw4QkFBOEIsTUFBTSxDQUFDLFNBQVMsRUFBRSxDQUFDO29CQUM3RCxRQUFRLENBQUMsT0FBTyxDQUFDLE1BQU0sQ0FBQyxJQUFJLENBQUMsUUFBUSxFQUFFLEVBQUUsT0FBTyxFQUFFLEtBQUssQ0FBQyxNQUFNLEVBQUUsSUFBSSxFQUFFLEdBQUcsRUFBRSxHQUFHLENBQUMsQ0FBQztnQkFDbEYsQ0FBQztxQkFDSSxDQUFDO29CQUNKLE1BQU0sQ0FBQyxJQUFJLENBQUMsbUJBQW1CLE1BQU0sQ0FBQyxJQUFJLEdBQUcsQ0FBQyxDQUFDO2dCQUNqRCxDQUFDO1lBQ0gsQ0FBQztZQUVELElBQUksTUFBTSxZQUFZLHdEQUFhLEVBQUUsQ0FBQztnQkFDcEMsTUFBTSxJQUFJLEdBQUcsT0FBTyxDQUFDLE1BQU0sQ0FBQyxDQUFDLENBQUMsRUFBRSxDQUFDLENBQUMsQ0FBQyxRQUFRLENBQUMsSUFBSSxDQUFDLElBQUksQ0FBQyxDQUFDLFFBQVEsQ0FBQyxNQUFNLENBQUMsQ0FBQyxDQUFDLEdBQUcsQ0FBQyxDQUFDLENBQUMsRUFBRSxDQUFDLE1BQU0sQ0FBQyxRQUFRLENBQUMsUUFBUSxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUM7Z0JBQy9HLElBQUksSUFBSSxDQUFDLE1BQU0sRUFBRSxDQUFDO29CQUNoQixNQUFNLElBQUksR0FBRyxDQUFFLElBQUksRUFBRSxNQUFNLENBQUMsU0FBUyxFQUFHLEdBQUcsSUFBSSxDQUFFLENBQUM7b0JBQ2xELE1BQU0sR0FBRyxHQUFHLE1BQU0sQ0FBQyxRQUFRLENBQUMsUUFBUSxFQUFFLENBQUM7b0JBQ3ZDLE1BQU0sR0FBRyxHQUFHLDhCQUE4QixNQUFNLENBQUMsU0FBUyxFQUFFLENBQUM7b0JBQzdELFFBQVEsQ0FBQyxPQUFPLENBQUMsTUFBTSxDQUFDLElBQUksQ0FBQyxRQUFRLEVBQUUsRUFBRSxPQUFPLEVBQUUsS0FBSyxDQUFDLEVBQUUsRUFBRSxJQUFJLEVBQUUsR0FBRyxFQUFFLEdBQUcsQ0FBQyxDQUFDO2dCQUM5RSxDQUFDO3FCQUNJLENBQUM7b0JBQ0osTUFBTSxDQUFDLElBQUksQ0FBQyxtQkFBbUIsTUFBTSxDQUFDLElBQUksR0FBRyxDQUFDLENBQUM7Z0JBQ2pELENBQUM7WUFDSCxDQUFDO1lBRUQsSUFBSSxNQUFNLFlBQVksd0RBQWEsRUFBRSxDQUFDO2dCQUNwQyxNQUFNLElBQUksS0FBSyxDQUFDLGlCQUFpQixDQUFDLENBQUM7WUFDckMsQ0FBQztZQUVELElBQUksTUFBTSxZQUFZLHFEQUFVLEVBQUUsQ0FBQztnQkFDakMsTUFBTSxJQUFJLEdBQUcsT0FBTyxDQUFDLE1BQU0sQ0FBQyxDQUFDLENBQUMsRUFBRSxDQUFDLENBQUMsQ0FBQyxRQUFRLENBQUMsSUFBSSxDQUFDLElBQUksQ0FBQyxDQUFDLFFBQVEsQ0FBQyxNQUFNLENBQUMsQ0FBQyxDQUFDLEdBQUcsQ0FBQyxDQUFDLENBQUMsRUFBRSxDQUFDLE1BQU0sQ0FBQyxRQUFRLENBQUMsUUFBUSxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUM7Z0JBQy9HLElBQUksSUFBSSxDQUFDLE1BQU0sRUFBRSxDQUFDO29CQUNoQixNQUFNLElBQUksR0FBRyxJQUFJLENBQUMsT0FBTyxDQUFDLENBQUMsY0FBYyxDQUFDLE1BQU0sQ0FBQyxDQUFDO29CQUNsRCxNQUFNLElBQUksR0FBRzt3QkFDWCxHQUFHLE1BQU0sQ0FBQyxZQUFZLENBQUMsU0FBUzt3QkFDaEMsR0FBRyxXQUFXO3dCQUNkLEdBQUcsSUFBSTt3QkFDUCxJQUFJLEVBQUUsTUFBTSxDQUFDLFNBQVM7d0JBQ3RCLEdBQUcsSUFBSSxDQUFDLEdBQUcsQ0FBQyxDQUFDLENBQUMsRUFBRSxDQUFDLE1BQU0sQ0FBQyxRQUFRLENBQUMsUUFBUSxDQUFDLENBQUMsQ0FBQyxDQUFDO3FCQUM5QyxDQUFDO29CQUNGLE1BQU0sR0FBRyxHQUFHLE1BQU0sQ0FBQyxRQUFRLENBQUMsUUFBUSxFQUFFLENBQUM7b0JBQ3ZDLE1BQU0sR0FBRyxHQUFHLDBCQUEwQixNQUFNLENBQUMsU0FBUyxFQUFFLENBQUM7b0JBQ3pELFFBQVEsQ0FBQyxPQUFPLENBQUMsTUFBTSxDQUFDLElBQUksQ0FBQyxRQUFRLEVBQUUsRUFBRSxPQUFPLENBQUMsTUFBTSxDQUFDLElBQUksQ0FBQyxFQUFFLEtBQUssQ0FBQyxZQUFZLEVBQUUsSUFBSSxFQUFFLEdBQUcsRUFBRSxHQUFHLENBQUMsQ0FBQztnQkFDckcsQ0FBQztxQkFDSSxDQUFDO29CQUNKLE1BQU0sQ0FBQyxJQUFJLENBQUMsbUJBQW1CLE1BQU0sQ0FBQyxJQUFJLEdBQUcsQ0FBQyxDQUFDO2dCQUNqRCxDQUFDO1lBQ0gsQ0FBQztZQUVELFFBQVEsQ0FBQyxTQUFTLENBQUMsSUFBSSxFQUFFLENBQUUsTUFBTSxDQUFDLElBQUksQ0FBQyxRQUFRLEVBQUUsQ0FBRSxFQUFFLGdCQUFnQixJQUFJLEVBQUUsQ0FBQyxDQUFDO1FBQy9FLENBQUM7UUFFRCxNQUFNLGFBQWEsR0FBRyxFQUFFLENBQUM7UUFDekIsS0FBSyxNQUFNLElBQUksSUFBSSxJQUFJLENBQUMsWUFBWSxDQUFDLEVBQUUsQ0FBQztZQUN0QyxJQUFJLEdBQUcsRUFBRSxJQUFJLENBQUM7WUFDZCxJQUFJLElBQUksQ0FBQyxLQUFLLFlBQVksb0RBQVksRUFBRSxDQUFDO2dCQUN2QyxJQUFJLEtBQUssQ0FBQyxxQkFBcUI7b0JBQzdCLFNBQVM7Z0JBQ1gsR0FBRyxHQUFHLElBQUksQ0FBQyxLQUFLLENBQUMsUUFBUSxFQUFFLENBQUM7Z0JBQzVCLE1BQU0sS0FBSyxHQUFJLElBQUksQ0FBQyxRQUFnQixDQUFDLFFBQVEsQ0FBQyxJQUFJLENBQUMsS0FBSyxDQUFDLENBQUM7Z0JBQzFELElBQUksR0FBRyxJQUFJLENBQUMsV0FBVyxDQUFDLElBQUksQ0FBQyxLQUFLLENBQUMsQ0FBQztZQUN0QyxDQUFDO2lCQUNJLElBQUksSUFBSSxDQUFDLEtBQUssWUFBWSxrRUFBZSxFQUFFLENBQUM7Z0JBQy9DLE1BQU0sTUFBTSxHQUFHLElBQUksQ0FBQyxPQUFPLENBQUMsQ0FBQyxHQUFHLENBQUMsSUFBSSxDQUFDLEtBQUssQ0FBQyxVQUFVLENBQUMsQ0FBQztnQkFDeEQsR0FBRyxHQUFHLE1BQU0sQ0FBQyxJQUFJLENBQUMsUUFBUSxFQUFFLENBQUM7Z0JBQzdCLElBQUksR0FBRyxJQUFJLENBQUMsV0FBVyxDQUFDLElBQUksQ0FBQyxNQUFNLENBQUMsU0FBUyxDQUFDLENBQUM7WUFDakQsQ0FBQztpQkFDSSxDQUFDO2dCQUNKLE1BQU0sSUFBSSxLQUFLLENBQUMsbUJBQW1CLElBQUksQ0FBQyxLQUFLLEVBQUUsQ0FBQztZQUNsRCxDQUFDO1lBQ0QsSUFBSSxLQUFLLENBQUMsT0FBTztnQkFDZixJQUFJLEdBQUcsS0FBSyxDQUFDLE9BQU8sQ0FBQyxJQUFJLENBQUMsSUFBSSxDQUFDLENBQUMsUUFBUSxFQUFFLENBQUM7WUFDN0MsUUFBUSxDQUFDLFNBQVMsQ0FBQyw0RUFBYyxFQUFFLEVBQUUsRUFBRSxDQUFFLEdBQUcsQ0FBRSxFQUFFLElBQUksRUFBRSxFQUFDLEdBQUcsRUFBRSxJQUFJLEVBQUMsRUFBRSxFQUFFLENBQUMsQ0FBQztZQUN2RSxhQUFhLENBQUMsSUFBSSxDQUFDLElBQUksQ0FBQyxDQUFDO1FBQzNCLENBQUM7UUFFRCxJQUFJLGFBQWEsQ0FBQyxNQUFNLEVBQUUsQ0FBQztZQUN6QixRQUFRLENBQUMsU0FBUyxDQUFDLHNEQUFjLEVBQUUsYUFBYSxFQUFFLEVBQUUsQ0FBQyxDQUFDO1FBQ3hELENBQUM7UUFFRCxRQUFRLENBQUMsU0FBUyxDQUFDLGtEQUFVLEVBQUUsTUFBTSxDQUFDLElBQUksQ0FBQyxJQUFJLENBQUMsT0FBTyxDQUFDLENBQUMsT0FBTyxDQUFDLEVBQUUsRUFBRSxDQUFDLENBQUM7UUFFdkUsT0FBTyxRQUFRLENBQUM7SUFDbEIsQ0FBQztJQUVNLE1BQU07UUFDWCxPQUFPO1lBQ0wsT0FBTyxFQUFFLElBQUksQ0FBQyxPQUFPO1lBQ3JCLGNBQWMsRUFBRSxJQUFJLENBQUMsY0FBYyxDQUFDO1lBQ3BDLEtBQUssRUFBRSxJQUFJLENBQUMsS0FBSztZQUNqQixlQUFlLEVBQUUsSUFBSSxDQUFDLGVBQWU7WUFDckMsaUJBQWlCLEVBQUUsSUFBSSxDQUFDLGlCQUFpQjtZQUN6QyxZQUFZLEVBQUUsSUFBSSxDQUFDLFlBQVksQ0FBQztZQUNoQyxvQkFBb0IsRUFBRSxJQUFJLENBQUMsb0JBQW9CO1lBQy9DLFlBQVksRUFBRSxJQUFJLENBQUMsWUFBWTtTQUNoQyxDQUFDO0lBQ0osQ0FBQztDQUNGO0FBQUEsQ0FBQzs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7QUNwY0Y7Ozs7Ozs7R0FPRztBQUUwQjtBQUNKO0FBQ3NCO0FBRUo7QUFDRztBQUU5QyxNQUFNLE9BQU8sR0FBRyxNQUFNLENBQUMsU0FBUyxDQUFDLENBQUM7QUFFbEMsSUFBSyxRQUlKO0FBSkQsV0FBSyxRQUFRO0lBQ1gsNkJBQWlCO0lBQ2pCLHlCQUFhO0lBQ2IsNkJBQWlCO0FBQ25CLENBQUMsRUFKSSxRQUFRLEtBQVIsUUFBUSxRQUlaO0FBQUEsQ0FBQztBQVFELENBQUM7QUFLRCxDQUFDO0FBTUQsQ0FBQztBQUVGLFNBQVMsc0JBQXNCLENBQUMsQ0FBTTtJQUNwQyxJQUFJLE9BQU8sQ0FBQyxLQUFLLFdBQVc7UUFDMUIsT0FBTyxDQUFDLENBQUM7SUFDWCxJQUFJLE9BQU8sQ0FBQyxLQUFLLFNBQVM7UUFDeEIsT0FBTyxDQUFDLENBQUM7SUFDWCxJQUFJLE9BQU8sQ0FBQyxLQUFLLFFBQVE7UUFDdkIsT0FBTyxDQUFDLENBQUM7SUFDWCxJQUFJLE9BQU8sQ0FBQyxLQUFLLFFBQVE7UUFDdkIsT0FBTyxDQUFDLENBQUM7SUFDWCxJQUFJLE9BQU8sQ0FBQyxLQUFLLFFBQVEsRUFBRSxDQUFDO1FBQzFCLElBQUksQ0FBQyxDQUFDO1lBQ0osT0FBTyxDQUFDLENBQUM7UUFDWCxJQUFJLENBQUMsWUFBWSxvREFBWSxFQUFFLENBQUM7WUFDOUIsT0FBTyxDQUFDLENBQUMsUUFBUSxFQUFFLENBQUM7UUFDdEIsQ0FBQztRQUNELElBQUksQ0FBQyxZQUFZLEtBQUssRUFBRSxDQUFDO1lBQ3ZCLE1BQU0sTUFBTSxHQUFHLEVBQUUsQ0FBQztZQUNsQixLQUFLLE1BQU0sQ0FBQyxJQUFJLENBQUM7Z0JBQ2YsTUFBTSxDQUFDLElBQUksQ0FBQyxzQkFBc0IsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDO1lBQ3pDLE9BQU8sTUFBTSxDQUFDO1FBQ2hCLENBQUM7UUFDRCxJQUFJLENBQUMsWUFBWSxNQUFNLEVBQUUsQ0FBQztZQUN4QixNQUFNLE1BQU0sR0FBUSxFQUFFLENBQUM7WUFDdkIsS0FBSyxNQUFNLENBQUMsQ0FBQyxFQUFDLENBQUMsQ0FBQyxJQUFJLE1BQU0sQ0FBQyxPQUFPLENBQUMsQ0FBQyxDQUFDO2dCQUNuQyxNQUFNLENBQUMsQ0FBQyxDQUFDLEdBQUcsc0JBQXNCLENBQUMsQ0FBQyxDQUFDLENBQUM7WUFDeEMsT0FBTyxNQUFNLENBQUM7UUFDaEIsQ0FBQztJQUNILENBQUM7SUFDRCxNQUFNLElBQUksS0FBSyxDQUFDLHVCQUF1QixDQUFDLEVBQUUsQ0FBQyxDQUFDO0FBQzlDLENBQUM7QUFFTSxNQUFNLGNBQWM7SUFDakIsQ0FBQyxPQUFPLENBQUMsQ0FBa0I7SUFFbkM7UUFDRSxJQUFJLENBQUMsT0FBTyxDQUFDLEdBQUcsSUFBSSxLQUFlLENBQUM7SUFDdEMsQ0FBQztJQUVELElBQVcsT0FBTztRQUNoQixPQUFPLElBQUksQ0FBQyxPQUFPLENBQUMsQ0FBQztJQUN2QixDQUFDO0lBRU0sTUFBTSxDQUFDLE1BQU07UUFDbEIsT0FBTyxNQUFNLENBQUMsSUFBSSxDQUFDLElBQUksY0FBYyxDQUFDLENBQUM7SUFDekMsQ0FBQztJQUVNLGtCQUFrQixDQUFDLE1BQWM7UUFDdEMsSUFBSSxDQUFDLE1BQU07WUFDVCxPQUFPLFNBQVMsQ0FBQztRQUNuQixPQUFPLElBQUksQ0FBQyxPQUFPLENBQUMsQ0FBQyxJQUFJLENBQUMsQ0FBQyxDQUFDLEVBQUUsRUFBRSxDQUFDLENBQUMsQ0FBQyxJQUFJLEtBQUssUUFBUSxDQUFDLE1BQU0sSUFBSSxDQUFDLENBQUMsTUFBTSxLQUFLLE1BQU0sQ0FBQyxDQUFDO0lBQ3RGLENBQUM7SUFFTSxpQkFBaUIsQ0FBQyxNQUFjO1FBQ3JDLE9BQU8sQ0FBQyxDQUFDLElBQUksQ0FBQyxrQkFBa0IsQ0FBQyxNQUFNLENBQUMsQ0FBQztJQUMzQyxDQUFDO0lBRU0sU0FBUyxDQUFDLE1BQStCLEVBQUUsSUFBWSxFQUFFLE9BQXNCLEVBQUUsTUFBYyxFQUFFLE1BQVcsRUFBRSxHQUFXO1FBQzlILElBQUksSUFBSSxDQUFDLGlCQUFpQixDQUFDLE1BQU0sQ0FBQyxRQUFRLEVBQUUsQ0FBQztZQUMzQyxNQUFNLElBQUksS0FBSyxDQUFDLFdBQVcsTUFBTSxVQUFVLENBQUMsQ0FBQztRQUMvQyxJQUFJLENBQUMsT0FBTyxDQUFDLENBQUMsSUFBSSxDQUFDLEVBQUUsSUFBSSxFQUFFLElBQUksRUFBRSxRQUFRLENBQUMsTUFBTSxFQUFFLE1BQU0sRUFBRSxNQUFNLEVBQUUsT0FBTyxFQUFFLE1BQU0sRUFBRSxHQUFHLEVBQWdCLENBQUMsQ0FBQztJQUMxRyxDQUFDO0lBRU0sT0FBTyxDQUFDLE1BQWMsRUFBRSxPQUFzQixFQUFFLE9BQWUsRUFBRSxJQUFtQixFQUFFLEdBQVcsRUFBRSxHQUFXO1FBQ25ILElBQUksQ0FBQyxPQUFPLENBQUMsQ0FBQyxJQUFJLENBQUMsRUFBRSxJQUFJLEVBQUUsRUFBRSxFQUFFLElBQUksRUFBRSxRQUFRLENBQUMsSUFBSSxFQUFFLE9BQU8sRUFBRSxNQUFNLEVBQUUsT0FBTyxFQUFFLElBQUksRUFBRSxHQUFHLEVBQUUsR0FBRyxFQUFjLENBQUMsQ0FBQztJQUM5RyxDQUFDO0lBRU0sU0FBUyxDQUFDLElBQVksRUFBRSxPQUFzQixFQUFFLEdBQVc7UUFDaEUsSUFBSSxDQUFDLE9BQU8sQ0FBQyxDQUFDLElBQUksQ0FBQyxFQUFFLElBQUksRUFBRSxJQUFJLEVBQUUsUUFBUSxDQUFDLE1BQU0sRUFBRSxPQUFPLEVBQUUsR0FBRyxFQUFFLE1BQU0sRUFBRSxFQUFFLEVBQUUsQ0FBQyxDQUFDO0lBQ2hGLENBQUM7SUFFTSxTQUFTLENBQUMsSUFBWTtRQUMzQixPQUFPLElBQUksQ0FBQyxPQUFPLENBQUMsQ0FBQyxJQUFJLENBQUMsQ0FBQyxDQUFDLEVBQUUsRUFBRSxDQUFDLENBQUMsQ0FBQyxJQUFJLEtBQUssUUFBUSxDQUFDLE1BQU0sSUFBSSxDQUFDLENBQUMsSUFBSSxLQUFLLElBQUksQ0FBQyxDQUFDO0lBQ2xGLENBQUM7SUFFTyxpQkFBaUIsQ0FBQyxJQUFZLEVBQUUsTUFBdUI7UUFDN0QsSUFBSSxNQUFNLENBQUMsSUFBSSxDQUFDLENBQUMsQ0FBQyxFQUFFLENBQUMsQ0FBQyxDQUFDLElBQUksS0FBSyxJQUFJLElBQUksQ0FBQyxDQUFDLE1BQU0sS0FBSyxJQUFJLENBQUMsRUFBRSxDQUFDO1lBQzNELE9BQU87UUFDVCxDQUFDO1FBRUQsTUFBTSxJQUFJLEdBQUcsSUFBSSxDQUFDLE9BQU8sQ0FBQyxDQUFDLElBQUksQ0FBQyxDQUFDLENBQUMsRUFBRSxDQUFDLENBQUMsQ0FBQyxJQUFJLEtBQUssSUFBSSxJQUFJLENBQUMsQ0FBQyxNQUFNLEtBQUssSUFBSSxDQUFDLENBQUM7UUFDM0UsSUFBSSxDQUFDLElBQUksRUFBRSxDQUFDO1lBQ1YsT0FBTztRQUNULENBQUM7UUFFRCxLQUFLLE1BQU0sSUFBSSxJQUFJLElBQUksQ0FBQyxPQUFPLEVBQUUsQ0FBQztZQUNoQyxJQUFJLENBQUMsaUJBQWlCLENBQUMsSUFBSSxDQUFDLFFBQVEsRUFBRSxFQUFFLE1BQU0sQ0FBQyxDQUFDO1FBQ2xELENBQUM7UUFFRCxNQUFNLENBQUMsSUFBSSxDQUFDLElBQUksQ0FBQyxDQUFDO0lBQ3BCLENBQUM7SUFFTSxhQUFhLENBQUMsSUFBVztRQUM5QixNQUFNLE1BQU0sR0FBRyxJQUFJLEtBQWUsQ0FBQztRQUNuQyxJQUFJLENBQUMsaUJBQWlCLENBQUMsSUFBSSxFQUFFLE1BQU0sQ0FBQyxDQUFDO1FBQ3JDLE9BQU8sTUFBTSxDQUFDO0lBQ2hCLENBQUM7SUFFTSxNQUFNO1FBQ1gsT0FBTyxJQUFJLENBQUMsT0FBTyxDQUFDLENBQUM7SUFDdkIsQ0FBQztJQUVNLE1BQU0sQ0FBQyxLQUFLLENBQUMsVUFBVSxDQUFDLFVBQTJCO1FBQ3hELElBQUksUUFBUSxHQUFHLENBQUMsQ0FBQztRQUNqQixLQUFLLE1BQU0sSUFBSSxJQUFJLFVBQVU7WUFDM0IsUUFBUSxJQUFJLElBQUksQ0FBQyxHQUFHLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDO1FBRS9CLElBQUksUUFBUSxHQUFHLENBQUMsQ0FBQztRQUNqQixLQUFLLE1BQU0sSUFBSSxJQUFJLFVBQVUsRUFBRSxDQUFDO1lBQzlCLE1BQU0sRUFBRSxJQUFJLEVBQUUsR0FBRyxFQUFFLEdBQUcsSUFBSSxDQUFDO1lBQzNCLElBQUksR0FBRyxFQUFFLENBQUM7Z0JBQ1IsTUFBTSxnQkFBZ0IsR0FBRyxJQUFJLENBQUMsS0FBSyxDQUFDLENBQUMsRUFBRSxRQUFRLEdBQUcsUUFBUSxDQUFDLEdBQUcsR0FBRyxDQUFDLENBQUM7Z0JBQ25FLE1BQU0sT0FBTyxHQUFHLEdBQUcsR0FBRyxnQkFBZ0IsQ0FBQyxRQUFRLEVBQUUsQ0FBQyxRQUFRLENBQUMsQ0FBQyxFQUFFLEdBQUcsQ0FBQyxHQUFHLEtBQUssQ0FBQztnQkFDM0UsT0FBTyxDQUFDLElBQUksQ0FBQyxPQUFPLEdBQUcsR0FBRyxDQUFDLENBQUM7WUFDOUIsQ0FBQztZQUNELElBQUksSUFBSSxLQUFLLFFBQVEsQ0FBQyxNQUFNLEVBQUUsQ0FBQztnQkFDN0IsTUFBTSxFQUFFLE1BQU0sRUFBRSxNQUFNLEVBQUUsR0FBRyxJQUFrQixDQUFDO2dCQUM5QyxJQUFJLE1BQU0sQ0FBQztnQkFDWCxJQUFJLE9BQU8sTUFBTSxLQUFLLFVBQVU7b0JBQzlCLE1BQU0sR0FBRyxNQUFNLENBQUM7O29CQUVoQixNQUFNLEdBQUcsQ0FBQyxNQUFNLDJEQUFZLENBQUMsTUFBTSxDQUFDLFFBQVEsRUFBRSxDQUFDLENBQUMsQ0FBQyxPQUFPLENBQUM7Z0JBQzNELE1BQU0sTUFBTSxHQUFHLE1BQU0sQ0FBQyxzQkFBc0IsQ0FBQyxNQUFNLENBQUMsQ0FBQyxDQUFDO2dCQUN0RCxJQUFJLE1BQU0sWUFBWSxPQUFPLEVBQUUsQ0FBQztvQkFDOUIsTUFBTSxNQUFNLENBQUM7Z0JBQ2YsQ0FBQztZQUNILENBQUM7aUJBQ0ksSUFBSSxJQUFJLEtBQUssUUFBUSxDQUFDLElBQUksRUFBRSxDQUFDO2dCQUNoQyxNQUFNLEVBQUUsT0FBTyxFQUFFLElBQUksRUFBRSxHQUFHLEVBQUUsTUFBTSxFQUFFLEdBQUcsSUFBZ0IsQ0FBQztnQkFDeEQsd0RBQVksQ0FBQyxzREFBVSxDQUFDLE9BQU8sQ0FBQyxNQUFNLENBQUMsRUFBRSxFQUFFLFNBQVMsRUFBRSxJQUFJLEVBQUUsQ0FBQyxDQUFDO2dCQUM5RCxNQUFNLE1BQU0sR0FBRyw2REFBUyxDQUFDLE9BQU8sRUFBRSxJQUFJLEVBQUUsRUFBRSxHQUFHLEVBQUUsUUFBUSxFQUFFLE9BQU8sRUFBRSxDQUFDLENBQUM7Z0JBQ3BFLElBQUksTUFBTSxDQUFDLEtBQUssSUFBSSxNQUFNLENBQUMsTUFBTSxFQUFFLENBQUM7b0JBQ2xDLE9BQU8sQ0FBQyxJQUFJLENBQUMsS0FBSyxHQUFHLEdBQUcsQ0FBQyxDQUFDO29CQUMxQixJQUFJLEdBQUcsR0FBRyxJQUFJLENBQUMsSUFBSSxDQUFDLEdBQUcsQ0FBQyxDQUFDO29CQUN6QixHQUFHLEdBQUcsT0FBTyxHQUFHLENBQUMsR0FBRyxDQUFDLENBQUMsQ0FBQyxHQUFHLENBQUMsQ0FBQyxDQUFDLEVBQUUsQ0FBQyxHQUFHLEdBQUcsQ0FBQztvQkFDdkMsT0FBTyxDQUFDLElBQUksQ0FBQyxHQUFHLENBQUMsQ0FBQztvQkFDbEIsT0FBTyxDQUFDLElBQUksQ0FBQyxFQUFFLENBQUMsQ0FBQztvQkFFakIsT0FBTyxDQUFDLEtBQUssQ0FBQyxNQUFNLENBQUMsTUFBTSxDQUFDLENBQUM7b0JBRTdCLElBQUksTUFBTSxDQUFDLEtBQUs7d0JBQ1osTUFBTSxNQUFNLENBQUMsS0FBSyxDQUFDO29CQUV2QixNQUFNLElBQUksS0FBSyxDQUFDLE1BQU0sQ0FBQyxLQUFZLElBQUksU0FBUyxHQUFHLE1BQU0sQ0FBQyxNQUFNLENBQUMsQ0FBQztnQkFDcEUsQ0FBQztZQUNILENBQUM7aUJBQ0ksSUFBSSxJQUFJLEtBQUssUUFBUSxDQUFDLE1BQU0sRUFBRSxDQUFDO1lBQ3BDLENBQUM7UUFDSCxDQUFDO0lBQ0gsQ0FBQztDQUNGO0FBQUEsQ0FBQzs7Ozs7Ozs7Ozs7Ozs7O0FDaE1GOzs7Ozs7O0dBT0c7QUFJSCxNQUFNLElBQUksR0FBRyxNQUFNLENBQUMsTUFBTSxDQUFDLENBQUM7QUFDNUIsTUFBTSxJQUFJLEdBQUcsTUFBTSxDQUFDLE1BQU0sQ0FBQyxDQUFDO0FBRXJCLE1BQU0sZ0JBQWdCO0lBQ25CLENBQUMsSUFBSSxDQUFDLENBQVM7SUFDZixDQUFDLElBQUksQ0FBQyxDQUFlO0lBRTdCLFlBQW9CLE9BQVksRUFBRSxPQUFxQjtRQUNyRCxJQUFJLENBQUMsSUFBSSxDQUFDLEdBQUcsT0FBTyxDQUFDLFFBQVEsRUFBRSxDQUFDO1FBQ2hDLElBQUksQ0FBQyxJQUFJLENBQUMsR0FBRyxPQUFPLENBQUMsT0FBTyxDQUFDLE9BQU8sQ0FBQyxDQUFDO0lBQ3hDLENBQUM7SUFFTSxNQUFNLENBQUMsTUFBTSxDQUFDLE9BQVksRUFBRSxPQUFxQjtRQUN0RCxPQUFPLE1BQU0sQ0FBQyxJQUFJLENBQUMsSUFBSSxnQkFBZ0IsQ0FBQyxPQUFPLEVBQUUsT0FBTyxDQUFDLENBQUMsQ0FBQztJQUM3RCxDQUFDO0lBRUQsSUFBSSxJQUFJO1FBQ04sT0FBTyxJQUFJLENBQUMsSUFBSSxDQUFDLENBQUM7SUFDcEIsQ0FBQztJQUVELElBQUksSUFBSTtRQUNOLE9BQU8sSUFBSSxDQUFDLElBQUksQ0FBQyxDQUFDO0lBQ3BCLENBQUM7SUFFRCxRQUFRO1FBQ04sT0FBTyxJQUFJLENBQUMsSUFBSSxDQUFDLENBQUMsUUFBUSxFQUFFLENBQUM7SUFDL0IsQ0FBQztJQUVELE1BQU07UUFDSixPQUFPO1lBQ0wsSUFBSSxFQUFFLElBQUksQ0FBQyxJQUFJO1lBQ2YsSUFBSSxFQUFFLElBQUksQ0FBQyxJQUFJO1NBQ2hCO0lBQ0gsQ0FBQztDQUNGO0FBQUEsQ0FBQzs7Ozs7Ozs7Ozs7Ozs7Ozs7QUM3Q0Y7Ozs7Ozs7R0FPRztBQUVzRDtBQUNLO0FBRzlELE1BQU0sS0FBSyxHQUFTLE1BQU0sQ0FBQyxPQUFPLENBQUMsQ0FBQztBQUNwQyxNQUFNLFdBQVcsR0FBRyxNQUFNLENBQUMsYUFBYSxDQUFDLENBQUM7QUFDMUMsTUFBTSxRQUFRLEdBQU0sTUFBTSxDQUFDLFVBQVUsQ0FBQyxDQUFDO0FBRWhDLE1BQU0sYUFBYTtJQUNoQixDQUFDLEtBQUssQ0FBQyxDQUFpQztJQUN4QyxDQUFDLFdBQVcsQ0FBQyxDQUFVO0lBQ3ZCLENBQUMsUUFBUSxDQUFDLENBQWlCO0lBRW5DLFlBQW9CLEtBQWtCLEVBQUUsS0FBOEMsRUFBRSxNQUFvQjtRQUMxRyxJQUFJLFdBQThDLENBQUM7UUFDbkQsSUFBSSxPQUFPLENBQUM7UUFDWixJQUFJLE9BQU8sTUFBTSxLQUFLLFFBQVE7WUFDNUIsV0FBVyxHQUFHLE1BQU0sQ0FBQzthQUNsQixJQUFJLE1BQU0sRUFBRSxDQUFDO1lBQ2hCLFdBQVcsR0FBRyxNQUFNLENBQUMsV0FBVyxDQUFDO1lBQ2pDLE9BQU8sR0FBRyxNQUFNLENBQUMsT0FBTyxDQUFDO1FBQzNCLENBQUM7UUFFRCxJQUFJLENBQUMsV0FBVztZQUNkLE1BQU0sSUFBSSxLQUFLLENBQUMsd0NBQXdDLENBQUMsQ0FBQztRQUU1RCxJQUFJLE9BQU87WUFDVCxPQUFPLEdBQUcsS0FBSyxDQUFDLFVBQVUsQ0FBQyxPQUFPLENBQUMsT0FBTyxDQUFDLENBQUM7UUFFOUMsSUFBSSxPQUFPLEtBQUssS0FBSyxRQUFRLElBQUksS0FBSyxZQUFZLG9EQUFZLEVBQUUsQ0FBQztZQUMvRCxLQUFLLEdBQUcsS0FBSyxDQUFDLFVBQVUsQ0FBQyxPQUFPLENBQUMsS0FBSyxDQUFDLFFBQVEsRUFBRSxDQUFpQixDQUFDO1lBQ25FLEtBQUssR0FBRyxnREFBUSxDQUFDLE1BQU0sQ0FBQyxLQUFLLENBQUMsQ0FBQztZQUMvQixPQUFPLEdBQUcsT0FBTyxJQUFJLEtBQUssQ0FBQyxPQUFPLEVBQUUsQ0FBQztRQUN2QyxDQUFDO2FBQ0ksSUFBSSxDQUFDLENBQUMsS0FBSyxZQUFZLGtFQUFlLENBQUMsRUFBRSxDQUFDO1lBQzdDLE1BQU0sSUFBSSxLQUFLLENBQUMsMEJBQTBCLEtBQUssRUFBRSxDQUFDLENBQUM7UUFDckQsQ0FBQztRQUVELElBQUksQ0FBQyxLQUFLLENBQUMsR0FBRyxLQUFLLENBQUM7UUFDcEIsSUFBSSxDQUFDLFdBQVcsQ0FBQyxHQUFHLCtDQUFPLENBQUMsTUFBTSxDQUFDLEtBQUssQ0FBQyxjQUFjLENBQUMsT0FBTyxDQUFDLFdBQVcsQ0FBQyxRQUFRLEVBQUUsQ0FBQyxDQUFDLFFBQVEsRUFBRSxDQUFDLENBQUM7UUFDcEcsSUFBSSxDQUFDLFFBQVEsQ0FBQyxHQUFHLE9BQU8sQ0FBQyxDQUFDLENBQUMsK0NBQU8sQ0FBQyxNQUFNLENBQUMsT0FBTyxDQUFDLFFBQVEsRUFBRSxDQUFDLENBQUMsQ0FBQyxDQUFDLElBQUksQ0FBQztJQUN2RSxDQUFDO0lBRU0sTUFBTSxDQUFDLE1BQU0sQ0FBQyxLQUFVLEVBQUUsS0FBOEMsRUFBRSxNQUFvQjtRQUNuRyxPQUFPLE1BQU0sQ0FBQyxJQUFJLENBQUMsSUFBSSxhQUFhLENBQUMsS0FBSyxFQUFFLEtBQUssRUFBRSxNQUFNLENBQUMsQ0FBQyxDQUFDO0lBQzlELENBQUM7SUFFRCxJQUFXLEtBQUs7UUFDZCxPQUFPLElBQUksQ0FBQyxLQUFLLENBQUMsQ0FBQztJQUNyQixDQUFDO0lBRUQsSUFBVyxXQUFXO1FBQ3BCLE9BQU8sSUFBSSxDQUFDLFdBQVcsQ0FBQyxDQUFDO0lBQzNCLENBQUM7SUFFRCxJQUFXLFFBQVE7UUFDakIsT0FBTyxJQUFJLENBQUMsUUFBUSxDQUFDLENBQUM7SUFDeEIsQ0FBQztJQUVNLE1BQU07UUFDWCxPQUFPO1lBQ0wsS0FBSyxFQUFFLElBQUksQ0FBQyxLQUFLO1lBQ2pCLFdBQVcsRUFBRSxJQUFJLENBQUMsV0FBVztZQUM3QixRQUFRLEVBQUUsSUFBSSxDQUFDLFFBQVE7U0FDeEIsQ0FBQztJQUNKLENBQUM7Q0FDRjtBQUFBLENBQUM7Ozs7Ozs7Ozs7Ozs7OztBQzNFRjs7Ozs7OztHQU9HO0FBRUgsTUFBTSxJQUFJLEdBQUcsTUFBTSxDQUFDLE1BQU0sQ0FBQyxDQUFDO0FBRXJCLE1BQU0saUJBQWlCO0lBQ3BCLENBQUMsSUFBSSxDQUFDLENBQVM7SUFFdkIsWUFBb0IsSUFBWTtRQUM5QixJQUFJLENBQUMsSUFBSSxDQUFDLEdBQUcsSUFBSSxDQUFDO0lBQ3BCLENBQUM7SUFFRCxJQUFXLFVBQVU7UUFDbkIsT0FBTyxJQUFJLENBQUMsSUFBSSxDQUFDLENBQUM7SUFDcEIsQ0FBQztJQUVNLFFBQVE7UUFDYixPQUFPLElBQUksR0FBRyxJQUFJLENBQUMsSUFBSSxDQUFDLEdBQUcsWUFBWSxDQUFDO0lBQzFDLENBQUM7SUFFTSxNQUFNO1FBQ1gsT0FBTyxJQUFJLENBQUMsUUFBUSxFQUFFLENBQUM7SUFDekIsQ0FBQztJQUVNLE1BQU0sQ0FBQyxNQUFNLENBQUMsSUFBWTtRQUMvQixPQUFPLE1BQU0sQ0FBQyxJQUFJLENBQUMsSUFBSSxpQkFBaUIsQ0FBQyxJQUFJLENBQUMsQ0FBQyxDQUFDO0lBQ2xELENBQUM7SUFFTSxNQUFNLENBQUMsY0FBYyxDQUFDLEtBQVU7UUFDckMsSUFBSSxLQUFLLFlBQVksaUJBQWlCO1lBQ3BDLE9BQU8sS0FBSyxDQUFDO1FBQ2YsTUFBTSxJQUFJLEtBQUssQ0FBQyxRQUFRLEtBQUssOEJBQThCLENBQUMsQ0FBQztJQUMvRCxDQUFDO0NBQ0Y7QUFBQSxDQUFDOzs7Ozs7Ozs7Ozs7Ozs7QUN2Q0Y7Ozs7Ozs7R0FPRztBQUVILE1BQU0sSUFBSSxHQUFHLE1BQU0sQ0FBQyxNQUFNLENBQUMsQ0FBQztBQUVyQixNQUFNLGdCQUFnQjtJQUNuQixDQUFDLElBQUksQ0FBQyxDQUFTO0lBRXZCLFlBQW9CLElBQVk7UUFDOUIsSUFBSSxDQUFDLElBQUksQ0FBQyxHQUFHLElBQUksQ0FBQztJQUNwQixDQUFDO0lBRU0sTUFBTSxDQUFDLE1BQU0sQ0FBQyxJQUFZO1FBQy9CLE9BQU8sTUFBTSxDQUFDLElBQUksQ0FBQyxJQUFJLGdCQUFnQixDQUFDLElBQUksQ0FBQyxDQUFDLENBQUM7SUFDakQsQ0FBQztJQUVNLE1BQU0sQ0FBQyxjQUFjLENBQUMsS0FBVTtRQUNyQyxJQUFJLEtBQUssWUFBWSxnQkFBZ0I7WUFDbkMsT0FBTyxLQUFLLENBQUM7UUFDZixNQUFNLElBQUksS0FBSyxDQUFDLFFBQVEsS0FBSyw2QkFBNkIsQ0FBQyxDQUFDO0lBQzlELENBQUM7SUFFRCxJQUFXLFVBQVU7UUFDbkIsT0FBTyxJQUFJLENBQUMsSUFBSSxDQUFDLENBQUM7SUFDcEIsQ0FBQztJQUVNLFFBQVE7UUFDYixPQUFPLElBQUksR0FBRyxJQUFJLENBQUMsSUFBSSxDQUFDLEdBQUcsV0FBVyxDQUFDO0lBQ3pDLENBQUM7SUFFTSxNQUFNO1FBQ1gsT0FBTyxJQUFJLENBQUMsUUFBUSxFQUFFLENBQUM7SUFDekIsQ0FBQztDQUNGO0FBQUEsQ0FBQzs7Ozs7Ozs7Ozs7Ozs7O0FDdkNGOzs7Ozs7O0dBT0c7QUFFSCxNQUFNLElBQUksR0FBUyxNQUFNLENBQUMsTUFBTSxDQUFDLENBQUM7QUFDbEMsTUFBTSxVQUFVLEdBQUcsTUFBTSxDQUFDLFlBQVksQ0FBQyxDQUFDO0FBTWpDLE1BQU0sZUFBZTtJQUNsQixDQUFDLElBQUksQ0FBQyxDQUFTO0lBQ2YsQ0FBQyxVQUFVLENBQUMsQ0FBbUI7SUFFdkMsWUFBb0IsSUFBWTtRQUM5QixJQUFJLENBQUMsSUFBSSxDQUFDLEdBQUcsSUFBSSxDQUFDO1FBQ2xCLElBQUksQ0FBQyxVQUFVLENBQUMsR0FBRyxFQUFFLENBQUM7SUFDeEIsQ0FBQztJQUVELElBQVcsSUFBSTtRQUNiLE9BQU8sSUFBSSxDQUFDLElBQUksQ0FBQyxDQUFDO0lBQ3BCLENBQUM7SUFFRCxJQUFXLFVBQVU7UUFDbkIsT0FBTyxJQUFJLENBQUMsVUFBVSxDQUFDLENBQUM7SUFDMUIsQ0FBQztJQUVNLFdBQVcsQ0FBQyxHQUFXLEVBQUUsR0FBRyxJQUFXO1FBQzVDLElBQUksUUFBUSxHQUFHLElBQUksQ0FBQyxVQUFVLENBQUMsQ0FBQyxHQUFHLENBQUMsQ0FBQztRQUNyQyxJQUFJLENBQUMsUUFBUSxFQUFFLENBQUM7WUFDZCxRQUFRLEdBQUcsRUFBRSxDQUFDO1lBQ2QsSUFBSSxDQUFDLFVBQVUsQ0FBQyxDQUFDLEdBQUcsQ0FBQyxHQUFHLFFBQVEsQ0FBQztRQUNuQyxDQUFDO1FBQ0QsSUFBSSxDQUFDLE9BQU8sQ0FBQyxDQUFDLENBQUMsRUFBRSxDQUFDLFFBQVEsQ0FBQyxJQUFJLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQztJQUN0QyxDQUFDO0lBRU0sTUFBTTtRQUNYLE9BQU87WUFDTCxJQUFJLEVBQUUsSUFBSSxDQUFDLElBQUk7WUFDZixVQUFVLEVBQUUsSUFBSSxDQUFDLFVBQVU7U0FDNUIsQ0FBQztJQUNKLENBQUM7SUFFTSxRQUFRO1FBQ2IsT0FBTyxJQUFJLENBQUMsSUFBSSxDQUFDLENBQUM7SUFDcEIsQ0FBQztJQUVNLE1BQU0sQ0FBQyxNQUFNLENBQUMsSUFBWTtRQUMvQixPQUFPLE1BQU0sQ0FBQyxJQUFJLENBQUMsSUFBSSxlQUFlLENBQUMsSUFBSSxDQUFDLENBQUMsQ0FBQztJQUNoRCxDQUFDO0lBRU0sTUFBTSxDQUFDLGNBQWMsQ0FBQyxLQUFVO1FBQ3JDLElBQUksS0FBSyxZQUFZLGVBQWU7WUFDbEMsT0FBTyxLQUFLLENBQUM7UUFDZixNQUFNLElBQUksS0FBSyxDQUFDLFFBQVEsS0FBSyw0QkFBNEIsQ0FBQyxDQUFDO0lBQzdELENBQUM7Q0FDRjtBQUFBLENBQUM7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7OztBQzlERjs7Ozs7OztHQU9HO0FBRXdDO0FBQ2tCO0FBQ0Y7QUFDQTtBQUNaO0FBRUo7QUFFM0MsTUFBTSxjQUFjLEdBQUcsTUFBTSxDQUFDLGdCQUFnQixDQUFDLENBQUM7QUFDaEQsTUFBTSxLQUFLLEdBQUcsTUFBTSxDQUFDLE9BQU8sQ0FBQyxDQUFDO0FBRXZCLE1BQU0sZUFBZTtJQUNsQixDQUFDLEtBQUssQ0FBQyxDQUFjO0lBQ3JCLENBQUMsY0FBYyxDQUFDLENBQU07SUFFOUIsWUFBb0IsS0FBVSxFQUFFLE9BQVk7UUFDMUMsSUFBSSxDQUFDLEtBQUssQ0FBQyxHQUFHLG9EQUFXLENBQUMsS0FBSyxDQUFDLEVBQUUsRUFBRSxLQUFLLENBQUMsQ0FBQztRQUMzQyxJQUFJLENBQUMsY0FBYyxDQUFDLEdBQUcsT0FBTyxDQUFDO0lBQ2pDLENBQUM7SUFFTSxNQUFNLENBQUMsTUFBTSxDQUFDLEtBQVUsRUFBRSxPQUFZO1FBQzNDLE9BQU8sTUFBTSxDQUFDLElBQUksQ0FBQyxJQUFJLGVBQWUsQ0FBQyxLQUFLLEVBQUUsT0FBTyxDQUFDLENBQUMsQ0FBQztJQUMxRCxDQUFDO0lBRU0sTUFBTSxDQUFDLGNBQWMsQ0FBQyxLQUFVO1FBQ3JDLElBQUksS0FBSyxZQUFZLGVBQWU7WUFDbEMsT0FBTyxLQUFLLENBQUM7UUFDZixNQUFNLElBQUksS0FBSyxDQUFDLFFBQVEsS0FBSyw0QkFBNEIsQ0FBQyxDQUFDO0lBQzdELENBQUM7SUFFRCxJQUFXLFVBQVU7UUFDbkIsT0FBTyxJQUFJLENBQUMsY0FBYyxDQUFDLENBQUMsSUFBSSxDQUFDO0lBQ25DLENBQUM7SUFFRCxJQUFXLFFBQVE7UUFDakIsT0FBTyxzRUFBaUIsQ0FBQyxNQUFNLENBQUMsSUFBSSxDQUFDLFVBQVUsQ0FBQyxDQUFDO0lBQ25ELENBQUM7SUFFRCxJQUFXLE9BQU87UUFDaEIsT0FBTyxvRUFBZ0IsQ0FBQyxNQUFNLENBQUMsSUFBSSxDQUFDLFVBQVUsQ0FBQyxDQUFDO0lBQ2xELENBQUM7SUFFTSxNQUFNO1FBQ1gsT0FBTyxJQUFJLENBQUMsUUFBUSxFQUFFLENBQUM7SUFDekIsQ0FBQztJQUVNLFFBQVE7UUFDYixPQUFPLElBQUksR0FBRyxJQUFJLENBQUMsVUFBVSxHQUFHLEdBQUcsQ0FBQztJQUN0QyxDQUFDO0lBRU0sVUFBVSxDQUFDLEdBQUcsT0FBK0Q7UUFDbEYsS0FBSyxJQUFJLEVBQUUsSUFBSSxPQUFPLENBQUMsSUFBSSxDQUFDLENBQUMsQ0FBQyxFQUFFLENBQUM7WUFDL0IsSUFBSSxFQUFFLFlBQVksb0VBQWdCLElBQUksRUFBRSxZQUFZLHdEQUFVLEVBQzVELENBQUMsRUFBQztpQkFDQyxJQUFJLE9BQU8sRUFBRSxLQUFLLFFBQVEsSUFBSSxvREFBWSxDQUFDLFVBQVUsQ0FBQyxFQUFFLENBQUM7Z0JBQzVELEVBQUUsR0FBRyx3REFBVSxDQUFDLE1BQU0sQ0FBQyxJQUFJLENBQUMsS0FBSyxDQUFDLEVBQUUsRUFBRSxDQUFDLENBQUM7O2dCQUV4QyxNQUFNLElBQUksS0FBSyxDQUFDLHdCQUF3QixFQUFFLEVBQUUsQ0FBQyxDQUFDO1lBQ2hELElBQUksQ0FBQyxjQUFjLENBQUMsQ0FBQyxPQUFPLENBQUMsSUFBSSxDQUFDLEVBQUUsQ0FBQyxDQUFDO1FBQ3hDLENBQUM7SUFDSCxDQUFDO0lBRU0sV0FBVyxDQUFDLEdBQUcsUUFBc0Q7UUFDMUUsS0FBSyxNQUFNLEVBQUUsSUFBSSxRQUFRLENBQUMsSUFBSSxDQUFDLENBQUMsQ0FBQyxFQUFFLENBQUM7WUFDbEMsSUFBSSxLQUFLLENBQUM7WUFDVixJQUFJLEVBQUUsWUFBWSxzRUFBaUI7Z0JBQ2pDLEtBQUssR0FBRyxFQUFFLENBQUM7aUJBQ1IsSUFBSSxPQUFPLEVBQUUsS0FBSyxRQUFRLElBQUksb0RBQVksQ0FBQyxVQUFVLENBQUMsRUFBRSxDQUFDO2dCQUM1RCxLQUFLLEdBQUcsb0VBQWdCLENBQUMsTUFBTSxDQUFDLEVBQUUsRUFBRSxJQUFJLENBQUMsS0FBSyxDQUFDLENBQUMsVUFBVSxDQUFDLENBQUM7O2dCQUU1RCxNQUFNLElBQUksS0FBSyxDQUFDLHdCQUF3QixFQUFFLEVBQUUsQ0FBQyxDQUFDO1lBQ2hELElBQUksQ0FBQyxjQUFjLENBQUMsQ0FBQyxRQUFRLENBQUMsSUFBSSxDQUFDLEVBQUUsS0FBSyxFQUFFLFdBQVcsRUFBRSxLQUFLLEVBQUUsQ0FBQyxDQUFDO1FBQ3BFLENBQUM7SUFDSCxDQUFDO0lBRU0saUJBQWlCLENBQUMsR0FBRyxRQUFzRDtRQUNoRixLQUFLLE1BQU0sRUFBRSxJQUFJLFFBQVEsQ0FBQyxJQUFJLENBQUMsQ0FBQyxDQUFDLEVBQUUsQ0FBQztZQUNsQyxJQUFJLEtBQUssQ0FBQztZQUNWLElBQUksRUFBRSxZQUFZLHNFQUFpQjtnQkFDakMsS0FBSyxHQUFHLEVBQUUsQ0FBQztpQkFDUixJQUFJLE9BQU8sRUFBRSxLQUFLLFFBQVEsSUFBSSxvREFBWSxDQUFDLFVBQVUsQ0FBQyxFQUFFLENBQUM7Z0JBQzVELEtBQUssR0FBRyxvRUFBZ0IsQ0FBQyxNQUFNLENBQUMsRUFBRSxFQUFFLElBQUksQ0FBQyxLQUFLLENBQUMsQ0FBQyxVQUFVLENBQUMsQ0FBQzs7Z0JBRTVELE1BQU0sSUFBSSxLQUFLLENBQUMsd0JBQXdCLEVBQUUsRUFBRSxDQUFDLENBQUM7WUFDaEQsSUFBSSxDQUFDLGNBQWMsQ0FBQyxDQUFDLFFBQVEsQ0FBQyxJQUFJLENBQUMsRUFBRSxLQUFLLEVBQUUsV0FBVyxFQUFFLElBQUksRUFBRSxDQUFDLENBQUM7UUFDbkUsQ0FBQztJQUNILENBQUM7SUFFTSxjQUFjLENBQUMsR0FBRyxXQUFxQjtRQUM1QyxLQUFLLE1BQU0sS0FBSyxJQUFJLFdBQVcsQ0FBQyxJQUFJLENBQUMsQ0FBQyxDQUFDO1lBQ3JDLElBQUksQ0FBQyxjQUFjLENBQUMsQ0FBQyxPQUFPLENBQUMsSUFBSSxDQUFDLEVBQUUsS0FBSyxFQUFFLENBQUMsQ0FBQztJQUNqRCxDQUFDO0lBRU0sb0JBQW9CLENBQUMsR0FBRyxXQUFxQjtRQUNsRCxLQUFLLE1BQU0sS0FBSyxJQUFJLFdBQVcsQ0FBQyxJQUFJLENBQUMsQ0FBQyxDQUFDO1lBQ3JDLElBQUksQ0FBQyxjQUFjLENBQUMsQ0FBQyxPQUFPLENBQUMsSUFBSSxDQUFDLEVBQUUsS0FBSyxFQUFFLFdBQVcsRUFBRSxJQUFJLEVBQUUsQ0FBQyxDQUFDO0lBQ3BFLENBQUM7SUFFTSxpQkFBaUIsQ0FBQyxHQUFHLE9BQWlCO1FBQzNDLEtBQUssTUFBTSxFQUFFLElBQUksT0FBTyxDQUFDLElBQUksQ0FBQyxDQUFDLENBQUMsRUFBRSxDQUFDO1lBQ2pDLElBQUksQ0FBQyxjQUFjLENBQUMsQ0FBQyxlQUFlLENBQUMsSUFBSSxDQUFDLEVBQUUsS0FBSyxFQUFFLEVBQUUsRUFBRSxDQUFDLENBQUM7UUFDM0QsQ0FBQztJQUNILENBQUM7SUFFTSxjQUFjLENBQUMsR0FBRyxPQUFpQjtRQUN4QyxLQUFLLE1BQU0sRUFBRSxJQUFJLE9BQU8sQ0FBQyxJQUFJLENBQUMsQ0FBQyxDQUFDLEVBQUUsQ0FBQztZQUNqQyxJQUFJLENBQUMsY0FBYyxDQUFDLENBQUMsWUFBWSxDQUFDLElBQUksQ0FBQyxFQUFFLEtBQUssRUFBRSxFQUFFLEVBQUUsQ0FBQyxDQUFDO1FBQ3hELENBQUM7SUFDSCxDQUFDO0lBRU0sdUJBQXVCLENBQUMsR0FBRyxPQUFpQjtRQUNqRCxLQUFLLE1BQU0sRUFBRSxJQUFJLE9BQU8sQ0FBQyxJQUFJLENBQUMsQ0FBQyxDQUFDLEVBQUUsQ0FBQztZQUNqQyxJQUFJLENBQUMsY0FBYyxDQUFDLENBQUMsZUFBZSxDQUFDLElBQUksQ0FBQyxFQUFFLEtBQUssRUFBRSxFQUFFLEVBQUUsV0FBVyxFQUFFLElBQUksRUFBRSxDQUFDLENBQUM7UUFDOUUsQ0FBQztJQUNILENBQUM7SUFFTSxvQkFBb0IsQ0FBQyxHQUFHLE9BQWlCO1FBQzlDLEtBQUssTUFBTSxFQUFFLElBQUksT0FBTyxDQUFDLElBQUksQ0FBQyxDQUFDLENBQUMsRUFBRSxDQUFDO1lBQ2pDLElBQUksQ0FBQyxjQUFjLENBQUMsQ0FBQyxZQUFZLENBQUMsSUFBSSxDQUFDLEVBQUUsS0FBSyxFQUFFLEVBQUUsRUFBRSxXQUFXLEVBQUUsSUFBSSxFQUFFLENBQUMsQ0FBQztRQUMzRSxDQUFDO0lBQ0gsQ0FBQztDQUNGO0FBQUEsQ0FBQzs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7O0FDbElGOzs7Ozs7O0dBT0c7QUFFMEI7QUFDRjtBQUUzQixNQUFNLElBQUksR0FBRyxNQUFNLENBQUMsTUFBTSxDQUFDLENBQUM7QUFFNUIsTUFBTSxNQUFNLEdBQUcsSUFBSSxHQUFHLEVBQThCLENBQUM7QUFFOUMsTUFBTSxZQUFZO0lBQ2YsQ0FBQyxJQUFJLENBQUMsQ0FBUztJQUV2QixZQUFzQixRQUFnQjtRQUNwQyxJQUFJLENBQUMsMkRBQWUsQ0FBQyxRQUFRLENBQUM7WUFDNUIsTUFBTSxJQUFJLEtBQUssQ0FBQyxtQ0FBbUMsUUFBUSxHQUFHLENBQUMsQ0FBQztRQUNsRSxJQUFJLENBQUMsSUFBSSxDQUFDLEdBQUcsUUFBUSxDQUFDO0lBQ3hCLENBQUM7SUFFTSxJQUFJLENBQUMsR0FBRyxLQUFtQztRQUNoRCxNQUFNLFFBQVEsR0FBRyxzREFBVSxDQUFDLElBQUksQ0FBQyxJQUFJLENBQUMsSUFBSSxDQUFDLEVBQUUsR0FBRyxLQUFLLENBQUMsR0FBRyxDQUFDLENBQUMsQ0FBQyxFQUFFLENBQUMsQ0FBQyxDQUFDLFFBQVEsRUFBRSxDQUFDLENBQUMsQ0FBQztRQUM5RSxPQUFPLFlBQVksQ0FBQyxNQUFNLENBQUMsUUFBUSxDQUFDLENBQUM7SUFDdkMsQ0FBQztJQUVNLE9BQU87UUFDWixPQUFPLE9BQU8sQ0FBQyxNQUFNLENBQUMsc0RBQVUsQ0FBQyxPQUFPLENBQUMsSUFBSSxDQUFDLElBQUksQ0FBQyxDQUFDLENBQUMsQ0FBQztJQUN4RCxDQUFDO0lBRU0sUUFBUTtRQUNiLE9BQU8seURBQWEsQ0FBQyxJQUFJLENBQUMsSUFBSSxDQUFDLENBQUMsQ0FBQztJQUNuQyxDQUFDO0lBRU0sUUFBUSxDQUFDLEVBQXlCO1FBQ3ZDLE9BQU8sc0RBQVUsQ0FBQyxRQUFRLENBQUMsSUFBSSxDQUFDLElBQUksQ0FBQyxFQUFFLENBQUMsRUFBRSxZQUFZLFlBQVksQ0FBQyxDQUFDLENBQUMsQ0FBQyxFQUFFLENBQUMsSUFBSSxDQUFDLENBQUMsQ0FBQyxDQUFDLEVBQUUsQ0FBQyxDQUFDO0lBQ3ZGLENBQUM7SUFFTSxPQUFPLENBQUMsR0FBRyxLQUFtQztRQUNuRCxPQUFPLFlBQVksQ0FBQyxNQUFNLENBQUMsc0RBQVUsQ0FBQyxPQUFPLENBQUMsSUFBSSxDQUFDLElBQUksQ0FBQyxFQUFFLEdBQUcsS0FBSyxDQUFDLEdBQUcsQ0FBQyxDQUFDLENBQUMsRUFBRSxDQUFDLENBQUMsQ0FBQyxRQUFRLEVBQUUsQ0FBQyxDQUFDLENBQUMsQ0FBQztJQUM5RixDQUFDO0lBRU0sS0FBSyxDQUFDLE1BQWM7UUFDekIsT0FBTyxJQUFJLENBQUMsSUFBSSxDQUFDLENBQUMsS0FBSyxDQUFDLE1BQU0sQ0FBQyxDQUFDO0lBQ2xDLENBQUM7SUFFTSxLQUFLO1FBQ1YsT0FBTyw2REFBaUIsQ0FBQyxJQUFJLENBQUMsSUFBSSxDQUFDLENBQUMsQ0FBQztJQUN2QyxDQUFDO0lBRU0sV0FBVztRQUNoQixPQUFPLElBQUksQ0FBQyxLQUFLLEVBQUUsQ0FBQyxRQUFRLEVBQUUsQ0FBQztJQUNqQyxDQUFDO0lBRU0sUUFBUTtRQUNiLE9BQU8sSUFBSSxDQUFDLElBQUksQ0FBQyxDQUFDO0lBQ3BCLENBQUM7SUFFTSxPQUFPO1FBQ1osT0FBTyxJQUFJLENBQUMsSUFBSSxDQUFDLENBQUM7SUFDcEIsQ0FBQztJQUVNLE1BQU07UUFDWCxPQUFPLElBQUksQ0FBQyxJQUFJLENBQUMsQ0FBQztJQUNwQixDQUFDO0lBRU0sTUFBTSxDQUFDLFVBQVUsQ0FBQyxRQUErQjtRQUN0RCxJQUFJLFFBQVEsWUFBWSxZQUFZO1lBQ2xDLE9BQU8sSUFBSSxDQUFDO1FBQ2QsT0FBTywyREFBZSxDQUFDLFFBQVEsQ0FBQyxDQUFDO0lBQ25DLENBQUM7SUFFTSxNQUFNLENBQUMsY0FBYyxDQUFDLEtBQVU7UUFDckMsSUFBSSxLQUFLLFlBQVksWUFBWTtZQUMvQixPQUFPLEtBQUssQ0FBQztRQUNmLE1BQU0sSUFBSSxLQUFLLENBQUMsUUFBUSxLQUFLLHlCQUF5QixDQUFDLENBQUM7SUFDMUQsQ0FBQztJQUVNLE1BQU0sQ0FBQyxNQUFNLENBQUMsSUFBMkI7UUFDOUMsTUFBTSxNQUFNLEdBQUcsTUFBTSxDQUFDLEdBQUcsQ0FBQyxJQUFJLENBQUMsUUFBUSxFQUFFLENBQUMsQ0FBQztRQUMzQyxJQUFJLE1BQU07WUFDUixPQUFPLE1BQU0sQ0FBQztRQUVoQixJQUFJLElBQUksWUFBWSxZQUFZO1lBQzlCLE9BQU8sSUFBSSxDQUFDO1FBRWQsT0FBTyxNQUFNLENBQUMsSUFBSSxDQUFDLElBQUksWUFBWSxDQUFDLElBQUksQ0FBQyxDQUFDLENBQUM7SUFDN0MsQ0FBQztDQUNGO0FBQUEsQ0FBQztBQUVLLE1BQU0sUUFBUyxTQUFRLFlBQVk7SUFDeEMsWUFBb0IsT0FBZTtRQUNqQyxLQUFLLENBQUMsT0FBTyxDQUFDLENBQUM7SUFDakIsQ0FBQztJQUVNLE1BQU0sQ0FBQyxjQUFjLENBQUMsS0FBVTtRQUNyQyxJQUFJLEtBQUssWUFBWSxRQUFRO1lBQzNCLE9BQU8sS0FBSyxDQUFDO1FBQ2YsTUFBTSxJQUFJLEtBQUssQ0FBQyxRQUFRLEtBQUsscUJBQXFCLENBQUMsQ0FBQztJQUN0RCxDQUFDO0lBRU0sTUFBTSxDQUFDLE1BQU0sQ0FBQyxJQUFTO1FBQzVCLElBQUksSUFBSSxZQUFZLFFBQVE7WUFDMUIsT0FBTyxJQUFJLENBQUM7UUFFZCxJQUFJLElBQUksWUFBWSxZQUFZO1lBQzlCLElBQUksR0FBRyxJQUFJLENBQUMsUUFBUSxFQUFFLENBQUM7UUFFekIsSUFBSSxPQUFPLElBQUksS0FBSyxRQUFRO1lBQzFCLE1BQU0sSUFBSSxLQUFLLENBQUMsUUFBUSxJQUFJLG1CQUFtQixDQUFDLENBQUM7UUFFbkQsSUFBSSxRQUFRLEdBQUcsTUFBTSxDQUFDLEdBQUcsQ0FBQyxJQUFJLENBQUMsQ0FBQztRQUNoQyxJQUFJLFFBQVE7WUFDVixPQUFPLFFBQVEsQ0FBQyxjQUFjLENBQUMsUUFBUSxDQUFDLENBQUM7UUFFM0MsUUFBUSxHQUFHLE1BQU0sQ0FBQyxJQUFJLENBQUMsSUFBSSxRQUFRLENBQUMsSUFBSSxDQUFDLENBQUMsQ0FBQztRQUMzQyxNQUFNLENBQUMsR0FBRyxDQUFDLElBQUksRUFBRSxRQUFRLENBQUMsQ0FBQztRQUUzQixPQUFPLFFBQVEsQ0FBQztJQUNsQixDQUFDO0NBQ0Y7QUFFTSxNQUFNLE9BQVEsU0FBUSxZQUFZO0lBQ3ZDLFlBQW9CLE9BQWU7UUFDakMsS0FBSyxDQUFDLE9BQU8sQ0FBQyxDQUFDO0lBQ2pCLENBQUM7SUFFTSxNQUFNLENBQUMsY0FBYyxDQUFDLEtBQVU7UUFDckMsSUFBSSxLQUFLLFlBQVksT0FBTztZQUMxQixPQUFPLEtBQUssQ0FBQztRQUNmLE1BQU0sSUFBSSxLQUFLLENBQUMsUUFBUSxLQUFLLG9CQUFvQixDQUFDLENBQUM7SUFDckQsQ0FBQztJQUVNLE1BQU0sQ0FBQyxNQUFNLENBQUMsSUFBUztRQUM1QixJQUFJLElBQUksWUFBWSxPQUFPO1lBQ3pCLE9BQU8sSUFBSSxDQUFDO1FBRWQsSUFBSSxJQUFJLFlBQVksWUFBWTtZQUM5QixJQUFJLEdBQUcsSUFBSSxDQUFDLFFBQVEsRUFBRSxDQUFDO1FBRXpCLElBQUksT0FBTyxJQUFJLEtBQUssUUFBUTtZQUMxQixNQUFNLElBQUksS0FBSyxDQUFDLFFBQVEsSUFBSSxtQkFBbUIsQ0FBQyxDQUFDO1FBRW5ELElBQUksT0FBTyxHQUFHLE1BQU0sQ0FBQyxHQUFHLENBQUMsSUFBSSxDQUFDLENBQUM7UUFDL0IsSUFBSSxPQUFPO1lBQ1QsT0FBTyxPQUFPLENBQUMsY0FBYyxDQUFDLE9BQU8sQ0FBQyxDQUFDO1FBRXpDLE9BQU8sR0FBRyxNQUFNLENBQUMsSUFBSSxDQUFDLElBQUksT0FBTyxDQUFDLElBQUksQ0FBQyxDQUFDLENBQUM7UUFDekMsTUFBTSxDQUFDLEdBQUcsQ0FBQyxJQUFJLEVBQUUsT0FBTyxDQUFDLENBQUM7UUFFMUIsT0FBTyxPQUFPLENBQUM7SUFDakIsQ0FBQztDQUNGO0FBQUEsQ0FBQzs7Ozs7Ozs7Ozs7Ozs7Ozs7QUM1SkY7Ozs7Ozs7R0FPRztBQUVtQztBQUVLO0FBRzNDLE1BQU0sTUFBTSxHQUFHLE1BQU0sQ0FBQyxRQUFRLENBQUMsQ0FBQztBQUNoQyxNQUFNLEtBQUssR0FBRyxNQUFNLENBQUMsT0FBTyxDQUFDLENBQUM7QUFFdkIsTUFBTSxhQUFhO0lBQ2hCLENBQUMsS0FBSyxDQUFDLENBQWM7SUFDckIsQ0FBQyxNQUFNLENBQUMsQ0FBZ0I7SUFFaEMsWUFBb0IsS0FBa0IsRUFBRSxNQUFXO1FBQ2pELElBQUksQ0FBQyxLQUFLLENBQUMsR0FBRyxLQUFLLENBQUM7UUFDcEIsSUFBSSxDQUFDLE1BQU0sQ0FBQyxHQUFHLE1BQU0sQ0FBQztJQUN4QixDQUFDO0lBRU0sTUFBTSxDQUFDLE1BQU0sQ0FBQyxLQUFrQixFQUFFLE1BQXFCO1FBQzVELE1BQU0sS0FBSyxHQUFHLGFBQWEsQ0FBQyxTQUFTLENBQUM7UUFDdEMsTUFBTSxRQUFRLEdBQUcsTUFBTSxDQUFDLE1BQU0sQ0FBQyxLQUFLLENBQUMsQ0FBQztRQUN0QyxvREFBVyxDQUFDLEtBQUssQ0FBQyxRQUFRLEVBQUUsS0FBSyxDQUFDLENBQUM7UUFDbkMsTUFBTSxJQUFJLEdBQUcsTUFBTSxDQUFDLE1BQU0sQ0FBQyxRQUFRLENBQUMsQ0FBQztRQUNyQyxJQUFJLENBQUMsS0FBSyxDQUFDLEdBQUcsUUFBUSxDQUFDO1FBQ3ZCLElBQUksQ0FBQyxNQUFNLENBQUMsR0FBRyxNQUFNLENBQUM7UUFDdEIsT0FBTyxJQUFJLENBQUM7SUFDZCxDQUFDO0lBRU0sb0JBQW9CLENBQUMsR0FBUSxFQUFFLElBQVM7UUFDN0MsTUFBTSxPQUFPLEdBQUcsSUFBSSxDQUFDLEtBQUssQ0FBQyxDQUFDLFVBQVUsQ0FBQyxPQUFPLENBQUMsR0FBRyxDQUFDLENBQUM7UUFDcEQsTUFBTSxRQUFRLEdBQUcsSUFBSSxDQUFDLEtBQUssQ0FBQyxDQUFDLFVBQVUsQ0FBQyxPQUFPLENBQUMsSUFBSSxDQUFDLENBQUM7UUFDdEQsSUFBSSxDQUFDLE1BQU0sQ0FBQyxDQUFDLG9CQUFvQixDQUFDLCtDQUFPLENBQUMsTUFBTSxDQUFDLE9BQU8sQ0FBQyxFQUFFLCtDQUFPLENBQUMsTUFBTSxDQUFDLFFBQVEsQ0FBQyxDQUFDLENBQUM7SUFDdkYsQ0FBQztJQUVNLE1BQU07UUFDWCxPQUFPLElBQUksQ0FBQyxLQUFLLENBQUMsQ0FBQztJQUNyQixDQUFDO0NBQ0Y7QUFBQSxDQUFDOzs7Ozs7Ozs7Ozs7Ozs7OztBQzdDRjs7Ozs7OztHQU9HO0FBRXlGO0FBQzVDO0FBRWhELE1BQU0sVUFBVSxHQUFHLE1BQU0sQ0FBQyxZQUFZLENBQUMsQ0FBQztBQUVqQyxJQUFVLFdBQVcsQ0FvSTNCO0FBcElELFdBQWlCLFdBQVc7SUFFNUIsU0FBUyxrQkFBa0IsQ0FBQyxLQUFVLEVBQUUsS0FBYSxFQUFFLElBQVksRUFBRSxVQUFlO1FBQ2xGLElBQUksSUFBSSxLQUFLLFlBQVksRUFBRSxDQUFDO1lBQzFCLE1BQU0sSUFBSSxLQUFLLENBQUMsR0FBRyxJQUFJLCtDQUErQyxDQUFDLENBQUM7UUFDMUUsQ0FBQztRQUVELElBQUksQ0FBQyxLQUFLLENBQUMsVUFBVSxDQUFDO1lBQ3BCLEtBQUssQ0FBQyxVQUFVLENBQUMsR0FBRyxFQUFFLENBQUM7UUFFekIsTUFBTSxJQUFJLEdBQUcsVUFBVSxDQUFDLElBQUksSUFBSSxDQUFDLEtBQUssQ0FBQyxPQUFPLENBQUMsVUFBVSxDQUFDLEtBQUssQ0FBQyxDQUFDLENBQUMsQ0FBQyxPQUFPLENBQUMsQ0FBQyxDQUFDLE9BQU8sVUFBVSxDQUFDLEtBQUssQ0FBQyxDQUFDO1FBRXRHLElBQUksV0FBVyxHQUFHLEtBQUssQ0FBQyxVQUFVLENBQUMsQ0FBQyxJQUFJLENBQUMsQ0FBQztRQUMxQyxJQUFJLENBQUMsV0FBVyxFQUFFLENBQUM7WUFDakIsV0FBVyxHQUFHLEVBQUUsS0FBSyxFQUFFLElBQUksRUFBRSxNQUFNLEVBQUUsTUFBTSxDQUFDLElBQUksQ0FBQyxFQUFFLENBQUM7WUFDcEQsS0FBSyxDQUFDLFVBQVUsQ0FBQyxDQUFDLElBQUksQ0FBQyxHQUFHLFdBQVcsQ0FBQztRQUN4QyxDQUFDO2FBQ0ksSUFBSSxLQUFLLEtBQUssV0FBVyxDQUFDLEtBQUssRUFBRSxDQUFDO1lBQ3JDLElBQUksV0FBVyxDQUFDLEtBQUs7Z0JBQ25CLE1BQU0sSUFBSSxLQUFLLENBQUMsMkJBQTJCLElBQUksb0JBQW9CLFdBQVcsQ0FBQyxLQUFLLHVCQUF1QixLQUFLLEdBQUcsQ0FBQyxDQUFDO1lBQ3ZILFdBQVcsQ0FBQyxLQUFLLEdBQUcsS0FBSyxDQUFDO1FBQzVCLENBQUM7UUFFRCxXQUFXLENBQUMsV0FBVyxHQUFHLFVBQVUsQ0FBQyxXQUFXLElBQUksV0FBVyxDQUFDLFdBQVcsSUFBSSxFQUFFLENBQUM7UUFFbEYsSUFBSSxXQUErQixDQUFDO1FBQ3BDLElBQUksS0FBSyxDQUFDLE9BQU8sQ0FBQyxJQUFJLENBQUMsRUFBRSxDQUFDO1lBQ3hCLElBQUksUUFBUSxDQUFDO1lBQ2IsS0FBSyxNQUFNLElBQUksSUFBSSxJQUFJLEVBQUUsQ0FBQztnQkFDeEIsTUFBTSxFQUFFLEdBQUcsT0FBTyxJQUFJLENBQUM7Z0JBQ3ZCLElBQUksQ0FBQyxRQUFRO29CQUNYLFFBQVEsR0FBRyxFQUFFLENBQUM7cUJBQ1gsSUFBSSxRQUFRLEtBQUssRUFBRTtvQkFDdEIsTUFBTSxJQUFJLEtBQUssQ0FBQyxvQkFBb0IsSUFBSSwyQkFBMkIsQ0FBQyxDQUFDO1lBQ3pFLENBQUM7WUFDRCxJQUFJLFFBQVEsS0FBSyxTQUFTLElBQUksUUFBUSxLQUFLLFFBQVEsSUFBSSxRQUFRLEtBQUssUUFBUTtnQkFDMUUsTUFBTSxJQUFJLEtBQUssQ0FBQyxRQUFRLElBQUksZ0JBQWdCLFFBQVEsT0FBTyxDQUFDLENBQUM7WUFDL0QsV0FBVyxHQUFHLENBQUMsS0FBVSxFQUFFLEVBQUU7Z0JBQzNCLElBQUksSUFBSSxDQUFDLFFBQVEsQ0FBQyxLQUFLLENBQUM7b0JBQ3RCLE9BQU8sS0FBSyxDQUFDO2dCQUNmLE1BQU0sSUFBSSxLQUFLLENBQUMsUUFBUSxLQUFLLGNBQWMsSUFBSSxFQUFFLENBQUMsQ0FBQztZQUNyRCxDQUFDO1FBQ0gsQ0FBQzthQUNJLElBQUksSUFBSSxLQUFLLFNBQVM7WUFDekIsV0FBVyxHQUFHLDREQUFhLENBQUM7YUFDekIsSUFBSSxJQUFJLEtBQUssUUFBUTtZQUN4QixXQUFXLEdBQUcsMkRBQVksQ0FBQzthQUN4QixJQUFJLElBQUksS0FBSyxRQUFRO1lBQ3hCLFdBQVcsR0FBRywyREFBWSxDQUFDO2FBQ3hCLElBQUksSUFBSSxLQUFLLE9BQU87WUFDdkIsV0FBVyxHQUFHLDBEQUFXLENBQUM7YUFDdkIsSUFBSSxJQUFJLEtBQUssU0FBUztZQUN6QixXQUFXLEdBQUcsK0NBQU8sQ0FBQyxNQUFNLENBQUM7YUFDMUIsSUFBSSxJQUFJLEtBQUssVUFBVTtZQUMxQixXQUFXLEdBQUcsZ0RBQVEsQ0FBQyxNQUFNLENBQUM7O1lBRTlCLE1BQU0sSUFBSSxLQUFLLENBQUMsYUFBYSxJQUFJLGVBQWUsSUFBSSxPQUFPLENBQUMsQ0FBQztRQUUvRCxJQUFJLFVBQVUsQ0FBQyxLQUFLLEtBQUssU0FBUyxFQUFFLENBQUM7WUFDbkMsV0FBVyxDQUFDLEtBQUssR0FBRyxDQUFDLElBQUksS0FBSyxPQUFPLENBQUMsQ0FBQyxDQUFDLENBQUMsS0FBSyxDQUFDLElBQUksQ0FBQyxVQUFVLENBQUMsS0FBSyxDQUFDLENBQUMsQ0FBQyxDQUFDLFdBQVcsQ0FBQyxVQUFVLENBQUMsS0FBSyxDQUFDLENBQUM7UUFDeEcsQ0FBQzthQUNJLENBQUM7WUFDSixXQUFXLENBQUMsS0FBSyxHQUFHLENBQUMsSUFBSSxLQUFLLE9BQU8sQ0FBQyxDQUFDLENBQUMsQ0FBQyxFQUFFLENBQUMsQ0FBQyxDQUFDLFNBQVMsQ0FBQztRQUMxRCxDQUFDO1FBRUQsTUFBTSxFQUFFLE1BQU0sRUFBRSxLQUFLLEVBQUUsR0FBRyxXQUFXLENBQUM7UUFFdEMsSUFBSSxLQUFLLENBQUMsTUFBTSxDQUFDLEtBQUssU0FBUyxJQUFJLEtBQUssS0FBSyxTQUFTO1lBQ3BELEtBQUssQ0FBQyxNQUFNLENBQUMsR0FBRyxLQUFLLENBQUMsT0FBTyxDQUFDLEtBQUssQ0FBQyxDQUFDLENBQUMsQ0FBQyxLQUFLLENBQUMsSUFBSSxDQUFDLEtBQUssQ0FBQyxDQUFDLENBQUMsQ0FBQyxLQUFLLENBQUM7UUFFbkUsTUFBTSxJQUFJLEdBQVE7WUFDaEIsWUFBWSxFQUFFLElBQUk7WUFDbEIsVUFBVSxFQUFFLElBQUk7WUFDaEIsR0FBRztnQkFDRCxNQUFNLEtBQUssR0FBRyxLQUFLLENBQUMsTUFBTSxDQUFDLENBQUM7Z0JBQzVCOytHQUMrRjtnQkFDL0YsT0FBTyxLQUFLLENBQUM7WUFDZixDQUFDO1lBQ0QsR0FBRyxDQUFDLEtBQVU7Z0JBQ1osS0FBSyxDQUFDLE1BQU0sQ0FBQyxHQUFHLFdBQVcsQ0FBQyxLQUFLLENBQUMsQ0FBQztZQUNyQyxDQUFDO1NBQ0YsQ0FBQztRQUVGLE1BQU0sQ0FBQyxjQUFjLENBQUMsS0FBSyxFQUFFLElBQUksRUFBRSxJQUFJLENBQUMsQ0FBQztJQUMzQyxDQUFDO0lBRUQsU0FBZ0IsY0FBYyxDQUFDLEtBQVUsRUFBRSxLQUFhLEVBQUUsSUFBWSxFQUFFLFVBQWU7UUFDckYsSUFBSSxDQUFDLEtBQUssRUFBRSxDQUFDO1lBQ1gsTUFBTSxJQUFJLEtBQUssQ0FBQyx5QkFBeUIsSUFBSSxnQ0FBZ0MsQ0FBQyxDQUFDO1FBQ2pGLENBQUM7UUFDRCxrQkFBa0IsQ0FBQyxLQUFLLEVBQUUsS0FBSyxFQUFFLElBQUksRUFBRSxVQUFVLENBQUMsQ0FBQztJQUNyRCxDQUFDO0lBTGUsMEJBQWMsaUJBSzdCO0lBRUQsU0FBZ0IsZUFBZSxDQUFDLEtBQVUsRUFBRSxLQUFhLEVBQUUsV0FBZ0I7UUFDekUsS0FBSyxNQUFNLENBQUUsSUFBSSxFQUFFLFVBQVUsQ0FBRSxJQUFJLE1BQU0sQ0FBQyxPQUFPLENBQUMsV0FBVyxDQUFDO1lBQzVELFdBQVcsQ0FBQyxjQUFjLENBQUMsS0FBSyxFQUFFLEtBQUssRUFBRSxJQUFJLEVBQUUsVUFBVSxDQUFDLENBQUM7SUFDL0QsQ0FBQztJQUhlLDJCQUFlLGtCQUc5QjtJQUVELFNBQWdCLEtBQUssQ0FBQyxNQUFXLEVBQUUsS0FBVTtRQUMzQyxJQUFJLEtBQUssQ0FBQyxVQUFVLENBQUMsRUFBRSxDQUFDO1lBQ3RCLEtBQUssTUFBTSxDQUFFLElBQUksRUFBRSxFQUFFLEtBQUssRUFBRSxNQUFNLEVBQUUsSUFBSSxFQUFFLEtBQUssRUFBRSxXQUFXLEVBQUUsQ0FBRSxJQUFJLE1BQU0sQ0FBQyxPQUFPLENBQUMsS0FBSyxDQUFDLFVBQVUsQ0FBQyxDQUFRLEVBQUUsQ0FBQztnQkFDN0csa0JBQWtCLENBQUMsTUFBTSxFQUFFLEtBQUssRUFBRSxJQUFJLEVBQUUsRUFBRSxJQUFJLEVBQUUsS0FBSyxFQUFFLFdBQVcsRUFBRSxDQUFDLENBQUM7Z0JBQ3RFLElBQUksS0FBSyxDQUFDLE1BQU0sQ0FBQyxLQUFLLFNBQVM7b0JBQzdCLE1BQU0sQ0FBQyxJQUFJLENBQUMsR0FBRyxLQUFLLENBQUMsTUFBTSxDQUFDLENBQUM7WUFDakMsQ0FBQztRQUNILENBQUM7UUFDRCxPQUFPLE1BQU0sQ0FBQztJQUNoQixDQUFDO0lBVGUsaUJBQUssUUFTcEI7SUFFRCxTQUFnQixtQkFBbUIsQ0FBQyxLQUFVLEVBQUUsR0FBWTtRQUMxRCxNQUFNLE1BQU0sR0FBUSxFQUFFLENBQUM7UUFDdkIsS0FBSyxNQUFNLENBQUUsSUFBSSxFQUFFLEVBQUUsSUFBSSxFQUFFLEtBQUssRUFBRSxNQUFNLEVBQUUsV0FBVyxFQUFFLENBQUUsSUFBSSxNQUFNLENBQUMsT0FBTyxDQUFDLEtBQUssQ0FBQyxVQUFVLENBQUMsQ0FBUSxFQUFFLENBQUM7WUFDdEcsSUFBSSxLQUFLLElBQUksS0FBSyxLQUFLLEdBQUc7Z0JBQ3hCLFNBQVM7WUFDWCxNQUFNLENBQUMsSUFBSSxDQUFDLEdBQUcsRUFBRSxJQUFJLEVBQUUsV0FBVyxFQUFFLEtBQUssRUFBRSxLQUFLLENBQUMsTUFBTSxDQUFDLEVBQUUsQ0FBQztRQUM3RCxDQUFDO1FBQ0QsT0FBTyxNQUFNLENBQUM7SUFDaEIsQ0FBQztJQVJlLCtCQUFtQixzQkFRbEM7SUFFRCxTQUFnQixhQUFhLENBQUMsS0FBVSxFQUFFLElBQVksRUFBRSxLQUFVO1FBQ2hFLElBQUksTUFBTSxDQUFDLHdCQUF3QixDQUFDLEtBQUssRUFBRSxJQUFJLENBQUM7WUFDOUMsS0FBSyxDQUFDLElBQUksQ0FBQyxHQUFHLEtBQUssQ0FBQzs7WUFFcEIsa0JBQWtCLENBQUMsS0FBSyxFQUFFLEVBQUUsRUFBRSxJQUFJLEVBQUUsRUFBRSxLQUFLLEVBQUUsQ0FBQyxDQUFDO0lBQ25ELENBQUM7SUFMZSx5QkFBYSxnQkFLNUI7SUFFRCxTQUFnQixjQUFjLENBQUMsS0FBVSxFQUFFLFNBQWlCO1FBQzFELEtBQUssTUFBTSxDQUFFLElBQUksRUFBRSxLQUFLLENBQUUsSUFBSSxNQUFNLENBQUMsT0FBTyxDQUFDLFNBQVMsQ0FBQztZQUNyRCxXQUFXLENBQUMsYUFBYSxDQUFDLEtBQUssRUFBRSxJQUFJLEVBQUUsS0FBSyxDQUFDLENBQUM7SUFDbEQsQ0FBQztJQUhlLDBCQUFjLGlCQUc3QjtBQUVELENBQUMsRUFwSWdCLFdBQVcsS0FBWCxXQUFXLFFBb0kzQixDQUFDLGNBQWM7Ozs7Ozs7Ozs7Ozs7OztBQ2xKaEI7Ozs7Ozs7R0FPRztBQUlILE1BQU0sR0FBRyxHQUFHLE1BQU0sQ0FBQyxLQUFLLENBQUMsQ0FBQztBQUMxQixNQUFNLE9BQU8sR0FBRyxNQUFNLENBQUMsU0FBUyxDQUFDLENBQUM7QUFFM0IsTUFBTSxnQkFBZ0I7SUFDbkIsQ0FBQyxHQUFHLENBQUMsQ0FBbUM7SUFDeEMsQ0FBQyxPQUFPLENBQUMsQ0FBaUI7SUFFbEM7UUFDRSxJQUFJLENBQUMsR0FBRyxDQUFDLEdBQUcsRUFBRSxDQUFDO1FBQ2YsSUFBSSxDQUFDLE9BQU8sQ0FBQyxHQUFHLEVBQUUsQ0FBQztJQUNyQixDQUFDO0lBRU0sTUFBTSxDQUFDLE1BQU07UUFDbEIsT0FBTyxNQUFNLENBQUMsSUFBSSxDQUFDLElBQUksZ0JBQWdCLENBQUMsQ0FBQztJQUMzQyxDQUFDO0lBRUQsSUFBVyxPQUFPO1FBQ2hCLE9BQU8sSUFBSSxDQUFDLE9BQU8sQ0FBQyxDQUFDO0lBQ3ZCLENBQUM7SUFFTSxHQUFHLENBQUMsSUFBWTtRQUNyQixPQUFPLElBQUksQ0FBQyxHQUFHLENBQUMsQ0FBQyxJQUFJLENBQUMsQ0FBQztJQUN6QixDQUFDO0lBRU0sR0FBRyxDQUFDLElBQVksRUFBRSxNQUFvQjtRQUMzQyxJQUFJLENBQUMsSUFBSTtZQUNQLE1BQU0sSUFBSSxLQUFLLENBQUMsMENBQTBDLENBQUMsQ0FBQztRQUM5RCxJQUFJLElBQUksQ0FBQyxHQUFHLENBQUMsQ0FBQyxJQUFJLENBQUM7WUFDakIsTUFBTSxJQUFJLEtBQUssQ0FBQyxXQUFXLElBQUksVUFBVSxDQUFDLENBQUM7UUFDN0MsSUFBSSxDQUFDLEdBQUcsQ0FBQyxDQUFDLElBQUksQ0FBQyxHQUFHLE1BQU0sQ0FBQztRQUN6QixJQUFJLENBQUMsT0FBTyxDQUFDLENBQUMsSUFBSSxDQUFDLE1BQU0sQ0FBQyxDQUFDO0lBQzdCLENBQUM7SUFFTSxHQUFHLENBQUMsTUFBb0I7UUFDN0IsSUFBSSxDQUFDLE9BQU8sQ0FBQyxDQUFDLElBQUksQ0FBQyxNQUFNLENBQUMsQ0FBQztJQUM3QixDQUFDO0lBRU0sTUFBTTtRQUNYLE9BQU8sSUFBSSxDQUFDLE9BQU8sQ0FBQyxDQUFDO0lBQ3ZCLENBQUM7Q0FDRjtBQUFBLENBQUM7Ozs7Ozs7Ozs7Ozs7Ozs7QUNuREY7Ozs7Ozs7R0FPRztBQUVnRDtBQUluRCxNQUFNLElBQUksR0FBa0IsTUFBTSxDQUFDLE1BQU0sQ0FBQyxDQUFDO0FBQzNDLE1BQU0sUUFBUSxHQUFjLE1BQU0sQ0FBQyxVQUFVLENBQUMsQ0FBQztBQUMvQyxNQUFNLGdCQUFnQixHQUFNLE1BQU0sQ0FBQyxrQkFBa0IsQ0FBQyxDQUFDO0FBQ3ZELE1BQU0sT0FBTyxHQUFlLE1BQU0sQ0FBQyxTQUFTLENBQUMsQ0FBQztBQUM5QyxNQUFNLGFBQWEsR0FBUyxNQUFNLENBQUMsZUFBZSxDQUFDLENBQUM7QUFDcEQsTUFBTSxJQUFJLEdBQWtCLE1BQU0sQ0FBQyxNQUFNLENBQUMsQ0FBQztBQUMzQyxNQUFNLFdBQVcsR0FBVyxNQUFNLENBQUMsYUFBYSxDQUFDLENBQUM7QUFFbEQsTUFBTSxtQkFBbUIsR0FBRztJQUMxQixHQUFHLEVBQUUsQ0FBRSxNQUFNLEVBQUUsSUFBSSxDQUFFO0lBQ3JCLENBQUMsRUFBSSxDQUFFLElBQUksQ0FBRTtJQUNiLEdBQUcsRUFBRSxDQUFDLE1BQU0sRUFBRSxLQUFLLEVBQUUsTUFBTSxDQUFFO0NBQzlCLENBQUM7QUFFRixTQUFTLGlCQUFpQixDQUFDLFFBQWdCO0lBQ3pDLE9BQU8sbUJBQW1CLENBQUMsY0FBYyxDQUFDLFFBQVEsQ0FBQyxDQUFDO0FBQ3RELENBQUM7QUFFRCxTQUFTLGVBQWUsQ0FBQyxRQUFhO0lBQ3BDLE1BQU0saUJBQWlCLEdBQUcsUUFBUSxDQUFDLFFBQVEsRUFBRSxDQUFDLFdBQVcsRUFBRSxDQUFDO0lBQzVELEtBQUssTUFBTSxDQUFDLFFBQVEsRUFBRSxVQUFVLENBQUMsSUFBSSxNQUFNLENBQUMsT0FBTyxDQUFDLG1CQUFtQixDQUFDLEVBQUUsQ0FBQztRQUN6RSxLQUFLLE1BQU0sSUFBSSxJQUFJLFVBQVUsRUFBRSxDQUFDO1lBQzlCLElBQUksaUJBQWlCLENBQUMsUUFBUSxDQUFDLElBQUksQ0FBQztnQkFDbEMsT0FBTyxRQUFRLENBQUM7UUFDcEIsQ0FBQztJQUNILENBQUM7SUFDRCxPQUFPLEVBQUUsQ0FBQztBQUNaLENBQUM7QUFFRCxTQUFTLFlBQVksQ0FBQyxLQUFhO0lBQ2pDLElBQUksaUJBQWlCLENBQUMsS0FBSyxDQUFDO1FBQzFCLE9BQU8sS0FBSyxDQUFDO0lBQ2YsTUFBTSxJQUFJLEtBQUssQ0FBQyxhQUFhLEtBQUssb0JBQW9CLENBQUMsQ0FBQztBQUMxRCxDQUFDO0FBRU0sTUFBTSxVQUFVO0lBQ2IsQ0FBQyxJQUFJLENBQUMsQ0FBUztJQUNmLENBQUMsUUFBUSxDQUFDLENBQVM7SUFDbkIsQ0FBQyxnQkFBZ0IsQ0FBQyxDQUFVO0lBQzVCLENBQUMsSUFBSSxDQUFDLENBQWU7SUFDckIsQ0FBQyxXQUFXLENBQUMsQ0FBc0I7SUFDbkMsQ0FBQyxPQUFPLENBQUMsQ0FBVztJQUNwQixDQUFDLGFBQWEsQ0FBQyxDQUFXO0lBRWxDLFlBQW9CLEtBQWtCLEVBQUUsUUFBNkI7UUFDbkUsSUFBSSxDQUFDLElBQUksQ0FBQyxHQUFHLFFBQVEsQ0FBQyxRQUFRLEVBQUUsQ0FBQztRQUNqQyxNQUFNLEtBQUssR0FBRyxLQUFLLENBQUMsVUFBVSxDQUFDLE9BQU8sQ0FBQyxRQUFRLENBQUMsQ0FBQztRQUVqRCxNQUFNLFFBQVEsR0FBRyxlQUFlLENBQUMsS0FBSyxDQUFDLENBQUM7UUFDeEMsSUFBSSxDQUFDLFFBQVEsQ0FBQyxHQUFHLFFBQVEsQ0FBQztRQUMxQixJQUFJLENBQUMsZ0JBQWdCLENBQUMsR0FBRyxDQUFDLFFBQVEsQ0FBQztRQUNuQyxJQUFJLENBQUMsSUFBSSxDQUFDLEdBQUcsS0FBSyxDQUFDO1FBQ25CLElBQUksQ0FBQyxXQUFXLENBQUMsR0FBRyxJQUFJLENBQUM7UUFDekIsSUFBSSxDQUFDLE9BQU8sQ0FBQyxHQUFHLEVBQUUsQ0FBQztRQUNuQixJQUFJLENBQUMsYUFBYSxDQUFDLEdBQUcsQ0FBQyxRQUFRLENBQUMsQ0FBQyxDQUFDLEVBQUUsQ0FBQyxDQUFDLENBQUM7WUFDckMsR0FBSSxLQUFhLENBQUMsUUFBUSxHQUFHLFFBQVEsQ0FBQztZQUN0QyxHQUFJLEtBQWEsQ0FBQyxRQUFRLEdBQUcsU0FBUyxHQUFHLEtBQUssQ0FBQyxVQUFVLENBQUMsV0FBVyxFQUFFLENBQUM7U0FDekUsQ0FBQztJQUNKLENBQUM7SUFFTSxNQUFNLENBQUMsTUFBTSxDQUFDLEtBQVUsRUFBRSxRQUE2QjtRQUM1RCxPQUFPLE1BQU0sQ0FBQyxJQUFJLENBQUMsSUFBSSxVQUFVLENBQUMsS0FBSyxFQUFFLFFBQVEsQ0FBQyxDQUFDLENBQUM7SUFDdEQsQ0FBQztJQUVELElBQVcsSUFBSTtRQUNiLE9BQU8sSUFBSSxDQUFDLElBQUksQ0FBQyxDQUFDO0lBQ3BCLENBQUM7SUFFRCxJQUFXLFFBQVE7UUFDakIsT0FBTyxJQUFJLENBQUMsUUFBUSxDQUFDLENBQUM7SUFDeEIsQ0FBQztJQUVELElBQVcsZ0JBQWdCO1FBQ3pCLE9BQU8sSUFBSSxDQUFDLGdCQUFnQixDQUFDLENBQUM7SUFDaEMsQ0FBQztJQUVELElBQVcsZ0JBQWdCLENBQUMsS0FBYztRQUN4QyxJQUFJLENBQUMsZ0JBQWdCLENBQUMsR0FBRyxnRUFBYSxDQUFDLEtBQUssQ0FBQyxDQUFDO0lBQ2hELENBQUM7SUFFRCxJQUFXLE9BQU87UUFDaEIsT0FBTyxJQUFJLENBQUMsT0FBTyxDQUFDO0lBQ3RCLENBQUM7SUFFRCxJQUFXLGFBQWE7UUFDdEIsT0FBTyxJQUFJLENBQUMsYUFBYSxDQUFDLENBQUM7SUFDN0IsQ0FBQztJQUVELElBQVcsSUFBSTtRQUNiLE9BQU8sSUFBSSxDQUFDLElBQUksQ0FBQyxDQUFDO0lBQ3BCLENBQUM7SUFFRCxJQUFXLFFBQVE7UUFDakIsT0FBTyxJQUFJLENBQUMsSUFBSSxDQUFDLENBQUMsT0FBTyxFQUFFLENBQUM7SUFDOUIsQ0FBQztJQUVELElBQVcsU0FBUztRQUNsQixPQUFPLElBQUksQ0FBQyxJQUFJLENBQUMsQ0FBQyxRQUFRLEVBQUUsQ0FBQztJQUMvQixDQUFDO0lBRUQsSUFBVyxXQUFXO1FBQ3BCLE9BQU8sSUFBSSxDQUFDLFdBQVcsQ0FBQyxDQUFDO0lBQzNCLENBQUM7SUFFRCxJQUFXLFdBQVcsQ0FBQyxLQUFtQjtRQUN4QyxJQUFJLENBQUMsV0FBVyxDQUFDLEdBQUcsS0FBSyxDQUFDO0lBQzVCLENBQUM7SUFFRCxJQUFXLGVBQWU7UUFDeEIsT0FBTyxJQUFJLENBQUMsV0FBVyxDQUFDLENBQUMsQ0FBQyxDQUFDLElBQUksQ0FBQyxXQUFXLENBQUMsQ0FBQyxPQUFPLEVBQUUsQ0FBQyxDQUFDLENBQUMsSUFBSSxDQUFDO0lBQ2hFLENBQUM7SUFFRCxJQUFXLGdCQUFnQjtRQUN6QixPQUFPLElBQUksQ0FBQyxXQUFXLENBQUMsQ0FBQyxDQUFDLENBQUMsSUFBSSxDQUFDLFdBQVcsQ0FBQyxDQUFDLFFBQVEsRUFBRSxDQUFDLENBQUMsQ0FBQyxJQUFJLENBQUM7SUFDakUsQ0FBQztJQUVNLE1BQU07UUFDWCxPQUFPO1lBQ0wsSUFBSSxFQUFFLElBQUksQ0FBQyxJQUFJO1lBQ2YsUUFBUSxFQUFFLElBQUksQ0FBQyxRQUFRO1lBQ3ZCLGdCQUFnQixFQUFFLElBQUksQ0FBQyxnQkFBZ0I7WUFDdkMsT0FBTyxFQUFFLElBQUksQ0FBQyxPQUFPO1lBQ3JCLGFBQWEsRUFBRSxJQUFJLENBQUMsYUFBYTtZQUNqQyxJQUFJLEVBQUUsSUFBSSxDQUFDLElBQUk7WUFDZixRQUFRLEVBQUUsSUFBSSxDQUFDLFFBQVE7WUFDdkIsU0FBUyxFQUFFLElBQUksQ0FBQyxTQUFTO1lBQ3pCLFdBQVcsRUFBRSxJQUFJLENBQUMsV0FBVztZQUM3QixlQUFlLEVBQUUsSUFBSSxDQUFDLGVBQWU7WUFDckMsZ0JBQWdCLEVBQUUsSUFBSSxDQUFDLGdCQUFnQjtTQUN4QyxDQUFDO0lBQ0osQ0FBQztDQUNGOzs7Ozs7Ozs7Ozs7Ozs7O0FDaEpEOzs7Ozs7O0dBT0c7QUFFNEM7QUFHL0MsTUFBTSxPQUFPLEdBQUcsTUFBTSxDQUFDLFNBQVMsQ0FBQyxDQUFDO0FBRTNCLE1BQU0sY0FBYztJQUNqQixDQUFDLE9BQU8sQ0FBQyxDQUFlO0lBRWhDLFlBQW9CLEtBQWtCLEVBQUUsT0FBcUI7UUFDM0QsSUFBSSxDQUFDLE9BQU8sQ0FBQyxHQUFHLEVBQUUsQ0FBQztRQUNuQixLQUFLLE1BQU0sSUFBSSxJQUFJLE9BQU8sRUFBRSxDQUFDO1lBQzNCLElBQUksQ0FBQyxDQUFDLElBQUksWUFBWSx3REFBVSxDQUFDO2dCQUMvQixNQUFNLElBQUksS0FBSyxDQUFDLFFBQVEsSUFBSSxvQkFBb0IsQ0FBQyxDQUFDO1lBQ3BELElBQUksQ0FBQyxPQUFPLENBQUMsQ0FBQyxJQUFJLENBQUMsSUFBSSxDQUFDLENBQUM7UUFDM0IsQ0FBQztJQUNILENBQUM7SUFFTSxNQUFNLENBQUMsTUFBTSxDQUFDLEtBQWtCLEVBQUUsT0FBcUI7UUFDNUQsT0FBTyxNQUFNLENBQUMsSUFBSSxDQUFDLElBQUksY0FBYyxDQUFDLEtBQUssRUFBRSxPQUFPLENBQUMsQ0FBQyxDQUFDO0lBQ3pELENBQUM7SUFFTSxjQUFjLENBQUMsR0FBRyxXQUFxQjtRQUM1QyxLQUFLLE1BQU0sSUFBSSxJQUFJLFdBQVcsQ0FBQyxJQUFJLEVBQUU7WUFDbkMsSUFBSSxDQUFDLE9BQU8sQ0FBQyxDQUFDLE9BQU8sQ0FBQyxDQUFDLENBQUMsRUFBRSxDQUFDLENBQUMsQ0FBQyxPQUFPLENBQUMsSUFBSSxDQUFDLElBQUksQ0FBQyxDQUFDLENBQUM7SUFDckQsQ0FBQztJQUVNLGVBQWUsQ0FBQyxHQUFHLEtBQWU7UUFDdkMsS0FBSyxNQUFNLElBQUksSUFBSSxLQUFLLENBQUMsSUFBSSxFQUFFO1lBQzdCLElBQUksQ0FBQyxPQUFPLENBQUMsQ0FBQyxPQUFPLENBQUMsQ0FBQyxDQUFDLEVBQUUsQ0FBQyxDQUFDLENBQUMsYUFBYSxDQUFDLElBQUksQ0FBQyxJQUFJLENBQUMsQ0FBQyxDQUFDO0lBQzNELENBQUM7SUFFTSxRQUFRLENBQUMsS0FBYTtRQUMzQixPQUFPLElBQUksQ0FBQyxPQUFPLENBQUMsQ0FBQyxLQUFLLENBQUMsQ0FBQztJQUM5QixDQUFDO0lBRU0sV0FBVyxDQUFDLEtBQWE7UUFDOUIsT0FBTyxJQUFJLENBQUMsT0FBTyxDQUFDLENBQUMsTUFBTSxDQUFDO0lBQzlCLENBQUM7SUFFTSxNQUFNO1FBQ1gsT0FBTyxJQUFJLENBQUMsT0FBTyxDQUFDLENBQUM7SUFDdkIsQ0FBQztDQUNGO0FBQUEsQ0FBQzs7Ozs7Ozs7Ozs7Ozs7Ozs7OztBQ25ERjs7Ozs7OztHQU9HO0FBRXNCO0FBQzJDO0FBQ2I7QUFFdkQsaUVBQWU7SUFDYixXQUFXLEVBQUU7UUFDWCxXQUFXLEVBQUUsa0ZBQWtGO1FBQy9GLEtBQUssRUFBRSxPQUFPO0tBQ2Y7SUFDRCxnQkFBZ0IsRUFBRTtRQUNoQixXQUFXLEVBQUUscUNBQXFDO1FBQ2xELEtBQUssRUFBRSxRQUFRO0tBQ2hCO0lBQ0QsWUFBWSxFQUFFO1FBQ1osV0FBVyxFQUFFLDZCQUE2QjtRQUMxQyxLQUFLLEVBQUUsRUFBRTtLQUNWO0lBQ0QsZUFBZSxFQUFFO1FBQ2YsV0FBVyxFQUFFLGdDQUFnQztRQUM3QyxLQUFLLEVBQUUsRUFBRTtLQUNWO0lBQ0QsbUJBQW1CLEVBQUU7UUFDbkIsV0FBVyxFQUFFLG9DQUFvQztRQUNqRCxLQUFLLEVBQUUsRUFBRTtLQUNWO0lBQ0Qsb0JBQW9CLEVBQUU7UUFDcEIsV0FBVyxFQUFFLHFDQUFxQztRQUNsRCxLQUFLLEVBQUUsRUFBRTtLQUNWO0lBQ0Qsa0JBQWtCLEVBQUU7UUFDbEIsV0FBVyxFQUFFLGdFQUFnRTtRQUM3RSxJQUFJLEVBQUUsU0FBUztLQUNoQjtJQUNELGtCQUFrQixFQUFFO1FBQ2xCLFdBQVcsRUFBRSx3RUFBd0U7UUFDckYsSUFBSSxFQUFFLFNBQVM7S0FDaEI7SUFDRCxXQUFXLEVBQUU7UUFDWCxXQUFXLEVBQUUsMERBQTBEO1FBQ3ZFLElBQUksRUFBRSxVQUFVO0tBQ2pCO0lBQ0QsVUFBVSxFQUFFO1FBQ1YsV0FBVyxFQUFFLDBEQUEwRDtRQUN2RSxJQUFJLEVBQUUsU0FBUztLQUNoQjtJQUNELFlBQVksRUFBRTtRQUNaLFdBQVcsRUFBRSxtRUFBbUU7UUFDaEYsSUFBSSxFQUFFLFVBQVU7S0FDakI7SUFDRCxVQUFVLEVBQUU7UUFDVixXQUFXLEVBQUUsd0RBQXdEO1FBQ3JFLElBQUksRUFBRSxVQUFVO0tBQ2pCO0lBQ0QsY0FBYyxFQUFFO1FBQ2QsV0FBVyxFQUFFLG1FQUFtRTtRQUNoRixJQUFJLEVBQUUsVUFBVTtLQUNqQjtJQUNELFVBQVUsRUFBRTtRQUNWLFdBQVcsRUFBRSxrSEFBa0g7UUFDL0gsSUFBSSxFQUFFLENBQUUseURBQWdCLEVBQUUsMkRBQWtCLENBQUU7UUFDOUMsS0FBSyxFQUFFLDJEQUFrQjtLQUMxQjtJQUNELGNBQWMsRUFBRTtRQUNkLFdBQVcsRUFBRSw2REFBNkQ7UUFDMUUsSUFBSSxFQUFFLFNBQVM7UUFDZixLQUFLLEVBQUUsTUFBTTtLQUNkO0lBQ0QsT0FBTyxFQUFFO1FBQ1AsV0FBVyxFQUFFLDZCQUE2QjtRQUMxQyxJQUFJLEVBQUUsU0FBUztLQUNoQjtJQUNELFVBQVUsRUFBRTtRQUNWLFdBQVcsRUFBRSx3REFBd0Q7UUFDckUsSUFBSSxFQUFFLFNBQVM7S0FDaEI7SUFDRCxVQUFVLEVBQUU7UUFDVixXQUFXLEVBQUUsd0RBQXdEO1FBQ3JFLElBQUksRUFBRSxTQUFTO0tBQ2hCO0lBQ0QseUJBQXlCLEVBQUU7UUFDekIsV0FBVyxFQUFFLHVFQUF1RTtRQUNwRixLQUFLLEVBQUUsS0FBSztLQUNiO0lBQ0QscUJBQXFCLEVBQUU7UUFDckIsV0FBVyxFQUFFLCtCQUErQjtRQUM1QyxLQUFLLEVBQUUsS0FBSztLQUNiO0lBQ0QsZ0JBQWdCLEVBQUU7UUFDaEIsV0FBVyxFQUFFLHlDQUF5QztRQUN0RCxLQUFLLEVBQUUsbURBQU8sRUFBRTtLQUNqQjtJQUNELFFBQVEsRUFBRTtRQUNSLFdBQVcsRUFBRSxpQ0FBaUM7UUFDOUMsS0FBSyxFQUFFLEVBQUU7S0FDVjtJQUNELFlBQVksRUFBRTtRQUNaLFdBQVcsRUFBRSx5Q0FBeUM7UUFDdEQsS0FBSyxFQUFFLEVBQUU7S0FDVjtJQUNELFNBQVMsRUFBRTtRQUNULFdBQVcsRUFBRSx3Q0FBd0M7UUFDckQsS0FBSyxFQUFFLEVBQUU7S0FDVjtJQUNELGVBQWUsRUFBRTtRQUNmLFdBQVcsRUFBRSw2REFBNkQ7UUFDMUUsS0FBSyxFQUFFLENBQUUsSUFBSSxDQUFFO0tBQ2hCO0lBQ0QsaUJBQWlCLEVBQUU7UUFDakIsV0FBVyxFQUFFLCtEQUErRDtRQUM1RSxLQUFLLEVBQUUsQ0FBRSxLQUFLLEVBQUUsVUFBVSxDQUFFO0tBQzdCO0lBQ0QsVUFBVSxFQUFFO1FBQ1YsV0FBVyxFQUFFLGlDQUFpQztRQUM5QyxLQUFLLEVBQUUsRUFBRTtLQUNWO0lBQ0QsT0FBTyxFQUFFO1FBQ1AsV0FBVyxFQUFFLGdDQUFnQztRQUM3QyxLQUFLLEVBQUUsRUFBRTtLQUNWO0lBQ0QsYUFBYSxFQUFFO1FBQ2IsV0FBVyxFQUFFLDhEQUE4RDtRQUMzRSxLQUFLLEVBQUUsQ0FBRSxJQUFJLENBQUU7S0FDaEI7SUFDRCxlQUFlLEVBQUU7UUFDZixXQUFXLEVBQUUsZ0VBQWdFO1FBQzdFLEtBQUssRUFBRSxDQUFFLEtBQUssRUFBRSxVQUFVLENBQUU7S0FDN0I7SUFDRCxZQUFZLEVBQUU7UUFDWixXQUFXLEVBQUUsbUNBQW1DO1FBQ2hELEtBQUssRUFBRSxFQUFFO0tBQ1Y7SUFDRCxTQUFTLEVBQUU7UUFDVCxXQUFXLEVBQUUsZ0NBQWdDO1FBQzdDLEtBQUssRUFBRSxFQUFFO0tBQ1Y7SUFDRCxlQUFlLEVBQUU7UUFDZixXQUFXLEVBQUUsZ0VBQWdFO1FBQzdFLEtBQUssRUFBRSxDQUFFLElBQUksQ0FBRTtLQUNoQjtJQUNELGlCQUFpQixFQUFFO1FBQ2pCLFdBQVcsRUFBRSxrRUFBa0U7UUFDL0UsS0FBSyxFQUFFLENBQUUsS0FBSyxFQUFFLFVBQVUsQ0FBRTtLQUM3QjtJQUNELEVBQUUsRUFBRTtRQUNGLFdBQVcsRUFBRSwyREFBMkQ7UUFDeEUsS0FBSyxFQUFFLEVBQUU7S0FDVjtJQUNELE1BQU0sRUFBRTtRQUNOLFdBQVcsRUFBRSwrRUFBK0U7UUFDNUYsS0FBSyxFQUFFLEVBQUU7S0FDVjtJQUNELE1BQU0sRUFBRTtRQUNOLFdBQVcsRUFBRSw2RUFBNkU7UUFDMUYsS0FBSyxFQUFFLEVBQUU7S0FDVjtJQUNELEVBQUUsRUFBRTtRQUNGLFdBQVcsRUFBRSxxRUFBcUU7UUFDbEYsS0FBSyxFQUFFLEVBQUU7S0FDVjtJQUNELE9BQU8sRUFBRTtRQUNQLFdBQVcsRUFBRSwwREFBMEQ7UUFDdkUsS0FBSyxFQUFFLEVBQUU7S0FDVjtJQUNELE9BQU8sRUFBRTtRQUNQLFdBQVcsRUFBRSxzRkFBc0Y7UUFDbkcsS0FBSyxFQUFFLEVBQUU7S0FDVjtJQUNELEtBQUssRUFBRTtRQUNMLFdBQVcsRUFBRSx5RkFBeUY7UUFDdEcsS0FBSyxFQUFFLEVBQUU7S0FDVjtJQUNELHFCQUFxQixFQUFFO1FBQ3JCLFdBQVcsRUFBRSxrQ0FBa0M7UUFDL0MsS0FBSyxFQUFFLEVBQUU7S0FDVjtJQUNELHFCQUFxQixFQUFFO1FBQ3JCLFdBQVcsRUFBRSxzQ0FBc0M7UUFDbkQsS0FBSyxFQUFFLElBQUk7S0FDWjtJQUNELG1CQUFtQixFQUFFO1FBQ25CLFdBQVcsRUFBRSwyREFBMkQ7UUFDeEUsS0FBSyxFQUFFLEVBQUU7S0FDVjtJQUNELHFCQUFxQixFQUFFO1FBQ3JCLFdBQVcsRUFBRSxzQ0FBc0M7UUFDbkQsS0FBSyxFQUFFLEtBQUs7S0FDYjtJQUNELHFCQUFxQixFQUFFO1FBQ3JCLFdBQVcsRUFBRSxzQ0FBc0M7UUFDbkQsS0FBSyxFQUFFLElBQUk7S0FDWjtJQUNELG1CQUFtQixFQUFFO1FBQ25CLFdBQVcsRUFBRSwyREFBMkQ7UUFDeEUsS0FBSyxFQUFFLEVBQUU7S0FDVjtJQUNELHFCQUFxQixFQUFFO1FBQ3JCLFdBQVcsRUFBRSxzQ0FBc0M7UUFDbkQsS0FBSyxFQUFFLEtBQUs7S0FDYjtJQUNELHFCQUFxQixFQUFFO1FBQ3JCLFdBQVcsRUFBRSxzQ0FBc0M7UUFDbkQsS0FBSyxFQUFFLEtBQUs7S0FDYjtJQUNELG1CQUFtQixFQUFFO1FBQ25CLFdBQVcsRUFBRSwyREFBMkQ7UUFDeEUsS0FBSyxFQUFFLEVBQUU7S0FDVjtJQUNELGlCQUFpQixFQUFFO1FBQ2pCLFdBQVcsRUFBRSxrQ0FBa0M7UUFDL0MsS0FBSyxFQUFFLEVBQUU7S0FDVjtJQUNELGdCQUFnQixFQUFFO1FBQ2hCLFdBQVcsRUFBRSxzREFBc0Q7UUFDbkUsS0FBSyxFQUFFLEVBQUU7S0FDVjtJQUNELG1CQUFtQixFQUFFO1FBQ25CLFdBQVcsRUFBRSx5Q0FBeUM7UUFDdEQsSUFBSSxFQUFFLFVBQVU7S0FDakI7SUFDRCxpQkFBaUIsRUFBRTtRQUNqQixXQUFXLEVBQUUsdUNBQXVDO1FBQ3BELElBQUksRUFBRSxVQUFVO0tBQ2pCO0lBQ0QsYUFBYSxFQUFFO1FBQ2IsV0FBVyxFQUFFLDBFQUEwRTtRQUN2RixJQUFJLEVBQUUsQ0FBRSxDQUFDLEVBQUUsQ0FBQyxDQUFFO1FBQ2QsS0FBSyxFQUFFLG9FQUFjLEVBQUU7S0FDeEI7SUFDRCxnQkFBZ0IsRUFBRTtRQUNoQixXQUFXLEVBQUUsMEJBQTBCO1FBQ3ZDLEtBQUssRUFBRSxFQUFFO0tBQ1Y7Q0FDRixFQUFDOzs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7QUNqUEY7Ozs7Ozs7R0FPRztBQUUrQztBQUNIO0FBQ1E7QUFDSTtBQUNGO0FBQ0k7QUFDRjtBQUNoQjtBQUNjO0FBQ2Q7QUFJM0MsTUFBTSxJQUFJLEdBQWtCLE1BQU0sQ0FBQyxNQUFNLENBQUMsQ0FBQztBQUMzQyxNQUFNLFlBQVksR0FBVSxNQUFNLENBQUMsY0FBYyxDQUFDLENBQUM7QUFDbkQsTUFBTSxXQUFXLEdBQVcsTUFBTSxDQUFDLGFBQWEsQ0FBQyxDQUFDO0FBQ2xELE1BQU0sZUFBZSxHQUFPLE1BQU0sQ0FBQyxpQkFBaUIsQ0FBQyxDQUFDO0FBQ3RELE1BQU0sTUFBTSxHQUFnQixNQUFNLENBQUMsUUFBUSxDQUFDLENBQUM7QUFDN0MsTUFBTSxNQUFNLEdBQWdCLE1BQU0sQ0FBQyxRQUFRLENBQUMsQ0FBQztBQUM3QyxNQUFNLFlBQVksR0FBVSxNQUFNLENBQUMsY0FBYyxDQUFDLENBQUM7QUFDbkQsTUFBTSxRQUFRLEdBQWMsTUFBTSxDQUFDLFVBQVUsQ0FBQyxDQUFDO0FBQy9DLE1BQU0sT0FBTyxHQUFlLE1BQU0sQ0FBQyxTQUFTLENBQUMsQ0FBQztBQUM5QyxNQUFNLE9BQU8sR0FBZSxNQUFNLENBQUMsU0FBUyxDQUFDLENBQUM7QUFDOUMsTUFBTSxTQUFTLEdBQWEsTUFBTSxDQUFDLFdBQVcsQ0FBQyxDQUFDO0FBQ2hELE1BQU0seUJBQXlCLEdBQUcsTUFBTSxDQUFDLDJCQUEyQixDQUFDLENBQUM7QUFFdEUsU0FBUyxnQkFBZ0IsQ0FBQyxJQUFZO0lBQ3BDLElBQUksT0FBTyxJQUFJLEtBQUssUUFBUTtRQUMxQixNQUFNLElBQUksS0FBSyxDQUFDLFdBQVcsSUFBSSxzQkFBc0IsQ0FBQyxDQUFDO0lBQ3pELElBQUksQ0FBRSxrREFBVSxFQUFFLHNEQUFjLENBQUUsQ0FBQyxRQUFRLENBQUMsSUFBSSxDQUFDO1FBQy9DLE1BQU0sSUFBSSxLQUFLLENBQUMsV0FBVyxJQUFJLG9CQUFvQixDQUFDLENBQUM7SUFDdkQsT0FBTyxJQUFJLENBQUM7QUFDZCxDQUFDO0FBS0EsQ0FBQztBQUVLLE1BQU0sVUFBVTtJQUNiLENBQUMsSUFBSSxDQUFDLENBQVM7SUFDZixDQUFDLFlBQVksQ0FBQyxDQUFjO0lBQzVCLENBQUMsV0FBVyxDQUFDLENBQVM7SUFDdEIsQ0FBQyxNQUFNLENBQUMsQ0FBUztJQUNqQixDQUFDLE1BQU0sQ0FBQyxDQUFRO0lBQ2hCLENBQUMsZUFBZSxDQUFDLENBQVE7SUFDekIsQ0FBQyxZQUFZLENBQUMsQ0FBUTtJQUN0QixDQUFDLE9BQU8sQ0FBQyxDQUFRO0lBQ2pCLENBQUMsU0FBUyxDQUFDLENBQVE7SUFDbkIsQ0FBQyxRQUFRLENBQUMsQ0FBaUI7SUFDM0IsQ0FBQyxPQUFPLENBQUMsQ0FBUTtJQUNqQixDQUFDLHlCQUF5QixDQUFDLENBQVU7SUFFN0MsWUFBc0IsS0FBa0IsRUFBRSxJQUFZO1FBQ3BELElBQUksQ0FBQyxJQUFJLENBQUMsR0FBRyxnQkFBZ0IsQ0FBQyxJQUFJLENBQUMsQ0FBQztRQUNwQyxJQUFJLENBQUMsWUFBWSxDQUFDLEdBQUcsb0RBQVcsQ0FBQyxLQUFLLENBQUMsRUFBRSxFQUFFLEtBQUssQ0FBQyxDQUFDO1FBQ2xELElBQUksQ0FBQyxXQUFXLENBQUMsR0FBRywrREFBWSxDQUFDLElBQUksQ0FBQyxDQUFDO1FBQ3ZDLElBQUksQ0FBQyxNQUFNLENBQUMsR0FBRyxFQUFFLENBQUM7UUFDbEIsSUFBSSxDQUFDLE1BQU0sQ0FBQyxHQUFHLEVBQUUsQ0FBQztRQUNsQixJQUFJLENBQUMsZUFBZSxDQUFDLEdBQUcsRUFBRSxDQUFDO1FBQzNCLElBQUksQ0FBQyxZQUFZLENBQUMsR0FBRyxFQUFFLENBQUM7UUFDeEIsSUFBSSxDQUFDLE9BQU8sQ0FBQyxHQUFHLEVBQUUsQ0FBQztRQUNuQixJQUFJLENBQUMsU0FBUyxDQUFDLEdBQUcsRUFBRSxDQUFDO1FBQ3JCLElBQUksQ0FBQyxRQUFRLENBQUMsR0FBRyxLQUFLLENBQUMsUUFBUSxDQUFDLEdBQUcsQ0FBQyxDQUFDLEtBQVUsRUFBRSxFQUFFLENBQUMsQ0FBQyxFQUFFLEtBQUssRUFBRSxDQUFDLENBQUMsQ0FBQztRQUNqRSxJQUFJLENBQUMsT0FBTyxDQUFDLEdBQUcsRUFBRSxDQUFDO1FBQ25CLElBQUksQ0FBQyx5QkFBeUIsQ0FBQyxHQUFHLEtBQUssQ0FBQyx5QkFBeUIsQ0FBQztJQUNwRSxDQUFDO0lBRUQsSUFBVyxJQUFJO1FBQ2IsT0FBTyxJQUFJLENBQUMsSUFBSSxDQUFDLENBQUM7SUFDcEIsQ0FBQztJQUVELElBQVcsWUFBWTtRQUNyQixPQUFPLElBQUksQ0FBQyxZQUFZLENBQUMsQ0FBQztJQUM1QixDQUFDO0lBRUQsSUFBVyxXQUFXO1FBQ3BCLE9BQU8sSUFBSSxDQUFDLFdBQVcsQ0FBQyxDQUFDO0lBQzNCLENBQUM7SUFFRCxJQUFXLFdBQVcsQ0FBQyxLQUFhO1FBQ2xDLElBQUksQ0FBQyxXQUFXLENBQUMsR0FBRywrREFBWSxDQUFDLEtBQUssQ0FBQyxDQUFDO0lBQzFDLENBQUM7SUFFRCxJQUFXLGVBQWU7UUFDeEIsT0FBTyxJQUFJLENBQUMsZUFBZSxDQUFDLENBQUM7SUFDL0IsQ0FBQztJQUVELElBQVcsTUFBTTtRQUNmLE9BQU8sSUFBSSxDQUFDLE1BQU0sQ0FBQyxDQUFDO0lBQ3RCLENBQUM7SUFFRCxJQUFXLE1BQU0sQ0FBQyxLQUFhO1FBQzdCLElBQUksQ0FBQyxNQUFNLENBQUMsR0FBRywrREFBWSxDQUFDLEtBQUssQ0FBQyxDQUFDO0lBQ3JDLENBQUM7SUFFRCxJQUFXLE1BQU07UUFDZixPQUFPLElBQUksQ0FBQyxNQUFNLENBQUMsQ0FBQztJQUN0QixDQUFDO0lBRUQsSUFBVyxNQUFNLENBQUMsS0FBYTtRQUM3QixJQUFJLENBQUMsTUFBTSxDQUFDLEdBQUcsK0RBQVksQ0FBQyxLQUFLLENBQUMsQ0FBQztJQUNyQyxDQUFDO0lBRUQsSUFBVyxZQUFZO1FBQ3JCLE9BQU8sSUFBSSxDQUFDLFlBQVksQ0FBQyxDQUFDO0lBQzVCLENBQUM7SUFFRCxJQUFXLFFBQVE7UUFDakIsT0FBTyxJQUFJLENBQUMsUUFBUSxDQUFDLENBQUM7SUFDeEIsQ0FBQztJQUVELElBQVcsT0FBTztRQUNoQixPQUFPLElBQUksQ0FBQyxPQUFPLENBQUMsQ0FBQztJQUN2QixDQUFDO0lBRUQsSUFBVyxPQUFPO1FBQ2hCLE9BQU8sSUFBSSxDQUFDLE9BQU8sQ0FBQyxDQUFDO0lBQ3ZCLENBQUM7SUFFRCxJQUFXLFNBQVM7UUFDbEIsT0FBTyxJQUFJLENBQUMsU0FBUyxDQUFDLENBQUM7SUFDekIsQ0FBQztJQUVELElBQVcsUUFBUTtRQUNqQixPQUFPLElBQUksQ0FBQyxZQUFZLENBQUMsQ0FBQyxVQUFVLENBQUM7SUFDdkMsQ0FBQztJQUVELElBQVcsU0FBUztRQUNsQixPQUFPLElBQUksQ0FBQyxNQUFNLEdBQUcsSUFBSSxDQUFDLFdBQVcsR0FBRyxJQUFJLENBQUMsTUFBTSxDQUFDO0lBQ3RELENBQUM7SUFFRCxJQUFXLElBQUk7UUFDYixPQUFPLElBQUksQ0FBQyxRQUFRLENBQUMsSUFBSSxDQUFDLElBQUksQ0FBQyxTQUFTLENBQUMsQ0FBQztJQUM1QyxDQUFDO0lBRUQsSUFBVyx5QkFBeUI7UUFDbEMsT0FBTyxJQUFJLENBQUMseUJBQXlCLENBQUMsQ0FBQztJQUN6QyxDQUFDO0lBRU0sVUFBVSxDQUFDLEdBQUcsT0FBcUU7UUFDeEYsS0FBSyxJQUFJLEVBQUUsSUFBSSxPQUFPLENBQUMsSUFBSSxDQUFDLENBQUMsQ0FBQyxFQUFFLENBQUM7WUFDL0IsSUFBSSxFQUFFLFlBQVksb0VBQWdCLElBQUksRUFBRSxZQUFZLHdEQUFVLEVBQzVELENBQUMsRUFBQztpQkFDQyxJQUFJLE9BQU8sRUFBRSxLQUFLLFFBQVEsSUFBSSxvREFBWSxDQUFDLFVBQVUsQ0FBQyxFQUFFLENBQUM7Z0JBQzVELEVBQUUsR0FBRyx3REFBVSxDQUFDLE1BQU0sQ0FBQyxJQUFJLENBQUMsWUFBWSxDQUFDLEVBQUUsRUFBRSxDQUFDLENBQUM7O2dCQUUvQyxNQUFNLElBQUksS0FBSyxDQUFDLHdCQUF3QixFQUFFLEVBQUUsQ0FBQyxDQUFDO1lBRWhELElBQUksRUFBRSxZQUFZLHdEQUFVLElBQUksRUFBRSxDQUFDLFFBQVEsRUFBRSxDQUFDO2dCQUM1QyxNQUFNLE1BQU0sR0FBRyxJQUFJLENBQUMsWUFBWSxDQUFDLENBQUMsVUFBVSxDQUFDLFFBQVEsQ0FBQyxFQUFFLENBQUMsSUFBSSxDQUFDLENBQUM7Z0JBQy9ELE1BQU0sTUFBTSxHQUFHLElBQUksQ0FBQyxZQUFZLENBQUMsQ0FBQyxVQUFVLENBQUMsUUFBUSxDQUFDLEVBQUUsQ0FBQyxJQUFJLENBQUMsQ0FBQztnQkFDL0QsTUFBTSxLQUFLLEdBQUcsQ0FBQyxNQUFNLENBQUMsTUFBTSxHQUFHLE1BQU0sQ0FBQyxNQUFNLENBQUMsQ0FBQyxDQUFDLE1BQU0sQ0FBQyxDQUFDLENBQUMsTUFBTSxDQUFDLENBQUMsT0FBTyxDQUFDLEtBQUssRUFBRSxLQUFLLENBQUMsQ0FBQztnQkFDdEYsRUFBRSxDQUFDLFdBQVcsR0FBRyxJQUFJLENBQUMsWUFBWSxDQUFDLENBQUMsVUFBVSxDQUFDLElBQUksQ0FBQyxXQUFXLEVBQUUsSUFBSSxDQUFDLElBQUksQ0FBQyxHQUFHLE1BQU0sRUFBRyxLQUFLLEdBQUcsTUFBTSxDQUFDLENBQUM7WUFDekcsQ0FBQztZQUVELElBQUksQ0FBQyxPQUFPLENBQUMsQ0FBQyxJQUFJLENBQUMsRUFBRSxDQUFDLENBQUM7UUFDekIsQ0FBQztJQUNILENBQUM7SUFFTSxXQUFXLENBQUMsR0FBRyxRQUEwRDtRQUM5RSxLQUFLLE1BQU0sRUFBRSxJQUFJLFFBQVEsQ0FBQyxJQUFJLENBQUMsQ0FBQyxDQUFDLEVBQUUsQ0FBQztZQUNsQyxJQUFJLEtBQUssQ0FBQztZQUNWLElBQUksRUFBRSxZQUFZLHNFQUFpQjtnQkFDakMsS0FBSyxHQUFHLEVBQUUsQ0FBQztpQkFDUixJQUFJLE9BQU8sRUFBRSxLQUFLLFFBQVEsSUFBSSxvREFBWSxDQUFDLFVBQVUsQ0FBQyxFQUFFLENBQUM7Z0JBQzVELEtBQUssR0FBRyxvRUFBZ0IsQ0FBQyxNQUFNLENBQUMsRUFBRSxFQUFFLElBQUksQ0FBQyxZQUFZLENBQUMsQ0FBQyxVQUFVLENBQUMsQ0FBQzs7Z0JBRW5FLE1BQU0sSUFBSSxLQUFLLENBQUMsd0JBQXdCLEVBQUUsRUFBRSxDQUFDLENBQUM7WUFDaEQsSUFBSSxDQUFDLFFBQVEsQ0FBQyxDQUFDLElBQUksQ0FBQyxFQUFDLEtBQUssRUFBQyxDQUFDLENBQUMsQ0FBQyxxQkFBcUI7UUFDckQsQ0FBQztJQUNILENBQUM7SUFFTSxZQUFZLENBQUMsR0FBRyxTQUFjO1FBQ25DLEtBQUssTUFBTSxFQUFFLElBQUksU0FBUyxDQUFDLElBQUksQ0FBQyxDQUFDLENBQUMsRUFBRSxDQUFDO1lBQ25DLElBQUksQ0FBQyxTQUFTLENBQUMsQ0FBQyxJQUFJLENBQUMsRUFBRSxLQUFLLEVBQUUsa0VBQWUsQ0FBQyxjQUFjLENBQUMsRUFBRSxDQUFDLEVBQUUsQ0FBQyxDQUFDO1FBQ3RFLENBQUM7SUFDSCxDQUFDO0lBRU0saUJBQWlCLENBQUMsR0FBRyxPQUFpQjtRQUMzQyxLQUFLLE1BQU0sRUFBRSxJQUFJLE9BQU8sQ0FBQyxJQUFJLENBQUMsQ0FBQyxDQUFDLEVBQUUsQ0FBQztZQUNqQyxJQUFJLENBQUMsZUFBZSxDQUFDLENBQUMsSUFBSSxDQUFDLEVBQUUsS0FBSyxFQUFFLEVBQUUsRUFBRSxDQUFDLENBQUM7UUFDNUMsQ0FBQztJQUNILENBQUM7SUFFTSxjQUFjLENBQUMsR0FBRyxPQUFpQjtRQUN4QyxLQUFLLE1BQU0sRUFBRSxJQUFJLE9BQU8sQ0FBQyxJQUFJLENBQUMsQ0FBQyxDQUFDLEVBQUUsQ0FBQztZQUNqQyxJQUFJLENBQUMsWUFBWSxDQUFDLENBQUMsSUFBSSxDQUFDLEVBQUUsS0FBSyxFQUFFLEVBQUUsRUFBRSxDQUFDLENBQUM7UUFDekMsQ0FBQztJQUNILENBQUM7SUFFTSxjQUFjLENBQUMsR0FBRyxPQUFjO1FBQ3JDLE1BQU0sTUFBTSxHQUFHLEVBQUUsQ0FBQztRQUNsQixLQUFLLE1BQU0sRUFBRSxJQUFJLE9BQU8sQ0FBQyxJQUFJLENBQUMsQ0FBQyxDQUFDLEVBQUUsQ0FBQztZQUNqQyxNQUFNLFFBQVEsR0FBRyxJQUFJLENBQUMsWUFBWSxDQUFDLENBQUMsVUFBVSxDQUFDLE9BQU8sQ0FBQyxFQUFFLENBQUMsQ0FBQyxRQUFRLEVBQUUsQ0FBQztZQUN0RSxNQUFNLEdBQUcsR0FBRyxJQUFJLENBQUMsT0FBTyxDQUFDLENBQUMsSUFBSSxDQUFDLENBQUMsQ0FBQyxFQUFFLENBQUMsQ0FBQyxZQUFZLHdEQUFVLElBQUksQ0FBQyxDQUFDLElBQUksQ0FBQyxRQUFRLEVBQUUsS0FBSyxRQUFRLENBQUMsQ0FBQztZQUMvRixJQUFJLENBQUMsR0FBRztnQkFDTixNQUFNLElBQUksS0FBSyxDQUFDLGdCQUFnQixFQUFFLEdBQUcsQ0FBQyxDQUFDO1lBQ3pDLE1BQU0sQ0FBQyxJQUFJLENBQUMsR0FBRyxDQUFDLENBQUM7UUFDbkIsQ0FBQztRQUVELElBQUksTUFBTSxDQUFDLE1BQU07WUFDZixPQUFPLGdFQUFjLENBQUMsTUFBTSxDQUFDLElBQUksQ0FBQyxZQUFZLENBQUMsRUFBRSxNQUFNLENBQUMsQ0FBQztRQUUzRCxPQUFPLGdFQUFjLENBQUMsTUFBTSxDQUFDLElBQUksQ0FBQyxZQUFZLENBQUMsRUFBRSxJQUFJLENBQUMsT0FBTyxDQUFDLENBQUMsTUFBTSxDQUFDLENBQUMsQ0FBQyxFQUFFLENBQUMsQ0FBQyxZQUFZLHdEQUFVLENBQUMsQ0FBQyxDQUFDO0lBQ3ZHLENBQUM7SUFFTSxTQUFTLENBQUMsTUFBYztRQUM3QixJQUFJLENBQUMsTUFBTSxDQUFDLEdBQUcsTUFBTSxDQUFDO0lBQ3hCLENBQUM7SUFFTSxTQUFTLENBQUMsTUFBYztRQUM3QixJQUFJLENBQUMsTUFBTSxDQUFDLEdBQUcsTUFBTSxDQUFDO0lBQ3hCLENBQUM7SUFFTSxhQUFhLENBQUMsVUFBa0I7UUFDckMsSUFBSSxDQUFDLFdBQVcsQ0FBQyxHQUFHLFVBQVUsQ0FBQztJQUNqQyxDQUFDO0lBRU0sY0FBYyxDQUFDLEdBQUcsV0FBcUI7UUFDNUMsS0FBSyxNQUFNLEtBQUssSUFBSSxXQUFXLENBQUMsSUFBSSxDQUFDLENBQUMsQ0FBQztZQUNyQyxJQUFJLENBQUMsT0FBTyxDQUFDLENBQUMsSUFBSSxDQUFDLEVBQUUsS0FBSyxFQUFFLENBQUMsQ0FBQztJQUNsQyxDQUFDO0lBRU0sTUFBTTtRQUNYLE9BQU87WUFDTCxJQUFJLEVBQUUsSUFBSSxDQUFDLElBQUk7WUFDZixZQUFZLEVBQUUsSUFBSSxDQUFDLFlBQVk7WUFDL0IsV0FBVyxFQUFFLElBQUksQ0FBQyxXQUFXO1lBQzdCLGVBQWUsRUFBRSxJQUFJLENBQUMsZUFBZTtZQUNyQyxNQUFNLEVBQUUsSUFBSSxDQUFDLE1BQU07WUFDbkIsTUFBTSxFQUFFLElBQUksQ0FBQyxNQUFNO1lBQ25CLFlBQVksRUFBRSxJQUFJLENBQUMsWUFBWTtZQUMvQixRQUFRLEVBQUUsSUFBSSxDQUFDLFFBQVE7WUFDdkIsT0FBTyxFQUFFLElBQUksQ0FBQyxPQUFPO1lBQ3JCLE9BQU8sRUFBRSxJQUFJLENBQUMsT0FBTztZQUNyQixTQUFTLEVBQUUsSUFBSSxDQUFDLFNBQVM7WUFDekIsUUFBUSxFQUFFLElBQUksQ0FBQyxRQUFRO1lBQ3ZCLFNBQVMsRUFBRSxJQUFJLENBQUMsU0FBUztZQUN6QixJQUFJLEVBQUUsSUFBSSxDQUFDLElBQUk7U0FDaEI7SUFDSCxDQUFDO0NBQ0Y7QUFBQSxDQUFDO0FBRUssTUFBTSxXQUFZLFNBQVEsVUFBVTtJQUN6QyxZQUFzQixLQUFrQixFQUFFLElBQVk7UUFDcEQsS0FBSyxDQUFDLEtBQUssRUFBRSxJQUFJLENBQUMsQ0FBQztJQUNyQixDQUFDO0lBRU0sMEJBQTBCLENBQUMsS0FBYztRQUM5QyxJQUFJLENBQUMseUJBQXlCLENBQUMsR0FBRyxLQUFLLENBQUM7SUFDMUMsQ0FBQztJQUVNLGlCQUFpQixDQUFDLEdBQUcsUUFBMEQ7UUFDcEYsS0FBSyxNQUFNLEVBQUUsSUFBSSxRQUFRLENBQUMsSUFBSSxDQUFDLENBQUMsQ0FBQyxFQUFFLENBQUM7WUFDbEMsSUFBSSxLQUFLLENBQUM7WUFDVixJQUFJLEVBQUUsWUFBWSxzRUFBaUI7Z0JBQ2pDLEtBQUssR0FBRyxFQUFFLENBQUM7aUJBQ1IsSUFBSSxPQUFPLEVBQUUsS0FBSyxRQUFRLElBQUksb0RBQVksQ0FBQyxVQUFVLENBQUMsRUFBRSxDQUFDO2dCQUM1RCxLQUFLLEdBQUcsb0VBQWdCLENBQUMsTUFBTSxDQUFDLEVBQUUsRUFBRSxJQUFJLENBQUMsWUFBWSxDQUFDLENBQUMsVUFBVSxDQUFDLENBQUM7O2dCQUVuRSxNQUFNLElBQUksS0FBSyxDQUFDLHdCQUF3QixFQUFFLEVBQUUsQ0FBQyxDQUFDO1lBQ2hELElBQUksQ0FBQyxRQUFRLENBQUMsQ0FBQyxJQUFJLENBQUMsRUFBQyxLQUFLLEVBQUUsV0FBVyxFQUFFLElBQUksRUFBQyxDQUFDLENBQUMsQ0FBQyxxQkFBcUI7UUFDeEUsQ0FBQztJQUNILENBQUM7SUFFTSxvQkFBb0IsQ0FBQyxHQUFHLFdBQXFCO1FBQ2xELEtBQUssTUFBTSxLQUFLLElBQUksV0FBVyxDQUFDLElBQUksQ0FBQyxDQUFDLENBQUM7WUFDckMsSUFBSSxDQUFDLE9BQU8sQ0FBQyxDQUFDLElBQUksQ0FBQyxFQUFFLEtBQUssRUFBRSxXQUFXLEVBQUUsSUFBSSxFQUFFLENBQUMsQ0FBQztJQUNyRCxDQUFDO0lBRU0sa0JBQWtCLENBQUMsR0FBRyxTQUFnQjtRQUMzQyxLQUFLLE1BQU0sRUFBRSxJQUFJLFNBQVMsQ0FBQyxJQUFJLENBQUMsQ0FBQyxDQUFDLEVBQUUsQ0FBQztZQUNuQyxJQUFJLENBQUMsU0FBUyxDQUFDLENBQUMsSUFBSSxDQUFDLEVBQUMsS0FBSyxFQUFFLGtFQUFlLENBQUMsY0FBYyxDQUFDLEVBQUUsQ0FBQyxFQUFFLFdBQVcsRUFBRSxJQUFJLEVBQUMsQ0FBQyxDQUFDO1FBQ3ZGLENBQUM7SUFDSCxDQUFDO0lBRU0sdUJBQXVCLENBQUMsR0FBRyxPQUFpQjtRQUNqRCxLQUFLLE1BQU0sRUFBRSxJQUFJLE9BQU8sQ0FBQyxJQUFJLENBQUMsQ0FBQyxDQUFDLEVBQUUsQ0FBQztZQUNqQyxJQUFJLENBQUMsZUFBZSxDQUFDLENBQUMsSUFBSSxDQUFDLEVBQUUsS0FBSyxFQUFFLEVBQUUsRUFBRSxXQUFXLEVBQUUsSUFBSSxFQUFFLENBQUMsQ0FBQztRQUMvRCxDQUFDO0lBQ0gsQ0FBQztJQUVNLG9CQUFvQixDQUFDLEdBQUcsT0FBYztRQUMzQyxLQUFLLE1BQU0sRUFBRSxJQUFJLE9BQU8sQ0FBQyxJQUFJLENBQUMsQ0FBQyxDQUFDLEVBQUUsQ0FBQztZQUNqQyxJQUFJLENBQUMsWUFBWSxDQUFDLENBQUMsSUFBSSxDQUFDLEVBQUUsS0FBSyxFQUFFLEVBQUUsRUFBRSxXQUFXLEVBQUUsSUFBSSxFQUFFLENBQUMsQ0FBQztRQUM1RCxDQUFDO0lBQ0gsQ0FBQztDQUNGO0FBQUEsQ0FBQztBQUVLLE1BQU0sYUFBYyxTQUFRLFdBQVc7SUFDNUMsWUFBb0IsS0FBa0IsRUFBRSxJQUFZO1FBQ2xELEtBQUssQ0FBQyxLQUFLLEVBQUUsSUFBSSxDQUFDLENBQUM7UUFDbkIsSUFBSSxDQUFDLE1BQU0sR0FBRyxLQUFLLENBQUMscUJBQXFCLENBQUM7UUFDMUMsSUFBSSxDQUFDLE1BQU0sR0FBRyxLQUFLLENBQUMscUJBQXFCLENBQUM7UUFDMUMsSUFBSSxDQUFDLFlBQVksQ0FBQyxJQUFJLENBQUMsR0FBSSxLQUFhLENBQUMsbUJBQW1CLENBQUMsR0FBRyxDQUFDLENBQUMsS0FBVSxFQUFFLEVBQUUsQ0FBQyxDQUFDLEVBQUUsS0FBSyxFQUFFLENBQUMsQ0FBQyxDQUFDLENBQUM7SUFDakcsQ0FBQztJQUVNLE1BQU0sQ0FBQyxNQUFNLENBQUMsS0FBa0IsRUFBRSxJQUFZO1FBQ25ELE9BQU8sTUFBTSxDQUFDLElBQUksQ0FBQyxJQUFJLGFBQWEsQ0FBQyxLQUFLLEVBQUUsSUFBSSxDQUFDLENBQUMsQ0FBQztJQUNyRCxDQUFDO0NBQ0Y7QUFBQSxDQUFDO0FBRUssTUFBTSxhQUFjLFNBQVEsV0FBVztJQUM1QyxZQUFvQixLQUFrQixFQUFFLElBQVk7UUFDbEQsS0FBSyxDQUFDLEtBQUssRUFBRSxJQUFJLENBQUMsQ0FBQztRQUNuQixJQUFJLENBQUMsTUFBTSxHQUFHLEtBQUssQ0FBQyxxQkFBcUIsQ0FBQztRQUMxQyxJQUFJLENBQUMsTUFBTSxHQUFHLEtBQUssQ0FBQyxxQkFBcUIsQ0FBQztRQUMxQyxJQUFJLENBQUMsWUFBWSxDQUFDLElBQUksQ0FBQyxHQUFJLEtBQWEsQ0FBQyxtQkFBbUIsQ0FBQyxHQUFHLENBQUMsQ0FBQyxLQUFVLEVBQUUsRUFBRSxDQUFDLENBQUMsRUFBRSxLQUFLLEVBQUUsQ0FBQyxDQUFDLENBQUMsQ0FBQztJQUNqRyxDQUFDO0lBRU0sTUFBTSxDQUFDLE1BQU0sQ0FBQyxLQUFVLEVBQUUsSUFBWTtRQUMzQyxPQUFPLE1BQU0sQ0FBQyxJQUFJLENBQUMsSUFBSSxhQUFhLENBQUMsS0FBSyxFQUFFLElBQUksQ0FBQyxDQUFDLENBQUM7SUFDckQsQ0FBQztDQUNGO0FBQUEsQ0FBQztBQUVLLE1BQU0sYUFBYyxTQUFRLFdBQVc7SUFDNUMsWUFBb0IsS0FBa0IsRUFBRSxJQUFZO1FBQ2xELEtBQUssQ0FBQyxLQUFLLEVBQUUsSUFBSSxDQUFDLENBQUM7UUFDbkIsSUFBSSxDQUFDLE1BQU0sR0FBRyxLQUFLLENBQUMscUJBQXFCLENBQUM7UUFDMUMsSUFBSSxDQUFDLE1BQU0sR0FBRyxLQUFLLENBQUMscUJBQXFCLENBQUM7UUFDMUMsSUFBSSxDQUFDLFlBQVksQ0FBQyxJQUFJLENBQUMsR0FBSSxLQUFhLENBQUMsbUJBQW1CLENBQUMsR0FBRyxDQUFDLENBQUMsS0FBVSxFQUFFLEVBQUUsQ0FBQyxDQUFDLEVBQUUsS0FBSyxFQUFFLENBQUMsQ0FBQyxDQUFDLENBQUM7SUFDakcsQ0FBQztJQUVNLE1BQU0sQ0FBQyxNQUFNLENBQUMsS0FBVSxFQUFFLElBQVk7UUFDM0MsT0FBTyxNQUFNLENBQUMsSUFBSSxDQUFDLElBQUksYUFBYSxDQUFDLEtBQUssRUFBRSxJQUFJLENBQUMsQ0FBQyxDQUFDO0lBQ3JELENBQUM7Q0FDRjtBQUVNLE1BQU0sVUFBVyxTQUFRLFVBQVU7SUFDeEMsWUFBb0IsS0FBa0IsRUFBRSxJQUFZO1FBQ2xELEtBQUssQ0FBQyxLQUFLLEVBQUUsSUFBSSxDQUFDLENBQUM7UUFDbkIsSUFBSSxDQUFDLE1BQU0sR0FBRyxLQUFLLENBQUMsaUJBQWlCLENBQUM7UUFDdEMsSUFBSSxDQUFDLFlBQVksQ0FBQyxJQUFJLENBQUMsR0FBSSxLQUFhLENBQUMsZ0JBQWdCLENBQUMsR0FBRyxDQUFDLENBQUMsS0FBVSxFQUFFLEVBQUUsQ0FBQyxDQUFDLEVBQUUsS0FBSyxFQUFFLENBQUMsQ0FBQyxDQUFDLENBQUM7SUFDOUYsQ0FBQztJQUVNLE1BQU0sQ0FBQyxNQUFNLENBQUMsS0FBa0IsRUFBRSxJQUFZO1FBQ25ELE9BQU8sTUFBTSxDQUFDLElBQUksQ0FBQyxJQUFJLFVBQVUsQ0FBQyxLQUFLLEVBQUUsSUFBSSxDQUFDLENBQUMsQ0FBQztJQUNsRCxDQUFDO0NBQ0Y7QUFBQSxDQUFDOzs7Ozs7Ozs7Ozs7Ozs7Ozs7QUM1VkY7Ozs7Ozs7R0FPRztBQUV3RDtBQUNDO0FBQ0g7QUFFekQsTUFBTSxPQUFPLEdBQUcsTUFBTSxDQUFDLFNBQVMsQ0FBQyxDQUFDO0FBRWxDLFNBQVMsVUFBVSxDQUFDLE1BQVc7SUFDN0IsT0FBTyxNQUFNLENBQUMsT0FBTyxDQUFDLE1BQU0sQ0FBQyxDQUFDLENBQU0sRUFBRSxFQUFFLENBQUMsQ0FBQyxDQUFDLGdCQUFnQixDQUFDLENBQUM7QUFDL0QsQ0FBQztBQUVELFNBQVMsV0FBVyxDQUFDLE1BQVc7SUFDOUIsT0FBTyxNQUFNLENBQUMsUUFBUSxDQUFDLEdBQUcsQ0FBQyxDQUFDLENBQU0sRUFBRSxFQUFFLENBQUMsQ0FBQyxDQUFDLEtBQUssQ0FBQyxDQUFDO0FBQ2xELENBQUM7QUFFRCxTQUFTLGlCQUFpQixDQUFDLE1BQVc7SUFDcEMsT0FBTyxNQUFNLENBQUMsUUFBUSxDQUFDLE1BQU0sQ0FBQyxDQUFDLENBQU0sRUFBRSxFQUFFLENBQUMsQ0FBQyxDQUFDLFdBQVcsQ0FBQyxDQUFDLEdBQUcsQ0FBQyxDQUFDLENBQU0sRUFBRSxFQUFFLENBQUMsQ0FBQyxDQUFDLEtBQUssQ0FBQyxDQUFDO0FBQ3BGLENBQUM7QUFFRCxTQUFTLFlBQVksQ0FBQyxNQUFXO0lBQy9CLE9BQU8sTUFBTSxDQUFDLFNBQVMsQ0FBQyxHQUFHLENBQUMsQ0FBQyxDQUFNLEVBQUUsRUFBRSxDQUFDLENBQUMsQ0FBQyxLQUFLLENBQUMsQ0FBQztBQUNuRCxDQUFDO0FBRUQsU0FBUyxrQkFBa0IsQ0FBQyxNQUFXO0lBQ3JDLE9BQU8sTUFBTSxDQUFDLFNBQVMsQ0FBQyxNQUFNLENBQUMsQ0FBQyxDQUFNLEVBQUUsRUFBRSxDQUFDLENBQUMsQ0FBQyxXQUFXLENBQUMsQ0FBQyxHQUFHLENBQUMsQ0FBQyxDQUFNLEVBQUUsRUFBRSxDQUFDLENBQUMsQ0FBQyxLQUFLLENBQUMsQ0FBQztBQUNyRixDQUFDO0FBRUQsU0FBUyxjQUFjLENBQUMsTUFBVztJQUNqQyxPQUFPLE1BQU0sQ0FBQyxPQUFPLENBQUMsR0FBRyxDQUFDLENBQUMsQ0FBTSxFQUFFLEVBQUUsQ0FBQyxDQUFDLENBQUMsS0FBSyxDQUFDLENBQUM7QUFDakQsQ0FBQztBQUVELFNBQVMsb0JBQW9CLENBQUMsTUFBVztJQUN2QyxPQUFPLE1BQU0sQ0FBQyxPQUFPLENBQUMsTUFBTSxDQUFDLENBQUMsQ0FBTSxFQUFFLEVBQUUsQ0FBQyxDQUFDLENBQUMsV0FBVyxDQUFDLENBQUMsR0FBRyxDQUFDLENBQUMsQ0FBTSxFQUFFLEVBQUUsQ0FBQyxDQUFDLENBQUMsS0FBSyxDQUFDLENBQUM7QUFDbkYsQ0FBQztBQUVELFNBQVMsaUJBQWlCLENBQUMsTUFBVztJQUNwQyxPQUFPLE1BQU0sQ0FBQyxlQUFlLENBQUMsR0FBRyxDQUFDLENBQUMsQ0FBTSxFQUFFLEVBQUUsQ0FBQyxDQUFDLENBQUMsS0FBSyxDQUFDLENBQUM7QUFDekQsQ0FBQztBQUVELFNBQVMsdUJBQXVCLENBQUMsTUFBVztJQUMxQyxPQUFPLE1BQU0sQ0FBQyxlQUFlLENBQUMsTUFBTSxDQUFDLENBQUMsQ0FBTSxFQUFFLEVBQUUsQ0FBQyxDQUFDLENBQUMsV0FBVyxDQUFDLENBQUMsR0FBRyxDQUFDLENBQUMsQ0FBTSxFQUFFLEVBQUUsQ0FBQyxDQUFDLENBQUMsS0FBSyxDQUFDLENBQUM7QUFDM0YsQ0FBQztBQUVELFNBQVMsY0FBYyxDQUFDLE1BQVc7SUFDakMsT0FBTyxNQUFNLENBQUMsWUFBWSxDQUFDLEdBQUcsQ0FBQyxDQUFDLENBQU0sRUFBRSxFQUFFLENBQUMsQ0FBQyxDQUFDLEtBQUssQ0FBQyxDQUFDO0FBQ3RELENBQUM7QUFFRCxTQUFTLG9CQUFvQixDQUFDLE1BQVc7SUFDdkMsT0FBTyxNQUFNLENBQUMsWUFBWSxDQUFDLE1BQU0sQ0FBQyxDQUFDLENBQU0sRUFBRSxFQUFFLENBQUMsQ0FBQyxDQUFDLFdBQVcsQ0FBQyxDQUFDLEdBQUcsQ0FBQyxDQUFDLENBQU0sRUFBRSxFQUFFLENBQUMsQ0FBQyxDQUFDLEtBQUssQ0FBQyxDQUFDO0FBQ3hGLENBQUM7QUFFTSxNQUFNLGdCQUFnQjtJQUNuQixDQUFDLE9BQU8sQ0FBQyxDQUFNO0lBRXZCO1FBQ0UsSUFBSSxDQUFDLE9BQU8sQ0FBQyxHQUFHLEVBQUUsQ0FBQztJQUNyQixDQUFDO0lBRU0sTUFBTSxDQUFDLE1BQU07UUFDbEIsT0FBTyxNQUFNLENBQUMsSUFBSSxDQUFDLElBQUksZ0JBQWdCLENBQUMsQ0FBQztJQUMzQyxDQUFDO0lBRUQsSUFBVyxPQUFPO1FBQ2hCLE9BQU8sSUFBSSxDQUFDLE9BQU8sQ0FBQyxDQUFDO0lBQ3ZCLENBQUM7SUFFTSxNQUFNO1FBQ1gsT0FBTyxJQUFJLENBQUMsT0FBTyxDQUFDLENBQUM7SUFDdkIsQ0FBQztJQUVNLEdBQUcsQ0FBQyxJQUFZO1FBQ3JCLE9BQU8sSUFBSSxDQUFDLE9BQU8sQ0FBQyxDQUFDLElBQUksQ0FBQyxDQUFDO0lBQzdCLENBQUM7SUFFTSxHQUFHLENBQUMsSUFBWSxFQUFFLE1BQVc7UUFDbEMsSUFBSSxJQUFJLENBQUMsT0FBTyxDQUFDLENBQUMsSUFBSSxDQUFDO1lBQ3JCLE1BQU0sSUFBSSxLQUFLLENBQUMsV0FBVyxJQUFJLFVBQVUsQ0FBQyxDQUFDO1FBQzdDLElBQUksQ0FBQyxPQUFPLENBQUMsQ0FBQyxJQUFJLENBQUMsR0FBRyxNQUFNLENBQUM7SUFDL0IsQ0FBQztJQUVPLGdCQUFnQixDQUFDLFFBQWtCLEVBQUUsU0FBc0IsRUFBRSxJQUFTO1FBQzVFLEtBQUssTUFBTSxJQUFJLElBQUksSUFBSSxFQUFFLENBQUM7WUFDeEIsSUFBSSxJQUFJLFlBQVksc0VBQWlCLElBQUksSUFBSSxZQUFZLGtFQUFlLEVBQUUsQ0FBQztnQkFDekUsSUFBSSxDQUFDLFNBQVMsQ0FBQyxHQUFHLENBQUMsSUFBSSxDQUFDLFVBQVUsQ0FBQyxFQUFFLENBQUM7b0JBQ3BDLFNBQVMsQ0FBQyxHQUFHLENBQUMsSUFBSSxDQUFDLFVBQVUsQ0FBQyxDQUFDO29CQUMvQixNQUFNLE1BQU0sR0FBRyxJQUFJLENBQUMsR0FBRyxDQUFDLElBQUksQ0FBQyxVQUFVLENBQUMsQ0FBQztvQkFDekMsSUFBSSxDQUFDLGdCQUFnQixDQUFDLFFBQVEsRUFBRSxTQUFTLEVBQUUsaUJBQWlCLENBQUMsTUFBTSxDQUFDLENBQUMsQ0FBQztvQkFDdEUsSUFBSSxDQUFDLGdCQUFnQixDQUFDLFFBQVEsRUFBRSxTQUFTLEVBQUUsa0JBQWtCLENBQUMsTUFBTSxDQUFDLENBQUMsQ0FBQztnQkFDekUsQ0FBQztZQUNILENBQUM7aUJBQ0ksSUFBSSxJQUFJLFlBQVksb0VBQWdCLEVBQUUsQ0FBQztnQkFDMUMsSUFBSSxDQUFDLFFBQVEsQ0FBQyxRQUFRLENBQUMsSUFBSSxDQUFDLFFBQVEsRUFBRSxDQUFDO29CQUNyQyxRQUFRLENBQUMsSUFBSSxDQUFDLElBQUksQ0FBQyxRQUFRLEVBQUUsQ0FBQyxDQUFDO1lBQ25DLENBQUM7aUJBQ0ksQ0FBQztnQkFDSixNQUFNLElBQUksS0FBSyxDQUFDLHdCQUF3QixJQUFJLEVBQUUsQ0FBQyxDQUFDO1lBQ2xELENBQUM7UUFDSCxDQUFDO0lBQ0gsQ0FBQztJQUVNLGFBQWEsQ0FBQyxNQUFXO1FBQzlCLE1BQU0sTUFBTSxHQUFHLENBQUMsT0FBTyxNQUFNLEtBQUssUUFBUSxDQUFDLENBQUMsQ0FBQyxDQUFDLElBQUksQ0FBQyxHQUFHLENBQUMsTUFBTSxDQUFDLENBQUMsQ0FBQyxDQUFDLE1BQU0sQ0FBQztRQUN4RSxNQUFNLFFBQVEsR0FBYSxFQUFFLENBQUM7UUFDOUIsTUFBTSxTQUFTLEdBQUcsSUFBSSxHQUFHLENBQUMsQ0FBRSxNQUFNLENBQUMsSUFBSSxDQUFFLENBQUMsQ0FBQztRQUMzQyxJQUFJLENBQUMsZ0JBQWdCLENBQUMsUUFBUSxFQUFFLFNBQVMsRUFBRSxXQUFXLENBQUMsTUFBTSxDQUFDLENBQUMsQ0FBQztRQUNoRSxJQUFJLENBQUMsZ0JBQWdCLENBQUMsUUFBUSxFQUFFLFNBQVMsRUFBRSxZQUFZLENBQUMsTUFBTSxDQUFDLENBQUMsQ0FBQztRQUNqRSxPQUFPLFFBQVEsQ0FBQztJQUNsQixDQUFDO0lBRU8sZUFBZSxDQUFDLE9BQWlCLEVBQUUsU0FBc0IsRUFBRSxJQUFTO1FBQzFFLEtBQUssTUFBTSxJQUFJLElBQUksSUFBSSxFQUFFLENBQUM7WUFDeEIsSUFBSSxJQUFJLFlBQVksc0VBQWlCLElBQUksSUFBSSxZQUFZLGtFQUFlLEVBQUUsQ0FBQztnQkFDekUsSUFBSSxDQUFDLFNBQVMsQ0FBQyxHQUFHLENBQUMsSUFBSSxDQUFDLFVBQVUsQ0FBQyxFQUFFLENBQUM7b0JBQ3BDLFNBQVMsQ0FBQyxHQUFHLENBQUMsSUFBSSxDQUFDLFVBQVUsQ0FBQyxDQUFDO29CQUMvQixNQUFNLE1BQU0sR0FBRyxJQUFJLENBQUMsR0FBRyxDQUFDLElBQUksQ0FBQyxVQUFVLENBQUMsQ0FBQztvQkFDekMsS0FBSyxNQUFNLE1BQU0sSUFBSSxVQUFVLENBQUMsTUFBTSxDQUFDLENBQUMsR0FBRyxDQUFDLENBQUMsQ0FBTSxFQUFFLEVBQUUsQ0FBQyxDQUFDLENBQUMsSUFBSSxDQUFDLFFBQVEsRUFBRSxDQUFDLEVBQUUsQ0FBQzt3QkFDM0UsSUFBSSxDQUFDLE9BQU8sQ0FBQyxRQUFRLENBQUMsTUFBTSxDQUFDLFFBQVEsRUFBRSxDQUFDOzRCQUN0QyxPQUFPLENBQUMsSUFBSSxDQUFDLE1BQU0sQ0FBQyxRQUFRLEVBQUUsQ0FBQyxDQUFDO29CQUNwQyxDQUFDO29CQUNELElBQUksQ0FBQyxlQUFlLENBQUMsT0FBTyxFQUFFLFNBQVMsRUFBRSxpQkFBaUIsQ0FBQyxNQUFNLENBQUMsQ0FBQyxDQUFDO29CQUNwRSxJQUFJLENBQUMsZUFBZSxDQUFDLE9BQU8sRUFBRSxTQUFTLEVBQUUsa0JBQWtCLENBQUMsTUFBTSxDQUFDLENBQUMsQ0FBQztnQkFDdkUsQ0FBQztZQUNILENBQUM7UUFDSCxDQUFDO0lBQ0gsQ0FBQztJQUVNLFlBQVksQ0FBQyxNQUFXO1FBQzdCLE1BQU0sTUFBTSxHQUFHLENBQUMsT0FBTyxNQUFNLEtBQUssUUFBUSxDQUFDLENBQUMsQ0FBQyxDQUFDLElBQUksQ0FBQyxHQUFHLENBQUMsTUFBTSxDQUFDLENBQUMsQ0FBQyxDQUFDLE1BQU0sQ0FBQztRQUN4RSxNQUFNLE9BQU8sR0FBRyxVQUFVLENBQUMsTUFBTSxDQUFDLENBQUMsR0FBRyxDQUFDLENBQUMsQ0FBTSxFQUFFLEVBQUUsQ0FBQyxDQUFDLENBQUMsSUFBSSxDQUFDLFFBQVEsRUFBRSxDQUFDLENBQUM7UUFDdEUsTUFBTSxTQUFTLEdBQUcsSUFBSSxHQUFHLENBQUMsQ0FBRSxNQUFNLENBQUMsSUFBSSxDQUFFLENBQUMsQ0FBQztRQUMzQyxJQUFJLENBQUMsZUFBZSxDQUFDLE9BQU8sRUFBRSxTQUFTLEVBQUUsV0FBVyxDQUFDLE1BQU0sQ0FBQyxDQUFDLENBQUM7UUFDOUQsSUFBSSxDQUFDLGVBQWUsQ0FBQyxPQUFPLEVBQUUsU0FBUyxFQUFFLFlBQVksQ0FBQyxNQUFNLENBQUMsQ0FBQyxDQUFDO1FBQy9ELE9BQU8sT0FBTyxDQUFDO0lBQ2pCLENBQUM7SUFFTyxpQkFBaUIsQ0FBQyxTQUFtQixFQUFFLFNBQXNCLEVBQUUsSUFBUztRQUM5RSxLQUFLLE1BQU0sSUFBSSxJQUFJLElBQUksRUFBRSxDQUFDO1lBQ3hCLE9BQU8sQ0FBQyxNQUFNLENBQUMsSUFBSSxZQUFZLGtFQUFlLENBQUMsQ0FBQztZQUNoRCxJQUFJLENBQUMsU0FBUyxDQUFDLEdBQUcsQ0FBQyxJQUFJLENBQUMsVUFBVSxDQUFDLEVBQUUsQ0FBQztnQkFDcEMsU0FBUyxDQUFDLEdBQUcsQ0FBQyxJQUFJLENBQUMsVUFBVSxDQUFDLENBQUM7Z0JBQy9CLE1BQU0sTUFBTSxHQUFHLElBQUksQ0FBQyxHQUFHLENBQUMsSUFBSSxDQUFDLFVBQVUsQ0FBQyxDQUFDO2dCQUN6QyxTQUFTLENBQUMsSUFBSSxDQUFDLE1BQU0sQ0FBQyxJQUFJLENBQUMsUUFBUSxFQUFFLENBQUMsQ0FBQztnQkFDdkMsSUFBSSxDQUFDLGlCQUFpQixDQUFDLFNBQVMsRUFBRSxTQUFTLEVBQUUsa0JBQWtCLENBQUMsTUFBTSxDQUFDLENBQUMsQ0FBQztZQUMzRSxDQUFDO1FBQ0gsQ0FBQztJQUNILENBQUM7SUFFTSxjQUFjLENBQUMsTUFBVztRQUMvQixNQUFNLE1BQU0sR0FBRyxDQUFDLE9BQU8sTUFBTSxLQUFLLFFBQVEsQ0FBQyxDQUFDLENBQUMsQ0FBQyxJQUFJLENBQUMsR0FBRyxDQUFDLE1BQU0sQ0FBQyxDQUFDLENBQUMsQ0FBQyxNQUFNLENBQUM7UUFDeEUsTUFBTSxTQUFTLEdBQWEsRUFBRSxDQUFDO1FBQy9CLE1BQU0sU0FBUyxHQUFHLElBQUksR0FBRyxDQUFDLENBQUUsTUFBTSxDQUFDLElBQUksQ0FBRSxDQUFDLENBQUM7UUFDM0MsSUFBSSxDQUFDLGlCQUFpQixDQUFDLFNBQVMsRUFBRSxTQUFTLEVBQUUsWUFBWSxDQUFDLE1BQU0sQ0FBQyxDQUFDLENBQUM7UUFDbkUsT0FBTyxTQUFTLENBQUM7SUFDbkIsQ0FBQztJQUVPLG1CQUFtQixDQUFDLFdBQXFCLEVBQUUsU0FBc0IsRUFBRSxJQUFTO1FBQ2xGLEtBQUssTUFBTSxJQUFJLElBQUksSUFBSSxFQUFFLENBQUM7WUFDeEIsSUFBSSxJQUFJLFlBQVksa0VBQWUsRUFBRSxDQUFDO2dCQUNwQyxJQUFJLENBQUMsU0FBUyxDQUFDLEdBQUcsQ0FBQyxJQUFJLENBQUMsVUFBVSxDQUFDLEVBQUUsQ0FBQztvQkFDcEMsU0FBUyxDQUFDLEdBQUcsQ0FBQyxJQUFJLENBQUMsVUFBVSxDQUFDLENBQUM7b0JBQy9CLE1BQU0sTUFBTSxHQUFHLElBQUksQ0FBQyxHQUFHLENBQUMsSUFBSSxDQUFDLFVBQVUsQ0FBQyxDQUFDO29CQUN6QyxJQUFJLENBQUMsbUJBQW1CLENBQUMsV0FBVyxFQUFFLFNBQVMsRUFBRSxvQkFBb0IsQ0FBQyxNQUFNLENBQUMsQ0FBQyxDQUFDO29CQUMvRSxJQUFJLENBQUMsbUJBQW1CLENBQUMsV0FBVyxFQUFFLFNBQVMsRUFBRSxrQkFBa0IsQ0FBQyxNQUFNLENBQUMsQ0FBQyxDQUFDO2dCQUMvRSxDQUFDO1lBQ0gsQ0FBQztpQkFDSSxJQUFJLE9BQU8sSUFBSSxLQUFLLFFBQVEsRUFBRSxDQUFDO2dCQUNsQyxJQUFJLENBQUMsV0FBVyxDQUFDLFFBQVEsQ0FBQyxJQUFJLENBQUM7b0JBQzdCLFdBQVcsQ0FBQyxJQUFJLENBQUMsSUFBSSxDQUFDLENBQUM7WUFDM0IsQ0FBQztpQkFDSSxDQUFDO2dCQUNKLE1BQU0sSUFBSSxLQUFLLENBQUMsd0JBQXdCLElBQUksRUFBRSxDQUFDLENBQUM7WUFDbEQsQ0FBQztRQUNILENBQUM7SUFDSCxDQUFDO0lBRU0sZ0JBQWdCLENBQUMsTUFBVztRQUNqQyxNQUFNLE1BQU0sR0FBRyxDQUFDLE9BQU8sTUFBTSxLQUFLLFFBQVEsQ0FBQyxDQUFDLENBQUMsQ0FBQyxJQUFJLENBQUMsR0FBRyxDQUFDLE1BQU0sQ0FBQyxDQUFDLENBQUMsQ0FBQyxNQUFNLENBQUM7UUFDeEUsTUFBTSxXQUFXLEdBQWEsRUFBRSxDQUFDO1FBQ2pDLE1BQU0sU0FBUyxHQUFHLElBQUksR0FBRyxDQUFDLENBQUUsTUFBTSxDQUFDLElBQUksQ0FBRSxDQUFDLENBQUM7UUFDM0MsSUFBSSxDQUFDLG1CQUFtQixDQUFDLFdBQVcsRUFBRSxTQUFTLEVBQUUsY0FBYyxDQUFDLE1BQU0sQ0FBQyxDQUFDLENBQUM7UUFDekUsSUFBSSxDQUFDLG1CQUFtQixDQUFDLFdBQVcsRUFBRSxTQUFTLEVBQUUsa0JBQWtCLENBQUMsTUFBTSxDQUFDLENBQUMsQ0FBQztRQUM3RSxPQUFPLFdBQVcsQ0FBQztJQUNyQixDQUFDO0lBRU8sc0JBQXNCLENBQUMsT0FBK0IsRUFBRSxTQUFzQixFQUFFLElBQVM7UUFDL0YsS0FBSyxNQUFNLElBQUksSUFBSSxJQUFJLEVBQUUsQ0FBQztZQUN4QixJQUFJLElBQUksWUFBWSxrRUFBZSxFQUFFLENBQUM7Z0JBQ3BDLElBQUksQ0FBQyxTQUFTLENBQUMsR0FBRyxDQUFDLElBQUksQ0FBQyxVQUFVLENBQUMsRUFBRSxDQUFDO29CQUNwQyxTQUFTLENBQUMsR0FBRyxDQUFDLElBQUksQ0FBQyxVQUFVLENBQUMsQ0FBQztvQkFDL0IsTUFBTSxNQUFNLEdBQUcsSUFBSSxDQUFDLEdBQUcsQ0FBQyxJQUFJLENBQUMsVUFBVSxDQUFDLENBQUM7b0JBQ3pDLElBQUksQ0FBQyxzQkFBc0IsQ0FBQyxPQUFPLEVBQUUsU0FBUyxFQUFFLHVCQUF1QixDQUFDLE1BQU0sQ0FBQyxDQUFDLENBQUM7b0JBQ2pGLElBQUksQ0FBQyxzQkFBc0IsQ0FBQyxPQUFPLEVBQUUsU0FBUyxFQUFFLGtCQUFrQixDQUFDLE1BQU0sQ0FBQyxDQUFDLENBQUM7Z0JBQzlFLENBQUM7WUFDSCxDQUFDO2lCQUNJLElBQUksT0FBTyxJQUFJLEtBQUssUUFBUSxFQUFFLENBQUM7Z0JBQ2xDLElBQUksQ0FBQyxPQUFPLENBQUMsUUFBUSxDQUFDLElBQUksQ0FBQztvQkFDekIsT0FBTyxDQUFDLElBQUksQ0FBQyxJQUFJLENBQUMsQ0FBQztZQUN2QixDQUFDO2lCQUNJLElBQUksS0FBSyxDQUFDLE9BQU8sQ0FBQyxJQUFJLENBQUMsRUFBRSxDQUFDO2dCQUM3Qiw4Q0FBOEM7Z0JBQzlDLE9BQU8sQ0FBQyxJQUFJLENBQUMsSUFBSSxDQUFDLENBQUM7WUFDckIsQ0FBQztpQkFDSSxDQUFDO2dCQUNKLE1BQU0sSUFBSSxLQUFLLENBQUMsd0JBQXdCLElBQUksRUFBRSxDQUFDLENBQUM7WUFDbEQsQ0FBQztRQUNILENBQUM7SUFDSCxDQUFDO0lBRU0sbUJBQW1CLENBQUMsTUFBVztRQUNwQyxNQUFNLE1BQU0sR0FBRyxDQUFDLE9BQU8sTUFBTSxLQUFLLFFBQVEsQ0FBQyxDQUFDLENBQUMsQ0FBQyxJQUFJLENBQUMsR0FBRyxDQUFDLE1BQU0sQ0FBQyxDQUFDLENBQUMsQ0FBQyxNQUFNLENBQUM7UUFDeEUsTUFBTSxPQUFPLEdBQWEsRUFBRSxDQUFDO1FBQzdCLE1BQU0sU0FBUyxHQUFHLElBQUksR0FBRyxDQUFDLENBQUUsTUFBTSxDQUFDLElBQUksQ0FBRSxDQUFDLENBQUM7UUFDM0MsSUFBSSxDQUFDLHNCQUFzQixDQUFDLE9BQU8sRUFBRSxTQUFTLEVBQUUsaUJBQWlCLENBQUMsTUFBTSxDQUFDLENBQUMsQ0FBQztRQUMzRSxJQUFJLENBQUMsc0JBQXNCLENBQUMsT0FBTyxFQUFFLFNBQVMsRUFBRSxrQkFBa0IsQ0FBQyxNQUFNLENBQUMsQ0FBQyxDQUFDO1FBQzVFLE9BQU8sT0FBTyxDQUFDLElBQUksRUFBRSxDQUFDO0lBQ3hCLENBQUM7SUFFTyxnQkFBZ0IsQ0FBQyxPQUErQixFQUFFLFNBQXNCLEVBQUUsSUFBUztRQUN6RixLQUFLLE1BQU0sSUFBSSxJQUFJLElBQUksRUFBRSxDQUFDO1lBQ3hCLElBQUksSUFBSSxZQUFZLGtFQUFlLEVBQUUsQ0FBQztnQkFDcEMsSUFBSSxDQUFDLFNBQVMsQ0FBQyxHQUFHLENBQUMsSUFBSSxDQUFDLFVBQVUsQ0FBQyxFQUFFLENBQUM7b0JBQ3BDLFNBQVMsQ0FBQyxHQUFHLENBQUMsSUFBSSxDQUFDLFVBQVUsQ0FBQyxDQUFDO29CQUMvQixNQUFNLE1BQU0sR0FBRyxJQUFJLENBQUMsR0FBRyxDQUFDLElBQUksQ0FBQyxVQUFVLENBQUMsQ0FBQztvQkFDekMsSUFBSSxDQUFDLGdCQUFnQixDQUFDLE9BQU8sRUFBRSxTQUFTLEVBQUUsb0JBQW9CLENBQUMsTUFBTSxDQUFDLENBQUMsQ0FBQztvQkFDeEUsSUFBSSxDQUFDLGdCQUFnQixDQUFDLE9BQU8sRUFBRSxTQUFTLEVBQUUsa0JBQWtCLENBQUMsTUFBTSxDQUFDLENBQUMsQ0FBQztnQkFDeEUsQ0FBQztZQUNILENBQUM7aUJBQ0ksSUFBSSxPQUFPLElBQUksS0FBSyxRQUFRLEVBQUUsQ0FBQztnQkFDbEMsSUFBSSxDQUFDLE9BQU8sQ0FBQyxRQUFRLENBQUMsSUFBSSxDQUFDO29CQUN6QixPQUFPLENBQUMsSUFBSSxDQUFDLElBQUksQ0FBQyxDQUFDO1lBQ3ZCLENBQUM7aUJBQ0ksSUFBSSxLQUFLLENBQUMsT0FBTyxDQUFDLElBQUksQ0FBQyxFQUFFLENBQUM7Z0JBQzdCLDhDQUE4QztnQkFDOUMsT0FBTyxDQUFDLElBQUksQ0FBQyxJQUFJLENBQUMsQ0FBQztZQUNyQixDQUFDO2lCQUNJLENBQUM7Z0JBQ0osTUFBTSxJQUFJLEtBQUssQ0FBQyx3QkFBd0IsSUFBSSxFQUFFLENBQUMsQ0FBQztZQUNsRCxDQUFDO1FBQ0gsQ0FBQztJQUNILENBQUM7SUFFTSxnQkFBZ0IsQ0FBQyxNQUFXO1FBQ2pDLE1BQU0sTUFBTSxHQUFHLENBQUMsT0FBTyxNQUFNLEtBQUssUUFBUSxDQUFDLENBQUMsQ0FBQyxDQUFDLElBQUksQ0FBQyxHQUFHLENBQUMsTUFBTSxDQUFDLENBQUMsQ0FBQyxDQUFDLE1BQU0sQ0FBQztRQUN4RSxNQUFNLE9BQU8sR0FBYSxFQUFFLENBQUM7UUFDN0IsTUFBTSxTQUFTLEdBQUcsSUFBSSxHQUFHLENBQUMsQ0FBRSxNQUFNLENBQUMsSUFBSSxDQUFFLENBQUMsQ0FBQztRQUMzQyxJQUFJLENBQUMsZ0JBQWdCLENBQUMsT0FBTyxFQUFFLFNBQVMsRUFBRSxjQUFjLENBQUMsTUFBTSxDQUFDLENBQUMsQ0FBQztRQUNsRSxJQUFJLENBQUMsZ0JBQWdCLENBQUMsT0FBTyxFQUFFLFNBQVMsRUFBRSxrQkFBa0IsQ0FBQyxNQUFNLENBQUMsQ0FBQyxDQUFDO1FBQ3RFLE9BQU8sT0FBTyxDQUFDLElBQUksRUFBRSxDQUFDO0lBQ3hCLENBQUM7Q0FDRjs7Ozs7Ozs7Ozs7Ozs7Ozs7QUNqUUQ7Ozs7Ozs7R0FPRztBQUVrRDtBQUVWO0FBRzNDLE1BQU0sTUFBTSxHQUFHLE1BQU0sQ0FBQyxRQUFRLENBQUMsQ0FBQztBQUNoQyxNQUFNLEtBQUssR0FBRyxNQUFNLENBQUMsT0FBTyxDQUFDLENBQUM7QUFFdkIsTUFBTSxnQkFBZ0I7SUFDbkIsQ0FBQyxLQUFLLENBQUMsQ0FBYztJQUNyQixDQUFDLE1BQU0sQ0FBQyxDQUFnQjtJQUVoQyxZQUFvQixLQUFrQixFQUFFLE1BQXFCO1FBQzNELElBQUksQ0FBQyxLQUFLLENBQUMsR0FBRyxLQUFLLENBQUM7UUFDcEIsSUFBSSxDQUFDLE1BQU0sQ0FBQyxHQUFHLE1BQU0sQ0FBQztJQUN4QixDQUFDO0lBRU0sTUFBTSxDQUFDLE1BQU0sQ0FBQyxLQUFrQixFQUFFLE1BQXFCO1FBQzVELE1BQU0sS0FBSyxHQUFHLGdCQUFnQixDQUFDLFNBQVMsQ0FBQztRQUN6QyxNQUFNLFFBQVEsR0FBRyxNQUFNLENBQUMsTUFBTSxDQUFDLEtBQUssQ0FBQyxDQUFDO1FBQ3RDLG9EQUFXLENBQUMsS0FBSyxDQUFDLFFBQVEsRUFBRSxLQUFLLENBQUMsQ0FBQztRQUNuQyxNQUFNLElBQUksR0FBRyxNQUFNLENBQUMsTUFBTSxDQUFDLFFBQVEsQ0FBQyxDQUFDO1FBQ3JDLElBQUksQ0FBQyxLQUFLLENBQUMsR0FBRyxRQUFRLENBQUM7UUFDdkIsSUFBSSxDQUFDLE1BQU0sQ0FBQyxHQUFHLE1BQU0sQ0FBQztRQUN0QixPQUFPLElBQUksQ0FBQztJQUNkLENBQUM7SUFFTSxNQUFNO1FBQ1gsT0FBTyxJQUFJLENBQUMsS0FBSyxDQUFDLENBQUM7SUFDckIsQ0FBQztDQUNGO0FBQUEsQ0FBQztBQUVGLE1BQU0sQ0FBQyxjQUFjLENBQUMsZ0JBQWdCLENBQUMsU0FBUyxFQUFFLGFBQWEsRUFBRTtJQUMvRCxLQUFLLEVBQUUsOERBQWU7SUFDdEIsVUFBVSxFQUFFLEtBQUs7Q0FDbEIsQ0FBQyxDQUFDOzs7Ozs7Ozs7Ozs7Ozs7O0FDNUNIOzs7Ozs7O0dBT0c7QUFFSSxNQUFNLGdCQUFnQixHQUFHLE9BQU8sQ0FBQztBQUNqQyxNQUFNLGtCQUFrQixHQUFHLFNBQVMsQ0FBQzs7Ozs7Ozs7Ozs7Ozs7O0FDVjVDOzs7Ozs7O0dBT0c7QUFFSCxNQUFNLElBQUksR0FBRyxNQUFNLENBQUMsTUFBTSxDQUFDLENBQUM7QUFDNUIsTUFBTSxRQUFRLEdBQUcsTUFBTSxDQUFDLFVBQVUsQ0FBQyxDQUFDO0FBQ3BDLE1BQU0sT0FBTyxHQUFHLE1BQU0sQ0FBQyxTQUFTLENBQUMsQ0FBQztBQUNsQyxNQUFNLE9BQU8sR0FBRyxNQUFNLENBQUMsU0FBUyxDQUFDLENBQUM7QUFDbEMsTUFBTSxlQUFlLEdBQUcsTUFBTSxDQUFDLGlCQUFpQixDQUFDLENBQUM7QUFDbEQsTUFBTSxZQUFZLEdBQUcsTUFBTSxDQUFDLGNBQWMsQ0FBQyxDQUFDO0FBRXJDLE1BQU0sYUFBYTtJQUNoQixDQUFDLElBQUksQ0FBQyxDQUFTO0lBQ2YsQ0FBQyxRQUFRLENBQUMsQ0FBUTtJQUNsQixDQUFDLE9BQU8sQ0FBQyxDQUFRO0lBQ2pCLENBQUMsT0FBTyxDQUFDLENBQVE7SUFDakIsQ0FBQyxlQUFlLENBQUMsQ0FBUTtJQUN6QixDQUFDLFlBQVksQ0FBQyxDQUFRO0lBRTlCLFlBQW9CLElBQVk7UUFDOUIsSUFBSSxDQUFDLElBQUksQ0FBQyxHQUFHLElBQUksQ0FBQztRQUNsQixJQUFJLENBQUMsUUFBUSxDQUFDLEdBQUcsRUFBRSxDQUFDO1FBQ3BCLElBQUksQ0FBQyxPQUFPLENBQUMsR0FBRyxFQUFFLENBQUM7UUFDbkIsSUFBSSxDQUFDLE9BQU8sQ0FBQyxHQUFHLEVBQUUsQ0FBQztRQUNuQixJQUFJLENBQUMsZUFBZSxDQUFDLEdBQUcsRUFBRSxDQUFDO1FBQzNCLElBQUksQ0FBQyxZQUFZLENBQUMsR0FBRyxFQUFFLENBQUM7SUFDMUIsQ0FBQztJQUVNLE1BQU0sQ0FBQyxNQUFNLENBQUMsSUFBWTtRQUMvQixPQUFPLE1BQU0sQ0FBQyxJQUFJLENBQUMsSUFBSSxhQUFhLENBQUMsSUFBSSxDQUFDLENBQUMsQ0FBQztJQUM5QyxDQUFDO0lBRU0sTUFBTSxDQUFDLGNBQWMsQ0FBQyxLQUFVO1FBQ3JDLElBQUksS0FBSyxZQUFZLGFBQWE7WUFDaEMsT0FBTyxLQUFLLENBQUM7UUFDZixNQUFNLElBQUksS0FBSyxDQUFDLFFBQVEsS0FBSywwQkFBMEIsQ0FBQyxDQUFDO0lBQzNELENBQUM7SUFFRCxJQUFXLElBQUk7UUFDYixPQUFPLElBQUksQ0FBQyxJQUFJLENBQUMsQ0FBQztJQUNwQixDQUFDO0lBRUQsSUFBVyxRQUFRO1FBQ2pCLE9BQU8sSUFBSSxDQUFDLFFBQVEsQ0FBQyxDQUFDO0lBQ3hCLENBQUM7SUFFRCxJQUFXLE9BQU87UUFDaEIsT0FBTyxJQUFJLENBQUMsT0FBTyxDQUFDLENBQUM7SUFDdkIsQ0FBQztJQUVELElBQVcsT0FBTztRQUNoQixPQUFPLElBQUksQ0FBQyxPQUFPLENBQUMsQ0FBQztJQUN2QixDQUFDO0lBRUQsSUFBVyxlQUFlO1FBQ3hCLE9BQU8sSUFBSSxDQUFDLGVBQWUsQ0FBQyxDQUFDO0lBQy9CLENBQUM7SUFFRCxJQUFXLFlBQVk7UUFDckIsT0FBTyxJQUFJLENBQUMsWUFBWSxDQUFDLENBQUM7SUFDNUIsQ0FBQztJQUVNLE1BQU07UUFDWCxPQUFPO1lBQ0wsSUFBSSxFQUFFLElBQUksQ0FBQyxJQUFJO1lBQ2YsUUFBUSxFQUFFLElBQUksQ0FBQyxRQUFRO1lBQ3ZCLE9BQU8sRUFBRSxJQUFJLENBQUMsT0FBTztZQUNyQixPQUFPLEVBQUUsSUFBSSxDQUFDLE9BQU87WUFDckIsZUFBZSxFQUFFLElBQUksQ0FBQyxlQUFlO1lBQ3JDLFlBQVksRUFBRSxJQUFJLENBQUMsWUFBWTtTQUNoQyxDQUFDO0lBQ0osQ0FBQztJQUVNLFFBQVE7UUFDYixPQUFPLElBQUksR0FBRyxJQUFJLENBQUMsSUFBSSxDQUFDLEdBQUcsR0FBRyxDQUFDO0lBQ2pDLENBQUM7Q0FDRjtBQUFBLENBQUM7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7QUNqRkY7Ozs7Ozs7R0FPRztBQUUwQjtBQUV1QjtBQUNDO0FBQ0k7QUFDQTtBQUNKO0FBQytDO0FBQ3pDO0FBQ1I7QUFFUjtBQUVVO0FBQ2I7QUFFeEMsTUFBTSxNQUFNLEdBQUcsc0RBQVksQ0FBQyxtRkFBZSxDQUFDLENBQUM7QUFFN0MsTUFBTSxXQUFXLEdBQUcsSUFBSSxDQUFDLFNBQVMsQ0FBQyxDQUFDO0FBRXBDLFNBQVMsc0JBQXNCLENBQUMsQ0FBTTtJQUNwQyxJQUFJLE9BQU8sQ0FBQyxLQUFLLFdBQVc7UUFDMUIsT0FBTyxDQUFDLENBQUM7SUFDWCxJQUFJLE9BQU8sQ0FBQyxLQUFLLFNBQVM7UUFDeEIsT0FBTyxDQUFDLENBQUM7SUFDWCxJQUFJLE9BQU8sQ0FBQyxLQUFLLFFBQVE7UUFDdkIsT0FBTyxDQUFDLENBQUM7SUFDWCxJQUFJLE9BQU8sQ0FBQyxLQUFLLFFBQVE7UUFDdkIsT0FBTyxDQUFDLENBQUM7SUFDWCxJQUFJLE9BQU8sQ0FBQyxLQUFLLFFBQVEsRUFBRSxDQUFDO1FBQzFCLElBQUksQ0FBQyxDQUFDO1lBQ0osT0FBTyxDQUFDLENBQUM7UUFDWCxJQUFJLENBQUMsWUFBWSxvREFBWSxFQUFFLENBQUM7WUFDOUIsT0FBTyxDQUFDLENBQUMsUUFBUSxFQUFFLENBQUM7UUFDdEIsQ0FBQztRQUNELElBQUksQ0FBQyxZQUFZLEtBQUssRUFBRSxDQUFDO1lBQ3ZCLE1BQU0sTUFBTSxHQUFHLEVBQUUsQ0FBQztZQUNsQixLQUFLLE1BQU0sQ0FBQyxJQUFJLENBQUM7Z0JBQ2YsTUFBTSxDQUFDLElBQUksQ0FBQyxzQkFBc0IsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDO1lBQ3pDLE9BQU8sTUFBTSxDQUFDO1FBQ2hCLENBQUM7UUFDRCxJQUFJLENBQUMsWUFBWSxNQUFNLEVBQUUsQ0FBQztZQUN4QixNQUFNLE1BQU0sR0FBUSxFQUFFLENBQUM7WUFDdkIsS0FBSyxNQUFNLENBQUMsQ0FBQyxFQUFDLENBQUMsQ0FBQyxJQUFJLE1BQU0sQ0FBQyxPQUFPLENBQUMsQ0FBQyxDQUFDO2dCQUNuQyxNQUFNLENBQUMsQ0FBQyxDQUFDLEdBQUcsc0JBQXNCLENBQUMsQ0FBQyxDQUFDLENBQUM7WUFDeEMsT0FBTyxNQUFNLENBQUM7UUFDaEIsQ0FBQztJQUNILENBQUM7SUFDRCxNQUFNLElBQUksS0FBSyxDQUFDLHVCQUF1QixDQUFDLEVBQUUsQ0FBQyxDQUFDO0FBQzlDLENBQUM7QUFFRCxNQUFNLE1BQU0sR0FBRyxNQUFNLENBQUMsUUFBUSxDQUFDLENBQUM7QUFDaEMsTUFBTSxLQUFLLEdBQUcsTUFBTSxDQUFDLE9BQU8sQ0FBQyxDQUFDO0FBRXZCLE1BQU0sV0FBVztJQUNkLENBQUMsS0FBSyxDQUFDLENBQWM7SUFDckIsQ0FBQyxNQUFNLENBQUMsQ0FBZ0I7SUFFaEMsWUFBb0IsS0FBa0IsRUFBRSxNQUFxQjtRQUMzRCxJQUFJLENBQUMsS0FBSyxDQUFDLEdBQUcsS0FBSyxDQUFDO1FBQ3BCLElBQUksQ0FBQyxNQUFNLENBQUMsR0FBRyxNQUFNLENBQUM7SUFDeEIsQ0FBQztJQUVNLE1BQU0sQ0FBQyxNQUFNLENBQUMsS0FBa0IsRUFBRSxNQUFxQjtRQUM1RCxNQUFNLEtBQUssR0FBRyxXQUFXLENBQUMsU0FBUyxDQUFDO1FBQ3BDLE1BQU0sUUFBUSxHQUFHLE1BQU0sQ0FBQyxNQUFNLENBQUMsS0FBSyxDQUFDLENBQUM7UUFDdEMsb0RBQVcsQ0FBQyxLQUFLLENBQUMsUUFBUSxFQUFFLEtBQUssQ0FBQyxDQUFDO1FBQ25DLE1BQU0sR0FBRyxHQUFHLE1BQU0sQ0FBQyxNQUFNLENBQUMsUUFBUSxDQUFDLENBQUM7UUFDcEMsR0FBRyxDQUFDLEtBQUssQ0FBQyxHQUFHLFFBQVEsQ0FBQztRQUN0QixHQUFHLENBQUMsTUFBTSxDQUFDLEdBQUcsTUFBTSxDQUFDO1FBQ3JCLE9BQU8sR0FBRyxDQUFDO0lBQ2IsQ0FBQztJQUVNLGlCQUFpQjtRQUN0QixPQUFPLG9EQUFXLENBQUMsbUJBQW1CLENBQUMsSUFBSSxDQUFDLEtBQUssQ0FBQyxFQUFFLE9BQU8sQ0FBQyxDQUFDO0lBQy9ELENBQUM7SUFFTSxpQkFBaUIsQ0FBQyxNQUFXO1FBQ2xDLElBQUksU0FBUyxHQUFHLE1BQU0sQ0FBQztRQUN2QixJQUFJLE9BQU8sTUFBTSxLQUFLLFFBQVEsRUFBRSxDQUFDO1lBQy9CLE1BQU0sUUFBUSxHQUFHLElBQUksQ0FBQyxLQUFLLENBQUMsQ0FBQyxVQUFVLENBQUMsT0FBTyxDQUFDLE1BQU0sQ0FBQyxDQUFDLFFBQVEsRUFBRSxDQUFDO1lBQ25FLElBQUksQ0FBQyxpRUFBYyxDQUFDLFFBQVEsQ0FBQztnQkFDM0IsT0FBTztZQUNULFNBQVMsR0FBRyxXQUFXLENBQUMsUUFBUSxDQUFDLENBQUM7UUFDcEMsQ0FBQztRQUVELG9EQUFXLENBQUMsZUFBZSxDQUFDLElBQUksQ0FBQyxLQUFLLENBQUMsRUFBRSxPQUFPLEVBQUUsU0FBUyxDQUFDLENBQUM7SUFDL0QsQ0FBQztJQUVNLHFCQUFxQixDQUFDLEdBQUcsSUFBVztRQUN6QyxNQUFNLFNBQVMsR0FBRyxJQUFJLENBQUMsS0FBSyxDQUFDLENBQUMsVUFBVSxDQUFDO1FBQ3pDLEtBQUssTUFBTSxJQUFJLElBQUksSUFBSSxDQUFDLElBQUksQ0FBQyxDQUFDLENBQUMsRUFBRSxDQUFDO1lBQ2hDLElBQUksQ0FBQyxLQUFLLENBQUMsQ0FBQyxRQUFRLENBQUMsSUFBSSxDQUFDLG9FQUFnQixDQUFDLE1BQU0sQ0FBQyxJQUFJLEVBQUUsU0FBUyxDQUFDLENBQUMsQ0FBQztRQUN0RSxDQUFDO0lBQ0gsQ0FBQztJQUVNLGVBQWUsQ0FBQyxTQUFjLEVBQUUsU0FBYztRQUNuRCxTQUFTLEdBQUcsU0FBUyxJQUFJLDJEQUFlLENBQUMsU0FBUyxDQUFDLENBQUMsQ0FBQyxDQUFDLFNBQVMsQ0FBQyxDQUFDLENBQUMsU0FBUyxDQUFDO1FBRTVFLE1BQU0sVUFBVSxHQUFHLDJEQUFlLENBQUMsU0FBUyxDQUFDLENBQUMsQ0FBQyxDQUFDLG9EQUFZLENBQUMsTUFBTSxDQUFDLFNBQVMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxJQUFJLENBQUMsS0FBSyxDQUFDLENBQUMsVUFBVSxDQUFDLElBQUksQ0FBQyxTQUFTLENBQUMsQ0FBQztRQUN4SCxNQUFNLFVBQVUsR0FBRywyREFBZSxDQUFDLFNBQVMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxvREFBWSxDQUFDLE1BQU0sQ0FBQyxTQUFTLENBQUMsQ0FBQyxDQUFDLENBQUMsSUFBSSxDQUFDLEtBQUssQ0FBQyxDQUFDLFVBQVUsQ0FBQyxJQUFJLENBQUMsU0FBUyxDQUFDLENBQUM7UUFFeEgsTUFBTSxRQUFRLEdBQUcsb0RBQVcsQ0FBQyxLQUFLLENBQUMsRUFBRSxFQUFFLElBQUksQ0FBQyxLQUFLLENBQUMsQ0FBQyxDQUFDO1FBQ3BELG9EQUFXLENBQUMsY0FBYyxDQUFDLFFBQVEsRUFBRSxJQUFJLENBQUMsQ0FBQztRQUUzQyxRQUFRLENBQUMsVUFBVSxHQUFHLG9EQUFZLENBQUMsTUFBTSxDQUFDLElBQUksQ0FBQyxNQUFNLENBQUMsQ0FBQyxtQkFBbUIsQ0FBQyxVQUFVLENBQUMsQ0FBQyxRQUFRLEVBQUUsQ0FBQyxDQUFDO1FBQ25HLFFBQVEsQ0FBQyxVQUFVLEdBQUcsVUFBVSxDQUFDO1FBRWpDLElBQUksQ0FBQyxNQUFNLENBQUMsQ0FBQyxlQUFlLENBQUMsUUFBUSxDQUFDLENBQUM7SUFDekMsQ0FBQztJQUVNLGVBQWUsQ0FBQyxNQUFXLEVBQUUsTUFBVztRQUM3QyxJQUFJLENBQUMsTUFBTSxJQUFJLENBQUMsTUFBTSxDQUFDLE1BQU07WUFDM0IsTUFBTSxJQUFJLEtBQUssQ0FBQyxpQkFBaUIsSUFBSSxDQUFDLFNBQVMsQ0FBQyxNQUFNLENBQUMsRUFBRSxDQUFDLENBQUM7UUFFN0QsSUFBSSxTQUEwQyxDQUFDO1FBQy9DLElBQUksT0FBTyxNQUFNLEtBQUssUUFBUTtZQUM1QixTQUFTLEdBQUcsSUFBSSxDQUFDLE1BQU0sQ0FBQyxDQUFDLGtCQUFrQixDQUFDLE1BQU0sQ0FBQyxDQUFDO1FBQ3RELElBQUksQ0FBQyxTQUFTO1lBQ1osU0FBUyxHQUFHLGdEQUFRLENBQUMsTUFBTSxDQUFDLElBQUksQ0FBQyxLQUFLLENBQUMsQ0FBQyxVQUFVLENBQUMsT0FBTyxDQUFDLE1BQU0sQ0FBQyxDQUFDLENBQUM7UUFFdEUsTUFBTSxNQUFNLEdBQUcsNERBQVksQ0FBQyxNQUFNLENBQUMsSUFBSSxDQUFDLEtBQUssQ0FBQyxFQUFFLFNBQVMsRUFBRSxNQUFNLENBQUMsTUFBTSxFQUFFLE1BQU0sQ0FBQyxDQUFDO1FBQ2xGLElBQUksQ0FBQyxNQUFNLENBQUMsQ0FBQyxlQUFlLENBQUMsTUFBTSxFQUFFLE1BQU0sQ0FBQyxJQUFJLENBQUMsQ0FBQztRQUNsRCxPQUFPLE1BQU0sQ0FBQztJQUNoQixDQUFDO0lBRU0sTUFBTSxDQUFDLElBQVk7UUFDeEIsTUFBTSxPQUFPLEdBQUcsSUFBSSxDQUFDLE1BQU0sQ0FBQyxDQUFDLGVBQWUsQ0FBQyxJQUFJLENBQUMsQ0FBQztRQUNuRCxPQUFPLGtFQUFlLENBQUMsTUFBTSxDQUFDLElBQUksQ0FBQyxLQUFLLENBQUMsRUFBRSxPQUFPLENBQUMsQ0FBQztJQUN0RCxDQUFDO0lBRU0sTUFBTSxDQUFDLElBQVk7UUFDeEIsSUFBSSxNQUFNLEdBQUcsSUFBSSxDQUFDLE1BQU0sQ0FBQyxDQUFDLGlCQUFpQixDQUFDLElBQUksQ0FBQyxDQUFDO1FBQ2xELElBQUksQ0FBQyxNQUFNLEVBQUUsQ0FBQztZQUNaLE1BQU0sR0FBRyxrRUFBZSxDQUFDLE1BQU0sQ0FBQyxJQUFJLENBQUMsQ0FBQztZQUN0QyxJQUFJLENBQUMsTUFBTSxDQUFDLENBQUMsaUJBQWlCLENBQUMsSUFBSSxDQUFDLEdBQUcsTUFBTSxDQUFDO1FBQ2hELENBQUM7UUFDRCxPQUFPLE1BQU0sQ0FBQztJQUNoQixDQUFDO0lBRU0sT0FBTyxDQUFDLEtBQVUsRUFBRSxNQUFXO1FBQ3BDLEtBQUssTUFBTSxFQUFFLElBQUksQ0FBRSxLQUFLLENBQUUsQ0FBQyxJQUFJLENBQUMsQ0FBQyxDQUFDLEVBQUUsQ0FBQztZQUNuQyxNQUFNLElBQUksR0FBRyxDQUFDLEVBQUUsWUFBWSxvREFBVSxDQUFDLENBQUMsQ0FBQyxDQUFDLElBQUksQ0FBQyxNQUFNLENBQUMsRUFBRSxDQUFDLElBQUksQ0FBQyxDQUFDLENBQUMsQ0FBQyxFQUFFLENBQUM7WUFDcEUsTUFBTSxNQUFNLEdBQUcsOERBQWEsQ0FBQyxNQUFNLENBQUMsSUFBSSxFQUFFLElBQUksRUFBRSxNQUFNLENBQUMsQ0FBQztZQUN4RCxJQUFJLENBQUMsTUFBTSxDQUFDLENBQUMsZUFBZSxDQUFDLE1BQU0sQ0FBQyxDQUFDO1FBQ3ZDLENBQUM7SUFDSCxDQUFDO0lBRU0sZ0JBQWdCLENBQUMsSUFBUyxFQUFFLEdBQUcsT0FBYztRQUNsRCxNQUFNLE1BQU0sR0FBRyx1REFBYSxDQUFDLE1BQU0sQ0FBQyxJQUFJLENBQUMsS0FBSyxDQUFDLEVBQUUsSUFBSSxDQUFDLENBQUM7UUFDdkQsTUFBTSxDQUFDLFVBQVUsQ0FBQyxHQUFHLE9BQU8sQ0FBQyxDQUFDO1FBRTlCLElBQUksQ0FBQyxNQUFNLENBQUMsQ0FBQyxPQUFPLENBQUMsR0FBRyxDQUFDLElBQUksRUFBRSxNQUFNLENBQUMsQ0FBQztRQUN2QyxPQUFPLE1BQU0sQ0FBQztJQUNoQixDQUFDO0lBRU0sZ0JBQWdCLENBQUMsSUFBUyxFQUFFLEdBQUcsT0FBYztRQUNsRCxNQUFNLE1BQU0sR0FBRyx1REFBYSxDQUFDLE1BQU0sQ0FBQyxJQUFJLENBQUMsS0FBSyxDQUFDLEVBQUUsSUFBSSxDQUFDLENBQUM7UUFDdkQsTUFBTSxDQUFDLFVBQVUsQ0FBQyxHQUFHLE9BQU8sQ0FBQyxDQUFDO1FBRTlCLElBQUksQ0FBQyxNQUFNLENBQUMsQ0FBQyxPQUFPLENBQUMsR0FBRyxDQUFDLElBQUksRUFBRSxNQUFNLENBQUMsQ0FBQztRQUN2QyxPQUFPLE1BQU0sQ0FBQztJQUNoQixDQUFDO0lBRU0sZ0JBQWdCLENBQUMsSUFBUyxFQUFFLEdBQUcsT0FBYztRQUNsRCxNQUFNLE1BQU0sR0FBRyx1REFBYSxDQUFDLE1BQU0sQ0FBQyxJQUFJLENBQUMsS0FBSyxDQUFDLEVBQUUsSUFBSSxDQUFDLENBQUM7UUFDdkQsTUFBTSxDQUFDLFVBQVUsQ0FBQyxHQUFHLE9BQU8sQ0FBQyxDQUFDO1FBRTlCLElBQUksQ0FBQyxNQUFNLENBQUMsQ0FBQyxPQUFPLENBQUMsR0FBRyxDQUFDLElBQUksRUFBRSxNQUFNLENBQUMsQ0FBQztRQUN2QyxPQUFPLE1BQU0sQ0FBQztJQUNoQixDQUFDO0lBRU0sYUFBYSxDQUFDLElBQVksRUFBRSxHQUFHLE9BQWM7UUFDbEQsTUFBTSxNQUFNLEdBQUcsb0RBQVUsQ0FBQyxNQUFNLENBQUMsSUFBSSxDQUFDLEtBQUssQ0FBQyxFQUFFLElBQUksQ0FBQyxDQUFDO1FBQ3BELE1BQU0sQ0FBQyxVQUFVLENBQUMsR0FBRyxPQUFPLENBQUMsQ0FBQztRQUU5QixJQUFJLENBQUMsTUFBTSxDQUFDLENBQUMsT0FBTyxDQUFDLEdBQUcsQ0FBQyxJQUFJLEVBQUUsTUFBTSxDQUFDLENBQUM7UUFDdkMsT0FBTyxNQUFNLENBQUM7SUFDaEIsQ0FBQztJQUVNLGFBQWEsQ0FBQyxNQUFXLEVBQUUsT0FBWTtRQUM1QyxNQUFNLFVBQVUsR0FBRyxJQUFJLENBQUMsS0FBSyxDQUFDLENBQUMsVUFBVSxDQUFDLE9BQU8sQ0FBQyxNQUFNLENBQUMsQ0FBQztRQUMxRCxNQUFNLE1BQU0sR0FBRyxXQUFXLENBQUMsVUFBVSxDQUFDLFFBQVEsRUFBRSxDQUFDLENBQUM7UUFDbEQsTUFBTSxDQUFDLHNCQUFzQixDQUFDLE9BQU8sQ0FBQyxDQUFDLENBQUM7SUFDMUMsQ0FBQztDQUNGO0FBQUEsQ0FBQztBQUVGLE1BQU0sQ0FBQyxjQUFjLENBQUMsV0FBVyxDQUFDLFNBQVMsRUFBRSxhQUFhLEVBQUU7SUFDMUQsS0FBSyxFQUFFLCtEQUFlO0lBQ3RCLFVBQVUsRUFBRSxLQUFLO0NBQ2xCLENBQUMsQ0FBQzs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7QUN2TUg7Ozs7Ozs7R0FPRztBQUUwQjtBQUV0QixTQUFTLHlCQUF5QixDQUFDLFFBQWdCLEVBQUUsSUFBWTtJQUN0RSxJQUFJLE9BQU8sSUFBSSxLQUFLLFdBQVc7UUFDN0IsSUFBSSxHQUFHLENBQUMsQ0FBQztJQUVYLElBQUksVUFBVSxHQUFHLDBEQUFjLENBQUMsUUFBUSxDQUFDLENBQUMsS0FBSyxDQUFDLHNEQUFRLENBQUMsQ0FBQztJQUMxRCxJQUFJLFVBQVUsQ0FBQyxNQUFNLEdBQUcsSUFBSTtRQUMxQixVQUFVLEdBQUcsVUFBVSxDQUFDLEtBQUssQ0FBQyxVQUFVLENBQUMsTUFBTSxHQUFHLElBQUksQ0FBQyxDQUFDO0lBRTFELE9BQU8sR0FBRyxHQUFHLFVBQVUsQ0FBQyxJQUFJLENBQUMsR0FBRyxDQUFDLENBQUMsT0FBTyxDQUFDLFdBQVcsRUFBRSxHQUFHLENBQUMsQ0FBQyxXQUFXLEVBQUUsQ0FBQztBQUM1RSxDQUFDO0FBRU0sU0FBUyxrQkFBa0IsQ0FBQyxJQUFZO0lBQzdDLE9BQU8sSUFBSSxHQUFHLElBQUksQ0FBQztBQUNyQixDQUFDO0FBRU0sU0FBUyxxQkFBcUIsQ0FBQyxJQUFZO0lBQ2hELE9BQU8sTUFBTSxJQUFJLEtBQUssQ0FBQztBQUN6QixDQUFDO0FBRU0sU0FBUywwQkFBMEIsQ0FBQyxRQUFnQjtJQUN6RCxPQUFPLHFCQUFxQixDQUFDLGlCQUFpQixHQUFHLHlEQUFhLENBQUMsUUFBUSxDQUFDLENBQUMsQ0FBQztBQUM1RSxDQUFDOzs7Ozs7Ozs7Ozs7Ozs7QUNoQ0Q7Ozs7Ozs7R0FPRztBQVFGLENBQUM7QUFFSyxTQUFTLFlBQVksQ0FBQyxHQUFXO0lBQ3RDLE9BQU87UUFDTCxLQUFLLEVBQUUsT0FBTyxDQUFDLEtBQUssQ0FBQyxJQUFJLENBQUMsT0FBTyxDQUFDO1FBQ2xDLEtBQUssRUFBRSxPQUFPLENBQUMsS0FBSyxDQUFDLElBQUksQ0FBQyxPQUFPLENBQUM7UUFDbEMsSUFBSSxFQUFFLE9BQU8sQ0FBQyxJQUFJLENBQUMsSUFBSSxDQUFDLE9BQU8sQ0FBQztRQUNoQyxJQUFJLEVBQUUsT0FBTyxDQUFDLElBQUksQ0FBQyxJQUFJLENBQUMsT0FBTyxDQUFDO1FBQ2hDLEtBQUssRUFBRSxPQUFPLENBQUMsS0FBSyxDQUFDLElBQUksQ0FBQyxPQUFPLENBQUM7S0FDbkMsQ0FBQztBQUNKLENBQUM7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7OztBQ3pCRDs7Ozs7OztHQU9HO0FBRTBCO0FBQ0o7QUFDa0I7QUFNcEMsU0FBUyxVQUFVLENBQUMsT0FBZSxFQUFFLElBQWMsRUFBRSxPQUFhO0lBQ3ZFLElBQUksRUFBRSxHQUFHLElBQUksQ0FBQztJQUNkLElBQUksT0FBTyxHQUFHLEtBQUssQ0FBQztJQUNwQixJQUFJLE9BQU8sSUFBSSxPQUFPLENBQUMsS0FBSyxFQUFFLENBQUM7UUFDN0IsSUFBSSxPQUFPLENBQUMsS0FBSyxDQUFDLE9BQU87WUFDdkIsT0FBTyxHQUFHLElBQUksQ0FBQztRQUNqQixJQUFJLE9BQU8sQ0FBQyxLQUFLLENBQUMsTUFBTSxFQUFFLENBQUM7WUFDekIsSUFBSSxPQUFPLEdBQUcsT0FBTyxDQUFDLEtBQUssQ0FBQyxNQUFNLENBQUM7WUFDbkMsSUFBSSxDQUFDLDJEQUFlLENBQUMsT0FBTyxDQUFDLElBQUksT0FBTyxDQUFDLEdBQUcsRUFBRSxDQUFDO2dCQUM3QyxPQUFPLEdBQUcsd0RBQVksQ0FBQyxPQUFPLENBQUMsR0FBRyxFQUFFLE9BQU8sQ0FBQyxDQUFDO1lBQy9DLENBQUM7WUFDRCxFQUFFLEdBQUcsdURBQVcsQ0FBQyxPQUFPLEVBQUUsSUFBSSxFQUFFLEtBQUssQ0FBQyxDQUFDO1FBQ3pDLENBQUM7SUFDSCxDQUFDO0lBQ0QsT0FBTyxJQUFJLE9BQU8sQ0FBQyxDQUFDLE9BQU8sRUFBRSxNQUFNLEVBQUUsRUFBRTtRQUNyQyxJQUFJLEVBQUUsSUFBSSxPQUFPLEVBQUUsQ0FBQztZQUNsQixPQUFPLElBQUksT0FBTyxDQUFDLElBQUksQ0FBQyxDQUFFLHlEQUFhLENBQUMsT0FBTyxDQUFDLEVBQUUsR0FBRyxJQUFJLENBQUUsQ0FBQyxJQUFJLENBQUMsR0FBRyxDQUFDLENBQUMsQ0FBQztZQUN2RSxFQUFFLElBQUksd0RBQVksQ0FBQyxFQUFFLEVBQUUsSUFBSSxDQUFDLFNBQVMsQ0FBQyxFQUFDLE9BQU8sRUFBRSxJQUFJLEVBQUUsT0FBTyxFQUFFLEVBQUUsSUFBSSxFQUFFLENBQUMsQ0FBQyxHQUFHLElBQUksQ0FBQyxDQUFDO1FBQ3BGLENBQUM7UUFDRCxNQUFNLElBQUksR0FBRyx5REFBSyxDQUFDLE9BQU8sRUFBRSxJQUFJLEVBQUUsT0FBTyxDQUFDLENBQUM7UUFDM0MsSUFBSSxDQUFDLE1BQU0sQ0FBQyxFQUFFLENBQUMsTUFBTSxFQUFFLENBQUMsSUFBSSxFQUFFLEVBQUU7WUFDOUIsT0FBTyxDQUFDLE1BQU0sQ0FBQyxLQUFLLENBQUMsSUFBSSxDQUFDLENBQUM7WUFDM0IsRUFBRSxJQUFJLHdEQUFZLENBQUMsRUFBRSxFQUFFLElBQUksQ0FBQyxDQUFDO1FBQy9CLENBQUMsQ0FBQyxDQUFDO1FBQ0gsSUFBSSxDQUFDLE1BQU0sQ0FBQyxFQUFFLENBQUMsTUFBTSxFQUFFLENBQUMsSUFBSSxFQUFFLEVBQUU7WUFDOUIsT0FBTyxDQUFDLE1BQU0sQ0FBQyxLQUFLLENBQUMsSUFBSSxDQUFDLENBQUM7WUFDM0IsRUFBRSxJQUFJLHdEQUFZLENBQUMsRUFBRSxFQUFFLElBQUksQ0FBQyxDQUFDO1FBQy9CLENBQUMsQ0FBQyxDQUFDO1FBQ0gsSUFBSSxDQUFDLEVBQUUsQ0FBQyxPQUFPLEVBQUUsQ0FBQyxNQUFjLEVBQUUsRUFBRTtZQUNsQyxFQUFFLElBQUksd0RBQVksQ0FBQyxFQUFFLENBQUMsQ0FBQztZQUN2QixPQUFPLENBQUMsRUFBQyxNQUFNLEVBQUMsQ0FBQyxDQUFDO1FBQ3BCLENBQUMsQ0FBQyxDQUFDO0lBQ0wsQ0FBQyxDQUFDLENBQUM7QUFDTCxDQUFDOzs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7QUNsREQ7Ozs7Ozs7R0FPRztBQUVzQjtBQUNJO0FBQ0Y7QUFFcEIsS0FBSyxVQUFVLFVBQVUsQ0FBQyxJQUFZO0lBQzNDLElBQUksQ0FBQztRQUNILE9BQU8sQ0FBQyxDQUFDLENBQUMsTUFBTSx1REFBVyxDQUFDLElBQUksQ0FBQyxJQUFJLENBQUMsQ0FBQyxDQUFDO0lBQzFDLENBQUM7SUFBQyxNQUFNLENBQUM7UUFDUCxPQUFPLEtBQUssQ0FBQztJQUNmLENBQUM7QUFDSCxDQUFDO0FBRU0sU0FBUyxjQUFjLENBQUMsSUFBWTtJQUN6QyxJQUFJLENBQUM7UUFDSCxPQUFPLENBQUMsQ0FBQyx1REFBVyxDQUFDLElBQUksQ0FBQyxDQUFDO0lBQzdCLENBQUM7SUFBQyxNQUFNLENBQUM7UUFDUCxPQUFPLEtBQUssQ0FBQztJQUNmLENBQUM7QUFDSCxDQUFDO0FBRU0sS0FBSyxVQUFVLFVBQVUsQ0FBQyxJQUFZO0lBQzNDLElBQUksQ0FBQztRQUNILE9BQU8sQ0FBQyxNQUFNLHVEQUFXLENBQUMsSUFBSSxDQUFDLElBQUksQ0FBQyxDQUFDLENBQUMsTUFBTSxFQUFFLENBQUM7SUFDakQsQ0FBQztJQUFDLE1BQU0sQ0FBQztRQUNQLE9BQU8sS0FBSyxDQUFDO0lBQ2YsQ0FBQztBQUNILENBQUM7QUFFTSxTQUFTLGNBQWMsQ0FBQyxJQUFZO0lBQ3pDLElBQUksQ0FBQztRQUNILE9BQU8sdURBQVcsQ0FBQyxJQUFJLENBQUMsQ0FBQyxNQUFNLEVBQUUsQ0FBQztJQUNwQyxDQUFDO0lBQUMsTUFBTSxDQUFDO1FBQ1AsT0FBTyxLQUFLLENBQUM7SUFDZixDQUFDO0FBQ0gsQ0FBQztBQUVNLEtBQUssVUFBVSxlQUFlLENBQUMsSUFBWTtJQUNoRCxJQUFJLENBQUM7UUFDSCxPQUFPLENBQUMsTUFBTSx1REFBVyxDQUFDLElBQUksQ0FBQyxJQUFJLENBQUMsQ0FBQyxDQUFDLFdBQVcsRUFBRSxDQUFDO0lBQ3RELENBQUM7SUFBQyxNQUFNLENBQUM7UUFDUCxPQUFPLEtBQUssQ0FBQztJQUNmLENBQUM7QUFDSCxDQUFDO0FBRU0sU0FBUyxtQkFBbUIsQ0FBQyxJQUFZO0lBQzlDLElBQUksQ0FBQztRQUNKLE9BQU8sdURBQVcsQ0FBQyxJQUFJLENBQUMsQ0FBQyxXQUFXLEVBQUUsQ0FBQztJQUN4QyxDQUFDO0lBQUMsTUFBTSxDQUFDO1FBQ1AsT0FBTyxLQUFLLENBQUM7SUFDZixDQUFDO0FBQ0gsQ0FBQztBQUVNLFNBQVMsT0FBTyxDQUFDLFFBQWdCLEVBQUUsT0FBWTtJQUNwRCxJQUFJLE9BQU8sRUFBRSxPQUFPLEVBQUUsQ0FBQztRQUNyQixNQUFNLFFBQVEsR0FBRyx5REFBYSxDQUFDLFFBQVEsQ0FBQyxDQUFDO1FBQ3pDLE1BQU0sS0FBSyxHQUFHLFFBQVEsQ0FBQyxPQUFPLENBQUMsR0FBRyxDQUFDLENBQUM7UUFDcEMsT0FBTyxLQUFLLElBQUksQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLFFBQVEsQ0FBQyxTQUFTLENBQUMsS0FBSyxDQUFDLENBQUMsQ0FBQyxDQUFDLEVBQUUsQ0FBQztJQUN0RCxDQUFDO0lBRUQsT0FBTyx3REFBWSxDQUFDLFFBQVEsQ0FBQyxDQUFDO0FBQ2hDLENBQUM7QUFFTSxLQUFLLFVBQVUsUUFBUSxDQUFDLE9BQWUsRUFBRSxPQUFZO0lBQzFELE1BQU0sSUFBSSxHQUFHLElBQUksS0FBYSxDQUFDO0lBQy9CLElBQUksTUFBTSxlQUFlLENBQUMsT0FBTyxDQUFDLEVBQUUsQ0FBQztRQUNuQyxLQUFLLE1BQU0sSUFBSSxJQUFJLE1BQU0sdURBQVcsQ0FBQyxPQUFPLENBQUMsT0FBTyxDQUFDLEVBQUUsQ0FBQztZQUN0RCxNQUFNLFFBQVEsR0FBRyx3REFBWSxDQUFDLE9BQU8sRUFBRSxJQUFJLENBQUMsQ0FBQztZQUM3QyxNQUFNLElBQUksR0FBRyxNQUFNLHVEQUFXLENBQUMsSUFBSSxDQUFDLFFBQVEsQ0FBQyxDQUFDO1lBQzlDLElBQUksSUFBSSxDQUFDLE1BQU0sRUFBRSxFQUFFLENBQUM7Z0JBQ2xCLElBQUksQ0FBQyxJQUFJLENBQUMsT0FBTyxDQUFDLFFBQVEsQ0FBQyxDQUFDLENBQUMseURBQWEsQ0FBQyxPQUFPLENBQUMsUUFBUSxFQUFFLFFBQVEsQ0FBQyxDQUFDLENBQUMsQ0FBQyxRQUFRLENBQUMsQ0FBQztZQUNyRixDQUFDO2lCQUNJLElBQUksT0FBTyxDQUFDLFNBQVMsSUFBSSxJQUFJLENBQUMsV0FBVyxFQUFFLEVBQUUsQ0FBQztnQkFDakQsS0FBSyxNQUFNLEtBQUssSUFBSSxNQUFNLFFBQVEsQ0FBQyxRQUFRLEVBQUUsT0FBTyxDQUFDO29CQUNuRCxJQUFJLENBQUMsSUFBSSxDQUFDLEtBQUssQ0FBQyxDQUFDO1lBQ3JCLENBQUM7UUFDSCxDQUFDO0lBQ0gsQ0FBQztJQUNELE9BQU8sSUFBSSxDQUFDO0FBQ2QsQ0FBQztBQUVNLEtBQUssVUFBVSxlQUFlLENBQUMsUUFBZ0IsRUFBRSxPQUFlO0lBQ3JFLElBQUksTUFBTSxVQUFVLENBQUMsUUFBUSxDQUFDLEVBQUUsQ0FBQztRQUMvQixNQUFNLFVBQVUsR0FBRyxNQUFNLHVEQUFXLENBQUMsUUFBUSxDQUFDLFFBQVEsRUFBRSxFQUFFLFFBQVEsRUFBRSxNQUFNLEVBQUUsQ0FBQyxDQUFDO1FBQzlFLElBQUksT0FBTyxJQUFJLFVBQVU7WUFDdkIsT0FBTyxLQUFLLENBQUM7SUFDakIsQ0FBQztJQUVELE1BQU0sdURBQVcsQ0FBQyxLQUFLLENBQUMsd0RBQVksQ0FBQyxRQUFRLENBQUMsRUFBRSxFQUFFLFNBQVMsRUFBRSxJQUFJLEVBQUUsQ0FBQyxDQUFDO0lBQ3JFLE1BQU0sdURBQVcsQ0FBQyxTQUFTLENBQUMsUUFBUSxFQUFFLE9BQU8sRUFBRSxFQUFFLFFBQVEsRUFBRSxNQUFNLEVBQUUsQ0FBQyxDQUFDO0lBRXJFLE9BQU8sSUFBSSxDQUFDO0FBQ2QsQ0FBQztBQUVNLFNBQVMsYUFBYSxDQUFDLEdBQVc7SUFDdkMsT0FBTyxHQUFHLENBQUMsVUFBVSxDQUFDLFNBQVMsQ0FBQyxDQUFDLENBQUMsQ0FBQyw2REFBaUIsQ0FBQyxHQUFHLENBQUMsQ0FBQyxDQUFDLENBQUMsR0FBRyxDQUFDO0FBQ2xFLENBQUM7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7QUN4R0Q7Ozs7Ozs7R0FPRztBQUUwQjtBQUNKO0FBQ0Q7QUFDRTtBQUVjO0FBRXhDLE1BQU0sTUFBTSxHQUFHLHFEQUFZLENBQUMsb0ZBQWUsQ0FBQyxDQUFDO0FBRTdDLE1BQU0sV0FBVyxHQUFHO0lBQ2xCLE1BQU0sRUFBRSxLQUFLO0lBQ2IsT0FBTyxFQUFFLElBQUk7SUFDYixPQUFPLEVBQUU7UUFDUCxZQUFZLEVBQUUsU0FBWSxHQUFHLEdBQUcsR0FBRyxpQkFBZTtRQUNsRCxRQUFRLEVBQUUsS0FBSztLQUNoQjtDQUNGLENBQUM7QUFFRixTQUFTLFdBQVcsQ0FBQyxHQUFXLEVBQUUsT0FBbUQsRUFBRSxRQUFhO0lBQ2xHLElBQUksR0FBRyxDQUFDLFVBQVUsQ0FBQyxVQUFVLENBQUM7UUFDNUIsT0FBTyxvREFBYSxDQUFDLEdBQUcsRUFBRSxPQUFPLEVBQUUsUUFBUSxDQUFDLENBQUM7SUFDL0MsT0FBTyxtREFBWSxDQUFDLEdBQUcsRUFBRSxPQUFPLEVBQUUsUUFBUSxDQUFDLENBQUM7QUFDOUMsQ0FBQztBQUFBLENBQUM7QUFFSyxTQUFTLFVBQVUsQ0FBQyxHQUFXO0lBQ3BDLE9BQU8sSUFBSSxPQUFPLENBQUMsQ0FBQyxPQUFPLEVBQUUsTUFBTSxFQUFFLEVBQUU7UUFFckMsTUFBTSxPQUFPLEdBQUcsQ0FBQyxHQUFRLEVBQUUsRUFBRTtZQUMzQixNQUFNLE9BQU8sR0FBRyxpREFBaUQsR0FBRyxHQUFHLENBQUMsT0FBTyxDQUFDO1lBQ2hGLE1BQU0sQ0FBQyxLQUFLLENBQUMsT0FBTyxFQUFFLEdBQUcsQ0FBQyxDQUFDO1lBQzNCLE1BQU0sQ0FBQyxPQUFPLENBQUMsQ0FBQztRQUNsQixDQUFDLENBQUM7UUFFRixNQUFNLFNBQVMsR0FBRyxDQUFDLE9BQVksRUFBRSxFQUFFO1lBQ2pDLE9BQU8sQ0FBQyxPQUFPLEVBQUUsQ0FBQztZQUNsQixNQUFNLENBQUMsS0FBSyxDQUFDLFdBQVcsRUFBRSxHQUFHLENBQUMsQ0FBQztZQUMvQixNQUFNLENBQUMsU0FBUyxDQUFDLENBQUM7UUFDcEIsQ0FBQztRQUVELE1BQU0sU0FBUyxHQUFHLENBQUMsUUFBYSxFQUFFLEVBQUU7WUFDbEMsUUFBUSxRQUFRLENBQUMsVUFBVSxFQUFFLENBQUM7Z0JBQzlCLEtBQUssR0FBRztvQkFDTixNQUFNLE1BQU0sR0FBa0IsRUFBRSxDQUFDO29CQUNqQyxRQUFRLENBQUMsRUFBRSxDQUFDLE1BQU0sRUFBRSxDQUFDLEtBQWEsRUFBRSxFQUFFLENBQUMsTUFBTSxDQUFDLElBQUksQ0FBQyxLQUFLLENBQUMsQ0FBQyxDQUFDO29CQUMzRCxRQUFRLENBQUMsRUFBRSxDQUFDLEtBQUssRUFBRSxHQUFHLEVBQUUsQ0FBQyxPQUFPLENBQUMsTUFBTSxDQUFDLE1BQU0sQ0FBQyxNQUFNLENBQUMsQ0FBQyxDQUFDLENBQUM7b0JBQ3pELFFBQVEsQ0FBQyxFQUFFLENBQUMsT0FBTyxFQUFFLEdBQUcsRUFBRSxDQUFDLE1BQU0sQ0FBQyxJQUFJLENBQUMsU0FBUyxDQUFDLENBQUMsQ0FBQztvQkFDbkQsTUFBTTtnQkFFUixLQUFLLEdBQUcsQ0FBQztnQkFDVCxLQUFLLEdBQUc7b0JBQ04sUUFBUSxDQUFDLE1BQU0sRUFBRSxDQUFDO29CQUNsQixNQUFNLENBQUMsSUFBSSxDQUFDLGVBQWUsUUFBUSxDQUFDLE9BQU8sQ0FBQyxRQUFRLEVBQUUsQ0FBQyxDQUFDO29CQUN4RCxNQUFNLE9BQU8sR0FBRyxXQUFXLENBQUMsUUFBUSxDQUFDLE9BQU8sQ0FBQyxRQUFRLEVBQUUsV0FBVyxFQUFFLFNBQVMsQ0FBQyxDQUFDO29CQUMvRSxPQUFPLENBQUMsRUFBRSxDQUFDLFNBQVMsRUFBRSxTQUFTLENBQUMsSUFBSSxDQUFDLElBQUksRUFBRSxPQUFPLENBQUMsQ0FBQyxDQUFDO29CQUNyRCxPQUFPLENBQUMsRUFBRSxDQUFDLE9BQU8sRUFBRSxPQUFPLENBQUMsQ0FBQztvQkFDN0IsT0FBTyxDQUFDLEdBQUcsRUFBRSxDQUFDO29CQUNkLE1BQU07Z0JBRVI7b0JBQ0UsUUFBUSxDQUFDLE1BQU0sRUFBRSxDQUFDO29CQUNsQixNQUFNLE9BQU8sR0FBRywyQ0FBMkMsR0FBRyxRQUFRLENBQUMsVUFBVSxDQUFDO29CQUNsRixNQUFNLENBQUMsS0FBSyxDQUFDLE9BQU8sQ0FBQyxDQUFDO29CQUN0QixNQUFNLENBQUMsT0FBTyxDQUFDLENBQUM7b0JBQ2hCLE1BQU07WUFDUixDQUFDO1FBQ0gsQ0FBQyxDQUFDO1FBRUYsTUFBTSxDQUFDLElBQUksQ0FBQyxRQUFRLEdBQUcsRUFBRSxDQUFDLENBQUM7UUFDM0IsTUFBTSxPQUFPLEdBQUcsV0FBVyxDQUFDLEdBQUcsRUFBRSxXQUFXLEVBQUUsU0FBUyxDQUFDLENBQUM7UUFDekQsT0FBTyxDQUFDLEVBQUUsQ0FBQyxTQUFTLEVBQUUsU0FBUyxDQUFDLElBQUksQ0FBQyxJQUFJLEVBQUUsT0FBTyxDQUFDLENBQUMsQ0FBQztRQUNyRCxPQUFPLENBQUMsRUFBRSxDQUFDLE9BQU8sRUFBRSxPQUFPLENBQUMsQ0FBQztRQUM3QixPQUFPLENBQUMsR0FBRyxFQUFFLENBQUM7SUFDaEIsQ0FBQyxDQUFDLENBQUM7QUFDTCxDQUFDO0FBQUEsQ0FBQztBQUVLLFNBQVMsWUFBWSxDQUFDLEdBQVcsRUFBRSxJQUFZO0lBQ3BELE9BQU8sSUFBSSxPQUFPLENBQUMsQ0FBQyxPQUFPLEVBQUUsTUFBTSxFQUFFLEVBQUU7UUFDckMsTUFBTSxRQUFRLEdBQUcseURBQWEsQ0FBQyxHQUFHLENBQUMsQ0FBQztRQUVwQyxNQUFNLE1BQU0sR0FBRyxDQUFDLEdBQUcsRUFBRTtZQUNuQixJQUFJLElBQUksRUFBRSxDQUFDO2dCQUNULE1BQU0sRUFBRSxHQUFHLHVEQUFXLENBQUMsSUFBSSxFQUFFLEdBQUcsQ0FBQyxDQUFDO2dCQUNsQyxPQUFPO29CQUNMLE1BQU0sRUFBRSxDQUFDLEtBQWEsRUFBRSxFQUFFO3dCQUN4Qix3REFBWSxDQUFDLEVBQUUsRUFBRSxLQUFLLENBQUMsQ0FBQztvQkFDMUIsQ0FBQztvQkFDRCxLQUFLLEVBQUUsR0FBRyxFQUFFO3dCQUNWLHdEQUFZLENBQUMsRUFBRSxDQUFDLENBQUM7d0JBQ2pCLE9BQU8sQ0FBQyxTQUFTLENBQUMsQ0FBQztvQkFDckIsQ0FBQztpQkFDRixDQUFDO1lBQ0osQ0FBQztpQkFDSSxDQUFDO2dCQUNKLE1BQU0sTUFBTSxHQUFrQixFQUFFLENBQUM7Z0JBQ2pDLE9BQU87b0JBQ0wsTUFBTSxFQUFFLENBQUMsS0FBYSxFQUFFLEVBQUU7d0JBQ3hCLE1BQU0sQ0FBQyxJQUFJLENBQUMsS0FBSyxDQUFDLENBQUM7b0JBQ3JCLENBQUM7b0JBQ0QsS0FBSyxFQUFFLEdBQUcsRUFBRTt3QkFDVixPQUFPLENBQUMsTUFBTSxDQUFDLE1BQU0sQ0FBQyxNQUFNLENBQUMsQ0FBQyxDQUFDO29CQUNqQyxDQUFDO2lCQUNGLENBQUM7WUFDSixDQUFDO1FBQ0gsQ0FBQyxDQUFDLEVBQUUsQ0FBQztRQUVMLE1BQU0sWUFBWSxHQUFHLENBQUMsR0FBVyxFQUFFLFFBQWEsRUFBRSxFQUFFO1lBQ2xELE1BQU0sT0FBTyxHQUFHLG9EQUFhLENBQUMsR0FBRyxFQUFFLFdBQVcsRUFBRSxRQUFRLENBQUMsQ0FBQztZQUMxRCxJQUFJLE9BQU8sRUFBRSxDQUFDO2dCQUNaLE9BQU8sQ0FBQyxFQUFFLENBQUMsT0FBTyxFQUFFLENBQUMsS0FBSyxFQUFFLEVBQUUsQ0FBQyxNQUFNLENBQUMsS0FBSyxDQUFDLENBQUMsQ0FBQztnQkFDOUMsT0FBTyxDQUFDLEdBQUcsRUFBRSxDQUFDO1lBQ2hCLENBQUM7aUJBQ0ksQ0FBQztnQkFDSixNQUFNLENBQUMsZ0NBQWdDLEdBQUcsRUFBRSxDQUFDLENBQUM7WUFDaEQsQ0FBQztRQUNILENBQUMsQ0FBQztRQUVGLE1BQU0sU0FBUyxHQUFHLENBQUMsUUFBYSxFQUFFLEVBQUU7WUFDbEMsUUFBUSxRQUFRLENBQUMsVUFBVSxFQUFFLENBQUM7Z0JBQzlCLEtBQUssR0FBRztvQkFDTixNQUFNLENBQUMsSUFBSSxDQUFDLGVBQWUsUUFBUSxDQUFDLEdBQUcsQ0FBQyxJQUFJLEVBQUUsQ0FBQyxDQUFDO29CQUNoRCxNQUFNLENBQUMsSUFBSSxDQUFDLGVBQWUsUUFBUSxFQUFFLENBQUMsQ0FBQztvQkFDdkMsUUFBUSxDQUFDLEVBQUUsQ0FBQyxNQUFNLEVBQUUsTUFBTSxDQUFDLE1BQU0sQ0FBQyxDQUFDO29CQUNuQyxRQUFRLENBQUMsRUFBRSxDQUFDLEtBQUssRUFBRSxNQUFNLENBQUMsS0FBSyxDQUFDLENBQUM7b0JBQ2pDLFFBQVEsQ0FBQyxFQUFFLENBQUMsT0FBTyxFQUFFLEdBQUcsRUFBRSxDQUFDLE1BQU0sQ0FBQyxJQUFJLENBQUMsTUFBTSxDQUFDLENBQUMsQ0FBQztvQkFDaEQsTUFBTTtnQkFFUixLQUFLLEdBQUcsQ0FBQztnQkFDVCxLQUFLLEdBQUc7b0JBQ04sUUFBUSxDQUFDLE1BQU0sRUFBRSxDQUFDO29CQUNsQixNQUFNLENBQUMsSUFBSSxDQUFDLGFBQWEsUUFBUSxDQUFDLE9BQU8sQ0FBQyxRQUFRLEVBQUUsQ0FBQyxDQUFDO29CQUN0RCxZQUFZLENBQUMsUUFBUSxDQUFDLE9BQU8sQ0FBQyxRQUFRLEVBQUUsU0FBUyxDQUFDLENBQUM7b0JBQ25ELE1BQU07Z0JBRVI7b0JBQ0UsUUFBUSxDQUFDLE1BQU0sRUFBRSxDQUFDO29CQUNsQixNQUFNLENBQUMsNENBQTRDLFFBQVEsQ0FBQyxVQUFVLEVBQUUsQ0FBQyxDQUFDO29CQUMxRSxNQUFNO1lBQ1IsQ0FBQztRQUNILENBQUMsQ0FBQztRQUVGLE1BQU0sQ0FBQyxJQUFJLENBQUMsY0FBYyxHQUFHLEVBQUUsQ0FBQyxDQUFDO1FBQ2pDLFlBQVksQ0FBQyxHQUFHLEVBQUUsU0FBUyxDQUFDLENBQUM7SUFDL0IsQ0FBQyxDQUFDLENBQUM7QUFDTCxDQUFDOzs7Ozs7Ozs7Ozs7Ozs7QUN4SkQ7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFTzs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7O0FDVGtCO0FBQ0k7QUFFaUI7QUFDTjtBQUV4QyxNQUFNLE1BQU0sR0FBRyxxREFBWSxDQUFDLGtGQUFlLENBQUMsQ0FBQztBQUV0QyxLQUFLLFVBQVUsU0FBUyxDQUFDLE1BQWMsRUFBRSxPQUFlO0lBQzdELE1BQU0sQ0FBQyxJQUFJLENBQUMsY0FBYyxNQUFNLE9BQU8sT0FBTyxFQUFFLENBQUMsQ0FBQztJQUNsRCxNQUFNLElBQUksR0FBRyxNQUFNLDJEQUFRLENBQUMsTUFBTSxFQUFFLEVBQUUsUUFBUSxFQUFFLE1BQU0sRUFBRSxTQUFTLEVBQUUsSUFBSSxFQUFFLENBQUMsQ0FBQztJQUMzRSxLQUFLLE1BQU0sSUFBSSxJQUFJLElBQUksRUFBRSxDQUFDO1FBQ3hCLE1BQU0sTUFBTSxHQUFHLHdEQUFZLENBQUMsTUFBTSxFQUFFLElBQUksQ0FBQyxDQUFDO1FBQzFDLE1BQU0sV0FBVyxHQUFHLHdEQUFZLENBQUMsT0FBTyxFQUFFLElBQUksQ0FBQyxDQUFDO1FBQ2hELE1BQU0sdURBQVcsQ0FBQyxFQUFFLENBQUMsTUFBTSxFQUFFLFdBQVcsRUFBRSxFQUFFLEtBQUssRUFBRSxJQUFJLEVBQUUsQ0FBQyxDQUFDO1FBQzNELE1BQU0sQ0FBQyxJQUFJLENBQUMsYUFBYSxJQUFJLEVBQUUsQ0FBQyxDQUFDO0lBQ25DLENBQUM7QUFDSCxDQUFDOzs7Ozs7Ozs7Ozs7Ozs7OztBQ2pCRDs7Ozs7OztHQU9HO0FBRUgsTUFBTSxXQUFXLEdBQUcsSUFBSSxDQUFDLFNBQVMsQ0FBQyxDQUFDO0FBRTdCLFNBQVMsY0FBYyxDQUFDLElBQVk7SUFDekMsSUFBSSxLQUF5QztRQUMzQyxFQUFpQztJQUNuQyxJQUFJLE9BQU8sV0FBVyxLQUFLLFdBQVc7UUFDcEMsT0FBTyxXQUFXLENBQUMsT0FBTyxDQUFDLElBQUksQ0FBQyxDQUFDO0lBQ25DLE1BQU0sSUFBSSxLQUFLLENBQUMscUNBQXFDLENBQUMsQ0FBQztBQUN6RCxDQUFDO0FBRWlEOzs7Ozs7Ozs7Ozs7Ozs7Ozs7QUNuQmxEOzs7Ozs7O0dBT0c7QUFFSSxTQUFTLFVBQVUsQ0FBQyxDQUFNLEVBQUUsQ0FBTTtJQUN2QyxJQUFJLENBQUMsS0FBSyxDQUFDO1FBQ1QsT0FBTyxJQUFJLENBQUM7SUFFZCxJQUFJLENBQUMsS0FBSyxTQUFTLElBQUksQ0FBQyxLQUFLLFNBQVM7UUFDcEMsT0FBTyxLQUFLLENBQUM7SUFFZixJQUFJLE9BQU8sQ0FBQyxLQUFLLFFBQVEsSUFBSSxPQUFPLENBQUMsS0FBSyxRQUFRO1FBQ2hELE9BQU8sS0FBSyxDQUFDO0lBRWYsTUFBTSxFQUFFLEdBQUcsTUFBTSxDQUFDLElBQUksQ0FBQyxDQUFDLENBQUMsQ0FBQztJQUMxQixNQUFNLEVBQUUsR0FBRyxNQUFNLENBQUMsSUFBSSxDQUFDLENBQUMsQ0FBQyxDQUFDO0lBRTFCLElBQUksRUFBRSxDQUFDLE1BQU0sSUFBSSxFQUFFLENBQUMsTUFBTTtRQUN4QixPQUFPLEtBQUssQ0FBQztJQUVmLEtBQUssTUFBTSxHQUFHLElBQUksRUFBRSxFQUFFLENBQUM7UUFDckIsSUFBSSxDQUFDLE1BQU0sQ0FBQyxNQUFNLENBQUMsQ0FBQyxFQUFFLEdBQUcsQ0FBQyxJQUFJLENBQUMsVUFBVSxDQUFDLENBQUMsQ0FBQyxHQUFHLENBQUMsRUFBRSxDQUFDLENBQUMsR0FBRyxDQUFDLENBQUM7WUFDdkQsT0FBTyxLQUFLLENBQUM7SUFDakIsQ0FBQztJQUVELE9BQU8sSUFBSSxDQUFDO0FBQ2QsQ0FBQztBQUVNLFNBQVMsU0FBUyxDQUFDLENBQU07SUFDOUIsSUFBSSxDQUFDLENBQUMsSUFBSSxPQUFPLENBQUMsS0FBSyxRQUFRO1FBQzdCLE9BQU8sQ0FBQyxDQUFDO0lBQ1gsSUFBSSxLQUFLLENBQUMsT0FBTyxDQUFDLENBQUMsQ0FBQyxFQUFFLENBQUM7UUFDckIsTUFBTSxNQUFNLEdBQUcsRUFBRSxDQUFDO1FBQ2xCLEtBQUssTUFBTSxJQUFJLElBQUksQ0FBQztZQUNsQixNQUFNLENBQUMsSUFBSSxDQUFDLFNBQVMsQ0FBQyxJQUFJLENBQUMsQ0FBQyxDQUFDO1FBQy9CLE9BQU8sTUFBTSxDQUFDO0lBQ2hCLENBQUM7U0FDSSxDQUFDO1FBQ0osTUFBTSxNQUFNLEdBQUcsRUFBUyxDQUFDO1FBQ3pCLEtBQUssTUFBTSxDQUFDLEdBQUcsRUFBQyxHQUFHLENBQUMsSUFBSSxNQUFNLENBQUMsT0FBTyxDQUFDLENBQUMsQ0FBQztZQUN2QyxNQUFNLENBQUMsR0FBRyxDQUFDLEdBQUcsU0FBUyxDQUFDLEdBQUcsQ0FBQyxDQUFDO1FBQy9CLE9BQU8sTUFBTSxDQUFDO0lBQ2hCLENBQUM7QUFDSCxDQUFDO0FBRU0sU0FBUyxZQUFZLENBQUMsTUFBVyxFQUFFLE1BQVc7SUFDbkQsSUFBSSxLQUFLLENBQUMsT0FBTyxDQUFDLE1BQU0sQ0FBQyxJQUFJLEtBQUssQ0FBQyxPQUFPLENBQUMsTUFBTSxDQUFDLEVBQUUsQ0FBQztRQUNuRCxLQUFLLE1BQU0sSUFBSSxJQUFJLE1BQU07WUFDdkIsTUFBTSxDQUFDLElBQUksQ0FBQyxJQUFJLENBQUMsQ0FBQztJQUN0QixDQUFDO1NBQ0ksQ0FBQztRQUNKLEtBQUssTUFBTSxHQUFHLElBQUksTUFBTSxDQUFDLElBQUksQ0FBQyxNQUFNLENBQUMsRUFBRSxDQUFDO1lBQ3RDLE1BQU0sQ0FBQyxHQUFHLE1BQU0sQ0FBQyxHQUFHLENBQUMsRUFBRSxDQUFDLEdBQUcsTUFBTSxDQUFDLEdBQUcsQ0FBQyxDQUFDO1lBQ3ZDLElBQUksQ0FBQyxJQUFJLE9BQU8sQ0FBQyxLQUFLLFFBQVEsSUFBSSxDQUFDLElBQUksT0FBTyxDQUFDLEtBQUssUUFBUTtnQkFDMUQsWUFBWSxDQUFDLENBQUMsRUFBRSxDQUFDLENBQUMsQ0FBQzs7Z0JBRW5CLE1BQU0sQ0FBQyxHQUFHLENBQUMsR0FBRyxTQUFTLENBQUMsQ0FBQyxDQUFDLENBQUM7UUFDL0IsQ0FBQztJQUNILENBQUM7QUFDSCxDQUFDO0FBRU0sU0FBUyxZQUFZLENBQUMsS0FBVTtJQUNyQyxJQUFJLEtBQUssS0FBSyxTQUFTLElBQUksS0FBSyxDQUFDLE9BQU8sQ0FBQyxLQUFLLENBQUM7UUFDN0MsT0FBTyxLQUFLLENBQUM7SUFDZixPQUFPLENBQUUsS0FBSyxDQUFFLENBQUM7QUFDbkIsQ0FBQzs7Ozs7Ozs7Ozs7Ozs7Ozs7QUN0RUQ7Ozs7Ozs7R0FPRztBQUVzQjtBQUVsQixNQUFNLGVBQWU7SUFDbEIsU0FBUyxDQUFTO0lBQ2xCLFNBQVMsQ0FBTTtJQUNmLFFBQVEsQ0FBTTtJQUV0QixZQUFZLFFBQWdCO1FBQzFCLElBQUksQ0FBQyxTQUFTLEdBQUcsUUFBUSxDQUFDO0lBQzVCLENBQUM7SUFFTSxLQUFLLENBQUMsSUFBSSxDQUFDLElBQVk7UUFDNUIsSUFBSSxDQUFDLElBQUksQ0FBQyxTQUFTO1lBQ2pCLE1BQU0sSUFBSSxDQUFDLElBQUksRUFBRSxDQUFDO1FBQ3BCLElBQUksTUFBTSxHQUFHLElBQUksQ0FBQyxRQUFRLENBQUMsTUFBTSxDQUFDLElBQUksQ0FBQyxDQUFDO1FBQ3hDLElBQUksQ0FBQyxNQUFNO1lBQ1QsTUFBTSxHQUFHLElBQUksQ0FBQyxRQUFRLENBQUMsTUFBTSxDQUFDLElBQUksQ0FBQyxHQUFHLEVBQUUsQ0FBQztRQUMzQyxJQUFJLENBQUMsUUFBUSxHQUFHLEVBQUUsTUFBTSxFQUFFLElBQUksQ0FBQyxRQUFRLEVBQUUsTUFBTSxFQUFFLENBQUM7SUFDcEQsQ0FBQztJQUVNLEtBQUssQ0FBQyxHQUFHO1FBQ2QsSUFBSSxDQUFDLElBQUksQ0FBQyxTQUFTO1lBQ2pCLE1BQU0sSUFBSSxDQUFDLElBQUksRUFBRSxDQUFDO1FBQ3BCLE9BQU8sQ0FBQyxNQUFNLENBQUMsSUFBSSxDQUFDLFFBQVEsQ0FBQyxNQUFNLENBQUMsQ0FBQztRQUNyQyxJQUFJLENBQUMsUUFBUSxHQUFHLElBQUksQ0FBQyxRQUFRLENBQUMsTUFBTSxDQUFDO0lBQ3ZDLENBQUM7SUFFTSxLQUFLLENBQUMsR0FBRyxDQUFDLElBQVk7UUFDM0IsSUFBSSxDQUFDLElBQUksQ0FBQyxTQUFTO1lBQ2pCLE1BQU0sSUFBSSxDQUFDLElBQUksRUFBRSxDQUFDO1FBQ3BCLE9BQU8sSUFBSSxDQUFDLFFBQVEsQ0FBQyxNQUFNLENBQUMsSUFBSSxDQUFDLENBQUM7SUFDcEMsQ0FBQztJQUVNLEtBQUssQ0FBQyxHQUFHLENBQUMsSUFBWSxFQUFFLEtBQVU7UUFDdkMsSUFBSSxDQUFDLElBQUksQ0FBQyxTQUFTO1lBQ2pCLE1BQU0sSUFBSSxDQUFDLElBQUksRUFBRSxDQUFDO1FBQ3BCLElBQUksQ0FBQyxRQUFRLENBQUMsTUFBTSxDQUFDLElBQUksQ0FBQyxHQUFHLEtBQUssQ0FBQztRQUNuQyxNQUFNLElBQUksQ0FBQyxJQUFJLEVBQUUsQ0FBQztJQUNwQixDQUFDO0lBRU0sS0FBSyxDQUFDLElBQUk7UUFDZixJQUFJLENBQUM7WUFDSCxNQUFNLE9BQU8sR0FBRyxNQUFNLHVEQUFXLENBQUMsUUFBUSxDQUFDLElBQUksQ0FBQyxTQUFTLEVBQUUsT0FBTyxDQUFDLENBQUM7WUFDcEUsSUFBSSxDQUFDLFNBQVMsR0FBRyxJQUFJLENBQUMsS0FBSyxDQUFDLE9BQU8sQ0FBQyxDQUFDO1FBQ3ZDLENBQUM7UUFDRCxPQUFPLENBQUMsRUFBRSxDQUFDO1lBQ1QsSUFBSSxDQUFDLFNBQVMsR0FBRyxFQUFFLENBQUM7UUFDdEIsQ0FBQztRQUNELElBQUksQ0FBQyxRQUFRO1lBQ2I7Z0JBQ0UsTUFBTSxFQUFFLElBQUk7Z0JBQ1osTUFBTSxFQUFFLElBQUksQ0FBQyxTQUFTO2FBQ3ZCLENBQUM7SUFDSixDQUFDO0lBRU0sS0FBSyxDQUFDLElBQUk7UUFDZixNQUFNLEtBQUssR0FBRyxDQUFDLENBQUM7UUFDaEIsTUFBTSxPQUFPLEdBQUcsSUFBSSxDQUFDLFNBQVMsQ0FBQyxJQUFJLENBQUMsU0FBUyxFQUFFLFNBQVMsRUFBRSxLQUFLLENBQUMsQ0FBQztRQUNqRSxNQUFNLHVEQUFXLENBQUMsU0FBUyxDQUFDLElBQUksQ0FBQyxTQUFTLEVBQUUsT0FBTyxFQUFFLEVBQUUsUUFBUSxFQUFFLE9BQU8sRUFBRSxJQUFJLEVBQUUsR0FBRyxFQUFFLEtBQUssRUFBRSxJQUFJLEVBQUUsQ0FBQyxDQUFDO0lBQ3RHLENBQUM7Q0FDRjtBQUFBLENBQUM7Ozs7Ozs7Ozs7Ozs7Ozs7OztBQ3JFRjs7Ozs7OztHQU9HO0FBRUksU0FBUyxhQUFhLENBQUMsS0FBVTtJQUN0QyxJQUFJLE9BQU8sS0FBSyxLQUFLLFNBQVM7UUFDNUIsT0FBTyxLQUFLLENBQUM7SUFDZixNQUFNLElBQUksS0FBSyxDQUFDLFFBQVEsS0FBSyxvQkFBb0IsQ0FBQyxDQUFDO0FBQ3JELENBQUM7QUFFTSxTQUFTLFlBQVksQ0FBQyxLQUFVO0lBQ3JDLElBQUksT0FBTyxLQUFLLEtBQUssUUFBUTtRQUMzQixPQUFPLEtBQUssQ0FBQztJQUNmLE1BQU0sSUFBSSxLQUFLLENBQUMsUUFBUSxLQUFLLG1CQUFtQixDQUFDLENBQUM7QUFDcEQsQ0FBQztBQUVNLFNBQVMsWUFBWSxDQUFDLEtBQVU7SUFDckMsSUFBSSxPQUFPLEtBQUssS0FBSyxRQUFRO1FBQzNCLE9BQU8sS0FBSyxDQUFDO0lBQ2YsTUFBTSxJQUFJLEtBQUssQ0FBQyxRQUFRLEtBQUssbUJBQW1CLENBQUMsQ0FBQztBQUNwRCxDQUFDO0FBRU0sU0FBUyxXQUFXLENBQUMsS0FBVTtJQUNwQyxJQUFJLEtBQUssQ0FBQyxPQUFPLENBQUMsS0FBSyxDQUFDO1FBQ3RCLE9BQU8sS0FBSyxDQUFDLElBQUksQ0FBQyxLQUFLLENBQUMsQ0FBQztJQUMzQixNQUFNLElBQUksS0FBSyxDQUFDLFFBQVEsS0FBSyxrQkFBa0IsQ0FBQyxDQUFDO0FBQ25ELENBQUM7Ozs7Ozs7Ozs7O0FDL0JEOzs7Ozs7Ozs7O0FDQUE7Ozs7Ozs7Ozs7QUNBQTs7Ozs7Ozs7OztBQ0FBOzs7Ozs7Ozs7O0FDQUE7Ozs7Ozs7Ozs7QUNBQTs7Ozs7Ozs7OztBQ0FBOzs7Ozs7VUNBQTtVQUNBOztVQUVBO1VBQ0E7VUFDQTtVQUNBO1VBQ0E7VUFDQTtVQUNBO1VBQ0E7VUFDQTtVQUNBO1VBQ0E7VUFDQTtVQUNBOztVQUVBO1VBQ0E7O1VBRUE7VUFDQTtVQUNBOzs7OztXQ3RCQTtXQUNBO1dBQ0E7V0FDQTtXQUNBO1dBQ0EsaUNBQWlDLFdBQVc7V0FDNUM7V0FDQTs7Ozs7V0NQQTtXQUNBO1dBQ0E7V0FDQTtXQUNBLHlDQUF5Qyx3Q0FBd0M7V0FDakY7V0FDQTtXQUNBOzs7OztXQ1BBOzs7OztXQ0FBO1dBQ0E7V0FDQTtXQUNBLHVEQUF1RCxpQkFBaUI7V0FDeEU7V0FDQSxnREFBZ0QsYUFBYTtXQUM3RDs7Ozs7Ozs7Ozs7Ozs7Ozs7QUNOQTs7Ozs7OztHQU9HO0FBRUgsb0NBQW9DO0FBRVA7QUFFVztBQUNFO0FBRTFDLGlFQUFlO0lBQ2IsR0FBRztJQUNILFFBQVEsRUFBRTtRQUNSLE9BQU8sRUFBRSxxREFBWTtRQUNyQixJQUFJLEVBQUUsb0RBQVc7UUFDakIsS0FBSyxFQUFFLHFEQUFZO0tBQ3BCO0NBQ0YsRUFBQyIsInNvdXJjZXMiOlsid2VicGFjazovL2JpdG1ha2Uvd2VicGFjay91bml2ZXJzYWxNb2R1bGVEZWZpbml0aW9uIiwid2VicGFjazovL2JpdG1ha2UvLi9zcmMvQnVpbGRIYW5kbGVyLnRzIiwid2VicGFjazovL2JpdG1ha2UvLi9zcmMvQ29uc3RhbnRzLnRzIiwid2VicGFjazovL2JpdG1ha2UvLi9zcmMvSW5pdEhhbmRsZXIudHMiLCJ3ZWJwYWNrOi8vYml0bWFrZS8uL3NyYy9NYWtlU2NyaXB0QWN0aW9uLnRzIiwid2VicGFjazovL2JpdG1ha2UvLi9zcmMvUnVuU2NyaXB0Q29udGV4dC50cyIsIndlYnBhY2s6Ly9iaXRtYWtlLy4vc3JjL2NtYWtlL0NvbnN0YW50cy50cyIsIndlYnBhY2s6Ly9iaXRtYWtlLy4vc3JjL2NtYWtlL0hlbHBlci50cyIsIndlYnBhY2s6Ly9iaXRtYWtlLy4vc3JjL2NtYWtlL2luZGV4LnRzIiwid2VicGFjazovL2JpdG1ha2UvLi9zcmMvY29yZS9CdWlsZGluU2NyaXB0cy9jb25maWd1cmVfZmlsZS50cyIsIndlYnBhY2s6Ly9iaXRtYWtlLy4vc3JjL2NvcmUvQnVpbGRpblNjcmlwdHMvaW5zdGFsbF9zY3JpcHQudHMiLCJ3ZWJwYWNrOi8vYml0bWFrZS8uL3NyYy9jb3JlL0N1c3RvbVNjcmlwdC50cyIsIndlYnBhY2s6Ly9iaXRtYWtlLy4vc3JjL2NvcmUvRGV0ZXJtaW5lQ29tcGlsZXIudHMiLCJ3ZWJwYWNrOi8vYml0bWFrZS8uL3NyYy9jb3JlL0ZpbmRQcm9ncmFtLnRzIiwid2VicGFjazovL2JpdG1ha2UvLi9zcmMvY29yZS9HZXRTaXplb2ZWb2lkcC50cyIsIndlYnBhY2s6Ly9iaXRtYWtlLy4vc3JjL2NvcmUvR2xvYmFsQ29udGV4dC50cyIsIndlYnBhY2s6Ly9iaXRtYWtlLy4vc3JjL2NvcmUvR29hbENvbGxlY3Rpb24udHMiLCJ3ZWJwYWNrOi8vYml0bWFrZS8uL3NyYy9jb3JlL0luY2x1ZGVEaXJlY3RvcnkudHMiLCJ3ZWJwYWNrOi8vYml0bWFrZS8uL3NyYy9jb3JlL0luc3RhbGxFbnRpdHkudHMiLCJ3ZWJwYWNrOi8vYml0bWFrZS8uL3NyYy9jb3JlL0ludGVyZmFjZUluY2x1ZGVzLnRzIiwid2VicGFjazovL2JpdG1ha2UvLi9zcmMvY29yZS9JbnRlcmZhY2VPYmplY3RzLnRzIiwid2VicGFjazovL2JpdG1ha2UvLi9zcmMvY29yZS9JbnRlcmZhY2VTY3JpcHQudHMiLCJ3ZWJwYWNrOi8vYml0bWFrZS8uL3NyYy9jb3JlL0ludGVyZmFjZVRhcmdldC50cyIsIndlYnBhY2s6Ly9iaXRtYWtlLy4vc3JjL2NvcmUvUGF0aC50cyIsIndlYnBhY2s6Ly9iaXRtYWtlLy4vc3JjL2NvcmUvUGx1Z2luQ29udGV4dC50cyIsIndlYnBhY2s6Ly9iaXRtYWtlLy4vc3JjL2NvcmUvU2NvcGUudHMiLCJ3ZWJwYWNrOi8vYml0bWFrZS8uL3NyYy9jb3JlL1NjcmlwdENvbGxlY3Rpb24udHMiLCJ3ZWJwYWNrOi8vYml0bWFrZS8uL3NyYy9jb3JlL1NvdXJjZUZpbGUudHMiLCJ3ZWJwYWNrOi8vYml0bWFrZS8uL3NyYy9jb3JlL1NvdXJjZUZpbGVMaXN0LnRzIiwid2VicGFjazovL2JpdG1ha2UvLi9zcmMvY29yZS9TeXN0ZW1WYXJpYWJsZXMudHMiLCJ3ZWJwYWNrOi8vYml0bWFrZS8uL3NyYy9jb3JlL1RhcmdldC50cyIsIndlYnBhY2s6Ly9iaXRtYWtlLy4vc3JjL2NvcmUvVGFyZ2V0Q29sbGVjdGlvbi50cyIsIndlYnBhY2s6Ly9iaXRtYWtlLy4vc3JjL2NvcmUvVG9vbGNoYWluQ29udGV4dC50cyIsIndlYnBhY2s6Ly9iaXRtYWtlLy4vc3JjL2NvcmUvVHlwZXMudHMiLCJ3ZWJwYWNrOi8vYml0bWFrZS8uL3NyYy9jb3JlL1Vua25vd25UYXJnZXQudHMiLCJ3ZWJwYWNrOi8vYml0bWFrZS8uL3NyYy9jb3JlL1VzZXJDb250ZXh0LnRzIiwid2VicGFjazovL2JpdG1ha2UvLi9zcmMvY3h4L2luZGV4LnRzIiwid2VicGFjazovL2JpdG1ha2UvLi9zcmMvbG9nZ2VyL2luZGV4LnRzIiwid2VicGFjazovL2JpdG1ha2UvLi9zcmMvdXRpbHMvQ2hpbGRQcm9jZXNzLnRzIiwid2VicGFjazovL2JpdG1ha2UvLi9zcmMvdXRpbHMvRmlsZVN5c3RlbS50cyIsIndlYnBhY2s6Ly9iaXRtYWtlLy4vc3JjL3V0aWxzL0h0dHBSZXF1ZXN0LnRzIiwid2VicGFjazovL2JpdG1ha2UvLi9zcmMvdXRpbHMvSW1wb3J0TW9kdWxlLm1qcyIsIndlYnBhY2s6Ly9iaXRtYWtlLy4vc3JjL3V0aWxzL01ha2VQYXRjaC50cyIsIndlYnBhY2s6Ly9iaXRtYWtlLy4vc3JjL3V0aWxzL01vZHVsZS50cyIsIndlYnBhY2s6Ly9iaXRtYWtlLy4vc3JjL3V0aWxzL1ByaW1pdGl2ZXMudHMiLCJ3ZWJwYWNrOi8vYml0bWFrZS8uL3NyYy91dGlscy9TZXR0aW5nc1N0b3JhZ2UudHMiLCJ3ZWJwYWNrOi8vYml0bWFrZS8uL3NyYy91dGlscy9TdHJpY3RUeXBlLnRzIiwid2VicGFjazovL2JpdG1ha2UvZXh0ZXJuYWwgbm9kZS1jb21tb25qcyBcImh0dHBcIiIsIndlYnBhY2s6Ly9iaXRtYWtlL2V4dGVybmFsIG5vZGUtY29tbW9uanMgXCJodHRwc1wiIiwid2VicGFjazovL2JpdG1ha2UvZXh0ZXJuYWwgbm9kZS1jb21tb25qcyBcIm5vZGU6Y2hpbGRfcHJvY2Vzc1wiIiwid2VicGFjazovL2JpdG1ha2UvZXh0ZXJuYWwgbm9kZS1jb21tb25qcyBcIm5vZGU6ZnNcIiIsIndlYnBhY2s6Ly9iaXRtYWtlL2V4dGVybmFsIG5vZGUtY29tbW9uanMgXCJub2RlOm9zXCIiLCJ3ZWJwYWNrOi8vYml0bWFrZS9leHRlcm5hbCBub2RlLWNvbW1vbmpzIFwibm9kZTpwYXRoXCIiLCJ3ZWJwYWNrOi8vYml0bWFrZS9leHRlcm5hbCBub2RlLWNvbW1vbmpzIFwibm9kZTp1cmxcIiIsIndlYnBhY2s6Ly9iaXRtYWtlL3dlYnBhY2svYm9vdHN0cmFwIiwid2VicGFjazovL2JpdG1ha2Uvd2VicGFjay9ydW50aW1lL2NvbXBhdCBnZXQgZGVmYXVsdCBleHBvcnQiLCJ3ZWJwYWNrOi8vYml0bWFrZS93ZWJwYWNrL3J1bnRpbWUvZGVmaW5lIHByb3BlcnR5IGdldHRlcnMiLCJ3ZWJwYWNrOi8vYml0bWFrZS93ZWJwYWNrL3J1bnRpbWUvaGFzT3duUHJvcGVydHkgc2hvcnRoYW5kIiwid2VicGFjazovL2JpdG1ha2Uvd2VicGFjay9ydW50aW1lL21ha2UgbmFtZXNwYWNlIG9iamVjdCIsIndlYnBhY2s6Ly9iaXRtYWtlLy4vc3JjL2luZGV4LnRzIl0sInNvdXJjZXNDb250ZW50IjpbIihmdW5jdGlvbiB3ZWJwYWNrVW5pdmVyc2FsTW9kdWxlRGVmaW5pdGlvbihyb290LCBmYWN0b3J5KSB7XG5cdGlmKHR5cGVvZiBleHBvcnRzID09PSAnb2JqZWN0JyAmJiB0eXBlb2YgbW9kdWxlID09PSAnb2JqZWN0Jylcblx0XHRtb2R1bGUuZXhwb3J0cyA9IGZhY3RvcnkoKTtcblx0ZWxzZSBpZih0eXBlb2YgZGVmaW5lID09PSAnZnVuY3Rpb24nICYmIGRlZmluZS5hbWQpXG5cdFx0ZGVmaW5lKFtdLCBmYWN0b3J5KTtcblx0ZWxzZSBpZih0eXBlb2YgZXhwb3J0cyA9PT0gJ29iamVjdCcpXG5cdFx0ZXhwb3J0c1tcImJpdG1ha2VcIl0gPSBmYWN0b3J5KCk7XG5cdGVsc2Vcblx0XHRyb290W1wiYml0bWFrZVwiXSA9IGZhY3RvcnkoKTtcbn0pKGdsb2JhbCwgKCkgPT4ge1xucmV0dXJuICIsIi8qXG4gKiBNSVQgTGljZW5zZVxuICpcbiAqIENvcHlyaWdodCAoYykgMjAyNSAgWXVyaWkgWWFrdWJpbiAoeXVyaWkueWFrdWJpbkBnbWFpbC5jb20pXG4gKlxuICogUGVybWlzc2lvbiBpcyBncmFudGVkIHRvIHVzZSwgY29weSwgbW9kaWZ5LCBhbmQgZGlzdHJpYnV0ZSB0aGlzIHNvZnR3YXJlXG4gKiB1bmRlciB0aGUgTUlUIExpY2Vuc2UuIFNlZSBMSUNFTlNFIGZpbGUgZm9yIGRldGFpbHMuXG4gKi9cblxuaW1wb3J0IGZzIGZyb20gXCJub2RlOmZzXCI7XG5pbXBvcnQgcGF0aCBmcm9tIFwibm9kZTpwYXRoXCI7XG5pbXBvcnQgdXJsIGZyb20gXCJub2RlOnVybFwiO1xuXG5pbXBvcnQgY21ha2UgIGZyb20gXCJAL2NtYWtlXCI7XG5pbXBvcnQgeyBtYWtlUGF0Y2ggfSBmcm9tIFwiQC91dGlscy9NYWtlUGF0Y2hcIjtcbmltcG9ydCB7IHNhdmVJZkRpZmZlcmVudCwgZGlyZWN0b3J5RXhpc3RzLCBnZXRQYXRoU3RyaW5nIH0gZnJvbSBcIkAvdXRpbHMvRmlsZVN5c3RlbVwiO1xuaW1wb3J0IHsgU2V0dGluZ3NTdG9yYWdlIH0gZnJvbSBcIkAvdXRpbHMvU2V0dGluZ3NTdG9yYWdlXCI7XG5pbXBvcnQgeyBzcGF3bkFzeW5jIH0gZnJvbSBcIkAvdXRpbHMvQ2hpbGRQcm9jZXNzXCI7XG5pbXBvcnQgeyBtYWtlU2NyaXB0QWN0aW9uIH0gZnJvbSBcIkAvTWFrZVNjcmlwdEFjdGlvblwiO1xuaW1wb3J0IHsgYXJyYXlXcmFwcGVyLCBhc3NpZ25PYmplY3QgfSBmcm9tIFwiQC91dGlscy9QcmltaXRpdmVzXCI7XG5pbXBvcnQgeyBVU0VSX0NPTkZJRywgQlVJTERfU0VUVElOR1NfRklMRSwgUkVRVUVTVF9BVFRFTVBUUyB9IGZyb20gXCJAL0NvbnN0YW50c1wiO1xuaW1wb3J0IHsgcmVxdWlyZVJlc29sdmUgfSBmcm9tIFwiQC91dGlscy9Nb2R1bGVcIjtcbmltcG9ydCB7IHJlcXVlc3RHZXQgfSBmcm9tIFwiQC91dGlscy9IdHRwUmVxdWVzdFwiO1xuaW1wb3J0IHsgUnVuU2NyaXB0Q29udGV4dCwgUnVuU2NyaXB0T3B0aW9ucyB9IGZyb20gXCJAL1J1blNjcmlwdENvbnRleHRcIjtcbmltcG9ydCB7IGNyZWF0ZUxvZ2dlciB9IGZyb20gXCJAL2xvZ2dlclwiO1xuXG5pbXBvcnQgeyBmaWxlRXhpc3RzIH0gZnJvbSBcIkAvdXRpbHMvRmlsZVN5c3RlbVwiO1xuaW1wb3J0IHsgaW1wb3J0TW9kdWxlIH0gZnJvbSBcIkAvdXRpbHMvTW9kdWxlXCI7XG5cbmNvbnN0IGxvZ2dlciA9IGNyZWF0ZUxvZ2dlcihpbXBvcnQubWV0YS51cmwpO1xuXG5mdW5jdGlvbiBtZXJnZUVudmlyb25tZW50KC4uLmFyZ3M6IGFueSkge1xuICBjb25zdCBlbnZpcm9ubWVudDogYW55ID0ge307XG4gIGZvciAoY29uc3QgZW52IG9mIGFyZ3MpIHtcbiAgICBjb25zdCBsaXN0OiBhbnkgPSBPYmplY3QuZW50cmllcyhlbnYgfHwge30pO1xuICAgIHdoaWxlIChsaXN0Lmxlbmd0aCkge1xuICAgICAgbGV0IFtrZXksdmFsXSA9IGxpc3QucG9wKCk7XG4gICAgICBsZXQgZGVsaW1pdGVyO1xuICAgICAgbGV0IGpvaW5BZnRlciA9IHRydWU7XG4gICAgICBzd2l0Y2ggKGtleSkge1xuICAgICAgY2FzZSBcIlBBVEhcIjpcbiAgICAgICAgZGVsaW1pdGVyID0gcGF0aC5kZWxpbWl0ZXI7XG4gICAgICAgIGpvaW5BZnRlciA9IGZhbHNlO1xuICAgICAgICBicmVhaztcbiAgICAgIGNhc2UgXCJDRkxBR1NcIjpcbiAgICAgIGNhc2UgXCJDWFhGTEFHU1wiOlxuICAgICAgY2FzZSBcIkxERkxBR1NcIjpcbiAgICAgICAgZGVsaW1pdGVyID0gXCIgXCI7XG4gICAgICAgIGJyZWFrO1xuICAgICAgfVxuICAgICAgaWYgKHR5cGVvZiB2YWwgPT09ICdudW1iZXInKVxuICAgICAgICB2YWwgPSB2YWwudG9TdHJpbmcoKTtcbiAgICAgIGVsc2UgaWYgKEFycmF5LmlzQXJyYXkodmFsKSlcbiAgICAgICAgdmFsID0gdmFsLmpvaW4oZGVsaW1pdGVyKTtcbiAgICAgIGlmICghZGVsaW1pdGVyIHx8ICFlbnZpcm9ubWVudFtrZXldKVxuICAgICAgICBlbnZpcm9ubWVudFtrZXldID0gdmFsO1xuICAgICAgZWxzZSBpZiAoam9pbkFmdGVyKVxuICAgICAgICBlbnZpcm9ubWVudFtrZXldID0gdmFsICsgZGVsaW1pdGVyICsgZW52aXJvbm1lbnRba2V5XTtcbiAgICAgIGVsc2VcbiAgICAgICAgZW52aXJvbm1lbnRba2V5XSA9IGVudmlyb25tZW50W2tleV0gKyBkZWxpbWl0ZXIgKyB2YWw7XG4gICAgfVxuICB9XG4gIHJldHVybiBlbnZpcm9ubWVudDtcbn1cblxuZnVuY3Rpb24gcmViYXNlQ29uZmlnKGNvbmZpZzogYW55KSB7XG4gIGNvbnN0IGJhc2VDb25maWc6IGFueSA9IHt9O1xuICBjb25zdCBvdGhlckNvbmZpZzogYW55ID0ge307XG5cbiAgZm9yIChjb25zdCBba2V5LCBlbnRyeV0gb2YgT2JqZWN0LmVudHJpZXMoY29uZmlnKSBhcyBhbnkpIHtcbiAgICAoZW50cnkuYmFzZSA/IG90aGVyQ29uZmlnIDogYmFzZUNvbmZpZylba2V5XSA9IGVudHJ5O1xuICB9XG5cbiAgd2hpbGUgKHRydWUpIHtcbiAgICBjb25zdCBrZXlzID0gT2JqZWN0LmtleXMob3RoZXJDb25maWcpO1xuICAgIGlmIChrZXlzLmxlbmd0aCA9PSAwKVxuICAgICAgYnJlYWs7XG4gICAgY29uc3QgZG9uZUtleXMgPSBbXTtcbiAgICBmb3IgKGNvbnN0IGtleSBvZiBrZXlzKSB7XG4gICAgICBjb25zdCBvdGhlckl0ZXIgPSBvdGhlckNvbmZpZ1trZXldO1xuICAgICAgY29uc3QgYmFzZUxpc3QgPSBbXTtcbiAgICAgIGZvciAoY29uc3QgaXRlciBvZiBhcnJheVdyYXBwZXIob3RoZXJJdGVyLmJhc2UpKSB7XG4gICAgICAgIGNvbnN0IGJhc2VFbnRyeSA9IGJhc2VDb25maWdbaXRlcl07XG4gICAgICAgIGlmICghYmFzZUVudHJ5KSB7XG4gICAgICAgICAgYmFzZUxpc3QubGVuZ3RoID0gMDtcbiAgICAgICAgICBicmVhaztcbiAgICAgICAgfVxuICAgICAgICBiYXNlTGlzdC5wdXNoKGJhc2VFbnRyeSk7XG4gICAgICB9XG4gICAgICBpZiAoYmFzZUxpc3QubGVuZ3RoKSB7XG4gICAgICAgIGJhc2VMaXN0LnB1c2gob3RoZXJJdGVyKTtcbiAgICAgICAgbGV0IG5ld0VudHJ5ID0ge307XG4gICAgICAgIGZvciAoY29uc3QgaXRlciBvZiBiYXNlTGlzdCkge1xuICAgICAgICAgIGFzc2lnbk9iamVjdChuZXdFbnRyeSwgaXRlcik7XG4gICAgICAgIH1cbiAgICAgICAgYmFzZUNvbmZpZ1trZXldID0gbmV3RW50cnk7XG4gICAgICAgIGRvbmVLZXlzLnB1c2goa2V5KTtcbiAgICAgIH1cbiAgICB9XG4gICAgaWYgKGRvbmVLZXlzLmxlbmd0aCA9PSAwKSB7XG4gICAgICBmb3IgKGNvbnN0IGtleSBvZiBrZXlzKVxuICAgICAgICB0aHJvdyBgQ2FuJ3Qgc2V0IGJhc2UgY29uZmlnIGZvciBcIiR7a2V5fWA7XG4gICAgfVxuICAgIGZvciAoY29uc3Qga2V5IG9mIGRvbmVLZXlzKSB7XG4gICAgICBkZWxldGUgYmFzZUNvbmZpZ1trZXldLmJhc2U7XG4gICAgICBkZWxldGUgb3RoZXJDb25maWdba2V5XTtcbiAgICB9XG4gIH1cblxuICByZXR1cm4gYmFzZUNvbmZpZztcbn1cblxuZnVuY3Rpb24gcmVzb2x2ZVN0cmluZ1dpdGhWYXJpYWJsZShjb25maWc6IGFueSwgZW50cnlDb25maWc6IGFueSwgcm9vdENvbmZpZzogYW55LCB2YWw6IGFueSkge1xuICByZXR1cm4gdmFsLnJlcGxhY2UoL1xcJFxceyhbXn1dKylcXH0vZywgKG1hdGNoOiBhbnksIHZhbHVlOiBhbnkpID0+IHtcbiAgICBsZXQgc2VsO1xuICAgIGZvciAoY29uc3QgbmFtZSBvZiB2YWx1ZS5zcGxpdChcIi5cIikpIHtcbiAgICAgIGlmIChzZWwgPT09IHVuZGVmaW5lZCkge1xuICAgICAgICBpZiAoY29uZmlnLmhhc093blByb3BlcnR5KG5hbWUpKSB7XG4gICAgICAgICAgc2VsID0gY29uZmlnW25hbWVdO1xuICAgICAgICB9XG4gICAgICAgIGVsc2UgaWYgKGNvbmZpZyAhPT0gZW50cnlDb25maWcgJiYgZW50cnlDb25maWcuaGFzT3duUHJvcGVydHkobmFtZSkpIHtcbiAgICAgICAgICBzZWwgPSBlbnRyeUNvbmZpZ1tuYW1lXTtcbiAgICAgICAgfVxuICAgICAgICBlbHNlIGlmIChjb25maWcgIT09IHJvb3RDb25maWcgJiYgcm9vdENvbmZpZy5oYXNPd25Qcm9wZXJ0eShuYW1lKSkge1xuICAgICAgICAgIHNlbCA9IHJvb3RDb25maWdbbmFtZV07XG4gICAgICAgIH1cbiAgICAgICAgZWxzZSB7XG4gICAgICAgICAgdHJ5IHtcbiAgICAgICAgICAgIGNvbnN0IG1haW5GaWxlID0gcmVxdWlyZVJlc29sdmUobmFtZSk7XG4gICAgICAgICAgICBpZiAobWFpbkZpbGUpIHtcbiAgICAgICAgICAgICAgc2VsID0geyBtYWluRmlsZSwgbWFpbkRpcjogcGF0aC5wb3NpeC5kaXJuYW1lKG1haW5GaWxlKSwgfTtcbiAgICAgICAgICAgIH1cbiAgICAgICAgICB9IGNhdGNoKGUpIHt9XG4gICAgICAgIH1cbiAgICAgICAgaWYgKHNlbCA9PT0gdW5kZWZpbmVkKVxuICAgICAgICAgIGJyZWFrO1xuICAgICAgfVxuICAgICAgZWxzZSBpZiAoc2VsLmhhc093blByb3BlcnR5KG5hbWUpKSB7XG4gICAgICAgIHNlbCA9IHNlbFtuYW1lXTtcbiAgICAgIH1cbiAgICAgIGVsc2Uge1xuICAgICAgICBzZWwgPSB1bmRlZmluZWQ7XG4gICAgICAgIGJyZWFrO1xuICAgICAgfVxuICAgIH1cbiAgICBpZiAoc2VsID09PSB1bmRlZmluZWQpXG4gICAgICB0aHJvdyBuZXcgRXJyb3IoYFRoZSAke3ZhbHVlfSB2YXJpYWJsZSBkb2VzIG5vdCBleGlzdFwiYCk7XG4gICAgcmV0dXJuIHNlbDtcbiAgfSk7XG59XG5cbmZ1bmN0aW9uIHJlc29sdmVDb25maWdTdHJpbmdzSW1wbChjb25maWc6IGFueSwgZW50cnlDb25maWc6IGFueSwgcm9vdENvbmZpZzogYW55KSB7XG4gIGxldCBjb3VudCA9IDA7XG4gIGZvciAoY29uc3QgW2tleSwgdmFsXSBvZiBPYmplY3QuZW50cmllcyhjb25maWcpKSB7XG4gICAgaWYgKHZhbCAmJiB0eXBlb2YgdmFsID09PSBcIm9iamVjdFwiKVxuICAgICAgY291bnQgKz0gcmVzb2x2ZUNvbmZpZ1N0cmluZ3NJbXBsKHZhbCwgZW50cnlDb25maWcsIHJvb3RDb25maWcpO1xuICAgIGVsc2UgaWYgKHR5cGVvZiB2YWwgPT09IFwic3RyaW5nXCIpIHtcbiAgICAgIGNvbnN0IHYgPSByZXNvbHZlU3RyaW5nV2l0aFZhcmlhYmxlKGNvbmZpZywgZW50cnlDb25maWcsIHJvb3RDb25maWcsIHZhbCk7XG4gICAgICBpZiAodmFsICE9PSB2KSB7XG4gICAgICAgIGNvbmZpZ1trZXldID0gdjtcbiAgICAgICAgY291bnQrKztcbiAgICAgIH1cbiAgICB9XG4gIH1cbiAgcmV0dXJuIGNvdW50O1xufVxuXG5mdW5jdGlvbiByZXNvbHZlQ29uZmlnU3RyaW5ncyhjb25maWc6IGFueSkge1xuICBmb3IgKDs7KSB7XG4gICAgbGV0IGNvdW50ID0gMDtcbiAgICBmb3IgKGNvbnN0IFtrZXksIHZhbF0gb2YgT2JqZWN0LmVudHJpZXMoY29uZmlnKSkge1xuICAgICAgaWYgKHZhbCAmJiB0eXBlb2YgdmFsID09PSBcIm9iamVjdFwiKVxuICAgICAgICBjb3VudCArPSByZXNvbHZlQ29uZmlnU3RyaW5nc0ltcGwodmFsLCB2YWwsIGNvbmZpZyk7XG4gICAgICBlbHNlICBpZiAodHlwZW9mIHZhbCA9PT0gXCJzdHJpbmdcIikge1xuICAgICAgICBjb25zdCB2ID0gcmVzb2x2ZVN0cmluZ1dpdGhWYXJpYWJsZShjb25maWcsIGNvbmZpZywgY29uZmlnLCB2YWwpO1xuICAgICAgICBpZiAodmFsICE9PSB2KSB7XG4gICAgICAgICAgY29uZmlnW2tleV0gPSB2O1xuICAgICAgICAgIGNvdW50Kys7XG4gICAgICAgIH1cbiAgICAgIH1cbiAgICB9XG4gICAgaWYgKCFjb3VudClcbiAgICAgIGJyZWFrO1xuICB9XG59XG5cbmZ1bmN0aW9uIG1ha2VCdWlsZENvbmZpZyhjdHg6IGFueSwgY29uZmlnOiBhbnkpIHtcbiAgZm9yIChjb25zdCBrZXkgb2YgWyBcInNvdXJjZVJvb3RcIiwgXCJ3YXNtdXhEaXJcIiBdKSB7XG4gICAgaWYgKGNvbmZpZ1trZXldKSB7XG4gICAgICB0aHJvdyBuZXcgRXJyb3IoYFRoZSAke2tleX0gdmFyaWFibGUgY2Fubm90IGJlIGNoYW5nZWQgdG8gXCIke2NvbmZpZy5zb3VyY2VSb290fVwiYCk7XG4gICAgfVxuICB9XG5cbiAgY29uc3Qgcm9vdENvbmZpZyA9IHJlYmFzZUNvbmZpZyhjb25maWcpO1xuXG4gIHJvb3RDb25maWcuYnVpbGRUeXBlID0gcm9vdENvbmZpZy5idWlsZFR5cGUgfHwgY3R4LmJ1aWxkVHlwZTtcbiAgcm9vdENvbmZpZy5zb3VyY2VSb290ID0gcm9vdENvbmZpZy5zb3VyY2VSb290IHx8IGN0eC53b3JrRGlyO1xuICByb290Q29uZmlnLmJpbmFyeVJvb3QgPSByb290Q29uZmlnLmJpbmFyeVJvb3QgfHwgcGF0aC5wb3NpeC5yZXNvbHZlKGN0eC53b3JrRGlyLFwiYnVpbGRcIik7XG5cbiAgZm9yIChjb25zdCBba2V5LCBlbnRyeV0gb2YgT2JqZWN0LmVudHJpZXMocm9vdENvbmZpZykgYXMgYW55KSB7XG4gICAgaWYgKGVudHJ5ICYmIHR5cGVvZiBlbnRyeSA9PT0gXCJvYmplY3RcIiAmJiBlbnRyeS5hY3Rpb24pIHtcbiAgICAgIGVudHJ5LmJ1aWxkVHlwZSA9IGVudHJ5LmJ1aWxkVHlwZSB8fCByb290Q29uZmlnLmJ1aWxkVHlwZTtcbiAgICAgIGNvbnN0IGZvbGRlciA9IGtleS5yZXBsYWNlKFwiOlwiLCBwYXRoLnBvc2l4LnNlcCk7XG4gICAgICBjb25zdCB3b3JrRGlyID0gcGF0aC5wb3NpeC5qb2luKHJvb3RDb25maWcuYmluYXJ5Um9vdCwgZm9sZGVyKTtcbiAgICAgIGVudHJ5LnRlbXBEaXIgPSBlbnRyeS50ZW1wRGlyIHx8IHBhdGgucG9zaXguam9pbih3b3JrRGlyLCBcInRtcFwiKTtcbiAgICAgIGlmIChlbnRyeS5zb3VyY2VVcmwpIHtcbiAgICAgICAgZW50cnkuYXJjaGl2ZURpciA9IGVudHJ5LmFyY2hpdmVEaXIgfHwgcGF0aC5wb3NpeC5qb2luKHdvcmtEaXIsIFwiYXJjXCIpO1xuICAgICAgICBlbnRyeS5leHRyYWN0RGlyID0gZW50cnkuZXh0cmFjdERpciB8fCBwYXRoLnBvc2l4LmpvaW4od29ya0RpciwgXCJzcmNcIik7XG4gICAgICAgIGlmICghZW50cnkuc291cmNlRGlyKVxuICAgICAgICAgIGVudHJ5LnNvdXJjZURpciA9IGVudHJ5LmV4dHJhY3REaXI7XG4gICAgICAgIGVsc2UgaWYgKCFwYXRoLmlzQWJzb2x1dGUoZW50cnkuc291cmNlRGlyKSlcbiAgICAgICAgICBlbnRyeS5zb3VyY2VEaXIgPSBwYXRoLnBvc2l4LmpvaW4oZW50cnkuZXh0cmFjdERpciwgZW50cnkuc291cmNlRGlyKTtcbiAgICAgIH1cbiAgICAgIGVsc2UgaWYgKCFlbnRyeS5zb3VyY2VEaXIpIHtcbiAgICAgICAgdGhyb3cgbmV3IEVycm9yKGBNaXNzaW5nIHNvdXJjZURpciBmb3IgJHtrZXl9IGFjdGlvblwiYCk7XG4gICAgICB9XG4gICAgICBpZiAoZW50cnkuYmluYXJ5RGlyID09PSBudWxsKVxuICAgICAgICBlbnRyeS5iaW5hcnlEaXIgPSBlbnRyeS5zb3VyY2VEaXI7XG4gICAgICBlbHNlIGlmIChlbnRyeS5iaW5hcnlEaXIgPT09IHVuZGVmaW5lZClcbiAgICAgICAgZW50cnkuYmluYXJ5RGlyID0gcGF0aC5wb3NpeC5qb2luKHdvcmtEaXIsIFwiYmluXCIpO1xuICAgIH1cbiAgfVxuXG4gIHJlc29sdmVDb25maWdTdHJpbmdzKHJvb3RDb25maWcpO1xuXG4gIHJldHVybiByb290Q29uZmlnO1xufVxuXG5hc3luYyBmdW5jdGlvbiB0cnlSZXF1ZXN0R2V0KHNvdXJjZVVybDogc3RyaW5nLCBhcmNGaWxlOiBzdHJpbmcsIGF0dGVtcHRzOiBudW1iZXIpIHtcbiAgZm9yKDs7KSB7XG4gICAgdHJ5IHtcbiAgICAgIGNvbnN0IGJ1ZmZlciA9IGF3YWl0IHJlcXVlc3RHZXQoc291cmNlVXJsKTtcbiAgICAgIGF3YWl0IGZzLnByb21pc2VzLndyaXRlRmlsZShhcmNGaWxlLCBidWZmZXIpO1xuICAgICAgcmV0dXJuO1xuICAgIH1cbiAgICBjYXRjaCAoZSkge1xuICAgICAgaWYgKC0tYXR0ZW1wdHMgPCAwKSB7XG4gICAgICAgIHRocm93IGU7XG4gICAgICB9XG4gICAgICBjb25zb2xlLndhcm4oZSk7XG4gICAgfVxuICB9XG59XG5cbmFzeW5jIGZ1bmN0aW9uIGRvRXh0cmFjdEFyY2hpdmUoY3R4OiBSdW5TY3JpcHRDb250ZXh0LCBlbnZpcm9ubWVudDogYW55LCBjb25maWc6IGFueSwgc2V0dGluZ3M6IGFueSlcbntcbiAgaWYgKCFjb25maWcuc291cmNlVXJsKVxuICAgIHRocm93IG5ldyBFcnJvcihcIlVua25vd24gc291cmNlVXJsXCIpO1xuICBpZiAoIWNvbmZpZy5hcmNoaXZlRGlyKVxuICAgIHRocm93IG5ldyBFcnJvcihcIlVua25vd24gYXJjaGl2ZURpclwiKTtcbiAgaWYgKCFjb25maWcuZXh0cmFjdERpcilcbiAgICB0aHJvdyBuZXcgRXJyb3IoXCJVbmtub3duIGV4dHJhY3REaXJcIik7XG5cbiAgaWYgKCFhd2FpdCBkaXJlY3RvcnlFeGlzdHMoY29uZmlnLmFyY2hpdmVEaXIpKSB7XG4gICAgY29uc29sZS5sb2coYG1rZGlyIC1wICR7Y29uZmlnLmFyY2hpdmVEaXJ9YCk7XG4gICAgYXdhaXQgZnMucHJvbWlzZXMubWtkaXIoY29uZmlnLmFyY2hpdmVEaXIsIHsgcmVjdXJzaXZlOiB0cnVlIH0pO1xuICB9XG5cbiAgaWYgKCFhd2FpdCBkaXJlY3RvcnlFeGlzdHMoY29uZmlnLnRlbXBEaXIpKSB7XG4gICAgY29uc29sZS5sb2coYG1rZGlyIC1wICR7Y29uZmlnLnRlbXBEaXJ9YCk7XG4gICAgYXdhaXQgZnMucHJvbWlzZXMubWtkaXIoY29uZmlnLnRlbXBEaXIsIHsgcmVjdXJzaXZlOiB0cnVlIH0pO1xuICB9XG5cbiAgY29uc3QgYXJjTmFtZSA9IHBhdGguYmFzZW5hbWUoY29uZmlnLnNvdXJjZVVybCk7XG5cbiAgbGV0IGFyY0ZpbGU7XG4gIGxldCBkb3dubG9hZFVybHMgPSBhd2FpdCBzZXR0aW5ncy5nZXQoXCJkb3dubG9hZFVybHNcIikgfHwge307XG4gIGlmIChkb3dubG9hZFVybHNbY29uZmlnLnNvdXJjZVVybF0pXG4gICAgYXJjRmlsZSA9IGRvd25sb2FkVXJsc1tjb25maWcuc291cmNlVXJsXTtcbiAgZWxzZSB7XG4gICAgYXJjRmlsZSA9IHBhdGguam9pbihjb25maWcuYXJjaGl2ZURpciwgYXJjTmFtZSk7XG4gICAgYXdhaXQgdHJ5UmVxdWVzdEdldChjb25maWcuc291cmNlVXJsLCBhcmNGaWxlLCBSRVFVRVNUX0FUVEVNUFRTKTtcbiAgICBkb3dubG9hZFVybHNbY29uZmlnLnNvdXJjZVVybF0gPSBhcmNGaWxlO1xuICAgIGF3YWl0IHNldHRpbmdzLnNldChcImRvd25sb2FkVXJsc1wiLCBkb3dubG9hZFVybHMpO1xuICB9XG5cbiAgbGV0IGV4dHJhY3REaXI7XG4gIGxldCBleHRyYWN0RmlsZXMgPSBhd2FpdCBzZXR0aW5ncy5nZXQoXCJleHRyYWN0RmlsZXNcIikgfHwge307XG4gIGlmIChleHRyYWN0RmlsZXNbYXJjRmlsZV0pIHtcbiAgICBleHRyYWN0RGlyID0gZXh0cmFjdEZpbGVzW2FyY0ZpbGVdO1xuICB9XG4gIGVsc2Uge1xuICAgIGV4dHJhY3REaXIgPSBhd2FpdCBmcy5wcm9taXNlcy5ta2R0ZW1wKHBhdGgucmVzb2x2ZShjb25maWcudGVtcERpciwgYXJjTmFtZSArICcuJykpO1xuICBcbiAgICBhd2FpdCBjbWFrZS5leHRyYWN0KHtcbiAgICAgIGVudmlyb25tZW50LFxuICAgICAgZmlsZW5hbWU6IGFyY0ZpbGUsXG4gICAgICB3b3JrRGlyOiBleHRyYWN0RGlyLFxuICAgICAgbG9nRmlsZTogIHBhdGguam9pbihjb25maWcudGVtcERpciwgcGF0aC5iYXNlbmFtZShleHRyYWN0RGlyKSArIFwiLmxvZ1wiKSxcbiAgICB9KTtcbiAgXG4gICAgY29uc3QgZXh0cmFjdExpc3QgPSBhd2FpdCBmcy5wcm9taXNlcy5yZWFkZGlyKGV4dHJhY3REaXIpO1xuICAgIGlmIChleHRyYWN0TGlzdC5sZW5ndGggPT09IDEpIHtcbiAgICAgIGV4dHJhY3REaXIgPSBwYXRoLnJlc29sdmUoZXh0cmFjdERpciwgZXh0cmFjdExpc3RbMF0pO1xuICAgICAgaWYgKCFhd2FpdCBkaXJlY3RvcnlFeGlzdHMoZXh0cmFjdERpcikpIHtcbiAgICAgICAgY29uc29sZS5sb2coYHJtIC1mciAke2V4dHJhY3REaXJ9YCk7XG4gICAgICAgIGF3YWl0IGZzLnByb21pc2VzLnJtKGV4dHJhY3REaXIsIHsgcmVjdXJzaXZlOiB0cnVlIH0pO1xuICAgICAgICB0aHJvdyBuZXcgRXJyb3IoYFN1cHBvcnQgb25seSBkaXJlY3RvcnkgZm9yIGFyY2hpdmVgKTtcbiAgICAgIH1cbiAgICB9XG4gIFxuICAgIGlmIChhd2FpdCBkaXJlY3RvcnlFeGlzdHMoY29uZmlnLmV4dHJhY3REaXIpKSB7XG4gICAgICAvLyBUT0RPOiBNYXJnZSBleHRyYWN0RGlyIHdpdGggb3V0cHV0XG4gICAgICBjb25zb2xlLmxvZyhgcm0gLWZyICR7Y29uZmlnLmV4dHJhY3REaXJ9YCk7XG4gICAgICBhd2FpdCBmcy5wcm9taXNlcy5ybShjb25maWcuZXh0cmFjdERpciwgeyByZWN1cnNpdmU6IHRydWUgfSk7XG4gICAgfVxuICAgIGVsc2Uge1xuICAgICAgY29uc3QgcGFyZW50RGlyID0gcGF0aC5kaXJuYW1lKGNvbmZpZy5leHRyYWN0RGlyKTtcbiAgICAgIGlmICghYXdhaXQgZGlyZWN0b3J5RXhpc3RzKHBhcmVudERpcikpIHtcbiAgICAgICAgY29uc29sZS5sb2coYG1rZGlyIC1wICR7cGFyZW50RGlyfWApO1xuICAgICAgICBhd2FpdCBmcy5wcm9taXNlcy5ta2RpcihwYXJlbnREaXIsIHsgcmVjdXJzaXZlOiB0cnVlIH0pOyBcbiAgICAgIH1cbiAgICB9XG4gIFxuICAgIGNvbnNvbGUubG9nKGBtdiAke2V4dHJhY3REaXJ9ICR7Y29uZmlnLmV4dHJhY3REaXJ9YCk7XG4gICAgYXdhaXQgZnMucHJvbWlzZXMucmVuYW1lKGV4dHJhY3REaXIsIGNvbmZpZy5leHRyYWN0RGlyKTtcbiAgXG4gICAgZXh0cmFjdEZpbGVzW2FyY0ZpbGVdID0gZXh0cmFjdERpcjtcbiAgICBhd2FpdCBzZXR0aW5ncy5zZXQoXCJleHRyYWN0RmlsZXNcIiwgZXh0cmFjdEZpbGVzKTtcbiAgfVxuXG4gIGlmIChjb25maWcucGF0Y2hEaXIpIHtcbiAgICBsZXQgcGF0Y2hEaXJzID0gYXdhaXQgc2V0dGluZ3MuZ2V0KFwicGF0Y2hEaXJzXCIpIHx8IHt9O1xuICAgIGlmICghcGF0Y2hEaXJzW2NvbmZpZy5wYXRjaERpcl0pIHtcbiAgICAgIGF3YWl0IG1ha2VQYXRjaChjb25maWcucGF0Y2hEaXIsIGNvbmZpZy5leHRyYWN0RGlyKTtcbiAgICAgIHBhdGNoRGlyc1tjb25maWcucGF0Y2hEaXJdID0gY29uZmlnLmV4dHJhY3REaXI7XG4gICAgICBhd2FpdCBzZXR0aW5ncy5zZXQoXCJwYXRjaERpcnNcIiwgcGF0Y2hEaXJzKTtcbiAgICB9XG4gIH1cbn1cblxuY29uc3QgYWN0aW9uSGFuZGxlcnM6IGFueSA9IHtcbiAgbm9uZTogYXN5bmMgKGNvbmZpZzogYW55LCBlbnZpcm9ubWVudDogYW55LCBzZXR0aW5nczogYW55KSA9PiB7XG4gICAgLyogZG8gbm90aGluZyAqL1xuICB9LFxuICBjbWFrZTogYXN5bmMgKGNvbmZpZzogYW55LCBlbnZpcm9ubWVudDogYW55LCBzZXR0aW5nczogYW55KSA9PiB7XG4gICAgY29uc3Qgc291cmNlRGlyID0gZ2V0UGF0aFN0cmluZyhjb25maWcuc291cmNlRGlyKTtcbiAgICBjb25zdCBiaW5hcnlEaXIgPSBnZXRQYXRoU3RyaW5nKGNvbmZpZy5iaW5hcnlEaXIpO1xuICAgIGNvbnN0IGNtYWtlQXJncyA9IHtcbiAgICAgIGVudmlyb25tZW50OiB7XG4gICAgICAgIC4uLmVudmlyb25tZW50LFxuICAgICAgICBERVNURElSOiBjb25maWcuZGVzdERpcixcbiAgICAgIH0sXG4gICAgICBnZW5lcmF0b3I6IGNvbmZpZy5nZW5lcmF0b3IgfHwgY21ha2UuREVGQVVMVF9HRU5FUkFUT1IsXG4gICAgICBjYWNoZVZhcmlhYmxlczogY29uZmlnLmNhY2hlVmFyaWFibGVzLFxuICAgICAgc291cmNlRGlyLFxuICAgICAgYmluYXJ5RGlyLFxuICAgIH07XG5cbiAgICBpZiAoIWNtYWtlQXJncy5jYWNoZVZhcmlhYmxlcy5DTUFLRV9CVUlMRF9UWVBFKSB7XG4gICAgICBjbWFrZUFyZ3MuY2FjaGVWYXJpYWJsZXMuQ01BS0VfQlVJTERfVFlQRSA9IGNvbmZpZy5idWlsZFR5cGU7XG4gICAgfVxuXG4gICAgYXdhaXQgY21ha2UuY29uZmlndXJlKGNtYWtlQXJncyk7XG4gICAgYXdhaXQgY21ha2UuYnVpbGQoY21ha2VBcmdzKTtcbiAgICBhd2FpdCBjbWFrZS5pbnN0YWxsKGNtYWtlQXJncyk7XG4gIH0sXG4gIGNvbmZpZ3VyZTogYXN5bmMgKGNvbmZpZzogYW55LCBlbnZpcm9ubWVudDogYW55LCBzZXR0aW5nczogYW55KSA9PiB7XG4gICAgY29uc3Qgc291cmNlRGlyID0gZ2V0UGF0aFN0cmluZyhjb25maWcuc291cmNlRGlyKTtcbiAgICBjb25zdCBiaW5hcnlEaXIgPSBnZXRQYXRoU3RyaW5nKGNvbmZpZy5iaW5hcnlEaXIpO1xuICAgIGxldCBzdGVwID0gYXdhaXQgc2V0dGluZ3MuZ2V0KFwiY29uZmlndXJlXCIpIHx8IFwiY29uZmlnXCI7XG4gICAgaWYgKHN0ZXAgPT09IFwiY29uZmlnXCIpIHtcbiAgICAgIGNvbnN0IGNvbW1hbmQgPSBwYXRoLnJlc29sdmUoc291cmNlRGlyLCBcImNvbmZpZ3VyZVwiKTtcbiAgICAgIGNvbnN0IHBhcmFtcyA9IFtdO1xuICAgICAgaWYgKEFycmF5LmlzQXJyYXkoY29uZmlnLnZhcmlhYmxlcykpIHtcbiAgICAgICAgZm9yIChjb25zdCBpdGVyIG9mIGNvbmZpZy52YXJpYWJsZXMpXG4gICAgICAgICAgcGFyYW1zLnB1c2goaXRlcik7XG4gICAgICB9XG4gICAgICBlbHNlIGlmIChjb25maWcudmFyaWFibGVzKSB7XG4gICAgICAgIGZvciAoY29uc3QgW2tleSx2YWxdIG9mIE9iamVjdC5lbnRyaWVzKGNvbmZpZy52YXJpYWJsZXMpKSB7XG4gICAgICAgICAgaWYgKGtleSA9PT0gXCJmZWF0dXJlc1wiICYmIEFycmF5LmlzQXJyYXkodmFsKSkge1xuICAgICAgICAgICAgZm9yIChjb25zdCBpdGVyIG9mIHZhbClcbiAgICAgICAgICAgICAgcGFyYW1zLnB1c2goYC0tJHtpdGVyfWApO1xuICAgICAgICAgIH1cbiAgICAgICAgICBlbHNlIGlmICh2YWwgPT09IG51bGwpXG4gICAgICAgICAgICBwYXJhbXMucHVzaChgLS0ke2tleX1gKTtcbiAgICAgICAgICBlbHNlXG4gICAgICAgICAgICBwYXJhbXMucHVzaChgLS0ke2tleX09JHt2YWx9YCk7XG4gICAgICAgIH1cbiAgICAgIH1cbiAgICAgIGlmIChjb25maWcuZmVhdHVyZXMpIHtcbiAgICAgICAgZm9yIChjb25zdCBrZXkgb2YgY29uZmlnLmZlYXR1cmVzKVxuICAgICAgICAgIHBhcmFtcy5wdXNoKGAtLSR7a2V5fWApO1xuICAgICAgfVxuICAgICAgY29uc3QgcmVzMSA9IGF3YWl0IHNwYXduQXN5bmMoY29tbWFuZCwgcGFyYW1zLCB7XG4gICAgICAgIGN3ZDogYmluYXJ5RGlyLFxuICAgICAgICBlbnY6IGVudmlyb25tZW50LFxuICAgICAgICBleHRyYToge1xuICAgICAgICAgIG91dHB1dDogYGFjLmNvbmZpZy5sb2dgLFxuICAgICAgICB9LFxuICAgICAgfSk7XG4gICAgICBpZiAocmVzMS5zdGF0dXMgIT09IDApIHtcbiAgICAgICAgdGhyb3cgbmV3IEVycm9yKGBjb25maWd1cmUgcmV0dXJuZWQgc3RhdHVzICR7cmVzMS5zdGF0dXN9YCk7XG4gICAgICB9XG4gICAgICBzdGVwID0gXCJpbnN0YWxsXCI7XG4gICAgICBhd2FpdCBzZXR0aW5ncy5zZXQoXCJjb25maWd1cmVcIiwgc3RlcCk7XG4gICAgfVxuICAgIGlmIChzdGVwID09PSBcImluc3RhbGxcIikge1xuICAgICAgY29uc3QgYXJncyA9IFsgJ2luc3RhbGwnIF07XG4gICAgICBpZiAoY29uZmlnLmRlc3REaXIpIHtcbiAgICAgICAgYXJncy5wdXNoKGBERVNURElSPSR7Y29uZmlnLmRlc3REaXJ9YCk7XG4gICAgICB9XG4gICAgICBjb25zdCByZXMyID0gYXdhaXQgc3Bhd25Bc3luYyhcIm1ha2VcIiwgYXJncywge1xuICAgICAgICBjd2Q6IGJpbmFyeURpcixcbiAgICAgICAgZW52OiBlbnZpcm9ubWVudCxcbiAgICAgICAgZXh0cmE6IHtcbiAgICAgICAgICBvdXRwdXQ6IGBhYy5idWlsZC5sb2dgLFxuICAgICAgICB9LFxuICAgICAgfSk7XG4gICAgICBpZiAocmVzMi5zdGF0dXMgIT09IDApIHtcbiAgICAgICAgdGhyb3cgbmV3IEVycm9yKGBtYWtlIHJldHVybmVkIHN0YXR1cyAke3JlczIuc3RhdHVzfWApO1xuICAgICAgfVxuICAgICAgc3RlcCA9IFwiZG9uZVwiO1xuICAgICAgYXdhaXQgc2V0dGluZ3Muc2V0KFwiY29uZmlndXJlXCIsIHN0ZXApO1xuICAgIH1cbiAgfSxcbiAgbWFrZTogYXN5bmMgKGNvbmZpZzogYW55LCBlbnZpcm9ubWVudDogYW55LCBzZXR0aW5nczogYW55KSA9PiB7XG4gICAgY29uc3QgYmluYXJ5RGlyID0gZ2V0UGF0aFN0cmluZyhjb25maWcuYmluYXJ5RGlyKTtcbiAgICBjb25zdCBhcmdzID0gY29uZmlnLmFyZ3MgfHwgW107XG4gICAgaWYgKGNvbmZpZy5kZXN0RGlyKSB7XG4gICAgICBhcmdzLnB1c2goYERFU1RESVI9JHtjb25maWcuZGVzdERpcn1gKTtcbiAgICB9XG4gICAgY29uc3QgcmVzMiA9IGF3YWl0IHNwYXduQXN5bmMoXCJtYWtlXCIsIGFyZ3MsIHtcbiAgICAgIGN3ZDogYmluYXJ5RGlyLFxuICAgICAgZW52OiBlbnZpcm9ubWVudCxcbiAgICAgIGV4dHJhOiB7XG4gICAgICAgIG91dHB1dDogYG1ha2UubG9nYCxcbiAgICAgIH0sXG4gICAgfSk7XG4gICAgaWYgKHJlczIuc3RhdHVzICE9PSAwKSB7XG4gICAgICB0aHJvdyBuZXcgRXJyb3IoYG1ha2UgcmV0dXJuZWQgc3RhdHVzICR7cmVzMi5zdGF0dXN9YCk7XG4gICAgfVxuICB9LFxuICBwcm9jZXNzOiBhc3luYyAoY29uZmlnOiBhbnksIGVudmlyb25tZW50OiBhbnksIHNldHRpbmdzOiBhbnkpID0+IHtcbiAgICBpZiAoIWNvbmZpZy5jb21tYW5kKVxuICAgICAgdGhyb3cgbmV3IEVycm9yKFwiUmVxdWlyZWQgY29tbWFuZCBmaWVsZCBmb3IgcHJvY2VzcyBhY3Rpb25cIik7XG4gICAgY29uc3Qgc291cmNlRGlyID0gZ2V0UGF0aFN0cmluZyhjb25maWcuc291cmNlRGlyKTtcbiAgICBjb25zdCBiaW5hcnlEaXIgPSBnZXRQYXRoU3RyaW5nKGNvbmZpZy5iaW5hcnlEaXIpO1xuICAgIGxldCB7IGNvbW1hbmQgfSA9IGNvbmZpZztcbiAgICBpZiAoIXBhdGguaXNBYnNvbHV0ZShjb21tYW5kKSAmJiAoY29tbWFuZC5pbmNsdWRlcyhwYXRoLnBvc2l4LmRlbGltaXRlcikgfHwgY29tbWFuZC5pbmNsdWRlcyhwYXRoLndpbjMyLmRlbGltaXRlcikpKSB7XG4gICAgICBjb21tYW5kID0gcGF0aC5yZXNvbHZlKHNvdXJjZURpciwgY29tbWFuZCk7XG4gICAgfVxuICAgIGNvbnN0IHJlcyA9IGF3YWl0IHNwYXduQXN5bmMoY29tbWFuZCwgY29uZmlnLmFyZ3MgfHwgW10sIHtcbiAgICAgIGN3ZDogYmluYXJ5RGlyLFxuICAgICAgZW52OiBlbnZpcm9ubWVudCxcbiAgICAgIGV4dHJhOiB7XG4gICAgICAgIG91dHB1dDogYHByb2Nlc3MubG9nYCxcbiAgICAgIH0sXG4gICAgfSk7XG4gICAgaWYgKHJlcy5zdGF0dXMgIT09IDApIHtcbiAgICAgIHRocm93IG5ldyBFcnJvcihgcHJvY2VzcyByZXR1cm5lZCBzdGF0dXMgJHtyZXMuc3RhdHVzfWApO1xuICAgIH1cbiAgfSxcbiAgYml0bWFrZTogbWFrZVNjcmlwdEFjdGlvbixcbn07XG5cbmFzeW5jIGZ1bmN0aW9uIGRvVGFyZ2V0QnVpbGQoY3R4OiBSdW5TY3JpcHRDb250ZXh0LCBlbnZpcm9ubWVudDogYW55LCBjb25maWc6IGFueSwgc2V0dGluZ3M6IGFueSkge1xuICBpZiAoY29uZmlnLnByZUFjdGlvbikge1xuICAgIGF3YWl0IHNldHRpbmdzLnB1c2goXCJwcmVBY3Rpb25cIik7XG4gICAgY29uc3QgbmV3Q29uZmlnOiBhbnkgPSB7fTtcbiAgICBhc3NpZ25PYmplY3QobmV3Q29uZmlnLCBjb25maWcpO1xuICAgIGRlbGV0ZSBuZXdDb25maWcuYWN0aW9uO1xuICAgIGRlbGV0ZSBuZXdDb25maWcucHJlQWN0aW9uO1xuICAgIGRlbGV0ZSBuZXdDb25maWcucG9zdEFjdGlvbjtcbiAgICBhc3NpZ25PYmplY3QobmV3Q29uZmlnLCBjb25maWcucHJlQWN0aW9uKTtcbiAgICBjb25zdCBuZXdFbnZpcm9ubWVudCA9IG1lcmdlRW52aXJvbm1lbnQoY29uZmlnLnByZUFjdGlvbi5lbnZpcm9ubWVudCwgZW52aXJvbm1lbnQpO1xuICAgIGF3YWl0IGRvVGFyZ2V0QnVpbGQoY3R4LCBuZXdFbnZpcm9ubWVudCwgbmV3Q29uZmlnLCBzZXR0aW5ncyk7XG4gICAgYXdhaXQgc2V0dGluZ3MucG9wKCk7XG4gIH1cblxuICBpZiAoQXJyYXkuaXNBcnJheShjb25maWcuYWN0aW9uKSkge1xuICAgIGF3YWl0IHNldHRpbmdzLnB1c2goXCJhY3Rpb25cIik7XG4gICAgZm9yICh2YXIgaSA9IDA7IGkgPCBjb25maWcuYWN0aW9uLmxlbmd0aDsgKytpKSB7XG4gICAgICBhd2FpdCBzZXR0aW5ncy5wdXNoKGkpO1xuICAgICAgY29uc3QgbmV3Q29uZmlnOiBhbnkgPSB7fTtcbiAgICAgIGFzc2lnbk9iamVjdChuZXdDb25maWcsIGNvbmZpZyk7XG4gICAgICBkZWxldGUgbmV3Q29uZmlnLmFjdGlvbjtcbiAgICAgIGRlbGV0ZSBuZXdDb25maWcucHJlQWN0aW9uO1xuICAgICAgZGVsZXRlIG5ld0NvbmZpZy5wb3N0QWN0aW9uO1xuICAgICAgYXNzaWduT2JqZWN0KG5ld0NvbmZpZywgY29uZmlnLmFjdGlvbltpXSk7XG4gICAgICBjb25zdCBuZXdFbnZpcm9ubWVudCA9IG1lcmdlRW52aXJvbm1lbnQoY29uZmlnLmFjdGlvbltpXS5lbnZpcm9ubWVudCwgZW52aXJvbm1lbnQpO1xuICAgICAgYXdhaXQgZG9UYXJnZXRCdWlsZChjdHgsIG5ld0Vudmlyb25tZW50LCBuZXdDb25maWcsIHNldHRpbmdzKTtcbiAgICAgIGF3YWl0IHNldHRpbmdzLnBvcCgpO1xuICAgIH1cbiAgICBhd2FpdCBzZXR0aW5ncy5wb3AoKTtcbiAgfVxuICBlbHNlIHtcbiAgICBpZiAoIWF3YWl0IGRpcmVjdG9yeUV4aXN0cyhjb25maWcuYmluYXJ5RGlyKSkge1xuICAgICAgYXdhaXQgZnMucHJvbWlzZXMubWtkaXIoY29uZmlnLmJpbmFyeURpciwgeyByZWN1cnNpdmU6IHRydWUgfSk7XG4gICAgfVxuICAgIGlmIChhY3Rpb25IYW5kbGVyc1tjb25maWcuYWN0aW9uXSkge1xuICAgICAgY29uZmlnLmRlc2NyaXB0aW9uICYmIGNvbnNvbGUubG9nKGNvbmZpZy5kZXNjcmlwdGlvbik7XG4gICAgICBhd2FpdCBhY3Rpb25IYW5kbGVyc1tjb25maWcuYWN0aW9uXShjb25maWcsIGVudmlyb25tZW50LCBzZXR0aW5ncyk7XG4gICAgfVxuICB9XG5cbiAgaWYgKGNvbmZpZy5wb3N0QWN0aW9uKSB7XG4gICAgYXdhaXQgc2V0dGluZ3MucHVzaChcInBvc3RBY3Rpb25cIik7XG4gICAgY29uc3QgbmV3Q29uZmlnOiBhbnkgPSB7fTtcbiAgICBhc3NpZ25PYmplY3QobmV3Q29uZmlnLCBjb25maWcpO1xuICAgIGRlbGV0ZSBuZXdDb25maWcuYWN0aW9uO1xuICAgIGRlbGV0ZSBuZXdDb25maWcucHJlQWN0aW9uO1xuICAgIGRlbGV0ZSBuZXdDb25maWcucG9zdEFjdGlvbjtcbiAgICBhc3NpZ25PYmplY3QobmV3Q29uZmlnLCBjb25maWcucG9zdEFjdGlvbik7XG4gICAgY29uc3QgbmV3RW52aXJvbm1lbnQgPSBtZXJnZUVudmlyb25tZW50KGNvbmZpZy5wb3N0QWN0aW9uLmVudmlyb25tZW50LCBlbnZpcm9ubWVudCk7XG4gICAgYXdhaXQgZG9UYXJnZXRCdWlsZChjdHgsIG5ld0Vudmlyb25tZW50LCBuZXdDb25maWcsIHNldHRpbmdzKTtcbiAgICBhd2FpdCBzZXR0aW5ncy5wb3AoKTtcbiAgfVxufVxuXG5hc3luYyBmdW5jdGlvbiBnZXRVc2VyQ29uZmlnKG9wdGlvbnM6IFJ1blNjcmlwdE9wdGlvbnMpIHtcbiAgbGV0IGNvbmZpZ1BhdGg7XG4gIGlmIChvcHRpb25zLmVudi5jb25maWcpIHtcbiAgICBjb25maWdQYXRoID0gcGF0aC5pc0Fic29sdXRlKG9wdGlvbnMuZW52LmNvbmZpZykgPyBvcHRpb25zLmVudi5jb25maWcgOiBwYXRoLnJlc29sdmUob3B0aW9ucy53b3JrRGlyLCBvcHRpb25zLmVudi5jb25maWcpO1xuICAgIGlmICghYXdhaXQgZmlsZUV4aXN0cyhjb25maWdQYXRoKSlcbiAgICAgIHRocm93IGBDb25maWd1cmF0aW9uICcke29wdGlvbnMuZW52LmNvbmZpZ30nIGZpbGUgZG9lcyBub3QgZXhpc3RgO1xuICB9XG4gIGVsc2Uge1xuICAgIGNvbnN0IHVzZXJDb25maWdQYXRoID0gcGF0aC5yZXNvbHZlKG9wdGlvbnMud29ya0RpciwgVVNFUl9DT05GSUcpO1xuICAgIGlmIChhd2FpdCBmaWxlRXhpc3RzKHVzZXJDb25maWdQYXRoKSlcbiAgICAgIGNvbmZpZ1BhdGggPSB1c2VyQ29uZmlnUGF0aDtcbiAgICBlbHNlIHtcbiAgICAgIGxvZ2dlci53YXJuKGBDb25maWcgZmlsZSAnJHtVU0VSX0NPTkZJR30nIGlzIG5vdCBhdmFpbGFibGVgKTtcbiAgICB9XG4gIH1cblxuICBpZiAoIWNvbmZpZ1BhdGgpIHtcbiAgICByZXR1cm4ge1xuICAgICAgXCJidW5kbGU6b3V0cHV0XCI6IHtcbiAgICAgICAgYWN0aW9uOiBcImJpdG1ha2VcIixcbiAgICAgICAgdmFyaWFibGVzOiB7XG4gICAgICAgICAgSU5TVEFMTF9QUkVGSVg6IFwiL3VzclwiLFxuICAgICAgICB9LFxuICAgICAgICBzb3VyY2VEaXI6IFwiJHtzb3VyY2VSb290fVwiLFxuICAgICAgICBkZXN0RGlyOiBcIiR7YmluYXJ5Um9vdH0vb3V0cHV0XCIsXG4gICAgICB9XG4gICAgfTtcbiAgfVxuXG4gIGNvbnN0IGNvbmZpZ1VybCA9IHVybC5wYXRoVG9GaWxlVVJMKGNvbmZpZ1BhdGgpO1xuICBjb25zdCBjb25maWdNb2R1bGUgPSBhd2FpdCBpbXBvcnRNb2R1bGUoY29uZmlnVXJsKTtcbiAgc3dpdGNoICh0eXBlb2YgY29uZmlnTW9kdWxlLmRlZmF1bHQpIHtcbiAgY2FzZSBcImZ1bmN0aW9uXCI6XG4gICAgY29uc3QgdXNlckNvbmZpZyA9IGNvbmZpZ01vZHVsZS5kZWZhdWx0KG9wdGlvbnMuZW52LCB7fSk7XG4gICAgaWYgKHVzZXJDb25maWcgaW5zdGFuY2VvZiBQcm9taXNlKVxuICAgICAgcmV0dXJuIGF3YWl0IHVzZXJDb25maWc7XG4gICAgcmV0dXJuIHVzZXJDb25maWc7XG5cbiAgY2FzZSBcIm9iamVjdFwiOlxuICAgIHJldHVybiBjb25maWdNb2R1bGUuZGVmYXVsdDtcblxuICBkZWZhdWx0OlxuICAgIHRocm93IG5ldyBFcnJvcihgVW5rbm93biB1c2VyIGNvbmZpZ3VyYXRpb24gdHlwZWApO1xuICB9XG59XG5cbmV4cG9ydCBkZWZhdWx0IGFzeW5jIChvcHRpb25zOiBSdW5TY3JpcHRPcHRpb25zKSA9PiB7XG4gIGNvbnN0IGN0eCA9IG5ldyBSdW5TY3JpcHRDb250ZXh0KG9wdGlvbnMpO1xuICBjb25zdCB1c2VyQ29uZmlnID0gYXdhaXQgZ2V0VXNlckNvbmZpZyhvcHRpb25zKTtcbiAgY29uc3QgYnVpbGRDb25maWcgPSBtYWtlQnVpbGRDb25maWcoY3R4LCB1c2VyQ29uZmlnKTtcblxuICBpZiAoYnVpbGRDb25maWcuUkVDSVBFX0NPTlRFTlRfRklMRSkge1xuICAgIGNvbnN0IGpzb25Db25maWcgPSBKU09OLnN0cmluZ2lmeShidWlsZENvbmZpZywgbnVsbCwgMik7XG4gICAgYXdhaXQgc2F2ZUlmRGlmZmVyZW50KGJ1aWxkQ29uZmlnLlJFQ0lQRV9DT05URU5UX0ZJTEUsIGpzb25Db25maWcpO1xuICB9XG5cbiAgY29uc3Qgc2V0dGluZ3NGaWxlbmFtZSA9IHBhdGgucmVzb2x2ZShidWlsZENvbmZpZy5iaW5hcnlSb290LCBCVUlMRF9TRVRUSU5HU19GSUxFKTtcbiAgY29uc3Qgc2V0dGluZ3MgPSBuZXcgU2V0dGluZ3NTdG9yYWdlKHNldHRpbmdzRmlsZW5hbWUpO1xuXG4gIGZvciAoY29uc3QgW2tleSwgZW50cnldIG9mIE9iamVjdC5lbnRyaWVzKGJ1aWxkQ29uZmlnKSBhcyBhbnkpIHtcbiAgICBpZiAoZW50cnkgJiYgdHlwZW9mIGVudHJ5ID09PSBcIm9iamVjdFwiICYmIGVudHJ5LmFjdGlvbiAmJiAhZW50cnkuZGlzYWJsZWQpIHtcbiAgICAgIGF3YWl0IHNldHRpbmdzLnB1c2goa2V5KTtcbiAgICAgIGNvbnN0IGNvbXBsZXRlZCA9IGF3YWl0IHNldHRpbmdzLmdldChcImNvbXBsZXRlZFwiKTtcbiAgICAgIGlmIChlbnRyeS5yZWJ1aWxkIHx8ICFjb21wbGV0ZWQpIHtcbiAgICAgICAgbG9nZ2VyLmluZm8oYFN0YXJ0ZWQgYWN0aW9uOiAke2tleX1gKTtcbiAgICAgICAgY29uc3QgZW52aXJvbm1lbnQgPSBtZXJnZUVudmlyb25tZW50KGVudHJ5LmVudmlyb25tZW50LCBwcm9jZXNzLmVudik7XG4gICAgICAgIGlmIChlbnRyeS5zb3VyY2VVcmwpIHtcbiAgICAgICAgICBhd2FpdCBkb0V4dHJhY3RBcmNoaXZlKGN0eCwgZW52aXJvbm1lbnQsIGVudHJ5LCBzZXR0aW5ncyk7XG4gICAgICAgIH1cbiAgICAgICAgYXdhaXQgZG9UYXJnZXRCdWlsZChjdHgsIGVudmlyb25tZW50LCBlbnRyeSwgc2V0dGluZ3MpO1xuICAgICAgICBhd2FpdCBzZXR0aW5ncy5zZXQoXCJjb21wbGV0ZWRcIiwgdHJ1ZSk7XG4gICAgICAgIGxvZ2dlci5pbmZvKGBDb21wbGV0ZWQgYWN0aW9uOiAke2tleX1gKTtcbiAgICAgIH1cbiAgICAgIGF3YWl0IHNldHRpbmdzLnBvcCgpO1xuICAgIH1cbiAgfVxufVxuIiwiLypcbiAqIE1JVCBMaWNlbnNlXG4gKlxuICogQ29weXJpZ2h0IChjKSAyMDI1ICBZdXJpaSBZYWt1YmluICh5dXJpaS55YWt1YmluQGdtYWlsLmNvbSlcbiAqXG4gKiBQZXJtaXNzaW9uIGlzIGdyYW50ZWQgdG8gdXNlLCBjb3B5LCBtb2RpZnksIGFuZCBkaXN0cmlidXRlIHRoaXMgc29mdHdhcmVcbiAqIHVuZGVyIHRoZSBNSVQgTGljZW5zZS4gU2VlIExJQ0VOU0UgZmlsZSBmb3IgZGV0YWlscy5cbiAqL1xuXG5leHBvcnQgY29uc3QgVVNFUl9DT05GSUcgPSBcImJpdG1ha2UuY29uZmlnLm1qc1wiO1xuZXhwb3J0IGNvbnN0IFJFUVVFU1RfQVRURU1QVFMgPSAzMDtcbmV4cG9ydCBjb25zdCBCVUlMRF9TRVRUSU5HU19GSUxFID0gXCJCdWlsZFNldHRpbmdzLmpzb25cIjtcbmV4cG9ydCBjb25zdCBBTExfVEFSR0VUID0gXCJhbGxcIjtcbmV4cG9ydCBjb25zdCBJTlNUQUxMX1RBUkdFVCA9IFwiaW5zdGFsbFwiO1xuIiwiLypcbiAqIE1JVCBMaWNlbnNlXG4gKlxuICogQ29weXJpZ2h0IChjKSAyMDI1ICBZdXJpaSBZYWt1YmluICh5dXJpaS55YWt1YmluQGdtYWlsLmNvbSlcbiAqXG4gKiBQZXJtaXNzaW9uIGlzIGdyYW50ZWQgdG8gdXNlLCBjb3B5LCBtb2RpZnksIGFuZCBkaXN0cmlidXRlIHRoaXMgc29mdHdhcmVcbiAqIHVuZGVyIHRoZSBNSVQgTGljZW5zZS4gU2VlIExJQ0VOU0UgZmlsZSBmb3IgZGV0YWlscy5cbiAqL1xuXG5pbXBvcnQgZnMgZnJvbSBcIm5vZGU6ZnNcIjtcblxuaW1wb3J0IHsgZmlsZUV4aXN0cyB9IGZyb20gXCJAL3V0aWxzL0ZpbGVTeXN0ZW1cIjtcbmltcG9ydCB7IFJ1blNjcmlwdENvbnRleHQgfSBmcm9tIFwiQC9SdW5TY3JpcHRDb250ZXh0XCI7XG5pbXBvcnQgeyByZXF1aXJlUmVzb2x2ZSB9IGZyb20gXCJAL3V0aWxzL01vZHVsZVwiO1xuaW1wb3J0IHsgY3JlYXRlTG9nZ2VyIH0gZnJvbSBcIkAvbG9nZ2VyXCI7XG5cbmNvbnN0IGxvZ2dlciA9IGNyZWF0ZUxvZ2dlcihpbXBvcnQubWV0YS51cmwpO1xuXG5leHBvcnQgZGVmYXVsdCBhc3luYyBmdW5jdGlvbihvcHRpb25zOiBhbnkpIHtcbiAgY29uc3QgY3R4ID0gbmV3IFJ1blNjcmlwdENvbnRleHQob3B0aW9ucyk7XG4gIGNvbnN0IHByZXNldCA9IGN0eC5lbnYucHJlc2V0O1xuXG4gIGxldCBwcmVzZXRQYXRoO1xuICBpZiAocHJlc2V0KSB7XG4gICAgaWYgKGF3YWl0IGZpbGVFeGlzdHMocHJlc2V0KSlcbiAgICAgIHByZXNldFBhdGggPSBwcmVzZXQ7XG4gICAgZWxzZSB7XG4gICAgICBjb25zdCBjb21wb25lbnRzID0gcHJlc2V0LnNwbGl0KFwiL1wiKTtcbiAgICAgIGlmIChjb21wb25lbnRzLmxlbmd0aCA9PT0gMikge1xuICAgICAgICAgIHRyeSB7IHByZXNldFBhdGggPSByZXF1aXJlUmVzb2x2ZShgJHtjb21wb25lbnRzWzBdfS9iaXRtYWtlL3ByZXNldHMvJHtjb21wb25lbnRzWzFdfWApIH0gY2F0Y2goZSkge31cbiAgICAgIH1cbiAgICB9XG4gIH1cblxuICBpZiAoIXByZXNldFBhdGgpXG4gICAgdGhyb3cgbmV3IEVycm9yKGBQcmVzZXQgJyR7cHJlc2V0fScgaXMgbm90IGF2YWlsYWJsZWApO1xuXG4gIGlmIChhd2FpdCBmaWxlRXhpc3RzKGN0eC51c2VyQ29uZmlnUGF0aCkpXG4gICAgYXdhaXQgZnMucHJvbWlzZXMucm0oY3R4LnVzZXJDb25maWdQYXRoKTtcblxuICBhd2FpdCBmcy5wcm9taXNlcy5jb3B5RmlsZShwcmVzZXRQYXRoLCBjdHgudXNlckNvbmZpZ1BhdGgpO1xuICBsb2dnZXIuaW5mbyhgUHJlc2V0ICcke3ByZXNldH0nIGluc3RhbGxlZCBzdWNjZXNzZnVsbHlgKTtcbn1cbiIsIi8qXG4gKiBNSVQgTGljZW5zZVxuICpcbiAqIENvcHlyaWdodCAoYykgMjAyNSAgWXVyaWkgWWFrdWJpbiAoeXVyaWkueWFrdWJpbkBnbWFpbC5jb20pXG4gKlxuICogUGVybWlzc2lvbiBpcyBncmFudGVkIHRvIHVzZSwgY29weSwgbW9kaWZ5LCBhbmQgZGlzdHJpYnV0ZSB0aGlzIHNvZnR3YXJlXG4gKiB1bmRlciB0aGUgTUlUIExpY2Vuc2UuIFNlZSBMSUNFTlNFIGZpbGUgZm9yIGRldGFpbHMuXG4gKi9cblxuaW1wb3J0IGZzIGZyb20gXCJub2RlOmZzXCI7XG5pbXBvcnQgcGF0aCBmcm9tIFwibm9kZTpwYXRoXCI7XG5cbmltcG9ydCB7IFBsdWdpbkNvbnRleHQgfSBmcm9tIFwiQC9jb3JlL1BsdWdpbkNvbnRleHRcIjtcbmltcG9ydCB7IEdsb2JhbENvbnRleHQgfSBmcm9tIFwiQC9jb3JlL0dsb2JhbENvbnRleHRcIjtcbmltcG9ydCB7IFNjb3BlSGVscGVyIH0gZnJvbSBcIkAvY29yZS9TY29wZVwiO1xuaW1wb3J0IHsgR29hbENvbGxlY3Rpb24gfSBmcm9tIFwiQC9jb3JlL0dvYWxDb2xsZWN0aW9uXCI7XG5pbXBvcnQgeyBUb29sY2hhaW5Db250ZXh0IH0gZnJvbSBcIkAvY29yZS9Ub29sY2hhaW5Db250ZXh0XCI7XG5pbXBvcnQgeyBnZXRQYXRoU3RyaW5nIH0gIGZyb20gXCJAL3V0aWxzL0ZpbGVTeXN0ZW1cIjtcbmltcG9ydCB7IERpclBhdGgsIEZpbGVQYXRoIH0gZnJvbSBcIkAvY29yZS9QYXRoXCI7XG5pbXBvcnQgeyBpbXBvcnRNb2R1bGUgfSAgZnJvbSBcIkAvdXRpbHMvTW9kdWxlXCI7XG5pbXBvcnQgeyBkZXRlcm1pbmVDb21waWxlciB9ICBmcm9tIFwiQC9jb3JlL0RldGVybWluZUNvbXBpbGVyXCI7XG5pbXBvcnQgU3lzdGVtVmFyaWFibGVzIGZyb20gXCJAL2NvcmUvU3lzdGVtVmFyaWFibGVzXCI7XG5pbXBvcnQgeyBTeXN0ZW1TY29wZSB9IGZyb20gXCJAL2NvcmUvU3lzdGVtU2NvcGVcIjtcbmltcG9ydCB7IElOU1RBTExfVEFSR0VUIH0gZnJvbSBcIkAvQ29uc3RhbnRzXCI7XG5cbmNvbnN0IFBBQ0tBR0VfSlNPTiA9IFwicGFja2FnZS5qc29uXCI7XG5jb25zdCBNQUtFX0NBQ0hFID0gXCJNYWtlQ2FjaGUuanNvblwiO1xuXG5leHBvcnQgYXN5bmMgZnVuY3Rpb24gbWFrZVNjcmlwdEFjdGlvbihjb25maWc6IGFueSwgZW52aXJvbm1lbnQ6IGFueSwgc2V0dGluZ3M6IGFueSkge1xuICBwcm9jZXNzLmVudiA9IGVudmlyb25tZW50O1xuXG4gIGxldCBzY29wZSA9IHt9IGFzIFN5c3RlbVNjb3BlO1xuICBTY29wZUhlbHBlci5kZWZpbmVWYXJpYWJsZXMoc2NvcGUsIFwic3lzdGVtXCIsIFN5c3RlbVZhcmlhYmxlcyk7XG5cbiAgY29uc3Qgc291cmNlRGlyID0gZ2V0UGF0aFN0cmluZyhjb25maWcuc291cmNlRGlyKTtcbiAgY29uc3QgYmluYXJ5RGlyID0gZ2V0UGF0aFN0cmluZyhjb25maWcuYmluYXJ5RGlyKTtcblxuICBzY29wZS5QUk9KRUNUX1NPVVJDRV9ESVIgPSBEaXJQYXRoLmNyZWF0ZShzb3VyY2VEaXIpO1xuICBzY29wZS5QUk9KRUNUX0JJTkFSWV9ESVIgPSBEaXJQYXRoLmNyZWF0ZShiaW5hcnlEaXIpO1xuXG4gIHNjb3BlLlBBQ0tBR0VfRklMRSA9IHNjb3BlLlBST0pFQ1RfU09VUkNFX0RJUi5qb2luKFBBQ0tBR0VfSlNPTik7XG4gIHNjb3BlLkNBQ0hFX0ZJTEUgPSBzY29wZS5QUk9KRUNUX0JJTkFSWV9ESVIuam9pbihNQUtFX0NBQ0hFKTtcbiAgc2NvcGUuU09VUkNFX0RJUiA9IHNjb3BlLlBST0pFQ1RfU09VUkNFX0RJUjtcbiAgc2NvcGUuQklOQVJZX0RJUiA9IHNjb3BlLlBST0pFQ1RfQklOQVJZX0RJUjtcblxuICBjb25zdCBwYWNrYWdlSnNvbiA9IGF3YWl0IGZzLnByb21pc2VzLnJlYWRGaWxlKHNjb3BlLlBBQ0tBR0VfRklMRS50b1N0cmluZygpLCAndXRmOCcpO1xuICBjb25zdCBwa2cgPSBKU09OLnBhcnNlKHBhY2thZ2VKc29uKTtcblxuICBzY29wZS5CVUlMRF9UWVBFID0gY29uZmlnLmJ1aWxkVHlwZTtcbiAgc2NvcGUuUFJPSkVDVF9OQU1FID0gcGtnLm5hbWU7XG4gIHNjb3BlLlBST0pFQ1RfVkVSU0lPTiA9IHBrZy52ZXJzaW9uO1xuICBzY29wZS5QUk9KRUNUX0RFU0NSSVBUSU9OID0gcGtnLmRlc2NyaXB0aW9uIHx8IFwiXCI7XG4gIHNjb3BlLlBST0pFQ1RfSE9NRVBBR0VfVVJMID0gcGtnLmhvbWVwYWdlIHx8IFwiXCI7XG5cbiAgaWYgKGNvbmZpZy5kZXN0RGlyKVxuICAgIHNjb3BlLkRFU1RESVIgPSBjb25maWcuZGVzdERpcjtcblxuICBTY29wZUhlbHBlci5hcHBseVZhcmlhYmxlcyhzY29wZSwgY29uZmlnLnZhcmlhYmxlcyB8fCB7fSk7XG5cbiAgY29uc3QgZ2xvYmFsID0gR2xvYmFsQ29udGV4dC5jcmVhdGUoKTtcbiAgaWYgKHNjb3BlLlRPT0xDSEFJTl9GSUxFKSB7XG4gICAgY29uc3QgdG9vbGNoYWluID0gYXdhaXQgaW1wb3J0TW9kdWxlKHNjb3BlLlRPT0xDSEFJTl9GSUxFKTtcbiAgICBpZiAoIXRvb2xjaGFpbi5kZWZhdWx0KVxuICAgICAgdGhyb3cgbmV3IEVycm9yKFwiVG9vbGNoYWluIG1vZHVsZSBoYXMgbm8gZGVmYXVsdCBleHBvcnRcIik7XG4gICAgY29uc3QgbWsgPSBUb29sY2hhaW5Db250ZXh0LmNyZWF0ZShzY29wZSwgZ2xvYmFsKTtcbiAgICBjb25zdCByZXN1bHQgPSB0b29sY2hhaW4uZGVmYXVsdChtayk7XG4gICAgaWYgKHJlc3VsdCBpbnN0YW5jZW9mIFByb21pc2UpXG4gICAgICBhd2FpdCByZXN1bHQ7XG4gICAgc2NvcGUgPSBtay5fc2NvcGUoKTtcbiAgICBTY29wZUhlbHBlci5hcHBseVZhcmlhYmxlcyhzY29wZSwgbWspO1xuICB9XG4gIGVsc2Uge1xuICAgIGF3YWl0IGRldGVybWluZUNvbXBpbGVyKHNjb3BlKTtcbiAgfVxuXG4gIGZvciAoY29uc3QgcGx1Z2luIG9mIChzY29wZS5NQUtFX1BMVUdJTl9MSVNUIHx8IFtdKSkge1xuICAgIGNvbnN0IGN3ZFNhdmUgPSBwcm9jZXNzLmN3ZCgpO1xuICAgIFxuICAgIHNjb3BlLlNDUklQVF9GSUxFID0gRmlsZVBhdGguY3JlYXRlKHBsdWdpbik7XG4gICAgc2NvcGUuU0NSSVBUX0RJUiA9IHNjb3BlLlNDUklQVF9GSUxFLmRpcm5hbWUoKTtcblxuICAgIHByb2Nlc3MuY2hkaXIoc2NvcGUuU0NSSVBUX0RJUi50b1N0cmluZygpKTtcbiAgICBjb25zdCBtb2R1bGUgPSBhd2FpdCBpbXBvcnRNb2R1bGUoc2NvcGUuU0NSSVBUX0ZJTEUudG9TdHJpbmcoKSk7XG4gICAgaWYgKCFtb2R1bGUuZGVmYXVsdClcbiAgICAgIHRocm93IG5ldyBFcnJvcihgUGx1Z2luICR7c2NvcGUuU0NSSVBUX0ZJTEUuYmFzZW5hbWUoKX0gbm90IGNvbnRhaW4gZGVmYXVsdCBmdW5jdGlvbmApO1xuICAgIGNvbnN0IG1rID0gUGx1Z2luQ29udGV4dC5jcmVhdGUoc2NvcGUsIGdsb2JhbCk7XG4gICAgY29uc3QgcmVzdWx0ID0gbW9kdWxlLmRlZmF1bHQobWspO1xuICAgIGlmIChyZXN1bHQgaW5zdGFuY2VvZiBQcm9taXNlKVxuICAgICAgYXdhaXQgcmVzdWx0O1xuICAgIHNjb3BlID0gbWsuX3Njb3BlKCk7XG4gICAgU2NvcGVIZWxwZXIuYXBwbHlWYXJpYWJsZXMoc2NvcGUsIG1rKTtcblxuICAgIHByb2Nlc3MuY2hkaXIoY3dkU2F2ZSk7XG4gIH1cblxuICBnbG9iYWwuYWRkU3ViZGlyZWN0b3J5KHNjb3BlKTtcblxuICBhd2FpdCBnbG9iYWwuZG9TdWJkaXJlY3RvcnkoKTtcbiAgY29uc29sZS5pbmZvKFwiQ29uZmlndXJpbmcgZG9uZVwiKTtcblxuICBpZiAoc2NvcGUuR0xPQkFMX0NPTlRFWFRfSlNPTikge1xuICAgIGNvbnN0IGZpbGVuYW1lID0gc2NvcGUuR0xPQkFMX0NPTlRFWFRfSlNPTi50b1N0cmluZygpO1xuICAgIGNvbnN0IGNvbnRlbnQgPSBKU09OLnN0cmluZ2lmeShnbG9iYWwsIG51bGwsIDIpO1xuICAgIGF3YWl0IGZzLnByb21pc2VzLm1rZGlyKHBhdGguZGlybmFtZShmaWxlbmFtZSksIHsgcmVjdXJzaXZlOiB0cnVlIH0pO1xuICAgIGF3YWl0IGZzLnByb21pc2VzLndyaXRlRmlsZShmaWxlbmFtZSwgY29udGVudCwgeyBlbmNvZGluZzogXCJ1dGY4XCIgfSk7XG4gIH1cblxuICBjb25zdCBhbGxHb2FsTGlzdCA9IGdsb2JhbC5jcmVhdGVHb2FscyhzY29wZSk7XG4gIGNvbnN0IGdvYWxMaXN0ID0gYWxsR29hbExpc3QuZ2V0VGFyZ2V0TGlzdChJTlNUQUxMX1RBUkdFVCk7XG5cbiAgaWYgKHNjb3BlLlRBUkdFVF9HT0FMU19KU09OKSB7XG4gICAgY29uc3QgZmlsZW5hbWUgPSBzY29wZS5UQVJHRVRfR09BTFNfSlNPTi50b1N0cmluZygpO1xuICAgIGNvbnN0IGNvbnRlbnQgPSBKU09OLnN0cmluZ2lmeShnb2FsTGlzdCwgbnVsbCwgMik7XG4gICAgYXdhaXQgZnMucHJvbWlzZXMubWtkaXIocGF0aC5kaXJuYW1lKGZpbGVuYW1lKSwgeyByZWN1cnNpdmU6IHRydWUgfSk7XG4gICAgYXdhaXQgZnMucHJvbWlzZXMud3JpdGVGaWxlKGZpbGVuYW1lLCBjb250ZW50LCB7IGVuY29kaW5nOiBcInV0ZjhcIiB9KTtcbiAgfVxuXG4gIGF3YWl0IEdvYWxDb2xsZWN0aW9uLmJ1aWxkR29hbHMoZ29hbExpc3QpO1xufVxuIiwiLypcbiAqIE1JVCBMaWNlbnNlXG4gKlxuICogQ29weXJpZ2h0IChjKSAyMDI1ICBZdXJpaSBZYWt1YmluICh5dXJpaS55YWt1YmluQGdtYWlsLmNvbSlcbiAqXG4gKiBQZXJtaXNzaW9uIGlzIGdyYW50ZWQgdG8gdXNlLCBjb3B5LCBtb2RpZnksIGFuZCBkaXN0cmlidXRlIHRoaXMgc29mdHdhcmVcbiAqIHVuZGVyIHRoZSBNSVQgTGljZW5zZS4gU2VlIExJQ0VOU0UgZmlsZSBmb3IgZGV0YWlscy5cbiAqL1xuXG5pbXBvcnQgcGF0aCBmcm9tIFwibm9kZTpwYXRoXCI7XG5cbmltcG9ydCB7IFVTRVJfQ09ORklHIH0gZnJvbSBcIkAvQ29uc3RhbnRzXCI7XG5pbXBvcnQgeyBERUJVR19CVUlMRF9UWVBFLCBSRUxFQVNFX0JVSUxEX1RZUEUgfSBmcm9tIFwiQC9jb3JlL1R5cGVzXCI7XG5cbmV4cG9ydCBpbnRlcmZhY2UgUnVuU2NyaXB0T3B0aW9ucyB7XG4gIGhhbmRsZXI6IHN0cmluZztcbiAgbm9kZUV4ZWN1dGFibGU6IHN0cmluZztcbiAgY3VycmVudFNjcmlwdDogc3RyaW5nO1xuICB3b3JrRGlyOiBzdHJpbmc7XG4gIGVudjoge1xuICAgIGJ1aWxkVHlwZT86IHN0cmluZztcbiAgICBjb25maWc/OiBzdHJpbmc7XG4gICAgcHJlc2V0Pzogc3RyaW5nO1xuICB9O1xufTtcblxuZXhwb3J0IGNsYXNzIFJ1blNjcmlwdENvbnRleHQge1xuICBfbm9kZUV4ZWN1dGFibGU7XG4gIF9jdXJyZW50U2NyaXB0O1xuICBfd29ya0RpcjtcbiAgcmVhZG9ubHkgX2VudjtcbiAgX3VzZXJDb25maWc/OiBvYmplY3Q7XG5cbiAgY29uc3RydWN0b3Iob3B0aW9uczogUnVuU2NyaXB0T3B0aW9ucykge1xuICAgIHRoaXMuX25vZGVFeGVjdXRhYmxlID0gb3B0aW9ucy5ub2RlRXhlY3V0YWJsZTtcbiAgICB0aGlzLl9jdXJyZW50U2NyaXB0ID0gb3B0aW9ucy5jdXJyZW50U2NyaXB0O1xuICAgIHRoaXMuX3dvcmtEaXIgPSBvcHRpb25zLndvcmtEaXI7XG4gICAgdGhpcy5fZW52ID0gb3B0aW9ucy5lbnY7XG4gIH1cblxuICBnZXQgbm9kZUV4ZWN1dGFibGUoKSB7XG4gICAgcmV0dXJuIHRoaXMuX25vZGVFeGVjdXRhYmxlO1xuICB9XG5cbiAgZ2V0IGN1cnJlbnRTY3JpcHQoKSB7XG4gICAgcmV0dXJuIHRoaXMuX2N1cnJlbnRTY3JpcHQ7XG4gIH1cblxuICBnZXQgd29ya0RpcigpIHtcbiAgICByZXR1cm4gdGhpcy5fd29ya0RpcjtcbiAgfVxuXG4gIGdldCBlbnYoKSB7XG4gICAgcmV0dXJuIHRoaXMuX2VudjtcbiAgfVxuXG4gIGdldCB1c2VyQ29uZmlnUGF0aCgpIHtcbiAgICByZXR1cm4gcGF0aC5yZXNvbHZlKHRoaXMuX3dvcmtEaXIsIFVTRVJfQ09ORklHKTtcbiAgfVxuXG4gIGdldCBidWlsZFR5cGUoKSB7XG4gICAgcmV0dXJuIHRoaXMuX2Vudi5idWlsZFR5cGUgPT0gREVCVUdfQlVJTERfVFlQRSA/IHRoaXMuX2Vudi5idWlsZFR5cGUgOiBSRUxFQVNFX0JVSUxEX1RZUEU7XG4gIH1cbn07XG4iLCIvKlxuICogTUlUIExpY2Vuc2VcbiAqXG4gKiBDb3B5cmlnaHQgKGMpIDIwMjUgIFl1cmlpIFlha3ViaW4gKHl1cmlpLnlha3ViaW5AZ21haWwuY29tKVxuICpcbiAqIFBlcm1pc3Npb24gaXMgZ3JhbnRlZCB0byB1c2UsIGNvcHksIG1vZGlmeSwgYW5kIGRpc3RyaWJ1dGUgdGhpcyBzb2Z0d2FyZVxuICogdW5kZXIgdGhlIE1JVCBMaWNlbnNlLiBTZWUgTElDRU5TRSBmaWxlIGZvciBkZXRhaWxzLlxuICovXG5cbmV4cG9ydCBlbnVtIEJvb2xlYW5UeXBlIHtcbiAgT04gPSBcIk9OXCIsXG4gIE9GRiA9IFwiT0ZGXCIsXG59O1xuXG4vLyBFbnVtIHJlcHJlc2VudGluZyB2YWx1ZSB0eXBlcyB1c2VkIGluIENNYWtlIGNhY2hlIHZhcmlhYmxlc1xuZXhwb3J0IGVudW0gVmFsdWVUeXBlIHtcbiAgLy8gUmVwcmVzZW50cyBhIGZ1bGwgcGF0aCB0byBhIGZpbGVcbiAgRklMRVBBVEggPSBcIkZJTEVQQVRIXCIsXG5cbiAgLy8gUmVwcmVzZW50cyBhIHBhdGggdG8gYSBkaXJlY3RvcnlcbiAgUEFUSCA9IFwiUEFUSFwiLFxuXG4gIC8vIFJlcHJlc2VudHMgYSBib29sZWFuIHZhbHVlICh0cnVlL2ZhbHNlKVxuICBCT09MID0gXCJCT09MXCIsXG5cbiAgLy8gUmVwcmVzZW50cyBhIGdlbmVyaWMgc3RyaW5nIHZhbHVlXG4gIFNUUklORyA9IFwiU1RSSU5HXCIsXG59O1xuXG4vLyBCdWlsZFR5cGUgcmVwcmVzZW50aW5nIGNvbW1vbiBDTWFrZSBidWlsZCB0eXBlc1xuZXhwb3J0IGVudW0gQnVpbGRUeXBlIHtcbiAgLy8gRGVidWcgYnVpbGQgdHlwZTogaW5jbHVkZXMgZGVidWcgc3ltYm9scywgbm8gb3B0aW1pemF0aW9uXG4gIERlYnVnID0gXCJEZWJ1Z1wiLFxuXG4gIC8vIFJlbGVhc2UgYnVpbGQgdHlwZTogb3B0aW1pemVkIGNvZGUsIG5vIGRlYnVnIGluZm9cbiAgUmVsZWFzZSA9IFwiUmVsZWFzZVwiLFxuXG4gIC8vIFJlbGVhc2Ugd2l0aCBkZWJ1ZyBpbmZvOiBvcHRpbWl6ZWQgd2l0aCBkZWJ1ZyBzeW1ib2xzIGluY2x1ZGVkXG4gIFJlbFdpdGhEZWJJbmZvID0gXCJSZWxXaXRoRGViSW5mb1wiLFxuXG4gIC8vIE1pbmltdW0gc2l6ZSByZWxlYXNlOiBvcHRpbWl6ZWQgZm9yIHNtYWxsZXN0IGJpbmFyeSBzaXplXG4gIE1pblNpemVSZWwgPSBcIk1pblNpemVSZWxcIixcbn07XG5cbi8vIFRoZSBkZWZhdWx0IG5hbWUgb2YgdGhlIG1haW4gQ01ha2UgYnVpbGQgY29uZmlndXJhdGlvbiBmaWxlXG5leHBvcnQgY29uc3QgQ01BS0VfTElTVFNfVFhUID0gXCJDTWFrZUxpc3RzLnR4dFwiO1xuXG5leHBvcnQgZW51bSBHZW5lcmF0b3JUeXBlIHtcbiAgLy8gTmFtZSBvZiB0aGUgQ01ha2UgZ2VuZXJhdG9yIGZvciBzdGFuZGFyZCBVbml4ICdtYWtlJyBidWlsZCBzeXN0ZW1cbiAgVW5peE1ha2VmaWxlcyA9IFwiVW5peCBNYWtlZmlsZXNcIixcbn07XG5cbi8vIE5hbWUgb2YgdGhlIENNYWtlIGdlbmVyYXRvciBmb3Igc3RhbmRhcmQgVW5peCAnbWFrZScgYnVpbGQgc3lzdGVtXG5leHBvcnQgY29uc3QgREVGQVVMVF9HRU5FUkFUT1I6IEdlbmVyYXRvclR5cGUgPSBHZW5lcmF0b3JUeXBlLlVuaXhNYWtlZmlsZXM7XG4iLCIvKlxuICogTUlUIExpY2Vuc2VcbiAqXG4gKiBDb3B5cmlnaHQgKGMpIDIwMjUgIFl1cmlpIFlha3ViaW4gKHl1cmlpLnlha3ViaW5AZ21haWwuY29tKVxuICpcbiAqIFBlcm1pc3Npb24gaXMgZ3JhbnRlZCB0byB1c2UsIGNvcHksIG1vZGlmeSwgYW5kIGRpc3RyaWJ1dGUgdGhpcyBzb2Z0d2FyZVxuICogdW5kZXIgdGhlIE1JVCBMaWNlbnNlLiBTZWUgTElDRU5TRSBmaWxlIGZvciBkZXRhaWxzLlxuICovXG5cbmltcG9ydCB7IEJvb2xlYW5UeXBlIH0gZnJvbSBcIkAvY21ha2UvQ29uc3RhbnRzXCI7XG5cbmV4cG9ydCBmdW5jdGlvbiBjb252ZXJ0VG9WYWx1ZShvYmo6IGFueSk6IHN0cmluZyB7XG4gIGlmIChBcnJheS5pc0FycmF5KG9iaikpXG4gICAgcmV0dXJuIG9iai5tYXAoaSA9PiBjb252ZXJ0VG9WYWx1ZShpKSkuam9pbihcIjtcIik7XG5cbiAgaWYgKHR5cGVvZiBvYmogPT09IFwiYm9vbGVhblwiKVxuICAgIHJldHVybiBvYmogPyBCb29sZWFuVHlwZS5PTiA6IEJvb2xlYW5UeXBlLk9GRjtcblxuICByZXR1cm4gb2JqLnRvU3RyaW5nKCk7XG59XG4iLCIvKlxuICogTUlUIExpY2Vuc2VcbiAqXG4gKiBDb3B5cmlnaHQgKGMpIDIwMjUgIFl1cmlpIFlha3ViaW4gKHl1cmlpLnlha3ViaW5AZ21haWwuY29tKVxuICpcbiAqIFBlcm1pc3Npb24gaXMgZ3JhbnRlZCB0byB1c2UsIGNvcHksIG1vZGlmeSwgYW5kIGRpc3RyaWJ1dGUgdGhpcyBzb2Z0d2FyZVxuICogdW5kZXIgdGhlIE1JVCBMaWNlbnNlLiBTZWUgTElDRU5TRSBmaWxlIGZvciBkZXRhaWxzLlxuICovXG5cbmltcG9ydCBvcyBmcm9tIFwibm9kZTpvc1wiO1xuaW1wb3J0IGZzIGZyb20gXCJub2RlOmZzXCI7XG5pbXBvcnQgcGF0aCBmcm9tIFwibm9kZTpwYXRoXCI7XG5cbmltcG9ydCB7IHNwYXduQXN5bmMgfSBmcm9tIFwiQC91dGlscy9DaGlsZFByb2Nlc3NcIjtcbmltcG9ydCB7IENNQUtFX0xJU1RTX1RYVCwgREVGQVVMVF9HRU5FUkFUT1IsIFZhbHVlVHlwZSB9IGZyb20gXCJAL2NtYWtlL0NvbnN0YW50c1wiO1xuaW1wb3J0IHsgY29udmVydFRvVmFsdWUgfSBmcm9tIFwiQC9jbWFrZS9IZWxwZXJcIjtcblxuZnVuY3Rpb24gdG9WYXJUeXBlKGtleTogc3RyaW5nLCB2YWw6IGFueSkge1xuICBjb25zdCBtYXA6IGFueSA9IHtcbiAgICBDTUFLRV9JTlNUQUxMX1BSRUZJWDogVmFsdWVUeXBlLlBBVEgsXG4gICAgQ01BS0VfVE9PTENIQUlOX0ZJTEU6IFZhbHVlVHlwZS5GSUxFUEFUSCxcbiAgfTtcblxuICBpZiAodHlwZW9mIHZhbCA9PT0gXCJib29sZWFuXCIpXG4gICAgcmV0dXJuIFZhbHVlVHlwZS5CT09MO1xuXG4gIGlmIChtYXAuaGFzT3duUHJvcGVydHkoa2V5KSlcbiAgICByZXR1cm4gbWFwW2tleV07XG5cbiAgcmV0dXJuIFZhbHVlVHlwZS5TVFJJTkc7XG59XG5cbmZ1bmN0aW9uIHRvQ2FjaGVFbnRyeShuYW1lOiBzdHJpbmcsIHZhbDogYW55KSB7XG4gIGNvbnN0IHR5cGUgPSB0b1ZhclR5cGUobmFtZSwgdmFsKTtcbiAgY29uc3QgdmFsdWUgPSBjb252ZXJ0VG9WYWx1ZSh2YWwpO1xuICByZXR1cm4gYCR7bmFtZX06JHt0eXBlfT0ke3ZhbHVlfWA7XG59XG5cbmV4cG9ydCBhc3luYyBmdW5jdGlvbiBjb25maWd1cmUoYXJnczogYW55KSB7XG4gIGNvbnN0IHNwYXduQXJncyA9IFsgJy1HJywgYXJncy5nZW5lcmF0b3IgXTtcbiAgZm9yIChjb25zdCBba2V5LCB2YWxdIG9mIE9iamVjdC5lbnRyaWVzKGFyZ3MuY2FjaGVWYXJpYWJsZXMpKVxuICAgIHNwYXduQXJncy5wdXNoKCctRCcsIHRvQ2FjaGVFbnRyeShrZXksIHZhbCkpO1xuICBzcGF3bkFyZ3MucHVzaCgnLVMnLCBhcmdzLnNvdXJjZURpcik7XG4gIHNwYXduQXJncy5wdXNoKCctQicsIGFyZ3MuYmluYXJ5RGlyKTtcblxuICBjb25zdCByZXM6IGFueSA9IGF3YWl0IHNwYXduQXN5bmMoXCJjbWFrZVwiLCBzcGF3bkFyZ3MsIHtcbiAgICBjd2Q6IGFyZ3MuYmluYXJ5RGlyLFxuICAgIGVudjogYXJncy5lbnZpcm9ubWVudCB8fCBwcm9jZXNzLmVudixcbiAgICBleHRyYToge1xuICAgICAgb3V0cHV0OiBgY21ha2UuY29uZmlndXJlLmxvZ2AsXG4gICAgfSxcbiAgfSk7XG4gIGlmIChyZXMuc3RhdHVzICE9PSAwKSB7XG4gICAgdGhyb3cgYENNYWtlLmNvbmZpZ3VyZSByZXR1cm5lZCBzdGF0dXMgJHtyZXMuc3RhdHVzfWA7XG4gIH1cbn1cblxuZXhwb3J0IGFzeW5jIGZ1bmN0aW9uIGJ1aWxkKGFyZ3M6IGFueSkge1xuICBhd2FpdCBjb25maWd1cmUoYXJncyk7XG5cbiAgY29uc3Qgc3Bhd25BcmdzOiBzdHJpbmdbXSA9IFtcbiAgICAnLS1idWlsZCcsICcuJyxcbiAgICAnLS1wYXJhbGxlbCcsIG9zLmF2YWlsYWJsZVBhcmFsbGVsaXNtKCkudG9TdHJpbmcoKSxcbiAgXTtcbiAgY29uc3QgcmVzOiBhbnkgPSBhd2FpdCBzcGF3bkFzeW5jKFwiY21ha2VcIiwgc3Bhd25BcmdzLCB7XG4gICAgY3dkOiBhcmdzLmJpbmFyeURpcixcbiAgICBlbnY6IGFyZ3MuZW52aXJvbm1lbnQgfHwgcHJvY2Vzcy5lbnYsXG4gICAgZXh0cmE6IHtcbiAgICAgIG91dHB1dDogYGNtYWtlLmJ1aWxkLmxvZ2AsXG4gICAgfSxcbiAgfSk7XG4gIGlmIChyZXMuc3RhdHVzICE9PSAwKSB7XG4gICAgdGhyb3cgYENNYWtlLmJ1aWxkIHJldHVybmVkIHN0YXR1cyAke3Jlcy5zdGF0dXN9YDtcbiAgfVxufVxuXG5leHBvcnQgYXN5bmMgZnVuY3Rpb24gaW5zdGFsbChhcmdzOiBhbnkpIHtcbiAgYXdhaXQgY29uZmlndXJlKGFyZ3MpO1xuXG4gIGNvbnN0IHNwYXduQXJncyA9IFtcbiAgICAnLS1pbnN0YWxsJyxcbiAgICAnLicsXG4gIF07XG4gIGlmIChhcmdzLmluc3RhbGxEaXIpIHtcbiAgICBzcGF3bkFyZ3MucHVzaCgnLS1wcmVmaXgnLCBhcmdzLmluc3RhbGxEaXIpO1xuICB9XG4gIGNvbnN0IHJlczogYW55ID0gYXdhaXQgc3Bhd25Bc3luYyhcImNtYWtlXCIsIHNwYXduQXJncywge1xuICAgIGN3ZDogYXJncy5iaW5hcnlEaXIsXG4gICAgZW52OiBhcmdzLmVudmlyb25tZW50IHx8IHByb2Nlc3MuZW52LFxuICAgIGV4dHJhOiB7XG4gICAgICBvdXRwdXQ6IGBjbWFrZS5pbnN0YWxsLmxvZ2AsXG4gICAgfSxcbiAgfSk7XG4gIGlmIChyZXMuc3RhdHVzICE9PSAwKSB7XG4gICAgdGhyb3cgYENNYWtlLmluc3RhbGwgcmV0dXJuZWQgc3RhdHVzICR7cmVzLnN0YXR1c31gO1xuICB9XG59XG5cbmV4cG9ydCBhc3luYyBmdW5jdGlvbiBjdGVzdChhcmdzOiBhbnkpIHtcbiAgYXdhaXQgYnVpbGQoYXJncyk7XG5cbiAgY29uc3Qgc3Bhd25BcmdzOiBzdHJpbmdbXSA9IFtdO1xuICBjb25zdCByZXM6IGFueSA9IGF3YWl0IHNwYXduQXN5bmMoXCJjdGVzdFwiLCBzcGF3bkFyZ3MsIHtcbiAgICBjd2Q6IGFyZ3MuYmluYXJ5RGlyLFxuICAgIGVudjogYXJncy5lbnZpcm9ubWVudCB8fCBwcm9jZXNzLmVudixcbiAgICBleHRyYToge1xuICAgICAgb3V0cHV0OiBgY21ha2UuY3Rlc3QubG9nYCxcbiAgICB9LFxuICB9KTtcbiAgaWYgKHJlcy5zdGF0dXMgIT09IDApIHtcbiAgICB0aHJvdyBgQ1Rlc3QgcmV0dXJuZWQgc3RhdHVzICR7cmVzLnN0YXR1c31gO1xuICB9XG59XG5cbmV4cG9ydCBhc3luYyBmdW5jdGlvbiBleHRyYWN0KGFyZ3M6IGFueSkge1xuICBjb25zdCBzcGF3bkFyZ3MgPSBbIFwiLUVcIiwgXCJ0YXJcIiwgXCIteHZmXCIsIGFyZ3MuZmlsZW5hbWUgXTtcbiAgY29uc3QgcmVzOiBhbnkgPSBhd2FpdCBzcGF3bkFzeW5jKFwiY21ha2VcIiwgc3Bhd25BcmdzLCB7XG4gICAgY3dkOiBhcmdzLndvcmtEaXIgfHwgYXJncy5zb3VyY2VEaXIgfHwgYXJncy5iaW5hcnlEaXIsXG4gICAgZW52OiBhcmdzLmVudmlyb25tZW50IHx8IHByb2Nlc3MuZW52LFxuICAgIGV4dHJhOiB7XG4gICAgICBvdXRwdXQ6IGFyZ3MubG9nRmlsZSB8fCBgY21ha2UuZXh0cmFjdC5sb2dgLFxuICAgIH0sXG4gIH0pO1xuICBpZiAocmVzLnN0YXR1cyAhPT0gMCkge1xuICAgIHRocm93IGBFeHRyYWN0IHJldHVybmVkIHN0YXR1cyAke3Jlcy5zdGF0dXN9YDtcbiAgfVxufVxuXG5leHBvcnQgYXN5bmMgZnVuY3Rpb24gZ2V0UHJvamVjdEluZm8oc291cmNlOiBzdHJpbmcpIHtcbiAgY29uc3Qgc3RhdCA9IGF3YWl0IGZzLnByb21pc2VzLnN0YXQoc291cmNlKTtcbiAgaWYgKHN0YXQuaXNEaXJlY3RvcnkoKSlcbiAgICBzb3VyY2UgPSBwYXRoLnJlc29sdmUoc291cmNlLCBDTUFLRV9MSVNUU19UWFQpO1xuICBjb25zdCBjb250ZW50ID0gYXdhaXQgZnMucHJvbWlzZXMucmVhZEZpbGUoc291cmNlLCB7IGVuY29kaW5nOiAndXRmOCcgfSk7XG5cbiAgY29uc3QgcHJvamVjdFBhdHRlcm4gPSAvcHJvamVjdCAqXFwoICooW14gXSspICooW14pXSopXFwpLztcbiAgY29uc3QgdmVyc2lvblBhdHRlcm4gPSAvVkVSU0lPTiArKFteIF0rKS87XG5cbiAgY29uc3QgcmVzdWx0OiBhbnkgPSB7fTtcbiAgbGV0IG1hdGNoID0gY29udGVudC5tYXRjaChwcm9qZWN0UGF0dGVybik7XG4gIGlmIChtYXRjaCkge1xuICAgIHJlc3VsdC5uYW1lID0gbWF0Y2hbMV07XG4gICAgY29uc3QgcHJvamVjdENvbnRlbnQgPSBtYXRjaFsyXTtcbiAgICBtYXRjaCA9IHByb2plY3RDb250ZW50Lm1hdGNoKHZlcnNpb25QYXR0ZXJuKTtcbiAgICBpZiAobWF0Y2gpXG4gICAgICByZXN1bHQudmVyc2lvbiA9IG1hdGNoWzFdO1xuICB9XG5cbiAgcmV0dXJuIHJlc3VsdDtcbn1cblxuZXhwb3J0IGZ1bmN0aW9uIGxpbmVUb1NpbmdsQ29tbWVudChsaW5lOiBzdHJpbmcpIHtcbiAgcmV0dXJuIFwiIyBcIiArIGxpbmU7XG59XG5cbmV4cG9ydCBmdW5jdGlvbiBsaW5lVG9NdWx0aXBsZUNvbW1lbnQobGluZTogc3RyaW5nKSB7XG4gIHJldHVybiBgI1s9PT1bICR7bGluZX0gXT09PV1gO1xufVxuXG5leHBvcnQgZnVuY3Rpb24gZ2VuZXJhdGVkU2NyaXB0TmFtZUNvbW1lbnQoZmlsZW5hbWU6IHN0cmluZykge1xuICByZXR1cm4gbGluZVRvU2luZ2xDb21tZW50KFwiR2VuZXJhdGVkIGZyb20gXCIgKyBwYXRoLmJhc2VuYW1lKGZpbGVuYW1lKSk7XG59XG5cbmV4cG9ydCBkZWZhdWx0IHtcbiAgREVGQVVMVF9HRU5FUkFUT1IsXG4gIGNvbmZpZ3VyZSxcbiAgYnVpbGQsXG4gIGluc3RhbGwsXG4gIGN0ZXN0LFxuICBleHRyYWN0LFxufTtcbiIsIi8qXG4gKiBNSVQgTGljZW5zZVxuICpcbiAqIENvcHlyaWdodCAoYykgMjAyNSAgWXVyaWkgWWFrdWJpbiAoeXVyaWkueWFrdWJpbkBnbWFpbC5jb20pXG4gKlxuICogUGVybWlzc2lvbiBpcyBncmFudGVkIHRvIHVzZSwgY29weSwgbW9kaWZ5LCBhbmQgZGlzdHJpYnV0ZSB0aGlzIHNvZnR3YXJlXG4gKiB1bmRlciB0aGUgTUlUIExpY2Vuc2UuIFNlZSBMSUNFTlNFIGZpbGUgZm9yIGRldGFpbHMuXG4gKi9cblxuaW1wb3J0IGZzIGZyb20gXCJub2RlOmZzXCI7XG5pbXBvcnQgcGF0aCBmcm9tIFwibm9kZTpwYXRoXCI7XG5cbmV4cG9ydCBkZWZhdWx0IGZ1bmN0aW9uKHBhcmFtczogYW55KSB7XG4gIGNvbnN0IGNvbnRlbnQgPSBmcy5yZWFkRmlsZVN5bmMocGFyYW1zLmlucHV0LCBcInV0Zi04XCIpO1xuICBjb25zdCBuZXdDb250ZW50ID0gY29udGVudC5yZXBsYWNlKC9AKFtfQS1aYS16XVtfQS1aYS16MC05XSspQC9nLCAobWF0Y2gsIHZhbHVlKSA9PiB7XG4gICAgY29uc3QgcmVzID0gcGFyYW1zW3ZhbHVlXSB8fCBcIlwiO1xuICAgIGlmIChBcnJheS5pc0FycmF5KHJlcykpXG4gICAgICByZXR1cm4gcmVzLmpvaW4oXCJcXG5cIik7XG4gICAgcmV0dXJuIHJlcy50b1N0cmluZygpO1xuICB9KTtcbiAgZnMubWtkaXJTeW5jKHBhdGguZGlybmFtZShwYXJhbXMub3V0cHV0KSwgeyByZWN1cnNpdmU6IHRydWUgfSk7XG4gIGZzLndyaXRlRmlsZVN5bmMocGFyYW1zLm91dHB1dCwgbmV3Q29udGVudCwgXCJ1dGYtOFwiKTtcbn1cbiIsIi8qXG4gKiBNSVQgTGljZW5zZVxuICpcbiAqIENvcHlyaWdodCAoYykgMjAyNSAgWXVyaWkgWWFrdWJpbiAoeXVyaWkueWFrdWJpbkBnbWFpbC5jb20pXG4gKlxuICogUGVybWlzc2lvbiBpcyBncmFudGVkIHRvIHVzZSwgY29weSwgbW9kaWZ5LCBhbmQgZGlzdHJpYnV0ZSB0aGlzIHNvZnR3YXJlXG4gKiB1bmRlciB0aGUgTUlUIExpY2Vuc2UuIFNlZSBMSUNFTlNFIGZpbGUgZm9yIGRldGFpbHMuXG4gKi9cblxuaW1wb3J0IGZzIGZyb20gXCJub2RlOmZzXCI7XG5pbXBvcnQgcGF0aCBmcm9tIFwibm9kZTpwYXRoXCI7XG5cbmV4cG9ydCBkZWZhdWx0IGZ1bmN0aW9uKHBhcmFtczogYW55KSB7XG4gIGNvbnNvbGUubG9nKFwiSW5zdGFsbGluZzogXCIgKyBwYXJhbXMuZGVzdCk7XG4gIGZzLm1rZGlyU3luYyhwYXRoLmRpcm5hbWUocGFyYW1zLmRlc3QpLCB7IHJlY3Vyc2l2ZTogdHJ1ZSB9KTtcbiAgZnMuY3BTeW5jKHBhcmFtcy5zcmMsIHBhcmFtcy5kZXN0LCB7IGZvcmNlOiB0cnVlIH0pO1xufVxuIiwiLypcbiAqIE1JVCBMaWNlbnNlXG4gKlxuICogQ29weXJpZ2h0IChjKSAyMDI1ICBZdXJpaSBZYWt1YmluICh5dXJpaS55YWt1YmluQGdtYWlsLmNvbSlcbiAqXG4gKiBQZXJtaXNzaW9uIGlzIGdyYW50ZWQgdG8gdXNlLCBjb3B5LCBtb2RpZnksIGFuZCBkaXN0cmlidXRlIHRoaXMgc29mdHdhcmVcbiAqIHVuZGVyIHRoZSBNSVQgTGljZW5zZS4gU2VlIExJQ0VOU0UgZmlsZSBmb3IgZGV0YWlscy5cbiAqL1xuXG5pbXBvcnQgeyBGaWxlUGF0aCwgQWJzb2x1dGVQYXRoIH0gZnJvbSBcIkAvY29yZS9QYXRoXCI7XG5pbXBvcnQgeyBTY29wZUhlbHBlciB9IGZyb20gXCJAL2NvcmUvU2NvcGVcIjtcbmltcG9ydCB7IFN5c3RlbVNjb3BlIH0gZnJvbSBcIkAvY29yZS9TeXN0ZW1TY29wZVwiO1xuXG5jb25zdCBUQVJHRVRfU0NPUEUgPSBTeW1ib2woXCJUQVJHRVRfU0NPUEVcIik7XG5jb25zdCBTQ1JJUFQgICAgICAgPSBTeW1ib2woXCJTQ1JJUFRcIik7XG5jb25zdCBJTlBVVCAgICAgICAgPSBTeW1ib2woXCJJTlBVVFwiKTtcbmNvbnN0IE9VVFBVVCAgICAgICA9IFN5bWJvbChcIk9VVFBVVFwiKTtcbmNvbnN0IFBBUkFNUyAgICAgICA9IFN5bWJvbChcIlBBUkFNU1wiKTtcbmNvbnN0IFBST1BFUlRJRVMgICA9IFN5bWJvbChcIlBST1BFUlRJRVNcIik7XG5cbmV4cG9ydCBjbGFzcyBDdXN0b21TY3JpcHQge1xuICBwcml2YXRlIFtUQVJHRVRfU0NPUEVdOiBTeXN0ZW1TY29wZTtcbiAgcHJpdmF0ZSBbU0NSSVBUXTogQWJzb2x1dGVQYXRoIHwgRnVuY3Rpb247XG4gIHByaXZhdGUgW0lOUFVUXTogQWJzb2x1dGVQYXRoIHwgbnVsbDtcbiAgcHJpdmF0ZSBbT1VUUFVUXTogQWJzb2x1dGVQYXRoO1xuICBwcml2YXRlIFtQQVJBTVNdOiBvYmplY3Q7XG4gIHByaXZhdGUgW1BST1BFUlRJRVNdOiBhbnk7XG5cbiAgcHJpdmF0ZSBjb25zdHJ1Y3RvcihzY29wZTogU3lzdGVtU2NvcGUsIHNjcmlwdDogRmlsZVBhdGggfCBGdW5jdGlvbiwgb3V0cHV0OiBBYnNvbHV0ZVBhdGgsIHBhcmFtczogYW55KSB7XG4gICAgdGhpc1tUQVJHRVRfU0NPUEVdID0gU2NvcGVIZWxwZXIuY2xvbmUoe30sIHNjb3BlKTtcbiAgICB0aGlzW0lOUFVUXSA9IHBhcmFtcy5pbnB1dCB8fCBudWxsO1xuICAgIHRoaXNbU0NSSVBUXSA9IHNjcmlwdDtcbiAgICB0aGlzW09VVFBVVF0gPSBvdXRwdXQ7XG4gICAgdGhpc1tQQVJBTVNdID0gcGFyYW1zO1xuICAgIHRoaXNbUFJPUEVSVElFU10gPSB7fTtcbiAgfVxuXG4gIHB1YmxpYyBzdGF0aWMgY3JlYXRlKHNjb3BlOiBTeXN0ZW1TY29wZSwgc2NyaXB0OiBGaWxlUGF0aCB8IEZ1bmN0aW9uLCBvdXRwdXQ6IEFic29sdXRlUGF0aCwgcGFyYW1zOiBhbnkpOiBDdXN0b21TY3JpcHQge1xuICAgIHJldHVybiBPYmplY3Quc2VhbChuZXcgQ3VzdG9tU2NyaXB0KHNjb3BlLCBzY3JpcHQsIG91dHB1dCwgcGFyYW1zKSk7XG4gIH1cblxuICBwdWJsaWMgYWRkUHJvcGVydHkoa2V5OiBzdHJpbmcsIC4uLnZhbHM6IGFueVtdKSB7XG4gICAgbGV0IHByb3BlcnR5ID0gdGhpc1tQUk9QRVJUSUVTXVtrZXldO1xuICAgIGlmICghcHJvcGVydHkpIHtcbiAgICAgIHByb3BlcnR5ID0gW107XG4gICAgICB0aGlzW1BST1BFUlRJRVNdW2tleV0gPSBwcm9wZXJ0eTtcbiAgICB9XG4gICAgdmFscy5mb3JFYWNoKHYgPT4gcHJvcGVydHkucHVzaCh2KSk7XG4gIH1cblxuICBwdWJsaWMgZ2V0IFRBUkdFVF9TQ09QRSgpOiBTeXN0ZW1TY29wZSB7XG4gICAgcmV0dXJuIHRoaXNbVEFSR0VUX1NDT1BFXTtcbiAgfVxuXG4gIHB1YmxpYyBnZXQgU0NSSVBUKCkge1xuICAgIHJldHVybiB0aGlzW1NDUklQVF07XG4gIH1cblxuICBwdWJsaWMgZ2V0IElOUFVUKCk6IEFic29sdXRlUGF0aCB8IG51bGwge1xuICAgIHJldHVybiB0aGlzW0lOUFVUXTtcbiAgfVxuXG4gIHB1YmxpYyBzZXQgSU5QVVQodmFsdWU6IEFic29sdXRlUGF0aCB8IHN0cmluZykge1xuICAgIHRoaXNbSU5QVVRdID0gdGhpc1tUQVJHRVRfU0NPUEVdLlNPVVJDRV9ESVIucmVzb2x2ZSh2YWx1ZSk7XG4gIH1cblxuICBwdWJsaWMgZ2V0IE9VVFBVVCgpOiBBYnNvbHV0ZVBhdGgge1xuICAgIHJldHVybiB0aGlzW09VVFBVVF07XG4gIH1cblxuICBwdWJsaWMgc2V0IE9VVFBVVCh2YWx1ZTogQWJzb2x1dGVQYXRoIHwgc3RyaW5nKSB7XG4gICAgdGhpc1tPVVRQVVRdID0gQWJzb2x1dGVQYXRoLmNyZWF0ZSh2YWx1ZSk7XG4gIH1cblxuICBwdWJsaWMgZ2V0IFBBUkFNUygpOiBvYmplY3Qge1xuICAgIHJldHVybiB0aGlzW1BBUkFNU107XG4gIH1cblxuICBwdWJsaWMgc2V0IFBBUkFNUyh2YWx1ZTogb2JqZWN0KSB7XG4gICAgdGhpc1tQQVJBTVNdID0gdmFsdWU7XG4gIH1cblxuICBwdWJsaWMgZ2V0IFBST1BFUlRJRVMoKSB7XG4gICAgcmV0dXJuIHRoaXNbUFJPUEVSVElFU107XG4gIH1cblxuICBwdWJsaWMgdG9KU09OKCk6IG9iamVjdCB7XG4gICAgcmV0dXJuIHtcbiAgICAgIFRBUkdFVF9TQ09QRTogdGhpcy5UQVJHRVRfU0NPUEUsXG4gICAgICBTQ1JJUFQ6IHRoaXMuU0NSSVBULFxuICAgICAgSU5QVVQ6IHRoaXMuSU5QVVQsXG4gICAgICBPVVRQVVQ6IHRoaXMuT1VUUFVULFxuICAgICAgUEFSQU1TOiB0aGlzLlBBUkFNUyxcbiAgICAgIFBST1BFUlRJRVM6IHRoaXMuUFJPUEVSVElFUyxcbiAgICB9XG4gIH1cbn07XG4iLCIvKlxuICogTUlUIExpY2Vuc2VcbiAqXG4gKiBDb3B5cmlnaHQgKGMpIDIwMjUgIFl1cmlpIFlha3ViaW4gKHl1cmlpLnlha3ViaW5AZ21haWwuY29tKVxuICpcbiAqIFBlcm1pc3Npb24gaXMgZ3JhbnRlZCB0byB1c2UsIGNvcHksIG1vZGlmeSwgYW5kIGRpc3RyaWJ1dGUgdGhpcyBzb2Z0d2FyZVxuICogdW5kZXIgdGhlIE1JVCBMaWNlbnNlLiBTZWUgTElDRU5TRSBmaWxlIGZvciBkZXRhaWxzLlxuICovXG5cbmltcG9ydCB7IGZpbmRQcm9ncmFtIH0gZnJvbSBcIkAvY29yZS9GaW5kUHJvZ3JhbVwiO1xuaW1wb3J0IHsgU3lzdGVtU2NvcGUgfSBmcm9tIFwiQC9jb3JlL1N5c3RlbVNjb3BlXCI7XG5pbXBvcnQgeyBjcmVhdGVMb2dnZXIgfSBmcm9tIFwiQC9sb2dnZXJcIjtcblxuY29uc3QgbG9nZ2VyID0gY3JlYXRlTG9nZ2VyKGltcG9ydC5tZXRhLnVybCk7XG5cbmV4cG9ydCBhc3luYyBmdW5jdGlvbiBkZXRlcm1pbmVDb21waWxlcihzY29wZTogU3lzdGVtU2NvcGUpIHtcbiAgY29uc3QgY2xhbmdQYXRoID0gYXdhaXQgZmluZFByb2dyYW0oXCJjbGFuZ1wiKTtcbiAgaWYgKGNsYW5nUGF0aCkge1xuICAgIGxvZ2dlci5pbmZvKFwiVGhlIEMgY29tcGlsZXIgaWRlbnRpZmljYXRpb24gaXMgQ2xhbmcgYS5iLmNcIik7XG4gICAgc2NvcGUuQVNNX0NPTVBJTEVSID0gXCJjbGFuZ1wiO1xuICAgIHNjb3BlLkNfQ09NUElMRVIgPSBcImNsYW5nXCI7XG4gICAgc2NvcGUuQ1hYX0NPTVBJTEVSID0gXCJjbGFuZysrXCI7XG4gICAgc2NvcGUuQVIgPSBcImxsdm0tYXJcIjtcbiAgICBzY29wZS5SQU5MSUIgPSBcImxsdm0tcmFubGliXCI7XG4gICAgc2NvcGUuTElOS0VSID0gXCJsbGRcIjtcbiAgICBzY29wZS5OTSA9IFwibGx2bS1ubVwiO1xuICAgIHNjb3BlLk9CSkNPUFkgPSBcImxsdm0tb2JqY29weVwiO1xuICAgIHNjb3BlLk9CSkRVTVAgPSBcImxsdm0tb2JqZHVtcFwiO1xuICAgIHNjb3BlLlNUUklQID0gXCJsbHZtLXN0cmlwXCI7XG4gICAgcmV0dXJuO1xuICB9XG5cbiAgY29uc3QgZ2NjUGF0aCA9IGF3YWl0IGZpbmRQcm9ncmFtKFwiZ2NjXCIpO1xuICBpZiAoZ2NjUGF0aCkge1xuICAgIGxvZ2dlci5pbmZvKFwiVGhlIEMgY29tcGlsZXIgaWRlbnRpZmljYXRpb24gaXMgR05VIGEuYi5jXCIpO1xuICAgIHNjb3BlLkFTTV9DT01QSUxFUiA9IFwiZ2NjXCI7XG4gICAgc2NvcGUuQ19DT01QSUxFUiA9IFwiZ2NjXCI7XG4gICAgc2NvcGUuQ1hYX0NPTVBJTEVSID0gXCJnKytcIjtcbiAgICBzY29wZS5BUiA9IFwiYXJcIjtcbiAgICBzY29wZS5SQU5MSUIgPSBcInJhbmxpYlwiO1xuICAgIHNjb3BlLkxJTktFUiA9IFwibGRcIjtcbiAgICBzY29wZS5OTSA9IFwibm1cIjtcbiAgICBzY29wZS5PQkpDT1BZID0gXCJvYmpjb3B5XCI7XG4gICAgc2NvcGUuT0JKRFVNUCA9IFwib2JqZHVtcFwiO1xuICAgIHNjb3BlLlNUUklQID0gXCJzdHJpcFwiO1xuICAgIHJldHVybjtcbiAgfVxuXG4gIHRocm93IGBDYW4gbm90IGRldGVybWluZSBjb21waWxlcmA7XG59XG4iLCIvKlxuICogTUlUIExpY2Vuc2VcbiAqXG4gKiBDb3B5cmlnaHQgKGMpIDIwMjUgIFl1cmlpIFlha3ViaW4gKHl1cmlpLnlha3ViaW5AZ21haWwuY29tKVxuICpcbiAqIFBlcm1pc3Npb24gaXMgZ3JhbnRlZCB0byB1c2UsIGNvcHksIG1vZGlmeSwgYW5kIGRpc3RyaWJ1dGUgdGhpcyBzb2Z0d2FyZVxuICogdW5kZXIgdGhlIE1JVCBMaWNlbnNlLiBTZWUgTElDRU5TRSBmaWxlIGZvciBkZXRhaWxzLlxuICovXG5cbmltcG9ydCBvcyBmcm9tIFwibm9kZTpvc1wiO1xuaW1wb3J0IHBhdGggZnJvbSBcIm5vZGU6cGF0aFwiO1xuXG5pbXBvcnQgeyBmaWxlRXhpc3RzLCBmaWxlRXhpc3RzU3luYyB9IGZyb20gXCJAL3V0aWxzL0ZpbGVTeXN0ZW1cIjtcblxuZnVuY3Rpb24gcG9zc2libGVQcm9ncmFtTGlzdChuYW1lOiBzdHJpbmcpIHtcbiAgaWYgKG9zLnBsYXRmb3JtKCkgPT09IFwid2luMzJcIiAmJiAhbmFtZS5lbmRzV2l0aChcIi5leGVcIikpXG4gICAgbmFtZSArPSBcIi5leGVcIjtcblxuICBjb25zdCByZXN1bHQgPSBbXTtcbiAgY29uc3QgcGF0aHMgPSAocHJvY2Vzcy5lbnYuUEFUSCB8fCBcIlwiKS5zcGxpdChwYXRoLnBvc2l4LmRlbGltaXRlcik7XG4gIGZvciAoY29uc3QgaXRlciBvZiBwYXRocykge1xuICAgIGNvbnN0IGZpbGVuYW1lID0gcGF0aC5wb3NpeC5yZXNvbHZlKGl0ZXIsIG5hbWUpO1xuICAgIHJlc3VsdC5wdXNoKGZpbGVuYW1lKTtcbiAgfVxuXG4gIHJldHVybiByZXN1bHQ7XG59XG5cbmV4cG9ydCBhc3luYyBmdW5jdGlvbiBmaW5kUHJvZ3JhbShuYW1lOiBzdHJpbmcpOiBQcm9taXNlPHN0cmluZyB8IHVuZGVmaW5lZD4ge1xuICBmb3IgKGNvbnN0IGl0ZXIgb2YgcG9zc2libGVQcm9ncmFtTGlzdChuYW1lKSkge1xuICAgIGlmIChhd2FpdCBmaWxlRXhpc3RzKGl0ZXIpKVxuICAgICAgcmV0dXJuIGl0ZXI7XG4gIH1cbiAgcmV0dXJuIHVuZGVmaW5lZDtcbn1cblxuZXhwb3J0IGZ1bmN0aW9uIGZpbmRQcm9ncmFtU3luYyhuYW1lOiBzdHJpbmcpOiBzdHJpbmcgfCB1bmRlZmluZWQge1xuICBmb3IgKGNvbnN0IGl0ZXIgb2YgcG9zc2libGVQcm9ncmFtTGlzdChuYW1lKSkge1xuICAgIGlmIChmaWxlRXhpc3RzU3luYyhpdGVyKSlcbiAgICAgIHJldHVybiBpdGVyO1xuICB9XG4gIHJldHVybiB1bmRlZmluZWQ7XG59XG4iLCIvKlxuICogTUlUIExpY2Vuc2VcbiAqXG4gKiBDb3B5cmlnaHQgKGMpIDIwMjUgIFl1cmlpIFlha3ViaW4gKHl1cmlpLnlha3ViaW5AZ21haWwuY29tKVxuICpcbiAqIFBlcm1pc3Npb24gaXMgZ3JhbnRlZCB0byB1c2UsIGNvcHksIG1vZGlmeSwgYW5kIGRpc3RyaWJ1dGUgdGhpcyBzb2Z0d2FyZVxuICogdW5kZXIgdGhlIE1JVCBMaWNlbnNlLiBTZWUgTElDRU5TRSBmaWxlIGZvciBkZXRhaWxzLlxuICovXG5cbmltcG9ydCBvcyBmcm9tIFwibm9kZTpvc1wiO1xuXG5leHBvcnQgZnVuY3Rpb24gZ2V0U2l6ZW9mVm9pZHAoKSB7XG4gIGNvbnN0IHNpemVvZlZvaWRwQml0czogYW55ID1cbiAge1xuICAgIGFybTogICAgIDQsXG4gICAgYXJtNjQ6ICAgOCxcbiAgICBpYTMyOiAgICA0LFxuICAgIGxvb25nNjQ6IDgsXG4gICAgbWlwczogICAgNCxcbiAgICBtaXBzZWw6ICA0LFxuICAgIHBwYzogICAgIDQsXG4gICAgcHBjNjQ6ICAgOCxcbiAgICByaXNjdjY0OiA4LFxuICAgIHMzOTA6ICAgIDQsXG4gICAgczM5MHg6ICAgOCxcbiAgICB4NjQ6ICAgICA0LFxuICB9O1xuICBjb25zdCByZXN1bHQgPSBzaXplb2ZWb2lkcEJpdHNbb3MuYXJjaCgpXTtcbiAgaWYgKCFyZXN1bHQpXG4gICAgdGhyb3cgbmV3IEVycm9yKGBVbmtub3duICR7b3MuYXJjaCgpfSBhcmNoYCk7XG4gIHJldHVybiByZXN1bHQ7XG59XG4iLCIvKlxuICogTUlUIExpY2Vuc2VcbiAqXG4gKiBDb3B5cmlnaHQgKGMpIDIwMjUgIFl1cmlpIFlha3ViaW4gKHl1cmlpLnlha3ViaW5AZ21haWwuY29tKVxuICpcbiAqIFBlcm1pc3Npb24gaXMgZ3JhbnRlZCB0byB1c2UsIGNvcHksIG1vZGlmeSwgYW5kIGRpc3RyaWJ1dGUgdGhpcyBzb2Z0d2FyZVxuICogdW5kZXIgdGhlIE1JVCBMaWNlbnNlLiBTZWUgTElDRU5TRSBmaWxlIGZvciBkZXRhaWxzLlxuICovXG5cbmltcG9ydCBmcyBmcm9tIFwibm9kZTpmc1wiO1xuXG5pbXBvcnQgeyBBTExfVEFSR0VULCBJTlNUQUxMX1RBUkdFVCB9IGZyb20gXCJAL0NvbnN0YW50c1wiO1xuaW1wb3J0IHsgRGlyUGF0aCwgQWJzb2x1dGVQYXRoIH0gZnJvbSBcIkAvY29yZS9QYXRoXCI7XG5pbXBvcnQgeyBmaWxlRXhpc3RzLCBmaWxlRXhpc3RzU3luYyB9IGZyb20gXCJAL3V0aWxzL0ZpbGVTeXN0ZW1cIjtcbmltcG9ydCB7IFRhcmdldENvbGxlY3Rpb24gfSBmcm9tIFwiQC9jb3JlLy9UYXJnZXRDb2xsZWN0aW9uXCI7XG5pbXBvcnQgeyBTY3JpcHRDb2xsZWN0aW9uIH0gZnJvbSBcIkAvY29yZS9TY3JpcHRDb2xsZWN0aW9uXCI7XG5pbXBvcnQgeyBJbnRlcmZhY2VUYXJnZXQgfSBmcm9tIFwiQC9jb3JlL0ludGVyZmFjZVRhcmdldFwiO1xuaW1wb3J0IHsgVW5rbm93blRhcmdldCB9IGZyb20gXCJAL2NvcmUvVW5rbm93blRhcmdldFwiO1xuaW1wb3J0IHsgR29hbENvbGxlY3Rpb24gfSBmcm9tIFwiQC9jb3JlL0dvYWxDb2xsZWN0aW9uXCI7XG5pbXBvcnQgeyBJbnRlcmZhY2VPYmplY3RzIH0gZnJvbSBcIkAvY29yZS9JbnRlcmZhY2VPYmplY3RzXCI7XG5pbXBvcnQgeyBJbnRlcmZhY2VTY3JpcHQgfSBmcm9tIFwiQC9jb3JlL0ludGVyZmFjZVNjcmlwdFwiO1xuaW1wb3J0IHsgU291cmNlRmlsZSB9IGZyb20gXCJAL2NvcmUvU291cmNlRmlsZVwiO1xuaW1wb3J0IHsgVXNlckNvbnRleHQgfSBmcm9tIFwiQC9jb3JlL1VzZXJDb250ZXh0XCI7XG5pbXBvcnQgeyBPYmplY3RMaWJyYXJ5LCBTdGF0aWNMaWJyYXJ5LCBTaGFyZWRMaWJyYXJ5LCBFeGVjdXRhYmxlIH0gZnJvbSBcIkAvY29yZS9UYXJnZXRcIjtcbmltcG9ydCB7IFNjb3BlSGVscGVyIH0gZnJvbSBcIkAvY29yZS9TY29wZVwiO1xuaW1wb3J0IHsgU3lzdGVtU2NvcGUgfSBmcm9tIFwiQC9jb3JlL1N5c3RlbVNjb3BlXCI7XG5pbXBvcnQgeyBpbXBvcnRNb2R1bGUgfSBmcm9tIFwiQC91dGlscy9Nb2R1bGVcIjtcbmltcG9ydCB7IGNyZWF0ZUxvZ2dlciB9IGZyb20gXCJAL2xvZ2dlclwiO1xuaW1wb3J0IHsgSW5zdGFsbEVudGl0eSB9IGZyb20gXCJAL2NvcmUvSW5zdGFsbEVudGl0eVwiO1xuaW1wb3J0IHsgQ3VzdG9tU2NyaXB0IH0gZnJvbSBcIkAvY29yZS9DdXN0b21TY3JpcHRcIjtcblxuaW1wb3J0IGNvbmZpZ3VyZV9maWxlIGZyb20gXCJAL2NvcmUvQnVpbGRpblNjcmlwdHMvY29uZmlndXJlX2ZpbGVcIjtcbmltcG9ydCBpbnN0YWxsX3NjcmlwdCBmcm9tIFwiQC9jb3JlL0J1aWxkaW5TY3JpcHRzL2luc3RhbGxfc2NyaXB0XCI7XG5cbmNvbnN0IGxvZ2dlciA9IGNyZWF0ZUxvZ2dlcihpbXBvcnQubWV0YS51cmwpO1xuXG5jb25zdCByZXF1aXJlSW1wbCA9IGV2YWwoXCJyZXF1aXJlXCIpO1xuXG5jb25zdCBUQVJHRVRTID0gU3ltYm9sKFwiVEFSR0VUU1wiKTtcbmNvbnN0IENVU1RPTV9TQ1JJUFRTID0gU3ltYm9sKFwiQ1VTVE9NX1NDUklQVFNcIik7XG5jb25zdCBDQUNIRSA9IFN5bWJvbChcIkNBQ0hFXCIpO1xuY29uc3QgVU5LTk9XTl9UQVJHRVRTID0gU3ltYm9sKFwiVU5LTk9XTl9UQVJHRVRTXCIpO1xuY29uc3QgSU5URVJGQUNFX1NDUklQVFMgPSBTeW1ib2woXCJJTlRFUkZBQ0VfU0NSSVBUU1wiKTtcbmNvbnN0IElOU1RBTExfTElTVCA9IFN5bWJvbChcIklOU1RBTExfTElTVFwiKTtcbmNvbnN0IFNDUklQVF9WQVJJQUJMRVNfTUFQID0gU3ltYm9sKFwiU0NSSVBUX1ZBUklBQkxFU19NQVBcIik7XG5jb25zdCBTVUJESVJfQUxJQVMgPSBTeW1ib2woXCJTVUJESVJfQUxJQVNcIik7XG5jb25zdCBTVUJESVJfTElTVCA9IFN5bWJvbChcIlNVQkRJUl9MSVNUXCIpO1xuY29uc3QgQlVJTFRJTl9TQ1JJUFRTID0gU3ltYm9sKFwiQlVJTFRJTl9TQ1JJUFRTXCIpO1xuXG50eXBlIFVua25vd25UYXJnZXRzID0ge1xuICBbbmFtZTogc3RyaW5nXTogVW5rbm93blRhcmdldDtcbn07XG5cbnR5cGUgU3ViZGlyZWN0b3J5QWxpYXMgPSB7XG4gIFtuYW1lOiBzdHJpbmddOiBEaXJQYXRoO1xufTtcblxudHlwZSBJbnRlcmZhY2VTY3JpcHRzID0ge1xuICBbbmFtZTogc3RyaW5nXTogSW50ZXJmYWNlU2NyaXB0O1xufTtcblxudHlwZSBDYWNoZVZhcmlhYmxlRGVzY3JpcHRvciA9IHtcbiAgdHlwZT86IGFueTtcbiAgdmFsdWU/OiBhbnk7XG4gIGRlc2NyaXB0aW9uPzogc3RyaW5nO1xufTtcblxudHlwZSBDYWNoZVZhcmlhYmxlRGVzY3JpcHRvcnMgPSB7XG4gIFtuYW1lOiBzdHJpbmddOiBDYWNoZVZhcmlhYmxlRGVzY3JpcHRvcjtcbn07XG5cbnR5cGUgQnVpbGRpblNjcmlwdHMgPSB7XG4gIFtuYW1lOiBzdHJpbmddOiBGdW5jdGlvbjtcbn07XG5cbmZ1bmN0aW9uIGVuc3VyZVZhbHVlQnlUeXBlKHR5cGU6IGFueSwgdmFsdWU6IGFueSkge1xuICBpZiAoQXJyYXkuaXNBcnJheSh0eXBlKSA/IHR5cGUuaW5jbHVkZXModmFsdWUpIDogdHlwZW9mIHZhbHVlID09PSB0eXBlKVxuICAgIHJldHVybiB2YWx1ZTtcbiAgdGhyb3cgbmV3IEVycm9yKGBUaGUgJyR7dmFsdWV9JyBpcyBub3QgYSAke3R5cGV9YCk7XG59XG5cbmV4cG9ydCBjbGFzcyBHbG9iYWxDb250ZXh0IHtcbiAgcHJpdmF0ZSBbVEFSR0VUU106IFRhcmdldENvbGxlY3Rpb247XG4gIHByaXZhdGUgW0NVU1RPTV9TQ1JJUFRTXTogU2NyaXB0Q29sbGVjdGlvbjtcbiAgcHJpdmF0ZSBbQ0FDSEVdOiBDYWNoZVZhcmlhYmxlRGVzY3JpcHRvcnM7XG4gIHByaXZhdGUgW1VOS05PV05fVEFSR0VUU106IFVua25vd25UYXJnZXRzO1xuICBwcml2YXRlIFtJTlRFUkZBQ0VfU0NSSVBUU106IEludGVyZmFjZVNjcmlwdHM7XG4gIHByaXZhdGUgW0lOU1RBTExfTElTVF06IEluc3RhbGxFbnRpdHlbXTtcbiAgcHJpdmF0ZSBbU0NSSVBUX1ZBUklBQkxFU19NQVBdOiBhbnk7XG4gIHByaXZhdGUgW1NVQkRJUl9BTElBU106IFN1YmRpcmVjdG9yeUFsaWFzO1xuICBwcml2YXRlIFtTVUJESVJfTElTVF06IFN5c3RlbVNjb3BlW107XG4gIHByaXZhdGUgW0JVSUxUSU5fU0NSSVBUU106IEJ1aWxkaW5TY3JpcHRzO1xuXG4gIHByaXZhdGUgY29uc3RydWN0b3IoKSB7XG4gICAgdGhpc1tUQVJHRVRTXSA9IFRhcmdldENvbGxlY3Rpb24uY3JlYXRlKCk7XG4gICAgdGhpc1tDVVNUT01fU0NSSVBUU10gPSBTY3JpcHRDb2xsZWN0aW9uLmNyZWF0ZSgpO1xuICAgIHRoaXNbQ0FDSEVdID0ge307XG4gICAgdGhpc1tVTktOT1dOX1RBUkdFVFNdID0ge307XG4gICAgdGhpc1tJTlRFUkZBQ0VfU0NSSVBUU10gPSB7fTtcbiAgICB0aGlzW0lOU1RBTExfTElTVF0gPSBbXTtcbiAgICB0aGlzW1NDUklQVF9WQVJJQUJMRVNfTUFQXSA9IHt9O1xuICAgIHRoaXNbU1VCRElSX0FMSUFTXSA9IHt9O1xuICAgIHRoaXNbU1VCRElSX0xJU1RdID0gW107XG4gICAgdGhpc1tCVUlMVElOX1NDUklQVFNdID0ge1xuICAgICAgY29uZmlndXJlX2ZpbGUsXG4gICAgICBpbnN0YWxsX3NjcmlwdCxcbiAgICB9O1xuICB9XG5cbiAgcHVibGljIHN0YXRpYyBjcmVhdGUoKSB7XG4gICAgcmV0dXJuIE9iamVjdC5zZWFsKG5ldyBHbG9iYWxDb250ZXh0KTtcbiAgfVxuXG4gIHB1YmxpYyBnZXQgVEFSR0VUUygpIHtcbiAgICByZXR1cm4gdGhpc1tUQVJHRVRTXTtcbiAgfVxuXG4gIHB1YmxpYyBnZXQgQ0FDSEUoKSB7XG4gICAgcmV0dXJuIHRoaXNbQ0FDSEVdO1xuICB9XG5cbiAgcHVibGljIGdldCBVTktOT1dOX1RBUkdFVFMoKSB7XG4gICAgcmV0dXJuIHRoaXNbVU5LTk9XTl9UQVJHRVRTXTtcbiAgfVxuXG4gIHB1YmxpYyBnZXQgSU5URVJGQUNFX1NDUklQVFMoKSB7XG4gICAgcmV0dXJuIHRoaXNbSU5URVJGQUNFX1NDUklQVFNdO1xuICB9XG5cbiAgcHVibGljIGdldCBTQ1JJUFRfVkFSSUFCTEVTX01BUCgpIHtcbiAgICByZXR1cm4gdGhpc1tTQ1JJUFRfVkFSSUFCTEVTX01BUF07XG4gIH1cblxuICBwdWJsaWMgZ2V0IFNVQkRJUl9BTElBUygpIHtcbiAgICByZXR1cm4gdGhpc1tTVUJESVJfQUxJQVNdO1xuICB9XG4gIFxuICBwdWJsaWMgc2V0Q3VzdG9tU2NyaXB0KHRhcmdldDogQ3VzdG9tU2NyaXB0LCBuYW1lPzogc3RyaW5nKSB7XG4gICAgaWYgKG5hbWUpXG4gICAgICB0aGlzW0NVU1RPTV9TQ1JJUFRTXS5zZXQobmFtZSwgdGFyZ2V0KTtcbiAgICBlbHNlXG4gICAgICB0aGlzW0NVU1RPTV9TQ1JJUFRTXS5hZGQodGFyZ2V0KTtcbiAgfVxuXG4gIHB1YmxpYyBnZXRVa25vd25UYXJnZXQobmFtZTogc3RyaW5nKTogVW5rbm93blRhcmdldCB7XG4gICAgbGV0IHRhcmdldCA9IHRoaXNbVU5LTk9XTl9UQVJHRVRTXVtuYW1lXTtcbiAgICBpZiAoIXRhcmdldCkge1xuICAgICAgdGhpc1tVTktOT1dOX1RBUkdFVFNdW25hbWVdID0gdGFyZ2V0ID0gVW5rbm93blRhcmdldC5jcmVhdGUobmFtZSk7XG4gICAgfVxuICAgIHJldHVybiB0YXJnZXQ7XG4gIH1cblxuICBwdWJsaWMgYWRkU3lzdGVtVmFyaWFibGVzKHZhcmlhYmxlczogYW55KSB7XG4gICAgY29uc3Qgc2NyaXB0ID0gdmFyaWFibGVzLlNDUklQVF9GSUxFLnRvU3RyaW5nKCk7XG4gICAgaWYgKHRoaXNbU0NSSVBUX1ZBUklBQkxFU19NQVBdW3NjcmlwdF0pXG4gICAgICB0aHJvdyBuZXcgRXJyb3IoYFN5c3RlbVZhcmlhYmxlcyBleGlzdHMgZm9yICR7c2NyaXB0fWApO1xuICAgIHRoaXNbU0NSSVBUX1ZBUklBQkxFU19NQVBdW3NjcmlwdF0gPSB2YXJpYWJsZXM7XG4gIH1cblxuICBwdWJsaWMgcmVzb2x2ZVN1YmRpcmVjdG9yeShwYXRoOiBBYnNvbHV0ZVBhdGggfCBzdHJpbmcpIHtcbiAgICBjb25zdCByZXNvbHZlZFBhdGggPSB0aGlzW1NVQkRJUl9BTElBU11bcGF0aC50b1N0cmluZygpXTtcbiAgICByZXR1cm4gcmVzb2x2ZWRQYXRoIHx8IHBhdGg7XG4gIH1cblxuICBwdWJsaWMgYWRkU3ViZGlyZWN0b3J5QWxpYXMoc3JjOiBEaXJQYXRoLCBkZXN0OiBEaXJQYXRoKSB7XG4gICAgY29uc3Qgc3JjU3RyID0gc3JjLnRvU3RyaW5nKCk7XG4gICAgaWYgKHRoaXNbU1VCRElSX0FMSUFTXS5oYXNPd25Qcm9wZXJ0eShzcmNTdHIpKVxuICAgICAgbG9nZ2VyLndhcm4oYE93ZXJyaWRlIFwiJHtzcmNTdHJ9XCIgc3ViZGlyZWN0b3J5IGFsaWFzYCk7XG4gICAgdGhpc1tTVUJESVJfQUxJQVNdW3NyY1N0cl0gPSBkZXN0O1xuICB9XG5cbiAgcHVibGljIGFkZEluc3RhbGxFbnRyeShlbnRyeTogSW5zdGFsbEVudGl0eSkge1xuICAgIHJldHVybiB0aGlzW0lOU1RBTExfTElTVF0ucHVzaChlbnRyeSk7XG4gIH1cblxuICBwdWJsaWMgYWRkQ2FjaGVWYXJpYWJsZXModmFyaWFibGVzOiBDYWNoZVZhcmlhYmxlRGVzY3JpcHRvcnMpIHtcbiAgICBjb25zdCBjYWNoZSA9IHRoaXNbQ0FDSEVdO1xuICAgIGZvciAoY29uc3QgW2tleSwgZW50cnldIG9mIE9iamVjdC5lbnRyaWVzKHZhcmlhYmxlcykpIHtcbiAgICAgIGNhY2hlW2tleV0gPSBlbnRyeTtcbiAgICB9XG4gIH1cblxuICBwdWJsaWMgbG9hZENhY2hlVmFyaWFibGVzKGZpbGVuYW1lOiBBYnNvbHV0ZVBhdGggfCBzdHJpbmcpIHtcbiAgICBpZiAoZmlsZUV4aXN0c1N5bmMoZmlsZW5hbWUudG9TdHJpbmcoKSkpIHtcbiAgICAgIGNvbnN0IHZhcmlhYmxlcyA9IHJlcXVpcmVJbXBsKGZpbGVuYW1lLnRvU3RyaW5nKCkpO1xuICAgICAgdGhpcy5hZGRDYWNoZVZhcmlhYmxlcyh2YXJpYWJsZXMpO1xuICAgIH1cbiAgfVxuXG4gIHB1YmxpYyBjb3B5Q2FjaGVWYXJpYWJsZXMoc2NvcGU6IGFueSkge1xuICAgIGZvciAoY29uc3QgW25hbWUsIGVudHJ5XSBvZiBPYmplY3QuZW50cmllcyh0aGlzW0NBQ0hFXSkpIHtcbiAgICAgIGlmICghT2JqZWN0Lmhhc093bihzY29wZSwgbmFtZSkpIHtcbiAgICAgICAgY29uc3QgdHlwZSA9IGVudHJ5LnR5cGUgfHwgdHlwZW9mIGVudHJ5LnZhbHVlO1xuICAgICAgICBjb25zdCBkZXNjcmlwdGlvbiA9IGVudHJ5LmRlc2NyaXB0aW9uIHx8IFwiXCI7XG4gICAgICAgIGxldCB2YWx1ZSA9IEFycmF5LmlzQXJyYXkoZW50cnkudmFsdWUpID8gWyAuLi5lbnRyeS52YWx1ZSBdIDogZW50cnkudmFsdWU7XG4gICAgICAgIGlmICh2YWx1ZSA9PT0gXCIke1BST0pFQ1RfVkVSU0lPTn1cIilcbiAgICAgICAgICB2YWx1ZSA9IHNjb3BlLlBST0pFQ1RfVkVSU0lPTjtcbiAgICAgICAgZWxzZSBpZiAodmFsdWUgPT09IFwiJHtQUk9KRUNUX0RFU0NSSVBUSU9OfVwiKVxuICAgICAgICAgIHZhbHVlID0gc2NvcGUuUFJPSkVDVF9ERVNDUklQVElPTjtcbiAgICAgICAgZWxzZSBpZiAodmFsdWUgPT09IFwiJHtQUk9KRUNUX0hPTUVQQUdFX1VSTH1cIilcbiAgICAgICAgICB2YWx1ZSA9IHNjb3BlLlBST0pFQ1RfSE9NRVBBR0VfVVJMO1xuICAgICAgICBlbHNlIGlmIChlbnRyeS52YWx1ZSA9PT0gXCIke0NNQUtFX1NZU1RFTV9QUk9DRVNTT1J9XCIpXG4gICAgICAgICAgdmFsdWUgPSBzY29wZS5TWVNURU1fUFJPQ0VTU09SO1xuICBcbiAgICAgICAgY29uc3QgbmFtZVN5bWJvbCA9IFN5bWJvbChuYW1lKTtcbiAgICAgICAgc2NvcGVbbmFtZVN5bWJvbF0gPSBlbnN1cmVWYWx1ZUJ5VHlwZSh0eXBlLCB2YWx1ZSk7XG4gIFxuICAgICAgICBPYmplY3QuZGVmaW5lUHJvcGVydHkoc2NvcGUsIG5hbWUsIHtcbiAgICAgICAgICBlbnVtZXJhYmxlOiB0cnVlLFxuICAgICAgICAgIGdldCgpIHtcbiAgICAgICAgICAgIHJldHVybiB0aGlzW25hbWVTeW1ib2xdO1xuICAgICAgICAgIH0sXG4gICAgICAgICAgc2V0KHZhbHVlKSB7XG4gICAgICAgICAgICB0aGlzW25hbWVTeW1ib2xdID0gZW5zdXJlVmFsdWVCeVR5cGUodHlwZSwgdmFsdWUpO1xuICAgICAgICAgIH0sXG4gICAgICAgIH0pO1xuICAgICAgfVxuICAgIH1cbiAgfVxuICBcbiAgcHVibGljIHdyaXRlQ2FjaGVWYXJpYWJsZXMoZmlsZW5hbWU6IHN0cmluZykge1xuICAgIGNvbnN0IGpzb24gPSBKU09OLnN0cmluZ2lmeSh0aGlzW0NBQ0hFXSwgbnVsbCwgMik7XG4gICAgZnMud3JpdGVGaWxlU3luYyhmaWxlbmFtZSwganNvbiwgXCJ1dGYtOFwiKTtcbiAgfVxuXG4gIHB1YmxpYyBhZGRTdWJkaXJlY3Rvcnkoc2NvcGU6IGFueSkge1xuICAgIHRoaXNbU1VCRElSX0xJU1RdLnB1c2goc2NvcGUpO1xuICB9XG5cbiAgcHVibGljIGZpbmRTY3JpcHRGdW5jdGlvbihuYW1lOiBzdHJpbmcpOiBGdW5jdGlvbiB8IHVuZGVmaW5lZCB7XG4gICAgcmV0dXJuIHRoaXNbQlVJTFRJTl9TQ1JJUFRTXVtuYW1lXTtcbiAgfVxuICBcbiAgcHVibGljIGFzeW5jIGRvU3ViZGlyZWN0b3J5KCkge1xuICAgIHdoaWxlICh0aGlzW1NVQkRJUl9MSVNUXS5sZW5ndGgpIHtcbiAgICAgIGNvbnN0IHNjb3BlID0gdGhpc1tTVUJESVJfTElTVF0uc2hpZnQoKTtcbiAgICAgIGlmICghc2NvcGUpXG4gICAgICAgIGNvbnRpbnVlO1xuXG4gICAgICBsZXQgc2NyaXB0RmlsZTogQWJzb2x1dGVQYXRoIHwgdW5kZWZpbmVkO1xuICAgICAgY29uc3QgZmlsZUxpc3QgPSBbIFwiLmpzXCIsIFwiLm1qc1wiIF0ubWFwKGkgPT4gXCJNYWtlU2NyaXB0XCIgKyBpKTtcbiAgICAgIGZvciAoY29uc3QgZmlsZW5hbWUgb2YgZmlsZUxpc3QpIHtcbiAgICAgICAgY29uc3QgaXRlciA9IHNjb3BlLlNPVVJDRV9ESVIuam9pbihmaWxlbmFtZSk7XG4gICAgICAgIGlmIChhd2FpdCBmaWxlRXhpc3RzKGl0ZXIudG9TdHJpbmcoKSkpIHtcbiAgICAgICAgICBzY3JpcHRGaWxlID0gaXRlcjtcbiAgICAgICAgICBicmVhaztcbiAgICAgICAgfVxuICAgICAgfVxuXG4gICAgICBpZiAoIXNjcmlwdEZpbGUpXG4gICAgICAgIHRocm93IG5ldyBFcnJvcihgVGhlcmUgYXJlIG5vIGZpbGVzICR7ZmlsZUxpc3Quam9pbihcIiwgXCIpfSBpbiBcIiR7c2NvcGUuU09VUkNFX0RJUn1cImApO1xuXG4gICAgICBzY29wZS5TQ1JJUFRfRklMRSA9IHNjcmlwdEZpbGU7XG4gICAgICBzY29wZS5TQ1JJUFRfRElSID0gc2NvcGUuU0NSSVBUX0ZJTEUuZGlybmFtZSgpO1xuXG4gICAgICB0aGlzLmFkZFN5c3RlbVZhcmlhYmxlcyhzY29wZSk7XG5cbiAgICAgIGNvbnN0IGN3ZFNhdmUgPSBwcm9jZXNzLmN3ZCgpO1xuICAgICAgcHJvY2Vzcy5jaGRpcihzY29wZS5TT1VSQ0VfRElSLnRvU3RyaW5nKCkpO1xuXG4gICAgICBjb25zdCBtb2R1bGUgPSBhd2FpdCBpbXBvcnRNb2R1bGUoc2NvcGUuU0NSSVBUX0ZJTEUudG9TdHJpbmcoKSk7XG4gICAgICBpZiAoIW1vZHVsZS5kZWZhdWx0KVxuICAgICAgICB0aHJvdyBuZXcgRXJyb3IoYFN1YmRpcmVjdG9yeSAke3Njb3BlLlNDUklQVF9GSUxFLmJhc2VuYW1lKCl9IG5vdCBjb250YWluIGRlZmF1bHQgZnVuY3Rpb25gKTtcbiAgICAgIGNvbnN0IG1rID0gVXNlckNvbnRleHQuY3JlYXRlKHNjb3BlLCB0aGlzKTtcbiAgICAgIGNvbnN0IHJlc3VsdCA9IG1vZHVsZS5kZWZhdWx0KG1rKTtcbiAgICAgIGlmIChyZXN1bHQgaW5zdGFuY2VvZiBQcm9taXNlKVxuICAgICAgICBhd2FpdCByZXN1bHQ7XG4gICAgICBTY29wZUhlbHBlci5hcHBseVZhcmlhYmxlcyhzY29wZSwgbWspO1xuXG4gICAgICBwcm9jZXNzLmNoZGlyKGN3ZFNhdmUpO1xuICAgIH1cbiAgfVxuXG4gIHB1YmxpYyBjcmVhdGVHb2FscyhzY29wZTogYW55KSB7XG4gICAgZm9yIChjb25zdCBpdGVyIG9mIE9iamVjdC52YWx1ZXModGhpc1tVTktOT1dOX1RBUkdFVFNdKSkge1xuICAgICAgY29uc3QgdGFyZ2V0ID0gdGhpc1tUQVJHRVRTXS5nZXQoaXRlci5OQU1FKTtcbiAgICAgIHRhcmdldC5hZGRTb3VyY2VzKGl0ZXIuU09VUkNFUyk7XG4gICAgICB0YXJnZXQuSU5DTFVERVMucHVzaCguLi5pdGVyLklOQ0xVREVTKTtcbiAgICAgIHRhcmdldC5ERUZJTkVTLnB1c2goLi4uaXRlci5ERUZJTkVTKTtcbiAgICAgIHRhcmdldC5DT01QSUxFX09QVElPTlMucHVzaCguLi5pdGVyLkNPTVBJTEVfT1BUSU9OUyk7XG4gICAgICB0YXJnZXQuTElOS19PUFRJT05TLnB1c2goLi4uaXRlci5MSU5LX09QVElPTlMpO1xuICAgIH1cbiAgXG4gICAgZm9yIChjb25zdCBpdGVyIG9mIE9iamVjdC52YWx1ZXModGhpc1tJTlRFUkZBQ0VfU0NSSVBUU10pKSB7XG4gICAgICBjb25zdCBzY3JpcHQgPSB0aGlzW0NVU1RPTV9TQ1JJUFRTXS5nZXQoaXRlci5OQU1FKTtcbiAgICAgIGlmICghc2NyaXB0KVxuICAgICAgICB0aHJvdyBuZXcgRXJyb3IoYFRoZXJlIGlzIG5vIEN1c3RvbVNjcmlwdCBuYW1lZCAke2l0ZXIuTkFNRX1gKTtcbiAgICAgIGZvciAoY29uc3QgW2tleSwgdmFsc10gb2YgT2JqZWN0LmVudHJpZXMoaXRlci5QUk9QRVJUSUVTKSlcbiAgICAgICAgc2NyaXB0LmFkZFByb3BlcnR5KGtleSwgLi4udmFscyk7XG4gICAgfVxuICBcbiAgICBjb25zdCBnb2FsTGlzdCA9IEdvYWxDb2xsZWN0aW9uLmNyZWF0ZSgpO1xuICAgIGZvciAoY29uc3Qgc2NyaXB0IG9mIHRoaXNbQ1VTVE9NX1NDUklQVFNdLkVOVFJJRVMpIHsgICBcbiAgICAgIGNvbnN0IGRlcGVuZHMgPSBbXTtcbiAgICAgIGlmIChzY3JpcHQuU0NSSVBUIGluc3RhbmNlb2YgQWJzb2x1dGVQYXRoKVxuICAgICAgICBkZXBlbmRzLnB1c2goc2NyaXB0LlNDUklQVC50b1N0cmluZygpKTtcbiAgICAgIGlmIChzY3JpcHQuSU5QVVQpXG4gICAgICAgIGRlcGVuZHMucHVzaChzY3JpcHQuSU5QVVQudG9TdHJpbmcoKSk7XG4gICAgICBjb25zdCBtc2cgPSBcIlxceDFiWzM2bVwiICsgXCJHZW5lcmF0aW5nIFwiICsgc2NyaXB0LlRBUkdFVF9TQ09QRS5CSU5BUllfRElSLnJlbGF0aXZlKHNjcmlwdC5PVVRQVVQpICsgXCJcXHgxYlswbVwiO1xuICAgICAgY29uc3QgcGFyYW1zID0geyAuLi5zY3JpcHQuUFJPUEVSVElFUywgLi4uc2NyaXB0LlBBUkFNUyB9O1xuICAgICAgZ29hbExpc3QuYWRkU2NyaXB0KHNjcmlwdC5TQ1JJUFQsIFwiXCIsIGRlcGVuZHMsIHNjcmlwdC5PVVRQVVQudG9TdHJpbmcoKSwgcGFyYW1zLCBtc2cpO1xuICAgIH1cbiAgXG4gICAgZm9yIChjb25zdCBbbmFtZSwgdGFyZ2V0XSBvZiBPYmplY3QuZW50cmllcyh0aGlzW1RBUkdFVFNdLkVOVFJJRVMpIGFzIGFueSkge1xuICAgICAgY29uc3QgaGVhZGVycyA9IHRoaXNbVEFSR0VUU10uYWxsSGVhZGVyc09mKHRhcmdldCk7XG4gICAgICBjb25zdCBkZXBlbmRzID0gW107XG4gICAgICBmb3IgKGNvbnN0IHMgb2YgdGFyZ2V0LlNPVVJDRVMpIHtcbiAgICAgICAgaWYgKHMgaW5zdGFuY2VvZiBJbnRlcmZhY2VPYmplY3RzKSB7XG4gICAgICAgICAgY29uc3QgdCA9IHRoaXNbVEFSR0VUU10uZ2V0KHMudGFyZ2V0TmFtZSk7XG4gICAgICAgICAgZm9yIChjb25zdCBmIG9mIHQuU09VUkNFUykge1xuICAgICAgICAgICAgaWYgKGYgaW5zdGFuY2VvZiBTb3VyY2VGaWxlICYmIGYuT0JKRUNUX0ZJTEUpXG4gICAgICAgICAgICAgIGRlcGVuZHMucHVzaChmLk9CSkVDVF9GSUxFLnRvU3RyaW5nKCkpO1xuICAgICAgICAgIH1cbiAgICAgICAgICBjb250aW51ZTtcbiAgICAgICAgfVxuICBcbiAgICAgICAgaWYgKHMuSEVBREVSX0ZJTEVfT05MWSlcbiAgICAgICAgICBjb250aW51ZTtcbiAgXG4gICAgICAgIGZzLm1rZGlyU3luYyhzLk9CSkVDVF9GSUxFX0RJUi50b1N0cmluZygpLCB7IHJlY3Vyc2l2ZTogdHJ1ZSB9KTtcbiAgXG4gICAgICAgIGNvbnN0IHJlbGF0aXZlT2JqZWN0ID0gdGFyZ2V0LlRBUkdFVF9TQ09QRS5CSU5BUllfRElSLnJlbGF0aXZlKHMuT0JKRUNUX0ZJTEUpO1xuICAgICAgICBjb25zdCByZWxhdGl2ZUJpbmFyeURpciA9IHNjb3BlLlBST0pFQ1RfQklOQVJZX0RJUi5yZWxhdGl2ZSh0YXJnZXQuVEFSR0VUX1NDT1BFLkJJTkFSWV9ESVIpO1xuICAgICAgICBjb25zdCBtc2cgPSBcIlxceDFiWzMybVwiICsgYEJ1aWxkaW5nICR7cy5MQU5HVUFHRX0gb2JqZWN0ICR7cmVsYXRpdmVCaW5hcnlEaXJ9LyR7cmVsYXRpdmVPYmplY3R9YCArIFwiXFx4MWJbMG1cIjtcbiAgXG4gICAgICAgIGNvbnN0IGRlZmluaXRpb25zID0gW1xuICAgICAgICAgIC4uLnRoaXNbVEFSR0VUU10uYWxsRGVmaW5pdGlvbnNPZih0YXJnZXQpLFxuICAgICAgICAgIC4uLnMuREVGSU5FUyxcbiAgICAgICAgXTtcbiAgXG4gICAgICAgIGNvbnN0IGFyZ3MgPSBbXTtcbiAgICAgICAgYXJncy5wdXNoKC4uLmRlZmluaXRpb25zLm1hcChpID0+IFwiLURcIiArIGkpKTtcbiAgICAgICAgYXJncy5wdXNoKC4uLnRoaXNbVEFSR0VUU10uYWxsSW5jbHVkZXNPZih0YXJnZXQpLm1hcChpID0+IFwiLUlcIiArIGkpKTtcbiAgICAgICAgYXJncy5wdXNoKC4uLnRoaXNbVEFSR0VUU10uYWxsQ29tcGlsZU9wdGlvbnNPZih0YXJnZXQpKTtcbiAgICAgICAgaWYgKHRhcmdldC5QT1NJVElPTl9JTkRFUEVOREVOVF9DT0RFKVxuICAgICAgICAgIGFyZ3MucHVzaChcIi1mUElDXCIpO1xuICAgICAgICBhcmdzLnB1c2goLi4ucy5DT01QSUxFX0ZMQUdTLmZsYXQoKSk7XG4gICAgICAgIGFyZ3MucHVzaChcIi1vXCIsIHJlbGF0aXZlT2JqZWN0KTtcbiAgICAgICAgYXJncy5wdXNoKFwiLWNcIiwgcy5GSUxFKTtcbiAgICAgICAgY29uc3QgY3dkID0gdGFyZ2V0LlRBUkdFVF9TQ09QRS5CSU5BUllfRElSLnRvU3RyaW5nKCk7XG4gIFxuICAgICAgICBjb25zdCBjb21tYW5kID0gdGFyZ2V0LlRBUkdFVF9TQ09QRVtzLkxBTkdVQUdFICsgXCJfQ09NUElMRVJcIl0udG9TdHJpbmcoKTtcbiAgICAgICAgY29uc3Qgb3V0cHV0ID0gdGFyZ2V0LlRBUkdFVF9TQ09QRS5CSU5BUllfRElSLmpvaW4ocmVsYXRpdmVPYmplY3QpLnRvU3RyaW5nKCk7XG4gICAgICAgIGRlcGVuZHMucHVzaChvdXRwdXQpO1xuICBcbiAgICAgICAgZ29hbExpc3QuYWRkRXhlYyhvdXRwdXQsIFsgLi4uaGVhZGVycywgcy5GSUxFIF0sIGNvbW1hbmQsIGFyZ3MsIGN3ZCwgbXNnKTtcbiAgICAgIH1cbiAgXG4gICAgICBjb25zdCBsaW5rT3B0aW9ucyA9IHRoaXNbVEFSR0VUU10uYWxsTGlua09wdGlvbnNPZih0YXJnZXQpO1xuICAgICAgaWYgKHRhcmdldCBpbnN0YW5jZW9mIE9iamVjdExpYnJhcnkpIHtcbiAgICAgICAgY29uc3Qgb2JqcyA9IGRlcGVuZHMuZmlsdGVyKGkgPT4gaS5lbmRzV2l0aChcIi5vXCIpIHx8IGkuZW5kc1dpdGgoXCIub2JqXCIpKS5tYXAoaSA9PiB0YXJnZXQuRklMRV9ESVIucmVsYXRpdmUoaSkpO1xuICAgICAgICBpZiAob2Jqcy5sZW5ndGgpIHtcbiAgICAgICAgICBjb25zdCBhcmdzID0gW1xuICAgICAgICAgICAgLi4ubGlua09wdGlvbnMsXG4gICAgICAgICAgICBcIi1yXCIsXG4gICAgICAgICAgICBcIi1vXCIsIHRhcmdldC5GSUxFX05BTUUsXG4gICAgICAgICAgICAuLi5vYmpzXG4gICAgICAgICAgXTtcbiAgICAgICAgICBjb25zdCBjd2QgPSB0YXJnZXQuRklMRV9ESVIudG9TdHJpbmcoKTtcbiAgICAgICAgICBjb25zdCBtc2cgPSBgTGlua2luZyBDWFggb2JqZWN0IGxpYnJhcnkgJHt0YXJnZXQuRklMRV9OQU1FfWA7XG4gICAgICAgICAgZ29hbExpc3QuYWRkRXhlYyh0YXJnZXQuRklMRS50b1N0cmluZygpLCBkZXBlbmRzLCBzY29wZS5MSU5LRVIsIGFyZ3MsIGN3ZCwgbXNnKTtcbiAgICAgICAgfVxuICAgICAgICBlbHNlIHtcbiAgICAgICAgICBsb2dnZXIuaW5mbyhgTm8gb2JqZWN0cyBmb3IgXCIke3RhcmdldC5OQU1FfVwiYCk7XG4gICAgICAgIH1cbiAgICAgIH1cbiAgXG4gICAgICBpZiAodGFyZ2V0IGluc3RhbmNlb2YgU3RhdGljTGlicmFyeSkge1xuICAgICAgICBjb25zdCBvYmpzID0gZGVwZW5kcy5maWx0ZXIoaSA9PiBpLmVuZHNXaXRoKFwiLm9cIikgfHwgaS5lbmRzV2l0aChcIi5vYmpcIikpLm1hcChpID0+IHRhcmdldC5GSUxFX0RJUi5yZWxhdGl2ZShpKSk7XG4gICAgICAgIGlmIChvYmpzLmxlbmd0aCkge1xuICAgICAgICAgIGNvbnN0IGFyZ3MgPSBbIFwicmNcIiwgdGFyZ2V0LkZJTEVfTkFNRSAsIC4uLm9ianMgXTtcbiAgICAgICAgICBjb25zdCBjd2QgPSB0YXJnZXQuRklMRV9ESVIudG9TdHJpbmcoKTtcbiAgICAgICAgICBjb25zdCBtc2cgPSBgTGlua2luZyBDWFggc3RhdGljIGxpYnJhcnkgJHt0YXJnZXQuRklMRV9OQU1FfWA7XG4gICAgICAgICAgZ29hbExpc3QuYWRkRXhlYyh0YXJnZXQuRklMRS50b1N0cmluZygpLCBkZXBlbmRzLCBzY29wZS5BUiwgYXJncywgY3dkLCBtc2cpO1xuICAgICAgICB9XG4gICAgICAgIGVsc2Uge1xuICAgICAgICAgIGxvZ2dlci5pbmZvKGBObyBvYmplY3RzIGZvciBcIiR7dGFyZ2V0Lk5BTUV9XCJgKTtcbiAgICAgICAgfVxuICAgICAgfVxuICBcbiAgICAgIGlmICh0YXJnZXQgaW5zdGFuY2VvZiBTaGFyZWRMaWJyYXJ5KSB7XG4gICAgICAgIHRocm93IG5ldyBFcnJvcihcIk5vdCBpbXBsZW1lbnRlZFwiKTtcbiAgICAgIH1cbiAgXG4gICAgICBpZiAodGFyZ2V0IGluc3RhbmNlb2YgRXhlY3V0YWJsZSkge1xuICAgICAgICBjb25zdCBvYmpzID0gZGVwZW5kcy5maWx0ZXIoaSA9PiBpLmVuZHNXaXRoKFwiLm9cIikgfHwgaS5lbmRzV2l0aChcIi5vYmpcIikpLm1hcChpID0+IHRhcmdldC5GSUxFX0RJUi5yZWxhdGl2ZShpKSk7XG4gICAgICAgIGlmIChvYmpzLmxlbmd0aCkge1xuICAgICAgICAgIGNvbnN0IGxpYnMgPSB0aGlzW1RBUkdFVFNdLmFsbExpYnJhcmllc09mKHRhcmdldCk7XG4gICAgICAgICAgY29uc3QgYXJncyA9IFtcbiAgICAgICAgICAgIC4uLnRhcmdldC5UQVJHRVRfU0NPUEUuQ1hYX0ZMQUdTLFxuICAgICAgICAgICAgLi4ubGlua09wdGlvbnMsXG4gICAgICAgICAgICAuLi5vYmpzLFxuICAgICAgICAgICAgXCItb1wiLCB0YXJnZXQuRklMRV9OQU1FLFxuICAgICAgICAgICAgLi4ubGlicy5tYXAoaSA9PiB0YXJnZXQuRklMRV9ESVIucmVsYXRpdmUoaSkpLFxuICAgICAgICAgIF07XG4gICAgICAgICAgY29uc3QgY3dkID0gdGFyZ2V0LkZJTEVfRElSLnRvU3RyaW5nKCk7XG4gICAgICAgICAgY29uc3QgbXNnID0gYExpbmtpbmcgQ1hYIGV4ZWN1dGFibGUgJHt0YXJnZXQuRklMRV9OQU1FfWA7XG4gICAgICAgICAgZ29hbExpc3QuYWRkRXhlYyh0YXJnZXQuRklMRS50b1N0cmluZygpLCBkZXBlbmRzLmNvbmNhdChsaWJzKSwgc2NvcGUuQ1hYX0NPTVBJTEVSLCBhcmdzLCBjd2QsIG1zZyk7XG4gICAgICAgIH1cbiAgICAgICAgZWxzZSB7XG4gICAgICAgICAgbG9nZ2VyLmluZm8oYE5vIG9iamVjdHMgZm9yIFwiJHt0YXJnZXQuTkFNRX1cImApO1xuICAgICAgICB9XG4gICAgICB9XG4gIFxuICAgICAgZ29hbExpc3QuYWRkVGFyZ2V0KG5hbWUsIFsgdGFyZ2V0LkZJTEUudG9TdHJpbmcoKSBdLCBgQnVpbHQgdGFyZ2V0ICR7bmFtZX1gKTtcbiAgICB9XG4gIFxuICAgIGNvbnN0IGluc3RhbGxfZmlsZXMgPSBbXTtcbiAgICBmb3IgKGNvbnN0IGl0ZXIgb2YgdGhpc1tJTlNUQUxMX0xJU1RdKSB7XG4gICAgICBsZXQgc3JjLCBkZXN0O1xuICAgICAgaWYgKGl0ZXIuVkFMVUUgaW5zdGFuY2VvZiBBYnNvbHV0ZVBhdGgpIHtcbiAgICAgICAgaWYgKHNjb3BlLlBSRVZFTlRfSU5TVEFMTF9GSUxFUylcbiAgICAgICAgICBjb250aW51ZTtcbiAgICAgICAgc3JjID0gaXRlci5WQUxVRS50b1N0cmluZygpO1xuICAgICAgICBjb25zdCByZmlsZSA9IChpdGVyLkJBU0VfRElSIGFzIGFueSkucmVsYXRpdmUoaXRlci5WQUxVRSk7XG4gICAgICAgIGRlc3QgPSBpdGVyLkRFU1RJTkFUSU9OLmpvaW4ocmZpbGUpO1xuICAgICAgfVxuICAgICAgZWxzZSBpZiAoaXRlci5WQUxVRSBpbnN0YW5jZW9mIEludGVyZmFjZVRhcmdldCkge1xuICAgICAgICBjb25zdCB0YXJnZXQgPSB0aGlzW1RBUkdFVFNdLmdldChpdGVyLlZBTFVFLnRhcmdldE5hbWUpO1xuICAgICAgICBzcmMgPSB0YXJnZXQuRklMRS50b1N0cmluZygpO1xuICAgICAgICBkZXN0ID0gaXRlci5ERVNUSU5BVElPTi5qb2luKHRhcmdldC5GSUxFX05BTUUpO1xuICAgICAgfVxuICAgICAgZWxzZSB7XG4gICAgICAgIHRocm93IG5ldyBFcnJvcihgQ2FuIG5vdCBpbnN0YWxsICR7aXRlci5WQUxVRX1gKVxuICAgICAgfVxuICAgICAgaWYgKHNjb3BlLkRFU1RESVIpXG4gICAgICAgIGRlc3QgPSBzY29wZS5ERVNURElSLmpvaW4oZGVzdCkudG9TdHJpbmcoKTtcbiAgICAgIGdvYWxMaXN0LmFkZFNjcmlwdChpbnN0YWxsX3NjcmlwdCwgXCJcIiwgWyBzcmMgXSwgZGVzdCwge3NyYywgZGVzdH0sIFwiXCIpO1xuICAgICAgaW5zdGFsbF9maWxlcy5wdXNoKGRlc3QpO1xuICAgIH1cbiAgXG4gICAgaWYgKGluc3RhbGxfZmlsZXMubGVuZ3RoKSB7XG4gICAgICBnb2FsTGlzdC5hZGRUYXJnZXQoSU5TVEFMTF9UQVJHRVQsIGluc3RhbGxfZmlsZXMsIFwiXCIpO1xuICAgIH1cbiAgXG4gICAgZ29hbExpc3QuYWRkVGFyZ2V0KEFMTF9UQVJHRVQsIE9iamVjdC5rZXlzKHRoaXNbVEFSR0VUU10uRU5UUklFUyksIFwiXCIpO1xuICBcbiAgICByZXR1cm4gZ29hbExpc3Q7XG4gIH1cblxuICBwdWJsaWMgdG9KU09OKCk6IG9iamVjdCB7XG4gICAgcmV0dXJuIHtcbiAgICAgIFRBUkdFVFM6IHRoaXMuVEFSR0VUUyxcbiAgICAgIENVU1RPTV9TQ1JJUFRTOiB0aGlzW0NVU1RPTV9TQ1JJUFRTXSxcbiAgICAgIENBQ0hFOiB0aGlzLkNBQ0hFLFxuICAgICAgVU5LTk9XTl9UQVJHRVRTOiB0aGlzLlVOS05PV05fVEFSR0VUUyxcbiAgICAgIElOVEVSRkFDRV9TQ1JJUFRTOiB0aGlzLklOVEVSRkFDRV9TQ1JJUFRTLFxuICAgICAgSU5TVEFMTF9MSVNUOiB0aGlzW0lOU1RBTExfTElTVF0sXG4gICAgICBTQ1JJUFRfVkFSSUFCTEVTX01BUDogdGhpcy5TQ1JJUFRfVkFSSUFCTEVTX01BUCxcbiAgICAgIFNVQkRJUl9BTElBUzogdGhpcy5TVUJESVJfQUxJQVMsXG4gICAgfTtcbiAgfVxufTtcbiIsIi8qXG4gKiBNSVQgTGljZW5zZVxuICpcbiAqIENvcHlyaWdodCAoYykgMjAyNSAgWXVyaWkgWWFrdWJpbiAoeXVyaWkueWFrdWJpbkBnbWFpbC5jb20pXG4gKlxuICogUGVybWlzc2lvbiBpcyBncmFudGVkIHRvIHVzZSwgY29weSwgbW9kaWZ5LCBhbmQgZGlzdHJpYnV0ZSB0aGlzIHNvZnR3YXJlXG4gKiB1bmRlciB0aGUgTUlUIExpY2Vuc2UuIFNlZSBMSUNFTlNFIGZpbGUgZm9yIGRldGFpbHMuXG4gKi9cblxuaW1wb3J0IHBhdGggZnJvbSBcIm5vZGU6cGF0aFwiO1xuaW1wb3J0IGZzIGZyb20gXCJub2RlOmZzXCI7XG5pbXBvcnQgeyBzcGF3blN5bmMgfSBmcm9tIFwibm9kZTpjaGlsZF9wcm9jZXNzXCI7XG5cbmltcG9ydCB7IEFic29sdXRlUGF0aCB9IGZyb20gXCJAL2NvcmUvUGF0aFwiO1xuaW1wb3J0IHsgaW1wb3J0TW9kdWxlIH0gZnJvbSBcIkAvdXRpbHMvTW9kdWxlXCI7XG5cbmNvbnN0IEVOVFJJRVMgPSBTeW1ib2woXCJFTlRSSUVTXCIpO1xuXG5lbnVtIEdvYWxUeXBlIHtcbiAgU0NSSVBUID0gXCJzY3JpcHRcIixcbiAgRVhFQyA9IFwiZXhlY1wiLFxuICBUQVJHRVQgPSBcInRhcmdldFwiLFxufTtcblxuaW50ZXJmYWNlIEJhc2VHb2FsIHtcbiAgbmFtZTogc3RyaW5nO1xuICB0eXBlOiBHb2FsVHlwZTtcbiAgZGVwZW5kczogQXJyYXk8c3RyaW5nPjtcbiAgbXNnOiBzdHJpbmc7XG4gIG91dHB1dDogc3RyaW5nO1xufTtcblxuaW50ZXJmYWNlIFNjcmlwdEdvYWwgZXh0ZW5kcyBCYXNlR29hbCB7XG4gIHNjcmlwdDogQWJzb2x1dGVQYXRoIHwgRnVuY3Rpb247XG4gIHBhcmFtczogYW55O1xufTtcblxuaW50ZXJmYWNlIEV4ZWNHb2FsIGV4dGVuZHMgQmFzZUdvYWwge1xuICBjb21tYW5kOiBzdHJpbmc7XG4gIGFyZ3M6IEFycmF5PHN0cmluZz47XG4gIGN3ZDogc3RyaW5nO1xufTtcblxuZnVuY3Rpb24gc2NvcGVWYWx1ZUFzUHJpbWl0aXZlcyhvOiBhbnkpOiBhbnkge1xuICBpZiAodHlwZW9mIG8gPT09IFwidW5kZWZpbmVkXCIpXG4gICAgcmV0dXJuIG87XG4gIGlmICh0eXBlb2YgbyA9PT0gXCJib29sZWFuXCIpXG4gICAgcmV0dXJuIG87XG4gIGlmICh0eXBlb2YgbyA9PT0gXCJudW1iZXJcIilcbiAgICByZXR1cm4gbztcbiAgaWYgKHR5cGVvZiBvID09PSBcInN0cmluZ1wiKVxuICAgIHJldHVybiBvO1xuICBpZiAodHlwZW9mIG8gPT09IFwib2JqZWN0XCIpIHtcbiAgICBpZiAoIW8pXG4gICAgICByZXR1cm4gbztcbiAgICBpZiAobyBpbnN0YW5jZW9mIEFic29sdXRlUGF0aCkge1xuICAgICAgcmV0dXJuIG8udG9TdHJpbmcoKTtcbiAgICB9XG4gICAgaWYgKG8gaW5zdGFuY2VvZiBBcnJheSkge1xuICAgICAgY29uc3QgcmVzdWx0ID0gW107XG4gICAgICBmb3IgKGNvbnN0IGkgb2YgbylcbiAgICAgICAgcmVzdWx0LnB1c2goc2NvcGVWYWx1ZUFzUHJpbWl0aXZlcyhpKSk7XG4gICAgICByZXR1cm4gcmVzdWx0O1xuICAgIH1cbiAgICBpZiAobyBpbnN0YW5jZW9mIE9iamVjdCkge1xuICAgICAgY29uc3QgcmVzdWx0OiBhbnkgPSB7fTtcbiAgICAgIGZvciAoY29uc3QgW2ssdl0gb2YgT2JqZWN0LmVudHJpZXMobykpXG4gICAgICAgIHJlc3VsdFtrXSA9IHNjb3BlVmFsdWVBc1ByaW1pdGl2ZXModik7XG4gICAgICByZXR1cm4gcmVzdWx0O1xuICAgIH1cbiAgfVxuICB0aHJvdyBuZXcgRXJyb3IoYFVua25vd24gaW5zdGFuY2Ugb2YgJHtvfWApO1xufVxuXG5leHBvcnQgY2xhc3MgR29hbENvbGxlY3Rpb24ge1xuICBwcml2YXRlIFtFTlRSSUVTXTogQXJyYXk8QmFzZUdvYWw+O1xuXG4gIHByaXZhdGUgY29uc3RydWN0b3IoKSB7XG4gICAgdGhpc1tFTlRSSUVTXSA9IG5ldyBBcnJheTxCYXNlR29hbD47XG4gIH1cblxuICBwdWJsaWMgZ2V0IEVOVFJJRVMoKSB7XG4gICAgcmV0dXJuIHRoaXNbRU5UUklFU107XG4gIH1cblxuICBwdWJsaWMgc3RhdGljIGNyZWF0ZSgpIHtcbiAgICByZXR1cm4gT2JqZWN0LnNlYWwobmV3IEdvYWxDb2xsZWN0aW9uKTtcbiAgfVxuXG4gIHB1YmxpYyBmaW5kU2NyaXB0QnlPdXRwdXQob3V0cHV0OiBzdHJpbmcpOiBCYXNlR29hbCB8IHVuZGVmaW5lZCB7XG4gICAgaWYgKCFvdXRwdXQpXG4gICAgICByZXR1cm4gdW5kZWZpbmVkO1xuICAgIHJldHVybiB0aGlzW0VOVFJJRVNdLmZpbmQoKGkpID0+IGkudHlwZSA9PT0gR29hbFR5cGUuU0NSSVBUICYmIGkub3V0cHV0ID09PSBvdXRwdXQpO1xuICB9XG5cbiAgcHVibGljIGhhc1NjcmlwdEJ5T3V0cHV0KG91dHB1dDogc3RyaW5nKTogYm9vbGVhbiB7XG4gICAgcmV0dXJuICEhdGhpcy5maW5kU2NyaXB0QnlPdXRwdXQob3V0cHV0KTtcbiAgfVxuXG4gIHB1YmxpYyBhZGRTY3JpcHQoc2NyaXB0OiBBYnNvbHV0ZVBhdGggfCBGdW5jdGlvbiwgbmFtZTogc3RyaW5nLCBkZXBlbmRzOiBBcnJheTxzdHJpbmc+LCBvdXRwdXQ6IHN0cmluZywgcGFyYW1zOiBhbnksIG1zZzogc3RyaW5nKSB7XG4gICAgaWYgKHRoaXMuaGFzU2NyaXB0QnlPdXRwdXQob3V0cHV0LnRvU3RyaW5nKCkpKVxuICAgICAgdGhyb3cgbmV3IEVycm9yKGBPdXRwdXQgXCIke291dHB1dH1cIiBleGlzdHNgKTtcbiAgICB0aGlzW0VOVFJJRVNdLnB1c2goeyBuYW1lLCB0eXBlOiBHb2FsVHlwZS5TQ1JJUFQsIHNjcmlwdCwgb3V0cHV0LCBkZXBlbmRzLCBwYXJhbXMsIG1zZyB9IGFzIFNjcmlwdEdvYWwpO1xuICB9XG5cbiAgcHVibGljIGFkZEV4ZWMob3V0cHV0OiBzdHJpbmcsIGRlcGVuZHM6IEFycmF5PHN0cmluZz4sIGNvbW1hbmQ6IHN0cmluZywgYXJnczogQXJyYXk8c3RyaW5nPiwgY3dkOiBzdHJpbmcsIG1zZzogc3RyaW5nKSB7XG4gICAgdGhpc1tFTlRSSUVTXS5wdXNoKHsgbmFtZTogXCJcIiwgdHlwZTogR29hbFR5cGUuRVhFQywgZGVwZW5kcywgb3V0cHV0LCBjb21tYW5kLCBhcmdzLCBjd2QsIG1zZyB9IGFzIEV4ZWNHb2FsKTtcbiAgfVxuXG4gIHB1YmxpYyBhZGRUYXJnZXQobmFtZTogc3RyaW5nLCBkZXBlbmRzOiBBcnJheTxzdHJpbmc+LCBtc2c6IHN0cmluZykge1xuICAgIHRoaXNbRU5UUklFU10ucHVzaCh7IG5hbWUsIHR5cGU6IEdvYWxUeXBlLlRBUkdFVCwgZGVwZW5kcywgbXNnLCBvdXRwdXQ6IFwiXCIgfSk7XG4gIH1cblxuICBwdWJsaWMgZ2V0VGFyZ2V0KG5hbWU6IHN0cmluZyk6IEJhc2VHb2FsIHwgdW5kZWZpbmVkIHtcbiAgICByZXR1cm4gdGhpc1tFTlRSSUVTXS5maW5kKChpKSA9PiBpLnR5cGUgPT09IEdvYWxUeXBlLlRBUkdFVCAmJiBpLm5hbWUgPT09IG5hbWUpO1xuICB9XG5cbiAgcHJpdmF0ZSBhZGRUYXJnZXRMaXN0SW1wbChuYW1lOiBzdHJpbmcsIHJlc3VsdDogQXJyYXk8QmFzZUdvYWw+KSB7XG4gICAgaWYgKHJlc3VsdC5maW5kKGkgPT4gaS5uYW1lID09PSBuYW1lIHx8IGkub3V0cHV0ID09PSBuYW1lKSkge1xuICAgICAgcmV0dXJuO1xuICAgIH1cbiAgXG4gICAgY29uc3QgZ29hbCA9IHRoaXNbRU5UUklFU10uZmluZChpID0+IGkubmFtZSA9PT0gbmFtZSB8fCBpLm91dHB1dCA9PT0gbmFtZSk7XG4gICAgaWYgKCFnb2FsKSB7XG4gICAgICByZXR1cm47XG4gICAgfVxuICBcbiAgICBmb3IgKGNvbnN0IGl0ZXIgb2YgZ29hbC5kZXBlbmRzKSB7XG4gICAgICB0aGlzLmFkZFRhcmdldExpc3RJbXBsKGl0ZXIudG9TdHJpbmcoKSwgcmVzdWx0KTtcbiAgICB9XG4gIFxuICAgIHJlc3VsdC5wdXNoKGdvYWwpO1xuICB9XG4gIFxuICBwdWJsaWMgZ2V0VGFyZ2V0TGlzdChuYW1lOnN0cmluZykge1xuICAgIGNvbnN0IHJlc3VsdCA9IG5ldyBBcnJheTxCYXNlR29hbD47XG4gICAgdGhpcy5hZGRUYXJnZXRMaXN0SW1wbChuYW1lLCByZXN1bHQpO1xuICAgIHJldHVybiByZXN1bHQ7XG4gIH1cbiAgXG4gIHB1YmxpYyB0b0pTT04oKSB7XG4gICAgcmV0dXJuIHRoaXNbRU5UUklFU107XG4gIH1cblxuICBwdWJsaWMgc3RhdGljIGFzeW5jIGJ1aWxkR29hbHMoY29sbGVjdGlvbjogQXJyYXk8QmFzZUdvYWw+KSB7XG4gICAgbGV0IG1zZ0NvdW50ID0gMDtcbiAgICBmb3IgKGNvbnN0IGl0ZXIgb2YgY29sbGVjdGlvbilcbiAgICAgIG1zZ0NvdW50ICs9IGl0ZXIubXNnID8gMSA6IDA7XG4gIFxuICAgIGxldCBtc2dJbmRleCA9IDA7XG4gICAgZm9yIChjb25zdCBnb2FsIG9mIGNvbGxlY3Rpb24pIHtcbiAgICAgIGNvbnN0IHsgdHlwZSwgbXNnIH0gPSBnb2FsO1xuICAgICAgaWYgKG1zZykge1xuICAgICAgICBjb25zdCByZWxhdGlvbk9mTGVuZ3RoID0gTWF0aC5yb3VuZCgoKyttc2dJbmRleCAvIG1zZ0NvdW50KSAqIDEwMCk7XG4gICAgICAgIGNvbnN0IHBlcmNlbnQgPSBcIltcIiArIHJlbGF0aW9uT2ZMZW5ndGgudG9TdHJpbmcoKS5wYWRTdGFydCgzLCBcIiBcIikgKyBcIiVdIFwiO1xuICAgICAgICBjb25zb2xlLmluZm8ocGVyY2VudCArIG1zZyk7XG4gICAgICB9XG4gICAgICBpZiAodHlwZSA9PT0gR29hbFR5cGUuU0NSSVBUKSB7XG4gICAgICAgIGNvbnN0IHsgc2NyaXB0LCBwYXJhbXMgfSA9IGdvYWwgYXMgU2NyaXB0R29hbDtcbiAgICAgICAgbGV0IG1vZHVsZTtcbiAgICAgICAgaWYgKHR5cGVvZiBzY3JpcHQgPT09IFwiZnVuY3Rpb25cIilcbiAgICAgICAgICBtb2R1bGUgPSBzY3JpcHQ7XG4gICAgICAgIGVsc2VcbiAgICAgICAgICBtb2R1bGUgPSAoYXdhaXQgaW1wb3J0TW9kdWxlKHNjcmlwdC50b1N0cmluZygpKSkuZGVmYXVsdDtcbiAgICAgICAgY29uc3QgcmVzdWx0ID0gbW9kdWxlKHNjb3BlVmFsdWVBc1ByaW1pdGl2ZXMocGFyYW1zKSk7XG4gICAgICAgIGlmIChyZXN1bHQgaW5zdGFuY2VvZiBQcm9taXNlKSB7XG4gICAgICAgICAgYXdhaXQgcmVzdWx0O1xuICAgICAgICB9XG4gICAgICB9XG4gICAgICBlbHNlIGlmICh0eXBlID09PSBHb2FsVHlwZS5FWEVDKSB7XG4gICAgICAgIGNvbnN0IHsgY29tbWFuZCwgYXJncywgY3dkLCBvdXRwdXQgfSA9IGdvYWwgYXMgRXhlY0dvYWw7XG4gICAgICAgIGZzLm1rZGlyU3luYyhwYXRoLnBvc2l4LmRpcm5hbWUob3V0cHV0KSwgeyByZWN1cnNpdmU6IHRydWUgfSk7XG4gICAgICAgIGNvbnN0IHJlc3VsdCA9IHNwYXduU3luYyhjb21tYW5kLCBhcmdzLCB7IGN3ZCwgZW5jb2Rpbmc6IFwidXRmLThcIiB9KTtcbiAgICAgICAgaWYgKHJlc3VsdC5lcnJvciB8fCByZXN1bHQuc3RhdHVzKSB7XG4gICAgICAgICAgY29uc29sZS5pbmZvKFwiY2QgXCIgKyBjd2QpO1xuICAgICAgICAgIGxldCBjbWQgPSBhcmdzLmpvaW4oXCIgXCIpO1xuICAgICAgICAgIGNtZCA9IGNvbW1hbmQgKyAoY21kID8gXCIgXCIgOiBcIlwiKSArIGNtZDtcbiAgICAgICAgICBjb25zb2xlLmluZm8oY21kKTtcbiAgICAgICAgICBjb25zb2xlLmluZm8oXCJcIik7XG4gIFxuICAgICAgICAgIGNvbnNvbGUuZXJyb3IocmVzdWx0LnN0ZGVycik7XG5cbiAgICAgICAgICBpZiAocmVzdWx0LmVycm9yKVxuICAgICAgICAgICAgICB0aHJvdyByZXN1bHQuZXJyb3I7XG4gIFxuICAgICAgICAgIHRocm93IG5ldyBFcnJvcihyZXN1bHQuZXJyb3IgYXMgYW55IHx8IFwiU3RhdHVzIFwiICsgcmVzdWx0LnN0YXR1cyk7XG4gICAgICAgIH1cbiAgICAgIH1cbiAgICAgIGVsc2UgaWYgKHR5cGUgPT09IEdvYWxUeXBlLlRBUkdFVCkge1xuICAgICAgfVxuICAgIH1cbiAgfVxufTtcbiIsIi8qXG4gKiBNSVQgTGljZW5zZVxuICpcbiAqIENvcHlyaWdodCAoYykgMjAyNSAgWXVyaWkgWWFrdWJpbiAoeXVyaWkueWFrdWJpbkBnbWFpbC5jb20pXG4gKlxuICogUGVybWlzc2lvbiBpcyBncmFudGVkIHRvIHVzZSwgY29weSwgbW9kaWZ5LCBhbmQgZGlzdHJpYnV0ZSB0aGlzIHNvZnR3YXJlXG4gKiB1bmRlciB0aGUgTUlUIExpY2Vuc2UuIFNlZSBMSUNFTlNFIGZpbGUgZm9yIGRldGFpbHMuXG4gKi9cblxuaW1wb3J0IHsgQWJzb2x1dGVQYXRoIH0gZnJvbSBcIkAvY29yZS9QYXRoXCI7XG5cbmNvbnN0IE5BTUUgPSBTeW1ib2woXCJOQU1FXCIpO1xuY29uc3QgUEFUSCA9IFN5bWJvbChcIlBBVEhcIik7XG5cbmV4cG9ydCBjbGFzcyBJbmNsdWRlRGlyZWN0b3J5IHtcbiAgcHJpdmF0ZSBbTkFNRV06IHN0cmluZztcbiAgcHJpdmF0ZSBbUEFUSF06IEFic29sdXRlUGF0aDtcblxuICBwcml2YXRlIGNvbnN0cnVjdG9yKGRpcm5hbWU6IGFueSwgYmFzZURpcjogQWJzb2x1dGVQYXRoKSB7XG4gICAgdGhpc1tOQU1FXSA9IGRpcm5hbWUudG9TdHJpbmcoKTtcbiAgICB0aGlzW1BBVEhdID0gYmFzZURpci5yZXNvbHZlKGRpcm5hbWUpO1xuICB9XG5cbiAgcHVibGljIHN0YXRpYyBjcmVhdGUoZGlybmFtZTogYW55LCBiYXNlRGlyOiBBYnNvbHV0ZVBhdGgpIHtcbiAgICByZXR1cm4gT2JqZWN0LnNlYWwobmV3IEluY2x1ZGVEaXJlY3RvcnkoZGlybmFtZSwgYmFzZURpcikpO1xuICB9XG5cbiAgZ2V0IE5BTUUoKSB7XG4gICAgcmV0dXJuIHRoaXNbTkFNRV07XG4gIH1cblxuICBnZXQgUEFUSCgpIHtcbiAgICByZXR1cm4gdGhpc1tQQVRIXTtcbiAgfVxuXG4gIHRvU3RyaW5nKCkge1xuICAgIHJldHVybiB0aGlzW1BBVEhdLnRvU3RyaW5nKCk7XG4gIH1cblxuICB0b0pTT04oKTogb2JqZWN0IHtcbiAgICByZXR1cm4ge1xuICAgICAgTkFNRTogdGhpcy5OQU1FLFxuICAgICAgUEFUSDogdGhpcy5QQVRILFxuICAgIH1cbiAgfVxufTtcbiIsIi8qXG4gKiBNSVQgTGljZW5zZVxuICpcbiAqIENvcHlyaWdodCAoYykgMjAyNSAgWXVyaWkgWWFrdWJpbiAoeXVyaWkueWFrdWJpbkBnbWFpbC5jb20pXG4gKlxuICogUGVybWlzc2lvbiBpcyBncmFudGVkIHRvIHVzZSwgY29weSwgbW9kaWZ5LCBhbmQgZGlzdHJpYnV0ZSB0aGlzIHNvZnR3YXJlXG4gKiB1bmRlciB0aGUgTUlUIExpY2Vuc2UuIFNlZSBMSUNFTlNFIGZpbGUgZm9yIGRldGFpbHMuXG4gKi9cblxuaW1wb3J0IHsgSW50ZXJmYWNlVGFyZ2V0IH0gZnJvbSBcIkAvY29yZS9JbnRlcmZhY2VUYXJnZXRcIjtcbmltcG9ydCB7IERpclBhdGgsIEZpbGVQYXRoLCBBYnNvbHV0ZVBhdGggfSBmcm9tIFwiQC9jb3JlL1BhdGhcIjtcbmltcG9ydCB7IFN5c3RlbVNjb3BlIH0gZnJvbSBcIkAvY29yZS9TeXN0ZW1TY29wZVwiO1xuXG5jb25zdCBWQUxVRSAgICAgICA9IFN5bWJvbChcIlZBTFVFXCIpO1xuY29uc3QgREVTVElOQVRJT04gPSBTeW1ib2woXCJERVNUSU5BVElPTlwiKTtcbmNvbnN0IEJBU0VfRElSICAgID0gU3ltYm9sKFwiQkFTRV9ESVJcIik7XG5cbmV4cG9ydCBjbGFzcyBJbnN0YWxsRW50aXR5IHtcbiAgcHJpdmF0ZSBbVkFMVUVdOiBBYnNvbHV0ZVBhdGggfCBJbnRlcmZhY2VUYXJnZXQ7XG4gIHByaXZhdGUgW0RFU1RJTkFUSU9OXTogRGlyUGF0aDtcbiAgcHJpdmF0ZSBbQkFTRV9ESVJdOiBEaXJQYXRoIHwgbnVsbDtcblxuICBwcml2YXRlIGNvbnN0cnVjdG9yKHNjb3BlOiBTeXN0ZW1TY29wZSwgdmFsdWU6IHN0cmluZyB8IEFic29sdXRlUGF0aCB8IEludGVyZmFjZVRhcmdldCwgcGFyYW1zOiBzdHJpbmcgfCBhbnkpIHtcbiAgICBsZXQgZGVzdGluYXRpb246IHN0cmluZyB8IEFic29sdXRlUGF0aCB8IHVuZGVmaW5lZDtcbiAgICBsZXQgYmFzZURpcjtcbiAgICBpZiAodHlwZW9mIHBhcmFtcyA9PT0gXCJzdHJpbmdcIilcbiAgICAgIGRlc3RpbmF0aW9uID0gcGFyYW1zO1xuICAgIGVsc2UgaWYgKHBhcmFtcykge1xuICAgICAgZGVzdGluYXRpb24gPSBwYXJhbXMuZGVzdGluYXRpb247XG4gICAgICBiYXNlRGlyID0gcGFyYW1zLmJhc2VEaXI7XG4gICAgfVxuICBcbiAgICBpZiAoIWRlc3RpbmF0aW9uKVxuICAgICAgdGhyb3cgbmV3IEVycm9yKGBQYXJhbWV0ZXIgZGVzdGluYXRpb24gaXMgbm90IHNwZWNpZmllZGApO1xuICBcbiAgICBpZiAoYmFzZURpcilcbiAgICAgIGJhc2VEaXIgPSBzY29wZS5TT1VSQ0VfRElSLnJlc29sdmUoYmFzZURpcik7XG4gIFxuICAgIGlmICh0eXBlb2YgdmFsdWUgPT09IFwic3RyaW5nXCIgfHwgdmFsdWUgaW5zdGFuY2VvZiBBYnNvbHV0ZVBhdGgpIHtcbiAgICAgIHZhbHVlID0gc2NvcGUuU09VUkNFX0RJUi5yZXNvbHZlKHZhbHVlLnRvU3RyaW5nKCkpIGFzIEFic29sdXRlUGF0aDtcbiAgICAgIHZhbHVlID0gRmlsZVBhdGguY3JlYXRlKHZhbHVlKTtcbiAgICAgIGJhc2VEaXIgPSBiYXNlRGlyIHx8IHZhbHVlLmRpcm5hbWUoKTtcbiAgICB9XG4gICAgZWxzZSBpZiAoISh2YWx1ZSBpbnN0YW5jZW9mIEludGVyZmFjZVRhcmdldCkpIHtcbiAgICAgIHRocm93IG5ldyBFcnJvcihgTm90IHN1cHBvcnRldCB2YWx1ZSBvZiAke3ZhbHVlfWApO1xuICAgIH1cbiAgXG4gICAgdGhpc1tWQUxVRV0gPSB2YWx1ZTtcbiAgICB0aGlzW0RFU1RJTkFUSU9OXSA9IERpclBhdGguY3JlYXRlKHNjb3BlLklOU1RBTExfUFJFRklYLnJlc29sdmUoZGVzdGluYXRpb24udG9TdHJpbmcoKSkudG9TdHJpbmcoKSk7XG4gICAgdGhpc1tCQVNFX0RJUl0gPSBiYXNlRGlyID8gRGlyUGF0aC5jcmVhdGUoYmFzZURpci50b1N0cmluZygpKSA6IG51bGw7XG4gIH1cbiAgXG4gIHB1YmxpYyBzdGF0aWMgY3JlYXRlKHNjb3BlOiBhbnksIHZhbHVlOiBzdHJpbmcgfCBBYnNvbHV0ZVBhdGggfCBJbnRlcmZhY2VUYXJnZXQsIHBhcmFtczogc3RyaW5nIHwgYW55KSB7XG4gICAgcmV0dXJuIE9iamVjdC5zZWFsKG5ldyBJbnN0YWxsRW50aXR5KHNjb3BlLCB2YWx1ZSwgcGFyYW1zKSk7XG4gIH1cblxuICBwdWJsaWMgZ2V0IFZBTFVFICgpIHtcbiAgICByZXR1cm4gdGhpc1tWQUxVRV07XG4gIH1cblxuICBwdWJsaWMgZ2V0IERFU1RJTkFUSU9OICgpIHtcbiAgICByZXR1cm4gdGhpc1tERVNUSU5BVElPTl07XG4gIH1cblxuICBwdWJsaWMgZ2V0IEJBU0VfRElSICgpIHtcbiAgICByZXR1cm4gdGhpc1tCQVNFX0RJUl07XG4gIH1cblxuICBwdWJsaWMgdG9KU09OKCk6IG9iamVjdCB7XG4gICAgcmV0dXJuIHtcbiAgICAgIFZBTFVFOiB0aGlzLlZBTFVFLFxuICAgICAgREVTVElOQVRJT046IHRoaXMuREVTVElOQVRJT04sXG4gICAgICBCQVNFX0RJUjogdGhpcy5CQVNFX0RJUixcbiAgICB9O1xuICB9XG59O1xuIiwiLypcbiAqIE1JVCBMaWNlbnNlXG4gKlxuICogQ29weXJpZ2h0IChjKSAyMDI1ICBZdXJpaSBZYWt1YmluICh5dXJpaS55YWt1YmluQGdtYWlsLmNvbSlcbiAqXG4gKiBQZXJtaXNzaW9uIGlzIGdyYW50ZWQgdG8gdXNlLCBjb3B5LCBtb2RpZnksIGFuZCBkaXN0cmlidXRlIHRoaXMgc29mdHdhcmVcbiAqIHVuZGVyIHRoZSBNSVQgTGljZW5zZS4gU2VlIExJQ0VOU0UgZmlsZSBmb3IgZGV0YWlscy5cbiAqL1xuXG5jb25zdCBOQU1FID0gU3ltYm9sKFwiTkFNRVwiKTtcblxuZXhwb3J0IGNsYXNzIEludGVyZmFjZUluY2x1ZGVzIHtcbiAgcHJpdmF0ZSBbTkFNRV06IHN0cmluZztcblxuICBwcml2YXRlIGNvbnN0cnVjdG9yKG5hbWU6IHN0cmluZykge1xuICAgIHRoaXNbTkFNRV0gPSBuYW1lO1xuICB9XG5cbiAgcHVibGljIGdldCB0YXJnZXROYW1lKCkge1xuICAgIHJldHVybiB0aGlzW05BTUVdO1xuICB9XG5cbiAgcHVibGljIHRvU3RyaW5nKCk6IHN0cmluZyB7XG4gICAgcmV0dXJuIFwiJHtcIiArIHRoaXNbTkFNRV0gKyBcIi5pbmNsdWRlc31cIjtcbiAgfVxuXG4gIHB1YmxpYyB0b0pTT04oKSB7XG4gICAgcmV0dXJuIHRoaXMudG9TdHJpbmcoKTtcbiAgfVxuXG4gIHB1YmxpYyBzdGF0aWMgY3JlYXRlKG5hbWU6IHN0cmluZykge1xuICAgIHJldHVybiBPYmplY3Quc2VhbChuZXcgSW50ZXJmYWNlSW5jbHVkZXMobmFtZSkpO1xuICB9XG5cbiAgcHVibGljIHN0YXRpYyBlbnN1cmVJbnN0YW5jZSh2YWx1ZTogYW55KSB7XG4gICAgaWYgKHZhbHVlIGluc3RhbmNlb2YgSW50ZXJmYWNlSW5jbHVkZXMpXG4gICAgICByZXR1cm4gdmFsdWU7XG4gICAgdGhyb3cgbmV3IEVycm9yKGBUaGUgJyR7dmFsdWV9JyBpcyBub3QgYSBJbnRlcmZhY2VJbmNsdWRlc2ApO1xuICB9XG59O1xuIiwiLypcbiAqIE1JVCBMaWNlbnNlXG4gKlxuICogQ29weXJpZ2h0IChjKSAyMDI1ICBZdXJpaSBZYWt1YmluICh5dXJpaS55YWt1YmluQGdtYWlsLmNvbSlcbiAqXG4gKiBQZXJtaXNzaW9uIGlzIGdyYW50ZWQgdG8gdXNlLCBjb3B5LCBtb2RpZnksIGFuZCBkaXN0cmlidXRlIHRoaXMgc29mdHdhcmVcbiAqIHVuZGVyIHRoZSBNSVQgTGljZW5zZS4gU2VlIExJQ0VOU0UgZmlsZSBmb3IgZGV0YWlscy5cbiAqL1xuXG5jb25zdCBOQU1FID0gU3ltYm9sKFwiTkFNRVwiKTtcblxuZXhwb3J0IGNsYXNzIEludGVyZmFjZU9iamVjdHMge1xuICBwcml2YXRlIFtOQU1FXTogc3RyaW5nO1xuXG4gIHByaXZhdGUgY29uc3RydWN0b3IobmFtZTogc3RyaW5nKSB7XG4gICAgdGhpc1tOQU1FXSA9IG5hbWU7XG4gIH1cblxuICBwdWJsaWMgc3RhdGljIGNyZWF0ZShuYW1lOiBzdHJpbmcpIHtcbiAgICByZXR1cm4gT2JqZWN0LnNlYWwobmV3IEludGVyZmFjZU9iamVjdHMobmFtZSkpO1xuICB9XG5cbiAgcHVibGljIHN0YXRpYyBlbnN1cmVJbnN0YW5jZSh2YWx1ZTogYW55KTogSW50ZXJmYWNlT2JqZWN0cyB7XG4gICAgaWYgKHZhbHVlIGluc3RhbmNlb2YgSW50ZXJmYWNlT2JqZWN0cylcbiAgICAgIHJldHVybiB2YWx1ZTtcbiAgICB0aHJvdyBuZXcgRXJyb3IoYFRoZSAnJHt2YWx1ZX0nIGlzIG5vdCBhIEludGVyZmFjZU9iamVjdHNgKTtcbiAgfVxuXG4gIHB1YmxpYyBnZXQgdGFyZ2V0TmFtZSgpOiBzdHJpbmcge1xuICAgIHJldHVybiB0aGlzW05BTUVdO1xuICB9XG5cbiAgcHVibGljIHRvU3RyaW5nKCk6IHN0cmluZyB7XG4gICAgcmV0dXJuIFwiJHtcIiArIHRoaXNbTkFNRV0gKyBcIi5vYmplY3RzfVwiO1xuICB9XG5cbiAgcHVibGljIHRvSlNPTigpOiBzdHJpbmcge1xuICAgIHJldHVybiB0aGlzLnRvU3RyaW5nKCk7XG4gIH1cbn07XG4iLCIvKlxuICogTUlUIExpY2Vuc2VcbiAqXG4gKiBDb3B5cmlnaHQgKGMpIDIwMjUgIFl1cmlpIFlha3ViaW4gKHl1cmlpLnlha3ViaW5AZ21haWwuY29tKVxuICpcbiAqIFBlcm1pc3Npb24gaXMgZ3JhbnRlZCB0byB1c2UsIGNvcHksIG1vZGlmeSwgYW5kIGRpc3RyaWJ1dGUgdGhpcyBzb2Z0d2FyZVxuICogdW5kZXIgdGhlIE1JVCBMaWNlbnNlLiBTZWUgTElDRU5TRSBmaWxlIGZvciBkZXRhaWxzLlxuICovXG5cbmNvbnN0IE5BTUUgICAgICAgPSBTeW1ib2woXCJOQU1FXCIpO1xuY29uc3QgUFJPUEVSVElFUyA9IFN5bWJvbChcIlBST1BFUlRJRVNcIik7XG5cbnR5cGUgU2NyaXB0UHJvcGVydGllcyA9IHtcbiAgW25hbWU6IHN0cmluZ106IGFueVtdO1xufTtcblxuZXhwb3J0IGNsYXNzIEludGVyZmFjZVNjcmlwdCB7XG4gIHByaXZhdGUgW05BTUVdOiBzdHJpbmc7XG4gIHByaXZhdGUgW1BST1BFUlRJRVNdOiBTY3JpcHRQcm9wZXJ0aWVzO1xuXG4gIHByaXZhdGUgY29uc3RydWN0b3IobmFtZTogc3RyaW5nKSB7XG4gICAgdGhpc1tOQU1FXSA9IG5hbWU7XG4gICAgdGhpc1tQUk9QRVJUSUVTXSA9IHt9O1xuICB9XG5cbiAgcHVibGljIGdldCBOQU1FKCkge1xuICAgIHJldHVybiB0aGlzW05BTUVdO1xuICB9XG5cbiAgcHVibGljIGdldCBQUk9QRVJUSUVTKCkge1xuICAgIHJldHVybiB0aGlzW1BST1BFUlRJRVNdO1xuICB9XG4gIFxuICBwdWJsaWMgYWRkUHJvcGVydHkoa2V5OiBzdHJpbmcsIC4uLnZhbHM6IGFueVtdKSB7XG4gICAgbGV0IHByb3BlcnR5ID0gdGhpc1tQUk9QRVJUSUVTXVtrZXldO1xuICAgIGlmICghcHJvcGVydHkpIHtcbiAgICAgIHByb3BlcnR5ID0gW107XG4gICAgICB0aGlzW1BST1BFUlRJRVNdW2tleV0gPSBwcm9wZXJ0eTtcbiAgICB9XG4gICAgdmFscy5mb3JFYWNoKHYgPT4gcHJvcGVydHkucHVzaCh2KSk7XG4gIH1cblxuICBwdWJsaWMgdG9KU09OKCk6IG9iamVjdCB7XG4gICAgcmV0dXJuIHtcbiAgICAgIE5BTUU6IHRoaXMuTkFNRSxcbiAgICAgIFBST1BFUlRJRVM6IHRoaXMuUFJPUEVSVElFUyxcbiAgICB9O1xuICB9XG4gIFxuICBwdWJsaWMgdG9TdHJpbmcoKTogc3RyaW5nIHtcbiAgICByZXR1cm4gdGhpc1tOQU1FXTtcbiAgfVxuXG4gIHB1YmxpYyBzdGF0aWMgY3JlYXRlKG5hbWU6IHN0cmluZykge1xuICAgIHJldHVybiBPYmplY3Quc2VhbChuZXcgSW50ZXJmYWNlU2NyaXB0KG5hbWUpKTtcbiAgfVxuXG4gIHB1YmxpYyBzdGF0aWMgZW5zdXJlSW5zdGFuY2UodmFsdWU6IGFueSkge1xuICAgIGlmICh2YWx1ZSBpbnN0YW5jZW9mIEludGVyZmFjZVNjcmlwdClcbiAgICAgIHJldHVybiB2YWx1ZTtcbiAgICB0aHJvdyBuZXcgRXJyb3IoYFRoZSAnJHt2YWx1ZX0nIGlzIG5vdCBhIEludGVyZmFjZVNjcmlwdGApO1xuICB9XG59O1xuIiwiLypcbiAqIE1JVCBMaWNlbnNlXG4gKlxuICogQ29weXJpZ2h0IChjKSAyMDI1ICBZdXJpaSBZYWt1YmluICh5dXJpaS55YWt1YmluQGdtYWlsLmNvbSlcbiAqXG4gKiBQZXJtaXNzaW9uIGlzIGdyYW50ZWQgdG8gdXNlLCBjb3B5LCBtb2RpZnksIGFuZCBkaXN0cmlidXRlIHRoaXMgc29mdHdhcmVcbiAqIHVuZGVyIHRoZSBNSVQgTGljZW5zZS4gU2VlIExJQ0VOU0UgZmlsZSBmb3IgZGV0YWlscy5cbiAqL1xuXG5pbXBvcnQgeyBBYnNvbHV0ZVBhdGggfSBmcm9tIFwiQC9jb3JlL1BhdGhcIjtcbmltcG9ydCB7IEludGVyZmFjZUluY2x1ZGVzIH0gZnJvbSBcIkAvY29yZS9JbnRlcmZhY2VJbmNsdWRlc1wiO1xuaW1wb3J0IHsgSW50ZXJmYWNlT2JqZWN0cyB9IGZyb20gXCJAL2NvcmUvSW50ZXJmYWNlT2JqZWN0c1wiO1xuaW1wb3J0IHsgSW5jbHVkZURpcmVjdG9yeSB9IGZyb20gXCJAL2NvcmUvSW5jbHVkZURpcmVjdG9yeVwiO1xuaW1wb3J0IHsgU291cmNlRmlsZSB9IGZyb20gXCJAL2NvcmUvU291cmNlRmlsZVwiO1xuaW1wb3J0IHsgU3lzdGVtU2NvcGUgfSBmcm9tIFwiQC9jb3JlL1N5c3RlbVNjb3BlXCI7XG5pbXBvcnQgeyBTY29wZUhlbHBlciB9IGZyb20gXCJAL2NvcmUvU2NvcGVcIjtcblxuY29uc3QgVU5LTk9XTl9UQVJHRVQgPSBTeW1ib2woXCJVTktOT1dOX1RBUkdFVFwiKTtcbmNvbnN0IFNDT1BFID0gU3ltYm9sKFwiU0NPUEVcIik7XG5cbmV4cG9ydCBjbGFzcyBJbnRlcmZhY2VUYXJnZXQge1xuICBwcml2YXRlIFtTQ09QRV06IFN5c3RlbVNjb3BlO1xuICBwcml2YXRlIFtVTktOT1dOX1RBUkdFVF06IGFueTtcblxuICBwcml2YXRlIGNvbnN0cnVjdG9yKHNjb3BlOiBhbnksIHV0YXJnZXQ6IGFueSkge1xuICAgIHRoaXNbU0NPUEVdID0gU2NvcGVIZWxwZXIuY2xvbmUoe30sIHNjb3BlKTtcbiAgICB0aGlzW1VOS05PV05fVEFSR0VUXSA9IHV0YXJnZXQ7XG4gIH1cblxuICBwdWJsaWMgc3RhdGljIGNyZWF0ZShzY29wZTogYW55LCB1dGFyZ2V0OiBhbnkpIHtcbiAgICByZXR1cm4gT2JqZWN0LnNlYWwobmV3IEludGVyZmFjZVRhcmdldChzY29wZSwgdXRhcmdldCkpO1xuICB9XG5cbiAgcHVibGljIHN0YXRpYyBlbnN1cmVJbnN0YW5jZSh2YWx1ZTogYW55KSB7XG4gICAgaWYgKHZhbHVlIGluc3RhbmNlb2YgSW50ZXJmYWNlVGFyZ2V0KVxuICAgICAgcmV0dXJuIHZhbHVlO1xuICAgIHRocm93IG5ldyBFcnJvcihgVGhlICcke3ZhbHVlfScgaXMgbm90IGEgSW50ZXJmYWNlVGFyZ2V0YCk7XG4gIH1cblxuICBwdWJsaWMgZ2V0IHRhcmdldE5hbWUoKTogc3RyaW5nIHtcbiAgICByZXR1cm4gdGhpc1tVTktOT1dOX1RBUkdFVF0uTkFNRTtcbiAgfVxuXG4gIHB1YmxpYyBnZXQgaW5jbHVkZXMoKTogSW50ZXJmYWNlSW5jbHVkZXMge1xuICAgIHJldHVybiBJbnRlcmZhY2VJbmNsdWRlcy5jcmVhdGUodGhpcy50YXJnZXROYW1lKTtcbiAgfVxuXG4gIHB1YmxpYyBnZXQgb2JqZWN0cygpOiBJbnRlcmZhY2VPYmplY3RzIHtcbiAgICByZXR1cm4gSW50ZXJmYWNlT2JqZWN0cy5jcmVhdGUodGhpcy50YXJnZXROYW1lKTtcbiAgfVxuXG4gIHB1YmxpYyB0b0pTT04oKTogc3RyaW5nIHtcbiAgICByZXR1cm4gdGhpcy50b1N0cmluZygpO1xuICB9XG5cbiAgcHVibGljIHRvU3RyaW5nKCk6IHN0cmluZyB7XG4gICAgcmV0dXJuIFwiJHtcIiArIHRoaXMudGFyZ2V0TmFtZSArIFwifVwiO1xuICB9XG5cbiAgcHVibGljIGFkZFNvdXJjZXMoLi4uc291cmNlczogQXJyYXk8SW50ZXJmYWNlT2JqZWN0c3xTb3VyY2VGaWxlfEFic29sdXRlUGF0aHxzdHJpbmc+KTogdm9pZCB7XG4gICAgZm9yIChsZXQgaXQgb2Ygc291cmNlcy5mbGF0KDEpKSB7XG4gICAgICBpZiAoaXQgaW5zdGFuY2VvZiBJbnRlcmZhY2VPYmplY3RzIHx8IGl0IGluc3RhbmNlb2YgU291cmNlRmlsZSlcbiAgICAgICAge31cbiAgICAgIGVsc2UgaWYgKHR5cGVvZiBpdCA9PT0gXCJzdHJpbmdcIiB8fCBBYnNvbHV0ZVBhdGguaXNBYnNvbHV0ZShpdCkpXG4gICAgICAgIGl0ID0gU291cmNlRmlsZS5jcmVhdGUodGhpc1tTQ09QRV0sIGl0KTtcbiAgICAgIGVsc2VcbiAgICAgICAgdGhyb3cgbmV3IEVycm9yKGBOb3Qgc3VwcG9ydCBpbnN0YW5jZSAke2l0fWApO1xuICAgICAgdGhpc1tVTktOT1dOX1RBUkdFVF0uU09VUkNFUy5wdXNoKGl0KTtcbiAgICB9XG4gIH1cblxuICBwdWJsaWMgYWRkSW5jbHVkZXMoLi4uaW5jbHVkZXM6IEFycmF5PEludGVyZmFjZUluY2x1ZGVzfEFic29sdXRlUGF0aHxzdHJpbmc+KTogdm9pZCB7XG4gICAgZm9yIChjb25zdCBpdCBvZiBpbmNsdWRlcy5mbGF0KDEpKSB7XG4gICAgICBsZXQgVkFMVUU7XG4gICAgICBpZiAoaXQgaW5zdGFuY2VvZiBJbnRlcmZhY2VJbmNsdWRlcylcbiAgICAgICAgVkFMVUUgPSBpdDtcbiAgICAgIGVsc2UgaWYgKHR5cGVvZiBpdCA9PT0gXCJzdHJpbmdcIiB8fCBBYnNvbHV0ZVBhdGguaXNBYnNvbHV0ZShpdCkpXG4gICAgICAgIFZBTFVFID0gSW5jbHVkZURpcmVjdG9yeS5jcmVhdGUoaXQsIHRoaXNbU0NPUEVdLlNPVVJDRV9ESVIpO1xuICAgICAgZWxzZVxuICAgICAgICB0aHJvdyBuZXcgRXJyb3IoYE5vdCBzdXBwb3J0IGluc3RhbmNlICR7aXR9YCk7XG4gICAgICB0aGlzW1VOS05PV05fVEFSR0VUXS5JTkNMVURFUy5wdXNoKHsgVkFMVUUsIFBVQkxJQ19PTkxZOiBmYWxzZSB9KTtcbiAgICB9XG4gIH1cblxuICBwdWJsaWMgYWRkUHVibGljSW5jbHVkZXMoLi4uaW5jbHVkZXM6IEFycmF5PEludGVyZmFjZUluY2x1ZGVzfEFic29sdXRlUGF0aHxzdHJpbmc+KTogdm9pZCB7XG4gICAgZm9yIChjb25zdCBpdCBvZiBpbmNsdWRlcy5mbGF0KDEpKSB7XG4gICAgICBsZXQgVkFMVUU7XG4gICAgICBpZiAoaXQgaW5zdGFuY2VvZiBJbnRlcmZhY2VJbmNsdWRlcylcbiAgICAgICAgVkFMVUUgPSBpdDtcbiAgICAgIGVsc2UgaWYgKHR5cGVvZiBpdCA9PT0gXCJzdHJpbmdcIiB8fCBBYnNvbHV0ZVBhdGguaXNBYnNvbHV0ZShpdCkpXG4gICAgICAgIFZBTFVFID0gSW5jbHVkZURpcmVjdG9yeS5jcmVhdGUoaXQsIHRoaXNbU0NPUEVdLlNPVVJDRV9ESVIpO1xuICAgICAgZWxzZVxuICAgICAgICB0aHJvdyBuZXcgRXJyb3IoYE5vdCBzdXBwb3J0IGluc3RhbmNlICR7aXR9YCk7XG4gICAgICB0aGlzW1VOS05PV05fVEFSR0VUXS5JTkNMVURFUy5wdXNoKHsgVkFMVUUsIFBVQkxJQ19PTkxZOiB0cnVlIH0pO1xuICAgIH1cbiAgfVxuXG4gIHB1YmxpYyBhZGREZWZpbml0aW9ucyguLi5kZWZpbml0aW9uczogc3RyaW5nW10pOiB2b2lkIHtcbiAgICBmb3IgKGNvbnN0IFZBTFVFIG9mIGRlZmluaXRpb25zLmZsYXQoMSkpXG4gICAgICB0aGlzW1VOS05PV05fVEFSR0VUXS5ERUZJTkVTLnB1c2goeyBWQUxVRSB9KTtcbiAgfVxuXG4gIHB1YmxpYyBhZGRQdWJsaWNEZWZpbml0aW9ucyguLi5kZWZpbml0aW9uczogc3RyaW5nW10pOiB2b2lkIHtcbiAgICBmb3IgKGNvbnN0IFZBTFVFIG9mIGRlZmluaXRpb25zLmZsYXQoMSkpXG4gICAgICB0aGlzW1VOS05PV05fVEFSR0VUXS5ERUZJTkVTLnB1c2goeyBWQUxVRSwgUFVCTElDX09OTFk6IHRydWUgfSk7XG4gIH1cblxuICBwdWJsaWMgYWRkQ29tcGlsZU9wdGlvbnMoLi4ub3B0aW9uczogc3RyaW5nW10pOiB2b2lkIHtcbiAgICBmb3IgKGNvbnN0IGl0IG9mIG9wdGlvbnMuZmxhdCgxKSkge1xuICAgICAgdGhpc1tVTktOT1dOX1RBUkdFVF0uQ09NUElMRV9PUFRJT05TLnB1c2goeyBWQUxVRTogaXQgfSk7XG4gICAgfVxuICB9XG5cbiAgcHVibGljIGFkZExpbmtPcHRpb25zKC4uLm9wdGlvbnM6IHN0cmluZ1tdKTogdm9pZCB7XG4gICAgZm9yIChjb25zdCBpdCBvZiBvcHRpb25zLmZsYXQoMSkpIHtcbiAgICAgIHRoaXNbVU5LTk9XTl9UQVJHRVRdLkxJTktfT1BUSU9OUy5wdXNoKHsgVkFMVUU6IGl0IH0pO1xuICAgIH1cbiAgfVxuXG4gIHB1YmxpYyBhZGRQdWJsaWNDb21waWxlT3B0aW9ucyguLi5vcHRpb25zOiBzdHJpbmdbXSk6IHZvaWQge1xuICAgIGZvciAoY29uc3QgaXQgb2Ygb3B0aW9ucy5mbGF0KDEpKSB7XG4gICAgICB0aGlzW1VOS05PV05fVEFSR0VUXS5DT01QSUxFX09QVElPTlMucHVzaCh7IFZBTFVFOiBpdCwgUFVCTElDX09OTFk6IHRydWUgfSk7XG4gICAgfVxuICB9XG5cbiAgcHVibGljIGFkZFB1YmxpY0xpbmtPcHRpb25zKC4uLm9wdGlvbnM6IHN0cmluZ1tdKTogdm9pZCB7XG4gICAgZm9yIChjb25zdCBpdCBvZiBvcHRpb25zLmZsYXQoMSkpIHtcbiAgICAgIHRoaXNbVU5LTk9XTl9UQVJHRVRdLkxJTktfT1BUSU9OUy5wdXNoKHsgVkFMVUU6IGl0LCBQVUJMSUNfT05MWTogdHJ1ZSB9KTtcbiAgICB9XG4gIH1cbn07XG4iLCIvKlxuICogTUlUIExpY2Vuc2VcbiAqXG4gKiBDb3B5cmlnaHQgKGMpIDIwMjUgIFl1cmlpIFlha3ViaW4gKHl1cmlpLnlha3ViaW5AZ21haWwuY29tKVxuICpcbiAqIFBlcm1pc3Npb24gaXMgZ3JhbnRlZCB0byB1c2UsIGNvcHksIG1vZGlmeSwgYW5kIGRpc3RyaWJ1dGUgdGhpcyBzb2Z0d2FyZVxuICogdW5kZXIgdGhlIE1JVCBMaWNlbnNlLiBTZWUgTElDRU5TRSBmaWxlIGZvciBkZXRhaWxzLlxuICovXG5cbmltcG9ydCBwYXRoIGZyb20gXCJub2RlOnBhdGhcIjtcbmltcG9ydCB1cmwgZnJvbSBcIm5vZGU6dXJsXCI7XG5cbmNvbnN0IFBBVEggPSBTeW1ib2woXCJQQVRIXCIpO1xuXG5jb25zdCBfcGF0aHMgPSBuZXcgTWFwPHN0cmluZywgRGlyUGF0aCB8IEZpbGVQYXRoPigpO1xuXG5leHBvcnQgY2xhc3MgQWJzb2x1dGVQYXRoIHtcbiAgcHJpdmF0ZSBbUEFUSF06IHN0cmluZztcblxuICBwcm90ZWN0ZWQgY29uc3RydWN0b3IoZmlsZXBhdGg6IHN0cmluZykge1xuICAgIGlmICghcGF0aC5pc0Fic29sdXRlKGZpbGVwYXRoKSlcbiAgICAgIHRocm93IG5ldyBFcnJvcihgTm90IHN1cHBvcnRlZCByZWxhdGl2ZSBwYXRoIG9mIFwiJHtmaWxlcGF0aH1cImApO1xuICAgIHRoaXNbUEFUSF0gPSBmaWxlcGF0aDtcbiAgfVxuXG4gIHB1YmxpYyBqb2luKC4uLnBhdGhzOiBBcnJheTxBYnNvbHV0ZVBhdGggfCBzdHJpbmc+KSB7XG4gICAgY29uc3QgZmlsZXBhdGggPSBwYXRoLnBvc2l4LmpvaW4odGhpc1tQQVRIXSwgLi4ucGF0aHMubWFwKGkgPT4gaS50b1N0cmluZygpKSk7XG4gICAgcmV0dXJuIEFic29sdXRlUGF0aC5jcmVhdGUoZmlsZXBhdGgpO1xuICB9XG5cbiAgcHVibGljIGRpcm5hbWUoKSB7XG4gICAgcmV0dXJuIERpclBhdGguY3JlYXRlKHBhdGgucG9zaXguZGlybmFtZSh0aGlzW1BBVEhdKSk7XG4gIH1cblxuICBwdWJsaWMgYmFzZW5hbWUoKSB7XG4gICAgcmV0dXJuIHBhdGguYmFzZW5hbWUodGhpc1tQQVRIXSk7XG4gIH1cblxuICBwdWJsaWMgcmVsYXRpdmUodG86IEFic29sdXRlUGF0aCB8IHN0cmluZykge1xuICAgIHJldHVybiBwYXRoLnBvc2l4LnJlbGF0aXZlKHRoaXNbUEFUSF0sICh0byBpbnN0YW5jZW9mIEFic29sdXRlUGF0aCkgPyB0b1tQQVRIXSA6IHRvKTtcbiAgfVxuXG4gIHB1YmxpYyByZXNvbHZlKC4uLnBhdGhzOiBBcnJheTxBYnNvbHV0ZVBhdGggfCBzdHJpbmc+KSB7XG4gICAgcmV0dXJuIEFic29sdXRlUGF0aC5jcmVhdGUocGF0aC5wb3NpeC5yZXNvbHZlKHRoaXNbUEFUSF0sIC4uLnBhdGhzLm1hcChpID0+IGkudG9TdHJpbmcoKSkpKTtcbiAgfVxuXG4gIHB1YmxpYyBtYXRjaChyZWdleHA6IFJlZ0V4cCkge1xuICAgIHJldHVybiB0aGlzW1BBVEhdLm1hdGNoKHJlZ2V4cCk7XG4gIH1cblxuICBwdWJsaWMgdG9VUkwoKSB7XG4gICAgcmV0dXJuIHVybC5wYXRoVG9GaWxlVVJMKHRoaXNbUEFUSF0pO1xuICB9XG5cbiAgcHVibGljIHRvVVJMU3RyaW5nKCkge1xuICAgIHJldHVybiB0aGlzLnRvVVJMKCkudG9TdHJpbmcoKTtcbiAgfVxuXG4gIHB1YmxpYyB0b1N0cmluZygpIHtcbiAgICByZXR1cm4gdGhpc1tQQVRIXTtcbiAgfVxuXG4gIHB1YmxpYyB2YWx1ZU9mKCkge1xuICAgIHJldHVybiB0aGlzW1BBVEhdO1xuICB9XG5cbiAgcHVibGljIHRvSlNPTigpIHtcbiAgICByZXR1cm4gdGhpc1tQQVRIXTtcbiAgfVxuXG4gIHB1YmxpYyBzdGF0aWMgaXNBYnNvbHV0ZShmaWxlcGF0aDogQWJzb2x1dGVQYXRoIHwgc3RyaW5nKSB7XG4gICAgaWYgKGZpbGVwYXRoIGluc3RhbmNlb2YgQWJzb2x1dGVQYXRoKVxuICAgICAgcmV0dXJuIHRydWU7XG4gICAgcmV0dXJuIHBhdGguaXNBYnNvbHV0ZShmaWxlcGF0aCk7XG4gIH1cblxuICBwdWJsaWMgc3RhdGljIGVuc3VyZUluc3RhbmNlKHZhbHVlOiBhbnkpOiBBYnNvbHV0ZVBhdGgge1xuICAgIGlmICh2YWx1ZSBpbnN0YW5jZW9mIEFic29sdXRlUGF0aClcbiAgICAgIHJldHVybiB2YWx1ZTtcbiAgICB0aHJvdyBuZXcgRXJyb3IoYFRoZSAnJHt2YWx1ZX0nIGlzIG5vdCBhIEFic29sdXRlUGF0aGApO1xuICB9XG5cbiAgcHVibGljIHN0YXRpYyBjcmVhdGUocGF0aDogQWJzb2x1dGVQYXRoIHwgc3RyaW5nKTogQWJzb2x1dGVQYXRoIHwgRGlyUGF0aCB8IEZpbGVQYXRoIHtcbiAgICBjb25zdCByZXN1bHQgPSBfcGF0aHMuZ2V0KHBhdGgudG9TdHJpbmcoKSk7XG4gICAgaWYgKHJlc3VsdClcbiAgICAgIHJldHVybiByZXN1bHQ7XG5cbiAgICBpZiAocGF0aCBpbnN0YW5jZW9mIEFic29sdXRlUGF0aClcbiAgICAgIHJldHVybiBwYXRoO1xuXG4gICAgcmV0dXJuIE9iamVjdC5zZWFsKG5ldyBBYnNvbHV0ZVBhdGgocGF0aCkpO1xuICB9XG59O1xuXG5leHBvcnQgY2xhc3MgRmlsZVBhdGggZXh0ZW5kcyBBYnNvbHV0ZVBhdGgge1xuICBwcml2YXRlIGNvbnN0cnVjdG9yKHBhdGhTdHI6IHN0cmluZykge1xuICAgIHN1cGVyKHBhdGhTdHIpO1xuICB9XG5cbiAgcHVibGljIHN0YXRpYyBlbnN1cmVJbnN0YW5jZSh2YWx1ZTogYW55KTogRmlsZVBhdGgge1xuICAgIGlmICh2YWx1ZSBpbnN0YW5jZW9mIEZpbGVQYXRoKVxuICAgICAgcmV0dXJuIHZhbHVlO1xuICAgIHRocm93IG5ldyBFcnJvcihgVGhlICcke3ZhbHVlfScgaXMgbm90IGEgRmlsZVBhdGhgKTtcbiAgfVxuICBcbiAgcHVibGljIHN0YXRpYyBjcmVhdGUocGF0aDogYW55KTogRmlsZVBhdGgge1xuICAgIGlmIChwYXRoIGluc3RhbmNlb2YgRmlsZVBhdGgpXG4gICAgICByZXR1cm4gcGF0aDtcblxuICAgIGlmIChwYXRoIGluc3RhbmNlb2YgQWJzb2x1dGVQYXRoKVxuICAgICAgcGF0aCA9IHBhdGgudG9TdHJpbmcoKTtcblxuICAgIGlmICh0eXBlb2YgcGF0aCAhPT0gXCJzdHJpbmdcIilcbiAgICAgIHRocm93IG5ldyBFcnJvcihgVGhlICcke3BhdGh9JyBpcyBub3QgYSBzdHJpbmdgKTtcblxuICAgIGxldCBmaWxlUGF0aCA9IF9wYXRocy5nZXQocGF0aCk7XG4gICAgaWYgKGZpbGVQYXRoKVxuICAgICAgcmV0dXJuIEZpbGVQYXRoLmVuc3VyZUluc3RhbmNlKGZpbGVQYXRoKTtcblxuICAgIGZpbGVQYXRoID0gT2JqZWN0LnNlYWwobmV3IEZpbGVQYXRoKHBhdGgpKTtcbiAgICBfcGF0aHMuc2V0KHBhdGgsIGZpbGVQYXRoKTtcblxuICAgIHJldHVybiBmaWxlUGF0aDtcbiAgfVxufVxuXG5leHBvcnQgY2xhc3MgRGlyUGF0aCBleHRlbmRzIEFic29sdXRlUGF0aCB7XG4gIHByaXZhdGUgY29uc3RydWN0b3IocGF0aFN0cjogc3RyaW5nKSB7XG4gICAgc3VwZXIocGF0aFN0cik7XG4gIH1cblxuICBwdWJsaWMgc3RhdGljIGVuc3VyZUluc3RhbmNlKHZhbHVlOiBhbnkpOiBEaXJQYXRoIHtcbiAgICBpZiAodmFsdWUgaW5zdGFuY2VvZiBEaXJQYXRoKVxuICAgICAgcmV0dXJuIHZhbHVlO1xuICAgIHRocm93IG5ldyBFcnJvcihgVGhlICcke3ZhbHVlfScgaXMgbm90IGEgRGlyUGF0aGApO1xuICB9XG5cbiAgcHVibGljIHN0YXRpYyBjcmVhdGUocGF0aDogYW55KTogRGlyUGF0aCB7XG4gICAgaWYgKHBhdGggaW5zdGFuY2VvZiBEaXJQYXRoKVxuICAgICAgcmV0dXJuIHBhdGg7XG5cbiAgICBpZiAocGF0aCBpbnN0YW5jZW9mIEFic29sdXRlUGF0aClcbiAgICAgIHBhdGggPSBwYXRoLnRvU3RyaW5nKCk7XG5cbiAgICBpZiAodHlwZW9mIHBhdGggIT09IFwic3RyaW5nXCIpXG4gICAgICB0aHJvdyBuZXcgRXJyb3IoYFRoZSAnJHtwYXRofScgaXMgbm90IGEgc3RyaW5nYCk7XG5cbiAgICBsZXQgZGlyUGF0aCA9IF9wYXRocy5nZXQocGF0aCk7XG4gICAgaWYgKGRpclBhdGgpXG4gICAgICByZXR1cm4gRGlyUGF0aC5lbnN1cmVJbnN0YW5jZShkaXJQYXRoKTtcblxuICAgIGRpclBhdGggPSBPYmplY3Quc2VhbChuZXcgRGlyUGF0aChwYXRoKSk7XG4gICAgX3BhdGhzLnNldChwYXRoLCBkaXJQYXRoKTtcblxuICAgIHJldHVybiBkaXJQYXRoO1xuICB9XG59O1xuIiwiLypcbiAqIE1JVCBMaWNlbnNlXG4gKlxuICogQ29weXJpZ2h0IChjKSAyMDI1ICBZdXJpaSBZYWt1YmluICh5dXJpaS55YWt1YmluQGdtYWlsLmNvbSlcbiAqXG4gKiBQZXJtaXNzaW9uIGlzIGdyYW50ZWQgdG8gdXNlLCBjb3B5LCBtb2RpZnksIGFuZCBkaXN0cmlidXRlIHRoaXMgc29mdHdhcmVcbiAqIHVuZGVyIHRoZSBNSVQgTGljZW5zZS4gU2VlIExJQ0VOU0UgZmlsZSBmb3IgZGV0YWlscy5cbiAqL1xuXG5pbXBvcnQgeyBEaXJQYXRoIH0gZnJvbSBcIkAvY29yZS9QYXRoXCI7XG5pbXBvcnQgeyBHbG9iYWxDb250ZXh0IH0gZnJvbSBcIkAvY29yZS9HbG9iYWxDb250ZXh0XCI7XG5pbXBvcnQgeyBTY29wZUhlbHBlciB9IGZyb20gXCJAL2NvcmUvU2NvcGVcIjtcbmltcG9ydCB7IFN5c3RlbVNjb3BlIH0gZnJvbSBcIkAvY29yZS9TeXN0ZW1TY29wZVwiO1xuXG5jb25zdCBHTE9CQUwgPSBTeW1ib2woXCJHTE9CQUxcIik7XG5jb25zdCBTQ09QRSA9IFN5bWJvbChcIlNDT1BFXCIpO1xuXG5leHBvcnQgY2xhc3MgUGx1Z2luQ29udGV4dCB7XG4gIHByaXZhdGUgW1NDT1BFXTogU3lzdGVtU2NvcGU7XG4gIHByaXZhdGUgW0dMT0JBTF06IEdsb2JhbENvbnRleHQ7XG5cbiAgcHJpdmF0ZSBjb25zdHJ1Y3RvcihzY29wZTogU3lzdGVtU2NvcGUsIGdsb2JhbDogYW55KSB7XG4gICAgdGhpc1tTQ09QRV0gPSBzY29wZTtcbiAgICB0aGlzW0dMT0JBTF0gPSBnbG9iYWw7XG4gIH1cblxuICBwdWJsaWMgc3RhdGljIGNyZWF0ZShzY29wZTogU3lzdGVtU2NvcGUsIGdsb2JhbDogR2xvYmFsQ29udGV4dCkge1xuICAgIGNvbnN0IHByb3RvID0gUGx1Z2luQ29udGV4dC5wcm90b3R5cGU7XG4gICAgY29uc3QgbmV3U2NvcGUgPSBPYmplY3QuY3JlYXRlKHByb3RvKTtcbiAgICBTY29wZUhlbHBlci5jbG9uZShuZXdTY29wZSwgc2NvcGUpO1xuICAgIGNvbnN0IHNlbGYgPSBPYmplY3QuY3JlYXRlKG5ld1Njb3BlKTtcbiAgICBzZWxmW1NDT1BFXSA9IG5ld1Njb3BlO1xuICAgIHNlbGZbR0xPQkFMXSA9IGdsb2JhbDtcbiAgICByZXR1cm4gc2VsZjtcbiAgfVxuXG4gIHB1YmxpYyBhZGRTdWJkaXJlY3RvcnlBbGlhcyhzcmM6IGFueSwgZGVzdDogYW55KSB7XG4gICAgY29uc3Qgc3JjUGF0aCA9IHRoaXNbU0NPUEVdLlNDUklQVF9ESVIucmVzb2x2ZShzcmMpO1xuICAgIGNvbnN0IGRlc3RQYXRoID0gdGhpc1tTQ09QRV0uU0NSSVBUX0RJUi5yZXNvbHZlKGRlc3QpO1xuICAgIHRoaXNbR0xPQkFMXS5hZGRTdWJkaXJlY3RvcnlBbGlhcyhEaXJQYXRoLmNyZWF0ZShzcmNQYXRoKSwgRGlyUGF0aC5jcmVhdGUoZGVzdFBhdGgpKTtcbiAgfVxuXG4gIHB1YmxpYyBfc2NvcGUoKSB7XG4gICAgcmV0dXJuIHRoaXNbU0NPUEVdO1xuICB9XG59O1xuIiwiLypcbiAqIE1JVCBMaWNlbnNlXG4gKlxuICogQ29weXJpZ2h0IChjKSAyMDI1ICBZdXJpaSBZYWt1YmluICh5dXJpaS55YWt1YmluQGdtYWlsLmNvbSlcbiAqXG4gKiBQZXJtaXNzaW9uIGlzIGdyYW50ZWQgdG8gdXNlLCBjb3B5LCBtb2RpZnksIGFuZCBkaXN0cmlidXRlIHRoaXMgc29mdHdhcmVcbiAqIHVuZGVyIHRoZSBNSVQgTGljZW5zZS4gU2VlIExJQ0VOU0UgZmlsZSBmb3IgZGV0YWlscy5cbiAqL1xuXG5pbXBvcnQgeyBlbnN1cmVCb29sZWFuLCBlbnN1cmVTdHJpbmcsIGVuc3VyZU51bWJlciwgZW5zdXJlQXJyYXkgfSBmcm9tIFwiQC91dGlscy9TdHJpY3RUeXBlXCI7XG5pbXBvcnQgeyBEaXJQYXRoLCBGaWxlUGF0aCB9IGZyb20gXCJAL2NvcmUvUGF0aFwiO1xuXG5jb25zdCBERUZJTkVfTUFQID0gU3ltYm9sKFwiREVGSU5FX01BUFwiKTtcblxuZXhwb3J0IG5hbWVzcGFjZSBTY29wZUhlbHBlciB7XG5cbmZ1bmN0aW9uIGRlZmluZVZhcmlhYmxlSW1wbChzY29wZTogYW55LCBncm91cDogc3RyaW5nLCBuYW1lOiBzdHJpbmcsIGRlc2NyaXB0b3I6IGFueSkge1xuICBpZiAobmFtZSA9PT0gXCJERUZJTkVfTUFQXCIpIHtcbiAgICB0aHJvdyBuZXcgRXJyb3IoYCR7bmFtZX0gaXMgcmVzZXJ2ZWQgYW5kIGNhbm5vdCBiZSB1c2VkIGFzIGEgdmFyaWFibGVgKTtcbiAgfVxuXG4gIGlmICghc2NvcGVbREVGSU5FX01BUF0pXG4gICAgc2NvcGVbREVGSU5FX01BUF0gPSB7fTtcblxuICBjb25zdCB0eXBlID0gZGVzY3JpcHRvci50eXBlIHx8IChBcnJheS5pc0FycmF5KGRlc2NyaXB0b3IudmFsdWUpID8gXCJhcnJheVwiIDogdHlwZW9mIGRlc2NyaXB0b3IudmFsdWUpO1xuXG4gIGxldCBkZWZpbmVFbnRyeSA9IHNjb3BlW0RFRklORV9NQVBdW25hbWVdO1xuICBpZiAoIWRlZmluZUVudHJ5KSB7XG4gICAgZGVmaW5lRW50cnkgPSB7IGdyb3VwLCB0eXBlLCBzeW1ib2w6IFN5bWJvbChuYW1lKSB9O1xuICAgIHNjb3BlW0RFRklORV9NQVBdW25hbWVdID0gZGVmaW5lRW50cnk7XG4gIH1cbiAgZWxzZSBpZiAoZ3JvdXAgIT09IGRlZmluZUVudHJ5Lmdyb3VwKSB7XG4gICAgaWYgKGRlZmluZUVudHJ5Lmdyb3VwKVxuICAgICAgdGhyb3cgbmV3IEVycm9yKGBBdHRlbXB0aW5nIHRvIHJlY3JlYXRlIFwiJHtuYW1lfVwiIHZhcmlhYmxlIHdpdGggXCIke2RlZmluZUVudHJ5Lmdyb3VwfVwiIGdyb3VwIGluIGFub3RoZXIgXCIke2dyb3VwfVwiYCk7XG4gICAgZGVmaW5lRW50cnkuZ3JvdXAgPSBncm91cDtcbiAgfVxuXG4gIGRlZmluZUVudHJ5LmRlc2NyaXB0aW9uID0gZGVzY3JpcHRvci5kZXNjcmlwdGlvbiB8fCBkZWZpbmVFbnRyeS5kZXNjcmlwdGlvbiB8fCBcIlwiO1xuXG4gIGxldCBlbnN1cmVWYWx1ZTogKHZhbHVlOiBhbnkpID0+IHt9O1xuICBpZiAoQXJyYXkuaXNBcnJheSh0eXBlKSkge1xuICAgIGxldCBpdGVtVHlwZTtcbiAgICBmb3IgKGNvbnN0IGl0ZXIgb2YgdHlwZSkge1xuICAgICAgY29uc3QgaXQgPSB0eXBlb2YgaXRlcjtcbiAgICAgIGlmICghaXRlbVR5cGUpXG4gICAgICAgIGl0ZW1UeXBlID0gaXQ7XG4gICAgICBlbHNlIGlmIChpdGVtVHlwZSAhPT0gaXQpXG4gICAgICAgIHRocm93IG5ldyBFcnJvcihgQWxsIGVsZW1lbnRzIGZvciAke25hbWV9IG11c3QgYmUgb2YgdGhlIHNhbWUgdHlwZWApO1xuICAgIH1cbiAgICBpZiAoaXRlbVR5cGUgIT09IFwiYm9vbGVhblwiICYmIGl0ZW1UeXBlICE9PSBcIm51bWJlclwiICYmIGl0ZW1UeXBlICE9PSBcInN0cmluZ1wiKVxuICAgICAgdGhyb3cgbmV3IEVycm9yKGBFbnVtICR7bmFtZX0gbm90IHN1cHBvcnQgJHtpdGVtVHlwZX0gdHlwZWApO1xuICAgIGVuc3VyZVZhbHVlID0gKHZhbHVlOiBhbnkpID0+IHtcbiAgICAgIGlmICh0eXBlLmluY2x1ZGVzKHZhbHVlKSlcbiAgICAgICAgcmV0dXJuIHZhbHVlO1xuICAgICAgdGhyb3cgbmV3IEVycm9yKGBUaGUgJyR7dmFsdWV9JyBpcyBub3QgYSAke3R5cGV9YCk7XG4gICAgfVxuICB9XG4gIGVsc2UgaWYgKHR5cGUgPT09IFwiYm9vbGVhblwiKVxuICAgIGVuc3VyZVZhbHVlID0gZW5zdXJlQm9vbGVhbjtcbiAgZWxzZSBpZiAodHlwZSA9PT0gXCJudW1iZXJcIilcbiAgICBlbnN1cmVWYWx1ZSA9IGVuc3VyZU51bWJlcjtcbiAgZWxzZSBpZiAodHlwZSA9PT0gXCJzdHJpbmdcIilcbiAgICBlbnN1cmVWYWx1ZSA9IGVuc3VyZVN0cmluZztcbiAgZWxzZSBpZiAodHlwZSA9PT0gXCJhcnJheVwiKVxuICAgIGVuc3VyZVZhbHVlID0gZW5zdXJlQXJyYXk7XG4gIGVsc2UgaWYgKHR5cGUgPT09IFwiRGlyUGF0aFwiKVxuICAgIGVuc3VyZVZhbHVlID0gRGlyUGF0aC5jcmVhdGU7XG4gIGVsc2UgaWYgKHR5cGUgPT09IFwiRmlsZVBhdGhcIilcbiAgICBlbnN1cmVWYWx1ZSA9IEZpbGVQYXRoLmNyZWF0ZTtcbiAgZWxzZVxuICAgIHRocm93IG5ldyBFcnJvcihgVmFyaWFibGUgXCIke25hbWV9XCIgaGFzIHdyb25nICR7dHlwZX0gdHlwZWApO1xuXG4gIGlmIChkZXNjcmlwdG9yLnZhbHVlICE9PSB1bmRlZmluZWQpIHtcbiAgICBkZWZpbmVFbnRyeS52YWx1ZSA9ICh0eXBlID09PSBcImFycmF5XCIpID8gQXJyYXkuZnJvbShkZXNjcmlwdG9yLnZhbHVlKSA6IGVuc3VyZVZhbHVlKGRlc2NyaXB0b3IudmFsdWUpO1xuICB9XG4gIGVsc2Uge1xuICAgIGRlZmluZUVudHJ5LnZhbHVlID0gKHR5cGUgPT09IFwiYXJyYXlcIikgPyBbXSA6IHVuZGVmaW5lZDtcbiAgfVxuXG4gIGNvbnN0IHsgc3ltYm9sLCB2YWx1ZSB9ID0gZGVmaW5lRW50cnk7XG5cbiAgaWYgKHNjb3BlW3N5bWJvbF0gPT09IHVuZGVmaW5lZCAmJiB2YWx1ZSAhPT0gdW5kZWZpbmVkKVxuICAgIHNjb3BlW3N5bWJvbF0gPSBBcnJheS5pc0FycmF5KHZhbHVlKSA/IEFycmF5LmZyb20odmFsdWUpIDogdmFsdWU7XG5cbiAgY29uc3QgZGVzYzogYW55ID0ge1xuICAgIGNvbmZpZ3VyYWJsZTogdHJ1ZSxcbiAgICBlbnVtZXJhYmxlOiB0cnVlLFxuICAgIGdldCgpIHtcbiAgICAgIGNvbnN0IHZhbHVlID0gc2NvcGVbc3ltYm9sXTtcbiAgICAgIC8qaWYgKHZhbHVlID09PSB1bmRlZmluZWQpXG4gICAgICAgIHRocm93IG5ldyBFcnJvcihgVmFsdWUgb2YgJHtuYW1lfSBjYW5ub3QgYmUgb2J0YWluZWQgYmVjYXVzZSBpdCBoYXMgbm90IGJlZW4gZXN0YWJsaXNoZWRgKTsqL1xuICAgICAgcmV0dXJuIHZhbHVlO1xuICAgIH0sXG4gICAgc2V0KHZhbHVlOiBhbnkpIHtcbiAgICAgIHNjb3BlW3N5bWJvbF0gPSBlbnN1cmVWYWx1ZSh2YWx1ZSk7XG4gICAgfSxcbiAgfTtcblxuICBPYmplY3QuZGVmaW5lUHJvcGVydHkoc2NvcGUsIG5hbWUsIGRlc2MpO1xufVxuXG5leHBvcnQgZnVuY3Rpb24gZGVmaW5lVmFyaWFibGUoc2NvcGU6IGFueSwgZ3JvdXA6IHN0cmluZywgbmFtZTogc3RyaW5nLCBkZXNjcmlwdG9yOiBhbnkpIHtcbiAgaWYgKCFncm91cCkge1xuICAgIHRocm93IG5ldyBFcnJvcihgQXR0ZW1wdGluZyB0byBjcmVhdGUgXCIke25hbWV9XCIgdmFyaWFibGUgd2l0aCBhbiBlbXB0eSBncm91cGApO1xuICB9XG4gIGRlZmluZVZhcmlhYmxlSW1wbChzY29wZSwgZ3JvdXAsIG5hbWUsIGRlc2NyaXB0b3IpO1xufVxuXG5leHBvcnQgZnVuY3Rpb24gZGVmaW5lVmFyaWFibGVzKHNjb3BlOiBhbnksIGdyb3VwOiBzdHJpbmcsIGRlc2NyaXB0b3JzOiBhbnkpIHtcbiAgZm9yIChjb25zdCBbIG5hbWUsIGRlc2NyaXB0b3IgXSBvZiBPYmplY3QuZW50cmllcyhkZXNjcmlwdG9ycykpXG4gICAgU2NvcGVIZWxwZXIuZGVmaW5lVmFyaWFibGUoc2NvcGUsIGdyb3VwLCBuYW1lLCBkZXNjcmlwdG9yKTtcbn1cblxuZXhwb3J0IGZ1bmN0aW9uIGNsb25lKHRhcmdldDogYW55LCBzY29wZTogYW55KSB7XG4gIGlmIChzY29wZVtERUZJTkVfTUFQXSkge1xuICAgIGZvciAoY29uc3QgWyBuYW1lLCB7IGdyb3VwLCBzeW1ib2wsIHR5cGUsIHZhbHVlLCBkZXNjcmlwdGlvbiB9IF0gb2YgT2JqZWN0LmVudHJpZXMoc2NvcGVbREVGSU5FX01BUF0pIGFzIGFueSkge1xuICAgICAgZGVmaW5lVmFyaWFibGVJbXBsKHRhcmdldCwgZ3JvdXAsIG5hbWUsIHsgdHlwZSwgdmFsdWUsIGRlc2NyaXB0aW9uIH0pO1xuICAgICAgaWYgKHNjb3BlW3N5bWJvbF0gIT09IHVuZGVmaW5lZClcbiAgICAgICAgdGFyZ2V0W25hbWVdID0gc2NvcGVbc3ltYm9sXTtcbiAgICB9XG4gIH1cbiAgcmV0dXJuIHRhcmdldDtcbn1cblxuZXhwb3J0IGZ1bmN0aW9uIGdldFZhcmlhYmxlc0J5R3JvdXAoc2NvcGU6IGFueSwgZ3JwPzogc3RyaW5nKSB7XG4gIGNvbnN0IHJlc3VsdDogYW55ID0ge307XG4gIGZvciAoY29uc3QgWyBuYW1lLCB7IHR5cGUsIGdyb3VwLCBzeW1ib2wsIGRlc2NyaXB0aW9uIH0gXSBvZiBPYmplY3QuZW50cmllcyhzY29wZVtERUZJTkVfTUFQXSkgYXMgYW55KSB7XG4gICAgaWYgKGdyb3VwICYmIGdyb3VwICE9PSBncnApXG4gICAgICBjb250aW51ZTtcbiAgICByZXN1bHRbbmFtZV0gPSB7IHR5cGUsIGRlc2NyaXB0aW9uLCB2YWx1ZTogc2NvcGVbc3ltYm9sXSB9O1xuICB9XG4gIHJldHVybiByZXN1bHQ7XG59XG5cbmV4cG9ydCBmdW5jdGlvbiBhcHBseVZhcmlhYmxlKHNjb3BlOiBhbnksIG5hbWU6IHN0cmluZywgdmFsdWU6IGFueSkge1xuICBpZiAoT2JqZWN0LmdldE93blByb3BlcnR5RGVzY3JpcHRvcihzY29wZSwgbmFtZSkpXG4gICAgc2NvcGVbbmFtZV0gPSB2YWx1ZTtcbiAgZWxzZVxuICAgIGRlZmluZVZhcmlhYmxlSW1wbChzY29wZSwgXCJcIiwgbmFtZSwgeyB2YWx1ZSB9KTtcbn1cblxuZXhwb3J0IGZ1bmN0aW9uIGFwcGx5VmFyaWFibGVzKHNjb3BlOiBhbnksIHZhcmlhYmxlczogb2JqZWN0KSB7XG4gIGZvciAoY29uc3QgWyBuYW1lLCB2YWx1ZSBdIG9mIE9iamVjdC5lbnRyaWVzKHZhcmlhYmxlcykpXG4gICAgU2NvcGVIZWxwZXIuYXBwbHlWYXJpYWJsZShzY29wZSwgbmFtZSwgdmFsdWUpO1xufVxuXG59IC8vIFNjb3BlSGVscGVyXG4iLCIvKlxuICogTUlUIExpY2Vuc2VcbiAqXG4gKiBDb3B5cmlnaHQgKGMpIDIwMjUgIFl1cmlpIFlha3ViaW4gKHl1cmlpLnlha3ViaW5AZ21haWwuY29tKVxuICpcbiAqIFBlcm1pc3Npb24gaXMgZ3JhbnRlZCB0byB1c2UsIGNvcHksIG1vZGlmeSwgYW5kIGRpc3RyaWJ1dGUgdGhpcyBzb2Z0d2FyZVxuICogdW5kZXIgdGhlIE1JVCBMaWNlbnNlLiBTZWUgTElDRU5TRSBmaWxlIGZvciBkZXRhaWxzLlxuICovXG5cbmltcG9ydCB7IEN1c3RvbVNjcmlwdCB9IGZyb20gXCJAL2NvcmUvQ3VzdG9tU2NyaXB0XCI7XG5cbmNvbnN0IE1BUCA9IFN5bWJvbChcIk1BUFwiKTtcbmNvbnN0IEVOVFJJRVMgPSBTeW1ib2woXCJFTlRSSUVTXCIpO1xuXG5leHBvcnQgY2xhc3MgU2NyaXB0Q29sbGVjdGlvbiB7XG4gIHByaXZhdGUgW01BUF06IHsgW25hbWU6IHN0cmluZ106IEN1c3RvbVNjcmlwdCB9O1xuICBwcml2YXRlIFtFTlRSSUVTXTogQ3VzdG9tU2NyaXB0W107XG5cbiAgcHJpdmF0ZSBjb25zdHJ1Y3RvcigpIHtcbiAgICB0aGlzW01BUF0gPSB7fTtcbiAgICB0aGlzW0VOVFJJRVNdID0gW107XG4gIH1cblxuICBwdWJsaWMgc3RhdGljIGNyZWF0ZSgpIHtcbiAgICByZXR1cm4gT2JqZWN0LnNlYWwobmV3IFNjcmlwdENvbGxlY3Rpb24pO1xuICB9XG5cbiAgcHVibGljIGdldCBFTlRSSUVTKCkge1xuICAgIHJldHVybiB0aGlzW0VOVFJJRVNdO1xuICB9XG5cbiAgcHVibGljIGdldChuYW1lOiBzdHJpbmcpOiBDdXN0b21TY3JpcHQgfCB1bmRlZmluZWQge1xuICAgIHJldHVybiB0aGlzW01BUF1bbmFtZV07XG4gIH1cblxuICBwdWJsaWMgc2V0KG5hbWU6IHN0cmluZywgdGFyZ2V0OiBDdXN0b21TY3JpcHQpIHtcbiAgICBpZiAoIW5hbWUpXG4gICAgICB0aHJvdyBuZXcgRXJyb3IoXCJOb3Qgc3VwcG9ydGVkIG1wdHkgbmFtZSBmb3IgQ3VzdG9tU2NyaXB0XCIpO1xuICAgIGlmICh0aGlzW01BUF1bbmFtZV0pXG4gICAgICB0aHJvdyBuZXcgRXJyb3IoYFNjcmlwdCBcIiR7bmFtZX1cIiBleGlzdHNgKTtcbiAgICB0aGlzW01BUF1bbmFtZV0gPSB0YXJnZXQ7XG4gICAgdGhpc1tFTlRSSUVTXS5wdXNoKHRhcmdldCk7XG4gIH1cblxuICBwdWJsaWMgYWRkKHRhcmdldDogQ3VzdG9tU2NyaXB0KSB7XG4gICAgdGhpc1tFTlRSSUVTXS5wdXNoKHRhcmdldCk7XG4gIH1cbiAgXG4gIHB1YmxpYyB0b0pTT04oKTogb2JqZWN0IHtcbiAgICByZXR1cm4gdGhpc1tFTlRSSUVTXTtcbiAgfVxufTtcbiIsIi8qXG4gKiBNSVQgTGljZW5zZVxuICpcbiAqIENvcHlyaWdodCAoYykgMjAyNSAgWXVyaWkgWWFrdWJpbiAoeXVyaWkueWFrdWJpbkBnbWFpbC5jb20pXG4gKlxuICogUGVybWlzc2lvbiBpcyBncmFudGVkIHRvIHVzZSwgY29weSwgbW9kaWZ5LCBhbmQgZGlzdHJpYnV0ZSB0aGlzIHNvZnR3YXJlXG4gKiB1bmRlciB0aGUgTUlUIExpY2Vuc2UuIFNlZSBMSUNFTlNFIGZpbGUgZm9yIGRldGFpbHMuXG4gKi9cblxuaW1wb3J0IHsgZW5zdXJlQm9vbGVhbiB9IGZyb20gXCJAL3V0aWxzL1N0cmljdFR5cGVcIjtcbmltcG9ydCB7IEFic29sdXRlUGF0aCB9IGZyb20gXCJAL2NvcmUvUGF0aFwiO1xuaW1wb3J0IHsgU3lzdGVtU2NvcGUgfSBmcm9tIFwiQC9jb3JlL1N5c3RlbVNjb3BlXCI7XG5cbmNvbnN0IE5BTUUgICAgICAgICAgICAgICAgPSBTeW1ib2woXCJOQU1FXCIpO1xuY29uc3QgTEFOR1VBR0UgICAgICAgICAgICA9IFN5bWJvbChcIkxBTkdVQUdFXCIpO1xuY29uc3QgSEVBREVSX0ZJTEVfT05MWSAgICA9IFN5bWJvbChcIkhFQURFUl9GSUxFX09OTFlcIik7XG5jb25zdCBERUZJTkVTICAgICAgICAgICAgID0gU3ltYm9sKFwiREVGSU5FU1wiKTtcbmNvbnN0IENPTVBJTEVfRkxBR1MgICAgICAgPSBTeW1ib2woXCJDT01QSUxFX0ZMQUdTXCIpO1xuY29uc3QgRklMRSAgICAgICAgICAgICAgICA9IFN5bWJvbChcIkZJTEVcIik7XG5jb25zdCBPQkpFQ1RfRklMRSAgICAgICAgID0gU3ltYm9sKFwiT0JKRUNUX0ZJTEVcIik7XG5cbmNvbnN0IF9sYW5ndWFnZUV4dGVuc2lvbnMgPSB7XG4gIEFTTTogWyBcIi5hc21cIiwgXCIuc1wiIF0sXG4gIEM6ICAgWyBcIi5jXCIgXSxcbiAgQ1hYOiBbXCIuY3BwXCIsIFwiLmNjXCIsIFwiLmN4eFwiIF0sXG59O1xuXG5mdW5jdGlvbiBpc1N1cHBvcnRMYW5ndWFnZShsYW5ndWFnZTogc3RyaW5nKSB7XG4gIHJldHVybiBfbGFuZ3VhZ2VFeHRlbnNpb25zLmhhc093blByb3BlcnR5KGxhbmd1YWdlKTtcbn1cblxuZnVuY3Rpb24gZ2V0RmlsZUxhbmd1YWdlKGZpbGVuYW1lOiBhbnkpIHtcbiAgY29uc3QgZmlsZW5hbWVMb3dlckNhc2UgPSBmaWxlbmFtZS50b1N0cmluZygpLnRvTG93ZXJDYXNlKCk7XG4gIGZvciAoY29uc3QgW2xhbmd1YWdlLCBleHRlbnNpb25zXSBvZiBPYmplY3QuZW50cmllcyhfbGFuZ3VhZ2VFeHRlbnNpb25zKSkge1xuICAgIGZvciAoY29uc3QgaXRlciBvZiBleHRlbnNpb25zKSB7XG4gICAgICBpZiAoZmlsZW5hbWVMb3dlckNhc2UuZW5kc1dpdGgoaXRlcikpXG4gICAgICAgIHJldHVybiBsYW5ndWFnZTtcbiAgICB9XG4gIH1cbiAgcmV0dXJuIFwiXCI7XG59XG5cbmZ1bmN0aW9uIG1ha2VMYW5ndWFnZSh2YWx1ZTogc3RyaW5nKSB7XG4gIGlmIChpc1N1cHBvcnRMYW5ndWFnZSh2YWx1ZSkpXG4gICAgcmV0dXJuIHZhbHVlO1xuICB0aHJvdyBuZXcgRXJyb3IoYExhbmd1YWdlIFwiJHt2YWx1ZX1cIiBpcyBub3Qgc3VwcG9ydGVkYCk7XG59XG5cbmV4cG9ydCBjbGFzcyBTb3VyY2VGaWxlIHtcbiAgcHJpdmF0ZSBbTkFNRV06IHN0cmluZztcbiAgcHJpdmF0ZSBbTEFOR1VBR0VdOiBzdHJpbmc7XG4gIHByaXZhdGUgW0hFQURFUl9GSUxFX09OTFldOiBib29sZWFuO1xuICBwcml2YXRlIFtGSUxFXTogQWJzb2x1dGVQYXRoO1xuICBwcml2YXRlIFtPQkpFQ1RfRklMRV06IEFic29sdXRlUGF0aCB8IG51bGw7XG4gIHByaXZhdGUgW0RFRklORVNdOiBzdHJpbmdbXTtcbiAgcHJpdmF0ZSBbQ09NUElMRV9GTEFHU106IHN0cmluZ1tdO1xuXG4gIHByaXZhdGUgY29uc3RydWN0b3Ioc2NvcGU6IFN5c3RlbVNjb3BlLCBmaWxlbmFtZTogQWJzb2x1dGVQYXRofHN0cmluZykge1xuICAgIHRoaXNbTkFNRV0gPSBmaWxlbmFtZS50b1N0cmluZygpO1xuICAgIGNvbnN0IGZuYW1lID0gc2NvcGUuU09VUkNFX0RJUi5yZXNvbHZlKGZpbGVuYW1lKTtcbiAgXG4gICAgY29uc3QgbGFuZ3VhZ2UgPSBnZXRGaWxlTGFuZ3VhZ2UoZm5hbWUpO1xuICAgIHRoaXNbTEFOR1VBR0VdID0gbGFuZ3VhZ2U7XG4gICAgdGhpc1tIRUFERVJfRklMRV9PTkxZXSA9ICFsYW5ndWFnZTtcbiAgICB0aGlzW0ZJTEVdID0gZm5hbWU7XG4gICAgdGhpc1tPQkpFQ1RfRklMRV0gPSBudWxsO1xuICAgIHRoaXNbREVGSU5FU10gPSBbXTtcbiAgICB0aGlzW0NPTVBJTEVfRkxBR1NdID0gIWxhbmd1YWdlID8gW10gOiBbXG4gICAgICAuLi4oc2NvcGUgYXMgYW55KVtsYW5ndWFnZSArIFwiX0ZMQUdTXCJdLFxuICAgICAgLi4uKHNjb3BlIGFzIGFueSlbbGFuZ3VhZ2UgKyBcIl9GTEFHU19cIiArIHNjb3BlLkJVSUxEX1RZUEUudG9VcHBlckNhc2UoKV0sXG4gICAgXTtcbiAgfVxuXG4gIHB1YmxpYyBzdGF0aWMgY3JlYXRlKHNjb3BlOiBhbnksIGZpbGVuYW1lOiBBYnNvbHV0ZVBhdGh8c3RyaW5nKSB7XG4gICAgcmV0dXJuIE9iamVjdC5zZWFsKG5ldyBTb3VyY2VGaWxlKHNjb3BlLCBmaWxlbmFtZSkpO1xuICB9XG5cbiAgcHVibGljIGdldCBOQU1FKCk6IHN0cmluZyB7XG4gICAgcmV0dXJuIHRoaXNbTkFNRV07XG4gIH1cblxuICBwdWJsaWMgZ2V0IExBTkdVQUdFKCk6IHN0cmluZyB7XG4gICAgcmV0dXJuIHRoaXNbTEFOR1VBR0VdO1xuICB9XG5cbiAgcHVibGljIGdldCBIRUFERVJfRklMRV9PTkxZKCk6IGJvb2xlYW4ge1xuICAgIHJldHVybiB0aGlzW0hFQURFUl9GSUxFX09OTFldO1xuICB9XG5cbiAgcHVibGljIHNldCBIRUFERVJfRklMRV9PTkxZKHZhbHVlOiBib29sZWFuKSB7XG4gICAgdGhpc1tIRUFERVJfRklMRV9PTkxZXSA9IGVuc3VyZUJvb2xlYW4odmFsdWUpO1xuICB9XG5cbiAgcHVibGljIGdldCBERUZJTkVTKCkge1xuICAgIHJldHVybiB0aGlzW0RFRklORVNdXG4gIH1cblxuICBwdWJsaWMgZ2V0IENPTVBJTEVfRkxBR1MoKSB7XG4gICAgcmV0dXJuIHRoaXNbQ09NUElMRV9GTEFHU107XG4gIH1cblxuICBwdWJsaWMgZ2V0IEZJTEUoKTogQWJzb2x1dGVQYXRoIHtcbiAgICByZXR1cm4gdGhpc1tGSUxFXTtcbiAgfVxuXG4gIHB1YmxpYyBnZXQgRklMRV9ESVIoKTogQWJzb2x1dGVQYXRoIHtcbiAgICByZXR1cm4gdGhpc1tGSUxFXS5kaXJuYW1lKCk7XG4gIH1cblxuICBwdWJsaWMgZ2V0IEZJTEVfTkFNRSgpOiBzdHJpbmcge1xuICAgIHJldHVybiB0aGlzW0ZJTEVdLmJhc2VuYW1lKCk7XG4gIH1cblxuICBwdWJsaWMgZ2V0IE9CSkVDVF9GSUxFKCk6IEFic29sdXRlUGF0aCB8IG51bGwge1xuICAgIHJldHVybiB0aGlzW09CSkVDVF9GSUxFXTtcbiAgfVxuXG4gIHB1YmxpYyBzZXQgT0JKRUNUX0ZJTEUodmFsdWU6IEFic29sdXRlUGF0aCkge1xuICAgIHRoaXNbT0JKRUNUX0ZJTEVdID0gdmFsdWU7XG4gIH1cblxuICBwdWJsaWMgZ2V0IE9CSkVDVF9GSUxFX0RJUigpOiBBYnNvbHV0ZVBhdGggfCBudWxsIHtcbiAgICByZXR1cm4gdGhpc1tPQkpFQ1RfRklMRV0gPyB0aGlzW09CSkVDVF9GSUxFXS5kaXJuYW1lKCkgOiBudWxsO1xuICB9XG5cbiAgcHVibGljIGdldCBPQkpFQ1RfRklMRV9OQU1FKCk6IHN0cmluZyB8IG51bGwge1xuICAgIHJldHVybiB0aGlzW09CSkVDVF9GSUxFXSA/IHRoaXNbT0JKRUNUX0ZJTEVdLmJhc2VuYW1lKCkgOiBudWxsO1xuICB9XG5cbiAgcHVibGljIHRvSlNPTigpOiBvYmplY3Qge1xuICAgIHJldHVybiB7XG4gICAgICBOQU1FOiB0aGlzLk5BTUUsXG4gICAgICBMQU5HVUFHRTogdGhpcy5MQU5HVUFHRSxcbiAgICAgIEhFQURFUl9GSUxFX09OTFk6IHRoaXMuSEVBREVSX0ZJTEVfT05MWSxcbiAgICAgIERFRklORVM6IHRoaXMuREVGSU5FUyxcbiAgICAgIENPTVBJTEVfRkxBR1M6IHRoaXMuQ09NUElMRV9GTEFHUyxcbiAgICAgIEZJTEU6IHRoaXMuRklMRSxcbiAgICAgIEZJTEVfRElSOiB0aGlzLkZJTEVfRElSLFxuICAgICAgRklMRV9OQU1FOiB0aGlzLkZJTEVfTkFNRSxcbiAgICAgIE9CSkVDVF9GSUxFOiB0aGlzLk9CSkVDVF9GSUxFLFxuICAgICAgT0JKRUNUX0ZJTEVfRElSOiB0aGlzLk9CSkVDVF9GSUxFX0RJUixcbiAgICAgIE9CSkVDVF9GSUxFX05BTUU6IHRoaXMuT0JKRUNUX0ZJTEVfTkFNRSxcbiAgICB9O1xuICB9XG59XG4iLCIvKlxuICogTUlUIExpY2Vuc2VcbiAqXG4gKiBDb3B5cmlnaHQgKGMpIDIwMjUgIFl1cmlpIFlha3ViaW4gKHl1cmlpLnlha3ViaW5AZ21haWwuY29tKVxuICpcbiAqIFBlcm1pc3Npb24gaXMgZ3JhbnRlZCB0byB1c2UsIGNvcHksIG1vZGlmeSwgYW5kIGRpc3RyaWJ1dGUgdGhpcyBzb2Z0d2FyZVxuICogdW5kZXIgdGhlIE1JVCBMaWNlbnNlLiBTZWUgTElDRU5TRSBmaWxlIGZvciBkZXRhaWxzLlxuICovXG5cbmltcG9ydCB7IFNvdXJjZUZpbGUgfSBmcm9tIFwiQC9jb3JlL1NvdXJjZUZpbGVcIjtcbmltcG9ydCB7IFN5c3RlbVNjb3BlIH0gZnJvbSBcIkAvY29yZS9TeXN0ZW1TY29wZVwiO1xuXG5jb25zdCBTT1VSQ0VTID0gU3ltYm9sKFwiU09VUkNFU1wiKTtcblxuZXhwb3J0IGNsYXNzIFNvdXJjZUZpbGVMaXN0IHtcbiAgcHJpdmF0ZSBbU09VUkNFU106IFNvdXJjZUZpbGVbXTtcblxuICBwcml2YXRlIGNvbnN0cnVjdG9yKHNjb3BlOiBTeXN0ZW1TY29wZSwgc291cmNlczogU291cmNlRmlsZVtdKSB7XG4gICAgdGhpc1tTT1VSQ0VTXSA9IFtdO1xuICAgIGZvciAoY29uc3QgaXRlciBvZiBzb3VyY2VzKSB7XG4gICAgICBpZiAoIShpdGVyIGluc3RhbmNlb2YgU291cmNlRmlsZSkpXG4gICAgICAgIHRocm93IG5ldyBFcnJvcihgSXRlbSAke2l0ZXJ9IGlzIG5vdCBTb3VyY2VGaWxlYCk7XG4gICAgICB0aGlzW1NPVVJDRVNdLnB1c2goaXRlcik7XG4gICAgfVxuICB9XG5cbiAgcHVibGljIHN0YXRpYyBjcmVhdGUoc2NvcGU6IFN5c3RlbVNjb3BlLCBzb3VyY2VzOiBTb3VyY2VGaWxlW10pIHtcbiAgICByZXR1cm4gT2JqZWN0LnNlYWwobmV3IFNvdXJjZUZpbGVMaXN0KHNjb3BlLCBzb3VyY2VzKSk7XG4gIH1cblxuICBwdWJsaWMgYWRkRGVmaW5pdGlvbnMoLi4uZGVmaW5pdGlvbnM6IHN0cmluZ1tdKSB7XG4gICAgZm9yIChjb25zdCBpdGVyIG9mIGRlZmluaXRpb25zLmZsYXQoKSlcbiAgICAgIHRoaXNbU09VUkNFU10uZm9yRWFjaChpID0+IGkuREVGSU5FUy5wdXNoKGl0ZXIpKTtcbiAgfVxuXG4gIHB1YmxpYyBhZGRDb21waWxlRmxhZ3MoLi4uZmxhZ3M6IHN0cmluZ1tdKSB7XG4gICAgZm9yIChjb25zdCBpdGVyIG9mIGZsYWdzLmZsYXQoKSlcbiAgICAgIHRoaXNbU09VUkNFU10uZm9yRWFjaChpID0+IGkuQ09NUElMRV9GTEFHUy5wdXNoKGl0ZXIpKTtcbiAgfVxuXG4gIHB1YmxpYyBzb3VyY2VBdChpbmRleDogbnVtYmVyKTogU291cmNlRmlsZSB7XG4gICAgcmV0dXJuIHRoaXNbU09VUkNFU11baW5kZXhdO1xuICB9XG5cbiAgcHVibGljIHNvdXJjZUNvdW50KGluZGV4OiBudW1iZXIpOiBudW1iZXIge1xuICAgIHJldHVybiB0aGlzW1NPVVJDRVNdLmxlbmd0aDtcbiAgfVxuXG4gIHB1YmxpYyB0b0pTT04oKTogb2JqZWN0IHtcbiAgICByZXR1cm4gdGhpc1tTT1VSQ0VTXTtcbiAgfVxufTtcbiIsIi8qXG4gKiBNSVQgTGljZW5zZVxuICpcbiAqIENvcHlyaWdodCAoYykgMjAyNSAgWXVyaWkgWWFrdWJpbiAoeXVyaWkueWFrdWJpbkBnbWFpbC5jb20pXG4gKlxuICogUGVybWlzc2lvbiBpcyBncmFudGVkIHRvIHVzZSwgY29weSwgbW9kaWZ5LCBhbmQgZGlzdHJpYnV0ZSB0aGlzIHNvZnR3YXJlXG4gKiB1bmRlciB0aGUgTUlUIExpY2Vuc2UuIFNlZSBMSUNFTlNFIGZpbGUgZm9yIGRldGFpbHMuXG4gKi9cblxuaW1wb3J0IG9zIGZyb20gXCJub2RlOm9zXCI7XG5pbXBvcnQgeyBERUJVR19CVUlMRF9UWVBFLCBSRUxFQVNFX0JVSUxEX1RZUEUgfSBmcm9tIFwiQC9jb3JlL1R5cGVzXCI7XG5pbXBvcnQgeyBnZXRTaXplb2ZWb2lkcCB9IGZyb20gXCJAL2NvcmUvR2V0U2l6ZW9mVm9pZHBcIjtcblxuZXhwb3J0IGRlZmF1bHQge1xuICBTWVNURU1fTkFNRToge1xuICAgIGRlc2NyaXB0aW9uOiBcIkRlZmluZXMgdGhlIHRhcmdldCBPUyBmb3IgdGhlIGJ1aWxkLCB1c2VkIGluIGNyb3NzLWNvbXBpbGF0aW9uIGFuZCBuYXRpdmUgYnVpbGRzXCIsXG4gICAgdmFsdWU6IFwiTGludXhcIixcbiAgfSxcbiAgU1lTVEVNX1BST0NFU1NPUjoge1xuICAgIGRlc2NyaXB0aW9uOiBcIkRlZmluZXMgdGhlIHRhcmdldCBDUFUgYXJjaGl0ZWN0dXJlXCIsXG4gICAgdmFsdWU6IFwid2FzbTMyXCIsXG4gIH0sXG4gIFBST0pFQ1RfTkFNRToge1xuICAgIGRlc2NyaXB0aW9uOiBcIk5hbWUgb2YgdGhlIGN1cnJlbnQgcHJvamVjdFwiLFxuICAgIHZhbHVlOiBcIlwiLFxuICB9LFxuICBQUk9KRUNUX1ZFUlNJT046IHtcbiAgICBkZXNjcmlwdGlvbjogXCJWZXJzaW9uIG9mIHRoZSBjdXJyZW50IHByb2plY3RcIixcbiAgICB2YWx1ZTogXCJcIixcbiAgfSxcbiAgUFJPSkVDVF9ERVNDUklQVElPTjoge1xuICAgIGRlc2NyaXB0aW9uOiBcIkRlc2NyaXB0aW9uIG9mIHRoZSBjdXJyZW50IHByb2plY3RcIixcbiAgICB2YWx1ZTogXCJcIixcbiAgfSxcbiAgUFJPSkVDVF9IT01FUEFHRV9VUkw6IHtcbiAgICBkZXNjcmlwdGlvbjogXCJIb21lcGFnZSBVUkwgb2YgdGhlIGN1cnJlbnQgcHJvamVjdFwiLFxuICAgIHZhbHVlOiBcIlwiLFxuICB9LFxuICBQUk9KRUNUX1NPVVJDRV9ESVI6IHtcbiAgICBkZXNjcmlwdGlvbjogXCJBYnNvbHV0ZSBwYXRoIHRvIHRoZSB0b3AtbGV2ZWwgc291cmNlIGRpcmVjdG9yeSBvZiB0aGUgcHJvamVjdFwiLFxuICAgIHR5cGU6IFwiRGlyUGF0aFwiLFxuICB9LFxuICBQUk9KRUNUX0JJTkFSWV9ESVI6IHtcbiAgICBkZXNjcmlwdGlvbjogXCJBYnNvbHV0ZSBwYXRoIHRvIHRoZSB0b3AtbGV2ZWwgYnVpbGQgKGJpbmFyeSkgZGlyZWN0b3J5IG9mIHRoZSBwcm9qZWN0XCIsXG4gICAgdHlwZTogXCJEaXJQYXRoXCIsXG4gIH0sXG4gIFNDUklQVF9GSUxFOiB7XG4gICAgZGVzY3JpcHRpb246IFwiRnVsbCBwYXRoIHRvIHRoZSBjdXJyZW50IE1ha2VTY3JpcHQgZmlsZSBiZWluZyBwcm9jZXNzZWRcIixcbiAgICB0eXBlOiBcIkZpbGVQYXRoXCIsXG4gIH0sXG4gIFNDUklQVF9ESVI6IHtcbiAgICBkZXNjcmlwdGlvbjogXCJEaXJlY3Rvcnkgb2YgdGhlIGN1cnJlbnQgTWFrZVNjcmlwdCBmaWxlIGJlaW5nIHByb2Nlc3NlZFwiLFxuICAgIHR5cGU6IFwiRGlyUGF0aFwiLFxuICB9LFxuICBQQUNLQUdFX0ZJTEU6IHtcbiAgICBkZXNjcmlwdGlvbjogXCJGaWxlbmFtZSBvZiBwcm9qZWN0IG1hbmlmZXN0IGNvbnRhaW5pbmcgbWV0YWRhdGEgYW5kIGRlcGVuZGVuY2llc1wiLFxuICAgIHR5cGU6IFwiRmlsZVBhdGhcIixcbiAgfSxcbiAgQ0FDSEVfRklMRToge1xuICAgIGRlc2NyaXB0aW9uOiBcIkRlZmF1bHQgZmlsZW5hbWUgb2YgdGhlIEJpdE1ha2UgY2FjaGUgc3RvcmluZyBzZXR0aW5nc1wiLFxuICAgIHR5cGU6IFwiRmlsZVBhdGhcIixcbiAgfSxcbiAgVE9PTENIQUlOX0ZJTEU6IHtcbiAgICBkZXNjcmlwdGlvbjogXCJTcGVjaWZpZXMgdGhlIHBhdGggdG8gYSB0b29sY2hhaW4gZmlsZSB1c2VkIGZvciBjcm9zcy1jb21waWxhdGlvblwiLFxuICAgIHR5cGU6IFwiRmlsZVBhdGhcIixcbiAgfSxcbiAgQlVJTERfVFlQRToge1xuICAgIGRlc2NyaXB0aW9uOiBcIlNwZWNpZmllcyB0aGUgYnVpbGQgY29uZmlndXJhdGlvbiBmb3IgY29udHJvbGxpbmcgb3B0aW1pemF0aW9uIGxldmVscyBhbmQgZGVidWcgaW5mb3JtYXRpb24gaW4gdGhlIGJ1aWxkIHByb2Nlc3NcIixcbiAgICB0eXBlOiBbIERFQlVHX0JVSUxEX1RZUEUsIFJFTEVBU0VfQlVJTERfVFlQRSBdLFxuICAgIHZhbHVlOiBSRUxFQVNFX0JVSUxEX1RZUEUsXG4gIH0sXG4gIElOU1RBTExfUFJFRklYOiB7XG4gICAgZGVzY3JpcHRpb246IFwiVGhlIHJvb3QgZGlyZWN0b3J5IHdoZXJlIGZpbGVzIHdpbGwgYmUgaW5zdGFsbGVkIGJ5IGRlZmF1bHRcIixcbiAgICB0eXBlOiBcIkRpclBhdGhcIixcbiAgICB2YWx1ZTogXCIvdXNyXCIsXG4gIH0sXG4gIERFU1RESVI6IHtcbiAgICBkZXNjcmlwdGlvbjogXCJUZW1wb3JhcnkgaW5zdGFsbGF0aW9uIHJvb3RcIixcbiAgICB0eXBlOiBcIkRpclBhdGhcIixcbiAgfSxcbiAgU09VUkNFX0RJUjoge1xuICAgIGRlc2NyaXB0aW9uOiBcIlBhdGggdG8gdGhlIHNvdXJjZSBkaXJlY3RvcnkgY3VycmVudGx5IGJlaW5nIHByb2Nlc3NlZFwiLFxuICAgIHR5cGU6IFwiRGlyUGF0aFwiLFxuICB9LFxuICBCSU5BUllfRElSOiB7XG4gICAgZGVzY3JpcHRpb246IFwiUGF0aCB0byB0aGUgYmluYXJ5IGRpcmVjdG9yeSBjdXJyZW50bHkgYmVpbmcgcHJvY2Vzc2VkXCIsXG4gICAgdHlwZTogXCJEaXJQYXRoXCIsXG4gIH0sXG4gIFBPU0lUSU9OX0lOREVQRU5ERU5UX0NPREU6IHtcbiAgICBkZXNjcmlwdGlvbjogXCJFbmFibGVzIFBvc2l0aW9uLUluZGVwZW5kZW50IENvZGUgKFBJQykgZm9yIGJ1aWxkaW5nIHNoYXJlZCBsaWJyYXJpZXNcIixcbiAgICB2YWx1ZTogZmFsc2UsXG4gIH0sXG4gIFBSRVZFTlRfSU5TVEFMTF9GSUxFUzoge1xuICAgIGRlc2NyaXB0aW9uOiBcIlByZXZlbnQgaW5zdGFsbGF0aW9uIG9mIGZpbGVzXCIsXG4gICAgdmFsdWU6IGZhbHNlLFxuICB9LFxuICBIT1NUX1NZU1RFTV9OQU1FOiB7XG4gICAgZGVzY3JpcHRpb246IFwiU3BlY2lmaWVzIHRoZSBPUyBvZiB0aGUgbWFjaGluZSBydW5uaW5nXCIsXG4gICAgdmFsdWU6IG9zLnR5cGUoKSxcbiAgfSxcbiAgSU5DTFVERVM6IHtcbiAgICBkZXNjcmlwdGlvbjogXCJQYXRocyBzZWFyY2hlZCBmb3IgaGVhZGVyIGZpbGVzXCIsXG4gICAgdmFsdWU6IFtdLFxuICB9LFxuICBBU01fQ09NUElMRVI6IHtcbiAgICBkZXNjcmlwdGlvbjogXCJQYXRoIHRvIHRoZSBhc3NlbWJsZXIgY29tcGlsZXIgZGV0ZWN0ZWRcIixcbiAgICB2YWx1ZTogXCJcIixcbiAgfSxcbiAgQVNNX0ZMQUdTOiB7XG4gICAgZGVzY3JpcHRpb246IFwiRmxhZ3MgcGFzc2VkIHRvIHRoZSBhc3NlbWJsZXIgY29tcGlsZXJcIixcbiAgICB2YWx1ZTogW10sXG4gIH0sXG4gIEFTTV9GTEFHU19ERUJVRzoge1xuICAgIGRlc2NyaXB0aW9uOiBcIkFkZGl0aW9uYWwgYXNzZW1ibGVyIGZsYWdzIHVzZWQgd2hlbiBidWlsZGluZyBpbiBEZWJ1ZyBtb2RlXCIsXG4gICAgdmFsdWU6IFsgXCItZ1wiIF0sXG4gIH0sXG4gIEFTTV9GTEFHU19SRUxFQVNFOiB7XG4gICAgZGVzY3JpcHRpb246IFwiQWRkaXRpb25hbCBhc3NlbWJsZXIgZmxhZ3MgdXNlZCB3aGVuIGJ1aWxkaW5nIGluIFJlbGVhc2UgbW9kZVwiLFxuICAgIHZhbHVlOiBbIFwiLU8zXCIsIFwiLUROREVCVUdcIiBdLFxuICB9LFxuICBDX0NPTVBJTEVSOiB7XG4gICAgZGVzY3JpcHRpb246IFwiUGF0aCB0byB0aGUgQyBjb21waWxlciBkZXRlY3RlZFwiLFxuICAgIHZhbHVlOiBcIlwiLFxuICB9LFxuICBDX0ZMQUdTOiB7XG4gICAgZGVzY3JpcHRpb246IFwiRmxhZ3MgcGFzc2VkIHRvIHRoZSBDIGNvbXBpbGVyXCIsXG4gICAgdmFsdWU6IFtdLFxuICB9LFxuICBDX0ZMQUdTX0RFQlVHOiB7XG4gICAgZGVzY3JpcHRpb246IFwiQWRkaXRpb25hbCBDIGNvbXBpbGVyIGZsYWdzIHVzZWQgd2hlbiBidWlsZGluZyBpbiBEZWJ1ZyBtb2RlXCIsXG4gICAgdmFsdWU6IFsgXCItZ1wiIF0sXG4gIH0sXG4gIENfRkxBR1NfUkVMRUFTRToge1xuICAgIGRlc2NyaXB0aW9uOiBcIkFkZGl0aW9uYWwgQyBjb21waWxlciBmbGFncyB1c2VkIHdoZW4gYnVpbGRpbmcgaW4gUmVsZWFzZSBtb2RlXCIsXG4gICAgdmFsdWU6IFsgXCItTzNcIiwgXCItRE5ERUJVR1wiIF0sXG4gIH0sXG4gIENYWF9DT01QSUxFUjoge1xuICAgIGRlc2NyaXB0aW9uOiBcIlBhdGggdG8gdGhlIEMrKyBjb21waWxlciBkZXRlY3RlZFwiLFxuICAgIHZhbHVlOiBcIlwiLFxuICB9LFxuICBDWFhfRkxBR1M6IHtcbiAgICBkZXNjcmlwdGlvbjogXCJGbGFncyBwYXNzZWQgdG8gdGhlIEMgY29tcGlsZXJcIixcbiAgICB2YWx1ZTogW10sXG4gIH0sXG4gIENYWF9GTEFHU19ERUJVRzoge1xuICAgIGRlc2NyaXB0aW9uOiBcIkFkZGl0aW9uYWwgQysrIGNvbXBpbGVyIGZsYWdzIHVzZWQgd2hlbiBidWlsZGluZyBpbiBEZWJ1ZyBtb2RlXCIsXG4gICAgdmFsdWU6IFsgXCItZ1wiIF0sXG4gIH0sXG4gIENYWF9GTEFHU19SRUxFQVNFOiB7XG4gICAgZGVzY3JpcHRpb246IFwiQWRkaXRpb25hbCBDKysgY29tcGlsZXIgZmxhZ3MgdXNlZCB3aGVuIGJ1aWxkaW5nIGluIFJlbGVhc2UgbW9kZVwiLFxuICAgIHZhbHVlOiBbIFwiLU8zXCIsIFwiLUROREVCVUdcIiBdLFxuICB9LFxuICBBUjoge1xuICAgIGRlc2NyaXB0aW9uOiBcIlBhdGggdG8gdGhlIGFyY2hpdmVyIHRvb2wgdXNlZCB0byBjcmVhdGUgc3RhdGljIGxpYnJhcmllc1wiLFxuICAgIHZhbHVlOiBcIlwiLFxuICB9LFxuICBSQU5MSUI6IHtcbiAgICBkZXNjcmlwdGlvbjogXCJUb29sIHVzZWQgdG8gZ2VuZXJhdGUgYW4gaW5kZXggdG8gdGhlIGNvbnRlbnRzIG9mIGFuIGFyY2hpdmUgKHN0YXRpYyBsaWJyYXJ5KVwiLFxuICAgIHZhbHVlOiBcIlwiLFxuICB9LFxuICBMSU5LRVI6IHtcbiAgICBkZXNjcmlwdGlvbjogXCJQYXRoIHRvIHRoZSBsaW5rZXIgdXNlZCB0byBsaW5rIG9iamVjdCBmaWxlcyBhbmQgbGlicmFyaWVzIGludG8gZXhlY3V0YWJsZXNcIixcbiAgICB2YWx1ZTogXCJcIixcbiAgfSxcbiAgTk06IHtcbiAgICBkZXNjcmlwdGlvbjogXCJQYXRoIHRvIHRoZSB0b29sIHVzZWQgdG8gbGlzdCBzeW1ib2xzIGZyb20gb2JqZWN0IGZpbGVzIG9yIGFyY2hpdmVzXCIsXG4gICAgdmFsdWU6IFwiXCIsXG4gIH0sXG4gIE9CSkNPUFk6IHtcbiAgICBkZXNjcmlwdGlvbjogXCJQYXRoIHRvIHRoZSB0b29sIHVzZWQgdG8gY29weSBhbmQgdHJhbnNsYXRlIG9iamVjdCBmaWxlc1wiLFxuICAgIHZhbHVlOiBcIlwiLFxuICB9LFxuICBPQkpEVU1QOiB7XG4gICAgZGVzY3JpcHRpb246IFwiUGF0aCB0byB0aGUgdG9vbCB1c2VkIHRvIGRpc3BsYXkgaW5mb3JtYXRpb24gYWJvdXQgb2JqZWN0IGZpbGVzLCBzdWNoIGFzIGRpc2Fzc2VtYmx5XCIsXG4gICAgdmFsdWU6IFwiXCIsXG4gIH0sXG4gIFNUUklQOiB7XG4gICAgZGVzY3JpcHRpb246IFwiUGF0aCB0byB0aGUgdG9vbCB1c2VkIHRvIHJlbW92ZSBzeW1ib2xzIGZyb20gb2JqZWN0IGZpbGVzIG9yIGV4ZWN1dGFibGVzIHRvIHJlZHVjZSBzaXplXCIsXG4gICAgdmFsdWU6IFwiXCIsXG4gIH0sXG4gIE9CSkVDVF9MSUJSQVJZX1BSRUZJWDoge1xuICAgIGRlc2NyaXB0aW9uOiBcIlByZWZpeCB1c2VkIGZvciBvYmplY3QgbGlicmFyaWVzXCIsXG4gICAgdmFsdWU6IFwiXCIsXG4gIH0sXG4gIE9CSkVDVF9MSUJSQVJZX1NVRkZJWDoge1xuICAgIGRlc2NyaXB0aW9uOiBcIlN1ZmZpeCB1c2VkIGZvciBvYmplY3QgbGlicmFyeSBmaWxlc1wiLFxuICAgIHZhbHVlOiBcIi5vXCIsXG4gIH0sXG4gIE9CSkVDVF9MSU5LRVJfRkxBR1M6IHtcbiAgICBkZXNjcmlwdGlvbjogXCJGbGFncyBwYXNzZWQgdG8gdGhlIGxpbmtlciB3aGVuIGNyZWF0aW5nIG9iamVjdCBsaWJyYXJpZXNcIixcbiAgICB2YWx1ZTogW10sXG4gIH0sXG4gIFNUQVRJQ19MSUJSQVJZX1BSRUZJWDoge1xuICAgIGRlc2NyaXB0aW9uOiBcIlByZWZpeCB1c2VkIGZvciBzdGF0aWMgbGlicmFyeSBmaWxlc1wiLFxuICAgIHZhbHVlOiBcImxpYlwiLFxuICB9LFxuICBTVEFUSUNfTElCUkFSWV9TVUZGSVg6IHtcbiAgICBkZXNjcmlwdGlvbjogXCJTdWZmaXggdXNlZCBmb3Igc3RhdGljIGxpYnJhcnkgZmlsZXNcIixcbiAgICB2YWx1ZTogXCIuYVwiLFxuICB9LFxuICBTVEFUSUNfTElOS0VSX0ZMQUdTOiB7XG4gICAgZGVzY3JpcHRpb246IFwiRmxhZ3MgcGFzc2VkIHRvIHRoZSBsaW5rZXIgd2hlbiBjcmVhdGluZyBzdGF0aWMgbGlicmFyaWVzXCIsXG4gICAgdmFsdWU6IFtdLFxuICB9LFxuICBTSEFSRURfTElCUkFSWV9QUkVGSVg6IHtcbiAgICBkZXNjcmlwdGlvbjogXCJQcmVmaXggdXNlZCBmb3Igc2hhcmVkIGxpYnJhcnkgZmlsZXNcIixcbiAgICB2YWx1ZTogXCJsaWJcIixcbiAgfSxcbiAgU0hBUkVEX0xJQlJBUllfU1VGRklYOiB7XG4gICAgZGVzY3JpcHRpb246IFwiU3VmZml4IHVzZWQgZm9yIHNoYXJlZCBsaWJyYXJ5IGZpbGVzXCIsXG4gICAgdmFsdWU6IFwiLnNvXCIsXG4gIH0sXG4gIFNIQVJFRF9MSU5LRVJfRkxBR1M6IHtcbiAgICBkZXNjcmlwdGlvbjogXCJGbGFncyBwYXNzZWQgdG8gdGhlIGxpbmtlciB3aGVuIGNyZWF0aW5nIHNoYXJlZCBsaWJyYXJpZXNcIixcbiAgICB2YWx1ZTogW10sXG4gIH0sXG4gIEVYRUNVVEFCTEVfU1VGRklYOiB7XG4gICAgZGVzY3JpcHRpb246IFwiU3VmZml4IHVzZWQgZm9yIGV4ZWN1dGFibGUgZmlsZXNcIixcbiAgICB2YWx1ZTogXCJcIixcbiAgfSxcbiAgRVhFX0xJTktFUl9GTEFHUzoge1xuICAgIGRlc2NyaXB0aW9uOiBcIkZsYWdzIHBhc3NlZCB0byB0aGUgbGlua2VyIHdoZW4gY3JlYXRpbmcgZXhlY3V0YWJsZXNcIixcbiAgICB2YWx1ZTogW10sXG4gIH0sXG4gIEdMT0JBTF9DT05URVhUX0pTT046IHtcbiAgICBkZXNjcmlwdGlvbjogXCJGaWxlbmFtZSBmb3IgSlNPTiBvZiB0aGUgR2xvYmFsIGNvbnRleHRcIixcbiAgICB0eXBlOiBcIkZpbGVQYXRoXCIsXG4gIH0sXG4gIFRBUkdFVF9HT0FMU19KU09OOiB7XG4gICAgZGVzY3JpcHRpb246IFwiRmlsZW5hbWUgZm9yIEpTT04gb2YgdGhlIFRhcmdldCBHb2Fsc1wiLFxuICAgIHR5cGU6IFwiRmlsZVBhdGhcIixcbiAgfSxcbiAgU0laRU9GX1ZPSURfUDoge1xuICAgIGRlc2NyaXB0aW9uOiBcIkRlZmluZXMgdGhlIHNpemUgKGluIGJ5dGVzKSBvZiBhIHZvaWQgcG9pbnRlciBvbiB0aGUgdGFyZ2V0IGFyY2hpdGVjdHVyZVwiLFxuICAgIHR5cGU6IFsgNCwgOCBdLFxuICAgIHZhbHVlOiBnZXRTaXplb2ZWb2lkcCgpLFxuICB9LFxuICBNQUtFX1BMVUdJTl9MSVNUOiB7XG4gICAgZGVzY3JpcHRpb246IFwiTGlzdCBvZiBwYXRocyB0byBwbHVnaW5zXCIsXG4gICAgdmFsdWU6IFtdLFxuICB9LFxufTtcbiIsIi8qXG4gKiBNSVQgTGljZW5zZVxuICpcbiAqIENvcHlyaWdodCAoYykgMjAyNSAgWXVyaWkgWWFrdWJpbiAoeXVyaWkueWFrdWJpbkBnbWFpbC5jb20pXG4gKlxuICogUGVybWlzc2lvbiBpcyBncmFudGVkIHRvIHVzZSwgY29weSwgbW9kaWZ5LCBhbmQgZGlzdHJpYnV0ZSB0aGlzIHNvZnR3YXJlXG4gKiB1bmRlciB0aGUgTUlUIExpY2Vuc2UuIFNlZSBMSUNFTlNFIGZpbGUgZm9yIGRldGFpbHMuXG4gKi9cblxuaW1wb3J0IHsgZW5zdXJlU3RyaW5nIH0gZnJvbSBcIkAvdXRpbHMvU3RyaWN0VHlwZVwiO1xuaW1wb3J0IHsgU291cmNlRmlsZSB9IGZyb20gXCJAL2NvcmUvU291cmNlRmlsZVwiO1xuaW1wb3J0IHsgU291cmNlRmlsZUxpc3QgfSBmcm9tIFwiQC9jb3JlL1NvdXJjZUZpbGVMaXN0XCI7XG5pbXBvcnQgeyBJbmNsdWRlRGlyZWN0b3J5IH0gZnJvbSBcIkAvY29yZS9JbmNsdWRlRGlyZWN0b3J5XCI7XG5pbXBvcnQgeyBJbnRlcmZhY2VUYXJnZXQgfSBmcm9tIFwiQC9jb3JlL0ludGVyZmFjZVRhcmdldFwiO1xuaW1wb3J0IHsgSW50ZXJmYWNlSW5jbHVkZXMgfSBmcm9tIFwiQC9jb3JlL0ludGVyZmFjZUluY2x1ZGVzXCI7XG5pbXBvcnQgeyBJbnRlcmZhY2VPYmplY3RzIH0gZnJvbSBcIkAvY29yZS9JbnRlcmZhY2VPYmplY3RzXCI7XG5pbXBvcnQgeyBBYnNvbHV0ZVBhdGggfSBmcm9tIFwiQC9jb3JlL1BhdGhcIjtcbmltcG9ydCB7IEFMTF9UQVJHRVQsIElOU1RBTExfVEFSR0VUIH0gZnJvbSBcIkAvQ29uc3RhbnRzXCI7XG5pbXBvcnQgeyBTY29wZUhlbHBlciB9IGZyb20gXCJAL2NvcmUvU2NvcGVcIjtcbmltcG9ydCB7IFN5c3RlbVNjb3BlIH0gZnJvbSBcIkAvY29yZS9TeXN0ZW1TY29wZVwiO1xuaW1wb3J0IHsgVmFsdWVUeXBlIH0gZnJvbSBcIkAvY21ha2UvQ29uc3RhbnRzXCI7XG5cbmNvbnN0IE5BTUUgICAgICAgICAgICAgICAgPSBTeW1ib2woXCJOQU1FXCIpO1xuY29uc3QgVEFSR0VUX1NDT1BFICAgICAgICA9IFN5bWJvbChcIlRBUkdFVF9TQ09QRVwiKTtcbmNvbnN0IE9VVFBVVF9OQU1FICAgICAgICAgPSBTeW1ib2woXCJPVVRQVVRfTkFNRVwiKTtcbmNvbnN0IENPTVBJTEVfT1BUSU9OUyAgICAgPSBTeW1ib2woXCJDT01QSUxFX09QVElPTlNcIik7XG5jb25zdCBQUkVGSVggICAgICAgICAgICAgID0gU3ltYm9sKFwiUFJFRklYXCIpO1xuY29uc3QgU1VGRklYICAgICAgICAgICAgICA9IFN5bWJvbChcIlNVRkZJWFwiKTtcbmNvbnN0IExJTktfT1BUSU9OUyAgICAgICAgPSBTeW1ib2woXCJMSU5LX09QVElPTlNcIik7XG5jb25zdCBJTkNMVURFUyAgICAgICAgICAgID0gU3ltYm9sKFwiSU5DTFVERVNcIik7XG5jb25zdCBERUZJTkVTICAgICAgICAgICAgID0gU3ltYm9sKFwiREVGSU5FU1wiKTtcbmNvbnN0IFNPVVJDRVMgICAgICAgICAgICAgPSBTeW1ib2woXCJTT1VSQ0VTXCIpO1xuY29uc3QgTElCUkFSSUVTICAgICAgICAgICA9IFN5bWJvbChcIkxJQlJBUklFU1wiKTtcbmNvbnN0IFBPU0lUSU9OX0lOREVQRU5ERU5UX0NPREUgPSBTeW1ib2woXCJQT1NJVElPTl9JTkRFUEVOREVOVF9DT0RFXCIpO1xuXG5mdW5jdGlvbiBlbnN1cmVUYXJnZXROYW1lKG5hbWU6IHN0cmluZyk6IHN0cmluZyB7XG4gIGlmICh0eXBlb2YgbmFtZSAhPT0gXCJzdHJpbmdcIilcbiAgICB0aHJvdyBuZXcgRXJyb3IoYFRhcmdldCBcIiR7bmFtZX1cIiBpcyBub3Qgc3RyaW5nIHR5cGVgKTtcbiAgaWYgKFsgQUxMX1RBUkdFVCwgSU5TVEFMTF9UQVJHRVQgXS5pbmNsdWRlcyhuYW1lKSlcbiAgICB0aHJvdyBuZXcgRXJyb3IoYFRhcmdldCBcIiR7bmFtZX1cIiBpcyByZXNlcnZlZCBuYW1lYCk7XG4gIHJldHVybiBuYW1lO1xufVxuXG5pbnRlcmZhY2UgSW5jbHVkZUVudHJ5IHtcbiAgVkFMVUU6IEludGVyZmFjZUluY2x1ZGVzIHwgSW5jbHVkZURpcmVjdG9yeSB8IHN0cmluZztcbiAgUFVCTElDX09OTFk/OiBib29sZWFuO1xufTtcblxuZXhwb3J0IGNsYXNzIEJhc2VUYXJnZXQge1xuICBwcml2YXRlIFtOQU1FXTogc3RyaW5nO1xuICBwcml2YXRlIFtUQVJHRVRfU0NPUEVdOiBTeXN0ZW1TY29wZTtcbiAgcHJpdmF0ZSBbT1VUUFVUX05BTUVdOiBzdHJpbmc7XG4gIHByaXZhdGUgW1BSRUZJWF06IHN0cmluZztcbiAgcHJpdmF0ZSBbU1VGRklYXTogc3RyaW5nXG4gIHByaXZhdGUgW0NPTVBJTEVfT1BUSU9OU106IGFueVtdO1xuICBwcml2YXRlIFtMSU5LX09QVElPTlNdOiBhbnlbXTtcbiAgcHJpdmF0ZSBbU09VUkNFU106IGFueVtdO1xuICBwcml2YXRlIFtMSUJSQVJJRVNdOiBhbnlbXTtcbiAgcHJpdmF0ZSBbSU5DTFVERVNdOiBJbmNsdWRlRW50cnlbXTtcbiAgcHJpdmF0ZSBbREVGSU5FU106IGFueVtdO1xuICBwcml2YXRlIFtQT1NJVElPTl9JTkRFUEVOREVOVF9DT0RFXTogYm9vbGVhbjtcblxuICBwcm90ZWN0ZWQgY29uc3RydWN0b3Ioc2NvcGU6IFN5c3RlbVNjb3BlLCBuYW1lOiBzdHJpbmcpIHtcbiAgICB0aGlzW05BTUVdID0gZW5zdXJlVGFyZ2V0TmFtZShuYW1lKTtcbiAgICB0aGlzW1RBUkdFVF9TQ09QRV0gPSBTY29wZUhlbHBlci5jbG9uZSh7fSwgc2NvcGUpO1xuICAgIHRoaXNbT1VUUFVUX05BTUVdID0gZW5zdXJlU3RyaW5nKG5hbWUpO1xuICAgIHRoaXNbUFJFRklYXSA9IFwiXCI7XG4gICAgdGhpc1tTVUZGSVhdID0gXCJcIjtcbiAgICB0aGlzW0NPTVBJTEVfT1BUSU9OU10gPSBbXTtcbiAgICB0aGlzW0xJTktfT1BUSU9OU10gPSBbXTtcbiAgICB0aGlzW1NPVVJDRVNdID0gW107XG4gICAgdGhpc1tMSUJSQVJJRVNdID0gW107XG4gICAgdGhpc1tJTkNMVURFU10gPSBzY29wZS5JTkNMVURFUy5tYXAoKFZBTFVFOiBhbnkpID0+ICh7IFZBTFVFIH0pKTtcbiAgICB0aGlzW0RFRklORVNdID0gW107XG4gICAgdGhpc1tQT1NJVElPTl9JTkRFUEVOREVOVF9DT0RFXSA9IHNjb3BlLlBPU0lUSU9OX0lOREVQRU5ERU5UX0NPREU7XG4gIH1cblxuICBwdWJsaWMgZ2V0IE5BTUUoKSB7XG4gICAgcmV0dXJuIHRoaXNbTkFNRV07XG4gIH1cblxuICBwdWJsaWMgZ2V0IFRBUkdFVF9TQ09QRSgpIHtcbiAgICByZXR1cm4gdGhpc1tUQVJHRVRfU0NPUEVdO1xuICB9XG5cbiAgcHVibGljIGdldCBPVVRQVVRfTkFNRSgpIHtcbiAgICByZXR1cm4gdGhpc1tPVVRQVVRfTkFNRV07XG4gIH1cblxuICBwdWJsaWMgc2V0IE9VVFBVVF9OQU1FKHZhbHVlOiBzdHJpbmcpIHtcbiAgICB0aGlzW09VVFBVVF9OQU1FXSA9IGVuc3VyZVN0cmluZyh2YWx1ZSk7XG4gIH1cblxuICBwdWJsaWMgZ2V0IENPTVBJTEVfT1BUSU9OUygpOiBzdHJpbmdbXSB7XG4gICAgcmV0dXJuIHRoaXNbQ09NUElMRV9PUFRJT05TXTtcbiAgfVxuXG4gIHB1YmxpYyBnZXQgUFJFRklYKCkge1xuICAgIHJldHVybiB0aGlzW1BSRUZJWF07XG4gIH1cblxuICBwdWJsaWMgc2V0IFBSRUZJWCh2YWx1ZTogc3RyaW5nKSB7XG4gICAgdGhpc1tQUkVGSVhdID0gZW5zdXJlU3RyaW5nKHZhbHVlKTtcbiAgfVxuXG4gIHB1YmxpYyBnZXQgU1VGRklYKCkge1xuICAgIHJldHVybiB0aGlzW1NVRkZJWF07XG4gIH1cblxuICBwdWJsaWMgc2V0IFNVRkZJWCh2YWx1ZTogc3RyaW5nKSB7XG4gICAgdGhpc1tTVUZGSVhdID0gZW5zdXJlU3RyaW5nKHZhbHVlKTtcbiAgfVxuXG4gIHB1YmxpYyBnZXQgTElOS19PUFRJT05TKCk6IHN0cmluZ1tdIHtcbiAgICByZXR1cm4gdGhpc1tMSU5LX09QVElPTlNdO1xuICB9XG5cbiAgcHVibGljIGdldCBJTkNMVURFUygpIHtcbiAgICByZXR1cm4gdGhpc1tJTkNMVURFU107XG4gIH1cblxuICBwdWJsaWMgZ2V0IERFRklORVMoKTogc3RyaW5nW10ge1xuICAgIHJldHVybiB0aGlzW0RFRklORVNdO1xuICB9XG5cbiAgcHVibGljIGdldCBTT1VSQ0VTKCk6IHN0cmluZ1tdIHtcbiAgICByZXR1cm4gdGhpc1tTT1VSQ0VTXTtcbiAgfVxuXG4gIHB1YmxpYyBnZXQgTElCUkFSSUVTKCk6IHN0cmluZ1tdIHtcbiAgICByZXR1cm4gdGhpc1tMSUJSQVJJRVNdO1xuICB9XG5cbiAgcHVibGljIGdldCBGSUxFX0RJUigpOiBBYnNvbHV0ZVBhdGgge1xuICAgIHJldHVybiB0aGlzW1RBUkdFVF9TQ09QRV0uQklOQVJZX0RJUjtcbiAgfVxuXG4gIHB1YmxpYyBnZXQgRklMRV9OQU1FKCk6IHN0cmluZyB7XG4gICAgcmV0dXJuIHRoaXMuUFJFRklYICsgdGhpcy5PVVRQVVRfTkFNRSArIHRoaXMuU1VGRklYO1xuICB9XG5cbiAgcHVibGljIGdldCBGSUxFKCk6IEFic29sdXRlUGF0aCB7XG4gICAgcmV0dXJuIHRoaXMuRklMRV9ESVIuam9pbih0aGlzLkZJTEVfTkFNRSk7XG4gIH1cblxuICBwdWJsaWMgZ2V0IFBPU0lUSU9OX0lOREVQRU5ERU5UX0NPREUoKTogYm9vbGVhbiB7XG4gICAgcmV0dXJuIHRoaXNbUE9TSVRJT05fSU5ERVBFTkRFTlRfQ09ERV07XG4gIH1cblxuICBwdWJsaWMgYWRkU291cmNlcyguLi5zb3VyY2VzOiBBcnJheTxJbnRlcmZhY2VPYmplY3RzIHwgU291cmNlRmlsZSB8IEFic29sdXRlUGF0aCB8IHN0cmluZz4pIHtcbiAgICBmb3IgKGxldCBpdCBvZiBzb3VyY2VzLmZsYXQoMSkpIHtcbiAgICAgIGlmIChpdCBpbnN0YW5jZW9mIEludGVyZmFjZU9iamVjdHMgfHwgaXQgaW5zdGFuY2VvZiBTb3VyY2VGaWxlKVxuICAgICAgICB7fVxuICAgICAgZWxzZSBpZiAodHlwZW9mIGl0ID09PSBcInN0cmluZ1wiIHx8IEFic29sdXRlUGF0aC5pc0Fic29sdXRlKGl0KSlcbiAgICAgICAgaXQgPSBTb3VyY2VGaWxlLmNyZWF0ZSh0aGlzW1RBUkdFVF9TQ09QRV0sIGl0KTtcbiAgICAgIGVsc2VcbiAgICAgICAgdGhyb3cgbmV3IEVycm9yKGBOb3Qgc3VwcG9ydCBpbnN0YW5jZSAke2l0fWApO1xuICBcbiAgICAgIGlmIChpdCBpbnN0YW5jZW9mIFNvdXJjZUZpbGUgJiYgaXQuTEFOR1VBR0UpIHtcbiAgICAgICAgY29uc3QgcmZpbGUxID0gdGhpc1tUQVJHRVRfU0NPUEVdLkJJTkFSWV9ESVIucmVsYXRpdmUoaXQuRklMRSk7XG4gICAgICAgIGNvbnN0IHJmaWxlMiA9IHRoaXNbVEFSR0VUX1NDT1BFXS5TT1VSQ0VfRElSLnJlbGF0aXZlKGl0LkZJTEUpO1xuICAgICAgICBjb25zdCByZmlsZSA9IChyZmlsZTIubGVuZ3RoIDwgcmZpbGUxLmxlbmd0aCA/IHJmaWxlMiA6IHJmaWxlMSkucmVwbGFjZShcIi4uL1wiLCBcIl9fL1wiKTtcbiAgICAgICAgaXQuT0JKRUNUX0ZJTEUgPSB0aGlzW1RBUkdFVF9TQ09QRV0uQklOQVJZX0RJUi5qb2luKFwiTWFrZUZpbGVzXCIsIHRoaXNbTkFNRV0gKyBcIi5kaXJcIiwgIHJmaWxlICsgXCIub2JqXCIpO1xuICAgICAgfVxuICBcbiAgICAgIHRoaXNbU09VUkNFU10ucHVzaChpdCk7XG4gICAgfVxuICB9XG5cbiAgcHVibGljIGFkZEluY2x1ZGVzKC4uLmluY2x1ZGVzOiBBcnJheTxJbnRlcmZhY2VJbmNsdWRlcyB8IEFic29sdXRlUGF0aCB8IHN0cmluZz4pIHtcbiAgICBmb3IgKGNvbnN0IGl0IG9mIGluY2x1ZGVzLmZsYXQoMSkpIHtcbiAgICAgIGxldCBWQUxVRTtcbiAgICAgIGlmIChpdCBpbnN0YW5jZW9mIEludGVyZmFjZUluY2x1ZGVzKVxuICAgICAgICBWQUxVRSA9IGl0O1xuICAgICAgZWxzZSBpZiAodHlwZW9mIGl0ID09PSBcInN0cmluZ1wiIHx8IEFic29sdXRlUGF0aC5pc0Fic29sdXRlKGl0KSlcbiAgICAgICAgVkFMVUUgPSBJbmNsdWRlRGlyZWN0b3J5LmNyZWF0ZShpdCwgdGhpc1tUQVJHRVRfU0NPUEVdLlNPVVJDRV9ESVIpO1xuICAgICAgZWxzZVxuICAgICAgICB0aHJvdyBuZXcgRXJyb3IoYE5vdCBzdXBwb3J0IGluc3RhbmNlICR7aXR9YCk7XG4gICAgICB0aGlzW0lOQ0xVREVTXS5wdXNoKHtWQUxVRX0pOyAvLyBJbmNsdWRlRGlyZWN0b3J5W11cbiAgICB9XG4gIH1cblxuICBwdWJsaWMgYWRkTGlicmFyaWVzKC4uLmxpYnJhcmllczogYW55KSB7XG4gICAgZm9yIChjb25zdCBpdCBvZiBsaWJyYXJpZXMuZmxhdCgxKSkge1xuICAgICAgdGhpc1tMSUJSQVJJRVNdLnB1c2goeyBWQUxVRTogSW50ZXJmYWNlVGFyZ2V0LmVuc3VyZUluc3RhbmNlKGl0KSB9KTtcbiAgICB9XG4gIH1cblxuICBwdWJsaWMgYWRkQ29tcGlsZU9wdGlvbnMoLi4ub3B0aW9uczogc3RyaW5nW10pIHtcbiAgICBmb3IgKGNvbnN0IGl0IG9mIG9wdGlvbnMuZmxhdCgxKSkge1xuICAgICAgdGhpc1tDT01QSUxFX09QVElPTlNdLnB1c2goeyBWQUxVRTogaXQgfSk7XG4gICAgfVxuICB9XG5cbiAgcHVibGljIGFkZExpbmtPcHRpb25zKC4uLm9wdGlvbnM6IHN0cmluZ1tdKSB7XG4gICAgZm9yIChjb25zdCBpdCBvZiBvcHRpb25zLmZsYXQoMSkpIHtcbiAgICAgIHRoaXNbTElOS19PUFRJT05TXS5wdXNoKHsgVkFMVUU6IGl0IH0pO1xuICAgIH1cbiAgfVxuXG4gIHB1YmxpYyBnZXRTb3VyY2VGaWxlcyguLi5zb3VyY2VzOiBhbnlbXSk6IFNvdXJjZUZpbGVMaXN0IHtcbiAgICBjb25zdCByZXN1bHQgPSBbXTtcbiAgICBmb3IgKGNvbnN0IGl0IG9mIHNvdXJjZXMuZmxhdCgxKSkge1xuICAgICAgY29uc3QgZmlsZW5hbWUgPSB0aGlzW1RBUkdFVF9TQ09QRV0uU09VUkNFX0RJUi5yZXNvbHZlKGl0KS50b1N0cmluZygpO1xuICAgICAgY29uc3Qgc3JjID0gdGhpc1tTT1VSQ0VTXS5maW5kKGkgPT4gaSBpbnN0YW5jZW9mIFNvdXJjZUZpbGUgJiYgaS5GSUxFLnRvU3RyaW5nKCkgPT09IGZpbGVuYW1lKTtcbiAgICAgIGlmICghc3JjKVxuICAgICAgICB0aHJvdyBuZXcgRXJyb3IoYENhbm5vdCBmaW5kIFwiJHtpdH1cImApO1xuICAgICAgcmVzdWx0LnB1c2goc3JjKTtcbiAgICB9XG4gIFxuICAgIGlmIChyZXN1bHQubGVuZ3RoKVxuICAgICAgcmV0dXJuIFNvdXJjZUZpbGVMaXN0LmNyZWF0ZSh0aGlzW1RBUkdFVF9TQ09QRV0sIHJlc3VsdCk7XG4gIFxuICAgIHJldHVybiBTb3VyY2VGaWxlTGlzdC5jcmVhdGUodGhpc1tUQVJHRVRfU0NPUEVdLCB0aGlzW1NPVVJDRVNdLmZpbHRlcihpID0+IGkgaW5zdGFuY2VvZiBTb3VyY2VGaWxlKSk7XG4gIH1cblxuICBwdWJsaWMgc2V0UHJlZml4KHByZWZpeDogc3RyaW5nKSB7XG4gICAgdGhpc1tQUkVGSVhdID0gcHJlZml4O1xuICB9XG4gIFxuICBwdWJsaWMgc2V0U3VmZml4KHN1ZmZpeDogc3RyaW5nKSB7XG4gICAgdGhpc1tTVUZGSVhdID0gc3VmZml4O1xuICB9XG4gIFxuICBwdWJsaWMgc2V0T3V0cHV0TmFtZShvdXRwdXROYW1lOiBzdHJpbmcpIHtcbiAgICB0aGlzW09VVFBVVF9OQU1FXSA9IG91dHB1dE5hbWU7XG4gIH1cbiAgXG4gIHB1YmxpYyBhZGREZWZpbml0aW9ucyguLi5kZWZpbml0aW9uczogc3RyaW5nW10pIHtcbiAgICBmb3IgKGNvbnN0IFZBTFVFIG9mIGRlZmluaXRpb25zLmZsYXQoMSkpXG4gICAgICB0aGlzW0RFRklORVNdLnB1c2goeyBWQUxVRSB9KTtcbiAgfVxuXG4gIHB1YmxpYyB0b0pTT04oKTogb2JqZWN0IHtcbiAgICByZXR1cm4ge1xuICAgICAgTkFNRTogdGhpcy5OQU1FLFxuICAgICAgVEFSR0VUX1NDT1BFOiB0aGlzLlRBUkdFVF9TQ09QRSxcbiAgICAgIE9VVFBVVF9OQU1FOiB0aGlzLk9VVFBVVF9OQU1FLFxuICAgICAgQ09NUElMRV9PUFRJT05TOiB0aGlzLkNPTVBJTEVfT1BUSU9OUyxcbiAgICAgIFBSRUZJWDogdGhpcy5QUkVGSVgsXG4gICAgICBTVUZGSVg6IHRoaXMuU1VGRklYLFxuICAgICAgTElOS19PUFRJT05TOiB0aGlzLkxJTktfT1BUSU9OUyxcbiAgICAgIElOQ0xVREVTOiB0aGlzLklOQ0xVREVTLFxuICAgICAgREVGSU5FUzogdGhpcy5ERUZJTkVTLFxuICAgICAgU09VUkNFUzogdGhpcy5TT1VSQ0VTLFxuICAgICAgTElCUkFSSUVTOiB0aGlzLkxJQlJBUklFUyxcbiAgICAgIEZJTEVfRElSOiB0aGlzLkZJTEVfRElSLFxuICAgICAgRklMRV9OQU1FOiB0aGlzLkZJTEVfTkFNRSxcbiAgICAgIEZJTEU6IHRoaXMuRklMRSxcbiAgICB9XG4gIH1cbn07XG5cbmV4cG9ydCBjbGFzcyBCYXNlTGlicmFyeSBleHRlbmRzIEJhc2VUYXJnZXQge1xuICBwcm90ZWN0ZWQgY29uc3RydWN0b3Ioc2NvcGU6IFN5c3RlbVNjb3BlLCBuYW1lOiBzdHJpbmcpIHtcbiAgICBzdXBlcihzY29wZSwgbmFtZSk7XG4gIH1cblxuICBwdWJsaWMgc2V0UG9zaXRpb25JbmRlcGVuZGVudENvZGUodmFsdWU6IGJvb2xlYW4pIHtcbiAgICB0aGlzW1BPU0lUSU9OX0lOREVQRU5ERU5UX0NPREVdID0gdmFsdWU7XG4gIH1cblxuICBwdWJsaWMgYWRkUHVibGljSW5jbHVkZXMoLi4uaW5jbHVkZXM6IEFycmF5PEludGVyZmFjZUluY2x1ZGVzIHwgQWJzb2x1dGVQYXRoIHwgc3RyaW5nPikge1xuICAgIGZvciAoY29uc3QgaXQgb2YgaW5jbHVkZXMuZmxhdCgxKSkge1xuICAgICAgbGV0IFZBTFVFO1xuICAgICAgaWYgKGl0IGluc3RhbmNlb2YgSW50ZXJmYWNlSW5jbHVkZXMpXG4gICAgICAgIFZBTFVFID0gaXQ7XG4gICAgICBlbHNlIGlmICh0eXBlb2YgaXQgPT09IFwic3RyaW5nXCIgfHwgQWJzb2x1dGVQYXRoLmlzQWJzb2x1dGUoaXQpKVxuICAgICAgICBWQUxVRSA9IEluY2x1ZGVEaXJlY3RvcnkuY3JlYXRlKGl0LCB0aGlzW1RBUkdFVF9TQ09QRV0uU09VUkNFX0RJUik7XG4gICAgICBlbHNlXG4gICAgICAgIHRocm93IG5ldyBFcnJvcihgTm90IHN1cHBvcnQgaW5zdGFuY2UgJHtpdH1gKTtcbiAgICAgIHRoaXNbSU5DTFVERVNdLnB1c2goe1ZBTFVFLCBQVUJMSUNfT05MWTogdHJ1ZX0pOyAvLyBJbmNsdWRlRGlyZWN0b3J5W11cbiAgICB9XG4gIH1cblxuICBwdWJsaWMgYWRkUHVibGljRGVmaW5pdGlvbnMoLi4uZGVmaW5pdGlvbnM6IHN0cmluZ1tdKSB7XG4gICAgZm9yIChjb25zdCBWQUxVRSBvZiBkZWZpbml0aW9ucy5mbGF0KDEpKVxuICAgICAgdGhpc1tERUZJTkVTXS5wdXNoKHsgVkFMVUUsIFBVQkxJQ19PTkxZOiB0cnVlIH0pO1xuICB9XG5cbiAgcHVibGljIGFkZFB1YmxpY0xpYnJhcmllcyguLi5saWJyYXJpZXM6IGFueVtdKSB7XG4gICAgZm9yIChjb25zdCBpdCBvZiBsaWJyYXJpZXMuZmxhdCgxKSkge1xuICAgICAgdGhpc1tMSUJSQVJJRVNdLnB1c2goe1ZBTFVFOiBJbnRlcmZhY2VUYXJnZXQuZW5zdXJlSW5zdGFuY2UoaXQpLCBQVUJMSUNfT05MWTogdHJ1ZX0pO1xuICAgIH1cbiAgfVxuXG4gIHB1YmxpYyBhZGRQdWJsaWNDb21waWxlT3B0aW9ucyguLi5vcHRpb25zOiBzdHJpbmdbXSkge1xuICAgIGZvciAoY29uc3QgaXQgb2Ygb3B0aW9ucy5mbGF0KDEpKSB7XG4gICAgICB0aGlzW0NPTVBJTEVfT1BUSU9OU10ucHVzaCh7IFZBTFVFOiBpdCwgUFVCTElDX09OTFk6IHRydWUgfSk7XG4gICAgfVxuICB9XG5cbiAgcHVibGljIGFkZFB1YmxpY0xpbmtPcHRpb25zKC4uLm9wdGlvbnM6IGFueVtdKSB7XG4gICAgZm9yIChjb25zdCBpdCBvZiBvcHRpb25zLmZsYXQoMSkpIHtcbiAgICAgIHRoaXNbTElOS19PUFRJT05TXS5wdXNoKHsgVkFMVUU6IGl0LCBQVUJMSUNfT05MWTogdHJ1ZSB9KTtcbiAgICB9XG4gIH1cbn07XG5cbmV4cG9ydCBjbGFzcyBPYmplY3RMaWJyYXJ5IGV4dGVuZHMgQmFzZUxpYnJhcnkge1xuICBwcml2YXRlIGNvbnN0cnVjdG9yKHNjb3BlOiBTeXN0ZW1TY29wZSwgbmFtZTogc3RyaW5nKSB7XG4gICAgc3VwZXIoc2NvcGUsIG5hbWUpO1xuICAgIHRoaXMuUFJFRklYID0gc2NvcGUuT0JKRUNUX0xJQlJBUllfUFJFRklYO1xuICAgIHRoaXMuU1VGRklYID0gc2NvcGUuT0JKRUNUX0xJQlJBUllfU1VGRklYO1xuICAgIHRoaXMuTElOS19PUFRJT05TLnB1c2goLi4uKHNjb3BlIGFzIGFueSkuT0JKRUNUX0xJTktFUl9GTEFHUy5tYXAoKFZBTFVFOiBhbnkpID0+ICh7IFZBTFVFIH0pKSk7XG4gIH1cblxuICBwdWJsaWMgc3RhdGljIGNyZWF0ZShzY29wZTogU3lzdGVtU2NvcGUsIG5hbWU6IHN0cmluZykge1xuICAgIHJldHVybiBPYmplY3Quc2VhbChuZXcgT2JqZWN0TGlicmFyeShzY29wZSwgbmFtZSkpO1xuICB9XG59O1xuXG5leHBvcnQgY2xhc3MgU3RhdGljTGlicmFyeSBleHRlbmRzIEJhc2VMaWJyYXJ5IHtcbiAgcHJpdmF0ZSBjb25zdHJ1Y3RvcihzY29wZTogU3lzdGVtU2NvcGUsIG5hbWU6IHN0cmluZykge1xuICAgIHN1cGVyKHNjb3BlLCBuYW1lKTtcbiAgICB0aGlzLlBSRUZJWCA9IHNjb3BlLlNUQVRJQ19MSUJSQVJZX1BSRUZJWDtcbiAgICB0aGlzLlNVRkZJWCA9IHNjb3BlLlNUQVRJQ19MSUJSQVJZX1NVRkZJWDtcbiAgICB0aGlzLkxJTktfT1BUSU9OUy5wdXNoKC4uLihzY29wZSBhcyBhbnkpLlNUQVRJQ19MSU5LRVJfRkxBR1MubWFwKChWQUxVRTogYW55KSA9PiAoeyBWQUxVRSB9KSkpO1xuICB9XG5cbiAgcHVibGljIHN0YXRpYyBjcmVhdGUoc2NvcGU6IGFueSwgbmFtZTogc3RyaW5nKSB7XG4gICAgcmV0dXJuIE9iamVjdC5zZWFsKG5ldyBTdGF0aWNMaWJyYXJ5KHNjb3BlLCBuYW1lKSk7XG4gIH1cbn07XG5cbmV4cG9ydCBjbGFzcyBTaGFyZWRMaWJyYXJ5IGV4dGVuZHMgQmFzZUxpYnJhcnkge1xuICBwcml2YXRlIGNvbnN0cnVjdG9yKHNjb3BlOiBTeXN0ZW1TY29wZSwgbmFtZTogc3RyaW5nKSB7XG4gICAgc3VwZXIoc2NvcGUsIG5hbWUpO1xuICAgIHRoaXMuUFJFRklYID0gc2NvcGUuU0hBUkVEX0xJQlJBUllfUFJFRklYO1xuICAgIHRoaXMuU1VGRklYID0gc2NvcGUuU0hBUkVEX0xJQlJBUllfU1VGRklYO1xuICAgIHRoaXMuTElOS19PUFRJT05TLnB1c2goLi4uKHNjb3BlIGFzIGFueSkuU0hBUkVEX0xJTktFUl9GTEFHUy5tYXAoKFZBTFVFOiBhbnkpID0+ICh7IFZBTFVFIH0pKSk7XG4gIH1cblxuICBwdWJsaWMgc3RhdGljIGNyZWF0ZShzY29wZTogYW55LCBuYW1lOiBzdHJpbmcpIHtcbiAgICByZXR1cm4gT2JqZWN0LnNlYWwobmV3IFNoYXJlZExpYnJhcnkoc2NvcGUsIG5hbWUpKTtcbiAgfVxufVxuXG5leHBvcnQgY2xhc3MgRXhlY3V0YWJsZSBleHRlbmRzIEJhc2VUYXJnZXQge1xuICBwcml2YXRlIGNvbnN0cnVjdG9yKHNjb3BlOiBTeXN0ZW1TY29wZSwgbmFtZTogc3RyaW5nKSB7XG4gICAgc3VwZXIoc2NvcGUsIG5hbWUpO1xuICAgIHRoaXMuU1VGRklYID0gc2NvcGUuRVhFQ1VUQUJMRV9TVUZGSVg7XG4gICAgdGhpcy5MSU5LX09QVElPTlMucHVzaCguLi4oc2NvcGUgYXMgYW55KS5FWEVfTElOS0VSX0ZMQUdTLm1hcCgoVkFMVUU6IGFueSkgPT4gKHsgVkFMVUUgfSkpKTtcbiAgfVxuXG4gIHB1YmxpYyBzdGF0aWMgY3JlYXRlKHNjb3BlOiBTeXN0ZW1TY29wZSwgbmFtZTogc3RyaW5nKSB7XG4gICAgcmV0dXJuIE9iamVjdC5zZWFsKG5ldyBFeGVjdXRhYmxlKHNjb3BlLCBuYW1lKSk7XG4gIH1cbn07XG4iLCIvKlxuICogTUlUIExpY2Vuc2VcbiAqXG4gKiBDb3B5cmlnaHQgKGMpIDIwMjUgIFl1cmlpIFlha3ViaW4gKHl1cmlpLnlha3ViaW5AZ21haWwuY29tKVxuICpcbiAqIFBlcm1pc3Npb24gaXMgZ3JhbnRlZCB0byB1c2UsIGNvcHksIG1vZGlmeSwgYW5kIGRpc3RyaWJ1dGUgdGhpcyBzb2Z0d2FyZVxuICogdW5kZXIgdGhlIE1JVCBMaWNlbnNlLiBTZWUgTElDRU5TRSBmaWxlIGZvciBkZXRhaWxzLlxuICovXG5cbmltcG9ydCB7IEluY2x1ZGVEaXJlY3RvcnkgfSBmcm9tIFwiQC9jb3JlL0luY2x1ZGVEaXJlY3RvcnlcIjtcbmltcG9ydCB7IEludGVyZmFjZUluY2x1ZGVzIH1mcm9tIFwiQC9jb3JlL0ludGVyZmFjZUluY2x1ZGVzXCI7XG5pbXBvcnQgeyBJbnRlcmZhY2VUYXJnZXQgfSBmcm9tIFwiQC9jb3JlL0ludGVyZmFjZVRhcmdldFwiO1xuXG5jb25zdCBFTlRSSUVTID0gU3ltYm9sKFwiRU5UUklFU1wiKTtcblxuZnVuY3Rpb24gZ2V0SGVhZGVycyh0YXJnZXQ6IGFueSkge1xuICByZXR1cm4gdGFyZ2V0LlNPVVJDRVMuZmlsdGVyKChpOiBhbnkpID0+IGkuSEVBREVSX0ZJTEVfT05MWSk7XG59XG5cbmZ1bmN0aW9uIGdldEluY2x1ZGVzKHRhcmdldDogYW55KSB7XG4gIHJldHVybiB0YXJnZXQuSU5DTFVERVMubWFwKChpOiBhbnkpID0+IGkuVkFMVUUpO1xufVxuXG5mdW5jdGlvbiBnZXRQdWJsaWNJbmNsdWRlcyh0YXJnZXQ6IGFueSkge1xuICByZXR1cm4gdGFyZ2V0LklOQ0xVREVTLmZpbHRlcigoaTogYW55KSA9PiBpLlBVQkxJQ19PTkxZKS5tYXAoKGk6IGFueSkgPT4gaS5WQUxVRSk7XG59XG5cbmZ1bmN0aW9uIGdldExpYnJhcmllcyh0YXJnZXQ6IGFueSkge1xuICByZXR1cm4gdGFyZ2V0LkxJQlJBUklFUy5tYXAoKGk6IGFueSkgPT4gaS5WQUxVRSk7XG59XG5cbmZ1bmN0aW9uIGdldFB1YmxpY0xpYnJhcmllcyh0YXJnZXQ6IGFueSkge1xuICByZXR1cm4gdGFyZ2V0LkxJQlJBUklFUy5maWx0ZXIoKGk6IGFueSkgPT4gaS5QVUJMSUNfT05MWSkubWFwKChpOiBhbnkpID0+IGkuVkFMVUUpO1xufVxuXG5mdW5jdGlvbiBnZXREZWZpbml0aW9ucyh0YXJnZXQ6IGFueSkge1xuICByZXR1cm4gdGFyZ2V0LkRFRklORVMubWFwKChpOiBhbnkpID0+IGkuVkFMVUUpO1xufVxuXG5mdW5jdGlvbiBnZXRQdWJsaWNEZWZpbml0aW9ucyh0YXJnZXQ6IGFueSkge1xuICByZXR1cm4gdGFyZ2V0LkRFRklORVMuZmlsdGVyKChpOiBhbnkpID0+IGkuUFVCTElDX09OTFkpLm1hcCgoaTogYW55KSA9PiBpLlZBTFVFKTtcbn1cblxuZnVuY3Rpb24gZ2V0Q29tcGlsZU9wdGlvbnModGFyZ2V0OiBhbnkpIHtcbiAgcmV0dXJuIHRhcmdldC5DT01QSUxFX09QVElPTlMubWFwKChpOiBhbnkpID0+IGkuVkFMVUUpO1xufVxuXG5mdW5jdGlvbiBnZXRQdWJsaWNDb21waWxlT3B0aW9ucyh0YXJnZXQ6IGFueSkge1xuICByZXR1cm4gdGFyZ2V0LkNPTVBJTEVfT1BUSU9OUy5maWx0ZXIoKGk6IGFueSkgPT4gaS5QVUJMSUNfT05MWSkubWFwKChpOiBhbnkpID0+IGkuVkFMVUUpO1xufVxuXG5mdW5jdGlvbiBnZXRMaW5rT3B0aW9ucyh0YXJnZXQ6IGFueSkge1xuICByZXR1cm4gdGFyZ2V0LkxJTktfT1BUSU9OUy5tYXAoKGk6IGFueSkgPT4gaS5WQUxVRSk7XG59XG5cbmZ1bmN0aW9uIGdldFB1YmxpY0xpbmtPcHRpb25zKHRhcmdldDogYW55KSB7XG4gIHJldHVybiB0YXJnZXQuTElOS19PUFRJT05TLmZpbHRlcigoaTogYW55KSA9PiBpLlBVQkxJQ19PTkxZKS5tYXAoKGk6IGFueSkgPT4gaS5WQUxVRSk7XG59XG5cbmV4cG9ydCBjbGFzcyBUYXJnZXRDb2xsZWN0aW9uIHtcbiAgcHJpdmF0ZSBbRU5UUklFU106IGFueTtcblxuICBwcml2YXRlIGNvbnN0cnVjdG9yKCkge1xuICAgIHRoaXNbRU5UUklFU10gPSB7fTtcbiAgfVxuXG4gIHB1YmxpYyBzdGF0aWMgY3JlYXRlKCkge1xuICAgIHJldHVybiBPYmplY3Quc2VhbChuZXcgVGFyZ2V0Q29sbGVjdGlvbik7XG4gIH1cbiAgXG4gIHB1YmxpYyBnZXQgRU5UUklFUygpIHtcbiAgICByZXR1cm4gdGhpc1tFTlRSSUVTXTtcbiAgfVxuXG4gIHB1YmxpYyB0b0pTT04oKTogb2JqZWN0IHtcbiAgICByZXR1cm4gdGhpc1tFTlRSSUVTXTtcbiAgfVxuXG4gIHB1YmxpYyBnZXQobmFtZTogc3RyaW5nKTogYW55IHtcbiAgICByZXR1cm4gdGhpc1tFTlRSSUVTXVtuYW1lXTtcbiAgfVxuXG4gIHB1YmxpYyBzZXQobmFtZTogc3RyaW5nLCB0YXJnZXQ6IGFueSkge1xuICAgIGlmICh0aGlzW0VOVFJJRVNdW25hbWVdKVxuICAgICAgdGhyb3cgbmV3IEVycm9yKGBUYXJnZXQgXCIke25hbWV9XCIgZXhpc3RzYCk7XG4gICAgdGhpc1tFTlRSSUVTXVtuYW1lXSA9IHRhcmdldDtcbiAgfVxuXG4gIHByaXZhdGUgX19nZXRBbGxJbmNsdWRlcyhpbmNsdWRlczogc3RyaW5nW10sIHRhcmdldFNldDogU2V0PHN0cmluZz4sIGxpc3Q6IGFueSkge1xuICAgIGZvciAoY29uc3QgaXRlciBvZiBsaXN0KSB7XG4gICAgICBpZiAoaXRlciBpbnN0YW5jZW9mIEludGVyZmFjZUluY2x1ZGVzIHx8IGl0ZXIgaW5zdGFuY2VvZiBJbnRlcmZhY2VUYXJnZXQpIHtcbiAgICAgICAgaWYgKCF0YXJnZXRTZXQuaGFzKGl0ZXIudGFyZ2V0TmFtZSkpIHtcbiAgICAgICAgICB0YXJnZXRTZXQuYWRkKGl0ZXIudGFyZ2V0TmFtZSk7XG4gICAgICAgICAgY29uc3QgdGFyZ2V0ID0gdGhpcy5nZXQoaXRlci50YXJnZXROYW1lKTtcbiAgICAgICAgICB0aGlzLl9fZ2V0QWxsSW5jbHVkZXMoaW5jbHVkZXMsIHRhcmdldFNldCwgZ2V0UHVibGljSW5jbHVkZXModGFyZ2V0KSk7XG4gICAgICAgICAgdGhpcy5fX2dldEFsbEluY2x1ZGVzKGluY2x1ZGVzLCB0YXJnZXRTZXQsIGdldFB1YmxpY0xpYnJhcmllcyh0YXJnZXQpKTtcbiAgICAgICAgfVxuICAgICAgfVxuICAgICAgZWxzZSBpZiAoaXRlciBpbnN0YW5jZW9mIEluY2x1ZGVEaXJlY3RvcnkpIHtcbiAgICAgICAgaWYgKCFpbmNsdWRlcy5pbmNsdWRlcyhpdGVyLnRvU3RyaW5nKCkpKVxuICAgICAgICAgIGluY2x1ZGVzLnB1c2goaXRlci50b1N0cmluZygpKTtcbiAgICAgIH1cbiAgICAgIGVsc2Uge1xuICAgICAgICB0aHJvdyBuZXcgRXJyb3IoYE5vdCBzdXBwb3J0IGluc3RhbmNlICR7aXRlcn1gKTtcbiAgICAgIH1cbiAgICB9XG4gIH1cblxuICBwdWJsaWMgYWxsSW5jbHVkZXNPZihwYXJhbXM6IGFueSk6IHN0cmluZ1tdIHtcbiAgICBjb25zdCB0YXJnZXQgPSAodHlwZW9mIHBhcmFtcyA9PT0gXCJzdHJpbmdcIikgPyB0aGlzLmdldChwYXJhbXMpIDogcGFyYW1zO1xuICAgIGNvbnN0IGluY2x1ZGVzOiBzdHJpbmdbXSA9IFtdO1xuICAgIGNvbnN0IHRhcmdldFNldCA9IG5ldyBTZXQoWyB0YXJnZXQuTkFNRSBdKTtcbiAgICB0aGlzLl9fZ2V0QWxsSW5jbHVkZXMoaW5jbHVkZXMsIHRhcmdldFNldCwgZ2V0SW5jbHVkZXModGFyZ2V0KSk7XG4gICAgdGhpcy5fX2dldEFsbEluY2x1ZGVzKGluY2x1ZGVzLCB0YXJnZXRTZXQsIGdldExpYnJhcmllcyh0YXJnZXQpKTtcbiAgICByZXR1cm4gaW5jbHVkZXM7XG4gIH1cblxuICBwcml2YXRlIF9fZ2V0QWxsSGVhZGVycyhoZWFkZXJzOiBzdHJpbmdbXSwgdGFyZ2V0U2V0OiBTZXQ8c3RyaW5nPiwgbGlzdDogYW55KSB7XG4gICAgZm9yIChjb25zdCBpdGVyIG9mIGxpc3QpIHtcbiAgICAgIGlmIChpdGVyIGluc3RhbmNlb2YgSW50ZXJmYWNlSW5jbHVkZXMgfHwgaXRlciBpbnN0YW5jZW9mIEludGVyZmFjZVRhcmdldCkge1xuICAgICAgICBpZiAoIXRhcmdldFNldC5oYXMoaXRlci50YXJnZXROYW1lKSkge1xuICAgICAgICAgIHRhcmdldFNldC5hZGQoaXRlci50YXJnZXROYW1lKTtcbiAgICAgICAgICBjb25zdCB0YXJnZXQgPSB0aGlzLmdldChpdGVyLnRhcmdldE5hbWUpO1xuICAgICAgICAgIGZvciAoY29uc3QgaGVhZGVyIG9mIGdldEhlYWRlcnModGFyZ2V0KS5tYXAoKGk6IGFueSkgPT4gaS5GSUxFLnRvU3RyaW5nKCkpKSB7XG4gICAgICAgICAgICBpZiAoIWhlYWRlcnMuaW5jbHVkZXMoaGVhZGVyLnRvU3RyaW5nKCkpKVxuICAgICAgICAgICAgICBoZWFkZXJzLnB1c2goaGVhZGVyLnRvU3RyaW5nKCkpO1xuICAgICAgICAgIH1cbiAgICAgICAgICB0aGlzLl9fZ2V0QWxsSGVhZGVycyhoZWFkZXJzLCB0YXJnZXRTZXQsIGdldFB1YmxpY0luY2x1ZGVzKHRhcmdldCkpO1xuICAgICAgICAgIHRoaXMuX19nZXRBbGxIZWFkZXJzKGhlYWRlcnMsIHRhcmdldFNldCwgZ2V0UHVibGljTGlicmFyaWVzKHRhcmdldCkpO1xuICAgICAgICB9XG4gICAgICB9XG4gICAgfVxuICB9XG5cbiAgcHVibGljIGFsbEhlYWRlcnNPZihwYXJhbXM6IGFueSkge1xuICAgIGNvbnN0IHRhcmdldCA9ICh0eXBlb2YgcGFyYW1zID09PSBcInN0cmluZ1wiKSA/IHRoaXMuZ2V0KHBhcmFtcykgOiBwYXJhbXM7XG4gICAgY29uc3QgaGVhZGVycyA9IGdldEhlYWRlcnModGFyZ2V0KS5tYXAoKGk6IGFueSkgPT4gaS5GSUxFLnRvU3RyaW5nKCkpO1xuICAgIGNvbnN0IHRhcmdldFNldCA9IG5ldyBTZXQoWyB0YXJnZXQuTkFNRSBdKTtcbiAgICB0aGlzLl9fZ2V0QWxsSGVhZGVycyhoZWFkZXJzLCB0YXJnZXRTZXQsIGdldEluY2x1ZGVzKHRhcmdldCkpO1xuICAgIHRoaXMuX19nZXRBbGxIZWFkZXJzKGhlYWRlcnMsIHRhcmdldFNldCwgZ2V0TGlicmFyaWVzKHRhcmdldCkpO1xuICAgIHJldHVybiBoZWFkZXJzO1xuICB9XG5cbiAgcHJpdmF0ZSBfX2dldEFsbExpYnJhcmllcyhsaWJyYXJpZXM6IHN0cmluZ1tdLCB0YXJnZXRTZXQ6IFNldDxzdHJpbmc+LCBsaXN0OiBhbnkpIHtcbiAgICBmb3IgKGNvbnN0IGl0ZXIgb2YgbGlzdCkge1xuICAgICAgY29uc29sZS5hc3NlcnQoaXRlciBpbnN0YW5jZW9mIEludGVyZmFjZVRhcmdldCk7XG4gICAgICBpZiAoIXRhcmdldFNldC5oYXMoaXRlci50YXJnZXROYW1lKSkge1xuICAgICAgICB0YXJnZXRTZXQuYWRkKGl0ZXIudGFyZ2V0TmFtZSk7XG4gICAgICAgIGNvbnN0IHRhcmdldCA9IHRoaXMuZ2V0KGl0ZXIudGFyZ2V0TmFtZSk7XG4gICAgICAgIGxpYnJhcmllcy5wdXNoKHRhcmdldC5GSUxFLnRvU3RyaW5nKCkpO1xuICAgICAgICB0aGlzLl9fZ2V0QWxsTGlicmFyaWVzKGxpYnJhcmllcywgdGFyZ2V0U2V0LCBnZXRQdWJsaWNMaWJyYXJpZXModGFyZ2V0KSk7XG4gICAgICB9XG4gICAgfVxuICB9XG5cbiAgcHVibGljIGFsbExpYnJhcmllc09mKHBhcmFtczogYW55KSB7XG4gICAgY29uc3QgdGFyZ2V0ID0gKHR5cGVvZiBwYXJhbXMgPT09IFwic3RyaW5nXCIpID8gdGhpcy5nZXQocGFyYW1zKSA6IHBhcmFtcztcbiAgICBjb25zdCBsaWJyYXJpZXM6IHN0cmluZ1tdID0gW107XG4gICAgY29uc3QgdGFyZ2V0U2V0ID0gbmV3IFNldChbIHRhcmdldC5OQU1FIF0pO1xuICAgIHRoaXMuX19nZXRBbGxMaWJyYXJpZXMobGlicmFyaWVzLCB0YXJnZXRTZXQsIGdldExpYnJhcmllcyh0YXJnZXQpKTtcbiAgICByZXR1cm4gbGlicmFyaWVzO1xuICB9XG5cbiAgcHJpdmF0ZSBfX2dldEFsbERlZmluaXRpb25zKGRlZmluaXRpb25zOiBzdHJpbmdbXSwgdGFyZ2V0U2V0OiBTZXQ8c3RyaW5nPiwgbGlzdDogYW55KSB7XG4gICAgZm9yIChjb25zdCBpdGVyIG9mIGxpc3QpIHtcbiAgICAgIGlmIChpdGVyIGluc3RhbmNlb2YgSW50ZXJmYWNlVGFyZ2V0KSB7XG4gICAgICAgIGlmICghdGFyZ2V0U2V0LmhhcyhpdGVyLnRhcmdldE5hbWUpKSB7XG4gICAgICAgICAgdGFyZ2V0U2V0LmFkZChpdGVyLnRhcmdldE5hbWUpO1xuICAgICAgICAgIGNvbnN0IHRhcmdldCA9IHRoaXMuZ2V0KGl0ZXIudGFyZ2V0TmFtZSk7XG4gICAgICAgICAgdGhpcy5fX2dldEFsbERlZmluaXRpb25zKGRlZmluaXRpb25zLCB0YXJnZXRTZXQsIGdldFB1YmxpY0RlZmluaXRpb25zKHRhcmdldCkpO1xuICAgICAgICAgIHRoaXMuX19nZXRBbGxEZWZpbml0aW9ucyhkZWZpbml0aW9ucywgdGFyZ2V0U2V0LCBnZXRQdWJsaWNMaWJyYXJpZXModGFyZ2V0KSk7XG4gICAgICAgIH1cbiAgICAgIH1cbiAgICAgIGVsc2UgaWYgKHR5cGVvZiBpdGVyID09PSBcInN0cmluZ1wiKSB7XG4gICAgICAgIGlmICghZGVmaW5pdGlvbnMuaW5jbHVkZXMoaXRlcikpXG4gICAgICAgICAgZGVmaW5pdGlvbnMucHVzaChpdGVyKTtcbiAgICAgIH1cbiAgICAgIGVsc2Uge1xuICAgICAgICB0aHJvdyBuZXcgRXJyb3IoYE5vdCBzdXBwb3J0IGluc3RhbmNlICR7aXRlcn1gKTtcbiAgICAgIH1cbiAgICB9XG4gIH1cblxuICBwdWJsaWMgYWxsRGVmaW5pdGlvbnNPZihwYXJhbXM6IGFueSkge1xuICAgIGNvbnN0IHRhcmdldCA9ICh0eXBlb2YgcGFyYW1zID09PSBcInN0cmluZ1wiKSA/IHRoaXMuZ2V0KHBhcmFtcykgOiBwYXJhbXM7XG4gICAgY29uc3QgZGVmaW5pdGlvbnM6IHN0cmluZ1tdID0gW107XG4gICAgY29uc3QgdGFyZ2V0U2V0ID0gbmV3IFNldChbIHRhcmdldC5OQU1FIF0pO1xuICAgIHRoaXMuX19nZXRBbGxEZWZpbml0aW9ucyhkZWZpbml0aW9ucywgdGFyZ2V0U2V0LCBnZXREZWZpbml0aW9ucyh0YXJnZXQpKTtcbiAgICB0aGlzLl9fZ2V0QWxsRGVmaW5pdGlvbnMoZGVmaW5pdGlvbnMsIHRhcmdldFNldCwgZ2V0UHVibGljTGlicmFyaWVzKHRhcmdldCkpO1xuICAgIHJldHVybiBkZWZpbml0aW9ucztcbiAgfVxuXG4gIHByaXZhdGUgX19nZXRBbGxDb21waWxlT3B0aW9ucyhvcHRpb25zOiBBcnJheTxzdHJpbmd8c3RyaW5nW10+LCB0YXJnZXRTZXQ6IFNldDxzdHJpbmc+LCBsaXN0OiBhbnkpIHtcbiAgICBmb3IgKGNvbnN0IGl0ZXIgb2YgbGlzdCkge1xuICAgICAgaWYgKGl0ZXIgaW5zdGFuY2VvZiBJbnRlcmZhY2VUYXJnZXQpIHtcbiAgICAgICAgaWYgKCF0YXJnZXRTZXQuaGFzKGl0ZXIudGFyZ2V0TmFtZSkpIHtcbiAgICAgICAgICB0YXJnZXRTZXQuYWRkKGl0ZXIudGFyZ2V0TmFtZSk7XG4gICAgICAgICAgY29uc3QgdGFyZ2V0ID0gdGhpcy5nZXQoaXRlci50YXJnZXROYW1lKTtcbiAgICAgICAgICB0aGlzLl9fZ2V0QWxsQ29tcGlsZU9wdGlvbnMob3B0aW9ucywgdGFyZ2V0U2V0LCBnZXRQdWJsaWNDb21waWxlT3B0aW9ucyh0YXJnZXQpKTtcbiAgICAgICAgICB0aGlzLl9fZ2V0QWxsQ29tcGlsZU9wdGlvbnMob3B0aW9ucywgdGFyZ2V0U2V0LCBnZXRQdWJsaWNMaWJyYXJpZXModGFyZ2V0KSk7XG4gICAgICAgIH1cbiAgICAgIH1cbiAgICAgIGVsc2UgaWYgKHR5cGVvZiBpdGVyID09PSBcInN0cmluZ1wiKSB7XG4gICAgICAgIGlmICghb3B0aW9ucy5pbmNsdWRlcyhpdGVyKSlcbiAgICAgICAgICBvcHRpb25zLnB1c2goaXRlcik7XG4gICAgICB9XG4gICAgICBlbHNlIGlmIChBcnJheS5pc0FycmF5KGl0ZXIpKSB7XG4gICAgICAgIC8vIFRPRE86IEFkZCBjb21wYXJlIGZvciBzYW1lIGFycmF5IGluIG9wdGlvbnNcbiAgICAgICAgb3B0aW9ucy5wdXNoKGl0ZXIpO1xuICAgICAgfVxuICAgICAgZWxzZSB7XG4gICAgICAgIHRocm93IG5ldyBFcnJvcihgTm90IHN1cHBvcnQgaW5zdGFuY2UgJHtpdGVyfWApO1xuICAgICAgfVxuICAgIH1cbiAgfVxuXG4gIHB1YmxpYyBhbGxDb21waWxlT3B0aW9uc09mKHBhcmFtczogYW55KSB7XG4gICAgY29uc3QgdGFyZ2V0ID0gKHR5cGVvZiBwYXJhbXMgPT09IFwic3RyaW5nXCIpID8gdGhpcy5nZXQocGFyYW1zKSA6IHBhcmFtcztcbiAgICBjb25zdCBvcHRpb25zOiBzdHJpbmdbXSA9IFtdO1xuICAgIGNvbnN0IHRhcmdldFNldCA9IG5ldyBTZXQoWyB0YXJnZXQuTkFNRSBdKTtcbiAgICB0aGlzLl9fZ2V0QWxsQ29tcGlsZU9wdGlvbnMob3B0aW9ucywgdGFyZ2V0U2V0LCBnZXRDb21waWxlT3B0aW9ucyh0YXJnZXQpKTtcbiAgICB0aGlzLl9fZ2V0QWxsQ29tcGlsZU9wdGlvbnMob3B0aW9ucywgdGFyZ2V0U2V0LCBnZXRQdWJsaWNMaWJyYXJpZXModGFyZ2V0KSk7XG4gICAgcmV0dXJuIG9wdGlvbnMuZmxhdCgpO1xuICB9XG5cbiAgcHJpdmF0ZSBfX2dldExpbmtPcHRpb25zKG9wdGlvbnM6IEFycmF5PHN0cmluZ3xzdHJpbmdbXT4sIHRhcmdldFNldDogU2V0PHN0cmluZz4sIGxpc3Q6IGFueSkge1xuICAgIGZvciAoY29uc3QgaXRlciBvZiBsaXN0KSB7XG4gICAgICBpZiAoaXRlciBpbnN0YW5jZW9mIEludGVyZmFjZVRhcmdldCkge1xuICAgICAgICBpZiAoIXRhcmdldFNldC5oYXMoaXRlci50YXJnZXROYW1lKSkge1xuICAgICAgICAgIHRhcmdldFNldC5hZGQoaXRlci50YXJnZXROYW1lKTtcbiAgICAgICAgICBjb25zdCB0YXJnZXQgPSB0aGlzLmdldChpdGVyLnRhcmdldE5hbWUpO1xuICAgICAgICAgIHRoaXMuX19nZXRMaW5rT3B0aW9ucyhvcHRpb25zLCB0YXJnZXRTZXQsIGdldFB1YmxpY0xpbmtPcHRpb25zKHRhcmdldCkpO1xuICAgICAgICAgIHRoaXMuX19nZXRMaW5rT3B0aW9ucyhvcHRpb25zLCB0YXJnZXRTZXQsIGdldFB1YmxpY0xpYnJhcmllcyh0YXJnZXQpKTtcbiAgICAgICAgfVxuICAgICAgfVxuICAgICAgZWxzZSBpZiAodHlwZW9mIGl0ZXIgPT09IFwic3RyaW5nXCIpIHtcbiAgICAgICAgaWYgKCFvcHRpb25zLmluY2x1ZGVzKGl0ZXIpKVxuICAgICAgICAgIG9wdGlvbnMucHVzaChpdGVyKTtcbiAgICAgIH1cbiAgICAgIGVsc2UgaWYgKEFycmF5LmlzQXJyYXkoaXRlcikpIHtcbiAgICAgICAgLy8gVE9ETzogQWRkIGNvbXBhcmUgZm9yIHNhbWUgYXJyYXkgaW4gb3B0aW9uc1xuICAgICAgICBvcHRpb25zLnB1c2goaXRlcik7XG4gICAgICB9XG4gICAgICBlbHNlIHtcbiAgICAgICAgdGhyb3cgbmV3IEVycm9yKGBOb3Qgc3VwcG9ydCBpbnN0YW5jZSAke2l0ZXJ9YCk7XG4gICAgICB9XG4gICAgfVxuICB9XG5cbiAgcHVibGljIGFsbExpbmtPcHRpb25zT2YocGFyYW1zOiBhbnkpIHtcbiAgICBjb25zdCB0YXJnZXQgPSAodHlwZW9mIHBhcmFtcyA9PT0gXCJzdHJpbmdcIikgPyB0aGlzLmdldChwYXJhbXMpIDogcGFyYW1zO1xuICAgIGNvbnN0IG9wdGlvbnM6IHN0cmluZ1tdID0gW107XG4gICAgY29uc3QgdGFyZ2V0U2V0ID0gbmV3IFNldChbIHRhcmdldC5OQU1FIF0pO1xuICAgIHRoaXMuX19nZXRMaW5rT3B0aW9ucyhvcHRpb25zLCB0YXJnZXRTZXQsIGdldExpbmtPcHRpb25zKHRhcmdldCkpO1xuICAgIHRoaXMuX19nZXRMaW5rT3B0aW9ucyhvcHRpb25zLCB0YXJnZXRTZXQsIGdldFB1YmxpY0xpYnJhcmllcyh0YXJnZXQpKTtcbiAgICByZXR1cm4gb3B0aW9ucy5mbGF0KCk7XG4gIH1cbn1cbiIsIi8qXG4gKiBNSVQgTGljZW5zZVxuICpcbiAqIENvcHlyaWdodCAoYykgMjAyNSAgWXVyaWkgWWFrdWJpbiAoeXVyaWkueWFrdWJpbkBnbWFpbC5jb20pXG4gKlxuICogUGVybWlzc2lvbiBpcyBncmFudGVkIHRvIHVzZSwgY29weSwgbW9kaWZ5LCBhbmQgZGlzdHJpYnV0ZSB0aGlzIHNvZnR3YXJlXG4gKiB1bmRlciB0aGUgTUlUIExpY2Vuc2UuIFNlZSBMSUNFTlNFIGZpbGUgZm9yIGRldGFpbHMuXG4gKi9cblxuaW1wb3J0IHsgZmluZFByb2dyYW1TeW5jIH0gZnJvbSBcIkAvY29yZS9GaW5kUHJvZ3JhbVwiO1xuaW1wb3J0IHsgR2xvYmFsQ29udGV4dCB9IGZyb20gXCJAL2NvcmUvR2xvYmFsQ29udGV4dFwiO1xuaW1wb3J0IHsgU2NvcGVIZWxwZXIgfSBmcm9tIFwiQC9jb3JlL1Njb3BlXCI7XG5pbXBvcnQgeyBTeXN0ZW1TY29wZSB9IGZyb20gXCJAL2NvcmUvU3lzdGVtU2NvcGVcIjtcblxuY29uc3QgR0xPQkFMID0gU3ltYm9sKFwiR0xPQkFMXCIpO1xuY29uc3QgU0NPUEUgPSBTeW1ib2woXCJTQ09QRVwiKTtcblxuZXhwb3J0IGNsYXNzIFRvb2xjaGFpbkNvbnRleHQge1xuICBwcml2YXRlIFtTQ09QRV06IFN5c3RlbVNjb3BlO1xuICBwcml2YXRlIFtHTE9CQUxdOiBHbG9iYWxDb250ZXh0O1xuXG4gIHByaXZhdGUgY29uc3RydWN0b3Ioc2NvcGU6IFN5c3RlbVNjb3BlLCBnbG9iYWw6IEdsb2JhbENvbnRleHQpIHtcbiAgICB0aGlzW1NDT1BFXSA9IHNjb3BlO1xuICAgIHRoaXNbR0xPQkFMXSA9IGdsb2JhbDtcbiAgfVxuXG4gIHB1YmxpYyBzdGF0aWMgY3JlYXRlKHNjb3BlOiBTeXN0ZW1TY29wZSwgZ2xvYmFsOiBHbG9iYWxDb250ZXh0KSB7XG4gICAgY29uc3QgcHJvdG8gPSBUb29sY2hhaW5Db250ZXh0LnByb3RvdHlwZTtcbiAgICBjb25zdCBuZXdTY29wZSA9IE9iamVjdC5jcmVhdGUocHJvdG8pO1xuICAgIFNjb3BlSGVscGVyLmNsb25lKG5ld1Njb3BlLCBzY29wZSk7XG4gICAgY29uc3Qgc2VsZiA9IE9iamVjdC5jcmVhdGUobmV3U2NvcGUpO1xuICAgIHNlbGZbU0NPUEVdID0gbmV3U2NvcGU7XG4gICAgc2VsZltHTE9CQUxdID0gZ2xvYmFsO1xuICAgIHJldHVybiBzZWxmO1xuICB9XG5cbiAgcHVibGljIF9zY29wZSgpIHtcbiAgICByZXR1cm4gdGhpc1tTQ09QRV07XG4gIH1cbn07XG5cbk9iamVjdC5kZWZpbmVQcm9wZXJ0eShUb29sY2hhaW5Db250ZXh0LnByb3RvdHlwZSwgXCJmaW5kUHJvZ3JhbVwiLCB7XG4gIHZhbHVlOiBmaW5kUHJvZ3JhbVN5bmMsXG4gIGVudW1lcmFibGU6IGZhbHNlLFxufSk7XG4iLCIvKlxuICogTUlUIExpY2Vuc2VcbiAqXG4gKiBDb3B5cmlnaHQgKGMpIDIwMjUgIFl1cmlpIFlha3ViaW4gKHl1cmlpLnlha3ViaW5AZ21haWwuY29tKVxuICpcbiAqIFBlcm1pc3Npb24gaXMgZ3JhbnRlZCB0byB1c2UsIGNvcHksIG1vZGlmeSwgYW5kIGRpc3RyaWJ1dGUgdGhpcyBzb2Z0d2FyZVxuICogdW5kZXIgdGhlIE1JVCBMaWNlbnNlLiBTZWUgTElDRU5TRSBmaWxlIGZvciBkZXRhaWxzLlxuICovXG5cbmV4cG9ydCBjb25zdCBERUJVR19CVUlMRF9UWVBFID0gXCJEZWJ1Z1wiO1xuZXhwb3J0IGNvbnN0IFJFTEVBU0VfQlVJTERfVFlQRSA9IFwiUmVsZWFzZVwiO1xuIiwiLypcbiAqIE1JVCBMaWNlbnNlXG4gKlxuICogQ29weXJpZ2h0IChjKSAyMDI1ICBZdXJpaSBZYWt1YmluICh5dXJpaS55YWt1YmluQGdtYWlsLmNvbSlcbiAqXG4gKiBQZXJtaXNzaW9uIGlzIGdyYW50ZWQgdG8gdXNlLCBjb3B5LCBtb2RpZnksIGFuZCBkaXN0cmlidXRlIHRoaXMgc29mdHdhcmVcbiAqIHVuZGVyIHRoZSBNSVQgTGljZW5zZS4gU2VlIExJQ0VOU0UgZmlsZSBmb3IgZGV0YWlscy5cbiAqL1xuXG5jb25zdCBOQU1FID0gU3ltYm9sKFwiTkFNRVwiKTtcbmNvbnN0IElOQ0xVREVTID0gU3ltYm9sKFwiSU5DTFVERVNcIik7XG5jb25zdCBTT1VSQ0VTID0gU3ltYm9sKFwiU09VUkNFU1wiKTtcbmNvbnN0IERFRklORVMgPSBTeW1ib2woXCJERUZJTkVTXCIpO1xuY29uc3QgQ09NUElMRV9PUFRJT05TID0gU3ltYm9sKFwiQ09NUElMRV9PUFRJT05TXCIpO1xuY29uc3QgTElOS19PUFRJT05TID0gU3ltYm9sKFwiTElOS19PUFRJT05TXCIpO1xuXG5leHBvcnQgY2xhc3MgVW5rbm93blRhcmdldCB7XG4gIHByaXZhdGUgW05BTUVdOiBzdHJpbmc7XG4gIHByaXZhdGUgW0lOQ0xVREVTXTogYW55W107XG4gIHByaXZhdGUgW1NPVVJDRVNdOiBhbnlbXTtcbiAgcHJpdmF0ZSBbREVGSU5FU106IGFueVtdO1xuICBwcml2YXRlIFtDT01QSUxFX09QVElPTlNdOiBhbnlbXTtcbiAgcHJpdmF0ZSBbTElOS19PUFRJT05TXTogYW55W107XG5cbiAgcHJpdmF0ZSBjb25zdHJ1Y3RvcihuYW1lOiBzdHJpbmcpIHtcbiAgICB0aGlzW05BTUVdID0gbmFtZTtcbiAgICB0aGlzW0lOQ0xVREVTXSA9IFtdO1xuICAgIHRoaXNbU09VUkNFU10gPSBbXTtcbiAgICB0aGlzW0RFRklORVNdID0gW107XG4gICAgdGhpc1tDT01QSUxFX09QVElPTlNdID0gW107XG4gICAgdGhpc1tMSU5LX09QVElPTlNdID0gW107XG4gIH1cblxuICBwdWJsaWMgc3RhdGljIGNyZWF0ZShuYW1lOiBzdHJpbmcpIHtcbiAgICByZXR1cm4gT2JqZWN0LnNlYWwobmV3IFVua25vd25UYXJnZXQobmFtZSkpO1xuICB9XG5cbiAgcHVibGljIHN0YXRpYyBlbnN1cmVJbnN0YW5jZSh2YWx1ZTogYW55KSB7XG4gICAgaWYgKHZhbHVlIGluc3RhbmNlb2YgVW5rbm93blRhcmdldClcbiAgICAgIHJldHVybiB2YWx1ZTtcbiAgICB0aHJvdyBuZXcgRXJyb3IoYFRoZSAnJHt2YWx1ZX0nIGlzIG5vdCBhIFVua25vd25UYXJnZXRgKTtcbiAgfVxuXG4gIHB1YmxpYyBnZXQgTkFNRSAoKSB7XG4gICAgcmV0dXJuIHRoaXNbTkFNRV07XG4gIH1cblxuICBwdWJsaWMgZ2V0IElOQ0xVREVTICgpIHtcbiAgICByZXR1cm4gdGhpc1tJTkNMVURFU107XG4gIH1cblxuICBwdWJsaWMgZ2V0IFNPVVJDRVMgKCkge1xuICAgIHJldHVybiB0aGlzW1NPVVJDRVNdO1xuICB9XG5cbiAgcHVibGljIGdldCBERUZJTkVTICgpIHtcbiAgICByZXR1cm4gdGhpc1tERUZJTkVTXTtcbiAgfVxuXG4gIHB1YmxpYyBnZXQgQ09NUElMRV9PUFRJT05TICgpIHtcbiAgICByZXR1cm4gdGhpc1tDT01QSUxFX09QVElPTlNdO1xuICB9XG5cbiAgcHVibGljIGdldCBMSU5LX09QVElPTlMgKCkge1xuICAgIHJldHVybiB0aGlzW0xJTktfT1BUSU9OU107XG4gIH1cblxuICBwdWJsaWMgdG9KU09OKCk6IG9iamVjdCB7XG4gICAgcmV0dXJuIHtcbiAgICAgIE5BTUU6IHRoaXMuTkFNRSxcbiAgICAgIElOQ0xVREVTOiB0aGlzLklOQ0xVREVTLFxuICAgICAgU09VUkNFUzogdGhpcy5TT1VSQ0VTLFxuICAgICAgREVGSU5FUzogdGhpcy5ERUZJTkVTLFxuICAgICAgQ09NUElMRV9PUFRJT05TOiB0aGlzLkNPTVBJTEVfT1BUSU9OUyxcbiAgICAgIExJTktfT1BUSU9OUzogdGhpcy5MSU5LX09QVElPTlMsXG4gICAgfTtcbiAgfVxuXG4gIHB1YmxpYyB0b1N0cmluZygpOiBzdHJpbmcge1xuICAgIHJldHVybiBcIiR7XCIgKyB0aGlzW05BTUVdICsgXCJ9XCI7XG4gIH1cbn07XG4iLCIvKlxuICogTUlUIExpY2Vuc2VcbiAqXG4gKiBDb3B5cmlnaHQgKGMpIDIwMjUgIFl1cmlpIFlha3ViaW4gKHl1cmlpLnlha3ViaW5AZ21haWwuY29tKVxuICpcbiAqIFBlcm1pc3Npb24gaXMgZ3JhbnRlZCB0byB1c2UsIGNvcHksIG1vZGlmeSwgYW5kIGRpc3RyaWJ1dGUgdGhpcyBzb2Z0d2FyZVxuICogdW5kZXIgdGhlIE1JVCBMaWNlbnNlLiBTZWUgTElDRU5TRSBmaWxlIGZvciBkZXRhaWxzLlxuICovXG5cbmltcG9ydCBwYXRoIGZyb20gXCJub2RlOnBhdGhcIjtcblxuaW1wb3J0IHsgZmlsZUV4aXN0c1N5bmMgfSBmcm9tIFwiQC91dGlscy9GaWxlU3lzdGVtXCI7XG5pbXBvcnQgeyBGaWxlUGF0aCwgQWJzb2x1dGVQYXRoIH0gZnJvbSBcIkAvY29yZS9QYXRoXCI7XG5pbXBvcnQgeyBJbnRlcmZhY2VUYXJnZXQgfSBmcm9tIFwiQC9jb3JlL0ludGVyZmFjZVRhcmdldFwiO1xuaW1wb3J0IHsgSW50ZXJmYWNlU2NyaXB0IH0gZnJvbSBcIkAvY29yZS9JbnRlcmZhY2VTY3JpcHRcIjtcbmltcG9ydCB7IEluc3RhbGxFbnRpdHkgfSBmcm9tIFwiQC9jb3JlL0luc3RhbGxFbnRpdHlcIjtcbmltcG9ydCB7IE9iamVjdExpYnJhcnksIFN0YXRpY0xpYnJhcnksIFNoYXJlZExpYnJhcnksIEV4ZWN1dGFibGUsIEJhc2VUYXJnZXQgfSBmcm9tIFwiQC9jb3JlL1RhcmdldFwiO1xuaW1wb3J0IHsgSW5jbHVkZURpcmVjdG9yeSB9IGZyb20gXCJAL2NvcmUvSW5jbHVkZURpcmVjdG9yeVwiO1xuaW1wb3J0IHsgQ3VzdG9tU2NyaXB0IH0gZnJvbSBcIkAvY29yZS9DdXN0b21TY3JpcHRcIjtcbmltcG9ydCB7IEdsb2JhbENvbnRleHQgfSBmcm9tIFwiQC9jb3JlL0dsb2JhbENvbnRleHRcIjtcbmltcG9ydCB7IFNjb3BlSGVscGVyIH0gZnJvbSBcIkAvY29yZS9TY29wZVwiO1xuaW1wb3J0IHsgU3lzdGVtU2NvcGUgfSBmcm9tIFwiQC9jb3JlL1N5c3RlbVNjb3BlXCI7XG5pbXBvcnQgeyBmaW5kUHJvZ3JhbVN5bmMgfSBmcm9tIFwiQC9jb3JlL0ZpbmRQcm9ncmFtXCI7XG5pbXBvcnQgeyBjcmVhdGVMb2dnZXIgfSBmcm9tIFwiQC9sb2dnZXJcIjtcblxuY29uc3QgbG9nZ2VyID0gY3JlYXRlTG9nZ2VyKGltcG9ydC5tZXRhLnVybCk7XG5cbmNvbnN0IHJlcXVpcmVJbXBsID0gZXZhbChcInJlcXVpcmVcIik7XG5cbmZ1bmN0aW9uIHNjb3BlVmFsdWVBc1ByaW1pdGl2ZXMobzogYW55KTogYW55IHtcbiAgaWYgKHR5cGVvZiBvID09PSBcInVuZGVmaW5lZFwiKVxuICAgIHJldHVybiBvO1xuICBpZiAodHlwZW9mIG8gPT09IFwiYm9vbGVhblwiKVxuICAgIHJldHVybiBvO1xuICBpZiAodHlwZW9mIG8gPT09IFwibnVtYmVyXCIpXG4gICAgcmV0dXJuIG87XG4gIGlmICh0eXBlb2YgbyA9PT0gXCJzdHJpbmdcIilcbiAgICByZXR1cm4gbztcbiAgaWYgKHR5cGVvZiBvID09PSBcIm9iamVjdFwiKSB7XG4gICAgaWYgKCFvKVxuICAgICAgcmV0dXJuIG87XG4gICAgaWYgKG8gaW5zdGFuY2VvZiBBYnNvbHV0ZVBhdGgpIHtcbiAgICAgIHJldHVybiBvLnRvU3RyaW5nKCk7XG4gICAgfVxuICAgIGlmIChvIGluc3RhbmNlb2YgQXJyYXkpIHtcbiAgICAgIGNvbnN0IHJlc3VsdCA9IFtdO1xuICAgICAgZm9yIChjb25zdCBpIG9mIG8pXG4gICAgICAgIHJlc3VsdC5wdXNoKHNjb3BlVmFsdWVBc1ByaW1pdGl2ZXMoaSkpO1xuICAgICAgcmV0dXJuIHJlc3VsdDtcbiAgICB9XG4gICAgaWYgKG8gaW5zdGFuY2VvZiBPYmplY3QpIHtcbiAgICAgIGNvbnN0IHJlc3VsdDogYW55ID0ge307XG4gICAgICBmb3IgKGNvbnN0IFtrLHZdIG9mIE9iamVjdC5lbnRyaWVzKG8pKVxuICAgICAgICByZXN1bHRba10gPSBzY29wZVZhbHVlQXNQcmltaXRpdmVzKHYpO1xuICAgICAgcmV0dXJuIHJlc3VsdDtcbiAgICB9XG4gIH1cbiAgdGhyb3cgbmV3IEVycm9yKGBVbmtub3duIGluc3RhbmNlIG9mICR7b31gKTtcbn1cblxuY29uc3QgR0xPQkFMID0gU3ltYm9sKFwiR0xPQkFMXCIpO1xuY29uc3QgU0NPUEUgPSBTeW1ib2woXCJTQ09QRVwiKTtcblxuZXhwb3J0IGNsYXNzIFVzZXJDb250ZXh0IHtcbiAgcHJpdmF0ZSBbU0NPUEVdOiBTeXN0ZW1TY29wZTtcbiAgcHJpdmF0ZSBbR0xPQkFMXTogR2xvYmFsQ29udGV4dDtcblxuICBwcml2YXRlIGNvbnN0cnVjdG9yKHNjb3BlOiBTeXN0ZW1TY29wZSwgZ2xvYmFsOiBHbG9iYWxDb250ZXh0KSB7XG4gICAgdGhpc1tTQ09QRV0gPSBzY29wZTtcbiAgICB0aGlzW0dMT0JBTF0gPSBnbG9iYWw7XG4gIH1cblxuICBwdWJsaWMgc3RhdGljIGNyZWF0ZShzY29wZTogU3lzdGVtU2NvcGUsIGdsb2JhbDogR2xvYmFsQ29udGV4dCk6IFVzZXJDb250ZXh0IHtcbiAgICBjb25zdCBwcm90byA9IFVzZXJDb250ZXh0LnByb3RvdHlwZTtcbiAgICBjb25zdCBuZXdTY29wZSA9IE9iamVjdC5jcmVhdGUocHJvdG8pO1xuICAgIFNjb3BlSGVscGVyLmNsb25lKG5ld1Njb3BlLCBzY29wZSk7XG4gICAgY29uc3Qgb2JqID0gT2JqZWN0LmNyZWF0ZShuZXdTY29wZSk7XG4gICAgb2JqW1NDT1BFXSA9IG5ld1Njb3BlO1xuICAgIG9ialtHTE9CQUxdID0gZ2xvYmFsO1xuICAgIHJldHVybiBvYmo7XG4gIH1cblxuICBwdWJsaWMgZ2V0Q2FjaGVWYXJpYWJsZXMoKSB7XG4gICAgcmV0dXJuIFNjb3BlSGVscGVyLmdldFZhcmlhYmxlc0J5R3JvdXAodGhpc1tTQ09QRV0sIFwiY2FjaGVcIik7XG4gIH1cblxuICBwdWJsaWMgYWRkQ2FjaGVWYXJpYWJsZXMocGFyYW1zOiBhbnkpIHtcbiAgICBsZXQgdmFyaWFibGVzID0gcGFyYW1zO1xuICAgIGlmICh0eXBlb2YgcGFyYW1zID09PSBcInN0cmluZ1wiKSB7XG4gICAgICBjb25zdCBmaWxlbmFtZSA9IHRoaXNbU0NPUEVdLlNPVVJDRV9ESVIucmVzb2x2ZShwYXJhbXMpLnRvU3RyaW5nKCk7XG4gICAgICBpZiAoIWZpbGVFeGlzdHNTeW5jKGZpbGVuYW1lKSlcbiAgICAgICAgcmV0dXJuO1xuICAgICAgdmFyaWFibGVzID0gcmVxdWlyZUltcGwoZmlsZW5hbWUpO1xuICAgIH1cbiAgICBcbiAgICBTY29wZUhlbHBlci5kZWZpbmVWYXJpYWJsZXModGhpc1tTQ09QRV0sIFwiY2FjaGVcIiwgdmFyaWFibGVzKTtcbiAgfVxuXG4gIHB1YmxpYyBhZGRJbmNsdWRlRGlyZWN0b3JpZXMoLi4uZGlyczogYW55W10pIHtcbiAgICBjb25zdCBzb3VyY2VEaXIgPSB0aGlzW1NDT1BFXS5TT1VSQ0VfRElSO1xuICAgIGZvciAoY29uc3QgaXRlciBvZiBkaXJzLmZsYXQoMSkpIHtcbiAgICAgIHRoaXNbU0NPUEVdLklOQ0xVREVTLnB1c2goSW5jbHVkZURpcmVjdG9yeS5jcmVhdGUoaXRlciwgc291cmNlRGlyKSk7XG4gICAgfVxuICB9XG5cbiAgcHVibGljIGFkZFN1YmRpcmVjdG9yeShzb3VyY2VEaXI6IGFueSwgYmluYXJ5RGlyOiBhbnkpIHtcbiAgICBiaW5hcnlEaXIgPSBiaW5hcnlEaXIgfHwgcGF0aC5pc0Fic29sdXRlKHNvdXJjZURpcikgPyB1bmRlZmluZWQgOiBzb3VyY2VEaXI7XG5cbiAgICBjb25zdCBTT1VSQ0VfRElSID0gcGF0aC5pc0Fic29sdXRlKHNvdXJjZURpcikgPyBBYnNvbHV0ZVBhdGguY3JlYXRlKHNvdXJjZURpcikgOiB0aGlzW1NDT1BFXS5TT1VSQ0VfRElSLmpvaW4oc291cmNlRGlyKTtcbiAgICBjb25zdCBCSU5BUllfRElSID0gcGF0aC5pc0Fic29sdXRlKGJpbmFyeURpcikgPyBBYnNvbHV0ZVBhdGguY3JlYXRlKGJpbmFyeURpcikgOiB0aGlzW1NDT1BFXS5CSU5BUllfRElSLmpvaW4oYmluYXJ5RGlyKTtcblxuICAgIGNvbnN0IG5ld1Njb3BlID0gU2NvcGVIZWxwZXIuY2xvbmUoe30sIHRoaXNbU0NPUEVdKTtcbiAgICBTY29wZUhlbHBlci5hcHBseVZhcmlhYmxlcyhuZXdTY29wZSwgdGhpcyk7XG5cbiAgICBuZXdTY29wZS5TT1VSQ0VfRElSID0gQWJzb2x1dGVQYXRoLmNyZWF0ZSh0aGlzW0dMT0JBTF0ucmVzb2x2ZVN1YmRpcmVjdG9yeShTT1VSQ0VfRElSKS50b1N0cmluZygpKTtcbiAgICBuZXdTY29wZS5CSU5BUllfRElSID0gQklOQVJZX0RJUjtcblxuICAgIHRoaXNbR0xPQkFMXS5hZGRTdWJkaXJlY3RvcnkobmV3U2NvcGUpO1xuICB9XG5cbiAgcHVibGljIGFkZEN1c3RvbVNjcmlwdChzY3JpcHQ6IGFueSwgcGFyYW1zOiBhbnkpOiBDdXN0b21TY3JpcHQge1xuICAgIGlmICghcGFyYW1zIHx8ICFwYXJhbXMub3V0cHV0KVxuICAgICAgdGhyb3cgbmV3IEVycm9yKGBVa25vd24gcGFyYW1zICR7SlNPTi5zdHJpbmdpZnkocGFyYW1zKX1gKTtcblxuICAgIGxldCBzY3JpcHRPYmo6IEZ1bmN0aW9uIHwgRmlsZVBhdGggfCB1bmRlZmluZWQ7XG4gICAgaWYgKHR5cGVvZiBzY3JpcHQgPT09IFwic3RyaW5nXCIpXG4gICAgICBzY3JpcHRPYmogPSB0aGlzW0dMT0JBTF0uZmluZFNjcmlwdEZ1bmN0aW9uKHNjcmlwdCk7XG4gICAgaWYgKCFzY3JpcHRPYmopXG4gICAgICBzY3JpcHRPYmogPSBGaWxlUGF0aC5jcmVhdGUodGhpc1tTQ09QRV0uU09VUkNFX0RJUi5yZXNvbHZlKHNjcmlwdCkpO1xuXG4gICAgY29uc3QgdGFyZ2V0ID0gQ3VzdG9tU2NyaXB0LmNyZWF0ZSh0aGlzW1NDT1BFXSwgc2NyaXB0T2JqLCBwYXJhbXMub3V0cHV0LCBwYXJhbXMpO1xuICAgIHRoaXNbR0xPQkFMXS5zZXRDdXN0b21TY3JpcHQodGFyZ2V0LCBwYXJhbXMubmFtZSk7XG4gICAgcmV0dXJuIHRhcmdldDtcbiAgfVxuXG4gIHB1YmxpYyB0YXJnZXQobmFtZTogc3RyaW5nKSB7XG4gICAgY29uc3QgdXRhcmdldCA9IHRoaXNbR0xPQkFMXS5nZXRVa25vd25UYXJnZXQobmFtZSk7XG4gICAgcmV0dXJuIEludGVyZmFjZVRhcmdldC5jcmVhdGUodGhpc1tTQ09QRV0sIHV0YXJnZXQpO1xuICB9XG5cbiAgcHVibGljIHNjcmlwdChuYW1lOiBzdHJpbmcpIHtcbiAgICBsZXQgc2NyaXB0ID0gdGhpc1tHTE9CQUxdLklOVEVSRkFDRV9TQ1JJUFRTW25hbWVdO1xuICAgIGlmICghc2NyaXB0KSB7XG4gICAgICBzY3JpcHQgPSBJbnRlcmZhY2VTY3JpcHQuY3JlYXRlKG5hbWUpO1xuICAgICAgdGhpc1tHTE9CQUxdLklOVEVSRkFDRV9TQ1JJUFRTW25hbWVdID0gc2NyaXB0O1xuICAgIH1cbiAgICByZXR1cm4gc2NyaXB0O1xuICB9XG5cbiAgcHVibGljIGluc3RhbGwodmFsdWU6IGFueSwgcGFyYW1zOiBhbnkpIHtcbiAgICBmb3IgKGNvbnN0IGl0IG9mIFsgdmFsdWUgXS5mbGF0KDEpKSB7XG4gICAgICBjb25zdCBpdGVyID0gKGl0IGluc3RhbmNlb2YgQmFzZVRhcmdldCkgPyB0aGlzLnRhcmdldChpdC5OQU1FKSA6IGl0O1xuICAgICAgY29uc3QgZW50aXR5ID0gSW5zdGFsbEVudGl0eS5jcmVhdGUodGhpcywgaXRlciwgcGFyYW1zKTtcbiAgICAgIHRoaXNbR0xPQkFMXS5hZGRJbnN0YWxsRW50cnkoZW50aXR5KTtcbiAgICB9XG4gIH1cblxuICBwdWJsaWMgYWRkU3RhdGljTGlicmFyeShuYW1lOiBhbnksIC4uLnNvdXJjZXM6IGFueVtdKSB7XG4gICAgY29uc3QgdGFyZ2V0ID0gU3RhdGljTGlicmFyeS5jcmVhdGUodGhpc1tTQ09QRV0sIG5hbWUpO1xuICAgIHRhcmdldC5hZGRTb3VyY2VzKC4uLnNvdXJjZXMpO1xuICBcbiAgICB0aGlzW0dMT0JBTF0uVEFSR0VUUy5zZXQobmFtZSwgdGFyZ2V0KTtcbiAgICByZXR1cm4gdGFyZ2V0O1xuICB9XG5cbiAgcHVibGljIGFkZE9iamVjdExpYnJhcnkobmFtZTogYW55LCAuLi5zb3VyY2VzOiBhbnlbXSkge1xuICAgIGNvbnN0IHRhcmdldCA9IE9iamVjdExpYnJhcnkuY3JlYXRlKHRoaXNbU0NPUEVdLCBuYW1lKTtcbiAgICB0YXJnZXQuYWRkU291cmNlcyguLi5zb3VyY2VzKTtcblxuICAgIHRoaXNbR0xPQkFMXS5UQVJHRVRTLnNldChuYW1lLCB0YXJnZXQpO1xuICAgIHJldHVybiB0YXJnZXQ7XG4gIH1cblxuICBwdWJsaWMgYWRkU2hhcmVkTGlicmFyeShuYW1lOiBhbnksIC4uLnNvdXJjZXM6IGFueVtdKSB7XG4gICAgY29uc3QgdGFyZ2V0ID0gU2hhcmVkTGlicmFyeS5jcmVhdGUodGhpc1tTQ09QRV0sIG5hbWUpO1xuICAgIHRhcmdldC5hZGRTb3VyY2VzKC4uLnNvdXJjZXMpO1xuICBcbiAgICB0aGlzW0dMT0JBTF0uVEFSR0VUUy5zZXQobmFtZSwgdGFyZ2V0KTtcbiAgICByZXR1cm4gdGFyZ2V0O1xuICB9XG5cbiAgcHVibGljIGFkZEV4ZWN1dGFibGUobmFtZTogc3RyaW5nLCAuLi5zb3VyY2VzOiBhbnlbXSkge1xuICAgIGNvbnN0IHRhcmdldCA9IEV4ZWN1dGFibGUuY3JlYXRlKHRoaXNbU0NPUEVdLCBuYW1lKTtcbiAgICB0YXJnZXQuYWRkU291cmNlcyguLi5zb3VyY2VzKTtcbiAgXG4gICAgdGhpc1tHTE9CQUxdLlRBUkdFVFMuc2V0KG5hbWUsIHRhcmdldCk7XG4gICAgcmV0dXJuIHRhcmdldDtcbiAgfVxuXG4gIHB1YmxpYyBleGVjdXRlU2NyaXB0KHNjcmlwdDogYW55LCBvcHRpb25zOiBhbnkpIHtcbiAgICBjb25zdCBzY3JpcHRQYXRoID0gdGhpc1tTQ09QRV0uU09VUkNFX0RJUi5yZXNvbHZlKHNjcmlwdCk7XG4gICAgY29uc3QgbW9kdWxlID0gcmVxdWlyZUltcGwoc2NyaXB0UGF0aC50b1N0cmluZygpKTtcbiAgICBtb2R1bGUoc2NvcGVWYWx1ZUFzUHJpbWl0aXZlcyhvcHRpb25zKSk7XG4gIH1cbn07XG5cbk9iamVjdC5kZWZpbmVQcm9wZXJ0eShVc2VyQ29udGV4dC5wcm90b3R5cGUsIFwiZmluZFByb2dyYW1cIiwge1xuICB2YWx1ZTogZmluZFByb2dyYW1TeW5jLFxuICBlbnVtZXJhYmxlOiBmYWxzZSxcbn0pO1xuIiwiLypcbiAqIE1JVCBMaWNlbnNlXG4gKlxuICogQ29weXJpZ2h0IChjKSAyMDI1ICBZdXJpaSBZYWt1YmluICh5dXJpaS55YWt1YmluQGdtYWlsLmNvbSlcbiAqXG4gKiBQZXJtaXNzaW9uIGlzIGdyYW50ZWQgdG8gdXNlLCBjb3B5LCBtb2RpZnksIGFuZCBkaXN0cmlidXRlIHRoaXMgc29mdHdhcmVcbiAqIHVuZGVyIHRoZSBNSVQgTGljZW5zZS4gU2VlIExJQ0VOU0UgZmlsZSBmb3IgZGV0YWlscy5cbiAqL1xuXG5pbXBvcnQgcGF0aCBmcm9tIFwibm9kZTpwYXRoXCI7XG5cbmV4cG9ydCBmdW5jdGlvbiBmaWxlbmFtZVRvUHJhZ21hT25jZU1hY3JvKGZpbGVwYXRoOiBzdHJpbmcsIGRlZXA6IG51bWJlcikge1xuICBpZiAodHlwZW9mIGRlZXAgPT09ICd1bmRlZmluZWQnKVxuICAgIGRlZXAgPSAzO1xuXG4gIGxldCBjb21wb25lbnRzID0gcGF0aC5ub3JtYWxpemUoZmlsZXBhdGgpLnNwbGl0KHBhdGguc2VwKTtcbiAgaWYgKGNvbXBvbmVudHMubGVuZ3RoID4gZGVlcClcbiAgICBjb21wb25lbnRzID0gY29tcG9uZW50cy5zbGljZShjb21wb25lbnRzLmxlbmd0aCAtIGRlZXApO1xuXG4gIHJldHVybiBcIl9cIiArIGNvbXBvbmVudHMuam9pbignXycpLnJlcGxhY2UoL1stIC46JX5dL2csICdfJykudG9VcHBlckNhc2UoKTtcbn1cblxuZXhwb3J0IGZ1bmN0aW9uIGxpbmVUb1NpbmdsQ29tbWVudChsaW5lOiBzdHJpbmcpIHtcbiAgcmV0dXJuIFwiLy9cIiArIGxpbmU7XG59XG5cbmV4cG9ydCBmdW5jdGlvbiBsaW5lVG9NdWx0aXBsZUNvbW1lbnQobGluZTogc3RyaW5nKSB7XG4gIHJldHVybiBgLyogJHtsaW5lfSAqL2A7XG59XG5cbmV4cG9ydCBmdW5jdGlvbiBnZW5lcmF0ZWRTY3JpcHROYW1lQ29tbWVudChmaWxlbmFtZTogc3RyaW5nKSB7XG4gIHJldHVybiBsaW5lVG9NdWx0aXBsZUNvbW1lbnQoXCJHZW5lcmF0ZWQgZnJvbSBcIiArIHBhdGguYmFzZW5hbWUoZmlsZW5hbWUpKTtcbn1cbiIsIi8qXG4gKiBNSVQgTGljZW5zZVxuICpcbiAqIENvcHlyaWdodCAoYykgMjAyNSAgWXVyaWkgWWFrdWJpbiAoeXVyaWkueWFrdWJpbkBnbWFpbC5jb20pXG4gKlxuICogUGVybWlzc2lvbiBpcyBncmFudGVkIHRvIHVzZSwgY29weSwgbW9kaWZ5LCBhbmQgZGlzdHJpYnV0ZSB0aGlzIHNvZnR3YXJlXG4gKiB1bmRlciB0aGUgTUlUIExpY2Vuc2UuIFNlZSBMSUNFTlNFIGZpbGUgZm9yIGRldGFpbHMuXG4gKi9cblxuZXhwb3J0IGludGVyZmFjZSBJTG9nZ2VyIHtcbiAgdHJhY2UobWVzc2FnZT86IGFueSwgLi4ucGFyYW1zOiBhbnlbXSk6IHZvaWQ7XG4gIGRlYnVnKG1lc3NhZ2U/OiBhbnksIC4uLnBhcmFtczogYW55W10pOiB2b2lkO1xuICBpbmZvKG1lc3NhZ2U/OiBhbnksIC4uLnBhcmFtczogYW55W10pOiB2b2lkO1xuICB3YXJuKG1lc3NhZ2U/OiBhbnksIC4uLnBhcmFtczogYW55W10pOiB2b2lkO1xuICBlcnJvcihtZXNzYWdlPzogYW55LCAuLi5wYXJhbXM6IGFueVtdKTogdm9pZDtcbn07XG5cbmV4cG9ydCBmdW5jdGlvbiBjcmVhdGVMb2dnZXIodXJsOiBzdHJpbmcpOiBJTG9nZ2VyIHtcbiAgcmV0dXJuIHtcbiAgICB0cmFjZTogY29uc29sZS50cmFjZS5iaW5kKGNvbnNvbGUpLFxuICAgIGRlYnVnOiBjb25zb2xlLmRlYnVnLmJpbmQoY29uc29sZSksXG4gICAgaW5mbzogY29uc29sZS5pbmZvLmJpbmQoY29uc29sZSksXG4gICAgd2FybjogY29uc29sZS53YXJuLmJpbmQoY29uc29sZSksXG4gICAgZXJyb3I6IGNvbnNvbGUuZXJyb3IuYmluZChjb25zb2xlKSxcbiAgfTtcbn1cbiIsIi8qXG4gKiBNSVQgTGljZW5zZVxuICpcbiAqIENvcHlyaWdodCAoYykgMjAyNSAgWXVyaWkgWWFrdWJpbiAoeXVyaWkueWFrdWJpbkBnbWFpbC5jb20pXG4gKlxuICogUGVybWlzc2lvbiBpcyBncmFudGVkIHRvIHVzZSwgY29weSwgbW9kaWZ5LCBhbmQgZGlzdHJpYnV0ZSB0aGlzIHNvZnR3YXJlXG4gKiB1bmRlciB0aGUgTUlUIExpY2Vuc2UuIFNlZSBMSUNFTlNFIGZpbGUgZm9yIGRldGFpbHMuXG4gKi9cblxuaW1wb3J0IHBhdGggZnJvbSBcIm5vZGU6cGF0aFwiO1xuaW1wb3J0IGZzIGZyb20gXCJub2RlOmZzXCI7XG5pbXBvcnQgeyBzcGF3biB9IGZyb20gXCJub2RlOmNoaWxkX3Byb2Nlc3NcIjtcblxudHlwZSBSZXN1bHQgPSB7XG4gIHN0YXR1czogbnVtYmVyO1xufTtcblxuZXhwb3J0IGZ1bmN0aW9uIHNwYXduQXN5bmMoY29tbWFuZDogc3RyaW5nLCBhcmdzOiBzdHJpbmdbXSwgb3B0aW9ucz86IGFueSk6IFByb21pc2U8UmVzdWx0PiB7XG4gIGxldCBmZCA9IG51bGw7XG4gIGxldCB2ZXJib3NlID0gZmFsc2U7XG4gIGlmIChvcHRpb25zICYmIG9wdGlvbnMuZXh0cmEpIHtcbiAgICBpZiAob3B0aW9ucy5leHRyYS52ZXJib3NlKVxuICAgICAgdmVyYm9zZSA9IHRydWU7XG4gICAgaWYgKG9wdGlvbnMuZXh0cmEub3V0cHV0KSB7XG4gICAgICBsZXQgbG9nZmlsZSA9IG9wdGlvbnMuZXh0cmEub3V0cHV0O1xuICAgICAgaWYgKCFwYXRoLmlzQWJzb2x1dGUobG9nZmlsZSkgJiYgb3B0aW9ucy5jd2QpIHtcbiAgICAgICAgbG9nZmlsZSA9IHBhdGgucmVzb2x2ZShvcHRpb25zLmN3ZCwgbG9nZmlsZSk7XG4gICAgICB9XG4gICAgICBmZCA9IGZzLm9wZW5TeW5jKGxvZ2ZpbGUsIFwidytcIiwgMG82NjYpO1xuICAgIH1cbiAgfVxuICByZXR1cm4gbmV3IFByb21pc2UoKHJlc29sdmUsIHJlamVjdCkgPT4ge1xuICAgIGlmIChmZCB8fCB2ZXJib3NlKSB7XG4gICAgICB2ZXJib3NlICYmIGNvbnNvbGUuaW5mbyhbIHBhdGguYmFzZW5hbWUoY29tbWFuZCksIC4uLmFyZ3MgXS5qb2luKFwiIFwiKSk7XG4gICAgICBmZCAmJiBmcy53cml0ZVN5bmMoZmQsIEpTT04uc3RyaW5naWZ5KHtjb21tYW5kLCBhcmdzLCBvcHRpb25zIH0sIG51bGwsIDIpICsgXCJcXG5cIik7XG4gICAgfVxuICAgIGNvbnN0IGV4ZWMgPSBzcGF3bihjb21tYW5kLCBhcmdzLCBvcHRpb25zKTtcbiAgICBleGVjLnN0ZG91dC5vbihcImRhdGFcIiwgKGRhdGEpID0+IHtcbiAgICAgIHByb2Nlc3Muc3Rkb3V0LndyaXRlKGRhdGEpO1xuICAgICAgZmQgJiYgZnMud3JpdGVTeW5jKGZkLCBkYXRhKTtcbiAgICB9KTtcbiAgICBleGVjLnN0ZGVyci5vbihcImRhdGFcIiwgKGRhdGEpID0+IHtcbiAgICAgIHByb2Nlc3Muc3RkZXJyLndyaXRlKGRhdGEpO1xuICAgICAgZmQgJiYgZnMud3JpdGVTeW5jKGZkLCBkYXRhKTtcbiAgICB9KTtcbiAgICBleGVjLm9uKFwiY2xvc2VcIiwgKHN0YXR1czogbnVtYmVyKSA9PiB7XG4gICAgICBmZCAmJiBmcy5jbG9zZVN5bmMoZmQpO1xuICAgICAgcmVzb2x2ZSh7c3RhdHVzfSk7XG4gICAgfSk7XG4gIH0pO1xufVxuIiwiLypcbiAqIE1JVCBMaWNlbnNlXG4gKlxuICogQ29weXJpZ2h0IChjKSAyMDI1ICBZdXJpaSBZYWt1YmluICh5dXJpaS55YWt1YmluQGdtYWlsLmNvbSlcbiAqXG4gKiBQZXJtaXNzaW9uIGlzIGdyYW50ZWQgdG8gdXNlLCBjb3B5LCBtb2RpZnksIGFuZCBkaXN0cmlidXRlIHRoaXMgc29mdHdhcmVcbiAqIHVuZGVyIHRoZSBNSVQgTGljZW5zZS4gU2VlIExJQ0VOU0UgZmlsZSBmb3IgZGV0YWlscy5cbiAqL1xuXG5pbXBvcnQgZnMgZnJvbSBcIm5vZGU6ZnNcIjtcbmltcG9ydCBwYXRoIGZyb20gXCJub2RlOnBhdGhcIjtcbmltcG9ydCB1cmwgZnJvbSBcIm5vZGU6dXJsXCI7XG5cbmV4cG9ydCBhc3luYyBmdW5jdGlvbiBwYXRoRXhpc3RzKHBhdGg6IHN0cmluZykge1xuICB0cnkge1xuICAgIHJldHVybiAhIShhd2FpdCBmcy5wcm9taXNlcy5zdGF0KHBhdGgpKTtcbiAgfSBjYXRjaCB7XG4gICAgcmV0dXJuIGZhbHNlO1xuICB9XG59XG5cbmV4cG9ydCBmdW5jdGlvbiBwYXRoRXhpc3RzU3luYyhwYXRoOiBzdHJpbmcpIHtcbiAgdHJ5IHtcbiAgICByZXR1cm4gISFmcy5zdGF0U3luYyhwYXRoKTtcbiAgfSBjYXRjaCB7XG4gICAgcmV0dXJuIGZhbHNlO1xuICB9XG59XG5cbmV4cG9ydCBhc3luYyBmdW5jdGlvbiBmaWxlRXhpc3RzKHBhdGg6IHN0cmluZykge1xuICB0cnkge1xuICAgIHJldHVybiAoYXdhaXQgZnMucHJvbWlzZXMuc3RhdChwYXRoKSkuaXNGaWxlKCk7XG4gIH0gY2F0Y2gge1xuICAgIHJldHVybiBmYWxzZTtcbiAgfVxufVxuXG5leHBvcnQgZnVuY3Rpb24gZmlsZUV4aXN0c1N5bmMocGF0aDogc3RyaW5nKSB7XG4gIHRyeSB7XG4gICAgcmV0dXJuIGZzLnN0YXRTeW5jKHBhdGgpLmlzRmlsZSgpO1xuICB9IGNhdGNoIHtcbiAgICByZXR1cm4gZmFsc2U7XG4gIH0gXG59XG5cbmV4cG9ydCBhc3luYyBmdW5jdGlvbiBkaXJlY3RvcnlFeGlzdHMocGF0aDogc3RyaW5nKSB7XG4gIHRyeSB7XG4gICAgcmV0dXJuIChhd2FpdCBmcy5wcm9taXNlcy5zdGF0KHBhdGgpKS5pc0RpcmVjdG9yeSgpO1xuICB9IGNhdGNoIHtcbiAgICByZXR1cm4gZmFsc2U7XG4gIH1cbn1cblxuZXhwb3J0IGZ1bmN0aW9uIGRpcmVjdG9yeUV4aXN0c1N5bmMocGF0aDogc3RyaW5nKSB7XG4gIHRyeSB7XG4gICByZXR1cm4gZnMuc3RhdFN5bmMocGF0aCkuaXNEaXJlY3RvcnkoKTtcbiAgfSBjYXRjaCB7XG4gICAgcmV0dXJuIGZhbHNlO1xuICB9XG59XG5cbmV4cG9ydCBmdW5jdGlvbiBleHRuYW1lKGZ1bGxwYXRoOiBzdHJpbmcsIG9wdGlvbnM6IGFueSkge1xuICBpZiAob3B0aW9ucz8ubG9uZ2VzdCkge1xuICAgIGNvbnN0IGZpbGVuYW1lID0gcGF0aC5iYXNlbmFtZShmdWxscGF0aCk7XG4gICAgY29uc3QgaW5kZXggPSBmaWxlbmFtZS5pbmRleE9mKCcuJyk7XG4gICAgcmV0dXJuIGluZGV4ICE9IC0xID8gZmlsZW5hbWUuc3Vic3RyaW5nKGluZGV4KSA6ICcnO1xuICB9XG5cbiAgcmV0dXJuIHBhdGguZXh0bmFtZShmdWxscGF0aCk7XG59XG5cbmV4cG9ydCBhc3luYyBmdW5jdGlvbiBmaWxlTGlzdChkaXJuYW1lOiBzdHJpbmcsIG9wdGlvbnM6IGFueSk6IFByb21pc2U8QXJyYXk8c3RyaW5nPj4ge1xuICBjb25zdCBsaXN0ID0gbmV3IEFycmF5PHN0cmluZz47XG4gIGlmIChhd2FpdCBkaXJlY3RvcnlFeGlzdHMoZGlybmFtZSkpIHtcbiAgICBmb3IgKGNvbnN0IGl0ZXIgb2YgYXdhaXQgZnMucHJvbWlzZXMucmVhZGRpcihkaXJuYW1lKSkge1xuICAgICAgY29uc3QgZmlsZXBhdGggPSBwYXRoLnJlc29sdmUoZGlybmFtZSwgaXRlcik7XG4gICAgICBjb25zdCBzdGF0ID0gYXdhaXQgZnMucHJvbWlzZXMuc3RhdChmaWxlcGF0aCk7XG4gICAgICBpZiAoc3RhdC5pc0ZpbGUoKSkge1xuICAgICAgICBsaXN0LnB1c2gob3B0aW9ucy5yZWxhdGl2ZSA/IHBhdGgucmVsYXRpdmUob3B0aW9ucy5yZWxhdGl2ZSwgZmlsZXBhdGgpIDogZmlsZXBhdGgpO1xuICAgICAgfVxuICAgICAgZWxzZSBpZiAob3B0aW9ucy5yZWN1cnNpdmUgJiYgc3RhdC5pc0RpcmVjdG9yeSgpKSB7XG4gICAgICAgIGZvciAoY29uc3QgZm5hbWUgb2YgYXdhaXQgZmlsZUxpc3QoZmlsZXBhdGgsIG9wdGlvbnMpKVxuICAgICAgICAgIGxpc3QucHVzaChmbmFtZSk7XG4gICAgICB9XG4gICAgfVxuICB9XG4gIHJldHVybiBsaXN0O1xufVxuXG5leHBvcnQgYXN5bmMgZnVuY3Rpb24gc2F2ZUlmRGlmZmVyZW50KGZpbGVuYW1lOiBzdHJpbmcsIGNvbnRlbnQ6IHN0cmluZykge1xuICBpZiAoYXdhaXQgZmlsZUV4aXN0cyhmaWxlbmFtZSkpIHtcbiAgICBjb25zdCBvbGRDb250ZW50ID0gYXdhaXQgZnMucHJvbWlzZXMucmVhZEZpbGUoZmlsZW5hbWUsIHsgZW5jb2Rpbmc6IFwidXRmOFwiIH0pO1xuICAgIGlmIChjb250ZW50ID09IG9sZENvbnRlbnQpXG4gICAgICByZXR1cm4gZmFsc2U7XG4gIH1cblxuICBhd2FpdCBmcy5wcm9taXNlcy5ta2RpcihwYXRoLmRpcm5hbWUoZmlsZW5hbWUpLCB7IHJlY3Vyc2l2ZTogdHJ1ZSB9KTtcbiAgYXdhaXQgZnMucHJvbWlzZXMud3JpdGVGaWxlKGZpbGVuYW1lLCBjb250ZW50LCB7IGVuY29kaW5nOiBcInV0ZjhcIiB9KTtcblxuICByZXR1cm4gdHJ1ZTtcbn1cblxuZXhwb3J0IGZ1bmN0aW9uIGdldFBhdGhTdHJpbmcoc3RyOiBzdHJpbmcpIHtcbiAgcmV0dXJuIHN0ci5zdGFydHNXaXRoKFwiZmlsZTovL1wiKSA/IHVybC5maWxlVVJMVG9QYXRoKHN0cikgOiBzdHI7XG59XG4iLCIvKlxuICogTUlUIExpY2Vuc2VcbiAqXG4gKiBDb3B5cmlnaHQgKGMpIDIwMjUgIFl1cmlpIFlha3ViaW4gKHl1cmlpLnlha3ViaW5AZ21haWwuY29tKVxuICpcbiAqIFBlcm1pc3Npb24gaXMgZ3JhbnRlZCB0byB1c2UsIGNvcHksIG1vZGlmeSwgYW5kIGRpc3RyaWJ1dGUgdGhpcyBzb2Z0d2FyZVxuICogdW5kZXIgdGhlIE1JVCBMaWNlbnNlLiBTZWUgTElDRU5TRSBmaWxlIGZvciBkZXRhaWxzLlxuICovXG5cbmltcG9ydCBwYXRoIGZyb20gXCJub2RlOnBhdGhcIjtcbmltcG9ydCBmcyBmcm9tIFwibm9kZTpmc1wiO1xuaW1wb3J0IGh0dHAgZnJvbSBcImh0dHBcIjtcbmltcG9ydCBodHRwcyBmcm9tIFwiaHR0cHNcIjtcblxuaW1wb3J0IHsgY3JlYXRlTG9nZ2VyIH0gZnJvbSBcIkAvbG9nZ2VyXCI7XG5cbmNvbnN0IGxvZ2dlciA9IGNyZWF0ZUxvZ2dlcihpbXBvcnQubWV0YS51cmwpO1xuXG5jb25zdCBodHRwT3B0aW9ucyA9IHtcbiAgbWV0aG9kOiAnR0VUJyxcbiAgdGltZW91dDogNTAwMCxcbiAgaGVhZGVyczoge1xuICAgIFwiVXNlci1BZ2VudFwiOiBQUk9KRUNUX05BTUUgKyBcIi9cIiArIFBST0pFQ1RfVkVSU0lPTixcbiAgICBcIkFjY2VwdFwiOiBcIiovKlwiLFxuICB9LFxufTtcblxuZnVuY3Rpb24gaHR0cFJlcXVlc3QodXJsOiBzdHJpbmcsIG9wdGlvbnM6IGh0dHAuUmVxdWVzdE9wdGlvbnMgfCBodHRwcy5SZXF1ZXN0T3B0aW9ucywgY2FsbGJhY2s6IGFueSkge1xuICBpZiAodXJsLnN0YXJ0c1dpdGgoXCJodHRwczovL1wiKSlcbiAgICByZXR1cm4gaHR0cHMucmVxdWVzdCh1cmwsIG9wdGlvbnMsIGNhbGxiYWNrKTtcbiAgcmV0dXJuIGh0dHAucmVxdWVzdCh1cmwsIG9wdGlvbnMsIGNhbGxiYWNrKTtcbn07XG5cbmV4cG9ydCBmdW5jdGlvbiByZXF1ZXN0R2V0KHVybDogc3RyaW5nKTogUHJvbWlzZTxCdWZmZXI+IHtcbiAgcmV0dXJuIG5ldyBQcm9taXNlKChyZXNvbHZlLCByZWplY3QpID0+IHtcblxuICAgIGNvbnN0IG9uRXJyb3IgPSAoZXJyOiBhbnkpID0+IHtcbiAgICAgIGNvbnN0IG1lc3NhZ2UgPSBcIkVuY291bnRlcmVkIGFuIGVycm9yIHRyeWluZyB0byBtYWtlIGEgcmVxdWVzdDogXCIgKyBlcnIubWVzc2FnZTtcbiAgICAgIGxvZ2dlci5lcnJvcihtZXNzYWdlLCBlcnIpO1xuICAgICAgcmVqZWN0KG1lc3NhZ2UpO1xuICAgIH07XG5cbiAgICBjb25zdCBvblRpbWVvdXQgPSAocmVxdWVzdDogYW55KSA9PiB7XG4gICAgICByZXF1ZXN0LmRlc3Ryb3koKTtcbiAgICAgIGxvZ2dlci5lcnJvcihcIiAgVGltZW91dFwiLCB1cmwpO1xuICAgICAgcmVqZWN0KFwiVGltZW91dFwiKTtcbiAgICB9XG5cbiAgICBjb25zdCBvblJlcXVlc3QgPSAocmVzcG9uc2U6IGFueSkgPT4ge1xuICAgICAgc3dpdGNoIChyZXNwb25zZS5zdGF0dXNDb2RlKSB7XG4gICAgICBjYXNlIDIwMDpcbiAgICAgICAgY29uc3QgY2h1bmtzOiBBcnJheTxCdWZmZXI+ID0gW107XG4gICAgICAgIHJlc3BvbnNlLm9uKFwiZGF0YVwiLCAoY2h1bms6IEJ1ZmZlcikgPT4gY2h1bmtzLnB1c2goY2h1bmspKTtcbiAgICAgICAgcmVzcG9uc2Uub24oXCJlbmRcIiwgKCkgPT4gcmVzb2x2ZShCdWZmZXIuY29uY2F0KGNodW5rcykpKTtcbiAgICAgICAgcmVzcG9uc2Uub24oJ2Nsb3NlJywgKCkgPT4gbG9nZ2VyLmluZm8oJyAgQ2xvc2UnKSk7XG4gICAgICAgIGJyZWFrO1xuXG4gICAgICBjYXNlIDMwMTpcbiAgICAgIGNhc2UgMzAyOlxuICAgICAgICByZXNwb25zZS5yZXN1bWUoKTtcbiAgICAgICAgbG9nZ2VyLmluZm8oYFJlZGlyZWN0IHRvICR7cmVzcG9uc2UuaGVhZGVycy5sb2NhdGlvbn1gKTtcbiAgICAgICAgY29uc3QgcmVxdWVzdCA9IGh0dHBSZXF1ZXN0KHJlc3BvbnNlLmhlYWRlcnMubG9jYXRpb24sIGh0dHBPcHRpb25zLCBvblJlcXVlc3QpO1xuICAgICAgICByZXF1ZXN0Lm9uKCd0aW1lb3V0Jywgb25UaW1lb3V0LmJpbmQobnVsbCwgcmVxdWVzdCkpO1xuICAgICAgICByZXF1ZXN0Lm9uKCdlcnJvcicsIG9uRXJyb3IpO1xuICAgICAgICByZXF1ZXN0LmVuZCgpO1xuICAgICAgICBicmVhaztcblxuICAgICAgZGVmYXVsdDpcbiAgICAgICAgcmVzcG9uc2UucmVzdW1lKCk7XG4gICAgICAgIGNvbnN0IG1lc3NhZ2UgPSBcIkRpZCBub3QgZ2V0IGFuIE9LIGZyb20gdGhlIHNlcnZlci4gQ29kZTogXCIgKyByZXNwb25zZS5zdGF0dXNDb2RlO1xuICAgICAgICBsb2dnZXIuZXJyb3IobWVzc2FnZSk7XG4gICAgICAgIHJlamVjdChtZXNzYWdlKTtcbiAgICAgICAgYnJlYWs7XG4gICAgICB9XG4gICAgfTtcblxuICAgIGxvZ2dlci5pbmZvKGB3Z2V0ICR7dXJsfWApO1xuICAgIGNvbnN0IHJlcXVlc3QgPSBodHRwUmVxdWVzdCh1cmwsIGh0dHBPcHRpb25zLCBvblJlcXVlc3QpO1xuICAgIHJlcXVlc3Qub24oJ3RpbWVvdXQnLCBvblRpbWVvdXQuYmluZChudWxsLCByZXF1ZXN0KSk7XG4gICAgcmVxdWVzdC5vbignZXJyb3InLCBvbkVycm9yKTtcbiAgICByZXF1ZXN0LmVuZCgpO1xuICB9KTtcbn07XG5cbmV4cG9ydCBmdW5jdGlvbiBkb3dubG9hZEZpbGUodXJsOiBzdHJpbmcsIGZpbGU6IHN0cmluZykge1xuICByZXR1cm4gbmV3IFByb21pc2UoKHJlc29sdmUsIHJlamVjdCkgPT4ge1xuICAgIGNvbnN0IGZpbGVuYW1lID0gcGF0aC5iYXNlbmFtZSh1cmwpO1xuXG4gICAgY29uc3QgY2xpZW50ID0gKCgpID0+IHtcbiAgICAgIGlmIChmaWxlKSB7XG4gICAgICAgIGNvbnN0IGZkID0gZnMub3BlblN5bmMoZmlsZSwgXCJ3XCIpO1xuICAgICAgICByZXR1cm4ge1xuICAgICAgICAgIG9uRGF0YTogKGNodW5rOiBCdWZmZXIpID0+IHtcbiAgICAgICAgICAgIGZzLndyaXRlU3luYyhmZCwgY2h1bmspO1xuICAgICAgICAgIH0sXG4gICAgICAgICAgb25FbmQ6ICgpID0+IHtcbiAgICAgICAgICAgIGZzLmNsb3NlU3luYyhmZCk7XG4gICAgICAgICAgICByZXNvbHZlKHVuZGVmaW5lZCk7XG4gICAgICAgICAgfSxcbiAgICAgICAgfTtcbiAgICAgIH1cbiAgICAgIGVsc2Uge1xuICAgICAgICBjb25zdCBjaHVua3M6IEFycmF5PEJ1ZmZlcj4gPSBbXTtcbiAgICAgICAgcmV0dXJuIHtcbiAgICAgICAgICBvbkRhdGE6IChjaHVuazogQnVmZmVyKSA9PiB7XG4gICAgICAgICAgICBjaHVua3MucHVzaChjaHVuayk7XG4gICAgICAgICAgfSxcbiAgICAgICAgICBvbkVuZDogKCkgPT4ge1xuICAgICAgICAgICAgcmVzb2x2ZShCdWZmZXIuY29uY2F0KGNodW5rcykpO1xuICAgICAgICAgIH0sXG4gICAgICAgIH07XG4gICAgICB9XG4gICAgfSkoKTtcbiAgXG4gICAgY29uc3Qgc3RhcnRSZXF1ZXN0ID0gKHVybDogc3RyaW5nLCBjYWxsYmFjazogYW55KSA9PiB7XG4gICAgICBjb25zdCByZXF1ZXN0ID0gaHR0cHMucmVxdWVzdCh1cmwsIGh0dHBPcHRpb25zLCBjYWxsYmFjayk7XG4gICAgICBpZiAocmVxdWVzdCkge1xuICAgICAgICByZXF1ZXN0Lm9uKCdlcnJvcicsIChlcnJvcikgPT4gcmVqZWN0KGVycm9yKSk7XG4gICAgICAgIHJlcXVlc3QuZW5kKCk7IFxuICAgICAgfVxuICAgICAgZWxzZSB7XG4gICAgICAgIHJlamVjdChgVXJsIHNjaGVtZSBub3Qgc3VwcG9ydGVkIGZvciAke3VybH1gKTtcbiAgICAgIH1cbiAgICB9O1xuXG4gICAgY29uc3Qgb25SZXF1ZXN0ID0gKHJlc3BvbnNlOiBhbnkpID0+IHtcbiAgICAgIHN3aXRjaCAocmVzcG9uc2Uuc3RhdHVzQ29kZSkge1xuICAgICAgY2FzZSAyMDA6XG4gICAgICAgIGxvZ2dlci5pbmZvKGBDb25uY3RlZCB0byAke3Jlc3BvbnNlLnJlcS5ob3N0fWApO1xuICAgICAgICBsb2dnZXIuaW5mbyhgRG93bmxvYWRpbmcgJHtmaWxlbmFtZX1gKTtcbiAgICAgICAgcmVzcG9uc2Uub24oJ2RhdGEnLCBjbGllbnQub25EYXRhKTtcbiAgICAgICAgcmVzcG9uc2Uub24oJ2VuZCcsIGNsaWVudC5vbkVuZCk7XG4gICAgICAgIHJlc3BvbnNlLm9uKCdjbG9zZScsICgpID0+IGxvZ2dlci5pbmZvKGBEb25lYCkpO1xuICAgICAgICBicmVhaztcblxuICAgICAgY2FzZSAzMDE6XG4gICAgICBjYXNlIDMwMjpcbiAgICAgICAgcmVzcG9uc2UucmVzdW1lKCk7XG4gICAgICAgIGxvZ2dlci5pbmZvKGBSZXNvbHZpbmcgJHtyZXNwb25zZS5oZWFkZXJzLmxvY2F0aW9ufWApO1xuICAgICAgICBzdGFydFJlcXVlc3QocmVzcG9uc2UuaGVhZGVycy5sb2NhdGlvbiwgb25SZXF1ZXN0KTtcbiAgICAgICAgYnJlYWs7XG5cbiAgICAgIGRlZmF1bHQ6XG4gICAgICAgIHJlc3BvbnNlLnJlc3VtZSgpO1xuICAgICAgICByZWplY3QoYERpZCBub3QgZ2V0IGFuIE9LIGZyb20gdGhlIHNlcnZlci4gQ29kZTogJHtyZXNwb25zZS5zdGF0dXNDb2RlfWApO1xuICAgICAgICBicmVhaztcbiAgICAgIH1cbiAgICB9O1xuXG4gICAgbG9nZ2VyLmluZm8oYFJlcXVlc3QgdG8gJHt1cmx9YCk7XG4gICAgc3RhcnRSZXF1ZXN0KHVybCwgb25SZXF1ZXN0KTtcbiAgfSk7XG59XG4iLCIvKlxuICogTUlUIExpY2Vuc2VcbiAqXG4gKiBDb3B5cmlnaHQgKGMpIDIwMjUgIFl1cmlpIFlha3ViaW4gKHl1cmlpLnlha3ViaW5AZ21haWwuY29tKVxuICpcbiAqIFBlcm1pc3Npb24gaXMgZ3JhbnRlZCB0byB1c2UsIGNvcHksIG1vZGlmeSwgYW5kIGRpc3RyaWJ1dGUgdGhpcyBzb2Z0d2FyZVxuICogdW5kZXIgdGhlIE1JVCBMaWNlbnNlLiBTZWUgTElDRU5TRSBmaWxlIGZvciBkZXRhaWxzLlxuICovXG5cbmV4cG9ydCBjb25zdCBpbXBvcnRNb2R1bGUgPSBhc3luYyAobmFtZSkgPT4gaW1wb3J0KC8qIHdlYnBhY2tJZ25vcmU6IHRydWUgKi8gbmFtZSk7XG4iLCJpbXBvcnQgZnMgZnJvbSBcIm5vZGU6ZnNcIjtcbmltcG9ydCBwYXRoIGZyb20gXCJub2RlOnBhdGhcIjtcblxuaW1wb3J0IHsgZmlsZUxpc3QgfSBmcm9tIFwiQC91dGlscy9GaWxlU3lzdGVtXCI7XG5pbXBvcnQgeyBjcmVhdGVMb2dnZXIgfSBmcm9tIFwiQC9sb2dnZXJcIjtcblxuY29uc3QgbG9nZ2VyID0gY3JlYXRlTG9nZ2VyKGltcG9ydC5tZXRhLnVybCk7XG5cbmV4cG9ydCBhc3luYyBmdW5jdGlvbiBtYWtlUGF0Y2goc3JjRGlyOiBzdHJpbmcsIGRlc3REaXI6IHN0cmluZykge1xuICBsb2dnZXIuaW5mbyhgTWFrZSBwYXRjaCAke3NyY0Rpcn0gdG8gJHtkZXN0RGlyfWApO1xuICBjb25zdCBsaXN0ID0gYXdhaXQgZmlsZUxpc3Qoc3JjRGlyLCB7IHJlbGF0aXZlOiBzcmNEaXIsIHJlY3Vyc2l2ZTogdHJ1ZSB9KTtcbiAgZm9yIChjb25zdCBpdGVyIG9mIGxpc3QpIHtcbiAgICBjb25zdCBzb3VyY2UgPSBwYXRoLnJlc29sdmUoc3JjRGlyLCBpdGVyKTtcbiAgICBjb25zdCBkZXN0aW5hdGlvbiA9IHBhdGgucmVzb2x2ZShkZXN0RGlyLCBpdGVyKTtcbiAgICBhd2FpdCBmcy5wcm9taXNlcy5jcChzb3VyY2UsIGRlc3RpbmF0aW9uLCB7IGZvcmNlOiB0cnVlIH0pO1xuICAgIGxvZ2dlci5pbmZvKGAgUmVwbGFjZWQgJHtpdGVyfWApO1xuICB9XG59XG4iLCIvKlxuICogTUlUIExpY2Vuc2VcbiAqXG4gKiBDb3B5cmlnaHQgKGMpIDIwMjUgIFl1cmlpIFlha3ViaW4gKHl1cmlpLnlha3ViaW5AZ21haWwuY29tKVxuICpcbiAqIFBlcm1pc3Npb24gaXMgZ3JhbnRlZCB0byB1c2UsIGNvcHksIG1vZGlmeSwgYW5kIGRpc3RyaWJ1dGUgdGhpcyBzb2Z0d2FyZVxuICogdW5kZXIgdGhlIE1JVCBMaWNlbnNlLiBTZWUgTElDRU5TRSBmaWxlIGZvciBkZXRhaWxzLlxuICovXG5cbmNvbnN0IHJlcXVpcmVJbXBsID0gZXZhbChcInJlcXVpcmVcIik7XG5cbmV4cG9ydCBmdW5jdGlvbiByZXF1aXJlUmVzb2x2ZShuYW1lOiBzdHJpbmcpIHtcbiAgaWYgKHR5cGVvZiBpbXBvcnQubWV0YS5yZXNvbHZlID09PSAnZnVuY3Rpb24nKVxuICAgIHJldHVybiBpbXBvcnQubWV0YS5yZXNvbHZlKG5hbWUpO1xuICBpZiAodHlwZW9mIHJlcXVpcmVJbXBsICE9PSAndW5kZWZpbmVkJylcbiAgICByZXR1cm4gcmVxdWlyZUltcGwucmVzb2x2ZShuYW1lKTtcbiAgdGhyb3cgbmV3IEVycm9yKFwiTm8gY29tcGF0aWJsZSBtb2R1bGUgcmVzb2x2ZXIgZm91bmRcIik7XG59XG5cbmV4cG9ydCB7IGltcG9ydE1vZHVsZSB9IGZyb20gXCIuL0ltcG9ydE1vZHVsZS5tanNcIjtcbiIsIi8qXG4gKiBNSVQgTGljZW5zZVxuICpcbiAqIENvcHlyaWdodCAoYykgMjAyNSAgWXVyaWkgWWFrdWJpbiAoeXVyaWkueWFrdWJpbkBnbWFpbC5jb20pXG4gKlxuICogUGVybWlzc2lvbiBpcyBncmFudGVkIHRvIHVzZSwgY29weSwgbW9kaWZ5LCBhbmQgZGlzdHJpYnV0ZSB0aGlzIHNvZnR3YXJlXG4gKiB1bmRlciB0aGUgTUlUIExpY2Vuc2UuIFNlZSBMSUNFTlNFIGZpbGUgZm9yIGRldGFpbHMuXG4gKi9cblxuZXhwb3J0IGZ1bmN0aW9uIGVxdWFsVmFsdWUoYTogYW55LCBiOiBhbnkpOiBib29sZWFuIHtcbiAgaWYgKGEgPT09IGIpXG4gICAgcmV0dXJuIHRydWU7XG5cbiAgaWYgKGEgPT09IHVuZGVmaW5lZCB8fCBiID09PSB1bmRlZmluZWQpXG4gICAgcmV0dXJuIGZhbHNlO1xuXG4gIGlmICh0eXBlb2YgYSAhPT0gXCJvYmplY3RcIiB8fCB0eXBlb2YgYiAhPT0gXCJvYmplY3RcIilcbiAgICByZXR1cm4gZmFsc2U7XG5cbiAgY29uc3QgazEgPSBPYmplY3Qua2V5cyhhKTtcbiAgY29uc3QgazIgPSBPYmplY3Qua2V5cyhiKTtcblxuICBpZiAoazEubGVuZ3RoICE9IGsyLmxlbmd0aClcbiAgICByZXR1cm4gZmFsc2U7XG5cbiAgZm9yIChjb25zdCBrZXkgb2YgazEpIHtcbiAgICBpZiAoIU9iamVjdC5oYXNPd24oYiwga2V5KSB8fCAhZXF1YWxWYWx1ZShhW2tleV0sIGJba2V5XSkpXG4gICAgICByZXR1cm4gZmFsc2U7XG4gIH1cblxuICByZXR1cm4gdHJ1ZTtcbn1cblxuZXhwb3J0IGZ1bmN0aW9uIGNvcHlWYWx1ZShvOiBhbnkpOiBhbnkge1xuICBpZiAoIW8gfHwgdHlwZW9mIG8gIT09IFwib2JqZWN0XCIpXG4gICAgcmV0dXJuIG87XG4gIGlmIChBcnJheS5pc0FycmF5KG8pKSB7XG4gICAgY29uc3QgcmVzdWx0ID0gW107XG4gICAgZm9yIChjb25zdCBpdGVyIG9mIG8pXG4gICAgICByZXN1bHQucHVzaChjb3B5VmFsdWUoaXRlcikpO1xuICAgIHJldHVybiByZXN1bHQ7XG4gIH1cbiAgZWxzZSB7XG4gICAgY29uc3QgcmVzdWx0ID0ge30gYXMgYW55O1xuICAgIGZvciAoY29uc3QgW2tleSx2YWxdIG9mIE9iamVjdC5lbnRyaWVzKG8pKVxuICAgICAgcmVzdWx0W2tleV0gPSBjb3B5VmFsdWUodmFsKTtcbiAgICByZXR1cm4gcmVzdWx0O1xuICB9XG59XG5cbmV4cG9ydCBmdW5jdGlvbiBhc3NpZ25PYmplY3QodGFyZ2V0OiBhbnksIHNvdXJjZTogYW55KSB7XG4gIGlmIChBcnJheS5pc0FycmF5KHRhcmdldCkgJiYgQXJyYXkuaXNBcnJheShzb3VyY2UpKSB7XG4gICAgZm9yIChjb25zdCBpdGVyIG9mIHNvdXJjZSlcbiAgICAgIHRhcmdldC5wdXNoKGl0ZXIpO1xuICB9XG4gIGVsc2Uge1xuICAgIGZvciAoY29uc3Qga2V5IG9mIE9iamVjdC5rZXlzKHNvdXJjZSkpIHtcbiAgICAgIGNvbnN0IGEgPSB0YXJnZXRba2V5XSwgYiA9IHNvdXJjZVtrZXldO1xuICAgICAgaWYgKGEgJiYgdHlwZW9mIGEgPT09IFwib2JqZWN0XCIgJiYgYiAmJiB0eXBlb2YgYiA9PT0gXCJvYmplY3RcIilcbiAgICAgICAgYXNzaWduT2JqZWN0KGEsIGIpO1xuICAgICAgZWxzZVxuICAgICAgICB0YXJnZXRba2V5XSA9IGNvcHlWYWx1ZShiKTtcbiAgICB9XG4gIH1cbn1cblxuZXhwb3J0IGZ1bmN0aW9uIGFycmF5V3JhcHBlcih2YWx1ZTogYW55KSB7XG4gIGlmICh2YWx1ZSA9PT0gdW5kZWZpbmVkIHx8IEFycmF5LmlzQXJyYXkodmFsdWUpKVxuICAgIHJldHVybiB2YWx1ZTtcbiAgcmV0dXJuIFsgdmFsdWUgXTtcbn1cbiIsIi8qXG4gKiBNSVQgTGljZW5zZVxuICpcbiAqIENvcHlyaWdodCAoYykgMjAyNSAgWXVyaWkgWWFrdWJpbiAoeXVyaWkueWFrdWJpbkBnbWFpbC5jb20pXG4gKlxuICogUGVybWlzc2lvbiBpcyBncmFudGVkIHRvIHVzZSwgY29weSwgbW9kaWZ5LCBhbmQgZGlzdHJpYnV0ZSB0aGlzIHNvZnR3YXJlXG4gKiB1bmRlciB0aGUgTUlUIExpY2Vuc2UuIFNlZSBMSUNFTlNFIGZpbGUgZm9yIGRldGFpbHMuXG4gKi9cblxuaW1wb3J0IGZzIGZyb20gXCJub2RlOmZzXCI7XG5cbmV4cG9ydCBjbGFzcyBTZXR0aW5nc1N0b3JhZ2Uge1xuICBwcml2YXRlIF9maWxlbmFtZTogc3RyaW5nO1xuICBwcml2YXRlIF9zZXR0aW5nczogYW55O1xuICBwcml2YXRlIF9jdXJyZW50OiBhbnk7XG5cbiAgY29uc3RydWN0b3IoZmlsZW5hbWU6IHN0cmluZykge1xuICAgIHRoaXMuX2ZpbGVuYW1lID0gZmlsZW5hbWU7XG4gIH1cblxuICBwdWJsaWMgYXN5bmMgcHVzaChuYW1lOiBzdHJpbmcpIHtcbiAgICBpZiAoIXRoaXMuX3NldHRpbmdzKVxuICAgICAgYXdhaXQgdGhpcy5sb2FkKCk7XG4gICAgbGV0IG9iamVjdCA9IHRoaXMuX2N1cnJlbnQub2JqZWN0W25hbWVdO1xuICAgIGlmICghb2JqZWN0KVxuICAgICAgb2JqZWN0ID0gdGhpcy5fY3VycmVudC5vYmplY3RbbmFtZV0gPSB7fTtcbiAgICB0aGlzLl9jdXJyZW50ID0geyBwYXJlbnQ6IHRoaXMuX2N1cnJlbnQsIG9iamVjdCB9O1xuICB9XG5cbiAgcHVibGljIGFzeW5jIHBvcCgpIHtcbiAgICBpZiAoIXRoaXMuX3NldHRpbmdzKVxuICAgICAgYXdhaXQgdGhpcy5sb2FkKCk7XG4gICAgY29uc29sZS5hc3NlcnQodGhpcy5fY3VycmVudC5wYXJlbnQpO1xuICAgIHRoaXMuX2N1cnJlbnQgPSB0aGlzLl9jdXJyZW50LnBhcmVudDtcbiAgfVxuXG4gIHB1YmxpYyBhc3luYyBnZXQobmFtZTogc3RyaW5nKSB7XG4gICAgaWYgKCF0aGlzLl9zZXR0aW5ncylcbiAgICAgIGF3YWl0IHRoaXMubG9hZCgpO1xuICAgIHJldHVybiB0aGlzLl9jdXJyZW50Lm9iamVjdFtuYW1lXTtcbiAgfVxuXG4gIHB1YmxpYyBhc3luYyBzZXQobmFtZTogc3RyaW5nLCB2YWx1ZTogYW55KSB7XG4gICAgaWYgKCF0aGlzLl9zZXR0aW5ncylcbiAgICAgIGF3YWl0IHRoaXMubG9hZCgpO1xuICAgIHRoaXMuX2N1cnJlbnQub2JqZWN0W25hbWVdID0gdmFsdWU7XG4gICAgYXdhaXQgdGhpcy5zYXZlKCk7XG4gIH1cblxuICBwdWJsaWMgYXN5bmMgbG9hZCgpIHtcbiAgICB0cnkge1xuICAgICAgY29uc3QgY29udGVudCA9IGF3YWl0IGZzLnByb21pc2VzLnJlYWRGaWxlKHRoaXMuX2ZpbGVuYW1lLCBcInV0Zi04XCIpO1xuICAgICAgdGhpcy5fc2V0dGluZ3MgPSBKU09OLnBhcnNlKGNvbnRlbnQpO1xuICAgIH1cbiAgICBjYXRjaCAoZSkge1xuICAgICAgdGhpcy5fc2V0dGluZ3MgPSB7fTtcbiAgICB9XG4gICAgdGhpcy5fY3VycmVudCA9XG4gICAge1xuICAgICAgcGFyZW50OiBudWxsLFxuICAgICAgb2JqZWN0OiB0aGlzLl9zZXR0aW5ncyxcbiAgICB9O1xuICB9XG5cbiAgcHVibGljIGFzeW5jIHNhdmUoKSB7XG4gICAgY29uc3Qgc3BhY2UgPSAyO1xuICAgIGNvbnN0IGNvbnRlbnQgPSBKU09OLnN0cmluZ2lmeSh0aGlzLl9zZXR0aW5ncywgdW5kZWZpbmVkLCBzcGFjZSk7XG4gICAgYXdhaXQgZnMucHJvbWlzZXMud3JpdGVGaWxlKHRoaXMuX2ZpbGVuYW1lLCBjb250ZW50LCB7IGVuY29kaW5nOiBcInV0Zi04XCIsIGZsYWc6IFwid1wiLCBmbHVzaDogdHJ1ZSB9KTtcbiAgfVxufTtcbiIsIi8qXG4gKiBNSVQgTGljZW5zZVxuICpcbiAqIENvcHlyaWdodCAoYykgMjAyNSAgWXVyaWkgWWFrdWJpbiAoeXVyaWkueWFrdWJpbkBnbWFpbC5jb20pXG4gKlxuICogUGVybWlzc2lvbiBpcyBncmFudGVkIHRvIHVzZSwgY29weSwgbW9kaWZ5LCBhbmQgZGlzdHJpYnV0ZSB0aGlzIHNvZnR3YXJlXG4gKiB1bmRlciB0aGUgTUlUIExpY2Vuc2UuIFNlZSBMSUNFTlNFIGZpbGUgZm9yIGRldGFpbHMuXG4gKi9cblxuZXhwb3J0IGZ1bmN0aW9uIGVuc3VyZUJvb2xlYW4odmFsdWU6IGFueSkge1xuICBpZiAodHlwZW9mIHZhbHVlID09PSBcImJvb2xlYW5cIilcbiAgICByZXR1cm4gdmFsdWU7XG4gIHRocm93IG5ldyBFcnJvcihgVGhlICcke3ZhbHVlfScgaXMgbm90IGEgYm9vbGVhbmApO1xufVxuXG5leHBvcnQgZnVuY3Rpb24gZW5zdXJlTnVtYmVyKHZhbHVlOiBhbnkpIHtcbiAgaWYgKHR5cGVvZiB2YWx1ZSA9PT0gXCJudW1iZXJcIilcbiAgICByZXR1cm4gdmFsdWU7XG4gIHRocm93IG5ldyBFcnJvcihgVGhlICcke3ZhbHVlfScgaXMgbm90IGEgc3RyaW5nYCk7XG59XG5cbmV4cG9ydCBmdW5jdGlvbiBlbnN1cmVTdHJpbmcodmFsdWU6IGFueSkge1xuICBpZiAodHlwZW9mIHZhbHVlID09PSBcInN0cmluZ1wiKVxuICAgIHJldHVybiB2YWx1ZTtcbiAgdGhyb3cgbmV3IEVycm9yKGBUaGUgJyR7dmFsdWV9JyBpcyBub3QgYSBzdHJpbmdgKTtcbn1cblxuZXhwb3J0IGZ1bmN0aW9uIGVuc3VyZUFycmF5KHZhbHVlOiBhbnkpIHtcbiAgaWYgKEFycmF5LmlzQXJyYXkodmFsdWUpKVxuICAgIHJldHVybiBBcnJheS5mcm9tKHZhbHVlKTtcbiAgdGhyb3cgbmV3IEVycm9yKGBUaGUgJyR7dmFsdWV9JyBpcyBub3QgYSBhcnJheWApO1xufVxuIiwibW9kdWxlLmV4cG9ydHMgPSByZXF1aXJlKFwiaHR0cFwiKTsiLCJtb2R1bGUuZXhwb3J0cyA9IHJlcXVpcmUoXCJodHRwc1wiKTsiLCJtb2R1bGUuZXhwb3J0cyA9IHJlcXVpcmUoXCJub2RlOmNoaWxkX3Byb2Nlc3NcIik7IiwibW9kdWxlLmV4cG9ydHMgPSByZXF1aXJlKFwibm9kZTpmc1wiKTsiLCJtb2R1bGUuZXhwb3J0cyA9IHJlcXVpcmUoXCJub2RlOm9zXCIpOyIsIm1vZHVsZS5leHBvcnRzID0gcmVxdWlyZShcIm5vZGU6cGF0aFwiKTsiLCJtb2R1bGUuZXhwb3J0cyA9IHJlcXVpcmUoXCJub2RlOnVybFwiKTsiLCIvLyBUaGUgbW9kdWxlIGNhY2hlXG52YXIgX193ZWJwYWNrX21vZHVsZV9jYWNoZV9fID0ge307XG5cbi8vIFRoZSByZXF1aXJlIGZ1bmN0aW9uXG5mdW5jdGlvbiBfX3dlYnBhY2tfcmVxdWlyZV9fKG1vZHVsZUlkKSB7XG5cdC8vIENoZWNrIGlmIG1vZHVsZSBpcyBpbiBjYWNoZVxuXHR2YXIgY2FjaGVkTW9kdWxlID0gX193ZWJwYWNrX21vZHVsZV9jYWNoZV9fW21vZHVsZUlkXTtcblx0aWYgKGNhY2hlZE1vZHVsZSAhPT0gdW5kZWZpbmVkKSB7XG5cdFx0cmV0dXJuIGNhY2hlZE1vZHVsZS5leHBvcnRzO1xuXHR9XG5cdC8vIENyZWF0ZSBhIG5ldyBtb2R1bGUgKGFuZCBwdXQgaXQgaW50byB0aGUgY2FjaGUpXG5cdHZhciBtb2R1bGUgPSBfX3dlYnBhY2tfbW9kdWxlX2NhY2hlX19bbW9kdWxlSWRdID0ge1xuXHRcdC8vIG5vIG1vZHVsZS5pZCBuZWVkZWRcblx0XHQvLyBubyBtb2R1bGUubG9hZGVkIG5lZWRlZFxuXHRcdGV4cG9ydHM6IHt9XG5cdH07XG5cblx0Ly8gRXhlY3V0ZSB0aGUgbW9kdWxlIGZ1bmN0aW9uXG5cdF9fd2VicGFja19tb2R1bGVzX19bbW9kdWxlSWRdKG1vZHVsZSwgbW9kdWxlLmV4cG9ydHMsIF9fd2VicGFja19yZXF1aXJlX18pO1xuXG5cdC8vIFJldHVybiB0aGUgZXhwb3J0cyBvZiB0aGUgbW9kdWxlXG5cdHJldHVybiBtb2R1bGUuZXhwb3J0cztcbn1cblxuIiwiLy8gZ2V0RGVmYXVsdEV4cG9ydCBmdW5jdGlvbiBmb3IgY29tcGF0aWJpbGl0eSB3aXRoIG5vbi1oYXJtb255IG1vZHVsZXNcbl9fd2VicGFja19yZXF1aXJlX18ubiA9IChtb2R1bGUpID0+IHtcblx0dmFyIGdldHRlciA9IG1vZHVsZSAmJiBtb2R1bGUuX19lc01vZHVsZSA/XG5cdFx0KCkgPT4gKG1vZHVsZVsnZGVmYXVsdCddKSA6XG5cdFx0KCkgPT4gKG1vZHVsZSk7XG5cdF9fd2VicGFja19yZXF1aXJlX18uZChnZXR0ZXIsIHsgYTogZ2V0dGVyIH0pO1xuXHRyZXR1cm4gZ2V0dGVyO1xufTsiLCIvLyBkZWZpbmUgZ2V0dGVyIGZ1bmN0aW9ucyBmb3IgaGFybW9ueSBleHBvcnRzXG5fX3dlYnBhY2tfcmVxdWlyZV9fLmQgPSAoZXhwb3J0cywgZGVmaW5pdGlvbikgPT4ge1xuXHRmb3IodmFyIGtleSBpbiBkZWZpbml0aW9uKSB7XG5cdFx0aWYoX193ZWJwYWNrX3JlcXVpcmVfXy5vKGRlZmluaXRpb24sIGtleSkgJiYgIV9fd2VicGFja19yZXF1aXJlX18ubyhleHBvcnRzLCBrZXkpKSB7XG5cdFx0XHRPYmplY3QuZGVmaW5lUHJvcGVydHkoZXhwb3J0cywga2V5LCB7IGVudW1lcmFibGU6IHRydWUsIGdldDogZGVmaW5pdGlvbltrZXldIH0pO1xuXHRcdH1cblx0fVxufTsiLCJfX3dlYnBhY2tfcmVxdWlyZV9fLm8gPSAob2JqLCBwcm9wKSA9PiAoT2JqZWN0LnByb3RvdHlwZS5oYXNPd25Qcm9wZXJ0eS5jYWxsKG9iaiwgcHJvcCkpIiwiLy8gZGVmaW5lIF9fZXNNb2R1bGUgb24gZXhwb3J0c1xuX193ZWJwYWNrX3JlcXVpcmVfXy5yID0gKGV4cG9ydHMpID0+IHtcblx0aWYodHlwZW9mIFN5bWJvbCAhPT0gJ3VuZGVmaW5lZCcgJiYgU3ltYm9sLnRvU3RyaW5nVGFnKSB7XG5cdFx0T2JqZWN0LmRlZmluZVByb3BlcnR5KGV4cG9ydHMsIFN5bWJvbC50b1N0cmluZ1RhZywgeyB2YWx1ZTogJ01vZHVsZScgfSk7XG5cdH1cblx0T2JqZWN0LmRlZmluZVByb3BlcnR5KGV4cG9ydHMsICdfX2VzTW9kdWxlJywgeyB2YWx1ZTogdHJ1ZSB9KTtcbn07IiwiLypcbiAqIE1JVCBMaWNlbnNlXG4gKlxuICogQ29weXJpZ2h0IChjKSAyMDI1ICBZdXJpaSBZYWt1YmluICh5dXJpaS55YWt1YmluQGdtYWlsLmNvbSlcbiAqXG4gKiBQZXJtaXNzaW9uIGlzIGdyYW50ZWQgdG8gdXNlLCBjb3B5LCBtb2RpZnksIGFuZCBkaXN0cmlidXRlIHRoaXMgc29mdHdhcmVcbiAqIHVuZGVyIHRoZSBNSVQgTGljZW5zZS4gU2VlIExJQ0VOU0UgZmlsZSBmb3IgZGV0YWlscy5cbiAqL1xuXG4vLy8gPHJlZmVyZW5jZSBwYXRoPVwiZ2xvYmFsLmQudHNcIiAvPlxuXG5pbXBvcnQgKiBhcyBjeHggZnJvbSBcIkAvY3h4XCI7XG5cbmltcG9ydCBpbml0SGFuZGxlciBmcm9tIFwiQC9Jbml0SGFuZGxlclwiO1xuaW1wb3J0IGJ1aWxkSGFuZGxlciBmcm9tIFwiQC9CdWlsZEhhbmRsZXJcIjtcblxuZXhwb3J0IGRlZmF1bHQge1xuICBjeHgsXG4gIGhhbmRsZXJzOiB7XG4gICAgZGVmYXVsdDogYnVpbGRIYW5kbGVyLFxuICAgIGluaXQ6IGluaXRIYW5kbGVyLFxuICAgIGJ1aWxkOiBidWlsZEhhbmRsZXIsXG4gIH0sXG59O1xuIl0sIm5hbWVzIjpbXSwic291cmNlUm9vdCI6IiJ9