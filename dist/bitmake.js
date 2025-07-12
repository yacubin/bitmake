#!/usr/bin/env node
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

/***/ "./src/Constants.ts":
/*!**************************!*\
  !*** ./src/Constants.ts ***!
  \**************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   ALL_TARGET: () => (/* binding */ ALL_TARGET),
/* harmony export */   BUILD_SETTINGS_FILE: () => (/* binding */ BUILD_SETTINGS_FILE),
/* harmony export */   CUSTOM_VARIABLE_GROUP: () => (/* binding */ CUSTOM_VARIABLE_GROUP),
/* harmony export */   INSTALL_TARGET: () => (/* binding */ INSTALL_TARGET),
/* harmony export */   MAKE_CACHE: () => (/* binding */ MAKE_CACHE),
/* harmony export */   PACKAGE_JSON: () => (/* binding */ PACKAGE_JSON),
/* harmony export */   REQUEST_ATTEMPTS: () => (/* binding */ REQUEST_ATTEMPTS),
/* harmony export */   SYSTEM_VARIABLE_GROUP: () => (/* binding */ SYSTEM_VARIABLE_GROUP),
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
const PACKAGE_JSON = "package.json";
const MAKE_CACHE = "MakeCache.json";
const SYSTEM_VARIABLE_GROUP = "system";
const CUSTOM_VARIABLE_GROUP = "custom";


/***/ }),

/***/ "./src/RunScript.ts":
/*!**************************!*\
  !*** ./src/RunScript.ts ***!
  \**************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   runMainScript: () => (/* binding */ runMainScript),
/* harmony export */   runScript: () => (/* binding */ runScript),
/* harmony export */   runWorkerScript: () => (/* binding */ runWorkerScript)
/* harmony export */ });
/* harmony import */ var node_worker_threads__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! node:worker_threads */ "node:worker_threads");
/* harmony import */ var node_worker_threads__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(node_worker_threads__WEBPACK_IMPORTED_MODULE_0__);
/* harmony import */ var _utils_Args__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! @/utils/Args */ "./src/utils/Args.ts");
/* harmony import */ var _commands__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! @/commands */ "./src/commands/index.ts");
/* harmony import */ var _logger__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! @/logger */ "./src/logger/index.ts");
/* harmony import */ var _server_MessagePortSender__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! @/server/MessagePortSender */ "./src/server/MessagePortSender.ts");
/* harmony import */ var _server_WorkerLooper__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(/*! @/server/WorkerLooper */ "./src/server/WorkerLooper.ts");
/*
 * MIT License
 *
 * Copyright (c) 2025  Yurii Yakubin (yurii.yakubin@gmail.com)
 *
 * Permission is granted to use, copy, modify, and distribute this software
 * under the MIT License. See LICENSE file for details.
 */






const logger = _logger__WEBPACK_IMPORTED_MODULE_3__.Logger.create("file:///mnt/c/opt/work/source/darkit-sdk/external/bitmake/src/RunScript.ts");
async function runMainScript() {
    logger.info("Main thread started");
    const options = {
        handler: "default",
        workDir: process.cwd(),
        env: {},
    };
    let nodeExecutable;
    if (process.argv.length > 0)
        nodeExecutable = process.argv[0];
    let currentScript;
    if (process.argv.length > 1)
        currentScript = process.argv[1];
    let argsIndex = process.argv.length;
    if (process.argv.length > 2) {
        argsIndex = 2;
        const handler = process.argv[argsIndex];
        if (!handler.startsWith("--")) {
            options.handler = handler;
            argsIndex++;
        }
    }
    options.env = _utils_Args__WEBPACK_IMPORTED_MODULE_1__.Args.toObject(process.argv.slice(argsIndex));
    const handler = _commands__WEBPACK_IMPORTED_MODULE_2__["default"][options.handler];
    if (!handler)
        throw Error(`The ${"bitmake"} does not support the ${options.handler} command`);
    const res = handler(options);
    if (res instanceof Promise) {
        await res;
    }
}
function runWorkerScript() {
    logger.debug("Worker thread started", node_worker_threads__WEBPACK_IMPORTED_MODULE_0__.workerData);
    if (!node_worker_threads__WEBPACK_IMPORTED_MODULE_0__.parentPort) {
        throw new Error(`Worker not supported parentPort`);
    }
    const sender = new _server_MessagePortSender__WEBPACK_IMPORTED_MODULE_4__.MessagePortSender(node_worker_threads__WEBPACK_IMPORTED_MODULE_0__.parentPort);
    const looper = new _server_WorkerLooper__WEBPACK_IMPORTED_MODULE_5__.WorkerLooper(sender);
    node_worker_threads__WEBPACK_IMPORTED_MODULE_0__.parentPort.on("message", (message) => looper.emitMessage(sender, message));
}
function runScript() {
    if (node_worker_threads__WEBPACK_IMPORTED_MODULE_0__.isMainThread) {
        runMainScript().then(() => process.exit(0)).catch((e) => {
            if (e instanceof Error)
                logger.fatal(e.stack);
            else
                logger.fatal(e);
            process.exit(1);
        });
    }
    else {
        runWorkerScript();
    }
}


/***/ }),

/***/ "./src/actions/bitmake.ts":
/*!********************************!*\
  !*** ./src/actions/bitmake.ts ***!
  \********************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (/* export default binding */ __WEBPACK_DEFAULT_EXPORT__)
/* harmony export */ });
/* harmony import */ var node_fs__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! node:fs */ "node:fs");
/* harmony import */ var node_fs__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(node_fs__WEBPACK_IMPORTED_MODULE_0__);
/* harmony import */ var _utils_Path__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! @/utils/Path */ "./src/utils/Path.ts");
/* harmony import */ var _server_MakeServer__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! @/server/MakeServer */ "./src/server/MakeServer.ts");
/* harmony import */ var _core_PluginContext__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! @/core/PluginContext */ "./src/core/PluginContext.ts");
/* harmony import */ var _core_Scope__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! @/core/Scope */ "./src/core/Scope.ts");
/* harmony import */ var _core_ToolchainContext__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(/*! @/core/ToolchainContext */ "./src/core/ToolchainContext.ts");
/* harmony import */ var _utils_FileSystem__WEBPACK_IMPORTED_MODULE_6__ = __webpack_require__(/*! @/utils/FileSystem */ "./src/utils/FileSystem.ts");
/* harmony import */ var _core_AbsolutePath__WEBPACK_IMPORTED_MODULE_7__ = __webpack_require__(/*! @/core/AbsolutePath */ "./src/core/AbsolutePath.ts");
/* harmony import */ var _utils_Module__WEBPACK_IMPORTED_MODULE_8__ = __webpack_require__(/*! @/utils/Module */ "./src/utils/Module.ts");
/* harmony import */ var _core_DetermineCompiler__WEBPACK_IMPORTED_MODULE_9__ = __webpack_require__(/*! @/core/DetermineCompiler */ "./src/core/DetermineCompiler.ts");
/* harmony import */ var _utils_UrlScheme__WEBPACK_IMPORTED_MODULE_10__ = __webpack_require__(/*! @/utils/UrlScheme */ "./src/utils/UrlScheme.ts");
/* harmony import */ var _Constants__WEBPACK_IMPORTED_MODULE_11__ = __webpack_require__(/*! @/Constants */ "./src/Constants.ts");
/* harmony import */ var _core_SystemVariables__WEBPACK_IMPORTED_MODULE_12__ = __webpack_require__(/*! @/core/SystemVariables */ "./src/core/SystemVariables.ts");
/* harmony import */ var _logger__WEBPACK_IMPORTED_MODULE_13__ = __webpack_require__(/*! @/logger */ "./src/logger/index.ts");
/*
 * MIT License
 *
 * Copyright (c) 2025  Yurii Yakubin (yurii.yakubin@gmail.com)
 *
 * Permission is granted to use, copy, modify, and distribute this software
 * under the MIT License. See LICENSE file for details.
 */
















const logger = _logger__WEBPACK_IMPORTED_MODULE_13__.Logger.create("file:///mnt/c/opt/work/source/darkit-sdk/external/bitmake/src/actions/bitmake.ts");
/* harmony default export */ async function __WEBPACK_DEFAULT_EXPORT__(config, environment, settings) {
    process.env = environment;
    const server = new _server_MakeServer__WEBPACK_IMPORTED_MODULE_2__.MakeServer;
    const variableMap = server.rootVariableMap;
    _core_Scope__WEBPACK_IMPORTED_MODULE_4__.ScopeHelper.extendVariableMapByValues(variableMap, "", config.variables);
    _core_Scope__WEBPACK_IMPORTED_MODULE_4__.ScopeHelper.defineVariablesInVariableMap(variableMap, _Constants__WEBPACK_IMPORTED_MODULE_11__.SYSTEM_VARIABLE_GROUP, _core_SystemVariables__WEBPACK_IMPORTED_MODULE_12__["default"]);
    const scope = _core_Scope__WEBPACK_IMPORTED_MODULE_4__.ScopeHelper.createProxy(variableMap);
    const sourceDir = (0,_utils_FileSystem__WEBPACK_IMPORTED_MODULE_6__.getPathString)(config.sourceDir);
    const binaryDir = (0,_utils_FileSystem__WEBPACK_IMPORTED_MODULE_6__.getPathString)(config.binaryDir);
    scope.PROJECT_SOURCE_DIR = _core_AbsolutePath__WEBPACK_IMPORTED_MODULE_7__.AbsolutePath.create(sourceDir);
    scope.PROJECT_BINARY_DIR = _core_AbsolutePath__WEBPACK_IMPORTED_MODULE_7__.AbsolutePath.create(binaryDir);
    scope.PACKAGE_FILE = scope.PROJECT_SOURCE_DIR.join(_Constants__WEBPACK_IMPORTED_MODULE_11__.PACKAGE_JSON);
    scope.CACHE_FILE = scope.PROJECT_BINARY_DIR.join(_Constants__WEBPACK_IMPORTED_MODULE_11__.MAKE_CACHE);
    scope.SOURCE_DIR = scope.PROJECT_SOURCE_DIR;
    scope.BINARY_DIR = scope.PROJECT_BINARY_DIR;
    const packageJson = await node_fs__WEBPACK_IMPORTED_MODULE_0___default().promises.readFile(scope.PACKAGE_FILE.toString(), "utf8");
    const pkg = JSON.parse(packageJson);
    scope.BUILD_TYPE = config.buildType;
    scope.PROJECT_NAME = pkg.name;
    scope.PROJECT_VERSION = pkg.version;
    scope.PROJECT_DESCRIPTION = pkg.description || "";
    scope.PROJECT_HOMEPAGE_URL = pkg.homepage || "";
    if (config.destDir)
        scope.DESTDIR = config.destDir;
    for (const plugin of (scope.MAKE_PLUGIN_LIST || [])) {
        const cwdSave = process.cwd();
        scope.SCRIPT_FILE = _core_AbsolutePath__WEBPACK_IMPORTED_MODULE_7__.AbsolutePath.create(plugin);
        scope.SCRIPT_DIR = scope.SCRIPT_FILE.dirname();
        scope.SOURCE_DIR = scope.SCRIPT_DIR;
        const binaryDir1 = scope.PROJECT_BINARY_DIR.relative(sourceDir);
        const binaryDir2 = scope.PROJECT_SOURCE_DIR.relative(sourceDir);
        const binaryDir = (binaryDir2.length < binaryDir1.length ? binaryDir2 : binaryDir1).replace("../", "__/");
        scope.BINARY_DIR = scope.PROJECT_BINARY_DIR.join("MakePluginBinaries", binaryDir);
        process.chdir(scope.SOURCE_DIR.toString());
        const pluginUrl = (0,_utils_FileSystem__WEBPACK_IMPORTED_MODULE_6__.getURLString)(scope.SCRIPT_FILE.toString());
        const module = await (0,_utils_Module__WEBPACK_IMPORTED_MODULE_8__.importModule)(pluginUrl);
        if (!module.default)
            throw new Error(`Plugin ${scope.SCRIPT_FILE.basename()} not contain default export`);
        const mk = _core_PluginContext__WEBPACK_IMPORTED_MODULE_3__.PluginContext.create(server.project, variableMap);
        if (typeof module.default !== "function")
            throw new Error(`Plugin ${scope.SCRIPT_FILE.basename()} export has no function or class`);
        let result;
        if (/^class\s/.test(Function.prototype.toString.call(module.default))) {
            if (typeof module.default.prototype.apply !== "function")
                throw new Error(`Plugin class of ${scope.SCRIPT_FILE.basename()} has no apply method`);
            result = (new module.default).apply(mk);
        }
        else {
            result = module.default(mk);
        }
        if (result instanceof Promise)
            await result;
        process.chdir(cwdSave);
    }
    if (scope.TOOLCHAIN_FILE) {
        const toolchainUrl = (0,_utils_FileSystem__WEBPACK_IMPORTED_MODULE_6__.getURLString)(scope.TOOLCHAIN_FILE.toString());
        const toolchain = await (0,_utils_Module__WEBPACK_IMPORTED_MODULE_8__.importModule)(toolchainUrl);
        if (!toolchain.default)
            throw new Error("Toolchain module has no default export");
        const mk = _core_ToolchainContext__WEBPACK_IMPORTED_MODULE_5__.ToolchainContext.create(server.project, variableMap);
        const result = toolchain.default(mk);
        if (result instanceof Promise)
            await result;
    }
    else {
        await (0,_core_DetermineCompiler__WEBPACK_IMPORTED_MODULE_9__.determineCompiler)(scope);
    }
    if (config.sourceUrl && config.sourceUrl.startsWith(_utils_UrlScheme__WEBPACK_IMPORTED_MODULE_10__.IMPORT_SCHEME)) {
        const scriptFile = (0,_utils_Module__WEBPACK_IMPORTED_MODULE_8__.requireResolve)(config.sourceUrl.slice(_utils_UrlScheme__WEBPACK_IMPORTED_MODULE_10__.IMPORT_SCHEME.length));
        scope.SCRIPT_FILE = _core_AbsolutePath__WEBPACK_IMPORTED_MODULE_7__.AbsolutePath.create(scriptFile);
        scope.SCRIPT_DIR = scope.SCRIPT_FILE.dirname();
    }
    server.addEventListener("configure", async (event) => {
        logger.info("Configuring done");
        if (scope.GLOBAL_CONTEXT_JSON) {
            const filename = scope.GLOBAL_CONTEXT_JSON.toString();
            const content = JSON.stringify(server.project, null, 2);
            await node_fs__WEBPACK_IMPORTED_MODULE_0___default().promises.mkdir(_utils_Path__WEBPACK_IMPORTED_MODULE_1__.Path.dirname(filename), { recursive: true });
            await node_fs__WEBPACK_IMPORTED_MODULE_0___default().promises.writeFile(filename, content, { encoding: "utf8" });
        }
        const allGoalList = server.project.createGoals(scope);
        const goalList = allGoalList.getTargetList(_Constants__WEBPACK_IMPORTED_MODULE_11__.INSTALL_TARGET);
        if (scope.TARGET_GOALS_JSON) {
            const filename = scope.TARGET_GOALS_JSON.toString();
            const content = JSON.stringify(goalList, null, 2);
            await node_fs__WEBPACK_IMPORTED_MODULE_0___default().promises.mkdir(_utils_Path__WEBPACK_IMPORTED_MODULE_1__.Path.dirname(filename), { recursive: true });
            await node_fs__WEBPACK_IMPORTED_MODULE_0___default().promises.writeFile(filename, content, { encoding: "utf8" });
        }
        let loaded = 0;
        const total = goalList.length;
        for (const goal of goalList) {
            goal.updateProgress({ loaded, total });
            await goal.doWork();
            loaded++;
        }
    });
    let finishResolve;
    const result = new Promise((resolve) => {
        finishResolve = resolve;
    });
    server.addEventListener("build", (event) => finishResolve());
    server.start();
    return result;
}


/***/ }),

/***/ "./src/actions/cmake.ts":
/*!******************************!*\
  !*** ./src/actions/cmake.ts ***!
  \******************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (/* export default binding */ __WEBPACK_DEFAULT_EXPORT__)
/* harmony export */ });
/* harmony import */ var _cmake__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! @/cmake */ "./src/cmake/index.ts");
/* harmony import */ var _utils_FileSystem__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! @/utils/FileSystem */ "./src/utils/FileSystem.ts");
/*
 * MIT License
 *
 * Copyright (c) 2025  Yurii Yakubin (yurii.yakubin@gmail.com)
 *
 * Permission is granted to use, copy, modify, and distribute this software
 * under the MIT License. See LICENSE file for details.
 */


/* harmony default export */ async function __WEBPACK_DEFAULT_EXPORT__(config, environment, settings) {
    const sourceDir = (0,_utils_FileSystem__WEBPACK_IMPORTED_MODULE_1__.getPathString)(config.sourceDir);
    const binaryDir = (0,_utils_FileSystem__WEBPACK_IMPORTED_MODULE_1__.getPathString)(config.binaryDir);
    const cmakeArgs = {
        environment: {
            ...environment,
            DESTDIR: config.destDir,
        },
        generator: config.generator || _cmake__WEBPACK_IMPORTED_MODULE_0__.DEFAULT_GENERATOR,
        cacheVariables: config.cacheVariables,
        sourceDir,
        binaryDir,
    };
    if (!cmakeArgs.cacheVariables.CMAKE_BUILD_TYPE) {
        cmakeArgs.cacheVariables.CMAKE_BUILD_TYPE = config.buildType;
    }
    const cmake = _cmake__WEBPACK_IMPORTED_MODULE_0__.CMakeProcess.getInstance();
    await cmake.configure(cmakeArgs);
    await cmake.build(cmakeArgs);
    await cmake.install(cmakeArgs);
}


/***/ }),

/***/ "./src/actions/configure.ts":
/*!**********************************!*\
  !*** ./src/actions/configure.ts ***!
  \**********************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (/* export default binding */ __WEBPACK_DEFAULT_EXPORT__)
/* harmony export */ });
/* harmony import */ var node_path__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! node:path */ "node:path");
/* harmony import */ var node_path__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(node_path__WEBPACK_IMPORTED_MODULE_0__);
/* harmony import */ var _utils_StrictType__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! @/utils/StrictType */ "./src/utils/StrictType.ts");
/* harmony import */ var _utils_FileSystem__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! @/utils/FileSystem */ "./src/utils/FileSystem.ts");
/* harmony import */ var _utils_ChildProcess__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! @/utils/ChildProcess */ "./src/utils/ChildProcess.ts");
/*
 * MIT License
 *
 * Copyright (c) 2025  Yurii Yakubin (yurii.yakubin@gmail.com)
 *
 * Permission is granted to use, copy, modify, and distribute this software
 * under the MIT License. See LICENSE file for details.
 */




/* harmony default export */ async function __WEBPACK_DEFAULT_EXPORT__(config, environment, settings) {
    const sourceDir = (0,_utils_FileSystem__WEBPACK_IMPORTED_MODULE_2__.getPathString)(config.sourceDir);
    const binaryDir = (0,_utils_FileSystem__WEBPACK_IMPORTED_MODULE_2__.getPathString)(config.binaryDir);
    let step = await settings.get("configure") || "config";
    if (step === "config") {
        const command = node_path__WEBPACK_IMPORTED_MODULE_0___default().resolve(sourceDir, "configure");
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
        const res1 = await (0,_utils_ChildProcess__WEBPACK_IMPORTED_MODULE_3__.spawnAsync)(command, params, {
            cwd: binaryDir,
            env: environment,
            extra: {
                output: `ac-configure-${step}.log`,
            },
        });
        if (res1.status !== 0) {
            throw new Error(`configure returned status ${res1.status}`);
        }
        step = "make";
        await settings.set("configure", step);
    }
    if (step === "make") {
        let runMake = false;
        if (Object.hasOwn(config, "runMake"))
            runMake = (0,_utils_StrictType__WEBPACK_IMPORTED_MODULE_1__.ensureBoolean)(config.runMake);
        if (runMake) {
            const res2 = await (0,_utils_ChildProcess__WEBPACK_IMPORTED_MODULE_3__.spawnAsync)("make", [], {
                cwd: binaryDir,
                env: environment,
                extra: {
                    output: `ac-configure-${step}.log`,
                },
            });
            if (res2.status !== 0) {
                throw new Error(`make returned status ${res2.status}`);
            }
        }
        step = "install";
        await settings.set("configure", step);
    }
    if (step === "install") {
        let runMakeInstall = true;
        if (Object.hasOwn(config, "runMakeInstall"))
            runMakeInstall = (0,_utils_StrictType__WEBPACK_IMPORTED_MODULE_1__.ensureBoolean)(config.runMakeInstall);
        if (runMakeInstall) {
            const args = ["install"];
            if (config.destDir) {
                args.push(`DESTDIR=${config.destDir}`);
            }
            const res2 = await (0,_utils_ChildProcess__WEBPACK_IMPORTED_MODULE_3__.spawnAsync)("make", args, {
                cwd: binaryDir,
                env: environment,
                extra: {
                    output: `ac-configure-${step}.log`,
                },
            });
            if (res2.status !== 0) {
                throw new Error(`make returned status ${res2.status}`);
            }
        }
        step = "done";
        await settings.set("configure", step);
    }
}


/***/ }),

/***/ "./src/actions/index.ts":
/*!******************************!*\
  !*** ./src/actions/index.ts ***!
  \******************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (__WEBPACK_DEFAULT_EXPORT__)
/* harmony export */ });
/* harmony import */ var _actions_none__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! @/actions/none */ "./src/actions/none.ts");
/* harmony import */ var _actions_process__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! @/actions/process */ "./src/actions/process.ts");
/* harmony import */ var _actions_configure__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! @/actions/configure */ "./src/actions/configure.ts");
/* harmony import */ var _actions_make__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! @/actions/make */ "./src/actions/make.ts");
/* harmony import */ var _actions_cmake__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! @/actions/cmake */ "./src/actions/cmake.ts");
/* harmony import */ var _actions_bitmake__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(/*! @/actions/bitmake */ "./src/actions/bitmake.ts");
/*
 * MIT License
 *
 * Copyright (c) 2025  Yurii Yakubin (yurii.yakubin@gmail.com)
 *
 * Permission is granted to use, copy, modify, and distribute this software
 * under the MIT License. See LICENSE file for details.
 */






/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = ({
    none: _actions_none__WEBPACK_IMPORTED_MODULE_0__["default"],
    process: _actions_process__WEBPACK_IMPORTED_MODULE_1__["default"],
    configure: _actions_configure__WEBPACK_IMPORTED_MODULE_2__["default"],
    make: _actions_make__WEBPACK_IMPORTED_MODULE_3__["default"],
    cmake: _actions_cmake__WEBPACK_IMPORTED_MODULE_4__["default"],
    bitmake: _actions_bitmake__WEBPACK_IMPORTED_MODULE_5__["default"],
});


/***/ }),

/***/ "./src/actions/make.ts":
/*!*****************************!*\
  !*** ./src/actions/make.ts ***!
  \*****************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (/* export default binding */ __WEBPACK_DEFAULT_EXPORT__)
/* harmony export */ });
/* harmony import */ var _utils_ChildProcess__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! @/utils/ChildProcess */ "./src/utils/ChildProcess.ts");
/* harmony import */ var _utils_FileSystem__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! @/utils/FileSystem */ "./src/utils/FileSystem.ts");
/*
 * MIT License
 *
 * Copyright (c) 2025  Yurii Yakubin (yurii.yakubin@gmail.com)
 *
 * Permission is granted to use, copy, modify, and distribute this software
 * under the MIT License. See LICENSE file for details.
 */


/* harmony default export */ async function __WEBPACK_DEFAULT_EXPORT__(config, environment, settings) {
    const binaryDir = (0,_utils_FileSystem__WEBPACK_IMPORTED_MODULE_1__.getPathString)(config.binaryDir);
    const args = config.args || [];
    if (config.destDir) {
        args.push(`DESTDIR=${config.destDir}`);
    }
    const res2 = await (0,_utils_ChildProcess__WEBPACK_IMPORTED_MODULE_0__.spawnAsync)("make", args, {
        cwd: binaryDir,
        env: environment,
        extra: {
            output: `make.log`,
        },
    });
    if (res2.status !== 0) {
        throw new Error(`make returned status ${res2.status}`);
    }
}


/***/ }),

/***/ "./src/actions/none.ts":
/*!*****************************!*\
  !*** ./src/actions/none.ts ***!
  \*****************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (/* export default binding */ __WEBPACK_DEFAULT_EXPORT__)
/* harmony export */ });
/* harmony import */ var _logger__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! @/logger */ "./src/logger/index.ts");
/*
 * MIT License
 *
 * Copyright (c) 2025  Yurii Yakubin (yurii.yakubin@gmail.com)
 *
 * Permission is granted to use, copy, modify, and distribute this software
 * under the MIT License. See LICENSE file for details.
 */

const logger = _logger__WEBPACK_IMPORTED_MODULE_0__.Logger.create("file:///mnt/c/opt/work/source/darkit-sdk/external/bitmake/src/actions/none.ts");
/* harmony default export */ async function __WEBPACK_DEFAULT_EXPORT__(config, environment, settings) {
    /* do nothing */
}


/***/ }),

/***/ "./src/actions/process.ts":
/*!********************************!*\
  !*** ./src/actions/process.ts ***!
  \********************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (/* export default binding */ __WEBPACK_DEFAULT_EXPORT__)
/* harmony export */ });
/* harmony import */ var node_path__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! node:path */ "node:path");
/* harmony import */ var node_path__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(node_path__WEBPACK_IMPORTED_MODULE_0__);
/* harmony import */ var _utils_FileSystem__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! @/utils/FileSystem */ "./src/utils/FileSystem.ts");
/* harmony import */ var _utils_ChildProcess__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! @/utils/ChildProcess */ "./src/utils/ChildProcess.ts");
/* harmony import */ var _logger__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! @/logger */ "./src/logger/index.ts");
/*
 * MIT License
 *
 * Copyright (c) 2025  Yurii Yakubin (yurii.yakubin@gmail.com)
 *
 * Permission is granted to use, copy, modify, and distribute this software
 * under the MIT License. See LICENSE file for details.
 */




const logger = _logger__WEBPACK_IMPORTED_MODULE_3__.Logger.create("file:///mnt/c/opt/work/source/darkit-sdk/external/bitmake/src/actions/process.ts");
/* harmony default export */ async function __WEBPACK_DEFAULT_EXPORT__(config, environment, settings) {
    if (!config.command)
        throw new Error("Required command field for process action");
    const sourceDir = (0,_utils_FileSystem__WEBPACK_IMPORTED_MODULE_1__.getPathString)(config.sourceDir);
    const binaryDir = (0,_utils_FileSystem__WEBPACK_IMPORTED_MODULE_1__.getPathString)(config.binaryDir);
    let { command } = config;
    if (!node_path__WEBPACK_IMPORTED_MODULE_0___default().isAbsolute(command) && (command.includes((node_path__WEBPACK_IMPORTED_MODULE_0___default().posix).delimiter) || command.includes((node_path__WEBPACK_IMPORTED_MODULE_0___default().win32).delimiter))) {
        command = node_path__WEBPACK_IMPORTED_MODULE_0___default().resolve(sourceDir, command);
    }
    const res = await (0,_utils_ChildProcess__WEBPACK_IMPORTED_MODULE_2__.spawnAsync)(command, config.args || [], {
        cwd: binaryDir,
        env: environment,
        extra: {
            output: `process.log`,
        },
    });
    if (res.status !== 0) {
        throw new Error(`process returned status ${res.status}`);
    }
}


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
/* harmony export */   CMakeProcess: () => (/* binding */ CMakeProcess),
/* harmony export */   CTestProcess: () => (/* binding */ CTestProcess),
/* harmony export */   DEFAULT_GENERATOR: () => (/* reexport safe */ _cmake_Constants__WEBPACK_IMPORTED_MODULE_4__.DEFAULT_GENERATOR),
/* harmony export */   generatedScriptNameComment: () => (/* binding */ generatedScriptNameComment),
/* harmony export */   getProjectInfo: () => (/* binding */ getProjectInfo),
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
/* harmony import */ var _utils_Host__WEBPACK_IMPORTED_MODULE_6__ = __webpack_require__(/*! @/utils/Host */ "./src/utils/Host.ts");
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
function makeCmdVariable(key, val, isCache) {
    let name = key;
    if (isCache)
        name += ":" + toVarType(key, val);
    return name + "=" + (0,_cmake_Helper__WEBPACK_IMPORTED_MODULE_5__.convertToValue)(val);
}
function makeCmdVariables(variables, isCache) {
    const result = [];
    for (const [key, val] of Object.entries(variables))
        result.push("-D", makeCmdVariable(key, val, isCache));
    return result;
}
;
class CMakeProcess {
    _cmakePath;
    constructor(cmakePath) {
        this._cmakePath = cmakePath;
    }
    async scriptMode(scriptFile, variables, options) {
        const spawnArgs = [
            ...makeCmdVariables(variables, false),
            "-P", scriptFile,
        ];
        const res = await (0,_utils_ChildProcess__WEBPACK_IMPORTED_MODULE_3__.spawnAsync)(this._cmakePath, spawnArgs, {
            cwd: options?.workDir,
            env: options?.environment || process.env,
        });
        if (res.status !== 0) {
            throw `cmake.scriptMode returned status ${res.status}`;
        }
    }
    async configure(args) {
        const spawnArgs = [
            "-G", args.generator,
            ...makeCmdVariables(args.cacheVariables, true),
            "-S", args.sourceDir,
            "-B", args.binaryDir,
        ];
        const res = await (0,_utils_ChildProcess__WEBPACK_IMPORTED_MODULE_3__.spawnAsync)(this._cmakePath, spawnArgs, {
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
    async build(args) {
        await this.configure(args);
        const spawnArgs = [
            '--build', '.',
            '--parallel', node_os__WEBPACK_IMPORTED_MODULE_0___default().availableParallelism().toString(),
        ];
        const res = await (0,_utils_ChildProcess__WEBPACK_IMPORTED_MODULE_3__.spawnAsync)(this._cmakePath, spawnArgs, {
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
    async install(args) {
        await this.configure(args);
        const spawnArgs = [
            '--install',
            '.',
        ];
        if (args.installDir) {
            spawnArgs.push('--prefix', args.installDir);
        }
        const res = await (0,_utils_ChildProcess__WEBPACK_IMPORTED_MODULE_3__.spawnAsync)(this._cmakePath, spawnArgs, {
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
    async extract(args) {
        const spawnArgs = ["-E", "tar", "-xvf", args.filename];
        const res = await (0,_utils_ChildProcess__WEBPACK_IMPORTED_MODULE_3__.spawnAsync)(this._cmakePath, spawnArgs, {
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
}
;
let _cmakeInstance;
(function (CMakeProcess) {
    function getInstance() {
        if (!_cmakeInstance)
            _cmakeInstance = new CMakeProcess("cmake" + _utils_Host__WEBPACK_IMPORTED_MODULE_6__.Host.executableSuffix);
        return _cmakeInstance;
    }
    CMakeProcess.getInstance = getInstance;
})(CMakeProcess || (CMakeProcess = {}));
class CTestProcess {
    _ctestPath;
    constructor(ctestPath) {
        this._ctestPath = ctestPath;
    }
    async ctest(args) {
        const spawnArgs = [];
        const res = await (0,_utils_ChildProcess__WEBPACK_IMPORTED_MODULE_3__.spawnAsync)(this._ctestPath, spawnArgs, {
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
}
;
let _ctestInstance;
(function (CTestProcess) {
    function getInstance() {
        if (!_ctestInstance)
            _ctestInstance = new CTestProcess("ctest" + _utils_Host__WEBPACK_IMPORTED_MODULE_6__.Host.executableSuffix);
        return _ctestInstance;
    }
    CTestProcess.getInstance = getInstance;
})(CTestProcess || (CTestProcess = {}));
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

/***/ "./src/commands/build.ts":
/*!*******************************!*\
  !*** ./src/commands/build.ts ***!
  \*******************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (__WEBPACK_DEFAULT_EXPORT__)
/* harmony export */ });
/* harmony import */ var node_fs__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! node:fs */ "node:fs");
/* harmony import */ var node_fs__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(node_fs__WEBPACK_IMPORTED_MODULE_0__);
/* harmony import */ var node_url__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! node:url */ "node:url");
/* harmony import */ var node_url__WEBPACK_IMPORTED_MODULE_1___default = /*#__PURE__*/__webpack_require__.n(node_url__WEBPACK_IMPORTED_MODULE_1__);
/* harmony import */ var _cmake__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! @/cmake */ "./src/cmake/index.ts");
/* harmony import */ var _utils_Path__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! @/utils/Path */ "./src/utils/Path.ts");
/* harmony import */ var _utils_MakePatch__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! @/utils/MakePatch */ "./src/utils/MakePatch.ts");
/* harmony import */ var _utils_FileSystem__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(/*! @/utils/FileSystem */ "./src/utils/FileSystem.ts");
/* harmony import */ var _utils_SettingsStorage__WEBPACK_IMPORTED_MODULE_6__ = __webpack_require__(/*! @/utils/SettingsStorage */ "./src/utils/SettingsStorage.ts");
/* harmony import */ var _utils_Primitives__WEBPACK_IMPORTED_MODULE_7__ = __webpack_require__(/*! @/utils/Primitives */ "./src/utils/Primitives.ts");
/* harmony import */ var _Constants__WEBPACK_IMPORTED_MODULE_8__ = __webpack_require__(/*! @/Constants */ "./src/Constants.ts");
/* harmony import */ var _core_Types__WEBPACK_IMPORTED_MODULE_9__ = __webpack_require__(/*! @/core/Types */ "./src/core/Types.ts");
/* harmony import */ var _utils_UrlScheme__WEBPACK_IMPORTED_MODULE_10__ = __webpack_require__(/*! @/utils/UrlScheme */ "./src/utils/UrlScheme.ts");
/* harmony import */ var _utils_Module__WEBPACK_IMPORTED_MODULE_11__ = __webpack_require__(/*! @/utils/Module */ "./src/utils/Module.ts");
/* harmony import */ var _utils_HttpRequest__WEBPACK_IMPORTED_MODULE_12__ = __webpack_require__(/*! @/utils/HttpRequest */ "./src/utils/HttpRequest.ts");
/* harmony import */ var _logger__WEBPACK_IMPORTED_MODULE_13__ = __webpack_require__(/*! @/logger */ "./src/logger/index.ts");
/* harmony import */ var _actions__WEBPACK_IMPORTED_MODULE_14__ = __webpack_require__(/*! @/actions */ "./src/actions/index.ts");
/*
 * MIT License
 *
 * Copyright (c) 2025  Yurii Yakubin (yurii.yakubin@gmail.com)
 *
 * Permission is granted to use, copy, modify, and distribute this software
 * under the MIT License. See LICENSE file for details.
 */

















const logger = _logger__WEBPACK_IMPORTED_MODULE_13__.Logger.create("file:///mnt/c/opt/work/source/darkit-sdk/external/bitmake/src/commands/build.ts");
;
function mergeEnvironment(...args) {
    const environment = {};
    for (const env of args) {
        const list = Object.entries(env || {});
        while (list.length) {
            let [key, val] = list.pop();
            let delimiter;
            let joinAfter = true;
            switch (key) {
                case "Path":
                case "PATH":
                    delimiter = _utils_Path__WEBPACK_IMPORTED_MODULE_3__.Path.delimiter;
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
            for (const iter of (0,_utils_Primitives__WEBPACK_IMPORTED_MODULE_7__.arrayWrapper)(otherIter.base)) {
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
                    (0,_utils_Primitives__WEBPACK_IMPORTED_MODULE_7__.assignObject)(newEntry, iter);
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
                if (config.hasOwnProperty(name))
                    sel = config[name];
                else if (config !== entryConfig && entryConfig.hasOwnProperty(name))
                    sel = entryConfig[name];
                else if (config !== rootConfig && rootConfig.hasOwnProperty(name))
                    sel = rootConfig[name];
                else {
                    try {
                        const mainFile = (0,_utils_Module__WEBPACK_IMPORTED_MODULE_11__.requireResolve)(name);
                        if (mainFile) {
                            sel = { mainFile, mainDir: _utils_Path__WEBPACK_IMPORTED_MODULE_3__.Path.dirname(mainFile), };
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
function makeBuildConfig(gconfig, config) {
    if (config["sourceRoot"]) {
        throw new Error(`Variable "sourceRoot" cannot be changed to "${config.sourceRoot}"`);
    }
    const rootConfig = rebaseConfig(config);
    rootConfig.buildType = rootConfig.buildType || gconfig.buildType;
    rootConfig.sourceRoot = rootConfig.sourceRoot || gconfig.workDir;
    rootConfig.binaryRoot = rootConfig.binaryRoot || _utils_Path__WEBPACK_IMPORTED_MODULE_3__.Path.join(gconfig.workDir, "build");
    for (const [key, entry] of Object.entries(rootConfig)) {
        if (entry && typeof entry === "object" && entry.action) {
            entry.buildType = entry.buildType || rootConfig.buildType;
            const folder = key.replace(":", _utils_Path__WEBPACK_IMPORTED_MODULE_3__.Path.sep);
            const workDir = _utils_Path__WEBPACK_IMPORTED_MODULE_3__.Path.join(rootConfig.binaryRoot, folder);
            entry.tempDir = entry.tempDir || _utils_Path__WEBPACK_IMPORTED_MODULE_3__.Path.join(workDir, "tmp");
            if (entry.sourceUrl) {
                if (entry.sourceUrl.startsWith(_utils_UrlScheme__WEBPACK_IMPORTED_MODULE_10__.IMPORT_SCHEME)) {
                    const filename = (0,_utils_Module__WEBPACK_IMPORTED_MODULE_11__.requireResolve)(entry.sourceUrl.slice(_utils_UrlScheme__WEBPACK_IMPORTED_MODULE_10__.IMPORT_SCHEME.length));
                    entry.sourceDir = _utils_Path__WEBPACK_IMPORTED_MODULE_3__.Path.dirname(filename);
                }
                else {
                    entry.archiveDir = entry.archiveDir || _utils_Path__WEBPACK_IMPORTED_MODULE_3__.Path.join(workDir, "arc");
                    entry.extractDir = entry.extractDir || _utils_Path__WEBPACK_IMPORTED_MODULE_3__.Path.join(workDir, "src");
                    if (!entry.sourceDir)
                        entry.sourceDir = entry.extractDir;
                    else if (!_utils_Path__WEBPACK_IMPORTED_MODULE_3__.Path.isAbsolute(entry.sourceDir))
                        entry.sourceDir = _utils_Path__WEBPACK_IMPORTED_MODULE_3__.Path.join(entry.extractDir, entry.sourceDir);
                }
            }
            else if (!entry.sourceDir) {
                throw new Error(`Missing sourceDir for ${key} action"`);
            }
            if (entry.binaryDir === null)
                entry.binaryDir = entry.sourceDir;
            else if (entry.binaryDir === undefined)
                entry.binaryDir = _utils_Path__WEBPACK_IMPORTED_MODULE_3__.Path.join(workDir, "bin");
        }
    }
    resolveConfigStrings(rootConfig);
    return rootConfig;
}
async function doExtractArchive(gconfig, environment, config, settings) {
    if (!config.sourceUrl)
        throw new Error("Unknown sourceUrl");
    if (!config.archiveDir)
        throw new Error("Unknown archiveDir");
    if (!config.extractDir)
        throw new Error("Unknown extractDir");
    if (!await (0,_utils_FileSystem__WEBPACK_IMPORTED_MODULE_5__.directoryExists)(config.archiveDir)) {
        logger.notice(`mkdir -p ${config.archiveDir}`);
        await node_fs__WEBPACK_IMPORTED_MODULE_0___default().promises.mkdir(config.archiveDir, { recursive: true });
    }
    if (!await (0,_utils_FileSystem__WEBPACK_IMPORTED_MODULE_5__.directoryExists)(config.tempDir)) {
        logger.notice(`mkdir -p ${config.tempDir}`);
        await node_fs__WEBPACK_IMPORTED_MODULE_0___default().promises.mkdir(config.tempDir, { recursive: true });
    }
    const arcName = _utils_Path__WEBPACK_IMPORTED_MODULE_3__.Path.basename(config.sourceUrl);
    let arcFile;
    let downloadUrls = await settings.get("downloadUrls") || {};
    if (downloadUrls[config.sourceUrl])
        arcFile = downloadUrls[config.sourceUrl];
    else {
        arcFile = _utils_Path__WEBPACK_IMPORTED_MODULE_3__.Path.join(config.archiveDir, arcName);
        await (0,_utils_HttpRequest__WEBPACK_IMPORTED_MODULE_12__.downloadFile)(config.sourceUrl, arcFile, { attempts: _Constants__WEBPACK_IMPORTED_MODULE_8__.REQUEST_ATTEMPTS });
        downloadUrls[config.sourceUrl] = arcFile;
        await settings.set("downloadUrls", downloadUrls);
    }
    let extractDir;
    let extractFiles = await settings.get("extractFiles") || {};
    if (extractFiles[arcFile]) {
        extractDir = extractFiles[arcFile];
    }
    else {
        extractDir = await node_fs__WEBPACK_IMPORTED_MODULE_0___default().promises.mkdtemp(_utils_Path__WEBPACK_IMPORTED_MODULE_3__.Path.resolve(config.tempDir, arcName + '.'));
        await _cmake__WEBPACK_IMPORTED_MODULE_2__.CMakeProcess.getInstance().extract({
            environment,
            filename: arcFile,
            workDir: extractDir,
            logFile: _utils_Path__WEBPACK_IMPORTED_MODULE_3__.Path.join(config.tempDir, _utils_Path__WEBPACK_IMPORTED_MODULE_3__.Path.basename(extractDir) + ".log"),
        });
        const extractList = await node_fs__WEBPACK_IMPORTED_MODULE_0___default().promises.readdir(extractDir);
        if (extractList.length === 1) {
            extractDir = _utils_Path__WEBPACK_IMPORTED_MODULE_3__.Path.resolve(extractDir, extractList[0]);
            if (!await (0,_utils_FileSystem__WEBPACK_IMPORTED_MODULE_5__.directoryExists)(extractDir)) {
                logger.notice(`rm -fr ${extractDir}`);
                await node_fs__WEBPACK_IMPORTED_MODULE_0___default().promises.rm(extractDir, { recursive: true });
                throw new Error(`Support only directory for archive`);
            }
        }
        if (await (0,_utils_FileSystem__WEBPACK_IMPORTED_MODULE_5__.directoryExists)(config.extractDir)) {
            // TODO: Marge extractDir with output
            logger.notice(`rm -fr ${config.extractDir}`);
            await node_fs__WEBPACK_IMPORTED_MODULE_0___default().promises.rm(config.extractDir, { recursive: true });
        }
        else {
            const parentDir = _utils_Path__WEBPACK_IMPORTED_MODULE_3__.Path.dirname(config.extractDir);
            if (!await (0,_utils_FileSystem__WEBPACK_IMPORTED_MODULE_5__.directoryExists)(parentDir)) {
                logger.notice(`mkdir -p ${parentDir}`);
                await node_fs__WEBPACK_IMPORTED_MODULE_0___default().promises.mkdir(parentDir, { recursive: true });
            }
        }
        logger.notice(`mv ${extractDir} ${config.extractDir}`);
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
async function doTargetBuild(gconfig, environment, config, settings) {
    if (config.preAction) {
        await settings.push("preAction");
        const newConfig = {};
        (0,_utils_Primitives__WEBPACK_IMPORTED_MODULE_7__.assignObject)(newConfig, config);
        delete newConfig.action;
        delete newConfig.preAction;
        delete newConfig.postAction;
        (0,_utils_Primitives__WEBPACK_IMPORTED_MODULE_7__.assignObject)(newConfig, config.preAction);
        const newEnvironment = mergeEnvironment(config.preAction.environment, environment);
        await doTargetBuild(gconfig, newEnvironment, newConfig, settings);
        await settings.pop();
    }
    if (Array.isArray(config.action)) {
        await settings.push("action");
        for (var i = 0; i < config.action.length; ++i) {
            await settings.push(i.toString());
            const newConfig = {};
            (0,_utils_Primitives__WEBPACK_IMPORTED_MODULE_7__.assignObject)(newConfig, config);
            delete newConfig.action;
            delete newConfig.preAction;
            delete newConfig.postAction;
            (0,_utils_Primitives__WEBPACK_IMPORTED_MODULE_7__.assignObject)(newConfig, config.action[i]);
            const newEnvironment = mergeEnvironment(config.action[i].environment, environment);
            await doTargetBuild(gconfig, newEnvironment, newConfig, settings);
            await settings.pop();
        }
        await settings.pop();
    }
    else {
        if (!await (0,_utils_FileSystem__WEBPACK_IMPORTED_MODULE_5__.directoryExists)(config.binaryDir)) {
            await node_fs__WEBPACK_IMPORTED_MODULE_0___default().promises.mkdir(config.binaryDir, { recursive: true });
        }
        if (_actions__WEBPACK_IMPORTED_MODULE_14__["default"][config.action]) {
            config.description && logger.notice(config.description);
            await _actions__WEBPACK_IMPORTED_MODULE_14__["default"][config.action](config, environment, settings);
        }
    }
    if (config.postAction) {
        await settings.push("postAction");
        const newConfig = {};
        (0,_utils_Primitives__WEBPACK_IMPORTED_MODULE_7__.assignObject)(newConfig, config);
        delete newConfig.action;
        delete newConfig.preAction;
        delete newConfig.postAction;
        (0,_utils_Primitives__WEBPACK_IMPORTED_MODULE_7__.assignObject)(newConfig, config.postAction);
        const newEnvironment = mergeEnvironment(config.postAction.environment, environment);
        await doTargetBuild(gconfig, newEnvironment, newConfig, settings);
        await settings.pop();
    }
}
async function getUserConfig(options) {
    let configPath;
    if (options.env.config) {
        configPath = _utils_Path__WEBPACK_IMPORTED_MODULE_3__.Path.isAbsolute(options.env.config) ? options.env.config : _utils_Path__WEBPACK_IMPORTED_MODULE_3__.Path.resolve(options.workDir, options.env.config);
        if (!await (0,_utils_FileSystem__WEBPACK_IMPORTED_MODULE_5__.fileExists)(configPath))
            throw `Configuration '${options.env.config}' file does not exist`;
    }
    else {
        const userConfigPath = _utils_Path__WEBPACK_IMPORTED_MODULE_3__.Path.resolve(options.workDir, _Constants__WEBPACK_IMPORTED_MODULE_8__.USER_CONFIG);
        if (await (0,_utils_FileSystem__WEBPACK_IMPORTED_MODULE_5__.fileExists)(userConfigPath))
            configPath = userConfigPath;
        else {
            logger.warn(`Config file '${_Constants__WEBPACK_IMPORTED_MODULE_8__.USER_CONFIG}' is not available`);
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
    const configUrl = node_url__WEBPACK_IMPORTED_MODULE_1___default().pathToFileURL(configPath);
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
    const gconfig = {
        buildType: options.env.buildType == _core_Types__WEBPACK_IMPORTED_MODULE_9__.DEBUG_BUILD_TYPE ? options.env.buildType : _core_Types__WEBPACK_IMPORTED_MODULE_9__.RELEASE_BUILD_TYPE,
        workDir: options.workDir,
    };
    const userConfig = await getUserConfig(options);
    const buildConfig = makeBuildConfig(gconfig, userConfig);
    if (buildConfig.RECIPE_CONTENT_FILE) {
        const jsonConfig = JSON.stringify(buildConfig, null, 2);
        await (0,_utils_FileSystem__WEBPACK_IMPORTED_MODULE_5__.saveIfDifferent)(buildConfig.RECIPE_CONTENT_FILE, jsonConfig);
    }
    const settingsFilename = _utils_Path__WEBPACK_IMPORTED_MODULE_3__.Path.resolve(buildConfig.binaryRoot, _Constants__WEBPACK_IMPORTED_MODULE_8__.BUILD_SETTINGS_FILE);
    const settings = new _utils_SettingsStorage__WEBPACK_IMPORTED_MODULE_6__.SettingsStorage(settingsFilename);
    for (const [key, entry] of Object.entries(buildConfig)) {
        if (entry && typeof entry === "object" && entry.action && !entry.disabled) {
            await settings.push(key);
            const completed = await settings.get("completed");
            if (entry.rebuild || !completed) {
                logger.info(`Started action: ${key}`);
                const environment = mergeEnvironment(entry.environment, process.env);
                if (entry.sourceUrl && !entry.sourceUrl.startsWith(_utils_UrlScheme__WEBPACK_IMPORTED_MODULE_10__.IMPORT_SCHEME)) {
                    await doExtractArchive(gconfig, environment, entry, settings);
                }
                await doTargetBuild(gconfig, environment, entry, settings);
                await settings.set("completed", true);
                logger.info(`Completed action: ${key}`);
            }
            await settings.pop();
        }
    }
});


/***/ }),

/***/ "./src/commands/index.ts":
/*!*******************************!*\
  !*** ./src/commands/index.ts ***!
  \*******************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (__WEBPACK_DEFAULT_EXPORT__)
/* harmony export */ });
/* harmony import */ var _commands_init__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! @/commands/init */ "./src/commands/init.ts");
/* harmony import */ var _commands_build__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! @/commands/build */ "./src/commands/build.ts");
/*
 * MIT License
 *
 * Copyright (c) 2025  Yurii Yakubin (yurii.yakubin@gmail.com)
 *
 * Permission is granted to use, copy, modify, and distribute this software
 * under the MIT License. See LICENSE file for details.
 */


/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = ({
    default: _commands_build__WEBPACK_IMPORTED_MODULE_1__["default"],
    init: _commands_init__WEBPACK_IMPORTED_MODULE_0__["default"],
    build: _commands_build__WEBPACK_IMPORTED_MODULE_1__["default"],
});


/***/ }),

/***/ "./src/commands/init.ts":
/*!******************************!*\
  !*** ./src/commands/init.ts ***!
  \******************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (/* export default binding */ __WEBPACK_DEFAULT_EXPORT__)
/* harmony export */ });
/* harmony import */ var node_path__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! node:path */ "node:path");
/* harmony import */ var node_path__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(node_path__WEBPACK_IMPORTED_MODULE_0__);
/* harmony import */ var node_fs__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! node:fs */ "node:fs");
/* harmony import */ var node_fs__WEBPACK_IMPORTED_MODULE_1___default = /*#__PURE__*/__webpack_require__.n(node_fs__WEBPACK_IMPORTED_MODULE_1__);
/* harmony import */ var _utils_FileSystem__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! @/utils/FileSystem */ "./src/utils/FileSystem.ts");
/* harmony import */ var _Constants__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! @/Constants */ "./src/Constants.ts");
/* harmony import */ var _logger__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! @/logger */ "./src/logger/index.ts");
/*
 * MIT License
 *
 * Copyright (c) 2025  Yurii Yakubin (yurii.yakubin@gmail.com)
 *
 * Permission is granted to use, copy, modify, and distribute this software
 * under the MIT License. See LICENSE file for details.
 */





const logger = _logger__WEBPACK_IMPORTED_MODULE_4__.Logger.create("file:///mnt/c/opt/work/source/darkit-sdk/external/bitmake/src/commands/init.ts");
/* harmony default export */ async function __WEBPACK_DEFAULT_EXPORT__(options) {
    const preset = options.env.preset;
    if (!preset)
        throw new Error(`Preset '${preset}' is not available`);
    const presetData = await (0,_utils_FileSystem__WEBPACK_IMPORTED_MODULE_2__.fetchBuffer)(preset);
    const userConfigPath = node_path__WEBPACK_IMPORTED_MODULE_0___default().resolve(options.workDir, _Constants__WEBPACK_IMPORTED_MODULE_3__.USER_CONFIG);
    if (await (0,_utils_FileSystem__WEBPACK_IMPORTED_MODULE_2__.fileExists)(userConfigPath))
        await node_fs__WEBPACK_IMPORTED_MODULE_1___default().promises.rm(userConfigPath);
    await node_fs__WEBPACK_IMPORTED_MODULE_1___default().promises.writeFile(userConfigPath, presetData, "utf8");
    logger.info(`Preset '${preset}' installed successfully`);
}


/***/ }),

/***/ "./src/core/AbsolutePath.ts":
/*!**********************************!*\
  !*** ./src/core/AbsolutePath.ts ***!
  \**********************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   AbsolutePath: () => (/* binding */ AbsolutePath)
/* harmony export */ });
/* harmony import */ var node_url__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! node:url */ "node:url");
/* harmony import */ var node_url__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(node_url__WEBPACK_IMPORTED_MODULE_0__);
/* harmony import */ var _utils_Path__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! @/utils/Path */ "./src/utils/Path.ts");
/* harmony import */ var _utils_UrlScheme__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! @/utils/UrlScheme */ "./src/utils/UrlScheme.ts");
/* harmony import */ var node_path__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! node:path */ "node:path");
/* harmony import */ var node_path__WEBPACK_IMPORTED_MODULE_3___default = /*#__PURE__*/__webpack_require__.n(node_path__WEBPACK_IMPORTED_MODULE_3__);
/*
 * MIT License
 *
 * Copyright (c) 2025  Yurii Yakubin (yurii.yakubin@gmail.com)
 *
 * Permission is granted to use, copy, modify, and distribute this software
 * under the MIT License. See LICENSE file for details.
 */




const PATH = Symbol("PATH");
class AbsolutePath {
    [PATH];
    constructor(filepath) {
        if (filepath.startsWith(_utils_UrlScheme__WEBPACK_IMPORTED_MODULE_2__.FILE_SCHEME)) {
            this[PATH] = filepath;
        }
        else if (_utils_Path__WEBPACK_IMPORTED_MODULE_1__.Path.isAbsolute(filepath)) {
            this[PATH] = node_url__WEBPACK_IMPORTED_MODULE_0___default().pathToFileURL(filepath).toString();
        }
        else {
            throw new Error(`Not supported relative path of "${filepath}"`);
        }
    }
    join(...paths) {
        const filepath = _utils_Path__WEBPACK_IMPORTED_MODULE_1__.Path.join(node_url__WEBPACK_IMPORTED_MODULE_0___default().fileURLToPath(this[PATH]), ...paths.map(i => i.toString()));
        return AbsolutePath.create(filepath);
    }
    dirname() {
        return AbsolutePath.create(node_path__WEBPACK_IMPORTED_MODULE_3___default().posix.dirname(this[PATH]));
    }
    basename() {
        return node_path__WEBPACK_IMPORTED_MODULE_3___default().posix.basename(this[PATH]);
    }
    relative(to) {
        return _utils_Path__WEBPACK_IMPORTED_MODULE_1__.Path.relative(node_url__WEBPACK_IMPORTED_MODULE_0___default().fileURLToPath(this[PATH]), AbsolutePath.create(to).toString());
    }
    resolve(...paths) {
        return AbsolutePath.create(_utils_Path__WEBPACK_IMPORTED_MODULE_1__.Path.resolve(node_url__WEBPACK_IMPORTED_MODULE_0___default().fileURLToPath(this[PATH]), ...paths.map(i => i.toString())));
    }
    match(regexp) {
        return this[PATH].match(regexp);
    }
    toString() {
        return node_url__WEBPACK_IMPORTED_MODULE_0___default().fileURLToPath(this[PATH]);
    }
    valueOf() {
        return node_url__WEBPACK_IMPORTED_MODULE_0___default().fileURLToPath(this[PATH]);
    }
    toJSON() {
        return this[PATH];
    }
    static isAbsolute(filepath) {
        if (filepath instanceof AbsolutePath)
            return true;
        return _utils_Path__WEBPACK_IMPORTED_MODULE_1__.Path.isAbsolute(filepath);
    }
    static ensureInstance(value) {
        if (value instanceof AbsolutePath)
            return value;
        throw new Error(`The '${value}' is not a AbsolutePath`);
    }
    static create(path) {
        if (path instanceof AbsolutePath)
            return path;
        return Object.seal(new AbsolutePath(path));
    }
}
;


/***/ }),

/***/ "./src/core/BaseContext.ts":
/*!*********************************!*\
  !*** ./src/core/BaseContext.ts ***!
  \*********************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   BaseContext: () => (/* binding */ BaseContext),
/* harmony export */   createContext: () => (/* binding */ createContext),
/* harmony export */   createVariableMapForDirectory: () => (/* binding */ createVariableMapForDirectory),
/* harmony export */   performContext: () => (/* binding */ performContext)
/* harmony export */ });
/* harmony import */ var _core_FindProgram__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! @/core/FindProgram */ "./src/core/FindProgram.ts");
/* harmony import */ var _core_Scope__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! @/core/Scope */ "./src/core/Scope.ts");
/* harmony import */ var _logger__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! @/logger */ "./src/logger/index.ts");
/* harmony import */ var _core_AbsolutePath__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! @/core/AbsolutePath */ "./src/core/AbsolutePath.ts");
/* harmony import */ var _utils_Module__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! @/utils/Module */ "./src/utils/Module.ts");
/*
 * MIT License
 *
 * Copyright (c) 2025  Yurii Yakubin (yurii.yakubin@gmail.com)
 *
 * Permission is granted to use, copy, modify, and distribute this software
 * under the MIT License. See LICENSE file for details.
 */





const logger = _logger__WEBPACK_IMPORTED_MODULE_2__.Logger.create("file:///mnt/c/opt/work/source/darkit-sdk/external/bitmake/src/core/BaseContext.ts");
const VARIABLE_MAP = Symbol("VARIABLE_MAP");
class BaseContext {
    [VARIABLE_MAP];
    constructor(variableMap) {
        this[VARIABLE_MAP] = variableMap;
    }
    findProgram(name) {
        return (0,_core_FindProgram__WEBPACK_IMPORTED_MODULE_0__.findProgramSync)(name);
    }
    // MakeObject
    getProperty(name) {
        return _core_Scope__WEBPACK_IMPORTED_MODULE_1__.ScopeHelper.get(this[VARIABLE_MAP], name);
    }
    setProperty(name, value) {
        const entry = this[VARIABLE_MAP][name];
        if (entry)
            _core_Scope__WEBPACK_IMPORTED_MODULE_1__.ScopeHelper.setEntryValue(entry, value);
        else
            _core_Scope__WEBPACK_IMPORTED_MODULE_1__.ScopeHelper.defineVariable(this[VARIABLE_MAP], "", name, { value });
        return true;
    }
    hasProperty(name) {
        return Object.hasOwn(this[VARIABLE_MAP], name);
    }
    deleteProperty(name) {
        return delete this[VARIABLE_MAP][name];
    }
    getPropertyNames() {
        return Object.keys(this[VARIABLE_MAP]);
    }
}
;
function createContext(ctx) {
    const handler = {
        get(target, name, receiver) {
            if (name in target)
                return target[name];
            return target.getProperty(name);
        },
        set(target, name, value) {
            target.setProperty(name, value);
            return true;
        },
        has(target, name) {
            return name in target || target.hasProperty(name);
        },
        ownKeys(target) {
            return target.getPropertyNames();
        },
        deleteProperty(target, name) {
            return target.deleteProperty(name);
        },
        getOwnPropertyDescriptor(target, name) {
            if (target.hasProperty(name)) {
                const value = target.getProperty(name);
                return { value, writable: true, enumerable: true, configurable: true };
            }
            return undefined;
        },
    };
    return new Proxy(ctx, handler);
}
async function performContext(mk) {
    const scriptUrl = mk.SCRIPT_FILE.toJSON();
    const module = await (0,_utils_Module__WEBPACK_IMPORTED_MODULE_4__.importModule)(scriptUrl);
    if (!module.default)
        throw new Error(`Script ${scriptUrl} has not contain a default function`);
    const result = module.default(mk);
    if (result instanceof Promise)
        await result;
}
function createVariableMapForDirectory(variableMap, sourceDir, binaryDir) {
    if (binaryDir === undefined) {
        if (!_core_AbsolutePath__WEBPACK_IMPORTED_MODULE_3__.AbsolutePath.isAbsolute(sourceDir))
            binaryDir = sourceDir;
        else {
            const binaryDir1 = _core_Scope__WEBPACK_IMPORTED_MODULE_1__.ScopeHelper.get(variableMap, "PROJECT_BINARY_DIR").relative(sourceDir);
            const binaryDir2 = _core_Scope__WEBPACK_IMPORTED_MODULE_1__.ScopeHelper.get(variableMap, "PROJECT_SOURCE_DIR").relative(sourceDir);
            binaryDir = (binaryDir1.length > binaryDir2.length) ? binaryDir2 : binaryDir1;
        }
    }
    const SOURCE_DIR = _core_Scope__WEBPACK_IMPORTED_MODULE_1__.ScopeHelper.get(variableMap, "SOURCE_DIR").resolve(sourceDir);
    const BINARY_DIR = _core_Scope__WEBPACK_IMPORTED_MODULE_1__.ScopeHelper.get(variableMap, "BINARY_DIR").resolve(binaryDir);
    const newVariableMap = _core_Scope__WEBPACK_IMPORTED_MODULE_1__.ScopeHelper.cloneVariableMap(variableMap);
    _core_Scope__WEBPACK_IMPORTED_MODULE_1__.ScopeHelper.set(newVariableMap, "SOURCE_DIR", SOURCE_DIR);
    _core_Scope__WEBPACK_IMPORTED_MODULE_1__.ScopeHelper.set(newVariableMap, "BINARY_DIR", BINARY_DIR);
    _core_Scope__WEBPACK_IMPORTED_MODULE_1__.ScopeHelper.reset(newVariableMap, "SCRIPT_DIR");
    _core_Scope__WEBPACK_IMPORTED_MODULE_1__.ScopeHelper.reset(newVariableMap, "SCRIPT_FILE");
    return newVariableMap;
}


/***/ }),

/***/ "./src/core/BuildinScripts/c_header.ts":
/*!*********************************************!*\
  !*** ./src/core/BuildinScripts/c_header.ts ***!
  \*********************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (/* export default binding */ __WEBPACK_DEFAULT_EXPORT__)
/* harmony export */ });
/* harmony import */ var node_fs__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! node:fs */ "node:fs");
/* harmony import */ var node_fs__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(node_fs__WEBPACK_IMPORTED_MODULE_0__);
/* harmony import */ var _cxx__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! @/cxx */ "./src/cxx/index.ts");
/*
 * MIT License
 *
 * Copyright (c) 2025  Yurii Yakubin (yurii.yakubin@gmail.com)
 *
 * Permission is granted to use, copy, modify, and distribute this software
 * under the MIT License. See LICENSE file for details.
 */


/* harmony default export */ async function __WEBPACK_DEFAULT_EXPORT__(mk) {
    const lines = [];
    lines.push((0,_cxx__WEBPACK_IMPORTED_MODULE_1__.generatedScriptNameComment)(/* unsupported import.meta.filename */ undefined));
    lines.push("");
    for (const [name, entry] of Object.entries(mk.SCRIPT_INPUT)) {
        if (entry.description) {
            lines.push(`/* ${entry.description} */`);
        }
        if (typeof entry.value === "boolean") {
            lines.push(`#define ${name} ${entry.value ? 1 : 0}`);
        }
        else if (typeof entry.value === "number") {
            lines.push(`#define ${name} ${entry.value}`);
        }
        else if (typeof entry.value === "string") {
            lines.push(`#define ${name} "${entry.value}"`);
        }
        else if (Array.isArray(entry.value)) {
            lines.push(`#define ${name} "${entry.value.join(";")}"`);
        }
        else {
            throw new Error(`"${name}" has ${entry.value} value`);
        }
        lines.push("");
    }
    await node_fs__WEBPACK_IMPORTED_MODULE_0___default().promises.mkdir(mk.SCRIPT_OUTPUT.dirname().toString(), { recursive: true });
    await node_fs__WEBPACK_IMPORTED_MODULE_0___default().promises.writeFile(mk.SCRIPT_OUTPUT.toString(), lines.join("\n"), "utf-8");
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
/*
 * MIT License
 *
 * Copyright (c) 2025  Yurii Yakubin (yurii.yakubin@gmail.com)
 *
 * Permission is granted to use, copy, modify, and distribute this software
 * under the MIT License. See LICENSE file for details.
 */

/* harmony default export */ async function __WEBPACK_DEFAULT_EXPORT__(mk) {
    let content = await node_fs__WEBPACK_IMPORTED_MODULE_0___default().promises.readFile(mk.SCRIPT_INPUT.toString(), "utf-8");
    content = content.replace(/@([_A-Za-z][_A-Za-z0-9]+)@/g, (match, v1) => {
        const res = mk[v1] || "";
        if (Array.isArray(res))
            return res.join("\n");
        return res.toString();
    });
    content = content.replace(/#cmakedefine +([_A-Za-z][_A-Za-z0-9]+) *(.*)/g, (match, v1, v2) => {
        return mk[v1] ? `#define ${v1} ${v2}` : `/* #undef ${v1} */`;
    });
    await node_fs__WEBPACK_IMPORTED_MODULE_0___default().promises.mkdir(mk.SCRIPT_OUTPUT.dirname().toString(), { recursive: true });
    await node_fs__WEBPACK_IMPORTED_MODULE_0___default().promises.writeFile(mk.SCRIPT_OUTPUT.toString(), content, "utf-8");
}


/***/ }),

/***/ "./src/core/BuildinScripts/index.ts":
/*!******************************************!*\
  !*** ./src/core/BuildinScripts/index.ts ***!
  \******************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (__WEBPACK_DEFAULT_EXPORT__)
/* harmony export */ });
/* harmony import */ var _core_BuildinScripts_configure_file__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! @/core/BuildinScripts/configure_file */ "./src/core/BuildinScripts/configure_file.ts");
/* harmony import */ var _core_BuildinScripts_c_header__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! @/core/BuildinScripts/c_header */ "./src/core/BuildinScripts/c_header.ts");
/*
 * MIT License
 *
 * Copyright (c) 2025  Yurii Yakubin (yurii.yakubin@gmail.com)
 *
 * Permission is granted to use, copy, modify, and distribute this software
 * under the MIT License. See LICENSE file for details.
 */


/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = ({
    configure_file: _core_BuildinScripts_configure_file__WEBPACK_IMPORTED_MODULE_0__["default"],
    c_header: _core_BuildinScripts_c_header__WEBPACK_IMPORTED_MODULE_1__["default"],
});


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
const WORK_DIR = Symbol("WORK_DIR");
class CustomScript {
    [SCOPE];
    [NAME];
    [SCRIPT];
    [INPUT];
    [OUTPUT];
    [WORK_DIR];
    constructor(options) {
        this[SCOPE] = options.variableMap;
        this[NAME] = options.name || "";
        this[INPUT] = options.input;
        this[SCRIPT] = options.script;
        this[OUTPUT] = options.output;
        this[WORK_DIR] = options.workDir;
    }
    static create(options) {
        return Object.seal(new CustomScript(options));
    }
    mergeVariables(variables) {
        _core_Scope__WEBPACK_IMPORTED_MODULE_0__.ScopeHelper.mergeVariableMap(this[SCOPE], variables);
    }
    get NAME() {
        return this[NAME];
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
    get workDir() {
        return this[WORK_DIR];
    }
    get variableMap() {
        return this[SCOPE];
    }
    toJSON() {
        return {
            variableMap: this[SCOPE],
            NAME: this[NAME],
            SCRIPT: this.SCRIPT,
            INPUT: this.INPUT,
            OUTPUT: this.OUTPUT,
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


const logger = _logger__WEBPACK_IMPORTED_MODULE_1__.Logger.create("file:///mnt/c/opt/work/source/darkit-sdk/external/bitmake/src/core/DetermineCompiler.ts");
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
/* harmony import */ var _utils_Path__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! @/utils/Path */ "./src/utils/Path.ts");
/* harmony import */ var _utils_Host__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! @/utils/Host */ "./src/utils/Host.ts");
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
    if (_utils_Host__WEBPACK_IMPORTED_MODULE_1__.Host.executableSuffix)
        name += _utils_Host__WEBPACK_IMPORTED_MODULE_1__.Host.executableSuffix;
    const result = [];
    const paths = (process.env.PATH || "").split(_utils_Path__WEBPACK_IMPORTED_MODULE_0__.Path.delimiter);
    for (const iter of paths) {
        const filename = _utils_Path__WEBPACK_IMPORTED_MODULE_0__.Path.resolve(iter, name);
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

/***/ "./src/core/GoalCollection.ts":
/*!************************************!*\
  !*** ./src/core/GoalCollection.ts ***!
  \************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   GoalCollection: () => (/* binding */ GoalCollection)
/* harmony export */ });
/* harmony import */ var _logger__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! @/logger */ "./src/logger/index.ts");
/*
 * MIT License
 *
 * Copyright (c) 2025  Yurii Yakubin (yurii.yakubin@gmail.com)
 *
 * Permission is granted to use, copy, modify, and distribute this software
 * under the MIT License. See LICENSE file for details.
 */

const logger = _logger__WEBPACK_IMPORTED_MODULE_0__.Logger.create("file:///mnt/c/opt/work/source/darkit-sdk/external/bitmake/src/core/GoalCollection.ts");
const ENTRIES = Symbol("ENTRIES");
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
    add(worker) {
        if (worker.name && this[ENTRIES].find((i) => i.name === worker.name))
            throw new Error(`Nmae "${worker.name}" exists`);
        if (worker.output && this[ENTRIES].find((i) => i.output === worker.output))
            throw new Error(`Output "${worker.output}" exists`);
        this[ENTRIES].push(worker);
    }
    getTarget(name) {
        if (!name)
            return undefined;
        return this[ENTRIES].find((i) => i.name === name);
    }
    addTargetListImpl(name, result) {
        if (result.find(i => i.name === name || i.output === name)) {
            return;
        }
        const goal = this[ENTRIES].find(i => i.name === name || (i.output === name));
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
/* harmony import */ var _core_Target__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! @/core/Target */ "./src/core/Target.ts");
/* harmony import */ var _core_AbsolutePath__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! @/core/AbsolutePath */ "./src/core/AbsolutePath.ts");
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
        if (typeof value === "string" || value instanceof _core_AbsolutePath__WEBPACK_IMPORTED_MODULE_1__.AbsolutePath) {
            value = scope.SOURCE_DIR.resolve(value.toString());
            value = _core_AbsolutePath__WEBPACK_IMPORTED_MODULE_1__.AbsolutePath.create(value);
            baseDir = baseDir || value.dirname();
        }
        else if (!(value instanceof _core_Target__WEBPACK_IMPORTED_MODULE_0__.UserIndirectTarget)) {
            throw new Error(`Not supportet value of ${value}`);
        }
        this[VALUE] = value;
        this[DESTINATION] = _core_AbsolutePath__WEBPACK_IMPORTED_MODULE_1__.AbsolutePath.create(scope.INSTALL_PREFIX.resolve(destination.toString()).toString());
        this[BASE_DIR] = baseDir ? _core_AbsolutePath__WEBPACK_IMPORTED_MODULE_1__.AbsolutePath.create(baseDir.toString()) : null;
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
    get variables() {
        return this[VARIABLES];
    }
    mergeVariables(variables) {
        _core_Scope__WEBPACK_IMPORTED_MODULE_0__.ScopeHelper.mergeVariables(this[VARIABLES], variables);
    }
    toJSON() {
        return {
            name: this[NAME],
            variableMap: this[VARIABLES],
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

/***/ "./src/core/LocalMakeContext.ts":
/*!**************************************!*\
  !*** ./src/core/LocalMakeContext.ts ***!
  \**************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   LocalMakeContext: () => (/* binding */ LocalMakeContext)
/* harmony export */ });
/* harmony import */ var _utils_FileSystem__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! @/utils/FileSystem */ "./src/utils/FileSystem.ts");
/* harmony import */ var _core_InstallEntity__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! @/core/InstallEntity */ "./src/core/InstallEntity.ts");
/* harmony import */ var _core_Target__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! @/core/Target */ "./src/core/Target.ts");
/* harmony import */ var _core_Scope__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! @/core/Scope */ "./src/core/Scope.ts");
/* harmony import */ var _utils_Module__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! @/utils/Module */ "./src/utils/Module.ts");
/* harmony import */ var _Constants__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(/*! @/Constants */ "./src/Constants.ts");
/* harmony import */ var _logger__WEBPACK_IMPORTED_MODULE_6__ = __webpack_require__(/*! @/logger */ "./src/logger/index.ts");
/*
 * MIT License
 *
 * Copyright (c) 2025  Yurii Yakubin (yurii.yakubin@gmail.com)
 *
 * Permission is granted to use, copy, modify, and distribute this software
 * under the MIT License. See LICENSE file for details.
 */







const logger = _logger__WEBPACK_IMPORTED_MODULE_6__.Logger.create("file:///mnt/c/opt/work/source/darkit-sdk/external/bitmake/src/core/LocalMakeContext.ts");
class LocalMakeContext {
    _scope;
    _project;
    _targets = new Map();
    _indirectTargets = new Map();
    constructor(scope, project) {
        this._scope = scope;
        this._project = project;
    }
    get targets() {
        return this._targets;
    }
    get indirectTargets() {
        return this._indirectTargets;
    }
    executeScript(script, params) {
        this._project.executeScriptSync(this._scope, script, params);
    }
    getCacheVariables() {
        return _core_Scope__WEBPACK_IMPORTED_MODULE_3__.ScopeHelper.getVariablesByGroup(this._scope, _Constants__WEBPACK_IMPORTED_MODULE_5__.CUSTOM_VARIABLE_GROUP);
    }
    addCacheVariables(params) {
        let variables = params;
        if (typeof params === "string") {
            const filename = _core_Scope__WEBPACK_IMPORTED_MODULE_3__.ScopeHelper.get(this._scope, "SOURCE_DIR").resolve(params).toString();
            if (!(0,_utils_FileSystem__WEBPACK_IMPORTED_MODULE_0__.fileExistsSync)(filename))
                return;
            variables = (0,_utils_Module__WEBPACK_IMPORTED_MODULE_4__.requireSync)(filename);
        }
        _core_Scope__WEBPACK_IMPORTED_MODULE_3__.ScopeHelper.defineVariablesInVariableMap(this._scope, _Constants__WEBPACK_IMPORTED_MODULE_5__.CUSTOM_VARIABLE_GROUP, variables);
    }
    addIncludeDirectories(...dirs) {
        const sourceDir = _core_Scope__WEBPACK_IMPORTED_MODULE_3__.ScopeHelper.get(this._scope, "SOURCE_DIR");
        for (const iter of dirs.flat())
            _core_Scope__WEBPACK_IMPORTED_MODULE_3__.ScopeHelper.get(this._scope, "INCLUDES").push(sourceDir.resolve(iter));
    }
    addSubdirectory(sourceDir, binaryDir) {
        this._project.addSubdirectory(this._scope, sourceDir, binaryDir);
    }
    addCustomScript(script, params) {
        const newVariableMap = _core_Scope__WEBPACK_IMPORTED_MODULE_3__.ScopeHelper.cloneVariableMap(this._scope);
        _core_Scope__WEBPACK_IMPORTED_MODULE_3__.ScopeHelper.extendVariableMapByValues(newVariableMap, _Constants__WEBPACK_IMPORTED_MODULE_5__.CUSTOM_VARIABLE_GROUP, params);
        _core_Scope__WEBPACK_IMPORTED_MODULE_3__.ScopeHelper.set(newVariableMap, "SCRIPT_MODULE", script);
        return this._project.addCustomScript(newVariableMap);
    }
    target(name) {
        let target = this._indirectTargets.get(name);
        if (!target) {
            const impl = this._project.getTarget(name);
            target = _core_Target__WEBPACK_IMPORTED_MODULE_2__.UserIndirectTarget.create(impl, this._scope, name);
            this._indirectTargets.set(name, target);
        }
        return target;
    }
    script(name) {
        return this._project.getInterfaceScript(this._scope, name);
    }
    install(value, params) {
        const scope = _core_Scope__WEBPACK_IMPORTED_MODULE_3__.ScopeHelper.createVariableValues(this._scope);
        for (const it of [value].flat()) {
            const iter = (it instanceof _core_Target__WEBPACK_IMPORTED_MODULE_2__.BaseTarget) ? this.target(it.targetName) : it;
            const entity = _core_InstallEntity__WEBPACK_IMPORTED_MODULE_1__.InstallEntity.create(scope, iter, params);
            this._project.addInstallEntry(entity);
        }
    }
    addObjectLibrary(name, ...sources) {
        const target = this._project.addObjectLibrary(this._scope, name);
        this._targets.set(name, target);
        target.addSources(...sources);
        return target;
    }
    addStaticLibrary(name, ...sources) {
        const target = this._project.addStaticLibrary(this._scope, name);
        this._targets.set(name, target);
        target.addSources(...sources);
        return target;
    }
    addSharedLibrary(name, ...sources) {
        const target = this._project.addSharedLibrary(this._scope, name);
        this._targets.set(name, target);
        target.addSources(...sources);
        return target;
    }
    addExecutable(name, ...sources) {
        const target = this._project.addExecutable(this._scope, name);
        this._targets.set(name, target);
        target.addSources(...sources);
        return target;
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
/* harmony import */ var _core_BaseContext__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! @/core/BaseContext */ "./src/core/BaseContext.ts");
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
class PluginContext extends _core_BaseContext__WEBPACK_IMPORTED_MODULE_0__.BaseContext {
    [GLOBAL];
    [SCOPE];
    constructor(global, variableMap) {
        super(variableMap);
        this[GLOBAL] = global;
        this[SCOPE] = variableMap;
    }
    addSubdirectoryAlias(src, dest) {
        this[GLOBAL].addSubdirectoryAlias(this[SCOPE], src, dest);
    }
    static create(global, variableMap) {
        return (0,_core_BaseContext__WEBPACK_IMPORTED_MODULE_0__.createContext)(new PluginContext(global, variableMap));
    }
}
;


/***/ }),

/***/ "./src/core/ProjectContext.ts":
/*!************************************!*\
  !*** ./src/core/ProjectContext.ts ***!
  \************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   GoalWorkerImpl: () => (/* binding */ GoalWorkerImpl),
/* harmony export */   ProjectContext: () => (/* binding */ ProjectContext)
/* harmony export */ });
/* harmony import */ var node_fs__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! node:fs */ "node:fs");
/* harmony import */ var node_fs__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(node_fs__WEBPACK_IMPORTED_MODULE_0__);
/* harmony import */ var node_url__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! node:url */ "node:url");
/* harmony import */ var node_url__WEBPACK_IMPORTED_MODULE_1___default = /*#__PURE__*/__webpack_require__.n(node_url__WEBPACK_IMPORTED_MODULE_1__);
/* harmony import */ var node_child_process__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! node:child_process */ "node:child_process");
/* harmony import */ var node_child_process__WEBPACK_IMPORTED_MODULE_2___default = /*#__PURE__*/__webpack_require__.n(node_child_process__WEBPACK_IMPORTED_MODULE_2__);
/* harmony import */ var _Constants__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! @/Constants */ "./src/Constants.ts");
/* harmony import */ var _core_AbsolutePath__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! @/core/AbsolutePath */ "./src/core/AbsolutePath.ts");
/* harmony import */ var _utils_Path__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(/*! @/utils/Path */ "./src/utils/Path.ts");
/* harmony import */ var _utils_FileSystem__WEBPACK_IMPORTED_MODULE_6__ = __webpack_require__(/*! @/utils/FileSystem */ "./src/utils/FileSystem.ts");
/* harmony import */ var _core_TargetCollection__WEBPACK_IMPORTED_MODULE_7__ = __webpack_require__(/*! @/core/TargetCollection */ "./src/core/TargetCollection.ts");
/* harmony import */ var _core_ScriptCollection__WEBPACK_IMPORTED_MODULE_8__ = __webpack_require__(/*! @/core/ScriptCollection */ "./src/core/ScriptCollection.ts");
/* harmony import */ var _core_GoalCollection__WEBPACK_IMPORTED_MODULE_9__ = __webpack_require__(/*! @/core/GoalCollection */ "./src/core/GoalCollection.ts");
/* harmony import */ var _core_InterfaceScript__WEBPACK_IMPORTED_MODULE_10__ = __webpack_require__(/*! @/core/InterfaceScript */ "./src/core/InterfaceScript.ts");
/* harmony import */ var _core_UserMakeContext__WEBPACK_IMPORTED_MODULE_11__ = __webpack_require__(/*! @/core/UserMakeContext */ "./src/core/UserMakeContext.ts");
/* harmony import */ var _core_LocalMakeContext__WEBPACK_IMPORTED_MODULE_12__ = __webpack_require__(/*! @/core/LocalMakeContext */ "./src/core/LocalMakeContext.ts");
/* harmony import */ var _core_Target__WEBPACK_IMPORTED_MODULE_13__ = __webpack_require__(/*! @/core/Target */ "./src/core/Target.ts");
/* harmony import */ var _utils_Module__WEBPACK_IMPORTED_MODULE_14__ = __webpack_require__(/*! @/utils/Module */ "./src/utils/Module.ts");
/* harmony import */ var _logger__WEBPACK_IMPORTED_MODULE_15__ = __webpack_require__(/*! @/logger */ "./src/logger/index.ts");
/* harmony import */ var _core_CustomScript__WEBPACK_IMPORTED_MODULE_16__ = __webpack_require__(/*! @/core/CustomScript */ "./src/core/CustomScript.ts");
/* harmony import */ var _core_ScriptContext__WEBPACK_IMPORTED_MODULE_17__ = __webpack_require__(/*! @/core/ScriptContext */ "./src/core/ScriptContext.ts");
/* harmony import */ var _Scope__WEBPACK_IMPORTED_MODULE_18__ = __webpack_require__(/*! ./Scope */ "./src/core/Scope.ts");
/* harmony import */ var _core_BaseContext__WEBPACK_IMPORTED_MODULE_19__ = __webpack_require__(/*! @/core/BaseContext */ "./src/core/BaseContext.ts");
/* harmony import */ var _core_BuildinScripts__WEBPACK_IMPORTED_MODULE_20__ = __webpack_require__(/*! @/core/BuildinScripts */ "./src/core/BuildinScripts/index.ts");
/*
 * MIT License
 *
 * Copyright (c) 2025  Yurii Yakubin (yurii.yakubin@gmail.com)
 *
 * Permission is granted to use, copy, modify, and distribute this software
 * under the MIT License. See LICENSE file for details.
 */





















const logger = _logger__WEBPACK_IMPORTED_MODULE_15__.Logger.create("file:///mnt/c/opt/work/source/darkit-sdk/external/bitmake/src/core/ProjectContext.ts");
const TARGETS = Symbol("TARGETS");
const CUSTOM_SCRIPTS = Symbol("CUSTOM_SCRIPTS");
const CACHE = Symbol("CACHE");
const INSTALL_LIST = Symbol("INSTALL_LIST");
const BUILTIN_SCRIPTS = Symbol("BUILTIN_SCRIPTS");
const TARGET_COLLECTION = Symbol("TARGET_COLLECTION");
function ensureValueByType(type, value) {
    if (Array.isArray(type) ? type.includes(value) : typeof value === type)
        return value;
    throw new Error(`The '${value}' is not a ${type}`);
}
function getFile(target) {
    if (!target.targetFile.file)
        throw new Error(`Target "${target.name}" is not defined`);
    return target.targetFile.file;
}
function getFileName(target) {
    if (!target.targetFile.fileName)
        throw new Error(`Target "${target.name}" is not defined`);
    return target.targetFile.fileName;
}
function getFileDir(target) {
    if (!target.targetFile.fileDir)
        throw new Error(`Target "${target.name}" is not defined`);
    return target.targetFile.fileDir;
}
class GoalWorkerImpl {
    _message;
    _name;
    _output;
    _depends;
    _callbacks;
    constructor(name) {
        this._name = name;
        this._depends = [];
        this._callbacks = [];
    }
    get message() {
        return this._message;
    }
    set message(value) {
        this._message = value;
    }
    get name() {
        return this._name;
    }
    get output() {
        return this._output;
    }
    set output(value) {
        this._output = value;
    }
    get depends() {
        return this._depends;
    }
    addDependency(...value) {
        this._depends.push(...value);
    }
    addCallback(handler) {
        this._callbacks.push(handler);
    }
    async doWork() {
        if (this._output)
            await node_fs__WEBPACK_IMPORTED_MODULE_0___default().promises.mkdir(_utils_Path__WEBPACK_IMPORTED_MODULE_5__.Path.dirname(this._output), { recursive: true });
        for (const func of this._callbacks) {
            const res = func();
            if (res instanceof Promise)
                await res;
        }
    }
    updateProgress(event) {
        if (this._message) {
            const relationOfLength = Math.round((++event.loaded / event.total) * 100);
            const percent = "[" + relationOfLength.toString().padStart(3, " ") + "%] ";
            logger.notice(percent + this._message);
        }
    }
    addExec(command, args, cwd) {
        this.addCallback(() => {
            const result = (0,node_child_process__WEBPACK_IMPORTED_MODULE_2__.spawnSync)(command, args, { cwd, encoding: "utf-8" });
            if (result.error || result.status) {
                logger.notice("cd " + cwd);
                let cmd = args.join(" ");
                cmd = command + (cmd ? " " : "") + cmd;
                logger.notice(cmd);
                logger.notice("");
                logger.fatal(result.stderr);
                if (result.error)
                    throw result.error;
                throw new Error(result.error || "Status " + result.status);
            }
            if (result.stdout) {
                for (const line of result.stdout.trim().split("\n")) {
                    logger.notice(line);
                }
            }
        });
    }
    addScript(global, variableMap, script) {
        this.addCallback(async () => {
            let func = script;
            if (script instanceof _core_AbsolutePath__WEBPACK_IMPORTED_MODULE_4__.AbsolutePath) {
                const scriptUrl = node_url__WEBPACK_IMPORTED_MODULE_1___default().pathToFileURL(func.toString());
                func = (await (0,_utils_Module__WEBPACK_IMPORTED_MODULE_14__.importModule)(scriptUrl)).default;
            }
            if (func instanceof Function) {
                const mk = _core_ScriptContext__WEBPACK_IMPORTED_MODULE_17__.ScriptContext.create(global, variableMap);
                const result = func(mk);
                if (result instanceof Promise)
                    await result;
            }
            else {
                throw new Error(`There is no Function`);
            }
        });
    }
}
;
class ProjectContext {
    [TARGET_COLLECTION] = new _core_TargetCollection__WEBPACK_IMPORTED_MODULE_7__.TargetStructCollection;
    [TARGETS];
    [CUSTOM_SCRIPTS];
    [CACHE];
    _interfaceScripts;
    [INSTALL_LIST];
    _processedVariableMap;
    [BUILTIN_SCRIPTS];
    _subdirAlias;
    _subdirList;
    constructor() {
        this[TARGETS] = _core_TargetCollection__WEBPACK_IMPORTED_MODULE_7__.TargetCollection.create();
        this[CUSTOM_SCRIPTS] = _core_ScriptCollection__WEBPACK_IMPORTED_MODULE_8__.ScriptCollection.create();
        this[CACHE] = {};
        this._interfaceScripts = {};
        this[INSTALL_LIST] = [];
        this._processedVariableMap = {};
        this._subdirAlias = {};
        this[BUILTIN_SCRIPTS] = _core_BuildinScripts__WEBPACK_IMPORTED_MODULE_20__["default"];
        this._subdirList = [];
    }
    static create() {
        return Object.seal(new ProjectContext);
    }
    get TARGETS() {
        return this[TARGETS];
    }
    get CACHE() {
        return this[CACHE];
    }
    getInterfaceScript(variableMap, name) {
        let script = this._interfaceScripts[name];
        if (!script) {
            script = _core_InterfaceScript__WEBPACK_IMPORTED_MODULE_10__.InterfaceScript.create(name);
            this._interfaceScripts[name] = script;
        }
        return script;
    }
    addCustomScript(variableMap) {
        const script = _Scope__WEBPACK_IMPORTED_MODULE_18__.ScopeHelper.get(variableMap, "SCRIPT_MODULE");
        const sourceDir = _Scope__WEBPACK_IMPORTED_MODULE_18__.ScopeHelper.get(variableMap, "SOURCE_DIR");
        let scriptObj;
        if (typeof script === "string")
            scriptObj = this.findScriptFunction(script);
        if (!scriptObj)
            scriptObj = sourceDir.resolve(script);
        let inputFile = _Scope__WEBPACK_IMPORTED_MODULE_18__.ScopeHelper.get(variableMap, "SCRIPT_INPUT");
        if (inputFile)
            inputFile = sourceDir.resolve(inputFile);
        let outputFile = _Scope__WEBPACK_IMPORTED_MODULE_18__.ScopeHelper.get(variableMap, "SCRIPT_OUTPUT");
        if (!outputFile)
            throw new Error("CustomScript parameters required output entity");
        outputFile = sourceDir.resolve(outputFile);
        const options = {
            variableMap,
            name: _Scope__WEBPACK_IMPORTED_MODULE_18__.ScopeHelper.get(variableMap, "SCRIPT_NAME"),
            script: scriptObj,
            output: outputFile,
            input: inputFile,
            workDir: _Scope__WEBPACK_IMPORTED_MODULE_18__.ScopeHelper.get(variableMap, "BINARY_DIR"),
        };
        const target = _core_CustomScript__WEBPACK_IMPORTED_MODULE_16__.CustomScript.create(options);
        if (options.name)
            this[CUSTOM_SCRIPTS].set(options.name, target);
        else
            this[CUSTOM_SCRIPTS].add(target);
        return target;
    }
    registerVariableMap(name, variableMap) {
        if (this._processedVariableMap[name])
            throw new Error(`SystemVariables exists for ${name}`);
        this._processedVariableMap[name] = variableMap;
    }
    resolveSubdirectory(path) {
        const resolvedPath = this._subdirAlias[path.toString()];
        if (resolvedPath === undefined)
            return path;
        if (resolvedPath === null)
            return undefined;
        return resolvedPath;
    }
    addSubdirectoryAlias(variableMap, src, dest) {
        const srcPath = _core_AbsolutePath__WEBPACK_IMPORTED_MODULE_4__.AbsolutePath.create(_Scope__WEBPACK_IMPORTED_MODULE_18__.ScopeHelper.get(variableMap, "SOURCE_DIR").resolve(src));
        const destPath = (dest === null) ? null : _core_AbsolutePath__WEBPACK_IMPORTED_MODULE_4__.AbsolutePath.create(_Scope__WEBPACK_IMPORTED_MODULE_18__.ScopeHelper.get(variableMap, "SOURCE_DIR").resolve(dest));
        const srcStr = srcPath.toString();
        if (this._subdirAlias.hasOwnProperty(srcStr))
            logger.warn(`Owerride "${srcStr}" subdirectory alias`);
        this._subdirAlias[srcStr] = destPath;
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
        if ((0,_utils_FileSystem__WEBPACK_IMPORTED_MODULE_6__.fileExistsSync)(filename.toString())) {
            const variables = (0,_utils_Module__WEBPACK_IMPORTED_MODULE_14__.requireSync)(filename.toString());
            this.addCacheVariables(variables);
        }
    }
    copyCacheVariables(scope) {
        for (const [name, entry] of Object.entries(this[CACHE])) {
            if (!Object.hasOwn(scope, name)) {
                const type = entry.type || typeof entry.value;
                const description = entry.description || "";
                let value = Array.isArray(entry.value) ? [...entry.value] : entry.value;
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
    addStaticLibrary(variableMap, name) {
        const impl = this[TARGET_COLLECTION].getOrCreate(name);
        const target = _core_Target__WEBPACK_IMPORTED_MODULE_13__.StaticLibrary.create(impl, variableMap, name);
        this[TARGETS].set(name, target);
        return target;
    }
    addObjectLibrary(variableMap, name) {
        const impl = this[TARGET_COLLECTION].getOrCreate(name);
        const target = _core_Target__WEBPACK_IMPORTED_MODULE_13__.ObjectLibrary.create(impl, variableMap, name);
        this[TARGETS].set(name, target);
        return target;
    }
    addSharedLibrary(variableMap, name) {
        const impl = this[TARGET_COLLECTION].getOrCreate(name);
        const target = _core_Target__WEBPACK_IMPORTED_MODULE_13__.SharedLibrary.create(impl, variableMap, name);
        this[TARGETS].set(name, target);
        return target;
    }
    addExecutable(variableMap, name) {
        const impl = this[TARGET_COLLECTION].getOrCreate(name);
        const target = _core_Target__WEBPACK_IMPORTED_MODULE_13__.Executable.create(impl, variableMap, name);
        this[TARGETS].set(name, target);
        return target;
    }
    getTarget(name) {
        return this[TARGET_COLLECTION].getOrCreate(name);
    }
    executeScriptSync(variableMap, script, params) {
        const newVariableMap = _Scope__WEBPACK_IMPORTED_MODULE_18__.ScopeHelper.cloneVariableMap(variableMap);
        params && _Scope__WEBPACK_IMPORTED_MODULE_18__.ScopeHelper.extendVariableMapByValues(newVariableMap, "", params);
        const scriptPath = _Scope__WEBPACK_IMPORTED_MODULE_18__.ScopeHelper.get(newVariableMap, "SOURCE_DIR").resolve(script);
        const func = (0,_utils_Module__WEBPACK_IMPORTED_MODULE_14__.requireSync)(scriptPath.toString());
        const mk = _core_ScriptContext__WEBPACK_IMPORTED_MODULE_17__.ScriptContext.create(this, newVariableMap);
        func(mk);
    }
    writeCacheVariables(filename) {
        const json = JSON.stringify(this[CACHE], null, 2);
        node_fs__WEBPACK_IMPORTED_MODULE_0___default().writeFileSync(filename, json, "utf-8");
    }
    async prepearScriptFile(variableMap) {
        const originSourceDir = _Scope__WEBPACK_IMPORTED_MODULE_18__.ScopeHelper.get(variableMap, "SOURCE_DIR").toString();
        const resolveSourceDir = this.resolveSubdirectory(originSourceDir);
        if (!resolveSourceDir) {
            logger.info(`Source dir "${originSourceDir}" was disabled`);
            return false;
        }
        _Scope__WEBPACK_IMPORTED_MODULE_18__.ScopeHelper.set(variableMap, "SOURCE_DIR", resolveSourceDir);
        if (!_Scope__WEBPACK_IMPORTED_MODULE_18__.ScopeHelper.get(variableMap, "SCRIPT_FILE")) {
            let scriptFile;
            const fileList = [".js", ".mjs"].map(i => "MakeScript" + i);
            for (const filename of fileList) {
                const iter = _Scope__WEBPACK_IMPORTED_MODULE_18__.ScopeHelper.get(variableMap, "SOURCE_DIR").join(filename);
                if (await (0,_utils_FileSystem__WEBPACK_IMPORTED_MODULE_6__.fileExists)(iter.toString())) {
                    scriptFile = iter;
                    break;
                }
            }
            if (!scriptFile)
                throw new Error(`There are no files ${fileList.join(", ")} in "${_Scope__WEBPACK_IMPORTED_MODULE_18__.ScopeHelper.get(variableMap, "SOURCE_DIR")}"`);
            _Scope__WEBPACK_IMPORTED_MODULE_18__.ScopeHelper.set(variableMap, "SCRIPT_FILE", scriptFile);
            _Scope__WEBPACK_IMPORTED_MODULE_18__.ScopeHelper.set(variableMap, "SCRIPT_DIR", _Scope__WEBPACK_IMPORTED_MODULE_18__.ScopeHelper.get(variableMap, "SCRIPT_FILE").dirname());
        }
        this.registerVariableMap(_Scope__WEBPACK_IMPORTED_MODULE_18__.ScopeHelper.get(variableMap, "SCRIPT_FILE").toString(), variableMap);
        return true;
    }
    addSubdirectory(variableMap, sourceDir, binaryDir) {
        const newVariableMap = (0,_core_BaseContext__WEBPACK_IMPORTED_MODULE_19__.createVariableMapForDirectory)(variableMap, sourceDir, binaryDir);
        if (newVariableMap) {
            this._subdirList.push(newVariableMap);
        }
    }
    findScriptFunction(name) {
        return this[BUILTIN_SCRIPTS][name];
    }
    async doSubdirectory() {
        const contextList = new Array();
        for (;;) {
            const variableMap = this._subdirList.shift();
            if (!variableMap)
                break;
            if (!await this.prepearScriptFile(variableMap))
                continue;
            const ctx = new _core_LocalMakeContext__WEBPACK_IMPORTED_MODULE_12__.LocalMakeContext(variableMap, this);
            contextList.push(ctx);
            const mk = _core_UserMakeContext__WEBPACK_IMPORTED_MODULE_11__.UserMakeContext.create(ctx, variableMap);
            const cwdSave = process.cwd();
            process.chdir(mk.SCRIPT_DIR.toString());
            await (0,_core_BaseContext__WEBPACK_IMPORTED_MODULE_19__.performContext)(mk);
            process.chdir(cwdSave);
        }
        for (const ctx of contextList) {
            for (const [name, target] of ctx.targets) {
                const impl = this[TARGET_COLLECTION].get(name);
                impl.targetFile.setPrefix(target.prefix);
                impl.targetFile.setOutputName(target.outputName);
                impl.targetFile.setSuffix(target.suffix);
                impl.setPositionIndependentCode(target.positionIndependentCode);
                for (const { publicOnly, value } of target.getIncludes())
                    impl.addInclude("directly", publicOnly, value);
                for (const { publicOnly, value } of target.getDefinitions())
                    impl.addDefinition("directly", publicOnly, value);
            }
        }
        for (const ctx of contextList) {
            for (const [name, target] of ctx.indirectTargets) {
                const impl = this[TARGET_COLLECTION].get(name);
                if (target.prefix !== undefined)
                    impl.targetFile.setPrefix(target.prefix);
                if (target.outputName !== undefined)
                    impl.targetFile.setOutputName(target.outputName);
                if (target.suffix !== undefined)
                    impl.targetFile.setSuffix(target.suffix);
                if (target.positionIndependentCode !== undefined)
                    impl.setPositionIndependentCode(target.positionIndependentCode);
                for (const { publicOnly, value } of target.getIncludes())
                    impl.addInclude("directly", publicOnly, value);
                for (const { publicOnly, value } of target.getDefinitions())
                    impl.addDefinition("directly", publicOnly, value);
            }
        }
    }
    createGoals(scope) {
        for (const iter of Object.values(this._interfaceScripts)) {
            const script = this[CUSTOM_SCRIPTS].get(iter.NAME);
            if (!script)
                throw new Error(`There is no CustomScript named ${iter.NAME}`);
            script.mergeVariables(iter.variables);
        }
        const goalList = _core_GoalCollection__WEBPACK_IMPORTED_MODULE_9__.GoalCollection.create();
        for (const script of this[CUSTOM_SCRIPTS].ENTRIES) {
            const depends = [];
            if (script.SCRIPT instanceof _core_AbsolutePath__WEBPACK_IMPORTED_MODULE_4__.AbsolutePath)
                depends.push(script.SCRIPT.toString());
            if (script.INPUT)
                depends.push(script.INPUT.toString());
            const msg = "\x1b[36m" + "Generating " + script.workDir.relative(script.OUTPUT) + "\x1b[0m";
            const worker = new GoalWorkerImpl(script.NAME);
            worker.message = msg;
            worker.output = script.OUTPUT.toString();
            worker.addDependency(...depends);
            worker.addScript(this, script.variableMap, script.SCRIPT);
            goalList.add(worker);
        }
        const objectFiles = new Map();
        for (const target of Object.values(this[TARGETS].ENTRIES)) {
            for (const it of target.IMPL.getSourceFiles()) {
                if (!it.LANGUAGE)
                    continue;
                const rfile1 = target.TARGET_SCOPE.BINARY_DIR.relative(it.FILE);
                const rfile2 = target.TARGET_SCOPE.SOURCE_DIR.relative(it.FILE);
                const rfile = (rfile2.length < rfile1.length ? rfile2 : rfile1).replace("../", "__/");
                const ofile = target.TARGET_SCOPE.BINARY_DIR.join("MakeFiles", target.targetName + ".dir", rfile + ".obj");
                objectFiles.set(it, ofile);
            }
        }
        for (const [name, target] of Object.entries(this[TARGETS].ENTRIES)) {
            const targetImpl = target.IMPL;
            const depends = [];
            for (const s of target.IMPL.getInterfaceObjectsList()) {
                const t = this[TARGETS].get(s.targetName);
                for (const f of t.IMPL.getSourceFiles()) {
                    const o = objectFiles.get(f);
                    o && depends.push(o.toString());
                }
            }
            const headers = this[TARGETS].allHeadersOf(target);
            for (const s of target.IMPL.getSourceFiles()) {
                if (s.HEADER_FILE_ONLY)
                    continue;
                const o = objectFiles.get(s);
                if (!o)
                    throw new Error(`OBJECT_FILE is null`);
                node_fs__WEBPACK_IMPORTED_MODULE_0___default().mkdirSync(o.dirname().toString(), { recursive: true });
                const relativeObject = target.TARGET_SCOPE.BINARY_DIR.relative(o);
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
                if (targetImpl.positionIndependentCode)
                    args.push("-fPIC");
                args.push(...s.COMPILE_FLAGS.flat());
                args.push("-o", relativeObject);
                args.push("-c", s.FILE.toString());
                const command = target.TARGET_SCOPE[s.LANGUAGE + "_COMPILER"].toString();
                const output = _core_AbsolutePath__WEBPACK_IMPORTED_MODULE_4__.AbsolutePath.create(target.TARGET_SCOPE.BINARY_DIR.join(relativeObject));
                depends.push(output.toString());
                const worker = new GoalWorkerImpl;
                worker.message = msg;
                worker.output = output.toString();
                worker.addDependency(...headers);
                worker.addDependency(s.FILE.toString());
                worker.addExec(command, args, target.TARGET_SCOPE.BINARY_DIR.toString());
                goalList.add(worker);
            }
            const generalGoal = new GoalWorkerImpl;
            for (const params of target.IMPL.preBuildList) {
                generalGoal.addExec(params.command.toString(), params.args.map(i => i.toString()), target.TARGET_SCOPE.BINARY_DIR.toString());
            }
            const linkOptions = this[TARGETS].allLinkOptionsOf(target);
            if (target instanceof _core_Target__WEBPACK_IMPORTED_MODULE_13__.ObjectLibrary) {
                const objs = depends.filter(i => i.endsWith(".o") || i.endsWith(".obj")).map(i => target.FILE_DIR.relative(i));
                if (objs.length) {
                    const args = [
                        ...linkOptions,
                        "-r",
                        "-o", target.FILE_NAME,
                        ...objs
                    ];
                    generalGoal.message = `Linking CXX object library ${target.FILE_NAME}`;
                    generalGoal.output = target.FILE.toString();
                    generalGoal.addDependency(...depends);
                    generalGoal.addExec(scope.LINKER, args, target.FILE_DIR.toString());
                }
                else {
                    logger.info(`No objects for "${target.targetName}"`);
                }
            }
            if (target instanceof _core_Target__WEBPACK_IMPORTED_MODULE_13__.StaticLibrary) {
                const objs = depends.filter(i => i.endsWith(".o") || i.endsWith(".obj")).map(i => target.FILE_DIR.relative(i));
                if (objs.length) {
                    const args = ["rc", target.FILE_NAME, ...objs];
                    generalGoal.message = `Linking CXX static library ${target.FILE_NAME}`;
                    generalGoal.output = target.FILE.toString();
                    generalGoal.addDependency(...depends);
                    generalGoal.addExec(scope.AR, args, target.FILE_DIR.toString());
                }
                else {
                    logger.info(`No objects for "${target.targetName}"`);
                }
            }
            if (target instanceof _core_Target__WEBPACK_IMPORTED_MODULE_13__.SharedLibrary) {
                throw new Error("Not implemented");
            }
            if (target instanceof _core_Target__WEBPACK_IMPORTED_MODULE_13__.Executable) {
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
                    generalGoal.message = `Linking CXX executable ${target.FILE_NAME}`;
                    generalGoal.output = target.FILE.toString();
                    generalGoal.addDependency(...depends);
                    generalGoal.addDependency(...libs);
                    generalGoal.addExec(scope.CXX_COMPILER, args, target.FILE_DIR.toString());
                }
                else {
                    logger.info(`No objects for "${target.targetName}"`);
                }
            }
            for (const params of target.IMPL.postBuildList) {
                generalGoal.addExec(params.command.toString(), params.args.map(i => i.toString()), target.TARGET_SCOPE.BINARY_DIR.toString());
            }
            goalList.add(generalGoal);
            const worker = new GoalWorkerImpl(name);
            worker.message = `Built target ${name}`;
            worker.addDependency(target.FILE.toString());
            goalList.add(worker);
        }
        ;
        const installPairs = new Array;
        for (const iter of this[INSTALL_LIST]) {
            let src, dest;
            if (iter.VALUE instanceof _core_AbsolutePath__WEBPACK_IMPORTED_MODULE_4__.AbsolutePath) {
                if (scope.PREVENT_INSTALL_FILES)
                    continue;
                src = iter.VALUE.toString();
                const rfile = iter.BASE_DIR.relative(iter.VALUE);
                dest = iter.DESTINATION.join(rfile);
            }
            else if (iter.VALUE instanceof _core_Target__WEBPACK_IMPORTED_MODULE_13__.UserIndirectTarget) {
                const targetName = iter.VALUE.targetName;
                const target = this[TARGET_COLLECTION].get(targetName);
                src = getFile(target).toString();
                dest = iter.DESTINATION.join(getFileName(target));
            }
            else {
                throw new Error(`Can not install ${iter.VALUE}`);
            }
            if (scope.DESTDIR)
                dest = scope.DESTDIR.join(dest).toString();
            dest = dest.toString();
            installPairs.push({ src, dest });
        }
        if (installPairs.length) {
            const worker = new GoalWorkerImpl(_Constants__WEBPACK_IMPORTED_MODULE_3__.INSTALL_TARGET);
            installPairs.forEach(i => void worker.addDependency(i.src));
            worker.addCallback(async () => {
                for (const { src, dest } of installPairs) {
                    logger.notice("Installing: " + dest);
                    await node_fs__WEBPACK_IMPORTED_MODULE_0___default().promises.mkdir(_utils_Path__WEBPACK_IMPORTED_MODULE_5__.Path.dirname(dest), { recursive: true });
                    await node_fs__WEBPACK_IMPORTED_MODULE_0___default().promises.cp(src.toString(), dest.toString(), { force: true });
                }
            });
            goalList.add(worker);
        }
        const worker = new GoalWorkerImpl(_Constants__WEBPACK_IMPORTED_MODULE_3__.ALL_TARGET);
        Object.keys(this[TARGETS].ENTRIES).forEach(i => void worker.addDependency(i));
        goalList.add(worker);
        return goalList;
    }
    toJSON() {
        return {
            TARGETS: this.TARGETS,
            CUSTOM_SCRIPTS: this[CUSTOM_SCRIPTS],
            CACHE: this.CACHE,
            interfaceScripts: this._interfaceScripts,
            INSTALL_LIST: this[INSTALL_LIST],
            processedVariableMap: this._processedVariableMap,
            subdirAlias: this._subdirAlias,
            TARGET_COLLECTION: this[TARGET_COLLECTION],
        };
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
/* harmony import */ var _core_AbsolutePath__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! @/core/AbsolutePath */ "./src/core/AbsolutePath.ts");
/* harmony import */ var _utils_Primitives__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! @/utils/Primitives */ "./src/utils/Primitives.ts");
/*
 * MIT License
 *
 * Copyright (c) 2025  Yurii Yakubin (yurii.yakubin@gmail.com)
 *
 * Permission is granted to use, copy, modify, and distribute this software
 * under the MIT License. See LICENSE file for details.
 */


;
;
;
var ScopeHelper;
(function (ScopeHelper) {
    function toDescriptor(value) {
        if (!value || typeof value === "boolean" || typeof value === "number" || typeof value === "string" || Array.isArray(value)) {
            return { value };
        }
        return value;
    }
    function getEntryValue(entry) {
        /*if (value === undefined)
          throw new Error(`Value of ${name} cannot be obtained because it has not been established`);*/
        return (entry.value === undefined) ? entry.initValue : entry.value;
    }
    ScopeHelper.getEntryValue = getEntryValue;
    function get(variableMap, name) {
        const entry = variableMap[name];
        if (entry)
            return getEntryValue(entry);
    }
    ScopeHelper.get = get;
    const makeValueMap = {
        array: (value) => {
            return Array.isArray(value) ? Array.from(value) : undefined;
        },
        boolean: (value) => {
            return (typeof value === "boolean") ? value : undefined;
        },
        number: (value) => {
            return (typeof value === "number") ? value : undefined;
        },
        string: (value) => {
            return (typeof value === "string") ? value : undefined;
        },
        AbsolutePath: (value) => {
            return _core_AbsolutePath__WEBPACK_IMPORTED_MODULE_0__.AbsolutePath.create(value);
        },
        FilePath: (value) => {
            return _core_AbsolutePath__WEBPACK_IMPORTED_MODULE_0__.AbsolutePath.create(value);
        },
        DirPath: (value) => {
            return _core_AbsolutePath__WEBPACK_IMPORTED_MODULE_0__.AbsolutePath.create(value);
        },
        object: (value) => {
            return value;
        },
    };
    const tojsonValueMap = {
        array: (value) => {
            const result = [];
            for (const iter of value) {
                if (iter && typeof iter === "object")
                    result.push(typeof iter.toJSON === "function" ? iter.toJSON() : (0,_utils_Primitives__WEBPACK_IMPORTED_MODULE_1__.deepCopy)(iter));
                else
                    result.push(iter);
            }
            return result;
        },
        boolean: (value) => {
            return value;
        },
        number: (value) => {
            return value;
        },
        string: (value) => {
            return value;
        },
        AbsolutePath: (value) => {
            return value.toJSON();
        },
        FilePath: (value) => {
            return value.toJSON();
        },
        DirPath: (value) => {
            return value.toJSON();
        },
        object: (value) => {
            return (0,_utils_Primitives__WEBPACK_IMPORTED_MODULE_1__.deepCopy)(value);
        },
    };
    function makeJSONValue(entry, value) {
        if (Array.isArray(entry.type))
            return value;
        const func = tojsonValueMap[entry.type];
        if (!func)
            throw new Error(`Unknown type "${entry.type}" for ${entry.name}`);
        return func(value);
    }
    ScopeHelper.makeJSONValue = makeJSONValue;
    function makeEntryValue(entry, value) {
        let newValue;
        if (Array.isArray(entry.type))
            newValue = entry.type.includes(value) ? value : undefined;
        else {
            const func = makeValueMap[entry.type];
            if (!func)
                throw new Error(`Unknown type "${entry.type}" for ${entry.name}`);
            newValue = func(value);
        }
        if (newValue === undefined)
            throw new TypeError(`Attempting to set "${value}" to ${entry.name} as an ${entry.type}`);
        return newValue;
    }
    ScopeHelper.makeEntryValue = makeEntryValue;
    function copyEntryValue(entry, transform) {
        const result = {
            name: entry.name,
            type: entry.type,
            group: entry.group,
            description: entry.description,
        };
        if (entry.initValue !== undefined)
            result.initValue = transform(entry, entry.initValue);
        if (entry.value !== undefined)
            result.value = transform(entry, entry.value);
        return result;
    }
    ScopeHelper.copyEntryValue = copyEntryValue;
    function fromJSON(variableMap) {
        const result = {};
        for (const [key, val] of Object.entries(variableMap))
            result[key] = copyEntryValue(val, makeEntryValue);
        return result;
    }
    ScopeHelper.fromJSON = fromJSON;
    function toJSON(variableMap) {
        const result = {};
        for (const [key, val] of Object.entries(variableMap))
            result[key] = copyEntryValue(val, makeJSONValue);
        return result;
    }
    ScopeHelper.toJSON = toJSON;
    function setEntryValue(entry, value) {
        entry.value = makeEntryValue(entry, value);
    }
    ScopeHelper.setEntryValue = setEntryValue;
    function set(variableMap, name, value) {
        const entry = variableMap[name];
        if (!entry)
            throw new Error(`Variable "${name}" does not exists`);
        setEntryValue(entry, value);
    }
    ScopeHelper.set = set;
    function reset(variableMap, name) {
        const entry = variableMap[name];
        if (!entry)
            throw new Error(`Variable "${name}" does not exists`);
        entry.value = undefined;
    }
    ScopeHelper.reset = reset;
    function defineVariable(map, group, name, descriptor) {
        let defineEntry = map[name];
        let isValidValue = (value) => true;
        if (!defineEntry) {
            defineEntry = {
                name,
                type: "", group, value: undefined, initValue: undefined, description: "",
            };
            map[name] = defineEntry;
        }
        else if (group !== defineEntry.group) {
            if (defineEntry.group)
                throw new Error(`Attempting to recreate "${name}" variable with "${defineEntry.group}" group in another "${group}"`);
            defineEntry.group = group;
        }
        defineEntry.type = descriptor.type || defineEntry.type;
        defineEntry.description = descriptor.description || defineEntry.description;
        let type;
        if (defineEntry.type)
            type = defineEntry.type;
        else if (Array.isArray(descriptor.value))
            type = "array";
        else if (descriptor.value instanceof _core_AbsolutePath__WEBPACK_IMPORTED_MODULE_0__.AbsolutePath)
            type = "AbsolutePath";
        else
            type = typeof descriptor.value;
        if (Array.isArray(type)) {
            const enumList = type;
            let itemType;
            for (const iter of enumList) {
                const it = typeof iter;
                if (!itemType)
                    itemType = it;
                else if (itemType !== it)
                    throw new Error(`All elements for ${name} must be of the same type`);
            }
            if (itemType !== "boolean" && itemType !== "number" && itemType !== "string")
                throw new Error(`Enum ${name} not support ${itemType} type`);
            isValidValue = (value) => enumList.includes(value);
        }
        else if (type === "boolean") {
            isValidValue = (value) => typeof value === "boolean";
        }
        else if (type === "number") {
            isValidValue = (value) => typeof value === "number";
        }
        else if (type === "string") {
            isValidValue = (value) => typeof value === "string";
        }
        else if (type === "array") {
            isValidValue = Array.isArray;
        }
        else if (type === "AbsolutePath" || type === "FilePath" || type === "DirPath") {
            isValidValue = (value) => !!_core_AbsolutePath__WEBPACK_IMPORTED_MODULE_0__.AbsolutePath.create(value);
        }
        else if (type !== "object" && type !== "enum") {
            throw new Error(`Variable "${name}" has wrong "${type}" type`);
        }
        if (descriptor.value === undefined) {
            defineEntry.initValue = (type === "array") ? [] : undefined;
        }
        else {
            if (!isValidValue(descriptor.value))
                throw new TypeError(`Attempting to set "${descriptor.value}" to ${name} as initValue`);
            defineEntry.initValue = (type === "array") ? Array.from(descriptor.value) : descriptor.value;
        }
        defineEntry.type = type;
        if (defineEntry.initValue !== undefined) {
            defineEntry.initValue = makeEntryValue(defineEntry, defineEntry.initValue);
        }
        if (defineEntry.value !== undefined) {
            defineEntry.value = makeEntryValue(defineEntry, defineEntry.value);
        }
    }
    ScopeHelper.defineVariable = defineVariable;
    function createProxy(map, o) {
        o = o || {};
        const handler = {
            get(target, key, receiver) {
                const entry = target[key];
                if (entry)
                    return getEntryValue(entry);
                return o[key];
            },
            set(target, key, value) {
                const entry = target[key];
                if (entry)
                    setEntryValue(entry, value);
                else
                    defineVariable(target, "", key, toDescriptor(value));
                return true;
            },
            has(target, key) {
                return target.hasOwnProperty(key) || (key in target);
            },
            ownKeys(target) {
                return Object.keys(target);
            },
            deleteProperty(target, key) {
                throw new Error(`Cannot delete ${key} value`);
            },
        };
        return new Proxy(map, handler);
    }
    ScopeHelper.createProxy = createProxy;
    function cloneVariableMap(map) {
        const result = {};
        for (const [name, entry] of Object.entries(map)) {
            defineVariable(result, entry.group, name, {
                type: entry.type,
                description: entry.description,
                value: entry.initValue,
            });
            if (getEntryValue(entry) !== undefined)
                result[name].value = getEntryValue(entry);
        }
        return result;
    }
    ScopeHelper.cloneVariableMap = cloneVariableMap;
    function extendVariableMapByValues(map, group, values) {
        for (const [name, value] of Object.entries(values)) {
            defineVariable(map, group, name, { value });
            map[name].value = value;
        }
    }
    ScopeHelper.extendVariableMapByValues = extendVariableMapByValues;
    function defineVariablesInVariableMap(map, group, variables) {
        for (const [name, value] of Object.entries(variables)) {
            const descriptor = value && typeof value === "object" ? value : { value };
            defineVariable(map, group, name, descriptor);
        }
    }
    ScopeHelper.defineVariablesInVariableMap = defineVariablesInVariableMap;
    function getVariablesByGroup(map, group) {
        const result = {};
        for (const [name, entry] of Object.entries(map)) {
            if (group !== undefined && entry.group && entry.group !== group)
                continue;
            result[name] = {
                type: entry.type,
                description: entry.description,
                value: getEntryValue(entry),
            };
        }
        return result;
    }
    ScopeHelper.getVariablesByGroup = getVariablesByGroup;
    function createVariableValues(map, group) {
        const result = {};
        for (const [name, entry] of Object.entries(map)) {
            if (!group || group === entry.group)
                result[name] = getEntryValue(entry);
        }
        return result;
    }
    ScopeHelper.createVariableValues = createVariableValues;
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
    function mergeVariableMap(target, source) {
        for (const [name, value] of Object.entries(source)) {
            let entry = target[name];
            if (!entry)
                defineVariable(target, "", name, { value });
            else {
                let dest = getEntryValue(entry);
                setEntryValue(entry, (dest && typeof dest === "object") ? mergeVariables(dest, value) : value);
            }
        }
        return target;
    }
    ScopeHelper.mergeVariableMap = mergeVariableMap;
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
            throw new Error("Not supported empty name for CustomScript");
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
/* harmony import */ var _core_BaseContext__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! @/core/BaseContext */ "./src/core/BaseContext.ts");
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
class ScriptContext extends _core_BaseContext__WEBPACK_IMPORTED_MODULE_0__.BaseContext {
    [SCOPE];
    [GLOBAL];
    constructor(global, scope) {
        super(scope);
        this[SCOPE] = scope;
        this[GLOBAL] = global;
    }
    static create(global, variableMap) {
        return (0,_core_BaseContext__WEBPACK_IMPORTED_MODULE_0__.createContext)(new ScriptContext(global, variableMap));
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

const LANGUAGE = Symbol("LANGUAGE");
const HEADER_FILE_ONLY = Symbol("HEADER_FILE_ONLY");
const DEFINES = Symbol("DEFINES");
const COMPILE_FLAGS = Symbol("COMPILE_FLAGS");
const FILE = Symbol("FILE");
const BASE_DIR = Symbol("BASE_DIR");
class SourceFile {
    [LANGUAGE];
    [HEADER_FILE_ONLY];
    [FILE];
    [BASE_DIR];
    [DEFINES];
    [COMPILE_FLAGS];
    constructor(filename, baseDir, language, compileFlags) {
        this[FILE] = filename;
        this[BASE_DIR] = baseDir;
        this[LANGUAGE] = language;
        this[HEADER_FILE_ONLY] = !language;
        this[DEFINES] = [];
        this[COMPILE_FLAGS] = [...compileFlags];
    }
    static create(filename, baseDir, language, compileFlags) {
        return Object.seal(new SourceFile(filename, baseDir, language, compileFlags));
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
    toJSON() {
        return {
            LANGUAGE: this[LANGUAGE],
            HEADER_FILE_ONLY: this[HEADER_FILE_ONLY],
            DEFINES: this[DEFINES],
            COMPILE_FLAGS: this[COMPILE_FLAGS],
            FILE: this[FILE],
            FILE_DIR: this.FILE_DIR,
            FILE_NAME: this.FILE_NAME,
            BASE_DIR: this[BASE_DIR],
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
/* harmony import */ var _utils_Host__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! @/utils/Host */ "./src/utils/Host.ts");
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
    SCRIPT_MODULE: {
        description: "Module name of the current MakeScript",
        type: "string",
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
        type: "string",
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
        value: _utils_Host__WEBPACK_IMPORTED_MODULE_2__.Host.executableSuffix,
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
        value: _utils_Host__WEBPACK_IMPORTED_MODULE_2__.Host.sizeofVoidp,
    },
    MAKE_PLUGIN_LIST: {
        description: "List of paths to plugins",
        value: [],
    },
    HOST_EXECUTABLE_SUFFIX: {
        description: "Defines the file extension for executables on the host system",
        value: _utils_Host__WEBPACK_IMPORTED_MODULE_2__.Host.executableSuffix,
        // Readonly
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
/* harmony export */   BaseTarget: () => (/* binding */ BaseTarget),
/* harmony export */   Executable: () => (/* binding */ Executable),
/* harmony export */   ObjectLibrary: () => (/* binding */ ObjectLibrary),
/* harmony export */   SharedLibrary: () => (/* binding */ SharedLibrary),
/* harmony export */   StaticLibrary: () => (/* binding */ StaticLibrary),
/* harmony export */   UserIndirectTarget: () => (/* binding */ UserIndirectTarget)
/* harmony export */ });
/* harmony import */ var _core_SourceFile__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! @/core/SourceFile */ "./src/core/SourceFile.ts");
/* harmony import */ var _core_SourceFileList__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! @/core/SourceFileList */ "./src/core/SourceFileList.ts");
/* harmony import */ var _core_InterfaceIncludes__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! @/core/InterfaceIncludes */ "./src/core/InterfaceIncludes.ts");
/* harmony import */ var _core_InterfaceObjects__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! @/core/InterfaceObjects */ "./src/core/InterfaceObjects.ts");
/* harmony import */ var _core_AbsolutePath__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! @/core/AbsolutePath */ "./src/core/AbsolutePath.ts");
/* harmony import */ var _core_Scope__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(/*! @/core/Scope */ "./src/core/Scope.ts");
/* harmony import */ var _core_TargetStruct__WEBPACK_IMPORTED_MODULE_6__ = __webpack_require__(/*! @/core/TargetStruct */ "./src/core/TargetStruct.ts");
/* harmony import */ var _Constants__WEBPACK_IMPORTED_MODULE_7__ = __webpack_require__(/*! @/Constants */ "./src/Constants.ts");
/* harmony import */ var _core_DefinitionHelper__WEBPACK_IMPORTED_MODULE_8__ = __webpack_require__(/*! @/core/DefinitionHelper */ "./src/core/DefinitionHelper.ts");
/*
 * MIT License
 *
 * Copyright (c) 2025  Yurii Yakubin (yurii.yakubin@gmail.com)
 *
 * Permission is granted to use, copy, modify, and distribute this software
 * under the MIT License. See LICENSE file for details.
 */









const _languageExtensions = {
    ASM: [".asm", ".s"],
    C: [".c"],
    CXX: [".cpp", ".cc", ".cxx"],
};
function normalizeIncludes(baseDir, ...includes) {
    const result = [];
    for (const iter of includes.flat()) {
        if (iter instanceof _core_InterfaceIncludes__WEBPACK_IMPORTED_MODULE_2__.InterfaceIncludes)
            result.push(iter);
        else if (typeof iter === "string")
            result.push(_core_AbsolutePath__WEBPACK_IMPORTED_MODULE_4__.AbsolutePath.create(baseDir.resolve(iter)));
        else if (iter instanceof _core_AbsolutePath__WEBPACK_IMPORTED_MODULE_4__.AbsolutePath)
            result.push(_core_AbsolutePath__WEBPACK_IMPORTED_MODULE_4__.AbsolutePath.create(iter));
        else
            throw new Error(`Not support instance ${iter}`);
    }
    return result;
}
function isSupportLanguage(language) {
    return _languageExtensions.hasOwnProperty(language);
}
function getFileLanguage(filename) {
    const filenameLowerCase = filename.toLowerCase();
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
function createSources(scope, source) {
    if (source instanceof _core_InterfaceObjects__WEBPACK_IMPORTED_MODULE_3__.InterfaceObjects || source instanceof _core_SourceFile__WEBPACK_IMPORTED_MODULE_0__.SourceFile)
        return source;
    if (typeof source === "string" || _core_AbsolutePath__WEBPACK_IMPORTED_MODULE_4__.AbsolutePath.isAbsolute(source)) {
        const filename = scope.SOURCE_DIR.resolve(source);
        const language = getFileLanguage(filename.toString());
        const compileFlags = !language ? [] : [
            ...scope[language + "_FLAGS"],
            ...scope[language + "_FLAGS_" + scope.BUILD_TYPE.toUpperCase()],
        ];
        return _core_SourceFile__WEBPACK_IMPORTED_MODULE_0__.SourceFile.create(filename, scope.SOURCE_DIR, language, compileFlags);
    }
    throw new Error(`Not support instance ${source}`);
}
function getSourceFiles(impl, scope, ...sources) {
    const result = [];
    const sourceFiles = impl.getSourceFiles();
    for (const it of sources.flat()) {
        const filename = scope.SOURCE_DIR.resolve(it).toString();
        const src = sourceFiles.find(i => i.FILE.toString() === filename);
        if (!src)
            throw new Error(`Cannot find "${it}"`);
        result.push(src);
    }
    if (result.length)
        return _core_SourceFileList__WEBPACK_IMPORTED_MODULE_1__.SourceFileList.create(scope, result);
    return _core_SourceFileList__WEBPACK_IMPORTED_MODULE_1__.SourceFileList.create(scope, sourceFiles);
}
const IMPL = Symbol("IMPL");
const TARGET_SCOPE = Symbol("TARGET_SCOPE");
;
class UserIndirectTarget {
    [IMPL];
    [TARGET_SCOPE];
    _name;
    _prefix;
    _outputName;
    _suffix;
    _positionIndependentCode;
    _includes;
    _definitions;
    constructor(impl, variableMap, name) {
        const variables = _core_Scope__WEBPACK_IMPORTED_MODULE_5__.ScopeHelper.createVariableValues(variableMap, _Constants__WEBPACK_IMPORTED_MODULE_7__.SYSTEM_VARIABLE_GROUP);
        this[IMPL] = impl;
        this[TARGET_SCOPE] = variables;
        this._name = name;
        this._includes = [];
        this._definitions = [];
    }
    static create(impl, variableMap, name) {
        return Object.seal(new UserIndirectTarget(impl, variableMap, name));
    }
    static ensureInstance(value) {
        if (value instanceof UserIndirectTarget)
            return value;
        throw new Error(`The '${value}' is not a UserIndirectTarget`);
    }
    get targetName() {
        return this._name;
    }
    get includes() {
        return _core_InterfaceIncludes__WEBPACK_IMPORTED_MODULE_2__.InterfaceIncludes.create(this.targetName);
    }
    get objects() {
        return _core_InterfaceObjects__WEBPACK_IMPORTED_MODULE_3__.InterfaceObjects.create(this.targetName);
    }
    get prefix() {
        return this._prefix;
    }
    setPrefix(value) {
        this._prefix = value;
    }
    get outputName() {
        return this._outputName;
    }
    setOutputName(value) {
        this._outputName = value;
    }
    get suffix() {
        return this._suffix;
    }
    setSuffix(value) {
        this._suffix = value;
    }
    toJSON() {
        return this.toString();
    }
    toString() {
        return "${" + this.targetName + "}";
    }
    addSources(...sources) {
        for (let it of sources.flat()) {
            this[IMPL].addSource("indirectly", false, createSources(this[TARGET_SCOPE], it));
        }
    }
    getIncludes() {
        return this._includes;
    }
    addIncludes(...includes) {
        this.addIncludesImpl(false, ...includes);
    }
    addPublicIncludes(...includes) {
        this.addIncludesImpl(true, ...includes);
    }
    addIncludesImpl(publicOnly, ...includes) {
        const baseDir = this[TARGET_SCOPE].SOURCE_DIR;
        for (const value of normalizeIncludes(baseDir, ...includes))
            this._includes.push({ publicOnly, value });
    }
    getDefinitions() {
        return this._definitions;
    }
    addDefinitions(...definitions) {
        this.addDefinitionsImpl(false, ...definitions);
    }
    addPublicDefinitions(...definitions) {
        this.addDefinitionsImpl(true, ...definitions);
    }
    addDefinitionsImpl(publicOnly, ...definitions) {
        for (const value of (0,_core_DefinitionHelper__WEBPACK_IMPORTED_MODULE_8__.normalizeDefinitions)(...definitions))
            this._definitions.push({ publicOnly, value });
    }
    addCompileOptions(...options) {
        this[IMPL].addCompileOptions("indirectly", false, ...options);
    }
    addPublicCompileOptions(...options) {
        this[IMPL].addCompileOptions("indirectly", true, ...options);
    }
    addLinkOptions(...options) {
        this[IMPL].addLinkOptions("indirectly", false, ...options);
    }
    addPublicLinkOptions(...options) {
        this[IMPL].addLinkOptions("indirectly", true, ...options);
    }
    getSourceFiles(...sources) {
        return getSourceFiles(this[IMPL], this[TARGET_SCOPE], ...sources);
    }
    addLibraries(...libraries) {
        new Error("Not Implemented");
    }
    addPreBuild(command, args) {
        new Error("Not Implemented");
    }
    addPostBuild(command, args) {
        new Error("Not Implemented");
    }
    get positionIndependentCode() {
        return this._positionIndependentCode;
    }
    setPositionIndependentCode(value) {
        this._positionIndependentCode = value;
    }
    addPublicLibraries(...libraries) {
        new Error("Not Implemented");
    }
}
;
class BaseTarget {
    [IMPL];
    [TARGET_SCOPE];
    _name;
    _prefix = "";
    _outputName;
    _suffix = "";
    _positionIndependentCode;
    _includes = [];
    _definitions = [];
    constructor(impl, variableMap, name) {
        this[IMPL] = impl;
        this._name = name;
        this._outputName = name;
        const scope = _core_Scope__WEBPACK_IMPORTED_MODULE_5__.ScopeHelper.createVariableValues(variableMap);
        const targetFile = impl.targetFile;
        targetFile.fileDir = scope.BINARY_DIR;
        this._positionIndependentCode = scope.POSITION_INDEPENDENT_CODE;
        this[TARGET_SCOPE] = scope;
        this.addIncludesImpl(false, ...scope.INCLUDES);
    }
    get targetName() {
        return this._name;
    }
    get includes() {
        return _core_InterfaceIncludes__WEBPACK_IMPORTED_MODULE_2__.InterfaceIncludes.create(this.targetName);
    }
    get objects() {
        return _core_InterfaceObjects__WEBPACK_IMPORTED_MODULE_3__.InterfaceObjects.create(this.targetName);
    }
    get prefix() {
        return this._prefix;
    }
    setPrefix(value) {
        this._prefix = value;
    }
    get suffix() {
        return this._suffix;
    }
    setSuffix(value) {
        this._suffix = value;
    }
    get outputName() {
        return this._outputName;
    }
    setOutputName(value) {
        this._outputName = value;
    }
    get TARGET_SCOPE() {
        return this[TARGET_SCOPE];
    }
    get FILE_DIR() {
        if (!this[IMPL].targetFile.fileDir)
            throw new Error(`Target "${this.targetName}" is not defined`);
        return this[IMPL].targetFile.fileDir;
    }
    get FILE_NAME() {
        if (!this[IMPL].targetFile.fileName)
            throw new Error(`Target "${this.targetName}" is not defined`);
        return this[IMPL].targetFile.fileName;
    }
    get FILE() {
        if (!this[IMPL].targetFile.file)
            throw new Error(`Target "${this.targetName}" is not defined`);
        return this[IMPL].targetFile.file;
    }
    get IMPL() {
        return this[IMPL];
    }
    addSources(...sources) {
        for (let it of sources.flat()) {
            this[IMPL].addSource("directly", false, createSources(this[TARGET_SCOPE], it));
        }
    }
    getIncludes() {
        return this._includes;
    }
    addIncludes(...includes) {
        this.addIncludesImpl(false, ...includes);
    }
    addPublicIncludes(...includes) {
        this.addIncludesImpl(true, ...includes);
    }
    addIncludesImpl(publicOnly, ...includes) {
        const baseDir = this[TARGET_SCOPE].SOURCE_DIR;
        for (const value of normalizeIncludes(baseDir, ...includes))
            this._includes.push({ publicOnly, value });
    }
    getDefinitions() {
        return this._definitions;
    }
    addDefinitions(...definitions) {
        this.addDefinitionsImpl(false, ...definitions);
    }
    addPublicDefinitions(...definitions) {
        this.addDefinitionsImpl(true, ...definitions);
    }
    addDefinitionsImpl(publicOnly, ...definitions) {
        for (const value of (0,_core_DefinitionHelper__WEBPACK_IMPORTED_MODULE_8__.normalizeDefinitions)(...definitions))
            this._definitions.push({ publicOnly, value });
    }
    addLibraries(...libraries) {
        this[IMPL].addLibraries("directly", false, ...libraries);
    }
    addCompileOptions(...options) {
        this[IMPL].addCompileOptions("directly", false, ...options);
    }
    addLinkOptions(...options) {
        this[IMPL].addLinkOptions("directly", false, ...options);
    }
    getSourceFiles(...sources) {
        return getSourceFiles(this[IMPL], this[TARGET_SCOPE], ...sources);
    }
    addPreBuild(command, args) {
        this[IMPL].addPreBuild(command, args);
    }
    addPostBuild(command, args) {
        this[IMPL].addPostBuild(command, args);
    }
    get targetFile() {
        const targetFile = this[IMPL].targetFile;
        return _core_TargetStruct__WEBPACK_IMPORTED_MODULE_6__.LiveString.create(() => targetFile.file ? targetFile.file.toString() : "");
    }
    get positionIndependentCode() {
        return this._positionIndependentCode;
    }
    setPositionIndependentCode(value) {
        this._positionIndependentCode = value;
    }
    addPublicLibraries(...libraries) {
        this[IMPL].addLibraries("directly", true, ...libraries);
    }
    addPublicCompileOptions(...options) {
        this[IMPL].addCompileOptions("directly", true, ...options);
    }
    addPublicLinkOptions(...options) {
        this[IMPL].addLinkOptions("directly", true, ...options);
    }
    toJSON() {
        return {
            NAME: this.targetName,
            TARGET_SCOPE: this.TARGET_SCOPE,
            FILE_DIR: this.FILE_DIR,
            FILE: this.FILE,
        };
    }
}
;
class ObjectLibrary extends BaseTarget {
    constructor(impl, variableMap, name) {
        super(impl, variableMap, name);
        this._prefix = this[TARGET_SCOPE].OBJECT_LIBRARY_PREFIX;
        this._suffix = this[TARGET_SCOPE].OBJECT_LIBRARY_SUFFIX;
        this[IMPL].type = _core_TargetStruct__WEBPACK_IMPORTED_MODULE_6__.TargetType.ObjectLibrary;
        this[IMPL].addLinkOptions("initialize", true, ...this[TARGET_SCOPE].OBJECT_LINKER_FLAGS);
    }
    static create(impl, variableMap, name) {
        return Object.seal(new ObjectLibrary(impl, variableMap, name));
    }
}
;
class StaticLibrary extends BaseTarget {
    constructor(impl, variableMap, name) {
        super(impl, variableMap, name);
        this._prefix = this[TARGET_SCOPE].STATIC_LIBRARY_PREFIX;
        this._suffix = this[TARGET_SCOPE].STATIC_LIBRARY_SUFFIX;
        this[IMPL].type = _core_TargetStruct__WEBPACK_IMPORTED_MODULE_6__.TargetType.StaticLibrary;
        this[IMPL].addLinkOptions("initialize", true, ...this[TARGET_SCOPE].STATIC_LINKER_FLAGS);
    }
    static create(impl, variableMap, name) {
        return Object.seal(new StaticLibrary(impl, variableMap, name));
    }
}
;
class SharedLibrary extends BaseTarget {
    constructor(impl, variableMap, name) {
        super(impl, variableMap, name);
        this._prefix = this[TARGET_SCOPE].SHARED_LIBRARY_PREFIX;
        this._suffix = this[TARGET_SCOPE].SHARED_LIBRARY_SUFFIX;
        this[IMPL].type = _core_TargetStruct__WEBPACK_IMPORTED_MODULE_6__.TargetType.SharedLibrary;
        this[IMPL].addLinkOptions("initialize", true, ...this[TARGET_SCOPE].SHARED_LINKER_FLAGS);
    }
    static create(impl, variableMap, name) {
        return Object.seal(new SharedLibrary(impl, variableMap, name));
    }
}
class Executable extends BaseTarget {
    constructor(impl, variableMap, name) {
        super(impl, variableMap, name);
        this._prefix = "";
        this._suffix = this[TARGET_SCOPE].EXECUTABLE_SUFFIX;
        this[IMPL].type = _core_TargetStruct__WEBPACK_IMPORTED_MODULE_6__.TargetType.Executable;
        this[IMPL].addLinkOptions("initialize", true, ...this[TARGET_SCOPE].EXE_LINKER_FLAGS);
    }
    static create(impl, variableMap, name) {
        return Object.seal(new Executable(impl, variableMap, name));
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
/* harmony export */   TargetCollection: () => (/* binding */ TargetCollection),
/* harmony export */   TargetStructCollection: () => (/* binding */ TargetStructCollection)
/* harmony export */ });
/* harmony import */ var _core_InterfaceIncludes__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! @/core/InterfaceIncludes */ "./src/core/InterfaceIncludes.ts");
/* harmony import */ var _core_Target__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! @/core/Target */ "./src/core/Target.ts");
/* harmony import */ var _core_TargetStruct__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! @/core/TargetStruct */ "./src/core/TargetStruct.ts");
/* harmony import */ var _Constants__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! @/Constants */ "./src/Constants.ts");
/* harmony import */ var _AbsolutePath__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! ./AbsolutePath */ "./src/core/AbsolutePath.ts");
/*
 * MIT License
 *
 * Copyright (c) 2025  Yurii Yakubin (yurii.yakubin@gmail.com)
 *
 * Permission is granted to use, copy, modify, and distribute this software
 * under the MIT License. See LICENSE file for details.
 */





const ENTRIES = Symbol("ENTRIES");
class TargetStructCollection {
    [ENTRIES] = new Map;
    constructor() {
    }
    getOrCreate(name) {
        if (typeof name !== "string")
            throw new Error(`Target "${name}" is not string type`);
        if ([_Constants__WEBPACK_IMPORTED_MODULE_3__.ALL_TARGET, _Constants__WEBPACK_IMPORTED_MODULE_3__.INSTALL_TARGET].includes(name))
            throw new Error(`Target "${name}" is reserved name`);
        let result = this[ENTRIES].get(name);
        if (!result) {
            result = new _core_TargetStruct__WEBPACK_IMPORTED_MODULE_2__.TargetStruct(name);
            this[ENTRIES].set(name, result);
        }
        return result;
    }
    get(name) {
        const result = this[ENTRIES].get(name);
        if (!result)
            throw `Target "${name}" does not exist`;
        return result;
    }
    toJSON() {
        const result = {};
        this[ENTRIES].forEach((v, k) => void (result[k] = v));
        return result;
    }
}
;
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
            if (iter instanceof _core_InterfaceIncludes__WEBPACK_IMPORTED_MODULE_0__.InterfaceIncludes || iter instanceof _core_Target__WEBPACK_IMPORTED_MODULE_1__.UserIndirectTarget) {
                if (!targetSet.has(iter.targetName)) {
                    targetSet.add(iter.targetName);
                    const target = this.get(iter.targetName);
                    this.__getAllIncludes(includes, targetSet, target.IMPL.getPublicIncludes());
                    this.__getAllIncludes(includes, targetSet, target.IMPL.getPublicLibraries());
                }
            }
            else if (iter instanceof _AbsolutePath__WEBPACK_IMPORTED_MODULE_4__.AbsolutePath) {
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
        const targetSet = new Set([target.IMPL.name]);
        this.__getAllIncludes(includes, targetSet, target.IMPL.getIncludes());
        this.__getAllIncludes(includes, targetSet, target.IMPL.getLibraries());
        return includes;
    }
    __getAllHeaders(headers, targetSet, list) {
        for (const iter of list) {
            if (iter instanceof _core_InterfaceIncludes__WEBPACK_IMPORTED_MODULE_0__.InterfaceIncludes || iter instanceof _core_Target__WEBPACK_IMPORTED_MODULE_1__.UserIndirectTarget) {
                if (!targetSet.has(iter.targetName)) {
                    targetSet.add(iter.targetName);
                    const target = this.get(iter.targetName);
                    for (const header of target.IMPL.getHeaders().map((i) => i.FILE.toString())) {
                        if (!headers.includes(header.toString()))
                            headers.push(header.toString());
                    }
                    this.__getAllHeaders(headers, targetSet, target.IMPL.getPublicIncludes());
                    this.__getAllHeaders(headers, targetSet, target.IMPL.getPublicLibraries());
                }
            }
        }
    }
    allHeadersOf(params) {
        const target = (typeof params === "string") ? this.get(params) : params;
        const headers = target.IMPL.getHeaders().map((i) => i.FILE.toString());
        const targetSet = new Set([target.IMPL.name]);
        this.__getAllHeaders(headers, targetSet, target.IMPL.getIncludes());
        this.__getAllHeaders(headers, targetSet, target.IMPL.getLibraries());
        return headers;
    }
    __getAllLibraries(libraries, targetSet, list) {
        for (const iter of list) {
            console.assert(iter instanceof _core_Target__WEBPACK_IMPORTED_MODULE_1__.UserIndirectTarget);
            if (!targetSet.has(iter.targetName)) {
                targetSet.add(iter.targetName);
                const target = this.get(iter.targetName);
                libraries.push(target.FILE.toString());
                this.__getAllLibraries(libraries, targetSet, target.IMPL.getPublicLibraries());
            }
        }
    }
    allLibrariesOf(params) {
        const target = (typeof params === "string") ? this.get(params) : params;
        const libraries = [];
        const targetSet = new Set([target.IMPL.name]);
        this.__getAllLibraries(libraries, targetSet, target.IMPL.getLibraries());
        return libraries;
    }
    __getAllDefinitions(definitions, targetSet, list) {
        for (const iter of list) {
            if (iter instanceof _core_Target__WEBPACK_IMPORTED_MODULE_1__.UserIndirectTarget) {
                if (!targetSet.has(iter.targetName)) {
                    targetSet.add(iter.targetName);
                    const target = this.get(iter.targetName);
                    this.__getAllDefinitions(definitions, targetSet, target.IMPL.getPublicDefinitions());
                    this.__getAllDefinitions(definitions, targetSet, target.IMPL.getPublicLibraries());
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
        const targetSet = new Set([target.IMPL.name]);
        this.__getAllDefinitions(definitions, targetSet, target.IMPL.getDefinitions());
        this.__getAllDefinitions(definitions, targetSet, target.IMPL.getPublicLibraries());
        return definitions;
    }
    __getAllCompileOptions(options, targetSet, list) {
        for (const iter of list) {
            if (iter instanceof _core_Target__WEBPACK_IMPORTED_MODULE_1__.UserIndirectTarget) {
                if (!targetSet.has(iter.targetName)) {
                    targetSet.add(iter.targetName);
                    const target = this.get(iter.targetName);
                    this.__getAllCompileOptions(options, targetSet, target.IMPL.getPublicCompileOptions());
                    this.__getAllCompileOptions(options, targetSet, target.IMPL.getPublicLibraries());
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
        const targetSet = new Set([target.IMPL.name]);
        this.__getAllCompileOptions(options, targetSet, target.IMPL.getCompileOptions());
        this.__getAllCompileOptions(options, targetSet, target.IMPL.getPublicLibraries());
        return options.flat();
    }
    __getLinkOptions(options, targetSet, list) {
        for (const iter of list) {
            if (iter instanceof _core_Target__WEBPACK_IMPORTED_MODULE_1__.UserIndirectTarget) {
                if (!targetSet.has(iter.targetName)) {
                    targetSet.add(iter.targetName);
                    const target = this.get(iter.targetName);
                    this.__getLinkOptions(options, targetSet, target.IMPL.getPublicLinkOptions());
                    this.__getLinkOptions(options, targetSet, target.IMPL.getPublicLibraries());
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
        const targetSet = new Set([target.IMPL.name]);
        this.__getLinkOptions(options, targetSet, target.IMPL.getLinkOptions());
        this.__getLinkOptions(options, targetSet, target.IMPL.getPublicLibraries());
        return options.flat();
    }
}


/***/ }),

/***/ "./src/core/TargetStruct.ts":
/*!**********************************!*\
  !*** ./src/core/TargetStruct.ts ***!
  \**********************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   LiveString: () => (/* binding */ LiveString),
/* harmony export */   TargetFile: () => (/* binding */ TargetFile),
/* harmony export */   TargetStruct: () => (/* binding */ TargetStruct),
/* harmony export */   TargetType: () => (/* binding */ TargetType)
/* harmony export */ });
/* harmony import */ var _core_AbsolutePath__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! @/core/AbsolutePath */ "./src/core/AbsolutePath.ts");
/* harmony import */ var _core_InterfaceObjects__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! @/core/InterfaceObjects */ "./src/core/InterfaceObjects.ts");
/* harmony import */ var _core_Target__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! @/core/Target */ "./src/core/Target.ts");
/* harmony import */ var _core_SourceFile__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! @/core/SourceFile */ "./src/core/SourceFile.ts");
/*
 * MIT License
 *
 * Copyright (c) 2025  Yurii Yakubin (yurii.yakubin@gmail.com)
 *
 * Permission is granted to use, copy, modify, and distribute this software
 * under the MIT License. See LICENSE file for details.
 */




var TargetType;
(function (TargetType) {
    TargetType["Unknown"] = "Unknown";
    TargetType["StaticLibrary"] = "StaticLibrary";
    TargetType["SharedLibrary"] = "SharedLibrary";
    TargetType["ObjectLibrary"] = "ObjectLibrary";
    TargetType["Executable"] = "Executable";
})(TargetType || (TargetType = {}));
;
const FUNC = Symbol("FUNC");
class LiveString {
    [FUNC];
    constructor(func) {
        this[FUNC] = func;
    }
    static create(func) {
        return Object.seal(new LiveString(func));
    }
    toString() {
        return this[FUNC]();
    }
}
;
class TargetFile {
    _fileDir;
    _prefix = "";
    _outputName = "";
    _suffix = "";
    constructor() {
    }
    static create() {
        return Object.seal(new TargetFile);
    }
    get prefix() {
        return this._prefix;
    }
    setPrefix(value) {
        this._prefix = value;
    }
    get outputName() {
        return this._outputName;
    }
    setOutputName(value) {
        this._outputName = value;
    }
    get suffix() {
        return this._suffix;
    }
    setSuffix(value) {
        this._suffix = value;
    }
    get fileName() {
        if (this.prefix === undefined || this.outputName === undefined || this.suffix === undefined)
            return undefined;
        return this.prefix + this.outputName + this.suffix;
    }
    get fileDir() {
        return this._fileDir;
    }
    set fileDir(value) {
        this._fileDir = value;
    }
    get file() {
        const fileDir = this.fileDir;
        if (fileDir === undefined)
            return undefined;
        const fileName = this.fileName;
        if (fileName === undefined)
            return undefined;
        return fileDir.join(fileName);
    }
    toString() {
        const file = this.file;
        return file ? file.toString() : "";
    }
    toJSON() {
        return {
            outputName: this.outputName,
            prefix: this.prefix,
            suffix: this.suffix,
            fileDir: this.fileDir,
            fileName: this.fileName,
            file: this.file,
        };
    }
}
;
;
function makeTargetCommand(_command, _args) {
    let command;
    if (typeof _command === "string")
        command = _command;
    else if (_command instanceof LiveString)
        command = _command;
    else if (_command instanceof _core_AbsolutePath__WEBPACK_IMPORTED_MODULE_0__.AbsolutePath)
        command = _command.toString();
    else
        throw new TypeError(`Wrong type ${_command} for command`);
    const args = new Array;
    for (const iter of _args) {
        if (typeof iter === "string")
            args.push(iter);
        else if (iter instanceof LiveString)
            args.push(iter);
        else if (iter instanceof _core_AbsolutePath__WEBPACK_IMPORTED_MODULE_0__.AbsolutePath)
            args.push(iter.toString());
        else if (iter instanceof _core_AbsolutePath__WEBPACK_IMPORTED_MODULE_0__.AbsolutePath)
            args.push(iter.toString());
        else
            throw new TypeError(`Wrong type ${iter} for argument`);
    }
    return { command, args };
}
;
class TargetItems {
    _items = new Array();
    addItem(origin, publicOnly, value) {
        this._items.push({ origin, publicOnly, value });
    }
    getItems() {
        const firstList = new Array();
        const lastList = new Array();
        for (const iter of this._items) {
            if (iter.origin !== "indirectly")
                firstList.push(iter.value);
            else
                lastList.push(iter.value);
        }
        return firstList.concat(lastList);
    }
    getPublicItems() {
        const firstList = new Array();
        const lastList = new Array();
        for (const iter of this._items) {
            if (!iter.publicOnly)
                continue;
            if (iter.origin !== "indirectly")
                firstList.push(iter.value);
            else
                lastList.push(iter.value);
        }
        return firstList.concat(lastList);
    }
    get items() {
        return this._items;
    }
    toJSON() {
        return this._items;
    }
}
;
class TargetStruct {
    _name;
    _type;
    _targetFile;
    _preBuildList = new Array;
    _postBuildList = new Array;
    _defines = new TargetItems;
    _includes = new TargetItems;
    _compileOptions = new TargetItems;
    _linkOptions = new TargetItems;
    _sources = new TargetItems;
    _libraries = new TargetItems;
    _positionIndependentCode = false;
    constructor(name) {
        this._name = name;
        this._type = TargetType.Unknown;
        this._targetFile = TargetFile.create();
    }
    get name() {
        return this._name;
    }
    get type() {
        return this._type;
    }
    set type(value) {
        if (this._type === value)
            return;
        if (this._type !== TargetType.Unknown)
            throw new Error(`${this._type} "${this._name}" target cannot be change to ${value}`);
        this._type = value;
    }
    get targetFile() {
        return this._targetFile;
    }
    get positionIndependentCode() {
        return this._positionIndependentCode;
    }
    setPositionIndependentCode(value) {
        this._positionIndependentCode = value;
    }
    addPreBuild(command, args) {
        this._preBuildList.push(makeTargetCommand(command, args));
    }
    addPostBuild(command, args) {
        this._postBuildList.push(makeTargetCommand(command, args));
    }
    get preBuildList() {
        return this._preBuildList;
    }
    get postBuildList() {
        return this._postBuildList;
    }
    addCompileOption(origin, publicOnly, value) {
        this._compileOptions.addItem(origin, publicOnly, value);
    }
    addCompileOptions(origin, publicOnly, ...options) {
        for (const iter of options.flat())
            this.addCompileOption(origin, publicOnly, iter);
    }
    getCompileOptions() {
        return this._compileOptions.getItems();
    }
    getPublicCompileOptions() {
        return this._compileOptions.getPublicItems();
    }
    addLinkOption(origin, publicOnly, value) {
        return this._linkOptions.addItem(origin, publicOnly, value);
    }
    addLinkOptions(origin, publicOnly, ...options) {
        for (const iter of options.flat())
            this.addLinkOption(origin, publicOnly, iter);
    }
    getLinkOptions() {
        return this._linkOptions.getItems();
    }
    getPublicLinkOptions() {
        return this._linkOptions.getPublicItems();
    }
    addDefinition(origin, publicOnly, value) {
        this._defines.addItem(origin, publicOnly, value);
    }
    getDefinitions() {
        return this._defines.getItems();
    }
    getPublicDefinitions() {
        return this._defines.getPublicItems();
    }
    addInclude(origin, publicOnly, value) {
        this._includes.addItem(origin, publicOnly, value);
    }
    getIncludes() {
        return this._includes.getItems();
    }
    getPublicIncludes() {
        return this._includes.getPublicItems();
    }
    addSource(origin, publicOnly, value) {
        this._sources.addItem(origin, publicOnly, value);
    }
    addSources(origin, ...sources) {
        for (const iter of sources.flat())
            this.addSource(origin, false, iter);
    }
    getSourceFiles() {
        return this._sources.items.map(i => i.value).filter(i => i instanceof _core_SourceFile__WEBPACK_IMPORTED_MODULE_3__.SourceFile);
    }
    getInterfaceObjectsList() {
        return this._sources.items.map(i => i.value).filter(i => i instanceof _core_InterfaceObjects__WEBPACK_IMPORTED_MODULE_1__.InterfaceObjects);
    }
    getHeaders() {
        const result = new Array;
        for (const iter of this._sources.items) {
            if (iter.value instanceof _core_SourceFile__WEBPACK_IMPORTED_MODULE_3__.SourceFile && iter.value.HEADER_FILE_ONLY)
                result.push(iter.value);
        }
        return result;
    }
    addLibrary(origin, publicOnly, value) {
        this._libraries.addItem(origin, publicOnly, _core_Target__WEBPACK_IMPORTED_MODULE_2__.UserIndirectTarget.ensureInstance(value));
    }
    addLibraries(origin, publicOnly, ...libraries) {
        for (const iter of libraries.flat())
            this.addLibrary(origin, publicOnly, iter);
    }
    getLibraries() {
        return this._libraries.getItems();
    }
    getPublicLibraries() {
        return this._libraries.getPublicItems();
    }
    toJSON() {
        return {
            name: this._name,
            type: this._type,
            targetFile: this._targetFile,
            preBuildList: this._preBuildList,
            postBuildList: this._postBuildList,
            definitions: this._defines,
            includes: this._includes,
            compileOptions: this._compileOptions,
            linkOptions: this._linkOptions,
            sources: this._sources,
            libraries: this._libraries,
            positionIndependentCode: this._positionIndependentCode,
        };
    }
}
;


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
/* harmony import */ var _core_BaseContext__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! @/core/BaseContext */ "./src/core/BaseContext.ts");
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
class ToolchainContext extends _core_BaseContext__WEBPACK_IMPORTED_MODULE_0__.BaseContext {
    [SCOPE];
    [GLOBAL];
    constructor(global, scope) {
        super(scope);
        this[GLOBAL] = global;
        this[SCOPE] = scope;
    }
    static create(global, variableMap) {
        return (0,_core_BaseContext__WEBPACK_IMPORTED_MODULE_0__.createContext)(new ToolchainContext(global, variableMap));
    }
}
;


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

/***/ "./src/core/UserMakeContext.ts":
/*!*************************************!*\
  !*** ./src/core/UserMakeContext.ts ***!
  \*************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   UserMakeContext: () => (/* binding */ UserMakeContext)
/* harmony export */ });
/* harmony import */ var _core_BaseContext__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! @/core/BaseContext */ "./src/core/BaseContext.ts");
/* harmony import */ var _logger__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! @/logger */ "./src/logger/index.ts");
/*
 * MIT License
 *
 * Copyright (c) 2025  Yurii Yakubin (yurii.yakubin@gmail.com)
 *
 * Permission is granted to use, copy, modify, and distribute this software
 * under the MIT License. See LICENSE file for details.
 */


const logger = _logger__WEBPACK_IMPORTED_MODULE_1__.Logger.create("file:///mnt/c/opt/work/source/darkit-sdk/external/bitmake/src/core/UserMakeContext.ts");
const IMPL = Symbol("IMPL");
class UserMakeContext extends _core_BaseContext__WEBPACK_IMPORTED_MODULE_0__.BaseContext {
    [IMPL];
    constructor(impl, variableMap) {
        super(variableMap);
        this[IMPL] = impl;
    }
    static create(impl, variableMap) {
        return (0,_core_BaseContext__WEBPACK_IMPORTED_MODULE_0__.createContext)(new UserMakeContext(impl, variableMap));
    }
    getCacheVariables() {
        return this[IMPL].getCacheVariables();
    }
    addCacheVariables(params) {
        this[IMPL].addCacheVariables(params);
    }
    addIncludeDirectories(...dirs) {
        this[IMPL].addIncludeDirectories(...dirs);
    }
    addSubdirectory(sourceDir, binaryDir) {
        this[IMPL].addSubdirectory(sourceDir, binaryDir);
    }
    addCustomScript(script, params) {
        return this[IMPL].addCustomScript(script, params);
    }
    target(name) {
        return this[IMPL].target(name);
    }
    script(name) {
        return this[IMPL].script(name);
    }
    install(value, params) {
        this[IMPL].install(value, params);
    }
    addObjectLibrary(name, ...sources) {
        return this[IMPL].addObjectLibrary(name, ...sources);
    }
    addStaticLibrary(name, ...sources) {
        return this[IMPL].addStaticLibrary(name, ...sources);
    }
    addSharedLibrary(name, ...sources) {
        return this[IMPL].addSharedLibrary(name, ...sources);
    }
    addExecutable(name, ...sources) {
        return this[IMPL].addExecutable(name, ...sources);
    }
    executeScript(script, params) {
        this[IMPL].executeScript(script, params);
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
/* harmony export */   Logger: () => (/* binding */ Logger)
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
;
;
function truncate(str, maxLength) {
    if (str.length > maxLength)
        return str.slice(0, maxLength - 3) + "...";
    return str;
}
function makeLogMethod(withPrefix, type, tagName, target, handler) {
    return (...args) => {
        const now = new Date();
        const strList = withPrefix ? [now.toISOString(), type, tagName] : [];
        for (const iter of args)
            strList.push((typeof iter === "string") ? iter : JSON.stringify(iter));
        const message = strList.join(" ");
        handler.call(target, truncate(message, 320));
    };
}
let _defaultPattern = "";
const _loggerMap = new Map();
const stub = () => { };
function initLogger(logger, tagName, filter) {
    logger.debug = stub;
    logger.info = stub;
    logger.notice = stub;
    logger.warn = stub;
    logger.error = stub;
    logger.fatal = stub;
    let level = 0;
    const flags = {};
    for (const iter of filter.split(",")) {
        if (iter === "*") {
            level = 5;
            break;
        }
        if (/^\d+$/.test(iter))
            level = Math.max(level, parseInt(iter));
        else
            flags[iter] = true;
    }
    logger.fatal = makeLogMethod(level > 2, "F", tagName, console, console.error);
    if (level > 1 || flags.error)
        logger.error = makeLogMethod(level > 2, "E", tagName, console, console.error);
    if (level > 2 || flags.warn)
        logger.warn = makeLogMethod(level > 2, "W", tagName, console, console.warn);
    logger.notice = makeLogMethod(level > 2, "N", tagName, console, console.log);
    if (level > 3 || flags.info)
        logger.info = makeLogMethod(level > 2, "I", tagName, console, console.info);
    if (level > 4 || flags.debug)
        logger.debug = makeLogMethod(level > 2, "D", tagName, console, console.debug);
}
function createEntry(tagName, filter) {
    const entry = { tagName, filter, logger: {} };
    initLogger(entry.logger, tagName, filter);
    return entry;
}
function entrySetFilter(entry, filter) {
    if (entry.filter !== filter) {
        initLogger(entry.logger, entry.tagName, filter);
        entry.filter = filter;
    }
}
function allSetFilter(filter) {
    _defaultPattern = filter;
    for (const entry of _loggerMap.values())
        entrySetFilter(entry, filter);
}
var Logger;
(function (Logger) {
    function create(url) {
        const tagName = url.startsWith("file:///mnt/c/opt/work/source/darkit-sdk/external/bitmake/src" + "/") ? url.substring("file:///mnt/c/opt/work/source/darkit-sdk/external/bitmake/src".length + 1) : url;
        if (!tagName || tagName === "*")
            throw new Error(`Logger ${url} not allowed`);
        let entry = _loggerMap.get(tagName);
        if (!entry) {
            entry = createEntry(tagName, _defaultPattern);
            _loggerMap.set(tagName, entry);
        }
        return entry.logger;
    }
    Logger.create = create;
    function enable(filter) {
        if (filter === "*") {
            allSetFilter("*");
            return;
        }
        const pair = filter.split(":");
        if (pair.length < 2)
            return;
        if (pair[0] === "*") {
            allSetFilter(pair[0]);
            return;
        }
        let entry = _loggerMap.get(pair[0]);
        if (!entry) {
            entry = createEntry(pair[0], pair[1]);
            _loggerMap.set(filter, entry);
        }
        else {
            entrySetFilter(entry, pair[1]);
        }
    }
    Logger.enable = enable;
})(Logger || (Logger = {})); // namespace Logger
for (const iter of ["*"]) {
    Logger.enable(iter);
}


/***/ }),

/***/ "./src/server/JsonRpcRequestSync.ts":
/*!******************************************!*\
  !*** ./src/server/JsonRpcRequestSync.ts ***!
  \******************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   JsonRpcRequestSync: () => (/* binding */ JsonRpcRequestSync)
/* harmony export */ });
/* harmony import */ var _server_Transport__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! @/server/Transport */ "./src/server/Transport.ts");
/* harmony import */ var _logger__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! @/logger */ "./src/logger/index.ts");
/*
 * MIT License
 *
 * Copyright (c) 2025  Yurii Yakubin (yurii.yakubin@gmail.com)
 *
 * Permission is granted to use, copy, modify, and distribute this software
 * under the MIT License. See LICENSE file for details.
 */


const logger = _logger__WEBPACK_IMPORTED_MODULE_1__.Logger.create("file:///mnt/c/opt/work/source/darkit-sdk/external/bitmake/src/server/JsonRpcRequestSync.ts");
class JsonRpcRequestSync {
    _request;
    _id;
    constructor(requestSync) {
        this._request = requestSync;
        this._id = 1;
    }
    requestSync(method, params) {
        logger.debug("JsonRpcRequestSync.requestSync(", method, "...params)");
        const message = {
            jsonrpc: _server_Transport__WEBPACK_IMPORTED_MODULE_0__.JSONRPC_VERSION,
            method,
            params,
            id: this._id++,
        };
        const response = this._request.requestSync(message);
        if (response.error)
            throw new Error(response.error.message, { cause: response.error.code });
        return response.result;
    }
}
;


/***/ }),

/***/ "./src/server/JsonRpcServer.ts":
/*!*************************************!*\
  !*** ./src/server/JsonRpcServer.ts ***!
  \*************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   JsonRpcServer: () => (/* binding */ JsonRpcServer)
/* harmony export */ });
/* harmony import */ var _server_Transport__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! @/server/Transport */ "./src/server/Transport.ts");
/* harmony import */ var _logger__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! @/logger */ "./src/logger/index.ts");
/*
 * MIT License
 *
 * Copyright (c) 2025  Yurii Yakubin (yurii.yakubin@gmail.com)
 *
 * Permission is granted to use, copy, modify, and distribute this software
 * under the MIT License. See LICENSE file for details.
 */


const logger = _logger__WEBPACK_IMPORTED_MODULE_1__.Logger.create("file:///mnt/c/opt/work/source/darkit-sdk/external/bitmake/src/server/JsonRpcServer.ts");
class JsonRpcRequest {
    _params;
    constructor(params) {
        this._params = params;
    }
    get params() {
        return this._params;
    }
}
class JsonRpcResponse {
    _sender;
    _id;
    constructor(sender, id) {
        this._sender = sender;
        this._id = id;
    }
    sendResult(result) {
        const message = {
            jsonrpc: _server_Transport__WEBPACK_IMPORTED_MODULE_0__.JSONRPC_VERSION,
            result: (result !== undefined) ? result : null,
            id: this._id,
        };
        logger.debug("<--", JSON.stringify(message));
        this._sender.sendMessage(message);
    }
    sendError(code, message, data) {
        const error = { code, message };
        if (data !== undefined) {
            error.data = data;
        }
        const msg = {
            jsonrpc: _server_Transport__WEBPACK_IMPORTED_MODULE_0__.JSONRPC_VERSION,
            error,
            id: this._id,
        };
        logger.debug("<--", JSON.stringify(msg));
        this._sender.sendMessage(msg);
    }
}
;
class JsonRpcServer {
    _requestHandlers = new Map();
    constructor() {
    }
    registerHandler(method, handler) {
        this._requestHandlers.set(method, handler);
    }
    registerCallback(method, callback) {
        this._requestHandlers.set(method, async (request, response) => {
            let result = callback(request.params);
            if (result instanceof Promise)
                result = await result;
            if (result && typeof result === "object" && typeof result.toJSON === "function")
                result = result.toJSON();
            response.sendResult(result);
        });
    }
    onRequest(sender, method, id, params) {
        const handler = (typeof method === "string") ? this._requestHandlers.get(method) : undefined;
        const response = new JsonRpcResponse(sender, id);
        if (handler) {
            handler(new JsonRpcRequest(params), response);
        }
        else {
            response.sendError(-32601, "Method not found");
        }
    }
    onResult(sender, result, id) {
    }
    onError(sender, error, id) {
    }
    onNotification(sender, method, params) {
    }
    onMessageImpl(sender, message) {
        if (!message || typeof message !== "object") {
            return;
        }
        const data = message;
        if (Object.hasOwn(data, "method")) {
            if (Object.hasOwn(data, "id"))
                this.onRequest(sender, data.method, data.id, data.params);
            else
                this.onNotification(sender, data.method, data.params);
        }
        else if (data.id) {
        }
        else {
        }
    }
    emitMessage(sender, message) {
        logger.debug("-->", JSON.stringify(message));
        if (Array.isArray(message))
            message.forEach(msg => this.onMessageImpl(sender, msg));
        else
            this.onMessageImpl(sender, message);
    }
}
;


/***/ }),

/***/ "./src/server/MakeClient.ts":
/*!**********************************!*\
  !*** ./src/server/MakeClient.ts ***!
  \**********************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   MakeClient: () => (/* binding */ MakeClient)
/* harmony export */ });
/* harmony import */ var node_worker_threads__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! node:worker_threads */ "node:worker_threads");
/* harmony import */ var node_worker_threads__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(node_worker_threads__WEBPACK_IMPORTED_MODULE_0__);
/* harmony import */ var _utils_Module__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! @/utils/Module */ "./src/utils/Module.ts");
/* harmony import */ var _server_MemoryTransport__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! @/server/MemoryTransport */ "./src/server/MemoryTransport.ts");
/* harmony import */ var _server_WorkerSender__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! @/server/WorkerSender */ "./src/server/WorkerSender.ts");
/* harmony import */ var _server_Transport__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! @/server/Transport */ "./src/server/Transport.ts");
/* harmony import */ var _logger__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(/*! @/logger */ "./src/logger/index.ts");
/*
 * MIT License
 *
 * Copyright (c) 2025  Yurii Yakubin (yurii.yakubin@gmail.com)
 *
 * Permission is granted to use, copy, modify, and distribute this software
 * under the MIT License. See LICENSE file for details.
 */






const logger = _logger__WEBPACK_IMPORTED_MODULE_5__.Logger.create("file:///mnt/c/opt/work/source/darkit-sdk/external/bitmake/src/server/MakeClient.ts");
;
class MakeClient {
    _jsonRpcServer;
    _worker;
    _id = 1;
    _waitResponseMap = new Map();
    ;
    constructor(jsonRpcServer) {
        this._jsonRpcServer = jsonRpcServer;
        this._worker = new node_worker_threads__WEBPACK_IMPORTED_MODULE_0__.Worker((0,_utils_Module__WEBPACK_IMPORTED_MODULE_1__.currentScriptURL)());
        this._worker.on("message", message => this.onWorkerMessage(message));
        this._worker.on("error", error => this.onWorkerError(error));
        this._worker.on("exit", code => this.onWorkerExit(code));
    }
    async request(method, params) {
        const id = this._id++;
        const result = new Promise((resolve, reject) => {
            this._waitResponseMap.set(id, { resolve, reject });
        });
        this._worker.postMessage({
            jsonrpc: _server_Transport__WEBPACK_IMPORTED_MODULE_4__.JSONRPC_VERSION,
            method,
            params,
            id,
        });
        return result;
    }
    onWorkerMessage(message) {
        if (message instanceof SharedArrayBuffer) {
            const mt = new _server_MemoryTransport__WEBPACK_IMPORTED_MODULE_2__.MemoryMessageSender(message);
            this._jsonRpcServer.emitMessage(mt, mt.readMessage());
        }
        else if (Object.hasOwn(message, "method")) {
            const sender = new _server_WorkerSender__WEBPACK_IMPORTED_MODULE_3__.WorkerSender(this._worker);
            this._jsonRpcServer.emitMessage(sender, message);
        }
        else if (Object.hasOwn(message, "id")) {
            const promise = this._waitResponseMap.get(message.id);
            if (!promise)
                throw new Error(`Unknown response "${message.id}" id`);
            if (Object.hasOwn(message, "result"))
                promise.resolve(message.result);
            else if (Object.hasOwn(message, "error"))
                promise.reject(message.error);
            else
                throw new Error(`Unknown message type of "${message}"`);
        }
    }
    onWorkerError(error) {
        if (error instanceof Error)
            logger.fatal(error.stack);
        else
            logger.fatal(error);
        process.exit(1);
    }
    onWorkerExit(code) {
        if (code)
            process.exit(code);
    }
}
;


/***/ }),

/***/ "./src/server/MakeServer.ts":
/*!**********************************!*\
  !*** ./src/server/MakeServer.ts ***!
  \**********************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   BUILD_EVENT: () => (/* binding */ BUILD_EVENT),
/* harmony export */   CONFIGURE_EVENT: () => (/* binding */ CONFIGURE_EVENT),
/* harmony export */   MakeServer: () => (/* binding */ MakeServer)
/* harmony export */ });
/* harmony import */ var node_fs__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! node:fs */ "node:fs");
/* harmony import */ var node_fs__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(node_fs__WEBPACK_IMPORTED_MODULE_0__);
/* harmony import */ var _core_ProjectContext__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! @/core/ProjectContext */ "./src/core/ProjectContext.ts");
/* harmony import */ var _core_ScriptContext__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! @/core/ScriptContext */ "./src/core/ScriptContext.ts");
/* harmony import */ var _core_Scope__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! @/core/Scope */ "./src/core/Scope.ts");
/* harmony import */ var _server_MakeClient__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! @/server/MakeClient */ "./src/server/MakeClient.ts");
/* harmony import */ var _server_JsonRpcServer__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(/*! @/server/JsonRpcServer */ "./src/server/JsonRpcServer.ts");
/* harmony import */ var _utils_Module__WEBPACK_IMPORTED_MODULE_6__ = __webpack_require__(/*! @/utils/Module */ "./src/utils/Module.ts");
/* harmony import */ var _server_RemoteMethods__WEBPACK_IMPORTED_MODULE_7__ = __webpack_require__(/*! @/server/RemoteMethods */ "./src/server/RemoteMethods.ts");
/* harmony import */ var _logger__WEBPACK_IMPORTED_MODULE_8__ = __webpack_require__(/*! @/logger */ "./src/logger/index.ts");
/*
 * MIT License
 *
 * Copyright (c) 2025  Yurii Yakubin (yurii.yakubin@gmail.com)
 *
 * Permission is granted to use, copy, modify, and distribute this software
 * under the MIT License. See LICENSE file for details.
 */
















const logger = _logger__WEBPACK_IMPORTED_MODULE_8__.Logger.create("file:///mnt/c/opt/work/source/darkit-sdk/external/bitmake/src/server/MakeServer.ts");
const CONFIGURE_EVENT = "configure";
const BUILD_EVENT = "build";
;
;
;
class MakeServer {
    _rootVariableMap = {};
    _project = _core_ProjectContext__WEBPACK_IMPORTED_MODULE_1__.ProjectContext.create();
    _listeners;
    _jsonRpcServer = new _server_JsonRpcServer__WEBPACK_IMPORTED_MODULE_5__.JsonRpcServer;
    _clients = new Map;
    _clientIdCounter = 1;
    constructor() {
        this._listeners = {
            [CONFIGURE_EVENT]: new Array,
            [BUILD_EVENT]: new Array,
        };
        this._jsonRpcServer.registerCallback(_server_RemoteMethods__WEBPACK_IMPORTED_MODULE_7__.MAINNODE_EXECUTESCRIPT, params => this.executeScript(params));
        this._jsonRpcServer.registerCallback(_server_RemoteMethods__WEBPACK_IMPORTED_MODULE_7__.MAINNODE_LOADJSON, params => this.loadJSON(params));
        this._jsonRpcServer.registerCallback(_server_RemoteMethods__WEBPACK_IMPORTED_MODULE_7__.MAINNODE_STARTMAKESCRIPT, params => this.startMakeScript(params));
        this._jsonRpcServer.registerCallback(_server_RemoteMethods__WEBPACK_IMPORTED_MODULE_7__.MAINNODE_ADDCUSTOMSCRIPT, params => this.addCustomScript(params));
        this._jsonRpcServer.registerCallback(_server_RemoteMethods__WEBPACK_IMPORTED_MODULE_7__.MAINNODE_ADDSTATICLIBRARY, params => this.addStaticLibrary(params));
        this._jsonRpcServer.registerCallback(_server_RemoteMethods__WEBPACK_IMPORTED_MODULE_7__.MAINNODE_ADDEXECUTABLE, params => this.addExecutable(params));
        this._jsonRpcServer.registerCallback(_server_RemoteMethods__WEBPACK_IMPORTED_MODULE_7__.MAINNODE_TARGETSOURCES, params => this.targetSources(params));
    }
    get rootVariableMap() {
        return this._rootVariableMap;
    }
    get project() {
        return this._project;
    }
    createClient() {
        const name = "mkc" + this._clientIdCounter++;
        const client = new _server_MakeClient__WEBPACK_IMPORTED_MODULE_4__.MakeClient(this._jsonRpcServer);
        this._clients.set(name, client);
        return client;
    }
    async startMakeScript(params) {
        logger.debug("MakeServer.startMakeScript");
        const variableMap = _core_Scope__WEBPACK_IMPORTED_MODULE_3__.ScopeHelper.fromJSON(params);
        await this.runMakeScript(variableMap);
    }
    async loadJSON(filename) {
        logger.debug("MakeServer.loadJSON(", filename, ")");
        if (filename.endsWith(".json")) {
            const content = await node_fs__WEBPACK_IMPORTED_MODULE_0___default().promises.readFile(filename, "utf8");
            return JSON.parse(content);
        }
        const module = await (0,_utils_Module__WEBPACK_IMPORTED_MODULE_6__.importModule)(filename);
        if (!module.default)
            throw new Error(`Script "${filename}" has not contain a default function`);
        return module.default;
    }
    async executeScript(params) {
        logger.debug("MakeServer.executeScript");
        const variableMap = _core_Scope__WEBPACK_IMPORTED_MODULE_3__.ScopeHelper.fromJSON(params);
        const scriptFile = _core_Scope__WEBPACK_IMPORTED_MODULE_3__.ScopeHelper.get(variableMap, "SCRIPT_FILE");
        const module = await (0,_utils_Module__WEBPACK_IMPORTED_MODULE_6__.importModule)(scriptFile.toString());
        if (!module.default)
            throw new Error(`Script "${scriptFile}" has not contain a default function`);
        const mk = _core_ScriptContext__WEBPACK_IMPORTED_MODULE_2__.ScriptContext.create(this._project, variableMap);
        module.default(mk);
    }
    addCustomScript(params) {
        logger.debug("MakeServer.addCustomScript");
        const variableMap = _core_Scope__WEBPACK_IMPORTED_MODULE_3__.ScopeHelper.fromJSON(params);
        return this._project.addCustomScript(variableMap);
    }
    addStaticLibrary(params) {
        logger.debug("MakeServer.addStaticLibrary(", params.name, ")");
        const variableMap = _core_Scope__WEBPACK_IMPORTED_MODULE_3__.ScopeHelper.fromJSON(params.variableMap);
        this._project.addStaticLibrary(variableMap, params.name);
        return params.name;
    }
    addExecutable(params) {
        logger.debug("MakeServer.addExecutable(", params.name, ")");
        const variableMap = _core_Scope__WEBPACK_IMPORTED_MODULE_3__.ScopeHelper.fromJSON(params.variableMap);
        this._project.addExecutable(variableMap, params.name);
        return params.name;
    }
    targetSources(params) {
        logger.debug("MakeServer.targetSources(", params, ")");
        throw new Error("Not Implemented");
    }
    async runMakeScript(variableMap) {
        if (!await this._project.prepearScriptFile(variableMap))
            return false;
        const client = this.createClient();
        const cwdSave = process.cwd();
        const scriptDir = _core_Scope__WEBPACK_IMPORTED_MODULE_3__.ScopeHelper.get(variableMap, "SCRIPT_DIR");
        process.chdir(scriptDir.toString());
        await client.request(_server_RemoteMethods__WEBPACK_IMPORTED_MODULE_7__.WORKERNODE_STARTMAKESCRIPT, _core_Scope__WEBPACK_IMPORTED_MODULE_3__.ScopeHelper.toJSON(variableMap));
        process.chdir(cwdSave);
        return true;
    }
    async start() {
        const sourceDir = _core_Scope__WEBPACK_IMPORTED_MODULE_3__.ScopeHelper.get(this._rootVariableMap, "PROJECT_SOURCE_DIR");
        const binaryDir = _core_Scope__WEBPACK_IMPORTED_MODULE_3__.ScopeHelper.get(this._rootVariableMap, "PROJECT_BINARY_DIR");
        /*const variableMap = createVariableMapForDirectory(this._rootVariableMap, sourceDir, binaryDir);
        if (!await this.runMakeScript(variableMap))
          throw Error("Can't prepear ScriptFile");
    
        this.onConfigureEnd();*/
        this._project.addSubdirectory(this._rootVariableMap, sourceDir, binaryDir);
        this._project.doSubdirectory().then(() => this.onConfigureEnd());
    }
    async onConfigureEnd() {
        const event = { project: this._project };
        await this.emitEvent(CONFIGURE_EVENT, event);
        await this.emitEvent(BUILD_EVENT, event);
    }
    async emitEvent(type, event) {
        for (const listener of this._listeners[type]) {
            const result = listener(event);
            if (result instanceof Promise)
                await result;
        }
    }
    addEventListener(type, listener) {
        this._listeners[type].push(listener);
    }
}
;


/***/ }),

/***/ "./src/server/MemoryTransport.ts":
/*!***************************************!*\
  !*** ./src/server/MemoryTransport.ts ***!
  \***************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   MemoryMessageSender: () => (/* binding */ MemoryMessageSender),
/* harmony export */   MemoryTransport: () => (/* binding */ MemoryTransport)
/* harmony export */ });
/* harmony import */ var _logger__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! @/logger */ "./src/logger/index.ts");
/*
 * MIT License
 *
 * Copyright (c) 2025  Yurii Yakubin (yurii.yakubin@gmail.com)
 *
 * Permission is granted to use, copy, modify, and distribute this software
 * under the MIT License. See LICENSE file for details.
 */

const logger = _logger__WEBPACK_IMPORTED_MODULE_0__.Logger.create("file:///mnt/c/opt/work/source/darkit-sdk/external/bitmake/src/server/MemoryTransport.ts");
class MemoryMessageSender {
    _buffer;
    _memory;
    constructor(buffer) {
        this._buffer = buffer;
        this._memory = new MemoryTransport.Buffer(buffer);
    }
    sendMessage(message) {
        this._memory.set(message, true);
    }
    readMessage() {
        return this._memory.get();
    }
}
;
class MemoryTransport {
    _sender;
    _buffer;
    _memory;
    constructor(sender, buffer) {
        this._sender = sender;
        this._buffer = buffer;
        this._memory = new MemoryTransport.Buffer(buffer);
    }
    requestSync(data) {
        this._memory.set(data);
        this._sender.sendMessage(this._buffer);
        return this._memory.get(true);
    }
}
;
(function (MemoryTransport) {
    const MAGIC_OFFSET = 0;
    class Buffer {
        _signal;
        _data;
        _magic;
        constructor(buffer) {
            this._signal = new Int32Array(buffer, MAGIC_OFFSET, 1);
            this._data = new Uint8Array(buffer, this._signal.BYTES_PER_ELEMENT);
            this._magic = 0;
        }
        get(sync = false) {
            if (sync) {
                Atomics.wait(this._signal, MAGIC_OFFSET, this._magic);
            }
            this._magic = this._signal[0];
            const length = this._magic >> 8;
            const bytes = this._data.slice(0, length);
            const message = (new TextDecoder()).decode(bytes);
            return JSON.parse(message);
        }
        set(json, notify = false) {
            const message = JSON.stringify(json);
            const bytes = (new TextEncoder()).encode(message);
            this._data.set(bytes);
            this._magic = (bytes.length << 8) | ((this._magic + 1) & 255);
            this._signal[0] = this._magic;
            if (notify) {
                Atomics.notify(this._signal, MAGIC_OFFSET, 1);
            }
        }
    }
    MemoryTransport.Buffer = Buffer;
    ;
})(MemoryTransport || (MemoryTransport = {})); // namespace MemoryTransport


/***/ }),

/***/ "./src/server/MessagePortSender.ts":
/*!*****************************************!*\
  !*** ./src/server/MessagePortSender.ts ***!
  \*****************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   MessagePortSender: () => (/* binding */ MessagePortSender)
/* harmony export */ });
/* harmony import */ var _logger__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! @/logger */ "./src/logger/index.ts");
/*
 * MIT License
 *
 * Copyright (c) 2025  Yurii Yakubin (yurii.yakubin@gmail.com)
 *
 * Permission is granted to use, copy, modify, and distribute this software
 * under the MIT License. See LICENSE file for details.
 */

const logger = _logger__WEBPACK_IMPORTED_MODULE_0__.Logger.create("file:///mnt/c/opt/work/source/darkit-sdk/external/bitmake/src/server/MessagePortSender.ts");
class MessagePortSender {
    _messagePort;
    constructor(messagePort) {
        this._messagePort = messagePort;
    }
    sendMessage(message) {
        logger.debug("<--", JSON.stringify(message));
        this._messagePort.postMessage(message);
    }
}
;


/***/ }),

/***/ "./src/server/RemoteExecutable.ts":
/*!****************************************!*\
  !*** ./src/server/RemoteExecutable.ts ***!
  \****************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   RemoteExecutable: () => (/* binding */ RemoteExecutable)
/* harmony export */ });
/* harmony import */ var _logger__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! @/logger */ "./src/logger/index.ts");
/*
 * MIT License
 *
 * Copyright (c) 2025  Yurii Yakubin (yurii.yakubin@gmail.com)
 *
 * Permission is granted to use, copy, modify, and distribute this software
 * under the MIT License. See LICENSE file for details.
 */

const logger = _logger__WEBPACK_IMPORTED_MODULE_0__.Logger.create("file:///mnt/c/opt/work/source/darkit-sdk/external/bitmake/src/server/RemoteExecutable.ts");
const NAME = Symbol("REQUEST");
const REQUEST = Symbol("REQUEST");
const SCOPE = Symbol("SCOPE");
class RemoteExecutable {
    [NAME];
    [SCOPE];
    [REQUEST];
    constructor(variableMap, name, requestSync) {
        this[SCOPE] = variableMap;
        this[NAME] = name;
        this[REQUEST] = requestSync;
    }
    addSources(...sources) {
        throw new Error("Not Implemented");
    }
}
;


/***/ }),

/***/ "./src/server/RemoteMakeContext.ts":
/*!*****************************************!*\
  !*** ./src/server/RemoteMakeContext.ts ***!
  \*****************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   RemoteMakeContext: () => (/* binding */ RemoteMakeContext)
/* harmony export */ });
/* harmony import */ var _core_BaseContext__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! @/core/BaseContext */ "./src/core/BaseContext.ts");
/* harmony import */ var _server_RemoteExecutable__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! @/server/RemoteExecutable */ "./src/server/RemoteExecutable.ts");
/* harmony import */ var _server_RemoteStaticLibrary__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! @/server/RemoteStaticLibrary */ "./src/server/RemoteStaticLibrary.ts");
/* harmony import */ var _server_RemoteMethods__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! @/server/RemoteMethods */ "./src/server/RemoteMethods.ts");
/* harmony import */ var _logger__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! @/logger */ "./src/logger/index.ts");
/* harmony import */ var _core_Scope__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(/*! @/core/Scope */ "./src/core/Scope.ts");
/* harmony import */ var _Constants__WEBPACK_IMPORTED_MODULE_6__ = __webpack_require__(/*! @/Constants */ "./src/Constants.ts");
/*
 * MIT License
 *
 * Copyright (c) 2025  Yurii Yakubin (yurii.yakubin@gmail.com)
 *
 * Permission is granted to use, copy, modify, and distribute this software
 * under the MIT License. See LICENSE file for details.
 */












const logger = _logger__WEBPACK_IMPORTED_MODULE_4__.Logger.create("file:///mnt/c/opt/work/source/darkit-sdk/external/bitmake/src/server/RemoteMakeContext.ts");
class RemoteMakeContext {
    _scope;
    _transport;
    _targets = new Map();
    constructor(scope, transport) {
        this._scope = scope;
        this._transport = transport;
    }
    get targets() {
        return this._targets;
    }
    executeScript(script, params) {
        const newVariableMap = _core_Scope__WEBPACK_IMPORTED_MODULE_5__.ScopeHelper.cloneVariableMap(this._scope);
        params && _core_Scope__WEBPACK_IMPORTED_MODULE_5__.ScopeHelper.extendVariableMapByValues(newVariableMap, "", params);
        const scriptFile = _core_Scope__WEBPACK_IMPORTED_MODULE_5__.ScopeHelper.get(newVariableMap, "SOURCE_DIR").resolve(script);
        _core_Scope__WEBPACK_IMPORTED_MODULE_5__.ScopeHelper.set(newVariableMap, "SCRIPT_FILE", scriptFile);
        _core_Scope__WEBPACK_IMPORTED_MODULE_5__.ScopeHelper.set(newVariableMap, "SCRIPT_DIR", scriptFile.dirname());
        return this._transport.requestSync(_server_RemoteMethods__WEBPACK_IMPORTED_MODULE_3__.MAINNODE_EXECUTESCRIPT, _core_Scope__WEBPACK_IMPORTED_MODULE_5__.ScopeHelper.toJSON(newVariableMap));
    }
    getCacheVariables() {
        return _core_Scope__WEBPACK_IMPORTED_MODULE_5__.ScopeHelper.getVariablesByGroup(this._scope, _Constants__WEBPACK_IMPORTED_MODULE_6__.CUSTOM_VARIABLE_GROUP);
    }
    addCacheVariables(params) {
        let variables = params;
        if (typeof params === "string") {
            const filename = _core_Scope__WEBPACK_IMPORTED_MODULE_5__.ScopeHelper.get(this._scope, "SOURCE_DIR").resolve(params).toString();
            variables = this._transport.requestSync(_server_RemoteMethods__WEBPACK_IMPORTED_MODULE_3__.MAINNODE_LOADJSON, filename);
        }
        _core_Scope__WEBPACK_IMPORTED_MODULE_5__.ScopeHelper.defineVariablesInVariableMap(this._scope, _Constants__WEBPACK_IMPORTED_MODULE_6__.CUSTOM_VARIABLE_GROUP, variables);
    }
    addIncludeDirectories(...dirs) {
        const sourceDir = _core_Scope__WEBPACK_IMPORTED_MODULE_5__.ScopeHelper.get(this._scope, "SOURCE_DIR");
        for (const iter of dirs.flat())
            _core_Scope__WEBPACK_IMPORTED_MODULE_5__.ScopeHelper.get(this._scope, "INCLUDES").push(sourceDir.resolve(iter));
    }
    addSubdirectory(sourceDir, binaryDir) {
        const newVariableMap = (0,_core_BaseContext__WEBPACK_IMPORTED_MODULE_0__.createVariableMapForDirectory)(this._scope, sourceDir, binaryDir);
        this._transport.requestSync(_server_RemoteMethods__WEBPACK_IMPORTED_MODULE_3__.MAINNODE_STARTMAKESCRIPT, _core_Scope__WEBPACK_IMPORTED_MODULE_5__.ScopeHelper.toJSON(newVariableMap));
    }
    addCustomScript(script, params) {
        logger.debug("RemoteMakeContext.addCustomScript(", script, params, ")");
        const newVariableMap = _core_Scope__WEBPACK_IMPORTED_MODULE_5__.ScopeHelper.cloneVariableMap(this._scope);
        _core_Scope__WEBPACK_IMPORTED_MODULE_5__.ScopeHelper.extendVariableMapByValues(newVariableMap, _Constants__WEBPACK_IMPORTED_MODULE_6__.CUSTOM_VARIABLE_GROUP, params);
        _core_Scope__WEBPACK_IMPORTED_MODULE_5__.ScopeHelper.set(newVariableMap, "SCRIPT_MODULE", script);
        return this._transport.requestSync(_server_RemoteMethods__WEBPACK_IMPORTED_MODULE_3__.MAINNODE_ADDCUSTOMSCRIPT, _core_Scope__WEBPACK_IMPORTED_MODULE_5__.ScopeHelper.toJSON(newVariableMap));
    }
    target(name) {
        throw new Error("Not Implemented");
    }
    script(name) {
        throw new Error("Not Implemented");
    }
    install(value, params) {
        throw new Error("Not Implemented");
    }
    addObjectLibrary(name, ...sources) {
        throw new Error("Not Implemented");
    }
    addStaticLibrary(name, ...sources) {
        logger.debug("RemoteMakeContext.addStaticLibrary(", name, ")");
        const newVariableMap = _core_Scope__WEBPACK_IMPORTED_MODULE_5__.ScopeHelper.cloneVariableMap(this._scope);
        const uuid = this._transport.requestSync(_server_RemoteMethods__WEBPACK_IMPORTED_MODULE_3__.MAINNODE_ADDSTATICLIBRARY, {
            name, variableMap: _core_Scope__WEBPACK_IMPORTED_MODULE_5__.ScopeHelper.toJSON(this._scope),
        });
        const target = new _server_RemoteStaticLibrary__WEBPACK_IMPORTED_MODULE_2__.RemoteStaticLibrary(newVariableMap, uuid, this._transport);
        this._targets.set(name, target);
        target.addSources(...sources);
        return target;
    }
    addSharedLibrary(name, ...sources) {
        throw new Error("Not Implemented");
    }
    addExecutable(name, ...sources) {
        logger.debug("RemoteMakeContext.addExecutable(", name, ")");
        const newVariableMap = _core_Scope__WEBPACK_IMPORTED_MODULE_5__.ScopeHelper.cloneVariableMap(this._scope);
        const uuid = this._transport.requestSync(_server_RemoteMethods__WEBPACK_IMPORTED_MODULE_3__.MAINNODE_ADDEXECUTABLE, {
            name, variableMap: _core_Scope__WEBPACK_IMPORTED_MODULE_5__.ScopeHelper.toJSON(this._scope),
        });
        const target = new _server_RemoteExecutable__WEBPACK_IMPORTED_MODULE_1__.RemoteExecutable(newVariableMap, uuid, this._transport);
        this._targets.set(name, target);
        target.addSources(...sources);
        return target;
    }
}
;


/***/ }),

/***/ "./src/server/RemoteMethods.ts":
/*!*************************************!*\
  !*** ./src/server/RemoteMethods.ts ***!
  \*************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   MAINNODE_ADDCUSTOMSCRIPT: () => (/* binding */ MAINNODE_ADDCUSTOMSCRIPT),
/* harmony export */   MAINNODE_ADDEXECUTABLE: () => (/* binding */ MAINNODE_ADDEXECUTABLE),
/* harmony export */   MAINNODE_ADDSTATICLIBRARY: () => (/* binding */ MAINNODE_ADDSTATICLIBRARY),
/* harmony export */   MAINNODE_EXECUTESCRIPT: () => (/* binding */ MAINNODE_EXECUTESCRIPT),
/* harmony export */   MAINNODE_LOADJSON: () => (/* binding */ MAINNODE_LOADJSON),
/* harmony export */   MAINNODE_STARTMAKESCRIPT: () => (/* binding */ MAINNODE_STARTMAKESCRIPT),
/* harmony export */   MAINNODE_TARGETSOURCES: () => (/* binding */ MAINNODE_TARGETSOURCES),
/* harmony export */   WORKERNODE_STARTMAKESCRIPT: () => (/* binding */ WORKERNODE_STARTMAKESCRIPT)
/* harmony export */ });
/*
 * MIT License
 *
 * Copyright (c) 2025  Yurii Yakubin (yurii.yakubin@gmail.com)
 *
 * Permission is granted to use, copy, modify, and distribute this software
 * under the MIT License. See LICENSE file for details.
 */
const WORKERNODE_STARTMAKESCRIPT = "WorkerNode.startMakeScript";
const MAINNODE_LOADJSON = "MainNode.loadJSON";
const MAINNODE_EXECUTESCRIPT = "MainNode.executeScript";
const MAINNODE_STARTMAKESCRIPT = "MainNode.startMakeScript";
const MAINNODE_ADDCUSTOMSCRIPT = "MainNode.addCustomScript";
const MAINNODE_ADDEXECUTABLE = "MainNode.addExecutable";
const MAINNODE_ADDSTATICLIBRARY = "MainNode.addStaticLibrary";
const MAINNODE_TARGETSOURCES = "MainNode.targetSources";


/***/ }),

/***/ "./src/server/RemoteStaticLibrary.ts":
/*!*******************************************!*\
  !*** ./src/server/RemoteStaticLibrary.ts ***!
  \*******************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   RemoteStaticLibrary: () => (/* binding */ RemoteStaticLibrary)
/* harmony export */ });
/* harmony import */ var _logger__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! @/logger */ "./src/logger/index.ts");
/* harmony import */ var _server_RemoteMethods__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! @/server/RemoteMethods */ "./src/server/RemoteMethods.ts");
/*
 * MIT License
 *
 * Copyright (c) 2025  Yurii Yakubin (yurii.yakubin@gmail.com)
 *
 * Permission is granted to use, copy, modify, and distribute this software
 * under the MIT License. See LICENSE file for details.
 */


const logger = _logger__WEBPACK_IMPORTED_MODULE_0__.Logger.create("file:///mnt/c/opt/work/source/darkit-sdk/external/bitmake/src/server/RemoteStaticLibrary.ts");
const NAME = Symbol("REQUEST");
const REQUEST = Symbol("REQUEST");
const SCOPE = Symbol("SCOPE");
class RemoteStaticLibrary {
    [NAME];
    [SCOPE];
    [REQUEST];
    constructor(variableMap, name, requestSync) {
        this[SCOPE] = variableMap;
        this[NAME] = name;
        this[REQUEST] = requestSync;
    }
    addSources(...sources) {
        logger.debug("RemoteStaticLibrary.addSources(", sources.length, ")");
        if (sources.length) {
            this[REQUEST].requestSync(_server_RemoteMethods__WEBPACK_IMPORTED_MODULE_1__.MAINNODE_TARGETSOURCES, sources);
        }
    }
}
;


/***/ }),

/***/ "./src/server/Transport.ts":
/*!*********************************!*\
  !*** ./src/server/Transport.ts ***!
  \*********************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   JSONRPC_VERSION: () => (/* binding */ JSONRPC_VERSION)
/* harmony export */ });
/*
 * MIT License
 *
 * Copyright (c) 2025  Yurii Yakubin (yurii.yakubin@gmail.com)
 *
 * Permission is granted to use, copy, modify, and distribute this software
 * under the MIT License. See LICENSE file for details.
 */
const JSONRPC_VERSION = "2.0";
;
;
;
;
;
;
;
;


/***/ }),

/***/ "./src/server/WorkerLooper.ts":
/*!************************************!*\
  !*** ./src/server/WorkerLooper.ts ***!
  \************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   WorkerLooper: () => (/* binding */ WorkerLooper)
/* harmony export */ });
/* harmony import */ var _server_MemoryTransport__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! @/server/MemoryTransport */ "./src/server/MemoryTransport.ts");
/* harmony import */ var _server_JsonRpcServer__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! @/server/JsonRpcServer */ "./src/server/JsonRpcServer.ts");
/* harmony import */ var _server_WorkerNode__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! @/server/WorkerNode */ "./src/server/WorkerNode.ts");
/* harmony import */ var _server_RemoteMethods__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! @/server/RemoteMethods */ "./src/server/RemoteMethods.ts");
/* harmony import */ var _logger__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! @/logger */ "./src/logger/index.ts");
/*
 * MIT License
 *
 * Copyright (c) 2025  Yurii Yakubin (yurii.yakubin@gmail.com)
 *
 * Permission is granted to use, copy, modify, and distribute this software
 * under the MIT License. See LICENSE file for details.
 */





const logger = _logger__WEBPACK_IMPORTED_MODULE_4__.Logger.create("file:///mnt/c/opt/work/source/darkit-sdk/external/bitmake/src/server/WorkerLooper.ts");
class WorkerLooper {
    _jsonrpcServer;
    constructor(sender) {
        this._jsonrpcServer = new _server_JsonRpcServer__WEBPACK_IMPORTED_MODULE_1__.JsonRpcServer;
        const buffer = new SharedArrayBuffer(0x8000);
        const transport = new _server_MemoryTransport__WEBPACK_IMPORTED_MODULE_0__.MemoryTransport(sender, buffer);
        const workerNode = new _server_WorkerNode__WEBPACK_IMPORTED_MODULE_2__.WorkerNode(transport);
        this._jsonrpcServer.registerCallback(_server_RemoteMethods__WEBPACK_IMPORTED_MODULE_3__.WORKERNODE_STARTMAKESCRIPT, params => workerNode.execMakeScript(params));
    }
    emitMessage(sender, message) {
        return this._jsonrpcServer.emitMessage(sender, message);
    }
}
;


/***/ }),

/***/ "./src/server/WorkerNode.ts":
/*!**********************************!*\
  !*** ./src/server/WorkerNode.ts ***!
  \**********************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   WorkerNode: () => (/* binding */ WorkerNode)
/* harmony export */ });
/* harmony import */ var _server_JsonRpcRequestSync__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! @/server/JsonRpcRequestSync */ "./src/server/JsonRpcRequestSync.ts");
/* harmony import */ var _server_RemoteMakeContext__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! @/server/RemoteMakeContext */ "./src/server/RemoteMakeContext.ts");
/* harmony import */ var _core_UserMakeContext__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! @/core/UserMakeContext */ "./src/core/UserMakeContext.ts");
/* harmony import */ var _core_BaseContext__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! @/core/BaseContext */ "./src/core/BaseContext.ts");
/* harmony import */ var _core_Scope__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! @/core/Scope */ "./src/core/Scope.ts");
/*
 * MIT License
 *
 * Copyright (c) 2025  Yurii Yakubin (yurii.yakubin@gmail.com)
 *
 * Permission is granted to use, copy, modify, and distribute this software
 * under the MIT License. See LICENSE file for details.
 */





class WorkerNode {
    _transport;
    constructor(requestSync) {
        this._transport = new _server_JsonRpcRequestSync__WEBPACK_IMPORTED_MODULE_0__.JsonRpcRequestSync(requestSync);
    }
    async execMakeScript(params) {
        const variableMap = _core_Scope__WEBPACK_IMPORTED_MODULE_4__.ScopeHelper.fromJSON(params);
        const mk = _core_UserMakeContext__WEBPACK_IMPORTED_MODULE_2__.UserMakeContext.create(new _server_RemoteMakeContext__WEBPACK_IMPORTED_MODULE_1__.RemoteMakeContext(variableMap, this._transport), variableMap);
        await (0,_core_BaseContext__WEBPACK_IMPORTED_MODULE_3__.performContext)(mk);
    }
}
;


/***/ }),

/***/ "./src/server/WorkerSender.ts":
/*!************************************!*\
  !*** ./src/server/WorkerSender.ts ***!
  \************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   WorkerSender: () => (/* binding */ WorkerSender)
/* harmony export */ });
/* harmony import */ var _logger__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! @/logger */ "./src/logger/index.ts");
/*
 * MIT License
 *
 * Copyright (c) 2025  Yurii Yakubin (yurii.yakubin@gmail.com)
 *
 * Permission is granted to use, copy, modify, and distribute this software
 * under the MIT License. See LICENSE file for details.
 */

const logger = _logger__WEBPACK_IMPORTED_MODULE_0__.Logger.create("file:///mnt/c/opt/work/source/darkit-sdk/external/bitmake/src/server/WorkerSender.ts");
class WorkerSender {
    _worker;
    constructor(worker) {
        this._worker = worker;
    }
    sendMessage(message) {
        logger.debug("<--", message);
        this._worker.postMessage(message);
    }
}
;


/***/ }),

/***/ "./src/utils/Args.ts":
/*!***************************!*\
  !*** ./src/utils/Args.ts ***!
  \***************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   Args: () => (/* binding */ Args)
/* harmony export */ });
/*
 * MIT License
 *
 * Copyright (c) 2025  Yurii Yakubin (yurii.yakubin@gmail.com)
 *
 * Permission is granted to use, copy, modify, and distribute this software
 * under the MIT License. See LICENSE file for details.
 */
var Args;
(function (Args) {
    function toOptionKey(name) {
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
                key += (hyphen ? ch.toUpperCase() : ch);
                hyphen = 0;
            }
            else if (ch == "-") {
                if (++hyphen > 1)
                    return null;
            }
        }
        return hyphen ? null : key;
    }
    function toObject(args) {
        const result = {};
        let lastKey = null;
        for (const iter of args) {
            if (iter.startsWith("--")) {
                const key = toOptionKey(iter);
                if (!key)
                    throw Error(`Option ${iter} is not supported`);
                if (result.hasOwnProperty(key))
                    throw Error(`Cannot specify the same option '${iter}' more than once`);
                lastKey = key;
                result[key] = true;
            }
            else if (lastKey) {
                const value = result[lastKey];
                if (typeof value === 'boolean')
                    result[lastKey] = iter;
                else if (typeof value === 'string')
                    result[lastKey] = [value, iter];
                else
                    value.push(iter);
            }
            else {
                throw Error(`Need to specify the option name before '${iter}' parameter`);
            }
        }
        return result;
    }
    Args.toObject = toObject;
})(Args || (Args = {})); // namespace Args


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
/* harmony import */ var _logger__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! @/logger */ "./src/logger/index.ts");
/*
 * MIT License
 *
 * Copyright (c) 2025  Yurii Yakubin (yurii.yakubin@gmail.com)
 *
 * Permission is granted to use, copy, modify, and distribute this software
 * under the MIT License. See LICENSE file for details.
 */




const logger = _logger__WEBPACK_IMPORTED_MODULE_3__.Logger.create("file:///mnt/c/opt/work/source/darkit-sdk/external/bitmake/src/utils/ChildProcess.ts");
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
            verbose && logger.notice([node_path__WEBPACK_IMPORTED_MODULE_0___default().basename(command), ...args].join(" "));
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
/* harmony export */   fetchBuffer: () => (/* binding */ fetchBuffer),
/* harmony export */   fileExists: () => (/* binding */ fileExists),
/* harmony export */   fileExistsSync: () => (/* binding */ fileExistsSync),
/* harmony export */   fileList: () => (/* binding */ fileList),
/* harmony export */   getPathString: () => (/* binding */ getPathString),
/* harmony export */   getURLString: () => (/* binding */ getURLString),
/* harmony export */   isURL: () => (/* binding */ isURL),
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
/* harmony import */ var _utils_UrlScheme__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! @/utils/UrlScheme */ "./src/utils/UrlScheme.ts");
/* harmony import */ var _utils_Module__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! @/utils/Module */ "./src/utils/Module.ts");
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
    if (str.startsWith(_utils_UrlScheme__WEBPACK_IMPORTED_MODULE_3__.IMPORT_SCHEME))
        str = (0,_utils_Module__WEBPACK_IMPORTED_MODULE_4__.requireResolve)(str.slice(_utils_UrlScheme__WEBPACK_IMPORTED_MODULE_3__.IMPORT_SCHEME.length));
    if (str.startsWith(_utils_UrlScheme__WEBPACK_IMPORTED_MODULE_3__.FILE_SCHEME))
        return node_url__WEBPACK_IMPORTED_MODULE_2___default().fileURLToPath(str);
    return str;
}
function isURL(str) {
    try {
        new URL(str);
        return true;
    }
    catch {
        return false;
    }
}
function getURLString(str) {
    if (str.startsWith(_utils_UrlScheme__WEBPACK_IMPORTED_MODULE_3__.IMPORT_SCHEME))
        return (0,_utils_Module__WEBPACK_IMPORTED_MODULE_4__.requireResolve)(str.slice(_utils_UrlScheme__WEBPACK_IMPORTED_MODULE_3__.IMPORT_SCHEME.length));
    if (isURL(str))
        return node_url__WEBPACK_IMPORTED_MODULE_2___default().fileURLToPath(str);
    return str;
}
async function fetchBuffer(str) {
    if (str.startsWith(_utils_UrlScheme__WEBPACK_IMPORTED_MODULE_3__.HTTP_SCHEME) || str.startsWith(_utils_UrlScheme__WEBPACK_IMPORTED_MODULE_3__.HTTPS_SCHEME)) {
        const response = await fetch(str);
        return Buffer.from(await response.arrayBuffer());
    }
    return await node_fs__WEBPACK_IMPORTED_MODULE_0___default().promises.readFile(getURLString(str));
}


/***/ }),

/***/ "./src/utils/Host.ts":
/*!***************************!*\
  !*** ./src/utils/Host.ts ***!
  \***************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   Host: () => (/* binding */ Host)
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
const _sizeofVoidp = sizeofVoidpBits[node_os__WEBPACK_IMPORTED_MODULE_0___default().arch()];
if (!_sizeofVoidp)
    throw new Error(`Unknown ${node_os__WEBPACK_IMPORTED_MODULE_0___default().arch()} arch`);
let _executableSuffix;
if (node_os__WEBPACK_IMPORTED_MODULE_0___default().platform() === "win32") {
    _executableSuffix = ".exe";
}
else {
    _executableSuffix = "";
}
class Host {
    static get sizeofVoidp() {
        return _sizeofVoidp;
    }
    static get executableSuffix() {
        return _executableSuffix;
    }
}
;


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





const logger = _logger__WEBPACK_IMPORTED_MODULE_4__.Logger.create("file:///mnt/c/opt/work/source/darkit-sdk/external/bitmake/src/utils/HttpRequest.ts");
;
class BufferBuilder {
    _chunks = [];
    append(chunk) {
        this._chunks.push(chunk);
    }
    toResult() {
        return Buffer.concat(this._chunks);
    }
}
;
class FileSyncWriter {
    _fd;
    constructor(file) {
        this._fd = node_fs__WEBPACK_IMPORTED_MODULE_1___default().openSync(file, "w");
    }
    append(chunk) {
        node_fs__WEBPACK_IMPORTED_MODULE_1___default().writeSync(this._fd, chunk);
    }
    toResult() {
        node_fs__WEBPACK_IMPORTED_MODULE_1___default().closeSync(this._fd);
    }
}
;
function createBuilder(file) {
    if (file)
        return new FileSyncWriter(file);
    return new BufferBuilder;
}
function httpRequest(url, options, callback) {
    if (url.startsWith("https://"))
        return https__WEBPACK_IMPORTED_MODULE_3___default().request(url, options, callback);
    return http__WEBPACK_IMPORTED_MODULE_2___default().request(url, options, callback);
}
;
;
function fetchImpl(url, file, options) {
    return new Promise((resolve, reject) => {
        const httpOptions = {
            method: 'GET',
            timeout: 5000,
            headers: {
                "User-Agent": "bitmake" + "/" + "0.0.1-develop.11",
                "Accept": "*/*",
            },
        };
        let attempts = options.attempts || 0;
        const doRequest = (url) => {
            const request = httpRequest(url, httpOptions, onRequest);
            let hasError = false;
            const onError = (err) => {
                request.destroy();
                if (!hasError) {
                    hasError = true;
                    if (attempts > 0) {
                        logger.warn(err.message);
                        logger.info(`re-wget ${url} attempts ${attempts}`);
                        attempts--;
                        doRequest(url);
                    }
                    else {
                        reject(err);
                    }
                }
            };
            request.on("timeout", () => {
                onError(new Error("Timeout for " + url));
            });
            request.on("error", (err) => {
                onError(err);
            });
            request.end();
        };
        const filename = node_path__WEBPACK_IMPORTED_MODULE_0___default().basename(url);
        const onRequest = (response) => {
            switch (response.statusCode) {
                case 200:
                    logger.debug(`Conncted to ${response.req.host}`);
                    logger.debug(`Downloading ${filename}`);
                    const builder = createBuilder(file);
                    response.on("data", (chunk) => builder.append(chunk));
                    response.on("end", () => resolve(builder.toResult()));
                    response.on('close', () => logger.debug("Close"));
                    break;
                case 301:
                case 302:
                    response.resume();
                    if (response.headers.location) {
                        logger.info("Redirect to " + response.headers.location);
                        doRequest(response.headers.location);
                    }
                    break;
                default:
                    response.resume();
                    const message = "Did not get an OK from the server. Code: " + response.statusCode;
                    logger.error(message);
                    reject(message);
                    break;
            }
        };
        logger.info("wget " + url);
        doRequest(url);
    });
}
;
function requestGet(url, options) {
    return fetchImpl(url, undefined, options || {});
}
function downloadFile(url, file, options) {
    return fetchImpl(url, file, options || {});
}


/***/ }),

/***/ "./src/utils/ImportModule.mjs":
/*!************************************!*\
  !*** ./src/utils/ImportModule.mjs ***!
  \************************************/
/***/ ((__unused_webpack___webpack_module__, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   currentScriptURL: () => (/* binding */ currentScriptURL),
/* harmony export */   importModule: () => (/* binding */ importModule),
/* harmony export */   isEntryPoint: () => (/* binding */ isEntryPoint)
/* harmony export */ });
/* harmony import */ var node_url__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! node:url */ "node:url");
/*
 * MIT License
 *
 * Copyright (c) 2025  Yurii Yakubin (yurii.yakubin@gmail.com)
 *
 * Permission is granted to use, copy, modify, and distribute this software
 * under the MIT License. See LICENSE file for details.
 */



const importModule = async (name) => import(/* webpackIgnore: true */ name);

function isEntryPoint() {
  // if (Object(import.meta).url)
  //   return url.fileURLToPath(Object(import.meta).url) === process.argv[1];
  if (typeof require !== 'undefined')
    return require.main === module;
  throw new Error("No compatible module resolver found");
}

function currentScriptURL() {
  // if (Object(import.meta).url)
  //   return url.fileURLToPath(Object(import.meta).url);
  if (typeof require !== 'undefined')
    return node_url__WEBPACK_IMPORTED_MODULE_0__.pathToFileURL(/* webpackIgnore: true */ __filename);
  throw new Error("Unknown current filename");
}


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




const logger = _logger__WEBPACK_IMPORTED_MODULE_3__.Logger.create("file:///mnt/c/opt/work/source/darkit-sdk/external/bitmake/src/utils/MakePatch.ts");
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
/* harmony export */   currentScriptURL: () => (/* reexport safe */ _ImportModule_mjs__WEBPACK_IMPORTED_MODULE_0__.currentScriptURL),
/* harmony export */   importModule: () => (/* reexport safe */ _ImportModule_mjs__WEBPACK_IMPORTED_MODULE_0__.importModule),
/* harmony export */   isEntryPoint: () => (/* reexport safe */ _ImportModule_mjs__WEBPACK_IMPORTED_MODULE_0__.isEntryPoint),
/* harmony export */   requireResolve: () => (/* binding */ requireResolve),
/* harmony export */   requireSync: () => (/* binding */ requireSync)
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



const requireSync = eval("require");
function requireResolve(name) {
    if (false)
        {}
    if (typeof requireSync !== 'undefined')
        return requireSync.resolve(name);
    throw new Error("No compatible module resolver found");
}


/***/ }),

/***/ "./src/utils/Path.ts":
/*!***************************!*\
  !*** ./src/utils/Path.ts ***!
  \***************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   Path: () => (/* binding */ Path)
/* harmony export */ });
/* harmony import */ var node_os__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! node:os */ "node:os");
/* harmony import */ var node_os__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(node_os__WEBPACK_IMPORTED_MODULE_0__);
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


let nativeSep = (node_path__WEBPACK_IMPORTED_MODULE_1___default().posix).sep;
let otherSep = (node_path__WEBPACK_IMPORTED_MODULE_1___default().win32).sep;
if (node_os__WEBPACK_IMPORTED_MODULE_0___default().platform() === "win32") {
    [nativeSep, otherSep] = [otherSep, nativeSep];
}
var Path;
(function (Path) {
    Path.sep = (node_path__WEBPACK_IMPORTED_MODULE_1___default().posix).sep;
    Path.delimiter = (node_path__WEBPACK_IMPORTED_MODULE_1___default().delimiter);
    function nativePath(path) {
        return path.replaceAll(otherSep, nativeSep);
    }
    Path.nativePath = nativePath;
    function representPath(path) {
        return path.replaceAll((node_path__WEBPACK_IMPORTED_MODULE_1___default().win32).sep, (node_path__WEBPACK_IMPORTED_MODULE_1___default().posix).sep);
    }
    Path.representPath = representPath;
    function isAbsolute(path) {
        return node_path__WEBPACK_IMPORTED_MODULE_1___default().isAbsolute(nativePath(path));
    }
    Path.isAbsolute = isAbsolute;
    function join(...paths) {
        return representPath(node_path__WEBPACK_IMPORTED_MODULE_1___default().join(...paths.map(i => nativePath(i))));
    }
    Path.join = join;
    function resolve(...paths) {
        return representPath(node_path__WEBPACK_IMPORTED_MODULE_1___default().resolve(...paths.map(i => nativePath(i))));
    }
    Path.resolve = resolve;
    function dirname(path) {
        return representPath(node_path__WEBPACK_IMPORTED_MODULE_1___default().dirname(nativePath(path)));
    }
    Path.dirname = dirname;
    function basename(path, suffix) {
        return representPath(node_path__WEBPACK_IMPORTED_MODULE_1___default().basename(nativePath(path), suffix));
    }
    Path.basename = basename;
    function relative(from, to) {
        return representPath(node_path__WEBPACK_IMPORTED_MODULE_1___default().relative(nativePath(from), nativePath(to)));
    }
    Path.relative = relative;
})(Path || (Path = {})); // namespace Path


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
/* harmony export */   deepCopy: () => (/* binding */ deepCopy),
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
function deepCopy(o) {
    if (!o || typeof o !== "object")
        return o;
    if (Array.isArray(o)) {
        const result = [];
        for (const iter of o)
            result.push(deepCopy(iter));
        return result;
    }
    else {
        const result = {};
        for (const [key, val] of Object.entries(o))
            result[key] = deepCopy(val);
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
                target[key] = deepCopy(b);
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
    throw new TypeError(`The '${value}' is not a boolean`);
}
function ensureNumber(value) {
    if (typeof value === "number")
        return value;
    throw new TypeError(`The '${value}' is not a number`);
}
function ensureString(value) {
    if (typeof value === "string")
        return value;
    throw new TypeError(`The '${value}' is not a string`);
}
function ensureArray(value) {
    if (Array.isArray(value))
        return Array.from(value);
    throw new TypeError(`The '${value}' is not a array`);
}


/***/ }),

/***/ "./src/utils/UrlScheme.ts":
/*!********************************!*\
  !*** ./src/utils/UrlScheme.ts ***!
  \********************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   FILE_SCHEME: () => (/* binding */ FILE_SCHEME),
/* harmony export */   HTTPS_SCHEME: () => (/* binding */ HTTPS_SCHEME),
/* harmony export */   HTTP_SCHEME: () => (/* binding */ HTTP_SCHEME),
/* harmony export */   IMPORT_SCHEME: () => (/* binding */ IMPORT_SCHEME)
/* harmony export */ });
/*
 * MIT License
 *
 * Copyright (c) 2025  Yurii Yakubin (yurii.yakubin@gmail.com)
 *
 * Permission is granted to use, copy, modify, and distribute this software
 * under the MIT License. See LICENSE file for details.
 */
const FILE_SCHEME = "file://";
const IMPORT_SCHEME = "import://";
const HTTP_SCHEME = "http://";
const HTTPS_SCHEME = "https://";


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

/***/ }),

/***/ "node:worker_threads":
/*!**************************************!*\
  !*** external "node:worker_threads" ***!
  \**************************************/
/***/ ((module) => {

module.exports = require("node:worker_threads");

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
/* harmony import */ var _utils_Module__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! @/utils/Module */ "./src/utils/Module.ts");
/* harmony import */ var _cxx__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! @/cxx */ "./src/cxx/index.ts");
/* harmony import */ var _cmake__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! @/cmake */ "./src/cmake/index.ts");
/* harmony import */ var _utils_ChildProcess__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! @/utils/ChildProcess */ "./src/utils/ChildProcess.ts");
/* harmony import */ var _utils_HttpRequest__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! @/utils/HttpRequest */ "./src/utils/HttpRequest.ts");
/* harmony import */ var _utils_Path__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(/*! @/utils/Path */ "./src/utils/Path.ts");
/* harmony import */ var _RunScript__WEBPACK_IMPORTED_MODULE_6__ = __webpack_require__(/*! @/RunScript */ "./src/RunScript.ts");
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
    cxx: _cxx__WEBPACK_IMPORTED_MODULE_1__,
    cmake: {
        scriptMode: (scriptFile, variables, options) => _cmake__WEBPACK_IMPORTED_MODULE_2__.CMakeProcess.getInstance().scriptMode(scriptFile, variables, options),
        configure: (args) => _cmake__WEBPACK_IMPORTED_MODULE_2__.CMakeProcess.getInstance().configure(args),
        build: (args) => _cmake__WEBPACK_IMPORTED_MODULE_2__.CMakeProcess.getInstance().build(args),
        install: (args) => _cmake__WEBPACK_IMPORTED_MODULE_2__.CMakeProcess.getInstance().install(args),
        extract: (args) => _cmake__WEBPACK_IMPORTED_MODULE_2__.CMakeProcess.getInstance().extract(args),
        ctest: (args) => _cmake__WEBPACK_IMPORTED_MODULE_2__.CTestProcess.getInstance().ctest(args),
        getProjectInfo: _cmake__WEBPACK_IMPORTED_MODULE_2__.getProjectInfo,
    },
    process: {
        spawn: _utils_ChildProcess__WEBPACK_IMPORTED_MODULE_3__.spawnAsync,
    },
    utils: {
        requestGet: _utils_HttpRequest__WEBPACK_IMPORTED_MODULE_4__.requestGet,
        downloadFile: _utils_HttpRequest__WEBPACK_IMPORTED_MODULE_4__.downloadFile,
    },
    path: _utils_Path__WEBPACK_IMPORTED_MODULE_5__.Path,
});
if ((0,_utils_Module__WEBPACK_IMPORTED_MODULE_0__.isEntryPoint)()) {
    (0,_RunScript__WEBPACK_IMPORTED_MODULE_6__.runScript)();
}

})();

__webpack_exports__ = __webpack_exports__["default"];
/******/ 	return __webpack_exports__;
/******/ })()
;
});
//# sourceMappingURL=data:application/json;charset=utf-8;base64,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bWFrZS93ZWJwYWNrL3VuaXZlcnNhbE1vZHVsZURlZmluaXRpb24iLCJ3ZWJwYWNrOi8vYml0bWFrZS8uL3NyYy9Db25zdGFudHMudHMiLCJ3ZWJwYWNrOi8vYml0bWFrZS8uL3NyYy9SdW5TY3JpcHQudHMiLCJ3ZWJwYWNrOi8vYml0bWFrZS8uL3NyYy9hY3Rpb25zL2JpdG1ha2UudHMiLCJ3ZWJwYWNrOi8vYml0bWFrZS8uL3NyYy9hY3Rpb25zL2NtYWtlLnRzIiwid2VicGFjazovL2JpdG1ha2UvLi9zcmMvYWN0aW9ucy9jb25maWd1cmUudHMiLCJ3ZWJwYWNrOi8vYml0bWFrZS8uL3NyYy9hY3Rpb25zL2luZGV4LnRzIiwid2VicGFjazovL2JpdG1ha2UvLi9zcmMvYWN0aW9ucy9tYWtlLnRzIiwid2VicGFjazovL2JpdG1ha2UvLi9zcmMvYWN0aW9ucy9ub25lLnRzIiwid2VicGFjazovL2JpdG1ha2UvLi9zcmMvYWN0aW9ucy9wcm9jZXNzLnRzIiwid2VicGFjazovL2JpdG1ha2UvLi9zcmMvY21ha2UvQ29uc3RhbnRzLnRzIiwid2VicGFjazovL2JpdG1ha2UvLi9zcmMvY21ha2UvSGVscGVyLnRzIiwid2VicGFjazovL2JpdG1ha2UvLi9zcmMvY21ha2UvaW5kZXgudHMiLCJ3ZWJwYWNrOi8vYml0bWFrZS8uL3NyYy9jb21tYW5kcy9idWlsZC50cyIsIndlYnBhY2s6Ly9iaXRtYWtlLy4vc3JjL2NvbW1hbmRzL2luZGV4LnRzIiwid2VicGFjazovL2JpdG1ha2UvLi9zcmMvY29tbWFuZHMvaW5pdC50cyIsIndlYnBhY2s6Ly9iaXRtYWtlLy4vc3JjL2NvcmUvQWJzb2x1dGVQYXRoLnRzIiwid2VicGFjazovL2JpdG1ha2UvLi9zcmMvY29yZS9CYXNlQ29udGV4dC50cyIsIndlYnBhY2s6Ly9iaXRtYWtlLy4vc3JjL2NvcmUvQnVpbGRpblNjcmlwdHMvY19oZWFkZXIudHMiLCJ3ZWJwYWNrOi8vYml0bWFrZS8uL3NyYy9jb3JlL0J1aWxkaW5TY3JpcHRzL2NvbmZpZ3VyZV9maWxlLnRzIiwid2VicGFjazovL2JpdG1ha2UvLi9zcmMvY29yZS9CdWlsZGluU2NyaXB0cy9pbmRleC50cyIsIndlYnBhY2s6Ly9iaXRtYWtlLy4vc3JjL2NvcmUvQ3VzdG9tU2NyaXB0LnRzIiwid2VicGFjazovL2JpdG1ha2UvLi9zcmMvY29yZS9EZWZpbml0aW9uSGVscGVyLnRzIiwid2VicGFjazovL2JpdG1ha2UvLi9zcmMvY29yZS9EZXRlcm1pbmVDb21waWxlci50cyIsIndlYnBhY2s6Ly9iaXRtYWtlLy4vc3JjL2NvcmUvRmluZFByb2dyYW0udHMiLCJ3ZWJwYWNrOi8vYml0bWFrZS8uL3NyYy9jb3JlL0dvYWxDb2xsZWN0aW9uLnRzIiwid2VicGFjazovL2JpdG1ha2UvLi9zcmMvY29yZS9JbnN0YWxsRW50aXR5LnRzIiwid2VicGFjazovL2JpdG1ha2UvLi9zcmMvY29yZS9JbnRlcmZhY2VJbmNsdWRlcy50cyIsIndlYnBhY2s6Ly9iaXRtYWtlLy4vc3JjL2NvcmUvSW50ZXJmYWNlT2JqZWN0cy50cyIsIndlYnBhY2s6Ly9iaXRtYWtlLy4vc3JjL2NvcmUvSW50ZXJmYWNlU2NyaXB0LnRzIiwid2VicGFjazovL2JpdG1ha2UvLi9zcmMvY29yZS9Mb2NhbE1ha2VDb250ZXh0LnRzIiwid2VicGFjazovL2JpdG1ha2UvLi9zcmMvY29yZS9QbHVnaW5Db250ZXh0LnRzIiwid2VicGFjazovL2JpdG1ha2UvLi9zcmMvY29yZS9Qcm9qZWN0Q29udGV4dC50cyIsIndlYnBhY2s6Ly9iaXRtYWtlLy4vc3JjL2NvcmUvU2NvcGUudHMiLCJ3ZWJwYWNrOi8vYml0bWFrZS8uL3NyYy9jb3JlL1NjcmlwdENvbGxlY3Rpb24udHMiLCJ3ZWJwYWNrOi8vYml0bWFrZS8uL3NyYy9jb3JlL1NjcmlwdENvbnRleHQudHMiLCJ3ZWJwYWNrOi8vYml0bWFrZS8uL3NyYy9jb3JlL1NvdXJjZUZpbGUudHMiLCJ3ZWJwYWNrOi8vYml0bWFrZS8uL3NyYy9jb3JlL1NvdXJjZUZpbGVMaXN0LnRzIiwid2VicGFjazovL2JpdG1ha2UvLi9zcmMvY29yZS9TeXN0ZW1WYXJpYWJsZXMudHMiLCJ3ZWJwYWNrOi8vYml0bWFrZS8uL3NyYy9jb3JlL1RhcmdldC50cyIsIndlYnBhY2s6Ly9iaXRtYWtlLy4vc3JjL2NvcmUvVGFyZ2V0Q29sbGVjdGlvbi50cyIsIndlYnBhY2s6Ly9iaXRtYWtlLy4vc3JjL2NvcmUvVGFyZ2V0U3RydWN0LnRzIiwid2VicGFjazovL2JpdG1ha2UvLi9zcmMvY29yZS9Ub29sY2hhaW5Db250ZXh0LnRzIiwid2VicGFjazovL2JpdG1ha2UvLi9zcmMvY29yZS9UeXBlcy50cyIsIndlYnBhY2s6Ly9iaXRtYWtlLy4vc3JjL2NvcmUvVXNlck1ha2VDb250ZXh0LnRzIiwid2VicGFjazovL2JpdG1ha2UvLi9zcmMvY3h4L2luZGV4LnRzIiwid2VicGFjazovL2JpdG1ha2UvLi9zcmMvbG9nZ2VyL2luZGV4LnRzIiwid2VicGFjazovL2JpdG1ha2UvLi9zcmMvc2VydmVyL0pzb25ScGNSZXF1ZXN0U3luYy50cyIsIndlYnBhY2s6Ly9iaXRtYWtlLy4vc3JjL3NlcnZlci9Kc29uUnBjU2VydmVyLnRzIiwid2VicGFjazovL2JpdG1ha2UvLi9zcmMvc2VydmVyL01ha2VDbGllbnQudHMiLCJ3ZWJwYWNrOi8vYml0bWFrZS8uL3NyYy9zZXJ2ZXIvTWFrZVNlcnZlci50cyIsIndlYnBhY2s6Ly9iaXRtYWtlLy4vc3JjL3NlcnZlci9NZW1vcnlUcmFuc3BvcnQudHMiLCJ3ZWJwYWNrOi8vYml0bWFrZS8uL3NyYy9zZXJ2ZXIvTWVzc2FnZVBvcnRTZW5kZXIudHMiLCJ3ZWJwYWNrOi8vYml0bWFrZS8uL3NyYy9zZXJ2ZXIvUmVtb3RlRXhlY3V0YWJsZS50cyIsIndlYnBhY2s6Ly9iaXRtYWtlLy4vc3JjL3NlcnZlci9SZW1vdGVNYWtlQ29udGV4dC50cyIsIndlYnBhY2s6Ly9iaXRtYWtlLy4vc3JjL3NlcnZlci9SZW1vdGVNZXRob2RzLnRzIiwid2VicGFjazovL2JpdG1ha2UvLi9zcmMvc2VydmVyL1JlbW90ZVN0YXRpY0xpYnJhcnkudHMiLCJ3ZWJwYWNrOi8vYml0bWFrZS8uL3NyYy9zZXJ2ZXIvVHJhbnNwb3J0LnRzIiwid2VicGFjazovL2JpdG1ha2UvLi9zcmMvc2VydmVyL1dvcmtlckxvb3Blci50cyIsIndlYnBhY2s6Ly9iaXRtYWtlLy4vc3JjL3NlcnZlci9Xb3JrZXJOb2RlLnRzIiwid2VicGFjazovL2JpdG1ha2UvLi9zcmMvc2VydmVyL1dvcmtlclNlbmRlci50cyIsIndlYnBhY2s6Ly9iaXRtYWtlLy4vc3JjL3V0aWxzL0FyZ3MudHMiLCJ3ZWJwYWNrOi8vYml0bWFrZS8uL3NyYy91dGlscy9DaGlsZFByb2Nlc3MudHMiLCJ3ZWJwYWNrOi8vYml0bWFrZS8uL3NyYy91dGlscy9GaWxlU3lzdGVtLnRzIiwid2VicGFjazovL2JpdG1ha2UvLi9zcmMvdXRpbHMvSG9zdC50cyIsIndlYnBhY2s6Ly9iaXRtYWtlLy4vc3JjL3V0aWxzL0h0dHBSZXF1ZXN0LnRzIiwid2VicGFjazovL2JpdG1ha2UvLi9zcmMvdXRpbHMvSW1wb3J0TW9kdWxlLm1qcyIsIndlYnBhY2s6Ly9iaXRtYWtlLy4vc3JjL3V0aWxzL01ha2VQYXRjaC50cyIsIndlYnBhY2s6Ly9iaXRtYWtlLy4vc3JjL3V0aWxzL01vZHVsZS50cyIsIndlYnBhY2s6Ly9iaXRtYWtlLy4vc3JjL3V0aWxzL1BhdGgudHMiLCJ3ZWJwYWNrOi8vYml0bWFrZS8uL3NyYy91dGlscy9QcmltaXRpdmVzLnRzIiwid2VicGFjazovL2JpdG1ha2UvLi9zcmMvdXRpbHMvU2V0dGluZ3NTdG9yYWdlLnRzIiwid2VicGFjazovL2JpdG1ha2UvLi9zcmMvdXRpbHMvU3RyaWN0VHlwZS50cyIsIndlYnBhY2s6Ly9iaXRtYWtlLy4vc3JjL3V0aWxzL1VybFNjaGVtZS50cyIsIndlYnBhY2s6Ly9iaXRtYWtlL2V4dGVybmFsIG5vZGUtY29tbW9uanMgXCJodHRwXCIiLCJ3ZWJwYWNrOi8vYml0bWFrZS9leHRlcm5hbCBub2RlLWNvbW1vbmpzIFwiaHR0cHNcIiIsIndlYnBhY2s6Ly9iaXRtYWtlL2V4dGVybmFsIG5vZGUtY29tbW9uanMgXCJub2RlOmNoaWxkX3Byb2Nlc3NcIiIsIndlYnBhY2s6Ly9iaXRtYWtlL2V4dGVybmFsIG5vZGUtY29tbW9uanMgXCJub2RlOmZzXCIiLCJ3ZWJwYWNrOi8vYml0bWFrZS9leHRlcm5hbCBub2RlLWNvbW1vbmpzIFwibm9kZTpvc1wiIiwid2VicGFjazovL2JpdG1ha2UvZXh0ZXJuYWwgbm9kZS1jb21tb25qcyBcIm5vZGU6cGF0aFwiIiwid2VicGFjazovL2JpdG1ha2UvZXh0ZXJuYWwgbm9kZS1jb21tb25qcyBcIm5vZGU6dXJsXCIiLCJ3ZWJwYWNrOi8vYml0bWFrZS9leHRlcm5hbCBub2RlLWNvbW1vbmpzIFwibm9kZTp3b3JrZXJfdGhyZWFkc1wiIiwid2VicGFjazovL2JpdG1ha2Uvd2VicGFjay9ib290c3RyYXAiLCJ3ZWJwYWNrOi8vYml0bWFrZS93ZWJwYWNrL3J1bnRpbWUvY29tcGF0IGdldCBkZWZhdWx0IGV4cG9ydCIsIndlYnBhY2s6Ly9iaXRtYWtlL3dlYnBhY2svcnVudGltZS9kZWZpbmUgcHJvcGVydHkgZ2V0dGVycyIsIndlYnBhY2s6Ly9iaXRtYWtlL3dlYnBhY2svcnVudGltZS9oYXNPd25Qcm9wZXJ0eSBzaG9ydGhhbmQiLCJ3ZWJwYWNrOi8vYml0bWFrZS93ZWJwYWNrL3J1bnRpbWUvbWFrZSBuYW1lc3BhY2Ugb2JqZWN0Iiwid2VicGFjazovL2JpdG1ha2UvLi9zcmMvaW5kZXgudHMiXSwic291cmNlc0NvbnRlbnQiOlsiKGZ1bmN0aW9uIHdlYnBhY2tVbml2ZXJzYWxNb2R1bGVEZWZpbml0aW9uKHJvb3QsIGZhY3RvcnkpIHtcblx0aWYodHlwZW9mIGV4cG9ydHMgPT09ICdvYmplY3QnICYmIHR5cGVvZiBtb2R1bGUgPT09ICdvYmplY3QnKVxuXHRcdG1vZHVsZS5leHBvcnRzID0gZmFjdG9yeSgpO1xuXHRlbHNlIGlmKHR5cGVvZiBkZWZpbmUgPT09ICdmdW5jdGlvbicgJiYgZGVmaW5lLmFtZClcblx0XHRkZWZpbmUoW10sIGZhY3RvcnkpO1xuXHRlbHNlIGlmKHR5cGVvZiBleHBvcnRzID09PSAnb2JqZWN0Jylcblx0XHRleHBvcnRzW1wiYml0bWFrZVwiXSA9IGZhY3RvcnkoKTtcblx0ZWxzZVxuXHRcdHJvb3RbXCJiaXRtYWtlXCJdID0gZmFjdG9yeSgpO1xufSkoZ2xvYmFsLCAoKSA9PiB7XG5yZXR1cm4gIiwiLypcbiAqIE1JVCBMaWNlbnNlXG4gKlxuICogQ29weXJpZ2h0IChjKSAyMDI1ICBZdXJpaSBZYWt1YmluICh5dXJpaS55YWt1YmluQGdtYWlsLmNvbSlcbiAqXG4gKiBQZXJtaXNzaW9uIGlzIGdyYW50ZWQgdG8gdXNlLCBjb3B5LCBtb2RpZnksIGFuZCBkaXN0cmlidXRlIHRoaXMgc29mdHdhcmVcbiAqIHVuZGVyIHRoZSBNSVQgTGljZW5zZS4gU2VlIExJQ0VOU0UgZmlsZSBmb3IgZGV0YWlscy5cbiAqL1xuXG5leHBvcnQgY29uc3QgVVNFUl9DT05GSUcgPSBcImJpdG1ha2UuY29uZmlnLm1qc1wiO1xuZXhwb3J0IGNvbnN0IFJFUVVFU1RfQVRURU1QVFMgPSAzMDtcbmV4cG9ydCBjb25zdCBCVUlMRF9TRVRUSU5HU19GSUxFID0gXCJCdWlsZFNldHRpbmdzLmpzb25cIjtcbmV4cG9ydCBjb25zdCBBTExfVEFSR0VUID0gXCJhbGxcIjtcbmV4cG9ydCBjb25zdCBJTlNUQUxMX1RBUkdFVCA9IFwiaW5zdGFsbFwiO1xuZXhwb3J0IGNvbnN0IFBBQ0tBR0VfSlNPTiA9IFwicGFja2FnZS5qc29uXCI7XG5leHBvcnQgY29uc3QgTUFLRV9DQUNIRSA9IFwiTWFrZUNhY2hlLmpzb25cIjtcbmV4cG9ydCBjb25zdCBTWVNURU1fVkFSSUFCTEVfR1JPVVAgPSBcInN5c3RlbVwiO1xuZXhwb3J0IGNvbnN0IENVU1RPTV9WQVJJQUJMRV9HUk9VUCA9IFwiY3VzdG9tXCI7XG4iLCIvKlxuICogTUlUIExpY2Vuc2VcbiAqXG4gKiBDb3B5cmlnaHQgKGMpIDIwMjUgIFl1cmlpIFlha3ViaW4gKHl1cmlpLnlha3ViaW5AZ21haWwuY29tKVxuICpcbiAqIFBlcm1pc3Npb24gaXMgZ3JhbnRlZCB0byB1c2UsIGNvcHksIG1vZGlmeSwgYW5kIGRpc3RyaWJ1dGUgdGhpcyBzb2Z0d2FyZVxuICogdW5kZXIgdGhlIE1JVCBMaWNlbnNlLiBTZWUgTElDRU5TRSBmaWxlIGZvciBkZXRhaWxzLlxuICovXG5cbmltcG9ydCB7IGlzTWFpblRocmVhZCwgcGFyZW50UG9ydCwgd29ya2VyRGF0YSB9IGZyb20gXCJub2RlOndvcmtlcl90aHJlYWRzXCI7XG5pbXBvcnQgeyBBcmdzIH0gIGZyb20gXCJAL3V0aWxzL0FyZ3NcIjtcbmltcG9ydCBjb21tYW5kcyBmcm9tIFwiQC9jb21tYW5kc1wiO1xuaW1wb3J0IHsgTG9nZ2VyIH0gZnJvbSBcIkAvbG9nZ2VyXCI7XG5pbXBvcnQgeyBNZXNzYWdlUG9ydFNlbmRlciB9IGZyb20gXCJAL3NlcnZlci9NZXNzYWdlUG9ydFNlbmRlclwiO1xuaW1wb3J0IHsgV29ya2VyTG9vcGVyIH0gZnJvbSBcIkAvc2VydmVyL1dvcmtlckxvb3BlclwiO1xuXG5jb25zdCBsb2dnZXIgPSBMb2dnZXIuY3JlYXRlKGltcG9ydC5tZXRhLnVybCk7XG5cbmV4cG9ydCBhc3luYyBmdW5jdGlvbiBydW5NYWluU2NyaXB0KCkge1xuICBsb2dnZXIuaW5mbyhcIk1haW4gdGhyZWFkIHN0YXJ0ZWRcIilcbiAgY29uc3Qgb3B0aW9uczogYW55ID0ge1xuICAgIGhhbmRsZXI6IFwiZGVmYXVsdFwiLFxuICAgIHdvcmtEaXI6IHByb2Nlc3MuY3dkKCksXG4gICAgZW52OiB7fSxcbiAgfTtcblxuICBsZXQgbm9kZUV4ZWN1dGFibGU6IHN0cmluZyB8IHVuZGVmaW5lZDtcbiAgaWYgKHByb2Nlc3MuYXJndi5sZW5ndGggPiAwKVxuICAgIG5vZGVFeGVjdXRhYmxlID0gcHJvY2Vzcy5hcmd2WzBdO1xuXG4gIGxldCBjdXJyZW50U2NyaXB0OiBzdHJpbmcgfCB1bmRlZmluZWQ7XG4gIGlmIChwcm9jZXNzLmFyZ3YubGVuZ3RoID4gMSlcbiAgICBjdXJyZW50U2NyaXB0ID0gcHJvY2Vzcy5hcmd2WzFdO1xuXG4gIGxldCBhcmdzSW5kZXggPSBwcm9jZXNzLmFyZ3YubGVuZ3RoO1xuICBpZiAocHJvY2Vzcy5hcmd2Lmxlbmd0aCA+IDIpIHtcbiAgICBhcmdzSW5kZXggPSAyO1xuICAgIGNvbnN0IGhhbmRsZXIgPSBwcm9jZXNzLmFyZ3ZbYXJnc0luZGV4XTtcbiAgICBpZiAoIWhhbmRsZXIuc3RhcnRzV2l0aChcIi0tXCIpKSB7XG4gICAgICBvcHRpb25zLmhhbmRsZXIgPSBoYW5kbGVyO1xuICAgICAgYXJnc0luZGV4Kys7XG4gICAgfVxuICB9XG5cbiAgb3B0aW9ucy5lbnYgPSBBcmdzLnRvT2JqZWN0KHByb2Nlc3MuYXJndi5zbGljZShhcmdzSW5kZXgpKTtcblxuICBjb25zdCBoYW5kbGVyID0gY29tbWFuZHNbb3B0aW9ucy5oYW5kbGVyXTtcbiAgaWYgKCFoYW5kbGVyKVxuICAgIHRocm93IEVycm9yKGBUaGUgJHtQUk9KRUNUX05BTUV9IGRvZXMgbm90IHN1cHBvcnQgdGhlICR7b3B0aW9ucy5oYW5kbGVyfSBjb21tYW5kYCk7XG5cbiAgY29uc3QgcmVzID0gaGFuZGxlcihvcHRpb25zKTtcbiAgaWYgKHJlcyBpbnN0YW5jZW9mIFByb21pc2UpIHtcbiAgICBhd2FpdCByZXM7XG4gIH1cbn1cblxuZXhwb3J0IGZ1bmN0aW9uIHJ1bldvcmtlclNjcmlwdCgpIHtcbiAgbG9nZ2VyLmRlYnVnKFwiV29ya2VyIHRocmVhZCBzdGFydGVkXCIsIHdvcmtlckRhdGEpO1xuXG4gIGlmICghcGFyZW50UG9ydCkge1xuICAgIHRocm93IG5ldyBFcnJvcihgV29ya2VyIG5vdCBzdXBwb3J0ZWQgcGFyZW50UG9ydGApO1xuICB9XG5cbiAgY29uc3Qgc2VuZGVyID0gbmV3IE1lc3NhZ2VQb3J0U2VuZGVyKHBhcmVudFBvcnQpO1xuICBjb25zdCBsb29wZXIgPSBuZXcgV29ya2VyTG9vcGVyKHNlbmRlcik7XG5cbiAgcGFyZW50UG9ydC5vbihcIm1lc3NhZ2VcIiwgKG1lc3NhZ2UpID0+IGxvb3Blci5lbWl0TWVzc2FnZShzZW5kZXIsIG1lc3NhZ2UpKTtcbn1cblxuZXhwb3J0IGZ1bmN0aW9uIHJ1blNjcmlwdCgpIHtcbiAgaWYgKGlzTWFpblRocmVhZCkge1xuICAgIHJ1bk1haW5TY3JpcHQoKS50aGVuKCgpID0+IHByb2Nlc3MuZXhpdCgwKSkuY2F0Y2goKGUpID0+IHtcbiAgICAgIGlmIChlIGluc3RhbmNlb2YgRXJyb3IpXG4gICAgICAgIGxvZ2dlci5mYXRhbChlLnN0YWNrKTtcbiAgICAgIGVsc2VcbiAgICAgICAgbG9nZ2VyLmZhdGFsKGUpO1xuICAgICAgcHJvY2Vzcy5leGl0KDEpO1xuICAgIH0pO1xuICB9XG4gIGVsc2Uge1xuICAgIHJ1bldvcmtlclNjcmlwdCgpO1xuICB9XG59XG4iLCIvKlxuICogTUlUIExpY2Vuc2VcbiAqXG4gKiBDb3B5cmlnaHQgKGMpIDIwMjUgIFl1cmlpIFlha3ViaW4gKHl1cmlpLnlha3ViaW5AZ21haWwuY29tKVxuICpcbiAqIFBlcm1pc3Npb24gaXMgZ3JhbnRlZCB0byB1c2UsIGNvcHksIG1vZGlmeSwgYW5kIGRpc3RyaWJ1dGUgdGhpcyBzb2Z0d2FyZVxuICogdW5kZXIgdGhlIE1JVCBMaWNlbnNlLiBTZWUgTElDRU5TRSBmaWxlIGZvciBkZXRhaWxzLlxuICovXG5cbmltcG9ydCBmcyBmcm9tIFwibm9kZTpmc1wiO1xuXG5pbXBvcnQgeyBQYXRoIH0gZnJvbSBcIkAvdXRpbHMvUGF0aFwiO1xuaW1wb3J0IHsgTWFrZVNlcnZlciB9IGZyb20gXCJAL3NlcnZlci9NYWtlU2VydmVyXCI7XG5pbXBvcnQgeyBQbHVnaW5Db250ZXh0IH0gZnJvbSBcIkAvY29yZS9QbHVnaW5Db250ZXh0XCI7XG5pbXBvcnQgeyBTY29wZUhlbHBlciB9IGZyb20gXCJAL2NvcmUvU2NvcGVcIjtcbmltcG9ydCB7IFRvb2xjaGFpbkNvbnRleHQgfSBmcm9tIFwiQC9jb3JlL1Rvb2xjaGFpbkNvbnRleHRcIjtcbmltcG9ydCB7IGdldFBhdGhTdHJpbmcsIGdldFVSTFN0cmluZyB9ICBmcm9tIFwiQC91dGlscy9GaWxlU3lzdGVtXCI7XG5pbXBvcnQgeyBBYnNvbHV0ZVBhdGggfSBmcm9tIFwiQC9jb3JlL0Fic29sdXRlUGF0aFwiO1xuaW1wb3J0IHsgaW1wb3J0TW9kdWxlIH0gIGZyb20gXCJAL3V0aWxzL01vZHVsZVwiO1xuaW1wb3J0IHsgZGV0ZXJtaW5lQ29tcGlsZXIgfSAgZnJvbSBcIkAvY29yZS9EZXRlcm1pbmVDb21waWxlclwiO1xuaW1wb3J0IHsgU2V0dGluZ3NTdG9yYWdlIH0gZnJvbSBcIkAvdXRpbHMvU2V0dGluZ3NTdG9yYWdlXCI7XG5pbXBvcnQgeyBJTVBPUlRfU0NIRU1FIH0gZnJvbSBcIkAvdXRpbHMvVXJsU2NoZW1lXCI7XG5pbXBvcnQgeyBJTlNUQUxMX1RBUkdFVCwgUEFDS0FHRV9KU09OLCBNQUtFX0NBQ0hFIH0gZnJvbSBcIkAvQ29uc3RhbnRzXCI7XG5pbXBvcnQgeyBTWVNURU1fVkFSSUFCTEVfR1JPVVAgfSBmcm9tIFwiQC9Db25zdGFudHNcIjtcbmltcG9ydCB7IHJlcXVpcmVSZXNvbHZlIH0gZnJvbSBcIkAvdXRpbHMvTW9kdWxlXCI7XG5pbXBvcnQgeyBTeXN0ZW1TY29wZSB9IGZyb20gXCJAL2NvcmUvU3lzdGVtU2NvcGVcIjtcbmltcG9ydCBTeXN0ZW1WYXJpYWJsZXMgZnJvbSBcIkAvY29yZS9TeXN0ZW1WYXJpYWJsZXNcIjtcbmltcG9ydCB7IExvZ2dlciB9IGZyb20gXCJAL2xvZ2dlclwiO1xuXG5jb25zdCBsb2dnZXIgPSBMb2dnZXIuY3JlYXRlKGltcG9ydC5tZXRhLnVybCk7XG5cbmV4cG9ydCBkZWZhdWx0IGFzeW5jIGZ1bmN0aW9uKGNvbmZpZzogYW55LCBlbnZpcm9ubWVudDogYW55LCBzZXR0aW5nczogU2V0dGluZ3NTdG9yYWdlKSB7XG4gIHByb2Nlc3MuZW52ID0gZW52aXJvbm1lbnQ7XG5cbiAgY29uc3Qgc2VydmVyID0gbmV3IE1ha2VTZXJ2ZXI7XG5cbiAgY29uc3QgdmFyaWFibGVNYXAgPSBzZXJ2ZXIucm9vdFZhcmlhYmxlTWFwO1xuICBTY29wZUhlbHBlci5leHRlbmRWYXJpYWJsZU1hcEJ5VmFsdWVzKHZhcmlhYmxlTWFwLCBcIlwiLCBjb25maWcudmFyaWFibGVzKTtcbiAgU2NvcGVIZWxwZXIuZGVmaW5lVmFyaWFibGVzSW5WYXJpYWJsZU1hcCh2YXJpYWJsZU1hcCwgU1lTVEVNX1ZBUklBQkxFX0dST1VQLCBTeXN0ZW1WYXJpYWJsZXMpO1xuICBjb25zdCBzY29wZSA9IFNjb3BlSGVscGVyLmNyZWF0ZVByb3h5KHZhcmlhYmxlTWFwKSBhcyBTeXN0ZW1TY29wZTtcblxuICBjb25zdCBzb3VyY2VEaXIgPSBnZXRQYXRoU3RyaW5nKGNvbmZpZy5zb3VyY2VEaXIpO1xuICBjb25zdCBiaW5hcnlEaXIgPSBnZXRQYXRoU3RyaW5nKGNvbmZpZy5iaW5hcnlEaXIpO1xuXG4gIHNjb3BlLlBST0pFQ1RfU09VUkNFX0RJUiA9IEFic29sdXRlUGF0aC5jcmVhdGUoc291cmNlRGlyKTtcbiAgc2NvcGUuUFJPSkVDVF9CSU5BUllfRElSID0gQWJzb2x1dGVQYXRoLmNyZWF0ZShiaW5hcnlEaXIpO1xuXG4gIHNjb3BlLlBBQ0tBR0VfRklMRSA9IHNjb3BlLlBST0pFQ1RfU09VUkNFX0RJUi5qb2luKFBBQ0tBR0VfSlNPTik7XG4gIHNjb3BlLkNBQ0hFX0ZJTEUgPSBzY29wZS5QUk9KRUNUX0JJTkFSWV9ESVIuam9pbihNQUtFX0NBQ0hFKTtcbiAgc2NvcGUuU09VUkNFX0RJUiA9IHNjb3BlLlBST0pFQ1RfU09VUkNFX0RJUjtcbiAgc2NvcGUuQklOQVJZX0RJUiA9IHNjb3BlLlBST0pFQ1RfQklOQVJZX0RJUjtcblxuICBjb25zdCBwYWNrYWdlSnNvbiA9IGF3YWl0IGZzLnByb21pc2VzLnJlYWRGaWxlKHNjb3BlLlBBQ0tBR0VfRklMRS50b1N0cmluZygpLCBcInV0ZjhcIik7XG4gIGNvbnN0IHBrZyA9IEpTT04ucGFyc2UocGFja2FnZUpzb24pO1xuXG4gIHNjb3BlLkJVSUxEX1RZUEUgPSBjb25maWcuYnVpbGRUeXBlO1xuICBzY29wZS5QUk9KRUNUX05BTUUgPSBwa2cubmFtZTtcbiAgc2NvcGUuUFJPSkVDVF9WRVJTSU9OID0gcGtnLnZlcnNpb247XG4gIHNjb3BlLlBST0pFQ1RfREVTQ1JJUFRJT04gPSBwa2cuZGVzY3JpcHRpb24gfHwgXCJcIjtcbiAgc2NvcGUuUFJPSkVDVF9IT01FUEFHRV9VUkwgPSBwa2cuaG9tZXBhZ2UgfHwgXCJcIjtcblxuICBpZiAoY29uZmlnLmRlc3REaXIpXG4gICAgc2NvcGUuREVTVERJUiA9IGNvbmZpZy5kZXN0RGlyO1xuXG4gIGZvciAoY29uc3QgcGx1Z2luIG9mIChzY29wZS5NQUtFX1BMVUdJTl9MSVNUIHx8IFtdKSkge1xuICAgIGNvbnN0IGN3ZFNhdmUgPSBwcm9jZXNzLmN3ZCgpO1xuXG4gICAgc2NvcGUuU0NSSVBUX0ZJTEUgPSBBYnNvbHV0ZVBhdGguY3JlYXRlKHBsdWdpbik7XG4gICAgc2NvcGUuU0NSSVBUX0RJUiA9IHNjb3BlLlNDUklQVF9GSUxFLmRpcm5hbWUoKTtcbiAgICBzY29wZS5TT1VSQ0VfRElSID0gc2NvcGUuU0NSSVBUX0RJUjtcblxuICAgIGNvbnN0IGJpbmFyeURpcjEgPSBzY29wZS5QUk9KRUNUX0JJTkFSWV9ESVIucmVsYXRpdmUoc291cmNlRGlyKTtcbiAgICBjb25zdCBiaW5hcnlEaXIyID0gc2NvcGUuUFJPSkVDVF9TT1VSQ0VfRElSLnJlbGF0aXZlKHNvdXJjZURpcik7XG4gICAgY29uc3QgYmluYXJ5RGlyID0gKGJpbmFyeURpcjIubGVuZ3RoIDwgYmluYXJ5RGlyMS5sZW5ndGggPyBiaW5hcnlEaXIyIDogYmluYXJ5RGlyMSkucmVwbGFjZShcIi4uL1wiLCBcIl9fL1wiKTtcbiAgICBzY29wZS5CSU5BUllfRElSID0gc2NvcGUuUFJPSkVDVF9CSU5BUllfRElSLmpvaW4oXCJNYWtlUGx1Z2luQmluYXJpZXNcIiwgYmluYXJ5RGlyKTtcblxuICAgIHByb2Nlc3MuY2hkaXIoc2NvcGUuU09VUkNFX0RJUi50b1N0cmluZygpKTtcbiAgICBjb25zdCBwbHVnaW5VcmwgPSBnZXRVUkxTdHJpbmcoc2NvcGUuU0NSSVBUX0ZJTEUudG9TdHJpbmcoKSk7XG4gICAgY29uc3QgbW9kdWxlID0gYXdhaXQgaW1wb3J0TW9kdWxlKHBsdWdpblVybCk7XG4gICAgXG4gICAgaWYgKCFtb2R1bGUuZGVmYXVsdClcbiAgICAgIHRocm93IG5ldyBFcnJvcihgUGx1Z2luICR7c2NvcGUuU0NSSVBUX0ZJTEUuYmFzZW5hbWUoKX0gbm90IGNvbnRhaW4gZGVmYXVsdCBleHBvcnRgKTtcblxuICAgIGNvbnN0IG1rID0gUGx1Z2luQ29udGV4dC5jcmVhdGUoc2VydmVyLnByb2plY3QsIHZhcmlhYmxlTWFwKTtcbiAgICBpZiAodHlwZW9mIG1vZHVsZS5kZWZhdWx0ICE9PSBcImZ1bmN0aW9uXCIpXG4gICAgICB0aHJvdyBuZXcgRXJyb3IoYFBsdWdpbiAke3Njb3BlLlNDUklQVF9GSUxFLmJhc2VuYW1lKCl9IGV4cG9ydCBoYXMgbm8gZnVuY3Rpb24gb3IgY2xhc3NgKTtcbiAgICBsZXQgcmVzdWx0OiBhbnk7XG4gICAgaWYgKC9eY2xhc3NcXHMvLnRlc3QoRnVuY3Rpb24ucHJvdG90eXBlLnRvU3RyaW5nLmNhbGwobW9kdWxlLmRlZmF1bHQpKSkge1xuICAgICAgaWYgKHR5cGVvZiBtb2R1bGUuZGVmYXVsdC5wcm90b3R5cGUuYXBwbHkgIT09IFwiZnVuY3Rpb25cIilcbiAgICAgICAgdGhyb3cgbmV3IEVycm9yKGBQbHVnaW4gY2xhc3Mgb2YgJHtzY29wZS5TQ1JJUFRfRklMRS5iYXNlbmFtZSgpfSBoYXMgbm8gYXBwbHkgbWV0aG9kYCk7XG4gICAgICByZXN1bHQgPSAobmV3IG1vZHVsZS5kZWZhdWx0KS5hcHBseShtayk7XG4gICAgfVxuICAgIGVsc2Uge1xuICAgICAgcmVzdWx0ID0gbW9kdWxlLmRlZmF1bHQobWspO1xuICAgIH1cblxuICAgIGlmIChyZXN1bHQgaW5zdGFuY2VvZiBQcm9taXNlKVxuICAgICAgYXdhaXQgcmVzdWx0O1xuXG4gICAgcHJvY2Vzcy5jaGRpcihjd2RTYXZlKTtcbiAgfVxuXG4gIGlmIChzY29wZS5UT09MQ0hBSU5fRklMRSkge1xuICAgIGNvbnN0IHRvb2xjaGFpblVybCA9IGdldFVSTFN0cmluZyhzY29wZS5UT09MQ0hBSU5fRklMRS50b1N0cmluZygpKTtcbiAgICBjb25zdCB0b29sY2hhaW4gPSBhd2FpdCBpbXBvcnRNb2R1bGUodG9vbGNoYWluVXJsKTtcbiAgICBpZiAoIXRvb2xjaGFpbi5kZWZhdWx0KVxuICAgICAgdGhyb3cgbmV3IEVycm9yKFwiVG9vbGNoYWluIG1vZHVsZSBoYXMgbm8gZGVmYXVsdCBleHBvcnRcIik7XG4gICAgY29uc3QgbWsgPSBUb29sY2hhaW5Db250ZXh0LmNyZWF0ZShzZXJ2ZXIucHJvamVjdCwgdmFyaWFibGVNYXApO1xuICAgIGNvbnN0IHJlc3VsdCA9IHRvb2xjaGFpbi5kZWZhdWx0KG1rKTtcbiAgICBpZiAocmVzdWx0IGluc3RhbmNlb2YgUHJvbWlzZSlcbiAgICAgIGF3YWl0IHJlc3VsdDtcbiAgfVxuICBlbHNlIHtcbiAgICBhd2FpdCBkZXRlcm1pbmVDb21waWxlcihzY29wZSk7XG4gIH1cblxuICBpZiAoY29uZmlnLnNvdXJjZVVybCAmJiBjb25maWcuc291cmNlVXJsLnN0YXJ0c1dpdGgoSU1QT1JUX1NDSEVNRSkpIHtcbiAgICBjb25zdCBzY3JpcHRGaWxlID0gcmVxdWlyZVJlc29sdmUoY29uZmlnLnNvdXJjZVVybC5zbGljZShJTVBPUlRfU0NIRU1FLmxlbmd0aCkpO1xuICAgIHNjb3BlLlNDUklQVF9GSUxFID0gQWJzb2x1dGVQYXRoLmNyZWF0ZShzY3JpcHRGaWxlKTtcbiAgICBzY29wZS5TQ1JJUFRfRElSID0gc2NvcGUuU0NSSVBUX0ZJTEUuZGlybmFtZSgpO1xuICB9XG5cbiAgc2VydmVyLmFkZEV2ZW50TGlzdGVuZXIoXCJjb25maWd1cmVcIiwgYXN5bmMgKGV2ZW50KSA9PiB7XG4gICAgbG9nZ2VyLmluZm8oXCJDb25maWd1cmluZyBkb25lXCIpO1xuXG4gICAgaWYgKHNjb3BlLkdMT0JBTF9DT05URVhUX0pTT04pIHtcbiAgICAgIGNvbnN0IGZpbGVuYW1lID0gc2NvcGUuR0xPQkFMX0NPTlRFWFRfSlNPTi50b1N0cmluZygpO1xuICAgICAgY29uc3QgY29udGVudCA9IEpTT04uc3RyaW5naWZ5KHNlcnZlci5wcm9qZWN0LCBudWxsLCAyKTtcbiAgICAgIGF3YWl0IGZzLnByb21pc2VzLm1rZGlyKFBhdGguZGlybmFtZShmaWxlbmFtZSksIHsgcmVjdXJzaXZlOiB0cnVlIH0pO1xuICAgICAgYXdhaXQgZnMucHJvbWlzZXMud3JpdGVGaWxlKGZpbGVuYW1lLCBjb250ZW50LCB7IGVuY29kaW5nOiBcInV0ZjhcIiB9KTtcbiAgICB9XG5cbiAgICBjb25zdCBhbGxHb2FsTGlzdCA9IHNlcnZlci5wcm9qZWN0LmNyZWF0ZUdvYWxzKHNjb3BlKTtcbiAgICBjb25zdCBnb2FsTGlzdCA9IGFsbEdvYWxMaXN0LmdldFRhcmdldExpc3QoSU5TVEFMTF9UQVJHRVQpO1xuXG4gICAgaWYgKHNjb3BlLlRBUkdFVF9HT0FMU19KU09OKSB7XG4gICAgICBjb25zdCBmaWxlbmFtZSA9IHNjb3BlLlRBUkdFVF9HT0FMU19KU09OLnRvU3RyaW5nKCk7XG4gICAgICBjb25zdCBjb250ZW50ID0gSlNPTi5zdHJpbmdpZnkoZ29hbExpc3QsIG51bGwsIDIpO1xuICAgICAgYXdhaXQgZnMucHJvbWlzZXMubWtkaXIoUGF0aC5kaXJuYW1lKGZpbGVuYW1lKSwgeyByZWN1cnNpdmU6IHRydWUgfSk7XG4gICAgICBhd2FpdCBmcy5wcm9taXNlcy53cml0ZUZpbGUoZmlsZW5hbWUsIGNvbnRlbnQsIHsgZW5jb2Rpbmc6IFwidXRmOFwiIH0pO1xuICAgIH1cblxuICAgIGxldCBsb2FkZWQgPSAwO1xuICAgIGNvbnN0IHRvdGFsID0gZ29hbExpc3QubGVuZ3RoO1xuICAgIGZvciAoY29uc3QgZ29hbCBvZiBnb2FsTGlzdCkge1xuICAgICAgZ29hbC51cGRhdGVQcm9ncmVzcyh7IGxvYWRlZCwgdG90YWwgfSk7XG4gICAgICBhd2FpdCBnb2FsLmRvV29yaygpO1xuICAgICAgbG9hZGVkKys7XG4gICAgfVxuICB9KTtcblxuICBsZXQgZmluaXNoUmVzb2x2ZTogKCkgPT4gdm9pZDtcbiAgY29uc3QgcmVzdWx0ID0gbmV3IFByb21pc2U8dm9pZD4oKHJlc29sdmUpID0+IHtcbiAgICBmaW5pc2hSZXNvbHZlID0gcmVzb2x2ZTtcbiAgfSk7XG5cbiAgc2VydmVyLmFkZEV2ZW50TGlzdGVuZXIoXCJidWlsZFwiLCAoZXZlbnQpID0+IGZpbmlzaFJlc29sdmUoKSk7XG5cbiAgc2VydmVyLnN0YXJ0KCk7XG5cbiAgcmV0dXJuIHJlc3VsdDtcbn1cbiIsIi8qXG4gKiBNSVQgTGljZW5zZVxuICpcbiAqIENvcHlyaWdodCAoYykgMjAyNSAgWXVyaWkgWWFrdWJpbiAoeXVyaWkueWFrdWJpbkBnbWFpbC5jb20pXG4gKlxuICogUGVybWlzc2lvbiBpcyBncmFudGVkIHRvIHVzZSwgY29weSwgbW9kaWZ5LCBhbmQgZGlzdHJpYnV0ZSB0aGlzIHNvZnR3YXJlXG4gKiB1bmRlciB0aGUgTUlUIExpY2Vuc2UuIFNlZSBMSUNFTlNFIGZpbGUgZm9yIGRldGFpbHMuXG4gKi9cblxuaW1wb3J0IHsgQ01ha2VQcm9jZXNzLCBERUZBVUxUX0dFTkVSQVRPUiB9IGZyb20gXCJAL2NtYWtlXCI7XG5pbXBvcnQgeyBnZXRQYXRoU3RyaW5nIH0gIGZyb20gXCJAL3V0aWxzL0ZpbGVTeXN0ZW1cIjtcbmltcG9ydCB7IFNldHRpbmdzU3RvcmFnZSB9IGZyb20gXCJAL3V0aWxzL1NldHRpbmdzU3RvcmFnZVwiO1xuXG5leHBvcnQgZGVmYXVsdCBhc3luYyBmdW5jdGlvbihjb25maWc6IGFueSwgZW52aXJvbm1lbnQ6IGFueSwgc2V0dGluZ3M6IFNldHRpbmdzU3RvcmFnZSkge1xuICBjb25zdCBzb3VyY2VEaXIgPSBnZXRQYXRoU3RyaW5nKGNvbmZpZy5zb3VyY2VEaXIpO1xuICBjb25zdCBiaW5hcnlEaXIgPSBnZXRQYXRoU3RyaW5nKGNvbmZpZy5iaW5hcnlEaXIpO1xuICBjb25zdCBjbWFrZUFyZ3MgPSB7XG4gICAgZW52aXJvbm1lbnQ6IHtcbiAgICAgIC4uLmVudmlyb25tZW50LFxuICAgICAgREVTVERJUjogY29uZmlnLmRlc3REaXIsXG4gICAgfSxcbiAgICBnZW5lcmF0b3I6IGNvbmZpZy5nZW5lcmF0b3IgfHwgREVGQVVMVF9HRU5FUkFUT1IsXG4gICAgY2FjaGVWYXJpYWJsZXM6IGNvbmZpZy5jYWNoZVZhcmlhYmxlcyxcbiAgICBzb3VyY2VEaXIsXG4gICAgYmluYXJ5RGlyLFxuICB9O1xuXG4gIGlmICghY21ha2VBcmdzLmNhY2hlVmFyaWFibGVzLkNNQUtFX0JVSUxEX1RZUEUpIHtcbiAgICBjbWFrZUFyZ3MuY2FjaGVWYXJpYWJsZXMuQ01BS0VfQlVJTERfVFlQRSA9IGNvbmZpZy5idWlsZFR5cGU7XG4gIH1cblxuICBjb25zdCBjbWFrZSA9IENNYWtlUHJvY2Vzcy5nZXRJbnN0YW5jZSgpO1xuICBhd2FpdCBjbWFrZS5jb25maWd1cmUoY21ha2VBcmdzKTtcbiAgYXdhaXQgY21ha2UuYnVpbGQoY21ha2VBcmdzKTtcbiAgYXdhaXQgY21ha2UuaW5zdGFsbChjbWFrZUFyZ3MpO1xufVxuIiwiLypcbiAqIE1JVCBMaWNlbnNlXG4gKlxuICogQ29weXJpZ2h0IChjKSAyMDI1ICBZdXJpaSBZYWt1YmluICh5dXJpaS55YWt1YmluQGdtYWlsLmNvbSlcbiAqXG4gKiBQZXJtaXNzaW9uIGlzIGdyYW50ZWQgdG8gdXNlLCBjb3B5LCBtb2RpZnksIGFuZCBkaXN0cmlidXRlIHRoaXMgc29mdHdhcmVcbiAqIHVuZGVyIHRoZSBNSVQgTGljZW5zZS4gU2VlIExJQ0VOU0UgZmlsZSBmb3IgZGV0YWlscy5cbiAqL1xuXG5pbXBvcnQgcGF0aCBmcm9tIFwibm9kZTpwYXRoXCI7XG5cbmltcG9ydCB7IGVuc3VyZUJvb2xlYW4gfSBmcm9tIFwiQC91dGlscy9TdHJpY3RUeXBlXCI7XG5pbXBvcnQgeyBnZXRQYXRoU3RyaW5nIH0gZnJvbSBcIkAvdXRpbHMvRmlsZVN5c3RlbVwiO1xuaW1wb3J0IHsgU2V0dGluZ3NTdG9yYWdlIH0gZnJvbSBcIkAvdXRpbHMvU2V0dGluZ3NTdG9yYWdlXCI7XG5pbXBvcnQgeyBzcGF3bkFzeW5jIH0gZnJvbSBcIkAvdXRpbHMvQ2hpbGRQcm9jZXNzXCI7XG5cbmV4cG9ydCBkZWZhdWx0IGFzeW5jIGZ1bmN0aW9uKGNvbmZpZzogYW55LCBlbnZpcm9ubWVudDogYW55LCBzZXR0aW5nczogU2V0dGluZ3NTdG9yYWdlKSB7XG4gIGNvbnN0IHNvdXJjZURpciA9IGdldFBhdGhTdHJpbmcoY29uZmlnLnNvdXJjZURpcik7XG4gIGNvbnN0IGJpbmFyeURpciA9IGdldFBhdGhTdHJpbmcoY29uZmlnLmJpbmFyeURpcik7XG4gIGxldCBzdGVwID0gYXdhaXQgc2V0dGluZ3MuZ2V0KFwiY29uZmlndXJlXCIpIHx8IFwiY29uZmlnXCI7XG4gIGlmIChzdGVwID09PSBcImNvbmZpZ1wiKSB7XG4gICAgY29uc3QgY29tbWFuZCA9IHBhdGgucmVzb2x2ZShzb3VyY2VEaXIsIFwiY29uZmlndXJlXCIpO1xuICAgIGNvbnN0IHBhcmFtcyA9IFtdO1xuICAgIGlmIChBcnJheS5pc0FycmF5KGNvbmZpZy52YXJpYWJsZXMpKSB7XG4gICAgICBmb3IgKGNvbnN0IGl0ZXIgb2YgY29uZmlnLnZhcmlhYmxlcylcbiAgICAgICAgcGFyYW1zLnB1c2goaXRlcik7XG4gICAgfVxuICAgIGVsc2UgaWYgKGNvbmZpZy52YXJpYWJsZXMpIHtcbiAgICAgIGZvciAoY29uc3QgW2tleSx2YWxdIG9mIE9iamVjdC5lbnRyaWVzKGNvbmZpZy52YXJpYWJsZXMpKSB7XG4gICAgICAgIGlmIChrZXkgPT09IFwiZmVhdHVyZXNcIiAmJiBBcnJheS5pc0FycmF5KHZhbCkpIHtcbiAgICAgICAgICBmb3IgKGNvbnN0IGl0ZXIgb2YgdmFsKVxuICAgICAgICAgICAgcGFyYW1zLnB1c2goYC0tJHtpdGVyfWApO1xuICAgICAgICB9XG4gICAgICAgIGVsc2UgaWYgKHZhbCA9PT0gbnVsbClcbiAgICAgICAgICBwYXJhbXMucHVzaChgLS0ke2tleX1gKTtcbiAgICAgICAgZWxzZVxuICAgICAgICAgIHBhcmFtcy5wdXNoKGAtLSR7a2V5fT0ke3ZhbH1gKTtcbiAgICAgIH1cbiAgICB9XG4gICAgaWYgKGNvbmZpZy5mZWF0dXJlcykge1xuICAgICAgZm9yIChjb25zdCBrZXkgb2YgY29uZmlnLmZlYXR1cmVzKVxuICAgICAgICBwYXJhbXMucHVzaChgLS0ke2tleX1gKTtcbiAgICB9XG4gICAgY29uc3QgcmVzMSA9IGF3YWl0IHNwYXduQXN5bmMoY29tbWFuZCwgcGFyYW1zLCB7XG4gICAgICBjd2Q6IGJpbmFyeURpcixcbiAgICAgIGVudjogZW52aXJvbm1lbnQsXG4gICAgICBleHRyYToge1xuICAgICAgICBvdXRwdXQ6IGBhYy1jb25maWd1cmUtJHtzdGVwfS5sb2dgLFxuICAgICAgfSxcbiAgICB9KTtcbiAgICBpZiAocmVzMS5zdGF0dXMgIT09IDApIHtcbiAgICAgIHRocm93IG5ldyBFcnJvcihgY29uZmlndXJlIHJldHVybmVkIHN0YXR1cyAke3JlczEuc3RhdHVzfWApO1xuICAgIH1cbiAgICBzdGVwID0gXCJtYWtlXCI7XG4gICAgYXdhaXQgc2V0dGluZ3Muc2V0KFwiY29uZmlndXJlXCIsIHN0ZXApO1xuICB9XG4gIGlmIChzdGVwID09PSBcIm1ha2VcIikge1xuICAgIGxldCBydW5NYWtlID0gZmFsc2U7XG4gICAgaWYgKE9iamVjdC5oYXNPd24oY29uZmlnLCBcInJ1bk1ha2VcIikpXG4gICAgICBydW5NYWtlID0gZW5zdXJlQm9vbGVhbihjb25maWcucnVuTWFrZSk7XG4gICAgaWYgKHJ1bk1ha2UpIHtcbiAgICAgIGNvbnN0IHJlczIgPSBhd2FpdCBzcGF3bkFzeW5jKFwibWFrZVwiLCBbXSwge1xuICAgICAgICBjd2Q6IGJpbmFyeURpcixcbiAgICAgICAgZW52OiBlbnZpcm9ubWVudCxcbiAgICAgICAgZXh0cmE6IHtcbiAgICAgICAgICBvdXRwdXQ6IGBhYy1jb25maWd1cmUtJHtzdGVwfS5sb2dgLFxuICAgICAgICB9LFxuICAgICAgfSk7XG4gICAgICBpZiAocmVzMi5zdGF0dXMgIT09IDApIHtcbiAgICAgICAgdGhyb3cgbmV3IEVycm9yKGBtYWtlIHJldHVybmVkIHN0YXR1cyAke3JlczIuc3RhdHVzfWApO1xuICAgICAgfVxuICAgIH1cbiAgICBzdGVwID0gXCJpbnN0YWxsXCI7XG4gICAgYXdhaXQgc2V0dGluZ3Muc2V0KFwiY29uZmlndXJlXCIsIHN0ZXApO1xuICB9XG4gIGlmIChzdGVwID09PSBcImluc3RhbGxcIikge1xuICAgIGxldCBydW5NYWtlSW5zdGFsbCA9IHRydWU7XG4gICAgaWYgKE9iamVjdC5oYXNPd24oY29uZmlnLCBcInJ1bk1ha2VJbnN0YWxsXCIpKVxuICAgICAgcnVuTWFrZUluc3RhbGwgPSBlbnN1cmVCb29sZWFuKGNvbmZpZy5ydW5NYWtlSW5zdGFsbCk7XG4gICAgaWYgKHJ1bk1ha2VJbnN0YWxsKSB7XG4gICAgICBjb25zdCBhcmdzID0gWyBcImluc3RhbGxcIiBdO1xuICAgICAgaWYgKGNvbmZpZy5kZXN0RGlyKSB7XG4gICAgICAgIGFyZ3MucHVzaChgREVTVERJUj0ke2NvbmZpZy5kZXN0RGlyfWApO1xuICAgICAgfVxuICAgICAgY29uc3QgcmVzMiA9IGF3YWl0IHNwYXduQXN5bmMoXCJtYWtlXCIsIGFyZ3MsIHtcbiAgICAgICAgY3dkOiBiaW5hcnlEaXIsXG4gICAgICAgIGVudjogZW52aXJvbm1lbnQsXG4gICAgICAgIGV4dHJhOiB7XG4gICAgICAgICAgb3V0cHV0OiBgYWMtY29uZmlndXJlLSR7c3RlcH0ubG9nYCxcbiAgICAgICAgfSxcbiAgICAgIH0pO1xuICAgICAgaWYgKHJlczIuc3RhdHVzICE9PSAwKSB7XG4gICAgICAgIHRocm93IG5ldyBFcnJvcihgbWFrZSByZXR1cm5lZCBzdGF0dXMgJHtyZXMyLnN0YXR1c31gKTtcbiAgICAgIH1cbiAgICB9XG4gICAgc3RlcCA9IFwiZG9uZVwiO1xuICAgIGF3YWl0IHNldHRpbmdzLnNldChcImNvbmZpZ3VyZVwiLCBzdGVwKTtcbiAgfVxufVxuIiwiLypcbiAqIE1JVCBMaWNlbnNlXG4gKlxuICogQ29weXJpZ2h0IChjKSAyMDI1ICBZdXJpaSBZYWt1YmluICh5dXJpaS55YWt1YmluQGdtYWlsLmNvbSlcbiAqXG4gKiBQZXJtaXNzaW9uIGlzIGdyYW50ZWQgdG8gdXNlLCBjb3B5LCBtb2RpZnksIGFuZCBkaXN0cmlidXRlIHRoaXMgc29mdHdhcmVcbiAqIHVuZGVyIHRoZSBNSVQgTGljZW5zZS4gU2VlIExJQ0VOU0UgZmlsZSBmb3IgZGV0YWlscy5cbiAqL1xuXG5pbXBvcnQgeyBTZXR0aW5nc1N0b3JhZ2UgfSBmcm9tIFwiQC91dGlscy9TZXR0aW5nc1N0b3JhZ2VcIjtcblxuaW1wb3J0IG5vbmUgZnJvbSBcIkAvYWN0aW9ucy9ub25lXCI7XG5pbXBvcnQgcHJvY2VzcyBmcm9tIFwiQC9hY3Rpb25zL3Byb2Nlc3NcIjtcbmltcG9ydCBjb25maWd1cmUgZnJvbSBcIkAvYWN0aW9ucy9jb25maWd1cmVcIjtcbmltcG9ydCBtYWtlIGZyb20gXCJAL2FjdGlvbnMvbWFrZVwiO1xuaW1wb3J0IGNtYWtlIGZyb20gXCJAL2FjdGlvbnMvY21ha2VcIjtcbmltcG9ydCBiaXRtYWtlIGZyb20gXCJAL2FjdGlvbnMvYml0bWFrZVwiO1xuXG5pbnRlcmZhY2UgQWN0aW9uSGFuZGxlcnMge1xuICBbbmFtZTogc3RyaW5nXTogKGNvbmZpZzogYW55LCBlbnZpcm9ubWVudDogYW55LCBzZXR0aW5nczogU2V0dGluZ3NTdG9yYWdlKSA9PiBQcm9taXNlPHZvaWQ+O1xufVxuXG5leHBvcnQgZGVmYXVsdCA8QWN0aW9uSGFuZGxlcnM+IHtcbiAgbm9uZSxcbiAgcHJvY2VzcyxcbiAgY29uZmlndXJlLFxuICBtYWtlLFxuICBjbWFrZSxcbiAgYml0bWFrZSxcbn07XG4iLCIvKlxuICogTUlUIExpY2Vuc2VcbiAqXG4gKiBDb3B5cmlnaHQgKGMpIDIwMjUgIFl1cmlpIFlha3ViaW4gKHl1cmlpLnlha3ViaW5AZ21haWwuY29tKVxuICpcbiAqIFBlcm1pc3Npb24gaXMgZ3JhbnRlZCB0byB1c2UsIGNvcHksIG1vZGlmeSwgYW5kIGRpc3RyaWJ1dGUgdGhpcyBzb2Z0d2FyZVxuICogdW5kZXIgdGhlIE1JVCBMaWNlbnNlLiBTZWUgTElDRU5TRSBmaWxlIGZvciBkZXRhaWxzLlxuICovXG5cbmltcG9ydCB7IHNwYXduQXN5bmMgfSBmcm9tIFwiQC91dGlscy9DaGlsZFByb2Nlc3NcIjtcbmltcG9ydCB7IGdldFBhdGhTdHJpbmcgfSAgZnJvbSBcIkAvdXRpbHMvRmlsZVN5c3RlbVwiO1xuaW1wb3J0IHsgU2V0dGluZ3NTdG9yYWdlIH0gZnJvbSBcIkAvdXRpbHMvU2V0dGluZ3NTdG9yYWdlXCI7XG5cbmV4cG9ydCBkZWZhdWx0IGFzeW5jIGZ1bmN0aW9uKGNvbmZpZzogYW55LCBlbnZpcm9ubWVudDogYW55LCBzZXR0aW5nczogU2V0dGluZ3NTdG9yYWdlKSB7XG4gIGNvbnN0IGJpbmFyeURpciA9IGdldFBhdGhTdHJpbmcoY29uZmlnLmJpbmFyeURpcik7XG4gIGNvbnN0IGFyZ3MgPSBjb25maWcuYXJncyB8fCBbXTtcbiAgaWYgKGNvbmZpZy5kZXN0RGlyKSB7XG4gICAgYXJncy5wdXNoKGBERVNURElSPSR7Y29uZmlnLmRlc3REaXJ9YCk7XG4gIH1cbiAgY29uc3QgcmVzMiA9IGF3YWl0IHNwYXduQXN5bmMoXCJtYWtlXCIsIGFyZ3MsIHtcbiAgICBjd2Q6IGJpbmFyeURpcixcbiAgICBlbnY6IGVudmlyb25tZW50LFxuICAgIGV4dHJhOiB7XG4gICAgICBvdXRwdXQ6IGBtYWtlLmxvZ2AsXG4gICAgfSxcbiAgfSk7XG4gIGlmIChyZXMyLnN0YXR1cyAhPT0gMCkge1xuICAgIHRocm93IG5ldyBFcnJvcihgbWFrZSByZXR1cm5lZCBzdGF0dXMgJHtyZXMyLnN0YXR1c31gKTtcbiAgfVxufVxuIiwiLypcbiAqIE1JVCBMaWNlbnNlXG4gKlxuICogQ29weXJpZ2h0IChjKSAyMDI1ICBZdXJpaSBZYWt1YmluICh5dXJpaS55YWt1YmluQGdtYWlsLmNvbSlcbiAqXG4gKiBQZXJtaXNzaW9uIGlzIGdyYW50ZWQgdG8gdXNlLCBjb3B5LCBtb2RpZnksIGFuZCBkaXN0cmlidXRlIHRoaXMgc29mdHdhcmVcbiAqIHVuZGVyIHRoZSBNSVQgTGljZW5zZS4gU2VlIExJQ0VOU0UgZmlsZSBmb3IgZGV0YWlscy5cbiAqL1xuXG5cbmltcG9ydCB7IFNldHRpbmdzU3RvcmFnZSB9IGZyb20gXCJAL3V0aWxzL1NldHRpbmdzU3RvcmFnZVwiO1xuaW1wb3J0IHsgTG9nZ2VyIH0gZnJvbSBcIkAvbG9nZ2VyXCI7XG5cbmNvbnN0IGxvZ2dlciA9IExvZ2dlci5jcmVhdGUoaW1wb3J0Lm1ldGEudXJsKTtcblxuZXhwb3J0IGRlZmF1bHQgYXN5bmMgZnVuY3Rpb24oY29uZmlnOiBhbnksIGVudmlyb25tZW50OiBhbnksIHNldHRpbmdzOiBTZXR0aW5nc1N0b3JhZ2UpIHtcbiAgLyogZG8gbm90aGluZyAqL1xufVxuIiwiLypcbiAqIE1JVCBMaWNlbnNlXG4gKlxuICogQ29weXJpZ2h0IChjKSAyMDI1ICBZdXJpaSBZYWt1YmluICh5dXJpaS55YWt1YmluQGdtYWlsLmNvbSlcbiAqXG4gKiBQZXJtaXNzaW9uIGlzIGdyYW50ZWQgdG8gdXNlLCBjb3B5LCBtb2RpZnksIGFuZCBkaXN0cmlidXRlIHRoaXMgc29mdHdhcmVcbiAqIHVuZGVyIHRoZSBNSVQgTGljZW5zZS4gU2VlIExJQ0VOU0UgZmlsZSBmb3IgZGV0YWlscy5cbiAqL1xuXG5cbmltcG9ydCBwYXRoIGZyb20gXCJub2RlOnBhdGhcIjtcblxuaW1wb3J0IHsgZ2V0UGF0aFN0cmluZyB9IGZyb20gXCJAL3V0aWxzL0ZpbGVTeXN0ZW1cIjtcbmltcG9ydCB7IFNldHRpbmdzU3RvcmFnZSB9IGZyb20gXCJAL3V0aWxzL1NldHRpbmdzU3RvcmFnZVwiO1xuaW1wb3J0IHsgc3Bhd25Bc3luYyB9IGZyb20gXCJAL3V0aWxzL0NoaWxkUHJvY2Vzc1wiO1xuaW1wb3J0IHsgTG9nZ2VyIH0gZnJvbSBcIkAvbG9nZ2VyXCI7XG5cbmNvbnN0IGxvZ2dlciA9IExvZ2dlci5jcmVhdGUoaW1wb3J0Lm1ldGEudXJsKTtcblxuZXhwb3J0IGRlZmF1bHQgYXN5bmMgZnVuY3Rpb24oY29uZmlnOiBhbnksIGVudmlyb25tZW50OiBhbnksIHNldHRpbmdzOiBTZXR0aW5nc1N0b3JhZ2UpIHtcbiAgaWYgKCFjb25maWcuY29tbWFuZClcbiAgICB0aHJvdyBuZXcgRXJyb3IoXCJSZXF1aXJlZCBjb21tYW5kIGZpZWxkIGZvciBwcm9jZXNzIGFjdGlvblwiKTtcbiAgY29uc3Qgc291cmNlRGlyID0gZ2V0UGF0aFN0cmluZyhjb25maWcuc291cmNlRGlyKTtcbiAgY29uc3QgYmluYXJ5RGlyID0gZ2V0UGF0aFN0cmluZyhjb25maWcuYmluYXJ5RGlyKTtcbiAgbGV0IHsgY29tbWFuZCB9ID0gY29uZmlnO1xuICBpZiAoIXBhdGguaXNBYnNvbHV0ZShjb21tYW5kKSAmJiAoY29tbWFuZC5pbmNsdWRlcyhwYXRoLnBvc2l4LmRlbGltaXRlcikgfHwgY29tbWFuZC5pbmNsdWRlcyhwYXRoLndpbjMyLmRlbGltaXRlcikpKSB7XG4gICAgY29tbWFuZCA9IHBhdGgucmVzb2x2ZShzb3VyY2VEaXIsIGNvbW1hbmQpO1xuICB9XG4gIGNvbnN0IHJlcyA9IGF3YWl0IHNwYXduQXN5bmMoY29tbWFuZCwgY29uZmlnLmFyZ3MgfHwgW10sIHtcbiAgICBjd2Q6IGJpbmFyeURpcixcbiAgICBlbnY6IGVudmlyb25tZW50LFxuICAgIGV4dHJhOiB7XG4gICAgICBvdXRwdXQ6IGBwcm9jZXNzLmxvZ2AsXG4gICAgfSxcbiAgfSk7XG4gIGlmIChyZXMuc3RhdHVzICE9PSAwKSB7XG4gICAgdGhyb3cgbmV3IEVycm9yKGBwcm9jZXNzIHJldHVybmVkIHN0YXR1cyAke3Jlcy5zdGF0dXN9YCk7XG4gIH1cbn1cbiIsIi8qXG4gKiBNSVQgTGljZW5zZVxuICpcbiAqIENvcHlyaWdodCAoYykgMjAyNSAgWXVyaWkgWWFrdWJpbiAoeXVyaWkueWFrdWJpbkBnbWFpbC5jb20pXG4gKlxuICogUGVybWlzc2lvbiBpcyBncmFudGVkIHRvIHVzZSwgY29weSwgbW9kaWZ5LCBhbmQgZGlzdHJpYnV0ZSB0aGlzIHNvZnR3YXJlXG4gKiB1bmRlciB0aGUgTUlUIExpY2Vuc2UuIFNlZSBMSUNFTlNFIGZpbGUgZm9yIGRldGFpbHMuXG4gKi9cblxuZXhwb3J0IGVudW0gQm9vbGVhblR5cGUge1xuICBPTiA9IFwiT05cIixcbiAgT0ZGID0gXCJPRkZcIixcbn07XG5cbi8vIEVudW0gcmVwcmVzZW50aW5nIHZhbHVlIHR5cGVzIHVzZWQgaW4gQ01ha2UgY2FjaGUgdmFyaWFibGVzXG5leHBvcnQgZW51bSBWYWx1ZVR5cGUge1xuICAvLyBSZXByZXNlbnRzIGEgZnVsbCBwYXRoIHRvIGEgZmlsZVxuICBGSUxFUEFUSCA9IFwiRklMRVBBVEhcIixcblxuICAvLyBSZXByZXNlbnRzIGEgcGF0aCB0byBhIGRpcmVjdG9yeVxuICBQQVRIID0gXCJQQVRIXCIsXG5cbiAgLy8gUmVwcmVzZW50cyBhIGJvb2xlYW4gdmFsdWUgKHRydWUvZmFsc2UpXG4gIEJPT0wgPSBcIkJPT0xcIixcblxuICAvLyBSZXByZXNlbnRzIGEgZ2VuZXJpYyBzdHJpbmcgdmFsdWVcbiAgU1RSSU5HID0gXCJTVFJJTkdcIixcbn07XG5cbi8vIEJ1aWxkVHlwZSByZXByZXNlbnRpbmcgY29tbW9uIENNYWtlIGJ1aWxkIHR5cGVzXG5leHBvcnQgZW51bSBCdWlsZFR5cGUge1xuICAvLyBEZWJ1ZyBidWlsZCB0eXBlOiBpbmNsdWRlcyBkZWJ1ZyBzeW1ib2xzLCBubyBvcHRpbWl6YXRpb25cbiAgRGVidWcgPSBcIkRlYnVnXCIsXG5cbiAgLy8gUmVsZWFzZSBidWlsZCB0eXBlOiBvcHRpbWl6ZWQgY29kZSwgbm8gZGVidWcgaW5mb1xuICBSZWxlYXNlID0gXCJSZWxlYXNlXCIsXG5cbiAgLy8gUmVsZWFzZSB3aXRoIGRlYnVnIGluZm86IG9wdGltaXplZCB3aXRoIGRlYnVnIHN5bWJvbHMgaW5jbHVkZWRcbiAgUmVsV2l0aERlYkluZm8gPSBcIlJlbFdpdGhEZWJJbmZvXCIsXG5cbiAgLy8gTWluaW11bSBzaXplIHJlbGVhc2U6IG9wdGltaXplZCBmb3Igc21hbGxlc3QgYmluYXJ5IHNpemVcbiAgTWluU2l6ZVJlbCA9IFwiTWluU2l6ZVJlbFwiLFxufTtcblxuLy8gVGhlIGRlZmF1bHQgbmFtZSBvZiB0aGUgbWFpbiBDTWFrZSBidWlsZCBjb25maWd1cmF0aW9uIGZpbGVcbmV4cG9ydCBjb25zdCBDTUFLRV9MSVNUU19UWFQgPSBcIkNNYWtlTGlzdHMudHh0XCI7XG5cbmV4cG9ydCBlbnVtIEdlbmVyYXRvclR5cGUge1xuICAvLyBOYW1lIG9mIHRoZSBDTWFrZSBnZW5lcmF0b3IgZm9yIHN0YW5kYXJkIFVuaXggJ21ha2UnIGJ1aWxkIHN5c3RlbVxuICBVbml4TWFrZWZpbGVzID0gXCJVbml4IE1ha2VmaWxlc1wiLFxufTtcblxuLy8gTmFtZSBvZiB0aGUgQ01ha2UgZ2VuZXJhdG9yIGZvciBzdGFuZGFyZCBVbml4ICdtYWtlJyBidWlsZCBzeXN0ZW1cbmV4cG9ydCBjb25zdCBERUZBVUxUX0dFTkVSQVRPUjogR2VuZXJhdG9yVHlwZSA9IEdlbmVyYXRvclR5cGUuVW5peE1ha2VmaWxlcztcbiIsIi8qXG4gKiBNSVQgTGljZW5zZVxuICpcbiAqIENvcHlyaWdodCAoYykgMjAyNSAgWXVyaWkgWWFrdWJpbiAoeXVyaWkueWFrdWJpbkBnbWFpbC5jb20pXG4gKlxuICogUGVybWlzc2lvbiBpcyBncmFudGVkIHRvIHVzZSwgY29weSwgbW9kaWZ5LCBhbmQgZGlzdHJpYnV0ZSB0aGlzIHNvZnR3YXJlXG4gKiB1bmRlciB0aGUgTUlUIExpY2Vuc2UuIFNlZSBMSUNFTlNFIGZpbGUgZm9yIGRldGFpbHMuXG4gKi9cblxuaW1wb3J0IHsgQm9vbGVhblR5cGUgfSBmcm9tIFwiQC9jbWFrZS9Db25zdGFudHNcIjtcblxuZXhwb3J0IGZ1bmN0aW9uIGNvbnZlcnRUb1ZhbHVlKG9iajogYW55KTogc3RyaW5nIHtcbiAgaWYgKEFycmF5LmlzQXJyYXkob2JqKSlcbiAgICByZXR1cm4gb2JqLm1hcChpID0+IGNvbnZlcnRUb1ZhbHVlKGkpKS5qb2luKFwiO1wiKTtcblxuICBpZiAodHlwZW9mIG9iaiA9PT0gXCJib29sZWFuXCIpXG4gICAgcmV0dXJuIG9iaiA/IEJvb2xlYW5UeXBlLk9OIDogQm9vbGVhblR5cGUuT0ZGO1xuXG4gIHJldHVybiBvYmoudG9TdHJpbmcoKTtcbn1cbiIsIi8qXG4gKiBNSVQgTGljZW5zZVxuICpcbiAqIENvcHlyaWdodCAoYykgMjAyNSAgWXVyaWkgWWFrdWJpbiAoeXVyaWkueWFrdWJpbkBnbWFpbC5jb20pXG4gKlxuICogUGVybWlzc2lvbiBpcyBncmFudGVkIHRvIHVzZSwgY29weSwgbW9kaWZ5LCBhbmQgZGlzdHJpYnV0ZSB0aGlzIHNvZnR3YXJlXG4gKiB1bmRlciB0aGUgTUlUIExpY2Vuc2UuIFNlZSBMSUNFTlNFIGZpbGUgZm9yIGRldGFpbHMuXG4gKi9cblxuaW1wb3J0IG9zIGZyb20gXCJub2RlOm9zXCI7XG5pbXBvcnQgZnMgZnJvbSBcIm5vZGU6ZnNcIjtcbmltcG9ydCBwYXRoIGZyb20gXCJub2RlOnBhdGhcIjtcblxuaW1wb3J0IHsgc3Bhd25Bc3luYyB9IGZyb20gXCJAL3V0aWxzL0NoaWxkUHJvY2Vzc1wiO1xuaW1wb3J0IHsgQ01BS0VfTElTVFNfVFhULCBERUZBVUxUX0dFTkVSQVRPUiwgVmFsdWVUeXBlIH0gZnJvbSBcIkAvY21ha2UvQ29uc3RhbnRzXCI7XG5pbXBvcnQgeyBjb252ZXJ0VG9WYWx1ZSB9IGZyb20gXCJAL2NtYWtlL0hlbHBlclwiO1xuaW1wb3J0IHsgSG9zdCB9IGZyb20gXCJAL3V0aWxzL0hvc3RcIjtcblxuZnVuY3Rpb24gdG9WYXJUeXBlKGtleTogc3RyaW5nLCB2YWw6IGFueSkge1xuICBjb25zdCBtYXA6IGFueSA9IHtcbiAgICBDTUFLRV9JTlNUQUxMX1BSRUZJWDogVmFsdWVUeXBlLlBBVEgsXG4gICAgQ01BS0VfVE9PTENIQUlOX0ZJTEU6IFZhbHVlVHlwZS5GSUxFUEFUSCxcbiAgfTtcblxuICBpZiAodHlwZW9mIHZhbCA9PT0gXCJib29sZWFuXCIpXG4gICAgcmV0dXJuIFZhbHVlVHlwZS5CT09MO1xuXG4gIGlmIChtYXAuaGFzT3duUHJvcGVydHkoa2V5KSlcbiAgICByZXR1cm4gbWFwW2tleV07XG5cbiAgcmV0dXJuIFZhbHVlVHlwZS5TVFJJTkc7XG59XG5cbmZ1bmN0aW9uIG1ha2VDbWRWYXJpYWJsZShrZXk6IHN0cmluZywgdmFsOiBhbnksIGlzQ2FjaGU6IGJvb2xlYW4pIHtcbiAgbGV0IG5hbWUgPSBrZXk7XG4gIGlmIChpc0NhY2hlKVxuICAgIG5hbWUgKz0gXCI6XCIgKyB0b1ZhclR5cGUoa2V5LCB2YWwpO1xuICByZXR1cm4gbmFtZSArIFwiPVwiICsgY29udmVydFRvVmFsdWUodmFsKTtcbn1cblxuZnVuY3Rpb24gbWFrZUNtZFZhcmlhYmxlcyh2YXJpYWJsZXM6IG9iamVjdCwgaXNDYWNoZTogYm9vbGVhbik6IHN0cmluZ1tdIHtcbiAgY29uc3QgcmVzdWx0OiBzdHJpbmdbXSA9IFtdO1xuICBmb3IgKGNvbnN0IFtrZXksIHZhbF0gb2YgT2JqZWN0LmVudHJpZXModmFyaWFibGVzKSlcbiAgICByZXN1bHQucHVzaChcIi1EXCIsIG1ha2VDbWRWYXJpYWJsZShrZXksIHZhbCwgaXNDYWNoZSkpO1xuICByZXR1cm4gcmVzdWx0O1xufVxuXG5leHBvcnQgaW50ZXJmYWNlIFNjcmlwdE1vZGVPcHRpb25zIHtcbiAgZW52aXJvbm1lbnQ/OiBvYmplY3Q7XG4gIHdvcmtEaXI/OiBzdHJpbmc7XG59O1xuXG5leHBvcnQgY2xhc3MgQ01ha2VQcm9jZXNzIHtcbiAgcHJpdmF0ZSBfY21ha2VQYXRoOiBzdHJpbmc7XG5cbiAgcHVibGljIGNvbnN0cnVjdG9yKGNtYWtlUGF0aDogc3RyaW5nKSB7XG4gICAgdGhpcy5fY21ha2VQYXRoID0gY21ha2VQYXRoO1xuICB9XG5cbiAgcHVibGljIGFzeW5jIHNjcmlwdE1vZGUoc2NyaXB0RmlsZTogc3RyaW5nLCB2YXJpYWJsZXM6IG9iamVjdCwgb3B0aW9ucz86IFNjcmlwdE1vZGVPcHRpb25zKTogUHJvbWlzZTx2b2lkPiB7XG4gICAgY29uc3Qgc3Bhd25BcmdzID0gW1xuICAgICAgLi4ubWFrZUNtZFZhcmlhYmxlcyh2YXJpYWJsZXMsIGZhbHNlKSxcbiAgICAgIFwiLVBcIiwgc2NyaXB0RmlsZSxcbiAgICBdO1xuICAgIGNvbnN0IHJlczogYW55ID0gYXdhaXQgc3Bhd25Bc3luYyh0aGlzLl9jbWFrZVBhdGgsIHNwYXduQXJncywge1xuICAgICAgY3dkOiBvcHRpb25zPy53b3JrRGlyLFxuICAgICAgZW52OiBvcHRpb25zPy5lbnZpcm9ubWVudCB8fCBwcm9jZXNzLmVudixcbiAgICB9KTtcbiAgICBpZiAocmVzLnN0YXR1cyAhPT0gMCkge1xuICAgICAgdGhyb3cgYGNtYWtlLnNjcmlwdE1vZGUgcmV0dXJuZWQgc3RhdHVzICR7cmVzLnN0YXR1c31gO1xuICAgIH1cbiAgfVxuXG4gIHB1YmxpYyBhc3luYyBjb25maWd1cmUoYXJnczogYW55KTogUHJvbWlzZTx2b2lkPiB7XG4gICAgY29uc3Qgc3Bhd25BcmdzID0gW1xuICAgICAgXCItR1wiLCBhcmdzLmdlbmVyYXRvcixcbiAgICAgIC4uLm1ha2VDbWRWYXJpYWJsZXMoYXJncy5jYWNoZVZhcmlhYmxlcywgdHJ1ZSksXG4gICAgICBcIi1TXCIsIGFyZ3Muc291cmNlRGlyLFxuICAgICAgXCItQlwiLCBhcmdzLmJpbmFyeURpcixcbiAgICBdO1xuICBcbiAgICBjb25zdCByZXM6IGFueSA9IGF3YWl0IHNwYXduQXN5bmModGhpcy5fY21ha2VQYXRoLCBzcGF3bkFyZ3MsIHtcbiAgICAgIGN3ZDogYXJncy5iaW5hcnlEaXIsXG4gICAgICBlbnY6IGFyZ3MuZW52aXJvbm1lbnQgfHwgcHJvY2Vzcy5lbnYsXG4gICAgICBleHRyYToge1xuICAgICAgICBvdXRwdXQ6IGBjbWFrZS5jb25maWd1cmUubG9nYCxcbiAgICAgIH0sXG4gICAgfSk7XG4gICAgaWYgKHJlcy5zdGF0dXMgIT09IDApIHtcbiAgICAgIHRocm93IGBDTWFrZS5jb25maWd1cmUgcmV0dXJuZWQgc3RhdHVzICR7cmVzLnN0YXR1c31gO1xuICAgIH1cbiAgfVxuXG4gIHB1YmxpYyBhc3luYyBidWlsZChhcmdzOiBhbnkpOiBQcm9taXNlPHZvaWQ+IHtcbiAgICBhd2FpdCB0aGlzLmNvbmZpZ3VyZShhcmdzKTtcbiAgXG4gICAgY29uc3Qgc3Bhd25BcmdzOiBzdHJpbmdbXSA9IFtcbiAgICAgICctLWJ1aWxkJywgJy4nLFxuICAgICAgJy0tcGFyYWxsZWwnLCBvcy5hdmFpbGFibGVQYXJhbGxlbGlzbSgpLnRvU3RyaW5nKCksXG4gICAgXTtcbiAgICBjb25zdCByZXM6IGFueSA9IGF3YWl0IHNwYXduQXN5bmModGhpcy5fY21ha2VQYXRoLCBzcGF3bkFyZ3MsIHtcbiAgICAgIGN3ZDogYXJncy5iaW5hcnlEaXIsXG4gICAgICBlbnY6IGFyZ3MuZW52aXJvbm1lbnQgfHwgcHJvY2Vzcy5lbnYsXG4gICAgICBleHRyYToge1xuICAgICAgICBvdXRwdXQ6IGBjbWFrZS5idWlsZC5sb2dgLFxuICAgICAgfSxcbiAgICB9KTtcbiAgICBpZiAocmVzLnN0YXR1cyAhPT0gMCkge1xuICAgICAgdGhyb3cgYENNYWtlLmJ1aWxkIHJldHVybmVkIHN0YXR1cyAke3Jlcy5zdGF0dXN9YDtcbiAgICB9XG4gIH1cblxuICBwdWJsaWMgYXN5bmMgaW5zdGFsbChhcmdzOiBhbnkpOiBQcm9taXNlPHZvaWQ+IHtcbiAgICBhd2FpdCB0aGlzLmNvbmZpZ3VyZShhcmdzKTtcblxuICAgIGNvbnN0IHNwYXduQXJncyA9IFtcbiAgICAgICctLWluc3RhbGwnLFxuICAgICAgJy4nLFxuICAgIF07XG4gICAgaWYgKGFyZ3MuaW5zdGFsbERpcikge1xuICAgICAgc3Bhd25BcmdzLnB1c2goJy0tcHJlZml4JywgYXJncy5pbnN0YWxsRGlyKTtcbiAgICB9XG4gICAgY29uc3QgcmVzOiBhbnkgPSBhd2FpdCBzcGF3bkFzeW5jKHRoaXMuX2NtYWtlUGF0aCwgc3Bhd25BcmdzLCB7XG4gICAgICBjd2Q6IGFyZ3MuYmluYXJ5RGlyLFxuICAgICAgZW52OiBhcmdzLmVudmlyb25tZW50IHx8IHByb2Nlc3MuZW52LFxuICAgICAgZXh0cmE6IHtcbiAgICAgICAgb3V0cHV0OiBgY21ha2UuaW5zdGFsbC5sb2dgLFxuICAgICAgfSxcbiAgICB9KTtcbiAgICBpZiAocmVzLnN0YXR1cyAhPT0gMCkge1xuICAgICAgdGhyb3cgYENNYWtlLmluc3RhbGwgcmV0dXJuZWQgc3RhdHVzICR7cmVzLnN0YXR1c31gO1xuICAgIH1cbiAgfVxuICBcbiAgcHVibGljIGFzeW5jIGV4dHJhY3QoYXJnczogYW55KTogUHJvbWlzZTx2b2lkPiB7XG4gICAgY29uc3Qgc3Bhd25BcmdzID0gWyBcIi1FXCIsIFwidGFyXCIsIFwiLXh2ZlwiLCBhcmdzLmZpbGVuYW1lIF07XG4gICAgY29uc3QgcmVzOiBhbnkgPSBhd2FpdCBzcGF3bkFzeW5jKHRoaXMuX2NtYWtlUGF0aCwgc3Bhd25BcmdzLCB7XG4gICAgICBjd2Q6IGFyZ3Mud29ya0RpciB8fCBhcmdzLnNvdXJjZURpciB8fCBhcmdzLmJpbmFyeURpcixcbiAgICAgIGVudjogYXJncy5lbnZpcm9ubWVudCB8fCBwcm9jZXNzLmVudixcbiAgICAgIGV4dHJhOiB7XG4gICAgICAgIG91dHB1dDogYXJncy5sb2dGaWxlIHx8IGBjbWFrZS5leHRyYWN0LmxvZ2AsXG4gICAgICB9LFxuICAgIH0pO1xuICAgIGlmIChyZXMuc3RhdHVzICE9PSAwKSB7XG4gICAgICB0aHJvdyBgRXh0cmFjdCByZXR1cm5lZCBzdGF0dXMgJHtyZXMuc3RhdHVzfWA7XG4gICAgfVxuICB9XG59O1xuXG5sZXQgX2NtYWtlSW5zdGFuY2U6IENNYWtlUHJvY2VzcztcbmV4cG9ydCBuYW1lc3BhY2UgQ01ha2VQcm9jZXNzIHtcbiAgZXhwb3J0IGZ1bmN0aW9uIGdldEluc3RhbmNlKCk6IENNYWtlUHJvY2VzcyB7XG4gICAgaWYgKCFfY21ha2VJbnN0YW5jZSlcbiAgICAgIF9jbWFrZUluc3RhbmNlID0gbmV3IENNYWtlUHJvY2VzcyhcImNtYWtlXCIgKyBIb3N0LmV4ZWN1dGFibGVTdWZmaXgpO1xuICAgIHJldHVybiBfY21ha2VJbnN0YW5jZTtcbiAgfVxufVxuXG5leHBvcnQgY2xhc3MgQ1Rlc3RQcm9jZXNzIHtcbiAgcHJpdmF0ZSBfY3Rlc3RQYXRoOiBzdHJpbmc7XG5cbiAgcHVibGljIGNvbnN0cnVjdG9yKGN0ZXN0UGF0aDogc3RyaW5nKSB7XG4gICAgdGhpcy5fY3Rlc3RQYXRoID0gY3Rlc3RQYXRoO1xuICB9XG5cbiAgcHVibGljIGFzeW5jIGN0ZXN0KGFyZ3M6IGFueSk6IFByb21pc2U8dm9pZD4ge1xuICAgIGNvbnN0IHNwYXduQXJnczogc3RyaW5nW10gPSBbXTtcbiAgICBjb25zdCByZXM6IGFueSA9IGF3YWl0IHNwYXduQXN5bmModGhpcy5fY3Rlc3RQYXRoLCBzcGF3bkFyZ3MsIHtcbiAgICAgIGN3ZDogYXJncy5iaW5hcnlEaXIsXG4gICAgICBlbnY6IGFyZ3MuZW52aXJvbm1lbnQgfHwgcHJvY2Vzcy5lbnYsXG4gICAgICBleHRyYToge1xuICAgICAgICBvdXRwdXQ6IGBjbWFrZS5jdGVzdC5sb2dgLFxuICAgICAgfSxcbiAgICB9KTtcbiAgICBpZiAocmVzLnN0YXR1cyAhPT0gMCkge1xuICAgICAgdGhyb3cgYENUZXN0IHJldHVybmVkIHN0YXR1cyAke3Jlcy5zdGF0dXN9YDtcbiAgICB9XG4gIH1cbn07XG5cbmxldCBfY3Rlc3RJbnN0YW5jZTogQ1Rlc3RQcm9jZXNzO1xuZXhwb3J0IG5hbWVzcGFjZSBDVGVzdFByb2Nlc3Mge1xuICBleHBvcnQgZnVuY3Rpb24gZ2V0SW5zdGFuY2UoKTogQ1Rlc3RQcm9jZXNzIHtcbiAgICBpZiAoIV9jdGVzdEluc3RhbmNlKVxuICAgICAgX2N0ZXN0SW5zdGFuY2UgPSBuZXcgQ1Rlc3RQcm9jZXNzKFwiY3Rlc3RcIiArIEhvc3QuZXhlY3V0YWJsZVN1ZmZpeCk7XG4gICAgcmV0dXJuIF9jdGVzdEluc3RhbmNlO1xuICB9XG59XG5cbmV4cG9ydCBhc3luYyBmdW5jdGlvbiBnZXRQcm9qZWN0SW5mbyhzb3VyY2U6IHN0cmluZykge1xuICBjb25zdCBzdGF0ID0gYXdhaXQgZnMucHJvbWlzZXMuc3RhdChzb3VyY2UpO1xuICBpZiAoc3RhdC5pc0RpcmVjdG9yeSgpKVxuICAgIHNvdXJjZSA9IHBhdGgucmVzb2x2ZShzb3VyY2UsIENNQUtFX0xJU1RTX1RYVCk7XG4gIGNvbnN0IGNvbnRlbnQgPSBhd2FpdCBmcy5wcm9taXNlcy5yZWFkRmlsZShzb3VyY2UsIHsgZW5jb2Rpbmc6ICd1dGY4JyB9KTtcblxuICBjb25zdCBwcm9qZWN0UGF0dGVybiA9IC9wcm9qZWN0ICpcXCggKihbXiBdKykgKihbXildKilcXCkvO1xuICBjb25zdCB2ZXJzaW9uUGF0dGVybiA9IC9WRVJTSU9OICsoW14gXSspLztcblxuICBjb25zdCByZXN1bHQ6IGFueSA9IHt9O1xuICBsZXQgbWF0Y2ggPSBjb250ZW50Lm1hdGNoKHByb2plY3RQYXR0ZXJuKTtcbiAgaWYgKG1hdGNoKSB7XG4gICAgcmVzdWx0Lm5hbWUgPSBtYXRjaFsxXTtcbiAgICBjb25zdCBwcm9qZWN0Q29udGVudCA9IG1hdGNoWzJdO1xuICAgIG1hdGNoID0gcHJvamVjdENvbnRlbnQubWF0Y2godmVyc2lvblBhdHRlcm4pO1xuICAgIGlmIChtYXRjaClcbiAgICAgIHJlc3VsdC52ZXJzaW9uID0gbWF0Y2hbMV07XG4gIH1cblxuICByZXR1cm4gcmVzdWx0O1xufVxuXG5leHBvcnQgZnVuY3Rpb24gbGluZVRvU2luZ2xDb21tZW50KGxpbmU6IHN0cmluZykge1xuICByZXR1cm4gXCIjIFwiICsgbGluZTtcbn1cblxuZXhwb3J0IGZ1bmN0aW9uIGxpbmVUb011bHRpcGxlQ29tbWVudChsaW5lOiBzdHJpbmcpIHtcbiAgcmV0dXJuIGAjWz09PVsgJHtsaW5lfSBdPT09XWA7XG59XG5cbmV4cG9ydCBmdW5jdGlvbiBnZW5lcmF0ZWRTY3JpcHROYW1lQ29tbWVudChmaWxlbmFtZTogc3RyaW5nKSB7XG4gIHJldHVybiBsaW5lVG9TaW5nbENvbW1lbnQoXCJHZW5lcmF0ZWQgZnJvbSBcIiArIHBhdGguYmFzZW5hbWUoZmlsZW5hbWUpKTtcbn1cblxuZXhwb3J0IHsgREVGQVVMVF9HRU5FUkFUT1IgfTtcbiIsIi8qXG4gKiBNSVQgTGljZW5zZVxuICpcbiAqIENvcHlyaWdodCAoYykgMjAyNSAgWXVyaWkgWWFrdWJpbiAoeXVyaWkueWFrdWJpbkBnbWFpbC5jb20pXG4gKlxuICogUGVybWlzc2lvbiBpcyBncmFudGVkIHRvIHVzZSwgY29weSwgbW9kaWZ5LCBhbmQgZGlzdHJpYnV0ZSB0aGlzIHNvZnR3YXJlXG4gKiB1bmRlciB0aGUgTUlUIExpY2Vuc2UuIFNlZSBMSUNFTlNFIGZpbGUgZm9yIGRldGFpbHMuXG4gKi9cblxuaW1wb3J0IGZzIGZyb20gXCJub2RlOmZzXCI7XG5pbXBvcnQgdXJsIGZyb20gXCJub2RlOnVybFwiO1xuXG5pbXBvcnQgeyBDTWFrZVByb2Nlc3MgfSBmcm9tIFwiQC9jbWFrZVwiO1xuaW1wb3J0IHsgUGF0aCB9IGZyb20gXCJAL3V0aWxzL1BhdGhcIjtcbmltcG9ydCB7IG1ha2VQYXRjaCB9IGZyb20gXCJAL3V0aWxzL01ha2VQYXRjaFwiO1xuaW1wb3J0IHsgc2F2ZUlmRGlmZmVyZW50LCBkaXJlY3RvcnlFeGlzdHMgfSBmcm9tIFwiQC91dGlscy9GaWxlU3lzdGVtXCI7XG5pbXBvcnQgeyBTZXR0aW5nc1N0b3JhZ2UgfSBmcm9tIFwiQC91dGlscy9TZXR0aW5nc1N0b3JhZ2VcIjtcbmltcG9ydCB7IGFycmF5V3JhcHBlciwgYXNzaWduT2JqZWN0IH0gZnJvbSBcIkAvdXRpbHMvUHJpbWl0aXZlc1wiO1xuaW1wb3J0IHsgVVNFUl9DT05GSUcsIEJVSUxEX1NFVFRJTkdTX0ZJTEUsIFJFUVVFU1RfQVRURU1QVFMgfSBmcm9tIFwiQC9Db25zdGFudHNcIjtcbmltcG9ydCB7IERFQlVHX0JVSUxEX1RZUEUsIFJFTEVBU0VfQlVJTERfVFlQRSB9IGZyb20gXCJAL2NvcmUvVHlwZXNcIjtcbmltcG9ydCB7IElNUE9SVF9TQ0hFTUUgfSBmcm9tIFwiQC91dGlscy9VcmxTY2hlbWVcIjtcbmltcG9ydCB7IHJlcXVpcmVSZXNvbHZlIH0gZnJvbSBcIkAvdXRpbHMvTW9kdWxlXCI7XG5pbXBvcnQgeyBkb3dubG9hZEZpbGUgfSBmcm9tIFwiQC91dGlscy9IdHRwUmVxdWVzdFwiO1xuaW1wb3J0IHsgQ29tbWFuZE9wdGlvbnMgfSBmcm9tIFwiQC9jb3JlL0NvbW1hbmRPcHRpb25zXCI7XG5pbXBvcnQgeyBMb2dnZXIgfSBmcm9tIFwiQC9sb2dnZXJcIjtcbmltcG9ydCB7IGZpbGVFeGlzdHMgfSBmcm9tIFwiQC91dGlscy9GaWxlU3lzdGVtXCI7XG5pbXBvcnQgeyBpbXBvcnRNb2R1bGUgfSBmcm9tIFwiQC91dGlscy9Nb2R1bGVcIjtcblxuaW1wb3J0IGFjdGlvbnMgZnJvbSBcIkAvYWN0aW9uc1wiO1xuXG5jb25zdCBsb2dnZXIgPSBMb2dnZXIuY3JlYXRlKGltcG9ydC5tZXRhLnVybCk7XG5cbmludGVyZmFjZSBJR2VuZXJhbENvbmZpZyB7XG4gIHdvcmtEaXI6IHN0cmluZztcbiAgYnVpbGRUeXBlOiBzdHJpbmc7XG59O1xuXG5mdW5jdGlvbiBtZXJnZUVudmlyb25tZW50KC4uLmFyZ3M6IGFueSkge1xuICBjb25zdCBlbnZpcm9ubWVudDogYW55ID0ge307XG4gIGZvciAoY29uc3QgZW52IG9mIGFyZ3MpIHtcbiAgICBjb25zdCBsaXN0OiBhbnkgPSBPYmplY3QuZW50cmllcyhlbnYgfHwge30pO1xuICAgIHdoaWxlIChsaXN0Lmxlbmd0aCkge1xuICAgICAgbGV0IFtrZXksdmFsXSA9IGxpc3QucG9wKCk7XG4gICAgICBsZXQgZGVsaW1pdGVyO1xuICAgICAgbGV0IGpvaW5BZnRlciA9IHRydWU7XG4gICAgICBzd2l0Y2ggKGtleSkge1xuICAgICAgY2FzZSBcIlBhdGhcIjpcbiAgICAgIGNhc2UgXCJQQVRIXCI6XG4gICAgICAgIGRlbGltaXRlciA9IFBhdGguZGVsaW1pdGVyO1xuICAgICAgICBqb2luQWZ0ZXIgPSBmYWxzZTtcbiAgICAgICAgYnJlYWs7XG4gICAgICBjYXNlIFwiQ0ZMQUdTXCI6XG4gICAgICBjYXNlIFwiQ1hYRkxBR1NcIjpcbiAgICAgIGNhc2UgXCJMREZMQUdTXCI6XG4gICAgICAgIGRlbGltaXRlciA9IFwiIFwiO1xuICAgICAgICBicmVhaztcbiAgICAgIH1cbiAgICAgIGlmICh0eXBlb2YgdmFsID09PSAnbnVtYmVyJylcbiAgICAgICAgdmFsID0gdmFsLnRvU3RyaW5nKCk7XG4gICAgICBlbHNlIGlmIChBcnJheS5pc0FycmF5KHZhbCkpXG4gICAgICAgIHZhbCA9IHZhbC5qb2luKGRlbGltaXRlcik7XG4gICAgICBpZiAoIWRlbGltaXRlciB8fCAhZW52aXJvbm1lbnRba2V5XSlcbiAgICAgICAgZW52aXJvbm1lbnRba2V5XSA9IHZhbDtcbiAgICAgIGVsc2UgaWYgKGpvaW5BZnRlcilcbiAgICAgICAgZW52aXJvbm1lbnRba2V5XSA9IHZhbCArIGRlbGltaXRlciArIGVudmlyb25tZW50W2tleV07XG4gICAgICBlbHNlXG4gICAgICAgIGVudmlyb25tZW50W2tleV0gPSBlbnZpcm9ubWVudFtrZXldICsgZGVsaW1pdGVyICsgdmFsO1xuICAgIH1cbiAgfVxuICByZXR1cm4gZW52aXJvbm1lbnQ7XG59XG5cbmZ1bmN0aW9uIHJlYmFzZUNvbmZpZyhjb25maWc6IGFueSkge1xuICBjb25zdCBiYXNlQ29uZmlnOiBhbnkgPSB7fTtcbiAgY29uc3Qgb3RoZXJDb25maWc6IGFueSA9IHt9O1xuXG4gIGZvciAoY29uc3QgW2tleSwgZW50cnldIG9mIE9iamVjdC5lbnRyaWVzKGNvbmZpZykgYXMgYW55KSB7XG4gICAgKGVudHJ5LmJhc2UgPyBvdGhlckNvbmZpZyA6IGJhc2VDb25maWcpW2tleV0gPSBlbnRyeTtcbiAgfVxuXG4gIHdoaWxlICh0cnVlKSB7XG4gICAgY29uc3Qga2V5cyA9IE9iamVjdC5rZXlzKG90aGVyQ29uZmlnKTtcbiAgICBpZiAoa2V5cy5sZW5ndGggPT0gMClcbiAgICAgIGJyZWFrO1xuICAgIGNvbnN0IGRvbmVLZXlzID0gW107XG4gICAgZm9yIChjb25zdCBrZXkgb2Yga2V5cykge1xuICAgICAgY29uc3Qgb3RoZXJJdGVyID0gb3RoZXJDb25maWdba2V5XTtcbiAgICAgIGNvbnN0IGJhc2VMaXN0ID0gW107XG4gICAgICBmb3IgKGNvbnN0IGl0ZXIgb2YgYXJyYXlXcmFwcGVyKG90aGVySXRlci5iYXNlKSkge1xuICAgICAgICBjb25zdCBiYXNlRW50cnkgPSBiYXNlQ29uZmlnW2l0ZXJdO1xuICAgICAgICBpZiAoIWJhc2VFbnRyeSkge1xuICAgICAgICAgIGJhc2VMaXN0Lmxlbmd0aCA9IDA7XG4gICAgICAgICAgYnJlYWs7XG4gICAgICAgIH1cbiAgICAgICAgYmFzZUxpc3QucHVzaChiYXNlRW50cnkpO1xuICAgICAgfVxuICAgICAgaWYgKGJhc2VMaXN0Lmxlbmd0aCkge1xuICAgICAgICBiYXNlTGlzdC5wdXNoKG90aGVySXRlcik7XG4gICAgICAgIGxldCBuZXdFbnRyeSA9IHt9O1xuICAgICAgICBmb3IgKGNvbnN0IGl0ZXIgb2YgYmFzZUxpc3QpIHtcbiAgICAgICAgICBhc3NpZ25PYmplY3QobmV3RW50cnksIGl0ZXIpO1xuICAgICAgICB9XG4gICAgICAgIGJhc2VDb25maWdba2V5XSA9IG5ld0VudHJ5O1xuICAgICAgICBkb25lS2V5cy5wdXNoKGtleSk7XG4gICAgICB9XG4gICAgfVxuICAgIGlmIChkb25lS2V5cy5sZW5ndGggPT0gMCkge1xuICAgICAgZm9yIChjb25zdCBrZXkgb2Yga2V5cylcbiAgICAgICAgdGhyb3cgYENhbid0IHNldCBiYXNlIGNvbmZpZyBmb3IgXCIke2tleX1gO1xuICAgIH1cbiAgICBmb3IgKGNvbnN0IGtleSBvZiBkb25lS2V5cykge1xuICAgICAgZGVsZXRlIGJhc2VDb25maWdba2V5XS5iYXNlO1xuICAgICAgZGVsZXRlIG90aGVyQ29uZmlnW2tleV07XG4gICAgfVxuICB9XG5cbiAgcmV0dXJuIGJhc2VDb25maWc7XG59XG5cbmZ1bmN0aW9uIHJlc29sdmVTdHJpbmdXaXRoVmFyaWFibGUoY29uZmlnOiBhbnksIGVudHJ5Q29uZmlnOiBhbnksIHJvb3RDb25maWc6IGFueSwgdmFsOiBhbnkpIHtcbiAgcmV0dXJuIHZhbC5yZXBsYWNlKC9cXCRcXHsoW159XSspXFx9L2csIChtYXRjaDogYW55LCB2YWx1ZTogYW55KSA9PiB7XG4gICAgbGV0IHNlbDtcbiAgICBmb3IgKGNvbnN0IG5hbWUgb2YgdmFsdWUuc3BsaXQoXCIuXCIpKSB7XG4gICAgICBpZiAoc2VsID09PSB1bmRlZmluZWQpIHtcbiAgICAgICAgaWYgKGNvbmZpZy5oYXNPd25Qcm9wZXJ0eShuYW1lKSlcbiAgICAgICAgICBzZWwgPSBjb25maWdbbmFtZV07XG4gICAgICAgIGVsc2UgaWYgKGNvbmZpZyAhPT0gZW50cnlDb25maWcgJiYgZW50cnlDb25maWcuaGFzT3duUHJvcGVydHkobmFtZSkpXG4gICAgICAgICAgc2VsID0gZW50cnlDb25maWdbbmFtZV07XG4gICAgICAgIGVsc2UgaWYgKGNvbmZpZyAhPT0gcm9vdENvbmZpZyAmJiByb290Q29uZmlnLmhhc093blByb3BlcnR5KG5hbWUpKVxuICAgICAgICAgIHNlbCA9IHJvb3RDb25maWdbbmFtZV07XG4gICAgICAgIGVsc2Uge1xuICAgICAgICAgIHRyeSB7XG4gICAgICAgICAgICBjb25zdCBtYWluRmlsZSA9IHJlcXVpcmVSZXNvbHZlKG5hbWUpO1xuICAgICAgICAgICAgaWYgKG1haW5GaWxlKSB7XG4gICAgICAgICAgICAgIHNlbCA9IHsgbWFpbkZpbGUsIG1haW5EaXI6IFBhdGguZGlybmFtZShtYWluRmlsZSksIH07XG4gICAgICAgICAgICB9XG4gICAgICAgICB9IGNhdGNoKGUpIHt9XG4gICAgICAgIH1cbiAgICAgICAgaWYgKHNlbCA9PT0gdW5kZWZpbmVkKVxuICAgICAgICAgIGJyZWFrO1xuICAgICAgfVxuICAgICAgZWxzZSBpZiAoc2VsLmhhc093blByb3BlcnR5KG5hbWUpKSB7XG4gICAgICAgIHNlbCA9IHNlbFtuYW1lXTtcbiAgICAgIH1cbiAgICAgIGVsc2Uge1xuICAgICAgICBzZWwgPSB1bmRlZmluZWQ7XG4gICAgICAgIGJyZWFrO1xuICAgICAgfVxuICAgIH1cbiAgICBpZiAoc2VsID09PSB1bmRlZmluZWQpXG4gICAgICB0aHJvdyBuZXcgRXJyb3IoYFRoZSAke3ZhbHVlfSB2YXJpYWJsZSBkb2VzIG5vdCBleGlzdFwiYCk7XG4gICAgcmV0dXJuIHNlbDtcbiAgfSk7XG59XG5cbmZ1bmN0aW9uIHJlc29sdmVDb25maWdTdHJpbmdzSW1wbChjb25maWc6IGFueSwgZW50cnlDb25maWc6IGFueSwgcm9vdENvbmZpZzogYW55KSB7XG4gIGxldCBjb3VudCA9IDA7XG4gIGZvciAoY29uc3QgW2tleSwgdmFsXSBvZiBPYmplY3QuZW50cmllcyhjb25maWcpKSB7XG4gICAgaWYgKHZhbCAmJiB0eXBlb2YgdmFsID09PSBcIm9iamVjdFwiKVxuICAgICAgY291bnQgKz0gcmVzb2x2ZUNvbmZpZ1N0cmluZ3NJbXBsKHZhbCwgZW50cnlDb25maWcsIHJvb3RDb25maWcpO1xuICAgIGVsc2UgaWYgKHR5cGVvZiB2YWwgPT09IFwic3RyaW5nXCIpIHtcbiAgICAgIGNvbnN0IHYgPSByZXNvbHZlU3RyaW5nV2l0aFZhcmlhYmxlKGNvbmZpZywgZW50cnlDb25maWcsIHJvb3RDb25maWcsIHZhbCk7XG4gICAgICBpZiAodmFsICE9PSB2KSB7XG4gICAgICAgIGNvbmZpZ1trZXldID0gdjtcbiAgICAgICAgY291bnQrKztcbiAgICAgIH1cbiAgICB9XG4gIH1cbiAgcmV0dXJuIGNvdW50O1xufVxuXG5mdW5jdGlvbiByZXNvbHZlQ29uZmlnU3RyaW5ncyhjb25maWc6IGFueSkge1xuICBmb3IgKDs7KSB7XG4gICAgbGV0IGNvdW50ID0gMDtcbiAgICBmb3IgKGNvbnN0IFtrZXksIHZhbF0gb2YgT2JqZWN0LmVudHJpZXMoY29uZmlnKSkge1xuICAgICAgaWYgKHZhbCAmJiB0eXBlb2YgdmFsID09PSBcIm9iamVjdFwiKVxuICAgICAgICBjb3VudCArPSByZXNvbHZlQ29uZmlnU3RyaW5nc0ltcGwodmFsLCB2YWwsIGNvbmZpZyk7XG4gICAgICBlbHNlICBpZiAodHlwZW9mIHZhbCA9PT0gXCJzdHJpbmdcIikge1xuICAgICAgICBjb25zdCB2ID0gcmVzb2x2ZVN0cmluZ1dpdGhWYXJpYWJsZShjb25maWcsIGNvbmZpZywgY29uZmlnLCB2YWwpO1xuICAgICAgICBpZiAodmFsICE9PSB2KSB7XG4gICAgICAgICAgY29uZmlnW2tleV0gPSB2O1xuICAgICAgICAgIGNvdW50Kys7XG4gICAgICAgIH1cbiAgICAgIH1cbiAgICB9XG4gICAgaWYgKCFjb3VudClcbiAgICAgIGJyZWFrO1xuICB9XG59XG5cbmZ1bmN0aW9uIG1ha2VCdWlsZENvbmZpZyhnY29uZmlnOiBJR2VuZXJhbENvbmZpZywgY29uZmlnOiBhbnkpIHtcbiAgaWYgKGNvbmZpZ1tcInNvdXJjZVJvb3RcIl0pIHtcbiAgICB0aHJvdyBuZXcgRXJyb3IoYFZhcmlhYmxlIFwic291cmNlUm9vdFwiIGNhbm5vdCBiZSBjaGFuZ2VkIHRvIFwiJHtjb25maWcuc291cmNlUm9vdH1cImApO1xuICB9XG5cbiAgY29uc3Qgcm9vdENvbmZpZyA9IHJlYmFzZUNvbmZpZyhjb25maWcpO1xuXG4gIHJvb3RDb25maWcuYnVpbGRUeXBlID0gcm9vdENvbmZpZy5idWlsZFR5cGUgfHwgZ2NvbmZpZy5idWlsZFR5cGU7XG4gIHJvb3RDb25maWcuc291cmNlUm9vdCA9IHJvb3RDb25maWcuc291cmNlUm9vdCB8fCBnY29uZmlnLndvcmtEaXI7XG4gIHJvb3RDb25maWcuYmluYXJ5Um9vdCA9IHJvb3RDb25maWcuYmluYXJ5Um9vdCB8fCBQYXRoLmpvaW4oZ2NvbmZpZy53b3JrRGlyLCBcImJ1aWxkXCIpO1xuXG4gIGZvciAoY29uc3QgW2tleSwgZW50cnldIG9mIE9iamVjdC5lbnRyaWVzKHJvb3RDb25maWcpIGFzIGFueSkge1xuICAgIGlmIChlbnRyeSAmJiB0eXBlb2YgZW50cnkgPT09IFwib2JqZWN0XCIgJiYgZW50cnkuYWN0aW9uKSB7XG4gICAgICBlbnRyeS5idWlsZFR5cGUgPSBlbnRyeS5idWlsZFR5cGUgfHwgcm9vdENvbmZpZy5idWlsZFR5cGU7XG4gICAgICBjb25zdCBmb2xkZXIgPSBrZXkucmVwbGFjZShcIjpcIiwgUGF0aC5zZXApO1xuICAgICAgY29uc3Qgd29ya0RpciA9IFBhdGguam9pbihyb290Q29uZmlnLmJpbmFyeVJvb3QsIGZvbGRlcik7XG4gICAgICBlbnRyeS50ZW1wRGlyID0gZW50cnkudGVtcERpciB8fCBQYXRoLmpvaW4od29ya0RpciwgXCJ0bXBcIik7XG4gICAgICBpZiAoZW50cnkuc291cmNlVXJsKSB7XG4gICAgICAgIGlmIChlbnRyeS5zb3VyY2VVcmwuc3RhcnRzV2l0aChJTVBPUlRfU0NIRU1FKSkge1xuICAgICAgICAgIGNvbnN0IGZpbGVuYW1lID0gcmVxdWlyZVJlc29sdmUoZW50cnkuc291cmNlVXJsLnNsaWNlKElNUE9SVF9TQ0hFTUUubGVuZ3RoKSk7XG4gICAgICAgICAgZW50cnkuc291cmNlRGlyID0gUGF0aC5kaXJuYW1lKGZpbGVuYW1lKTtcbiAgICAgICAgfVxuICAgICAgICBlbHNlIHtcbiAgICAgICAgICBlbnRyeS5hcmNoaXZlRGlyID0gZW50cnkuYXJjaGl2ZURpciB8fCBQYXRoLmpvaW4od29ya0RpciwgXCJhcmNcIik7XG4gICAgICAgICAgZW50cnkuZXh0cmFjdERpciA9IGVudHJ5LmV4dHJhY3REaXIgfHwgUGF0aC5qb2luKHdvcmtEaXIsIFwic3JjXCIpO1xuICAgICAgICAgIGlmICghZW50cnkuc291cmNlRGlyKVxuICAgICAgICAgICAgZW50cnkuc291cmNlRGlyID0gZW50cnkuZXh0cmFjdERpcjtcbiAgICAgICAgICBlbHNlIGlmICghUGF0aC5pc0Fic29sdXRlKGVudHJ5LnNvdXJjZURpcikpXG4gICAgICAgICAgICBlbnRyeS5zb3VyY2VEaXIgPSBQYXRoLmpvaW4oZW50cnkuZXh0cmFjdERpciwgZW50cnkuc291cmNlRGlyKTtcbiAgICAgICAgfVxuICAgICAgfVxuICAgICAgZWxzZSBpZiAoIWVudHJ5LnNvdXJjZURpcikge1xuICAgICAgICB0aHJvdyBuZXcgRXJyb3IoYE1pc3Npbmcgc291cmNlRGlyIGZvciAke2tleX0gYWN0aW9uXCJgKTtcbiAgICAgIH1cbiAgICAgIGlmIChlbnRyeS5iaW5hcnlEaXIgPT09IG51bGwpXG4gICAgICAgIGVudHJ5LmJpbmFyeURpciA9IGVudHJ5LnNvdXJjZURpcjtcbiAgICAgIGVsc2UgaWYgKGVudHJ5LmJpbmFyeURpciA9PT0gdW5kZWZpbmVkKVxuICAgICAgICBlbnRyeS5iaW5hcnlEaXIgPSBQYXRoLmpvaW4od29ya0RpciwgXCJiaW5cIik7XG4gICAgfVxuICB9XG5cbiAgcmVzb2x2ZUNvbmZpZ1N0cmluZ3Mocm9vdENvbmZpZyk7XG5cbiAgcmV0dXJuIHJvb3RDb25maWc7XG59XG5cbmFzeW5jIGZ1bmN0aW9uIGRvRXh0cmFjdEFyY2hpdmUoZ2NvbmZpZzogSUdlbmVyYWxDb25maWcsIGVudmlyb25tZW50OiBhbnksIGNvbmZpZzogYW55LCBzZXR0aW5nczogYW55KSB7XG4gIGlmICghY29uZmlnLnNvdXJjZVVybClcbiAgICB0aHJvdyBuZXcgRXJyb3IoXCJVbmtub3duIHNvdXJjZVVybFwiKTtcbiAgaWYgKCFjb25maWcuYXJjaGl2ZURpcilcbiAgICB0aHJvdyBuZXcgRXJyb3IoXCJVbmtub3duIGFyY2hpdmVEaXJcIik7XG4gIGlmICghY29uZmlnLmV4dHJhY3REaXIpXG4gICAgdGhyb3cgbmV3IEVycm9yKFwiVW5rbm93biBleHRyYWN0RGlyXCIpO1xuXG4gIGlmICghYXdhaXQgZGlyZWN0b3J5RXhpc3RzKGNvbmZpZy5hcmNoaXZlRGlyKSkge1xuICAgIGxvZ2dlci5ub3RpY2UoYG1rZGlyIC1wICR7Y29uZmlnLmFyY2hpdmVEaXJ9YCk7XG4gICAgYXdhaXQgZnMucHJvbWlzZXMubWtkaXIoY29uZmlnLmFyY2hpdmVEaXIsIHsgcmVjdXJzaXZlOiB0cnVlIH0pO1xuICB9XG5cbiAgaWYgKCFhd2FpdCBkaXJlY3RvcnlFeGlzdHMoY29uZmlnLnRlbXBEaXIpKSB7XG4gICAgbG9nZ2VyLm5vdGljZShgbWtkaXIgLXAgJHtjb25maWcudGVtcERpcn1gKTtcbiAgICBhd2FpdCBmcy5wcm9taXNlcy5ta2Rpcihjb25maWcudGVtcERpciwgeyByZWN1cnNpdmU6IHRydWUgfSk7XG4gIH1cblxuICBjb25zdCBhcmNOYW1lID0gUGF0aC5iYXNlbmFtZShjb25maWcuc291cmNlVXJsKTtcblxuICBsZXQgYXJjRmlsZTtcbiAgbGV0IGRvd25sb2FkVXJscyA9IGF3YWl0IHNldHRpbmdzLmdldChcImRvd25sb2FkVXJsc1wiKSB8fCB7fTtcbiAgaWYgKGRvd25sb2FkVXJsc1tjb25maWcuc291cmNlVXJsXSlcbiAgICBhcmNGaWxlID0gZG93bmxvYWRVcmxzW2NvbmZpZy5zb3VyY2VVcmxdO1xuICBlbHNlIHtcbiAgICBhcmNGaWxlID0gUGF0aC5qb2luKGNvbmZpZy5hcmNoaXZlRGlyLCBhcmNOYW1lKTtcbiAgICBhd2FpdCBkb3dubG9hZEZpbGUoY29uZmlnLnNvdXJjZVVybCwgYXJjRmlsZSwgeyBhdHRlbXB0czogUkVRVUVTVF9BVFRFTVBUUyB9KTtcbiAgICBkb3dubG9hZFVybHNbY29uZmlnLnNvdXJjZVVybF0gPSBhcmNGaWxlO1xuICAgIGF3YWl0IHNldHRpbmdzLnNldChcImRvd25sb2FkVXJsc1wiLCBkb3dubG9hZFVybHMpO1xuICB9XG5cbiAgbGV0IGV4dHJhY3REaXI7XG4gIGxldCBleHRyYWN0RmlsZXMgPSBhd2FpdCBzZXR0aW5ncy5nZXQoXCJleHRyYWN0RmlsZXNcIikgfHwge307XG4gIGlmIChleHRyYWN0RmlsZXNbYXJjRmlsZV0pIHtcbiAgICBleHRyYWN0RGlyID0gZXh0cmFjdEZpbGVzW2FyY0ZpbGVdO1xuICB9XG4gIGVsc2Uge1xuICAgIGV4dHJhY3REaXIgPSBhd2FpdCBmcy5wcm9taXNlcy5ta2R0ZW1wKFBhdGgucmVzb2x2ZShjb25maWcudGVtcERpciwgYXJjTmFtZSArICcuJykpO1xuICBcbiAgICBhd2FpdCBDTWFrZVByb2Nlc3MuZ2V0SW5zdGFuY2UoKS5leHRyYWN0KHtcbiAgICAgIGVudmlyb25tZW50LFxuICAgICAgZmlsZW5hbWU6IGFyY0ZpbGUsXG4gICAgICB3b3JrRGlyOiBleHRyYWN0RGlyLFxuICAgICAgbG9nRmlsZTogIFBhdGguam9pbihjb25maWcudGVtcERpciwgUGF0aC5iYXNlbmFtZShleHRyYWN0RGlyKSArIFwiLmxvZ1wiKSxcbiAgICB9KTtcbiAgXG4gICAgY29uc3QgZXh0cmFjdExpc3QgPSBhd2FpdCBmcy5wcm9taXNlcy5yZWFkZGlyKGV4dHJhY3REaXIpO1xuICAgIGlmIChleHRyYWN0TGlzdC5sZW5ndGggPT09IDEpIHtcbiAgICAgIGV4dHJhY3REaXIgPSBQYXRoLnJlc29sdmUoZXh0cmFjdERpciwgZXh0cmFjdExpc3RbMF0pO1xuICAgICAgaWYgKCFhd2FpdCBkaXJlY3RvcnlFeGlzdHMoZXh0cmFjdERpcikpIHtcbiAgICAgICAgbG9nZ2VyLm5vdGljZShgcm0gLWZyICR7ZXh0cmFjdERpcn1gKTtcbiAgICAgICAgYXdhaXQgZnMucHJvbWlzZXMucm0oZXh0cmFjdERpciwgeyByZWN1cnNpdmU6IHRydWUgfSk7XG4gICAgICAgIHRocm93IG5ldyBFcnJvcihgU3VwcG9ydCBvbmx5IGRpcmVjdG9yeSBmb3IgYXJjaGl2ZWApO1xuICAgICAgfVxuICAgIH1cbiAgXG4gICAgaWYgKGF3YWl0IGRpcmVjdG9yeUV4aXN0cyhjb25maWcuZXh0cmFjdERpcikpIHtcbiAgICAgIC8vIFRPRE86IE1hcmdlIGV4dHJhY3REaXIgd2l0aCBvdXRwdXRcbiAgICAgIGxvZ2dlci5ub3RpY2UoYHJtIC1mciAke2NvbmZpZy5leHRyYWN0RGlyfWApO1xuICAgICAgYXdhaXQgZnMucHJvbWlzZXMucm0oY29uZmlnLmV4dHJhY3REaXIsIHsgcmVjdXJzaXZlOiB0cnVlIH0pO1xuICAgIH1cbiAgICBlbHNlIHtcbiAgICAgIGNvbnN0IHBhcmVudERpciA9IFBhdGguZGlybmFtZShjb25maWcuZXh0cmFjdERpcik7XG4gICAgICBpZiAoIWF3YWl0IGRpcmVjdG9yeUV4aXN0cyhwYXJlbnREaXIpKSB7XG4gICAgICAgIGxvZ2dlci5ub3RpY2UoYG1rZGlyIC1wICR7cGFyZW50RGlyfWApO1xuICAgICAgICBhd2FpdCBmcy5wcm9taXNlcy5ta2RpcihwYXJlbnREaXIsIHsgcmVjdXJzaXZlOiB0cnVlIH0pOyBcbiAgICAgIH1cbiAgICB9XG4gIFxuICAgIGxvZ2dlci5ub3RpY2UoYG12ICR7ZXh0cmFjdERpcn0gJHtjb25maWcuZXh0cmFjdERpcn1gKTtcbiAgICBhd2FpdCBmcy5wcm9taXNlcy5yZW5hbWUoZXh0cmFjdERpciwgY29uZmlnLmV4dHJhY3REaXIpO1xuICBcbiAgICBleHRyYWN0RmlsZXNbYXJjRmlsZV0gPSBleHRyYWN0RGlyO1xuICAgIGF3YWl0IHNldHRpbmdzLnNldChcImV4dHJhY3RGaWxlc1wiLCBleHRyYWN0RmlsZXMpO1xuICB9XG5cbiAgaWYgKGNvbmZpZy5wYXRjaERpcikge1xuICAgIGxldCBwYXRjaERpcnMgPSBhd2FpdCBzZXR0aW5ncy5nZXQoXCJwYXRjaERpcnNcIikgfHwge307XG4gICAgaWYgKCFwYXRjaERpcnNbY29uZmlnLnBhdGNoRGlyXSkge1xuICAgICAgYXdhaXQgbWFrZVBhdGNoKGNvbmZpZy5wYXRjaERpciwgY29uZmlnLmV4dHJhY3REaXIpO1xuICAgICAgcGF0Y2hEaXJzW2NvbmZpZy5wYXRjaERpcl0gPSBjb25maWcuZXh0cmFjdERpcjtcbiAgICAgIGF3YWl0IHNldHRpbmdzLnNldChcInBhdGNoRGlyc1wiLCBwYXRjaERpcnMpO1xuICAgIH1cbiAgfVxufVxuXG5hc3luYyBmdW5jdGlvbiBkb1RhcmdldEJ1aWxkKGdjb25maWc6IElHZW5lcmFsQ29uZmlnLCBlbnZpcm9ubWVudDogYW55LCBjb25maWc6IGFueSwgc2V0dGluZ3M6IFNldHRpbmdzU3RvcmFnZSkge1xuICBpZiAoY29uZmlnLnByZUFjdGlvbikge1xuICAgIGF3YWl0IHNldHRpbmdzLnB1c2goXCJwcmVBY3Rpb25cIik7XG4gICAgY29uc3QgbmV3Q29uZmlnOiBhbnkgPSB7fTtcbiAgICBhc3NpZ25PYmplY3QobmV3Q29uZmlnLCBjb25maWcpO1xuICAgIGRlbGV0ZSBuZXdDb25maWcuYWN0aW9uO1xuICAgIGRlbGV0ZSBuZXdDb25maWcucHJlQWN0aW9uO1xuICAgIGRlbGV0ZSBuZXdDb25maWcucG9zdEFjdGlvbjtcbiAgICBhc3NpZ25PYmplY3QobmV3Q29uZmlnLCBjb25maWcucHJlQWN0aW9uKTtcbiAgICBjb25zdCBuZXdFbnZpcm9ubWVudCA9IG1lcmdlRW52aXJvbm1lbnQoY29uZmlnLnByZUFjdGlvbi5lbnZpcm9ubWVudCwgZW52aXJvbm1lbnQpO1xuICAgIGF3YWl0IGRvVGFyZ2V0QnVpbGQoZ2NvbmZpZywgbmV3RW52aXJvbm1lbnQsIG5ld0NvbmZpZywgc2V0dGluZ3MpO1xuICAgIGF3YWl0IHNldHRpbmdzLnBvcCgpO1xuICB9XG5cbiAgaWYgKEFycmF5LmlzQXJyYXkoY29uZmlnLmFjdGlvbikpIHtcbiAgICBhd2FpdCBzZXR0aW5ncy5wdXNoKFwiYWN0aW9uXCIpO1xuICAgIGZvciAodmFyIGkgPSAwOyBpIDwgY29uZmlnLmFjdGlvbi5sZW5ndGg7ICsraSkge1xuICAgICAgYXdhaXQgc2V0dGluZ3MucHVzaChpLnRvU3RyaW5nKCkpO1xuICAgICAgY29uc3QgbmV3Q29uZmlnOiBhbnkgPSB7fTtcbiAgICAgIGFzc2lnbk9iamVjdChuZXdDb25maWcsIGNvbmZpZyk7XG4gICAgICBkZWxldGUgbmV3Q29uZmlnLmFjdGlvbjtcbiAgICAgIGRlbGV0ZSBuZXdDb25maWcucHJlQWN0aW9uO1xuICAgICAgZGVsZXRlIG5ld0NvbmZpZy5wb3N0QWN0aW9uO1xuICAgICAgYXNzaWduT2JqZWN0KG5ld0NvbmZpZywgY29uZmlnLmFjdGlvbltpXSk7XG4gICAgICBjb25zdCBuZXdFbnZpcm9ubWVudCA9IG1lcmdlRW52aXJvbm1lbnQoY29uZmlnLmFjdGlvbltpXS5lbnZpcm9ubWVudCwgZW52aXJvbm1lbnQpO1xuICAgICAgYXdhaXQgZG9UYXJnZXRCdWlsZChnY29uZmlnLCBuZXdFbnZpcm9ubWVudCwgbmV3Q29uZmlnLCBzZXR0aW5ncyk7XG4gICAgICBhd2FpdCBzZXR0aW5ncy5wb3AoKTtcbiAgICB9XG4gICAgYXdhaXQgc2V0dGluZ3MucG9wKCk7XG4gIH1cbiAgZWxzZSB7XG4gICAgaWYgKCFhd2FpdCBkaXJlY3RvcnlFeGlzdHMoY29uZmlnLmJpbmFyeURpcikpIHtcbiAgICAgIGF3YWl0IGZzLnByb21pc2VzLm1rZGlyKGNvbmZpZy5iaW5hcnlEaXIsIHsgcmVjdXJzaXZlOiB0cnVlIH0pO1xuICAgIH1cbiAgICBpZiAoYWN0aW9uc1tjb25maWcuYWN0aW9uXSkge1xuICAgICAgY29uZmlnLmRlc2NyaXB0aW9uICYmIGxvZ2dlci5ub3RpY2UoY29uZmlnLmRlc2NyaXB0aW9uKTtcbiAgICAgIGF3YWl0IGFjdGlvbnNbY29uZmlnLmFjdGlvbl0oY29uZmlnLCBlbnZpcm9ubWVudCwgc2V0dGluZ3MpO1xuICAgIH1cbiAgfVxuXG4gIGlmIChjb25maWcucG9zdEFjdGlvbikge1xuICAgIGF3YWl0IHNldHRpbmdzLnB1c2goXCJwb3N0QWN0aW9uXCIpO1xuICAgIGNvbnN0IG5ld0NvbmZpZzogYW55ID0ge307XG4gICAgYXNzaWduT2JqZWN0KG5ld0NvbmZpZywgY29uZmlnKTtcbiAgICBkZWxldGUgbmV3Q29uZmlnLmFjdGlvbjtcbiAgICBkZWxldGUgbmV3Q29uZmlnLnByZUFjdGlvbjtcbiAgICBkZWxldGUgbmV3Q29uZmlnLnBvc3RBY3Rpb247XG4gICAgYXNzaWduT2JqZWN0KG5ld0NvbmZpZywgY29uZmlnLnBvc3RBY3Rpb24pO1xuICAgIGNvbnN0IG5ld0Vudmlyb25tZW50ID0gbWVyZ2VFbnZpcm9ubWVudChjb25maWcucG9zdEFjdGlvbi5lbnZpcm9ubWVudCwgZW52aXJvbm1lbnQpO1xuICAgIGF3YWl0IGRvVGFyZ2V0QnVpbGQoZ2NvbmZpZywgbmV3RW52aXJvbm1lbnQsIG5ld0NvbmZpZywgc2V0dGluZ3MpO1xuICAgIGF3YWl0IHNldHRpbmdzLnBvcCgpO1xuICB9XG59XG5cbmFzeW5jIGZ1bmN0aW9uIGdldFVzZXJDb25maWcob3B0aW9uczogQ29tbWFuZE9wdGlvbnMpIHtcbiAgbGV0IGNvbmZpZ1BhdGg7XG4gIGlmIChvcHRpb25zLmVudi5jb25maWcpIHtcbiAgICBjb25maWdQYXRoID0gUGF0aC5pc0Fic29sdXRlKG9wdGlvbnMuZW52LmNvbmZpZykgPyBvcHRpb25zLmVudi5jb25maWcgOiBQYXRoLnJlc29sdmUob3B0aW9ucy53b3JrRGlyLCBvcHRpb25zLmVudi5jb25maWcpO1xuICAgIGlmICghYXdhaXQgZmlsZUV4aXN0cyhjb25maWdQYXRoKSlcbiAgICAgIHRocm93IGBDb25maWd1cmF0aW9uICcke29wdGlvbnMuZW52LmNvbmZpZ30nIGZpbGUgZG9lcyBub3QgZXhpc3RgO1xuICB9XG4gIGVsc2Uge1xuICAgIGNvbnN0IHVzZXJDb25maWdQYXRoID0gUGF0aC5yZXNvbHZlKG9wdGlvbnMud29ya0RpciwgVVNFUl9DT05GSUcpO1xuICAgIGlmIChhd2FpdCBmaWxlRXhpc3RzKHVzZXJDb25maWdQYXRoKSlcbiAgICAgIGNvbmZpZ1BhdGggPSB1c2VyQ29uZmlnUGF0aDtcbiAgICBlbHNlIHtcbiAgICAgIGxvZ2dlci53YXJuKGBDb25maWcgZmlsZSAnJHtVU0VSX0NPTkZJR30nIGlzIG5vdCBhdmFpbGFibGVgKTtcbiAgICB9XG4gIH1cblxuICBpZiAoIWNvbmZpZ1BhdGgpIHtcbiAgICByZXR1cm4ge1xuICAgICAgXCJidW5kbGU6b3V0cHV0XCI6IHtcbiAgICAgICAgYWN0aW9uOiBcImJpdG1ha2VcIixcbiAgICAgICAgdmFyaWFibGVzOiB7XG4gICAgICAgICAgSU5TVEFMTF9QUkVGSVg6IFwiL3VzclwiLFxuICAgICAgICB9LFxuICAgICAgICBzb3VyY2VEaXI6IFwiJHtzb3VyY2VSb290fVwiLFxuICAgICAgICBkZXN0RGlyOiBcIiR7YmluYXJ5Um9vdH0vb3V0cHV0XCIsXG4gICAgICB9XG4gICAgfTtcbiAgfVxuXG4gIGNvbnN0IGNvbmZpZ1VybCA9IHVybC5wYXRoVG9GaWxlVVJMKGNvbmZpZ1BhdGgpO1xuICBjb25zdCBjb25maWdNb2R1bGUgPSBhd2FpdCBpbXBvcnRNb2R1bGUoY29uZmlnVXJsKTtcbiAgc3dpdGNoICh0eXBlb2YgY29uZmlnTW9kdWxlLmRlZmF1bHQpIHtcbiAgY2FzZSBcImZ1bmN0aW9uXCI6XG4gICAgY29uc3QgdXNlckNvbmZpZyA9IGNvbmZpZ01vZHVsZS5kZWZhdWx0KG9wdGlvbnMuZW52LCB7fSk7XG4gICAgaWYgKHVzZXJDb25maWcgaW5zdGFuY2VvZiBQcm9taXNlKVxuICAgICAgcmV0dXJuIGF3YWl0IHVzZXJDb25maWc7XG4gICAgcmV0dXJuIHVzZXJDb25maWc7XG5cbiAgY2FzZSBcIm9iamVjdFwiOlxuICAgIHJldHVybiBjb25maWdNb2R1bGUuZGVmYXVsdDtcblxuICBkZWZhdWx0OlxuICAgIHRocm93IG5ldyBFcnJvcihgVW5rbm93biB1c2VyIGNvbmZpZ3VyYXRpb24gdHlwZWApO1xuICB9XG59XG5cbmV4cG9ydCBkZWZhdWx0IGFzeW5jIChvcHRpb25zOiBDb21tYW5kT3B0aW9ucykgPT4ge1xuICBjb25zdCBnY29uZmlnOiBJR2VuZXJhbENvbmZpZyA9IHtcbiAgICBidWlsZFR5cGU6IG9wdGlvbnMuZW52LmJ1aWxkVHlwZSA9PSBERUJVR19CVUlMRF9UWVBFID8gb3B0aW9ucy5lbnYuYnVpbGRUeXBlIDogUkVMRUFTRV9CVUlMRF9UWVBFLFxuICAgIHdvcmtEaXI6IG9wdGlvbnMud29ya0RpcixcbiAgfTtcblxuICBjb25zdCB1c2VyQ29uZmlnID0gYXdhaXQgZ2V0VXNlckNvbmZpZyhvcHRpb25zKTtcbiAgY29uc3QgYnVpbGRDb25maWcgPSBtYWtlQnVpbGRDb25maWcoZ2NvbmZpZywgdXNlckNvbmZpZyk7XG5cbiAgaWYgKGJ1aWxkQ29uZmlnLlJFQ0lQRV9DT05URU5UX0ZJTEUpIHtcbiAgICBjb25zdCBqc29uQ29uZmlnID0gSlNPTi5zdHJpbmdpZnkoYnVpbGRDb25maWcsIG51bGwsIDIpO1xuICAgIGF3YWl0IHNhdmVJZkRpZmZlcmVudChidWlsZENvbmZpZy5SRUNJUEVfQ09OVEVOVF9GSUxFLCBqc29uQ29uZmlnKTtcbiAgfVxuXG4gIGNvbnN0IHNldHRpbmdzRmlsZW5hbWUgPSBQYXRoLnJlc29sdmUoYnVpbGRDb25maWcuYmluYXJ5Um9vdCwgQlVJTERfU0VUVElOR1NfRklMRSk7XG4gIGNvbnN0IHNldHRpbmdzID0gbmV3IFNldHRpbmdzU3RvcmFnZShzZXR0aW5nc0ZpbGVuYW1lKTtcblxuICBmb3IgKGNvbnN0IFtrZXksIGVudHJ5XSBvZiBPYmplY3QuZW50cmllcyhidWlsZENvbmZpZykgYXMgYW55KSB7XG4gICAgaWYgKGVudHJ5ICYmIHR5cGVvZiBlbnRyeSA9PT0gXCJvYmplY3RcIiAmJiBlbnRyeS5hY3Rpb24gJiYgIWVudHJ5LmRpc2FibGVkKSB7XG4gICAgICBhd2FpdCBzZXR0aW5ncy5wdXNoKGtleSk7XG4gICAgICBjb25zdCBjb21wbGV0ZWQgPSBhd2FpdCBzZXR0aW5ncy5nZXQoXCJjb21wbGV0ZWRcIik7XG4gICAgICBpZiAoZW50cnkucmVidWlsZCB8fCAhY29tcGxldGVkKSB7XG4gICAgICAgIGxvZ2dlci5pbmZvKGBTdGFydGVkIGFjdGlvbjogJHtrZXl9YCk7XG4gICAgICAgIGNvbnN0IGVudmlyb25tZW50ID0gbWVyZ2VFbnZpcm9ubWVudChlbnRyeS5lbnZpcm9ubWVudCwgcHJvY2Vzcy5lbnYpO1xuICAgICAgICBpZiAoZW50cnkuc291cmNlVXJsICYmICFlbnRyeS5zb3VyY2VVcmwuc3RhcnRzV2l0aChJTVBPUlRfU0NIRU1FKSkge1xuICAgICAgICAgIGF3YWl0IGRvRXh0cmFjdEFyY2hpdmUoZ2NvbmZpZywgZW52aXJvbm1lbnQsIGVudHJ5LCBzZXR0aW5ncyk7XG4gICAgICAgIH1cbiAgICAgICAgYXdhaXQgZG9UYXJnZXRCdWlsZChnY29uZmlnLCBlbnZpcm9ubWVudCwgZW50cnksIHNldHRpbmdzKTtcbiAgICAgICAgYXdhaXQgc2V0dGluZ3Muc2V0KFwiY29tcGxldGVkXCIsIHRydWUpO1xuICAgICAgICBsb2dnZXIuaW5mbyhgQ29tcGxldGVkIGFjdGlvbjogJHtrZXl9YCk7XG4gICAgICB9XG4gICAgICBhd2FpdCBzZXR0aW5ncy5wb3AoKTtcbiAgICB9XG4gIH1cbn1cbiIsIi8qXG4gKiBNSVQgTGljZW5zZVxuICpcbiAqIENvcHlyaWdodCAoYykgMjAyNSAgWXVyaWkgWWFrdWJpbiAoeXVyaWkueWFrdWJpbkBnbWFpbC5jb20pXG4gKlxuICogUGVybWlzc2lvbiBpcyBncmFudGVkIHRvIHVzZSwgY29weSwgbW9kaWZ5LCBhbmQgZGlzdHJpYnV0ZSB0aGlzIHNvZnR3YXJlXG4gKiB1bmRlciB0aGUgTUlUIExpY2Vuc2UuIFNlZSBMSUNFTlNFIGZpbGUgZm9yIGRldGFpbHMuXG4gKi9cblxuaW1wb3J0IHsgQ29tbWFuZE9wdGlvbnMgfSBmcm9tIFwiQC9jb3JlL0NvbW1hbmRPcHRpb25zXCI7XG5pbXBvcnQgaW5pdCBmcm9tIFwiQC9jb21tYW5kcy9pbml0XCI7XG5pbXBvcnQgYnVpbGQgZnJvbSBcIkAvY29tbWFuZHMvYnVpbGRcIjtcblxuZXhwb3J0IGRlZmF1bHQge1xuICBkZWZhdWx0OiBidWlsZCxcbiAgaW5pdCxcbiAgYnVpbGQsXG59IGFzIHsgW25hbWU6IHN0cmluZ106IChvcHRpb25zOiBDb21tYW5kT3B0aW9ucykgPT4gYW55OyB9O1xuIiwiLypcbiAqIE1JVCBMaWNlbnNlXG4gKlxuICogQ29weXJpZ2h0IChjKSAyMDI1ICBZdXJpaSBZYWt1YmluICh5dXJpaS55YWt1YmluQGdtYWlsLmNvbSlcbiAqXG4gKiBQZXJtaXNzaW9uIGlzIGdyYW50ZWQgdG8gdXNlLCBjb3B5LCBtb2RpZnksIGFuZCBkaXN0cmlidXRlIHRoaXMgc29mdHdhcmVcbiAqIHVuZGVyIHRoZSBNSVQgTGljZW5zZS4gU2VlIExJQ0VOU0UgZmlsZSBmb3IgZGV0YWlscy5cbiAqL1xuXG5pbXBvcnQgcGF0aCBmcm9tIFwibm9kZTpwYXRoXCI7XG5pbXBvcnQgZnMgZnJvbSBcIm5vZGU6ZnNcIjtcblxuaW1wb3J0IHsgZmlsZUV4aXN0cywgZmV0Y2hCdWZmZXIgfSBmcm9tIFwiQC91dGlscy9GaWxlU3lzdGVtXCI7XG5pbXBvcnQgeyBVU0VSX0NPTkZJRyB9IGZyb20gXCJAL0NvbnN0YW50c1wiO1xuaW1wb3J0IHsgQ29tbWFuZE9wdGlvbnMgfSBmcm9tIFwiQC9jb3JlL0NvbW1hbmRPcHRpb25zXCI7XG5pbXBvcnQgeyBMb2dnZXIgfSBmcm9tIFwiQC9sb2dnZXJcIjtcblxuY29uc3QgbG9nZ2VyID0gTG9nZ2VyLmNyZWF0ZShpbXBvcnQubWV0YS51cmwpO1xuXG5leHBvcnQgZGVmYXVsdCBhc3luYyBmdW5jdGlvbihvcHRpb25zOiBDb21tYW5kT3B0aW9ucykge1xuICBjb25zdCBwcmVzZXQgPSBvcHRpb25zLmVudi5wcmVzZXQ7XG5cbiAgaWYgKCFwcmVzZXQpXG4gICAgdGhyb3cgbmV3IEVycm9yKGBQcmVzZXQgJyR7cHJlc2V0fScgaXMgbm90IGF2YWlsYWJsZWApO1xuXG4gIGNvbnN0IHByZXNldERhdGEgPSBhd2FpdCBmZXRjaEJ1ZmZlcihwcmVzZXQpO1xuXG4gIGNvbnN0IHVzZXJDb25maWdQYXRoID0gcGF0aC5yZXNvbHZlKG9wdGlvbnMud29ya0RpciwgVVNFUl9DT05GSUcpO1xuICBpZiAoYXdhaXQgZmlsZUV4aXN0cyh1c2VyQ29uZmlnUGF0aCkpXG4gICAgYXdhaXQgZnMucHJvbWlzZXMucm0odXNlckNvbmZpZ1BhdGgpO1xuXG4gIGF3YWl0IGZzLnByb21pc2VzLndyaXRlRmlsZSh1c2VyQ29uZmlnUGF0aCwgcHJlc2V0RGF0YSwgXCJ1dGY4XCIpO1xuICBsb2dnZXIuaW5mbyhgUHJlc2V0ICcke3ByZXNldH0nIGluc3RhbGxlZCBzdWNjZXNzZnVsbHlgKTtcbn1cbiIsIi8qXG4gKiBNSVQgTGljZW5zZVxuICpcbiAqIENvcHlyaWdodCAoYykgMjAyNSAgWXVyaWkgWWFrdWJpbiAoeXVyaWkueWFrdWJpbkBnbWFpbC5jb20pXG4gKlxuICogUGVybWlzc2lvbiBpcyBncmFudGVkIHRvIHVzZSwgY29weSwgbW9kaWZ5LCBhbmQgZGlzdHJpYnV0ZSB0aGlzIHNvZnR3YXJlXG4gKiB1bmRlciB0aGUgTUlUIExpY2Vuc2UuIFNlZSBMSUNFTlNFIGZpbGUgZm9yIGRldGFpbHMuXG4gKi9cblxuaW1wb3J0IHVybCBmcm9tIFwibm9kZTp1cmxcIjtcbmltcG9ydCB7IFBhdGggfSBmcm9tIFwiQC91dGlscy9QYXRoXCI7XG5pbXBvcnQgeyBGSUxFX1NDSEVNRSB9IGZyb20gXCJAL3V0aWxzL1VybFNjaGVtZVwiO1xuaW1wb3J0IHBhdGggZnJvbSBcIm5vZGU6cGF0aFwiO1xuXG5jb25zdCBQQVRIID0gU3ltYm9sKFwiUEFUSFwiKTtcblxuZXhwb3J0IGNsYXNzIEFic29sdXRlUGF0aCB7XG4gIHByaXZhdGUgW1BBVEhdOiBzdHJpbmc7XG5cbiAgcHJvdGVjdGVkIGNvbnN0cnVjdG9yKGZpbGVwYXRoOiBzdHJpbmcpIHtcbiAgICBpZiAoZmlsZXBhdGguc3RhcnRzV2l0aChGSUxFX1NDSEVNRSkpIHtcbiAgICAgIHRoaXNbUEFUSF0gPSBmaWxlcGF0aDtcbiAgICB9XG4gICAgZWxzZSBpZiAoUGF0aC5pc0Fic29sdXRlKGZpbGVwYXRoKSkge1xuICAgICAgdGhpc1tQQVRIXSA9IHVybC5wYXRoVG9GaWxlVVJMKGZpbGVwYXRoKS50b1N0cmluZygpO1xuICAgIH1cbiAgICBlbHNlIHtcbiAgICAgIHRocm93IG5ldyBFcnJvcihgTm90IHN1cHBvcnRlZCByZWxhdGl2ZSBwYXRoIG9mIFwiJHtmaWxlcGF0aH1cImApO1xuICAgIH1cbiAgfVxuXG4gIHB1YmxpYyBqb2luKC4uLnBhdGhzOiBBcnJheTxBYnNvbHV0ZVBhdGggfCBzdHJpbmc+KSB7XG4gICAgY29uc3QgZmlsZXBhdGggPSBQYXRoLmpvaW4odXJsLmZpbGVVUkxUb1BhdGgodGhpc1tQQVRIXSksIC4uLnBhdGhzLm1hcChpID0+IGkudG9TdHJpbmcoKSkpO1xuICAgIHJldHVybiBBYnNvbHV0ZVBhdGguY3JlYXRlKGZpbGVwYXRoKTtcbiAgfVxuXG4gIHB1YmxpYyBkaXJuYW1lKCkge1xuICAgIHJldHVybiBBYnNvbHV0ZVBhdGguY3JlYXRlKHBhdGgucG9zaXguZGlybmFtZSh0aGlzW1BBVEhdKSk7XG4gIH1cblxuICBwdWJsaWMgYmFzZW5hbWUoKSB7XG4gICAgcmV0dXJuIHBhdGgucG9zaXguYmFzZW5hbWUodGhpc1tQQVRIXSk7XG4gIH1cblxuICBwdWJsaWMgcmVsYXRpdmUodG86IEFic29sdXRlUGF0aCB8IHN0cmluZykge1xuICAgIHJldHVybiBQYXRoLnJlbGF0aXZlKHVybC5maWxlVVJMVG9QYXRoKHRoaXNbUEFUSF0pLCBBYnNvbHV0ZVBhdGguY3JlYXRlKHRvKS50b1N0cmluZygpKTtcbiAgfVxuXG4gIHB1YmxpYyByZXNvbHZlKC4uLnBhdGhzOiBBcnJheTxBYnNvbHV0ZVBhdGggfCBzdHJpbmc+KSB7XG4gICAgcmV0dXJuIEFic29sdXRlUGF0aC5jcmVhdGUoUGF0aC5yZXNvbHZlKHVybC5maWxlVVJMVG9QYXRoKHRoaXNbUEFUSF0pLCAuLi5wYXRocy5tYXAoaSA9PiBpLnRvU3RyaW5nKCkpKSk7XG4gIH1cblxuICBwdWJsaWMgbWF0Y2gocmVnZXhwOiBSZWdFeHApIHtcbiAgICByZXR1cm4gdGhpc1tQQVRIXS5tYXRjaChyZWdleHApO1xuICB9XG5cbiAgcHVibGljIHRvU3RyaW5nKCkge1xuICAgIHJldHVybiB1cmwuZmlsZVVSTFRvUGF0aCh0aGlzW1BBVEhdKTtcbiAgfVxuXG4gIHB1YmxpYyB2YWx1ZU9mKCkge1xuICAgIHJldHVybiB1cmwuZmlsZVVSTFRvUGF0aCh0aGlzW1BBVEhdKTtcbiAgfVxuXG4gIHB1YmxpYyB0b0pTT04oKSB7XG4gICAgcmV0dXJuIHRoaXNbUEFUSF07XG4gIH1cblxuICBwdWJsaWMgc3RhdGljIGlzQWJzb2x1dGUoZmlsZXBhdGg6IEFic29sdXRlUGF0aCB8IHN0cmluZykge1xuICAgIGlmIChmaWxlcGF0aCBpbnN0YW5jZW9mIEFic29sdXRlUGF0aClcbiAgICAgIHJldHVybiB0cnVlO1xuICAgIHJldHVybiBQYXRoLmlzQWJzb2x1dGUoZmlsZXBhdGgpO1xuICB9XG5cbiAgcHVibGljIHN0YXRpYyBlbnN1cmVJbnN0YW5jZSh2YWx1ZTogYW55KTogQWJzb2x1dGVQYXRoIHtcbiAgICBpZiAodmFsdWUgaW5zdGFuY2VvZiBBYnNvbHV0ZVBhdGgpXG4gICAgICByZXR1cm4gdmFsdWU7XG4gICAgdGhyb3cgbmV3IEVycm9yKGBUaGUgJyR7dmFsdWV9JyBpcyBub3QgYSBBYnNvbHV0ZVBhdGhgKTtcbiAgfVxuXG4gIHB1YmxpYyBzdGF0aWMgY3JlYXRlKHBhdGg6IEFic29sdXRlUGF0aCB8IHN0cmluZyk6IEFic29sdXRlUGF0aCB7XG4gICAgaWYgKHBhdGggaW5zdGFuY2VvZiBBYnNvbHV0ZVBhdGgpXG4gICAgICByZXR1cm4gcGF0aDtcblxuICAgIHJldHVybiBPYmplY3Quc2VhbChuZXcgQWJzb2x1dGVQYXRoKHBhdGgpKTtcbiAgfVxufTtcbiIsIi8qXG4gKiBNSVQgTGljZW5zZVxuICpcbiAqIENvcHlyaWdodCAoYykgMjAyNSAgWXVyaWkgWWFrdWJpbiAoeXVyaWkueWFrdWJpbkBnbWFpbC5jb20pXG4gKlxuICogUGVybWlzc2lvbiBpcyBncmFudGVkIHRvIHVzZSwgY29weSwgbW9kaWZ5LCBhbmQgZGlzdHJpYnV0ZSB0aGlzIHNvZnR3YXJlXG4gKiB1bmRlciB0aGUgTUlUIExpY2Vuc2UuIFNlZSBMSUNFTlNFIGZpbGUgZm9yIGRldGFpbHMuXG4gKi9cblxuaW1wb3J0IHsgSU1ha2VPYmplY3QgfSBmcm9tIFwiQC9jb3JlL0lNYWtlT2JqZWN0XCI7XG5pbXBvcnQgeyBmaW5kUHJvZ3JhbVN5bmMgfSBmcm9tIFwiQC9jb3JlL0ZpbmRQcm9ncmFtXCI7XG5pbXBvcnQgeyBTY29wZUhlbHBlciwgVmFyaWFibGVNYXAgfSBmcm9tIFwiQC9jb3JlL1Njb3BlXCI7XG5pbXBvcnQgeyBMb2dnZXIgfSBmcm9tIFwiQC9sb2dnZXJcIjtcbmltcG9ydCB7IFN5c3RlbVNjb3BlIH0gZnJvbSBcIkAvY29yZS9TeXN0ZW1TY29wZVwiO1xuaW1wb3J0IHsgQWJzb2x1dGVQYXRoIH0gZnJvbSBcIkAvY29yZS9BYnNvbHV0ZVBhdGhcIjtcbmltcG9ydCB7IGltcG9ydE1vZHVsZSB9IGZyb20gXCJAL3V0aWxzL01vZHVsZVwiO1xuXG5jb25zdCBsb2dnZXIgPSBMb2dnZXIuY3JlYXRlKGltcG9ydC5tZXRhLnVybCk7XG5cbmNvbnN0IFZBUklBQkxFX01BUCA9IFN5bWJvbChcIlZBUklBQkxFX01BUFwiKTtcblxuZXhwb3J0IGFic3RyYWN0IGNsYXNzIEJhc2VDb250ZXh0IGltcGxlbWVudHMgSU1ha2VPYmplY3Qge1xuICBbVkFSSUFCTEVfTUFQXTogVmFyaWFibGVNYXA7XG5cbiAgcHJvdGVjdGVkIGNvbnN0cnVjdG9yKHZhcmlhYmxlTWFwOiBWYXJpYWJsZU1hcCkge1xuICAgIHRoaXNbVkFSSUFCTEVfTUFQXSA9IHZhcmlhYmxlTWFwO1xuICB9XG5cbiAgcHVibGljIGZpbmRQcm9ncmFtKG5hbWU6IHN0cmluZyk6IHN0cmluZyB8IHVuZGVmaW5lZCB7XG4gICAgcmV0dXJuIGZpbmRQcm9ncmFtU3luYyhuYW1lKTtcbiAgfVxuXG4gIC8vIE1ha2VPYmplY3RcbiAgcHVibGljIGdldFByb3BlcnR5KG5hbWU6IHN0cmluZyk6IGFueSB7XG4gICAgcmV0dXJuIFNjb3BlSGVscGVyLmdldCh0aGlzW1ZBUklBQkxFX01BUF0sIG5hbWUpO1xuICB9XG4gIHB1YmxpYyBzZXRQcm9wZXJ0eShuYW1lOiBzdHJpbmcsIHZhbHVlOiBhbnkpOiBhbnkge1xuICAgIGNvbnN0IGVudHJ5ID0gdGhpc1tWQVJJQUJMRV9NQVBdW25hbWVdO1xuICAgIGlmIChlbnRyeSlcbiAgICAgIFNjb3BlSGVscGVyLnNldEVudHJ5VmFsdWUoZW50cnksIHZhbHVlKTtcbiAgICBlbHNlXG4gICAgICBTY29wZUhlbHBlci5kZWZpbmVWYXJpYWJsZSh0aGlzW1ZBUklBQkxFX01BUF0sIFwiXCIsIG5hbWUsIHt2YWx1ZX0pO1xuICAgIHJldHVybiB0cnVlO1xuICB9XG4gIHB1YmxpYyBoYXNQcm9wZXJ0eShuYW1lOiBzdHJpbmcpOiBib29sZWFuIHtcbiAgICByZXR1cm4gT2JqZWN0Lmhhc093bih0aGlzW1ZBUklBQkxFX01BUF0sIG5hbWUpO1xuICB9XG4gIHB1YmxpYyBkZWxldGVQcm9wZXJ0eShuYW1lOiBzdHJpbmcpOiBib29sZWFuIHtcbiAgICByZXR1cm4gZGVsZXRlIHRoaXNbVkFSSUFCTEVfTUFQXVtuYW1lXTtcbiAgfVxuICBwdWJsaWMgZ2V0UHJvcGVydHlOYW1lcygpOiBzdHJpbmdbXSB7XG4gICAgcmV0dXJuIE9iamVjdC5rZXlzKHRoaXNbVkFSSUFCTEVfTUFQXSk7XG4gIH1cbn07XG5cbmV4cG9ydCBmdW5jdGlvbiBjcmVhdGVDb250ZXh0PFQgZXh0ZW5kcyBJTWFrZU9iamVjdD4oY3R4OiBUKTogVCAmIFN5c3RlbVNjb3BlIHtcbiAgY29uc3QgaGFuZGxlcjogUHJveHlIYW5kbGVyPFQ+ID0ge1xuICAgIGdldCh0YXJnZXQ6IFQsIG5hbWU6IHN0cmluZywgcmVjZWl2ZXI6IGFueSkge1xuICAgICAgaWYgKG5hbWUgaW4gdGFyZ2V0KVxuICAgICAgICByZXR1cm4gKHRhcmdldCBhcyBhbnkpW25hbWVdO1xuICAgICAgcmV0dXJuIHRhcmdldC5nZXRQcm9wZXJ0eShuYW1lKTtcbiAgICB9LFxuICAgIHNldCh0YXJnZXQ6IFQsIG5hbWU6IHN0cmluZywgdmFsdWU6IGFueSk6IGJvb2xlYW4ge1xuICAgICAgdGFyZ2V0LnNldFByb3BlcnR5KG5hbWUsIHZhbHVlKTtcbiAgICAgIHJldHVybiB0cnVlO1xuICAgIH0sXG4gICAgaGFzKHRhcmdldDogVCwgbmFtZTogc3RyaW5nKSB7XG4gICAgICByZXR1cm4gbmFtZSBpbiB0YXJnZXQgfHwgdGFyZ2V0Lmhhc1Byb3BlcnR5KG5hbWUpO1xuICAgIH0sXG4gICAgb3duS2V5cyh0YXJnZXQ6IFQpIHtcbiAgICAgIHJldHVybiB0YXJnZXQuZ2V0UHJvcGVydHlOYW1lcygpO1xuICAgIH0sXG4gICAgZGVsZXRlUHJvcGVydHkodGFyZ2V0OiBULCBuYW1lOiBzdHJpbmcpIHtcbiAgICAgIHJldHVybiB0YXJnZXQuZGVsZXRlUHJvcGVydHkobmFtZSk7XG4gICAgfSxcbiAgICBnZXRPd25Qcm9wZXJ0eURlc2NyaXB0b3IodGFyZ2V0OiBULCBuYW1lOiBzdHJpbmcpOiBQcm9wZXJ0eURlc2NyaXB0b3IgfCB1bmRlZmluZWQge1xuICAgICAgaWYgKHRhcmdldC5oYXNQcm9wZXJ0eShuYW1lKSkge1xuICAgICAgICBjb25zdCB2YWx1ZSA9IHRhcmdldC5nZXRQcm9wZXJ0eShuYW1lKTtcbiAgICAgICAgcmV0dXJuIHsgdmFsdWUsIHdyaXRhYmxlOiB0cnVlLCBlbnVtZXJhYmxlOiB0cnVlLCBjb25maWd1cmFibGU6IHRydWUgfTtcbiAgICAgIH1cbiAgICAgIHJldHVybiB1bmRlZmluZWQ7XG4gICAgfSxcbiAgfTtcbiAgcmV0dXJuIG5ldyBQcm94eShjdHgsIGhhbmRsZXIpIGFzIFQgJiBTeXN0ZW1TY29wZTtcbn1cblxuZXhwb3J0IGFzeW5jIGZ1bmN0aW9uIHBlcmZvcm1Db250ZXh0KG1rOiBCYXNlQ29udGV4dCAmIFN5c3RlbVNjb3BlKSB7XG4gIGNvbnN0IHNjcmlwdFVybCA9IG1rLlNDUklQVF9GSUxFLnRvSlNPTigpO1xuICBjb25zdCBtb2R1bGUgPSBhd2FpdCBpbXBvcnRNb2R1bGUoc2NyaXB0VXJsKTtcbiAgaWYgKCFtb2R1bGUuZGVmYXVsdClcbiAgICB0aHJvdyBuZXcgRXJyb3IoYFNjcmlwdCAke3NjcmlwdFVybH0gaGFzIG5vdCBjb250YWluIGEgZGVmYXVsdCBmdW5jdGlvbmApO1xuXG4gIGNvbnN0IHJlc3VsdCA9IG1vZHVsZS5kZWZhdWx0KG1rKTtcbiAgaWYgKHJlc3VsdCBpbnN0YW5jZW9mIFByb21pc2UpXG4gICAgYXdhaXQgcmVzdWx0O1xufVxuXG5leHBvcnQgZnVuY3Rpb24gY3JlYXRlVmFyaWFibGVNYXBGb3JEaXJlY3RvcnkodmFyaWFibGVNYXA6IFZhcmlhYmxlTWFwLCBzb3VyY2VEaXI6IGFueSwgYmluYXJ5RGlyPzogYW55KTogVmFyaWFibGVNYXAge1xuICBpZiAoYmluYXJ5RGlyID09PSB1bmRlZmluZWQpIHtcbiAgICBpZiAoIUFic29sdXRlUGF0aC5pc0Fic29sdXRlKHNvdXJjZURpcikpXG4gICAgICBiaW5hcnlEaXIgPSBzb3VyY2VEaXI7XG4gICAgZWxzZSB7XG4gICAgICBjb25zdCBiaW5hcnlEaXIxID0gU2NvcGVIZWxwZXIuZ2V0KHZhcmlhYmxlTWFwLCBcIlBST0pFQ1RfQklOQVJZX0RJUlwiKS5yZWxhdGl2ZShzb3VyY2VEaXIpO1xuICAgICAgY29uc3QgYmluYXJ5RGlyMiA9IFNjb3BlSGVscGVyLmdldCh2YXJpYWJsZU1hcCwgXCJQUk9KRUNUX1NPVVJDRV9ESVJcIikucmVsYXRpdmUoc291cmNlRGlyKTtcbiAgICAgIGJpbmFyeURpciA9IChiaW5hcnlEaXIxLmxlbmd0aCA+IGJpbmFyeURpcjIubGVuZ3RoKSA/IGJpbmFyeURpcjIgOiBiaW5hcnlEaXIxO1xuICAgIH1cbiAgfVxuXG4gIGNvbnN0IFNPVVJDRV9ESVIgPSBTY29wZUhlbHBlci5nZXQodmFyaWFibGVNYXAsIFwiU09VUkNFX0RJUlwiKS5yZXNvbHZlKHNvdXJjZURpcik7XG4gIGNvbnN0IEJJTkFSWV9ESVIgPSBTY29wZUhlbHBlci5nZXQodmFyaWFibGVNYXAsIFwiQklOQVJZX0RJUlwiKS5yZXNvbHZlKGJpbmFyeURpcik7XG5cbiAgY29uc3QgbmV3VmFyaWFibGVNYXAgPSBTY29wZUhlbHBlci5jbG9uZVZhcmlhYmxlTWFwKHZhcmlhYmxlTWFwKTtcblxuICBTY29wZUhlbHBlci5zZXQobmV3VmFyaWFibGVNYXAsIFwiU09VUkNFX0RJUlwiLCBTT1VSQ0VfRElSKTtcbiAgU2NvcGVIZWxwZXIuc2V0KG5ld1ZhcmlhYmxlTWFwLCBcIkJJTkFSWV9ESVJcIiwgQklOQVJZX0RJUik7XG4gIFNjb3BlSGVscGVyLnJlc2V0KG5ld1ZhcmlhYmxlTWFwLCBcIlNDUklQVF9ESVJcIik7XG4gIFNjb3BlSGVscGVyLnJlc2V0KG5ld1ZhcmlhYmxlTWFwLCBcIlNDUklQVF9GSUxFXCIpO1xuXG4gIHJldHVybiBuZXdWYXJpYWJsZU1hcDtcbn1cbiIsIi8qXG4gKiBNSVQgTGljZW5zZVxuICpcbiAqIENvcHlyaWdodCAoYykgMjAyNSAgWXVyaWkgWWFrdWJpbiAoeXVyaWkueWFrdWJpbkBnbWFpbC5jb20pXG4gKlxuICogUGVybWlzc2lvbiBpcyBncmFudGVkIHRvIHVzZSwgY29weSwgbW9kaWZ5LCBhbmQgZGlzdHJpYnV0ZSB0aGlzIHNvZnR3YXJlXG4gKiB1bmRlciB0aGUgTUlUIExpY2Vuc2UuIFNlZSBMSUNFTlNFIGZpbGUgZm9yIGRldGFpbHMuXG4gKi9cblxuaW1wb3J0IGZzIGZyb20gXCJub2RlOmZzXCI7XG5cbmltcG9ydCB7IGdlbmVyYXRlZFNjcmlwdE5hbWVDb21tZW50IH0gZnJvbSBcIkAvY3h4XCI7XG5cbmV4cG9ydCBkZWZhdWx0IGFzeW5jIGZ1bmN0aW9uKG1rOiBhbnkpIHtcbiAgY29uc3QgbGluZXMgPSBbXTtcblxuICBsaW5lcy5wdXNoKGdlbmVyYXRlZFNjcmlwdE5hbWVDb21tZW50KGltcG9ydC5tZXRhLmZpbGVuYW1lKSk7XG4gIGxpbmVzLnB1c2goXCJcIik7XG5cbiAgZm9yIChjb25zdCBbbmFtZSwgZW50cnldIG9mIE9iamVjdC5lbnRyaWVzKG1rLlNDUklQVF9JTlBVVCkgYXMgYW55KSB7XG4gICAgaWYgKGVudHJ5LmRlc2NyaXB0aW9uKSB7XG4gICAgICBsaW5lcy5wdXNoKGAvKiAke2VudHJ5LmRlc2NyaXB0aW9ufSAqL2ApO1xuICAgIH1cbiAgICBpZiAodHlwZW9mIGVudHJ5LnZhbHVlID09PSBcImJvb2xlYW5cIikge1xuICAgICAgbGluZXMucHVzaChgI2RlZmluZSAke25hbWV9ICR7ZW50cnkudmFsdWUgPyAxIDogMH1gKTtcbiAgICB9XG4gICAgZWxzZSBpZiAodHlwZW9mIGVudHJ5LnZhbHVlID09PSBcIm51bWJlclwiKSB7XG4gICAgICBsaW5lcy5wdXNoKGAjZGVmaW5lICR7bmFtZX0gJHtlbnRyeS52YWx1ZX1gKTtcbiAgICB9XG4gICAgZWxzZSBpZiAodHlwZW9mIGVudHJ5LnZhbHVlID09PSBcInN0cmluZ1wiKSB7XG4gICAgICBsaW5lcy5wdXNoKGAjZGVmaW5lICR7bmFtZX0gXCIke2VudHJ5LnZhbHVlfVwiYCk7XG4gICAgfVxuICAgIGVsc2UgaWYgKEFycmF5LmlzQXJyYXkoZW50cnkudmFsdWUpKSB7XG4gICAgICBsaW5lcy5wdXNoKGAjZGVmaW5lICR7bmFtZX0gXCIke2VudHJ5LnZhbHVlLmpvaW4oXCI7XCIpfVwiYCk7XG4gICAgfVxuICAgIGVsc2Uge1xuICAgICAgdGhyb3cgbmV3IEVycm9yKGBcIiR7bmFtZX1cIiBoYXMgJHtlbnRyeS52YWx1ZX0gdmFsdWVgKTtcbiAgICB9XG4gICAgbGluZXMucHVzaChcIlwiKTtcbiAgfVxuXG4gIGF3YWl0IGZzLnByb21pc2VzLm1rZGlyKG1rLlNDUklQVF9PVVRQVVQuZGlybmFtZSgpLnRvU3RyaW5nKCksIHsgcmVjdXJzaXZlOiB0cnVlIH0pO1xuICBhd2FpdCBmcy5wcm9taXNlcy53cml0ZUZpbGUobWsuU0NSSVBUX09VVFBVVC50b1N0cmluZygpLCBsaW5lcy5qb2luKFwiXFxuXCIpLCBcInV0Zi04XCIpO1xufVxuIiwiLypcbiAqIE1JVCBMaWNlbnNlXG4gKlxuICogQ29weXJpZ2h0IChjKSAyMDI1ICBZdXJpaSBZYWt1YmluICh5dXJpaS55YWt1YmluQGdtYWlsLmNvbSlcbiAqXG4gKiBQZXJtaXNzaW9uIGlzIGdyYW50ZWQgdG8gdXNlLCBjb3B5LCBtb2RpZnksIGFuZCBkaXN0cmlidXRlIHRoaXMgc29mdHdhcmVcbiAqIHVuZGVyIHRoZSBNSVQgTGljZW5zZS4gU2VlIExJQ0VOU0UgZmlsZSBmb3IgZGV0YWlscy5cbiAqL1xuXG5pbXBvcnQgZnMgZnJvbSBcIm5vZGU6ZnNcIjtcblxuZXhwb3J0IGRlZmF1bHQgYXN5bmMgZnVuY3Rpb24obWs6IGFueSkge1xuICBsZXQgY29udGVudCA9IGF3YWl0IGZzLnByb21pc2VzLnJlYWRGaWxlKG1rLlNDUklQVF9JTlBVVC50b1N0cmluZygpLCBcInV0Zi04XCIpO1xuICBjb250ZW50ID0gY29udGVudC5yZXBsYWNlKC9AKFtfQS1aYS16XVtfQS1aYS16MC05XSspQC9nLCAobWF0Y2gsIHYxKSA9PiB7XG4gICAgY29uc3QgcmVzID0gbWtbdjFdIHx8IFwiXCI7XG4gICAgaWYgKEFycmF5LmlzQXJyYXkocmVzKSlcbiAgICAgIHJldHVybiByZXMuam9pbihcIlxcblwiKTtcbiAgICByZXR1cm4gcmVzLnRvU3RyaW5nKCk7XG4gIH0pO1xuICBjb250ZW50ID0gY29udGVudC5yZXBsYWNlKC8jY21ha2VkZWZpbmUgKyhbX0EtWmEtel1bX0EtWmEtejAtOV0rKSAqKC4qKS9nLCAobWF0Y2gsIHYxLCB2MikgPT4ge1xuICAgIHJldHVybiBta1t2MV0gPyBgI2RlZmluZSAke3YxfSAke3YyfWAgOiBgLyogI3VuZGVmICR7djF9ICovYDtcbiAgfSk7XG4gIGF3YWl0IGZzLnByb21pc2VzLm1rZGlyKG1rLlNDUklQVF9PVVRQVVQuZGlybmFtZSgpLnRvU3RyaW5nKCksIHsgcmVjdXJzaXZlOiB0cnVlIH0pO1xuICBhd2FpdCBmcy5wcm9taXNlcy53cml0ZUZpbGUobWsuU0NSSVBUX09VVFBVVC50b1N0cmluZygpLCBjb250ZW50LCBcInV0Zi04XCIpO1xufVxuIiwiLypcbiAqIE1JVCBMaWNlbnNlXG4gKlxuICogQ29weXJpZ2h0IChjKSAyMDI1ICBZdXJpaSBZYWt1YmluICh5dXJpaS55YWt1YmluQGdtYWlsLmNvbSlcbiAqXG4gKiBQZXJtaXNzaW9uIGlzIGdyYW50ZWQgdG8gdXNlLCBjb3B5LCBtb2RpZnksIGFuZCBkaXN0cmlidXRlIHRoaXMgc29mdHdhcmVcbiAqIHVuZGVyIHRoZSBNSVQgTGljZW5zZS4gU2VlIExJQ0VOU0UgZmlsZSBmb3IgZGV0YWlscy5cbiAqL1xuXG5pbXBvcnQgY29uZmlndXJlX2ZpbGUgZnJvbSBcIkAvY29yZS9CdWlsZGluU2NyaXB0cy9jb25maWd1cmVfZmlsZVwiO1xuaW1wb3J0IGNfaGVhZGVyIGZyb20gXCJAL2NvcmUvQnVpbGRpblNjcmlwdHMvY19oZWFkZXJcIjtcblxuZXhwb3J0IGRlZmF1bHQge1xuICBjb25maWd1cmVfZmlsZSxcbiAgY19oZWFkZXIsXG59O1xuIiwiLypcbiAqIE1JVCBMaWNlbnNlXG4gKlxuICogQ29weXJpZ2h0IChjKSAyMDI1ICBZdXJpaSBZYWt1YmluICh5dXJpaS55YWt1YmluQGdtYWlsLmNvbSlcbiAqXG4gKiBQZXJtaXNzaW9uIGlzIGdyYW50ZWQgdG8gdXNlLCBjb3B5LCBtb2RpZnksIGFuZCBkaXN0cmlidXRlIHRoaXMgc29mdHdhcmVcbiAqIHVuZGVyIHRoZSBNSVQgTGljZW5zZS4gU2VlIExJQ0VOU0UgZmlsZSBmb3IgZGV0YWlscy5cbiAqL1xuXG5pbXBvcnQgeyBBYnNvbHV0ZVBhdGggfSBmcm9tIFwiQC9jb3JlL0Fic29sdXRlUGF0aFwiO1xuaW1wb3J0IHsgU2NvcGVIZWxwZXIsIFZhcmlhYmxlTWFwIH0gZnJvbSBcIkAvY29yZS9TY29wZVwiO1xuXG5jb25zdCBTQ09QRSAgICAgICAgPSBTeW1ib2woXCJTQ09QRVwiKTtcbmNvbnN0IE5BTUUgICAgICAgICA9IFN5bWJvbChcIk5BTUVcIik7XG5jb25zdCBTQ1JJUFQgICAgICAgPSBTeW1ib2woXCJTQ1JJUFRcIik7XG5jb25zdCBJTlBVVCAgICAgICAgPSBTeW1ib2woXCJJTlBVVFwiKTtcbmNvbnN0IE9VVFBVVCAgICAgICA9IFN5bWJvbChcIk9VVFBVVFwiKTtcbmNvbnN0IFdPUktfRElSICAgICA9IFN5bWJvbChcIldPUktfRElSXCIpO1xuXG5leHBvcnQgY2xhc3MgQ3VzdG9tU2NyaXB0IHtcbiAgcHJpdmF0ZSBbU0NPUEVdOiBWYXJpYWJsZU1hcDtcbiAgcHJpdmF0ZSBbTkFNRV06IHN0cmluZztcbiAgcHJpdmF0ZSBbU0NSSVBUXTogQWJzb2x1dGVQYXRoIHwgRnVuY3Rpb247XG4gIHByaXZhdGUgW0lOUFVUXTogQWJzb2x1dGVQYXRoIHwgdW5kZWZpbmVkO1xuICBwcml2YXRlIFtPVVRQVVRdOiBBYnNvbHV0ZVBhdGg7XG4gIHByaXZhdGUgW1dPUktfRElSXTogQWJzb2x1dGVQYXRoO1xuXG4gIHByaXZhdGUgY29uc3RydWN0b3Iob3B0aW9uczogQ3VzdG9tU2NyaXB0Lk9wdGlvbnMpIHtcbiAgICB0aGlzW1NDT1BFXSA9IG9wdGlvbnMudmFyaWFibGVNYXA7XG4gICAgdGhpc1tOQU1FXSA9IG9wdGlvbnMubmFtZSB8fCBcIlwiO1xuICAgIHRoaXNbSU5QVVRdID0gb3B0aW9ucy5pbnB1dDtcbiAgICB0aGlzW1NDUklQVF0gPSBvcHRpb25zLnNjcmlwdDtcbiAgICB0aGlzW09VVFBVVF0gPSBvcHRpb25zLm91dHB1dDtcbiAgICB0aGlzW1dPUktfRElSXSA9IG9wdGlvbnMud29ya0RpcjtcbiAgfVxuXG4gIHB1YmxpYyBzdGF0aWMgY3JlYXRlKG9wdGlvbnM6IEN1c3RvbVNjcmlwdC5PcHRpb25zKTogQ3VzdG9tU2NyaXB0IHtcbiAgICByZXR1cm4gT2JqZWN0LnNlYWwobmV3IEN1c3RvbVNjcmlwdChvcHRpb25zKSk7XG4gIH1cblxuICBwdWJsaWMgbWVyZ2VWYXJpYWJsZXModmFyaWFibGVzOiBhbnkpIHtcbiAgICBTY29wZUhlbHBlci5tZXJnZVZhcmlhYmxlTWFwKHRoaXNbU0NPUEVdLCB2YXJpYWJsZXMpO1xuICB9XG5cbiAgcHVibGljIGdldCBOQU1FKCkge1xuICAgIHJldHVybiB0aGlzW05BTUVdO1xuICB9XG5cbiAgcHVibGljIGdldCBTQ1JJUFQoKSB7XG4gICAgcmV0dXJuIHRoaXNbU0NSSVBUXTtcbiAgfVxuXG4gIHB1YmxpYyBnZXQgSU5QVVQoKTogQWJzb2x1dGVQYXRoIHwgdW5kZWZpbmVkIHtcbiAgICByZXR1cm4gdGhpc1tJTlBVVF07XG4gIH1cblxuICBwdWJsaWMgZ2V0IE9VVFBVVCgpOiBBYnNvbHV0ZVBhdGgge1xuICAgIHJldHVybiB0aGlzW09VVFBVVF07XG4gIH1cblxuICBwdWJsaWMgZ2V0IHdvcmtEaXIoKTogQWJzb2x1dGVQYXRoIHtcbiAgICByZXR1cm4gdGhpc1tXT1JLX0RJUl07XG4gIH1cblxuICBwdWJsaWMgZ2V0IHZhcmlhYmxlTWFwKCkge1xuICAgIHJldHVybiB0aGlzW1NDT1BFXTtcbiAgfVxuXG4gIHB1YmxpYyB0b0pTT04oKTogb2JqZWN0IHtcbiAgICByZXR1cm4ge1xuICAgICAgdmFyaWFibGVNYXA6IHRoaXNbU0NPUEVdLFxuICAgICAgTkFNRTogdGhpc1tOQU1FXSxcbiAgICAgIFNDUklQVDogdGhpcy5TQ1JJUFQsXG4gICAgICBJTlBVVDogdGhpcy5JTlBVVCxcbiAgICAgIE9VVFBVVDogdGhpcy5PVVRQVVQsXG4gICAgfVxuICB9XG59O1xuXG5leHBvcnQgbmFtZXNwYWNlIEN1c3RvbVNjcmlwdCB7XG5cbmV4cG9ydCBpbnRlcmZhY2UgT3B0aW9ucyB7XG4gIHZhcmlhYmxlTWFwOiBWYXJpYWJsZU1hcCxcbiAgbmFtZT86IHN0cmluZyxcbiAgc2NyaXB0OiBBYnNvbHV0ZVBhdGggfCBGdW5jdGlvbixcbiAgaW5wdXQ/OiBBYnNvbHV0ZVBhdGgsXG4gIG91dHB1dDogQWJzb2x1dGVQYXRoLFxuICB3b3JrRGlyOiBBYnNvbHV0ZVBhdGgsXG59O1xuXG59IC8vIG5hbWVzcGFjZSBDdXN0b21TY3JpcHRcbiIsIi8qXG4gKiBNSVQgTGljZW5zZVxuICpcbiAqIENvcHlyaWdodCAoYykgMjAyNSAgWXVyaWkgWWFrdWJpbiAoeXVyaWkueWFrdWJpbkBnbWFpbC5jb20pXG4gKlxuICogUGVybWlzc2lvbiBpcyBncmFudGVkIHRvIHVzZSwgY29weSwgbW9kaWZ5LCBhbmQgZGlzdHJpYnV0ZSB0aGlzIHNvZnR3YXJlXG4gKiB1bmRlciB0aGUgTUlUIExpY2Vuc2UuIFNlZSBMSUNFTlNFIGZpbGUgZm9yIGRldGFpbHMuXG4gKi9cblxuZnVuY3Rpb24gY29udmVydFZhbHVlVG9EZWZpbml0aW9uKHZhbHVlOiBhbnkpOiBzdHJpbmcge1xuICBpZiAodmFsdWUgPT09IHVuZGVmaW5lZClcbiAgICB0aHJvdyBgRGVmaW5pdGlvbiB1bmRlZmluZWRgO1xuICBpZiAodHlwZW9mIHZhbHVlID09PSBcIm9iamVjdFwiKVxuICAgIHJldHVybiAnXCInICsgSlNPTi5zdHJpbmdpZnkodmFsdWUpICsgJ1wiJztcbiAgcmV0dXJuIHZhbHVlLnRvU3RyaW5nKCk7XG59XG5cbmV4cG9ydCBmdW5jdGlvbiBub3JtYWxpemVEZWZpbml0aW9ucyguLi5kZWZpbml0aW9uczogYW55W10pOiBzdHJpbmdbXSB7XG4gIGNvbnN0IHJlc3VsdCA9IFtdO1xuICBmb3IgKGNvbnN0IGl0ZXIgb2YgZGVmaW5pdGlvbnMpIHtcbiAgICBpZiAodHlwZW9mIGl0ZXIgPT09IFwic3RyaW5nXCIpXG4gICAgICByZXN1bHQucHVzaChpdGVyKTtcbiAgICBlbHNlIGlmICghaXRlcilcbiAgICAgIHRocm93IG5ldyBFcnJvcihgRGVmZW5pdGlvbiAke2l0ZXJ9IG5vdCBzdXBwb3J0ZWRgKVxuICAgIGVsc2UgaWYgKEFycmF5LmlzQXJyYXkoaXRlcikpIHtcbiAgICAgIGZvciAoY29uc3QgdmFsIG9mIGl0ZXIpXG4gICAgICAgIHJlc3VsdC5wdXNoKGNvbnZlcnRWYWx1ZVRvRGVmaW5pdGlvbih2YWwpKTtcbiAgICB9XG4gICAgZWxzZSBpZiAodHlwZW9mIGl0ZXIgPT09IFwib2JqZWN0XCIpIHtcbiAgICAgIGZvciAoY29uc3QgW2tleSwgdmFsXSBvZiBPYmplY3QuZW50cmllcyhpdGVyKSlcbiAgICAgICAgcmVzdWx0LnB1c2goYCR7a2V5fT0ke2NvbnZlcnRWYWx1ZVRvRGVmaW5pdGlvbih2YWwpfWApO1xuICAgIH1cbiAgICBlbHNlXG4gICAgICB0aHJvdyBuZXcgRXJyb3IoYERlZmVuaXRpb24gJHtpdGVyfSBub3Qgc3VwcG9ydGVkYClcbiAgfVxuICByZXR1cm4gcmVzdWx0O1xufVxuIiwiLypcbiAqIE1JVCBMaWNlbnNlXG4gKlxuICogQ29weXJpZ2h0IChjKSAyMDI1ICBZdXJpaSBZYWt1YmluICh5dXJpaS55YWt1YmluQGdtYWlsLmNvbSlcbiAqXG4gKiBQZXJtaXNzaW9uIGlzIGdyYW50ZWQgdG8gdXNlLCBjb3B5LCBtb2RpZnksIGFuZCBkaXN0cmlidXRlIHRoaXMgc29mdHdhcmVcbiAqIHVuZGVyIHRoZSBNSVQgTGljZW5zZS4gU2VlIExJQ0VOU0UgZmlsZSBmb3IgZGV0YWlscy5cbiAqL1xuXG5pbXBvcnQgeyBmaW5kUHJvZ3JhbSB9IGZyb20gXCJAL2NvcmUvRmluZFByb2dyYW1cIjtcbmltcG9ydCB7IFN5c3RlbVNjb3BlIH0gZnJvbSBcIkAvY29yZS9TeXN0ZW1TY29wZVwiO1xuaW1wb3J0IHsgTG9nZ2VyIH0gZnJvbSBcIkAvbG9nZ2VyXCI7XG5cbmNvbnN0IGxvZ2dlciA9IExvZ2dlci5jcmVhdGUoaW1wb3J0Lm1ldGEudXJsKTtcblxuZXhwb3J0IGFzeW5jIGZ1bmN0aW9uIGRldGVybWluZUNvbXBpbGVyKHNjb3BlOiBTeXN0ZW1TY29wZSkge1xuICBjb25zdCBjbGFuZ1BhdGggPSBhd2FpdCBmaW5kUHJvZ3JhbShcImNsYW5nXCIpO1xuICBpZiAoY2xhbmdQYXRoKSB7XG4gICAgbG9nZ2VyLmluZm8oXCJUaGUgQyBjb21waWxlciBpZGVudGlmaWNhdGlvbiBpcyBDbGFuZyBhLmIuY1wiKTtcbiAgICBzY29wZS5BU01fQ09NUElMRVIgPSBcImNsYW5nXCI7XG4gICAgc2NvcGUuQ19DT01QSUxFUiA9IFwiY2xhbmdcIjtcbiAgICBzY29wZS5DWFhfQ09NUElMRVIgPSBcImNsYW5nKytcIjtcbiAgICBzY29wZS5BUiA9IFwibGx2bS1hclwiO1xuICAgIHNjb3BlLlJBTkxJQiA9IFwibGx2bS1yYW5saWJcIjtcbiAgICBzY29wZS5MSU5LRVIgPSBcImxsZFwiO1xuICAgIHNjb3BlLk5NID0gXCJsbHZtLW5tXCI7XG4gICAgc2NvcGUuT0JKQ09QWSA9IFwibGx2bS1vYmpjb3B5XCI7XG4gICAgc2NvcGUuT0JKRFVNUCA9IFwibGx2bS1vYmpkdW1wXCI7XG4gICAgc2NvcGUuU1RSSVAgPSBcImxsdm0tc3RyaXBcIjtcbiAgICByZXR1cm47XG4gIH1cblxuICBjb25zdCBnY2NQYXRoID0gYXdhaXQgZmluZFByb2dyYW0oXCJnY2NcIik7XG4gIGlmIChnY2NQYXRoKSB7XG4gICAgbG9nZ2VyLmluZm8oXCJUaGUgQyBjb21waWxlciBpZGVudGlmaWNhdGlvbiBpcyBHTlUgYS5iLmNcIik7XG4gICAgc2NvcGUuQVNNX0NPTVBJTEVSID0gXCJnY2NcIjtcbiAgICBzY29wZS5DX0NPTVBJTEVSID0gXCJnY2NcIjtcbiAgICBzY29wZS5DWFhfQ09NUElMRVIgPSBcImcrK1wiO1xuICAgIHNjb3BlLkFSID0gXCJhclwiO1xuICAgIHNjb3BlLlJBTkxJQiA9IFwicmFubGliXCI7XG4gICAgc2NvcGUuTElOS0VSID0gXCJsZFwiO1xuICAgIHNjb3BlLk5NID0gXCJubVwiO1xuICAgIHNjb3BlLk9CSkNPUFkgPSBcIm9iamNvcHlcIjtcbiAgICBzY29wZS5PQkpEVU1QID0gXCJvYmpkdW1wXCI7XG4gICAgc2NvcGUuU1RSSVAgPSBcInN0cmlwXCI7XG4gICAgcmV0dXJuO1xuICB9XG5cbiAgdGhyb3cgYENhbiBub3QgZGV0ZXJtaW5lIGNvbXBpbGVyYDtcbn1cbiIsIi8qXG4gKiBNSVQgTGljZW5zZVxuICpcbiAqIENvcHlyaWdodCAoYykgMjAyNSAgWXVyaWkgWWFrdWJpbiAoeXVyaWkueWFrdWJpbkBnbWFpbC5jb20pXG4gKlxuICogUGVybWlzc2lvbiBpcyBncmFudGVkIHRvIHVzZSwgY29weSwgbW9kaWZ5LCBhbmQgZGlzdHJpYnV0ZSB0aGlzIHNvZnR3YXJlXG4gKiB1bmRlciB0aGUgTUlUIExpY2Vuc2UuIFNlZSBMSUNFTlNFIGZpbGUgZm9yIGRldGFpbHMuXG4gKi9cblxuaW1wb3J0IHsgUGF0aCB9IGZyb20gXCJAL3V0aWxzL1BhdGhcIjtcbmltcG9ydCB7IEhvc3QgfSBmcm9tIFwiQC91dGlscy9Ib3N0XCI7XG5pbXBvcnQgeyBmaWxlRXhpc3RzLCBmaWxlRXhpc3RzU3luYyB9IGZyb20gXCJAL3V0aWxzL0ZpbGVTeXN0ZW1cIjtcblxuZnVuY3Rpb24gcG9zc2libGVQcm9ncmFtTGlzdChuYW1lOiBzdHJpbmcpIHtcbiAgaWYgKEhvc3QuZXhlY3V0YWJsZVN1ZmZpeClcbiAgICBuYW1lICs9IEhvc3QuZXhlY3V0YWJsZVN1ZmZpeDtcblxuICBjb25zdCByZXN1bHQgPSBbXTtcbiAgY29uc3QgcGF0aHMgPSAocHJvY2Vzcy5lbnYuUEFUSCB8fCBcIlwiKS5zcGxpdChQYXRoLmRlbGltaXRlcik7XG4gIGZvciAoY29uc3QgaXRlciBvZiBwYXRocykge1xuICAgIGNvbnN0IGZpbGVuYW1lID0gUGF0aC5yZXNvbHZlKGl0ZXIsIG5hbWUpO1xuICAgIHJlc3VsdC5wdXNoKGZpbGVuYW1lKTtcbiAgfVxuXG4gIHJldHVybiByZXN1bHQ7XG59XG5cbmV4cG9ydCBhc3luYyBmdW5jdGlvbiBmaW5kUHJvZ3JhbShuYW1lOiBzdHJpbmcpOiBQcm9taXNlPHN0cmluZyB8IHVuZGVmaW5lZD4ge1xuICBmb3IgKGNvbnN0IGl0ZXIgb2YgcG9zc2libGVQcm9ncmFtTGlzdChuYW1lKSkge1xuICAgIGlmIChhd2FpdCBmaWxlRXhpc3RzKGl0ZXIpKVxuICAgICAgcmV0dXJuIGl0ZXI7XG4gIH1cbiAgcmV0dXJuIHVuZGVmaW5lZDtcbn1cblxuZXhwb3J0IGZ1bmN0aW9uIGZpbmRQcm9ncmFtU3luYyhuYW1lOiBzdHJpbmcpOiBzdHJpbmcgfCB1bmRlZmluZWQge1xuICBmb3IgKGNvbnN0IGl0ZXIgb2YgcG9zc2libGVQcm9ncmFtTGlzdChuYW1lKSkge1xuICAgIGlmIChmaWxlRXhpc3RzU3luYyhpdGVyKSlcbiAgICAgIHJldHVybiBpdGVyO1xuICB9XG4gIHJldHVybiB1bmRlZmluZWQ7XG59XG4iLCIvKlxuICogTUlUIExpY2Vuc2VcbiAqXG4gKiBDb3B5cmlnaHQgKGMpIDIwMjUgIFl1cmlpIFlha3ViaW4gKHl1cmlpLnlha3ViaW5AZ21haWwuY29tKVxuICpcbiAqIFBlcm1pc3Npb24gaXMgZ3JhbnRlZCB0byB1c2UsIGNvcHksIG1vZGlmeSwgYW5kIGRpc3RyaWJ1dGUgdGhpcyBzb2Z0d2FyZVxuICogdW5kZXIgdGhlIE1JVCBMaWNlbnNlLiBTZWUgTElDRU5TRSBmaWxlIGZvciBkZXRhaWxzLlxuICovXG5cbmltcG9ydCB7IExvZ2dlciB9IGZyb20gXCJAL2xvZ2dlclwiO1xuXG5jb25zdCBsb2dnZXIgPSBMb2dnZXIuY3JlYXRlKGltcG9ydC5tZXRhLnVybCk7XG5cbmNvbnN0IEVOVFJJRVMgPSBTeW1ib2woXCJFTlRSSUVTXCIpO1xuXG5leHBvcnQgaW50ZXJmYWNlIEdvYWxXb3JrZXIge1xuICBkb1dvcmsoKTogUHJvbWlzZTx2b2lkPjtcbiAgdXBkYXRlUHJvZ3Jlc3MoZXZlbnQ6IHsgbG9hZGVkOiBudW1iZXIsIHRvdGFsOiBudW1iZXIgfSk6IHZvaWQ7XG5cbiAgZ2V0IG5hbWUoKTogc3RyaW5nIHwgdW5kZWZpbmVkO1xuICBnZXQgb3V0cHV0KCk6IHN0cmluZyB8IHVuZGVmaW5lZDtcbiAgZ2V0IGRlcGVuZHMoKTogc3RyaW5nW107XG59O1xuXG5leHBvcnQgY2xhc3MgR29hbENvbGxlY3Rpb24ge1xuICBwcml2YXRlIFtFTlRSSUVTXTogQXJyYXk8R29hbFdvcmtlcj47XG5cbiAgcHJpdmF0ZSBjb25zdHJ1Y3RvcigpIHtcbiAgICB0aGlzW0VOVFJJRVNdID0gbmV3IEFycmF5PEdvYWxXb3JrZXI+O1xuICB9XG5cbiAgcHVibGljIGdldCBFTlRSSUVTKCkge1xuICAgIHJldHVybiB0aGlzW0VOVFJJRVNdO1xuICB9XG5cbiAgcHVibGljIHN0YXRpYyBjcmVhdGUoKSB7XG4gICAgcmV0dXJuIE9iamVjdC5zZWFsKG5ldyBHb2FsQ29sbGVjdGlvbik7XG4gIH1cblxuICBwdWJsaWMgYWRkKHdvcmtlcjogR29hbFdvcmtlcikge1xuICAgIGlmICh3b3JrZXIubmFtZSAmJiB0aGlzW0VOVFJJRVNdLmZpbmQoKGkpID0+IGkubmFtZSA9PT0gd29ya2VyLm5hbWUpKVxuICAgICAgdGhyb3cgbmV3IEVycm9yKGBObWFlIFwiJHt3b3JrZXIubmFtZX1cIiBleGlzdHNgKTtcbiAgICBpZiAod29ya2VyLm91dHB1dCAmJiB0aGlzW0VOVFJJRVNdLmZpbmQoKGkpID0+IGkub3V0cHV0ID09PSB3b3JrZXIub3V0cHV0KSlcbiAgICAgIHRocm93IG5ldyBFcnJvcihgT3V0cHV0IFwiJHt3b3JrZXIub3V0cHV0fVwiIGV4aXN0c2ApO1xuICAgIHRoaXNbRU5UUklFU10ucHVzaCh3b3JrZXIpO1xuICB9XG5cbiAgcHVibGljIGdldFRhcmdldChuYW1lOiBzdHJpbmcpOiBHb2FsV29ya2VyIHwgdW5kZWZpbmVkIHtcbiAgICBpZiAoIW5hbWUpXG4gICAgICByZXR1cm4gdW5kZWZpbmVkO1xuICAgIHJldHVybiB0aGlzW0VOVFJJRVNdLmZpbmQoKGkpID0+IGkubmFtZSA9PT0gbmFtZSk7XG4gIH1cblxuICBwcml2YXRlIGFkZFRhcmdldExpc3RJbXBsKG5hbWU6IHN0cmluZywgcmVzdWx0OiBBcnJheTxHb2FsV29ya2VyPikge1xuICAgIGlmIChyZXN1bHQuZmluZChpID0+IGkubmFtZSA9PT0gbmFtZSB8fCBpLm91dHB1dCA9PT0gbmFtZSkpIHtcbiAgICAgIHJldHVybjtcbiAgICB9XG5cbiAgICBjb25zdCBnb2FsID0gdGhpc1tFTlRSSUVTXS5maW5kKGkgPT4gaS5uYW1lID09PSBuYW1lIHx8IChpLm91dHB1dCA9PT0gbmFtZSkpO1xuICAgIGlmICghZ29hbCkge1xuICAgICAgcmV0dXJuO1xuICAgIH1cblxuICAgIGZvciAoY29uc3QgaXRlciBvZiBnb2FsLmRlcGVuZHMpIHtcbiAgICAgIHRoaXMuYWRkVGFyZ2V0TGlzdEltcGwoaXRlci50b1N0cmluZygpLCByZXN1bHQpO1xuICAgIH1cblxuICAgIHJlc3VsdC5wdXNoKGdvYWwpO1xuICB9XG4gIFxuICBwdWJsaWMgZ2V0VGFyZ2V0TGlzdChuYW1lOnN0cmluZykge1xuICAgIGNvbnN0IHJlc3VsdCA9IG5ldyBBcnJheTxHb2FsV29ya2VyPjtcbiAgICB0aGlzLmFkZFRhcmdldExpc3RJbXBsKG5hbWUsIHJlc3VsdCk7XG4gICAgcmV0dXJuIHJlc3VsdDtcbiAgfVxuICBcbiAgcHVibGljIHRvSlNPTigpIHtcbiAgICByZXR1cm4gdGhpc1tFTlRSSUVTXTtcbiAgfVxufTtcbiIsIi8qXG4gKiBNSVQgTGljZW5zZVxuICpcbiAqIENvcHlyaWdodCAoYykgMjAyNSAgWXVyaWkgWWFrdWJpbiAoeXVyaWkueWFrdWJpbkBnbWFpbC5jb20pXG4gKlxuICogUGVybWlzc2lvbiBpcyBncmFudGVkIHRvIHVzZSwgY29weSwgbW9kaWZ5LCBhbmQgZGlzdHJpYnV0ZSB0aGlzIHNvZnR3YXJlXG4gKiB1bmRlciB0aGUgTUlUIExpY2Vuc2UuIFNlZSBMSUNFTlNFIGZpbGUgZm9yIGRldGFpbHMuXG4gKi9cblxuaW1wb3J0IHsgVXNlckluZGlyZWN0VGFyZ2V0IH0gZnJvbSBcIkAvY29yZS9UYXJnZXRcIjtcbmltcG9ydCB7IEFic29sdXRlUGF0aCB9IGZyb20gXCJAL2NvcmUvQWJzb2x1dGVQYXRoXCI7XG5pbXBvcnQgeyBTeXN0ZW1TY29wZSB9IGZyb20gXCJAL2NvcmUvU3lzdGVtU2NvcGVcIjtcblxuY29uc3QgVkFMVUUgICAgICAgPSBTeW1ib2woXCJWQUxVRVwiKTtcbmNvbnN0IERFU1RJTkFUSU9OID0gU3ltYm9sKFwiREVTVElOQVRJT05cIik7XG5jb25zdCBCQVNFX0RJUiAgICA9IFN5bWJvbChcIkJBU0VfRElSXCIpO1xuXG5leHBvcnQgY2xhc3MgSW5zdGFsbEVudGl0eSB7XG4gIHByaXZhdGUgW1ZBTFVFXTogQWJzb2x1dGVQYXRoIHwgVXNlckluZGlyZWN0VGFyZ2V0O1xuICBwcml2YXRlIFtERVNUSU5BVElPTl06IEFic29sdXRlUGF0aDtcbiAgcHJpdmF0ZSBbQkFTRV9ESVJdOiBBYnNvbHV0ZVBhdGggfCBudWxsO1xuXG4gIHByaXZhdGUgY29uc3RydWN0b3Ioc2NvcGU6IFN5c3RlbVNjb3BlLCB2YWx1ZTogc3RyaW5nIHwgQWJzb2x1dGVQYXRoIHwgVXNlckluZGlyZWN0VGFyZ2V0LCBwYXJhbXM6IHN0cmluZyB8IGFueSkge1xuICAgIGxldCBkZXN0aW5hdGlvbjogc3RyaW5nIHwgQWJzb2x1dGVQYXRoIHwgdW5kZWZpbmVkO1xuICAgIGxldCBiYXNlRGlyO1xuICAgIGlmICh0eXBlb2YgcGFyYW1zID09PSBcInN0cmluZ1wiKVxuICAgICAgZGVzdGluYXRpb24gPSBwYXJhbXM7XG4gICAgZWxzZSBpZiAocGFyYW1zKSB7XG4gICAgICBkZXN0aW5hdGlvbiA9IHBhcmFtcy5kZXN0aW5hdGlvbjtcbiAgICAgIGJhc2VEaXIgPSBwYXJhbXMuYmFzZURpcjtcbiAgICB9XG4gIFxuICAgIGlmICghZGVzdGluYXRpb24pXG4gICAgICB0aHJvdyBuZXcgRXJyb3IoYFBhcmFtZXRlciBkZXN0aW5hdGlvbiBpcyBub3Qgc3BlY2lmaWVkYCk7XG4gIFxuICAgIGlmIChiYXNlRGlyKVxuICAgICAgYmFzZURpciA9IHNjb3BlLlNPVVJDRV9ESVIucmVzb2x2ZShiYXNlRGlyKTtcbiAgXG4gICAgaWYgKHR5cGVvZiB2YWx1ZSA9PT0gXCJzdHJpbmdcIiB8fCB2YWx1ZSBpbnN0YW5jZW9mIEFic29sdXRlUGF0aCkge1xuICAgICAgdmFsdWUgPSBzY29wZS5TT1VSQ0VfRElSLnJlc29sdmUodmFsdWUudG9TdHJpbmcoKSkgYXMgQWJzb2x1dGVQYXRoO1xuICAgICAgdmFsdWUgPSBBYnNvbHV0ZVBhdGguY3JlYXRlKHZhbHVlKTtcbiAgICAgIGJhc2VEaXIgPSBiYXNlRGlyIHx8IHZhbHVlLmRpcm5hbWUoKTtcbiAgICB9XG4gICAgZWxzZSBpZiAoISh2YWx1ZSBpbnN0YW5jZW9mIFVzZXJJbmRpcmVjdFRhcmdldCkpIHtcbiAgICAgIHRocm93IG5ldyBFcnJvcihgTm90IHN1cHBvcnRldCB2YWx1ZSBvZiAke3ZhbHVlfWApO1xuICAgIH1cbiAgXG4gICAgdGhpc1tWQUxVRV0gPSB2YWx1ZTtcbiAgICB0aGlzW0RFU1RJTkFUSU9OXSA9IEFic29sdXRlUGF0aC5jcmVhdGUoc2NvcGUuSU5TVEFMTF9QUkVGSVgucmVzb2x2ZShkZXN0aW5hdGlvbi50b1N0cmluZygpKS50b1N0cmluZygpKTtcbiAgICB0aGlzW0JBU0VfRElSXSA9IGJhc2VEaXIgPyBBYnNvbHV0ZVBhdGguY3JlYXRlKGJhc2VEaXIudG9TdHJpbmcoKSkgOiBudWxsO1xuICB9XG4gIFxuICBwdWJsaWMgc3RhdGljIGNyZWF0ZShzY29wZTogYW55LCB2YWx1ZTogc3RyaW5nIHwgQWJzb2x1dGVQYXRoIHwgVXNlckluZGlyZWN0VGFyZ2V0LCBwYXJhbXM6IHN0cmluZyB8IGFueSkge1xuICAgIHJldHVybiBPYmplY3Quc2VhbChuZXcgSW5zdGFsbEVudGl0eShzY29wZSwgdmFsdWUsIHBhcmFtcykpO1xuICB9XG5cbiAgcHVibGljIGdldCBWQUxVRSAoKSB7XG4gICAgcmV0dXJuIHRoaXNbVkFMVUVdO1xuICB9XG5cbiAgcHVibGljIGdldCBERVNUSU5BVElPTiAoKSB7XG4gICAgcmV0dXJuIHRoaXNbREVTVElOQVRJT05dO1xuICB9XG5cbiAgcHVibGljIGdldCBCQVNFX0RJUiAoKSB7XG4gICAgcmV0dXJuIHRoaXNbQkFTRV9ESVJdO1xuICB9XG5cbiAgcHVibGljIHRvSlNPTigpOiBvYmplY3Qge1xuICAgIHJldHVybiB7XG4gICAgICBWQUxVRTogdGhpcy5WQUxVRSxcbiAgICAgIERFU1RJTkFUSU9OOiB0aGlzLkRFU1RJTkFUSU9OLFxuICAgICAgQkFTRV9ESVI6IHRoaXMuQkFTRV9ESVIsXG4gICAgfTtcbiAgfVxufTtcbiIsIi8qXG4gKiBNSVQgTGljZW5zZVxuICpcbiAqIENvcHlyaWdodCAoYykgMjAyNSAgWXVyaWkgWWFrdWJpbiAoeXVyaWkueWFrdWJpbkBnbWFpbC5jb20pXG4gKlxuICogUGVybWlzc2lvbiBpcyBncmFudGVkIHRvIHVzZSwgY29weSwgbW9kaWZ5LCBhbmQgZGlzdHJpYnV0ZSB0aGlzIHNvZnR3YXJlXG4gKiB1bmRlciB0aGUgTUlUIExpY2Vuc2UuIFNlZSBMSUNFTlNFIGZpbGUgZm9yIGRldGFpbHMuXG4gKi9cblxuY29uc3QgTkFNRSA9IFN5bWJvbChcIk5BTUVcIik7XG5cbmV4cG9ydCBjbGFzcyBJbnRlcmZhY2VJbmNsdWRlcyB7XG4gIHByaXZhdGUgW05BTUVdOiBzdHJpbmc7XG5cbiAgcHJpdmF0ZSBjb25zdHJ1Y3RvcihuYW1lOiBzdHJpbmcpIHtcbiAgICB0aGlzW05BTUVdID0gbmFtZTtcbiAgfVxuXG4gIHB1YmxpYyBnZXQgdGFyZ2V0TmFtZSgpIHtcbiAgICByZXR1cm4gdGhpc1tOQU1FXTtcbiAgfVxuXG4gIHB1YmxpYyB0b1N0cmluZygpOiBzdHJpbmcge1xuICAgIHJldHVybiBcIiR7XCIgKyB0aGlzW05BTUVdICsgXCIuaW5jbHVkZXN9XCI7XG4gIH1cblxuICBwdWJsaWMgdG9KU09OKCkge1xuICAgIHJldHVybiB0aGlzLnRvU3RyaW5nKCk7XG4gIH1cblxuICBwdWJsaWMgc3RhdGljIGNyZWF0ZShuYW1lOiBzdHJpbmcpIHtcbiAgICByZXR1cm4gT2JqZWN0LnNlYWwobmV3IEludGVyZmFjZUluY2x1ZGVzKG5hbWUpKTtcbiAgfVxuXG4gIHB1YmxpYyBzdGF0aWMgZW5zdXJlSW5zdGFuY2UodmFsdWU6IGFueSkge1xuICAgIGlmICh2YWx1ZSBpbnN0YW5jZW9mIEludGVyZmFjZUluY2x1ZGVzKVxuICAgICAgcmV0dXJuIHZhbHVlO1xuICAgIHRocm93IG5ldyBFcnJvcihgVGhlICcke3ZhbHVlfScgaXMgbm90IGEgSW50ZXJmYWNlSW5jbHVkZXNgKTtcbiAgfVxufTtcbiIsIi8qXG4gKiBNSVQgTGljZW5zZVxuICpcbiAqIENvcHlyaWdodCAoYykgMjAyNSAgWXVyaWkgWWFrdWJpbiAoeXVyaWkueWFrdWJpbkBnbWFpbC5jb20pXG4gKlxuICogUGVybWlzc2lvbiBpcyBncmFudGVkIHRvIHVzZSwgY29weSwgbW9kaWZ5LCBhbmQgZGlzdHJpYnV0ZSB0aGlzIHNvZnR3YXJlXG4gKiB1bmRlciB0aGUgTUlUIExpY2Vuc2UuIFNlZSBMSUNFTlNFIGZpbGUgZm9yIGRldGFpbHMuXG4gKi9cblxuY29uc3QgTkFNRSA9IFN5bWJvbChcIk5BTUVcIik7XG5cbmV4cG9ydCBjbGFzcyBJbnRlcmZhY2VPYmplY3RzIHtcbiAgcHJpdmF0ZSBbTkFNRV06IHN0cmluZztcblxuICBwcml2YXRlIGNvbnN0cnVjdG9yKG5hbWU6IHN0cmluZykge1xuICAgIHRoaXNbTkFNRV0gPSBuYW1lO1xuICB9XG5cbiAgcHVibGljIHN0YXRpYyBjcmVhdGUobmFtZTogc3RyaW5nKSB7XG4gICAgcmV0dXJuIE9iamVjdC5zZWFsKG5ldyBJbnRlcmZhY2VPYmplY3RzKG5hbWUpKTtcbiAgfVxuXG4gIHB1YmxpYyBzdGF0aWMgZW5zdXJlSW5zdGFuY2UodmFsdWU6IGFueSk6IEludGVyZmFjZU9iamVjdHMge1xuICAgIGlmICh2YWx1ZSBpbnN0YW5jZW9mIEludGVyZmFjZU9iamVjdHMpXG4gICAgICByZXR1cm4gdmFsdWU7XG4gICAgdGhyb3cgbmV3IEVycm9yKGBUaGUgJyR7dmFsdWV9JyBpcyBub3QgYSBJbnRlcmZhY2VPYmplY3RzYCk7XG4gIH1cblxuICBwdWJsaWMgZ2V0IHRhcmdldE5hbWUoKTogc3RyaW5nIHtcbiAgICByZXR1cm4gdGhpc1tOQU1FXTtcbiAgfVxuXG4gIHB1YmxpYyB0b1N0cmluZygpOiBzdHJpbmcge1xuICAgIHJldHVybiBcIiR7XCIgKyB0aGlzW05BTUVdICsgXCIub2JqZWN0c31cIjtcbiAgfVxuXG4gIHB1YmxpYyB0b0pTT04oKTogc3RyaW5nIHtcbiAgICByZXR1cm4gdGhpcy50b1N0cmluZygpO1xuICB9XG59O1xuIiwiLypcbiAqIE1JVCBMaWNlbnNlXG4gKlxuICogQ29weXJpZ2h0IChjKSAyMDI1ICBZdXJpaSBZYWt1YmluICh5dXJpaS55YWt1YmluQGdtYWlsLmNvbSlcbiAqXG4gKiBQZXJtaXNzaW9uIGlzIGdyYW50ZWQgdG8gdXNlLCBjb3B5LCBtb2RpZnksIGFuZCBkaXN0cmlidXRlIHRoaXMgc29mdHdhcmVcbiAqIHVuZGVyIHRoZSBNSVQgTGljZW5zZS4gU2VlIExJQ0VOU0UgZmlsZSBmb3IgZGV0YWlscy5cbiAqL1xuXG5pbXBvcnQgeyBTY29wZUhlbHBlciB9IGZyb20gXCJAL2NvcmUvU2NvcGVcIjtcblxuY29uc3QgTkFNRSAgICAgID0gU3ltYm9sKFwiTkFNRVwiKTtcbmNvbnN0IFZBUklBQkxFUyA9IFN5bWJvbChcIlZBUklBQkxFU1wiKTtcblxuZXhwb3J0IGNsYXNzIEludGVyZmFjZVNjcmlwdCB7XG4gIHByaXZhdGUgW05BTUVdOiBzdHJpbmc7XG4gIHByaXZhdGUgW1ZBUklBQkxFU106IGFueTtcblxuICBwcml2YXRlIGNvbnN0cnVjdG9yKG5hbWU6IHN0cmluZykge1xuICAgIHRoaXNbTkFNRV0gPSBuYW1lO1xuICAgIHRoaXNbVkFSSUFCTEVTXSA9IHt9O1xuICB9XG5cbiAgcHVibGljIGdldCBOQU1FKCkge1xuICAgIHJldHVybiB0aGlzW05BTUVdO1xuICB9XG5cbiAgcHVibGljIGdldCB2YXJpYWJsZXMoKSB7XG4gICAgcmV0dXJuIHRoaXNbVkFSSUFCTEVTXTtcbiAgfVxuXG4gIHB1YmxpYyBtZXJnZVZhcmlhYmxlcyh2YXJpYWJsZXM6IGFueSkge1xuICAgIFNjb3BlSGVscGVyLm1lcmdlVmFyaWFibGVzKHRoaXNbVkFSSUFCTEVTXSwgdmFyaWFibGVzKTtcbiAgfVxuXG4gIHB1YmxpYyB0b0pTT04oKTogb2JqZWN0IHtcbiAgICByZXR1cm4ge1xuICAgICAgbmFtZTogdGhpc1tOQU1FXSxcbiAgICAgIHZhcmlhYmxlTWFwOiB0aGlzW1ZBUklBQkxFU10sXG4gICAgfTtcbiAgfVxuICBcbiAgcHVibGljIHRvU3RyaW5nKCk6IHN0cmluZyB7XG4gICAgcmV0dXJuIHRoaXNbTkFNRV07XG4gIH1cblxuICBwdWJsaWMgc3RhdGljIGNyZWF0ZShuYW1lOiBzdHJpbmcpIHtcbiAgICByZXR1cm4gT2JqZWN0LnNlYWwobmV3IEludGVyZmFjZVNjcmlwdChuYW1lKSk7XG4gIH1cblxuICBwdWJsaWMgc3RhdGljIGVuc3VyZUluc3RhbmNlKHZhbHVlOiBhbnkpIHtcbiAgICBpZiAodmFsdWUgaW5zdGFuY2VvZiBJbnRlcmZhY2VTY3JpcHQpXG4gICAgICByZXR1cm4gdmFsdWU7XG4gICAgdGhyb3cgbmV3IEVycm9yKGBUaGUgJyR7dmFsdWV9JyBpcyBub3QgYSBJbnRlcmZhY2VTY3JpcHRgKTtcbiAgfVxufTtcbiIsIi8qXG4gKiBNSVQgTGljZW5zZVxuICpcbiAqIENvcHlyaWdodCAoYykgMjAyNSAgWXVyaWkgWWFrdWJpbiAoeXVyaWkueWFrdWJpbkBnbWFpbC5jb20pXG4gKlxuICogUGVybWlzc2lvbiBpcyBncmFudGVkIHRvIHVzZSwgY29weSwgbW9kaWZ5LCBhbmQgZGlzdHJpYnV0ZSB0aGlzIHNvZnR3YXJlXG4gKiB1bmRlciB0aGUgTUlUIExpY2Vuc2UuIFNlZSBMSUNFTlNFIGZpbGUgZm9yIGRldGFpbHMuXG4gKi9cblxuaW1wb3J0IHsgSU1ha2VDb250ZXh0IH0gZnJvbSBcIkAvY29yZS9NYWtlSW50ZXJmYWNlc1wiO1xuaW1wb3J0IHsgZmlsZUV4aXN0c1N5bmMgfSBmcm9tIFwiQC91dGlscy9GaWxlU3lzdGVtXCI7XG5pbXBvcnQgeyBJbnRlcmZhY2VTY3JpcHQgfSBmcm9tIFwiQC9jb3JlL0ludGVyZmFjZVNjcmlwdFwiO1xuaW1wb3J0IHsgSW5zdGFsbEVudGl0eSB9IGZyb20gXCJAL2NvcmUvSW5zdGFsbEVudGl0eVwiO1xuaW1wb3J0IHsgT2JqZWN0TGlicmFyeSwgU3RhdGljTGlicmFyeSwgU2hhcmVkTGlicmFyeSwgRXhlY3V0YWJsZSwgQmFzZVRhcmdldCwgVXNlckluZGlyZWN0VGFyZ2V0IH0gZnJvbSBcIkAvY29yZS9UYXJnZXRcIjtcbmltcG9ydCB7IEN1c3RvbVNjcmlwdCB9IGZyb20gXCJAL2NvcmUvQ3VzdG9tU2NyaXB0XCI7XG5pbXBvcnQgeyBQcm9qZWN0Q29udGV4dCB9IGZyb20gXCJAL2NvcmUvUHJvamVjdENvbnRleHRcIjtcbmltcG9ydCB7IFNjb3BlSGVscGVyLCBWYXJpYW50TWFwLCBWYXJpYWJsZU1hcCB9IGZyb20gXCJAL2NvcmUvU2NvcGVcIjtcbmltcG9ydCB7IHJlcXVpcmVTeW5jIH0gZnJvbSBcIkAvdXRpbHMvTW9kdWxlXCI7XG5pbXBvcnQgeyBDVVNUT01fVkFSSUFCTEVfR1JPVVAgfSBmcm9tIFwiQC9Db25zdGFudHNcIjtcbmltcG9ydCB7IEFic29sdXRlUGF0aCB9IGZyb20gXCJAL2NvcmUvQWJzb2x1dGVQYXRoXCI7XG5pbXBvcnQgeyBMb2dnZXIgfSBmcm9tIFwiQC9sb2dnZXJcIjtcblxuY29uc3QgbG9nZ2VyID0gTG9nZ2VyLmNyZWF0ZShpbXBvcnQubWV0YS51cmwpO1xuXG5leHBvcnQgY2xhc3MgTG9jYWxNYWtlQ29udGV4dCBpbXBsZW1lbnRzIElNYWtlQ29udGV4dCB7XG4gIHByaXZhdGUgX3Njb3BlOiBWYXJpYWJsZU1hcDtcbiAgcHJpdmF0ZSBfcHJvamVjdDogUHJvamVjdENvbnRleHQ7XG4gIHByaXZhdGUgX3RhcmdldHMgPSBuZXcgTWFwPHN0cmluZywgQmFzZVRhcmdldD4oKTtcbiAgcHJpdmF0ZSBfaW5kaXJlY3RUYXJnZXRzID0gbmV3IE1hcDxzdHJpbmcsIFVzZXJJbmRpcmVjdFRhcmdldD4oKTtcblxuICBwdWJsaWMgY29uc3RydWN0b3Ioc2NvcGU6IFZhcmlhYmxlTWFwLCBwcm9qZWN0OiBQcm9qZWN0Q29udGV4dCkge1xuICAgIHRoaXMuX3Njb3BlID0gc2NvcGU7XG4gICAgdGhpcy5fcHJvamVjdCA9IHByb2plY3Q7XG4gIH1cblxuICBwdWJsaWMgZ2V0IHRhcmdldHMoKSB7XG4gICAgcmV0dXJuIHRoaXMuX3RhcmdldHM7XG4gIH1cblxuICBwdWJsaWMgZ2V0IGluZGlyZWN0VGFyZ2V0cygpIHtcbiAgICByZXR1cm4gdGhpcy5faW5kaXJlY3RUYXJnZXRzO1xuICB9XG5cbiAgcHVibGljIGV4ZWN1dGVTY3JpcHQoc2NyaXB0OiBhbnksIHBhcmFtczogYW55KSB7XG4gICAgdGhpcy5fcHJvamVjdC5leGVjdXRlU2NyaXB0U3luYyh0aGlzLl9zY29wZSwgc2NyaXB0LCBwYXJhbXMpO1xuICB9XG5cbiAgcHVibGljIGdldENhY2hlVmFyaWFibGVzKCk6IGFueSB7XG4gICAgcmV0dXJuIFNjb3BlSGVscGVyLmdldFZhcmlhYmxlc0J5R3JvdXAodGhpcy5fc2NvcGUsIENVU1RPTV9WQVJJQUJMRV9HUk9VUCk7XG4gIH1cblxuICBwdWJsaWMgYWRkQ2FjaGVWYXJpYWJsZXMocGFyYW1zOiBzdHJpbmcgfCBWYXJpYW50TWFwKTogdm9pZCB7XG4gICAgbGV0IHZhcmlhYmxlcyA9IHBhcmFtcztcbiAgICBpZiAodHlwZW9mIHBhcmFtcyA9PT0gXCJzdHJpbmdcIikge1xuICAgICAgY29uc3QgZmlsZW5hbWUgPSBTY29wZUhlbHBlci5nZXQodGhpcy5fc2NvcGUsIFwiU09VUkNFX0RJUlwiKS5yZXNvbHZlKHBhcmFtcykudG9TdHJpbmcoKTtcbiAgICAgIGlmICghZmlsZUV4aXN0c1N5bmMoZmlsZW5hbWUpKVxuICAgICAgICByZXR1cm47XG4gICAgICB2YXJpYWJsZXMgPSByZXF1aXJlU3luYyhmaWxlbmFtZSk7XG4gICAgfVxuXG4gICAgU2NvcGVIZWxwZXIuZGVmaW5lVmFyaWFibGVzSW5WYXJpYWJsZU1hcCh0aGlzLl9zY29wZSwgQ1VTVE9NX1ZBUklBQkxFX0dST1VQLCB2YXJpYWJsZXMpO1xuICB9XG5cbiAgcHVibGljIGFkZEluY2x1ZGVEaXJlY3RvcmllcyguLi5kaXJzOiBhbnlbXSkge1xuICAgIGNvbnN0IHNvdXJjZURpciA9IFNjb3BlSGVscGVyLmdldCh0aGlzLl9zY29wZSwgXCJTT1VSQ0VfRElSXCIpO1xuICAgIGZvciAoY29uc3QgaXRlciBvZiBkaXJzLmZsYXQoKSlcbiAgICAgIFNjb3BlSGVscGVyLmdldCh0aGlzLl9zY29wZSwgXCJJTkNMVURFU1wiKS5wdXNoKHNvdXJjZURpci5yZXNvbHZlKGl0ZXIpKTtcbiAgfVxuXG4gIHB1YmxpYyBhZGRTdWJkaXJlY3Rvcnkoc291cmNlRGlyOiBzdHJpbmcgfCBBYnNvbHV0ZVBhdGgsIGJpbmFyeURpcj86IHN0cmluZyB8IEFic29sdXRlUGF0aCk6IHZvaWQge1xuICAgIHRoaXMuX3Byb2plY3QuYWRkU3ViZGlyZWN0b3J5KHRoaXMuX3Njb3BlLCBzb3VyY2VEaXIsIGJpbmFyeURpcik7XG4gIH1cblxuICBwdWJsaWMgYWRkQ3VzdG9tU2NyaXB0KHNjcmlwdDogc3RyaW5nLCBwYXJhbXM6IGFueSk6IEN1c3RvbVNjcmlwdCB7XG4gICAgY29uc3QgbmV3VmFyaWFibGVNYXAgPSBTY29wZUhlbHBlci5jbG9uZVZhcmlhYmxlTWFwKHRoaXMuX3Njb3BlKTtcbiAgICBTY29wZUhlbHBlci5leHRlbmRWYXJpYWJsZU1hcEJ5VmFsdWVzKG5ld1ZhcmlhYmxlTWFwLCBDVVNUT01fVkFSSUFCTEVfR1JPVVAsIHBhcmFtcyk7XG4gICAgU2NvcGVIZWxwZXIuc2V0KG5ld1ZhcmlhYmxlTWFwLCBcIlNDUklQVF9NT0RVTEVcIiwgc2NyaXB0KTtcbiAgICByZXR1cm4gdGhpcy5fcHJvamVjdC5hZGRDdXN0b21TY3JpcHQobmV3VmFyaWFibGVNYXApO1xuICB9XG5cbiAgcHVibGljIHRhcmdldChuYW1lOiBzdHJpbmcpOiBVc2VySW5kaXJlY3RUYXJnZXQge1xuICAgIGxldCB0YXJnZXQgPSB0aGlzLl9pbmRpcmVjdFRhcmdldHMuZ2V0KG5hbWUpO1xuICAgIGlmICghdGFyZ2V0KSB7XG4gICAgICBjb25zdCBpbXBsID0gdGhpcy5fcHJvamVjdC5nZXRUYXJnZXQobmFtZSk7XG4gICAgICB0YXJnZXQgPSBVc2VySW5kaXJlY3RUYXJnZXQuY3JlYXRlKGltcGwsIHRoaXMuX3Njb3BlLCBuYW1lKVxuICAgICAgdGhpcy5faW5kaXJlY3RUYXJnZXRzLnNldChuYW1lLCB0YXJnZXQpO1xuICAgIH1cbiAgICByZXR1cm4gdGFyZ2V0O1xuICB9XG5cbiAgcHVibGljIHNjcmlwdChuYW1lOiBzdHJpbmcpOiBJbnRlcmZhY2VTY3JpcHQge1xuICAgIHJldHVybiB0aGlzLl9wcm9qZWN0LmdldEludGVyZmFjZVNjcmlwdCh0aGlzLl9zY29wZSwgbmFtZSk7XG4gIH1cblxuICBwdWJsaWMgaW5zdGFsbCh2YWx1ZTogYW55LCBwYXJhbXM6IGFueSk6IHZvaWQge1xuICAgIGNvbnN0IHNjb3BlID0gU2NvcGVIZWxwZXIuY3JlYXRlVmFyaWFibGVWYWx1ZXModGhpcy5fc2NvcGUpO1xuICAgIGZvciAoY29uc3QgaXQgb2YgWyB2YWx1ZSBdLmZsYXQoKSkge1xuICAgICAgY29uc3QgaXRlciA9IChpdCBpbnN0YW5jZW9mIEJhc2VUYXJnZXQpID8gdGhpcy50YXJnZXQoaXQudGFyZ2V0TmFtZSkgOiBpdDtcbiAgICAgIGNvbnN0IGVudGl0eSA9IEluc3RhbGxFbnRpdHkuY3JlYXRlKHNjb3BlLCBpdGVyLCBwYXJhbXMpO1xuICAgICAgdGhpcy5fcHJvamVjdC5hZGRJbnN0YWxsRW50cnkoZW50aXR5KTtcbiAgICB9XG4gIH1cblxuICBwdWJsaWMgYWRkT2JqZWN0TGlicmFyeShuYW1lOiBhbnksIC4uLnNvdXJjZXM6IGFueVtdKTogT2JqZWN0TGlicmFyeSB7XG4gICAgY29uc3QgdGFyZ2V0ID0gdGhpcy5fcHJvamVjdC5hZGRPYmplY3RMaWJyYXJ5KHRoaXMuX3Njb3BlLCBuYW1lKTtcbiAgICB0aGlzLl90YXJnZXRzLnNldChuYW1lLCB0YXJnZXQpO1xuICAgIHRhcmdldC5hZGRTb3VyY2VzKC4uLnNvdXJjZXMpO1xuICAgIHJldHVybiB0YXJnZXQ7XG4gIH1cblxuICBwdWJsaWMgYWRkU3RhdGljTGlicmFyeShuYW1lOiBhbnksIC4uLnNvdXJjZXM6IGFueVtdKTogU3RhdGljTGlicmFyeSB7XG4gICAgY29uc3QgdGFyZ2V0ID0gdGhpcy5fcHJvamVjdC5hZGRTdGF0aWNMaWJyYXJ5KHRoaXMuX3Njb3BlLCBuYW1lKTtcbiAgICB0aGlzLl90YXJnZXRzLnNldChuYW1lLCB0YXJnZXQpO1xuICAgIHRhcmdldC5hZGRTb3VyY2VzKC4uLnNvdXJjZXMpO1xuICAgIHJldHVybiB0YXJnZXQ7XG4gIH1cblxuICBwdWJsaWMgYWRkU2hhcmVkTGlicmFyeShuYW1lOiBhbnksIC4uLnNvdXJjZXM6IGFueVtdKTogU2hhcmVkTGlicmFyeSB7XG4gICAgY29uc3QgdGFyZ2V0ID0gdGhpcy5fcHJvamVjdC5hZGRTaGFyZWRMaWJyYXJ5KHRoaXMuX3Njb3BlLCBuYW1lKTtcbiAgICB0aGlzLl90YXJnZXRzLnNldChuYW1lLCB0YXJnZXQpO1xuICAgIHRhcmdldC5hZGRTb3VyY2VzKC4uLnNvdXJjZXMpO1xuICAgIHJldHVybiB0YXJnZXQ7XG4gIH1cblxuICBwdWJsaWMgYWRkRXhlY3V0YWJsZShuYW1lOiBzdHJpbmcsIC4uLnNvdXJjZXM6IGFueVtdKTogRXhlY3V0YWJsZSB7XG4gICAgY29uc3QgdGFyZ2V0ID0gdGhpcy5fcHJvamVjdC5hZGRFeGVjdXRhYmxlKHRoaXMuX3Njb3BlLCBuYW1lKTtcbiAgICB0aGlzLl90YXJnZXRzLnNldChuYW1lLCB0YXJnZXQpO1xuICAgIHRhcmdldC5hZGRTb3VyY2VzKC4uLnNvdXJjZXMpO1xuICAgIHJldHVybiB0YXJnZXQ7XG4gIH1cbn07XG4iLCIvKlxuICogTUlUIExpY2Vuc2VcbiAqXG4gKiBDb3B5cmlnaHQgKGMpIDIwMjUgIFl1cmlpIFlha3ViaW4gKHl1cmlpLnlha3ViaW5AZ21haWwuY29tKVxuICpcbiAqIFBlcm1pc3Npb24gaXMgZ3JhbnRlZCB0byB1c2UsIGNvcHksIG1vZGlmeSwgYW5kIGRpc3RyaWJ1dGUgdGhpcyBzb2Z0d2FyZVxuICogdW5kZXIgdGhlIE1JVCBMaWNlbnNlLiBTZWUgTElDRU5TRSBmaWxlIGZvciBkZXRhaWxzLlxuICovXG5cbmltcG9ydCB7IFByb2plY3RDb250ZXh0IH0gZnJvbSBcIkAvY29yZS9Qcm9qZWN0Q29udGV4dFwiO1xuaW1wb3J0IHsgVmFyaWFibGVNYXAgfSBmcm9tIFwiQC9jb3JlL1Njb3BlXCI7XG5pbXBvcnQgeyBCYXNlQ29udGV4dCwgY3JlYXRlQ29udGV4dCB9IGZyb20gXCJAL2NvcmUvQmFzZUNvbnRleHRcIjtcblxuY29uc3QgR0xPQkFMID0gU3ltYm9sKFwiR0xPQkFMXCIpO1xuY29uc3QgU0NPUEUgPSBTeW1ib2woXCJTQ09QRVwiKTtcblxuZXhwb3J0IGNsYXNzIFBsdWdpbkNvbnRleHQgZXh0ZW5kcyBCYXNlQ29udGV4dCB7XG4gIFtHTE9CQUxdOiBQcm9qZWN0Q29udGV4dDtcbiAgW1NDT1BFXTogVmFyaWFibGVNYXA7XG5cbiAgcHVibGljIGNvbnN0cnVjdG9yKGdsb2JhbDogUHJvamVjdENvbnRleHQsIHZhcmlhYmxlTWFwOiBWYXJpYWJsZU1hcCkge1xuICAgIHN1cGVyKHZhcmlhYmxlTWFwKTtcbiAgICB0aGlzW0dMT0JBTF0gPSBnbG9iYWw7XG4gICAgdGhpc1tTQ09QRV0gPSB2YXJpYWJsZU1hcDtcbiAgfVxuXG4gIHB1YmxpYyBhZGRTdWJkaXJlY3RvcnlBbGlhcyhzcmM6IGFueSwgZGVzdDogYW55KSB7XG4gICAgdGhpc1tHTE9CQUxdLmFkZFN1YmRpcmVjdG9yeUFsaWFzKHRoaXNbU0NPUEVdLCBzcmMsIGRlc3QpO1xuICB9XG5cbiAgcHVibGljIHN0YXRpYyBjcmVhdGUoZ2xvYmFsOiBQcm9qZWN0Q29udGV4dCwgdmFyaWFibGVNYXA6IFZhcmlhYmxlTWFwKSB7XG4gICAgcmV0dXJuIGNyZWF0ZUNvbnRleHQobmV3IFBsdWdpbkNvbnRleHQoZ2xvYmFsLCB2YXJpYWJsZU1hcCkpO1xuICB9XG59O1xuIiwiLypcbiAqIE1JVCBMaWNlbnNlXG4gKlxuICogQ29weXJpZ2h0IChjKSAyMDI1ICBZdXJpaSBZYWt1YmluICh5dXJpaS55YWt1YmluQGdtYWlsLmNvbSlcbiAqXG4gKiBQZXJtaXNzaW9uIGlzIGdyYW50ZWQgdG8gdXNlLCBjb3B5LCBtb2RpZnksIGFuZCBkaXN0cmlidXRlIHRoaXMgc29mdHdhcmVcbiAqIHVuZGVyIHRoZSBNSVQgTGljZW5zZS4gU2VlIExJQ0VOU0UgZmlsZSBmb3IgZGV0YWlscy5cbiAqL1xuXG5pbXBvcnQgZnMgZnJvbSBcIm5vZGU6ZnNcIjtcbmltcG9ydCB1cmwgZnJvbSBcIm5vZGU6dXJsXCI7XG5pbXBvcnQgeyBzcGF3blN5bmMgfSBmcm9tIFwibm9kZTpjaGlsZF9wcm9jZXNzXCI7XG5cbmltcG9ydCB7IEFMTF9UQVJHRVQsIElOU1RBTExfVEFSR0VUIH0gZnJvbSBcIkAvQ29uc3RhbnRzXCI7XG5pbXBvcnQgeyBBYnNvbHV0ZVBhdGggfSBmcm9tIFwiQC9jb3JlL0Fic29sdXRlUGF0aFwiO1xuaW1wb3J0IHsgUGF0aCB9IGZyb20gXCJAL3V0aWxzL1BhdGhcIjtcbmltcG9ydCB7IGZpbGVFeGlzdHMsIGZpbGVFeGlzdHNTeW5jIH0gZnJvbSBcIkAvdXRpbHMvRmlsZVN5c3RlbVwiO1xuaW1wb3J0IHsgVGFyZ2V0Q29sbGVjdGlvbiwgVGFyZ2V0U3RydWN0Q29sbGVjdGlvbiB9IGZyb20gXCJAL2NvcmUvVGFyZ2V0Q29sbGVjdGlvblwiO1xuaW1wb3J0IHsgU2NyaXB0Q29sbGVjdGlvbiB9IGZyb20gXCJAL2NvcmUvU2NyaXB0Q29sbGVjdGlvblwiO1xuaW1wb3J0IHsgR29hbENvbGxlY3Rpb24gfSBmcm9tIFwiQC9jb3JlL0dvYWxDb2xsZWN0aW9uXCI7XG5pbXBvcnQgeyBJbnRlcmZhY2VTY3JpcHQgfSBmcm9tIFwiQC9jb3JlL0ludGVyZmFjZVNjcmlwdFwiO1xuaW1wb3J0IHsgVXNlck1ha2VDb250ZXh0IH0gZnJvbSBcIkAvY29yZS9Vc2VyTWFrZUNvbnRleHRcIjtcbmltcG9ydCB7IExvY2FsTWFrZUNvbnRleHQgfSBmcm9tIFwiQC9jb3JlL0xvY2FsTWFrZUNvbnRleHRcIjtcbmltcG9ydCB7IE9iamVjdExpYnJhcnksIFN0YXRpY0xpYnJhcnksIFNoYXJlZExpYnJhcnksIEV4ZWN1dGFibGUsIEJhc2VUYXJnZXQsIFVzZXJJbmRpcmVjdFRhcmdldCB9IGZyb20gXCJAL2NvcmUvVGFyZ2V0XCI7XG5pbXBvcnQgeyBTeXN0ZW1TY29wZSB9IGZyb20gXCJAL2NvcmUvU3lzdGVtU2NvcGVcIjtcbmltcG9ydCB7IGltcG9ydE1vZHVsZSwgcmVxdWlyZVN5bmMgfSBmcm9tIFwiQC91dGlscy9Nb2R1bGVcIjtcbmltcG9ydCB7IExvZ2dlciB9IGZyb20gXCJAL2xvZ2dlclwiO1xuaW1wb3J0IHsgSW5zdGFsbEVudGl0eSB9IGZyb20gXCJAL2NvcmUvSW5zdGFsbEVudGl0eVwiO1xuaW1wb3J0IHsgQ3VzdG9tU2NyaXB0IH0gZnJvbSBcIkAvY29yZS9DdXN0b21TY3JpcHRcIjtcbmltcG9ydCB7IFNjcmlwdENvbnRleHQgfSBmcm9tIFwiQC9jb3JlL1NjcmlwdENvbnRleHRcIjtcbmltcG9ydCB7IFNjb3BlSGVscGVyLCBWYXJpYWJsZU1hcCB9IGZyb20gXCIuL1Njb3BlXCI7XG5pbXBvcnQgeyBUYXJnZXRTdHJ1Y3QgfSBmcm9tIFwiLi9UYXJnZXRTdHJ1Y3RcIjtcbmltcG9ydCB7IFNvdXJjZUZpbGUgfSBmcm9tIFwiQC9jb3JlL1NvdXJjZUZpbGVcIjtcbmltcG9ydCB7IHBlcmZvcm1Db250ZXh0LCBjcmVhdGVWYXJpYWJsZU1hcEZvckRpcmVjdG9yeSB9IGZyb20gXCJAL2NvcmUvQmFzZUNvbnRleHRcIjtcblxuaW1wb3J0IEJ1aWxkaW5TY3JpcHRzIGZyb20gXCJAL2NvcmUvQnVpbGRpblNjcmlwdHNcIjtcblxuY29uc3QgbG9nZ2VyID0gTG9nZ2VyLmNyZWF0ZShpbXBvcnQubWV0YS51cmwpO1xuXG5jb25zdCBUQVJHRVRTID0gU3ltYm9sKFwiVEFSR0VUU1wiKTtcbmNvbnN0IENVU1RPTV9TQ1JJUFRTID0gU3ltYm9sKFwiQ1VTVE9NX1NDUklQVFNcIik7XG5jb25zdCBDQUNIRSA9IFN5bWJvbChcIkNBQ0hFXCIpO1xuY29uc3QgSU5TVEFMTF9MSVNUID0gU3ltYm9sKFwiSU5TVEFMTF9MSVNUXCIpO1xuY29uc3QgQlVJTFRJTl9TQ1JJUFRTID0gU3ltYm9sKFwiQlVJTFRJTl9TQ1JJUFRTXCIpO1xuY29uc3QgVEFSR0VUX0NPTExFQ1RJT04gPSBTeW1ib2woXCJUQVJHRVRfQ09MTEVDVElPTlwiKTtcblxudHlwZSBTdWJkaXJlY3RvcnlBbGlhcyA9IHtcbiAgW25hbWU6IHN0cmluZ106IEFic29sdXRlUGF0aCB8IG51bGw7XG59O1xuXG50eXBlIEludGVyZmFjZVNjcmlwdHMgPSB7XG4gIFtuYW1lOiBzdHJpbmddOiBJbnRlcmZhY2VTY3JpcHQ7XG59O1xuXG50eXBlIENhY2hlVmFyaWFibGVEZXNjcmlwdG9yID0ge1xuICB0eXBlPzogYW55O1xuICB2YWx1ZT86IGFueTtcbiAgZGVzY3JpcHRpb24/OiBzdHJpbmc7XG59O1xuXG50eXBlIENhY2hlVmFyaWFibGVEZXNjcmlwdG9ycyA9IHtcbiAgW25hbWU6IHN0cmluZ106IENhY2hlVmFyaWFibGVEZXNjcmlwdG9yO1xufTtcblxudHlwZSBCdWlsZGluU2NyaXB0cyA9IHtcbiAgW25hbWU6IHN0cmluZ106IEZ1bmN0aW9uO1xufTtcblxuZnVuY3Rpb24gZW5zdXJlVmFsdWVCeVR5cGUodHlwZTogYW55LCB2YWx1ZTogYW55KSB7XG4gIGlmIChBcnJheS5pc0FycmF5KHR5cGUpID8gdHlwZS5pbmNsdWRlcyh2YWx1ZSkgOiB0eXBlb2YgdmFsdWUgPT09IHR5cGUpXG4gICAgcmV0dXJuIHZhbHVlO1xuICB0aHJvdyBuZXcgRXJyb3IoYFRoZSAnJHt2YWx1ZX0nIGlzIG5vdCBhICR7dHlwZX1gKTtcbn1cblxuZnVuY3Rpb24gZ2V0RmlsZSh0YXJnZXQ6IFRhcmdldFN0cnVjdCk6IEFic29sdXRlUGF0aCB7XG4gIGlmICghdGFyZ2V0LnRhcmdldEZpbGUuZmlsZSlcbiAgICB0aHJvdyBuZXcgRXJyb3IoYFRhcmdldCBcIiR7dGFyZ2V0Lm5hbWV9XCIgaXMgbm90IGRlZmluZWRgKTtcbiAgcmV0dXJuIHRhcmdldC50YXJnZXRGaWxlLmZpbGU7XG59XG5cbmZ1bmN0aW9uIGdldEZpbGVOYW1lKHRhcmdldDogVGFyZ2V0U3RydWN0KTogc3RyaW5nIHtcbiAgaWYgKCF0YXJnZXQudGFyZ2V0RmlsZS5maWxlTmFtZSlcbiAgICB0aHJvdyBuZXcgRXJyb3IoYFRhcmdldCBcIiR7dGFyZ2V0Lm5hbWV9XCIgaXMgbm90IGRlZmluZWRgKTtcbiAgcmV0dXJuIHRhcmdldC50YXJnZXRGaWxlLmZpbGVOYW1lO1xufVxuXG5mdW5jdGlvbiBnZXRGaWxlRGlyKHRhcmdldDogVGFyZ2V0U3RydWN0KTogQWJzb2x1dGVQYXRoIHtcbiAgaWYgKCF0YXJnZXQudGFyZ2V0RmlsZS5maWxlRGlyKVxuICAgIHRocm93IG5ldyBFcnJvcihgVGFyZ2V0IFwiJHt0YXJnZXQubmFtZX1cIiBpcyBub3QgZGVmaW5lZGApO1xuICByZXR1cm4gdGFyZ2V0LnRhcmdldEZpbGUuZmlsZURpcjtcbn1cblxudHlwZSBHb2FsSGFuZGxlciA9ICgpID0+IFByb21pc2U8dm9pZD4gfCB2b2lkO1xuXG5leHBvcnQgY2xhc3MgR29hbFdvcmtlckltcGwge1xuICBwcml2YXRlIF9tZXNzYWdlOiBzdHJpbmcgfCB1bmRlZmluZWQ7XG4gIHByaXZhdGUgX25hbWU6IHN0cmluZyB8IHVuZGVmaW5lZDtcbiAgcHJpdmF0ZSBfb3V0cHV0OiBzdHJpbmcgfCB1bmRlZmluZWQ7XG4gIHByaXZhdGUgX2RlcGVuZHM6IHN0cmluZ1tdO1xuICBwcml2YXRlIF9jYWxsYmFja3M6IEdvYWxIYW5kbGVyW107XG5cbiAgY29uc3RydWN0b3IobmFtZT86IHN0cmluZykge1xuICAgIHRoaXMuX25hbWUgPSBuYW1lO1xuICAgIHRoaXMuX2RlcGVuZHMgPSBbXTtcbiAgICB0aGlzLl9jYWxsYmFja3MgPSBbXTtcbiAgfVxuXG4gIGdldCBtZXNzYWdlKCk6IHN0cmluZyB8IHVuZGVmaW5lZCB7XG4gICAgcmV0dXJuIHRoaXMuX21lc3NhZ2U7XG4gIH1cblxuICBzZXQgbWVzc2FnZSh2YWx1ZTogc3RyaW5nKSB7XG4gICAgdGhpcy5fbWVzc2FnZSA9IHZhbHVlO1xuICB9XG5cbiAgZ2V0IG5hbWUoKTogc3RyaW5nIHwgdW5kZWZpbmVkIHtcbiAgICByZXR1cm4gdGhpcy5fbmFtZTtcbiAgfVxuXG4gIGdldCBvdXRwdXQoKTogc3RyaW5nIHwgdW5kZWZpbmVkIHtcbiAgICByZXR1cm4gdGhpcy5fb3V0cHV0O1xuICB9XG5cbiAgc2V0IG91dHB1dCh2YWx1ZTogc3RyaW5nKSB7XG4gICAgdGhpcy5fb3V0cHV0ID0gdmFsdWU7XG4gIH1cblxuICBnZXQgZGVwZW5kcygpOiBzdHJpbmdbXSB7XG4gICAgcmV0dXJuIHRoaXMuX2RlcGVuZHM7XG4gIH1cblxuICBwdWJsaWMgYWRkRGVwZW5kZW5jeSguLi52YWx1ZTogc3RyaW5nW10pIHtcbiAgICB0aGlzLl9kZXBlbmRzLnB1c2goLi4udmFsdWUpO1xuICB9XG5cbiAgcHVibGljIGFkZENhbGxiYWNrKGhhbmRsZXI6IEdvYWxIYW5kbGVyKSB7XG4gICAgdGhpcy5fY2FsbGJhY2tzLnB1c2goaGFuZGxlcik7XG4gIH1cblxuICBhc3luYyBkb1dvcmsoKTogUHJvbWlzZTx2b2lkPiB7XG4gICAgaWYgKHRoaXMuX291dHB1dClcbiAgICAgIGF3YWl0IGZzLnByb21pc2VzLm1rZGlyKFBhdGguZGlybmFtZSh0aGlzLl9vdXRwdXQpLCB7IHJlY3Vyc2l2ZTogdHJ1ZSB9KTtcblxuICAgIGZvciAoY29uc3QgZnVuYyBvZiB0aGlzLl9jYWxsYmFja3MpIHtcbiAgICAgIGNvbnN0IHJlcyA9IGZ1bmMoKTtcbiAgICAgIGlmIChyZXMgaW5zdGFuY2VvZiBQcm9taXNlKVxuICAgICAgICBhd2FpdCByZXM7XG4gICAgfVxuICB9XG5cbiAgdXBkYXRlUHJvZ3Jlc3MoZXZlbnQ6IHsgbG9hZGVkOiBudW1iZXIsIHRvdGFsOiBudW1iZXIgfSk6IHZvaWQge1xuICAgIGlmICh0aGlzLl9tZXNzYWdlKSB7XG4gICAgICBjb25zdCByZWxhdGlvbk9mTGVuZ3RoID0gTWF0aC5yb3VuZCgoKytldmVudC5sb2FkZWQgLyBldmVudC50b3RhbCkgKiAxMDApO1xuICAgICAgY29uc3QgcGVyY2VudCA9IFwiW1wiICsgcmVsYXRpb25PZkxlbmd0aC50b1N0cmluZygpLnBhZFN0YXJ0KDMsIFwiIFwiKSArIFwiJV0gXCI7XG4gICAgICBsb2dnZXIubm90aWNlKHBlcmNlbnQgKyB0aGlzLl9tZXNzYWdlKTtcbiAgICB9XG4gIH1cblxuICBhZGRFeGVjKGNvbW1hbmQ6IHN0cmluZywgYXJnczogc3RyaW5nW10sIGN3ZDogc3RyaW5nKTogdm9pZCB7XG4gICAgdGhpcy5hZGRDYWxsYmFjaygoKSA9PiB7XG4gICAgICBjb25zdCByZXN1bHQgPSBzcGF3blN5bmMoY29tbWFuZCwgYXJncywgeyBjd2QsIGVuY29kaW5nOiBcInV0Zi04XCIgfSk7XG4gICAgICBpZiAocmVzdWx0LmVycm9yIHx8IHJlc3VsdC5zdGF0dXMpIHtcbiAgICAgICAgbG9nZ2VyLm5vdGljZShcImNkIFwiICsgY3dkKTtcbiAgICAgICAgbGV0IGNtZCA9IGFyZ3Muam9pbihcIiBcIik7XG4gICAgICAgIGNtZCA9IGNvbW1hbmQgKyAoY21kID8gXCIgXCIgOiBcIlwiKSArIGNtZDtcbiAgICAgICAgbG9nZ2VyLm5vdGljZShjbWQpO1xuICAgICAgICBsb2dnZXIubm90aWNlKFwiXCIpO1xuICAgIFxuICAgICAgICBsb2dnZXIuZmF0YWwocmVzdWx0LnN0ZGVycik7XG4gICAgXG4gICAgICAgIGlmIChyZXN1bHQuZXJyb3IpXG4gICAgICAgICAgICB0aHJvdyByZXN1bHQuZXJyb3I7XG4gICAgXG4gICAgICAgIHRocm93IG5ldyBFcnJvcihyZXN1bHQuZXJyb3IgYXMgYW55IHx8IFwiU3RhdHVzIFwiICsgcmVzdWx0LnN0YXR1cyk7XG4gICAgICB9XG4gICAgICBpZiAocmVzdWx0LnN0ZG91dCkge1xuICAgICAgICBmb3IgKGNvbnN0IGxpbmUgb2YgcmVzdWx0LnN0ZG91dC50cmltKCkuc3BsaXQoXCJcXG5cIikpIHtcbiAgICAgICAgICBsb2dnZXIubm90aWNlKGxpbmUpO1xuICAgICAgICB9XG4gICAgICB9XG4gICAgfSlcbiAgfVxuXG4gIGFkZFNjcmlwdChnbG9iYWw6IFByb2plY3RDb250ZXh0LCB2YXJpYWJsZU1hcDogVmFyaWFibGVNYXAsIHNjcmlwdDogQWJzb2x1dGVQYXRoIHwgRnVuY3Rpb24pOiB2b2lkIHtcbiAgICB0aGlzLmFkZENhbGxiYWNrKGFzeW5jICgpID0+IHtcbiAgICAgIGxldCBmdW5jOiBhbnkgPSBzY3JpcHQ7XG4gICAgICBpZiAoc2NyaXB0IGluc3RhbmNlb2YgQWJzb2x1dGVQYXRoKSB7XG4gICAgICAgIGNvbnN0IHNjcmlwdFVybCA9IHVybC5wYXRoVG9GaWxlVVJMKGZ1bmMudG9TdHJpbmcoKSk7XG4gICAgICAgIGZ1bmMgPSAoYXdhaXQgaW1wb3J0TW9kdWxlKHNjcmlwdFVybCkpLmRlZmF1bHQ7XG4gICAgICB9XG4gICAgICBpZiAoZnVuYyBpbnN0YW5jZW9mIEZ1bmN0aW9uKSB7XG4gICAgICAgIGNvbnN0IG1rID0gU2NyaXB0Q29udGV4dC5jcmVhdGUoZ2xvYmFsLCB2YXJpYWJsZU1hcCk7XG4gICAgICAgIGNvbnN0IHJlc3VsdCA9IGZ1bmMobWspO1xuICAgICAgICBpZiAocmVzdWx0IGluc3RhbmNlb2YgUHJvbWlzZSlcbiAgICAgICAgICBhd2FpdCByZXN1bHQ7XG4gICAgICB9XG4gICAgICBlbHNlIHtcbiAgICAgICAgdGhyb3cgbmV3IEVycm9yKGBUaGVyZSBpcyBubyBGdW5jdGlvbmApO1xuICAgICAgfVxuICAgIH0pO1xuICB9XG59O1xuXG5leHBvcnQgY2xhc3MgUHJvamVjdENvbnRleHQge1xuICBwcml2YXRlIFtUQVJHRVRfQ09MTEVDVElPTl0gPSBuZXcgVGFyZ2V0U3RydWN0Q29sbGVjdGlvbjtcbiAgcHJpdmF0ZSBbVEFSR0VUU106IFRhcmdldENvbGxlY3Rpb247XG4gIHByaXZhdGUgW0NVU1RPTV9TQ1JJUFRTXTogU2NyaXB0Q29sbGVjdGlvbjtcbiAgcHJpdmF0ZSBbQ0FDSEVdOiBDYWNoZVZhcmlhYmxlRGVzY3JpcHRvcnM7XG4gIHByaXZhdGUgX2ludGVyZmFjZVNjcmlwdHM6IEludGVyZmFjZVNjcmlwdHM7XG4gIHByaXZhdGUgW0lOU1RBTExfTElTVF06IEluc3RhbGxFbnRpdHlbXTtcbiAgcHJpdmF0ZSBfcHJvY2Vzc2VkVmFyaWFibGVNYXA6IGFueTtcbiAgcHJpdmF0ZSBbQlVJTFRJTl9TQ1JJUFRTXTogQnVpbGRpblNjcmlwdHM7XG4gIHByaXZhdGUgX3N1YmRpckFsaWFzOiBTdWJkaXJlY3RvcnlBbGlhcztcbiAgcHJpdmF0ZSBfc3ViZGlyTGlzdDogVmFyaWFibGVNYXBbXTtcblxuICBwcml2YXRlIGNvbnN0cnVjdG9yKCkge1xuICAgIHRoaXNbVEFSR0VUU10gPSBUYXJnZXRDb2xsZWN0aW9uLmNyZWF0ZSgpO1xuICAgIHRoaXNbQ1VTVE9NX1NDUklQVFNdID0gU2NyaXB0Q29sbGVjdGlvbi5jcmVhdGUoKTtcbiAgICB0aGlzW0NBQ0hFXSA9IHt9O1xuICAgIHRoaXMuX2ludGVyZmFjZVNjcmlwdHMgPSB7fTtcbiAgICB0aGlzW0lOU1RBTExfTElTVF0gPSBbXTtcbiAgICB0aGlzLl9wcm9jZXNzZWRWYXJpYWJsZU1hcCA9IHt9O1xuICAgIHRoaXMuX3N1YmRpckFsaWFzID0ge307XG4gICAgdGhpc1tCVUlMVElOX1NDUklQVFNdID0gQnVpbGRpblNjcmlwdHM7XG4gICAgdGhpcy5fc3ViZGlyTGlzdCA9IFtdO1xuICB9XG5cbiAgcHVibGljIHN0YXRpYyBjcmVhdGUoKSB7XG4gICAgcmV0dXJuIE9iamVjdC5zZWFsKG5ldyBQcm9qZWN0Q29udGV4dCk7XG4gIH1cblxuICBwdWJsaWMgZ2V0IFRBUkdFVFMoKSB7XG4gICAgcmV0dXJuIHRoaXNbVEFSR0VUU107XG4gIH1cblxuICBwdWJsaWMgZ2V0IENBQ0hFKCkge1xuICAgIHJldHVybiB0aGlzW0NBQ0hFXTtcbiAgfVxuXG4gIHB1YmxpYyBnZXRJbnRlcmZhY2VTY3JpcHQodmFyaWFibGVNYXA6IFZhcmlhYmxlTWFwLCBuYW1lOiBzdHJpbmcpOiBJbnRlcmZhY2VTY3JpcHQge1xuICAgIGxldCBzY3JpcHQgPSB0aGlzLl9pbnRlcmZhY2VTY3JpcHRzW25hbWVdO1xuICAgIGlmICghc2NyaXB0KSB7XG4gICAgICBzY3JpcHQgPSBJbnRlcmZhY2VTY3JpcHQuY3JlYXRlKG5hbWUpO1xuICAgICAgdGhpcy5faW50ZXJmYWNlU2NyaXB0c1tuYW1lXSA9IHNjcmlwdDtcbiAgICB9XG4gICAgcmV0dXJuIHNjcmlwdDtcbiAgfVxuXG4gIHB1YmxpYyBhZGRDdXN0b21TY3JpcHQodmFyaWFibGVNYXA6IFZhcmlhYmxlTWFwKTogQ3VzdG9tU2NyaXB0IHtcbiAgICBjb25zdCBzY3JpcHQgPSBTY29wZUhlbHBlci5nZXQodmFyaWFibGVNYXAsIFwiU0NSSVBUX01PRFVMRVwiKTtcbiAgICBjb25zdCBzb3VyY2VEaXIgPSBTY29wZUhlbHBlci5nZXQodmFyaWFibGVNYXAsIFwiU09VUkNFX0RJUlwiKTtcbiAgICBsZXQgc2NyaXB0T2JqOiBGdW5jdGlvbiB8IEFic29sdXRlUGF0aCB8IHVuZGVmaW5lZDtcbiAgICBpZiAodHlwZW9mIHNjcmlwdCA9PT0gXCJzdHJpbmdcIilcbiAgICAgIHNjcmlwdE9iaiA9IHRoaXMuZmluZFNjcmlwdEZ1bmN0aW9uKHNjcmlwdCk7XG4gICAgaWYgKCFzY3JpcHRPYmopXG4gICAgICBzY3JpcHRPYmogPSBzb3VyY2VEaXIucmVzb2x2ZShzY3JpcHQpIGFzIEFic29sdXRlUGF0aDtcblxuICAgIGxldCBpbnB1dEZpbGUgPSBTY29wZUhlbHBlci5nZXQodmFyaWFibGVNYXAsIFwiU0NSSVBUX0lOUFVUXCIpO1xuICAgIGlmIChpbnB1dEZpbGUpXG4gICAgICBpbnB1dEZpbGUgPSBzb3VyY2VEaXIucmVzb2x2ZShpbnB1dEZpbGUpIGFzIEFic29sdXRlUGF0aDtcblxuICAgIGxldCBvdXRwdXRGaWxlID0gU2NvcGVIZWxwZXIuZ2V0KHZhcmlhYmxlTWFwLCBcIlNDUklQVF9PVVRQVVRcIik7XG4gICAgaWYgKCFvdXRwdXRGaWxlKVxuICAgICAgdGhyb3cgbmV3IEVycm9yKFwiQ3VzdG9tU2NyaXB0IHBhcmFtZXRlcnMgcmVxdWlyZWQgb3V0cHV0IGVudGl0eVwiKTtcblxuICAgIG91dHB1dEZpbGUgPSBzb3VyY2VEaXIucmVzb2x2ZShvdXRwdXRGaWxlKSBhcyBBYnNvbHV0ZVBhdGg7XG5cbiAgICBjb25zdCBvcHRpb25zOiBDdXN0b21TY3JpcHQuT3B0aW9ucyA9IHtcbiAgICAgIHZhcmlhYmxlTWFwLFxuICAgICAgbmFtZTogU2NvcGVIZWxwZXIuZ2V0KHZhcmlhYmxlTWFwLCBcIlNDUklQVF9OQU1FXCIpLFxuICAgICAgc2NyaXB0OiBzY3JpcHRPYmosXG4gICAgICBvdXRwdXQ6IG91dHB1dEZpbGUsXG4gICAgICBpbnB1dDogaW5wdXRGaWxlLFxuICAgICAgd29ya0RpcjogU2NvcGVIZWxwZXIuZ2V0KHZhcmlhYmxlTWFwLCBcIkJJTkFSWV9ESVJcIiksXG4gICAgfTtcblxuICAgIGNvbnN0IHRhcmdldCA9IEN1c3RvbVNjcmlwdC5jcmVhdGUob3B0aW9ucyk7XG4gICAgaWYgKG9wdGlvbnMubmFtZSlcbiAgICAgIHRoaXNbQ1VTVE9NX1NDUklQVFNdLnNldChvcHRpb25zLm5hbWUsIHRhcmdldCk7XG4gICAgZWxzZVxuICAgICAgdGhpc1tDVVNUT01fU0NSSVBUU10uYWRkKHRhcmdldCk7XG5cbiAgICByZXR1cm4gdGFyZ2V0O1xuICB9XG5cbiAgcHVibGljIHJlZ2lzdGVyVmFyaWFibGVNYXAobmFtZTogc3RyaW5nLCB2YXJpYWJsZU1hcDogVmFyaWFibGVNYXApIHtcbiAgICBpZiAodGhpcy5fcHJvY2Vzc2VkVmFyaWFibGVNYXBbbmFtZV0pXG4gICAgICB0aHJvdyBuZXcgRXJyb3IoYFN5c3RlbVZhcmlhYmxlcyBleGlzdHMgZm9yICR7bmFtZX1gKTtcbiAgICB0aGlzLl9wcm9jZXNzZWRWYXJpYWJsZU1hcFtuYW1lXSA9IHZhcmlhYmxlTWFwO1xuICB9XG5cbiAgcHVibGljIHJlc29sdmVTdWJkaXJlY3RvcnkocGF0aDogQWJzb2x1dGVQYXRoIHwgc3RyaW5nKTogQWJzb2x1dGVQYXRoIHwgc3RyaW5nIHwgdW5kZWZpbmVkIHtcbiAgICBjb25zdCByZXNvbHZlZFBhdGggPSB0aGlzLl9zdWJkaXJBbGlhc1twYXRoLnRvU3RyaW5nKCldO1xuICAgIGlmIChyZXNvbHZlZFBhdGggPT09IHVuZGVmaW5lZClcbiAgICAgIHJldHVybiBwYXRoO1xuICAgIGlmIChyZXNvbHZlZFBhdGggPT09IG51bGwpXG4gICAgICByZXR1cm4gdW5kZWZpbmVkO1xuICAgIHJldHVybiByZXNvbHZlZFBhdGg7XG4gIH1cblxuICBwdWJsaWMgYWRkU3ViZGlyZWN0b3J5QWxpYXModmFyaWFibGVNYXA6IFZhcmlhYmxlTWFwLCBzcmM6IGFueSwgZGVzdDogYW55KSB7XG4gICAgY29uc3Qgc3JjUGF0aCA9IEFic29sdXRlUGF0aC5jcmVhdGUoU2NvcGVIZWxwZXIuZ2V0KHZhcmlhYmxlTWFwLCBcIlNPVVJDRV9ESVJcIikucmVzb2x2ZShzcmMpKTtcbiAgICBjb25zdCBkZXN0UGF0aCA9IChkZXN0ID09PSBudWxsKSA/IG51bGwgOiBBYnNvbHV0ZVBhdGguY3JlYXRlKFNjb3BlSGVscGVyLmdldCh2YXJpYWJsZU1hcCwgXCJTT1VSQ0VfRElSXCIpLnJlc29sdmUoZGVzdCkpO1xuICAgIGNvbnN0IHNyY1N0ciA9IHNyY1BhdGgudG9TdHJpbmcoKTtcbiAgICBpZiAodGhpcy5fc3ViZGlyQWxpYXMuaGFzT3duUHJvcGVydHkoc3JjU3RyKSlcbiAgICAgIGxvZ2dlci53YXJuKGBPd2VycmlkZSBcIiR7c3JjU3RyfVwiIHN1YmRpcmVjdG9yeSBhbGlhc2ApO1xuICAgIHRoaXMuX3N1YmRpckFsaWFzW3NyY1N0cl0gPSBkZXN0UGF0aDtcbiAgfVxuXG4gIHB1YmxpYyBhZGRJbnN0YWxsRW50cnkoZW50cnk6IEluc3RhbGxFbnRpdHkpIHtcbiAgICByZXR1cm4gdGhpc1tJTlNUQUxMX0xJU1RdLnB1c2goZW50cnkpO1xuICB9XG5cbiAgcHVibGljIGFkZENhY2hlVmFyaWFibGVzKHZhcmlhYmxlczogQ2FjaGVWYXJpYWJsZURlc2NyaXB0b3JzKSB7XG4gICAgY29uc3QgY2FjaGUgPSB0aGlzW0NBQ0hFXTtcbiAgICBmb3IgKGNvbnN0IFtrZXksIGVudHJ5XSBvZiBPYmplY3QuZW50cmllcyh2YXJpYWJsZXMpKSB7XG4gICAgICBjYWNoZVtrZXldID0gZW50cnk7XG4gICAgfVxuICB9XG5cbiAgcHVibGljIGxvYWRDYWNoZVZhcmlhYmxlcyhmaWxlbmFtZTogQWJzb2x1dGVQYXRoIHwgc3RyaW5nKSB7XG4gICAgaWYgKGZpbGVFeGlzdHNTeW5jKGZpbGVuYW1lLnRvU3RyaW5nKCkpKSB7XG4gICAgICBjb25zdCB2YXJpYWJsZXMgPSByZXF1aXJlU3luYyhmaWxlbmFtZS50b1N0cmluZygpKTtcbiAgICAgIHRoaXMuYWRkQ2FjaGVWYXJpYWJsZXModmFyaWFibGVzKTtcbiAgICB9XG4gIH1cblxuICBwdWJsaWMgY29weUNhY2hlVmFyaWFibGVzKHNjb3BlOiBhbnkpIHtcbiAgICBmb3IgKGNvbnN0IFtuYW1lLCBlbnRyeV0gb2YgT2JqZWN0LmVudHJpZXModGhpc1tDQUNIRV0pKSB7XG4gICAgICBpZiAoIU9iamVjdC5oYXNPd24oc2NvcGUsIG5hbWUpKSB7XG4gICAgICAgIGNvbnN0IHR5cGUgPSBlbnRyeS50eXBlIHx8IHR5cGVvZiBlbnRyeS52YWx1ZTtcbiAgICAgICAgY29uc3QgZGVzY3JpcHRpb24gPSBlbnRyeS5kZXNjcmlwdGlvbiB8fCBcIlwiO1xuICAgICAgICBsZXQgdmFsdWUgPSBBcnJheS5pc0FycmF5KGVudHJ5LnZhbHVlKSA/IFsgLi4uZW50cnkudmFsdWUgXSA6IGVudHJ5LnZhbHVlOyAgXG4gICAgICAgIGNvbnN0IG5hbWVTeW1ib2wgPSBTeW1ib2wobmFtZSk7XG4gICAgICAgIHNjb3BlW25hbWVTeW1ib2xdID0gZW5zdXJlVmFsdWVCeVR5cGUodHlwZSwgdmFsdWUpO1xuICBcbiAgICAgICAgT2JqZWN0LmRlZmluZVByb3BlcnR5KHNjb3BlLCBuYW1lLCB7XG4gICAgICAgICAgZW51bWVyYWJsZTogdHJ1ZSxcbiAgICAgICAgICBnZXQoKSB7XG4gICAgICAgICAgICByZXR1cm4gdGhpc1tuYW1lU3ltYm9sXTtcbiAgICAgICAgICB9LFxuICAgICAgICAgIHNldCh2YWx1ZSkge1xuICAgICAgICAgICAgdGhpc1tuYW1lU3ltYm9sXSA9IGVuc3VyZVZhbHVlQnlUeXBlKHR5cGUsIHZhbHVlKTtcbiAgICAgICAgICB9LFxuICAgICAgICB9KTtcbiAgICAgIH1cbiAgICB9XG4gIH1cblxuICBwdWJsaWMgYWRkU3RhdGljTGlicmFyeSh2YXJpYWJsZU1hcDogVmFyaWFibGVNYXAsIG5hbWU6IHN0cmluZyk6IFN0YXRpY0xpYnJhcnkge1xuICAgIGNvbnN0IGltcGwgPSB0aGlzW1RBUkdFVF9DT0xMRUNUSU9OXS5nZXRPckNyZWF0ZShuYW1lKTtcbiAgICBjb25zdCB0YXJnZXQgPSBTdGF0aWNMaWJyYXJ5LmNyZWF0ZShpbXBsLCB2YXJpYWJsZU1hcCwgbmFtZSk7XG4gICAgdGhpc1tUQVJHRVRTXS5zZXQobmFtZSwgdGFyZ2V0KTtcbiAgICByZXR1cm4gdGFyZ2V0O1xuICB9XG5cbiAgcHVibGljIGFkZE9iamVjdExpYnJhcnkodmFyaWFibGVNYXA6IFZhcmlhYmxlTWFwLCBuYW1lOiBzdHJpbmcpOiBPYmplY3RMaWJyYXJ5IHtcbiAgICBjb25zdCBpbXBsID0gdGhpc1tUQVJHRVRfQ09MTEVDVElPTl0uZ2V0T3JDcmVhdGUobmFtZSk7XG4gICAgY29uc3QgdGFyZ2V0ID0gT2JqZWN0TGlicmFyeS5jcmVhdGUoaW1wbCwgdmFyaWFibGVNYXAsIG5hbWUpO1xuICAgIHRoaXNbVEFSR0VUU10uc2V0KG5hbWUsIHRhcmdldCk7XG4gICAgcmV0dXJuIHRhcmdldDtcbiAgfVxuXG4gIHB1YmxpYyBhZGRTaGFyZWRMaWJyYXJ5KHZhcmlhYmxlTWFwOiBWYXJpYWJsZU1hcCwgbmFtZTogc3RyaW5nKTogU2hhcmVkTGlicmFyeSB7XG4gICAgY29uc3QgaW1wbCA9IHRoaXNbVEFSR0VUX0NPTExFQ1RJT05dLmdldE9yQ3JlYXRlKG5hbWUpO1xuICAgIGNvbnN0IHRhcmdldCA9IFNoYXJlZExpYnJhcnkuY3JlYXRlKGltcGwsIHZhcmlhYmxlTWFwLCBuYW1lKTtcbiAgICB0aGlzW1RBUkdFVFNdLnNldChuYW1lLCB0YXJnZXQpO1xuICAgIHJldHVybiB0YXJnZXQ7XG4gIH1cblxuICBwdWJsaWMgYWRkRXhlY3V0YWJsZSh2YXJpYWJsZU1hcDogVmFyaWFibGVNYXAsIG5hbWU6IHN0cmluZyk6IEV4ZWN1dGFibGUge1xuICAgIGNvbnN0IGltcGwgPSB0aGlzW1RBUkdFVF9DT0xMRUNUSU9OXS5nZXRPckNyZWF0ZShuYW1lKTtcbiAgICBjb25zdCB0YXJnZXQgPSBFeGVjdXRhYmxlLmNyZWF0ZShpbXBsLCB2YXJpYWJsZU1hcCwgbmFtZSk7XG4gICAgdGhpc1tUQVJHRVRTXS5zZXQobmFtZSwgdGFyZ2V0KTtcbiAgICByZXR1cm4gdGFyZ2V0O1xuICB9XG5cbiAgcHVibGljIGdldFRhcmdldChuYW1lOiBzdHJpbmcpOiBUYXJnZXRTdHJ1Y3Qge1xuICAgIHJldHVybiB0aGlzW1RBUkdFVF9DT0xMRUNUSU9OXS5nZXRPckNyZWF0ZShuYW1lKTtcbiAgfVxuXG4gIHB1YmxpYyBleGVjdXRlU2NyaXB0U3luYyh2YXJpYWJsZU1hcDogVmFyaWFibGVNYXAsIHNjcmlwdDogYW55LCBwYXJhbXM6IGFueSkge1xuICAgIGNvbnN0IG5ld1ZhcmlhYmxlTWFwID0gU2NvcGVIZWxwZXIuY2xvbmVWYXJpYWJsZU1hcCh2YXJpYWJsZU1hcCk7XG4gICAgcGFyYW1zICYmIFNjb3BlSGVscGVyLmV4dGVuZFZhcmlhYmxlTWFwQnlWYWx1ZXMobmV3VmFyaWFibGVNYXAsIFwiXCIsIHBhcmFtcyk7XG4gICAgY29uc3Qgc2NyaXB0UGF0aCA9IFNjb3BlSGVscGVyLmdldChuZXdWYXJpYWJsZU1hcCwgXCJTT1VSQ0VfRElSXCIpLnJlc29sdmUoc2NyaXB0KTtcbiAgICBjb25zdCBmdW5jID0gcmVxdWlyZVN5bmMoc2NyaXB0UGF0aC50b1N0cmluZygpKTtcbiAgICBjb25zdCBtayA9IFNjcmlwdENvbnRleHQuY3JlYXRlKHRoaXMsIG5ld1ZhcmlhYmxlTWFwKTtcbiAgICBmdW5jKG1rKTtcbiAgfVxuXG4gIHB1YmxpYyB3cml0ZUNhY2hlVmFyaWFibGVzKGZpbGVuYW1lOiBzdHJpbmcpIHtcbiAgICBjb25zdCBqc29uID0gSlNPTi5zdHJpbmdpZnkodGhpc1tDQUNIRV0sIG51bGwsIDIpO1xuICAgIGZzLndyaXRlRmlsZVN5bmMoZmlsZW5hbWUsIGpzb24sIFwidXRmLThcIik7XG4gIH1cblxuICBwdWJsaWMgYXN5bmMgcHJlcGVhclNjcmlwdEZpbGUodmFyaWFibGVNYXA6IFZhcmlhYmxlTWFwKTogUHJvbWlzZTxib29sZWFuPiB7XG4gICAgY29uc3Qgb3JpZ2luU291cmNlRGlyID0gU2NvcGVIZWxwZXIuZ2V0KHZhcmlhYmxlTWFwLCBcIlNPVVJDRV9ESVJcIikudG9TdHJpbmcoKTtcbiAgICBjb25zdCByZXNvbHZlU291cmNlRGlyID0gdGhpcy5yZXNvbHZlU3ViZGlyZWN0b3J5KG9yaWdpblNvdXJjZURpcik7XG4gICAgaWYgKCFyZXNvbHZlU291cmNlRGlyKSB7XG4gICAgICBsb2dnZXIuaW5mbyhgU291cmNlIGRpciBcIiR7b3JpZ2luU291cmNlRGlyfVwiIHdhcyBkaXNhYmxlZGApO1xuICAgICAgcmV0dXJuIGZhbHNlO1xuICAgIH1cbiAgICBTY29wZUhlbHBlci5zZXQodmFyaWFibGVNYXAsIFwiU09VUkNFX0RJUlwiLCByZXNvbHZlU291cmNlRGlyKTtcblxuICAgIGlmICghU2NvcGVIZWxwZXIuZ2V0KHZhcmlhYmxlTWFwLCBcIlNDUklQVF9GSUxFXCIpKSB7XG4gICAgICBsZXQgc2NyaXB0RmlsZTogQWJzb2x1dGVQYXRoIHwgdW5kZWZpbmVkO1xuICAgICAgY29uc3QgZmlsZUxpc3QgPSBbIFwiLmpzXCIsIFwiLm1qc1wiIF0ubWFwKGkgPT4gXCJNYWtlU2NyaXB0XCIgKyBpKTtcbiAgICAgIGZvciAoY29uc3QgZmlsZW5hbWUgb2YgZmlsZUxpc3QpIHtcbiAgICAgICAgY29uc3QgaXRlciA9IFNjb3BlSGVscGVyLmdldCh2YXJpYWJsZU1hcCwgXCJTT1VSQ0VfRElSXCIpLmpvaW4oZmlsZW5hbWUpO1xuICAgICAgICBpZiAoYXdhaXQgZmlsZUV4aXN0cyhpdGVyLnRvU3RyaW5nKCkpKSB7XG4gICAgICAgICAgc2NyaXB0RmlsZSA9IGl0ZXI7XG4gICAgICAgICAgYnJlYWs7XG4gICAgICAgIH1cbiAgICAgIH1cblxuICAgICAgaWYgKCFzY3JpcHRGaWxlKVxuICAgICAgICB0aHJvdyBuZXcgRXJyb3IoYFRoZXJlIGFyZSBubyBmaWxlcyAke2ZpbGVMaXN0LmpvaW4oXCIsIFwiKX0gaW4gXCIke1Njb3BlSGVscGVyLmdldCh2YXJpYWJsZU1hcCwgXCJTT1VSQ0VfRElSXCIpfVwiYCk7XG5cbiAgICAgIFNjb3BlSGVscGVyLnNldCh2YXJpYWJsZU1hcCwgXCJTQ1JJUFRfRklMRVwiLCBzY3JpcHRGaWxlKTtcbiAgICAgIFNjb3BlSGVscGVyLnNldCh2YXJpYWJsZU1hcCwgXCJTQ1JJUFRfRElSXCIsIFNjb3BlSGVscGVyLmdldCh2YXJpYWJsZU1hcCwgXCJTQ1JJUFRfRklMRVwiKS5kaXJuYW1lKCkpO1xuICAgIH1cblxuICAgIHRoaXMucmVnaXN0ZXJWYXJpYWJsZU1hcChTY29wZUhlbHBlci5nZXQodmFyaWFibGVNYXAsIFwiU0NSSVBUX0ZJTEVcIikudG9TdHJpbmcoKSwgdmFyaWFibGVNYXApO1xuICAgIHJldHVybiB0cnVlO1xuICB9XG5cbiAgcHVibGljIGFkZFN1YmRpcmVjdG9yeSh2YXJpYWJsZU1hcDogVmFyaWFibGVNYXAsIHNvdXJjZURpcjogYW55LCBiaW5hcnlEaXI/OiBhbnkpIHtcbiAgICBjb25zdCBuZXdWYXJpYWJsZU1hcCA9IGNyZWF0ZVZhcmlhYmxlTWFwRm9yRGlyZWN0b3J5KHZhcmlhYmxlTWFwLCBzb3VyY2VEaXIsIGJpbmFyeURpcik7XG4gICAgaWYgKG5ld1ZhcmlhYmxlTWFwKSB7XG4gICAgICB0aGlzLl9zdWJkaXJMaXN0LnB1c2gobmV3VmFyaWFibGVNYXApO1xuICAgIH1cbiAgfVxuXG4gIHB1YmxpYyBmaW5kU2NyaXB0RnVuY3Rpb24obmFtZTogc3RyaW5nKTogRnVuY3Rpb24gfCB1bmRlZmluZWQge1xuICAgIHJldHVybiB0aGlzW0JVSUxUSU5fU0NSSVBUU11bbmFtZV07XG4gIH1cblxuICBwdWJsaWMgYXN5bmMgZG9TdWJkaXJlY3RvcnkoKSB7XG4gICAgY29uc3QgY29udGV4dExpc3QgPSBuZXcgQXJyYXk8TG9jYWxNYWtlQ29udGV4dD4oKTtcblxuICAgIGZvciAoOzspIHtcbiAgICAgIGNvbnN0IHZhcmlhYmxlTWFwID0gdGhpcy5fc3ViZGlyTGlzdC5zaGlmdCgpO1xuICAgICAgaWYgKCF2YXJpYWJsZU1hcClcbiAgICAgICAgYnJlYWs7XG5cbiAgICAgIGlmICghYXdhaXQgdGhpcy5wcmVwZWFyU2NyaXB0RmlsZSh2YXJpYWJsZU1hcCkpXG4gICAgICAgIGNvbnRpbnVlO1xuXG4gICAgICBjb25zdCBjdHggPSBuZXcgTG9jYWxNYWtlQ29udGV4dCh2YXJpYWJsZU1hcCwgdGhpcyk7XG4gICAgICBjb250ZXh0TGlzdC5wdXNoKGN0eCk7XG4gICAgICBjb25zdCBtayA9IFVzZXJNYWtlQ29udGV4dC5jcmVhdGUoY3R4LCB2YXJpYWJsZU1hcCk7XG5cbiAgICAgIGNvbnN0IGN3ZFNhdmUgPSBwcm9jZXNzLmN3ZCgpO1xuICAgICAgcHJvY2Vzcy5jaGRpcihtay5TQ1JJUFRfRElSLnRvU3RyaW5nKCkpO1xuICAgICAgYXdhaXQgcGVyZm9ybUNvbnRleHQobWspO1xuICAgICAgcHJvY2Vzcy5jaGRpcihjd2RTYXZlKTtcbiAgICB9XG5cbiAgICBmb3IgKGNvbnN0IGN0eCBvZiBjb250ZXh0TGlzdCkge1xuICAgICAgZm9yIChjb25zdCBbbmFtZSwgdGFyZ2V0XSBvZiBjdHgudGFyZ2V0cykge1xuICAgICAgICBjb25zdCBpbXBsID0gdGhpc1tUQVJHRVRfQ09MTEVDVElPTl0uZ2V0KG5hbWUpO1xuICAgICAgICBpbXBsLnRhcmdldEZpbGUuc2V0UHJlZml4KHRhcmdldC5wcmVmaXgpO1xuICAgICAgICBpbXBsLnRhcmdldEZpbGUuc2V0T3V0cHV0TmFtZSh0YXJnZXQub3V0cHV0TmFtZSk7XG4gICAgICAgIGltcGwudGFyZ2V0RmlsZS5zZXRTdWZmaXgodGFyZ2V0LnN1ZmZpeCk7XG4gICAgICAgIGltcGwuc2V0UG9zaXRpb25JbmRlcGVuZGVudENvZGUodGFyZ2V0LnBvc2l0aW9uSW5kZXBlbmRlbnRDb2RlKTtcbiAgICAgICAgZm9yIChjb25zdCB7cHVibGljT25seSwgdmFsdWV9IG9mIHRhcmdldC5nZXRJbmNsdWRlcygpKVxuICAgICAgICAgIGltcGwuYWRkSW5jbHVkZShcImRpcmVjdGx5XCIsIHB1YmxpY09ubHksIHZhbHVlKTtcbiAgICAgICAgZm9yIChjb25zdCB7cHVibGljT25seSwgdmFsdWV9IG9mIHRhcmdldC5nZXREZWZpbml0aW9ucygpKVxuICAgICAgICAgIGltcGwuYWRkRGVmaW5pdGlvbihcImRpcmVjdGx5XCIsIHB1YmxpY09ubHksIHZhbHVlKTtcbiAgICAgIH1cbiAgICB9XG5cbiAgICBmb3IgKGNvbnN0IGN0eCBvZiBjb250ZXh0TGlzdCkge1xuICAgICAgZm9yIChjb25zdCBbbmFtZSwgdGFyZ2V0XSBvZiBjdHguaW5kaXJlY3RUYXJnZXRzKSB7XG4gICAgICAgIGNvbnN0IGltcGwgPSB0aGlzW1RBUkdFVF9DT0xMRUNUSU9OXS5nZXQobmFtZSk7XG4gICAgICAgIGlmICh0YXJnZXQucHJlZml4ICE9PSB1bmRlZmluZWQpXG4gICAgICAgICAgaW1wbC50YXJnZXRGaWxlLnNldFByZWZpeCh0YXJnZXQucHJlZml4KTtcbiAgICAgICAgaWYgKHRhcmdldC5vdXRwdXROYW1lICE9PSB1bmRlZmluZWQpXG4gICAgICAgICAgaW1wbC50YXJnZXRGaWxlLnNldE91dHB1dE5hbWUodGFyZ2V0Lm91dHB1dE5hbWUpO1xuICAgICAgICBpZiAodGFyZ2V0LnN1ZmZpeCAhPT0gdW5kZWZpbmVkKVxuICAgICAgICAgIGltcGwudGFyZ2V0RmlsZS5zZXRTdWZmaXgodGFyZ2V0LnN1ZmZpeCk7XG4gICAgICAgIGlmICh0YXJnZXQucG9zaXRpb25JbmRlcGVuZGVudENvZGUgIT09IHVuZGVmaW5lZClcbiAgICAgICAgICBpbXBsLnNldFBvc2l0aW9uSW5kZXBlbmRlbnRDb2RlKHRhcmdldC5wb3NpdGlvbkluZGVwZW5kZW50Q29kZSk7XG4gICAgICAgIGZvciAoY29uc3Qge3B1YmxpY09ubHksIHZhbHVlfSBvZiB0YXJnZXQuZ2V0SW5jbHVkZXMoKSlcbiAgICAgICAgICBpbXBsLmFkZEluY2x1ZGUoXCJkaXJlY3RseVwiLCBwdWJsaWNPbmx5LCB2YWx1ZSk7XG4gICAgICAgIGZvciAoY29uc3Qge3B1YmxpY09ubHksIHZhbHVlfSBvZiB0YXJnZXQuZ2V0RGVmaW5pdGlvbnMoKSlcbiAgICAgICAgICBpbXBsLmFkZERlZmluaXRpb24oXCJkaXJlY3RseVwiLCBwdWJsaWNPbmx5LCB2YWx1ZSk7XG4gICAgICB9XG4gICAgfVxuICB9XG5cbiAgcHVibGljIGNyZWF0ZUdvYWxzKHNjb3BlOiBTeXN0ZW1TY29wZSk6IEdvYWxDb2xsZWN0aW9uIHtcbiAgICBmb3IgKGNvbnN0IGl0ZXIgb2YgT2JqZWN0LnZhbHVlcyh0aGlzLl9pbnRlcmZhY2VTY3JpcHRzKSkge1xuICAgICAgY29uc3Qgc2NyaXB0ID0gdGhpc1tDVVNUT01fU0NSSVBUU10uZ2V0KGl0ZXIuTkFNRSk7XG4gICAgICBpZiAoIXNjcmlwdClcbiAgICAgICAgdGhyb3cgbmV3IEVycm9yKGBUaGVyZSBpcyBubyBDdXN0b21TY3JpcHQgbmFtZWQgJHtpdGVyLk5BTUV9YCk7XG4gICAgICBzY3JpcHQubWVyZ2VWYXJpYWJsZXMoaXRlci52YXJpYWJsZXMpO1xuICAgIH1cbiAgXG4gICAgY29uc3QgZ29hbExpc3QgPSBHb2FsQ29sbGVjdGlvbi5jcmVhdGUoKTtcbiAgICBmb3IgKGNvbnN0IHNjcmlwdCBvZiB0aGlzW0NVU1RPTV9TQ1JJUFRTXS5FTlRSSUVTKSB7ICAgXG4gICAgICBjb25zdCBkZXBlbmRzID0gW107XG4gICAgICBpZiAoc2NyaXB0LlNDUklQVCBpbnN0YW5jZW9mIEFic29sdXRlUGF0aClcbiAgICAgICAgZGVwZW5kcy5wdXNoKHNjcmlwdC5TQ1JJUFQudG9TdHJpbmcoKSk7XG4gICAgICBpZiAoc2NyaXB0LklOUFVUKVxuICAgICAgICBkZXBlbmRzLnB1c2goc2NyaXB0LklOUFVULnRvU3RyaW5nKCkpO1xuICAgICAgY29uc3QgbXNnID0gXCJcXHgxYlszNm1cIiArIFwiR2VuZXJhdGluZyBcIiArIHNjcmlwdC53b3JrRGlyLnJlbGF0aXZlKHNjcmlwdC5PVVRQVVQpICsgXCJcXHgxYlswbVwiO1xuICAgICAgY29uc3Qgd29ya2VyID0gbmV3IEdvYWxXb3JrZXJJbXBsKHNjcmlwdC5OQU1FKTtcbiAgICAgIHdvcmtlci5tZXNzYWdlID0gbXNnO1xuICAgICAgd29ya2VyLm91dHB1dCA9IHNjcmlwdC5PVVRQVVQudG9TdHJpbmcoKTtcbiAgICAgIHdvcmtlci5hZGREZXBlbmRlbmN5KC4uLmRlcGVuZHMpO1xuICAgICAgd29ya2VyLmFkZFNjcmlwdCh0aGlzLCBzY3JpcHQudmFyaWFibGVNYXAsIHNjcmlwdC5TQ1JJUFQpO1xuICAgICAgZ29hbExpc3QuYWRkKHdvcmtlcik7XG4gICAgfVxuXG4gICAgY29uc3Qgb2JqZWN0RmlsZXMgPSBuZXcgTWFwPFNvdXJjZUZpbGUsIEFic29sdXRlUGF0aD4oKTtcbiAgICBmb3IgKGNvbnN0IHRhcmdldCBvZiBPYmplY3QudmFsdWVzKHRoaXNbVEFSR0VUU10uRU5UUklFUykpIHtcbiAgICAgIGZvciAoY29uc3QgaXQgb2YgdGFyZ2V0LklNUEwuZ2V0U291cmNlRmlsZXMoKSkge1xuICAgICAgICBpZiAoIWl0LkxBTkdVQUdFKVxuICAgICAgICAgIGNvbnRpbnVlO1xuICAgICAgICBjb25zdCByZmlsZTEgPSB0YXJnZXQuVEFSR0VUX1NDT1BFLkJJTkFSWV9ESVIucmVsYXRpdmUoaXQuRklMRSk7XG4gICAgICAgIGNvbnN0IHJmaWxlMiA9ICB0YXJnZXQuVEFSR0VUX1NDT1BFLlNPVVJDRV9ESVIucmVsYXRpdmUoaXQuRklMRSk7XG4gICAgICAgIGNvbnN0IHJmaWxlID0gKHJmaWxlMi5sZW5ndGggPCByZmlsZTEubGVuZ3RoID8gcmZpbGUyIDogcmZpbGUxKS5yZXBsYWNlKFwiLi4vXCIsIFwiX18vXCIpO1xuICAgICAgICBjb25zdCBvZmlsZSA9ICB0YXJnZXQuVEFSR0VUX1NDT1BFLkJJTkFSWV9ESVIuam9pbihcIk1ha2VGaWxlc1wiLCB0YXJnZXQudGFyZ2V0TmFtZSArIFwiLmRpclwiLCAgcmZpbGUgKyBcIi5vYmpcIik7XG4gICAgICAgIG9iamVjdEZpbGVzLnNldChpdCwgb2ZpbGUpO1xuICAgICAgfVxuICAgIH1cblxuICAgIGZvciAoY29uc3QgW25hbWUsIHRhcmdldF0gb2YgT2JqZWN0LmVudHJpZXModGhpc1tUQVJHRVRTXS5FTlRSSUVTKSkge1xuICAgICAgY29uc3QgdGFyZ2V0SW1wbCA9IHRhcmdldC5JTVBMO1xuICAgICAgY29uc3QgZGVwZW5kcyA9IFtdO1xuICAgICAgZm9yIChjb25zdCBzIG9mIHRhcmdldC5JTVBMLmdldEludGVyZmFjZU9iamVjdHNMaXN0KCkpIHtcbiAgICAgICAgY29uc3QgdCA9IHRoaXNbVEFSR0VUU10uZ2V0KHMudGFyZ2V0TmFtZSkgYXMgQmFzZVRhcmdldDtcbiAgICAgICAgZm9yIChjb25zdCBmIG9mIHQuSU1QTC5nZXRTb3VyY2VGaWxlcygpKSB7XG4gICAgICAgICAgY29uc3QgbyA9IG9iamVjdEZpbGVzLmdldChmKTtcbiAgICAgICAgICBvICYmIGRlcGVuZHMucHVzaChvLnRvU3RyaW5nKCkpO1xuICAgICAgICB9XG4gICAgICB9XG4gIFxuICAgICAgY29uc3QgaGVhZGVycyA9IHRoaXNbVEFSR0VUU10uYWxsSGVhZGVyc09mKHRhcmdldCk7XG4gICAgICBmb3IgKGNvbnN0IHMgb2YgdGFyZ2V0LklNUEwuZ2V0U291cmNlRmlsZXMoKSkge1xuICAgICAgICBpZiAocy5IRUFERVJfRklMRV9PTkxZKVxuICAgICAgICAgIGNvbnRpbnVlO1xuXG4gICAgICAgIGNvbnN0IG8gPSBvYmplY3RGaWxlcy5nZXQocyk7XG4gICAgICAgIGlmICghbylcbiAgICAgICAgICB0aHJvdyBuZXcgRXJyb3IoYE9CSkVDVF9GSUxFIGlzIG51bGxgKTtcblxuICAgICAgICBmcy5ta2RpclN5bmMoby5kaXJuYW1lKCkudG9TdHJpbmcoKSwgeyByZWN1cnNpdmU6IHRydWUgfSk7XG4gIFxuICAgICAgICBjb25zdCByZWxhdGl2ZU9iamVjdCA9IHRhcmdldC5UQVJHRVRfU0NPUEUuQklOQVJZX0RJUi5yZWxhdGl2ZShvKTtcbiAgICAgICAgY29uc3QgcmVsYXRpdmVCaW5hcnlEaXIgPSBzY29wZS5QUk9KRUNUX0JJTkFSWV9ESVIucmVsYXRpdmUodGFyZ2V0LlRBUkdFVF9TQ09QRS5CSU5BUllfRElSKTtcbiAgICAgICAgY29uc3QgbXNnID0gXCJcXHgxYlszMm1cIiArIGBCdWlsZGluZyAke3MuTEFOR1VBR0V9IG9iamVjdCAke3JlbGF0aXZlQmluYXJ5RGlyfS8ke3JlbGF0aXZlT2JqZWN0fWAgKyBcIlxceDFiWzBtXCI7XG4gIFxuICAgICAgICBjb25zdCBkZWZpbml0aW9ucyA9IFtcbiAgICAgICAgICAuLi50aGlzW1RBUkdFVFNdLmFsbERlZmluaXRpb25zT2YodGFyZ2V0KSxcbiAgICAgICAgICAuLi5zLkRFRklORVMsXG4gICAgICAgIF07XG5cbiAgICAgICAgY29uc3QgYXJnczogc3RyaW5nW10gPSBbXTtcbiAgICAgICAgYXJncy5wdXNoKC4uLmRlZmluaXRpb25zLm1hcChpID0+IFwiLURcIiArIGkpKTtcbiAgICAgICAgYXJncy5wdXNoKC4uLnRoaXNbVEFSR0VUU10uYWxsSW5jbHVkZXNPZih0YXJnZXQpLm1hcChpID0+IFwiLUlcIiArIGkpKTtcbiAgICAgICAgYXJncy5wdXNoKC4uLnRoaXNbVEFSR0VUU10uYWxsQ29tcGlsZU9wdGlvbnNPZih0YXJnZXQpKTtcbiAgICAgICAgaWYgKHRhcmdldEltcGwucG9zaXRpb25JbmRlcGVuZGVudENvZGUpXG4gICAgICAgICAgYXJncy5wdXNoKFwiLWZQSUNcIik7XG4gICAgICAgIGFyZ3MucHVzaCguLi5zLkNPTVBJTEVfRkxBR1MuZmxhdCgpKTtcbiAgICAgICAgYXJncy5wdXNoKFwiLW9cIiwgcmVsYXRpdmVPYmplY3QpO1xuICAgICAgICBhcmdzLnB1c2goXCItY1wiLCBzLkZJTEUudG9TdHJpbmcoKSk7XG4gIFxuICAgICAgICBjb25zdCBjb21tYW5kID0gKHRhcmdldC5UQVJHRVRfU0NPUEUgYXMgYW55KVtzLkxBTkdVQUdFICsgXCJfQ09NUElMRVJcIl0udG9TdHJpbmcoKTtcbiAgICAgICAgY29uc3Qgb3V0cHV0ID0gQWJzb2x1dGVQYXRoLmNyZWF0ZSh0YXJnZXQuVEFSR0VUX1NDT1BFLkJJTkFSWV9ESVIuam9pbihyZWxhdGl2ZU9iamVjdCkpO1xuICAgICAgICBkZXBlbmRzLnB1c2gob3V0cHV0LnRvU3RyaW5nKCkpO1xuXG4gICAgICAgIGNvbnN0IHdvcmtlciA9IG5ldyBHb2FsV29ya2VySW1wbDtcbiAgICAgICAgd29ya2VyLm1lc3NhZ2UgPSBtc2c7XG4gICAgICAgIHdvcmtlci5vdXRwdXQgPSBvdXRwdXQudG9TdHJpbmcoKTtcbiAgICAgICAgd29ya2VyLmFkZERlcGVuZGVuY3koLi4uaGVhZGVycyk7XG4gICAgICAgIHdvcmtlci5hZGREZXBlbmRlbmN5KHMuRklMRS50b1N0cmluZygpKTtcbiAgICAgICAgd29ya2VyLmFkZEV4ZWMoY29tbWFuZCwgYXJncywgdGFyZ2V0LlRBUkdFVF9TQ09QRS5CSU5BUllfRElSLnRvU3RyaW5nKCkpO1xuICAgICAgICBnb2FsTGlzdC5hZGQod29ya2VyKTtcbiAgICAgIH1cblxuICAgICAgY29uc3QgZ2VuZXJhbEdvYWwgPSBuZXcgR29hbFdvcmtlckltcGw7XG4gICAgICBmb3IgKGNvbnN0IHBhcmFtcyBvZiB0YXJnZXQuSU1QTC5wcmVCdWlsZExpc3QpIHtcbiAgICAgICAgZ2VuZXJhbEdvYWwuYWRkRXhlYyhwYXJhbXMuY29tbWFuZC50b1N0cmluZygpLCBwYXJhbXMuYXJncy5tYXAoaSA9PiBpLnRvU3RyaW5nKCkpLCB0YXJnZXQuVEFSR0VUX1NDT1BFLkJJTkFSWV9ESVIudG9TdHJpbmcoKSk7XG4gICAgICB9XG5cbiAgICAgIGNvbnN0IGxpbmtPcHRpb25zID0gdGhpc1tUQVJHRVRTXS5hbGxMaW5rT3B0aW9uc09mKHRhcmdldCk7XG4gICAgICBpZiAodGFyZ2V0IGluc3RhbmNlb2YgT2JqZWN0TGlicmFyeSkge1xuICAgICAgICBjb25zdCBvYmpzID0gZGVwZW5kcy5maWx0ZXIoaSA9PiBpLmVuZHNXaXRoKFwiLm9cIikgfHwgaS5lbmRzV2l0aChcIi5vYmpcIikpLm1hcChpID0+IHRhcmdldC5GSUxFX0RJUi5yZWxhdGl2ZShpKSk7XG4gICAgICAgIGlmIChvYmpzLmxlbmd0aCkge1xuICAgICAgICAgIGNvbnN0IGFyZ3MgPSBbXG4gICAgICAgICAgICAuLi5saW5rT3B0aW9ucyxcbiAgICAgICAgICAgIFwiLXJcIixcbiAgICAgICAgICAgIFwiLW9cIiwgdGFyZ2V0LkZJTEVfTkFNRSxcbiAgICAgICAgICAgIC4uLm9ianNcbiAgICAgICAgICBdO1xuICAgICAgICAgIGdlbmVyYWxHb2FsLm1lc3NhZ2UgPSBgTGlua2luZyBDWFggb2JqZWN0IGxpYnJhcnkgJHt0YXJnZXQuRklMRV9OQU1FfWA7XG4gICAgICAgICAgZ2VuZXJhbEdvYWwub3V0cHV0ID0gdGFyZ2V0LkZJTEUudG9TdHJpbmcoKTtcbiAgICAgICAgICBnZW5lcmFsR29hbC5hZGREZXBlbmRlbmN5KC4uLmRlcGVuZHMpO1xuICAgICAgICAgIGdlbmVyYWxHb2FsLmFkZEV4ZWMoc2NvcGUuTElOS0VSLCBhcmdzLCB0YXJnZXQuRklMRV9ESVIudG9TdHJpbmcoKSk7XG4gICAgICAgIH1cbiAgICAgICAgZWxzZSB7XG4gICAgICAgICAgbG9nZ2VyLmluZm8oYE5vIG9iamVjdHMgZm9yIFwiJHt0YXJnZXQudGFyZ2V0TmFtZX1cImApO1xuICAgICAgICB9XG4gICAgICB9XG4gIFxuICAgICAgaWYgKHRhcmdldCBpbnN0YW5jZW9mIFN0YXRpY0xpYnJhcnkpIHtcbiAgICAgICAgY29uc3Qgb2JqcyA9IGRlcGVuZHMuZmlsdGVyKGkgPT4gaS5lbmRzV2l0aChcIi5vXCIpIHx8IGkuZW5kc1dpdGgoXCIub2JqXCIpKS5tYXAoaSA9PiB0YXJnZXQuRklMRV9ESVIucmVsYXRpdmUoaSkpO1xuICAgICAgICBpZiAob2Jqcy5sZW5ndGgpIHtcbiAgICAgICAgICBjb25zdCBhcmdzID0gWyBcInJjXCIsIHRhcmdldC5GSUxFX05BTUUgLCAuLi5vYmpzIF07XG4gICAgICAgICAgZ2VuZXJhbEdvYWwubWVzc2FnZSA9IGBMaW5raW5nIENYWCBzdGF0aWMgbGlicmFyeSAke3RhcmdldC5GSUxFX05BTUV9YDtcbiAgICAgICAgICBnZW5lcmFsR29hbC5vdXRwdXQgPSB0YXJnZXQuRklMRS50b1N0cmluZygpO1xuICAgICAgICAgIGdlbmVyYWxHb2FsLmFkZERlcGVuZGVuY3koLi4uZGVwZW5kcyk7XG4gICAgICAgICAgZ2VuZXJhbEdvYWwuYWRkRXhlYyhzY29wZS5BUiwgYXJncywgdGFyZ2V0LkZJTEVfRElSLnRvU3RyaW5nKCkpO1xuICAgICAgICB9XG4gICAgICAgIGVsc2Uge1xuICAgICAgICAgIGxvZ2dlci5pbmZvKGBObyBvYmplY3RzIGZvciBcIiR7dGFyZ2V0LnRhcmdldE5hbWV9XCJgKTtcbiAgICAgICAgfVxuICAgICAgfVxuICBcbiAgICAgIGlmICh0YXJnZXQgaW5zdGFuY2VvZiBTaGFyZWRMaWJyYXJ5KSB7XG4gICAgICAgIHRocm93IG5ldyBFcnJvcihcIk5vdCBpbXBsZW1lbnRlZFwiKTtcbiAgICAgIH1cblxuICAgICAgaWYgKHRhcmdldCBpbnN0YW5jZW9mIEV4ZWN1dGFibGUpIHtcbiAgICAgICAgY29uc3Qgb2JqcyA9IGRlcGVuZHMuZmlsdGVyKGkgPT4gaS5lbmRzV2l0aChcIi5vXCIpIHx8IGkuZW5kc1dpdGgoXCIub2JqXCIpKS5tYXAoaSA9PiB0YXJnZXQuRklMRV9ESVIucmVsYXRpdmUoaSkpO1xuICAgICAgICBpZiAob2Jqcy5sZW5ndGgpIHtcbiAgICAgICAgICBjb25zdCBsaWJzID0gdGhpc1tUQVJHRVRTXS5hbGxMaWJyYXJpZXNPZih0YXJnZXQpO1xuICAgICAgICAgIGNvbnN0IGFyZ3MgPSBbXG4gICAgICAgICAgICAuLi50YXJnZXQuVEFSR0VUX1NDT1BFLkNYWF9GTEFHUyxcbiAgICAgICAgICAgIC4uLmxpbmtPcHRpb25zLFxuICAgICAgICAgICAgLi4ub2JqcyxcbiAgICAgICAgICAgIFwiLW9cIiwgdGFyZ2V0LkZJTEVfTkFNRSxcbiAgICAgICAgICAgIC4uLmxpYnMubWFwKGkgPT4gdGFyZ2V0LkZJTEVfRElSLnJlbGF0aXZlKGkpKSxcbiAgICAgICAgICBdO1xuXG4gICAgICAgICAgZ2VuZXJhbEdvYWwubWVzc2FnZSA9IGBMaW5raW5nIENYWCBleGVjdXRhYmxlICR7dGFyZ2V0LkZJTEVfTkFNRX1gO1xuICAgICAgICAgIGdlbmVyYWxHb2FsLm91dHB1dCA9IHRhcmdldC5GSUxFLnRvU3RyaW5nKCk7XG4gICAgICAgICAgZ2VuZXJhbEdvYWwuYWRkRGVwZW5kZW5jeSguLi5kZXBlbmRzKTtcbiAgICAgICAgICBnZW5lcmFsR29hbC5hZGREZXBlbmRlbmN5KC4uLmxpYnMpO1xuICAgICAgICAgIGdlbmVyYWxHb2FsLmFkZEV4ZWMoc2NvcGUuQ1hYX0NPTVBJTEVSLCBhcmdzLCB0YXJnZXQuRklMRV9ESVIudG9TdHJpbmcoKSk7XG4gICAgICAgIH1cbiAgICAgICAgZWxzZSB7XG4gICAgICAgICAgbG9nZ2VyLmluZm8oYE5vIG9iamVjdHMgZm9yIFwiJHt0YXJnZXQudGFyZ2V0TmFtZX1cImApO1xuICAgICAgICB9XG4gICAgICB9XG5cbiAgICAgIGZvciAoY29uc3QgcGFyYW1zIG9mIHRhcmdldC5JTVBMLnBvc3RCdWlsZExpc3QpIHtcbiAgICAgICAgZ2VuZXJhbEdvYWwuYWRkRXhlYyhwYXJhbXMuY29tbWFuZC50b1N0cmluZygpLCBwYXJhbXMuYXJncy5tYXAoaSA9PiBpLnRvU3RyaW5nKCkpLCB0YXJnZXQuVEFSR0VUX1NDT1BFLkJJTkFSWV9ESVIudG9TdHJpbmcoKSk7XG4gICAgICB9XG4gICAgICBcbiAgICAgIGdvYWxMaXN0LmFkZChnZW5lcmFsR29hbCk7XG5cbiAgICAgIGNvbnN0IHdvcmtlciA9IG5ldyBHb2FsV29ya2VySW1wbChuYW1lKTtcbiAgICAgIHdvcmtlci5tZXNzYWdlID0gYEJ1aWx0IHRhcmdldCAke25hbWV9YDtcbiAgICAgIHdvcmtlci5hZGREZXBlbmRlbmN5KHRhcmdldC5GSUxFLnRvU3RyaW5nKCkpO1xuICAgICAgZ29hbExpc3QuYWRkKHdvcmtlcik7XG4gICAgfVxuXG4gICAgaW50ZXJmYWNlIEluc3RhbGxHb2FsUGFyYW1zIHtcbiAgICAgIHNyYzogc3RyaW5nO1xuICAgICAgZGVzdDogc3RyaW5nO1xuICAgIH07XG5cbiAgICBjb25zdCBpbnN0YWxsUGFpcnMgPSBuZXcgQXJyYXk8SW5zdGFsbEdvYWxQYXJhbXM+O1xuICAgIGZvciAoY29uc3QgaXRlciBvZiB0aGlzW0lOU1RBTExfTElTVF0pIHtcbiAgICAgIGxldCBzcmM6IHN0cmluZywgZGVzdDogYW55O1xuICAgICAgaWYgKGl0ZXIuVkFMVUUgaW5zdGFuY2VvZiBBYnNvbHV0ZVBhdGgpIHtcbiAgICAgICAgaWYgKHNjb3BlLlBSRVZFTlRfSU5TVEFMTF9GSUxFUylcbiAgICAgICAgICBjb250aW51ZTtcbiAgICAgICAgc3JjID0gaXRlci5WQUxVRS50b1N0cmluZygpO1xuICAgICAgICBjb25zdCByZmlsZSA9IChpdGVyLkJBU0VfRElSIGFzIGFueSkucmVsYXRpdmUoaXRlci5WQUxVRSk7XG4gICAgICAgIGRlc3QgPSBpdGVyLkRFU1RJTkFUSU9OLmpvaW4ocmZpbGUpO1xuICAgICAgfVxuICAgICAgZWxzZSBpZiAoaXRlci5WQUxVRSBpbnN0YW5jZW9mIFVzZXJJbmRpcmVjdFRhcmdldCkge1xuICAgICAgICBjb25zdCB0YXJnZXROYW1lID0gaXRlci5WQUxVRS50YXJnZXROYW1lO1xuICAgICAgICBjb25zdCB0YXJnZXQgPSB0aGlzW1RBUkdFVF9DT0xMRUNUSU9OXS5nZXQodGFyZ2V0TmFtZSk7XG4gICAgICAgIHNyYyA9IGdldEZpbGUodGFyZ2V0KS50b1N0cmluZygpO1xuICAgICAgICBkZXN0ID0gaXRlci5ERVNUSU5BVElPTi5qb2luKGdldEZpbGVOYW1lKHRhcmdldCkpO1xuICAgICAgfVxuICAgICAgZWxzZSB7XG4gICAgICAgIHRocm93IG5ldyBFcnJvcihgQ2FuIG5vdCBpbnN0YWxsICR7aXRlci5WQUxVRX1gKVxuICAgICAgfVxuICAgICAgaWYgKHNjb3BlLkRFU1RESVIpXG4gICAgICAgIGRlc3QgPSBzY29wZS5ERVNURElSLmpvaW4oZGVzdCkudG9TdHJpbmcoKTtcbiAgICAgIGRlc3QgPSBkZXN0LnRvU3RyaW5nKCk7XG4gICAgICBpbnN0YWxsUGFpcnMucHVzaCh7c3JjLCBkZXN0fSk7XG4gICAgfVxuXG4gICAgaWYgKGluc3RhbGxQYWlycy5sZW5ndGgpIHtcbiAgICAgIGNvbnN0IHdvcmtlciA9IG5ldyBHb2FsV29ya2VySW1wbChJTlNUQUxMX1RBUkdFVCk7XG4gICAgICBpbnN0YWxsUGFpcnMuZm9yRWFjaChpID0+IHZvaWQgd29ya2VyLmFkZERlcGVuZGVuY3koaS5zcmMpKTtcbiAgICAgIHdvcmtlci5hZGRDYWxsYmFjayhhc3luYyAoKSA9PiB7XG4gICAgICAgIGZvciAoY29uc3Qge3NyYywgZGVzdH0gb2YgaW5zdGFsbFBhaXJzKSB7XG4gICAgICAgICAgbG9nZ2VyLm5vdGljZShcIkluc3RhbGxpbmc6IFwiICsgZGVzdCk7XG4gICAgICAgICAgYXdhaXQgZnMucHJvbWlzZXMubWtkaXIoUGF0aC5kaXJuYW1lKGRlc3QpLCB7IHJlY3Vyc2l2ZTogdHJ1ZSB9KTtcbiAgICAgICAgICBhd2FpdCBmcy5wcm9taXNlcy5jcChzcmMudG9TdHJpbmcoKSwgZGVzdC50b1N0cmluZygpLCB7IGZvcmNlOiB0cnVlIH0pO1xuICAgICAgICB9XG4gICAgICB9KTtcbiAgICAgIGdvYWxMaXN0LmFkZCh3b3JrZXIpO1xuICAgIH1cblxuICAgIGNvbnN0IHdvcmtlciA9IG5ldyBHb2FsV29ya2VySW1wbChBTExfVEFSR0VUKTtcbiAgICBPYmplY3Qua2V5cyh0aGlzW1RBUkdFVFNdLkVOVFJJRVMpLmZvckVhY2goaSA9PiB2b2lkIHdvcmtlci5hZGREZXBlbmRlbmN5KGkpKVxuICAgIGdvYWxMaXN0LmFkZCh3b3JrZXIpO1xuICBcbiAgICByZXR1cm4gZ29hbExpc3Q7XG4gIH1cblxuICBwdWJsaWMgdG9KU09OKCkge1xuICAgIHJldHVybiB7XG4gICAgICBUQVJHRVRTOiB0aGlzLlRBUkdFVFMsXG4gICAgICBDVVNUT01fU0NSSVBUUzogdGhpc1tDVVNUT01fU0NSSVBUU10sXG4gICAgICBDQUNIRTogdGhpcy5DQUNIRSxcbiAgICAgIGludGVyZmFjZVNjcmlwdHM6IHRoaXMuX2ludGVyZmFjZVNjcmlwdHMsXG4gICAgICBJTlNUQUxMX0xJU1Q6IHRoaXNbSU5TVEFMTF9MSVNUXSxcbiAgICAgIHByb2Nlc3NlZFZhcmlhYmxlTWFwOiB0aGlzLl9wcm9jZXNzZWRWYXJpYWJsZU1hcCxcbiAgICAgIHN1YmRpckFsaWFzOiB0aGlzLl9zdWJkaXJBbGlhcyxcbiAgICAgIFRBUkdFVF9DT0xMRUNUSU9OOiB0aGlzW1RBUkdFVF9DT0xMRUNUSU9OXSxcbiAgICB9O1xuICB9XG59O1xuIiwiLypcbiAqIE1JVCBMaWNlbnNlXG4gKlxuICogQ29weXJpZ2h0IChjKSAyMDI1ICBZdXJpaSBZYWt1YmluICh5dXJpaS55YWt1YmluQGdtYWlsLmNvbSlcbiAqXG4gKiBQZXJtaXNzaW9uIGlzIGdyYW50ZWQgdG8gdXNlLCBjb3B5LCBtb2RpZnksIGFuZCBkaXN0cmlidXRlIHRoaXMgc29mdHdhcmVcbiAqIHVuZGVyIHRoZSBNSVQgTGljZW5zZS4gU2VlIExJQ0VOU0UgZmlsZSBmb3IgZGV0YWlscy5cbiAqL1xuXG5pbXBvcnQgeyBBYnNvbHV0ZVBhdGggfSBmcm9tIFwiQC9jb3JlL0Fic29sdXRlUGF0aFwiO1xuaW1wb3J0IHsgZGVlcENvcHkgfSBmcm9tIFwiQC91dGlscy9QcmltaXRpdmVzXCI7XG5cbmludGVyZmFjZSBWYXJpYWJsZURlc2NyaXB0b3Ige1xuICB0eXBlPzogc3RyaW5nIHwgc3RyaW5nW107XG4gIHZhbHVlPzogYW55O1xuICBkZXNjcmlwdGlvbj86IHN0cmluZztcbn07XG5cbmludGVyZmFjZSBWYXJpYWJsZUVudHJ5IHtcbiAgbmFtZTogc3RyaW5nO1xuICB0eXBlOiBzdHJpbmcgfCBzdHJpbmdbXTtcbiAgZ3JvdXA6IHN0cmluZztcbiAgZGVzY3JpcHRpb246IHN0cmluZztcbiAgaW5pdFZhbHVlPzogYW55O1xuICB2YWx1ZT86IGFueTtcbn07XG5cbmV4cG9ydCBpbnRlcmZhY2UgVmFyaWFibGVNYXAge1xuICBbIG5hbWU6IHN0cmluZyBdOiBWYXJpYWJsZUVudHJ5O1xufTtcblxuZXhwb3J0IHR5cGUgVmFyaWFudCA9IGJvb2xlYW4gfCBudW1iZXIgfCBzdHJpbmcgfCBib29sZWFuW10gfCBudW1iZXJbXSB8IHN0cmluZ1tdO1xuZXhwb3J0IHR5cGUgVmFyaWFudE1hcCA9IHtcbiAgWyBuYW1lOiBzdHJpbmcgXTogVmFyaWFudDtcbn07XG5cbmV4cG9ydCBuYW1lc3BhY2UgU2NvcGVIZWxwZXIge1xuXG5mdW5jdGlvbiB0b0Rlc2NyaXB0b3IodmFsdWU6IGFueSk6IFZhcmlhYmxlRGVzY3JpcHRvciB7XG4gIGlmICghdmFsdWUgfHwgdHlwZW9mIHZhbHVlID09PSBcImJvb2xlYW5cIiB8fCB0eXBlb2YgdmFsdWUgPT09IFwibnVtYmVyXCIgfHwgdHlwZW9mIHZhbHVlID09PSBcInN0cmluZ1wiIHx8IEFycmF5LmlzQXJyYXkodmFsdWUpKSB7XG4gICAgcmV0dXJuIHsgdmFsdWUgfTsgXG4gIH1cbiAgcmV0dXJuIHZhbHVlO1xufVxuXG5leHBvcnQgZnVuY3Rpb24gZ2V0RW50cnlWYWx1ZShlbnRyeTogVmFyaWFibGVFbnRyeSk6IGFueSB7XG4gIC8qaWYgKHZhbHVlID09PSB1bmRlZmluZWQpXG4gICAgdGhyb3cgbmV3IEVycm9yKGBWYWx1ZSBvZiAke25hbWV9IGNhbm5vdCBiZSBvYnRhaW5lZCBiZWNhdXNlIGl0IGhhcyBub3QgYmVlbiBlc3RhYmxpc2hlZGApOyovXG4gIHJldHVybiAoZW50cnkudmFsdWUgPT09IHVuZGVmaW5lZCkgPyBlbnRyeS5pbml0VmFsdWUgOiBlbnRyeS52YWx1ZTtcbn1cblxuZXhwb3J0IGZ1bmN0aW9uIGdldCh2YXJpYWJsZU1hcDogVmFyaWFibGVNYXAsIG5hbWU6IHN0cmluZyk6IGFueSB7XG4gIGNvbnN0IGVudHJ5ID0gdmFyaWFibGVNYXBbbmFtZV07XG4gIGlmIChlbnRyeSlcbiAgICByZXR1cm4gZ2V0RW50cnlWYWx1ZShlbnRyeSk7XG59XG5cbmNvbnN0IG1ha2VWYWx1ZU1hcDogYW55ID0ge1xuICBhcnJheTogKHZhbHVlOiBhbnkpID0+IHtcbiAgICByZXR1cm4gQXJyYXkuaXNBcnJheSh2YWx1ZSkgPyBBcnJheS5mcm9tKHZhbHVlKSA6IHVuZGVmaW5lZDtcbiAgfSxcbiAgYm9vbGVhbjogKHZhbHVlOiBhbnkpID0+IHtcbiAgICByZXR1cm4gKHR5cGVvZiB2YWx1ZSA9PT0gXCJib29sZWFuXCIpID8gdmFsdWUgOiB1bmRlZmluZWQ7XG4gIH0sXG4gIG51bWJlcjogKHZhbHVlOiBhbnkpID0+IHtcbiAgICByZXR1cm4gKHR5cGVvZiB2YWx1ZSA9PT0gXCJudW1iZXJcIikgPyB2YWx1ZSA6IHVuZGVmaW5lZDtcbiAgfSxcbiAgc3RyaW5nOiAodmFsdWU6IGFueSkgPT4ge1xuICAgIHJldHVybiAodHlwZW9mIHZhbHVlID09PSBcInN0cmluZ1wiKSA/IHZhbHVlIDogdW5kZWZpbmVkO1xuICB9LFxuICBBYnNvbHV0ZVBhdGg6ICh2YWx1ZTogYW55KSA9PiB7XG4gICAgcmV0dXJuIEFic29sdXRlUGF0aC5jcmVhdGUodmFsdWUpO1xuICB9LFxuICBGaWxlUGF0aDogKHZhbHVlOiBhbnkpID0+IHtcbiAgICByZXR1cm4gQWJzb2x1dGVQYXRoLmNyZWF0ZSh2YWx1ZSk7XG4gIH0sXG4gIERpclBhdGg6ICh2YWx1ZTogYW55KSA9PiB7XG4gICAgcmV0dXJuIEFic29sdXRlUGF0aC5jcmVhdGUodmFsdWUpO1xuICB9LFxuICBvYmplY3Q6ICh2YWx1ZTogYW55KSA9PiB7XG4gICAgcmV0dXJuIHZhbHVlO1xuICB9LFxufTtcblxuY29uc3QgdG9qc29uVmFsdWVNYXA6IGFueSA9IHtcbiAgYXJyYXk6ICh2YWx1ZTogYW55KSA9PiB7XG4gICAgY29uc3QgcmVzdWx0ID0gW107XG4gICAgZm9yIChjb25zdCBpdGVyIG9mIHZhbHVlKSB7XG4gICAgICBpZiAoaXRlciAmJiB0eXBlb2YgaXRlciA9PT0gXCJvYmplY3RcIilcbiAgICAgICAgcmVzdWx0LnB1c2godHlwZW9mIGl0ZXIudG9KU09OID09PSBcImZ1bmN0aW9uXCIgPyBpdGVyLnRvSlNPTigpIDogZGVlcENvcHkoaXRlcikpO1xuICAgICAgZWxzZVxuICAgICAgICByZXN1bHQucHVzaChpdGVyKTtcbiAgICB9XG4gICAgcmV0dXJuIHJlc3VsdDtcbiAgfSxcbiAgYm9vbGVhbjogKHZhbHVlOiBhbnkpID0+IHtcbiAgICByZXR1cm4gdmFsdWU7XG4gIH0sXG4gIG51bWJlcjogKHZhbHVlOiBhbnkpID0+IHtcbiAgICByZXR1cm4gdmFsdWU7XG4gIH0sXG4gIHN0cmluZzogKHZhbHVlOiBhbnkpID0+IHtcbiAgICByZXR1cm4gdmFsdWU7XG4gIH0sXG4gIEFic29sdXRlUGF0aDogKHZhbHVlOiBhbnkpID0+IHtcbiAgICByZXR1cm4gdmFsdWUudG9KU09OKCk7XG4gIH0sXG4gIEZpbGVQYXRoOiAodmFsdWU6IGFueSkgPT4ge1xuICAgIHJldHVybiB2YWx1ZS50b0pTT04oKTtcbiAgfSxcbiAgRGlyUGF0aDogKHZhbHVlOiBhbnkpID0+IHtcbiAgICByZXR1cm4gdmFsdWUudG9KU09OKCk7XG4gIH0sXG4gIG9iamVjdDogKHZhbHVlOiBhbnkpID0+IHtcbiAgICByZXR1cm4gZGVlcENvcHkodmFsdWUpO1xuICB9LFxufTtcblxuZXhwb3J0IGZ1bmN0aW9uIG1ha2VKU09OVmFsdWUoZW50cnk6IFZhcmlhYmxlRW50cnksIHZhbHVlOiBhbnkpOiBhbnkge1xuICBpZiAoQXJyYXkuaXNBcnJheShlbnRyeS50eXBlKSlcbiAgICByZXR1cm4gdmFsdWU7XG4gIGNvbnN0IGZ1bmMgPSB0b2pzb25WYWx1ZU1hcFtlbnRyeS50eXBlXTtcbiAgaWYgKCFmdW5jKVxuICAgIHRocm93IG5ldyBFcnJvcihgVW5rbm93biB0eXBlIFwiJHtlbnRyeS50eXBlfVwiIGZvciAke2VudHJ5Lm5hbWV9YCk7XG4gIHJldHVybiBmdW5jKHZhbHVlKTtcbn1cblxuZXhwb3J0IGZ1bmN0aW9uIG1ha2VFbnRyeVZhbHVlKGVudHJ5OiBWYXJpYWJsZUVudHJ5LCB2YWx1ZTogYW55KTogYW55IHtcbiAgbGV0IG5ld1ZhbHVlOiBhbnk7XG4gIGlmIChBcnJheS5pc0FycmF5KGVudHJ5LnR5cGUpKVxuICAgIG5ld1ZhbHVlID0gZW50cnkudHlwZS5pbmNsdWRlcyh2YWx1ZSkgPyB2YWx1ZSA6IHVuZGVmaW5lZDtcbiAgZWxzZSB7XG4gICAgY29uc3QgZnVuYyA9IG1ha2VWYWx1ZU1hcFtlbnRyeS50eXBlXTtcbiAgICBpZiAoIWZ1bmMpXG4gICAgICB0aHJvdyBuZXcgRXJyb3IoYFVua25vd24gdHlwZSBcIiR7ZW50cnkudHlwZX1cIiBmb3IgJHtlbnRyeS5uYW1lfWApO1xuICAgIG5ld1ZhbHVlID0gZnVuYyh2YWx1ZSk7XG4gIH1cbiAgaWYgKG5ld1ZhbHVlID09PSB1bmRlZmluZWQpXG4gICAgdGhyb3cgbmV3IFR5cGVFcnJvcihgQXR0ZW1wdGluZyB0byBzZXQgXCIke3ZhbHVlfVwiIHRvICR7ZW50cnkubmFtZX0gYXMgYW4gJHtlbnRyeS50eXBlfWApO1xuICByZXR1cm4gbmV3VmFsdWU7XG59XG5cbmV4cG9ydCBmdW5jdGlvbiBjb3B5RW50cnlWYWx1ZShlbnRyeTogVmFyaWFibGVFbnRyeSwgdHJhbnNmb3JtOiAoZW50cnk6IFZhcmlhYmxlRW50cnksIHZhbHVlOiBhbnkpID0+IGFueSkge1xuICBjb25zdCByZXN1bHQ6IFZhcmlhYmxlRW50cnkgPSB7XG4gICAgbmFtZTogZW50cnkubmFtZSxcbiAgICB0eXBlOiBlbnRyeS50eXBlLFxuICAgIGdyb3VwOiBlbnRyeS5ncm91cCxcbiAgICBkZXNjcmlwdGlvbjogZW50cnkuZGVzY3JpcHRpb24sXG4gIH07XG4gIGlmIChlbnRyeS5pbml0VmFsdWUgIT09IHVuZGVmaW5lZClcbiAgICByZXN1bHQuaW5pdFZhbHVlID0gdHJhbnNmb3JtKGVudHJ5LCBlbnRyeS5pbml0VmFsdWUpO1xuICBpZiAoZW50cnkudmFsdWUgIT09IHVuZGVmaW5lZClcbiAgICByZXN1bHQudmFsdWUgPSB0cmFuc2Zvcm0oZW50cnksIGVudHJ5LnZhbHVlKTtcbiAgcmV0dXJuIHJlc3VsdDtcbn1cblxuZXhwb3J0IGZ1bmN0aW9uIGZyb21KU09OKHZhcmlhYmxlTWFwOiBWYXJpYWJsZU1hcCk6IFZhcmlhYmxlTWFwIHtcbiAgY29uc3QgcmVzdWx0OiBWYXJpYWJsZU1hcCA9IHt9O1xuICBmb3IgKGNvbnN0IFtrZXksIHZhbF0gb2YgT2JqZWN0LmVudHJpZXModmFyaWFibGVNYXApKVxuICAgIHJlc3VsdFtrZXldID0gY29weUVudHJ5VmFsdWUodmFsLCBtYWtlRW50cnlWYWx1ZSk7XG4gIHJldHVybiByZXN1bHQ7XG59XG5cbmV4cG9ydCBmdW5jdGlvbiB0b0pTT04odmFyaWFibGVNYXA6IFZhcmlhYmxlTWFwKTogVmFyaWFibGVNYXAge1xuICBjb25zdCByZXN1bHQ6IFZhcmlhYmxlTWFwID0ge307XG4gIGZvciAoY29uc3QgW2tleSwgdmFsXSBvZiBPYmplY3QuZW50cmllcyh2YXJpYWJsZU1hcCkpXG4gICAgcmVzdWx0W2tleV0gPSBjb3B5RW50cnlWYWx1ZSh2YWwsIG1ha2VKU09OVmFsdWUpO1xuICByZXR1cm4gcmVzdWx0O1xufVxuXG5leHBvcnQgZnVuY3Rpb24gc2V0RW50cnlWYWx1ZShlbnRyeTogVmFyaWFibGVFbnRyeSwgdmFsdWU6IGFueSk6IGFueSB7XG4gIGVudHJ5LnZhbHVlID0gbWFrZUVudHJ5VmFsdWUoZW50cnksIHZhbHVlKTtcbn1cblxuZXhwb3J0IGZ1bmN0aW9uIHNldCh2YXJpYWJsZU1hcDogVmFyaWFibGVNYXAsIG5hbWU6IHN0cmluZywgdmFsdWU6IGFueSk6IHZvaWQge1xuICBjb25zdCBlbnRyeSA9IHZhcmlhYmxlTWFwW25hbWVdO1xuICBpZiAoIWVudHJ5KVxuICAgIHRocm93IG5ldyBFcnJvcihgVmFyaWFibGUgXCIke25hbWV9XCIgZG9lcyBub3QgZXhpc3RzYCk7XG4gIHNldEVudHJ5VmFsdWUoZW50cnksIHZhbHVlKTtcbn1cblxuZXhwb3J0IGZ1bmN0aW9uIHJlc2V0KHZhcmlhYmxlTWFwOiBWYXJpYWJsZU1hcCwgbmFtZTogc3RyaW5nKTogdm9pZCB7XG4gIGNvbnN0IGVudHJ5ID0gdmFyaWFibGVNYXBbbmFtZV07XG4gIGlmICghZW50cnkpXG4gICAgdGhyb3cgbmV3IEVycm9yKGBWYXJpYWJsZSBcIiR7bmFtZX1cIiBkb2VzIG5vdCBleGlzdHNgKTtcbiAgZW50cnkudmFsdWUgPSB1bmRlZmluZWQ7XG59XG5cbmV4cG9ydCBmdW5jdGlvbiBkZWZpbmVWYXJpYWJsZShtYXA6IFZhcmlhYmxlTWFwLCBncm91cDogc3RyaW5nLCBuYW1lOiBzdHJpbmcsIGRlc2NyaXB0b3I6IFZhcmlhYmxlRGVzY3JpcHRvcikge1xuICBsZXQgZGVmaW5lRW50cnkgPSBtYXBbbmFtZV07XG4gIGxldCBpc1ZhbGlkVmFsdWUgPSAodmFsdWU6IGFueSkgPT4gdHJ1ZTtcbiAgaWYgKCFkZWZpbmVFbnRyeSkge1xuICAgIGRlZmluZUVudHJ5ID0ge1xuICAgICAgbmFtZSxcbiAgICAgIHR5cGU6IFwiXCIsIGdyb3VwLCB2YWx1ZTogdW5kZWZpbmVkLCAgaW5pdFZhbHVlOiB1bmRlZmluZWQsIGRlc2NyaXB0aW9uOiBcIlwiLFxuICAgIH07XG4gICAgbWFwW25hbWVdID0gZGVmaW5lRW50cnk7XG4gIH1cbiAgZWxzZSBpZiAoZ3JvdXAgIT09IGRlZmluZUVudHJ5Lmdyb3VwKSB7XG4gICAgaWYgKGRlZmluZUVudHJ5Lmdyb3VwKVxuICAgICAgdGhyb3cgbmV3IEVycm9yKGBBdHRlbXB0aW5nIHRvIHJlY3JlYXRlIFwiJHtuYW1lfVwiIHZhcmlhYmxlIHdpdGggXCIke2RlZmluZUVudHJ5Lmdyb3VwfVwiIGdyb3VwIGluIGFub3RoZXIgXCIke2dyb3VwfVwiYCk7XG4gICAgZGVmaW5lRW50cnkuZ3JvdXAgPSBncm91cDtcbiAgfVxuXG4gIGRlZmluZUVudHJ5LnR5cGUgPSBkZXNjcmlwdG9yLnR5cGUgfHwgZGVmaW5lRW50cnkudHlwZTtcbiAgZGVmaW5lRW50cnkuZGVzY3JpcHRpb24gPSBkZXNjcmlwdG9yLmRlc2NyaXB0aW9uIHx8IGRlZmluZUVudHJ5LmRlc2NyaXB0aW9uO1xuXG4gIGxldCB0eXBlOiBzdHJpbmcgfCBzdHJpbmdbXTtcbiAgaWYgKGRlZmluZUVudHJ5LnR5cGUpXG4gICAgdHlwZSA9IGRlZmluZUVudHJ5LnR5cGU7XG4gIGVsc2UgaWYgKEFycmF5LmlzQXJyYXkoZGVzY3JpcHRvci52YWx1ZSkpXG4gICAgdHlwZSA9IFwiYXJyYXlcIjtcbiAgZWxzZSBpZiAoZGVzY3JpcHRvci52YWx1ZSBpbnN0YW5jZW9mIEFic29sdXRlUGF0aClcbiAgICB0eXBlID0gXCJBYnNvbHV0ZVBhdGhcIjtcbiAgZWxzZVxuICAgIHR5cGUgPSB0eXBlb2YgZGVzY3JpcHRvci52YWx1ZTtcblxuICBpZiAoQXJyYXkuaXNBcnJheSh0eXBlKSkge1xuICAgIGNvbnN0IGVudW1MaXN0ID0gdHlwZTtcbiAgICBsZXQgaXRlbVR5cGU7XG4gICAgZm9yIChjb25zdCBpdGVyIG9mIGVudW1MaXN0KSB7XG4gICAgICBjb25zdCBpdCA9IHR5cGVvZiBpdGVyO1xuICAgICAgaWYgKCFpdGVtVHlwZSlcbiAgICAgICAgaXRlbVR5cGUgPSBpdDtcbiAgICAgIGVsc2UgaWYgKGl0ZW1UeXBlICE9PSBpdClcbiAgICAgICAgdGhyb3cgbmV3IEVycm9yKGBBbGwgZWxlbWVudHMgZm9yICR7bmFtZX0gbXVzdCBiZSBvZiB0aGUgc2FtZSB0eXBlYCk7XG4gICAgfVxuICAgIGlmIChpdGVtVHlwZSAhPT0gXCJib29sZWFuXCIgJiYgaXRlbVR5cGUgIT09IFwibnVtYmVyXCIgJiYgaXRlbVR5cGUgIT09IFwic3RyaW5nXCIpXG4gICAgICB0aHJvdyBuZXcgRXJyb3IoYEVudW0gJHtuYW1lfSBub3Qgc3VwcG9ydCAke2l0ZW1UeXBlfSB0eXBlYCk7XG4gICAgaXNWYWxpZFZhbHVlID0gKHZhbHVlOiBhbnkpID0+IGVudW1MaXN0LmluY2x1ZGVzKHZhbHVlKTtcbiAgfVxuICBlbHNlIGlmICh0eXBlID09PSBcImJvb2xlYW5cIikge1xuICAgIGlzVmFsaWRWYWx1ZSA9ICh2YWx1ZTogYW55KSA9PiB0eXBlb2YgdmFsdWUgPT09IFwiYm9vbGVhblwiO1xuICB9XG4gIGVsc2UgaWYgKHR5cGUgPT09IFwibnVtYmVyXCIpIHtcbiAgICBpc1ZhbGlkVmFsdWUgPSAodmFsdWU6IGFueSkgPT4gdHlwZW9mIHZhbHVlID09PSBcIm51bWJlclwiO1xuICB9XG4gIGVsc2UgaWYgKHR5cGUgPT09IFwic3RyaW5nXCIpIHtcbiAgICBpc1ZhbGlkVmFsdWUgPSAodmFsdWU6IGFueSkgPT4gdHlwZW9mIHZhbHVlID09PSBcInN0cmluZ1wiO1xuICB9XG4gIGVsc2UgaWYgKHR5cGUgPT09IFwiYXJyYXlcIikge1xuICAgIGlzVmFsaWRWYWx1ZSA9IEFycmF5LmlzQXJyYXk7XG4gIH1cbiAgZWxzZSBpZiAodHlwZSA9PT0gXCJBYnNvbHV0ZVBhdGhcIiB8fCB0eXBlID09PSBcIkZpbGVQYXRoXCIgfHwgdHlwZSA9PT0gXCJEaXJQYXRoXCIpIHtcbiAgICBpc1ZhbGlkVmFsdWUgPSAodmFsdWU6IGFueSkgPT4gISFBYnNvbHV0ZVBhdGguY3JlYXRlKHZhbHVlKTtcbiAgfVxuICBlbHNlIGlmICh0eXBlICE9PSBcIm9iamVjdFwiICYmIHR5cGUgIT09IFwiZW51bVwiKSB7XG4gICAgdGhyb3cgbmV3IEVycm9yKGBWYXJpYWJsZSBcIiR7bmFtZX1cIiBoYXMgd3JvbmcgXCIke3R5cGV9XCIgdHlwZWApO1xuICB9XG5cbiAgaWYgKGRlc2NyaXB0b3IudmFsdWUgPT09IHVuZGVmaW5lZCkge1xuICAgIGRlZmluZUVudHJ5LmluaXRWYWx1ZSA9ICh0eXBlID09PSBcImFycmF5XCIpID8gW10gOiB1bmRlZmluZWQ7XG4gIH1cbiAgZWxzZSB7XG4gICAgaWYgKCFpc1ZhbGlkVmFsdWUoZGVzY3JpcHRvci52YWx1ZSkpXG4gICAgICAgIHRocm93IG5ldyBUeXBlRXJyb3IoYEF0dGVtcHRpbmcgdG8gc2V0IFwiJHtkZXNjcmlwdG9yLnZhbHVlfVwiIHRvICR7bmFtZX0gYXMgaW5pdFZhbHVlYCk7XG4gICAgZGVmaW5lRW50cnkuaW5pdFZhbHVlID0gKHR5cGUgPT09IFwiYXJyYXlcIikgPyBBcnJheS5mcm9tKGRlc2NyaXB0b3IudmFsdWUpIDogZGVzY3JpcHRvci52YWx1ZTtcbiAgfVxuXG4gIGRlZmluZUVudHJ5LnR5cGUgPSB0eXBlO1xuICBpZiAoZGVmaW5lRW50cnkuaW5pdFZhbHVlICE9PSB1bmRlZmluZWQpIHtcbiAgICBkZWZpbmVFbnRyeS5pbml0VmFsdWUgPSBtYWtlRW50cnlWYWx1ZShkZWZpbmVFbnRyeSwgZGVmaW5lRW50cnkuaW5pdFZhbHVlKTtcbiAgfVxuICBpZiAoZGVmaW5lRW50cnkudmFsdWUgIT09IHVuZGVmaW5lZCkge1xuICAgIGRlZmluZUVudHJ5LnZhbHVlID0gbWFrZUVudHJ5VmFsdWUoZGVmaW5lRW50cnksIGRlZmluZUVudHJ5LnZhbHVlKTtcbiAgfVxufVxuXG5leHBvcnQgZnVuY3Rpb24gY3JlYXRlUHJveHk8VD4obWFwOiBWYXJpYWJsZU1hcCwgbz86IGFueSk6IFQge1xuICBvID0gbyB8fCB7fTtcbiAgY29uc3QgaGFuZGxlcjogUHJveHlIYW5kbGVyPGFueT4gPSB7XG4gICAgZ2V0KHRhcmdldDogVmFyaWFibGVNYXAsIGtleTogc3RyaW5nLCByZWNlaXZlcjogYW55KSB7XG4gICAgICBjb25zdCBlbnRyeSA9IHRhcmdldFtrZXldO1xuICAgICAgaWYgKGVudHJ5KVxuICAgICAgICByZXR1cm4gZ2V0RW50cnlWYWx1ZShlbnRyeSk7XG4gICAgICByZXR1cm4gb1trZXldO1xuICAgIH0sXG4gICAgc2V0KHRhcmdldDogVmFyaWFibGVNYXAsIGtleTogc3RyaW5nLCB2YWx1ZTogYW55KTogYm9vbGVhbiB7XG4gICAgICBjb25zdCBlbnRyeSA9IHRhcmdldFtrZXldO1xuICAgICAgaWYgKGVudHJ5KVxuICAgICAgICBzZXRFbnRyeVZhbHVlKGVudHJ5LCB2YWx1ZSk7XG4gICAgICBlbHNlXG4gICAgICAgIGRlZmluZVZhcmlhYmxlKHRhcmdldCwgXCJcIiwga2V5LCB0b0Rlc2NyaXB0b3IodmFsdWUpKTtcbiAgICAgIHJldHVybiB0cnVlO1xuICAgIH0sXG4gICAgaGFzKHRhcmdldDogVmFyaWFibGVNYXAsIGtleTogc3RyaW5nKSB7XG4gICAgICByZXR1cm4gdGFyZ2V0Lmhhc093blByb3BlcnR5KGtleSkgfHwgKGtleSBpbiB0YXJnZXQpO1xuICAgIH0sXG4gICAgb3duS2V5cyh0YXJnZXQ6IFZhcmlhYmxlTWFwKSB7XG4gICAgICByZXR1cm4gT2JqZWN0LmtleXModGFyZ2V0KTtcbiAgICB9LFxuICAgIGRlbGV0ZVByb3BlcnR5KHRhcmdldDogVmFyaWFibGVNYXAsIGtleTogc3RyaW5nKSB7XG4gICAgICB0aHJvdyBuZXcgRXJyb3IoYENhbm5vdCBkZWxldGUgJHtrZXl9IHZhbHVlYCk7XG4gICAgfSxcbiAgfTtcbiAgcmV0dXJuIG5ldyBQcm94eShtYXAsIGhhbmRsZXIpO1xufVxuXG5leHBvcnQgZnVuY3Rpb24gY2xvbmVWYXJpYWJsZU1hcChtYXA6IFZhcmlhYmxlTWFwKSB7XG4gIGNvbnN0IHJlc3VsdDogVmFyaWFibGVNYXAgPSB7fTtcbiAgZm9yIChjb25zdCBbIG5hbWUsIGVudHJ5IF0gb2YgT2JqZWN0LmVudHJpZXMobWFwKSkge1xuICAgIGRlZmluZVZhcmlhYmxlKHJlc3VsdCwgZW50cnkuZ3JvdXAsIG5hbWUsIHtcbiAgICAgIHR5cGU6IGVudHJ5LnR5cGUsXG4gICAgICBkZXNjcmlwdGlvbjogZW50cnkuZGVzY3JpcHRpb24sXG4gICAgICB2YWx1ZTogZW50cnkuaW5pdFZhbHVlLFxuICAgIH0pO1xuICAgIGlmIChnZXRFbnRyeVZhbHVlKGVudHJ5KSAhPT0gdW5kZWZpbmVkKVxuICAgICAgcmVzdWx0W25hbWVdLnZhbHVlID0gZ2V0RW50cnlWYWx1ZShlbnRyeSk7XG4gIH1cbiAgcmV0dXJuIHJlc3VsdDtcbn1cblxuZXhwb3J0IGZ1bmN0aW9uIGV4dGVuZFZhcmlhYmxlTWFwQnlWYWx1ZXMobWFwOiBWYXJpYWJsZU1hcCwgZ3JvdXA6IHN0cmluZywgdmFsdWVzOiB7IFsga2V5OiBzdHJpbmcgXTogYW55IH0pIHtcbiAgZm9yIChjb25zdCBbbmFtZSwgdmFsdWVdIG9mIE9iamVjdC5lbnRyaWVzKHZhbHVlcykpIHtcbiAgICBkZWZpbmVWYXJpYWJsZShtYXAsIGdyb3VwLCBuYW1lLCB7IHZhbHVlIH0pO1xuICAgIG1hcFtuYW1lXS52YWx1ZSA9IHZhbHVlO1xuICB9XG59XG5cbmV4cG9ydCBmdW5jdGlvbiBkZWZpbmVWYXJpYWJsZXNJblZhcmlhYmxlTWFwKG1hcDogVmFyaWFibGVNYXAsIGdyb3VwOiBzdHJpbmcsIHZhcmlhYmxlczogYW55KSB7XG4gIGZvciAoY29uc3QgW25hbWUsIHZhbHVlXSBvZiBPYmplY3QuZW50cmllcyh2YXJpYWJsZXMpKSB7XG4gICAgY29uc3QgZGVzY3JpcHRvciA9IHZhbHVlICYmIHR5cGVvZiB2YWx1ZSA9PT0gXCJvYmplY3RcIiA/IHZhbHVlIDoge3ZhbHVlIH07XG4gICAgZGVmaW5lVmFyaWFibGUobWFwLCBncm91cCwgbmFtZSwgZGVzY3JpcHRvcik7XG4gIH1cbn1cblxuZXhwb3J0IGZ1bmN0aW9uIGdldFZhcmlhYmxlc0J5R3JvdXAobWFwOiBWYXJpYWJsZU1hcCwgZ3JvdXA/OiBzdHJpbmcpIHtcbiAgY29uc3QgcmVzdWx0OiBhbnkgPSB7fTtcbiAgZm9yIChjb25zdCBbIG5hbWUsIGVudHJ5IF0gb2YgT2JqZWN0LmVudHJpZXMobWFwKSkge1xuICAgIGlmIChncm91cCAhPT0gdW5kZWZpbmVkICYmIGVudHJ5Lmdyb3VwICYmIGVudHJ5Lmdyb3VwICE9PSBncm91cClcbiAgICAgIGNvbnRpbnVlO1xuICAgIHJlc3VsdFtuYW1lXSA9IHtcbiAgICAgIHR5cGU6IGVudHJ5LnR5cGUsXG4gICAgICBkZXNjcmlwdGlvbjogZW50cnkuZGVzY3JpcHRpb24sXG4gICAgICB2YWx1ZTogZ2V0RW50cnlWYWx1ZShlbnRyeSksXG4gICAgfTtcbiAgfVxuICByZXR1cm4gcmVzdWx0O1xufVxuXG5leHBvcnQgZnVuY3Rpb24gY3JlYXRlVmFyaWFibGVWYWx1ZXMobWFwOiBWYXJpYWJsZU1hcCwgZ3JvdXA/OiBzdHJpbmcpOiBhbnkge1xuICBjb25zdCByZXN1bHQ6IGFueSA9IHt9O1xuICBmb3IgKGNvbnN0IFsgbmFtZSwgZW50cnkgXSBvZiBPYmplY3QuZW50cmllcyhtYXApKSB7XG4gICAgaWYgKCFncm91cCB8fCBncm91cCA9PT0gZW50cnkuZ3JvdXApXG4gICAgICByZXN1bHRbbmFtZV0gPSBnZXRFbnRyeVZhbHVlKGVudHJ5KTtcbiAgfVxuICByZXR1cm4gcmVzdWx0O1xufVxuXG5leHBvcnQgZnVuY3Rpb24gbWVyZ2VWYXJpYWJsZXModGFyZ2V0OiBhbnksIHNvdXJjZTogYW55KTogb2JqZWN0IHtcbiAgaWYgKCF0YXJnZXQgfHwgdHlwZW9mIHRhcmdldCAhPT0gXCJvYmplY3RcIilcbiAgICB0aHJvdyBuZXcgRXJyb3IoYFRhcmdldCAke3RhcmdldH0gaXMgbm90IG9iamVjdGApO1xuICBpZiAoIXNvdXJjZSB8fCB0eXBlb2Ygc291cmNlICE9PSBcIm9iamVjdFwiKVxuICAgIHRocm93IG5ldyBFcnJvcihgU291cmNlICR7c291cmNlfSBpcyBub3Qgb2JqZWN0YCk7XG4gIGZvciAoY29uc3QgWyBrZXksIHZhbCBdIG9mIE9iamVjdC5lbnRyaWVzKHNvdXJjZSkpIHtcbiAgICBpZiAoIU9iamVjdC5oYXNPd24odGFyZ2V0LCBrZXkpKSB7XG4gICAgICB0YXJnZXRba2V5XSA9IHZhbDtcbiAgICB9XG4gICAgZWxzZSBpZiAoQXJyYXkuaXNBcnJheSh0YXJnZXRba2V5XSkpIHtcbiAgICAgIGlmICghQXJyYXkuaXNBcnJheSh2YWwpKVxuICAgICAgICB0aHJvdyBuZXcgRXJyb3IoYFNvdXJjZSAke2tleX0gaGFzICR7dmFsfSB3aGljaCBpcyBub3QgYW4gYXJyYXlgKTtcbiAgICAgIGZvciAoY29uc3QgaXRlciBvZiB2YWwpXG4gICAgICAgIHRhcmdldFtrZXldLnB1c2goaXRlcik7XG4gICAgfVxuICAgIGVsc2UgaWYgKHRhcmdldFtrZXldICYmIHR5cGVvZiB0YXJnZXRba2V5XSA9PT0gXCJvYmplY3RcIikge1xuICAgICAgaWYgKCF2YWwgfHwgdHlwZW9mIHZhbCAhPT0gXCJvYmplY3RcIilcbiAgICAgICAgdGhyb3cgbmV3IEVycm9yKGBTb3VyY2UgJHtrZXl9IGhhcyAke3ZhbH0gd2hpY2ggaXMgbm90IGFuIG9iamVjdGApO1xuICAgICAgbWVyZ2VWYXJpYWJsZXModGFyZ2V0W2tleV0sIHZhbCk7XG4gICAgfVxuICAgIGVsc2Uge1xuICAgICAgdGhyb3cgbmV3IEVycm9yKGBTb3VyY2UgJHtrZXl9IGhhcyAke3ZhbH0gd2hpY2ggaXMgbm90ICR7dHlwZW9mIHRhcmdldFtrZXldfWApO1xuICAgIH1cbiAgfVxuICByZXR1cm4gdGFyZ2V0O1xufVxuXG5leHBvcnQgZnVuY3Rpb24gbWVyZ2VWYXJpYWJsZU1hcCh0YXJnZXQ6IFZhcmlhYmxlTWFwLCBzb3VyY2U6IGFueSk6IFZhcmlhYmxlTWFwIHtcbiAgZm9yIChjb25zdCBbbmFtZSwgdmFsdWVdIG9mIE9iamVjdC5lbnRyaWVzKHNvdXJjZSkpIHtcbiAgICBsZXQgZW50cnkgPSB0YXJnZXRbbmFtZV07XG4gICAgaWYgKCFlbnRyeSlcbiAgICAgIGRlZmluZVZhcmlhYmxlKHRhcmdldCwgXCJcIiwgbmFtZSwgeyB2YWx1ZSB9KTtcbiAgICBlbHNlIHtcbiAgICAgIGxldCBkZXN0ID0gZ2V0RW50cnlWYWx1ZShlbnRyeSk7XG4gICAgICBzZXRFbnRyeVZhbHVlKGVudHJ5LCAoZGVzdCAmJiB0eXBlb2YgZGVzdCA9PT0gXCJvYmplY3RcIikgPyBtZXJnZVZhcmlhYmxlcyhkZXN0LCB2YWx1ZSkgOiB2YWx1ZSk7XG4gICAgfVxuICB9XG4gIHJldHVybiB0YXJnZXQ7XG59XG5cbn0gLy8gU2NvcGVIZWxwZXJcbiIsIi8qXG4gKiBNSVQgTGljZW5zZVxuICpcbiAqIENvcHlyaWdodCAoYykgMjAyNSAgWXVyaWkgWWFrdWJpbiAoeXVyaWkueWFrdWJpbkBnbWFpbC5jb20pXG4gKlxuICogUGVybWlzc2lvbiBpcyBncmFudGVkIHRvIHVzZSwgY29weSwgbW9kaWZ5LCBhbmQgZGlzdHJpYnV0ZSB0aGlzIHNvZnR3YXJlXG4gKiB1bmRlciB0aGUgTUlUIExpY2Vuc2UuIFNlZSBMSUNFTlNFIGZpbGUgZm9yIGRldGFpbHMuXG4gKi9cblxuaW1wb3J0IHsgQ3VzdG9tU2NyaXB0IH0gZnJvbSBcIkAvY29yZS9DdXN0b21TY3JpcHRcIjtcblxuY29uc3QgTUFQID0gU3ltYm9sKFwiTUFQXCIpO1xuY29uc3QgRU5UUklFUyA9IFN5bWJvbChcIkVOVFJJRVNcIik7XG5cbmV4cG9ydCBjbGFzcyBTY3JpcHRDb2xsZWN0aW9uIHtcbiAgcHJpdmF0ZSBbTUFQXTogeyBbbmFtZTogc3RyaW5nXTogQ3VzdG9tU2NyaXB0IH07XG4gIHByaXZhdGUgW0VOVFJJRVNdOiBDdXN0b21TY3JpcHRbXTtcblxuICBwcml2YXRlIGNvbnN0cnVjdG9yKCkge1xuICAgIHRoaXNbTUFQXSA9IHt9O1xuICAgIHRoaXNbRU5UUklFU10gPSBbXTtcbiAgfVxuXG4gIHB1YmxpYyBzdGF0aWMgY3JlYXRlKCkge1xuICAgIHJldHVybiBPYmplY3Quc2VhbChuZXcgU2NyaXB0Q29sbGVjdGlvbik7XG4gIH1cblxuICBwdWJsaWMgZ2V0IEVOVFJJRVMoKSB7XG4gICAgcmV0dXJuIHRoaXNbRU5UUklFU107XG4gIH1cblxuICBwdWJsaWMgZ2V0KG5hbWU6IHN0cmluZyk6IEN1c3RvbVNjcmlwdCB8IHVuZGVmaW5lZCB7XG4gICAgcmV0dXJuIHRoaXNbTUFQXVtuYW1lXTtcbiAgfVxuXG4gIHB1YmxpYyBzZXQobmFtZTogc3RyaW5nLCB0YXJnZXQ6IEN1c3RvbVNjcmlwdCkge1xuICAgIGlmICghbmFtZSlcbiAgICAgIHRocm93IG5ldyBFcnJvcihcIk5vdCBzdXBwb3J0ZWQgZW1wdHkgbmFtZSBmb3IgQ3VzdG9tU2NyaXB0XCIpO1xuICAgIGlmICh0aGlzW01BUF1bbmFtZV0pXG4gICAgICB0aHJvdyBuZXcgRXJyb3IoYFNjcmlwdCBcIiR7bmFtZX1cIiBleGlzdHNgKTtcbiAgICB0aGlzW01BUF1bbmFtZV0gPSB0YXJnZXQ7XG4gICAgdGhpc1tFTlRSSUVTXS5wdXNoKHRhcmdldCk7XG4gIH1cblxuICBwdWJsaWMgYWRkKHRhcmdldDogQ3VzdG9tU2NyaXB0KSB7XG4gICAgdGhpc1tFTlRSSUVTXS5wdXNoKHRhcmdldCk7XG4gIH1cbiAgXG4gIHB1YmxpYyB0b0pTT04oKTogb2JqZWN0IHtcbiAgICByZXR1cm4gdGhpc1tFTlRSSUVTXTtcbiAgfVxufTtcbiIsIi8qXG4gKiBNSVQgTGljZW5zZVxuICpcbiAqIENvcHlyaWdodCAoYykgMjAyNSAgWXVyaWkgWWFrdWJpbiAoeXVyaWkueWFrdWJpbkBnbWFpbC5jb20pXG4gKlxuICogUGVybWlzc2lvbiBpcyBncmFudGVkIHRvIHVzZSwgY29weSwgbW9kaWZ5LCBhbmQgZGlzdHJpYnV0ZSB0aGlzIHNvZnR3YXJlXG4gKiB1bmRlciB0aGUgTUlUIExpY2Vuc2UuIFNlZSBMSUNFTlNFIGZpbGUgZm9yIGRldGFpbHMuXG4gKi9cblxuaW1wb3J0IHsgUHJvamVjdENvbnRleHQgfSBmcm9tIFwiQC9jb3JlL1Byb2plY3RDb250ZXh0XCI7XG5pbXBvcnQgeyBWYXJpYWJsZU1hcCB9IGZyb20gXCJAL2NvcmUvU2NvcGVcIjtcbmltcG9ydCB7IEJhc2VDb250ZXh0LCBjcmVhdGVDb250ZXh0IH0gZnJvbSBcIkAvY29yZS9CYXNlQ29udGV4dFwiO1xuXG5jb25zdCBHTE9CQUwgPSBTeW1ib2woXCJHTE9CQUxcIik7XG5jb25zdCBTQ09QRSA9IFN5bWJvbChcIlNDT1BFXCIpO1xuXG5leHBvcnQgY2xhc3MgU2NyaXB0Q29udGV4dCBleHRlbmRzIEJhc2VDb250ZXh0IHtcbiAgW1NDT1BFXTogVmFyaWFibGVNYXA7XG4gIFtHTE9CQUxdOiBQcm9qZWN0Q29udGV4dDtcblxuICBjb25zdHJ1Y3RvcihnbG9iYWw6IFByb2plY3RDb250ZXh0LCBzY29wZTogVmFyaWFibGVNYXApIHtcbiAgICBzdXBlcihzY29wZSk7XG4gICAgdGhpc1tTQ09QRV0gPSBzY29wZTtcbiAgICB0aGlzW0dMT0JBTF0gPSBnbG9iYWw7XG4gIH1cblxuICBwdWJsaWMgc3RhdGljIGNyZWF0ZShnbG9iYWw6IFByb2plY3RDb250ZXh0LCB2YXJpYWJsZU1hcDogVmFyaWFibGVNYXApIHtcbiAgICByZXR1cm4gY3JlYXRlQ29udGV4dChuZXcgU2NyaXB0Q29udGV4dChnbG9iYWwsIHZhcmlhYmxlTWFwKSk7XG4gIH1cbn07XG4iLCIvKlxuICogTUlUIExpY2Vuc2VcbiAqXG4gKiBDb3B5cmlnaHQgKGMpIDIwMjUgIFl1cmlpIFlha3ViaW4gKHl1cmlpLnlha3ViaW5AZ21haWwuY29tKVxuICpcbiAqIFBlcm1pc3Npb24gaXMgZ3JhbnRlZCB0byB1c2UsIGNvcHksIG1vZGlmeSwgYW5kIGRpc3RyaWJ1dGUgdGhpcyBzb2Z0d2FyZVxuICogdW5kZXIgdGhlIE1JVCBMaWNlbnNlLiBTZWUgTElDRU5TRSBmaWxlIGZvciBkZXRhaWxzLlxuICovXG5cbmltcG9ydCB7IGVuc3VyZUJvb2xlYW4gfSBmcm9tIFwiQC91dGlscy9TdHJpY3RUeXBlXCI7XG5pbXBvcnQgeyBBYnNvbHV0ZVBhdGggfSBmcm9tIFwiQC9jb3JlL0Fic29sdXRlUGF0aFwiO1xuXG5jb25zdCBMQU5HVUFHRSAgICAgICAgICAgID0gU3ltYm9sKFwiTEFOR1VBR0VcIik7XG5jb25zdCBIRUFERVJfRklMRV9PTkxZICAgID0gU3ltYm9sKFwiSEVBREVSX0ZJTEVfT05MWVwiKTtcbmNvbnN0IERFRklORVMgICAgICAgICAgICAgPSBTeW1ib2woXCJERUZJTkVTXCIpO1xuY29uc3QgQ09NUElMRV9GTEFHUyAgICAgICA9IFN5bWJvbChcIkNPTVBJTEVfRkxBR1NcIik7XG5jb25zdCBGSUxFICAgICAgICAgICAgICAgID0gU3ltYm9sKFwiRklMRVwiKTtcbmNvbnN0IEJBU0VfRElSICAgICAgICAgICAgPSBTeW1ib2woXCJCQVNFX0RJUlwiKTtcblxuZXhwb3J0IGNsYXNzIFNvdXJjZUZpbGUge1xuICBwcml2YXRlIFtMQU5HVUFHRV06IHN0cmluZztcbiAgcHJpdmF0ZSBbSEVBREVSX0ZJTEVfT05MWV06IGJvb2xlYW47XG4gIHByaXZhdGUgW0ZJTEVdOiBBYnNvbHV0ZVBhdGg7XG4gIHByaXZhdGUgW0JBU0VfRElSXTogQWJzb2x1dGVQYXRoO1xuICBwcml2YXRlIFtERUZJTkVTXTogc3RyaW5nW107XG4gIHByaXZhdGUgW0NPTVBJTEVfRkxBR1NdOiBBcnJheTxzdHJpbmd8c3RyaW5nW10+O1xuXG4gIHByaXZhdGUgY29uc3RydWN0b3IoZmlsZW5hbWU6IEFic29sdXRlUGF0aCwgYmFzZURpcjogQWJzb2x1dGVQYXRoLCBsYW5ndWFnZTogc3RyaW5nLCBjb21waWxlRmxhZ3M6IEFycmF5PHN0cmluZ3xzdHJpbmdbXT4pIHtcbiAgICB0aGlzW0ZJTEVdID0gZmlsZW5hbWU7XG4gICAgdGhpc1tCQVNFX0RJUl0gPSBiYXNlRGlyO1xuICAgIHRoaXNbTEFOR1VBR0VdID0gbGFuZ3VhZ2U7XG4gICAgdGhpc1tIRUFERVJfRklMRV9PTkxZXSA9ICFsYW5ndWFnZTtcbiAgICB0aGlzW0RFRklORVNdID0gW107XG4gICAgdGhpc1tDT01QSUxFX0ZMQUdTXSA9IFsgLi4uY29tcGlsZUZsYWdzIF07XG4gIH1cblxuICBwdWJsaWMgc3RhdGljIGNyZWF0ZShmaWxlbmFtZTogQWJzb2x1dGVQYXRoLCBiYXNlRGlyOiBBYnNvbHV0ZVBhdGgsIGxhbmd1YWdlOiBzdHJpbmcsIGNvbXBpbGVGbGFnczogQXJyYXk8c3RyaW5nfHN0cmluZ1tdPikge1xuICAgIHJldHVybiBPYmplY3Quc2VhbChuZXcgU291cmNlRmlsZShmaWxlbmFtZSwgYmFzZURpciwgbGFuZ3VhZ2UsIGNvbXBpbGVGbGFncykpO1xuICB9XG5cbiAgcHVibGljIGdldCBMQU5HVUFHRSgpOiBzdHJpbmcge1xuICAgIHJldHVybiB0aGlzW0xBTkdVQUdFXTtcbiAgfVxuXG4gIHB1YmxpYyBnZXQgSEVBREVSX0ZJTEVfT05MWSgpOiBib29sZWFuIHtcbiAgICByZXR1cm4gdGhpc1tIRUFERVJfRklMRV9PTkxZXTtcbiAgfVxuXG4gIHB1YmxpYyBzZXQgSEVBREVSX0ZJTEVfT05MWSh2YWx1ZTogYm9vbGVhbikge1xuICAgIHRoaXNbSEVBREVSX0ZJTEVfT05MWV0gPSBlbnN1cmVCb29sZWFuKHZhbHVlKTtcbiAgfVxuXG4gIHB1YmxpYyBnZXQgREVGSU5FUygpIHtcbiAgICByZXR1cm4gdGhpc1tERUZJTkVTXVxuICB9XG5cbiAgcHVibGljIGdldCBDT01QSUxFX0ZMQUdTKCkge1xuICAgIHJldHVybiB0aGlzW0NPTVBJTEVfRkxBR1NdO1xuICB9XG5cbiAgcHVibGljIGdldCBGSUxFKCk6IEFic29sdXRlUGF0aCB7XG4gICAgcmV0dXJuIHRoaXNbRklMRV07XG4gIH1cblxuICBwdWJsaWMgZ2V0IEZJTEVfRElSKCk6IEFic29sdXRlUGF0aCB7XG4gICAgcmV0dXJuIHRoaXNbRklMRV0uZGlybmFtZSgpO1xuICB9XG5cbiAgcHVibGljIGdldCBGSUxFX05BTUUoKTogc3RyaW5nIHtcbiAgICByZXR1cm4gdGhpc1tGSUxFXS5iYXNlbmFtZSgpO1xuICB9XG5cbiAgcHVibGljIHRvSlNPTigpOiBvYmplY3Qge1xuICAgIHJldHVybiB7XG4gICAgICBMQU5HVUFHRTogdGhpc1tMQU5HVUFHRV0sXG4gICAgICBIRUFERVJfRklMRV9PTkxZOiB0aGlzW0hFQURFUl9GSUxFX09OTFldLFxuICAgICAgREVGSU5FUzogdGhpc1tERUZJTkVTXSxcbiAgICAgIENPTVBJTEVfRkxBR1M6IHRoaXNbQ09NUElMRV9GTEFHU10sXG4gICAgICBGSUxFOiB0aGlzW0ZJTEVdLFxuICAgICAgRklMRV9ESVI6IHRoaXMuRklMRV9ESVIsXG4gICAgICBGSUxFX05BTUU6IHRoaXMuRklMRV9OQU1FLFxuICAgICAgQkFTRV9ESVI6IHRoaXNbQkFTRV9ESVJdLFxuICAgIH07XG4gIH1cbn1cbiIsIi8qXG4gKiBNSVQgTGljZW5zZVxuICpcbiAqIENvcHlyaWdodCAoYykgMjAyNSAgWXVyaWkgWWFrdWJpbiAoeXVyaWkueWFrdWJpbkBnbWFpbC5jb20pXG4gKlxuICogUGVybWlzc2lvbiBpcyBncmFudGVkIHRvIHVzZSwgY29weSwgbW9kaWZ5LCBhbmQgZGlzdHJpYnV0ZSB0aGlzIHNvZnR3YXJlXG4gKiB1bmRlciB0aGUgTUlUIExpY2Vuc2UuIFNlZSBMSUNFTlNFIGZpbGUgZm9yIGRldGFpbHMuXG4gKi9cblxuaW1wb3J0IHsgU291cmNlRmlsZSB9IGZyb20gXCJAL2NvcmUvU291cmNlRmlsZVwiO1xuaW1wb3J0IHsgU3lzdGVtU2NvcGUgfSBmcm9tIFwiQC9jb3JlL1N5c3RlbVNjb3BlXCI7XG5pbXBvcnQgeyBub3JtYWxpemVEZWZpbml0aW9ucyB9IGZyb20gXCJAL2NvcmUvRGVmaW5pdGlvbkhlbHBlclwiO1xuXG5jb25zdCBTT1VSQ0VTID0gU3ltYm9sKFwiU09VUkNFU1wiKTtcblxuZXhwb3J0IGNsYXNzIFNvdXJjZUZpbGVMaXN0IHtcbiAgcHJpdmF0ZSBbU09VUkNFU106IFNvdXJjZUZpbGVbXTtcblxuICBwcml2YXRlIGNvbnN0cnVjdG9yKHNjb3BlOiBTeXN0ZW1TY29wZSwgc291cmNlczogU291cmNlRmlsZVtdKSB7XG4gICAgdGhpc1tTT1VSQ0VTXSA9IFtdO1xuICAgIGZvciAoY29uc3QgaXRlciBvZiBzb3VyY2VzKSB7XG4gICAgICBpZiAoIShpdGVyIGluc3RhbmNlb2YgU291cmNlRmlsZSkpXG4gICAgICAgIHRocm93IG5ldyBFcnJvcihgSXRlbSAke2l0ZXJ9IGlzIG5vdCBTb3VyY2VGaWxlYCk7XG4gICAgICB0aGlzW1NPVVJDRVNdLnB1c2goaXRlcik7XG4gICAgfVxuICB9XG5cbiAgcHVibGljIHN0YXRpYyBjcmVhdGUoc2NvcGU6IFN5c3RlbVNjb3BlLCBzb3VyY2VzOiBTb3VyY2VGaWxlW10pIHtcbiAgICByZXR1cm4gT2JqZWN0LnNlYWwobmV3IFNvdXJjZUZpbGVMaXN0KHNjb3BlLCBzb3VyY2VzKSk7XG4gIH1cblxuICBwdWJsaWMgYWRkRGVmaW5pdGlvbnMoLi4uZGVmaW5pdGlvbnM6IHN0cmluZ1tdKSB7XG4gICAgZm9yIChjb25zdCBpdGVyIG9mIG5vcm1hbGl6ZURlZmluaXRpb25zKC4uLmRlZmluaXRpb25zKSlcbiAgICAgIHRoaXNbU09VUkNFU10uZm9yRWFjaChpID0+IGkuREVGSU5FUy5wdXNoKGl0ZXIpKTtcbiAgfVxuXG4gIHB1YmxpYyBhZGRDb21waWxlRmxhZ3MoLi4uZmxhZ3M6IHN0cmluZ1tdKSB7XG4gICAgZm9yIChjb25zdCBpdGVyIG9mIGZsYWdzLmZsYXQoKSlcbiAgICAgIHRoaXNbU09VUkNFU10uZm9yRWFjaChpID0+IGkuQ09NUElMRV9GTEFHUy5wdXNoKGl0ZXIpKTtcbiAgfVxuXG4gIHB1YmxpYyBzb3VyY2VBdChpbmRleDogbnVtYmVyKTogU291cmNlRmlsZSB7XG4gICAgcmV0dXJuIHRoaXNbU09VUkNFU11baW5kZXhdO1xuICB9XG5cbiAgcHVibGljIHNvdXJjZUNvdW50KGluZGV4OiBudW1iZXIpOiBudW1iZXIge1xuICAgIHJldHVybiB0aGlzW1NPVVJDRVNdLmxlbmd0aDtcbiAgfVxuXG4gIHB1YmxpYyB0b0pTT04oKTogb2JqZWN0IHtcbiAgICByZXR1cm4gdGhpc1tTT1VSQ0VTXTtcbiAgfVxufTtcbiIsIi8qXG4gKiBNSVQgTGljZW5zZVxuICpcbiAqIENvcHlyaWdodCAoYykgMjAyNSAgWXVyaWkgWWFrdWJpbiAoeXVyaWkueWFrdWJpbkBnbWFpbC5jb20pXG4gKlxuICogUGVybWlzc2lvbiBpcyBncmFudGVkIHRvIHVzZSwgY29weSwgbW9kaWZ5LCBhbmQgZGlzdHJpYnV0ZSB0aGlzIHNvZnR3YXJlXG4gKiB1bmRlciB0aGUgTUlUIExpY2Vuc2UuIFNlZSBMSUNFTlNFIGZpbGUgZm9yIGRldGFpbHMuXG4gKi9cblxuaW1wb3J0IG9zIGZyb20gXCJub2RlOm9zXCI7XG5pbXBvcnQgeyBERUJVR19CVUlMRF9UWVBFLCBSRUxFQVNFX0JVSUxEX1RZUEUgfSBmcm9tIFwiQC9jb3JlL1R5cGVzXCI7XG5pbXBvcnQgeyBIb3N0IH0gZnJvbSBcIkAvdXRpbHMvSG9zdFwiO1xuXG5leHBvcnQgZGVmYXVsdCB7XG4gIFNZU1RFTV9OQU1FOiB7XG4gICAgZGVzY3JpcHRpb246IFwiRGVmaW5lcyB0aGUgdGFyZ2V0IE9TIGZvciB0aGUgYnVpbGQsIHVzZWQgaW4gY3Jvc3MtY29tcGlsYXRpb24gYW5kIG5hdGl2ZSBidWlsZHNcIixcbiAgICB2YWx1ZTogXCJMaW51eFwiLFxuICB9LFxuICBTWVNURU1fUFJPQ0VTU09SOiB7XG4gICAgZGVzY3JpcHRpb246IFwiRGVmaW5lcyB0aGUgdGFyZ2V0IENQVSBhcmNoaXRlY3R1cmVcIixcbiAgICB2YWx1ZTogXCJ3YXNtMzJcIixcbiAgfSxcbiAgUFJPSkVDVF9OQU1FOiB7XG4gICAgZGVzY3JpcHRpb246IFwiTmFtZSBvZiB0aGUgY3VycmVudCBwcm9qZWN0XCIsXG4gICAgdmFsdWU6IFwiXCIsXG4gIH0sXG4gIFBST0pFQ1RfVkVSU0lPTjoge1xuICAgIGRlc2NyaXB0aW9uOiBcIlZlcnNpb24gb2YgdGhlIGN1cnJlbnQgcHJvamVjdFwiLFxuICAgIHZhbHVlOiBcIlwiLFxuICB9LFxuICBQUk9KRUNUX0RFU0NSSVBUSU9OOiB7XG4gICAgZGVzY3JpcHRpb246IFwiRGVzY3JpcHRpb24gb2YgdGhlIGN1cnJlbnQgcHJvamVjdFwiLFxuICAgIHZhbHVlOiBcIlwiLFxuICB9LFxuICBQUk9KRUNUX0hPTUVQQUdFX1VSTDoge1xuICAgIGRlc2NyaXB0aW9uOiBcIkhvbWVwYWdlIFVSTCBvZiB0aGUgY3VycmVudCBwcm9qZWN0XCIsXG4gICAgdmFsdWU6IFwiXCIsXG4gIH0sXG4gIFBST0pFQ1RfU09VUkNFX0RJUjoge1xuICAgIGRlc2NyaXB0aW9uOiBcIkFic29sdXRlIHBhdGggdG8gdGhlIHRvcC1sZXZlbCBzb3VyY2UgZGlyZWN0b3J5IG9mIHRoZSBwcm9qZWN0XCIsXG4gICAgdHlwZTogXCJEaXJQYXRoXCIsXG4gIH0sXG4gIFBST0pFQ1RfQklOQVJZX0RJUjoge1xuICAgIGRlc2NyaXB0aW9uOiBcIkFic29sdXRlIHBhdGggdG8gdGhlIHRvcC1sZXZlbCBidWlsZCAoYmluYXJ5KSBkaXJlY3Rvcnkgb2YgdGhlIHByb2plY3RcIixcbiAgICB0eXBlOiBcIkRpclBhdGhcIixcbiAgfSxcbiAgU0NSSVBUX01PRFVMRToge1xuICAgIGRlc2NyaXB0aW9uOiBcIk1vZHVsZSBuYW1lIG9mIHRoZSBjdXJyZW50IE1ha2VTY3JpcHRcIixcbiAgICB0eXBlOiBcInN0cmluZ1wiLFxuICB9LFxuICBTQ1JJUFRfRklMRToge1xuICAgIGRlc2NyaXB0aW9uOiBcIkZ1bGwgcGF0aCB0byB0aGUgY3VycmVudCBNYWtlU2NyaXB0IGZpbGUgYmVpbmcgcHJvY2Vzc2VkXCIsXG4gICAgdHlwZTogXCJGaWxlUGF0aFwiLFxuICB9LFxuICBTQ1JJUFRfRElSOiB7XG4gICAgZGVzY3JpcHRpb246IFwiRGlyZWN0b3J5IG9mIHRoZSBjdXJyZW50IE1ha2VTY3JpcHQgZmlsZSBiZWluZyBwcm9jZXNzZWRcIixcbiAgICB0eXBlOiBcIkRpclBhdGhcIixcbiAgfSxcbiAgUEFDS0FHRV9GSUxFOiB7XG4gICAgZGVzY3JpcHRpb246IFwiRmlsZW5hbWUgb2YgcHJvamVjdCBtYW5pZmVzdCBjb250YWluaW5nIG1ldGFkYXRhIGFuZCBkZXBlbmRlbmNpZXNcIixcbiAgICB0eXBlOiBcIkZpbGVQYXRoXCIsXG4gIH0sXG4gIENBQ0hFX0ZJTEU6IHtcbiAgICBkZXNjcmlwdGlvbjogXCJEZWZhdWx0IGZpbGVuYW1lIG9mIHRoZSBCaXRNYWtlIGNhY2hlIHN0b3Jpbmcgc2V0dGluZ3NcIixcbiAgICB0eXBlOiBcIkZpbGVQYXRoXCIsXG4gIH0sXG4gIFRPT0xDSEFJTl9GSUxFOiB7XG4gICAgZGVzY3JpcHRpb246IFwiU3BlY2lmaWVzIHRoZSBwYXRoIHRvIGEgdG9vbGNoYWluIGZpbGUgdXNlZCBmb3IgY3Jvc3MtY29tcGlsYXRpb25cIixcbiAgICB0eXBlOiBcInN0cmluZ1wiLFxuICB9LFxuICBCVUlMRF9UWVBFOiB7XG4gICAgZGVzY3JpcHRpb246IFwiU3BlY2lmaWVzIHRoZSBidWlsZCBjb25maWd1cmF0aW9uIGZvciBjb250cm9sbGluZyBvcHRpbWl6YXRpb24gbGV2ZWxzIGFuZCBkZWJ1ZyBpbmZvcm1hdGlvbiBpbiB0aGUgYnVpbGQgcHJvY2Vzc1wiLFxuICAgIHR5cGU6IFsgREVCVUdfQlVJTERfVFlQRSwgUkVMRUFTRV9CVUlMRF9UWVBFIF0sXG4gICAgdmFsdWU6IFJFTEVBU0VfQlVJTERfVFlQRSxcbiAgfSxcbiAgSU5TVEFMTF9QUkVGSVg6IHtcbiAgICBkZXNjcmlwdGlvbjogXCJUaGUgcm9vdCBkaXJlY3Rvcnkgd2hlcmUgZmlsZXMgd2lsbCBiZSBpbnN0YWxsZWQgYnkgZGVmYXVsdFwiLFxuICAgIHR5cGU6IFwiRGlyUGF0aFwiLFxuICAgIHZhbHVlOiBcIi91c3JcIixcbiAgfSxcbiAgREVTVERJUjoge1xuICAgIGRlc2NyaXB0aW9uOiBcIlRlbXBvcmFyeSBpbnN0YWxsYXRpb24gcm9vdFwiLFxuICAgIHR5cGU6IFwiRGlyUGF0aFwiLFxuICB9LFxuICBTT1VSQ0VfRElSOiB7XG4gICAgZGVzY3JpcHRpb246IFwiUGF0aCB0byB0aGUgc291cmNlIGRpcmVjdG9yeSBjdXJyZW50bHkgYmVpbmcgcHJvY2Vzc2VkXCIsXG4gICAgdHlwZTogXCJEaXJQYXRoXCIsXG4gIH0sXG4gIEJJTkFSWV9ESVI6IHtcbiAgICBkZXNjcmlwdGlvbjogXCJQYXRoIHRvIHRoZSBiaW5hcnkgZGlyZWN0b3J5IGN1cnJlbnRseSBiZWluZyBwcm9jZXNzZWRcIixcbiAgICB0eXBlOiBcIkRpclBhdGhcIixcbiAgfSxcbiAgUE9TSVRJT05fSU5ERVBFTkRFTlRfQ09ERToge1xuICAgIGRlc2NyaXB0aW9uOiBcIkVuYWJsZXMgUG9zaXRpb24tSW5kZXBlbmRlbnQgQ29kZSAoUElDKSBmb3IgYnVpbGRpbmcgc2hhcmVkIGxpYnJhcmllc1wiLFxuICAgIHZhbHVlOiBmYWxzZSxcbiAgfSxcbiAgUFJFVkVOVF9JTlNUQUxMX0ZJTEVTOiB7XG4gICAgZGVzY3JpcHRpb246IFwiUHJldmVudCBpbnN0YWxsYXRpb24gb2YgZmlsZXNcIixcbiAgICB2YWx1ZTogZmFsc2UsXG4gIH0sXG4gIEhPU1RfU1lTVEVNX05BTUU6IHtcbiAgICBkZXNjcmlwdGlvbjogXCJTcGVjaWZpZXMgdGhlIE9TIG9mIHRoZSBtYWNoaW5lIHJ1bm5pbmdcIixcbiAgICB2YWx1ZTogb3MudHlwZSgpLFxuICB9LFxuICBJTkNMVURFUzoge1xuICAgIGRlc2NyaXB0aW9uOiBcIlBhdGhzIHNlYXJjaGVkIGZvciBoZWFkZXIgZmlsZXNcIixcbiAgICB2YWx1ZTogW10sXG4gIH0sXG4gIEFTTV9DT01QSUxFUjoge1xuICAgIGRlc2NyaXB0aW9uOiBcIlBhdGggdG8gdGhlIGFzc2VtYmxlciBjb21waWxlciBkZXRlY3RlZFwiLFxuICAgIHZhbHVlOiBcIlwiLFxuICB9LFxuICBBU01fRkxBR1M6IHtcbiAgICBkZXNjcmlwdGlvbjogXCJGbGFncyBwYXNzZWQgdG8gdGhlIGFzc2VtYmxlciBjb21waWxlclwiLFxuICAgIHZhbHVlOiBbXSxcbiAgfSxcbiAgQVNNX0ZMQUdTX0RFQlVHOiB7XG4gICAgZGVzY3JpcHRpb246IFwiQWRkaXRpb25hbCBhc3NlbWJsZXIgZmxhZ3MgdXNlZCB3aGVuIGJ1aWxkaW5nIGluIERlYnVnIG1vZGVcIixcbiAgICB2YWx1ZTogWyBcIi1nXCIgXSxcbiAgfSxcbiAgQVNNX0ZMQUdTX1JFTEVBU0U6IHtcbiAgICBkZXNjcmlwdGlvbjogXCJBZGRpdGlvbmFsIGFzc2VtYmxlciBmbGFncyB1c2VkIHdoZW4gYnVpbGRpbmcgaW4gUmVsZWFzZSBtb2RlXCIsXG4gICAgdmFsdWU6IFsgXCItTzNcIiwgXCItRE5ERUJVR1wiIF0sXG4gIH0sXG4gIENfQ09NUElMRVI6IHtcbiAgICBkZXNjcmlwdGlvbjogXCJQYXRoIHRvIHRoZSBDIGNvbXBpbGVyIGRldGVjdGVkXCIsXG4gICAgdmFsdWU6IFwiXCIsXG4gIH0sXG4gIENfRkxBR1M6IHtcbiAgICBkZXNjcmlwdGlvbjogXCJGbGFncyBwYXNzZWQgdG8gdGhlIEMgY29tcGlsZXJcIixcbiAgICB2YWx1ZTogW10sXG4gIH0sXG4gIENfRkxBR1NfREVCVUc6IHtcbiAgICBkZXNjcmlwdGlvbjogXCJBZGRpdGlvbmFsIEMgY29tcGlsZXIgZmxhZ3MgdXNlZCB3aGVuIGJ1aWxkaW5nIGluIERlYnVnIG1vZGVcIixcbiAgICB2YWx1ZTogWyBcIi1nXCIgXSxcbiAgfSxcbiAgQ19GTEFHU19SRUxFQVNFOiB7XG4gICAgZGVzY3JpcHRpb246IFwiQWRkaXRpb25hbCBDIGNvbXBpbGVyIGZsYWdzIHVzZWQgd2hlbiBidWlsZGluZyBpbiBSZWxlYXNlIG1vZGVcIixcbiAgICB2YWx1ZTogWyBcIi1PM1wiLCBcIi1ETkRFQlVHXCIgXSxcbiAgfSxcbiAgQ1hYX0NPTVBJTEVSOiB7XG4gICAgZGVzY3JpcHRpb246IFwiUGF0aCB0byB0aGUgQysrIGNvbXBpbGVyIGRldGVjdGVkXCIsXG4gICAgdmFsdWU6IFwiXCIsXG4gIH0sXG4gIENYWF9GTEFHUzoge1xuICAgIGRlc2NyaXB0aW9uOiBcIkZsYWdzIHBhc3NlZCB0byB0aGUgQyBjb21waWxlclwiLFxuICAgIHZhbHVlOiBbXSxcbiAgfSxcbiAgQ1hYX0ZMQUdTX0RFQlVHOiB7XG4gICAgZGVzY3JpcHRpb246IFwiQWRkaXRpb25hbCBDKysgY29tcGlsZXIgZmxhZ3MgdXNlZCB3aGVuIGJ1aWxkaW5nIGluIERlYnVnIG1vZGVcIixcbiAgICB2YWx1ZTogWyBcIi1nXCIgXSxcbiAgfSxcbiAgQ1hYX0ZMQUdTX1JFTEVBU0U6IHtcbiAgICBkZXNjcmlwdGlvbjogXCJBZGRpdGlvbmFsIEMrKyBjb21waWxlciBmbGFncyB1c2VkIHdoZW4gYnVpbGRpbmcgaW4gUmVsZWFzZSBtb2RlXCIsXG4gICAgdmFsdWU6IFsgXCItTzNcIiwgXCItRE5ERUJVR1wiIF0sXG4gIH0sXG4gIEFSOiB7XG4gICAgZGVzY3JpcHRpb246IFwiUGF0aCB0byB0aGUgYXJjaGl2ZXIgdG9vbCB1c2VkIHRvIGNyZWF0ZSBzdGF0aWMgbGlicmFyaWVzXCIsXG4gICAgdmFsdWU6IFwiXCIsXG4gIH0sXG4gIFJBTkxJQjoge1xuICAgIGRlc2NyaXB0aW9uOiBcIlRvb2wgdXNlZCB0byBnZW5lcmF0ZSBhbiBpbmRleCB0byB0aGUgY29udGVudHMgb2YgYW4gYXJjaGl2ZSAoc3RhdGljIGxpYnJhcnkpXCIsXG4gICAgdmFsdWU6IFwiXCIsXG4gIH0sXG4gIExJTktFUjoge1xuICAgIGRlc2NyaXB0aW9uOiBcIlBhdGggdG8gdGhlIGxpbmtlciB1c2VkIHRvIGxpbmsgb2JqZWN0IGZpbGVzIGFuZCBsaWJyYXJpZXMgaW50byBleGVjdXRhYmxlc1wiLFxuICAgIHZhbHVlOiBcIlwiLFxuICB9LFxuICBOTToge1xuICAgIGRlc2NyaXB0aW9uOiBcIlBhdGggdG8gdGhlIHRvb2wgdXNlZCB0byBsaXN0IHN5bWJvbHMgZnJvbSBvYmplY3QgZmlsZXMgb3IgYXJjaGl2ZXNcIixcbiAgICB2YWx1ZTogXCJcIixcbiAgfSxcbiAgT0JKQ09QWToge1xuICAgIGRlc2NyaXB0aW9uOiBcIlBhdGggdG8gdGhlIHRvb2wgdXNlZCB0byBjb3B5IGFuZCB0cmFuc2xhdGUgb2JqZWN0IGZpbGVzXCIsXG4gICAgdmFsdWU6IFwiXCIsXG4gIH0sXG4gIE9CSkRVTVA6IHtcbiAgICBkZXNjcmlwdGlvbjogXCJQYXRoIHRvIHRoZSB0b29sIHVzZWQgdG8gZGlzcGxheSBpbmZvcm1hdGlvbiBhYm91dCBvYmplY3QgZmlsZXMsIHN1Y2ggYXMgZGlzYXNzZW1ibHlcIixcbiAgICB2YWx1ZTogXCJcIixcbiAgfSxcbiAgU1RSSVA6IHtcbiAgICBkZXNjcmlwdGlvbjogXCJQYXRoIHRvIHRoZSB0b29sIHVzZWQgdG8gcmVtb3ZlIHN5bWJvbHMgZnJvbSBvYmplY3QgZmlsZXMgb3IgZXhlY3V0YWJsZXMgdG8gcmVkdWNlIHNpemVcIixcbiAgICB2YWx1ZTogXCJcIixcbiAgfSxcbiAgT0JKRUNUX0xJQlJBUllfUFJFRklYOiB7XG4gICAgZGVzY3JpcHRpb246IFwiUHJlZml4IHVzZWQgZm9yIG9iamVjdCBsaWJyYXJpZXNcIixcbiAgICB2YWx1ZTogXCJcIixcbiAgfSxcbiAgT0JKRUNUX0xJQlJBUllfU1VGRklYOiB7XG4gICAgZGVzY3JpcHRpb246IFwiU3VmZml4IHVzZWQgZm9yIG9iamVjdCBsaWJyYXJ5IGZpbGVzXCIsXG4gICAgdmFsdWU6IFwiLm9cIixcbiAgfSxcbiAgT0JKRUNUX0xJTktFUl9GTEFHUzoge1xuICAgIGRlc2NyaXB0aW9uOiBcIkZsYWdzIHBhc3NlZCB0byB0aGUgbGlua2VyIHdoZW4gY3JlYXRpbmcgb2JqZWN0IGxpYnJhcmllc1wiLFxuICAgIHZhbHVlOiBbXSxcbiAgfSxcbiAgU1RBVElDX0xJQlJBUllfUFJFRklYOiB7XG4gICAgZGVzY3JpcHRpb246IFwiUHJlZml4IHVzZWQgZm9yIHN0YXRpYyBsaWJyYXJ5IGZpbGVzXCIsXG4gICAgdmFsdWU6IFwibGliXCIsXG4gIH0sXG4gIFNUQVRJQ19MSUJSQVJZX1NVRkZJWDoge1xuICAgIGRlc2NyaXB0aW9uOiBcIlN1ZmZpeCB1c2VkIGZvciBzdGF0aWMgbGlicmFyeSBmaWxlc1wiLFxuICAgIHZhbHVlOiBcIi5hXCIsXG4gIH0sXG4gIFNUQVRJQ19MSU5LRVJfRkxBR1M6IHtcbiAgICBkZXNjcmlwdGlvbjogXCJGbGFncyBwYXNzZWQgdG8gdGhlIGxpbmtlciB3aGVuIGNyZWF0aW5nIHN0YXRpYyBsaWJyYXJpZXNcIixcbiAgICB2YWx1ZTogW10sXG4gIH0sXG4gIFNIQVJFRF9MSUJSQVJZX1BSRUZJWDoge1xuICAgIGRlc2NyaXB0aW9uOiBcIlByZWZpeCB1c2VkIGZvciBzaGFyZWQgbGlicmFyeSBmaWxlc1wiLFxuICAgIHZhbHVlOiBcImxpYlwiLFxuICB9LFxuICBTSEFSRURfTElCUkFSWV9TVUZGSVg6IHtcbiAgICBkZXNjcmlwdGlvbjogXCJTdWZmaXggdXNlZCBmb3Igc2hhcmVkIGxpYnJhcnkgZmlsZXNcIixcbiAgICB2YWx1ZTogXCIuc29cIixcbiAgfSxcbiAgU0hBUkVEX0xJTktFUl9GTEFHUzoge1xuICAgIGRlc2NyaXB0aW9uOiBcIkZsYWdzIHBhc3NlZCB0byB0aGUgbGlua2VyIHdoZW4gY3JlYXRpbmcgc2hhcmVkIGxpYnJhcmllc1wiLFxuICAgIHZhbHVlOiBbXSxcbiAgfSxcbiAgRVhFQ1VUQUJMRV9TVUZGSVg6IHtcbiAgICBkZXNjcmlwdGlvbjogXCJTdWZmaXggdXNlZCBmb3IgZXhlY3V0YWJsZSBmaWxlc1wiLFxuICAgIHZhbHVlOiBIb3N0LmV4ZWN1dGFibGVTdWZmaXgsXG4gIH0sXG4gIEVYRV9MSU5LRVJfRkxBR1M6IHtcbiAgICBkZXNjcmlwdGlvbjogXCJGbGFncyBwYXNzZWQgdG8gdGhlIGxpbmtlciB3aGVuIGNyZWF0aW5nIGV4ZWN1dGFibGVzXCIsXG4gICAgdmFsdWU6IFtdLFxuICB9LFxuICBHTE9CQUxfQ09OVEVYVF9KU09OOiB7XG4gICAgZGVzY3JpcHRpb246IFwiRmlsZW5hbWUgZm9yIEpTT04gb2YgdGhlIEdsb2JhbCBjb250ZXh0XCIsXG4gICAgdHlwZTogXCJGaWxlUGF0aFwiLFxuICB9LFxuICBUQVJHRVRfR09BTFNfSlNPTjoge1xuICAgIGRlc2NyaXB0aW9uOiBcIkZpbGVuYW1lIGZvciBKU09OIG9mIHRoZSBUYXJnZXQgR29hbHNcIixcbiAgICB0eXBlOiBcIkZpbGVQYXRoXCIsXG4gIH0sXG4gIFNJWkVPRl9WT0lEX1A6IHtcbiAgICBkZXNjcmlwdGlvbjogXCJEZWZpbmVzIHRoZSBzaXplIChpbiBieXRlcykgb2YgYSB2b2lkIHBvaW50ZXIgb24gdGhlIHRhcmdldCBhcmNoaXRlY3R1cmVcIixcbiAgICB0eXBlOiBbIDQsIDggXSxcbiAgICB2YWx1ZTogSG9zdC5zaXplb2ZWb2lkcCxcbiAgfSxcbiAgTUFLRV9QTFVHSU5fTElTVDoge1xuICAgIGRlc2NyaXB0aW9uOiBcIkxpc3Qgb2YgcGF0aHMgdG8gcGx1Z2luc1wiLFxuICAgIHZhbHVlOiBbXSxcbiAgfSxcbiAgSE9TVF9FWEVDVVRBQkxFX1NVRkZJWDoge1xuICAgIGRlc2NyaXB0aW9uOiBcIkRlZmluZXMgdGhlIGZpbGUgZXh0ZW5zaW9uIGZvciBleGVjdXRhYmxlcyBvbiB0aGUgaG9zdCBzeXN0ZW1cIixcbiAgICB2YWx1ZTogSG9zdC5leGVjdXRhYmxlU3VmZml4LFxuICAgIC8vIFJlYWRvbmx5XG4gIH0sXG59O1xuIiwiLypcbiAqIE1JVCBMaWNlbnNlXG4gKlxuICogQ29weXJpZ2h0IChjKSAyMDI1ICBZdXJpaSBZYWt1YmluICh5dXJpaS55YWt1YmluQGdtYWlsLmNvbSlcbiAqXG4gKiBQZXJtaXNzaW9uIGlzIGdyYW50ZWQgdG8gdXNlLCBjb3B5LCBtb2RpZnksIGFuZCBkaXN0cmlidXRlIHRoaXMgc29mdHdhcmVcbiAqIHVuZGVyIHRoZSBNSVQgTGljZW5zZS4gU2VlIExJQ0VOU0UgZmlsZSBmb3IgZGV0YWlscy5cbiAqL1xuXG5pbXBvcnQgeyBJTWFrZVRhcmdldCwgSU9iamVjdExpYnJhcnksIElTdGF0aWNMaWJyYXJ5LCBJU2hhcmVkTGlicmFyeSwgSUV4ZWN1dGFibGUgfSBmcm9tIFwiQC9jb3JlL01ha2VJbnRlcmZhY2VzXCI7XG5pbXBvcnQgeyBTb3VyY2VGaWxlIH0gZnJvbSBcIkAvY29yZS9Tb3VyY2VGaWxlXCI7XG5pbXBvcnQgeyBTb3VyY2VGaWxlTGlzdCB9IGZyb20gXCJAL2NvcmUvU291cmNlRmlsZUxpc3RcIjtcbmltcG9ydCB7IEludGVyZmFjZUluY2x1ZGVzIH0gZnJvbSBcIkAvY29yZS9JbnRlcmZhY2VJbmNsdWRlc1wiO1xuaW1wb3J0IHsgSW50ZXJmYWNlT2JqZWN0cyB9IGZyb20gXCJAL2NvcmUvSW50ZXJmYWNlT2JqZWN0c1wiO1xuaW1wb3J0IHsgQWJzb2x1dGVQYXRoIH0gZnJvbSBcIkAvY29yZS9BYnNvbHV0ZVBhdGhcIjtcbmltcG9ydCB7IFNjb3BlSGVscGVyLCBWYXJpYWJsZU1hcCB9IGZyb20gXCJAL2NvcmUvU2NvcGVcIjtcbmltcG9ydCB7IFN5c3RlbVNjb3BlIH0gZnJvbSBcIkAvY29yZS9TeXN0ZW1TY29wZVwiO1xuaW1wb3J0IHsgVGFyZ2V0U3RydWN0LCBUYXJnZXRUeXBlLCBMaXZlU3RyaW5nIH0gZnJvbSBcIkAvY29yZS9UYXJnZXRTdHJ1Y3RcIjtcbmltcG9ydCB7IFNZU1RFTV9WQVJJQUJMRV9HUk9VUCB9IGZyb20gXCJAL0NvbnN0YW50c1wiO1xuaW1wb3J0IHsgbm9ybWFsaXplRGVmaW5pdGlvbnMgfSBmcm9tIFwiQC9jb3JlL0RlZmluaXRpb25IZWxwZXJcIjtcblxuY29uc3QgX2xhbmd1YWdlRXh0ZW5zaW9ucyA9IHtcbiAgQVNNOiBbIFwiLmFzbVwiLCBcIi5zXCIgXSxcbiAgQzogICBbIFwiLmNcIiBdLFxuICBDWFg6IFtcIi5jcHBcIiwgXCIuY2NcIiwgXCIuY3h4XCIgXSxcbn07XG5cbmZ1bmN0aW9uIG5vcm1hbGl6ZUluY2x1ZGVzKGJhc2VEaXI6IEFic29sdXRlUGF0aCwgLi4uaW5jbHVkZXM6IGFueVtdKTogQXJyYXk8QWJzb2x1dGVQYXRofEludGVyZmFjZUluY2x1ZGVzPiB7XG4gIGNvbnN0IHJlc3VsdCA9IFtdO1xuICBmb3IgKGNvbnN0IGl0ZXIgb2YgaW5jbHVkZXMuZmxhdCgpKSB7XG4gICAgaWYgKGl0ZXIgaW5zdGFuY2VvZiBJbnRlcmZhY2VJbmNsdWRlcylcbiAgICAgIHJlc3VsdC5wdXNoKGl0ZXIpO1xuICAgIGVsc2UgaWYgKHR5cGVvZiBpdGVyID09PSBcInN0cmluZ1wiKVxuICAgICAgcmVzdWx0LnB1c2goQWJzb2x1dGVQYXRoLmNyZWF0ZShiYXNlRGlyLnJlc29sdmUoaXRlcikpKTtcbiAgICBlbHNlIGlmIChpdGVyIGluc3RhbmNlb2YgQWJzb2x1dGVQYXRoKVxuICAgICAgcmVzdWx0LnB1c2goQWJzb2x1dGVQYXRoLmNyZWF0ZShpdGVyKSk7XG4gICAgZWxzZVxuICAgICAgdGhyb3cgbmV3IEVycm9yKGBOb3Qgc3VwcG9ydCBpbnN0YW5jZSAke2l0ZXJ9YCk7XG4gIH1cbiAgcmV0dXJuIHJlc3VsdDtcbn1cblxuZnVuY3Rpb24gaXNTdXBwb3J0TGFuZ3VhZ2UobGFuZ3VhZ2U6IHN0cmluZykge1xuICByZXR1cm4gX2xhbmd1YWdlRXh0ZW5zaW9ucy5oYXNPd25Qcm9wZXJ0eShsYW5ndWFnZSk7XG59XG5cbmZ1bmN0aW9uIGdldEZpbGVMYW5ndWFnZShmaWxlbmFtZTogc3RyaW5nKSB7XG4gIGNvbnN0IGZpbGVuYW1lTG93ZXJDYXNlID0gZmlsZW5hbWUudG9Mb3dlckNhc2UoKTtcbiAgZm9yIChjb25zdCBbbGFuZ3VhZ2UsIGV4dGVuc2lvbnNdIG9mIE9iamVjdC5lbnRyaWVzKF9sYW5ndWFnZUV4dGVuc2lvbnMpKSB7XG4gICAgZm9yIChjb25zdCBpdGVyIG9mIGV4dGVuc2lvbnMpIHtcbiAgICAgIGlmIChmaWxlbmFtZUxvd2VyQ2FzZS5lbmRzV2l0aChpdGVyKSlcbiAgICAgICAgcmV0dXJuIGxhbmd1YWdlO1xuICAgIH1cbiAgfVxuICByZXR1cm4gXCJcIjtcbn1cblxuZnVuY3Rpb24gbWFrZUxhbmd1YWdlKHZhbHVlOiBzdHJpbmcpIHtcbiAgaWYgKGlzU3VwcG9ydExhbmd1YWdlKHZhbHVlKSlcbiAgICByZXR1cm4gdmFsdWU7XG4gIHRocm93IG5ldyBFcnJvcihgTGFuZ3VhZ2UgXCIke3ZhbHVlfVwiIGlzIG5vdCBzdXBwb3J0ZWRgKTtcbn1cblxuZnVuY3Rpb24gY3JlYXRlU291cmNlcyhzY29wZTogU3lzdGVtU2NvcGUsIHNvdXJjZTogSW50ZXJmYWNlT2JqZWN0cyB8IFNvdXJjZUZpbGUgfCBBYnNvbHV0ZVBhdGggfCBzdHJpbmcpOiBJbnRlcmZhY2VPYmplY3RzIHwgU291cmNlRmlsZSB7XG4gIGlmIChzb3VyY2UgaW5zdGFuY2VvZiBJbnRlcmZhY2VPYmplY3RzIHx8IHNvdXJjZSBpbnN0YW5jZW9mIFNvdXJjZUZpbGUpXG4gICAgcmV0dXJuIHNvdXJjZTtcblxuICBpZiAodHlwZW9mIHNvdXJjZSA9PT0gXCJzdHJpbmdcIiB8fCBBYnNvbHV0ZVBhdGguaXNBYnNvbHV0ZShzb3VyY2UpKSB7XG4gICAgY29uc3QgZmlsZW5hbWUgPSBzY29wZS5TT1VSQ0VfRElSLnJlc29sdmUoc291cmNlKTtcbiAgICBjb25zdCBsYW5ndWFnZSA9IGdldEZpbGVMYW5ndWFnZShmaWxlbmFtZS50b1N0cmluZygpKTtcbiAgICBjb25zdCBjb21waWxlRmxhZ3MgPSAhbGFuZ3VhZ2UgPyBbXSA6IFtcbiAgICAgIC4uLihzY29wZSBhcyBhbnkpW2xhbmd1YWdlICsgXCJfRkxBR1NcIl0sXG4gICAgICAuLi4oc2NvcGUgYXMgYW55KVtsYW5ndWFnZSArIFwiX0ZMQUdTX1wiICsgc2NvcGUuQlVJTERfVFlQRS50b1VwcGVyQ2FzZSgpXSxcbiAgICBdO1xuICAgIHJldHVybiBTb3VyY2VGaWxlLmNyZWF0ZShmaWxlbmFtZSwgc2NvcGUuU09VUkNFX0RJUiwgbGFuZ3VhZ2UsIGNvbXBpbGVGbGFncyk7XG4gIH1cbiAgXG4gIHRocm93IG5ldyBFcnJvcihgTm90IHN1cHBvcnQgaW5zdGFuY2UgJHtzb3VyY2V9YCk7XG59XG5cbmZ1bmN0aW9uIGdldFNvdXJjZUZpbGVzKGltcGw6IFRhcmdldFN0cnVjdCwgc2NvcGU6IFN5c3RlbVNjb3BlLCAuLi5zb3VyY2VzOiBhbnlbXSk6IFNvdXJjZUZpbGVMaXN0IHtcbiAgY29uc3QgcmVzdWx0ID0gW107XG4gIGNvbnN0IHNvdXJjZUZpbGVzID0gaW1wbC5nZXRTb3VyY2VGaWxlcygpO1xuICBmb3IgKGNvbnN0IGl0IG9mIHNvdXJjZXMuZmxhdCgpKSB7XG4gICAgY29uc3QgZmlsZW5hbWUgPSBzY29wZS5TT1VSQ0VfRElSLnJlc29sdmUoaXQpLnRvU3RyaW5nKCk7XG4gICAgY29uc3Qgc3JjID0gc291cmNlRmlsZXMuZmluZChpID0+IGkuRklMRS50b1N0cmluZygpID09PSBmaWxlbmFtZSk7XG4gICAgaWYgKCFzcmMpXG4gICAgICB0aHJvdyBuZXcgRXJyb3IoYENhbm5vdCBmaW5kIFwiJHtpdH1cImApO1xuICAgIHJlc3VsdC5wdXNoKHNyYyk7XG4gIH1cblxuICBpZiAocmVzdWx0Lmxlbmd0aClcbiAgICByZXR1cm4gU291cmNlRmlsZUxpc3QuY3JlYXRlKHNjb3BlLCByZXN1bHQpO1xuXG4gIHJldHVybiBTb3VyY2VGaWxlTGlzdC5jcmVhdGUoc2NvcGUsIHNvdXJjZUZpbGVzKTtcbn1cblxuY29uc3QgSU1QTCAgICAgICAgICAgICAgICA9IFN5bWJvbChcIklNUExcIik7XG5jb25zdCBUQVJHRVRfU0NPUEUgICAgICAgID0gU3ltYm9sKFwiVEFSR0VUX1NDT1BFXCIpO1xuXG5pbnRlcmZhY2UgVGFyZ2V0VmFsdWU8VD4ge1xuICB2YWx1ZTogVDtcbiAgcHVibGljT25seTogYm9vbGVhbjtcbn07XG5cbnR5cGUgVGFyZ2V0VmFsdWVMaXN0PFQ+ID0gQXJyYXk8VGFyZ2V0VmFsdWU8VD4+O1xuXG5leHBvcnQgY2xhc3MgVXNlckluZGlyZWN0VGFyZ2V0IGltcGxlbWVudHMgSU1ha2VUYXJnZXQge1xuICBwcml2YXRlIFtJTVBMXTogVGFyZ2V0U3RydWN0O1xuICBwcml2YXRlIFtUQVJHRVRfU0NPUEVdOiBTeXN0ZW1TY29wZTtcbiAgcHJpdmF0ZSBfbmFtZTogc3RyaW5nO1xuICBwcml2YXRlIF9wcmVmaXg/OiBzdHJpbmc7XG4gIHByaXZhdGUgX291dHB1dE5hbWU/OiBzdHJpbmc7XG4gIHByaXZhdGUgX3N1ZmZpeD86IHN0cmluZztcbiAgcHJpdmF0ZSBfcG9zaXRpb25JbmRlcGVuZGVudENvZGU/OiBib29sZWFuO1xuICBwcml2YXRlIF9pbmNsdWRlczogVGFyZ2V0VmFsdWVMaXN0PEFic29sdXRlUGF0aCB8IEludGVyZmFjZUluY2x1ZGVzPjtcbiAgcHJpdmF0ZSBfZGVmaW5pdGlvbnM6IFRhcmdldFZhbHVlTGlzdDxzdHJpbmc+O1xuXG4gIHByaXZhdGUgY29uc3RydWN0b3IoaW1wbDogVGFyZ2V0U3RydWN0LCB2YXJpYWJsZU1hcDogVmFyaWFibGVNYXAsIG5hbWU6IHN0cmluZykge1xuICAgIGNvbnN0IHZhcmlhYmxlcyA9IFNjb3BlSGVscGVyLmNyZWF0ZVZhcmlhYmxlVmFsdWVzKHZhcmlhYmxlTWFwLCBTWVNURU1fVkFSSUFCTEVfR1JPVVApIGFzIFN5c3RlbVNjb3BlO1xuICAgIHRoaXNbSU1QTF0gPSBpbXBsO1xuICAgIHRoaXNbVEFSR0VUX1NDT1BFXSA9IHZhcmlhYmxlcztcbiAgICB0aGlzLl9uYW1lID0gbmFtZTtcbiAgICB0aGlzLl9pbmNsdWRlcyA9IFtdO1xuICAgIHRoaXMuX2RlZmluaXRpb25zID0gW107XG4gIH1cblxuICBwdWJsaWMgc3RhdGljIGNyZWF0ZShpbXBsOiBUYXJnZXRTdHJ1Y3QsIHZhcmlhYmxlTWFwOiBWYXJpYWJsZU1hcCwgbmFtZTogc3RyaW5nKSB7XG4gICAgcmV0dXJuIE9iamVjdC5zZWFsKG5ldyBVc2VySW5kaXJlY3RUYXJnZXQoaW1wbCwgdmFyaWFibGVNYXAsIG5hbWUpKTtcbiAgfVxuXG4gIHB1YmxpYyBzdGF0aWMgZW5zdXJlSW5zdGFuY2UodmFsdWU6IGFueSkge1xuICAgIGlmICh2YWx1ZSBpbnN0YW5jZW9mIFVzZXJJbmRpcmVjdFRhcmdldClcbiAgICAgIHJldHVybiB2YWx1ZTtcbiAgICB0aHJvdyBuZXcgRXJyb3IoYFRoZSAnJHt2YWx1ZX0nIGlzIG5vdCBhIFVzZXJJbmRpcmVjdFRhcmdldGApO1xuICB9XG5cbiAgcHVibGljIGdldCB0YXJnZXROYW1lKCk6IHN0cmluZyB7XG4gICAgcmV0dXJuIHRoaXMuX25hbWU7XG4gIH1cblxuICBwdWJsaWMgZ2V0IGluY2x1ZGVzKCk6IEludGVyZmFjZUluY2x1ZGVzIHtcbiAgICByZXR1cm4gSW50ZXJmYWNlSW5jbHVkZXMuY3JlYXRlKHRoaXMudGFyZ2V0TmFtZSk7XG4gIH1cblxuICBwdWJsaWMgZ2V0IG9iamVjdHMoKTogSW50ZXJmYWNlT2JqZWN0cyB7XG4gICAgcmV0dXJuIEludGVyZmFjZU9iamVjdHMuY3JlYXRlKHRoaXMudGFyZ2V0TmFtZSk7XG4gIH1cblxuICBwdWJsaWMgZ2V0IHByZWZpeCgpIHtcbiAgICByZXR1cm4gdGhpcy5fcHJlZml4O1xuICB9XG5cbiAgcHVibGljIHNldFByZWZpeCh2YWx1ZTogc3RyaW5nKSB7XG4gICAgdGhpcy5fcHJlZml4ID0gdmFsdWU7XG4gIH1cblxuICBwdWJsaWMgZ2V0IG91dHB1dE5hbWUoKSB7XG4gICAgcmV0dXJuIHRoaXMuX291dHB1dE5hbWU7XG4gIH1cblxuICBwdWJsaWMgc2V0T3V0cHV0TmFtZSh2YWx1ZTogYW55KSB7XG4gICAgdGhpcy5fb3V0cHV0TmFtZSA9IHZhbHVlO1xuICB9XG5cbiAgcHVibGljIGdldCBzdWZmaXgoKSB7XG4gICAgcmV0dXJuIHRoaXMuX3N1ZmZpeDtcbiAgfVxuXG4gIHB1YmxpYyBzZXRTdWZmaXgodmFsdWU6IHN0cmluZykge1xuICAgIHRoaXMuX3N1ZmZpeCA9IHZhbHVlO1xuICB9XG5cbiAgcHVibGljIHRvSlNPTigpOiBzdHJpbmcge1xuICAgIHJldHVybiB0aGlzLnRvU3RyaW5nKCk7XG4gIH1cblxuICBwdWJsaWMgdG9TdHJpbmcoKTogc3RyaW5nIHtcbiAgICByZXR1cm4gXCIke1wiICsgdGhpcy50YXJnZXROYW1lICsgXCJ9XCI7XG4gIH1cblxuICBwdWJsaWMgYWRkU291cmNlcyguLi5zb3VyY2VzOiBBcnJheTxJbnRlcmZhY2VPYmplY3RzIHwgU291cmNlRmlsZSB8IEFic29sdXRlUGF0aCB8IHN0cmluZz4pOiB2b2lkIHtcbiAgICBmb3IgKGxldCBpdCBvZiBzb3VyY2VzLmZsYXQoKSkge1xuICAgICAgdGhpc1tJTVBMXS5hZGRTb3VyY2UoXCJpbmRpcmVjdGx5XCIsIGZhbHNlLCBjcmVhdGVTb3VyY2VzKHRoaXNbVEFSR0VUX1NDT1BFXSwgaXQpKTtcbiAgICB9XG4gIH1cblxuICBwdWJsaWMgZ2V0SW5jbHVkZXMoKSB7XG4gICAgcmV0dXJuIHRoaXMuX2luY2x1ZGVzO1xuICB9XG5cbiAgcHVibGljIGFkZEluY2x1ZGVzKC4uLmluY2x1ZGVzOiBBcnJheTxJbnRlcmZhY2VJbmNsdWRlcyB8IEFic29sdXRlUGF0aCB8IHN0cmluZz4pOiB2b2lkIHtcbiAgICB0aGlzLmFkZEluY2x1ZGVzSW1wbChmYWxzZSwgLi4uaW5jbHVkZXMpO1xuICB9XG5cbiAgcHVibGljIGFkZFB1YmxpY0luY2x1ZGVzKC4uLmluY2x1ZGVzOiBBcnJheTxJbnRlcmZhY2VJbmNsdWRlcyB8IEFic29sdXRlUGF0aCB8IHN0cmluZz4pOiB2b2lkIHtcbiAgICB0aGlzLmFkZEluY2x1ZGVzSW1wbCh0cnVlLCAuLi5pbmNsdWRlcyk7XG4gIH1cblxuICBwdWJsaWMgYWRkSW5jbHVkZXNJbXBsKHB1YmxpY09ubHk6IGJvb2xlYW4sIC4uLmluY2x1ZGVzOiBBcnJheTxJbnRlcmZhY2VJbmNsdWRlcyB8IEFic29sdXRlUGF0aCB8IHN0cmluZz4pOiB2b2lkIHtcbiAgICBjb25zdCBiYXNlRGlyID0gdGhpc1tUQVJHRVRfU0NPUEVdLlNPVVJDRV9ESVI7XG4gICAgZm9yIChjb25zdCB2YWx1ZSBvZiBub3JtYWxpemVJbmNsdWRlcyhiYXNlRGlyLCAuLi5pbmNsdWRlcykpXG4gICAgICB0aGlzLl9pbmNsdWRlcy5wdXNoKHtwdWJsaWNPbmx5LCB2YWx1ZX0pO1xuICB9XG5cbiAgcHVibGljIGdldERlZmluaXRpb25zKCkge1xuICAgIHJldHVybiB0aGlzLl9kZWZpbml0aW9ucztcbiAgfVxuXG4gIHB1YmxpYyBhZGREZWZpbml0aW9ucyguLi5kZWZpbml0aW9uczogYW55KTogdm9pZCB7XG4gICAgdGhpcy5hZGREZWZpbml0aW9uc0ltcGwoZmFsc2UsIC4uLmRlZmluaXRpb25zKTtcbiAgfVxuXG4gIHB1YmxpYyBhZGRQdWJsaWNEZWZpbml0aW9ucyguLi5kZWZpbml0aW9uczogYW55KTogdm9pZCB7XG4gICAgdGhpcy5hZGREZWZpbml0aW9uc0ltcGwodHJ1ZSwgLi4uZGVmaW5pdGlvbnMpO1xuICB9XG5cbiAgcHVibGljIGFkZERlZmluaXRpb25zSW1wbChwdWJsaWNPbmx5OiBib29sZWFuLCAuLi5kZWZpbml0aW9uczogQXJyYXk8c3RyaW5nIHwgb2JqZWN0Pik6IHZvaWQge1xuICAgIGZvciAoY29uc3QgdmFsdWUgb2Ygbm9ybWFsaXplRGVmaW5pdGlvbnMoLi4uZGVmaW5pdGlvbnMpKVxuICAgICAgdGhpcy5fZGVmaW5pdGlvbnMucHVzaCh7cHVibGljT25seSwgdmFsdWV9KTtcbiAgfVxuXG4gIHB1YmxpYyBhZGRDb21waWxlT3B0aW9ucyguLi5vcHRpb25zOiBBcnJheTxzdHJpbmd8c3RyaW5nW10+KTogdm9pZCB7XG4gICAgdGhpc1tJTVBMXS5hZGRDb21waWxlT3B0aW9ucyhcImluZGlyZWN0bHlcIiwgZmFsc2UsIC4uLm9wdGlvbnMpO1xuICB9XG5cbiAgcHVibGljIGFkZFB1YmxpY0NvbXBpbGVPcHRpb25zKC4uLm9wdGlvbnM6IHN0cmluZ1tdKTogdm9pZCB7XG4gICAgdGhpc1tJTVBMXS5hZGRDb21waWxlT3B0aW9ucyhcImluZGlyZWN0bHlcIiwgdHJ1ZSwgLi4ub3B0aW9ucyk7XG4gIH1cblxuICBwdWJsaWMgYWRkTGlua09wdGlvbnMoLi4ub3B0aW9uczogQXJyYXk8c3RyaW5nfHN0cmluZ1tdPik6IHZvaWQge1xuICAgIHRoaXNbSU1QTF0uYWRkTGlua09wdGlvbnMoXCJpbmRpcmVjdGx5XCIsIGZhbHNlLCAuLi5vcHRpb25zKTtcbiAgfVxuXG4gIHB1YmxpYyBhZGRQdWJsaWNMaW5rT3B0aW9ucyguLi5vcHRpb25zOiBzdHJpbmdbXSk6IHZvaWQge1xuICAgIHRoaXNbSU1QTF0uYWRkTGlua09wdGlvbnMoXCJpbmRpcmVjdGx5XCIsIHRydWUsIC4uLm9wdGlvbnMpO1xuICB9XG5cbiAgcHVibGljIGdldFNvdXJjZUZpbGVzKC4uLnNvdXJjZXM6IGFueVtdKTogU291cmNlRmlsZUxpc3Qge1xuICAgIHJldHVybiBnZXRTb3VyY2VGaWxlcyh0aGlzW0lNUExdLCB0aGlzW1RBUkdFVF9TQ09QRV0sIC4uLnNvdXJjZXMpO1xuICB9XG5cbiAgcHVibGljIGFkZExpYnJhcmllcyguLi5saWJyYXJpZXM6IGFueSkge1xuICAgIG5ldyBFcnJvcihcIk5vdCBJbXBsZW1lbnRlZFwiKTtcbiAgfVxuXG4gIHB1YmxpYyBhZGRQcmVCdWlsZChjb21tYW5kOiBhbnksIGFyZ3M6IGFueVtdKSB7XG4gICAgbmV3IEVycm9yKFwiTm90IEltcGxlbWVudGVkXCIpO1xuICB9XG5cbiAgcHVibGljIGFkZFBvc3RCdWlsZChjb21tYW5kOiBhbnksIGFyZ3M6IGFueVtdKSB7XG4gICAgbmV3IEVycm9yKFwiTm90IEltcGxlbWVudGVkXCIpO1xuICB9XG5cbiAgcHVibGljIGdldCBwb3NpdGlvbkluZGVwZW5kZW50Q29kZSgpIHtcbiAgICByZXR1cm4gdGhpcy5fcG9zaXRpb25JbmRlcGVuZGVudENvZGU7XG4gIH1cblxuICBwdWJsaWMgc2V0UG9zaXRpb25JbmRlcGVuZGVudENvZGUodmFsdWU6IGJvb2xlYW4pIHtcbiAgICB0aGlzLl9wb3NpdGlvbkluZGVwZW5kZW50Q29kZSA9IHZhbHVlO1xuICB9XG5cbiAgcHVibGljIGFkZFB1YmxpY0xpYnJhcmllcyguLi5saWJyYXJpZXM6IGFueVtdKSB7XG4gICAgbmV3IEVycm9yKFwiTm90IEltcGxlbWVudGVkXCIpO1xuICB9XG59O1xuXG5leHBvcnQgY2xhc3MgQmFzZVRhcmdldCBpbXBsZW1lbnRzIElNYWtlVGFyZ2V0IHtcbiAgcHJpdmF0ZSBbSU1QTF06IFRhcmdldFN0cnVjdDtcbiAgcHJpdmF0ZSBbVEFSR0VUX1NDT1BFXTogU3lzdGVtU2NvcGU7XG5cbiAgcHJvdGVjdGVkIF9uYW1lOiBzdHJpbmc7XG4gIHByb3RlY3RlZCBfcHJlZml4ID0gXCJcIjtcbiAgcHJvdGVjdGVkIF9vdXRwdXROYW1lOiBzdHJpbmc7XG4gIHByb3RlY3RlZCBfc3VmZml4ID0gXCJcIjtcblxuICBwcml2YXRlIF9wb3NpdGlvbkluZGVwZW5kZW50Q29kZTogYm9vbGVhbjtcbiAgcHJpdmF0ZSBfaW5jbHVkZXM6IFRhcmdldFZhbHVlTGlzdDxBYnNvbHV0ZVBhdGggfCBJbnRlcmZhY2VJbmNsdWRlcz4gPSBbXTtcbiAgcHJpdmF0ZSBfZGVmaW5pdGlvbnM6IFRhcmdldFZhbHVlTGlzdDxzdHJpbmc+ID0gW107XG5cbiAgcHJvdGVjdGVkIGNvbnN0cnVjdG9yKGltcGw6IFRhcmdldFN0cnVjdCwgdmFyaWFibGVNYXA6IFZhcmlhYmxlTWFwLCBuYW1lOiBzdHJpbmcpIHtcbiAgICB0aGlzW0lNUExdID0gaW1wbDtcbiAgICB0aGlzLl9uYW1lID0gbmFtZTtcbiAgICB0aGlzLl9vdXRwdXROYW1lID0gbmFtZTtcblxuICAgIGNvbnN0IHNjb3BlID0gU2NvcGVIZWxwZXIuY3JlYXRlVmFyaWFibGVWYWx1ZXModmFyaWFibGVNYXApIGFzIFN5c3RlbVNjb3BlO1xuICAgIGNvbnN0IHRhcmdldEZpbGUgPSBpbXBsLnRhcmdldEZpbGU7XG4gICAgdGFyZ2V0RmlsZS5maWxlRGlyID0gc2NvcGUuQklOQVJZX0RJUjtcblxuICAgIHRoaXMuX3Bvc2l0aW9uSW5kZXBlbmRlbnRDb2RlID0gc2NvcGUuUE9TSVRJT05fSU5ERVBFTkRFTlRfQ09ERTtcblxuICAgIHRoaXNbVEFSR0VUX1NDT1BFXSA9IHNjb3BlO1xuXG4gICAgdGhpcy5hZGRJbmNsdWRlc0ltcGwoZmFsc2UsIC4uLnNjb3BlLklOQ0xVREVTKTtcbiAgfVxuXG4gIHB1YmxpYyBnZXQgdGFyZ2V0TmFtZSgpIHtcbiAgICByZXR1cm4gdGhpcy5fbmFtZTtcbiAgfVxuXG4gIHB1YmxpYyBnZXQgaW5jbHVkZXMoKTogSW50ZXJmYWNlSW5jbHVkZXMge1xuICAgIHJldHVybiBJbnRlcmZhY2VJbmNsdWRlcy5jcmVhdGUodGhpcy50YXJnZXROYW1lKTtcbiAgfVxuXG4gIHB1YmxpYyBnZXQgb2JqZWN0cygpOiBJbnRlcmZhY2VPYmplY3RzIHtcbiAgICByZXR1cm4gSW50ZXJmYWNlT2JqZWN0cy5jcmVhdGUodGhpcy50YXJnZXROYW1lKTtcbiAgfVxuXG4gIHB1YmxpYyBnZXQgcHJlZml4KCkge1xuICAgIHJldHVybiB0aGlzLl9wcmVmaXg7XG4gIH1cblxuICBwdWJsaWMgc2V0UHJlZml4KHZhbHVlOiBzdHJpbmcpIHtcbiAgICB0aGlzLl9wcmVmaXggPSB2YWx1ZTtcbiAgfVxuXG4gIHB1YmxpYyBnZXQgc3VmZml4KCkge1xuICAgIHJldHVybiB0aGlzLl9zdWZmaXg7XG4gIH1cblxuICBwdWJsaWMgc2V0U3VmZml4KHZhbHVlOiBhbnkpIHtcbiAgICB0aGlzLl9zdWZmaXggPSB2YWx1ZTtcbiAgfVxuXG4gIHB1YmxpYyBnZXQgb3V0cHV0TmFtZSgpIHtcbiAgICByZXR1cm4gdGhpcy5fb3V0cHV0TmFtZTtcbiAgfVxuXG4gIHB1YmxpYyBzZXRPdXRwdXROYW1lKHZhbHVlOiBhbnkpIHtcbiAgICB0aGlzLl9vdXRwdXROYW1lID0gdmFsdWU7XG4gIH1cblxuICBwdWJsaWMgZ2V0IFRBUkdFVF9TQ09QRSgpIHtcbiAgICByZXR1cm4gdGhpc1tUQVJHRVRfU0NPUEVdO1xuICB9XG5cbiAgcHVibGljIGdldCBGSUxFX0RJUigpOiBBYnNvbHV0ZVBhdGgge1xuICAgIGlmICghdGhpc1tJTVBMXS50YXJnZXRGaWxlLmZpbGVEaXIpXG4gICAgICB0aHJvdyBuZXcgRXJyb3IoYFRhcmdldCBcIiR7dGhpcy50YXJnZXROYW1lfVwiIGlzIG5vdCBkZWZpbmVkYCk7XG4gICAgcmV0dXJuIHRoaXNbSU1QTF0udGFyZ2V0RmlsZS5maWxlRGlyO1xuICB9XG5cbiAgcHVibGljIGdldCBGSUxFX05BTUUoKTogc3RyaW5nIHtcbiAgICBpZiAoIXRoaXNbSU1QTF0udGFyZ2V0RmlsZS5maWxlTmFtZSlcbiAgICAgIHRocm93IG5ldyBFcnJvcihgVGFyZ2V0IFwiJHt0aGlzLnRhcmdldE5hbWV9XCIgaXMgbm90IGRlZmluZWRgKTtcbiAgICByZXR1cm4gdGhpc1tJTVBMXS50YXJnZXRGaWxlLmZpbGVOYW1lO1xuICB9XG5cbiAgcHVibGljIGdldCBGSUxFKCk6IEFic29sdXRlUGF0aCB7XG4gICAgaWYgKCF0aGlzW0lNUExdLnRhcmdldEZpbGUuZmlsZSlcbiAgICAgIHRocm93IG5ldyBFcnJvcihgVGFyZ2V0IFwiJHt0aGlzLnRhcmdldE5hbWV9XCIgaXMgbm90IGRlZmluZWRgKTtcbiAgICByZXR1cm4gdGhpc1tJTVBMXS50YXJnZXRGaWxlLmZpbGU7XG4gIH1cblxuICBwdWJsaWMgZ2V0IElNUEwoKTogVGFyZ2V0U3RydWN0IHtcbiAgICByZXR1cm4gdGhpc1tJTVBMXTtcbiAgfVxuXG4gIHB1YmxpYyBhZGRTb3VyY2VzKC4uLnNvdXJjZXM6IEFycmF5PEludGVyZmFjZU9iamVjdHMgfCBTb3VyY2VGaWxlIHwgQWJzb2x1dGVQYXRoIHwgc3RyaW5nPikge1xuICAgIGZvciAobGV0IGl0IG9mIHNvdXJjZXMuZmxhdCgpKSB7XG4gICAgICB0aGlzW0lNUExdLmFkZFNvdXJjZShcImRpcmVjdGx5XCIsIGZhbHNlLCBjcmVhdGVTb3VyY2VzKHRoaXNbVEFSR0VUX1NDT1BFXSwgaXQpKTtcbiAgICB9XG4gIH1cblxuICBwdWJsaWMgZ2V0SW5jbHVkZXMoKSB7XG4gICAgcmV0dXJuIHRoaXMuX2luY2x1ZGVzO1xuICB9XG5cbiAgcHVibGljIGFkZEluY2x1ZGVzKC4uLmluY2x1ZGVzOiBBcnJheTxJbnRlcmZhY2VJbmNsdWRlcyB8IEFic29sdXRlUGF0aCB8IHN0cmluZz4pOiB2b2lkIHtcbiAgICB0aGlzLmFkZEluY2x1ZGVzSW1wbChmYWxzZSwgLi4uaW5jbHVkZXMpO1xuICB9XG5cbiAgcHVibGljIGFkZFB1YmxpY0luY2x1ZGVzKC4uLmluY2x1ZGVzOiBBcnJheTxJbnRlcmZhY2VJbmNsdWRlcyB8IEFic29sdXRlUGF0aCB8IHN0cmluZz4pOiB2b2lkIHtcbiAgICB0aGlzLmFkZEluY2x1ZGVzSW1wbCh0cnVlLCAuLi5pbmNsdWRlcyk7XG4gIH1cblxuICBwdWJsaWMgYWRkSW5jbHVkZXNJbXBsKHB1YmxpY09ubHk6IGJvb2xlYW4sIC4uLmluY2x1ZGVzOiBBcnJheTxJbnRlcmZhY2VJbmNsdWRlcyB8IEFic29sdXRlUGF0aCB8IHN0cmluZz4pOiB2b2lkIHtcbiAgICBjb25zdCBiYXNlRGlyID0gdGhpc1tUQVJHRVRfU0NPUEVdLlNPVVJDRV9ESVI7XG4gICAgZm9yIChjb25zdCB2YWx1ZSBvZiBub3JtYWxpemVJbmNsdWRlcyhiYXNlRGlyLCAuLi5pbmNsdWRlcykpXG4gICAgICB0aGlzLl9pbmNsdWRlcy5wdXNoKHtwdWJsaWNPbmx5LCB2YWx1ZX0pO1xuICB9XG5cbiAgcHVibGljIGdldERlZmluaXRpb25zKCkge1xuICAgIHJldHVybiB0aGlzLl9kZWZpbml0aW9ucztcbiAgfVxuXG4gIHB1YmxpYyBhZGREZWZpbml0aW9ucyguLi5kZWZpbml0aW9uczogYW55KTogdm9pZCB7XG4gICAgdGhpcy5hZGREZWZpbml0aW9uc0ltcGwoZmFsc2UsIC4uLmRlZmluaXRpb25zKTtcbiAgfVxuXG4gIHB1YmxpYyBhZGRQdWJsaWNEZWZpbml0aW9ucyguLi5kZWZpbml0aW9uczogYW55KTogdm9pZCB7XG4gICAgdGhpcy5hZGREZWZpbml0aW9uc0ltcGwodHJ1ZSwgLi4uZGVmaW5pdGlvbnMpO1xuICB9XG5cbiAgcHVibGljIGFkZERlZmluaXRpb25zSW1wbChwdWJsaWNPbmx5OiBib29sZWFuLCAuLi5kZWZpbml0aW9uczogQXJyYXk8c3RyaW5nIHwgb2JqZWN0Pik6IHZvaWQge1xuICAgIGZvciAoY29uc3QgdmFsdWUgb2Ygbm9ybWFsaXplRGVmaW5pdGlvbnMoLi4uZGVmaW5pdGlvbnMpKVxuICAgICAgdGhpcy5fZGVmaW5pdGlvbnMucHVzaCh7cHVibGljT25seSwgdmFsdWV9KTtcbiAgfVxuXG4gIHB1YmxpYyBhZGRMaWJyYXJpZXMoLi4ubGlicmFyaWVzOiBhbnkpIHtcbiAgICB0aGlzW0lNUExdLmFkZExpYnJhcmllcyhcImRpcmVjdGx5XCIsIGZhbHNlLCAuLi5saWJyYXJpZXMpO1xuICB9XG5cbiAgcHVibGljIGFkZENvbXBpbGVPcHRpb25zKC4uLm9wdGlvbnM6IEFycmF5PHN0cmluZ3xzdHJpbmdbXT4pIHtcbiAgICB0aGlzW0lNUExdLmFkZENvbXBpbGVPcHRpb25zKFwiZGlyZWN0bHlcIiwgZmFsc2UsIC4uLm9wdGlvbnMpO1xuICB9XG5cbiAgcHVibGljIGFkZExpbmtPcHRpb25zKC4uLm9wdGlvbnM6IEFycmF5PHN0cmluZ3xzdHJpbmdbXT4pIHtcbiAgICB0aGlzW0lNUExdLmFkZExpbmtPcHRpb25zKFwiZGlyZWN0bHlcIiwgZmFsc2UsIC4uLm9wdGlvbnMpO1xuICB9XG5cbiAgcHVibGljIGdldFNvdXJjZUZpbGVzKC4uLnNvdXJjZXM6IGFueVtdKTogU291cmNlRmlsZUxpc3Qge1xuICAgIHJldHVybiBnZXRTb3VyY2VGaWxlcyh0aGlzW0lNUExdLCB0aGlzW1RBUkdFVF9TQ09QRV0sIC4uLnNvdXJjZXMpO1xuICB9XG5cbiAgcHVibGljIGFkZFByZUJ1aWxkKGNvbW1hbmQ6IGFueSwgYXJnczogYW55W10pIHtcbiAgICB0aGlzW0lNUExdLmFkZFByZUJ1aWxkKGNvbW1hbmQsIGFyZ3MpO1xuICB9XG5cbiAgcHVibGljIGFkZFBvc3RCdWlsZChjb21tYW5kOiBhbnksIGFyZ3M6IGFueVtdKSB7XG4gICAgdGhpc1tJTVBMXS5hZGRQb3N0QnVpbGQoY29tbWFuZCwgYXJncyk7XG4gIH1cblxuICBwdWJsaWMgZ2V0IHRhcmdldEZpbGUoKTogTGl2ZVN0cmluZyB7XG4gICAgY29uc3QgdGFyZ2V0RmlsZSA9IHRoaXNbSU1QTF0udGFyZ2V0RmlsZTtcbiAgICByZXR1cm4gTGl2ZVN0cmluZy5jcmVhdGUoKCkgPT4gdGFyZ2V0RmlsZS5maWxlID8gdGFyZ2V0RmlsZS5maWxlLnRvU3RyaW5nKCkgOiBcIlwiKTtcbiAgfVxuXG4gIHB1YmxpYyBnZXQgcG9zaXRpb25JbmRlcGVuZGVudENvZGUoKSB7XG4gICAgcmV0dXJuIHRoaXMuX3Bvc2l0aW9uSW5kZXBlbmRlbnRDb2RlO1xuICB9XG5cbiAgcHVibGljIHNldFBvc2l0aW9uSW5kZXBlbmRlbnRDb2RlKHZhbHVlOiBib29sZWFuKSB7XG4gICAgdGhpcy5fcG9zaXRpb25JbmRlcGVuZGVudENvZGUgPSB2YWx1ZTtcbiAgfVxuXG4gIHB1YmxpYyBhZGRQdWJsaWNMaWJyYXJpZXMoLi4ubGlicmFyaWVzOiBhbnlbXSkge1xuICAgIHRoaXNbSU1QTF0uYWRkTGlicmFyaWVzKFwiZGlyZWN0bHlcIiwgdHJ1ZSwgLi4ubGlicmFyaWVzKTtcbiAgfVxuXG4gIHB1YmxpYyBhZGRQdWJsaWNDb21waWxlT3B0aW9ucyguLi5vcHRpb25zOiBBcnJheTxzdHJpbmd8c3RyaW5nW10+KSB7XG4gICAgdGhpc1tJTVBMXS5hZGRDb21waWxlT3B0aW9ucyhcImRpcmVjdGx5XCIsIHRydWUsIC4uLm9wdGlvbnMpO1xuICB9XG5cbiAgcHVibGljIGFkZFB1YmxpY0xpbmtPcHRpb25zKC4uLm9wdGlvbnM6IEFycmF5PHN0cmluZ3xzdHJpbmdbXT4pIHtcbiAgICB0aGlzW0lNUExdLmFkZExpbmtPcHRpb25zKFwiZGlyZWN0bHlcIiwgdHJ1ZSwgLi4ub3B0aW9ucyk7XG4gIH1cblxuICBwdWJsaWMgdG9KU09OKCk6IG9iamVjdCB7XG4gICAgcmV0dXJuIHtcbiAgICAgIE5BTUU6IHRoaXMudGFyZ2V0TmFtZSxcbiAgICAgIFRBUkdFVF9TQ09QRTogdGhpcy5UQVJHRVRfU0NPUEUsXG4gICAgICBGSUxFX0RJUjogdGhpcy5GSUxFX0RJUixcbiAgICAgIEZJTEU6IHRoaXMuRklMRSxcbiAgICB9XG4gIH1cbn07XG5cbmV4cG9ydCBjbGFzcyBPYmplY3RMaWJyYXJ5IGV4dGVuZHMgQmFzZVRhcmdldCBpbXBsZW1lbnRzIElPYmplY3RMaWJyYXJ5IHtcbiAgcHJpdmF0ZSBjb25zdHJ1Y3RvcihpbXBsOiBUYXJnZXRTdHJ1Y3QsIHZhcmlhYmxlTWFwOiBWYXJpYWJsZU1hcCwgbmFtZTogc3RyaW5nKSB7XG4gICAgc3VwZXIoaW1wbCwgdmFyaWFibGVNYXAsIG5hbWUpO1xuICAgIHRoaXMuX3ByZWZpeCA9IHRoaXNbVEFSR0VUX1NDT1BFXS5PQkpFQ1RfTElCUkFSWV9QUkVGSVg7XG4gICAgdGhpcy5fc3VmZml4ID0gdGhpc1tUQVJHRVRfU0NPUEVdLk9CSkVDVF9MSUJSQVJZX1NVRkZJWDtcbiAgICB0aGlzW0lNUExdLnR5cGUgPSBUYXJnZXRUeXBlLk9iamVjdExpYnJhcnk7XG4gICAgdGhpc1tJTVBMXS5hZGRMaW5rT3B0aW9ucyhcImluaXRpYWxpemVcIiwgdHJ1ZSwgLi4udGhpc1tUQVJHRVRfU0NPUEVdLk9CSkVDVF9MSU5LRVJfRkxBR1MpO1xuICB9XG5cbiAgcHVibGljIHN0YXRpYyBjcmVhdGUoaW1wbDogVGFyZ2V0U3RydWN0LCB2YXJpYWJsZU1hcDogVmFyaWFibGVNYXAsIG5hbWU6IHN0cmluZykge1xuICAgIHJldHVybiBPYmplY3Quc2VhbChuZXcgT2JqZWN0TGlicmFyeShpbXBsLCB2YXJpYWJsZU1hcCwgbmFtZSkpO1xuICB9XG59O1xuXG5leHBvcnQgY2xhc3MgU3RhdGljTGlicmFyeSBleHRlbmRzIEJhc2VUYXJnZXQgaW1wbGVtZW50cyBJU3RhdGljTGlicmFyeSB7XG4gIHByaXZhdGUgY29uc3RydWN0b3IoaW1wbDogVGFyZ2V0U3RydWN0LCB2YXJpYWJsZU1hcDogVmFyaWFibGVNYXAsIG5hbWU6IHN0cmluZykge1xuICAgIHN1cGVyKGltcGwsIHZhcmlhYmxlTWFwLCBuYW1lKTtcbiAgICB0aGlzLl9wcmVmaXggPSB0aGlzW1RBUkdFVF9TQ09QRV0uU1RBVElDX0xJQlJBUllfUFJFRklYO1xuICAgIHRoaXMuX3N1ZmZpeCA9IHRoaXNbVEFSR0VUX1NDT1BFXS5TVEFUSUNfTElCUkFSWV9TVUZGSVg7XG4gICAgdGhpc1tJTVBMXS50eXBlID0gVGFyZ2V0VHlwZS5TdGF0aWNMaWJyYXJ5O1xuICAgIHRoaXNbSU1QTF0uYWRkTGlua09wdGlvbnMoXCJpbml0aWFsaXplXCIsIHRydWUsIC4uLnRoaXNbVEFSR0VUX1NDT1BFXS5TVEFUSUNfTElOS0VSX0ZMQUdTKTtcbiAgfVxuXG4gIHB1YmxpYyBzdGF0aWMgY3JlYXRlKGltcGw6IFRhcmdldFN0cnVjdCwgdmFyaWFibGVNYXA6IFZhcmlhYmxlTWFwLCBuYW1lOiBzdHJpbmcpIHtcbiAgICByZXR1cm4gT2JqZWN0LnNlYWwobmV3IFN0YXRpY0xpYnJhcnkoaW1wbCwgdmFyaWFibGVNYXAsIG5hbWUpKTtcbiAgfVxufTtcblxuZXhwb3J0IGNsYXNzIFNoYXJlZExpYnJhcnkgZXh0ZW5kcyBCYXNlVGFyZ2V0IGltcGxlbWVudHMgSVNoYXJlZExpYnJhcnkge1xuICBwcml2YXRlIGNvbnN0cnVjdG9yKGltcGw6IFRhcmdldFN0cnVjdCwgdmFyaWFibGVNYXA6IFZhcmlhYmxlTWFwLCBuYW1lOiBzdHJpbmcpIHtcbiAgICBzdXBlcihpbXBsLCB2YXJpYWJsZU1hcCwgbmFtZSk7XG4gICAgdGhpcy5fcHJlZml4ID0gdGhpc1tUQVJHRVRfU0NPUEVdLlNIQVJFRF9MSUJSQVJZX1BSRUZJWDtcbiAgICB0aGlzLl9zdWZmaXggPSB0aGlzW1RBUkdFVF9TQ09QRV0uU0hBUkVEX0xJQlJBUllfU1VGRklYO1xuICAgIHRoaXNbSU1QTF0udHlwZSA9IFRhcmdldFR5cGUuU2hhcmVkTGlicmFyeTtcbiAgICB0aGlzW0lNUExdLmFkZExpbmtPcHRpb25zKFwiaW5pdGlhbGl6ZVwiLCB0cnVlLCAuLi50aGlzW1RBUkdFVF9TQ09QRV0uU0hBUkVEX0xJTktFUl9GTEFHUyk7XG4gIH1cblxuICBwdWJsaWMgc3RhdGljIGNyZWF0ZShpbXBsOiBUYXJnZXRTdHJ1Y3QsIHZhcmlhYmxlTWFwOiBWYXJpYWJsZU1hcCwgbmFtZTogc3RyaW5nKSB7XG4gICAgcmV0dXJuIE9iamVjdC5zZWFsKG5ldyBTaGFyZWRMaWJyYXJ5KGltcGwsIHZhcmlhYmxlTWFwLCBuYW1lKSk7XG4gIH1cbn1cblxuZXhwb3J0IGNsYXNzIEV4ZWN1dGFibGUgZXh0ZW5kcyBCYXNlVGFyZ2V0IGltcGxlbWVudHMgSUV4ZWN1dGFibGUge1xuICBwcml2YXRlIGNvbnN0cnVjdG9yKGltcGw6IFRhcmdldFN0cnVjdCwgdmFyaWFibGVNYXA6IFZhcmlhYmxlTWFwLCBuYW1lOiBzdHJpbmcpIHtcbiAgICBzdXBlcihpbXBsLCB2YXJpYWJsZU1hcCwgbmFtZSk7XG4gICAgdGhpcy5fcHJlZml4ID0gXCJcIjtcbiAgICB0aGlzLl9zdWZmaXggPSB0aGlzW1RBUkdFVF9TQ09QRV0uRVhFQ1VUQUJMRV9TVUZGSVg7XG4gICAgdGhpc1tJTVBMXS50eXBlID0gVGFyZ2V0VHlwZS5FeGVjdXRhYmxlO1xuICAgIHRoaXNbSU1QTF0uYWRkTGlua09wdGlvbnMoXCJpbml0aWFsaXplXCIsIHRydWUsIC4uLnRoaXNbVEFSR0VUX1NDT1BFXS5FWEVfTElOS0VSX0ZMQUdTKTtcbiAgfVxuXG4gIHB1YmxpYyBzdGF0aWMgY3JlYXRlKGltcGw6IFRhcmdldFN0cnVjdCwgdmFyaWFibGVNYXA6IFZhcmlhYmxlTWFwLCBuYW1lOiBzdHJpbmcpIHtcbiAgICByZXR1cm4gT2JqZWN0LnNlYWwobmV3IEV4ZWN1dGFibGUoaW1wbCwgdmFyaWFibGVNYXAsIG5hbWUpKTtcbiAgfVxufTtcbiIsIi8qXG4gKiBNSVQgTGljZW5zZVxuICpcbiAqIENvcHlyaWdodCAoYykgMjAyNSAgWXVyaWkgWWFrdWJpbiAoeXVyaWkueWFrdWJpbkBnbWFpbC5jb20pXG4gKlxuICogUGVybWlzc2lvbiBpcyBncmFudGVkIHRvIHVzZSwgY29weSwgbW9kaWZ5LCBhbmQgZGlzdHJpYnV0ZSB0aGlzIHNvZnR3YXJlXG4gKiB1bmRlciB0aGUgTUlUIExpY2Vuc2UuIFNlZSBMSUNFTlNFIGZpbGUgZm9yIGRldGFpbHMuXG4gKi9cblxuaW1wb3J0IHsgSW50ZXJmYWNlSW5jbHVkZXMgfWZyb20gXCJAL2NvcmUvSW50ZXJmYWNlSW5jbHVkZXNcIjtcbmltcG9ydCB7IFVzZXJJbmRpcmVjdFRhcmdldCB9IGZyb20gXCJAL2NvcmUvVGFyZ2V0XCI7XG5pbXBvcnQgeyBUYXJnZXRTdHJ1Y3QgfSBmcm9tIFwiQC9jb3JlL1RhcmdldFN0cnVjdFwiO1xuaW1wb3J0IHsgQUxMX1RBUkdFVCwgSU5TVEFMTF9UQVJHRVQgfSBmcm9tIFwiQC9Db25zdGFudHNcIjtcbmltcG9ydCB7IEJhc2VUYXJnZXQgfSBmcm9tIFwiLi9UYXJnZXRcIjtcbmltcG9ydCB7IEFic29sdXRlUGF0aCB9IGZyb20gXCIuL0Fic29sdXRlUGF0aFwiO1xuXG5jb25zdCBFTlRSSUVTID0gU3ltYm9sKFwiRU5UUklFU1wiKTtcblxuZXhwb3J0IGNsYXNzIFRhcmdldFN0cnVjdENvbGxlY3Rpb24ge1xuICBwcml2YXRlIFtFTlRSSUVTXSA9IG5ldyBNYXA8c3RyaW5nLCBUYXJnZXRTdHJ1Y3Q+O1xuXG4gIHB1YmxpYyBjb25zdHJ1Y3RvcigpIHtcbiAgfVxuXG4gIHB1YmxpYyBnZXRPckNyZWF0ZShuYW1lOiBzdHJpbmcpOiBUYXJnZXRTdHJ1Y3Qge1xuICAgIGlmICh0eXBlb2YgbmFtZSAhPT0gXCJzdHJpbmdcIilcbiAgICAgIHRocm93IG5ldyBFcnJvcihgVGFyZ2V0IFwiJHtuYW1lfVwiIGlzIG5vdCBzdHJpbmcgdHlwZWApO1xuICAgIGlmIChbIEFMTF9UQVJHRVQsIElOU1RBTExfVEFSR0VUIF0uaW5jbHVkZXMobmFtZSkpXG4gICAgICB0aHJvdyBuZXcgRXJyb3IoYFRhcmdldCBcIiR7bmFtZX1cIiBpcyByZXNlcnZlZCBuYW1lYCk7XG4gICAgbGV0IHJlc3VsdDogVGFyZ2V0U3RydWN0IHwgdW5kZWZpbmVkID0gdGhpc1tFTlRSSUVTXS5nZXQobmFtZSk7XG4gICAgaWYgKCFyZXN1bHQpIHtcbiAgICAgIHJlc3VsdCA9IG5ldyBUYXJnZXRTdHJ1Y3QobmFtZSk7XG4gICAgICB0aGlzW0VOVFJJRVNdLnNldChuYW1lLCByZXN1bHQpO1xuICAgIH1cbiAgICByZXR1cm4gcmVzdWx0O1xuICB9XG5cbiAgcHVibGljIGdldChuYW1lOiBzdHJpbmcpOiBUYXJnZXRTdHJ1Y3Qge1xuICAgIGNvbnN0IHJlc3VsdCA9IHRoaXNbRU5UUklFU10uZ2V0KG5hbWUpO1xuICAgIGlmICghcmVzdWx0KVxuICAgICAgdGhyb3cgYFRhcmdldCBcIiR7bmFtZX1cIiBkb2VzIG5vdCBleGlzdGA7XG4gICAgcmV0dXJuIHJlc3VsdDtcbiAgfVxuXG4gIHB1YmxpYyB0b0pTT04oKTogb2JqZWN0IHtcbiAgICBjb25zdCByZXN1bHQ6IGFueSA9IHt9O1xuICAgIHRoaXNbRU5UUklFU10uZm9yRWFjaCgodiwgaykgPT4gdm9pZCAocmVzdWx0W2tdID0gdikpO1xuICAgIHJldHVybiByZXN1bHQ7XG4gIH1cbn07XG5cbmV4cG9ydCBjbGFzcyBUYXJnZXRDb2xsZWN0aW9uIHtcbiAgcHJpdmF0ZSBbRU5UUklFU106IHsgW25hbWU6IHN0cmluZ106IEJhc2VUYXJnZXQgfTtcblxuICBwcml2YXRlIGNvbnN0cnVjdG9yKCkge1xuICAgIHRoaXNbRU5UUklFU10gPSB7fTtcbiAgfVxuXG4gIHB1YmxpYyBzdGF0aWMgY3JlYXRlKCkge1xuICAgIHJldHVybiBPYmplY3Quc2VhbChuZXcgVGFyZ2V0Q29sbGVjdGlvbik7XG4gIH1cbiAgXG4gIHB1YmxpYyBnZXQgRU5UUklFUygpIHtcbiAgICByZXR1cm4gdGhpc1tFTlRSSUVTXTtcbiAgfVxuXG4gIHB1YmxpYyB0b0pTT04oKTogb2JqZWN0IHtcbiAgICByZXR1cm4gdGhpc1tFTlRSSUVTXTtcbiAgfVxuXG4gIHB1YmxpYyBnZXQobmFtZTogc3RyaW5nKTogQmFzZVRhcmdldCB7XG4gICAgcmV0dXJuIHRoaXNbRU5UUklFU11bbmFtZV07XG4gIH1cblxuICBwdWJsaWMgc2V0KG5hbWU6IHN0cmluZywgdGFyZ2V0OiBhbnkpIHtcbiAgICBpZiAodGhpc1tFTlRSSUVTXVtuYW1lXSlcbiAgICAgIHRocm93IG5ldyBFcnJvcihgVGFyZ2V0IFwiJHtuYW1lfVwiIGV4aXN0c2ApO1xuICAgIHRoaXNbRU5UUklFU11bbmFtZV0gPSB0YXJnZXQ7XG4gIH1cblxuICBwcml2YXRlIF9fZ2V0QWxsSW5jbHVkZXMoaW5jbHVkZXM6IHN0cmluZ1tdLCB0YXJnZXRTZXQ6IFNldDxzdHJpbmc+LCBsaXN0OiBBcnJheTxBYnNvbHV0ZVBhdGggfCBJbnRlcmZhY2VJbmNsdWRlcz4gfCBBcnJheTxVc2VySW5kaXJlY3RUYXJnZXQ+KSB7XG4gICAgZm9yIChjb25zdCBpdGVyIG9mIGxpc3QpIHtcbiAgICAgIGlmIChpdGVyIGluc3RhbmNlb2YgSW50ZXJmYWNlSW5jbHVkZXMgfHwgaXRlciBpbnN0YW5jZW9mIFVzZXJJbmRpcmVjdFRhcmdldCkge1xuICAgICAgICBpZiAoIXRhcmdldFNldC5oYXMoaXRlci50YXJnZXROYW1lKSkge1xuICAgICAgICAgIHRhcmdldFNldC5hZGQoaXRlci50YXJnZXROYW1lKTtcbiAgICAgICAgICBjb25zdCB0YXJnZXQgPSB0aGlzLmdldChpdGVyLnRhcmdldE5hbWUpO1xuICAgICAgICAgIHRoaXMuX19nZXRBbGxJbmNsdWRlcyhpbmNsdWRlcywgdGFyZ2V0U2V0LCB0YXJnZXQuSU1QTC5nZXRQdWJsaWNJbmNsdWRlcygpKTtcbiAgICAgICAgICB0aGlzLl9fZ2V0QWxsSW5jbHVkZXMoaW5jbHVkZXMsIHRhcmdldFNldCwgdGFyZ2V0LklNUEwuZ2V0UHVibGljTGlicmFyaWVzKCkpO1xuICAgICAgICB9XG4gICAgICB9XG4gICAgICBlbHNlIGlmIChpdGVyIGluc3RhbmNlb2YgQWJzb2x1dGVQYXRoKSB7XG4gICAgICAgIGlmICghaW5jbHVkZXMuaW5jbHVkZXMoaXRlci50b1N0cmluZygpKSlcbiAgICAgICAgICBpbmNsdWRlcy5wdXNoKGl0ZXIudG9TdHJpbmcoKSk7XG4gICAgICB9XG4gICAgICBlbHNlIHtcbiAgICAgICAgdGhyb3cgbmV3IEVycm9yKGBOb3Qgc3VwcG9ydCBpbnN0YW5jZSAke2l0ZXJ9YCk7XG4gICAgICB9XG4gICAgfVxuICB9XG5cbiAgcHVibGljIGFsbEluY2x1ZGVzT2YocGFyYW1zOiBzdHJpbmcgfCBCYXNlVGFyZ2V0KTogc3RyaW5nW10ge1xuICAgIGNvbnN0IHRhcmdldCA9ICh0eXBlb2YgcGFyYW1zID09PSBcInN0cmluZ1wiKSA/IHRoaXMuZ2V0KHBhcmFtcykgOiBwYXJhbXM7XG4gICAgY29uc3QgaW5jbHVkZXM6IHN0cmluZ1tdID0gW107XG4gICAgY29uc3QgdGFyZ2V0U2V0ID0gbmV3IFNldChbIHRhcmdldC5JTVBMLm5hbWUgXSk7XG4gICAgdGhpcy5fX2dldEFsbEluY2x1ZGVzKGluY2x1ZGVzLCB0YXJnZXRTZXQsIHRhcmdldC5JTVBMLmdldEluY2x1ZGVzKCkpO1xuICAgIHRoaXMuX19nZXRBbGxJbmNsdWRlcyhpbmNsdWRlcywgdGFyZ2V0U2V0LCB0YXJnZXQuSU1QTC5nZXRMaWJyYXJpZXMoKSk7XG4gICAgcmV0dXJuIGluY2x1ZGVzO1xuICB9XG5cbiAgcHJpdmF0ZSBfX2dldEFsbEhlYWRlcnMoaGVhZGVyczogc3RyaW5nW10sIHRhcmdldFNldDogU2V0PHN0cmluZz4sIGxpc3Q6IEFycmF5PEFic29sdXRlUGF0aCB8IEludGVyZmFjZUluY2x1ZGVzPiB8IEFycmF5PFVzZXJJbmRpcmVjdFRhcmdldD4pIHtcbiAgICBmb3IgKGNvbnN0IGl0ZXIgb2YgbGlzdCkge1xuICAgICAgaWYgKGl0ZXIgaW5zdGFuY2VvZiBJbnRlcmZhY2VJbmNsdWRlcyB8fCBpdGVyIGluc3RhbmNlb2YgVXNlckluZGlyZWN0VGFyZ2V0KSB7XG4gICAgICAgIGlmICghdGFyZ2V0U2V0LmhhcyhpdGVyLnRhcmdldE5hbWUpKSB7XG4gICAgICAgICAgdGFyZ2V0U2V0LmFkZChpdGVyLnRhcmdldE5hbWUpO1xuICAgICAgICAgIGNvbnN0IHRhcmdldCA9IHRoaXMuZ2V0KGl0ZXIudGFyZ2V0TmFtZSk7XG4gICAgICAgICAgZm9yIChjb25zdCBoZWFkZXIgb2YgdGFyZ2V0LklNUEwuZ2V0SGVhZGVycygpLm1hcCgoaTogYW55KSA9PiBpLkZJTEUudG9TdHJpbmcoKSkpIHtcbiAgICAgICAgICAgIGlmICghaGVhZGVycy5pbmNsdWRlcyhoZWFkZXIudG9TdHJpbmcoKSkpXG4gICAgICAgICAgICAgIGhlYWRlcnMucHVzaChoZWFkZXIudG9TdHJpbmcoKSk7XG4gICAgICAgICAgfVxuICAgICAgICAgIHRoaXMuX19nZXRBbGxIZWFkZXJzKGhlYWRlcnMsIHRhcmdldFNldCwgdGFyZ2V0LklNUEwuZ2V0UHVibGljSW5jbHVkZXMoKSk7XG4gICAgICAgICAgdGhpcy5fX2dldEFsbEhlYWRlcnMoaGVhZGVycywgdGFyZ2V0U2V0LCB0YXJnZXQuSU1QTC5nZXRQdWJsaWNMaWJyYXJpZXMoKSk7XG4gICAgICAgIH1cbiAgICAgIH1cbiAgICB9XG4gIH1cblxuICBwdWJsaWMgYWxsSGVhZGVyc09mKHBhcmFtczogc3RyaW5nIHwgQmFzZVRhcmdldCkge1xuICAgIGNvbnN0IHRhcmdldCA9ICh0eXBlb2YgcGFyYW1zID09PSBcInN0cmluZ1wiKSA/IHRoaXMuZ2V0KHBhcmFtcykgOiBwYXJhbXM7XG4gICAgY29uc3QgaGVhZGVycyA9IHRhcmdldC5JTVBMLmdldEhlYWRlcnMoKS5tYXAoKGk6IGFueSkgPT4gaS5GSUxFLnRvU3RyaW5nKCkpO1xuICAgIGNvbnN0IHRhcmdldFNldCA9IG5ldyBTZXQoWyB0YXJnZXQuSU1QTC5uYW1lIF0pO1xuICAgIHRoaXMuX19nZXRBbGxIZWFkZXJzKGhlYWRlcnMsIHRhcmdldFNldCwgdGFyZ2V0LklNUEwuZ2V0SW5jbHVkZXMoKSk7XG4gICAgdGhpcy5fX2dldEFsbEhlYWRlcnMoaGVhZGVycywgdGFyZ2V0U2V0LCB0YXJnZXQuSU1QTC5nZXRMaWJyYXJpZXMoKSk7XG4gICAgcmV0dXJuIGhlYWRlcnM7XG4gIH1cblxuICBwcml2YXRlIF9fZ2V0QWxsTGlicmFyaWVzKGxpYnJhcmllczogc3RyaW5nW10sIHRhcmdldFNldDogU2V0PHN0cmluZz4sIGxpc3Q6IEFycmF5PFVzZXJJbmRpcmVjdFRhcmdldD4pIHtcbiAgICBmb3IgKGNvbnN0IGl0ZXIgb2YgbGlzdCkge1xuICAgICAgY29uc29sZS5hc3NlcnQoaXRlciBpbnN0YW5jZW9mIFVzZXJJbmRpcmVjdFRhcmdldCk7XG4gICAgICBpZiAoIXRhcmdldFNldC5oYXMoaXRlci50YXJnZXROYW1lKSkge1xuICAgICAgICB0YXJnZXRTZXQuYWRkKGl0ZXIudGFyZ2V0TmFtZSk7XG4gICAgICAgIGNvbnN0IHRhcmdldCA9IHRoaXMuZ2V0KGl0ZXIudGFyZ2V0TmFtZSk7XG4gICAgICAgIGxpYnJhcmllcy5wdXNoKHRhcmdldC5GSUxFLnRvU3RyaW5nKCkpO1xuICAgICAgICB0aGlzLl9fZ2V0QWxsTGlicmFyaWVzKGxpYnJhcmllcywgdGFyZ2V0U2V0LCB0YXJnZXQuSU1QTC5nZXRQdWJsaWNMaWJyYXJpZXMoKSk7XG4gICAgICB9XG4gICAgfVxuICB9XG5cbiAgcHVibGljIGFsbExpYnJhcmllc09mKHBhcmFtczogc3RyaW5nIHwgQmFzZVRhcmdldCkge1xuICAgIGNvbnN0IHRhcmdldCA9ICh0eXBlb2YgcGFyYW1zID09PSBcInN0cmluZ1wiKSA/IHRoaXMuZ2V0KHBhcmFtcykgOiBwYXJhbXM7XG4gICAgY29uc3QgbGlicmFyaWVzOiBzdHJpbmdbXSA9IFtdO1xuICAgIGNvbnN0IHRhcmdldFNldCA9IG5ldyBTZXQoWyB0YXJnZXQuSU1QTC5uYW1lIF0pO1xuICAgIHRoaXMuX19nZXRBbGxMaWJyYXJpZXMobGlicmFyaWVzLCB0YXJnZXRTZXQsIHRhcmdldC5JTVBMLmdldExpYnJhcmllcygpKTtcbiAgICByZXR1cm4gbGlicmFyaWVzO1xuICB9XG5cbiAgcHJpdmF0ZSBfX2dldEFsbERlZmluaXRpb25zKGRlZmluaXRpb25zOiBzdHJpbmdbXSwgdGFyZ2V0U2V0OiBTZXQ8c3RyaW5nPiwgbGlzdDogQXJyYXk8c3RyaW5nPiB8IEFycmF5PFVzZXJJbmRpcmVjdFRhcmdldD4pIHtcbiAgICBmb3IgKGNvbnN0IGl0ZXIgb2YgbGlzdCkge1xuICAgICAgaWYgKGl0ZXIgaW5zdGFuY2VvZiBVc2VySW5kaXJlY3RUYXJnZXQpIHtcbiAgICAgICAgaWYgKCF0YXJnZXRTZXQuaGFzKGl0ZXIudGFyZ2V0TmFtZSkpIHtcbiAgICAgICAgICB0YXJnZXRTZXQuYWRkKGl0ZXIudGFyZ2V0TmFtZSk7XG4gICAgICAgICAgY29uc3QgdGFyZ2V0ID0gdGhpcy5nZXQoaXRlci50YXJnZXROYW1lKTtcbiAgICAgICAgICB0aGlzLl9fZ2V0QWxsRGVmaW5pdGlvbnMoZGVmaW5pdGlvbnMsIHRhcmdldFNldCwgdGFyZ2V0LklNUEwuZ2V0UHVibGljRGVmaW5pdGlvbnMoKSk7XG4gICAgICAgICAgdGhpcy5fX2dldEFsbERlZmluaXRpb25zKGRlZmluaXRpb25zLCB0YXJnZXRTZXQsIHRhcmdldC5JTVBMLmdldFB1YmxpY0xpYnJhcmllcygpKTtcbiAgICAgICAgfVxuICAgICAgfVxuICAgICAgZWxzZSBpZiAodHlwZW9mIGl0ZXIgPT09IFwic3RyaW5nXCIpIHtcbiAgICAgICAgaWYgKCFkZWZpbml0aW9ucy5pbmNsdWRlcyhpdGVyKSlcbiAgICAgICAgICBkZWZpbml0aW9ucy5wdXNoKGl0ZXIpO1xuICAgICAgfVxuICAgICAgZWxzZSB7XG4gICAgICAgIHRocm93IG5ldyBFcnJvcihgTm90IHN1cHBvcnQgaW5zdGFuY2UgJHtpdGVyfWApO1xuICAgICAgfVxuICAgIH1cbiAgfVxuXG4gIHB1YmxpYyBhbGxEZWZpbml0aW9uc09mKHBhcmFtczogc3RyaW5nIHwgQmFzZVRhcmdldCkge1xuICAgIGNvbnN0IHRhcmdldCA9ICh0eXBlb2YgcGFyYW1zID09PSBcInN0cmluZ1wiKSA/IHRoaXMuZ2V0KHBhcmFtcykgOiBwYXJhbXM7XG4gICAgY29uc3QgZGVmaW5pdGlvbnM6IHN0cmluZ1tdID0gW107XG4gICAgY29uc3QgdGFyZ2V0U2V0ID0gbmV3IFNldChbIHRhcmdldC5JTVBMLm5hbWUgXSk7XG4gICAgdGhpcy5fX2dldEFsbERlZmluaXRpb25zKGRlZmluaXRpb25zLCB0YXJnZXRTZXQsIHRhcmdldC5JTVBMLmdldERlZmluaXRpb25zKCkpO1xuICAgIHRoaXMuX19nZXRBbGxEZWZpbml0aW9ucyhkZWZpbml0aW9ucywgdGFyZ2V0U2V0LCB0YXJnZXQuSU1QTC5nZXRQdWJsaWNMaWJyYXJpZXMoKSk7XG4gICAgcmV0dXJuIGRlZmluaXRpb25zO1xuICB9XG5cbiAgcHJpdmF0ZSBfX2dldEFsbENvbXBpbGVPcHRpb25zKG9wdGlvbnM6IEFycmF5PHN0cmluZ3xzdHJpbmdbXT4sIHRhcmdldFNldDogU2V0PHN0cmluZz4sIGxpc3Q6IEFycmF5PHN0cmluZ3xzdHJpbmdbXT4gfCBBcnJheTxVc2VySW5kaXJlY3RUYXJnZXQ+KSB7XG4gICAgZm9yIChjb25zdCBpdGVyIG9mIGxpc3QpIHtcbiAgICAgIGlmIChpdGVyIGluc3RhbmNlb2YgVXNlckluZGlyZWN0VGFyZ2V0KSB7XG4gICAgICAgIGlmICghdGFyZ2V0U2V0LmhhcyhpdGVyLnRhcmdldE5hbWUpKSB7XG4gICAgICAgICAgdGFyZ2V0U2V0LmFkZChpdGVyLnRhcmdldE5hbWUpO1xuICAgICAgICAgIGNvbnN0IHRhcmdldCA9IHRoaXMuZ2V0KGl0ZXIudGFyZ2V0TmFtZSk7XG4gICAgICAgICAgdGhpcy5fX2dldEFsbENvbXBpbGVPcHRpb25zKG9wdGlvbnMsIHRhcmdldFNldCwgdGFyZ2V0LklNUEwuZ2V0UHVibGljQ29tcGlsZU9wdGlvbnMoKSk7XG4gICAgICAgICAgdGhpcy5fX2dldEFsbENvbXBpbGVPcHRpb25zKG9wdGlvbnMsIHRhcmdldFNldCwgdGFyZ2V0LklNUEwuZ2V0UHVibGljTGlicmFyaWVzKCkpO1xuICAgICAgICB9XG4gICAgICB9XG4gICAgICBlbHNlIGlmICh0eXBlb2YgaXRlciA9PT0gXCJzdHJpbmdcIikge1xuICAgICAgICBpZiAoIW9wdGlvbnMuaW5jbHVkZXMoaXRlcikpXG4gICAgICAgICAgb3B0aW9ucy5wdXNoKGl0ZXIpO1xuICAgICAgfVxuICAgICAgZWxzZSBpZiAoQXJyYXkuaXNBcnJheShpdGVyKSkge1xuICAgICAgICAvLyBUT0RPOiBBZGQgY29tcGFyZSBmb3Igc2FtZSBhcnJheSBpbiBvcHRpb25zXG4gICAgICAgIG9wdGlvbnMucHVzaChpdGVyKTtcbiAgICAgIH1cbiAgICAgIGVsc2Uge1xuICAgICAgICB0aHJvdyBuZXcgRXJyb3IoYE5vdCBzdXBwb3J0IGluc3RhbmNlICR7aXRlcn1gKTtcbiAgICAgIH1cbiAgICB9XG4gIH1cblxuICBwdWJsaWMgYWxsQ29tcGlsZU9wdGlvbnNPZihwYXJhbXM6IHN0cmluZyB8IEJhc2VUYXJnZXQpIHtcbiAgICBjb25zdCB0YXJnZXQgPSAodHlwZW9mIHBhcmFtcyA9PT0gXCJzdHJpbmdcIikgPyB0aGlzLmdldChwYXJhbXMpIDogcGFyYW1zO1xuICAgIGNvbnN0IG9wdGlvbnM6IHN0cmluZ1tdID0gW107XG4gICAgY29uc3QgdGFyZ2V0U2V0ID0gbmV3IFNldChbIHRhcmdldC5JTVBMLm5hbWUgXSk7XG4gICAgdGhpcy5fX2dldEFsbENvbXBpbGVPcHRpb25zKG9wdGlvbnMsIHRhcmdldFNldCwgdGFyZ2V0LklNUEwuZ2V0Q29tcGlsZU9wdGlvbnMoKSk7XG4gICAgdGhpcy5fX2dldEFsbENvbXBpbGVPcHRpb25zKG9wdGlvbnMsIHRhcmdldFNldCwgdGFyZ2V0LklNUEwuZ2V0UHVibGljTGlicmFyaWVzKCkpO1xuICAgIHJldHVybiBvcHRpb25zLmZsYXQoKTtcbiAgfVxuXG4gIHByaXZhdGUgX19nZXRMaW5rT3B0aW9ucyhvcHRpb25zOiBBcnJheTxzdHJpbmd8c3RyaW5nW10+LCB0YXJnZXRTZXQ6IFNldDxzdHJpbmc+LCBsaXN0OiBBcnJheTxzdHJpbmd8c3RyaW5nW10+IHwgQXJyYXk8VXNlckluZGlyZWN0VGFyZ2V0Pikge1xuICAgIGZvciAoY29uc3QgaXRlciBvZiBsaXN0KSB7XG4gICAgICBpZiAoaXRlciBpbnN0YW5jZW9mIFVzZXJJbmRpcmVjdFRhcmdldCkge1xuICAgICAgICBpZiAoIXRhcmdldFNldC5oYXMoaXRlci50YXJnZXROYW1lKSkge1xuICAgICAgICAgIHRhcmdldFNldC5hZGQoaXRlci50YXJnZXROYW1lKTtcbiAgICAgICAgICBjb25zdCB0YXJnZXQgPSB0aGlzLmdldChpdGVyLnRhcmdldE5hbWUpO1xuICAgICAgICAgIHRoaXMuX19nZXRMaW5rT3B0aW9ucyhvcHRpb25zLCB0YXJnZXRTZXQsIHRhcmdldC5JTVBMLmdldFB1YmxpY0xpbmtPcHRpb25zKCkpO1xuICAgICAgICAgIHRoaXMuX19nZXRMaW5rT3B0aW9ucyhvcHRpb25zLCB0YXJnZXRTZXQsIHRhcmdldC5JTVBMLmdldFB1YmxpY0xpYnJhcmllcygpKTtcbiAgICAgICAgfVxuICAgICAgfVxuICAgICAgZWxzZSBpZiAodHlwZW9mIGl0ZXIgPT09IFwic3RyaW5nXCIpIHtcbiAgICAgICAgaWYgKCFvcHRpb25zLmluY2x1ZGVzKGl0ZXIpKVxuICAgICAgICAgIG9wdGlvbnMucHVzaChpdGVyKTtcbiAgICAgIH1cbiAgICAgIGVsc2UgaWYgKEFycmF5LmlzQXJyYXkoaXRlcikpIHtcbiAgICAgICAgLy8gVE9ETzogQWRkIGNvbXBhcmUgZm9yIHNhbWUgYXJyYXkgaW4gb3B0aW9uc1xuICAgICAgICBvcHRpb25zLnB1c2goaXRlcik7XG4gICAgICB9XG4gICAgICBlbHNlIHtcbiAgICAgICAgdGhyb3cgbmV3IEVycm9yKGBOb3Qgc3VwcG9ydCBpbnN0YW5jZSAke2l0ZXJ9YCk7XG4gICAgICB9XG4gICAgfVxuICB9XG5cbiAgcHVibGljIGFsbExpbmtPcHRpb25zT2YocGFyYW1zOiBzdHJpbmcgfCBCYXNlVGFyZ2V0KSB7XG4gICAgY29uc3QgdGFyZ2V0ID0gKHR5cGVvZiBwYXJhbXMgPT09IFwic3RyaW5nXCIpID8gdGhpcy5nZXQocGFyYW1zKSA6IHBhcmFtcztcbiAgICBjb25zdCBvcHRpb25zOiBzdHJpbmdbXSA9IFtdO1xuICAgIGNvbnN0IHRhcmdldFNldCA9IG5ldyBTZXQoWyB0YXJnZXQuSU1QTC5uYW1lIF0pO1xuICAgIHRoaXMuX19nZXRMaW5rT3B0aW9ucyhvcHRpb25zLCB0YXJnZXRTZXQsIHRhcmdldC5JTVBMLmdldExpbmtPcHRpb25zKCkpO1xuICAgIHRoaXMuX19nZXRMaW5rT3B0aW9ucyhvcHRpb25zLCB0YXJnZXRTZXQsIHRhcmdldC5JTVBMLmdldFB1YmxpY0xpYnJhcmllcygpKTtcbiAgICByZXR1cm4gb3B0aW9ucy5mbGF0KCk7XG4gIH1cbn1cbiIsIi8qXG4gKiBNSVQgTGljZW5zZVxuICpcbiAqIENvcHlyaWdodCAoYykgMjAyNSAgWXVyaWkgWWFrdWJpbiAoeXVyaWkueWFrdWJpbkBnbWFpbC5jb20pXG4gKlxuICogUGVybWlzc2lvbiBpcyBncmFudGVkIHRvIHVzZSwgY29weSwgbW9kaWZ5LCBhbmQgZGlzdHJpYnV0ZSB0aGlzIHNvZnR3YXJlXG4gKiB1bmRlciB0aGUgTUlUIExpY2Vuc2UuIFNlZSBMSUNFTlNFIGZpbGUgZm9yIGRldGFpbHMuXG4gKi9cblxuaW1wb3J0IHsgQWJzb2x1dGVQYXRoIH0gZnJvbSBcIkAvY29yZS9BYnNvbHV0ZVBhdGhcIjtcbmltcG9ydCB7IEludGVyZmFjZUluY2x1ZGVzIH0gZnJvbSBcIkAvY29yZS9JbnRlcmZhY2VJbmNsdWRlc1wiO1xuaW1wb3J0IHsgSW50ZXJmYWNlT2JqZWN0cyB9IGZyb20gXCJAL2NvcmUvSW50ZXJmYWNlT2JqZWN0c1wiO1xuaW1wb3J0IHsgVXNlckluZGlyZWN0VGFyZ2V0IH0gZnJvbSBcIkAvY29yZS9UYXJnZXRcIjtcbmltcG9ydCB7IFNvdXJjZUZpbGUgfSBmcm9tIFwiQC9jb3JlL1NvdXJjZUZpbGVcIjtcblxuZXhwb3J0IGVudW0gVGFyZ2V0VHlwZSB7XG4gIFVua25vd24gPSBcIlVua25vd25cIixcbiAgU3RhdGljTGlicmFyeSA9IFwiU3RhdGljTGlicmFyeVwiLFxuICBTaGFyZWRMaWJyYXJ5ID0gXCJTaGFyZWRMaWJyYXJ5XCIsXG4gIE9iamVjdExpYnJhcnkgPSBcIk9iamVjdExpYnJhcnlcIixcbiAgRXhlY3V0YWJsZSA9IFwiRXhlY3V0YWJsZVwiLFxufTtcblxuY29uc3QgRlVOQyA9IFN5bWJvbChcIkZVTkNcIik7XG5cbmV4cG9ydCBjbGFzcyBMaXZlU3RyaW5nIHtcbiAgcHJpdmF0ZSBbRlVOQ106ICgpID0+IHN0cmluZztcblxuICBwcml2YXRlIGNvbnN0cnVjdG9yKGZ1bmM6ICgpID0+IHN0cmluZykge1xuICAgIHRoaXNbRlVOQ10gPSBmdW5jO1xuICB9XG5cbiAgcHVibGljIHN0YXRpYyBjcmVhdGUoZnVuYzogKCkgPT4gc3RyaW5nKSB7XG4gICAgcmV0dXJuIE9iamVjdC5zZWFsKG5ldyBMaXZlU3RyaW5nKGZ1bmMpKTtcbiAgfVxuXG4gIHRvU3RyaW5nKCk6IHN0cmluZyB7XG4gICAgcmV0dXJuIHRoaXNbRlVOQ10oKTtcbiAgfVxufTtcblxuZXhwb3J0IGNsYXNzIFRhcmdldEZpbGUge1xuICBwcml2YXRlIF9maWxlRGlyPzogQWJzb2x1dGVQYXRoXG5cbiAgcHJpdmF0ZSBfcHJlZml4ID0gXCJcIjtcbiAgcHJpdmF0ZSBfb3V0cHV0TmFtZSA9IFwiXCI7XG4gIHByaXZhdGUgX3N1ZmZpeCA9IFwiXCI7XG5cbiAgcHJpdmF0ZSBjb25zdHJ1Y3RvcigpIHtcbiAgfVxuXG4gIHB1YmxpYyBzdGF0aWMgY3JlYXRlKCk6IFRhcmdldEZpbGUge1xuICAgIHJldHVybiBPYmplY3Quc2VhbChuZXcgVGFyZ2V0RmlsZSk7XG4gIH1cblxuICBwdWJsaWMgZ2V0IHByZWZpeCgpOiBzdHJpbmcge1xuICAgIHJldHVybiB0aGlzLl9wcmVmaXg7XG4gIH1cblxuICBwdWJsaWMgc2V0UHJlZml4KHZhbHVlOiBzdHJpbmcpIHtcbiAgICB0aGlzLl9wcmVmaXggPSB2YWx1ZTtcbiAgfVxuXG4gIHB1YmxpYyBnZXQgb3V0cHV0TmFtZSgpOiBzdHJpbmcge1xuICAgIHJldHVybiB0aGlzLl9vdXRwdXROYW1lO1xuICB9XG5cbiAgcHVibGljIHNldE91dHB1dE5hbWUodmFsdWU6IHN0cmluZykge1xuICAgIHRoaXMuX291dHB1dE5hbWUgPSB2YWx1ZTtcbiAgfVxuXG4gIHB1YmxpYyBnZXQgc3VmZml4KCk6IHN0cmluZyB7XG4gICAgcmV0dXJuIHRoaXMuX3N1ZmZpeDtcbiAgfVxuXG4gIHB1YmxpYyBzZXRTdWZmaXgodmFsdWU6IHN0cmluZykge1xuICAgIHRoaXMuX3N1ZmZpeCA9IHZhbHVlO1xuICB9XG5cbiAgcHVibGljIGdldCBmaWxlTmFtZSgpOiBzdHJpbmcgfCB1bmRlZmluZWQge1xuICAgIGlmICh0aGlzLnByZWZpeCA9PT0gdW5kZWZpbmVkIHx8IHRoaXMub3V0cHV0TmFtZSA9PT0gdW5kZWZpbmVkIHx8IHRoaXMuc3VmZml4ID09PSB1bmRlZmluZWQpXG4gICAgICByZXR1cm4gdW5kZWZpbmVkO1xuICAgIHJldHVybiB0aGlzLnByZWZpeCArIHRoaXMub3V0cHV0TmFtZSArIHRoaXMuc3VmZml4O1xuICB9XG5cbiAgcHVibGljIGdldCBmaWxlRGlyKCk6IEFic29sdXRlUGF0aCB8IHVuZGVmaW5lZCB7XG4gICAgcmV0dXJuIHRoaXMuX2ZpbGVEaXI7XG4gIH1cblxuICBwdWJsaWMgc2V0IGZpbGVEaXIodmFsdWU6IEFic29sdXRlUGF0aCkge1xuICAgIHRoaXMuX2ZpbGVEaXIgPSB2YWx1ZTtcbiAgfVxuXG4gIHB1YmxpYyBnZXQgZmlsZSgpOiBBYnNvbHV0ZVBhdGggfCB1bmRlZmluZWQge1xuICAgIGNvbnN0IGZpbGVEaXIgPSB0aGlzLmZpbGVEaXI7XG4gICAgaWYgKGZpbGVEaXIgPT09IHVuZGVmaW5lZClcbiAgICAgIHJldHVybiB1bmRlZmluZWQ7XG4gICAgY29uc3QgZmlsZU5hbWUgPSB0aGlzLmZpbGVOYW1lO1xuICAgIGlmIChmaWxlTmFtZSA9PT0gdW5kZWZpbmVkKVxuICAgICAgcmV0dXJuIHVuZGVmaW5lZDtcbiAgICByZXR1cm4gZmlsZURpci5qb2luKGZpbGVOYW1lKTtcbiAgfVxuXG4gIHB1YmxpYyB0b1N0cmluZygpOiBzdHJpbmcge1xuICAgIGNvbnN0IGZpbGUgPSB0aGlzLmZpbGU7XG4gICAgcmV0dXJuIGZpbGUgPyBmaWxlLnRvU3RyaW5nKCkgOiBcIlwiO1xuICB9XG5cbiAgcHVibGljIHRvSlNPTigpOiBvYmplY3Qge1xuICAgIHJldHVybiB7XG4gICAgICBvdXRwdXROYW1lOiB0aGlzLm91dHB1dE5hbWUsXG4gICAgICBwcmVmaXg6IHRoaXMucHJlZml4LFxuICAgICAgc3VmZml4OiB0aGlzLnN1ZmZpeCxcbiAgICAgIGZpbGVEaXI6IHRoaXMuZmlsZURpcixcbiAgICAgIGZpbGVOYW1lOiB0aGlzLmZpbGVOYW1lLFxuICAgICAgZmlsZTogdGhpcy5maWxlLFxuICAgIH1cbiAgfVxufTtcblxuZXhwb3J0IGludGVyZmFjZSBUYXJnZXRDb21tYW5kIHtcbiAgY29tbWFuZDogc3RyaW5nIHwgTGl2ZVN0cmluZztcbiAgYXJnczogQXJyYXk8c3RyaW5nIHwgTGl2ZVN0cmluZz47XG59O1xuXG5mdW5jdGlvbiBtYWtlVGFyZ2V0Q29tbWFuZChfY29tbWFuZDogYW55LCBfYXJnczogYW55W10pOiBUYXJnZXRDb21tYW5kIHtcbiAgbGV0IGNvbW1hbmQ6IHN0cmluZyB8IExpdmVTdHJpbmc7XG4gIGlmICh0eXBlb2YgX2NvbW1hbmQgPT09IFwic3RyaW5nXCIpXG4gICAgY29tbWFuZCA9IF9jb21tYW5kO1xuICBlbHNlIGlmIChfY29tbWFuZCBpbnN0YW5jZW9mIExpdmVTdHJpbmcpXG4gICAgY29tbWFuZCA9IF9jb21tYW5kO1xuICBlbHNlIGlmIChfY29tbWFuZCBpbnN0YW5jZW9mIEFic29sdXRlUGF0aClcbiAgICBjb21tYW5kID0gX2NvbW1hbmQudG9TdHJpbmcoKTtcbiAgZWxzZVxuICAgIHRocm93IG5ldyBUeXBlRXJyb3IoYFdyb25nIHR5cGUgJHtfY29tbWFuZH0gZm9yIGNvbW1hbmRgKTtcblxuICBjb25zdCBhcmdzID0gbmV3IEFycmF5PHN0cmluZyB8IExpdmVTdHJpbmc+O1xuICBmb3IgKGNvbnN0IGl0ZXIgb2YgX2FyZ3MpIHtcbiAgICBpZiAodHlwZW9mIGl0ZXIgPT09IFwic3RyaW5nXCIpXG4gICAgICBhcmdzLnB1c2goaXRlcik7XG4gICAgZWxzZSBpZiAoaXRlciBpbnN0YW5jZW9mIExpdmVTdHJpbmcpXG4gICAgICBhcmdzLnB1c2goaXRlcik7XG4gICAgZWxzZSBpZiAoaXRlciBpbnN0YW5jZW9mIEFic29sdXRlUGF0aClcbiAgICAgIGFyZ3MucHVzaChpdGVyLnRvU3RyaW5nKCkpO1xuICAgIGVsc2UgaWYgKGl0ZXIgaW5zdGFuY2VvZiBBYnNvbHV0ZVBhdGgpXG4gICAgICBhcmdzLnB1c2goaXRlci50b1N0cmluZygpKTtcbiAgICBlbHNlXG4gICAgICB0aHJvdyBuZXcgVHlwZUVycm9yKGBXcm9uZyB0eXBlICR7aXRlcn0gZm9yIGFyZ3VtZW50YCk7XG4gIH1cblxuICByZXR1cm4geyBjb21tYW5kLCBhcmdzIH07XG59XG5cbnR5cGUgVGFyZ2V0SXRlbU9yaWdpbiA9IFwiaW5pdGlhbGl6ZVwiIHwgXCJpbmRpcmVjdGx5XCIgfCBcImRpcmVjdGx5XCI7XG5cbmludGVyZmFjZSBUYXJnZXRJdGVtPFQ+IHtcbiAgb3JpZ2luOiBUYXJnZXRJdGVtT3JpZ2luO1xuICB2YWx1ZTogVDtcbiAgcHVibGljT25seTogYm9vbGVhbjtcbn07XG5cbmNsYXNzIFRhcmdldEl0ZW1zPFQ+IHtcbiAgcHJpdmF0ZSBfaXRlbXMgPSBuZXcgQXJyYXk8VGFyZ2V0SXRlbTxUPj4oKTtcblxuICBwdWJsaWMgYWRkSXRlbShvcmlnaW46IFRhcmdldEl0ZW1PcmlnaW4sIHB1YmxpY09ubHk6IGJvb2xlYW4sIHZhbHVlOiBUKSB7XG4gICAgdGhpcy5faXRlbXMucHVzaCh7IG9yaWdpbiwgcHVibGljT25seSwgdmFsdWUgfSk7XG4gIH1cblxuICBwdWJsaWMgZ2V0SXRlbXMoKTogQXJyYXk8VD4ge1xuICAgIGNvbnN0IGZpcnN0TGlzdCA9IG5ldyBBcnJheTxUPigpO1xuICAgIGNvbnN0IGxhc3RMaXN0ID0gbmV3IEFycmF5PFQ+KCk7XG4gICAgZm9yIChjb25zdCBpdGVyIG9mIHRoaXMuX2l0ZW1zKSB7XG4gICAgICBpZiAoaXRlci5vcmlnaW4gIT09IFwiaW5kaXJlY3RseVwiKVxuICAgICAgICBmaXJzdExpc3QucHVzaChpdGVyLnZhbHVlKTtcbiAgICAgIGVsc2VcbiAgICAgICAgbGFzdExpc3QucHVzaChpdGVyLnZhbHVlKTtcbiAgICB9XG4gICAgcmV0dXJuIGZpcnN0TGlzdC5jb25jYXQobGFzdExpc3QpO1xuICB9XG5cbiAgcHVibGljIGdldFB1YmxpY0l0ZW1zKCk6IEFycmF5PFQ+IHtcbiAgICBjb25zdCBmaXJzdExpc3QgPSBuZXcgQXJyYXk8VD4oKTtcbiAgICBjb25zdCBsYXN0TGlzdCA9IG5ldyBBcnJheTxUPigpO1xuICAgIGZvciAoY29uc3QgaXRlciBvZiB0aGlzLl9pdGVtcykge1xuICAgICAgaWYgKCFpdGVyLnB1YmxpY09ubHkpXG4gICAgICAgIGNvbnRpbnVlO1xuICAgICAgaWYgKGl0ZXIub3JpZ2luICE9PSBcImluZGlyZWN0bHlcIilcbiAgICAgICAgZmlyc3RMaXN0LnB1c2goaXRlci52YWx1ZSk7XG4gICAgICBlbHNlXG4gICAgICAgIGxhc3RMaXN0LnB1c2goaXRlci52YWx1ZSk7XG4gICAgfVxuICAgIHJldHVybiBmaXJzdExpc3QuY29uY2F0KGxhc3RMaXN0KTtcbiAgfVxuXG4gIGdldCBpdGVtcygpIHtcbiAgICByZXR1cm4gdGhpcy5faXRlbXM7XG4gIH1cblxuICBwdWJsaWMgdG9KU09OKCk6IG9iamVjdCB7XG4gICAgcmV0dXJuIHRoaXMuX2l0ZW1zO1xuICB9XG59O1xuXG5leHBvcnQgY2xhc3MgVGFyZ2V0U3RydWN0IHtcbiAgcHJpdmF0ZSBfbmFtZTogc3RyaW5nO1xuICBwcml2YXRlIF90eXBlOiBUYXJnZXRUeXBlO1xuICBwcml2YXRlIF90YXJnZXRGaWxlOiBUYXJnZXRGaWxlO1xuICBwcml2YXRlIF9wcmVCdWlsZExpc3QgPSBuZXcgQXJyYXk8VGFyZ2V0Q29tbWFuZD47XG4gIHByaXZhdGUgX3Bvc3RCdWlsZExpc3QgPSBuZXcgQXJyYXk8VGFyZ2V0Q29tbWFuZD47XG4gIHByaXZhdGUgX2RlZmluZXMgPSBuZXcgVGFyZ2V0SXRlbXM8c3RyaW5nPjtcbiAgcHJpdmF0ZSBfaW5jbHVkZXMgPSBuZXcgVGFyZ2V0SXRlbXM8QWJzb2x1dGVQYXRoIHwgSW50ZXJmYWNlSW5jbHVkZXM+O1xuICBwcml2YXRlIF9jb21waWxlT3B0aW9ucyA9IG5ldyBUYXJnZXRJdGVtczxzdHJpbmcgfCBzdHJpbmdbXT47XG4gIHByaXZhdGUgX2xpbmtPcHRpb25zID0gbmV3IFRhcmdldEl0ZW1zPHN0cmluZyB8IHN0cmluZ1tdPjtcbiAgcHJpdmF0ZSBfc291cmNlcyA9IG5ldyBUYXJnZXRJdGVtczxJbnRlcmZhY2VPYmplY3RzIHwgU291cmNlRmlsZT47XG4gIHByaXZhdGUgX2xpYnJhcmllcyA9IG5ldyBUYXJnZXRJdGVtczxVc2VySW5kaXJlY3RUYXJnZXQ+O1xuICBwcml2YXRlIF9wb3NpdGlvbkluZGVwZW5kZW50Q29kZSA9IGZhbHNlO1xuXG4gIGNvbnN0cnVjdG9yKG5hbWU6IHN0cmluZykge1xuICAgIHRoaXMuX25hbWUgPSBuYW1lO1xuICAgIHRoaXMuX3R5cGUgPSBUYXJnZXRUeXBlLlVua25vd247XG4gICAgdGhpcy5fdGFyZ2V0RmlsZSA9IFRhcmdldEZpbGUuY3JlYXRlKCk7XG4gIH1cblxuICBwdWJsaWMgZ2V0IG5hbWUoKSB7XG4gICAgcmV0dXJuIHRoaXMuX25hbWU7XG4gIH1cblxuICBwdWJsaWMgZ2V0IHR5cGUoKSB7XG4gICAgcmV0dXJuIHRoaXMuX3R5cGU7XG4gIH1cblxuICBwdWJsaWMgc2V0IHR5cGUodmFsdWU6IFRhcmdldFR5cGUpIHtcbiAgICBpZiAodGhpcy5fdHlwZSA9PT0gdmFsdWUpXG4gICAgICByZXR1cm47XG4gICAgaWYgKHRoaXMuX3R5cGUgIT09IFRhcmdldFR5cGUuVW5rbm93bilcbiAgICAgIHRocm93IG5ldyBFcnJvcihgJHt0aGlzLl90eXBlfSBcIiR7dGhpcy5fbmFtZX1cIiB0YXJnZXQgY2Fubm90IGJlIGNoYW5nZSB0byAke3ZhbHVlfWApO1xuICAgIHRoaXMuX3R5cGUgPSB2YWx1ZTtcbiAgfVxuXG4gIHB1YmxpYyBnZXQgdGFyZ2V0RmlsZSgpIHtcbiAgICByZXR1cm4gdGhpcy5fdGFyZ2V0RmlsZTtcbiAgfVxuXG4gIHB1YmxpYyBnZXQgcG9zaXRpb25JbmRlcGVuZGVudENvZGUoKSB7XG4gICAgcmV0dXJuIHRoaXMuX3Bvc2l0aW9uSW5kZXBlbmRlbnRDb2RlO1xuICB9XG5cbiAgcHVibGljIHNldFBvc2l0aW9uSW5kZXBlbmRlbnRDb2RlKHZhbHVlOiBib29sZWFuKSB7XG4gICAgdGhpcy5fcG9zaXRpb25JbmRlcGVuZGVudENvZGUgPSB2YWx1ZTtcbiAgfVxuXG4gIHB1YmxpYyBhZGRQcmVCdWlsZChjb21tYW5kOiBhbnksIGFyZ3M6IGFueVtdKSB7XG4gICAgdGhpcy5fcHJlQnVpbGRMaXN0LnB1c2gobWFrZVRhcmdldENvbW1hbmQoY29tbWFuZCwgYXJncykpO1xuICB9XG5cbiAgcHVibGljIGFkZFBvc3RCdWlsZChjb21tYW5kOiBhbnksIGFyZ3M6IGFueVtdKSB7XG4gICAgdGhpcy5fcG9zdEJ1aWxkTGlzdC5wdXNoKG1ha2VUYXJnZXRDb21tYW5kKGNvbW1hbmQsIGFyZ3MpKTtcbiAgfVxuXG4gIHB1YmxpYyBnZXQgcHJlQnVpbGRMaXN0KCkge1xuICAgIHJldHVybiB0aGlzLl9wcmVCdWlsZExpc3Q7XG4gIH1cblxuICBwdWJsaWMgZ2V0IHBvc3RCdWlsZExpc3QoKSB7XG4gICAgcmV0dXJuIHRoaXMuX3Bvc3RCdWlsZExpc3Q7XG4gIH1cblxuICBwdWJsaWMgYWRkQ29tcGlsZU9wdGlvbihvcmlnaW46IFRhcmdldEl0ZW1PcmlnaW4sIHB1YmxpY09ubHk6IGJvb2xlYW4sIHZhbHVlOiBzdHJpbmcgfCBzdHJpbmdbXSkge1xuICAgIHRoaXMuX2NvbXBpbGVPcHRpb25zLmFkZEl0ZW0ob3JpZ2luLCBwdWJsaWNPbmx5LCB2YWx1ZSk7XG4gIH1cblxuICBwdWJsaWMgYWRkQ29tcGlsZU9wdGlvbnMob3JpZ2luOiBUYXJnZXRJdGVtT3JpZ2luLCBwdWJsaWNPbmx5OiBib29sZWFuLCAuLi5vcHRpb25zOiBBcnJheTxzdHJpbmd8c3RyaW5nW10+KSB7XG4gICAgZm9yIChjb25zdCBpdGVyIG9mIG9wdGlvbnMuZmxhdCgpKVxuICAgICAgdGhpcy5hZGRDb21waWxlT3B0aW9uKG9yaWdpbiwgcHVibGljT25seSwgaXRlcik7XG4gIH1cblxuICBwdWJsaWMgZ2V0Q29tcGlsZU9wdGlvbnMoKTogQXJyYXk8c3RyaW5nfHN0cmluZ1tdPiB7XG4gICAgcmV0dXJuIHRoaXMuX2NvbXBpbGVPcHRpb25zLmdldEl0ZW1zKCk7XG4gIH1cbiAgXG4gIHB1YmxpYyBnZXRQdWJsaWNDb21waWxlT3B0aW9ucygpOiBBcnJheTxzdHJpbmd8c3RyaW5nW10+IHtcbiAgICByZXR1cm4gdGhpcy5fY29tcGlsZU9wdGlvbnMuZ2V0UHVibGljSXRlbXMoKTtcbiAgfVxuXG4gIHB1YmxpYyBhZGRMaW5rT3B0aW9uKG9yaWdpbjogVGFyZ2V0SXRlbU9yaWdpbiwgcHVibGljT25seTogYm9vbGVhbiwgdmFsdWU6IHN0cmluZyB8IHN0cmluZ1tdKSB7XG4gICAgcmV0dXJuIHRoaXMuX2xpbmtPcHRpb25zLmFkZEl0ZW0ob3JpZ2luLCBwdWJsaWNPbmx5LCB2YWx1ZSk7XG4gIH1cblxuICBwdWJsaWMgYWRkTGlua09wdGlvbnMob3JpZ2luOiBUYXJnZXRJdGVtT3JpZ2luLCBwdWJsaWNPbmx5OiBib29sZWFuLCAuLi5vcHRpb25zOiBBcnJheTxzdHJpbmd8c3RyaW5nW10+KSB7XG4gICAgZm9yIChjb25zdCBpdGVyIG9mIG9wdGlvbnMuZmxhdCgpKVxuICAgICAgdGhpcy5hZGRMaW5rT3B0aW9uKG9yaWdpbiwgcHVibGljT25seSwgaXRlcik7XG4gIH1cblxuICBwdWJsaWMgZ2V0TGlua09wdGlvbnMoKTogQXJyYXk8c3RyaW5nfHN0cmluZ1tdPiB7XG4gICAgcmV0dXJuIHRoaXMuX2xpbmtPcHRpb25zLmdldEl0ZW1zKCk7XG4gIH1cblxuICBwdWJsaWMgZ2V0UHVibGljTGlua09wdGlvbnMoKTogQXJyYXk8c3RyaW5nfHN0cmluZ1tdPiB7XG4gICAgcmV0dXJuIHRoaXMuX2xpbmtPcHRpb25zLmdldFB1YmxpY0l0ZW1zKCk7XG4gIH1cblxuICBwdWJsaWMgYWRkRGVmaW5pdGlvbihvcmlnaW46IFRhcmdldEl0ZW1PcmlnaW4sIHB1YmxpY09ubHk6IGJvb2xlYW4sIHZhbHVlOiBzdHJpbmcpIHtcbiAgICB0aGlzLl9kZWZpbmVzLmFkZEl0ZW0ob3JpZ2luLCBwdWJsaWNPbmx5LCB2YWx1ZSk7XG4gIH1cblxuICBwdWJsaWMgZ2V0RGVmaW5pdGlvbnMoKTogQXJyYXk8c3RyaW5nPiB7XG4gICAgcmV0dXJuIHRoaXMuX2RlZmluZXMuZ2V0SXRlbXMoKTtcbiAgfVxuXG4gIHB1YmxpYyBnZXRQdWJsaWNEZWZpbml0aW9ucygpOiBBcnJheTxzdHJpbmc+IHtcbiAgICByZXR1cm4gdGhpcy5fZGVmaW5lcy5nZXRQdWJsaWNJdGVtcygpO1xuICB9XG5cbiAgcHVibGljIGFkZEluY2x1ZGUob3JpZ2luOiBUYXJnZXRJdGVtT3JpZ2luLCBwdWJsaWNPbmx5OiBib29sZWFuLCB2YWx1ZTogQWJzb2x1dGVQYXRofEludGVyZmFjZUluY2x1ZGVzKSB7XG4gICAgdGhpcy5faW5jbHVkZXMuYWRkSXRlbShvcmlnaW4sIHB1YmxpY09ubHksIHZhbHVlKTtcbiAgfVxuXG4gIHB1YmxpYyBnZXRJbmNsdWRlcygpOiBBcnJheTxBYnNvbHV0ZVBhdGh8SW50ZXJmYWNlSW5jbHVkZXM+IHtcbiAgICByZXR1cm4gdGhpcy5faW5jbHVkZXMuZ2V0SXRlbXMoKTtcbiAgfVxuXG4gIHB1YmxpYyBnZXRQdWJsaWNJbmNsdWRlcygpOiBBcnJheTxBYnNvbHV0ZVBhdGh8SW50ZXJmYWNlSW5jbHVkZXM+IHtcbiAgICByZXR1cm4gdGhpcy5faW5jbHVkZXMuZ2V0UHVibGljSXRlbXMoKTtcbiAgfVxuXG4gIHB1YmxpYyBhZGRTb3VyY2Uob3JpZ2luOiBUYXJnZXRJdGVtT3JpZ2luLCBwdWJsaWNPbmx5OiBib29sZWFuLCB2YWx1ZTogSW50ZXJmYWNlT2JqZWN0cyB8IFNvdXJjZUZpbGUpIHtcbiAgICB0aGlzLl9zb3VyY2VzLmFkZEl0ZW0ob3JpZ2luLCBwdWJsaWNPbmx5LCB2YWx1ZSk7XG4gIH1cblxuICBwdWJsaWMgYWRkU291cmNlcyhvcmlnaW46IFRhcmdldEl0ZW1PcmlnaW4sIC4uLnNvdXJjZXM6IGFueVtdKSB7XG4gICAgZm9yIChjb25zdCBpdGVyIG9mIHNvdXJjZXMuZmxhdCgpKVxuICAgICAgdGhpcy5hZGRTb3VyY2Uob3JpZ2luLCBmYWxzZSwgaXRlcik7XG4gIH1cblxuICBwdWJsaWMgZ2V0U291cmNlRmlsZXMoKTogU291cmNlRmlsZVtdIHtcbiAgICByZXR1cm4gdGhpcy5fc291cmNlcy5pdGVtcy5tYXAoaSA9PiBpLnZhbHVlKS5maWx0ZXIoaSA9PiBpIGluc3RhbmNlb2YgU291cmNlRmlsZSk7XG4gIH1cblxuICBwdWJsaWMgZ2V0SW50ZXJmYWNlT2JqZWN0c0xpc3QoKTogSW50ZXJmYWNlT2JqZWN0c1tdIHtcbiAgICByZXR1cm4gdGhpcy5fc291cmNlcy5pdGVtcy5tYXAoaSA9PiBpLnZhbHVlKS5maWx0ZXIoaSA9PiBpIGluc3RhbmNlb2YgSW50ZXJmYWNlT2JqZWN0cyk7XG4gIH1cblxuICBwdWJsaWMgZ2V0SGVhZGVycygpOiBTb3VyY2VGaWxlW10ge1xuICAgIGNvbnN0IHJlc3VsdCA9IG5ldyBBcnJheTxTb3VyY2VGaWxlPjtcbiAgICBmb3IgKGNvbnN0IGl0ZXIgb2YgdGhpcy5fc291cmNlcy5pdGVtcykge1xuICAgICAgaWYgKGl0ZXIudmFsdWUgaW5zdGFuY2VvZiBTb3VyY2VGaWxlICYmIGl0ZXIudmFsdWUuSEVBREVSX0ZJTEVfT05MWSlcbiAgICAgICAgcmVzdWx0LnB1c2goaXRlci52YWx1ZSk7XG4gICAgfVxuICAgIHJldHVybiByZXN1bHQ7XG4gIH1cblxuICBwdWJsaWMgYWRkTGlicmFyeShvcmlnaW46IFRhcmdldEl0ZW1PcmlnaW4sIHB1YmxpY09ubHk6IGJvb2xlYW4sIHZhbHVlOiBVc2VySW5kaXJlY3RUYXJnZXQpIHtcbiAgICB0aGlzLl9saWJyYXJpZXMuYWRkSXRlbShvcmlnaW4sIHB1YmxpY09ubHksIFVzZXJJbmRpcmVjdFRhcmdldC5lbnN1cmVJbnN0YW5jZSh2YWx1ZSkpO1xuICB9XG5cbiAgcHVibGljIGFkZExpYnJhcmllcyhvcmlnaW46IFRhcmdldEl0ZW1PcmlnaW4sIHB1YmxpY09ubHk6IGJvb2xlYW4sIC4uLmxpYnJhcmllczogVXNlckluZGlyZWN0VGFyZ2V0W10pIHtcbiAgICBmb3IgKGNvbnN0IGl0ZXIgb2YgbGlicmFyaWVzLmZsYXQoKSlcbiAgICAgIHRoaXMuYWRkTGlicmFyeShvcmlnaW4sIHB1YmxpY09ubHksIGl0ZXIpO1xuICB9XG5cbiAgcHVibGljIGdldExpYnJhcmllcygpOiBBcnJheTxVc2VySW5kaXJlY3RUYXJnZXQ+IHtcbiAgICByZXR1cm4gdGhpcy5fbGlicmFyaWVzLmdldEl0ZW1zKCk7XG4gIH1cblxuICBwdWJsaWMgZ2V0UHVibGljTGlicmFyaWVzKCk6IEFycmF5PFVzZXJJbmRpcmVjdFRhcmdldD4ge1xuICAgIHJldHVybiB0aGlzLl9saWJyYXJpZXMuZ2V0UHVibGljSXRlbXMoKTtcbiAgfVxuXG4gIHB1YmxpYyB0b0pTT04oKTogb2JqZWN0IHtcbiAgICByZXR1cm4ge1xuICAgICAgbmFtZTogdGhpcy5fbmFtZSxcbiAgICAgIHR5cGU6IHRoaXMuX3R5cGUsXG4gICAgICB0YXJnZXRGaWxlOiB0aGlzLl90YXJnZXRGaWxlLFxuICAgICAgcHJlQnVpbGRMaXN0OiB0aGlzLl9wcmVCdWlsZExpc3QsXG4gICAgICBwb3N0QnVpbGRMaXN0OiB0aGlzLl9wb3N0QnVpbGRMaXN0LFxuICAgICAgZGVmaW5pdGlvbnM6IHRoaXMuX2RlZmluZXMsXG4gICAgICBpbmNsdWRlczogdGhpcy5faW5jbHVkZXMsXG4gICAgICBjb21waWxlT3B0aW9uczogdGhpcy5fY29tcGlsZU9wdGlvbnMsXG4gICAgICBsaW5rT3B0aW9uczogdGhpcy5fbGlua09wdGlvbnMsXG4gICAgICBzb3VyY2VzOiB0aGlzLl9zb3VyY2VzLFxuICAgICAgbGlicmFyaWVzOiB0aGlzLl9saWJyYXJpZXMsXG4gICAgICBwb3NpdGlvbkluZGVwZW5kZW50Q29kZTogdGhpcy5fcG9zaXRpb25JbmRlcGVuZGVudENvZGUsXG4gICAgfVxuICB9XG59O1xuIiwiLypcbiAqIE1JVCBMaWNlbnNlXG4gKlxuICogQ29weXJpZ2h0IChjKSAyMDI1ICBZdXJpaSBZYWt1YmluICh5dXJpaS55YWt1YmluQGdtYWlsLmNvbSlcbiAqXG4gKiBQZXJtaXNzaW9uIGlzIGdyYW50ZWQgdG8gdXNlLCBjb3B5LCBtb2RpZnksIGFuZCBkaXN0cmlidXRlIHRoaXMgc29mdHdhcmVcbiAqIHVuZGVyIHRoZSBNSVQgTGljZW5zZS4gU2VlIExJQ0VOU0UgZmlsZSBmb3IgZGV0YWlscy5cbiAqL1xuXG5pbXBvcnQgeyBQcm9qZWN0Q29udGV4dCB9IGZyb20gXCJAL2NvcmUvUHJvamVjdENvbnRleHRcIjtcbmltcG9ydCB7IFZhcmlhYmxlTWFwIH0gZnJvbSBcIkAvY29yZS9TY29wZVwiO1xuaW1wb3J0IHsgQmFzZUNvbnRleHQgfSBmcm9tIFwiQC9jb3JlL0Jhc2VDb250ZXh0XCI7XG5pbXBvcnQgeyBjcmVhdGVDb250ZXh0IH0gZnJvbSBcIkAvY29yZS9CYXNlQ29udGV4dFwiO1xuXG5jb25zdCBHTE9CQUwgPSBTeW1ib2woXCJHTE9CQUxcIik7XG5jb25zdCBTQ09QRSA9IFN5bWJvbChcIlNDT1BFXCIpO1xuXG5leHBvcnQgY2xhc3MgVG9vbGNoYWluQ29udGV4dCBleHRlbmRzIEJhc2VDb250ZXh0IHtcbiAgW1NDT1BFXTogVmFyaWFibGVNYXA7XG4gIFtHTE9CQUxdOiBQcm9qZWN0Q29udGV4dDtcblxuICBjb25zdHJ1Y3RvcihnbG9iYWw6IFByb2plY3RDb250ZXh0LCBzY29wZTogVmFyaWFibGVNYXApIHtcbiAgICBzdXBlcihzY29wZSk7XG4gICAgdGhpc1tHTE9CQUxdID0gZ2xvYmFsO1xuICAgIHRoaXNbU0NPUEVdID0gc2NvcGU7XG4gIH1cblxuICBwdWJsaWMgc3RhdGljIGNyZWF0ZShnbG9iYWw6IFByb2plY3RDb250ZXh0LCB2YXJpYWJsZU1hcDogVmFyaWFibGVNYXApIHtcbiAgICByZXR1cm4gY3JlYXRlQ29udGV4dChuZXcgVG9vbGNoYWluQ29udGV4dChnbG9iYWwsIHZhcmlhYmxlTWFwKSk7XG4gIH1cbn07XG4iLCIvKlxuICogTUlUIExpY2Vuc2VcbiAqXG4gKiBDb3B5cmlnaHQgKGMpIDIwMjUgIFl1cmlpIFlha3ViaW4gKHl1cmlpLnlha3ViaW5AZ21haWwuY29tKVxuICpcbiAqIFBlcm1pc3Npb24gaXMgZ3JhbnRlZCB0byB1c2UsIGNvcHksIG1vZGlmeSwgYW5kIGRpc3RyaWJ1dGUgdGhpcyBzb2Z0d2FyZVxuICogdW5kZXIgdGhlIE1JVCBMaWNlbnNlLiBTZWUgTElDRU5TRSBmaWxlIGZvciBkZXRhaWxzLlxuICovXG5cbmV4cG9ydCBjb25zdCBERUJVR19CVUlMRF9UWVBFID0gXCJEZWJ1Z1wiO1xuZXhwb3J0IGNvbnN0IFJFTEVBU0VfQlVJTERfVFlQRSA9IFwiUmVsZWFzZVwiO1xuIiwiLypcbiAqIE1JVCBMaWNlbnNlXG4gKlxuICogQ29weXJpZ2h0IChjKSAyMDI1ICBZdXJpaSBZYWt1YmluICh5dXJpaS55YWt1YmluQGdtYWlsLmNvbSlcbiAqXG4gKiBQZXJtaXNzaW9uIGlzIGdyYW50ZWQgdG8gdXNlLCBjb3B5LCBtb2RpZnksIGFuZCBkaXN0cmlidXRlIHRoaXMgc29mdHdhcmVcbiAqIHVuZGVyIHRoZSBNSVQgTGljZW5zZS4gU2VlIExJQ0VOU0UgZmlsZSBmb3IgZGV0YWlscy5cbiAqL1xuXG5pbXBvcnQgeyBJTWFrZUNvbnRleHQsIElPYmplY3RMaWJyYXJ5LCBJU3RhdGljTGlicmFyeSwgSVNoYXJlZExpYnJhcnksIElFeGVjdXRhYmxlIH0gZnJvbSBcIkAvY29yZS9NYWtlSW50ZXJmYWNlc1wiO1xuaW1wb3J0IHsgSW50ZXJmYWNlU2NyaXB0IH0gZnJvbSBcIkAvY29yZS9JbnRlcmZhY2VTY3JpcHRcIjtcbmltcG9ydCB7IFVzZXJJbmRpcmVjdFRhcmdldCB9IGZyb20gXCJAL2NvcmUvVGFyZ2V0XCI7XG5pbXBvcnQgeyBDdXN0b21TY3JpcHQgfSBmcm9tIFwiQC9jb3JlL0N1c3RvbVNjcmlwdFwiO1xuaW1wb3J0IHsgVmFyaWFudE1hcCwgVmFyaWFibGVNYXAgfSBmcm9tIFwiQC9jb3JlL1Njb3BlXCI7XG5pbXBvcnQgeyBCYXNlQ29udGV4dCwgY3JlYXRlQ29udGV4dCB9IGZyb20gXCJAL2NvcmUvQmFzZUNvbnRleHRcIjtcbmltcG9ydCB7IExvZ2dlciB9IGZyb20gXCJAL2xvZ2dlclwiO1xuXG5jb25zdCBsb2dnZXIgPSBMb2dnZXIuY3JlYXRlKGltcG9ydC5tZXRhLnVybCk7XG5cbmNvbnN0IElNUEwgPSBTeW1ib2woXCJJTVBMXCIpO1xuXG5leHBvcnQgY2xhc3MgVXNlck1ha2VDb250ZXh0IGV4dGVuZHMgQmFzZUNvbnRleHQgaW1wbGVtZW50cyBJTWFrZUNvbnRleHQge1xuICBbSU1QTF06IElNYWtlQ29udGV4dDtcblxuICBwdWJsaWMgY29uc3RydWN0b3IoaW1wbDogSU1ha2VDb250ZXh0LCB2YXJpYWJsZU1hcDogVmFyaWFibGVNYXApIHtcbiAgICBzdXBlcih2YXJpYWJsZU1hcCk7XG4gICAgdGhpc1tJTVBMXSA9IGltcGw7XG4gIH1cblxuICBwdWJsaWMgc3RhdGljIGNyZWF0ZShpbXBsOiBJTWFrZUNvbnRleHQsIHZhcmlhYmxlTWFwOiBWYXJpYWJsZU1hcCkge1xuICAgIHJldHVybiBjcmVhdGVDb250ZXh0KG5ldyBVc2VyTWFrZUNvbnRleHQoaW1wbCwgdmFyaWFibGVNYXApKTtcbiAgfVxuXG4gIHB1YmxpYyBnZXRDYWNoZVZhcmlhYmxlcygpIHtcbiAgICByZXR1cm4gdGhpc1tJTVBMXS5nZXRDYWNoZVZhcmlhYmxlcygpO1xuICB9XG5cbiAgcHVibGljIGFkZENhY2hlVmFyaWFibGVzKHBhcmFtczogc3RyaW5nIHwgVmFyaWFudE1hcCk6IHZvaWQge1xuICAgIHRoaXNbSU1QTF0uYWRkQ2FjaGVWYXJpYWJsZXMocGFyYW1zKTtcbiAgfVxuXG4gIHB1YmxpYyBhZGRJbmNsdWRlRGlyZWN0b3JpZXMoLi4uZGlyczogYW55W10pOiBhbnkge1xuICAgIHRoaXNbSU1QTF0uYWRkSW5jbHVkZURpcmVjdG9yaWVzKC4uLmRpcnMpO1xuICB9XG5cbiAgcHVibGljIGFkZFN1YmRpcmVjdG9yeShzb3VyY2VEaXI6IGFueSwgYmluYXJ5RGlyPzogYW55KSB7XG4gICAgdGhpc1tJTVBMXS5hZGRTdWJkaXJlY3Rvcnkoc291cmNlRGlyLCBiaW5hcnlEaXIpO1xuICB9XG4gIFxuICBwdWJsaWMgYWRkQ3VzdG9tU2NyaXB0KHNjcmlwdDogYW55LCBwYXJhbXM6IGFueSk6IEN1c3RvbVNjcmlwdCB7XG4gICAgcmV0dXJuIHRoaXNbSU1QTF0uYWRkQ3VzdG9tU2NyaXB0KHNjcmlwdCwgcGFyYW1zKTtcbiAgfVxuXG4gIHB1YmxpYyB0YXJnZXQobmFtZTogc3RyaW5nKTogVXNlckluZGlyZWN0VGFyZ2V0IHtcbiAgICByZXR1cm4gdGhpc1tJTVBMXS50YXJnZXQobmFtZSk7XG4gIH1cblxuICBwdWJsaWMgc2NyaXB0KG5hbWU6IHN0cmluZyk6IEludGVyZmFjZVNjcmlwdCB7XG4gICAgcmV0dXJuIHRoaXNbSU1QTF0uc2NyaXB0KG5hbWUpO1xuICB9XG5cbiAgcHVibGljIGluc3RhbGwodmFsdWU6IGFueSwgcGFyYW1zOiBhbnkpOiB2b2lkIHtcbiAgICB0aGlzW0lNUExdLmluc3RhbGwodmFsdWUsIHBhcmFtcyk7XG4gIH1cblxuICBwdWJsaWMgYWRkT2JqZWN0TGlicmFyeShuYW1lOiBhbnksIC4uLnNvdXJjZXM6IGFueVtdKTogSU9iamVjdExpYnJhcnkge1xuICAgIHJldHVybiB0aGlzW0lNUExdLmFkZE9iamVjdExpYnJhcnkobmFtZSwgLi4uc291cmNlcyk7XG4gIH1cblxuICBwdWJsaWMgYWRkU3RhdGljTGlicmFyeShuYW1lOiBhbnksIC4uLnNvdXJjZXM6IGFueVtdKTogSVN0YXRpY0xpYnJhcnkge1xuICAgIHJldHVybiB0aGlzW0lNUExdLmFkZFN0YXRpY0xpYnJhcnkobmFtZSwgLi4uc291cmNlcyk7XG4gIH1cblxuICBwdWJsaWMgYWRkU2hhcmVkTGlicmFyeShuYW1lOiBhbnksIC4uLnNvdXJjZXM6IGFueVtdKTogSVNoYXJlZExpYnJhcnkge1xuICAgIHJldHVybiB0aGlzW0lNUExdLmFkZFNoYXJlZExpYnJhcnkobmFtZSwgLi4uc291cmNlcyk7XG4gIH1cblxuICBwdWJsaWMgYWRkRXhlY3V0YWJsZShuYW1lOiBhbnksIC4uLnNvdXJjZXM6IGFueVtdKTogSUV4ZWN1dGFibGUge1xuICAgIHJldHVybiB0aGlzW0lNUExdLmFkZEV4ZWN1dGFibGUobmFtZSwgLi4uc291cmNlcyk7XG4gIH1cblxuICBwdWJsaWMgZXhlY3V0ZVNjcmlwdChzY3JpcHQ6IGFueSwgcGFyYW1zOiBhbnkpOiB2b2lkIHtcbiAgICB0aGlzW0lNUExdLmV4ZWN1dGVTY3JpcHQoc2NyaXB0LCBwYXJhbXMpO1xuICB9XG59O1xuIiwiLypcbiAqIE1JVCBMaWNlbnNlXG4gKlxuICogQ29weXJpZ2h0IChjKSAyMDI1ICBZdXJpaSBZYWt1YmluICh5dXJpaS55YWt1YmluQGdtYWlsLmNvbSlcbiAqXG4gKiBQZXJtaXNzaW9uIGlzIGdyYW50ZWQgdG8gdXNlLCBjb3B5LCBtb2RpZnksIGFuZCBkaXN0cmlidXRlIHRoaXMgc29mdHdhcmVcbiAqIHVuZGVyIHRoZSBNSVQgTGljZW5zZS4gU2VlIExJQ0VOU0UgZmlsZSBmb3IgZGV0YWlscy5cbiAqL1xuXG5pbXBvcnQgcGF0aCBmcm9tIFwibm9kZTpwYXRoXCI7XG5cbmV4cG9ydCBmdW5jdGlvbiBmaWxlbmFtZVRvUHJhZ21hT25jZU1hY3JvKGZpbGVwYXRoOiBzdHJpbmcsIGRlZXA6IG51bWJlcikge1xuICBpZiAodHlwZW9mIGRlZXAgPT09ICd1bmRlZmluZWQnKVxuICAgIGRlZXAgPSAzO1xuXG4gIGxldCBjb21wb25lbnRzID0gcGF0aC5ub3JtYWxpemUoZmlsZXBhdGgpLnNwbGl0KHBhdGguc2VwKTtcbiAgaWYgKGNvbXBvbmVudHMubGVuZ3RoID4gZGVlcClcbiAgICBjb21wb25lbnRzID0gY29tcG9uZW50cy5zbGljZShjb21wb25lbnRzLmxlbmd0aCAtIGRlZXApO1xuXG4gIHJldHVybiBcIl9cIiArIGNvbXBvbmVudHMuam9pbignXycpLnJlcGxhY2UoL1stIC46JX5dL2csICdfJykudG9VcHBlckNhc2UoKTtcbn1cblxuZXhwb3J0IGZ1bmN0aW9uIGxpbmVUb1NpbmdsQ29tbWVudChsaW5lOiBzdHJpbmcpIHtcbiAgcmV0dXJuIFwiLy9cIiArIGxpbmU7XG59XG5cbmV4cG9ydCBmdW5jdGlvbiBsaW5lVG9NdWx0aXBsZUNvbW1lbnQobGluZTogc3RyaW5nKSB7XG4gIHJldHVybiBgLyogJHtsaW5lfSAqL2A7XG59XG5cbmV4cG9ydCBmdW5jdGlvbiBnZW5lcmF0ZWRTY3JpcHROYW1lQ29tbWVudChmaWxlbmFtZTogc3RyaW5nKSB7XG4gIHJldHVybiBsaW5lVG9NdWx0aXBsZUNvbW1lbnQoXCJHZW5lcmF0ZWQgZnJvbSBcIiArIHBhdGguYmFzZW5hbWUoZmlsZW5hbWUpKTtcbn1cbiIsIi8qXG4gKiBNSVQgTGljZW5zZVxuICpcbiAqIENvcHlyaWdodCAoYykgMjAyNSAgWXVyaWkgWWFrdWJpbiAoeXVyaWkueWFrdWJpbkBnbWFpbC5jb20pXG4gKlxuICogUGVybWlzc2lvbiBpcyBncmFudGVkIHRvIHVzZSwgY29weSwgbW9kaWZ5LCBhbmQgZGlzdHJpYnV0ZSB0aGlzIHNvZnR3YXJlXG4gKiB1bmRlciB0aGUgTUlUIExpY2Vuc2UuIFNlZSBMSUNFTlNFIGZpbGUgZm9yIGRldGFpbHMuXG4gKi9cblxuZXhwb3J0IGludGVyZmFjZSBJTG9nZ2VyIHtcbiAgZGVidWcobWVzc2FnZT86IGFueSwgLi4ucGFyYW1zOiBhbnlbXSk6IHZvaWQ7XG4gIGluZm8obWVzc2FnZT86IGFueSwgLi4ucGFyYW1zOiBhbnlbXSk6IHZvaWQ7XG4gIG5vdGljZShtZXNzYWdlPzogYW55LCAuLi5wYXJhbXM6IGFueVtdKTogdm9pZDtcbiAgd2FybihtZXNzYWdlPzogYW55LCAuLi5wYXJhbXM6IGFueVtdKTogdm9pZDtcbiAgZXJyb3IobWVzc2FnZT86IGFueSwgLi4ucGFyYW1zOiBhbnlbXSk6IHZvaWQ7XG4gIGZhdGFsKG1lc3NhZ2U/OiBhbnksIC4uLnBhcmFtczogYW55W10pOiB2b2lkO1xufTtcblxudHlwZSBMb2dnZXJIYW5kbGVyID0gKG1lc3NhZ2U/OiBhbnksIC4uLnBhcmFtczogYW55W10pID0+IHZvaWQ7O1xuXG5pbnRlcmZhY2UgRW50cnlMb2dnZXIge1xuICB0YWdOYW1lOiBzdHJpbmc7XG4gIGZpbHRlcjogc3RyaW5nO1xuICBsb2dnZXI6IElMb2dnZXI7XG59O1xuXG5mdW5jdGlvbiB0cnVuY2F0ZShzdHI6IHN0cmluZywgbWF4TGVuZ3RoOiBudW1iZXIpIHtcbiAgaWYgKHN0ci5sZW5ndGggPiBtYXhMZW5ndGgpXG4gICAgcmV0dXJuIHN0ci5zbGljZSgwLCBtYXhMZW5ndGggLSAzKSArIFwiLi4uXCI7XG4gIHJldHVybiBzdHI7XG59XG5cbmZ1bmN0aW9uIG1ha2VMb2dNZXRob2Qod2l0aFByZWZpeDogYm9vbGVhbiwgdHlwZTogc3RyaW5nLCB0YWdOYW1lOiBzdHJpbmcsIHRhcmdldDogYW55LCBoYW5kbGVyOiBMb2dnZXJIYW5kbGVyKSB7XG4gIHJldHVybiAoLi4uYXJnczogYW55W10pID0+IHtcbiAgICBjb25zdCBub3cgPSBuZXcgRGF0ZSgpO1xuICAgIGNvbnN0IHN0ckxpc3QgPSB3aXRoUHJlZml4ID8gWyBub3cudG9JU09TdHJpbmcoKSwgdHlwZSwgdGFnTmFtZSBdIDogW107XG4gICAgZm9yIChjb25zdCBpdGVyIG9mIGFyZ3MpXG4gICAgICBzdHJMaXN0LnB1c2goKHR5cGVvZiBpdGVyID09PSBcInN0cmluZ1wiKSA/IGl0ZXIgOiBKU09OLnN0cmluZ2lmeShpdGVyKSk7XG4gICAgY29uc3QgbWVzc2FnZSA9IHN0ckxpc3Quam9pbihcIiBcIik7XG4gICAgaGFuZGxlci5jYWxsKHRhcmdldCwgdHJ1bmNhdGUobWVzc2FnZSwgMzIwKSk7XG4gIH07XG59XG5cbmxldCBfZGVmYXVsdFBhdHRlcm4gPSBcIlwiO1xuY29uc3QgX2xvZ2dlck1hcCA9IG5ldyBNYXA8c3RyaW5nLCBFbnRyeUxvZ2dlcj4oKTtcblxuY29uc3Qgc3R1YiA9ICgpID0+IHt9O1xuXG5mdW5jdGlvbiBpbml0TG9nZ2VyKGxvZ2dlcjogSUxvZ2dlciwgdGFnTmFtZTogc3RyaW5nLCBmaWx0ZXI6IHN0cmluZykge1xuICBsb2dnZXIuZGVidWcgPSBzdHViO1xuICBsb2dnZXIuaW5mbyA9IHN0dWI7XG4gIGxvZ2dlci5ub3RpY2UgPSBzdHViO1xuICBsb2dnZXIud2FybiA9IHN0dWI7XG4gIGxvZ2dlci5lcnJvciA9IHN0dWI7XG4gIGxvZ2dlci5mYXRhbCA9IHN0dWI7XG5cbiAgbGV0IGxldmVsID0gMDtcbiAgY29uc3QgZmxhZ3M6IGFueSA9IHt9O1xuICBmb3IgKGNvbnN0IGl0ZXIgb2YgZmlsdGVyLnNwbGl0KFwiLFwiKSkge1xuICAgIGlmIChpdGVyID09PSBcIipcIikge1xuICAgICAgbGV2ZWwgPSA1O1xuICAgICAgYnJlYWs7XG4gICAgfVxuICAgIGlmICgvXlxcZCskLy50ZXN0KGl0ZXIpKVxuICAgICAgbGV2ZWwgPSBNYXRoLm1heChsZXZlbCwgcGFyc2VJbnQoaXRlcikpO1xuICAgIGVsc2VcbiAgICAgIGZsYWdzW2l0ZXJdID0gdHJ1ZTtcbiAgfVxuXG4gIGxvZ2dlci5mYXRhbCA9IG1ha2VMb2dNZXRob2QobGV2ZWwgPiAyLCBcIkZcIiwgdGFnTmFtZSwgY29uc29sZSwgY29uc29sZS5lcnJvcik7XG5cbiAgaWYgKGxldmVsID4gMSB8fCBmbGFncy5lcnJvcilcbiAgICBsb2dnZXIuZXJyb3IgPSBtYWtlTG9nTWV0aG9kKGxldmVsID4gMiwgXCJFXCIsIHRhZ05hbWUsIGNvbnNvbGUsIGNvbnNvbGUuZXJyb3IpO1xuXG4gIGlmIChsZXZlbCA+IDIgfHwgZmxhZ3Mud2FybilcbiAgICBsb2dnZXIud2FybiA9IG1ha2VMb2dNZXRob2QobGV2ZWwgPiAyLCBcIldcIiwgdGFnTmFtZSwgY29uc29sZSwgY29uc29sZS53YXJuKTtcblxuICBsb2dnZXIubm90aWNlID0gbWFrZUxvZ01ldGhvZChsZXZlbCA+IDIsIFwiTlwiLCB0YWdOYW1lLCBjb25zb2xlLCBjb25zb2xlLmxvZyk7XG5cbiAgaWYgKGxldmVsID4gMyB8fCBmbGFncy5pbmZvKVxuICAgIGxvZ2dlci5pbmZvID0gbWFrZUxvZ01ldGhvZChsZXZlbCA+IDIsIFwiSVwiLCB0YWdOYW1lLCBjb25zb2xlLCBjb25zb2xlLmluZm8pO1xuXG4gIGlmIChsZXZlbCA+IDQgfHwgZmxhZ3MuZGVidWcpXG4gICAgbG9nZ2VyLmRlYnVnID0gbWFrZUxvZ01ldGhvZChsZXZlbCA+IDIsIFwiRFwiLCB0YWdOYW1lLCBjb25zb2xlLCBjb25zb2xlLmRlYnVnKTtcbn1cblxuZnVuY3Rpb24gY3JlYXRlRW50cnkodGFnTmFtZTogc3RyaW5nLCBmaWx0ZXI6IHN0cmluZykge1xuICBjb25zdCBlbnRyeSA9IHsgdGFnTmFtZSwgZmlsdGVyLCBsb2dnZXI6IHt9IGFzIElMb2dnZXIgfTtcbiAgaW5pdExvZ2dlcihlbnRyeS5sb2dnZXIsIHRhZ05hbWUsIGZpbHRlcik7XG4gIHJldHVybiBlbnRyeTtcbn1cblxuZnVuY3Rpb24gZW50cnlTZXRGaWx0ZXIoZW50cnk6IEVudHJ5TG9nZ2VyLCBmaWx0ZXI6IHN0cmluZykge1xuICBpZiAoZW50cnkuZmlsdGVyICE9PSBmaWx0ZXIpIHtcbiAgICBpbml0TG9nZ2VyKGVudHJ5LmxvZ2dlciwgZW50cnkudGFnTmFtZSwgZmlsdGVyKTtcbiAgICBlbnRyeS5maWx0ZXIgPSBmaWx0ZXI7XG4gIH1cbn1cblxuZnVuY3Rpb24gYWxsU2V0RmlsdGVyKGZpbHRlcjogc3RyaW5nKSB7XG4gIF9kZWZhdWx0UGF0dGVybiA9IGZpbHRlcjtcbiAgZm9yIChjb25zdCBlbnRyeSBvZiBfbG9nZ2VyTWFwLnZhbHVlcygpKVxuICAgIGVudHJ5U2V0RmlsdGVyKGVudHJ5LCBmaWx0ZXIpO1xufVxuXG5leHBvcnQgbmFtZXNwYWNlIExvZ2dlciB7XG5cbmV4cG9ydCBmdW5jdGlvbiBjcmVhdGUodXJsOiBzdHJpbmcpOiBJTG9nZ2VyIHtcbiAgY29uc3QgdGFnTmFtZSA9IHVybC5zdGFydHNXaXRoKEhPU1RfU09VUkNFX1VSTCArIFwiL1wiKSA/IHVybC5zdWJzdHJpbmcoSE9TVF9TT1VSQ0VfVVJMLmxlbmd0aCArIDEpIDogdXJsO1xuICBpZiAoIXRhZ05hbWUgfHwgdGFnTmFtZSA9PT0gXCIqXCIpXG4gICAgdGhyb3cgbmV3IEVycm9yKGBMb2dnZXIgJHt1cmx9IG5vdCBhbGxvd2VkYCk7XG5cbiAgbGV0IGVudHJ5ID0gX2xvZ2dlck1hcC5nZXQodGFnTmFtZSk7XG4gIGlmICghZW50cnkpIHtcbiAgICBlbnRyeSA9IGNyZWF0ZUVudHJ5KHRhZ05hbWUsIF9kZWZhdWx0UGF0dGVybik7XG4gICAgX2xvZ2dlck1hcC5zZXQodGFnTmFtZSwgZW50cnkpO1xuICB9XG5cbiAgcmV0dXJuIGVudHJ5LmxvZ2dlcjtcbn1cblxuZXhwb3J0IGZ1bmN0aW9uIGVuYWJsZShmaWx0ZXI6IHN0cmluZykge1xuICBpZiAoZmlsdGVyID09PSBcIipcIikge1xuICAgIGFsbFNldEZpbHRlcihcIipcIik7XG4gICAgcmV0dXJuO1xuICB9XG5cbiAgY29uc3QgcGFpciA9IGZpbHRlci5zcGxpdChcIjpcIik7XG4gIGlmIChwYWlyLmxlbmd0aCA8IDIpXG4gICAgcmV0dXJuO1xuXG4gIGlmIChwYWlyWzBdID09PSBcIipcIikge1xuICAgIGFsbFNldEZpbHRlcihwYWlyWzBdKTtcbiAgICByZXR1cm47XG4gIH1cblxuICBsZXQgZW50cnkgPSBfbG9nZ2VyTWFwLmdldChwYWlyWzBdKTtcbiAgaWYgKCFlbnRyeSkge1xuICAgIGVudHJ5ID0gY3JlYXRlRW50cnkocGFpclswXSwgcGFpclsxXSk7XG4gICAgX2xvZ2dlck1hcC5zZXQoZmlsdGVyLCBlbnRyeSk7XG4gIH1cbiAgZWxzZSAge1xuICAgIGVudHJ5U2V0RmlsdGVyKGVudHJ5LCBwYWlyWzFdKTtcbiAgfVxufVxuXG59IC8vIG5hbWVzcGFjZSBMb2dnZXJcblxuZm9yIChjb25zdCBpdGVyIG9mIExPR0dFUl9ERUJVRykge1xuICBMb2dnZXIuZW5hYmxlKGl0ZXIpO1xufVxuIiwiLypcbiAqIE1JVCBMaWNlbnNlXG4gKlxuICogQ29weXJpZ2h0IChjKSAyMDI1ICBZdXJpaSBZYWt1YmluICh5dXJpaS55YWt1YmluQGdtYWlsLmNvbSlcbiAqXG4gKiBQZXJtaXNzaW9uIGlzIGdyYW50ZWQgdG8gdXNlLCBjb3B5LCBtb2RpZnksIGFuZCBkaXN0cmlidXRlIHRoaXMgc29mdHdhcmVcbiAqIHVuZGVyIHRoZSBNSVQgTGljZW5zZS4gU2VlIExJQ0VOU0UgZmlsZSBmb3IgZGV0YWlscy5cbiAqL1xuXG5pbXBvcnQgeyBKU09OUlBDX1ZFUlNJT04gfSBmcm9tIFwiQC9zZXJ2ZXIvVHJhbnNwb3J0XCI7XG5pbXBvcnQgeyBJUmVxdWVzdFN5bmMgfSBmcm9tIFwiQC9zZXJ2ZXIvVHJhbnNwb3J0XCI7XG5pbXBvcnQgeyBMb2dnZXIgfSBmcm9tIFwiQC9sb2dnZXJcIjtcblxuY29uc3QgbG9nZ2VyID0gTG9nZ2VyLmNyZWF0ZShpbXBvcnQubWV0YS51cmwpO1xuXG5leHBvcnQgY2xhc3MgSnNvblJwY1JlcXVlc3RTeW5jIHtcbiAgcHJpdmF0ZSBfcmVxdWVzdDogSVJlcXVlc3RTeW5jO1xuICBwcml2YXRlIF9pZDogbnVtYmVyO1xuXG4gIHB1YmxpYyBjb25zdHJ1Y3RvcihyZXF1ZXN0U3luYzogSVJlcXVlc3RTeW5jKSB7XG4gICAgdGhpcy5fcmVxdWVzdCA9IHJlcXVlc3RTeW5jO1xuICAgIHRoaXMuX2lkID0gMTtcbiAgfVxuXG4gIHB1YmxpYyByZXF1ZXN0U3luYyhtZXRob2Q6IHN0cmluZywgcGFyYW1zOiBhbnkpOiBhbnkge1xuICAgIGxvZ2dlci5kZWJ1ZyhcIkpzb25ScGNSZXF1ZXN0U3luYy5yZXF1ZXN0U3luYyhcIiwgbWV0aG9kLCBcIi4uLnBhcmFtcylcIik7XG4gICAgY29uc3QgbWVzc2FnZSA9IHtcbiAgICAgIGpzb25ycGM6IEpTT05SUENfVkVSU0lPTixcbiAgICAgIG1ldGhvZCxcbiAgICAgIHBhcmFtcyxcbiAgICAgIGlkOiB0aGlzLl9pZCsrLFxuICAgIH07XG4gICAgY29uc3QgcmVzcG9uc2UgPSB0aGlzLl9yZXF1ZXN0LnJlcXVlc3RTeW5jKG1lc3NhZ2UpO1xuICAgIGlmIChyZXNwb25zZS5lcnJvcilcbiAgICAgIHRocm93IG5ldyBFcnJvcihyZXNwb25zZS5lcnJvci5tZXNzYWdlLCB7IGNhdXNlOiByZXNwb25zZS5lcnJvci5jb2RlIH0pO1xuICAgIHJldHVybiByZXNwb25zZS5yZXN1bHQ7XG4gIH1cbn07XG4iLCIvKlxuICogTUlUIExpY2Vuc2VcbiAqXG4gKiBDb3B5cmlnaHQgKGMpIDIwMjUgIFl1cmlpIFlha3ViaW4gKHl1cmlpLnlha3ViaW5AZ21haWwuY29tKVxuICpcbiAqIFBlcm1pc3Npb24gaXMgZ3JhbnRlZCB0byB1c2UsIGNvcHksIG1vZGlmeSwgYW5kIGRpc3RyaWJ1dGUgdGhpcyBzb2Z0d2FyZVxuICogdW5kZXIgdGhlIE1JVCBMaWNlbnNlLiBTZWUgTElDRU5TRSBmaWxlIGZvciBkZXRhaWxzLlxuICovXG5cbmltcG9ydCB7IEpTT05SUENfVkVSU0lPTiwgSU1lc3NhZ2VTZW5kZXIsIEpzb25ScGNEYXRhLCBKc29uUnBjUmVxdWVzdEhhbmRsZXIsIElKc29uUnBjUmVxdWVzdCwgSUpzb25ScGNSZXNwb25zZSwgSnNvblJwY0NhbGxiYWNrIH0gZnJvbSBcIkAvc2VydmVyL1RyYW5zcG9ydFwiO1xuaW1wb3J0IHsgTG9nZ2VyIH0gZnJvbSBcIkAvbG9nZ2VyXCI7XG5cbmNvbnN0IGxvZ2dlciA9IExvZ2dlci5jcmVhdGUoaW1wb3J0Lm1ldGEudXJsKTtcblxuY2xhc3MgSnNvblJwY1JlcXVlc3QgaW1wbGVtZW50cyBJSnNvblJwY1JlcXVlc3Qge1xuICBwcml2YXRlIF9wYXJhbXM6IGFueTtcblxuICBjb25zdHJ1Y3RvcihwYXJhbXM6IGFueSkge1xuICAgIHRoaXMuX3BhcmFtcyA9IHBhcmFtcztcbiAgfVxuXG4gIGdldCBwYXJhbXMoKTogYW55IHtcbiAgICByZXR1cm4gdGhpcy5fcGFyYW1zO1xuICB9XG59XG5cbmNsYXNzIEpzb25ScGNSZXNwb25zZSBpbXBsZW1lbnRzIElKc29uUnBjUmVzcG9uc2Uge1xuICBwcml2YXRlIF9zZW5kZXI6IElNZXNzYWdlU2VuZGVyO1xuICBwcml2YXRlIF9pZDogbnVtYmVyO1xuXG4gIHB1YmxpYyBjb25zdHJ1Y3RvcihzZW5kZXI6IElNZXNzYWdlU2VuZGVyLCBpZDogbnVtYmVyKSB7XG4gICAgdGhpcy5fc2VuZGVyID0gc2VuZGVyO1xuICAgIHRoaXMuX2lkID0gaWQ7XG4gIH1cblxuICBzZW5kUmVzdWx0KHJlc3VsdDogYW55KTogdm9pZCB7XG4gICAgY29uc3QgbWVzc2FnZTogSnNvblJwY0RhdGEgPSB7XG4gICAgICBqc29ucnBjOiBKU09OUlBDX1ZFUlNJT04sXG4gICAgICByZXN1bHQ6IChyZXN1bHQgIT09IHVuZGVmaW5lZCkgPyByZXN1bHQgOiBudWxsLFxuICAgICAgaWQ6IHRoaXMuX2lkLFxuICAgIH07XG4gICAgbG9nZ2VyLmRlYnVnKFwiPC0tXCIsIEpTT04uc3RyaW5naWZ5KG1lc3NhZ2UpKTtcbiAgICB0aGlzLl9zZW5kZXIuc2VuZE1lc3NhZ2UobWVzc2FnZSk7XG4gIH1cblxuICBzZW5kRXJyb3IoY29kZTogbnVtYmVyLCBtZXNzYWdlOiBzdHJpbmcsIGRhdGE/OiBhbnkpOiB2b2lkIHtcbiAgICBjb25zdCBlcnJvcjogYW55ID0geyBjb2RlLCBtZXNzYWdlIH07XG4gICAgaWYgKGRhdGEgIT09IHVuZGVmaW5lZCkge1xuICAgICAgZXJyb3IuZGF0YSA9IGRhdGE7XG4gICAgfVxuICAgIGNvbnN0IG1zZzogSnNvblJwY0RhdGEgPSB7XG4gICAgICBqc29ucnBjOiBKU09OUlBDX1ZFUlNJT04sXG4gICAgICBlcnJvcixcbiAgICAgIGlkOiB0aGlzLl9pZCxcbiAgICB9O1xuICAgIGxvZ2dlci5kZWJ1ZyhcIjwtLVwiLCBKU09OLnN0cmluZ2lmeShtc2cpKTtcbiAgICB0aGlzLl9zZW5kZXIuc2VuZE1lc3NhZ2UobXNnKTtcbiAgfVxufTtcblxuZXhwb3J0IGNsYXNzIEpzb25ScGNTZXJ2ZXIge1xuICBwcml2YXRlIF9yZXF1ZXN0SGFuZGxlcnMgPSBuZXcgTWFwPHN0cmluZywgSnNvblJwY1JlcXVlc3RIYW5kbGVyPigpO1xuXG4gIHB1YmxpYyBjb25zdHJ1Y3RvcigpIHtcbiAgfVxuXG4gIHB1YmxpYyByZWdpc3RlckhhbmRsZXIobWV0aG9kOiBzdHJpbmcsIGhhbmRsZXI6IEpzb25ScGNSZXF1ZXN0SGFuZGxlcik6IHZvaWQge1xuICAgIHRoaXMuX3JlcXVlc3RIYW5kbGVycy5zZXQobWV0aG9kLCBoYW5kbGVyKTtcbiAgfVxuXG4gIHB1YmxpYyByZWdpc3RlckNhbGxiYWNrKG1ldGhvZDogc3RyaW5nLCBjYWxsYmFjazogSnNvblJwY0NhbGxiYWNrKTogdm9pZCB7XG4gICAgdGhpcy5fcmVxdWVzdEhhbmRsZXJzLnNldChtZXRob2QsIGFzeW5jIChyZXF1ZXN0LCByZXNwb25zZSkgPT4ge1xuICAgICAgbGV0IHJlc3VsdDogYW55ID0gY2FsbGJhY2socmVxdWVzdC5wYXJhbXMpO1xuICAgICAgaWYgKHJlc3VsdCBpbnN0YW5jZW9mIFByb21pc2UpXG4gICAgICAgIHJlc3VsdCA9IGF3YWl0IHJlc3VsdDtcbiAgICAgIGlmIChyZXN1bHQgJiYgdHlwZW9mIHJlc3VsdCA9PT0gXCJvYmplY3RcIiAmJiB0eXBlb2YgcmVzdWx0LnRvSlNPTiA9PT0gXCJmdW5jdGlvblwiKVxuICAgICAgICByZXN1bHQgPSByZXN1bHQudG9KU09OKCk7XG4gICAgICByZXNwb25zZS5zZW5kUmVzdWx0KHJlc3VsdCk7XG4gICAgfSk7XG4gIH1cblxuICBwdWJsaWMgb25SZXF1ZXN0KHNlbmRlcjogSU1lc3NhZ2VTZW5kZXIsIG1ldGhvZDogYW55LCBpZDogYW55LCBwYXJhbXM6IGFueSk6IHZvaWQge1xuICAgIGNvbnN0IGhhbmRsZXIgPSAodHlwZW9mIG1ldGhvZCA9PT0gXCJzdHJpbmdcIikgPyB0aGlzLl9yZXF1ZXN0SGFuZGxlcnMuZ2V0KG1ldGhvZCkgOiB1bmRlZmluZWQ7XG4gICAgY29uc3QgcmVzcG9uc2UgPSBuZXcgSnNvblJwY1Jlc3BvbnNlKHNlbmRlciwgaWQpO1xuICAgIGlmIChoYW5kbGVyKSB7XG4gICAgICBoYW5kbGVyKG5ldyBKc29uUnBjUmVxdWVzdChwYXJhbXMpLCByZXNwb25zZSk7XG4gICAgfVxuICAgIGVsc2Uge1xuICAgICAgcmVzcG9uc2Uuc2VuZEVycm9yKC0zMjYwMSwgXCJNZXRob2Qgbm90IGZvdW5kXCIpO1xuICAgIH1cbiAgfVxuXG4gIHB1YmxpYyBvblJlc3VsdChzZW5kZXI6IElNZXNzYWdlU2VuZGVyLCByZXN1bHQ6IGFueSwgaWQ6IG51bWJlcik6IHZvaWQge1xuICAgIFxuICB9XG5cbiAgcHVibGljIG9uRXJyb3Ioc2VuZGVyOiBJTWVzc2FnZVNlbmRlciwgZXJyb3I6IG9iamVjdCwgaWQ6IG51bWJlciB8IG51bGwpOiB2b2lkIHtcbiAgICBcbiAgfVxuXG4gIHB1YmxpYyBvbk5vdGlmaWNhdGlvbihzZW5kZXI6IElNZXNzYWdlU2VuZGVyLCBtZXRob2Q6IGFueSwgcGFyYW1zPzogYW55KTogdm9pZCB7XG4gICAgXG4gIH1cblxuICBwcml2YXRlIG9uTWVzc2FnZUltcGwoc2VuZGVyOiBJTWVzc2FnZVNlbmRlciwgbWVzc2FnZTogYW55KTogdm9pZCB7XG4gICAgaWYgKCFtZXNzYWdlIHx8IHR5cGVvZiBtZXNzYWdlICE9PSBcIm9iamVjdFwiKSB7XG4gICAgICByZXR1cm47XG4gICAgfVxuXG4gICAgY29uc3QgZGF0YSA9IG1lc3NhZ2UgYXMgSnNvblJwY0RhdGE7XG5cbiAgICBpZiAoT2JqZWN0Lmhhc093bihkYXRhLCBcIm1ldGhvZFwiKSkge1xuICAgICAgaWYgKE9iamVjdC5oYXNPd24oZGF0YSwgXCJpZFwiKSlcbiAgICAgICAgdGhpcy5vblJlcXVlc3Qoc2VuZGVyLCBkYXRhLm1ldGhvZCwgZGF0YS5pZCwgZGF0YS5wYXJhbXMpO1xuICAgICAgZWxzZVxuICAgICAgICB0aGlzLm9uTm90aWZpY2F0aW9uKHNlbmRlciwgZGF0YS5tZXRob2QsIGRhdGEucGFyYW1zKTtcbiAgICB9XG4gICAgZWxzZSBpZiAoZGF0YS5pZCkge1xuICAgICAgXG4gICAgfVxuICAgIGVsc2Uge1xuXG4gICAgfVxuICB9XG5cbiAgcHVibGljIGVtaXRNZXNzYWdlKHNlbmRlcjogSU1lc3NhZ2VTZW5kZXIsIG1lc3NhZ2U6IGFueSk6IHZvaWQge1xuICAgIGxvZ2dlci5kZWJ1ZyhcIi0tPlwiLCBKU09OLnN0cmluZ2lmeShtZXNzYWdlKSk7XG4gICAgaWYgKEFycmF5LmlzQXJyYXkobWVzc2FnZSkpXG4gICAgICBtZXNzYWdlLmZvckVhY2gobXNnID0+IHRoaXMub25NZXNzYWdlSW1wbChzZW5kZXIsIG1zZykpO1xuICAgIGVsc2VcbiAgICAgIHRoaXMub25NZXNzYWdlSW1wbChzZW5kZXIsIG1lc3NhZ2UpO1xuICB9XG59O1xuIiwiLypcbiAqIE1JVCBMaWNlbnNlXG4gKlxuICogQ29weXJpZ2h0IChjKSAyMDI1ICBZdXJpaSBZYWt1YmluICh5dXJpaS55YWt1YmluQGdtYWlsLmNvbSlcbiAqXG4gKiBQZXJtaXNzaW9uIGlzIGdyYW50ZWQgdG8gdXNlLCBjb3B5LCBtb2RpZnksIGFuZCBkaXN0cmlidXRlIHRoaXMgc29mdHdhcmVcbiAqIHVuZGVyIHRoZSBNSVQgTGljZW5zZS4gU2VlIExJQ0VOU0UgZmlsZSBmb3IgZGV0YWlscy5cbiAqL1xuXG5pbXBvcnQgeyBXb3JrZXIgfSBmcm9tIFwibm9kZTp3b3JrZXJfdGhyZWFkc1wiO1xuXG5pbXBvcnQgeyBjdXJyZW50U2NyaXB0VVJMIH0gZnJvbSBcIkAvdXRpbHMvTW9kdWxlXCI7XG5pbXBvcnQgeyBNZW1vcnlNZXNzYWdlU2VuZGVyIH0gZnJvbSBcIkAvc2VydmVyL01lbW9yeVRyYW5zcG9ydFwiO1xuaW1wb3J0IHsgV29ya2VyU2VuZGVyIH0gZnJvbSBcIkAvc2VydmVyL1dvcmtlclNlbmRlclwiO1xuaW1wb3J0IHsgU2NvcGVIZWxwZXIsIFZhcmlhYmxlTWFwIH0gZnJvbSBcIkAvY29yZS9TY29wZVwiO1xuaW1wb3J0IHsgSlNPTlJQQ19WRVJTSU9OIH0gZnJvbSBcIkAvc2VydmVyL1RyYW5zcG9ydFwiO1xuaW1wb3J0IHsgSnNvblJwY1NlcnZlciB9IGZyb20gXCJAL3NlcnZlci9Kc29uUnBjU2VydmVyXCI7XG5pbXBvcnQgeyBMb2dnZXIgfSBmcm9tIFwiQC9sb2dnZXJcIjtcblxuY29uc3QgbG9nZ2VyID0gTG9nZ2VyLmNyZWF0ZShpbXBvcnQubWV0YS51cmwpO1xuXG5pbnRlcmZhY2UgUmVzcG9uc2VFbnRyeSB7XG4gIHJlc29sdmU6ICh2YWx1ZTogYW55KSA9PiB2b2lkO1xuICByZWplY3Q6IChyZWFzb24/OiBhbnkpID0+IHZvaWQ7XG59O1xuXG5leHBvcnQgY2xhc3MgTWFrZUNsaWVudCB7XG4gIHByaXZhdGUgX2pzb25ScGNTZXJ2ZXI6IEpzb25ScGNTZXJ2ZXI7XG4gIHByaXZhdGUgX3dvcmtlcjogV29ya2VyO1xuICBwcml2YXRlIF9pZCA9IDE7XG4gIHByaXZhdGUgX3dhaXRSZXNwb25zZU1hcCA9IG5ldyBNYXA8bnVtYmVyLFJlc3BvbnNlRW50cnk+KCk7O1xuXG4gIHB1YmxpYyBjb25zdHJ1Y3Rvcihqc29uUnBjU2VydmVyOiBKc29uUnBjU2VydmVyKSB7XG4gICAgdGhpcy5fanNvblJwY1NlcnZlciA9IGpzb25ScGNTZXJ2ZXI7XG4gICAgdGhpcy5fd29ya2VyID0gbmV3IFdvcmtlcihjdXJyZW50U2NyaXB0VVJMKCkpO1xuICAgIHRoaXMuX3dvcmtlci5vbihcIm1lc3NhZ2VcIiwgbWVzc2FnZSA9PiB0aGlzLm9uV29ya2VyTWVzc2FnZShtZXNzYWdlKSk7XG4gICAgdGhpcy5fd29ya2VyLm9uKFwiZXJyb3JcIiwgZXJyb3IgPT4gdGhpcy5vbldvcmtlckVycm9yKGVycm9yKSk7XG4gICAgdGhpcy5fd29ya2VyLm9uKFwiZXhpdFwiLCBjb2RlID0+IHRoaXMub25Xb3JrZXJFeGl0KGNvZGUpKTtcbiAgfVxuXG4gIHB1YmxpYyBhc3luYyByZXF1ZXN0KG1ldGhvZDogc3RyaW5nLCBwYXJhbXM6IGFueSk6IFByb21pc2U8YW55PiB7XG4gICAgY29uc3QgaWQgPSB0aGlzLl9pZCsrO1xuICAgIGNvbnN0IHJlc3VsdCA9IG5ldyBQcm9taXNlPGFueT4oKHJlc29sdmUsIHJlamVjdCkgPT4ge1xuICAgICAgdGhpcy5fd2FpdFJlc3BvbnNlTWFwLnNldChpZCwgeyByZXNvbHZlLCByZWplY3QgfSk7XG4gICAgfSk7XG4gICAgdGhpcy5fd29ya2VyLnBvc3RNZXNzYWdlKHtcbiAgICAgIGpzb25ycGM6IEpTT05SUENfVkVSU0lPTixcbiAgICAgIG1ldGhvZCxcbiAgICAgIHBhcmFtcyxcbiAgICAgIGlkLFxuICAgIH0pO1xuICAgIHJldHVybiByZXN1bHQ7XG4gIH1cblxuICBwcml2YXRlIG9uV29ya2VyTWVzc2FnZShtZXNzYWdlOiBhbnkpIHtcbiAgICBpZiAobWVzc2FnZSBpbnN0YW5jZW9mIFNoYXJlZEFycmF5QnVmZmVyKSB7XG4gICAgICBjb25zdCBtdCA9IG5ldyBNZW1vcnlNZXNzYWdlU2VuZGVyKG1lc3NhZ2UpXG4gICAgICB0aGlzLl9qc29uUnBjU2VydmVyLmVtaXRNZXNzYWdlKG10LCBtdC5yZWFkTWVzc2FnZSgpKTtcbiAgICB9XG4gICAgZWxzZSBpZiAoT2JqZWN0Lmhhc093bihtZXNzYWdlLCBcIm1ldGhvZFwiKSkge1xuICAgICAgY29uc3Qgc2VuZGVyID0gbmV3IFdvcmtlclNlbmRlcih0aGlzLl93b3JrZXIpO1xuICAgICAgdGhpcy5fanNvblJwY1NlcnZlci5lbWl0TWVzc2FnZShzZW5kZXIsIG1lc3NhZ2UpO1xuICAgIH1cbiAgICBlbHNlIGlmIChPYmplY3QuaGFzT3duKG1lc3NhZ2UsIFwiaWRcIikpIHtcbiAgICAgIGNvbnN0IHByb21pc2UgPSB0aGlzLl93YWl0UmVzcG9uc2VNYXAuZ2V0KG1lc3NhZ2UuaWQpO1xuICAgICAgaWYgKCFwcm9taXNlKVxuICAgICAgICB0aHJvdyBuZXcgRXJyb3IoYFVua25vd24gcmVzcG9uc2UgXCIke21lc3NhZ2UuaWR9XCIgaWRgKTtcbiAgICAgIGlmIChPYmplY3QuaGFzT3duKG1lc3NhZ2UsIFwicmVzdWx0XCIpKVxuICAgICAgICBwcm9taXNlLnJlc29sdmUobWVzc2FnZS5yZXN1bHQpO1xuICAgICAgZWxzZSBpZiAoT2JqZWN0Lmhhc093bihtZXNzYWdlLCBcImVycm9yXCIpKVxuICAgICAgICBwcm9taXNlLnJlamVjdChtZXNzYWdlLmVycm9yKTtcbiAgICAgIGVsc2VcbiAgICAgICAgdGhyb3cgbmV3IEVycm9yKGBVbmtub3duIG1lc3NhZ2UgdHlwZSBvZiBcIiR7bWVzc2FnZX1cImApO1xuICAgIH1cbiAgfVxuXG4gIHByaXZhdGUgb25Xb3JrZXJFcnJvcihlcnJvcjogRXJyb3IpIHtcbiAgICBpZiAoZXJyb3IgaW5zdGFuY2VvZiBFcnJvcilcbiAgICAgIGxvZ2dlci5mYXRhbChlcnJvci5zdGFjayk7XG4gICAgZWxzZVxuICAgICAgbG9nZ2VyLmZhdGFsKGVycm9yKTtcbiAgICBwcm9jZXNzLmV4aXQoMSk7XG4gIH1cblxuICBwcml2YXRlIG9uV29ya2VyRXhpdChjb2RlOiBudW1iZXIpIHtcbiAgICBpZiAoY29kZSlcbiAgICAgIHByb2Nlc3MuZXhpdChjb2RlKTtcbiAgfVxufTtcbiIsIi8qXG4gKiBNSVQgTGljZW5zZVxuICpcbiAqIENvcHlyaWdodCAoYykgMjAyNSAgWXVyaWkgWWFrdWJpbiAoeXVyaWkueWFrdWJpbkBnbWFpbC5jb20pXG4gKlxuICogUGVybWlzc2lvbiBpcyBncmFudGVkIHRvIHVzZSwgY29weSwgbW9kaWZ5LCBhbmQgZGlzdHJpYnV0ZSB0aGlzIHNvZnR3YXJlXG4gKiB1bmRlciB0aGUgTUlUIExpY2Vuc2UuIFNlZSBMSUNFTlNFIGZpbGUgZm9yIGRldGFpbHMuXG4gKi9cblxuaW1wb3J0IGZzIGZyb20gXCJub2RlOmZzXCI7XG5cbmltcG9ydCB7IFByb2plY3RDb250ZXh0IH0gZnJvbSBcIkAvY29yZS9Qcm9qZWN0Q29udGV4dFwiO1xuaW1wb3J0IHsgU2NyaXB0Q29udGV4dCB9IGZyb20gXCJAL2NvcmUvU2NyaXB0Q29udGV4dFwiO1xuaW1wb3J0IHsgU2NvcGVIZWxwZXIsIFZhcmlhYmxlTWFwIH0gZnJvbSBcIkAvY29yZS9TY29wZVwiO1xuaW1wb3J0IHsgTWFrZUNsaWVudCB9IGZyb20gXCJAL3NlcnZlci9NYWtlQ2xpZW50XCI7XG5pbXBvcnQgeyBKc29uUnBjU2VydmVyIH0gZnJvbSBcIkAvc2VydmVyL0pzb25ScGNTZXJ2ZXJcIjtcbmltcG9ydCB7IGltcG9ydE1vZHVsZSB9IGZyb20gXCJAL3V0aWxzL01vZHVsZVwiO1xuaW1wb3J0IHsgY3JlYXRlVmFyaWFibGVNYXBGb3JEaXJlY3RvcnkgfSBmcm9tIFwiQC9jb3JlL0Jhc2VDb250ZXh0XCI7XG5pbXBvcnQgeyBNQUlOTk9ERV9TVEFSVE1BS0VTQ1JJUFQgfSBmcm9tIFwiQC9zZXJ2ZXIvUmVtb3RlTWV0aG9kc1wiO1xuaW1wb3J0IHsgTUFJTk5PREVfTE9BREpTT04gfSBmcm9tIFwiQC9zZXJ2ZXIvUmVtb3RlTWV0aG9kc1wiO1xuaW1wb3J0IHsgTUFJTk5PREVfRVhFQ1VURVNDUklQVCB9IGZyb20gXCJAL3NlcnZlci9SZW1vdGVNZXRob2RzXCI7XG5pbXBvcnQgeyBXT1JLRVJOT0RFX1NUQVJUTUFLRVNDUklQVCB9IGZyb20gXCJAL3NlcnZlci9SZW1vdGVNZXRob2RzXCI7XG5pbXBvcnQgeyBNQUlOTk9ERV9BRERDVVNUT01TQ1JJUFQgfSBmcm9tIFwiQC9zZXJ2ZXIvUmVtb3RlTWV0aG9kc1wiO1xuaW1wb3J0IHsgTUFJTk5PREVfQUREU1RBVElDTElCUkFSWSB9IGZyb20gXCJAL3NlcnZlci9SZW1vdGVNZXRob2RzXCI7XG5pbXBvcnQgeyBNQUlOTk9ERV9BRERFWEVDVVRBQkxFIH0gZnJvbSBcIkAvc2VydmVyL1JlbW90ZU1ldGhvZHNcIjtcbmltcG9ydCB7IE1BSU5OT0RFX1RBUkdFVFNPVVJDRVMgfSBmcm9tIFwiQC9zZXJ2ZXIvUmVtb3RlTWV0aG9kc1wiO1xuaW1wb3J0IHsgTG9nZ2VyIH0gZnJvbSBcIkAvbG9nZ2VyXCI7XG5cbmNvbnN0IGxvZ2dlciA9IExvZ2dlci5jcmVhdGUoaW1wb3J0Lm1ldGEudXJsKTtcblxuZXhwb3J0IGNvbnN0IENPTkZJR1VSRV9FVkVOVCA9IFwiY29uZmlndXJlXCI7XG5leHBvcnQgY29uc3QgQlVJTERfRVZFTlQgPSBcImJ1aWxkXCI7XG5cbmV4cG9ydCBpbnRlcmZhY2UgQ29uZmlndXJlRXZlbnQge1xuICBwcm9qZWN0OiBQcm9qZWN0Q29udGV4dDtcbn07XG5cbmV4cG9ydCBpbnRlcmZhY2UgQnVpbGRFdmVudCB7XG4gIHByb2plY3Q6IFByb2plY3RDb250ZXh0O1xufTtcblxuZXhwb3J0IHR5cGUgQ29uZmlndXJlTGlzdGVuZXIgPSAoZXZlbnQ6IENvbmZpZ3VyZUV2ZW50KSA9PiB2b2lkO1xuZXhwb3J0IHR5cGUgQnVpbGRMaXN0ZW5lciA9IChldmVudDogQnVpbGRFdmVudCkgPT4gdm9pZDtcblxuZXhwb3J0IGludGVyZmFjZSBNZW1vcnlTZW5kZXIge1xuICBzZW5kTWVzc2FnZShtZXNzYWdlOiBhbnkpOiB2b2lkO1xufTtcblxuZXhwb3J0IGNsYXNzIE1ha2VTZXJ2ZXIge1xuICBwcml2YXRlIF9yb290VmFyaWFibGVNYXA6IFZhcmlhYmxlTWFwID0ge307XG4gIHByaXZhdGUgX3Byb2plY3QgPSBQcm9qZWN0Q29udGV4dC5jcmVhdGUoKTtcbiAgcHJpdmF0ZSBfbGlzdGVuZXJzOiB7IFtuYW1lOiBzdHJpbmddOiBGdW5jdGlvbltdIH07XG4gIHByaXZhdGUgX2pzb25ScGNTZXJ2ZXIgPSBuZXcgSnNvblJwY1NlcnZlcjtcbiAgcHJpdmF0ZSBfY2xpZW50cyA9IG5ldyBNYXA8c3RyaW5nLCBNYWtlQ2xpZW50PjtcbiAgcHJpdmF0ZSBfY2xpZW50SWRDb3VudGVyID0gMTtcblxuICBwdWJsaWMgY29uc3RydWN0b3IoKSB7XG4gICAgdGhpcy5fbGlzdGVuZXJzID0ge1xuICAgICAgWyBDT05GSUdVUkVfRVZFTlQgXTogbmV3IEFycmF5PENvbmZpZ3VyZUxpc3RlbmVyPixcbiAgICAgIFsgQlVJTERfRVZFTlQgXTogbmV3IEFycmF5PEJ1aWxkTGlzdGVuZXI+LFxuICAgIH07XG4gICAgdGhpcy5fanNvblJwY1NlcnZlci5yZWdpc3RlckNhbGxiYWNrKE1BSU5OT0RFX0VYRUNVVEVTQ1JJUFQsIHBhcmFtcyA9PiB0aGlzLmV4ZWN1dGVTY3JpcHQocGFyYW1zKSk7XG4gICAgdGhpcy5fanNvblJwY1NlcnZlci5yZWdpc3RlckNhbGxiYWNrKE1BSU5OT0RFX0xPQURKU09OLCBwYXJhbXMgPT4gdGhpcy5sb2FkSlNPTihwYXJhbXMpKTtcbiAgICB0aGlzLl9qc29uUnBjU2VydmVyLnJlZ2lzdGVyQ2FsbGJhY2soTUFJTk5PREVfU1RBUlRNQUtFU0NSSVBULCBwYXJhbXMgPT4gdGhpcy5zdGFydE1ha2VTY3JpcHQocGFyYW1zKSk7XG4gICAgdGhpcy5fanNvblJwY1NlcnZlci5yZWdpc3RlckNhbGxiYWNrKE1BSU5OT0RFX0FERENVU1RPTVNDUklQVCwgcGFyYW1zID0+IHRoaXMuYWRkQ3VzdG9tU2NyaXB0KHBhcmFtcykpO1xuICAgIHRoaXMuX2pzb25ScGNTZXJ2ZXIucmVnaXN0ZXJDYWxsYmFjayhNQUlOTk9ERV9BRERTVEFUSUNMSUJSQVJZLCBwYXJhbXMgPT4gdGhpcy5hZGRTdGF0aWNMaWJyYXJ5KHBhcmFtcykpO1xuICAgIHRoaXMuX2pzb25ScGNTZXJ2ZXIucmVnaXN0ZXJDYWxsYmFjayhNQUlOTk9ERV9BRERFWEVDVVRBQkxFLCBwYXJhbXMgPT4gdGhpcy5hZGRFeGVjdXRhYmxlKHBhcmFtcykpO1xuICAgIHRoaXMuX2pzb25ScGNTZXJ2ZXIucmVnaXN0ZXJDYWxsYmFjayhNQUlOTk9ERV9UQVJHRVRTT1VSQ0VTLCBwYXJhbXMgPT4gdGhpcy50YXJnZXRTb3VyY2VzKHBhcmFtcykpO1xuICB9XG5cbiAgcHVibGljIGdldCByb290VmFyaWFibGVNYXAoKSB7XG4gICAgcmV0dXJuIHRoaXMuX3Jvb3RWYXJpYWJsZU1hcDtcbiAgfVxuXG4gIHB1YmxpYyBnZXQgcHJvamVjdCgpIHtcbiAgICByZXR1cm4gdGhpcy5fcHJvamVjdDtcbiAgfVxuXG4gIHB1YmxpYyBjcmVhdGVDbGllbnQoKSB7XG4gICAgY29uc3QgbmFtZSA9IFwibWtjXCIgKyB0aGlzLl9jbGllbnRJZENvdW50ZXIrKztcbiAgICBjb25zdCBjbGllbnQgPSBuZXcgTWFrZUNsaWVudCh0aGlzLl9qc29uUnBjU2VydmVyKTtcbiAgICB0aGlzLl9jbGllbnRzLnNldChuYW1lLCBjbGllbnQpO1xuICAgIHJldHVybiBjbGllbnQ7XG4gIH1cblxuICBwdWJsaWMgYXN5bmMgc3RhcnRNYWtlU2NyaXB0KHBhcmFtczogYW55KTogUHJvbWlzZTx2b2lkPiB7XG4gICAgbG9nZ2VyLmRlYnVnKFwiTWFrZVNlcnZlci5zdGFydE1ha2VTY3JpcHRcIik7XG5cbiAgICBjb25zdCB2YXJpYWJsZU1hcCA9IFNjb3BlSGVscGVyLmZyb21KU09OKHBhcmFtcyk7XG4gICAgYXdhaXQgdGhpcy5ydW5NYWtlU2NyaXB0KHZhcmlhYmxlTWFwKTtcbiAgfVxuXG4gIHByaXZhdGUgYXN5bmMgbG9hZEpTT04oZmlsZW5hbWU6IHN0cmluZyk6IFByb21pc2U8YW55PiB7XG4gICAgbG9nZ2VyLmRlYnVnKFwiTWFrZVNlcnZlci5sb2FkSlNPTihcIiwgZmlsZW5hbWUsIFwiKVwiKTtcbiAgICBpZiAoZmlsZW5hbWUuZW5kc1dpdGgoXCIuanNvblwiKSkge1xuICAgICAgY29uc3QgY29udGVudCA9IGF3YWl0IGZzLnByb21pc2VzLnJlYWRGaWxlKGZpbGVuYW1lLCBcInV0ZjhcIik7XG4gICAgICByZXR1cm4gSlNPTi5wYXJzZShjb250ZW50KTtcbiAgICB9XG5cbiAgICBjb25zdCBtb2R1bGUgPSBhd2FpdCBpbXBvcnRNb2R1bGUoZmlsZW5hbWUpO1xuICAgIGlmICghbW9kdWxlLmRlZmF1bHQpXG4gICAgICB0aHJvdyBuZXcgRXJyb3IoYFNjcmlwdCBcIiR7ZmlsZW5hbWV9XCIgaGFzIG5vdCBjb250YWluIGEgZGVmYXVsdCBmdW5jdGlvbmApO1xuXG4gICAgcmV0dXJuIG1vZHVsZS5kZWZhdWx0O1xuICB9XG5cbiAgcHJpdmF0ZSBhc3luYyBleGVjdXRlU2NyaXB0KHBhcmFtczogYW55KTogUHJvbWlzZTx2b2lkPiB7XG4gICAgbG9nZ2VyLmRlYnVnKFwiTWFrZVNlcnZlci5leGVjdXRlU2NyaXB0XCIpO1xuICAgIGNvbnN0IHZhcmlhYmxlTWFwID0gU2NvcGVIZWxwZXIuZnJvbUpTT04ocGFyYW1zKTtcbiAgICBjb25zdCBzY3JpcHRGaWxlID0gU2NvcGVIZWxwZXIuZ2V0KHZhcmlhYmxlTWFwLCBcIlNDUklQVF9GSUxFXCIpO1xuXG4gICAgY29uc3QgbW9kdWxlID0gYXdhaXQgaW1wb3J0TW9kdWxlKHNjcmlwdEZpbGUudG9TdHJpbmcoKSk7XG4gICAgaWYgKCFtb2R1bGUuZGVmYXVsdClcbiAgICAgIHRocm93IG5ldyBFcnJvcihgU2NyaXB0IFwiJHtzY3JpcHRGaWxlfVwiIGhhcyBub3QgY29udGFpbiBhIGRlZmF1bHQgZnVuY3Rpb25gKTtcblxuICAgIGNvbnN0IG1rID0gU2NyaXB0Q29udGV4dC5jcmVhdGUodGhpcy5fcHJvamVjdCwgdmFyaWFibGVNYXApO1xuICAgIG1vZHVsZS5kZWZhdWx0KG1rKTtcbiAgfVxuXG4gIHByaXZhdGUgYWRkQ3VzdG9tU2NyaXB0KHBhcmFtczogYW55KSB7XG4gICAgbG9nZ2VyLmRlYnVnKFwiTWFrZVNlcnZlci5hZGRDdXN0b21TY3JpcHRcIik7XG4gICAgY29uc3QgdmFyaWFibGVNYXAgPSBTY29wZUhlbHBlci5mcm9tSlNPTihwYXJhbXMpO1xuICAgIHJldHVybiB0aGlzLl9wcm9qZWN0LmFkZEN1c3RvbVNjcmlwdCh2YXJpYWJsZU1hcCk7XG4gIH1cblxuICBwcml2YXRlIGFkZFN0YXRpY0xpYnJhcnkocGFyYW1zOiBhbnkpIHtcbiAgICBsb2dnZXIuZGVidWcoXCJNYWtlU2VydmVyLmFkZFN0YXRpY0xpYnJhcnkoXCIsIHBhcmFtcy5uYW1lLCBcIilcIik7XG4gICAgY29uc3QgdmFyaWFibGVNYXAgPSBTY29wZUhlbHBlci5mcm9tSlNPTihwYXJhbXMudmFyaWFibGVNYXApO1xuICAgIHRoaXMuX3Byb2plY3QuYWRkU3RhdGljTGlicmFyeSh2YXJpYWJsZU1hcCwgcGFyYW1zLm5hbWUpO1xuICAgIHJldHVybiBwYXJhbXMubmFtZTtcbiAgfVxuXG4gIHByaXZhdGUgYWRkRXhlY3V0YWJsZShwYXJhbXM6IGFueSkge1xuICAgIGxvZ2dlci5kZWJ1ZyhcIk1ha2VTZXJ2ZXIuYWRkRXhlY3V0YWJsZShcIiwgcGFyYW1zLm5hbWUsIFwiKVwiKTtcbiAgICBjb25zdCB2YXJpYWJsZU1hcCA9IFNjb3BlSGVscGVyLmZyb21KU09OKHBhcmFtcy52YXJpYWJsZU1hcCk7XG4gICAgdGhpcy5fcHJvamVjdC5hZGRFeGVjdXRhYmxlKHZhcmlhYmxlTWFwLCBwYXJhbXMubmFtZSk7XG4gICAgcmV0dXJuIHBhcmFtcy5uYW1lO1xuICB9XG5cbiAgcHJpdmF0ZSB0YXJnZXRTb3VyY2VzKHBhcmFtczogYW55KSB7XG4gICAgbG9nZ2VyLmRlYnVnKFwiTWFrZVNlcnZlci50YXJnZXRTb3VyY2VzKFwiLCBwYXJhbXMsIFwiKVwiKTtcbiAgICB0aHJvdyBuZXcgRXJyb3IoXCJOb3QgSW1wbGVtZW50ZWRcIik7XG4gIH1cblxuICBwdWJsaWMgYXN5bmMgcnVuTWFrZVNjcmlwdCh2YXJpYWJsZU1hcDogVmFyaWFibGVNYXApOiBQcm9taXNlPGJvb2xlYW4+IHtcbiAgICBpZiAoIWF3YWl0IHRoaXMuX3Byb2plY3QucHJlcGVhclNjcmlwdEZpbGUodmFyaWFibGVNYXApKVxuICAgICAgcmV0dXJuIGZhbHNlO1xuXG4gICAgY29uc3QgY2xpZW50ID0gdGhpcy5jcmVhdGVDbGllbnQoKTtcblxuICAgIGNvbnN0IGN3ZFNhdmUgPSBwcm9jZXNzLmN3ZCgpO1xuICAgIGNvbnN0IHNjcmlwdERpciA9IFNjb3BlSGVscGVyLmdldCh2YXJpYWJsZU1hcCwgXCJTQ1JJUFRfRElSXCIpO1xuICAgIHByb2Nlc3MuY2hkaXIoc2NyaXB0RGlyLnRvU3RyaW5nKCkpO1xuICAgIGF3YWl0IGNsaWVudC5yZXF1ZXN0KFdPUktFUk5PREVfU1RBUlRNQUtFU0NSSVBULCBTY29wZUhlbHBlci50b0pTT04odmFyaWFibGVNYXApKTtcbiAgICBwcm9jZXNzLmNoZGlyKGN3ZFNhdmUpO1xuXG4gICAgcmV0dXJuIHRydWU7XG4gIH1cblxuICBwdWJsaWMgYXN5bmMgc3RhcnQoKSB7XG4gICAgY29uc3Qgc291cmNlRGlyID0gU2NvcGVIZWxwZXIuZ2V0KHRoaXMuX3Jvb3RWYXJpYWJsZU1hcCwgXCJQUk9KRUNUX1NPVVJDRV9ESVJcIik7XG4gICAgY29uc3QgYmluYXJ5RGlyID0gU2NvcGVIZWxwZXIuZ2V0KHRoaXMuX3Jvb3RWYXJpYWJsZU1hcCwgXCJQUk9KRUNUX0JJTkFSWV9ESVJcIik7XG5cbiAgICAvKmNvbnN0IHZhcmlhYmxlTWFwID0gY3JlYXRlVmFyaWFibGVNYXBGb3JEaXJlY3RvcnkodGhpcy5fcm9vdFZhcmlhYmxlTWFwLCBzb3VyY2VEaXIsIGJpbmFyeURpcik7XG4gICAgaWYgKCFhd2FpdCB0aGlzLnJ1bk1ha2VTY3JpcHQodmFyaWFibGVNYXApKVxuICAgICAgdGhyb3cgRXJyb3IoXCJDYW4ndCBwcmVwZWFyIFNjcmlwdEZpbGVcIik7XG5cbiAgICB0aGlzLm9uQ29uZmlndXJlRW5kKCk7Ki9cblxuICAgIHRoaXMuX3Byb2plY3QuYWRkU3ViZGlyZWN0b3J5KHRoaXMuX3Jvb3RWYXJpYWJsZU1hcCwgc291cmNlRGlyLCBiaW5hcnlEaXIpO1xuICAgIHRoaXMuX3Byb2plY3QuZG9TdWJkaXJlY3RvcnkoKS50aGVuKCgpID0+IHRoaXMub25Db25maWd1cmVFbmQoKSk7XG4gIH1cblxuICBwcml2YXRlIGFzeW5jIG9uQ29uZmlndXJlRW5kKCkge1xuICAgIGNvbnN0IGV2ZW50ID0geyBwcm9qZWN0OiB0aGlzLl9wcm9qZWN0IH07XG4gICAgYXdhaXQgdGhpcy5lbWl0RXZlbnQoQ09ORklHVVJFX0VWRU5ULCBldmVudCk7XG4gICAgYXdhaXQgdGhpcy5lbWl0RXZlbnQoQlVJTERfRVZFTlQsIGV2ZW50KTtcbiAgfVxuXG4gIHByaXZhdGUgYXN5bmMgZW1pdEV2ZW50PFQ+KHR5cGU6IHN0cmluZywgZXZlbnQ6IFQpOiBQcm9taXNlPHZvaWQ+IHtcbiAgICBmb3IgKGNvbnN0IGxpc3RlbmVyIG9mIHRoaXMuX2xpc3RlbmVyc1t0eXBlXSkge1xuICAgICAgY29uc3QgcmVzdWx0ID0gbGlzdGVuZXIoZXZlbnQpO1xuICAgICAgaWYgKHJlc3VsdCBpbnN0YW5jZW9mIFByb21pc2UpXG4gICAgICAgIGF3YWl0IHJlc3VsdDtcbiAgICB9XG4gIH1cbiAgXG4gIHB1YmxpYyBhZGRFdmVudExpc3RlbmVyKHR5cGU6IFwiY29uZmlndXJlXCIsIGxpc3RlbmVyOiBDb25maWd1cmVMaXN0ZW5lcik6IHZvaWQ7XG4gIHB1YmxpYyBhZGRFdmVudExpc3RlbmVyKHR5cGU6IFwiYnVpbGRcIiwgbGlzdGVuZXI6IEJ1aWxkTGlzdGVuZXIpOiB2b2lkO1xuICBwdWJsaWMgYWRkRXZlbnRMaXN0ZW5lcih0eXBlOiBzdHJpbmcsIGxpc3RlbmVyOiBGdW5jdGlvbik6IHZvaWQge1xuICAgIHRoaXMuX2xpc3RlbmVyc1t0eXBlXS5wdXNoKGxpc3RlbmVyKTtcbiAgfVxufTtcbiIsIi8qXG4gKiBNSVQgTGljZW5zZVxuICpcbiAqIENvcHlyaWdodCAoYykgMjAyNSAgWXVyaWkgWWFrdWJpbiAoeXVyaWkueWFrdWJpbkBnbWFpbC5jb20pXG4gKlxuICogUGVybWlzc2lvbiBpcyBncmFudGVkIHRvIHVzZSwgY29weSwgbW9kaWZ5LCBhbmQgZGlzdHJpYnV0ZSB0aGlzIHNvZnR3YXJlXG4gKiB1bmRlciB0aGUgTUlUIExpY2Vuc2UuIFNlZSBMSUNFTlNFIGZpbGUgZm9yIGRldGFpbHMuXG4gKi9cblxuaW1wb3J0IHsgSU1lc3NhZ2VTZW5kZXIsIElSZXF1ZXN0U3luYyB9IGZyb20gXCJAL3NlcnZlci9UcmFuc3BvcnRcIjtcbmltcG9ydCB7IExvZ2dlciB9IGZyb20gXCJAL2xvZ2dlclwiO1xuXG5jb25zdCBsb2dnZXIgPSBMb2dnZXIuY3JlYXRlKGltcG9ydC5tZXRhLnVybCk7XG5cbmV4cG9ydCBjbGFzcyBNZW1vcnlNZXNzYWdlU2VuZGVyIGltcGxlbWVudHMgSU1lc3NhZ2VTZW5kZXIge1xuICBwcml2YXRlIF9idWZmZXI6IFNoYXJlZEFycmF5QnVmZmVyO1xuICBwcml2YXRlIF9tZW1vcnk6IE1lbW9yeVRyYW5zcG9ydC5CdWZmZXI7XG5cbiAgcHVibGljIGNvbnN0cnVjdG9yKGJ1ZmZlcjogU2hhcmVkQXJyYXlCdWZmZXIpIHtcbiAgICB0aGlzLl9idWZmZXIgPSBidWZmZXI7XG4gICAgdGhpcy5fbWVtb3J5ID0gbmV3IE1lbW9yeVRyYW5zcG9ydC5CdWZmZXIoYnVmZmVyKTtcbiAgfVxuXG4gIHB1YmxpYyBzZW5kTWVzc2FnZShtZXNzYWdlOiBhbnkpOiB2b2lkIHtcbiAgICB0aGlzLl9tZW1vcnkuc2V0KG1lc3NhZ2UsIHRydWUpO1xuICB9XG5cbiAgcHVibGljIHJlYWRNZXNzYWdlKCk6IGFueSB7XG4gICAgcmV0dXJuIHRoaXMuX21lbW9yeS5nZXQoKTtcbiAgfVxufTtcblxuZXhwb3J0IGNsYXNzIE1lbW9yeVRyYW5zcG9ydCBpbXBsZW1lbnRzIElSZXF1ZXN0U3luYyB7XG4gIHByaXZhdGUgX3NlbmRlcjogSU1lc3NhZ2VTZW5kZXI7XG4gIHByaXZhdGUgX2J1ZmZlcjogU2hhcmVkQXJyYXlCdWZmZXI7XG4gIHByaXZhdGUgX21lbW9yeTogTWVtb3J5VHJhbnNwb3J0LkJ1ZmZlcjtcblxuICBwdWJsaWMgY29uc3RydWN0b3Ioc2VuZGVyOiBJTWVzc2FnZVNlbmRlciwgYnVmZmVyOiBTaGFyZWRBcnJheUJ1ZmZlcikge1xuICAgIHRoaXMuX3NlbmRlciA9IHNlbmRlcjtcbiAgICB0aGlzLl9idWZmZXIgPSBidWZmZXI7XG4gICAgdGhpcy5fbWVtb3J5ID0gbmV3IE1lbW9yeVRyYW5zcG9ydC5CdWZmZXIoYnVmZmVyKTtcbiAgfVxuXG4gIHB1YmxpYyByZXF1ZXN0U3luYyhkYXRhOiBhbnkpOiBhbnkge1xuICAgIHRoaXMuX21lbW9yeS5zZXQoZGF0YSk7XG4gICAgdGhpcy5fc2VuZGVyLnNlbmRNZXNzYWdlKHRoaXMuX2J1ZmZlcik7XG4gICAgcmV0dXJuIHRoaXMuX21lbW9yeS5nZXQodHJ1ZSk7XG4gIH1cbn07XG5cbmV4cG9ydCBuYW1lc3BhY2UgTWVtb3J5VHJhbnNwb3J0IHtcblxuY29uc3QgTUFHSUNfT0ZGU0VUID0gMDtcblxuZXhwb3J0IGNsYXNzIEJ1ZmZlciB7XG4gIHByaXZhdGUgX3NpZ25hbDogSW50MzJBcnJheTtcbiAgcHJpdmF0ZSBfZGF0YTogVWludDhBcnJheTtcbiAgcHJpdmF0ZSBfbWFnaWM6IG51bWJlcjtcblxuICBwdWJsaWMgY29uc3RydWN0b3IoYnVmZmVyOiBTaGFyZWRBcnJheUJ1ZmZlcikge1xuICAgIHRoaXMuX3NpZ25hbCA9IG5ldyBJbnQzMkFycmF5KGJ1ZmZlciwgTUFHSUNfT0ZGU0VULCAxKTtcbiAgICB0aGlzLl9kYXRhID0gbmV3IFVpbnQ4QXJyYXkoYnVmZmVyLCB0aGlzLl9zaWduYWwuQllURVNfUEVSX0VMRU1FTlQpO1xuICAgIHRoaXMuX21hZ2ljID0gMDtcbiAgfVxuXG4gIHB1YmxpYyBnZXQoc3luYyA9IGZhbHNlKTogYW55IHtcbiAgICBpZiAoc3luYykge1xuICAgICAgQXRvbWljcy53YWl0KHRoaXMuX3NpZ25hbCwgTUFHSUNfT0ZGU0VULCB0aGlzLl9tYWdpYyk7XG4gICAgfVxuXG4gICAgdGhpcy5fbWFnaWMgPSB0aGlzLl9zaWduYWxbMF07XG4gICAgY29uc3QgbGVuZ3RoID0gdGhpcy5fbWFnaWMgPj4gODtcbiAgICBjb25zdCBieXRlcyA9IHRoaXMuX2RhdGEuc2xpY2UoMCwgbGVuZ3RoKTtcbiAgICBjb25zdCBtZXNzYWdlID0gKG5ldyBUZXh0RGVjb2RlcigpKS5kZWNvZGUoYnl0ZXMpO1xuXG4gICAgcmV0dXJuIEpTT04ucGFyc2UobWVzc2FnZSk7XG4gIH1cblxuICBwdWJsaWMgc2V0KGpzb246IGFueSwgbm90aWZ5ID0gZmFsc2UpIHtcbiAgICBjb25zdCBtZXNzYWdlID0gSlNPTi5zdHJpbmdpZnkoanNvbik7XG4gICAgY29uc3QgYnl0ZXMgPSAobmV3IFRleHRFbmNvZGVyKCkpLmVuY29kZShtZXNzYWdlKTtcbiAgICB0aGlzLl9kYXRhLnNldChieXRlcyk7XG4gICAgdGhpcy5fbWFnaWMgPSAoYnl0ZXMubGVuZ3RoIDw8IDgpIHwgKCh0aGlzLl9tYWdpYyArIDEpICYgMjU1KTtcbiAgICB0aGlzLl9zaWduYWxbMF0gPSB0aGlzLl9tYWdpYztcblxuICAgIGlmIChub3RpZnkpIHtcbiAgICAgIEF0b21pY3Mubm90aWZ5KHRoaXMuX3NpZ25hbCwgTUFHSUNfT0ZGU0VULCAxKTtcbiAgICB9XG4gIH1cbn07XG5cbn0gLy8gbmFtZXNwYWNlIE1lbW9yeVRyYW5zcG9ydFxuIiwiLypcbiAqIE1JVCBMaWNlbnNlXG4gKlxuICogQ29weXJpZ2h0IChjKSAyMDI1ICBZdXJpaSBZYWt1YmluICh5dXJpaS55YWt1YmluQGdtYWlsLmNvbSlcbiAqXG4gKiBQZXJtaXNzaW9uIGlzIGdyYW50ZWQgdG8gdXNlLCBjb3B5LCBtb2RpZnksIGFuZCBkaXN0cmlidXRlIHRoaXMgc29mdHdhcmVcbiAqIHVuZGVyIHRoZSBNSVQgTGljZW5zZS4gU2VlIExJQ0VOU0UgZmlsZSBmb3IgZGV0YWlscy5cbiAqL1xuXG5pbXBvcnQgeyBNZXNzYWdlUG9ydCB9IGZyb20gXCJub2RlOndvcmtlcl90aHJlYWRzXCI7XG5pbXBvcnQgeyBJTWVzc2FnZVNlbmRlciB9IGZyb20gXCJAL3NlcnZlci9UcmFuc3BvcnRcIjtcbmltcG9ydCB7IExvZ2dlciB9IGZyb20gXCJAL2xvZ2dlclwiO1xuXG5jb25zdCBsb2dnZXIgPSBMb2dnZXIuY3JlYXRlKGltcG9ydC5tZXRhLnVybCk7XG5cbmV4cG9ydCBjbGFzcyBNZXNzYWdlUG9ydFNlbmRlciBpbXBsZW1lbnRzIElNZXNzYWdlU2VuZGVyIHtcbiAgcHJpdmF0ZSBfbWVzc2FnZVBvcnQ6IE1lc3NhZ2VQb3J0O1xuXG4gIHB1YmxpYyBjb25zdHJ1Y3RvcihtZXNzYWdlUG9ydDogTWVzc2FnZVBvcnQpIHtcbiAgICB0aGlzLl9tZXNzYWdlUG9ydCA9IG1lc3NhZ2VQb3J0O1xuICB9XG5cbiAgcHVibGljIHNlbmRNZXNzYWdlKG1lc3NhZ2U6IGFueSk6IHZvaWQge1xuICAgIGxvZ2dlci5kZWJ1ZyhcIjwtLVwiLCBKU09OLnN0cmluZ2lmeShtZXNzYWdlKSk7XG4gICAgdGhpcy5fbWVzc2FnZVBvcnQucG9zdE1lc3NhZ2UobWVzc2FnZSk7XG4gIH1cbn07XG4iLCIvKlxuICogTUlUIExpY2Vuc2VcbiAqXG4gKiBDb3B5cmlnaHQgKGMpIDIwMjUgIFl1cmlpIFlha3ViaW4gKHl1cmlpLnlha3ViaW5AZ21haWwuY29tKVxuICpcbiAqIFBlcm1pc3Npb24gaXMgZ3JhbnRlZCB0byB1c2UsIGNvcHksIG1vZGlmeSwgYW5kIGRpc3RyaWJ1dGUgdGhpcyBzb2Z0d2FyZVxuICogdW5kZXIgdGhlIE1JVCBMaWNlbnNlLiBTZWUgTElDRU5TRSBmaWxlIGZvciBkZXRhaWxzLlxuICovXG5cbmltcG9ydCB7IEpzb25ScGNSZXF1ZXN0U3luYyB9IGZyb20gXCJAL3NlcnZlci9Kc29uUnBjUmVxdWVzdFN5bmNcIjtcbmltcG9ydCB7IExvZ2dlciB9IGZyb20gXCJAL2xvZ2dlclwiO1xuaW1wb3J0IHsgU2NvcGVIZWxwZXIsIFZhcmlhYmxlTWFwIH0gZnJvbSBcIkAvY29yZS9TY29wZVwiO1xuXG5jb25zdCBsb2dnZXIgPSBMb2dnZXIuY3JlYXRlKGltcG9ydC5tZXRhLnVybCk7XG5cbmNvbnN0IE5BTUUgPSBTeW1ib2woXCJSRVFVRVNUXCIpO1xuY29uc3QgUkVRVUVTVCA9IFN5bWJvbChcIlJFUVVFU1RcIik7XG5jb25zdCBTQ09QRSA9IFN5bWJvbChcIlNDT1BFXCIpO1xuXG5leHBvcnQgY2xhc3MgUmVtb3RlRXhlY3V0YWJsZSB7XG4gIFtOQU1FXTogc3RyaW5nO1xuICBbU0NPUEVdOiBWYXJpYWJsZU1hcDtcbiAgW1JFUVVFU1RdOiBKc29uUnBjUmVxdWVzdFN5bmM7XG5cbiAgcHVibGljIGNvbnN0cnVjdG9yKHZhcmlhYmxlTWFwOiBWYXJpYWJsZU1hcCwgbmFtZTogc3RyaW5nLCByZXF1ZXN0U3luYzogSnNvblJwY1JlcXVlc3RTeW5jKSB7XG4gICAgdGhpc1tTQ09QRV0gPSB2YXJpYWJsZU1hcDtcbiAgICB0aGlzW05BTUVdID0gbmFtZTtcbiAgICB0aGlzW1JFUVVFU1RdID0gcmVxdWVzdFN5bmM7XG4gIH1cblxuICBwdWJsaWMgYWRkU291cmNlcyguLi5zb3VyY2VzOiBhbnlbXSkge1xuICAgIHRocm93IG5ldyBFcnJvcihcIk5vdCBJbXBsZW1lbnRlZFwiKTtcbiAgfVxufTtcbiIsIi8qXG4gKiBNSVQgTGljZW5zZVxuICpcbiAqIENvcHlyaWdodCAoYykgMjAyNSAgWXVyaWkgWWFrdWJpbiAoeXVyaWkueWFrdWJpbkBnbWFpbC5jb20pXG4gKlxuICogUGVybWlzc2lvbiBpcyBncmFudGVkIHRvIHVzZSwgY29weSwgbW9kaWZ5LCBhbmQgZGlzdHJpYnV0ZSB0aGlzIHNvZnR3YXJlXG4gKiB1bmRlciB0aGUgTUlUIExpY2Vuc2UuIFNlZSBMSUNFTlNFIGZpbGUgZm9yIGRldGFpbHMuXG4gKi9cblxuaW1wb3J0IHsgSU1ha2VDb250ZXh0IH0gZnJvbSBcIkAvY29yZS9NYWtlSW50ZXJmYWNlc1wiO1xuaW1wb3J0IHsgSW50ZXJmYWNlU2NyaXB0IH0gZnJvbSBcIkAvY29yZS9JbnRlcmZhY2VTY3JpcHRcIjtcbmltcG9ydCB7IE9iamVjdExpYnJhcnksIFN0YXRpY0xpYnJhcnksIFNoYXJlZExpYnJhcnksIEV4ZWN1dGFibGUsIEJhc2VUYXJnZXQsIFVzZXJJbmRpcmVjdFRhcmdldCB9IGZyb20gXCJAL2NvcmUvVGFyZ2V0XCI7XG5pbXBvcnQgeyBDdXN0b21TY3JpcHQgfSBmcm9tIFwiQC9jb3JlL0N1c3RvbVNjcmlwdFwiO1xuaW1wb3J0IHsgY3JlYXRlVmFyaWFibGVNYXBGb3JEaXJlY3RvcnkgfSBmcm9tIFwiQC9jb3JlL0Jhc2VDb250ZXh0XCI7XG5pbXBvcnQgeyBKc29uUnBjUmVxdWVzdFN5bmMgfSBmcm9tIFwiQC9zZXJ2ZXIvSnNvblJwY1JlcXVlc3RTeW5jXCI7XG5pbXBvcnQgeyBSZW1vdGVFeGVjdXRhYmxlIH0gZnJvbSBcIkAvc2VydmVyL1JlbW90ZUV4ZWN1dGFibGVcIjtcbmltcG9ydCB7IFJlbW90ZVN0YXRpY0xpYnJhcnkgfSBmcm9tIFwiQC9zZXJ2ZXIvUmVtb3RlU3RhdGljTGlicmFyeVwiO1xuaW1wb3J0IHsgTUFJTk5PREVfTE9BREpTT04gfSBmcm9tIFwiQC9zZXJ2ZXIvUmVtb3RlTWV0aG9kc1wiO1xuaW1wb3J0IHsgTUFJTk5PREVfRVhFQ1VURVNDUklQVCB9IGZyb20gXCJAL3NlcnZlci9SZW1vdGVNZXRob2RzXCI7XG5pbXBvcnQgeyBNQUlOTk9ERV9TVEFSVE1BS0VTQ1JJUFQgfSBmcm9tIFwiQC9zZXJ2ZXIvUmVtb3RlTWV0aG9kc1wiO1xuaW1wb3J0IHsgTUFJTk5PREVfQUREQ1VTVE9NU0NSSVBUIH0gZnJvbSBcIkAvc2VydmVyL1JlbW90ZU1ldGhvZHNcIjtcbmltcG9ydCB7IE1BSU5OT0RFX0FERFNUQVRJQ0xJQlJBUlkgfSBmcm9tIFwiQC9zZXJ2ZXIvUmVtb3RlTWV0aG9kc1wiO1xuaW1wb3J0IHsgTUFJTk5PREVfQURERVhFQ1VUQUJMRSB9IGZyb20gXCJAL3NlcnZlci9SZW1vdGVNZXRob2RzXCI7XG5pbXBvcnQgeyBMb2dnZXIgfSBmcm9tIFwiQC9sb2dnZXJcIjtcbmltcG9ydCB7IFNjb3BlSGVscGVyLCBWYXJpYWJsZU1hcCwgVmFyaWFudE1hcCB9IGZyb20gXCJAL2NvcmUvU2NvcGVcIjtcbmltcG9ydCB7IENVU1RPTV9WQVJJQUJMRV9HUk9VUCB9IGZyb20gXCJAL0NvbnN0YW50c1wiO1xuaW1wb3J0IHsgQWJzb2x1dGVQYXRoIH0gZnJvbSBcIkAvY29yZS9BYnNvbHV0ZVBhdGhcIjtcblxuY29uc3QgbG9nZ2VyID0gTG9nZ2VyLmNyZWF0ZShpbXBvcnQubWV0YS51cmwpO1xuXG5leHBvcnQgY2xhc3MgUmVtb3RlTWFrZUNvbnRleHQgaW1wbGVtZW50cyBJTWFrZUNvbnRleHQge1xuICBwcml2YXRlIF9zY29wZTogVmFyaWFibGVNYXA7XG4gIHByaXZhdGUgX3RyYW5zcG9ydDogSnNvblJwY1JlcXVlc3RTeW5jO1xuICBwcml2YXRlIF90YXJnZXRzID0gbmV3IE1hcDxzdHJpbmcsIEJhc2VUYXJnZXQ+KCk7XG5cbiAgcHVibGljIGNvbnN0cnVjdG9yKHNjb3BlOiBWYXJpYWJsZU1hcCwgdHJhbnNwb3J0OiBKc29uUnBjUmVxdWVzdFN5bmMpIHtcbiAgICB0aGlzLl9zY29wZSA9IHNjb3BlO1xuICAgIHRoaXMuX3RyYW5zcG9ydCA9IHRyYW5zcG9ydDtcbiAgfVxuXG4gIHB1YmxpYyBnZXQgdGFyZ2V0cygpIHtcbiAgICByZXR1cm4gdGhpcy5fdGFyZ2V0cztcbiAgfVxuXG4gIHB1YmxpYyBleGVjdXRlU2NyaXB0KHNjcmlwdDogYW55LCBwYXJhbXM6IGFueSk6IGFueSB7XG4gICAgY29uc3QgbmV3VmFyaWFibGVNYXAgPSBTY29wZUhlbHBlci5jbG9uZVZhcmlhYmxlTWFwKHRoaXMuX3Njb3BlKTtcbiAgICBwYXJhbXMgJiYgU2NvcGVIZWxwZXIuZXh0ZW5kVmFyaWFibGVNYXBCeVZhbHVlcyhuZXdWYXJpYWJsZU1hcCwgXCJcIiwgcGFyYW1zKTtcbiAgICBjb25zdCBzY3JpcHRGaWxlID0gU2NvcGVIZWxwZXIuZ2V0KG5ld1ZhcmlhYmxlTWFwLCBcIlNPVVJDRV9ESVJcIikucmVzb2x2ZShzY3JpcHQpO1xuICAgIFNjb3BlSGVscGVyLnNldChuZXdWYXJpYWJsZU1hcCwgXCJTQ1JJUFRfRklMRVwiLCBzY3JpcHRGaWxlKTtcbiAgICBTY29wZUhlbHBlci5zZXQobmV3VmFyaWFibGVNYXAsIFwiU0NSSVBUX0RJUlwiLCBzY3JpcHRGaWxlLmRpcm5hbWUoKSk7XG4gICAgcmV0dXJuIHRoaXMuX3RyYW5zcG9ydC5yZXF1ZXN0U3luYyhNQUlOTk9ERV9FWEVDVVRFU0NSSVBULCBTY29wZUhlbHBlci50b0pTT04obmV3VmFyaWFibGVNYXApKTtcbiAgfVxuXG4gIHB1YmxpYyBnZXRDYWNoZVZhcmlhYmxlcygpOiBhbnkge1xuICAgICAgcmV0dXJuIFNjb3BlSGVscGVyLmdldFZhcmlhYmxlc0J5R3JvdXAodGhpcy5fc2NvcGUsIENVU1RPTV9WQVJJQUJMRV9HUk9VUCk7XG4gIH1cbiAgXG4gIHB1YmxpYyBhZGRDYWNoZVZhcmlhYmxlcyhwYXJhbXM6IHN0cmluZyB8IFZhcmlhbnRNYXApOiB2b2lkIHtcbiAgICBsZXQgdmFyaWFibGVzID0gcGFyYW1zO1xuICAgIGlmICh0eXBlb2YgcGFyYW1zID09PSBcInN0cmluZ1wiKSB7XG4gICAgICBjb25zdCBmaWxlbmFtZSA9IFNjb3BlSGVscGVyLmdldCh0aGlzLl9zY29wZSwgXCJTT1VSQ0VfRElSXCIpLnJlc29sdmUocGFyYW1zKS50b1N0cmluZygpO1xuICAgICAgdmFyaWFibGVzID0gdGhpcy5fdHJhbnNwb3J0LnJlcXVlc3RTeW5jKE1BSU5OT0RFX0xPQURKU09OLCBmaWxlbmFtZSk7XG4gICAgfVxuICAgIFNjb3BlSGVscGVyLmRlZmluZVZhcmlhYmxlc0luVmFyaWFibGVNYXAodGhpcy5fc2NvcGUsIENVU1RPTV9WQVJJQUJMRV9HUk9VUCwgdmFyaWFibGVzKTtcbiAgfVxuXG4gIHB1YmxpYyBhZGRJbmNsdWRlRGlyZWN0b3JpZXMoLi4uZGlyczogYW55W10pOiBhbnkge1xuICAgIGNvbnN0IHNvdXJjZURpciA9IFNjb3BlSGVscGVyLmdldCh0aGlzLl9zY29wZSwgXCJTT1VSQ0VfRElSXCIpO1xuICAgIGZvciAoY29uc3QgaXRlciBvZiBkaXJzLmZsYXQoKSlcbiAgICAgIFNjb3BlSGVscGVyLmdldCh0aGlzLl9zY29wZSwgXCJJTkNMVURFU1wiKS5wdXNoKHNvdXJjZURpci5yZXNvbHZlKGl0ZXIpKTtcbiAgfVxuXG4gIHB1YmxpYyBhZGRTdWJkaXJlY3Rvcnkoc291cmNlRGlyOiBzdHJpbmcgfCBBYnNvbHV0ZVBhdGgsIGJpbmFyeURpcj86IHN0cmluZyB8IEFic29sdXRlUGF0aCk6IHZvaWQge1xuICAgIGNvbnN0IG5ld1ZhcmlhYmxlTWFwID0gY3JlYXRlVmFyaWFibGVNYXBGb3JEaXJlY3RvcnkodGhpcy5fc2NvcGUsIHNvdXJjZURpciwgYmluYXJ5RGlyKTtcbiAgICB0aGlzLl90cmFuc3BvcnQucmVxdWVzdFN5bmMoTUFJTk5PREVfU1RBUlRNQUtFU0NSSVBULCBTY29wZUhlbHBlci50b0pTT04obmV3VmFyaWFibGVNYXApKTtcbiAgfVxuXG4gIHB1YmxpYyBhZGRDdXN0b21TY3JpcHQoc2NyaXB0OiBhbnksIHBhcmFtczogYW55KTogQ3VzdG9tU2NyaXB0IHtcbiAgICBsb2dnZXIuZGVidWcoXCJSZW1vdGVNYWtlQ29udGV4dC5hZGRDdXN0b21TY3JpcHQoXCIsIHNjcmlwdCwgcGFyYW1zLCBcIilcIik7XG4gICAgY29uc3QgbmV3VmFyaWFibGVNYXAgPSBTY29wZUhlbHBlci5jbG9uZVZhcmlhYmxlTWFwKHRoaXMuX3Njb3BlKTtcbiAgICBTY29wZUhlbHBlci5leHRlbmRWYXJpYWJsZU1hcEJ5VmFsdWVzKG5ld1ZhcmlhYmxlTWFwLCBDVVNUT01fVkFSSUFCTEVfR1JPVVAsIHBhcmFtcyk7XG4gICAgU2NvcGVIZWxwZXIuc2V0KG5ld1ZhcmlhYmxlTWFwLCBcIlNDUklQVF9NT0RVTEVcIiwgc2NyaXB0KTtcbiAgICByZXR1cm4gdGhpcy5fdHJhbnNwb3J0LnJlcXVlc3RTeW5jKE1BSU5OT0RFX0FERENVU1RPTVNDUklQVCwgU2NvcGVIZWxwZXIudG9KU09OKG5ld1ZhcmlhYmxlTWFwKSk7XG4gIH1cblxuICBwdWJsaWMgdGFyZ2V0KG5hbWU6IHN0cmluZyk6IFVzZXJJbmRpcmVjdFRhcmdldCB7XG4gICAgdGhyb3cgbmV3IEVycm9yKFwiTm90IEltcGxlbWVudGVkXCIpO1xuICB9XG5cbiAgcHVibGljIHNjcmlwdChuYW1lOiBzdHJpbmcpOiBJbnRlcmZhY2VTY3JpcHQge1xuICAgIHRocm93IG5ldyBFcnJvcihcIk5vdCBJbXBsZW1lbnRlZFwiKTtcbiAgfVxuICBcbiAgcHVibGljIGluc3RhbGwodmFsdWU6IGFueSwgcGFyYW1zOiBhbnkpOiB2b2lkIHtcbiAgICB0aHJvdyBuZXcgRXJyb3IoXCJOb3QgSW1wbGVtZW50ZWRcIik7XG4gIH1cblxuICBwdWJsaWMgYWRkT2JqZWN0TGlicmFyeShuYW1lOiBhbnksIC4uLnNvdXJjZXM6IGFueVtdKTogT2JqZWN0TGlicmFyeSB7XG4gICAgdGhyb3cgbmV3IEVycm9yKFwiTm90IEltcGxlbWVudGVkXCIpO1xuICB9XG5cbiAgcHVibGljIGFkZFN0YXRpY0xpYnJhcnkobmFtZTogYW55LCAuLi5zb3VyY2VzOiBhbnlbXSk6IFN0YXRpY0xpYnJhcnkge1xuICAgIGxvZ2dlci5kZWJ1ZyhcIlJlbW90ZU1ha2VDb250ZXh0LmFkZFN0YXRpY0xpYnJhcnkoXCIsIG5hbWUsIFwiKVwiKTtcbiAgICBjb25zdCBuZXdWYXJpYWJsZU1hcCA9IFNjb3BlSGVscGVyLmNsb25lVmFyaWFibGVNYXAodGhpcy5fc2NvcGUpO1xuICAgIGNvbnN0IHV1aWQgPSB0aGlzLl90cmFuc3BvcnQucmVxdWVzdFN5bmMoTUFJTk5PREVfQUREU1RBVElDTElCUkFSWSwge1xuICAgICAgbmFtZSwgdmFyaWFibGVNYXA6IFNjb3BlSGVscGVyLnRvSlNPTih0aGlzLl9zY29wZSksXG4gICAgfSk7XG4gICAgY29uc3QgdGFyZ2V0ID0gbmV3IFJlbW90ZVN0YXRpY0xpYnJhcnkobmV3VmFyaWFibGVNYXAsIHV1aWQsIHRoaXMuX3RyYW5zcG9ydCk7XG4gICAgdGhpcy5fdGFyZ2V0cy5zZXQobmFtZSwgdGFyZ2V0IGFzIGFueSk7XG4gICAgdGFyZ2V0LmFkZFNvdXJjZXMoLi4uc291cmNlcyk7XG4gICAgcmV0dXJuIHRhcmdldCBhcyBhbnk7XG4gIH1cblxuICBwdWJsaWMgYWRkU2hhcmVkTGlicmFyeShuYW1lOiBhbnksIC4uLnNvdXJjZXM6IGFueVtdKTogU2hhcmVkTGlicmFyeSB7XG4gICAgdGhyb3cgbmV3IEVycm9yKFwiTm90IEltcGxlbWVudGVkXCIpO1xuICB9XG5cbiAgcHVibGljIGFkZEV4ZWN1dGFibGUobmFtZTogc3RyaW5nLCAuLi5zb3VyY2VzOiBhbnlbXSk6IEV4ZWN1dGFibGUge1xuICAgIGxvZ2dlci5kZWJ1ZyhcIlJlbW90ZU1ha2VDb250ZXh0LmFkZEV4ZWN1dGFibGUoXCIsIG5hbWUsIFwiKVwiKTtcbiAgICBjb25zdCBuZXdWYXJpYWJsZU1hcCA9IFNjb3BlSGVscGVyLmNsb25lVmFyaWFibGVNYXAodGhpcy5fc2NvcGUpO1xuICAgIGNvbnN0IHV1aWQgPSB0aGlzLl90cmFuc3BvcnQucmVxdWVzdFN5bmMoTUFJTk5PREVfQURERVhFQ1VUQUJMRSwge1xuICAgICAgbmFtZSwgdmFyaWFibGVNYXA6IFNjb3BlSGVscGVyLnRvSlNPTih0aGlzLl9zY29wZSksXG4gICAgfSk7XG4gICAgY29uc3QgdGFyZ2V0ID0gbmV3IFJlbW90ZUV4ZWN1dGFibGUobmV3VmFyaWFibGVNYXAsIHV1aWQsIHRoaXMuX3RyYW5zcG9ydCk7XG4gICAgdGhpcy5fdGFyZ2V0cy5zZXQobmFtZSwgdGFyZ2V0IGFzIGFueSk7XG4gICAgdGFyZ2V0LmFkZFNvdXJjZXMoLi4uc291cmNlcyk7XG4gICAgcmV0dXJuIHRhcmdldCBhcyBhbnk7XG4gIH1cbn07XG4iLCIvKlxuICogTUlUIExpY2Vuc2VcbiAqXG4gKiBDb3B5cmlnaHQgKGMpIDIwMjUgIFl1cmlpIFlha3ViaW4gKHl1cmlpLnlha3ViaW5AZ21haWwuY29tKVxuICpcbiAqIFBlcm1pc3Npb24gaXMgZ3JhbnRlZCB0byB1c2UsIGNvcHksIG1vZGlmeSwgYW5kIGRpc3RyaWJ1dGUgdGhpcyBzb2Z0d2FyZVxuICogdW5kZXIgdGhlIE1JVCBMaWNlbnNlLiBTZWUgTElDRU5TRSBmaWxlIGZvciBkZXRhaWxzLlxuICovXG5cbmV4cG9ydCBjb25zdCBXT1JLRVJOT0RFX1NUQVJUTUFLRVNDUklQVCA9IFwiV29ya2VyTm9kZS5zdGFydE1ha2VTY3JpcHRcIjtcblxuZXhwb3J0IGNvbnN0IE1BSU5OT0RFX0xPQURKU09OID0gXCJNYWluTm9kZS5sb2FkSlNPTlwiO1xuZXhwb3J0IGNvbnN0IE1BSU5OT0RFX0VYRUNVVEVTQ1JJUFQgPSBcIk1haW5Ob2RlLmV4ZWN1dGVTY3JpcHRcIjtcbmV4cG9ydCBjb25zdCBNQUlOTk9ERV9TVEFSVE1BS0VTQ1JJUFQgPSBcIk1haW5Ob2RlLnN0YXJ0TWFrZVNjcmlwdFwiO1xuZXhwb3J0IGNvbnN0IE1BSU5OT0RFX0FERENVU1RPTVNDUklQVCA9IFwiTWFpbk5vZGUuYWRkQ3VzdG9tU2NyaXB0XCI7XG5leHBvcnQgY29uc3QgTUFJTk5PREVfQURERVhFQ1VUQUJMRSA9IFwiTWFpbk5vZGUuYWRkRXhlY3V0YWJsZVwiO1xuZXhwb3J0IGNvbnN0IE1BSU5OT0RFX0FERFNUQVRJQ0xJQlJBUlkgPSBcIk1haW5Ob2RlLmFkZFN0YXRpY0xpYnJhcnlcIjtcbmV4cG9ydCBjb25zdCBNQUlOTk9ERV9UQVJHRVRTT1VSQ0VTID0gXCJNYWluTm9kZS50YXJnZXRTb3VyY2VzXCI7XG4iLCIvKlxuICogTUlUIExpY2Vuc2VcbiAqXG4gKiBDb3B5cmlnaHQgKGMpIDIwMjUgIFl1cmlpIFlha3ViaW4gKHl1cmlpLnlha3ViaW5AZ21haWwuY29tKVxuICpcbiAqIFBlcm1pc3Npb24gaXMgZ3JhbnRlZCB0byB1c2UsIGNvcHksIG1vZGlmeSwgYW5kIGRpc3RyaWJ1dGUgdGhpcyBzb2Z0d2FyZVxuICogdW5kZXIgdGhlIE1JVCBMaWNlbnNlLiBTZWUgTElDRU5TRSBmaWxlIGZvciBkZXRhaWxzLlxuICovXG5cbmltcG9ydCB7IEpzb25ScGNSZXF1ZXN0U3luYyB9IGZyb20gXCJAL3NlcnZlci9Kc29uUnBjUmVxdWVzdFN5bmNcIjtcbmltcG9ydCB7IExvZ2dlciB9IGZyb20gXCJAL2xvZ2dlclwiO1xuaW1wb3J0IHsgU2NvcGVIZWxwZXIsIFZhcmlhYmxlTWFwIH0gZnJvbSBcIkAvY29yZS9TY29wZVwiO1xuaW1wb3J0IHsgTUFJTk5PREVfVEFSR0VUU09VUkNFUyB9IGZyb20gXCJAL3NlcnZlci9SZW1vdGVNZXRob2RzXCI7XG5cbmNvbnN0IGxvZ2dlciA9IExvZ2dlci5jcmVhdGUoaW1wb3J0Lm1ldGEudXJsKTtcblxuY29uc3QgTkFNRSA9IFN5bWJvbChcIlJFUVVFU1RcIik7XG5jb25zdCBSRVFVRVNUID0gU3ltYm9sKFwiUkVRVUVTVFwiKTtcbmNvbnN0IFNDT1BFID0gU3ltYm9sKFwiU0NPUEVcIik7XG5cbmV4cG9ydCBjbGFzcyBSZW1vdGVTdGF0aWNMaWJyYXJ5IHtcbiAgW05BTUVdOiBzdHJpbmc7XG4gIFtTQ09QRV06IFZhcmlhYmxlTWFwO1xuICBbUkVRVUVTVF06IEpzb25ScGNSZXF1ZXN0U3luYztcblxuICBwdWJsaWMgY29uc3RydWN0b3IodmFyaWFibGVNYXA6IFZhcmlhYmxlTWFwLCBuYW1lOiBzdHJpbmcsIHJlcXVlc3RTeW5jOiBKc29uUnBjUmVxdWVzdFN5bmMpIHtcbiAgICB0aGlzW1NDT1BFXSA9IHZhcmlhYmxlTWFwO1xuICAgIHRoaXNbTkFNRV0gPSBuYW1lO1xuICAgIHRoaXNbUkVRVUVTVF0gPSByZXF1ZXN0U3luYztcbiAgfVxuXG4gIHB1YmxpYyBhZGRTb3VyY2VzKC4uLnNvdXJjZXM6IGFueVtdKSB7XG4gICAgbG9nZ2VyLmRlYnVnKFwiUmVtb3RlU3RhdGljTGlicmFyeS5hZGRTb3VyY2VzKFwiLCBzb3VyY2VzLmxlbmd0aCwgXCIpXCIpO1xuICAgIGlmIChzb3VyY2VzLmxlbmd0aCkge1xuICAgICAgdGhpc1tSRVFVRVNUXS5yZXF1ZXN0U3luYyhNQUlOTk9ERV9UQVJHRVRTT1VSQ0VTLCBzb3VyY2VzKTtcbiAgICB9XG4gIH1cbn07XG4iLCIvKlxuICogTUlUIExpY2Vuc2VcbiAqXG4gKiBDb3B5cmlnaHQgKGMpIDIwMjUgIFl1cmlpIFlha3ViaW4gKHl1cmlpLnlha3ViaW5AZ21haWwuY29tKVxuICpcbiAqIFBlcm1pc3Npb24gaXMgZ3JhbnRlZCB0byB1c2UsIGNvcHksIG1vZGlmeSwgYW5kIGRpc3RyaWJ1dGUgdGhpcyBzb2Z0d2FyZVxuICogdW5kZXIgdGhlIE1JVCBMaWNlbnNlLiBTZWUgTElDRU5TRSBmaWxlIGZvciBkZXRhaWxzLlxuICovXG5cbmV4cG9ydCBjb25zdCBKU09OUlBDX1ZFUlNJT04gPSBcIjIuMFwiO1xuZXhwb3J0IGludGVyZmFjZSBJTWVzc2FnZVNlbmRlciB7XG4gIHNlbmRNZXNzYWdlKG1lc3NhZ2U6IGFueSk6IHZvaWQ7XG59O1xuXG5leHBvcnQgaW50ZXJmYWNlIElNZXNzYWdlRW1pdHRlciB7XG4gIGVtaXRNZXNzYWdlKHNlbmRlcjogSU1lc3NhZ2VTZW5kZXIsIG1lc3NhZ2U6IGFueSk6IHZvaWQ7XG59O1xuXG5leHBvcnQgaW50ZXJmYWNlIElSZXF1ZXN0U3luYyB7XG4gIHJlcXVlc3RTeW5jKGRhdGE6IGFueSk6IGFueTtcbn07XG5cbmV4cG9ydCBpbnRlcmZhY2UgSUpzb25ScGNSZWNpdmVyIHtcbiAgb25SZXF1ZXN0KG1ldGhvZDogc3RyaW5nLCBpZDogbnVtYmVyLCBwYXJhbXM/OiBhbnkpOiB2b2lkO1xuICBvblJlc3VsdChyZXN1bHQ6IGFueSwgaWQ6IG51bWJlcik6IHZvaWQ7XG4gIG9uRXJyb3IoZXJyb3I6IG9iamVjdCwgaWQ6IG51bWJlciB8IG51bGwpOiB2b2lkO1xuICBvbk5vdGlmaWNhdGlvbihtZXRob2Q6IHN0cmluZywgcGFyYW1zPzogYW55KTogdm9pZDtcbn07XG5cbmV4cG9ydCBpbnRlcmZhY2UgSUpzb25ScGNTZW5kZXIge1xuICAvLyBzZW5kTWV0aG9kKG1ldGhvZDogc3RyaW5nLCBwYXJhbXM/OiBhbnksIGNhbGxiYWNrOiAoKSk6IHZvaWQ7XG59O1xuXG5leHBvcnQgaW50ZXJmYWNlIEpzb25ScGNEYXRhIHtcbiAganNvbnJwYzogc3RyaW5nO1xuICBtZXRob2Q/OiBzdHJpbmc7XG4gIHBhcmFtcz86IGFueTtcbiAgaWQ/OiBudW1iZXI7XG4gIGVycm9yPzoge1xuICAgIGNvZGU6IG51bWJlcixcbiAgICBtZXNzYWdlOiBzdHJpbmcsXG4gICAgZGF0YT86IGFueSxcbiAgfSxcbiAgcmVzdWx0PzogYW55O1xufTtcblxuZXhwb3J0IHR5cGUgSnNvblJwY1JlcXVlc3RIYW5kbGVyID0gKHJlcXVlc3Q6IElKc29uUnBjUmVxdWVzdCwgcmVzcG9uc2U6IElKc29uUnBjUmVzcG9uc2UpID0+IHZvaWQ7XG5leHBvcnQgdHlwZSBKc29uUnBjQ2FsbGJhY2sgPSAocGFyYW1zOiBhbnkpID0+IGFueTtcblxuZXhwb3J0IGludGVyZmFjZSBJSnNvblJwY1JlcXVlc3Qge1xuICBnZXQgcGFyYW1zKCk6IGFueTtcbn07XG5cbmV4cG9ydCBpbnRlcmZhY2UgSUpzb25ScGNSZXNwb25zZSB7XG4gIHNlbmRSZXN1bHQoanNvbjogYW55KTogdm9pZDtcbn07XG4iLCIvKlxuICogTUlUIExpY2Vuc2VcbiAqXG4gKiBDb3B5cmlnaHQgKGMpIDIwMjUgIFl1cmlpIFlha3ViaW4gKHl1cmlpLnlha3ViaW5AZ21haWwuY29tKVxuICpcbiAqIFBlcm1pc3Npb24gaXMgZ3JhbnRlZCB0byB1c2UsIGNvcHksIG1vZGlmeSwgYW5kIGRpc3RyaWJ1dGUgdGhpcyBzb2Z0d2FyZVxuICogdW5kZXIgdGhlIE1JVCBMaWNlbnNlLiBTZWUgTElDRU5TRSBmaWxlIGZvciBkZXRhaWxzLlxuICovXG5cbmltcG9ydCB7IElNZXNzYWdlU2VuZGVyLCBJTWVzc2FnZUVtaXR0ZXIgfSBmcm9tIFwiQC9zZXJ2ZXIvVHJhbnNwb3J0XCI7XG5pbXBvcnQgeyBNZW1vcnlUcmFuc3BvcnQgfSBmcm9tIFwiQC9zZXJ2ZXIvTWVtb3J5VHJhbnNwb3J0XCI7XG5pbXBvcnQgeyBKc29uUnBjU2VydmVyIH0gZnJvbSBcIkAvc2VydmVyL0pzb25ScGNTZXJ2ZXJcIjtcbmltcG9ydCB7IFdvcmtlck5vZGUgfSBmcm9tIFwiQC9zZXJ2ZXIvV29ya2VyTm9kZVwiO1xuaW1wb3J0IHsgV09SS0VSTk9ERV9TVEFSVE1BS0VTQ1JJUFQgfSBmcm9tIFwiQC9zZXJ2ZXIvUmVtb3RlTWV0aG9kc1wiO1xuaW1wb3J0IHsgTG9nZ2VyIH0gZnJvbSBcIkAvbG9nZ2VyXCI7XG5cbmNvbnN0IGxvZ2dlciA9IExvZ2dlci5jcmVhdGUoaW1wb3J0Lm1ldGEudXJsKTtcblxuZXhwb3J0IGNsYXNzIFdvcmtlckxvb3BlciBpbXBsZW1lbnRzIElNZXNzYWdlRW1pdHRlciB7XG4gIHByaXZhdGUgX2pzb25ycGNTZXJ2ZXI6IEpzb25ScGNTZXJ2ZXI7XG5cbiAgcHVibGljIGNvbnN0cnVjdG9yKHNlbmRlcjogSU1lc3NhZ2VTZW5kZXIpIHtcbiAgICB0aGlzLl9qc29ucnBjU2VydmVyID0gbmV3IEpzb25ScGNTZXJ2ZXI7XG5cbiAgICBjb25zdCBidWZmZXIgPSBuZXcgU2hhcmVkQXJyYXlCdWZmZXIoMHg4MDAwKTtcbiAgICBjb25zdCB0cmFuc3BvcnQgPSBuZXcgTWVtb3J5VHJhbnNwb3J0KHNlbmRlciwgYnVmZmVyKTtcblxuICAgIGNvbnN0IHdvcmtlck5vZGUgPSBuZXcgV29ya2VyTm9kZSh0cmFuc3BvcnQpO1xuICAgIHRoaXMuX2pzb25ycGNTZXJ2ZXIucmVnaXN0ZXJDYWxsYmFjayhXT1JLRVJOT0RFX1NUQVJUTUFLRVNDUklQVCwgcGFyYW1zID0+IHdvcmtlck5vZGUuZXhlY01ha2VTY3JpcHQocGFyYW1zKSk7XG4gIH1cblxuICBwdWJsaWMgZW1pdE1lc3NhZ2Uoc2VuZGVyOiBJTWVzc2FnZVNlbmRlciwgbWVzc2FnZTogYW55KTogdm9pZCB7XG4gICAgcmV0dXJuIHRoaXMuX2pzb25ycGNTZXJ2ZXIuZW1pdE1lc3NhZ2Uoc2VuZGVyLCBtZXNzYWdlKTtcbiAgfVxufTtcbiIsIi8qXG4gKiBNSVQgTGljZW5zZVxuICpcbiAqIENvcHlyaWdodCAoYykgMjAyNSAgWXVyaWkgWWFrdWJpbiAoeXVyaWkueWFrdWJpbkBnbWFpbC5jb20pXG4gKlxuICogUGVybWlzc2lvbiBpcyBncmFudGVkIHRvIHVzZSwgY29weSwgbW9kaWZ5LCBhbmQgZGlzdHJpYnV0ZSB0aGlzIHNvZnR3YXJlXG4gKiB1bmRlciB0aGUgTUlUIExpY2Vuc2UuIFNlZSBMSUNFTlNFIGZpbGUgZm9yIGRldGFpbHMuXG4gKi9cblxuaW1wb3J0IHsgSVJlcXVlc3RTeW5jIH0gZnJvbSBcIkAvc2VydmVyL1RyYW5zcG9ydFwiO1xuaW1wb3J0IHsgSnNvblJwY1JlcXVlc3RTeW5jIH0gZnJvbSBcIkAvc2VydmVyL0pzb25ScGNSZXF1ZXN0U3luY1wiO1xuaW1wb3J0IHsgUmVtb3RlTWFrZUNvbnRleHQgfSBmcm9tIFwiQC9zZXJ2ZXIvUmVtb3RlTWFrZUNvbnRleHRcIjtcbmltcG9ydCB7IFVzZXJNYWtlQ29udGV4dCB9IGZyb20gXCJAL2NvcmUvVXNlck1ha2VDb250ZXh0XCI7XG5pbXBvcnQgeyBwZXJmb3JtQ29udGV4dCB9IGZyb20gXCJAL2NvcmUvQmFzZUNvbnRleHRcIjtcbmltcG9ydCB7IFNjb3BlSGVscGVyIH0gZnJvbSBcIkAvY29yZS9TY29wZVwiO1xuXG5leHBvcnQgY2xhc3MgV29ya2VyTm9kZSB7XG4gIHByaXZhdGUgX3RyYW5zcG9ydDogSnNvblJwY1JlcXVlc3RTeW5jO1xuXG4gIHB1YmxpYyBjb25zdHJ1Y3RvcihyZXF1ZXN0U3luYzogSVJlcXVlc3RTeW5jKSB7XG4gICAgdGhpcy5fdHJhbnNwb3J0ID0gbmV3IEpzb25ScGNSZXF1ZXN0U3luYyhyZXF1ZXN0U3luYyk7XG4gIH1cblxuICBwdWJsaWMgYXN5bmMgZXhlY01ha2VTY3JpcHQocGFyYW1zOiBhbnkpOiBQcm9taXNlPHZvaWQ+IHtcbiAgICBjb25zdCB2YXJpYWJsZU1hcCA9IFNjb3BlSGVscGVyLmZyb21KU09OKHBhcmFtcyk7XG5cbiAgICBjb25zdCBtayA9IFVzZXJNYWtlQ29udGV4dC5jcmVhdGUobmV3IFJlbW90ZU1ha2VDb250ZXh0KHZhcmlhYmxlTWFwLCB0aGlzLl90cmFuc3BvcnQpLCB2YXJpYWJsZU1hcCk7XG4gICAgYXdhaXQgcGVyZm9ybUNvbnRleHQobWspO1xuICB9XG59O1xuIiwiLypcbiAqIE1JVCBMaWNlbnNlXG4gKlxuICogQ29weXJpZ2h0IChjKSAyMDI1ICBZdXJpaSBZYWt1YmluICh5dXJpaS55YWt1YmluQGdtYWlsLmNvbSlcbiAqXG4gKiBQZXJtaXNzaW9uIGlzIGdyYW50ZWQgdG8gdXNlLCBjb3B5LCBtb2RpZnksIGFuZCBkaXN0cmlidXRlIHRoaXMgc29mdHdhcmVcbiAqIHVuZGVyIHRoZSBNSVQgTGljZW5zZS4gU2VlIExJQ0VOU0UgZmlsZSBmb3IgZGV0YWlscy5cbiAqL1xuXG5pbXBvcnQgeyBXb3JrZXIgfSBmcm9tIFwibm9kZTp3b3JrZXJfdGhyZWFkc1wiO1xuaW1wb3J0IHsgSU1lc3NhZ2VTZW5kZXIgfSBmcm9tIFwiQC9zZXJ2ZXIvVHJhbnNwb3J0XCI7XG5pbXBvcnQgeyBMb2dnZXIgfSBmcm9tIFwiQC9sb2dnZXJcIjtcblxuY29uc3QgbG9nZ2VyID0gTG9nZ2VyLmNyZWF0ZShpbXBvcnQubWV0YS51cmwpO1xuXG5leHBvcnQgY2xhc3MgV29ya2VyU2VuZGVyIGltcGxlbWVudHMgSU1lc3NhZ2VTZW5kZXIge1xuICBwcml2YXRlIF93b3JrZXI6IFdvcmtlcjtcblxuICBwdWJsaWMgY29uc3RydWN0b3Iod29ya2VyOiBXb3JrZXIpIHtcbiAgICB0aGlzLl93b3JrZXIgPSB3b3JrZXI7XG4gIH1cblxuICBwdWJsaWMgc2VuZE1lc3NhZ2UobWVzc2FnZTogYW55KTogdm9pZCB7XG4gICAgbG9nZ2VyLmRlYnVnKFwiPC0tXCIsIG1lc3NhZ2UpO1xuICAgIHRoaXMuX3dvcmtlci5wb3N0TWVzc2FnZShtZXNzYWdlKTtcbiAgfVxufTtcbiIsIi8qXG4gKiBNSVQgTGljZW5zZVxuICpcbiAqIENvcHlyaWdodCAoYykgMjAyNSAgWXVyaWkgWWFrdWJpbiAoeXVyaWkueWFrdWJpbkBnbWFpbC5jb20pXG4gKlxuICogUGVybWlzc2lvbiBpcyBncmFudGVkIHRvIHVzZSwgY29weSwgbW9kaWZ5LCBhbmQgZGlzdHJpYnV0ZSB0aGlzIHNvZnR3YXJlXG4gKiB1bmRlciB0aGUgTUlUIExpY2Vuc2UuIFNlZSBMSUNFTlNFIGZpbGUgZm9yIGRldGFpbHMuXG4gKi9cblxuZXhwb3J0IG5hbWVzcGFjZSBBcmdzIHtcblxuZnVuY3Rpb24gdG9PcHRpb25LZXkobmFtZTogc3RyaW5nKSB7XG4gIGlmICghbmFtZS5zdGFydHNXaXRoKFwiLS1cIikpXG4gICAgcmV0dXJuIG51bGw7XG5cbiAgbmFtZSA9IG5hbWUuc3Vic3RyaW5nKDIpLnRvTG93ZXJDYXNlKCk7XG4gIGlmICghbmFtZS5sZW5ndGgpXG4gICAgcmV0dXJuIG51bGw7XG5cbiAgbGV0IGtleSA9IG5hbWUuY2hhckF0KDApO1xuICBpZiAoIWtleS5tYXRjaCgvW2Etel0vKSlcbiAgICByZXR1cm4gbnVsbDtcblxuICBsZXQgaHlwaGVuID0gMDtcbiAgZm9yIChsZXQgaSA9IDE7IGkgPCBuYW1lLmxlbmd0aDsgaSsrKSB7XG4gICAgY29uc3QgY2ggPSBuYW1lLmNoYXJBdChpKTtcbiAgICBpZiAoY2gubWF0Y2goL1thLXowLTldLykpIHtcbiAgICAgIGtleSArPSAoaHlwaGVuID8gY2gudG9VcHBlckNhc2UoKSA6IGNoKVxuICAgICAgaHlwaGVuID0gMDtcbiAgICB9XG4gICAgZWxzZSBpZiAoY2ggPT0gXCItXCIpIHtcbiAgICAgIGlmICgrK2h5cGhlbiA+IDEpXG4gICAgICAgIHJldHVybiBudWxsO1xuICAgIH1cbiAgfVxuXG4gIHJldHVybiBoeXBoZW4gPyBudWxsIDoga2V5O1xufVxuXG5leHBvcnQgZnVuY3Rpb24gdG9PYmplY3QoYXJnczogc3RyaW5nW10pOiBvYmplY3Qge1xuICBjb25zdCByZXN1bHQ6IGFueSA9IHt9O1xuXG4gIGxldCBsYXN0S2V5ID0gbnVsbDtcbiAgZm9yIChjb25zdCBpdGVyIG9mIGFyZ3MpIHtcbiAgICBpZiAoaXRlci5zdGFydHNXaXRoKFwiLS1cIikpIHtcbiAgICAgIGNvbnN0IGtleSA9IHRvT3B0aW9uS2V5KGl0ZXIpO1xuICAgICAgaWYgKCFrZXkpXG4gICAgICAgIHRocm93IEVycm9yKGBPcHRpb24gJHtpdGVyfSBpcyBub3Qgc3VwcG9ydGVkYCk7XG4gICAgICBpZiAocmVzdWx0Lmhhc093blByb3BlcnR5KGtleSkpXG4gICAgICAgIHRocm93IEVycm9yKGBDYW5ub3Qgc3BlY2lmeSB0aGUgc2FtZSBvcHRpb24gJyR7aXRlcn0nIG1vcmUgdGhhbiBvbmNlYCk7XG4gICAgICBsYXN0S2V5ID0ga2V5O1xuICAgICAgcmVzdWx0W2tleV0gPSB0cnVlO1xuICAgIH1cbiAgICBlbHNlIGlmIChsYXN0S2V5KSB7XG4gICAgICBjb25zdCB2YWx1ZSA9IHJlc3VsdFtsYXN0S2V5XTtcbiAgICAgIGlmICh0eXBlb2YgdmFsdWUgPT09ICdib29sZWFuJylcbiAgICAgICAgcmVzdWx0W2xhc3RLZXldID0gaXRlcjtcbiAgICAgIGVsc2UgaWYgKHR5cGVvZiB2YWx1ZSA9PT0gJ3N0cmluZycpXG4gICAgICAgIHJlc3VsdFtsYXN0S2V5XSA9IFsgdmFsdWUsIGl0ZXIgXTtcbiAgICAgIGVsc2VcbiAgICAgICAgdmFsdWUucHVzaChpdGVyKTtcbiAgICB9XG4gICAgZWxzZSB7XG4gICAgICB0aHJvdyBFcnJvcihgTmVlZCB0byBzcGVjaWZ5IHRoZSBvcHRpb24gbmFtZSBiZWZvcmUgJyR7aXRlcn0nIHBhcmFtZXRlcmApO1xuICAgIH1cbiAgfVxuXG4gIHJldHVybiByZXN1bHQ7XG59XG5cbn0gLy8gbmFtZXNwYWNlIEFyZ3NcbiIsIi8qXG4gKiBNSVQgTGljZW5zZVxuICpcbiAqIENvcHlyaWdodCAoYykgMjAyNSAgWXVyaWkgWWFrdWJpbiAoeXVyaWkueWFrdWJpbkBnbWFpbC5jb20pXG4gKlxuICogUGVybWlzc2lvbiBpcyBncmFudGVkIHRvIHVzZSwgY29weSwgbW9kaWZ5LCBhbmQgZGlzdHJpYnV0ZSB0aGlzIHNvZnR3YXJlXG4gKiB1bmRlciB0aGUgTUlUIExpY2Vuc2UuIFNlZSBMSUNFTlNFIGZpbGUgZm9yIGRldGFpbHMuXG4gKi9cblxuaW1wb3J0IHBhdGggZnJvbSBcIm5vZGU6cGF0aFwiO1xuaW1wb3J0IGZzIGZyb20gXCJub2RlOmZzXCI7XG5pbXBvcnQgeyBzcGF3biB9IGZyb20gXCJub2RlOmNoaWxkX3Byb2Nlc3NcIjtcbmltcG9ydCB7IExvZ2dlciB9IGZyb20gXCJAL2xvZ2dlclwiO1xuXG5jb25zdCBsb2dnZXIgPSBMb2dnZXIuY3JlYXRlKGltcG9ydC5tZXRhLnVybCk7XG5cbnR5cGUgUmVzdWx0ID0ge1xuICBzdGF0dXM6IG51bWJlcjtcbn07XG5cbmV4cG9ydCBmdW5jdGlvbiBzcGF3bkFzeW5jKGNvbW1hbmQ6IHN0cmluZywgYXJnczogc3RyaW5nW10sIG9wdGlvbnM/OiBhbnkpOiBQcm9taXNlPFJlc3VsdD4ge1xuICBsZXQgZmQgPSBudWxsO1xuICBsZXQgdmVyYm9zZSA9IGZhbHNlO1xuICBpZiAob3B0aW9ucyAmJiBvcHRpb25zLmV4dHJhKSB7XG4gICAgaWYgKG9wdGlvbnMuZXh0cmEudmVyYm9zZSlcbiAgICAgIHZlcmJvc2UgPSB0cnVlO1xuICAgIGlmIChvcHRpb25zLmV4dHJhLm91dHB1dCkge1xuICAgICAgbGV0IGxvZ2ZpbGUgPSBvcHRpb25zLmV4dHJhLm91dHB1dDtcbiAgICAgIGlmICghcGF0aC5pc0Fic29sdXRlKGxvZ2ZpbGUpICYmIG9wdGlvbnMuY3dkKSB7XG4gICAgICAgIGxvZ2ZpbGUgPSBwYXRoLnJlc29sdmUob3B0aW9ucy5jd2QsIGxvZ2ZpbGUpO1xuICAgICAgfVxuICAgICAgZmQgPSBmcy5vcGVuU3luYyhsb2dmaWxlLCBcIncrXCIsIDBvNjY2KTtcbiAgICB9XG4gIH1cbiAgcmV0dXJuIG5ldyBQcm9taXNlKChyZXNvbHZlLCByZWplY3QpID0+IHtcbiAgICBpZiAoZmQgfHwgdmVyYm9zZSkge1xuICAgICAgdmVyYm9zZSAmJiBsb2dnZXIubm90aWNlKFsgcGF0aC5iYXNlbmFtZShjb21tYW5kKSwgLi4uYXJncyBdLmpvaW4oXCIgXCIpKTtcbiAgICAgIGZkICYmIGZzLndyaXRlU3luYyhmZCwgSlNPTi5zdHJpbmdpZnkoe2NvbW1hbmQsIGFyZ3MsIG9wdGlvbnMgfSwgbnVsbCwgMikgKyBcIlxcblwiKTtcbiAgICB9XG4gICAgY29uc3QgZXhlYyA9IHNwYXduKGNvbW1hbmQsIGFyZ3MsIG9wdGlvbnMpO1xuICAgIGV4ZWMuc3Rkb3V0Lm9uKFwiZGF0YVwiLCAoZGF0YSkgPT4ge1xuICAgICAgcHJvY2Vzcy5zdGRvdXQud3JpdGUoZGF0YSk7XG4gICAgICBmZCAmJiBmcy53cml0ZVN5bmMoZmQsIGRhdGEpO1xuICAgIH0pO1xuICAgIGV4ZWMuc3RkZXJyLm9uKFwiZGF0YVwiLCAoZGF0YSkgPT4ge1xuICAgICAgcHJvY2Vzcy5zdGRlcnIud3JpdGUoZGF0YSk7XG4gICAgICBmZCAmJiBmcy53cml0ZVN5bmMoZmQsIGRhdGEpO1xuICAgIH0pO1xuICAgIGV4ZWMub24oXCJjbG9zZVwiLCAoc3RhdHVzOiBudW1iZXIpID0+IHtcbiAgICAgIGZkICYmIGZzLmNsb3NlU3luYyhmZCk7XG4gICAgICByZXNvbHZlKHtzdGF0dXN9KTtcbiAgICB9KTtcbiAgfSk7XG59XG4iLCIvKlxuICogTUlUIExpY2Vuc2VcbiAqXG4gKiBDb3B5cmlnaHQgKGMpIDIwMjUgIFl1cmlpIFlha3ViaW4gKHl1cmlpLnlha3ViaW5AZ21haWwuY29tKVxuICpcbiAqIFBlcm1pc3Npb24gaXMgZ3JhbnRlZCB0byB1c2UsIGNvcHksIG1vZGlmeSwgYW5kIGRpc3RyaWJ1dGUgdGhpcyBzb2Z0d2FyZVxuICogdW5kZXIgdGhlIE1JVCBMaWNlbnNlLiBTZWUgTElDRU5TRSBmaWxlIGZvciBkZXRhaWxzLlxuICovXG5cbmltcG9ydCBmcyBmcm9tIFwibm9kZTpmc1wiO1xuaW1wb3J0IHBhdGggZnJvbSBcIm5vZGU6cGF0aFwiO1xuaW1wb3J0IHVybCBmcm9tIFwibm9kZTp1cmxcIjtcblxuaW1wb3J0IHsgRklMRV9TQ0hFTUUsIElNUE9SVF9TQ0hFTUUsIEhUVFBfU0NIRU1FLCBIVFRQU19TQ0hFTUUgfSBmcm9tIFwiQC91dGlscy9VcmxTY2hlbWVcIjtcbmltcG9ydCB7IHJlcXVpcmVSZXNvbHZlIH0gZnJvbSBcIkAvdXRpbHMvTW9kdWxlXCI7XG5cbmV4cG9ydCBhc3luYyBmdW5jdGlvbiBwYXRoRXhpc3RzKHBhdGg6IHN0cmluZykge1xuICB0cnkge1xuICAgIHJldHVybiAhIShhd2FpdCBmcy5wcm9taXNlcy5zdGF0KHBhdGgpKTtcbiAgfSBjYXRjaCB7XG4gICAgcmV0dXJuIGZhbHNlO1xuICB9XG59XG5cbmV4cG9ydCBmdW5jdGlvbiBwYXRoRXhpc3RzU3luYyhwYXRoOiBzdHJpbmcpIHtcbiAgdHJ5IHtcbiAgICByZXR1cm4gISFmcy5zdGF0U3luYyhwYXRoKTtcbiAgfSBjYXRjaCB7XG4gICAgcmV0dXJuIGZhbHNlO1xuICB9XG59XG5cbmV4cG9ydCBhc3luYyBmdW5jdGlvbiBmaWxlRXhpc3RzKHBhdGg6IHN0cmluZykge1xuICB0cnkge1xuICAgIHJldHVybiAoYXdhaXQgZnMucHJvbWlzZXMuc3RhdChwYXRoKSkuaXNGaWxlKCk7XG4gIH0gY2F0Y2gge1xuICAgIHJldHVybiBmYWxzZTtcbiAgfVxufVxuXG5leHBvcnQgZnVuY3Rpb24gZmlsZUV4aXN0c1N5bmMocGF0aDogc3RyaW5nKSB7XG4gIHRyeSB7XG4gICAgcmV0dXJuIGZzLnN0YXRTeW5jKHBhdGgpLmlzRmlsZSgpO1xuICB9IGNhdGNoIHtcbiAgICByZXR1cm4gZmFsc2U7XG4gIH0gXG59XG5cbmV4cG9ydCBhc3luYyBmdW5jdGlvbiBkaXJlY3RvcnlFeGlzdHMocGF0aDogc3RyaW5nKSB7XG4gIHRyeSB7XG4gICAgcmV0dXJuIChhd2FpdCBmcy5wcm9taXNlcy5zdGF0KHBhdGgpKS5pc0RpcmVjdG9yeSgpO1xuICB9IGNhdGNoIHtcbiAgICByZXR1cm4gZmFsc2U7XG4gIH1cbn1cblxuZXhwb3J0IGZ1bmN0aW9uIGRpcmVjdG9yeUV4aXN0c1N5bmMocGF0aDogc3RyaW5nKSB7XG4gIHRyeSB7XG4gICByZXR1cm4gZnMuc3RhdFN5bmMocGF0aCkuaXNEaXJlY3RvcnkoKTtcbiAgfSBjYXRjaCB7XG4gICAgcmV0dXJuIGZhbHNlO1xuICB9XG59XG5cbmV4cG9ydCBmdW5jdGlvbiBleHRuYW1lKGZ1bGxwYXRoOiBzdHJpbmcsIG9wdGlvbnM6IGFueSkge1xuICBpZiAob3B0aW9ucz8ubG9uZ2VzdCkge1xuICAgIGNvbnN0IGZpbGVuYW1lID0gcGF0aC5iYXNlbmFtZShmdWxscGF0aCk7XG4gICAgY29uc3QgaW5kZXggPSBmaWxlbmFtZS5pbmRleE9mKCcuJyk7XG4gICAgcmV0dXJuIGluZGV4ICE9IC0xID8gZmlsZW5hbWUuc3Vic3RyaW5nKGluZGV4KSA6ICcnO1xuICB9XG5cbiAgcmV0dXJuIHBhdGguZXh0bmFtZShmdWxscGF0aCk7XG59XG5cbmV4cG9ydCBhc3luYyBmdW5jdGlvbiBmaWxlTGlzdChkaXJuYW1lOiBzdHJpbmcsIG9wdGlvbnM6IGFueSk6IFByb21pc2U8QXJyYXk8c3RyaW5nPj4ge1xuICBjb25zdCBsaXN0ID0gbmV3IEFycmF5PHN0cmluZz47XG4gIGlmIChhd2FpdCBkaXJlY3RvcnlFeGlzdHMoZGlybmFtZSkpIHtcbiAgICBmb3IgKGNvbnN0IGl0ZXIgb2YgYXdhaXQgZnMucHJvbWlzZXMucmVhZGRpcihkaXJuYW1lKSkge1xuICAgICAgY29uc3QgZmlsZXBhdGggPSBwYXRoLnJlc29sdmUoZGlybmFtZSwgaXRlcik7XG4gICAgICBjb25zdCBzdGF0ID0gYXdhaXQgZnMucHJvbWlzZXMuc3RhdChmaWxlcGF0aCk7XG4gICAgICBpZiAoc3RhdC5pc0ZpbGUoKSkge1xuICAgICAgICBsaXN0LnB1c2gob3B0aW9ucy5yZWxhdGl2ZSA/IHBhdGgucmVsYXRpdmUob3B0aW9ucy5yZWxhdGl2ZSwgZmlsZXBhdGgpIDogZmlsZXBhdGgpO1xuICAgICAgfVxuICAgICAgZWxzZSBpZiAob3B0aW9ucy5yZWN1cnNpdmUgJiYgc3RhdC5pc0RpcmVjdG9yeSgpKSB7XG4gICAgICAgIGZvciAoY29uc3QgZm5hbWUgb2YgYXdhaXQgZmlsZUxpc3QoZmlsZXBhdGgsIG9wdGlvbnMpKVxuICAgICAgICAgIGxpc3QucHVzaChmbmFtZSk7XG4gICAgICB9XG4gICAgfVxuICB9XG4gIHJldHVybiBsaXN0O1xufVxuXG5leHBvcnQgYXN5bmMgZnVuY3Rpb24gc2F2ZUlmRGlmZmVyZW50KGZpbGVuYW1lOiBzdHJpbmcsIGNvbnRlbnQ6IHN0cmluZykge1xuICBpZiAoYXdhaXQgZmlsZUV4aXN0cyhmaWxlbmFtZSkpIHtcbiAgICBjb25zdCBvbGRDb250ZW50ID0gYXdhaXQgZnMucHJvbWlzZXMucmVhZEZpbGUoZmlsZW5hbWUsIHsgZW5jb2Rpbmc6IFwidXRmOFwiIH0pO1xuICAgIGlmIChjb250ZW50ID09IG9sZENvbnRlbnQpXG4gICAgICByZXR1cm4gZmFsc2U7XG4gIH1cblxuICBhd2FpdCBmcy5wcm9taXNlcy5ta2RpcihwYXRoLmRpcm5hbWUoZmlsZW5hbWUpLCB7IHJlY3Vyc2l2ZTogdHJ1ZSB9KTtcbiAgYXdhaXQgZnMucHJvbWlzZXMud3JpdGVGaWxlKGZpbGVuYW1lLCBjb250ZW50LCB7IGVuY29kaW5nOiBcInV0ZjhcIiB9KTtcblxuICByZXR1cm4gdHJ1ZTtcbn1cblxuZXhwb3J0IGZ1bmN0aW9uIGdldFBhdGhTdHJpbmcoc3RyOiBzdHJpbmcpIHtcbiAgaWYgKHN0ci5zdGFydHNXaXRoKElNUE9SVF9TQ0hFTUUpKVxuICAgIHN0ciA9IHJlcXVpcmVSZXNvbHZlKHN0ci5zbGljZShJTVBPUlRfU0NIRU1FLmxlbmd0aCkpO1xuICBpZiAoc3RyLnN0YXJ0c1dpdGgoRklMRV9TQ0hFTUUpKVxuICAgIHJldHVybiB1cmwuZmlsZVVSTFRvUGF0aChzdHIpO1xuICByZXR1cm4gc3RyO1xufVxuXG5leHBvcnQgZnVuY3Rpb24gaXNVUkwoc3RyOiBzdHJpbmcpIHtcbiAgdHJ5IHtcbiAgICBuZXcgVVJMKHN0cik7XG4gICAgcmV0dXJuIHRydWU7XG4gIH0gY2F0Y2gge1xuICAgIHJldHVybiBmYWxzZTtcbiAgfVxufVxuXG5leHBvcnQgZnVuY3Rpb24gZ2V0VVJMU3RyaW5nKHN0cjogc3RyaW5nKSB7XG4gIGlmIChzdHIuc3RhcnRzV2l0aChJTVBPUlRfU0NIRU1FKSlcbiAgICByZXR1cm4gcmVxdWlyZVJlc29sdmUoc3RyLnNsaWNlKElNUE9SVF9TQ0hFTUUubGVuZ3RoKSk7XG4gIGlmIChpc1VSTChzdHIpKVxuICAgIHJldHVybiB1cmwuZmlsZVVSTFRvUGF0aChzdHIpO1xuICByZXR1cm4gc3RyO1xufVxuXG5leHBvcnQgYXN5bmMgZnVuY3Rpb24gZmV0Y2hCdWZmZXIoc3RyOiBzdHJpbmcpOiBQcm9taXNlPEJ1ZmZlcj4ge1xuICBpZiAoc3RyLnN0YXJ0c1dpdGgoSFRUUF9TQ0hFTUUpIHx8IHN0ci5zdGFydHNXaXRoKEhUVFBTX1NDSEVNRSkpIHtcbiAgICBjb25zdCByZXNwb25zZSA9IGF3YWl0IGZldGNoKHN0cik7XG4gICAgcmV0dXJuIEJ1ZmZlci5mcm9tKGF3YWl0IHJlc3BvbnNlLmFycmF5QnVmZmVyKCkpO1xuICB9XG4gIHJldHVybiBhd2FpdCBmcy5wcm9taXNlcy5yZWFkRmlsZShnZXRVUkxTdHJpbmcoc3RyKSk7XG59XG4iLCIvKlxuICogTUlUIExpY2Vuc2VcbiAqXG4gKiBDb3B5cmlnaHQgKGMpIDIwMjUgIFl1cmlpIFlha3ViaW4gKHl1cmlpLnlha3ViaW5AZ21haWwuY29tKVxuICpcbiAqIFBlcm1pc3Npb24gaXMgZ3JhbnRlZCB0byB1c2UsIGNvcHksIG1vZGlmeSwgYW5kIGRpc3RyaWJ1dGUgdGhpcyBzb2Z0d2FyZVxuICogdW5kZXIgdGhlIE1JVCBMaWNlbnNlLiBTZWUgTElDRU5TRSBmaWxlIGZvciBkZXRhaWxzLlxuICovXG5cbmltcG9ydCBvcyBmcm9tIFwibm9kZTpvc1wiO1xuXG5jb25zdCBzaXplb2ZWb2lkcEJpdHM6IGFueSA9XG57XG4gIGFybTogICAgIDQsXG4gIGFybTY0OiAgIDgsXG4gIGlhMzI6ICAgIDQsXG4gIGxvb25nNjQ6IDgsXG4gIG1pcHM6ICAgIDQsXG4gIG1pcHNlbDogIDQsXG4gIHBwYzogICAgIDQsXG4gIHBwYzY0OiAgIDgsXG4gIHJpc2N2NjQ6IDgsXG4gIHMzOTA6ICAgIDQsXG4gIHMzOTB4OiAgIDgsXG4gIHg2NDogICAgIDQsXG59O1xuXG5jb25zdCBfc2l6ZW9mVm9pZHAgPSBzaXplb2ZWb2lkcEJpdHNbb3MuYXJjaCgpXTtcbmlmICghX3NpemVvZlZvaWRwKVxuICB0aHJvdyBuZXcgRXJyb3IoYFVua25vd24gJHtvcy5hcmNoKCl9IGFyY2hgKTtcblxubGV0IF9leGVjdXRhYmxlU3VmZml4OiBzdHJpbmc7XG5cbmlmIChvcy5wbGF0Zm9ybSgpID09PSBcIndpbjMyXCIpIHtcbiAgX2V4ZWN1dGFibGVTdWZmaXggPSBcIi5leGVcIjtcbn1cbmVsc2Uge1xuICBfZXhlY3V0YWJsZVN1ZmZpeCA9IFwiXCI7XG59XG5cbmV4cG9ydCBjbGFzcyBIb3N0IHtcbiAgc3RhdGljIGdldCBzaXplb2ZWb2lkcCgpOiA0IHwgOCB7XG4gICAgcmV0dXJuIF9zaXplb2ZWb2lkcDtcbiAgfVxuICBzdGF0aWMgZ2V0IGV4ZWN1dGFibGVTdWZmaXgoKTogc3RyaW5nIHtcbiAgICByZXR1cm4gX2V4ZWN1dGFibGVTdWZmaXg7XG4gIH1cbn07XG4iLCIvKlxuICogTUlUIExpY2Vuc2VcbiAqXG4gKiBDb3B5cmlnaHQgKGMpIDIwMjUgIFl1cmlpIFlha3ViaW4gKHl1cmlpLnlha3ViaW5AZ21haWwuY29tKVxuICpcbiAqIFBlcm1pc3Npb24gaXMgZ3JhbnRlZCB0byB1c2UsIGNvcHksIG1vZGlmeSwgYW5kIGRpc3RyaWJ1dGUgdGhpcyBzb2Z0d2FyZVxuICogdW5kZXIgdGhlIE1JVCBMaWNlbnNlLiBTZWUgTElDRU5TRSBmaWxlIGZvciBkZXRhaWxzLlxuICovXG5cbmltcG9ydCBwYXRoIGZyb20gXCJub2RlOnBhdGhcIjtcbmltcG9ydCBmcyBmcm9tIFwibm9kZTpmc1wiO1xuaW1wb3J0IGh0dHAgZnJvbSBcImh0dHBcIjtcbmltcG9ydCBodHRwcyBmcm9tIFwiaHR0cHNcIjtcblxuaW1wb3J0IHsgTG9nZ2VyIH0gZnJvbSBcIkAvbG9nZ2VyXCI7XG5cbmNvbnN0IGxvZ2dlciA9IExvZ2dlci5jcmVhdGUoaW1wb3J0Lm1ldGEudXJsKTtcblxuaW50ZXJmYWNlIElSZXNvbHZlQnVpbGRlciB7XG4gIGFwcGVuZChkYXRhOiBCdWZmZXIpOiB2b2lkO1xuICB0b1Jlc3VsdCgpOiBCdWZmZXIgfCB1bmRlZmluZWQ7XG59O1xuXG5jbGFzcyBCdWZmZXJCdWlsZGVyIGltcGxlbWVudHMgSVJlc29sdmVCdWlsZGVyIHtcbiAgcHJpdmF0ZSBfY2h1bmtzOiBBcnJheTxCdWZmZXI+ID0gW107XG5cbiAgcHVibGljIGFwcGVuZChjaHVuazogQnVmZmVyKTogdm9pZCB7XG4gICAgdGhpcy5fY2h1bmtzLnB1c2goY2h1bmspO1xuICB9XG5cbiAgcHVibGljIHRvUmVzdWx0KCk6IEJ1ZmZlciB7XG4gICAgcmV0dXJuIEJ1ZmZlci5jb25jYXQodGhpcy5fY2h1bmtzKTtcbiAgfVxufTtcblxuY2xhc3MgRmlsZVN5bmNXcml0ZXIgaW1wbGVtZW50cyBJUmVzb2x2ZUJ1aWxkZXIge1xuICBwcml2YXRlIF9mZDogbnVtYmVyO1xuXG4gIHB1YmxpYyBjb25zdHJ1Y3RvcihmaWxlOiBzdHJpbmcpIHtcbiAgICB0aGlzLl9mZCA9IGZzLm9wZW5TeW5jKGZpbGUsIFwid1wiKTtcbiAgfVxuXG4gIHB1YmxpYyBhcHBlbmQoY2h1bms6IEJ1ZmZlcik6IHZvaWQge1xuICAgIGZzLndyaXRlU3luYyh0aGlzLl9mZCwgY2h1bmspO1xuICB9XG5cbiAgcHVibGljIHRvUmVzdWx0KCk6IHVuZGVmaW5lZCB7XG4gICAgZnMuY2xvc2VTeW5jKHRoaXMuX2ZkKTtcbiAgfVxufTtcblxuZnVuY3Rpb24gY3JlYXRlQnVpbGRlcihmaWxlPzogc3RyaW5nKTogSVJlc29sdmVCdWlsZGVyIHtcbiAgaWYgKGZpbGUpXG4gICAgcmV0dXJuIG5ldyBGaWxlU3luY1dyaXRlcihmaWxlKTtcbiAgcmV0dXJuIG5ldyBCdWZmZXJCdWlsZGVyO1xufVxuXG5mdW5jdGlvbiBodHRwUmVxdWVzdCh1cmw6IHN0cmluZywgb3B0aW9uczogaHR0cC5SZXF1ZXN0T3B0aW9ucyB8IGh0dHBzLlJlcXVlc3RPcHRpb25zLCBjYWxsYmFjazogYW55KTogaHR0cC5DbGllbnRSZXF1ZXN0IHtcbiAgaWYgKHVybC5zdGFydHNXaXRoKFwiaHR0cHM6Ly9cIikpXG4gICAgcmV0dXJuIGh0dHBzLnJlcXVlc3QodXJsLCBvcHRpb25zLCBjYWxsYmFjayk7XG4gIHJldHVybiBodHRwLnJlcXVlc3QodXJsLCBvcHRpb25zLCBjYWxsYmFjayk7XG59O1xuXG5pbnRlcmZhY2UgRmV0Y2hPcHRpb25zIHtcbiAgYXR0ZW1wdHM/OiBudW1iZXI7XG59O1xuXG5mdW5jdGlvbiBmZXRjaEltcGwodXJsOiBzdHJpbmcsIGZpbGU6IHN0cmluZyB8IHVuZGVmaW5lZCwgb3B0aW9uczogRmV0Y2hPcHRpb25zKTogUHJvbWlzZTxCdWZmZXJ8dW5kZWZpbmVkPiB7XG4gIHJldHVybiBuZXcgUHJvbWlzZSgocmVzb2x2ZSwgcmVqZWN0KSA9PiB7XG4gICAgY29uc3QgaHR0cE9wdGlvbnMgPSB7XG4gICAgICBtZXRob2Q6ICdHRVQnLFxuICAgICAgdGltZW91dDogNTAwMCxcbiAgICAgIGhlYWRlcnM6IHtcbiAgICAgICAgXCJVc2VyLUFnZW50XCI6IFBST0pFQ1RfTkFNRSArIFwiL1wiICsgUFJPSkVDVF9WRVJTSU9OLFxuICAgICAgICBcIkFjY2VwdFwiOiBcIiovKlwiLFxuICAgICAgfSxcbiAgICB9O1xuXG4gICAgbGV0IGF0dGVtcHRzID0gb3B0aW9ucy5hdHRlbXB0cyB8fCAwO1xuICAgIGNvbnN0IGRvUmVxdWVzdCA9ICh1cmw6IHN0cmluZykgPT4ge1xuICAgICAgY29uc3QgcmVxdWVzdCA9IGh0dHBSZXF1ZXN0KHVybCwgaHR0cE9wdGlvbnMsIG9uUmVxdWVzdCk7XG5cbiAgICAgIGxldCBoYXNFcnJvciA9IGZhbHNlO1xuICAgICAgY29uc3Qgb25FcnJvciA9IChlcnI6IEVycm9yKSA9PiB7XG4gICAgICAgIHJlcXVlc3QuZGVzdHJveSgpO1xuICAgICAgICBpZiAoIWhhc0Vycm9yKSB7XG4gICAgICAgICAgaGFzRXJyb3IgPSB0cnVlO1xuICAgICAgICAgIGlmIChhdHRlbXB0cyA+IDApIHtcbiAgICAgICAgICAgIGxvZ2dlci53YXJuKGVyci5tZXNzYWdlKTtcbiAgICAgICAgICAgIGxvZ2dlci5pbmZvKGByZS13Z2V0ICR7dXJsfSBhdHRlbXB0cyAke2F0dGVtcHRzfWApO1xuICAgICAgICAgICAgYXR0ZW1wdHMtLTtcbiAgICAgICAgICAgIGRvUmVxdWVzdCh1cmwpO1xuICAgICAgICAgIH1cbiAgICAgICAgICBlbHNlIHtcbiAgICAgICAgICAgIHJlamVjdChlcnIpO1xuICAgICAgICAgIH1cbiAgICAgICAgfVxuICAgICAgfTtcblxuICAgICAgcmVxdWVzdC5vbihcInRpbWVvdXRcIiwgKCkgPT4ge1xuICAgICAgICBvbkVycm9yKG5ldyBFcnJvcihcIlRpbWVvdXQgZm9yIFwiICsgdXJsKSk7XG4gICAgICB9KTtcblxuICAgICAgcmVxdWVzdC5vbihcImVycm9yXCIsIChlcnI6IEVycm9yKSA9PiB7XG4gICAgICAgIG9uRXJyb3IoZXJyKTtcbiAgICAgIH0pO1xuXG4gICAgICByZXF1ZXN0LmVuZCgpO1xuICAgIH07XG5cbiAgICBjb25zdCBmaWxlbmFtZSA9IHBhdGguYmFzZW5hbWUodXJsKTtcbiAgICBjb25zdCBvblJlcXVlc3QgPSAocmVzcG9uc2U6IGh0dHAuSW5jb21pbmdNZXNzYWdlKSA9PiB7XG4gICAgICBzd2l0Y2ggKHJlc3BvbnNlLnN0YXR1c0NvZGUpIHtcbiAgICAgIGNhc2UgMjAwOlxuICAgICAgICBsb2dnZXIuZGVidWcoYENvbm5jdGVkIHRvICR7KHJlc3BvbnNlIGFzIGFueSkucmVxLmhvc3R9YCk7XG4gICAgICAgIGxvZ2dlci5kZWJ1ZyhgRG93bmxvYWRpbmcgJHtmaWxlbmFtZX1gKTtcbiAgICAgICAgY29uc3QgYnVpbGRlciA9IGNyZWF0ZUJ1aWxkZXIoZmlsZSk7XG4gICAgICAgIHJlc3BvbnNlLm9uKFwiZGF0YVwiLCAoY2h1bms6IEJ1ZmZlcikgPT4gYnVpbGRlci5hcHBlbmQoY2h1bmspKTtcbiAgICAgICAgcmVzcG9uc2Uub24oXCJlbmRcIiwgKCkgPT4gcmVzb2x2ZShidWlsZGVyLnRvUmVzdWx0KCkpKTtcbiAgICAgICAgcmVzcG9uc2Uub24oJ2Nsb3NlJywgKCkgPT4gbG9nZ2VyLmRlYnVnKFwiQ2xvc2VcIikpO1xuICAgICAgICBicmVhaztcblxuICAgICAgY2FzZSAzMDE6XG4gICAgICBjYXNlIDMwMjpcbiAgICAgICAgcmVzcG9uc2UucmVzdW1lKCk7XG4gICAgICAgIGlmIChyZXNwb25zZS5oZWFkZXJzLmxvY2F0aW9uKSB7XG4gICAgICAgICAgbG9nZ2VyLmluZm8oXCJSZWRpcmVjdCB0byBcIiArIHJlc3BvbnNlLmhlYWRlcnMubG9jYXRpb24pO1xuICAgICAgICAgIGRvUmVxdWVzdChyZXNwb25zZS5oZWFkZXJzLmxvY2F0aW9uKTtcbiAgICAgICAgfVxuICAgICAgICBicmVhaztcblxuICAgICAgZGVmYXVsdDpcbiAgICAgICAgcmVzcG9uc2UucmVzdW1lKCk7XG4gICAgICAgIGNvbnN0IG1lc3NhZ2UgPSBcIkRpZCBub3QgZ2V0IGFuIE9LIGZyb20gdGhlIHNlcnZlci4gQ29kZTogXCIgKyByZXNwb25zZS5zdGF0dXNDb2RlO1xuICAgICAgICBsb2dnZXIuZXJyb3IobWVzc2FnZSk7XG4gICAgICAgIHJlamVjdChtZXNzYWdlKTtcbiAgICAgICAgYnJlYWs7XG4gICAgICB9XG4gICAgfTtcblxuICAgIGxvZ2dlci5pbmZvKFwid2dldCBcIiArIHVybCk7XG4gICAgZG9SZXF1ZXN0KHVybCk7XG4gIH0pO1xufTtcblxuZXhwb3J0IGZ1bmN0aW9uIHJlcXVlc3RHZXQodXJsOiBzdHJpbmcsIG9wdGlvbnM/OiBGZXRjaE9wdGlvbnMpIHtcbiAgcmV0dXJuIGZldGNoSW1wbCh1cmwsIHVuZGVmaW5lZCwgb3B0aW9ucyB8fCB7fSkgYXMgUHJvbWlzZTxCdWZmZXI+O1xufVxuXG5leHBvcnQgZnVuY3Rpb24gZG93bmxvYWRGaWxlKHVybDogc3RyaW5nLCBmaWxlOiBzdHJpbmcsIG9wdGlvbnM/OiBGZXRjaE9wdGlvbnMpIHtcbiAgcmV0dXJuIGZldGNoSW1wbCh1cmwsIGZpbGUsIG9wdGlvbnMgfHwge30pIGFzIFByb21pc2U8dW5kZWZpbmVkPjtcbn1cbiIsIi8qXG4gKiBNSVQgTGljZW5zZVxuICpcbiAqIENvcHlyaWdodCAoYykgMjAyNSAgWXVyaWkgWWFrdWJpbiAoeXVyaWkueWFrdWJpbkBnbWFpbC5jb20pXG4gKlxuICogUGVybWlzc2lvbiBpcyBncmFudGVkIHRvIHVzZSwgY29weSwgbW9kaWZ5LCBhbmQgZGlzdHJpYnV0ZSB0aGlzIHNvZnR3YXJlXG4gKiB1bmRlciB0aGUgTUlUIExpY2Vuc2UuIFNlZSBMSUNFTlNFIGZpbGUgZm9yIGRldGFpbHMuXG4gKi9cblxuaW1wb3J0IHVybCBmcm9tIFwibm9kZTp1cmxcIjtcblxuZXhwb3J0IGNvbnN0IGltcG9ydE1vZHVsZSA9IGFzeW5jIChuYW1lKSA9PiBpbXBvcnQoLyogd2VicGFja0lnbm9yZTogdHJ1ZSAqLyBuYW1lKTtcblxuZXhwb3J0IGZ1bmN0aW9uIGlzRW50cnlQb2ludCgpIHtcbiAgLy8gaWYgKE9iamVjdChpbXBvcnQubWV0YSkudXJsKVxuICAvLyAgIHJldHVybiB1cmwuZmlsZVVSTFRvUGF0aChPYmplY3QoaW1wb3J0Lm1ldGEpLnVybCkgPT09IHByb2Nlc3MuYXJndlsxXTtcbiAgaWYgKHR5cGVvZiByZXF1aXJlICE9PSAndW5kZWZpbmVkJylcbiAgICByZXR1cm4gcmVxdWlyZS5tYWluID09PSBtb2R1bGU7XG4gIHRocm93IG5ldyBFcnJvcihcIk5vIGNvbXBhdGlibGUgbW9kdWxlIHJlc29sdmVyIGZvdW5kXCIpO1xufVxuXG5leHBvcnQgZnVuY3Rpb24gY3VycmVudFNjcmlwdFVSTCgpIHtcbiAgLy8gaWYgKE9iamVjdChpbXBvcnQubWV0YSkudXJsKVxuICAvLyAgIHJldHVybiB1cmwuZmlsZVVSTFRvUGF0aChPYmplY3QoaW1wb3J0Lm1ldGEpLnVybCk7XG4gIGlmICh0eXBlb2YgcmVxdWlyZSAhPT0gJ3VuZGVmaW5lZCcpXG4gICAgcmV0dXJuIHVybC5wYXRoVG9GaWxlVVJMKC8qIHdlYnBhY2tJZ25vcmU6IHRydWUgKi8gX19maWxlbmFtZSk7XG4gIHRocm93IG5ldyBFcnJvcihcIlVua25vd24gY3VycmVudCBmaWxlbmFtZVwiKTtcbn1cbiIsImltcG9ydCBmcyBmcm9tIFwibm9kZTpmc1wiO1xuaW1wb3J0IHBhdGggZnJvbSBcIm5vZGU6cGF0aFwiO1xuXG5pbXBvcnQgeyBmaWxlTGlzdCB9IGZyb20gXCJAL3V0aWxzL0ZpbGVTeXN0ZW1cIjtcbmltcG9ydCB7IExvZ2dlciB9IGZyb20gXCJAL2xvZ2dlclwiO1xuXG5jb25zdCBsb2dnZXIgPSBMb2dnZXIuY3JlYXRlKGltcG9ydC5tZXRhLnVybCk7XG5cbmV4cG9ydCBhc3luYyBmdW5jdGlvbiBtYWtlUGF0Y2goc3JjRGlyOiBzdHJpbmcsIGRlc3REaXI6IHN0cmluZykge1xuICBsb2dnZXIuaW5mbyhgTWFrZSBwYXRjaCAke3NyY0Rpcn0gdG8gJHtkZXN0RGlyfWApO1xuICBjb25zdCBsaXN0ID0gYXdhaXQgZmlsZUxpc3Qoc3JjRGlyLCB7IHJlbGF0aXZlOiBzcmNEaXIsIHJlY3Vyc2l2ZTogdHJ1ZSB9KTtcbiAgZm9yIChjb25zdCBpdGVyIG9mIGxpc3QpIHtcbiAgICBjb25zdCBzb3VyY2UgPSBwYXRoLnJlc29sdmUoc3JjRGlyLCBpdGVyKTtcbiAgICBjb25zdCBkZXN0aW5hdGlvbiA9IHBhdGgucmVzb2x2ZShkZXN0RGlyLCBpdGVyKTtcbiAgICBhd2FpdCBmcy5wcm9taXNlcy5jcChzb3VyY2UsIGRlc3RpbmF0aW9uLCB7IGZvcmNlOiB0cnVlIH0pO1xuICAgIGxvZ2dlci5pbmZvKGAgUmVwbGFjZWQgJHtpdGVyfWApO1xuICB9XG59XG4iLCIvKlxuICogTUlUIExpY2Vuc2VcbiAqXG4gKiBDb3B5cmlnaHQgKGMpIDIwMjUgIFl1cmlpIFlha3ViaW4gKHl1cmlpLnlha3ViaW5AZ21haWwuY29tKVxuICpcbiAqIFBlcm1pc3Npb24gaXMgZ3JhbnRlZCB0byB1c2UsIGNvcHksIG1vZGlmeSwgYW5kIGRpc3RyaWJ1dGUgdGhpcyBzb2Z0d2FyZVxuICogdW5kZXIgdGhlIE1JVCBMaWNlbnNlLiBTZWUgTElDRU5TRSBmaWxlIGZvciBkZXRhaWxzLlxuICovXG5cbmV4cG9ydCB7IGlzRW50cnlQb2ludCB9IGZyb20gXCIuL0ltcG9ydE1vZHVsZS5tanNcIjtcbmV4cG9ydCB7IGltcG9ydE1vZHVsZSB9IGZyb20gXCIuL0ltcG9ydE1vZHVsZS5tanNcIjtcbmV4cG9ydCB7IGN1cnJlbnRTY3JpcHRVUkwgfSBmcm9tIFwiLi9JbXBvcnRNb2R1bGUubWpzXCI7XG5cbmV4cG9ydCBjb25zdCByZXF1aXJlU3luYyA9IGV2YWwoXCJyZXF1aXJlXCIpIGFzIE5vZGVKUy5SZXF1aXJlO1xuXG5leHBvcnQgZnVuY3Rpb24gcmVxdWlyZVJlc29sdmUobmFtZTogc3RyaW5nKSB7XG4gIGlmICh0eXBlb2YgaW1wb3J0Lm1ldGEucmVzb2x2ZSA9PT0gJ2Z1bmN0aW9uJylcbiAgICByZXR1cm4gaW1wb3J0Lm1ldGEucmVzb2x2ZShuYW1lKTtcbiAgaWYgKHR5cGVvZiByZXF1aXJlU3luYyAhPT0gJ3VuZGVmaW5lZCcpXG4gICAgcmV0dXJuIHJlcXVpcmVTeW5jLnJlc29sdmUobmFtZSk7XG4gIHRocm93IG5ldyBFcnJvcihcIk5vIGNvbXBhdGlibGUgbW9kdWxlIHJlc29sdmVyIGZvdW5kXCIpO1xufVxuIiwiLypcbiAqIE1JVCBMaWNlbnNlXG4gKlxuICogQ29weXJpZ2h0IChjKSAyMDI1ICBZdXJpaSBZYWt1YmluICh5dXJpaS55YWt1YmluQGdtYWlsLmNvbSlcbiAqXG4gKiBQZXJtaXNzaW9uIGlzIGdyYW50ZWQgdG8gdXNlLCBjb3B5LCBtb2RpZnksIGFuZCBkaXN0cmlidXRlIHRoaXMgc29mdHdhcmVcbiAqIHVuZGVyIHRoZSBNSVQgTGljZW5zZS4gU2VlIExJQ0VOU0UgZmlsZSBmb3IgZGV0YWlscy5cbiAqL1xuXG5pbXBvcnQgb3MgZnJvbSBcIm5vZGU6b3NcIjtcbmltcG9ydCBub2RlcGF0aCBmcm9tIFwibm9kZTpwYXRoXCI7XG5cbmxldCBuYXRpdmVTZXAgPSAgbm9kZXBhdGgucG9zaXguc2VwO1xubGV0IG90aGVyU2VwID0gbm9kZXBhdGgud2luMzIuc2VwO1xuXG5pZiAob3MucGxhdGZvcm0oKSA9PT0gXCJ3aW4zMlwiKSB7XG4gIFsgbmF0aXZlU2VwLCBvdGhlclNlcCBdID0gWyBvdGhlclNlcCwgbmF0aXZlU2VwIF07XG59XG5cbmV4cG9ydCBuYW1lc3BhY2UgUGF0aCB7XG5cbmV4cG9ydCBjb25zdCBzZXAgPSBub2RlcGF0aC5wb3NpeC5zZXA7XG5leHBvcnQgY29uc3QgZGVsaW1pdGVyID0gbm9kZXBhdGguZGVsaW1pdGVyO1xuXG5leHBvcnQgZnVuY3Rpb24gbmF0aXZlUGF0aChwYXRoOiBzdHJpbmcpOiBzdHJpbmcge1xuICByZXR1cm4gcGF0aC5yZXBsYWNlQWxsKG90aGVyU2VwLCBuYXRpdmVTZXApO1xufVxuXG5leHBvcnQgZnVuY3Rpb24gcmVwcmVzZW50UGF0aChwYXRoOiBzdHJpbmcpOiBzdHJpbmcge1xuICByZXR1cm4gcGF0aC5yZXBsYWNlQWxsKG5vZGVwYXRoLndpbjMyLnNlcCwgbm9kZXBhdGgucG9zaXguc2VwKTtcbn1cblxuZXhwb3J0IGZ1bmN0aW9uIGlzQWJzb2x1dGUocGF0aDogc3RyaW5nKTogYm9vbGVhbiB7XG4gIHJldHVybiBub2RlcGF0aC5pc0Fic29sdXRlKG5hdGl2ZVBhdGgocGF0aCkpO1xufVxuXG5leHBvcnQgZnVuY3Rpb24gam9pbiguLi5wYXRoczogc3RyaW5nW10pOiBzdHJpbmcge1xuICByZXR1cm4gcmVwcmVzZW50UGF0aChub2RlcGF0aC5qb2luKC4uLnBhdGhzLm1hcChpID0+IG5hdGl2ZVBhdGgoaSkpKSk7XG59XG5cbmV4cG9ydCBmdW5jdGlvbiByZXNvbHZlKC4uLnBhdGhzOiBzdHJpbmdbXSk6IHN0cmluZyB7XG4gIHJldHVybiByZXByZXNlbnRQYXRoKG5vZGVwYXRoLnJlc29sdmUoLi4ucGF0aHMubWFwKGkgPT4gbmF0aXZlUGF0aChpKSkpKTtcbn1cblxuZXhwb3J0IGZ1bmN0aW9uIGRpcm5hbWUocGF0aDogc3RyaW5nKTogc3RyaW5nIHtcbiAgcmV0dXJuIHJlcHJlc2VudFBhdGgobm9kZXBhdGguZGlybmFtZShuYXRpdmVQYXRoKHBhdGgpKSk7XG59XG5cbmV4cG9ydCBmdW5jdGlvbiBiYXNlbmFtZShwYXRoOiBzdHJpbmcsIHN1ZmZpeD86IHN0cmluZyk6IHN0cmluZyB7XG4gIHJldHVybiByZXByZXNlbnRQYXRoKG5vZGVwYXRoLmJhc2VuYW1lKG5hdGl2ZVBhdGgocGF0aCksIHN1ZmZpeCkpO1xufVxuXG5leHBvcnQgZnVuY3Rpb24gcmVsYXRpdmUoZnJvbTogc3RyaW5nLCB0bzogc3RyaW5nKTogc3RyaW5nIHtcbiAgcmV0dXJuIHJlcHJlc2VudFBhdGgobm9kZXBhdGgucmVsYXRpdmUobmF0aXZlUGF0aChmcm9tKSwgbmF0aXZlUGF0aCh0bykpKTtcbn1cblxufSAvLyBuYW1lc3BhY2UgUGF0aFxuIiwiLypcbiAqIE1JVCBMaWNlbnNlXG4gKlxuICogQ29weXJpZ2h0IChjKSAyMDI1ICBZdXJpaSBZYWt1YmluICh5dXJpaS55YWt1YmluQGdtYWlsLmNvbSlcbiAqXG4gKiBQZXJtaXNzaW9uIGlzIGdyYW50ZWQgdG8gdXNlLCBjb3B5LCBtb2RpZnksIGFuZCBkaXN0cmlidXRlIHRoaXMgc29mdHdhcmVcbiAqIHVuZGVyIHRoZSBNSVQgTGljZW5zZS4gU2VlIExJQ0VOU0UgZmlsZSBmb3IgZGV0YWlscy5cbiAqL1xuXG5leHBvcnQgZnVuY3Rpb24gZXF1YWxWYWx1ZShhOiBhbnksIGI6IGFueSk6IGJvb2xlYW4ge1xuICBpZiAoYSA9PT0gYilcbiAgICByZXR1cm4gdHJ1ZTtcblxuICBpZiAoYSA9PT0gdW5kZWZpbmVkIHx8IGIgPT09IHVuZGVmaW5lZClcbiAgICByZXR1cm4gZmFsc2U7XG5cbiAgaWYgKHR5cGVvZiBhICE9PSBcIm9iamVjdFwiIHx8IHR5cGVvZiBiICE9PSBcIm9iamVjdFwiKVxuICAgIHJldHVybiBmYWxzZTtcblxuICBjb25zdCBrMSA9IE9iamVjdC5rZXlzKGEpO1xuICBjb25zdCBrMiA9IE9iamVjdC5rZXlzKGIpO1xuXG4gIGlmIChrMS5sZW5ndGggIT0gazIubGVuZ3RoKVxuICAgIHJldHVybiBmYWxzZTtcblxuICBmb3IgKGNvbnN0IGtleSBvZiBrMSkge1xuICAgIGlmICghT2JqZWN0Lmhhc093bihiLCBrZXkpIHx8ICFlcXVhbFZhbHVlKGFba2V5XSwgYltrZXldKSlcbiAgICAgIHJldHVybiBmYWxzZTtcbiAgfVxuXG4gIHJldHVybiB0cnVlO1xufVxuXG5leHBvcnQgZnVuY3Rpb24gZGVlcENvcHkobzogYW55KTogYW55IHtcbiAgaWYgKCFvIHx8IHR5cGVvZiBvICE9PSBcIm9iamVjdFwiKVxuICAgIHJldHVybiBvO1xuICBpZiAoQXJyYXkuaXNBcnJheShvKSkge1xuICAgIGNvbnN0IHJlc3VsdCA9IFtdO1xuICAgIGZvciAoY29uc3QgaXRlciBvZiBvKVxuICAgICAgcmVzdWx0LnB1c2goZGVlcENvcHkoaXRlcikpO1xuICAgIHJldHVybiByZXN1bHQ7XG4gIH1cbiAgZWxzZSB7XG4gICAgY29uc3QgcmVzdWx0ID0ge30gYXMgYW55O1xuICAgIGZvciAoY29uc3QgW2tleSx2YWxdIG9mIE9iamVjdC5lbnRyaWVzKG8pKVxuICAgICAgcmVzdWx0W2tleV0gPSBkZWVwQ29weSh2YWwpO1xuICAgIHJldHVybiByZXN1bHQ7XG4gIH1cbn1cblxuZXhwb3J0IGZ1bmN0aW9uIGFzc2lnbk9iamVjdCh0YXJnZXQ6IGFueSwgc291cmNlOiBhbnkpIHtcbiAgaWYgKEFycmF5LmlzQXJyYXkodGFyZ2V0KSAmJiBBcnJheS5pc0FycmF5KHNvdXJjZSkpIHtcbiAgICBmb3IgKGNvbnN0IGl0ZXIgb2Ygc291cmNlKVxuICAgICAgdGFyZ2V0LnB1c2goaXRlcik7XG4gIH1cbiAgZWxzZSB7XG4gICAgZm9yIChjb25zdCBrZXkgb2YgT2JqZWN0LmtleXMoc291cmNlKSkge1xuICAgICAgY29uc3QgYSA9IHRhcmdldFtrZXldLCBiID0gc291cmNlW2tleV07XG4gICAgICBpZiAoYSAmJiB0eXBlb2YgYSA9PT0gXCJvYmplY3RcIiAmJiBiICYmIHR5cGVvZiBiID09PSBcIm9iamVjdFwiKVxuICAgICAgICBhc3NpZ25PYmplY3QoYSwgYik7XG4gICAgICBlbHNlXG4gICAgICAgIHRhcmdldFtrZXldID0gZGVlcENvcHkoYik7XG4gICAgfVxuICB9XG59XG5cbmV4cG9ydCBmdW5jdGlvbiBhcnJheVdyYXBwZXIodmFsdWU6IGFueSkge1xuICBpZiAodmFsdWUgPT09IHVuZGVmaW5lZCB8fCBBcnJheS5pc0FycmF5KHZhbHVlKSlcbiAgICByZXR1cm4gdmFsdWU7XG4gIHJldHVybiBbIHZhbHVlIF07XG59XG4iLCIvKlxuICogTUlUIExpY2Vuc2VcbiAqXG4gKiBDb3B5cmlnaHQgKGMpIDIwMjUgIFl1cmlpIFlha3ViaW4gKHl1cmlpLnlha3ViaW5AZ21haWwuY29tKVxuICpcbiAqIFBlcm1pc3Npb24gaXMgZ3JhbnRlZCB0byB1c2UsIGNvcHksIG1vZGlmeSwgYW5kIGRpc3RyaWJ1dGUgdGhpcyBzb2Z0d2FyZVxuICogdW5kZXIgdGhlIE1JVCBMaWNlbnNlLiBTZWUgTElDRU5TRSBmaWxlIGZvciBkZXRhaWxzLlxuICovXG5cbmltcG9ydCBmcyBmcm9tIFwibm9kZTpmc1wiO1xuXG5leHBvcnQgY2xhc3MgU2V0dGluZ3NTdG9yYWdlIHtcbiAgcHJpdmF0ZSBfZmlsZW5hbWU6IHN0cmluZztcbiAgcHJpdmF0ZSBfc2V0dGluZ3M6IGFueTtcbiAgcHJpdmF0ZSBfY3VycmVudDogYW55O1xuXG4gIGNvbnN0cnVjdG9yKGZpbGVuYW1lOiBzdHJpbmcpIHtcbiAgICB0aGlzLl9maWxlbmFtZSA9IGZpbGVuYW1lO1xuICB9XG5cbiAgcHVibGljIGFzeW5jIHB1c2gobmFtZTogc3RyaW5nKSB7XG4gICAgaWYgKCF0aGlzLl9zZXR0aW5ncylcbiAgICAgIGF3YWl0IHRoaXMubG9hZCgpO1xuICAgIGxldCBvYmplY3QgPSB0aGlzLl9jdXJyZW50Lm9iamVjdFtuYW1lXTtcbiAgICBpZiAoIW9iamVjdClcbiAgICAgIG9iamVjdCA9IHRoaXMuX2N1cnJlbnQub2JqZWN0W25hbWVdID0ge307XG4gICAgdGhpcy5fY3VycmVudCA9IHsgcGFyZW50OiB0aGlzLl9jdXJyZW50LCBvYmplY3QgfTtcbiAgfVxuXG4gIHB1YmxpYyBhc3luYyBwb3AoKSB7XG4gICAgaWYgKCF0aGlzLl9zZXR0aW5ncylcbiAgICAgIGF3YWl0IHRoaXMubG9hZCgpO1xuICAgIGNvbnNvbGUuYXNzZXJ0KHRoaXMuX2N1cnJlbnQucGFyZW50KTtcbiAgICB0aGlzLl9jdXJyZW50ID0gdGhpcy5fY3VycmVudC5wYXJlbnQ7XG4gIH1cblxuICBwdWJsaWMgYXN5bmMgZ2V0KG5hbWU6IHN0cmluZykge1xuICAgIGlmICghdGhpcy5fc2V0dGluZ3MpXG4gICAgICBhd2FpdCB0aGlzLmxvYWQoKTtcbiAgICByZXR1cm4gdGhpcy5fY3VycmVudC5vYmplY3RbbmFtZV07XG4gIH1cblxuICBwdWJsaWMgYXN5bmMgc2V0KG5hbWU6IHN0cmluZywgdmFsdWU6IGFueSkge1xuICAgIGlmICghdGhpcy5fc2V0dGluZ3MpXG4gICAgICBhd2FpdCB0aGlzLmxvYWQoKTtcbiAgICB0aGlzLl9jdXJyZW50Lm9iamVjdFtuYW1lXSA9IHZhbHVlO1xuICAgIGF3YWl0IHRoaXMuc2F2ZSgpO1xuICB9XG5cbiAgcHVibGljIGFzeW5jIGxvYWQoKSB7XG4gICAgdHJ5IHtcbiAgICAgIGNvbnN0IGNvbnRlbnQgPSBhd2FpdCBmcy5wcm9taXNlcy5yZWFkRmlsZSh0aGlzLl9maWxlbmFtZSwgXCJ1dGYtOFwiKTtcbiAgICAgIHRoaXMuX3NldHRpbmdzID0gSlNPTi5wYXJzZShjb250ZW50KTtcbiAgICB9XG4gICAgY2F0Y2ggKGUpIHtcbiAgICAgIHRoaXMuX3NldHRpbmdzID0ge307XG4gICAgfVxuICAgIHRoaXMuX2N1cnJlbnQgPVxuICAgIHtcbiAgICAgIHBhcmVudDogbnVsbCxcbiAgICAgIG9iamVjdDogdGhpcy5fc2V0dGluZ3MsXG4gICAgfTtcbiAgfVxuXG4gIHB1YmxpYyBhc3luYyBzYXZlKCkge1xuICAgIGNvbnN0IHNwYWNlID0gMjtcbiAgICBjb25zdCBjb250ZW50ID0gSlNPTi5zdHJpbmdpZnkodGhpcy5fc2V0dGluZ3MsIHVuZGVmaW5lZCwgc3BhY2UpO1xuICAgIGF3YWl0IGZzLnByb21pc2VzLndyaXRlRmlsZSh0aGlzLl9maWxlbmFtZSwgY29udGVudCwgeyBlbmNvZGluZzogXCJ1dGYtOFwiLCBmbGFnOiBcIndcIiwgZmx1c2g6IHRydWUgfSk7XG4gIH1cbn07XG4iLCIvKlxuICogTUlUIExpY2Vuc2VcbiAqXG4gKiBDb3B5cmlnaHQgKGMpIDIwMjUgIFl1cmlpIFlha3ViaW4gKHl1cmlpLnlha3ViaW5AZ21haWwuY29tKVxuICpcbiAqIFBlcm1pc3Npb24gaXMgZ3JhbnRlZCB0byB1c2UsIGNvcHksIG1vZGlmeSwgYW5kIGRpc3RyaWJ1dGUgdGhpcyBzb2Z0d2FyZVxuICogdW5kZXIgdGhlIE1JVCBMaWNlbnNlLiBTZWUgTElDRU5TRSBmaWxlIGZvciBkZXRhaWxzLlxuICovXG5cbmV4cG9ydCBmdW5jdGlvbiBlbnN1cmVCb29sZWFuKHZhbHVlOiBhbnkpIHtcbiAgaWYgKHR5cGVvZiB2YWx1ZSA9PT0gXCJib29sZWFuXCIpXG4gICAgcmV0dXJuIHZhbHVlO1xuICB0aHJvdyBuZXcgVHlwZUVycm9yKGBUaGUgJyR7dmFsdWV9JyBpcyBub3QgYSBib29sZWFuYCk7XG59XG5cbmV4cG9ydCBmdW5jdGlvbiBlbnN1cmVOdW1iZXIodmFsdWU6IGFueSkge1xuICBpZiAodHlwZW9mIHZhbHVlID09PSBcIm51bWJlclwiKVxuICAgIHJldHVybiB2YWx1ZTtcbiAgdGhyb3cgbmV3IFR5cGVFcnJvcihgVGhlICcke3ZhbHVlfScgaXMgbm90IGEgbnVtYmVyYCk7XG59XG5cbmV4cG9ydCBmdW5jdGlvbiBlbnN1cmVTdHJpbmcodmFsdWU6IGFueSkge1xuICBpZiAodHlwZW9mIHZhbHVlID09PSBcInN0cmluZ1wiKVxuICAgIHJldHVybiB2YWx1ZTtcbiAgdGhyb3cgbmV3IFR5cGVFcnJvcihgVGhlICcke3ZhbHVlfScgaXMgbm90IGEgc3RyaW5nYCk7XG59XG5cbmV4cG9ydCBmdW5jdGlvbiBlbnN1cmVBcnJheSh2YWx1ZTogYW55KSB7XG4gIGlmIChBcnJheS5pc0FycmF5KHZhbHVlKSlcbiAgICByZXR1cm4gQXJyYXkuZnJvbSh2YWx1ZSk7XG4gIHRocm93IG5ldyBUeXBlRXJyb3IoYFRoZSAnJHt2YWx1ZX0nIGlzIG5vdCBhIGFycmF5YCk7XG59XG4iLCIvKlxuICogTUlUIExpY2Vuc2VcbiAqXG4gKiBDb3B5cmlnaHQgKGMpIDIwMjUgIFl1cmlpIFlha3ViaW4gKHl1cmlpLnlha3ViaW5AZ21haWwuY29tKVxuICpcbiAqIFBlcm1pc3Npb24gaXMgZ3JhbnRlZCB0byB1c2UsIGNvcHksIG1vZGlmeSwgYW5kIGRpc3RyaWJ1dGUgdGhpcyBzb2Z0d2FyZVxuICogdW5kZXIgdGhlIE1JVCBMaWNlbnNlLiBTZWUgTElDRU5TRSBmaWxlIGZvciBkZXRhaWxzLlxuICovXG5cbmV4cG9ydCBjb25zdCBGSUxFX1NDSEVNRSA9IFwiZmlsZTovL1wiO1xuZXhwb3J0IGNvbnN0IElNUE9SVF9TQ0hFTUUgPSBcImltcG9ydDovL1wiO1xuZXhwb3J0IGNvbnN0IEhUVFBfU0NIRU1FID0gXCJodHRwOi8vXCI7XG5leHBvcnQgY29uc3QgSFRUUFNfU0NIRU1FID0gXCJodHRwczovL1wiO1xuIiwibW9kdWxlLmV4cG9ydHMgPSByZXF1aXJlKFwiaHR0cFwiKTsiLCJtb2R1bGUuZXhwb3J0cyA9IHJlcXVpcmUoXCJodHRwc1wiKTsiLCJtb2R1bGUuZXhwb3J0cyA9IHJlcXVpcmUoXCJub2RlOmNoaWxkX3Byb2Nlc3NcIik7IiwibW9kdWxlLmV4cG9ydHMgPSByZXF1aXJlKFwibm9kZTpmc1wiKTsiLCJtb2R1bGUuZXhwb3J0cyA9IHJlcXVpcmUoXCJub2RlOm9zXCIpOyIsIm1vZHVsZS5leHBvcnRzID0gcmVxdWlyZShcIm5vZGU6cGF0aFwiKTsiLCJtb2R1bGUuZXhwb3J0cyA9IHJlcXVpcmUoXCJub2RlOnVybFwiKTsiLCJtb2R1bGUuZXhwb3J0cyA9IHJlcXVpcmUoXCJub2RlOndvcmtlcl90aHJlYWRzXCIpOyIsIi8vIFRoZSBtb2R1bGUgY2FjaGVcbnZhciBfX3dlYnBhY2tfbW9kdWxlX2NhY2hlX18gPSB7fTtcblxuLy8gVGhlIHJlcXVpcmUgZnVuY3Rpb25cbmZ1bmN0aW9uIF9fd2VicGFja19yZXF1aXJlX18obW9kdWxlSWQpIHtcblx0Ly8gQ2hlY2sgaWYgbW9kdWxlIGlzIGluIGNhY2hlXG5cdHZhciBjYWNoZWRNb2R1bGUgPSBfX3dlYnBhY2tfbW9kdWxlX2NhY2hlX19bbW9kdWxlSWRdO1xuXHRpZiAoY2FjaGVkTW9kdWxlICE9PSB1bmRlZmluZWQpIHtcblx0XHRyZXR1cm4gY2FjaGVkTW9kdWxlLmV4cG9ydHM7XG5cdH1cblx0Ly8gQ3JlYXRlIGEgbmV3IG1vZHVsZSAoYW5kIHB1dCBpdCBpbnRvIHRoZSBjYWNoZSlcblx0dmFyIG1vZHVsZSA9IF9fd2VicGFja19tb2R1bGVfY2FjaGVfX1ttb2R1bGVJZF0gPSB7XG5cdFx0Ly8gbm8gbW9kdWxlLmlkIG5lZWRlZFxuXHRcdC8vIG5vIG1vZHVsZS5sb2FkZWQgbmVlZGVkXG5cdFx0ZXhwb3J0czoge31cblx0fTtcblxuXHQvLyBFeGVjdXRlIHRoZSBtb2R1bGUgZnVuY3Rpb25cblx0X193ZWJwYWNrX21vZHVsZXNfX1ttb2R1bGVJZF0obW9kdWxlLCBtb2R1bGUuZXhwb3J0cywgX193ZWJwYWNrX3JlcXVpcmVfXyk7XG5cblx0Ly8gUmV0dXJuIHRoZSBleHBvcnRzIG9mIHRoZSBtb2R1bGVcblx0cmV0dXJuIG1vZHVsZS5leHBvcnRzO1xufVxuXG4iLCIvLyBnZXREZWZhdWx0RXhwb3J0IGZ1bmN0aW9uIGZvciBjb21wYXRpYmlsaXR5IHdpdGggbm9uLWhhcm1vbnkgbW9kdWxlc1xuX193ZWJwYWNrX3JlcXVpcmVfXy5uID0gKG1vZHVsZSkgPT4ge1xuXHR2YXIgZ2V0dGVyID0gbW9kdWxlICYmIG1vZHVsZS5fX2VzTW9kdWxlID9cblx0XHQoKSA9PiAobW9kdWxlWydkZWZhdWx0J10pIDpcblx0XHQoKSA9PiAobW9kdWxlKTtcblx0X193ZWJwYWNrX3JlcXVpcmVfXy5kKGdldHRlciwgeyBhOiBnZXR0ZXIgfSk7XG5cdHJldHVybiBnZXR0ZXI7XG59OyIsIi8vIGRlZmluZSBnZXR0ZXIgZnVuY3Rpb25zIGZvciBoYXJtb255IGV4cG9ydHNcbl9fd2VicGFja19yZXF1aXJlX18uZCA9IChleHBvcnRzLCBkZWZpbml0aW9uKSA9PiB7XG5cdGZvcih2YXIga2V5IGluIGRlZmluaXRpb24pIHtcblx0XHRpZihfX3dlYnBhY2tfcmVxdWlyZV9fLm8oZGVmaW5pdGlvbiwga2V5KSAmJiAhX193ZWJwYWNrX3JlcXVpcmVfXy5vKGV4cG9ydHMsIGtleSkpIHtcblx0XHRcdE9iamVjdC5kZWZpbmVQcm9wZXJ0eShleHBvcnRzLCBrZXksIHsgZW51bWVyYWJsZTogdHJ1ZSwgZ2V0OiBkZWZpbml0aW9uW2tleV0gfSk7XG5cdFx0fVxuXHR9XG59OyIsIl9fd2VicGFja19yZXF1aXJlX18ubyA9IChvYmosIHByb3ApID0+IChPYmplY3QucHJvdG90eXBlLmhhc093blByb3BlcnR5LmNhbGwob2JqLCBwcm9wKSkiLCIvLyBkZWZpbmUgX19lc01vZHVsZSBvbiBleHBvcnRzXG5fX3dlYnBhY2tfcmVxdWlyZV9fLnIgPSAoZXhwb3J0cykgPT4ge1xuXHRpZih0eXBlb2YgU3ltYm9sICE9PSAndW5kZWZpbmVkJyAmJiBTeW1ib2wudG9TdHJpbmdUYWcpIHtcblx0XHRPYmplY3QuZGVmaW5lUHJvcGVydHkoZXhwb3J0cywgU3ltYm9sLnRvU3RyaW5nVGFnLCB7IHZhbHVlOiAnTW9kdWxlJyB9KTtcblx0fVxuXHRPYmplY3QuZGVmaW5lUHJvcGVydHkoZXhwb3J0cywgJ19fZXNNb2R1bGUnLCB7IHZhbHVlOiB0cnVlIH0pO1xufTsiLCIvKlxuICogTUlUIExpY2Vuc2VcbiAqXG4gKiBDb3B5cmlnaHQgKGMpIDIwMjUgIFl1cmlpIFlha3ViaW4gKHl1cmlpLnlha3ViaW5AZ21haWwuY29tKVxuICpcbiAqIFBlcm1pc3Npb24gaXMgZ3JhbnRlZCB0byB1c2UsIGNvcHksIG1vZGlmeSwgYW5kIGRpc3RyaWJ1dGUgdGhpcyBzb2Z0d2FyZVxuICogdW5kZXIgdGhlIE1JVCBMaWNlbnNlLiBTZWUgTElDRU5TRSBmaWxlIGZvciBkZXRhaWxzLlxuICovXG5cbi8vLyA8cmVmZXJlbmNlIHBhdGg9XCJnbG9iYWwuZC50c1wiIC8+XG5cbmltcG9ydCB7IGlzRW50cnlQb2ludCB9IGZyb20gXCJAL3V0aWxzL01vZHVsZVwiO1xuaW1wb3J0ICogYXMgY3h4IGZyb20gXCJAL2N4eFwiO1xuaW1wb3J0IHsgQ01ha2VQcm9jZXNzLCBDVGVzdFByb2Nlc3MsIFNjcmlwdE1vZGVPcHRpb25zLCBnZXRQcm9qZWN0SW5mbyB9IGZyb20gXCJAL2NtYWtlXCI7XG5cbmltcG9ydCB7IHNwYXduQXN5bmMgfSBmcm9tIFwiQC91dGlscy9DaGlsZFByb2Nlc3NcIjtcbmltcG9ydCB7IHJlcXVlc3RHZXQsIGRvd25sb2FkRmlsZSB9IGZyb20gXCJAL3V0aWxzL0h0dHBSZXF1ZXN0XCI7XG5pbXBvcnQgeyBQYXRoIH0gZnJvbSBcIkAvdXRpbHMvUGF0aFwiO1xuaW1wb3J0IHsgcnVuU2NyaXB0IH0gZnJvbSBcIkAvUnVuU2NyaXB0XCI7XG5cbmV4cG9ydCBkZWZhdWx0IHtcbiAgY3h4LFxuICBjbWFrZToge1xuICAgIHNjcmlwdE1vZGU6IChzY3JpcHRGaWxlOiBzdHJpbmcsIHZhcmlhYmxlczogb2JqZWN0LCBvcHRpb25zPzogU2NyaXB0TW9kZU9wdGlvbnMpID0+IENNYWtlUHJvY2Vzcy5nZXRJbnN0YW5jZSgpLnNjcmlwdE1vZGUoc2NyaXB0RmlsZSwgdmFyaWFibGVzLCBvcHRpb25zKSxcbiAgICBjb25maWd1cmU6IChhcmdzOiBhbnkpID0+IENNYWtlUHJvY2Vzcy5nZXRJbnN0YW5jZSgpLmNvbmZpZ3VyZShhcmdzKSxcbiAgICBidWlsZDogKGFyZ3M6IGFueSkgPT4gQ01ha2VQcm9jZXNzLmdldEluc3RhbmNlKCkuYnVpbGQoYXJncyksXG4gICAgaW5zdGFsbDogKGFyZ3M6IGFueSkgPT4gQ01ha2VQcm9jZXNzLmdldEluc3RhbmNlKCkuaW5zdGFsbChhcmdzKSxcbiAgICBleHRyYWN0OiAoYXJnczogYW55KSA9PiBDTWFrZVByb2Nlc3MuZ2V0SW5zdGFuY2UoKS5leHRyYWN0KGFyZ3MpLFxuICAgIGN0ZXN0OiAoYXJnczogYW55KSA9PiBDVGVzdFByb2Nlc3MuZ2V0SW5zdGFuY2UoKS5jdGVzdChhcmdzKSxcbiAgICBnZXRQcm9qZWN0SW5mbyxcbiAgfSxcbiAgcHJvY2Vzczoge1xuICAgIHNwYXduOiBzcGF3bkFzeW5jLFxuICB9LFxuICB1dGlsczoge1xuICAgIHJlcXVlc3RHZXQsXG4gICAgZG93bmxvYWRGaWxlLFxuICB9LFxuICBwYXRoOiBQYXRoLFxufTtcblxuaWYgKGlzRW50cnlQb2ludCgpKSB7XG4gIHJ1blNjcmlwdCgpO1xufVxuIl0sIm5hbWVzIjpbXSwic291cmNlUm9vdCI6IiJ9