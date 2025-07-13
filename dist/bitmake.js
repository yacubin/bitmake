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
/* harmony export */   GeneralContext: () => (/* binding */ GeneralContext),
/* harmony export */   MakeContext: () => (/* binding */ MakeContext),
/* harmony export */   createContext: () => (/* binding */ createContext),
/* harmony export */   createVariableMapForDirectory: () => (/* binding */ createVariableMapForDirectory),
/* harmony export */   performContext: () => (/* binding */ performContext)
/* harmony export */ });
/* harmony import */ var _core_FindProgram__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! @/core/FindProgram */ "./src/core/FindProgram.ts");
/* harmony import */ var _core_Scope__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! @/core/Scope */ "./src/core/Scope.ts");
/* harmony import */ var _logger__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! @/logger */ "./src/logger/index.ts");
/* harmony import */ var _core_AbsolutePath__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! @/core/AbsolutePath */ "./src/core/AbsolutePath.ts");
/* harmony import */ var _utils_Module__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! @/utils/Module */ "./src/utils/Module.ts");
/* harmony import */ var _core_Target__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(/*! @/core/Target */ "./src/core/Target.ts");
/* harmony import */ var _Constants__WEBPACK_IMPORTED_MODULE_6__ = __webpack_require__(/*! @/Constants */ "./src/Constants.ts");
/*
 * MIT License
 *
 * Copyright (c) 2025  Yurii Yakubin (yurii.yakubin@gmail.com)
 *
 * Permission is granted to use, copy, modify, and distribute this software
 * under the MIT License. See LICENSE file for details.
 */







const logger = _logger__WEBPACK_IMPORTED_MODULE_2__.Logger.create("file:///mnt/c/opt/work/source/darkit-sdk/external/bitmake/src/core/BaseContext.ts");
class GeneralContext {
    _scope;
    constructor(scope) {
        this._scope = scope;
    }
    findProgram(name) {
        return (0,_core_FindProgram__WEBPACK_IMPORTED_MODULE_0__.findProgramSync)(name);
    }
    getProperty(name) {
        return _core_Scope__WEBPACK_IMPORTED_MODULE_1__.ScopeHelper.get(this._scope, name);
    }
    setProperty(name, value) {
        const entry = this._scope[name];
        if (entry)
            _core_Scope__WEBPACK_IMPORTED_MODULE_1__.ScopeHelper.setEntryValue(entry, value);
        else
            _core_Scope__WEBPACK_IMPORTED_MODULE_1__.ScopeHelper.defineVariable(this._scope, "", name, { value });
        return true;
    }
    hasProperty(name) {
        return Object.hasOwn(this._scope, name);
    }
    deleteProperty(name) {
        return delete this._scope[name];
    }
    getPropertyNames() {
        return Object.keys(this._scope);
    }
}
;
class MakeContext extends GeneralContext {
    _targets = new Map();
    _indirectTargets = new Map();
    constructor(scope) {
        super(scope);
    }
    get targets() {
        return this._targets;
    }
    get indirectTargets() {
        return this._indirectTargets;
    }
    getCacheVariables() {
        return _core_Scope__WEBPACK_IMPORTED_MODULE_1__.ScopeHelper.getVariablesByGroup(this._scope, _Constants__WEBPACK_IMPORTED_MODULE_6__.CUSTOM_VARIABLE_GROUP);
    }
    addIncludeDirectories(...dirs) {
        const sourceDir = _core_Scope__WEBPACK_IMPORTED_MODULE_1__.ScopeHelper.get(this._scope, "SOURCE_DIR");
        for (const iter of dirs.flat())
            _core_Scope__WEBPACK_IMPORTED_MODULE_1__.ScopeHelper.get(this._scope, "INCLUDES").push(sourceDir.resolve(iter));
    }
    target(name) {
        let target = this._indirectTargets.get(name);
        if (!target) {
            target = _core_Target__WEBPACK_IMPORTED_MODULE_5__.PostTarget.create(this._scope, name);
            this._indirectTargets.set(name, target);
        }
        return target;
    }
    addObjectLibrary(name, ...sources) {
        if (this._targets.has(name))
            throw new Error(`Target "${name}" exists`);
        const target = _core_Target__WEBPACK_IMPORTED_MODULE_5__.ObjectLibrary.create(this._scope, name);
        this._targets.set(name, target);
        target.addSources(...sources);
        return target;
    }
    addStaticLibrary(name, ...sources) {
        if (this._targets.has(name))
            throw new Error(`Target "${name}" exists`);
        const target = _core_Target__WEBPACK_IMPORTED_MODULE_5__.StaticLibrary.create(this._scope, name);
        this._targets.set(name, target);
        target.addSources(...sources);
        return target;
    }
    addSharedLibrary(name, ...sources) {
        if (this._targets.has(name))
            throw new Error(`Target "${name}" exists`);
        const target = _core_Target__WEBPACK_IMPORTED_MODULE_5__.SharedLibrary.create(this._scope, name);
        this._targets.set(name, target);
        target.addSources(...sources);
        return target;
    }
    addExecutable(name, ...sources) {
        if (this._targets.has(name))
            throw new Error(`Target "${name}" exists`);
        const target = _core_Target__WEBPACK_IMPORTED_MODULE_5__.Executable.create(this._scope, name);
        this._targets.set(name, target);
        target.addSources(...sources);
        return target;
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
        else if (!(value instanceof _core_Target__WEBPACK_IMPORTED_MODULE_0__.PostTarget)) {
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
            type: InstallEntity.name,
            VALUE: this.VALUE,
            DESTINATION: this.DESTINATION,
            BASE_DIR: this.BASE_DIR,
        };
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
/* harmony import */ var _core_MakeInterfaces__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! @/core/MakeInterfaces */ "./src/core/MakeInterfaces.ts");
/* harmony import */ var _core_BaseContext__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! @/core/BaseContext */ "./src/core/BaseContext.ts");
/* harmony import */ var _utils_FileSystem__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! @/utils/FileSystem */ "./src/utils/FileSystem.ts");
/* harmony import */ var _core_InstallEntity__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! @/core/InstallEntity */ "./src/core/InstallEntity.ts");
/* harmony import */ var _core_Scope__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! @/core/Scope */ "./src/core/Scope.ts");
/* harmony import */ var _utils_Module__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(/*! @/utils/Module */ "./src/utils/Module.ts");
/* harmony import */ var _Constants__WEBPACK_IMPORTED_MODULE_6__ = __webpack_require__(/*! @/Constants */ "./src/Constants.ts");
/* harmony import */ var _logger__WEBPACK_IMPORTED_MODULE_7__ = __webpack_require__(/*! @/logger */ "./src/logger/index.ts");
/*
 * MIT License
 *
 * Copyright (c) 2025  Yurii Yakubin (yurii.yakubin@gmail.com)
 *
 * Permission is granted to use, copy, modify, and distribute this software
 * under the MIT License. See LICENSE file for details.
 */








const logger = _logger__WEBPACK_IMPORTED_MODULE_7__.Logger.create("file:///mnt/c/opt/work/source/darkit-sdk/external/bitmake/src/core/LocalMakeContext.ts");
class LocalMakeContext extends _core_BaseContext__WEBPACK_IMPORTED_MODULE_1__.MakeContext {
    _project;
    constructor(scope, project) {
        super(scope);
        this._project = project;
    }
    executeScript(script, params) {
        this._project.executeScriptSync(this._scope, script, params);
    }
    addCacheVariables(params) {
        let variables = params;
        if (typeof params === "string") {
            const filename = _core_Scope__WEBPACK_IMPORTED_MODULE_4__.ScopeHelper.get(this._scope, "SOURCE_DIR").resolve(params).toString();
            if (!(0,_utils_FileSystem__WEBPACK_IMPORTED_MODULE_2__.fileExistsSync)(filename))
                return;
            variables = (0,_utils_Module__WEBPACK_IMPORTED_MODULE_5__.requireSync)(filename);
        }
        _core_Scope__WEBPACK_IMPORTED_MODULE_4__.ScopeHelper.defineVariablesInVariableMap(this._scope, _Constants__WEBPACK_IMPORTED_MODULE_6__.CUSTOM_VARIABLE_GROUP, variables);
    }
    addSubdirectory(sourceDir, binaryDir) {
        this._project.addSubdirectory(this._scope, sourceDir, binaryDir);
    }
    addCustomScript(script, params) {
        const newVariableMap = _core_Scope__WEBPACK_IMPORTED_MODULE_4__.ScopeHelper.cloneVariableMap(this._scope);
        _core_Scope__WEBPACK_IMPORTED_MODULE_4__.ScopeHelper.extendVariableMapByValues(newVariableMap, _Constants__WEBPACK_IMPORTED_MODULE_6__.CUSTOM_VARIABLE_GROUP, params);
        _core_Scope__WEBPACK_IMPORTED_MODULE_4__.ScopeHelper.set(newVariableMap, "SCRIPT_MODULE", script);
        return this._project.addCustomScript(newVariableMap);
    }
    script(name) {
        return this._project.getInterfaceScript(this._scope, name);
    }
    install(value, params) {
        const scope = _core_Scope__WEBPACK_IMPORTED_MODULE_4__.ScopeHelper.createVariableValues(this._scope);
        for (const it of [value].flat()) {
            const iter = (it instanceof _core_MakeInterfaces__WEBPACK_IMPORTED_MODULE_0__.InterfaceTarget) ? this.target(it.targetName) : it;
            const entity = _core_InstallEntity__WEBPACK_IMPORTED_MODULE_3__.InstallEntity.create(scope, iter, params);
            this._project.addInstallEntry(entity);
        }
    }
}
;


/***/ }),

/***/ "./src/core/MakeInterfaces.ts":
/*!************************************!*\
  !*** ./src/core/MakeInterfaces.ts ***!
  \************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   InterfaceTarget: () => (/* binding */ InterfaceTarget)
/* harmony export */ });
/*
 * MIT License
 *
 * Copyright (c) 2025  Yurii Yakubin (yurii.yakubin@gmail.com)
 *
 * Permission is granted to use, copy, modify, and distribute this software
 * under the MIT License. See LICENSE file for details.
 */
class InterfaceTarget {
}
;
;
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
class PluginContext extends _core_BaseContext__WEBPACK_IMPORTED_MODULE_0__.GeneralContext {
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
/* harmony import */ var _core_TargetFile__WEBPACK_IMPORTED_MODULE_19__ = __webpack_require__(/*! @/core/TargetFile */ "./src/core/TargetFile.ts");
/* harmony import */ var _core_BaseContext__WEBPACK_IMPORTED_MODULE_20__ = __webpack_require__(/*! @/core/BaseContext */ "./src/core/BaseContext.ts");
/* harmony import */ var _core_BuildinScripts__WEBPACK_IMPORTED_MODULE_21__ = __webpack_require__(/*! @/core/BuildinScripts */ "./src/core/BuildinScripts/index.ts");
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
function ensureValueByType(type, value) {
    if (Array.isArray(type) ? type.includes(value) : typeof value === type)
        return value;
    throw new Error(`The '${value}' is not a ${type}`);
}
;
function resolveInstance(project, o) {
    if (typeof o === "string")
        return o;
    if (o instanceof _core_AbsolutePath__WEBPACK_IMPORTED_MODULE_4__.AbsolutePath)
        return o.toString();
    if (o instanceof _core_TargetFile__WEBPACK_IMPORTED_MODULE_19__.TargetFile) {
        const target = project.TARGETS.get(o.targetName);
        return target.getFile().toString();
    }
    throw new Error(`Unable to resolve object ${o}`);
}
function resolveTargetCommand(project, tcmd) {
    const command = resolveInstance(project, tcmd.command);
    const args = tcmd.args.map(i => resolveInstance(project, i));
    return { command, args };
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
            logger.debug("spawnSync");
            logger.debug("  command", command);
            logger.debug("  cwd", cwd);
            for (let i = 0; i < args.length; i++)
                logger.debug(`  args[${i}]`, args[i]);
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
        this[BUILTIN_SCRIPTS] = _core_BuildinScripts__WEBPACK_IMPORTED_MODULE_21__["default"];
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
        const newVariableMap = (0,_core_BaseContext__WEBPACK_IMPORTED_MODULE_20__.createVariableMapForDirectory)(variableMap, sourceDir, binaryDir);
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
            await (0,_core_BaseContext__WEBPACK_IMPORTED_MODULE_20__.performContext)(mk);
            process.chdir(cwdSave);
        }
        for (const ctx of contextList) {
            for (const [name, target] of ctx.targets)
                this[TARGETS].set(name, target);
        }
        for (const ctx of contextList) {
            for (const [name, target] of ctx.indirectTargets)
                this[TARGETS].get(name).postUpdate(target);
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
        for (const target of this[TARGETS].ENTRIES.values()) {
            for (const it of target.getSourceFileList()) {
                if (!it.LANGUAGE)
                    continue;
                const rfile1 = target.TARGET_SCOPE.BINARY_DIR.relative(it.FILE);
                const rfile2 = target.TARGET_SCOPE.SOURCE_DIR.relative(it.FILE);
                const rfile = (rfile2.length < rfile1.length ? rfile2 : rfile1).replace("../", "__/");
                const ofile = target.TARGET_SCOPE.BINARY_DIR.join("MakeFiles", target.targetName + ".dir", rfile + ".obj");
                objectFiles.set(it, ofile);
            }
        }
        for (const [name, target] of this[TARGETS].ENTRIES) {
            const depends = [];
            for (const s of target.getTargetObjectsList()) {
                const t = this[TARGETS].get(s.targetName);
                for (const f of t.getSourceFileList()) {
                    const o = objectFiles.get(f);
                    o && depends.push(o.toString());
                }
            }
            const headers = this[TARGETS].allHeadersOf(target);
            for (const s of target.getSourceFileList()) {
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
                if (target.positionIndependentCode)
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
            for (const params of target.preBuildList) {
                const execStruct = resolveTargetCommand(this, params);
                generalGoal.addExec(execStruct.command, execStruct.args, target.TARGET_SCOPE.BINARY_DIR.toString());
            }
            const linkOptions = this[TARGETS].allLinkOptionsOf(target);
            if (target instanceof _core_Target__WEBPACK_IMPORTED_MODULE_13__.ObjectLibrary) {
                const objs = depends.filter(i => i.endsWith(".o") || i.endsWith(".obj")).map(i => target.getFileDir().relative(i));
                if (objs.length) {
                    const args = [
                        ...linkOptions,
                        "-r",
                        "-o", target.getFileName(),
                        ...objs
                    ];
                    generalGoal.message = `Linking CXX object library ${target.getFileName()}`;
                    generalGoal.output = target.getFile().toString();
                    generalGoal.addDependency(...depends);
                    generalGoal.addExec(scope.LINKER, args, target.getFileDir().toString());
                }
                else {
                    logger.info(`No objects for "${target.targetName}"`);
                }
            }
            if (target instanceof _core_Target__WEBPACK_IMPORTED_MODULE_13__.StaticLibrary) {
                const objs = depends.filter(i => i.endsWith(".o") || i.endsWith(".obj")).map(i => target.getFileDir().relative(i));
                if (objs.length) {
                    const args = ["rc", target.getFileName(), ...objs];
                    generalGoal.message = `Linking CXX static library ${target.getFileName()}`;
                    generalGoal.output = target.getFile().toString();
                    generalGoal.addDependency(...depends);
                    generalGoal.addExec(scope.AR, args, target.getFileDir().toString());
                }
                else {
                    logger.info(`No objects for "${target.targetName}"`);
                }
            }
            if (target instanceof _core_Target__WEBPACK_IMPORTED_MODULE_13__.SharedLibrary) {
                throw new Error("Not implemented");
            }
            if (target instanceof _core_Target__WEBPACK_IMPORTED_MODULE_13__.Executable) {
                const objs = depends.filter(i => i.endsWith(".o") || i.endsWith(".obj")).map(i => target.getFileDir().relative(i));
                if (objs.length) {
                    const libs = this[TARGETS].allLibrariesOf(target);
                    const args = [
                        ...target.TARGET_SCOPE.CXX_FLAGS,
                        ...linkOptions,
                        ...objs,
                        "-o", target.getFileName(),
                        ...libs.map(i => target.getFileDir().relative(i)),
                    ];
                    generalGoal.message = `Linking CXX executable ${target.getFileName()}`;
                    generalGoal.output = target.getFile().toString();
                    generalGoal.addDependency(...depends);
                    generalGoal.addDependency(...libs);
                    generalGoal.addExec(scope.CXX_COMPILER, args, target.getFileDir().toString());
                }
                else {
                    logger.info(`No objects for "${target.targetName}"`);
                }
            }
            for (const params of target.postBuildList) {
                const execStruct = resolveTargetCommand(this, params);
                generalGoal.addExec(execStruct.command, execStruct.args, target.TARGET_SCOPE.BINARY_DIR.toString());
            }
            goalList.add(generalGoal);
            const worker = new GoalWorkerImpl(name);
            worker.message = `Built target ${name}`;
            worker.addDependency(target.getFile().toString());
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
            else if (iter.VALUE instanceof _core_Target__WEBPACK_IMPORTED_MODULE_13__.PostTarget) {
                const targetName = iter.VALUE.targetName;
                const target = this[TARGETS].get(targetName);
                src = target.getFile().toString();
                dest = iter.DESTINATION.join(target.getFileName());
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
class ScriptContext extends _core_BaseContext__WEBPACK_IMPORTED_MODULE_0__.GeneralContext {
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

/***/ "./src/core/SimpleObject.ts":
/*!**********************************!*\
  !*** ./src/core/SimpleObject.ts ***!
  \**********************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   SimpleObject: () => (/* binding */ SimpleObject)
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
const _creators = new Map();
var SimpleObject;
(function (SimpleObject) {
    function registerInstanceCreator(name, func) {
        if (!name && _creators.has(name))
            throw new Error(`Name "${name}" is wrong or registered`);
        _creators.set(name, func);
    }
    SimpleObject.registerInstanceCreator = registerInstanceCreator;
    function createInstance(object) {
        const func = _creators.get(object.type);
        if (!func)
            throw new Error(`Uknown object type: ${JSON.stringify(object)}`);
        return func(object);
    }
    SimpleObject.createInstance = createInstance;
})(SimpleObject || (SimpleObject = {})); // namespace SimpleObject


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
/* harmony export */   Executable: () => (/* binding */ Executable),
/* harmony export */   MainTarget: () => (/* binding */ MainTarget),
/* harmony export */   ObjectLibrary: () => (/* binding */ ObjectLibrary),
/* harmony export */   PostTarget: () => (/* binding */ PostTarget),
/* harmony export */   SharedLibrary: () => (/* binding */ SharedLibrary),
/* harmony export */   StaticLibrary: () => (/* binding */ StaticLibrary)
/* harmony export */ });
/* harmony import */ var _core_MakeInterfaces__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! @/core/MakeInterfaces */ "./src/core/MakeInterfaces.ts");
/* harmony import */ var _core_SourceFile__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! @/core/SourceFile */ "./src/core/SourceFile.ts");
/* harmony import */ var _core_SourceFileList__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! @/core/SourceFileList */ "./src/core/SourceFileList.ts");
/* harmony import */ var _core_TargetFile__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! @/core/TargetFile */ "./src/core/TargetFile.ts");
/* harmony import */ var _core_TargetIncludes__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! @/core/TargetIncludes */ "./src/core/TargetIncludes.ts");
/* harmony import */ var _core_TargetObjects__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(/*! @/core/TargetObjects */ "./src/core/TargetObjects.ts");
/* harmony import */ var _core_AbsolutePath__WEBPACK_IMPORTED_MODULE_6__ = __webpack_require__(/*! @/core/AbsolutePath */ "./src/core/AbsolutePath.ts");
/* harmony import */ var _core_Scope__WEBPACK_IMPORTED_MODULE_7__ = __webpack_require__(/*! @/core/Scope */ "./src/core/Scope.ts");
/* harmony import */ var _Constants__WEBPACK_IMPORTED_MODULE_8__ = __webpack_require__(/*! @/Constants */ "./src/Constants.ts");
/* harmony import */ var _core_DefinitionHelper__WEBPACK_IMPORTED_MODULE_9__ = __webpack_require__(/*! @/core/DefinitionHelper */ "./src/core/DefinitionHelper.ts");
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
        if (iter instanceof _core_TargetIncludes__WEBPACK_IMPORTED_MODULE_4__.TargetIncludes)
            result.push(iter);
        else if (typeof iter === "string")
            result.push(_core_AbsolutePath__WEBPACK_IMPORTED_MODULE_6__.AbsolutePath.create(baseDir.resolve(iter)));
        else if (iter instanceof _core_AbsolutePath__WEBPACK_IMPORTED_MODULE_6__.AbsolutePath)
            result.push(_core_AbsolutePath__WEBPACK_IMPORTED_MODULE_6__.AbsolutePath.create(iter));
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
    if (source instanceof _core_TargetObjects__WEBPACK_IMPORTED_MODULE_5__.TargetObjects || source instanceof _core_SourceFile__WEBPACK_IMPORTED_MODULE_1__.SourceFile)
        return source;
    if (typeof source === "string" || _core_AbsolutePath__WEBPACK_IMPORTED_MODULE_6__.AbsolutePath.isAbsolute(source)) {
        const filename = scope.SOURCE_DIR.resolve(source);
        const language = getFileLanguage(filename.toString());
        const compileFlags = !language ? [] : [
            ...scope[language + "_FLAGS"],
            ...scope[language + "_FLAGS_" + scope.BUILD_TYPE.toUpperCase()],
        ];
        return _core_SourceFile__WEBPACK_IMPORTED_MODULE_1__.SourceFile.create(filename, scope.SOURCE_DIR, language, compileFlags);
    }
    throw new Error(`Not support instance ${source}`);
}
;
function makeTargetCommand(_command, _args) {
    let command;
    if (typeof _command === "string")
        command = _command;
    else if (_command instanceof _core_TargetFile__WEBPACK_IMPORTED_MODULE_3__.TargetFile)
        command = _command;
    else if (_command instanceof _core_AbsolutePath__WEBPACK_IMPORTED_MODULE_6__.AbsolutePath)
        command = _command;
    else
        throw new TypeError(`Wrong type ${_command} for command`);
    const args = new Array;
    for (const iter of _args) {
        if (typeof iter === "string")
            args.push(iter);
        else if (iter instanceof _core_TargetFile__WEBPACK_IMPORTED_MODULE_3__.TargetFile)
            args.push(iter);
        else if (iter instanceof _core_AbsolutePath__WEBPACK_IMPORTED_MODULE_6__.AbsolutePath)
            args.push(iter);
        else
            throw new TypeError(`Wrong type ${iter} for argument`);
    }
    return { command, args };
}
const TARGET_SCOPE = Symbol("TARGET_SCOPE");
;
class BaseTarget extends _core_MakeInterfaces__WEBPACK_IMPORTED_MODULE_0__.InterfaceTarget {
    [TARGET_SCOPE];
    _name;
    _includes;
    _definitions;
    _compileOptions;
    _linkOptions;
    _libraries;
    _sources;
    _preBuildList;
    _postBuildList;
    constructor(variableMap, name) {
        super();
        if (typeof name !== "string")
            throw new Error(`Target "${name}" is not string type`);
        if (!name)
            throw new Error(`A target with an empty name cannot exist`);
        if ([_Constants__WEBPACK_IMPORTED_MODULE_8__.ALL_TARGET, _Constants__WEBPACK_IMPORTED_MODULE_8__.INSTALL_TARGET].includes(name))
            throw new Error(`Target "${name}" is reserved name`);
        const variables = _core_Scope__WEBPACK_IMPORTED_MODULE_7__.ScopeHelper.createVariableValues(variableMap, _Constants__WEBPACK_IMPORTED_MODULE_8__.SYSTEM_VARIABLE_GROUP);
        this[TARGET_SCOPE] = variables;
        this._name = name;
        this._includes = [];
        this._definitions = [];
        this._compileOptions = [];
        this._linkOptions = [];
        this._libraries = [];
        this._sources = [];
        this._preBuildList = [];
        this._postBuildList = [];
    }
    get targetName() {
        return this._name;
    }
    get name() {
        return this._name;
    }
    get includes() {
        return _core_TargetIncludes__WEBPACK_IMPORTED_MODULE_4__.TargetIncludes.create(this._name);
    }
    get objects() {
        return _core_TargetObjects__WEBPACK_IMPORTED_MODULE_5__.TargetObjects.create(this._name);
    }
    get targetFile() {
        return _core_TargetFile__WEBPACK_IMPORTED_MODULE_3__.TargetFile.create(this._name);
    }
    getIncludes() {
        return this._includes.map(i => i.value);
    }
    getPublicIncludes() {
        return this._includes.filter(i => i.publicOnly).map(i => i.value);
    }
    addIncludes(...includes) {
        this.addIncludesImpl(false, ...includes);
    }
    addPublicIncludes(...includes) {
        this.addIncludesImpl(true, ...includes);
    }
    addIncludeImpl(publicOnly, value) {
        this._includes.push({ publicOnly, value });
    }
    addIncludesImpl(publicOnly, ...includes) {
        const baseDir = this[TARGET_SCOPE].SOURCE_DIR;
        for (const iter of normalizeIncludes(baseDir, ...includes))
            this.addIncludeImpl(publicOnly, iter);
    }
    getDefinitions() {
        return this._definitions.map(i => i.value);
    }
    getPublicDefinitions() {
        return this._definitions.filter(i => i.publicOnly).map(i => i.value);
    }
    addDefinitions(...definitions) {
        this.addDefinitionsImpl(false, ...definitions);
    }
    addPublicDefinitions(...definitions) {
        this.addDefinitionsImpl(true, ...definitions);
    }
    addDefinitionsImpl(publicOnly, ...definitions) {
        for (const value of (0,_core_DefinitionHelper__WEBPACK_IMPORTED_MODULE_9__.normalizeDefinitions)(...definitions))
            this._definitions.push({ publicOnly, value });
    }
    getCompileOptions() {
        return this._compileOptions.map(i => i.value);
    }
    getPublicCompileOptions() {
        return this._compileOptions.filter(i => i.publicOnly).map(i => i.value);
    }
    addCompileOptions(...options) {
        this.addCompileOptionsImpl(false, ...options);
    }
    addPublicCompileOptions(...options) {
        this.addCompileOptionsImpl(true, ...options);
    }
    addCompileOptionsImpl(publicOnly, ...options) {
        for (const value of options.flat())
            this._compileOptions.push({ publicOnly, value });
    }
    getLinkOptions() {
        return this._linkOptions.map(i => i.value);
    }
    getPublicLinkOptions() {
        return this._linkOptions.filter(i => i.publicOnly).map(i => i.value);
    }
    addLinkOptions(...options) {
        this.addLinkOptionsImpl(false, ...options);
    }
    addPublicLinkOptions(...options) {
        this.addLinkOptionsImpl(true, ...options);
    }
    addLinkOptionsImpl(publicOnly, ...options) {
        for (const value of options.flat())
            this._linkOptions.push({ publicOnly, value });
    }
    getLibraries() {
        return this._libraries.map(i => i.value);
    }
    getPublicLibraries() {
        return this._libraries.filter(i => i.publicOnly).map(i => i.value);
    }
    addLibraries(...libraries) {
        this.addLibrariesImpl(false, ...libraries);
    }
    addPublicLibraries(...libraries) {
        this.addLibrariesImpl(true, ...libraries);
    }
    addLibrariesImpl(publicOnly, ...libraries) {
        for (const value of libraries.flat())
            this._libraries.push({ publicOnly, value });
    }
    getHeaders() {
        const result = new Array;
        for (const iter of this._sources) {
            if (iter.value instanceof _core_SourceFile__WEBPACK_IMPORTED_MODULE_1__.SourceFile && iter.value.HEADER_FILE_ONLY)
                result.push(iter.value);
        }
        return result;
    }
    getSources() {
        return this._sources;
    }
    getSourceFileList() {
        return this._sources.map(i => i.value).filter(i => i instanceof _core_SourceFile__WEBPACK_IMPORTED_MODULE_1__.SourceFile);
    }
    getTargetObjectsList() {
        return this._sources.map(i => i.value).filter(i => i instanceof _core_TargetObjects__WEBPACK_IMPORTED_MODULE_5__.TargetObjects);
    }
    getSourceFiles(...sources) {
        const result = [];
        const scope = this[TARGET_SCOPE];
        const sourceFiles = this.getSourceFileList();
        for (const it of sources.flat()) {
            const filename = scope.SOURCE_DIR.resolve(it).toString();
            const src = sourceFiles.find(i => i.FILE.toString() === filename);
            if (!src)
                throw new Error(`Cannot find "${it}"`);
            result.push(src);
        }
        if (result.length)
            return _core_SourceFileList__WEBPACK_IMPORTED_MODULE_2__.SourceFileList.create(scope, result);
        return _core_SourceFileList__WEBPACK_IMPORTED_MODULE_2__.SourceFileList.create(scope, sourceFiles);
    }
    addSources(...sources) {
        for (let it of sources.flat()) {
            this._sources.push({ publicOnly: false, value: createSources(this[TARGET_SCOPE], it) });
        }
    }
    get preBuildList() {
        return this._preBuildList;
    }
    addPreBuild(command, args) {
        this._preBuildList.push(makeTargetCommand(command, args));
    }
    get postBuildList() {
        return this._postBuildList;
    }
    addPostBuild(command, args) {
        this._postBuildList.push(makeTargetCommand(command, args));
    }
    toJSON() {
        return {
            name: this._name,
            preBuildList: this._preBuildList,
            postBuildList: this._postBuildList,
            includes: this._includes,
            compileOptions: this._compileOptions,
            linkOptions: this._linkOptions,
            sources: this._sources,
            libraries: this._libraries,
        };
    }
}
;
class PostTarget extends BaseTarget {
    _prefix;
    _outputName;
    _suffix;
    _positionIndependentCode;
    constructor(variableMap, name) {
        super(variableMap, name);
    }
    static create(variableMap, name) {
        return Object.seal(new PostTarget(variableMap, name));
    }
    static ensureInstance(value) {
        if (value instanceof PostTarget)
            return value;
        throw new Error(`The '${value}' is not a PostTarget`);
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
    get positionIndependentCode() {
        return this._positionIndependentCode;
    }
    setPositionIndependentCode(value) {
        this._positionIndependentCode = value;
    }
    get INCLUDES() {
        return this._includes;
    }
    get DEFINITIONS() {
        return this._definitions;
    }
    get COMPILE_OPTIONS() {
        return this._compileOptions;
    }
    get LINK_OPTIONS() {
        return this._linkOptions;
    }
    get LIBRARIES() {
        return this._libraries;
    }
    get SOURCES() {
        return this._sources;
    }
    toJSON() {
        const result = super.toJSON();
        result.type = PostTarget.name;
        if (this._prefix !== undefined)
            result.prefix = this._prefix;
        if (this._outputName !== undefined)
            result.outputName = this._outputName;
        if (this._suffix !== undefined)
            result.suffix = this._suffix;
        if (this._positionIndependentCode !== undefined)
            result.positionIndependentCode = this._positionIndependentCode;
        return result;
    }
}
;
class MainTarget extends BaseTarget {
    _fileDir;
    _prefix = "";
    _outputName;
    _suffix = "";
    _positionIndependentCode;
    constructor(variableMap, name) {
        super(variableMap, name);
        this._fileDir = this[TARGET_SCOPE].BINARY_DIR;
        this._outputName = name;
        this._positionIndependentCode = this[TARGET_SCOPE].POSITION_INDEPENDENT_CODE;
        this.addIncludesImpl(false, ...this[TARGET_SCOPE].INCLUDES);
    }
    getFileDir() {
        return this._fileDir;
    }
    getFileName() {
        return this.prefix + this.outputName + this.suffix;
    }
    getFile() {
        return this._fileDir.join(this.getFileName());
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
    get positionIndependentCode() {
        return this._positionIndependentCode;
    }
    setPositionIndependentCode(value) {
        this._positionIndependentCode = value;
    }
    postUpdate(target) {
        if (target.prefix !== undefined)
            this._prefix = target.prefix;
        if (target.outputName !== undefined)
            this._outputName = target.outputName;
        if (target.suffix !== undefined)
            this._suffix = target.suffix;
        if (target.positionIndependentCode !== undefined)
            this._positionIndependentCode = target.positionIndependentCode;
        this._includes.push(...target.INCLUDES);
        this._definitions.push(...target.DEFINITIONS);
        this._compileOptions.push(...target.COMPILE_OPTIONS);
        this._linkOptions.push(...target.LINK_OPTIONS);
        this._libraries.push(...target.LIBRARIES);
        this._sources.push(...target.SOURCES);
        this._preBuildList.push(...target.preBuildList);
        this._postBuildList.push(...target.postBuildList);
    }
    toJSON() {
        const result = super.toJSON();
        result.fileDir = this._fileDir.toJSON();
        result.prefix = this._prefix;
        result.outputName = this._outputName;
        result.suffix = this._suffix;
        result.positionIndependentCode = this._positionIndependentCode;
        return result;
    }
}
;
class ObjectLibrary extends MainTarget {
    constructor(variableMap, name) {
        super(variableMap, name);
        this._prefix = this[TARGET_SCOPE].OBJECT_LIBRARY_PREFIX;
        this._suffix = this[TARGET_SCOPE].OBJECT_LIBRARY_SUFFIX;
        this.addLinkOptionsImpl(false, ...this[TARGET_SCOPE].OBJECT_LINKER_FLAGS);
    }
    static create(variableMap, name) {
        return Object.seal(new ObjectLibrary(variableMap, name));
    }
    toJSON() {
        const result = super.toJSON();
        result.type = ObjectLibrary.name;
        return result;
    }
}
;
class StaticLibrary extends MainTarget {
    constructor(variableMap, name) {
        super(variableMap, name);
        this._prefix = this[TARGET_SCOPE].STATIC_LIBRARY_PREFIX;
        this._suffix = this[TARGET_SCOPE].STATIC_LIBRARY_SUFFIX;
        this.addLinkOptionsImpl(false, ...this[TARGET_SCOPE].STATIC_LINKER_FLAGS);
    }
    static create(variableMap, name) {
        return Object.seal(new StaticLibrary(variableMap, name));
    }
    toJSON() {
        const result = super.toJSON();
        result.type = StaticLibrary.name;
        return result;
    }
}
;
class SharedLibrary extends MainTarget {
    constructor(variableMap, name) {
        super(variableMap, name);
        this._prefix = this[TARGET_SCOPE].SHARED_LIBRARY_PREFIX;
        this._suffix = this[TARGET_SCOPE].SHARED_LIBRARY_SUFFIX;
        this.addLinkOptionsImpl(false, ...this[TARGET_SCOPE].SHARED_LINKER_FLAGS);
    }
    static create(variableMap, name) {
        return Object.seal(new SharedLibrary(variableMap, name));
    }
    toJSON() {
        const result = super.toJSON();
        result.type = SharedLibrary.name;
        return result;
    }
}
class Executable extends MainTarget {
    constructor(variableMap, name) {
        super(variableMap, name);
        this._prefix = "";
        this._suffix = this[TARGET_SCOPE].EXECUTABLE_SUFFIX;
        this.addLinkOptionsImpl(false, ...this[TARGET_SCOPE].EXE_LINKER_FLAGS);
    }
    static create(variableMap, name) {
        return Object.seal(new Executable(variableMap, name));
    }
    toJSON() {
        const result = super.toJSON();
        result.type = Executable.name;
        return result;
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
/* harmony import */ var _core_TargetIncludes__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! @/core/TargetIncludes */ "./src/core/TargetIncludes.ts");
/* harmony import */ var _core_Target__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! @/core/Target */ "./src/core/Target.ts");
/* harmony import */ var _core_AbsolutePath__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! @/core/AbsolutePath */ "./src/core/AbsolutePath.ts");
/*
 * MIT License
 *
 * Copyright (c) 2025  Yurii Yakubin (yurii.yakubin@gmail.com)
 *
 * Permission is granted to use, copy, modify, and distribute this software
 * under the MIT License. See LICENSE file for details.
 */



const ENTRIES = Symbol("ENTRIES");
class TargetCollection {
    [ENTRIES] = new Map;
    static create() {
        return Object.seal(new TargetCollection);
    }
    get ENTRIES() {
        return this[ENTRIES];
    }
    toJSON() {
        const result = { type: TargetCollection.name };
        this[ENTRIES].forEach((v, k) => void (result[k] = v));
        return result;
    }
    get(name) {
        const result = this[ENTRIES].get(name);
        if (!result)
            throw `Target "${name}" does not exist`;
        return result;
    }
    set(name, target) {
        if (this[ENTRIES].has(name))
            throw new Error(`Target "${name}" exists`);
        this[ENTRIES].set(name, target);
    }
    __getAllIncludes(includes, targetSet, list) {
        for (const iter of list) {
            if (iter instanceof _core_TargetIncludes__WEBPACK_IMPORTED_MODULE_0__.TargetIncludes || iter instanceof _core_Target__WEBPACK_IMPORTED_MODULE_1__.PostTarget) {
                if (!targetSet.has(iter.targetName)) {
                    targetSet.add(iter.targetName);
                    const target = this.get(iter.targetName);
                    this.__getAllIncludes(includes, targetSet, target.getPublicIncludes());
                    this.__getAllIncludes(includes, targetSet, target.getPublicLibraries());
                }
            }
            else if (iter instanceof _core_AbsolutePath__WEBPACK_IMPORTED_MODULE_2__.AbsolutePath) {
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
        const targetSet = new Set([target.targetName]);
        this.__getAllIncludes(includes, targetSet, target.getIncludes());
        this.__getAllIncludes(includes, targetSet, target.getLibraries());
        return includes;
    }
    __getAllHeaders(headers, targetSet, list) {
        for (const iter of list) {
            if (iter instanceof _core_TargetIncludes__WEBPACK_IMPORTED_MODULE_0__.TargetIncludes || iter instanceof _core_Target__WEBPACK_IMPORTED_MODULE_1__.PostTarget) {
                if (!targetSet.has(iter.targetName)) {
                    targetSet.add(iter.targetName);
                    const target = this.get(iter.targetName);
                    for (const header of target.getHeaders().map((i) => i.FILE.toString())) {
                        if (!headers.includes(header.toString()))
                            headers.push(header.toString());
                    }
                    this.__getAllHeaders(headers, targetSet, target.getPublicIncludes());
                    this.__getAllHeaders(headers, targetSet, target.getPublicLibraries());
                }
            }
        }
    }
    allHeadersOf(params) {
        const target = (typeof params === "string") ? this.get(params) : params;
        const headers = target.getHeaders().map((i) => i.FILE.toString());
        const targetSet = new Set([target.targetName]);
        this.__getAllHeaders(headers, targetSet, target.getIncludes());
        this.__getAllHeaders(headers, targetSet, target.getLibraries());
        return headers;
    }
    __getAllLibraries(libraries, targetSet, list) {
        for (const iter of list) {
            console.assert(iter instanceof _core_Target__WEBPACK_IMPORTED_MODULE_1__.PostTarget);
            if (!targetSet.has(iter.targetName)) {
                targetSet.add(iter.targetName);
                const target = this.get(iter.targetName);
                libraries.push(target.getFile().toString());
                this.__getAllLibraries(libraries, targetSet, target.getPublicLibraries());
            }
        }
    }
    allLibrariesOf(params) {
        const target = (typeof params === "string") ? this.get(params) : params;
        const libraries = [];
        const targetSet = new Set([target.targetName]);
        this.__getAllLibraries(libraries, targetSet, target.getLibraries());
        return libraries;
    }
    __getAllDefinitions(definitions, targetSet, list) {
        for (const iter of list) {
            if (iter instanceof _core_Target__WEBPACK_IMPORTED_MODULE_1__.PostTarget) {
                if (!targetSet.has(iter.targetName)) {
                    targetSet.add(iter.targetName);
                    const target = this.get(iter.targetName);
                    this.__getAllDefinitions(definitions, targetSet, target.getPublicDefinitions());
                    this.__getAllDefinitions(definitions, targetSet, target.getPublicLibraries());
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
        const targetSet = new Set([target.targetName]);
        this.__getAllDefinitions(definitions, targetSet, target.getDefinitions());
        this.__getAllDefinitions(definitions, targetSet, target.getPublicLibraries());
        return definitions;
    }
    __getAllCompileOptions(options, targetSet, list) {
        for (const iter of list) {
            if (iter instanceof _core_Target__WEBPACK_IMPORTED_MODULE_1__.PostTarget) {
                if (!targetSet.has(iter.targetName)) {
                    targetSet.add(iter.targetName);
                    const target = this.get(iter.targetName);
                    this.__getAllCompileOptions(options, targetSet, target.getPublicCompileOptions());
                    this.__getAllCompileOptions(options, targetSet, target.getPublicLibraries());
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
        const targetSet = new Set([target.targetName]);
        this.__getAllCompileOptions(options, targetSet, target.getCompileOptions());
        this.__getAllCompileOptions(options, targetSet, target.getPublicLibraries());
        return options.flat();
    }
    __getLinkOptions(options, targetSet, list) {
        for (const iter of list) {
            if (iter instanceof _core_Target__WEBPACK_IMPORTED_MODULE_1__.PostTarget) {
                if (!targetSet.has(iter.targetName)) {
                    targetSet.add(iter.targetName);
                    const target = this.get(iter.targetName);
                    this.__getLinkOptions(options, targetSet, target.getPublicLinkOptions());
                    this.__getLinkOptions(options, targetSet, target.getPublicLibraries());
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
        const targetSet = new Set([target.targetName]);
        this.__getLinkOptions(options, targetSet, target.getLinkOptions());
        this.__getLinkOptions(options, targetSet, target.getPublicLibraries());
        return options.flat();
    }
}


/***/ }),

/***/ "./src/core/TargetFile.ts":
/*!********************************!*\
  !*** ./src/core/TargetFile.ts ***!
  \********************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   TargetFile: () => (/* binding */ TargetFile)
/* harmony export */ });
/* harmony import */ var _core_SimpleObject__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! @/core/SimpleObject */ "./src/core/SimpleObject.ts");
/*
 * MIT License
 *
 * Copyright (c) 2025  Yurii Yakubin (yurii.yakubin@gmail.com)
 *
 * Permission is granted to use, copy, modify, and distribute this software
 * under the MIT License. See LICENSE file for details.
 */

const NAME = Symbol("NAME");
class TargetFile {
    [NAME];
    constructor(targetName) {
        this[NAME] = targetName;
    }
    static create(name) {
        return Object.seal(new TargetFile(name));
    }
    static fromJSON(object) {
        return TargetFile.create(object.targetName);
    }
    get targetName() {
        return this[NAME];
    }
    toString() {
        return "${" + this[NAME] + ".file}";
    }
    toJSON() {
        return {
            type: TargetFile.name,
            targetName: this[NAME],
        };
    }
}
;
_core_SimpleObject__WEBPACK_IMPORTED_MODULE_0__.SimpleObject.registerInstanceCreator(TargetFile.name, TargetFile.fromJSON);


/***/ }),

/***/ "./src/core/TargetIncludes.ts":
/*!************************************!*\
  !*** ./src/core/TargetIncludes.ts ***!
  \************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   TargetIncludes: () => (/* binding */ TargetIncludes)
/* harmony export */ });
/* harmony import */ var _core_SimpleObject__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! @/core/SimpleObject */ "./src/core/SimpleObject.ts");
/*
 * MIT License
 *
 * Copyright (c) 2025  Yurii Yakubin (yurii.yakubin@gmail.com)
 *
 * Permission is granted to use, copy, modify, and distribute this software
 * under the MIT License. See LICENSE file for details.
 */

const NAME = Symbol("NAME");
class TargetIncludes {
    [NAME];
    constructor(name) {
        this[NAME] = name;
    }
    static create(name) {
        return Object.seal(new TargetIncludes(name));
    }
    static fromJSON(object) {
        return TargetIncludes.create(object.targetName);
    }
    get targetName() {
        return this[NAME];
    }
    toString() {
        return "${" + this[NAME] + ".includes}";
    }
    toJSON() {
        return {
            type: TargetIncludes.name,
            targetName: this[NAME],
        };
    }
    static ensureInstance(value) {
        if (value instanceof TargetIncludes)
            return value;
        throw new Error(`The '${value}' is not a TargetIncludes`);
    }
}
;
_core_SimpleObject__WEBPACK_IMPORTED_MODULE_0__.SimpleObject.registerInstanceCreator(TargetIncludes.name, TargetIncludes.fromJSON);


/***/ }),

/***/ "./src/core/TargetObjects.ts":
/*!***********************************!*\
  !*** ./src/core/TargetObjects.ts ***!
  \***********************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   TargetObjects: () => (/* binding */ TargetObjects)
/* harmony export */ });
/* harmony import */ var _core_SimpleObject__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! @/core/SimpleObject */ "./src/core/SimpleObject.ts");
/*
 * MIT License
 *
 * Copyright (c) 2025  Yurii Yakubin (yurii.yakubin@gmail.com)
 *
 * Permission is granted to use, copy, modify, and distribute this software
 * under the MIT License. See LICENSE file for details.
 */

const NAME = Symbol("NAME");
class TargetObjects {
    [NAME];
    constructor(name) {
        this[NAME] = name;
    }
    static create(name) {
        return Object.seal(new TargetObjects(name));
    }
    static fromJSON(object) {
        return TargetObjects.create(object.targetName);
    }
    static ensureInstance(value) {
        if (value instanceof TargetObjects)
            return value;
        throw new Error(`The '${value}' is not a TargetObjects`);
    }
    get targetName() {
        return this[NAME];
    }
    toString() {
        return "${" + this[NAME] + ".objects}";
    }
    toJSON() {
        return {
            type: TargetObjects.name,
            targetName: this[NAME],
        };
    }
}
;
_core_SimpleObject__WEBPACK_IMPORTED_MODULE_0__.SimpleObject.registerInstanceCreator(TargetObjects.name, TargetObjects.fromJSON);


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
class ToolchainContext extends _core_BaseContext__WEBPACK_IMPORTED_MODULE_0__.GeneralContext {
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
/* harmony import */ var _core_UserTargetStruct__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! @/core/UserTargetStruct */ "./src/core/UserTargetStruct.ts");
/* harmony import */ var _logger__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! @/logger */ "./src/logger/index.ts");
/*
 * MIT License
 *
 * Copyright (c) 2025  Yurii Yakubin (yurii.yakubin@gmail.com)
 *
 * Permission is granted to use, copy, modify, and distribute this software
 * under the MIT License. See LICENSE file for details.
 */



const logger = _logger__WEBPACK_IMPORTED_MODULE_2__.Logger.create("file:///mnt/c/opt/work/source/darkit-sdk/external/bitmake/src/core/UserMakeContext.ts");
const IMPL = Symbol("IMPL");
class UserMakeContext extends _core_BaseContext__WEBPACK_IMPORTED_MODULE_0__.GeneralContext {
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
        const target = this[IMPL].addObjectLibrary(name, ...sources);
        return _core_UserTargetStruct__WEBPACK_IMPORTED_MODULE_1__.UserTargetStruct.create(target);
    }
    addStaticLibrary(name, ...sources) {
        const target = this[IMPL].addStaticLibrary(name, ...sources);
        return _core_UserTargetStruct__WEBPACK_IMPORTED_MODULE_1__.UserTargetStruct.create(target);
    }
    addSharedLibrary(name, ...sources) {
        const target = this[IMPL].addSharedLibrary(name, ...sources);
        return _core_UserTargetStruct__WEBPACK_IMPORTED_MODULE_1__.UserTargetStruct.create(target);
    }
    addExecutable(name, ...sources) {
        const target = this[IMPL].addExecutable(name, ...sources);
        return _core_UserTargetStruct__WEBPACK_IMPORTED_MODULE_1__.UserTargetStruct.create(target);
    }
    executeScript(script, params) {
        this[IMPL].executeScript(script, params);
    }
}
;


/***/ }),

/***/ "./src/core/UserTargetStruct.ts":
/*!**************************************!*\
  !*** ./src/core/UserTargetStruct.ts ***!
  \**************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   UserTargetStruct: () => (/* binding */ UserTargetStruct)
/* harmony export */ });
/* harmony import */ var _core_MakeInterfaces__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! @/core/MakeInterfaces */ "./src/core/MakeInterfaces.ts");
/* harmony import */ var _logger__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! @/logger */ "./src/logger/index.ts");
/* harmony import */ var _utils_StrictType__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! @/utils/StrictType */ "./src/utils/StrictType.ts");
/*
 * MIT License
 *
 * Copyright (c) 2025  Yurii Yakubin (yurii.yakubin@gmail.com)
 *
 * Permission is granted to use, copy, modify, and distribute this software
 * under the MIT License. See LICENSE file for details.
 */



const logger = _logger__WEBPACK_IMPORTED_MODULE_1__.Logger.create("file:///mnt/c/opt/work/source/darkit-sdk/external/bitmake/src/core/UserTargetStruct.ts");
const IMPL = Symbol("IMPL");
class UserTargetStruct extends _core_MakeInterfaces__WEBPACK_IMPORTED_MODULE_0__.InterfaceTarget {
    [IMPL];
    constructor(impl) {
        super();
        this[IMPL] = impl;
    }
    static create(impl) {
        return Object.seal(new UserTargetStruct(impl));
    }
    get targetName() {
        return this[IMPL].targetName;
    }
    get targetFile() {
        return this[IMPL].targetFile;
    }
    get includes() {
        return this[IMPL].includes;
    }
    get objects() {
        return this[IMPL].objects;
    }
    setPrefix(value) {
        this[IMPL].setPrefix((0,_utils_StrictType__WEBPACK_IMPORTED_MODULE_2__.ensureString)(value));
    }
    setSuffix(value) {
        this[IMPL].setSuffix((0,_utils_StrictType__WEBPACK_IMPORTED_MODULE_2__.ensureString)(value));
    }
    setOutputName(value) {
        this[IMPL].setOutputName((0,_utils_StrictType__WEBPACK_IMPORTED_MODULE_2__.ensureString)(value));
    }
    addSources(...sources) {
        this[IMPL].addSources(...sources);
    }
    addIncludes(...includes) {
        this[IMPL].addIncludes(...includes);
    }
    addLibraries(...libraries) {
        this[IMPL].addLibraries(...libraries);
    }
    addCompileOptions(...options) {
        this[IMPL].addCompileOptions(...options);
    }
    addLinkOptions(...options) {
        this[IMPL].addLinkOptions(...options);
    }
    getSourceFiles(...sources) {
        return this[IMPL].getSourceFiles(...sources);
    }
    addDefinitions(...definitions) {
        this[IMPL].addDefinitions(...definitions);
    }
    addPreBuild(command, args) {
        this[IMPL].addPreBuild(command, args);
    }
    addPostBuild(command, args) {
        this[IMPL].addPostBuild(command, args);
    }
    setPositionIndependentCode(value) {
        this[IMPL].setPositionIndependentCode(value);
    }
    addPublicIncludes(...includes) {
        this[IMPL].addPublicIncludes(...includes);
    }
    addPublicDefinitions(...definitions) {
        this[IMPL].addPublicDefinitions(...definitions);
    }
    addPublicLibraries(...libraries) {
        this[IMPL].addPublicLibraries(...libraries);
    }
    addPublicCompileOptions(...options) {
        this[IMPL].addPublicCompileOptions(...options);
    }
    addPublicLinkOptions(...options) {
        this[IMPL].addPublicLinkOptions(...options);
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
const SEPARATOR = " ";
const MESSAGE_MAX = 240;
function toMessageString(o) {
    return (typeof o === "string") ? o : JSON.stringify(o);
}
function* messageGenerator(messages, maxLength) {
    let length = 0;
    const msgList = [];
    for (;;) {
        const iter = messages.shift();
        if (!iter)
            break;
        if (msgList.length)
            length += SEPARATOR.length;
        msgList.push(iter);
        length += iter.length;
        while (length > maxLength) {
            const msg = msgList.join(SEPARATOR);
            const nextMsg = msg.substring(maxLength);
            msgList.length = 0;
            msgList.push(nextMsg);
            length = nextMsg.length;
            yield msg.substring(0, maxLength);
        }
    }
    yield msgList.join(SEPARATOR);
}
function makeLogMethod(withPrefix, type, tagName, target, handler) {
    return (...args) => {
        const now = new Date();
        const messages = args.map(i => toMessageString(i));
        if (!withPrefix) {
            handler.call(target, messages.join(SEPARATOR));
            return;
        }
        const prefix = [now.toISOString(), type, tagName].join(SEPARATOR);
        for (const iter of messageGenerator(messages, MESSAGE_MAX - prefix.length - SEPARATOR.length)) {
            handler.call(target, [prefix, iter].join(SEPARATOR));
        }
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
            allSetFilter(pair[1]);
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
for (const iter of ["*:5"]) {
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
/* harmony import */ var _core_BaseContext__WEBPACK_IMPORTED_MODULE_7__ = __webpack_require__(/*! @/core/BaseContext */ "./src/core/BaseContext.ts");
/* harmony import */ var _server_RemoteMethods__WEBPACK_IMPORTED_MODULE_8__ = __webpack_require__(/*! @/server/RemoteMethods */ "./src/server/RemoteMethods.ts");
/* harmony import */ var _logger__WEBPACK_IMPORTED_MODULE_9__ = __webpack_require__(/*! @/logger */ "./src/logger/index.ts");
/*
 * MIT License
 *
 * Copyright (c) 2025  Yurii Yakubin (yurii.yakubin@gmail.com)
 *
 * Permission is granted to use, copy, modify, and distribute this software
 * under the MIT License. See LICENSE file for details.
 */














const logger = _logger__WEBPACK_IMPORTED_MODULE_9__.Logger.create("file:///mnt/c/opt/work/source/darkit-sdk/external/bitmake/src/server/MakeServer.ts");
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
        this._jsonRpcServer.registerCallback(_server_RemoteMethods__WEBPACK_IMPORTED_MODULE_8__.MAINNODE_EXECUTESCRIPT, params => this.executeScript(params));
        this._jsonRpcServer.registerCallback(_server_RemoteMethods__WEBPACK_IMPORTED_MODULE_8__.MAINNODE_LOADJSON, params => this.loadJSON(params));
        this._jsonRpcServer.registerCallback(_server_RemoteMethods__WEBPACK_IMPORTED_MODULE_8__.MAINNODE_STARTMAKESCRIPT, params => this.startMakeScript(params));
        this._jsonRpcServer.registerCallback(_server_RemoteMethods__WEBPACK_IMPORTED_MODULE_8__.MAINNODE_ADDCUSTOMSCRIPT, params => this.addCustomScript(params));
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
    async runMakeScript(variableMap) {
        if (!await this._project.prepearScriptFile(variableMap))
            return false;
        const client = this.createClient();
        const cwdSave = process.cwd();
        const scriptDir = _core_Scope__WEBPACK_IMPORTED_MODULE_3__.ScopeHelper.get(variableMap, "SCRIPT_DIR");
        process.chdir(scriptDir.toString());
        await client.request(_server_RemoteMethods__WEBPACK_IMPORTED_MODULE_8__.WORKERNODE_STARTMAKESCRIPT, _core_Scope__WEBPACK_IMPORTED_MODULE_3__.ScopeHelper.toJSON(variableMap));
        process.chdir(cwdSave);
        return true;
    }
    async start() {
        const sourceDir = _core_Scope__WEBPACK_IMPORTED_MODULE_3__.ScopeHelper.get(this._rootVariableMap, "PROJECT_SOURCE_DIR");
        const binaryDir = _core_Scope__WEBPACK_IMPORTED_MODULE_3__.ScopeHelper.get(this._rootVariableMap, "PROJECT_BINARY_DIR");
        const variableMap = (0,_core_BaseContext__WEBPACK_IMPORTED_MODULE_7__.createVariableMapForDirectory)(this._rootVariableMap, sourceDir, binaryDir);
        if (!await this.runMakeScript(variableMap))
            throw Error("Can't prepear ScriptFile");
        // this.onConfigureEnd();
        /*this._project.addSubdirectory(this._rootVariableMap, sourceDir, binaryDir);
        this._project.doSubdirectory().then(() => this.onConfigureEnd());*/
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
/* harmony import */ var _server_RemoteMethods__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! @/server/RemoteMethods */ "./src/server/RemoteMethods.ts");
/* harmony import */ var _logger__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! @/logger */ "./src/logger/index.ts");
/* harmony import */ var _core_Scope__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! @/core/Scope */ "./src/core/Scope.ts");
/* harmony import */ var _Constants__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! @/Constants */ "./src/Constants.ts");
/*
 * MIT License
 *
 * Copyright (c) 2025  Yurii Yakubin (yurii.yakubin@gmail.com)
 *
 * Permission is granted to use, copy, modify, and distribute this software
 * under the MIT License. See LICENSE file for details.
 */









const logger = _logger__WEBPACK_IMPORTED_MODULE_2__.Logger.create("file:///mnt/c/opt/work/source/darkit-sdk/external/bitmake/src/server/RemoteMakeContext.ts");
class RemoteMakeContext extends _core_BaseContext__WEBPACK_IMPORTED_MODULE_0__.MakeContext {
    _transport;
    constructor(scope, transport) {
        super(scope);
        this._transport = transport;
    }
    executeScript(script, params) {
        logger.debug("RemoteMakeContext.executeScript(", script, params, ")");
        const newVariableMap = _core_Scope__WEBPACK_IMPORTED_MODULE_3__.ScopeHelper.cloneVariableMap(this._scope);
        params && _core_Scope__WEBPACK_IMPORTED_MODULE_3__.ScopeHelper.extendVariableMapByValues(newVariableMap, "", params);
        const scriptFile = _core_Scope__WEBPACK_IMPORTED_MODULE_3__.ScopeHelper.get(newVariableMap, "SOURCE_DIR").resolve(script);
        _core_Scope__WEBPACK_IMPORTED_MODULE_3__.ScopeHelper.set(newVariableMap, "SCRIPT_FILE", scriptFile);
        _core_Scope__WEBPACK_IMPORTED_MODULE_3__.ScopeHelper.set(newVariableMap, "SCRIPT_DIR", scriptFile.dirname());
        return this._transport.requestSync(_server_RemoteMethods__WEBPACK_IMPORTED_MODULE_1__.MAINNODE_EXECUTESCRIPT, _core_Scope__WEBPACK_IMPORTED_MODULE_3__.ScopeHelper.toJSON(newVariableMap));
    }
    addCacheVariables(params) {
        logger.debug("RemoteMakeContext.addCacheVariables(", params, ")");
        let variables = params;
        if (typeof params === "string") {
            const filename = _core_Scope__WEBPACK_IMPORTED_MODULE_3__.ScopeHelper.get(this._scope, "SOURCE_DIR").resolve(params).toString();
            variables = this._transport.requestSync(_server_RemoteMethods__WEBPACK_IMPORTED_MODULE_1__.MAINNODE_LOADJSON, filename);
        }
        _core_Scope__WEBPACK_IMPORTED_MODULE_3__.ScopeHelper.defineVariablesInVariableMap(this._scope, _Constants__WEBPACK_IMPORTED_MODULE_4__.CUSTOM_VARIABLE_GROUP, variables);
    }
    addSubdirectory(sourceDir, binaryDir) {
        logger.debug("RemoteMakeContext.addSubdirectory(", sourceDir, binaryDir, ")");
        const newVariableMap = (0,_core_BaseContext__WEBPACK_IMPORTED_MODULE_0__.createVariableMapForDirectory)(this._scope, sourceDir, binaryDir);
        this._transport.requestSync(_server_RemoteMethods__WEBPACK_IMPORTED_MODULE_1__.MAINNODE_STARTMAKESCRIPT, _core_Scope__WEBPACK_IMPORTED_MODULE_3__.ScopeHelper.toJSON(newVariableMap));
    }
    addCustomScript(script, params) {
        logger.debug("RemoteMakeContext.addCustomScript(", script, params, ")");
        const newVariableMap = _core_Scope__WEBPACK_IMPORTED_MODULE_3__.ScopeHelper.cloneVariableMap(this._scope);
        _core_Scope__WEBPACK_IMPORTED_MODULE_3__.ScopeHelper.extendVariableMapByValues(newVariableMap, _Constants__WEBPACK_IMPORTED_MODULE_4__.CUSTOM_VARIABLE_GROUP, params);
        _core_Scope__WEBPACK_IMPORTED_MODULE_3__.ScopeHelper.set(newVariableMap, "SCRIPT_MODULE", script);
        return this._transport.requestSync(_server_RemoteMethods__WEBPACK_IMPORTED_MODULE_1__.MAINNODE_ADDCUSTOMSCRIPT, _core_Scope__WEBPACK_IMPORTED_MODULE_3__.ScopeHelper.toJSON(newVariableMap));
    }
    script(name) {
        throw new Error("Not Implemented");
    }
    install(value, params) {
        throw new Error("Not Implemented");
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
//# sourceMappingURL=data:application/json;charset=utf-8;base64,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QUVNLEtBQUssQ0FBQyxJQUFJLENBQUMsSUFBWTtRQUM1QixJQUFJLENBQUMsSUFBSSxDQUFDLFNBQVM7WUFDakIsTUFBTSxJQUFJLENBQUMsSUFBSSxFQUFFLENBQUM7UUFDcEIsSUFBSSxNQUFNLEdBQUcsSUFBSSxDQUFDLFFBQVEsQ0FBQyxNQUFNLENBQUMsSUFBSSxDQUFDLENBQUM7UUFDeEMsSUFBSSxDQUFDLE1BQU07WUFDVCxNQUFNLEdBQUcsSUFBSSxDQUFDLFFBQVEsQ0FBQyxNQUFNLENBQUMsSUFBSSxDQUFDLEdBQUcsRUFBRSxDQUFDO1FBQzNDLElBQUksQ0FBQyxRQUFRLEdBQUcsRUFBRSxNQUFNLEVBQUUsSUFBSSxDQUFDLFFBQVEsRUFBRSxNQUFNLEVBQUUsQ0FBQztJQUNwRCxDQUFDO0lBRU0sS0FBSyxDQUFDLEdBQUc7UUFDZCxJQUFJLENBQUMsSUFBSSxDQUFDLFNBQVM7WUFDakIsTUFBTSxJQUFJLENBQUMsSUFBSSxFQUFFLENBQUM7UUFDcEIsT0FBTyxDQUFDLE1BQU0sQ0FBQyxJQUFJLENBQUMsUUFBUSxDQUFDLE1BQU0sQ0FBQyxDQUFDO1FBQ3JDLElBQUksQ0FBQyxRQUFRLEdBQUcsSUFBSSxDQUFDLFFBQVEsQ0FBQyxNQUFNLENBQUM7SUFDdkMsQ0FBQztJQUVNLEtBQUssQ0FBQyxHQUFHLENBQUMsSUFBWTtRQUMzQixJQUFJLENBQUMsSUFBSSxDQUFDLFNBQVM7WUFDakIsTUFBTSxJQUFJLENBQUMsSUFBSSxFQUFFLENBQUM7UUFDcEIsT0FBTyxJQUFJLENBQUMsUUFBUSxDQUFDLE1BQU0sQ0FBQyxJQUFJLENBQUMsQ0FBQztJQUNwQyxDQUFDO0lBRU0sS0FBSyxDQUFDLEdBQUcsQ0FBQyxJQUFZLEVBQUUsS0FBVTtRQUN2QyxJQUFJLENBQUMsSUFBSSxDQUFDLFNBQVM7WUFDakIsTUFBTSxJQUFJLENBQUMsSUFBSSxFQUFFLENBQUM7UUFDcEIsSUFBSSxDQUFDLFFBQVEsQ0FBQyxNQUFNLENBQUMsSUFBSSxDQUFDLEdBQUcsS0FBSyxDQUFDO1FBQ25DLE1BQU0sSUFB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Q1gsRUFBQztBQUVGLElBQUksMkRBQVksRUFBRSxFQUFFLENBQUM7SUFDbkIscURBQVMsRUFBRSxDQUFDO0FBQ2QsQ0FBQyIsInNvdXJjZXMiOlsid2VicGFjazovL2JpdG1ha2Uvd2VicGFjay91bml2ZXJzYWxNb2R1bGVEZWZpbml0aW9uIiwid2VicGFjazovL2JpdG1ha2UvLi9zcmMvQ29uc3RhbnRzLnRzIiwid2VicGFjazovL2JpdG1ha2UvLi9zcmMvUnVuU2NyaXB0LnRzIiwid2VicGFjazovL2JpdG1ha2UvLi9zcmMvYWN0aW9ucy9iaXRtYWtlLnRzIiwid2VicGFjazovL2JpdG1ha2UvLi9zcmMvYWN0aW9ucy9jbWFrZS50cyIsIndlYnBhY2s6Ly9iaXRtYWtlLy4vc3JjL2FjdGlvbnMvY29uZmlndXJlLnRzIiwid2VicGFjazovL2JpdG1ha2UvLi9zcmMvYWN0aW9ucy9pbmRleC50cyIsIndlYnBhY2s6Ly9iaXRtYWtlLy4vc3JjL2FjdGlvbnMvbWFrZS50cyIsIndlYnBhY2s6Ly9iaXRtYWtlLy4vc3JjL2FjdGlvbnMvbm9uZS50cyIsIndlYnBhY2s6Ly9iaXRtYWtlLy4vc3JjL2FjdGlvbnMvcHJvY2Vzcy50cyIsIndlYnBhY2s6Ly9iaXRtYWtlLy4vc3JjL2NtYWtlL0NvbnN0YW50cy50cyIsIndlYnBhY2s6Ly9iaXRtYWtlLy4vc3JjL2NtYWtlL0hlbHBlci50cyIsIndlYnBhY2s6Ly9iaXRtYWtlLy4vc3JjL2NtYWtlL2luZGV4LnRzIiwid2VicGFjazovL2JpdG1ha2UvLi9zcmMvY29tbWFuZHMvYnVpbGQudHMiLCJ3ZWJwYWNrOi8vYml0bWFrZS8uL3NyYy9jb21tYW5kcy9pbmRleC50cyIsIndlYnBhY2s6Ly9iaXRtYWtlLy4vc3JjL2NvbW1hbmRzL2luaXQudHMiLCJ3ZWJwYWNrOi8vYml0bWFrZS8uL3NyYy9jb3JlL0Fic29sdXRlUGF0aC50cyIsIndlYnBhY2s6Ly9iaXRtYWtlLy4vc3JjL2NvcmUvQmFzZUNvbnRleHQudHMiLCJ3ZWJwYWNrOi8vYml0bWFrZS8uL3NyYy9jb3JlL0J1aWxkaW5TY3JpcHRzL2NfaGVhZGVyLnRzIiwid2VicGFjazovL2JpdG1ha2UvLi9zcmMvY29yZS9CdWlsZGluU2NyaXB0cy9jb25maWd1cmVfZmlsZS50cyIsIndlYnBhY2s6Ly9iaXRtYWtlLy4vc3JjL2NvcmUvQnVpbGRpblNjcmlwdHMvaW5kZXgudHMiLCJ3ZWJwYWNrOi8vYml0bWFrZS8uL3NyYy9jb3JlL0N1c3RvbVNjcmlwdC50cyIsIndlYnBhY2s6Ly9iaXRtYWtlLy4vc3JjL2NvcmUvRGVmaW5pdGlvbkhlbHBlci50cyIsIndlYnBhY2s6Ly9iaXRtYWtlLy4vc3JjL2NvcmUvRGV0ZXJtaW5lQ29tcGlsZXIudHMiLCJ3ZWJwYWNrOi8vYml0bWFrZS8uL3NyYy9jb3JlL0ZpbmRQcm9ncmFtLnRzIiwid2VicGFjazovL2JpdG1ha2UvLi9zcmMvY29yZS9Hb2FsQ29sbGVjdGlvbi50cyIsIndlYnBhY2s6Ly9iaXRtYWtlLy4vc3JjL2NvcmUvSW5zdGFsbEVudGl0eS50cyIsIndlYnBhY2s6Ly9iaXRtYWtlLy4vc3JjL2NvcmUvSW50ZXJmYWNlU2NyaXB0LnRzIiwid2VicGFjazovL2JpdG1ha2UvLi9zcmMvY29yZS9Mb2NhbE1ha2VDb250ZXh0LnRzIiwid2VicGFjazovL2JpdG1ha2UvLi9zcmMvY29yZS9NYWtlSW50ZXJmYWNlcy50cyIsIndlYnBhY2s6Ly9iaXRtYWtlLy4vc3JjL2NvcmUvUGx1Z2luQ29udGV4dC50cyIsIndlYnBhY2s6Ly9iaXRtYWtlLy4vc3JjL2NvcmUvUHJvamVjdENvbnRleHQudHMiLCJ3ZWJwYWNrOi8vYml0bWFrZS8uL3NyYy9jb3JlL1Njb3BlLnRzIiwid2VicGFjazovL2JpdG1ha2UvLi9zcmMvY29yZS9TY3JpcHRDb2xsZWN0aW9uLnRzIiwid2VicGFjazovL2JpdG1ha2UvLi9zcmMvY29yZS9TY3JpcHRDb250ZXh0LnRzIiwid2VicGFjazovL2JpdG1ha2UvLi9zcmMvY29yZS9TaW1wbGVPYmplY3QudHMiLCJ3ZWJwYWNrOi8vYml0bWFrZS8uL3NyYy9jb3JlL1NvdXJjZUZpbGUudHMiLCJ3ZWJwYWNrOi8vYml0bWFrZS8uL3NyYy9jb3JlL1NvdXJjZUZpbGVMaXN0LnRzIiwid2VicGFjazovL2JpdG1ha2UvLi9zcmMvY29yZS9TeXN0ZW1WYXJpYWJsZXMudHMiLCJ3ZWJwYWNrOi8vYml0bWFrZS8uL3NyYy9jb3JlL1RhcmdldC50cyIsIndlYnBhY2s6Ly9iaXRtYWtlLy4vc3JjL2NvcmUvVGFyZ2V0Q29sbGVjdGlvbi50cyIsIndlYnBhY2s6Ly9iaXRtYWtlLy4vc3JjL2NvcmUvVGFyZ2V0RmlsZS50cyIsIndlYnBhY2s6Ly9iaXRtYWtlLy4vc3JjL2NvcmUvVGFyZ2V0SW5jbHVkZXMudHMiLCJ3ZWJwYWNrOi8vYml0bWFrZS8uL3NyYy9jb3JlL1RhcmdldE9iamVjdHMudHMiLCJ3ZWJwYWNrOi8vYml0bWFrZS8uL3NyYy9jb3JlL1Rvb2xjaGFpbkNvbnRleHQudHMiLCJ3ZWJwYWNrOi8vYml0bWFrZS8uL3NyYy9jb3JlL1R5cGVzLnRzIiwid2VicGFjazovL2JpdG1ha2UvLi9zcmMvY29yZS9Vc2VyTWFrZUNvbnRleHQudHMiLCJ3ZWJwYWNrOi8vYml0bWFrZS8uL3NyYy9jb3JlL1VzZXJUYXJnZXRTdHJ1Y3QudHMiLCJ3ZWJwYWNrOi8vYml0bWFrZS8uL3NyYy9jeHgvaW5kZXgudHMiLCJ3ZWJwYWNrOi8vYml0bWFrZS8uL3NyYy9sb2dnZXIvaW5kZXgudHMiLCJ3ZWJwYWNrOi8vYml0bWFrZS8uL3NyYy9zZXJ2ZXIvSnNvblJwY1JlcXVlc3RTeW5jLnRzIiwid2VicGFjazovL2JpdG1ha2UvLi9zcmMvc2VydmVyL0pzb25ScGNTZXJ2ZXIudHMiLCJ3ZWJwYWNrOi8vYml0bWFrZS8uL3NyYy9zZXJ2ZXIvTWFrZUNsaWVudC50cyIsIndlYnBhY2s6Ly9iaXRtYWtlLy4vc3JjL3NlcnZlci9NYWtlU2VydmVyLnRzIiwid2VicGFjazovL2JpdG1ha2UvLi9zcmMvc2VydmVyL01lbW9yeVRyYW5zcG9ydC50cyIsIndlYnBhY2s6Ly9iaXRtYWtlLy4vc3JjL3NlcnZlci9NZXNzYWdlUG9ydFNlbmRlci50cyIsIndlYnBhY2s6Ly9iaXRtYWtlLy4vc3JjL3NlcnZlci9SZW1vdGVNYWtlQ29udGV4dC50cyIsIndlYnBhY2s6Ly9iaXRtYWtlLy4vc3JjL3NlcnZlci9SZW1vdGVNZXRob2RzLnRzIiwid2VicGFjazovL2JpdG1ha2UvLi9zcmMvc2VydmVyL1RyYW5zcG9ydC50cyIsIndlYnBhY2s6Ly9iaXRtYWtlLy4vc3JjL3NlcnZlci9Xb3JrZXJMb29wZXIudHMiLCJ3ZWJwYWNrOi8vYml0bWFrZS8uL3NyYy9zZXJ2ZXIvV29ya2VyTm9kZS50cyIsIndlYnBhY2s6Ly9iaXRtYWtlLy4vc3JjL3NlcnZlci9Xb3JrZXJTZW5kZXIudHMiLCJ3ZWJwYWNrOi8vYml0bWFrZS8uL3NyYy91dGlscy9BcmdzLnRzIiwid2VicGFjazovL2JpdG1ha2UvLi9zcmMvdXRpbHMvQ2hpbGRQcm9jZXNzLnRzIiwid2VicGFjazovL2JpdG1ha2UvLi9zcmMvdXRpbHMvRmlsZVN5c3RlbS50cyIsIndlYnBhY2s6Ly9iaXRtYWtlLy4vc3JjL3V0aWxzL0hvc3QudHMiLCJ3ZWJwYWNrOi8vYml0bWFrZS8uL3NyYy91dGlscy9IdHRwUmVxdWVzdC50cyIsIndlYnBhY2s6Ly9iaXRtYWtlLy4vc3JjL3V0aWxzL0ltcG9ydE1vZHVsZS5tanMiLCJ3ZWJwYWNrOi8vYml0bWFrZS8uL3NyYy91dGlscy9NYWtlUGF0Y2gudHMiLCJ3ZWJwYWNrOi8vYml0bWFrZS8uL3NyYy91dGlscy9Nb2R1bGUudHMiLCJ3ZWJwYWNrOi8vYml0bWFrZS8uL3NyYy91dGlscy9QYXRoLnRzIiwid2VicGFjazovL2JpdG1ha2UvLi9zcmMvdXRpbHMvUHJpbWl0aXZlcy50cyIsIndlYnBhY2s6Ly9iaXRtYWtlLy4vc3JjL3V0aWxzL1NldHRpbmdzU3RvcmFnZS50cyIsIndlYnBhY2s6Ly9iaXRtYWtlLy4vc3JjL3V0aWxzL1N0cmljdFR5cGUudHMiLCJ3ZWJwYWNrOi8vYml0bWFrZS8uL3NyYy91dGlscy9VcmxTY2hlbWUudHMiLCJ3ZWJwYWNrOi8vYml0bWFrZS9leHRlcm5hbCBub2RlLWNvbW1vbmpzIFwiaHR0cFwiIiwid2VicGFjazovL2JpdG1ha2UvZXh0ZXJuYWwgbm9kZS1jb21tb25qcyBcImh0dHBzXCIiLCJ3ZWJwYWNrOi8vYml0bWFrZS9leHRlcm5hbCBub2RlLWNvbW1vbmpzIFwibm9kZTpjaGlsZF9wcm9jZXNzXCIiLCJ3ZWJwYWNrOi8vYml0bWFrZS9leHRlcm5hbCBub2RlLWNvbW1vbmpzIFwibm9kZTpmc1wiIiwid2VicGFjazovL2JpdG1ha2UvZXh0ZXJuYWwgbm9kZS1jb21tb25qcyBcIm5vZGU6b3NcIiIsIndlYnBhY2s6Ly9iaXRtYWtlL2V4dGVybmFsIG5vZGUtY29tbW9uanMgXCJub2RlOnBhdGhcIiIsIndlYnBhY2s6Ly9iaXRtYWtlL2V4dGVybmFsIG5vZGUtY29tbW9uanMgXCJub2RlOnVybFwiIiwid2VicGFjazovL2JpdG1ha2UvZXh0ZXJuYWwgbm9kZS1jb21tb25qcyBcIm5vZGU6d29ya2VyX3RocmVhZHNcIiIsIndlYnBhY2s6Ly9iaXRtYWtlL3dlYnBhY2svYm9vdHN0cmFwIiwid2VicGFjazovL2JpdG1ha2Uvd2VicGFjay9ydW50aW1lL2NvbXBhdCBnZXQgZGVmYXVsdCBleHBvcnQiLCJ3ZWJwYWNrOi8vYml0bWFrZS93ZWJwYWNrL3J1bnRpbWUvZGVmaW5lIHByb3BlcnR5IGdldHRlcnMiLCJ3ZWJwYWNrOi8vYml0bWFrZS93ZWJwYWNrL3J1bnRpbWUvaGFzT3duUHJvcGVydHkgc2hvcnRoYW5kIiwid2VicGFjazovL2JpdG1ha2Uvd2VicGFjay9ydW50aW1lL21ha2UgbmFtZXNwYWNlIG9iamVjdCIsIndlYnBhY2s6Ly9iaXRtYWtlLy4vc3JjL2luZGV4LnRzIl0sInNvdXJjZXNDb250ZW50IjpbIihmdW5jdGlvbiB3ZWJwYWNrVW5pdmVyc2FsTW9kdWxlRGVmaW5pdGlvbihyb290LCBmYWN0b3J5KSB7XG5cdGlmKHR5cGVvZiBleHBvcnRzID09PSAnb2JqZWN0JyAmJiB0eXBlb2YgbW9kdWxlID09PSAnb2JqZWN0Jylcblx0XHRtb2R1bGUuZXhwb3J0cyA9IGZhY3RvcnkoKTtcblx0ZWxzZSBpZih0eXBlb2YgZGVmaW5lID09PSAnZnVuY3Rpb24nICYmIGRlZmluZS5hbWQpXG5cdFx0ZGVmaW5lKFtdLCBmYWN0b3J5KTtcblx0ZWxzZSBpZih0eXBlb2YgZXhwb3J0cyA9PT0gJ29iamVjdCcpXG5cdFx0ZXhwb3J0c1tcImJpdG1ha2VcIl0gPSBmYWN0b3J5KCk7XG5cdGVsc2Vcblx0XHRyb290W1wiYml0bWFrZVwiXSA9IGZhY3RvcnkoKTtcbn0pKGdsb2JhbCwgKCkgPT4ge1xucmV0dXJuICIsIi8qXG4gKiBNSVQgTGljZW5zZVxuICpcbiAqIENvcHlyaWdodCAoYykgMjAyNSAgWXVyaWkgWWFrdWJpbiAoeXVyaWkueWFrdWJpbkBnbWFpbC5jb20pXG4gKlxuICogUGVybWlzc2lvbiBpcyBncmFudGVkIHRvIHVzZSwgY29weSwgbW9kaWZ5LCBhbmQgZGlzdHJpYnV0ZSB0aGlzIHNvZnR3YXJlXG4gKiB1bmRlciB0aGUgTUlUIExpY2Vuc2UuIFNlZSBMSUNFTlNFIGZpbGUgZm9yIGRldGFpbHMuXG4gKi9cblxuZXhwb3J0IGNvbnN0IFVTRVJfQ09ORklHID0gXCJiaXRtYWtlLmNvbmZpZy5tanNcIjtcbmV4cG9ydCBjb25zdCBSRVFVRVNUX0FUVEVNUFRTID0gMzA7XG5leHBvcnQgY29uc3QgQlVJTERfU0VUVElOR1NfRklMRSA9IFwiQnVpbGRTZXR0aW5ncy5qc29uXCI7XG5leHBvcnQgY29uc3QgQUxMX1RBUkdFVCA9IFwiYWxsXCI7XG5leHBvcnQgY29uc3QgSU5TVEFMTF9UQVJHRVQgPSBcImluc3RhbGxcIjtcbmV4cG9ydCBjb25zdCBQQUNLQUdFX0pTT04gPSBcInBhY2thZ2UuanNvblwiO1xuZXhwb3J0IGNvbnN0IE1BS0VfQ0FDSEUgPSBcIk1ha2VDYWNoZS5qc29uXCI7XG5leHBvcnQgY29uc3QgU1lTVEVNX1ZBUklBQkxFX0dST1VQID0gXCJzeXN0ZW1cIjtcbmV4cG9ydCBjb25zdCBDVVNUT01fVkFSSUFCTEVfR1JPVVAgPSBcImN1c3RvbVwiO1xuIiwiLypcbiAqIE1JVCBMaWNlbnNlXG4gKlxuICogQ29weXJpZ2h0IChjKSAyMDI1ICBZdXJpaSBZYWt1YmluICh5dXJpaS55YWt1YmluQGdtYWlsLmNvbSlcbiAqXG4gKiBQZXJtaXNzaW9uIGlzIGdyYW50ZWQgdG8gdXNlLCBjb3B5LCBtb2RpZnksIGFuZCBkaXN0cmlidXRlIHRoaXMgc29mdHdhcmVcbiAqIHVuZGVyIHRoZSBNSVQgTGljZW5zZS4gU2VlIExJQ0VOU0UgZmlsZSBmb3IgZGV0YWlscy5cbiAqL1xuXG5pbXBvcnQgeyBpc01haW5UaHJlYWQsIHBhcmVudFBvcnQsIHdvcmtlckRhdGEgfSBmcm9tIFwibm9kZTp3b3JrZXJfdGhyZWFkc1wiO1xuaW1wb3J0IHsgQXJncyB9ICBmcm9tIFwiQC91dGlscy9BcmdzXCI7XG5pbXBvcnQgY29tbWFuZHMgZnJvbSBcIkAvY29tbWFuZHNcIjtcbmltcG9ydCB7IExvZ2dlciB9IGZyb20gXCJAL2xvZ2dlclwiO1xuaW1wb3J0IHsgTWVzc2FnZVBvcnRTZW5kZXIgfSBmcm9tIFwiQC9zZXJ2ZXIvTWVzc2FnZVBvcnRTZW5kZXJcIjtcbmltcG9ydCB7IFdvcmtlckxvb3BlciB9IGZyb20gXCJAL3NlcnZlci9Xb3JrZXJMb29wZXJcIjtcblxuY29uc3QgbG9nZ2VyID0gTG9nZ2VyLmNyZWF0ZShpbXBvcnQubWV0YS51cmwpO1xuXG5leHBvcnQgYXN5bmMgZnVuY3Rpb24gcnVuTWFpblNjcmlwdCgpIHtcbiAgbG9nZ2VyLmluZm8oXCJNYWluIHRocmVhZCBzdGFydGVkXCIpXG4gIGNvbnN0IG9wdGlvbnM6IGFueSA9IHtcbiAgICBoYW5kbGVyOiBcImRlZmF1bHRcIixcbiAgICB3b3JrRGlyOiBwcm9jZXNzLmN3ZCgpLFxuICAgIGVudjoge30sXG4gIH07XG5cbiAgbGV0IG5vZGVFeGVjdXRhYmxlOiBzdHJpbmcgfCB1bmRlZmluZWQ7XG4gIGlmIChwcm9jZXNzLmFyZ3YubGVuZ3RoID4gMClcbiAgICBub2RlRXhlY3V0YWJsZSA9IHByb2Nlc3MuYXJndlswXTtcblxuICBsZXQgY3VycmVudFNjcmlwdDogc3RyaW5nIHwgdW5kZWZpbmVkO1xuICBpZiAocHJvY2Vzcy5hcmd2Lmxlbmd0aCA+IDEpXG4gICAgY3VycmVudFNjcmlwdCA9IHByb2Nlc3MuYXJndlsxXTtcblxuICBsZXQgYXJnc0luZGV4ID0gcHJvY2Vzcy5hcmd2Lmxlbmd0aDtcbiAgaWYgKHByb2Nlc3MuYXJndi5sZW5ndGggPiAyKSB7XG4gICAgYXJnc0luZGV4ID0gMjtcbiAgICBjb25zdCBoYW5kbGVyID0gcHJvY2Vzcy5hcmd2W2FyZ3NJbmRleF07XG4gICAgaWYgKCFoYW5kbGVyLnN0YXJ0c1dpdGgoXCItLVwiKSkge1xuICAgICAgb3B0aW9ucy5oYW5kbGVyID0gaGFuZGxlcjtcbiAgICAgIGFyZ3NJbmRleCsrO1xuICAgIH1cbiAgfVxuXG4gIG9wdGlvbnMuZW52ID0gQXJncy50b09iamVjdChwcm9jZXNzLmFyZ3Yuc2xpY2UoYXJnc0luZGV4KSk7XG5cbiAgY29uc3QgaGFuZGxlciA9IGNvbW1hbmRzW29wdGlvbnMuaGFuZGxlcl07XG4gIGlmICghaGFuZGxlcilcbiAgICB0aHJvdyBFcnJvcihgVGhlICR7UFJPSkVDVF9OQU1FfSBkb2VzIG5vdCBzdXBwb3J0IHRoZSAke29wdGlvbnMuaGFuZGxlcn0gY29tbWFuZGApO1xuXG4gIGNvbnN0IHJlcyA9IGhhbmRsZXIob3B0aW9ucyk7XG4gIGlmIChyZXMgaW5zdGFuY2VvZiBQcm9taXNlKSB7XG4gICAgYXdhaXQgcmVzO1xuICB9XG59XG5cbmV4cG9ydCBmdW5jdGlvbiBydW5Xb3JrZXJTY3JpcHQoKSB7XG4gIGxvZ2dlci5kZWJ1ZyhcIldvcmtlciB0aHJlYWQgc3RhcnRlZFwiLCB3b3JrZXJEYXRhKTtcblxuICBpZiAoIXBhcmVudFBvcnQpIHtcbiAgICB0aHJvdyBuZXcgRXJyb3IoYFdvcmtlciBub3Qgc3VwcG9ydGVkIHBhcmVudFBvcnRgKTtcbiAgfVxuXG4gIGNvbnN0IHNlbmRlciA9IG5ldyBNZXNzYWdlUG9ydFNlbmRlcihwYXJlbnRQb3J0KTtcbiAgY29uc3QgbG9vcGVyID0gbmV3IFdvcmtlckxvb3BlcihzZW5kZXIpO1xuXG4gIHBhcmVudFBvcnQub24oXCJtZXNzYWdlXCIsIChtZXNzYWdlKSA9PiBsb29wZXIuZW1pdE1lc3NhZ2Uoc2VuZGVyLCBtZXNzYWdlKSk7XG59XG5cbmV4cG9ydCBmdW5jdGlvbiBydW5TY3JpcHQoKSB7XG4gIGlmIChpc01haW5UaHJlYWQpIHtcbiAgICBydW5NYWluU2NyaXB0KCkudGhlbigoKSA9PiBwcm9jZXNzLmV4aXQoMCkpLmNhdGNoKChlKSA9PiB7XG4gICAgICBpZiAoZSBpbnN0YW5jZW9mIEVycm9yKVxuICAgICAgICBsb2dnZXIuZmF0YWwoZS5zdGFjayk7XG4gICAgICBlbHNlXG4gICAgICAgIGxvZ2dlci5mYXRhbChlKTtcbiAgICAgIHByb2Nlc3MuZXhpdCgxKTtcbiAgICB9KTtcbiAgfVxuICBlbHNlIHtcbiAgICBydW5Xb3JrZXJTY3JpcHQoKTtcbiAgfVxufVxuIiwiLypcbiAqIE1JVCBMaWNlbnNlXG4gKlxuICogQ29weXJpZ2h0IChjKSAyMDI1ICBZdXJpaSBZYWt1YmluICh5dXJpaS55YWt1YmluQGdtYWlsLmNvbSlcbiAqXG4gKiBQZXJtaXNzaW9uIGlzIGdyYW50ZWQgdG8gdXNlLCBjb3B5LCBtb2RpZnksIGFuZCBkaXN0cmlidXRlIHRoaXMgc29mdHdhcmVcbiAqIHVuZGVyIHRoZSBNSVQgTGljZW5zZS4gU2VlIExJQ0VOU0UgZmlsZSBmb3IgZGV0YWlscy5cbiAqL1xuXG5pbXBvcnQgZnMgZnJvbSBcIm5vZGU6ZnNcIjtcblxuaW1wb3J0IHsgUGF0aCB9IGZyb20gXCJAL3V0aWxzL1BhdGhcIjtcbmltcG9ydCB7IE1ha2VTZXJ2ZXIgfSBmcm9tIFwiQC9zZXJ2ZXIvTWFrZVNlcnZlclwiO1xuaW1wb3J0IHsgUGx1Z2luQ29udGV4dCB9IGZyb20gXCJAL2NvcmUvUGx1Z2luQ29udGV4dFwiO1xuaW1wb3J0IHsgU2NvcGVIZWxwZXIgfSBmcm9tIFwiQC9jb3JlL1Njb3BlXCI7XG5pbXBvcnQgeyBUb29sY2hhaW5Db250ZXh0IH0gZnJvbSBcIkAvY29yZS9Ub29sY2hhaW5Db250ZXh0XCI7XG5pbXBvcnQgeyBnZXRQYXRoU3RyaW5nLCBnZXRVUkxTdHJpbmcgfSAgZnJvbSBcIkAvdXRpbHMvRmlsZVN5c3RlbVwiO1xuaW1wb3J0IHsgQWJzb2x1dGVQYXRoIH0gZnJvbSBcIkAvY29yZS9BYnNvbHV0ZVBhdGhcIjtcbmltcG9ydCB7IGltcG9ydE1vZHVsZSB9ICBmcm9tIFwiQC91dGlscy9Nb2R1bGVcIjtcbmltcG9ydCB7IGRldGVybWluZUNvbXBpbGVyIH0gIGZyb20gXCJAL2NvcmUvRGV0ZXJtaW5lQ29tcGlsZXJcIjtcbmltcG9ydCB7IFNldHRpbmdzU3RvcmFnZSB9IGZyb20gXCJAL3V0aWxzL1NldHRpbmdzU3RvcmFnZVwiO1xuaW1wb3J0IHsgSU1QT1JUX1NDSEVNRSB9IGZyb20gXCJAL3V0aWxzL1VybFNjaGVtZVwiO1xuaW1wb3J0IHsgSU5TVEFMTF9UQVJHRVQsIFBBQ0tBR0VfSlNPTiwgTUFLRV9DQUNIRSB9IGZyb20gXCJAL0NvbnN0YW50c1wiO1xuaW1wb3J0IHsgU1lTVEVNX1ZBUklBQkxFX0dST1VQIH0gZnJvbSBcIkAvQ29uc3RhbnRzXCI7XG5pbXBvcnQgeyByZXF1aXJlUmVzb2x2ZSB9IGZyb20gXCJAL3V0aWxzL01vZHVsZVwiO1xuaW1wb3J0IHsgU3lzdGVtU2NvcGUgfSBmcm9tIFwiQC9jb3JlL1N5c3RlbVNjb3BlXCI7XG5pbXBvcnQgU3lzdGVtVmFyaWFibGVzIGZyb20gXCJAL2NvcmUvU3lzdGVtVmFyaWFibGVzXCI7XG5pbXBvcnQgeyBMb2dnZXIgfSBmcm9tIFwiQC9sb2dnZXJcIjtcblxuY29uc3QgbG9nZ2VyID0gTG9nZ2VyLmNyZWF0ZShpbXBvcnQubWV0YS51cmwpO1xuXG5leHBvcnQgZGVmYXVsdCBhc3luYyBmdW5jdGlvbihjb25maWc6IGFueSwgZW52aXJvbm1lbnQ6IGFueSwgc2V0dGluZ3M6IFNldHRpbmdzU3RvcmFnZSkge1xuICBwcm9jZXNzLmVudiA9IGVudmlyb25tZW50O1xuXG4gIGNvbnN0IHNlcnZlciA9IG5ldyBNYWtlU2VydmVyO1xuXG4gIGNvbnN0IHZhcmlhYmxlTWFwID0gc2VydmVyLnJvb3RWYXJpYWJsZU1hcDtcbiAgU2NvcGVIZWxwZXIuZXh0ZW5kVmFyaWFibGVNYXBCeVZhbHVlcyh2YXJpYWJsZU1hcCwgXCJcIiwgY29uZmlnLnZhcmlhYmxlcyk7XG4gIFNjb3BlSGVscGVyLmRlZmluZVZhcmlhYmxlc0luVmFyaWFibGVNYXAodmFyaWFibGVNYXAsIFNZU1RFTV9WQVJJQUJMRV9HUk9VUCwgU3lzdGVtVmFyaWFibGVzKTtcbiAgY29uc3Qgc2NvcGUgPSBTY29wZUhlbHBlci5jcmVhdGVQcm94eSh2YXJpYWJsZU1hcCkgYXMgU3lzdGVtU2NvcGU7XG5cbiAgY29uc3Qgc291cmNlRGlyID0gZ2V0UGF0aFN0cmluZyhjb25maWcuc291cmNlRGlyKTtcbiAgY29uc3QgYmluYXJ5RGlyID0gZ2V0UGF0aFN0cmluZyhjb25maWcuYmluYXJ5RGlyKTtcblxuICBzY29wZS5QUk9KRUNUX1NPVVJDRV9ESVIgPSBBYnNvbHV0ZVBhdGguY3JlYXRlKHNvdXJjZURpcik7XG4gIHNjb3BlLlBST0pFQ1RfQklOQVJZX0RJUiA9IEFic29sdXRlUGF0aC5jcmVhdGUoYmluYXJ5RGlyKTtcblxuICBzY29wZS5QQUNLQUdFX0ZJTEUgPSBzY29wZS5QUk9KRUNUX1NPVVJDRV9ESVIuam9pbihQQUNLQUdFX0pTT04pO1xuICBzY29wZS5DQUNIRV9GSUxFID0gc2NvcGUuUFJPSkVDVF9CSU5BUllfRElSLmpvaW4oTUFLRV9DQUNIRSk7XG4gIHNjb3BlLlNPVVJDRV9ESVIgPSBzY29wZS5QUk9KRUNUX1NPVVJDRV9ESVI7XG4gIHNjb3BlLkJJTkFSWV9ESVIgPSBzY29wZS5QUk9KRUNUX0JJTkFSWV9ESVI7XG5cbiAgY29uc3QgcGFja2FnZUpzb24gPSBhd2FpdCBmcy5wcm9taXNlcy5yZWFkRmlsZShzY29wZS5QQUNLQUdFX0ZJTEUudG9TdHJpbmcoKSwgXCJ1dGY4XCIpO1xuICBjb25zdCBwa2cgPSBKU09OLnBhcnNlKHBhY2thZ2VKc29uKTtcblxuICBzY29wZS5CVUlMRF9UWVBFID0gY29uZmlnLmJ1aWxkVHlwZTtcbiAgc2NvcGUuUFJPSkVDVF9OQU1FID0gcGtnLm5hbWU7XG4gIHNjb3BlLlBST0pFQ1RfVkVSU0lPTiA9IHBrZy52ZXJzaW9uO1xuICBzY29wZS5QUk9KRUNUX0RFU0NSSVBUSU9OID0gcGtnLmRlc2NyaXB0aW9uIHx8IFwiXCI7XG4gIHNjb3BlLlBST0pFQ1RfSE9NRVBBR0VfVVJMID0gcGtnLmhvbWVwYWdlIHx8IFwiXCI7XG5cbiAgaWYgKGNvbmZpZy5kZXN0RGlyKVxuICAgIHNjb3BlLkRFU1RESVIgPSBjb25maWcuZGVzdERpcjtcblxuICBmb3IgKGNvbnN0IHBsdWdpbiBvZiAoc2NvcGUuTUFLRV9QTFVHSU5fTElTVCB8fCBbXSkpIHtcbiAgICBjb25zdCBjd2RTYXZlID0gcHJvY2Vzcy5jd2QoKTtcblxuICAgIHNjb3BlLlNDUklQVF9GSUxFID0gQWJzb2x1dGVQYXRoLmNyZWF0ZShwbHVnaW4pO1xuICAgIHNjb3BlLlNDUklQVF9ESVIgPSBzY29wZS5TQ1JJUFRfRklMRS5kaXJuYW1lKCk7XG4gICAgc2NvcGUuU09VUkNFX0RJUiA9IHNjb3BlLlNDUklQVF9ESVI7XG5cbiAgICBjb25zdCBiaW5hcnlEaXIxID0gc2NvcGUuUFJPSkVDVF9CSU5BUllfRElSLnJlbGF0aXZlKHNvdXJjZURpcik7XG4gICAgY29uc3QgYmluYXJ5RGlyMiA9IHNjb3BlLlBST0pFQ1RfU09VUkNFX0RJUi5yZWxhdGl2ZShzb3VyY2VEaXIpO1xuICAgIGNvbnN0IGJpbmFyeURpciA9IChiaW5hcnlEaXIyLmxlbmd0aCA8IGJpbmFyeURpcjEubGVuZ3RoID8gYmluYXJ5RGlyMiA6IGJpbmFyeURpcjEpLnJlcGxhY2UoXCIuLi9cIiwgXCJfXy9cIik7XG4gICAgc2NvcGUuQklOQVJZX0RJUiA9IHNjb3BlLlBST0pFQ1RfQklOQVJZX0RJUi5qb2luKFwiTWFrZVBsdWdpbkJpbmFyaWVzXCIsIGJpbmFyeURpcik7XG5cbiAgICBwcm9jZXNzLmNoZGlyKHNjb3BlLlNPVVJDRV9ESVIudG9TdHJpbmcoKSk7XG4gICAgY29uc3QgcGx1Z2luVXJsID0gZ2V0VVJMU3RyaW5nKHNjb3BlLlNDUklQVF9GSUxFLnRvU3RyaW5nKCkpO1xuICAgIGNvbnN0IG1vZHVsZSA9IGF3YWl0IGltcG9ydE1vZHVsZShwbHVnaW5VcmwpO1xuICAgIFxuICAgIGlmICghbW9kdWxlLmRlZmF1bHQpXG4gICAgICB0aHJvdyBuZXcgRXJyb3IoYFBsdWdpbiAke3Njb3BlLlNDUklQVF9GSUxFLmJhc2VuYW1lKCl9IG5vdCBjb250YWluIGRlZmF1bHQgZXhwb3J0YCk7XG5cbiAgICBjb25zdCBtayA9IFBsdWdpbkNvbnRleHQuY3JlYXRlKHNlcnZlci5wcm9qZWN0LCB2YXJpYWJsZU1hcCk7XG4gICAgaWYgKHR5cGVvZiBtb2R1bGUuZGVmYXVsdCAhPT0gXCJmdW5jdGlvblwiKVxuICAgICAgdGhyb3cgbmV3IEVycm9yKGBQbHVnaW4gJHtzY29wZS5TQ1JJUFRfRklMRS5iYXNlbmFtZSgpfSBleHBvcnQgaGFzIG5vIGZ1bmN0aW9uIG9yIGNsYXNzYCk7XG4gICAgbGV0IHJlc3VsdDogYW55O1xuICAgIGlmICgvXmNsYXNzXFxzLy50ZXN0KEZ1bmN0aW9uLnByb3RvdHlwZS50b1N0cmluZy5jYWxsKG1vZHVsZS5kZWZhdWx0KSkpIHtcbiAgICAgIGlmICh0eXBlb2YgbW9kdWxlLmRlZmF1bHQucHJvdG90eXBlLmFwcGx5ICE9PSBcImZ1bmN0aW9uXCIpXG4gICAgICAgIHRocm93IG5ldyBFcnJvcihgUGx1Z2luIGNsYXNzIG9mICR7c2NvcGUuU0NSSVBUX0ZJTEUuYmFzZW5hbWUoKX0gaGFzIG5vIGFwcGx5IG1ldGhvZGApO1xuICAgICAgcmVzdWx0ID0gKG5ldyBtb2R1bGUuZGVmYXVsdCkuYXBwbHkobWspO1xuICAgIH1cbiAgICBlbHNlIHtcbiAgICAgIHJlc3VsdCA9IG1vZHVsZS5kZWZhdWx0KG1rKTtcbiAgICB9XG5cbiAgICBpZiAocmVzdWx0IGluc3RhbmNlb2YgUHJvbWlzZSlcbiAgICAgIGF3YWl0IHJlc3VsdDtcblxuICAgIHByb2Nlc3MuY2hkaXIoY3dkU2F2ZSk7XG4gIH1cblxuICBpZiAoc2NvcGUuVE9PTENIQUlOX0ZJTEUpIHtcbiAgICBjb25zdCB0b29sY2hhaW5VcmwgPSBnZXRVUkxTdHJpbmcoc2NvcGUuVE9PTENIQUlOX0ZJTEUudG9TdHJpbmcoKSk7XG4gICAgY29uc3QgdG9vbGNoYWluID0gYXdhaXQgaW1wb3J0TW9kdWxlKHRvb2xjaGFpblVybCk7XG4gICAgaWYgKCF0b29sY2hhaW4uZGVmYXVsdClcbiAgICAgIHRocm93IG5ldyBFcnJvcihcIlRvb2xjaGFpbiBtb2R1bGUgaGFzIG5vIGRlZmF1bHQgZXhwb3J0XCIpO1xuICAgIGNvbnN0IG1rID0gVG9vbGNoYWluQ29udGV4dC5jcmVhdGUoc2VydmVyLnByb2plY3QsIHZhcmlhYmxlTWFwKTtcbiAgICBjb25zdCByZXN1bHQgPSB0b29sY2hhaW4uZGVmYXVsdChtayk7XG4gICAgaWYgKHJlc3VsdCBpbnN0YW5jZW9mIFByb21pc2UpXG4gICAgICBhd2FpdCByZXN1bHQ7XG4gIH1cbiAgZWxzZSB7XG4gICAgYXdhaXQgZGV0ZXJtaW5lQ29tcGlsZXIoc2NvcGUpO1xuICB9XG5cbiAgaWYgKGNvbmZpZy5zb3VyY2VVcmwgJiYgY29uZmlnLnNvdXJjZVVybC5zdGFydHNXaXRoKElNUE9SVF9TQ0hFTUUpKSB7XG4gICAgY29uc3Qgc2NyaXB0RmlsZSA9IHJlcXVpcmVSZXNvbHZlKGNvbmZpZy5zb3VyY2VVcmwuc2xpY2UoSU1QT1JUX1NDSEVNRS5sZW5ndGgpKTtcbiAgICBzY29wZS5TQ1JJUFRfRklMRSA9IEFic29sdXRlUGF0aC5jcmVhdGUoc2NyaXB0RmlsZSk7XG4gICAgc2NvcGUuU0NSSVBUX0RJUiA9IHNjb3BlLlNDUklQVF9GSUxFLmRpcm5hbWUoKTtcbiAgfVxuXG4gIHNlcnZlci5hZGRFdmVudExpc3RlbmVyKFwiY29uZmlndXJlXCIsIGFzeW5jIChldmVudCkgPT4ge1xuICAgIGxvZ2dlci5pbmZvKFwiQ29uZmlndXJpbmcgZG9uZVwiKTtcblxuICAgIGlmIChzY29wZS5HTE9CQUxfQ09OVEVYVF9KU09OKSB7XG4gICAgICBjb25zdCBmaWxlbmFtZSA9IHNjb3BlLkdMT0JBTF9DT05URVhUX0pTT04udG9TdHJpbmcoKTtcbiAgICAgIGNvbnN0IGNvbnRlbnQgPSBKU09OLnN0cmluZ2lmeShzZXJ2ZXIucHJvamVjdCwgbnVsbCwgMik7XG4gICAgICBhd2FpdCBmcy5wcm9taXNlcy5ta2RpcihQYXRoLmRpcm5hbWUoZmlsZW5hbWUpLCB7IHJlY3Vyc2l2ZTogdHJ1ZSB9KTtcbiAgICAgIGF3YWl0IGZzLnByb21pc2VzLndyaXRlRmlsZShmaWxlbmFtZSwgY29udGVudCwgeyBlbmNvZGluZzogXCJ1dGY4XCIgfSk7XG4gICAgfVxuXG4gICAgY29uc3QgYWxsR29hbExpc3QgPSBzZXJ2ZXIucHJvamVjdC5jcmVhdGVHb2FscyhzY29wZSk7XG4gICAgY29uc3QgZ29hbExpc3QgPSBhbGxHb2FsTGlzdC5nZXRUYXJnZXRMaXN0KElOU1RBTExfVEFSR0VUKTtcblxuICAgIGlmIChzY29wZS5UQVJHRVRfR09BTFNfSlNPTikge1xuICAgICAgY29uc3QgZmlsZW5hbWUgPSBzY29wZS5UQVJHRVRfR09BTFNfSlNPTi50b1N0cmluZygpO1xuICAgICAgY29uc3QgY29udGVudCA9IEpTT04uc3RyaW5naWZ5KGdvYWxMaXN0LCBudWxsLCAyKTtcbiAgICAgIGF3YWl0IGZzLnByb21pc2VzLm1rZGlyKFBhdGguZGlybmFtZShmaWxlbmFtZSksIHsgcmVjdXJzaXZlOiB0cnVlIH0pO1xuICAgICAgYXdhaXQgZnMucHJvbWlzZXMud3JpdGVGaWxlKGZpbGVuYW1lLCBjb250ZW50LCB7IGVuY29kaW5nOiBcInV0ZjhcIiB9KTtcbiAgICB9XG5cbiAgICBsZXQgbG9hZGVkID0gMDtcbiAgICBjb25zdCB0b3RhbCA9IGdvYWxMaXN0Lmxlbmd0aDtcbiAgICBmb3IgKGNvbnN0IGdvYWwgb2YgZ29hbExpc3QpIHtcbiAgICAgIGdvYWwudXBkYXRlUHJvZ3Jlc3MoeyBsb2FkZWQsIHRvdGFsIH0pO1xuICAgICAgYXdhaXQgZ29hbC5kb1dvcmsoKTtcbiAgICAgIGxvYWRlZCsrO1xuICAgIH1cbiAgfSk7XG5cbiAgbGV0IGZpbmlzaFJlc29sdmU6ICgpID0+IHZvaWQ7XG4gIGNvbnN0IHJlc3VsdCA9IG5ldyBQcm9taXNlPHZvaWQ+KChyZXNvbHZlKSA9PiB7XG4gICAgZmluaXNoUmVzb2x2ZSA9IHJlc29sdmU7XG4gIH0pO1xuXG4gIHNlcnZlci5hZGRFdmVudExpc3RlbmVyKFwiYnVpbGRcIiwgKGV2ZW50KSA9PiBmaW5pc2hSZXNvbHZlKCkpO1xuXG4gIHNlcnZlci5zdGFydCgpO1xuXG4gIHJldHVybiByZXN1bHQ7XG59XG4iLCIvKlxuICogTUlUIExpY2Vuc2VcbiAqXG4gKiBDb3B5cmlnaHQgKGMpIDIwMjUgIFl1cmlpIFlha3ViaW4gKHl1cmlpLnlha3ViaW5AZ21haWwuY29tKVxuICpcbiAqIFBlcm1pc3Npb24gaXMgZ3JhbnRlZCB0byB1c2UsIGNvcHksIG1vZGlmeSwgYW5kIGRpc3RyaWJ1dGUgdGhpcyBzb2Z0d2FyZVxuICogdW5kZXIgdGhlIE1JVCBMaWNlbnNlLiBTZWUgTElDRU5TRSBmaWxlIGZvciBkZXRhaWxzLlxuICovXG5cbmltcG9ydCB7IENNYWtlUHJvY2VzcywgREVGQVVMVF9HRU5FUkFUT1IgfSBmcm9tIFwiQC9jbWFrZVwiO1xuaW1wb3J0IHsgZ2V0UGF0aFN0cmluZyB9ICBmcm9tIFwiQC91dGlscy9GaWxlU3lzdGVtXCI7XG5pbXBvcnQgeyBTZXR0aW5nc1N0b3JhZ2UgfSBmcm9tIFwiQC91dGlscy9TZXR0aW5nc1N0b3JhZ2VcIjtcblxuZXhwb3J0IGRlZmF1bHQgYXN5bmMgZnVuY3Rpb24oY29uZmlnOiBhbnksIGVudmlyb25tZW50OiBhbnksIHNldHRpbmdzOiBTZXR0aW5nc1N0b3JhZ2UpIHtcbiAgY29uc3Qgc291cmNlRGlyID0gZ2V0UGF0aFN0cmluZyhjb25maWcuc291cmNlRGlyKTtcbiAgY29uc3QgYmluYXJ5RGlyID0gZ2V0UGF0aFN0cmluZyhjb25maWcuYmluYXJ5RGlyKTtcbiAgY29uc3QgY21ha2VBcmdzID0ge1xuICAgIGVudmlyb25tZW50OiB7XG4gICAgICAuLi5lbnZpcm9ubWVudCxcbiAgICAgIERFU1RESVI6IGNvbmZpZy5kZXN0RGlyLFxuICAgIH0sXG4gICAgZ2VuZXJhdG9yOiBjb25maWcuZ2VuZXJhdG9yIHx8IERFRkFVTFRfR0VORVJBVE9SLFxuICAgIGNhY2hlVmFyaWFibGVzOiBjb25maWcuY2FjaGVWYXJpYWJsZXMsXG4gICAgc291cmNlRGlyLFxuICAgIGJpbmFyeURpcixcbiAgfTtcblxuICBpZiAoIWNtYWtlQXJncy5jYWNoZVZhcmlhYmxlcy5DTUFLRV9CVUlMRF9UWVBFKSB7XG4gICAgY21ha2VBcmdzLmNhY2hlVmFyaWFibGVzLkNNQUtFX0JVSUxEX1RZUEUgPSBjb25maWcuYnVpbGRUeXBlO1xuICB9XG5cbiAgY29uc3QgY21ha2UgPSBDTWFrZVByb2Nlc3MuZ2V0SW5zdGFuY2UoKTtcbiAgYXdhaXQgY21ha2UuY29uZmlndXJlKGNtYWtlQXJncyk7XG4gIGF3YWl0IGNtYWtlLmJ1aWxkKGNtYWtlQXJncyk7XG4gIGF3YWl0IGNtYWtlLmluc3RhbGwoY21ha2VBcmdzKTtcbn1cbiIsIi8qXG4gKiBNSVQgTGljZW5zZVxuICpcbiAqIENvcHlyaWdodCAoYykgMjAyNSAgWXVyaWkgWWFrdWJpbiAoeXVyaWkueWFrdWJpbkBnbWFpbC5jb20pXG4gKlxuICogUGVybWlzc2lvbiBpcyBncmFudGVkIHRvIHVzZSwgY29weSwgbW9kaWZ5LCBhbmQgZGlzdHJpYnV0ZSB0aGlzIHNvZnR3YXJlXG4gKiB1bmRlciB0aGUgTUlUIExpY2Vuc2UuIFNlZSBMSUNFTlNFIGZpbGUgZm9yIGRldGFpbHMuXG4gKi9cblxuaW1wb3J0IHBhdGggZnJvbSBcIm5vZGU6cGF0aFwiO1xuXG5pbXBvcnQgeyBlbnN1cmVCb29sZWFuIH0gZnJvbSBcIkAvdXRpbHMvU3RyaWN0VHlwZVwiO1xuaW1wb3J0IHsgZ2V0UGF0aFN0cmluZyB9IGZyb20gXCJAL3V0aWxzL0ZpbGVTeXN0ZW1cIjtcbmltcG9ydCB7IFNldHRpbmdzU3RvcmFnZSB9IGZyb20gXCJAL3V0aWxzL1NldHRpbmdzU3RvcmFnZVwiO1xuaW1wb3J0IHsgc3Bhd25Bc3luYyB9IGZyb20gXCJAL3V0aWxzL0NoaWxkUHJvY2Vzc1wiO1xuXG5leHBvcnQgZGVmYXVsdCBhc3luYyBmdW5jdGlvbihjb25maWc6IGFueSwgZW52aXJvbm1lbnQ6IGFueSwgc2V0dGluZ3M6IFNldHRpbmdzU3RvcmFnZSkge1xuICBjb25zdCBzb3VyY2VEaXIgPSBnZXRQYXRoU3RyaW5nKGNvbmZpZy5zb3VyY2VEaXIpO1xuICBjb25zdCBiaW5hcnlEaXIgPSBnZXRQYXRoU3RyaW5nKGNvbmZpZy5iaW5hcnlEaXIpO1xuICBsZXQgc3RlcCA9IGF3YWl0IHNldHRpbmdzLmdldChcImNvbmZpZ3VyZVwiKSB8fCBcImNvbmZpZ1wiO1xuICBpZiAoc3RlcCA9PT0gXCJjb25maWdcIikge1xuICAgIGNvbnN0IGNvbW1hbmQgPSBwYXRoLnJlc29sdmUoc291cmNlRGlyLCBcImNvbmZpZ3VyZVwiKTtcbiAgICBjb25zdCBwYXJhbXMgPSBbXTtcbiAgICBpZiAoQXJyYXkuaXNBcnJheShjb25maWcudmFyaWFibGVzKSkge1xuICAgICAgZm9yIChjb25zdCBpdGVyIG9mIGNvbmZpZy52YXJpYWJsZXMpXG4gICAgICAgIHBhcmFtcy5wdXNoKGl0ZXIpO1xuICAgIH1cbiAgICBlbHNlIGlmIChjb25maWcudmFyaWFibGVzKSB7XG4gICAgICBmb3IgKGNvbnN0IFtrZXksdmFsXSBvZiBPYmplY3QuZW50cmllcyhjb25maWcudmFyaWFibGVzKSkge1xuICAgICAgICBpZiAoa2V5ID09PSBcImZlYXR1cmVzXCIgJiYgQXJyYXkuaXNBcnJheSh2YWwpKSB7XG4gICAgICAgICAgZm9yIChjb25zdCBpdGVyIG9mIHZhbClcbiAgICAgICAgICAgIHBhcmFtcy5wdXNoKGAtLSR7aXRlcn1gKTtcbiAgICAgICAgfVxuICAgICAgICBlbHNlIGlmICh2YWwgPT09IG51bGwpXG4gICAgICAgICAgcGFyYW1zLnB1c2goYC0tJHtrZXl9YCk7XG4gICAgICAgIGVsc2VcbiAgICAgICAgICBwYXJhbXMucHVzaChgLS0ke2tleX09JHt2YWx9YCk7XG4gICAgICB9XG4gICAgfVxuICAgIGlmIChjb25maWcuZmVhdHVyZXMpIHtcbiAgICAgIGZvciAoY29uc3Qga2V5IG9mIGNvbmZpZy5mZWF0dXJlcylcbiAgICAgICAgcGFyYW1zLnB1c2goYC0tJHtrZXl9YCk7XG4gICAgfVxuICAgIGNvbnN0IHJlczEgPSBhd2FpdCBzcGF3bkFzeW5jKGNvbW1hbmQsIHBhcmFtcywge1xuICAgICAgY3dkOiBiaW5hcnlEaXIsXG4gICAgICBlbnY6IGVudmlyb25tZW50LFxuICAgICAgZXh0cmE6IHtcbiAgICAgICAgb3V0cHV0OiBgYWMtY29uZmlndXJlLSR7c3RlcH0ubG9nYCxcbiAgICAgIH0sXG4gICAgfSk7XG4gICAgaWYgKHJlczEuc3RhdHVzICE9PSAwKSB7XG4gICAgICB0aHJvdyBuZXcgRXJyb3IoYGNvbmZpZ3VyZSByZXR1cm5lZCBzdGF0dXMgJHtyZXMxLnN0YXR1c31gKTtcbiAgICB9XG4gICAgc3RlcCA9IFwibWFrZVwiO1xuICAgIGF3YWl0IHNldHRpbmdzLnNldChcImNvbmZpZ3VyZVwiLCBzdGVwKTtcbiAgfVxuICBpZiAoc3RlcCA9PT0gXCJtYWtlXCIpIHtcbiAgICBsZXQgcnVuTWFrZSA9IGZhbHNlO1xuICAgIGlmIChPYmplY3QuaGFzT3duKGNvbmZpZywgXCJydW5NYWtlXCIpKVxuICAgICAgcnVuTWFrZSA9IGVuc3VyZUJvb2xlYW4oY29uZmlnLnJ1bk1ha2UpO1xuICAgIGlmIChydW5NYWtlKSB7XG4gICAgICBjb25zdCByZXMyID0gYXdhaXQgc3Bhd25Bc3luYyhcIm1ha2VcIiwgW10sIHtcbiAgICAgICAgY3dkOiBiaW5hcnlEaXIsXG4gICAgICAgIGVudjogZW52aXJvbm1lbnQsXG4gICAgICAgIGV4dHJhOiB7XG4gICAgICAgICAgb3V0cHV0OiBgYWMtY29uZmlndXJlLSR7c3RlcH0ubG9nYCxcbiAgICAgICAgfSxcbiAgICAgIH0pO1xuICAgICAgaWYgKHJlczIuc3RhdHVzICE9PSAwKSB7XG4gICAgICAgIHRocm93IG5ldyBFcnJvcihgbWFrZSByZXR1cm5lZCBzdGF0dXMgJHtyZXMyLnN0YXR1c31gKTtcbiAgICAgIH1cbiAgICB9XG4gICAgc3RlcCA9IFwiaW5zdGFsbFwiO1xuICAgIGF3YWl0IHNldHRpbmdzLnNldChcImNvbmZpZ3VyZVwiLCBzdGVwKTtcbiAgfVxuICBpZiAoc3RlcCA9PT0gXCJpbnN0YWxsXCIpIHtcbiAgICBsZXQgcnVuTWFrZUluc3RhbGwgPSB0cnVlO1xuICAgIGlmIChPYmplY3QuaGFzT3duKGNvbmZpZywgXCJydW5NYWtlSW5zdGFsbFwiKSlcbiAgICAgIHJ1bk1ha2VJbnN0YWxsID0gZW5zdXJlQm9vbGVhbihjb25maWcucnVuTWFrZUluc3RhbGwpO1xuICAgIGlmIChydW5NYWtlSW5zdGFsbCkge1xuICAgICAgY29uc3QgYXJncyA9IFsgXCJpbnN0YWxsXCIgXTtcbiAgICAgIGlmIChjb25maWcuZGVzdERpcikge1xuICAgICAgICBhcmdzLnB1c2goYERFU1RESVI9JHtjb25maWcuZGVzdERpcn1gKTtcbiAgICAgIH1cbiAgICAgIGNvbnN0IHJlczIgPSBhd2FpdCBzcGF3bkFzeW5jKFwibWFrZVwiLCBhcmdzLCB7XG4gICAgICAgIGN3ZDogYmluYXJ5RGlyLFxuICAgICAgICBlbnY6IGVudmlyb25tZW50LFxuICAgICAgICBleHRyYToge1xuICAgICAgICAgIG91dHB1dDogYGFjLWNvbmZpZ3VyZS0ke3N0ZXB9LmxvZ2AsXG4gICAgICAgIH0sXG4gICAgICB9KTtcbiAgICAgIGlmIChyZXMyLnN0YXR1cyAhPT0gMCkge1xuICAgICAgICB0aHJvdyBuZXcgRXJyb3IoYG1ha2UgcmV0dXJuZWQgc3RhdHVzICR7cmVzMi5zdGF0dXN9YCk7XG4gICAgICB9XG4gICAgfVxuICAgIHN0ZXAgPSBcImRvbmVcIjtcbiAgICBhd2FpdCBzZXR0aW5ncy5zZXQoXCJjb25maWd1cmVcIiwgc3RlcCk7XG4gIH1cbn1cbiIsIi8qXG4gKiBNSVQgTGljZW5zZVxuICpcbiAqIENvcHlyaWdodCAoYykgMjAyNSAgWXVyaWkgWWFrdWJpbiAoeXVyaWkueWFrdWJpbkBnbWFpbC5jb20pXG4gKlxuICogUGVybWlzc2lvbiBpcyBncmFudGVkIHRvIHVzZSwgY29weSwgbW9kaWZ5LCBhbmQgZGlzdHJpYnV0ZSB0aGlzIHNvZnR3YXJlXG4gKiB1bmRlciB0aGUgTUlUIExpY2Vuc2UuIFNlZSBMSUNFTlNFIGZpbGUgZm9yIGRldGFpbHMuXG4gKi9cblxuaW1wb3J0IHsgU2V0dGluZ3NTdG9yYWdlIH0gZnJvbSBcIkAvdXRpbHMvU2V0dGluZ3NTdG9yYWdlXCI7XG5cbmltcG9ydCBub25lIGZyb20gXCJAL2FjdGlvbnMvbm9uZVwiO1xuaW1wb3J0IHByb2Nlc3MgZnJvbSBcIkAvYWN0aW9ucy9wcm9jZXNzXCI7XG5pbXBvcnQgY29uZmlndXJlIGZyb20gXCJAL2FjdGlvbnMvY29uZmlndXJlXCI7XG5pbXBvcnQgbWFrZSBmcm9tIFwiQC9hY3Rpb25zL21ha2VcIjtcbmltcG9ydCBjbWFrZSBmcm9tIFwiQC9hY3Rpb25zL2NtYWtlXCI7XG5pbXBvcnQgYml0bWFrZSBmcm9tIFwiQC9hY3Rpb25zL2JpdG1ha2VcIjtcblxuaW50ZXJmYWNlIEFjdGlvbkhhbmRsZXJzIHtcbiAgW25hbWU6IHN0cmluZ106IChjb25maWc6IGFueSwgZW52aXJvbm1lbnQ6IGFueSwgc2V0dGluZ3M6IFNldHRpbmdzU3RvcmFnZSkgPT4gUHJvbWlzZTx2b2lkPjtcbn1cblxuZXhwb3J0IGRlZmF1bHQgPEFjdGlvbkhhbmRsZXJzPiB7XG4gIG5vbmUsXG4gIHByb2Nlc3MsXG4gIGNvbmZpZ3VyZSxcbiAgbWFrZSxcbiAgY21ha2UsXG4gIGJpdG1ha2UsXG59O1xuIiwiLypcbiAqIE1JVCBMaWNlbnNlXG4gKlxuICogQ29weXJpZ2h0IChjKSAyMDI1ICBZdXJpaSBZYWt1YmluICh5dXJpaS55YWt1YmluQGdtYWlsLmNvbSlcbiAqXG4gKiBQZXJtaXNzaW9uIGlzIGdyYW50ZWQgdG8gdXNlLCBjb3B5LCBtb2RpZnksIGFuZCBkaXN0cmlidXRlIHRoaXMgc29mdHdhcmVcbiAqIHVuZGVyIHRoZSBNSVQgTGljZW5zZS4gU2VlIExJQ0VOU0UgZmlsZSBmb3IgZGV0YWlscy5cbiAqL1xuXG5pbXBvcnQgeyBzcGF3bkFzeW5jIH0gZnJvbSBcIkAvdXRpbHMvQ2hpbGRQcm9jZXNzXCI7XG5pbXBvcnQgeyBnZXRQYXRoU3RyaW5nIH0gIGZyb20gXCJAL3V0aWxzL0ZpbGVTeXN0ZW1cIjtcbmltcG9ydCB7IFNldHRpbmdzU3RvcmFnZSB9IGZyb20gXCJAL3V0aWxzL1NldHRpbmdzU3RvcmFnZVwiO1xuXG5leHBvcnQgZGVmYXVsdCBhc3luYyBmdW5jdGlvbihjb25maWc6IGFueSwgZW52aXJvbm1lbnQ6IGFueSwgc2V0dGluZ3M6IFNldHRpbmdzU3RvcmFnZSkge1xuICBjb25zdCBiaW5hcnlEaXIgPSBnZXRQYXRoU3RyaW5nKGNvbmZpZy5iaW5hcnlEaXIpO1xuICBjb25zdCBhcmdzID0gY29uZmlnLmFyZ3MgfHwgW107XG4gIGlmIChjb25maWcuZGVzdERpcikge1xuICAgIGFyZ3MucHVzaChgREVTVERJUj0ke2NvbmZpZy5kZXN0RGlyfWApO1xuICB9XG4gIGNvbnN0IHJlczIgPSBhd2FpdCBzcGF3bkFzeW5jKFwibWFrZVwiLCBhcmdzLCB7XG4gICAgY3dkOiBiaW5hcnlEaXIsXG4gICAgZW52OiBlbnZpcm9ubWVudCxcbiAgICBleHRyYToge1xuICAgICAgb3V0cHV0OiBgbWFrZS5sb2dgLFxuICAgIH0sXG4gIH0pO1xuICBpZiAocmVzMi5zdGF0dXMgIT09IDApIHtcbiAgICB0aHJvdyBuZXcgRXJyb3IoYG1ha2UgcmV0dXJuZWQgc3RhdHVzICR7cmVzMi5zdGF0dXN9YCk7XG4gIH1cbn1cbiIsIi8qXG4gKiBNSVQgTGljZW5zZVxuICpcbiAqIENvcHlyaWdodCAoYykgMjAyNSAgWXVyaWkgWWFrdWJpbiAoeXVyaWkueWFrdWJpbkBnbWFpbC5jb20pXG4gKlxuICogUGVybWlzc2lvbiBpcyBncmFudGVkIHRvIHVzZSwgY29weSwgbW9kaWZ5LCBhbmQgZGlzdHJpYnV0ZSB0aGlzIHNvZnR3YXJlXG4gKiB1bmRlciB0aGUgTUlUIExpY2Vuc2UuIFNlZSBMSUNFTlNFIGZpbGUgZm9yIGRldGFpbHMuXG4gKi9cblxuXG5pbXBvcnQgeyBTZXR0aW5nc1N0b3JhZ2UgfSBmcm9tIFwiQC91dGlscy9TZXR0aW5nc1N0b3JhZ2VcIjtcbmltcG9ydCB7IExvZ2dlciB9IGZyb20gXCJAL2xvZ2dlclwiO1xuXG5jb25zdCBsb2dnZXIgPSBMb2dnZXIuY3JlYXRlKGltcG9ydC5tZXRhLnVybCk7XG5cbmV4cG9ydCBkZWZhdWx0IGFzeW5jIGZ1bmN0aW9uKGNvbmZpZzogYW55LCBlbnZpcm9ubWVudDogYW55LCBzZXR0aW5nczogU2V0dGluZ3NTdG9yYWdlKSB7XG4gIC8qIGRvIG5vdGhpbmcgKi9cbn1cbiIsIi8qXG4gKiBNSVQgTGljZW5zZVxuICpcbiAqIENvcHlyaWdodCAoYykgMjAyNSAgWXVyaWkgWWFrdWJpbiAoeXVyaWkueWFrdWJpbkBnbWFpbC5jb20pXG4gKlxuICogUGVybWlzc2lvbiBpcyBncmFudGVkIHRvIHVzZSwgY29weSwgbW9kaWZ5LCBhbmQgZGlzdHJpYnV0ZSB0aGlzIHNvZnR3YXJlXG4gKiB1bmRlciB0aGUgTUlUIExpY2Vuc2UuIFNlZSBMSUNFTlNFIGZpbGUgZm9yIGRldGFpbHMuXG4gKi9cblxuXG5pbXBvcnQgcGF0aCBmcm9tIFwibm9kZTpwYXRoXCI7XG5cbmltcG9ydCB7IGdldFBhdGhTdHJpbmcgfSBmcm9tIFwiQC91dGlscy9GaWxlU3lzdGVtXCI7XG5pbXBvcnQgeyBTZXR0aW5nc1N0b3JhZ2UgfSBmcm9tIFwiQC91dGlscy9TZXR0aW5nc1N0b3JhZ2VcIjtcbmltcG9ydCB7IHNwYXduQXN5bmMgfSBmcm9tIFwiQC91dGlscy9DaGlsZFByb2Nlc3NcIjtcbmltcG9ydCB7IExvZ2dlciB9IGZyb20gXCJAL2xvZ2dlclwiO1xuXG5jb25zdCBsb2dnZXIgPSBMb2dnZXIuY3JlYXRlKGltcG9ydC5tZXRhLnVybCk7XG5cbmV4cG9ydCBkZWZhdWx0IGFzeW5jIGZ1bmN0aW9uKGNvbmZpZzogYW55LCBlbnZpcm9ubWVudDogYW55LCBzZXR0aW5nczogU2V0dGluZ3NTdG9yYWdlKSB7XG4gIGlmICghY29uZmlnLmNvbW1hbmQpXG4gICAgdGhyb3cgbmV3IEVycm9yKFwiUmVxdWlyZWQgY29tbWFuZCBmaWVsZCBmb3IgcHJvY2VzcyBhY3Rpb25cIik7XG4gIGNvbnN0IHNvdXJjZURpciA9IGdldFBhdGhTdHJpbmcoY29uZmlnLnNvdXJjZURpcik7XG4gIGNvbnN0IGJpbmFyeURpciA9IGdldFBhdGhTdHJpbmcoY29uZmlnLmJpbmFyeURpcik7XG4gIGxldCB7IGNvbW1hbmQgfSA9IGNvbmZpZztcbiAgaWYgKCFwYXRoLmlzQWJzb2x1dGUoY29tbWFuZCkgJiYgKGNvbW1hbmQuaW5jbHVkZXMocGF0aC5wb3NpeC5kZWxpbWl0ZXIpIHx8IGNvbW1hbmQuaW5jbHVkZXMocGF0aC53aW4zMi5kZWxpbWl0ZXIpKSkge1xuICAgIGNvbW1hbmQgPSBwYXRoLnJlc29sdmUoc291cmNlRGlyLCBjb21tYW5kKTtcbiAgfVxuICBjb25zdCByZXMgPSBhd2FpdCBzcGF3bkFzeW5jKGNvbW1hbmQsIGNvbmZpZy5hcmdzIHx8IFtdLCB7XG4gICAgY3dkOiBiaW5hcnlEaXIsXG4gICAgZW52OiBlbnZpcm9ubWVudCxcbiAgICBleHRyYToge1xuICAgICAgb3V0cHV0OiBgcHJvY2Vzcy5sb2dgLFxuICAgIH0sXG4gIH0pO1xuICBpZiAocmVzLnN0YXR1cyAhPT0gMCkge1xuICAgIHRocm93IG5ldyBFcnJvcihgcHJvY2VzcyByZXR1cm5lZCBzdGF0dXMgJHtyZXMuc3RhdHVzfWApO1xuICB9XG59XG4iLCIvKlxuICogTUlUIExpY2Vuc2VcbiAqXG4gKiBDb3B5cmlnaHQgKGMpIDIwMjUgIFl1cmlpIFlha3ViaW4gKHl1cmlpLnlha3ViaW5AZ21haWwuY29tKVxuICpcbiAqIFBlcm1pc3Npb24gaXMgZ3JhbnRlZCB0byB1c2UsIGNvcHksIG1vZGlmeSwgYW5kIGRpc3RyaWJ1dGUgdGhpcyBzb2Z0d2FyZVxuICogdW5kZXIgdGhlIE1JVCBMaWNlbnNlLiBTZWUgTElDRU5TRSBmaWxlIGZvciBkZXRhaWxzLlxuICovXG5cbmV4cG9ydCBlbnVtIEJvb2xlYW5UeXBlIHtcbiAgT04gPSBcIk9OXCIsXG4gIE9GRiA9IFwiT0ZGXCIsXG59O1xuXG4vLyBFbnVtIHJlcHJlc2VudGluZyB2YWx1ZSB0eXBlcyB1c2VkIGluIENNYWtlIGNhY2hlIHZhcmlhYmxlc1xuZXhwb3J0IGVudW0gVmFsdWVUeXBlIHtcbiAgLy8gUmVwcmVzZW50cyBhIGZ1bGwgcGF0aCB0byBhIGZpbGVcbiAgRklMRVBBVEggPSBcIkZJTEVQQVRIXCIsXG5cbiAgLy8gUmVwcmVzZW50cyBhIHBhdGggdG8gYSBkaXJlY3RvcnlcbiAgUEFUSCA9IFwiUEFUSFwiLFxuXG4gIC8vIFJlcHJlc2VudHMgYSBib29sZWFuIHZhbHVlICh0cnVlL2ZhbHNlKVxuICBCT09MID0gXCJCT09MXCIsXG5cbiAgLy8gUmVwcmVzZW50cyBhIGdlbmVyaWMgc3RyaW5nIHZhbHVlXG4gIFNUUklORyA9IFwiU1RSSU5HXCIsXG59O1xuXG4vLyBCdWlsZFR5cGUgcmVwcmVzZW50aW5nIGNvbW1vbiBDTWFrZSBidWlsZCB0eXBlc1xuZXhwb3J0IGVudW0gQnVpbGRUeXBlIHtcbiAgLy8gRGVidWcgYnVpbGQgdHlwZTogaW5jbHVkZXMgZGVidWcgc3ltYm9scywgbm8gb3B0aW1pemF0aW9uXG4gIERlYnVnID0gXCJEZWJ1Z1wiLFxuXG4gIC8vIFJlbGVhc2UgYnVpbGQgdHlwZTogb3B0aW1pemVkIGNvZGUsIG5vIGRlYnVnIGluZm9cbiAgUmVsZWFzZSA9IFwiUmVsZWFzZVwiLFxuXG4gIC8vIFJlbGVhc2Ugd2l0aCBkZWJ1ZyBpbmZvOiBvcHRpbWl6ZWQgd2l0aCBkZWJ1ZyBzeW1ib2xzIGluY2x1ZGVkXG4gIFJlbFdpdGhEZWJJbmZvID0gXCJSZWxXaXRoRGViSW5mb1wiLFxuXG4gIC8vIE1pbmltdW0gc2l6ZSByZWxlYXNlOiBvcHRpbWl6ZWQgZm9yIHNtYWxsZXN0IGJpbmFyeSBzaXplXG4gIE1pblNpemVSZWwgPSBcIk1pblNpemVSZWxcIixcbn07XG5cbi8vIFRoZSBkZWZhdWx0IG5hbWUgb2YgdGhlIG1haW4gQ01ha2UgYnVpbGQgY29uZmlndXJhdGlvbiBmaWxlXG5leHBvcnQgY29uc3QgQ01BS0VfTElTVFNfVFhUID0gXCJDTWFrZUxpc3RzLnR4dFwiO1xuXG5leHBvcnQgZW51bSBHZW5lcmF0b3JUeXBlIHtcbiAgLy8gTmFtZSBvZiB0aGUgQ01ha2UgZ2VuZXJhdG9yIGZvciBzdGFuZGFyZCBVbml4ICdtYWtlJyBidWlsZCBzeXN0ZW1cbiAgVW5peE1ha2VmaWxlcyA9IFwiVW5peCBNYWtlZmlsZXNcIixcbn07XG5cbi8vIE5hbWUgb2YgdGhlIENNYWtlIGdlbmVyYXRvciBmb3Igc3RhbmRhcmQgVW5peCAnbWFrZScgYnVpbGQgc3lzdGVtXG5leHBvcnQgY29uc3QgREVGQVVMVF9HRU5FUkFUT1I6IEdlbmVyYXRvclR5cGUgPSBHZW5lcmF0b3JUeXBlLlVuaXhNYWtlZmlsZXM7XG4iLCIvKlxuICogTUlUIExpY2Vuc2VcbiAqXG4gKiBDb3B5cmlnaHQgKGMpIDIwMjUgIFl1cmlpIFlha3ViaW4gKHl1cmlpLnlha3ViaW5AZ21haWwuY29tKVxuICpcbiAqIFBlcm1pc3Npb24gaXMgZ3JhbnRlZCB0byB1c2UsIGNvcHksIG1vZGlmeSwgYW5kIGRpc3RyaWJ1dGUgdGhpcyBzb2Z0d2FyZVxuICogdW5kZXIgdGhlIE1JVCBMaWNlbnNlLiBTZWUgTElDRU5TRSBmaWxlIGZvciBkZXRhaWxzLlxuICovXG5cbmltcG9ydCB7IEJvb2xlYW5UeXBlIH0gZnJvbSBcIkAvY21ha2UvQ29uc3RhbnRzXCI7XG5cbmV4cG9ydCBmdW5jdGlvbiBjb252ZXJ0VG9WYWx1ZShvYmo6IGFueSk6IHN0cmluZyB7XG4gIGlmIChBcnJheS5pc0FycmF5KG9iaikpXG4gICAgcmV0dXJuIG9iai5tYXAoaSA9PiBjb252ZXJ0VG9WYWx1ZShpKSkuam9pbihcIjtcIik7XG5cbiAgaWYgKHR5cGVvZiBvYmogPT09IFwiYm9vbGVhblwiKVxuICAgIHJldHVybiBvYmogPyBCb29sZWFuVHlwZS5PTiA6IEJvb2xlYW5UeXBlLk9GRjtcblxuICByZXR1cm4gb2JqLnRvU3RyaW5nKCk7XG59XG4iLCIvKlxuICogTUlUIExpY2Vuc2VcbiAqXG4gKiBDb3B5cmlnaHQgKGMpIDIwMjUgIFl1cmlpIFlha3ViaW4gKHl1cmlpLnlha3ViaW5AZ21haWwuY29tKVxuICpcbiAqIFBlcm1pc3Npb24gaXMgZ3JhbnRlZCB0byB1c2UsIGNvcHksIG1vZGlmeSwgYW5kIGRpc3RyaWJ1dGUgdGhpcyBzb2Z0d2FyZVxuICogdW5kZXIgdGhlIE1JVCBMaWNlbnNlLiBTZWUgTElDRU5TRSBmaWxlIGZvciBkZXRhaWxzLlxuICovXG5cbmltcG9ydCBvcyBmcm9tIFwibm9kZTpvc1wiO1xuaW1wb3J0IGZzIGZyb20gXCJub2RlOmZzXCI7XG5pbXBvcnQgcGF0aCBmcm9tIFwibm9kZTpwYXRoXCI7XG5cbmltcG9ydCB7IHNwYXduQXN5bmMgfSBmcm9tIFwiQC91dGlscy9DaGlsZFByb2Nlc3NcIjtcbmltcG9ydCB7IENNQUtFX0xJU1RTX1RYVCwgREVGQVVMVF9HRU5FUkFUT1IsIFZhbHVlVHlwZSB9IGZyb20gXCJAL2NtYWtlL0NvbnN0YW50c1wiO1xuaW1wb3J0IHsgY29udmVydFRvVmFsdWUgfSBmcm9tIFwiQC9jbWFrZS9IZWxwZXJcIjtcbmltcG9ydCB7IEhvc3QgfSBmcm9tIFwiQC91dGlscy9Ib3N0XCI7XG5cbmZ1bmN0aW9uIHRvVmFyVHlwZShrZXk6IHN0cmluZywgdmFsOiBhbnkpIHtcbiAgY29uc3QgbWFwOiBhbnkgPSB7XG4gICAgQ01BS0VfSU5TVEFMTF9QUkVGSVg6IFZhbHVlVHlwZS5QQVRILFxuICAgIENNQUtFX1RPT0xDSEFJTl9GSUxFOiBWYWx1ZVR5cGUuRklMRVBBVEgsXG4gIH07XG5cbiAgaWYgKHR5cGVvZiB2YWwgPT09IFwiYm9vbGVhblwiKVxuICAgIHJldHVybiBWYWx1ZVR5cGUuQk9PTDtcblxuICBpZiAobWFwLmhhc093blByb3BlcnR5KGtleSkpXG4gICAgcmV0dXJuIG1hcFtrZXldO1xuXG4gIHJldHVybiBWYWx1ZVR5cGUuU1RSSU5HO1xufVxuXG5mdW5jdGlvbiBtYWtlQ21kVmFyaWFibGUoa2V5OiBzdHJpbmcsIHZhbDogYW55LCBpc0NhY2hlOiBib29sZWFuKSB7XG4gIGxldCBuYW1lID0ga2V5O1xuICBpZiAoaXNDYWNoZSlcbiAgICBuYW1lICs9IFwiOlwiICsgdG9WYXJUeXBlKGtleSwgdmFsKTtcbiAgcmV0dXJuIG5hbWUgKyBcIj1cIiArIGNvbnZlcnRUb1ZhbHVlKHZhbCk7XG59XG5cbmZ1bmN0aW9uIG1ha2VDbWRWYXJpYWJsZXModmFyaWFibGVzOiBvYmplY3QsIGlzQ2FjaGU6IGJvb2xlYW4pOiBzdHJpbmdbXSB7XG4gIGNvbnN0IHJlc3VsdDogc3RyaW5nW10gPSBbXTtcbiAgZm9yIChjb25zdCBba2V5LCB2YWxdIG9mIE9iamVjdC5lbnRyaWVzKHZhcmlhYmxlcykpXG4gICAgcmVzdWx0LnB1c2goXCItRFwiLCBtYWtlQ21kVmFyaWFibGUoa2V5LCB2YWwsIGlzQ2FjaGUpKTtcbiAgcmV0dXJuIHJlc3VsdDtcbn1cblxuZXhwb3J0IGludGVyZmFjZSBTY3JpcHRNb2RlT3B0aW9ucyB7XG4gIGVudmlyb25tZW50Pzogb2JqZWN0O1xuICB3b3JrRGlyPzogc3RyaW5nO1xufTtcblxuZXhwb3J0IGNsYXNzIENNYWtlUHJvY2VzcyB7XG4gIHByaXZhdGUgX2NtYWtlUGF0aDogc3RyaW5nO1xuXG4gIHB1YmxpYyBjb25zdHJ1Y3RvcihjbWFrZVBhdGg6IHN0cmluZykge1xuICAgIHRoaXMuX2NtYWtlUGF0aCA9IGNtYWtlUGF0aDtcbiAgfVxuXG4gIHB1YmxpYyBhc3luYyBzY3JpcHRNb2RlKHNjcmlwdEZpbGU6IHN0cmluZywgdmFyaWFibGVzOiBvYmplY3QsIG9wdGlvbnM/OiBTY3JpcHRNb2RlT3B0aW9ucyk6IFByb21pc2U8dm9pZD4ge1xuICAgIGNvbnN0IHNwYXduQXJncyA9IFtcbiAgICAgIC4uLm1ha2VDbWRWYXJpYWJsZXModmFyaWFibGVzLCBmYWxzZSksXG4gICAgICBcIi1QXCIsIHNjcmlwdEZpbGUsXG4gICAgXTtcbiAgICBjb25zdCByZXM6IGFueSA9IGF3YWl0IHNwYXduQXN5bmModGhpcy5fY21ha2VQYXRoLCBzcGF3bkFyZ3MsIHtcbiAgICAgIGN3ZDogb3B0aW9ucz8ud29ya0RpcixcbiAgICAgIGVudjogb3B0aW9ucz8uZW52aXJvbm1lbnQgfHwgcHJvY2Vzcy5lbnYsXG4gICAgfSk7XG4gICAgaWYgKHJlcy5zdGF0dXMgIT09IDApIHtcbiAgICAgIHRocm93IGBjbWFrZS5zY3JpcHRNb2RlIHJldHVybmVkIHN0YXR1cyAke3Jlcy5zdGF0dXN9YDtcbiAgICB9XG4gIH1cblxuICBwdWJsaWMgYXN5bmMgY29uZmlndXJlKGFyZ3M6IGFueSk6IFByb21pc2U8dm9pZD4ge1xuICAgIGNvbnN0IHNwYXduQXJncyA9IFtcbiAgICAgIFwiLUdcIiwgYXJncy5nZW5lcmF0b3IsXG4gICAgICAuLi5tYWtlQ21kVmFyaWFibGVzKGFyZ3MuY2FjaGVWYXJpYWJsZXMsIHRydWUpLFxuICAgICAgXCItU1wiLCBhcmdzLnNvdXJjZURpcixcbiAgICAgIFwiLUJcIiwgYXJncy5iaW5hcnlEaXIsXG4gICAgXTtcbiAgXG4gICAgY29uc3QgcmVzOiBhbnkgPSBhd2FpdCBzcGF3bkFzeW5jKHRoaXMuX2NtYWtlUGF0aCwgc3Bhd25BcmdzLCB7XG4gICAgICBjd2Q6IGFyZ3MuYmluYXJ5RGlyLFxuICAgICAgZW52OiBhcmdzLmVudmlyb25tZW50IHx8IHByb2Nlc3MuZW52LFxuICAgICAgZXh0cmE6IHtcbiAgICAgICAgb3V0cHV0OiBgY21ha2UuY29uZmlndXJlLmxvZ2AsXG4gICAgICB9LFxuICAgIH0pO1xuICAgIGlmIChyZXMuc3RhdHVzICE9PSAwKSB7XG4gICAgICB0aHJvdyBgQ01ha2UuY29uZmlndXJlIHJldHVybmVkIHN0YXR1cyAke3Jlcy5zdGF0dXN9YDtcbiAgICB9XG4gIH1cblxuICBwdWJsaWMgYXN5bmMgYnVpbGQoYXJnczogYW55KTogUHJvbWlzZTx2b2lkPiB7XG4gICAgYXdhaXQgdGhpcy5jb25maWd1cmUoYXJncyk7XG4gIFxuICAgIGNvbnN0IHNwYXduQXJnczogc3RyaW5nW10gPSBbXG4gICAgICAnLS1idWlsZCcsICcuJyxcbiAgICAgICctLXBhcmFsbGVsJywgb3MuYXZhaWxhYmxlUGFyYWxsZWxpc20oKS50b1N0cmluZygpLFxuICAgIF07XG4gICAgY29uc3QgcmVzOiBhbnkgPSBhd2FpdCBzcGF3bkFzeW5jKHRoaXMuX2NtYWtlUGF0aCwgc3Bhd25BcmdzLCB7XG4gICAgICBjd2Q6IGFyZ3MuYmluYXJ5RGlyLFxuICAgICAgZW52OiBhcmdzLmVudmlyb25tZW50IHx8IHByb2Nlc3MuZW52LFxuICAgICAgZXh0cmE6IHtcbiAgICAgICAgb3V0cHV0OiBgY21ha2UuYnVpbGQubG9nYCxcbiAgICAgIH0sXG4gICAgfSk7XG4gICAgaWYgKHJlcy5zdGF0dXMgIT09IDApIHtcbiAgICAgIHRocm93IGBDTWFrZS5idWlsZCByZXR1cm5lZCBzdGF0dXMgJHtyZXMuc3RhdHVzfWA7XG4gICAgfVxuICB9XG5cbiAgcHVibGljIGFzeW5jIGluc3RhbGwoYXJnczogYW55KTogUHJvbWlzZTx2b2lkPiB7XG4gICAgYXdhaXQgdGhpcy5jb25maWd1cmUoYXJncyk7XG5cbiAgICBjb25zdCBzcGF3bkFyZ3MgPSBbXG4gICAgICAnLS1pbnN0YWxsJyxcbiAgICAgICcuJyxcbiAgICBdO1xuICAgIGlmIChhcmdzLmluc3RhbGxEaXIpIHtcbiAgICAgIHNwYXduQXJncy5wdXNoKCctLXByZWZpeCcsIGFyZ3MuaW5zdGFsbERpcik7XG4gICAgfVxuICAgIGNvbnN0IHJlczogYW55ID0gYXdhaXQgc3Bhd25Bc3luYyh0aGlzLl9jbWFrZVBhdGgsIHNwYXduQXJncywge1xuICAgICAgY3dkOiBhcmdzLmJpbmFyeURpcixcbiAgICAgIGVudjogYXJncy5lbnZpcm9ubWVudCB8fCBwcm9jZXNzLmVudixcbiAgICAgIGV4dHJhOiB7XG4gICAgICAgIG91dHB1dDogYGNtYWtlLmluc3RhbGwubG9nYCxcbiAgICAgIH0sXG4gICAgfSk7XG4gICAgaWYgKHJlcy5zdGF0dXMgIT09IDApIHtcbiAgICAgIHRocm93IGBDTWFrZS5pbnN0YWxsIHJldHVybmVkIHN0YXR1cyAke3Jlcy5zdGF0dXN9YDtcbiAgICB9XG4gIH1cbiAgXG4gIHB1YmxpYyBhc3luYyBleHRyYWN0KGFyZ3M6IGFueSk6IFByb21pc2U8dm9pZD4ge1xuICAgIGNvbnN0IHNwYXduQXJncyA9IFsgXCItRVwiLCBcInRhclwiLCBcIi14dmZcIiwgYXJncy5maWxlbmFtZSBdO1xuICAgIGNvbnN0IHJlczogYW55ID0gYXdhaXQgc3Bhd25Bc3luYyh0aGlzLl9jbWFrZVBhdGgsIHNwYXduQXJncywge1xuICAgICAgY3dkOiBhcmdzLndvcmtEaXIgfHwgYXJncy5zb3VyY2VEaXIgfHwgYXJncy5iaW5hcnlEaXIsXG4gICAgICBlbnY6IGFyZ3MuZW52aXJvbm1lbnQgfHwgcHJvY2Vzcy5lbnYsXG4gICAgICBleHRyYToge1xuICAgICAgICBvdXRwdXQ6IGFyZ3MubG9nRmlsZSB8fCBgY21ha2UuZXh0cmFjdC5sb2dgLFxuICAgICAgfSxcbiAgICB9KTtcbiAgICBpZiAocmVzLnN0YXR1cyAhPT0gMCkge1xuICAgICAgdGhyb3cgYEV4dHJhY3QgcmV0dXJuZWQgc3RhdHVzICR7cmVzLnN0YXR1c31gO1xuICAgIH1cbiAgfVxufTtcblxubGV0IF9jbWFrZUluc3RhbmNlOiBDTWFrZVByb2Nlc3M7XG5leHBvcnQgbmFtZXNwYWNlIENNYWtlUHJvY2VzcyB7XG4gIGV4cG9ydCBmdW5jdGlvbiBnZXRJbnN0YW5jZSgpOiBDTWFrZVByb2Nlc3Mge1xuICAgIGlmICghX2NtYWtlSW5zdGFuY2UpXG4gICAgICBfY21ha2VJbnN0YW5jZSA9IG5ldyBDTWFrZVByb2Nlc3MoXCJjbWFrZVwiICsgSG9zdC5leGVjdXRhYmxlU3VmZml4KTtcbiAgICByZXR1cm4gX2NtYWtlSW5zdGFuY2U7XG4gIH1cbn1cblxuZXhwb3J0IGNsYXNzIENUZXN0UHJvY2VzcyB7XG4gIHByaXZhdGUgX2N0ZXN0UGF0aDogc3RyaW5nO1xuXG4gIHB1YmxpYyBjb25zdHJ1Y3RvcihjdGVzdFBhdGg6IHN0cmluZykge1xuICAgIHRoaXMuX2N0ZXN0UGF0aCA9IGN0ZXN0UGF0aDtcbiAgfVxuXG4gIHB1YmxpYyBhc3luYyBjdGVzdChhcmdzOiBhbnkpOiBQcm9taXNlPHZvaWQ+IHtcbiAgICBjb25zdCBzcGF3bkFyZ3M6IHN0cmluZ1tdID0gW107XG4gICAgY29uc3QgcmVzOiBhbnkgPSBhd2FpdCBzcGF3bkFzeW5jKHRoaXMuX2N0ZXN0UGF0aCwgc3Bhd25BcmdzLCB7XG4gICAgICBjd2Q6IGFyZ3MuYmluYXJ5RGlyLFxuICAgICAgZW52OiBhcmdzLmVudmlyb25tZW50IHx8IHByb2Nlc3MuZW52LFxuICAgICAgZXh0cmE6IHtcbiAgICAgICAgb3V0cHV0OiBgY21ha2UuY3Rlc3QubG9nYCxcbiAgICAgIH0sXG4gICAgfSk7XG4gICAgaWYgKHJlcy5zdGF0dXMgIT09IDApIHtcbiAgICAgIHRocm93IGBDVGVzdCByZXR1cm5lZCBzdGF0dXMgJHtyZXMuc3RhdHVzfWA7XG4gICAgfVxuICB9XG59O1xuXG5sZXQgX2N0ZXN0SW5zdGFuY2U6IENUZXN0UHJvY2VzcztcbmV4cG9ydCBuYW1lc3BhY2UgQ1Rlc3RQcm9jZXNzIHtcbiAgZXhwb3J0IGZ1bmN0aW9uIGdldEluc3RhbmNlKCk6IENUZXN0UHJvY2VzcyB7XG4gICAgaWYgKCFfY3Rlc3RJbnN0YW5jZSlcbiAgICAgIF9jdGVzdEluc3RhbmNlID0gbmV3IENUZXN0UHJvY2VzcyhcImN0ZXN0XCIgKyBIb3N0LmV4ZWN1dGFibGVTdWZmaXgpO1xuICAgIHJldHVybiBfY3Rlc3RJbnN0YW5jZTtcbiAgfVxufVxuXG5leHBvcnQgYXN5bmMgZnVuY3Rpb24gZ2V0UHJvamVjdEluZm8oc291cmNlOiBzdHJpbmcpIHtcbiAgY29uc3Qgc3RhdCA9IGF3YWl0IGZzLnByb21pc2VzLnN0YXQoc291cmNlKTtcbiAgaWYgKHN0YXQuaXNEaXJlY3RvcnkoKSlcbiAgICBzb3VyY2UgPSBwYXRoLnJlc29sdmUoc291cmNlLCBDTUFLRV9MSVNUU19UWFQpO1xuICBjb25zdCBjb250ZW50ID0gYXdhaXQgZnMucHJvbWlzZXMucmVhZEZpbGUoc291cmNlLCB7IGVuY29kaW5nOiAndXRmOCcgfSk7XG5cbiAgY29uc3QgcHJvamVjdFBhdHRlcm4gPSAvcHJvamVjdCAqXFwoICooW14gXSspICooW14pXSopXFwpLztcbiAgY29uc3QgdmVyc2lvblBhdHRlcm4gPSAvVkVSU0lPTiArKFteIF0rKS87XG5cbiAgY29uc3QgcmVzdWx0OiBhbnkgPSB7fTtcbiAgbGV0IG1hdGNoID0gY29udGVudC5tYXRjaChwcm9qZWN0UGF0dGVybik7XG4gIGlmIChtYXRjaCkge1xuICAgIHJlc3VsdC5uYW1lID0gbWF0Y2hbMV07XG4gICAgY29uc3QgcHJvamVjdENvbnRlbnQgPSBtYXRjaFsyXTtcbiAgICBtYXRjaCA9IHByb2plY3RDb250ZW50Lm1hdGNoKHZlcnNpb25QYXR0ZXJuKTtcbiAgICBpZiAobWF0Y2gpXG4gICAgICByZXN1bHQudmVyc2lvbiA9IG1hdGNoWzFdO1xuICB9XG5cbiAgcmV0dXJuIHJlc3VsdDtcbn1cblxuZXhwb3J0IGZ1bmN0aW9uIGxpbmVUb1NpbmdsQ29tbWVudChsaW5lOiBzdHJpbmcpIHtcbiAgcmV0dXJuIFwiIyBcIiArIGxpbmU7XG59XG5cbmV4cG9ydCBmdW5jdGlvbiBsaW5lVG9NdWx0aXBsZUNvbW1lbnQobGluZTogc3RyaW5nKSB7XG4gIHJldHVybiBgI1s9PT1bICR7bGluZX0gXT09PV1gO1xufVxuXG5leHBvcnQgZnVuY3Rpb24gZ2VuZXJhdGVkU2NyaXB0TmFtZUNvbW1lbnQoZmlsZW5hbWU6IHN0cmluZykge1xuICByZXR1cm4gbGluZVRvU2luZ2xDb21tZW50KFwiR2VuZXJhdGVkIGZyb20gXCIgKyBwYXRoLmJhc2VuYW1lKGZpbGVuYW1lKSk7XG59XG5cbmV4cG9ydCB7IERFRkFVTFRfR0VORVJBVE9SIH07XG4iLCIvKlxuICogTUlUIExpY2Vuc2VcbiAqXG4gKiBDb3B5cmlnaHQgKGMpIDIwMjUgIFl1cmlpIFlha3ViaW4gKHl1cmlpLnlha3ViaW5AZ21haWwuY29tKVxuICpcbiAqIFBlcm1pc3Npb24gaXMgZ3JhbnRlZCB0byB1c2UsIGNvcHksIG1vZGlmeSwgYW5kIGRpc3RyaWJ1dGUgdGhpcyBzb2Z0d2FyZVxuICogdW5kZXIgdGhlIE1JVCBMaWNlbnNlLiBTZWUgTElDRU5TRSBmaWxlIGZvciBkZXRhaWxzLlxuICovXG5cbmltcG9ydCBmcyBmcm9tIFwibm9kZTpmc1wiO1xuaW1wb3J0IHVybCBmcm9tIFwibm9kZTp1cmxcIjtcblxuaW1wb3J0IHsgQ01ha2VQcm9jZXNzIH0gZnJvbSBcIkAvY21ha2VcIjtcbmltcG9ydCB7IFBhdGggfSBmcm9tIFwiQC91dGlscy9QYXRoXCI7XG5pbXBvcnQgeyBtYWtlUGF0Y2ggfSBmcm9tIFwiQC91dGlscy9NYWtlUGF0Y2hcIjtcbmltcG9ydCB7IHNhdmVJZkRpZmZlcmVudCwgZGlyZWN0b3J5RXhpc3RzIH0gZnJvbSBcIkAvdXRpbHMvRmlsZVN5c3RlbVwiO1xuaW1wb3J0IHsgU2V0dGluZ3NTdG9yYWdlIH0gZnJvbSBcIkAvdXRpbHMvU2V0dGluZ3NTdG9yYWdlXCI7XG5pbXBvcnQgeyBhcnJheVdyYXBwZXIsIGFzc2lnbk9iamVjdCB9IGZyb20gXCJAL3V0aWxzL1ByaW1pdGl2ZXNcIjtcbmltcG9ydCB7IFVTRVJfQ09ORklHLCBCVUlMRF9TRVRUSU5HU19GSUxFLCBSRVFVRVNUX0FUVEVNUFRTIH0gZnJvbSBcIkAvQ29uc3RhbnRzXCI7XG5pbXBvcnQgeyBERUJVR19CVUlMRF9UWVBFLCBSRUxFQVNFX0JVSUxEX1RZUEUgfSBmcm9tIFwiQC9jb3JlL1R5cGVzXCI7XG5pbXBvcnQgeyBJTVBPUlRfU0NIRU1FIH0gZnJvbSBcIkAvdXRpbHMvVXJsU2NoZW1lXCI7XG5pbXBvcnQgeyByZXF1aXJlUmVzb2x2ZSB9IGZyb20gXCJAL3V0aWxzL01vZHVsZVwiO1xuaW1wb3J0IHsgZG93bmxvYWRGaWxlIH0gZnJvbSBcIkAvdXRpbHMvSHR0cFJlcXVlc3RcIjtcbmltcG9ydCB7IENvbW1hbmRPcHRpb25zIH0gZnJvbSBcIkAvY29yZS9Db21tYW5kT3B0aW9uc1wiO1xuaW1wb3J0IHsgTG9nZ2VyIH0gZnJvbSBcIkAvbG9nZ2VyXCI7XG5pbXBvcnQgeyBmaWxlRXhpc3RzIH0gZnJvbSBcIkAvdXRpbHMvRmlsZVN5c3RlbVwiO1xuaW1wb3J0IHsgaW1wb3J0TW9kdWxlIH0gZnJvbSBcIkAvdXRpbHMvTW9kdWxlXCI7XG5cbmltcG9ydCBhY3Rpb25zIGZyb20gXCJAL2FjdGlvbnNcIjtcblxuY29uc3QgbG9nZ2VyID0gTG9nZ2VyLmNyZWF0ZShpbXBvcnQubWV0YS51cmwpO1xuXG5pbnRlcmZhY2UgSUdlbmVyYWxDb25maWcge1xuICB3b3JrRGlyOiBzdHJpbmc7XG4gIGJ1aWxkVHlwZTogc3RyaW5nO1xufTtcblxuZnVuY3Rpb24gbWVyZ2VFbnZpcm9ubWVudCguLi5hcmdzOiBhbnkpIHtcbiAgY29uc3QgZW52aXJvbm1lbnQ6IGFueSA9IHt9O1xuICBmb3IgKGNvbnN0IGVudiBvZiBhcmdzKSB7XG4gICAgY29uc3QgbGlzdDogYW55ID0gT2JqZWN0LmVudHJpZXMoZW52IHx8IHt9KTtcbiAgICB3aGlsZSAobGlzdC5sZW5ndGgpIHtcbiAgICAgIGxldCBba2V5LHZhbF0gPSBsaXN0LnBvcCgpO1xuICAgICAgbGV0IGRlbGltaXRlcjtcbiAgICAgIGxldCBqb2luQWZ0ZXIgPSB0cnVlO1xuICAgICAgc3dpdGNoIChrZXkpIHtcbiAgICAgIGNhc2UgXCJQYXRoXCI6XG4gICAgICBjYXNlIFwiUEFUSFwiOlxuICAgICAgICBkZWxpbWl0ZXIgPSBQYXRoLmRlbGltaXRlcjtcbiAgICAgICAgam9pbkFmdGVyID0gZmFsc2U7XG4gICAgICAgIGJyZWFrO1xuICAgICAgY2FzZSBcIkNGTEFHU1wiOlxuICAgICAgY2FzZSBcIkNYWEZMQUdTXCI6XG4gICAgICBjYXNlIFwiTERGTEFHU1wiOlxuICAgICAgICBkZWxpbWl0ZXIgPSBcIiBcIjtcbiAgICAgICAgYnJlYWs7XG4gICAgICB9XG4gICAgICBpZiAodHlwZW9mIHZhbCA9PT0gJ251bWJlcicpXG4gICAgICAgIHZhbCA9IHZhbC50b1N0cmluZygpO1xuICAgICAgZWxzZSBpZiAoQXJyYXkuaXNBcnJheSh2YWwpKVxuICAgICAgICB2YWwgPSB2YWwuam9pbihkZWxpbWl0ZXIpO1xuICAgICAgaWYgKCFkZWxpbWl0ZXIgfHwgIWVudmlyb25tZW50W2tleV0pXG4gICAgICAgIGVudmlyb25tZW50W2tleV0gPSB2YWw7XG4gICAgICBlbHNlIGlmIChqb2luQWZ0ZXIpXG4gICAgICAgIGVudmlyb25tZW50W2tleV0gPSB2YWwgKyBkZWxpbWl0ZXIgKyBlbnZpcm9ubWVudFtrZXldO1xuICAgICAgZWxzZVxuICAgICAgICBlbnZpcm9ubWVudFtrZXldID0gZW52aXJvbm1lbnRba2V5XSArIGRlbGltaXRlciArIHZhbDtcbiAgICB9XG4gIH1cbiAgcmV0dXJuIGVudmlyb25tZW50O1xufVxuXG5mdW5jdGlvbiByZWJhc2VDb25maWcoY29uZmlnOiBhbnkpIHtcbiAgY29uc3QgYmFzZUNvbmZpZzogYW55ID0ge307XG4gIGNvbnN0IG90aGVyQ29uZmlnOiBhbnkgPSB7fTtcblxuICBmb3IgKGNvbnN0IFtrZXksIGVudHJ5XSBvZiBPYmplY3QuZW50cmllcyhjb25maWcpIGFzIGFueSkge1xuICAgIChlbnRyeS5iYXNlID8gb3RoZXJDb25maWcgOiBiYXNlQ29uZmlnKVtrZXldID0gZW50cnk7XG4gIH1cblxuICB3aGlsZSAodHJ1ZSkge1xuICAgIGNvbnN0IGtleXMgPSBPYmplY3Qua2V5cyhvdGhlckNvbmZpZyk7XG4gICAgaWYgKGtleXMubGVuZ3RoID09IDApXG4gICAgICBicmVhaztcbiAgICBjb25zdCBkb25lS2V5cyA9IFtdO1xuICAgIGZvciAoY29uc3Qga2V5IG9mIGtleXMpIHtcbiAgICAgIGNvbnN0IG90aGVySXRlciA9IG90aGVyQ29uZmlnW2tleV07XG4gICAgICBjb25zdCBiYXNlTGlzdCA9IFtdO1xuICAgICAgZm9yIChjb25zdCBpdGVyIG9mIGFycmF5V3JhcHBlcihvdGhlckl0ZXIuYmFzZSkpIHtcbiAgICAgICAgY29uc3QgYmFzZUVudHJ5ID0gYmFzZUNvbmZpZ1tpdGVyXTtcbiAgICAgICAgaWYgKCFiYXNlRW50cnkpIHtcbiAgICAgICAgICBiYXNlTGlzdC5sZW5ndGggPSAwO1xuICAgICAgICAgIGJyZWFrO1xuICAgICAgICB9XG4gICAgICAgIGJhc2VMaXN0LnB1c2goYmFzZUVudHJ5KTtcbiAgICAgIH1cbiAgICAgIGlmIChiYXNlTGlzdC5sZW5ndGgpIHtcbiAgICAgICAgYmFzZUxpc3QucHVzaChvdGhlckl0ZXIpO1xuICAgICAgICBsZXQgbmV3RW50cnkgPSB7fTtcbiAgICAgICAgZm9yIChjb25zdCBpdGVyIG9mIGJhc2VMaXN0KSB7XG4gICAgICAgICAgYXNzaWduT2JqZWN0KG5ld0VudHJ5LCBpdGVyKTtcbiAgICAgICAgfVxuICAgICAgICBiYXNlQ29uZmlnW2tleV0gPSBuZXdFbnRyeTtcbiAgICAgICAgZG9uZUtleXMucHVzaChrZXkpO1xuICAgICAgfVxuICAgIH1cbiAgICBpZiAoZG9uZUtleXMubGVuZ3RoID09IDApIHtcbiAgICAgIGZvciAoY29uc3Qga2V5IG9mIGtleXMpXG4gICAgICAgIHRocm93IGBDYW4ndCBzZXQgYmFzZSBjb25maWcgZm9yIFwiJHtrZXl9YDtcbiAgICB9XG4gICAgZm9yIChjb25zdCBrZXkgb2YgZG9uZUtleXMpIHtcbiAgICAgIGRlbGV0ZSBiYXNlQ29uZmlnW2tleV0uYmFzZTtcbiAgICAgIGRlbGV0ZSBvdGhlckNvbmZpZ1trZXldO1xuICAgIH1cbiAgfVxuXG4gIHJldHVybiBiYXNlQ29uZmlnO1xufVxuXG5mdW5jdGlvbiByZXNvbHZlU3RyaW5nV2l0aFZhcmlhYmxlKGNvbmZpZzogYW55LCBlbnRyeUNvbmZpZzogYW55LCByb290Q29uZmlnOiBhbnksIHZhbDogYW55KSB7XG4gIHJldHVybiB2YWwucmVwbGFjZSgvXFwkXFx7KFtefV0rKVxcfS9nLCAobWF0Y2g6IGFueSwgdmFsdWU6IGFueSkgPT4ge1xuICAgIGxldCBzZWw7XG4gICAgZm9yIChjb25zdCBuYW1lIG9mIHZhbHVlLnNwbGl0KFwiLlwiKSkge1xuICAgICAgaWYgKHNlbCA9PT0gdW5kZWZpbmVkKSB7XG4gICAgICAgIGlmIChjb25maWcuaGFzT3duUHJvcGVydHkobmFtZSkpXG4gICAgICAgICAgc2VsID0gY29uZmlnW25hbWVdO1xuICAgICAgICBlbHNlIGlmIChjb25maWcgIT09IGVudHJ5Q29uZmlnICYmIGVudHJ5Q29uZmlnLmhhc093blByb3BlcnR5KG5hbWUpKVxuICAgICAgICAgIHNlbCA9IGVudHJ5Q29uZmlnW25hbWVdO1xuICAgICAgICBlbHNlIGlmIChjb25maWcgIT09IHJvb3RDb25maWcgJiYgcm9vdENvbmZpZy5oYXNPd25Qcm9wZXJ0eShuYW1lKSlcbiAgICAgICAgICBzZWwgPSByb290Q29uZmlnW25hbWVdO1xuICAgICAgICBlbHNlIHtcbiAgICAgICAgICB0cnkge1xuICAgICAgICAgICAgY29uc3QgbWFpbkZpbGUgPSByZXF1aXJlUmVzb2x2ZShuYW1lKTtcbiAgICAgICAgICAgIGlmIChtYWluRmlsZSkge1xuICAgICAgICAgICAgICBzZWwgPSB7IG1haW5GaWxlLCBtYWluRGlyOiBQYXRoLmRpcm5hbWUobWFpbkZpbGUpLCB9O1xuICAgICAgICAgICAgfVxuICAgICAgICAgfSBjYXRjaChlKSB7fVxuICAgICAgICB9XG4gICAgICAgIGlmIChzZWwgPT09IHVuZGVmaW5lZClcbiAgICAgICAgICBicmVhaztcbiAgICAgIH1cbiAgICAgIGVsc2UgaWYgKHNlbC5oYXNPd25Qcm9wZXJ0eShuYW1lKSkge1xuICAgICAgICBzZWwgPSBzZWxbbmFtZV07XG4gICAgICB9XG4gICAgICBlbHNlIHtcbiAgICAgICAgc2VsID0gdW5kZWZpbmVkO1xuICAgICAgICBicmVhaztcbiAgICAgIH1cbiAgICB9XG4gICAgaWYgKHNlbCA9PT0gdW5kZWZpbmVkKVxuICAgICAgdGhyb3cgbmV3IEVycm9yKGBUaGUgJHt2YWx1ZX0gdmFyaWFibGUgZG9lcyBub3QgZXhpc3RcImApO1xuICAgIHJldHVybiBzZWw7XG4gIH0pO1xufVxuXG5mdW5jdGlvbiByZXNvbHZlQ29uZmlnU3RyaW5nc0ltcGwoY29uZmlnOiBhbnksIGVudHJ5Q29uZmlnOiBhbnksIHJvb3RDb25maWc6IGFueSkge1xuICBsZXQgY291bnQgPSAwO1xuICBmb3IgKGNvbnN0IFtrZXksIHZhbF0gb2YgT2JqZWN0LmVudHJpZXMoY29uZmlnKSkge1xuICAgIGlmICh2YWwgJiYgdHlwZW9mIHZhbCA9PT0gXCJvYmplY3RcIilcbiAgICAgIGNvdW50ICs9IHJlc29sdmVDb25maWdTdHJpbmdzSW1wbCh2YWwsIGVudHJ5Q29uZmlnLCByb290Q29uZmlnKTtcbiAgICBlbHNlIGlmICh0eXBlb2YgdmFsID09PSBcInN0cmluZ1wiKSB7XG4gICAgICBjb25zdCB2ID0gcmVzb2x2ZVN0cmluZ1dpdGhWYXJpYWJsZShjb25maWcsIGVudHJ5Q29uZmlnLCByb290Q29uZmlnLCB2YWwpO1xuICAgICAgaWYgKHZhbCAhPT0gdikge1xuICAgICAgICBjb25maWdba2V5XSA9IHY7XG4gICAgICAgIGNvdW50Kys7XG4gICAgICB9XG4gICAgfVxuICB9XG4gIHJldHVybiBjb3VudDtcbn1cblxuZnVuY3Rpb24gcmVzb2x2ZUNvbmZpZ1N0cmluZ3MoY29uZmlnOiBhbnkpIHtcbiAgZm9yICg7Oykge1xuICAgIGxldCBjb3VudCA9IDA7XG4gICAgZm9yIChjb25zdCBba2V5LCB2YWxdIG9mIE9iamVjdC5lbnRyaWVzKGNvbmZpZykpIHtcbiAgICAgIGlmICh2YWwgJiYgdHlwZW9mIHZhbCA9PT0gXCJvYmplY3RcIilcbiAgICAgICAgY291bnQgKz0gcmVzb2x2ZUNvbmZpZ1N0cmluZ3NJbXBsKHZhbCwgdmFsLCBjb25maWcpO1xuICAgICAgZWxzZSAgaWYgKHR5cGVvZiB2YWwgPT09IFwic3RyaW5nXCIpIHtcbiAgICAgICAgY29uc3QgdiA9IHJlc29sdmVTdHJpbmdXaXRoVmFyaWFibGUoY29uZmlnLCBjb25maWcsIGNvbmZpZywgdmFsKTtcbiAgICAgICAgaWYgKHZhbCAhPT0gdikge1xuICAgICAgICAgIGNvbmZpZ1trZXldID0gdjtcbiAgICAgICAgICBjb3VudCsrO1xuICAgICAgICB9XG4gICAgICB9XG4gICAgfVxuICAgIGlmICghY291bnQpXG4gICAgICBicmVhaztcbiAgfVxufVxuXG5mdW5jdGlvbiBtYWtlQnVpbGRDb25maWcoZ2NvbmZpZzogSUdlbmVyYWxDb25maWcsIGNvbmZpZzogYW55KSB7XG4gIGlmIChjb25maWdbXCJzb3VyY2VSb290XCJdKSB7XG4gICAgdGhyb3cgbmV3IEVycm9yKGBWYXJpYWJsZSBcInNvdXJjZVJvb3RcIiBjYW5ub3QgYmUgY2hhbmdlZCB0byBcIiR7Y29uZmlnLnNvdXJjZVJvb3R9XCJgKTtcbiAgfVxuXG4gIGNvbnN0IHJvb3RDb25maWcgPSByZWJhc2VDb25maWcoY29uZmlnKTtcblxuICByb290Q29uZmlnLmJ1aWxkVHlwZSA9IHJvb3RDb25maWcuYnVpbGRUeXBlIHx8IGdjb25maWcuYnVpbGRUeXBlO1xuICByb290Q29uZmlnLnNvdXJjZVJvb3QgPSByb290Q29uZmlnLnNvdXJjZVJvb3QgfHwgZ2NvbmZpZy53b3JrRGlyO1xuICByb290Q29uZmlnLmJpbmFyeVJvb3QgPSByb290Q29uZmlnLmJpbmFyeVJvb3QgfHwgUGF0aC5qb2luKGdjb25maWcud29ya0RpciwgXCJidWlsZFwiKTtcblxuICBmb3IgKGNvbnN0IFtrZXksIGVudHJ5XSBvZiBPYmplY3QuZW50cmllcyhyb290Q29uZmlnKSBhcyBhbnkpIHtcbiAgICBpZiAoZW50cnkgJiYgdHlwZW9mIGVudHJ5ID09PSBcIm9iamVjdFwiICYmIGVudHJ5LmFjdGlvbikge1xuICAgICAgZW50cnkuYnVpbGRUeXBlID0gZW50cnkuYnVpbGRUeXBlIHx8IHJvb3RDb25maWcuYnVpbGRUeXBlO1xuICAgICAgY29uc3QgZm9sZGVyID0ga2V5LnJlcGxhY2UoXCI6XCIsIFBhdGguc2VwKTtcbiAgICAgIGNvbnN0IHdvcmtEaXIgPSBQYXRoLmpvaW4ocm9vdENvbmZpZy5iaW5hcnlSb290LCBmb2xkZXIpO1xuICAgICAgZW50cnkudGVtcERpciA9IGVudHJ5LnRlbXBEaXIgfHwgUGF0aC5qb2luKHdvcmtEaXIsIFwidG1wXCIpO1xuICAgICAgaWYgKGVudHJ5LnNvdXJjZVVybCkge1xuICAgICAgICBpZiAoZW50cnkuc291cmNlVXJsLnN0YXJ0c1dpdGgoSU1QT1JUX1NDSEVNRSkpIHtcbiAgICAgICAgICBjb25zdCBmaWxlbmFtZSA9IHJlcXVpcmVSZXNvbHZlKGVudHJ5LnNvdXJjZVVybC5zbGljZShJTVBPUlRfU0NIRU1FLmxlbmd0aCkpO1xuICAgICAgICAgIGVudHJ5LnNvdXJjZURpciA9IFBhdGguZGlybmFtZShmaWxlbmFtZSk7XG4gICAgICAgIH1cbiAgICAgICAgZWxzZSB7XG4gICAgICAgICAgZW50cnkuYXJjaGl2ZURpciA9IGVudHJ5LmFyY2hpdmVEaXIgfHwgUGF0aC5qb2luKHdvcmtEaXIsIFwiYXJjXCIpO1xuICAgICAgICAgIGVudHJ5LmV4dHJhY3REaXIgPSBlbnRyeS5leHRyYWN0RGlyIHx8IFBhdGguam9pbih3b3JrRGlyLCBcInNyY1wiKTtcbiAgICAgICAgICBpZiAoIWVudHJ5LnNvdXJjZURpcilcbiAgICAgICAgICAgIGVudHJ5LnNvdXJjZURpciA9IGVudHJ5LmV4dHJhY3REaXI7XG4gICAgICAgICAgZWxzZSBpZiAoIVBhdGguaXNBYnNvbHV0ZShlbnRyeS5zb3VyY2VEaXIpKVxuICAgICAgICAgICAgZW50cnkuc291cmNlRGlyID0gUGF0aC5qb2luKGVudHJ5LmV4dHJhY3REaXIsIGVudHJ5LnNvdXJjZURpcik7XG4gICAgICAgIH1cbiAgICAgIH1cbiAgICAgIGVsc2UgaWYgKCFlbnRyeS5zb3VyY2VEaXIpIHtcbiAgICAgICAgdGhyb3cgbmV3IEVycm9yKGBNaXNzaW5nIHNvdXJjZURpciBmb3IgJHtrZXl9IGFjdGlvblwiYCk7XG4gICAgICB9XG4gICAgICBpZiAoZW50cnkuYmluYXJ5RGlyID09PSBudWxsKVxuICAgICAgICBlbnRyeS5iaW5hcnlEaXIgPSBlbnRyeS5zb3VyY2VEaXI7XG4gICAgICBlbHNlIGlmIChlbnRyeS5iaW5hcnlEaXIgPT09IHVuZGVmaW5lZClcbiAgICAgICAgZW50cnkuYmluYXJ5RGlyID0gUGF0aC5qb2luKHdvcmtEaXIsIFwiYmluXCIpO1xuICAgIH1cbiAgfVxuXG4gIHJlc29sdmVDb25maWdTdHJpbmdzKHJvb3RDb25maWcpO1xuXG4gIHJldHVybiByb290Q29uZmlnO1xufVxuXG5hc3luYyBmdW5jdGlvbiBkb0V4dHJhY3RBcmNoaXZlKGdjb25maWc6IElHZW5lcmFsQ29uZmlnLCBlbnZpcm9ubWVudDogYW55LCBjb25maWc6IGFueSwgc2V0dGluZ3M6IGFueSkge1xuICBpZiAoIWNvbmZpZy5zb3VyY2VVcmwpXG4gICAgdGhyb3cgbmV3IEVycm9yKFwiVW5rbm93biBzb3VyY2VVcmxcIik7XG4gIGlmICghY29uZmlnLmFyY2hpdmVEaXIpXG4gICAgdGhyb3cgbmV3IEVycm9yKFwiVW5rbm93biBhcmNoaXZlRGlyXCIpO1xuICBpZiAoIWNvbmZpZy5leHRyYWN0RGlyKVxuICAgIHRocm93IG5ldyBFcnJvcihcIlVua25vd24gZXh0cmFjdERpclwiKTtcblxuICBpZiAoIWF3YWl0IGRpcmVjdG9yeUV4aXN0cyhjb25maWcuYXJjaGl2ZURpcikpIHtcbiAgICBsb2dnZXIubm90aWNlKGBta2RpciAtcCAke2NvbmZpZy5hcmNoaXZlRGlyfWApO1xuICAgIGF3YWl0IGZzLnByb21pc2VzLm1rZGlyKGNvbmZpZy5hcmNoaXZlRGlyLCB7IHJlY3Vyc2l2ZTogdHJ1ZSB9KTtcbiAgfVxuXG4gIGlmICghYXdhaXQgZGlyZWN0b3J5RXhpc3RzKGNvbmZpZy50ZW1wRGlyKSkge1xuICAgIGxvZ2dlci5ub3RpY2UoYG1rZGlyIC1wICR7Y29uZmlnLnRlbXBEaXJ9YCk7XG4gICAgYXdhaXQgZnMucHJvbWlzZXMubWtkaXIoY29uZmlnLnRlbXBEaXIsIHsgcmVjdXJzaXZlOiB0cnVlIH0pO1xuICB9XG5cbiAgY29uc3QgYXJjTmFtZSA9IFBhdGguYmFzZW5hbWUoY29uZmlnLnNvdXJjZVVybCk7XG5cbiAgbGV0IGFyY0ZpbGU7XG4gIGxldCBkb3dubG9hZFVybHMgPSBhd2FpdCBzZXR0aW5ncy5nZXQoXCJkb3dubG9hZFVybHNcIikgfHwge307XG4gIGlmIChkb3dubG9hZFVybHNbY29uZmlnLnNvdXJjZVVybF0pXG4gICAgYXJjRmlsZSA9IGRvd25sb2FkVXJsc1tjb25maWcuc291cmNlVXJsXTtcbiAgZWxzZSB7XG4gICAgYXJjRmlsZSA9IFBhdGguam9pbihjb25maWcuYXJjaGl2ZURpciwgYXJjTmFtZSk7XG4gICAgYXdhaXQgZG93bmxvYWRGaWxlKGNvbmZpZy5zb3VyY2VVcmwsIGFyY0ZpbGUsIHsgYXR0ZW1wdHM6IFJFUVVFU1RfQVRURU1QVFMgfSk7XG4gICAgZG93bmxvYWRVcmxzW2NvbmZpZy5zb3VyY2VVcmxdID0gYXJjRmlsZTtcbiAgICBhd2FpdCBzZXR0aW5ncy5zZXQoXCJkb3dubG9hZFVybHNcIiwgZG93bmxvYWRVcmxzKTtcbiAgfVxuXG4gIGxldCBleHRyYWN0RGlyO1xuICBsZXQgZXh0cmFjdEZpbGVzID0gYXdhaXQgc2V0dGluZ3MuZ2V0KFwiZXh0cmFjdEZpbGVzXCIpIHx8IHt9O1xuICBpZiAoZXh0cmFjdEZpbGVzW2FyY0ZpbGVdKSB7XG4gICAgZXh0cmFjdERpciA9IGV4dHJhY3RGaWxlc1thcmNGaWxlXTtcbiAgfVxuICBlbHNlIHtcbiAgICBleHRyYWN0RGlyID0gYXdhaXQgZnMucHJvbWlzZXMubWtkdGVtcChQYXRoLnJlc29sdmUoY29uZmlnLnRlbXBEaXIsIGFyY05hbWUgKyAnLicpKTtcbiAgXG4gICAgYXdhaXQgQ01ha2VQcm9jZXNzLmdldEluc3RhbmNlKCkuZXh0cmFjdCh7XG4gICAgICBlbnZpcm9ubWVudCxcbiAgICAgIGZpbGVuYW1lOiBhcmNGaWxlLFxuICAgICAgd29ya0RpcjogZXh0cmFjdERpcixcbiAgICAgIGxvZ0ZpbGU6ICBQYXRoLmpvaW4oY29uZmlnLnRlbXBEaXIsIFBhdGguYmFzZW5hbWUoZXh0cmFjdERpcikgKyBcIi5sb2dcIiksXG4gICAgfSk7XG4gIFxuICAgIGNvbnN0IGV4dHJhY3RMaXN0ID0gYXdhaXQgZnMucHJvbWlzZXMucmVhZGRpcihleHRyYWN0RGlyKTtcbiAgICBpZiAoZXh0cmFjdExpc3QubGVuZ3RoID09PSAxKSB7XG4gICAgICBleHRyYWN0RGlyID0gUGF0aC5yZXNvbHZlKGV4dHJhY3REaXIsIGV4dHJhY3RMaXN0WzBdKTtcbiAgICAgIGlmICghYXdhaXQgZGlyZWN0b3J5RXhpc3RzKGV4dHJhY3REaXIpKSB7XG4gICAgICAgIGxvZ2dlci5ub3RpY2UoYHJtIC1mciAke2V4dHJhY3REaXJ9YCk7XG4gICAgICAgIGF3YWl0IGZzLnByb21pc2VzLnJtKGV4dHJhY3REaXIsIHsgcmVjdXJzaXZlOiB0cnVlIH0pO1xuICAgICAgICB0aHJvdyBuZXcgRXJyb3IoYFN1cHBvcnQgb25seSBkaXJlY3RvcnkgZm9yIGFyY2hpdmVgKTtcbiAgICAgIH1cbiAgICB9XG4gIFxuICAgIGlmIChhd2FpdCBkaXJlY3RvcnlFeGlzdHMoY29uZmlnLmV4dHJhY3REaXIpKSB7XG4gICAgICAvLyBUT0RPOiBNYXJnZSBleHRyYWN0RGlyIHdpdGggb3V0cHV0XG4gICAgICBsb2dnZXIubm90aWNlKGBybSAtZnIgJHtjb25maWcuZXh0cmFjdERpcn1gKTtcbiAgICAgIGF3YWl0IGZzLnByb21pc2VzLnJtKGNvbmZpZy5leHRyYWN0RGlyLCB7IHJlY3Vyc2l2ZTogdHJ1ZSB9KTtcbiAgICB9XG4gICAgZWxzZSB7XG4gICAgICBjb25zdCBwYXJlbnREaXIgPSBQYXRoLmRpcm5hbWUoY29uZmlnLmV4dHJhY3REaXIpO1xuICAgICAgaWYgKCFhd2FpdCBkaXJlY3RvcnlFeGlzdHMocGFyZW50RGlyKSkge1xuICAgICAgICBsb2dnZXIubm90aWNlKGBta2RpciAtcCAke3BhcmVudERpcn1gKTtcbiAgICAgICAgYXdhaXQgZnMucHJvbWlzZXMubWtkaXIocGFyZW50RGlyLCB7IHJlY3Vyc2l2ZTogdHJ1ZSB9KTsgXG4gICAgICB9XG4gICAgfVxuICBcbiAgICBsb2dnZXIubm90aWNlKGBtdiAke2V4dHJhY3REaXJ9ICR7Y29uZmlnLmV4dHJhY3REaXJ9YCk7XG4gICAgYXdhaXQgZnMucHJvbWlzZXMucmVuYW1lKGV4dHJhY3REaXIsIGNvbmZpZy5leHRyYWN0RGlyKTtcbiAgXG4gICAgZXh0cmFjdEZpbGVzW2FyY0ZpbGVdID0gZXh0cmFjdERpcjtcbiAgICBhd2FpdCBzZXR0aW5ncy5zZXQoXCJleHRyYWN0RmlsZXNcIiwgZXh0cmFjdEZpbGVzKTtcbiAgfVxuXG4gIGlmIChjb25maWcucGF0Y2hEaXIpIHtcbiAgICBsZXQgcGF0Y2hEaXJzID0gYXdhaXQgc2V0dGluZ3MuZ2V0KFwicGF0Y2hEaXJzXCIpIHx8IHt9O1xuICAgIGlmICghcGF0Y2hEaXJzW2NvbmZpZy5wYXRjaERpcl0pIHtcbiAgICAgIGF3YWl0IG1ha2VQYXRjaChjb25maWcucGF0Y2hEaXIsIGNvbmZpZy5leHRyYWN0RGlyKTtcbiAgICAgIHBhdGNoRGlyc1tjb25maWcucGF0Y2hEaXJdID0gY29uZmlnLmV4dHJhY3REaXI7XG4gICAgICBhd2FpdCBzZXR0aW5ncy5zZXQoXCJwYXRjaERpcnNcIiwgcGF0Y2hEaXJzKTtcbiAgICB9XG4gIH1cbn1cblxuYXN5bmMgZnVuY3Rpb24gZG9UYXJnZXRCdWlsZChnY29uZmlnOiBJR2VuZXJhbENvbmZpZywgZW52aXJvbm1lbnQ6IGFueSwgY29uZmlnOiBhbnksIHNldHRpbmdzOiBTZXR0aW5nc1N0b3JhZ2UpIHtcbiAgaWYgKGNvbmZpZy5wcmVBY3Rpb24pIHtcbiAgICBhd2FpdCBzZXR0aW5ncy5wdXNoKFwicHJlQWN0aW9uXCIpO1xuICAgIGNvbnN0IG5ld0NvbmZpZzogYW55ID0ge307XG4gICAgYXNzaWduT2JqZWN0KG5ld0NvbmZpZywgY29uZmlnKTtcbiAgICBkZWxldGUgbmV3Q29uZmlnLmFjdGlvbjtcbiAgICBkZWxldGUgbmV3Q29uZmlnLnByZUFjdGlvbjtcbiAgICBkZWxldGUgbmV3Q29uZmlnLnBvc3RBY3Rpb247XG4gICAgYXNzaWduT2JqZWN0KG5ld0NvbmZpZywgY29uZmlnLnByZUFjdGlvbik7XG4gICAgY29uc3QgbmV3RW52aXJvbm1lbnQgPSBtZXJnZUVudmlyb25tZW50KGNvbmZpZy5wcmVBY3Rpb24uZW52aXJvbm1lbnQsIGVudmlyb25tZW50KTtcbiAgICBhd2FpdCBkb1RhcmdldEJ1aWxkKGdjb25maWcsIG5ld0Vudmlyb25tZW50LCBuZXdDb25maWcsIHNldHRpbmdzKTtcbiAgICBhd2FpdCBzZXR0aW5ncy5wb3AoKTtcbiAgfVxuXG4gIGlmIChBcnJheS5pc0FycmF5KGNvbmZpZy5hY3Rpb24pKSB7XG4gICAgYXdhaXQgc2V0dGluZ3MucHVzaChcImFjdGlvblwiKTtcbiAgICBmb3IgKHZhciBpID0gMDsgaSA8IGNvbmZpZy5hY3Rpb24ubGVuZ3RoOyArK2kpIHtcbiAgICAgIGF3YWl0IHNldHRpbmdzLnB1c2goaS50b1N0cmluZygpKTtcbiAgICAgIGNvbnN0IG5ld0NvbmZpZzogYW55ID0ge307XG4gICAgICBhc3NpZ25PYmplY3QobmV3Q29uZmlnLCBjb25maWcpO1xuICAgICAgZGVsZXRlIG5ld0NvbmZpZy5hY3Rpb247XG4gICAgICBkZWxldGUgbmV3Q29uZmlnLnByZUFjdGlvbjtcbiAgICAgIGRlbGV0ZSBuZXdDb25maWcucG9zdEFjdGlvbjtcbiAgICAgIGFzc2lnbk9iamVjdChuZXdDb25maWcsIGNvbmZpZy5hY3Rpb25baV0pO1xuICAgICAgY29uc3QgbmV3RW52aXJvbm1lbnQgPSBtZXJnZUVudmlyb25tZW50KGNvbmZpZy5hY3Rpb25baV0uZW52aXJvbm1lbnQsIGVudmlyb25tZW50KTtcbiAgICAgIGF3YWl0IGRvVGFyZ2V0QnVpbGQoZ2NvbmZpZywgbmV3RW52aXJvbm1lbnQsIG5ld0NvbmZpZywgc2V0dGluZ3MpO1xuICAgICAgYXdhaXQgc2V0dGluZ3MucG9wKCk7XG4gICAgfVxuICAgIGF3YWl0IHNldHRpbmdzLnBvcCgpO1xuICB9XG4gIGVsc2Uge1xuICAgIGlmICghYXdhaXQgZGlyZWN0b3J5RXhpc3RzKGNvbmZpZy5iaW5hcnlEaXIpKSB7XG4gICAgICBhd2FpdCBmcy5wcm9taXNlcy5ta2Rpcihjb25maWcuYmluYXJ5RGlyLCB7IHJlY3Vyc2l2ZTogdHJ1ZSB9KTtcbiAgICB9XG4gICAgaWYgKGFjdGlvbnNbY29uZmlnLmFjdGlvbl0pIHtcbiAgICAgIGNvbmZpZy5kZXNjcmlwdGlvbiAmJiBsb2dnZXIubm90aWNlKGNvbmZpZy5kZXNjcmlwdGlvbik7XG4gICAgICBhd2FpdCBhY3Rpb25zW2NvbmZpZy5hY3Rpb25dKGNvbmZpZywgZW52aXJvbm1lbnQsIHNldHRpbmdzKTtcbiAgICB9XG4gIH1cblxuICBpZiAoY29uZmlnLnBvc3RBY3Rpb24pIHtcbiAgICBhd2FpdCBzZXR0aW5ncy5wdXNoKFwicG9zdEFjdGlvblwiKTtcbiAgICBjb25zdCBuZXdDb25maWc6IGFueSA9IHt9O1xuICAgIGFzc2lnbk9iamVjdChuZXdDb25maWcsIGNvbmZpZyk7XG4gICAgZGVsZXRlIG5ld0NvbmZpZy5hY3Rpb247XG4gICAgZGVsZXRlIG5ld0NvbmZpZy5wcmVBY3Rpb247XG4gICAgZGVsZXRlIG5ld0NvbmZpZy5wb3N0QWN0aW9uO1xuICAgIGFzc2lnbk9iamVjdChuZXdDb25maWcsIGNvbmZpZy5wb3N0QWN0aW9uKTtcbiAgICBjb25zdCBuZXdFbnZpcm9ubWVudCA9IG1lcmdlRW52aXJvbm1lbnQoY29uZmlnLnBvc3RBY3Rpb24uZW52aXJvbm1lbnQsIGVudmlyb25tZW50KTtcbiAgICBhd2FpdCBkb1RhcmdldEJ1aWxkKGdjb25maWcsIG5ld0Vudmlyb25tZW50LCBuZXdDb25maWcsIHNldHRpbmdzKTtcbiAgICBhd2FpdCBzZXR0aW5ncy5wb3AoKTtcbiAgfVxufVxuXG5hc3luYyBmdW5jdGlvbiBnZXRVc2VyQ29uZmlnKG9wdGlvbnM6IENvbW1hbmRPcHRpb25zKSB7XG4gIGxldCBjb25maWdQYXRoO1xuICBpZiAob3B0aW9ucy5lbnYuY29uZmlnKSB7XG4gICAgY29uZmlnUGF0aCA9IFBhdGguaXNBYnNvbHV0ZShvcHRpb25zLmVudi5jb25maWcpID8gb3B0aW9ucy5lbnYuY29uZmlnIDogUGF0aC5yZXNvbHZlKG9wdGlvbnMud29ya0Rpciwgb3B0aW9ucy5lbnYuY29uZmlnKTtcbiAgICBpZiAoIWF3YWl0IGZpbGVFeGlzdHMoY29uZmlnUGF0aCkpXG4gICAgICB0aHJvdyBgQ29uZmlndXJhdGlvbiAnJHtvcHRpb25zLmVudi5jb25maWd9JyBmaWxlIGRvZXMgbm90IGV4aXN0YDtcbiAgfVxuICBlbHNlIHtcbiAgICBjb25zdCB1c2VyQ29uZmlnUGF0aCA9IFBhdGgucmVzb2x2ZShvcHRpb25zLndvcmtEaXIsIFVTRVJfQ09ORklHKTtcbiAgICBpZiAoYXdhaXQgZmlsZUV4aXN0cyh1c2VyQ29uZmlnUGF0aCkpXG4gICAgICBjb25maWdQYXRoID0gdXNlckNvbmZpZ1BhdGg7XG4gICAgZWxzZSB7XG4gICAgICBsb2dnZXIud2FybihgQ29uZmlnIGZpbGUgJyR7VVNFUl9DT05GSUd9JyBpcyBub3QgYXZhaWxhYmxlYCk7XG4gICAgfVxuICB9XG5cbiAgaWYgKCFjb25maWdQYXRoKSB7XG4gICAgcmV0dXJuIHtcbiAgICAgIFwiYnVuZGxlOm91dHB1dFwiOiB7XG4gICAgICAgIGFjdGlvbjogXCJiaXRtYWtlXCIsXG4gICAgICAgIHZhcmlhYmxlczoge1xuICAgICAgICAgIElOU1RBTExfUFJFRklYOiBcIi91c3JcIixcbiAgICAgICAgfSxcbiAgICAgICAgc291cmNlRGlyOiBcIiR7c291cmNlUm9vdH1cIixcbiAgICAgICAgZGVzdERpcjogXCIke2JpbmFyeVJvb3R9L291dHB1dFwiLFxuICAgICAgfVxuICAgIH07XG4gIH1cblxuICBjb25zdCBjb25maWdVcmwgPSB1cmwucGF0aFRvRmlsZVVSTChjb25maWdQYXRoKTtcbiAgY29uc3QgY29uZmlnTW9kdWxlID0gYXdhaXQgaW1wb3J0TW9kdWxlKGNvbmZpZ1VybCk7XG4gIHN3aXRjaCAodHlwZW9mIGNvbmZpZ01vZHVsZS5kZWZhdWx0KSB7XG4gIGNhc2UgXCJmdW5jdGlvblwiOlxuICAgIGNvbnN0IHVzZXJDb25maWcgPSBjb25maWdNb2R1bGUuZGVmYXVsdChvcHRpb25zLmVudiwge30pO1xuICAgIGlmICh1c2VyQ29uZmlnIGluc3RhbmNlb2YgUHJvbWlzZSlcbiAgICAgIHJldHVybiBhd2FpdCB1c2VyQ29uZmlnO1xuICAgIHJldHVybiB1c2VyQ29uZmlnO1xuXG4gIGNhc2UgXCJvYmplY3RcIjpcbiAgICByZXR1cm4gY29uZmlnTW9kdWxlLmRlZmF1bHQ7XG5cbiAgZGVmYXVsdDpcbiAgICB0aHJvdyBuZXcgRXJyb3IoYFVua25vd24gdXNlciBjb25maWd1cmF0aW9uIHR5cGVgKTtcbiAgfVxufVxuXG5leHBvcnQgZGVmYXVsdCBhc3luYyAob3B0aW9uczogQ29tbWFuZE9wdGlvbnMpID0+IHtcbiAgY29uc3QgZ2NvbmZpZzogSUdlbmVyYWxDb25maWcgPSB7XG4gICAgYnVpbGRUeXBlOiBvcHRpb25zLmVudi5idWlsZFR5cGUgPT0gREVCVUdfQlVJTERfVFlQRSA/IG9wdGlvbnMuZW52LmJ1aWxkVHlwZSA6IFJFTEVBU0VfQlVJTERfVFlQRSxcbiAgICB3b3JrRGlyOiBvcHRpb25zLndvcmtEaXIsXG4gIH07XG5cbiAgY29uc3QgdXNlckNvbmZpZyA9IGF3YWl0IGdldFVzZXJDb25maWcob3B0aW9ucyk7XG4gIGNvbnN0IGJ1aWxkQ29uZmlnID0gbWFrZUJ1aWxkQ29uZmlnKGdjb25maWcsIHVzZXJDb25maWcpO1xuXG4gIGlmIChidWlsZENvbmZpZy5SRUNJUEVfQ09OVEVOVF9GSUxFKSB7XG4gICAgY29uc3QganNvbkNvbmZpZyA9IEpTT04uc3RyaW5naWZ5KGJ1aWxkQ29uZmlnLCBudWxsLCAyKTtcbiAgICBhd2FpdCBzYXZlSWZEaWZmZXJlbnQoYnVpbGRDb25maWcuUkVDSVBFX0NPTlRFTlRfRklMRSwganNvbkNvbmZpZyk7XG4gIH1cblxuICBjb25zdCBzZXR0aW5nc0ZpbGVuYW1lID0gUGF0aC5yZXNvbHZlKGJ1aWxkQ29uZmlnLmJpbmFyeVJvb3QsIEJVSUxEX1NFVFRJTkdTX0ZJTEUpO1xuICBjb25zdCBzZXR0aW5ncyA9IG5ldyBTZXR0aW5nc1N0b3JhZ2Uoc2V0dGluZ3NGaWxlbmFtZSk7XG5cbiAgZm9yIChjb25zdCBba2V5LCBlbnRyeV0gb2YgT2JqZWN0LmVudHJpZXMoYnVpbGRDb25maWcpIGFzIGFueSkge1xuICAgIGlmIChlbnRyeSAmJiB0eXBlb2YgZW50cnkgPT09IFwib2JqZWN0XCIgJiYgZW50cnkuYWN0aW9uICYmICFlbnRyeS5kaXNhYmxlZCkge1xuICAgICAgYXdhaXQgc2V0dGluZ3MucHVzaChrZXkpO1xuICAgICAgY29uc3QgY29tcGxldGVkID0gYXdhaXQgc2V0dGluZ3MuZ2V0KFwiY29tcGxldGVkXCIpO1xuICAgICAgaWYgKGVudHJ5LnJlYnVpbGQgfHwgIWNvbXBsZXRlZCkge1xuICAgICAgICBsb2dnZXIuaW5mbyhgU3RhcnRlZCBhY3Rpb246ICR7a2V5fWApO1xuICAgICAgICBjb25zdCBlbnZpcm9ubWVudCA9IG1lcmdlRW52aXJvbm1lbnQoZW50cnkuZW52aXJvbm1lbnQsIHByb2Nlc3MuZW52KTtcbiAgICAgICAgaWYgKGVudHJ5LnNvdXJjZVVybCAmJiAhZW50cnkuc291cmNlVXJsLnN0YXJ0c1dpdGgoSU1QT1JUX1NDSEVNRSkpIHtcbiAgICAgICAgICBhd2FpdCBkb0V4dHJhY3RBcmNoaXZlKGdjb25maWcsIGVudmlyb25tZW50LCBlbnRyeSwgc2V0dGluZ3MpO1xuICAgICAgICB9XG4gICAgICAgIGF3YWl0IGRvVGFyZ2V0QnVpbGQoZ2NvbmZpZywgZW52aXJvbm1lbnQsIGVudHJ5LCBzZXR0aW5ncyk7XG4gICAgICAgIGF3YWl0IHNldHRpbmdzLnNldChcImNvbXBsZXRlZFwiLCB0cnVlKTtcbiAgICAgICAgbG9nZ2VyLmluZm8oYENvbXBsZXRlZCBhY3Rpb246ICR7a2V5fWApO1xuICAgICAgfVxuICAgICAgYXdhaXQgc2V0dGluZ3MucG9wKCk7XG4gICAgfVxuICB9XG59XG4iLCIvKlxuICogTUlUIExpY2Vuc2VcbiAqXG4gKiBDb3B5cmlnaHQgKGMpIDIwMjUgIFl1cmlpIFlha3ViaW4gKHl1cmlpLnlha3ViaW5AZ21haWwuY29tKVxuICpcbiAqIFBlcm1pc3Npb24gaXMgZ3JhbnRlZCB0byB1c2UsIGNvcHksIG1vZGlmeSwgYW5kIGRpc3RyaWJ1dGUgdGhpcyBzb2Z0d2FyZVxuICogdW5kZXIgdGhlIE1JVCBMaWNlbnNlLiBTZWUgTElDRU5TRSBmaWxlIGZvciBkZXRhaWxzLlxuICovXG5cbmltcG9ydCB7IENvbW1hbmRPcHRpb25zIH0gZnJvbSBcIkAvY29yZS9Db21tYW5kT3B0aW9uc1wiO1xuaW1wb3J0IGluaXQgZnJvbSBcIkAvY29tbWFuZHMvaW5pdFwiO1xuaW1wb3J0IGJ1aWxkIGZyb20gXCJAL2NvbW1hbmRzL2J1aWxkXCI7XG5cbmV4cG9ydCBkZWZhdWx0IHtcbiAgZGVmYXVsdDogYnVpbGQsXG4gIGluaXQsXG4gIGJ1aWxkLFxufSBhcyB7IFtuYW1lOiBzdHJpbmddOiAob3B0aW9uczogQ29tbWFuZE9wdGlvbnMpID0+IGFueTsgfTtcbiIsIi8qXG4gKiBNSVQgTGljZW5zZVxuICpcbiAqIENvcHlyaWdodCAoYykgMjAyNSAgWXVyaWkgWWFrdWJpbiAoeXVyaWkueWFrdWJpbkBnbWFpbC5jb20pXG4gKlxuICogUGVybWlzc2lvbiBpcyBncmFudGVkIHRvIHVzZSwgY29weSwgbW9kaWZ5LCBhbmQgZGlzdHJpYnV0ZSB0aGlzIHNvZnR3YXJlXG4gKiB1bmRlciB0aGUgTUlUIExpY2Vuc2UuIFNlZSBMSUNFTlNFIGZpbGUgZm9yIGRldGFpbHMuXG4gKi9cblxuaW1wb3J0IHBhdGggZnJvbSBcIm5vZGU6cGF0aFwiO1xuaW1wb3J0IGZzIGZyb20gXCJub2RlOmZzXCI7XG5cbmltcG9ydCB7IGZpbGVFeGlzdHMsIGZldGNoQnVmZmVyIH0gZnJvbSBcIkAvdXRpbHMvRmlsZVN5c3RlbVwiO1xuaW1wb3J0IHsgVVNFUl9DT05GSUcgfSBmcm9tIFwiQC9Db25zdGFudHNcIjtcbmltcG9ydCB7IENvbW1hbmRPcHRpb25zIH0gZnJvbSBcIkAvY29yZS9Db21tYW5kT3B0aW9uc1wiO1xuaW1wb3J0IHsgTG9nZ2VyIH0gZnJvbSBcIkAvbG9nZ2VyXCI7XG5cbmNvbnN0IGxvZ2dlciA9IExvZ2dlci5jcmVhdGUoaW1wb3J0Lm1ldGEudXJsKTtcblxuZXhwb3J0IGRlZmF1bHQgYXN5bmMgZnVuY3Rpb24ob3B0aW9uczogQ29tbWFuZE9wdGlvbnMpIHtcbiAgY29uc3QgcHJlc2V0ID0gb3B0aW9ucy5lbnYucHJlc2V0O1xuXG4gIGlmICghcHJlc2V0KVxuICAgIHRocm93IG5ldyBFcnJvcihgUHJlc2V0ICcke3ByZXNldH0nIGlzIG5vdCBhdmFpbGFibGVgKTtcblxuICBjb25zdCBwcmVzZXREYXRhID0gYXdhaXQgZmV0Y2hCdWZmZXIocHJlc2V0KTtcblxuICBjb25zdCB1c2VyQ29uZmlnUGF0aCA9IHBhdGgucmVzb2x2ZShvcHRpb25zLndvcmtEaXIsIFVTRVJfQ09ORklHKTtcbiAgaWYgKGF3YWl0IGZpbGVFeGlzdHModXNlckNvbmZpZ1BhdGgpKVxuICAgIGF3YWl0IGZzLnByb21pc2VzLnJtKHVzZXJDb25maWdQYXRoKTtcblxuICBhd2FpdCBmcy5wcm9taXNlcy53cml0ZUZpbGUodXNlckNvbmZpZ1BhdGgsIHByZXNldERhdGEsIFwidXRmOFwiKTtcbiAgbG9nZ2VyLmluZm8oYFByZXNldCAnJHtwcmVzZXR9JyBpbnN0YWxsZWQgc3VjY2Vzc2Z1bGx5YCk7XG59XG4iLCIvKlxuICogTUlUIExpY2Vuc2VcbiAqXG4gKiBDb3B5cmlnaHQgKGMpIDIwMjUgIFl1cmlpIFlha3ViaW4gKHl1cmlpLnlha3ViaW5AZ21haWwuY29tKVxuICpcbiAqIFBlcm1pc3Npb24gaXMgZ3JhbnRlZCB0byB1c2UsIGNvcHksIG1vZGlmeSwgYW5kIGRpc3RyaWJ1dGUgdGhpcyBzb2Z0d2FyZVxuICogdW5kZXIgdGhlIE1JVCBMaWNlbnNlLiBTZWUgTElDRU5TRSBmaWxlIGZvciBkZXRhaWxzLlxuICovXG5cbmltcG9ydCB1cmwgZnJvbSBcIm5vZGU6dXJsXCI7XG5pbXBvcnQgeyBQYXRoIH0gZnJvbSBcIkAvdXRpbHMvUGF0aFwiO1xuaW1wb3J0IHsgRklMRV9TQ0hFTUUgfSBmcm9tIFwiQC91dGlscy9VcmxTY2hlbWVcIjtcbmltcG9ydCBwYXRoIGZyb20gXCJub2RlOnBhdGhcIjtcblxuY29uc3QgUEFUSCA9IFN5bWJvbChcIlBBVEhcIik7XG5cbmV4cG9ydCBjbGFzcyBBYnNvbHV0ZVBhdGgge1xuICBwcml2YXRlIFtQQVRIXTogc3RyaW5nO1xuXG4gIHByb3RlY3RlZCBjb25zdHJ1Y3RvcihmaWxlcGF0aDogc3RyaW5nKSB7XG4gICAgaWYgKGZpbGVwYXRoLnN0YXJ0c1dpdGgoRklMRV9TQ0hFTUUpKSB7XG4gICAgICB0aGlzW1BBVEhdID0gZmlsZXBhdGg7XG4gICAgfVxuICAgIGVsc2UgaWYgKFBhdGguaXNBYnNvbHV0ZShmaWxlcGF0aCkpIHtcbiAgICAgIHRoaXNbUEFUSF0gPSB1cmwucGF0aFRvRmlsZVVSTChmaWxlcGF0aCkudG9TdHJpbmcoKTtcbiAgICB9XG4gICAgZWxzZSB7XG4gICAgICB0aHJvdyBuZXcgRXJyb3IoYE5vdCBzdXBwb3J0ZWQgcmVsYXRpdmUgcGF0aCBvZiBcIiR7ZmlsZXBhdGh9XCJgKTtcbiAgICB9XG4gIH1cblxuICBwdWJsaWMgam9pbiguLi5wYXRoczogQXJyYXk8QWJzb2x1dGVQYXRoIHwgc3RyaW5nPikge1xuICAgIGNvbnN0IGZpbGVwYXRoID0gUGF0aC5qb2luKHVybC5maWxlVVJMVG9QYXRoKHRoaXNbUEFUSF0pLCAuLi5wYXRocy5tYXAoaSA9PiBpLnRvU3RyaW5nKCkpKTtcbiAgICByZXR1cm4gQWJzb2x1dGVQYXRoLmNyZWF0ZShmaWxlcGF0aCk7XG4gIH1cblxuICBwdWJsaWMgZGlybmFtZSgpIHtcbiAgICByZXR1cm4gQWJzb2x1dGVQYXRoLmNyZWF0ZShwYXRoLnBvc2l4LmRpcm5hbWUodGhpc1tQQVRIXSkpO1xuICB9XG5cbiAgcHVibGljIGJhc2VuYW1lKCkge1xuICAgIHJldHVybiBwYXRoLnBvc2l4LmJhc2VuYW1lKHRoaXNbUEFUSF0pO1xuICB9XG5cbiAgcHVibGljIHJlbGF0aXZlKHRvOiBBYnNvbHV0ZVBhdGggfCBzdHJpbmcpIHtcbiAgICByZXR1cm4gUGF0aC5yZWxhdGl2ZSh1cmwuZmlsZVVSTFRvUGF0aCh0aGlzW1BBVEhdKSwgQWJzb2x1dGVQYXRoLmNyZWF0ZSh0bykudG9TdHJpbmcoKSk7XG4gIH1cblxuICBwdWJsaWMgcmVzb2x2ZSguLi5wYXRoczogQXJyYXk8QWJzb2x1dGVQYXRoIHwgc3RyaW5nPikge1xuICAgIHJldHVybiBBYnNvbHV0ZVBhdGguY3JlYXRlKFBhdGgucmVzb2x2ZSh1cmwuZmlsZVVSTFRvUGF0aCh0aGlzW1BBVEhdKSwgLi4ucGF0aHMubWFwKGkgPT4gaS50b1N0cmluZygpKSkpO1xuICB9XG5cbiAgcHVibGljIG1hdGNoKHJlZ2V4cDogUmVnRXhwKSB7XG4gICAgcmV0dXJuIHRoaXNbUEFUSF0ubWF0Y2gocmVnZXhwKTtcbiAgfVxuXG4gIHB1YmxpYyB0b1N0cmluZygpIHtcbiAgICByZXR1cm4gdXJsLmZpbGVVUkxUb1BhdGgodGhpc1tQQVRIXSk7XG4gIH1cblxuICBwdWJsaWMgdmFsdWVPZigpIHtcbiAgICByZXR1cm4gdXJsLmZpbGVVUkxUb1BhdGgodGhpc1tQQVRIXSk7XG4gIH1cblxuICBwdWJsaWMgdG9KU09OKCkge1xuICAgIHJldHVybiB0aGlzW1BBVEhdO1xuICB9XG5cbiAgcHVibGljIHN0YXRpYyBpc0Fic29sdXRlKGZpbGVwYXRoOiBBYnNvbHV0ZVBhdGggfCBzdHJpbmcpIHtcbiAgICBpZiAoZmlsZXBhdGggaW5zdGFuY2VvZiBBYnNvbHV0ZVBhdGgpXG4gICAgICByZXR1cm4gdHJ1ZTtcbiAgICByZXR1cm4gUGF0aC5pc0Fic29sdXRlKGZpbGVwYXRoKTtcbiAgfVxuXG4gIHB1YmxpYyBzdGF0aWMgZW5zdXJlSW5zdGFuY2UodmFsdWU6IGFueSk6IEFic29sdXRlUGF0aCB7XG4gICAgaWYgKHZhbHVlIGluc3RhbmNlb2YgQWJzb2x1dGVQYXRoKVxuICAgICAgcmV0dXJuIHZhbHVlO1xuICAgIHRocm93IG5ldyBFcnJvcihgVGhlICcke3ZhbHVlfScgaXMgbm90IGEgQWJzb2x1dGVQYXRoYCk7XG4gIH1cblxuICBwdWJsaWMgc3RhdGljIGNyZWF0ZShwYXRoOiBBYnNvbHV0ZVBhdGggfCBzdHJpbmcpOiBBYnNvbHV0ZVBhdGgge1xuICAgIGlmIChwYXRoIGluc3RhbmNlb2YgQWJzb2x1dGVQYXRoKVxuICAgICAgcmV0dXJuIHBhdGg7XG5cbiAgICByZXR1cm4gT2JqZWN0LnNlYWwobmV3IEFic29sdXRlUGF0aChwYXRoKSk7XG4gIH1cbn07XG4iLCIvKlxuICogTUlUIExpY2Vuc2VcbiAqXG4gKiBDb3B5cmlnaHQgKGMpIDIwMjUgIFl1cmlpIFlha3ViaW4gKHl1cmlpLnlha3ViaW5AZ21haWwuY29tKVxuICpcbiAqIFBlcm1pc3Npb24gaXMgZ3JhbnRlZCB0byB1c2UsIGNvcHksIG1vZGlmeSwgYW5kIGRpc3RyaWJ1dGUgdGhpcyBzb2Z0d2FyZVxuICogdW5kZXIgdGhlIE1JVCBMaWNlbnNlLiBTZWUgTElDRU5TRSBmaWxlIGZvciBkZXRhaWxzLlxuICovXG5cbmltcG9ydCB7IElHZW5lcmFsQ29udGV4dCB9IGZyb20gXCJAL2NvcmUvTWFrZUludGVyZmFjZXNcIjtcbmltcG9ydCB7IGZpbmRQcm9ncmFtU3luYyB9IGZyb20gXCJAL2NvcmUvRmluZFByb2dyYW1cIjtcbmltcG9ydCB7IFNjb3BlSGVscGVyLCBWYXJpYWJsZU1hcCB9IGZyb20gXCJAL2NvcmUvU2NvcGVcIjtcbmltcG9ydCB7IExvZ2dlciB9IGZyb20gXCJAL2xvZ2dlclwiO1xuaW1wb3J0IHsgU3lzdGVtU2NvcGUgfSBmcm9tIFwiQC9jb3JlL1N5c3RlbVNjb3BlXCI7XG5pbXBvcnQgeyBBYnNvbHV0ZVBhdGggfSBmcm9tIFwiQC9jb3JlL0Fic29sdXRlUGF0aFwiO1xuaW1wb3J0IHsgaW1wb3J0TW9kdWxlIH0gZnJvbSBcIkAvdXRpbHMvTW9kdWxlXCI7XG5pbXBvcnQgeyBPYmplY3RMaWJyYXJ5LCBTdGF0aWNMaWJyYXJ5LCBTaGFyZWRMaWJyYXJ5LCBFeGVjdXRhYmxlLCBNYWluVGFyZ2V0LCBQb3N0VGFyZ2V0IH0gZnJvbSBcIkAvY29yZS9UYXJnZXRcIjtcbmltcG9ydCB7IENVU1RPTV9WQVJJQUJMRV9HUk9VUCB9IGZyb20gXCJAL0NvbnN0YW50c1wiO1xuXG5jb25zdCBsb2dnZXIgPSBMb2dnZXIuY3JlYXRlKGltcG9ydC5tZXRhLnVybCk7XG5cbmV4cG9ydCBhYnN0cmFjdCBjbGFzcyBHZW5lcmFsQ29udGV4dCBpbXBsZW1lbnRzIElHZW5lcmFsQ29udGV4dCB7XG4gIHByb3RlY3RlZCBfc2NvcGU6IFZhcmlhYmxlTWFwO1xuXG4gIGNvbnN0cnVjdG9yKHNjb3BlOiBWYXJpYWJsZU1hcCkge1xuICAgIHRoaXMuX3Njb3BlID0gc2NvcGU7XG4gIH1cblxuICBwdWJsaWMgZmluZFByb2dyYW0obmFtZTogc3RyaW5nKTogc3RyaW5nIHwgdW5kZWZpbmVkIHtcbiAgICByZXR1cm4gZmluZFByb2dyYW1TeW5jKG5hbWUpO1xuICB9XG5cbiAgcHVibGljIGdldFByb3BlcnR5KHRoaXM6IGFueSwgbmFtZTogc3RyaW5nKTogYW55IHtcbiAgICByZXR1cm4gU2NvcGVIZWxwZXIuZ2V0KHRoaXMuX3Njb3BlLCBuYW1lKTtcbiAgfVxuXG4gIHB1YmxpYyBzZXRQcm9wZXJ0eSh0aGlzOiBhbnksIG5hbWU6IHN0cmluZywgdmFsdWU6IGFueSk6IGFueSB7XG4gICAgY29uc3QgZW50cnkgPSB0aGlzLl9zY29wZVtuYW1lXTtcbiAgICBpZiAoZW50cnkpXG4gICAgICBTY29wZUhlbHBlci5zZXRFbnRyeVZhbHVlKGVudHJ5LCB2YWx1ZSk7XG4gICAgZWxzZVxuICAgICAgU2NvcGVIZWxwZXIuZGVmaW5lVmFyaWFibGUodGhpcy5fc2NvcGUsIFwiXCIsIG5hbWUsIHt2YWx1ZX0pO1xuICAgIHJldHVybiB0cnVlO1xuICB9XG5cbiAgcHVibGljIGhhc1Byb3BlcnR5KHRoaXM6IGFueSwgbmFtZTogc3RyaW5nKTogYm9vbGVhbiB7XG4gICAgcmV0dXJuIE9iamVjdC5oYXNPd24odGhpcy5fc2NvcGUsIG5hbWUpO1xuICB9XG5cbiAgcHVibGljIGRlbGV0ZVByb3BlcnR5KHRoaXM6IGFueSwgbmFtZTogc3RyaW5nKTogYm9vbGVhbiB7XG4gICAgcmV0dXJuIGRlbGV0ZSB0aGlzLl9zY29wZVtuYW1lXTtcbiAgfVxuXG4gIHB1YmxpYyBnZXRQcm9wZXJ0eU5hbWVzKHRoaXM6IGFueSk6IHN0cmluZ1tdIHtcbiAgICByZXR1cm4gT2JqZWN0LmtleXModGhpcy5fc2NvcGUpO1xuICB9XG59O1xuXG5leHBvcnQgYWJzdHJhY3QgY2xhc3MgTWFrZUNvbnRleHQgZXh0ZW5kcyBHZW5lcmFsQ29udGV4dCB7XG4gIHByaXZhdGUgX3RhcmdldHMgPSBuZXcgTWFwPHN0cmluZywgTWFpblRhcmdldD4oKTtcbiAgcHJpdmF0ZSBfaW5kaXJlY3RUYXJnZXRzID0gbmV3IE1hcDxzdHJpbmcsIFBvc3RUYXJnZXQ+KCk7XG5cbiAgcHJvdGVjdGVkIGNvbnN0cnVjdG9yKHNjb3BlOiBWYXJpYWJsZU1hcCkge1xuICAgIHN1cGVyKHNjb3BlKTtcbiAgfVxuXG4gIHB1YmxpYyBnZXQgdGFyZ2V0cygpIHtcbiAgICByZXR1cm4gdGhpcy5fdGFyZ2V0cztcbiAgfVxuXG4gIHB1YmxpYyBnZXQgaW5kaXJlY3RUYXJnZXRzKCkge1xuICAgIHJldHVybiB0aGlzLl9pbmRpcmVjdFRhcmdldHM7XG4gIH1cbiAgXG4gIHB1YmxpYyBnZXRDYWNoZVZhcmlhYmxlcygpOiBhbnkge1xuICAgIHJldHVybiBTY29wZUhlbHBlci5nZXRWYXJpYWJsZXNCeUdyb3VwKHRoaXMuX3Njb3BlLCBDVVNUT01fVkFSSUFCTEVfR1JPVVApO1xuICB9XG5cbiAgcHVibGljIGFkZEluY2x1ZGVEaXJlY3RvcmllcyguLi5kaXJzOiBhbnlbXSkge1xuICAgIGNvbnN0IHNvdXJjZURpciA9IFNjb3BlSGVscGVyLmdldCh0aGlzLl9zY29wZSwgXCJTT1VSQ0VfRElSXCIpO1xuICAgIGZvciAoY29uc3QgaXRlciBvZiBkaXJzLmZsYXQoKSlcbiAgICAgIFNjb3BlSGVscGVyLmdldCh0aGlzLl9zY29wZSwgXCJJTkNMVURFU1wiKS5wdXNoKHNvdXJjZURpci5yZXNvbHZlKGl0ZXIpKTtcbiAgfVxuXG4gIHB1YmxpYyB0YXJnZXQobmFtZTogc3RyaW5nKTogUG9zdFRhcmdldCB7XG4gICAgbGV0IHRhcmdldCA9IHRoaXMuX2luZGlyZWN0VGFyZ2V0cy5nZXQobmFtZSk7XG4gICAgaWYgKCF0YXJnZXQpIHtcbiAgICAgIHRhcmdldCA9IFBvc3RUYXJnZXQuY3JlYXRlKHRoaXMuX3Njb3BlLCBuYW1lKVxuICAgICAgdGhpcy5faW5kaXJlY3RUYXJnZXRzLnNldChuYW1lLCB0YXJnZXQpO1xuICAgIH1cbiAgICByZXR1cm4gdGFyZ2V0O1xuICB9XG5cbiAgcHVibGljIGFkZE9iamVjdExpYnJhcnkobmFtZTogYW55LCAuLi5zb3VyY2VzOiBhbnlbXSk6IE9iamVjdExpYnJhcnkge1xuICAgIGlmICh0aGlzLl90YXJnZXRzLmhhcyhuYW1lKSlcbiAgICAgIHRocm93IG5ldyBFcnJvcihgVGFyZ2V0IFwiJHtuYW1lfVwiIGV4aXN0c2ApO1xuICAgIGNvbnN0IHRhcmdldCA9IE9iamVjdExpYnJhcnkuY3JlYXRlKHRoaXMuX3Njb3BlLCBuYW1lKTtcbiAgICB0aGlzLl90YXJnZXRzLnNldChuYW1lLCB0YXJnZXQpO1xuICAgIHRhcmdldC5hZGRTb3VyY2VzKC4uLnNvdXJjZXMpO1xuICAgIHJldHVybiB0YXJnZXQ7XG4gIH1cblxuICBwdWJsaWMgYWRkU3RhdGljTGlicmFyeShuYW1lOiBhbnksIC4uLnNvdXJjZXM6IGFueVtdKTogU3RhdGljTGlicmFyeSB7XG4gICAgaWYgKHRoaXMuX3RhcmdldHMuaGFzKG5hbWUpKVxuICAgICAgdGhyb3cgbmV3IEVycm9yKGBUYXJnZXQgXCIke25hbWV9XCIgZXhpc3RzYCk7XG4gICAgY29uc3QgdGFyZ2V0ID0gU3RhdGljTGlicmFyeS5jcmVhdGUodGhpcy5fc2NvcGUsIG5hbWUpO1xuICAgIHRoaXMuX3RhcmdldHMuc2V0KG5hbWUsIHRhcmdldCk7XG4gICAgdGFyZ2V0LmFkZFNvdXJjZXMoLi4uc291cmNlcyk7XG4gICAgcmV0dXJuIHRhcmdldDtcbiAgfVxuXG4gIHB1YmxpYyBhZGRTaGFyZWRMaWJyYXJ5KG5hbWU6IGFueSwgLi4uc291cmNlczogYW55W10pOiBTaGFyZWRMaWJyYXJ5IHtcbiAgICBpZiAodGhpcy5fdGFyZ2V0cy5oYXMobmFtZSkpXG4gICAgICB0aHJvdyBuZXcgRXJyb3IoYFRhcmdldCBcIiR7bmFtZX1cIiBleGlzdHNgKTtcbiAgICBjb25zdCB0YXJnZXQgPSBTaGFyZWRMaWJyYXJ5LmNyZWF0ZSh0aGlzLl9zY29wZSwgbmFtZSk7XG4gICAgdGhpcy5fdGFyZ2V0cy5zZXQobmFtZSwgdGFyZ2V0KTtcbiAgICB0YXJnZXQuYWRkU291cmNlcyguLi5zb3VyY2VzKTtcbiAgICByZXR1cm4gdGFyZ2V0O1xuICB9XG5cbiAgcHVibGljIGFkZEV4ZWN1dGFibGUobmFtZTogc3RyaW5nLCAuLi5zb3VyY2VzOiBhbnlbXSk6IEV4ZWN1dGFibGUge1xuICAgIGlmICh0aGlzLl90YXJnZXRzLmhhcyhuYW1lKSlcbiAgICAgIHRocm93IG5ldyBFcnJvcihgVGFyZ2V0IFwiJHtuYW1lfVwiIGV4aXN0c2ApO1xuICAgIGNvbnN0IHRhcmdldCA9IEV4ZWN1dGFibGUuY3JlYXRlKHRoaXMuX3Njb3BlLCBuYW1lKTtcbiAgICB0aGlzLl90YXJnZXRzLnNldChuYW1lLCB0YXJnZXQpO1xuICAgIHRhcmdldC5hZGRTb3VyY2VzKC4uLnNvdXJjZXMpO1xuICAgIHJldHVybiB0YXJnZXQ7XG4gIH1cbn07XG5cbmV4cG9ydCBmdW5jdGlvbiBjcmVhdGVDb250ZXh0PFQgZXh0ZW5kcyBJR2VuZXJhbENvbnRleHQ+KGN0eDogVCk6IFQgJiBTeXN0ZW1TY29wZSB7XG4gIGNvbnN0IGhhbmRsZXI6IFByb3h5SGFuZGxlcjxUPiA9IHtcbiAgICBnZXQodGFyZ2V0OiBULCBuYW1lOiBzdHJpbmcsIHJlY2VpdmVyOiBhbnkpIHtcbiAgICAgIGlmIChuYW1lIGluIHRhcmdldClcbiAgICAgICAgcmV0dXJuICh0YXJnZXQgYXMgYW55KVtuYW1lXTtcbiAgICAgIHJldHVybiB0YXJnZXQuZ2V0UHJvcGVydHkobmFtZSk7XG4gICAgfSxcbiAgICBzZXQodGFyZ2V0OiBULCBuYW1lOiBzdHJpbmcsIHZhbHVlOiBhbnkpOiBib29sZWFuIHtcbiAgICAgIHRhcmdldC5zZXRQcm9wZXJ0eShuYW1lLCB2YWx1ZSk7XG4gICAgICByZXR1cm4gdHJ1ZTtcbiAgICB9LFxuICAgIGhhcyh0YXJnZXQ6IFQsIG5hbWU6IHN0cmluZykge1xuICAgICAgcmV0dXJuIG5hbWUgaW4gdGFyZ2V0IHx8IHRhcmdldC5oYXNQcm9wZXJ0eShuYW1lKTtcbiAgICB9LFxuICAgIG93bktleXModGFyZ2V0OiBUKSB7XG4gICAgICByZXR1cm4gdGFyZ2V0LmdldFByb3BlcnR5TmFtZXMoKTtcbiAgICB9LFxuICAgIGRlbGV0ZVByb3BlcnR5KHRhcmdldDogVCwgbmFtZTogc3RyaW5nKSB7XG4gICAgICByZXR1cm4gdGFyZ2V0LmRlbGV0ZVByb3BlcnR5KG5hbWUpO1xuICAgIH0sXG4gICAgZ2V0T3duUHJvcGVydHlEZXNjcmlwdG9yKHRhcmdldDogVCwgbmFtZTogc3RyaW5nKTogUHJvcGVydHlEZXNjcmlwdG9yIHwgdW5kZWZpbmVkIHtcbiAgICAgIGlmICh0YXJnZXQuaGFzUHJvcGVydHkobmFtZSkpIHtcbiAgICAgICAgY29uc3QgdmFsdWUgPSB0YXJnZXQuZ2V0UHJvcGVydHkobmFtZSk7XG4gICAgICAgIHJldHVybiB7IHZhbHVlLCB3cml0YWJsZTogdHJ1ZSwgZW51bWVyYWJsZTogdHJ1ZSwgY29uZmlndXJhYmxlOiB0cnVlIH07XG4gICAgICB9XG4gICAgICByZXR1cm4gdW5kZWZpbmVkO1xuICAgIH0sXG4gIH07XG4gIHJldHVybiBuZXcgUHJveHkoY3R4LCBoYW5kbGVyKSBhcyBUICYgU3lzdGVtU2NvcGU7XG59XG5cbmV4cG9ydCBhc3luYyBmdW5jdGlvbiBwZXJmb3JtQ29udGV4dChtazogSUdlbmVyYWxDb250ZXh0ICYgU3lzdGVtU2NvcGUpIHtcbiAgY29uc3Qgc2NyaXB0VXJsID0gbWsuU0NSSVBUX0ZJTEUudG9KU09OKCk7XG4gIGNvbnN0IG1vZHVsZSA9IGF3YWl0IGltcG9ydE1vZHVsZShzY3JpcHRVcmwpO1xuICBpZiAoIW1vZHVsZS5kZWZhdWx0KVxuICAgIHRocm93IG5ldyBFcnJvcihgU2NyaXB0ICR7c2NyaXB0VXJsfSBoYXMgbm90IGNvbnRhaW4gYSBkZWZhdWx0IGZ1bmN0aW9uYCk7XG5cbiAgY29uc3QgcmVzdWx0ID0gbW9kdWxlLmRlZmF1bHQobWspO1xuICBpZiAocmVzdWx0IGluc3RhbmNlb2YgUHJvbWlzZSlcbiAgICBhd2FpdCByZXN1bHQ7XG59XG5cbmV4cG9ydCBmdW5jdGlvbiBjcmVhdGVWYXJpYWJsZU1hcEZvckRpcmVjdG9yeSh2YXJpYWJsZU1hcDogVmFyaWFibGVNYXAsIHNvdXJjZURpcjogYW55LCBiaW5hcnlEaXI/OiBhbnkpOiBWYXJpYWJsZU1hcCB7XG4gIGlmIChiaW5hcnlEaXIgPT09IHVuZGVmaW5lZCkge1xuICAgIGlmICghQWJzb2x1dGVQYXRoLmlzQWJzb2x1dGUoc291cmNlRGlyKSlcbiAgICAgIGJpbmFyeURpciA9IHNvdXJjZURpcjtcbiAgICBlbHNlIHtcbiAgICAgIGNvbnN0IGJpbmFyeURpcjEgPSBTY29wZUhlbHBlci5nZXQodmFyaWFibGVNYXAsIFwiUFJPSkVDVF9CSU5BUllfRElSXCIpLnJlbGF0aXZlKHNvdXJjZURpcik7XG4gICAgICBjb25zdCBiaW5hcnlEaXIyID0gU2NvcGVIZWxwZXIuZ2V0KHZhcmlhYmxlTWFwLCBcIlBST0pFQ1RfU09VUkNFX0RJUlwiKS5yZWxhdGl2ZShzb3VyY2VEaXIpO1xuICAgICAgYmluYXJ5RGlyID0gKGJpbmFyeURpcjEubGVuZ3RoID4gYmluYXJ5RGlyMi5sZW5ndGgpID8gYmluYXJ5RGlyMiA6IGJpbmFyeURpcjE7XG4gICAgfVxuICB9XG5cbiAgY29uc3QgU09VUkNFX0RJUiA9IFNjb3BlSGVscGVyLmdldCh2YXJpYWJsZU1hcCwgXCJTT1VSQ0VfRElSXCIpLnJlc29sdmUoc291cmNlRGlyKTtcbiAgY29uc3QgQklOQVJZX0RJUiA9IFNjb3BlSGVscGVyLmdldCh2YXJpYWJsZU1hcCwgXCJCSU5BUllfRElSXCIpLnJlc29sdmUoYmluYXJ5RGlyKTtcblxuICBjb25zdCBuZXdWYXJpYWJsZU1hcCA9IFNjb3BlSGVscGVyLmNsb25lVmFyaWFibGVNYXAodmFyaWFibGVNYXApO1xuXG4gIFNjb3BlSGVscGVyLnNldChuZXdWYXJpYWJsZU1hcCwgXCJTT1VSQ0VfRElSXCIsIFNPVVJDRV9ESVIpO1xuICBTY29wZUhlbHBlci5zZXQobmV3VmFyaWFibGVNYXAsIFwiQklOQVJZX0RJUlwiLCBCSU5BUllfRElSKTtcbiAgU2NvcGVIZWxwZXIucmVzZXQobmV3VmFyaWFibGVNYXAsIFwiU0NSSVBUX0RJUlwiKTtcbiAgU2NvcGVIZWxwZXIucmVzZXQobmV3VmFyaWFibGVNYXAsIFwiU0NSSVBUX0ZJTEVcIik7XG5cbiAgcmV0dXJuIG5ld1ZhcmlhYmxlTWFwO1xufVxuIiwiLypcbiAqIE1JVCBMaWNlbnNlXG4gKlxuICogQ29weXJpZ2h0IChjKSAyMDI1ICBZdXJpaSBZYWt1YmluICh5dXJpaS55YWt1YmluQGdtYWlsLmNvbSlcbiAqXG4gKiBQZXJtaXNzaW9uIGlzIGdyYW50ZWQgdG8gdXNlLCBjb3B5LCBtb2RpZnksIGFuZCBkaXN0cmlidXRlIHRoaXMgc29mdHdhcmVcbiAqIHVuZGVyIHRoZSBNSVQgTGljZW5zZS4gU2VlIExJQ0VOU0UgZmlsZSBmb3IgZGV0YWlscy5cbiAqL1xuXG5pbXBvcnQgZnMgZnJvbSBcIm5vZGU6ZnNcIjtcblxuaW1wb3J0IHsgZ2VuZXJhdGVkU2NyaXB0TmFtZUNvbW1lbnQgfSBmcm9tIFwiQC9jeHhcIjtcblxuZXhwb3J0IGRlZmF1bHQgYXN5bmMgZnVuY3Rpb24obWs6IGFueSkge1xuICBjb25zdCBsaW5lcyA9IFtdO1xuXG4gIGxpbmVzLnB1c2goZ2VuZXJhdGVkU2NyaXB0TmFtZUNvbW1lbnQoaW1wb3J0Lm1ldGEuZmlsZW5hbWUpKTtcbiAgbGluZXMucHVzaChcIlwiKTtcblxuICBmb3IgKGNvbnN0IFtuYW1lLCBlbnRyeV0gb2YgT2JqZWN0LmVudHJpZXMobWsuU0NSSVBUX0lOUFVUKSBhcyBhbnkpIHtcbiAgICBpZiAoZW50cnkuZGVzY3JpcHRpb24pIHtcbiAgICAgIGxpbmVzLnB1c2goYC8qICR7ZW50cnkuZGVzY3JpcHRpb259ICovYCk7XG4gICAgfVxuICAgIGlmICh0eXBlb2YgZW50cnkudmFsdWUgPT09IFwiYm9vbGVhblwiKSB7XG4gICAgICBsaW5lcy5wdXNoKGAjZGVmaW5lICR7bmFtZX0gJHtlbnRyeS52YWx1ZSA/IDEgOiAwfWApO1xuICAgIH1cbiAgICBlbHNlIGlmICh0eXBlb2YgZW50cnkudmFsdWUgPT09IFwibnVtYmVyXCIpIHtcbiAgICAgIGxpbmVzLnB1c2goYCNkZWZpbmUgJHtuYW1lfSAke2VudHJ5LnZhbHVlfWApO1xuICAgIH1cbiAgICBlbHNlIGlmICh0eXBlb2YgZW50cnkudmFsdWUgPT09IFwic3RyaW5nXCIpIHtcbiAgICAgIGxpbmVzLnB1c2goYCNkZWZpbmUgJHtuYW1lfSBcIiR7ZW50cnkudmFsdWV9XCJgKTtcbiAgICB9XG4gICAgZWxzZSBpZiAoQXJyYXkuaXNBcnJheShlbnRyeS52YWx1ZSkpIHtcbiAgICAgIGxpbmVzLnB1c2goYCNkZWZpbmUgJHtuYW1lfSBcIiR7ZW50cnkudmFsdWUuam9pbihcIjtcIil9XCJgKTtcbiAgICB9XG4gICAgZWxzZSB7XG4gICAgICB0aHJvdyBuZXcgRXJyb3IoYFwiJHtuYW1lfVwiIGhhcyAke2VudHJ5LnZhbHVlfSB2YWx1ZWApO1xuICAgIH1cbiAgICBsaW5lcy5wdXNoKFwiXCIpO1xuICB9XG5cbiAgYXdhaXQgZnMucHJvbWlzZXMubWtkaXIobWsuU0NSSVBUX09VVFBVVC5kaXJuYW1lKCkudG9TdHJpbmcoKSwgeyByZWN1cnNpdmU6IHRydWUgfSk7XG4gIGF3YWl0IGZzLnByb21pc2VzLndyaXRlRmlsZShtay5TQ1JJUFRfT1VUUFVULnRvU3RyaW5nKCksIGxpbmVzLmpvaW4oXCJcXG5cIiksIFwidXRmLThcIik7XG59XG4iLCIvKlxuICogTUlUIExpY2Vuc2VcbiAqXG4gKiBDb3B5cmlnaHQgKGMpIDIwMjUgIFl1cmlpIFlha3ViaW4gKHl1cmlpLnlha3ViaW5AZ21haWwuY29tKVxuICpcbiAqIFBlcm1pc3Npb24gaXMgZ3JhbnRlZCB0byB1c2UsIGNvcHksIG1vZGlmeSwgYW5kIGRpc3RyaWJ1dGUgdGhpcyBzb2Z0d2FyZVxuICogdW5kZXIgdGhlIE1JVCBMaWNlbnNlLiBTZWUgTElDRU5TRSBmaWxlIGZvciBkZXRhaWxzLlxuICovXG5cbmltcG9ydCBmcyBmcm9tIFwibm9kZTpmc1wiO1xuXG5leHBvcnQgZGVmYXVsdCBhc3luYyBmdW5jdGlvbihtazogYW55KSB7XG4gIGxldCBjb250ZW50ID0gYXdhaXQgZnMucHJvbWlzZXMucmVhZEZpbGUobWsuU0NSSVBUX0lOUFVULnRvU3RyaW5nKCksIFwidXRmLThcIik7XG4gIGNvbnRlbnQgPSBjb250ZW50LnJlcGxhY2UoL0AoW19BLVphLXpdW19BLVphLXowLTldKylAL2csIChtYXRjaCwgdjEpID0+IHtcbiAgICBjb25zdCByZXMgPSBta1t2MV0gfHwgXCJcIjtcbiAgICBpZiAoQXJyYXkuaXNBcnJheShyZXMpKVxuICAgICAgcmV0dXJuIHJlcy5qb2luKFwiXFxuXCIpO1xuICAgIHJldHVybiByZXMudG9TdHJpbmcoKTtcbiAgfSk7XG4gIGNvbnRlbnQgPSBjb250ZW50LnJlcGxhY2UoLyNjbWFrZWRlZmluZSArKFtfQS1aYS16XVtfQS1aYS16MC05XSspICooLiopL2csIChtYXRjaCwgdjEsIHYyKSA9PiB7XG4gICAgcmV0dXJuIG1rW3YxXSA/IGAjZGVmaW5lICR7djF9ICR7djJ9YCA6IGAvKiAjdW5kZWYgJHt2MX0gKi9gO1xuICB9KTtcbiAgYXdhaXQgZnMucHJvbWlzZXMubWtkaXIobWsuU0NSSVBUX09VVFBVVC5kaXJuYW1lKCkudG9TdHJpbmcoKSwgeyByZWN1cnNpdmU6IHRydWUgfSk7XG4gIGF3YWl0IGZzLnByb21pc2VzLndyaXRlRmlsZShtay5TQ1JJUFRfT1VUUFVULnRvU3RyaW5nKCksIGNvbnRlbnQsIFwidXRmLThcIik7XG59XG4iLCIvKlxuICogTUlUIExpY2Vuc2VcbiAqXG4gKiBDb3B5cmlnaHQgKGMpIDIwMjUgIFl1cmlpIFlha3ViaW4gKHl1cmlpLnlha3ViaW5AZ21haWwuY29tKVxuICpcbiAqIFBlcm1pc3Npb24gaXMgZ3JhbnRlZCB0byB1c2UsIGNvcHksIG1vZGlmeSwgYW5kIGRpc3RyaWJ1dGUgdGhpcyBzb2Z0d2FyZVxuICogdW5kZXIgdGhlIE1JVCBMaWNlbnNlLiBTZWUgTElDRU5TRSBmaWxlIGZvciBkZXRhaWxzLlxuICovXG5cbmltcG9ydCBjb25maWd1cmVfZmlsZSBmcm9tIFwiQC9jb3JlL0J1aWxkaW5TY3JpcHRzL2NvbmZpZ3VyZV9maWxlXCI7XG5pbXBvcnQgY19oZWFkZXIgZnJvbSBcIkAvY29yZS9CdWlsZGluU2NyaXB0cy9jX2hlYWRlclwiO1xuXG5leHBvcnQgZGVmYXVsdCB7XG4gIGNvbmZpZ3VyZV9maWxlLFxuICBjX2hlYWRlcixcbn07XG4iLCIvKlxuICogTUlUIExpY2Vuc2VcbiAqXG4gKiBDb3B5cmlnaHQgKGMpIDIwMjUgIFl1cmlpIFlha3ViaW4gKHl1cmlpLnlha3ViaW5AZ21haWwuY29tKVxuICpcbiAqIFBlcm1pc3Npb24gaXMgZ3JhbnRlZCB0byB1c2UsIGNvcHksIG1vZGlmeSwgYW5kIGRpc3RyaWJ1dGUgdGhpcyBzb2Z0d2FyZVxuICogdW5kZXIgdGhlIE1JVCBMaWNlbnNlLiBTZWUgTElDRU5TRSBmaWxlIGZvciBkZXRhaWxzLlxuICovXG5cbmltcG9ydCB7IEFic29sdXRlUGF0aCB9IGZyb20gXCJAL2NvcmUvQWJzb2x1dGVQYXRoXCI7XG5pbXBvcnQgeyBTY29wZUhlbHBlciwgVmFyaWFibGVNYXAgfSBmcm9tIFwiQC9jb3JlL1Njb3BlXCI7XG5cbmNvbnN0IFNDT1BFICAgICAgICA9IFN5bWJvbChcIlNDT1BFXCIpO1xuY29uc3QgTkFNRSAgICAgICAgID0gU3ltYm9sKFwiTkFNRVwiKTtcbmNvbnN0IFNDUklQVCAgICAgICA9IFN5bWJvbChcIlNDUklQVFwiKTtcbmNvbnN0IElOUFVUICAgICAgICA9IFN5bWJvbChcIklOUFVUXCIpO1xuY29uc3QgT1VUUFVUICAgICAgID0gU3ltYm9sKFwiT1VUUFVUXCIpO1xuY29uc3QgV09SS19ESVIgICAgID0gU3ltYm9sKFwiV09SS19ESVJcIik7XG5cbmV4cG9ydCBjbGFzcyBDdXN0b21TY3JpcHQge1xuICBwcml2YXRlIFtTQ09QRV06IFZhcmlhYmxlTWFwO1xuICBwcml2YXRlIFtOQU1FXTogc3RyaW5nO1xuICBwcml2YXRlIFtTQ1JJUFRdOiBBYnNvbHV0ZVBhdGggfCBGdW5jdGlvbjtcbiAgcHJpdmF0ZSBbSU5QVVRdOiBBYnNvbHV0ZVBhdGggfCB1bmRlZmluZWQ7XG4gIHByaXZhdGUgW09VVFBVVF06IEFic29sdXRlUGF0aDtcbiAgcHJpdmF0ZSBbV09SS19ESVJdOiBBYnNvbHV0ZVBhdGg7XG5cbiAgcHJpdmF0ZSBjb25zdHJ1Y3RvcihvcHRpb25zOiBDdXN0b21TY3JpcHQuT3B0aW9ucykge1xuICAgIHRoaXNbU0NPUEVdID0gb3B0aW9ucy52YXJpYWJsZU1hcDtcbiAgICB0aGlzW05BTUVdID0gb3B0aW9ucy5uYW1lIHx8IFwiXCI7XG4gICAgdGhpc1tJTlBVVF0gPSBvcHRpb25zLmlucHV0O1xuICAgIHRoaXNbU0NSSVBUXSA9IG9wdGlvbnMuc2NyaXB0O1xuICAgIHRoaXNbT1VUUFVUXSA9IG9wdGlvbnMub3V0cHV0O1xuICAgIHRoaXNbV09SS19ESVJdID0gb3B0aW9ucy53b3JrRGlyO1xuICB9XG5cbiAgcHVibGljIHN0YXRpYyBjcmVhdGUob3B0aW9uczogQ3VzdG9tU2NyaXB0Lk9wdGlvbnMpOiBDdXN0b21TY3JpcHQge1xuICAgIHJldHVybiBPYmplY3Quc2VhbChuZXcgQ3VzdG9tU2NyaXB0KG9wdGlvbnMpKTtcbiAgfVxuXG4gIHB1YmxpYyBtZXJnZVZhcmlhYmxlcyh2YXJpYWJsZXM6IGFueSkge1xuICAgIFNjb3BlSGVscGVyLm1lcmdlVmFyaWFibGVNYXAodGhpc1tTQ09QRV0sIHZhcmlhYmxlcyk7XG4gIH1cblxuICBwdWJsaWMgZ2V0IE5BTUUoKSB7XG4gICAgcmV0dXJuIHRoaXNbTkFNRV07XG4gIH1cblxuICBwdWJsaWMgZ2V0IFNDUklQVCgpIHtcbiAgICByZXR1cm4gdGhpc1tTQ1JJUFRdO1xuICB9XG5cbiAgcHVibGljIGdldCBJTlBVVCgpOiBBYnNvbHV0ZVBhdGggfCB1bmRlZmluZWQge1xuICAgIHJldHVybiB0aGlzW0lOUFVUXTtcbiAgfVxuXG4gIHB1YmxpYyBnZXQgT1VUUFVUKCk6IEFic29sdXRlUGF0aCB7XG4gICAgcmV0dXJuIHRoaXNbT1VUUFVUXTtcbiAgfVxuXG4gIHB1YmxpYyBnZXQgd29ya0RpcigpOiBBYnNvbHV0ZVBhdGgge1xuICAgIHJldHVybiB0aGlzW1dPUktfRElSXTtcbiAgfVxuXG4gIHB1YmxpYyBnZXQgdmFyaWFibGVNYXAoKSB7XG4gICAgcmV0dXJuIHRoaXNbU0NPUEVdO1xuICB9XG5cbiAgcHVibGljIHRvSlNPTigpOiBvYmplY3Qge1xuICAgIHJldHVybiB7XG4gICAgICB2YXJpYWJsZU1hcDogdGhpc1tTQ09QRV0sXG4gICAgICBOQU1FOiB0aGlzW05BTUVdLFxuICAgICAgU0NSSVBUOiB0aGlzLlNDUklQVCxcbiAgICAgIElOUFVUOiB0aGlzLklOUFVULFxuICAgICAgT1VUUFVUOiB0aGlzLk9VVFBVVCxcbiAgICB9XG4gIH1cbn07XG5cbmV4cG9ydCBuYW1lc3BhY2UgQ3VzdG9tU2NyaXB0IHtcblxuZXhwb3J0IGludGVyZmFjZSBPcHRpb25zIHtcbiAgdmFyaWFibGVNYXA6IFZhcmlhYmxlTWFwLFxuICBuYW1lPzogc3RyaW5nLFxuICBzY3JpcHQ6IEFic29sdXRlUGF0aCB8IEZ1bmN0aW9uLFxuICBpbnB1dD86IEFic29sdXRlUGF0aCxcbiAgb3V0cHV0OiBBYnNvbHV0ZVBhdGgsXG4gIHdvcmtEaXI6IEFic29sdXRlUGF0aCxcbn07XG5cbn0gLy8gbmFtZXNwYWNlIEN1c3RvbVNjcmlwdFxuIiwiLypcbiAqIE1JVCBMaWNlbnNlXG4gKlxuICogQ29weXJpZ2h0IChjKSAyMDI1ICBZdXJpaSBZYWt1YmluICh5dXJpaS55YWt1YmluQGdtYWlsLmNvbSlcbiAqXG4gKiBQZXJtaXNzaW9uIGlzIGdyYW50ZWQgdG8gdXNlLCBjb3B5LCBtb2RpZnksIGFuZCBkaXN0cmlidXRlIHRoaXMgc29mdHdhcmVcbiAqIHVuZGVyIHRoZSBNSVQgTGljZW5zZS4gU2VlIExJQ0VOU0UgZmlsZSBmb3IgZGV0YWlscy5cbiAqL1xuXG5mdW5jdGlvbiBjb252ZXJ0VmFsdWVUb0RlZmluaXRpb24odmFsdWU6IGFueSk6IHN0cmluZyB7XG4gIGlmICh2YWx1ZSA9PT0gdW5kZWZpbmVkKVxuICAgIHRocm93IGBEZWZpbml0aW9uIHVuZGVmaW5lZGA7XG4gIGlmICh0eXBlb2YgdmFsdWUgPT09IFwib2JqZWN0XCIpXG4gICAgcmV0dXJuICdcIicgKyBKU09OLnN0cmluZ2lmeSh2YWx1ZSkgKyAnXCInO1xuICByZXR1cm4gdmFsdWUudG9TdHJpbmcoKTtcbn1cblxuZXhwb3J0IGZ1bmN0aW9uIG5vcm1hbGl6ZURlZmluaXRpb25zKC4uLmRlZmluaXRpb25zOiBhbnlbXSk6IHN0cmluZ1tdIHtcbiAgY29uc3QgcmVzdWx0ID0gW107XG4gIGZvciAoY29uc3QgaXRlciBvZiBkZWZpbml0aW9ucykge1xuICAgIGlmICh0eXBlb2YgaXRlciA9PT0gXCJzdHJpbmdcIilcbiAgICAgIHJlc3VsdC5wdXNoKGl0ZXIpO1xuICAgIGVsc2UgaWYgKCFpdGVyKVxuICAgICAgdGhyb3cgbmV3IEVycm9yKGBEZWZlbml0aW9uICR7aXRlcn0gbm90IHN1cHBvcnRlZGApXG4gICAgZWxzZSBpZiAoQXJyYXkuaXNBcnJheShpdGVyKSkge1xuICAgICAgZm9yIChjb25zdCB2YWwgb2YgaXRlcilcbiAgICAgICAgcmVzdWx0LnB1c2goY29udmVydFZhbHVlVG9EZWZpbml0aW9uKHZhbCkpO1xuICAgIH1cbiAgICBlbHNlIGlmICh0eXBlb2YgaXRlciA9PT0gXCJvYmplY3RcIikge1xuICAgICAgZm9yIChjb25zdCBba2V5LCB2YWxdIG9mIE9iamVjdC5lbnRyaWVzKGl0ZXIpKVxuICAgICAgICByZXN1bHQucHVzaChgJHtrZXl9PSR7Y29udmVydFZhbHVlVG9EZWZpbml0aW9uKHZhbCl9YCk7XG4gICAgfVxuICAgIGVsc2VcbiAgICAgIHRocm93IG5ldyBFcnJvcihgRGVmZW5pdGlvbiAke2l0ZXJ9IG5vdCBzdXBwb3J0ZWRgKVxuICB9XG4gIHJldHVybiByZXN1bHQ7XG59XG4iLCIvKlxuICogTUlUIExpY2Vuc2VcbiAqXG4gKiBDb3B5cmlnaHQgKGMpIDIwMjUgIFl1cmlpIFlha3ViaW4gKHl1cmlpLnlha3ViaW5AZ21haWwuY29tKVxuICpcbiAqIFBlcm1pc3Npb24gaXMgZ3JhbnRlZCB0byB1c2UsIGNvcHksIG1vZGlmeSwgYW5kIGRpc3RyaWJ1dGUgdGhpcyBzb2Z0d2FyZVxuICogdW5kZXIgdGhlIE1JVCBMaWNlbnNlLiBTZWUgTElDRU5TRSBmaWxlIGZvciBkZXRhaWxzLlxuICovXG5cbmltcG9ydCB7IGZpbmRQcm9ncmFtIH0gZnJvbSBcIkAvY29yZS9GaW5kUHJvZ3JhbVwiO1xuaW1wb3J0IHsgU3lzdGVtU2NvcGUgfSBmcm9tIFwiQC9jb3JlL1N5c3RlbVNjb3BlXCI7XG5pbXBvcnQgeyBMb2dnZXIgfSBmcm9tIFwiQC9sb2dnZXJcIjtcblxuY29uc3QgbG9nZ2VyID0gTG9nZ2VyLmNyZWF0ZShpbXBvcnQubWV0YS51cmwpO1xuXG5leHBvcnQgYXN5bmMgZnVuY3Rpb24gZGV0ZXJtaW5lQ29tcGlsZXIoc2NvcGU6IFN5c3RlbVNjb3BlKSB7XG4gIGNvbnN0IGNsYW5nUGF0aCA9IGF3YWl0IGZpbmRQcm9ncmFtKFwiY2xhbmdcIik7XG4gIGlmIChjbGFuZ1BhdGgpIHtcbiAgICBsb2dnZXIuaW5mbyhcIlRoZSBDIGNvbXBpbGVyIGlkZW50aWZpY2F0aW9uIGlzIENsYW5nIGEuYi5jXCIpO1xuICAgIHNjb3BlLkFTTV9DT01QSUxFUiA9IFwiY2xhbmdcIjtcbiAgICBzY29wZS5DX0NPTVBJTEVSID0gXCJjbGFuZ1wiO1xuICAgIHNjb3BlLkNYWF9DT01QSUxFUiA9IFwiY2xhbmcrK1wiO1xuICAgIHNjb3BlLkFSID0gXCJsbHZtLWFyXCI7XG4gICAgc2NvcGUuUkFOTElCID0gXCJsbHZtLXJhbmxpYlwiO1xuICAgIHNjb3BlLkxJTktFUiA9IFwibGxkXCI7XG4gICAgc2NvcGUuTk0gPSBcImxsdm0tbm1cIjtcbiAgICBzY29wZS5PQkpDT1BZID0gXCJsbHZtLW9iamNvcHlcIjtcbiAgICBzY29wZS5PQkpEVU1QID0gXCJsbHZtLW9iamR1bXBcIjtcbiAgICBzY29wZS5TVFJJUCA9IFwibGx2bS1zdHJpcFwiO1xuICAgIHJldHVybjtcbiAgfVxuXG4gIGNvbnN0IGdjY1BhdGggPSBhd2FpdCBmaW5kUHJvZ3JhbShcImdjY1wiKTtcbiAgaWYgKGdjY1BhdGgpIHtcbiAgICBsb2dnZXIuaW5mbyhcIlRoZSBDIGNvbXBpbGVyIGlkZW50aWZpY2F0aW9uIGlzIEdOVSBhLmIuY1wiKTtcbiAgICBzY29wZS5BU01fQ09NUElMRVIgPSBcImdjY1wiO1xuICAgIHNjb3BlLkNfQ09NUElMRVIgPSBcImdjY1wiO1xuICAgIHNjb3BlLkNYWF9DT01QSUxFUiA9IFwiZysrXCI7XG4gICAgc2NvcGUuQVIgPSBcImFyXCI7XG4gICAgc2NvcGUuUkFOTElCID0gXCJyYW5saWJcIjtcbiAgICBzY29wZS5MSU5LRVIgPSBcImxkXCI7XG4gICAgc2NvcGUuTk0gPSBcIm5tXCI7XG4gICAgc2NvcGUuT0JKQ09QWSA9IFwib2JqY29weVwiO1xuICAgIHNjb3BlLk9CSkRVTVAgPSBcIm9iamR1bXBcIjtcbiAgICBzY29wZS5TVFJJUCA9IFwic3RyaXBcIjtcbiAgICByZXR1cm47XG4gIH1cblxuICB0aHJvdyBgQ2FuIG5vdCBkZXRlcm1pbmUgY29tcGlsZXJgO1xufVxuIiwiLypcbiAqIE1JVCBMaWNlbnNlXG4gKlxuICogQ29weXJpZ2h0IChjKSAyMDI1ICBZdXJpaSBZYWt1YmluICh5dXJpaS55YWt1YmluQGdtYWlsLmNvbSlcbiAqXG4gKiBQZXJtaXNzaW9uIGlzIGdyYW50ZWQgdG8gdXNlLCBjb3B5LCBtb2RpZnksIGFuZCBkaXN0cmlidXRlIHRoaXMgc29mdHdhcmVcbiAqIHVuZGVyIHRoZSBNSVQgTGljZW5zZS4gU2VlIExJQ0VOU0UgZmlsZSBmb3IgZGV0YWlscy5cbiAqL1xuXG5pbXBvcnQgeyBQYXRoIH0gZnJvbSBcIkAvdXRpbHMvUGF0aFwiO1xuaW1wb3J0IHsgSG9zdCB9IGZyb20gXCJAL3V0aWxzL0hvc3RcIjtcbmltcG9ydCB7IGZpbGVFeGlzdHMsIGZpbGVFeGlzdHNTeW5jIH0gZnJvbSBcIkAvdXRpbHMvRmlsZVN5c3RlbVwiO1xuXG5mdW5jdGlvbiBwb3NzaWJsZVByb2dyYW1MaXN0KG5hbWU6IHN0cmluZykge1xuICBpZiAoSG9zdC5leGVjdXRhYmxlU3VmZml4KVxuICAgIG5hbWUgKz0gSG9zdC5leGVjdXRhYmxlU3VmZml4O1xuXG4gIGNvbnN0IHJlc3VsdCA9IFtdO1xuICBjb25zdCBwYXRocyA9IChwcm9jZXNzLmVudi5QQVRIIHx8IFwiXCIpLnNwbGl0KFBhdGguZGVsaW1pdGVyKTtcbiAgZm9yIChjb25zdCBpdGVyIG9mIHBhdGhzKSB7XG4gICAgY29uc3QgZmlsZW5hbWUgPSBQYXRoLnJlc29sdmUoaXRlciwgbmFtZSk7XG4gICAgcmVzdWx0LnB1c2goZmlsZW5hbWUpO1xuICB9XG5cbiAgcmV0dXJuIHJlc3VsdDtcbn1cblxuZXhwb3J0IGFzeW5jIGZ1bmN0aW9uIGZpbmRQcm9ncmFtKG5hbWU6IHN0cmluZyk6IFByb21pc2U8c3RyaW5nIHwgdW5kZWZpbmVkPiB7XG4gIGZvciAoY29uc3QgaXRlciBvZiBwb3NzaWJsZVByb2dyYW1MaXN0KG5hbWUpKSB7XG4gICAgaWYgKGF3YWl0IGZpbGVFeGlzdHMoaXRlcikpXG4gICAgICByZXR1cm4gaXRlcjtcbiAgfVxuICByZXR1cm4gdW5kZWZpbmVkO1xufVxuXG5leHBvcnQgZnVuY3Rpb24gZmluZFByb2dyYW1TeW5jKG5hbWU6IHN0cmluZyk6IHN0cmluZyB8IHVuZGVmaW5lZCB7XG4gIGZvciAoY29uc3QgaXRlciBvZiBwb3NzaWJsZVByb2dyYW1MaXN0KG5hbWUpKSB7XG4gICAgaWYgKGZpbGVFeGlzdHNTeW5jKGl0ZXIpKVxuICAgICAgcmV0dXJuIGl0ZXI7XG4gIH1cbiAgcmV0dXJuIHVuZGVmaW5lZDtcbn1cbiIsIi8qXG4gKiBNSVQgTGljZW5zZVxuICpcbiAqIENvcHlyaWdodCAoYykgMjAyNSAgWXVyaWkgWWFrdWJpbiAoeXVyaWkueWFrdWJpbkBnbWFpbC5jb20pXG4gKlxuICogUGVybWlzc2lvbiBpcyBncmFudGVkIHRvIHVzZSwgY29weSwgbW9kaWZ5LCBhbmQgZGlzdHJpYnV0ZSB0aGlzIHNvZnR3YXJlXG4gKiB1bmRlciB0aGUgTUlUIExpY2Vuc2UuIFNlZSBMSUNFTlNFIGZpbGUgZm9yIGRldGFpbHMuXG4gKi9cblxuaW1wb3J0IHsgTG9nZ2VyIH0gZnJvbSBcIkAvbG9nZ2VyXCI7XG5cbmNvbnN0IGxvZ2dlciA9IExvZ2dlci5jcmVhdGUoaW1wb3J0Lm1ldGEudXJsKTtcblxuY29uc3QgRU5UUklFUyA9IFN5bWJvbChcIkVOVFJJRVNcIik7XG5cbmV4cG9ydCBpbnRlcmZhY2UgR29hbFdvcmtlciB7XG4gIGRvV29yaygpOiBQcm9taXNlPHZvaWQ+O1xuICB1cGRhdGVQcm9ncmVzcyhldmVudDogeyBsb2FkZWQ6IG51bWJlciwgdG90YWw6IG51bWJlciB9KTogdm9pZDtcblxuICBnZXQgbmFtZSgpOiBzdHJpbmcgfCB1bmRlZmluZWQ7XG4gIGdldCBvdXRwdXQoKTogc3RyaW5nIHwgdW5kZWZpbmVkO1xuICBnZXQgZGVwZW5kcygpOiBzdHJpbmdbXTtcbn07XG5cbmV4cG9ydCBjbGFzcyBHb2FsQ29sbGVjdGlvbiB7XG4gIHByaXZhdGUgW0VOVFJJRVNdOiBBcnJheTxHb2FsV29ya2VyPjtcblxuICBwcml2YXRlIGNvbnN0cnVjdG9yKCkge1xuICAgIHRoaXNbRU5UUklFU10gPSBuZXcgQXJyYXk8R29hbFdvcmtlcj47XG4gIH1cblxuICBwdWJsaWMgZ2V0IEVOVFJJRVMoKSB7XG4gICAgcmV0dXJuIHRoaXNbRU5UUklFU107XG4gIH1cblxuICBwdWJsaWMgc3RhdGljIGNyZWF0ZSgpIHtcbiAgICByZXR1cm4gT2JqZWN0LnNlYWwobmV3IEdvYWxDb2xsZWN0aW9uKTtcbiAgfVxuXG4gIHB1YmxpYyBhZGQod29ya2VyOiBHb2FsV29ya2VyKSB7XG4gICAgaWYgKHdvcmtlci5uYW1lICYmIHRoaXNbRU5UUklFU10uZmluZCgoaSkgPT4gaS5uYW1lID09PSB3b3JrZXIubmFtZSkpXG4gICAgICB0aHJvdyBuZXcgRXJyb3IoYE5tYWUgXCIke3dvcmtlci5uYW1lfVwiIGV4aXN0c2ApO1xuICAgIGlmICh3b3JrZXIub3V0cHV0ICYmIHRoaXNbRU5UUklFU10uZmluZCgoaSkgPT4gaS5vdXRwdXQgPT09IHdvcmtlci5vdXRwdXQpKVxuICAgICAgdGhyb3cgbmV3IEVycm9yKGBPdXRwdXQgXCIke3dvcmtlci5vdXRwdXR9XCIgZXhpc3RzYCk7XG4gICAgdGhpc1tFTlRSSUVTXS5wdXNoKHdvcmtlcik7XG4gIH1cblxuICBwdWJsaWMgZ2V0VGFyZ2V0KG5hbWU6IHN0cmluZyk6IEdvYWxXb3JrZXIgfCB1bmRlZmluZWQge1xuICAgIGlmICghbmFtZSlcbiAgICAgIHJldHVybiB1bmRlZmluZWQ7XG4gICAgcmV0dXJuIHRoaXNbRU5UUklFU10uZmluZCgoaSkgPT4gaS5uYW1lID09PSBuYW1lKTtcbiAgfVxuXG4gIHByaXZhdGUgYWRkVGFyZ2V0TGlzdEltcGwobmFtZTogc3RyaW5nLCByZXN1bHQ6IEFycmF5PEdvYWxXb3JrZXI+KSB7XG4gICAgaWYgKHJlc3VsdC5maW5kKGkgPT4gaS5uYW1lID09PSBuYW1lIHx8IGkub3V0cHV0ID09PSBuYW1lKSkge1xuICAgICAgcmV0dXJuO1xuICAgIH1cblxuICAgIGNvbnN0IGdvYWwgPSB0aGlzW0VOVFJJRVNdLmZpbmQoaSA9PiBpLm5hbWUgPT09IG5hbWUgfHwgKGkub3V0cHV0ID09PSBuYW1lKSk7XG4gICAgaWYgKCFnb2FsKSB7XG4gICAgICByZXR1cm47XG4gICAgfVxuXG4gICAgZm9yIChjb25zdCBpdGVyIG9mIGdvYWwuZGVwZW5kcykge1xuICAgICAgdGhpcy5hZGRUYXJnZXRMaXN0SW1wbChpdGVyLnRvU3RyaW5nKCksIHJlc3VsdCk7XG4gICAgfVxuXG4gICAgcmVzdWx0LnB1c2goZ29hbCk7XG4gIH1cbiAgXG4gIHB1YmxpYyBnZXRUYXJnZXRMaXN0KG5hbWU6c3RyaW5nKSB7XG4gICAgY29uc3QgcmVzdWx0ID0gbmV3IEFycmF5PEdvYWxXb3JrZXI+O1xuICAgIHRoaXMuYWRkVGFyZ2V0TGlzdEltcGwobmFtZSwgcmVzdWx0KTtcbiAgICByZXR1cm4gcmVzdWx0O1xuICB9XG4gIFxuICBwdWJsaWMgdG9KU09OKCkge1xuICAgIHJldHVybiB0aGlzW0VOVFJJRVNdO1xuICB9XG59O1xuIiwiLypcbiAqIE1JVCBMaWNlbnNlXG4gKlxuICogQ29weXJpZ2h0IChjKSAyMDI1ICBZdXJpaSBZYWt1YmluICh5dXJpaS55YWt1YmluQGdtYWlsLmNvbSlcbiAqXG4gKiBQZXJtaXNzaW9uIGlzIGdyYW50ZWQgdG8gdXNlLCBjb3B5LCBtb2RpZnksIGFuZCBkaXN0cmlidXRlIHRoaXMgc29mdHdhcmVcbiAqIHVuZGVyIHRoZSBNSVQgTGljZW5zZS4gU2VlIExJQ0VOU0UgZmlsZSBmb3IgZGV0YWlscy5cbiAqL1xuXG5pbXBvcnQgeyBQb3N0VGFyZ2V0IH0gZnJvbSBcIkAvY29yZS9UYXJnZXRcIjtcbmltcG9ydCB7IEFic29sdXRlUGF0aCB9IGZyb20gXCJAL2NvcmUvQWJzb2x1dGVQYXRoXCI7XG5pbXBvcnQgeyBTaW1wbGVPYmplY3QgfSBmcm9tIFwiQC9jb3JlL1NpbXBsZU9iamVjdFwiO1xuaW1wb3J0IHsgU3lzdGVtU2NvcGUgfSBmcm9tIFwiQC9jb3JlL1N5c3RlbVNjb3BlXCI7XG5cbmNvbnN0IFZBTFVFICAgICAgID0gU3ltYm9sKFwiVkFMVUVcIik7XG5jb25zdCBERVNUSU5BVElPTiA9IFN5bWJvbChcIkRFU1RJTkFUSU9OXCIpO1xuY29uc3QgQkFTRV9ESVIgICAgPSBTeW1ib2woXCJCQVNFX0RJUlwiKTtcblxuZXhwb3J0IGNsYXNzIEluc3RhbGxFbnRpdHkge1xuICBwcml2YXRlIFtWQUxVRV06IEFic29sdXRlUGF0aCB8IFBvc3RUYXJnZXQ7XG4gIHByaXZhdGUgW0RFU1RJTkFUSU9OXTogQWJzb2x1dGVQYXRoO1xuICBwcml2YXRlIFtCQVNFX0RJUl06IEFic29sdXRlUGF0aCB8IG51bGw7XG5cbiAgcHJpdmF0ZSBjb25zdHJ1Y3RvcihzY29wZTogU3lzdGVtU2NvcGUsIHZhbHVlOiBzdHJpbmcgfCBBYnNvbHV0ZVBhdGggfCBQb3N0VGFyZ2V0LCBwYXJhbXM6IHN0cmluZyB8IGFueSkge1xuICAgIGxldCBkZXN0aW5hdGlvbjogc3RyaW5nIHwgQWJzb2x1dGVQYXRoIHwgdW5kZWZpbmVkO1xuICAgIGxldCBiYXNlRGlyO1xuICAgIGlmICh0eXBlb2YgcGFyYW1zID09PSBcInN0cmluZ1wiKVxuICAgICAgZGVzdGluYXRpb24gPSBwYXJhbXM7XG4gICAgZWxzZSBpZiAocGFyYW1zKSB7XG4gICAgICBkZXN0aW5hdGlvbiA9IHBhcmFtcy5kZXN0aW5hdGlvbjtcbiAgICAgIGJhc2VEaXIgPSBwYXJhbXMuYmFzZURpcjtcbiAgICB9XG5cbiAgICBpZiAoIWRlc3RpbmF0aW9uKVxuICAgICAgdGhyb3cgbmV3IEVycm9yKGBQYXJhbWV0ZXIgZGVzdGluYXRpb24gaXMgbm90IHNwZWNpZmllZGApO1xuICBcbiAgICBpZiAoYmFzZURpcilcbiAgICAgIGJhc2VEaXIgPSBzY29wZS5TT1VSQ0VfRElSLnJlc29sdmUoYmFzZURpcik7XG4gIFxuICAgIGlmICh0eXBlb2YgdmFsdWUgPT09IFwic3RyaW5nXCIgfHwgdmFsdWUgaW5zdGFuY2VvZiBBYnNvbHV0ZVBhdGgpIHtcbiAgICAgIHZhbHVlID0gc2NvcGUuU09VUkNFX0RJUi5yZXNvbHZlKHZhbHVlLnRvU3RyaW5nKCkpIGFzIEFic29sdXRlUGF0aDtcbiAgICAgIHZhbHVlID0gQWJzb2x1dGVQYXRoLmNyZWF0ZSh2YWx1ZSk7XG4gICAgICBiYXNlRGlyID0gYmFzZURpciB8fCB2YWx1ZS5kaXJuYW1lKCk7XG4gICAgfVxuICAgIGVsc2UgaWYgKCEodmFsdWUgaW5zdGFuY2VvZiBQb3N0VGFyZ2V0KSkge1xuICAgICAgdGhyb3cgbmV3IEVycm9yKGBOb3Qgc3VwcG9ydGV0IHZhbHVlIG9mICR7dmFsdWV9YCk7XG4gICAgfVxuICBcbiAgICB0aGlzW1ZBTFVFXSA9IHZhbHVlO1xuICAgIHRoaXNbREVTVElOQVRJT05dID0gQWJzb2x1dGVQYXRoLmNyZWF0ZShzY29wZS5JTlNUQUxMX1BSRUZJWC5yZXNvbHZlKGRlc3RpbmF0aW9uLnRvU3RyaW5nKCkpLnRvU3RyaW5nKCkpO1xuICAgIHRoaXNbQkFTRV9ESVJdID0gYmFzZURpciA/IEFic29sdXRlUGF0aC5jcmVhdGUoYmFzZURpci50b1N0cmluZygpKSA6IG51bGw7XG4gIH1cbiAgXG4gIHB1YmxpYyBzdGF0aWMgY3JlYXRlKHNjb3BlOiBhbnksIHZhbHVlOiBzdHJpbmcgfCBBYnNvbHV0ZVBhdGggfCBQb3N0VGFyZ2V0LCBwYXJhbXM6IHN0cmluZyB8IGFueSkge1xuICAgIHJldHVybiBPYmplY3Quc2VhbChuZXcgSW5zdGFsbEVudGl0eShzY29wZSwgdmFsdWUsIHBhcmFtcykpO1xuICB9XG5cbiAgcHVibGljIGdldCBWQUxVRSAoKSB7XG4gICAgcmV0dXJuIHRoaXNbVkFMVUVdO1xuICB9XG5cbiAgcHVibGljIGdldCBERVNUSU5BVElPTiAoKSB7XG4gICAgcmV0dXJuIHRoaXNbREVTVElOQVRJT05dO1xuICB9XG5cbiAgcHVibGljIGdldCBCQVNFX0RJUiAoKSB7XG4gICAgcmV0dXJuIHRoaXNbQkFTRV9ESVJdO1xuICB9XG5cbiAgcHVibGljIHRvSlNPTigpOiBTaW1wbGVPYmplY3Qge1xuICAgIHJldHVybiB7XG4gICAgICB0eXBlOiBJbnN0YWxsRW50aXR5Lm5hbWUsXG4gICAgICBWQUxVRTogdGhpcy5WQUxVRSxcbiAgICAgIERFU1RJTkFUSU9OOiB0aGlzLkRFU1RJTkFUSU9OLFxuICAgICAgQkFTRV9ESVI6IHRoaXMuQkFTRV9ESVIsXG4gICAgfTtcbiAgfVxufTtcbiIsIi8qXG4gKiBNSVQgTGljZW5zZVxuICpcbiAqIENvcHlyaWdodCAoYykgMjAyNSAgWXVyaWkgWWFrdWJpbiAoeXVyaWkueWFrdWJpbkBnbWFpbC5jb20pXG4gKlxuICogUGVybWlzc2lvbiBpcyBncmFudGVkIHRvIHVzZSwgY29weSwgbW9kaWZ5LCBhbmQgZGlzdHJpYnV0ZSB0aGlzIHNvZnR3YXJlXG4gKiB1bmRlciB0aGUgTUlUIExpY2Vuc2UuIFNlZSBMSUNFTlNFIGZpbGUgZm9yIGRldGFpbHMuXG4gKi9cblxuaW1wb3J0IHsgU2NvcGVIZWxwZXIgfSBmcm9tIFwiQC9jb3JlL1Njb3BlXCI7XG5cbmNvbnN0IE5BTUUgICAgICA9IFN5bWJvbChcIk5BTUVcIik7XG5jb25zdCBWQVJJQUJMRVMgPSBTeW1ib2woXCJWQVJJQUJMRVNcIik7XG5cbmV4cG9ydCBjbGFzcyBJbnRlcmZhY2VTY3JpcHQge1xuICBwcml2YXRlIFtOQU1FXTogc3RyaW5nO1xuICBwcml2YXRlIFtWQVJJQUJMRVNdOiBhbnk7XG5cbiAgcHJpdmF0ZSBjb25zdHJ1Y3RvcihuYW1lOiBzdHJpbmcpIHtcbiAgICB0aGlzW05BTUVdID0gbmFtZTtcbiAgICB0aGlzW1ZBUklBQkxFU10gPSB7fTtcbiAgfVxuXG4gIHB1YmxpYyBnZXQgTkFNRSgpIHtcbiAgICByZXR1cm4gdGhpc1tOQU1FXTtcbiAgfVxuXG4gIHB1YmxpYyBnZXQgdmFyaWFibGVzKCkge1xuICAgIHJldHVybiB0aGlzW1ZBUklBQkxFU107XG4gIH1cblxuICBwdWJsaWMgbWVyZ2VWYXJpYWJsZXModmFyaWFibGVzOiBhbnkpIHtcbiAgICBTY29wZUhlbHBlci5tZXJnZVZhcmlhYmxlcyh0aGlzW1ZBUklBQkxFU10sIHZhcmlhYmxlcyk7XG4gIH1cblxuICBwdWJsaWMgdG9KU09OKCk6IG9iamVjdCB7XG4gICAgcmV0dXJuIHtcbiAgICAgIG5hbWU6IHRoaXNbTkFNRV0sXG4gICAgICB2YXJpYWJsZU1hcDogdGhpc1tWQVJJQUJMRVNdLFxuICAgIH07XG4gIH1cbiAgXG4gIHB1YmxpYyB0b1N0cmluZygpOiBzdHJpbmcge1xuICAgIHJldHVybiB0aGlzW05BTUVdO1xuICB9XG5cbiAgcHVibGljIHN0YXRpYyBjcmVhdGUobmFtZTogc3RyaW5nKSB7XG4gICAgcmV0dXJuIE9iamVjdC5zZWFsKG5ldyBJbnRlcmZhY2VTY3JpcHQobmFtZSkpO1xuICB9XG5cbiAgcHVibGljIHN0YXRpYyBlbnN1cmVJbnN0YW5jZSh2YWx1ZTogYW55KSB7XG4gICAgaWYgKHZhbHVlIGluc3RhbmNlb2YgSW50ZXJmYWNlU2NyaXB0KVxuICAgICAgcmV0dXJuIHZhbHVlO1xuICAgIHRocm93IG5ldyBFcnJvcihgVGhlICcke3ZhbHVlfScgaXMgbm90IGEgSW50ZXJmYWNlU2NyaXB0YCk7XG4gIH1cbn07XG4iLCIvKlxuICogTUlUIExpY2Vuc2VcbiAqXG4gKiBDb3B5cmlnaHQgKGMpIDIwMjUgIFl1cmlpIFlha3ViaW4gKHl1cmlpLnlha3ViaW5AZ21haWwuY29tKVxuICpcbiAqIFBlcm1pc3Npb24gaXMgZ3JhbnRlZCB0byB1c2UsIGNvcHksIG1vZGlmeSwgYW5kIGRpc3RyaWJ1dGUgdGhpcyBzb2Z0d2FyZVxuICogdW5kZXIgdGhlIE1JVCBMaWNlbnNlLiBTZWUgTElDRU5TRSBmaWxlIGZvciBkZXRhaWxzLlxuICovXG5cbmltcG9ydCB7IElNYWtlQ29udGV4dCwgSW50ZXJmYWNlVGFyZ2V0IH0gZnJvbSBcIkAvY29yZS9NYWtlSW50ZXJmYWNlc1wiO1xuaW1wb3J0IHsgTWFrZUNvbnRleHQgfSBmcm9tIFwiQC9jb3JlL0Jhc2VDb250ZXh0XCI7XG5pbXBvcnQgeyBmaWxlRXhpc3RzU3luYyB9IGZyb20gXCJAL3V0aWxzL0ZpbGVTeXN0ZW1cIjtcbmltcG9ydCB7IEludGVyZmFjZVNjcmlwdCB9IGZyb20gXCJAL2NvcmUvSW50ZXJmYWNlU2NyaXB0XCI7XG5pbXBvcnQgeyBJbnN0YWxsRW50aXR5IH0gZnJvbSBcIkAvY29yZS9JbnN0YWxsRW50aXR5XCI7XG5pbXBvcnQgeyBDdXN0b21TY3JpcHQgfSBmcm9tIFwiQC9jb3JlL0N1c3RvbVNjcmlwdFwiO1xuaW1wb3J0IHsgUHJvamVjdENvbnRleHQgfSBmcm9tIFwiQC9jb3JlL1Byb2plY3RDb250ZXh0XCI7XG5pbXBvcnQgeyBTY29wZUhlbHBlciwgVmFyaWFudE1hcCwgVmFyaWFibGVNYXAgfSBmcm9tIFwiQC9jb3JlL1Njb3BlXCI7XG5pbXBvcnQgeyByZXF1aXJlU3luYyB9IGZyb20gXCJAL3V0aWxzL01vZHVsZVwiO1xuaW1wb3J0IHsgQ1VTVE9NX1ZBUklBQkxFX0dST1VQIH0gZnJvbSBcIkAvQ29uc3RhbnRzXCI7XG5pbXBvcnQgeyBBYnNvbHV0ZVBhdGggfSBmcm9tIFwiQC9jb3JlL0Fic29sdXRlUGF0aFwiO1xuaW1wb3J0IHsgTG9nZ2VyIH0gZnJvbSBcIkAvbG9nZ2VyXCI7XG5cbmNvbnN0IGxvZ2dlciA9IExvZ2dlci5jcmVhdGUoaW1wb3J0Lm1ldGEudXJsKTtcblxuZXhwb3J0IGNsYXNzIExvY2FsTWFrZUNvbnRleHQgZXh0ZW5kcyBNYWtlQ29udGV4dCBpbXBsZW1lbnRzIElNYWtlQ29udGV4dCB7XG4gIHByaXZhdGUgX3Byb2plY3Q6IFByb2plY3RDb250ZXh0O1xuXG4gIHB1YmxpYyBjb25zdHJ1Y3RvcihzY29wZTogVmFyaWFibGVNYXAsIHByb2plY3Q6IFByb2plY3RDb250ZXh0KSB7XG4gICAgc3VwZXIoc2NvcGUpO1xuICAgIHRoaXMuX3Byb2plY3QgPSBwcm9qZWN0O1xuICB9XG5cbiAgcHVibGljIGV4ZWN1dGVTY3JpcHQoc2NyaXB0OiBhbnksIHBhcmFtczogYW55KSB7XG4gICAgdGhpcy5fcHJvamVjdC5leGVjdXRlU2NyaXB0U3luYyh0aGlzLl9zY29wZSwgc2NyaXB0LCBwYXJhbXMpO1xuICB9XG5cbiAgcHVibGljIGFkZENhY2hlVmFyaWFibGVzKHBhcmFtczogc3RyaW5nIHwgVmFyaWFudE1hcCk6IHZvaWQge1xuICAgIGxldCB2YXJpYWJsZXMgPSBwYXJhbXM7XG4gICAgaWYgKHR5cGVvZiBwYXJhbXMgPT09IFwic3RyaW5nXCIpIHtcbiAgICAgIGNvbnN0IGZpbGVuYW1lID0gU2NvcGVIZWxwZXIuZ2V0KHRoaXMuX3Njb3BlLCBcIlNPVVJDRV9ESVJcIikucmVzb2x2ZShwYXJhbXMpLnRvU3RyaW5nKCk7XG4gICAgICBpZiAoIWZpbGVFeGlzdHNTeW5jKGZpbGVuYW1lKSlcbiAgICAgICAgcmV0dXJuO1xuICAgICAgdmFyaWFibGVzID0gcmVxdWlyZVN5bmMoZmlsZW5hbWUpO1xuICAgIH1cblxuICAgIFNjb3BlSGVscGVyLmRlZmluZVZhcmlhYmxlc0luVmFyaWFibGVNYXAodGhpcy5fc2NvcGUsIENVU1RPTV9WQVJJQUJMRV9HUk9VUCwgdmFyaWFibGVzKTtcbiAgfVxuXG4gIHB1YmxpYyBhZGRTdWJkaXJlY3Rvcnkoc291cmNlRGlyOiBzdHJpbmcgfCBBYnNvbHV0ZVBhdGgsIGJpbmFyeURpcj86IHN0cmluZyB8IEFic29sdXRlUGF0aCk6IHZvaWQge1xuICAgIHRoaXMuX3Byb2plY3QuYWRkU3ViZGlyZWN0b3J5KHRoaXMuX3Njb3BlLCBzb3VyY2VEaXIsIGJpbmFyeURpcik7XG4gIH1cblxuICBwdWJsaWMgYWRkQ3VzdG9tU2NyaXB0KHNjcmlwdDogc3RyaW5nLCBwYXJhbXM6IGFueSk6IEN1c3RvbVNjcmlwdCB7XG4gICAgY29uc3QgbmV3VmFyaWFibGVNYXAgPSBTY29wZUhlbHBlci5jbG9uZVZhcmlhYmxlTWFwKHRoaXMuX3Njb3BlKTtcbiAgICBTY29wZUhlbHBlci5leHRlbmRWYXJpYWJsZU1hcEJ5VmFsdWVzKG5ld1ZhcmlhYmxlTWFwLCBDVVNUT01fVkFSSUFCTEVfR1JPVVAsIHBhcmFtcyk7XG4gICAgU2NvcGVIZWxwZXIuc2V0KG5ld1ZhcmlhYmxlTWFwLCBcIlNDUklQVF9NT0RVTEVcIiwgc2NyaXB0KTtcbiAgICByZXR1cm4gdGhpcy5fcHJvamVjdC5hZGRDdXN0b21TY3JpcHQobmV3VmFyaWFibGVNYXApO1xuICB9XG5cbiAgcHVibGljIHNjcmlwdChuYW1lOiBzdHJpbmcpOiBJbnRlcmZhY2VTY3JpcHQge1xuICAgIHJldHVybiB0aGlzLl9wcm9qZWN0LmdldEludGVyZmFjZVNjcmlwdCh0aGlzLl9zY29wZSwgbmFtZSk7XG4gIH1cblxuICBwdWJsaWMgaW5zdGFsbCh2YWx1ZTogYW55LCBwYXJhbXM6IGFueSk6IHZvaWQge1xuICAgIGNvbnN0IHNjb3BlID0gU2NvcGVIZWxwZXIuY3JlYXRlVmFyaWFibGVWYWx1ZXModGhpcy5fc2NvcGUpO1xuICAgIGZvciAoY29uc3QgaXQgb2YgWyB2YWx1ZSBdLmZsYXQoKSkge1xuICAgICAgY29uc3QgaXRlciA9IChpdCBpbnN0YW5jZW9mIEludGVyZmFjZVRhcmdldCkgPyB0aGlzLnRhcmdldChpdC50YXJnZXROYW1lKSA6IGl0O1xuICAgICAgY29uc3QgZW50aXR5ID0gSW5zdGFsbEVudGl0eS5jcmVhdGUoc2NvcGUsIGl0ZXIsIHBhcmFtcyk7XG4gICAgICB0aGlzLl9wcm9qZWN0LmFkZEluc3RhbGxFbnRyeShlbnRpdHkpO1xuICAgIH1cbiAgfVxufTtcbiIsIi8qXG4gKiBNSVQgTGljZW5zZVxuICpcbiAqIENvcHlyaWdodCAoYykgMjAyNSAgWXVyaWkgWWFrdWJpbiAoeXVyaWkueWFrdWJpbkBnbWFpbC5jb20pXG4gKlxuICogUGVybWlzc2lvbiBpcyBncmFudGVkIHRvIHVzZSwgY29weSwgbW9kaWZ5LCBhbmQgZGlzdHJpYnV0ZSB0aGlzIHNvZnR3YXJlXG4gKiB1bmRlciB0aGUgTUlUIExpY2Vuc2UuIFNlZSBMSUNFTlNFIGZpbGUgZm9yIGRldGFpbHMuXG4gKi9cblxuaW1wb3J0IHsgVGFyZ2V0RmlsZSB9IGZyb20gXCJAL2NvcmUvVGFyZ2V0RmlsZVwiO1xuaW1wb3J0IHsgVGFyZ2V0T2JqZWN0cyB9IGZyb20gXCJAL2NvcmUvVGFyZ2V0T2JqZWN0c1wiO1xuaW1wb3J0IHsgVGFyZ2V0SW5jbHVkZXMgfSBmcm9tIFwiQC9jb3JlL1RhcmdldEluY2x1ZGVzXCI7XG5pbXBvcnQgeyBJbnRlcmZhY2VTY3JpcHQgfSBmcm9tIFwiQC9jb3JlL0ludGVyZmFjZVNjcmlwdFwiO1xuaW1wb3J0IHsgQ3VzdG9tU2NyaXB0IH0gZnJvbSBcIkAvY29yZS9DdXN0b21TY3JpcHRcIjtcbmltcG9ydCB7IFZhcmlhbnRNYXAgfSBmcm9tIFwiQC9jb3JlL1Njb3BlXCI7XG5pbXBvcnQgeyBBYnNvbHV0ZVBhdGggfSBmcm9tIFwiQC9jb3JlL0Fic29sdXRlUGF0aFwiO1xuaW1wb3J0IHsgU291cmNlRmlsZUxpc3QgfSBmcm9tIFwiQC9jb3JlL1NvdXJjZUZpbGVMaXN0XCI7XG5pbXBvcnQgeyBTb3VyY2VGaWxlIH0gZnJvbSBcIkAvY29yZS9Tb3VyY2VGaWxlXCI7XG5cbmV4cG9ydCBhYnN0cmFjdCBjbGFzcyBJbnRlcmZhY2VUYXJnZXQge1xuICBhYnN0cmFjdCBnZXQgdGFyZ2V0TmFtZSgpOiBzdHJpbmc7XG4gIGFic3RyYWN0IGdldCB0YXJnZXRGaWxlKCk6IFRhcmdldEZpbGU7XG4gIGFic3RyYWN0IGdldCBpbmNsdWRlcygpOiBUYXJnZXRJbmNsdWRlcztcbiAgYWJzdHJhY3QgZ2V0IG9iamVjdHMoKTogVGFyZ2V0T2JqZWN0cztcblxuICBhYnN0cmFjdCBzZXRQcmVmaXgocHJlZml4OiBzdHJpbmcpOiB2b2lkOyAgXG4gIGFic3RyYWN0IHNldFN1ZmZpeChzdWZmaXg6IHN0cmluZyk6IHZvaWQ7XG4gIGFic3RyYWN0IHNldE91dHB1dE5hbWUob3V0cHV0TmFtZTogc3RyaW5nKTogdm9pZDtcblxuICBhYnN0cmFjdCBhZGRTb3VyY2VzKC4uLnNvdXJjZXM6IEFycmF5PFRhcmdldE9iamVjdHMgfCBTb3VyY2VGaWxlIHwgQWJzb2x1dGVQYXRoIHwgc3RyaW5nPik6IHZvaWQ7XG4gIGFic3RyYWN0IGFkZEluY2x1ZGVzKC4uLmluY2x1ZGVzOiBBcnJheTxUYXJnZXRJbmNsdWRlcyB8IEFic29sdXRlUGF0aCB8IHN0cmluZz4pOiB2b2lkO1xuICBhYnN0cmFjdCBhZGRMaWJyYXJpZXMoLi4ubGlicmFyaWVzOiBhbnkpOiB2b2lkO1xuICBhYnN0cmFjdCBhZGRDb21waWxlT3B0aW9ucyguLi5vcHRpb25zOiBBcnJheTxzdHJpbmd8c3RyaW5nW10+KTogdm9pZDtcbiAgYWJzdHJhY3QgYWRkTGlua09wdGlvbnMoLi4ub3B0aW9uczogQXJyYXk8c3RyaW5nfHN0cmluZ1tdPik6IHZvaWQ7XG4gIGFic3RyYWN0IGdldFNvdXJjZUZpbGVzKC4uLnNvdXJjZXM6IGFueVtdKTogU291cmNlRmlsZUxpc3Q7XG4gIGFic3RyYWN0IGFkZERlZmluaXRpb25zKC4uLmRlZmluaXRpb25zOiBhbnlbXSk6IHZvaWQ7XG4gIGFic3RyYWN0IGFkZFByZUJ1aWxkKGNvbW1hbmQ6IGFueSwgYXJnczogYW55W10pOiB2b2lkO1xuICBhYnN0cmFjdCBhZGRQb3N0QnVpbGQoY29tbWFuZDogYW55LCBhcmdzOiBhbnlbXSk6IHZvaWQ7XG5cbiAgYWJzdHJhY3Qgc2V0UG9zaXRpb25JbmRlcGVuZGVudENvZGUodmFsdWU6IGJvb2xlYW4pOiB2b2lkO1xuICBhYnN0cmFjdCBhZGRQdWJsaWNJbmNsdWRlcyguLi5pbmNsdWRlczogQXJyYXk8VGFyZ2V0SW5jbHVkZXMgfCBBYnNvbHV0ZVBhdGggfCBzdHJpbmc+KTogdm9pZDtcbiAgYWJzdHJhY3QgYWRkUHVibGljRGVmaW5pdGlvbnMoLi4uZGVmaW5pdGlvbnM6IGFueSk6IHZvaWQ7XG4gIGFic3RyYWN0IGFkZFB1YmxpY0xpYnJhcmllcyguLi5saWJyYXJpZXM6IGFueVtdKTogdm9pZDtcbiAgYWJzdHJhY3QgYWRkUHVibGljQ29tcGlsZU9wdGlvbnMoLi4ub3B0aW9uczogQXJyYXk8c3RyaW5nfHN0cmluZ1tdPik6IHZvaWQ7XG4gIGFic3RyYWN0IGFkZFB1YmxpY0xpbmtPcHRpb25zKC4uLm9wdGlvbnM6IEFycmF5PHN0cmluZ3xzdHJpbmdbXT4pOiB2b2lkO1xufTtcblxuZXhwb3J0IGludGVyZmFjZSBJR2VuZXJhbENvbnRleHQge1xuICBnZXRQcm9wZXJ0eShuYW1lOiBzdHJpbmcpOiBhbnk7XG4gIHNldFByb3BlcnR5KG5hbWU6IHN0cmluZywgdmFsdWU6IGFueSk6IGJvb2xlYW47XG4gIGhhc1Byb3BlcnR5KG5hbWU6IHN0cmluZyk6IGJvb2xlYW47XG4gIGRlbGV0ZVByb3BlcnR5KG5hbWU6IHN0cmluZyk6IGJvb2xlYW47XG4gIGdldFByb3BlcnR5TmFtZXMoKTogc3RyaW5nW107XG5cbiAgZmluZFByb2dyYW0obmFtZTogc3RyaW5nKTogc3RyaW5nIHwgdW5kZWZpbmVkO1xufTtcblxuZXhwb3J0IGludGVyZmFjZSBJTWFrZUNvbnRleHQgZXh0ZW5kcyBJR2VuZXJhbENvbnRleHQge1xuICBnZXRDYWNoZVZhcmlhYmxlcygpOiBhbnk7XG4gIGFkZENhY2hlVmFyaWFibGVzKHBhcmFtczogc3RyaW5nIHwgVmFyaWFudE1hcCk6IHZvaWQ7XG4gIGFkZEluY2x1ZGVEaXJlY3RvcmllcyguLi5kaXJzOiBhbnlbXSk6IHZvaWQ7XG4gIGFkZFN1YmRpcmVjdG9yeShzb3VyY2VEaXI6IHN0cmluZyB8IEFic29sdXRlUGF0aCwgYmluYXJ5RGlyPzogc3RyaW5nIHwgQWJzb2x1dGVQYXRoKTogdm9pZDtcbiAgYWRkQ3VzdG9tU2NyaXB0KHNjcmlwdDogc3RyaW5nLCBwYXJhbXM6IGFueSk6IEN1c3RvbVNjcmlwdDtcbiAgdGFyZ2V0KG5hbWU6IHN0cmluZyk6IEludGVyZmFjZVRhcmdldDtcbiAgc2NyaXB0KG5hbWU6IHN0cmluZyk6IEludGVyZmFjZVNjcmlwdDtcbiAgaW5zdGFsbCh2YWx1ZTogYW55LCBwYXJhbXM6IGFueSk6IHZvaWQ7XG4gIGFkZE9iamVjdExpYnJhcnkobmFtZTogc3RyaW5nLCAuLi5zb3VyY2VzOiBhbnlbXSk6IEludGVyZmFjZVRhcmdldDtcbiAgYWRkU3RhdGljTGlicmFyeShuYW1lOiBzdHJpbmcsIC4uLnNvdXJjZXM6IGFueVtdKTogSW50ZXJmYWNlVGFyZ2V0O1xuICBhZGRTaGFyZWRMaWJyYXJ5KG5hbWU6IHN0cmluZywgLi4uc291cmNlczogYW55W10pOiBJbnRlcmZhY2VUYXJnZXQ7XG4gIGFkZEV4ZWN1dGFibGUobmFtZTogc3RyaW5nLCAuLi5zb3VyY2VzOiBhbnlbXSk6IEludGVyZmFjZVRhcmdldDtcbiAgZXhlY3V0ZVNjcmlwdChzY3JpcHQ6IGFueSwgcGFyYW1zOiBhbnkpOiB2b2lkO1xufTtcbiIsIi8qXG4gKiBNSVQgTGljZW5zZVxuICpcbiAqIENvcHlyaWdodCAoYykgMjAyNSAgWXVyaWkgWWFrdWJpbiAoeXVyaWkueWFrdWJpbkBnbWFpbC5jb20pXG4gKlxuICogUGVybWlzc2lvbiBpcyBncmFudGVkIHRvIHVzZSwgY29weSwgbW9kaWZ5LCBhbmQgZGlzdHJpYnV0ZSB0aGlzIHNvZnR3YXJlXG4gKiB1bmRlciB0aGUgTUlUIExpY2Vuc2UuIFNlZSBMSUNFTlNFIGZpbGUgZm9yIGRldGFpbHMuXG4gKi9cblxuaW1wb3J0IHsgUHJvamVjdENvbnRleHQgfSBmcm9tIFwiQC9jb3JlL1Byb2plY3RDb250ZXh0XCI7XG5pbXBvcnQgeyBWYXJpYWJsZU1hcCB9IGZyb20gXCJAL2NvcmUvU2NvcGVcIjtcbmltcG9ydCB7IEdlbmVyYWxDb250ZXh0LCBjcmVhdGVDb250ZXh0IH0gZnJvbSBcIkAvY29yZS9CYXNlQ29udGV4dFwiO1xuXG5jb25zdCBHTE9CQUwgPSBTeW1ib2woXCJHTE9CQUxcIik7XG5jb25zdCBTQ09QRSA9IFN5bWJvbChcIlNDT1BFXCIpO1xuXG5leHBvcnQgY2xhc3MgUGx1Z2luQ29udGV4dCBleHRlbmRzIEdlbmVyYWxDb250ZXh0IHtcbiAgW0dMT0JBTF06IFByb2plY3RDb250ZXh0O1xuICBbU0NPUEVdOiBWYXJpYWJsZU1hcDtcblxuICBwdWJsaWMgY29uc3RydWN0b3IoZ2xvYmFsOiBQcm9qZWN0Q29udGV4dCwgdmFyaWFibGVNYXA6IFZhcmlhYmxlTWFwKSB7XG4gICAgc3VwZXIodmFyaWFibGVNYXApO1xuICAgIHRoaXNbR0xPQkFMXSA9IGdsb2JhbDtcbiAgICB0aGlzW1NDT1BFXSA9IHZhcmlhYmxlTWFwO1xuICB9XG5cbiAgcHVibGljIGFkZFN1YmRpcmVjdG9yeUFsaWFzKHNyYzogYW55LCBkZXN0OiBhbnkpIHtcbiAgICB0aGlzW0dMT0JBTF0uYWRkU3ViZGlyZWN0b3J5QWxpYXModGhpc1tTQ09QRV0sIHNyYywgZGVzdCk7XG4gIH1cblxuICBwdWJsaWMgc3RhdGljIGNyZWF0ZShnbG9iYWw6IFByb2plY3RDb250ZXh0LCB2YXJpYWJsZU1hcDogVmFyaWFibGVNYXApIHtcbiAgICByZXR1cm4gY3JlYXRlQ29udGV4dChuZXcgUGx1Z2luQ29udGV4dChnbG9iYWwsIHZhcmlhYmxlTWFwKSk7XG4gIH1cbn07XG4iLCIvKlxuICogTUlUIExpY2Vuc2VcbiAqXG4gKiBDb3B5cmlnaHQgKGMpIDIwMjUgIFl1cmlpIFlha3ViaW4gKHl1cmlpLnlha3ViaW5AZ21haWwuY29tKVxuICpcbiAqIFBlcm1pc3Npb24gaXMgZ3JhbnRlZCB0byB1c2UsIGNvcHksIG1vZGlmeSwgYW5kIGRpc3RyaWJ1dGUgdGhpcyBzb2Z0d2FyZVxuICogdW5kZXIgdGhlIE1JVCBMaWNlbnNlLiBTZWUgTElDRU5TRSBmaWxlIGZvciBkZXRhaWxzLlxuICovXG5cbmltcG9ydCBmcyBmcm9tIFwibm9kZTpmc1wiO1xuaW1wb3J0IHVybCBmcm9tIFwibm9kZTp1cmxcIjtcbmltcG9ydCB7IHNwYXduU3luYyB9IGZyb20gXCJub2RlOmNoaWxkX3Byb2Nlc3NcIjtcblxuaW1wb3J0IHsgQUxMX1RBUkdFVCwgSU5TVEFMTF9UQVJHRVQgfSBmcm9tIFwiQC9Db25zdGFudHNcIjtcbmltcG9ydCB7IEFic29sdXRlUGF0aCB9IGZyb20gXCJAL2NvcmUvQWJzb2x1dGVQYXRoXCI7XG5pbXBvcnQgeyBQYXRoIH0gZnJvbSBcIkAvdXRpbHMvUGF0aFwiO1xuaW1wb3J0IHsgZmlsZUV4aXN0cywgZmlsZUV4aXN0c1N5bmMgfSBmcm9tIFwiQC91dGlscy9GaWxlU3lzdGVtXCI7XG5pbXBvcnQgeyBUYXJnZXRDb2xsZWN0aW9uIH0gZnJvbSBcIkAvY29yZS9UYXJnZXRDb2xsZWN0aW9uXCI7XG5pbXBvcnQgeyBTY3JpcHRDb2xsZWN0aW9uIH0gZnJvbSBcIkAvY29yZS9TY3JpcHRDb2xsZWN0aW9uXCI7XG5pbXBvcnQgeyBHb2FsQ29sbGVjdGlvbiB9IGZyb20gXCJAL2NvcmUvR29hbENvbGxlY3Rpb25cIjtcbmltcG9ydCB7IEludGVyZmFjZVNjcmlwdCB9IGZyb20gXCJAL2NvcmUvSW50ZXJmYWNlU2NyaXB0XCI7XG5pbXBvcnQgeyBVc2VyTWFrZUNvbnRleHQgfSBmcm9tIFwiQC9jb3JlL1VzZXJNYWtlQ29udGV4dFwiO1xuaW1wb3J0IHsgTG9jYWxNYWtlQ29udGV4dCB9IGZyb20gXCJAL2NvcmUvTG9jYWxNYWtlQ29udGV4dFwiO1xuaW1wb3J0IHsgT2JqZWN0TGlicmFyeSwgU3RhdGljTGlicmFyeSwgU2hhcmVkTGlicmFyeSwgRXhlY3V0YWJsZSwgUG9zdFRhcmdldCwgVGFyZ2V0Q29tbWFuZCB9IGZyb20gXCJAL2NvcmUvVGFyZ2V0XCI7XG5pbXBvcnQgeyBTeXN0ZW1TY29wZSB9IGZyb20gXCJAL2NvcmUvU3lzdGVtU2NvcGVcIjtcbmltcG9ydCB7IGltcG9ydE1vZHVsZSwgcmVxdWlyZVN5bmMgfSBmcm9tIFwiQC91dGlscy9Nb2R1bGVcIjtcbmltcG9ydCB7IExvZ2dlciB9IGZyb20gXCJAL2xvZ2dlclwiO1xuaW1wb3J0IHsgSW5zdGFsbEVudGl0eSB9IGZyb20gXCJAL2NvcmUvSW5zdGFsbEVudGl0eVwiO1xuaW1wb3J0IHsgQ3VzdG9tU2NyaXB0IH0gZnJvbSBcIkAvY29yZS9DdXN0b21TY3JpcHRcIjtcbmltcG9ydCB7IFNjcmlwdENvbnRleHQgfSBmcm9tIFwiQC9jb3JlL1NjcmlwdENvbnRleHRcIjtcbmltcG9ydCB7IFNjb3BlSGVscGVyLCBWYXJpYWJsZU1hcCB9IGZyb20gXCIuL1Njb3BlXCI7XG5pbXBvcnQgeyBUYXJnZXRGaWxlIH0gZnJvbSBcIkAvY29yZS9UYXJnZXRGaWxlXCI7XG5pbXBvcnQgeyBTb3VyY2VGaWxlIH0gZnJvbSBcIkAvY29yZS9Tb3VyY2VGaWxlXCI7XG5pbXBvcnQgeyBwZXJmb3JtQ29udGV4dCwgY3JlYXRlVmFyaWFibGVNYXBGb3JEaXJlY3RvcnkgfSBmcm9tIFwiQC9jb3JlL0Jhc2VDb250ZXh0XCI7XG5cbmltcG9ydCBCdWlsZGluU2NyaXB0cyBmcm9tIFwiQC9jb3JlL0J1aWxkaW5TY3JpcHRzXCI7XG5cbmNvbnN0IGxvZ2dlciA9IExvZ2dlci5jcmVhdGUoaW1wb3J0Lm1ldGEudXJsKTtcblxuY29uc3QgVEFSR0VUUyA9IFN5bWJvbChcIlRBUkdFVFNcIik7XG5jb25zdCBDVVNUT01fU0NSSVBUUyA9IFN5bWJvbChcIkNVU1RPTV9TQ1JJUFRTXCIpO1xuY29uc3QgQ0FDSEUgPSBTeW1ib2woXCJDQUNIRVwiKTtcbmNvbnN0IElOU1RBTExfTElTVCA9IFN5bWJvbChcIklOU1RBTExfTElTVFwiKTtcbmNvbnN0IEJVSUxUSU5fU0NSSVBUUyA9IFN5bWJvbChcIkJVSUxUSU5fU0NSSVBUU1wiKTtcblxudHlwZSBTdWJkaXJlY3RvcnlBbGlhcyA9IHtcbiAgW25hbWU6IHN0cmluZ106IEFic29sdXRlUGF0aCB8IG51bGw7XG59O1xuXG50eXBlIEludGVyZmFjZVNjcmlwdHMgPSB7XG4gIFtuYW1lOiBzdHJpbmddOiBJbnRlcmZhY2VTY3JpcHQ7XG59O1xuXG50eXBlIENhY2hlVmFyaWFibGVEZXNjcmlwdG9yID0ge1xuICB0eXBlPzogYW55O1xuICB2YWx1ZT86IGFueTtcbiAgZGVzY3JpcHRpb24/OiBzdHJpbmc7XG59O1xuXG50eXBlIENhY2hlVmFyaWFibGVEZXNjcmlwdG9ycyA9IHtcbiAgW25hbWU6IHN0cmluZ106IENhY2hlVmFyaWFibGVEZXNjcmlwdG9yO1xufTtcblxudHlwZSBCdWlsZGluU2NyaXB0cyA9IHtcbiAgW25hbWU6IHN0cmluZ106IEZ1bmN0aW9uO1xufTtcblxuZnVuY3Rpb24gZW5zdXJlVmFsdWVCeVR5cGUodHlwZTogYW55LCB2YWx1ZTogYW55KSB7XG4gIGlmIChBcnJheS5pc0FycmF5KHR5cGUpID8gdHlwZS5pbmNsdWRlcyh2YWx1ZSkgOiB0eXBlb2YgdmFsdWUgPT09IHR5cGUpXG4gICAgcmV0dXJuIHZhbHVlO1xuICB0aHJvdyBuZXcgRXJyb3IoYFRoZSAnJHt2YWx1ZX0nIGlzIG5vdCBhICR7dHlwZX1gKTtcbn1cblxudHlwZSBHb2FsSGFuZGxlciA9ICgpID0+IFByb21pc2U8dm9pZD4gfCB2b2lkO1xuXG5pbnRlcmZhY2UgRXhlY1N0cnVjdCB7XG4gIGNvbW1hbmQ6IHN0cmluZztcbiAgYXJnczogc3RyaW5nW107XG59O1xuXG5mdW5jdGlvbiByZXNvbHZlSW5zdGFuY2UocHJvamVjdDogUHJvamVjdENvbnRleHQsIG86IHN0cmluZyB8IEFic29sdXRlUGF0aCB8IFRhcmdldEZpbGUpOiBzdHJpbmcge1xuICBpZiAodHlwZW9mIG8gPT09IFwic3RyaW5nXCIpXG4gICAgcmV0dXJuIG87XG5cbiAgaWYgKG8gaW5zdGFuY2VvZiBBYnNvbHV0ZVBhdGgpXG4gICAgcmV0dXJuIG8udG9TdHJpbmcoKTtcblxuICBpZiAobyBpbnN0YW5jZW9mIFRhcmdldEZpbGUpIHtcbiAgICBjb25zdCB0YXJnZXQgPSBwcm9qZWN0LlRBUkdFVFMuZ2V0KG8udGFyZ2V0TmFtZSk7XG4gICAgcmV0dXJuIHRhcmdldC5nZXRGaWxlKCkudG9TdHJpbmcoKTtcbiAgfVxuXG4gIHRocm93IG5ldyBFcnJvcihgVW5hYmxlIHRvIHJlc29sdmUgb2JqZWN0ICR7b31gKTtcbn1cblxuZnVuY3Rpb24gcmVzb2x2ZVRhcmdldENvbW1hbmQocHJvamVjdDogUHJvamVjdENvbnRleHQsIHRjbWQ6IFRhcmdldENvbW1hbmQpOiBFeGVjU3RydWN0IHtcbiAgY29uc3QgY29tbWFuZCA9IHJlc29sdmVJbnN0YW5jZShwcm9qZWN0LCB0Y21kLmNvbW1hbmQpO1xuICBjb25zdCBhcmdzID0gdGNtZC5hcmdzLm1hcChpID0+IHJlc29sdmVJbnN0YW5jZShwcm9qZWN0LCBpKSk7XG4gIHJldHVybiB7Y29tbWFuZCwgYXJnc307XG59XG5cbmV4cG9ydCBjbGFzcyBHb2FsV29ya2VySW1wbCB7XG4gIHByaXZhdGUgX21lc3NhZ2U6IHN0cmluZyB8IHVuZGVmaW5lZDtcbiAgcHJpdmF0ZSBfbmFtZTogc3RyaW5nIHwgdW5kZWZpbmVkO1xuICBwcml2YXRlIF9vdXRwdXQ6IHN0cmluZyB8IHVuZGVmaW5lZDtcbiAgcHJpdmF0ZSBfZGVwZW5kczogc3RyaW5nW107XG4gIHByaXZhdGUgX2NhbGxiYWNrczogR29hbEhhbmRsZXJbXTtcblxuICBjb25zdHJ1Y3RvcihuYW1lPzogc3RyaW5nKSB7XG4gICAgdGhpcy5fbmFtZSA9IG5hbWU7XG4gICAgdGhpcy5fZGVwZW5kcyA9IFtdO1xuICAgIHRoaXMuX2NhbGxiYWNrcyA9IFtdO1xuICB9XG5cbiAgZ2V0IG1lc3NhZ2UoKTogc3RyaW5nIHwgdW5kZWZpbmVkIHtcbiAgICByZXR1cm4gdGhpcy5fbWVzc2FnZTtcbiAgfVxuXG4gIHNldCBtZXNzYWdlKHZhbHVlOiBzdHJpbmcpIHtcbiAgICB0aGlzLl9tZXNzYWdlID0gdmFsdWU7XG4gIH1cblxuICBnZXQgbmFtZSgpOiBzdHJpbmcgfCB1bmRlZmluZWQge1xuICAgIHJldHVybiB0aGlzLl9uYW1lO1xuICB9XG5cbiAgZ2V0IG91dHB1dCgpOiBzdHJpbmcgfCB1bmRlZmluZWQge1xuICAgIHJldHVybiB0aGlzLl9vdXRwdXQ7XG4gIH1cblxuICBzZXQgb3V0cHV0KHZhbHVlOiBzdHJpbmcpIHtcbiAgICB0aGlzLl9vdXRwdXQgPSB2YWx1ZTtcbiAgfVxuXG4gIGdldCBkZXBlbmRzKCk6IHN0cmluZ1tdIHtcbiAgICByZXR1cm4gdGhpcy5fZGVwZW5kcztcbiAgfVxuXG4gIHB1YmxpYyBhZGREZXBlbmRlbmN5KC4uLnZhbHVlOiBzdHJpbmdbXSkge1xuICAgIHRoaXMuX2RlcGVuZHMucHVzaCguLi52YWx1ZSk7XG4gIH1cblxuICBwdWJsaWMgYWRkQ2FsbGJhY2soaGFuZGxlcjogR29hbEhhbmRsZXIpIHtcbiAgICB0aGlzLl9jYWxsYmFja3MucHVzaChoYW5kbGVyKTtcbiAgfVxuXG4gIGFzeW5jIGRvV29yaygpOiBQcm9taXNlPHZvaWQ+IHtcbiAgICBpZiAodGhpcy5fb3V0cHV0KVxuICAgICAgYXdhaXQgZnMucHJvbWlzZXMubWtkaXIoUGF0aC5kaXJuYW1lKHRoaXMuX291dHB1dCksIHsgcmVjdXJzaXZlOiB0cnVlIH0pO1xuXG4gICAgZm9yIChjb25zdCBmdW5jIG9mIHRoaXMuX2NhbGxiYWNrcykge1xuICAgICAgY29uc3QgcmVzID0gZnVuYygpO1xuICAgICAgaWYgKHJlcyBpbnN0YW5jZW9mIFByb21pc2UpXG4gICAgICAgIGF3YWl0IHJlcztcbiAgICB9XG4gIH1cblxuICB1cGRhdGVQcm9ncmVzcyhldmVudDogeyBsb2FkZWQ6IG51bWJlciwgdG90YWw6IG51bWJlciB9KTogdm9pZCB7XG4gICAgaWYgKHRoaXMuX21lc3NhZ2UpIHtcbiAgICAgIGNvbnN0IHJlbGF0aW9uT2ZMZW5ndGggPSBNYXRoLnJvdW5kKCgrK2V2ZW50LmxvYWRlZCAvIGV2ZW50LnRvdGFsKSAqIDEwMCk7XG4gICAgICBjb25zdCBwZXJjZW50ID0gXCJbXCIgKyByZWxhdGlvbk9mTGVuZ3RoLnRvU3RyaW5nKCkucGFkU3RhcnQoMywgXCIgXCIpICsgXCIlXSBcIjtcbiAgICAgIGxvZ2dlci5ub3RpY2UocGVyY2VudCArIHRoaXMuX21lc3NhZ2UpO1xuICAgIH1cbiAgfVxuXG4gIGFkZEV4ZWMoY29tbWFuZDogc3RyaW5nLCBhcmdzOiBzdHJpbmdbXSwgY3dkOiBzdHJpbmcpOiB2b2lkIHtcbiAgICB0aGlzLmFkZENhbGxiYWNrKCgpID0+IHtcbiAgICAgIGxvZ2dlci5kZWJ1ZyhcInNwYXduU3luY1wiKTtcbiAgICAgIGxvZ2dlci5kZWJ1ZyhcIiAgY29tbWFuZFwiLCBjb21tYW5kKTtcbiAgICAgIGxvZ2dlci5kZWJ1ZyhcIiAgY3dkXCIsIGN3ZCk7XG4gICAgICBmb3IgKGxldCBpID0gMDsgaSA8IGFyZ3MubGVuZ3RoOyBpKyspXG4gICAgICAgIGxvZ2dlci5kZWJ1ZyhgICBhcmdzWyR7aX1dYCwgYXJnc1tpXSk7XG4gICAgICBjb25zdCByZXN1bHQgPSBzcGF3blN5bmMoY29tbWFuZCwgYXJncywgeyBjd2QsIGVuY29kaW5nOiBcInV0Zi04XCIgfSk7XG4gICAgICBpZiAocmVzdWx0LmVycm9yIHx8IHJlc3VsdC5zdGF0dXMpIHtcbiAgICAgICAgbG9nZ2VyLm5vdGljZShcImNkIFwiICsgY3dkKTtcbiAgICAgICAgbGV0IGNtZCA9IGFyZ3Muam9pbihcIiBcIik7XG4gICAgICAgIGNtZCA9IGNvbW1hbmQgKyAoY21kID8gXCIgXCIgOiBcIlwiKSArIGNtZDtcbiAgICAgICAgbG9nZ2VyLm5vdGljZShjbWQpO1xuICAgICAgICBsb2dnZXIubm90aWNlKFwiXCIpO1xuICAgIFxuICAgICAgICBsb2dnZXIuZmF0YWwocmVzdWx0LnN0ZGVycik7XG4gICAgXG4gICAgICAgIGlmIChyZXN1bHQuZXJyb3IpXG4gICAgICAgICAgICB0aHJvdyByZXN1bHQuZXJyb3I7XG4gICAgXG4gICAgICAgIHRocm93IG5ldyBFcnJvcihyZXN1bHQuZXJyb3IgYXMgYW55IHx8IFwiU3RhdHVzIFwiICsgcmVzdWx0LnN0YXR1cyk7XG4gICAgICB9XG4gICAgICBpZiAocmVzdWx0LnN0ZG91dCkge1xuICAgICAgICBmb3IgKGNvbnN0IGxpbmUgb2YgcmVzdWx0LnN0ZG91dC50cmltKCkuc3BsaXQoXCJcXG5cIikpIHtcbiAgICAgICAgICBsb2dnZXIubm90aWNlKGxpbmUpO1xuICAgICAgICB9XG4gICAgICB9XG4gICAgfSlcbiAgfVxuXG4gIGFkZFNjcmlwdChnbG9iYWw6IFByb2plY3RDb250ZXh0LCB2YXJpYWJsZU1hcDogVmFyaWFibGVNYXAsIHNjcmlwdDogQWJzb2x1dGVQYXRoIHwgRnVuY3Rpb24pOiB2b2lkIHtcbiAgICB0aGlzLmFkZENhbGxiYWNrKGFzeW5jICgpID0+IHtcbiAgICAgIGxldCBmdW5jOiBhbnkgPSBzY3JpcHQ7XG4gICAgICBpZiAoc2NyaXB0IGluc3RhbmNlb2YgQWJzb2x1dGVQYXRoKSB7XG4gICAgICAgIGNvbnN0IHNjcmlwdFVybCA9IHVybC5wYXRoVG9GaWxlVVJMKGZ1bmMudG9TdHJpbmcoKSk7XG4gICAgICAgIGZ1bmMgPSAoYXdhaXQgaW1wb3J0TW9kdWxlKHNjcmlwdFVybCkpLmRlZmF1bHQ7XG4gICAgICB9XG4gICAgICBpZiAoZnVuYyBpbnN0YW5jZW9mIEZ1bmN0aW9uKSB7XG4gICAgICAgIGNvbnN0IG1rID0gU2NyaXB0Q29udGV4dC5jcmVhdGUoZ2xvYmFsLCB2YXJpYWJsZU1hcCk7XG4gICAgICAgIGNvbnN0IHJlc3VsdCA9IGZ1bmMobWspO1xuICAgICAgICBpZiAocmVzdWx0IGluc3RhbmNlb2YgUHJvbWlzZSlcbiAgICAgICAgICBhd2FpdCByZXN1bHQ7XG4gICAgICB9XG4gICAgICBlbHNlIHtcbiAgICAgICAgdGhyb3cgbmV3IEVycm9yKGBUaGVyZSBpcyBubyBGdW5jdGlvbmApO1xuICAgICAgfVxuICAgIH0pO1xuICB9XG59O1xuXG5leHBvcnQgY2xhc3MgUHJvamVjdENvbnRleHQge1xuICBwcml2YXRlIFtUQVJHRVRTXTogVGFyZ2V0Q29sbGVjdGlvbjtcbiAgcHJpdmF0ZSBbQ1VTVE9NX1NDUklQVFNdOiBTY3JpcHRDb2xsZWN0aW9uO1xuICBwcml2YXRlIFtDQUNIRV06IENhY2hlVmFyaWFibGVEZXNjcmlwdG9ycztcbiAgcHJpdmF0ZSBfaW50ZXJmYWNlU2NyaXB0czogSW50ZXJmYWNlU2NyaXB0cztcbiAgcHJpdmF0ZSBbSU5TVEFMTF9MSVNUXTogSW5zdGFsbEVudGl0eVtdO1xuICBwcml2YXRlIF9wcm9jZXNzZWRWYXJpYWJsZU1hcDogYW55O1xuICBwcml2YXRlIFtCVUlMVElOX1NDUklQVFNdOiBCdWlsZGluU2NyaXB0cztcbiAgcHJpdmF0ZSBfc3ViZGlyQWxpYXM6IFN1YmRpcmVjdG9yeUFsaWFzO1xuICBwcml2YXRlIF9zdWJkaXJMaXN0OiBWYXJpYWJsZU1hcFtdO1xuXG4gIHByaXZhdGUgY29uc3RydWN0b3IoKSB7XG4gICAgdGhpc1tUQVJHRVRTXSA9IFRhcmdldENvbGxlY3Rpb24uY3JlYXRlKCk7XG4gICAgdGhpc1tDVVNUT01fU0NSSVBUU10gPSBTY3JpcHRDb2xsZWN0aW9uLmNyZWF0ZSgpO1xuICAgIHRoaXNbQ0FDSEVdID0ge307XG4gICAgdGhpcy5faW50ZXJmYWNlU2NyaXB0cyA9IHt9O1xuICAgIHRoaXNbSU5TVEFMTF9MSVNUXSA9IFtdO1xuICAgIHRoaXMuX3Byb2Nlc3NlZFZhcmlhYmxlTWFwID0ge307XG4gICAgdGhpcy5fc3ViZGlyQWxpYXMgPSB7fTtcbiAgICB0aGlzW0JVSUxUSU5fU0NSSVBUU10gPSBCdWlsZGluU2NyaXB0cztcbiAgICB0aGlzLl9zdWJkaXJMaXN0ID0gW107XG4gIH1cblxuICBwdWJsaWMgc3RhdGljIGNyZWF0ZSgpIHtcbiAgICByZXR1cm4gT2JqZWN0LnNlYWwobmV3IFByb2plY3RDb250ZXh0KTtcbiAgfVxuXG4gIHB1YmxpYyBnZXQgVEFSR0VUUygpIHtcbiAgICByZXR1cm4gdGhpc1tUQVJHRVRTXTtcbiAgfVxuXG4gIHB1YmxpYyBnZXQgQ0FDSEUoKSB7XG4gICAgcmV0dXJuIHRoaXNbQ0FDSEVdO1xuICB9XG5cbiAgcHVibGljIGdldEludGVyZmFjZVNjcmlwdCh2YXJpYWJsZU1hcDogVmFyaWFibGVNYXAsIG5hbWU6IHN0cmluZyk6IEludGVyZmFjZVNjcmlwdCB7XG4gICAgbGV0IHNjcmlwdCA9IHRoaXMuX2ludGVyZmFjZVNjcmlwdHNbbmFtZV07XG4gICAgaWYgKCFzY3JpcHQpIHtcbiAgICAgIHNjcmlwdCA9IEludGVyZmFjZVNjcmlwdC5jcmVhdGUobmFtZSk7XG4gICAgICB0aGlzLl9pbnRlcmZhY2VTY3JpcHRzW25hbWVdID0gc2NyaXB0O1xuICAgIH1cbiAgICByZXR1cm4gc2NyaXB0O1xuICB9XG5cbiAgcHVibGljIGFkZEN1c3RvbVNjcmlwdCh2YXJpYWJsZU1hcDogVmFyaWFibGVNYXApOiBDdXN0b21TY3JpcHQge1xuICAgIGNvbnN0IHNjcmlwdCA9IFNjb3BlSGVscGVyLmdldCh2YXJpYWJsZU1hcCwgXCJTQ1JJUFRfTU9EVUxFXCIpO1xuICAgIGNvbnN0IHNvdXJjZURpciA9IFNjb3BlSGVscGVyLmdldCh2YXJpYWJsZU1hcCwgXCJTT1VSQ0VfRElSXCIpO1xuICAgIGxldCBzY3JpcHRPYmo6IEZ1bmN0aW9uIHwgQWJzb2x1dGVQYXRoIHwgdW5kZWZpbmVkO1xuICAgIGlmICh0eXBlb2Ygc2NyaXB0ID09PSBcInN0cmluZ1wiKVxuICAgICAgc2NyaXB0T2JqID0gdGhpcy5maW5kU2NyaXB0RnVuY3Rpb24oc2NyaXB0KTtcbiAgICBpZiAoIXNjcmlwdE9iailcbiAgICAgIHNjcmlwdE9iaiA9IHNvdXJjZURpci5yZXNvbHZlKHNjcmlwdCkgYXMgQWJzb2x1dGVQYXRoO1xuXG4gICAgbGV0IGlucHV0RmlsZSA9IFNjb3BlSGVscGVyLmdldCh2YXJpYWJsZU1hcCwgXCJTQ1JJUFRfSU5QVVRcIik7XG4gICAgaWYgKGlucHV0RmlsZSlcbiAgICAgIGlucHV0RmlsZSA9IHNvdXJjZURpci5yZXNvbHZlKGlucHV0RmlsZSkgYXMgQWJzb2x1dGVQYXRoO1xuXG4gICAgbGV0IG91dHB1dEZpbGUgPSBTY29wZUhlbHBlci5nZXQodmFyaWFibGVNYXAsIFwiU0NSSVBUX09VVFBVVFwiKTtcbiAgICBpZiAoIW91dHB1dEZpbGUpXG4gICAgICB0aHJvdyBuZXcgRXJyb3IoXCJDdXN0b21TY3JpcHQgcGFyYW1ldGVycyByZXF1aXJlZCBvdXRwdXQgZW50aXR5XCIpO1xuXG4gICAgb3V0cHV0RmlsZSA9IHNvdXJjZURpci5yZXNvbHZlKG91dHB1dEZpbGUpIGFzIEFic29sdXRlUGF0aDtcblxuICAgIGNvbnN0IG9wdGlvbnM6IEN1c3RvbVNjcmlwdC5PcHRpb25zID0ge1xuICAgICAgdmFyaWFibGVNYXAsXG4gICAgICBuYW1lOiBTY29wZUhlbHBlci5nZXQodmFyaWFibGVNYXAsIFwiU0NSSVBUX05BTUVcIiksXG4gICAgICBzY3JpcHQ6IHNjcmlwdE9iaixcbiAgICAgIG91dHB1dDogb3V0cHV0RmlsZSxcbiAgICAgIGlucHV0OiBpbnB1dEZpbGUsXG4gICAgICB3b3JrRGlyOiBTY29wZUhlbHBlci5nZXQodmFyaWFibGVNYXAsIFwiQklOQVJZX0RJUlwiKSxcbiAgICB9O1xuXG4gICAgY29uc3QgdGFyZ2V0ID0gQ3VzdG9tU2NyaXB0LmNyZWF0ZShvcHRpb25zKTtcbiAgICBpZiAob3B0aW9ucy5uYW1lKVxuICAgICAgdGhpc1tDVVNUT01fU0NSSVBUU10uc2V0KG9wdGlvbnMubmFtZSwgdGFyZ2V0KTtcbiAgICBlbHNlXG4gICAgICB0aGlzW0NVU1RPTV9TQ1JJUFRTXS5hZGQodGFyZ2V0KTtcblxuICAgIHJldHVybiB0YXJnZXQ7XG4gIH1cblxuICBwdWJsaWMgcmVnaXN0ZXJWYXJpYWJsZU1hcChuYW1lOiBzdHJpbmcsIHZhcmlhYmxlTWFwOiBWYXJpYWJsZU1hcCkge1xuICAgIGlmICh0aGlzLl9wcm9jZXNzZWRWYXJpYWJsZU1hcFtuYW1lXSlcbiAgICAgIHRocm93IG5ldyBFcnJvcihgU3lzdGVtVmFyaWFibGVzIGV4aXN0cyBmb3IgJHtuYW1lfWApO1xuICAgIHRoaXMuX3Byb2Nlc3NlZFZhcmlhYmxlTWFwW25hbWVdID0gdmFyaWFibGVNYXA7XG4gIH1cblxuICBwdWJsaWMgcmVzb2x2ZVN1YmRpcmVjdG9yeShwYXRoOiBBYnNvbHV0ZVBhdGggfCBzdHJpbmcpOiBBYnNvbHV0ZVBhdGggfCBzdHJpbmcgfCB1bmRlZmluZWQge1xuICAgIGNvbnN0IHJlc29sdmVkUGF0aCA9IHRoaXMuX3N1YmRpckFsaWFzW3BhdGgudG9TdHJpbmcoKV07XG4gICAgaWYgKHJlc29sdmVkUGF0aCA9PT0gdW5kZWZpbmVkKVxuICAgICAgcmV0dXJuIHBhdGg7XG4gICAgaWYgKHJlc29sdmVkUGF0aCA9PT0gbnVsbClcbiAgICAgIHJldHVybiB1bmRlZmluZWQ7XG4gICAgcmV0dXJuIHJlc29sdmVkUGF0aDtcbiAgfVxuXG4gIHB1YmxpYyBhZGRTdWJkaXJlY3RvcnlBbGlhcyh2YXJpYWJsZU1hcDogVmFyaWFibGVNYXAsIHNyYzogYW55LCBkZXN0OiBhbnkpIHtcbiAgICBjb25zdCBzcmNQYXRoID0gQWJzb2x1dGVQYXRoLmNyZWF0ZShTY29wZUhlbHBlci5nZXQodmFyaWFibGVNYXAsIFwiU09VUkNFX0RJUlwiKS5yZXNvbHZlKHNyYykpO1xuICAgIGNvbnN0IGRlc3RQYXRoID0gKGRlc3QgPT09IG51bGwpID8gbnVsbCA6IEFic29sdXRlUGF0aC5jcmVhdGUoU2NvcGVIZWxwZXIuZ2V0KHZhcmlhYmxlTWFwLCBcIlNPVVJDRV9ESVJcIikucmVzb2x2ZShkZXN0KSk7XG4gICAgY29uc3Qgc3JjU3RyID0gc3JjUGF0aC50b1N0cmluZygpO1xuICAgIGlmICh0aGlzLl9zdWJkaXJBbGlhcy5oYXNPd25Qcm9wZXJ0eShzcmNTdHIpKVxuICAgICAgbG9nZ2VyLndhcm4oYE93ZXJyaWRlIFwiJHtzcmNTdHJ9XCIgc3ViZGlyZWN0b3J5IGFsaWFzYCk7XG4gICAgdGhpcy5fc3ViZGlyQWxpYXNbc3JjU3RyXSA9IGRlc3RQYXRoO1xuICB9XG5cbiAgcHVibGljIGFkZEluc3RhbGxFbnRyeShlbnRyeTogSW5zdGFsbEVudGl0eSkge1xuICAgIHJldHVybiB0aGlzW0lOU1RBTExfTElTVF0ucHVzaChlbnRyeSk7XG4gIH1cblxuICBwdWJsaWMgYWRkQ2FjaGVWYXJpYWJsZXModmFyaWFibGVzOiBDYWNoZVZhcmlhYmxlRGVzY3JpcHRvcnMpIHtcbiAgICBjb25zdCBjYWNoZSA9IHRoaXNbQ0FDSEVdO1xuICAgIGZvciAoY29uc3QgW2tleSwgZW50cnldIG9mIE9iamVjdC5lbnRyaWVzKHZhcmlhYmxlcykpIHtcbiAgICAgIGNhY2hlW2tleV0gPSBlbnRyeTtcbiAgICB9XG4gIH1cblxuICBwdWJsaWMgbG9hZENhY2hlVmFyaWFibGVzKGZpbGVuYW1lOiBBYnNvbHV0ZVBhdGggfCBzdHJpbmcpIHtcbiAgICBpZiAoZmlsZUV4aXN0c1N5bmMoZmlsZW5hbWUudG9TdHJpbmcoKSkpIHtcbiAgICAgIGNvbnN0IHZhcmlhYmxlcyA9IHJlcXVpcmVTeW5jKGZpbGVuYW1lLnRvU3RyaW5nKCkpO1xuICAgICAgdGhpcy5hZGRDYWNoZVZhcmlhYmxlcyh2YXJpYWJsZXMpO1xuICAgIH1cbiAgfVxuXG4gIHB1YmxpYyBjb3B5Q2FjaGVWYXJpYWJsZXMoc2NvcGU6IGFueSkge1xuICAgIGZvciAoY29uc3QgW25hbWUsIGVudHJ5XSBvZiBPYmplY3QuZW50cmllcyh0aGlzW0NBQ0hFXSkpIHtcbiAgICAgIGlmICghT2JqZWN0Lmhhc093bihzY29wZSwgbmFtZSkpIHtcbiAgICAgICAgY29uc3QgdHlwZSA9IGVudHJ5LnR5cGUgfHwgdHlwZW9mIGVudHJ5LnZhbHVlO1xuICAgICAgICBjb25zdCBkZXNjcmlwdGlvbiA9IGVudHJ5LmRlc2NyaXB0aW9uIHx8IFwiXCI7XG4gICAgICAgIGxldCB2YWx1ZSA9IEFycmF5LmlzQXJyYXkoZW50cnkudmFsdWUpID8gWyAuLi5lbnRyeS52YWx1ZSBdIDogZW50cnkudmFsdWU7ICBcbiAgICAgICAgY29uc3QgbmFtZVN5bWJvbCA9IFN5bWJvbChuYW1lKTtcbiAgICAgICAgc2NvcGVbbmFtZVN5bWJvbF0gPSBlbnN1cmVWYWx1ZUJ5VHlwZSh0eXBlLCB2YWx1ZSk7XG4gIFxuICAgICAgICBPYmplY3QuZGVmaW5lUHJvcGVydHkoc2NvcGUsIG5hbWUsIHtcbiAgICAgICAgICBlbnVtZXJhYmxlOiB0cnVlLFxuICAgICAgICAgIGdldCgpIHtcbiAgICAgICAgICAgIHJldHVybiB0aGlzW25hbWVTeW1ib2xdO1xuICAgICAgICAgIH0sXG4gICAgICAgICAgc2V0KHZhbHVlKSB7XG4gICAgICAgICAgICB0aGlzW25hbWVTeW1ib2xdID0gZW5zdXJlVmFsdWVCeVR5cGUodHlwZSwgdmFsdWUpO1xuICAgICAgICAgIH0sXG4gICAgICAgIH0pO1xuICAgICAgfVxuICAgIH1cbiAgfVxuXG4gIHB1YmxpYyBleGVjdXRlU2NyaXB0U3luYyh2YXJpYWJsZU1hcDogVmFyaWFibGVNYXAsIHNjcmlwdDogYW55LCBwYXJhbXM6IGFueSkge1xuICAgIGNvbnN0IG5ld1ZhcmlhYmxlTWFwID0gU2NvcGVIZWxwZXIuY2xvbmVWYXJpYWJsZU1hcCh2YXJpYWJsZU1hcCk7XG4gICAgcGFyYW1zICYmIFNjb3BlSGVscGVyLmV4dGVuZFZhcmlhYmxlTWFwQnlWYWx1ZXMobmV3VmFyaWFibGVNYXAsIFwiXCIsIHBhcmFtcyk7XG4gICAgY29uc3Qgc2NyaXB0UGF0aCA9IFNjb3BlSGVscGVyLmdldChuZXdWYXJpYWJsZU1hcCwgXCJTT1VSQ0VfRElSXCIpLnJlc29sdmUoc2NyaXB0KTtcbiAgICBjb25zdCBmdW5jID0gcmVxdWlyZVN5bmMoc2NyaXB0UGF0aC50b1N0cmluZygpKTtcbiAgICBjb25zdCBtayA9IFNjcmlwdENvbnRleHQuY3JlYXRlKHRoaXMsIG5ld1ZhcmlhYmxlTWFwKTtcbiAgICBmdW5jKG1rKTtcbiAgfVxuXG4gIHB1YmxpYyB3cml0ZUNhY2hlVmFyaWFibGVzKGZpbGVuYW1lOiBzdHJpbmcpIHtcbiAgICBjb25zdCBqc29uID0gSlNPTi5zdHJpbmdpZnkodGhpc1tDQUNIRV0sIG51bGwsIDIpO1xuICAgIGZzLndyaXRlRmlsZVN5bmMoZmlsZW5hbWUsIGpzb24sIFwidXRmLThcIik7XG4gIH1cblxuICBwdWJsaWMgYXN5bmMgcHJlcGVhclNjcmlwdEZpbGUodmFyaWFibGVNYXA6IFZhcmlhYmxlTWFwKTogUHJvbWlzZTxib29sZWFuPiB7XG4gICAgY29uc3Qgb3JpZ2luU291cmNlRGlyID0gU2NvcGVIZWxwZXIuZ2V0KHZhcmlhYmxlTWFwLCBcIlNPVVJDRV9ESVJcIikudG9TdHJpbmcoKTtcbiAgICBjb25zdCByZXNvbHZlU291cmNlRGlyID0gdGhpcy5yZXNvbHZlU3ViZGlyZWN0b3J5KG9yaWdpblNvdXJjZURpcik7XG4gICAgaWYgKCFyZXNvbHZlU291cmNlRGlyKSB7XG4gICAgICBsb2dnZXIuaW5mbyhgU291cmNlIGRpciBcIiR7b3JpZ2luU291cmNlRGlyfVwiIHdhcyBkaXNhYmxlZGApO1xuICAgICAgcmV0dXJuIGZhbHNlO1xuICAgIH1cbiAgICBTY29wZUhlbHBlci5zZXQodmFyaWFibGVNYXAsIFwiU09VUkNFX0RJUlwiLCByZXNvbHZlU291cmNlRGlyKTtcblxuICAgIGlmICghU2NvcGVIZWxwZXIuZ2V0KHZhcmlhYmxlTWFwLCBcIlNDUklQVF9GSUxFXCIpKSB7XG4gICAgICBsZXQgc2NyaXB0RmlsZTogQWJzb2x1dGVQYXRoIHwgdW5kZWZpbmVkO1xuICAgICAgY29uc3QgZmlsZUxpc3QgPSBbIFwiLmpzXCIsIFwiLm1qc1wiIF0ubWFwKGkgPT4gXCJNYWtlU2NyaXB0XCIgKyBpKTtcbiAgICAgIGZvciAoY29uc3QgZmlsZW5hbWUgb2YgZmlsZUxpc3QpIHtcbiAgICAgICAgY29uc3QgaXRlciA9IFNjb3BlSGVscGVyLmdldCh2YXJpYWJsZU1hcCwgXCJTT1VSQ0VfRElSXCIpLmpvaW4oZmlsZW5hbWUpO1xuICAgICAgICBpZiAoYXdhaXQgZmlsZUV4aXN0cyhpdGVyLnRvU3RyaW5nKCkpKSB7XG4gICAgICAgICAgc2NyaXB0RmlsZSA9IGl0ZXI7XG4gICAgICAgICAgYnJlYWs7XG4gICAgICAgIH1cbiAgICAgIH1cblxuICAgICAgaWYgKCFzY3JpcHRGaWxlKVxuICAgICAgICB0aHJvdyBuZXcgRXJyb3IoYFRoZXJlIGFyZSBubyBmaWxlcyAke2ZpbGVMaXN0LmpvaW4oXCIsIFwiKX0gaW4gXCIke1Njb3BlSGVscGVyLmdldCh2YXJpYWJsZU1hcCwgXCJTT1VSQ0VfRElSXCIpfVwiYCk7XG5cbiAgICAgIFNjb3BlSGVscGVyLnNldCh2YXJpYWJsZU1hcCwgXCJTQ1JJUFRfRklMRVwiLCBzY3JpcHRGaWxlKTtcbiAgICAgIFNjb3BlSGVscGVyLnNldCh2YXJpYWJsZU1hcCwgXCJTQ1JJUFRfRElSXCIsIFNjb3BlSGVscGVyLmdldCh2YXJpYWJsZU1hcCwgXCJTQ1JJUFRfRklMRVwiKS5kaXJuYW1lKCkpO1xuICAgIH1cblxuICAgIHRoaXMucmVnaXN0ZXJWYXJpYWJsZU1hcChTY29wZUhlbHBlci5nZXQodmFyaWFibGVNYXAsIFwiU0NSSVBUX0ZJTEVcIikudG9TdHJpbmcoKSwgdmFyaWFibGVNYXApO1xuICAgIHJldHVybiB0cnVlO1xuICB9XG5cbiAgcHVibGljIGFkZFN1YmRpcmVjdG9yeSh2YXJpYWJsZU1hcDogVmFyaWFibGVNYXAsIHNvdXJjZURpcjogYW55LCBiaW5hcnlEaXI/OiBhbnkpIHtcbiAgICBjb25zdCBuZXdWYXJpYWJsZU1hcCA9IGNyZWF0ZVZhcmlhYmxlTWFwRm9yRGlyZWN0b3J5KHZhcmlhYmxlTWFwLCBzb3VyY2VEaXIsIGJpbmFyeURpcik7XG4gICAgaWYgKG5ld1ZhcmlhYmxlTWFwKSB7XG4gICAgICB0aGlzLl9zdWJkaXJMaXN0LnB1c2gobmV3VmFyaWFibGVNYXApO1xuICAgIH1cbiAgfVxuXG4gIHB1YmxpYyBmaW5kU2NyaXB0RnVuY3Rpb24obmFtZTogc3RyaW5nKTogRnVuY3Rpb24gfCB1bmRlZmluZWQge1xuICAgIHJldHVybiB0aGlzW0JVSUxUSU5fU0NSSVBUU11bbmFtZV07XG4gIH1cblxuICBwdWJsaWMgYXN5bmMgZG9TdWJkaXJlY3RvcnkoKSB7XG4gICAgY29uc3QgY29udGV4dExpc3QgPSBuZXcgQXJyYXk8TG9jYWxNYWtlQ29udGV4dD4oKTtcblxuICAgIGZvciAoOzspIHtcbiAgICAgIGNvbnN0IHZhcmlhYmxlTWFwID0gdGhpcy5fc3ViZGlyTGlzdC5zaGlmdCgpO1xuICAgICAgaWYgKCF2YXJpYWJsZU1hcClcbiAgICAgICAgYnJlYWs7XG5cbiAgICAgIGlmICghYXdhaXQgdGhpcy5wcmVwZWFyU2NyaXB0RmlsZSh2YXJpYWJsZU1hcCkpXG4gICAgICAgIGNvbnRpbnVlO1xuXG4gICAgICBjb25zdCBjdHggPSBuZXcgTG9jYWxNYWtlQ29udGV4dCh2YXJpYWJsZU1hcCwgdGhpcyk7XG4gICAgICBjb250ZXh0TGlzdC5wdXNoKGN0eCk7XG4gICAgICBjb25zdCBtayA9IFVzZXJNYWtlQ29udGV4dC5jcmVhdGUoY3R4LCB2YXJpYWJsZU1hcCk7XG5cbiAgICAgIGNvbnN0IGN3ZFNhdmUgPSBwcm9jZXNzLmN3ZCgpO1xuICAgICAgcHJvY2Vzcy5jaGRpcihtay5TQ1JJUFRfRElSLnRvU3RyaW5nKCkpO1xuICAgICAgYXdhaXQgcGVyZm9ybUNvbnRleHQobWspO1xuICAgICAgcHJvY2Vzcy5jaGRpcihjd2RTYXZlKTtcbiAgICB9XG5cbiAgICBmb3IgKGNvbnN0IGN0eCBvZiBjb250ZXh0TGlzdCkge1xuICAgICAgZm9yIChjb25zdCBbbmFtZSwgdGFyZ2V0XSBvZiBjdHgudGFyZ2V0cylcbiAgICAgICAgdGhpc1tUQVJHRVRTXS5zZXQobmFtZSwgdGFyZ2V0KTtcbiAgICB9XG5cbiAgICBmb3IgKGNvbnN0IGN0eCBvZiBjb250ZXh0TGlzdCkge1xuICAgICAgZm9yIChjb25zdCBbbmFtZSwgdGFyZ2V0XSBvZiBjdHguaW5kaXJlY3RUYXJnZXRzKVxuICAgICAgICB0aGlzW1RBUkdFVFNdLmdldChuYW1lKS5wb3N0VXBkYXRlKHRhcmdldCk7XG4gICAgfVxuICB9XG5cbiAgcHVibGljIGNyZWF0ZUdvYWxzKHNjb3BlOiBTeXN0ZW1TY29wZSk6IEdvYWxDb2xsZWN0aW9uIHtcbiAgICBmb3IgKGNvbnN0IGl0ZXIgb2YgT2JqZWN0LnZhbHVlcyh0aGlzLl9pbnRlcmZhY2VTY3JpcHRzKSkge1xuICAgICAgY29uc3Qgc2NyaXB0ID0gdGhpc1tDVVNUT01fU0NSSVBUU10uZ2V0KGl0ZXIuTkFNRSk7XG4gICAgICBpZiAoIXNjcmlwdClcbiAgICAgICAgdGhyb3cgbmV3IEVycm9yKGBUaGVyZSBpcyBubyBDdXN0b21TY3JpcHQgbmFtZWQgJHtpdGVyLk5BTUV9YCk7XG4gICAgICBzY3JpcHQubWVyZ2VWYXJpYWJsZXMoaXRlci52YXJpYWJsZXMpO1xuICAgIH1cbiAgXG4gICAgY29uc3QgZ29hbExpc3QgPSBHb2FsQ29sbGVjdGlvbi5jcmVhdGUoKTtcbiAgICBmb3IgKGNvbnN0IHNjcmlwdCBvZiB0aGlzW0NVU1RPTV9TQ1JJUFRTXS5FTlRSSUVTKSB7ICAgXG4gICAgICBjb25zdCBkZXBlbmRzID0gW107XG4gICAgICBpZiAoc2NyaXB0LlNDUklQVCBpbnN0YW5jZW9mIEFic29sdXRlUGF0aClcbiAgICAgICAgZGVwZW5kcy5wdXNoKHNjcmlwdC5TQ1JJUFQudG9TdHJpbmcoKSk7XG4gICAgICBpZiAoc2NyaXB0LklOUFVUKVxuICAgICAgICBkZXBlbmRzLnB1c2goc2NyaXB0LklOUFVULnRvU3RyaW5nKCkpO1xuICAgICAgY29uc3QgbXNnID0gXCJcXHgxYlszNm1cIiArIFwiR2VuZXJhdGluZyBcIiArIHNjcmlwdC53b3JrRGlyLnJlbGF0aXZlKHNjcmlwdC5PVVRQVVQpICsgXCJcXHgxYlswbVwiO1xuICAgICAgY29uc3Qgd29ya2VyID0gbmV3IEdvYWxXb3JrZXJJbXBsKHNjcmlwdC5OQU1FKTtcbiAgICAgIHdvcmtlci5tZXNzYWdlID0gbXNnO1xuICAgICAgd29ya2VyLm91dHB1dCA9IHNjcmlwdC5PVVRQVVQudG9TdHJpbmcoKTtcbiAgICAgIHdvcmtlci5hZGREZXBlbmRlbmN5KC4uLmRlcGVuZHMpO1xuICAgICAgd29ya2VyLmFkZFNjcmlwdCh0aGlzLCBzY3JpcHQudmFyaWFibGVNYXAsIHNjcmlwdC5TQ1JJUFQpO1xuICAgICAgZ29hbExpc3QuYWRkKHdvcmtlcik7XG4gICAgfVxuXG4gICAgY29uc3Qgb2JqZWN0RmlsZXMgPSBuZXcgTWFwPFNvdXJjZUZpbGUsIEFic29sdXRlUGF0aD4oKTtcbiAgICBmb3IgKGNvbnN0IHRhcmdldCBvZiB0aGlzW1RBUkdFVFNdLkVOVFJJRVMudmFsdWVzKCkpIHtcbiAgICAgIGZvciAoY29uc3QgaXQgb2YgdGFyZ2V0LmdldFNvdXJjZUZpbGVMaXN0KCkpIHtcbiAgICAgICAgaWYgKCFpdC5MQU5HVUFHRSlcbiAgICAgICAgICBjb250aW51ZTtcbiAgICAgICAgY29uc3QgcmZpbGUxID0gdGFyZ2V0LlRBUkdFVF9TQ09QRS5CSU5BUllfRElSLnJlbGF0aXZlKGl0LkZJTEUpO1xuICAgICAgICBjb25zdCByZmlsZTIgPSAgdGFyZ2V0LlRBUkdFVF9TQ09QRS5TT1VSQ0VfRElSLnJlbGF0aXZlKGl0LkZJTEUpO1xuICAgICAgICBjb25zdCByZmlsZSA9IChyZmlsZTIubGVuZ3RoIDwgcmZpbGUxLmxlbmd0aCA/IHJmaWxlMiA6IHJmaWxlMSkucmVwbGFjZShcIi4uL1wiLCBcIl9fL1wiKTtcbiAgICAgICAgY29uc3Qgb2ZpbGUgPSAgdGFyZ2V0LlRBUkdFVF9TQ09QRS5CSU5BUllfRElSLmpvaW4oXCJNYWtlRmlsZXNcIiwgdGFyZ2V0LnRhcmdldE5hbWUgKyBcIi5kaXJcIiwgIHJmaWxlICsgXCIub2JqXCIpO1xuICAgICAgICBvYmplY3RGaWxlcy5zZXQoaXQsIG9maWxlKTtcbiAgICAgIH1cbiAgICB9XG5cbiAgICBmb3IgKGNvbnN0IFtuYW1lLCB0YXJnZXRdIG9mIHRoaXNbVEFSR0VUU10uRU5UUklFUykge1xuICAgICAgY29uc3QgZGVwZW5kcyA9IFtdO1xuICAgICAgZm9yIChjb25zdCBzIG9mIHRhcmdldC5nZXRUYXJnZXRPYmplY3RzTGlzdCgpKSB7XG4gICAgICAgIGNvbnN0IHQgPSB0aGlzW1RBUkdFVFNdLmdldChzLnRhcmdldE5hbWUpO1xuICAgICAgICBmb3IgKGNvbnN0IGYgb2YgdC5nZXRTb3VyY2VGaWxlTGlzdCgpKSB7XG4gICAgICAgICAgY29uc3QgbyA9IG9iamVjdEZpbGVzLmdldChmKTtcbiAgICAgICAgICBvICYmIGRlcGVuZHMucHVzaChvLnRvU3RyaW5nKCkpO1xuICAgICAgICB9XG4gICAgICB9XG4gIFxuICAgICAgY29uc3QgaGVhZGVycyA9IHRoaXNbVEFSR0VUU10uYWxsSGVhZGVyc09mKHRhcmdldCk7XG4gICAgICBmb3IgKGNvbnN0IHMgb2YgdGFyZ2V0LmdldFNvdXJjZUZpbGVMaXN0KCkpIHtcbiAgICAgICAgaWYgKHMuSEVBREVSX0ZJTEVfT05MWSlcbiAgICAgICAgICBjb250aW51ZTtcblxuICAgICAgICBjb25zdCBvID0gb2JqZWN0RmlsZXMuZ2V0KHMpO1xuICAgICAgICBpZiAoIW8pXG4gICAgICAgICAgdGhyb3cgbmV3IEVycm9yKGBPQkpFQ1RfRklMRSBpcyBudWxsYCk7XG5cbiAgICAgICAgZnMubWtkaXJTeW5jKG8uZGlybmFtZSgpLnRvU3RyaW5nKCksIHsgcmVjdXJzaXZlOiB0cnVlIH0pO1xuICBcbiAgICAgICAgY29uc3QgcmVsYXRpdmVPYmplY3QgPSB0YXJnZXQuVEFSR0VUX1NDT1BFLkJJTkFSWV9ESVIucmVsYXRpdmUobyk7XG4gICAgICAgIGNvbnN0IHJlbGF0aXZlQmluYXJ5RGlyID0gc2NvcGUuUFJPSkVDVF9CSU5BUllfRElSLnJlbGF0aXZlKHRhcmdldC5UQVJHRVRfU0NPUEUuQklOQVJZX0RJUik7XG4gICAgICAgIGNvbnN0IG1zZyA9IFwiXFx4MWJbMzJtXCIgKyBgQnVpbGRpbmcgJHtzLkxBTkdVQUdFfSBvYmplY3QgJHtyZWxhdGl2ZUJpbmFyeURpcn0vJHtyZWxhdGl2ZU9iamVjdH1gICsgXCJcXHgxYlswbVwiO1xuICBcbiAgICAgICAgY29uc3QgZGVmaW5pdGlvbnMgPSBbXG4gICAgICAgICAgLi4udGhpc1tUQVJHRVRTXS5hbGxEZWZpbml0aW9uc09mKHRhcmdldCksXG4gICAgICAgICAgLi4ucy5ERUZJTkVTLFxuICAgICAgICBdO1xuXG4gICAgICAgIGNvbnN0IGFyZ3M6IHN0cmluZ1tdID0gW107XG4gICAgICAgIGFyZ3MucHVzaCguLi5kZWZpbml0aW9ucy5tYXAoaSA9PiBcIi1EXCIgKyBpKSk7XG4gICAgICAgIGFyZ3MucHVzaCguLi50aGlzW1RBUkdFVFNdLmFsbEluY2x1ZGVzT2YodGFyZ2V0KS5tYXAoaSA9PiBcIi1JXCIgKyBpKSk7XG4gICAgICAgIGFyZ3MucHVzaCguLi50aGlzW1RBUkdFVFNdLmFsbENvbXBpbGVPcHRpb25zT2YodGFyZ2V0KSk7XG4gICAgICAgIGlmICh0YXJnZXQucG9zaXRpb25JbmRlcGVuZGVudENvZGUpXG4gICAgICAgICAgYXJncy5wdXNoKFwiLWZQSUNcIik7XG4gICAgICAgIGFyZ3MucHVzaCguLi5zLkNPTVBJTEVfRkxBR1MuZmxhdCgpKTtcbiAgICAgICAgYXJncy5wdXNoKFwiLW9cIiwgcmVsYXRpdmVPYmplY3QpO1xuICAgICAgICBhcmdzLnB1c2goXCItY1wiLCBzLkZJTEUudG9TdHJpbmcoKSk7XG4gIFxuICAgICAgICBjb25zdCBjb21tYW5kID0gKHRhcmdldC5UQVJHRVRfU0NPUEUgYXMgYW55KVtzLkxBTkdVQUdFICsgXCJfQ09NUElMRVJcIl0udG9TdHJpbmcoKTtcbiAgICAgICAgY29uc3Qgb3V0cHV0ID0gQWJzb2x1dGVQYXRoLmNyZWF0ZSh0YXJnZXQuVEFSR0VUX1NDT1BFLkJJTkFSWV9ESVIuam9pbihyZWxhdGl2ZU9iamVjdCkpO1xuICAgICAgICBkZXBlbmRzLnB1c2gob3V0cHV0LnRvU3RyaW5nKCkpO1xuXG4gICAgICAgIGNvbnN0IHdvcmtlciA9IG5ldyBHb2FsV29ya2VySW1wbDtcbiAgICAgICAgd29ya2VyLm1lc3NhZ2UgPSBtc2c7XG4gICAgICAgIHdvcmtlci5vdXRwdXQgPSBvdXRwdXQudG9TdHJpbmcoKTtcbiAgICAgICAgd29ya2VyLmFkZERlcGVuZGVuY3koLi4uaGVhZGVycyk7XG4gICAgICAgIHdvcmtlci5hZGREZXBlbmRlbmN5KHMuRklMRS50b1N0cmluZygpKTtcbiAgICAgICAgd29ya2VyLmFkZEV4ZWMoY29tbWFuZCwgYXJncywgdGFyZ2V0LlRBUkdFVF9TQ09QRS5CSU5BUllfRElSLnRvU3RyaW5nKCkpO1xuICAgICAgICBnb2FsTGlzdC5hZGQod29ya2VyKTtcbiAgICAgIH1cblxuICAgICAgY29uc3QgZ2VuZXJhbEdvYWwgPSBuZXcgR29hbFdvcmtlckltcGw7XG4gICAgICBmb3IgKGNvbnN0IHBhcmFtcyBvZiB0YXJnZXQucHJlQnVpbGRMaXN0KSB7XG4gICAgICAgIGNvbnN0IGV4ZWNTdHJ1Y3QgPSByZXNvbHZlVGFyZ2V0Q29tbWFuZCh0aGlzLCBwYXJhbXMpO1xuICAgICAgICBnZW5lcmFsR29hbC5hZGRFeGVjKGV4ZWNTdHJ1Y3QuY29tbWFuZCwgZXhlY1N0cnVjdC5hcmdzLCB0YXJnZXQuVEFSR0VUX1NDT1BFLkJJTkFSWV9ESVIudG9TdHJpbmcoKSk7XG4gICAgICB9XG5cbiAgICAgIGNvbnN0IGxpbmtPcHRpb25zID0gdGhpc1tUQVJHRVRTXS5hbGxMaW5rT3B0aW9uc09mKHRhcmdldCk7XG4gICAgICBpZiAodGFyZ2V0IGluc3RhbmNlb2YgT2JqZWN0TGlicmFyeSkge1xuICAgICAgICBjb25zdCBvYmpzID0gZGVwZW5kcy5maWx0ZXIoaSA9PiBpLmVuZHNXaXRoKFwiLm9cIikgfHwgaS5lbmRzV2l0aChcIi5vYmpcIikpLm1hcChpID0+IHRhcmdldC5nZXRGaWxlRGlyKCkucmVsYXRpdmUoaSkpO1xuICAgICAgICBpZiAob2Jqcy5sZW5ndGgpIHtcbiAgICAgICAgICBjb25zdCBhcmdzID0gW1xuICAgICAgICAgICAgLi4ubGlua09wdGlvbnMsXG4gICAgICAgICAgICBcIi1yXCIsXG4gICAgICAgICAgICBcIi1vXCIsIHRhcmdldC5nZXRGaWxlTmFtZSgpLFxuICAgICAgICAgICAgLi4ub2Jqc1xuICAgICAgICAgIF07XG4gICAgICAgICAgZ2VuZXJhbEdvYWwubWVzc2FnZSA9IGBMaW5raW5nIENYWCBvYmplY3QgbGlicmFyeSAke3RhcmdldC5nZXRGaWxlTmFtZSgpfWA7XG4gICAgICAgICAgZ2VuZXJhbEdvYWwub3V0cHV0ID0gdGFyZ2V0LmdldEZpbGUoKS50b1N0cmluZygpO1xuICAgICAgICAgIGdlbmVyYWxHb2FsLmFkZERlcGVuZGVuY3koLi4uZGVwZW5kcyk7XG4gICAgICAgICAgZ2VuZXJhbEdvYWwuYWRkRXhlYyhzY29wZS5MSU5LRVIsIGFyZ3MsIHRhcmdldC5nZXRGaWxlRGlyKCkudG9TdHJpbmcoKSk7XG4gICAgICAgIH1cbiAgICAgICAgZWxzZSB7XG4gICAgICAgICAgbG9nZ2VyLmluZm8oYE5vIG9iamVjdHMgZm9yIFwiJHt0YXJnZXQudGFyZ2V0TmFtZX1cImApO1xuICAgICAgICB9XG4gICAgICB9XG4gIFxuICAgICAgaWYgKHRhcmdldCBpbnN0YW5jZW9mIFN0YXRpY0xpYnJhcnkpIHtcbiAgICAgICAgY29uc3Qgb2JqcyA9IGRlcGVuZHMuZmlsdGVyKGkgPT4gaS5lbmRzV2l0aChcIi5vXCIpIHx8IGkuZW5kc1dpdGgoXCIub2JqXCIpKS5tYXAoaSA9PiB0YXJnZXQuZ2V0RmlsZURpcigpLnJlbGF0aXZlKGkpKTtcbiAgICAgICAgaWYgKG9ianMubGVuZ3RoKSB7XG4gICAgICAgICAgY29uc3QgYXJncyA9IFsgXCJyY1wiLCB0YXJnZXQuZ2V0RmlsZU5hbWUoKSAsIC4uLm9ianMgXTtcbiAgICAgICAgICBnZW5lcmFsR29hbC5tZXNzYWdlID0gYExpbmtpbmcgQ1hYIHN0YXRpYyBsaWJyYXJ5ICR7dGFyZ2V0LmdldEZpbGVOYW1lKCl9YDtcbiAgICAgICAgICBnZW5lcmFsR29hbC5vdXRwdXQgPSB0YXJnZXQuZ2V0RmlsZSgpLnRvU3RyaW5nKCk7XG4gICAgICAgICAgZ2VuZXJhbEdvYWwuYWRkRGVwZW5kZW5jeSguLi5kZXBlbmRzKTtcbiAgICAgICAgICBnZW5lcmFsR29hbC5hZGRFeGVjKHNjb3BlLkFSLCBhcmdzLCB0YXJnZXQuZ2V0RmlsZURpcigpLnRvU3RyaW5nKCkpO1xuICAgICAgICB9XG4gICAgICAgIGVsc2Uge1xuICAgICAgICAgIGxvZ2dlci5pbmZvKGBObyBvYmplY3RzIGZvciBcIiR7dGFyZ2V0LnRhcmdldE5hbWV9XCJgKTtcbiAgICAgICAgfVxuICAgICAgfVxuICBcbiAgICAgIGlmICh0YXJnZXQgaW5zdGFuY2VvZiBTaGFyZWRMaWJyYXJ5KSB7XG4gICAgICAgIHRocm93IG5ldyBFcnJvcihcIk5vdCBpbXBsZW1lbnRlZFwiKTtcbiAgICAgIH1cblxuICAgICAgaWYgKHRhcmdldCBpbnN0YW5jZW9mIEV4ZWN1dGFibGUpIHtcbiAgICAgICAgY29uc3Qgb2JqcyA9IGRlcGVuZHMuZmlsdGVyKGkgPT4gaS5lbmRzV2l0aChcIi5vXCIpIHx8IGkuZW5kc1dpdGgoXCIub2JqXCIpKS5tYXAoaSA9PiB0YXJnZXQuZ2V0RmlsZURpcigpLnJlbGF0aXZlKGkpKTtcbiAgICAgICAgaWYgKG9ianMubGVuZ3RoKSB7XG4gICAgICAgICAgY29uc3QgbGlicyA9IHRoaXNbVEFSR0VUU10uYWxsTGlicmFyaWVzT2YodGFyZ2V0KTtcbiAgICAgICAgICBjb25zdCBhcmdzID0gW1xuICAgICAgICAgICAgLi4udGFyZ2V0LlRBUkdFVF9TQ09QRS5DWFhfRkxBR1MsXG4gICAgICAgICAgICAuLi5saW5rT3B0aW9ucyxcbiAgICAgICAgICAgIC4uLm9ianMsXG4gICAgICAgICAgICBcIi1vXCIsIHRhcmdldC5nZXRGaWxlTmFtZSgpLFxuICAgICAgICAgICAgLi4ubGlicy5tYXAoaSA9PiB0YXJnZXQuZ2V0RmlsZURpcigpLnJlbGF0aXZlKGkpKSxcbiAgICAgICAgICBdO1xuXG4gICAgICAgICAgZ2VuZXJhbEdvYWwubWVzc2FnZSA9IGBMaW5raW5nIENYWCBleGVjdXRhYmxlICR7dGFyZ2V0LmdldEZpbGVOYW1lKCl9YDtcbiAgICAgICAgICBnZW5lcmFsR29hbC5vdXRwdXQgPSB0YXJnZXQuZ2V0RmlsZSgpLnRvU3RyaW5nKCk7XG4gICAgICAgICAgZ2VuZXJhbEdvYWwuYWRkRGVwZW5kZW5jeSguLi5kZXBlbmRzKTtcbiAgICAgICAgICBnZW5lcmFsR29hbC5hZGREZXBlbmRlbmN5KC4uLmxpYnMpO1xuICAgICAgICAgIGdlbmVyYWxHb2FsLmFkZEV4ZWMoc2NvcGUuQ1hYX0NPTVBJTEVSLCBhcmdzLCB0YXJnZXQuZ2V0RmlsZURpcigpLnRvU3RyaW5nKCkpO1xuICAgICAgICB9XG4gICAgICAgIGVsc2Uge1xuICAgICAgICAgIGxvZ2dlci5pbmZvKGBObyBvYmplY3RzIGZvciBcIiR7dGFyZ2V0LnRhcmdldE5hbWV9XCJgKTtcbiAgICAgICAgfVxuICAgICAgfVxuXG4gICAgICBmb3IgKGNvbnN0IHBhcmFtcyBvZiB0YXJnZXQucG9zdEJ1aWxkTGlzdCkge1xuICAgICAgICBjb25zdCBleGVjU3RydWN0ID0gcmVzb2x2ZVRhcmdldENvbW1hbmQodGhpcywgcGFyYW1zKTtcbiAgICAgICAgZ2VuZXJhbEdvYWwuYWRkRXhlYyhleGVjU3RydWN0LmNvbW1hbmQsIGV4ZWNTdHJ1Y3QuYXJncywgdGFyZ2V0LlRBUkdFVF9TQ09QRS5CSU5BUllfRElSLnRvU3RyaW5nKCkpO1xuICAgICAgfVxuICAgICAgXG4gICAgICBnb2FsTGlzdC5hZGQoZ2VuZXJhbEdvYWwpO1xuXG4gICAgICBjb25zdCB3b3JrZXIgPSBuZXcgR29hbFdvcmtlckltcGwobmFtZSk7XG4gICAgICB3b3JrZXIubWVzc2FnZSA9IGBCdWlsdCB0YXJnZXQgJHtuYW1lfWA7XG4gICAgICB3b3JrZXIuYWRkRGVwZW5kZW5jeSh0YXJnZXQuZ2V0RmlsZSgpLnRvU3RyaW5nKCkpO1xuICAgICAgZ29hbExpc3QuYWRkKHdvcmtlcik7XG4gICAgfVxuXG4gICAgaW50ZXJmYWNlIEluc3RhbGxHb2FsUGFyYW1zIHtcbiAgICAgIHNyYzogc3RyaW5nO1xuICAgICAgZGVzdDogc3RyaW5nO1xuICAgIH07XG5cbiAgICBjb25zdCBpbnN0YWxsUGFpcnMgPSBuZXcgQXJyYXk8SW5zdGFsbEdvYWxQYXJhbXM+O1xuICAgIGZvciAoY29uc3QgaXRlciBvZiB0aGlzW0lOU1RBTExfTElTVF0pIHtcbiAgICAgIGxldCBzcmM6IHN0cmluZywgZGVzdDogYW55O1xuICAgICAgaWYgKGl0ZXIuVkFMVUUgaW5zdGFuY2VvZiBBYnNvbHV0ZVBhdGgpIHtcbiAgICAgICAgaWYgKHNjb3BlLlBSRVZFTlRfSU5TVEFMTF9GSUxFUylcbiAgICAgICAgICBjb250aW51ZTtcbiAgICAgICAgc3JjID0gaXRlci5WQUxVRS50b1N0cmluZygpO1xuICAgICAgICBjb25zdCByZmlsZSA9IChpdGVyLkJBU0VfRElSIGFzIGFueSkucmVsYXRpdmUoaXRlci5WQUxVRSk7XG4gICAgICAgIGRlc3QgPSBpdGVyLkRFU1RJTkFUSU9OLmpvaW4ocmZpbGUpO1xuICAgICAgfVxuICAgICAgZWxzZSBpZiAoaXRlci5WQUxVRSBpbnN0YW5jZW9mIFBvc3RUYXJnZXQpIHtcbiAgICAgICAgY29uc3QgdGFyZ2V0TmFtZSA9IGl0ZXIuVkFMVUUudGFyZ2V0TmFtZTtcbiAgICAgICAgY29uc3QgdGFyZ2V0ID0gdGhpc1tUQVJHRVRTXS5nZXQodGFyZ2V0TmFtZSk7XG4gICAgICAgIHNyYyA9IHRhcmdldC5nZXRGaWxlKCkudG9TdHJpbmcoKTtcbiAgICAgICAgZGVzdCA9IGl0ZXIuREVTVElOQVRJT04uam9pbih0YXJnZXQuZ2V0RmlsZU5hbWUoKSk7XG4gICAgICB9XG4gICAgICBlbHNlIHtcbiAgICAgICAgdGhyb3cgbmV3IEVycm9yKGBDYW4gbm90IGluc3RhbGwgJHtpdGVyLlZBTFVFfWApXG4gICAgICB9XG4gICAgICBpZiAoc2NvcGUuREVTVERJUilcbiAgICAgICAgZGVzdCA9IHNjb3BlLkRFU1RESVIuam9pbihkZXN0KS50b1N0cmluZygpO1xuICAgICAgZGVzdCA9IGRlc3QudG9TdHJpbmcoKTtcbiAgICAgIGluc3RhbGxQYWlycy5wdXNoKHtzcmMsIGRlc3R9KTtcbiAgICB9XG5cbiAgICBpZiAoaW5zdGFsbFBhaXJzLmxlbmd0aCkge1xuICAgICAgY29uc3Qgd29ya2VyID0gbmV3IEdvYWxXb3JrZXJJbXBsKElOU1RBTExfVEFSR0VUKTtcbiAgICAgIGluc3RhbGxQYWlycy5mb3JFYWNoKGkgPT4gdm9pZCB3b3JrZXIuYWRkRGVwZW5kZW5jeShpLnNyYykpO1xuICAgICAgd29ya2VyLmFkZENhbGxiYWNrKGFzeW5jICgpID0+IHtcbiAgICAgICAgZm9yIChjb25zdCB7c3JjLCBkZXN0fSBvZiBpbnN0YWxsUGFpcnMpIHtcbiAgICAgICAgICBsb2dnZXIubm90aWNlKFwiSW5zdGFsbGluZzogXCIgKyBkZXN0KTtcbiAgICAgICAgICBhd2FpdCBmcy5wcm9taXNlcy5ta2RpcihQYXRoLmRpcm5hbWUoZGVzdCksIHsgcmVjdXJzaXZlOiB0cnVlIH0pO1xuICAgICAgICAgIGF3YWl0IGZzLnByb21pc2VzLmNwKHNyYy50b1N0cmluZygpLCBkZXN0LnRvU3RyaW5nKCksIHsgZm9yY2U6IHRydWUgfSk7XG4gICAgICAgIH1cbiAgICAgIH0pO1xuICAgICAgZ29hbExpc3QuYWRkKHdvcmtlcik7XG4gICAgfVxuXG4gICAgY29uc3Qgd29ya2VyID0gbmV3IEdvYWxXb3JrZXJJbXBsKEFMTF9UQVJHRVQpO1xuICAgIE9iamVjdC5rZXlzKHRoaXNbVEFSR0VUU10uRU5UUklFUykuZm9yRWFjaChpID0+IHZvaWQgd29ya2VyLmFkZERlcGVuZGVuY3koaSkpXG4gICAgZ29hbExpc3QuYWRkKHdvcmtlcik7XG4gIFxuICAgIHJldHVybiBnb2FsTGlzdDtcbiAgfVxuXG4gIHB1YmxpYyB0b0pTT04oKSB7XG4gICAgcmV0dXJuIHtcbiAgICAgIFRBUkdFVFM6IHRoaXMuVEFSR0VUUyxcbiAgICAgIENVU1RPTV9TQ1JJUFRTOiB0aGlzW0NVU1RPTV9TQ1JJUFRTXSxcbiAgICAgIENBQ0hFOiB0aGlzLkNBQ0hFLFxuICAgICAgaW50ZXJmYWNlU2NyaXB0czogdGhpcy5faW50ZXJmYWNlU2NyaXB0cyxcbiAgICAgIElOU1RBTExfTElTVDogdGhpc1tJTlNUQUxMX0xJU1RdLFxuICAgICAgcHJvY2Vzc2VkVmFyaWFibGVNYXA6IHRoaXMuX3Byb2Nlc3NlZFZhcmlhYmxlTWFwLFxuICAgICAgc3ViZGlyQWxpYXM6IHRoaXMuX3N1YmRpckFsaWFzLFxuICAgIH07XG4gIH1cbn07XG4iLCIvKlxuICogTUlUIExpY2Vuc2VcbiAqXG4gKiBDb3B5cmlnaHQgKGMpIDIwMjUgIFl1cmlpIFlha3ViaW4gKHl1cmlpLnlha3ViaW5AZ21haWwuY29tKVxuICpcbiAqIFBlcm1pc3Npb24gaXMgZ3JhbnRlZCB0byB1c2UsIGNvcHksIG1vZGlmeSwgYW5kIGRpc3RyaWJ1dGUgdGhpcyBzb2Z0d2FyZVxuICogdW5kZXIgdGhlIE1JVCBMaWNlbnNlLiBTZWUgTElDRU5TRSBmaWxlIGZvciBkZXRhaWxzLlxuICovXG5cbmltcG9ydCB7IEFic29sdXRlUGF0aCB9IGZyb20gXCJAL2NvcmUvQWJzb2x1dGVQYXRoXCI7XG5pbXBvcnQgeyBkZWVwQ29weSB9IGZyb20gXCJAL3V0aWxzL1ByaW1pdGl2ZXNcIjtcblxuaW50ZXJmYWNlIFZhcmlhYmxlRGVzY3JpcHRvciB7XG4gIHR5cGU/OiBzdHJpbmcgfCBzdHJpbmdbXTtcbiAgdmFsdWU/OiBhbnk7XG4gIGRlc2NyaXB0aW9uPzogc3RyaW5nO1xufTtcblxuaW50ZXJmYWNlIFZhcmlhYmxlRW50cnkge1xuICBuYW1lOiBzdHJpbmc7XG4gIHR5cGU6IHN0cmluZyB8IHN0cmluZ1tdO1xuICBncm91cDogc3RyaW5nO1xuICBkZXNjcmlwdGlvbjogc3RyaW5nO1xuICBpbml0VmFsdWU/OiBhbnk7XG4gIHZhbHVlPzogYW55O1xufTtcblxuZXhwb3J0IGludGVyZmFjZSBWYXJpYWJsZU1hcCB7XG4gIFsgbmFtZTogc3RyaW5nIF06IFZhcmlhYmxlRW50cnk7XG59O1xuXG5leHBvcnQgdHlwZSBWYXJpYW50ID0gYm9vbGVhbiB8IG51bWJlciB8IHN0cmluZyB8IGJvb2xlYW5bXSB8IG51bWJlcltdIHwgc3RyaW5nW107XG5leHBvcnQgdHlwZSBWYXJpYW50TWFwID0ge1xuICBbIG5hbWU6IHN0cmluZyBdOiBWYXJpYW50O1xufTtcblxuZXhwb3J0IG5hbWVzcGFjZSBTY29wZUhlbHBlciB7XG5cbmZ1bmN0aW9uIHRvRGVzY3JpcHRvcih2YWx1ZTogYW55KTogVmFyaWFibGVEZXNjcmlwdG9yIHtcbiAgaWYgKCF2YWx1ZSB8fCB0eXBlb2YgdmFsdWUgPT09IFwiYm9vbGVhblwiIHx8IHR5cGVvZiB2YWx1ZSA9PT0gXCJudW1iZXJcIiB8fCB0eXBlb2YgdmFsdWUgPT09IFwic3RyaW5nXCIgfHwgQXJyYXkuaXNBcnJheSh2YWx1ZSkpIHtcbiAgICByZXR1cm4geyB2YWx1ZSB9OyBcbiAgfVxuICByZXR1cm4gdmFsdWU7XG59XG5cbmV4cG9ydCBmdW5jdGlvbiBnZXRFbnRyeVZhbHVlKGVudHJ5OiBWYXJpYWJsZUVudHJ5KTogYW55IHtcbiAgLyppZiAodmFsdWUgPT09IHVuZGVmaW5lZClcbiAgICB0aHJvdyBuZXcgRXJyb3IoYFZhbHVlIG9mICR7bmFtZX0gY2Fubm90IGJlIG9idGFpbmVkIGJlY2F1c2UgaXQgaGFzIG5vdCBiZWVuIGVzdGFibGlzaGVkYCk7Ki9cbiAgcmV0dXJuIChlbnRyeS52YWx1ZSA9PT0gdW5kZWZpbmVkKSA/IGVudHJ5LmluaXRWYWx1ZSA6IGVudHJ5LnZhbHVlO1xufVxuXG5leHBvcnQgZnVuY3Rpb24gZ2V0KHZhcmlhYmxlTWFwOiBWYXJpYWJsZU1hcCwgbmFtZTogc3RyaW5nKTogYW55IHtcbiAgY29uc3QgZW50cnkgPSB2YXJpYWJsZU1hcFtuYW1lXTtcbiAgaWYgKGVudHJ5KVxuICAgIHJldHVybiBnZXRFbnRyeVZhbHVlKGVudHJ5KTtcbn1cblxuY29uc3QgbWFrZVZhbHVlTWFwOiBhbnkgPSB7XG4gIGFycmF5OiAodmFsdWU6IGFueSkgPT4ge1xuICAgIHJldHVybiBBcnJheS5pc0FycmF5KHZhbHVlKSA/IEFycmF5LmZyb20odmFsdWUpIDogdW5kZWZpbmVkO1xuICB9LFxuICBib29sZWFuOiAodmFsdWU6IGFueSkgPT4ge1xuICAgIHJldHVybiAodHlwZW9mIHZhbHVlID09PSBcImJvb2xlYW5cIikgPyB2YWx1ZSA6IHVuZGVmaW5lZDtcbiAgfSxcbiAgbnVtYmVyOiAodmFsdWU6IGFueSkgPT4ge1xuICAgIHJldHVybiAodHlwZW9mIHZhbHVlID09PSBcIm51bWJlclwiKSA/IHZhbHVlIDogdW5kZWZpbmVkO1xuICB9LFxuICBzdHJpbmc6ICh2YWx1ZTogYW55KSA9PiB7XG4gICAgcmV0dXJuICh0eXBlb2YgdmFsdWUgPT09IFwic3RyaW5nXCIpID8gdmFsdWUgOiB1bmRlZmluZWQ7XG4gIH0sXG4gIEFic29sdXRlUGF0aDogKHZhbHVlOiBhbnkpID0+IHtcbiAgICByZXR1cm4gQWJzb2x1dGVQYXRoLmNyZWF0ZSh2YWx1ZSk7XG4gIH0sXG4gIEZpbGVQYXRoOiAodmFsdWU6IGFueSkgPT4ge1xuICAgIHJldHVybiBBYnNvbHV0ZVBhdGguY3JlYXRlKHZhbHVlKTtcbiAgfSxcbiAgRGlyUGF0aDogKHZhbHVlOiBhbnkpID0+IHtcbiAgICByZXR1cm4gQWJzb2x1dGVQYXRoLmNyZWF0ZSh2YWx1ZSk7XG4gIH0sXG4gIG9iamVjdDogKHZhbHVlOiBhbnkpID0+IHtcbiAgICByZXR1cm4gdmFsdWU7XG4gIH0sXG59O1xuXG5jb25zdCB0b2pzb25WYWx1ZU1hcDogYW55ID0ge1xuICBhcnJheTogKHZhbHVlOiBhbnkpID0+IHtcbiAgICBjb25zdCByZXN1bHQgPSBbXTtcbiAgICBmb3IgKGNvbnN0IGl0ZXIgb2YgdmFsdWUpIHtcbiAgICAgIGlmIChpdGVyICYmIHR5cGVvZiBpdGVyID09PSBcIm9iamVjdFwiKVxuICAgICAgICByZXN1bHQucHVzaCh0eXBlb2YgaXRlci50b0pTT04gPT09IFwiZnVuY3Rpb25cIiA/IGl0ZXIudG9KU09OKCkgOiBkZWVwQ29weShpdGVyKSk7XG4gICAgICBlbHNlXG4gICAgICAgIHJlc3VsdC5wdXNoKGl0ZXIpO1xuICAgIH1cbiAgICByZXR1cm4gcmVzdWx0O1xuICB9LFxuICBib29sZWFuOiAodmFsdWU6IGFueSkgPT4ge1xuICAgIHJldHVybiB2YWx1ZTtcbiAgfSxcbiAgbnVtYmVyOiAodmFsdWU6IGFueSkgPT4ge1xuICAgIHJldHVybiB2YWx1ZTtcbiAgfSxcbiAgc3RyaW5nOiAodmFsdWU6IGFueSkgPT4ge1xuICAgIHJldHVybiB2YWx1ZTtcbiAgfSxcbiAgQWJzb2x1dGVQYXRoOiAodmFsdWU6IGFueSkgPT4ge1xuICAgIHJldHVybiB2YWx1ZS50b0pTT04oKTtcbiAgfSxcbiAgRmlsZVBhdGg6ICh2YWx1ZTogYW55KSA9PiB7XG4gICAgcmV0dXJuIHZhbHVlLnRvSlNPTigpO1xuICB9LFxuICBEaXJQYXRoOiAodmFsdWU6IGFueSkgPT4ge1xuICAgIHJldHVybiB2YWx1ZS50b0pTT04oKTtcbiAgfSxcbiAgb2JqZWN0OiAodmFsdWU6IGFueSkgPT4ge1xuICAgIHJldHVybiBkZWVwQ29weSh2YWx1ZSk7XG4gIH0sXG59O1xuXG5leHBvcnQgZnVuY3Rpb24gbWFrZUpTT05WYWx1ZShlbnRyeTogVmFyaWFibGVFbnRyeSwgdmFsdWU6IGFueSk6IGFueSB7XG4gIGlmIChBcnJheS5pc0FycmF5KGVudHJ5LnR5cGUpKVxuICAgIHJldHVybiB2YWx1ZTtcbiAgY29uc3QgZnVuYyA9IHRvanNvblZhbHVlTWFwW2VudHJ5LnR5cGVdO1xuICBpZiAoIWZ1bmMpXG4gICAgdGhyb3cgbmV3IEVycm9yKGBVbmtub3duIHR5cGUgXCIke2VudHJ5LnR5cGV9XCIgZm9yICR7ZW50cnkubmFtZX1gKTtcbiAgcmV0dXJuIGZ1bmModmFsdWUpO1xufVxuXG5leHBvcnQgZnVuY3Rpb24gbWFrZUVudHJ5VmFsdWUoZW50cnk6IFZhcmlhYmxlRW50cnksIHZhbHVlOiBhbnkpOiBhbnkge1xuICBsZXQgbmV3VmFsdWU6IGFueTtcbiAgaWYgKEFycmF5LmlzQXJyYXkoZW50cnkudHlwZSkpXG4gICAgbmV3VmFsdWUgPSBlbnRyeS50eXBlLmluY2x1ZGVzKHZhbHVlKSA/IHZhbHVlIDogdW5kZWZpbmVkO1xuICBlbHNlIHtcbiAgICBjb25zdCBmdW5jID0gbWFrZVZhbHVlTWFwW2VudHJ5LnR5cGVdO1xuICAgIGlmICghZnVuYylcbiAgICAgIHRocm93IG5ldyBFcnJvcihgVW5rbm93biB0eXBlIFwiJHtlbnRyeS50eXBlfVwiIGZvciAke2VudHJ5Lm5hbWV9YCk7XG4gICAgbmV3VmFsdWUgPSBmdW5jKHZhbHVlKTtcbiAgfVxuICBpZiAobmV3VmFsdWUgPT09IHVuZGVmaW5lZClcbiAgICB0aHJvdyBuZXcgVHlwZUVycm9yKGBBdHRlbXB0aW5nIHRvIHNldCBcIiR7dmFsdWV9XCIgdG8gJHtlbnRyeS5uYW1lfSBhcyBhbiAke2VudHJ5LnR5cGV9YCk7XG4gIHJldHVybiBuZXdWYWx1ZTtcbn1cblxuZXhwb3J0IGZ1bmN0aW9uIGNvcHlFbnRyeVZhbHVlKGVudHJ5OiBWYXJpYWJsZUVudHJ5LCB0cmFuc2Zvcm06IChlbnRyeTogVmFyaWFibGVFbnRyeSwgdmFsdWU6IGFueSkgPT4gYW55KSB7XG4gIGNvbnN0IHJlc3VsdDogVmFyaWFibGVFbnRyeSA9IHtcbiAgICBuYW1lOiBlbnRyeS5uYW1lLFxuICAgIHR5cGU6IGVudHJ5LnR5cGUsXG4gICAgZ3JvdXA6IGVudHJ5Lmdyb3VwLFxuICAgIGRlc2NyaXB0aW9uOiBlbnRyeS5kZXNjcmlwdGlvbixcbiAgfTtcbiAgaWYgKGVudHJ5LmluaXRWYWx1ZSAhPT0gdW5kZWZpbmVkKVxuICAgIHJlc3VsdC5pbml0VmFsdWUgPSB0cmFuc2Zvcm0oZW50cnksIGVudHJ5LmluaXRWYWx1ZSk7XG4gIGlmIChlbnRyeS52YWx1ZSAhPT0gdW5kZWZpbmVkKVxuICAgIHJlc3VsdC52YWx1ZSA9IHRyYW5zZm9ybShlbnRyeSwgZW50cnkudmFsdWUpO1xuICByZXR1cm4gcmVzdWx0O1xufVxuXG5leHBvcnQgZnVuY3Rpb24gZnJvbUpTT04odmFyaWFibGVNYXA6IFZhcmlhYmxlTWFwKTogVmFyaWFibGVNYXAge1xuICBjb25zdCByZXN1bHQ6IFZhcmlhYmxlTWFwID0ge307XG4gIGZvciAoY29uc3QgW2tleSwgdmFsXSBvZiBPYmplY3QuZW50cmllcyh2YXJpYWJsZU1hcCkpXG4gICAgcmVzdWx0W2tleV0gPSBjb3B5RW50cnlWYWx1ZSh2YWwsIG1ha2VFbnRyeVZhbHVlKTtcbiAgcmV0dXJuIHJlc3VsdDtcbn1cblxuZXhwb3J0IGZ1bmN0aW9uIHRvSlNPTih2YXJpYWJsZU1hcDogVmFyaWFibGVNYXApOiBWYXJpYWJsZU1hcCB7XG4gIGNvbnN0IHJlc3VsdDogVmFyaWFibGVNYXAgPSB7fTtcbiAgZm9yIChjb25zdCBba2V5LCB2YWxdIG9mIE9iamVjdC5lbnRyaWVzKHZhcmlhYmxlTWFwKSlcbiAgICByZXN1bHRba2V5XSA9IGNvcHlFbnRyeVZhbHVlKHZhbCwgbWFrZUpTT05WYWx1ZSk7XG4gIHJldHVybiByZXN1bHQ7XG59XG5cbmV4cG9ydCBmdW5jdGlvbiBzZXRFbnRyeVZhbHVlKGVudHJ5OiBWYXJpYWJsZUVudHJ5LCB2YWx1ZTogYW55KTogYW55IHtcbiAgZW50cnkudmFsdWUgPSBtYWtlRW50cnlWYWx1ZShlbnRyeSwgdmFsdWUpO1xufVxuXG5leHBvcnQgZnVuY3Rpb24gc2V0KHZhcmlhYmxlTWFwOiBWYXJpYWJsZU1hcCwgbmFtZTogc3RyaW5nLCB2YWx1ZTogYW55KTogdm9pZCB7XG4gIGNvbnN0IGVudHJ5ID0gdmFyaWFibGVNYXBbbmFtZV07XG4gIGlmICghZW50cnkpXG4gICAgdGhyb3cgbmV3IEVycm9yKGBWYXJpYWJsZSBcIiR7bmFtZX1cIiBkb2VzIG5vdCBleGlzdHNgKTtcbiAgc2V0RW50cnlWYWx1ZShlbnRyeSwgdmFsdWUpO1xufVxuXG5leHBvcnQgZnVuY3Rpb24gcmVzZXQodmFyaWFibGVNYXA6IFZhcmlhYmxlTWFwLCBuYW1lOiBzdHJpbmcpOiB2b2lkIHtcbiAgY29uc3QgZW50cnkgPSB2YXJpYWJsZU1hcFtuYW1lXTtcbiAgaWYgKCFlbnRyeSlcbiAgICB0aHJvdyBuZXcgRXJyb3IoYFZhcmlhYmxlIFwiJHtuYW1lfVwiIGRvZXMgbm90IGV4aXN0c2ApO1xuICBlbnRyeS52YWx1ZSA9IHVuZGVmaW5lZDtcbn1cblxuZXhwb3J0IGZ1bmN0aW9uIGRlZmluZVZhcmlhYmxlKG1hcDogVmFyaWFibGVNYXAsIGdyb3VwOiBzdHJpbmcsIG5hbWU6IHN0cmluZywgZGVzY3JpcHRvcjogVmFyaWFibGVEZXNjcmlwdG9yKSB7XG4gIGxldCBkZWZpbmVFbnRyeSA9IG1hcFtuYW1lXTtcbiAgbGV0IGlzVmFsaWRWYWx1ZSA9ICh2YWx1ZTogYW55KSA9PiB0cnVlO1xuICBpZiAoIWRlZmluZUVudHJ5KSB7XG4gICAgZGVmaW5lRW50cnkgPSB7XG4gICAgICBuYW1lLFxuICAgICAgdHlwZTogXCJcIiwgZ3JvdXAsIHZhbHVlOiB1bmRlZmluZWQsICBpbml0VmFsdWU6IHVuZGVmaW5lZCwgZGVzY3JpcHRpb246IFwiXCIsXG4gICAgfTtcbiAgICBtYXBbbmFtZV0gPSBkZWZpbmVFbnRyeTtcbiAgfVxuICBlbHNlIGlmIChncm91cCAhPT0gZGVmaW5lRW50cnkuZ3JvdXApIHtcbiAgICBpZiAoZGVmaW5lRW50cnkuZ3JvdXApXG4gICAgICB0aHJvdyBuZXcgRXJyb3IoYEF0dGVtcHRpbmcgdG8gcmVjcmVhdGUgXCIke25hbWV9XCIgdmFyaWFibGUgd2l0aCBcIiR7ZGVmaW5lRW50cnkuZ3JvdXB9XCIgZ3JvdXAgaW4gYW5vdGhlciBcIiR7Z3JvdXB9XCJgKTtcbiAgICBkZWZpbmVFbnRyeS5ncm91cCA9IGdyb3VwO1xuICB9XG5cbiAgZGVmaW5lRW50cnkudHlwZSA9IGRlc2NyaXB0b3IudHlwZSB8fCBkZWZpbmVFbnRyeS50eXBlO1xuICBkZWZpbmVFbnRyeS5kZXNjcmlwdGlvbiA9IGRlc2NyaXB0b3IuZGVzY3JpcHRpb24gfHwgZGVmaW5lRW50cnkuZGVzY3JpcHRpb247XG5cbiAgbGV0IHR5cGU6IHN0cmluZyB8IHN0cmluZ1tdO1xuICBpZiAoZGVmaW5lRW50cnkudHlwZSlcbiAgICB0eXBlID0gZGVmaW5lRW50cnkudHlwZTtcbiAgZWxzZSBpZiAoQXJyYXkuaXNBcnJheShkZXNjcmlwdG9yLnZhbHVlKSlcbiAgICB0eXBlID0gXCJhcnJheVwiO1xuICBlbHNlIGlmIChkZXNjcmlwdG9yLnZhbHVlIGluc3RhbmNlb2YgQWJzb2x1dGVQYXRoKVxuICAgIHR5cGUgPSBcIkFic29sdXRlUGF0aFwiO1xuICBlbHNlXG4gICAgdHlwZSA9IHR5cGVvZiBkZXNjcmlwdG9yLnZhbHVlO1xuXG4gIGlmIChBcnJheS5pc0FycmF5KHR5cGUpKSB7XG4gICAgY29uc3QgZW51bUxpc3QgPSB0eXBlO1xuICAgIGxldCBpdGVtVHlwZTtcbiAgICBmb3IgKGNvbnN0IGl0ZXIgb2YgZW51bUxpc3QpIHtcbiAgICAgIGNvbnN0IGl0ID0gdHlwZW9mIGl0ZXI7XG4gICAgICBpZiAoIWl0ZW1UeXBlKVxuICAgICAgICBpdGVtVHlwZSA9IGl0O1xuICAgICAgZWxzZSBpZiAoaXRlbVR5cGUgIT09IGl0KVxuICAgICAgICB0aHJvdyBuZXcgRXJyb3IoYEFsbCBlbGVtZW50cyBmb3IgJHtuYW1lfSBtdXN0IGJlIG9mIHRoZSBzYW1lIHR5cGVgKTtcbiAgICB9XG4gICAgaWYgKGl0ZW1UeXBlICE9PSBcImJvb2xlYW5cIiAmJiBpdGVtVHlwZSAhPT0gXCJudW1iZXJcIiAmJiBpdGVtVHlwZSAhPT0gXCJzdHJpbmdcIilcbiAgICAgIHRocm93IG5ldyBFcnJvcihgRW51bSAke25hbWV9IG5vdCBzdXBwb3J0ICR7aXRlbVR5cGV9IHR5cGVgKTtcbiAgICBpc1ZhbGlkVmFsdWUgPSAodmFsdWU6IGFueSkgPT4gZW51bUxpc3QuaW5jbHVkZXModmFsdWUpO1xuICB9XG4gIGVsc2UgaWYgKHR5cGUgPT09IFwiYm9vbGVhblwiKSB7XG4gICAgaXNWYWxpZFZhbHVlID0gKHZhbHVlOiBhbnkpID0+IHR5cGVvZiB2YWx1ZSA9PT0gXCJib29sZWFuXCI7XG4gIH1cbiAgZWxzZSBpZiAodHlwZSA9PT0gXCJudW1iZXJcIikge1xuICAgIGlzVmFsaWRWYWx1ZSA9ICh2YWx1ZTogYW55KSA9PiB0eXBlb2YgdmFsdWUgPT09IFwibnVtYmVyXCI7XG4gIH1cbiAgZWxzZSBpZiAodHlwZSA9PT0gXCJzdHJpbmdcIikge1xuICAgIGlzVmFsaWRWYWx1ZSA9ICh2YWx1ZTogYW55KSA9PiB0eXBlb2YgdmFsdWUgPT09IFwic3RyaW5nXCI7XG4gIH1cbiAgZWxzZSBpZiAodHlwZSA9PT0gXCJhcnJheVwiKSB7XG4gICAgaXNWYWxpZFZhbHVlID0gQXJyYXkuaXNBcnJheTtcbiAgfVxuICBlbHNlIGlmICh0eXBlID09PSBcIkFic29sdXRlUGF0aFwiIHx8IHR5cGUgPT09IFwiRmlsZVBhdGhcIiB8fCB0eXBlID09PSBcIkRpclBhdGhcIikge1xuICAgIGlzVmFsaWRWYWx1ZSA9ICh2YWx1ZTogYW55KSA9PiAhIUFic29sdXRlUGF0aC5jcmVhdGUodmFsdWUpO1xuICB9XG4gIGVsc2UgaWYgKHR5cGUgIT09IFwib2JqZWN0XCIgJiYgdHlwZSAhPT0gXCJlbnVtXCIpIHtcbiAgICB0aHJvdyBuZXcgRXJyb3IoYFZhcmlhYmxlIFwiJHtuYW1lfVwiIGhhcyB3cm9uZyBcIiR7dHlwZX1cIiB0eXBlYCk7XG4gIH1cblxuICBpZiAoZGVzY3JpcHRvci52YWx1ZSA9PT0gdW5kZWZpbmVkKSB7XG4gICAgZGVmaW5lRW50cnkuaW5pdFZhbHVlID0gKHR5cGUgPT09IFwiYXJyYXlcIikgPyBbXSA6IHVuZGVmaW5lZDtcbiAgfVxuICBlbHNlIHtcbiAgICBpZiAoIWlzVmFsaWRWYWx1ZShkZXNjcmlwdG9yLnZhbHVlKSlcbiAgICAgICAgdGhyb3cgbmV3IFR5cGVFcnJvcihgQXR0ZW1wdGluZyB0byBzZXQgXCIke2Rlc2NyaXB0b3IudmFsdWV9XCIgdG8gJHtuYW1lfSBhcyBpbml0VmFsdWVgKTtcbiAgICBkZWZpbmVFbnRyeS5pbml0VmFsdWUgPSAodHlwZSA9PT0gXCJhcnJheVwiKSA/IEFycmF5LmZyb20oZGVzY3JpcHRvci52YWx1ZSkgOiBkZXNjcmlwdG9yLnZhbHVlO1xuICB9XG5cbiAgZGVmaW5lRW50cnkudHlwZSA9IHR5cGU7XG4gIGlmIChkZWZpbmVFbnRyeS5pbml0VmFsdWUgIT09IHVuZGVmaW5lZCkge1xuICAgIGRlZmluZUVudHJ5LmluaXRWYWx1ZSA9IG1ha2VFbnRyeVZhbHVlKGRlZmluZUVudHJ5LCBkZWZpbmVFbnRyeS5pbml0VmFsdWUpO1xuICB9XG4gIGlmIChkZWZpbmVFbnRyeS52YWx1ZSAhPT0gdW5kZWZpbmVkKSB7XG4gICAgZGVmaW5lRW50cnkudmFsdWUgPSBtYWtlRW50cnlWYWx1ZShkZWZpbmVFbnRyeSwgZGVmaW5lRW50cnkudmFsdWUpO1xuICB9XG59XG5cbmV4cG9ydCBmdW5jdGlvbiBjcmVhdGVQcm94eTxUPihtYXA6IFZhcmlhYmxlTWFwLCBvPzogYW55KTogVCB7XG4gIG8gPSBvIHx8IHt9O1xuICBjb25zdCBoYW5kbGVyOiBQcm94eUhhbmRsZXI8YW55PiA9IHtcbiAgICBnZXQodGFyZ2V0OiBWYXJpYWJsZU1hcCwga2V5OiBzdHJpbmcsIHJlY2VpdmVyOiBhbnkpIHtcbiAgICAgIGNvbnN0IGVudHJ5ID0gdGFyZ2V0W2tleV07XG4gICAgICBpZiAoZW50cnkpXG4gICAgICAgIHJldHVybiBnZXRFbnRyeVZhbHVlKGVudHJ5KTtcbiAgICAgIHJldHVybiBvW2tleV07XG4gICAgfSxcbiAgICBzZXQodGFyZ2V0OiBWYXJpYWJsZU1hcCwga2V5OiBzdHJpbmcsIHZhbHVlOiBhbnkpOiBib29sZWFuIHtcbiAgICAgIGNvbnN0IGVudHJ5ID0gdGFyZ2V0W2tleV07XG4gICAgICBpZiAoZW50cnkpXG4gICAgICAgIHNldEVudHJ5VmFsdWUoZW50cnksIHZhbHVlKTtcbiAgICAgIGVsc2VcbiAgICAgICAgZGVmaW5lVmFyaWFibGUodGFyZ2V0LCBcIlwiLCBrZXksIHRvRGVzY3JpcHRvcih2YWx1ZSkpO1xuICAgICAgcmV0dXJuIHRydWU7XG4gICAgfSxcbiAgICBoYXModGFyZ2V0OiBWYXJpYWJsZU1hcCwga2V5OiBzdHJpbmcpIHtcbiAgICAgIHJldHVybiB0YXJnZXQuaGFzT3duUHJvcGVydHkoa2V5KSB8fCAoa2V5IGluIHRhcmdldCk7XG4gICAgfSxcbiAgICBvd25LZXlzKHRhcmdldDogVmFyaWFibGVNYXApIHtcbiAgICAgIHJldHVybiBPYmplY3Qua2V5cyh0YXJnZXQpO1xuICAgIH0sXG4gICAgZGVsZXRlUHJvcGVydHkodGFyZ2V0OiBWYXJpYWJsZU1hcCwga2V5OiBzdHJpbmcpIHtcbiAgICAgIHRocm93IG5ldyBFcnJvcihgQ2Fubm90IGRlbGV0ZSAke2tleX0gdmFsdWVgKTtcbiAgICB9LFxuICB9O1xuICByZXR1cm4gbmV3IFByb3h5KG1hcCwgaGFuZGxlcik7XG59XG5cbmV4cG9ydCBmdW5jdGlvbiBjbG9uZVZhcmlhYmxlTWFwKG1hcDogVmFyaWFibGVNYXApIHtcbiAgY29uc3QgcmVzdWx0OiBWYXJpYWJsZU1hcCA9IHt9O1xuICBmb3IgKGNvbnN0IFsgbmFtZSwgZW50cnkgXSBvZiBPYmplY3QuZW50cmllcyhtYXApKSB7XG4gICAgZGVmaW5lVmFyaWFibGUocmVzdWx0LCBlbnRyeS5ncm91cCwgbmFtZSwge1xuICAgICAgdHlwZTogZW50cnkudHlwZSxcbiAgICAgIGRlc2NyaXB0aW9uOiBlbnRyeS5kZXNjcmlwdGlvbixcbiAgICAgIHZhbHVlOiBlbnRyeS5pbml0VmFsdWUsXG4gICAgfSk7XG4gICAgaWYgKGdldEVudHJ5VmFsdWUoZW50cnkpICE9PSB1bmRlZmluZWQpXG4gICAgICByZXN1bHRbbmFtZV0udmFsdWUgPSBnZXRFbnRyeVZhbHVlKGVudHJ5KTtcbiAgfVxuICByZXR1cm4gcmVzdWx0O1xufVxuXG5leHBvcnQgZnVuY3Rpb24gZXh0ZW5kVmFyaWFibGVNYXBCeVZhbHVlcyhtYXA6IFZhcmlhYmxlTWFwLCBncm91cDogc3RyaW5nLCB2YWx1ZXM6IHsgWyBrZXk6IHN0cmluZyBdOiBhbnkgfSkge1xuICBmb3IgKGNvbnN0IFtuYW1lLCB2YWx1ZV0gb2YgT2JqZWN0LmVudHJpZXModmFsdWVzKSkge1xuICAgIGRlZmluZVZhcmlhYmxlKG1hcCwgZ3JvdXAsIG5hbWUsIHsgdmFsdWUgfSk7XG4gICAgbWFwW25hbWVdLnZhbHVlID0gdmFsdWU7XG4gIH1cbn1cblxuZXhwb3J0IGZ1bmN0aW9uIGRlZmluZVZhcmlhYmxlc0luVmFyaWFibGVNYXAobWFwOiBWYXJpYWJsZU1hcCwgZ3JvdXA6IHN0cmluZywgdmFyaWFibGVzOiBhbnkpIHtcbiAgZm9yIChjb25zdCBbbmFtZSwgdmFsdWVdIG9mIE9iamVjdC5lbnRyaWVzKHZhcmlhYmxlcykpIHtcbiAgICBjb25zdCBkZXNjcmlwdG9yID0gdmFsdWUgJiYgdHlwZW9mIHZhbHVlID09PSBcIm9iamVjdFwiID8gdmFsdWUgOiB7dmFsdWUgfTtcbiAgICBkZWZpbmVWYXJpYWJsZShtYXAsIGdyb3VwLCBuYW1lLCBkZXNjcmlwdG9yKTtcbiAgfVxufVxuXG5leHBvcnQgZnVuY3Rpb24gZ2V0VmFyaWFibGVzQnlHcm91cChtYXA6IFZhcmlhYmxlTWFwLCBncm91cD86IHN0cmluZykge1xuICBjb25zdCByZXN1bHQ6IGFueSA9IHt9O1xuICBmb3IgKGNvbnN0IFsgbmFtZSwgZW50cnkgXSBvZiBPYmplY3QuZW50cmllcyhtYXApKSB7XG4gICAgaWYgKGdyb3VwICE9PSB1bmRlZmluZWQgJiYgZW50cnkuZ3JvdXAgJiYgZW50cnkuZ3JvdXAgIT09IGdyb3VwKVxuICAgICAgY29udGludWU7XG4gICAgcmVzdWx0W25hbWVdID0ge1xuICAgICAgdHlwZTogZW50cnkudHlwZSxcbiAgICAgIGRlc2NyaXB0aW9uOiBlbnRyeS5kZXNjcmlwdGlvbixcbiAgICAgIHZhbHVlOiBnZXRFbnRyeVZhbHVlKGVudHJ5KSxcbiAgICB9O1xuICB9XG4gIHJldHVybiByZXN1bHQ7XG59XG5cbmV4cG9ydCBmdW5jdGlvbiBjcmVhdGVWYXJpYWJsZVZhbHVlcyhtYXA6IFZhcmlhYmxlTWFwLCBncm91cD86IHN0cmluZyk6IGFueSB7XG4gIGNvbnN0IHJlc3VsdDogYW55ID0ge307XG4gIGZvciAoY29uc3QgWyBuYW1lLCBlbnRyeSBdIG9mIE9iamVjdC5lbnRyaWVzKG1hcCkpIHtcbiAgICBpZiAoIWdyb3VwIHx8IGdyb3VwID09PSBlbnRyeS5ncm91cClcbiAgICAgIHJlc3VsdFtuYW1lXSA9IGdldEVudHJ5VmFsdWUoZW50cnkpO1xuICB9XG4gIHJldHVybiByZXN1bHQ7XG59XG5cbmV4cG9ydCBmdW5jdGlvbiBtZXJnZVZhcmlhYmxlcyh0YXJnZXQ6IGFueSwgc291cmNlOiBhbnkpOiBvYmplY3Qge1xuICBpZiAoIXRhcmdldCB8fCB0eXBlb2YgdGFyZ2V0ICE9PSBcIm9iamVjdFwiKVxuICAgIHRocm93IG5ldyBFcnJvcihgVGFyZ2V0ICR7dGFyZ2V0fSBpcyBub3Qgb2JqZWN0YCk7XG4gIGlmICghc291cmNlIHx8IHR5cGVvZiBzb3VyY2UgIT09IFwib2JqZWN0XCIpXG4gICAgdGhyb3cgbmV3IEVycm9yKGBTb3VyY2UgJHtzb3VyY2V9IGlzIG5vdCBvYmplY3RgKTtcbiAgZm9yIChjb25zdCBbIGtleSwgdmFsIF0gb2YgT2JqZWN0LmVudHJpZXMoc291cmNlKSkge1xuICAgIGlmICghT2JqZWN0Lmhhc093bih0YXJnZXQsIGtleSkpIHtcbiAgICAgIHRhcmdldFtrZXldID0gdmFsO1xuICAgIH1cbiAgICBlbHNlIGlmIChBcnJheS5pc0FycmF5KHRhcmdldFtrZXldKSkge1xuICAgICAgaWYgKCFBcnJheS5pc0FycmF5KHZhbCkpXG4gICAgICAgIHRocm93IG5ldyBFcnJvcihgU291cmNlICR7a2V5fSBoYXMgJHt2YWx9IHdoaWNoIGlzIG5vdCBhbiBhcnJheWApO1xuICAgICAgZm9yIChjb25zdCBpdGVyIG9mIHZhbClcbiAgICAgICAgdGFyZ2V0W2tleV0ucHVzaChpdGVyKTtcbiAgICB9XG4gICAgZWxzZSBpZiAodGFyZ2V0W2tleV0gJiYgdHlwZW9mIHRhcmdldFtrZXldID09PSBcIm9iamVjdFwiKSB7XG4gICAgICBpZiAoIXZhbCB8fCB0eXBlb2YgdmFsICE9PSBcIm9iamVjdFwiKVxuICAgICAgICB0aHJvdyBuZXcgRXJyb3IoYFNvdXJjZSAke2tleX0gaGFzICR7dmFsfSB3aGljaCBpcyBub3QgYW4gb2JqZWN0YCk7XG4gICAgICBtZXJnZVZhcmlhYmxlcyh0YXJnZXRba2V5XSwgdmFsKTtcbiAgICB9XG4gICAgZWxzZSB7XG4gICAgICB0aHJvdyBuZXcgRXJyb3IoYFNvdXJjZSAke2tleX0gaGFzICR7dmFsfSB3aGljaCBpcyBub3QgJHt0eXBlb2YgdGFyZ2V0W2tleV19YCk7XG4gICAgfVxuICB9XG4gIHJldHVybiB0YXJnZXQ7XG59XG5cbmV4cG9ydCBmdW5jdGlvbiBtZXJnZVZhcmlhYmxlTWFwKHRhcmdldDogVmFyaWFibGVNYXAsIHNvdXJjZTogYW55KTogVmFyaWFibGVNYXAge1xuICBmb3IgKGNvbnN0IFtuYW1lLCB2YWx1ZV0gb2YgT2JqZWN0LmVudHJpZXMoc291cmNlKSkge1xuICAgIGxldCBlbnRyeSA9IHRhcmdldFtuYW1lXTtcbiAgICBpZiAoIWVudHJ5KVxuICAgICAgZGVmaW5lVmFyaWFibGUodGFyZ2V0LCBcIlwiLCBuYW1lLCB7IHZhbHVlIH0pO1xuICAgIGVsc2Uge1xuICAgICAgbGV0IGRlc3QgPSBnZXRFbnRyeVZhbHVlKGVudHJ5KTtcbiAgICAgIHNldEVudHJ5VmFsdWUoZW50cnksIChkZXN0ICYmIHR5cGVvZiBkZXN0ID09PSBcIm9iamVjdFwiKSA/IG1lcmdlVmFyaWFibGVzKGRlc3QsIHZhbHVlKSA6IHZhbHVlKTtcbiAgICB9XG4gIH1cbiAgcmV0dXJuIHRhcmdldDtcbn1cblxufSAvLyBTY29wZUhlbHBlclxuIiwiLypcbiAqIE1JVCBMaWNlbnNlXG4gKlxuICogQ29weXJpZ2h0IChjKSAyMDI1ICBZdXJpaSBZYWt1YmluICh5dXJpaS55YWt1YmluQGdtYWlsLmNvbSlcbiAqXG4gKiBQZXJtaXNzaW9uIGlzIGdyYW50ZWQgdG8gdXNlLCBjb3B5LCBtb2RpZnksIGFuZCBkaXN0cmlidXRlIHRoaXMgc29mdHdhcmVcbiAqIHVuZGVyIHRoZSBNSVQgTGljZW5zZS4gU2VlIExJQ0VOU0UgZmlsZSBmb3IgZGV0YWlscy5cbiAqL1xuXG5pbXBvcnQgeyBDdXN0b21TY3JpcHQgfSBmcm9tIFwiQC9jb3JlL0N1c3RvbVNjcmlwdFwiO1xuXG5jb25zdCBNQVAgPSBTeW1ib2woXCJNQVBcIik7XG5jb25zdCBFTlRSSUVTID0gU3ltYm9sKFwiRU5UUklFU1wiKTtcblxuZXhwb3J0IGNsYXNzIFNjcmlwdENvbGxlY3Rpb24ge1xuICBwcml2YXRlIFtNQVBdOiB7IFtuYW1lOiBzdHJpbmddOiBDdXN0b21TY3JpcHQgfTtcbiAgcHJpdmF0ZSBbRU5UUklFU106IEN1c3RvbVNjcmlwdFtdO1xuXG4gIHByaXZhdGUgY29uc3RydWN0b3IoKSB7XG4gICAgdGhpc1tNQVBdID0ge307XG4gICAgdGhpc1tFTlRSSUVTXSA9IFtdO1xuICB9XG5cbiAgcHVibGljIHN0YXRpYyBjcmVhdGUoKSB7XG4gICAgcmV0dXJuIE9iamVjdC5zZWFsKG5ldyBTY3JpcHRDb2xsZWN0aW9uKTtcbiAgfVxuXG4gIHB1YmxpYyBnZXQgRU5UUklFUygpIHtcbiAgICByZXR1cm4gdGhpc1tFTlRSSUVTXTtcbiAgfVxuXG4gIHB1YmxpYyBnZXQobmFtZTogc3RyaW5nKTogQ3VzdG9tU2NyaXB0IHwgdW5kZWZpbmVkIHtcbiAgICByZXR1cm4gdGhpc1tNQVBdW25hbWVdO1xuICB9XG5cbiAgcHVibGljIHNldChuYW1lOiBzdHJpbmcsIHRhcmdldDogQ3VzdG9tU2NyaXB0KSB7XG4gICAgaWYgKCFuYW1lKVxuICAgICAgdGhyb3cgbmV3IEVycm9yKFwiTm90IHN1cHBvcnRlZCBlbXB0eSBuYW1lIGZvciBDdXN0b21TY3JpcHRcIik7XG4gICAgaWYgKHRoaXNbTUFQXVtuYW1lXSlcbiAgICAgIHRocm93IG5ldyBFcnJvcihgU2NyaXB0IFwiJHtuYW1lfVwiIGV4aXN0c2ApO1xuICAgIHRoaXNbTUFQXVtuYW1lXSA9IHRhcmdldDtcbiAgICB0aGlzW0VOVFJJRVNdLnB1c2godGFyZ2V0KTtcbiAgfVxuXG4gIHB1YmxpYyBhZGQodGFyZ2V0OiBDdXN0b21TY3JpcHQpIHtcbiAgICB0aGlzW0VOVFJJRVNdLnB1c2godGFyZ2V0KTtcbiAgfVxuICBcbiAgcHVibGljIHRvSlNPTigpOiBvYmplY3Qge1xuICAgIHJldHVybiB0aGlzW0VOVFJJRVNdO1xuICB9XG59O1xuIiwiLypcbiAqIE1JVCBMaWNlbnNlXG4gKlxuICogQ29weXJpZ2h0IChjKSAyMDI1ICBZdXJpaSBZYWt1YmluICh5dXJpaS55YWt1YmluQGdtYWlsLmNvbSlcbiAqXG4gKiBQZXJtaXNzaW9uIGlzIGdyYW50ZWQgdG8gdXNlLCBjb3B5LCBtb2RpZnksIGFuZCBkaXN0cmlidXRlIHRoaXMgc29mdHdhcmVcbiAqIHVuZGVyIHRoZSBNSVQgTGljZW5zZS4gU2VlIExJQ0VOU0UgZmlsZSBmb3IgZGV0YWlscy5cbiAqL1xuXG5pbXBvcnQgeyBQcm9qZWN0Q29udGV4dCB9IGZyb20gXCJAL2NvcmUvUHJvamVjdENvbnRleHRcIjtcbmltcG9ydCB7IFZhcmlhYmxlTWFwIH0gZnJvbSBcIkAvY29yZS9TY29wZVwiO1xuaW1wb3J0IHsgR2VuZXJhbENvbnRleHQsIGNyZWF0ZUNvbnRleHQgfSBmcm9tIFwiQC9jb3JlL0Jhc2VDb250ZXh0XCI7XG5cbmNvbnN0IEdMT0JBTCA9IFN5bWJvbChcIkdMT0JBTFwiKTtcbmNvbnN0IFNDT1BFID0gU3ltYm9sKFwiU0NPUEVcIik7XG5cbmV4cG9ydCBjbGFzcyBTY3JpcHRDb250ZXh0IGV4dGVuZHMgR2VuZXJhbENvbnRleHQge1xuICBbU0NPUEVdOiBWYXJpYWJsZU1hcDtcbiAgW0dMT0JBTF06IFByb2plY3RDb250ZXh0O1xuXG4gIGNvbnN0cnVjdG9yKGdsb2JhbDogUHJvamVjdENvbnRleHQsIHNjb3BlOiBWYXJpYWJsZU1hcCkge1xuICAgIHN1cGVyKHNjb3BlKTtcbiAgICB0aGlzW1NDT1BFXSA9IHNjb3BlO1xuICAgIHRoaXNbR0xPQkFMXSA9IGdsb2JhbDtcbiAgfVxuXG4gIHB1YmxpYyBzdGF0aWMgY3JlYXRlKGdsb2JhbDogUHJvamVjdENvbnRleHQsIHZhcmlhYmxlTWFwOiBWYXJpYWJsZU1hcCkge1xuICAgIHJldHVybiBjcmVhdGVDb250ZXh0KG5ldyBTY3JpcHRDb250ZXh0KGdsb2JhbCwgdmFyaWFibGVNYXApKTtcbiAgfVxufTtcbiIsIi8qXG4gKiBNSVQgTGljZW5zZVxuICpcbiAqIENvcHlyaWdodCAoYykgMjAyNSAgWXVyaWkgWWFrdWJpbiAoeXVyaWkueWFrdWJpbkBnbWFpbC5jb20pXG4gKlxuICogUGVybWlzc2lvbiBpcyBncmFudGVkIHRvIHVzZSwgY29weSwgbW9kaWZ5LCBhbmQgZGlzdHJpYnV0ZSB0aGlzIHNvZnR3YXJlXG4gKiB1bmRlciB0aGUgTUlUIExpY2Vuc2UuIFNlZSBMSUNFTlNFIGZpbGUgZm9yIGRldGFpbHMuXG4gKi9cblxuZXhwb3J0IGludGVyZmFjZSBTaW1wbGVPYmplY3Qge1xuICB0eXBlOiBzdHJpbmc7XG4gIFtuYW1lOiBzdHJpbmddOiBudWxsIHwgYm9vbGVhbiB8IG51bWJlciB8IHN0cmluZyB8b2JqZWN0O1xufTtcblxudHlwZSBJbnN0YW5jZUNyZWF0ZUZ1bmN0aW9uID0gKG9iamVjdDogU2ltcGxlT2JqZWN0KSA9PiBhbnk7XG5cbmNvbnN0IF9jcmVhdG9ycyA9IG5ldyBNYXA8c3RyaW5nLCBJbnN0YW5jZUNyZWF0ZUZ1bmN0aW9uPigpO1xuXG5leHBvcnQgbmFtZXNwYWNlIFNpbXBsZU9iamVjdCB7XG5cbmV4cG9ydCBmdW5jdGlvbiByZWdpc3Rlckluc3RhbmNlQ3JlYXRvcihuYW1lOiBzdHJpbmcsIGZ1bmM6IEluc3RhbmNlQ3JlYXRlRnVuY3Rpb24pIHtcbiAgaWYgKCFuYW1lICYmIF9jcmVhdG9ycy5oYXMobmFtZSkpXG4gICAgdGhyb3cgbmV3IEVycm9yKGBOYW1lIFwiJHtuYW1lfVwiIGlzIHdyb25nIG9yIHJlZ2lzdGVyZWRgKTtcbiAgX2NyZWF0b3JzLnNldChuYW1lLCBmdW5jKTtcbn1cblxuZXhwb3J0IGZ1bmN0aW9uIGNyZWF0ZUluc3RhbmNlKG9iamVjdDogU2ltcGxlT2JqZWN0KTogYW55IHtcbiAgY29uc3QgZnVuYyA9IF9jcmVhdG9ycy5nZXQob2JqZWN0LnR5cGUpO1xuICBpZiAoIWZ1bmMpXG4gICAgdGhyb3cgbmV3IEVycm9yKGBVa25vd24gb2JqZWN0IHR5cGU6ICR7SlNPTi5zdHJpbmdpZnkob2JqZWN0KX1gKTtcbiAgcmV0dXJuIGZ1bmMob2JqZWN0KTtcbn1cblxufSAvLyBuYW1lc3BhY2UgU2ltcGxlT2JqZWN0XG4iLCIvKlxuICogTUlUIExpY2Vuc2VcbiAqXG4gKiBDb3B5cmlnaHQgKGMpIDIwMjUgIFl1cmlpIFlha3ViaW4gKHl1cmlpLnlha3ViaW5AZ21haWwuY29tKVxuICpcbiAqIFBlcm1pc3Npb24gaXMgZ3JhbnRlZCB0byB1c2UsIGNvcHksIG1vZGlmeSwgYW5kIGRpc3RyaWJ1dGUgdGhpcyBzb2Z0d2FyZVxuICogdW5kZXIgdGhlIE1JVCBMaWNlbnNlLiBTZWUgTElDRU5TRSBmaWxlIGZvciBkZXRhaWxzLlxuICovXG5cbmltcG9ydCB7IGVuc3VyZUJvb2xlYW4gfSBmcm9tIFwiQC91dGlscy9TdHJpY3RUeXBlXCI7XG5pbXBvcnQgeyBBYnNvbHV0ZVBhdGggfSBmcm9tIFwiQC9jb3JlL0Fic29sdXRlUGF0aFwiO1xuXG5jb25zdCBMQU5HVUFHRSAgICAgICAgICAgID0gU3ltYm9sKFwiTEFOR1VBR0VcIik7XG5jb25zdCBIRUFERVJfRklMRV9PTkxZICAgID0gU3ltYm9sKFwiSEVBREVSX0ZJTEVfT05MWVwiKTtcbmNvbnN0IERFRklORVMgICAgICAgICAgICAgPSBTeW1ib2woXCJERUZJTkVTXCIpO1xuY29uc3QgQ09NUElMRV9GTEFHUyAgICAgICA9IFN5bWJvbChcIkNPTVBJTEVfRkxBR1NcIik7XG5jb25zdCBGSUxFICAgICAgICAgICAgICAgID0gU3ltYm9sKFwiRklMRVwiKTtcbmNvbnN0IEJBU0VfRElSICAgICAgICAgICAgPSBTeW1ib2woXCJCQVNFX0RJUlwiKTtcblxuZXhwb3J0IGNsYXNzIFNvdXJjZUZpbGUge1xuICBwcml2YXRlIFtMQU5HVUFHRV06IHN0cmluZztcbiAgcHJpdmF0ZSBbSEVBREVSX0ZJTEVfT05MWV06IGJvb2xlYW47XG4gIHByaXZhdGUgW0ZJTEVdOiBBYnNvbHV0ZVBhdGg7XG4gIHByaXZhdGUgW0JBU0VfRElSXTogQWJzb2x1dGVQYXRoO1xuICBwcml2YXRlIFtERUZJTkVTXTogc3RyaW5nW107XG4gIHByaXZhdGUgW0NPTVBJTEVfRkxBR1NdOiBBcnJheTxzdHJpbmd8c3RyaW5nW10+O1xuXG4gIHByaXZhdGUgY29uc3RydWN0b3IoZmlsZW5hbWU6IEFic29sdXRlUGF0aCwgYmFzZURpcjogQWJzb2x1dGVQYXRoLCBsYW5ndWFnZTogc3RyaW5nLCBjb21waWxlRmxhZ3M6IEFycmF5PHN0cmluZ3xzdHJpbmdbXT4pIHtcbiAgICB0aGlzW0ZJTEVdID0gZmlsZW5hbWU7XG4gICAgdGhpc1tCQVNFX0RJUl0gPSBiYXNlRGlyO1xuICAgIHRoaXNbTEFOR1VBR0VdID0gbGFuZ3VhZ2U7XG4gICAgdGhpc1tIRUFERVJfRklMRV9PTkxZXSA9ICFsYW5ndWFnZTtcbiAgICB0aGlzW0RFRklORVNdID0gW107XG4gICAgdGhpc1tDT01QSUxFX0ZMQUdTXSA9IFsgLi4uY29tcGlsZUZsYWdzIF07XG4gIH1cblxuICBwdWJsaWMgc3RhdGljIGNyZWF0ZShmaWxlbmFtZTogQWJzb2x1dGVQYXRoLCBiYXNlRGlyOiBBYnNvbHV0ZVBhdGgsIGxhbmd1YWdlOiBzdHJpbmcsIGNvbXBpbGVGbGFnczogQXJyYXk8c3RyaW5nfHN0cmluZ1tdPikge1xuICAgIHJldHVybiBPYmplY3Quc2VhbChuZXcgU291cmNlRmlsZShmaWxlbmFtZSwgYmFzZURpciwgbGFuZ3VhZ2UsIGNvbXBpbGVGbGFncykpO1xuICB9XG5cbiAgcHVibGljIGdldCBMQU5HVUFHRSgpOiBzdHJpbmcge1xuICAgIHJldHVybiB0aGlzW0xBTkdVQUdFXTtcbiAgfVxuXG4gIHB1YmxpYyBnZXQgSEVBREVSX0ZJTEVfT05MWSgpOiBib29sZWFuIHtcbiAgICByZXR1cm4gdGhpc1tIRUFERVJfRklMRV9PTkxZXTtcbiAgfVxuXG4gIHB1YmxpYyBzZXQgSEVBREVSX0ZJTEVfT05MWSh2YWx1ZTogYm9vbGVhbikge1xuICAgIHRoaXNbSEVBREVSX0ZJTEVfT05MWV0gPSBlbnN1cmVCb29sZWFuKHZhbHVlKTtcbiAgfVxuXG4gIHB1YmxpYyBnZXQgREVGSU5FUygpIHtcbiAgICByZXR1cm4gdGhpc1tERUZJTkVTXVxuICB9XG5cbiAgcHVibGljIGdldCBDT01QSUxFX0ZMQUdTKCkge1xuICAgIHJldHVybiB0aGlzW0NPTVBJTEVfRkxBR1NdO1xuICB9XG5cbiAgcHVibGljIGdldCBGSUxFKCk6IEFic29sdXRlUGF0aCB7XG4gICAgcmV0dXJuIHRoaXNbRklMRV07XG4gIH1cblxuICBwdWJsaWMgZ2V0IEZJTEVfRElSKCk6IEFic29sdXRlUGF0aCB7XG4gICAgcmV0dXJuIHRoaXNbRklMRV0uZGlybmFtZSgpO1xuICB9XG5cbiAgcHVibGljIGdldCBGSUxFX05BTUUoKTogc3RyaW5nIHtcbiAgICByZXR1cm4gdGhpc1tGSUxFXS5iYXNlbmFtZSgpO1xuICB9XG5cbiAgcHVibGljIHRvSlNPTigpOiBvYmplY3Qge1xuICAgIHJldHVybiB7XG4gICAgICBMQU5HVUFHRTogdGhpc1tMQU5HVUFHRV0sXG4gICAgICBIRUFERVJfRklMRV9PTkxZOiB0aGlzW0hFQURFUl9GSUxFX09OTFldLFxuICAgICAgREVGSU5FUzogdGhpc1tERUZJTkVTXSxcbiAgICAgIENPTVBJTEVfRkxBR1M6IHRoaXNbQ09NUElMRV9GTEFHU10sXG4gICAgICBGSUxFOiB0aGlzW0ZJTEVdLFxuICAgICAgRklMRV9ESVI6IHRoaXMuRklMRV9ESVIsXG4gICAgICBGSUxFX05BTUU6IHRoaXMuRklMRV9OQU1FLFxuICAgICAgQkFTRV9ESVI6IHRoaXNbQkFTRV9ESVJdLFxuICAgIH07XG4gIH1cbn1cbiIsIi8qXG4gKiBNSVQgTGljZW5zZVxuICpcbiAqIENvcHlyaWdodCAoYykgMjAyNSAgWXVyaWkgWWFrdWJpbiAoeXVyaWkueWFrdWJpbkBnbWFpbC5jb20pXG4gKlxuICogUGVybWlzc2lvbiBpcyBncmFudGVkIHRvIHVzZSwgY29weSwgbW9kaWZ5LCBhbmQgZGlzdHJpYnV0ZSB0aGlzIHNvZnR3YXJlXG4gKiB1bmRlciB0aGUgTUlUIExpY2Vuc2UuIFNlZSBMSUNFTlNFIGZpbGUgZm9yIGRldGFpbHMuXG4gKi9cblxuaW1wb3J0IHsgU291cmNlRmlsZSB9IGZyb20gXCJAL2NvcmUvU291cmNlRmlsZVwiO1xuaW1wb3J0IHsgU3lzdGVtU2NvcGUgfSBmcm9tIFwiQC9jb3JlL1N5c3RlbVNjb3BlXCI7XG5pbXBvcnQgeyBub3JtYWxpemVEZWZpbml0aW9ucyB9IGZyb20gXCJAL2NvcmUvRGVmaW5pdGlvbkhlbHBlclwiO1xuXG5jb25zdCBTT1VSQ0VTID0gU3ltYm9sKFwiU09VUkNFU1wiKTtcblxuZXhwb3J0IGNsYXNzIFNvdXJjZUZpbGVMaXN0IHtcbiAgcHJpdmF0ZSBbU09VUkNFU106IFNvdXJjZUZpbGVbXTtcblxuICBwcml2YXRlIGNvbnN0cnVjdG9yKHNjb3BlOiBTeXN0ZW1TY29wZSwgc291cmNlczogU291cmNlRmlsZVtdKSB7XG4gICAgdGhpc1tTT1VSQ0VTXSA9IFtdO1xuICAgIGZvciAoY29uc3QgaXRlciBvZiBzb3VyY2VzKSB7XG4gICAgICBpZiAoIShpdGVyIGluc3RhbmNlb2YgU291cmNlRmlsZSkpXG4gICAgICAgIHRocm93IG5ldyBFcnJvcihgSXRlbSAke2l0ZXJ9IGlzIG5vdCBTb3VyY2VGaWxlYCk7XG4gICAgICB0aGlzW1NPVVJDRVNdLnB1c2goaXRlcik7XG4gICAgfVxuICB9XG5cbiAgcHVibGljIHN0YXRpYyBjcmVhdGUoc2NvcGU6IFN5c3RlbVNjb3BlLCBzb3VyY2VzOiBTb3VyY2VGaWxlW10pIHtcbiAgICByZXR1cm4gT2JqZWN0LnNlYWwobmV3IFNvdXJjZUZpbGVMaXN0KHNjb3BlLCBzb3VyY2VzKSk7XG4gIH1cblxuICBwdWJsaWMgYWRkRGVmaW5pdGlvbnMoLi4uZGVmaW5pdGlvbnM6IHN0cmluZ1tdKSB7XG4gICAgZm9yIChjb25zdCBpdGVyIG9mIG5vcm1hbGl6ZURlZmluaXRpb25zKC4uLmRlZmluaXRpb25zKSlcbiAgICAgIHRoaXNbU09VUkNFU10uZm9yRWFjaChpID0+IGkuREVGSU5FUy5wdXNoKGl0ZXIpKTtcbiAgfVxuXG4gIHB1YmxpYyBhZGRDb21waWxlRmxhZ3MoLi4uZmxhZ3M6IHN0cmluZ1tdKSB7XG4gICAgZm9yIChjb25zdCBpdGVyIG9mIGZsYWdzLmZsYXQoKSlcbiAgICAgIHRoaXNbU09VUkNFU10uZm9yRWFjaChpID0+IGkuQ09NUElMRV9GTEFHUy5wdXNoKGl0ZXIpKTtcbiAgfVxuXG4gIHB1YmxpYyBzb3VyY2VBdChpbmRleDogbnVtYmVyKTogU291cmNlRmlsZSB7XG4gICAgcmV0dXJuIHRoaXNbU09VUkNFU11baW5kZXhdO1xuICB9XG5cbiAgcHVibGljIHNvdXJjZUNvdW50KGluZGV4OiBudW1iZXIpOiBudW1iZXIge1xuICAgIHJldHVybiB0aGlzW1NPVVJDRVNdLmxlbmd0aDtcbiAgfVxuXG4gIHB1YmxpYyB0b0pTT04oKTogb2JqZWN0IHtcbiAgICByZXR1cm4gdGhpc1tTT1VSQ0VTXTtcbiAgfVxufTtcbiIsIi8qXG4gKiBNSVQgTGljZW5zZVxuICpcbiAqIENvcHlyaWdodCAoYykgMjAyNSAgWXVyaWkgWWFrdWJpbiAoeXVyaWkueWFrdWJpbkBnbWFpbC5jb20pXG4gKlxuICogUGVybWlzc2lvbiBpcyBncmFudGVkIHRvIHVzZSwgY29weSwgbW9kaWZ5LCBhbmQgZGlzdHJpYnV0ZSB0aGlzIHNvZnR3YXJlXG4gKiB1bmRlciB0aGUgTUlUIExpY2Vuc2UuIFNlZSBMSUNFTlNFIGZpbGUgZm9yIGRldGFpbHMuXG4gKi9cblxuaW1wb3J0IG9zIGZyb20gXCJub2RlOm9zXCI7XG5pbXBvcnQgeyBERUJVR19CVUlMRF9UWVBFLCBSRUxFQVNFX0JVSUxEX1RZUEUgfSBmcm9tIFwiQC9jb3JlL1R5cGVzXCI7XG5pbXBvcnQgeyBIb3N0IH0gZnJvbSBcIkAvdXRpbHMvSG9zdFwiO1xuXG5leHBvcnQgZGVmYXVsdCB7XG4gIFNZU1RFTV9OQU1FOiB7XG4gICAgZGVzY3JpcHRpb246IFwiRGVmaW5lcyB0aGUgdGFyZ2V0IE9TIGZvciB0aGUgYnVpbGQsIHVzZWQgaW4gY3Jvc3MtY29tcGlsYXRpb24gYW5kIG5hdGl2ZSBidWlsZHNcIixcbiAgICB2YWx1ZTogXCJMaW51eFwiLFxuICB9LFxuICBTWVNURU1fUFJPQ0VTU09SOiB7XG4gICAgZGVzY3JpcHRpb246IFwiRGVmaW5lcyB0aGUgdGFyZ2V0IENQVSBhcmNoaXRlY3R1cmVcIixcbiAgICB2YWx1ZTogXCJ3YXNtMzJcIixcbiAgfSxcbiAgUFJPSkVDVF9OQU1FOiB7XG4gICAgZGVzY3JpcHRpb246IFwiTmFtZSBvZiB0aGUgY3VycmVudCBwcm9qZWN0XCIsXG4gICAgdmFsdWU6IFwiXCIsXG4gIH0sXG4gIFBST0pFQ1RfVkVSU0lPTjoge1xuICAgIGRlc2NyaXB0aW9uOiBcIlZlcnNpb24gb2YgdGhlIGN1cnJlbnQgcHJvamVjdFwiLFxuICAgIHZhbHVlOiBcIlwiLFxuICB9LFxuICBQUk9KRUNUX0RFU0NSSVBUSU9OOiB7XG4gICAgZGVzY3JpcHRpb246IFwiRGVzY3JpcHRpb24gb2YgdGhlIGN1cnJlbnQgcHJvamVjdFwiLFxuICAgIHZhbHVlOiBcIlwiLFxuICB9LFxuICBQUk9KRUNUX0hPTUVQQUdFX1VSTDoge1xuICAgIGRlc2NyaXB0aW9uOiBcIkhvbWVwYWdlIFVSTCBvZiB0aGUgY3VycmVudCBwcm9qZWN0XCIsXG4gICAgdmFsdWU6IFwiXCIsXG4gIH0sXG4gIFBST0pFQ1RfU09VUkNFX0RJUjoge1xuICAgIGRlc2NyaXB0aW9uOiBcIkFic29sdXRlIHBhdGggdG8gdGhlIHRvcC1sZXZlbCBzb3VyY2UgZGlyZWN0b3J5IG9mIHRoZSBwcm9qZWN0XCIsXG4gICAgdHlwZTogXCJEaXJQYXRoXCIsXG4gIH0sXG4gIFBST0pFQ1RfQklOQVJZX0RJUjoge1xuICAgIGRlc2NyaXB0aW9uOiBcIkFic29sdXRlIHBhdGggdG8gdGhlIHRvcC1sZXZlbCBidWlsZCAoYmluYXJ5KSBkaXJlY3Rvcnkgb2YgdGhlIHByb2plY3RcIixcbiAgICB0eXBlOiBcIkRpclBhdGhcIixcbiAgfSxcbiAgU0NSSVBUX01PRFVMRToge1xuICAgIGRlc2NyaXB0aW9uOiBcIk1vZHVsZSBuYW1lIG9mIHRoZSBjdXJyZW50IE1ha2VTY3JpcHRcIixcbiAgICB0eXBlOiBcInN0cmluZ1wiLFxuICB9LFxuICBTQ1JJUFRfRklMRToge1xuICAgIGRlc2NyaXB0aW9uOiBcIkZ1bGwgcGF0aCB0byB0aGUgY3VycmVudCBNYWtlU2NyaXB0IGZpbGUgYmVpbmcgcHJvY2Vzc2VkXCIsXG4gICAgdHlwZTogXCJGaWxlUGF0aFwiLFxuICB9LFxuICBTQ1JJUFRfRElSOiB7XG4gICAgZGVzY3JpcHRpb246IFwiRGlyZWN0b3J5IG9mIHRoZSBjdXJyZW50IE1ha2VTY3JpcHQgZmlsZSBiZWluZyBwcm9jZXNzZWRcIixcbiAgICB0eXBlOiBcIkRpclBhdGhcIixcbiAgfSxcbiAgUEFDS0FHRV9GSUxFOiB7XG4gICAgZGVzY3JpcHRpb246IFwiRmlsZW5hbWUgb2YgcHJvamVjdCBtYW5pZmVzdCBjb250YWluaW5nIG1ldGFkYXRhIGFuZCBkZXBlbmRlbmNpZXNcIixcbiAgICB0eXBlOiBcIkZpbGVQYXRoXCIsXG4gIH0sXG4gIENBQ0hFX0ZJTEU6IHtcbiAgICBkZXNjcmlwdGlvbjogXCJEZWZhdWx0IGZpbGVuYW1lIG9mIHRoZSBCaXRNYWtlIGNhY2hlIHN0b3Jpbmcgc2V0dGluZ3NcIixcbiAgICB0eXBlOiBcIkZpbGVQYXRoXCIsXG4gIH0sXG4gIFRPT0xDSEFJTl9GSUxFOiB7XG4gICAgZGVzY3JpcHRpb246IFwiU3BlY2lmaWVzIHRoZSBwYXRoIHRvIGEgdG9vbGNoYWluIGZpbGUgdXNlZCBmb3IgY3Jvc3MtY29tcGlsYXRpb25cIixcbiAgICB0eXBlOiBcInN0cmluZ1wiLFxuICB9LFxuICBCVUlMRF9UWVBFOiB7XG4gICAgZGVzY3JpcHRpb246IFwiU3BlY2lmaWVzIHRoZSBidWlsZCBjb25maWd1cmF0aW9uIGZvciBjb250cm9sbGluZyBvcHRpbWl6YXRpb24gbGV2ZWxzIGFuZCBkZWJ1ZyBpbmZvcm1hdGlvbiBpbiB0aGUgYnVpbGQgcHJvY2Vzc1wiLFxuICAgIHR5cGU6IFsgREVCVUdfQlVJTERfVFlQRSwgUkVMRUFTRV9CVUlMRF9UWVBFIF0sXG4gICAgdmFsdWU6IFJFTEVBU0VfQlVJTERfVFlQRSxcbiAgfSxcbiAgSU5TVEFMTF9QUkVGSVg6IHtcbiAgICBkZXNjcmlwdGlvbjogXCJUaGUgcm9vdCBkaXJlY3Rvcnkgd2hlcmUgZmlsZXMgd2lsbCBiZSBpbnN0YWxsZWQgYnkgZGVmYXVsdFwiLFxuICAgIHR5cGU6IFwiRGlyUGF0aFwiLFxuICAgIHZhbHVlOiBcIi91c3JcIixcbiAgfSxcbiAgREVTVERJUjoge1xuICAgIGRlc2NyaXB0aW9uOiBcIlRlbXBvcmFyeSBpbnN0YWxsYXRpb24gcm9vdFwiLFxuICAgIHR5cGU6IFwiRGlyUGF0aFwiLFxuICB9LFxuICBTT1VSQ0VfRElSOiB7XG4gICAgZGVzY3JpcHRpb246IFwiUGF0aCB0byB0aGUgc291cmNlIGRpcmVjdG9yeSBjdXJyZW50bHkgYmVpbmcgcHJvY2Vzc2VkXCIsXG4gICAgdHlwZTogXCJEaXJQYXRoXCIsXG4gIH0sXG4gIEJJTkFSWV9ESVI6IHtcbiAgICBkZXNjcmlwdGlvbjogXCJQYXRoIHRvIHRoZSBiaW5hcnkgZGlyZWN0b3J5IGN1cnJlbnRseSBiZWluZyBwcm9jZXNzZWRcIixcbiAgICB0eXBlOiBcIkRpclBhdGhcIixcbiAgfSxcbiAgUE9TSVRJT05fSU5ERVBFTkRFTlRfQ09ERToge1xuICAgIGRlc2NyaXB0aW9uOiBcIkVuYWJsZXMgUG9zaXRpb24tSW5kZXBlbmRlbnQgQ29kZSAoUElDKSBmb3IgYnVpbGRpbmcgc2hhcmVkIGxpYnJhcmllc1wiLFxuICAgIHZhbHVlOiBmYWxzZSxcbiAgfSxcbiAgUFJFVkVOVF9JTlNUQUxMX0ZJTEVTOiB7XG4gICAgZGVzY3JpcHRpb246IFwiUHJldmVudCBpbnN0YWxsYXRpb24gb2YgZmlsZXNcIixcbiAgICB2YWx1ZTogZmFsc2UsXG4gIH0sXG4gIEhPU1RfU1lTVEVNX05BTUU6IHtcbiAgICBkZXNjcmlwdGlvbjogXCJTcGVjaWZpZXMgdGhlIE9TIG9mIHRoZSBtYWNoaW5lIHJ1bm5pbmdcIixcbiAgICB2YWx1ZTogb3MudHlwZSgpLFxuICB9LFxuICBJTkNMVURFUzoge1xuICAgIGRlc2NyaXB0aW9uOiBcIlBhdGhzIHNlYXJjaGVkIGZvciBoZWFkZXIgZmlsZXNcIixcbiAgICB2YWx1ZTogW10sXG4gIH0sXG4gIEFTTV9DT01QSUxFUjoge1xuICAgIGRlc2NyaXB0aW9uOiBcIlBhdGggdG8gdGhlIGFzc2VtYmxlciBjb21waWxlciBkZXRlY3RlZFwiLFxuICAgIHZhbHVlOiBcIlwiLFxuICB9LFxuICBBU01fRkxBR1M6IHtcbiAgICBkZXNjcmlwdGlvbjogXCJGbGFncyBwYXNzZWQgdG8gdGhlIGFzc2VtYmxlciBjb21waWxlclwiLFxuICAgIHZhbHVlOiBbXSxcbiAgfSxcbiAgQVNNX0ZMQUdTX0RFQlVHOiB7XG4gICAgZGVzY3JpcHRpb246IFwiQWRkaXRpb25hbCBhc3NlbWJsZXIgZmxhZ3MgdXNlZCB3aGVuIGJ1aWxkaW5nIGluIERlYnVnIG1vZGVcIixcbiAgICB2YWx1ZTogWyBcIi1nXCIgXSxcbiAgfSxcbiAgQVNNX0ZMQUdTX1JFTEVBU0U6IHtcbiAgICBkZXNjcmlwdGlvbjogXCJBZGRpdGlvbmFsIGFzc2VtYmxlciBmbGFncyB1c2VkIHdoZW4gYnVpbGRpbmcgaW4gUmVsZWFzZSBtb2RlXCIsXG4gICAgdmFsdWU6IFsgXCItTzNcIiwgXCItRE5ERUJVR1wiIF0sXG4gIH0sXG4gIENfQ09NUElMRVI6IHtcbiAgICBkZXNjcmlwdGlvbjogXCJQYXRoIHRvIHRoZSBDIGNvbXBpbGVyIGRldGVjdGVkXCIsXG4gICAgdmFsdWU6IFwiXCIsXG4gIH0sXG4gIENfRkxBR1M6IHtcbiAgICBkZXNjcmlwdGlvbjogXCJGbGFncyBwYXNzZWQgdG8gdGhlIEMgY29tcGlsZXJcIixcbiAgICB2YWx1ZTogW10sXG4gIH0sXG4gIENfRkxBR1NfREVCVUc6IHtcbiAgICBkZXNjcmlwdGlvbjogXCJBZGRpdGlvbmFsIEMgY29tcGlsZXIgZmxhZ3MgdXNlZCB3aGVuIGJ1aWxkaW5nIGluIERlYnVnIG1vZGVcIixcbiAgICB2YWx1ZTogWyBcIi1nXCIgXSxcbiAgfSxcbiAgQ19GTEFHU19SRUxFQVNFOiB7XG4gICAgZGVzY3JpcHRpb246IFwiQWRkaXRpb25hbCBDIGNvbXBpbGVyIGZsYWdzIHVzZWQgd2hlbiBidWlsZGluZyBpbiBSZWxlYXNlIG1vZGVcIixcbiAgICB2YWx1ZTogWyBcIi1PM1wiLCBcIi1ETkRFQlVHXCIgXSxcbiAgfSxcbiAgQ1hYX0NPTVBJTEVSOiB7XG4gICAgZGVzY3JpcHRpb246IFwiUGF0aCB0byB0aGUgQysrIGNvbXBpbGVyIGRldGVjdGVkXCIsXG4gICAgdmFsdWU6IFwiXCIsXG4gIH0sXG4gIENYWF9GTEFHUzoge1xuICAgIGRlc2NyaXB0aW9uOiBcIkZsYWdzIHBhc3NlZCB0byB0aGUgQyBjb21waWxlclwiLFxuICAgIHZhbHVlOiBbXSxcbiAgfSxcbiAgQ1hYX0ZMQUdTX0RFQlVHOiB7XG4gICAgZGVzY3JpcHRpb246IFwiQWRkaXRpb25hbCBDKysgY29tcGlsZXIgZmxhZ3MgdXNlZCB3aGVuIGJ1aWxkaW5nIGluIERlYnVnIG1vZGVcIixcbiAgICB2YWx1ZTogWyBcIi1nXCIgXSxcbiAgfSxcbiAgQ1hYX0ZMQUdTX1JFTEVBU0U6IHtcbiAgICBkZXNjcmlwdGlvbjogXCJBZGRpdGlvbmFsIEMrKyBjb21waWxlciBmbGFncyB1c2VkIHdoZW4gYnVpbGRpbmcgaW4gUmVsZWFzZSBtb2RlXCIsXG4gICAgdmFsdWU6IFsgXCItTzNcIiwgXCItRE5ERUJVR1wiIF0sXG4gIH0sXG4gIEFSOiB7XG4gICAgZGVzY3JpcHRpb246IFwiUGF0aCB0byB0aGUgYXJjaGl2ZXIgdG9vbCB1c2VkIHRvIGNyZWF0ZSBzdGF0aWMgbGlicmFyaWVzXCIsXG4gICAgdmFsdWU6IFwiXCIsXG4gIH0sXG4gIFJBTkxJQjoge1xuICAgIGRlc2NyaXB0aW9uOiBcIlRvb2wgdXNlZCB0byBnZW5lcmF0ZSBhbiBpbmRleCB0byB0aGUgY29udGVudHMgb2YgYW4gYXJjaGl2ZSAoc3RhdGljIGxpYnJhcnkpXCIsXG4gICAgdmFsdWU6IFwiXCIsXG4gIH0sXG4gIExJTktFUjoge1xuICAgIGRlc2NyaXB0aW9uOiBcIlBhdGggdG8gdGhlIGxpbmtlciB1c2VkIHRvIGxpbmsgb2JqZWN0IGZpbGVzIGFuZCBsaWJyYXJpZXMgaW50byBleGVjdXRhYmxlc1wiLFxuICAgIHZhbHVlOiBcIlwiLFxuICB9LFxuICBOTToge1xuICAgIGRlc2NyaXB0aW9uOiBcIlBhdGggdG8gdGhlIHRvb2wgdXNlZCB0byBsaXN0IHN5bWJvbHMgZnJvbSBvYmplY3QgZmlsZXMgb3IgYXJjaGl2ZXNcIixcbiAgICB2YWx1ZTogXCJcIixcbiAgfSxcbiAgT0JKQ09QWToge1xuICAgIGRlc2NyaXB0aW9uOiBcIlBhdGggdG8gdGhlIHRvb2wgdXNlZCB0byBjb3B5IGFuZCB0cmFuc2xhdGUgb2JqZWN0IGZpbGVzXCIsXG4gICAgdmFsdWU6IFwiXCIsXG4gIH0sXG4gIE9CSkRVTVA6IHtcbiAgICBkZXNjcmlwdGlvbjogXCJQYXRoIHRvIHRoZSB0b29sIHVzZWQgdG8gZGlzcGxheSBpbmZvcm1hdGlvbiBhYm91dCBvYmplY3QgZmlsZXMsIHN1Y2ggYXMgZGlzYXNzZW1ibHlcIixcbiAgICB2YWx1ZTogXCJcIixcbiAgfSxcbiAgU1RSSVA6IHtcbiAgICBkZXNjcmlwdGlvbjogXCJQYXRoIHRvIHRoZSB0b29sIHVzZWQgdG8gcmVtb3ZlIHN5bWJvbHMgZnJvbSBvYmplY3QgZmlsZXMgb3IgZXhlY3V0YWJsZXMgdG8gcmVkdWNlIHNpemVcIixcbiAgICB2YWx1ZTogXCJcIixcbiAgfSxcbiAgT0JKRUNUX0xJQlJBUllfUFJFRklYOiB7XG4gICAgZGVzY3JpcHRpb246IFwiUHJlZml4IHVzZWQgZm9yIG9iamVjdCBsaWJyYXJpZXNcIixcbiAgICB2YWx1ZTogXCJcIixcbiAgfSxcbiAgT0JKRUNUX0xJQlJBUllfU1VGRklYOiB7XG4gICAgZGVzY3JpcHRpb246IFwiU3VmZml4IHVzZWQgZm9yIG9iamVjdCBsaWJyYXJ5IGZpbGVzXCIsXG4gICAgdmFsdWU6IFwiLm9cIixcbiAgfSxcbiAgT0JKRUNUX0xJTktFUl9GTEFHUzoge1xuICAgIGRlc2NyaXB0aW9uOiBcIkZsYWdzIHBhc3NlZCB0byB0aGUgbGlua2VyIHdoZW4gY3JlYXRpbmcgb2JqZWN0IGxpYnJhcmllc1wiLFxuICAgIHZhbHVlOiBbXSxcbiAgfSxcbiAgU1RBVElDX0xJQlJBUllfUFJFRklYOiB7XG4gICAgZGVzY3JpcHRpb246IFwiUHJlZml4IHVzZWQgZm9yIHN0YXRpYyBsaWJyYXJ5IGZpbGVzXCIsXG4gICAgdmFsdWU6IFwibGliXCIsXG4gIH0sXG4gIFNUQVRJQ19MSUJSQVJZX1NVRkZJWDoge1xuICAgIGRlc2NyaXB0aW9uOiBcIlN1ZmZpeCB1c2VkIGZvciBzdGF0aWMgbGlicmFyeSBmaWxlc1wiLFxuICAgIHZhbHVlOiBcIi5hXCIsXG4gIH0sXG4gIFNUQVRJQ19MSU5LRVJfRkxBR1M6IHtcbiAgICBkZXNjcmlwdGlvbjogXCJGbGFncyBwYXNzZWQgdG8gdGhlIGxpbmtlciB3aGVuIGNyZWF0aW5nIHN0YXRpYyBsaWJyYXJpZXNcIixcbiAgICB2YWx1ZTogW10sXG4gIH0sXG4gIFNIQVJFRF9MSUJSQVJZX1BSRUZJWDoge1xuICAgIGRlc2NyaXB0aW9uOiBcIlByZWZpeCB1c2VkIGZvciBzaGFyZWQgbGlicmFyeSBmaWxlc1wiLFxuICAgIHZhbHVlOiBcImxpYlwiLFxuICB9LFxuICBTSEFSRURfTElCUkFSWV9TVUZGSVg6IHtcbiAgICBkZXNjcmlwdGlvbjogXCJTdWZmaXggdXNlZCBmb3Igc2hhcmVkIGxpYnJhcnkgZmlsZXNcIixcbiAgICB2YWx1ZTogXCIuc29cIixcbiAgfSxcbiAgU0hBUkVEX0xJTktFUl9GTEFHUzoge1xuICAgIGRlc2NyaXB0aW9uOiBcIkZsYWdzIHBhc3NlZCB0byB0aGUgbGlua2VyIHdoZW4gY3JlYXRpbmcgc2hhcmVkIGxpYnJhcmllc1wiLFxuICAgIHZhbHVlOiBbXSxcbiAgfSxcbiAgRVhFQ1VUQUJMRV9TVUZGSVg6IHtcbiAgICBkZXNjcmlwdGlvbjogXCJTdWZmaXggdXNlZCBmb3IgZXhlY3V0YWJsZSBmaWxlc1wiLFxuICAgIHZhbHVlOiBIb3N0LmV4ZWN1dGFibGVTdWZmaXgsXG4gIH0sXG4gIEVYRV9MSU5LRVJfRkxBR1M6IHtcbiAgICBkZXNjcmlwdGlvbjogXCJGbGFncyBwYXNzZWQgdG8gdGhlIGxpbmtlciB3aGVuIGNyZWF0aW5nIGV4ZWN1dGFibGVzXCIsXG4gICAgdmFsdWU6IFtdLFxuICB9LFxuICBHTE9CQUxfQ09OVEVYVF9KU09OOiB7XG4gICAgZGVzY3JpcHRpb246IFwiRmlsZW5hbWUgZm9yIEpTT04gb2YgdGhlIEdsb2JhbCBjb250ZXh0XCIsXG4gICAgdHlwZTogXCJGaWxlUGF0aFwiLFxuICB9LFxuICBUQVJHRVRfR09BTFNfSlNPTjoge1xuICAgIGRlc2NyaXB0aW9uOiBcIkZpbGVuYW1lIGZvciBKU09OIG9mIHRoZSBUYXJnZXQgR29hbHNcIixcbiAgICB0eXBlOiBcIkZpbGVQYXRoXCIsXG4gIH0sXG4gIFNJWkVPRl9WT0lEX1A6IHtcbiAgICBkZXNjcmlwdGlvbjogXCJEZWZpbmVzIHRoZSBzaXplIChpbiBieXRlcykgb2YgYSB2b2lkIHBvaW50ZXIgb24gdGhlIHRhcmdldCBhcmNoaXRlY3R1cmVcIixcbiAgICB0eXBlOiBbIDQsIDggXSxcbiAgICB2YWx1ZTogSG9zdC5zaXplb2ZWb2lkcCxcbiAgfSxcbiAgTUFLRV9QTFVHSU5fTElTVDoge1xuICAgIGRlc2NyaXB0aW9uOiBcIkxpc3Qgb2YgcGF0aHMgdG8gcGx1Z2luc1wiLFxuICAgIHZhbHVlOiBbXSxcbiAgfSxcbiAgSE9TVF9FWEVDVVRBQkxFX1NVRkZJWDoge1xuICAgIGRlc2NyaXB0aW9uOiBcIkRlZmluZXMgdGhlIGZpbGUgZXh0ZW5zaW9uIGZvciBleGVjdXRhYmxlcyBvbiB0aGUgaG9zdCBzeXN0ZW1cIixcbiAgICB2YWx1ZTogSG9zdC5leGVjdXRhYmxlU3VmZml4LFxuICAgIC8vIFJlYWRvbmx5XG4gIH0sXG59O1xuIiwiLypcbiAqIE1JVCBMaWNlbnNlXG4gKlxuICogQ29weXJpZ2h0IChjKSAyMDI1ICBZdXJpaSBZYWt1YmluICh5dXJpaS55YWt1YmluQGdtYWlsLmNvbSlcbiAqXG4gKiBQZXJtaXNzaW9uIGlzIGdyYW50ZWQgdG8gdXNlLCBjb3B5LCBtb2RpZnksIGFuZCBkaXN0cmlidXRlIHRoaXMgc29mdHdhcmVcbiAqIHVuZGVyIHRoZSBNSVQgTGljZW5zZS4gU2VlIExJQ0VOU0UgZmlsZSBmb3IgZGV0YWlscy5cbiAqL1xuXG5pbXBvcnQgeyBJbnRlcmZhY2VUYXJnZXQgfSBmcm9tIFwiQC9jb3JlL01ha2VJbnRlcmZhY2VzXCI7XG5pbXBvcnQgeyBTb3VyY2VGaWxlIH0gZnJvbSBcIkAvY29yZS9Tb3VyY2VGaWxlXCI7XG5pbXBvcnQgeyBTb3VyY2VGaWxlTGlzdCB9IGZyb20gXCJAL2NvcmUvU291cmNlRmlsZUxpc3RcIjtcbmltcG9ydCB7IFRhcmdldEZpbGUgfSBmcm9tIFwiQC9jb3JlL1RhcmdldEZpbGVcIjtcbmltcG9ydCB7IFRhcmdldEluY2x1ZGVzIH0gZnJvbSBcIkAvY29yZS9UYXJnZXRJbmNsdWRlc1wiO1xuaW1wb3J0IHsgVGFyZ2V0T2JqZWN0cyB9IGZyb20gXCJAL2NvcmUvVGFyZ2V0T2JqZWN0c1wiO1xuaW1wb3J0IHsgQWJzb2x1dGVQYXRoIH0gZnJvbSBcIkAvY29yZS9BYnNvbHV0ZVBhdGhcIjtcbmltcG9ydCB7IFNjb3BlSGVscGVyLCBWYXJpYWJsZU1hcCB9IGZyb20gXCJAL2NvcmUvU2NvcGVcIjtcbmltcG9ydCB7IFN5c3RlbVNjb3BlIH0gZnJvbSBcIkAvY29yZS9TeXN0ZW1TY29wZVwiO1xuaW1wb3J0IHsgU1lTVEVNX1ZBUklBQkxFX0dST1VQIH0gZnJvbSBcIkAvQ29uc3RhbnRzXCI7XG5pbXBvcnQgeyBub3JtYWxpemVEZWZpbml0aW9ucyB9IGZyb20gXCJAL2NvcmUvRGVmaW5pdGlvbkhlbHBlclwiO1xuaW1wb3J0IHsgU2ltcGxlT2JqZWN0IH0gZnJvbSBcIi4vU2ltcGxlT2JqZWN0XCI7XG5pbXBvcnQgeyBBTExfVEFSR0VULCBJTlNUQUxMX1RBUkdFVCB9IGZyb20gXCJAL0NvbnN0YW50c1wiO1xuXG5jb25zdCBfbGFuZ3VhZ2VFeHRlbnNpb25zID0ge1xuICBBU006IFsgXCIuYXNtXCIsIFwiLnNcIiBdLFxuICBDOiAgIFsgXCIuY1wiIF0sXG4gIENYWDogW1wiLmNwcFwiLCBcIi5jY1wiLCBcIi5jeHhcIiBdLFxufTtcblxuZnVuY3Rpb24gbm9ybWFsaXplSW5jbHVkZXMoYmFzZURpcjogQWJzb2x1dGVQYXRoLCAuLi5pbmNsdWRlczogYW55W10pOiBBcnJheTxBYnNvbHV0ZVBhdGggfCBUYXJnZXRJbmNsdWRlcz4ge1xuICBjb25zdCByZXN1bHQgPSBbXTtcbiAgZm9yIChjb25zdCBpdGVyIG9mIGluY2x1ZGVzLmZsYXQoKSkge1xuICAgIGlmIChpdGVyIGluc3RhbmNlb2YgVGFyZ2V0SW5jbHVkZXMpXG4gICAgICByZXN1bHQucHVzaChpdGVyKTtcbiAgICBlbHNlIGlmICh0eXBlb2YgaXRlciA9PT0gXCJzdHJpbmdcIilcbiAgICAgIHJlc3VsdC5wdXNoKEFic29sdXRlUGF0aC5jcmVhdGUoYmFzZURpci5yZXNvbHZlKGl0ZXIpKSk7XG4gICAgZWxzZSBpZiAoaXRlciBpbnN0YW5jZW9mIEFic29sdXRlUGF0aClcbiAgICAgIHJlc3VsdC5wdXNoKEFic29sdXRlUGF0aC5jcmVhdGUoaXRlcikpO1xuICAgIGVsc2VcbiAgICAgIHRocm93IG5ldyBFcnJvcihgTm90IHN1cHBvcnQgaW5zdGFuY2UgJHtpdGVyfWApO1xuICB9XG4gIHJldHVybiByZXN1bHQ7XG59XG5cbmZ1bmN0aW9uIGlzU3VwcG9ydExhbmd1YWdlKGxhbmd1YWdlOiBzdHJpbmcpIHtcbiAgcmV0dXJuIF9sYW5ndWFnZUV4dGVuc2lvbnMuaGFzT3duUHJvcGVydHkobGFuZ3VhZ2UpO1xufVxuXG5mdW5jdGlvbiBnZXRGaWxlTGFuZ3VhZ2UoZmlsZW5hbWU6IHN0cmluZykge1xuICBjb25zdCBmaWxlbmFtZUxvd2VyQ2FzZSA9IGZpbGVuYW1lLnRvTG93ZXJDYXNlKCk7XG4gIGZvciAoY29uc3QgW2xhbmd1YWdlLCBleHRlbnNpb25zXSBvZiBPYmplY3QuZW50cmllcyhfbGFuZ3VhZ2VFeHRlbnNpb25zKSkge1xuICAgIGZvciAoY29uc3QgaXRlciBvZiBleHRlbnNpb25zKSB7XG4gICAgICBpZiAoZmlsZW5hbWVMb3dlckNhc2UuZW5kc1dpdGgoaXRlcikpXG4gICAgICAgIHJldHVybiBsYW5ndWFnZTtcbiAgICB9XG4gIH1cbiAgcmV0dXJuIFwiXCI7XG59XG5cbmZ1bmN0aW9uIG1ha2VMYW5ndWFnZSh2YWx1ZTogc3RyaW5nKSB7XG4gIGlmIChpc1N1cHBvcnRMYW5ndWFnZSh2YWx1ZSkpXG4gICAgcmV0dXJuIHZhbHVlO1xuICB0aHJvdyBuZXcgRXJyb3IoYExhbmd1YWdlIFwiJHt2YWx1ZX1cIiBpcyBub3Qgc3VwcG9ydGVkYCk7XG59XG5cbmZ1bmN0aW9uIGNyZWF0ZVNvdXJjZXMoc2NvcGU6IFN5c3RlbVNjb3BlLCBzb3VyY2U6IFRhcmdldE9iamVjdHMgfCBTb3VyY2VGaWxlIHwgQWJzb2x1dGVQYXRoIHwgc3RyaW5nKTogVGFyZ2V0T2JqZWN0cyB8IFNvdXJjZUZpbGUge1xuICBpZiAoc291cmNlIGluc3RhbmNlb2YgVGFyZ2V0T2JqZWN0cyB8fCBzb3VyY2UgaW5zdGFuY2VvZiBTb3VyY2VGaWxlKVxuICAgIHJldHVybiBzb3VyY2U7XG5cbiAgaWYgKHR5cGVvZiBzb3VyY2UgPT09IFwic3RyaW5nXCIgfHwgQWJzb2x1dGVQYXRoLmlzQWJzb2x1dGUoc291cmNlKSkge1xuICAgIGNvbnN0IGZpbGVuYW1lID0gc2NvcGUuU09VUkNFX0RJUi5yZXNvbHZlKHNvdXJjZSk7XG4gICAgY29uc3QgbGFuZ3VhZ2UgPSBnZXRGaWxlTGFuZ3VhZ2UoZmlsZW5hbWUudG9TdHJpbmcoKSk7XG4gICAgY29uc3QgY29tcGlsZUZsYWdzID0gIWxhbmd1YWdlID8gW10gOiBbXG4gICAgICAuLi4oc2NvcGUgYXMgYW55KVtsYW5ndWFnZSArIFwiX0ZMQUdTXCJdLFxuICAgICAgLi4uKHNjb3BlIGFzIGFueSlbbGFuZ3VhZ2UgKyBcIl9GTEFHU19cIiArIHNjb3BlLkJVSUxEX1RZUEUudG9VcHBlckNhc2UoKV0sXG4gICAgXTtcbiAgICByZXR1cm4gU291cmNlRmlsZS5jcmVhdGUoZmlsZW5hbWUsIHNjb3BlLlNPVVJDRV9ESVIsIGxhbmd1YWdlLCBjb21waWxlRmxhZ3MpO1xuICB9XG4gIFxuICB0aHJvdyBuZXcgRXJyb3IoYE5vdCBzdXBwb3J0IGluc3RhbmNlICR7c291cmNlfWApO1xufVxuXG5leHBvcnQgaW50ZXJmYWNlIFRhcmdldENvbW1hbmQge1xuICBjb21tYW5kOiBzdHJpbmcgfCBBYnNvbHV0ZVBhdGggfCBUYXJnZXRGaWxlO1xuICBhcmdzOiBBcnJheTxzdHJpbmcgfCBBYnNvbHV0ZVBhdGggfCBUYXJnZXRGaWxlPjtcbn07XG5cbmZ1bmN0aW9uIG1ha2VUYXJnZXRDb21tYW5kKF9jb21tYW5kOiBhbnksIF9hcmdzOiBhbnlbXSk6IFRhcmdldENvbW1hbmQge1xuICBsZXQgY29tbWFuZDogc3RyaW5nIHwgQWJzb2x1dGVQYXRoIHwgVGFyZ2V0RmlsZTtcbiAgaWYgKHR5cGVvZiBfY29tbWFuZCA9PT0gXCJzdHJpbmdcIilcbiAgICBjb21tYW5kID0gX2NvbW1hbmQ7XG4gIGVsc2UgaWYgKF9jb21tYW5kIGluc3RhbmNlb2YgVGFyZ2V0RmlsZSlcbiAgICBjb21tYW5kID0gX2NvbW1hbmQ7XG4gIGVsc2UgaWYgKF9jb21tYW5kIGluc3RhbmNlb2YgQWJzb2x1dGVQYXRoKVxuICAgIGNvbW1hbmQgPSBfY29tbWFuZDtcbiAgZWxzZVxuICAgIHRocm93IG5ldyBUeXBlRXJyb3IoYFdyb25nIHR5cGUgJHtfY29tbWFuZH0gZm9yIGNvbW1hbmRgKTtcblxuICBjb25zdCBhcmdzID0gbmV3IEFycmF5PHN0cmluZyB8IEFic29sdXRlUGF0aCB8IFRhcmdldEZpbGU+O1xuICBmb3IgKGNvbnN0IGl0ZXIgb2YgX2FyZ3MpIHtcbiAgICBpZiAodHlwZW9mIGl0ZXIgPT09IFwic3RyaW5nXCIpXG4gICAgICBhcmdzLnB1c2goaXRlcik7XG4gICAgZWxzZSBpZiAoaXRlciBpbnN0YW5jZW9mIFRhcmdldEZpbGUpXG4gICAgICBhcmdzLnB1c2goaXRlcik7XG4gICAgZWxzZSBpZiAoaXRlciBpbnN0YW5jZW9mIEFic29sdXRlUGF0aClcbiAgICAgIGFyZ3MucHVzaChpdGVyKTtcbiAgICBlbHNlXG4gICAgICB0aHJvdyBuZXcgVHlwZUVycm9yKGBXcm9uZyB0eXBlICR7aXRlcn0gZm9yIGFyZ3VtZW50YCk7XG4gIH1cblxuICByZXR1cm4geyBjb21tYW5kLCBhcmdzIH07XG59XG5cbmNvbnN0IFRBUkdFVF9TQ09QRSA9IFN5bWJvbChcIlRBUkdFVF9TQ09QRVwiKTtcblxuaW50ZXJmYWNlIFRhcmdldFZhbHVlPFQ+IHtcbiAgdmFsdWU6IFQ7XG4gIHB1YmxpY09ubHk6IGJvb2xlYW47XG59O1xuXG50eXBlIFRhcmdldFZhbHVlTGlzdDxUPiA9IEFycmF5PFRhcmdldFZhbHVlPFQ+PjtcblxuYWJzdHJhY3QgY2xhc3MgQmFzZVRhcmdldCBleHRlbmRzIEludGVyZmFjZVRhcmdldCB7XG4gIHByb3RlY3RlZCBbVEFSR0VUX1NDT1BFXTogU3lzdGVtU2NvcGU7XG5cbiAgcHJvdGVjdGVkIF9uYW1lOiBzdHJpbmc7XG4gIHByb3RlY3RlZCBfaW5jbHVkZXM6IFRhcmdldFZhbHVlTGlzdDxBYnNvbHV0ZVBhdGggfCBUYXJnZXRJbmNsdWRlcz47XG4gIHByb3RlY3RlZCBfZGVmaW5pdGlvbnM6IFRhcmdldFZhbHVlTGlzdDxzdHJpbmc+O1xuICBwcm90ZWN0ZWQgX2NvbXBpbGVPcHRpb25zOiBUYXJnZXRWYWx1ZUxpc3Q8c3RyaW5nIHwgc3RyaW5nW10+O1xuICBwcm90ZWN0ZWQgX2xpbmtPcHRpb25zOiBUYXJnZXRWYWx1ZUxpc3Q8c3RyaW5nIHwgc3RyaW5nW10+O1xuICBwcm90ZWN0ZWQgX2xpYnJhcmllczogVGFyZ2V0VmFsdWVMaXN0PFBvc3RUYXJnZXQ+O1xuICBwcm90ZWN0ZWQgX3NvdXJjZXM6IFRhcmdldFZhbHVlTGlzdDxUYXJnZXRPYmplY3RzIHwgU291cmNlRmlsZT47XG4gIHByb3RlY3RlZCBfcHJlQnVpbGRMaXN0OiBUYXJnZXRDb21tYW5kW107XG4gIHByb3RlY3RlZCBfcG9zdEJ1aWxkTGlzdDogVGFyZ2V0Q29tbWFuZFtdO1xuXG4gIGNvbnN0cnVjdG9yKHZhcmlhYmxlTWFwOiBWYXJpYWJsZU1hcCwgbmFtZTogc3RyaW5nKSB7XG4gICAgc3VwZXIoKTtcblxuICAgIGlmICh0eXBlb2YgbmFtZSAhPT0gXCJzdHJpbmdcIilcbiAgICAgIHRocm93IG5ldyBFcnJvcihgVGFyZ2V0IFwiJHtuYW1lfVwiIGlzIG5vdCBzdHJpbmcgdHlwZWApO1xuXG4gICAgaWYgKCFuYW1lKVxuICAgICAgdGhyb3cgbmV3IEVycm9yKGBBIHRhcmdldCB3aXRoIGFuIGVtcHR5IG5hbWUgY2Fubm90IGV4aXN0YCk7XG5cbiAgICBpZiAoWyBBTExfVEFSR0VULCBJTlNUQUxMX1RBUkdFVCBdLmluY2x1ZGVzKG5hbWUpKVxuICAgICAgdGhyb3cgbmV3IEVycm9yKGBUYXJnZXQgXCIke25hbWV9XCIgaXMgcmVzZXJ2ZWQgbmFtZWApO1xuXG4gICAgY29uc3QgdmFyaWFibGVzID0gU2NvcGVIZWxwZXIuY3JlYXRlVmFyaWFibGVWYWx1ZXModmFyaWFibGVNYXAsIFNZU1RFTV9WQVJJQUJMRV9HUk9VUCkgYXMgU3lzdGVtU2NvcGU7XG4gICAgdGhpc1tUQVJHRVRfU0NPUEVdID0gdmFyaWFibGVzO1xuICAgIHRoaXMuX25hbWUgPSBuYW1lO1xuICAgIHRoaXMuX2luY2x1ZGVzID0gW107XG4gICAgdGhpcy5fZGVmaW5pdGlvbnMgPSBbXTtcbiAgICB0aGlzLl9jb21waWxlT3B0aW9ucyA9IFtdO1xuICAgIHRoaXMuX2xpbmtPcHRpb25zID0gW107XG4gICAgdGhpcy5fbGlicmFyaWVzID0gW107XG4gICAgdGhpcy5fc291cmNlcyA9IFtdO1xuICAgIHRoaXMuX3ByZUJ1aWxkTGlzdCA9IFtdO1xuICAgIHRoaXMuX3Bvc3RCdWlsZExpc3QgPSBbXTtcbiAgfVxuXG4gIHB1YmxpYyBnZXQgdGFyZ2V0TmFtZSgpIHtcbiAgICByZXR1cm4gdGhpcy5fbmFtZTtcbiAgfVxuXG4gIHB1YmxpYyBnZXQgbmFtZSgpIHsgLy8gREVMTUVcbiAgICByZXR1cm4gdGhpcy5fbmFtZTtcbiAgfVxuXG4gIHB1YmxpYyBnZXQgaW5jbHVkZXMoKTogVGFyZ2V0SW5jbHVkZXMge1xuICAgIHJldHVybiBUYXJnZXRJbmNsdWRlcy5jcmVhdGUodGhpcy5fbmFtZSk7XG4gIH1cblxuICBwdWJsaWMgZ2V0IG9iamVjdHMoKTogVGFyZ2V0T2JqZWN0cyB7XG4gICAgcmV0dXJuIFRhcmdldE9iamVjdHMuY3JlYXRlKHRoaXMuX25hbWUpO1xuICB9XG5cbiAgcHVibGljIGdldCB0YXJnZXRGaWxlKCk6IFRhcmdldEZpbGUge1xuICAgIHJldHVybiBUYXJnZXRGaWxlLmNyZWF0ZSh0aGlzLl9uYW1lKTtcbiAgfVxuXG4gIHB1YmxpYyBnZXRJbmNsdWRlcygpOiBBcnJheTxBYnNvbHV0ZVBhdGggfCBUYXJnZXRJbmNsdWRlcz4ge1xuICAgIHJldHVybiB0aGlzLl9pbmNsdWRlcy5tYXAoaSA9PiBpLnZhbHVlKTtcbiAgfVxuXG4gIHB1YmxpYyBnZXRQdWJsaWNJbmNsdWRlcygpOiBBcnJheTxBYnNvbHV0ZVBhdGggfCBUYXJnZXRJbmNsdWRlcz4ge1xuICAgIHJldHVybiB0aGlzLl9pbmNsdWRlcy5maWx0ZXIoaSA9PiBpLnB1YmxpY09ubHkpLm1hcChpID0+IGkudmFsdWUpO1xuICB9XG5cbiAgcHVibGljIGFkZEluY2x1ZGVzKC4uLmluY2x1ZGVzOiBBcnJheTxUYXJnZXRJbmNsdWRlcyB8IEFic29sdXRlUGF0aCB8IHN0cmluZz4pOiB2b2lkIHtcbiAgICB0aGlzLmFkZEluY2x1ZGVzSW1wbChmYWxzZSwgLi4uaW5jbHVkZXMpO1xuICB9XG5cbiAgcHVibGljIGFkZFB1YmxpY0luY2x1ZGVzKC4uLmluY2x1ZGVzOiBBcnJheTxUYXJnZXRJbmNsdWRlcyB8IEFic29sdXRlUGF0aCB8IHN0cmluZz4pOiB2b2lkIHtcbiAgICB0aGlzLmFkZEluY2x1ZGVzSW1wbCh0cnVlLCAuLi5pbmNsdWRlcyk7XG4gIH1cblxuICBwdWJsaWMgYWRkSW5jbHVkZUltcGwocHVibGljT25seTogYm9vbGVhbiwgdmFsdWU6IEFic29sdXRlUGF0aCB8IFRhcmdldEluY2x1ZGVzKTogdm9pZCB7XG4gICAgdGhpcy5faW5jbHVkZXMucHVzaCh7cHVibGljT25seSwgdmFsdWV9KTtcbiAgfVxuXG4gIHB1YmxpYyBhZGRJbmNsdWRlc0ltcGwocHVibGljT25seTogYm9vbGVhbiwgLi4uaW5jbHVkZXM6IEFycmF5PFRhcmdldEluY2x1ZGVzIHwgQWJzb2x1dGVQYXRoIHwgc3RyaW5nPik6IHZvaWQge1xuICAgIGNvbnN0IGJhc2VEaXIgPSB0aGlzW1RBUkdFVF9TQ09QRV0uU09VUkNFX0RJUjtcbiAgICBmb3IgKGNvbnN0IGl0ZXIgb2Ygbm9ybWFsaXplSW5jbHVkZXMoYmFzZURpciwgLi4uaW5jbHVkZXMpKVxuICAgICAgdGhpcy5hZGRJbmNsdWRlSW1wbChwdWJsaWNPbmx5LCBpdGVyKTtcbiAgfVxuXG4gIHB1YmxpYyBnZXREZWZpbml0aW9ucygpOiBBcnJheTxzdHJpbmc+IHtcbiAgICByZXR1cm4gdGhpcy5fZGVmaW5pdGlvbnMubWFwKGkgPT4gaS52YWx1ZSk7XG4gIH1cblxuICBwdWJsaWMgZ2V0UHVibGljRGVmaW5pdGlvbnMoKTogQXJyYXk8c3RyaW5nPiB7XG4gICAgcmV0dXJuIHRoaXMuX2RlZmluaXRpb25zLmZpbHRlcihpID0+IGkucHVibGljT25seSkubWFwKGkgPT4gaS52YWx1ZSk7XG4gIH1cblxuICBwdWJsaWMgYWRkRGVmaW5pdGlvbnMoLi4uZGVmaW5pdGlvbnM6IGFueSk6IHZvaWQge1xuICAgIHRoaXMuYWRkRGVmaW5pdGlvbnNJbXBsKGZhbHNlLCAuLi5kZWZpbml0aW9ucyk7XG4gIH1cblxuICBwdWJsaWMgYWRkUHVibGljRGVmaW5pdGlvbnMoLi4uZGVmaW5pdGlvbnM6IGFueSk6IHZvaWQge1xuICAgIHRoaXMuYWRkRGVmaW5pdGlvbnNJbXBsKHRydWUsIC4uLmRlZmluaXRpb25zKTtcbiAgfVxuXG4gIHB1YmxpYyBhZGREZWZpbml0aW9uc0ltcGwocHVibGljT25seTogYm9vbGVhbiwgLi4uZGVmaW5pdGlvbnM6IEFycmF5PHN0cmluZyB8IG9iamVjdD4pOiB2b2lkIHtcbiAgICBmb3IgKGNvbnN0IHZhbHVlIG9mIG5vcm1hbGl6ZURlZmluaXRpb25zKC4uLmRlZmluaXRpb25zKSlcbiAgICAgIHRoaXMuX2RlZmluaXRpb25zLnB1c2goe3B1YmxpY09ubHksIHZhbHVlfSk7XG4gIH1cblxuICBwdWJsaWMgZ2V0Q29tcGlsZU9wdGlvbnMoKTogQXJyYXk8c3RyaW5nIHwgc3RyaW5nW10+IHtcbiAgICByZXR1cm4gdGhpcy5fY29tcGlsZU9wdGlvbnMubWFwKGkgPT4gaS52YWx1ZSk7XG4gIH1cbiAgXG4gIHB1YmxpYyBnZXRQdWJsaWNDb21waWxlT3B0aW9ucygpOiBBcnJheTxzdHJpbmd8c3RyaW5nW10+IHtcbiAgICByZXR1cm4gdGhpcy5fY29tcGlsZU9wdGlvbnMuZmlsdGVyKGkgPT4gaS5wdWJsaWNPbmx5KS5tYXAoaSA9PiBpLnZhbHVlKTtcbiAgfVxuXG4gIHB1YmxpYyBhZGRDb21waWxlT3B0aW9ucyguLi5vcHRpb25zOiBBcnJheTxzdHJpbmcgfCBzdHJpbmdbXT4pOiB2b2lkIHtcbiAgICB0aGlzLmFkZENvbXBpbGVPcHRpb25zSW1wbChmYWxzZSwgLi4ub3B0aW9ucyk7XG4gIH1cblxuICBwdWJsaWMgYWRkUHVibGljQ29tcGlsZU9wdGlvbnMoLi4ub3B0aW9uczogQXJyYXk8c3RyaW5nIHwgc3RyaW5nW10+KTogdm9pZCB7XG4gICAgdGhpcy5hZGRDb21waWxlT3B0aW9uc0ltcGwodHJ1ZSwgLi4ub3B0aW9ucyk7XG4gIH1cblxuICBwdWJsaWMgYWRkQ29tcGlsZU9wdGlvbnNJbXBsKHB1YmxpY09ubHk6IGJvb2xlYW4sIC4uLm9wdGlvbnM6IEFycmF5PHN0cmluZyB8IHN0cmluZ1tdPik6IHZvaWQge1xuICAgIGZvciAoY29uc3QgdmFsdWUgb2Ygb3B0aW9ucy5mbGF0KCkpXG4gICAgICB0aGlzLl9jb21waWxlT3B0aW9ucy5wdXNoKHtwdWJsaWNPbmx5LCB2YWx1ZX0pO1xuICB9XG5cbiAgcHVibGljIGdldExpbmtPcHRpb25zKCk6IEFycmF5PHN0cmluZyB8IHN0cmluZ1tdPiB7XG4gICAgcmV0dXJuIHRoaXMuX2xpbmtPcHRpb25zLm1hcChpID0+IGkudmFsdWUpO1xuICB9XG5cbiAgcHVibGljIGdldFB1YmxpY0xpbmtPcHRpb25zKCk6IEFycmF5PHN0cmluZyB8IHN0cmluZ1tdPiB7XG4gICAgcmV0dXJuIHRoaXMuX2xpbmtPcHRpb25zLmZpbHRlcihpID0+IGkucHVibGljT25seSkubWFwKGkgPT4gaS52YWx1ZSk7XG4gIH1cblxuICBwdWJsaWMgYWRkTGlua09wdGlvbnMoLi4ub3B0aW9uczogQXJyYXk8c3RyaW5nIHwgc3RyaW5nW10+KSB7XG4gICAgdGhpcy5hZGRMaW5rT3B0aW9uc0ltcGwoZmFsc2UsIC4uLm9wdGlvbnMpO1xuICB9XG5cbiAgcHVibGljIGFkZFB1YmxpY0xpbmtPcHRpb25zKC4uLm9wdGlvbnM6IEFycmF5PHN0cmluZyB8IHN0cmluZ1tdPikge1xuICAgIHRoaXMuYWRkTGlua09wdGlvbnNJbXBsKHRydWUsIC4uLm9wdGlvbnMpO1xuICB9XG5cbiAgcHVibGljIGFkZExpbmtPcHRpb25zSW1wbChwdWJsaWNPbmx5OiBib29sZWFuLCAuLi5vcHRpb25zOiBBcnJheTxzdHJpbmcgfCBzdHJpbmdbXT4pIHtcbiAgICBmb3IgKGNvbnN0IHZhbHVlIG9mIG9wdGlvbnMuZmxhdCgpKVxuICAgICAgdGhpcy5fbGlua09wdGlvbnMucHVzaCh7cHVibGljT25seSwgdmFsdWV9KTtcbiAgfVxuXG4gIHB1YmxpYyBnZXRMaWJyYXJpZXMoKSB7XG4gICAgcmV0dXJuIHRoaXMuX2xpYnJhcmllcy5tYXAoaSA9PiBpLnZhbHVlKTtcbiAgfVxuXG4gIHB1YmxpYyBnZXRQdWJsaWNMaWJyYXJpZXMoKSB7XG4gICAgcmV0dXJuIHRoaXMuX2xpYnJhcmllcy5maWx0ZXIoaSA9PiBpLnB1YmxpY09ubHkpLm1hcChpID0+IGkudmFsdWUpO1xuICB9XG5cbiAgcHVibGljIGFkZExpYnJhcmllcyguLi5saWJyYXJpZXM6IFBvc3RUYXJnZXRbXSkge1xuICAgIHRoaXMuYWRkTGlicmFyaWVzSW1wbChmYWxzZSwgLi4ubGlicmFyaWVzKTtcbiAgfVxuXG4gIHB1YmxpYyBhZGRQdWJsaWNMaWJyYXJpZXMoLi4ubGlicmFyaWVzOiBQb3N0VGFyZ2V0W10pIHtcbiAgICB0aGlzLmFkZExpYnJhcmllc0ltcGwodHJ1ZSwgLi4ubGlicmFyaWVzKTtcbiAgfVxuXG4gIHB1YmxpYyBhZGRMaWJyYXJpZXNJbXBsKHB1YmxpY09ubHk6IGJvb2xlYW4sIC4uLmxpYnJhcmllczogUG9zdFRhcmdldFtdKSB7XG4gICAgZm9yIChjb25zdCB2YWx1ZSBvZiBsaWJyYXJpZXMuZmxhdCgpKVxuICAgICAgdGhpcy5fbGlicmFyaWVzLnB1c2goe3B1YmxpY09ubHksIHZhbHVlfSk7XG4gIH1cblxuICBwdWJsaWMgZ2V0SGVhZGVycygpOiBTb3VyY2VGaWxlW10ge1xuICAgIGNvbnN0IHJlc3VsdCA9IG5ldyBBcnJheTxTb3VyY2VGaWxlPjtcbiAgICBmb3IgKGNvbnN0IGl0ZXIgb2YgdGhpcy5fc291cmNlcykge1xuICAgICAgaWYgKGl0ZXIudmFsdWUgaW5zdGFuY2VvZiBTb3VyY2VGaWxlICYmIGl0ZXIudmFsdWUuSEVBREVSX0ZJTEVfT05MWSlcbiAgICAgICAgcmVzdWx0LnB1c2goaXRlci52YWx1ZSk7XG4gICAgfVxuICAgIHJldHVybiByZXN1bHQ7XG4gIH1cblxuICBwdWJsaWMgZ2V0U291cmNlcygpIHtcbiAgICByZXR1cm4gdGhpcy5fc291cmNlcztcbiAgfVxuXG4gIHB1YmxpYyBnZXRTb3VyY2VGaWxlTGlzdCgpOiBTb3VyY2VGaWxlW10ge1xuICAgIHJldHVybiB0aGlzLl9zb3VyY2VzLm1hcChpID0+IGkudmFsdWUpLmZpbHRlcihpID0+IGkgaW5zdGFuY2VvZiBTb3VyY2VGaWxlKTtcbiAgfVxuXG4gIHB1YmxpYyBnZXRUYXJnZXRPYmplY3RzTGlzdCgpOiBUYXJnZXRPYmplY3RzW10ge1xuICAgIHJldHVybiB0aGlzLl9zb3VyY2VzLm1hcChpID0+IGkudmFsdWUpLmZpbHRlcihpID0+IGkgaW5zdGFuY2VvZiBUYXJnZXRPYmplY3RzKTtcbiAgfVxuXG4gIHB1YmxpYyBnZXRTb3VyY2VGaWxlcyguLi5zb3VyY2VzOiBhbnlbXSk6IFNvdXJjZUZpbGVMaXN0IHtcbiAgICBjb25zdCByZXN1bHQgPSBbXTtcbiAgICBjb25zdCBzY29wZSA9IHRoaXNbVEFSR0VUX1NDT1BFXTtcbiAgICBjb25zdCBzb3VyY2VGaWxlcyA9IHRoaXMuZ2V0U291cmNlRmlsZUxpc3QoKTtcbiAgICBmb3IgKGNvbnN0IGl0IG9mIHNvdXJjZXMuZmxhdCgpKSB7XG4gICAgICBjb25zdCBmaWxlbmFtZSA9IHNjb3BlLlNPVVJDRV9ESVIucmVzb2x2ZShpdCkudG9TdHJpbmcoKTtcbiAgICAgIGNvbnN0IHNyYyA9IHNvdXJjZUZpbGVzLmZpbmQoaSA9PiBpLkZJTEUudG9TdHJpbmcoKSA9PT0gZmlsZW5hbWUpO1xuICAgICAgaWYgKCFzcmMpXG4gICAgICAgIHRocm93IG5ldyBFcnJvcihgQ2Fubm90IGZpbmQgXCIke2l0fVwiYCk7XG4gICAgICByZXN1bHQucHVzaChzcmMpO1xuICAgIH1cblxuICAgIGlmIChyZXN1bHQubGVuZ3RoKVxuICAgICAgcmV0dXJuIFNvdXJjZUZpbGVMaXN0LmNyZWF0ZShzY29wZSwgcmVzdWx0KTtcblxuICAgIHJldHVybiBTb3VyY2VGaWxlTGlzdC5jcmVhdGUoc2NvcGUsIHNvdXJjZUZpbGVzKTtcbiAgfVxuXG4gIHB1YmxpYyBhZGRTb3VyY2VzKC4uLnNvdXJjZXM6IEFycmF5PFRhcmdldE9iamVjdHMgfCBTb3VyY2VGaWxlIHwgQWJzb2x1dGVQYXRoIHwgc3RyaW5nPikge1xuICAgIGZvciAobGV0IGl0IG9mIHNvdXJjZXMuZmxhdCgpKSB7XG4gICAgICB0aGlzLl9zb3VyY2VzLnB1c2goe3B1YmxpY09ubHk6IGZhbHNlLCB2YWx1ZTogY3JlYXRlU291cmNlcyh0aGlzW1RBUkdFVF9TQ09QRV0sIGl0KX0pO1xuICAgIH1cbiAgfVxuXG4gIHB1YmxpYyBnZXQgcHJlQnVpbGRMaXN0KCkge1xuICAgIHJldHVybiB0aGlzLl9wcmVCdWlsZExpc3Q7XG4gIH1cblxuICBwdWJsaWMgYWRkUHJlQnVpbGQoY29tbWFuZDogYW55LCBhcmdzOiBhbnlbXSkge1xuICAgIHRoaXMuX3ByZUJ1aWxkTGlzdC5wdXNoKG1ha2VUYXJnZXRDb21tYW5kKGNvbW1hbmQsIGFyZ3MpKTtcbiAgfVxuXG4gIHB1YmxpYyBnZXQgcG9zdEJ1aWxkTGlzdCgpIHtcbiAgICByZXR1cm4gdGhpcy5fcG9zdEJ1aWxkTGlzdDtcbiAgfVxuXG4gIHB1YmxpYyBhZGRQb3N0QnVpbGQoY29tbWFuZDogYW55LCBhcmdzOiBhbnlbXSkge1xuICAgIHRoaXMuX3Bvc3RCdWlsZExpc3QucHVzaChtYWtlVGFyZ2V0Q29tbWFuZChjb21tYW5kLCBhcmdzKSk7XG4gIH1cblxuICBwdWJsaWMgdG9KU09OKCk6IG9iamVjdCB7XG4gICAgcmV0dXJuIHtcbiAgICAgIG5hbWU6IHRoaXMuX25hbWUsXG4gICAgICBwcmVCdWlsZExpc3Q6IHRoaXMuX3ByZUJ1aWxkTGlzdCxcbiAgICAgIHBvc3RCdWlsZExpc3Q6IHRoaXMuX3Bvc3RCdWlsZExpc3QsXG4gICAgICBpbmNsdWRlczogdGhpcy5faW5jbHVkZXMsXG4gICAgICBjb21waWxlT3B0aW9uczogdGhpcy5fY29tcGlsZU9wdGlvbnMsXG4gICAgICBsaW5rT3B0aW9uczogdGhpcy5fbGlua09wdGlvbnMsXG4gICAgICBzb3VyY2VzOiB0aGlzLl9zb3VyY2VzLFxuICAgICAgbGlicmFyaWVzOiB0aGlzLl9saWJyYXJpZXMsXG4gICAgfVxuICB9XG59O1xuXG5leHBvcnQgY2xhc3MgUG9zdFRhcmdldCBleHRlbmRzIEJhc2VUYXJnZXQge1xuICBwcml2YXRlIF9wcmVmaXg/OiBzdHJpbmc7XG4gIHByaXZhdGUgX291dHB1dE5hbWU/OiBzdHJpbmc7XG4gIHByaXZhdGUgX3N1ZmZpeD86IHN0cmluZztcbiAgcHJpdmF0ZSBfcG9zaXRpb25JbmRlcGVuZGVudENvZGU/OiBib29sZWFuO1xuXG4gIHByaXZhdGUgY29uc3RydWN0b3IodmFyaWFibGVNYXA6IFZhcmlhYmxlTWFwLCBuYW1lOiBzdHJpbmcpIHtcbiAgICBzdXBlcih2YXJpYWJsZU1hcCwgbmFtZSk7XG4gIH1cblxuICBwdWJsaWMgc3RhdGljIGNyZWF0ZSh2YXJpYWJsZU1hcDogVmFyaWFibGVNYXAsIG5hbWU6IHN0cmluZykge1xuICAgIHJldHVybiBPYmplY3Quc2VhbChuZXcgUG9zdFRhcmdldCh2YXJpYWJsZU1hcCwgbmFtZSkpO1xuICB9XG5cbiAgcHVibGljIHN0YXRpYyBlbnN1cmVJbnN0YW5jZSh2YWx1ZTogYW55KSB7XG4gICAgaWYgKHZhbHVlIGluc3RhbmNlb2YgUG9zdFRhcmdldClcbiAgICAgIHJldHVybiB2YWx1ZTtcbiAgICB0aHJvdyBuZXcgRXJyb3IoYFRoZSAnJHt2YWx1ZX0nIGlzIG5vdCBhIFBvc3RUYXJnZXRgKTtcbiAgfVxuXG4gIHB1YmxpYyBnZXQgcHJlZml4KCkge1xuICAgIHJldHVybiB0aGlzLl9wcmVmaXg7XG4gIH1cblxuICBwdWJsaWMgc2V0UHJlZml4KHZhbHVlOiBzdHJpbmcpIHtcbiAgICB0aGlzLl9wcmVmaXggPSB2YWx1ZTtcbiAgfVxuXG4gIHB1YmxpYyBnZXQgb3V0cHV0TmFtZSgpIHtcbiAgICByZXR1cm4gdGhpcy5fb3V0cHV0TmFtZTtcbiAgfVxuXG4gIHB1YmxpYyBzZXRPdXRwdXROYW1lKHZhbHVlOiBhbnkpIHtcbiAgICB0aGlzLl9vdXRwdXROYW1lID0gdmFsdWU7XG4gIH1cblxuICBwdWJsaWMgZ2V0IHN1ZmZpeCgpIHtcbiAgICByZXR1cm4gdGhpcy5fc3VmZml4O1xuICB9XG5cbiAgcHVibGljIHNldFN1ZmZpeCh2YWx1ZTogc3RyaW5nKSB7XG4gICAgdGhpcy5fc3VmZml4ID0gdmFsdWU7XG4gIH1cblxuICBwdWJsaWMgZ2V0IHBvc2l0aW9uSW5kZXBlbmRlbnRDb2RlKCkge1xuICAgIHJldHVybiB0aGlzLl9wb3NpdGlvbkluZGVwZW5kZW50Q29kZTtcbiAgfVxuXG4gIHB1YmxpYyBzZXRQb3NpdGlvbkluZGVwZW5kZW50Q29kZSh2YWx1ZTogYm9vbGVhbikge1xuICAgIHRoaXMuX3Bvc2l0aW9uSW5kZXBlbmRlbnRDb2RlID0gdmFsdWU7XG4gIH1cblxuICBwdWJsaWMgZ2V0IElOQ0xVREVTKCkge1xuICAgIHJldHVybiB0aGlzLl9pbmNsdWRlcztcbiAgfVxuXG4gIHB1YmxpYyBnZXQgREVGSU5JVElPTlMoKSB7XG4gICAgcmV0dXJuIHRoaXMuX2RlZmluaXRpb25zO1xuICB9XG5cbiAgcHVibGljIGdldCBDT01QSUxFX09QVElPTlMoKSB7XG4gICAgcmV0dXJuIHRoaXMuX2NvbXBpbGVPcHRpb25zO1xuICB9XG5cbiAgcHVibGljIGdldCBMSU5LX09QVElPTlMoKSB7XG4gICAgcmV0dXJuIHRoaXMuX2xpbmtPcHRpb25zO1xuICB9XG5cbiAgcHVibGljIGdldCBMSUJSQVJJRVMoKSB7XG4gICAgcmV0dXJuIHRoaXMuX2xpYnJhcmllcztcbiAgfVxuXG4gIHB1YmxpYyBnZXQgU09VUkNFUygpIHtcbiAgICByZXR1cm4gdGhpcy5fc291cmNlcztcbiAgfVxuXG4gIHB1YmxpYyB0b0pTT04oKTogU2ltcGxlT2JqZWN0IHtcbiAgICBjb25zdCByZXN1bHQ6IGFueSA9IHN1cGVyLnRvSlNPTigpO1xuXG4gICAgcmVzdWx0LnR5cGUgPSBQb3N0VGFyZ2V0Lm5hbWU7XG4gICAgXG4gICAgaWYgKHRoaXMuX3ByZWZpeCAhPT0gdW5kZWZpbmVkKVxuICAgICAgcmVzdWx0LnByZWZpeCA9IHRoaXMuX3ByZWZpeDtcblxuICAgIGlmICh0aGlzLl9vdXRwdXROYW1lICE9PSB1bmRlZmluZWQpXG4gICAgICByZXN1bHQub3V0cHV0TmFtZSA9IHRoaXMuX291dHB1dE5hbWU7XG5cbiAgICBpZiAodGhpcy5fc3VmZml4ICE9PSB1bmRlZmluZWQpXG4gICAgICByZXN1bHQuc3VmZml4ID0gdGhpcy5fc3VmZml4O1xuXG4gICAgaWYgKHRoaXMuX3Bvc2l0aW9uSW5kZXBlbmRlbnRDb2RlICE9PSB1bmRlZmluZWQpXG4gICAgICByZXN1bHQucG9zaXRpb25JbmRlcGVuZGVudENvZGUgPSB0aGlzLl9wb3NpdGlvbkluZGVwZW5kZW50Q29kZTtcblxuICAgIHJldHVybiByZXN1bHQ7XG4gIH1cbn07XG5cbmV4cG9ydCBjbGFzcyBNYWluVGFyZ2V0IGV4dGVuZHMgQmFzZVRhcmdldCB7XG4gIHByb3RlY3RlZCBfZmlsZURpcjogQWJzb2x1dGVQYXRoXG4gIHByb3RlY3RlZCBfcHJlZml4ID0gXCJcIjtcbiAgcHJvdGVjdGVkIF9vdXRwdXROYW1lOiBzdHJpbmc7XG4gIHByb3RlY3RlZCBfc3VmZml4ID0gXCJcIjtcbiAgcHJvdGVjdGVkIF9wb3NpdGlvbkluZGVwZW5kZW50Q29kZTogYm9vbGVhbjtcblxuICBwcm90ZWN0ZWQgY29uc3RydWN0b3IodmFyaWFibGVNYXA6IFZhcmlhYmxlTWFwLCBuYW1lOiBzdHJpbmcpIHtcbiAgICBzdXBlcih2YXJpYWJsZU1hcCwgbmFtZSk7XG5cbiAgICB0aGlzLl9maWxlRGlyID0gdGhpc1tUQVJHRVRfU0NPUEVdLkJJTkFSWV9ESVI7XG4gICAgdGhpcy5fb3V0cHV0TmFtZSA9IG5hbWU7XG4gICAgdGhpcy5fcG9zaXRpb25JbmRlcGVuZGVudENvZGUgPSB0aGlzW1RBUkdFVF9TQ09QRV0uUE9TSVRJT05fSU5ERVBFTkRFTlRfQ09ERTtcblxuICAgIHRoaXMuYWRkSW5jbHVkZXNJbXBsKGZhbHNlLCAuLi50aGlzW1RBUkdFVF9TQ09QRV0uSU5DTFVERVMpO1xuICB9XG5cbiAgcHVibGljIGdldEZpbGVEaXIoKSB7XG4gICAgcmV0dXJuIHRoaXMuX2ZpbGVEaXI7XG4gIH1cblxuICBwdWJsaWMgZ2V0RmlsZU5hbWUoKSB7XG4gICAgcmV0dXJuIHRoaXMucHJlZml4ICsgdGhpcy5vdXRwdXROYW1lICsgdGhpcy5zdWZmaXg7XG4gIH1cblxuICBwdWJsaWMgZ2V0RmlsZSgpIHtcbiAgICByZXR1cm4gdGhpcy5fZmlsZURpci5qb2luKHRoaXMuZ2V0RmlsZU5hbWUoKSk7XG4gIH1cblxuICBwdWJsaWMgZ2V0IHByZWZpeCgpIHtcbiAgICByZXR1cm4gdGhpcy5fcHJlZml4O1xuICB9XG5cbiAgcHVibGljIHNldFByZWZpeCh2YWx1ZTogc3RyaW5nKSB7XG4gICAgdGhpcy5fcHJlZml4ID0gdmFsdWU7XG4gIH1cblxuICBwdWJsaWMgZ2V0IHN1ZmZpeCgpIHtcbiAgICByZXR1cm4gdGhpcy5fc3VmZml4O1xuICB9XG5cbiAgcHVibGljIHNldFN1ZmZpeCh2YWx1ZTogYW55KSB7XG4gICAgdGhpcy5fc3VmZml4ID0gdmFsdWU7XG4gIH1cblxuICBwdWJsaWMgZ2V0IG91dHB1dE5hbWUoKSB7XG4gICAgcmV0dXJuIHRoaXMuX291dHB1dE5hbWU7XG4gIH1cblxuICBwdWJsaWMgc2V0T3V0cHV0TmFtZSh2YWx1ZTogYW55KSB7XG4gICAgdGhpcy5fb3V0cHV0TmFtZSA9IHZhbHVlO1xuICB9XG5cbiAgcHVibGljIGdldCBUQVJHRVRfU0NPUEUoKSB7XG4gICAgcmV0dXJuIHRoaXNbVEFSR0VUX1NDT1BFXTtcbiAgfVxuXG4gIHB1YmxpYyBnZXQgcG9zaXRpb25JbmRlcGVuZGVudENvZGUoKSB7XG4gICAgcmV0dXJuIHRoaXMuX3Bvc2l0aW9uSW5kZXBlbmRlbnRDb2RlO1xuICB9XG5cbiAgcHVibGljIHNldFBvc2l0aW9uSW5kZXBlbmRlbnRDb2RlKHZhbHVlOiBib29sZWFuKSB7XG4gICAgdGhpcy5fcG9zaXRpb25JbmRlcGVuZGVudENvZGUgPSB2YWx1ZTtcbiAgfVxuXG4gIHB1YmxpYyBwb3N0VXBkYXRlKHRhcmdldDogUG9zdFRhcmdldCkge1xuICAgIGlmICh0YXJnZXQucHJlZml4ICE9PSB1bmRlZmluZWQpXG4gICAgICB0aGlzLl9wcmVmaXggPSB0YXJnZXQucHJlZml4O1xuICAgIGlmICh0YXJnZXQub3V0cHV0TmFtZSAhPT0gdW5kZWZpbmVkKVxuICAgICAgdGhpcy5fb3V0cHV0TmFtZSA9IHRhcmdldC5vdXRwdXROYW1lO1xuICAgIGlmICh0YXJnZXQuc3VmZml4ICE9PSB1bmRlZmluZWQpXG4gICAgICB0aGlzLl9zdWZmaXggPSB0YXJnZXQuc3VmZml4O1xuICAgIGlmICh0YXJnZXQucG9zaXRpb25JbmRlcGVuZGVudENvZGUgIT09IHVuZGVmaW5lZClcbiAgICAgIHRoaXMuX3Bvc2l0aW9uSW5kZXBlbmRlbnRDb2RlID0gdGFyZ2V0LnBvc2l0aW9uSW5kZXBlbmRlbnRDb2RlO1xuICAgIHRoaXMuX2luY2x1ZGVzLnB1c2goLi4udGFyZ2V0LklOQ0xVREVTKTtcbiAgICB0aGlzLl9kZWZpbml0aW9ucy5wdXNoKC4uLnRhcmdldC5ERUZJTklUSU9OUyk7XG4gICAgdGhpcy5fY29tcGlsZU9wdGlvbnMucHVzaCguLi50YXJnZXQuQ09NUElMRV9PUFRJT05TKTtcbiAgICB0aGlzLl9saW5rT3B0aW9ucy5wdXNoKC4uLnRhcmdldC5MSU5LX09QVElPTlMpO1xuICAgIHRoaXMuX2xpYnJhcmllcy5wdXNoKC4uLnRhcmdldC5MSUJSQVJJRVMpO1xuICAgIHRoaXMuX3NvdXJjZXMucHVzaCguLi50YXJnZXQuU09VUkNFUyk7XG4gICAgdGhpcy5fcHJlQnVpbGRMaXN0LnB1c2goLi4udGFyZ2V0LnByZUJ1aWxkTGlzdCk7XG4gICAgdGhpcy5fcG9zdEJ1aWxkTGlzdC5wdXNoKC4uLnRhcmdldC5wb3N0QnVpbGRMaXN0KTtcbiAgfVxuXG4gIHB1YmxpYyB0b0pTT04oKTogb2JqZWN0IHtcbiAgICBjb25zdCByZXN1bHQ6IGFueSA9IHN1cGVyLnRvSlNPTigpO1xuXG4gICAgcmVzdWx0LmZpbGVEaXIgPSB0aGlzLl9maWxlRGlyLnRvSlNPTigpO1xuICAgIHJlc3VsdC5wcmVmaXggPSB0aGlzLl9wcmVmaXg7XG4gICAgcmVzdWx0Lm91dHB1dE5hbWUgPSB0aGlzLl9vdXRwdXROYW1lO1xuICAgIHJlc3VsdC5zdWZmaXggPSB0aGlzLl9zdWZmaXg7XG4gICAgcmVzdWx0LnBvc2l0aW9uSW5kZXBlbmRlbnRDb2RlID0gdGhpcy5fcG9zaXRpb25JbmRlcGVuZGVudENvZGU7XG5cbiAgICByZXR1cm4gcmVzdWx0O1xuICB9XG59O1xuXG5leHBvcnQgY2xhc3MgT2JqZWN0TGlicmFyeSBleHRlbmRzIE1haW5UYXJnZXQge1xuICBwcml2YXRlIGNvbnN0cnVjdG9yKHZhcmlhYmxlTWFwOiBWYXJpYWJsZU1hcCwgbmFtZTogc3RyaW5nKSB7XG4gICAgc3VwZXIodmFyaWFibGVNYXAsIG5hbWUpO1xuICAgIHRoaXMuX3ByZWZpeCA9IHRoaXNbVEFSR0VUX1NDT1BFXS5PQkpFQ1RfTElCUkFSWV9QUkVGSVg7XG4gICAgdGhpcy5fc3VmZml4ID0gdGhpc1tUQVJHRVRfU0NPUEVdLk9CSkVDVF9MSUJSQVJZX1NVRkZJWDtcbiAgICB0aGlzLmFkZExpbmtPcHRpb25zSW1wbChmYWxzZSwgLi4udGhpc1tUQVJHRVRfU0NPUEVdLk9CSkVDVF9MSU5LRVJfRkxBR1MpO1xuICB9XG5cbiAgcHVibGljIHN0YXRpYyBjcmVhdGUodmFyaWFibGVNYXA6IFZhcmlhYmxlTWFwLCBuYW1lOiBzdHJpbmcpIHtcbiAgICByZXR1cm4gT2JqZWN0LnNlYWwobmV3IE9iamVjdExpYnJhcnkodmFyaWFibGVNYXAsIG5hbWUpKTtcbiAgfVxuXG4gIHB1YmxpYyB0b0pTT04oKTogU2ltcGxlT2JqZWN0IHtcbiAgICBjb25zdCByZXN1bHQ6IGFueSA9IHN1cGVyLnRvSlNPTigpO1xuICAgIHJlc3VsdC50eXBlID0gT2JqZWN0TGlicmFyeS5uYW1lO1xuICAgIHJldHVybiByZXN1bHQ7XG4gIH1cbn07XG5cbmV4cG9ydCBjbGFzcyBTdGF0aWNMaWJyYXJ5IGV4dGVuZHMgTWFpblRhcmdldCB7XG4gIHByaXZhdGUgY29uc3RydWN0b3IodmFyaWFibGVNYXA6IFZhcmlhYmxlTWFwLCBuYW1lOiBzdHJpbmcpIHtcbiAgICBzdXBlcih2YXJpYWJsZU1hcCwgbmFtZSk7XG4gICAgdGhpcy5fcHJlZml4ID0gdGhpc1tUQVJHRVRfU0NPUEVdLlNUQVRJQ19MSUJSQVJZX1BSRUZJWDtcbiAgICB0aGlzLl9zdWZmaXggPSB0aGlzW1RBUkdFVF9TQ09QRV0uU1RBVElDX0xJQlJBUllfU1VGRklYO1xuICAgIHRoaXMuYWRkTGlua09wdGlvbnNJbXBsKGZhbHNlLCAuLi50aGlzW1RBUkdFVF9TQ09QRV0uU1RBVElDX0xJTktFUl9GTEFHUyk7XG4gIH1cblxuICBwdWJsaWMgc3RhdGljIGNyZWF0ZSh2YXJpYWJsZU1hcDogVmFyaWFibGVNYXAsIG5hbWU6IHN0cmluZykge1xuICAgIHJldHVybiBPYmplY3Quc2VhbChuZXcgU3RhdGljTGlicmFyeSh2YXJpYWJsZU1hcCwgbmFtZSkpO1xuICB9XG5cbiAgcHVibGljIHRvSlNPTigpOiBTaW1wbGVPYmplY3Qge1xuICAgIGNvbnN0IHJlc3VsdDogYW55ID0gc3VwZXIudG9KU09OKCk7XG4gICAgcmVzdWx0LnR5cGUgPSBTdGF0aWNMaWJyYXJ5Lm5hbWU7XG4gICAgcmV0dXJuIHJlc3VsdDtcbiAgfVxufTtcblxuZXhwb3J0IGNsYXNzIFNoYXJlZExpYnJhcnkgZXh0ZW5kcyBNYWluVGFyZ2V0IHtcbiAgcHJpdmF0ZSBjb25zdHJ1Y3Rvcih2YXJpYWJsZU1hcDogVmFyaWFibGVNYXAsIG5hbWU6IHN0cmluZykge1xuICAgIHN1cGVyKHZhcmlhYmxlTWFwLCBuYW1lKTtcbiAgICB0aGlzLl9wcmVmaXggPSB0aGlzW1RBUkdFVF9TQ09QRV0uU0hBUkVEX0xJQlJBUllfUFJFRklYO1xuICAgIHRoaXMuX3N1ZmZpeCA9IHRoaXNbVEFSR0VUX1NDT1BFXS5TSEFSRURfTElCUkFSWV9TVUZGSVg7XG4gICAgdGhpcy5hZGRMaW5rT3B0aW9uc0ltcGwoZmFsc2UsIC4uLnRoaXNbVEFSR0VUX1NDT1BFXS5TSEFSRURfTElOS0VSX0ZMQUdTKTtcbiAgfVxuXG4gIHB1YmxpYyBzdGF0aWMgY3JlYXRlKHZhcmlhYmxlTWFwOiBWYXJpYWJsZU1hcCwgbmFtZTogc3RyaW5nKSB7XG4gICAgcmV0dXJuIE9iamVjdC5zZWFsKG5ldyBTaGFyZWRMaWJyYXJ5KHZhcmlhYmxlTWFwLCBuYW1lKSk7XG4gIH1cblxuICBwdWJsaWMgdG9KU09OKCk6IFNpbXBsZU9iamVjdCB7XG4gICAgY29uc3QgcmVzdWx0OiBhbnkgPSBzdXBlci50b0pTT04oKTtcbiAgICByZXN1bHQudHlwZSA9IFNoYXJlZExpYnJhcnkubmFtZTtcbiAgICByZXR1cm4gcmVzdWx0O1xuICB9XG59XG5cbmV4cG9ydCBjbGFzcyBFeGVjdXRhYmxlIGV4dGVuZHMgTWFpblRhcmdldCB7XG4gIHByaXZhdGUgY29uc3RydWN0b3IodmFyaWFibGVNYXA6IFZhcmlhYmxlTWFwLCBuYW1lOiBzdHJpbmcpIHtcbiAgICBzdXBlcih2YXJpYWJsZU1hcCwgbmFtZSk7XG4gICAgdGhpcy5fcHJlZml4ID0gXCJcIjtcbiAgICB0aGlzLl9zdWZmaXggPSB0aGlzW1RBUkdFVF9TQ09QRV0uRVhFQ1VUQUJMRV9TVUZGSVg7XG4gICAgdGhpcy5hZGRMaW5rT3B0aW9uc0ltcGwoZmFsc2UsIC4uLnRoaXNbVEFSR0VUX1NDT1BFXS5FWEVfTElOS0VSX0ZMQUdTKTtcbiAgfVxuXG4gIHB1YmxpYyBzdGF0aWMgY3JlYXRlKHZhcmlhYmxlTWFwOiBWYXJpYWJsZU1hcCwgbmFtZTogc3RyaW5nKSB7XG4gICAgcmV0dXJuIE9iamVjdC5zZWFsKG5ldyBFeGVjdXRhYmxlKHZhcmlhYmxlTWFwLCBuYW1lKSk7XG4gIH1cblxuICBwdWJsaWMgdG9KU09OKCk6IFNpbXBsZU9iamVjdCB7XG4gICAgY29uc3QgcmVzdWx0OiBhbnkgPSBzdXBlci50b0pTT04oKTtcbiAgICByZXN1bHQudHlwZSA9IEV4ZWN1dGFibGUubmFtZTtcbiAgICByZXR1cm4gcmVzdWx0O1xuICB9XG59O1xuIiwiLypcbiAqIE1JVCBMaWNlbnNlXG4gKlxuICogQ29weXJpZ2h0IChjKSAyMDI1ICBZdXJpaSBZYWt1YmluICh5dXJpaS55YWt1YmluQGdtYWlsLmNvbSlcbiAqXG4gKiBQZXJtaXNzaW9uIGlzIGdyYW50ZWQgdG8gdXNlLCBjb3B5LCBtb2RpZnksIGFuZCBkaXN0cmlidXRlIHRoaXMgc29mdHdhcmVcbiAqIHVuZGVyIHRoZSBNSVQgTGljZW5zZS4gU2VlIExJQ0VOU0UgZmlsZSBmb3IgZGV0YWlscy5cbiAqL1xuXG5pbXBvcnQgeyBUYXJnZXRJbmNsdWRlcyB9ZnJvbSBcIkAvY29yZS9UYXJnZXRJbmNsdWRlc1wiO1xuaW1wb3J0IHsgTWFpblRhcmdldCwgUG9zdFRhcmdldCB9IGZyb20gXCJAL2NvcmUvVGFyZ2V0XCI7XG5pbXBvcnQgeyBBYnNvbHV0ZVBhdGggfSBmcm9tIFwiQC9jb3JlL0Fic29sdXRlUGF0aFwiO1xuaW1wb3J0IHsgU2ltcGxlT2JqZWN0IH0gZnJvbSBcIkAvY29yZS9TaW1wbGVPYmplY3RcIjtcblxuY29uc3QgRU5UUklFUyA9IFN5bWJvbChcIkVOVFJJRVNcIik7XG5cbmV4cG9ydCBjbGFzcyBUYXJnZXRDb2xsZWN0aW9uIHtcbiAgcHJpdmF0ZSBbRU5UUklFU10gPSBuZXcgTWFwPHN0cmluZywgTWFpblRhcmdldD47XG5cbiAgcHVibGljIHN0YXRpYyBjcmVhdGUoKSB7XG4gICAgcmV0dXJuIE9iamVjdC5zZWFsKG5ldyBUYXJnZXRDb2xsZWN0aW9uKTtcbiAgfVxuICBcbiAgcHVibGljIGdldCBFTlRSSUVTKCkge1xuICAgIHJldHVybiB0aGlzW0VOVFJJRVNdO1xuICB9XG5cbiAgcHVibGljIHRvSlNPTigpOiBTaW1wbGVPYmplY3Qge1xuICAgIGNvbnN0IHJlc3VsdDogU2ltcGxlT2JqZWN0ID0geyB0eXBlOiBUYXJnZXRDb2xsZWN0aW9uLm5hbWUgfTtcbiAgICB0aGlzW0VOVFJJRVNdLmZvckVhY2goKHYsIGspID0+IHZvaWQgKHJlc3VsdFtrXSA9IHYpKTtcbiAgICByZXR1cm4gcmVzdWx0O1xuICB9XG5cbiAgcHVibGljIGdldChuYW1lOiBzdHJpbmcpOiBNYWluVGFyZ2V0IHtcbiAgICBjb25zdCByZXN1bHQgPSB0aGlzW0VOVFJJRVNdLmdldChuYW1lKTtcbiAgICBpZiAoIXJlc3VsdClcbiAgICAgIHRocm93IGBUYXJnZXQgXCIke25hbWV9XCIgZG9lcyBub3QgZXhpc3RgO1xuICAgIHJldHVybiByZXN1bHQ7XG4gIH1cblxuICBwdWJsaWMgc2V0KG5hbWU6IHN0cmluZywgdGFyZ2V0OiBhbnkpIHtcbiAgICBpZiAodGhpc1tFTlRSSUVTXS5oYXMobmFtZSkpXG4gICAgICB0aHJvdyBuZXcgRXJyb3IoYFRhcmdldCBcIiR7bmFtZX1cIiBleGlzdHNgKTtcbiAgICB0aGlzW0VOVFJJRVNdLnNldChuYW1lLCB0YXJnZXQpO1xuICB9XG5cbiAgcHJpdmF0ZSBfX2dldEFsbEluY2x1ZGVzKGluY2x1ZGVzOiBzdHJpbmdbXSwgdGFyZ2V0U2V0OiBTZXQ8c3RyaW5nPiwgbGlzdDogQXJyYXk8QWJzb2x1dGVQYXRoIHwgVGFyZ2V0SW5jbHVkZXM+IHwgQXJyYXk8UG9zdFRhcmdldD4pIHtcbiAgICBmb3IgKGNvbnN0IGl0ZXIgb2YgbGlzdCkge1xuICAgICAgaWYgKGl0ZXIgaW5zdGFuY2VvZiBUYXJnZXRJbmNsdWRlcyB8fCBpdGVyIGluc3RhbmNlb2YgUG9zdFRhcmdldCkge1xuICAgICAgICBpZiAoIXRhcmdldFNldC5oYXMoaXRlci50YXJnZXROYW1lKSkge1xuICAgICAgICAgIHRhcmdldFNldC5hZGQoaXRlci50YXJnZXROYW1lKTtcbiAgICAgICAgICBjb25zdCB0YXJnZXQgPSB0aGlzLmdldChpdGVyLnRhcmdldE5hbWUpO1xuICAgICAgICAgIHRoaXMuX19nZXRBbGxJbmNsdWRlcyhpbmNsdWRlcywgdGFyZ2V0U2V0LCB0YXJnZXQuZ2V0UHVibGljSW5jbHVkZXMoKSk7XG4gICAgICAgICAgdGhpcy5fX2dldEFsbEluY2x1ZGVzKGluY2x1ZGVzLCB0YXJnZXRTZXQsIHRhcmdldC5nZXRQdWJsaWNMaWJyYXJpZXMoKSk7XG4gICAgICAgIH1cbiAgICAgIH1cbiAgICAgIGVsc2UgaWYgKGl0ZXIgaW5zdGFuY2VvZiBBYnNvbHV0ZVBhdGgpIHtcbiAgICAgICAgaWYgKCFpbmNsdWRlcy5pbmNsdWRlcyhpdGVyLnRvU3RyaW5nKCkpKVxuICAgICAgICAgIGluY2x1ZGVzLnB1c2goaXRlci50b1N0cmluZygpKTtcbiAgICAgIH1cbiAgICAgIGVsc2Uge1xuICAgICAgICB0aHJvdyBuZXcgRXJyb3IoYE5vdCBzdXBwb3J0IGluc3RhbmNlICR7aXRlcn1gKTtcbiAgICAgIH1cbiAgICB9XG4gIH1cblxuICBwdWJsaWMgYWxsSW5jbHVkZXNPZihwYXJhbXM6IHN0cmluZyB8IE1haW5UYXJnZXQpOiBzdHJpbmdbXSB7XG4gICAgY29uc3QgdGFyZ2V0ID0gKHR5cGVvZiBwYXJhbXMgPT09IFwic3RyaW5nXCIpID8gdGhpcy5nZXQocGFyYW1zKSA6IHBhcmFtcztcbiAgICBjb25zdCBpbmNsdWRlczogc3RyaW5nW10gPSBbXTtcbiAgICBjb25zdCB0YXJnZXRTZXQgPSBuZXcgU2V0KFsgdGFyZ2V0LnRhcmdldE5hbWUgXSk7XG4gICAgdGhpcy5fX2dldEFsbEluY2x1ZGVzKGluY2x1ZGVzLCB0YXJnZXRTZXQsIHRhcmdldC5nZXRJbmNsdWRlcygpKTtcbiAgICB0aGlzLl9fZ2V0QWxsSW5jbHVkZXMoaW5jbHVkZXMsIHRhcmdldFNldCwgdGFyZ2V0LmdldExpYnJhcmllcygpKTtcbiAgICByZXR1cm4gaW5jbHVkZXM7XG4gIH1cblxuICBwcml2YXRlIF9fZ2V0QWxsSGVhZGVycyhoZWFkZXJzOiBzdHJpbmdbXSwgdGFyZ2V0U2V0OiBTZXQ8c3RyaW5nPiwgbGlzdDogQXJyYXk8QWJzb2x1dGVQYXRoIHwgVGFyZ2V0SW5jbHVkZXM+IHwgQXJyYXk8UG9zdFRhcmdldD4pIHtcbiAgICBmb3IgKGNvbnN0IGl0ZXIgb2YgbGlzdCkge1xuICAgICAgaWYgKGl0ZXIgaW5zdGFuY2VvZiBUYXJnZXRJbmNsdWRlcyB8fCBpdGVyIGluc3RhbmNlb2YgUG9zdFRhcmdldCkge1xuICAgICAgICBpZiAoIXRhcmdldFNldC5oYXMoaXRlci50YXJnZXROYW1lKSkge1xuICAgICAgICAgIHRhcmdldFNldC5hZGQoaXRlci50YXJnZXROYW1lKTtcbiAgICAgICAgICBjb25zdCB0YXJnZXQgPSB0aGlzLmdldChpdGVyLnRhcmdldE5hbWUpO1xuICAgICAgICAgIGZvciAoY29uc3QgaGVhZGVyIG9mIHRhcmdldC5nZXRIZWFkZXJzKCkubWFwKChpOiBhbnkpID0+IGkuRklMRS50b1N0cmluZygpKSkge1xuICAgICAgICAgICAgaWYgKCFoZWFkZXJzLmluY2x1ZGVzKGhlYWRlci50b1N0cmluZygpKSlcbiAgICAgICAgICAgICAgaGVhZGVycy5wdXNoKGhlYWRlci50b1N0cmluZygpKTtcbiAgICAgICAgICB9XG4gICAgICAgICAgdGhpcy5fX2dldEFsbEhlYWRlcnMoaGVhZGVycywgdGFyZ2V0U2V0LCB0YXJnZXQuZ2V0UHVibGljSW5jbHVkZXMoKSk7XG4gICAgICAgICAgdGhpcy5fX2dldEFsbEhlYWRlcnMoaGVhZGVycywgdGFyZ2V0U2V0LCB0YXJnZXQuZ2V0UHVibGljTGlicmFyaWVzKCkpO1xuICAgICAgICB9XG4gICAgICB9XG4gICAgfVxuICB9XG5cbiAgcHVibGljIGFsbEhlYWRlcnNPZihwYXJhbXM6IHN0cmluZyB8IE1haW5UYXJnZXQpIHtcbiAgICBjb25zdCB0YXJnZXQgPSAodHlwZW9mIHBhcmFtcyA9PT0gXCJzdHJpbmdcIikgPyB0aGlzLmdldChwYXJhbXMpIDogcGFyYW1zO1xuICAgIGNvbnN0IGhlYWRlcnMgPSB0YXJnZXQuZ2V0SGVhZGVycygpLm1hcCgoaTogYW55KSA9PiBpLkZJTEUudG9TdHJpbmcoKSk7XG4gICAgY29uc3QgdGFyZ2V0U2V0ID0gbmV3IFNldChbIHRhcmdldC50YXJnZXROYW1lIF0pO1xuICAgIHRoaXMuX19nZXRBbGxIZWFkZXJzKGhlYWRlcnMsIHRhcmdldFNldCwgdGFyZ2V0LmdldEluY2x1ZGVzKCkpO1xuICAgIHRoaXMuX19nZXRBbGxIZWFkZXJzKGhlYWRlcnMsIHRhcmdldFNldCwgdGFyZ2V0LmdldExpYnJhcmllcygpKTtcbiAgICByZXR1cm4gaGVhZGVycztcbiAgfVxuXG4gIHByaXZhdGUgX19nZXRBbGxMaWJyYXJpZXMobGlicmFyaWVzOiBzdHJpbmdbXSwgdGFyZ2V0U2V0OiBTZXQ8c3RyaW5nPiwgbGlzdDogQXJyYXk8UG9zdFRhcmdldD4pIHtcbiAgICBmb3IgKGNvbnN0IGl0ZXIgb2YgbGlzdCkge1xuICAgICAgY29uc29sZS5hc3NlcnQoaXRlciBpbnN0YW5jZW9mIFBvc3RUYXJnZXQpO1xuICAgICAgaWYgKCF0YXJnZXRTZXQuaGFzKGl0ZXIudGFyZ2V0TmFtZSkpIHtcbiAgICAgICAgdGFyZ2V0U2V0LmFkZChpdGVyLnRhcmdldE5hbWUpO1xuICAgICAgICBjb25zdCB0YXJnZXQgPSB0aGlzLmdldChpdGVyLnRhcmdldE5hbWUpO1xuICAgICAgICBsaWJyYXJpZXMucHVzaCh0YXJnZXQuZ2V0RmlsZSgpLnRvU3RyaW5nKCkpO1xuICAgICAgICB0aGlzLl9fZ2V0QWxsTGlicmFyaWVzKGxpYnJhcmllcywgdGFyZ2V0U2V0LCB0YXJnZXQuZ2V0UHVibGljTGlicmFyaWVzKCkpO1xuICAgICAgfVxuICAgIH1cbiAgfVxuXG4gIHB1YmxpYyBhbGxMaWJyYXJpZXNPZihwYXJhbXM6IHN0cmluZyB8IE1haW5UYXJnZXQpIHtcbiAgICBjb25zdCB0YXJnZXQgPSAodHlwZW9mIHBhcmFtcyA9PT0gXCJzdHJpbmdcIikgPyB0aGlzLmdldChwYXJhbXMpIDogcGFyYW1zO1xuICAgIGNvbnN0IGxpYnJhcmllczogc3RyaW5nW10gPSBbXTtcbiAgICBjb25zdCB0YXJnZXRTZXQgPSBuZXcgU2V0KFsgdGFyZ2V0LnRhcmdldE5hbWUgXSk7XG4gICAgdGhpcy5fX2dldEFsbExpYnJhcmllcyhsaWJyYXJpZXMsIHRhcmdldFNldCwgdGFyZ2V0LmdldExpYnJhcmllcygpKTtcbiAgICByZXR1cm4gbGlicmFyaWVzO1xuICB9XG5cbiAgcHJpdmF0ZSBfX2dldEFsbERlZmluaXRpb25zKGRlZmluaXRpb25zOiBzdHJpbmdbXSwgdGFyZ2V0U2V0OiBTZXQ8c3RyaW5nPiwgbGlzdDogQXJyYXk8c3RyaW5nPiB8IEFycmF5PFBvc3RUYXJnZXQ+KSB7XG4gICAgZm9yIChjb25zdCBpdGVyIG9mIGxpc3QpIHtcbiAgICAgIGlmIChpdGVyIGluc3RhbmNlb2YgUG9zdFRhcmdldCkge1xuICAgICAgICBpZiAoIXRhcmdldFNldC5oYXMoaXRlci50YXJnZXROYW1lKSkge1xuICAgICAgICAgIHRhcmdldFNldC5hZGQoaXRlci50YXJnZXROYW1lKTtcbiAgICAgICAgICBjb25zdCB0YXJnZXQgPSB0aGlzLmdldChpdGVyLnRhcmdldE5hbWUpO1xuICAgICAgICAgIHRoaXMuX19nZXRBbGxEZWZpbml0aW9ucyhkZWZpbml0aW9ucywgdGFyZ2V0U2V0LCB0YXJnZXQuZ2V0UHVibGljRGVmaW5pdGlvbnMoKSk7XG4gICAgICAgICAgdGhpcy5fX2dldEFsbERlZmluaXRpb25zKGRlZmluaXRpb25zLCB0YXJnZXRTZXQsIHRhcmdldC5nZXRQdWJsaWNMaWJyYXJpZXMoKSk7XG4gICAgICAgIH1cbiAgICAgIH1cbiAgICAgIGVsc2UgaWYgKHR5cGVvZiBpdGVyID09PSBcInN0cmluZ1wiKSB7XG4gICAgICAgIGlmICghZGVmaW5pdGlvbnMuaW5jbHVkZXMoaXRlcikpXG4gICAgICAgICAgZGVmaW5pdGlvbnMucHVzaChpdGVyKTtcbiAgICAgIH1cbiAgICAgIGVsc2Uge1xuICAgICAgICB0aHJvdyBuZXcgRXJyb3IoYE5vdCBzdXBwb3J0IGluc3RhbmNlICR7aXRlcn1gKTtcbiAgICAgIH1cbiAgICB9XG4gIH1cblxuICBwdWJsaWMgYWxsRGVmaW5pdGlvbnNPZihwYXJhbXM6IHN0cmluZyB8IE1haW5UYXJnZXQpIHtcbiAgICBjb25zdCB0YXJnZXQgPSAodHlwZW9mIHBhcmFtcyA9PT0gXCJzdHJpbmdcIikgPyB0aGlzLmdldChwYXJhbXMpIDogcGFyYW1zO1xuICAgIGNvbnN0IGRlZmluaXRpb25zOiBzdHJpbmdbXSA9IFtdO1xuICAgIGNvbnN0IHRhcmdldFNldCA9IG5ldyBTZXQoWyB0YXJnZXQudGFyZ2V0TmFtZSBdKTtcbiAgICB0aGlzLl9fZ2V0QWxsRGVmaW5pdGlvbnMoZGVmaW5pdGlvbnMsIHRhcmdldFNldCwgdGFyZ2V0LmdldERlZmluaXRpb25zKCkpO1xuICAgIHRoaXMuX19nZXRBbGxEZWZpbml0aW9ucyhkZWZpbml0aW9ucywgdGFyZ2V0U2V0LCB0YXJnZXQuZ2V0UHVibGljTGlicmFyaWVzKCkpO1xuICAgIHJldHVybiBkZWZpbml0aW9ucztcbiAgfVxuXG4gIHByaXZhdGUgX19nZXRBbGxDb21waWxlT3B0aW9ucyhvcHRpb25zOiBBcnJheTxzdHJpbmd8c3RyaW5nW10+LCB0YXJnZXRTZXQ6IFNldDxzdHJpbmc+LCBsaXN0OiBBcnJheTxzdHJpbmd8c3RyaW5nW10+IHwgQXJyYXk8UG9zdFRhcmdldD4pIHtcbiAgICBmb3IgKGNvbnN0IGl0ZXIgb2YgbGlzdCkge1xuICAgICAgaWYgKGl0ZXIgaW5zdGFuY2VvZiBQb3N0VGFyZ2V0KSB7XG4gICAgICAgIGlmICghdGFyZ2V0U2V0LmhhcyhpdGVyLnRhcmdldE5hbWUpKSB7XG4gICAgICAgICAgdGFyZ2V0U2V0LmFkZChpdGVyLnRhcmdldE5hbWUpO1xuICAgICAgICAgIGNvbnN0IHRhcmdldCA9IHRoaXMuZ2V0KGl0ZXIudGFyZ2V0TmFtZSk7XG4gICAgICAgICAgdGhpcy5fX2dldEFsbENvbXBpbGVPcHRpb25zKG9wdGlvbnMsIHRhcmdldFNldCwgdGFyZ2V0LmdldFB1YmxpY0NvbXBpbGVPcHRpb25zKCkpO1xuICAgICAgICAgIHRoaXMuX19nZXRBbGxDb21waWxlT3B0aW9ucyhvcHRpb25zLCB0YXJnZXRTZXQsIHRhcmdldC5nZXRQdWJsaWNMaWJyYXJpZXMoKSk7XG4gICAgICAgIH1cbiAgICAgIH1cbiAgICAgIGVsc2UgaWYgKHR5cGVvZiBpdGVyID09PSBcInN0cmluZ1wiKSB7XG4gICAgICAgIGlmICghb3B0aW9ucy5pbmNsdWRlcyhpdGVyKSlcbiAgICAgICAgICBvcHRpb25zLnB1c2goaXRlcik7XG4gICAgICB9XG4gICAgICBlbHNlIGlmIChBcnJheS5pc0FycmF5KGl0ZXIpKSB7XG4gICAgICAgIC8vIFRPRE86IEFkZCBjb21wYXJlIGZvciBzYW1lIGFycmF5IGluIG9wdGlvbnNcbiAgICAgICAgb3B0aW9ucy5wdXNoKGl0ZXIpO1xuICAgICAgfVxuICAgICAgZWxzZSB7XG4gICAgICAgIHRocm93IG5ldyBFcnJvcihgTm90IHN1cHBvcnQgaW5zdGFuY2UgJHtpdGVyfWApO1xuICAgICAgfVxuICAgIH1cbiAgfVxuXG4gIHB1YmxpYyBhbGxDb21waWxlT3B0aW9uc09mKHBhcmFtczogc3RyaW5nIHwgTWFpblRhcmdldCkge1xuICAgIGNvbnN0IHRhcmdldCA9ICh0eXBlb2YgcGFyYW1zID09PSBcInN0cmluZ1wiKSA/IHRoaXMuZ2V0KHBhcmFtcykgOiBwYXJhbXM7XG4gICAgY29uc3Qgb3B0aW9uczogc3RyaW5nW10gPSBbXTtcbiAgICBjb25zdCB0YXJnZXRTZXQgPSBuZXcgU2V0KFsgdGFyZ2V0LnRhcmdldE5hbWUgXSk7XG4gICAgdGhpcy5fX2dldEFsbENvbXBpbGVPcHRpb25zKG9wdGlvbnMsIHRhcmdldFNldCwgdGFyZ2V0LmdldENvbXBpbGVPcHRpb25zKCkpO1xuICAgIHRoaXMuX19nZXRBbGxDb21waWxlT3B0aW9ucyhvcHRpb25zLCB0YXJnZXRTZXQsIHRhcmdldC5nZXRQdWJsaWNMaWJyYXJpZXMoKSk7XG4gICAgcmV0dXJuIG9wdGlvbnMuZmxhdCgpO1xuICB9XG5cbiAgcHJpdmF0ZSBfX2dldExpbmtPcHRpb25zKG9wdGlvbnM6IEFycmF5PHN0cmluZ3xzdHJpbmdbXT4sIHRhcmdldFNldDogU2V0PHN0cmluZz4sIGxpc3Q6IEFycmF5PHN0cmluZ3xzdHJpbmdbXT4gfCBBcnJheTxQb3N0VGFyZ2V0Pikge1xuICAgIGZvciAoY29uc3QgaXRlciBvZiBsaXN0KSB7XG4gICAgICBpZiAoaXRlciBpbnN0YW5jZW9mIFBvc3RUYXJnZXQpIHtcbiAgICAgICAgaWYgKCF0YXJnZXRTZXQuaGFzKGl0ZXIudGFyZ2V0TmFtZSkpIHtcbiAgICAgICAgICB0YXJnZXRTZXQuYWRkKGl0ZXIudGFyZ2V0TmFtZSk7XG4gICAgICAgICAgY29uc3QgdGFyZ2V0ID0gdGhpcy5nZXQoaXRlci50YXJnZXROYW1lKTtcbiAgICAgICAgICB0aGlzLl9fZ2V0TGlua09wdGlvbnMob3B0aW9ucywgdGFyZ2V0U2V0LCB0YXJnZXQuZ2V0UHVibGljTGlua09wdGlvbnMoKSk7XG4gICAgICAgICAgdGhpcy5fX2dldExpbmtPcHRpb25zKG9wdGlvbnMsIHRhcmdldFNldCwgdGFyZ2V0LmdldFB1YmxpY0xpYnJhcmllcygpKTtcbiAgICAgICAgfVxuICAgICAgfVxuICAgICAgZWxzZSBpZiAodHlwZW9mIGl0ZXIgPT09IFwic3RyaW5nXCIpIHtcbiAgICAgICAgaWYgKCFvcHRpb25zLmluY2x1ZGVzKGl0ZXIpKVxuICAgICAgICAgIG9wdGlvbnMucHVzaChpdGVyKTtcbiAgICAgIH1cbiAgICAgIGVsc2UgaWYgKEFycmF5LmlzQXJyYXkoaXRlcikpIHtcbiAgICAgICAgLy8gVE9ETzogQWRkIGNvbXBhcmUgZm9yIHNhbWUgYXJyYXkgaW4gb3B0aW9uc1xuICAgICAgICBvcHRpb25zLnB1c2goaXRlcik7XG4gICAgICB9XG4gICAgICBlbHNlIHtcbiAgICAgICAgdGhyb3cgbmV3IEVycm9yKGBOb3Qgc3VwcG9ydCBpbnN0YW5jZSAke2l0ZXJ9YCk7XG4gICAgICB9XG4gICAgfVxuICB9XG5cbiAgcHVibGljIGFsbExpbmtPcHRpb25zT2YocGFyYW1zOiBzdHJpbmcgfCBNYWluVGFyZ2V0KSB7XG4gICAgY29uc3QgdGFyZ2V0ID0gKHR5cGVvZiBwYXJhbXMgPT09IFwic3RyaW5nXCIpID8gdGhpcy5nZXQocGFyYW1zKSA6IHBhcmFtcztcbiAgICBjb25zdCBvcHRpb25zOiBzdHJpbmdbXSA9IFtdO1xuICAgIGNvbnN0IHRhcmdldFNldCA9IG5ldyBTZXQoWyB0YXJnZXQudGFyZ2V0TmFtZSBdKTtcbiAgICB0aGlzLl9fZ2V0TGlua09wdGlvbnMob3B0aW9ucywgdGFyZ2V0U2V0LCB0YXJnZXQuZ2V0TGlua09wdGlvbnMoKSk7XG4gICAgdGhpcy5fX2dldExpbmtPcHRpb25zKG9wdGlvbnMsIHRhcmdldFNldCwgdGFyZ2V0LmdldFB1YmxpY0xpYnJhcmllcygpKTtcbiAgICByZXR1cm4gb3B0aW9ucy5mbGF0KCk7XG4gIH1cbn1cbiIsIi8qXG4gKiBNSVQgTGljZW5zZVxuICpcbiAqIENvcHlyaWdodCAoYykgMjAyNSAgWXVyaWkgWWFrdWJpbiAoeXVyaWkueWFrdWJpbkBnbWFpbC5jb20pXG4gKlxuICogUGVybWlzc2lvbiBpcyBncmFudGVkIHRvIHVzZSwgY29weSwgbW9kaWZ5LCBhbmQgZGlzdHJpYnV0ZSB0aGlzIHNvZnR3YXJlXG4gKiB1bmRlciB0aGUgTUlUIExpY2Vuc2UuIFNlZSBMSUNFTlNFIGZpbGUgZm9yIGRldGFpbHMuXG4gKi9cblxuaW1wb3J0IHsgU2ltcGxlT2JqZWN0IH0gZnJvbSBcIkAvY29yZS9TaW1wbGVPYmplY3RcIjtcblxuY29uc3QgTkFNRSA9IFN5bWJvbChcIk5BTUVcIik7XG5cbmV4cG9ydCBjbGFzcyBUYXJnZXRGaWxlIHtcbiAgcHJpdmF0ZSBbTkFNRV06IHN0cmluZztcblxuICBwcml2YXRlIGNvbnN0cnVjdG9yKHRhcmdldE5hbWU6IHN0cmluZykge1xuICAgIHRoaXNbTkFNRV0gPSB0YXJnZXROYW1lO1xuICB9XG5cbiAgcHVibGljIHN0YXRpYyBjcmVhdGUobmFtZTogc3RyaW5nKSB7XG4gICAgcmV0dXJuIE9iamVjdC5zZWFsKG5ldyBUYXJnZXRGaWxlKG5hbWUpKTtcbiAgfVxuXG4gIHB1YmxpYyBzdGF0aWMgZnJvbUpTT04ob2JqZWN0OiBTaW1wbGVPYmplY3QpIHtcbiAgICByZXR1cm4gVGFyZ2V0RmlsZS5jcmVhdGUob2JqZWN0LnRhcmdldE5hbWUgYXMgc3RyaW5nKTtcbiAgfVxuXG4gIHB1YmxpYyBnZXQgdGFyZ2V0TmFtZSgpOiBzdHJpbmcge1xuICAgIHJldHVybiB0aGlzW05BTUVdO1xuICB9XG5cbiAgcHVibGljIHRvU3RyaW5nKCk6IHN0cmluZyB7XG4gICAgcmV0dXJuIFwiJHtcIiArIHRoaXNbTkFNRV0gKyBcIi5maWxlfVwiO1xuICB9XG5cbiAgcHVibGljIHRvSlNPTigpOiBTaW1wbGVPYmplY3Qge1xuICAgIHJldHVybiB7XG4gICAgICB0eXBlOiBUYXJnZXRGaWxlLm5hbWUsXG4gICAgICB0YXJnZXROYW1lOiB0aGlzW05BTUVdLFxuICAgIH1cbiAgfVxufTtcblxuU2ltcGxlT2JqZWN0LnJlZ2lzdGVySW5zdGFuY2VDcmVhdG9yKFRhcmdldEZpbGUubmFtZSwgVGFyZ2V0RmlsZS5mcm9tSlNPTik7XG4iLCIvKlxuICogTUlUIExpY2Vuc2VcbiAqXG4gKiBDb3B5cmlnaHQgKGMpIDIwMjUgIFl1cmlpIFlha3ViaW4gKHl1cmlpLnlha3ViaW5AZ21haWwuY29tKVxuICpcbiAqIFBlcm1pc3Npb24gaXMgZ3JhbnRlZCB0byB1c2UsIGNvcHksIG1vZGlmeSwgYW5kIGRpc3RyaWJ1dGUgdGhpcyBzb2Z0d2FyZVxuICogdW5kZXIgdGhlIE1JVCBMaWNlbnNlLiBTZWUgTElDRU5TRSBmaWxlIGZvciBkZXRhaWxzLlxuICovXG5cbmltcG9ydCB7IFNpbXBsZU9iamVjdCB9IGZyb20gXCJAL2NvcmUvU2ltcGxlT2JqZWN0XCI7XG5cbmNvbnN0IE5BTUUgPSBTeW1ib2woXCJOQU1FXCIpO1xuXG5leHBvcnQgY2xhc3MgVGFyZ2V0SW5jbHVkZXMge1xuICBwcml2YXRlIFtOQU1FXTogc3RyaW5nO1xuXG4gIHByaXZhdGUgY29uc3RydWN0b3IobmFtZTogc3RyaW5nKSB7XG4gICAgdGhpc1tOQU1FXSA9IG5hbWU7XG4gIH1cblxuICBwdWJsaWMgc3RhdGljIGNyZWF0ZShuYW1lOiBzdHJpbmcpIHtcbiAgICByZXR1cm4gT2JqZWN0LnNlYWwobmV3IFRhcmdldEluY2x1ZGVzKG5hbWUpKTtcbiAgfVxuXG4gIHB1YmxpYyBzdGF0aWMgZnJvbUpTT04ob2JqZWN0OiBTaW1wbGVPYmplY3QpIHtcbiAgICByZXR1cm4gVGFyZ2V0SW5jbHVkZXMuY3JlYXRlKG9iamVjdC50YXJnZXROYW1lIGFzIHN0cmluZyk7XG4gIH1cblxuICBwdWJsaWMgZ2V0IHRhcmdldE5hbWUoKTogc3RyaW5nIHtcbiAgICByZXR1cm4gdGhpc1tOQU1FXTtcbiAgfVxuXG4gIHB1YmxpYyB0b1N0cmluZygpOiBzdHJpbmcge1xuICAgIHJldHVybiBcIiR7XCIgKyB0aGlzW05BTUVdICsgXCIuaW5jbHVkZXN9XCI7XG4gIH1cblxuICBwdWJsaWMgdG9KU09OKCk6IFNpbXBsZU9iamVjdCB7XG4gICAgcmV0dXJuIHtcbiAgICAgIHR5cGU6IFRhcmdldEluY2x1ZGVzLm5hbWUsXG4gICAgICB0YXJnZXROYW1lOiB0aGlzW05BTUVdLFxuICAgIH1cbiAgfVxuXG4gIHB1YmxpYyBzdGF0aWMgZW5zdXJlSW5zdGFuY2UodmFsdWU6IGFueSkge1xuICAgIGlmICh2YWx1ZSBpbnN0YW5jZW9mIFRhcmdldEluY2x1ZGVzKVxuICAgICAgcmV0dXJuIHZhbHVlO1xuICAgIHRocm93IG5ldyBFcnJvcihgVGhlICcke3ZhbHVlfScgaXMgbm90IGEgVGFyZ2V0SW5jbHVkZXNgKTtcbiAgfVxufTtcblxuU2ltcGxlT2JqZWN0LnJlZ2lzdGVySW5zdGFuY2VDcmVhdG9yKFRhcmdldEluY2x1ZGVzLm5hbWUsIFRhcmdldEluY2x1ZGVzLmZyb21KU09OKTtcbiIsIi8qXG4gKiBNSVQgTGljZW5zZVxuICpcbiAqIENvcHlyaWdodCAoYykgMjAyNSAgWXVyaWkgWWFrdWJpbiAoeXVyaWkueWFrdWJpbkBnbWFpbC5jb20pXG4gKlxuICogUGVybWlzc2lvbiBpcyBncmFudGVkIHRvIHVzZSwgY29weSwgbW9kaWZ5LCBhbmQgZGlzdHJpYnV0ZSB0aGlzIHNvZnR3YXJlXG4gKiB1bmRlciB0aGUgTUlUIExpY2Vuc2UuIFNlZSBMSUNFTlNFIGZpbGUgZm9yIGRldGFpbHMuXG4gKi9cblxuaW1wb3J0IHsgU2ltcGxlT2JqZWN0IH0gZnJvbSBcIkAvY29yZS9TaW1wbGVPYmplY3RcIjtcblxuY29uc3QgTkFNRSA9IFN5bWJvbChcIk5BTUVcIik7XG5cbmV4cG9ydCBjbGFzcyBUYXJnZXRPYmplY3RzIHtcbiAgcHJpdmF0ZSBbTkFNRV06IHN0cmluZztcblxuICBwcml2YXRlIGNvbnN0cnVjdG9yKG5hbWU6IHN0cmluZykge1xuICAgIHRoaXNbTkFNRV0gPSBuYW1lO1xuICB9XG5cbiAgcHVibGljIHN0YXRpYyBjcmVhdGUobmFtZTogc3RyaW5nKSB7XG4gICAgcmV0dXJuIE9iamVjdC5zZWFsKG5ldyBUYXJnZXRPYmplY3RzKG5hbWUpKTtcbiAgfVxuXG4gIHB1YmxpYyBzdGF0aWMgZnJvbUpTT04ob2JqZWN0OiBTaW1wbGVPYmplY3QpIHtcbiAgICByZXR1cm4gVGFyZ2V0T2JqZWN0cy5jcmVhdGUob2JqZWN0LnRhcmdldE5hbWUgYXMgc3RyaW5nKTtcbiAgfVxuXG4gIHB1YmxpYyBzdGF0aWMgZW5zdXJlSW5zdGFuY2UodmFsdWU6IGFueSk6IFRhcmdldE9iamVjdHMge1xuICAgIGlmICh2YWx1ZSBpbnN0YW5jZW9mIFRhcmdldE9iamVjdHMpXG4gICAgICByZXR1cm4gdmFsdWU7XG4gICAgdGhyb3cgbmV3IEVycm9yKGBUaGUgJyR7dmFsdWV9JyBpcyBub3QgYSBUYXJnZXRPYmplY3RzYCk7XG4gIH1cblxuICBwdWJsaWMgZ2V0IHRhcmdldE5hbWUoKTogc3RyaW5nIHtcbiAgICByZXR1cm4gdGhpc1tOQU1FXTtcbiAgfVxuXG4gIHB1YmxpYyB0b1N0cmluZygpOiBzdHJpbmcge1xuICAgIHJldHVybiBcIiR7XCIgKyB0aGlzW05BTUVdICsgXCIub2JqZWN0c31cIjtcbiAgfVxuXG4gIHB1YmxpYyB0b0pTT04oKTogU2ltcGxlT2JqZWN0IHtcbiAgICByZXR1cm4ge1xuICAgICAgdHlwZTogVGFyZ2V0T2JqZWN0cy5uYW1lLFxuICAgICAgdGFyZ2V0TmFtZTogdGhpc1tOQU1FXSxcbiAgICB9XG4gIH1cbn07XG5cblNpbXBsZU9iamVjdC5yZWdpc3Rlckluc3RhbmNlQ3JlYXRvcihUYXJnZXRPYmplY3RzLm5hbWUsIFRhcmdldE9iamVjdHMuZnJvbUpTT04pO1xuIiwiLypcbiAqIE1JVCBMaWNlbnNlXG4gKlxuICogQ29weXJpZ2h0IChjKSAyMDI1ICBZdXJpaSBZYWt1YmluICh5dXJpaS55YWt1YmluQGdtYWlsLmNvbSlcbiAqXG4gKiBQZXJtaXNzaW9uIGlzIGdyYW50ZWQgdG8gdXNlLCBjb3B5LCBtb2RpZnksIGFuZCBkaXN0cmlidXRlIHRoaXMgc29mdHdhcmVcbiAqIHVuZGVyIHRoZSBNSVQgTGljZW5zZS4gU2VlIExJQ0VOU0UgZmlsZSBmb3IgZGV0YWlscy5cbiAqL1xuXG5pbXBvcnQgeyBQcm9qZWN0Q29udGV4dCB9IGZyb20gXCJAL2NvcmUvUHJvamVjdENvbnRleHRcIjtcbmltcG9ydCB7IFZhcmlhYmxlTWFwIH0gZnJvbSBcIkAvY29yZS9TY29wZVwiO1xuaW1wb3J0IHsgR2VuZXJhbENvbnRleHQgfSBmcm9tIFwiQC9jb3JlL0Jhc2VDb250ZXh0XCI7XG5pbXBvcnQgeyBjcmVhdGVDb250ZXh0IH0gZnJvbSBcIkAvY29yZS9CYXNlQ29udGV4dFwiO1xuXG5jb25zdCBHTE9CQUwgPSBTeW1ib2woXCJHTE9CQUxcIik7XG5jb25zdCBTQ09QRSA9IFN5bWJvbChcIlNDT1BFXCIpO1xuXG5leHBvcnQgY2xhc3MgVG9vbGNoYWluQ29udGV4dCBleHRlbmRzIEdlbmVyYWxDb250ZXh0IHtcbiAgW1NDT1BFXTogVmFyaWFibGVNYXA7XG4gIFtHTE9CQUxdOiBQcm9qZWN0Q29udGV4dDtcblxuICBjb25zdHJ1Y3RvcihnbG9iYWw6IFByb2plY3RDb250ZXh0LCBzY29wZTogVmFyaWFibGVNYXApIHtcbiAgICBzdXBlcihzY29wZSk7XG4gICAgdGhpc1tHTE9CQUxdID0gZ2xvYmFsO1xuICAgIHRoaXNbU0NPUEVdID0gc2NvcGU7XG4gIH1cblxuICBwdWJsaWMgc3RhdGljIGNyZWF0ZShnbG9iYWw6IFByb2plY3RDb250ZXh0LCB2YXJpYWJsZU1hcDogVmFyaWFibGVNYXApIHtcbiAgICByZXR1cm4gY3JlYXRlQ29udGV4dChuZXcgVG9vbGNoYWluQ29udGV4dChnbG9iYWwsIHZhcmlhYmxlTWFwKSk7XG4gIH1cbn07XG4iLCIvKlxuICogTUlUIExpY2Vuc2VcbiAqXG4gKiBDb3B5cmlnaHQgKGMpIDIwMjUgIFl1cmlpIFlha3ViaW4gKHl1cmlpLnlha3ViaW5AZ21haWwuY29tKVxuICpcbiAqIFBlcm1pc3Npb24gaXMgZ3JhbnRlZCB0byB1c2UsIGNvcHksIG1vZGlmeSwgYW5kIGRpc3RyaWJ1dGUgdGhpcyBzb2Z0d2FyZVxuICogdW5kZXIgdGhlIE1JVCBMaWNlbnNlLiBTZWUgTElDRU5TRSBmaWxlIGZvciBkZXRhaWxzLlxuICovXG5cbmV4cG9ydCBjb25zdCBERUJVR19CVUlMRF9UWVBFID0gXCJEZWJ1Z1wiO1xuZXhwb3J0IGNvbnN0IFJFTEVBU0VfQlVJTERfVFlQRSA9IFwiUmVsZWFzZVwiO1xuIiwiLypcbiAqIE1JVCBMaWNlbnNlXG4gKlxuICogQ29weXJpZ2h0IChjKSAyMDI1ICBZdXJpaSBZYWt1YmluICh5dXJpaS55YWt1YmluQGdtYWlsLmNvbSlcbiAqXG4gKiBQZXJtaXNzaW9uIGlzIGdyYW50ZWQgdG8gdXNlLCBjb3B5LCBtb2RpZnksIGFuZCBkaXN0cmlidXRlIHRoaXMgc29mdHdhcmVcbiAqIHVuZGVyIHRoZSBNSVQgTGljZW5zZS4gU2VlIExJQ0VOU0UgZmlsZSBmb3IgZGV0YWlscy5cbiAqL1xuXG5pbXBvcnQgeyBJTWFrZUNvbnRleHQsIEludGVyZmFjZVRhcmdldCB9IGZyb20gXCJAL2NvcmUvTWFrZUludGVyZmFjZXNcIjtcbmltcG9ydCB7IEludGVyZmFjZVNjcmlwdCB9IGZyb20gXCJAL2NvcmUvSW50ZXJmYWNlU2NyaXB0XCI7XG5pbXBvcnQgeyBDdXN0b21TY3JpcHQgfSBmcm9tIFwiQC9jb3JlL0N1c3RvbVNjcmlwdFwiO1xuaW1wb3J0IHsgVmFyaWFudE1hcCwgVmFyaWFibGVNYXAgfSBmcm9tIFwiQC9jb3JlL1Njb3BlXCI7XG5pbXBvcnQgeyBHZW5lcmFsQ29udGV4dCwgY3JlYXRlQ29udGV4dCB9IGZyb20gXCJAL2NvcmUvQmFzZUNvbnRleHRcIjtcbmltcG9ydCB7IFVzZXJUYXJnZXRTdHJ1Y3QgfSBmcm9tIFwiQC9jb3JlL1VzZXJUYXJnZXRTdHJ1Y3RcIjtcbmltcG9ydCB7IExvZ2dlciB9IGZyb20gXCJAL2xvZ2dlclwiO1xuXG5jb25zdCBsb2dnZXIgPSBMb2dnZXIuY3JlYXRlKGltcG9ydC5tZXRhLnVybCk7XG5cbmNvbnN0IElNUEwgPSBTeW1ib2woXCJJTVBMXCIpO1xuXG5leHBvcnQgY2xhc3MgVXNlck1ha2VDb250ZXh0IGV4dGVuZHMgR2VuZXJhbENvbnRleHQgaW1wbGVtZW50cyBJTWFrZUNvbnRleHQge1xuICBbSU1QTF06IElNYWtlQ29udGV4dDtcblxuICBwdWJsaWMgY29uc3RydWN0b3IoaW1wbDogSU1ha2VDb250ZXh0LCB2YXJpYWJsZU1hcDogVmFyaWFibGVNYXApIHtcbiAgICBzdXBlcih2YXJpYWJsZU1hcCk7XG4gICAgdGhpc1tJTVBMXSA9IGltcGw7XG4gIH1cblxuICBwdWJsaWMgc3RhdGljIGNyZWF0ZShpbXBsOiBJTWFrZUNvbnRleHQsIHZhcmlhYmxlTWFwOiBWYXJpYWJsZU1hcCkge1xuICAgIHJldHVybiBjcmVhdGVDb250ZXh0KG5ldyBVc2VyTWFrZUNvbnRleHQoaW1wbCwgdmFyaWFibGVNYXApKTtcbiAgfVxuXG4gIHB1YmxpYyBnZXRDYWNoZVZhcmlhYmxlcygpIHtcbiAgICByZXR1cm4gdGhpc1tJTVBMXS5nZXRDYWNoZVZhcmlhYmxlcygpO1xuICB9XG5cbiAgcHVibGljIGFkZENhY2hlVmFyaWFibGVzKHBhcmFtczogc3RyaW5nIHwgVmFyaWFudE1hcCk6IHZvaWQge1xuICAgIHRoaXNbSU1QTF0uYWRkQ2FjaGVWYXJpYWJsZXMocGFyYW1zKTtcbiAgfVxuXG4gIHB1YmxpYyBhZGRJbmNsdWRlRGlyZWN0b3JpZXMoLi4uZGlyczogYW55W10pOiBhbnkge1xuICAgIHRoaXNbSU1QTF0uYWRkSW5jbHVkZURpcmVjdG9yaWVzKC4uLmRpcnMpO1xuICB9XG5cbiAgcHVibGljIGFkZFN1YmRpcmVjdG9yeShzb3VyY2VEaXI6IGFueSwgYmluYXJ5RGlyPzogYW55KSB7XG4gICAgdGhpc1tJTVBMXS5hZGRTdWJkaXJlY3Rvcnkoc291cmNlRGlyLCBiaW5hcnlEaXIpO1xuICB9XG4gIFxuICBwdWJsaWMgYWRkQ3VzdG9tU2NyaXB0KHNjcmlwdDogYW55LCBwYXJhbXM6IGFueSk6IEN1c3RvbVNjcmlwdCB7XG4gICAgcmV0dXJuIHRoaXNbSU1QTF0uYWRkQ3VzdG9tU2NyaXB0KHNjcmlwdCwgcGFyYW1zKTtcbiAgfVxuXG4gIHB1YmxpYyB0YXJnZXQobmFtZTogc3RyaW5nKTogSW50ZXJmYWNlVGFyZ2V0IHtcbiAgICByZXR1cm4gdGhpc1tJTVBMXS50YXJnZXQobmFtZSk7XG4gIH1cblxuICBwdWJsaWMgc2NyaXB0KG5hbWU6IHN0cmluZyk6IEludGVyZmFjZVNjcmlwdCB7XG4gICAgcmV0dXJuIHRoaXNbSU1QTF0uc2NyaXB0KG5hbWUpO1xuICB9XG5cbiAgcHVibGljIGluc3RhbGwodmFsdWU6IGFueSwgcGFyYW1zOiBhbnkpOiB2b2lkIHtcbiAgICB0aGlzW0lNUExdLmluc3RhbGwodmFsdWUsIHBhcmFtcyk7XG4gIH1cblxuICBwdWJsaWMgYWRkT2JqZWN0TGlicmFyeShuYW1lOiBhbnksIC4uLnNvdXJjZXM6IGFueVtdKTogVXNlclRhcmdldFN0cnVjdCB7XG4gICAgY29uc3QgdGFyZ2V0ID0gdGhpc1tJTVBMXS5hZGRPYmplY3RMaWJyYXJ5KG5hbWUsIC4uLnNvdXJjZXMpO1xuICAgIHJldHVybiBVc2VyVGFyZ2V0U3RydWN0LmNyZWF0ZSh0YXJnZXQpO1xuICB9XG5cbiAgcHVibGljIGFkZFN0YXRpY0xpYnJhcnkobmFtZTogYW55LCAuLi5zb3VyY2VzOiBhbnlbXSk6IFVzZXJUYXJnZXRTdHJ1Y3Qge1xuICAgIGNvbnN0IHRhcmdldCA9IHRoaXNbSU1QTF0uYWRkU3RhdGljTGlicmFyeShuYW1lLCAuLi5zb3VyY2VzKTtcbiAgICByZXR1cm4gVXNlclRhcmdldFN0cnVjdC5jcmVhdGUodGFyZ2V0KTtcbiAgfVxuXG4gIHB1YmxpYyBhZGRTaGFyZWRMaWJyYXJ5KG5hbWU6IGFueSwgLi4uc291cmNlczogYW55W10pOiBVc2VyVGFyZ2V0U3RydWN0IHtcbiAgICBjb25zdCB0YXJnZXQgPSB0aGlzW0lNUExdLmFkZFNoYXJlZExpYnJhcnkobmFtZSwgLi4uc291cmNlcyk7XG4gICAgcmV0dXJuIFVzZXJUYXJnZXRTdHJ1Y3QuY3JlYXRlKHRhcmdldCk7XG4gIH1cblxuICBwdWJsaWMgYWRkRXhlY3V0YWJsZShuYW1lOiBhbnksIC4uLnNvdXJjZXM6IGFueVtdKTogVXNlclRhcmdldFN0cnVjdCB7XG4gICAgY29uc3QgdGFyZ2V0ID0gdGhpc1tJTVBMXS5hZGRFeGVjdXRhYmxlKG5hbWUsIC4uLnNvdXJjZXMpO1xuICAgIHJldHVybiBVc2VyVGFyZ2V0U3RydWN0LmNyZWF0ZSh0YXJnZXQpO1xuICB9XG5cbiAgcHVibGljIGV4ZWN1dGVTY3JpcHQoc2NyaXB0OiBhbnksIHBhcmFtczogYW55KTogdm9pZCB7XG4gICAgdGhpc1tJTVBMXS5leGVjdXRlU2NyaXB0KHNjcmlwdCwgcGFyYW1zKTtcbiAgfVxufTtcbiIsIi8qXG4gKiBNSVQgTGljZW5zZVxuICpcbiAqIENvcHlyaWdodCAoYykgMjAyNSAgWXVyaWkgWWFrdWJpbiAoeXVyaWkueWFrdWJpbkBnbWFpbC5jb20pXG4gKlxuICogUGVybWlzc2lvbiBpcyBncmFudGVkIHRvIHVzZSwgY29weSwgbW9kaWZ5LCBhbmQgZGlzdHJpYnV0ZSB0aGlzIHNvZnR3YXJlXG4gKiB1bmRlciB0aGUgTUlUIExpY2Vuc2UuIFNlZSBMSUNFTlNFIGZpbGUgZm9yIGRldGFpbHMuXG4gKi9cblxuaW1wb3J0IHsgSW50ZXJmYWNlVGFyZ2V0IH0gZnJvbSBcIkAvY29yZS9NYWtlSW50ZXJmYWNlc1wiO1xuaW1wb3J0IHsgTG9nZ2VyIH0gZnJvbSBcIkAvbG9nZ2VyXCI7XG5pbXBvcnQgeyBlbnN1cmVTdHJpbmcgfSBmcm9tIFwiQC91dGlscy9TdHJpY3RUeXBlXCI7XG5cbmNvbnN0IGxvZ2dlciA9IExvZ2dlci5jcmVhdGUoaW1wb3J0Lm1ldGEudXJsKTtcblxuY29uc3QgSU1QTCA9IFN5bWJvbChcIklNUExcIik7XG5cbmV4cG9ydCBjbGFzcyBVc2VyVGFyZ2V0U3RydWN0IGV4dGVuZHMgSW50ZXJmYWNlVGFyZ2V0IHtcbiAgW0lNUExdOiBJbnRlcmZhY2VUYXJnZXQ7XG5cbiAgcHJpdmF0ZSBjb25zdHJ1Y3RvcihpbXBsOiBJbnRlcmZhY2VUYXJnZXQpIHtcbiAgICBzdXBlcigpO1xuICAgIHRoaXNbSU1QTF0gPSBpbXBsO1xuICB9XG5cbiAgcHVibGljIHN0YXRpYyBjcmVhdGUoaW1wbDogSW50ZXJmYWNlVGFyZ2V0KSB7XG4gICAgcmV0dXJuIE9iamVjdC5zZWFsKG5ldyBVc2VyVGFyZ2V0U3RydWN0KGltcGwpKTtcbiAgfVxuXG4gIHB1YmxpYyBnZXQgdGFyZ2V0TmFtZSgpIHtcbiAgICByZXR1cm4gdGhpc1tJTVBMXS50YXJnZXROYW1lO1xuICB9XG5cbiAgcHVibGljIGdldCB0YXJnZXRGaWxlKCkge1xuICAgIHJldHVybiB0aGlzW0lNUExdLnRhcmdldEZpbGU7XG4gIH1cblxuICBwdWJsaWMgZ2V0IGluY2x1ZGVzKCkge1xuICAgIHJldHVybiB0aGlzW0lNUExdLmluY2x1ZGVzO1xuICB9XG5cbiAgcHVibGljIGdldCBvYmplY3RzKCkge1xuICAgIHJldHVybiB0aGlzW0lNUExdLm9iamVjdHM7XG4gIH1cbiAgXG4gIHB1YmxpYyBzZXRQcmVmaXgodmFsdWU6IGFueSk6IHZvaWQge1xuICAgIHRoaXNbSU1QTF0uc2V0UHJlZml4KGVuc3VyZVN0cmluZyh2YWx1ZSkpO1xuICB9XG5cbiAgcHVibGljIHNldFN1ZmZpeCh2YWx1ZTogYW55KTogdm9pZCB7XG4gICAgdGhpc1tJTVBMXS5zZXRTdWZmaXgoZW5zdXJlU3RyaW5nKHZhbHVlKSk7XG4gIH1cblxuICBwdWJsaWMgc2V0T3V0cHV0TmFtZSh2YWx1ZTogYW55KTogdm9pZCB7XG4gICAgdGhpc1tJTVBMXS5zZXRPdXRwdXROYW1lKGVuc3VyZVN0cmluZyh2YWx1ZSkpO1xuICB9XG5cbiAgcHVibGljIGFkZFNvdXJjZXMoLi4uc291cmNlczogYW55W10pOiB2b2lkIHtcbiAgICB0aGlzW0lNUExdLmFkZFNvdXJjZXMoLi4uc291cmNlcyk7XG4gIH1cblxuICBwdWJsaWMgYWRkSW5jbHVkZXMoLi4uaW5jbHVkZXM6IGFueVtdKTogdm9pZCB7XG4gICAgdGhpc1tJTVBMXS5hZGRJbmNsdWRlcyguLi5pbmNsdWRlcyk7XG4gIH1cblxuICBwdWJsaWMgYWRkTGlicmFyaWVzKC4uLmxpYnJhcmllczogYW55W10pOiB2b2lkIHtcbiAgICB0aGlzW0lNUExdLmFkZExpYnJhcmllcyguLi5saWJyYXJpZXMpO1xuICB9XG5cbiAgcHVibGljIGFkZENvbXBpbGVPcHRpb25zKC4uLm9wdGlvbnM6IGFueVtdKTogdm9pZCB7XG4gICAgdGhpc1tJTVBMXS5hZGRDb21waWxlT3B0aW9ucyguLi5vcHRpb25zKTtcbiAgfVxuXG4gIHB1YmxpYyBhZGRMaW5rT3B0aW9ucyguLi5vcHRpb25zOiBhbnlbXSk6IHZvaWQge1xuICAgIHRoaXNbSU1QTF0uYWRkTGlua09wdGlvbnMoLi4ub3B0aW9ucyk7XG4gIH1cblxuICBwdWJsaWMgZ2V0U291cmNlRmlsZXMoLi4uc291cmNlczogYW55W10pIHtcbiAgICByZXR1cm4gdGhpc1tJTVBMXS5nZXRTb3VyY2VGaWxlcyguLi5zb3VyY2VzKTtcbiAgfVxuXG4gIHB1YmxpYyBhZGREZWZpbml0aW9ucyguLi5kZWZpbml0aW9uczogYW55W10pOiB2b2lkIHtcbiAgICB0aGlzW0lNUExdLmFkZERlZmluaXRpb25zKC4uLmRlZmluaXRpb25zKTtcbiAgfVxuXG4gIHB1YmxpYyBhZGRQcmVCdWlsZChjb21tYW5kOiBhbnksIGFyZ3M6IGFueVtdKTogdm9pZCB7XG4gICAgdGhpc1tJTVBMXS5hZGRQcmVCdWlsZChjb21tYW5kLCBhcmdzKTtcbiAgfVxuXG4gIHB1YmxpYyBhZGRQb3N0QnVpbGQoY29tbWFuZDogYW55LCBhcmdzOiBhbnlbXSk6IHZvaWQge1xuICAgIHRoaXNbSU1QTF0uYWRkUG9zdEJ1aWxkKGNvbW1hbmQsIGFyZ3MpO1xuICB9XG5cbiAgcHVibGljIHNldFBvc2l0aW9uSW5kZXBlbmRlbnRDb2RlKHZhbHVlOiBib29sZWFuKTogdm9pZCB7XG4gICAgdGhpc1tJTVBMXS5zZXRQb3NpdGlvbkluZGVwZW5kZW50Q29kZSh2YWx1ZSk7XG4gIH1cblxuICBwdWJsaWMgYWRkUHVibGljSW5jbHVkZXMoLi4uaW5jbHVkZXM6IGFueVtdKTogdm9pZCB7XG4gICAgdGhpc1tJTVBMXS5hZGRQdWJsaWNJbmNsdWRlcyguLi5pbmNsdWRlcyk7XG4gIH1cblxuICBwdWJsaWMgYWRkUHVibGljRGVmaW5pdGlvbnMoLi4uZGVmaW5pdGlvbnM6IGFueSk6IHZvaWQge1xuICAgIHRoaXNbSU1QTF0uYWRkUHVibGljRGVmaW5pdGlvbnMoLi4uZGVmaW5pdGlvbnMpO1xuICB9XG5cbiAgcHVibGljIGFkZFB1YmxpY0xpYnJhcmllcyguLi5saWJyYXJpZXM6IGFueVtdKTogdm9pZCB7XG4gICAgdGhpc1tJTVBMXS5hZGRQdWJsaWNMaWJyYXJpZXMoLi4ubGlicmFyaWVzKTtcbiAgfVxuXG4gIHB1YmxpYyBhZGRQdWJsaWNDb21waWxlT3B0aW9ucyguLi5vcHRpb25zOiBhbnlbXSk6IHZvaWQge1xuICAgIHRoaXNbSU1QTF0uYWRkUHVibGljQ29tcGlsZU9wdGlvbnMoLi4ub3B0aW9ucyk7XG4gIH1cblxuICBwdWJsaWMgYWRkUHVibGljTGlua09wdGlvbnMoLi4ub3B0aW9uczogYW55W10pOiB2b2lkIHtcbiAgICB0aGlzW0lNUExdLmFkZFB1YmxpY0xpbmtPcHRpb25zKC4uLm9wdGlvbnMpO1xuICB9XG59O1xuIiwiLypcbiAqIE1JVCBMaWNlbnNlXG4gKlxuICogQ29weXJpZ2h0IChjKSAyMDI1ICBZdXJpaSBZYWt1YmluICh5dXJpaS55YWt1YmluQGdtYWlsLmNvbSlcbiAqXG4gKiBQZXJtaXNzaW9uIGlzIGdyYW50ZWQgdG8gdXNlLCBjb3B5LCBtb2RpZnksIGFuZCBkaXN0cmlidXRlIHRoaXMgc29mdHdhcmVcbiAqIHVuZGVyIHRoZSBNSVQgTGljZW5zZS4gU2VlIExJQ0VOU0UgZmlsZSBmb3IgZGV0YWlscy5cbiAqL1xuXG5pbXBvcnQgcGF0aCBmcm9tIFwibm9kZTpwYXRoXCI7XG5cbmV4cG9ydCBmdW5jdGlvbiBmaWxlbmFtZVRvUHJhZ21hT25jZU1hY3JvKGZpbGVwYXRoOiBzdHJpbmcsIGRlZXA6IG51bWJlcikge1xuICBpZiAodHlwZW9mIGRlZXAgPT09ICd1bmRlZmluZWQnKVxuICAgIGRlZXAgPSAzO1xuXG4gIGxldCBjb21wb25lbnRzID0gcGF0aC5ub3JtYWxpemUoZmlsZXBhdGgpLnNwbGl0KHBhdGguc2VwKTtcbiAgaWYgKGNvbXBvbmVudHMubGVuZ3RoID4gZGVlcClcbiAgICBjb21wb25lbnRzID0gY29tcG9uZW50cy5zbGljZShjb21wb25lbnRzLmxlbmd0aCAtIGRlZXApO1xuXG4gIHJldHVybiBcIl9cIiArIGNvbXBvbmVudHMuam9pbignXycpLnJlcGxhY2UoL1stIC46JX5dL2csICdfJykudG9VcHBlckNhc2UoKTtcbn1cblxuZXhwb3J0IGZ1bmN0aW9uIGxpbmVUb1NpbmdsQ29tbWVudChsaW5lOiBzdHJpbmcpIHtcbiAgcmV0dXJuIFwiLy9cIiArIGxpbmU7XG59XG5cbmV4cG9ydCBmdW5jdGlvbiBsaW5lVG9NdWx0aXBsZUNvbW1lbnQobGluZTogc3RyaW5nKSB7XG4gIHJldHVybiBgLyogJHtsaW5lfSAqL2A7XG59XG5cbmV4cG9ydCBmdW5jdGlvbiBnZW5lcmF0ZWRTY3JpcHROYW1lQ29tbWVudChmaWxlbmFtZTogc3RyaW5nKSB7XG4gIHJldHVybiBsaW5lVG9NdWx0aXBsZUNvbW1lbnQoXCJHZW5lcmF0ZWQgZnJvbSBcIiArIHBhdGguYmFzZW5hbWUoZmlsZW5hbWUpKTtcbn1cbiIsIi8qXG4gKiBNSVQgTGljZW5zZVxuICpcbiAqIENvcHlyaWdodCAoYykgMjAyNSAgWXVyaWkgWWFrdWJpbiAoeXVyaWkueWFrdWJpbkBnbWFpbC5jb20pXG4gKlxuICogUGVybWlzc2lvbiBpcyBncmFudGVkIHRvIHVzZSwgY29weSwgbW9kaWZ5LCBhbmQgZGlzdHJpYnV0ZSB0aGlzIHNvZnR3YXJlXG4gKiB1bmRlciB0aGUgTUlUIExpY2Vuc2UuIFNlZSBMSUNFTlNFIGZpbGUgZm9yIGRldGFpbHMuXG4gKi9cblxuZXhwb3J0IGludGVyZmFjZSBJTG9nZ2VyIHtcbiAgZGVidWcobWVzc2FnZT86IGFueSwgLi4ucGFyYW1zOiBhbnlbXSk6IHZvaWQ7XG4gIGluZm8obWVzc2FnZT86IGFueSwgLi4ucGFyYW1zOiBhbnlbXSk6IHZvaWQ7XG4gIG5vdGljZShtZXNzYWdlPzogYW55LCAuLi5wYXJhbXM6IGFueVtdKTogdm9pZDtcbiAgd2FybihtZXNzYWdlPzogYW55LCAuLi5wYXJhbXM6IGFueVtdKTogdm9pZDtcbiAgZXJyb3IobWVzc2FnZT86IGFueSwgLi4ucGFyYW1zOiBhbnlbXSk6IHZvaWQ7XG4gIGZhdGFsKG1lc3NhZ2U/OiBhbnksIC4uLnBhcmFtczogYW55W10pOiB2b2lkO1xufTtcblxudHlwZSBMb2dnZXJIYW5kbGVyID0gKG1lc3NhZ2U/OiBhbnksIC4uLnBhcmFtczogYW55W10pID0+IHZvaWQ7O1xuXG5pbnRlcmZhY2UgRW50cnlMb2dnZXIge1xuICB0YWdOYW1lOiBzdHJpbmc7XG4gIGZpbHRlcjogc3RyaW5nO1xuICBsb2dnZXI6IElMb2dnZXI7XG59O1xuXG5jb25zdCBTRVBBUkFUT1IgPSBcIiBcIjtcbmNvbnN0IE1FU1NBR0VfTUFYID0gMjQwO1xuXG5mdW5jdGlvbiB0b01lc3NhZ2VTdHJpbmcobzogYW55KSB7XG4gIHJldHVybiAodHlwZW9mIG8gPT09IFwic3RyaW5nXCIpID8gbyA6IEpTT04uc3RyaW5naWZ5KG8pO1xufVxuXG5mdW5jdGlvbiogbWVzc2FnZUdlbmVyYXRvcihtZXNzYWdlczogc3RyaW5nW10sIG1heExlbmd0aDogbnVtYmVyKSB7XG4gIGxldCBsZW5ndGggPSAwO1xuICBjb25zdCBtc2dMaXN0OiBzdHJpbmdbXSA9IFtdO1xuXG4gIGZvciAoOzspIHtcbiAgICBjb25zdCBpdGVyID0gbWVzc2FnZXMuc2hpZnQoKTtcbiAgICBpZiAoIWl0ZXIpXG4gICAgICBicmVhaztcblxuICAgIGlmIChtc2dMaXN0Lmxlbmd0aClcbiAgICAgIGxlbmd0aCArPSBTRVBBUkFUT1IubGVuZ3RoO1xuXG4gICAgbXNnTGlzdC5wdXNoKGl0ZXIpO1xuICAgIGxlbmd0aCArPSBpdGVyLmxlbmd0aDtcblxuICAgIHdoaWxlIChsZW5ndGggPiBtYXhMZW5ndGgpIHtcbiAgICAgIGNvbnN0IG1zZyA9IG1zZ0xpc3Quam9pbihTRVBBUkFUT1IpO1xuICAgICAgY29uc3QgbmV4dE1zZyA9IG1zZy5zdWJzdHJpbmcobWF4TGVuZ3RoKTtcbiAgICAgIG1zZ0xpc3QubGVuZ3RoID0gMDtcbiAgICAgIG1zZ0xpc3QucHVzaChuZXh0TXNnKTtcbiAgICAgIGxlbmd0aCA9IG5leHRNc2cubGVuZ3RoO1xuICAgICAgeWllbGQgbXNnLnN1YnN0cmluZygwLCBtYXhMZW5ndGgpO1xuICAgIH1cbiAgfVxuXG4gIHlpZWxkIG1zZ0xpc3Quam9pbihTRVBBUkFUT1IpO1xufVxuXG5mdW5jdGlvbiBtYWtlTG9nTWV0aG9kKHdpdGhQcmVmaXg6IGJvb2xlYW4sIHR5cGU6IHN0cmluZywgdGFnTmFtZTogc3RyaW5nLCB0YXJnZXQ6IGFueSwgaGFuZGxlcjogTG9nZ2VySGFuZGxlcikge1xuICByZXR1cm4gKC4uLmFyZ3M6IGFueVtdKSA9PiB7XG4gICAgY29uc3Qgbm93ID0gbmV3IERhdGUoKTtcbiAgICBjb25zdCBtZXNzYWdlcyA9IGFyZ3MubWFwKGkgPT4gdG9NZXNzYWdlU3RyaW5nKGkpKVxuXG4gICAgaWYgKCF3aXRoUHJlZml4KSB7XG4gICAgICBoYW5kbGVyLmNhbGwodGFyZ2V0LCBtZXNzYWdlcy5qb2luKFNFUEFSQVRPUikpO1xuICAgICAgcmV0dXJuO1xuICAgIH1cblxuICAgIGNvbnN0IHByZWZpeCA9IFsgbm93LnRvSVNPU3RyaW5nKCksIHR5cGUsIHRhZ05hbWUgXS5qb2luKFNFUEFSQVRPUik7XG4gICAgZm9yIChjb25zdCBpdGVyIG9mIG1lc3NhZ2VHZW5lcmF0b3IobWVzc2FnZXMsIE1FU1NBR0VfTUFYIC0gcHJlZml4Lmxlbmd0aCAtIFNFUEFSQVRPUi5sZW5ndGgpKSB7XG4gICAgICBoYW5kbGVyLmNhbGwodGFyZ2V0LCBbcHJlZml4LCBpdGVyXS5qb2luKFNFUEFSQVRPUikpO1xuICAgIH1cbiAgfTtcbn1cblxubGV0IF9kZWZhdWx0UGF0dGVybiA9IFwiXCI7XG5jb25zdCBfbG9nZ2VyTWFwID0gbmV3IE1hcDxzdHJpbmcsIEVudHJ5TG9nZ2VyPigpO1xuXG5jb25zdCBzdHViID0gKCkgPT4ge307XG5cbmZ1bmN0aW9uIGluaXRMb2dnZXIobG9nZ2VyOiBJTG9nZ2VyLCB0YWdOYW1lOiBzdHJpbmcsIGZpbHRlcjogc3RyaW5nKSB7XG4gIGxvZ2dlci5kZWJ1ZyA9IHN0dWI7XG4gIGxvZ2dlci5pbmZvID0gc3R1YjtcbiAgbG9nZ2VyLm5vdGljZSA9IHN0dWI7XG4gIGxvZ2dlci53YXJuID0gc3R1YjtcbiAgbG9nZ2VyLmVycm9yID0gc3R1YjtcbiAgbG9nZ2VyLmZhdGFsID0gc3R1YjtcblxuICBsZXQgbGV2ZWwgPSAwO1xuICBjb25zdCBmbGFnczogYW55ID0ge307XG4gIGZvciAoY29uc3QgaXRlciBvZiBmaWx0ZXIuc3BsaXQoXCIsXCIpKSB7XG4gICAgaWYgKGl0ZXIgPT09IFwiKlwiKSB7XG4gICAgICBsZXZlbCA9IDU7XG4gICAgICBicmVhaztcbiAgICB9XG4gICAgaWYgKC9eXFxkKyQvLnRlc3QoaXRlcikpXG4gICAgICBsZXZlbCA9IE1hdGgubWF4KGxldmVsLCBwYXJzZUludChpdGVyKSk7XG4gICAgZWxzZVxuICAgICAgZmxhZ3NbaXRlcl0gPSB0cnVlO1xuICB9XG5cbiAgbG9nZ2VyLmZhdGFsID0gbWFrZUxvZ01ldGhvZChsZXZlbCA+IDIsIFwiRlwiLCB0YWdOYW1lLCBjb25zb2xlLCBjb25zb2xlLmVycm9yKTtcblxuICBpZiAobGV2ZWwgPiAxIHx8IGZsYWdzLmVycm9yKVxuICAgIGxvZ2dlci5lcnJvciA9IG1ha2VMb2dNZXRob2QobGV2ZWwgPiAyLCBcIkVcIiwgdGFnTmFtZSwgY29uc29sZSwgY29uc29sZS5lcnJvcik7XG5cbiAgaWYgKGxldmVsID4gMiB8fCBmbGFncy53YXJuKVxuICAgIGxvZ2dlci53YXJuID0gbWFrZUxvZ01ldGhvZChsZXZlbCA+IDIsIFwiV1wiLCB0YWdOYW1lLCBjb25zb2xlLCBjb25zb2xlLndhcm4pO1xuXG4gIGxvZ2dlci5ub3RpY2UgPSBtYWtlTG9nTWV0aG9kKGxldmVsID4gMiwgXCJOXCIsIHRhZ05hbWUsIGNvbnNvbGUsIGNvbnNvbGUubG9nKTtcblxuICBpZiAobGV2ZWwgPiAzIHx8IGZsYWdzLmluZm8pXG4gICAgbG9nZ2VyLmluZm8gPSBtYWtlTG9nTWV0aG9kKGxldmVsID4gMiwgXCJJXCIsIHRhZ05hbWUsIGNvbnNvbGUsIGNvbnNvbGUuaW5mbyk7XG5cbiAgaWYgKGxldmVsID4gNCB8fCBmbGFncy5kZWJ1ZylcbiAgICBsb2dnZXIuZGVidWcgPSBtYWtlTG9nTWV0aG9kKGxldmVsID4gMiwgXCJEXCIsIHRhZ05hbWUsIGNvbnNvbGUsIGNvbnNvbGUuZGVidWcpO1xufVxuXG5mdW5jdGlvbiBjcmVhdGVFbnRyeSh0YWdOYW1lOiBzdHJpbmcsIGZpbHRlcjogc3RyaW5nKSB7XG4gIGNvbnN0IGVudHJ5ID0geyB0YWdOYW1lLCBmaWx0ZXIsIGxvZ2dlcjoge30gYXMgSUxvZ2dlciB9O1xuICBpbml0TG9nZ2VyKGVudHJ5LmxvZ2dlciwgdGFnTmFtZSwgZmlsdGVyKTtcbiAgcmV0dXJuIGVudHJ5O1xufVxuXG5mdW5jdGlvbiBlbnRyeVNldEZpbHRlcihlbnRyeTogRW50cnlMb2dnZXIsIGZpbHRlcjogc3RyaW5nKSB7XG4gIGlmIChlbnRyeS5maWx0ZXIgIT09IGZpbHRlcikge1xuICAgIGluaXRMb2dnZXIoZW50cnkubG9nZ2VyLCBlbnRyeS50YWdOYW1lLCBmaWx0ZXIpO1xuICAgIGVudHJ5LmZpbHRlciA9IGZpbHRlcjtcbiAgfVxufVxuXG5mdW5jdGlvbiBhbGxTZXRGaWx0ZXIoZmlsdGVyOiBzdHJpbmcpIHtcbiAgX2RlZmF1bHRQYXR0ZXJuID0gZmlsdGVyO1xuICBmb3IgKGNvbnN0IGVudHJ5IG9mIF9sb2dnZXJNYXAudmFsdWVzKCkpXG4gICAgZW50cnlTZXRGaWx0ZXIoZW50cnksIGZpbHRlcik7XG59XG5cbmV4cG9ydCBuYW1lc3BhY2UgTG9nZ2VyIHtcblxuZXhwb3J0IGZ1bmN0aW9uIGNyZWF0ZSh1cmw6IHN0cmluZyk6IElMb2dnZXIge1xuICBjb25zdCB0YWdOYW1lID0gdXJsLnN0YXJ0c1dpdGgoSE9TVF9TT1VSQ0VfVVJMICsgXCIvXCIpID8gdXJsLnN1YnN0cmluZyhIT1NUX1NPVVJDRV9VUkwubGVuZ3RoICsgMSkgOiB1cmw7XG4gIGlmICghdGFnTmFtZSB8fCB0YWdOYW1lID09PSBcIipcIilcbiAgICB0aHJvdyBuZXcgRXJyb3IoYExvZ2dlciAke3VybH0gbm90IGFsbG93ZWRgKTtcblxuICBsZXQgZW50cnkgPSBfbG9nZ2VyTWFwLmdldCh0YWdOYW1lKTtcbiAgaWYgKCFlbnRyeSkge1xuICAgIGVudHJ5ID0gY3JlYXRlRW50cnkodGFnTmFtZSwgX2RlZmF1bHRQYXR0ZXJuKTtcbiAgICBfbG9nZ2VyTWFwLnNldCh0YWdOYW1lLCBlbnRyeSk7XG4gIH1cblxuICByZXR1cm4gZW50cnkubG9nZ2VyO1xufVxuXG5leHBvcnQgZnVuY3Rpb24gZW5hYmxlKGZpbHRlcjogc3RyaW5nKSB7XG4gIGlmIChmaWx0ZXIgPT09IFwiKlwiKSB7XG4gICAgYWxsU2V0RmlsdGVyKFwiKlwiKTtcbiAgICByZXR1cm47XG4gIH1cblxuICBjb25zdCBwYWlyID0gZmlsdGVyLnNwbGl0KFwiOlwiKTtcbiAgaWYgKHBhaXIubGVuZ3RoIDwgMilcbiAgICByZXR1cm47XG5cbiAgaWYgKHBhaXJbMF0gPT09IFwiKlwiKSB7XG4gICAgYWxsU2V0RmlsdGVyKHBhaXJbMV0pO1xuICAgIHJldHVybjtcbiAgfVxuXG4gIGxldCBlbnRyeSA9IF9sb2dnZXJNYXAuZ2V0KHBhaXJbMF0pO1xuICBpZiAoIWVudHJ5KSB7XG4gICAgZW50cnkgPSBjcmVhdGVFbnRyeShwYWlyWzBdLCBwYWlyWzFdKTtcbiAgICBfbG9nZ2VyTWFwLnNldChmaWx0ZXIsIGVudHJ5KTtcbiAgfVxuICBlbHNlICB7XG4gICAgZW50cnlTZXRGaWx0ZXIoZW50cnksIHBhaXJbMV0pO1xuICB9XG59XG5cbn0gLy8gbmFtZXNwYWNlIExvZ2dlclxuXG5mb3IgKGNvbnN0IGl0ZXIgb2YgTE9HR0VSX0RFQlVHKSB7XG4gIExvZ2dlci5lbmFibGUoaXRlcik7XG59XG4iLCIvKlxuICogTUlUIExpY2Vuc2VcbiAqXG4gKiBDb3B5cmlnaHQgKGMpIDIwMjUgIFl1cmlpIFlha3ViaW4gKHl1cmlpLnlha3ViaW5AZ21haWwuY29tKVxuICpcbiAqIFBlcm1pc3Npb24gaXMgZ3JhbnRlZCB0byB1c2UsIGNvcHksIG1vZGlmeSwgYW5kIGRpc3RyaWJ1dGUgdGhpcyBzb2Z0d2FyZVxuICogdW5kZXIgdGhlIE1JVCBMaWNlbnNlLiBTZWUgTElDRU5TRSBmaWxlIGZvciBkZXRhaWxzLlxuICovXG5cbmltcG9ydCB7IEpTT05SUENfVkVSU0lPTiB9IGZyb20gXCJAL3NlcnZlci9UcmFuc3BvcnRcIjtcbmltcG9ydCB7IElSZXF1ZXN0U3luYyB9IGZyb20gXCJAL3NlcnZlci9UcmFuc3BvcnRcIjtcbmltcG9ydCB7IExvZ2dlciB9IGZyb20gXCJAL2xvZ2dlclwiO1xuXG5jb25zdCBsb2dnZXIgPSBMb2dnZXIuY3JlYXRlKGltcG9ydC5tZXRhLnVybCk7XG5cbmV4cG9ydCBjbGFzcyBKc29uUnBjUmVxdWVzdFN5bmMge1xuICBwcml2YXRlIF9yZXF1ZXN0OiBJUmVxdWVzdFN5bmM7XG4gIHByaXZhdGUgX2lkOiBudW1iZXI7XG5cbiAgcHVibGljIGNvbnN0cnVjdG9yKHJlcXVlc3RTeW5jOiBJUmVxdWVzdFN5bmMpIHtcbiAgICB0aGlzLl9yZXF1ZXN0ID0gcmVxdWVzdFN5bmM7XG4gICAgdGhpcy5faWQgPSAxO1xuICB9XG5cbiAgcHVibGljIHJlcXVlc3RTeW5jKG1ldGhvZDogc3RyaW5nLCBwYXJhbXM6IGFueSk6IGFueSB7XG4gICAgbG9nZ2VyLmRlYnVnKFwiSnNvblJwY1JlcXVlc3RTeW5jLnJlcXVlc3RTeW5jKFwiLCBtZXRob2QsIFwiLi4ucGFyYW1zKVwiKTtcbiAgICBjb25zdCBtZXNzYWdlID0ge1xuICAgICAganNvbnJwYzogSlNPTlJQQ19WRVJTSU9OLFxuICAgICAgbWV0aG9kLFxuICAgICAgcGFyYW1zLFxuICAgICAgaWQ6IHRoaXMuX2lkKyssXG4gICAgfTtcbiAgICBjb25zdCByZXNwb25zZSA9IHRoaXMuX3JlcXVlc3QucmVxdWVzdFN5bmMobWVzc2FnZSk7XG4gICAgaWYgKHJlc3BvbnNlLmVycm9yKVxuICAgICAgdGhyb3cgbmV3IEVycm9yKHJlc3BvbnNlLmVycm9yLm1lc3NhZ2UsIHsgY2F1c2U6IHJlc3BvbnNlLmVycm9yLmNvZGUgfSk7XG4gICAgcmV0dXJuIHJlc3BvbnNlLnJlc3VsdDtcbiAgfVxufTtcbiIsIi8qXG4gKiBNSVQgTGljZW5zZVxuICpcbiAqIENvcHlyaWdodCAoYykgMjAyNSAgWXVyaWkgWWFrdWJpbiAoeXVyaWkueWFrdWJpbkBnbWFpbC5jb20pXG4gKlxuICogUGVybWlzc2lvbiBpcyBncmFudGVkIHRvIHVzZSwgY29weSwgbW9kaWZ5LCBhbmQgZGlzdHJpYnV0ZSB0aGlzIHNvZnR3YXJlXG4gKiB1bmRlciB0aGUgTUlUIExpY2Vuc2UuIFNlZSBMSUNFTlNFIGZpbGUgZm9yIGRldGFpbHMuXG4gKi9cblxuaW1wb3J0IHsgSlNPTlJQQ19WRVJTSU9OLCBJTWVzc2FnZVNlbmRlciwgSnNvblJwY0RhdGEsIEpzb25ScGNSZXF1ZXN0SGFuZGxlciwgSUpzb25ScGNSZXF1ZXN0LCBJSnNvblJwY1Jlc3BvbnNlLCBKc29uUnBjQ2FsbGJhY2sgfSBmcm9tIFwiQC9zZXJ2ZXIvVHJhbnNwb3J0XCI7XG5pbXBvcnQgeyBMb2dnZXIgfSBmcm9tIFwiQC9sb2dnZXJcIjtcblxuY29uc3QgbG9nZ2VyID0gTG9nZ2VyLmNyZWF0ZShpbXBvcnQubWV0YS51cmwpO1xuXG5jbGFzcyBKc29uUnBjUmVxdWVzdCBpbXBsZW1lbnRzIElKc29uUnBjUmVxdWVzdCB7XG4gIHByaXZhdGUgX3BhcmFtczogYW55O1xuXG4gIGNvbnN0cnVjdG9yKHBhcmFtczogYW55KSB7XG4gICAgdGhpcy5fcGFyYW1zID0gcGFyYW1zO1xuICB9XG5cbiAgZ2V0IHBhcmFtcygpOiBhbnkge1xuICAgIHJldHVybiB0aGlzLl9wYXJhbXM7XG4gIH1cbn1cblxuY2xhc3MgSnNvblJwY1Jlc3BvbnNlIGltcGxlbWVudHMgSUpzb25ScGNSZXNwb25zZSB7XG4gIHByaXZhdGUgX3NlbmRlcjogSU1lc3NhZ2VTZW5kZXI7XG4gIHByaXZhdGUgX2lkOiBudW1iZXI7XG5cbiAgcHVibGljIGNvbnN0cnVjdG9yKHNlbmRlcjogSU1lc3NhZ2VTZW5kZXIsIGlkOiBudW1iZXIpIHtcbiAgICB0aGlzLl9zZW5kZXIgPSBzZW5kZXI7XG4gICAgdGhpcy5faWQgPSBpZDtcbiAgfVxuXG4gIHNlbmRSZXN1bHQocmVzdWx0OiBhbnkpOiB2b2lkIHtcbiAgICBjb25zdCBtZXNzYWdlOiBKc29uUnBjRGF0YSA9IHtcbiAgICAgIGpzb25ycGM6IEpTT05SUENfVkVSU0lPTixcbiAgICAgIHJlc3VsdDogKHJlc3VsdCAhPT0gdW5kZWZpbmVkKSA/IHJlc3VsdCA6IG51bGwsXG4gICAgICBpZDogdGhpcy5faWQsXG4gICAgfTtcbiAgICBsb2dnZXIuZGVidWcoXCI8LS1cIiwgSlNPTi5zdHJpbmdpZnkobWVzc2FnZSkpO1xuICAgIHRoaXMuX3NlbmRlci5zZW5kTWVzc2FnZShtZXNzYWdlKTtcbiAgfVxuXG4gIHNlbmRFcnJvcihjb2RlOiBudW1iZXIsIG1lc3NhZ2U6IHN0cmluZywgZGF0YT86IGFueSk6IHZvaWQge1xuICAgIGNvbnN0IGVycm9yOiBhbnkgPSB7IGNvZGUsIG1lc3NhZ2UgfTtcbiAgICBpZiAoZGF0YSAhPT0gdW5kZWZpbmVkKSB7XG4gICAgICBlcnJvci5kYXRhID0gZGF0YTtcbiAgICB9XG4gICAgY29uc3QgbXNnOiBKc29uUnBjRGF0YSA9IHtcbiAgICAgIGpzb25ycGM6IEpTT05SUENfVkVSU0lPTixcbiAgICAgIGVycm9yLFxuICAgICAgaWQ6IHRoaXMuX2lkLFxuICAgIH07XG4gICAgbG9nZ2VyLmRlYnVnKFwiPC0tXCIsIEpTT04uc3RyaW5naWZ5KG1zZykpO1xuICAgIHRoaXMuX3NlbmRlci5zZW5kTWVzc2FnZShtc2cpO1xuICB9XG59O1xuXG5leHBvcnQgY2xhc3MgSnNvblJwY1NlcnZlciB7XG4gIHByaXZhdGUgX3JlcXVlc3RIYW5kbGVycyA9IG5ldyBNYXA8c3RyaW5nLCBKc29uUnBjUmVxdWVzdEhhbmRsZXI+KCk7XG5cbiAgcHVibGljIGNvbnN0cnVjdG9yKCkge1xuICB9XG5cbiAgcHVibGljIHJlZ2lzdGVySGFuZGxlcihtZXRob2Q6IHN0cmluZywgaGFuZGxlcjogSnNvblJwY1JlcXVlc3RIYW5kbGVyKTogdm9pZCB7XG4gICAgdGhpcy5fcmVxdWVzdEhhbmRsZXJzLnNldChtZXRob2QsIGhhbmRsZXIpO1xuICB9XG5cbiAgcHVibGljIHJlZ2lzdGVyQ2FsbGJhY2sobWV0aG9kOiBzdHJpbmcsIGNhbGxiYWNrOiBKc29uUnBjQ2FsbGJhY2spOiB2b2lkIHtcbiAgICB0aGlzLl9yZXF1ZXN0SGFuZGxlcnMuc2V0KG1ldGhvZCwgYXN5bmMgKHJlcXVlc3QsIHJlc3BvbnNlKSA9PiB7XG4gICAgICBsZXQgcmVzdWx0OiBhbnkgPSBjYWxsYmFjayhyZXF1ZXN0LnBhcmFtcyk7XG4gICAgICBpZiAocmVzdWx0IGluc3RhbmNlb2YgUHJvbWlzZSlcbiAgICAgICAgcmVzdWx0ID0gYXdhaXQgcmVzdWx0O1xuICAgICAgaWYgKHJlc3VsdCAmJiB0eXBlb2YgcmVzdWx0ID09PSBcIm9iamVjdFwiICYmIHR5cGVvZiByZXN1bHQudG9KU09OID09PSBcImZ1bmN0aW9uXCIpXG4gICAgICAgIHJlc3VsdCA9IHJlc3VsdC50b0pTT04oKTtcbiAgICAgIHJlc3BvbnNlLnNlbmRSZXN1bHQocmVzdWx0KTtcbiAgICB9KTtcbiAgfVxuXG4gIHB1YmxpYyBvblJlcXVlc3Qoc2VuZGVyOiBJTWVzc2FnZVNlbmRlciwgbWV0aG9kOiBhbnksIGlkOiBhbnksIHBhcmFtczogYW55KTogdm9pZCB7XG4gICAgY29uc3QgaGFuZGxlciA9ICh0eXBlb2YgbWV0aG9kID09PSBcInN0cmluZ1wiKSA/IHRoaXMuX3JlcXVlc3RIYW5kbGVycy5nZXQobWV0aG9kKSA6IHVuZGVmaW5lZDtcbiAgICBjb25zdCByZXNwb25zZSA9IG5ldyBKc29uUnBjUmVzcG9uc2Uoc2VuZGVyLCBpZCk7XG4gICAgaWYgKGhhbmRsZXIpIHtcbiAgICAgIGhhbmRsZXIobmV3IEpzb25ScGNSZXF1ZXN0KHBhcmFtcyksIHJlc3BvbnNlKTtcbiAgICB9XG4gICAgZWxzZSB7XG4gICAgICByZXNwb25zZS5zZW5kRXJyb3IoLTMyNjAxLCBcIk1ldGhvZCBub3QgZm91bmRcIik7XG4gICAgfVxuICB9XG5cbiAgcHVibGljIG9uUmVzdWx0KHNlbmRlcjogSU1lc3NhZ2VTZW5kZXIsIHJlc3VsdDogYW55LCBpZDogbnVtYmVyKTogdm9pZCB7XG4gICAgXG4gIH1cblxuICBwdWJsaWMgb25FcnJvcihzZW5kZXI6IElNZXNzYWdlU2VuZGVyLCBlcnJvcjogb2JqZWN0LCBpZDogbnVtYmVyIHwgbnVsbCk6IHZvaWQge1xuICAgIFxuICB9XG5cbiAgcHVibGljIG9uTm90aWZpY2F0aW9uKHNlbmRlcjogSU1lc3NhZ2VTZW5kZXIsIG1ldGhvZDogYW55LCBwYXJhbXM/OiBhbnkpOiB2b2lkIHtcbiAgICBcbiAgfVxuXG4gIHByaXZhdGUgb25NZXNzYWdlSW1wbChzZW5kZXI6IElNZXNzYWdlU2VuZGVyLCBtZXNzYWdlOiBhbnkpOiB2b2lkIHtcbiAgICBpZiAoIW1lc3NhZ2UgfHwgdHlwZW9mIG1lc3NhZ2UgIT09IFwib2JqZWN0XCIpIHtcbiAgICAgIHJldHVybjtcbiAgICB9XG5cbiAgICBjb25zdCBkYXRhID0gbWVzc2FnZSBhcyBKc29uUnBjRGF0YTtcblxuICAgIGlmIChPYmplY3QuaGFzT3duKGRhdGEsIFwibWV0aG9kXCIpKSB7XG4gICAgICBpZiAoT2JqZWN0Lmhhc093bihkYXRhLCBcImlkXCIpKVxuICAgICAgICB0aGlzLm9uUmVxdWVzdChzZW5kZXIsIGRhdGEubWV0aG9kLCBkYXRhLmlkLCBkYXRhLnBhcmFtcyk7XG4gICAgICBlbHNlXG4gICAgICAgIHRoaXMub25Ob3RpZmljYXRpb24oc2VuZGVyLCBkYXRhLm1ldGhvZCwgZGF0YS5wYXJhbXMpO1xuICAgIH1cbiAgICBlbHNlIGlmIChkYXRhLmlkKSB7XG4gICAgICBcbiAgICB9XG4gICAgZWxzZSB7XG5cbiAgICB9XG4gIH1cblxuICBwdWJsaWMgZW1pdE1lc3NhZ2Uoc2VuZGVyOiBJTWVzc2FnZVNlbmRlciwgbWVzc2FnZTogYW55KTogdm9pZCB7XG4gICAgbG9nZ2VyLmRlYnVnKFwiLS0+XCIsIEpTT04uc3RyaW5naWZ5KG1lc3NhZ2UpKTtcbiAgICBpZiAoQXJyYXkuaXNBcnJheShtZXNzYWdlKSlcbiAgICAgIG1lc3NhZ2UuZm9yRWFjaChtc2cgPT4gdGhpcy5vbk1lc3NhZ2VJbXBsKHNlbmRlciwgbXNnKSk7XG4gICAgZWxzZVxuICAgICAgdGhpcy5vbk1lc3NhZ2VJbXBsKHNlbmRlciwgbWVzc2FnZSk7XG4gIH1cbn07XG4iLCIvKlxuICogTUlUIExpY2Vuc2VcbiAqXG4gKiBDb3B5cmlnaHQgKGMpIDIwMjUgIFl1cmlpIFlha3ViaW4gKHl1cmlpLnlha3ViaW5AZ21haWwuY29tKVxuICpcbiAqIFBlcm1pc3Npb24gaXMgZ3JhbnRlZCB0byB1c2UsIGNvcHksIG1vZGlmeSwgYW5kIGRpc3RyaWJ1dGUgdGhpcyBzb2Z0d2FyZVxuICogdW5kZXIgdGhlIE1JVCBMaWNlbnNlLiBTZWUgTElDRU5TRSBmaWxlIGZvciBkZXRhaWxzLlxuICovXG5cbmltcG9ydCB7IFdvcmtlciB9IGZyb20gXCJub2RlOndvcmtlcl90aHJlYWRzXCI7XG5cbmltcG9ydCB7IGN1cnJlbnRTY3JpcHRVUkwgfSBmcm9tIFwiQC91dGlscy9Nb2R1bGVcIjtcbmltcG9ydCB7IE1lbW9yeU1lc3NhZ2VTZW5kZXIgfSBmcm9tIFwiQC9zZXJ2ZXIvTWVtb3J5VHJhbnNwb3J0XCI7XG5pbXBvcnQgeyBXb3JrZXJTZW5kZXIgfSBmcm9tIFwiQC9zZXJ2ZXIvV29ya2VyU2VuZGVyXCI7XG5pbXBvcnQgeyBTY29wZUhlbHBlciwgVmFyaWFibGVNYXAgfSBmcm9tIFwiQC9jb3JlL1Njb3BlXCI7XG5pbXBvcnQgeyBKU09OUlBDX1ZFUlNJT04gfSBmcm9tIFwiQC9zZXJ2ZXIvVHJhbnNwb3J0XCI7XG5pbXBvcnQgeyBKc29uUnBjU2VydmVyIH0gZnJvbSBcIkAvc2VydmVyL0pzb25ScGNTZXJ2ZXJcIjtcbmltcG9ydCB7IExvZ2dlciB9IGZyb20gXCJAL2xvZ2dlclwiO1xuXG5jb25zdCBsb2dnZXIgPSBMb2dnZXIuY3JlYXRlKGltcG9ydC5tZXRhLnVybCk7XG5cbmludGVyZmFjZSBSZXNwb25zZUVudHJ5IHtcbiAgcmVzb2x2ZTogKHZhbHVlOiBhbnkpID0+IHZvaWQ7XG4gIHJlamVjdDogKHJlYXNvbj86IGFueSkgPT4gdm9pZDtcbn07XG5cbmV4cG9ydCBjbGFzcyBNYWtlQ2xpZW50IHtcbiAgcHJpdmF0ZSBfanNvblJwY1NlcnZlcjogSnNvblJwY1NlcnZlcjtcbiAgcHJpdmF0ZSBfd29ya2VyOiBXb3JrZXI7XG4gIHByaXZhdGUgX2lkID0gMTtcbiAgcHJpdmF0ZSBfd2FpdFJlc3BvbnNlTWFwID0gbmV3IE1hcDxudW1iZXIsUmVzcG9uc2VFbnRyeT4oKTs7XG5cbiAgcHVibGljIGNvbnN0cnVjdG9yKGpzb25ScGNTZXJ2ZXI6IEpzb25ScGNTZXJ2ZXIpIHtcbiAgICB0aGlzLl9qc29uUnBjU2VydmVyID0ganNvblJwY1NlcnZlcjtcbiAgICB0aGlzLl93b3JrZXIgPSBuZXcgV29ya2VyKGN1cnJlbnRTY3JpcHRVUkwoKSk7XG4gICAgdGhpcy5fd29ya2VyLm9uKFwibWVzc2FnZVwiLCBtZXNzYWdlID0+IHRoaXMub25Xb3JrZXJNZXNzYWdlKG1lc3NhZ2UpKTtcbiAgICB0aGlzLl93b3JrZXIub24oXCJlcnJvclwiLCBlcnJvciA9PiB0aGlzLm9uV29ya2VyRXJyb3IoZXJyb3IpKTtcbiAgICB0aGlzLl93b3JrZXIub24oXCJleGl0XCIsIGNvZGUgPT4gdGhpcy5vbldvcmtlckV4aXQoY29kZSkpO1xuICB9XG5cbiAgcHVibGljIGFzeW5jIHJlcXVlc3QobWV0aG9kOiBzdHJpbmcsIHBhcmFtczogYW55KTogUHJvbWlzZTxhbnk+IHtcbiAgICBjb25zdCBpZCA9IHRoaXMuX2lkKys7XG4gICAgY29uc3QgcmVzdWx0ID0gbmV3IFByb21pc2U8YW55PigocmVzb2x2ZSwgcmVqZWN0KSA9PiB7XG4gICAgICB0aGlzLl93YWl0UmVzcG9uc2VNYXAuc2V0KGlkLCB7IHJlc29sdmUsIHJlamVjdCB9KTtcbiAgICB9KTtcbiAgICB0aGlzLl93b3JrZXIucG9zdE1lc3NhZ2Uoe1xuICAgICAganNvbnJwYzogSlNPTlJQQ19WRVJTSU9OLFxuICAgICAgbWV0aG9kLFxuICAgICAgcGFyYW1zLFxuICAgICAgaWQsXG4gICAgfSk7XG4gICAgcmV0dXJuIHJlc3VsdDtcbiAgfVxuXG4gIHByaXZhdGUgb25Xb3JrZXJNZXNzYWdlKG1lc3NhZ2U6IGFueSkge1xuICAgIGlmIChtZXNzYWdlIGluc3RhbmNlb2YgU2hhcmVkQXJyYXlCdWZmZXIpIHtcbiAgICAgIGNvbnN0IG10ID0gbmV3IE1lbW9yeU1lc3NhZ2VTZW5kZXIobWVzc2FnZSlcbiAgICAgIHRoaXMuX2pzb25ScGNTZXJ2ZXIuZW1pdE1lc3NhZ2UobXQsIG10LnJlYWRNZXNzYWdlKCkpO1xuICAgIH1cbiAgICBlbHNlIGlmIChPYmplY3QuaGFzT3duKG1lc3NhZ2UsIFwibWV0aG9kXCIpKSB7XG4gICAgICBjb25zdCBzZW5kZXIgPSBuZXcgV29ya2VyU2VuZGVyKHRoaXMuX3dvcmtlcik7XG4gICAgICB0aGlzLl9qc29uUnBjU2VydmVyLmVtaXRNZXNzYWdlKHNlbmRlciwgbWVzc2FnZSk7XG4gICAgfVxuICAgIGVsc2UgaWYgKE9iamVjdC5oYXNPd24obWVzc2FnZSwgXCJpZFwiKSkge1xuICAgICAgY29uc3QgcHJvbWlzZSA9IHRoaXMuX3dhaXRSZXNwb25zZU1hcC5nZXQobWVzc2FnZS5pZCk7XG4gICAgICBpZiAoIXByb21pc2UpXG4gICAgICAgIHRocm93IG5ldyBFcnJvcihgVW5rbm93biByZXNwb25zZSBcIiR7bWVzc2FnZS5pZH1cIiBpZGApO1xuICAgICAgaWYgKE9iamVjdC5oYXNPd24obWVzc2FnZSwgXCJyZXN1bHRcIikpXG4gICAgICAgIHByb21pc2UucmVzb2x2ZShtZXNzYWdlLnJlc3VsdCk7XG4gICAgICBlbHNlIGlmIChPYmplY3QuaGFzT3duKG1lc3NhZ2UsIFwiZXJyb3JcIikpXG4gICAgICAgIHByb21pc2UucmVqZWN0KG1lc3NhZ2UuZXJyb3IpO1xuICAgICAgZWxzZVxuICAgICAgICB0aHJvdyBuZXcgRXJyb3IoYFVua25vd24gbWVzc2FnZSB0eXBlIG9mIFwiJHttZXNzYWdlfVwiYCk7XG4gICAgfVxuICB9XG5cbiAgcHJpdmF0ZSBvbldvcmtlckVycm9yKGVycm9yOiBFcnJvcikge1xuICAgIGlmIChlcnJvciBpbnN0YW5jZW9mIEVycm9yKVxuICAgICAgbG9nZ2VyLmZhdGFsKGVycm9yLnN0YWNrKTtcbiAgICBlbHNlXG4gICAgICBsb2dnZXIuZmF0YWwoZXJyb3IpO1xuICAgIHByb2Nlc3MuZXhpdCgxKTtcbiAgfVxuXG4gIHByaXZhdGUgb25Xb3JrZXJFeGl0KGNvZGU6IG51bWJlcikge1xuICAgIGlmIChjb2RlKVxuICAgICAgcHJvY2Vzcy5leGl0KGNvZGUpO1xuICB9XG59O1xuIiwiLypcbiAqIE1JVCBMaWNlbnNlXG4gKlxuICogQ29weXJpZ2h0IChjKSAyMDI1ICBZdXJpaSBZYWt1YmluICh5dXJpaS55YWt1YmluQGdtYWlsLmNvbSlcbiAqXG4gKiBQZXJtaXNzaW9uIGlzIGdyYW50ZWQgdG8gdXNlLCBjb3B5LCBtb2RpZnksIGFuZCBkaXN0cmlidXRlIHRoaXMgc29mdHdhcmVcbiAqIHVuZGVyIHRoZSBNSVQgTGljZW5zZS4gU2VlIExJQ0VOU0UgZmlsZSBmb3IgZGV0YWlscy5cbiAqL1xuXG5pbXBvcnQgZnMgZnJvbSBcIm5vZGU6ZnNcIjtcblxuaW1wb3J0IHsgUHJvamVjdENvbnRleHQgfSBmcm9tIFwiQC9jb3JlL1Byb2plY3RDb250ZXh0XCI7XG5pbXBvcnQgeyBTY3JpcHRDb250ZXh0IH0gZnJvbSBcIkAvY29yZS9TY3JpcHRDb250ZXh0XCI7XG5pbXBvcnQgeyBTY29wZUhlbHBlciwgVmFyaWFibGVNYXAgfSBmcm9tIFwiQC9jb3JlL1Njb3BlXCI7XG5pbXBvcnQgeyBNYWtlQ2xpZW50IH0gZnJvbSBcIkAvc2VydmVyL01ha2VDbGllbnRcIjtcbmltcG9ydCB7IEpzb25ScGNTZXJ2ZXIgfSBmcm9tIFwiQC9zZXJ2ZXIvSnNvblJwY1NlcnZlclwiO1xuaW1wb3J0IHsgaW1wb3J0TW9kdWxlIH0gZnJvbSBcIkAvdXRpbHMvTW9kdWxlXCI7XG5pbXBvcnQgeyBjcmVhdGVWYXJpYWJsZU1hcEZvckRpcmVjdG9yeSB9IGZyb20gXCJAL2NvcmUvQmFzZUNvbnRleHRcIjtcbmltcG9ydCB7IE1BSU5OT0RFX1NUQVJUTUFLRVNDUklQVCB9IGZyb20gXCJAL3NlcnZlci9SZW1vdGVNZXRob2RzXCI7XG5pbXBvcnQgeyBNQUlOTk9ERV9MT0FESlNPTiB9IGZyb20gXCJAL3NlcnZlci9SZW1vdGVNZXRob2RzXCI7XG5pbXBvcnQgeyBNQUlOTk9ERV9FWEVDVVRFU0NSSVBUIH0gZnJvbSBcIkAvc2VydmVyL1JlbW90ZU1ldGhvZHNcIjtcbmltcG9ydCB7IFdPUktFUk5PREVfU1RBUlRNQUtFU0NSSVBUIH0gZnJvbSBcIkAvc2VydmVyL1JlbW90ZU1ldGhvZHNcIjtcbmltcG9ydCB7IE1BSU5OT0RFX0FERENVU1RPTVNDUklQVCB9IGZyb20gXCJAL3NlcnZlci9SZW1vdGVNZXRob2RzXCI7XG5pbXBvcnQgeyBNQUlOTk9ERV9BRERTVEFUSUNMSUJSQVJZIH0gZnJvbSBcIkAvc2VydmVyL1JlbW90ZU1ldGhvZHNcIjtcbmltcG9ydCB7IE1BSU5OT0RFX0FEREVYRUNVVEFCTEUgfSBmcm9tIFwiQC9zZXJ2ZXIvUmVtb3RlTWV0aG9kc1wiO1xuaW1wb3J0IHsgTUFJTk5PREVfVEFSR0VUU09VUkNFUyB9IGZyb20gXCJAL3NlcnZlci9SZW1vdGVNZXRob2RzXCI7XG5pbXBvcnQgeyBMb2dnZXIgfSBmcm9tIFwiQC9sb2dnZXJcIjtcblxuY29uc3QgbG9nZ2VyID0gTG9nZ2VyLmNyZWF0ZShpbXBvcnQubWV0YS51cmwpO1xuXG5leHBvcnQgY29uc3QgQ09ORklHVVJFX0VWRU5UID0gXCJjb25maWd1cmVcIjtcbmV4cG9ydCBjb25zdCBCVUlMRF9FVkVOVCA9IFwiYnVpbGRcIjtcblxuZXhwb3J0IGludGVyZmFjZSBDb25maWd1cmVFdmVudCB7XG4gIHByb2plY3Q6IFByb2plY3RDb250ZXh0O1xufTtcblxuZXhwb3J0IGludGVyZmFjZSBCdWlsZEV2ZW50IHtcbiAgcHJvamVjdDogUHJvamVjdENvbnRleHQ7XG59O1xuXG5leHBvcnQgdHlwZSBDb25maWd1cmVMaXN0ZW5lciA9IChldmVudDogQ29uZmlndXJlRXZlbnQpID0+IHZvaWQ7XG5leHBvcnQgdHlwZSBCdWlsZExpc3RlbmVyID0gKGV2ZW50OiBCdWlsZEV2ZW50KSA9PiB2b2lkO1xuXG5leHBvcnQgaW50ZXJmYWNlIE1lbW9yeVNlbmRlciB7XG4gIHNlbmRNZXNzYWdlKG1lc3NhZ2U6IGFueSk6IHZvaWQ7XG59O1xuXG5leHBvcnQgY2xhc3MgTWFrZVNlcnZlciB7XG4gIHByaXZhdGUgX3Jvb3RWYXJpYWJsZU1hcDogVmFyaWFibGVNYXAgPSB7fTtcbiAgcHJpdmF0ZSBfcHJvamVjdCA9IFByb2plY3RDb250ZXh0LmNyZWF0ZSgpO1xuICBwcml2YXRlIF9saXN0ZW5lcnM6IHsgW25hbWU6IHN0cmluZ106IEZ1bmN0aW9uW10gfTtcbiAgcHJpdmF0ZSBfanNvblJwY1NlcnZlciA9IG5ldyBKc29uUnBjU2VydmVyO1xuICBwcml2YXRlIF9jbGllbnRzID0gbmV3IE1hcDxzdHJpbmcsIE1ha2VDbGllbnQ+O1xuICBwcml2YXRlIF9jbGllbnRJZENvdW50ZXIgPSAxO1xuXG4gIHB1YmxpYyBjb25zdHJ1Y3RvcigpIHtcbiAgICB0aGlzLl9saXN0ZW5lcnMgPSB7XG4gICAgICBbIENPTkZJR1VSRV9FVkVOVCBdOiBuZXcgQXJyYXk8Q29uZmlndXJlTGlzdGVuZXI+LFxuICAgICAgWyBCVUlMRF9FVkVOVCBdOiBuZXcgQXJyYXk8QnVpbGRMaXN0ZW5lcj4sXG4gICAgfTtcbiAgICB0aGlzLl9qc29uUnBjU2VydmVyLnJlZ2lzdGVyQ2FsbGJhY2soTUFJTk5PREVfRVhFQ1VURVNDUklQVCwgcGFyYW1zID0+IHRoaXMuZXhlY3V0ZVNjcmlwdChwYXJhbXMpKTtcbiAgICB0aGlzLl9qc29uUnBjU2VydmVyLnJlZ2lzdGVyQ2FsbGJhY2soTUFJTk5PREVfTE9BREpTT04sIHBhcmFtcyA9PiB0aGlzLmxvYWRKU09OKHBhcmFtcykpO1xuICAgIHRoaXMuX2pzb25ScGNTZXJ2ZXIucmVnaXN0ZXJDYWxsYmFjayhNQUlOTk9ERV9TVEFSVE1BS0VTQ1JJUFQsIHBhcmFtcyA9PiB0aGlzLnN0YXJ0TWFrZVNjcmlwdChwYXJhbXMpKTtcbiAgICB0aGlzLl9qc29uUnBjU2VydmVyLnJlZ2lzdGVyQ2FsbGJhY2soTUFJTk5PREVfQUREQ1VTVE9NU0NSSVBULCBwYXJhbXMgPT4gdGhpcy5hZGRDdXN0b21TY3JpcHQocGFyYW1zKSk7XG4gIH1cblxuICBwdWJsaWMgZ2V0IHJvb3RWYXJpYWJsZU1hcCgpIHtcbiAgICByZXR1cm4gdGhpcy5fcm9vdFZhcmlhYmxlTWFwO1xuICB9XG5cbiAgcHVibGljIGdldCBwcm9qZWN0KCkge1xuICAgIHJldHVybiB0aGlzLl9wcm9qZWN0O1xuICB9XG5cbiAgcHVibGljIGNyZWF0ZUNsaWVudCgpIHtcbiAgICBjb25zdCBuYW1lID0gXCJta2NcIiArIHRoaXMuX2NsaWVudElkQ291bnRlcisrO1xuICAgIGNvbnN0IGNsaWVudCA9IG5ldyBNYWtlQ2xpZW50KHRoaXMuX2pzb25ScGNTZXJ2ZXIpO1xuICAgIHRoaXMuX2NsaWVudHMuc2V0KG5hbWUsIGNsaWVudCk7XG4gICAgcmV0dXJuIGNsaWVudDtcbiAgfVxuXG4gIHB1YmxpYyBhc3luYyBzdGFydE1ha2VTY3JpcHQocGFyYW1zOiBhbnkpOiBQcm9taXNlPHZvaWQ+IHtcbiAgICBsb2dnZXIuZGVidWcoXCJNYWtlU2VydmVyLnN0YXJ0TWFrZVNjcmlwdFwiKTtcblxuICAgIGNvbnN0IHZhcmlhYmxlTWFwID0gU2NvcGVIZWxwZXIuZnJvbUpTT04ocGFyYW1zKTtcbiAgICBhd2FpdCB0aGlzLnJ1bk1ha2VTY3JpcHQodmFyaWFibGVNYXApO1xuICB9XG5cbiAgcHJpdmF0ZSBhc3luYyBsb2FkSlNPTihmaWxlbmFtZTogc3RyaW5nKTogUHJvbWlzZTxhbnk+IHtcbiAgICBsb2dnZXIuZGVidWcoXCJNYWtlU2VydmVyLmxvYWRKU09OKFwiLCBmaWxlbmFtZSwgXCIpXCIpO1xuICAgIGlmIChmaWxlbmFtZS5lbmRzV2l0aChcIi5qc29uXCIpKSB7XG4gICAgICBjb25zdCBjb250ZW50ID0gYXdhaXQgZnMucHJvbWlzZXMucmVhZEZpbGUoZmlsZW5hbWUsIFwidXRmOFwiKTtcbiAgICAgIHJldHVybiBKU09OLnBhcnNlKGNvbnRlbnQpO1xuICAgIH1cblxuICAgIGNvbnN0IG1vZHVsZSA9IGF3YWl0IGltcG9ydE1vZHVsZShmaWxlbmFtZSk7XG4gICAgaWYgKCFtb2R1bGUuZGVmYXVsdClcbiAgICAgIHRocm93IG5ldyBFcnJvcihgU2NyaXB0IFwiJHtmaWxlbmFtZX1cIiBoYXMgbm90IGNvbnRhaW4gYSBkZWZhdWx0IGZ1bmN0aW9uYCk7XG5cbiAgICByZXR1cm4gbW9kdWxlLmRlZmF1bHQ7XG4gIH1cblxuICBwcml2YXRlIGFzeW5jIGV4ZWN1dGVTY3JpcHQocGFyYW1zOiBhbnkpOiBQcm9taXNlPHZvaWQ+IHtcbiAgICBsb2dnZXIuZGVidWcoXCJNYWtlU2VydmVyLmV4ZWN1dGVTY3JpcHRcIik7XG4gICAgY29uc3QgdmFyaWFibGVNYXAgPSBTY29wZUhlbHBlci5mcm9tSlNPTihwYXJhbXMpO1xuICAgIGNvbnN0IHNjcmlwdEZpbGUgPSBTY29wZUhlbHBlci5nZXQodmFyaWFibGVNYXAsIFwiU0NSSVBUX0ZJTEVcIik7XG5cbiAgICBjb25zdCBtb2R1bGUgPSBhd2FpdCBpbXBvcnRNb2R1bGUoc2NyaXB0RmlsZS50b1N0cmluZygpKTtcbiAgICBpZiAoIW1vZHVsZS5kZWZhdWx0KVxuICAgICAgdGhyb3cgbmV3IEVycm9yKGBTY3JpcHQgXCIke3NjcmlwdEZpbGV9XCIgaGFzIG5vdCBjb250YWluIGEgZGVmYXVsdCBmdW5jdGlvbmApO1xuXG4gICAgY29uc3QgbWsgPSBTY3JpcHRDb250ZXh0LmNyZWF0ZSh0aGlzLl9wcm9qZWN0LCB2YXJpYWJsZU1hcCk7XG4gICAgbW9kdWxlLmRlZmF1bHQobWspO1xuICB9XG5cbiAgcHJpdmF0ZSBhZGRDdXN0b21TY3JpcHQocGFyYW1zOiBhbnkpIHtcbiAgICBsb2dnZXIuZGVidWcoXCJNYWtlU2VydmVyLmFkZEN1c3RvbVNjcmlwdFwiKTtcbiAgICBjb25zdCB2YXJpYWJsZU1hcCA9IFNjb3BlSGVscGVyLmZyb21KU09OKHBhcmFtcyk7XG4gICAgcmV0dXJuIHRoaXMuX3Byb2plY3QuYWRkQ3VzdG9tU2NyaXB0KHZhcmlhYmxlTWFwKTtcbiAgfVxuXG4gIHB1YmxpYyBhc3luYyBydW5NYWtlU2NyaXB0KHZhcmlhYmxlTWFwOiBWYXJpYWJsZU1hcCk6IFByb21pc2U8Ym9vbGVhbj4ge1xuICAgIGlmICghYXdhaXQgdGhpcy5fcHJvamVjdC5wcmVwZWFyU2NyaXB0RmlsZSh2YXJpYWJsZU1hcCkpXG4gICAgICByZXR1cm4gZmFsc2U7XG5cbiAgICBjb25zdCBjbGllbnQgPSB0aGlzLmNyZWF0ZUNsaWVudCgpO1xuXG4gICAgY29uc3QgY3dkU2F2ZSA9IHByb2Nlc3MuY3dkKCk7XG4gICAgY29uc3Qgc2NyaXB0RGlyID0gU2NvcGVIZWxwZXIuZ2V0KHZhcmlhYmxlTWFwLCBcIlNDUklQVF9ESVJcIik7XG4gICAgcHJvY2Vzcy5jaGRpcihzY3JpcHREaXIudG9TdHJpbmcoKSk7XG4gICAgYXdhaXQgY2xpZW50LnJlcXVlc3QoV09SS0VSTk9ERV9TVEFSVE1BS0VTQ1JJUFQsIFNjb3BlSGVscGVyLnRvSlNPTih2YXJpYWJsZU1hcCkpO1xuICAgIHByb2Nlc3MuY2hkaXIoY3dkU2F2ZSk7XG5cbiAgICByZXR1cm4gdHJ1ZTtcbiAgfVxuXG4gIHB1YmxpYyBhc3luYyBzdGFydCgpIHtcbiAgICBjb25zdCBzb3VyY2VEaXIgPSBTY29wZUhlbHBlci5nZXQodGhpcy5fcm9vdFZhcmlhYmxlTWFwLCBcIlBST0pFQ1RfU09VUkNFX0RJUlwiKTtcbiAgICBjb25zdCBiaW5hcnlEaXIgPSBTY29wZUhlbHBlci5nZXQodGhpcy5fcm9vdFZhcmlhYmxlTWFwLCBcIlBST0pFQ1RfQklOQVJZX0RJUlwiKTtcblxuICAgIGNvbnN0IHZhcmlhYmxlTWFwID0gY3JlYXRlVmFyaWFibGVNYXBGb3JEaXJlY3RvcnkodGhpcy5fcm9vdFZhcmlhYmxlTWFwLCBzb3VyY2VEaXIsIGJpbmFyeURpcik7XG4gICAgaWYgKCFhd2FpdCB0aGlzLnJ1bk1ha2VTY3JpcHQodmFyaWFibGVNYXApKVxuICAgICAgdGhyb3cgRXJyb3IoXCJDYW4ndCBwcmVwZWFyIFNjcmlwdEZpbGVcIik7XG5cbiAgICAvLyB0aGlzLm9uQ29uZmlndXJlRW5kKCk7XG5cbiAgICAvKnRoaXMuX3Byb2plY3QuYWRkU3ViZGlyZWN0b3J5KHRoaXMuX3Jvb3RWYXJpYWJsZU1hcCwgc291cmNlRGlyLCBiaW5hcnlEaXIpO1xuICAgIHRoaXMuX3Byb2plY3QuZG9TdWJkaXJlY3RvcnkoKS50aGVuKCgpID0+IHRoaXMub25Db25maWd1cmVFbmQoKSk7Ki9cbiAgfVxuXG4gIHByaXZhdGUgYXN5bmMgb25Db25maWd1cmVFbmQoKSB7XG4gICAgY29uc3QgZXZlbnQgPSB7IHByb2plY3Q6IHRoaXMuX3Byb2plY3QgfTtcbiAgICBhd2FpdCB0aGlzLmVtaXRFdmVudChDT05GSUdVUkVfRVZFTlQsIGV2ZW50KTtcbiAgICBhd2FpdCB0aGlzLmVtaXRFdmVudChCVUlMRF9FVkVOVCwgZXZlbnQpO1xuICB9XG5cbiAgcHJpdmF0ZSBhc3luYyBlbWl0RXZlbnQ8VD4odHlwZTogc3RyaW5nLCBldmVudDogVCk6IFByb21pc2U8dm9pZD4ge1xuICAgIGZvciAoY29uc3QgbGlzdGVuZXIgb2YgdGhpcy5fbGlzdGVuZXJzW3R5cGVdKSB7XG4gICAgICBjb25zdCByZXN1bHQgPSBsaXN0ZW5lcihldmVudCk7XG4gICAgICBpZiAocmVzdWx0IGluc3RhbmNlb2YgUHJvbWlzZSlcbiAgICAgICAgYXdhaXQgcmVzdWx0O1xuICAgIH1cbiAgfVxuICBcbiAgcHVibGljIGFkZEV2ZW50TGlzdGVuZXIodHlwZTogXCJjb25maWd1cmVcIiwgbGlzdGVuZXI6IENvbmZpZ3VyZUxpc3RlbmVyKTogdm9pZDtcbiAgcHVibGljIGFkZEV2ZW50TGlzdGVuZXIodHlwZTogXCJidWlsZFwiLCBsaXN0ZW5lcjogQnVpbGRMaXN0ZW5lcik6IHZvaWQ7XG4gIHB1YmxpYyBhZGRFdmVudExpc3RlbmVyKHR5cGU6IHN0cmluZywgbGlzdGVuZXI6IEZ1bmN0aW9uKTogdm9pZCB7XG4gICAgdGhpcy5fbGlzdGVuZXJzW3R5cGVdLnB1c2gobGlzdGVuZXIpO1xuICB9XG59O1xuIiwiLypcbiAqIE1JVCBMaWNlbnNlXG4gKlxuICogQ29weXJpZ2h0IChjKSAyMDI1ICBZdXJpaSBZYWt1YmluICh5dXJpaS55YWt1YmluQGdtYWlsLmNvbSlcbiAqXG4gKiBQZXJtaXNzaW9uIGlzIGdyYW50ZWQgdG8gdXNlLCBjb3B5LCBtb2RpZnksIGFuZCBkaXN0cmlidXRlIHRoaXMgc29mdHdhcmVcbiAqIHVuZGVyIHRoZSBNSVQgTGljZW5zZS4gU2VlIExJQ0VOU0UgZmlsZSBmb3IgZGV0YWlscy5cbiAqL1xuXG5pbXBvcnQgeyBJTWVzc2FnZVNlbmRlciwgSVJlcXVlc3RTeW5jIH0gZnJvbSBcIkAvc2VydmVyL1RyYW5zcG9ydFwiO1xuaW1wb3J0IHsgTG9nZ2VyIH0gZnJvbSBcIkAvbG9nZ2VyXCI7XG5cbmNvbnN0IGxvZ2dlciA9IExvZ2dlci5jcmVhdGUoaW1wb3J0Lm1ldGEudXJsKTtcblxuZXhwb3J0IGNsYXNzIE1lbW9yeU1lc3NhZ2VTZW5kZXIgaW1wbGVtZW50cyBJTWVzc2FnZVNlbmRlciB7XG4gIHByaXZhdGUgX2J1ZmZlcjogU2hhcmVkQXJyYXlCdWZmZXI7XG4gIHByaXZhdGUgX21lbW9yeTogTWVtb3J5VHJhbnNwb3J0LkJ1ZmZlcjtcblxuICBwdWJsaWMgY29uc3RydWN0b3IoYnVmZmVyOiBTaGFyZWRBcnJheUJ1ZmZlcikge1xuICAgIHRoaXMuX2J1ZmZlciA9IGJ1ZmZlcjtcbiAgICB0aGlzLl9tZW1vcnkgPSBuZXcgTWVtb3J5VHJhbnNwb3J0LkJ1ZmZlcihidWZmZXIpO1xuICB9XG5cbiAgcHVibGljIHNlbmRNZXNzYWdlKG1lc3NhZ2U6IGFueSk6IHZvaWQge1xuICAgIHRoaXMuX21lbW9yeS5zZXQobWVzc2FnZSwgdHJ1ZSk7XG4gIH1cblxuICBwdWJsaWMgcmVhZE1lc3NhZ2UoKTogYW55IHtcbiAgICByZXR1cm4gdGhpcy5fbWVtb3J5LmdldCgpO1xuICB9XG59O1xuXG5leHBvcnQgY2xhc3MgTWVtb3J5VHJhbnNwb3J0IGltcGxlbWVudHMgSVJlcXVlc3RTeW5jIHtcbiAgcHJpdmF0ZSBfc2VuZGVyOiBJTWVzc2FnZVNlbmRlcjtcbiAgcHJpdmF0ZSBfYnVmZmVyOiBTaGFyZWRBcnJheUJ1ZmZlcjtcbiAgcHJpdmF0ZSBfbWVtb3J5OiBNZW1vcnlUcmFuc3BvcnQuQnVmZmVyO1xuXG4gIHB1YmxpYyBjb25zdHJ1Y3RvcihzZW5kZXI6IElNZXNzYWdlU2VuZGVyLCBidWZmZXI6IFNoYXJlZEFycmF5QnVmZmVyKSB7XG4gICAgdGhpcy5fc2VuZGVyID0gc2VuZGVyO1xuICAgIHRoaXMuX2J1ZmZlciA9IGJ1ZmZlcjtcbiAgICB0aGlzLl9tZW1vcnkgPSBuZXcgTWVtb3J5VHJhbnNwb3J0LkJ1ZmZlcihidWZmZXIpO1xuICB9XG5cbiAgcHVibGljIHJlcXVlc3RTeW5jKGRhdGE6IGFueSk6IGFueSB7XG4gICAgdGhpcy5fbWVtb3J5LnNldChkYXRhKTtcbiAgICB0aGlzLl9zZW5kZXIuc2VuZE1lc3NhZ2UodGhpcy5fYnVmZmVyKTtcbiAgICByZXR1cm4gdGhpcy5fbWVtb3J5LmdldCh0cnVlKTtcbiAgfVxufTtcblxuZXhwb3J0IG5hbWVzcGFjZSBNZW1vcnlUcmFuc3BvcnQge1xuXG5jb25zdCBNQUdJQ19PRkZTRVQgPSAwO1xuXG5leHBvcnQgY2xhc3MgQnVmZmVyIHtcbiAgcHJpdmF0ZSBfc2lnbmFsOiBJbnQzMkFycmF5O1xuICBwcml2YXRlIF9kYXRhOiBVaW50OEFycmF5O1xuICBwcml2YXRlIF9tYWdpYzogbnVtYmVyO1xuXG4gIHB1YmxpYyBjb25zdHJ1Y3RvcihidWZmZXI6IFNoYXJlZEFycmF5QnVmZmVyKSB7XG4gICAgdGhpcy5fc2lnbmFsID0gbmV3IEludDMyQXJyYXkoYnVmZmVyLCBNQUdJQ19PRkZTRVQsIDEpO1xuICAgIHRoaXMuX2RhdGEgPSBuZXcgVWludDhBcnJheShidWZmZXIsIHRoaXMuX3NpZ25hbC5CWVRFU19QRVJfRUxFTUVOVCk7XG4gICAgdGhpcy5fbWFnaWMgPSAwO1xuICB9XG5cbiAgcHVibGljIGdldChzeW5jID0gZmFsc2UpOiBhbnkge1xuICAgIGlmIChzeW5jKSB7XG4gICAgICBBdG9taWNzLndhaXQodGhpcy5fc2lnbmFsLCBNQUdJQ19PRkZTRVQsIHRoaXMuX21hZ2ljKTtcbiAgICB9XG5cbiAgICB0aGlzLl9tYWdpYyA9IHRoaXMuX3NpZ25hbFswXTtcbiAgICBjb25zdCBsZW5ndGggPSB0aGlzLl9tYWdpYyA+PiA4O1xuICAgIGNvbnN0IGJ5dGVzID0gdGhpcy5fZGF0YS5zbGljZSgwLCBsZW5ndGgpO1xuICAgIGNvbnN0IG1lc3NhZ2UgPSAobmV3IFRleHREZWNvZGVyKCkpLmRlY29kZShieXRlcyk7XG5cbiAgICByZXR1cm4gSlNPTi5wYXJzZShtZXNzYWdlKTtcbiAgfVxuXG4gIHB1YmxpYyBzZXQoanNvbjogYW55LCBub3RpZnkgPSBmYWxzZSkge1xuICAgIGNvbnN0IG1lc3NhZ2UgPSBKU09OLnN0cmluZ2lmeShqc29uKTtcbiAgICBjb25zdCBieXRlcyA9IChuZXcgVGV4dEVuY29kZXIoKSkuZW5jb2RlKG1lc3NhZ2UpO1xuICAgIHRoaXMuX2RhdGEuc2V0KGJ5dGVzKTtcbiAgICB0aGlzLl9tYWdpYyA9IChieXRlcy5sZW5ndGggPDwgOCkgfCAoKHRoaXMuX21hZ2ljICsgMSkgJiAyNTUpO1xuICAgIHRoaXMuX3NpZ25hbFswXSA9IHRoaXMuX21hZ2ljO1xuXG4gICAgaWYgKG5vdGlmeSkge1xuICAgICAgQXRvbWljcy5ub3RpZnkodGhpcy5fc2lnbmFsLCBNQUdJQ19PRkZTRVQsIDEpO1xuICAgIH1cbiAgfVxufTtcblxufSAvLyBuYW1lc3BhY2UgTWVtb3J5VHJhbnNwb3J0XG4iLCIvKlxuICogTUlUIExpY2Vuc2VcbiAqXG4gKiBDb3B5cmlnaHQgKGMpIDIwMjUgIFl1cmlpIFlha3ViaW4gKHl1cmlpLnlha3ViaW5AZ21haWwuY29tKVxuICpcbiAqIFBlcm1pc3Npb24gaXMgZ3JhbnRlZCB0byB1c2UsIGNvcHksIG1vZGlmeSwgYW5kIGRpc3RyaWJ1dGUgdGhpcyBzb2Z0d2FyZVxuICogdW5kZXIgdGhlIE1JVCBMaWNlbnNlLiBTZWUgTElDRU5TRSBmaWxlIGZvciBkZXRhaWxzLlxuICovXG5cbmltcG9ydCB7IE1lc3NhZ2VQb3J0IH0gZnJvbSBcIm5vZGU6d29ya2VyX3RocmVhZHNcIjtcbmltcG9ydCB7IElNZXNzYWdlU2VuZGVyIH0gZnJvbSBcIkAvc2VydmVyL1RyYW5zcG9ydFwiO1xuaW1wb3J0IHsgTG9nZ2VyIH0gZnJvbSBcIkAvbG9nZ2VyXCI7XG5cbmNvbnN0IGxvZ2dlciA9IExvZ2dlci5jcmVhdGUoaW1wb3J0Lm1ldGEudXJsKTtcblxuZXhwb3J0IGNsYXNzIE1lc3NhZ2VQb3J0U2VuZGVyIGltcGxlbWVudHMgSU1lc3NhZ2VTZW5kZXIge1xuICBwcml2YXRlIF9tZXNzYWdlUG9ydDogTWVzc2FnZVBvcnQ7XG5cbiAgcHVibGljIGNvbnN0cnVjdG9yKG1lc3NhZ2VQb3J0OiBNZXNzYWdlUG9ydCkge1xuICAgIHRoaXMuX21lc3NhZ2VQb3J0ID0gbWVzc2FnZVBvcnQ7XG4gIH1cblxuICBwdWJsaWMgc2VuZE1lc3NhZ2UobWVzc2FnZTogYW55KTogdm9pZCB7XG4gICAgbG9nZ2VyLmRlYnVnKFwiPC0tXCIsIEpTT04uc3RyaW5naWZ5KG1lc3NhZ2UpKTtcbiAgICB0aGlzLl9tZXNzYWdlUG9ydC5wb3N0TWVzc2FnZShtZXNzYWdlKTtcbiAgfVxufTtcbiIsIi8qXG4gKiBNSVQgTGljZW5zZVxuICpcbiAqIENvcHlyaWdodCAoYykgMjAyNSAgWXVyaWkgWWFrdWJpbiAoeXVyaWkueWFrdWJpbkBnbWFpbC5jb20pXG4gKlxuICogUGVybWlzc2lvbiBpcyBncmFudGVkIHRvIHVzZSwgY29weSwgbW9kaWZ5LCBhbmQgZGlzdHJpYnV0ZSB0aGlzIHNvZnR3YXJlXG4gKiB1bmRlciB0aGUgTUlUIExpY2Vuc2UuIFNlZSBMSUNFTlNFIGZpbGUgZm9yIGRldGFpbHMuXG4gKi9cblxuaW1wb3J0IHsgSU1ha2VDb250ZXh0IH0gZnJvbSBcIkAvY29yZS9NYWtlSW50ZXJmYWNlc1wiO1xuaW1wb3J0IHsgTWFrZUNvbnRleHQgfSBmcm9tIFwiQC9jb3JlL0Jhc2VDb250ZXh0XCI7XG5pbXBvcnQgeyBJbnRlcmZhY2VTY3JpcHQgfSBmcm9tIFwiQC9jb3JlL0ludGVyZmFjZVNjcmlwdFwiO1xuaW1wb3J0IHsgQ3VzdG9tU2NyaXB0IH0gZnJvbSBcIkAvY29yZS9DdXN0b21TY3JpcHRcIjtcbmltcG9ydCB7IGNyZWF0ZVZhcmlhYmxlTWFwRm9yRGlyZWN0b3J5IH0gZnJvbSBcIkAvY29yZS9CYXNlQ29udGV4dFwiO1xuaW1wb3J0IHsgSnNvblJwY1JlcXVlc3RTeW5jIH0gZnJvbSBcIkAvc2VydmVyL0pzb25ScGNSZXF1ZXN0U3luY1wiO1xuaW1wb3J0IHsgTUFJTk5PREVfTE9BREpTT04gfSBmcm9tIFwiQC9zZXJ2ZXIvUmVtb3RlTWV0aG9kc1wiO1xuaW1wb3J0IHsgTUFJTk5PREVfRVhFQ1VURVNDUklQVCB9IGZyb20gXCJAL3NlcnZlci9SZW1vdGVNZXRob2RzXCI7XG5pbXBvcnQgeyBNQUlOTk9ERV9TVEFSVE1BS0VTQ1JJUFQgfSBmcm9tIFwiQC9zZXJ2ZXIvUmVtb3RlTWV0aG9kc1wiO1xuaW1wb3J0IHsgTUFJTk5PREVfQUREQ1VTVE9NU0NSSVBUIH0gZnJvbSBcIkAvc2VydmVyL1JlbW90ZU1ldGhvZHNcIjtcbmltcG9ydCB7IExvZ2dlciB9IGZyb20gXCJAL2xvZ2dlclwiO1xuaW1wb3J0IHsgU2NvcGVIZWxwZXIsIFZhcmlhYmxlTWFwLCBWYXJpYW50TWFwIH0gZnJvbSBcIkAvY29yZS9TY29wZVwiO1xuaW1wb3J0IHsgQ1VTVE9NX1ZBUklBQkxFX0dST1VQIH0gZnJvbSBcIkAvQ29uc3RhbnRzXCI7XG5pbXBvcnQgeyBBYnNvbHV0ZVBhdGggfSBmcm9tIFwiQC9jb3JlL0Fic29sdXRlUGF0aFwiO1xuXG5jb25zdCBsb2dnZXIgPSBMb2dnZXIuY3JlYXRlKGltcG9ydC5tZXRhLnVybCk7XG5cbmV4cG9ydCBjbGFzcyBSZW1vdGVNYWtlQ29udGV4dCBleHRlbmRzIE1ha2VDb250ZXh0IGltcGxlbWVudHMgSU1ha2VDb250ZXh0IHtcbiAgcHJpdmF0ZSBfdHJhbnNwb3J0OiBKc29uUnBjUmVxdWVzdFN5bmM7XG5cbiAgcHVibGljIGNvbnN0cnVjdG9yKHNjb3BlOiBWYXJpYWJsZU1hcCwgdHJhbnNwb3J0OiBKc29uUnBjUmVxdWVzdFN5bmMpIHtcbiAgICBzdXBlcihzY29wZSk7XG4gICAgdGhpcy5fdHJhbnNwb3J0ID0gdHJhbnNwb3J0O1xuICB9XG5cbiAgcHVibGljIGV4ZWN1dGVTY3JpcHQoc2NyaXB0OiBhbnksIHBhcmFtczogYW55KTogYW55IHtcbiAgICBsb2dnZXIuZGVidWcoXCJSZW1vdGVNYWtlQ29udGV4dC5leGVjdXRlU2NyaXB0KFwiLCBzY3JpcHQsIHBhcmFtcywgXCIpXCIpO1xuICAgIGNvbnN0IG5ld1ZhcmlhYmxlTWFwID0gU2NvcGVIZWxwZXIuY2xvbmVWYXJpYWJsZU1hcCh0aGlzLl9zY29wZSk7XG4gICAgcGFyYW1zICYmIFNjb3BlSGVscGVyLmV4dGVuZFZhcmlhYmxlTWFwQnlWYWx1ZXMobmV3VmFyaWFibGVNYXAsIFwiXCIsIHBhcmFtcyk7XG4gICAgY29uc3Qgc2NyaXB0RmlsZSA9IFNjb3BlSGVscGVyLmdldChuZXdWYXJpYWJsZU1hcCwgXCJTT1VSQ0VfRElSXCIpLnJlc29sdmUoc2NyaXB0KTtcbiAgICBTY29wZUhlbHBlci5zZXQobmV3VmFyaWFibGVNYXAsIFwiU0NSSVBUX0ZJTEVcIiwgc2NyaXB0RmlsZSk7XG4gICAgU2NvcGVIZWxwZXIuc2V0KG5ld1ZhcmlhYmxlTWFwLCBcIlNDUklQVF9ESVJcIiwgc2NyaXB0RmlsZS5kaXJuYW1lKCkpO1xuICAgIHJldHVybiB0aGlzLl90cmFuc3BvcnQucmVxdWVzdFN5bmMoTUFJTk5PREVfRVhFQ1VURVNDUklQVCwgU2NvcGVIZWxwZXIudG9KU09OKG5ld1ZhcmlhYmxlTWFwKSk7XG4gIH1cbiAgXG4gIHB1YmxpYyBhZGRDYWNoZVZhcmlhYmxlcyhwYXJhbXM6IHN0cmluZyB8IFZhcmlhbnRNYXApOiB2b2lkIHtcbiAgICBsb2dnZXIuZGVidWcoXCJSZW1vdGVNYWtlQ29udGV4dC5hZGRDYWNoZVZhcmlhYmxlcyhcIiwgcGFyYW1zLCBcIilcIik7XG4gICAgbGV0IHZhcmlhYmxlcyA9IHBhcmFtcztcbiAgICBpZiAodHlwZW9mIHBhcmFtcyA9PT0gXCJzdHJpbmdcIikge1xuICAgICAgY29uc3QgZmlsZW5hbWUgPSBTY29wZUhlbHBlci5nZXQodGhpcy5fc2NvcGUsIFwiU09VUkNFX0RJUlwiKS5yZXNvbHZlKHBhcmFtcykudG9TdHJpbmcoKTtcbiAgICAgIHZhcmlhYmxlcyA9IHRoaXMuX3RyYW5zcG9ydC5yZXF1ZXN0U3luYyhNQUlOTk9ERV9MT0FESlNPTiwgZmlsZW5hbWUpO1xuICAgIH1cbiAgICBTY29wZUhlbHBlci5kZWZpbmVWYXJpYWJsZXNJblZhcmlhYmxlTWFwKHRoaXMuX3Njb3BlLCBDVVNUT01fVkFSSUFCTEVfR1JPVVAsIHZhcmlhYmxlcyk7XG4gIH1cblxuICBwdWJsaWMgYWRkU3ViZGlyZWN0b3J5KHNvdXJjZURpcjogc3RyaW5nIHwgQWJzb2x1dGVQYXRoLCBiaW5hcnlEaXI/OiBzdHJpbmcgfCBBYnNvbHV0ZVBhdGgpOiB2b2lkIHtcbiAgICBsb2dnZXIuZGVidWcoXCJSZW1vdGVNYWtlQ29udGV4dC5hZGRTdWJkaXJlY3RvcnkoXCIsIHNvdXJjZURpciwgYmluYXJ5RGlyLCBcIilcIik7XG4gICAgY29uc3QgbmV3VmFyaWFibGVNYXAgPSBjcmVhdGVWYXJpYWJsZU1hcEZvckRpcmVjdG9yeSh0aGlzLl9zY29wZSwgc291cmNlRGlyLCBiaW5hcnlEaXIpO1xuICAgIHRoaXMuX3RyYW5zcG9ydC5yZXF1ZXN0U3luYyhNQUlOTk9ERV9TVEFSVE1BS0VTQ1JJUFQsIFNjb3BlSGVscGVyLnRvSlNPTihuZXdWYXJpYWJsZU1hcCkpO1xuICB9XG5cbiAgcHVibGljIGFkZEN1c3RvbVNjcmlwdChzY3JpcHQ6IGFueSwgcGFyYW1zOiBhbnkpOiBDdXN0b21TY3JpcHQge1xuICAgIGxvZ2dlci5kZWJ1ZyhcIlJlbW90ZU1ha2VDb250ZXh0LmFkZEN1c3RvbVNjcmlwdChcIiwgc2NyaXB0LCBwYXJhbXMsIFwiKVwiKTtcbiAgICBjb25zdCBuZXdWYXJpYWJsZU1hcCA9IFNjb3BlSGVscGVyLmNsb25lVmFyaWFibGVNYXAodGhpcy5fc2NvcGUpO1xuICAgIFNjb3BlSGVscGVyLmV4dGVuZFZhcmlhYmxlTWFwQnlWYWx1ZXMobmV3VmFyaWFibGVNYXAsIENVU1RPTV9WQVJJQUJMRV9HUk9VUCwgcGFyYW1zKTtcbiAgICBTY29wZUhlbHBlci5zZXQobmV3VmFyaWFibGVNYXAsIFwiU0NSSVBUX01PRFVMRVwiLCBzY3JpcHQpO1xuICAgIHJldHVybiB0aGlzLl90cmFuc3BvcnQucmVxdWVzdFN5bmMoTUFJTk5PREVfQUREQ1VTVE9NU0NSSVBULCBTY29wZUhlbHBlci50b0pTT04obmV3VmFyaWFibGVNYXApKTtcbiAgfVxuXG4gIHB1YmxpYyBzY3JpcHQobmFtZTogc3RyaW5nKTogSW50ZXJmYWNlU2NyaXB0IHtcbiAgICB0aHJvdyBuZXcgRXJyb3IoXCJOb3QgSW1wbGVtZW50ZWRcIik7XG4gIH1cbiAgXG4gIHB1YmxpYyBpbnN0YWxsKHZhbHVlOiBhbnksIHBhcmFtczogYW55KTogdm9pZCB7XG4gICAgdGhyb3cgbmV3IEVycm9yKFwiTm90IEltcGxlbWVudGVkXCIpO1xuICB9XG59O1xuIiwiLypcbiAqIE1JVCBMaWNlbnNlXG4gKlxuICogQ29weXJpZ2h0IChjKSAyMDI1ICBZdXJpaSBZYWt1YmluICh5dXJpaS55YWt1YmluQGdtYWlsLmNvbSlcbiAqXG4gKiBQZXJtaXNzaW9uIGlzIGdyYW50ZWQgdG8gdXNlLCBjb3B5LCBtb2RpZnksIGFuZCBkaXN0cmlidXRlIHRoaXMgc29mdHdhcmVcbiAqIHVuZGVyIHRoZSBNSVQgTGljZW5zZS4gU2VlIExJQ0VOU0UgZmlsZSBmb3IgZGV0YWlscy5cbiAqL1xuXG5leHBvcnQgY29uc3QgV09SS0VSTk9ERV9TVEFSVE1BS0VTQ1JJUFQgPSBcIldvcmtlck5vZGUuc3RhcnRNYWtlU2NyaXB0XCI7XG5cbmV4cG9ydCBjb25zdCBNQUlOTk9ERV9MT0FESlNPTiA9IFwiTWFpbk5vZGUubG9hZEpTT05cIjtcbmV4cG9ydCBjb25zdCBNQUlOTk9ERV9FWEVDVVRFU0NSSVBUID0gXCJNYWluTm9kZS5leGVjdXRlU2NyaXB0XCI7XG5leHBvcnQgY29uc3QgTUFJTk5PREVfU1RBUlRNQUtFU0NSSVBUID0gXCJNYWluTm9kZS5zdGFydE1ha2VTY3JpcHRcIjtcbmV4cG9ydCBjb25zdCBNQUlOTk9ERV9BRERDVVNUT01TQ1JJUFQgPSBcIk1haW5Ob2RlLmFkZEN1c3RvbVNjcmlwdFwiO1xuZXhwb3J0IGNvbnN0IE1BSU5OT0RFX0FEREVYRUNVVEFCTEUgPSBcIk1haW5Ob2RlLmFkZEV4ZWN1dGFibGVcIjtcbmV4cG9ydCBjb25zdCBNQUlOTk9ERV9BRERTVEFUSUNMSUJSQVJZID0gXCJNYWluTm9kZS5hZGRTdGF0aWNMaWJyYXJ5XCI7XG5leHBvcnQgY29uc3QgTUFJTk5PREVfVEFSR0VUU09VUkNFUyA9IFwiTWFpbk5vZGUudGFyZ2V0U291cmNlc1wiO1xuIiwiLypcbiAqIE1JVCBMaWNlbnNlXG4gKlxuICogQ29weXJpZ2h0IChjKSAyMDI1ICBZdXJpaSBZYWt1YmluICh5dXJpaS55YWt1YmluQGdtYWlsLmNvbSlcbiAqXG4gKiBQZXJtaXNzaW9uIGlzIGdyYW50ZWQgdG8gdXNlLCBjb3B5LCBtb2RpZnksIGFuZCBkaXN0cmlidXRlIHRoaXMgc29mdHdhcmVcbiAqIHVuZGVyIHRoZSBNSVQgTGljZW5zZS4gU2VlIExJQ0VOU0UgZmlsZSBmb3IgZGV0YWlscy5cbiAqL1xuXG5leHBvcnQgY29uc3QgSlNPTlJQQ19WRVJTSU9OID0gXCIyLjBcIjtcbmV4cG9ydCBpbnRlcmZhY2UgSU1lc3NhZ2VTZW5kZXIge1xuICBzZW5kTWVzc2FnZShtZXNzYWdlOiBhbnkpOiB2b2lkO1xufTtcblxuZXhwb3J0IGludGVyZmFjZSBJTWVzc2FnZUVtaXR0ZXIge1xuICBlbWl0TWVzc2FnZShzZW5kZXI6IElNZXNzYWdlU2VuZGVyLCBtZXNzYWdlOiBhbnkpOiB2b2lkO1xufTtcblxuZXhwb3J0IGludGVyZmFjZSBJUmVxdWVzdFN5bmMge1xuICByZXF1ZXN0U3luYyhkYXRhOiBhbnkpOiBhbnk7XG59O1xuXG5leHBvcnQgaW50ZXJmYWNlIElKc29uUnBjUmVjaXZlciB7XG4gIG9uUmVxdWVzdChtZXRob2Q6IHN0cmluZywgaWQ6IG51bWJlciwgcGFyYW1zPzogYW55KTogdm9pZDtcbiAgb25SZXN1bHQocmVzdWx0OiBhbnksIGlkOiBudW1iZXIpOiB2b2lkO1xuICBvbkVycm9yKGVycm9yOiBvYmplY3QsIGlkOiBudW1iZXIgfCBudWxsKTogdm9pZDtcbiAgb25Ob3RpZmljYXRpb24obWV0aG9kOiBzdHJpbmcsIHBhcmFtcz86IGFueSk6IHZvaWQ7XG59O1xuXG5leHBvcnQgaW50ZXJmYWNlIElKc29uUnBjU2VuZGVyIHtcbiAgLy8gc2VuZE1ldGhvZChtZXRob2Q6IHN0cmluZywgcGFyYW1zPzogYW55LCBjYWxsYmFjazogKCkpOiB2b2lkO1xufTtcblxuZXhwb3J0IGludGVyZmFjZSBKc29uUnBjRGF0YSB7XG4gIGpzb25ycGM6IHN0cmluZztcbiAgbWV0aG9kPzogc3RyaW5nO1xuICBwYXJhbXM/OiBhbnk7XG4gIGlkPzogbnVtYmVyO1xuICBlcnJvcj86IHtcbiAgICBjb2RlOiBudW1iZXIsXG4gICAgbWVzc2FnZTogc3RyaW5nLFxuICAgIGRhdGE/OiBhbnksXG4gIH0sXG4gIHJlc3VsdD86IGFueTtcbn07XG5cbmV4cG9ydCB0eXBlIEpzb25ScGNSZXF1ZXN0SGFuZGxlciA9IChyZXF1ZXN0OiBJSnNvblJwY1JlcXVlc3QsIHJlc3BvbnNlOiBJSnNvblJwY1Jlc3BvbnNlKSA9PiB2b2lkO1xuZXhwb3J0IHR5cGUgSnNvblJwY0NhbGxiYWNrID0gKHBhcmFtczogYW55KSA9PiBhbnk7XG5cbmV4cG9ydCBpbnRlcmZhY2UgSUpzb25ScGNSZXF1ZXN0IHtcbiAgZ2V0IHBhcmFtcygpOiBhbnk7XG59O1xuXG5leHBvcnQgaW50ZXJmYWNlIElKc29uUnBjUmVzcG9uc2Uge1xuICBzZW5kUmVzdWx0KGpzb246IGFueSk6IHZvaWQ7XG59O1xuIiwiLypcbiAqIE1JVCBMaWNlbnNlXG4gKlxuICogQ29weXJpZ2h0IChjKSAyMDI1ICBZdXJpaSBZYWt1YmluICh5dXJpaS55YWt1YmluQGdtYWlsLmNvbSlcbiAqXG4gKiBQZXJtaXNzaW9uIGlzIGdyYW50ZWQgdG8gdXNlLCBjb3B5LCBtb2RpZnksIGFuZCBkaXN0cmlidXRlIHRoaXMgc29mdHdhcmVcbiAqIHVuZGVyIHRoZSBNSVQgTGljZW5zZS4gU2VlIExJQ0VOU0UgZmlsZSBmb3IgZGV0YWlscy5cbiAqL1xuXG5pbXBvcnQgeyBJTWVzc2FnZVNlbmRlciwgSU1lc3NhZ2VFbWl0dGVyIH0gZnJvbSBcIkAvc2VydmVyL1RyYW5zcG9ydFwiO1xuaW1wb3J0IHsgTWVtb3J5VHJhbnNwb3J0IH0gZnJvbSBcIkAvc2VydmVyL01lbW9yeVRyYW5zcG9ydFwiO1xuaW1wb3J0IHsgSnNvblJwY1NlcnZlciB9IGZyb20gXCJAL3NlcnZlci9Kc29uUnBjU2VydmVyXCI7XG5pbXBvcnQgeyBXb3JrZXJOb2RlIH0gZnJvbSBcIkAvc2VydmVyL1dvcmtlck5vZGVcIjtcbmltcG9ydCB7IFdPUktFUk5PREVfU1RBUlRNQUtFU0NSSVBUIH0gZnJvbSBcIkAvc2VydmVyL1JlbW90ZU1ldGhvZHNcIjtcbmltcG9ydCB7IExvZ2dlciB9IGZyb20gXCJAL2xvZ2dlclwiO1xuXG5jb25zdCBsb2dnZXIgPSBMb2dnZXIuY3JlYXRlKGltcG9ydC5tZXRhLnVybCk7XG5cbmV4cG9ydCBjbGFzcyBXb3JrZXJMb29wZXIgaW1wbGVtZW50cyBJTWVzc2FnZUVtaXR0ZXIge1xuICBwcml2YXRlIF9qc29ucnBjU2VydmVyOiBKc29uUnBjU2VydmVyO1xuXG4gIHB1YmxpYyBjb25zdHJ1Y3RvcihzZW5kZXI6IElNZXNzYWdlU2VuZGVyKSB7XG4gICAgdGhpcy5fanNvbnJwY1NlcnZlciA9IG5ldyBKc29uUnBjU2VydmVyO1xuXG4gICAgY29uc3QgYnVmZmVyID0gbmV3IFNoYXJlZEFycmF5QnVmZmVyKDB4ODAwMCk7XG4gICAgY29uc3QgdHJhbnNwb3J0ID0gbmV3IE1lbW9yeVRyYW5zcG9ydChzZW5kZXIsIGJ1ZmZlcik7XG5cbiAgICBjb25zdCB3b3JrZXJOb2RlID0gbmV3IFdvcmtlck5vZGUodHJhbnNwb3J0KTtcbiAgICB0aGlzLl9qc29ucnBjU2VydmVyLnJlZ2lzdGVyQ2FsbGJhY2soV09SS0VSTk9ERV9TVEFSVE1BS0VTQ1JJUFQsIHBhcmFtcyA9PiB3b3JrZXJOb2RlLmV4ZWNNYWtlU2NyaXB0KHBhcmFtcykpO1xuICB9XG5cbiAgcHVibGljIGVtaXRNZXNzYWdlKHNlbmRlcjogSU1lc3NhZ2VTZW5kZXIsIG1lc3NhZ2U6IGFueSk6IHZvaWQge1xuICAgIHJldHVybiB0aGlzLl9qc29ucnBjU2VydmVyLmVtaXRNZXNzYWdlKHNlbmRlciwgbWVzc2FnZSk7XG4gIH1cbn07XG4iLCIvKlxuICogTUlUIExpY2Vuc2VcbiAqXG4gKiBDb3B5cmlnaHQgKGMpIDIwMjUgIFl1cmlpIFlha3ViaW4gKHl1cmlpLnlha3ViaW5AZ21haWwuY29tKVxuICpcbiAqIFBlcm1pc3Npb24gaXMgZ3JhbnRlZCB0byB1c2UsIGNvcHksIG1vZGlmeSwgYW5kIGRpc3RyaWJ1dGUgdGhpcyBzb2Z0d2FyZVxuICogdW5kZXIgdGhlIE1JVCBMaWNlbnNlLiBTZWUgTElDRU5TRSBmaWxlIGZvciBkZXRhaWxzLlxuICovXG5cbmltcG9ydCB7IElSZXF1ZXN0U3luYyB9IGZyb20gXCJAL3NlcnZlci9UcmFuc3BvcnRcIjtcbmltcG9ydCB7IEpzb25ScGNSZXF1ZXN0U3luYyB9IGZyb20gXCJAL3NlcnZlci9Kc29uUnBjUmVxdWVzdFN5bmNcIjtcbmltcG9ydCB7IFJlbW90ZU1ha2VDb250ZXh0IH0gZnJvbSBcIkAvc2VydmVyL1JlbW90ZU1ha2VDb250ZXh0XCI7XG5pbXBvcnQgeyBVc2VyTWFrZUNvbnRleHQgfSBmcm9tIFwiQC9jb3JlL1VzZXJNYWtlQ29udGV4dFwiO1xuaW1wb3J0IHsgcGVyZm9ybUNvbnRleHQgfSBmcm9tIFwiQC9jb3JlL0Jhc2VDb250ZXh0XCI7XG5pbXBvcnQgeyBTY29wZUhlbHBlciB9IGZyb20gXCJAL2NvcmUvU2NvcGVcIjtcblxuZXhwb3J0IGNsYXNzIFdvcmtlck5vZGUge1xuICBwcml2YXRlIF90cmFuc3BvcnQ6IEpzb25ScGNSZXF1ZXN0U3luYztcblxuICBwdWJsaWMgY29uc3RydWN0b3IocmVxdWVzdFN5bmM6IElSZXF1ZXN0U3luYykge1xuICAgIHRoaXMuX3RyYW5zcG9ydCA9IG5ldyBKc29uUnBjUmVxdWVzdFN5bmMocmVxdWVzdFN5bmMpO1xuICB9XG5cbiAgcHVibGljIGFzeW5jIGV4ZWNNYWtlU2NyaXB0KHBhcmFtczogYW55KTogUHJvbWlzZTx2b2lkPiB7XG4gICAgY29uc3QgdmFyaWFibGVNYXAgPSBTY29wZUhlbHBlci5mcm9tSlNPTihwYXJhbXMpO1xuXG4gICAgY29uc3QgbWsgPSBVc2VyTWFrZUNvbnRleHQuY3JlYXRlKG5ldyBSZW1vdGVNYWtlQ29udGV4dCh2YXJpYWJsZU1hcCwgdGhpcy5fdHJhbnNwb3J0KSwgdmFyaWFibGVNYXApO1xuICAgIGF3YWl0IHBlcmZvcm1Db250ZXh0KG1rKTtcbiAgfVxufTtcbiIsIi8qXG4gKiBNSVQgTGljZW5zZVxuICpcbiAqIENvcHlyaWdodCAoYykgMjAyNSAgWXVyaWkgWWFrdWJpbiAoeXVyaWkueWFrdWJpbkBnbWFpbC5jb20pXG4gKlxuICogUGVybWlzc2lvbiBpcyBncmFudGVkIHRvIHVzZSwgY29weSwgbW9kaWZ5LCBhbmQgZGlzdHJpYnV0ZSB0aGlzIHNvZnR3YXJlXG4gKiB1bmRlciB0aGUgTUlUIExpY2Vuc2UuIFNlZSBMSUNFTlNFIGZpbGUgZm9yIGRldGFpbHMuXG4gKi9cblxuaW1wb3J0IHsgV29ya2VyIH0gZnJvbSBcIm5vZGU6d29ya2VyX3RocmVhZHNcIjtcbmltcG9ydCB7IElNZXNzYWdlU2VuZGVyIH0gZnJvbSBcIkAvc2VydmVyL1RyYW5zcG9ydFwiO1xuaW1wb3J0IHsgTG9nZ2VyIH0gZnJvbSBcIkAvbG9nZ2VyXCI7XG5cbmNvbnN0IGxvZ2dlciA9IExvZ2dlci5jcmVhdGUoaW1wb3J0Lm1ldGEudXJsKTtcblxuZXhwb3J0IGNsYXNzIFdvcmtlclNlbmRlciBpbXBsZW1lbnRzIElNZXNzYWdlU2VuZGVyIHtcbiAgcHJpdmF0ZSBfd29ya2VyOiBXb3JrZXI7XG5cbiAgcHVibGljIGNvbnN0cnVjdG9yKHdvcmtlcjogV29ya2VyKSB7XG4gICAgdGhpcy5fd29ya2VyID0gd29ya2VyO1xuICB9XG5cbiAgcHVibGljIHNlbmRNZXNzYWdlKG1lc3NhZ2U6IGFueSk6IHZvaWQge1xuICAgIGxvZ2dlci5kZWJ1ZyhcIjwtLVwiLCBtZXNzYWdlKTtcbiAgICB0aGlzLl93b3JrZXIucG9zdE1lc3NhZ2UobWVzc2FnZSk7XG4gIH1cbn07XG4iLCIvKlxuICogTUlUIExpY2Vuc2VcbiAqXG4gKiBDb3B5cmlnaHQgKGMpIDIwMjUgIFl1cmlpIFlha3ViaW4gKHl1cmlpLnlha3ViaW5AZ21haWwuY29tKVxuICpcbiAqIFBlcm1pc3Npb24gaXMgZ3JhbnRlZCB0byB1c2UsIGNvcHksIG1vZGlmeSwgYW5kIGRpc3RyaWJ1dGUgdGhpcyBzb2Z0d2FyZVxuICogdW5kZXIgdGhlIE1JVCBMaWNlbnNlLiBTZWUgTElDRU5TRSBmaWxlIGZvciBkZXRhaWxzLlxuICovXG5cbmV4cG9ydCBuYW1lc3BhY2UgQXJncyB7XG5cbmZ1bmN0aW9uIHRvT3B0aW9uS2V5KG5hbWU6IHN0cmluZykge1xuICBpZiAoIW5hbWUuc3RhcnRzV2l0aChcIi0tXCIpKVxuICAgIHJldHVybiBudWxsO1xuXG4gIG5hbWUgPSBuYW1lLnN1YnN0cmluZygyKS50b0xvd2VyQ2FzZSgpO1xuICBpZiAoIW5hbWUubGVuZ3RoKVxuICAgIHJldHVybiBudWxsO1xuXG4gIGxldCBrZXkgPSBuYW1lLmNoYXJBdCgwKTtcbiAgaWYgKCFrZXkubWF0Y2goL1thLXpdLykpXG4gICAgcmV0dXJuIG51bGw7XG5cbiAgbGV0IGh5cGhlbiA9IDA7XG4gIGZvciAobGV0IGkgPSAxOyBpIDwgbmFtZS5sZW5ndGg7IGkrKykge1xuICAgIGNvbnN0IGNoID0gbmFtZS5jaGFyQXQoaSk7XG4gICAgaWYgKGNoLm1hdGNoKC9bYS16MC05XS8pKSB7XG4gICAgICBrZXkgKz0gKGh5cGhlbiA/IGNoLnRvVXBwZXJDYXNlKCkgOiBjaClcbiAgICAgIGh5cGhlbiA9IDA7XG4gICAgfVxuICAgIGVsc2UgaWYgKGNoID09IFwiLVwiKSB7XG4gICAgICBpZiAoKytoeXBoZW4gPiAxKVxuICAgICAgICByZXR1cm4gbnVsbDtcbiAgICB9XG4gIH1cblxuICByZXR1cm4gaHlwaGVuID8gbnVsbCA6IGtleTtcbn1cblxuZXhwb3J0IGZ1bmN0aW9uIHRvT2JqZWN0KGFyZ3M6IHN0cmluZ1tdKTogb2JqZWN0IHtcbiAgY29uc3QgcmVzdWx0OiBhbnkgPSB7fTtcblxuICBsZXQgbGFzdEtleSA9IG51bGw7XG4gIGZvciAoY29uc3QgaXRlciBvZiBhcmdzKSB7XG4gICAgaWYgKGl0ZXIuc3RhcnRzV2l0aChcIi0tXCIpKSB7XG4gICAgICBjb25zdCBrZXkgPSB0b09wdGlvbktleShpdGVyKTtcbiAgICAgIGlmICgha2V5KVxuICAgICAgICB0aHJvdyBFcnJvcihgT3B0aW9uICR7aXRlcn0gaXMgbm90IHN1cHBvcnRlZGApO1xuICAgICAgaWYgKHJlc3VsdC5oYXNPd25Qcm9wZXJ0eShrZXkpKVxuICAgICAgICB0aHJvdyBFcnJvcihgQ2Fubm90IHNwZWNpZnkgdGhlIHNhbWUgb3B0aW9uICcke2l0ZXJ9JyBtb3JlIHRoYW4gb25jZWApO1xuICAgICAgbGFzdEtleSA9IGtleTtcbiAgICAgIHJlc3VsdFtrZXldID0gdHJ1ZTtcbiAgICB9XG4gICAgZWxzZSBpZiAobGFzdEtleSkge1xuICAgICAgY29uc3QgdmFsdWUgPSByZXN1bHRbbGFzdEtleV07XG4gICAgICBpZiAodHlwZW9mIHZhbHVlID09PSAnYm9vbGVhbicpXG4gICAgICAgIHJlc3VsdFtsYXN0S2V5XSA9IGl0ZXI7XG4gICAgICBlbHNlIGlmICh0eXBlb2YgdmFsdWUgPT09ICdzdHJpbmcnKVxuICAgICAgICByZXN1bHRbbGFzdEtleV0gPSBbIHZhbHVlLCBpdGVyIF07XG4gICAgICBlbHNlXG4gICAgICAgIHZhbHVlLnB1c2goaXRlcik7XG4gICAgfVxuICAgIGVsc2Uge1xuICAgICAgdGhyb3cgRXJyb3IoYE5lZWQgdG8gc3BlY2lmeSB0aGUgb3B0aW9uIG5hbWUgYmVmb3JlICcke2l0ZXJ9JyBwYXJhbWV0ZXJgKTtcbiAgICB9XG4gIH1cblxuICByZXR1cm4gcmVzdWx0O1xufVxuXG59IC8vIG5hbWVzcGFjZSBBcmdzXG4iLCIvKlxuICogTUlUIExpY2Vuc2VcbiAqXG4gKiBDb3B5cmlnaHQgKGMpIDIwMjUgIFl1cmlpIFlha3ViaW4gKHl1cmlpLnlha3ViaW5AZ21haWwuY29tKVxuICpcbiAqIFBlcm1pc3Npb24gaXMgZ3JhbnRlZCB0byB1c2UsIGNvcHksIG1vZGlmeSwgYW5kIGRpc3RyaWJ1dGUgdGhpcyBzb2Z0d2FyZVxuICogdW5kZXIgdGhlIE1JVCBMaWNlbnNlLiBTZWUgTElDRU5TRSBmaWxlIGZvciBkZXRhaWxzLlxuICovXG5cbmltcG9ydCBwYXRoIGZyb20gXCJub2RlOnBhdGhcIjtcbmltcG9ydCBmcyBmcm9tIFwibm9kZTpmc1wiO1xuaW1wb3J0IHsgc3Bhd24gfSBmcm9tIFwibm9kZTpjaGlsZF9wcm9jZXNzXCI7XG5pbXBvcnQgeyBMb2dnZXIgfSBmcm9tIFwiQC9sb2dnZXJcIjtcblxuY29uc3QgbG9nZ2VyID0gTG9nZ2VyLmNyZWF0ZShpbXBvcnQubWV0YS51cmwpO1xuXG50eXBlIFJlc3VsdCA9IHtcbiAgc3RhdHVzOiBudW1iZXI7XG59O1xuXG5leHBvcnQgZnVuY3Rpb24gc3Bhd25Bc3luYyhjb21tYW5kOiBzdHJpbmcsIGFyZ3M6IHN0cmluZ1tdLCBvcHRpb25zPzogYW55KTogUHJvbWlzZTxSZXN1bHQ+IHtcbiAgbGV0IGZkID0gbnVsbDtcbiAgbGV0IHZlcmJvc2UgPSBmYWxzZTtcbiAgaWYgKG9wdGlvbnMgJiYgb3B0aW9ucy5leHRyYSkge1xuICAgIGlmIChvcHRpb25zLmV4dHJhLnZlcmJvc2UpXG4gICAgICB2ZXJib3NlID0gdHJ1ZTtcbiAgICBpZiAob3B0aW9ucy5leHRyYS5vdXRwdXQpIHtcbiAgICAgIGxldCBsb2dmaWxlID0gb3B0aW9ucy5leHRyYS5vdXRwdXQ7XG4gICAgICBpZiAoIXBhdGguaXNBYnNvbHV0ZShsb2dmaWxlKSAmJiBvcHRpb25zLmN3ZCkge1xuICAgICAgICBsb2dmaWxlID0gcGF0aC5yZXNvbHZlKG9wdGlvbnMuY3dkLCBsb2dmaWxlKTtcbiAgICAgIH1cbiAgICAgIGZkID0gZnMub3BlblN5bmMobG9nZmlsZSwgXCJ3K1wiLCAwbzY2Nik7XG4gICAgfVxuICB9XG4gIHJldHVybiBuZXcgUHJvbWlzZSgocmVzb2x2ZSwgcmVqZWN0KSA9PiB7XG4gICAgaWYgKGZkIHx8IHZlcmJvc2UpIHtcbiAgICAgIHZlcmJvc2UgJiYgbG9nZ2VyLm5vdGljZShbIHBhdGguYmFzZW5hbWUoY29tbWFuZCksIC4uLmFyZ3MgXS5qb2luKFwiIFwiKSk7XG4gICAgICBmZCAmJiBmcy53cml0ZVN5bmMoZmQsIEpTT04uc3RyaW5naWZ5KHtjb21tYW5kLCBhcmdzLCBvcHRpb25zIH0sIG51bGwsIDIpICsgXCJcXG5cIik7XG4gICAgfVxuICAgIGNvbnN0IGV4ZWMgPSBzcGF3bihjb21tYW5kLCBhcmdzLCBvcHRpb25zKTtcbiAgICBleGVjLnN0ZG91dC5vbihcImRhdGFcIiwgKGRhdGEpID0+IHtcbiAgICAgIHByb2Nlc3Muc3Rkb3V0LndyaXRlKGRhdGEpO1xuICAgICAgZmQgJiYgZnMud3JpdGVTeW5jKGZkLCBkYXRhKTtcbiAgICB9KTtcbiAgICBleGVjLnN0ZGVyci5vbihcImRhdGFcIiwgKGRhdGEpID0+IHtcbiAgICAgIHByb2Nlc3Muc3RkZXJyLndyaXRlKGRhdGEpO1xuICAgICAgZmQgJiYgZnMud3JpdGVTeW5jKGZkLCBkYXRhKTtcbiAgICB9KTtcbiAgICBleGVjLm9uKFwiY2xvc2VcIiwgKHN0YXR1czogbnVtYmVyKSA9PiB7XG4gICAgICBmZCAmJiBmcy5jbG9zZVN5bmMoZmQpO1xuICAgICAgcmVzb2x2ZSh7c3RhdHVzfSk7XG4gICAgfSk7XG4gIH0pO1xufVxuIiwiLypcbiAqIE1JVCBMaWNlbnNlXG4gKlxuICogQ29weXJpZ2h0IChjKSAyMDI1ICBZdXJpaSBZYWt1YmluICh5dXJpaS55YWt1YmluQGdtYWlsLmNvbSlcbiAqXG4gKiBQZXJtaXNzaW9uIGlzIGdyYW50ZWQgdG8gdXNlLCBjb3B5LCBtb2RpZnksIGFuZCBkaXN0cmlidXRlIHRoaXMgc29mdHdhcmVcbiAqIHVuZGVyIHRoZSBNSVQgTGljZW5zZS4gU2VlIExJQ0VOU0UgZmlsZSBmb3IgZGV0YWlscy5cbiAqL1xuXG5pbXBvcnQgZnMgZnJvbSBcIm5vZGU6ZnNcIjtcbmltcG9ydCBwYXRoIGZyb20gXCJub2RlOnBhdGhcIjtcbmltcG9ydCB1cmwgZnJvbSBcIm5vZGU6dXJsXCI7XG5cbmltcG9ydCB7IEZJTEVfU0NIRU1FLCBJTVBPUlRfU0NIRU1FLCBIVFRQX1NDSEVNRSwgSFRUUFNfU0NIRU1FIH0gZnJvbSBcIkAvdXRpbHMvVXJsU2NoZW1lXCI7XG5pbXBvcnQgeyByZXF1aXJlUmVzb2x2ZSB9IGZyb20gXCJAL3V0aWxzL01vZHVsZVwiO1xuXG5leHBvcnQgYXN5bmMgZnVuY3Rpb24gcGF0aEV4aXN0cyhwYXRoOiBzdHJpbmcpIHtcbiAgdHJ5IHtcbiAgICByZXR1cm4gISEoYXdhaXQgZnMucHJvbWlzZXMuc3RhdChwYXRoKSk7XG4gIH0gY2F0Y2gge1xuICAgIHJldHVybiBmYWxzZTtcbiAgfVxufVxuXG5leHBvcnQgZnVuY3Rpb24gcGF0aEV4aXN0c1N5bmMocGF0aDogc3RyaW5nKSB7XG4gIHRyeSB7XG4gICAgcmV0dXJuICEhZnMuc3RhdFN5bmMocGF0aCk7XG4gIH0gY2F0Y2gge1xuICAgIHJldHVybiBmYWxzZTtcbiAgfVxufVxuXG5leHBvcnQgYXN5bmMgZnVuY3Rpb24gZmlsZUV4aXN0cyhwYXRoOiBzdHJpbmcpIHtcbiAgdHJ5IHtcbiAgICByZXR1cm4gKGF3YWl0IGZzLnByb21pc2VzLnN0YXQocGF0aCkpLmlzRmlsZSgpO1xuICB9IGNhdGNoIHtcbiAgICByZXR1cm4gZmFsc2U7XG4gIH1cbn1cblxuZXhwb3J0IGZ1bmN0aW9uIGZpbGVFeGlzdHNTeW5jKHBhdGg6IHN0cmluZykge1xuICB0cnkge1xuICAgIHJldHVybiBmcy5zdGF0U3luYyhwYXRoKS5pc0ZpbGUoKTtcbiAgfSBjYXRjaCB7XG4gICAgcmV0dXJuIGZhbHNlO1xuICB9IFxufVxuXG5leHBvcnQgYXN5bmMgZnVuY3Rpb24gZGlyZWN0b3J5RXhpc3RzKHBhdGg6IHN0cmluZykge1xuICB0cnkge1xuICAgIHJldHVybiAoYXdhaXQgZnMucHJvbWlzZXMuc3RhdChwYXRoKSkuaXNEaXJlY3RvcnkoKTtcbiAgfSBjYXRjaCB7XG4gICAgcmV0dXJuIGZhbHNlO1xuICB9XG59XG5cbmV4cG9ydCBmdW5jdGlvbiBkaXJlY3RvcnlFeGlzdHNTeW5jKHBhdGg6IHN0cmluZykge1xuICB0cnkge1xuICAgcmV0dXJuIGZzLnN0YXRTeW5jKHBhdGgpLmlzRGlyZWN0b3J5KCk7XG4gIH0gY2F0Y2gge1xuICAgIHJldHVybiBmYWxzZTtcbiAgfVxufVxuXG5leHBvcnQgZnVuY3Rpb24gZXh0bmFtZShmdWxscGF0aDogc3RyaW5nLCBvcHRpb25zOiBhbnkpIHtcbiAgaWYgKG9wdGlvbnM/Lmxvbmdlc3QpIHtcbiAgICBjb25zdCBmaWxlbmFtZSA9IHBhdGguYmFzZW5hbWUoZnVsbHBhdGgpO1xuICAgIGNvbnN0IGluZGV4ID0gZmlsZW5hbWUuaW5kZXhPZignLicpO1xuICAgIHJldHVybiBpbmRleCAhPSAtMSA/IGZpbGVuYW1lLnN1YnN0cmluZyhpbmRleCkgOiAnJztcbiAgfVxuXG4gIHJldHVybiBwYXRoLmV4dG5hbWUoZnVsbHBhdGgpO1xufVxuXG5leHBvcnQgYXN5bmMgZnVuY3Rpb24gZmlsZUxpc3QoZGlybmFtZTogc3RyaW5nLCBvcHRpb25zOiBhbnkpOiBQcm9taXNlPEFycmF5PHN0cmluZz4+IHtcbiAgY29uc3QgbGlzdCA9IG5ldyBBcnJheTxzdHJpbmc+O1xuICBpZiAoYXdhaXQgZGlyZWN0b3J5RXhpc3RzKGRpcm5hbWUpKSB7XG4gICAgZm9yIChjb25zdCBpdGVyIG9mIGF3YWl0IGZzLnByb21pc2VzLnJlYWRkaXIoZGlybmFtZSkpIHtcbiAgICAgIGNvbnN0IGZpbGVwYXRoID0gcGF0aC5yZXNvbHZlKGRpcm5hbWUsIGl0ZXIpO1xuICAgICAgY29uc3Qgc3RhdCA9IGF3YWl0IGZzLnByb21pc2VzLnN0YXQoZmlsZXBhdGgpO1xuICAgICAgaWYgKHN0YXQuaXNGaWxlKCkpIHtcbiAgICAgICAgbGlzdC5wdXNoKG9wdGlvbnMucmVsYXRpdmUgPyBwYXRoLnJlbGF0aXZlKG9wdGlvbnMucmVsYXRpdmUsIGZpbGVwYXRoKSA6IGZpbGVwYXRoKTtcbiAgICAgIH1cbiAgICAgIGVsc2UgaWYgKG9wdGlvbnMucmVjdXJzaXZlICYmIHN0YXQuaXNEaXJlY3RvcnkoKSkge1xuICAgICAgICBmb3IgKGNvbnN0IGZuYW1lIG9mIGF3YWl0IGZpbGVMaXN0KGZpbGVwYXRoLCBvcHRpb25zKSlcbiAgICAgICAgICBsaXN0LnB1c2goZm5hbWUpO1xuICAgICAgfVxuICAgIH1cbiAgfVxuICByZXR1cm4gbGlzdDtcbn1cblxuZXhwb3J0IGFzeW5jIGZ1bmN0aW9uIHNhdmVJZkRpZmZlcmVudChmaWxlbmFtZTogc3RyaW5nLCBjb250ZW50OiBzdHJpbmcpIHtcbiAgaWYgKGF3YWl0IGZpbGVFeGlzdHMoZmlsZW5hbWUpKSB7XG4gICAgY29uc3Qgb2xkQ29udGVudCA9IGF3YWl0IGZzLnByb21pc2VzLnJlYWRGaWxlKGZpbGVuYW1lLCB7IGVuY29kaW5nOiBcInV0ZjhcIiB9KTtcbiAgICBpZiAoY29udGVudCA9PSBvbGRDb250ZW50KVxuICAgICAgcmV0dXJuIGZhbHNlO1xuICB9XG5cbiAgYXdhaXQgZnMucHJvbWlzZXMubWtkaXIocGF0aC5kaXJuYW1lKGZpbGVuYW1lKSwgeyByZWN1cnNpdmU6IHRydWUgfSk7XG4gIGF3YWl0IGZzLnByb21pc2VzLndyaXRlRmlsZShmaWxlbmFtZSwgY29udGVudCwgeyBlbmNvZGluZzogXCJ1dGY4XCIgfSk7XG5cbiAgcmV0dXJuIHRydWU7XG59XG5cbmV4cG9ydCBmdW5jdGlvbiBnZXRQYXRoU3RyaW5nKHN0cjogc3RyaW5nKSB7XG4gIGlmIChzdHIuc3RhcnRzV2l0aChJTVBPUlRfU0NIRU1FKSlcbiAgICBzdHIgPSByZXF1aXJlUmVzb2x2ZShzdHIuc2xpY2UoSU1QT1JUX1NDSEVNRS5sZW5ndGgpKTtcbiAgaWYgKHN0ci5zdGFydHNXaXRoKEZJTEVfU0NIRU1FKSlcbiAgICByZXR1cm4gdXJsLmZpbGVVUkxUb1BhdGgoc3RyKTtcbiAgcmV0dXJuIHN0cjtcbn1cblxuZXhwb3J0IGZ1bmN0aW9uIGlzVVJMKHN0cjogc3RyaW5nKSB7XG4gIHRyeSB7XG4gICAgbmV3IFVSTChzdHIpO1xuICAgIHJldHVybiB0cnVlO1xuICB9IGNhdGNoIHtcbiAgICByZXR1cm4gZmFsc2U7XG4gIH1cbn1cblxuZXhwb3J0IGZ1bmN0aW9uIGdldFVSTFN0cmluZyhzdHI6IHN0cmluZykge1xuICBpZiAoc3RyLnN0YXJ0c1dpdGgoSU1QT1JUX1NDSEVNRSkpXG4gICAgcmV0dXJuIHJlcXVpcmVSZXNvbHZlKHN0ci5zbGljZShJTVBPUlRfU0NIRU1FLmxlbmd0aCkpO1xuICBpZiAoaXNVUkwoc3RyKSlcbiAgICByZXR1cm4gdXJsLmZpbGVVUkxUb1BhdGgoc3RyKTtcbiAgcmV0dXJuIHN0cjtcbn1cblxuZXhwb3J0IGFzeW5jIGZ1bmN0aW9uIGZldGNoQnVmZmVyKHN0cjogc3RyaW5nKTogUHJvbWlzZTxCdWZmZXI+IHtcbiAgaWYgKHN0ci5zdGFydHNXaXRoKEhUVFBfU0NIRU1FKSB8fCBzdHIuc3RhcnRzV2l0aChIVFRQU19TQ0hFTUUpKSB7XG4gICAgY29uc3QgcmVzcG9uc2UgPSBhd2FpdCBmZXRjaChzdHIpO1xuICAgIHJldHVybiBCdWZmZXIuZnJvbShhd2FpdCByZXNwb25zZS5hcnJheUJ1ZmZlcigpKTtcbiAgfVxuICByZXR1cm4gYXdhaXQgZnMucHJvbWlzZXMucmVhZEZpbGUoZ2V0VVJMU3RyaW5nKHN0cikpO1xufVxuIiwiLypcbiAqIE1JVCBMaWNlbnNlXG4gKlxuICogQ29weXJpZ2h0IChjKSAyMDI1ICBZdXJpaSBZYWt1YmluICh5dXJpaS55YWt1YmluQGdtYWlsLmNvbSlcbiAqXG4gKiBQZXJtaXNzaW9uIGlzIGdyYW50ZWQgdG8gdXNlLCBjb3B5LCBtb2RpZnksIGFuZCBkaXN0cmlidXRlIHRoaXMgc29mdHdhcmVcbiAqIHVuZGVyIHRoZSBNSVQgTGljZW5zZS4gU2VlIExJQ0VOU0UgZmlsZSBmb3IgZGV0YWlscy5cbiAqL1xuXG5pbXBvcnQgb3MgZnJvbSBcIm5vZGU6b3NcIjtcblxuY29uc3Qgc2l6ZW9mVm9pZHBCaXRzOiBhbnkgPVxue1xuICBhcm06ICAgICA0LFxuICBhcm02NDogICA4LFxuICBpYTMyOiAgICA0LFxuICBsb29uZzY0OiA4LFxuICBtaXBzOiAgICA0LFxuICBtaXBzZWw6ICA0LFxuICBwcGM6ICAgICA0LFxuICBwcGM2NDogICA4LFxuICByaXNjdjY0OiA4LFxuICBzMzkwOiAgICA0LFxuICBzMzkweDogICA4LFxuICB4NjQ6ICAgICA0LFxufTtcblxuY29uc3QgX3NpemVvZlZvaWRwID0gc2l6ZW9mVm9pZHBCaXRzW29zLmFyY2goKV07XG5pZiAoIV9zaXplb2ZWb2lkcClcbiAgdGhyb3cgbmV3IEVycm9yKGBVbmtub3duICR7b3MuYXJjaCgpfSBhcmNoYCk7XG5cbmxldCBfZXhlY3V0YWJsZVN1ZmZpeDogc3RyaW5nO1xuXG5pZiAob3MucGxhdGZvcm0oKSA9PT0gXCJ3aW4zMlwiKSB7XG4gIF9leGVjdXRhYmxlU3VmZml4ID0gXCIuZXhlXCI7XG59XG5lbHNlIHtcbiAgX2V4ZWN1dGFibGVTdWZmaXggPSBcIlwiO1xufVxuXG5leHBvcnQgY2xhc3MgSG9zdCB7XG4gIHN0YXRpYyBnZXQgc2l6ZW9mVm9pZHAoKTogNCB8IDgge1xuICAgIHJldHVybiBfc2l6ZW9mVm9pZHA7XG4gIH1cbiAgc3RhdGljIGdldCBleGVjdXRhYmxlU3VmZml4KCk6IHN0cmluZyB7XG4gICAgcmV0dXJuIF9leGVjdXRhYmxlU3VmZml4O1xuICB9XG59O1xuIiwiLypcbiAqIE1JVCBMaWNlbnNlXG4gKlxuICogQ29weXJpZ2h0IChjKSAyMDI1ICBZdXJpaSBZYWt1YmluICh5dXJpaS55YWt1YmluQGdtYWlsLmNvbSlcbiAqXG4gKiBQZXJtaXNzaW9uIGlzIGdyYW50ZWQgdG8gdXNlLCBjb3B5LCBtb2RpZnksIGFuZCBkaXN0cmlidXRlIHRoaXMgc29mdHdhcmVcbiAqIHVuZGVyIHRoZSBNSVQgTGljZW5zZS4gU2VlIExJQ0VOU0UgZmlsZSBmb3IgZGV0YWlscy5cbiAqL1xuXG5pbXBvcnQgcGF0aCBmcm9tIFwibm9kZTpwYXRoXCI7XG5pbXBvcnQgZnMgZnJvbSBcIm5vZGU6ZnNcIjtcbmltcG9ydCBodHRwIGZyb20gXCJodHRwXCI7XG5pbXBvcnQgaHR0cHMgZnJvbSBcImh0dHBzXCI7XG5cbmltcG9ydCB7IExvZ2dlciB9IGZyb20gXCJAL2xvZ2dlclwiO1xuXG5jb25zdCBsb2dnZXIgPSBMb2dnZXIuY3JlYXRlKGltcG9ydC5tZXRhLnVybCk7XG5cbmludGVyZmFjZSBJUmVzb2x2ZUJ1aWxkZXIge1xuICBhcHBlbmQoZGF0YTogQnVmZmVyKTogdm9pZDtcbiAgdG9SZXN1bHQoKTogQnVmZmVyIHwgdW5kZWZpbmVkO1xufTtcblxuY2xhc3MgQnVmZmVyQnVpbGRlciBpbXBsZW1lbnRzIElSZXNvbHZlQnVpbGRlciB7XG4gIHByaXZhdGUgX2NodW5rczogQXJyYXk8QnVmZmVyPiA9IFtdO1xuXG4gIHB1YmxpYyBhcHBlbmQoY2h1bms6IEJ1ZmZlcik6IHZvaWQge1xuICAgIHRoaXMuX2NodW5rcy5wdXNoKGNodW5rKTtcbiAgfVxuXG4gIHB1YmxpYyB0b1Jlc3VsdCgpOiBCdWZmZXIge1xuICAgIHJldHVybiBCdWZmZXIuY29uY2F0KHRoaXMuX2NodW5rcyk7XG4gIH1cbn07XG5cbmNsYXNzIEZpbGVTeW5jV3JpdGVyIGltcGxlbWVudHMgSVJlc29sdmVCdWlsZGVyIHtcbiAgcHJpdmF0ZSBfZmQ6IG51bWJlcjtcblxuICBwdWJsaWMgY29uc3RydWN0b3IoZmlsZTogc3RyaW5nKSB7XG4gICAgdGhpcy5fZmQgPSBmcy5vcGVuU3luYyhmaWxlLCBcIndcIik7XG4gIH1cblxuICBwdWJsaWMgYXBwZW5kKGNodW5rOiBCdWZmZXIpOiB2b2lkIHtcbiAgICBmcy53cml0ZVN5bmModGhpcy5fZmQsIGNodW5rKTtcbiAgfVxuXG4gIHB1YmxpYyB0b1Jlc3VsdCgpOiB1bmRlZmluZWQge1xuICAgIGZzLmNsb3NlU3luYyh0aGlzLl9mZCk7XG4gIH1cbn07XG5cbmZ1bmN0aW9uIGNyZWF0ZUJ1aWxkZXIoZmlsZT86IHN0cmluZyk6IElSZXNvbHZlQnVpbGRlciB7XG4gIGlmIChmaWxlKVxuICAgIHJldHVybiBuZXcgRmlsZVN5bmNXcml0ZXIoZmlsZSk7XG4gIHJldHVybiBuZXcgQnVmZmVyQnVpbGRlcjtcbn1cblxuZnVuY3Rpb24gaHR0cFJlcXVlc3QodXJsOiBzdHJpbmcsIG9wdGlvbnM6IGh0dHAuUmVxdWVzdE9wdGlvbnMgfCBodHRwcy5SZXF1ZXN0T3B0aW9ucywgY2FsbGJhY2s6IGFueSk6IGh0dHAuQ2xpZW50UmVxdWVzdCB7XG4gIGlmICh1cmwuc3RhcnRzV2l0aChcImh0dHBzOi8vXCIpKVxuICAgIHJldHVybiBodHRwcy5yZXF1ZXN0KHVybCwgb3B0aW9ucywgY2FsbGJhY2spO1xuICByZXR1cm4gaHR0cC5yZXF1ZXN0KHVybCwgb3B0aW9ucywgY2FsbGJhY2spO1xufTtcblxuaW50ZXJmYWNlIEZldGNoT3B0aW9ucyB7XG4gIGF0dGVtcHRzPzogbnVtYmVyO1xufTtcblxuZnVuY3Rpb24gZmV0Y2hJbXBsKHVybDogc3RyaW5nLCBmaWxlOiBzdHJpbmcgfCB1bmRlZmluZWQsIG9wdGlvbnM6IEZldGNoT3B0aW9ucyk6IFByb21pc2U8QnVmZmVyfHVuZGVmaW5lZD4ge1xuICByZXR1cm4gbmV3IFByb21pc2UoKHJlc29sdmUsIHJlamVjdCkgPT4ge1xuICAgIGNvbnN0IGh0dHBPcHRpb25zID0ge1xuICAgICAgbWV0aG9kOiAnR0VUJyxcbiAgICAgIHRpbWVvdXQ6IDUwMDAsXG4gICAgICBoZWFkZXJzOiB7XG4gICAgICAgIFwiVXNlci1BZ2VudFwiOiBQUk9KRUNUX05BTUUgKyBcIi9cIiArIFBST0pFQ1RfVkVSU0lPTixcbiAgICAgICAgXCJBY2NlcHRcIjogXCIqLypcIixcbiAgICAgIH0sXG4gICAgfTtcblxuICAgIGxldCBhdHRlbXB0cyA9IG9wdGlvbnMuYXR0ZW1wdHMgfHwgMDtcbiAgICBjb25zdCBkb1JlcXVlc3QgPSAodXJsOiBzdHJpbmcpID0+IHtcbiAgICAgIGNvbnN0IHJlcXVlc3QgPSBodHRwUmVxdWVzdCh1cmwsIGh0dHBPcHRpb25zLCBvblJlcXVlc3QpO1xuXG4gICAgICBsZXQgaGFzRXJyb3IgPSBmYWxzZTtcbiAgICAgIGNvbnN0IG9uRXJyb3IgPSAoZXJyOiBFcnJvcikgPT4ge1xuICAgICAgICByZXF1ZXN0LmRlc3Ryb3koKTtcbiAgICAgICAgaWYgKCFoYXNFcnJvcikge1xuICAgICAgICAgIGhhc0Vycm9yID0gdHJ1ZTtcbiAgICAgICAgICBpZiAoYXR0ZW1wdHMgPiAwKSB7XG4gICAgICAgICAgICBsb2dnZXIud2FybihlcnIubWVzc2FnZSk7XG4gICAgICAgICAgICBsb2dnZXIuaW5mbyhgcmUtd2dldCAke3VybH0gYXR0ZW1wdHMgJHthdHRlbXB0c31gKTtcbiAgICAgICAgICAgIGF0dGVtcHRzLS07XG4gICAgICAgICAgICBkb1JlcXVlc3QodXJsKTtcbiAgICAgICAgICB9XG4gICAgICAgICAgZWxzZSB7XG4gICAgICAgICAgICByZWplY3QoZXJyKTtcbiAgICAgICAgICB9XG4gICAgICAgIH1cbiAgICAgIH07XG5cbiAgICAgIHJlcXVlc3Qub24oXCJ0aW1lb3V0XCIsICgpID0+IHtcbiAgICAgICAgb25FcnJvcihuZXcgRXJyb3IoXCJUaW1lb3V0IGZvciBcIiArIHVybCkpO1xuICAgICAgfSk7XG5cbiAgICAgIHJlcXVlc3Qub24oXCJlcnJvclwiLCAoZXJyOiBFcnJvcikgPT4ge1xuICAgICAgICBvbkVycm9yKGVycik7XG4gICAgICB9KTtcblxuICAgICAgcmVxdWVzdC5lbmQoKTtcbiAgICB9O1xuXG4gICAgY29uc3QgZmlsZW5hbWUgPSBwYXRoLmJhc2VuYW1lKHVybCk7XG4gICAgY29uc3Qgb25SZXF1ZXN0ID0gKHJlc3BvbnNlOiBodHRwLkluY29taW5nTWVzc2FnZSkgPT4ge1xuICAgICAgc3dpdGNoIChyZXNwb25zZS5zdGF0dXNDb2RlKSB7XG4gICAgICBjYXNlIDIwMDpcbiAgICAgICAgbG9nZ2VyLmRlYnVnKGBDb25uY3RlZCB0byAkeyhyZXNwb25zZSBhcyBhbnkpLnJlcS5ob3N0fWApO1xuICAgICAgICBsb2dnZXIuZGVidWcoYERvd25sb2FkaW5nICR7ZmlsZW5hbWV9YCk7XG4gICAgICAgIGNvbnN0IGJ1aWxkZXIgPSBjcmVhdGVCdWlsZGVyKGZpbGUpO1xuICAgICAgICByZXNwb25zZS5vbihcImRhdGFcIiwgKGNodW5rOiBCdWZmZXIpID0+IGJ1aWxkZXIuYXBwZW5kKGNodW5rKSk7XG4gICAgICAgIHJlc3BvbnNlLm9uKFwiZW5kXCIsICgpID0+IHJlc29sdmUoYnVpbGRlci50b1Jlc3VsdCgpKSk7XG4gICAgICAgIHJlc3BvbnNlLm9uKCdjbG9zZScsICgpID0+IGxvZ2dlci5kZWJ1ZyhcIkNsb3NlXCIpKTtcbiAgICAgICAgYnJlYWs7XG5cbiAgICAgIGNhc2UgMzAxOlxuICAgICAgY2FzZSAzMDI6XG4gICAgICAgIHJlc3BvbnNlLnJlc3VtZSgpO1xuICAgICAgICBpZiAocmVzcG9uc2UuaGVhZGVycy5sb2NhdGlvbikge1xuICAgICAgICAgIGxvZ2dlci5pbmZvKFwiUmVkaXJlY3QgdG8gXCIgKyByZXNwb25zZS5oZWFkZXJzLmxvY2F0aW9uKTtcbiAgICAgICAgICBkb1JlcXVlc3QocmVzcG9uc2UuaGVhZGVycy5sb2NhdGlvbik7XG4gICAgICAgIH1cbiAgICAgICAgYnJlYWs7XG5cbiAgICAgIGRlZmF1bHQ6XG4gICAgICAgIHJlc3BvbnNlLnJlc3VtZSgpO1xuICAgICAgICBjb25zdCBtZXNzYWdlID0gXCJEaWQgbm90IGdldCBhbiBPSyBmcm9tIHRoZSBzZXJ2ZXIuIENvZGU6IFwiICsgcmVzcG9uc2Uuc3RhdHVzQ29kZTtcbiAgICAgICAgbG9nZ2VyLmVycm9yKG1lc3NhZ2UpO1xuICAgICAgICByZWplY3QobWVzc2FnZSk7XG4gICAgICAgIGJyZWFrO1xuICAgICAgfVxuICAgIH07XG5cbiAgICBsb2dnZXIuaW5mbyhcIndnZXQgXCIgKyB1cmwpO1xuICAgIGRvUmVxdWVzdCh1cmwpO1xuICB9KTtcbn07XG5cbmV4cG9ydCBmdW5jdGlvbiByZXF1ZXN0R2V0KHVybDogc3RyaW5nLCBvcHRpb25zPzogRmV0Y2hPcHRpb25zKSB7XG4gIHJldHVybiBmZXRjaEltcGwodXJsLCB1bmRlZmluZWQsIG9wdGlvbnMgfHwge30pIGFzIFByb21pc2U8QnVmZmVyPjtcbn1cblxuZXhwb3J0IGZ1bmN0aW9uIGRvd25sb2FkRmlsZSh1cmw6IHN0cmluZywgZmlsZTogc3RyaW5nLCBvcHRpb25zPzogRmV0Y2hPcHRpb25zKSB7XG4gIHJldHVybiBmZXRjaEltcGwodXJsLCBmaWxlLCBvcHRpb25zIHx8IHt9KSBhcyBQcm9taXNlPHVuZGVmaW5lZD47XG59XG4iLCIvKlxuICogTUlUIExpY2Vuc2VcbiAqXG4gKiBDb3B5cmlnaHQgKGMpIDIwMjUgIFl1cmlpIFlha3ViaW4gKHl1cmlpLnlha3ViaW5AZ21haWwuY29tKVxuICpcbiAqIFBlcm1pc3Npb24gaXMgZ3JhbnRlZCB0byB1c2UsIGNvcHksIG1vZGlmeSwgYW5kIGRpc3RyaWJ1dGUgdGhpcyBzb2Z0d2FyZVxuICogdW5kZXIgdGhlIE1JVCBMaWNlbnNlLiBTZWUgTElDRU5TRSBmaWxlIGZvciBkZXRhaWxzLlxuICovXG5cbmltcG9ydCB1cmwgZnJvbSBcIm5vZGU6dXJsXCI7XG5cbmV4cG9ydCBjb25zdCBpbXBvcnRNb2R1bGUgPSBhc3luYyAobmFtZSkgPT4gaW1wb3J0KC8qIHdlYnBhY2tJZ25vcmU6IHRydWUgKi8gbmFtZSk7XG5cbmV4cG9ydCBmdW5jdGlvbiBpc0VudHJ5UG9pbnQoKSB7XG4gIC8vIGlmIChPYmplY3QoaW1wb3J0Lm1ldGEpLnVybClcbiAgLy8gICByZXR1cm4gdXJsLmZpbGVVUkxUb1BhdGgoT2JqZWN0KGltcG9ydC5tZXRhKS51cmwpID09PSBwcm9jZXNzLmFyZ3ZbMV07XG4gIGlmICh0eXBlb2YgcmVxdWlyZSAhPT0gJ3VuZGVmaW5lZCcpXG4gICAgcmV0dXJuIHJlcXVpcmUubWFpbiA9PT0gbW9kdWxlO1xuICB0aHJvdyBuZXcgRXJyb3IoXCJObyBjb21wYXRpYmxlIG1vZHVsZSByZXNvbHZlciBmb3VuZFwiKTtcbn1cblxuZXhwb3J0IGZ1bmN0aW9uIGN1cnJlbnRTY3JpcHRVUkwoKSB7XG4gIC8vIGlmIChPYmplY3QoaW1wb3J0Lm1ldGEpLnVybClcbiAgLy8gICByZXR1cm4gdXJsLmZpbGVVUkxUb1BhdGgoT2JqZWN0KGltcG9ydC5tZXRhKS51cmwpO1xuICBpZiAodHlwZW9mIHJlcXVpcmUgIT09ICd1bmRlZmluZWQnKVxuICAgIHJldHVybiB1cmwucGF0aFRvRmlsZVVSTCgvKiB3ZWJwYWNrSWdub3JlOiB0cnVlICovIF9fZmlsZW5hbWUpO1xuICB0aHJvdyBuZXcgRXJyb3IoXCJVbmtub3duIGN1cnJlbnQgZmlsZW5hbWVcIik7XG59XG4iLCJpbXBvcnQgZnMgZnJvbSBcIm5vZGU6ZnNcIjtcbmltcG9ydCBwYXRoIGZyb20gXCJub2RlOnBhdGhcIjtcblxuaW1wb3J0IHsgZmlsZUxpc3QgfSBmcm9tIFwiQC91dGlscy9GaWxlU3lzdGVtXCI7XG5pbXBvcnQgeyBMb2dnZXIgfSBmcm9tIFwiQC9sb2dnZXJcIjtcblxuY29uc3QgbG9nZ2VyID0gTG9nZ2VyLmNyZWF0ZShpbXBvcnQubWV0YS51cmwpO1xuXG5leHBvcnQgYXN5bmMgZnVuY3Rpb24gbWFrZVBhdGNoKHNyY0Rpcjogc3RyaW5nLCBkZXN0RGlyOiBzdHJpbmcpIHtcbiAgbG9nZ2VyLmluZm8oYE1ha2UgcGF0Y2ggJHtzcmNEaXJ9IHRvICR7ZGVzdERpcn1gKTtcbiAgY29uc3QgbGlzdCA9IGF3YWl0IGZpbGVMaXN0KHNyY0RpciwgeyByZWxhdGl2ZTogc3JjRGlyLCByZWN1cnNpdmU6IHRydWUgfSk7XG4gIGZvciAoY29uc3QgaXRlciBvZiBsaXN0KSB7XG4gICAgY29uc3Qgc291cmNlID0gcGF0aC5yZXNvbHZlKHNyY0RpciwgaXRlcik7XG4gICAgY29uc3QgZGVzdGluYXRpb24gPSBwYXRoLnJlc29sdmUoZGVzdERpciwgaXRlcik7XG4gICAgYXdhaXQgZnMucHJvbWlzZXMuY3Aoc291cmNlLCBkZXN0aW5hdGlvbiwgeyBmb3JjZTogdHJ1ZSB9KTtcbiAgICBsb2dnZXIuaW5mbyhgIFJlcGxhY2VkICR7aXRlcn1gKTtcbiAgfVxufVxuIiwiLypcbiAqIE1JVCBMaWNlbnNlXG4gKlxuICogQ29weXJpZ2h0IChjKSAyMDI1ICBZdXJpaSBZYWt1YmluICh5dXJpaS55YWt1YmluQGdtYWlsLmNvbSlcbiAqXG4gKiBQZXJtaXNzaW9uIGlzIGdyYW50ZWQgdG8gdXNlLCBjb3B5LCBtb2RpZnksIGFuZCBkaXN0cmlidXRlIHRoaXMgc29mdHdhcmVcbiAqIHVuZGVyIHRoZSBNSVQgTGljZW5zZS4gU2VlIExJQ0VOU0UgZmlsZSBmb3IgZGV0YWlscy5cbiAqL1xuXG5leHBvcnQgeyBpc0VudHJ5UG9pbnQgfSBmcm9tIFwiLi9JbXBvcnRNb2R1bGUubWpzXCI7XG5leHBvcnQgeyBpbXBvcnRNb2R1bGUgfSBmcm9tIFwiLi9JbXBvcnRNb2R1bGUubWpzXCI7XG5leHBvcnQgeyBjdXJyZW50U2NyaXB0VVJMIH0gZnJvbSBcIi4vSW1wb3J0TW9kdWxlLm1qc1wiO1xuXG5leHBvcnQgY29uc3QgcmVxdWlyZVN5bmMgPSBldmFsKFwicmVxdWlyZVwiKSBhcyBOb2RlSlMuUmVxdWlyZTtcblxuZXhwb3J0IGZ1bmN0aW9uIHJlcXVpcmVSZXNvbHZlKG5hbWU6IHN0cmluZykge1xuICBpZiAodHlwZW9mIGltcG9ydC5tZXRhLnJlc29sdmUgPT09ICdmdW5jdGlvbicpXG4gICAgcmV0dXJuIGltcG9ydC5tZXRhLnJlc29sdmUobmFtZSk7XG4gIGlmICh0eXBlb2YgcmVxdWlyZVN5bmMgIT09ICd1bmRlZmluZWQnKVxuICAgIHJldHVybiByZXF1aXJlU3luYy5yZXNvbHZlKG5hbWUpO1xuICB0aHJvdyBuZXcgRXJyb3IoXCJObyBjb21wYXRpYmxlIG1vZHVsZSByZXNvbHZlciBmb3VuZFwiKTtcbn1cbiIsIi8qXG4gKiBNSVQgTGljZW5zZVxuICpcbiAqIENvcHlyaWdodCAoYykgMjAyNSAgWXVyaWkgWWFrdWJpbiAoeXVyaWkueWFrdWJpbkBnbWFpbC5jb20pXG4gKlxuICogUGVybWlzc2lvbiBpcyBncmFudGVkIHRvIHVzZSwgY29weSwgbW9kaWZ5LCBhbmQgZGlzdHJpYnV0ZSB0aGlzIHNvZnR3YXJlXG4gKiB1bmRlciB0aGUgTUlUIExpY2Vuc2UuIFNlZSBMSUNFTlNFIGZpbGUgZm9yIGRldGFpbHMuXG4gKi9cblxuaW1wb3J0IG9zIGZyb20gXCJub2RlOm9zXCI7XG5pbXBvcnQgbm9kZXBhdGggZnJvbSBcIm5vZGU6cGF0aFwiO1xuXG5sZXQgbmF0aXZlU2VwID0gIG5vZGVwYXRoLnBvc2l4LnNlcDtcbmxldCBvdGhlclNlcCA9IG5vZGVwYXRoLndpbjMyLnNlcDtcblxuaWYgKG9zLnBsYXRmb3JtKCkgPT09IFwid2luMzJcIikge1xuICBbIG5hdGl2ZVNlcCwgb3RoZXJTZXAgXSA9IFsgb3RoZXJTZXAsIG5hdGl2ZVNlcCBdO1xufVxuXG5leHBvcnQgbmFtZXNwYWNlIFBhdGgge1xuXG5leHBvcnQgY29uc3Qgc2VwID0gbm9kZXBhdGgucG9zaXguc2VwO1xuZXhwb3J0IGNvbnN0IGRlbGltaXRlciA9IG5vZGVwYXRoLmRlbGltaXRlcjtcblxuZXhwb3J0IGZ1bmN0aW9uIG5hdGl2ZVBhdGgocGF0aDogc3RyaW5nKTogc3RyaW5nIHtcbiAgcmV0dXJuIHBhdGgucmVwbGFjZUFsbChvdGhlclNlcCwgbmF0aXZlU2VwKTtcbn1cblxuZXhwb3J0IGZ1bmN0aW9uIHJlcHJlc2VudFBhdGgocGF0aDogc3RyaW5nKTogc3RyaW5nIHtcbiAgcmV0dXJuIHBhdGgucmVwbGFjZUFsbChub2RlcGF0aC53aW4zMi5zZXAsIG5vZGVwYXRoLnBvc2l4LnNlcCk7XG59XG5cbmV4cG9ydCBmdW5jdGlvbiBpc0Fic29sdXRlKHBhdGg6IHN0cmluZyk6IGJvb2xlYW4ge1xuICByZXR1cm4gbm9kZXBhdGguaXNBYnNvbHV0ZShuYXRpdmVQYXRoKHBhdGgpKTtcbn1cblxuZXhwb3J0IGZ1bmN0aW9uIGpvaW4oLi4ucGF0aHM6IHN0cmluZ1tdKTogc3RyaW5nIHtcbiAgcmV0dXJuIHJlcHJlc2VudFBhdGgobm9kZXBhdGguam9pbiguLi5wYXRocy5tYXAoaSA9PiBuYXRpdmVQYXRoKGkpKSkpO1xufVxuXG5leHBvcnQgZnVuY3Rpb24gcmVzb2x2ZSguLi5wYXRoczogc3RyaW5nW10pOiBzdHJpbmcge1xuICByZXR1cm4gcmVwcmVzZW50UGF0aChub2RlcGF0aC5yZXNvbHZlKC4uLnBhdGhzLm1hcChpID0+IG5hdGl2ZVBhdGgoaSkpKSk7XG59XG5cbmV4cG9ydCBmdW5jdGlvbiBkaXJuYW1lKHBhdGg6IHN0cmluZyk6IHN0cmluZyB7XG4gIHJldHVybiByZXByZXNlbnRQYXRoKG5vZGVwYXRoLmRpcm5hbWUobmF0aXZlUGF0aChwYXRoKSkpO1xufVxuXG5leHBvcnQgZnVuY3Rpb24gYmFzZW5hbWUocGF0aDogc3RyaW5nLCBzdWZmaXg/OiBzdHJpbmcpOiBzdHJpbmcge1xuICByZXR1cm4gcmVwcmVzZW50UGF0aChub2RlcGF0aC5iYXNlbmFtZShuYXRpdmVQYXRoKHBhdGgpLCBzdWZmaXgpKTtcbn1cblxuZXhwb3J0IGZ1bmN0aW9uIHJlbGF0aXZlKGZyb206IHN0cmluZywgdG86IHN0cmluZyk6IHN0cmluZyB7XG4gIHJldHVybiByZXByZXNlbnRQYXRoKG5vZGVwYXRoLnJlbGF0aXZlKG5hdGl2ZVBhdGgoZnJvbSksIG5hdGl2ZVBhdGgodG8pKSk7XG59XG5cbn0gLy8gbmFtZXNwYWNlIFBhdGhcbiIsIi8qXG4gKiBNSVQgTGljZW5zZVxuICpcbiAqIENvcHlyaWdodCAoYykgMjAyNSAgWXVyaWkgWWFrdWJpbiAoeXVyaWkueWFrdWJpbkBnbWFpbC5jb20pXG4gKlxuICogUGVybWlzc2lvbiBpcyBncmFudGVkIHRvIHVzZSwgY29weSwgbW9kaWZ5LCBhbmQgZGlzdHJpYnV0ZSB0aGlzIHNvZnR3YXJlXG4gKiB1bmRlciB0aGUgTUlUIExpY2Vuc2UuIFNlZSBMSUNFTlNFIGZpbGUgZm9yIGRldGFpbHMuXG4gKi9cblxuZXhwb3J0IGZ1bmN0aW9uIGVxdWFsVmFsdWUoYTogYW55LCBiOiBhbnkpOiBib29sZWFuIHtcbiAgaWYgKGEgPT09IGIpXG4gICAgcmV0dXJuIHRydWU7XG5cbiAgaWYgKGEgPT09IHVuZGVmaW5lZCB8fCBiID09PSB1bmRlZmluZWQpXG4gICAgcmV0dXJuIGZhbHNlO1xuXG4gIGlmICh0eXBlb2YgYSAhPT0gXCJvYmplY3RcIiB8fCB0eXBlb2YgYiAhPT0gXCJvYmplY3RcIilcbiAgICByZXR1cm4gZmFsc2U7XG5cbiAgY29uc3QgazEgPSBPYmplY3Qua2V5cyhhKTtcbiAgY29uc3QgazIgPSBPYmplY3Qua2V5cyhiKTtcblxuICBpZiAoazEubGVuZ3RoICE9IGsyLmxlbmd0aClcbiAgICByZXR1cm4gZmFsc2U7XG5cbiAgZm9yIChjb25zdCBrZXkgb2YgazEpIHtcbiAgICBpZiAoIU9iamVjdC5oYXNPd24oYiwga2V5KSB8fCAhZXF1YWxWYWx1ZShhW2tleV0sIGJba2V5XSkpXG4gICAgICByZXR1cm4gZmFsc2U7XG4gIH1cblxuICByZXR1cm4gdHJ1ZTtcbn1cblxuZXhwb3J0IGZ1bmN0aW9uIGRlZXBDb3B5KG86IGFueSk6IGFueSB7XG4gIGlmICghbyB8fCB0eXBlb2YgbyAhPT0gXCJvYmplY3RcIilcbiAgICByZXR1cm4gbztcbiAgaWYgKEFycmF5LmlzQXJyYXkobykpIHtcbiAgICBjb25zdCByZXN1bHQgPSBbXTtcbiAgICBmb3IgKGNvbnN0IGl0ZXIgb2YgbylcbiAgICAgIHJlc3VsdC5wdXNoKGRlZXBDb3B5KGl0ZXIpKTtcbiAgICByZXR1cm4gcmVzdWx0O1xuICB9XG4gIGVsc2Uge1xuICAgIGNvbnN0IHJlc3VsdCA9IHt9IGFzIGFueTtcbiAgICBmb3IgKGNvbnN0IFtrZXksdmFsXSBvZiBPYmplY3QuZW50cmllcyhvKSlcbiAgICAgIHJlc3VsdFtrZXldID0gZGVlcENvcHkodmFsKTtcbiAgICByZXR1cm4gcmVzdWx0O1xuICB9XG59XG5cbmV4cG9ydCBmdW5jdGlvbiBhc3NpZ25PYmplY3QodGFyZ2V0OiBhbnksIHNvdXJjZTogYW55KSB7XG4gIGlmIChBcnJheS5pc0FycmF5KHRhcmdldCkgJiYgQXJyYXkuaXNBcnJheShzb3VyY2UpKSB7XG4gICAgZm9yIChjb25zdCBpdGVyIG9mIHNvdXJjZSlcbiAgICAgIHRhcmdldC5wdXNoKGl0ZXIpO1xuICB9XG4gIGVsc2Uge1xuICAgIGZvciAoY29uc3Qga2V5IG9mIE9iamVjdC5rZXlzKHNvdXJjZSkpIHtcbiAgICAgIGNvbnN0IGEgPSB0YXJnZXRba2V5XSwgYiA9IHNvdXJjZVtrZXldO1xuICAgICAgaWYgKGEgJiYgdHlwZW9mIGEgPT09IFwib2JqZWN0XCIgJiYgYiAmJiB0eXBlb2YgYiA9PT0gXCJvYmplY3RcIilcbiAgICAgICAgYXNzaWduT2JqZWN0KGEsIGIpO1xuICAgICAgZWxzZVxuICAgICAgICB0YXJnZXRba2V5XSA9IGRlZXBDb3B5KGIpO1xuICAgIH1cbiAgfVxufVxuXG5leHBvcnQgZnVuY3Rpb24gYXJyYXlXcmFwcGVyKHZhbHVlOiBhbnkpIHtcbiAgaWYgKHZhbHVlID09PSB1bmRlZmluZWQgfHwgQXJyYXkuaXNBcnJheSh2YWx1ZSkpXG4gICAgcmV0dXJuIHZhbHVlO1xuICByZXR1cm4gWyB2YWx1ZSBdO1xufVxuIiwiLypcbiAqIE1JVCBMaWNlbnNlXG4gKlxuICogQ29weXJpZ2h0IChjKSAyMDI1ICBZdXJpaSBZYWt1YmluICh5dXJpaS55YWt1YmluQGdtYWlsLmNvbSlcbiAqXG4gKiBQZXJtaXNzaW9uIGlzIGdyYW50ZWQgdG8gdXNlLCBjb3B5LCBtb2RpZnksIGFuZCBkaXN0cmlidXRlIHRoaXMgc29mdHdhcmVcbiAqIHVuZGVyIHRoZSBNSVQgTGljZW5zZS4gU2VlIExJQ0VOU0UgZmlsZSBmb3IgZGV0YWlscy5cbiAqL1xuXG5pbXBvcnQgZnMgZnJvbSBcIm5vZGU6ZnNcIjtcblxuZXhwb3J0IGNsYXNzIFNldHRpbmdzU3RvcmFnZSB7XG4gIHByaXZhdGUgX2ZpbGVuYW1lOiBzdHJpbmc7XG4gIHByaXZhdGUgX3NldHRpbmdzOiBhbnk7XG4gIHByaXZhdGUgX2N1cnJlbnQ6IGFueTtcblxuICBjb25zdHJ1Y3RvcihmaWxlbmFtZTogc3RyaW5nKSB7XG4gICAgdGhpcy5fZmlsZW5hbWUgPSBmaWxlbmFtZTtcbiAgfVxuXG4gIHB1YmxpYyBhc3luYyBwdXNoKG5hbWU6IHN0cmluZykge1xuICAgIGlmICghdGhpcy5fc2V0dGluZ3MpXG4gICAgICBhd2FpdCB0aGlzLmxvYWQoKTtcbiAgICBsZXQgb2JqZWN0ID0gdGhpcy5fY3VycmVudC5vYmplY3RbbmFtZV07XG4gICAgaWYgKCFvYmplY3QpXG4gICAgICBvYmplY3QgPSB0aGlzLl9jdXJyZW50Lm9iamVjdFtuYW1lXSA9IHt9O1xuICAgIHRoaXMuX2N1cnJlbnQgPSB7IHBhcmVudDogdGhpcy5fY3VycmVudCwgb2JqZWN0IH07XG4gIH1cblxuICBwdWJsaWMgYXN5bmMgcG9wKCkge1xuICAgIGlmICghdGhpcy5fc2V0dGluZ3MpXG4gICAgICBhd2FpdCB0aGlzLmxvYWQoKTtcbiAgICBjb25zb2xlLmFzc2VydCh0aGlzLl9jdXJyZW50LnBhcmVudCk7XG4gICAgdGhpcy5fY3VycmVudCA9IHRoaXMuX2N1cnJlbnQucGFyZW50O1xuICB9XG5cbiAgcHVibGljIGFzeW5jIGdldChuYW1lOiBzdHJpbmcpIHtcbiAgICBpZiAoIXRoaXMuX3NldHRpbmdzKVxuICAgICAgYXdhaXQgdGhpcy5sb2FkKCk7XG4gICAgcmV0dXJuIHRoaXMuX2N1cnJlbnQub2JqZWN0W25hbWVdO1xuICB9XG5cbiAgcHVibGljIGFzeW5jIHNldChuYW1lOiBzdHJpbmcsIHZhbHVlOiBhbnkpIHtcbiAgICBpZiAoIXRoaXMuX3NldHRpbmdzKVxuICAgICAgYXdhaXQgdGhpcy5sb2FkKCk7XG4gICAgdGhpcy5fY3VycmVudC5vYmplY3RbbmFtZV0gPSB2YWx1ZTtcbiAgICBhd2FpdCB0aGlzLnNhdmUoKTtcbiAgfVxuXG4gIHB1YmxpYyBhc3luYyBsb2FkKCkge1xuICAgIHRyeSB7XG4gICAgICBjb25zdCBjb250ZW50ID0gYXdhaXQgZnMucHJvbWlzZXMucmVhZEZpbGUodGhpcy5fZmlsZW5hbWUsIFwidXRmLThcIik7XG4gICAgICB0aGlzLl9zZXR0aW5ncyA9IEpTT04ucGFyc2UoY29udGVudCk7XG4gICAgfVxuICAgIGNhdGNoIChlKSB7XG4gICAgICB0aGlzLl9zZXR0aW5ncyA9IHt9O1xuICAgIH1cbiAgICB0aGlzLl9jdXJyZW50ID1cbiAgICB7XG4gICAgICBwYXJlbnQ6IG51bGwsXG4gICAgICBvYmplY3Q6IHRoaXMuX3NldHRpbmdzLFxuICAgIH07XG4gIH1cblxuICBwdWJsaWMgYXN5bmMgc2F2ZSgpIHtcbiAgICBjb25zdCBzcGFjZSA9IDI7XG4gICAgY29uc3QgY29udGVudCA9IEpTT04uc3RyaW5naWZ5KHRoaXMuX3NldHRpbmdzLCB1bmRlZmluZWQsIHNwYWNlKTtcbiAgICBhd2FpdCBmcy5wcm9taXNlcy53cml0ZUZpbGUodGhpcy5fZmlsZW5hbWUsIGNvbnRlbnQsIHsgZW5jb2Rpbmc6IFwidXRmLThcIiwgZmxhZzogXCJ3XCIsIGZsdXNoOiB0cnVlIH0pO1xuICB9XG59O1xuIiwiLypcbiAqIE1JVCBMaWNlbnNlXG4gKlxuICogQ29weXJpZ2h0IChjKSAyMDI1ICBZdXJpaSBZYWt1YmluICh5dXJpaS55YWt1YmluQGdtYWlsLmNvbSlcbiAqXG4gKiBQZXJtaXNzaW9uIGlzIGdyYW50ZWQgdG8gdXNlLCBjb3B5LCBtb2RpZnksIGFuZCBkaXN0cmlidXRlIHRoaXMgc29mdHdhcmVcbiAqIHVuZGVyIHRoZSBNSVQgTGljZW5zZS4gU2VlIExJQ0VOU0UgZmlsZSBmb3IgZGV0YWlscy5cbiAqL1xuXG5leHBvcnQgZnVuY3Rpb24gZW5zdXJlQm9vbGVhbih2YWx1ZTogYW55KSB7XG4gIGlmICh0eXBlb2YgdmFsdWUgPT09IFwiYm9vbGVhblwiKVxuICAgIHJldHVybiB2YWx1ZTtcbiAgdGhyb3cgbmV3IFR5cGVFcnJvcihgVGhlICcke3ZhbHVlfScgaXMgbm90IGEgYm9vbGVhbmApO1xufVxuXG5leHBvcnQgZnVuY3Rpb24gZW5zdXJlTnVtYmVyKHZhbHVlOiBhbnkpIHtcbiAgaWYgKHR5cGVvZiB2YWx1ZSA9PT0gXCJudW1iZXJcIilcbiAgICByZXR1cm4gdmFsdWU7XG4gIHRocm93IG5ldyBUeXBlRXJyb3IoYFRoZSAnJHt2YWx1ZX0nIGlzIG5vdCBhIG51bWJlcmApO1xufVxuXG5leHBvcnQgZnVuY3Rpb24gZW5zdXJlU3RyaW5nKHZhbHVlOiBhbnkpIHtcbiAgaWYgKHR5cGVvZiB2YWx1ZSA9PT0gXCJzdHJpbmdcIilcbiAgICByZXR1cm4gdmFsdWU7XG4gIHRocm93IG5ldyBUeXBlRXJyb3IoYFRoZSAnJHt2YWx1ZX0nIGlzIG5vdCBhIHN0cmluZ2ApO1xufVxuXG5leHBvcnQgZnVuY3Rpb24gZW5zdXJlQXJyYXkodmFsdWU6IGFueSkge1xuICBpZiAoQXJyYXkuaXNBcnJheSh2YWx1ZSkpXG4gICAgcmV0dXJuIEFycmF5LmZyb20odmFsdWUpO1xuICB0aHJvdyBuZXcgVHlwZUVycm9yKGBUaGUgJyR7dmFsdWV9JyBpcyBub3QgYSBhcnJheWApO1xufVxuIiwiLypcbiAqIE1JVCBMaWNlbnNlXG4gKlxuICogQ29weXJpZ2h0IChjKSAyMDI1ICBZdXJpaSBZYWt1YmluICh5dXJpaS55YWt1YmluQGdtYWlsLmNvbSlcbiAqXG4gKiBQZXJtaXNzaW9uIGlzIGdyYW50ZWQgdG8gdXNlLCBjb3B5LCBtb2RpZnksIGFuZCBkaXN0cmlidXRlIHRoaXMgc29mdHdhcmVcbiAqIHVuZGVyIHRoZSBNSVQgTGljZW5zZS4gU2VlIExJQ0VOU0UgZmlsZSBmb3IgZGV0YWlscy5cbiAqL1xuXG5leHBvcnQgY29uc3QgRklMRV9TQ0hFTUUgPSBcImZpbGU6Ly9cIjtcbmV4cG9ydCBjb25zdCBJTVBPUlRfU0NIRU1FID0gXCJpbXBvcnQ6Ly9cIjtcbmV4cG9ydCBjb25zdCBIVFRQX1NDSEVNRSA9IFwiaHR0cDovL1wiO1xuZXhwb3J0IGNvbnN0IEhUVFBTX1NDSEVNRSA9IFwiaHR0cHM6Ly9cIjtcbiIsIm1vZHVsZS5leHBvcnRzID0gcmVxdWlyZShcImh0dHBcIik7IiwibW9kdWxlLmV4cG9ydHMgPSByZXF1aXJlKFwiaHR0cHNcIik7IiwibW9kdWxlLmV4cG9ydHMgPSByZXF1aXJlKFwibm9kZTpjaGlsZF9wcm9jZXNzXCIpOyIsIm1vZHVsZS5leHBvcnRzID0gcmVxdWlyZShcIm5vZGU6ZnNcIik7IiwibW9kdWxlLmV4cG9ydHMgPSByZXF1aXJlKFwibm9kZTpvc1wiKTsiLCJtb2R1bGUuZXhwb3J0cyA9IHJlcXVpcmUoXCJub2RlOnBhdGhcIik7IiwibW9kdWxlLmV4cG9ydHMgPSByZXF1aXJlKFwibm9kZTp1cmxcIik7IiwibW9kdWxlLmV4cG9ydHMgPSByZXF1aXJlKFwibm9kZTp3b3JrZXJfdGhyZWFkc1wiKTsiLCIvLyBUaGUgbW9kdWxlIGNhY2hlXG52YXIgX193ZWJwYWNrX21vZHVsZV9jYWNoZV9fID0ge307XG5cbi8vIFRoZSByZXF1aXJlIGZ1bmN0aW9uXG5mdW5jdGlvbiBfX3dlYnBhY2tfcmVxdWlyZV9fKG1vZHVsZUlkKSB7XG5cdC8vIENoZWNrIGlmIG1vZHVsZSBpcyBpbiBjYWNoZVxuXHR2YXIgY2FjaGVkTW9kdWxlID0gX193ZWJwYWNrX21vZHVsZV9jYWNoZV9fW21vZHVsZUlkXTtcblx0aWYgKGNhY2hlZE1vZHVsZSAhPT0gdW5kZWZpbmVkKSB7XG5cdFx0cmV0dXJuIGNhY2hlZE1vZHVsZS5leHBvcnRzO1xuXHR9XG5cdC8vIENyZWF0ZSBhIG5ldyBtb2R1bGUgKGFuZCBwdXQgaXQgaW50byB0aGUgY2FjaGUpXG5cdHZhciBtb2R1bGUgPSBfX3dlYnBhY2tfbW9kdWxlX2NhY2hlX19bbW9kdWxlSWRdID0ge1xuXHRcdC8vIG5vIG1vZHVsZS5pZCBuZWVkZWRcblx0XHQvLyBubyBtb2R1bGUubG9hZGVkIG5lZWRlZFxuXHRcdGV4cG9ydHM6IHt9XG5cdH07XG5cblx0Ly8gRXhlY3V0ZSB0aGUgbW9kdWxlIGZ1bmN0aW9uXG5cdF9fd2VicGFja19tb2R1bGVzX19bbW9kdWxlSWRdKG1vZHVsZSwgbW9kdWxlLmV4cG9ydHMsIF9fd2VicGFja19yZXF1aXJlX18pO1xuXG5cdC8vIFJldHVybiB0aGUgZXhwb3J0cyBvZiB0aGUgbW9kdWxlXG5cdHJldHVybiBtb2R1bGUuZXhwb3J0cztcbn1cblxuIiwiLy8gZ2V0RGVmYXVsdEV4cG9ydCBmdW5jdGlvbiBmb3IgY29tcGF0aWJpbGl0eSB3aXRoIG5vbi1oYXJtb255IG1vZHVsZXNcbl9fd2VicGFja19yZXF1aXJlX18ubiA9IChtb2R1bGUpID0+IHtcblx0dmFyIGdldHRlciA9IG1vZHVsZSAmJiBtb2R1bGUuX19lc01vZHVsZSA/XG5cdFx0KCkgPT4gKG1vZHVsZVsnZGVmYXVsdCddKSA6XG5cdFx0KCkgPT4gKG1vZHVsZSk7XG5cdF9fd2VicGFja19yZXF1aXJlX18uZChnZXR0ZXIsIHsgYTogZ2V0dGVyIH0pO1xuXHRyZXR1cm4gZ2V0dGVyO1xufTsiLCIvLyBkZWZpbmUgZ2V0dGVyIGZ1bmN0aW9ucyBmb3IgaGFybW9ueSBleHBvcnRzXG5fX3dlYnBhY2tfcmVxdWlyZV9fLmQgPSAoZXhwb3J0cywgZGVmaW5pdGlvbikgPT4ge1xuXHRmb3IodmFyIGtleSBpbiBkZWZpbml0aW9uKSB7XG5cdFx0aWYoX193ZWJwYWNrX3JlcXVpcmVfXy5vKGRlZmluaXRpb24sIGtleSkgJiYgIV9fd2VicGFja19yZXF1aXJlX18ubyhleHBvcnRzLCBrZXkpKSB7XG5cdFx0XHRPYmplY3QuZGVmaW5lUHJvcGVydHkoZXhwb3J0cywga2V5LCB7IGVudW1lcmFibGU6IHRydWUsIGdldDogZGVmaW5pdGlvbltrZXldIH0pO1xuXHRcdH1cblx0fVxufTsiLCJfX3dlYnBhY2tfcmVxdWlyZV9fLm8gPSAob2JqLCBwcm9wKSA9PiAoT2JqZWN0LnByb3RvdHlwZS5oYXNPd25Qcm9wZXJ0eS5jYWxsKG9iaiwgcHJvcCkpIiwiLy8gZGVmaW5lIF9fZXNNb2R1bGUgb24gZXhwb3J0c1xuX193ZWJwYWNrX3JlcXVpcmVfXy5yID0gKGV4cG9ydHMpID0+IHtcblx0aWYodHlwZW9mIFN5bWJvbCAhPT0gJ3VuZGVmaW5lZCcgJiYgU3ltYm9sLnRvU3RyaW5nVGFnKSB7XG5cdFx0T2JqZWN0LmRlZmluZVByb3BlcnR5KGV4cG9ydHMsIFN5bWJvbC50b1N0cmluZ1RhZywgeyB2YWx1ZTogJ01vZHVsZScgfSk7XG5cdH1cblx0T2JqZWN0LmRlZmluZVByb3BlcnR5KGV4cG9ydHMsICdfX2VzTW9kdWxlJywgeyB2YWx1ZTogdHJ1ZSB9KTtcbn07IiwiLypcbiAqIE1JVCBMaWNlbnNlXG4gKlxuICogQ29weXJpZ2h0IChjKSAyMDI1ICBZdXJpaSBZYWt1YmluICh5dXJpaS55YWt1YmluQGdtYWlsLmNvbSlcbiAqXG4gKiBQZXJtaXNzaW9uIGlzIGdyYW50ZWQgdG8gdXNlLCBjb3B5LCBtb2RpZnksIGFuZCBkaXN0cmlidXRlIHRoaXMgc29mdHdhcmVcbiAqIHVuZGVyIHRoZSBNSVQgTGljZW5zZS4gU2VlIExJQ0VOU0UgZmlsZSBmb3IgZGV0YWlscy5cbiAqL1xuXG4vLy8gPHJlZmVyZW5jZSBwYXRoPVwiZ2xvYmFsLmQudHNcIiAvPlxuXG5pbXBvcnQgeyBpc0VudHJ5UG9pbnQgfSBmcm9tIFwiQC91dGlscy9Nb2R1bGVcIjtcbmltcG9ydCAqIGFzIGN4eCBmcm9tIFwiQC9jeHhcIjtcbmltcG9ydCB7IENNYWtlUHJvY2VzcywgQ1Rlc3RQcm9jZXNzLCBTY3JpcHRNb2RlT3B0aW9ucywgZ2V0UHJvamVjdEluZm8gfSBmcm9tIFwiQC9jbWFrZVwiO1xuXG5pbXBvcnQgeyBzcGF3bkFzeW5jIH0gZnJvbSBcIkAvdXRpbHMvQ2hpbGRQcm9jZXNzXCI7XG5pbXBvcnQgeyByZXF1ZXN0R2V0LCBkb3dubG9hZEZpbGUgfSBmcm9tIFwiQC91dGlscy9IdHRwUmVxdWVzdFwiO1xuaW1wb3J0IHsgUGF0aCB9IGZyb20gXCJAL3V0aWxzL1BhdGhcIjtcbmltcG9ydCB7IHJ1blNjcmlwdCB9IGZyb20gXCJAL1J1blNjcmlwdFwiO1xuXG5leHBvcnQgZGVmYXVsdCB7XG4gIGN4eCxcbiAgY21ha2U6IHtcbiAgICBzY3JpcHRNb2RlOiAoc2NyaXB0RmlsZTogc3RyaW5nLCB2YXJpYWJsZXM6IG9iamVjdCwgb3B0aW9ucz86IFNjcmlwdE1vZGVPcHRpb25zKSA9PiBDTWFrZVByb2Nlc3MuZ2V0SW5zdGFuY2UoKS5zY3JpcHRNb2RlKHNjcmlwdEZpbGUsIHZhcmlhYmxlcywgb3B0aW9ucyksXG4gICAgY29uZmlndXJlOiAoYXJnczogYW55KSA9PiBDTWFrZVByb2Nlc3MuZ2V0SW5zdGFuY2UoKS5jb25maWd1cmUoYXJncyksXG4gICAgYnVpbGQ6IChhcmdzOiBhbnkpID0+IENNYWtlUHJvY2Vzcy5nZXRJbnN0YW5jZSgpLmJ1aWxkKGFyZ3MpLFxuICAgIGluc3RhbGw6IChhcmdzOiBhbnkpID0+IENNYWtlUHJvY2Vzcy5nZXRJbnN0YW5jZSgpLmluc3RhbGwoYXJncyksXG4gICAgZXh0cmFjdDogKGFyZ3M6IGFueSkgPT4gQ01ha2VQcm9jZXNzLmdldEluc3RhbmNlKCkuZXh0cmFjdChhcmdzKSxcbiAgICBjdGVzdDogKGFyZ3M6IGFueSkgPT4gQ1Rlc3RQcm9jZXNzLmdldEluc3RhbmNlKCkuY3Rlc3QoYXJncyksXG4gICAgZ2V0UHJvamVjdEluZm8sXG4gIH0sXG4gIHByb2Nlc3M6IHtcbiAgICBzcGF3bjogc3Bhd25Bc3luYyxcbiAgfSxcbiAgdXRpbHM6IHtcbiAgICByZXF1ZXN0R2V0LFxuICAgIGRvd25sb2FkRmlsZSxcbiAgfSxcbiAgcGF0aDogUGF0aCxcbn07XG5cbmlmIChpc0VudHJ5UG9pbnQoKSkge1xuICBydW5TY3JpcHQoKTtcbn1cbiJdLCJuYW1lcyI6W10sInNvdXJjZVJvb3QiOiIifQ==