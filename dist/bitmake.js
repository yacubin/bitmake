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
            await (0,_utils_FileSystem__WEBPACK_IMPORTED_MODULE_6__.saveAsJSON)(scope.GLOBAL_CONTEXT_JSON.toPath(), server.project, { pretty: true });
        }
        const allGoalList = server.project.createGoals(scope);
        const goalList = allGoalList.getTargetList(_Constants__WEBPACK_IMPORTED_MODULE_11__.INSTALL_TARGET);
        if (scope.TARGET_GOALS_JSON) {
            await (0,_utils_FileSystem__WEBPACK_IMPORTED_MODULE_6__.saveAsJSON)(scope.TARGET_GOALS_JSON.toPath(), goalList, { pretty: true });
        }
        let loaded = 0;
        const total = goalList.length;
        for (const iter of goalList) {
            if (iter.output) {
                const outputDir = _utils_Path__WEBPACK_IMPORTED_MODULE_1__.Path.dirname(iter.output);
                await node_fs__WEBPACK_IMPORTED_MODULE_0___default().promises.mkdir(outputDir, { recursive: true });
            }
            if (iter.message) {
                const relationOfLength = Math.round(((loaded + 1) / total) * 100);
                const percent = "[" + relationOfLength.toString().padStart(3, " ") + "%] ";
                logger.notice(percent + iter.message);
            }
            await iter.doWork();
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
    toPath() {
        if (this[PATH].startsWith(_utils_UrlScheme__WEBPACK_IMPORTED_MODULE_2__.FILE_SCHEME))
            return node_url__WEBPACK_IMPORTED_MODULE_0___default().fileURLToPath(this[PATH]);
        throw new Error(`URL ${this[PATH]} can't convert to path`);
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
/* harmony import */ var _core_MakeInterfaces__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! @/core/MakeInterfaces */ "./src/core/MakeInterfaces.ts");
/* harmony import */ var _core_FindProgram__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! @/core/FindProgram */ "./src/core/FindProgram.ts");
/* harmony import */ var _core_Scope__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! @/core/Scope */ "./src/core/Scope.ts");
/* harmony import */ var _core_AbsolutePath__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! @/core/AbsolutePath */ "./src/core/AbsolutePath.ts");
/* harmony import */ var _utils_Module__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! @/utils/Module */ "./src/utils/Module.ts");
/* harmony import */ var _core_Target__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(/*! @/core/Target */ "./src/core/Target.ts");
/* harmony import */ var _Constants__WEBPACK_IMPORTED_MODULE_6__ = __webpack_require__(/*! @/Constants */ "./src/Constants.ts");
/* harmony import */ var _core_CustomScript__WEBPACK_IMPORTED_MODULE_7__ = __webpack_require__(/*! @/core/CustomScript */ "./src/core/CustomScript.ts");
/* harmony import */ var _core_InstallEntity__WEBPACK_IMPORTED_MODULE_8__ = __webpack_require__(/*! @/core/InstallEntity */ "./src/core/InstallEntity.ts");
/* harmony import */ var _core_ScriptCollection__WEBPACK_IMPORTED_MODULE_9__ = __webpack_require__(/*! @/core/ScriptCollection */ "./src/core/ScriptCollection.ts");
/* harmony import */ var _core_TargetName__WEBPACK_IMPORTED_MODULE_10__ = __webpack_require__(/*! @/core/TargetName */ "./src/core/TargetName.ts");
/* harmony import */ var _logger__WEBPACK_IMPORTED_MODULE_11__ = __webpack_require__(/*! @/logger */ "./src/logger/index.ts");
/*
 * MIT License
 *
 * Copyright (c) 2025  Yurii Yakubin (yurii.yakubin@gmail.com)
 *
 * Permission is granted to use, copy, modify, and distribute this software
 * under the MIT License. See LICENSE file for details.
 */












const logger = _logger__WEBPACK_IMPORTED_MODULE_11__.Logger.create("file:///mnt/c/opt/work/source/darkit-sdk/external/bitmake/src/core/BaseContext.ts");
class GeneralContext {
    _scope;
    constructor(scope) {
        this._scope = scope;
    }
    findProgram(name) {
        return (0,_core_FindProgram__WEBPACK_IMPORTED_MODULE_1__.findProgramSync)(name);
    }
    getProperty(name) {
        return _core_Scope__WEBPACK_IMPORTED_MODULE_2__.ScopeHelper.get(this._scope, name);
    }
    setProperty(name, value) {
        const entry = this._scope[name];
        if (entry)
            _core_Scope__WEBPACK_IMPORTED_MODULE_2__.ScopeHelper.setEntryValue(entry, value);
        else
            _core_Scope__WEBPACK_IMPORTED_MODULE_2__.ScopeHelper.defineVariable(this._scope, "", name, { value });
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
    _postTargets = new Map();
    _scriptCollection = _core_ScriptCollection__WEBPACK_IMPORTED_MODULE_9__.ScriptCollection.create();
    _postScripts = new Map();
    _installList = new Array();
    constructor(scope) {
        super(scope);
    }
    get targets() {
        return this._targets;
    }
    get postTargets() {
        return this._postTargets;
    }
    get scriptCollection() {
        return this._scriptCollection;
    }
    get postScripts() {
        return this._postScripts;
    }
    get installList() {
        return this._installList;
    }
    getCacheVariables() {
        return _core_Scope__WEBPACK_IMPORTED_MODULE_2__.ScopeHelper.getVariablesByGroup(this._scope, _Constants__WEBPACK_IMPORTED_MODULE_6__.CUSTOM_VARIABLE_GROUP);
    }
    addIncludeDirectories(...dirs) {
        const sourceDir = _core_Scope__WEBPACK_IMPORTED_MODULE_2__.ScopeHelper.get(this._scope, "SOURCE_DIR");
        for (const iter of dirs.flat())
            _core_Scope__WEBPACK_IMPORTED_MODULE_2__.ScopeHelper.get(this._scope, "INCLUDES").push(sourceDir.resolve(iter));
    }
    getPostTarget(name) {
        let target = this._postTargets.get(name);
        if (!target) {
            target = _core_Target__WEBPACK_IMPORTED_MODULE_5__.PostTarget.create(name);
            this._postTargets.set(name, target);
        }
        return target;
    }
    hasMainTarget(name) {
        return this._targets.has(name);
    }
    addMainTarget(name, target) {
        this._targets.set(name, target);
    }
    script(name) {
        let script = this._postScripts.get(name);
        if (!script) {
            script = _core_CustomScript__WEBPACK_IMPORTED_MODULE_7__.PostCustomScript.create(name);
            this._postScripts.set(name, script);
        }
        return script;
    }
    addCustomScript(scriptModule, params) {
        const variableMap = _core_Scope__WEBPACK_IMPORTED_MODULE_2__.ScopeHelper.cloneVariableMap(this._scope);
        _core_Scope__WEBPACK_IMPORTED_MODULE_2__.ScopeHelper.extendVariableMapByValues(variableMap, _Constants__WEBPACK_IMPORTED_MODULE_6__.CUSTOM_VARIABLE_GROUP, params);
        _core_Scope__WEBPACK_IMPORTED_MODULE_2__.ScopeHelper.set(variableMap, "SCRIPT_MODULE", scriptModule);
        const sourceDir = _core_Scope__WEBPACK_IMPORTED_MODULE_2__.ScopeHelper.get(variableMap, "SOURCE_DIR");
        const binaryDir = _core_Scope__WEBPACK_IMPORTED_MODULE_2__.ScopeHelper.get(variableMap, "BINARY_DIR");
        let inputFile = _core_Scope__WEBPACK_IMPORTED_MODULE_2__.ScopeHelper.get(variableMap, "SCRIPT_INPUT");
        if (inputFile)
            inputFile = sourceDir.resolve(inputFile);
        let outputFile = _core_Scope__WEBPACK_IMPORTED_MODULE_2__.ScopeHelper.get(variableMap, "SCRIPT_OUTPUT");
        if (!outputFile)
            throw new Error("CustomScript parameters required output entity");
        outputFile = sourceDir.resolve(outputFile);
        const options = {
            variableMap,
            name: _core_Scope__WEBPACK_IMPORTED_MODULE_2__.ScopeHelper.get(variableMap, "SCRIPT_NAME"),
            scriptModule,
            output: outputFile,
            input: inputFile,
            sourceDir,
            binaryDir,
        };
        const target = _core_CustomScript__WEBPACK_IMPORTED_MODULE_7__.CustomScript.create(options);
        this._scriptCollection.add(target, options.name);
        return target;
    }
    install(value, params) {
        const scope = _core_Scope__WEBPACK_IMPORTED_MODULE_2__.ScopeHelper.createVariableValues(this._scope);
        for (const it of [value].flat()) {
            const iter = (it instanceof _core_MakeInterfaces__WEBPACK_IMPORTED_MODULE_0__.InterfaceTarget) ? _core_TargetName__WEBPACK_IMPORTED_MODULE_10__.TargetName.create(it.targetName) : it;
            const entity = _core_InstallEntity__WEBPACK_IMPORTED_MODULE_8__.InstallEntity.create(scope, iter, params);
            this._installList.push(entity);
        }
    }
    getVariableMap() {
        return this._scope;
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
            const binaryDir1 = _core_Scope__WEBPACK_IMPORTED_MODULE_2__.ScopeHelper.get(variableMap, "PROJECT_BINARY_DIR").relative(sourceDir);
            const binaryDir2 = _core_Scope__WEBPACK_IMPORTED_MODULE_2__.ScopeHelper.get(variableMap, "PROJECT_SOURCE_DIR").relative(sourceDir);
            binaryDir = (binaryDir1.length > binaryDir2.length) ? binaryDir2 : binaryDir1;
        }
    }
    const SOURCE_DIR = _core_Scope__WEBPACK_IMPORTED_MODULE_2__.ScopeHelper.get(variableMap, "SOURCE_DIR").resolve(sourceDir);
    const BINARY_DIR = _core_Scope__WEBPACK_IMPORTED_MODULE_2__.ScopeHelper.get(variableMap, "BINARY_DIR").resolve(binaryDir);
    const newVariableMap = _core_Scope__WEBPACK_IMPORTED_MODULE_2__.ScopeHelper.cloneVariableMap(variableMap);
    _core_Scope__WEBPACK_IMPORTED_MODULE_2__.ScopeHelper.set(newVariableMap, "SOURCE_DIR", SOURCE_DIR);
    _core_Scope__WEBPACK_IMPORTED_MODULE_2__.ScopeHelper.set(newVariableMap, "BINARY_DIR", BINARY_DIR);
    _core_Scope__WEBPACK_IMPORTED_MODULE_2__.ScopeHelper.reset(newVariableMap, "SCRIPT_DIR");
    _core_Scope__WEBPACK_IMPORTED_MODULE_2__.ScopeHelper.reset(newVariableMap, "SCRIPT_FILE");
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
/* harmony export */   CustomScript: () => (/* binding */ CustomScript),
/* harmony export */   PostCustomScript: () => (/* binding */ PostCustomScript)
/* harmony export */ });
/* harmony import */ var _core_MakeInterfaces__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! @/core/MakeInterfaces */ "./src/core/MakeInterfaces.ts");
/* harmony import */ var _core_Scope__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! @/core/Scope */ "./src/core/Scope.ts");
/* harmony import */ var _core_SimpleObject__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! @/core/SimpleObject */ "./src/core/SimpleObject.ts");
/*
 * MIT License
 *
 * Copyright (c) 2025  Yurii Yakubin (yurii.yakubin@gmail.com)
 *
 * Permission is granted to use, copy, modify, and distribute this software
 * under the MIT License. See LICENSE file for details.
 */



class PostCustomScript extends _core_MakeInterfaces__WEBPACK_IMPORTED_MODULE_0__.InterfaceScript {
    _name;
    _variables;
    constructor(name, variables) {
        super();
        this._name = name;
        this._variables = variables || {};
    }
    static create(name, variables) {
        return Object.seal(new PostCustomScript(name, variables));
    }
    static fromJSON(object) {
        return PostCustomScript.create(object.name, object.variables);
    }
    get variables() {
        return this._variables;
    }
    mergeVariables(variables) {
        _core_Scope__WEBPACK_IMPORTED_MODULE_1__.ScopeHelper.mergeVariables(this._variables, variables);
    }
    toJSON() {
        return {
            type: PostCustomScript.name,
            name: this._name,
            variables: this._variables,
        };
    }
    toString() {
        return `[object ${PostCustomScript.name}]`;
    }
}
;
const SCOPE = Symbol("SCOPE");
const NAME = Symbol("NAME");
const INPUT = Symbol("INPUT");
const OUTPUT = Symbol("OUTPUT");
class CustomScript extends _core_MakeInterfaces__WEBPACK_IMPORTED_MODULE_0__.InterfaceScript {
    [SCOPE];
    [NAME];
    _scriptModule;
    [INPUT];
    [OUTPUT];
    _sourceDir;
    _binaryDir;
    constructor(options) {
        super();
        this[SCOPE] = options.variableMap;
        this[NAME] = options.name || "";
        this[INPUT] = options.input;
        this._scriptModule = options.scriptModule;
        this[OUTPUT] = options.output;
        this._sourceDir = options.sourceDir;
        this._binaryDir = options.binaryDir;
    }
    static create(options) {
        return Object.seal(new CustomScript(options));
    }
    mergeVariables(variables) {
        _core_Scope__WEBPACK_IMPORTED_MODULE_1__.ScopeHelper.mergeVariableMap(this[SCOPE], variables);
    }
    get NAME() {
        return this[NAME];
    }
    get scriptModule() {
        return this._scriptModule;
    }
    get INPUT() {
        return this[INPUT];
    }
    get OUTPUT() {
        return this[OUTPUT];
    }
    get sourceDir() {
        return this._sourceDir;
    }
    get binaryDir() {
        return this._binaryDir;
    }
    get variableMap() {
        return this[SCOPE];
    }
    postUpdate(script) {
        this.mergeVariables(script.variables);
    }
    toJSON() {
        return {
            variableMap: this[SCOPE],
            NAME: this[NAME],
            scriptModule: this._scriptModule,
            INPUT: this.INPUT,
            OUTPUT: this.OUTPUT,
            sourceDir: this._sourceDir,
            binaryDir: this._binaryDir,
        };
    }
}
;
(function (CustomScript) {
    ;
})(CustomScript || (CustomScript = {})); // namespace CustomScript
_core_SimpleObject__WEBPACK_IMPORTED_MODULE_2__.SimpleObject.registerInstanceCreator(PostCustomScript.name, PostCustomScript.fromJSON);


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

/***/ "./src/core/ExecScriptTask.ts":
/*!************************************!*\
  !*** ./src/core/ExecScriptTask.ts ***!
  \************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   ExecScriptTask: () => (/* binding */ ExecScriptTask)
/* harmony export */ });
/* harmony import */ var _core_MakeInterfaces__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! @/core/MakeInterfaces */ "./src/core/MakeInterfaces.ts");
/* harmony import */ var _core_AbsolutePath__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! @/core/AbsolutePath */ "./src/core/AbsolutePath.ts");
/* harmony import */ var _utils_Module__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! @/utils/Module */ "./src/utils/Module.ts");
/* harmony import */ var _core_ScriptContext__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! @/core/ScriptContext */ "./src/core/ScriptContext.ts");
/* harmony import */ var _logger__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! @/logger */ "./src/logger/index.ts");
/*
 * MIT License
 *
 * Copyright (c) 2025  Yurii Yakubin (yurii.yakubin@gmail.com)
 *
 * Permission is granted to use, copy, modify, and distribute this software
 * under the MIT License. See LICENSE file for details.
 */





const logger = _logger__WEBPACK_IMPORTED_MODULE_4__.Logger.create("file:///mnt/c/opt/work/source/darkit-sdk/external/bitmake/src/core/ExecScriptTask.ts");
class ExecScriptTask extends _core_MakeInterfaces__WEBPACK_IMPORTED_MODULE_0__.InterfaceTask {
    _variableMap;
    _script;
    constructor(variableMap, script) {
        super();
        this._variableMap = variableMap;
        this._script = script;
    }
    async execute() {
        let func = this._script;
        if (func instanceof _core_AbsolutePath__WEBPACK_IMPORTED_MODULE_1__.AbsolutePath) {
            const scriptUrl = func.toJSON(); // TODO: toString()
            logger.debug("Import", scriptUrl);
            func = (await (0,_utils_Module__WEBPACK_IMPORTED_MODULE_2__.importModule)(scriptUrl)).default;
        }
        if (func instanceof Function) {
            const mk = _core_ScriptContext__WEBPACK_IMPORTED_MODULE_3__.ScriptContext.create(this._variableMap);
            const result = func(mk);
            if (result instanceof Promise)
                await result;
        }
        else {
            throw new Error(`There is no Function`);
        }
    }
    toJSON() {
        return {
            type: ExecScriptTask.name,
            variableMap: this._variableMap,
            script: this._script,
        };
    }
}
;


/***/ }),

/***/ "./src/core/FileInstallationTask.ts":
/*!******************************************!*\
  !*** ./src/core/FileInstallationTask.ts ***!
  \******************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   FileInstallationTask: () => (/* binding */ FileInstallationTask)
/* harmony export */ });
/* harmony import */ var node_fs__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! node:fs */ "node:fs");
/* harmony import */ var node_fs__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(node_fs__WEBPACK_IMPORTED_MODULE_0__);
/* harmony import */ var _core_MakeInterfaces__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! @/core/MakeInterfaces */ "./src/core/MakeInterfaces.ts");
/* harmony import */ var _core_SimpleObject__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! @/core/SimpleObject */ "./src/core/SimpleObject.ts");
/* harmony import */ var _logger__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! @/logger */ "./src/logger/index.ts");
/*
 * MIT License
 *
 * Copyright (c) 2025  Yurii Yakubin (yurii.yakubin@gmail.com)
 *
 * Permission is granted to use, copy, modify, and distribute this software
 * under the MIT License. See LICENSE file for details.
 */




const logger = _logger__WEBPACK_IMPORTED_MODULE_3__.Logger.create("file:///mnt/c/opt/work/source/darkit-sdk/external/bitmake/src/core/FileInstallationTask.ts");
;
class FileInstallationTask extends _core_MakeInterfaces__WEBPACK_IMPORTED_MODULE_1__.InterfaceTask {
    _entries;
    constructor() {
        super();
        this._entries = [];
    }
    async execute() {
        for (const { src, dest } of this._entries) {
            logger.notice("Installing: " + dest);
            await node_fs__WEBPACK_IMPORTED_MODULE_0___default().promises.mkdir(dest.dirname().toPath(), { recursive: true });
            await node_fs__WEBPACK_IMPORTED_MODULE_0___default().promises.cp(src.toPath(), dest.toPath(), { force: true });
        }
    }
    add(src, dest) {
        this._entries.push({ src, dest });
    }
    static fromJSON(o) {
        const task = new FileInstallationTask;
        for (const iter of o.entries)
            task._entries.push(iter);
        return task;
    }
    toJSON() {
        return {
            type: FileInstallationTask.name,
            entries: this._entries,
        };
    }
}
;
_core_SimpleObject__WEBPACK_IMPORTED_MODULE_2__.SimpleObject.registerInstanceCreator(FileInstallationTask.name, FileInstallationTask.fromJSON);


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
/* harmony export */   GoalCollection: () => (/* binding */ GoalCollection),
/* harmony export */   GoalTarget: () => (/* binding */ GoalTarget)
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
class GoalTarget {
    _message;
    _name;
    _output;
    _depends = new Array;
    _tasks = new Array;
    constructor(name) {
        this._name = name;
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
        this._output = value.toPath();
    }
    get depends() {
        return this._depends;
    }
    addDependency(...value) {
        this._depends.push(...value);
    }
    addTask(task) {
        this._tasks.push(task);
    }
    async doWork() {
        for (const task of this._tasks) {
            const res = task.execute();
            if (res instanceof Promise)
                await res;
        }
    }
    toJSON() {
        const json = {
            type: GoalTarget.name,
            depends: this._depends,
            tasks: this._tasks,
        };
        if (this._message) {
            json.message = this._message;
        }
        if (this._name) {
            json.name = this._name;
        }
        if (this._output) {
            json.output = this._output;
        }
        return json;
    }
}
;
class GoalCollection {
    _entries = new Array;
    get ENTRIES() {
        return this._entries;
    }
    addTarget(ge) {
        if (ge.name && this._entries.find((i) => i.name === ge.name))
            throw new Error(`Nmae "${ge.name}" exists`);
        if (ge.output && this._entries.find((i) => i.output === ge.output))
            throw new Error(`Output "${ge.output}" exists`);
        this._entries.push(ge);
    }
    getTarget(name) {
        if (!name)
            return undefined;
        return this._entries.find((i) => i.name === name);
    }
    addTargetListImpl(name, result) {
        if (result.find(i => i.name === name || i.output === name)) {
            return;
        }
        const goal = this._entries.find(i => i.name === name || i.output === name);
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
        return {
            type: GoalCollection.name,
            entries: this._entries,
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
/* harmony import */ var _core_TargetName__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! @/core/TargetName */ "./src/core/TargetName.ts");
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
        else if (!(value instanceof _core_TargetName__WEBPACK_IMPORTED_MODULE_0__.TargetName)) {
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

/***/ "./src/core/LocalMakeContext.ts":
/*!**************************************!*\
  !*** ./src/core/LocalMakeContext.ts ***!
  \**************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   LocalMakeContext: () => (/* binding */ LocalMakeContext)
/* harmony export */ });
/* harmony import */ var _core_BaseContext__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! @/core/BaseContext */ "./src/core/BaseContext.ts");
/* harmony import */ var _utils_FileSystem__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! @/utils/FileSystem */ "./src/utils/FileSystem.ts");
/* harmony import */ var _core_Scope__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! @/core/Scope */ "./src/core/Scope.ts");
/* harmony import */ var _utils_Module__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! @/utils/Module */ "./src/utils/Module.ts");
/* harmony import */ var _Constants__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! @/Constants */ "./src/Constants.ts");
/* harmony import */ var _logger__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(/*! @/logger */ "./src/logger/index.ts");
/*
 * MIT License
 *
 * Copyright (c) 2025  Yurii Yakubin (yurii.yakubin@gmail.com)
 *
 * Permission is granted to use, copy, modify, and distribute this software
 * under the MIT License. See LICENSE file for details.
 */






const logger = _logger__WEBPACK_IMPORTED_MODULE_5__.Logger.create("file:///mnt/c/opt/work/source/darkit-sdk/external/bitmake/src/core/LocalMakeContext.ts");
class LocalMakeContext extends _core_BaseContext__WEBPACK_IMPORTED_MODULE_0__.MakeContext {
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
            const filename = _core_Scope__WEBPACK_IMPORTED_MODULE_2__.ScopeHelper.get(this._scope, "SOURCE_DIR").resolve(params).toString();
            if (!(0,_utils_FileSystem__WEBPACK_IMPORTED_MODULE_1__.fileExistsSync)(filename))
                return;
            variables = (0,_utils_Module__WEBPACK_IMPORTED_MODULE_3__.requireSync)(filename);
        }
        _core_Scope__WEBPACK_IMPORTED_MODULE_2__.ScopeHelper.defineVariablesInVariableMap(this._scope, _Constants__WEBPACK_IMPORTED_MODULE_4__.CUSTOM_VARIABLE_GROUP, variables);
    }
    addSubdirectory(sourceDir, binaryDir) {
        this._project.addSubdirectory(this._scope, sourceDir, binaryDir);
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
/* harmony export */   InterfaceScript: () => (/* binding */ InterfaceScript),
/* harmony export */   InterfaceSourceFiles: () => (/* binding */ InterfaceSourceFiles),
/* harmony export */   InterfaceTarget: () => (/* binding */ InterfaceTarget),
/* harmony export */   InterfaceTask: () => (/* binding */ InterfaceTask)
/* harmony export */ });
/*
 * MIT License
 *
 * Copyright (c) 2025  Yurii Yakubin (yurii.yakubin@gmail.com)
 *
 * Permission is granted to use, copy, modify, and distribute this software
 * under the MIT License. See LICENSE file for details.
 */
class InterfaceTask {
}
;
class InterfaceSourceFiles {
}
;
class InterfaceTarget {
}
;
class InterfaceScript {
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
/* harmony export */   ProjectContext: () => (/* binding */ ProjectContext)
/* harmony export */ });
/* harmony import */ var node_fs__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! node:fs */ "node:fs");
/* harmony import */ var node_fs__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(node_fs__WEBPACK_IMPORTED_MODULE_0__);
/* harmony import */ var _Constants__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! @/Constants */ "./src/Constants.ts");
/* harmony import */ var _core_AbsolutePath__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! @/core/AbsolutePath */ "./src/core/AbsolutePath.ts");
/* harmony import */ var _utils_FileSystem__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! @/utils/FileSystem */ "./src/utils/FileSystem.ts");
/* harmony import */ var _core_TargetCollection__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! @/core/TargetCollection */ "./src/core/TargetCollection.ts");
/* harmony import */ var _core_ScriptCollection__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(/*! @/core/ScriptCollection */ "./src/core/ScriptCollection.ts");
/* harmony import */ var _core_GoalCollection__WEBPACK_IMPORTED_MODULE_6__ = __webpack_require__(/*! @/core/GoalCollection */ "./src/core/GoalCollection.ts");
/* harmony import */ var _core_UserMakeContext__WEBPACK_IMPORTED_MODULE_7__ = __webpack_require__(/*! @/core/UserMakeContext */ "./src/core/UserMakeContext.ts");
/* harmony import */ var _core_LocalMakeContext__WEBPACK_IMPORTED_MODULE_8__ = __webpack_require__(/*! @/core/LocalMakeContext */ "./src/core/LocalMakeContext.ts");
/* harmony import */ var _utils_Module__WEBPACK_IMPORTED_MODULE_9__ = __webpack_require__(/*! @/utils/Module */ "./src/utils/Module.ts");
/* harmony import */ var _logger__WEBPACK_IMPORTED_MODULE_10__ = __webpack_require__(/*! @/logger */ "./src/logger/index.ts");
/* harmony import */ var _core_TargetName__WEBPACK_IMPORTED_MODULE_11__ = __webpack_require__(/*! @/core/TargetName */ "./src/core/TargetName.ts");
/* harmony import */ var _core_ScriptContext__WEBPACK_IMPORTED_MODULE_12__ = __webpack_require__(/*! @/core/ScriptContext */ "./src/core/ScriptContext.ts");
/* harmony import */ var _Scope__WEBPACK_IMPORTED_MODULE_13__ = __webpack_require__(/*! ./Scope */ "./src/core/Scope.ts");
/* harmony import */ var _core_TargetFile__WEBPACK_IMPORTED_MODULE_14__ = __webpack_require__(/*! @/core/TargetFile */ "./src/core/TargetFile.ts");
/* harmony import */ var _core_ExecScriptTask__WEBPACK_IMPORTED_MODULE_15__ = __webpack_require__(/*! @/core/ExecScriptTask */ "./src/core/ExecScriptTask.ts");
/* harmony import */ var _core_SpawnSyncTask__WEBPACK_IMPORTED_MODULE_16__ = __webpack_require__(/*! @/core/SpawnSyncTask */ "./src/core/SpawnSyncTask.ts");
/* harmony import */ var _core_FileInstallationTask__WEBPACK_IMPORTED_MODULE_17__ = __webpack_require__(/*! @/core/FileInstallationTask */ "./src/core/FileInstallationTask.ts");
/* harmony import */ var _core_BaseContext__WEBPACK_IMPORTED_MODULE_18__ = __webpack_require__(/*! @/core/BaseContext */ "./src/core/BaseContext.ts");
/* harmony import */ var _core_BuildinScripts__WEBPACK_IMPORTED_MODULE_19__ = __webpack_require__(/*! @/core/BuildinScripts */ "./src/core/BuildinScripts/index.ts");
/*
 * MIT License
 *
 * Copyright (c) 2025  Yurii Yakubin (yurii.yakubin@gmail.com)
 *
 * Permission is granted to use, copy, modify, and distribute this software
 * under the MIT License. See LICENSE file for details.
 */




















const logger = _logger__WEBPACK_IMPORTED_MODULE_10__.Logger.create("file:///mnt/c/opt/work/source/darkit-sdk/external/bitmake/src/core/ProjectContext.ts");
const TARGETS = Symbol("TARGETS");
const CUSTOM_SCRIPTS = Symbol("CUSTOM_SCRIPTS");
const CACHE = Symbol("CACHE");
const BUILTIN_SCRIPTS = Symbol("BUILTIN_SCRIPTS");
;
function ensureValueByType(type, value) {
    if (Array.isArray(type) ? type.includes(value) : typeof value === type)
        return value;
    throw new Error(`The '${value}' is not a ${type}`);
}
function resolveInstance(project, o) {
    if (typeof o === "string")
        return o;
    if (o instanceof _core_AbsolutePath__WEBPACK_IMPORTED_MODULE_2__.AbsolutePath)
        return o.toString();
    if (o instanceof _core_TargetFile__WEBPACK_IMPORTED_MODULE_14__.TargetFile) {
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
class ProjectContext {
    [TARGETS];
    [CUSTOM_SCRIPTS];
    [CACHE];
    _installList;
    _processedVariableMap;
    [BUILTIN_SCRIPTS];
    _subdirAlias;
    _subdirList;
    constructor() {
        this[TARGETS] = _core_TargetCollection__WEBPACK_IMPORTED_MODULE_4__.TargetCollection.create();
        this[CUSTOM_SCRIPTS] = _core_ScriptCollection__WEBPACK_IMPORTED_MODULE_5__.ScriptCollection.create();
        this[CACHE] = {};
        this._installList = [];
        this._processedVariableMap = {};
        this._subdirAlias = {};
        this[BUILTIN_SCRIPTS] = _core_BuildinScripts__WEBPACK_IMPORTED_MODULE_19__["default"];
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
        const srcPath = _core_AbsolutePath__WEBPACK_IMPORTED_MODULE_2__.AbsolutePath.create(_Scope__WEBPACK_IMPORTED_MODULE_13__.ScopeHelper.get(variableMap, "SOURCE_DIR").resolve(src));
        const destPath = (dest === null) ? null : _core_AbsolutePath__WEBPACK_IMPORTED_MODULE_2__.AbsolutePath.create(_Scope__WEBPACK_IMPORTED_MODULE_13__.ScopeHelper.get(variableMap, "SOURCE_DIR").resolve(dest));
        const srcStr = srcPath.toString();
        if (this._subdirAlias.hasOwnProperty(srcStr))
            logger.warn(`Owerride "${srcStr}" subdirectory alias`);
        this._subdirAlias[srcStr] = destPath;
    }
    addCacheVariables(variables) {
        const cache = this[CACHE];
        for (const [key, entry] of Object.entries(variables)) {
            cache[key] = entry;
        }
    }
    loadCacheVariables(filename) {
        if ((0,_utils_FileSystem__WEBPACK_IMPORTED_MODULE_3__.fileExistsSync)(filename.toString())) {
            const variables = (0,_utils_Module__WEBPACK_IMPORTED_MODULE_9__.requireSync)(filename.toString());
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
        const newVariableMap = _Scope__WEBPACK_IMPORTED_MODULE_13__.ScopeHelper.cloneVariableMap(variableMap);
        params && _Scope__WEBPACK_IMPORTED_MODULE_13__.ScopeHelper.extendVariableMapByValues(newVariableMap, "", params);
        const scriptPath = _Scope__WEBPACK_IMPORTED_MODULE_13__.ScopeHelper.get(newVariableMap, "SOURCE_DIR").resolve(script);
        const func = (0,_utils_Module__WEBPACK_IMPORTED_MODULE_9__.requireSync)(scriptPath.toString());
        const mk = _core_ScriptContext__WEBPACK_IMPORTED_MODULE_12__.ScriptContext.create(newVariableMap);
        func(mk);
    }
    writeCacheVariables(filename) {
        const json = JSON.stringify(this[CACHE], null, 2);
        node_fs__WEBPACK_IMPORTED_MODULE_0___default().writeFileSync(filename, json, "utf-8");
    }
    async prepearScriptFile(variableMap) {
        const originSourceDir = _Scope__WEBPACK_IMPORTED_MODULE_13__.ScopeHelper.get(variableMap, "SOURCE_DIR").toString();
        const resolveSourceDir = this.resolveSubdirectory(originSourceDir);
        if (!resolveSourceDir) {
            logger.info(`Source dir "${originSourceDir}" was disabled`);
            return false;
        }
        _Scope__WEBPACK_IMPORTED_MODULE_13__.ScopeHelper.set(variableMap, "SOURCE_DIR", resolveSourceDir);
        if (!_Scope__WEBPACK_IMPORTED_MODULE_13__.ScopeHelper.get(variableMap, "SCRIPT_FILE")) {
            let scriptFile;
            const fileList = [".js", ".mjs"].map(i => "MakeScript" + i);
            for (const filename of fileList) {
                const iter = _Scope__WEBPACK_IMPORTED_MODULE_13__.ScopeHelper.get(variableMap, "SOURCE_DIR").join(filename);
                if (await (0,_utils_FileSystem__WEBPACK_IMPORTED_MODULE_3__.fileExists)(iter.toString())) {
                    scriptFile = iter;
                    break;
                }
            }
            if (!scriptFile)
                throw new Error(`There are no files ${fileList.join(", ")} in "${_Scope__WEBPACK_IMPORTED_MODULE_13__.ScopeHelper.get(variableMap, "SOURCE_DIR")}"`);
            _Scope__WEBPACK_IMPORTED_MODULE_13__.ScopeHelper.set(variableMap, "SCRIPT_FILE", scriptFile);
            _Scope__WEBPACK_IMPORTED_MODULE_13__.ScopeHelper.set(variableMap, "SCRIPT_DIR", _Scope__WEBPACK_IMPORTED_MODULE_13__.ScopeHelper.get(variableMap, "SCRIPT_FILE").dirname());
        }
        this.registerVariableMap(_Scope__WEBPACK_IMPORTED_MODULE_13__.ScopeHelper.get(variableMap, "SCRIPT_FILE").toString(), variableMap);
        return true;
    }
    addSubdirectory(variableMap, sourceDir, binaryDir) {
        const newVariableMap = (0,_core_BaseContext__WEBPACK_IMPORTED_MODULE_18__.createVariableMapForDirectory)(variableMap, sourceDir, binaryDir);
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
            const ctx = new _core_LocalMakeContext__WEBPACK_IMPORTED_MODULE_8__.LocalMakeContext(variableMap, this);
            contextList.push(ctx);
            const mk = _core_UserMakeContext__WEBPACK_IMPORTED_MODULE_7__.UserMakeContext.create(ctx, variableMap);
            const cwdSave = process.cwd();
            process.chdir(mk.SCRIPT_DIR.toString());
            await (0,_core_BaseContext__WEBPACK_IMPORTED_MODULE_18__.performContext)(mk);
            process.chdir(cwdSave);
        }
        for (const ctx of contextList) {
            for (const [name, target] of ctx.targets)
                this[TARGETS].set(name, target);
            for (const iter of ctx.scriptCollection.ENTRIES)
                this[CUSTOM_SCRIPTS].add(iter, iter.NAME);
            this._installList.push(...ctx.installList);
        }
        for (const ctx of contextList) {
            for (const [name, postTarget] of ctx.postTargets) {
                const target = this[TARGETS].get(name);
                if (!target)
                    throw new Error(`There is no Target named ${name}`);
                target.postUpdate(postTarget);
            }
            for (const [name, postScript] of ctx.postScripts) {
                const script = this[CUSTOM_SCRIPTS].get(name);
                if (!script)
                    throw new Error(`There is no CustomScript named ${name}`);
                script.postUpdate(postScript);
            }
        }
    }
    createGoals(scope) {
        const goalList = new _core_GoalCollection__WEBPACK_IMPORTED_MODULE_6__.GoalCollection;
        for (const script of this[CUSTOM_SCRIPTS].ENTRIES) {
            const depends = [];
            let scriptObj;
            if (typeof script.scriptModule === "string") {
                const func = this.findScriptFunction(script.scriptModule);
                scriptObj = func ? func : script.sourceDir.resolve(script.scriptModule);
            }
            else {
                depends.push(script.scriptModule.toPath());
                scriptObj = script.scriptModule;
            }
            if (script.INPUT) {
                depends.push(script.INPUT.toPath());
            }
            const msg = "\x1b[36m" + "Generating " + script.binaryDir.relative(script.OUTPUT) + "\x1b[0m";
            const ge = new _core_GoalCollection__WEBPACK_IMPORTED_MODULE_6__.GoalTarget(script.NAME);
            ge.message = msg;
            ge.output = script.OUTPUT;
            ge.addDependency(...depends);
            ge.addTask(new _core_ExecScriptTask__WEBPACK_IMPORTED_MODULE_15__.ExecScriptTask(script.variableMap, scriptObj));
            goalList.addTarget(ge);
        }
        const objectFiles = new Map();
        for (const target of this[TARGETS].ENTRIES.values()) {
            for (const it of target.getSourceFiles()) {
                if (!it.LANGUAGE)
                    continue;
                const rfile1 = target.binaryDir.relative(it.FILE);
                const rfile2 = target.sourceDir.relative(it.FILE);
                const rfile = (rfile2.length < rfile1.length ? rfile2 : rfile1).replace("../", "__/");
                const ofile = target.binaryDir.join("MakeFiles", target.targetName + ".dir", rfile + ".obj");
                objectFiles.set(it, ofile);
            }
        }
        for (const [name, target] of this[TARGETS].ENTRIES) {
            const depends = [];
            for (const s of target.getTargetObjects()) {
                const t = this[TARGETS].get(s.targetName);
                for (const f of t.getSourceFiles()) {
                    const o = objectFiles.get(f);
                    o && depends.push(o.toString());
                }
            }
            const headers = this[TARGETS].allHeadersOf(target);
            for (const s of target.getSourceFiles()) {
                if (s.HEADER_FILE_ONLY)
                    continue;
                const o = objectFiles.get(s);
                if (!o)
                    throw new Error(`OBJECT_FILE is null`);
                node_fs__WEBPACK_IMPORTED_MODULE_0___default().mkdirSync(o.dirname().toString(), { recursive: true });
                const relativeObject = target.binaryDir.relative(o);
                const relativeBinaryDir = scope.PROJECT_BINARY_DIR.relative(target.binaryDir);
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
                const output = _core_AbsolutePath__WEBPACK_IMPORTED_MODULE_2__.AbsolutePath.create(target.binaryDir.join(relativeObject));
                depends.push(output.toString());
                const ge = new _core_GoalCollection__WEBPACK_IMPORTED_MODULE_6__.GoalTarget;
                ge.message = msg;
                ge.output = output;
                ge.addDependency(...headers);
                ge.addDependency(s.FILE.toPath());
                ge.addTask(new _core_SpawnSyncTask__WEBPACK_IMPORTED_MODULE_16__.SpawnSyncTask(s.COMPILE_PATH.toString(), args, target.binaryDir.toPath()));
                goalList.addTarget(ge);
            }
            const generalGoal = new _core_GoalCollection__WEBPACK_IMPORTED_MODULE_6__.GoalTarget;
            for (const params of target.preBuildList) {
                const execStruct = resolveTargetCommand(this, params);
                generalGoal.addTask(new _core_SpawnSyncTask__WEBPACK_IMPORTED_MODULE_16__.SpawnSyncTask(execStruct.command, execStruct.args, target.binaryDir.toString()));
            }
            const linkOptions = this[TARGETS].allLinkOptionsOf(target);
            if (target.isObjectLibrary) {
                const objs = depends.filter(i => i.endsWith(".o") || i.endsWith(".obj")).map(i => target.getFileDir().relative(i));
                if (objs.length) {
                    const args = [
                        ...linkOptions,
                        "-r",
                        "-o", target.getFileName(),
                        ...objs
                    ];
                    generalGoal.message = `Linking ${target.language} object library ${target.getFileName()}`;
                    generalGoal.output = target.getFile();
                    generalGoal.addDependency(...depends);
                    generalGoal.addTask(new _core_SpawnSyncTask__WEBPACK_IMPORTED_MODULE_16__.SpawnSyncTask(scope.LINKER, args, target.getFileDir().toString()));
                }
                else {
                    logger.info(`No objects for "${target.targetName}"`);
                }
            }
            if (target.isStaticLibrary) {
                const objs = depends.filter(i => i.endsWith(".o") || i.endsWith(".obj")).map(i => target.getFileDir().relative(i));
                if (objs.length) {
                    const args = ["rc", target.getFileName(), ...objs];
                    generalGoal.message = `Linking ${target.language} static library ${target.getFileName()}`;
                    generalGoal.output = target.getFile();
                    generalGoal.addDependency(...depends);
                    generalGoal.addTask(new _core_SpawnSyncTask__WEBPACK_IMPORTED_MODULE_16__.SpawnSyncTask(scope.AR, args, target.getFileDir().toString()));
                }
                else {
                    logger.info(`No objects for "${target.targetName}"`);
                }
            }
            if (target.isSharedLibrary) {
                throw new Error("Not implemented");
            }
            if (target.isExecutable) {
                const objs = depends.filter(i => i.endsWith(".o") || i.endsWith(".obj")).map(i => target.getFileDir().relative(i));
                if (objs.length) {
                    const libs = this[TARGETS].allLibrariesOf(target);
                    const args = [
                        ...target.compilerFlags,
                        ...linkOptions,
                        ...objs,
                        "-o", target.getFileName(),
                        ...libs.map(i => target.getFileDir().relative(i)),
                    ];
                    generalGoal.message = `Linking ${target.language} executable ${target.getFileName()}`;
                    generalGoal.output = target.getFile();
                    generalGoal.addDependency(...depends);
                    generalGoal.addDependency(...libs);
                    generalGoal.addTask(new _core_SpawnSyncTask__WEBPACK_IMPORTED_MODULE_16__.SpawnSyncTask(target.compilerPath, args, target.getFileDir().toString()));
                }
                else {
                    logger.info(`No objects for "${target.targetName}"`);
                }
            }
            for (const params of target.postBuildList) {
                const execStruct = resolveTargetCommand(this, params);
                generalGoal.addTask(new _core_SpawnSyncTask__WEBPACK_IMPORTED_MODULE_16__.SpawnSyncTask(execStruct.command, execStruct.args, target.binaryDir.toString()));
            }
            goalList.addTarget(generalGoal);
            const worker = new _core_GoalCollection__WEBPACK_IMPORTED_MODULE_6__.GoalTarget(name);
            worker.message = `Built target ${name}`;
            worker.addDependency(target.getFile().toPath());
            goalList.addTarget(worker);
        }
        if (this._installList.length) {
            const worker = new _core_GoalCollection__WEBPACK_IMPORTED_MODULE_6__.GoalTarget(_Constants__WEBPACK_IMPORTED_MODULE_1__.INSTALL_TARGET);
            const fileInstallationTask = new _core_FileInstallationTask__WEBPACK_IMPORTED_MODULE_17__.FileInstallationTask;
            for (const iter of this._installList) {
                let src, dest;
                if (iter.VALUE instanceof _core_AbsolutePath__WEBPACK_IMPORTED_MODULE_2__.AbsolutePath) {
                    if (scope.PREVENT_INSTALL_FILES)
                        continue;
                    src = iter.VALUE;
                    const rfile = iter.BASE_DIR.relative(iter.VALUE);
                    dest = iter.DESTINATION.join(rfile);
                }
                else if (iter.VALUE instanceof _core_TargetName__WEBPACK_IMPORTED_MODULE_11__.TargetName) {
                    const targetName = iter.VALUE.targetName;
                    const target = this[TARGETS].get(targetName);
                    src = target.getFile();
                    dest = iter.DESTINATION.join(target.getFileName());
                }
                else {
                    throw new Error(`Can not install ${iter.VALUE}`);
                }
                if (scope.DESTDIR)
                    dest = scope.DESTDIR.join(dest);
                worker.addDependency(src.toPath());
                fileInstallationTask.add(src, dest);
            }
            worker.addTask(fileInstallationTask);
            goalList.addTarget(worker);
        }
        const ge = new _core_GoalCollection__WEBPACK_IMPORTED_MODULE_6__.GoalTarget(_Constants__WEBPACK_IMPORTED_MODULE_1__.ALL_TARGET);
        Object.keys(this[TARGETS].ENTRIES).forEach(i => void ge.addDependency(i));
        goalList.addTarget(ge);
        return goalList;
    }
    toJSON() {
        return {
            TARGETS: this.TARGETS,
            CUSTOM_SCRIPTS: this[CUSTOM_SCRIPTS],
            CACHE: this.CACHE,
            installList: this._installList,
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
        if (Array.isArray(target)) {
            if (!Array.isArray(source))
                throw new Error(`Source is not an array`);
            for (const iter of source)
                target.push(iter);
        }
        else {
            for (const [key, val] of Object.entries(source)) {
                if (!Object.hasOwn(target, key)) {
                    target[key] = val;
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
    add(target, name) {
        if (name) {
            if (this[MAP][name])
                throw new Error(`Script "${name}" exists`);
            this[MAP][name] = target;
        }
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

const SCOPE = Symbol("SCOPE");
class ScriptContext extends _core_BaseContext__WEBPACK_IMPORTED_MODULE_0__.GeneralContext {
    [SCOPE];
    constructor(scope) {
        super(scope);
        this[SCOPE] = scope;
    }
    static create(variableMap) {
        return (0,_core_BaseContext__WEBPACK_IMPORTED_MODULE_0__.createContext)(new ScriptContext(variableMap));
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
const COMPILE_PATH = Symbol("COMPILE_PATH");
const COMPILE_FLAGS = Symbol("COMPILE_FLAGS");
const FILE = Symbol("FILE");
const BASE_DIR = Symbol("BASE_DIR");
class SourceFile {
    [LANGUAGE];
    [HEADER_FILE_ONLY];
    [FILE];
    [BASE_DIR];
    [DEFINES];
    [COMPILE_PATH];
    [COMPILE_FLAGS];
    constructor(filename, baseDir, language, compilerPath, compileFlags) {
        this[FILE] = filename;
        this[BASE_DIR] = baseDir;
        this[LANGUAGE] = language;
        this[HEADER_FILE_ONLY] = !language;
        this[DEFINES] = [];
        this[COMPILE_PATH] = compilerPath;
        this[COMPILE_FLAGS] = [...compileFlags];
    }
    static create(filename, baseDir, language, compilerPath, compileFlags) {
        return Object.seal(new SourceFile(filename, baseDir, language, compilerPath, compileFlags));
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
    addDefinition(definition) {
        this[DEFINES].push(definition);
    }
    get COMPILE_PATH() {
        return this[COMPILE_PATH];
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
            COMPILE_PATH: this[COMPILE_PATH],
            COMPILE_FLAGS: this[COMPILE_FLAGS],
            FILE: this[FILE],
            FILE_DIR: this.FILE_DIR,
            FILE_NAME: this.FILE_NAME,
            BASE_DIR: this[BASE_DIR],
        };
    }
}


/***/ }),

/***/ "./src/core/SpawnSyncTask.ts":
/*!***********************************!*\
  !*** ./src/core/SpawnSyncTask.ts ***!
  \***********************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   SpawnSyncTask: () => (/* binding */ SpawnSyncTask)
/* harmony export */ });
/* harmony import */ var node_child_process__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! node:child_process */ "node:child_process");
/* harmony import */ var node_child_process__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(node_child_process__WEBPACK_IMPORTED_MODULE_0__);
/* harmony import */ var _core_MakeInterfaces__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! @/core/MakeInterfaces */ "./src/core/MakeInterfaces.ts");
/* harmony import */ var _core_SimpleObject__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! @/core/SimpleObject */ "./src/core/SimpleObject.ts");
/* harmony import */ var _logger__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! @/logger */ "./src/logger/index.ts");
/*
 * MIT License
 *
 * Copyright (c) 2025  Yurii Yakubin (yurii.yakubin@gmail.com)
 *
 * Permission is granted to use, copy, modify, and distribute this software
 * under the MIT License. See LICENSE file for details.
 */




const logger = _logger__WEBPACK_IMPORTED_MODULE_3__.Logger.create("file:///mnt/c/opt/work/source/darkit-sdk/external/bitmake/src/core/SpawnSyncTask.ts");
;
class SpawnSyncTask extends _core_MakeInterfaces__WEBPACK_IMPORTED_MODULE_1__.InterfaceTask {
    _command;
    _args;
    _cwd;
    constructor(command, args, cwd) {
        super();
        this._command = command;
        this._args = args;
        this._cwd = cwd;
    }
    execute() {
        logger.debug("spawnSync");
        logger.debug("  command", this._command);
        logger.debug("  cwd", this._cwd);
        for (let i = 0; i < this._args.length; i++)
            logger.debug(`  args[${i}]`, this._args[i]);
        const result = (0,node_child_process__WEBPACK_IMPORTED_MODULE_0__.spawnSync)(this._command, this._args, { cwd: this._cwd, encoding: "utf-8" });
        if (result.error || result.status) {
            logger.notice("cd " + this._cwd);
            let cmd = this._args.join(" ");
            cmd = this._command + (cmd ? " " : "") + cmd;
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
    }
    static fromJSON(o) {
        const options = o;
        return new SpawnSyncTask(options.command, options.args, options.cwd);
    }
    toJSON() {
        return {
            type: SpawnSyncTask.name,
            command: this._command,
            args: this._args,
            cwd: this._cwd,
        };
    }
}
;
_core_SimpleObject__WEBPACK_IMPORTED_MODULE_2__.SimpleObject.registerInstanceCreator(SpawnSyncTask.name, SpawnSyncTask.fromJSON);


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
/* harmony export */   MainTarget: () => (/* binding */ MainTarget),
/* harmony export */   PostTarget: () => (/* binding */ PostTarget),
/* harmony export */   TargetType: () => (/* binding */ TargetType)
/* harmony export */ });
/* harmony import */ var _core_SourceFile__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! @/core/SourceFile */ "./src/core/SourceFile.ts");
/* harmony import */ var _core_TargetName__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! @/core/TargetName */ "./src/core/TargetName.ts");
/* harmony import */ var _core_TargetFile__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! @/core/TargetFile */ "./src/core/TargetFile.ts");
/* harmony import */ var _core_TargetIncludes__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! @/core/TargetIncludes */ "./src/core/TargetIncludes.ts");
/* harmony import */ var _core_TargetObjects__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! @/core/TargetObjects */ "./src/core/TargetObjects.ts");
/* harmony import */ var _logger__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(/*! @/logger */ "./src/logger/index.ts");
/*
 * MIT License
 *
 * Copyright (c) 2025  Yurii Yakubin (yurii.yakubin@gmail.com)
 *
 * Permission is granted to use, copy, modify, and distribute this software
 * under the MIT License. See LICENSE file for details.
 */






const logger = _logger__WEBPACK_IMPORTED_MODULE_5__.Logger.create("file:///mnt/c/opt/work/source/darkit-sdk/external/bitmake/src/core/Target.ts");
;
;
class BaseTarget {
    _name;
    _includes;
    _definitions;
    _compileOptions;
    _linkOptions;
    _libraries;
    _sources;
    _preBuildList;
    _postBuildList;
    _language = "";
    _compilerPath = "";
    _compilerFlags = new Array;
    constructor(name) {
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
        return _core_TargetIncludes__WEBPACK_IMPORTED_MODULE_3__.TargetIncludes.create(this._name);
    }
    get objects() {
        return _core_TargetObjects__WEBPACK_IMPORTED_MODULE_4__.TargetObjects.create(this._name);
    }
    get targetFile() {
        return _core_TargetFile__WEBPACK_IMPORTED_MODULE_2__.TargetFile.create(this._name);
    }
    getIncludes() {
        return this._includes.map(i => i.value);
    }
    getPublicIncludes() {
        return this._includes.filter(i => i.publicOnly).map(i => i.value);
    }
    addInclude(publicOnly, value) {
        this._includes.push({ publicOnly, value });
    }
    getDefinitions() {
        return this._definitions.map(i => i.value);
    }
    getPublicDefinitions() {
        return this._definitions.filter(i => i.publicOnly).map(i => i.value);
    }
    addDefinition(publicOnly, value) {
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
        for (const iter of libraries.flat())
            this._libraries.push({ publicOnly, value: _core_TargetName__WEBPACK_IMPORTED_MODULE_1__.TargetName.create(iter.targetName) });
    }
    getHeaders() {
        const result = new Array;
        for (const iter of this._sources) {
            if (iter.value instanceof _core_SourceFile__WEBPACK_IMPORTED_MODULE_0__.SourceFile && iter.value.HEADER_FILE_ONLY)
                result.push(iter.value);
        }
        return result;
    }
    getAllSources() {
        return this._sources;
    }
    getSourceFiles() {
        return this._sources.map(i => i.value).filter(i => i instanceof _core_SourceFile__WEBPACK_IMPORTED_MODULE_0__.SourceFile);
    }
    getTargetObjects() {
        return this._sources.map(i => i.value).filter(i => i instanceof _core_TargetObjects__WEBPACK_IMPORTED_MODULE_4__.TargetObjects);
    }
    addSource(source) {
        this._sources.push({ publicOnly: false, value: source });
    }
    get preBuildList() {
        return this._preBuildList;
    }
    addPreBuild(command, args) {
        this._preBuildList.push({ command, args });
    }
    get postBuildList() {
        return this._postBuildList;
    }
    addPostBuild(command, args) {
        this._postBuildList.push({ command, args });
    }
    get language() {
        return this._language;
    }
    set language(value) {
        this._language = value;
    }
    get compilerPath() {
        return this._compilerPath;
    }
    set compilerPath(value) {
        this._compilerPath = value;
    }
    get compilerFlags() {
        return this._compilerFlags;
    }
    set compilerFlags(value) {
        this._compilerFlags = value;
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
    constructor(name) {
        super(name);
    }
    static create(name) {
        return Object.seal(new PostTarget(name));
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
var TargetType;
(function (TargetType) {
    TargetType[TargetType["ObjectLibrary"] = 0] = "ObjectLibrary";
    TargetType[TargetType["StaticLibrary"] = 1] = "StaticLibrary";
    TargetType[TargetType["SharedLibrary"] = 2] = "SharedLibrary";
    TargetType[TargetType["Executable"] = 3] = "Executable";
})(TargetType || (TargetType = {}));
;
(function (TargetType) {
    function toString(type) {
        switch (type) {
            case TargetType.ObjectLibrary:
                return "ObjectLibrary";
            case TargetType.StaticLibrary:
                return "StaticLibrary";
            case TargetType.SharedLibrary:
                return "SharedLibrary";
            case TargetType.Executable:
                return "Executable";
        }
        throw new Error(`Uknown target type ${type}`);
    }
    TargetType.toString = toString;
})(TargetType || (TargetType = {})); // namespace TargetType
class MainTarget extends BaseTarget {
    _targetType;
    _sourceDir;
    _binaryDir;
    _prefix = "";
    _suffix = "";
    _outputName;
    _positionIndependentCode = false;
    constructor(type, name, sourceDir, binaryDir) {
        super(name);
        this._sourceDir = sourceDir;
        this._binaryDir = binaryDir;
        this._targetType = type;
        this._outputName = name;
    }
    static create(type, name, sourceDir, binaryDir) {
        return Object.seal(new MainTarget(type, name, sourceDir, binaryDir));
    }
    get isObjectLibrary() {
        return this._targetType === TargetType.ObjectLibrary;
    }
    get isStaticLibrary() {
        return this._targetType === TargetType.StaticLibrary;
    }
    get isSharedLibrary() {
        return this._targetType === TargetType.SharedLibrary;
    }
    get isExecutable() {
        return this._targetType === TargetType.Executable;
    }
    get sourceDir() {
        return this._sourceDir;
    }
    get binaryDir() {
        return this._binaryDir;
    }
    getFileDir() {
        return this._binaryDir;
    }
    getFileName() {
        return this.prefix + this.outputName + this.suffix;
    }
    getFile() {
        return this._binaryDir.join(this.getFileName());
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
        result.type = BaseTarget.name;
        result.targetType = TargetType.toString(this._targetType);
        result.sourceDir = this._sourceDir;
        result.binaryDir = this._binaryDir;
        result.prefix = this._prefix;
        result.suffix = this._suffix;
        result.outputName = this._outputName;
        result.positionIndependentCode = this._positionIndependentCode;
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
/* harmony import */ var _core_TargetName__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! @/core/TargetName */ "./src/core/TargetName.ts");
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
            if (iter instanceof _core_TargetIncludes__WEBPACK_IMPORTED_MODULE_0__.TargetIncludes || iter instanceof _core_TargetName__WEBPACK_IMPORTED_MODULE_1__.TargetName) {
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
            if (iter instanceof _core_TargetIncludes__WEBPACK_IMPORTED_MODULE_0__.TargetIncludes || iter instanceof _core_TargetName__WEBPACK_IMPORTED_MODULE_1__.TargetName) {
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
            console.assert(iter instanceof _core_TargetName__WEBPACK_IMPORTED_MODULE_1__.TargetName);
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
            if (iter instanceof _core_TargetName__WEBPACK_IMPORTED_MODULE_1__.TargetName) {
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
            if (iter instanceof _core_TargetName__WEBPACK_IMPORTED_MODULE_1__.TargetName) {
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
            if (iter instanceof _core_TargetName__WEBPACK_IMPORTED_MODULE_1__.TargetName) {
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

/***/ "./src/core/TargetHelper.ts":
/*!**********************************!*\
  !*** ./src/core/TargetHelper.ts ***!
  \**********************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   TargetHelper: () => (/* binding */ TargetHelper)
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

const logger = _logger__WEBPACK_IMPORTED_MODULE_0__.Logger.create("file:///mnt/c/opt/work/source/darkit-sdk/external/bitmake/src/core/TargetHelper.ts");
var TargetHelper;
(function (TargetHelper) {
    function convertValueToDefinition(value) {
        if (value === undefined)
            throw `Definition undefined`;
        if (typeof value === "object")
            return '"' + JSON.stringify(value) + '"';
        return value.toString();
    }
    function normalizeDefinitions(definitions) {
        const result = [];
        for (const iter of definitions) {
            if (typeof iter === "string")
                result.push(iter);
            else if (!iter)
                throw new Error(`Defenition ${iter} not supported`);
            else if (typeof iter === "object") {
                for (const [key, val] of Object.entries(iter))
                    result.push(`${key}=${convertValueToDefinition(val)}`);
            }
            else
                throw new Error(`Defenition ${iter} not supported`);
        }
        return result;
    }
    TargetHelper.normalizeDefinitions = normalizeDefinitions;
})(TargetHelper || (TargetHelper = {})); // namespace namespace


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

/***/ "./src/core/TargetName.ts":
/*!********************************!*\
  !*** ./src/core/TargetName.ts ***!
  \********************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   TargetName: () => (/* binding */ TargetName)
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
class TargetName {
    [NAME];
    constructor(name) {
        this[NAME] = name;
    }
    static create(name) {
        return Object.seal(new TargetName(name));
    }
    static fromJSON(object) {
        return TargetName.create(object.targetName);
    }
    get targetName() {
        return this[NAME];
    }
    toString() {
        return "${" + this[NAME] + ".link}";
    }
    toJSON() {
        return {
            type: TargetName.name,
            targetName: this[NAME],
        };
    }
}
;
_core_SimpleObject__WEBPACK_IMPORTED_MODULE_0__.SimpleObject.registerInstanceCreator(TargetName.name, TargetName.fromJSON);


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
/* harmony import */ var _core_Scope__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! @/core/Scope */ "./src/core/Scope.ts");
/* harmony import */ var _core_BaseContext__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! @/core/BaseContext */ "./src/core/BaseContext.ts");
/* harmony import */ var _core_Target__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! @/core/Target */ "./src/core/Target.ts");
/* harmony import */ var _core_UserTargetStruct__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! @/core/UserTargetStruct */ "./src/core/UserTargetStruct.ts");
/* harmony import */ var _Constants__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! @/Constants */ "./src/Constants.ts");
/* harmony import */ var _logger__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(/*! @/logger */ "./src/logger/index.ts");
/*
 * MIT License
 *
 * Copyright (c) 2025  Yurii Yakubin (yurii.yakubin@gmail.com)
 *
 * Permission is granted to use, copy, modify, and distribute this software
 * under the MIT License. See LICENSE file for details.
 */






const logger = _logger__WEBPACK_IMPORTED_MODULE_5__.Logger.create("file:///mnt/c/opt/work/source/darkit-sdk/external/bitmake/src/core/UserMakeContext.ts");
const SCOPE = Symbol("SCOPE");
const IMPL = Symbol("IMPL");
function createMainTargetImpl(ctx, scope, type, name) {
    if (typeof name !== "string")
        throw new Error(`Target "${name}" is not string type`);
    if (!name)
        throw new Error(`A target with an empty name cannot exist`);
    if (ctx.hasMainTarget(name))
        throw new Error(`Target "${name}" exists`);
    if ([_Constants__WEBPACK_IMPORTED_MODULE_4__.ALL_TARGET, _Constants__WEBPACK_IMPORTED_MODULE_4__.INSTALL_TARGET].includes(name))
        throw new Error(`Target "${name}" is reserved name`);
    const target = _core_Target__WEBPACK_IMPORTED_MODULE_2__.MainTarget.create(type, name, scope.SOURCE_DIR, scope.BINARY_DIR);
    ctx.addMainTarget(name, target);
    return target;
}
class UserMakeContext extends _core_BaseContext__WEBPACK_IMPORTED_MODULE_1__.GeneralContext {
    [IMPL];
    [SCOPE];
    constructor(impl, variableMap) {
        super(variableMap);
        this[IMPL] = impl;
        this[SCOPE] = _core_Scope__WEBPACK_IMPORTED_MODULE_0__.ScopeHelper.createProxy(variableMap);
    }
    static create(impl, variableMap) {
        return (0,_core_BaseContext__WEBPACK_IMPORTED_MODULE_1__.createContext)(new UserMakeContext(impl, variableMap));
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
        return _core_UserTargetStruct__WEBPACK_IMPORTED_MODULE_3__.UserTargetStruct.create(this[IMPL].getPostTarget(name), this[SCOPE]);
    }
    script(name) {
        return this[IMPL].script(name);
    }
    install(value, params) {
        this[IMPL].install(value, params);
    }
    addObjectLibrary(name, ...sources) {
        const target = createMainTargetImpl(this[IMPL], this[SCOPE], _core_Target__WEBPACK_IMPORTED_MODULE_2__.TargetType.ObjectLibrary, name);
        target.setPrefix(this[SCOPE].OBJECT_LIBRARY_PREFIX);
        target.setSuffix(this[SCOPE].OBJECT_LIBRARY_SUFFIX);
        target.addLinkOptions(...this[SCOPE].OBJECT_LINKER_FLAGS);
        return _core_UserTargetStruct__WEBPACK_IMPORTED_MODULE_3__.UserTargetStruct.create(target, this[SCOPE], ...sources);
    }
    addStaticLibrary(name, ...sources) {
        const target = createMainTargetImpl(this[IMPL], this[SCOPE], _core_Target__WEBPACK_IMPORTED_MODULE_2__.TargetType.StaticLibrary, name);
        target.setPrefix(this[SCOPE].STATIC_LIBRARY_PREFIX);
        target.setSuffix(this[SCOPE].STATIC_LIBRARY_SUFFIX);
        target.addLinkOptions(...this[SCOPE].STATIC_LINKER_FLAGS);
        return _core_UserTargetStruct__WEBPACK_IMPORTED_MODULE_3__.UserTargetStruct.create(target, this[SCOPE], ...sources);
    }
    addSharedLibrary(name, ...sources) {
        const target = createMainTargetImpl(this[IMPL], this[SCOPE], _core_Target__WEBPACK_IMPORTED_MODULE_2__.TargetType.SharedLibrary, name);
        target.setPrefix(this[SCOPE].SHARED_LIBRARY_PREFIX);
        target.setSuffix(this[SCOPE].SHARED_LIBRARY_SUFFIX);
        target.addLinkOptions(...this[SCOPE].SHARED_LINKER_FLAGS);
        return _core_UserTargetStruct__WEBPACK_IMPORTED_MODULE_3__.UserTargetStruct.create(target, this[SCOPE], ...sources);
    }
    addExecutable(name, ...sources) {
        const target = createMainTargetImpl(this[IMPL], this[SCOPE], _core_Target__WEBPACK_IMPORTED_MODULE_2__.TargetType.Executable, name);
        target.setPrefix(this[SCOPE].EXECUTABLE_SUFFIX);
        target.addLinkOptions(...this[SCOPE].EXE_LINKER_FLAGS);
        return _core_UserTargetStruct__WEBPACK_IMPORTED_MODULE_3__.UserTargetStruct.create(target, this[SCOPE], ...sources);
    }
    executeScript(script, params) {
        this[IMPL].executeScript(script, params);
    }
}
;


/***/ }),

/***/ "./src/core/UserSourceFiles.ts":
/*!*************************************!*\
  !*** ./src/core/UserSourceFiles.ts ***!
  \*************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   UserSourceFiles: () => (/* binding */ UserSourceFiles)
/* harmony export */ });
/* harmony import */ var _core_MakeInterfaces__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! @/core/MakeInterfaces */ "./src/core/MakeInterfaces.ts");
/* harmony import */ var _core_TargetHelper__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! @/core/TargetHelper */ "./src/core/TargetHelper.ts");
/*
 * MIT License
 *
 * Copyright (c) 2025  Yurii Yakubin (yurii.yakubin@gmail.com)
 *
 * Permission is granted to use, copy, modify, and distribute this software
 * under the MIT License. See LICENSE file for details.
 */


const TARGET = Symbol("TARGET");
const SOURCES = Symbol("SOURCES");
class UserSourceFiles extends _core_MakeInterfaces__WEBPACK_IMPORTED_MODULE_0__.InterfaceSourceFiles {
    [TARGET];
    [SOURCES];
    constructor(target, sources) {
        super();
        this[TARGET] = target;
        this[SOURCES] = [...sources];
    }
    static create(target, sources) {
        return Object.seal(new UserSourceFiles(target, sources));
    }
    setLanguage(language) {
        throw new Error("Not Implemented");
    }
    addDefinitions(...definitions) {
        for (const iter of _core_TargetHelper__WEBPACK_IMPORTED_MODULE_1__.TargetHelper.normalizeDefinitions(definitions.flat()))
            this[SOURCES].forEach(i => i.addDefinition(iter));
    }
    addCompileFlags(...flags) {
        for (const iter of flags.flat())
            this[SOURCES].forEach(i => i.COMPILE_FLAGS.push(iter));
    }
    toJSON() {
        return this[SOURCES];
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
/* harmony import */ var _utils_StrictType__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! @/utils/StrictType */ "./src/utils/StrictType.ts");
/* harmony import */ var _core_TargetIncludes__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! @/core/TargetIncludes */ "./src/core/TargetIncludes.ts");
/* harmony import */ var _core_TargetObjects__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! @/core/TargetObjects */ "./src/core/TargetObjects.ts");
/* harmony import */ var _core_AbsolutePath__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! @/core/AbsolutePath */ "./src/core/AbsolutePath.ts");
/* harmony import */ var _core_SourceFile__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(/*! @/core/SourceFile */ "./src/core/SourceFile.ts");
/* harmony import */ var _core_UserSourceFiles__WEBPACK_IMPORTED_MODULE_6__ = __webpack_require__(/*! @/core/UserSourceFiles */ "./src/core/UserSourceFiles.ts");
/* harmony import */ var _core_TargetFile__WEBPACK_IMPORTED_MODULE_7__ = __webpack_require__(/*! @/core/TargetFile */ "./src/core/TargetFile.ts");
/* harmony import */ var _core_TargetHelper__WEBPACK_IMPORTED_MODULE_8__ = __webpack_require__(/*! @/core/TargetHelper */ "./src/core/TargetHelper.ts");
/* harmony import */ var _logger__WEBPACK_IMPORTED_MODULE_9__ = __webpack_require__(/*! @/logger */ "./src/logger/index.ts");
/*
 * MIT License
 *
 * Copyright (c) 2025  Yurii Yakubin (yurii.yakubin@gmail.com)
 *
 * Permission is granted to use, copy, modify, and distribute this software
 * under the MIT License. See LICENSE file for details.
 */










const logger = _logger__WEBPACK_IMPORTED_MODULE_9__.Logger.create("file:///mnt/c/opt/work/source/darkit-sdk/external/bitmake/src/core/UserTargetStruct.ts");
const SCOPE = Symbol("SCOPE");
const IMPL = Symbol("IMPL");
const _languageExtensions = {
    ASM: [".asm", ".s"],
    C: [".c"],
    CXX: [".cpp", ".cc", ".cxx"],
};
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
function addIncludeImpl(target, sourceDir, publicOnly, include) {
    if (include instanceof _core_TargetIncludes__WEBPACK_IMPORTED_MODULE_2__.TargetIncludes)
        target.addInclude(publicOnly, include);
    else if (typeof include === "string")
        target.addInclude(publicOnly, _core_AbsolutePath__WEBPACK_IMPORTED_MODULE_4__.AbsolutePath.create(sourceDir.resolve(include)));
    else if (include instanceof _core_AbsolutePath__WEBPACK_IMPORTED_MODULE_4__.AbsolutePath)
        target.addInclude(publicOnly, _core_AbsolutePath__WEBPACK_IMPORTED_MODULE_4__.AbsolutePath.create(include));
    else
        throw new Error(`Not support instance ${include}`);
}
function addIncludesImpl(target, scope, publicOnly, ...includes) {
    const sourceDir = scope.SOURCE_DIR;
    for (const iter of includes.flat())
        addIncludeImpl(target, sourceDir, publicOnly, iter);
}
function ensureCmdValue(value) {
    if (typeof value === "string")
        return value;
    else if (value instanceof _core_TargetFile__WEBPACK_IMPORTED_MODULE_7__.TargetFile)
        return value;
    else if (value instanceof _core_AbsolutePath__WEBPACK_IMPORTED_MODULE_4__.AbsolutePath)
        return value;
    else
        throw new TypeError(`Wrong type ${value} for command`);
}
class UserTargetStruct extends _core_MakeInterfaces__WEBPACK_IMPORTED_MODULE_0__.InterfaceTarget {
    [IMPL];
    [SCOPE];
    constructor(impl, scope) {
        super();
        this[IMPL] = impl;
        this[SCOPE] = scope;
        this[IMPL].setPositionIndependentCode(this[SCOPE].POSITION_INDEPENDENT_CODE);
        addIncludesImpl(this[IMPL], this[SCOPE], false, ...this[SCOPE].INCLUDES);
    }
    static create(impl, scope, ...sources) {
        const target = Object.seal(new UserTargetStruct(impl, scope));
        target.addSources(...sources);
        return target;
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
        this[IMPL].setPrefix((0,_utils_StrictType__WEBPACK_IMPORTED_MODULE_1__.ensureString)(value));
    }
    setSuffix(value) {
        this[IMPL].setSuffix((0,_utils_StrictType__WEBPACK_IMPORTED_MODULE_1__.ensureString)(value));
    }
    setOutputName(value) {
        this[IMPL].setOutputName((0,_utils_StrictType__WEBPACK_IMPORTED_MODULE_1__.ensureString)(value));
    }
    addSources(...sources) {
        const scope = this[SCOPE];
        for (const iter of sources.flat()) {
            if (typeof iter === "string" || iter instanceof _core_AbsolutePath__WEBPACK_IMPORTED_MODULE_4__.AbsolutePath) {
                const filename = scope.SOURCE_DIR.resolve(iter);
                const language = getFileLanguage(filename.toPath());
                let compilerPath = "";
                const compilerFlags = [];
                if (language) {
                    compilerPath = scope[language + "_COMPILER"];
                    const COMPILER_FLAGS1 = scope[`${language}_FLAGS`];
                    if (COMPILER_FLAGS1) {
                        compilerFlags.push(...COMPILER_FLAGS1);
                    }
                    const COMPILER_FLAGS2 = scope[`${language}_FLAGS_${scope.BUILD_TYPE.toUpperCase()}`];
                    if (COMPILER_FLAGS2) {
                        compilerFlags.push(...COMPILER_FLAGS2);
                    }
                    if (!this[IMPL].language || (this[IMPL].language === "C" && language === "CXX")) {
                        this[IMPL].language = language;
                        this[IMPL].compilerPath = compilerPath;
                        this[IMPL].compilerFlags = [...compilerFlags];
                    }
                }
                const source = _core_SourceFile__WEBPACK_IMPORTED_MODULE_5__.SourceFile.create(filename, scope.SOURCE_DIR, language, compilerPath, compilerFlags);
                this[IMPL].addSource(source);
            }
            else if (iter instanceof _core_TargetObjects__WEBPACK_IMPORTED_MODULE_3__.TargetObjects)
                this[IMPL].addSource(iter);
            else if (iter instanceof _core_SourceFile__WEBPACK_IMPORTED_MODULE_5__.SourceFile)
                this[IMPL].addSource(iter);
            else
                throw new Error(`Not support instance ${iter}`);
        }
    }
    getSourceFiles(...sources) {
        const result = [];
        const scope = this[SCOPE];
        const sourceFiles = this[IMPL].getSourceFiles();
        for (const it of sources.flat()) {
            const filename = scope.SOURCE_DIR.resolve(it).toPath();
            const src = sourceFiles.find(i => i.FILE.toPath() === filename);
            if (!src)
                throw new Error(`Cannot find "${it}"`);
            result.push(src);
        }
        return _core_UserSourceFiles__WEBPACK_IMPORTED_MODULE_6__.UserSourceFiles.create(this[IMPL], result.length ? result : sourceFiles);
    }
    addIncludes(...includes) {
        addIncludesImpl(this[IMPL], this[SCOPE], false, ...includes);
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
    addDefinitions(...definitions) {
        for (const iter of _core_TargetHelper__WEBPACK_IMPORTED_MODULE_8__.TargetHelper.normalizeDefinitions(definitions.flat()))
            this[IMPL].addDefinition(false, iter);
    }
    addPreBuild(command, args) {
        this[IMPL].addPreBuild(ensureCmdValue(command), args.map(i => ensureCmdValue(i)));
    }
    addPostBuild(command, args) {
        this[IMPL].addPostBuild(ensureCmdValue(command), args.map(i => ensureCmdValue(i)));
    }
    setPositionIndependentCode(value) {
        this[IMPL].setPositionIndependentCode(value);
    }
    addPublicIncludes(...includes) {
        addIncludesImpl(this[IMPL], this[SCOPE], true, ...includes);
    }
    addPublicDefinitions(...definitions) {
        for (const iter of _core_TargetHelper__WEBPACK_IMPORTED_MODULE_8__.TargetHelper.normalizeDefinitions(definitions.flat()))
            this[IMPL].addDefinition(true, iter);
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
        const mk = _core_ScriptContext__WEBPACK_IMPORTED_MODULE_2__.ScriptContext.create(variableMap);
        module.default(mk);
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
          throw Error("Can't prepear ScriptFile");*/
        // this.onConfigureEnd();
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
/* harmony export */   MAINNODE_EXECUTESCRIPT: () => (/* binding */ MAINNODE_EXECUTESCRIPT),
/* harmony export */   MAINNODE_LOADJSON: () => (/* binding */ MAINNODE_LOADJSON),
/* harmony export */   MAINNODE_STARTMAKESCRIPT: () => (/* binding */ MAINNODE_STARTMAKESCRIPT),
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
/* harmony export */   saveAsJSON: () => (/* binding */ saveAsJSON),
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
async function saveAsJSON(filename, value, options) {
    const content = JSON.stringify(value, null, options && options.pretty ? 2 : 0);
    await node_fs__WEBPACK_IMPORTED_MODULE_0___default().promises.mkdir(node_path__WEBPACK_IMPORTED_MODULE_1___default().dirname(filename), { recursive: true });
    await node_fs__WEBPACK_IMPORTED_MODULE_0___default().promises.writeFile(filename, content, { encoding: "utf8" });
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
//# sourceMappingURL=data:application/json;charset=utf-8;base64,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QUNmO0lBQ0QsT0FBTyxFQUFFO1FBQ1AsS0FBSyxFQUFFLDJEQUFVO0tBQ2xCO0lBQ0QsS0FBSyxFQUFFO1FBQ0wsVUFBVTtRQUNWLFlBQVk7S0FDYjtJQUNELElBQUksRUFBRSw2Q0FBSTtDQUNYLEVBQUM7QUFFRixJQUFJLDJEQUFZLEVBQUUsRUFBRSxDQUFDO0lBQ25CLHFEQUFTLEVBQUUsQ0FBQztBQUNkLENBQUMiLCJzb3VyY2VzIjpbIndlYnBhY2s6Ly9iaXRtYWtlL3dlYnBhY2svdW5pdmVyc2FsTW9kdWxlRGVmaW5pdGlvbiIsIndlYnBhY2s6Ly9iaXRtYWtlLy4vc3JjL0NvbnN0YW50cy50cyIsIndlYnBhY2s6Ly9iaXRtYWtlLy4vc3JjL1J1blNjcmlwdC50cyIsIndlYnBhY2s6Ly9iaXRtYWtlLy4vc3JjL2FjdGlvbnMvYml0bWFrZS50cyIsIndlYnBhY2s6Ly9iaXRtYWtlLy4vc3JjL2FjdGlvbnMvY21ha2UudHMiLCJ3ZWJwYWNrOi8vYml0bWFrZS8uL3NyYy9hY3Rpb25zL2NvbmZpZ3VyZS50cyIsIndlYnBhY2s6Ly9iaXRtYWtlLy4vc3JjL2FjdGlvbnMvaW5kZXgudHMiLCJ3ZWJwYWNrOi8vYml0bWFrZS8uL3NyYy9hY3Rpb25zL21ha2UudHMiLCJ3ZWJwYWNrOi8vYml0bWFrZS8uL3NyYy9hY3Rpb25zL25vbmUudHMiLCJ3ZWJwYWNrOi8vYml0bWFrZS8uL3NyYy9hY3Rpb25zL3Byb2Nlc3MudHMiLCJ3ZWJwYWNrOi8vYml0bWFrZS8uL3NyYy9jbWFrZS9Db25zdGFudHMudHMiLCJ3ZWJwYWNrOi8vYml0bWFrZS8uL3NyYy9jbWFrZS9IZWxwZXIudHMiLCJ3ZWJwYWNrOi8vYml0bWFrZS8uL3NyYy9jbWFrZS9pbmRleC50cyIsIndlYnBhY2s6Ly9iaXRtYWtlLy4vc3JjL2NvbW1hbmRzL2J1aWxkLnRzIiwid2VicGFjazovL2JpdG1ha2UvLi9zcmMvY29tbWFuZHMvaW5kZXgudHMiLCJ3ZWJwYWNrOi8vYml0bWFrZS8uL3NyYy9jb21tYW5kcy9pbml0LnRzIiwid2VicGFjazovL2JpdG1ha2UvLi9zcmMvY29yZS9BYnNvbHV0ZVBhdGgudHMiLCJ3ZWJwYWNrOi8vYml0bWFrZS8uL3NyYy9jb3JlL0Jhc2VDb250ZXh0LnRzIiwid2VicGFjazovL2JpdG1ha2UvLi9zcmMvY29yZS9CdWlsZGluU2NyaXB0cy9jX2hlYWRlci50cyIsIndlYnBhY2s6Ly9iaXRtYWtlLy4vc3JjL2NvcmUvQnVpbGRpblNjcmlwdHMvY29uZmlndXJlX2ZpbGUudHMiLCJ3ZWJwYWNrOi8vYml0bWFrZS8uL3NyYy9jb3JlL0J1aWxkaW5TY3JpcHRzL2luZGV4LnRzIiwid2VicGFjazovL2JpdG1ha2UvLi9zcmMvY29yZS9DdXN0b21TY3JpcHQudHMiLCJ3ZWJwYWNrOi8vYml0bWFrZS8uL3NyYy9jb3JlL0RldGVybWluZUNvbXBpbGVyLnRzIiwid2VicGFjazovL2JpdG1ha2UvLi9zcmMvY29yZS9FeGVjU2NyaXB0VGFzay50cyIsIndlYnBhY2s6Ly9iaXRtYWtlLy4vc3JjL2NvcmUvRmlsZUluc3RhbGxhdGlvblRhc2sudHMiLCJ3ZWJwYWNrOi8vYml0bWFrZS8uL3NyYy9jb3JlL0ZpbmRQcm9ncmFtLnRzIiwid2VicGFjazovL2JpdG1ha2UvLi9zcmMvY29yZS9Hb2FsQ29sbGVjdGlvbi50cyIsIndlYnBhY2s6Ly9iaXRtYWtlLy4vc3JjL2NvcmUvSW5zdGFsbEVudGl0eS50cyIsIndlYnBhY2s6Ly9iaXRtYWtlLy4vc3JjL2NvcmUvTG9jYWxNYWtlQ29udGV4dC50cyIsIndlYnBhY2s6Ly9iaXRtYWtlLy4vc3JjL2NvcmUvTWFrZUludGVyZmFjZXMudHMiLCJ3ZWJwYWNrOi8vYml0bWFrZS8uL3NyYy9jb3JlL1BsdWdpbkNvbnRleHQudHMiLCJ3ZWJwYWNrOi8vYml0bWFrZS8uL3NyYy9jb3JlL1Byb2plY3RDb250ZXh0LnRzIiwid2VicGFjazovL2JpdG1ha2UvLi9zcmMvY29yZS9TY29wZS50cyIsIndlYnBhY2s6Ly9iaXRtYWtlLy4vc3JjL2NvcmUvU2NyaXB0Q29sbGVjdGlvbi50cyIsIndlYnBhY2s6Ly9iaXRtYWtlLy4vc3JjL2NvcmUvU2NyaXB0Q29udGV4dC50cyIsIndlYnBhY2s6Ly9iaXRtYWtlLy4vc3JjL2NvcmUvU2ltcGxlT2JqZWN0LnRzIiwid2VicGFjazovL2JpdG1ha2UvLi9zcmMvY29yZS9Tb3VyY2VGaWxlLnRzIiwid2VicGFjazovL2JpdG1ha2UvLi9zcmMvY29yZS9TcGF3blN5bmNUYXNrLnRzIiwid2VicGFjazovL2JpdG1ha2UvLi9zcmMvY29yZS9TeXN0ZW1WYXJpYWJsZXMudHMiLCJ3ZWJwYWNrOi8vYml0bWFrZS8uL3NyYy9jb3JlL1RhcmdldC50cyIsIndlYnBhY2s6Ly9iaXRtYWtlLy4vc3JjL2NvcmUvVGFyZ2V0Q29sbGVjdGlvbi50cyIsIndlYnBhY2s6Ly9iaXRtYWtlLy4vc3JjL2NvcmUvVGFyZ2V0RmlsZS50cyIsIndlYnBhY2s6Ly9iaXRtYWtlLy4vc3JjL2NvcmUvVGFyZ2V0SGVscGVyLnRzIiwid2VicGFjazovL2JpdG1ha2UvLi9zcmMvY29yZS9UYXJnZXRJbmNsdWRlcy50cyIsIndlYnBhY2s6Ly9iaXRtYWtlLy4vc3JjL2NvcmUvVGFyZ2V0TmFtZS50cyIsIndlYnBhY2s6Ly9iaXRtYWtlLy4vc3JjL2NvcmUvVGFyZ2V0T2JqZWN0cy50cyIsIndlYnBhY2s6Ly9iaXRtYWtlLy4vc3JjL2NvcmUvVG9vbGNoYWluQ29udGV4dC50cyIsIndlYnBhY2s6Ly9iaXRtYWtlLy4vc3JjL2NvcmUvVHlwZXMudHMiLCJ3ZWJwYWNrOi8vYml0bWFrZS8uL3NyYy9jb3JlL1VzZXJNYWtlQ29udGV4dC50cyIsIndlYnBhY2s6Ly9iaXRtYWtlLy4vc3JjL2NvcmUvVXNlclNvdXJjZUZpbGVzLnRzIiwid2VicGFjazovL2JpdG1ha2UvLi9zcmMvY29yZS9Vc2VyVGFyZ2V0U3RydWN0LnRzIiwid2VicGFjazovL2JpdG1ha2UvLi9zcmMvY3h4L2luZGV4LnRzIiwid2VicGFjazovL2JpdG1ha2UvLi9zcmMvbG9nZ2VyL2luZGV4LnRzIiwid2VicGFjazovL2JpdG1ha2UvLi9zcmMvc2VydmVyL0pzb25ScGNSZXF1ZXN0U3luYy50cyIsIndlYnBhY2s6Ly9iaXRtYWtlLy4vc3JjL3NlcnZlci9Kc29uUnBjU2VydmVyLnRzIiwid2VicGFjazovL2JpdG1ha2UvLi9zcmMvc2VydmVyL01ha2VDbGllbnQudHMiLCJ3ZWJwYWNrOi8vYml0bWFrZS8uL3NyYy9zZXJ2ZXIvTWFrZVNlcnZlci50cyIsIndlYnBhY2s6Ly9iaXRtYWtlLy4vc3JjL3NlcnZlci9NZW1vcnlUcmFuc3BvcnQudHMiLCJ3ZWJwYWNrOi8vYml0bWFrZS8uL3NyYy9zZXJ2ZXIvTWVzc2FnZVBvcnRTZW5kZXIudHMiLCJ3ZWJwYWNrOi8vYml0bWFrZS8uL3NyYy9zZXJ2ZXIvUmVtb3RlTWFrZUNvbnRleHQudHMiLCJ3ZWJwYWNrOi8vYml0bWFrZS8uL3NyYy9zZXJ2ZXIvUmVtb3RlTWV0aG9kcy50cyIsIndlYnBhY2s6Ly9iaXRtYWtlLy4vc3JjL3NlcnZlci9UcmFuc3BvcnQudHMiLCJ3ZWJwYWNrOi8vYml0bWFrZS8uL3NyYy9zZXJ2ZXIvV29ya2VyTG9vcGVyLnRzIiwid2VicGFjazovL2JpdG1ha2UvLi9zcmMvc2VydmVyL1dvcmtlck5vZGUudHMiLCJ3ZWJwYWNrOi8vYml0bWFrZS8uL3NyYy9zZXJ2ZXIvV29ya2VyU2VuZGVyLnRzIiwid2VicGFjazovL2JpdG1ha2UvLi9zcmMvdXRpbHMvQXJncy50cyIsIndlYnBhY2s6Ly9iaXRtYWtlLy4vc3JjL3V0aWxzL0NoaWxkUHJvY2Vzcy50cyIsIndlYnBhY2s6Ly9iaXRtYWtlLy4vc3JjL3V0aWxzL0ZpbGVTeXN0ZW0udHMiLCJ3ZWJwYWNrOi8vYml0bWFrZS8uL3NyYy91dGlscy9Ib3N0LnRzIiwid2VicGFjazovL2JpdG1ha2UvLi9zcmMvdXRpbHMvSHR0cFJlcXVlc3QudHMiLCJ3ZWJwYWNrOi8vYml0bWFrZS8uL3NyYy91dGlscy9JbXBvcnRNb2R1bGUubWpzIiwid2VicGFjazovL2JpdG1ha2UvLi9zcmMvdXRpbHMvTWFrZVBhdGNoLnRzIiwid2VicGFjazovL2JpdG1ha2UvLi9zcmMvdXRpbHMvTW9kdWxlLnRzIiwid2VicGFjazovL2JpdG1ha2UvLi9zcmMvdXRpbHMvUGF0aC50cyIsIndlYnBhY2s6Ly9iaXRtYWtlLy4vc3JjL3V0aWxzL1ByaW1pdGl2ZXMudHMiLCJ3ZWJwYWNrOi8vYml0bWFrZS8uL3NyYy91dGlscy9TZXR0aW5nc1N0b3JhZ2UudHMiLCJ3ZWJwYWNrOi8vYml0bWFrZS8uL3NyYy91dGlscy9TdHJpY3RUeXBlLnRzIiwid2VicGFjazovL2JpdG1ha2UvLi9zcmMvdXRpbHMvVXJsU2NoZW1lLnRzIiwid2VicGFjazovL2JpdG1ha2UvZXh0ZXJuYWwgbm9kZS1jb21tb25qcyBcImh0dHBcIiIsIndlYnBhY2s6Ly9iaXRtYWtlL2V4dGVybmFsIG5vZGUtY29tbW9uanMgXCJodHRwc1wiIiwid2VicGFjazovL2JpdG1ha2UvZXh0ZXJuYWwgbm9kZS1jb21tb25qcyBcIm5vZGU6Y2hpbGRfcHJvY2Vzc1wiIiwid2VicGFjazovL2JpdG1ha2UvZXh0ZXJuYWwgbm9kZS1jb21tb25qcyBcIm5vZGU6ZnNcIiIsIndlYnBhY2s6Ly9iaXRtYWtlL2V4dGVybmFsIG5vZGUtY29tbW9uanMgXCJub2RlOm9zXCIiLCJ3ZWJwYWNrOi8vYml0bWFrZS9leHRlcm5hbCBub2RlLWNvbW1vbmpzIFwibm9kZTpwYXRoXCIiLCJ3ZWJwYWNrOi8vYml0bWFrZS9leHRlcm5hbCBub2RlLWNvbW1vbmpzIFwibm9kZTp1cmxcIiIsIndlYnBhY2s6Ly9iaXRtYWtlL2V4dGVybmFsIG5vZGUtY29tbW9uanMgXCJub2RlOndvcmtlcl90aHJlYWRzXCIiLCJ3ZWJwYWNrOi8vYml0bWFrZS93ZWJwYWNrL2Jvb3RzdHJhcCIsIndlYnBhY2s6Ly9iaXRtYWtlL3dlYnBhY2svcnVudGltZS9jb21wYXQgZ2V0IGRlZmF1bHQgZXhwb3J0Iiwid2VicGFjazovL2JpdG1ha2Uvd2VicGFjay9ydW50aW1lL2RlZmluZSBwcm9wZXJ0eSBnZXR0ZXJzIiwid2VicGFjazovL2JpdG1ha2Uvd2VicGFjay9ydW50aW1lL2hhc093blByb3BlcnR5IHNob3J0aGFuZCIsIndlYnBhY2s6Ly9iaXRtYWtlL3dlYnBhY2svcnVudGltZS9tYWtlIG5hbWVzcGFjZSBvYmplY3QiLCJ3ZWJwYWNrOi8vYml0bWFrZS8uL3NyYy9pbmRleC50cyJdLCJzb3VyY2VzQ29udGVudCI6WyIoZnVuY3Rpb24gd2VicGFja1VuaXZlcnNhbE1vZHVsZURlZmluaXRpb24ocm9vdCwgZmFjdG9yeSkge1xuXHRpZih0eXBlb2YgZXhwb3J0cyA9PT0gJ29iamVjdCcgJiYgdHlwZW9mIG1vZHVsZSA9PT0gJ29iamVjdCcpXG5cdFx0bW9kdWxlLmV4cG9ydHMgPSBmYWN0b3J5KCk7XG5cdGVsc2UgaWYodHlwZW9mIGRlZmluZSA9PT0gJ2Z1bmN0aW9uJyAmJiBkZWZpbmUuYW1kKVxuXHRcdGRlZmluZShbXSwgZmFjdG9yeSk7XG5cdGVsc2UgaWYodHlwZW9mIGV4cG9ydHMgPT09ICdvYmplY3QnKVxuXHRcdGV4cG9ydHNbXCJiaXRtYWtlXCJdID0gZmFjdG9yeSgpO1xuXHRlbHNlXG5cdFx0cm9vdFtcImJpdG1ha2VcIl0gPSBmYWN0b3J5KCk7XG59KShnbG9iYWwsICgpID0+IHtcbnJldHVybiAiLCIvKlxuICogTUlUIExpY2Vuc2VcbiAqXG4gKiBDb3B5cmlnaHQgKGMpIDIwMjUgIFl1cmlpIFlha3ViaW4gKHl1cmlpLnlha3ViaW5AZ21haWwuY29tKVxuICpcbiAqIFBlcm1pc3Npb24gaXMgZ3JhbnRlZCB0byB1c2UsIGNvcHksIG1vZGlmeSwgYW5kIGRpc3RyaWJ1dGUgdGhpcyBzb2Z0d2FyZVxuICogdW5kZXIgdGhlIE1JVCBMaWNlbnNlLiBTZWUgTElDRU5TRSBmaWxlIGZvciBkZXRhaWxzLlxuICovXG5cbmV4cG9ydCBjb25zdCBVU0VSX0NPTkZJRyA9IFwiYml0bWFrZS5jb25maWcubWpzXCI7XG5leHBvcnQgY29uc3QgUkVRVUVTVF9BVFRFTVBUUyA9IDMwO1xuZXhwb3J0IGNvbnN0IEJVSUxEX1NFVFRJTkdTX0ZJTEUgPSBcIkJ1aWxkU2V0dGluZ3MuanNvblwiO1xuZXhwb3J0IGNvbnN0IEFMTF9UQVJHRVQgPSBcImFsbFwiO1xuZXhwb3J0IGNvbnN0IElOU1RBTExfVEFSR0VUID0gXCJpbnN0YWxsXCI7XG5leHBvcnQgY29uc3QgUEFDS0FHRV9KU09OID0gXCJwYWNrYWdlLmpzb25cIjtcbmV4cG9ydCBjb25zdCBNQUtFX0NBQ0hFID0gXCJNYWtlQ2FjaGUuanNvblwiO1xuZXhwb3J0IGNvbnN0IFNZU1RFTV9WQVJJQUJMRV9HUk9VUCA9IFwic3lzdGVtXCI7XG5leHBvcnQgY29uc3QgQ1VTVE9NX1ZBUklBQkxFX0dST1VQID0gXCJjdXN0b21cIjtcbiIsIi8qXG4gKiBNSVQgTGljZW5zZVxuICpcbiAqIENvcHlyaWdodCAoYykgMjAyNSAgWXVyaWkgWWFrdWJpbiAoeXVyaWkueWFrdWJpbkBnbWFpbC5jb20pXG4gKlxuICogUGVybWlzc2lvbiBpcyBncmFudGVkIHRvIHVzZSwgY29weSwgbW9kaWZ5LCBhbmQgZGlzdHJpYnV0ZSB0aGlzIHNvZnR3YXJlXG4gKiB1bmRlciB0aGUgTUlUIExpY2Vuc2UuIFNlZSBMSUNFTlNFIGZpbGUgZm9yIGRldGFpbHMuXG4gKi9cblxuaW1wb3J0IHsgaXNNYWluVGhyZWFkLCBwYXJlbnRQb3J0LCB3b3JrZXJEYXRhIH0gZnJvbSBcIm5vZGU6d29ya2VyX3RocmVhZHNcIjtcbmltcG9ydCB7IEFyZ3MgfSAgZnJvbSBcIkAvdXRpbHMvQXJnc1wiO1xuaW1wb3J0IGNvbW1hbmRzIGZyb20gXCJAL2NvbW1hbmRzXCI7XG5pbXBvcnQgeyBMb2dnZXIgfSBmcm9tIFwiQC9sb2dnZXJcIjtcbmltcG9ydCB7IE1lc3NhZ2VQb3J0U2VuZGVyIH0gZnJvbSBcIkAvc2VydmVyL01lc3NhZ2VQb3J0U2VuZGVyXCI7XG5pbXBvcnQgeyBXb3JrZXJMb29wZXIgfSBmcm9tIFwiQC9zZXJ2ZXIvV29ya2VyTG9vcGVyXCI7XG5cbmNvbnN0IGxvZ2dlciA9IExvZ2dlci5jcmVhdGUoaW1wb3J0Lm1ldGEudXJsKTtcblxuZXhwb3J0IGFzeW5jIGZ1bmN0aW9uIHJ1bk1haW5TY3JpcHQoKSB7XG4gIGxvZ2dlci5pbmZvKFwiTWFpbiB0aHJlYWQgc3RhcnRlZFwiKVxuICBjb25zdCBvcHRpb25zOiBhbnkgPSB7XG4gICAgaGFuZGxlcjogXCJkZWZhdWx0XCIsXG4gICAgd29ya0RpcjogcHJvY2Vzcy5jd2QoKSxcbiAgICBlbnY6IHt9LFxuICB9O1xuXG4gIGxldCBub2RlRXhlY3V0YWJsZTogc3RyaW5nIHwgdW5kZWZpbmVkO1xuICBpZiAocHJvY2Vzcy5hcmd2Lmxlbmd0aCA+IDApXG4gICAgbm9kZUV4ZWN1dGFibGUgPSBwcm9jZXNzLmFyZ3ZbMF07XG5cbiAgbGV0IGN1cnJlbnRTY3JpcHQ6IHN0cmluZyB8IHVuZGVmaW5lZDtcbiAgaWYgKHByb2Nlc3MuYXJndi5sZW5ndGggPiAxKVxuICAgIGN1cnJlbnRTY3JpcHQgPSBwcm9jZXNzLmFyZ3ZbMV07XG5cbiAgbGV0IGFyZ3NJbmRleCA9IHByb2Nlc3MuYXJndi5sZW5ndGg7XG4gIGlmIChwcm9jZXNzLmFyZ3YubGVuZ3RoID4gMikge1xuICAgIGFyZ3NJbmRleCA9IDI7XG4gICAgY29uc3QgaGFuZGxlciA9IHByb2Nlc3MuYXJndlthcmdzSW5kZXhdO1xuICAgIGlmICghaGFuZGxlci5zdGFydHNXaXRoKFwiLS1cIikpIHtcbiAgICAgIG9wdGlvbnMuaGFuZGxlciA9IGhhbmRsZXI7XG4gICAgICBhcmdzSW5kZXgrKztcbiAgICB9XG4gIH1cblxuICBvcHRpb25zLmVudiA9IEFyZ3MudG9PYmplY3QocHJvY2Vzcy5hcmd2LnNsaWNlKGFyZ3NJbmRleCkpO1xuXG4gIGNvbnN0IGhhbmRsZXIgPSBjb21tYW5kc1tvcHRpb25zLmhhbmRsZXJdO1xuICBpZiAoIWhhbmRsZXIpXG4gICAgdGhyb3cgRXJyb3IoYFRoZSAke1BST0pFQ1RfTkFNRX0gZG9lcyBub3Qgc3VwcG9ydCB0aGUgJHtvcHRpb25zLmhhbmRsZXJ9IGNvbW1hbmRgKTtcblxuICBjb25zdCByZXMgPSBoYW5kbGVyKG9wdGlvbnMpO1xuICBpZiAocmVzIGluc3RhbmNlb2YgUHJvbWlzZSkge1xuICAgIGF3YWl0IHJlcztcbiAgfVxufVxuXG5leHBvcnQgZnVuY3Rpb24gcnVuV29ya2VyU2NyaXB0KCkge1xuICBsb2dnZXIuZGVidWcoXCJXb3JrZXIgdGhyZWFkIHN0YXJ0ZWRcIiwgd29ya2VyRGF0YSk7XG5cbiAgaWYgKCFwYXJlbnRQb3J0KSB7XG4gICAgdGhyb3cgbmV3IEVycm9yKGBXb3JrZXIgbm90IHN1cHBvcnRlZCBwYXJlbnRQb3J0YCk7XG4gIH1cblxuICBjb25zdCBzZW5kZXIgPSBuZXcgTWVzc2FnZVBvcnRTZW5kZXIocGFyZW50UG9ydCk7XG4gIGNvbnN0IGxvb3BlciA9IG5ldyBXb3JrZXJMb29wZXIoc2VuZGVyKTtcblxuICBwYXJlbnRQb3J0Lm9uKFwibWVzc2FnZVwiLCAobWVzc2FnZSkgPT4gbG9vcGVyLmVtaXRNZXNzYWdlKHNlbmRlciwgbWVzc2FnZSkpO1xufVxuXG5leHBvcnQgZnVuY3Rpb24gcnVuU2NyaXB0KCkge1xuICBpZiAoaXNNYWluVGhyZWFkKSB7XG4gICAgcnVuTWFpblNjcmlwdCgpLnRoZW4oKCkgPT4gcHJvY2Vzcy5leGl0KDApKS5jYXRjaCgoZSkgPT4ge1xuICAgICAgaWYgKGUgaW5zdGFuY2VvZiBFcnJvcilcbiAgICAgICAgbG9nZ2VyLmZhdGFsKGUuc3RhY2spO1xuICAgICAgZWxzZVxuICAgICAgICBsb2dnZXIuZmF0YWwoZSk7XG4gICAgICBwcm9jZXNzLmV4aXQoMSk7XG4gICAgfSk7XG4gIH1cbiAgZWxzZSB7XG4gICAgcnVuV29ya2VyU2NyaXB0KCk7XG4gIH1cbn1cbiIsIi8qXG4gKiBNSVQgTGljZW5zZVxuICpcbiAqIENvcHlyaWdodCAoYykgMjAyNSAgWXVyaWkgWWFrdWJpbiAoeXVyaWkueWFrdWJpbkBnbWFpbC5jb20pXG4gKlxuICogUGVybWlzc2lvbiBpcyBncmFudGVkIHRvIHVzZSwgY29weSwgbW9kaWZ5LCBhbmQgZGlzdHJpYnV0ZSB0aGlzIHNvZnR3YXJlXG4gKiB1bmRlciB0aGUgTUlUIExpY2Vuc2UuIFNlZSBMSUNFTlNFIGZpbGUgZm9yIGRldGFpbHMuXG4gKi9cblxuaW1wb3J0IGZzIGZyb20gXCJub2RlOmZzXCI7XG5cbmltcG9ydCB7IFBhdGggfSBmcm9tIFwiQC91dGlscy9QYXRoXCI7XG5pbXBvcnQgeyBNYWtlU2VydmVyIH0gZnJvbSBcIkAvc2VydmVyL01ha2VTZXJ2ZXJcIjtcbmltcG9ydCB7IFBsdWdpbkNvbnRleHQgfSBmcm9tIFwiQC9jb3JlL1BsdWdpbkNvbnRleHRcIjtcbmltcG9ydCB7IFNjb3BlSGVscGVyIH0gZnJvbSBcIkAvY29yZS9TY29wZVwiO1xuaW1wb3J0IHsgVG9vbGNoYWluQ29udGV4dCB9IGZyb20gXCJAL2NvcmUvVG9vbGNoYWluQ29udGV4dFwiO1xuaW1wb3J0IHsgZ2V0UGF0aFN0cmluZywgZ2V0VVJMU3RyaW5nLCBzYXZlQXNKU09OIH0gIGZyb20gXCJAL3V0aWxzL0ZpbGVTeXN0ZW1cIjtcbmltcG9ydCB7IEFic29sdXRlUGF0aCB9IGZyb20gXCJAL2NvcmUvQWJzb2x1dGVQYXRoXCI7XG5pbXBvcnQgeyBpbXBvcnRNb2R1bGUgfSAgZnJvbSBcIkAvdXRpbHMvTW9kdWxlXCI7XG5pbXBvcnQgeyBkZXRlcm1pbmVDb21waWxlciB9ICBmcm9tIFwiQC9jb3JlL0RldGVybWluZUNvbXBpbGVyXCI7XG5pbXBvcnQgeyBTZXR0aW5nc1N0b3JhZ2UgfSBmcm9tIFwiQC91dGlscy9TZXR0aW5nc1N0b3JhZ2VcIjtcbmltcG9ydCB7IElNUE9SVF9TQ0hFTUUgfSBmcm9tIFwiQC91dGlscy9VcmxTY2hlbWVcIjtcbmltcG9ydCB7IElOU1RBTExfVEFSR0VULCBQQUNLQUdFX0pTT04sIE1BS0VfQ0FDSEUgfSBmcm9tIFwiQC9Db25zdGFudHNcIjtcbmltcG9ydCB7IFNZU1RFTV9WQVJJQUJMRV9HUk9VUCB9IGZyb20gXCJAL0NvbnN0YW50c1wiO1xuaW1wb3J0IHsgcmVxdWlyZVJlc29sdmUgfSBmcm9tIFwiQC91dGlscy9Nb2R1bGVcIjtcbmltcG9ydCB7IFN5c3RlbVNjb3BlIH0gZnJvbSBcIkAvY29yZS9TeXN0ZW1TY29wZVwiO1xuaW1wb3J0IFN5c3RlbVZhcmlhYmxlcyBmcm9tIFwiQC9jb3JlL1N5c3RlbVZhcmlhYmxlc1wiO1xuaW1wb3J0IHsgTG9nZ2VyIH0gZnJvbSBcIkAvbG9nZ2VyXCI7XG5cbmNvbnN0IGxvZ2dlciA9IExvZ2dlci5jcmVhdGUoaW1wb3J0Lm1ldGEudXJsKTtcblxuZXhwb3J0IGRlZmF1bHQgYXN5bmMgZnVuY3Rpb24oY29uZmlnOiBhbnksIGVudmlyb25tZW50OiBhbnksIHNldHRpbmdzOiBTZXR0aW5nc1N0b3JhZ2UpIHtcbiAgcHJvY2Vzcy5lbnYgPSBlbnZpcm9ubWVudDtcblxuICBjb25zdCBzZXJ2ZXIgPSBuZXcgTWFrZVNlcnZlcjtcblxuICBjb25zdCB2YXJpYWJsZU1hcCA9IHNlcnZlci5yb290VmFyaWFibGVNYXA7XG4gIFNjb3BlSGVscGVyLmV4dGVuZFZhcmlhYmxlTWFwQnlWYWx1ZXModmFyaWFibGVNYXAsIFwiXCIsIGNvbmZpZy52YXJpYWJsZXMpO1xuICBTY29wZUhlbHBlci5kZWZpbmVWYXJpYWJsZXNJblZhcmlhYmxlTWFwKHZhcmlhYmxlTWFwLCBTWVNURU1fVkFSSUFCTEVfR1JPVVAsIFN5c3RlbVZhcmlhYmxlcyk7XG4gIGNvbnN0IHNjb3BlID0gU2NvcGVIZWxwZXIuY3JlYXRlUHJveHkodmFyaWFibGVNYXApIGFzIFN5c3RlbVNjb3BlO1xuXG4gIGNvbnN0IHNvdXJjZURpciA9IGdldFBhdGhTdHJpbmcoY29uZmlnLnNvdXJjZURpcik7XG4gIGNvbnN0IGJpbmFyeURpciA9IGdldFBhdGhTdHJpbmcoY29uZmlnLmJpbmFyeURpcik7XG5cbiAgc2NvcGUuUFJPSkVDVF9TT1VSQ0VfRElSID0gQWJzb2x1dGVQYXRoLmNyZWF0ZShzb3VyY2VEaXIpO1xuICBzY29wZS5QUk9KRUNUX0JJTkFSWV9ESVIgPSBBYnNvbHV0ZVBhdGguY3JlYXRlKGJpbmFyeURpcik7XG5cbiAgc2NvcGUuUEFDS0FHRV9GSUxFID0gc2NvcGUuUFJPSkVDVF9TT1VSQ0VfRElSLmpvaW4oUEFDS0FHRV9KU09OKTtcbiAgc2NvcGUuQ0FDSEVfRklMRSA9IHNjb3BlLlBST0pFQ1RfQklOQVJZX0RJUi5qb2luKE1BS0VfQ0FDSEUpO1xuICBzY29wZS5TT1VSQ0VfRElSID0gc2NvcGUuUFJPSkVDVF9TT1VSQ0VfRElSO1xuICBzY29wZS5CSU5BUllfRElSID0gc2NvcGUuUFJPSkVDVF9CSU5BUllfRElSO1xuXG4gIGNvbnN0IHBhY2thZ2VKc29uID0gYXdhaXQgZnMucHJvbWlzZXMucmVhZEZpbGUoc2NvcGUuUEFDS0FHRV9GSUxFLnRvU3RyaW5nKCksIFwidXRmOFwiKTtcbiAgY29uc3QgcGtnID0gSlNPTi5wYXJzZShwYWNrYWdlSnNvbik7XG5cbiAgc2NvcGUuQlVJTERfVFlQRSA9IGNvbmZpZy5idWlsZFR5cGU7XG4gIHNjb3BlLlBST0pFQ1RfTkFNRSA9IHBrZy5uYW1lO1xuICBzY29wZS5QUk9KRUNUX1ZFUlNJT04gPSBwa2cudmVyc2lvbjtcbiAgc2NvcGUuUFJPSkVDVF9ERVNDUklQVElPTiA9IHBrZy5kZXNjcmlwdGlvbiB8fCBcIlwiO1xuICBzY29wZS5QUk9KRUNUX0hPTUVQQUdFX1VSTCA9IHBrZy5ob21lcGFnZSB8fCBcIlwiO1xuXG4gIGlmIChjb25maWcuZGVzdERpcilcbiAgICBzY29wZS5ERVNURElSID0gY29uZmlnLmRlc3REaXI7XG5cbiAgZm9yIChjb25zdCBwbHVnaW4gb2YgKHNjb3BlLk1BS0VfUExVR0lOX0xJU1QgfHwgW10pKSB7XG4gICAgY29uc3QgY3dkU2F2ZSA9IHByb2Nlc3MuY3dkKCk7XG5cbiAgICBzY29wZS5TQ1JJUFRfRklMRSA9IEFic29sdXRlUGF0aC5jcmVhdGUocGx1Z2luKTtcbiAgICBzY29wZS5TQ1JJUFRfRElSID0gc2NvcGUuU0NSSVBUX0ZJTEUuZGlybmFtZSgpO1xuICAgIHNjb3BlLlNPVVJDRV9ESVIgPSBzY29wZS5TQ1JJUFRfRElSO1xuXG4gICAgY29uc3QgYmluYXJ5RGlyMSA9IHNjb3BlLlBST0pFQ1RfQklOQVJZX0RJUi5yZWxhdGl2ZShzb3VyY2VEaXIpO1xuICAgIGNvbnN0IGJpbmFyeURpcjIgPSBzY29wZS5QUk9KRUNUX1NPVVJDRV9ESVIucmVsYXRpdmUoc291cmNlRGlyKTtcbiAgICBjb25zdCBiaW5hcnlEaXIgPSAoYmluYXJ5RGlyMi5sZW5ndGggPCBiaW5hcnlEaXIxLmxlbmd0aCA/IGJpbmFyeURpcjIgOiBiaW5hcnlEaXIxKS5yZXBsYWNlKFwiLi4vXCIsIFwiX18vXCIpO1xuICAgIHNjb3BlLkJJTkFSWV9ESVIgPSBzY29wZS5QUk9KRUNUX0JJTkFSWV9ESVIuam9pbihcIk1ha2VQbHVnaW5CaW5hcmllc1wiLCBiaW5hcnlEaXIpO1xuXG4gICAgcHJvY2Vzcy5jaGRpcihzY29wZS5TT1VSQ0VfRElSLnRvU3RyaW5nKCkpO1xuICAgIGNvbnN0IHBsdWdpblVybCA9IGdldFVSTFN0cmluZyhzY29wZS5TQ1JJUFRfRklMRS50b1N0cmluZygpKTtcbiAgICBjb25zdCBtb2R1bGUgPSBhd2FpdCBpbXBvcnRNb2R1bGUocGx1Z2luVXJsKTtcbiAgICBcbiAgICBpZiAoIW1vZHVsZS5kZWZhdWx0KVxuICAgICAgdGhyb3cgbmV3IEVycm9yKGBQbHVnaW4gJHtzY29wZS5TQ1JJUFRfRklMRS5iYXNlbmFtZSgpfSBub3QgY29udGFpbiBkZWZhdWx0IGV4cG9ydGApO1xuXG4gICAgY29uc3QgbWsgPSBQbHVnaW5Db250ZXh0LmNyZWF0ZShzZXJ2ZXIucHJvamVjdCwgdmFyaWFibGVNYXApO1xuICAgIGlmICh0eXBlb2YgbW9kdWxlLmRlZmF1bHQgIT09IFwiZnVuY3Rpb25cIilcbiAgICAgIHRocm93IG5ldyBFcnJvcihgUGx1Z2luICR7c2NvcGUuU0NSSVBUX0ZJTEUuYmFzZW5hbWUoKX0gZXhwb3J0IGhhcyBubyBmdW5jdGlvbiBvciBjbGFzc2ApO1xuICAgIGxldCByZXN1bHQ6IGFueTtcbiAgICBpZiAoL15jbGFzc1xccy8udGVzdChGdW5jdGlvbi5wcm90b3R5cGUudG9TdHJpbmcuY2FsbChtb2R1bGUuZGVmYXVsdCkpKSB7XG4gICAgICBpZiAodHlwZW9mIG1vZHVsZS5kZWZhdWx0LnByb3RvdHlwZS5hcHBseSAhPT0gXCJmdW5jdGlvblwiKVxuICAgICAgICB0aHJvdyBuZXcgRXJyb3IoYFBsdWdpbiBjbGFzcyBvZiAke3Njb3BlLlNDUklQVF9GSUxFLmJhc2VuYW1lKCl9IGhhcyBubyBhcHBseSBtZXRob2RgKTtcbiAgICAgIHJlc3VsdCA9IChuZXcgbW9kdWxlLmRlZmF1bHQpLmFwcGx5KG1rKTtcbiAgICB9XG4gICAgZWxzZSB7XG4gICAgICByZXN1bHQgPSBtb2R1bGUuZGVmYXVsdChtayk7XG4gICAgfVxuXG4gICAgaWYgKHJlc3VsdCBpbnN0YW5jZW9mIFByb21pc2UpXG4gICAgICBhd2FpdCByZXN1bHQ7XG5cbiAgICBwcm9jZXNzLmNoZGlyKGN3ZFNhdmUpO1xuICB9XG5cbiAgaWYgKHNjb3BlLlRPT0xDSEFJTl9GSUxFKSB7XG4gICAgY29uc3QgdG9vbGNoYWluVXJsID0gZ2V0VVJMU3RyaW5nKHNjb3BlLlRPT0xDSEFJTl9GSUxFLnRvU3RyaW5nKCkpO1xuICAgIGNvbnN0IHRvb2xjaGFpbiA9IGF3YWl0IGltcG9ydE1vZHVsZSh0b29sY2hhaW5VcmwpO1xuICAgIGlmICghdG9vbGNoYWluLmRlZmF1bHQpXG4gICAgICB0aHJvdyBuZXcgRXJyb3IoXCJUb29sY2hhaW4gbW9kdWxlIGhhcyBubyBkZWZhdWx0IGV4cG9ydFwiKTtcbiAgICBjb25zdCBtayA9IFRvb2xjaGFpbkNvbnRleHQuY3JlYXRlKHNlcnZlci5wcm9qZWN0LCB2YXJpYWJsZU1hcCk7XG4gICAgY29uc3QgcmVzdWx0ID0gdG9vbGNoYWluLmRlZmF1bHQobWspO1xuICAgIGlmIChyZXN1bHQgaW5zdGFuY2VvZiBQcm9taXNlKVxuICAgICAgYXdhaXQgcmVzdWx0O1xuICB9XG4gIGVsc2Uge1xuICAgIGF3YWl0IGRldGVybWluZUNvbXBpbGVyKHNjb3BlKTtcbiAgfVxuXG4gIGlmIChjb25maWcuc291cmNlVXJsICYmIGNvbmZpZy5zb3VyY2VVcmwuc3RhcnRzV2l0aChJTVBPUlRfU0NIRU1FKSkge1xuICAgIGNvbnN0IHNjcmlwdEZpbGUgPSByZXF1aXJlUmVzb2x2ZShjb25maWcuc291cmNlVXJsLnNsaWNlKElNUE9SVF9TQ0hFTUUubGVuZ3RoKSk7XG4gICAgc2NvcGUuU0NSSVBUX0ZJTEUgPSBBYnNvbHV0ZVBhdGguY3JlYXRlKHNjcmlwdEZpbGUpO1xuICAgIHNjb3BlLlNDUklQVF9ESVIgPSBzY29wZS5TQ1JJUFRfRklMRS5kaXJuYW1lKCk7XG4gIH1cblxuICBzZXJ2ZXIuYWRkRXZlbnRMaXN0ZW5lcihcImNvbmZpZ3VyZVwiLCBhc3luYyAoZXZlbnQpID0+IHtcbiAgICBsb2dnZXIuaW5mbyhcIkNvbmZpZ3VyaW5nIGRvbmVcIik7XG5cbiAgICBpZiAoc2NvcGUuR0xPQkFMX0NPTlRFWFRfSlNPTikge1xuICAgICAgYXdhaXQgc2F2ZUFzSlNPTihzY29wZS5HTE9CQUxfQ09OVEVYVF9KU09OLnRvUGF0aCgpLCBzZXJ2ZXIucHJvamVjdCwgeyBwcmV0dHk6IHRydWUgfSk7XG4gICAgfVxuXG4gICAgY29uc3QgYWxsR29hbExpc3QgPSBzZXJ2ZXIucHJvamVjdC5jcmVhdGVHb2FscyhzY29wZSk7XG4gICAgY29uc3QgZ29hbExpc3QgPSBhbGxHb2FsTGlzdC5nZXRUYXJnZXRMaXN0KElOU1RBTExfVEFSR0VUKTtcblxuICAgIGlmIChzY29wZS5UQVJHRVRfR09BTFNfSlNPTikge1xuICAgICAgYXdhaXQgc2F2ZUFzSlNPTihzY29wZS5UQVJHRVRfR09BTFNfSlNPTi50b1BhdGgoKSwgZ29hbExpc3QsIHsgcHJldHR5OiB0cnVlIH0pO1xuICAgIH1cblxuICAgIGxldCBsb2FkZWQgPSAwO1xuICAgIGNvbnN0IHRvdGFsID0gZ29hbExpc3QubGVuZ3RoO1xuICAgIGZvciAoY29uc3QgaXRlciBvZiBnb2FsTGlzdCkge1xuICAgICAgaWYgKGl0ZXIub3V0cHV0KSB7XG4gICAgICAgIGNvbnN0IG91dHB1dERpciA9IFBhdGguZGlybmFtZShpdGVyLm91dHB1dCk7XG4gICAgICAgIGF3YWl0IGZzLnByb21pc2VzLm1rZGlyKG91dHB1dERpciwgeyByZWN1cnNpdmU6IHRydWUgfSk7XG4gICAgICB9XG4gICAgICBpZiAoaXRlci5tZXNzYWdlKSB7XG4gICAgICAgIGNvbnN0IHJlbGF0aW9uT2ZMZW5ndGggPSBNYXRoLnJvdW5kKCgobG9hZGVkICsgMSkgLyB0b3RhbCkgKiAxMDApO1xuICAgICAgICBjb25zdCBwZXJjZW50ID0gXCJbXCIgKyByZWxhdGlvbk9mTGVuZ3RoLnRvU3RyaW5nKCkucGFkU3RhcnQoMywgXCIgXCIpICsgXCIlXSBcIjtcbiAgICAgICAgbG9nZ2VyLm5vdGljZShwZXJjZW50ICsgaXRlci5tZXNzYWdlKTtcbiAgICAgIH1cbiAgICAgIGF3YWl0IGl0ZXIuZG9Xb3JrKCk7XG4gICAgICBsb2FkZWQrKztcbiAgICB9XG4gIH0pO1xuXG4gIGxldCBmaW5pc2hSZXNvbHZlOiAoKSA9PiB2b2lkO1xuICBjb25zdCByZXN1bHQgPSBuZXcgUHJvbWlzZTx2b2lkPigocmVzb2x2ZSkgPT4ge1xuICAgIGZpbmlzaFJlc29sdmUgPSByZXNvbHZlO1xuICB9KTtcblxuICBzZXJ2ZXIuYWRkRXZlbnRMaXN0ZW5lcihcImJ1aWxkXCIsIChldmVudCkgPT4gZmluaXNoUmVzb2x2ZSgpKTtcblxuICBzZXJ2ZXIuc3RhcnQoKTtcblxuICByZXR1cm4gcmVzdWx0O1xufVxuIiwiLypcbiAqIE1JVCBMaWNlbnNlXG4gKlxuICogQ29weXJpZ2h0IChjKSAyMDI1ICBZdXJpaSBZYWt1YmluICh5dXJpaS55YWt1YmluQGdtYWlsLmNvbSlcbiAqXG4gKiBQZXJtaXNzaW9uIGlzIGdyYW50ZWQgdG8gdXNlLCBjb3B5LCBtb2RpZnksIGFuZCBkaXN0cmlidXRlIHRoaXMgc29mdHdhcmVcbiAqIHVuZGVyIHRoZSBNSVQgTGljZW5zZS4gU2VlIExJQ0VOU0UgZmlsZSBmb3IgZGV0YWlscy5cbiAqL1xuXG5pbXBvcnQgeyBDTWFrZVByb2Nlc3MsIERFRkFVTFRfR0VORVJBVE9SIH0gZnJvbSBcIkAvY21ha2VcIjtcbmltcG9ydCB7IGdldFBhdGhTdHJpbmcgfSAgZnJvbSBcIkAvdXRpbHMvRmlsZVN5c3RlbVwiO1xuaW1wb3J0IHsgU2V0dGluZ3NTdG9yYWdlIH0gZnJvbSBcIkAvdXRpbHMvU2V0dGluZ3NTdG9yYWdlXCI7XG5cbmV4cG9ydCBkZWZhdWx0IGFzeW5jIGZ1bmN0aW9uKGNvbmZpZzogYW55LCBlbnZpcm9ubWVudDogYW55LCBzZXR0aW5nczogU2V0dGluZ3NTdG9yYWdlKSB7XG4gIGNvbnN0IHNvdXJjZURpciA9IGdldFBhdGhTdHJpbmcoY29uZmlnLnNvdXJjZURpcik7XG4gIGNvbnN0IGJpbmFyeURpciA9IGdldFBhdGhTdHJpbmcoY29uZmlnLmJpbmFyeURpcik7XG4gIGNvbnN0IGNtYWtlQXJncyA9IHtcbiAgICBlbnZpcm9ubWVudDoge1xuICAgICAgLi4uZW52aXJvbm1lbnQsXG4gICAgICBERVNURElSOiBjb25maWcuZGVzdERpcixcbiAgICB9LFxuICAgIGdlbmVyYXRvcjogY29uZmlnLmdlbmVyYXRvciB8fCBERUZBVUxUX0dFTkVSQVRPUixcbiAgICBjYWNoZVZhcmlhYmxlczogY29uZmlnLmNhY2hlVmFyaWFibGVzLFxuICAgIHNvdXJjZURpcixcbiAgICBiaW5hcnlEaXIsXG4gIH07XG5cbiAgaWYgKCFjbWFrZUFyZ3MuY2FjaGVWYXJpYWJsZXMuQ01BS0VfQlVJTERfVFlQRSkge1xuICAgIGNtYWtlQXJncy5jYWNoZVZhcmlhYmxlcy5DTUFLRV9CVUlMRF9UWVBFID0gY29uZmlnLmJ1aWxkVHlwZTtcbiAgfVxuXG4gIGNvbnN0IGNtYWtlID0gQ01ha2VQcm9jZXNzLmdldEluc3RhbmNlKCk7XG4gIGF3YWl0IGNtYWtlLmNvbmZpZ3VyZShjbWFrZUFyZ3MpO1xuICBhd2FpdCBjbWFrZS5idWlsZChjbWFrZUFyZ3MpO1xuICBhd2FpdCBjbWFrZS5pbnN0YWxsKGNtYWtlQXJncyk7XG59XG4iLCIvKlxuICogTUlUIExpY2Vuc2VcbiAqXG4gKiBDb3B5cmlnaHQgKGMpIDIwMjUgIFl1cmlpIFlha3ViaW4gKHl1cmlpLnlha3ViaW5AZ21haWwuY29tKVxuICpcbiAqIFBlcm1pc3Npb24gaXMgZ3JhbnRlZCB0byB1c2UsIGNvcHksIG1vZGlmeSwgYW5kIGRpc3RyaWJ1dGUgdGhpcyBzb2Z0d2FyZVxuICogdW5kZXIgdGhlIE1JVCBMaWNlbnNlLiBTZWUgTElDRU5TRSBmaWxlIGZvciBkZXRhaWxzLlxuICovXG5cbmltcG9ydCBwYXRoIGZyb20gXCJub2RlOnBhdGhcIjtcblxuaW1wb3J0IHsgZW5zdXJlQm9vbGVhbiB9IGZyb20gXCJAL3V0aWxzL1N0cmljdFR5cGVcIjtcbmltcG9ydCB7IGdldFBhdGhTdHJpbmcgfSBmcm9tIFwiQC91dGlscy9GaWxlU3lzdGVtXCI7XG5pbXBvcnQgeyBTZXR0aW5nc1N0b3JhZ2UgfSBmcm9tIFwiQC91dGlscy9TZXR0aW5nc1N0b3JhZ2VcIjtcbmltcG9ydCB7IHNwYXduQXN5bmMgfSBmcm9tIFwiQC91dGlscy9DaGlsZFByb2Nlc3NcIjtcblxuZXhwb3J0IGRlZmF1bHQgYXN5bmMgZnVuY3Rpb24oY29uZmlnOiBhbnksIGVudmlyb25tZW50OiBhbnksIHNldHRpbmdzOiBTZXR0aW5nc1N0b3JhZ2UpIHtcbiAgY29uc3Qgc291cmNlRGlyID0gZ2V0UGF0aFN0cmluZyhjb25maWcuc291cmNlRGlyKTtcbiAgY29uc3QgYmluYXJ5RGlyID0gZ2V0UGF0aFN0cmluZyhjb25maWcuYmluYXJ5RGlyKTtcbiAgbGV0IHN0ZXAgPSBhd2FpdCBzZXR0aW5ncy5nZXQoXCJjb25maWd1cmVcIikgfHwgXCJjb25maWdcIjtcbiAgaWYgKHN0ZXAgPT09IFwiY29uZmlnXCIpIHtcbiAgICBjb25zdCBjb21tYW5kID0gcGF0aC5yZXNvbHZlKHNvdXJjZURpciwgXCJjb25maWd1cmVcIik7XG4gICAgY29uc3QgcGFyYW1zID0gW107XG4gICAgaWYgKEFycmF5LmlzQXJyYXkoY29uZmlnLnZhcmlhYmxlcykpIHtcbiAgICAgIGZvciAoY29uc3QgaXRlciBvZiBjb25maWcudmFyaWFibGVzKVxuICAgICAgICBwYXJhbXMucHVzaChpdGVyKTtcbiAgICB9XG4gICAgZWxzZSBpZiAoY29uZmlnLnZhcmlhYmxlcykge1xuICAgICAgZm9yIChjb25zdCBba2V5LHZhbF0gb2YgT2JqZWN0LmVudHJpZXMoY29uZmlnLnZhcmlhYmxlcykpIHtcbiAgICAgICAgaWYgKGtleSA9PT0gXCJmZWF0dXJlc1wiICYmIEFycmF5LmlzQXJyYXkodmFsKSkge1xuICAgICAgICAgIGZvciAoY29uc3QgaXRlciBvZiB2YWwpXG4gICAgICAgICAgICBwYXJhbXMucHVzaChgLS0ke2l0ZXJ9YCk7XG4gICAgICAgIH1cbiAgICAgICAgZWxzZSBpZiAodmFsID09PSBudWxsKVxuICAgICAgICAgIHBhcmFtcy5wdXNoKGAtLSR7a2V5fWApO1xuICAgICAgICBlbHNlXG4gICAgICAgICAgcGFyYW1zLnB1c2goYC0tJHtrZXl9PSR7dmFsfWApO1xuICAgICAgfVxuICAgIH1cbiAgICBpZiAoY29uZmlnLmZlYXR1cmVzKSB7XG4gICAgICBmb3IgKGNvbnN0IGtleSBvZiBjb25maWcuZmVhdHVyZXMpXG4gICAgICAgIHBhcmFtcy5wdXNoKGAtLSR7a2V5fWApO1xuICAgIH1cbiAgICBjb25zdCByZXMxID0gYXdhaXQgc3Bhd25Bc3luYyhjb21tYW5kLCBwYXJhbXMsIHtcbiAgICAgIGN3ZDogYmluYXJ5RGlyLFxuICAgICAgZW52OiBlbnZpcm9ubWVudCxcbiAgICAgIGV4dHJhOiB7XG4gICAgICAgIG91dHB1dDogYGFjLWNvbmZpZ3VyZS0ke3N0ZXB9LmxvZ2AsXG4gICAgICB9LFxuICAgIH0pO1xuICAgIGlmIChyZXMxLnN0YXR1cyAhPT0gMCkge1xuICAgICAgdGhyb3cgbmV3IEVycm9yKGBjb25maWd1cmUgcmV0dXJuZWQgc3RhdHVzICR7cmVzMS5zdGF0dXN9YCk7XG4gICAgfVxuICAgIHN0ZXAgPSBcIm1ha2VcIjtcbiAgICBhd2FpdCBzZXR0aW5ncy5zZXQoXCJjb25maWd1cmVcIiwgc3RlcCk7XG4gIH1cbiAgaWYgKHN0ZXAgPT09IFwibWFrZVwiKSB7XG4gICAgbGV0IHJ1bk1ha2UgPSBmYWxzZTtcbiAgICBpZiAoT2JqZWN0Lmhhc093bihjb25maWcsIFwicnVuTWFrZVwiKSlcbiAgICAgIHJ1bk1ha2UgPSBlbnN1cmVCb29sZWFuKGNvbmZpZy5ydW5NYWtlKTtcbiAgICBpZiAocnVuTWFrZSkge1xuICAgICAgY29uc3QgcmVzMiA9IGF3YWl0IHNwYXduQXN5bmMoXCJtYWtlXCIsIFtdLCB7XG4gICAgICAgIGN3ZDogYmluYXJ5RGlyLFxuICAgICAgICBlbnY6IGVudmlyb25tZW50LFxuICAgICAgICBleHRyYToge1xuICAgICAgICAgIG91dHB1dDogYGFjLWNvbmZpZ3VyZS0ke3N0ZXB9LmxvZ2AsXG4gICAgICAgIH0sXG4gICAgICB9KTtcbiAgICAgIGlmIChyZXMyLnN0YXR1cyAhPT0gMCkge1xuICAgICAgICB0aHJvdyBuZXcgRXJyb3IoYG1ha2UgcmV0dXJuZWQgc3RhdHVzICR7cmVzMi5zdGF0dXN9YCk7XG4gICAgICB9XG4gICAgfVxuICAgIHN0ZXAgPSBcImluc3RhbGxcIjtcbiAgICBhd2FpdCBzZXR0aW5ncy5zZXQoXCJjb25maWd1cmVcIiwgc3RlcCk7XG4gIH1cbiAgaWYgKHN0ZXAgPT09IFwiaW5zdGFsbFwiKSB7XG4gICAgbGV0IHJ1bk1ha2VJbnN0YWxsID0gdHJ1ZTtcbiAgICBpZiAoT2JqZWN0Lmhhc093bihjb25maWcsIFwicnVuTWFrZUluc3RhbGxcIikpXG4gICAgICBydW5NYWtlSW5zdGFsbCA9IGVuc3VyZUJvb2xlYW4oY29uZmlnLnJ1bk1ha2VJbnN0YWxsKTtcbiAgICBpZiAocnVuTWFrZUluc3RhbGwpIHtcbiAgICAgIGNvbnN0IGFyZ3MgPSBbIFwiaW5zdGFsbFwiIF07XG4gICAgICBpZiAoY29uZmlnLmRlc3REaXIpIHtcbiAgICAgICAgYXJncy5wdXNoKGBERVNURElSPSR7Y29uZmlnLmRlc3REaXJ9YCk7XG4gICAgICB9XG4gICAgICBjb25zdCByZXMyID0gYXdhaXQgc3Bhd25Bc3luYyhcIm1ha2VcIiwgYXJncywge1xuICAgICAgICBjd2Q6IGJpbmFyeURpcixcbiAgICAgICAgZW52OiBlbnZpcm9ubWVudCxcbiAgICAgICAgZXh0cmE6IHtcbiAgICAgICAgICBvdXRwdXQ6IGBhYy1jb25maWd1cmUtJHtzdGVwfS5sb2dgLFxuICAgICAgICB9LFxuICAgICAgfSk7XG4gICAgICBpZiAocmVzMi5zdGF0dXMgIT09IDApIHtcbiAgICAgICAgdGhyb3cgbmV3IEVycm9yKGBtYWtlIHJldHVybmVkIHN0YXR1cyAke3JlczIuc3RhdHVzfWApO1xuICAgICAgfVxuICAgIH1cbiAgICBzdGVwID0gXCJkb25lXCI7XG4gICAgYXdhaXQgc2V0dGluZ3Muc2V0KFwiY29uZmlndXJlXCIsIHN0ZXApO1xuICB9XG59XG4iLCIvKlxuICogTUlUIExpY2Vuc2VcbiAqXG4gKiBDb3B5cmlnaHQgKGMpIDIwMjUgIFl1cmlpIFlha3ViaW4gKHl1cmlpLnlha3ViaW5AZ21haWwuY29tKVxuICpcbiAqIFBlcm1pc3Npb24gaXMgZ3JhbnRlZCB0byB1c2UsIGNvcHksIG1vZGlmeSwgYW5kIGRpc3RyaWJ1dGUgdGhpcyBzb2Z0d2FyZVxuICogdW5kZXIgdGhlIE1JVCBMaWNlbnNlLiBTZWUgTElDRU5TRSBmaWxlIGZvciBkZXRhaWxzLlxuICovXG5cbmltcG9ydCB7IFNldHRpbmdzU3RvcmFnZSB9IGZyb20gXCJAL3V0aWxzL1NldHRpbmdzU3RvcmFnZVwiO1xuXG5pbXBvcnQgbm9uZSBmcm9tIFwiQC9hY3Rpb25zL25vbmVcIjtcbmltcG9ydCBwcm9jZXNzIGZyb20gXCJAL2FjdGlvbnMvcHJvY2Vzc1wiO1xuaW1wb3J0IGNvbmZpZ3VyZSBmcm9tIFwiQC9hY3Rpb25zL2NvbmZpZ3VyZVwiO1xuaW1wb3J0IG1ha2UgZnJvbSBcIkAvYWN0aW9ucy9tYWtlXCI7XG5pbXBvcnQgY21ha2UgZnJvbSBcIkAvYWN0aW9ucy9jbWFrZVwiO1xuaW1wb3J0IGJpdG1ha2UgZnJvbSBcIkAvYWN0aW9ucy9iaXRtYWtlXCI7XG5cbmludGVyZmFjZSBBY3Rpb25IYW5kbGVycyB7XG4gIFtuYW1lOiBzdHJpbmddOiAoY29uZmlnOiBhbnksIGVudmlyb25tZW50OiBhbnksIHNldHRpbmdzOiBTZXR0aW5nc1N0b3JhZ2UpID0+IFByb21pc2U8dm9pZD47XG59XG5cbmV4cG9ydCBkZWZhdWx0IDxBY3Rpb25IYW5kbGVycz4ge1xuICBub25lLFxuICBwcm9jZXNzLFxuICBjb25maWd1cmUsXG4gIG1ha2UsXG4gIGNtYWtlLFxuICBiaXRtYWtlLFxufTtcbiIsIi8qXG4gKiBNSVQgTGljZW5zZVxuICpcbiAqIENvcHlyaWdodCAoYykgMjAyNSAgWXVyaWkgWWFrdWJpbiAoeXVyaWkueWFrdWJpbkBnbWFpbC5jb20pXG4gKlxuICogUGVybWlzc2lvbiBpcyBncmFudGVkIHRvIHVzZSwgY29weSwgbW9kaWZ5LCBhbmQgZGlzdHJpYnV0ZSB0aGlzIHNvZnR3YXJlXG4gKiB1bmRlciB0aGUgTUlUIExpY2Vuc2UuIFNlZSBMSUNFTlNFIGZpbGUgZm9yIGRldGFpbHMuXG4gKi9cblxuaW1wb3J0IHsgc3Bhd25Bc3luYyB9IGZyb20gXCJAL3V0aWxzL0NoaWxkUHJvY2Vzc1wiO1xuaW1wb3J0IHsgZ2V0UGF0aFN0cmluZyB9ICBmcm9tIFwiQC91dGlscy9GaWxlU3lzdGVtXCI7XG5pbXBvcnQgeyBTZXR0aW5nc1N0b3JhZ2UgfSBmcm9tIFwiQC91dGlscy9TZXR0aW5nc1N0b3JhZ2VcIjtcblxuZXhwb3J0IGRlZmF1bHQgYXN5bmMgZnVuY3Rpb24oY29uZmlnOiBhbnksIGVudmlyb25tZW50OiBhbnksIHNldHRpbmdzOiBTZXR0aW5nc1N0b3JhZ2UpIHtcbiAgY29uc3QgYmluYXJ5RGlyID0gZ2V0UGF0aFN0cmluZyhjb25maWcuYmluYXJ5RGlyKTtcbiAgY29uc3QgYXJncyA9IGNvbmZpZy5hcmdzIHx8IFtdO1xuICBpZiAoY29uZmlnLmRlc3REaXIpIHtcbiAgICBhcmdzLnB1c2goYERFU1RESVI9JHtjb25maWcuZGVzdERpcn1gKTtcbiAgfVxuICBjb25zdCByZXMyID0gYXdhaXQgc3Bhd25Bc3luYyhcIm1ha2VcIiwgYXJncywge1xuICAgIGN3ZDogYmluYXJ5RGlyLFxuICAgIGVudjogZW52aXJvbm1lbnQsXG4gICAgZXh0cmE6IHtcbiAgICAgIG91dHB1dDogYG1ha2UubG9nYCxcbiAgICB9LFxuICB9KTtcbiAgaWYgKHJlczIuc3RhdHVzICE9PSAwKSB7XG4gICAgdGhyb3cgbmV3IEVycm9yKGBtYWtlIHJldHVybmVkIHN0YXR1cyAke3JlczIuc3RhdHVzfWApO1xuICB9XG59XG4iLCIvKlxuICogTUlUIExpY2Vuc2VcbiAqXG4gKiBDb3B5cmlnaHQgKGMpIDIwMjUgIFl1cmlpIFlha3ViaW4gKHl1cmlpLnlha3ViaW5AZ21haWwuY29tKVxuICpcbiAqIFBlcm1pc3Npb24gaXMgZ3JhbnRlZCB0byB1c2UsIGNvcHksIG1vZGlmeSwgYW5kIGRpc3RyaWJ1dGUgdGhpcyBzb2Z0d2FyZVxuICogdW5kZXIgdGhlIE1JVCBMaWNlbnNlLiBTZWUgTElDRU5TRSBmaWxlIGZvciBkZXRhaWxzLlxuICovXG5cblxuaW1wb3J0IHsgU2V0dGluZ3NTdG9yYWdlIH0gZnJvbSBcIkAvdXRpbHMvU2V0dGluZ3NTdG9yYWdlXCI7XG5pbXBvcnQgeyBMb2dnZXIgfSBmcm9tIFwiQC9sb2dnZXJcIjtcblxuY29uc3QgbG9nZ2VyID0gTG9nZ2VyLmNyZWF0ZShpbXBvcnQubWV0YS51cmwpO1xuXG5leHBvcnQgZGVmYXVsdCBhc3luYyBmdW5jdGlvbihjb25maWc6IGFueSwgZW52aXJvbm1lbnQ6IGFueSwgc2V0dGluZ3M6IFNldHRpbmdzU3RvcmFnZSkge1xuICAvKiBkbyBub3RoaW5nICovXG59XG4iLCIvKlxuICogTUlUIExpY2Vuc2VcbiAqXG4gKiBDb3B5cmlnaHQgKGMpIDIwMjUgIFl1cmlpIFlha3ViaW4gKHl1cmlpLnlha3ViaW5AZ21haWwuY29tKVxuICpcbiAqIFBlcm1pc3Npb24gaXMgZ3JhbnRlZCB0byB1c2UsIGNvcHksIG1vZGlmeSwgYW5kIGRpc3RyaWJ1dGUgdGhpcyBzb2Z0d2FyZVxuICogdW5kZXIgdGhlIE1JVCBMaWNlbnNlLiBTZWUgTElDRU5TRSBmaWxlIGZvciBkZXRhaWxzLlxuICovXG5cblxuaW1wb3J0IHBhdGggZnJvbSBcIm5vZGU6cGF0aFwiO1xuXG5pbXBvcnQgeyBnZXRQYXRoU3RyaW5nIH0gZnJvbSBcIkAvdXRpbHMvRmlsZVN5c3RlbVwiO1xuaW1wb3J0IHsgU2V0dGluZ3NTdG9yYWdlIH0gZnJvbSBcIkAvdXRpbHMvU2V0dGluZ3NTdG9yYWdlXCI7XG5pbXBvcnQgeyBzcGF3bkFzeW5jIH0gZnJvbSBcIkAvdXRpbHMvQ2hpbGRQcm9jZXNzXCI7XG5pbXBvcnQgeyBMb2dnZXIgfSBmcm9tIFwiQC9sb2dnZXJcIjtcblxuY29uc3QgbG9nZ2VyID0gTG9nZ2VyLmNyZWF0ZShpbXBvcnQubWV0YS51cmwpO1xuXG5leHBvcnQgZGVmYXVsdCBhc3luYyBmdW5jdGlvbihjb25maWc6IGFueSwgZW52aXJvbm1lbnQ6IGFueSwgc2V0dGluZ3M6IFNldHRpbmdzU3RvcmFnZSkge1xuICBpZiAoIWNvbmZpZy5jb21tYW5kKVxuICAgIHRocm93IG5ldyBFcnJvcihcIlJlcXVpcmVkIGNvbW1hbmQgZmllbGQgZm9yIHByb2Nlc3MgYWN0aW9uXCIpO1xuICBjb25zdCBzb3VyY2VEaXIgPSBnZXRQYXRoU3RyaW5nKGNvbmZpZy5zb3VyY2VEaXIpO1xuICBjb25zdCBiaW5hcnlEaXIgPSBnZXRQYXRoU3RyaW5nKGNvbmZpZy5iaW5hcnlEaXIpO1xuICBsZXQgeyBjb21tYW5kIH0gPSBjb25maWc7XG4gIGlmICghcGF0aC5pc0Fic29sdXRlKGNvbW1hbmQpICYmIChjb21tYW5kLmluY2x1ZGVzKHBhdGgucG9zaXguZGVsaW1pdGVyKSB8fCBjb21tYW5kLmluY2x1ZGVzKHBhdGgud2luMzIuZGVsaW1pdGVyKSkpIHtcbiAgICBjb21tYW5kID0gcGF0aC5yZXNvbHZlKHNvdXJjZURpciwgY29tbWFuZCk7XG4gIH1cbiAgY29uc3QgcmVzID0gYXdhaXQgc3Bhd25Bc3luYyhjb21tYW5kLCBjb25maWcuYXJncyB8fCBbXSwge1xuICAgIGN3ZDogYmluYXJ5RGlyLFxuICAgIGVudjogZW52aXJvbm1lbnQsXG4gICAgZXh0cmE6IHtcbiAgICAgIG91dHB1dDogYHByb2Nlc3MubG9nYCxcbiAgICB9LFxuICB9KTtcbiAgaWYgKHJlcy5zdGF0dXMgIT09IDApIHtcbiAgICB0aHJvdyBuZXcgRXJyb3IoYHByb2Nlc3MgcmV0dXJuZWQgc3RhdHVzICR7cmVzLnN0YXR1c31gKTtcbiAgfVxufVxuIiwiLypcbiAqIE1JVCBMaWNlbnNlXG4gKlxuICogQ29weXJpZ2h0IChjKSAyMDI1ICBZdXJpaSBZYWt1YmluICh5dXJpaS55YWt1YmluQGdtYWlsLmNvbSlcbiAqXG4gKiBQZXJtaXNzaW9uIGlzIGdyYW50ZWQgdG8gdXNlLCBjb3B5LCBtb2RpZnksIGFuZCBkaXN0cmlidXRlIHRoaXMgc29mdHdhcmVcbiAqIHVuZGVyIHRoZSBNSVQgTGljZW5zZS4gU2VlIExJQ0VOU0UgZmlsZSBmb3IgZGV0YWlscy5cbiAqL1xuXG5leHBvcnQgZW51bSBCb29sZWFuVHlwZSB7XG4gIE9OID0gXCJPTlwiLFxuICBPRkYgPSBcIk9GRlwiLFxufTtcblxuLy8gRW51bSByZXByZXNlbnRpbmcgdmFsdWUgdHlwZXMgdXNlZCBpbiBDTWFrZSBjYWNoZSB2YXJpYWJsZXNcbmV4cG9ydCBlbnVtIFZhbHVlVHlwZSB7XG4gIC8vIFJlcHJlc2VudHMgYSBmdWxsIHBhdGggdG8gYSBmaWxlXG4gIEZJTEVQQVRIID0gXCJGSUxFUEFUSFwiLFxuXG4gIC8vIFJlcHJlc2VudHMgYSBwYXRoIHRvIGEgZGlyZWN0b3J5XG4gIFBBVEggPSBcIlBBVEhcIixcblxuICAvLyBSZXByZXNlbnRzIGEgYm9vbGVhbiB2YWx1ZSAodHJ1ZS9mYWxzZSlcbiAgQk9PTCA9IFwiQk9PTFwiLFxuXG4gIC8vIFJlcHJlc2VudHMgYSBnZW5lcmljIHN0cmluZyB2YWx1ZVxuICBTVFJJTkcgPSBcIlNUUklOR1wiLFxufTtcblxuLy8gQnVpbGRUeXBlIHJlcHJlc2VudGluZyBjb21tb24gQ01ha2UgYnVpbGQgdHlwZXNcbmV4cG9ydCBlbnVtIEJ1aWxkVHlwZSB7XG4gIC8vIERlYnVnIGJ1aWxkIHR5cGU6IGluY2x1ZGVzIGRlYnVnIHN5bWJvbHMsIG5vIG9wdGltaXphdGlvblxuICBEZWJ1ZyA9IFwiRGVidWdcIixcblxuICAvLyBSZWxlYXNlIGJ1aWxkIHR5cGU6IG9wdGltaXplZCBjb2RlLCBubyBkZWJ1ZyBpbmZvXG4gIFJlbGVhc2UgPSBcIlJlbGVhc2VcIixcblxuICAvLyBSZWxlYXNlIHdpdGggZGVidWcgaW5mbzogb3B0aW1pemVkIHdpdGggZGVidWcgc3ltYm9scyBpbmNsdWRlZFxuICBSZWxXaXRoRGViSW5mbyA9IFwiUmVsV2l0aERlYkluZm9cIixcblxuICAvLyBNaW5pbXVtIHNpemUgcmVsZWFzZTogb3B0aW1pemVkIGZvciBzbWFsbGVzdCBiaW5hcnkgc2l6ZVxuICBNaW5TaXplUmVsID0gXCJNaW5TaXplUmVsXCIsXG59O1xuXG4vLyBUaGUgZGVmYXVsdCBuYW1lIG9mIHRoZSBtYWluIENNYWtlIGJ1aWxkIGNvbmZpZ3VyYXRpb24gZmlsZVxuZXhwb3J0IGNvbnN0IENNQUtFX0xJU1RTX1RYVCA9IFwiQ01ha2VMaXN0cy50eHRcIjtcblxuZXhwb3J0IGVudW0gR2VuZXJhdG9yVHlwZSB7XG4gIC8vIE5hbWUgb2YgdGhlIENNYWtlIGdlbmVyYXRvciBmb3Igc3RhbmRhcmQgVW5peCAnbWFrZScgYnVpbGQgc3lzdGVtXG4gIFVuaXhNYWtlZmlsZXMgPSBcIlVuaXggTWFrZWZpbGVzXCIsXG59O1xuXG4vLyBOYW1lIG9mIHRoZSBDTWFrZSBnZW5lcmF0b3IgZm9yIHN0YW5kYXJkIFVuaXggJ21ha2UnIGJ1aWxkIHN5c3RlbVxuZXhwb3J0IGNvbnN0IERFRkFVTFRfR0VORVJBVE9SOiBHZW5lcmF0b3JUeXBlID0gR2VuZXJhdG9yVHlwZS5Vbml4TWFrZWZpbGVzO1xuIiwiLypcbiAqIE1JVCBMaWNlbnNlXG4gKlxuICogQ29weXJpZ2h0IChjKSAyMDI1ICBZdXJpaSBZYWt1YmluICh5dXJpaS55YWt1YmluQGdtYWlsLmNvbSlcbiAqXG4gKiBQZXJtaXNzaW9uIGlzIGdyYW50ZWQgdG8gdXNlLCBjb3B5LCBtb2RpZnksIGFuZCBkaXN0cmlidXRlIHRoaXMgc29mdHdhcmVcbiAqIHVuZGVyIHRoZSBNSVQgTGljZW5zZS4gU2VlIExJQ0VOU0UgZmlsZSBmb3IgZGV0YWlscy5cbiAqL1xuXG5pbXBvcnQgeyBCb29sZWFuVHlwZSB9IGZyb20gXCJAL2NtYWtlL0NvbnN0YW50c1wiO1xuXG5leHBvcnQgZnVuY3Rpb24gY29udmVydFRvVmFsdWUob2JqOiBhbnkpOiBzdHJpbmcge1xuICBpZiAoQXJyYXkuaXNBcnJheShvYmopKVxuICAgIHJldHVybiBvYmoubWFwKGkgPT4gY29udmVydFRvVmFsdWUoaSkpLmpvaW4oXCI7XCIpO1xuXG4gIGlmICh0eXBlb2Ygb2JqID09PSBcImJvb2xlYW5cIilcbiAgICByZXR1cm4gb2JqID8gQm9vbGVhblR5cGUuT04gOiBCb29sZWFuVHlwZS5PRkY7XG5cbiAgcmV0dXJuIG9iai50b1N0cmluZygpO1xufVxuIiwiLypcbiAqIE1JVCBMaWNlbnNlXG4gKlxuICogQ29weXJpZ2h0IChjKSAyMDI1ICBZdXJpaSBZYWt1YmluICh5dXJpaS55YWt1YmluQGdtYWlsLmNvbSlcbiAqXG4gKiBQZXJtaXNzaW9uIGlzIGdyYW50ZWQgdG8gdXNlLCBjb3B5LCBtb2RpZnksIGFuZCBkaXN0cmlidXRlIHRoaXMgc29mdHdhcmVcbiAqIHVuZGVyIHRoZSBNSVQgTGljZW5zZS4gU2VlIExJQ0VOU0UgZmlsZSBmb3IgZGV0YWlscy5cbiAqL1xuXG5pbXBvcnQgb3MgZnJvbSBcIm5vZGU6b3NcIjtcbmltcG9ydCBmcyBmcm9tIFwibm9kZTpmc1wiO1xuaW1wb3J0IHBhdGggZnJvbSBcIm5vZGU6cGF0aFwiO1xuXG5pbXBvcnQgeyBzcGF3bkFzeW5jIH0gZnJvbSBcIkAvdXRpbHMvQ2hpbGRQcm9jZXNzXCI7XG5pbXBvcnQgeyBDTUFLRV9MSVNUU19UWFQsIERFRkFVTFRfR0VORVJBVE9SLCBWYWx1ZVR5cGUgfSBmcm9tIFwiQC9jbWFrZS9Db25zdGFudHNcIjtcbmltcG9ydCB7IGNvbnZlcnRUb1ZhbHVlIH0gZnJvbSBcIkAvY21ha2UvSGVscGVyXCI7XG5pbXBvcnQgeyBIb3N0IH0gZnJvbSBcIkAvdXRpbHMvSG9zdFwiO1xuXG5mdW5jdGlvbiB0b1ZhclR5cGUoa2V5OiBzdHJpbmcsIHZhbDogYW55KSB7XG4gIGNvbnN0IG1hcDogYW55ID0ge1xuICAgIENNQUtFX0lOU1RBTExfUFJFRklYOiBWYWx1ZVR5cGUuUEFUSCxcbiAgICBDTUFLRV9UT09MQ0hBSU5fRklMRTogVmFsdWVUeXBlLkZJTEVQQVRILFxuICB9O1xuXG4gIGlmICh0eXBlb2YgdmFsID09PSBcImJvb2xlYW5cIilcbiAgICByZXR1cm4gVmFsdWVUeXBlLkJPT0w7XG5cbiAgaWYgKG1hcC5oYXNPd25Qcm9wZXJ0eShrZXkpKVxuICAgIHJldHVybiBtYXBba2V5XTtcblxuICByZXR1cm4gVmFsdWVUeXBlLlNUUklORztcbn1cblxuZnVuY3Rpb24gbWFrZUNtZFZhcmlhYmxlKGtleTogc3RyaW5nLCB2YWw6IGFueSwgaXNDYWNoZTogYm9vbGVhbikge1xuICBsZXQgbmFtZSA9IGtleTtcbiAgaWYgKGlzQ2FjaGUpXG4gICAgbmFtZSArPSBcIjpcIiArIHRvVmFyVHlwZShrZXksIHZhbCk7XG4gIHJldHVybiBuYW1lICsgXCI9XCIgKyBjb252ZXJ0VG9WYWx1ZSh2YWwpO1xufVxuXG5mdW5jdGlvbiBtYWtlQ21kVmFyaWFibGVzKHZhcmlhYmxlczogb2JqZWN0LCBpc0NhY2hlOiBib29sZWFuKTogc3RyaW5nW10ge1xuICBjb25zdCByZXN1bHQ6IHN0cmluZ1tdID0gW107XG4gIGZvciAoY29uc3QgW2tleSwgdmFsXSBvZiBPYmplY3QuZW50cmllcyh2YXJpYWJsZXMpKVxuICAgIHJlc3VsdC5wdXNoKFwiLURcIiwgbWFrZUNtZFZhcmlhYmxlKGtleSwgdmFsLCBpc0NhY2hlKSk7XG4gIHJldHVybiByZXN1bHQ7XG59XG5cbmV4cG9ydCBpbnRlcmZhY2UgU2NyaXB0TW9kZU9wdGlvbnMge1xuICBlbnZpcm9ubWVudD86IG9iamVjdDtcbiAgd29ya0Rpcj86IHN0cmluZztcbn07XG5cbmV4cG9ydCBjbGFzcyBDTWFrZVByb2Nlc3Mge1xuICBwcml2YXRlIF9jbWFrZVBhdGg6IHN0cmluZztcblxuICBwdWJsaWMgY29uc3RydWN0b3IoY21ha2VQYXRoOiBzdHJpbmcpIHtcbiAgICB0aGlzLl9jbWFrZVBhdGggPSBjbWFrZVBhdGg7XG4gIH1cblxuICBwdWJsaWMgYXN5bmMgc2NyaXB0TW9kZShzY3JpcHRGaWxlOiBzdHJpbmcsIHZhcmlhYmxlczogb2JqZWN0LCBvcHRpb25zPzogU2NyaXB0TW9kZU9wdGlvbnMpOiBQcm9taXNlPHZvaWQ+IHtcbiAgICBjb25zdCBzcGF3bkFyZ3MgPSBbXG4gICAgICAuLi5tYWtlQ21kVmFyaWFibGVzKHZhcmlhYmxlcywgZmFsc2UpLFxuICAgICAgXCItUFwiLCBzY3JpcHRGaWxlLFxuICAgIF07XG4gICAgY29uc3QgcmVzOiBhbnkgPSBhd2FpdCBzcGF3bkFzeW5jKHRoaXMuX2NtYWtlUGF0aCwgc3Bhd25BcmdzLCB7XG4gICAgICBjd2Q6IG9wdGlvbnM/LndvcmtEaXIsXG4gICAgICBlbnY6IG9wdGlvbnM/LmVudmlyb25tZW50IHx8IHByb2Nlc3MuZW52LFxuICAgIH0pO1xuICAgIGlmIChyZXMuc3RhdHVzICE9PSAwKSB7XG4gICAgICB0aHJvdyBgY21ha2Uuc2NyaXB0TW9kZSByZXR1cm5lZCBzdGF0dXMgJHtyZXMuc3RhdHVzfWA7XG4gICAgfVxuICB9XG5cbiAgcHVibGljIGFzeW5jIGNvbmZpZ3VyZShhcmdzOiBhbnkpOiBQcm9taXNlPHZvaWQ+IHtcbiAgICBjb25zdCBzcGF3bkFyZ3MgPSBbXG4gICAgICBcIi1HXCIsIGFyZ3MuZ2VuZXJhdG9yLFxuICAgICAgLi4ubWFrZUNtZFZhcmlhYmxlcyhhcmdzLmNhY2hlVmFyaWFibGVzLCB0cnVlKSxcbiAgICAgIFwiLVNcIiwgYXJncy5zb3VyY2VEaXIsXG4gICAgICBcIi1CXCIsIGFyZ3MuYmluYXJ5RGlyLFxuICAgIF07XG4gIFxuICAgIGNvbnN0IHJlczogYW55ID0gYXdhaXQgc3Bhd25Bc3luYyh0aGlzLl9jbWFrZVBhdGgsIHNwYXduQXJncywge1xuICAgICAgY3dkOiBhcmdzLmJpbmFyeURpcixcbiAgICAgIGVudjogYXJncy5lbnZpcm9ubWVudCB8fCBwcm9jZXNzLmVudixcbiAgICAgIGV4dHJhOiB7XG4gICAgICAgIG91dHB1dDogYGNtYWtlLmNvbmZpZ3VyZS5sb2dgLFxuICAgICAgfSxcbiAgICB9KTtcbiAgICBpZiAocmVzLnN0YXR1cyAhPT0gMCkge1xuICAgICAgdGhyb3cgYENNYWtlLmNvbmZpZ3VyZSByZXR1cm5lZCBzdGF0dXMgJHtyZXMuc3RhdHVzfWA7XG4gICAgfVxuICB9XG5cbiAgcHVibGljIGFzeW5jIGJ1aWxkKGFyZ3M6IGFueSk6IFByb21pc2U8dm9pZD4ge1xuICAgIGF3YWl0IHRoaXMuY29uZmlndXJlKGFyZ3MpO1xuICBcbiAgICBjb25zdCBzcGF3bkFyZ3M6IHN0cmluZ1tdID0gW1xuICAgICAgJy0tYnVpbGQnLCAnLicsXG4gICAgICAnLS1wYXJhbGxlbCcsIG9zLmF2YWlsYWJsZVBhcmFsbGVsaXNtKCkudG9TdHJpbmcoKSxcbiAgICBdO1xuICAgIGNvbnN0IHJlczogYW55ID0gYXdhaXQgc3Bhd25Bc3luYyh0aGlzLl9jbWFrZVBhdGgsIHNwYXduQXJncywge1xuICAgICAgY3dkOiBhcmdzLmJpbmFyeURpcixcbiAgICAgIGVudjogYXJncy5lbnZpcm9ubWVudCB8fCBwcm9jZXNzLmVudixcbiAgICAgIGV4dHJhOiB7XG4gICAgICAgIG91dHB1dDogYGNtYWtlLmJ1aWxkLmxvZ2AsXG4gICAgICB9LFxuICAgIH0pO1xuICAgIGlmIChyZXMuc3RhdHVzICE9PSAwKSB7XG4gICAgICB0aHJvdyBgQ01ha2UuYnVpbGQgcmV0dXJuZWQgc3RhdHVzICR7cmVzLnN0YXR1c31gO1xuICAgIH1cbiAgfVxuXG4gIHB1YmxpYyBhc3luYyBpbnN0YWxsKGFyZ3M6IGFueSk6IFByb21pc2U8dm9pZD4ge1xuICAgIGF3YWl0IHRoaXMuY29uZmlndXJlKGFyZ3MpO1xuXG4gICAgY29uc3Qgc3Bhd25BcmdzID0gW1xuICAgICAgJy0taW5zdGFsbCcsXG4gICAgICAnLicsXG4gICAgXTtcbiAgICBpZiAoYXJncy5pbnN0YWxsRGlyKSB7XG4gICAgICBzcGF3bkFyZ3MucHVzaCgnLS1wcmVmaXgnLCBhcmdzLmluc3RhbGxEaXIpO1xuICAgIH1cbiAgICBjb25zdCByZXM6IGFueSA9IGF3YWl0IHNwYXduQXN5bmModGhpcy5fY21ha2VQYXRoLCBzcGF3bkFyZ3MsIHtcbiAgICAgIGN3ZDogYXJncy5iaW5hcnlEaXIsXG4gICAgICBlbnY6IGFyZ3MuZW52aXJvbm1lbnQgfHwgcHJvY2Vzcy5lbnYsXG4gICAgICBleHRyYToge1xuICAgICAgICBvdXRwdXQ6IGBjbWFrZS5pbnN0YWxsLmxvZ2AsXG4gICAgICB9LFxuICAgIH0pO1xuICAgIGlmIChyZXMuc3RhdHVzICE9PSAwKSB7XG4gICAgICB0aHJvdyBgQ01ha2UuaW5zdGFsbCByZXR1cm5lZCBzdGF0dXMgJHtyZXMuc3RhdHVzfWA7XG4gICAgfVxuICB9XG4gIFxuICBwdWJsaWMgYXN5bmMgZXh0cmFjdChhcmdzOiBhbnkpOiBQcm9taXNlPHZvaWQ+IHtcbiAgICBjb25zdCBzcGF3bkFyZ3MgPSBbIFwiLUVcIiwgXCJ0YXJcIiwgXCIteHZmXCIsIGFyZ3MuZmlsZW5hbWUgXTtcbiAgICBjb25zdCByZXM6IGFueSA9IGF3YWl0IHNwYXduQXN5bmModGhpcy5fY21ha2VQYXRoLCBzcGF3bkFyZ3MsIHtcbiAgICAgIGN3ZDogYXJncy53b3JrRGlyIHx8IGFyZ3Muc291cmNlRGlyIHx8IGFyZ3MuYmluYXJ5RGlyLFxuICAgICAgZW52OiBhcmdzLmVudmlyb25tZW50IHx8IHByb2Nlc3MuZW52LFxuICAgICAgZXh0cmE6IHtcbiAgICAgICAgb3V0cHV0OiBhcmdzLmxvZ0ZpbGUgfHwgYGNtYWtlLmV4dHJhY3QubG9nYCxcbiAgICAgIH0sXG4gICAgfSk7XG4gICAgaWYgKHJlcy5zdGF0dXMgIT09IDApIHtcbiAgICAgIHRocm93IGBFeHRyYWN0IHJldHVybmVkIHN0YXR1cyAke3Jlcy5zdGF0dXN9YDtcbiAgICB9XG4gIH1cbn07XG5cbmxldCBfY21ha2VJbnN0YW5jZTogQ01ha2VQcm9jZXNzO1xuZXhwb3J0IG5hbWVzcGFjZSBDTWFrZVByb2Nlc3Mge1xuICBleHBvcnQgZnVuY3Rpb24gZ2V0SW5zdGFuY2UoKTogQ01ha2VQcm9jZXNzIHtcbiAgICBpZiAoIV9jbWFrZUluc3RhbmNlKVxuICAgICAgX2NtYWtlSW5zdGFuY2UgPSBuZXcgQ01ha2VQcm9jZXNzKFwiY21ha2VcIiArIEhvc3QuZXhlY3V0YWJsZVN1ZmZpeCk7XG4gICAgcmV0dXJuIF9jbWFrZUluc3RhbmNlO1xuICB9XG59XG5cbmV4cG9ydCBjbGFzcyBDVGVzdFByb2Nlc3Mge1xuICBwcml2YXRlIF9jdGVzdFBhdGg6IHN0cmluZztcblxuICBwdWJsaWMgY29uc3RydWN0b3IoY3Rlc3RQYXRoOiBzdHJpbmcpIHtcbiAgICB0aGlzLl9jdGVzdFBhdGggPSBjdGVzdFBhdGg7XG4gIH1cblxuICBwdWJsaWMgYXN5bmMgY3Rlc3QoYXJnczogYW55KTogUHJvbWlzZTx2b2lkPiB7XG4gICAgY29uc3Qgc3Bhd25BcmdzOiBzdHJpbmdbXSA9IFtdO1xuICAgIGNvbnN0IHJlczogYW55ID0gYXdhaXQgc3Bhd25Bc3luYyh0aGlzLl9jdGVzdFBhdGgsIHNwYXduQXJncywge1xuICAgICAgY3dkOiBhcmdzLmJpbmFyeURpcixcbiAgICAgIGVudjogYXJncy5lbnZpcm9ubWVudCB8fCBwcm9jZXNzLmVudixcbiAgICAgIGV4dHJhOiB7XG4gICAgICAgIG91dHB1dDogYGNtYWtlLmN0ZXN0LmxvZ2AsXG4gICAgICB9LFxuICAgIH0pO1xuICAgIGlmIChyZXMuc3RhdHVzICE9PSAwKSB7XG4gICAgICB0aHJvdyBgQ1Rlc3QgcmV0dXJuZWQgc3RhdHVzICR7cmVzLnN0YXR1c31gO1xuICAgIH1cbiAgfVxufTtcblxubGV0IF9jdGVzdEluc3RhbmNlOiBDVGVzdFByb2Nlc3M7XG5leHBvcnQgbmFtZXNwYWNlIENUZXN0UHJvY2VzcyB7XG4gIGV4cG9ydCBmdW5jdGlvbiBnZXRJbnN0YW5jZSgpOiBDVGVzdFByb2Nlc3Mge1xuICAgIGlmICghX2N0ZXN0SW5zdGFuY2UpXG4gICAgICBfY3Rlc3RJbnN0YW5jZSA9IG5ldyBDVGVzdFByb2Nlc3MoXCJjdGVzdFwiICsgSG9zdC5leGVjdXRhYmxlU3VmZml4KTtcbiAgICByZXR1cm4gX2N0ZXN0SW5zdGFuY2U7XG4gIH1cbn1cblxuZXhwb3J0IGFzeW5jIGZ1bmN0aW9uIGdldFByb2plY3RJbmZvKHNvdXJjZTogc3RyaW5nKSB7XG4gIGNvbnN0IHN0YXQgPSBhd2FpdCBmcy5wcm9taXNlcy5zdGF0KHNvdXJjZSk7XG4gIGlmIChzdGF0LmlzRGlyZWN0b3J5KCkpXG4gICAgc291cmNlID0gcGF0aC5yZXNvbHZlKHNvdXJjZSwgQ01BS0VfTElTVFNfVFhUKTtcbiAgY29uc3QgY29udGVudCA9IGF3YWl0IGZzLnByb21pc2VzLnJlYWRGaWxlKHNvdXJjZSwgeyBlbmNvZGluZzogJ3V0ZjgnIH0pO1xuXG4gIGNvbnN0IHByb2plY3RQYXR0ZXJuID0gL3Byb2plY3QgKlxcKCAqKFteIF0rKSAqKFteKV0qKVxcKS87XG4gIGNvbnN0IHZlcnNpb25QYXR0ZXJuID0gL1ZFUlNJT04gKyhbXiBdKykvO1xuXG4gIGNvbnN0IHJlc3VsdDogYW55ID0ge307XG4gIGxldCBtYXRjaCA9IGNvbnRlbnQubWF0Y2gocHJvamVjdFBhdHRlcm4pO1xuICBpZiAobWF0Y2gpIHtcbiAgICByZXN1bHQubmFtZSA9IG1hdGNoWzFdO1xuICAgIGNvbnN0IHByb2plY3RDb250ZW50ID0gbWF0Y2hbMl07XG4gICAgbWF0Y2ggPSBwcm9qZWN0Q29udGVudC5tYXRjaCh2ZXJzaW9uUGF0dGVybik7XG4gICAgaWYgKG1hdGNoKVxuICAgICAgcmVzdWx0LnZlcnNpb24gPSBtYXRjaFsxXTtcbiAgfVxuXG4gIHJldHVybiByZXN1bHQ7XG59XG5cbmV4cG9ydCBmdW5jdGlvbiBsaW5lVG9TaW5nbENvbW1lbnQobGluZTogc3RyaW5nKSB7XG4gIHJldHVybiBcIiMgXCIgKyBsaW5lO1xufVxuXG5leHBvcnQgZnVuY3Rpb24gbGluZVRvTXVsdGlwbGVDb21tZW50KGxpbmU6IHN0cmluZykge1xuICByZXR1cm4gYCNbPT09WyAke2xpbmV9IF09PT1dYDtcbn1cblxuZXhwb3J0IGZ1bmN0aW9uIGdlbmVyYXRlZFNjcmlwdE5hbWVDb21tZW50KGZpbGVuYW1lOiBzdHJpbmcpIHtcbiAgcmV0dXJuIGxpbmVUb1NpbmdsQ29tbWVudChcIkdlbmVyYXRlZCBmcm9tIFwiICsgcGF0aC5iYXNlbmFtZShmaWxlbmFtZSkpO1xufVxuXG5leHBvcnQgeyBERUZBVUxUX0dFTkVSQVRPUiB9O1xuIiwiLypcbiAqIE1JVCBMaWNlbnNlXG4gKlxuICogQ29weXJpZ2h0IChjKSAyMDI1ICBZdXJpaSBZYWt1YmluICh5dXJpaS55YWt1YmluQGdtYWlsLmNvbSlcbiAqXG4gKiBQZXJtaXNzaW9uIGlzIGdyYW50ZWQgdG8gdXNlLCBjb3B5LCBtb2RpZnksIGFuZCBkaXN0cmlidXRlIHRoaXMgc29mdHdhcmVcbiAqIHVuZGVyIHRoZSBNSVQgTGljZW5zZS4gU2VlIExJQ0VOU0UgZmlsZSBmb3IgZGV0YWlscy5cbiAqL1xuXG5pbXBvcnQgZnMgZnJvbSBcIm5vZGU6ZnNcIjtcbmltcG9ydCB1cmwgZnJvbSBcIm5vZGU6dXJsXCI7XG5cbmltcG9ydCB7IENNYWtlUHJvY2VzcyB9IGZyb20gXCJAL2NtYWtlXCI7XG5pbXBvcnQgeyBQYXRoIH0gZnJvbSBcIkAvdXRpbHMvUGF0aFwiO1xuaW1wb3J0IHsgbWFrZVBhdGNoIH0gZnJvbSBcIkAvdXRpbHMvTWFrZVBhdGNoXCI7XG5pbXBvcnQgeyBzYXZlSWZEaWZmZXJlbnQsIGRpcmVjdG9yeUV4aXN0cyB9IGZyb20gXCJAL3V0aWxzL0ZpbGVTeXN0ZW1cIjtcbmltcG9ydCB7IFNldHRpbmdzU3RvcmFnZSB9IGZyb20gXCJAL3V0aWxzL1NldHRpbmdzU3RvcmFnZVwiO1xuaW1wb3J0IHsgYXJyYXlXcmFwcGVyLCBhc3NpZ25PYmplY3QgfSBmcm9tIFwiQC91dGlscy9QcmltaXRpdmVzXCI7XG5pbXBvcnQgeyBVU0VSX0NPTkZJRywgQlVJTERfU0VUVElOR1NfRklMRSwgUkVRVUVTVF9BVFRFTVBUUyB9IGZyb20gXCJAL0NvbnN0YW50c1wiO1xuaW1wb3J0IHsgREVCVUdfQlVJTERfVFlQRSwgUkVMRUFTRV9CVUlMRF9UWVBFIH0gZnJvbSBcIkAvY29yZS9UeXBlc1wiO1xuaW1wb3J0IHsgSU1QT1JUX1NDSEVNRSB9IGZyb20gXCJAL3V0aWxzL1VybFNjaGVtZVwiO1xuaW1wb3J0IHsgcmVxdWlyZVJlc29sdmUgfSBmcm9tIFwiQC91dGlscy9Nb2R1bGVcIjtcbmltcG9ydCB7IGRvd25sb2FkRmlsZSB9IGZyb20gXCJAL3V0aWxzL0h0dHBSZXF1ZXN0XCI7XG5pbXBvcnQgeyBDb21tYW5kT3B0aW9ucyB9IGZyb20gXCJAL2NvcmUvQ29tbWFuZE9wdGlvbnNcIjtcbmltcG9ydCB7IExvZ2dlciB9IGZyb20gXCJAL2xvZ2dlclwiO1xuaW1wb3J0IHsgZmlsZUV4aXN0cyB9IGZyb20gXCJAL3V0aWxzL0ZpbGVTeXN0ZW1cIjtcbmltcG9ydCB7IGltcG9ydE1vZHVsZSB9IGZyb20gXCJAL3V0aWxzL01vZHVsZVwiO1xuXG5pbXBvcnQgYWN0aW9ucyBmcm9tIFwiQC9hY3Rpb25zXCI7XG5cbmNvbnN0IGxvZ2dlciA9IExvZ2dlci5jcmVhdGUoaW1wb3J0Lm1ldGEudXJsKTtcblxuaW50ZXJmYWNlIElHZW5lcmFsQ29uZmlnIHtcbiAgd29ya0Rpcjogc3RyaW5nO1xuICBidWlsZFR5cGU6IHN0cmluZztcbn07XG5cbmZ1bmN0aW9uIG1lcmdlRW52aXJvbm1lbnQoLi4uYXJnczogYW55KSB7XG4gIGNvbnN0IGVudmlyb25tZW50OiBhbnkgPSB7fTtcbiAgZm9yIChjb25zdCBlbnYgb2YgYXJncykge1xuICAgIGNvbnN0IGxpc3Q6IGFueSA9IE9iamVjdC5lbnRyaWVzKGVudiB8fCB7fSk7XG4gICAgd2hpbGUgKGxpc3QubGVuZ3RoKSB7XG4gICAgICBsZXQgW2tleSx2YWxdID0gbGlzdC5wb3AoKTtcbiAgICAgIGxldCBkZWxpbWl0ZXI7XG4gICAgICBsZXQgam9pbkFmdGVyID0gdHJ1ZTtcbiAgICAgIHN3aXRjaCAoa2V5KSB7XG4gICAgICBjYXNlIFwiUGF0aFwiOlxuICAgICAgY2FzZSBcIlBBVEhcIjpcbiAgICAgICAgZGVsaW1pdGVyID0gUGF0aC5kZWxpbWl0ZXI7XG4gICAgICAgIGpvaW5BZnRlciA9IGZhbHNlO1xuICAgICAgICBicmVhaztcbiAgICAgIGNhc2UgXCJDRkxBR1NcIjpcbiAgICAgIGNhc2UgXCJDWFhGTEFHU1wiOlxuICAgICAgY2FzZSBcIkxERkxBR1NcIjpcbiAgICAgICAgZGVsaW1pdGVyID0gXCIgXCI7XG4gICAgICAgIGJyZWFrO1xuICAgICAgfVxuICAgICAgaWYgKHR5cGVvZiB2YWwgPT09ICdudW1iZXInKVxuICAgICAgICB2YWwgPSB2YWwudG9TdHJpbmcoKTtcbiAgICAgIGVsc2UgaWYgKEFycmF5LmlzQXJyYXkodmFsKSlcbiAgICAgICAgdmFsID0gdmFsLmpvaW4oZGVsaW1pdGVyKTtcbiAgICAgIGlmICghZGVsaW1pdGVyIHx8ICFlbnZpcm9ubWVudFtrZXldKVxuICAgICAgICBlbnZpcm9ubWVudFtrZXldID0gdmFsO1xuICAgICAgZWxzZSBpZiAoam9pbkFmdGVyKVxuICAgICAgICBlbnZpcm9ubWVudFtrZXldID0gdmFsICsgZGVsaW1pdGVyICsgZW52aXJvbm1lbnRba2V5XTtcbiAgICAgIGVsc2VcbiAgICAgICAgZW52aXJvbm1lbnRba2V5XSA9IGVudmlyb25tZW50W2tleV0gKyBkZWxpbWl0ZXIgKyB2YWw7XG4gICAgfVxuICB9XG4gIHJldHVybiBlbnZpcm9ubWVudDtcbn1cblxuZnVuY3Rpb24gcmViYXNlQ29uZmlnKGNvbmZpZzogYW55KSB7XG4gIGNvbnN0IGJhc2VDb25maWc6IGFueSA9IHt9O1xuICBjb25zdCBvdGhlckNvbmZpZzogYW55ID0ge307XG5cbiAgZm9yIChjb25zdCBba2V5LCBlbnRyeV0gb2YgT2JqZWN0LmVudHJpZXMoY29uZmlnKSBhcyBhbnkpIHtcbiAgICAoZW50cnkuYmFzZSA/IG90aGVyQ29uZmlnIDogYmFzZUNvbmZpZylba2V5XSA9IGVudHJ5O1xuICB9XG5cbiAgd2hpbGUgKHRydWUpIHtcbiAgICBjb25zdCBrZXlzID0gT2JqZWN0LmtleXMob3RoZXJDb25maWcpO1xuICAgIGlmIChrZXlzLmxlbmd0aCA9PSAwKVxuICAgICAgYnJlYWs7XG4gICAgY29uc3QgZG9uZUtleXMgPSBbXTtcbiAgICBmb3IgKGNvbnN0IGtleSBvZiBrZXlzKSB7XG4gICAgICBjb25zdCBvdGhlckl0ZXIgPSBvdGhlckNvbmZpZ1trZXldO1xuICAgICAgY29uc3QgYmFzZUxpc3QgPSBbXTtcbiAgICAgIGZvciAoY29uc3QgaXRlciBvZiBhcnJheVdyYXBwZXIob3RoZXJJdGVyLmJhc2UpKSB7XG4gICAgICAgIGNvbnN0IGJhc2VFbnRyeSA9IGJhc2VDb25maWdbaXRlcl07XG4gICAgICAgIGlmICghYmFzZUVudHJ5KSB7XG4gICAgICAgICAgYmFzZUxpc3QubGVuZ3RoID0gMDtcbiAgICAgICAgICBicmVhaztcbiAgICAgICAgfVxuICAgICAgICBiYXNlTGlzdC5wdXNoKGJhc2VFbnRyeSk7XG4gICAgICB9XG4gICAgICBpZiAoYmFzZUxpc3QubGVuZ3RoKSB7XG4gICAgICAgIGJhc2VMaXN0LnB1c2gob3RoZXJJdGVyKTtcbiAgICAgICAgbGV0IG5ld0VudHJ5ID0ge307XG4gICAgICAgIGZvciAoY29uc3QgaXRlciBvZiBiYXNlTGlzdCkge1xuICAgICAgICAgIGFzc2lnbk9iamVjdChuZXdFbnRyeSwgaXRlcik7XG4gICAgICAgIH1cbiAgICAgICAgYmFzZUNvbmZpZ1trZXldID0gbmV3RW50cnk7XG4gICAgICAgIGRvbmVLZXlzLnB1c2goa2V5KTtcbiAgICAgIH1cbiAgICB9XG4gICAgaWYgKGRvbmVLZXlzLmxlbmd0aCA9PSAwKSB7XG4gICAgICBmb3IgKGNvbnN0IGtleSBvZiBrZXlzKVxuICAgICAgICB0aHJvdyBgQ2FuJ3Qgc2V0IGJhc2UgY29uZmlnIGZvciBcIiR7a2V5fWA7XG4gICAgfVxuICAgIGZvciAoY29uc3Qga2V5IG9mIGRvbmVLZXlzKSB7XG4gICAgICBkZWxldGUgYmFzZUNvbmZpZ1trZXldLmJhc2U7XG4gICAgICBkZWxldGUgb3RoZXJDb25maWdba2V5XTtcbiAgICB9XG4gIH1cblxuICByZXR1cm4gYmFzZUNvbmZpZztcbn1cblxuZnVuY3Rpb24gcmVzb2x2ZVN0cmluZ1dpdGhWYXJpYWJsZShjb25maWc6IGFueSwgZW50cnlDb25maWc6IGFueSwgcm9vdENvbmZpZzogYW55LCB2YWw6IGFueSkge1xuICByZXR1cm4gdmFsLnJlcGxhY2UoL1xcJFxceyhbXn1dKylcXH0vZywgKG1hdGNoOiBhbnksIHZhbHVlOiBhbnkpID0+IHtcbiAgICBsZXQgc2VsO1xuICAgIGZvciAoY29uc3QgbmFtZSBvZiB2YWx1ZS5zcGxpdChcIi5cIikpIHtcbiAgICAgIGlmIChzZWwgPT09IHVuZGVmaW5lZCkge1xuICAgICAgICBpZiAoY29uZmlnLmhhc093blByb3BlcnR5KG5hbWUpKVxuICAgICAgICAgIHNlbCA9IGNvbmZpZ1tuYW1lXTtcbiAgICAgICAgZWxzZSBpZiAoY29uZmlnICE9PSBlbnRyeUNvbmZpZyAmJiBlbnRyeUNvbmZpZy5oYXNPd25Qcm9wZXJ0eShuYW1lKSlcbiAgICAgICAgICBzZWwgPSBlbnRyeUNvbmZpZ1tuYW1lXTtcbiAgICAgICAgZWxzZSBpZiAoY29uZmlnICE9PSByb290Q29uZmlnICYmIHJvb3RDb25maWcuaGFzT3duUHJvcGVydHkobmFtZSkpXG4gICAgICAgICAgc2VsID0gcm9vdENvbmZpZ1tuYW1lXTtcbiAgICAgICAgZWxzZSB7XG4gICAgICAgICAgdHJ5IHtcbiAgICAgICAgICAgIGNvbnN0IG1haW5GaWxlID0gcmVxdWlyZVJlc29sdmUobmFtZSk7XG4gICAgICAgICAgICBpZiAobWFpbkZpbGUpIHtcbiAgICAgICAgICAgICAgc2VsID0geyBtYWluRmlsZSwgbWFpbkRpcjogUGF0aC5kaXJuYW1lKG1haW5GaWxlKSwgfTtcbiAgICAgICAgICAgIH1cbiAgICAgICAgIH0gY2F0Y2goZSkge31cbiAgICAgICAgfVxuICAgICAgICBpZiAoc2VsID09PSB1bmRlZmluZWQpXG4gICAgICAgICAgYnJlYWs7XG4gICAgICB9XG4gICAgICBlbHNlIGlmIChzZWwuaGFzT3duUHJvcGVydHkobmFtZSkpIHtcbiAgICAgICAgc2VsID0gc2VsW25hbWVdO1xuICAgICAgfVxuICAgICAgZWxzZSB7XG4gICAgICAgIHNlbCA9IHVuZGVmaW5lZDtcbiAgICAgICAgYnJlYWs7XG4gICAgICB9XG4gICAgfVxuICAgIGlmIChzZWwgPT09IHVuZGVmaW5lZClcbiAgICAgIHRocm93IG5ldyBFcnJvcihgVGhlICR7dmFsdWV9IHZhcmlhYmxlIGRvZXMgbm90IGV4aXN0XCJgKTtcbiAgICByZXR1cm4gc2VsO1xuICB9KTtcbn1cblxuZnVuY3Rpb24gcmVzb2x2ZUNvbmZpZ1N0cmluZ3NJbXBsKGNvbmZpZzogYW55LCBlbnRyeUNvbmZpZzogYW55LCByb290Q29uZmlnOiBhbnkpIHtcbiAgbGV0IGNvdW50ID0gMDtcbiAgZm9yIChjb25zdCBba2V5LCB2YWxdIG9mIE9iamVjdC5lbnRyaWVzKGNvbmZpZykpIHtcbiAgICBpZiAodmFsICYmIHR5cGVvZiB2YWwgPT09IFwib2JqZWN0XCIpXG4gICAgICBjb3VudCArPSByZXNvbHZlQ29uZmlnU3RyaW5nc0ltcGwodmFsLCBlbnRyeUNvbmZpZywgcm9vdENvbmZpZyk7XG4gICAgZWxzZSBpZiAodHlwZW9mIHZhbCA9PT0gXCJzdHJpbmdcIikge1xuICAgICAgY29uc3QgdiA9IHJlc29sdmVTdHJpbmdXaXRoVmFyaWFibGUoY29uZmlnLCBlbnRyeUNvbmZpZywgcm9vdENvbmZpZywgdmFsKTtcbiAgICAgIGlmICh2YWwgIT09IHYpIHtcbiAgICAgICAgY29uZmlnW2tleV0gPSB2O1xuICAgICAgICBjb3VudCsrO1xuICAgICAgfVxuICAgIH1cbiAgfVxuICByZXR1cm4gY291bnQ7XG59XG5cbmZ1bmN0aW9uIHJlc29sdmVDb25maWdTdHJpbmdzKGNvbmZpZzogYW55KSB7XG4gIGZvciAoOzspIHtcbiAgICBsZXQgY291bnQgPSAwO1xuICAgIGZvciAoY29uc3QgW2tleSwgdmFsXSBvZiBPYmplY3QuZW50cmllcyhjb25maWcpKSB7XG4gICAgICBpZiAodmFsICYmIHR5cGVvZiB2YWwgPT09IFwib2JqZWN0XCIpXG4gICAgICAgIGNvdW50ICs9IHJlc29sdmVDb25maWdTdHJpbmdzSW1wbCh2YWwsIHZhbCwgY29uZmlnKTtcbiAgICAgIGVsc2UgIGlmICh0eXBlb2YgdmFsID09PSBcInN0cmluZ1wiKSB7XG4gICAgICAgIGNvbnN0IHYgPSByZXNvbHZlU3RyaW5nV2l0aFZhcmlhYmxlKGNvbmZpZywgY29uZmlnLCBjb25maWcsIHZhbCk7XG4gICAgICAgIGlmICh2YWwgIT09IHYpIHtcbiAgICAgICAgICBjb25maWdba2V5XSA9IHY7XG4gICAgICAgICAgY291bnQrKztcbiAgICAgICAgfVxuICAgICAgfVxuICAgIH1cbiAgICBpZiAoIWNvdW50KVxuICAgICAgYnJlYWs7XG4gIH1cbn1cblxuZnVuY3Rpb24gbWFrZUJ1aWxkQ29uZmlnKGdjb25maWc6IElHZW5lcmFsQ29uZmlnLCBjb25maWc6IGFueSkge1xuICBpZiAoY29uZmlnW1wic291cmNlUm9vdFwiXSkge1xuICAgIHRocm93IG5ldyBFcnJvcihgVmFyaWFibGUgXCJzb3VyY2VSb290XCIgY2Fubm90IGJlIGNoYW5nZWQgdG8gXCIke2NvbmZpZy5zb3VyY2VSb290fVwiYCk7XG4gIH1cblxuICBjb25zdCByb290Q29uZmlnID0gcmViYXNlQ29uZmlnKGNvbmZpZyk7XG5cbiAgcm9vdENvbmZpZy5idWlsZFR5cGUgPSByb290Q29uZmlnLmJ1aWxkVHlwZSB8fCBnY29uZmlnLmJ1aWxkVHlwZTtcbiAgcm9vdENvbmZpZy5zb3VyY2VSb290ID0gcm9vdENvbmZpZy5zb3VyY2VSb290IHx8IGdjb25maWcud29ya0RpcjtcbiAgcm9vdENvbmZpZy5iaW5hcnlSb290ID0gcm9vdENvbmZpZy5iaW5hcnlSb290IHx8IFBhdGguam9pbihnY29uZmlnLndvcmtEaXIsIFwiYnVpbGRcIik7XG5cbiAgZm9yIChjb25zdCBba2V5LCBlbnRyeV0gb2YgT2JqZWN0LmVudHJpZXMocm9vdENvbmZpZykgYXMgYW55KSB7XG4gICAgaWYgKGVudHJ5ICYmIHR5cGVvZiBlbnRyeSA9PT0gXCJvYmplY3RcIiAmJiBlbnRyeS5hY3Rpb24pIHtcbiAgICAgIGVudHJ5LmJ1aWxkVHlwZSA9IGVudHJ5LmJ1aWxkVHlwZSB8fCByb290Q29uZmlnLmJ1aWxkVHlwZTtcbiAgICAgIGNvbnN0IGZvbGRlciA9IGtleS5yZXBsYWNlKFwiOlwiLCBQYXRoLnNlcCk7XG4gICAgICBjb25zdCB3b3JrRGlyID0gUGF0aC5qb2luKHJvb3RDb25maWcuYmluYXJ5Um9vdCwgZm9sZGVyKTtcbiAgICAgIGVudHJ5LnRlbXBEaXIgPSBlbnRyeS50ZW1wRGlyIHx8IFBhdGguam9pbih3b3JrRGlyLCBcInRtcFwiKTtcbiAgICAgIGlmIChlbnRyeS5zb3VyY2VVcmwpIHtcbiAgICAgICAgaWYgKGVudHJ5LnNvdXJjZVVybC5zdGFydHNXaXRoKElNUE9SVF9TQ0hFTUUpKSB7XG4gICAgICAgICAgY29uc3QgZmlsZW5hbWUgPSByZXF1aXJlUmVzb2x2ZShlbnRyeS5zb3VyY2VVcmwuc2xpY2UoSU1QT1JUX1NDSEVNRS5sZW5ndGgpKTtcbiAgICAgICAgICBlbnRyeS5zb3VyY2VEaXIgPSBQYXRoLmRpcm5hbWUoZmlsZW5hbWUpO1xuICAgICAgICB9XG4gICAgICAgIGVsc2Uge1xuICAgICAgICAgIGVudHJ5LmFyY2hpdmVEaXIgPSBlbnRyeS5hcmNoaXZlRGlyIHx8IFBhdGguam9pbih3b3JrRGlyLCBcImFyY1wiKTtcbiAgICAgICAgICBlbnRyeS5leHRyYWN0RGlyID0gZW50cnkuZXh0cmFjdERpciB8fCBQYXRoLmpvaW4od29ya0RpciwgXCJzcmNcIik7XG4gICAgICAgICAgaWYgKCFlbnRyeS5zb3VyY2VEaXIpXG4gICAgICAgICAgICBlbnRyeS5zb3VyY2VEaXIgPSBlbnRyeS5leHRyYWN0RGlyO1xuICAgICAgICAgIGVsc2UgaWYgKCFQYXRoLmlzQWJzb2x1dGUoZW50cnkuc291cmNlRGlyKSlcbiAgICAgICAgICAgIGVudHJ5LnNvdXJjZURpciA9IFBhdGguam9pbihlbnRyeS5leHRyYWN0RGlyLCBlbnRyeS5zb3VyY2VEaXIpO1xuICAgICAgICB9XG4gICAgICB9XG4gICAgICBlbHNlIGlmICghZW50cnkuc291cmNlRGlyKSB7XG4gICAgICAgIHRocm93IG5ldyBFcnJvcihgTWlzc2luZyBzb3VyY2VEaXIgZm9yICR7a2V5fSBhY3Rpb25cImApO1xuICAgICAgfVxuICAgICAgaWYgKGVudHJ5LmJpbmFyeURpciA9PT0gbnVsbClcbiAgICAgICAgZW50cnkuYmluYXJ5RGlyID0gZW50cnkuc291cmNlRGlyO1xuICAgICAgZWxzZSBpZiAoZW50cnkuYmluYXJ5RGlyID09PSB1bmRlZmluZWQpXG4gICAgICAgIGVudHJ5LmJpbmFyeURpciA9IFBhdGguam9pbih3b3JrRGlyLCBcImJpblwiKTtcbiAgICB9XG4gIH1cblxuICByZXNvbHZlQ29uZmlnU3RyaW5ncyhyb290Q29uZmlnKTtcblxuICByZXR1cm4gcm9vdENvbmZpZztcbn1cblxuYXN5bmMgZnVuY3Rpb24gZG9FeHRyYWN0QXJjaGl2ZShnY29uZmlnOiBJR2VuZXJhbENvbmZpZywgZW52aXJvbm1lbnQ6IGFueSwgY29uZmlnOiBhbnksIHNldHRpbmdzOiBhbnkpIHtcbiAgaWYgKCFjb25maWcuc291cmNlVXJsKVxuICAgIHRocm93IG5ldyBFcnJvcihcIlVua25vd24gc291cmNlVXJsXCIpO1xuICBpZiAoIWNvbmZpZy5hcmNoaXZlRGlyKVxuICAgIHRocm93IG5ldyBFcnJvcihcIlVua25vd24gYXJjaGl2ZURpclwiKTtcbiAgaWYgKCFjb25maWcuZXh0cmFjdERpcilcbiAgICB0aHJvdyBuZXcgRXJyb3IoXCJVbmtub3duIGV4dHJhY3REaXJcIik7XG5cbiAgaWYgKCFhd2FpdCBkaXJlY3RvcnlFeGlzdHMoY29uZmlnLmFyY2hpdmVEaXIpKSB7XG4gICAgbG9nZ2VyLm5vdGljZShgbWtkaXIgLXAgJHtjb25maWcuYXJjaGl2ZURpcn1gKTtcbiAgICBhd2FpdCBmcy5wcm9taXNlcy5ta2Rpcihjb25maWcuYXJjaGl2ZURpciwgeyByZWN1cnNpdmU6IHRydWUgfSk7XG4gIH1cblxuICBpZiAoIWF3YWl0IGRpcmVjdG9yeUV4aXN0cyhjb25maWcudGVtcERpcikpIHtcbiAgICBsb2dnZXIubm90aWNlKGBta2RpciAtcCAke2NvbmZpZy50ZW1wRGlyfWApO1xuICAgIGF3YWl0IGZzLnByb21pc2VzLm1rZGlyKGNvbmZpZy50ZW1wRGlyLCB7IHJlY3Vyc2l2ZTogdHJ1ZSB9KTtcbiAgfVxuXG4gIGNvbnN0IGFyY05hbWUgPSBQYXRoLmJhc2VuYW1lKGNvbmZpZy5zb3VyY2VVcmwpO1xuXG4gIGxldCBhcmNGaWxlO1xuICBsZXQgZG93bmxvYWRVcmxzID0gYXdhaXQgc2V0dGluZ3MuZ2V0KFwiZG93bmxvYWRVcmxzXCIpIHx8IHt9O1xuICBpZiAoZG93bmxvYWRVcmxzW2NvbmZpZy5zb3VyY2VVcmxdKVxuICAgIGFyY0ZpbGUgPSBkb3dubG9hZFVybHNbY29uZmlnLnNvdXJjZVVybF07XG4gIGVsc2Uge1xuICAgIGFyY0ZpbGUgPSBQYXRoLmpvaW4oY29uZmlnLmFyY2hpdmVEaXIsIGFyY05hbWUpO1xuICAgIGF3YWl0IGRvd25sb2FkRmlsZShjb25maWcuc291cmNlVXJsLCBhcmNGaWxlLCB7IGF0dGVtcHRzOiBSRVFVRVNUX0FUVEVNUFRTIH0pO1xuICAgIGRvd25sb2FkVXJsc1tjb25maWcuc291cmNlVXJsXSA9IGFyY0ZpbGU7XG4gICAgYXdhaXQgc2V0dGluZ3Muc2V0KFwiZG93bmxvYWRVcmxzXCIsIGRvd25sb2FkVXJscyk7XG4gIH1cblxuICBsZXQgZXh0cmFjdERpcjtcbiAgbGV0IGV4dHJhY3RGaWxlcyA9IGF3YWl0IHNldHRpbmdzLmdldChcImV4dHJhY3RGaWxlc1wiKSB8fCB7fTtcbiAgaWYgKGV4dHJhY3RGaWxlc1thcmNGaWxlXSkge1xuICAgIGV4dHJhY3REaXIgPSBleHRyYWN0RmlsZXNbYXJjRmlsZV07XG4gIH1cbiAgZWxzZSB7XG4gICAgZXh0cmFjdERpciA9IGF3YWl0IGZzLnByb21pc2VzLm1rZHRlbXAoUGF0aC5yZXNvbHZlKGNvbmZpZy50ZW1wRGlyLCBhcmNOYW1lICsgJy4nKSk7XG4gIFxuICAgIGF3YWl0IENNYWtlUHJvY2Vzcy5nZXRJbnN0YW5jZSgpLmV4dHJhY3Qoe1xuICAgICAgZW52aXJvbm1lbnQsXG4gICAgICBmaWxlbmFtZTogYXJjRmlsZSxcbiAgICAgIHdvcmtEaXI6IGV4dHJhY3REaXIsXG4gICAgICBsb2dGaWxlOiAgUGF0aC5qb2luKGNvbmZpZy50ZW1wRGlyLCBQYXRoLmJhc2VuYW1lKGV4dHJhY3REaXIpICsgXCIubG9nXCIpLFxuICAgIH0pO1xuICBcbiAgICBjb25zdCBleHRyYWN0TGlzdCA9IGF3YWl0IGZzLnByb21pc2VzLnJlYWRkaXIoZXh0cmFjdERpcik7XG4gICAgaWYgKGV4dHJhY3RMaXN0Lmxlbmd0aCA9PT0gMSkge1xuICAgICAgZXh0cmFjdERpciA9IFBhdGgucmVzb2x2ZShleHRyYWN0RGlyLCBleHRyYWN0TGlzdFswXSk7XG4gICAgICBpZiAoIWF3YWl0IGRpcmVjdG9yeUV4aXN0cyhleHRyYWN0RGlyKSkge1xuICAgICAgICBsb2dnZXIubm90aWNlKGBybSAtZnIgJHtleHRyYWN0RGlyfWApO1xuICAgICAgICBhd2FpdCBmcy5wcm9taXNlcy5ybShleHRyYWN0RGlyLCB7IHJlY3Vyc2l2ZTogdHJ1ZSB9KTtcbiAgICAgICAgdGhyb3cgbmV3IEVycm9yKGBTdXBwb3J0IG9ubHkgZGlyZWN0b3J5IGZvciBhcmNoaXZlYCk7XG4gICAgICB9XG4gICAgfVxuICBcbiAgICBpZiAoYXdhaXQgZGlyZWN0b3J5RXhpc3RzKGNvbmZpZy5leHRyYWN0RGlyKSkge1xuICAgICAgLy8gVE9ETzogTWFyZ2UgZXh0cmFjdERpciB3aXRoIG91dHB1dFxuICAgICAgbG9nZ2VyLm5vdGljZShgcm0gLWZyICR7Y29uZmlnLmV4dHJhY3REaXJ9YCk7XG4gICAgICBhd2FpdCBmcy5wcm9taXNlcy5ybShjb25maWcuZXh0cmFjdERpciwgeyByZWN1cnNpdmU6IHRydWUgfSk7XG4gICAgfVxuICAgIGVsc2Uge1xuICAgICAgY29uc3QgcGFyZW50RGlyID0gUGF0aC5kaXJuYW1lKGNvbmZpZy5leHRyYWN0RGlyKTtcbiAgICAgIGlmICghYXdhaXQgZGlyZWN0b3J5RXhpc3RzKHBhcmVudERpcikpIHtcbiAgICAgICAgbG9nZ2VyLm5vdGljZShgbWtkaXIgLXAgJHtwYXJlbnREaXJ9YCk7XG4gICAgICAgIGF3YWl0IGZzLnByb21pc2VzLm1rZGlyKHBhcmVudERpciwgeyByZWN1cnNpdmU6IHRydWUgfSk7IFxuICAgICAgfVxuICAgIH1cbiAgXG4gICAgbG9nZ2VyLm5vdGljZShgbXYgJHtleHRyYWN0RGlyfSAke2NvbmZpZy5leHRyYWN0RGlyfWApO1xuICAgIGF3YWl0IGZzLnByb21pc2VzLnJlbmFtZShleHRyYWN0RGlyLCBjb25maWcuZXh0cmFjdERpcik7XG4gIFxuICAgIGV4dHJhY3RGaWxlc1thcmNGaWxlXSA9IGV4dHJhY3REaXI7XG4gICAgYXdhaXQgc2V0dGluZ3Muc2V0KFwiZXh0cmFjdEZpbGVzXCIsIGV4dHJhY3RGaWxlcyk7XG4gIH1cblxuICBpZiAoY29uZmlnLnBhdGNoRGlyKSB7XG4gICAgbGV0IHBhdGNoRGlycyA9IGF3YWl0IHNldHRpbmdzLmdldChcInBhdGNoRGlyc1wiKSB8fCB7fTtcbiAgICBpZiAoIXBhdGNoRGlyc1tjb25maWcucGF0Y2hEaXJdKSB7XG4gICAgICBhd2FpdCBtYWtlUGF0Y2goY29uZmlnLnBhdGNoRGlyLCBjb25maWcuZXh0cmFjdERpcik7XG4gICAgICBwYXRjaERpcnNbY29uZmlnLnBhdGNoRGlyXSA9IGNvbmZpZy5leHRyYWN0RGlyO1xuICAgICAgYXdhaXQgc2V0dGluZ3Muc2V0KFwicGF0Y2hEaXJzXCIsIHBhdGNoRGlycyk7XG4gICAgfVxuICB9XG59XG5cbmFzeW5jIGZ1bmN0aW9uIGRvVGFyZ2V0QnVpbGQoZ2NvbmZpZzogSUdlbmVyYWxDb25maWcsIGVudmlyb25tZW50OiBhbnksIGNvbmZpZzogYW55LCBzZXR0aW5nczogU2V0dGluZ3NTdG9yYWdlKSB7XG4gIGlmIChjb25maWcucHJlQWN0aW9uKSB7XG4gICAgYXdhaXQgc2V0dGluZ3MucHVzaChcInByZUFjdGlvblwiKTtcbiAgICBjb25zdCBuZXdDb25maWc6IGFueSA9IHt9O1xuICAgIGFzc2lnbk9iamVjdChuZXdDb25maWcsIGNvbmZpZyk7XG4gICAgZGVsZXRlIG5ld0NvbmZpZy5hY3Rpb247XG4gICAgZGVsZXRlIG5ld0NvbmZpZy5wcmVBY3Rpb247XG4gICAgZGVsZXRlIG5ld0NvbmZpZy5wb3N0QWN0aW9uO1xuICAgIGFzc2lnbk9iamVjdChuZXdDb25maWcsIGNvbmZpZy5wcmVBY3Rpb24pO1xuICAgIGNvbnN0IG5ld0Vudmlyb25tZW50ID0gbWVyZ2VFbnZpcm9ubWVudChjb25maWcucHJlQWN0aW9uLmVudmlyb25tZW50LCBlbnZpcm9ubWVudCk7XG4gICAgYXdhaXQgZG9UYXJnZXRCdWlsZChnY29uZmlnLCBuZXdFbnZpcm9ubWVudCwgbmV3Q29uZmlnLCBzZXR0aW5ncyk7XG4gICAgYXdhaXQgc2V0dGluZ3MucG9wKCk7XG4gIH1cblxuICBpZiAoQXJyYXkuaXNBcnJheShjb25maWcuYWN0aW9uKSkge1xuICAgIGF3YWl0IHNldHRpbmdzLnB1c2goXCJhY3Rpb25cIik7XG4gICAgZm9yICh2YXIgaSA9IDA7IGkgPCBjb25maWcuYWN0aW9uLmxlbmd0aDsgKytpKSB7XG4gICAgICBhd2FpdCBzZXR0aW5ncy5wdXNoKGkudG9TdHJpbmcoKSk7XG4gICAgICBjb25zdCBuZXdDb25maWc6IGFueSA9IHt9O1xuICAgICAgYXNzaWduT2JqZWN0KG5ld0NvbmZpZywgY29uZmlnKTtcbiAgICAgIGRlbGV0ZSBuZXdDb25maWcuYWN0aW9uO1xuICAgICAgZGVsZXRlIG5ld0NvbmZpZy5wcmVBY3Rpb247XG4gICAgICBkZWxldGUgbmV3Q29uZmlnLnBvc3RBY3Rpb247XG4gICAgICBhc3NpZ25PYmplY3QobmV3Q29uZmlnLCBjb25maWcuYWN0aW9uW2ldKTtcbiAgICAgIGNvbnN0IG5ld0Vudmlyb25tZW50ID0gbWVyZ2VFbnZpcm9ubWVudChjb25maWcuYWN0aW9uW2ldLmVudmlyb25tZW50LCBlbnZpcm9ubWVudCk7XG4gICAgICBhd2FpdCBkb1RhcmdldEJ1aWxkKGdjb25maWcsIG5ld0Vudmlyb25tZW50LCBuZXdDb25maWcsIHNldHRpbmdzKTtcbiAgICAgIGF3YWl0IHNldHRpbmdzLnBvcCgpO1xuICAgIH1cbiAgICBhd2FpdCBzZXR0aW5ncy5wb3AoKTtcbiAgfVxuICBlbHNlIHtcbiAgICBpZiAoIWF3YWl0IGRpcmVjdG9yeUV4aXN0cyhjb25maWcuYmluYXJ5RGlyKSkge1xuICAgICAgYXdhaXQgZnMucHJvbWlzZXMubWtkaXIoY29uZmlnLmJpbmFyeURpciwgeyByZWN1cnNpdmU6IHRydWUgfSk7XG4gICAgfVxuICAgIGlmIChhY3Rpb25zW2NvbmZpZy5hY3Rpb25dKSB7XG4gICAgICBjb25maWcuZGVzY3JpcHRpb24gJiYgbG9nZ2VyLm5vdGljZShjb25maWcuZGVzY3JpcHRpb24pO1xuICAgICAgYXdhaXQgYWN0aW9uc1tjb25maWcuYWN0aW9uXShjb25maWcsIGVudmlyb25tZW50LCBzZXR0aW5ncyk7XG4gICAgfVxuICB9XG5cbiAgaWYgKGNvbmZpZy5wb3N0QWN0aW9uKSB7XG4gICAgYXdhaXQgc2V0dGluZ3MucHVzaChcInBvc3RBY3Rpb25cIik7XG4gICAgY29uc3QgbmV3Q29uZmlnOiBhbnkgPSB7fTtcbiAgICBhc3NpZ25PYmplY3QobmV3Q29uZmlnLCBjb25maWcpO1xuICAgIGRlbGV0ZSBuZXdDb25maWcuYWN0aW9uO1xuICAgIGRlbGV0ZSBuZXdDb25maWcucHJlQWN0aW9uO1xuICAgIGRlbGV0ZSBuZXdDb25maWcucG9zdEFjdGlvbjtcbiAgICBhc3NpZ25PYmplY3QobmV3Q29uZmlnLCBjb25maWcucG9zdEFjdGlvbik7XG4gICAgY29uc3QgbmV3RW52aXJvbm1lbnQgPSBtZXJnZUVudmlyb25tZW50KGNvbmZpZy5wb3N0QWN0aW9uLmVudmlyb25tZW50LCBlbnZpcm9ubWVudCk7XG4gICAgYXdhaXQgZG9UYXJnZXRCdWlsZChnY29uZmlnLCBuZXdFbnZpcm9ubWVudCwgbmV3Q29uZmlnLCBzZXR0aW5ncyk7XG4gICAgYXdhaXQgc2V0dGluZ3MucG9wKCk7XG4gIH1cbn1cblxuYXN5bmMgZnVuY3Rpb24gZ2V0VXNlckNvbmZpZyhvcHRpb25zOiBDb21tYW5kT3B0aW9ucykge1xuICBsZXQgY29uZmlnUGF0aDtcbiAgaWYgKG9wdGlvbnMuZW52LmNvbmZpZykge1xuICAgIGNvbmZpZ1BhdGggPSBQYXRoLmlzQWJzb2x1dGUob3B0aW9ucy5lbnYuY29uZmlnKSA/IG9wdGlvbnMuZW52LmNvbmZpZyA6IFBhdGgucmVzb2x2ZShvcHRpb25zLndvcmtEaXIsIG9wdGlvbnMuZW52LmNvbmZpZyk7XG4gICAgaWYgKCFhd2FpdCBmaWxlRXhpc3RzKGNvbmZpZ1BhdGgpKVxuICAgICAgdGhyb3cgYENvbmZpZ3VyYXRpb24gJyR7b3B0aW9ucy5lbnYuY29uZmlnfScgZmlsZSBkb2VzIG5vdCBleGlzdGA7XG4gIH1cbiAgZWxzZSB7XG4gICAgY29uc3QgdXNlckNvbmZpZ1BhdGggPSBQYXRoLnJlc29sdmUob3B0aW9ucy53b3JrRGlyLCBVU0VSX0NPTkZJRyk7XG4gICAgaWYgKGF3YWl0IGZpbGVFeGlzdHModXNlckNvbmZpZ1BhdGgpKVxuICAgICAgY29uZmlnUGF0aCA9IHVzZXJDb25maWdQYXRoO1xuICAgIGVsc2Uge1xuICAgICAgbG9nZ2VyLndhcm4oYENvbmZpZyBmaWxlICcke1VTRVJfQ09ORklHfScgaXMgbm90IGF2YWlsYWJsZWApO1xuICAgIH1cbiAgfVxuXG4gIGlmICghY29uZmlnUGF0aCkge1xuICAgIHJldHVybiB7XG4gICAgICBcImJ1bmRsZTpvdXRwdXRcIjoge1xuICAgICAgICBhY3Rpb246IFwiYml0bWFrZVwiLFxuICAgICAgICB2YXJpYWJsZXM6IHtcbiAgICAgICAgICBJTlNUQUxMX1BSRUZJWDogXCIvdXNyXCIsXG4gICAgICAgIH0sXG4gICAgICAgIHNvdXJjZURpcjogXCIke3NvdXJjZVJvb3R9XCIsXG4gICAgICAgIGRlc3REaXI6IFwiJHtiaW5hcnlSb290fS9vdXRwdXRcIixcbiAgICAgIH1cbiAgICB9O1xuICB9XG5cbiAgY29uc3QgY29uZmlnVXJsID0gdXJsLnBhdGhUb0ZpbGVVUkwoY29uZmlnUGF0aCk7XG4gIGNvbnN0IGNvbmZpZ01vZHVsZSA9IGF3YWl0IGltcG9ydE1vZHVsZShjb25maWdVcmwpO1xuICBzd2l0Y2ggKHR5cGVvZiBjb25maWdNb2R1bGUuZGVmYXVsdCkge1xuICBjYXNlIFwiZnVuY3Rpb25cIjpcbiAgICBjb25zdCB1c2VyQ29uZmlnID0gY29uZmlnTW9kdWxlLmRlZmF1bHQob3B0aW9ucy5lbnYsIHt9KTtcbiAgICBpZiAodXNlckNvbmZpZyBpbnN0YW5jZW9mIFByb21pc2UpXG4gICAgICByZXR1cm4gYXdhaXQgdXNlckNvbmZpZztcbiAgICByZXR1cm4gdXNlckNvbmZpZztcblxuICBjYXNlIFwib2JqZWN0XCI6XG4gICAgcmV0dXJuIGNvbmZpZ01vZHVsZS5kZWZhdWx0O1xuXG4gIGRlZmF1bHQ6XG4gICAgdGhyb3cgbmV3IEVycm9yKGBVbmtub3duIHVzZXIgY29uZmlndXJhdGlvbiB0eXBlYCk7XG4gIH1cbn1cblxuZXhwb3J0IGRlZmF1bHQgYXN5bmMgKG9wdGlvbnM6IENvbW1hbmRPcHRpb25zKSA9PiB7XG4gIGNvbnN0IGdjb25maWc6IElHZW5lcmFsQ29uZmlnID0ge1xuICAgIGJ1aWxkVHlwZTogb3B0aW9ucy5lbnYuYnVpbGRUeXBlID09IERFQlVHX0JVSUxEX1RZUEUgPyBvcHRpb25zLmVudi5idWlsZFR5cGUgOiBSRUxFQVNFX0JVSUxEX1RZUEUsXG4gICAgd29ya0Rpcjogb3B0aW9ucy53b3JrRGlyLFxuICB9O1xuXG4gIGNvbnN0IHVzZXJDb25maWcgPSBhd2FpdCBnZXRVc2VyQ29uZmlnKG9wdGlvbnMpO1xuICBjb25zdCBidWlsZENvbmZpZyA9IG1ha2VCdWlsZENvbmZpZyhnY29uZmlnLCB1c2VyQ29uZmlnKTtcblxuICBpZiAoYnVpbGRDb25maWcuUkVDSVBFX0NPTlRFTlRfRklMRSkge1xuICAgIGNvbnN0IGpzb25Db25maWcgPSBKU09OLnN0cmluZ2lmeShidWlsZENvbmZpZywgbnVsbCwgMik7XG4gICAgYXdhaXQgc2F2ZUlmRGlmZmVyZW50KGJ1aWxkQ29uZmlnLlJFQ0lQRV9DT05URU5UX0ZJTEUsIGpzb25Db25maWcpO1xuICB9XG5cbiAgY29uc3Qgc2V0dGluZ3NGaWxlbmFtZSA9IFBhdGgucmVzb2x2ZShidWlsZENvbmZpZy5iaW5hcnlSb290LCBCVUlMRF9TRVRUSU5HU19GSUxFKTtcbiAgY29uc3Qgc2V0dGluZ3MgPSBuZXcgU2V0dGluZ3NTdG9yYWdlKHNldHRpbmdzRmlsZW5hbWUpO1xuXG4gIGZvciAoY29uc3QgW2tleSwgZW50cnldIG9mIE9iamVjdC5lbnRyaWVzKGJ1aWxkQ29uZmlnKSBhcyBhbnkpIHtcbiAgICBpZiAoZW50cnkgJiYgdHlwZW9mIGVudHJ5ID09PSBcIm9iamVjdFwiICYmIGVudHJ5LmFjdGlvbiAmJiAhZW50cnkuZGlzYWJsZWQpIHtcbiAgICAgIGF3YWl0IHNldHRpbmdzLnB1c2goa2V5KTtcbiAgICAgIGNvbnN0IGNvbXBsZXRlZCA9IGF3YWl0IHNldHRpbmdzLmdldChcImNvbXBsZXRlZFwiKTtcbiAgICAgIGlmIChlbnRyeS5yZWJ1aWxkIHx8ICFjb21wbGV0ZWQpIHtcbiAgICAgICAgbG9nZ2VyLmluZm8oYFN0YXJ0ZWQgYWN0aW9uOiAke2tleX1gKTtcbiAgICAgICAgY29uc3QgZW52aXJvbm1lbnQgPSBtZXJnZUVudmlyb25tZW50KGVudHJ5LmVudmlyb25tZW50LCBwcm9jZXNzLmVudik7XG4gICAgICAgIGlmIChlbnRyeS5zb3VyY2VVcmwgJiYgIWVudHJ5LnNvdXJjZVVybC5zdGFydHNXaXRoKElNUE9SVF9TQ0hFTUUpKSB7XG4gICAgICAgICAgYXdhaXQgZG9FeHRyYWN0QXJjaGl2ZShnY29uZmlnLCBlbnZpcm9ubWVudCwgZW50cnksIHNldHRpbmdzKTtcbiAgICAgICAgfVxuICAgICAgICBhd2FpdCBkb1RhcmdldEJ1aWxkKGdjb25maWcsIGVudmlyb25tZW50LCBlbnRyeSwgc2V0dGluZ3MpO1xuICAgICAgICBhd2FpdCBzZXR0aW5ncy5zZXQoXCJjb21wbGV0ZWRcIiwgdHJ1ZSk7XG4gICAgICAgIGxvZ2dlci5pbmZvKGBDb21wbGV0ZWQgYWN0aW9uOiAke2tleX1gKTtcbiAgICAgIH1cbiAgICAgIGF3YWl0IHNldHRpbmdzLnBvcCgpO1xuICAgIH1cbiAgfVxufVxuIiwiLypcbiAqIE1JVCBMaWNlbnNlXG4gKlxuICogQ29weXJpZ2h0IChjKSAyMDI1ICBZdXJpaSBZYWt1YmluICh5dXJpaS55YWt1YmluQGdtYWlsLmNvbSlcbiAqXG4gKiBQZXJtaXNzaW9uIGlzIGdyYW50ZWQgdG8gdXNlLCBjb3B5LCBtb2RpZnksIGFuZCBkaXN0cmlidXRlIHRoaXMgc29mdHdhcmVcbiAqIHVuZGVyIHRoZSBNSVQgTGljZW5zZS4gU2VlIExJQ0VOU0UgZmlsZSBmb3IgZGV0YWlscy5cbiAqL1xuXG5pbXBvcnQgeyBDb21tYW5kT3B0aW9ucyB9IGZyb20gXCJAL2NvcmUvQ29tbWFuZE9wdGlvbnNcIjtcbmltcG9ydCBpbml0IGZyb20gXCJAL2NvbW1hbmRzL2luaXRcIjtcbmltcG9ydCBidWlsZCBmcm9tIFwiQC9jb21tYW5kcy9idWlsZFwiO1xuXG5leHBvcnQgZGVmYXVsdCB7XG4gIGRlZmF1bHQ6IGJ1aWxkLFxuICBpbml0LFxuICBidWlsZCxcbn0gYXMgeyBbbmFtZTogc3RyaW5nXTogKG9wdGlvbnM6IENvbW1hbmRPcHRpb25zKSA9PiBhbnk7IH07XG4iLCIvKlxuICogTUlUIExpY2Vuc2VcbiAqXG4gKiBDb3B5cmlnaHQgKGMpIDIwMjUgIFl1cmlpIFlha3ViaW4gKHl1cmlpLnlha3ViaW5AZ21haWwuY29tKVxuICpcbiAqIFBlcm1pc3Npb24gaXMgZ3JhbnRlZCB0byB1c2UsIGNvcHksIG1vZGlmeSwgYW5kIGRpc3RyaWJ1dGUgdGhpcyBzb2Z0d2FyZVxuICogdW5kZXIgdGhlIE1JVCBMaWNlbnNlLiBTZWUgTElDRU5TRSBmaWxlIGZvciBkZXRhaWxzLlxuICovXG5cbmltcG9ydCBwYXRoIGZyb20gXCJub2RlOnBhdGhcIjtcbmltcG9ydCBmcyBmcm9tIFwibm9kZTpmc1wiO1xuXG5pbXBvcnQgeyBmaWxlRXhpc3RzLCBmZXRjaEJ1ZmZlciB9IGZyb20gXCJAL3V0aWxzL0ZpbGVTeXN0ZW1cIjtcbmltcG9ydCB7IFVTRVJfQ09ORklHIH0gZnJvbSBcIkAvQ29uc3RhbnRzXCI7XG5pbXBvcnQgeyBDb21tYW5kT3B0aW9ucyB9IGZyb20gXCJAL2NvcmUvQ29tbWFuZE9wdGlvbnNcIjtcbmltcG9ydCB7IExvZ2dlciB9IGZyb20gXCJAL2xvZ2dlclwiO1xuXG5jb25zdCBsb2dnZXIgPSBMb2dnZXIuY3JlYXRlKGltcG9ydC5tZXRhLnVybCk7XG5cbmV4cG9ydCBkZWZhdWx0IGFzeW5jIGZ1bmN0aW9uKG9wdGlvbnM6IENvbW1hbmRPcHRpb25zKSB7XG4gIGNvbnN0IHByZXNldCA9IG9wdGlvbnMuZW52LnByZXNldDtcblxuICBpZiAoIXByZXNldClcbiAgICB0aHJvdyBuZXcgRXJyb3IoYFByZXNldCAnJHtwcmVzZXR9JyBpcyBub3QgYXZhaWxhYmxlYCk7XG5cbiAgY29uc3QgcHJlc2V0RGF0YSA9IGF3YWl0IGZldGNoQnVmZmVyKHByZXNldCk7XG5cbiAgY29uc3QgdXNlckNvbmZpZ1BhdGggPSBwYXRoLnJlc29sdmUob3B0aW9ucy53b3JrRGlyLCBVU0VSX0NPTkZJRyk7XG4gIGlmIChhd2FpdCBmaWxlRXhpc3RzKHVzZXJDb25maWdQYXRoKSlcbiAgICBhd2FpdCBmcy5wcm9taXNlcy5ybSh1c2VyQ29uZmlnUGF0aCk7XG5cbiAgYXdhaXQgZnMucHJvbWlzZXMud3JpdGVGaWxlKHVzZXJDb25maWdQYXRoLCBwcmVzZXREYXRhLCBcInV0ZjhcIik7XG4gIGxvZ2dlci5pbmZvKGBQcmVzZXQgJyR7cHJlc2V0fScgaW5zdGFsbGVkIHN1Y2Nlc3NmdWxseWApO1xufVxuIiwiLypcbiAqIE1JVCBMaWNlbnNlXG4gKlxuICogQ29weXJpZ2h0IChjKSAyMDI1ICBZdXJpaSBZYWt1YmluICh5dXJpaS55YWt1YmluQGdtYWlsLmNvbSlcbiAqXG4gKiBQZXJtaXNzaW9uIGlzIGdyYW50ZWQgdG8gdXNlLCBjb3B5LCBtb2RpZnksIGFuZCBkaXN0cmlidXRlIHRoaXMgc29mdHdhcmVcbiAqIHVuZGVyIHRoZSBNSVQgTGljZW5zZS4gU2VlIExJQ0VOU0UgZmlsZSBmb3IgZGV0YWlscy5cbiAqL1xuXG5pbXBvcnQgdXJsIGZyb20gXCJub2RlOnVybFwiO1xuaW1wb3J0IHsgUGF0aCB9IGZyb20gXCJAL3V0aWxzL1BhdGhcIjtcbmltcG9ydCB7IEZJTEVfU0NIRU1FIH0gZnJvbSBcIkAvdXRpbHMvVXJsU2NoZW1lXCI7XG5pbXBvcnQgcGF0aCBmcm9tIFwibm9kZTpwYXRoXCI7XG5cbmNvbnN0IFBBVEggPSBTeW1ib2woXCJQQVRIXCIpO1xuXG5leHBvcnQgY2xhc3MgQWJzb2x1dGVQYXRoIHtcbiAgcHJpdmF0ZSBbUEFUSF06IHN0cmluZztcblxuICBwcm90ZWN0ZWQgY29uc3RydWN0b3IoZmlsZXBhdGg6IHN0cmluZykge1xuICAgIGlmIChmaWxlcGF0aC5zdGFydHNXaXRoKEZJTEVfU0NIRU1FKSkge1xuICAgICAgdGhpc1tQQVRIXSA9IGZpbGVwYXRoO1xuICAgIH1cbiAgICBlbHNlIGlmIChQYXRoLmlzQWJzb2x1dGUoZmlsZXBhdGgpKSB7XG4gICAgICB0aGlzW1BBVEhdID0gdXJsLnBhdGhUb0ZpbGVVUkwoZmlsZXBhdGgpLnRvU3RyaW5nKCk7XG4gICAgfVxuICAgIGVsc2Uge1xuICAgICAgdGhyb3cgbmV3IEVycm9yKGBOb3Qgc3VwcG9ydGVkIHJlbGF0aXZlIHBhdGggb2YgXCIke2ZpbGVwYXRofVwiYCk7XG4gICAgfVxuICB9XG5cbiAgcHVibGljIGpvaW4oLi4ucGF0aHM6IEFycmF5PEFic29sdXRlUGF0aCB8IHN0cmluZz4pIHtcbiAgICBjb25zdCBmaWxlcGF0aCA9IFBhdGguam9pbih1cmwuZmlsZVVSTFRvUGF0aCh0aGlzW1BBVEhdKSwgLi4ucGF0aHMubWFwKGkgPT4gaS50b1N0cmluZygpKSk7XG4gICAgcmV0dXJuIEFic29sdXRlUGF0aC5jcmVhdGUoZmlsZXBhdGgpO1xuICB9XG5cbiAgcHVibGljIGRpcm5hbWUoKSB7XG4gICAgcmV0dXJuIEFic29sdXRlUGF0aC5jcmVhdGUocGF0aC5wb3NpeC5kaXJuYW1lKHRoaXNbUEFUSF0pKTtcbiAgfVxuXG4gIHB1YmxpYyBiYXNlbmFtZSgpIHtcbiAgICByZXR1cm4gcGF0aC5wb3NpeC5iYXNlbmFtZSh0aGlzW1BBVEhdKTtcbiAgfVxuXG4gIHB1YmxpYyByZWxhdGl2ZSh0bzogQWJzb2x1dGVQYXRoIHwgc3RyaW5nKSB7XG4gICAgcmV0dXJuIFBhdGgucmVsYXRpdmUodXJsLmZpbGVVUkxUb1BhdGgodGhpc1tQQVRIXSksIEFic29sdXRlUGF0aC5jcmVhdGUodG8pLnRvU3RyaW5nKCkpO1xuICB9XG5cbiAgcHVibGljIHJlc29sdmUoLi4ucGF0aHM6IEFycmF5PEFic29sdXRlUGF0aCB8IHN0cmluZz4pIHtcbiAgICByZXR1cm4gQWJzb2x1dGVQYXRoLmNyZWF0ZShQYXRoLnJlc29sdmUodXJsLmZpbGVVUkxUb1BhdGgodGhpc1tQQVRIXSksIC4uLnBhdGhzLm1hcChpID0+IGkudG9TdHJpbmcoKSkpKTtcbiAgfVxuXG4gIHB1YmxpYyBtYXRjaChyZWdleHA6IFJlZ0V4cCkge1xuICAgIHJldHVybiB0aGlzW1BBVEhdLm1hdGNoKHJlZ2V4cCk7XG4gIH1cblxuICBwdWJsaWMgdG9TdHJpbmcoKSB7XG4gICAgcmV0dXJuIHVybC5maWxlVVJMVG9QYXRoKHRoaXNbUEFUSF0pO1xuICB9XG5cbiAgcHVibGljIHRvUGF0aCgpIHtcbiAgICBpZiAodGhpc1tQQVRIXS5zdGFydHNXaXRoKEZJTEVfU0NIRU1FKSlcbiAgICAgIHJldHVybiB1cmwuZmlsZVVSTFRvUGF0aCh0aGlzW1BBVEhdKTtcbiAgICB0aHJvdyBuZXcgRXJyb3IoYFVSTCAke3RoaXNbUEFUSF19IGNhbid0IGNvbnZlcnQgdG8gcGF0aGApO1xuICB9XG5cbiAgcHVibGljIHZhbHVlT2YoKSB7XG4gICAgcmV0dXJuIHVybC5maWxlVVJMVG9QYXRoKHRoaXNbUEFUSF0pO1xuICB9XG5cbiAgcHVibGljIHRvSlNPTigpIHtcbiAgICByZXR1cm4gdGhpc1tQQVRIXTtcbiAgfVxuXG4gIHB1YmxpYyBzdGF0aWMgaXNBYnNvbHV0ZShmaWxlcGF0aDogQWJzb2x1dGVQYXRoIHwgc3RyaW5nKSB7XG4gICAgaWYgKGZpbGVwYXRoIGluc3RhbmNlb2YgQWJzb2x1dGVQYXRoKVxuICAgICAgcmV0dXJuIHRydWU7XG4gICAgcmV0dXJuIFBhdGguaXNBYnNvbHV0ZShmaWxlcGF0aCk7XG4gIH1cblxuICBwdWJsaWMgc3RhdGljIGVuc3VyZUluc3RhbmNlKHZhbHVlOiBhbnkpOiBBYnNvbHV0ZVBhdGgge1xuICAgIGlmICh2YWx1ZSBpbnN0YW5jZW9mIEFic29sdXRlUGF0aClcbiAgICAgIHJldHVybiB2YWx1ZTtcbiAgICB0aHJvdyBuZXcgRXJyb3IoYFRoZSAnJHt2YWx1ZX0nIGlzIG5vdCBhIEFic29sdXRlUGF0aGApO1xuICB9XG5cbiAgcHVibGljIHN0YXRpYyBjcmVhdGUocGF0aDogQWJzb2x1dGVQYXRoIHwgc3RyaW5nKTogQWJzb2x1dGVQYXRoIHtcbiAgICBpZiAocGF0aCBpbnN0YW5jZW9mIEFic29sdXRlUGF0aClcbiAgICAgIHJldHVybiBwYXRoO1xuXG4gICAgcmV0dXJuIE9iamVjdC5zZWFsKG5ldyBBYnNvbHV0ZVBhdGgocGF0aCkpO1xuICB9XG59O1xuIiwiLypcbiAqIE1JVCBMaWNlbnNlXG4gKlxuICogQ29weXJpZ2h0IChjKSAyMDI1ICBZdXJpaSBZYWt1YmluICh5dXJpaS55YWt1YmluQGdtYWlsLmNvbSlcbiAqXG4gKiBQZXJtaXNzaW9uIGlzIGdyYW50ZWQgdG8gdXNlLCBjb3B5LCBtb2RpZnksIGFuZCBkaXN0cmlidXRlIHRoaXMgc29mdHdhcmVcbiAqIHVuZGVyIHRoZSBNSVQgTGljZW5zZS4gU2VlIExJQ0VOU0UgZmlsZSBmb3IgZGV0YWlscy5cbiAqL1xuXG5pbXBvcnQgeyBJR2VuZXJhbENvbnRleHQsIEludGVyZmFjZVRhcmdldCB9IGZyb20gXCJAL2NvcmUvTWFrZUludGVyZmFjZXNcIjtcbmltcG9ydCB7IGZpbmRQcm9ncmFtU3luYyB9IGZyb20gXCJAL2NvcmUvRmluZFByb2dyYW1cIjtcbmltcG9ydCB7IFNjb3BlSGVscGVyLCBWYXJpYWJsZU1hcCwgVmFyaWFudE1hcCB9IGZyb20gXCJAL2NvcmUvU2NvcGVcIjtcbmltcG9ydCB7IFN5c3RlbVNjb3BlIH0gZnJvbSBcIkAvY29yZS9TeXN0ZW1TY29wZVwiO1xuaW1wb3J0IHsgQWJzb2x1dGVQYXRoIH0gZnJvbSBcIkAvY29yZS9BYnNvbHV0ZVBhdGhcIjtcbmltcG9ydCB7IGltcG9ydE1vZHVsZSB9IGZyb20gXCJAL3V0aWxzL01vZHVsZVwiO1xuaW1wb3J0IHsgTWFpblRhcmdldCwgUG9zdFRhcmdldCB9IGZyb20gXCJAL2NvcmUvVGFyZ2V0XCI7XG5pbXBvcnQgeyBDVVNUT01fVkFSSUFCTEVfR1JPVVAgfSBmcm9tIFwiQC9Db25zdGFudHNcIjtcbmltcG9ydCB7IEN1c3RvbVNjcmlwdCwgUG9zdEN1c3RvbVNjcmlwdCB9IGZyb20gXCJAL2NvcmUvQ3VzdG9tU2NyaXB0XCI7XG5pbXBvcnQgeyBJbnN0YWxsRW50aXR5IH0gZnJvbSBcIkAvY29yZS9JbnN0YWxsRW50aXR5XCI7XG5pbXBvcnQgeyBTY3JpcHRDb2xsZWN0aW9uIH0gZnJvbSBcIkAvY29yZS9TY3JpcHRDb2xsZWN0aW9uXCI7XG5pbXBvcnQgeyBUYXJnZXROYW1lIH0gZnJvbSBcIkAvY29yZS9UYXJnZXROYW1lXCI7XG5pbXBvcnQgeyBMb2dnZXIgfSBmcm9tIFwiQC9sb2dnZXJcIjtcblxuY29uc3QgbG9nZ2VyID0gTG9nZ2VyLmNyZWF0ZShpbXBvcnQubWV0YS51cmwpO1xuXG5leHBvcnQgYWJzdHJhY3QgY2xhc3MgR2VuZXJhbENvbnRleHQgaW1wbGVtZW50cyBJR2VuZXJhbENvbnRleHQge1xuICBwcm90ZWN0ZWQgX3Njb3BlOiBWYXJpYWJsZU1hcDtcblxuICBjb25zdHJ1Y3RvcihzY29wZTogVmFyaWFibGVNYXApIHtcbiAgICB0aGlzLl9zY29wZSA9IHNjb3BlO1xuICB9XG5cbiAgcHVibGljIGZpbmRQcm9ncmFtKG5hbWU6IHN0cmluZyk6IHN0cmluZyB8IHVuZGVmaW5lZCB7XG4gICAgcmV0dXJuIGZpbmRQcm9ncmFtU3luYyhuYW1lKTtcbiAgfVxuXG4gIHB1YmxpYyBnZXRQcm9wZXJ0eSh0aGlzOiBhbnksIG5hbWU6IHN0cmluZyk6IGFueSB7XG4gICAgcmV0dXJuIFNjb3BlSGVscGVyLmdldCh0aGlzLl9zY29wZSwgbmFtZSk7XG4gIH1cblxuICBwdWJsaWMgc2V0UHJvcGVydHkodGhpczogYW55LCBuYW1lOiBzdHJpbmcsIHZhbHVlOiBhbnkpOiBhbnkge1xuICAgIGNvbnN0IGVudHJ5ID0gdGhpcy5fc2NvcGVbbmFtZV07XG4gICAgaWYgKGVudHJ5KVxuICAgICAgU2NvcGVIZWxwZXIuc2V0RW50cnlWYWx1ZShlbnRyeSwgdmFsdWUpO1xuICAgIGVsc2VcbiAgICAgIFNjb3BlSGVscGVyLmRlZmluZVZhcmlhYmxlKHRoaXMuX3Njb3BlLCBcIlwiLCBuYW1lLCB7dmFsdWV9KTtcbiAgICByZXR1cm4gdHJ1ZTtcbiAgfVxuXG4gIHB1YmxpYyBoYXNQcm9wZXJ0eSh0aGlzOiBhbnksIG5hbWU6IHN0cmluZyk6IGJvb2xlYW4ge1xuICAgIHJldHVybiBPYmplY3QuaGFzT3duKHRoaXMuX3Njb3BlLCBuYW1lKTtcbiAgfVxuXG4gIHB1YmxpYyBkZWxldGVQcm9wZXJ0eSh0aGlzOiBhbnksIG5hbWU6IHN0cmluZyk6IGJvb2xlYW4ge1xuICAgIHJldHVybiBkZWxldGUgdGhpcy5fc2NvcGVbbmFtZV07XG4gIH1cblxuICBwdWJsaWMgZ2V0UHJvcGVydHlOYW1lcyh0aGlzOiBhbnkpOiBzdHJpbmdbXSB7XG4gICAgcmV0dXJuIE9iamVjdC5rZXlzKHRoaXMuX3Njb3BlKTtcbiAgfVxufTtcblxuZXhwb3J0IGFic3RyYWN0IGNsYXNzIE1ha2VDb250ZXh0IGV4dGVuZHMgR2VuZXJhbENvbnRleHQge1xuICBwcml2YXRlIF90YXJnZXRzID0gbmV3IE1hcDxzdHJpbmcsIE1haW5UYXJnZXQ+KCk7XG4gIHByaXZhdGUgX3Bvc3RUYXJnZXRzID0gbmV3IE1hcDxzdHJpbmcsIFBvc3RUYXJnZXQ+KCk7XG4gIHByaXZhdGUgX3NjcmlwdENvbGxlY3Rpb24gPSBTY3JpcHRDb2xsZWN0aW9uLmNyZWF0ZSgpO1xuICBwcml2YXRlIF9wb3N0U2NyaXB0cyA9IG5ldyBNYXA8c3RyaW5nLCBQb3N0Q3VzdG9tU2NyaXB0PigpO1xuICBwcml2YXRlIF9pbnN0YWxsTGlzdCA9IG5ldyBBcnJheTxJbnN0YWxsRW50aXR5PigpO1xuXG4gIHByb3RlY3RlZCBjb25zdHJ1Y3RvcihzY29wZTogVmFyaWFibGVNYXApIHtcbiAgICBzdXBlcihzY29wZSk7XG4gIH1cblxuICBhYnN0cmFjdCBleGVjdXRlU2NyaXB0KHNjcmlwdDogYW55LCBwYXJhbXM6IGFueSk6IGFueTtcbiAgYWJzdHJhY3QgYWRkQ2FjaGVWYXJpYWJsZXMocGFyYW1zOiBzdHJpbmcgfCBWYXJpYW50TWFwKTogdm9pZDtcbiAgYWJzdHJhY3QgYWRkU3ViZGlyZWN0b3J5KHNvdXJjZURpcjogc3RyaW5nIHwgQWJzb2x1dGVQYXRoLCBiaW5hcnlEaXI/OiBzdHJpbmcgfCBBYnNvbHV0ZVBhdGgpOiB2b2lkO1xuXG4gIHB1YmxpYyBnZXQgdGFyZ2V0cygpIHtcbiAgICByZXR1cm4gdGhpcy5fdGFyZ2V0cztcbiAgfVxuXG4gIHB1YmxpYyBnZXQgcG9zdFRhcmdldHMoKSB7XG4gICAgcmV0dXJuIHRoaXMuX3Bvc3RUYXJnZXRzO1xuICB9XG5cbiAgcHVibGljIGdldCBzY3JpcHRDb2xsZWN0aW9uKCkge1xuICAgIHJldHVybiB0aGlzLl9zY3JpcHRDb2xsZWN0aW9uO1xuICB9XG5cbiAgcHVibGljIGdldCBwb3N0U2NyaXB0cygpIHtcbiAgICByZXR1cm4gdGhpcy5fcG9zdFNjcmlwdHM7XG4gIH1cblxuICBwdWJsaWMgZ2V0IGluc3RhbGxMaXN0KCkge1xuICAgIHJldHVybiB0aGlzLl9pbnN0YWxsTGlzdDtcbiAgfVxuICBcbiAgcHVibGljIGdldENhY2hlVmFyaWFibGVzKCk6IGFueSB7XG4gICAgcmV0dXJuIFNjb3BlSGVscGVyLmdldFZhcmlhYmxlc0J5R3JvdXAodGhpcy5fc2NvcGUsIENVU1RPTV9WQVJJQUJMRV9HUk9VUCk7XG4gIH1cblxuICBwdWJsaWMgYWRkSW5jbHVkZURpcmVjdG9yaWVzKC4uLmRpcnM6IGFueVtdKSB7XG4gICAgY29uc3Qgc291cmNlRGlyID0gU2NvcGVIZWxwZXIuZ2V0KHRoaXMuX3Njb3BlLCBcIlNPVVJDRV9ESVJcIik7XG4gICAgZm9yIChjb25zdCBpdGVyIG9mIGRpcnMuZmxhdCgpKVxuICAgICAgU2NvcGVIZWxwZXIuZ2V0KHRoaXMuX3Njb3BlLCBcIklOQ0xVREVTXCIpLnB1c2goc291cmNlRGlyLnJlc29sdmUoaXRlcikpO1xuICB9XG5cbiAgcHVibGljIGdldFBvc3RUYXJnZXQobmFtZTogc3RyaW5nKTogUG9zdFRhcmdldCB7XG4gICAgbGV0IHRhcmdldCA9IHRoaXMuX3Bvc3RUYXJnZXRzLmdldChuYW1lKTtcbiAgICBpZiAoIXRhcmdldCkge1xuICAgICAgdGFyZ2V0ID0gUG9zdFRhcmdldC5jcmVhdGUobmFtZSlcbiAgICAgIHRoaXMuX3Bvc3RUYXJnZXRzLnNldChuYW1lLCB0YXJnZXQpO1xuICAgIH1cbiAgICByZXR1cm4gdGFyZ2V0O1xuICB9XG5cbiAgcHVibGljIGhhc01haW5UYXJnZXQobmFtZTogc3RyaW5nKSB7XG4gICAgcmV0dXJuIHRoaXMuX3RhcmdldHMuaGFzKG5hbWUpO1xuICB9XG5cbiAgcHVibGljIGFkZE1haW5UYXJnZXQobmFtZTogc3RyaW5nLCB0YXJnZXQ6IE1haW5UYXJnZXQpIHtcbiAgICB0aGlzLl90YXJnZXRzLnNldChuYW1lLCB0YXJnZXQpO1xuICB9XG5cbiAgcHVibGljIHNjcmlwdChuYW1lOiBzdHJpbmcpOiBQb3N0Q3VzdG9tU2NyaXB0IHtcbiAgICBsZXQgc2NyaXB0ID0gdGhpcy5fcG9zdFNjcmlwdHMuZ2V0KG5hbWUpO1xuICAgIGlmICghc2NyaXB0KSB7XG4gICAgICBzY3JpcHQgPSBQb3N0Q3VzdG9tU2NyaXB0LmNyZWF0ZShuYW1lKVxuICAgICAgdGhpcy5fcG9zdFNjcmlwdHMuc2V0KG5hbWUsIHNjcmlwdCk7XG4gICAgfVxuICAgIHJldHVybiBzY3JpcHQ7XG4gIH1cblxuICBwdWJsaWMgYWRkQ3VzdG9tU2NyaXB0KHNjcmlwdE1vZHVsZTogc3RyaW5nLCBwYXJhbXM6IGFueSk6IEN1c3RvbVNjcmlwdCB7XG4gICAgY29uc3QgdmFyaWFibGVNYXAgPSBTY29wZUhlbHBlci5jbG9uZVZhcmlhYmxlTWFwKHRoaXMuX3Njb3BlKTtcbiAgICBTY29wZUhlbHBlci5leHRlbmRWYXJpYWJsZU1hcEJ5VmFsdWVzKHZhcmlhYmxlTWFwLCBDVVNUT01fVkFSSUFCTEVfR1JPVVAsIHBhcmFtcyk7XG4gICAgU2NvcGVIZWxwZXIuc2V0KHZhcmlhYmxlTWFwLCBcIlNDUklQVF9NT0RVTEVcIiwgc2NyaXB0TW9kdWxlKTtcbiAgICBcbiAgICBjb25zdCBzb3VyY2VEaXIgPSBTY29wZUhlbHBlci5nZXQodmFyaWFibGVNYXAsIFwiU09VUkNFX0RJUlwiKSBhcyBBYnNvbHV0ZVBhdGg7XG4gICAgY29uc3QgYmluYXJ5RGlyID0gU2NvcGVIZWxwZXIuZ2V0KHZhcmlhYmxlTWFwLCBcIkJJTkFSWV9ESVJcIikgYXMgQWJzb2x1dGVQYXRoO1xuXG4gICAgbGV0IGlucHV0RmlsZSA9IFNjb3BlSGVscGVyLmdldCh2YXJpYWJsZU1hcCwgXCJTQ1JJUFRfSU5QVVRcIik7XG4gICAgaWYgKGlucHV0RmlsZSlcbiAgICAgIGlucHV0RmlsZSA9IHNvdXJjZURpci5yZXNvbHZlKGlucHV0RmlsZSk7XG5cbiAgICBsZXQgb3V0cHV0RmlsZSA9IFNjb3BlSGVscGVyLmdldCh2YXJpYWJsZU1hcCwgXCJTQ1JJUFRfT1VUUFVUXCIpO1xuICAgIGlmICghb3V0cHV0RmlsZSlcbiAgICAgIHRocm93IG5ldyBFcnJvcihcIkN1c3RvbVNjcmlwdCBwYXJhbWV0ZXJzIHJlcXVpcmVkIG91dHB1dCBlbnRpdHlcIik7XG5cbiAgICBvdXRwdXRGaWxlID0gc291cmNlRGlyLnJlc29sdmUob3V0cHV0RmlsZSk7XG5cbiAgICBjb25zdCBvcHRpb25zOiBDdXN0b21TY3JpcHQuT3B0aW9ucyA9IHtcbiAgICAgIHZhcmlhYmxlTWFwLFxuICAgICAgbmFtZTogU2NvcGVIZWxwZXIuZ2V0KHZhcmlhYmxlTWFwLCBcIlNDUklQVF9OQU1FXCIpLFxuICAgICAgc2NyaXB0TW9kdWxlLFxuICAgICAgb3V0cHV0OiBvdXRwdXRGaWxlLFxuICAgICAgaW5wdXQ6IGlucHV0RmlsZSxcbiAgICAgIHNvdXJjZURpcixcbiAgICAgIGJpbmFyeURpcixcbiAgICB9O1xuXG4gICAgY29uc3QgdGFyZ2V0ID0gQ3VzdG9tU2NyaXB0LmNyZWF0ZShvcHRpb25zKTtcbiAgICB0aGlzLl9zY3JpcHRDb2xsZWN0aW9uLmFkZCh0YXJnZXQsIG9wdGlvbnMubmFtZSk7XG5cbiAgICByZXR1cm4gdGFyZ2V0O1xuICB9XG5cbiAgcHVibGljIGluc3RhbGwodmFsdWU6IGFueSwgcGFyYW1zOiBhbnkpOiB2b2lkIHtcbiAgICBjb25zdCBzY29wZSA9IFNjb3BlSGVscGVyLmNyZWF0ZVZhcmlhYmxlVmFsdWVzKHRoaXMuX3Njb3BlKTtcbiAgICBmb3IgKGNvbnN0IGl0IG9mIFsgdmFsdWUgXS5mbGF0KCkpIHtcbiAgICAgIGNvbnN0IGl0ZXIgPSAoaXQgaW5zdGFuY2VvZiBJbnRlcmZhY2VUYXJnZXQpID8gVGFyZ2V0TmFtZS5jcmVhdGUoaXQudGFyZ2V0TmFtZSkgOiBpdDtcbiAgICAgIGNvbnN0IGVudGl0eSA9IEluc3RhbGxFbnRpdHkuY3JlYXRlKHNjb3BlLCBpdGVyLCBwYXJhbXMpO1xuICAgICAgdGhpcy5faW5zdGFsbExpc3QucHVzaChlbnRpdHkpO1xuICAgIH1cbiAgfVxuXG4gIHB1YmxpYyBnZXRWYXJpYWJsZU1hcCgpOiBWYXJpYWJsZU1hcCB7XG4gICAgcmV0dXJuIHRoaXMuX3Njb3BlO1xuICB9XG59O1xuXG5leHBvcnQgZnVuY3Rpb24gY3JlYXRlQ29udGV4dDxUIGV4dGVuZHMgSUdlbmVyYWxDb250ZXh0PihjdHg6IFQpOiBUICYgU3lzdGVtU2NvcGUge1xuICBjb25zdCBoYW5kbGVyOiBQcm94eUhhbmRsZXI8VD4gPSB7XG4gICAgZ2V0KHRhcmdldDogVCwgbmFtZTogc3RyaW5nLCByZWNlaXZlcjogYW55KSB7XG4gICAgICBpZiAobmFtZSBpbiB0YXJnZXQpXG4gICAgICAgIHJldHVybiAodGFyZ2V0IGFzIGFueSlbbmFtZV07XG4gICAgICByZXR1cm4gdGFyZ2V0LmdldFByb3BlcnR5KG5hbWUpO1xuICAgIH0sXG4gICAgc2V0KHRhcmdldDogVCwgbmFtZTogc3RyaW5nLCB2YWx1ZTogYW55KTogYm9vbGVhbiB7XG4gICAgICB0YXJnZXQuc2V0UHJvcGVydHkobmFtZSwgdmFsdWUpO1xuICAgICAgcmV0dXJuIHRydWU7XG4gICAgfSxcbiAgICBoYXModGFyZ2V0OiBULCBuYW1lOiBzdHJpbmcpIHtcbiAgICAgIHJldHVybiBuYW1lIGluIHRhcmdldCB8fCB0YXJnZXQuaGFzUHJvcGVydHkobmFtZSk7XG4gICAgfSxcbiAgICBvd25LZXlzKHRhcmdldDogVCkge1xuICAgICAgcmV0dXJuIHRhcmdldC5nZXRQcm9wZXJ0eU5hbWVzKCk7XG4gICAgfSxcbiAgICBkZWxldGVQcm9wZXJ0eSh0YXJnZXQ6IFQsIG5hbWU6IHN0cmluZykge1xuICAgICAgcmV0dXJuIHRhcmdldC5kZWxldGVQcm9wZXJ0eShuYW1lKTtcbiAgICB9LFxuICAgIGdldE93blByb3BlcnR5RGVzY3JpcHRvcih0YXJnZXQ6IFQsIG5hbWU6IHN0cmluZyk6IFByb3BlcnR5RGVzY3JpcHRvciB8IHVuZGVmaW5lZCB7XG4gICAgICBpZiAodGFyZ2V0Lmhhc1Byb3BlcnR5KG5hbWUpKSB7XG4gICAgICAgIGNvbnN0IHZhbHVlID0gdGFyZ2V0LmdldFByb3BlcnR5KG5hbWUpO1xuICAgICAgICByZXR1cm4geyB2YWx1ZSwgd3JpdGFibGU6IHRydWUsIGVudW1lcmFibGU6IHRydWUsIGNvbmZpZ3VyYWJsZTogdHJ1ZSB9O1xuICAgICAgfVxuICAgICAgcmV0dXJuIHVuZGVmaW5lZDtcbiAgICB9LFxuICB9O1xuICByZXR1cm4gbmV3IFByb3h5KGN0eCwgaGFuZGxlcikgYXMgVCAmIFN5c3RlbVNjb3BlO1xufVxuXG5leHBvcnQgYXN5bmMgZnVuY3Rpb24gcGVyZm9ybUNvbnRleHQobWs6IElHZW5lcmFsQ29udGV4dCAmIFN5c3RlbVNjb3BlKSB7XG4gIGNvbnN0IHNjcmlwdFVybCA9IG1rLlNDUklQVF9GSUxFLnRvSlNPTigpO1xuICBjb25zdCBtb2R1bGUgPSBhd2FpdCBpbXBvcnRNb2R1bGUoc2NyaXB0VXJsKTtcbiAgaWYgKCFtb2R1bGUuZGVmYXVsdClcbiAgICB0aHJvdyBuZXcgRXJyb3IoYFNjcmlwdCAke3NjcmlwdFVybH0gaGFzIG5vdCBjb250YWluIGEgZGVmYXVsdCBmdW5jdGlvbmApO1xuXG4gIGNvbnN0IHJlc3VsdCA9IG1vZHVsZS5kZWZhdWx0KG1rKTtcbiAgaWYgKHJlc3VsdCBpbnN0YW5jZW9mIFByb21pc2UpXG4gICAgYXdhaXQgcmVzdWx0O1xufVxuXG5leHBvcnQgZnVuY3Rpb24gY3JlYXRlVmFyaWFibGVNYXBGb3JEaXJlY3RvcnkodmFyaWFibGVNYXA6IFZhcmlhYmxlTWFwLCBzb3VyY2VEaXI6IGFueSwgYmluYXJ5RGlyPzogYW55KTogVmFyaWFibGVNYXAge1xuICBpZiAoYmluYXJ5RGlyID09PSB1bmRlZmluZWQpIHtcbiAgICBpZiAoIUFic29sdXRlUGF0aC5pc0Fic29sdXRlKHNvdXJjZURpcikpXG4gICAgICBiaW5hcnlEaXIgPSBzb3VyY2VEaXI7XG4gICAgZWxzZSB7XG4gICAgICBjb25zdCBiaW5hcnlEaXIxID0gU2NvcGVIZWxwZXIuZ2V0KHZhcmlhYmxlTWFwLCBcIlBST0pFQ1RfQklOQVJZX0RJUlwiKS5yZWxhdGl2ZShzb3VyY2VEaXIpO1xuICAgICAgY29uc3QgYmluYXJ5RGlyMiA9IFNjb3BlSGVscGVyLmdldCh2YXJpYWJsZU1hcCwgXCJQUk9KRUNUX1NPVVJDRV9ESVJcIikucmVsYXRpdmUoc291cmNlRGlyKTtcbiAgICAgIGJpbmFyeURpciA9IChiaW5hcnlEaXIxLmxlbmd0aCA+IGJpbmFyeURpcjIubGVuZ3RoKSA/IGJpbmFyeURpcjIgOiBiaW5hcnlEaXIxO1xuICAgIH1cbiAgfVxuXG4gIGNvbnN0IFNPVVJDRV9ESVIgPSBTY29wZUhlbHBlci5nZXQodmFyaWFibGVNYXAsIFwiU09VUkNFX0RJUlwiKS5yZXNvbHZlKHNvdXJjZURpcik7XG4gIGNvbnN0IEJJTkFSWV9ESVIgPSBTY29wZUhlbHBlci5nZXQodmFyaWFibGVNYXAsIFwiQklOQVJZX0RJUlwiKS5yZXNvbHZlKGJpbmFyeURpcik7XG5cbiAgY29uc3QgbmV3VmFyaWFibGVNYXAgPSBTY29wZUhlbHBlci5jbG9uZVZhcmlhYmxlTWFwKHZhcmlhYmxlTWFwKTtcblxuICBTY29wZUhlbHBlci5zZXQobmV3VmFyaWFibGVNYXAsIFwiU09VUkNFX0RJUlwiLCBTT1VSQ0VfRElSKTtcbiAgU2NvcGVIZWxwZXIuc2V0KG5ld1ZhcmlhYmxlTWFwLCBcIkJJTkFSWV9ESVJcIiwgQklOQVJZX0RJUik7XG4gIFNjb3BlSGVscGVyLnJlc2V0KG5ld1ZhcmlhYmxlTWFwLCBcIlNDUklQVF9ESVJcIik7XG4gIFNjb3BlSGVscGVyLnJlc2V0KG5ld1ZhcmlhYmxlTWFwLCBcIlNDUklQVF9GSUxFXCIpO1xuXG4gIHJldHVybiBuZXdWYXJpYWJsZU1hcDtcbn1cbiIsIi8qXG4gKiBNSVQgTGljZW5zZVxuICpcbiAqIENvcHlyaWdodCAoYykgMjAyNSAgWXVyaWkgWWFrdWJpbiAoeXVyaWkueWFrdWJpbkBnbWFpbC5jb20pXG4gKlxuICogUGVybWlzc2lvbiBpcyBncmFudGVkIHRvIHVzZSwgY29weSwgbW9kaWZ5LCBhbmQgZGlzdHJpYnV0ZSB0aGlzIHNvZnR3YXJlXG4gKiB1bmRlciB0aGUgTUlUIExpY2Vuc2UuIFNlZSBMSUNFTlNFIGZpbGUgZm9yIGRldGFpbHMuXG4gKi9cblxuaW1wb3J0IGZzIGZyb20gXCJub2RlOmZzXCI7XG5cbmltcG9ydCB7IGdlbmVyYXRlZFNjcmlwdE5hbWVDb21tZW50IH0gZnJvbSBcIkAvY3h4XCI7XG5cbmV4cG9ydCBkZWZhdWx0IGFzeW5jIGZ1bmN0aW9uKG1rOiBhbnkpIHtcbiAgY29uc3QgbGluZXMgPSBbXTtcblxuICBsaW5lcy5wdXNoKGdlbmVyYXRlZFNjcmlwdE5hbWVDb21tZW50KGltcG9ydC5tZXRhLmZpbGVuYW1lKSk7XG4gIGxpbmVzLnB1c2goXCJcIik7XG5cbiAgZm9yIChjb25zdCBbbmFtZSwgZW50cnldIG9mIE9iamVjdC5lbnRyaWVzKG1rLlNDUklQVF9JTlBVVCkgYXMgYW55KSB7XG4gICAgaWYgKGVudHJ5LmRlc2NyaXB0aW9uKSB7XG4gICAgICBsaW5lcy5wdXNoKGAvKiAke2VudHJ5LmRlc2NyaXB0aW9ufSAqL2ApO1xuICAgIH1cbiAgICBpZiAodHlwZW9mIGVudHJ5LnZhbHVlID09PSBcImJvb2xlYW5cIikge1xuICAgICAgbGluZXMucHVzaChgI2RlZmluZSAke25hbWV9ICR7ZW50cnkudmFsdWUgPyAxIDogMH1gKTtcbiAgICB9XG4gICAgZWxzZSBpZiAodHlwZW9mIGVudHJ5LnZhbHVlID09PSBcIm51bWJlclwiKSB7XG4gICAgICBsaW5lcy5wdXNoKGAjZGVmaW5lICR7bmFtZX0gJHtlbnRyeS52YWx1ZX1gKTtcbiAgICB9XG4gICAgZWxzZSBpZiAodHlwZW9mIGVudHJ5LnZhbHVlID09PSBcInN0cmluZ1wiKSB7XG4gICAgICBsaW5lcy5wdXNoKGAjZGVmaW5lICR7bmFtZX0gXCIke2VudHJ5LnZhbHVlfVwiYCk7XG4gICAgfVxuICAgIGVsc2UgaWYgKEFycmF5LmlzQXJyYXkoZW50cnkudmFsdWUpKSB7XG4gICAgICBsaW5lcy5wdXNoKGAjZGVmaW5lICR7bmFtZX0gXCIke2VudHJ5LnZhbHVlLmpvaW4oXCI7XCIpfVwiYCk7XG4gICAgfVxuICAgIGVsc2Uge1xuICAgICAgdGhyb3cgbmV3IEVycm9yKGBcIiR7bmFtZX1cIiBoYXMgJHtlbnRyeS52YWx1ZX0gdmFsdWVgKTtcbiAgICB9XG4gICAgbGluZXMucHVzaChcIlwiKTtcbiAgfVxuXG4gIGF3YWl0IGZzLnByb21pc2VzLm1rZGlyKG1rLlNDUklQVF9PVVRQVVQuZGlybmFtZSgpLnRvU3RyaW5nKCksIHsgcmVjdXJzaXZlOiB0cnVlIH0pO1xuICBhd2FpdCBmcy5wcm9taXNlcy53cml0ZUZpbGUobWsuU0NSSVBUX09VVFBVVC50b1N0cmluZygpLCBsaW5lcy5qb2luKFwiXFxuXCIpLCBcInV0Zi04XCIpO1xufVxuIiwiLypcbiAqIE1JVCBMaWNlbnNlXG4gKlxuICogQ29weXJpZ2h0IChjKSAyMDI1ICBZdXJpaSBZYWt1YmluICh5dXJpaS55YWt1YmluQGdtYWlsLmNvbSlcbiAqXG4gKiBQZXJtaXNzaW9uIGlzIGdyYW50ZWQgdG8gdXNlLCBjb3B5LCBtb2RpZnksIGFuZCBkaXN0cmlidXRlIHRoaXMgc29mdHdhcmVcbiAqIHVuZGVyIHRoZSBNSVQgTGljZW5zZS4gU2VlIExJQ0VOU0UgZmlsZSBmb3IgZGV0YWlscy5cbiAqL1xuXG5pbXBvcnQgZnMgZnJvbSBcIm5vZGU6ZnNcIjtcblxuZXhwb3J0IGRlZmF1bHQgYXN5bmMgZnVuY3Rpb24obWs6IGFueSkge1xuICBsZXQgY29udGVudCA9IGF3YWl0IGZzLnByb21pc2VzLnJlYWRGaWxlKG1rLlNDUklQVF9JTlBVVC50b1N0cmluZygpLCBcInV0Zi04XCIpO1xuICBjb250ZW50ID0gY29udGVudC5yZXBsYWNlKC9AKFtfQS1aYS16XVtfQS1aYS16MC05XSspQC9nLCAobWF0Y2gsIHYxKSA9PiB7XG4gICAgY29uc3QgcmVzID0gbWtbdjFdIHx8IFwiXCI7XG4gICAgaWYgKEFycmF5LmlzQXJyYXkocmVzKSlcbiAgICAgIHJldHVybiByZXMuam9pbihcIlxcblwiKTtcbiAgICByZXR1cm4gcmVzLnRvU3RyaW5nKCk7XG4gIH0pO1xuICBjb250ZW50ID0gY29udGVudC5yZXBsYWNlKC8jY21ha2VkZWZpbmUgKyhbX0EtWmEtel1bX0EtWmEtejAtOV0rKSAqKC4qKS9nLCAobWF0Y2gsIHYxLCB2MikgPT4ge1xuICAgIHJldHVybiBta1t2MV0gPyBgI2RlZmluZSAke3YxfSAke3YyfWAgOiBgLyogI3VuZGVmICR7djF9ICovYDtcbiAgfSk7XG4gIGF3YWl0IGZzLnByb21pc2VzLm1rZGlyKG1rLlNDUklQVF9PVVRQVVQuZGlybmFtZSgpLnRvU3RyaW5nKCksIHsgcmVjdXJzaXZlOiB0cnVlIH0pO1xuICBhd2FpdCBmcy5wcm9taXNlcy53cml0ZUZpbGUobWsuU0NSSVBUX09VVFBVVC50b1N0cmluZygpLCBjb250ZW50LCBcInV0Zi04XCIpO1xufVxuIiwiLypcbiAqIE1JVCBMaWNlbnNlXG4gKlxuICogQ29weXJpZ2h0IChjKSAyMDI1ICBZdXJpaSBZYWt1YmluICh5dXJpaS55YWt1YmluQGdtYWlsLmNvbSlcbiAqXG4gKiBQZXJtaXNzaW9uIGlzIGdyYW50ZWQgdG8gdXNlLCBjb3B5LCBtb2RpZnksIGFuZCBkaXN0cmlidXRlIHRoaXMgc29mdHdhcmVcbiAqIHVuZGVyIHRoZSBNSVQgTGljZW5zZS4gU2VlIExJQ0VOU0UgZmlsZSBmb3IgZGV0YWlscy5cbiAqL1xuXG5pbXBvcnQgY29uZmlndXJlX2ZpbGUgZnJvbSBcIkAvY29yZS9CdWlsZGluU2NyaXB0cy9jb25maWd1cmVfZmlsZVwiO1xuaW1wb3J0IGNfaGVhZGVyIGZyb20gXCJAL2NvcmUvQnVpbGRpblNjcmlwdHMvY19oZWFkZXJcIjtcblxuZXhwb3J0IGRlZmF1bHQge1xuICBjb25maWd1cmVfZmlsZSxcbiAgY19oZWFkZXIsXG59O1xuIiwiLypcbiAqIE1JVCBMaWNlbnNlXG4gKlxuICogQ29weXJpZ2h0IChjKSAyMDI1ICBZdXJpaSBZYWt1YmluICh5dXJpaS55YWt1YmluQGdtYWlsLmNvbSlcbiAqXG4gKiBQZXJtaXNzaW9uIGlzIGdyYW50ZWQgdG8gdXNlLCBjb3B5LCBtb2RpZnksIGFuZCBkaXN0cmlidXRlIHRoaXMgc29mdHdhcmVcbiAqIHVuZGVyIHRoZSBNSVQgTGljZW5zZS4gU2VlIExJQ0VOU0UgZmlsZSBmb3IgZGV0YWlscy5cbiAqL1xuXG5pbXBvcnQgeyBJbnRlcmZhY2VTY3JpcHQgfSBmcm9tIFwiQC9jb3JlL01ha2VJbnRlcmZhY2VzXCI7XG5pbXBvcnQgeyBBYnNvbHV0ZVBhdGggfSBmcm9tIFwiQC9jb3JlL0Fic29sdXRlUGF0aFwiO1xuaW1wb3J0IHsgU2NvcGVIZWxwZXIsIFZhcmlhYmxlTWFwLCBWYXJpYW50TWFwIH0gZnJvbSBcIkAvY29yZS9TY29wZVwiO1xuaW1wb3J0IHsgU2ltcGxlT2JqZWN0IH0gZnJvbSBcIkAvY29yZS9TaW1wbGVPYmplY3RcIjtcblxuZXhwb3J0IGNsYXNzIFBvc3RDdXN0b21TY3JpcHQgZXh0ZW5kcyBJbnRlcmZhY2VTY3JpcHQge1xuICBwcml2YXRlIF9uYW1lOiBzdHJpbmc7XG4gIHByaXZhdGUgX3ZhcmlhYmxlczogVmFyaWFudE1hcDtcblxuICBwcml2YXRlIGNvbnN0cnVjdG9yKG5hbWU6IHN0cmluZywgdmFyaWFibGVzPzogVmFyaWFudE1hcCkge1xuICAgIHN1cGVyKCk7XG4gICAgdGhpcy5fbmFtZSA9IG5hbWU7XG4gICAgdGhpcy5fdmFyaWFibGVzID0gdmFyaWFibGVzIHx8IHt9O1xuICB9XG5cbiAgcHVibGljIHN0YXRpYyBjcmVhdGUobmFtZTogc3RyaW5nLCB2YXJpYWJsZXM/OiBWYXJpYW50TWFwKSB7XG4gICAgcmV0dXJuIE9iamVjdC5zZWFsKG5ldyBQb3N0Q3VzdG9tU2NyaXB0KG5hbWUsIHZhcmlhYmxlcykpO1xuICB9XG5cbiAgcHVibGljIHN0YXRpYyBmcm9tSlNPTihvYmplY3Q6IFNpbXBsZU9iamVjdCkge1xuICAgIHJldHVybiBQb3N0Q3VzdG9tU2NyaXB0LmNyZWF0ZShvYmplY3QubmFtZSBhcyBzdHJpbmcsIG9iamVjdC52YXJpYWJsZXMgYXMgVmFyaWFudE1hcCk7XG4gIH1cblxuICBwdWJsaWMgZ2V0IHZhcmlhYmxlcygpIHtcbiAgICByZXR1cm4gdGhpcy5fdmFyaWFibGVzO1xuICB9XG5cbiAgcHVibGljIG1lcmdlVmFyaWFibGVzKHZhcmlhYmxlczogVmFyaWFudE1hcCkge1xuICAgIFNjb3BlSGVscGVyLm1lcmdlVmFyaWFibGVzKHRoaXMuX3ZhcmlhYmxlcywgdmFyaWFibGVzKTtcbiAgfVxuXG4gIHB1YmxpYyB0b0pTT04oKTogU2ltcGxlT2JqZWN0IHtcbiAgICByZXR1cm4ge1xuICAgICAgdHlwZTogUG9zdEN1c3RvbVNjcmlwdC5uYW1lLFxuICAgICAgbmFtZTogdGhpcy5fbmFtZSxcbiAgICAgIHZhcmlhYmxlczogdGhpcy5fdmFyaWFibGVzLFxuICAgIH07XG4gIH1cbiAgXG4gIHB1YmxpYyB0b1N0cmluZygpOiBzdHJpbmcge1xuICAgIHJldHVybiBgW29iamVjdCAke1Bvc3RDdXN0b21TY3JpcHQubmFtZX1dYDtcbiAgfVxufTtcblxuY29uc3QgU0NPUEUgICAgICAgID0gU3ltYm9sKFwiU0NPUEVcIik7XG5jb25zdCBOQU1FICAgICAgICAgPSBTeW1ib2woXCJOQU1FXCIpO1xuY29uc3QgSU5QVVQgICAgICAgID0gU3ltYm9sKFwiSU5QVVRcIik7XG5jb25zdCBPVVRQVVQgICAgICAgPSBTeW1ib2woXCJPVVRQVVRcIik7XG5cbmV4cG9ydCBjbGFzcyBDdXN0b21TY3JpcHQgZXh0ZW5kcyBJbnRlcmZhY2VTY3JpcHQge1xuICBwcml2YXRlIFtTQ09QRV06IFZhcmlhYmxlTWFwO1xuICBwcml2YXRlIFtOQU1FXTogc3RyaW5nO1xuICBwcml2YXRlIF9zY3JpcHRNb2R1bGU6IHN0cmluZyB8IEFic29sdXRlUGF0aDtcbiAgcHJpdmF0ZSBbSU5QVVRdOiBBYnNvbHV0ZVBhdGggfCB1bmRlZmluZWQ7XG4gIHByaXZhdGUgW09VVFBVVF06IEFic29sdXRlUGF0aDtcbiAgcHJpdmF0ZSBfc291cmNlRGlyOiBBYnNvbHV0ZVBhdGg7XG4gIHByaXZhdGUgX2JpbmFyeURpcjogQWJzb2x1dGVQYXRoO1xuXG4gIHByaXZhdGUgY29uc3RydWN0b3Iob3B0aW9uczogQ3VzdG9tU2NyaXB0Lk9wdGlvbnMpIHtcbiAgICBzdXBlcigpO1xuICAgIHRoaXNbU0NPUEVdID0gb3B0aW9ucy52YXJpYWJsZU1hcDtcbiAgICB0aGlzW05BTUVdID0gb3B0aW9ucy5uYW1lIHx8IFwiXCI7XG4gICAgdGhpc1tJTlBVVF0gPSBvcHRpb25zLmlucHV0O1xuICAgIHRoaXMuX3NjcmlwdE1vZHVsZSA9IG9wdGlvbnMuc2NyaXB0TW9kdWxlO1xuICAgIHRoaXNbT1VUUFVUXSA9IG9wdGlvbnMub3V0cHV0O1xuICAgIHRoaXMuX3NvdXJjZURpciA9IG9wdGlvbnMuc291cmNlRGlyO1xuICAgIHRoaXMuX2JpbmFyeURpciA9IG9wdGlvbnMuYmluYXJ5RGlyO1xuICB9XG5cbiAgcHVibGljIHN0YXRpYyBjcmVhdGUob3B0aW9uczogQ3VzdG9tU2NyaXB0Lk9wdGlvbnMpOiBDdXN0b21TY3JpcHQge1xuICAgIHJldHVybiBPYmplY3Quc2VhbChuZXcgQ3VzdG9tU2NyaXB0KG9wdGlvbnMpKTtcbiAgfVxuXG4gIHB1YmxpYyBtZXJnZVZhcmlhYmxlcyh2YXJpYWJsZXM6IFZhcmlhbnRNYXApIHtcbiAgICBTY29wZUhlbHBlci5tZXJnZVZhcmlhYmxlTWFwKHRoaXNbU0NPUEVdLCB2YXJpYWJsZXMpO1xuICB9XG5cbiAgcHVibGljIGdldCBOQU1FKCkge1xuICAgIHJldHVybiB0aGlzW05BTUVdO1xuICB9XG5cbiAgcHVibGljIGdldCBzY3JpcHRNb2R1bGUoKSB7XG4gICAgcmV0dXJuIHRoaXMuX3NjcmlwdE1vZHVsZTtcbiAgfVxuXG4gIHB1YmxpYyBnZXQgSU5QVVQoKTogQWJzb2x1dGVQYXRoIHwgdW5kZWZpbmVkIHtcbiAgICByZXR1cm4gdGhpc1tJTlBVVF07XG4gIH1cblxuICBwdWJsaWMgZ2V0IE9VVFBVVCgpOiBBYnNvbHV0ZVBhdGgge1xuICAgIHJldHVybiB0aGlzW09VVFBVVF07XG4gIH1cblxuICBwdWJsaWMgZ2V0IHNvdXJjZURpcigpOiBBYnNvbHV0ZVBhdGgge1xuICAgIHJldHVybiB0aGlzLl9zb3VyY2VEaXI7XG4gIH1cblxuICBwdWJsaWMgZ2V0IGJpbmFyeURpcigpOiBBYnNvbHV0ZVBhdGgge1xuICAgIHJldHVybiB0aGlzLl9iaW5hcnlEaXI7XG4gIH1cblxuICBwdWJsaWMgZ2V0IHZhcmlhYmxlTWFwKCkge1xuICAgIHJldHVybiB0aGlzW1NDT1BFXTtcbiAgfVxuXG4gIHB1YmxpYyBwb3N0VXBkYXRlKHNjcmlwdDogUG9zdEN1c3RvbVNjcmlwdCkge1xuICAgIHRoaXMubWVyZ2VWYXJpYWJsZXMoc2NyaXB0LnZhcmlhYmxlcyk7XG4gIH1cblxuICBwdWJsaWMgdG9KU09OKCk6IG9iamVjdCB7XG4gICAgcmV0dXJuIHtcbiAgICAgIHZhcmlhYmxlTWFwOiB0aGlzW1NDT1BFXSxcbiAgICAgIE5BTUU6IHRoaXNbTkFNRV0sXG4gICAgICBzY3JpcHRNb2R1bGU6IHRoaXMuX3NjcmlwdE1vZHVsZSxcbiAgICAgIElOUFVUOiB0aGlzLklOUFVULFxuICAgICAgT1VUUFVUOiB0aGlzLk9VVFBVVCxcbiAgICAgIHNvdXJjZURpcjogdGhpcy5fc291cmNlRGlyLFxuICAgICAgYmluYXJ5RGlyOiB0aGlzLl9iaW5hcnlEaXIsXG4gICAgfVxuICB9XG59O1xuXG5leHBvcnQgbmFtZXNwYWNlIEN1c3RvbVNjcmlwdCB7XG5cbmV4cG9ydCBpbnRlcmZhY2UgT3B0aW9ucyB7XG4gIHZhcmlhYmxlTWFwOiBWYXJpYWJsZU1hcCxcbiAgbmFtZT86IHN0cmluZyxcbiAgc2NyaXB0TW9kdWxlOiBzdHJpbmcgfCBBYnNvbHV0ZVBhdGgsXG4gIGlucHV0PzogQWJzb2x1dGVQYXRoLFxuICBvdXRwdXQ6IEFic29sdXRlUGF0aCxcbiAgc291cmNlRGlyOiBBYnNvbHV0ZVBhdGgsXG4gIGJpbmFyeURpcjogQWJzb2x1dGVQYXRoLFxufTtcblxufSAvLyBuYW1lc3BhY2UgQ3VzdG9tU2NyaXB0XG5cblNpbXBsZU9iamVjdC5yZWdpc3Rlckluc3RhbmNlQ3JlYXRvcihQb3N0Q3VzdG9tU2NyaXB0Lm5hbWUsIFBvc3RDdXN0b21TY3JpcHQuZnJvbUpTT04pO1xuIiwiLypcbiAqIE1JVCBMaWNlbnNlXG4gKlxuICogQ29weXJpZ2h0IChjKSAyMDI1ICBZdXJpaSBZYWt1YmluICh5dXJpaS55YWt1YmluQGdtYWlsLmNvbSlcbiAqXG4gKiBQZXJtaXNzaW9uIGlzIGdyYW50ZWQgdG8gdXNlLCBjb3B5LCBtb2RpZnksIGFuZCBkaXN0cmlidXRlIHRoaXMgc29mdHdhcmVcbiAqIHVuZGVyIHRoZSBNSVQgTGljZW5zZS4gU2VlIExJQ0VOU0UgZmlsZSBmb3IgZGV0YWlscy5cbiAqL1xuXG5pbXBvcnQgeyBmaW5kUHJvZ3JhbSB9IGZyb20gXCJAL2NvcmUvRmluZFByb2dyYW1cIjtcbmltcG9ydCB7IFN5c3RlbVNjb3BlIH0gZnJvbSBcIkAvY29yZS9TeXN0ZW1TY29wZVwiO1xuaW1wb3J0IHsgTG9nZ2VyIH0gZnJvbSBcIkAvbG9nZ2VyXCI7XG5cbmNvbnN0IGxvZ2dlciA9IExvZ2dlci5jcmVhdGUoaW1wb3J0Lm1ldGEudXJsKTtcblxuZXhwb3J0IGFzeW5jIGZ1bmN0aW9uIGRldGVybWluZUNvbXBpbGVyKHNjb3BlOiBTeXN0ZW1TY29wZSkge1xuICBjb25zdCBjbGFuZ1BhdGggPSBhd2FpdCBmaW5kUHJvZ3JhbShcImNsYW5nXCIpO1xuICBpZiAoY2xhbmdQYXRoKSB7XG4gICAgbG9nZ2VyLmluZm8oXCJUaGUgQyBjb21waWxlciBpZGVudGlmaWNhdGlvbiBpcyBDbGFuZyBhLmIuY1wiKTtcbiAgICBzY29wZS5BU01fQ09NUElMRVIgPSBcImNsYW5nXCI7XG4gICAgc2NvcGUuQ19DT01QSUxFUiA9IFwiY2xhbmdcIjtcbiAgICBzY29wZS5DWFhfQ09NUElMRVIgPSBcImNsYW5nKytcIjtcbiAgICBzY29wZS5BUiA9IFwibGx2bS1hclwiO1xuICAgIHNjb3BlLlJBTkxJQiA9IFwibGx2bS1yYW5saWJcIjtcbiAgICBzY29wZS5MSU5LRVIgPSBcImxsZFwiO1xuICAgIHNjb3BlLk5NID0gXCJsbHZtLW5tXCI7XG4gICAgc2NvcGUuT0JKQ09QWSA9IFwibGx2bS1vYmpjb3B5XCI7XG4gICAgc2NvcGUuT0JKRFVNUCA9IFwibGx2bS1vYmpkdW1wXCI7XG4gICAgc2NvcGUuU1RSSVAgPSBcImxsdm0tc3RyaXBcIjtcbiAgICByZXR1cm47XG4gIH1cblxuICBjb25zdCBnY2NQYXRoID0gYXdhaXQgZmluZFByb2dyYW0oXCJnY2NcIik7XG4gIGlmIChnY2NQYXRoKSB7XG4gICAgbG9nZ2VyLmluZm8oXCJUaGUgQyBjb21waWxlciBpZGVudGlmaWNhdGlvbiBpcyBHTlUgYS5iLmNcIik7XG4gICAgc2NvcGUuQVNNX0NPTVBJTEVSID0gXCJnY2NcIjtcbiAgICBzY29wZS5DX0NPTVBJTEVSID0gXCJnY2NcIjtcbiAgICBzY29wZS5DWFhfQ09NUElMRVIgPSBcImcrK1wiO1xuICAgIHNjb3BlLkFSID0gXCJhclwiO1xuICAgIHNjb3BlLlJBTkxJQiA9IFwicmFubGliXCI7XG4gICAgc2NvcGUuTElOS0VSID0gXCJsZFwiO1xuICAgIHNjb3BlLk5NID0gXCJubVwiO1xuICAgIHNjb3BlLk9CSkNPUFkgPSBcIm9iamNvcHlcIjtcbiAgICBzY29wZS5PQkpEVU1QID0gXCJvYmpkdW1wXCI7XG4gICAgc2NvcGUuU1RSSVAgPSBcInN0cmlwXCI7XG4gICAgcmV0dXJuO1xuICB9XG5cbiAgdGhyb3cgYENhbiBub3QgZGV0ZXJtaW5lIGNvbXBpbGVyYDtcbn1cbiIsIi8qXG4gKiBNSVQgTGljZW5zZVxuICpcbiAqIENvcHlyaWdodCAoYykgMjAyNSAgWXVyaWkgWWFrdWJpbiAoeXVyaWkueWFrdWJpbkBnbWFpbC5jb20pXG4gKlxuICogUGVybWlzc2lvbiBpcyBncmFudGVkIHRvIHVzZSwgY29weSwgbW9kaWZ5LCBhbmQgZGlzdHJpYnV0ZSB0aGlzIHNvZnR3YXJlXG4gKiB1bmRlciB0aGUgTUlUIExpY2Vuc2UuIFNlZSBMSUNFTlNFIGZpbGUgZm9yIGRldGFpbHMuXG4gKi9cblxuaW1wb3J0IHsgSW50ZXJmYWNlVGFzayB9IGZyb20gXCJAL2NvcmUvTWFrZUludGVyZmFjZXNcIjtcbmltcG9ydCB7IEFic29sdXRlUGF0aCB9IGZyb20gXCJAL2NvcmUvQWJzb2x1dGVQYXRoXCI7XG5pbXBvcnQgeyBpbXBvcnRNb2R1bGUgfSBmcm9tIFwiQC91dGlscy9Nb2R1bGVcIjtcbmltcG9ydCB7IFZhcmlhYmxlTWFwIH0gZnJvbSBcIkAvY29yZS9TY29wZVwiO1xuaW1wb3J0IHsgU2NyaXB0Q29udGV4dCB9IGZyb20gXCJAL2NvcmUvU2NyaXB0Q29udGV4dFwiO1xuaW1wb3J0IHsgU2ltcGxlT2JqZWN0IH0gZnJvbSBcIkAvY29yZS9TaW1wbGVPYmplY3RcIjtcbmltcG9ydCB7IExvZ2dlciB9IGZyb20gXCJAL2xvZ2dlclwiO1xuXG5jb25zdCBsb2dnZXIgPSBMb2dnZXIuY3JlYXRlKGltcG9ydC5tZXRhLnVybCk7XG5cbmV4cG9ydCBjbGFzcyBFeGVjU2NyaXB0VGFzayBleHRlbmRzIEludGVyZmFjZVRhc2sge1xuICBwcml2YXRlIF92YXJpYWJsZU1hcDogVmFyaWFibGVNYXA7XG4gIHByaXZhdGUgX3NjcmlwdDogQWJzb2x1dGVQYXRoIHwgRnVuY3Rpb247XG5cbiAgcHVibGljIGNvbnN0cnVjdG9yKHZhcmlhYmxlTWFwOiBWYXJpYWJsZU1hcCwgc2NyaXB0OiBBYnNvbHV0ZVBhdGggfCBGdW5jdGlvbikge1xuICAgIHN1cGVyKCk7XG4gICAgdGhpcy5fdmFyaWFibGVNYXAgPSB2YXJpYWJsZU1hcDtcbiAgICB0aGlzLl9zY3JpcHQgPSBzY3JpcHQ7XG4gIH1cblxuICBwdWJsaWMgYXN5bmMgZXhlY3V0ZSgpOiBQcm9taXNlPHZvaWQ+IHtcbiAgICBsZXQgZnVuYyA9IHRoaXMuX3NjcmlwdDtcbiAgICBpZiAoZnVuYyBpbnN0YW5jZW9mIEFic29sdXRlUGF0aCkge1xuICAgICAgY29uc3Qgc2NyaXB0VXJsID0gZnVuYy50b0pTT04oKTsgLy8gVE9ETzogdG9TdHJpbmcoKVxuICAgICAgbG9nZ2VyLmRlYnVnKFwiSW1wb3J0XCIsIHNjcmlwdFVybCk7XG4gICAgICBmdW5jID0gKGF3YWl0IGltcG9ydE1vZHVsZShzY3JpcHRVcmwpKS5kZWZhdWx0O1xuICAgIH1cbiAgICBpZiAoZnVuYyBpbnN0YW5jZW9mIEZ1bmN0aW9uKSB7XG4gICAgICBjb25zdCBtayA9IFNjcmlwdENvbnRleHQuY3JlYXRlKHRoaXMuX3ZhcmlhYmxlTWFwKTtcbiAgICAgIGNvbnN0IHJlc3VsdCA9IGZ1bmMobWspO1xuICAgICAgaWYgKHJlc3VsdCBpbnN0YW5jZW9mIFByb21pc2UpXG4gICAgICAgIGF3YWl0IHJlc3VsdDtcbiAgICB9XG4gICAgZWxzZSB7XG4gICAgICB0aHJvdyBuZXcgRXJyb3IoYFRoZXJlIGlzIG5vIEZ1bmN0aW9uYCk7XG4gICAgfVxuICB9XG5cbiAgcHVibGljIHRvSlNPTigpOiBTaW1wbGVPYmplY3Qge1xuICAgIHJldHVybiB7XG4gICAgICB0eXBlOiBFeGVjU2NyaXB0VGFzay5uYW1lLFxuICAgICAgdmFyaWFibGVNYXA6IHRoaXMuX3ZhcmlhYmxlTWFwLFxuICAgICAgc2NyaXB0OiB0aGlzLl9zY3JpcHQsXG4gICAgfVxuICB9XG59O1xuIiwiLypcbiAqIE1JVCBMaWNlbnNlXG4gKlxuICogQ29weXJpZ2h0IChjKSAyMDI1ICBZdXJpaSBZYWt1YmluICh5dXJpaS55YWt1YmluQGdtYWlsLmNvbSlcbiAqXG4gKiBQZXJtaXNzaW9uIGlzIGdyYW50ZWQgdG8gdXNlLCBjb3B5LCBtb2RpZnksIGFuZCBkaXN0cmlidXRlIHRoaXMgc29mdHdhcmVcbiAqIHVuZGVyIHRoZSBNSVQgTGljZW5zZS4gU2VlIExJQ0VOU0UgZmlsZSBmb3IgZGV0YWlscy5cbiAqL1xuXG5pbXBvcnQgZnMgZnJvbSBcIm5vZGU6ZnNcIjtcblxuaW1wb3J0IHsgSW50ZXJmYWNlVGFzayB9IGZyb20gXCJAL2NvcmUvTWFrZUludGVyZmFjZXNcIjtcbmltcG9ydCB7IEFic29sdXRlUGF0aCB9IGZyb20gXCJAL2NvcmUvQWJzb2x1dGVQYXRoXCI7XG5pbXBvcnQgeyBTaW1wbGVPYmplY3QgfSBmcm9tIFwiQC9jb3JlL1NpbXBsZU9iamVjdFwiO1xuaW1wb3J0IHsgTG9nZ2VyIH0gZnJvbSBcIkAvbG9nZ2VyXCI7XG5cbmNvbnN0IGxvZ2dlciA9IExvZ2dlci5jcmVhdGUoaW1wb3J0Lm1ldGEudXJsKTtcblxuaW50ZXJmYWNlIEVudHJ5IHtcbiAgc3JjOiBBYnNvbHV0ZVBhdGg7XG4gIGRlc3Q6IEFic29sdXRlUGF0aDtcbn07XG5cbmV4cG9ydCBjbGFzcyBGaWxlSW5zdGFsbGF0aW9uVGFzayBleHRlbmRzIEludGVyZmFjZVRhc2sge1xuICBwcml2YXRlIF9lbnRyaWVzOiBFbnRyeVtdO1xuXG4gIHB1YmxpYyBjb25zdHJ1Y3RvcigpIHtcbiAgICBzdXBlcigpO1xuICAgIHRoaXMuX2VudHJpZXMgPSBbXTtcbiAgfVxuXG4gIHB1YmxpYyBhc3luYyBleGVjdXRlKCk6IFByb21pc2U8dm9pZD4ge1xuICAgIGZvciAoY29uc3Qge3NyYywgZGVzdH0gb2YgdGhpcy5fZW50cmllcykge1xuICAgICAgbG9nZ2VyLm5vdGljZShcIkluc3RhbGxpbmc6IFwiICsgZGVzdCk7XG4gICAgICBhd2FpdCBmcy5wcm9taXNlcy5ta2RpcihkZXN0LmRpcm5hbWUoKS50b1BhdGgoKSwgeyByZWN1cnNpdmU6IHRydWUgfSk7XG4gICAgICBhd2FpdCBmcy5wcm9taXNlcy5jcChzcmMudG9QYXRoKCksIGRlc3QudG9QYXRoKCksIHsgZm9yY2U6IHRydWUgfSk7XG4gICAgfVxuICB9XG5cbiAgcHVibGljIGFkZChzcmM6IEFic29sdXRlUGF0aCwgZGVzdDogQWJzb2x1dGVQYXRoKSB7XG4gICAgdGhpcy5fZW50cmllcy5wdXNoKHtzcmMsIGRlc3R9KTtcbiAgfVxuXG4gIHB1YmxpYyBzdGF0aWMgZnJvbUpTT04obzogU2ltcGxlT2JqZWN0KSB7XG4gICAgY29uc3QgdGFzayA9IG5ldyBGaWxlSW5zdGFsbGF0aW9uVGFzaztcbiAgICBmb3IgKGNvbnN0IGl0ZXIgb2YgKG8gYXMgYW55KS5lbnRyaWVzIGFzIEVudHJ5W10pXG4gICAgICB0YXNrLl9lbnRyaWVzLnB1c2goaXRlcik7XG4gICAgcmV0dXJuIHRhc2s7XG4gIH1cblxuICBwdWJsaWMgdG9KU09OKCk6IFNpbXBsZU9iamVjdCB7XG4gICAgcmV0dXJuIHtcbiAgICAgIHR5cGU6IEZpbGVJbnN0YWxsYXRpb25UYXNrLm5hbWUsXG4gICAgICBlbnRyaWVzOiB0aGlzLl9lbnRyaWVzLFxuICAgIH1cbiAgfVxufTtcblxuU2ltcGxlT2JqZWN0LnJlZ2lzdGVySW5zdGFuY2VDcmVhdG9yKEZpbGVJbnN0YWxsYXRpb25UYXNrLm5hbWUsIEZpbGVJbnN0YWxsYXRpb25UYXNrLmZyb21KU09OKTtcbiIsIi8qXG4gKiBNSVQgTGljZW5zZVxuICpcbiAqIENvcHlyaWdodCAoYykgMjAyNSAgWXVyaWkgWWFrdWJpbiAoeXVyaWkueWFrdWJpbkBnbWFpbC5jb20pXG4gKlxuICogUGVybWlzc2lvbiBpcyBncmFudGVkIHRvIHVzZSwgY29weSwgbW9kaWZ5LCBhbmQgZGlzdHJpYnV0ZSB0aGlzIHNvZnR3YXJlXG4gKiB1bmRlciB0aGUgTUlUIExpY2Vuc2UuIFNlZSBMSUNFTlNFIGZpbGUgZm9yIGRldGFpbHMuXG4gKi9cblxuaW1wb3J0IHsgUGF0aCB9IGZyb20gXCJAL3V0aWxzL1BhdGhcIjtcbmltcG9ydCB7IEhvc3QgfSBmcm9tIFwiQC91dGlscy9Ib3N0XCI7XG5pbXBvcnQgeyBmaWxlRXhpc3RzLCBmaWxlRXhpc3RzU3luYyB9IGZyb20gXCJAL3V0aWxzL0ZpbGVTeXN0ZW1cIjtcblxuZnVuY3Rpb24gcG9zc2libGVQcm9ncmFtTGlzdChuYW1lOiBzdHJpbmcpIHtcbiAgaWYgKEhvc3QuZXhlY3V0YWJsZVN1ZmZpeClcbiAgICBuYW1lICs9IEhvc3QuZXhlY3V0YWJsZVN1ZmZpeDtcblxuICBjb25zdCByZXN1bHQgPSBbXTtcbiAgY29uc3QgcGF0aHMgPSAocHJvY2Vzcy5lbnYuUEFUSCB8fCBcIlwiKS5zcGxpdChQYXRoLmRlbGltaXRlcik7XG4gIGZvciAoY29uc3QgaXRlciBvZiBwYXRocykge1xuICAgIGNvbnN0IGZpbGVuYW1lID0gUGF0aC5yZXNvbHZlKGl0ZXIsIG5hbWUpO1xuICAgIHJlc3VsdC5wdXNoKGZpbGVuYW1lKTtcbiAgfVxuXG4gIHJldHVybiByZXN1bHQ7XG59XG5cbmV4cG9ydCBhc3luYyBmdW5jdGlvbiBmaW5kUHJvZ3JhbShuYW1lOiBzdHJpbmcpOiBQcm9taXNlPHN0cmluZyB8IHVuZGVmaW5lZD4ge1xuICBmb3IgKGNvbnN0IGl0ZXIgb2YgcG9zc2libGVQcm9ncmFtTGlzdChuYW1lKSkge1xuICAgIGlmIChhd2FpdCBmaWxlRXhpc3RzKGl0ZXIpKVxuICAgICAgcmV0dXJuIGl0ZXI7XG4gIH1cbiAgcmV0dXJuIHVuZGVmaW5lZDtcbn1cblxuZXhwb3J0IGZ1bmN0aW9uIGZpbmRQcm9ncmFtU3luYyhuYW1lOiBzdHJpbmcpOiBzdHJpbmcgfCB1bmRlZmluZWQge1xuICBmb3IgKGNvbnN0IGl0ZXIgb2YgcG9zc2libGVQcm9ncmFtTGlzdChuYW1lKSkge1xuICAgIGlmIChmaWxlRXhpc3RzU3luYyhpdGVyKSlcbiAgICAgIHJldHVybiBpdGVyO1xuICB9XG4gIHJldHVybiB1bmRlZmluZWQ7XG59XG4iLCIvKlxuICogTUlUIExpY2Vuc2VcbiAqXG4gKiBDb3B5cmlnaHQgKGMpIDIwMjUgIFl1cmlpIFlha3ViaW4gKHl1cmlpLnlha3ViaW5AZ21haWwuY29tKVxuICpcbiAqIFBlcm1pc3Npb24gaXMgZ3JhbnRlZCB0byB1c2UsIGNvcHksIG1vZGlmeSwgYW5kIGRpc3RyaWJ1dGUgdGhpcyBzb2Z0d2FyZVxuICogdW5kZXIgdGhlIE1JVCBMaWNlbnNlLiBTZWUgTElDRU5TRSBmaWxlIGZvciBkZXRhaWxzLlxuICovXG5cbmltcG9ydCB7IFNpbXBsZU9iamVjdCB9IGZyb20gXCJAL2NvcmUvU2ltcGxlT2JqZWN0XCI7XG5pbXBvcnQgeyBJbnRlcmZhY2VUYXNrIH0gZnJvbSBcIkAvY29yZS9NYWtlSW50ZXJmYWNlc1wiO1xuaW1wb3J0IHsgTG9nZ2VyIH0gZnJvbSBcIkAvbG9nZ2VyXCI7XG5pbXBvcnQgeyBBYnNvbHV0ZVBhdGggfSBmcm9tIFwiLi9BYnNvbHV0ZVBhdGhcIjtcblxuY29uc3QgbG9nZ2VyID0gTG9nZ2VyLmNyZWF0ZShpbXBvcnQubWV0YS51cmwpO1xuXG5leHBvcnQgY2xhc3MgR29hbFRhcmdldCB7XG4gIHByaXZhdGUgX21lc3NhZ2U6IHN0cmluZyB8IHVuZGVmaW5lZDtcbiAgcHJpdmF0ZSBfbmFtZTogc3RyaW5nIHwgdW5kZWZpbmVkO1xuICBwcml2YXRlIF9vdXRwdXQ6IHN0cmluZyB8IHVuZGVmaW5lZDtcbiAgcHJpdmF0ZSBfZGVwZW5kcyA9IG5ldyBBcnJheTxzdHJpbmc+O1xuICBwcml2YXRlIF90YXNrcyA9IG5ldyBBcnJheTxJbnRlcmZhY2VUYXNrPjtcblxuICBjb25zdHJ1Y3RvcihuYW1lPzogc3RyaW5nKSB7XG4gICAgdGhpcy5fbmFtZSA9IG5hbWU7XG4gIH1cblxuICBnZXQgbWVzc2FnZSgpOiBzdHJpbmcgfCB1bmRlZmluZWQge1xuICAgIHJldHVybiB0aGlzLl9tZXNzYWdlO1xuICB9XG5cbiAgc2V0IG1lc3NhZ2UodmFsdWU6IHN0cmluZykge1xuICAgIHRoaXMuX21lc3NhZ2UgPSB2YWx1ZTtcbiAgfVxuXG4gIGdldCBuYW1lKCk6IHN0cmluZyB8IHVuZGVmaW5lZCB7XG4gICAgcmV0dXJuIHRoaXMuX25hbWU7XG4gIH1cblxuICBnZXQgb3V0cHV0KCk6IHN0cmluZyB8IHVuZGVmaW5lZCB7XG4gICAgcmV0dXJuIHRoaXMuX291dHB1dDtcbiAgfVxuXG4gIHNldCBvdXRwdXQodmFsdWU6IEFic29sdXRlUGF0aCkge1xuICAgIHRoaXMuX291dHB1dCA9IHZhbHVlLnRvUGF0aCgpO1xuICB9XG5cbiAgZ2V0IGRlcGVuZHMoKTogc3RyaW5nW10ge1xuICAgIHJldHVybiB0aGlzLl9kZXBlbmRzO1xuICB9XG5cbiAgcHVibGljIGFkZERlcGVuZGVuY3koLi4udmFsdWU6IHN0cmluZ1tdKSB7XG4gICAgdGhpcy5fZGVwZW5kcy5wdXNoKC4uLnZhbHVlKTtcbiAgfVxuXG4gIHB1YmxpYyBhZGRUYXNrKHRhc2s6IEludGVyZmFjZVRhc2spIHtcbiAgICB0aGlzLl90YXNrcy5wdXNoKHRhc2spO1xuICB9XG5cbiAgYXN5bmMgZG9Xb3JrKCk6IFByb21pc2U8dm9pZD4ge1xuICAgIGZvciAoY29uc3QgdGFzayBvZiB0aGlzLl90YXNrcykge1xuICAgICAgY29uc3QgcmVzID0gdGFzay5leGVjdXRlKCk7XG4gICAgICBpZiAocmVzIGluc3RhbmNlb2YgUHJvbWlzZSlcbiAgICAgICAgYXdhaXQgcmVzO1xuICAgIH1cbiAgfVxuXG4gIHB1YmxpYyB0b0pTT04oKTogU2ltcGxlT2JqZWN0IHtcbiAgICBjb25zdCBqc29uOiBhbnkgPSB7XG4gICAgICB0eXBlOiBHb2FsVGFyZ2V0Lm5hbWUsXG4gICAgICBkZXBlbmRzOiB0aGlzLl9kZXBlbmRzLFxuICAgICAgdGFza3M6IHRoaXMuX3Rhc2tzLFxuICAgIH07XG4gICAgaWYgKHRoaXMuX21lc3NhZ2UpIHtcbiAgICAgIGpzb24ubWVzc2FnZSA9IHRoaXMuX21lc3NhZ2U7XG4gICAgfVxuICAgIGlmICh0aGlzLl9uYW1lKSB7XG4gICAgICBqc29uLm5hbWUgPSB0aGlzLl9uYW1lO1xuICAgIH1cbiAgICBpZiAodGhpcy5fb3V0cHV0KSB7XG4gICAgICBqc29uLm91dHB1dCA9IHRoaXMuX291dHB1dDtcbiAgICB9XG4gICAgcmV0dXJuIGpzb247XG4gIH1cbn07XG5cbmV4cG9ydCBjbGFzcyBHb2FsQ29sbGVjdGlvbiB7XG4gIHByaXZhdGUgX2VudHJpZXMgPSBuZXcgQXJyYXk8R29hbFRhcmdldD47XG5cbiAgcHVibGljIGdldCBFTlRSSUVTKCkge1xuICAgIHJldHVybiB0aGlzLl9lbnRyaWVzO1xuICB9XG5cbiAgcHVibGljIGFkZFRhcmdldChnZTogR29hbFRhcmdldCkge1xuICAgIGlmIChnZS5uYW1lICYmIHRoaXMuX2VudHJpZXMuZmluZCgoaSkgPT4gaS5uYW1lID09PSBnZS5uYW1lKSlcbiAgICAgIHRocm93IG5ldyBFcnJvcihgTm1hZSBcIiR7Z2UubmFtZX1cIiBleGlzdHNgKTtcbiAgICBpZiAoZ2Uub3V0cHV0ICYmIHRoaXMuX2VudHJpZXMuZmluZCgoaSkgPT4gaS5vdXRwdXQgPT09IGdlLm91dHB1dCkpXG4gICAgICB0aHJvdyBuZXcgRXJyb3IoYE91dHB1dCBcIiR7Z2Uub3V0cHV0fVwiIGV4aXN0c2ApO1xuICAgIHRoaXMuX2VudHJpZXMucHVzaChnZSk7XG4gIH1cblxuICBwdWJsaWMgZ2V0VGFyZ2V0KG5hbWU6IHN0cmluZyk6IEdvYWxUYXJnZXQgfCB1bmRlZmluZWQge1xuICAgIGlmICghbmFtZSlcbiAgICAgIHJldHVybiB1bmRlZmluZWQ7XG4gICAgcmV0dXJuIHRoaXMuX2VudHJpZXMuZmluZCgoaSkgPT4gaS5uYW1lID09PSBuYW1lKTtcbiAgfVxuXG4gIHByaXZhdGUgYWRkVGFyZ2V0TGlzdEltcGwobmFtZTogc3RyaW5nLCByZXN1bHQ6IEFycmF5PEdvYWxUYXJnZXQ+KSB7XG4gICAgaWYgKHJlc3VsdC5maW5kKGkgPT4gaS5uYW1lID09PSBuYW1lIHx8IGkub3V0cHV0ID09PSBuYW1lKSkge1xuICAgICAgcmV0dXJuO1xuICAgIH1cblxuICAgIGNvbnN0IGdvYWwgPSB0aGlzLl9lbnRyaWVzLmZpbmQoaSA9PiBpLm5hbWUgPT09IG5hbWUgfHwgaS5vdXRwdXQgPT09IG5hbWUpO1xuICAgIGlmICghZ29hbCkge1xuICAgICAgcmV0dXJuO1xuICAgIH1cblxuICAgIGZvciAoY29uc3QgaXRlciBvZiBnb2FsLmRlcGVuZHMpIHtcbiAgICAgIHRoaXMuYWRkVGFyZ2V0TGlzdEltcGwoaXRlci50b1N0cmluZygpLCByZXN1bHQpO1xuICAgIH1cblxuICAgIHJlc3VsdC5wdXNoKGdvYWwpO1xuICB9XG4gIFxuICBwdWJsaWMgZ2V0VGFyZ2V0TGlzdChuYW1lOnN0cmluZykge1xuICAgIGNvbnN0IHJlc3VsdCA9IG5ldyBBcnJheTxHb2FsVGFyZ2V0PjtcbiAgICB0aGlzLmFkZFRhcmdldExpc3RJbXBsKG5hbWUsIHJlc3VsdCk7XG4gICAgcmV0dXJuIHJlc3VsdDtcbiAgfVxuICBcbiAgcHVibGljIHRvSlNPTigpIHtcbiAgICByZXR1cm4ge1xuICAgICAgdHlwZTogR29hbENvbGxlY3Rpb24ubmFtZSxcbiAgICAgIGVudHJpZXM6IHRoaXMuX2VudHJpZXMsXG4gICAgfTtcbiAgfVxufTtcbiIsIi8qXG4gKiBNSVQgTGljZW5zZVxuICpcbiAqIENvcHlyaWdodCAoYykgMjAyNSAgWXVyaWkgWWFrdWJpbiAoeXVyaWkueWFrdWJpbkBnbWFpbC5jb20pXG4gKlxuICogUGVybWlzc2lvbiBpcyBncmFudGVkIHRvIHVzZSwgY29weSwgbW9kaWZ5LCBhbmQgZGlzdHJpYnV0ZSB0aGlzIHNvZnR3YXJlXG4gKiB1bmRlciB0aGUgTUlUIExpY2Vuc2UuIFNlZSBMSUNFTlNFIGZpbGUgZm9yIGRldGFpbHMuXG4gKi9cblxuaW1wb3J0IHsgVGFyZ2V0TmFtZSB9IGZyb20gXCJAL2NvcmUvVGFyZ2V0TmFtZVwiO1xuaW1wb3J0IHsgQWJzb2x1dGVQYXRoIH0gZnJvbSBcIkAvY29yZS9BYnNvbHV0ZVBhdGhcIjtcbmltcG9ydCB7IFNpbXBsZU9iamVjdCB9IGZyb20gXCJAL2NvcmUvU2ltcGxlT2JqZWN0XCI7XG5pbXBvcnQgeyBTeXN0ZW1TY29wZSB9IGZyb20gXCJAL2NvcmUvU3lzdGVtU2NvcGVcIjtcblxuY29uc3QgVkFMVUUgICAgICAgPSBTeW1ib2woXCJWQUxVRVwiKTtcbmNvbnN0IERFU1RJTkFUSU9OID0gU3ltYm9sKFwiREVTVElOQVRJT05cIik7XG5jb25zdCBCQVNFX0RJUiAgICA9IFN5bWJvbChcIkJBU0VfRElSXCIpO1xuXG5leHBvcnQgY2xhc3MgSW5zdGFsbEVudGl0eSB7XG4gIHByaXZhdGUgW1ZBTFVFXTogQWJzb2x1dGVQYXRoIHwgVGFyZ2V0TmFtZTtcbiAgcHJpdmF0ZSBbREVTVElOQVRJT05dOiBBYnNvbHV0ZVBhdGg7XG4gIHByaXZhdGUgW0JBU0VfRElSXTogQWJzb2x1dGVQYXRoIHwgbnVsbDtcblxuICBwcml2YXRlIGNvbnN0cnVjdG9yKHNjb3BlOiBTeXN0ZW1TY29wZSwgdmFsdWU6IHN0cmluZyB8IEFic29sdXRlUGF0aCB8IFRhcmdldE5hbWUsIHBhcmFtczogc3RyaW5nIHwgYW55KSB7XG4gICAgbGV0IGRlc3RpbmF0aW9uOiBzdHJpbmcgfCBBYnNvbHV0ZVBhdGggfCB1bmRlZmluZWQ7XG4gICAgbGV0IGJhc2VEaXI7XG4gICAgaWYgKHR5cGVvZiBwYXJhbXMgPT09IFwic3RyaW5nXCIpXG4gICAgICBkZXN0aW5hdGlvbiA9IHBhcmFtcztcbiAgICBlbHNlIGlmIChwYXJhbXMpIHtcbiAgICAgIGRlc3RpbmF0aW9uID0gcGFyYW1zLmRlc3RpbmF0aW9uO1xuICAgICAgYmFzZURpciA9IHBhcmFtcy5iYXNlRGlyO1xuICAgIH1cblxuICAgIGlmICghZGVzdGluYXRpb24pXG4gICAgICB0aHJvdyBuZXcgRXJyb3IoYFBhcmFtZXRlciBkZXN0aW5hdGlvbiBpcyBub3Qgc3BlY2lmaWVkYCk7XG4gIFxuICAgIGlmIChiYXNlRGlyKVxuICAgICAgYmFzZURpciA9IHNjb3BlLlNPVVJDRV9ESVIucmVzb2x2ZShiYXNlRGlyKTtcbiAgXG4gICAgaWYgKHR5cGVvZiB2YWx1ZSA9PT0gXCJzdHJpbmdcIiB8fCB2YWx1ZSBpbnN0YW5jZW9mIEFic29sdXRlUGF0aCkge1xuICAgICAgdmFsdWUgPSBzY29wZS5TT1VSQ0VfRElSLnJlc29sdmUodmFsdWUudG9TdHJpbmcoKSkgYXMgQWJzb2x1dGVQYXRoO1xuICAgICAgdmFsdWUgPSBBYnNvbHV0ZVBhdGguY3JlYXRlKHZhbHVlKTtcbiAgICAgIGJhc2VEaXIgPSBiYXNlRGlyIHx8IHZhbHVlLmRpcm5hbWUoKTtcbiAgICB9XG4gICAgZWxzZSBpZiAoISh2YWx1ZSBpbnN0YW5jZW9mIFRhcmdldE5hbWUpKSB7XG4gICAgICB0aHJvdyBuZXcgRXJyb3IoYE5vdCBzdXBwb3J0ZXQgdmFsdWUgb2YgJHt2YWx1ZX1gKTtcbiAgICB9XG4gIFxuICAgIHRoaXNbVkFMVUVdID0gdmFsdWU7XG4gICAgdGhpc1tERVNUSU5BVElPTl0gPSBBYnNvbHV0ZVBhdGguY3JlYXRlKHNjb3BlLklOU1RBTExfUFJFRklYLnJlc29sdmUoZGVzdGluYXRpb24udG9TdHJpbmcoKSkudG9TdHJpbmcoKSk7XG4gICAgdGhpc1tCQVNFX0RJUl0gPSBiYXNlRGlyID8gQWJzb2x1dGVQYXRoLmNyZWF0ZShiYXNlRGlyLnRvU3RyaW5nKCkpIDogbnVsbDtcbiAgfVxuICBcbiAgcHVibGljIHN0YXRpYyBjcmVhdGUoc2NvcGU6IGFueSwgdmFsdWU6IHN0cmluZyB8IEFic29sdXRlUGF0aCB8IFRhcmdldE5hbWUsIHBhcmFtczogc3RyaW5nIHwgYW55KSB7XG4gICAgcmV0dXJuIE9iamVjdC5zZWFsKG5ldyBJbnN0YWxsRW50aXR5KHNjb3BlLCB2YWx1ZSwgcGFyYW1zKSk7XG4gIH1cblxuICBwdWJsaWMgZ2V0IFZBTFVFICgpIHtcbiAgICByZXR1cm4gdGhpc1tWQUxVRV07XG4gIH1cblxuICBwdWJsaWMgZ2V0IERFU1RJTkFUSU9OICgpIHtcbiAgICByZXR1cm4gdGhpc1tERVNUSU5BVElPTl07XG4gIH1cblxuICBwdWJsaWMgZ2V0IEJBU0VfRElSICgpIHtcbiAgICByZXR1cm4gdGhpc1tCQVNFX0RJUl07XG4gIH1cblxuICBwdWJsaWMgdG9KU09OKCk6IFNpbXBsZU9iamVjdCB7XG4gICAgcmV0dXJuIHtcbiAgICAgIHR5cGU6IEluc3RhbGxFbnRpdHkubmFtZSxcbiAgICAgIFZBTFVFOiB0aGlzLlZBTFVFLFxuICAgICAgREVTVElOQVRJT046IHRoaXMuREVTVElOQVRJT04sXG4gICAgICBCQVNFX0RJUjogdGhpcy5CQVNFX0RJUixcbiAgICB9O1xuICB9XG59O1xuIiwiLypcbiAqIE1JVCBMaWNlbnNlXG4gKlxuICogQ29weXJpZ2h0IChjKSAyMDI1ICBZdXJpaSBZYWt1YmluICh5dXJpaS55YWt1YmluQGdtYWlsLmNvbSlcbiAqXG4gKiBQZXJtaXNzaW9uIGlzIGdyYW50ZWQgdG8gdXNlLCBjb3B5LCBtb2RpZnksIGFuZCBkaXN0cmlidXRlIHRoaXMgc29mdHdhcmVcbiAqIHVuZGVyIHRoZSBNSVQgTGljZW5zZS4gU2VlIExJQ0VOU0UgZmlsZSBmb3IgZGV0YWlscy5cbiAqL1xuXG5pbXBvcnQgeyBNYWtlQ29udGV4dCB9IGZyb20gXCJAL2NvcmUvQmFzZUNvbnRleHRcIjtcbmltcG9ydCB7IGZpbGVFeGlzdHNTeW5jIH0gZnJvbSBcIkAvdXRpbHMvRmlsZVN5c3RlbVwiO1xuaW1wb3J0IHsgUHJvamVjdENvbnRleHQgfSBmcm9tIFwiQC9jb3JlL1Byb2plY3RDb250ZXh0XCI7XG5pbXBvcnQgeyBTY29wZUhlbHBlciwgVmFyaWFudE1hcCwgVmFyaWFibGVNYXAgfSBmcm9tIFwiQC9jb3JlL1Njb3BlXCI7XG5pbXBvcnQgeyByZXF1aXJlU3luYyB9IGZyb20gXCJAL3V0aWxzL01vZHVsZVwiO1xuaW1wb3J0IHsgQ1VTVE9NX1ZBUklBQkxFX0dST1VQIH0gZnJvbSBcIkAvQ29uc3RhbnRzXCI7XG5pbXBvcnQgeyBBYnNvbHV0ZVBhdGggfSBmcm9tIFwiQC9jb3JlL0Fic29sdXRlUGF0aFwiO1xuaW1wb3J0IHsgTG9nZ2VyIH0gZnJvbSBcIkAvbG9nZ2VyXCI7XG5cbmNvbnN0IGxvZ2dlciA9IExvZ2dlci5jcmVhdGUoaW1wb3J0Lm1ldGEudXJsKTtcblxuZXhwb3J0IGNsYXNzIExvY2FsTWFrZUNvbnRleHQgZXh0ZW5kcyBNYWtlQ29udGV4dCB7XG4gIHByaXZhdGUgX3Byb2plY3Q6IFByb2plY3RDb250ZXh0O1xuXG4gIHB1YmxpYyBjb25zdHJ1Y3RvcihzY29wZTogVmFyaWFibGVNYXAsIHByb2plY3Q6IFByb2plY3RDb250ZXh0KSB7XG4gICAgc3VwZXIoc2NvcGUpO1xuICAgIHRoaXMuX3Byb2plY3QgPSBwcm9qZWN0O1xuICB9XG5cbiAgcHVibGljIGV4ZWN1dGVTY3JpcHQoc2NyaXB0OiBhbnksIHBhcmFtczogYW55KSB7XG4gICAgdGhpcy5fcHJvamVjdC5leGVjdXRlU2NyaXB0U3luYyh0aGlzLl9zY29wZSwgc2NyaXB0LCBwYXJhbXMpO1xuICB9XG5cbiAgcHVibGljIGFkZENhY2hlVmFyaWFibGVzKHBhcmFtczogc3RyaW5nIHwgVmFyaWFudE1hcCk6IHZvaWQge1xuICAgIGxldCB2YXJpYWJsZXMgPSBwYXJhbXM7XG4gICAgaWYgKHR5cGVvZiBwYXJhbXMgPT09IFwic3RyaW5nXCIpIHtcbiAgICAgIGNvbnN0IGZpbGVuYW1lID0gU2NvcGVIZWxwZXIuZ2V0KHRoaXMuX3Njb3BlLCBcIlNPVVJDRV9ESVJcIikucmVzb2x2ZShwYXJhbXMpLnRvU3RyaW5nKCk7XG4gICAgICBpZiAoIWZpbGVFeGlzdHNTeW5jKGZpbGVuYW1lKSlcbiAgICAgICAgcmV0dXJuO1xuICAgICAgdmFyaWFibGVzID0gcmVxdWlyZVN5bmMoZmlsZW5hbWUpO1xuICAgIH1cblxuICAgIFNjb3BlSGVscGVyLmRlZmluZVZhcmlhYmxlc0luVmFyaWFibGVNYXAodGhpcy5fc2NvcGUsIENVU1RPTV9WQVJJQUJMRV9HUk9VUCwgdmFyaWFibGVzKTtcbiAgfVxuXG4gIHB1YmxpYyBhZGRTdWJkaXJlY3Rvcnkoc291cmNlRGlyOiBzdHJpbmcgfCBBYnNvbHV0ZVBhdGgsIGJpbmFyeURpcj86IHN0cmluZyB8IEFic29sdXRlUGF0aCk6IHZvaWQge1xuICAgIHRoaXMuX3Byb2plY3QuYWRkU3ViZGlyZWN0b3J5KHRoaXMuX3Njb3BlLCBzb3VyY2VEaXIsIGJpbmFyeURpcik7XG4gIH1cbn07XG4iLCIvKlxuICogTUlUIExpY2Vuc2VcbiAqXG4gKiBDb3B5cmlnaHQgKGMpIDIwMjUgIFl1cmlpIFlha3ViaW4gKHl1cmlpLnlha3ViaW5AZ21haWwuY29tKVxuICpcbiAqIFBlcm1pc3Npb24gaXMgZ3JhbnRlZCB0byB1c2UsIGNvcHksIG1vZGlmeSwgYW5kIGRpc3RyaWJ1dGUgdGhpcyBzb2Z0d2FyZVxuICogdW5kZXIgdGhlIE1JVCBMaWNlbnNlLiBTZWUgTElDRU5TRSBmaWxlIGZvciBkZXRhaWxzLlxuICovXG5cbmltcG9ydCB7IFRhcmdldEZpbGUgfSBmcm9tIFwiQC9jb3JlL1RhcmdldEZpbGVcIjtcbmltcG9ydCB7IFRhcmdldE9iamVjdHMgfSBmcm9tIFwiQC9jb3JlL1RhcmdldE9iamVjdHNcIjtcbmltcG9ydCB7IFRhcmdldEluY2x1ZGVzIH0gZnJvbSBcIkAvY29yZS9UYXJnZXRJbmNsdWRlc1wiO1xuaW1wb3J0IHsgVmFyaWFudE1hcCB9IGZyb20gXCJAL2NvcmUvU2NvcGVcIjtcbmltcG9ydCB7IEFic29sdXRlUGF0aCB9IGZyb20gXCJAL2NvcmUvQWJzb2x1dGVQYXRoXCI7XG5pbXBvcnQgeyBTb3VyY2VGaWxlIH0gZnJvbSBcIkAvY29yZS9Tb3VyY2VGaWxlXCI7XG5cbmV4cG9ydCB0eXBlIENvbXBpbGVPcHRpb24gPSBzdHJpbmcgfCBzdHJpbmdbXTtcbmV4cG9ydCB0eXBlIExpbmtPcHRpb24gPSBzdHJpbmcgfCBzdHJpbmdbXTtcblxuZXhwb3J0IGFic3RyYWN0IGNsYXNzIEludGVyZmFjZVRhc2sge1xuICBhYnN0cmFjdCBleGVjdXRlKCk6IFByb21pc2U8dm9pZD4gfCB2b2lkO1xufTtcblxuZXhwb3J0IGFic3RyYWN0IGNsYXNzIEludGVyZmFjZVNvdXJjZUZpbGVzIHtcbiAgYWJzdHJhY3Qgc2V0TGFuZ3VhZ2UobGFuZ3VhZ2U6IHN0cmluZyk6IHZvaWQ7XG4gIGFic3RyYWN0IGFkZERlZmluaXRpb25zKC4uLmRlZmluaXRpb25zOiBzdHJpbmdbXSk6IHZvaWQ7XG4gIGFic3RyYWN0IGFkZENvbXBpbGVGbGFncyguLi5mbGFnczogc3RyaW5nW10pOiB2b2lkO1xufTtcblxuZXhwb3J0IGFic3RyYWN0IGNsYXNzIEludGVyZmFjZVRhcmdldCB7XG4gIGFic3RyYWN0IGdldCB0YXJnZXROYW1lKCk6IHN0cmluZztcbiAgYWJzdHJhY3QgZ2V0IHRhcmdldEZpbGUoKTogVGFyZ2V0RmlsZTtcbiAgYWJzdHJhY3QgZ2V0IGluY2x1ZGVzKCk6IFRhcmdldEluY2x1ZGVzO1xuICBhYnN0cmFjdCBnZXQgb2JqZWN0cygpOiBUYXJnZXRPYmplY3RzO1xuXG4gIGFic3RyYWN0IHNldFByZWZpeChwcmVmaXg6IHN0cmluZyk6IHZvaWQ7ICBcbiAgYWJzdHJhY3Qgc2V0U3VmZml4KHN1ZmZpeDogc3RyaW5nKTogdm9pZDtcbiAgYWJzdHJhY3Qgc2V0T3V0cHV0TmFtZShvdXRwdXROYW1lOiBzdHJpbmcpOiB2b2lkO1xuXG4gIGFic3RyYWN0IGFkZFNvdXJjZXMoLi4uc291cmNlczogQXJyYXk8VGFyZ2V0T2JqZWN0cyB8IFNvdXJjZUZpbGUgfCBBYnNvbHV0ZVBhdGggfCBzdHJpbmc+KTogdm9pZDtcbiAgYWJzdHJhY3QgYWRkSW5jbHVkZXMoLi4uaW5jbHVkZXM6IEFycmF5PFRhcmdldEluY2x1ZGVzIHwgQWJzb2x1dGVQYXRoIHwgc3RyaW5nPik6IHZvaWQ7XG4gIGFic3RyYWN0IGFkZExpYnJhcmllcyguLi5saWJyYXJpZXM6IGFueSk6IHZvaWQ7XG4gIGFic3RyYWN0IGFkZENvbXBpbGVPcHRpb25zKC4uLm9wdGlvbnM6IENvbXBpbGVPcHRpb25bXSk6IHZvaWQ7XG4gIGFic3RyYWN0IGFkZExpbmtPcHRpb25zKC4uLm9wdGlvbnM6IExpbmtPcHRpb25bXSk6IHZvaWQ7XG4gIGFic3RyYWN0IGdldFNvdXJjZUZpbGVzKC4uLnNvdXJjZXM6IGFueVtdKTogSW50ZXJmYWNlU291cmNlRmlsZXM7XG4gIGFic3RyYWN0IGFkZERlZmluaXRpb25zKC4uLmRlZmluaXRpb25zOiBhbnlbXSk6IHZvaWQ7XG4gIGFic3RyYWN0IGFkZFByZUJ1aWxkKGNvbW1hbmQ6IGFueSwgYXJnczogYW55W10pOiB2b2lkO1xuICBhYnN0cmFjdCBhZGRQb3N0QnVpbGQoY29tbWFuZDogYW55LCBhcmdzOiBhbnlbXSk6IHZvaWQ7XG5cbiAgYWJzdHJhY3Qgc2V0UG9zaXRpb25JbmRlcGVuZGVudENvZGUodmFsdWU6IGJvb2xlYW4pOiB2b2lkO1xuICBhYnN0cmFjdCBhZGRQdWJsaWNJbmNsdWRlcyguLi5pbmNsdWRlczogQXJyYXk8VGFyZ2V0SW5jbHVkZXMgfCBBYnNvbHV0ZVBhdGggfCBzdHJpbmc+KTogdm9pZDtcbiAgYWJzdHJhY3QgYWRkUHVibGljRGVmaW5pdGlvbnMoLi4uZGVmaW5pdGlvbnM6IGFueSk6IHZvaWQ7XG4gIGFic3RyYWN0IGFkZFB1YmxpY0xpYnJhcmllcyguLi5saWJyYXJpZXM6IGFueVtdKTogdm9pZDtcbiAgYWJzdHJhY3QgYWRkUHVibGljQ29tcGlsZU9wdGlvbnMoLi4ub3B0aW9uczogQ29tcGlsZU9wdGlvbltdKTogdm9pZDtcbiAgYWJzdHJhY3QgYWRkUHVibGljTGlua09wdGlvbnMoLi4ub3B0aW9uczogTGlua09wdGlvbltdKTogdm9pZDtcbn07XG5cbmV4cG9ydCBhYnN0cmFjdCBjbGFzcyBJbnRlcmZhY2VTY3JpcHQge1xuICBhYnN0cmFjdCBtZXJnZVZhcmlhYmxlcyh2YXJpYWJsZXM6IFZhcmlhbnRNYXApOiB2b2lkO1xufTtcblxuZXhwb3J0IGludGVyZmFjZSBJR2VuZXJhbENvbnRleHQge1xuICBnZXRQcm9wZXJ0eShuYW1lOiBzdHJpbmcpOiBhbnk7XG4gIHNldFByb3BlcnR5KG5hbWU6IHN0cmluZywgdmFsdWU6IGFueSk6IGJvb2xlYW47XG4gIGhhc1Byb3BlcnR5KG5hbWU6IHN0cmluZyk6IGJvb2xlYW47XG4gIGRlbGV0ZVByb3BlcnR5KG5hbWU6IHN0cmluZyk6IGJvb2xlYW47XG4gIGdldFByb3BlcnR5TmFtZXMoKTogc3RyaW5nW107XG5cbiAgZmluZFByb2dyYW0obmFtZTogc3RyaW5nKTogc3RyaW5nIHwgdW5kZWZpbmVkO1xufTtcblxuZXhwb3J0IGludGVyZmFjZSBJTWFrZUNvbnRleHQgZXh0ZW5kcyBJR2VuZXJhbENvbnRleHQge1xuICBnZXRDYWNoZVZhcmlhYmxlcygpOiBhbnk7XG4gIGFkZENhY2hlVmFyaWFibGVzKHBhcmFtczogc3RyaW5nIHwgVmFyaWFudE1hcCk6IHZvaWQ7XG4gIGFkZEluY2x1ZGVEaXJlY3RvcmllcyguLi5kaXJzOiBhbnlbXSk6IHZvaWQ7XG4gIGFkZFN1YmRpcmVjdG9yeShzb3VyY2VEaXI6IHN0cmluZyB8IEFic29sdXRlUGF0aCwgYmluYXJ5RGlyPzogc3RyaW5nIHwgQWJzb2x1dGVQYXRoKTogdm9pZDtcbiAgc2NyaXB0KG5hbWU6IHN0cmluZyk6IEludGVyZmFjZVNjcmlwdDtcbiAgYWRkQ3VzdG9tU2NyaXB0KHNjcmlwdDogc3RyaW5nLCBwYXJhbXM6IGFueSk6IEludGVyZmFjZVNjcmlwdDtcbiAgdGFyZ2V0KG5hbWU6IHN0cmluZyk6IEludGVyZmFjZVRhcmdldDtcbiAgYWRkT2JqZWN0TGlicmFyeShuYW1lOiBzdHJpbmcsIC4uLnNvdXJjZXM6IGFueVtdKTogSW50ZXJmYWNlVGFyZ2V0O1xuICBhZGRTdGF0aWNMaWJyYXJ5KG5hbWU6IHN0cmluZywgLi4uc291cmNlczogYW55W10pOiBJbnRlcmZhY2VUYXJnZXQ7XG4gIGFkZFNoYXJlZExpYnJhcnkobmFtZTogc3RyaW5nLCAuLi5zb3VyY2VzOiBhbnlbXSk6IEludGVyZmFjZVRhcmdldDtcbiAgYWRkRXhlY3V0YWJsZShuYW1lOiBzdHJpbmcsIC4uLnNvdXJjZXM6IGFueVtdKTogSW50ZXJmYWNlVGFyZ2V0O1xuICBleGVjdXRlU2NyaXB0KHNjcmlwdDogYW55LCBwYXJhbXM6IGFueSk6IHZvaWQ7XG4gIGluc3RhbGwodmFsdWU6IGFueSwgcGFyYW1zOiBhbnkpOiB2b2lkO1xufTtcbiIsIi8qXG4gKiBNSVQgTGljZW5zZVxuICpcbiAqIENvcHlyaWdodCAoYykgMjAyNSAgWXVyaWkgWWFrdWJpbiAoeXVyaWkueWFrdWJpbkBnbWFpbC5jb20pXG4gKlxuICogUGVybWlzc2lvbiBpcyBncmFudGVkIHRvIHVzZSwgY29weSwgbW9kaWZ5LCBhbmQgZGlzdHJpYnV0ZSB0aGlzIHNvZnR3YXJlXG4gKiB1bmRlciB0aGUgTUlUIExpY2Vuc2UuIFNlZSBMSUNFTlNFIGZpbGUgZm9yIGRldGFpbHMuXG4gKi9cblxuaW1wb3J0IHsgUHJvamVjdENvbnRleHQgfSBmcm9tIFwiQC9jb3JlL1Byb2plY3RDb250ZXh0XCI7XG5pbXBvcnQgeyBWYXJpYWJsZU1hcCB9IGZyb20gXCJAL2NvcmUvU2NvcGVcIjtcbmltcG9ydCB7IEdlbmVyYWxDb250ZXh0LCBjcmVhdGVDb250ZXh0IH0gZnJvbSBcIkAvY29yZS9CYXNlQ29udGV4dFwiO1xuXG5jb25zdCBHTE9CQUwgPSBTeW1ib2woXCJHTE9CQUxcIik7XG5jb25zdCBTQ09QRSA9IFN5bWJvbChcIlNDT1BFXCIpO1xuXG5leHBvcnQgY2xhc3MgUGx1Z2luQ29udGV4dCBleHRlbmRzIEdlbmVyYWxDb250ZXh0IHtcbiAgW0dMT0JBTF06IFByb2plY3RDb250ZXh0O1xuICBbU0NPUEVdOiBWYXJpYWJsZU1hcDtcblxuICBwdWJsaWMgY29uc3RydWN0b3IoZ2xvYmFsOiBQcm9qZWN0Q29udGV4dCwgdmFyaWFibGVNYXA6IFZhcmlhYmxlTWFwKSB7XG4gICAgc3VwZXIodmFyaWFibGVNYXApO1xuICAgIHRoaXNbR0xPQkFMXSA9IGdsb2JhbDtcbiAgICB0aGlzW1NDT1BFXSA9IHZhcmlhYmxlTWFwO1xuICB9XG5cbiAgcHVibGljIGFkZFN1YmRpcmVjdG9yeUFsaWFzKHNyYzogYW55LCBkZXN0OiBhbnkpIHtcbiAgICB0aGlzW0dMT0JBTF0uYWRkU3ViZGlyZWN0b3J5QWxpYXModGhpc1tTQ09QRV0sIHNyYywgZGVzdCk7XG4gIH1cblxuICBwdWJsaWMgc3RhdGljIGNyZWF0ZShnbG9iYWw6IFByb2plY3RDb250ZXh0LCB2YXJpYWJsZU1hcDogVmFyaWFibGVNYXApIHtcbiAgICByZXR1cm4gY3JlYXRlQ29udGV4dChuZXcgUGx1Z2luQ29udGV4dChnbG9iYWwsIHZhcmlhYmxlTWFwKSk7XG4gIH1cbn07XG4iLCIvKlxuICogTUlUIExpY2Vuc2VcbiAqXG4gKiBDb3B5cmlnaHQgKGMpIDIwMjUgIFl1cmlpIFlha3ViaW4gKHl1cmlpLnlha3ViaW5AZ21haWwuY29tKVxuICpcbiAqIFBlcm1pc3Npb24gaXMgZ3JhbnRlZCB0byB1c2UsIGNvcHksIG1vZGlmeSwgYW5kIGRpc3RyaWJ1dGUgdGhpcyBzb2Z0d2FyZVxuICogdW5kZXIgdGhlIE1JVCBMaWNlbnNlLiBTZWUgTElDRU5TRSBmaWxlIGZvciBkZXRhaWxzLlxuICovXG5cbmltcG9ydCBmcyBmcm9tIFwibm9kZTpmc1wiO1xuXG5pbXBvcnQgeyBBTExfVEFSR0VULCBJTlNUQUxMX1RBUkdFVCB9IGZyb20gXCJAL0NvbnN0YW50c1wiO1xuaW1wb3J0IHsgQWJzb2x1dGVQYXRoIH0gZnJvbSBcIkAvY29yZS9BYnNvbHV0ZVBhdGhcIjtcbmltcG9ydCB7IGZpbGVFeGlzdHMsIGZpbGVFeGlzdHNTeW5jIH0gZnJvbSBcIkAvdXRpbHMvRmlsZVN5c3RlbVwiO1xuaW1wb3J0IHsgVGFyZ2V0Q29sbGVjdGlvbiB9IGZyb20gXCJAL2NvcmUvVGFyZ2V0Q29sbGVjdGlvblwiO1xuaW1wb3J0IHsgU2NyaXB0Q29sbGVjdGlvbiB9IGZyb20gXCJAL2NvcmUvU2NyaXB0Q29sbGVjdGlvblwiO1xuaW1wb3J0IHsgR29hbENvbGxlY3Rpb24sIEdvYWxUYXJnZXQgfSBmcm9tIFwiQC9jb3JlL0dvYWxDb2xsZWN0aW9uXCI7XG5pbXBvcnQgeyBVc2VyTWFrZUNvbnRleHQgfSBmcm9tIFwiQC9jb3JlL1VzZXJNYWtlQ29udGV4dFwiO1xuaW1wb3J0IHsgTG9jYWxNYWtlQ29udGV4dCB9IGZyb20gXCJAL2NvcmUvTG9jYWxNYWtlQ29udGV4dFwiO1xuaW1wb3J0IHsgVGFyZ2V0Q29tbWFuZCB9IGZyb20gXCJAL2NvcmUvVGFyZ2V0XCI7XG5pbXBvcnQgeyBTeXN0ZW1TY29wZSB9IGZyb20gXCJAL2NvcmUvU3lzdGVtU2NvcGVcIjtcbmltcG9ydCB7IHJlcXVpcmVTeW5jIH0gZnJvbSBcIkAvdXRpbHMvTW9kdWxlXCI7XG5pbXBvcnQgeyBMb2dnZXIgfSBmcm9tIFwiQC9sb2dnZXJcIjtcbmltcG9ydCB7IFRhcmdldE5hbWUgfSBmcm9tIFwiQC9jb3JlL1RhcmdldE5hbWVcIjtcbmltcG9ydCB7IEluc3RhbGxFbnRpdHkgfSBmcm9tIFwiQC9jb3JlL0luc3RhbGxFbnRpdHlcIjtcbmltcG9ydCB7IFNjcmlwdENvbnRleHQgfSBmcm9tIFwiQC9jb3JlL1NjcmlwdENvbnRleHRcIjtcbmltcG9ydCB7IFNjb3BlSGVscGVyLCBWYXJpYWJsZU1hcCB9IGZyb20gXCIuL1Njb3BlXCI7XG5pbXBvcnQgeyBUYXJnZXRGaWxlIH0gZnJvbSBcIkAvY29yZS9UYXJnZXRGaWxlXCI7XG5pbXBvcnQgeyBTb3VyY2VGaWxlIH0gZnJvbSBcIkAvY29yZS9Tb3VyY2VGaWxlXCI7XG5pbXBvcnQgeyBFeGVjU2NyaXB0VGFzayB9IGZyb20gXCJAL2NvcmUvRXhlY1NjcmlwdFRhc2tcIjtcbmltcG9ydCB7IFNwYXduU3luY1Rhc2sgfSBmcm9tIFwiQC9jb3JlL1NwYXduU3luY1Rhc2tcIjtcbmltcG9ydCB7IEZpbGVJbnN0YWxsYXRpb25UYXNrIH0gZnJvbSBcIkAvY29yZS9GaWxlSW5zdGFsbGF0aW9uVGFza1wiO1xuaW1wb3J0IHsgcGVyZm9ybUNvbnRleHQsIGNyZWF0ZVZhcmlhYmxlTWFwRm9yRGlyZWN0b3J5IH0gZnJvbSBcIkAvY29yZS9CYXNlQ29udGV4dFwiO1xuXG5pbXBvcnQgQnVpbGRpblNjcmlwdHMgZnJvbSBcIkAvY29yZS9CdWlsZGluU2NyaXB0c1wiO1xuXG5jb25zdCBsb2dnZXIgPSBMb2dnZXIuY3JlYXRlKGltcG9ydC5tZXRhLnVybCk7XG5cbmNvbnN0IFRBUkdFVFMgPSBTeW1ib2woXCJUQVJHRVRTXCIpO1xuY29uc3QgQ1VTVE9NX1NDUklQVFMgPSBTeW1ib2woXCJDVVNUT01fU0NSSVBUU1wiKTtcbmNvbnN0IENBQ0hFID0gU3ltYm9sKFwiQ0FDSEVcIik7XG5jb25zdCBCVUlMVElOX1NDUklQVFMgPSBTeW1ib2woXCJCVUlMVElOX1NDUklQVFNcIik7XG5cbnR5cGUgU3ViZGlyZWN0b3J5QWxpYXMgPSB7XG4gIFtuYW1lOiBzdHJpbmddOiBBYnNvbHV0ZVBhdGggfCBudWxsO1xufTtcblxudHlwZSBDYWNoZVZhcmlhYmxlRGVzY3JpcHRvciA9IHtcbiAgdHlwZT86IGFueTtcbiAgdmFsdWU/OiBhbnk7XG4gIGRlc2NyaXB0aW9uPzogc3RyaW5nO1xufTtcblxudHlwZSBDYWNoZVZhcmlhYmxlRGVzY3JpcHRvcnMgPSB7XG4gIFtuYW1lOiBzdHJpbmddOiBDYWNoZVZhcmlhYmxlRGVzY3JpcHRvcjtcbn07XG5cbnR5cGUgQnVpbGRpblNjcmlwdHMgPSB7XG4gIFtuYW1lOiBzdHJpbmddOiBGdW5jdGlvbjtcbn07XG5cbmV4cG9ydCBpbnRlcmZhY2UgRXhlY1N0cnVjdCB7XG4gIGNvbW1hbmQ6IHN0cmluZztcbiAgYXJnczogc3RyaW5nW107XG59O1xuXG5mdW5jdGlvbiBlbnN1cmVWYWx1ZUJ5VHlwZSh0eXBlOiBhbnksIHZhbHVlOiBhbnkpIHtcbiAgaWYgKEFycmF5LmlzQXJyYXkodHlwZSkgPyB0eXBlLmluY2x1ZGVzKHZhbHVlKSA6IHR5cGVvZiB2YWx1ZSA9PT0gdHlwZSlcbiAgICByZXR1cm4gdmFsdWU7XG4gIHRocm93IG5ldyBFcnJvcihgVGhlICcke3ZhbHVlfScgaXMgbm90IGEgJHt0eXBlfWApO1xufVxuXG5mdW5jdGlvbiByZXNvbHZlSW5zdGFuY2UocHJvamVjdDogUHJvamVjdENvbnRleHQsIG86IHN0cmluZyB8IEFic29sdXRlUGF0aCB8IFRhcmdldEZpbGUpOiBzdHJpbmcge1xuICBpZiAodHlwZW9mIG8gPT09IFwic3RyaW5nXCIpXG4gICAgcmV0dXJuIG87XG5cbiAgaWYgKG8gaW5zdGFuY2VvZiBBYnNvbHV0ZVBhdGgpXG4gICAgcmV0dXJuIG8udG9TdHJpbmcoKTtcblxuICBpZiAobyBpbnN0YW5jZW9mIFRhcmdldEZpbGUpIHtcbiAgICBjb25zdCB0YXJnZXQgPSBwcm9qZWN0LlRBUkdFVFMuZ2V0KG8udGFyZ2V0TmFtZSk7XG4gICAgcmV0dXJuIHRhcmdldC5nZXRGaWxlKCkudG9TdHJpbmcoKTtcbiAgfVxuXG4gIHRocm93IG5ldyBFcnJvcihgVW5hYmxlIHRvIHJlc29sdmUgb2JqZWN0ICR7b31gKTtcbn1cblxuZnVuY3Rpb24gcmVzb2x2ZVRhcmdldENvbW1hbmQocHJvamVjdDogUHJvamVjdENvbnRleHQsIHRjbWQ6IFRhcmdldENvbW1hbmQpOiBFeGVjU3RydWN0IHtcbiAgY29uc3QgY29tbWFuZCA9IHJlc29sdmVJbnN0YW5jZShwcm9qZWN0LCB0Y21kLmNvbW1hbmQpO1xuICBjb25zdCBhcmdzID0gdGNtZC5hcmdzLm1hcChpID0+IHJlc29sdmVJbnN0YW5jZShwcm9qZWN0LCBpKSk7XG4gIHJldHVybiB7Y29tbWFuZCwgYXJnc307XG59XG5cbmV4cG9ydCBjbGFzcyBQcm9qZWN0Q29udGV4dCB7XG4gIHByaXZhdGUgW1RBUkdFVFNdOiBUYXJnZXRDb2xsZWN0aW9uO1xuICBwcml2YXRlIFtDVVNUT01fU0NSSVBUU106IFNjcmlwdENvbGxlY3Rpb247XG4gIHByaXZhdGUgW0NBQ0hFXTogQ2FjaGVWYXJpYWJsZURlc2NyaXB0b3JzO1xuICBwcml2YXRlIF9pbnN0YWxsTGlzdDogSW5zdGFsbEVudGl0eVtdO1xuICBwcml2YXRlIF9wcm9jZXNzZWRWYXJpYWJsZU1hcDogYW55O1xuICBwcml2YXRlIFtCVUlMVElOX1NDUklQVFNdOiBCdWlsZGluU2NyaXB0cztcbiAgcHJpdmF0ZSBfc3ViZGlyQWxpYXM6IFN1YmRpcmVjdG9yeUFsaWFzO1xuICBwcml2YXRlIF9zdWJkaXJMaXN0OiBWYXJpYWJsZU1hcFtdO1xuXG4gIHByaXZhdGUgY29uc3RydWN0b3IoKSB7XG4gICAgdGhpc1tUQVJHRVRTXSA9IFRhcmdldENvbGxlY3Rpb24uY3JlYXRlKCk7XG4gICAgdGhpc1tDVVNUT01fU0NSSVBUU10gPSBTY3JpcHRDb2xsZWN0aW9uLmNyZWF0ZSgpO1xuICAgIHRoaXNbQ0FDSEVdID0ge307XG4gICAgdGhpcy5faW5zdGFsbExpc3QgPSBbXTtcbiAgICB0aGlzLl9wcm9jZXNzZWRWYXJpYWJsZU1hcCA9IHt9O1xuICAgIHRoaXMuX3N1YmRpckFsaWFzID0ge307XG4gICAgdGhpc1tCVUlMVElOX1NDUklQVFNdID0gQnVpbGRpblNjcmlwdHM7XG4gICAgdGhpcy5fc3ViZGlyTGlzdCA9IFtdO1xuICB9XG5cbiAgcHVibGljIHN0YXRpYyBjcmVhdGUoKSB7XG4gICAgcmV0dXJuIE9iamVjdC5zZWFsKG5ldyBQcm9qZWN0Q29udGV4dCk7XG4gIH1cblxuICBwdWJsaWMgZ2V0IFRBUkdFVFMoKSB7XG4gICAgcmV0dXJuIHRoaXNbVEFSR0VUU107XG4gIH1cblxuICBwdWJsaWMgZ2V0IENBQ0hFKCkge1xuICAgIHJldHVybiB0aGlzW0NBQ0hFXTtcbiAgfVxuXG4gIHB1YmxpYyByZWdpc3RlclZhcmlhYmxlTWFwKG5hbWU6IHN0cmluZywgdmFyaWFibGVNYXA6IFZhcmlhYmxlTWFwKSB7XG4gICAgaWYgKHRoaXMuX3Byb2Nlc3NlZFZhcmlhYmxlTWFwW25hbWVdKVxuICAgICAgdGhyb3cgbmV3IEVycm9yKGBTeXN0ZW1WYXJpYWJsZXMgZXhpc3RzIGZvciAke25hbWV9YCk7XG4gICAgdGhpcy5fcHJvY2Vzc2VkVmFyaWFibGVNYXBbbmFtZV0gPSB2YXJpYWJsZU1hcDtcbiAgfVxuXG4gIHB1YmxpYyByZXNvbHZlU3ViZGlyZWN0b3J5KHBhdGg6IEFic29sdXRlUGF0aCB8IHN0cmluZyk6IEFic29sdXRlUGF0aCB8IHN0cmluZyB8IHVuZGVmaW5lZCB7XG4gICAgY29uc3QgcmVzb2x2ZWRQYXRoID0gdGhpcy5fc3ViZGlyQWxpYXNbcGF0aC50b1N0cmluZygpXTtcbiAgICBpZiAocmVzb2x2ZWRQYXRoID09PSB1bmRlZmluZWQpXG4gICAgICByZXR1cm4gcGF0aDtcbiAgICBpZiAocmVzb2x2ZWRQYXRoID09PSBudWxsKVxuICAgICAgcmV0dXJuIHVuZGVmaW5lZDtcbiAgICByZXR1cm4gcmVzb2x2ZWRQYXRoO1xuICB9XG5cbiAgcHVibGljIGFkZFN1YmRpcmVjdG9yeUFsaWFzKHZhcmlhYmxlTWFwOiBWYXJpYWJsZU1hcCwgc3JjOiBhbnksIGRlc3Q6IGFueSkge1xuICAgIGNvbnN0IHNyY1BhdGggPSBBYnNvbHV0ZVBhdGguY3JlYXRlKFNjb3BlSGVscGVyLmdldCh2YXJpYWJsZU1hcCwgXCJTT1VSQ0VfRElSXCIpLnJlc29sdmUoc3JjKSk7XG4gICAgY29uc3QgZGVzdFBhdGggPSAoZGVzdCA9PT0gbnVsbCkgPyBudWxsIDogQWJzb2x1dGVQYXRoLmNyZWF0ZShTY29wZUhlbHBlci5nZXQodmFyaWFibGVNYXAsIFwiU09VUkNFX0RJUlwiKS5yZXNvbHZlKGRlc3QpKTtcbiAgICBjb25zdCBzcmNTdHIgPSBzcmNQYXRoLnRvU3RyaW5nKCk7XG4gICAgaWYgKHRoaXMuX3N1YmRpckFsaWFzLmhhc093blByb3BlcnR5KHNyY1N0cikpXG4gICAgICBsb2dnZXIud2FybihgT3dlcnJpZGUgXCIke3NyY1N0cn1cIiBzdWJkaXJlY3RvcnkgYWxpYXNgKTtcbiAgICB0aGlzLl9zdWJkaXJBbGlhc1tzcmNTdHJdID0gZGVzdFBhdGg7XG4gIH1cblxuICBwdWJsaWMgYWRkQ2FjaGVWYXJpYWJsZXModmFyaWFibGVzOiBDYWNoZVZhcmlhYmxlRGVzY3JpcHRvcnMpIHtcbiAgICBjb25zdCBjYWNoZSA9IHRoaXNbQ0FDSEVdO1xuICAgIGZvciAoY29uc3QgW2tleSwgZW50cnldIG9mIE9iamVjdC5lbnRyaWVzKHZhcmlhYmxlcykpIHtcbiAgICAgIGNhY2hlW2tleV0gPSBlbnRyeTtcbiAgICB9XG4gIH1cblxuICBwdWJsaWMgbG9hZENhY2hlVmFyaWFibGVzKGZpbGVuYW1lOiBBYnNvbHV0ZVBhdGggfCBzdHJpbmcpIHtcbiAgICBpZiAoZmlsZUV4aXN0c1N5bmMoZmlsZW5hbWUudG9TdHJpbmcoKSkpIHtcbiAgICAgIGNvbnN0IHZhcmlhYmxlcyA9IHJlcXVpcmVTeW5jKGZpbGVuYW1lLnRvU3RyaW5nKCkpO1xuICAgICAgdGhpcy5hZGRDYWNoZVZhcmlhYmxlcyh2YXJpYWJsZXMpO1xuICAgIH1cbiAgfVxuXG4gIHB1YmxpYyBjb3B5Q2FjaGVWYXJpYWJsZXMoc2NvcGU6IGFueSkge1xuICAgIGZvciAoY29uc3QgW25hbWUsIGVudHJ5XSBvZiBPYmplY3QuZW50cmllcyh0aGlzW0NBQ0hFXSkpIHtcbiAgICAgIGlmICghT2JqZWN0Lmhhc093bihzY29wZSwgbmFtZSkpIHtcbiAgICAgICAgY29uc3QgdHlwZSA9IGVudHJ5LnR5cGUgfHwgdHlwZW9mIGVudHJ5LnZhbHVlO1xuICAgICAgICBjb25zdCBkZXNjcmlwdGlvbiA9IGVudHJ5LmRlc2NyaXB0aW9uIHx8IFwiXCI7XG4gICAgICAgIGxldCB2YWx1ZSA9IEFycmF5LmlzQXJyYXkoZW50cnkudmFsdWUpID8gWyAuLi5lbnRyeS52YWx1ZSBdIDogZW50cnkudmFsdWU7ICBcbiAgICAgICAgY29uc3QgbmFtZVN5bWJvbCA9IFN5bWJvbChuYW1lKTtcbiAgICAgICAgc2NvcGVbbmFtZVN5bWJvbF0gPSBlbnN1cmVWYWx1ZUJ5VHlwZSh0eXBlLCB2YWx1ZSk7XG4gIFxuICAgICAgICBPYmplY3QuZGVmaW5lUHJvcGVydHkoc2NvcGUsIG5hbWUsIHtcbiAgICAgICAgICBlbnVtZXJhYmxlOiB0cnVlLFxuICAgICAgICAgIGdldCgpIHtcbiAgICAgICAgICAgIHJldHVybiB0aGlzW25hbWVTeW1ib2xdO1xuICAgICAgICAgIH0sXG4gICAgICAgICAgc2V0KHZhbHVlKSB7XG4gICAgICAgICAgICB0aGlzW25hbWVTeW1ib2xdID0gZW5zdXJlVmFsdWVCeVR5cGUodHlwZSwgdmFsdWUpO1xuICAgICAgICAgIH0sXG4gICAgICAgIH0pO1xuICAgICAgfVxuICAgIH1cbiAgfVxuXG4gIHB1YmxpYyBleGVjdXRlU2NyaXB0U3luYyh2YXJpYWJsZU1hcDogVmFyaWFibGVNYXAsIHNjcmlwdDogYW55LCBwYXJhbXM6IGFueSkge1xuICAgIGNvbnN0IG5ld1ZhcmlhYmxlTWFwID0gU2NvcGVIZWxwZXIuY2xvbmVWYXJpYWJsZU1hcCh2YXJpYWJsZU1hcCk7XG4gICAgcGFyYW1zICYmIFNjb3BlSGVscGVyLmV4dGVuZFZhcmlhYmxlTWFwQnlWYWx1ZXMobmV3VmFyaWFibGVNYXAsIFwiXCIsIHBhcmFtcyk7XG4gICAgY29uc3Qgc2NyaXB0UGF0aCA9IFNjb3BlSGVscGVyLmdldChuZXdWYXJpYWJsZU1hcCwgXCJTT1VSQ0VfRElSXCIpLnJlc29sdmUoc2NyaXB0KTtcbiAgICBjb25zdCBmdW5jID0gcmVxdWlyZVN5bmMoc2NyaXB0UGF0aC50b1N0cmluZygpKTtcbiAgICBjb25zdCBtayA9IFNjcmlwdENvbnRleHQuY3JlYXRlKG5ld1ZhcmlhYmxlTWFwKTtcbiAgICBmdW5jKG1rKTtcbiAgfVxuXG4gIHB1YmxpYyB3cml0ZUNhY2hlVmFyaWFibGVzKGZpbGVuYW1lOiBzdHJpbmcpIHtcbiAgICBjb25zdCBqc29uID0gSlNPTi5zdHJpbmdpZnkodGhpc1tDQUNIRV0sIG51bGwsIDIpO1xuICAgIGZzLndyaXRlRmlsZVN5bmMoZmlsZW5hbWUsIGpzb24sIFwidXRmLThcIik7XG4gIH1cblxuICBwdWJsaWMgYXN5bmMgcHJlcGVhclNjcmlwdEZpbGUodmFyaWFibGVNYXA6IFZhcmlhYmxlTWFwKTogUHJvbWlzZTxib29sZWFuPiB7XG4gICAgY29uc3Qgb3JpZ2luU291cmNlRGlyID0gU2NvcGVIZWxwZXIuZ2V0KHZhcmlhYmxlTWFwLCBcIlNPVVJDRV9ESVJcIikudG9TdHJpbmcoKTtcbiAgICBjb25zdCByZXNvbHZlU291cmNlRGlyID0gdGhpcy5yZXNvbHZlU3ViZGlyZWN0b3J5KG9yaWdpblNvdXJjZURpcik7XG4gICAgaWYgKCFyZXNvbHZlU291cmNlRGlyKSB7XG4gICAgICBsb2dnZXIuaW5mbyhgU291cmNlIGRpciBcIiR7b3JpZ2luU291cmNlRGlyfVwiIHdhcyBkaXNhYmxlZGApO1xuICAgICAgcmV0dXJuIGZhbHNlO1xuICAgIH1cbiAgICBTY29wZUhlbHBlci5zZXQodmFyaWFibGVNYXAsIFwiU09VUkNFX0RJUlwiLCByZXNvbHZlU291cmNlRGlyKTtcblxuICAgIGlmICghU2NvcGVIZWxwZXIuZ2V0KHZhcmlhYmxlTWFwLCBcIlNDUklQVF9GSUxFXCIpKSB7XG4gICAgICBsZXQgc2NyaXB0RmlsZTogQWJzb2x1dGVQYXRoIHwgdW5kZWZpbmVkO1xuICAgICAgY29uc3QgZmlsZUxpc3QgPSBbIFwiLmpzXCIsIFwiLm1qc1wiIF0ubWFwKGkgPT4gXCJNYWtlU2NyaXB0XCIgKyBpKTtcbiAgICAgIGZvciAoY29uc3QgZmlsZW5hbWUgb2YgZmlsZUxpc3QpIHtcbiAgICAgICAgY29uc3QgaXRlciA9IFNjb3BlSGVscGVyLmdldCh2YXJpYWJsZU1hcCwgXCJTT1VSQ0VfRElSXCIpLmpvaW4oZmlsZW5hbWUpO1xuICAgICAgICBpZiAoYXdhaXQgZmlsZUV4aXN0cyhpdGVyLnRvU3RyaW5nKCkpKSB7XG4gICAgICAgICAgc2NyaXB0RmlsZSA9IGl0ZXI7XG4gICAgICAgICAgYnJlYWs7XG4gICAgICAgIH1cbiAgICAgIH1cblxuICAgICAgaWYgKCFzY3JpcHRGaWxlKVxuICAgICAgICB0aHJvdyBuZXcgRXJyb3IoYFRoZXJlIGFyZSBubyBmaWxlcyAke2ZpbGVMaXN0LmpvaW4oXCIsIFwiKX0gaW4gXCIke1Njb3BlSGVscGVyLmdldCh2YXJpYWJsZU1hcCwgXCJTT1VSQ0VfRElSXCIpfVwiYCk7XG5cbiAgICAgIFNjb3BlSGVscGVyLnNldCh2YXJpYWJsZU1hcCwgXCJTQ1JJUFRfRklMRVwiLCBzY3JpcHRGaWxlKTtcbiAgICAgIFNjb3BlSGVscGVyLnNldCh2YXJpYWJsZU1hcCwgXCJTQ1JJUFRfRElSXCIsIFNjb3BlSGVscGVyLmdldCh2YXJpYWJsZU1hcCwgXCJTQ1JJUFRfRklMRVwiKS5kaXJuYW1lKCkpO1xuICAgIH1cblxuICAgIHRoaXMucmVnaXN0ZXJWYXJpYWJsZU1hcChTY29wZUhlbHBlci5nZXQodmFyaWFibGVNYXAsIFwiU0NSSVBUX0ZJTEVcIikudG9TdHJpbmcoKSwgdmFyaWFibGVNYXApO1xuICAgIHJldHVybiB0cnVlO1xuICB9XG5cbiAgcHVibGljIGFkZFN1YmRpcmVjdG9yeSh2YXJpYWJsZU1hcDogVmFyaWFibGVNYXAsIHNvdXJjZURpcjogYW55LCBiaW5hcnlEaXI/OiBhbnkpIHtcbiAgICBjb25zdCBuZXdWYXJpYWJsZU1hcCA9IGNyZWF0ZVZhcmlhYmxlTWFwRm9yRGlyZWN0b3J5KHZhcmlhYmxlTWFwLCBzb3VyY2VEaXIsIGJpbmFyeURpcik7XG4gICAgaWYgKG5ld1ZhcmlhYmxlTWFwKSB7XG4gICAgICB0aGlzLl9zdWJkaXJMaXN0LnB1c2gobmV3VmFyaWFibGVNYXApO1xuICAgIH1cbiAgfVxuXG4gIHB1YmxpYyBmaW5kU2NyaXB0RnVuY3Rpb24obmFtZTogc3RyaW5nKTogRnVuY3Rpb24gfCB1bmRlZmluZWQge1xuICAgIHJldHVybiB0aGlzW0JVSUxUSU5fU0NSSVBUU11bbmFtZV07XG4gIH1cblxuICBwdWJsaWMgYXN5bmMgZG9TdWJkaXJlY3RvcnkoKSB7XG4gICAgY29uc3QgY29udGV4dExpc3QgPSBuZXcgQXJyYXk8TG9jYWxNYWtlQ29udGV4dD4oKTtcblxuICAgIGZvciAoOzspIHtcbiAgICAgIGNvbnN0IHZhcmlhYmxlTWFwID0gdGhpcy5fc3ViZGlyTGlzdC5zaGlmdCgpO1xuICAgICAgaWYgKCF2YXJpYWJsZU1hcClcbiAgICAgICAgYnJlYWs7XG5cbiAgICAgIGlmICghYXdhaXQgdGhpcy5wcmVwZWFyU2NyaXB0RmlsZSh2YXJpYWJsZU1hcCkpXG4gICAgICAgIGNvbnRpbnVlO1xuXG4gICAgICBjb25zdCBjdHggPSBuZXcgTG9jYWxNYWtlQ29udGV4dCh2YXJpYWJsZU1hcCwgdGhpcyk7XG4gICAgICBjb250ZXh0TGlzdC5wdXNoKGN0eCk7XG4gICAgICBjb25zdCBtayA9IFVzZXJNYWtlQ29udGV4dC5jcmVhdGUoY3R4LCB2YXJpYWJsZU1hcCk7XG5cbiAgICAgIGNvbnN0IGN3ZFNhdmUgPSBwcm9jZXNzLmN3ZCgpO1xuICAgICAgcHJvY2Vzcy5jaGRpcihtay5TQ1JJUFRfRElSLnRvU3RyaW5nKCkpO1xuICAgICAgYXdhaXQgcGVyZm9ybUNvbnRleHQobWspO1xuICAgICAgcHJvY2Vzcy5jaGRpcihjd2RTYXZlKTtcbiAgICB9XG5cbiAgICBmb3IgKGNvbnN0IGN0eCBvZiBjb250ZXh0TGlzdCkge1xuICAgICAgZm9yIChjb25zdCBbbmFtZSwgdGFyZ2V0XSBvZiBjdHgudGFyZ2V0cylcbiAgICAgICAgdGhpc1tUQVJHRVRTXS5zZXQobmFtZSwgdGFyZ2V0KTtcbiAgICAgIGZvciAoY29uc3QgaXRlciBvZiBjdHguc2NyaXB0Q29sbGVjdGlvbi5FTlRSSUVTKVxuICAgICAgICB0aGlzW0NVU1RPTV9TQ1JJUFRTXS5hZGQoaXRlciwgaXRlci5OQU1FKTtcbiAgICAgIHRoaXMuX2luc3RhbGxMaXN0LnB1c2goLi4uY3R4Lmluc3RhbGxMaXN0KTtcbiAgICB9XG5cbiAgICBmb3IgKGNvbnN0IGN0eCBvZiBjb250ZXh0TGlzdCkge1xuICAgICAgZm9yIChjb25zdCBbbmFtZSwgcG9zdFRhcmdldF0gb2YgY3R4LnBvc3RUYXJnZXRzKSB7XG4gICAgICAgIGNvbnN0IHRhcmdldCA9IHRoaXNbVEFSR0VUU10uZ2V0KG5hbWUpO1xuICAgICAgICBpZiAoIXRhcmdldClcbiAgICAgICAgICB0aHJvdyBuZXcgRXJyb3IoYFRoZXJlIGlzIG5vIFRhcmdldCBuYW1lZCAke25hbWV9YCk7XG4gICAgICAgIHRhcmdldC5wb3N0VXBkYXRlKHBvc3RUYXJnZXQpO1xuICAgICAgfVxuICAgICAgZm9yIChjb25zdCBbbmFtZSwgcG9zdFNjcmlwdF0gb2YgY3R4LnBvc3RTY3JpcHRzKSB7XG4gICAgICAgIGNvbnN0IHNjcmlwdCA9IHRoaXNbQ1VTVE9NX1NDUklQVFNdLmdldChuYW1lKTtcbiAgICAgICAgaWYgKCFzY3JpcHQpXG4gICAgICAgICAgdGhyb3cgbmV3IEVycm9yKGBUaGVyZSBpcyBubyBDdXN0b21TY3JpcHQgbmFtZWQgJHtuYW1lfWApO1xuICAgICAgICBzY3JpcHQucG9zdFVwZGF0ZShwb3N0U2NyaXB0KTtcbiAgICAgIH1cbiAgICB9XG4gIH1cblxuICBwdWJsaWMgY3JlYXRlR29hbHMoc2NvcGU6IFN5c3RlbVNjb3BlKTogR29hbENvbGxlY3Rpb24ge1xuICAgIGNvbnN0IGdvYWxMaXN0ID0gbmV3IEdvYWxDb2xsZWN0aW9uO1xuICAgIGZvciAoY29uc3Qgc2NyaXB0IG9mIHRoaXNbQ1VTVE9NX1NDUklQVFNdLkVOVFJJRVMpIHsgICBcbiAgICAgIGNvbnN0IGRlcGVuZHMgPSBbXTtcblxuICAgICAgbGV0IHNjcmlwdE9iajogQWJzb2x1dGVQYXRoIHwgRnVuY3Rpb247XG4gICAgICBpZiAodHlwZW9mIHNjcmlwdC5zY3JpcHRNb2R1bGUgPT09IFwic3RyaW5nXCIpIHtcbiAgICAgICAgY29uc3QgZnVuYyA9IHRoaXMuZmluZFNjcmlwdEZ1bmN0aW9uKHNjcmlwdC5zY3JpcHRNb2R1bGUpO1xuICAgICAgICBzY3JpcHRPYmogPSBmdW5jID8gZnVuYyA6IHNjcmlwdC5zb3VyY2VEaXIucmVzb2x2ZShzY3JpcHQuc2NyaXB0TW9kdWxlKTtcbiAgICAgIH1cbiAgICAgIGVsc2Uge1xuICAgICAgICBkZXBlbmRzLnB1c2goc2NyaXB0LnNjcmlwdE1vZHVsZS50b1BhdGgoKSk7XG4gICAgICAgIHNjcmlwdE9iaiA9IHNjcmlwdC5zY3JpcHRNb2R1bGU7XG4gICAgICB9XG5cbiAgICAgIGlmIChzY3JpcHQuSU5QVVQpIHtcbiAgICAgICAgZGVwZW5kcy5wdXNoKHNjcmlwdC5JTlBVVC50b1BhdGgoKSk7XG4gICAgICB9XG5cbiAgICAgIGNvbnN0IG1zZyA9IFwiXFx4MWJbMzZtXCIgKyBcIkdlbmVyYXRpbmcgXCIgKyBzY3JpcHQuYmluYXJ5RGlyLnJlbGF0aXZlKHNjcmlwdC5PVVRQVVQpICsgXCJcXHgxYlswbVwiO1xuICAgICAgY29uc3QgZ2UgPSBuZXcgR29hbFRhcmdldChzY3JpcHQuTkFNRSk7XG4gICAgICBnZS5tZXNzYWdlID0gbXNnO1xuICAgICAgZ2Uub3V0cHV0ID0gc2NyaXB0Lk9VVFBVVDtcbiAgICAgIGdlLmFkZERlcGVuZGVuY3koLi4uZGVwZW5kcyk7XG4gICAgICBnZS5hZGRUYXNrKG5ldyBFeGVjU2NyaXB0VGFzayhzY3JpcHQudmFyaWFibGVNYXAsIHNjcmlwdE9iaikpO1xuICAgICAgZ29hbExpc3QuYWRkVGFyZ2V0KGdlKTtcbiAgICB9XG5cbiAgICBjb25zdCBvYmplY3RGaWxlcyA9IG5ldyBNYXA8U291cmNlRmlsZSwgQWJzb2x1dGVQYXRoPigpO1xuICAgIGZvciAoY29uc3QgdGFyZ2V0IG9mIHRoaXNbVEFSR0VUU10uRU5UUklFUy52YWx1ZXMoKSkge1xuICAgICAgZm9yIChjb25zdCBpdCBvZiB0YXJnZXQuZ2V0U291cmNlRmlsZXMoKSkge1xuICAgICAgICBpZiAoIWl0LkxBTkdVQUdFKVxuICAgICAgICAgIGNvbnRpbnVlO1xuICAgICAgICBjb25zdCByZmlsZTEgPSB0YXJnZXQuYmluYXJ5RGlyLnJlbGF0aXZlKGl0LkZJTEUpO1xuICAgICAgICBjb25zdCByZmlsZTIgPSAgdGFyZ2V0LnNvdXJjZURpci5yZWxhdGl2ZShpdC5GSUxFKTtcbiAgICAgICAgY29uc3QgcmZpbGUgPSAocmZpbGUyLmxlbmd0aCA8IHJmaWxlMS5sZW5ndGggPyByZmlsZTIgOiByZmlsZTEpLnJlcGxhY2UoXCIuLi9cIiwgXCJfXy9cIik7XG4gICAgICAgIGNvbnN0IG9maWxlID0gIHRhcmdldC5iaW5hcnlEaXIuam9pbihcIk1ha2VGaWxlc1wiLCB0YXJnZXQudGFyZ2V0TmFtZSArIFwiLmRpclwiLCAgcmZpbGUgKyBcIi5vYmpcIik7XG4gICAgICAgIG9iamVjdEZpbGVzLnNldChpdCwgb2ZpbGUpO1xuICAgICAgfVxuICAgIH1cblxuICAgIGZvciAoY29uc3QgW25hbWUsIHRhcmdldF0gb2YgdGhpc1tUQVJHRVRTXS5FTlRSSUVTKSB7XG4gICAgICBjb25zdCBkZXBlbmRzID0gW107XG4gICAgICBmb3IgKGNvbnN0IHMgb2YgdGFyZ2V0LmdldFRhcmdldE9iamVjdHMoKSkge1xuICAgICAgICBjb25zdCB0ID0gdGhpc1tUQVJHRVRTXS5nZXQocy50YXJnZXROYW1lKTtcbiAgICAgICAgZm9yIChjb25zdCBmIG9mIHQuZ2V0U291cmNlRmlsZXMoKSkge1xuICAgICAgICAgIGNvbnN0IG8gPSBvYmplY3RGaWxlcy5nZXQoZik7XG4gICAgICAgICAgbyAmJiBkZXBlbmRzLnB1c2goby50b1N0cmluZygpKTtcbiAgICAgICAgfVxuICAgICAgfVxuICBcbiAgICAgIGNvbnN0IGhlYWRlcnMgPSB0aGlzW1RBUkdFVFNdLmFsbEhlYWRlcnNPZih0YXJnZXQpO1xuICAgICAgZm9yIChjb25zdCBzIG9mIHRhcmdldC5nZXRTb3VyY2VGaWxlcygpKSB7XG4gICAgICAgIGlmIChzLkhFQURFUl9GSUxFX09OTFkpXG4gICAgICAgICAgY29udGludWU7XG5cbiAgICAgICAgY29uc3QgbyA9IG9iamVjdEZpbGVzLmdldChzKTtcbiAgICAgICAgaWYgKCFvKVxuICAgICAgICAgIHRocm93IG5ldyBFcnJvcihgT0JKRUNUX0ZJTEUgaXMgbnVsbGApO1xuXG4gICAgICAgIGZzLm1rZGlyU3luYyhvLmRpcm5hbWUoKS50b1N0cmluZygpLCB7IHJlY3Vyc2l2ZTogdHJ1ZSB9KTtcbiAgXG4gICAgICAgIGNvbnN0IHJlbGF0aXZlT2JqZWN0ID0gdGFyZ2V0LmJpbmFyeURpci5yZWxhdGl2ZShvKTtcbiAgICAgICAgY29uc3QgcmVsYXRpdmVCaW5hcnlEaXIgPSBzY29wZS5QUk9KRUNUX0JJTkFSWV9ESVIucmVsYXRpdmUodGFyZ2V0LmJpbmFyeURpcik7XG4gICAgICAgIGNvbnN0IG1zZyA9IFwiXFx4MWJbMzJtXCIgKyBgQnVpbGRpbmcgJHtzLkxBTkdVQUdFfSBvYmplY3QgJHtyZWxhdGl2ZUJpbmFyeURpcn0vJHtyZWxhdGl2ZU9iamVjdH1gICsgXCJcXHgxYlswbVwiO1xuICBcbiAgICAgICAgY29uc3QgZGVmaW5pdGlvbnMgPSBbXG4gICAgICAgICAgLi4udGhpc1tUQVJHRVRTXS5hbGxEZWZpbml0aW9uc09mKHRhcmdldCksXG4gICAgICAgICAgLi4ucy5ERUZJTkVTLFxuICAgICAgICBdO1xuXG4gICAgICAgIGNvbnN0IGFyZ3M6IHN0cmluZ1tdID0gW107XG4gICAgICAgIGFyZ3MucHVzaCguLi5kZWZpbml0aW9ucy5tYXAoaSA9PiBcIi1EXCIgKyBpKSk7XG4gICAgICAgIGFyZ3MucHVzaCguLi50aGlzW1RBUkdFVFNdLmFsbEluY2x1ZGVzT2YodGFyZ2V0KS5tYXAoaSA9PiBcIi1JXCIgKyBpKSk7XG4gICAgICAgIGFyZ3MucHVzaCguLi50aGlzW1RBUkdFVFNdLmFsbENvbXBpbGVPcHRpb25zT2YodGFyZ2V0KSk7XG4gICAgICAgIGlmICh0YXJnZXQucG9zaXRpb25JbmRlcGVuZGVudENvZGUpXG4gICAgICAgICAgYXJncy5wdXNoKFwiLWZQSUNcIik7XG4gICAgICAgIGFyZ3MucHVzaCguLi5zLkNPTVBJTEVfRkxBR1MuZmxhdCgpKTtcbiAgICAgICAgYXJncy5wdXNoKFwiLW9cIiwgcmVsYXRpdmVPYmplY3QpO1xuICAgICAgICBhcmdzLnB1c2goXCItY1wiLCBzLkZJTEUudG9TdHJpbmcoKSk7XG4gIFxuICAgICAgICBjb25zdCBvdXRwdXQgPSBBYnNvbHV0ZVBhdGguY3JlYXRlKHRhcmdldC5iaW5hcnlEaXIuam9pbihyZWxhdGl2ZU9iamVjdCkpO1xuICAgICAgICBkZXBlbmRzLnB1c2gob3V0cHV0LnRvU3RyaW5nKCkpO1xuXG4gICAgICAgIGNvbnN0IGdlID0gbmV3IEdvYWxUYXJnZXQ7XG4gICAgICAgIGdlLm1lc3NhZ2UgPSBtc2c7XG4gICAgICAgIGdlLm91dHB1dCA9IG91dHB1dDtcbiAgICAgICAgZ2UuYWRkRGVwZW5kZW5jeSguLi5oZWFkZXJzKTtcbiAgICAgICAgZ2UuYWRkRGVwZW5kZW5jeShzLkZJTEUudG9QYXRoKCkpO1xuICAgICAgICBnZS5hZGRUYXNrKG5ldyBTcGF3blN5bmNUYXNrKHMuQ09NUElMRV9QQVRILnRvU3RyaW5nKCksIGFyZ3MsIHRhcmdldC5iaW5hcnlEaXIudG9QYXRoKCkpKTtcbiAgICAgICAgZ29hbExpc3QuYWRkVGFyZ2V0KGdlKTtcbiAgICAgIH1cblxuICAgICAgY29uc3QgZ2VuZXJhbEdvYWwgPSBuZXcgR29hbFRhcmdldDtcbiAgICAgIGZvciAoY29uc3QgcGFyYW1zIG9mIHRhcmdldC5wcmVCdWlsZExpc3QpIHtcbiAgICAgICAgY29uc3QgZXhlY1N0cnVjdCA9IHJlc29sdmVUYXJnZXRDb21tYW5kKHRoaXMsIHBhcmFtcyk7XG4gICAgICAgIGdlbmVyYWxHb2FsLmFkZFRhc2sobmV3IFNwYXduU3luY1Rhc2soZXhlY1N0cnVjdC5jb21tYW5kLCBleGVjU3RydWN0LmFyZ3MsIHRhcmdldC5iaW5hcnlEaXIudG9TdHJpbmcoKSkpO1xuICAgICAgfVxuXG4gICAgICBjb25zdCBsaW5rT3B0aW9ucyA9IHRoaXNbVEFSR0VUU10uYWxsTGlua09wdGlvbnNPZih0YXJnZXQpO1xuICAgICAgaWYgKHRhcmdldC5pc09iamVjdExpYnJhcnkpIHtcbiAgICAgICAgY29uc3Qgb2JqcyA9IGRlcGVuZHMuZmlsdGVyKGkgPT4gaS5lbmRzV2l0aChcIi5vXCIpIHx8IGkuZW5kc1dpdGgoXCIub2JqXCIpKS5tYXAoaSA9PiB0YXJnZXQuZ2V0RmlsZURpcigpLnJlbGF0aXZlKGkpKTtcbiAgICAgICAgaWYgKG9ianMubGVuZ3RoKSB7XG4gICAgICAgICAgY29uc3QgYXJncyA9IFtcbiAgICAgICAgICAgIC4uLmxpbmtPcHRpb25zLFxuICAgICAgICAgICAgXCItclwiLFxuICAgICAgICAgICAgXCItb1wiLCB0YXJnZXQuZ2V0RmlsZU5hbWUoKSxcbiAgICAgICAgICAgIC4uLm9ianNcbiAgICAgICAgICBdO1xuICAgICAgICAgIGdlbmVyYWxHb2FsLm1lc3NhZ2UgPSBgTGlua2luZyAke3RhcmdldC5sYW5ndWFnZX0gb2JqZWN0IGxpYnJhcnkgJHt0YXJnZXQuZ2V0RmlsZU5hbWUoKX1gO1xuICAgICAgICAgIGdlbmVyYWxHb2FsLm91dHB1dCA9IHRhcmdldC5nZXRGaWxlKCk7XG4gICAgICAgICAgZ2VuZXJhbEdvYWwuYWRkRGVwZW5kZW5jeSguLi5kZXBlbmRzKTtcbiAgICAgICAgICBnZW5lcmFsR29hbC5hZGRUYXNrKG5ldyBTcGF3blN5bmNUYXNrKHNjb3BlLkxJTktFUiwgYXJncywgdGFyZ2V0LmdldEZpbGVEaXIoKS50b1N0cmluZygpKSk7XG4gICAgICAgIH1cbiAgICAgICAgZWxzZSB7XG4gICAgICAgICAgbG9nZ2VyLmluZm8oYE5vIG9iamVjdHMgZm9yIFwiJHt0YXJnZXQudGFyZ2V0TmFtZX1cImApO1xuICAgICAgICB9XG4gICAgICB9XG4gIFxuICAgICAgaWYgKHRhcmdldC5pc1N0YXRpY0xpYnJhcnkpIHtcbiAgICAgICAgY29uc3Qgb2JqcyA9IGRlcGVuZHMuZmlsdGVyKGkgPT4gaS5lbmRzV2l0aChcIi5vXCIpIHx8IGkuZW5kc1dpdGgoXCIub2JqXCIpKS5tYXAoaSA9PiB0YXJnZXQuZ2V0RmlsZURpcigpLnJlbGF0aXZlKGkpKTtcbiAgICAgICAgaWYgKG9ianMubGVuZ3RoKSB7XG4gICAgICAgICAgY29uc3QgYXJncyA9IFsgXCJyY1wiLCB0YXJnZXQuZ2V0RmlsZU5hbWUoKSAsIC4uLm9ianMgXTtcbiAgICAgICAgICBnZW5lcmFsR29hbC5tZXNzYWdlID0gYExpbmtpbmcgJHt0YXJnZXQubGFuZ3VhZ2V9IHN0YXRpYyBsaWJyYXJ5ICR7dGFyZ2V0LmdldEZpbGVOYW1lKCl9YDtcbiAgICAgICAgICBnZW5lcmFsR29hbC5vdXRwdXQgPSB0YXJnZXQuZ2V0RmlsZSgpO1xuICAgICAgICAgIGdlbmVyYWxHb2FsLmFkZERlcGVuZGVuY3koLi4uZGVwZW5kcyk7XG4gICAgICAgICAgZ2VuZXJhbEdvYWwuYWRkVGFzayhuZXcgU3Bhd25TeW5jVGFzayhzY29wZS5BUiwgYXJncywgdGFyZ2V0LmdldEZpbGVEaXIoKS50b1N0cmluZygpKSk7XG4gICAgICAgIH1cbiAgICAgICAgZWxzZSB7XG4gICAgICAgICAgbG9nZ2VyLmluZm8oYE5vIG9iamVjdHMgZm9yIFwiJHt0YXJnZXQudGFyZ2V0TmFtZX1cImApO1xuICAgICAgICB9XG4gICAgICB9XG4gIFxuICAgICAgaWYgKHRhcmdldC5pc1NoYXJlZExpYnJhcnkpIHtcbiAgICAgICAgdGhyb3cgbmV3IEVycm9yKFwiTm90IGltcGxlbWVudGVkXCIpO1xuICAgICAgfVxuXG4gICAgICBpZiAodGFyZ2V0LmlzRXhlY3V0YWJsZSkge1xuICAgICAgICBjb25zdCBvYmpzID0gZGVwZW5kcy5maWx0ZXIoaSA9PiBpLmVuZHNXaXRoKFwiLm9cIikgfHwgaS5lbmRzV2l0aChcIi5vYmpcIikpLm1hcChpID0+IHRhcmdldC5nZXRGaWxlRGlyKCkucmVsYXRpdmUoaSkpO1xuICAgICAgICBpZiAob2Jqcy5sZW5ndGgpIHtcbiAgICAgICAgICBjb25zdCBsaWJzID0gdGhpc1tUQVJHRVRTXS5hbGxMaWJyYXJpZXNPZih0YXJnZXQpO1xuICAgICAgICAgIGNvbnN0IGFyZ3MgPSBbXG4gICAgICAgICAgICAuLi50YXJnZXQuY29tcGlsZXJGbGFncyxcbiAgICAgICAgICAgIC4uLmxpbmtPcHRpb25zLFxuICAgICAgICAgICAgLi4ub2JqcyxcbiAgICAgICAgICAgIFwiLW9cIiwgdGFyZ2V0LmdldEZpbGVOYW1lKCksXG4gICAgICAgICAgICAuLi5saWJzLm1hcChpID0+IHRhcmdldC5nZXRGaWxlRGlyKCkucmVsYXRpdmUoaSkpLFxuICAgICAgICAgIF07XG5cbiAgICAgICAgICBnZW5lcmFsR29hbC5tZXNzYWdlID0gYExpbmtpbmcgJHt0YXJnZXQubGFuZ3VhZ2V9IGV4ZWN1dGFibGUgJHt0YXJnZXQuZ2V0RmlsZU5hbWUoKX1gO1xuICAgICAgICAgIGdlbmVyYWxHb2FsLm91dHB1dCA9IHRhcmdldC5nZXRGaWxlKCk7XG4gICAgICAgICAgZ2VuZXJhbEdvYWwuYWRkRGVwZW5kZW5jeSguLi5kZXBlbmRzKTtcbiAgICAgICAgICBnZW5lcmFsR29hbC5hZGREZXBlbmRlbmN5KC4uLmxpYnMpO1xuICAgICAgICAgIGdlbmVyYWxHb2FsLmFkZFRhc2sobmV3IFNwYXduU3luY1Rhc2sodGFyZ2V0LmNvbXBpbGVyUGF0aCwgYXJncywgdGFyZ2V0LmdldEZpbGVEaXIoKS50b1N0cmluZygpKSk7XG4gICAgICAgIH1cbiAgICAgICAgZWxzZSB7XG4gICAgICAgICAgbG9nZ2VyLmluZm8oYE5vIG9iamVjdHMgZm9yIFwiJHt0YXJnZXQudGFyZ2V0TmFtZX1cImApO1xuICAgICAgICB9XG4gICAgICB9XG5cbiAgICAgIGZvciAoY29uc3QgcGFyYW1zIG9mIHRhcmdldC5wb3N0QnVpbGRMaXN0KSB7XG4gICAgICAgIGNvbnN0IGV4ZWNTdHJ1Y3QgPSByZXNvbHZlVGFyZ2V0Q29tbWFuZCh0aGlzLCBwYXJhbXMpO1xuICAgICAgICBnZW5lcmFsR29hbC5hZGRUYXNrKG5ldyBTcGF3blN5bmNUYXNrKGV4ZWNTdHJ1Y3QuY29tbWFuZCwgZXhlY1N0cnVjdC5hcmdzLCB0YXJnZXQuYmluYXJ5RGlyLnRvU3RyaW5nKCkpKTtcbiAgICAgIH1cbiAgICAgIFxuICAgICAgZ29hbExpc3QuYWRkVGFyZ2V0KGdlbmVyYWxHb2FsKTtcblxuICAgICAgY29uc3Qgd29ya2VyID0gbmV3IEdvYWxUYXJnZXQobmFtZSk7XG4gICAgICB3b3JrZXIubWVzc2FnZSA9IGBCdWlsdCB0YXJnZXQgJHtuYW1lfWA7XG4gICAgICB3b3JrZXIuYWRkRGVwZW5kZW5jeSh0YXJnZXQuZ2V0RmlsZSgpLnRvUGF0aCgpKTtcbiAgICAgIGdvYWxMaXN0LmFkZFRhcmdldCh3b3JrZXIpO1xuICAgIH1cblxuICAgIGlmICh0aGlzLl9pbnN0YWxsTGlzdC5sZW5ndGgpIHtcbiAgICAgIGNvbnN0IHdvcmtlciA9IG5ldyBHb2FsVGFyZ2V0KElOU1RBTExfVEFSR0VUKTtcbiAgICAgIGNvbnN0IGZpbGVJbnN0YWxsYXRpb25UYXNrID0gbmV3IEZpbGVJbnN0YWxsYXRpb25UYXNrO1xuICAgICAgZm9yIChjb25zdCBpdGVyIG9mIHRoaXMuX2luc3RhbGxMaXN0KSB7XG4gICAgICAgIGxldCBzcmM6IEFic29sdXRlUGF0aCwgZGVzdDogQWJzb2x1dGVQYXRoO1xuICAgICAgICBpZiAoaXRlci5WQUxVRSBpbnN0YW5jZW9mIEFic29sdXRlUGF0aCkge1xuICAgICAgICAgIGlmIChzY29wZS5QUkVWRU5UX0lOU1RBTExfRklMRVMpXG4gICAgICAgICAgICBjb250aW51ZTtcbiAgICAgICAgICBzcmMgPSBpdGVyLlZBTFVFO1xuICAgICAgICAgIGNvbnN0IHJmaWxlID0gKGl0ZXIuQkFTRV9ESVIgYXMgYW55KS5yZWxhdGl2ZShpdGVyLlZBTFVFKTtcbiAgICAgICAgICBkZXN0ID0gaXRlci5ERVNUSU5BVElPTi5qb2luKHJmaWxlKTtcbiAgICAgICAgfVxuICAgICAgICBlbHNlIGlmIChpdGVyLlZBTFVFIGluc3RhbmNlb2YgVGFyZ2V0TmFtZSkge1xuICAgICAgICAgIGNvbnN0IHRhcmdldE5hbWUgPSBpdGVyLlZBTFVFLnRhcmdldE5hbWU7XG4gICAgICAgICAgY29uc3QgdGFyZ2V0ID0gdGhpc1tUQVJHRVRTXS5nZXQodGFyZ2V0TmFtZSk7XG4gICAgICAgICAgc3JjID0gdGFyZ2V0LmdldEZpbGUoKTtcbiAgICAgICAgICBkZXN0ID0gaXRlci5ERVNUSU5BVElPTi5qb2luKHRhcmdldC5nZXRGaWxlTmFtZSgpKTtcbiAgICAgICAgfVxuICAgICAgICBlbHNlIHtcbiAgICAgICAgICB0aHJvdyBuZXcgRXJyb3IoYENhbiBub3QgaW5zdGFsbCAke2l0ZXIuVkFMVUV9YClcbiAgICAgICAgfVxuICAgICAgICBpZiAoc2NvcGUuREVTVERJUilcbiAgICAgICAgICBkZXN0ID0gc2NvcGUuREVTVERJUi5qb2luKGRlc3QpO1xuICAgICAgICB3b3JrZXIuYWRkRGVwZW5kZW5jeShzcmMudG9QYXRoKCkpO1xuICAgICAgICBmaWxlSW5zdGFsbGF0aW9uVGFzay5hZGQoc3JjLCBkZXN0KTtcbiAgICAgIH1cbiAgICAgIHdvcmtlci5hZGRUYXNrKGZpbGVJbnN0YWxsYXRpb25UYXNrKTtcbiAgICAgIGdvYWxMaXN0LmFkZFRhcmdldCh3b3JrZXIpO1xuICAgIH1cblxuICAgIGNvbnN0IGdlID0gbmV3IEdvYWxUYXJnZXQoQUxMX1RBUkdFVCk7XG4gICAgT2JqZWN0LmtleXModGhpc1tUQVJHRVRTXS5FTlRSSUVTKS5mb3JFYWNoKGkgPT4gdm9pZCBnZS5hZGREZXBlbmRlbmN5KGkpKVxuICAgIGdvYWxMaXN0LmFkZFRhcmdldChnZSk7XG4gIFxuICAgIHJldHVybiBnb2FsTGlzdDtcbiAgfVxuXG4gIHB1YmxpYyB0b0pTT04oKSB7XG4gICAgcmV0dXJuIHtcbiAgICAgIFRBUkdFVFM6IHRoaXMuVEFSR0VUUyxcbiAgICAgIENVU1RPTV9TQ1JJUFRTOiB0aGlzW0NVU1RPTV9TQ1JJUFRTXSxcbiAgICAgIENBQ0hFOiB0aGlzLkNBQ0hFLFxuICAgICAgaW5zdGFsbExpc3Q6IHRoaXMuX2luc3RhbGxMaXN0LFxuICAgICAgcHJvY2Vzc2VkVmFyaWFibGVNYXA6IHRoaXMuX3Byb2Nlc3NlZFZhcmlhYmxlTWFwLFxuICAgICAgc3ViZGlyQWxpYXM6IHRoaXMuX3N1YmRpckFsaWFzLFxuICAgIH07XG4gIH1cbn07XG4iLCIvKlxuICogTUlUIExpY2Vuc2VcbiAqXG4gKiBDb3B5cmlnaHQgKGMpIDIwMjUgIFl1cmlpIFlha3ViaW4gKHl1cmlpLnlha3ViaW5AZ21haWwuY29tKVxuICpcbiAqIFBlcm1pc3Npb24gaXMgZ3JhbnRlZCB0byB1c2UsIGNvcHksIG1vZGlmeSwgYW5kIGRpc3RyaWJ1dGUgdGhpcyBzb2Z0d2FyZVxuICogdW5kZXIgdGhlIE1JVCBMaWNlbnNlLiBTZWUgTElDRU5TRSBmaWxlIGZvciBkZXRhaWxzLlxuICovXG5cbmltcG9ydCB7IEFic29sdXRlUGF0aCB9IGZyb20gXCJAL2NvcmUvQWJzb2x1dGVQYXRoXCI7XG5pbXBvcnQgeyBkZWVwQ29weSB9IGZyb20gXCJAL3V0aWxzL1ByaW1pdGl2ZXNcIjtcblxuaW50ZXJmYWNlIFZhcmlhYmxlRGVzY3JpcHRvciB7XG4gIHR5cGU/OiBzdHJpbmcgfCBzdHJpbmdbXTtcbiAgdmFsdWU/OiBhbnk7XG4gIGRlc2NyaXB0aW9uPzogc3RyaW5nO1xufTtcblxuaW50ZXJmYWNlIFZhcmlhYmxlRW50cnkge1xuICBuYW1lOiBzdHJpbmc7XG4gIHR5cGU6IHN0cmluZyB8IHN0cmluZ1tdO1xuICBncm91cDogc3RyaW5nO1xuICBkZXNjcmlwdGlvbjogc3RyaW5nO1xuICBpbml0VmFsdWU/OiBhbnk7XG4gIHZhbHVlPzogYW55O1xufTtcblxuZXhwb3J0IGludGVyZmFjZSBWYXJpYWJsZU1hcCB7XG4gIFsgbmFtZTogc3RyaW5nIF06IFZhcmlhYmxlRW50cnk7XG59O1xuXG5leHBvcnQgdHlwZSBWYXJpYW50ID0gYm9vbGVhbiB8IG51bWJlciB8IHN0cmluZyB8IGJvb2xlYW5bXSB8IG51bWJlcltdIHwgc3RyaW5nW107XG5leHBvcnQgdHlwZSBWYXJpYW50TWFwID0ge1xuICBbIG5hbWU6IHN0cmluZyBdOiBWYXJpYW50O1xufTtcblxuZXhwb3J0IG5hbWVzcGFjZSBTY29wZUhlbHBlciB7XG5cbmZ1bmN0aW9uIHRvRGVzY3JpcHRvcih2YWx1ZTogYW55KTogVmFyaWFibGVEZXNjcmlwdG9yIHtcbiAgaWYgKCF2YWx1ZSB8fCB0eXBlb2YgdmFsdWUgPT09IFwiYm9vbGVhblwiIHx8IHR5cGVvZiB2YWx1ZSA9PT0gXCJudW1iZXJcIiB8fCB0eXBlb2YgdmFsdWUgPT09IFwic3RyaW5nXCIgfHwgQXJyYXkuaXNBcnJheSh2YWx1ZSkpIHtcbiAgICByZXR1cm4geyB2YWx1ZSB9OyBcbiAgfVxuICByZXR1cm4gdmFsdWU7XG59XG5cbmV4cG9ydCBmdW5jdGlvbiBnZXRFbnRyeVZhbHVlKGVudHJ5OiBWYXJpYWJsZUVudHJ5KTogYW55IHtcbiAgLyppZiAodmFsdWUgPT09IHVuZGVmaW5lZClcbiAgICB0aHJvdyBuZXcgRXJyb3IoYFZhbHVlIG9mICR7bmFtZX0gY2Fubm90IGJlIG9idGFpbmVkIGJlY2F1c2UgaXQgaGFzIG5vdCBiZWVuIGVzdGFibGlzaGVkYCk7Ki9cbiAgcmV0dXJuIChlbnRyeS52YWx1ZSA9PT0gdW5kZWZpbmVkKSA/IGVudHJ5LmluaXRWYWx1ZSA6IGVudHJ5LnZhbHVlO1xufVxuXG5leHBvcnQgZnVuY3Rpb24gZ2V0KHZhcmlhYmxlTWFwOiBWYXJpYWJsZU1hcCwgbmFtZTogc3RyaW5nKTogYW55IHtcbiAgY29uc3QgZW50cnkgPSB2YXJpYWJsZU1hcFtuYW1lXTtcbiAgaWYgKGVudHJ5KVxuICAgIHJldHVybiBnZXRFbnRyeVZhbHVlKGVudHJ5KTtcbn1cblxuY29uc3QgbWFrZVZhbHVlTWFwOiBhbnkgPSB7XG4gIGFycmF5OiAodmFsdWU6IGFueSkgPT4ge1xuICAgIHJldHVybiBBcnJheS5pc0FycmF5KHZhbHVlKSA/IEFycmF5LmZyb20odmFsdWUpIDogdW5kZWZpbmVkO1xuICB9LFxuICBib29sZWFuOiAodmFsdWU6IGFueSkgPT4ge1xuICAgIHJldHVybiAodHlwZW9mIHZhbHVlID09PSBcImJvb2xlYW5cIikgPyB2YWx1ZSA6IHVuZGVmaW5lZDtcbiAgfSxcbiAgbnVtYmVyOiAodmFsdWU6IGFueSkgPT4ge1xuICAgIHJldHVybiAodHlwZW9mIHZhbHVlID09PSBcIm51bWJlclwiKSA/IHZhbHVlIDogdW5kZWZpbmVkO1xuICB9LFxuICBzdHJpbmc6ICh2YWx1ZTogYW55KSA9PiB7XG4gICAgcmV0dXJuICh0eXBlb2YgdmFsdWUgPT09IFwic3RyaW5nXCIpID8gdmFsdWUgOiB1bmRlZmluZWQ7XG4gIH0sXG4gIEFic29sdXRlUGF0aDogKHZhbHVlOiBhbnkpID0+IHtcbiAgICByZXR1cm4gQWJzb2x1dGVQYXRoLmNyZWF0ZSh2YWx1ZSk7XG4gIH0sXG4gIEZpbGVQYXRoOiAodmFsdWU6IGFueSkgPT4ge1xuICAgIHJldHVybiBBYnNvbHV0ZVBhdGguY3JlYXRlKHZhbHVlKTtcbiAgfSxcbiAgRGlyUGF0aDogKHZhbHVlOiBhbnkpID0+IHtcbiAgICByZXR1cm4gQWJzb2x1dGVQYXRoLmNyZWF0ZSh2YWx1ZSk7XG4gIH0sXG4gIG9iamVjdDogKHZhbHVlOiBhbnkpID0+IHtcbiAgICByZXR1cm4gdmFsdWU7XG4gIH0sXG59O1xuXG5jb25zdCB0b2pzb25WYWx1ZU1hcDogYW55ID0ge1xuICBhcnJheTogKHZhbHVlOiBhbnkpID0+IHtcbiAgICBjb25zdCByZXN1bHQgPSBbXTtcbiAgICBmb3IgKGNvbnN0IGl0ZXIgb2YgdmFsdWUpIHtcbiAgICAgIGlmIChpdGVyICYmIHR5cGVvZiBpdGVyID09PSBcIm9iamVjdFwiKVxuICAgICAgICByZXN1bHQucHVzaCh0eXBlb2YgaXRlci50b0pTT04gPT09IFwiZnVuY3Rpb25cIiA/IGl0ZXIudG9KU09OKCkgOiBkZWVwQ29weShpdGVyKSk7XG4gICAgICBlbHNlXG4gICAgICAgIHJlc3VsdC5wdXNoKGl0ZXIpO1xuICAgIH1cbiAgICByZXR1cm4gcmVzdWx0O1xuICB9LFxuICBib29sZWFuOiAodmFsdWU6IGFueSkgPT4ge1xuICAgIHJldHVybiB2YWx1ZTtcbiAgfSxcbiAgbnVtYmVyOiAodmFsdWU6IGFueSkgPT4ge1xuICAgIHJldHVybiB2YWx1ZTtcbiAgfSxcbiAgc3RyaW5nOiAodmFsdWU6IGFueSkgPT4ge1xuICAgIHJldHVybiB2YWx1ZTtcbiAgfSxcbiAgQWJzb2x1dGVQYXRoOiAodmFsdWU6IGFueSkgPT4ge1xuICAgIHJldHVybiB2YWx1ZS50b0pTT04oKTtcbiAgfSxcbiAgRmlsZVBhdGg6ICh2YWx1ZTogYW55KSA9PiB7XG4gICAgcmV0dXJuIHZhbHVlLnRvSlNPTigpO1xuICB9LFxuICBEaXJQYXRoOiAodmFsdWU6IGFueSkgPT4ge1xuICAgIHJldHVybiB2YWx1ZS50b0pTT04oKTtcbiAgfSxcbiAgb2JqZWN0OiAodmFsdWU6IGFueSkgPT4ge1xuICAgIHJldHVybiBkZWVwQ29weSh2YWx1ZSk7XG4gIH0sXG59O1xuXG5leHBvcnQgZnVuY3Rpb24gbWFrZUpTT05WYWx1ZShlbnRyeTogVmFyaWFibGVFbnRyeSwgdmFsdWU6IGFueSk6IGFueSB7XG4gIGlmIChBcnJheS5pc0FycmF5KGVudHJ5LnR5cGUpKVxuICAgIHJldHVybiB2YWx1ZTtcbiAgY29uc3QgZnVuYyA9IHRvanNvblZhbHVlTWFwW2VudHJ5LnR5cGVdO1xuICBpZiAoIWZ1bmMpXG4gICAgdGhyb3cgbmV3IEVycm9yKGBVbmtub3duIHR5cGUgXCIke2VudHJ5LnR5cGV9XCIgZm9yICR7ZW50cnkubmFtZX1gKTtcbiAgcmV0dXJuIGZ1bmModmFsdWUpO1xufVxuXG5leHBvcnQgZnVuY3Rpb24gbWFrZUVudHJ5VmFsdWUoZW50cnk6IFZhcmlhYmxlRW50cnksIHZhbHVlOiBhbnkpOiBhbnkge1xuICBsZXQgbmV3VmFsdWU6IGFueTtcbiAgaWYgKEFycmF5LmlzQXJyYXkoZW50cnkudHlwZSkpXG4gICAgbmV3VmFsdWUgPSBlbnRyeS50eXBlLmluY2x1ZGVzKHZhbHVlKSA/IHZhbHVlIDogdW5kZWZpbmVkO1xuICBlbHNlIHtcbiAgICBjb25zdCBmdW5jID0gbWFrZVZhbHVlTWFwW2VudHJ5LnR5cGVdO1xuICAgIGlmICghZnVuYylcbiAgICAgIHRocm93IG5ldyBFcnJvcihgVW5rbm93biB0eXBlIFwiJHtlbnRyeS50eXBlfVwiIGZvciAke2VudHJ5Lm5hbWV9YCk7XG4gICAgbmV3VmFsdWUgPSBmdW5jKHZhbHVlKTtcbiAgfVxuICBpZiAobmV3VmFsdWUgPT09IHVuZGVmaW5lZClcbiAgICB0aHJvdyBuZXcgVHlwZUVycm9yKGBBdHRlbXB0aW5nIHRvIHNldCBcIiR7dmFsdWV9XCIgdG8gJHtlbnRyeS5uYW1lfSBhcyBhbiAke2VudHJ5LnR5cGV9YCk7XG4gIHJldHVybiBuZXdWYWx1ZTtcbn1cblxuZXhwb3J0IGZ1bmN0aW9uIGNvcHlFbnRyeVZhbHVlKGVudHJ5OiBWYXJpYWJsZUVudHJ5LCB0cmFuc2Zvcm06IChlbnRyeTogVmFyaWFibGVFbnRyeSwgdmFsdWU6IGFueSkgPT4gYW55KSB7XG4gIGNvbnN0IHJlc3VsdDogVmFyaWFibGVFbnRyeSA9IHtcbiAgICBuYW1lOiBlbnRyeS5uYW1lLFxuICAgIHR5cGU6IGVudHJ5LnR5cGUsXG4gICAgZ3JvdXA6IGVudHJ5Lmdyb3VwLFxuICAgIGRlc2NyaXB0aW9uOiBlbnRyeS5kZXNjcmlwdGlvbixcbiAgfTtcbiAgaWYgKGVudHJ5LmluaXRWYWx1ZSAhPT0gdW5kZWZpbmVkKVxuICAgIHJlc3VsdC5pbml0VmFsdWUgPSB0cmFuc2Zvcm0oZW50cnksIGVudHJ5LmluaXRWYWx1ZSk7XG4gIGlmIChlbnRyeS52YWx1ZSAhPT0gdW5kZWZpbmVkKVxuICAgIHJlc3VsdC52YWx1ZSA9IHRyYW5zZm9ybShlbnRyeSwgZW50cnkudmFsdWUpO1xuICByZXR1cm4gcmVzdWx0O1xufVxuXG5leHBvcnQgZnVuY3Rpb24gZnJvbUpTT04odmFyaWFibGVNYXA6IFZhcmlhYmxlTWFwKTogVmFyaWFibGVNYXAge1xuICBjb25zdCByZXN1bHQ6IFZhcmlhYmxlTWFwID0ge307XG4gIGZvciAoY29uc3QgW2tleSwgdmFsXSBvZiBPYmplY3QuZW50cmllcyh2YXJpYWJsZU1hcCkpXG4gICAgcmVzdWx0W2tleV0gPSBjb3B5RW50cnlWYWx1ZSh2YWwsIG1ha2VFbnRyeVZhbHVlKTtcbiAgcmV0dXJuIHJlc3VsdDtcbn1cblxuZXhwb3J0IGZ1bmN0aW9uIHRvSlNPTih2YXJpYWJsZU1hcDogVmFyaWFibGVNYXApOiBWYXJpYWJsZU1hcCB7XG4gIGNvbnN0IHJlc3VsdDogVmFyaWFibGVNYXAgPSB7fTtcbiAgZm9yIChjb25zdCBba2V5LCB2YWxdIG9mIE9iamVjdC5lbnRyaWVzKHZhcmlhYmxlTWFwKSlcbiAgICByZXN1bHRba2V5XSA9IGNvcHlFbnRyeVZhbHVlKHZhbCwgbWFrZUpTT05WYWx1ZSk7XG4gIHJldHVybiByZXN1bHQ7XG59XG5cbmV4cG9ydCBmdW5jdGlvbiBzZXRFbnRyeVZhbHVlKGVudHJ5OiBWYXJpYWJsZUVudHJ5LCB2YWx1ZTogYW55KTogYW55IHtcbiAgZW50cnkudmFsdWUgPSBtYWtlRW50cnlWYWx1ZShlbnRyeSwgdmFsdWUpO1xufVxuXG5leHBvcnQgZnVuY3Rpb24gc2V0KHZhcmlhYmxlTWFwOiBWYXJpYWJsZU1hcCwgbmFtZTogc3RyaW5nLCB2YWx1ZTogYW55KTogdm9pZCB7XG4gIGNvbnN0IGVudHJ5ID0gdmFyaWFibGVNYXBbbmFtZV07XG4gIGlmICghZW50cnkpXG4gICAgdGhyb3cgbmV3IEVycm9yKGBWYXJpYWJsZSBcIiR7bmFtZX1cIiBkb2VzIG5vdCBleGlzdHNgKTtcbiAgc2V0RW50cnlWYWx1ZShlbnRyeSwgdmFsdWUpO1xufVxuXG5leHBvcnQgZnVuY3Rpb24gcmVzZXQodmFyaWFibGVNYXA6IFZhcmlhYmxlTWFwLCBuYW1lOiBzdHJpbmcpOiB2b2lkIHtcbiAgY29uc3QgZW50cnkgPSB2YXJpYWJsZU1hcFtuYW1lXTtcbiAgaWYgKCFlbnRyeSlcbiAgICB0aHJvdyBuZXcgRXJyb3IoYFZhcmlhYmxlIFwiJHtuYW1lfVwiIGRvZXMgbm90IGV4aXN0c2ApO1xuICBlbnRyeS52YWx1ZSA9IHVuZGVmaW5lZDtcbn1cblxuZXhwb3J0IGZ1bmN0aW9uIGRlZmluZVZhcmlhYmxlKG1hcDogVmFyaWFibGVNYXAsIGdyb3VwOiBzdHJpbmcsIG5hbWU6IHN0cmluZywgZGVzY3JpcHRvcjogVmFyaWFibGVEZXNjcmlwdG9yKSB7XG4gIGxldCBkZWZpbmVFbnRyeSA9IG1hcFtuYW1lXTtcbiAgbGV0IGlzVmFsaWRWYWx1ZSA9ICh2YWx1ZTogYW55KSA9PiB0cnVlO1xuICBpZiAoIWRlZmluZUVudHJ5KSB7XG4gICAgZGVmaW5lRW50cnkgPSB7XG4gICAgICBuYW1lLFxuICAgICAgdHlwZTogXCJcIiwgZ3JvdXAsIHZhbHVlOiB1bmRlZmluZWQsICBpbml0VmFsdWU6IHVuZGVmaW5lZCwgZGVzY3JpcHRpb246IFwiXCIsXG4gICAgfTtcbiAgICBtYXBbbmFtZV0gPSBkZWZpbmVFbnRyeTtcbiAgfVxuICBlbHNlIGlmIChncm91cCAhPT0gZGVmaW5lRW50cnkuZ3JvdXApIHtcbiAgICBpZiAoZGVmaW5lRW50cnkuZ3JvdXApXG4gICAgICB0aHJvdyBuZXcgRXJyb3IoYEF0dGVtcHRpbmcgdG8gcmVjcmVhdGUgXCIke25hbWV9XCIgdmFyaWFibGUgd2l0aCBcIiR7ZGVmaW5lRW50cnkuZ3JvdXB9XCIgZ3JvdXAgaW4gYW5vdGhlciBcIiR7Z3JvdXB9XCJgKTtcbiAgICBkZWZpbmVFbnRyeS5ncm91cCA9IGdyb3VwO1xuICB9XG5cbiAgZGVmaW5lRW50cnkudHlwZSA9IGRlc2NyaXB0b3IudHlwZSB8fCBkZWZpbmVFbnRyeS50eXBlO1xuICBkZWZpbmVFbnRyeS5kZXNjcmlwdGlvbiA9IGRlc2NyaXB0b3IuZGVzY3JpcHRpb24gfHwgZGVmaW5lRW50cnkuZGVzY3JpcHRpb247XG5cbiAgbGV0IHR5cGU6IHN0cmluZyB8IHN0cmluZ1tdO1xuICBpZiAoZGVmaW5lRW50cnkudHlwZSlcbiAgICB0eXBlID0gZGVmaW5lRW50cnkudHlwZTtcbiAgZWxzZSBpZiAoQXJyYXkuaXNBcnJheShkZXNjcmlwdG9yLnZhbHVlKSlcbiAgICB0eXBlID0gXCJhcnJheVwiO1xuICBlbHNlIGlmIChkZXNjcmlwdG9yLnZhbHVlIGluc3RhbmNlb2YgQWJzb2x1dGVQYXRoKVxuICAgIHR5cGUgPSBcIkFic29sdXRlUGF0aFwiO1xuICBlbHNlXG4gICAgdHlwZSA9IHR5cGVvZiBkZXNjcmlwdG9yLnZhbHVlO1xuXG4gIGlmIChBcnJheS5pc0FycmF5KHR5cGUpKSB7XG4gICAgY29uc3QgZW51bUxpc3QgPSB0eXBlO1xuICAgIGxldCBpdGVtVHlwZTtcbiAgICBmb3IgKGNvbnN0IGl0ZXIgb2YgZW51bUxpc3QpIHtcbiAgICAgIGNvbnN0IGl0ID0gdHlwZW9mIGl0ZXI7XG4gICAgICBpZiAoIWl0ZW1UeXBlKVxuICAgICAgICBpdGVtVHlwZSA9IGl0O1xuICAgICAgZWxzZSBpZiAoaXRlbVR5cGUgIT09IGl0KVxuICAgICAgICB0aHJvdyBuZXcgRXJyb3IoYEFsbCBlbGVtZW50cyBmb3IgJHtuYW1lfSBtdXN0IGJlIG9mIHRoZSBzYW1lIHR5cGVgKTtcbiAgICB9XG4gICAgaWYgKGl0ZW1UeXBlICE9PSBcImJvb2xlYW5cIiAmJiBpdGVtVHlwZSAhPT0gXCJudW1iZXJcIiAmJiBpdGVtVHlwZSAhPT0gXCJzdHJpbmdcIilcbiAgICAgIHRocm93IG5ldyBFcnJvcihgRW51bSAke25hbWV9IG5vdCBzdXBwb3J0ICR7aXRlbVR5cGV9IHR5cGVgKTtcbiAgICBpc1ZhbGlkVmFsdWUgPSAodmFsdWU6IGFueSkgPT4gZW51bUxpc3QuaW5jbHVkZXModmFsdWUpO1xuICB9XG4gIGVsc2UgaWYgKHR5cGUgPT09IFwiYm9vbGVhblwiKSB7XG4gICAgaXNWYWxpZFZhbHVlID0gKHZhbHVlOiBhbnkpID0+IHR5cGVvZiB2YWx1ZSA9PT0gXCJib29sZWFuXCI7XG4gIH1cbiAgZWxzZSBpZiAodHlwZSA9PT0gXCJudW1iZXJcIikge1xuICAgIGlzVmFsaWRWYWx1ZSA9ICh2YWx1ZTogYW55KSA9PiB0eXBlb2YgdmFsdWUgPT09IFwibnVtYmVyXCI7XG4gIH1cbiAgZWxzZSBpZiAodHlwZSA9PT0gXCJzdHJpbmdcIikge1xuICAgIGlzVmFsaWRWYWx1ZSA9ICh2YWx1ZTogYW55KSA9PiB0eXBlb2YgdmFsdWUgPT09IFwic3RyaW5nXCI7XG4gIH1cbiAgZWxzZSBpZiAodHlwZSA9PT0gXCJhcnJheVwiKSB7XG4gICAgaXNWYWxpZFZhbHVlID0gQXJyYXkuaXNBcnJheTtcbiAgfVxuICBlbHNlIGlmICh0eXBlID09PSBcIkFic29sdXRlUGF0aFwiIHx8IHR5cGUgPT09IFwiRmlsZVBhdGhcIiB8fCB0eXBlID09PSBcIkRpclBhdGhcIikge1xuICAgIGlzVmFsaWRWYWx1ZSA9ICh2YWx1ZTogYW55KSA9PiAhIUFic29sdXRlUGF0aC5jcmVhdGUodmFsdWUpO1xuICB9XG4gIGVsc2UgaWYgKHR5cGUgIT09IFwib2JqZWN0XCIgJiYgdHlwZSAhPT0gXCJlbnVtXCIpIHtcbiAgICB0aHJvdyBuZXcgRXJyb3IoYFZhcmlhYmxlIFwiJHtuYW1lfVwiIGhhcyB3cm9uZyBcIiR7dHlwZX1cIiB0eXBlYCk7XG4gIH1cblxuICBpZiAoZGVzY3JpcHRvci52YWx1ZSA9PT0gdW5kZWZpbmVkKSB7XG4gICAgZGVmaW5lRW50cnkuaW5pdFZhbHVlID0gKHR5cGUgPT09IFwiYXJyYXlcIikgPyBbXSA6IHVuZGVmaW5lZDtcbiAgfVxuICBlbHNlIHtcbiAgICBpZiAoIWlzVmFsaWRWYWx1ZShkZXNjcmlwdG9yLnZhbHVlKSlcbiAgICAgICAgdGhyb3cgbmV3IFR5cGVFcnJvcihgQXR0ZW1wdGluZyB0byBzZXQgXCIke2Rlc2NyaXB0b3IudmFsdWV9XCIgdG8gJHtuYW1lfSBhcyBpbml0VmFsdWVgKTtcbiAgICBkZWZpbmVFbnRyeS5pbml0VmFsdWUgPSAodHlwZSA9PT0gXCJhcnJheVwiKSA/IEFycmF5LmZyb20oZGVzY3JpcHRvci52YWx1ZSkgOiBkZXNjcmlwdG9yLnZhbHVlO1xuICB9XG5cbiAgZGVmaW5lRW50cnkudHlwZSA9IHR5cGU7XG4gIGlmIChkZWZpbmVFbnRyeS5pbml0VmFsdWUgIT09IHVuZGVmaW5lZCkge1xuICAgIGRlZmluZUVudHJ5LmluaXRWYWx1ZSA9IG1ha2VFbnRyeVZhbHVlKGRlZmluZUVudHJ5LCBkZWZpbmVFbnRyeS5pbml0VmFsdWUpO1xuICB9XG4gIGlmIChkZWZpbmVFbnRyeS52YWx1ZSAhPT0gdW5kZWZpbmVkKSB7XG4gICAgZGVmaW5lRW50cnkudmFsdWUgPSBtYWtlRW50cnlWYWx1ZShkZWZpbmVFbnRyeSwgZGVmaW5lRW50cnkudmFsdWUpO1xuICB9XG59XG5cbmV4cG9ydCBmdW5jdGlvbiBjcmVhdGVQcm94eTxUPihtYXA6IFZhcmlhYmxlTWFwLCBvPzogYW55KTogVCB7XG4gIG8gPSBvIHx8IHt9O1xuICBjb25zdCBoYW5kbGVyOiBQcm94eUhhbmRsZXI8YW55PiA9IHtcbiAgICBnZXQodGFyZ2V0OiBWYXJpYWJsZU1hcCwga2V5OiBzdHJpbmcsIHJlY2VpdmVyOiBhbnkpIHtcbiAgICAgIGNvbnN0IGVudHJ5ID0gdGFyZ2V0W2tleV07XG4gICAgICBpZiAoZW50cnkpXG4gICAgICAgIHJldHVybiBnZXRFbnRyeVZhbHVlKGVudHJ5KTtcbiAgICAgIHJldHVybiBvW2tleV07XG4gICAgfSxcbiAgICBzZXQodGFyZ2V0OiBWYXJpYWJsZU1hcCwga2V5OiBzdHJpbmcsIHZhbHVlOiBhbnkpOiBib29sZWFuIHtcbiAgICAgIGNvbnN0IGVudHJ5ID0gdGFyZ2V0W2tleV07XG4gICAgICBpZiAoZW50cnkpXG4gICAgICAgIHNldEVudHJ5VmFsdWUoZW50cnksIHZhbHVlKTtcbiAgICAgIGVsc2VcbiAgICAgICAgZGVmaW5lVmFyaWFibGUodGFyZ2V0LCBcIlwiLCBrZXksIHRvRGVzY3JpcHRvcih2YWx1ZSkpO1xuICAgICAgcmV0dXJuIHRydWU7XG4gICAgfSxcbiAgICBoYXModGFyZ2V0OiBWYXJpYWJsZU1hcCwga2V5OiBzdHJpbmcpIHtcbiAgICAgIHJldHVybiB0YXJnZXQuaGFzT3duUHJvcGVydHkoa2V5KSB8fCAoa2V5IGluIHRhcmdldCk7XG4gICAgfSxcbiAgICBvd25LZXlzKHRhcmdldDogVmFyaWFibGVNYXApIHtcbiAgICAgIHJldHVybiBPYmplY3Qua2V5cyh0YXJnZXQpO1xuICAgIH0sXG4gICAgZGVsZXRlUHJvcGVydHkodGFyZ2V0OiBWYXJpYWJsZU1hcCwga2V5OiBzdHJpbmcpIHtcbiAgICAgIHRocm93IG5ldyBFcnJvcihgQ2Fubm90IGRlbGV0ZSAke2tleX0gdmFsdWVgKTtcbiAgICB9LFxuICB9O1xuICByZXR1cm4gbmV3IFByb3h5KG1hcCwgaGFuZGxlcik7XG59XG5cbmV4cG9ydCBmdW5jdGlvbiBjbG9uZVZhcmlhYmxlTWFwKG1hcDogVmFyaWFibGVNYXApIHtcbiAgY29uc3QgcmVzdWx0OiBWYXJpYWJsZU1hcCA9IHt9O1xuICBmb3IgKGNvbnN0IFsgbmFtZSwgZW50cnkgXSBvZiBPYmplY3QuZW50cmllcyhtYXApKSB7XG4gICAgZGVmaW5lVmFyaWFibGUocmVzdWx0LCBlbnRyeS5ncm91cCwgbmFtZSwge1xuICAgICAgdHlwZTogZW50cnkudHlwZSxcbiAgICAgIGRlc2NyaXB0aW9uOiBlbnRyeS5kZXNjcmlwdGlvbixcbiAgICAgIHZhbHVlOiBlbnRyeS5pbml0VmFsdWUsXG4gICAgfSk7XG4gICAgaWYgKGdldEVudHJ5VmFsdWUoZW50cnkpICE9PSB1bmRlZmluZWQpXG4gICAgICByZXN1bHRbbmFtZV0udmFsdWUgPSBnZXRFbnRyeVZhbHVlKGVudHJ5KTtcbiAgfVxuICByZXR1cm4gcmVzdWx0O1xufVxuXG5leHBvcnQgZnVuY3Rpb24gZXh0ZW5kVmFyaWFibGVNYXBCeVZhbHVlcyhtYXA6IFZhcmlhYmxlTWFwLCBncm91cDogc3RyaW5nLCB2YWx1ZXM6IFZhcmlhbnRNYXApIHtcbiAgZm9yIChjb25zdCBbbmFtZSwgdmFsdWVdIG9mIE9iamVjdC5lbnRyaWVzKHZhbHVlcykpIHtcbiAgICBkZWZpbmVWYXJpYWJsZShtYXAsIGdyb3VwLCBuYW1lLCB7IHZhbHVlIH0pO1xuICAgIG1hcFtuYW1lXS52YWx1ZSA9IHZhbHVlO1xuICB9XG59XG5cbmV4cG9ydCBmdW5jdGlvbiBkZWZpbmVWYXJpYWJsZXNJblZhcmlhYmxlTWFwKG1hcDogVmFyaWFibGVNYXAsIGdyb3VwOiBzdHJpbmcsIHZhcmlhYmxlczogYW55KSB7XG4gIGZvciAoY29uc3QgW25hbWUsIHZhbHVlXSBvZiBPYmplY3QuZW50cmllcyh2YXJpYWJsZXMpKSB7XG4gICAgY29uc3QgZGVzY3JpcHRvciA9IHZhbHVlICYmIHR5cGVvZiB2YWx1ZSA9PT0gXCJvYmplY3RcIiA/IHZhbHVlIDoge3ZhbHVlIH07XG4gICAgZGVmaW5lVmFyaWFibGUobWFwLCBncm91cCwgbmFtZSwgZGVzY3JpcHRvcik7XG4gIH1cbn1cblxuZXhwb3J0IGZ1bmN0aW9uIGdldFZhcmlhYmxlc0J5R3JvdXAobWFwOiBWYXJpYWJsZU1hcCwgZ3JvdXA/OiBzdHJpbmcpIHtcbiAgY29uc3QgcmVzdWx0OiBhbnkgPSB7fTtcbiAgZm9yIChjb25zdCBbIG5hbWUsIGVudHJ5IF0gb2YgT2JqZWN0LmVudHJpZXMobWFwKSkge1xuICAgIGlmIChncm91cCAhPT0gdW5kZWZpbmVkICYmIGVudHJ5Lmdyb3VwICYmIGVudHJ5Lmdyb3VwICE9PSBncm91cClcbiAgICAgIGNvbnRpbnVlO1xuICAgIHJlc3VsdFtuYW1lXSA9IHtcbiAgICAgIHR5cGU6IGVudHJ5LnR5cGUsXG4gICAgICBkZXNjcmlwdGlvbjogZW50cnkuZGVzY3JpcHRpb24sXG4gICAgICB2YWx1ZTogZ2V0RW50cnlWYWx1ZShlbnRyeSksXG4gICAgfTtcbiAgfVxuICByZXR1cm4gcmVzdWx0O1xufVxuXG5leHBvcnQgZnVuY3Rpb24gY3JlYXRlVmFyaWFibGVWYWx1ZXMobWFwOiBWYXJpYWJsZU1hcCwgZ3JvdXA/OiBzdHJpbmcpOiBhbnkge1xuICBjb25zdCByZXN1bHQ6IGFueSA9IHt9O1xuICBmb3IgKGNvbnN0IFsgbmFtZSwgZW50cnkgXSBvZiBPYmplY3QuZW50cmllcyhtYXApKSB7XG4gICAgaWYgKCFncm91cCB8fCBncm91cCA9PT0gZW50cnkuZ3JvdXApXG4gICAgICByZXN1bHRbbmFtZV0gPSBnZXRFbnRyeVZhbHVlKGVudHJ5KTtcbiAgfVxuICByZXR1cm4gcmVzdWx0O1xufVxuXG5leHBvcnQgZnVuY3Rpb24gbWVyZ2VWYXJpYWJsZXModGFyZ2V0OiBhbnksIHNvdXJjZTogYW55KTogb2JqZWN0IHtcbiAgaWYgKCF0YXJnZXQgfHwgdHlwZW9mIHRhcmdldCAhPT0gXCJvYmplY3RcIilcbiAgICB0aHJvdyBuZXcgRXJyb3IoYFRhcmdldCAke3RhcmdldH0gaXMgbm90IG9iamVjdGApO1xuICBpZiAoIXNvdXJjZSB8fCB0eXBlb2Ygc291cmNlICE9PSBcIm9iamVjdFwiKVxuICAgIHRocm93IG5ldyBFcnJvcihgU291cmNlICR7c291cmNlfSBpcyBub3Qgb2JqZWN0YCk7XG4gIGlmIChBcnJheS5pc0FycmF5KHRhcmdldCkpIHtcbiAgICBpZiAoIUFycmF5LmlzQXJyYXkoc291cmNlKSlcbiAgICAgIHRocm93IG5ldyBFcnJvcihgU291cmNlIGlzIG5vdCBhbiBhcnJheWApO1xuICAgIGZvciAoY29uc3QgaXRlciBvZiBzb3VyY2UpXG4gICAgICB0YXJnZXQucHVzaChpdGVyKTtcbiAgfVxuICBlbHNlIHtcbiAgICBmb3IgKGNvbnN0IFsga2V5LCB2YWwgXSBvZiBPYmplY3QuZW50cmllcyhzb3VyY2UpKSB7XG4gICAgICBpZiAoIU9iamVjdC5oYXNPd24odGFyZ2V0LCBrZXkpKSB7XG4gICAgICAgIHRhcmdldFtrZXldID0gdmFsO1xuICAgICAgfVxuICAgICAgZWxzZSBpZiAodGFyZ2V0W2tleV0gJiYgdHlwZW9mIHRhcmdldFtrZXldID09PSBcIm9iamVjdFwiKSB7XG4gICAgICAgIGlmICghdmFsIHx8IHR5cGVvZiB2YWwgIT09IFwib2JqZWN0XCIpXG4gICAgICAgICAgdGhyb3cgbmV3IEVycm9yKGBTb3VyY2UgJHtrZXl9IGhhcyAke3ZhbH0gd2hpY2ggaXMgbm90IGFuIG9iamVjdGApO1xuICAgICAgICBtZXJnZVZhcmlhYmxlcyh0YXJnZXRba2V5XSwgdmFsKTtcbiAgICAgIH1cbiAgICAgIGVsc2Uge1xuICAgICAgICB0aHJvdyBuZXcgRXJyb3IoYFNvdXJjZSAke2tleX0gaGFzICR7dmFsfSB3aGljaCBpcyBub3QgJHt0eXBlb2YgdGFyZ2V0W2tleV19YCk7XG4gICAgICB9XG4gICAgfVxuICB9XG4gIHJldHVybiB0YXJnZXQ7XG59XG5cbmV4cG9ydCBmdW5jdGlvbiBtZXJnZVZhcmlhYmxlTWFwKHRhcmdldDogVmFyaWFibGVNYXAsIHNvdXJjZTogYW55KTogVmFyaWFibGVNYXAge1xuICBmb3IgKGNvbnN0IFtuYW1lLCB2YWx1ZV0gb2YgT2JqZWN0LmVudHJpZXMoc291cmNlKSkge1xuICAgIGxldCBlbnRyeSA9IHRhcmdldFtuYW1lXTtcbiAgICBpZiAoIWVudHJ5KVxuICAgICAgZGVmaW5lVmFyaWFibGUodGFyZ2V0LCBcIlwiLCBuYW1lLCB7IHZhbHVlIH0pO1xuICAgIGVsc2Uge1xuICAgICAgbGV0IGRlc3QgPSBnZXRFbnRyeVZhbHVlKGVudHJ5KTtcbiAgICAgIHNldEVudHJ5VmFsdWUoZW50cnksIChkZXN0ICYmIHR5cGVvZiBkZXN0ID09PSBcIm9iamVjdFwiKSA/IG1lcmdlVmFyaWFibGVzKGRlc3QsIHZhbHVlKSA6IHZhbHVlKTtcbiAgICB9XG4gIH1cbiAgcmV0dXJuIHRhcmdldDtcbn1cblxufSAvLyBTY29wZUhlbHBlclxuIiwiLypcbiAqIE1JVCBMaWNlbnNlXG4gKlxuICogQ29weXJpZ2h0IChjKSAyMDI1ICBZdXJpaSBZYWt1YmluICh5dXJpaS55YWt1YmluQGdtYWlsLmNvbSlcbiAqXG4gKiBQZXJtaXNzaW9uIGlzIGdyYW50ZWQgdG8gdXNlLCBjb3B5LCBtb2RpZnksIGFuZCBkaXN0cmlidXRlIHRoaXMgc29mdHdhcmVcbiAqIHVuZGVyIHRoZSBNSVQgTGljZW5zZS4gU2VlIExJQ0VOU0UgZmlsZSBmb3IgZGV0YWlscy5cbiAqL1xuXG5pbXBvcnQgeyBDdXN0b21TY3JpcHQgfSBmcm9tIFwiQC9jb3JlL0N1c3RvbVNjcmlwdFwiO1xuXG5jb25zdCBNQVAgPSBTeW1ib2woXCJNQVBcIik7XG5jb25zdCBFTlRSSUVTID0gU3ltYm9sKFwiRU5UUklFU1wiKTtcblxuZXhwb3J0IGNsYXNzIFNjcmlwdENvbGxlY3Rpb24ge1xuICBwcml2YXRlIFtNQVBdOiB7IFtuYW1lOiBzdHJpbmddOiBDdXN0b21TY3JpcHQgfTtcbiAgcHJpdmF0ZSBbRU5UUklFU106IEN1c3RvbVNjcmlwdFtdO1xuXG4gIHByaXZhdGUgY29uc3RydWN0b3IoKSB7XG4gICAgdGhpc1tNQVBdID0ge307XG4gICAgdGhpc1tFTlRSSUVTXSA9IFtdO1xuICB9XG5cbiAgcHVibGljIHN0YXRpYyBjcmVhdGUoKSB7XG4gICAgcmV0dXJuIE9iamVjdC5zZWFsKG5ldyBTY3JpcHRDb2xsZWN0aW9uKTtcbiAgfVxuXG4gIHB1YmxpYyBnZXQgRU5UUklFUygpIHtcbiAgICByZXR1cm4gdGhpc1tFTlRSSUVTXTtcbiAgfVxuXG4gIHB1YmxpYyBnZXQobmFtZTogc3RyaW5nKTogQ3VzdG9tU2NyaXB0IHwgdW5kZWZpbmVkIHtcbiAgICByZXR1cm4gdGhpc1tNQVBdW25hbWVdO1xuICB9XG5cbiAgcHVibGljIGFkZCh0YXJnZXQ6IEN1c3RvbVNjcmlwdCwgbmFtZT86IHN0cmluZykge1xuICAgIGlmIChuYW1lKSB7XG4gICAgICBpZiAodGhpc1tNQVBdW25hbWVdKVxuICAgICAgICB0aHJvdyBuZXcgRXJyb3IoYFNjcmlwdCBcIiR7bmFtZX1cIiBleGlzdHNgKTtcbiAgICAgIHRoaXNbTUFQXVtuYW1lXSA9IHRhcmdldDtcbiAgICB9XG4gICAgdGhpc1tFTlRSSUVTXS5wdXNoKHRhcmdldCk7XG4gIH1cbiAgXG4gIHB1YmxpYyB0b0pTT04oKTogb2JqZWN0IHtcbiAgICByZXR1cm4gdGhpc1tFTlRSSUVTXTtcbiAgfVxufTtcbiIsIi8qXG4gKiBNSVQgTGljZW5zZVxuICpcbiAqIENvcHlyaWdodCAoYykgMjAyNSAgWXVyaWkgWWFrdWJpbiAoeXVyaWkueWFrdWJpbkBnbWFpbC5jb20pXG4gKlxuICogUGVybWlzc2lvbiBpcyBncmFudGVkIHRvIHVzZSwgY29weSwgbW9kaWZ5LCBhbmQgZGlzdHJpYnV0ZSB0aGlzIHNvZnR3YXJlXG4gKiB1bmRlciB0aGUgTUlUIExpY2Vuc2UuIFNlZSBMSUNFTlNFIGZpbGUgZm9yIGRldGFpbHMuXG4gKi9cblxuaW1wb3J0IHsgVmFyaWFibGVNYXAgfSBmcm9tIFwiQC9jb3JlL1Njb3BlXCI7XG5pbXBvcnQgeyBHZW5lcmFsQ29udGV4dCwgY3JlYXRlQ29udGV4dCB9IGZyb20gXCJAL2NvcmUvQmFzZUNvbnRleHRcIjtcblxuY29uc3QgU0NPUEUgPSBTeW1ib2woXCJTQ09QRVwiKTtcblxuZXhwb3J0IGNsYXNzIFNjcmlwdENvbnRleHQgZXh0ZW5kcyBHZW5lcmFsQ29udGV4dCB7XG4gIFtTQ09QRV06IFZhcmlhYmxlTWFwO1xuXG4gIGNvbnN0cnVjdG9yKHNjb3BlOiBWYXJpYWJsZU1hcCkge1xuICAgIHN1cGVyKHNjb3BlKTtcbiAgICB0aGlzW1NDT1BFXSA9IHNjb3BlO1xuICB9XG5cbiAgcHVibGljIHN0YXRpYyBjcmVhdGUodmFyaWFibGVNYXA6IFZhcmlhYmxlTWFwKSB7XG4gICAgcmV0dXJuIGNyZWF0ZUNvbnRleHQobmV3IFNjcmlwdENvbnRleHQodmFyaWFibGVNYXApKTtcbiAgfVxufTtcbiIsIi8qXG4gKiBNSVQgTGljZW5zZVxuICpcbiAqIENvcHlyaWdodCAoYykgMjAyNSAgWXVyaWkgWWFrdWJpbiAoeXVyaWkueWFrdWJpbkBnbWFpbC5jb20pXG4gKlxuICogUGVybWlzc2lvbiBpcyBncmFudGVkIHRvIHVzZSwgY29weSwgbW9kaWZ5LCBhbmQgZGlzdHJpYnV0ZSB0aGlzIHNvZnR3YXJlXG4gKiB1bmRlciB0aGUgTUlUIExpY2Vuc2UuIFNlZSBMSUNFTlNFIGZpbGUgZm9yIGRldGFpbHMuXG4gKi9cblxuZXhwb3J0IGludGVyZmFjZSBTaW1wbGVPYmplY3Qge1xuICB0eXBlOiBzdHJpbmc7XG4gIFtuYW1lOiBzdHJpbmddOiBudWxsIHwgYm9vbGVhbiB8IG51bWJlciB8IHN0cmluZyB8b2JqZWN0O1xufTtcblxudHlwZSBJbnN0YW5jZUNyZWF0ZUZ1bmN0aW9uID0gKG9iamVjdDogU2ltcGxlT2JqZWN0KSA9PiBhbnk7XG5cbmNvbnN0IF9jcmVhdG9ycyA9IG5ldyBNYXA8c3RyaW5nLCBJbnN0YW5jZUNyZWF0ZUZ1bmN0aW9uPigpO1xuXG5leHBvcnQgbmFtZXNwYWNlIFNpbXBsZU9iamVjdCB7XG5cbmV4cG9ydCBmdW5jdGlvbiByZWdpc3Rlckluc3RhbmNlQ3JlYXRvcihuYW1lOiBzdHJpbmcsIGZ1bmM6IEluc3RhbmNlQ3JlYXRlRnVuY3Rpb24pIHtcbiAgaWYgKCFuYW1lICYmIF9jcmVhdG9ycy5oYXMobmFtZSkpXG4gICAgdGhyb3cgbmV3IEVycm9yKGBOYW1lIFwiJHtuYW1lfVwiIGlzIHdyb25nIG9yIHJlZ2lzdGVyZWRgKTtcbiAgX2NyZWF0b3JzLnNldChuYW1lLCBmdW5jKTtcbn1cblxuZXhwb3J0IGZ1bmN0aW9uIGNyZWF0ZUluc3RhbmNlKG9iamVjdDogU2ltcGxlT2JqZWN0KTogYW55IHtcbiAgY29uc3QgZnVuYyA9IF9jcmVhdG9ycy5nZXQob2JqZWN0LnR5cGUpO1xuICBpZiAoIWZ1bmMpXG4gICAgdGhyb3cgbmV3IEVycm9yKGBVa25vd24gb2JqZWN0IHR5cGU6ICR7SlNPTi5zdHJpbmdpZnkob2JqZWN0KX1gKTtcbiAgcmV0dXJuIGZ1bmMob2JqZWN0KTtcbn1cblxufSAvLyBuYW1lc3BhY2UgU2ltcGxlT2JqZWN0XG4iLCIvKlxuICogTUlUIExpY2Vuc2VcbiAqXG4gKiBDb3B5cmlnaHQgKGMpIDIwMjUgIFl1cmlpIFlha3ViaW4gKHl1cmlpLnlha3ViaW5AZ21haWwuY29tKVxuICpcbiAqIFBlcm1pc3Npb24gaXMgZ3JhbnRlZCB0byB1c2UsIGNvcHksIG1vZGlmeSwgYW5kIGRpc3RyaWJ1dGUgdGhpcyBzb2Z0d2FyZVxuICogdW5kZXIgdGhlIE1JVCBMaWNlbnNlLiBTZWUgTElDRU5TRSBmaWxlIGZvciBkZXRhaWxzLlxuICovXG5cbmltcG9ydCB7IGVuc3VyZUJvb2xlYW4gfSBmcm9tIFwiQC91dGlscy9TdHJpY3RUeXBlXCI7XG5pbXBvcnQgeyBBYnNvbHV0ZVBhdGggfSBmcm9tIFwiQC9jb3JlL0Fic29sdXRlUGF0aFwiO1xuXG5jb25zdCBMQU5HVUFHRSAgICAgICAgID0gU3ltYm9sKFwiTEFOR1VBR0VcIik7XG5jb25zdCBIRUFERVJfRklMRV9PTkxZID0gU3ltYm9sKFwiSEVBREVSX0ZJTEVfT05MWVwiKTtcbmNvbnN0IERFRklORVMgICAgICAgICAgPSBTeW1ib2woXCJERUZJTkVTXCIpO1xuY29uc3QgQ09NUElMRV9QQVRIICAgICA9IFN5bWJvbChcIkNPTVBJTEVfUEFUSFwiKTtcbmNvbnN0IENPTVBJTEVfRkxBR1MgICAgPSBTeW1ib2woXCJDT01QSUxFX0ZMQUdTXCIpO1xuY29uc3QgRklMRSAgICAgICAgICAgICA9IFN5bWJvbChcIkZJTEVcIik7XG5jb25zdCBCQVNFX0RJUiAgICAgICAgID0gU3ltYm9sKFwiQkFTRV9ESVJcIik7XG5cbmV4cG9ydCBjbGFzcyBTb3VyY2VGaWxlIHtcbiAgcHJpdmF0ZSBbTEFOR1VBR0VdOiBzdHJpbmc7XG4gIHByaXZhdGUgW0hFQURFUl9GSUxFX09OTFldOiBib29sZWFuO1xuICBwcml2YXRlIFtGSUxFXTogQWJzb2x1dGVQYXRoO1xuICBwcml2YXRlIFtCQVNFX0RJUl06IEFic29sdXRlUGF0aDtcbiAgcHJpdmF0ZSBbREVGSU5FU106IHN0cmluZ1tdO1xuICBwcml2YXRlIFtDT01QSUxFX1BBVEhdOiBzdHJpbmc7XG4gIHByaXZhdGUgW0NPTVBJTEVfRkxBR1NdOiBBcnJheTxzdHJpbmd8c3RyaW5nW10+O1xuXG4gIHByaXZhdGUgY29uc3RydWN0b3IoZmlsZW5hbWU6IEFic29sdXRlUGF0aCwgYmFzZURpcjogQWJzb2x1dGVQYXRoLCBsYW5ndWFnZTogc3RyaW5nLCBjb21waWxlclBhdGg6IHN0cmluZywgY29tcGlsZUZsYWdzOiBBcnJheTxzdHJpbmcgfCBzdHJpbmdbXT4pIHtcbiAgICB0aGlzW0ZJTEVdID0gZmlsZW5hbWU7XG4gICAgdGhpc1tCQVNFX0RJUl0gPSBiYXNlRGlyO1xuICAgIHRoaXNbTEFOR1VBR0VdID0gbGFuZ3VhZ2U7XG4gICAgdGhpc1tIRUFERVJfRklMRV9PTkxZXSA9ICFsYW5ndWFnZTtcbiAgICB0aGlzW0RFRklORVNdID0gW107XG4gICAgdGhpc1tDT01QSUxFX1BBVEhdID0gY29tcGlsZXJQYXRoO1xuICAgIHRoaXNbQ09NUElMRV9GTEFHU10gPSBbIC4uLmNvbXBpbGVGbGFncyBdO1xuICB9XG5cbiAgcHVibGljIHN0YXRpYyBjcmVhdGUoZmlsZW5hbWU6IEFic29sdXRlUGF0aCwgYmFzZURpcjogQWJzb2x1dGVQYXRoLCBsYW5ndWFnZTogc3RyaW5nLCBjb21waWxlclBhdGg6IHN0cmluZywgY29tcGlsZUZsYWdzOiBBcnJheTxzdHJpbmcgfCBzdHJpbmdbXT4pIHtcbiAgICByZXR1cm4gT2JqZWN0LnNlYWwobmV3IFNvdXJjZUZpbGUoZmlsZW5hbWUsIGJhc2VEaXIsIGxhbmd1YWdlLCBjb21waWxlclBhdGgsIGNvbXBpbGVGbGFncykpO1xuICB9XG5cbiAgcHVibGljIGdldCBMQU5HVUFHRSgpOiBzdHJpbmcge1xuICAgIHJldHVybiB0aGlzW0xBTkdVQUdFXTtcbiAgfVxuXG4gIHB1YmxpYyBnZXQgSEVBREVSX0ZJTEVfT05MWSgpOiBib29sZWFuIHtcbiAgICByZXR1cm4gdGhpc1tIRUFERVJfRklMRV9PTkxZXTtcbiAgfVxuXG4gIHB1YmxpYyBzZXQgSEVBREVSX0ZJTEVfT05MWSh2YWx1ZTogYm9vbGVhbikge1xuICAgIHRoaXNbSEVBREVSX0ZJTEVfT05MWV0gPSBlbnN1cmVCb29sZWFuKHZhbHVlKTtcbiAgfVxuXG4gIHB1YmxpYyBnZXQgREVGSU5FUygpOiBzdHJpbmdbXSB7XG4gICAgcmV0dXJuIHRoaXNbREVGSU5FU11cbiAgfVxuXG4gIHB1YmxpYyBhZGREZWZpbml0aW9uKGRlZmluaXRpb246IHN0cmluZykge1xuICAgIHRoaXNbREVGSU5FU10ucHVzaChkZWZpbml0aW9uKTtcbiAgfVxuXG4gIHB1YmxpYyBnZXQgQ09NUElMRV9QQVRIKCk6IHN0cmluZyB7XG4gICAgcmV0dXJuIHRoaXNbQ09NUElMRV9QQVRIXTtcbiAgfVxuXG4gIHB1YmxpYyBnZXQgQ09NUElMRV9GTEFHUygpOiBBcnJheTxzdHJpbmcgfCBzdHJpbmdbXT4ge1xuICAgIHJldHVybiB0aGlzW0NPTVBJTEVfRkxBR1NdO1xuICB9XG5cbiAgcHVibGljIGdldCBGSUxFKCk6IEFic29sdXRlUGF0aCB7XG4gICAgcmV0dXJuIHRoaXNbRklMRV07XG4gIH1cblxuICBwdWJsaWMgZ2V0IEZJTEVfRElSKCk6IEFic29sdXRlUGF0aCB7XG4gICAgcmV0dXJuIHRoaXNbRklMRV0uZGlybmFtZSgpO1xuICB9XG5cbiAgcHVibGljIGdldCBGSUxFX05BTUUoKTogc3RyaW5nIHtcbiAgICByZXR1cm4gdGhpc1tGSUxFXS5iYXNlbmFtZSgpO1xuICB9XG5cbiAgcHVibGljIHRvSlNPTigpOiBvYmplY3Qge1xuICAgIHJldHVybiB7XG4gICAgICBMQU5HVUFHRTogdGhpc1tMQU5HVUFHRV0sXG4gICAgICBIRUFERVJfRklMRV9PTkxZOiB0aGlzW0hFQURFUl9GSUxFX09OTFldLFxuICAgICAgREVGSU5FUzogdGhpc1tERUZJTkVTXSxcbiAgICAgIENPTVBJTEVfUEFUSDogdGhpc1tDT01QSUxFX1BBVEhdLFxuICAgICAgQ09NUElMRV9GTEFHUzogdGhpc1tDT01QSUxFX0ZMQUdTXSxcbiAgICAgIEZJTEU6IHRoaXNbRklMRV0sXG4gICAgICBGSUxFX0RJUjogdGhpcy5GSUxFX0RJUixcbiAgICAgIEZJTEVfTkFNRTogdGhpcy5GSUxFX05BTUUsXG4gICAgICBCQVNFX0RJUjogdGhpc1tCQVNFX0RJUl0sXG4gICAgfTtcbiAgfVxufVxuIiwiLypcbiAqIE1JVCBMaWNlbnNlXG4gKlxuICogQ29weXJpZ2h0IChjKSAyMDI1ICBZdXJpaSBZYWt1YmluICh5dXJpaS55YWt1YmluQGdtYWlsLmNvbSlcbiAqXG4gKiBQZXJtaXNzaW9uIGlzIGdyYW50ZWQgdG8gdXNlLCBjb3B5LCBtb2RpZnksIGFuZCBkaXN0cmlidXRlIHRoaXMgc29mdHdhcmVcbiAqIHVuZGVyIHRoZSBNSVQgTGljZW5zZS4gU2VlIExJQ0VOU0UgZmlsZSBmb3IgZGV0YWlscy5cbiAqL1xuXG5pbXBvcnQgeyBzcGF3blN5bmMgfSBmcm9tIFwibm9kZTpjaGlsZF9wcm9jZXNzXCI7XG5cbmltcG9ydCB7IEludGVyZmFjZVRhc2sgfSBmcm9tIFwiQC9jb3JlL01ha2VJbnRlcmZhY2VzXCI7XG5pbXBvcnQgeyBTaW1wbGVPYmplY3QgfSBmcm9tIFwiQC9jb3JlL1NpbXBsZU9iamVjdFwiO1xuaW1wb3J0IHsgTG9nZ2VyIH0gZnJvbSBcIkAvbG9nZ2VyXCI7XG5cbmNvbnN0IGxvZ2dlciA9IExvZ2dlci5jcmVhdGUoaW1wb3J0Lm1ldGEudXJsKTtcblxuaW50ZXJmYWNlIE9wdGlvbnMge1xuICBjb21tYW5kOiBzdHJpbmc7XG4gIGFyZ3M6IHN0cmluZ1tdO1xuICBjd2Q6IHN0cmluZztcbn07XG5cbmV4cG9ydCBjbGFzcyBTcGF3blN5bmNUYXNrIGV4dGVuZHMgSW50ZXJmYWNlVGFzayB7XG4gIHByaXZhdGUgX2NvbW1hbmQ6IHN0cmluZztcbiAgcHJpdmF0ZSBfYXJnczogc3RyaW5nW107XG4gIHByaXZhdGUgX2N3ZDogc3RyaW5nO1xuXG4gIHB1YmxpYyBjb25zdHJ1Y3Rvcihjb21tYW5kOiBzdHJpbmcsIGFyZ3M6IHN0cmluZ1tdLCBjd2Q6IHN0cmluZykge1xuICAgIHN1cGVyKCk7XG5cbiAgICB0aGlzLl9jb21tYW5kID0gY29tbWFuZDtcbiAgICB0aGlzLl9hcmdzID0gYXJncztcbiAgICB0aGlzLl9jd2QgPSBjd2Q7XG4gIH1cblxuICBwdWJsaWMgZXhlY3V0ZSgpOiB2b2lkIHtcbiAgICBsb2dnZXIuZGVidWcoXCJzcGF3blN5bmNcIik7XG4gICAgbG9nZ2VyLmRlYnVnKFwiICBjb21tYW5kXCIsIHRoaXMuX2NvbW1hbmQpO1xuICAgIGxvZ2dlci5kZWJ1ZyhcIiAgY3dkXCIsIHRoaXMuX2N3ZCk7XG4gICAgZm9yIChsZXQgaSA9IDA7IGkgPCB0aGlzLl9hcmdzLmxlbmd0aDsgaSsrKVxuICAgICAgbG9nZ2VyLmRlYnVnKGAgIGFyZ3NbJHtpfV1gLCB0aGlzLl9hcmdzW2ldKTtcblxuICAgIGNvbnN0IHJlc3VsdCA9IHNwYXduU3luYyh0aGlzLl9jb21tYW5kLCB0aGlzLl9hcmdzLCB7IGN3ZDogdGhpcy5fY3dkLCBlbmNvZGluZzogXCJ1dGYtOFwiIH0pO1xuICAgIGlmIChyZXN1bHQuZXJyb3IgfHwgcmVzdWx0LnN0YXR1cykge1xuICAgICAgbG9nZ2VyLm5vdGljZShcImNkIFwiICsgdGhpcy5fY3dkKTtcbiAgICAgIGxldCBjbWQgPSB0aGlzLl9hcmdzLmpvaW4oXCIgXCIpO1xuICAgICAgY21kID0gdGhpcy5fY29tbWFuZCArIChjbWQgPyBcIiBcIiA6IFwiXCIpICsgY21kO1xuICAgICAgbG9nZ2VyLm5vdGljZShjbWQpO1xuICAgICAgbG9nZ2VyLm5vdGljZShcIlwiKTtcblxuICAgICAgbG9nZ2VyLmZhdGFsKHJlc3VsdC5zdGRlcnIpO1xuXG4gICAgICBpZiAocmVzdWx0LmVycm9yKVxuICAgICAgICAgIHRocm93IHJlc3VsdC5lcnJvcjtcblxuICAgICAgdGhyb3cgbmV3IEVycm9yKHJlc3VsdC5lcnJvciBhcyBhbnkgfHwgXCJTdGF0dXMgXCIgKyByZXN1bHQuc3RhdHVzKTtcbiAgICB9XG4gICAgaWYgKHJlc3VsdC5zdGRvdXQpIHtcbiAgICAgIGZvciAoY29uc3QgbGluZSBvZiByZXN1bHQuc3Rkb3V0LnRyaW0oKS5zcGxpdChcIlxcblwiKSkge1xuICAgICAgICBsb2dnZXIubm90aWNlKGxpbmUpO1xuICAgICAgfVxuICAgIH1cbiAgfVxuXG4gIHB1YmxpYyBzdGF0aWMgZnJvbUpTT04obzogU2ltcGxlT2JqZWN0KSB7XG4gICAgY29uc3Qgb3B0aW9uczogT3B0aW9ucyAmIFNpbXBsZU9iamVjdCA9IG8gYXMgYW55O1xuICAgIHJldHVybiBuZXcgU3Bhd25TeW5jVGFzayhvcHRpb25zLmNvbW1hbmQsIG9wdGlvbnMuYXJncywgb3B0aW9ucy5jd2QpO1xuICB9XG5cbiAgcHVibGljIHRvSlNPTigpOiBPcHRpb25zICYgU2ltcGxlT2JqZWN0IHtcbiAgICByZXR1cm4ge1xuICAgICAgdHlwZTogU3Bhd25TeW5jVGFzay5uYW1lLFxuICAgICAgY29tbWFuZDogdGhpcy5fY29tbWFuZCxcbiAgICAgIGFyZ3M6IHRoaXMuX2FyZ3MsXG4gICAgICBjd2Q6IHRoaXMuX2N3ZCxcbiAgICB9XG4gIH1cbn07XG5cblNpbXBsZU9iamVjdC5yZWdpc3Rlckluc3RhbmNlQ3JlYXRvcihTcGF3blN5bmNUYXNrLm5hbWUsIFNwYXduU3luY1Rhc2suZnJvbUpTT04pO1xuIiwiLypcbiAqIE1JVCBMaWNlbnNlXG4gKlxuICogQ29weXJpZ2h0IChjKSAyMDI1ICBZdXJpaSBZYWt1YmluICh5dXJpaS55YWt1YmluQGdtYWlsLmNvbSlcbiAqXG4gKiBQZXJtaXNzaW9uIGlzIGdyYW50ZWQgdG8gdXNlLCBjb3B5LCBtb2RpZnksIGFuZCBkaXN0cmlidXRlIHRoaXMgc29mdHdhcmVcbiAqIHVuZGVyIHRoZSBNSVQgTGljZW5zZS4gU2VlIExJQ0VOU0UgZmlsZSBmb3IgZGV0YWlscy5cbiAqL1xuXG5pbXBvcnQgb3MgZnJvbSBcIm5vZGU6b3NcIjtcbmltcG9ydCB7IERFQlVHX0JVSUxEX1RZUEUsIFJFTEVBU0VfQlVJTERfVFlQRSB9IGZyb20gXCJAL2NvcmUvVHlwZXNcIjtcbmltcG9ydCB7IEhvc3QgfSBmcm9tIFwiQC91dGlscy9Ib3N0XCI7XG5cbmV4cG9ydCBkZWZhdWx0IHtcbiAgU1lTVEVNX05BTUU6IHtcbiAgICBkZXNjcmlwdGlvbjogXCJEZWZpbmVzIHRoZSB0YXJnZXQgT1MgZm9yIHRoZSBidWlsZCwgdXNlZCBpbiBjcm9zcy1jb21waWxhdGlvbiBhbmQgbmF0aXZlIGJ1aWxkc1wiLFxuICAgIHZhbHVlOiBcIkxpbnV4XCIsXG4gIH0sXG4gIFNZU1RFTV9QUk9DRVNTT1I6IHtcbiAgICBkZXNjcmlwdGlvbjogXCJEZWZpbmVzIHRoZSB0YXJnZXQgQ1BVIGFyY2hpdGVjdHVyZVwiLFxuICAgIHZhbHVlOiBcIndhc20zMlwiLFxuICB9LFxuICBQUk9KRUNUX05BTUU6IHtcbiAgICBkZXNjcmlwdGlvbjogXCJOYW1lIG9mIHRoZSBjdXJyZW50IHByb2plY3RcIixcbiAgICB2YWx1ZTogXCJcIixcbiAgfSxcbiAgUFJPSkVDVF9WRVJTSU9OOiB7XG4gICAgZGVzY3JpcHRpb246IFwiVmVyc2lvbiBvZiB0aGUgY3VycmVudCBwcm9qZWN0XCIsXG4gICAgdmFsdWU6IFwiXCIsXG4gIH0sXG4gIFBST0pFQ1RfREVTQ1JJUFRJT046IHtcbiAgICBkZXNjcmlwdGlvbjogXCJEZXNjcmlwdGlvbiBvZiB0aGUgY3VycmVudCBwcm9qZWN0XCIsXG4gICAgdmFsdWU6IFwiXCIsXG4gIH0sXG4gIFBST0pFQ1RfSE9NRVBBR0VfVVJMOiB7XG4gICAgZGVzY3JpcHRpb246IFwiSG9tZXBhZ2UgVVJMIG9mIHRoZSBjdXJyZW50IHByb2plY3RcIixcbiAgICB2YWx1ZTogXCJcIixcbiAgfSxcbiAgUFJPSkVDVF9TT1VSQ0VfRElSOiB7XG4gICAgZGVzY3JpcHRpb246IFwiQWJzb2x1dGUgcGF0aCB0byB0aGUgdG9wLWxldmVsIHNvdXJjZSBkaXJlY3Rvcnkgb2YgdGhlIHByb2plY3RcIixcbiAgICB0eXBlOiBcIkRpclBhdGhcIixcbiAgfSxcbiAgUFJPSkVDVF9CSU5BUllfRElSOiB7XG4gICAgZGVzY3JpcHRpb246IFwiQWJzb2x1dGUgcGF0aCB0byB0aGUgdG9wLWxldmVsIGJ1aWxkIChiaW5hcnkpIGRpcmVjdG9yeSBvZiB0aGUgcHJvamVjdFwiLFxuICAgIHR5cGU6IFwiRGlyUGF0aFwiLFxuICB9LFxuICBTQ1JJUFRfTU9EVUxFOiB7XG4gICAgZGVzY3JpcHRpb246IFwiTW9kdWxlIG5hbWUgb2YgdGhlIGN1cnJlbnQgTWFrZVNjcmlwdFwiLFxuICAgIHR5cGU6IFwic3RyaW5nXCIsXG4gIH0sXG4gIFNDUklQVF9GSUxFOiB7XG4gICAgZGVzY3JpcHRpb246IFwiRnVsbCBwYXRoIHRvIHRoZSBjdXJyZW50IE1ha2VTY3JpcHQgZmlsZSBiZWluZyBwcm9jZXNzZWRcIixcbiAgICB0eXBlOiBcIkZpbGVQYXRoXCIsXG4gIH0sXG4gIFNDUklQVF9ESVI6IHtcbiAgICBkZXNjcmlwdGlvbjogXCJEaXJlY3Rvcnkgb2YgdGhlIGN1cnJlbnQgTWFrZVNjcmlwdCBmaWxlIGJlaW5nIHByb2Nlc3NlZFwiLFxuICAgIHR5cGU6IFwiRGlyUGF0aFwiLFxuICB9LFxuICBQQUNLQUdFX0ZJTEU6IHtcbiAgICBkZXNjcmlwdGlvbjogXCJGaWxlbmFtZSBvZiBwcm9qZWN0IG1hbmlmZXN0IGNvbnRhaW5pbmcgbWV0YWRhdGEgYW5kIGRlcGVuZGVuY2llc1wiLFxuICAgIHR5cGU6IFwiRmlsZVBhdGhcIixcbiAgfSxcbiAgQ0FDSEVfRklMRToge1xuICAgIGRlc2NyaXB0aW9uOiBcIkRlZmF1bHQgZmlsZW5hbWUgb2YgdGhlIEJpdE1ha2UgY2FjaGUgc3RvcmluZyBzZXR0aW5nc1wiLFxuICAgIHR5cGU6IFwiRmlsZVBhdGhcIixcbiAgfSxcbiAgVE9PTENIQUlOX0ZJTEU6IHtcbiAgICBkZXNjcmlwdGlvbjogXCJTcGVjaWZpZXMgdGhlIHBhdGggdG8gYSB0b29sY2hhaW4gZmlsZSB1c2VkIGZvciBjcm9zcy1jb21waWxhdGlvblwiLFxuICAgIHR5cGU6IFwic3RyaW5nXCIsXG4gIH0sXG4gIEJVSUxEX1RZUEU6IHtcbiAgICBkZXNjcmlwdGlvbjogXCJTcGVjaWZpZXMgdGhlIGJ1aWxkIGNvbmZpZ3VyYXRpb24gZm9yIGNvbnRyb2xsaW5nIG9wdGltaXphdGlvbiBsZXZlbHMgYW5kIGRlYnVnIGluZm9ybWF0aW9uIGluIHRoZSBidWlsZCBwcm9jZXNzXCIsXG4gICAgdHlwZTogWyBERUJVR19CVUlMRF9UWVBFLCBSRUxFQVNFX0JVSUxEX1RZUEUgXSxcbiAgICB2YWx1ZTogUkVMRUFTRV9CVUlMRF9UWVBFLFxuICB9LFxuICBJTlNUQUxMX1BSRUZJWDoge1xuICAgIGRlc2NyaXB0aW9uOiBcIlRoZSByb290IGRpcmVjdG9yeSB3aGVyZSBmaWxlcyB3aWxsIGJlIGluc3RhbGxlZCBieSBkZWZhdWx0XCIsXG4gICAgdHlwZTogXCJEaXJQYXRoXCIsXG4gICAgdmFsdWU6IFwiL3VzclwiLFxuICB9LFxuICBERVNURElSOiB7XG4gICAgZGVzY3JpcHRpb246IFwiVGVtcG9yYXJ5IGluc3RhbGxhdGlvbiByb290XCIsXG4gICAgdHlwZTogXCJEaXJQYXRoXCIsXG4gIH0sXG4gIFNPVVJDRV9ESVI6IHtcbiAgICBkZXNjcmlwdGlvbjogXCJQYXRoIHRvIHRoZSBzb3VyY2UgZGlyZWN0b3J5IGN1cnJlbnRseSBiZWluZyBwcm9jZXNzZWRcIixcbiAgICB0eXBlOiBcIkRpclBhdGhcIixcbiAgfSxcbiAgQklOQVJZX0RJUjoge1xuICAgIGRlc2NyaXB0aW9uOiBcIlBhdGggdG8gdGhlIGJpbmFyeSBkaXJlY3RvcnkgY3VycmVudGx5IGJlaW5nIHByb2Nlc3NlZFwiLFxuICAgIHR5cGU6IFwiRGlyUGF0aFwiLFxuICB9LFxuICBQT1NJVElPTl9JTkRFUEVOREVOVF9DT0RFOiB7XG4gICAgZGVzY3JpcHRpb246IFwiRW5hYmxlcyBQb3NpdGlvbi1JbmRlcGVuZGVudCBDb2RlIChQSUMpIGZvciBidWlsZGluZyBzaGFyZWQgbGlicmFyaWVzXCIsXG4gICAgdmFsdWU6IGZhbHNlLFxuICB9LFxuICBQUkVWRU5UX0lOU1RBTExfRklMRVM6IHtcbiAgICBkZXNjcmlwdGlvbjogXCJQcmV2ZW50IGluc3RhbGxhdGlvbiBvZiBmaWxlc1wiLFxuICAgIHZhbHVlOiBmYWxzZSxcbiAgfSxcbiAgSE9TVF9TWVNURU1fTkFNRToge1xuICAgIGRlc2NyaXB0aW9uOiBcIlNwZWNpZmllcyB0aGUgT1Mgb2YgdGhlIG1hY2hpbmUgcnVubmluZ1wiLFxuICAgIHZhbHVlOiBvcy50eXBlKCksXG4gIH0sXG4gIElOQ0xVREVTOiB7XG4gICAgZGVzY3JpcHRpb246IFwiUGF0aHMgc2VhcmNoZWQgZm9yIGhlYWRlciBmaWxlc1wiLFxuICAgIHZhbHVlOiBbXSxcbiAgfSxcbiAgQVNNX0NPTVBJTEVSOiB7XG4gICAgZGVzY3JpcHRpb246IFwiUGF0aCB0byB0aGUgYXNzZW1ibGVyIGNvbXBpbGVyIGRldGVjdGVkXCIsXG4gICAgdmFsdWU6IFwiXCIsXG4gIH0sXG4gIEFTTV9GTEFHUzoge1xuICAgIGRlc2NyaXB0aW9uOiBcIkZsYWdzIHBhc3NlZCB0byB0aGUgYXNzZW1ibGVyIGNvbXBpbGVyXCIsXG4gICAgdmFsdWU6IFtdLFxuICB9LFxuICBBU01fRkxBR1NfREVCVUc6IHtcbiAgICBkZXNjcmlwdGlvbjogXCJBZGRpdGlvbmFsIGFzc2VtYmxlciBmbGFncyB1c2VkIHdoZW4gYnVpbGRpbmcgaW4gRGVidWcgbW9kZVwiLFxuICAgIHZhbHVlOiBbIFwiLWdcIiBdLFxuICB9LFxuICBBU01fRkxBR1NfUkVMRUFTRToge1xuICAgIGRlc2NyaXB0aW9uOiBcIkFkZGl0aW9uYWwgYXNzZW1ibGVyIGZsYWdzIHVzZWQgd2hlbiBidWlsZGluZyBpbiBSZWxlYXNlIG1vZGVcIixcbiAgICB2YWx1ZTogWyBcIi1PM1wiLCBcIi1ETkRFQlVHXCIgXSxcbiAgfSxcbiAgQ19DT01QSUxFUjoge1xuICAgIGRlc2NyaXB0aW9uOiBcIlBhdGggdG8gdGhlIEMgY29tcGlsZXIgZGV0ZWN0ZWRcIixcbiAgICB2YWx1ZTogXCJcIixcbiAgfSxcbiAgQ19GTEFHUzoge1xuICAgIGRlc2NyaXB0aW9uOiBcIkZsYWdzIHBhc3NlZCB0byB0aGUgQyBjb21waWxlclwiLFxuICAgIHZhbHVlOiBbXSxcbiAgfSxcbiAgQ19GTEFHU19ERUJVRzoge1xuICAgIGRlc2NyaXB0aW9uOiBcIkFkZGl0aW9uYWwgQyBjb21waWxlciBmbGFncyB1c2VkIHdoZW4gYnVpbGRpbmcgaW4gRGVidWcgbW9kZVwiLFxuICAgIHZhbHVlOiBbIFwiLWdcIiBdLFxuICB9LFxuICBDX0ZMQUdTX1JFTEVBU0U6IHtcbiAgICBkZXNjcmlwdGlvbjogXCJBZGRpdGlvbmFsIEMgY29tcGlsZXIgZmxhZ3MgdXNlZCB3aGVuIGJ1aWxkaW5nIGluIFJlbGVhc2UgbW9kZVwiLFxuICAgIHZhbHVlOiBbIFwiLU8zXCIsIFwiLUROREVCVUdcIiBdLFxuICB9LFxuICBDWFhfQ09NUElMRVI6IHtcbiAgICBkZXNjcmlwdGlvbjogXCJQYXRoIHRvIHRoZSBDKysgY29tcGlsZXIgZGV0ZWN0ZWRcIixcbiAgICB2YWx1ZTogXCJcIixcbiAgfSxcbiAgQ1hYX0ZMQUdTOiB7XG4gICAgZGVzY3JpcHRpb246IFwiRmxhZ3MgcGFzc2VkIHRvIHRoZSBDIGNvbXBpbGVyXCIsXG4gICAgdmFsdWU6IFtdLFxuICB9LFxuICBDWFhfRkxBR1NfREVCVUc6IHtcbiAgICBkZXNjcmlwdGlvbjogXCJBZGRpdGlvbmFsIEMrKyBjb21waWxlciBmbGFncyB1c2VkIHdoZW4gYnVpbGRpbmcgaW4gRGVidWcgbW9kZVwiLFxuICAgIHZhbHVlOiBbIFwiLWdcIiBdLFxuICB9LFxuICBDWFhfRkxBR1NfUkVMRUFTRToge1xuICAgIGRlc2NyaXB0aW9uOiBcIkFkZGl0aW9uYWwgQysrIGNvbXBpbGVyIGZsYWdzIHVzZWQgd2hlbiBidWlsZGluZyBpbiBSZWxlYXNlIG1vZGVcIixcbiAgICB2YWx1ZTogWyBcIi1PM1wiLCBcIi1ETkRFQlVHXCIgXSxcbiAgfSxcbiAgQVI6IHtcbiAgICBkZXNjcmlwdGlvbjogXCJQYXRoIHRvIHRoZSBhcmNoaXZlciB0b29sIHVzZWQgdG8gY3JlYXRlIHN0YXRpYyBsaWJyYXJpZXNcIixcbiAgICB2YWx1ZTogXCJcIixcbiAgfSxcbiAgUkFOTElCOiB7XG4gICAgZGVzY3JpcHRpb246IFwiVG9vbCB1c2VkIHRvIGdlbmVyYXRlIGFuIGluZGV4IHRvIHRoZSBjb250ZW50cyBvZiBhbiBhcmNoaXZlIChzdGF0aWMgbGlicmFyeSlcIixcbiAgICB2YWx1ZTogXCJcIixcbiAgfSxcbiAgTElOS0VSOiB7XG4gICAgZGVzY3JpcHRpb246IFwiUGF0aCB0byB0aGUgbGlua2VyIHVzZWQgdG8gbGluayBvYmplY3QgZmlsZXMgYW5kIGxpYnJhcmllcyBpbnRvIGV4ZWN1dGFibGVzXCIsXG4gICAgdmFsdWU6IFwiXCIsXG4gIH0sXG4gIE5NOiB7XG4gICAgZGVzY3JpcHRpb246IFwiUGF0aCB0byB0aGUgdG9vbCB1c2VkIHRvIGxpc3Qgc3ltYm9scyBmcm9tIG9iamVjdCBmaWxlcyBvciBhcmNoaXZlc1wiLFxuICAgIHZhbHVlOiBcIlwiLFxuICB9LFxuICBPQkpDT1BZOiB7XG4gICAgZGVzY3JpcHRpb246IFwiUGF0aCB0byB0aGUgdG9vbCB1c2VkIHRvIGNvcHkgYW5kIHRyYW5zbGF0ZSBvYmplY3QgZmlsZXNcIixcbiAgICB2YWx1ZTogXCJcIixcbiAgfSxcbiAgT0JKRFVNUDoge1xuICAgIGRlc2NyaXB0aW9uOiBcIlBhdGggdG8gdGhlIHRvb2wgdXNlZCB0byBkaXNwbGF5IGluZm9ybWF0aW9uIGFib3V0IG9iamVjdCBmaWxlcywgc3VjaCBhcyBkaXNhc3NlbWJseVwiLFxuICAgIHZhbHVlOiBcIlwiLFxuICB9LFxuICBTVFJJUDoge1xuICAgIGRlc2NyaXB0aW9uOiBcIlBhdGggdG8gdGhlIHRvb2wgdXNlZCB0byByZW1vdmUgc3ltYm9scyBmcm9tIG9iamVjdCBmaWxlcyBvciBleGVjdXRhYmxlcyB0byByZWR1Y2Ugc2l6ZVwiLFxuICAgIHZhbHVlOiBcIlwiLFxuICB9LFxuICBPQkpFQ1RfTElCUkFSWV9QUkVGSVg6IHtcbiAgICBkZXNjcmlwdGlvbjogXCJQcmVmaXggdXNlZCBmb3Igb2JqZWN0IGxpYnJhcmllc1wiLFxuICAgIHZhbHVlOiBcIlwiLFxuICB9LFxuICBPQkpFQ1RfTElCUkFSWV9TVUZGSVg6IHtcbiAgICBkZXNjcmlwdGlvbjogXCJTdWZmaXggdXNlZCBmb3Igb2JqZWN0IGxpYnJhcnkgZmlsZXNcIixcbiAgICB2YWx1ZTogXCIub1wiLFxuICB9LFxuICBPQkpFQ1RfTElOS0VSX0ZMQUdTOiB7XG4gICAgZGVzY3JpcHRpb246IFwiRmxhZ3MgcGFzc2VkIHRvIHRoZSBsaW5rZXIgd2hlbiBjcmVhdGluZyBvYmplY3QgbGlicmFyaWVzXCIsXG4gICAgdmFsdWU6IFtdLFxuICB9LFxuICBTVEFUSUNfTElCUkFSWV9QUkVGSVg6IHtcbiAgICBkZXNjcmlwdGlvbjogXCJQcmVmaXggdXNlZCBmb3Igc3RhdGljIGxpYnJhcnkgZmlsZXNcIixcbiAgICB2YWx1ZTogXCJsaWJcIixcbiAgfSxcbiAgU1RBVElDX0xJQlJBUllfU1VGRklYOiB7XG4gICAgZGVzY3JpcHRpb246IFwiU3VmZml4IHVzZWQgZm9yIHN0YXRpYyBsaWJyYXJ5IGZpbGVzXCIsXG4gICAgdmFsdWU6IFwiLmFcIixcbiAgfSxcbiAgU1RBVElDX0xJTktFUl9GTEFHUzoge1xuICAgIGRlc2NyaXB0aW9uOiBcIkZsYWdzIHBhc3NlZCB0byB0aGUgbGlua2VyIHdoZW4gY3JlYXRpbmcgc3RhdGljIGxpYnJhcmllc1wiLFxuICAgIHZhbHVlOiBbXSxcbiAgfSxcbiAgU0hBUkVEX0xJQlJBUllfUFJFRklYOiB7XG4gICAgZGVzY3JpcHRpb246IFwiUHJlZml4IHVzZWQgZm9yIHNoYXJlZCBsaWJyYXJ5IGZpbGVzXCIsXG4gICAgdmFsdWU6IFwibGliXCIsXG4gIH0sXG4gIFNIQVJFRF9MSUJSQVJZX1NVRkZJWDoge1xuICAgIGRlc2NyaXB0aW9uOiBcIlN1ZmZpeCB1c2VkIGZvciBzaGFyZWQgbGlicmFyeSBmaWxlc1wiLFxuICAgIHZhbHVlOiBcIi5zb1wiLFxuICB9LFxuICBTSEFSRURfTElOS0VSX0ZMQUdTOiB7XG4gICAgZGVzY3JpcHRpb246IFwiRmxhZ3MgcGFzc2VkIHRvIHRoZSBsaW5rZXIgd2hlbiBjcmVhdGluZyBzaGFyZWQgbGlicmFyaWVzXCIsXG4gICAgdmFsdWU6IFtdLFxuICB9LFxuICBFWEVDVVRBQkxFX1NVRkZJWDoge1xuICAgIGRlc2NyaXB0aW9uOiBcIlN1ZmZpeCB1c2VkIGZvciBleGVjdXRhYmxlIGZpbGVzXCIsXG4gICAgdmFsdWU6IEhvc3QuZXhlY3V0YWJsZVN1ZmZpeCxcbiAgfSxcbiAgRVhFX0xJTktFUl9GTEFHUzoge1xuICAgIGRlc2NyaXB0aW9uOiBcIkZsYWdzIHBhc3NlZCB0byB0aGUgbGlua2VyIHdoZW4gY3JlYXRpbmcgZXhlY3V0YWJsZXNcIixcbiAgICB2YWx1ZTogW10sXG4gIH0sXG4gIEdMT0JBTF9DT05URVhUX0pTT046IHtcbiAgICBkZXNjcmlwdGlvbjogXCJGaWxlbmFtZSBmb3IgSlNPTiBvZiB0aGUgR2xvYmFsIGNvbnRleHRcIixcbiAgICB0eXBlOiBcIkZpbGVQYXRoXCIsXG4gIH0sXG4gIFRBUkdFVF9HT0FMU19KU09OOiB7XG4gICAgZGVzY3JpcHRpb246IFwiRmlsZW5hbWUgZm9yIEpTT04gb2YgdGhlIFRhcmdldCBHb2Fsc1wiLFxuICAgIHR5cGU6IFwiRmlsZVBhdGhcIixcbiAgfSxcbiAgU0laRU9GX1ZPSURfUDoge1xuICAgIGRlc2NyaXB0aW9uOiBcIkRlZmluZXMgdGhlIHNpemUgKGluIGJ5dGVzKSBvZiBhIHZvaWQgcG9pbnRlciBvbiB0aGUgdGFyZ2V0IGFyY2hpdGVjdHVyZVwiLFxuICAgIHR5cGU6IFsgNCwgOCBdLFxuICAgIHZhbHVlOiBIb3N0LnNpemVvZlZvaWRwLFxuICB9LFxuICBNQUtFX1BMVUdJTl9MSVNUOiB7XG4gICAgZGVzY3JpcHRpb246IFwiTGlzdCBvZiBwYXRocyB0byBwbHVnaW5zXCIsXG4gICAgdmFsdWU6IFtdLFxuICB9LFxuICBIT1NUX0VYRUNVVEFCTEVfU1VGRklYOiB7XG4gICAgZGVzY3JpcHRpb246IFwiRGVmaW5lcyB0aGUgZmlsZSBleHRlbnNpb24gZm9yIGV4ZWN1dGFibGVzIG9uIHRoZSBob3N0IHN5c3RlbVwiLFxuICAgIHZhbHVlOiBIb3N0LmV4ZWN1dGFibGVTdWZmaXgsXG4gICAgLy8gUmVhZG9ubHlcbiAgfSxcbn07XG4iLCIvKlxuICogTUlUIExpY2Vuc2VcbiAqXG4gKiBDb3B5cmlnaHQgKGMpIDIwMjUgIFl1cmlpIFlha3ViaW4gKHl1cmlpLnlha3ViaW5AZ21haWwuY29tKVxuICpcbiAqIFBlcm1pc3Npb24gaXMgZ3JhbnRlZCB0byB1c2UsIGNvcHksIG1vZGlmeSwgYW5kIGRpc3RyaWJ1dGUgdGhpcyBzb2Z0d2FyZVxuICogdW5kZXIgdGhlIE1JVCBMaWNlbnNlLiBTZWUgTElDRU5TRSBmaWxlIGZvciBkZXRhaWxzLlxuICovXG5cbmltcG9ydCB7IFNvdXJjZUZpbGUgfSBmcm9tIFwiQC9jb3JlL1NvdXJjZUZpbGVcIjtcbmltcG9ydCB7IFRhcmdldE5hbWUgfSBmcm9tIFwiQC9jb3JlL1RhcmdldE5hbWVcIjtcbmltcG9ydCB7IFRhcmdldEZpbGUgfSBmcm9tIFwiQC9jb3JlL1RhcmdldEZpbGVcIjtcbmltcG9ydCB7IFRhcmdldEluY2x1ZGVzIH0gZnJvbSBcIkAvY29yZS9UYXJnZXRJbmNsdWRlc1wiO1xuaW1wb3J0IHsgVGFyZ2V0T2JqZWN0cyB9IGZyb20gXCJAL2NvcmUvVGFyZ2V0T2JqZWN0c1wiO1xuaW1wb3J0IHsgQWJzb2x1dGVQYXRoIH0gZnJvbSBcIkAvY29yZS9BYnNvbHV0ZVBhdGhcIjtcbmltcG9ydCB7IFNpbXBsZU9iamVjdCB9IGZyb20gXCIuL1NpbXBsZU9iamVjdFwiO1xuaW1wb3J0IHsgTG9nZ2VyIH0gZnJvbSBcIkAvbG9nZ2VyXCI7XG5cbmNvbnN0IGxvZ2dlciA9IExvZ2dlci5jcmVhdGUoaW1wb3J0Lm1ldGEudXJsKTtcblxuZXhwb3J0IGludGVyZmFjZSBUYXJnZXRDb21tYW5kIHtcbiAgY29tbWFuZDogc3RyaW5nIHwgQWJzb2x1dGVQYXRoIHwgVGFyZ2V0RmlsZTtcbiAgYXJnczogQXJyYXk8c3RyaW5nIHwgQWJzb2x1dGVQYXRoIHwgVGFyZ2V0RmlsZT47XG59O1xuXG5pbnRlcmZhY2UgVGFyZ2V0VmFsdWU8VD4ge1xuICB2YWx1ZTogVDtcbiAgcHVibGljT25seTogYm9vbGVhbjtcbn07XG5cbnR5cGUgVGFyZ2V0VmFsdWVMaXN0PFQ+ID0gQXJyYXk8VGFyZ2V0VmFsdWU8VD4+O1xuXG5leHBvcnQgYWJzdHJhY3QgY2xhc3MgQmFzZVRhcmdldCB7XG4gIHByb3RlY3RlZCBfbmFtZTogc3RyaW5nO1xuICBwcm90ZWN0ZWQgX2luY2x1ZGVzOiBUYXJnZXRWYWx1ZUxpc3Q8QWJzb2x1dGVQYXRoIHwgVGFyZ2V0SW5jbHVkZXM+O1xuICBwcm90ZWN0ZWQgX2RlZmluaXRpb25zOiBUYXJnZXRWYWx1ZUxpc3Q8c3RyaW5nPjtcbiAgcHJvdGVjdGVkIF9jb21waWxlT3B0aW9uczogVGFyZ2V0VmFsdWVMaXN0PHN0cmluZyB8IHN0cmluZ1tdPjtcbiAgcHJvdGVjdGVkIF9saW5rT3B0aW9uczogVGFyZ2V0VmFsdWVMaXN0PHN0cmluZyB8IHN0cmluZ1tdPjtcbiAgcHJvdGVjdGVkIF9saWJyYXJpZXM6IFRhcmdldFZhbHVlTGlzdDxUYXJnZXROYW1lPjtcbiAgcHJvdGVjdGVkIF9zb3VyY2VzOiBUYXJnZXRWYWx1ZUxpc3Q8VGFyZ2V0T2JqZWN0cyB8IFNvdXJjZUZpbGU+O1xuICBwcm90ZWN0ZWQgX3ByZUJ1aWxkTGlzdDogVGFyZ2V0Q29tbWFuZFtdO1xuICBwcm90ZWN0ZWQgX3Bvc3RCdWlsZExpc3Q6IFRhcmdldENvbW1hbmRbXTtcbiAgcHJvdGVjdGVkIF9sYW5ndWFnZSA9IFwiXCI7XG4gIHByb3RlY3RlZCBfY29tcGlsZXJQYXRoID0gXCJcIjtcbiAgcHJvdGVjdGVkIF9jb21waWxlckZsYWdzID0gbmV3IEFycmF5PHN0cmluZz47XG5cbiAgcHJvdGVjdGVkIGNvbnN0cnVjdG9yKG5hbWU6IHN0cmluZykge1xuICAgIHRoaXMuX25hbWUgPSBuYW1lO1xuICAgIHRoaXMuX2luY2x1ZGVzID0gW107XG4gICAgdGhpcy5fZGVmaW5pdGlvbnMgPSBbXTtcbiAgICB0aGlzLl9jb21waWxlT3B0aW9ucyA9IFtdO1xuICAgIHRoaXMuX2xpbmtPcHRpb25zID0gW107XG4gICAgdGhpcy5fbGlicmFyaWVzID0gW107XG4gICAgdGhpcy5fc291cmNlcyA9IFtdO1xuICAgIHRoaXMuX3ByZUJ1aWxkTGlzdCA9IFtdO1xuICAgIHRoaXMuX3Bvc3RCdWlsZExpc3QgPSBbXTtcbiAgfVxuXG4gIGFic3RyYWN0IHNldFByZWZpeCh2YWx1ZTogc3RyaW5nKSA6IHZvaWQ7XG4gIGFic3RyYWN0IHNldE91dHB1dE5hbWUodmFsdWU6IGFueSkgOiB2b2lkO1xuICBhYnN0cmFjdCBzZXRTdWZmaXgodmFsdWU6IHN0cmluZykgOiB2b2lkO1xuICBhYnN0cmFjdCBzZXRQb3NpdGlvbkluZGVwZW5kZW50Q29kZSh2YWx1ZTogYm9vbGVhbikgOiB2b2lkO1xuXG4gIHB1YmxpYyBnZXQgdGFyZ2V0TmFtZSgpIHtcbiAgICByZXR1cm4gdGhpcy5fbmFtZTtcbiAgfVxuXG4gIHB1YmxpYyBnZXQgbmFtZSgpIHsgLy8gREVMTUVcbiAgICByZXR1cm4gdGhpcy5fbmFtZTtcbiAgfVxuXG4gIHB1YmxpYyBnZXQgaW5jbHVkZXMoKTogVGFyZ2V0SW5jbHVkZXMge1xuICAgIHJldHVybiBUYXJnZXRJbmNsdWRlcy5jcmVhdGUodGhpcy5fbmFtZSk7XG4gIH1cblxuICBwdWJsaWMgZ2V0IG9iamVjdHMoKTogVGFyZ2V0T2JqZWN0cyB7XG4gICAgcmV0dXJuIFRhcmdldE9iamVjdHMuY3JlYXRlKHRoaXMuX25hbWUpO1xuICB9XG5cbiAgcHVibGljIGdldCB0YXJnZXRGaWxlKCk6IFRhcmdldEZpbGUge1xuICAgIHJldHVybiBUYXJnZXRGaWxlLmNyZWF0ZSh0aGlzLl9uYW1lKTtcbiAgfVxuXG4gIHB1YmxpYyBnZXRJbmNsdWRlcygpOiBBcnJheTxBYnNvbHV0ZVBhdGggfCBUYXJnZXRJbmNsdWRlcz4ge1xuICAgIHJldHVybiB0aGlzLl9pbmNsdWRlcy5tYXAoaSA9PiBpLnZhbHVlKTtcbiAgfVxuXG4gIHB1YmxpYyBnZXRQdWJsaWNJbmNsdWRlcygpOiBBcnJheTxBYnNvbHV0ZVBhdGggfCBUYXJnZXRJbmNsdWRlcz4ge1xuICAgIHJldHVybiB0aGlzLl9pbmNsdWRlcy5maWx0ZXIoaSA9PiBpLnB1YmxpY09ubHkpLm1hcChpID0+IGkudmFsdWUpO1xuICB9XG5cbiAgcHVibGljIGFkZEluY2x1ZGUocHVibGljT25seTogYm9vbGVhbiwgdmFsdWU6IEFic29sdXRlUGF0aCB8IFRhcmdldEluY2x1ZGVzKTogdm9pZCB7XG4gICAgdGhpcy5faW5jbHVkZXMucHVzaCh7cHVibGljT25seSwgdmFsdWV9KTtcbiAgfVxuXG4gIHB1YmxpYyBnZXREZWZpbml0aW9ucygpOiBBcnJheTxzdHJpbmc+IHtcbiAgICByZXR1cm4gdGhpcy5fZGVmaW5pdGlvbnMubWFwKGkgPT4gaS52YWx1ZSk7XG4gIH1cblxuICBwdWJsaWMgZ2V0UHVibGljRGVmaW5pdGlvbnMoKTogQXJyYXk8c3RyaW5nPiB7XG4gICAgcmV0dXJuIHRoaXMuX2RlZmluaXRpb25zLmZpbHRlcihpID0+IGkucHVibGljT25seSkubWFwKGkgPT4gaS52YWx1ZSk7XG4gIH1cblxuICBwdWJsaWMgYWRkRGVmaW5pdGlvbihwdWJsaWNPbmx5OiBib29sZWFuLCB2YWx1ZTogc3RyaW5nKTogdm9pZCB7XG4gICAgdGhpcy5fZGVmaW5pdGlvbnMucHVzaCh7cHVibGljT25seSwgdmFsdWV9KTtcbiAgfVxuXG4gIHB1YmxpYyBnZXRDb21waWxlT3B0aW9ucygpOiBBcnJheTxzdHJpbmcgfCBzdHJpbmdbXT4ge1xuICAgIHJldHVybiB0aGlzLl9jb21waWxlT3B0aW9ucy5tYXAoaSA9PiBpLnZhbHVlKTtcbiAgfVxuICBcbiAgcHVibGljIGdldFB1YmxpY0NvbXBpbGVPcHRpb25zKCk6IEFycmF5PHN0cmluZ3xzdHJpbmdbXT4ge1xuICAgIHJldHVybiB0aGlzLl9jb21waWxlT3B0aW9ucy5maWx0ZXIoaSA9PiBpLnB1YmxpY09ubHkpLm1hcChpID0+IGkudmFsdWUpO1xuICB9XG5cbiAgcHVibGljIGFkZENvbXBpbGVPcHRpb25zKC4uLm9wdGlvbnM6IEFycmF5PHN0cmluZyB8IHN0cmluZ1tdPik6IHZvaWQge1xuICAgIHRoaXMuYWRkQ29tcGlsZU9wdGlvbnNJbXBsKGZhbHNlLCAuLi5vcHRpb25zKTtcbiAgfVxuXG4gIHB1YmxpYyBhZGRQdWJsaWNDb21waWxlT3B0aW9ucyguLi5vcHRpb25zOiBBcnJheTxzdHJpbmcgfCBzdHJpbmdbXT4pOiB2b2lkIHtcbiAgICB0aGlzLmFkZENvbXBpbGVPcHRpb25zSW1wbCh0cnVlLCAuLi5vcHRpb25zKTtcbiAgfVxuXG4gIHB1YmxpYyBhZGRDb21waWxlT3B0aW9uc0ltcGwocHVibGljT25seTogYm9vbGVhbiwgLi4ub3B0aW9uczogQXJyYXk8c3RyaW5nIHwgc3RyaW5nW10+KTogdm9pZCB7XG4gICAgZm9yIChjb25zdCB2YWx1ZSBvZiBvcHRpb25zLmZsYXQoKSlcbiAgICAgIHRoaXMuX2NvbXBpbGVPcHRpb25zLnB1c2goe3B1YmxpY09ubHksIHZhbHVlfSk7XG4gIH1cblxuICBwdWJsaWMgZ2V0TGlua09wdGlvbnMoKTogQXJyYXk8c3RyaW5nIHwgc3RyaW5nW10+IHtcbiAgICByZXR1cm4gdGhpcy5fbGlua09wdGlvbnMubWFwKGkgPT4gaS52YWx1ZSk7XG4gIH1cblxuICBwdWJsaWMgZ2V0UHVibGljTGlua09wdGlvbnMoKTogQXJyYXk8c3RyaW5nIHwgc3RyaW5nW10+IHtcbiAgICByZXR1cm4gdGhpcy5fbGlua09wdGlvbnMuZmlsdGVyKGkgPT4gaS5wdWJsaWNPbmx5KS5tYXAoaSA9PiBpLnZhbHVlKTtcbiAgfVxuXG4gIHB1YmxpYyBhZGRMaW5rT3B0aW9ucyguLi5vcHRpb25zOiBBcnJheTxzdHJpbmcgfCBzdHJpbmdbXT4pIHtcbiAgICB0aGlzLmFkZExpbmtPcHRpb25zSW1wbChmYWxzZSwgLi4ub3B0aW9ucyk7XG4gIH1cblxuICBwdWJsaWMgYWRkUHVibGljTGlua09wdGlvbnMoLi4ub3B0aW9uczogQXJyYXk8c3RyaW5nIHwgc3RyaW5nW10+KSB7XG4gICAgdGhpcy5hZGRMaW5rT3B0aW9uc0ltcGwodHJ1ZSwgLi4ub3B0aW9ucyk7XG4gIH1cblxuICBwdWJsaWMgYWRkTGlua09wdGlvbnNJbXBsKHB1YmxpY09ubHk6IGJvb2xlYW4sIC4uLm9wdGlvbnM6IEFycmF5PHN0cmluZyB8IHN0cmluZ1tdPikge1xuICAgIGZvciAoY29uc3QgdmFsdWUgb2Ygb3B0aW9ucy5mbGF0KCkpXG4gICAgICB0aGlzLl9saW5rT3B0aW9ucy5wdXNoKHtwdWJsaWNPbmx5LCB2YWx1ZX0pO1xuICB9XG5cbiAgcHVibGljIGdldExpYnJhcmllcygpIHtcbiAgICByZXR1cm4gdGhpcy5fbGlicmFyaWVzLm1hcChpID0+IGkudmFsdWUpO1xuICB9XG5cbiAgcHVibGljIGdldFB1YmxpY0xpYnJhcmllcygpIHtcbiAgICByZXR1cm4gdGhpcy5fbGlicmFyaWVzLmZpbHRlcihpID0+IGkucHVibGljT25seSkubWFwKGkgPT4gaS52YWx1ZSk7XG4gIH1cblxuICBwdWJsaWMgYWRkTGlicmFyaWVzKC4uLmxpYnJhcmllczogUG9zdFRhcmdldFtdKSB7XG4gICAgdGhpcy5hZGRMaWJyYXJpZXNJbXBsKGZhbHNlLCAuLi5saWJyYXJpZXMpO1xuICB9XG5cbiAgcHVibGljIGFkZFB1YmxpY0xpYnJhcmllcyguLi5saWJyYXJpZXM6IFBvc3RUYXJnZXRbXSkge1xuICAgIHRoaXMuYWRkTGlicmFyaWVzSW1wbCh0cnVlLCAuLi5saWJyYXJpZXMpO1xuICB9XG5cbiAgcHVibGljIGFkZExpYnJhcmllc0ltcGwocHVibGljT25seTogYm9vbGVhbiwgLi4ubGlicmFyaWVzOiBQb3N0VGFyZ2V0W10pIHtcbiAgICBmb3IgKGNvbnN0IGl0ZXIgb2YgbGlicmFyaWVzLmZsYXQoKSlcbiAgICAgIHRoaXMuX2xpYnJhcmllcy5wdXNoKHtwdWJsaWNPbmx5LCB2YWx1ZTogVGFyZ2V0TmFtZS5jcmVhdGUoaXRlci50YXJnZXROYW1lKX0pO1xuICB9XG5cbiAgcHVibGljIGdldEhlYWRlcnMoKTogU291cmNlRmlsZVtdIHtcbiAgICBjb25zdCByZXN1bHQgPSBuZXcgQXJyYXk8U291cmNlRmlsZT47XG4gICAgZm9yIChjb25zdCBpdGVyIG9mIHRoaXMuX3NvdXJjZXMpIHtcbiAgICAgIGlmIChpdGVyLnZhbHVlIGluc3RhbmNlb2YgU291cmNlRmlsZSAmJiBpdGVyLnZhbHVlLkhFQURFUl9GSUxFX09OTFkpXG4gICAgICAgIHJlc3VsdC5wdXNoKGl0ZXIudmFsdWUpO1xuICAgIH1cbiAgICByZXR1cm4gcmVzdWx0O1xuICB9XG5cbiAgcHVibGljIGdldEFsbFNvdXJjZXMoKSB7XG4gICAgcmV0dXJuIHRoaXMuX3NvdXJjZXM7XG4gIH1cblxuICBwdWJsaWMgZ2V0U291cmNlRmlsZXMoKTogU291cmNlRmlsZVtdIHtcbiAgICByZXR1cm4gdGhpcy5fc291cmNlcy5tYXAoaSA9PiBpLnZhbHVlKS5maWx0ZXIoaSA9PiBpIGluc3RhbmNlb2YgU291cmNlRmlsZSk7XG4gIH1cblxuICBwdWJsaWMgZ2V0VGFyZ2V0T2JqZWN0cygpOiBUYXJnZXRPYmplY3RzW10ge1xuICAgIHJldHVybiB0aGlzLl9zb3VyY2VzLm1hcChpID0+IGkudmFsdWUpLmZpbHRlcihpID0+IGkgaW5zdGFuY2VvZiBUYXJnZXRPYmplY3RzKTtcbiAgfVxuXG4gIHB1YmxpYyBhZGRTb3VyY2Uoc291cmNlOiBUYXJnZXRPYmplY3RzIHwgU291cmNlRmlsZSkge1xuICAgIHRoaXMuX3NvdXJjZXMucHVzaCh7cHVibGljT25seTogZmFsc2UsIHZhbHVlOiBzb3VyY2V9KTtcbiAgfVxuXG4gIHB1YmxpYyBnZXQgcHJlQnVpbGRMaXN0KCkge1xuICAgIHJldHVybiB0aGlzLl9wcmVCdWlsZExpc3Q7XG4gIH1cblxuICBwdWJsaWMgYWRkUHJlQnVpbGQoY29tbWFuZDogc3RyaW5nIHwgQWJzb2x1dGVQYXRoIHwgVGFyZ2V0RmlsZSwgYXJnczogQXJyYXk8c3RyaW5nIHwgQWJzb2x1dGVQYXRoIHwgVGFyZ2V0RmlsZT4pIHtcbiAgICB0aGlzLl9wcmVCdWlsZExpc3QucHVzaCh7Y29tbWFuZCwgYXJnc30pO1xuICB9XG5cbiAgcHVibGljIGdldCBwb3N0QnVpbGRMaXN0KCkge1xuICAgIHJldHVybiB0aGlzLl9wb3N0QnVpbGRMaXN0O1xuICB9XG5cbiAgcHVibGljIGFkZFBvc3RCdWlsZChjb21tYW5kOiBzdHJpbmcgfCBBYnNvbHV0ZVBhdGggfCBUYXJnZXRGaWxlLCBhcmdzOiBBcnJheTxzdHJpbmcgfCBBYnNvbHV0ZVBhdGggfCBUYXJnZXRGaWxlPikge1xuICAgIHRoaXMuX3Bvc3RCdWlsZExpc3QucHVzaCh7Y29tbWFuZCwgYXJnc30pO1xuICB9XG5cbiAgcHVibGljIGdldCBsYW5ndWFnZSgpOiBzdHJpbmcge1xuICAgIHJldHVybiB0aGlzLl9sYW5ndWFnZTtcbiAgfVxuXG4gIHB1YmxpYyBzZXQgbGFuZ3VhZ2UodmFsdWU6IHN0cmluZykge1xuICAgIHRoaXMuX2xhbmd1YWdlID0gdmFsdWU7XG4gIH1cblxuICBwdWJsaWMgZ2V0IGNvbXBpbGVyUGF0aCgpOiBzdHJpbmcge1xuICAgIHJldHVybiB0aGlzLl9jb21waWxlclBhdGg7XG4gIH1cblxuICBwdWJsaWMgc2V0IGNvbXBpbGVyUGF0aCh2YWx1ZTogc3RyaW5nKSB7XG4gICAgdGhpcy5fY29tcGlsZXJQYXRoID0gdmFsdWU7XG4gIH1cblxuICBwdWJsaWMgZ2V0IGNvbXBpbGVyRmxhZ3MoKTogc3RyaW5nW10ge1xuICAgIHJldHVybiB0aGlzLl9jb21waWxlckZsYWdzO1xuICB9XG5cbiAgcHVibGljIHNldCBjb21waWxlckZsYWdzKHZhbHVlOiBzdHJpbmdbXSkge1xuICAgIHRoaXMuX2NvbXBpbGVyRmxhZ3MgPSB2YWx1ZTtcbiAgfVxuXG4gIHB1YmxpYyB0b0pTT04oKTogb2JqZWN0IHtcbiAgICByZXR1cm4ge1xuICAgICAgbmFtZTogdGhpcy5fbmFtZSxcbiAgICAgIHByZUJ1aWxkTGlzdDogdGhpcy5fcHJlQnVpbGRMaXN0LFxuICAgICAgcG9zdEJ1aWxkTGlzdDogdGhpcy5fcG9zdEJ1aWxkTGlzdCxcbiAgICAgIGluY2x1ZGVzOiB0aGlzLl9pbmNsdWRlcyxcbiAgICAgIGNvbXBpbGVPcHRpb25zOiB0aGlzLl9jb21waWxlT3B0aW9ucyxcbiAgICAgIGxpbmtPcHRpb25zOiB0aGlzLl9saW5rT3B0aW9ucyxcbiAgICAgIHNvdXJjZXM6IHRoaXMuX3NvdXJjZXMsXG4gICAgICBsaWJyYXJpZXM6IHRoaXMuX2xpYnJhcmllcyxcbiAgICB9XG4gIH1cbn07XG5cbmV4cG9ydCBjbGFzcyBQb3N0VGFyZ2V0IGV4dGVuZHMgQmFzZVRhcmdldCB7XG4gIHByaXZhdGUgX3ByZWZpeD86IHN0cmluZztcbiAgcHJpdmF0ZSBfb3V0cHV0TmFtZT86IHN0cmluZztcbiAgcHJpdmF0ZSBfc3VmZml4Pzogc3RyaW5nO1xuICBwcml2YXRlIF9wb3NpdGlvbkluZGVwZW5kZW50Q29kZT86IGJvb2xlYW47XG5cbiAgcHJpdmF0ZSBjb25zdHJ1Y3RvcihuYW1lOiBzdHJpbmcpIHtcbiAgICBzdXBlcihuYW1lKTtcbiAgfVxuXG4gIHB1YmxpYyBzdGF0aWMgY3JlYXRlKG5hbWU6IHN0cmluZykge1xuICAgIHJldHVybiBPYmplY3Quc2VhbChuZXcgUG9zdFRhcmdldChuYW1lKSk7XG4gIH1cblxuICBwdWJsaWMgZ2V0IHByZWZpeCgpIHtcbiAgICByZXR1cm4gdGhpcy5fcHJlZml4O1xuICB9XG5cbiAgcHVibGljIHNldFByZWZpeCh2YWx1ZTogc3RyaW5nKSB7XG4gICAgdGhpcy5fcHJlZml4ID0gdmFsdWU7XG4gIH1cblxuICBwdWJsaWMgZ2V0IG91dHB1dE5hbWUoKSB7XG4gICAgcmV0dXJuIHRoaXMuX291dHB1dE5hbWU7XG4gIH1cblxuICBwdWJsaWMgc2V0T3V0cHV0TmFtZSh2YWx1ZTogYW55KSB7XG4gICAgdGhpcy5fb3V0cHV0TmFtZSA9IHZhbHVlO1xuICB9XG5cbiAgcHVibGljIGdldCBzdWZmaXgoKSB7XG4gICAgcmV0dXJuIHRoaXMuX3N1ZmZpeDtcbiAgfVxuXG4gIHB1YmxpYyBzZXRTdWZmaXgodmFsdWU6IHN0cmluZykge1xuICAgIHRoaXMuX3N1ZmZpeCA9IHZhbHVlO1xuICB9XG5cbiAgcHVibGljIGdldCBwb3NpdGlvbkluZGVwZW5kZW50Q29kZSgpIHtcbiAgICByZXR1cm4gdGhpcy5fcG9zaXRpb25JbmRlcGVuZGVudENvZGU7XG4gIH1cblxuICBwdWJsaWMgc2V0UG9zaXRpb25JbmRlcGVuZGVudENvZGUodmFsdWU6IGJvb2xlYW4pIHtcbiAgICB0aGlzLl9wb3NpdGlvbkluZGVwZW5kZW50Q29kZSA9IHZhbHVlO1xuICB9XG5cbiAgcHVibGljIGdldCBJTkNMVURFUygpIHtcbiAgICByZXR1cm4gdGhpcy5faW5jbHVkZXM7XG4gIH1cblxuICBwdWJsaWMgZ2V0IERFRklOSVRJT05TKCkge1xuICAgIHJldHVybiB0aGlzLl9kZWZpbml0aW9ucztcbiAgfVxuXG4gIHB1YmxpYyBnZXQgQ09NUElMRV9PUFRJT05TKCkge1xuICAgIHJldHVybiB0aGlzLl9jb21waWxlT3B0aW9ucztcbiAgfVxuXG4gIHB1YmxpYyBnZXQgTElOS19PUFRJT05TKCkge1xuICAgIHJldHVybiB0aGlzLl9saW5rT3B0aW9ucztcbiAgfVxuXG4gIHB1YmxpYyBnZXQgTElCUkFSSUVTKCkge1xuICAgIHJldHVybiB0aGlzLl9saWJyYXJpZXM7XG4gIH1cblxuICBwdWJsaWMgZ2V0IFNPVVJDRVMoKSB7XG4gICAgcmV0dXJuIHRoaXMuX3NvdXJjZXM7XG4gIH1cblxuICBwdWJsaWMgdG9KU09OKCk6IFNpbXBsZU9iamVjdCB7XG4gICAgY29uc3QgcmVzdWx0OiBhbnkgPSBzdXBlci50b0pTT04oKTtcblxuICAgIHJlc3VsdC50eXBlID0gUG9zdFRhcmdldC5uYW1lO1xuICAgIFxuICAgIGlmICh0aGlzLl9wcmVmaXggIT09IHVuZGVmaW5lZClcbiAgICAgIHJlc3VsdC5wcmVmaXggPSB0aGlzLl9wcmVmaXg7XG5cbiAgICBpZiAodGhpcy5fb3V0cHV0TmFtZSAhPT0gdW5kZWZpbmVkKVxuICAgICAgcmVzdWx0Lm91dHB1dE5hbWUgPSB0aGlzLl9vdXRwdXROYW1lO1xuXG4gICAgaWYgKHRoaXMuX3N1ZmZpeCAhPT0gdW5kZWZpbmVkKVxuICAgICAgcmVzdWx0LnN1ZmZpeCA9IHRoaXMuX3N1ZmZpeDtcblxuICAgIGlmICh0aGlzLl9wb3NpdGlvbkluZGVwZW5kZW50Q29kZSAhPT0gdW5kZWZpbmVkKVxuICAgICAgcmVzdWx0LnBvc2l0aW9uSW5kZXBlbmRlbnRDb2RlID0gdGhpcy5fcG9zaXRpb25JbmRlcGVuZGVudENvZGU7XG5cbiAgICByZXR1cm4gcmVzdWx0O1xuICB9XG59O1xuXG5leHBvcnQgZW51bSBUYXJnZXRUeXBlIHtcbiAgT2JqZWN0TGlicmFyeSA9IDAsXG4gIFN0YXRpY0xpYnJhcnkgPSAxLFxuICBTaGFyZWRMaWJyYXJ5ID0gMixcbiAgRXhlY3V0YWJsZSA9IDMsXG59O1xuXG5leHBvcnQgbmFtZXNwYWNlIFRhcmdldFR5cGUge1xuXG5leHBvcnQgZnVuY3Rpb24gdG9TdHJpbmcodHlwZTogVGFyZ2V0VHlwZSkge1xuICBzd2l0Y2ggKHR5cGUpIHtcbiAgY2FzZSBUYXJnZXRUeXBlLk9iamVjdExpYnJhcnk6XG4gICAgcmV0dXJuIFwiT2JqZWN0TGlicmFyeVwiO1xuICBjYXNlIFRhcmdldFR5cGUuU3RhdGljTGlicmFyeTpcbiAgICByZXR1cm4gXCJTdGF0aWNMaWJyYXJ5XCI7XG4gIGNhc2UgVGFyZ2V0VHlwZS5TaGFyZWRMaWJyYXJ5OlxuICAgIHJldHVybiBcIlNoYXJlZExpYnJhcnlcIjtcbiAgY2FzZSBUYXJnZXRUeXBlLkV4ZWN1dGFibGU6XG4gICAgcmV0dXJuIFwiRXhlY3V0YWJsZVwiO1xuICB9XG4gIHRocm93IG5ldyBFcnJvcihgVWtub3duIHRhcmdldCB0eXBlICR7dHlwZX1gKTtcbn1cblxufSAvLyBuYW1lc3BhY2UgVGFyZ2V0VHlwZVxuXG5leHBvcnQgY2xhc3MgTWFpblRhcmdldCBleHRlbmRzIEJhc2VUYXJnZXQge1xuICBwcml2YXRlIF90YXJnZXRUeXBlOiBUYXJnZXRUeXBlO1xuICBwcml2YXRlIF9zb3VyY2VEaXI6IEFic29sdXRlUGF0aDtcbiAgcHJpdmF0ZSBfYmluYXJ5RGlyOiBBYnNvbHV0ZVBhdGg7XG4gIHByaXZhdGUgX3ByZWZpeCA9IFwiXCI7XG4gIHByaXZhdGUgX3N1ZmZpeCA9IFwiXCI7XG4gIHByaXZhdGUgX291dHB1dE5hbWU6IHN0cmluZztcbiAgcHJpdmF0ZSBfcG9zaXRpb25JbmRlcGVuZGVudENvZGUgPSBmYWxzZTtcblxuICBwcm90ZWN0ZWQgY29uc3RydWN0b3IodHlwZTogVGFyZ2V0VHlwZSwgbmFtZTogc3RyaW5nLCBzb3VyY2VEaXI6IEFic29sdXRlUGF0aCwgYmluYXJ5RGlyOiBBYnNvbHV0ZVBhdGgpIHtcbiAgICBzdXBlcihuYW1lKTtcblxuICAgIHRoaXMuX3NvdXJjZURpciA9IHNvdXJjZURpcjtcbiAgICB0aGlzLl9iaW5hcnlEaXIgPSBiaW5hcnlEaXI7XG4gICAgdGhpcy5fdGFyZ2V0VHlwZSA9IHR5cGU7XG4gICAgdGhpcy5fb3V0cHV0TmFtZSA9IG5hbWU7XG4gIH1cblxuICBwdWJsaWMgc3RhdGljIGNyZWF0ZSh0eXBlOiBUYXJnZXRUeXBlLCBuYW1lOiBzdHJpbmcsIHNvdXJjZURpcjogQWJzb2x1dGVQYXRoLCBiaW5hcnlEaXI6IEFic29sdXRlUGF0aCkge1xuICAgIHJldHVybiBPYmplY3Quc2VhbChuZXcgTWFpblRhcmdldCh0eXBlLCBuYW1lLCBzb3VyY2VEaXIsIGJpbmFyeURpcikpO1xuICB9XG5cbiAgcHVibGljIGdldCBpc09iamVjdExpYnJhcnkoKSB7XG4gICAgcmV0dXJuIHRoaXMuX3RhcmdldFR5cGUgPT09IFRhcmdldFR5cGUuT2JqZWN0TGlicmFyeTtcbiAgfVxuXG4gIHB1YmxpYyBnZXQgaXNTdGF0aWNMaWJyYXJ5KCkge1xuICAgIHJldHVybiB0aGlzLl90YXJnZXRUeXBlID09PSBUYXJnZXRUeXBlLlN0YXRpY0xpYnJhcnk7XG4gIH1cblxuICBwdWJsaWMgZ2V0IGlzU2hhcmVkTGlicmFyeSgpIHtcbiAgICByZXR1cm4gdGhpcy5fdGFyZ2V0VHlwZSA9PT0gVGFyZ2V0VHlwZS5TaGFyZWRMaWJyYXJ5O1xuICB9XG5cbiAgcHVibGljIGdldCBpc0V4ZWN1dGFibGUoKSB7XG4gICAgcmV0dXJuIHRoaXMuX3RhcmdldFR5cGUgPT09IFRhcmdldFR5cGUuRXhlY3V0YWJsZTtcbiAgfVxuXG4gIHB1YmxpYyBnZXQgc291cmNlRGlyKCkge1xuICAgIHJldHVybiB0aGlzLl9zb3VyY2VEaXI7XG4gIH1cblxuICBwdWJsaWMgZ2V0IGJpbmFyeURpcigpIHtcbiAgICByZXR1cm4gdGhpcy5fYmluYXJ5RGlyO1xuICB9XG5cbiAgcHVibGljIGdldEZpbGVEaXIoKSB7XG4gICAgcmV0dXJuIHRoaXMuX2JpbmFyeURpcjtcbiAgfVxuXG4gIHB1YmxpYyBnZXRGaWxlTmFtZSgpIHtcbiAgICByZXR1cm4gdGhpcy5wcmVmaXggKyB0aGlzLm91dHB1dE5hbWUgKyB0aGlzLnN1ZmZpeDtcbiAgfVxuXG4gIHB1YmxpYyBnZXRGaWxlKCkge1xuICAgIHJldHVybiB0aGlzLl9iaW5hcnlEaXIuam9pbih0aGlzLmdldEZpbGVOYW1lKCkpO1xuICB9XG5cbiAgcHVibGljIGdldCBwcmVmaXgoKSB7XG4gICAgcmV0dXJuIHRoaXMuX3ByZWZpeDtcbiAgfVxuXG4gIHB1YmxpYyBzZXRQcmVmaXgodmFsdWU6IHN0cmluZykge1xuICAgIHRoaXMuX3ByZWZpeCA9IHZhbHVlO1xuICB9XG5cbiAgcHVibGljIGdldCBzdWZmaXgoKSB7XG4gICAgcmV0dXJuIHRoaXMuX3N1ZmZpeDtcbiAgfVxuXG4gIHB1YmxpYyBzZXRTdWZmaXgodmFsdWU6IGFueSkge1xuICAgIHRoaXMuX3N1ZmZpeCA9IHZhbHVlO1xuICB9XG5cbiAgcHVibGljIGdldCBvdXRwdXROYW1lKCkge1xuICAgIHJldHVybiB0aGlzLl9vdXRwdXROYW1lO1xuICB9XG5cbiAgcHVibGljIHNldE91dHB1dE5hbWUodmFsdWU6IGFueSkge1xuICAgIHRoaXMuX291dHB1dE5hbWUgPSB2YWx1ZTtcbiAgfVxuXG4gIHB1YmxpYyBnZXQgcG9zaXRpb25JbmRlcGVuZGVudENvZGUoKSB7XG4gICAgcmV0dXJuIHRoaXMuX3Bvc2l0aW9uSW5kZXBlbmRlbnRDb2RlO1xuICB9XG5cbiAgcHVibGljIHNldFBvc2l0aW9uSW5kZXBlbmRlbnRDb2RlKHZhbHVlOiBib29sZWFuKSB7XG4gICAgdGhpcy5fcG9zaXRpb25JbmRlcGVuZGVudENvZGUgPSB2YWx1ZTtcbiAgfVxuXG4gIHB1YmxpYyBwb3N0VXBkYXRlKHRhcmdldDogUG9zdFRhcmdldCkge1xuICAgIGlmICh0YXJnZXQucHJlZml4ICE9PSB1bmRlZmluZWQpXG4gICAgICB0aGlzLl9wcmVmaXggPSB0YXJnZXQucHJlZml4O1xuICAgIGlmICh0YXJnZXQub3V0cHV0TmFtZSAhPT0gdW5kZWZpbmVkKVxuICAgICAgdGhpcy5fb3V0cHV0TmFtZSA9IHRhcmdldC5vdXRwdXROYW1lO1xuICAgIGlmICh0YXJnZXQuc3VmZml4ICE9PSB1bmRlZmluZWQpXG4gICAgICB0aGlzLl9zdWZmaXggPSB0YXJnZXQuc3VmZml4O1xuICAgIGlmICh0YXJnZXQucG9zaXRpb25JbmRlcGVuZGVudENvZGUgIT09IHVuZGVmaW5lZClcbiAgICAgIHRoaXMuX3Bvc2l0aW9uSW5kZXBlbmRlbnRDb2RlID0gdGFyZ2V0LnBvc2l0aW9uSW5kZXBlbmRlbnRDb2RlO1xuICAgIHRoaXMuX2luY2x1ZGVzLnB1c2goLi4udGFyZ2V0LklOQ0xVREVTKTtcbiAgICB0aGlzLl9kZWZpbml0aW9ucy5wdXNoKC4uLnRhcmdldC5ERUZJTklUSU9OUyk7XG4gICAgdGhpcy5fY29tcGlsZU9wdGlvbnMucHVzaCguLi50YXJnZXQuQ09NUElMRV9PUFRJT05TKTtcbiAgICB0aGlzLl9saW5rT3B0aW9ucy5wdXNoKC4uLnRhcmdldC5MSU5LX09QVElPTlMpO1xuICAgIHRoaXMuX2xpYnJhcmllcy5wdXNoKC4uLnRhcmdldC5MSUJSQVJJRVMpO1xuICAgIHRoaXMuX3NvdXJjZXMucHVzaCguLi50YXJnZXQuU09VUkNFUyk7XG4gICAgdGhpcy5fcHJlQnVpbGRMaXN0LnB1c2goLi4udGFyZ2V0LnByZUJ1aWxkTGlzdCk7XG4gICAgdGhpcy5fcG9zdEJ1aWxkTGlzdC5wdXNoKC4uLnRhcmdldC5wb3N0QnVpbGRMaXN0KTtcbiAgfVxuXG4gIHB1YmxpYyB0b0pTT04oKTogU2ltcGxlT2JqZWN0IHtcbiAgICBjb25zdCByZXN1bHQ6IGFueSA9IHN1cGVyLnRvSlNPTigpO1xuXG4gICAgcmVzdWx0LnR5cGUgPSBCYXNlVGFyZ2V0Lm5hbWU7XG4gICAgcmVzdWx0LnRhcmdldFR5cGUgPSBUYXJnZXRUeXBlLnRvU3RyaW5nKHRoaXMuX3RhcmdldFR5cGUpO1xuICAgIHJlc3VsdC5zb3VyY2VEaXIgPSB0aGlzLl9zb3VyY2VEaXI7XG4gICAgcmVzdWx0LmJpbmFyeURpciA9IHRoaXMuX2JpbmFyeURpcjtcbiAgICByZXN1bHQucHJlZml4ID0gdGhpcy5fcHJlZml4O1xuICAgIHJlc3VsdC5zdWZmaXggPSB0aGlzLl9zdWZmaXg7XG4gICAgcmVzdWx0Lm91dHB1dE5hbWUgPSB0aGlzLl9vdXRwdXROYW1lO1xuICAgIHJlc3VsdC5wb3NpdGlvbkluZGVwZW5kZW50Q29kZSA9IHRoaXMuX3Bvc2l0aW9uSW5kZXBlbmRlbnRDb2RlO1xuXG4gICAgcmV0dXJuIHJlc3VsdDtcbiAgfVxufTtcbiIsIi8qXG4gKiBNSVQgTGljZW5zZVxuICpcbiAqIENvcHlyaWdodCAoYykgMjAyNSAgWXVyaWkgWWFrdWJpbiAoeXVyaWkueWFrdWJpbkBnbWFpbC5jb20pXG4gKlxuICogUGVybWlzc2lvbiBpcyBncmFudGVkIHRvIHVzZSwgY29weSwgbW9kaWZ5LCBhbmQgZGlzdHJpYnV0ZSB0aGlzIHNvZnR3YXJlXG4gKiB1bmRlciB0aGUgTUlUIExpY2Vuc2UuIFNlZSBMSUNFTlNFIGZpbGUgZm9yIGRldGFpbHMuXG4gKi9cblxuaW1wb3J0IHsgVGFyZ2V0SW5jbHVkZXMgfWZyb20gXCJAL2NvcmUvVGFyZ2V0SW5jbHVkZXNcIjtcbmltcG9ydCB7IFRhcmdldE5hbWUgfWZyb20gXCJAL2NvcmUvVGFyZ2V0TmFtZVwiO1xuaW1wb3J0IHsgTWFpblRhcmdldCB9IGZyb20gXCJAL2NvcmUvVGFyZ2V0XCI7XG5pbXBvcnQgeyBBYnNvbHV0ZVBhdGggfSBmcm9tIFwiQC9jb3JlL0Fic29sdXRlUGF0aFwiO1xuaW1wb3J0IHsgU2ltcGxlT2JqZWN0IH0gZnJvbSBcIkAvY29yZS9TaW1wbGVPYmplY3RcIjtcblxuY29uc3QgRU5UUklFUyA9IFN5bWJvbChcIkVOVFJJRVNcIik7XG5cbmV4cG9ydCBjbGFzcyBUYXJnZXRDb2xsZWN0aW9uIHtcbiAgcHJpdmF0ZSBbRU5UUklFU10gPSBuZXcgTWFwPHN0cmluZywgTWFpblRhcmdldD47XG5cbiAgcHVibGljIHN0YXRpYyBjcmVhdGUoKSB7XG4gICAgcmV0dXJuIE9iamVjdC5zZWFsKG5ldyBUYXJnZXRDb2xsZWN0aW9uKTtcbiAgfVxuICBcbiAgcHVibGljIGdldCBFTlRSSUVTKCkge1xuICAgIHJldHVybiB0aGlzW0VOVFJJRVNdO1xuICB9XG5cbiAgcHVibGljIHRvSlNPTigpOiBTaW1wbGVPYmplY3Qge1xuICAgIGNvbnN0IHJlc3VsdDogU2ltcGxlT2JqZWN0ID0geyB0eXBlOiBUYXJnZXRDb2xsZWN0aW9uLm5hbWUgfTtcbiAgICB0aGlzW0VOVFJJRVNdLmZvckVhY2goKHYsIGspID0+IHZvaWQgKHJlc3VsdFtrXSA9IHYpKTtcbiAgICByZXR1cm4gcmVzdWx0O1xuICB9XG5cbiAgcHVibGljIGdldChuYW1lOiBzdHJpbmcpOiBNYWluVGFyZ2V0IHtcbiAgICBjb25zdCByZXN1bHQgPSB0aGlzW0VOVFJJRVNdLmdldChuYW1lKTtcbiAgICBpZiAoIXJlc3VsdClcbiAgICAgIHRocm93IGBUYXJnZXQgXCIke25hbWV9XCIgZG9lcyBub3QgZXhpc3RgO1xuICAgIHJldHVybiByZXN1bHQ7XG4gIH1cblxuICBwdWJsaWMgc2V0KG5hbWU6IHN0cmluZywgdGFyZ2V0OiBhbnkpIHtcbiAgICBpZiAodGhpc1tFTlRSSUVTXS5oYXMobmFtZSkpXG4gICAgICB0aHJvdyBuZXcgRXJyb3IoYFRhcmdldCBcIiR7bmFtZX1cIiBleGlzdHNgKTtcbiAgICB0aGlzW0VOVFJJRVNdLnNldChuYW1lLCB0YXJnZXQpO1xuICB9XG5cbiAgcHJpdmF0ZSBfX2dldEFsbEluY2x1ZGVzKGluY2x1ZGVzOiBzdHJpbmdbXSwgdGFyZ2V0U2V0OiBTZXQ8c3RyaW5nPiwgbGlzdDogQXJyYXk8QWJzb2x1dGVQYXRoIHwgVGFyZ2V0SW5jbHVkZXM+IHwgQXJyYXk8VGFyZ2V0TmFtZT4pIHtcbiAgICBmb3IgKGNvbnN0IGl0ZXIgb2YgbGlzdCkge1xuICAgICAgaWYgKGl0ZXIgaW5zdGFuY2VvZiBUYXJnZXRJbmNsdWRlcyB8fCBpdGVyIGluc3RhbmNlb2YgVGFyZ2V0TmFtZSkge1xuICAgICAgICBpZiAoIXRhcmdldFNldC5oYXMoaXRlci50YXJnZXROYW1lKSkge1xuICAgICAgICAgIHRhcmdldFNldC5hZGQoaXRlci50YXJnZXROYW1lKTtcbiAgICAgICAgICBjb25zdCB0YXJnZXQgPSB0aGlzLmdldChpdGVyLnRhcmdldE5hbWUpO1xuICAgICAgICAgIHRoaXMuX19nZXRBbGxJbmNsdWRlcyhpbmNsdWRlcywgdGFyZ2V0U2V0LCB0YXJnZXQuZ2V0UHVibGljSW5jbHVkZXMoKSk7XG4gICAgICAgICAgdGhpcy5fX2dldEFsbEluY2x1ZGVzKGluY2x1ZGVzLCB0YXJnZXRTZXQsIHRhcmdldC5nZXRQdWJsaWNMaWJyYXJpZXMoKSk7XG4gICAgICAgIH1cbiAgICAgIH1cbiAgICAgIGVsc2UgaWYgKGl0ZXIgaW5zdGFuY2VvZiBBYnNvbHV0ZVBhdGgpIHtcbiAgICAgICAgaWYgKCFpbmNsdWRlcy5pbmNsdWRlcyhpdGVyLnRvU3RyaW5nKCkpKVxuICAgICAgICAgIGluY2x1ZGVzLnB1c2goaXRlci50b1N0cmluZygpKTtcbiAgICAgIH1cbiAgICAgIGVsc2Uge1xuICAgICAgICB0aHJvdyBuZXcgRXJyb3IoYE5vdCBzdXBwb3J0IGluc3RhbmNlICR7aXRlcn1gKTtcbiAgICAgIH1cbiAgICB9XG4gIH1cblxuICBwdWJsaWMgYWxsSW5jbHVkZXNPZihwYXJhbXM6IHN0cmluZyB8IE1haW5UYXJnZXQpOiBzdHJpbmdbXSB7XG4gICAgY29uc3QgdGFyZ2V0ID0gKHR5cGVvZiBwYXJhbXMgPT09IFwic3RyaW5nXCIpID8gdGhpcy5nZXQocGFyYW1zKSA6IHBhcmFtcztcbiAgICBjb25zdCBpbmNsdWRlczogc3RyaW5nW10gPSBbXTtcbiAgICBjb25zdCB0YXJnZXRTZXQgPSBuZXcgU2V0KFsgdGFyZ2V0LnRhcmdldE5hbWUgXSk7XG4gICAgdGhpcy5fX2dldEFsbEluY2x1ZGVzKGluY2x1ZGVzLCB0YXJnZXRTZXQsIHRhcmdldC5nZXRJbmNsdWRlcygpKTtcbiAgICB0aGlzLl9fZ2V0QWxsSW5jbHVkZXMoaW5jbHVkZXMsIHRhcmdldFNldCwgdGFyZ2V0LmdldExpYnJhcmllcygpKTtcbiAgICByZXR1cm4gaW5jbHVkZXM7XG4gIH1cblxuICBwcml2YXRlIF9fZ2V0QWxsSGVhZGVycyhoZWFkZXJzOiBzdHJpbmdbXSwgdGFyZ2V0U2V0OiBTZXQ8c3RyaW5nPiwgbGlzdDogQXJyYXk8QWJzb2x1dGVQYXRoIHwgVGFyZ2V0SW5jbHVkZXM+IHwgQXJyYXk8VGFyZ2V0TmFtZT4pIHtcbiAgICBmb3IgKGNvbnN0IGl0ZXIgb2YgbGlzdCkge1xuICAgICAgaWYgKGl0ZXIgaW5zdGFuY2VvZiBUYXJnZXRJbmNsdWRlcyB8fCBpdGVyIGluc3RhbmNlb2YgVGFyZ2V0TmFtZSkge1xuICAgICAgICBpZiAoIXRhcmdldFNldC5oYXMoaXRlci50YXJnZXROYW1lKSkge1xuICAgICAgICAgIHRhcmdldFNldC5hZGQoaXRlci50YXJnZXROYW1lKTtcbiAgICAgICAgICBjb25zdCB0YXJnZXQgPSB0aGlzLmdldChpdGVyLnRhcmdldE5hbWUpO1xuICAgICAgICAgIGZvciAoY29uc3QgaGVhZGVyIG9mIHRhcmdldC5nZXRIZWFkZXJzKCkubWFwKChpOiBhbnkpID0+IGkuRklMRS50b1N0cmluZygpKSkge1xuICAgICAgICAgICAgaWYgKCFoZWFkZXJzLmluY2x1ZGVzKGhlYWRlci50b1N0cmluZygpKSlcbiAgICAgICAgICAgICAgaGVhZGVycy5wdXNoKGhlYWRlci50b1N0cmluZygpKTtcbiAgICAgICAgICB9XG4gICAgICAgICAgdGhpcy5fX2dldEFsbEhlYWRlcnMoaGVhZGVycywgdGFyZ2V0U2V0LCB0YXJnZXQuZ2V0UHVibGljSW5jbHVkZXMoKSk7XG4gICAgICAgICAgdGhpcy5fX2dldEFsbEhlYWRlcnMoaGVhZGVycywgdGFyZ2V0U2V0LCB0YXJnZXQuZ2V0UHVibGljTGlicmFyaWVzKCkpO1xuICAgICAgICB9XG4gICAgICB9XG4gICAgfVxuICB9XG5cbiAgcHVibGljIGFsbEhlYWRlcnNPZihwYXJhbXM6IHN0cmluZyB8IE1haW5UYXJnZXQpIHtcbiAgICBjb25zdCB0YXJnZXQgPSAodHlwZW9mIHBhcmFtcyA9PT0gXCJzdHJpbmdcIikgPyB0aGlzLmdldChwYXJhbXMpIDogcGFyYW1zO1xuICAgIGNvbnN0IGhlYWRlcnMgPSB0YXJnZXQuZ2V0SGVhZGVycygpLm1hcCgoaTogYW55KSA9PiBpLkZJTEUudG9TdHJpbmcoKSk7XG4gICAgY29uc3QgdGFyZ2V0U2V0ID0gbmV3IFNldChbIHRhcmdldC50YXJnZXROYW1lIF0pO1xuICAgIHRoaXMuX19nZXRBbGxIZWFkZXJzKGhlYWRlcnMsIHRhcmdldFNldCwgdGFyZ2V0LmdldEluY2x1ZGVzKCkpO1xuICAgIHRoaXMuX19nZXRBbGxIZWFkZXJzKGhlYWRlcnMsIHRhcmdldFNldCwgdGFyZ2V0LmdldExpYnJhcmllcygpKTtcbiAgICByZXR1cm4gaGVhZGVycztcbiAgfVxuXG4gIHByaXZhdGUgX19nZXRBbGxMaWJyYXJpZXMobGlicmFyaWVzOiBzdHJpbmdbXSwgdGFyZ2V0U2V0OiBTZXQ8c3RyaW5nPiwgbGlzdDogQXJyYXk8VGFyZ2V0TmFtZT4pIHtcbiAgICBmb3IgKGNvbnN0IGl0ZXIgb2YgbGlzdCkge1xuICAgICAgY29uc29sZS5hc3NlcnQoaXRlciBpbnN0YW5jZW9mIFRhcmdldE5hbWUpO1xuICAgICAgaWYgKCF0YXJnZXRTZXQuaGFzKGl0ZXIudGFyZ2V0TmFtZSkpIHtcbiAgICAgICAgdGFyZ2V0U2V0LmFkZChpdGVyLnRhcmdldE5hbWUpO1xuICAgICAgICBjb25zdCB0YXJnZXQgPSB0aGlzLmdldChpdGVyLnRhcmdldE5hbWUpO1xuICAgICAgICBsaWJyYXJpZXMucHVzaCh0YXJnZXQuZ2V0RmlsZSgpLnRvU3RyaW5nKCkpO1xuICAgICAgICB0aGlzLl9fZ2V0QWxsTGlicmFyaWVzKGxpYnJhcmllcywgdGFyZ2V0U2V0LCB0YXJnZXQuZ2V0UHVibGljTGlicmFyaWVzKCkpO1xuICAgICAgfVxuICAgIH1cbiAgfVxuXG4gIHB1YmxpYyBhbGxMaWJyYXJpZXNPZihwYXJhbXM6IHN0cmluZyB8IE1haW5UYXJnZXQpIHtcbiAgICBjb25zdCB0YXJnZXQgPSAodHlwZW9mIHBhcmFtcyA9PT0gXCJzdHJpbmdcIikgPyB0aGlzLmdldChwYXJhbXMpIDogcGFyYW1zO1xuICAgIGNvbnN0IGxpYnJhcmllczogc3RyaW5nW10gPSBbXTtcbiAgICBjb25zdCB0YXJnZXRTZXQgPSBuZXcgU2V0KFsgdGFyZ2V0LnRhcmdldE5hbWUgXSk7XG4gICAgdGhpcy5fX2dldEFsbExpYnJhcmllcyhsaWJyYXJpZXMsIHRhcmdldFNldCwgdGFyZ2V0LmdldExpYnJhcmllcygpKTtcbiAgICByZXR1cm4gbGlicmFyaWVzO1xuICB9XG5cbiAgcHJpdmF0ZSBfX2dldEFsbERlZmluaXRpb25zKGRlZmluaXRpb25zOiBzdHJpbmdbXSwgdGFyZ2V0U2V0OiBTZXQ8c3RyaW5nPiwgbGlzdDogQXJyYXk8c3RyaW5nPiB8IEFycmF5PFRhcmdldE5hbWU+KSB7XG4gICAgZm9yIChjb25zdCBpdGVyIG9mIGxpc3QpIHtcbiAgICAgIGlmIChpdGVyIGluc3RhbmNlb2YgVGFyZ2V0TmFtZSkge1xuICAgICAgICBpZiAoIXRhcmdldFNldC5oYXMoaXRlci50YXJnZXROYW1lKSkge1xuICAgICAgICAgIHRhcmdldFNldC5hZGQoaXRlci50YXJnZXROYW1lKTtcbiAgICAgICAgICBjb25zdCB0YXJnZXQgPSB0aGlzLmdldChpdGVyLnRhcmdldE5hbWUpO1xuICAgICAgICAgIHRoaXMuX19nZXRBbGxEZWZpbml0aW9ucyhkZWZpbml0aW9ucywgdGFyZ2V0U2V0LCB0YXJnZXQuZ2V0UHVibGljRGVmaW5pdGlvbnMoKSk7XG4gICAgICAgICAgdGhpcy5fX2dldEFsbERlZmluaXRpb25zKGRlZmluaXRpb25zLCB0YXJnZXRTZXQsIHRhcmdldC5nZXRQdWJsaWNMaWJyYXJpZXMoKSk7XG4gICAgICAgIH1cbiAgICAgIH1cbiAgICAgIGVsc2UgaWYgKHR5cGVvZiBpdGVyID09PSBcInN0cmluZ1wiKSB7XG4gICAgICAgIGlmICghZGVmaW5pdGlvbnMuaW5jbHVkZXMoaXRlcikpXG4gICAgICAgICAgZGVmaW5pdGlvbnMucHVzaChpdGVyKTtcbiAgICAgIH1cbiAgICAgIGVsc2Uge1xuICAgICAgICB0aHJvdyBuZXcgRXJyb3IoYE5vdCBzdXBwb3J0IGluc3RhbmNlICR7aXRlcn1gKTtcbiAgICAgIH1cbiAgICB9XG4gIH1cblxuICBwdWJsaWMgYWxsRGVmaW5pdGlvbnNPZihwYXJhbXM6IHN0cmluZyB8IE1haW5UYXJnZXQpIHtcbiAgICBjb25zdCB0YXJnZXQgPSAodHlwZW9mIHBhcmFtcyA9PT0gXCJzdHJpbmdcIikgPyB0aGlzLmdldChwYXJhbXMpIDogcGFyYW1zO1xuICAgIGNvbnN0IGRlZmluaXRpb25zOiBzdHJpbmdbXSA9IFtdO1xuICAgIGNvbnN0IHRhcmdldFNldCA9IG5ldyBTZXQoWyB0YXJnZXQudGFyZ2V0TmFtZSBdKTtcbiAgICB0aGlzLl9fZ2V0QWxsRGVmaW5pdGlvbnMoZGVmaW5pdGlvbnMsIHRhcmdldFNldCwgdGFyZ2V0LmdldERlZmluaXRpb25zKCkpO1xuICAgIHRoaXMuX19nZXRBbGxEZWZpbml0aW9ucyhkZWZpbml0aW9ucywgdGFyZ2V0U2V0LCB0YXJnZXQuZ2V0UHVibGljTGlicmFyaWVzKCkpO1xuICAgIHJldHVybiBkZWZpbml0aW9ucztcbiAgfVxuXG4gIHByaXZhdGUgX19nZXRBbGxDb21waWxlT3B0aW9ucyhvcHRpb25zOiBBcnJheTxzdHJpbmd8c3RyaW5nW10+LCB0YXJnZXRTZXQ6IFNldDxzdHJpbmc+LCBsaXN0OiBBcnJheTxzdHJpbmd8c3RyaW5nW10+IHwgQXJyYXk8VGFyZ2V0TmFtZT4pIHtcbiAgICBmb3IgKGNvbnN0IGl0ZXIgb2YgbGlzdCkge1xuICAgICAgaWYgKGl0ZXIgaW5zdGFuY2VvZiBUYXJnZXROYW1lKSB7XG4gICAgICAgIGlmICghdGFyZ2V0U2V0LmhhcyhpdGVyLnRhcmdldE5hbWUpKSB7XG4gICAgICAgICAgdGFyZ2V0U2V0LmFkZChpdGVyLnRhcmdldE5hbWUpO1xuICAgICAgICAgIGNvbnN0IHRhcmdldCA9IHRoaXMuZ2V0KGl0ZXIudGFyZ2V0TmFtZSk7XG4gICAgICAgICAgdGhpcy5fX2dldEFsbENvbXBpbGVPcHRpb25zKG9wdGlvbnMsIHRhcmdldFNldCwgdGFyZ2V0LmdldFB1YmxpY0NvbXBpbGVPcHRpb25zKCkpO1xuICAgICAgICAgIHRoaXMuX19nZXRBbGxDb21waWxlT3B0aW9ucyhvcHRpb25zLCB0YXJnZXRTZXQsIHRhcmdldC5nZXRQdWJsaWNMaWJyYXJpZXMoKSk7XG4gICAgICAgIH1cbiAgICAgIH1cbiAgICAgIGVsc2UgaWYgKHR5cGVvZiBpdGVyID09PSBcInN0cmluZ1wiKSB7XG4gICAgICAgIGlmICghb3B0aW9ucy5pbmNsdWRlcyhpdGVyKSlcbiAgICAgICAgICBvcHRpb25zLnB1c2goaXRlcik7XG4gICAgICB9XG4gICAgICBlbHNlIGlmIChBcnJheS5pc0FycmF5KGl0ZXIpKSB7XG4gICAgICAgIC8vIFRPRE86IEFkZCBjb21wYXJlIGZvciBzYW1lIGFycmF5IGluIG9wdGlvbnNcbiAgICAgICAgb3B0aW9ucy5wdXNoKGl0ZXIpO1xuICAgICAgfVxuICAgICAgZWxzZSB7XG4gICAgICAgIHRocm93IG5ldyBFcnJvcihgTm90IHN1cHBvcnQgaW5zdGFuY2UgJHtpdGVyfWApO1xuICAgICAgfVxuICAgIH1cbiAgfVxuXG4gIHB1YmxpYyBhbGxDb21waWxlT3B0aW9uc09mKHBhcmFtczogc3RyaW5nIHwgTWFpblRhcmdldCkge1xuICAgIGNvbnN0IHRhcmdldCA9ICh0eXBlb2YgcGFyYW1zID09PSBcInN0cmluZ1wiKSA/IHRoaXMuZ2V0KHBhcmFtcykgOiBwYXJhbXM7XG4gICAgY29uc3Qgb3B0aW9uczogc3RyaW5nW10gPSBbXTtcbiAgICBjb25zdCB0YXJnZXRTZXQgPSBuZXcgU2V0KFsgdGFyZ2V0LnRhcmdldE5hbWUgXSk7XG4gICAgdGhpcy5fX2dldEFsbENvbXBpbGVPcHRpb25zKG9wdGlvbnMsIHRhcmdldFNldCwgdGFyZ2V0LmdldENvbXBpbGVPcHRpb25zKCkpO1xuICAgIHRoaXMuX19nZXRBbGxDb21waWxlT3B0aW9ucyhvcHRpb25zLCB0YXJnZXRTZXQsIHRhcmdldC5nZXRQdWJsaWNMaWJyYXJpZXMoKSk7XG4gICAgcmV0dXJuIG9wdGlvbnMuZmxhdCgpO1xuICB9XG5cbiAgcHJpdmF0ZSBfX2dldExpbmtPcHRpb25zKG9wdGlvbnM6IEFycmF5PHN0cmluZ3xzdHJpbmdbXT4sIHRhcmdldFNldDogU2V0PHN0cmluZz4sIGxpc3Q6IEFycmF5PHN0cmluZ3xzdHJpbmdbXT4gfCBBcnJheTxUYXJnZXROYW1lPikge1xuICAgIGZvciAoY29uc3QgaXRlciBvZiBsaXN0KSB7XG4gICAgICBpZiAoaXRlciBpbnN0YW5jZW9mIFRhcmdldE5hbWUpIHtcbiAgICAgICAgaWYgKCF0YXJnZXRTZXQuaGFzKGl0ZXIudGFyZ2V0TmFtZSkpIHtcbiAgICAgICAgICB0YXJnZXRTZXQuYWRkKGl0ZXIudGFyZ2V0TmFtZSk7XG4gICAgICAgICAgY29uc3QgdGFyZ2V0ID0gdGhpcy5nZXQoaXRlci50YXJnZXROYW1lKTtcbiAgICAgICAgICB0aGlzLl9fZ2V0TGlua09wdGlvbnMob3B0aW9ucywgdGFyZ2V0U2V0LCB0YXJnZXQuZ2V0UHVibGljTGlua09wdGlvbnMoKSk7XG4gICAgICAgICAgdGhpcy5fX2dldExpbmtPcHRpb25zKG9wdGlvbnMsIHRhcmdldFNldCwgdGFyZ2V0LmdldFB1YmxpY0xpYnJhcmllcygpKTtcbiAgICAgICAgfVxuICAgICAgfVxuICAgICAgZWxzZSBpZiAodHlwZW9mIGl0ZXIgPT09IFwic3RyaW5nXCIpIHtcbiAgICAgICAgaWYgKCFvcHRpb25zLmluY2x1ZGVzKGl0ZXIpKVxuICAgICAgICAgIG9wdGlvbnMucHVzaChpdGVyKTtcbiAgICAgIH1cbiAgICAgIGVsc2UgaWYgKEFycmF5LmlzQXJyYXkoaXRlcikpIHtcbiAgICAgICAgLy8gVE9ETzogQWRkIGNvbXBhcmUgZm9yIHNhbWUgYXJyYXkgaW4gb3B0aW9uc1xuICAgICAgICBvcHRpb25zLnB1c2goaXRlcik7XG4gICAgICB9XG4gICAgICBlbHNlIHtcbiAgICAgICAgdGhyb3cgbmV3IEVycm9yKGBOb3Qgc3VwcG9ydCBpbnN0YW5jZSAke2l0ZXJ9YCk7XG4gICAgICB9XG4gICAgfVxuICB9XG5cbiAgcHVibGljIGFsbExpbmtPcHRpb25zT2YocGFyYW1zOiBzdHJpbmcgfCBNYWluVGFyZ2V0KSB7XG4gICAgY29uc3QgdGFyZ2V0ID0gKHR5cGVvZiBwYXJhbXMgPT09IFwic3RyaW5nXCIpID8gdGhpcy5nZXQocGFyYW1zKSA6IHBhcmFtcztcbiAgICBjb25zdCBvcHRpb25zOiBzdHJpbmdbXSA9IFtdO1xuICAgIGNvbnN0IHRhcmdldFNldCA9IG5ldyBTZXQoWyB0YXJnZXQudGFyZ2V0TmFtZSBdKTtcbiAgICB0aGlzLl9fZ2V0TGlua09wdGlvbnMob3B0aW9ucywgdGFyZ2V0U2V0LCB0YXJnZXQuZ2V0TGlua09wdGlvbnMoKSk7XG4gICAgdGhpcy5fX2dldExpbmtPcHRpb25zKG9wdGlvbnMsIHRhcmdldFNldCwgdGFyZ2V0LmdldFB1YmxpY0xpYnJhcmllcygpKTtcbiAgICByZXR1cm4gb3B0aW9ucy5mbGF0KCk7XG4gIH1cbn1cbiIsIi8qXG4gKiBNSVQgTGljZW5zZVxuICpcbiAqIENvcHlyaWdodCAoYykgMjAyNSAgWXVyaWkgWWFrdWJpbiAoeXVyaWkueWFrdWJpbkBnbWFpbC5jb20pXG4gKlxuICogUGVybWlzc2lvbiBpcyBncmFudGVkIHRvIHVzZSwgY29weSwgbW9kaWZ5LCBhbmQgZGlzdHJpYnV0ZSB0aGlzIHNvZnR3YXJlXG4gKiB1bmRlciB0aGUgTUlUIExpY2Vuc2UuIFNlZSBMSUNFTlNFIGZpbGUgZm9yIGRldGFpbHMuXG4gKi9cblxuaW1wb3J0IHsgU2ltcGxlT2JqZWN0IH0gZnJvbSBcIkAvY29yZS9TaW1wbGVPYmplY3RcIjtcblxuY29uc3QgTkFNRSA9IFN5bWJvbChcIk5BTUVcIik7XG5cbmV4cG9ydCBjbGFzcyBUYXJnZXRGaWxlIHtcbiAgcHJpdmF0ZSBbTkFNRV06IHN0cmluZztcblxuICBwcml2YXRlIGNvbnN0cnVjdG9yKHRhcmdldE5hbWU6IHN0cmluZykge1xuICAgIHRoaXNbTkFNRV0gPSB0YXJnZXROYW1lO1xuICB9XG5cbiAgcHVibGljIHN0YXRpYyBjcmVhdGUobmFtZTogc3RyaW5nKSB7XG4gICAgcmV0dXJuIE9iamVjdC5zZWFsKG5ldyBUYXJnZXRGaWxlKG5hbWUpKTtcbiAgfVxuXG4gIHB1YmxpYyBzdGF0aWMgZnJvbUpTT04ob2JqZWN0OiBTaW1wbGVPYmplY3QpIHtcbiAgICByZXR1cm4gVGFyZ2V0RmlsZS5jcmVhdGUob2JqZWN0LnRhcmdldE5hbWUgYXMgc3RyaW5nKTtcbiAgfVxuXG4gIHB1YmxpYyBnZXQgdGFyZ2V0TmFtZSgpOiBzdHJpbmcge1xuICAgIHJldHVybiB0aGlzW05BTUVdO1xuICB9XG5cbiAgcHVibGljIHRvU3RyaW5nKCk6IHN0cmluZyB7XG4gICAgcmV0dXJuIFwiJHtcIiArIHRoaXNbTkFNRV0gKyBcIi5maWxlfVwiO1xuICB9XG5cbiAgcHVibGljIHRvSlNPTigpOiBTaW1wbGVPYmplY3Qge1xuICAgIHJldHVybiB7XG4gICAgICB0eXBlOiBUYXJnZXRGaWxlLm5hbWUsXG4gICAgICB0YXJnZXROYW1lOiB0aGlzW05BTUVdLFxuICAgIH1cbiAgfVxufTtcblxuU2ltcGxlT2JqZWN0LnJlZ2lzdGVySW5zdGFuY2VDcmVhdG9yKFRhcmdldEZpbGUubmFtZSwgVGFyZ2V0RmlsZS5mcm9tSlNPTik7XG4iLCIvKlxuICogTUlUIExpY2Vuc2VcbiAqXG4gKiBDb3B5cmlnaHQgKGMpIDIwMjUgIFl1cmlpIFlha3ViaW4gKHl1cmlpLnlha3ViaW5AZ21haWwuY29tKVxuICpcbiAqIFBlcm1pc3Npb24gaXMgZ3JhbnRlZCB0byB1c2UsIGNvcHksIG1vZGlmeSwgYW5kIGRpc3RyaWJ1dGUgdGhpcyBzb2Z0d2FyZVxuICogdW5kZXIgdGhlIE1JVCBMaWNlbnNlLiBTZWUgTElDRU5TRSBmaWxlIGZvciBkZXRhaWxzLlxuICovXG5cbmltcG9ydCB7IExvZ2dlciB9IGZyb20gXCJAL2xvZ2dlclwiO1xuXG5jb25zdCBsb2dnZXIgPSBMb2dnZXIuY3JlYXRlKGltcG9ydC5tZXRhLnVybCk7XG5cbmV4cG9ydCBuYW1lc3BhY2UgVGFyZ2V0SGVscGVyIHtcblxuZnVuY3Rpb24gY29udmVydFZhbHVlVG9EZWZpbml0aW9uKHZhbHVlOiBhbnkpOiBzdHJpbmcge1xuICBpZiAodmFsdWUgPT09IHVuZGVmaW5lZClcbiAgICB0aHJvdyBgRGVmaW5pdGlvbiB1bmRlZmluZWRgO1xuICBpZiAodHlwZW9mIHZhbHVlID09PSBcIm9iamVjdFwiKVxuICAgIHJldHVybiAnXCInICsgSlNPTi5zdHJpbmdpZnkodmFsdWUpICsgJ1wiJztcbiAgcmV0dXJuIHZhbHVlLnRvU3RyaW5nKCk7XG59XG5cbmV4cG9ydCBmdW5jdGlvbiBub3JtYWxpemVEZWZpbml0aW9ucyhkZWZpbml0aW9uczogYW55W10pOiBzdHJpbmdbXSB7XG4gIGNvbnN0IHJlc3VsdCA9IFtdO1xuICBmb3IgKGNvbnN0IGl0ZXIgb2YgZGVmaW5pdGlvbnMpIHtcbiAgICBpZiAodHlwZW9mIGl0ZXIgPT09IFwic3RyaW5nXCIpXG4gICAgICByZXN1bHQucHVzaChpdGVyKTtcbiAgICBlbHNlIGlmICghaXRlcilcbiAgICAgIHRocm93IG5ldyBFcnJvcihgRGVmZW5pdGlvbiAke2l0ZXJ9IG5vdCBzdXBwb3J0ZWRgKVxuICAgIGVsc2UgaWYgKHR5cGVvZiBpdGVyID09PSBcIm9iamVjdFwiKSB7XG4gICAgICBmb3IgKGNvbnN0IFtrZXksIHZhbF0gb2YgT2JqZWN0LmVudHJpZXMoaXRlcikpXG4gICAgICAgIHJlc3VsdC5wdXNoKGAke2tleX09JHtjb252ZXJ0VmFsdWVUb0RlZmluaXRpb24odmFsKX1gKTtcbiAgICB9XG4gICAgZWxzZVxuICAgICAgdGhyb3cgbmV3IEVycm9yKGBEZWZlbml0aW9uICR7aXRlcn0gbm90IHN1cHBvcnRlZGApXG4gIH1cbiAgcmV0dXJuIHJlc3VsdDtcbn1cblxufSAvLyBuYW1lc3BhY2UgbmFtZXNwYWNlXG4iLCIvKlxuICogTUlUIExpY2Vuc2VcbiAqXG4gKiBDb3B5cmlnaHQgKGMpIDIwMjUgIFl1cmlpIFlha3ViaW4gKHl1cmlpLnlha3ViaW5AZ21haWwuY29tKVxuICpcbiAqIFBlcm1pc3Npb24gaXMgZ3JhbnRlZCB0byB1c2UsIGNvcHksIG1vZGlmeSwgYW5kIGRpc3RyaWJ1dGUgdGhpcyBzb2Z0d2FyZVxuICogdW5kZXIgdGhlIE1JVCBMaWNlbnNlLiBTZWUgTElDRU5TRSBmaWxlIGZvciBkZXRhaWxzLlxuICovXG5cbmltcG9ydCB7IFNpbXBsZU9iamVjdCB9IGZyb20gXCJAL2NvcmUvU2ltcGxlT2JqZWN0XCI7XG5cbmNvbnN0IE5BTUUgPSBTeW1ib2woXCJOQU1FXCIpO1xuXG5leHBvcnQgY2xhc3MgVGFyZ2V0SW5jbHVkZXMge1xuICBwcml2YXRlIFtOQU1FXTogc3RyaW5nO1xuXG4gIHByaXZhdGUgY29uc3RydWN0b3IobmFtZTogc3RyaW5nKSB7XG4gICAgdGhpc1tOQU1FXSA9IG5hbWU7XG4gIH1cblxuICBwdWJsaWMgc3RhdGljIGNyZWF0ZShuYW1lOiBzdHJpbmcpIHtcbiAgICByZXR1cm4gT2JqZWN0LnNlYWwobmV3IFRhcmdldEluY2x1ZGVzKG5hbWUpKTtcbiAgfVxuXG4gIHB1YmxpYyBzdGF0aWMgZnJvbUpTT04ob2JqZWN0OiBTaW1wbGVPYmplY3QpIHtcbiAgICByZXR1cm4gVGFyZ2V0SW5jbHVkZXMuY3JlYXRlKG9iamVjdC50YXJnZXROYW1lIGFzIHN0cmluZyk7XG4gIH1cblxuICBwdWJsaWMgZ2V0IHRhcmdldE5hbWUoKTogc3RyaW5nIHtcbiAgICByZXR1cm4gdGhpc1tOQU1FXTtcbiAgfVxuXG4gIHB1YmxpYyB0b1N0cmluZygpOiBzdHJpbmcge1xuICAgIHJldHVybiBcIiR7XCIgKyB0aGlzW05BTUVdICsgXCIuaW5jbHVkZXN9XCI7XG4gIH1cblxuICBwdWJsaWMgdG9KU09OKCk6IFNpbXBsZU9iamVjdCB7XG4gICAgcmV0dXJuIHtcbiAgICAgIHR5cGU6IFRhcmdldEluY2x1ZGVzLm5hbWUsXG4gICAgICB0YXJnZXROYW1lOiB0aGlzW05BTUVdLFxuICAgIH1cbiAgfVxuXG4gIHB1YmxpYyBzdGF0aWMgZW5zdXJlSW5zdGFuY2UodmFsdWU6IGFueSkge1xuICAgIGlmICh2YWx1ZSBpbnN0YW5jZW9mIFRhcmdldEluY2x1ZGVzKVxuICAgICAgcmV0dXJuIHZhbHVlO1xuICAgIHRocm93IG5ldyBFcnJvcihgVGhlICcke3ZhbHVlfScgaXMgbm90IGEgVGFyZ2V0SW5jbHVkZXNgKTtcbiAgfVxufTtcblxuU2ltcGxlT2JqZWN0LnJlZ2lzdGVySW5zdGFuY2VDcmVhdG9yKFRhcmdldEluY2x1ZGVzLm5hbWUsIFRhcmdldEluY2x1ZGVzLmZyb21KU09OKTtcbiIsIi8qXG4gKiBNSVQgTGljZW5zZVxuICpcbiAqIENvcHlyaWdodCAoYykgMjAyNSAgWXVyaWkgWWFrdWJpbiAoeXVyaWkueWFrdWJpbkBnbWFpbC5jb20pXG4gKlxuICogUGVybWlzc2lvbiBpcyBncmFudGVkIHRvIHVzZSwgY29weSwgbW9kaWZ5LCBhbmQgZGlzdHJpYnV0ZSB0aGlzIHNvZnR3YXJlXG4gKiB1bmRlciB0aGUgTUlUIExpY2Vuc2UuIFNlZSBMSUNFTlNFIGZpbGUgZm9yIGRldGFpbHMuXG4gKi9cblxuaW1wb3J0IHsgU2ltcGxlT2JqZWN0IH0gZnJvbSBcIkAvY29yZS9TaW1wbGVPYmplY3RcIjtcblxuY29uc3QgTkFNRSA9IFN5bWJvbChcIk5BTUVcIik7XG5cbmV4cG9ydCBjbGFzcyBUYXJnZXROYW1lIHtcbiAgcHJpdmF0ZSBbTkFNRV06IHN0cmluZztcblxuICBwcml2YXRlIGNvbnN0cnVjdG9yKG5hbWU6IHN0cmluZykge1xuICAgIHRoaXNbTkFNRV0gPSBuYW1lO1xuICB9XG5cbiAgcHVibGljIHN0YXRpYyBjcmVhdGUobmFtZTogc3RyaW5nKSB7XG4gICAgcmV0dXJuIE9iamVjdC5zZWFsKG5ldyBUYXJnZXROYW1lKG5hbWUpKTtcbiAgfVxuXG4gIHB1YmxpYyBzdGF0aWMgZnJvbUpTT04ob2JqZWN0OiBTaW1wbGVPYmplY3QpIHtcbiAgICByZXR1cm4gVGFyZ2V0TmFtZS5jcmVhdGUob2JqZWN0LnRhcmdldE5hbWUgYXMgc3RyaW5nKTtcbiAgfVxuXG4gIHB1YmxpYyBnZXQgdGFyZ2V0TmFtZSgpOiBzdHJpbmcge1xuICAgIHJldHVybiB0aGlzW05BTUVdO1xuICB9XG5cbiAgcHVibGljIHRvU3RyaW5nKCk6IHN0cmluZyB7XG4gICAgcmV0dXJuIFwiJHtcIiArIHRoaXNbTkFNRV0gKyBcIi5saW5rfVwiO1xuICB9XG5cbiAgcHVibGljIHRvSlNPTigpOiBTaW1wbGVPYmplY3Qge1xuICAgIHJldHVybiB7XG4gICAgICB0eXBlOiBUYXJnZXROYW1lLm5hbWUsXG4gICAgICB0YXJnZXROYW1lOiB0aGlzW05BTUVdLFxuICAgIH1cbiAgfVxufTtcblxuU2ltcGxlT2JqZWN0LnJlZ2lzdGVySW5zdGFuY2VDcmVhdG9yKFRhcmdldE5hbWUubmFtZSwgVGFyZ2V0TmFtZS5mcm9tSlNPTik7XG4iLCIvKlxuICogTUlUIExpY2Vuc2VcbiAqXG4gKiBDb3B5cmlnaHQgKGMpIDIwMjUgIFl1cmlpIFlha3ViaW4gKHl1cmlpLnlha3ViaW5AZ21haWwuY29tKVxuICpcbiAqIFBlcm1pc3Npb24gaXMgZ3JhbnRlZCB0byB1c2UsIGNvcHksIG1vZGlmeSwgYW5kIGRpc3RyaWJ1dGUgdGhpcyBzb2Z0d2FyZVxuICogdW5kZXIgdGhlIE1JVCBMaWNlbnNlLiBTZWUgTElDRU5TRSBmaWxlIGZvciBkZXRhaWxzLlxuICovXG5cbmltcG9ydCB7IFNpbXBsZU9iamVjdCB9IGZyb20gXCJAL2NvcmUvU2ltcGxlT2JqZWN0XCI7XG5cbmNvbnN0IE5BTUUgPSBTeW1ib2woXCJOQU1FXCIpO1xuXG5leHBvcnQgY2xhc3MgVGFyZ2V0T2JqZWN0cyB7XG4gIHByaXZhdGUgW05BTUVdOiBzdHJpbmc7XG5cbiAgcHJpdmF0ZSBjb25zdHJ1Y3RvcihuYW1lOiBzdHJpbmcpIHtcbiAgICB0aGlzW05BTUVdID0gbmFtZTtcbiAgfVxuXG4gIHB1YmxpYyBzdGF0aWMgY3JlYXRlKG5hbWU6IHN0cmluZykge1xuICAgIHJldHVybiBPYmplY3Quc2VhbChuZXcgVGFyZ2V0T2JqZWN0cyhuYW1lKSk7XG4gIH1cblxuICBwdWJsaWMgc3RhdGljIGZyb21KU09OKG9iamVjdDogU2ltcGxlT2JqZWN0KSB7XG4gICAgcmV0dXJuIFRhcmdldE9iamVjdHMuY3JlYXRlKG9iamVjdC50YXJnZXROYW1lIGFzIHN0cmluZyk7XG4gIH1cblxuICBwdWJsaWMgc3RhdGljIGVuc3VyZUluc3RhbmNlKHZhbHVlOiBhbnkpOiBUYXJnZXRPYmplY3RzIHtcbiAgICBpZiAodmFsdWUgaW5zdGFuY2VvZiBUYXJnZXRPYmplY3RzKVxuICAgICAgcmV0dXJuIHZhbHVlO1xuICAgIHRocm93IG5ldyBFcnJvcihgVGhlICcke3ZhbHVlfScgaXMgbm90IGEgVGFyZ2V0T2JqZWN0c2ApO1xuICB9XG5cbiAgcHVibGljIGdldCB0YXJnZXROYW1lKCk6IHN0cmluZyB7XG4gICAgcmV0dXJuIHRoaXNbTkFNRV07XG4gIH1cblxuICBwdWJsaWMgdG9TdHJpbmcoKTogc3RyaW5nIHtcbiAgICByZXR1cm4gXCIke1wiICsgdGhpc1tOQU1FXSArIFwiLm9iamVjdHN9XCI7XG4gIH1cblxuICBwdWJsaWMgdG9KU09OKCk6IFNpbXBsZU9iamVjdCB7XG4gICAgcmV0dXJuIHtcbiAgICAgIHR5cGU6IFRhcmdldE9iamVjdHMubmFtZSxcbiAgICAgIHRhcmdldE5hbWU6IHRoaXNbTkFNRV0sXG4gICAgfVxuICB9XG59O1xuXG5TaW1wbGVPYmplY3QucmVnaXN0ZXJJbnN0YW5jZUNyZWF0b3IoVGFyZ2V0T2JqZWN0cy5uYW1lLCBUYXJnZXRPYmplY3RzLmZyb21KU09OKTtcbiIsIi8qXG4gKiBNSVQgTGljZW5zZVxuICpcbiAqIENvcHlyaWdodCAoYykgMjAyNSAgWXVyaWkgWWFrdWJpbiAoeXVyaWkueWFrdWJpbkBnbWFpbC5jb20pXG4gKlxuICogUGVybWlzc2lvbiBpcyBncmFudGVkIHRvIHVzZSwgY29weSwgbW9kaWZ5LCBhbmQgZGlzdHJpYnV0ZSB0aGlzIHNvZnR3YXJlXG4gKiB1bmRlciB0aGUgTUlUIExpY2Vuc2UuIFNlZSBMSUNFTlNFIGZpbGUgZm9yIGRldGFpbHMuXG4gKi9cblxuaW1wb3J0IHsgUHJvamVjdENvbnRleHQgfSBmcm9tIFwiQC9jb3JlL1Byb2plY3RDb250ZXh0XCI7XG5pbXBvcnQgeyBWYXJpYWJsZU1hcCB9IGZyb20gXCJAL2NvcmUvU2NvcGVcIjtcbmltcG9ydCB7IEdlbmVyYWxDb250ZXh0IH0gZnJvbSBcIkAvY29yZS9CYXNlQ29udGV4dFwiO1xuaW1wb3J0IHsgY3JlYXRlQ29udGV4dCB9IGZyb20gXCJAL2NvcmUvQmFzZUNvbnRleHRcIjtcblxuY29uc3QgR0xPQkFMID0gU3ltYm9sKFwiR0xPQkFMXCIpO1xuY29uc3QgU0NPUEUgPSBTeW1ib2woXCJTQ09QRVwiKTtcblxuZXhwb3J0IGNsYXNzIFRvb2xjaGFpbkNvbnRleHQgZXh0ZW5kcyBHZW5lcmFsQ29udGV4dCB7XG4gIFtTQ09QRV06IFZhcmlhYmxlTWFwO1xuICBbR0xPQkFMXTogUHJvamVjdENvbnRleHQ7XG5cbiAgY29uc3RydWN0b3IoZ2xvYmFsOiBQcm9qZWN0Q29udGV4dCwgc2NvcGU6IFZhcmlhYmxlTWFwKSB7XG4gICAgc3VwZXIoc2NvcGUpO1xuICAgIHRoaXNbR0xPQkFMXSA9IGdsb2JhbDtcbiAgICB0aGlzW1NDT1BFXSA9IHNjb3BlO1xuICB9XG5cbiAgcHVibGljIHN0YXRpYyBjcmVhdGUoZ2xvYmFsOiBQcm9qZWN0Q29udGV4dCwgdmFyaWFibGVNYXA6IFZhcmlhYmxlTWFwKSB7XG4gICAgcmV0dXJuIGNyZWF0ZUNvbnRleHQobmV3IFRvb2xjaGFpbkNvbnRleHQoZ2xvYmFsLCB2YXJpYWJsZU1hcCkpO1xuICB9XG59O1xuIiwiLypcbiAqIE1JVCBMaWNlbnNlXG4gKlxuICogQ29weXJpZ2h0IChjKSAyMDI1ICBZdXJpaSBZYWt1YmluICh5dXJpaS55YWt1YmluQGdtYWlsLmNvbSlcbiAqXG4gKiBQZXJtaXNzaW9uIGlzIGdyYW50ZWQgdG8gdXNlLCBjb3B5LCBtb2RpZnksIGFuZCBkaXN0cmlidXRlIHRoaXMgc29mdHdhcmVcbiAqIHVuZGVyIHRoZSBNSVQgTGljZW5zZS4gU2VlIExJQ0VOU0UgZmlsZSBmb3IgZGV0YWlscy5cbiAqL1xuXG5leHBvcnQgY29uc3QgREVCVUdfQlVJTERfVFlQRSA9IFwiRGVidWdcIjtcbmV4cG9ydCBjb25zdCBSRUxFQVNFX0JVSUxEX1RZUEUgPSBcIlJlbGVhc2VcIjtcbiIsIi8qXG4gKiBNSVQgTGljZW5zZVxuICpcbiAqIENvcHlyaWdodCAoYykgMjAyNSAgWXVyaWkgWWFrdWJpbiAoeXVyaWkueWFrdWJpbkBnbWFpbC5jb20pXG4gKlxuICogUGVybWlzc2lvbiBpcyBncmFudGVkIHRvIHVzZSwgY29weSwgbW9kaWZ5LCBhbmQgZGlzdHJpYnV0ZSB0aGlzIHNvZnR3YXJlXG4gKiB1bmRlciB0aGUgTUlUIExpY2Vuc2UuIFNlZSBMSUNFTlNFIGZpbGUgZm9yIGRldGFpbHMuXG4gKi9cblxuaW1wb3J0IHsgSU1ha2VDb250ZXh0LCBJbnRlcmZhY2VTY3JpcHQgfSBmcm9tIFwiQC9jb3JlL01ha2VJbnRlcmZhY2VzXCI7XG5pbXBvcnQgeyBWYXJpYW50TWFwLCBWYXJpYWJsZU1hcCwgU2NvcGVIZWxwZXIgfSBmcm9tIFwiQC9jb3JlL1Njb3BlXCI7XG5pbXBvcnQgeyBTeXN0ZW1TY29wZSB9IGZyb20gXCJAL2NvcmUvU3lzdGVtU2NvcGVcIjtcbmltcG9ydCB7IEdlbmVyYWxDb250ZXh0LCBNYWtlQ29udGV4dCwgY3JlYXRlQ29udGV4dCB9IGZyb20gXCJAL2NvcmUvQmFzZUNvbnRleHRcIjtcbmltcG9ydCB7IFRhcmdldFR5cGUsIE1haW5UYXJnZXQgfSBmcm9tIFwiQC9jb3JlL1RhcmdldFwiO1xuaW1wb3J0IHsgVXNlclRhcmdldFN0cnVjdCB9IGZyb20gXCJAL2NvcmUvVXNlclRhcmdldFN0cnVjdFwiO1xuaW1wb3J0IHsgQUxMX1RBUkdFVCwgSU5TVEFMTF9UQVJHRVQgfSBmcm9tIFwiQC9Db25zdGFudHNcIjtcbmltcG9ydCB7IExvZ2dlciB9IGZyb20gXCJAL2xvZ2dlclwiO1xuXG5jb25zdCBsb2dnZXIgPSBMb2dnZXIuY3JlYXRlKGltcG9ydC5tZXRhLnVybCk7XG5cbmNvbnN0IFNDT1BFID0gU3ltYm9sKFwiU0NPUEVcIik7XG5jb25zdCBJTVBMID0gU3ltYm9sKFwiSU1QTFwiKTtcblxuZnVuY3Rpb24gY3JlYXRlTWFpblRhcmdldEltcGwoY3R4OiBNYWtlQ29udGV4dCwgc2NvcGU6IFN5c3RlbVNjb3BlLCB0eXBlOiBUYXJnZXRUeXBlLCBuYW1lOiBzdHJpbmcpIHtcbiAgaWYgKHR5cGVvZiBuYW1lICE9PSBcInN0cmluZ1wiKVxuICAgIHRocm93IG5ldyBFcnJvcihgVGFyZ2V0IFwiJHtuYW1lfVwiIGlzIG5vdCBzdHJpbmcgdHlwZWApO1xuXG4gIGlmICghbmFtZSlcbiAgICB0aHJvdyBuZXcgRXJyb3IoYEEgdGFyZ2V0IHdpdGggYW4gZW1wdHkgbmFtZSBjYW5ub3QgZXhpc3RgKTtcblxuICBpZiAoY3R4Lmhhc01haW5UYXJnZXQobmFtZSkpXG4gICAgdGhyb3cgbmV3IEVycm9yKGBUYXJnZXQgXCIke25hbWV9XCIgZXhpc3RzYCk7XG5cbiAgaWYgKFsgQUxMX1RBUkdFVCwgSU5TVEFMTF9UQVJHRVQgXS5pbmNsdWRlcyhuYW1lKSlcbiAgICB0aHJvdyBuZXcgRXJyb3IoYFRhcmdldCBcIiR7bmFtZX1cIiBpcyByZXNlcnZlZCBuYW1lYCk7XG5cbiAgY29uc3QgdGFyZ2V0ID0gTWFpblRhcmdldC5jcmVhdGUodHlwZSwgbmFtZSwgc2NvcGUuU09VUkNFX0RJUiwgc2NvcGUuQklOQVJZX0RJUik7XG4gIGN0eC5hZGRNYWluVGFyZ2V0KG5hbWUsIHRhcmdldCk7XG4gIHJldHVybiB0YXJnZXQ7XG59XG5cbmV4cG9ydCBjbGFzcyBVc2VyTWFrZUNvbnRleHQgZXh0ZW5kcyBHZW5lcmFsQ29udGV4dCBpbXBsZW1lbnRzIElNYWtlQ29udGV4dCB7XG4gIFtJTVBMXTogTWFrZUNvbnRleHQ7XG4gIFtTQ09QRV06IFN5c3RlbVNjb3BlO1xuXG4gIHB1YmxpYyBjb25zdHJ1Y3RvcihpbXBsOiBNYWtlQ29udGV4dCwgdmFyaWFibGVNYXA6IFZhcmlhYmxlTWFwKSB7XG4gICAgc3VwZXIodmFyaWFibGVNYXApO1xuICAgIHRoaXNbSU1QTF0gPSBpbXBsO1xuICAgIHRoaXNbU0NPUEVdID0gU2NvcGVIZWxwZXIuY3JlYXRlUHJveHkodmFyaWFibGVNYXApO1xuICB9XG5cbiAgcHVibGljIHN0YXRpYyBjcmVhdGUoaW1wbDogTWFrZUNvbnRleHQsIHZhcmlhYmxlTWFwOiBWYXJpYWJsZU1hcCkge1xuICAgIHJldHVybiBjcmVhdGVDb250ZXh0KG5ldyBVc2VyTWFrZUNvbnRleHQoaW1wbCwgdmFyaWFibGVNYXApKTtcbiAgfVxuXG4gIHB1YmxpYyBnZXRDYWNoZVZhcmlhYmxlcygpIHtcbiAgICByZXR1cm4gdGhpc1tJTVBMXS5nZXRDYWNoZVZhcmlhYmxlcygpO1xuICB9XG5cbiAgcHVibGljIGFkZENhY2hlVmFyaWFibGVzKHBhcmFtczogc3RyaW5nIHwgVmFyaWFudE1hcCk6IHZvaWQge1xuICAgIHRoaXNbSU1QTF0uYWRkQ2FjaGVWYXJpYWJsZXMocGFyYW1zKTtcbiAgfVxuXG4gIHB1YmxpYyBhZGRJbmNsdWRlRGlyZWN0b3JpZXMoLi4uZGlyczogYW55W10pOiBhbnkge1xuICAgIHRoaXNbSU1QTF0uYWRkSW5jbHVkZURpcmVjdG9yaWVzKC4uLmRpcnMpO1xuICB9XG5cbiAgcHVibGljIGFkZFN1YmRpcmVjdG9yeShzb3VyY2VEaXI6IGFueSwgYmluYXJ5RGlyPzogYW55KSB7XG4gICAgdGhpc1tJTVBMXS5hZGRTdWJkaXJlY3Rvcnkoc291cmNlRGlyLCBiaW5hcnlEaXIpO1xuICB9XG4gIFxuICBwdWJsaWMgYWRkQ3VzdG9tU2NyaXB0KHNjcmlwdDogYW55LCBwYXJhbXM6IGFueSk6IEludGVyZmFjZVNjcmlwdCB7XG4gICAgcmV0dXJuIHRoaXNbSU1QTF0uYWRkQ3VzdG9tU2NyaXB0KHNjcmlwdCwgcGFyYW1zKTtcbiAgfVxuXG4gIHB1YmxpYyB0YXJnZXQobmFtZTogc3RyaW5nKTogVXNlclRhcmdldFN0cnVjdCB7XG4gICAgcmV0dXJuIFVzZXJUYXJnZXRTdHJ1Y3QuY3JlYXRlKHRoaXNbSU1QTF0uZ2V0UG9zdFRhcmdldChuYW1lKSwgdGhpc1tTQ09QRV0pO1xuICB9XG5cbiAgcHVibGljIHNjcmlwdChuYW1lOiBzdHJpbmcpOiBJbnRlcmZhY2VTY3JpcHQge1xuICAgIHJldHVybiB0aGlzW0lNUExdLnNjcmlwdChuYW1lKTtcbiAgfVxuXG4gIHB1YmxpYyBpbnN0YWxsKHZhbHVlOiBhbnksIHBhcmFtczogYW55KTogdm9pZCB7XG4gICAgdGhpc1tJTVBMXS5pbnN0YWxsKHZhbHVlLCBwYXJhbXMpO1xuICB9XG5cbiAgcHVibGljIGFkZE9iamVjdExpYnJhcnkobmFtZTogc3RyaW5nLCAuLi5zb3VyY2VzOiBhbnlbXSk6IFVzZXJUYXJnZXRTdHJ1Y3Qge1xuICAgIGNvbnN0IHRhcmdldCA9IGNyZWF0ZU1haW5UYXJnZXRJbXBsKHRoaXNbSU1QTF0sIHRoaXNbU0NPUEVdLCBUYXJnZXRUeXBlLk9iamVjdExpYnJhcnksIG5hbWUpO1xuICAgIHRhcmdldC5zZXRQcmVmaXgodGhpc1tTQ09QRV0uT0JKRUNUX0xJQlJBUllfUFJFRklYKTtcbiAgICB0YXJnZXQuc2V0U3VmZml4KHRoaXNbU0NPUEVdLk9CSkVDVF9MSUJSQVJZX1NVRkZJWCk7XG4gICAgdGFyZ2V0LmFkZExpbmtPcHRpb25zKC4uLnRoaXNbU0NPUEVdLk9CSkVDVF9MSU5LRVJfRkxBR1MpO1xuXG4gICAgcmV0dXJuIFVzZXJUYXJnZXRTdHJ1Y3QuY3JlYXRlKHRhcmdldCwgdGhpc1tTQ09QRV0sIC4uLnNvdXJjZXMpO1xuICB9XG5cbiAgcHVibGljIGFkZFN0YXRpY0xpYnJhcnkobmFtZTogYW55LCAuLi5zb3VyY2VzOiBhbnlbXSk6IFVzZXJUYXJnZXRTdHJ1Y3Qge1xuICAgIGNvbnN0IHRhcmdldCA9IGNyZWF0ZU1haW5UYXJnZXRJbXBsKHRoaXNbSU1QTF0sIHRoaXNbU0NPUEVdLCBUYXJnZXRUeXBlLlN0YXRpY0xpYnJhcnksIG5hbWUpO1xuICAgIHRhcmdldC5zZXRQcmVmaXgodGhpc1tTQ09QRV0uU1RBVElDX0xJQlJBUllfUFJFRklYKTtcbiAgICB0YXJnZXQuc2V0U3VmZml4KHRoaXNbU0NPUEVdLlNUQVRJQ19MSUJSQVJZX1NVRkZJWCk7XG4gICAgdGFyZ2V0LmFkZExpbmtPcHRpb25zKC4uLnRoaXNbU0NPUEVdLlNUQVRJQ19MSU5LRVJfRkxBR1MpO1xuXG4gICAgcmV0dXJuIFVzZXJUYXJnZXRTdHJ1Y3QuY3JlYXRlKHRhcmdldCwgdGhpc1tTQ09QRV0sIC4uLnNvdXJjZXMpO1xuICB9XG5cbiAgcHVibGljIGFkZFNoYXJlZExpYnJhcnkobmFtZTogYW55LCAuLi5zb3VyY2VzOiBhbnlbXSk6IFVzZXJUYXJnZXRTdHJ1Y3Qge1xuICAgIGNvbnN0IHRhcmdldCA9IGNyZWF0ZU1haW5UYXJnZXRJbXBsKHRoaXNbSU1QTF0sIHRoaXNbU0NPUEVdLCBUYXJnZXRUeXBlLlNoYXJlZExpYnJhcnksIG5hbWUpO1xuICAgIHRhcmdldC5zZXRQcmVmaXgodGhpc1tTQ09QRV0uU0hBUkVEX0xJQlJBUllfUFJFRklYKTtcbiAgICB0YXJnZXQuc2V0U3VmZml4KHRoaXNbU0NPUEVdLlNIQVJFRF9MSUJSQVJZX1NVRkZJWCk7XG4gICAgdGFyZ2V0LmFkZExpbmtPcHRpb25zKC4uLnRoaXNbU0NPUEVdLlNIQVJFRF9MSU5LRVJfRkxBR1MpO1xuXG4gICAgcmV0dXJuIFVzZXJUYXJnZXRTdHJ1Y3QuY3JlYXRlKHRhcmdldCwgdGhpc1tTQ09QRV0sIC4uLnNvdXJjZXMpO1xuICB9XG5cbiAgcHVibGljIGFkZEV4ZWN1dGFibGUobmFtZTogYW55LCAuLi5zb3VyY2VzOiBhbnlbXSk6IFVzZXJUYXJnZXRTdHJ1Y3Qge1xuICAgIGNvbnN0IHRhcmdldCA9IGNyZWF0ZU1haW5UYXJnZXRJbXBsKHRoaXNbSU1QTF0sIHRoaXNbU0NPUEVdLCBUYXJnZXRUeXBlLkV4ZWN1dGFibGUsIG5hbWUpO1xuICAgIHRhcmdldC5zZXRQcmVmaXgodGhpc1tTQ09QRV0uRVhFQ1VUQUJMRV9TVUZGSVgpO1xuICAgIHRhcmdldC5hZGRMaW5rT3B0aW9ucyguLi50aGlzW1NDT1BFXS5FWEVfTElOS0VSX0ZMQUdTKTtcblxuICAgIHJldHVybiBVc2VyVGFyZ2V0U3RydWN0LmNyZWF0ZSh0YXJnZXQsIHRoaXNbU0NPUEVdLCAuLi5zb3VyY2VzKTtcbiAgfVxuXG4gIHB1YmxpYyBleGVjdXRlU2NyaXB0KHNjcmlwdDogYW55LCBwYXJhbXM6IGFueSk6IHZvaWQge1xuICAgIHRoaXNbSU1QTF0uZXhlY3V0ZVNjcmlwdChzY3JpcHQsIHBhcmFtcyk7XG4gIH1cbn07XG4iLCIvKlxuICogTUlUIExpY2Vuc2VcbiAqXG4gKiBDb3B5cmlnaHQgKGMpIDIwMjUgIFl1cmlpIFlha3ViaW4gKHl1cmlpLnlha3ViaW5AZ21haWwuY29tKVxuICpcbiAqIFBlcm1pc3Npb24gaXMgZ3JhbnRlZCB0byB1c2UsIGNvcHksIG1vZGlmeSwgYW5kIGRpc3RyaWJ1dGUgdGhpcyBzb2Z0d2FyZVxuICogdW5kZXIgdGhlIE1JVCBMaWNlbnNlLiBTZWUgTElDRU5TRSBmaWxlIGZvciBkZXRhaWxzLlxuICovXG5cbmltcG9ydCB7IEludGVyZmFjZVNvdXJjZUZpbGVzIH0gZnJvbSBcIkAvY29yZS9NYWtlSW50ZXJmYWNlc1wiO1xuaW1wb3J0IHsgU291cmNlRmlsZSB9IGZyb20gXCJAL2NvcmUvU291cmNlRmlsZVwiO1xuaW1wb3J0IHsgVGFyZ2V0SGVscGVyIH0gZnJvbSBcIkAvY29yZS9UYXJnZXRIZWxwZXJcIjtcbmltcG9ydCB7IEJhc2VUYXJnZXQgfSBmcm9tIFwiQC9jb3JlL1RhcmdldFwiO1xuXG5jb25zdCBUQVJHRVQgPSBTeW1ib2woXCJUQVJHRVRcIik7XG5jb25zdCBTT1VSQ0VTID0gU3ltYm9sKFwiU09VUkNFU1wiKTtcblxuZXhwb3J0IGNsYXNzIFVzZXJTb3VyY2VGaWxlcyBleHRlbmRzIEludGVyZmFjZVNvdXJjZUZpbGVzIHtcbiAgcHJpdmF0ZSBbVEFSR0VUXTogQmFzZVRhcmdldDtcbiAgcHJpdmF0ZSBbU09VUkNFU106IFNvdXJjZUZpbGVbXTtcblxuICBwcml2YXRlIGNvbnN0cnVjdG9yKHRhcmdldDogQmFzZVRhcmdldCwgc291cmNlczogU291cmNlRmlsZVtdKSB7XG4gICAgc3VwZXIoKTtcbiAgICB0aGlzW1RBUkdFVF0gPSB0YXJnZXQ7XG4gICAgdGhpc1tTT1VSQ0VTXSA9IFsgLi4uc291cmNlcyBdO1xuICB9XG5cbiAgcHVibGljIHN0YXRpYyBjcmVhdGUodGFyZ2V0OiBCYXNlVGFyZ2V0LCBzb3VyY2VzOiBTb3VyY2VGaWxlW10pIHtcbiAgICByZXR1cm4gT2JqZWN0LnNlYWwobmV3IFVzZXJTb3VyY2VGaWxlcyh0YXJnZXQsIHNvdXJjZXMpKTtcbiAgfVxuXG4gIHB1YmxpYyBzZXRMYW5ndWFnZShsYW5ndWFnZTogc3RyaW5nKTogdm9pZCB7XG4gICAgdGhyb3cgbmV3IEVycm9yKFwiTm90IEltcGxlbWVudGVkXCIpO1xuICB9XG5cbiAgcHVibGljIGFkZERlZmluaXRpb25zKC4uLmRlZmluaXRpb25zOiBzdHJpbmdbXSkge1xuICAgIGZvciAoY29uc3QgaXRlciBvZiBUYXJnZXRIZWxwZXIubm9ybWFsaXplRGVmaW5pdGlvbnMoZGVmaW5pdGlvbnMuZmxhdCgpKSlcbiAgICAgIHRoaXNbU09VUkNFU10uZm9yRWFjaChpID0+IGkuYWRkRGVmaW5pdGlvbihpdGVyKSk7XG4gIH1cblxuICBwdWJsaWMgYWRkQ29tcGlsZUZsYWdzKC4uLmZsYWdzOiBzdHJpbmdbXSkge1xuICAgIGZvciAoY29uc3QgaXRlciBvZiBmbGFncy5mbGF0KCkpXG4gICAgICB0aGlzW1NPVVJDRVNdLmZvckVhY2goaSA9PiBpLkNPTVBJTEVfRkxBR1MucHVzaChpdGVyKSk7XG4gIH1cblxuICBwdWJsaWMgdG9KU09OKCk6IG9iamVjdCB7XG4gICAgcmV0dXJuIHRoaXNbU09VUkNFU107XG4gIH1cbn07XG4iLCIvKlxuICogTUlUIExpY2Vuc2VcbiAqXG4gKiBDb3B5cmlnaHQgKGMpIDIwMjUgIFl1cmlpIFlha3ViaW4gKHl1cmlpLnlha3ViaW5AZ21haWwuY29tKVxuICpcbiAqIFBlcm1pc3Npb24gaXMgZ3JhbnRlZCB0byB1c2UsIGNvcHksIG1vZGlmeSwgYW5kIGRpc3RyaWJ1dGUgdGhpcyBzb2Z0d2FyZVxuICogdW5kZXIgdGhlIE1JVCBMaWNlbnNlLiBTZWUgTElDRU5TRSBmaWxlIGZvciBkZXRhaWxzLlxuICovXG5cbmltcG9ydCB7IEludGVyZmFjZVRhcmdldCB9IGZyb20gXCJAL2NvcmUvTWFrZUludGVyZmFjZXNcIjtcbmltcG9ydCB7IEJhc2VUYXJnZXQgfSBmcm9tIFwiQC9jb3JlL1RhcmdldFwiO1xuaW1wb3J0IHsgU3lzdGVtU2NvcGUgfSBmcm9tIFwiQC9jb3JlL1N5c3RlbVNjb3BlXCI7XG5pbXBvcnQgeyBlbnN1cmVTdHJpbmcgfSBmcm9tIFwiQC91dGlscy9TdHJpY3RUeXBlXCI7XG5pbXBvcnQgeyBUYXJnZXRJbmNsdWRlcyB9IGZyb20gXCJAL2NvcmUvVGFyZ2V0SW5jbHVkZXNcIjtcbmltcG9ydCB7IFRhcmdldE9iamVjdHMgfSBmcm9tIFwiQC9jb3JlL1RhcmdldE9iamVjdHNcIjtcbmltcG9ydCB7IEFic29sdXRlUGF0aCB9IGZyb20gXCJAL2NvcmUvQWJzb2x1dGVQYXRoXCI7XG5pbXBvcnQgeyBTb3VyY2VGaWxlIH0gZnJvbSBcIkAvY29yZS9Tb3VyY2VGaWxlXCI7XG5pbXBvcnQgeyBVc2VyU291cmNlRmlsZXMgfSBmcm9tIFwiQC9jb3JlL1VzZXJTb3VyY2VGaWxlc1wiO1xuaW1wb3J0IHsgVGFyZ2V0RmlsZSB9IGZyb20gXCJAL2NvcmUvVGFyZ2V0RmlsZVwiO1xuaW1wb3J0IHsgVGFyZ2V0SGVscGVyIH0gZnJvbSBcIkAvY29yZS9UYXJnZXRIZWxwZXJcIjtcbmltcG9ydCB7IExvZ2dlciB9IGZyb20gXCJAL2xvZ2dlclwiO1xuXG5jb25zdCBsb2dnZXIgPSBMb2dnZXIuY3JlYXRlKGltcG9ydC5tZXRhLnVybCk7XG5cbmNvbnN0IFNDT1BFID0gU3ltYm9sKFwiU0NPUEVcIik7XG5jb25zdCBJTVBMID0gU3ltYm9sKFwiSU1QTFwiKTtcblxuY29uc3QgX2xhbmd1YWdlRXh0ZW5zaW9ucyA9IHtcbiAgQVNNOiBbIFwiLmFzbVwiLCBcIi5zXCIgXSxcbiAgQzogICBbIFwiLmNcIiBdLFxuICBDWFg6IFtcIi5jcHBcIiwgXCIuY2NcIiwgXCIuY3h4XCIgXSxcbn07XG5cbmZ1bmN0aW9uIGlzU3VwcG9ydExhbmd1YWdlKGxhbmd1YWdlOiBzdHJpbmcpIHtcbiAgcmV0dXJuIF9sYW5ndWFnZUV4dGVuc2lvbnMuaGFzT3duUHJvcGVydHkobGFuZ3VhZ2UpO1xufVxuXG5mdW5jdGlvbiBnZXRGaWxlTGFuZ3VhZ2UoZmlsZW5hbWU6IHN0cmluZykge1xuICBjb25zdCBmaWxlbmFtZUxvd2VyQ2FzZSA9IGZpbGVuYW1lLnRvTG93ZXJDYXNlKCk7XG4gIGZvciAoY29uc3QgW2xhbmd1YWdlLCBleHRlbnNpb25zXSBvZiBPYmplY3QuZW50cmllcyhfbGFuZ3VhZ2VFeHRlbnNpb25zKSkge1xuICAgIGZvciAoY29uc3QgaXRlciBvZiBleHRlbnNpb25zKSB7XG4gICAgICBpZiAoZmlsZW5hbWVMb3dlckNhc2UuZW5kc1dpdGgoaXRlcikpXG4gICAgICAgIHJldHVybiBsYW5ndWFnZTtcbiAgICB9XG4gIH1cbiAgcmV0dXJuIFwiXCI7XG59XG5cbmZ1bmN0aW9uIG1ha2VMYW5ndWFnZSh2YWx1ZTogc3RyaW5nKSB7XG4gIGlmIChpc1N1cHBvcnRMYW5ndWFnZSh2YWx1ZSkpXG4gICAgcmV0dXJuIHZhbHVlO1xuICB0aHJvdyBuZXcgRXJyb3IoYExhbmd1YWdlIFwiJHt2YWx1ZX1cIiBpcyBub3Qgc3VwcG9ydGVkYCk7XG59XG5cbmZ1bmN0aW9uIGFkZEluY2x1ZGVJbXBsKHRhcmdldDogQmFzZVRhcmdldCwgc291cmNlRGlyOiBBYnNvbHV0ZVBhdGgsIHB1YmxpY09ubHk6IGJvb2xlYW4sIGluY2x1ZGU6IFRhcmdldEluY2x1ZGVzIHwgQWJzb2x1dGVQYXRoIHwgc3RyaW5nKTogdm9pZCB7XG4gIGlmIChpbmNsdWRlIGluc3RhbmNlb2YgVGFyZ2V0SW5jbHVkZXMpXG4gICAgdGFyZ2V0LmFkZEluY2x1ZGUocHVibGljT25seSwgaW5jbHVkZSk7XG4gIGVsc2UgaWYgKHR5cGVvZiBpbmNsdWRlID09PSBcInN0cmluZ1wiKVxuICAgIHRhcmdldC5hZGRJbmNsdWRlKHB1YmxpY09ubHksIEFic29sdXRlUGF0aC5jcmVhdGUoc291cmNlRGlyLnJlc29sdmUoaW5jbHVkZSkpKTtcbiAgZWxzZSBpZiAoaW5jbHVkZSBpbnN0YW5jZW9mIEFic29sdXRlUGF0aClcbiAgICB0YXJnZXQuYWRkSW5jbHVkZShwdWJsaWNPbmx5LCBBYnNvbHV0ZVBhdGguY3JlYXRlKGluY2x1ZGUpKTtcbiAgZWxzZVxuICAgIHRocm93IG5ldyBFcnJvcihgTm90IHN1cHBvcnQgaW5zdGFuY2UgJHtpbmNsdWRlfWApO1xufVxuXG5mdW5jdGlvbiBhZGRJbmNsdWRlc0ltcGwodGFyZ2V0OiBCYXNlVGFyZ2V0LCBzY29wZTogU3lzdGVtU2NvcGUsIHB1YmxpY09ubHk6IGJvb2xlYW4sIC4uLmluY2x1ZGVzOiBBcnJheTxUYXJnZXRJbmNsdWRlcyB8IEFic29sdXRlUGF0aCB8IHN0cmluZz4pOiB2b2lkIHtcbiAgY29uc3Qgc291cmNlRGlyID0gc2NvcGUuU09VUkNFX0RJUjtcbiAgZm9yIChjb25zdCBpdGVyIG9mIGluY2x1ZGVzLmZsYXQoKSlcbiAgICBhZGRJbmNsdWRlSW1wbCh0YXJnZXQsIHNvdXJjZURpciwgcHVibGljT25seSwgaXRlcik7XG59XG5cbmZ1bmN0aW9uIGVuc3VyZUNtZFZhbHVlKHZhbHVlOiBhbnkpOiBzdHJpbmcgfCBBYnNvbHV0ZVBhdGggfCBUYXJnZXRGaWxlIHtcbiAgaWYgKHR5cGVvZiB2YWx1ZSA9PT0gXCJzdHJpbmdcIilcbiAgICByZXR1cm4gdmFsdWU7XG4gIGVsc2UgaWYgKHZhbHVlIGluc3RhbmNlb2YgVGFyZ2V0RmlsZSlcbiAgICByZXR1cm4gdmFsdWU7XG4gIGVsc2UgaWYgKHZhbHVlIGluc3RhbmNlb2YgQWJzb2x1dGVQYXRoKVxuICAgIHJldHVybiB2YWx1ZTtcbiAgZWxzZVxuICAgIHRocm93IG5ldyBUeXBlRXJyb3IoYFdyb25nIHR5cGUgJHt2YWx1ZX0gZm9yIGNvbW1hbmRgKTtcbn1cblxuZXhwb3J0IGNsYXNzIFVzZXJUYXJnZXRTdHJ1Y3QgZXh0ZW5kcyBJbnRlcmZhY2VUYXJnZXQge1xuICBbSU1QTF06IEJhc2VUYXJnZXQ7XG4gIFtTQ09QRV06IFN5c3RlbVNjb3BlO1xuXG4gIHByaXZhdGUgY29uc3RydWN0b3IoaW1wbDogQmFzZVRhcmdldCwgc2NvcGU6IFN5c3RlbVNjb3BlKSB7XG4gICAgc3VwZXIoKTtcbiAgICB0aGlzW0lNUExdID0gaW1wbDtcbiAgICB0aGlzW1NDT1BFXSA9IHNjb3BlO1xuXG4gICAgdGhpc1tJTVBMXS5zZXRQb3NpdGlvbkluZGVwZW5kZW50Q29kZSh0aGlzW1NDT1BFXS5QT1NJVElPTl9JTkRFUEVOREVOVF9DT0RFKTtcblxuICAgIGFkZEluY2x1ZGVzSW1wbCh0aGlzW0lNUExdLCB0aGlzW1NDT1BFXSwgZmFsc2UsIC4uLnRoaXNbU0NPUEVdLklOQ0xVREVTKTtcbiAgfVxuXG4gIHB1YmxpYyBzdGF0aWMgY3JlYXRlKGltcGw6IEJhc2VUYXJnZXQsIHNjb3BlOiBTeXN0ZW1TY29wZSwgLi4uc291cmNlczogYW55W10pIHtcbiAgICBjb25zdCB0YXJnZXQgPSBPYmplY3Quc2VhbChuZXcgVXNlclRhcmdldFN0cnVjdChpbXBsLCBzY29wZSkpO1xuICAgIHRhcmdldC5hZGRTb3VyY2VzKC4uLnNvdXJjZXMpO1xuICAgIHJldHVybiB0YXJnZXQ7XG4gIH1cblxuICBwdWJsaWMgZ2V0IHRhcmdldE5hbWUoKSB7XG4gICAgcmV0dXJuIHRoaXNbSU1QTF0udGFyZ2V0TmFtZTtcbiAgfVxuXG4gIHB1YmxpYyBnZXQgdGFyZ2V0RmlsZSgpIHtcbiAgICByZXR1cm4gdGhpc1tJTVBMXS50YXJnZXRGaWxlO1xuICB9XG5cbiAgcHVibGljIGdldCBpbmNsdWRlcygpIHtcbiAgICByZXR1cm4gdGhpc1tJTVBMXS5pbmNsdWRlcztcbiAgfVxuXG4gIHB1YmxpYyBnZXQgb2JqZWN0cygpIHtcbiAgICByZXR1cm4gdGhpc1tJTVBMXS5vYmplY3RzO1xuICB9XG4gIFxuICBwdWJsaWMgc2V0UHJlZml4KHZhbHVlOiBhbnkpOiB2b2lkIHtcbiAgICB0aGlzW0lNUExdLnNldFByZWZpeChlbnN1cmVTdHJpbmcodmFsdWUpKTtcbiAgfVxuXG4gIHB1YmxpYyBzZXRTdWZmaXgodmFsdWU6IGFueSk6IHZvaWQge1xuICAgIHRoaXNbSU1QTF0uc2V0U3VmZml4KGVuc3VyZVN0cmluZyh2YWx1ZSkpO1xuICB9XG5cbiAgcHVibGljIHNldE91dHB1dE5hbWUodmFsdWU6IGFueSk6IHZvaWQge1xuICAgIHRoaXNbSU1QTF0uc2V0T3V0cHV0TmFtZShlbnN1cmVTdHJpbmcodmFsdWUpKTtcbiAgfVxuXG4gIHB1YmxpYyBhZGRTb3VyY2VzKC4uLnNvdXJjZXM6IEFycmF5PFRhcmdldE9iamVjdHMgfCBTb3VyY2VGaWxlIHwgQWJzb2x1dGVQYXRoIHwgc3RyaW5nPik6IHZvaWQge1xuICAgIGNvbnN0IHNjb3BlID0gdGhpc1tTQ09QRV07XG4gICAgZm9yIChjb25zdCBpdGVyIG9mIHNvdXJjZXMuZmxhdCgpKSB7XG4gICAgICBpZiAodHlwZW9mIGl0ZXIgPT09IFwic3RyaW5nXCIgfHwgaXRlciBpbnN0YW5jZW9mIEFic29sdXRlUGF0aCkge1xuICAgICAgICBjb25zdCBmaWxlbmFtZSA9IHNjb3BlLlNPVVJDRV9ESVIucmVzb2x2ZShpdGVyKTtcbiAgICAgICAgY29uc3QgbGFuZ3VhZ2UgPSBnZXRGaWxlTGFuZ3VhZ2UoZmlsZW5hbWUudG9QYXRoKCkpO1xuICAgICAgICBsZXQgY29tcGlsZXJQYXRoID0gXCJcIjtcbiAgICAgICAgY29uc3QgY29tcGlsZXJGbGFncyA9IFtdO1xuXG4gICAgICAgIGlmIChsYW5ndWFnZSkge1xuICAgICAgICAgIGNvbXBpbGVyUGF0aCA9IChzY29wZSBhcyBhbnkpW2xhbmd1YWdlICsgXCJfQ09NUElMRVJcIl07XG4gICAgICAgICAgY29uc3QgQ09NUElMRVJfRkxBR1MxID0gKHNjb3BlIGFzIGFueSlbYCR7bGFuZ3VhZ2V9X0ZMQUdTYF1cbiAgICAgICAgICBpZiAoQ09NUElMRVJfRkxBR1MxKSB7XG4gICAgICAgICAgICBjb21waWxlckZsYWdzLnB1c2goLi4uQ09NUElMRVJfRkxBR1MxKTtcbiAgICAgICAgICB9XG5cbiAgICAgICAgICBjb25zdCBDT01QSUxFUl9GTEFHUzIgPSAoc2NvcGUgYXMgYW55KVtgJHtsYW5ndWFnZX1fRkxBR1NfJHtzY29wZS5CVUlMRF9UWVBFLnRvVXBwZXJDYXNlKCl9YF1cbiAgICAgICAgICBpZiAoQ09NUElMRVJfRkxBR1MyKSB7XG4gICAgICAgICAgICBjb21waWxlckZsYWdzLnB1c2goLi4uQ09NUElMRVJfRkxBR1MyKTtcbiAgICAgICAgICB9XG5cbiAgICAgICAgICBpZiAoIXRoaXNbSU1QTF0ubGFuZ3VhZ2UgfHwgKHRoaXNbSU1QTF0ubGFuZ3VhZ2UgPT09IFwiQ1wiICYmIGxhbmd1YWdlID09PSBcIkNYWFwiKSkge1xuICAgICAgICAgICAgdGhpc1tJTVBMXS5sYW5ndWFnZSA9IGxhbmd1YWdlO1xuICAgICAgICAgICAgdGhpc1tJTVBMXS5jb21waWxlclBhdGggPSBjb21waWxlclBhdGg7XG4gICAgICAgICAgICB0aGlzW0lNUExdLmNvbXBpbGVyRmxhZ3MgPSBbIC4uLmNvbXBpbGVyRmxhZ3MgXTtcbiAgICAgICAgICB9XG4gICAgICAgIH1cblxuICAgICAgICBjb25zdCBzb3VyY2UgPSBTb3VyY2VGaWxlLmNyZWF0ZShmaWxlbmFtZSwgc2NvcGUuU09VUkNFX0RJUiwgbGFuZ3VhZ2UsIGNvbXBpbGVyUGF0aCwgY29tcGlsZXJGbGFncyk7XG4gICAgICAgIHRoaXNbSU1QTF0uYWRkU291cmNlKHNvdXJjZSk7XG4gICAgICB9XG4gICAgICBlbHNlIGlmIChpdGVyIGluc3RhbmNlb2YgVGFyZ2V0T2JqZWN0cylcbiAgICAgICAgdGhpc1tJTVBMXS5hZGRTb3VyY2UoaXRlcik7XG4gICAgICBlbHNlIGlmIChpdGVyIGluc3RhbmNlb2YgU291cmNlRmlsZSlcbiAgICAgICAgdGhpc1tJTVBMXS5hZGRTb3VyY2UoaXRlcik7XG4gICAgICBlbHNlXG4gICAgICAgIHRocm93IG5ldyBFcnJvcihgTm90IHN1cHBvcnQgaW5zdGFuY2UgJHtpdGVyfWApO1xuICAgIH1cbiAgfVxuICBcbiAgcHVibGljIGdldFNvdXJjZUZpbGVzKC4uLnNvdXJjZXM6IGFueVtdKTogVXNlclNvdXJjZUZpbGVzIHtcbiAgICBjb25zdCByZXN1bHQgPSBbXTtcbiAgICBjb25zdCBzY29wZSA9IHRoaXNbU0NPUEVdO1xuICAgIGNvbnN0IHNvdXJjZUZpbGVzID0gdGhpc1tJTVBMXS5nZXRTb3VyY2VGaWxlcygpO1xuICAgIGZvciAoY29uc3QgaXQgb2Ygc291cmNlcy5mbGF0KCkpIHtcbiAgICAgIGNvbnN0IGZpbGVuYW1lID0gc2NvcGUuU09VUkNFX0RJUi5yZXNvbHZlKGl0KS50b1BhdGgoKTtcbiAgICAgIGNvbnN0IHNyYyA9IHNvdXJjZUZpbGVzLmZpbmQoaSA9PiBpLkZJTEUudG9QYXRoKCkgPT09IGZpbGVuYW1lKTtcbiAgICAgIGlmICghc3JjKVxuICAgICAgICB0aHJvdyBuZXcgRXJyb3IoYENhbm5vdCBmaW5kIFwiJHtpdH1cImApO1xuICAgICAgcmVzdWx0LnB1c2goc3JjKTtcbiAgICB9XG4gICAgXG4gICAgcmV0dXJuIFVzZXJTb3VyY2VGaWxlcy5jcmVhdGUodGhpc1tJTVBMXSwgcmVzdWx0Lmxlbmd0aCA/IHJlc3VsdCA6IHNvdXJjZUZpbGVzKTtcbiAgfVxuXG4gIHB1YmxpYyBhZGRJbmNsdWRlcyguLi5pbmNsdWRlczogQXJyYXk8VGFyZ2V0SW5jbHVkZXMgfCBBYnNvbHV0ZVBhdGggfCBzdHJpbmc+KTogdm9pZCB7XG4gICAgYWRkSW5jbHVkZXNJbXBsKHRoaXNbSU1QTF0sIHRoaXNbU0NPUEVdLCBmYWxzZSwgLi4uaW5jbHVkZXMpO1xuICB9XG5cbiAgcHVibGljIGFkZExpYnJhcmllcyguLi5saWJyYXJpZXM6IGFueVtdKTogdm9pZCB7XG4gICAgdGhpc1tJTVBMXS5hZGRMaWJyYXJpZXMoLi4ubGlicmFyaWVzKTtcbiAgfVxuXG4gIHB1YmxpYyBhZGRDb21waWxlT3B0aW9ucyguLi5vcHRpb25zOiBhbnlbXSk6IHZvaWQge1xuICAgIHRoaXNbSU1QTF0uYWRkQ29tcGlsZU9wdGlvbnMoLi4ub3B0aW9ucyk7XG4gIH1cblxuICBwdWJsaWMgYWRkTGlua09wdGlvbnMoLi4ub3B0aW9uczogYW55W10pOiB2b2lkIHtcbiAgICB0aGlzW0lNUExdLmFkZExpbmtPcHRpb25zKC4uLm9wdGlvbnMpO1xuICB9XG5cbiAgcHVibGljIGFkZERlZmluaXRpb25zKC4uLmRlZmluaXRpb25zOiBhbnlbXSk6IHZvaWQge1xuICAgIGZvciAoY29uc3QgaXRlciBvZiBUYXJnZXRIZWxwZXIubm9ybWFsaXplRGVmaW5pdGlvbnMoZGVmaW5pdGlvbnMuZmxhdCgpKSlcbiAgICAgIHRoaXNbSU1QTF0uYWRkRGVmaW5pdGlvbihmYWxzZSwgaXRlcik7XG4gIH1cblxuICBwdWJsaWMgYWRkUHJlQnVpbGQoY29tbWFuZDogYW55LCBhcmdzOiBhbnlbXSk6IHZvaWQge1xuICAgIHRoaXNbSU1QTF0uYWRkUHJlQnVpbGQoZW5zdXJlQ21kVmFsdWUoY29tbWFuZCksIGFyZ3MubWFwKGkgPT4gZW5zdXJlQ21kVmFsdWUoaSkpKTtcbiAgfVxuXG4gIHB1YmxpYyBhZGRQb3N0QnVpbGQoY29tbWFuZDogYW55LCBhcmdzOiBhbnlbXSk6IHZvaWQge1xuICAgIHRoaXNbSU1QTF0uYWRkUG9zdEJ1aWxkKGVuc3VyZUNtZFZhbHVlKGNvbW1hbmQpLCBhcmdzLm1hcChpID0+IGVuc3VyZUNtZFZhbHVlKGkpKSk7XG4gIH1cblxuICBwdWJsaWMgc2V0UG9zaXRpb25JbmRlcGVuZGVudENvZGUodmFsdWU6IGJvb2xlYW4pOiB2b2lkIHtcbiAgICB0aGlzW0lNUExdLnNldFBvc2l0aW9uSW5kZXBlbmRlbnRDb2RlKHZhbHVlKTtcbiAgfVxuXG4gIHB1YmxpYyBhZGRQdWJsaWNJbmNsdWRlcyguLi5pbmNsdWRlczogQXJyYXk8VGFyZ2V0SW5jbHVkZXMgfCBBYnNvbHV0ZVBhdGggfCBzdHJpbmc+KTogdm9pZCB7XG4gICAgYWRkSW5jbHVkZXNJbXBsKHRoaXNbSU1QTF0sIHRoaXNbU0NPUEVdLCB0cnVlLCAuLi5pbmNsdWRlcyk7XG4gIH1cblxuICBwdWJsaWMgYWRkUHVibGljRGVmaW5pdGlvbnMoLi4uZGVmaW5pdGlvbnM6IGFueSk6IHZvaWQge1xuICAgIGZvciAoY29uc3QgaXRlciBvZiBUYXJnZXRIZWxwZXIubm9ybWFsaXplRGVmaW5pdGlvbnMoZGVmaW5pdGlvbnMuZmxhdCgpKSlcbiAgICAgIHRoaXNbSU1QTF0uYWRkRGVmaW5pdGlvbih0cnVlLCBpdGVyKTtcbiAgfVxuXG4gIHB1YmxpYyBhZGRQdWJsaWNMaWJyYXJpZXMoLi4ubGlicmFyaWVzOiBhbnlbXSk6IHZvaWQge1xuICAgIHRoaXNbSU1QTF0uYWRkUHVibGljTGlicmFyaWVzKC4uLmxpYnJhcmllcyk7XG4gIH1cblxuICBwdWJsaWMgYWRkUHVibGljQ29tcGlsZU9wdGlvbnMoLi4ub3B0aW9uczogYW55W10pOiB2b2lkIHtcbiAgICB0aGlzW0lNUExdLmFkZFB1YmxpY0NvbXBpbGVPcHRpb25zKC4uLm9wdGlvbnMpO1xuICB9XG5cbiAgcHVibGljIGFkZFB1YmxpY0xpbmtPcHRpb25zKC4uLm9wdGlvbnM6IGFueVtdKTogdm9pZCB7XG4gICAgdGhpc1tJTVBMXS5hZGRQdWJsaWNMaW5rT3B0aW9ucyguLi5vcHRpb25zKTtcbiAgfVxufTtcbiIsIi8qXG4gKiBNSVQgTGljZW5zZVxuICpcbiAqIENvcHlyaWdodCAoYykgMjAyNSAgWXVyaWkgWWFrdWJpbiAoeXVyaWkueWFrdWJpbkBnbWFpbC5jb20pXG4gKlxuICogUGVybWlzc2lvbiBpcyBncmFudGVkIHRvIHVzZSwgY29weSwgbW9kaWZ5LCBhbmQgZGlzdHJpYnV0ZSB0aGlzIHNvZnR3YXJlXG4gKiB1bmRlciB0aGUgTUlUIExpY2Vuc2UuIFNlZSBMSUNFTlNFIGZpbGUgZm9yIGRldGFpbHMuXG4gKi9cblxuaW1wb3J0IHBhdGggZnJvbSBcIm5vZGU6cGF0aFwiO1xuXG5leHBvcnQgZnVuY3Rpb24gZmlsZW5hbWVUb1ByYWdtYU9uY2VNYWNybyhmaWxlcGF0aDogc3RyaW5nLCBkZWVwOiBudW1iZXIpIHtcbiAgaWYgKHR5cGVvZiBkZWVwID09PSAndW5kZWZpbmVkJylcbiAgICBkZWVwID0gMztcblxuICBsZXQgY29tcG9uZW50cyA9IHBhdGgubm9ybWFsaXplKGZpbGVwYXRoKS5zcGxpdChwYXRoLnNlcCk7XG4gIGlmIChjb21wb25lbnRzLmxlbmd0aCA+IGRlZXApXG4gICAgY29tcG9uZW50cyA9IGNvbXBvbmVudHMuc2xpY2UoY29tcG9uZW50cy5sZW5ndGggLSBkZWVwKTtcblxuICByZXR1cm4gXCJfXCIgKyBjb21wb25lbnRzLmpvaW4oJ18nKS5yZXBsYWNlKC9bLSAuOiV+XS9nLCAnXycpLnRvVXBwZXJDYXNlKCk7XG59XG5cbmV4cG9ydCBmdW5jdGlvbiBsaW5lVG9TaW5nbENvbW1lbnQobGluZTogc3RyaW5nKSB7XG4gIHJldHVybiBcIi8vXCIgKyBsaW5lO1xufVxuXG5leHBvcnQgZnVuY3Rpb24gbGluZVRvTXVsdGlwbGVDb21tZW50KGxpbmU6IHN0cmluZykge1xuICByZXR1cm4gYC8qICR7bGluZX0gKi9gO1xufVxuXG5leHBvcnQgZnVuY3Rpb24gZ2VuZXJhdGVkU2NyaXB0TmFtZUNvbW1lbnQoZmlsZW5hbWU6IHN0cmluZykge1xuICByZXR1cm4gbGluZVRvTXVsdGlwbGVDb21tZW50KFwiR2VuZXJhdGVkIGZyb20gXCIgKyBwYXRoLmJhc2VuYW1lKGZpbGVuYW1lKSk7XG59XG4iLCIvKlxuICogTUlUIExpY2Vuc2VcbiAqXG4gKiBDb3B5cmlnaHQgKGMpIDIwMjUgIFl1cmlpIFlha3ViaW4gKHl1cmlpLnlha3ViaW5AZ21haWwuY29tKVxuICpcbiAqIFBlcm1pc3Npb24gaXMgZ3JhbnRlZCB0byB1c2UsIGNvcHksIG1vZGlmeSwgYW5kIGRpc3RyaWJ1dGUgdGhpcyBzb2Z0d2FyZVxuICogdW5kZXIgdGhlIE1JVCBMaWNlbnNlLiBTZWUgTElDRU5TRSBmaWxlIGZvciBkZXRhaWxzLlxuICovXG5cbmV4cG9ydCBpbnRlcmZhY2UgSUxvZ2dlciB7XG4gIGRlYnVnKG1lc3NhZ2U/OiBhbnksIC4uLnBhcmFtczogYW55W10pOiB2b2lkO1xuICBpbmZvKG1lc3NhZ2U/OiBhbnksIC4uLnBhcmFtczogYW55W10pOiB2b2lkO1xuICBub3RpY2UobWVzc2FnZT86IGFueSwgLi4ucGFyYW1zOiBhbnlbXSk6IHZvaWQ7XG4gIHdhcm4obWVzc2FnZT86IGFueSwgLi4ucGFyYW1zOiBhbnlbXSk6IHZvaWQ7XG4gIGVycm9yKG1lc3NhZ2U/OiBhbnksIC4uLnBhcmFtczogYW55W10pOiB2b2lkO1xuICBmYXRhbChtZXNzYWdlPzogYW55LCAuLi5wYXJhbXM6IGFueVtdKTogdm9pZDtcbn07XG5cbnR5cGUgTG9nZ2VySGFuZGxlciA9IChtZXNzYWdlPzogYW55LCAuLi5wYXJhbXM6IGFueVtdKSA9PiB2b2lkOztcblxuaW50ZXJmYWNlIEVudHJ5TG9nZ2VyIHtcbiAgdGFnTmFtZTogc3RyaW5nO1xuICBmaWx0ZXI6IHN0cmluZztcbiAgbG9nZ2VyOiBJTG9nZ2VyO1xufTtcblxuY29uc3QgU0VQQVJBVE9SID0gXCIgXCI7XG5jb25zdCBNRVNTQUdFX01BWCA9IDI0MDtcblxuZnVuY3Rpb24gdG9NZXNzYWdlU3RyaW5nKG86IGFueSkge1xuICByZXR1cm4gKHR5cGVvZiBvID09PSBcInN0cmluZ1wiKSA/IG8gOiBKU09OLnN0cmluZ2lmeShvKTtcbn1cblxuZnVuY3Rpb24qIG1lc3NhZ2VHZW5lcmF0b3IobWVzc2FnZXM6IHN0cmluZ1tdLCBtYXhMZW5ndGg6IG51bWJlcikge1xuICBsZXQgbGVuZ3RoID0gMDtcbiAgY29uc3QgbXNnTGlzdDogc3RyaW5nW10gPSBbXTtcblxuICBmb3IgKDs7KSB7XG4gICAgY29uc3QgaXRlciA9IG1lc3NhZ2VzLnNoaWZ0KCk7XG4gICAgaWYgKCFpdGVyKVxuICAgICAgYnJlYWs7XG5cbiAgICBpZiAobXNnTGlzdC5sZW5ndGgpXG4gICAgICBsZW5ndGggKz0gU0VQQVJBVE9SLmxlbmd0aDtcblxuICAgIG1zZ0xpc3QucHVzaChpdGVyKTtcbiAgICBsZW5ndGggKz0gaXRlci5sZW5ndGg7XG5cbiAgICB3aGlsZSAobGVuZ3RoID4gbWF4TGVuZ3RoKSB7XG4gICAgICBjb25zdCBtc2cgPSBtc2dMaXN0LmpvaW4oU0VQQVJBVE9SKTtcbiAgICAgIGNvbnN0IG5leHRNc2cgPSBtc2cuc3Vic3RyaW5nKG1heExlbmd0aCk7XG4gICAgICBtc2dMaXN0Lmxlbmd0aCA9IDA7XG4gICAgICBtc2dMaXN0LnB1c2gobmV4dE1zZyk7XG4gICAgICBsZW5ndGggPSBuZXh0TXNnLmxlbmd0aDtcbiAgICAgIHlpZWxkIG1zZy5zdWJzdHJpbmcoMCwgbWF4TGVuZ3RoKTtcbiAgICB9XG4gIH1cblxuICB5aWVsZCBtc2dMaXN0LmpvaW4oU0VQQVJBVE9SKTtcbn1cblxuZnVuY3Rpb24gbWFrZUxvZ01ldGhvZCh3aXRoUHJlZml4OiBib29sZWFuLCB0eXBlOiBzdHJpbmcsIHRhZ05hbWU6IHN0cmluZywgdGFyZ2V0OiBhbnksIGhhbmRsZXI6IExvZ2dlckhhbmRsZXIpIHtcbiAgcmV0dXJuICguLi5hcmdzOiBhbnlbXSkgPT4ge1xuICAgIGNvbnN0IG5vdyA9IG5ldyBEYXRlKCk7XG4gICAgY29uc3QgbWVzc2FnZXMgPSBhcmdzLm1hcChpID0+IHRvTWVzc2FnZVN0cmluZyhpKSlcblxuICAgIGlmICghd2l0aFByZWZpeCkge1xuICAgICAgaGFuZGxlci5jYWxsKHRhcmdldCwgbWVzc2FnZXMuam9pbihTRVBBUkFUT1IpKTtcbiAgICAgIHJldHVybjtcbiAgICB9XG5cbiAgICBjb25zdCBwcmVmaXggPSBbIG5vdy50b0lTT1N0cmluZygpLCB0eXBlLCB0YWdOYW1lIF0uam9pbihTRVBBUkFUT1IpO1xuICAgIGZvciAoY29uc3QgaXRlciBvZiBtZXNzYWdlR2VuZXJhdG9yKG1lc3NhZ2VzLCBNRVNTQUdFX01BWCAtIHByZWZpeC5sZW5ndGggLSBTRVBBUkFUT1IubGVuZ3RoKSkge1xuICAgICAgaGFuZGxlci5jYWxsKHRhcmdldCwgW3ByZWZpeCwgaXRlcl0uam9pbihTRVBBUkFUT1IpKTtcbiAgICB9XG4gIH07XG59XG5cbmxldCBfZGVmYXVsdFBhdHRlcm4gPSBcIlwiO1xuY29uc3QgX2xvZ2dlck1hcCA9IG5ldyBNYXA8c3RyaW5nLCBFbnRyeUxvZ2dlcj4oKTtcblxuY29uc3Qgc3R1YiA9ICgpID0+IHt9O1xuXG5mdW5jdGlvbiBpbml0TG9nZ2VyKGxvZ2dlcjogSUxvZ2dlciwgdGFnTmFtZTogc3RyaW5nLCBmaWx0ZXI6IHN0cmluZykge1xuICBsb2dnZXIuZGVidWcgPSBzdHViO1xuICBsb2dnZXIuaW5mbyA9IHN0dWI7XG4gIGxvZ2dlci5ub3RpY2UgPSBzdHViO1xuICBsb2dnZXIud2FybiA9IHN0dWI7XG4gIGxvZ2dlci5lcnJvciA9IHN0dWI7XG4gIGxvZ2dlci5mYXRhbCA9IHN0dWI7XG5cbiAgbGV0IGxldmVsID0gMDtcbiAgY29uc3QgZmxhZ3M6IGFueSA9IHt9O1xuICBmb3IgKGNvbnN0IGl0ZXIgb2YgZmlsdGVyLnNwbGl0KFwiLFwiKSkge1xuICAgIGlmIChpdGVyID09PSBcIipcIikge1xuICAgICAgbGV2ZWwgPSA1O1xuICAgICAgYnJlYWs7XG4gICAgfVxuICAgIGlmICgvXlxcZCskLy50ZXN0KGl0ZXIpKVxuICAgICAgbGV2ZWwgPSBNYXRoLm1heChsZXZlbCwgcGFyc2VJbnQoaXRlcikpO1xuICAgIGVsc2VcbiAgICAgIGZsYWdzW2l0ZXJdID0gdHJ1ZTtcbiAgfVxuXG4gIGxvZ2dlci5mYXRhbCA9IG1ha2VMb2dNZXRob2QobGV2ZWwgPiAyLCBcIkZcIiwgdGFnTmFtZSwgY29uc29sZSwgY29uc29sZS5lcnJvcik7XG5cbiAgaWYgKGxldmVsID4gMSB8fCBmbGFncy5lcnJvcilcbiAgICBsb2dnZXIuZXJyb3IgPSBtYWtlTG9nTWV0aG9kKGxldmVsID4gMiwgXCJFXCIsIHRhZ05hbWUsIGNvbnNvbGUsIGNvbnNvbGUuZXJyb3IpO1xuXG4gIGlmIChsZXZlbCA+IDIgfHwgZmxhZ3Mud2FybilcbiAgICBsb2dnZXIud2FybiA9IG1ha2VMb2dNZXRob2QobGV2ZWwgPiAyLCBcIldcIiwgdGFnTmFtZSwgY29uc29sZSwgY29uc29sZS53YXJuKTtcblxuICBsb2dnZXIubm90aWNlID0gbWFrZUxvZ01ldGhvZChsZXZlbCA+IDIsIFwiTlwiLCB0YWdOYW1lLCBjb25zb2xlLCBjb25zb2xlLmxvZyk7XG5cbiAgaWYgKGxldmVsID4gMyB8fCBmbGFncy5pbmZvKVxuICAgIGxvZ2dlci5pbmZvID0gbWFrZUxvZ01ldGhvZChsZXZlbCA+IDIsIFwiSVwiLCB0YWdOYW1lLCBjb25zb2xlLCBjb25zb2xlLmluZm8pO1xuXG4gIGlmIChsZXZlbCA+IDQgfHwgZmxhZ3MuZGVidWcpXG4gICAgbG9nZ2VyLmRlYnVnID0gbWFrZUxvZ01ldGhvZChsZXZlbCA+IDIsIFwiRFwiLCB0YWdOYW1lLCBjb25zb2xlLCBjb25zb2xlLmRlYnVnKTtcbn1cblxuZnVuY3Rpb24gY3JlYXRlRW50cnkodGFnTmFtZTogc3RyaW5nLCBmaWx0ZXI6IHN0cmluZykge1xuICBjb25zdCBlbnRyeSA9IHsgdGFnTmFtZSwgZmlsdGVyLCBsb2dnZXI6IHt9IGFzIElMb2dnZXIgfTtcbiAgaW5pdExvZ2dlcihlbnRyeS5sb2dnZXIsIHRhZ05hbWUsIGZpbHRlcik7XG4gIHJldHVybiBlbnRyeTtcbn1cblxuZnVuY3Rpb24gZW50cnlTZXRGaWx0ZXIoZW50cnk6IEVudHJ5TG9nZ2VyLCBmaWx0ZXI6IHN0cmluZykge1xuICBpZiAoZW50cnkuZmlsdGVyICE9PSBmaWx0ZXIpIHtcbiAgICBpbml0TG9nZ2VyKGVudHJ5LmxvZ2dlciwgZW50cnkudGFnTmFtZSwgZmlsdGVyKTtcbiAgICBlbnRyeS5maWx0ZXIgPSBmaWx0ZXI7XG4gIH1cbn1cblxuZnVuY3Rpb24gYWxsU2V0RmlsdGVyKGZpbHRlcjogc3RyaW5nKSB7XG4gIF9kZWZhdWx0UGF0dGVybiA9IGZpbHRlcjtcbiAgZm9yIChjb25zdCBlbnRyeSBvZiBfbG9nZ2VyTWFwLnZhbHVlcygpKVxuICAgIGVudHJ5U2V0RmlsdGVyKGVudHJ5LCBmaWx0ZXIpO1xufVxuXG5leHBvcnQgbmFtZXNwYWNlIExvZ2dlciB7XG5cbmV4cG9ydCBmdW5jdGlvbiBjcmVhdGUodXJsOiBzdHJpbmcpOiBJTG9nZ2VyIHtcbiAgY29uc3QgdGFnTmFtZSA9IHVybC5zdGFydHNXaXRoKEhPU1RfU09VUkNFX1VSTCArIFwiL1wiKSA/IHVybC5zdWJzdHJpbmcoSE9TVF9TT1VSQ0VfVVJMLmxlbmd0aCArIDEpIDogdXJsO1xuICBpZiAoIXRhZ05hbWUgfHwgdGFnTmFtZSA9PT0gXCIqXCIpXG4gICAgdGhyb3cgbmV3IEVycm9yKGBMb2dnZXIgJHt1cmx9IG5vdCBhbGxvd2VkYCk7XG5cbiAgbGV0IGVudHJ5ID0gX2xvZ2dlck1hcC5nZXQodGFnTmFtZSk7XG4gIGlmICghZW50cnkpIHtcbiAgICBlbnRyeSA9IGNyZWF0ZUVudHJ5KHRhZ05hbWUsIF9kZWZhdWx0UGF0dGVybik7XG4gICAgX2xvZ2dlck1hcC5zZXQodGFnTmFtZSwgZW50cnkpO1xuICB9XG5cbiAgcmV0dXJuIGVudHJ5LmxvZ2dlcjtcbn1cblxuZXhwb3J0IGZ1bmN0aW9uIGVuYWJsZShmaWx0ZXI6IHN0cmluZykge1xuICBpZiAoZmlsdGVyID09PSBcIipcIikge1xuICAgIGFsbFNldEZpbHRlcihcIipcIik7XG4gICAgcmV0dXJuO1xuICB9XG5cbiAgY29uc3QgcGFpciA9IGZpbHRlci5zcGxpdChcIjpcIik7XG4gIGlmIChwYWlyLmxlbmd0aCA8IDIpXG4gICAgcmV0dXJuO1xuXG4gIGlmIChwYWlyWzBdID09PSBcIipcIikge1xuICAgIGFsbFNldEZpbHRlcihwYWlyWzFdKTtcbiAgICByZXR1cm47XG4gIH1cblxuICBsZXQgZW50cnkgPSBfbG9nZ2VyTWFwLmdldChwYWlyWzBdKTtcbiAgaWYgKCFlbnRyeSkge1xuICAgIGVudHJ5ID0gY3JlYXRlRW50cnkocGFpclswXSwgcGFpclsxXSk7XG4gICAgX2xvZ2dlck1hcC5zZXQoZmlsdGVyLCBlbnRyeSk7XG4gIH1cbiAgZWxzZSAge1xuICAgIGVudHJ5U2V0RmlsdGVyKGVudHJ5LCBwYWlyWzFdKTtcbiAgfVxufVxuXG59IC8vIG5hbWVzcGFjZSBMb2dnZXJcblxuZm9yIChjb25zdCBpdGVyIG9mIExPR0dFUl9ERUJVRykge1xuICBMb2dnZXIuZW5hYmxlKGl0ZXIpO1xufVxuIiwiLypcbiAqIE1JVCBMaWNlbnNlXG4gKlxuICogQ29weXJpZ2h0IChjKSAyMDI1ICBZdXJpaSBZYWt1YmluICh5dXJpaS55YWt1YmluQGdtYWlsLmNvbSlcbiAqXG4gKiBQZXJtaXNzaW9uIGlzIGdyYW50ZWQgdG8gdXNlLCBjb3B5LCBtb2RpZnksIGFuZCBkaXN0cmlidXRlIHRoaXMgc29mdHdhcmVcbiAqIHVuZGVyIHRoZSBNSVQgTGljZW5zZS4gU2VlIExJQ0VOU0UgZmlsZSBmb3IgZGV0YWlscy5cbiAqL1xuXG5pbXBvcnQgeyBKU09OUlBDX1ZFUlNJT04gfSBmcm9tIFwiQC9zZXJ2ZXIvVHJhbnNwb3J0XCI7XG5pbXBvcnQgeyBJUmVxdWVzdFN5bmMgfSBmcm9tIFwiQC9zZXJ2ZXIvVHJhbnNwb3J0XCI7XG5pbXBvcnQgeyBMb2dnZXIgfSBmcm9tIFwiQC9sb2dnZXJcIjtcblxuY29uc3QgbG9nZ2VyID0gTG9nZ2VyLmNyZWF0ZShpbXBvcnQubWV0YS51cmwpO1xuXG5leHBvcnQgY2xhc3MgSnNvblJwY1JlcXVlc3RTeW5jIHtcbiAgcHJpdmF0ZSBfcmVxdWVzdDogSVJlcXVlc3RTeW5jO1xuICBwcml2YXRlIF9pZDogbnVtYmVyO1xuXG4gIHB1YmxpYyBjb25zdHJ1Y3RvcihyZXF1ZXN0U3luYzogSVJlcXVlc3RTeW5jKSB7XG4gICAgdGhpcy5fcmVxdWVzdCA9IHJlcXVlc3RTeW5jO1xuICAgIHRoaXMuX2lkID0gMTtcbiAgfVxuXG4gIHB1YmxpYyByZXF1ZXN0U3luYyhtZXRob2Q6IHN0cmluZywgcGFyYW1zOiBhbnkpOiBhbnkge1xuICAgIGxvZ2dlci5kZWJ1ZyhcIkpzb25ScGNSZXF1ZXN0U3luYy5yZXF1ZXN0U3luYyhcIiwgbWV0aG9kLCBcIi4uLnBhcmFtcylcIik7XG4gICAgY29uc3QgbWVzc2FnZSA9IHtcbiAgICAgIGpzb25ycGM6IEpTT05SUENfVkVSU0lPTixcbiAgICAgIG1ldGhvZCxcbiAgICAgIHBhcmFtcyxcbiAgICAgIGlkOiB0aGlzLl9pZCsrLFxuICAgIH07XG4gICAgY29uc3QgcmVzcG9uc2UgPSB0aGlzLl9yZXF1ZXN0LnJlcXVlc3RTeW5jKG1lc3NhZ2UpO1xuICAgIGlmIChyZXNwb25zZS5lcnJvcilcbiAgICAgIHRocm93IG5ldyBFcnJvcihyZXNwb25zZS5lcnJvci5tZXNzYWdlLCB7IGNhdXNlOiByZXNwb25zZS5lcnJvci5jb2RlIH0pO1xuICAgIHJldHVybiByZXNwb25zZS5yZXN1bHQ7XG4gIH1cbn07XG4iLCIvKlxuICogTUlUIExpY2Vuc2VcbiAqXG4gKiBDb3B5cmlnaHQgKGMpIDIwMjUgIFl1cmlpIFlha3ViaW4gKHl1cmlpLnlha3ViaW5AZ21haWwuY29tKVxuICpcbiAqIFBlcm1pc3Npb24gaXMgZ3JhbnRlZCB0byB1c2UsIGNvcHksIG1vZGlmeSwgYW5kIGRpc3RyaWJ1dGUgdGhpcyBzb2Z0d2FyZVxuICogdW5kZXIgdGhlIE1JVCBMaWNlbnNlLiBTZWUgTElDRU5TRSBmaWxlIGZvciBkZXRhaWxzLlxuICovXG5cbmltcG9ydCB7IEpTT05SUENfVkVSU0lPTiwgSU1lc3NhZ2VTZW5kZXIsIEpzb25ScGNEYXRhLCBKc29uUnBjUmVxdWVzdEhhbmRsZXIsIElKc29uUnBjUmVxdWVzdCwgSUpzb25ScGNSZXNwb25zZSwgSnNvblJwY0NhbGxiYWNrIH0gZnJvbSBcIkAvc2VydmVyL1RyYW5zcG9ydFwiO1xuaW1wb3J0IHsgTG9nZ2VyIH0gZnJvbSBcIkAvbG9nZ2VyXCI7XG5cbmNvbnN0IGxvZ2dlciA9IExvZ2dlci5jcmVhdGUoaW1wb3J0Lm1ldGEudXJsKTtcblxuY2xhc3MgSnNvblJwY1JlcXVlc3QgaW1wbGVtZW50cyBJSnNvblJwY1JlcXVlc3Qge1xuICBwcml2YXRlIF9wYXJhbXM6IGFueTtcblxuICBjb25zdHJ1Y3RvcihwYXJhbXM6IGFueSkge1xuICAgIHRoaXMuX3BhcmFtcyA9IHBhcmFtcztcbiAgfVxuXG4gIGdldCBwYXJhbXMoKTogYW55IHtcbiAgICByZXR1cm4gdGhpcy5fcGFyYW1zO1xuICB9XG59XG5cbmNsYXNzIEpzb25ScGNSZXNwb25zZSBpbXBsZW1lbnRzIElKc29uUnBjUmVzcG9uc2Uge1xuICBwcml2YXRlIF9zZW5kZXI6IElNZXNzYWdlU2VuZGVyO1xuICBwcml2YXRlIF9pZDogbnVtYmVyO1xuXG4gIHB1YmxpYyBjb25zdHJ1Y3RvcihzZW5kZXI6IElNZXNzYWdlU2VuZGVyLCBpZDogbnVtYmVyKSB7XG4gICAgdGhpcy5fc2VuZGVyID0gc2VuZGVyO1xuICAgIHRoaXMuX2lkID0gaWQ7XG4gIH1cblxuICBzZW5kUmVzdWx0KHJlc3VsdDogYW55KTogdm9pZCB7XG4gICAgY29uc3QgbWVzc2FnZTogSnNvblJwY0RhdGEgPSB7XG4gICAgICBqc29ucnBjOiBKU09OUlBDX1ZFUlNJT04sXG4gICAgICByZXN1bHQ6IChyZXN1bHQgIT09IHVuZGVmaW5lZCkgPyByZXN1bHQgOiBudWxsLFxuICAgICAgaWQ6IHRoaXMuX2lkLFxuICAgIH07XG4gICAgbG9nZ2VyLmRlYnVnKFwiPC0tXCIsIEpTT04uc3RyaW5naWZ5KG1lc3NhZ2UpKTtcbiAgICB0aGlzLl9zZW5kZXIuc2VuZE1lc3NhZ2UobWVzc2FnZSk7XG4gIH1cblxuICBzZW5kRXJyb3IoY29kZTogbnVtYmVyLCBtZXNzYWdlOiBzdHJpbmcsIGRhdGE/OiBhbnkpOiB2b2lkIHtcbiAgICBjb25zdCBlcnJvcjogYW55ID0geyBjb2RlLCBtZXNzYWdlIH07XG4gICAgaWYgKGRhdGEgIT09IHVuZGVmaW5lZCkge1xuICAgICAgZXJyb3IuZGF0YSA9IGRhdGE7XG4gICAgfVxuICAgIGNvbnN0IG1zZzogSnNvblJwY0RhdGEgPSB7XG4gICAgICBqc29ucnBjOiBKU09OUlBDX1ZFUlNJT04sXG4gICAgICBlcnJvcixcbiAgICAgIGlkOiB0aGlzLl9pZCxcbiAgICB9O1xuICAgIGxvZ2dlci5kZWJ1ZyhcIjwtLVwiLCBKU09OLnN0cmluZ2lmeShtc2cpKTtcbiAgICB0aGlzLl9zZW5kZXIuc2VuZE1lc3NhZ2UobXNnKTtcbiAgfVxufTtcblxuZXhwb3J0IGNsYXNzIEpzb25ScGNTZXJ2ZXIge1xuICBwcml2YXRlIF9yZXF1ZXN0SGFuZGxlcnMgPSBuZXcgTWFwPHN0cmluZywgSnNvblJwY1JlcXVlc3RIYW5kbGVyPigpO1xuXG4gIHB1YmxpYyBjb25zdHJ1Y3RvcigpIHtcbiAgfVxuXG4gIHB1YmxpYyByZWdpc3RlckhhbmRsZXIobWV0aG9kOiBzdHJpbmcsIGhhbmRsZXI6IEpzb25ScGNSZXF1ZXN0SGFuZGxlcik6IHZvaWQge1xuICAgIHRoaXMuX3JlcXVlc3RIYW5kbGVycy5zZXQobWV0aG9kLCBoYW5kbGVyKTtcbiAgfVxuXG4gIHB1YmxpYyByZWdpc3RlckNhbGxiYWNrKG1ldGhvZDogc3RyaW5nLCBjYWxsYmFjazogSnNvblJwY0NhbGxiYWNrKTogdm9pZCB7XG4gICAgdGhpcy5fcmVxdWVzdEhhbmRsZXJzLnNldChtZXRob2QsIGFzeW5jIChyZXF1ZXN0LCByZXNwb25zZSkgPT4ge1xuICAgICAgbGV0IHJlc3VsdDogYW55ID0gY2FsbGJhY2socmVxdWVzdC5wYXJhbXMpO1xuICAgICAgaWYgKHJlc3VsdCBpbnN0YW5jZW9mIFByb21pc2UpXG4gICAgICAgIHJlc3VsdCA9IGF3YWl0IHJlc3VsdDtcbiAgICAgIGlmIChyZXN1bHQgJiYgdHlwZW9mIHJlc3VsdCA9PT0gXCJvYmplY3RcIiAmJiB0eXBlb2YgcmVzdWx0LnRvSlNPTiA9PT0gXCJmdW5jdGlvblwiKVxuICAgICAgICByZXN1bHQgPSByZXN1bHQudG9KU09OKCk7XG4gICAgICByZXNwb25zZS5zZW5kUmVzdWx0KHJlc3VsdCk7XG4gICAgfSk7XG4gIH1cblxuICBwdWJsaWMgb25SZXF1ZXN0KHNlbmRlcjogSU1lc3NhZ2VTZW5kZXIsIG1ldGhvZDogYW55LCBpZDogYW55LCBwYXJhbXM6IGFueSk6IHZvaWQge1xuICAgIGNvbnN0IGhhbmRsZXIgPSAodHlwZW9mIG1ldGhvZCA9PT0gXCJzdHJpbmdcIikgPyB0aGlzLl9yZXF1ZXN0SGFuZGxlcnMuZ2V0KG1ldGhvZCkgOiB1bmRlZmluZWQ7XG4gICAgY29uc3QgcmVzcG9uc2UgPSBuZXcgSnNvblJwY1Jlc3BvbnNlKHNlbmRlciwgaWQpO1xuICAgIGlmIChoYW5kbGVyKSB7XG4gICAgICBoYW5kbGVyKG5ldyBKc29uUnBjUmVxdWVzdChwYXJhbXMpLCByZXNwb25zZSk7XG4gICAgfVxuICAgIGVsc2Uge1xuICAgICAgcmVzcG9uc2Uuc2VuZEVycm9yKC0zMjYwMSwgXCJNZXRob2Qgbm90IGZvdW5kXCIpO1xuICAgIH1cbiAgfVxuXG4gIHB1YmxpYyBvblJlc3VsdChzZW5kZXI6IElNZXNzYWdlU2VuZGVyLCByZXN1bHQ6IGFueSwgaWQ6IG51bWJlcik6IHZvaWQge1xuICAgIFxuICB9XG5cbiAgcHVibGljIG9uRXJyb3Ioc2VuZGVyOiBJTWVzc2FnZVNlbmRlciwgZXJyb3I6IG9iamVjdCwgaWQ6IG51bWJlciB8IG51bGwpOiB2b2lkIHtcbiAgICBcbiAgfVxuXG4gIHB1YmxpYyBvbk5vdGlmaWNhdGlvbihzZW5kZXI6IElNZXNzYWdlU2VuZGVyLCBtZXRob2Q6IGFueSwgcGFyYW1zPzogYW55KTogdm9pZCB7XG4gICAgXG4gIH1cblxuICBwcml2YXRlIG9uTWVzc2FnZUltcGwoc2VuZGVyOiBJTWVzc2FnZVNlbmRlciwgbWVzc2FnZTogYW55KTogdm9pZCB7XG4gICAgaWYgKCFtZXNzYWdlIHx8IHR5cGVvZiBtZXNzYWdlICE9PSBcIm9iamVjdFwiKSB7XG4gICAgICByZXR1cm47XG4gICAgfVxuXG4gICAgY29uc3QgZGF0YSA9IG1lc3NhZ2UgYXMgSnNvblJwY0RhdGE7XG5cbiAgICBpZiAoT2JqZWN0Lmhhc093bihkYXRhLCBcIm1ldGhvZFwiKSkge1xuICAgICAgaWYgKE9iamVjdC5oYXNPd24oZGF0YSwgXCJpZFwiKSlcbiAgICAgICAgdGhpcy5vblJlcXVlc3Qoc2VuZGVyLCBkYXRhLm1ldGhvZCwgZGF0YS5pZCwgZGF0YS5wYXJhbXMpO1xuICAgICAgZWxzZVxuICAgICAgICB0aGlzLm9uTm90aWZpY2F0aW9uKHNlbmRlciwgZGF0YS5tZXRob2QsIGRhdGEucGFyYW1zKTtcbiAgICB9XG4gICAgZWxzZSBpZiAoZGF0YS5pZCkge1xuICAgICAgXG4gICAgfVxuICAgIGVsc2Uge1xuXG4gICAgfVxuICB9XG5cbiAgcHVibGljIGVtaXRNZXNzYWdlKHNlbmRlcjogSU1lc3NhZ2VTZW5kZXIsIG1lc3NhZ2U6IGFueSk6IHZvaWQge1xuICAgIGxvZ2dlci5kZWJ1ZyhcIi0tPlwiLCBKU09OLnN0cmluZ2lmeShtZXNzYWdlKSk7XG4gICAgaWYgKEFycmF5LmlzQXJyYXkobWVzc2FnZSkpXG4gICAgICBtZXNzYWdlLmZvckVhY2gobXNnID0+IHRoaXMub25NZXNzYWdlSW1wbChzZW5kZXIsIG1zZykpO1xuICAgIGVsc2VcbiAgICAgIHRoaXMub25NZXNzYWdlSW1wbChzZW5kZXIsIG1lc3NhZ2UpO1xuICB9XG59O1xuIiwiLypcbiAqIE1JVCBMaWNlbnNlXG4gKlxuICogQ29weXJpZ2h0IChjKSAyMDI1ICBZdXJpaSBZYWt1YmluICh5dXJpaS55YWt1YmluQGdtYWlsLmNvbSlcbiAqXG4gKiBQZXJtaXNzaW9uIGlzIGdyYW50ZWQgdG8gdXNlLCBjb3B5LCBtb2RpZnksIGFuZCBkaXN0cmlidXRlIHRoaXMgc29mdHdhcmVcbiAqIHVuZGVyIHRoZSBNSVQgTGljZW5zZS4gU2VlIExJQ0VOU0UgZmlsZSBmb3IgZGV0YWlscy5cbiAqL1xuXG5pbXBvcnQgeyBXb3JrZXIgfSBmcm9tIFwibm9kZTp3b3JrZXJfdGhyZWFkc1wiO1xuXG5pbXBvcnQgeyBjdXJyZW50U2NyaXB0VVJMIH0gZnJvbSBcIkAvdXRpbHMvTW9kdWxlXCI7XG5pbXBvcnQgeyBNZW1vcnlNZXNzYWdlU2VuZGVyIH0gZnJvbSBcIkAvc2VydmVyL01lbW9yeVRyYW5zcG9ydFwiO1xuaW1wb3J0IHsgV29ya2VyU2VuZGVyIH0gZnJvbSBcIkAvc2VydmVyL1dvcmtlclNlbmRlclwiO1xuaW1wb3J0IHsgU2NvcGVIZWxwZXIsIFZhcmlhYmxlTWFwIH0gZnJvbSBcIkAvY29yZS9TY29wZVwiO1xuaW1wb3J0IHsgSlNPTlJQQ19WRVJTSU9OIH0gZnJvbSBcIkAvc2VydmVyL1RyYW5zcG9ydFwiO1xuaW1wb3J0IHsgSnNvblJwY1NlcnZlciB9IGZyb20gXCJAL3NlcnZlci9Kc29uUnBjU2VydmVyXCI7XG5pbXBvcnQgeyBMb2dnZXIgfSBmcm9tIFwiQC9sb2dnZXJcIjtcblxuY29uc3QgbG9nZ2VyID0gTG9nZ2VyLmNyZWF0ZShpbXBvcnQubWV0YS51cmwpO1xuXG5pbnRlcmZhY2UgUmVzcG9uc2VFbnRyeSB7XG4gIHJlc29sdmU6ICh2YWx1ZTogYW55KSA9PiB2b2lkO1xuICByZWplY3Q6IChyZWFzb24/OiBhbnkpID0+IHZvaWQ7XG59O1xuXG5leHBvcnQgY2xhc3MgTWFrZUNsaWVudCB7XG4gIHByaXZhdGUgX2pzb25ScGNTZXJ2ZXI6IEpzb25ScGNTZXJ2ZXI7XG4gIHByaXZhdGUgX3dvcmtlcjogV29ya2VyO1xuICBwcml2YXRlIF9pZCA9IDE7XG4gIHByaXZhdGUgX3dhaXRSZXNwb25zZU1hcCA9IG5ldyBNYXA8bnVtYmVyLFJlc3BvbnNlRW50cnk+KCk7O1xuXG4gIHB1YmxpYyBjb25zdHJ1Y3Rvcihqc29uUnBjU2VydmVyOiBKc29uUnBjU2VydmVyKSB7XG4gICAgdGhpcy5fanNvblJwY1NlcnZlciA9IGpzb25ScGNTZXJ2ZXI7XG4gICAgdGhpcy5fd29ya2VyID0gbmV3IFdvcmtlcihjdXJyZW50U2NyaXB0VVJMKCkpO1xuICAgIHRoaXMuX3dvcmtlci5vbihcIm1lc3NhZ2VcIiwgbWVzc2FnZSA9PiB0aGlzLm9uV29ya2VyTWVzc2FnZShtZXNzYWdlKSk7XG4gICAgdGhpcy5fd29ya2VyLm9uKFwiZXJyb3JcIiwgZXJyb3IgPT4gdGhpcy5vbldvcmtlckVycm9yKGVycm9yKSk7XG4gICAgdGhpcy5fd29ya2VyLm9uKFwiZXhpdFwiLCBjb2RlID0+IHRoaXMub25Xb3JrZXJFeGl0KGNvZGUpKTtcbiAgfVxuXG4gIHB1YmxpYyBhc3luYyByZXF1ZXN0KG1ldGhvZDogc3RyaW5nLCBwYXJhbXM6IGFueSk6IFByb21pc2U8YW55PiB7XG4gICAgY29uc3QgaWQgPSB0aGlzLl9pZCsrO1xuICAgIGNvbnN0IHJlc3VsdCA9IG5ldyBQcm9taXNlPGFueT4oKHJlc29sdmUsIHJlamVjdCkgPT4ge1xuICAgICAgdGhpcy5fd2FpdFJlc3BvbnNlTWFwLnNldChpZCwgeyByZXNvbHZlLCByZWplY3QgfSk7XG4gICAgfSk7XG4gICAgdGhpcy5fd29ya2VyLnBvc3RNZXNzYWdlKHtcbiAgICAgIGpzb25ycGM6IEpTT05SUENfVkVSU0lPTixcbiAgICAgIG1ldGhvZCxcbiAgICAgIHBhcmFtcyxcbiAgICAgIGlkLFxuICAgIH0pO1xuICAgIHJldHVybiByZXN1bHQ7XG4gIH1cblxuICBwcml2YXRlIG9uV29ya2VyTWVzc2FnZShtZXNzYWdlOiBhbnkpIHtcbiAgICBpZiAobWVzc2FnZSBpbnN0YW5jZW9mIFNoYXJlZEFycmF5QnVmZmVyKSB7XG4gICAgICBjb25zdCBtdCA9IG5ldyBNZW1vcnlNZXNzYWdlU2VuZGVyKG1lc3NhZ2UpXG4gICAgICB0aGlzLl9qc29uUnBjU2VydmVyLmVtaXRNZXNzYWdlKG10LCBtdC5yZWFkTWVzc2FnZSgpKTtcbiAgICB9XG4gICAgZWxzZSBpZiAoT2JqZWN0Lmhhc093bihtZXNzYWdlLCBcIm1ldGhvZFwiKSkge1xuICAgICAgY29uc3Qgc2VuZGVyID0gbmV3IFdvcmtlclNlbmRlcih0aGlzLl93b3JrZXIpO1xuICAgICAgdGhpcy5fanNvblJwY1NlcnZlci5lbWl0TWVzc2FnZShzZW5kZXIsIG1lc3NhZ2UpO1xuICAgIH1cbiAgICBlbHNlIGlmIChPYmplY3QuaGFzT3duKG1lc3NhZ2UsIFwiaWRcIikpIHtcbiAgICAgIGNvbnN0IHByb21pc2UgPSB0aGlzLl93YWl0UmVzcG9uc2VNYXAuZ2V0KG1lc3NhZ2UuaWQpO1xuICAgICAgaWYgKCFwcm9taXNlKVxuICAgICAgICB0aHJvdyBuZXcgRXJyb3IoYFVua25vd24gcmVzcG9uc2UgXCIke21lc3NhZ2UuaWR9XCIgaWRgKTtcbiAgICAgIGlmIChPYmplY3QuaGFzT3duKG1lc3NhZ2UsIFwicmVzdWx0XCIpKVxuICAgICAgICBwcm9taXNlLnJlc29sdmUobWVzc2FnZS5yZXN1bHQpO1xuICAgICAgZWxzZSBpZiAoT2JqZWN0Lmhhc093bihtZXNzYWdlLCBcImVycm9yXCIpKVxuICAgICAgICBwcm9taXNlLnJlamVjdChtZXNzYWdlLmVycm9yKTtcbiAgICAgIGVsc2VcbiAgICAgICAgdGhyb3cgbmV3IEVycm9yKGBVbmtub3duIG1lc3NhZ2UgdHlwZSBvZiBcIiR7bWVzc2FnZX1cImApO1xuICAgIH1cbiAgfVxuXG4gIHByaXZhdGUgb25Xb3JrZXJFcnJvcihlcnJvcjogRXJyb3IpIHtcbiAgICBpZiAoZXJyb3IgaW5zdGFuY2VvZiBFcnJvcilcbiAgICAgIGxvZ2dlci5mYXRhbChlcnJvci5zdGFjayk7XG4gICAgZWxzZVxuICAgICAgbG9nZ2VyLmZhdGFsKGVycm9yKTtcbiAgICBwcm9jZXNzLmV4aXQoMSk7XG4gIH1cblxuICBwcml2YXRlIG9uV29ya2VyRXhpdChjb2RlOiBudW1iZXIpIHtcbiAgICBpZiAoY29kZSlcbiAgICAgIHByb2Nlc3MuZXhpdChjb2RlKTtcbiAgfVxufTtcbiIsIi8qXG4gKiBNSVQgTGljZW5zZVxuICpcbiAqIENvcHlyaWdodCAoYykgMjAyNSAgWXVyaWkgWWFrdWJpbiAoeXVyaWkueWFrdWJpbkBnbWFpbC5jb20pXG4gKlxuICogUGVybWlzc2lvbiBpcyBncmFudGVkIHRvIHVzZSwgY29weSwgbW9kaWZ5LCBhbmQgZGlzdHJpYnV0ZSB0aGlzIHNvZnR3YXJlXG4gKiB1bmRlciB0aGUgTUlUIExpY2Vuc2UuIFNlZSBMSUNFTlNFIGZpbGUgZm9yIGRldGFpbHMuXG4gKi9cblxuaW1wb3J0IGZzIGZyb20gXCJub2RlOmZzXCI7XG5cbmltcG9ydCB7IFByb2plY3RDb250ZXh0IH0gZnJvbSBcIkAvY29yZS9Qcm9qZWN0Q29udGV4dFwiO1xuaW1wb3J0IHsgU2NyaXB0Q29udGV4dCB9IGZyb20gXCJAL2NvcmUvU2NyaXB0Q29udGV4dFwiO1xuaW1wb3J0IHsgU2NvcGVIZWxwZXIsIFZhcmlhYmxlTWFwIH0gZnJvbSBcIkAvY29yZS9TY29wZVwiO1xuaW1wb3J0IHsgTWFrZUNsaWVudCB9IGZyb20gXCJAL3NlcnZlci9NYWtlQ2xpZW50XCI7XG5pbXBvcnQgeyBKc29uUnBjU2VydmVyIH0gZnJvbSBcIkAvc2VydmVyL0pzb25ScGNTZXJ2ZXJcIjtcbmltcG9ydCB7IGltcG9ydE1vZHVsZSB9IGZyb20gXCJAL3V0aWxzL01vZHVsZVwiO1xuaW1wb3J0IHsgY3JlYXRlVmFyaWFibGVNYXBGb3JEaXJlY3RvcnkgfSBmcm9tIFwiQC9jb3JlL0Jhc2VDb250ZXh0XCI7XG5pbXBvcnQgeyBNQUlOTk9ERV9TVEFSVE1BS0VTQ1JJUFQgfSBmcm9tIFwiQC9zZXJ2ZXIvUmVtb3RlTWV0aG9kc1wiO1xuaW1wb3J0IHsgTUFJTk5PREVfTE9BREpTT04gfSBmcm9tIFwiQC9zZXJ2ZXIvUmVtb3RlTWV0aG9kc1wiO1xuaW1wb3J0IHsgTUFJTk5PREVfRVhFQ1VURVNDUklQVCB9IGZyb20gXCJAL3NlcnZlci9SZW1vdGVNZXRob2RzXCI7XG5pbXBvcnQgeyBXT1JLRVJOT0RFX1NUQVJUTUFLRVNDUklQVCB9IGZyb20gXCJAL3NlcnZlci9SZW1vdGVNZXRob2RzXCI7XG5pbXBvcnQgeyBMb2dnZXIgfSBmcm9tIFwiQC9sb2dnZXJcIjtcblxuY29uc3QgbG9nZ2VyID0gTG9nZ2VyLmNyZWF0ZShpbXBvcnQubWV0YS51cmwpO1xuXG5leHBvcnQgY29uc3QgQ09ORklHVVJFX0VWRU5UID0gXCJjb25maWd1cmVcIjtcbmV4cG9ydCBjb25zdCBCVUlMRF9FVkVOVCA9IFwiYnVpbGRcIjtcblxuZXhwb3J0IGludGVyZmFjZSBDb25maWd1cmVFdmVudCB7XG4gIHByb2plY3Q6IFByb2plY3RDb250ZXh0O1xufTtcblxuZXhwb3J0IGludGVyZmFjZSBCdWlsZEV2ZW50IHtcbiAgcHJvamVjdDogUHJvamVjdENvbnRleHQ7XG59O1xuXG5leHBvcnQgdHlwZSBDb25maWd1cmVMaXN0ZW5lciA9IChldmVudDogQ29uZmlndXJlRXZlbnQpID0+IHZvaWQ7XG5leHBvcnQgdHlwZSBCdWlsZExpc3RlbmVyID0gKGV2ZW50OiBCdWlsZEV2ZW50KSA9PiB2b2lkO1xuXG5leHBvcnQgaW50ZXJmYWNlIE1lbW9yeVNlbmRlciB7XG4gIHNlbmRNZXNzYWdlKG1lc3NhZ2U6IGFueSk6IHZvaWQ7XG59O1xuXG5leHBvcnQgY2xhc3MgTWFrZVNlcnZlciB7XG4gIHByaXZhdGUgX3Jvb3RWYXJpYWJsZU1hcDogVmFyaWFibGVNYXAgPSB7fTtcbiAgcHJpdmF0ZSBfcHJvamVjdCA9IFByb2plY3RDb250ZXh0LmNyZWF0ZSgpO1xuICBwcml2YXRlIF9saXN0ZW5lcnM6IHsgW25hbWU6IHN0cmluZ106IEZ1bmN0aW9uW10gfTtcbiAgcHJpdmF0ZSBfanNvblJwY1NlcnZlciA9IG5ldyBKc29uUnBjU2VydmVyO1xuICBwcml2YXRlIF9jbGllbnRzID0gbmV3IE1hcDxzdHJpbmcsIE1ha2VDbGllbnQ+O1xuICBwcml2YXRlIF9jbGllbnRJZENvdW50ZXIgPSAxO1xuXG4gIHB1YmxpYyBjb25zdHJ1Y3RvcigpIHtcbiAgICB0aGlzLl9saXN0ZW5lcnMgPSB7XG4gICAgICBbIENPTkZJR1VSRV9FVkVOVCBdOiBuZXcgQXJyYXk8Q29uZmlndXJlTGlzdGVuZXI+LFxuICAgICAgWyBCVUlMRF9FVkVOVCBdOiBuZXcgQXJyYXk8QnVpbGRMaXN0ZW5lcj4sXG4gICAgfTtcbiAgICB0aGlzLl9qc29uUnBjU2VydmVyLnJlZ2lzdGVyQ2FsbGJhY2soTUFJTk5PREVfRVhFQ1VURVNDUklQVCwgcGFyYW1zID0+IHRoaXMuZXhlY3V0ZVNjcmlwdChwYXJhbXMpKTtcbiAgICB0aGlzLl9qc29uUnBjU2VydmVyLnJlZ2lzdGVyQ2FsbGJhY2soTUFJTk5PREVfTE9BREpTT04sIHBhcmFtcyA9PiB0aGlzLmxvYWRKU09OKHBhcmFtcykpO1xuICAgIHRoaXMuX2pzb25ScGNTZXJ2ZXIucmVnaXN0ZXJDYWxsYmFjayhNQUlOTk9ERV9TVEFSVE1BS0VTQ1JJUFQsIHBhcmFtcyA9PiB0aGlzLnN0YXJ0TWFrZVNjcmlwdChwYXJhbXMpKTtcbiAgfVxuXG4gIHB1YmxpYyBnZXQgcm9vdFZhcmlhYmxlTWFwKCkge1xuICAgIHJldHVybiB0aGlzLl9yb290VmFyaWFibGVNYXA7XG4gIH1cblxuICBwdWJsaWMgZ2V0IHByb2plY3QoKSB7XG4gICAgcmV0dXJuIHRoaXMuX3Byb2plY3Q7XG4gIH1cblxuICBwdWJsaWMgY3JlYXRlQ2xpZW50KCkge1xuICAgIGNvbnN0IG5hbWUgPSBcIm1rY1wiICsgdGhpcy5fY2xpZW50SWRDb3VudGVyKys7XG4gICAgY29uc3QgY2xpZW50ID0gbmV3IE1ha2VDbGllbnQodGhpcy5fanNvblJwY1NlcnZlcik7XG4gICAgdGhpcy5fY2xpZW50cy5zZXQobmFtZSwgY2xpZW50KTtcbiAgICByZXR1cm4gY2xpZW50O1xuICB9XG5cbiAgcHVibGljIGFzeW5jIHN0YXJ0TWFrZVNjcmlwdChwYXJhbXM6IGFueSk6IFByb21pc2U8dm9pZD4ge1xuICAgIGxvZ2dlci5kZWJ1ZyhcIk1ha2VTZXJ2ZXIuc3RhcnRNYWtlU2NyaXB0XCIpO1xuXG4gICAgY29uc3QgdmFyaWFibGVNYXAgPSBTY29wZUhlbHBlci5mcm9tSlNPTihwYXJhbXMpO1xuICAgIGF3YWl0IHRoaXMucnVuTWFrZVNjcmlwdCh2YXJpYWJsZU1hcCk7XG4gIH1cblxuICBwcml2YXRlIGFzeW5jIGxvYWRKU09OKGZpbGVuYW1lOiBzdHJpbmcpOiBQcm9taXNlPGFueT4ge1xuICAgIGxvZ2dlci5kZWJ1ZyhcIk1ha2VTZXJ2ZXIubG9hZEpTT04oXCIsIGZpbGVuYW1lLCBcIilcIik7XG4gICAgaWYgKGZpbGVuYW1lLmVuZHNXaXRoKFwiLmpzb25cIikpIHtcbiAgICAgIGNvbnN0IGNvbnRlbnQgPSBhd2FpdCBmcy5wcm9taXNlcy5yZWFkRmlsZShmaWxlbmFtZSwgXCJ1dGY4XCIpO1xuICAgICAgcmV0dXJuIEpTT04ucGFyc2UoY29udGVudCk7XG4gICAgfVxuXG4gICAgY29uc3QgbW9kdWxlID0gYXdhaXQgaW1wb3J0TW9kdWxlKGZpbGVuYW1lKTtcbiAgICBpZiAoIW1vZHVsZS5kZWZhdWx0KVxuICAgICAgdGhyb3cgbmV3IEVycm9yKGBTY3JpcHQgXCIke2ZpbGVuYW1lfVwiIGhhcyBub3QgY29udGFpbiBhIGRlZmF1bHQgZnVuY3Rpb25gKTtcblxuICAgIHJldHVybiBtb2R1bGUuZGVmYXVsdDtcbiAgfVxuXG4gIHByaXZhdGUgYXN5bmMgZXhlY3V0ZVNjcmlwdChwYXJhbXM6IGFueSk6IFByb21pc2U8dm9pZD4ge1xuICAgIGxvZ2dlci5kZWJ1ZyhcIk1ha2VTZXJ2ZXIuZXhlY3V0ZVNjcmlwdFwiKTtcbiAgICBjb25zdCB2YXJpYWJsZU1hcCA9IFNjb3BlSGVscGVyLmZyb21KU09OKHBhcmFtcyk7XG4gICAgY29uc3Qgc2NyaXB0RmlsZSA9IFNjb3BlSGVscGVyLmdldCh2YXJpYWJsZU1hcCwgXCJTQ1JJUFRfRklMRVwiKTtcblxuICAgIGNvbnN0IG1vZHVsZSA9IGF3YWl0IGltcG9ydE1vZHVsZShzY3JpcHRGaWxlLnRvU3RyaW5nKCkpO1xuICAgIGlmICghbW9kdWxlLmRlZmF1bHQpXG4gICAgICB0aHJvdyBuZXcgRXJyb3IoYFNjcmlwdCBcIiR7c2NyaXB0RmlsZX1cIiBoYXMgbm90IGNvbnRhaW4gYSBkZWZhdWx0IGZ1bmN0aW9uYCk7XG5cbiAgICBjb25zdCBtayA9IFNjcmlwdENvbnRleHQuY3JlYXRlKHZhcmlhYmxlTWFwKTtcbiAgICBtb2R1bGUuZGVmYXVsdChtayk7XG4gIH1cblxuICBwdWJsaWMgYXN5bmMgcnVuTWFrZVNjcmlwdCh2YXJpYWJsZU1hcDogVmFyaWFibGVNYXApOiBQcm9taXNlPGJvb2xlYW4+IHtcbiAgICBpZiAoIWF3YWl0IHRoaXMuX3Byb2plY3QucHJlcGVhclNjcmlwdEZpbGUodmFyaWFibGVNYXApKVxuICAgICAgcmV0dXJuIGZhbHNlO1xuXG4gICAgY29uc3QgY2xpZW50ID0gdGhpcy5jcmVhdGVDbGllbnQoKTtcblxuICAgIGNvbnN0IGN3ZFNhdmUgPSBwcm9jZXNzLmN3ZCgpO1xuICAgIGNvbnN0IHNjcmlwdERpciA9IFNjb3BlSGVscGVyLmdldCh2YXJpYWJsZU1hcCwgXCJTQ1JJUFRfRElSXCIpO1xuICAgIHByb2Nlc3MuY2hkaXIoc2NyaXB0RGlyLnRvU3RyaW5nKCkpO1xuICAgIGF3YWl0IGNsaWVudC5yZXF1ZXN0KFdPUktFUk5PREVfU1RBUlRNQUtFU0NSSVBULCBTY29wZUhlbHBlci50b0pTT04odmFyaWFibGVNYXApKTtcbiAgICBwcm9jZXNzLmNoZGlyKGN3ZFNhdmUpO1xuXG4gICAgcmV0dXJuIHRydWU7XG4gIH1cblxuICBwdWJsaWMgYXN5bmMgc3RhcnQoKSB7XG4gICAgY29uc3Qgc291cmNlRGlyID0gU2NvcGVIZWxwZXIuZ2V0KHRoaXMuX3Jvb3RWYXJpYWJsZU1hcCwgXCJQUk9KRUNUX1NPVVJDRV9ESVJcIik7XG4gICAgY29uc3QgYmluYXJ5RGlyID0gU2NvcGVIZWxwZXIuZ2V0KHRoaXMuX3Jvb3RWYXJpYWJsZU1hcCwgXCJQUk9KRUNUX0JJTkFSWV9ESVJcIik7XG5cbiAgICAvKmNvbnN0IHZhcmlhYmxlTWFwID0gY3JlYXRlVmFyaWFibGVNYXBGb3JEaXJlY3RvcnkodGhpcy5fcm9vdFZhcmlhYmxlTWFwLCBzb3VyY2VEaXIsIGJpbmFyeURpcik7XG4gICAgaWYgKCFhd2FpdCB0aGlzLnJ1bk1ha2VTY3JpcHQodmFyaWFibGVNYXApKVxuICAgICAgdGhyb3cgRXJyb3IoXCJDYW4ndCBwcmVwZWFyIFNjcmlwdEZpbGVcIik7Ki9cblxuICAgIC8vIHRoaXMub25Db25maWd1cmVFbmQoKTtcblxuICAgIHRoaXMuX3Byb2plY3QuYWRkU3ViZGlyZWN0b3J5KHRoaXMuX3Jvb3RWYXJpYWJsZU1hcCwgc291cmNlRGlyLCBiaW5hcnlEaXIpO1xuICAgIHRoaXMuX3Byb2plY3QuZG9TdWJkaXJlY3RvcnkoKS50aGVuKCgpID0+IHRoaXMub25Db25maWd1cmVFbmQoKSk7XG4gIH1cblxuICBwcml2YXRlIGFzeW5jIG9uQ29uZmlndXJlRW5kKCkge1xuICAgIGNvbnN0IGV2ZW50ID0geyBwcm9qZWN0OiB0aGlzLl9wcm9qZWN0IH07XG4gICAgYXdhaXQgdGhpcy5lbWl0RXZlbnQoQ09ORklHVVJFX0VWRU5ULCBldmVudCk7XG4gICAgYXdhaXQgdGhpcy5lbWl0RXZlbnQoQlVJTERfRVZFTlQsIGV2ZW50KTtcbiAgfVxuXG4gIHByaXZhdGUgYXN5bmMgZW1pdEV2ZW50PFQ+KHR5cGU6IHN0cmluZywgZXZlbnQ6IFQpOiBQcm9taXNlPHZvaWQ+IHtcbiAgICBmb3IgKGNvbnN0IGxpc3RlbmVyIG9mIHRoaXMuX2xpc3RlbmVyc1t0eXBlXSkge1xuICAgICAgY29uc3QgcmVzdWx0ID0gbGlzdGVuZXIoZXZlbnQpO1xuICAgICAgaWYgKHJlc3VsdCBpbnN0YW5jZW9mIFByb21pc2UpXG4gICAgICAgIGF3YWl0IHJlc3VsdDtcbiAgICB9XG4gIH1cbiAgXG4gIHB1YmxpYyBhZGRFdmVudExpc3RlbmVyKHR5cGU6IFwiY29uZmlndXJlXCIsIGxpc3RlbmVyOiBDb25maWd1cmVMaXN0ZW5lcik6IHZvaWQ7XG4gIHB1YmxpYyBhZGRFdmVudExpc3RlbmVyKHR5cGU6IFwiYnVpbGRcIiwgbGlzdGVuZXI6IEJ1aWxkTGlzdGVuZXIpOiB2b2lkO1xuICBwdWJsaWMgYWRkRXZlbnRMaXN0ZW5lcih0eXBlOiBzdHJpbmcsIGxpc3RlbmVyOiBGdW5jdGlvbik6IHZvaWQge1xuICAgIHRoaXMuX2xpc3RlbmVyc1t0eXBlXS5wdXNoKGxpc3RlbmVyKTtcbiAgfVxufTtcbiIsIi8qXG4gKiBNSVQgTGljZW5zZVxuICpcbiAqIENvcHlyaWdodCAoYykgMjAyNSAgWXVyaWkgWWFrdWJpbiAoeXVyaWkueWFrdWJpbkBnbWFpbC5jb20pXG4gKlxuICogUGVybWlzc2lvbiBpcyBncmFudGVkIHRvIHVzZSwgY29weSwgbW9kaWZ5LCBhbmQgZGlzdHJpYnV0ZSB0aGlzIHNvZnR3YXJlXG4gKiB1bmRlciB0aGUgTUlUIExpY2Vuc2UuIFNlZSBMSUNFTlNFIGZpbGUgZm9yIGRldGFpbHMuXG4gKi9cblxuaW1wb3J0IHsgSU1lc3NhZ2VTZW5kZXIsIElSZXF1ZXN0U3luYyB9IGZyb20gXCJAL3NlcnZlci9UcmFuc3BvcnRcIjtcbmltcG9ydCB7IExvZ2dlciB9IGZyb20gXCJAL2xvZ2dlclwiO1xuXG5jb25zdCBsb2dnZXIgPSBMb2dnZXIuY3JlYXRlKGltcG9ydC5tZXRhLnVybCk7XG5cbmV4cG9ydCBjbGFzcyBNZW1vcnlNZXNzYWdlU2VuZGVyIGltcGxlbWVudHMgSU1lc3NhZ2VTZW5kZXIge1xuICBwcml2YXRlIF9idWZmZXI6IFNoYXJlZEFycmF5QnVmZmVyO1xuICBwcml2YXRlIF9tZW1vcnk6IE1lbW9yeVRyYW5zcG9ydC5CdWZmZXI7XG5cbiAgcHVibGljIGNvbnN0cnVjdG9yKGJ1ZmZlcjogU2hhcmVkQXJyYXlCdWZmZXIpIHtcbiAgICB0aGlzLl9idWZmZXIgPSBidWZmZXI7XG4gICAgdGhpcy5fbWVtb3J5ID0gbmV3IE1lbW9yeVRyYW5zcG9ydC5CdWZmZXIoYnVmZmVyKTtcbiAgfVxuXG4gIHB1YmxpYyBzZW5kTWVzc2FnZShtZXNzYWdlOiBhbnkpOiB2b2lkIHtcbiAgICB0aGlzLl9tZW1vcnkuc2V0KG1lc3NhZ2UsIHRydWUpO1xuICB9XG5cbiAgcHVibGljIHJlYWRNZXNzYWdlKCk6IGFueSB7XG4gICAgcmV0dXJuIHRoaXMuX21lbW9yeS5nZXQoKTtcbiAgfVxufTtcblxuZXhwb3J0IGNsYXNzIE1lbW9yeVRyYW5zcG9ydCBpbXBsZW1lbnRzIElSZXF1ZXN0U3luYyB7XG4gIHByaXZhdGUgX3NlbmRlcjogSU1lc3NhZ2VTZW5kZXI7XG4gIHByaXZhdGUgX2J1ZmZlcjogU2hhcmVkQXJyYXlCdWZmZXI7XG4gIHByaXZhdGUgX21lbW9yeTogTWVtb3J5VHJhbnNwb3J0LkJ1ZmZlcjtcblxuICBwdWJsaWMgY29uc3RydWN0b3Ioc2VuZGVyOiBJTWVzc2FnZVNlbmRlciwgYnVmZmVyOiBTaGFyZWRBcnJheUJ1ZmZlcikge1xuICAgIHRoaXMuX3NlbmRlciA9IHNlbmRlcjtcbiAgICB0aGlzLl9idWZmZXIgPSBidWZmZXI7XG4gICAgdGhpcy5fbWVtb3J5ID0gbmV3IE1lbW9yeVRyYW5zcG9ydC5CdWZmZXIoYnVmZmVyKTtcbiAgfVxuXG4gIHB1YmxpYyByZXF1ZXN0U3luYyhkYXRhOiBhbnkpOiBhbnkge1xuICAgIHRoaXMuX21lbW9yeS5zZXQoZGF0YSk7XG4gICAgdGhpcy5fc2VuZGVyLnNlbmRNZXNzYWdlKHRoaXMuX2J1ZmZlcik7XG4gICAgcmV0dXJuIHRoaXMuX21lbW9yeS5nZXQodHJ1ZSk7XG4gIH1cbn07XG5cbmV4cG9ydCBuYW1lc3BhY2UgTWVtb3J5VHJhbnNwb3J0IHtcblxuY29uc3QgTUFHSUNfT0ZGU0VUID0gMDtcblxuZXhwb3J0IGNsYXNzIEJ1ZmZlciB7XG4gIHByaXZhdGUgX3NpZ25hbDogSW50MzJBcnJheTtcbiAgcHJpdmF0ZSBfZGF0YTogVWludDhBcnJheTtcbiAgcHJpdmF0ZSBfbWFnaWM6IG51bWJlcjtcblxuICBwdWJsaWMgY29uc3RydWN0b3IoYnVmZmVyOiBTaGFyZWRBcnJheUJ1ZmZlcikge1xuICAgIHRoaXMuX3NpZ25hbCA9IG5ldyBJbnQzMkFycmF5KGJ1ZmZlciwgTUFHSUNfT0ZGU0VULCAxKTtcbiAgICB0aGlzLl9kYXRhID0gbmV3IFVpbnQ4QXJyYXkoYnVmZmVyLCB0aGlzLl9zaWduYWwuQllURVNfUEVSX0VMRU1FTlQpO1xuICAgIHRoaXMuX21hZ2ljID0gMDtcbiAgfVxuXG4gIHB1YmxpYyBnZXQoc3luYyA9IGZhbHNlKTogYW55IHtcbiAgICBpZiAoc3luYykge1xuICAgICAgQXRvbWljcy53YWl0KHRoaXMuX3NpZ25hbCwgTUFHSUNfT0ZGU0VULCB0aGlzLl9tYWdpYyk7XG4gICAgfVxuXG4gICAgdGhpcy5fbWFnaWMgPSB0aGlzLl9zaWduYWxbMF07XG4gICAgY29uc3QgbGVuZ3RoID0gdGhpcy5fbWFnaWMgPj4gODtcbiAgICBjb25zdCBieXRlcyA9IHRoaXMuX2RhdGEuc2xpY2UoMCwgbGVuZ3RoKTtcbiAgICBjb25zdCBtZXNzYWdlID0gKG5ldyBUZXh0RGVjb2RlcigpKS5kZWNvZGUoYnl0ZXMpO1xuXG4gICAgcmV0dXJuIEpTT04ucGFyc2UobWVzc2FnZSk7XG4gIH1cblxuICBwdWJsaWMgc2V0KGpzb246IGFueSwgbm90aWZ5ID0gZmFsc2UpIHtcbiAgICBjb25zdCBtZXNzYWdlID0gSlNPTi5zdHJpbmdpZnkoanNvbik7XG4gICAgY29uc3QgYnl0ZXMgPSAobmV3IFRleHRFbmNvZGVyKCkpLmVuY29kZShtZXNzYWdlKTtcbiAgICB0aGlzLl9kYXRhLnNldChieXRlcyk7XG4gICAgdGhpcy5fbWFnaWMgPSAoYnl0ZXMubGVuZ3RoIDw8IDgpIHwgKCh0aGlzLl9tYWdpYyArIDEpICYgMjU1KTtcbiAgICB0aGlzLl9zaWduYWxbMF0gPSB0aGlzLl9tYWdpYztcblxuICAgIGlmIChub3RpZnkpIHtcbiAgICAgIEF0b21pY3Mubm90aWZ5KHRoaXMuX3NpZ25hbCwgTUFHSUNfT0ZGU0VULCAxKTtcbiAgICB9XG4gIH1cbn07XG5cbn0gLy8gbmFtZXNwYWNlIE1lbW9yeVRyYW5zcG9ydFxuIiwiLypcbiAqIE1JVCBMaWNlbnNlXG4gKlxuICogQ29weXJpZ2h0IChjKSAyMDI1ICBZdXJpaSBZYWt1YmluICh5dXJpaS55YWt1YmluQGdtYWlsLmNvbSlcbiAqXG4gKiBQZXJtaXNzaW9uIGlzIGdyYW50ZWQgdG8gdXNlLCBjb3B5LCBtb2RpZnksIGFuZCBkaXN0cmlidXRlIHRoaXMgc29mdHdhcmVcbiAqIHVuZGVyIHRoZSBNSVQgTGljZW5zZS4gU2VlIExJQ0VOU0UgZmlsZSBmb3IgZGV0YWlscy5cbiAqL1xuXG5pbXBvcnQgeyBNZXNzYWdlUG9ydCB9IGZyb20gXCJub2RlOndvcmtlcl90aHJlYWRzXCI7XG5pbXBvcnQgeyBJTWVzc2FnZVNlbmRlciB9IGZyb20gXCJAL3NlcnZlci9UcmFuc3BvcnRcIjtcbmltcG9ydCB7IExvZ2dlciB9IGZyb20gXCJAL2xvZ2dlclwiO1xuXG5jb25zdCBsb2dnZXIgPSBMb2dnZXIuY3JlYXRlKGltcG9ydC5tZXRhLnVybCk7XG5cbmV4cG9ydCBjbGFzcyBNZXNzYWdlUG9ydFNlbmRlciBpbXBsZW1lbnRzIElNZXNzYWdlU2VuZGVyIHtcbiAgcHJpdmF0ZSBfbWVzc2FnZVBvcnQ6IE1lc3NhZ2VQb3J0O1xuXG4gIHB1YmxpYyBjb25zdHJ1Y3RvcihtZXNzYWdlUG9ydDogTWVzc2FnZVBvcnQpIHtcbiAgICB0aGlzLl9tZXNzYWdlUG9ydCA9IG1lc3NhZ2VQb3J0O1xuICB9XG5cbiAgcHVibGljIHNlbmRNZXNzYWdlKG1lc3NhZ2U6IGFueSk6IHZvaWQge1xuICAgIGxvZ2dlci5kZWJ1ZyhcIjwtLVwiLCBKU09OLnN0cmluZ2lmeShtZXNzYWdlKSk7XG4gICAgdGhpcy5fbWVzc2FnZVBvcnQucG9zdE1lc3NhZ2UobWVzc2FnZSk7XG4gIH1cbn07XG4iLCIvKlxuICogTUlUIExpY2Vuc2VcbiAqXG4gKiBDb3B5cmlnaHQgKGMpIDIwMjUgIFl1cmlpIFlha3ViaW4gKHl1cmlpLnlha3ViaW5AZ21haWwuY29tKVxuICpcbiAqIFBlcm1pc3Npb24gaXMgZ3JhbnRlZCB0byB1c2UsIGNvcHksIG1vZGlmeSwgYW5kIGRpc3RyaWJ1dGUgdGhpcyBzb2Z0d2FyZVxuICogdW5kZXIgdGhlIE1JVCBMaWNlbnNlLiBTZWUgTElDRU5TRSBmaWxlIGZvciBkZXRhaWxzLlxuICovXG5cbmltcG9ydCB7IE1ha2VDb250ZXh0IH0gZnJvbSBcIkAvY29yZS9CYXNlQ29udGV4dFwiO1xuaW1wb3J0IHsgY3JlYXRlVmFyaWFibGVNYXBGb3JEaXJlY3RvcnkgfSBmcm9tIFwiQC9jb3JlL0Jhc2VDb250ZXh0XCI7XG5pbXBvcnQgeyBKc29uUnBjUmVxdWVzdFN5bmMgfSBmcm9tIFwiQC9zZXJ2ZXIvSnNvblJwY1JlcXVlc3RTeW5jXCI7XG5pbXBvcnQgeyBNQUlOTk9ERV9MT0FESlNPTiB9IGZyb20gXCJAL3NlcnZlci9SZW1vdGVNZXRob2RzXCI7XG5pbXBvcnQgeyBNQUlOTk9ERV9FWEVDVVRFU0NSSVBUIH0gZnJvbSBcIkAvc2VydmVyL1JlbW90ZU1ldGhvZHNcIjtcbmltcG9ydCB7IE1BSU5OT0RFX1NUQVJUTUFLRVNDUklQVCB9IGZyb20gXCJAL3NlcnZlci9SZW1vdGVNZXRob2RzXCI7XG5pbXBvcnQgeyBMb2dnZXIgfSBmcm9tIFwiQC9sb2dnZXJcIjtcbmltcG9ydCB7IFNjb3BlSGVscGVyLCBWYXJpYWJsZU1hcCwgVmFyaWFudE1hcCB9IGZyb20gXCJAL2NvcmUvU2NvcGVcIjtcbmltcG9ydCB7IENVU1RPTV9WQVJJQUJMRV9HUk9VUCB9IGZyb20gXCJAL0NvbnN0YW50c1wiO1xuaW1wb3J0IHsgQWJzb2x1dGVQYXRoIH0gZnJvbSBcIkAvY29yZS9BYnNvbHV0ZVBhdGhcIjtcblxuY29uc3QgbG9nZ2VyID0gTG9nZ2VyLmNyZWF0ZShpbXBvcnQubWV0YS51cmwpO1xuXG5leHBvcnQgY2xhc3MgUmVtb3RlTWFrZUNvbnRleHQgZXh0ZW5kcyBNYWtlQ29udGV4dCB7XG4gIHByaXZhdGUgX3RyYW5zcG9ydDogSnNvblJwY1JlcXVlc3RTeW5jO1xuXG4gIHB1YmxpYyBjb25zdHJ1Y3RvcihzY29wZTogVmFyaWFibGVNYXAsIHRyYW5zcG9ydDogSnNvblJwY1JlcXVlc3RTeW5jKSB7XG4gICAgc3VwZXIoc2NvcGUpO1xuICAgIHRoaXMuX3RyYW5zcG9ydCA9IHRyYW5zcG9ydDtcbiAgfVxuXG4gIHB1YmxpYyBleGVjdXRlU2NyaXB0KHNjcmlwdDogYW55LCBwYXJhbXM6IGFueSk6IGFueSB7XG4gICAgbG9nZ2VyLmRlYnVnKFwiUmVtb3RlTWFrZUNvbnRleHQuZXhlY3V0ZVNjcmlwdChcIiwgc2NyaXB0LCBwYXJhbXMsIFwiKVwiKTtcbiAgICBjb25zdCBuZXdWYXJpYWJsZU1hcCA9IFNjb3BlSGVscGVyLmNsb25lVmFyaWFibGVNYXAodGhpcy5fc2NvcGUpO1xuICAgIHBhcmFtcyAmJiBTY29wZUhlbHBlci5leHRlbmRWYXJpYWJsZU1hcEJ5VmFsdWVzKG5ld1ZhcmlhYmxlTWFwLCBcIlwiLCBwYXJhbXMpO1xuICAgIGNvbnN0IHNjcmlwdEZpbGUgPSBTY29wZUhlbHBlci5nZXQobmV3VmFyaWFibGVNYXAsIFwiU09VUkNFX0RJUlwiKS5yZXNvbHZlKHNjcmlwdCk7XG4gICAgU2NvcGVIZWxwZXIuc2V0KG5ld1ZhcmlhYmxlTWFwLCBcIlNDUklQVF9GSUxFXCIsIHNjcmlwdEZpbGUpO1xuICAgIFNjb3BlSGVscGVyLnNldChuZXdWYXJpYWJsZU1hcCwgXCJTQ1JJUFRfRElSXCIsIHNjcmlwdEZpbGUuZGlybmFtZSgpKTtcbiAgICByZXR1cm4gdGhpcy5fdHJhbnNwb3J0LnJlcXVlc3RTeW5jKE1BSU5OT0RFX0VYRUNVVEVTQ1JJUFQsIFNjb3BlSGVscGVyLnRvSlNPTihuZXdWYXJpYWJsZU1hcCkpO1xuICB9XG4gIFxuICBwdWJsaWMgYWRkQ2FjaGVWYXJpYWJsZXMocGFyYW1zOiBzdHJpbmcgfCBWYXJpYW50TWFwKTogdm9pZCB7XG4gICAgbG9nZ2VyLmRlYnVnKFwiUmVtb3RlTWFrZUNvbnRleHQuYWRkQ2FjaGVWYXJpYWJsZXMoXCIsIHBhcmFtcywgXCIpXCIpO1xuICAgIGxldCB2YXJpYWJsZXMgPSBwYXJhbXM7XG4gICAgaWYgKHR5cGVvZiBwYXJhbXMgPT09IFwic3RyaW5nXCIpIHtcbiAgICAgIGNvbnN0IGZpbGVuYW1lID0gU2NvcGVIZWxwZXIuZ2V0KHRoaXMuX3Njb3BlLCBcIlNPVVJDRV9ESVJcIikucmVzb2x2ZShwYXJhbXMpLnRvU3RyaW5nKCk7XG4gICAgICB2YXJpYWJsZXMgPSB0aGlzLl90cmFuc3BvcnQucmVxdWVzdFN5bmMoTUFJTk5PREVfTE9BREpTT04sIGZpbGVuYW1lKTtcbiAgICB9XG4gICAgU2NvcGVIZWxwZXIuZGVmaW5lVmFyaWFibGVzSW5WYXJpYWJsZU1hcCh0aGlzLl9zY29wZSwgQ1VTVE9NX1ZBUklBQkxFX0dST1VQLCB2YXJpYWJsZXMpO1xuICB9XG5cbiAgcHVibGljIGFkZFN1YmRpcmVjdG9yeShzb3VyY2VEaXI6IHN0cmluZyB8IEFic29sdXRlUGF0aCwgYmluYXJ5RGlyPzogc3RyaW5nIHwgQWJzb2x1dGVQYXRoKTogdm9pZCB7XG4gICAgbG9nZ2VyLmRlYnVnKFwiUmVtb3RlTWFrZUNvbnRleHQuYWRkU3ViZGlyZWN0b3J5KFwiLCBzb3VyY2VEaXIsIGJpbmFyeURpciwgXCIpXCIpO1xuICAgIGNvbnN0IG5ld1ZhcmlhYmxlTWFwID0gY3JlYXRlVmFyaWFibGVNYXBGb3JEaXJlY3RvcnkodGhpcy5fc2NvcGUsIHNvdXJjZURpciwgYmluYXJ5RGlyKTtcbiAgICB0aGlzLl90cmFuc3BvcnQucmVxdWVzdFN5bmMoTUFJTk5PREVfU1RBUlRNQUtFU0NSSVBULCBTY29wZUhlbHBlci50b0pTT04obmV3VmFyaWFibGVNYXApKTtcbiAgfVxufTtcbiIsIi8qXG4gKiBNSVQgTGljZW5zZVxuICpcbiAqIENvcHlyaWdodCAoYykgMjAyNSAgWXVyaWkgWWFrdWJpbiAoeXVyaWkueWFrdWJpbkBnbWFpbC5jb20pXG4gKlxuICogUGVybWlzc2lvbiBpcyBncmFudGVkIHRvIHVzZSwgY29weSwgbW9kaWZ5LCBhbmQgZGlzdHJpYnV0ZSB0aGlzIHNvZnR3YXJlXG4gKiB1bmRlciB0aGUgTUlUIExpY2Vuc2UuIFNlZSBMSUNFTlNFIGZpbGUgZm9yIGRldGFpbHMuXG4gKi9cblxuZXhwb3J0IGNvbnN0IFdPUktFUk5PREVfU1RBUlRNQUtFU0NSSVBUID0gXCJXb3JrZXJOb2RlLnN0YXJ0TWFrZVNjcmlwdFwiO1xuXG5leHBvcnQgY29uc3QgTUFJTk5PREVfTE9BREpTT04gPSBcIk1haW5Ob2RlLmxvYWRKU09OXCI7XG5leHBvcnQgY29uc3QgTUFJTk5PREVfRVhFQ1VURVNDUklQVCA9IFwiTWFpbk5vZGUuZXhlY3V0ZVNjcmlwdFwiO1xuZXhwb3J0IGNvbnN0IE1BSU5OT0RFX1NUQVJUTUFLRVNDUklQVCA9IFwiTWFpbk5vZGUuc3RhcnRNYWtlU2NyaXB0XCI7XG4iLCIvKlxuICogTUlUIExpY2Vuc2VcbiAqXG4gKiBDb3B5cmlnaHQgKGMpIDIwMjUgIFl1cmlpIFlha3ViaW4gKHl1cmlpLnlha3ViaW5AZ21haWwuY29tKVxuICpcbiAqIFBlcm1pc3Npb24gaXMgZ3JhbnRlZCB0byB1c2UsIGNvcHksIG1vZGlmeSwgYW5kIGRpc3RyaWJ1dGUgdGhpcyBzb2Z0d2FyZVxuICogdW5kZXIgdGhlIE1JVCBMaWNlbnNlLiBTZWUgTElDRU5TRSBmaWxlIGZvciBkZXRhaWxzLlxuICovXG5cbmV4cG9ydCBjb25zdCBKU09OUlBDX1ZFUlNJT04gPSBcIjIuMFwiO1xuZXhwb3J0IGludGVyZmFjZSBJTWVzc2FnZVNlbmRlciB7XG4gIHNlbmRNZXNzYWdlKG1lc3NhZ2U6IGFueSk6IHZvaWQ7XG59O1xuXG5leHBvcnQgaW50ZXJmYWNlIElNZXNzYWdlRW1pdHRlciB7XG4gIGVtaXRNZXNzYWdlKHNlbmRlcjogSU1lc3NhZ2VTZW5kZXIsIG1lc3NhZ2U6IGFueSk6IHZvaWQ7XG59O1xuXG5leHBvcnQgaW50ZXJmYWNlIElSZXF1ZXN0U3luYyB7XG4gIHJlcXVlc3RTeW5jKGRhdGE6IGFueSk6IGFueTtcbn07XG5cbmV4cG9ydCBpbnRlcmZhY2UgSUpzb25ScGNSZWNpdmVyIHtcbiAgb25SZXF1ZXN0KG1ldGhvZDogc3RyaW5nLCBpZDogbnVtYmVyLCBwYXJhbXM/OiBhbnkpOiB2b2lkO1xuICBvblJlc3VsdChyZXN1bHQ6IGFueSwgaWQ6IG51bWJlcik6IHZvaWQ7XG4gIG9uRXJyb3IoZXJyb3I6IG9iamVjdCwgaWQ6IG51bWJlciB8IG51bGwpOiB2b2lkO1xuICBvbk5vdGlmaWNhdGlvbihtZXRob2Q6IHN0cmluZywgcGFyYW1zPzogYW55KTogdm9pZDtcbn07XG5cbmV4cG9ydCBpbnRlcmZhY2UgSUpzb25ScGNTZW5kZXIge1xuICAvLyBzZW5kTWV0aG9kKG1ldGhvZDogc3RyaW5nLCBwYXJhbXM/OiBhbnksIGNhbGxiYWNrOiAoKSk6IHZvaWQ7XG59O1xuXG5leHBvcnQgaW50ZXJmYWNlIEpzb25ScGNEYXRhIHtcbiAganNvbnJwYzogc3RyaW5nO1xuICBtZXRob2Q/OiBzdHJpbmc7XG4gIHBhcmFtcz86IGFueTtcbiAgaWQ/OiBudW1iZXI7XG4gIGVycm9yPzoge1xuICAgIGNvZGU6IG51bWJlcixcbiAgICBtZXNzYWdlOiBzdHJpbmcsXG4gICAgZGF0YT86IGFueSxcbiAgfSxcbiAgcmVzdWx0PzogYW55O1xufTtcblxuZXhwb3J0IHR5cGUgSnNvblJwY1JlcXVlc3RIYW5kbGVyID0gKHJlcXVlc3Q6IElKc29uUnBjUmVxdWVzdCwgcmVzcG9uc2U6IElKc29uUnBjUmVzcG9uc2UpID0+IHZvaWQ7XG5leHBvcnQgdHlwZSBKc29uUnBjQ2FsbGJhY2sgPSAocGFyYW1zOiBhbnkpID0+IGFueTtcblxuZXhwb3J0IGludGVyZmFjZSBJSnNvblJwY1JlcXVlc3Qge1xuICBnZXQgcGFyYW1zKCk6IGFueTtcbn07XG5cbmV4cG9ydCBpbnRlcmZhY2UgSUpzb25ScGNSZXNwb25zZSB7XG4gIHNlbmRSZXN1bHQoanNvbjogYW55KTogdm9pZDtcbn07XG4iLCIvKlxuICogTUlUIExpY2Vuc2VcbiAqXG4gKiBDb3B5cmlnaHQgKGMpIDIwMjUgIFl1cmlpIFlha3ViaW4gKHl1cmlpLnlha3ViaW5AZ21haWwuY29tKVxuICpcbiAqIFBlcm1pc3Npb24gaXMgZ3JhbnRlZCB0byB1c2UsIGNvcHksIG1vZGlmeSwgYW5kIGRpc3RyaWJ1dGUgdGhpcyBzb2Z0d2FyZVxuICogdW5kZXIgdGhlIE1JVCBMaWNlbnNlLiBTZWUgTElDRU5TRSBmaWxlIGZvciBkZXRhaWxzLlxuICovXG5cbmltcG9ydCB7IElNZXNzYWdlU2VuZGVyLCBJTWVzc2FnZUVtaXR0ZXIgfSBmcm9tIFwiQC9zZXJ2ZXIvVHJhbnNwb3J0XCI7XG5pbXBvcnQgeyBNZW1vcnlUcmFuc3BvcnQgfSBmcm9tIFwiQC9zZXJ2ZXIvTWVtb3J5VHJhbnNwb3J0XCI7XG5pbXBvcnQgeyBKc29uUnBjU2VydmVyIH0gZnJvbSBcIkAvc2VydmVyL0pzb25ScGNTZXJ2ZXJcIjtcbmltcG9ydCB7IFdvcmtlck5vZGUgfSBmcm9tIFwiQC9zZXJ2ZXIvV29ya2VyTm9kZVwiO1xuaW1wb3J0IHsgV09SS0VSTk9ERV9TVEFSVE1BS0VTQ1JJUFQgfSBmcm9tIFwiQC9zZXJ2ZXIvUmVtb3RlTWV0aG9kc1wiO1xuaW1wb3J0IHsgTG9nZ2VyIH0gZnJvbSBcIkAvbG9nZ2VyXCI7XG5cbmNvbnN0IGxvZ2dlciA9IExvZ2dlci5jcmVhdGUoaW1wb3J0Lm1ldGEudXJsKTtcblxuZXhwb3J0IGNsYXNzIFdvcmtlckxvb3BlciBpbXBsZW1lbnRzIElNZXNzYWdlRW1pdHRlciB7XG4gIHByaXZhdGUgX2pzb25ycGNTZXJ2ZXI6IEpzb25ScGNTZXJ2ZXI7XG5cbiAgcHVibGljIGNvbnN0cnVjdG9yKHNlbmRlcjogSU1lc3NhZ2VTZW5kZXIpIHtcbiAgICB0aGlzLl9qc29ucnBjU2VydmVyID0gbmV3IEpzb25ScGNTZXJ2ZXI7XG5cbiAgICBjb25zdCBidWZmZXIgPSBuZXcgU2hhcmVkQXJyYXlCdWZmZXIoMHg4MDAwKTtcbiAgICBjb25zdCB0cmFuc3BvcnQgPSBuZXcgTWVtb3J5VHJhbnNwb3J0KHNlbmRlciwgYnVmZmVyKTtcblxuICAgIGNvbnN0IHdvcmtlck5vZGUgPSBuZXcgV29ya2VyTm9kZSh0cmFuc3BvcnQpO1xuICAgIHRoaXMuX2pzb25ycGNTZXJ2ZXIucmVnaXN0ZXJDYWxsYmFjayhXT1JLRVJOT0RFX1NUQVJUTUFLRVNDUklQVCwgcGFyYW1zID0+IHdvcmtlck5vZGUuZXhlY01ha2VTY3JpcHQocGFyYW1zKSk7XG4gIH1cblxuICBwdWJsaWMgZW1pdE1lc3NhZ2Uoc2VuZGVyOiBJTWVzc2FnZVNlbmRlciwgbWVzc2FnZTogYW55KTogdm9pZCB7XG4gICAgcmV0dXJuIHRoaXMuX2pzb25ycGNTZXJ2ZXIuZW1pdE1lc3NhZ2Uoc2VuZGVyLCBtZXNzYWdlKTtcbiAgfVxufTtcbiIsIi8qXG4gKiBNSVQgTGljZW5zZVxuICpcbiAqIENvcHlyaWdodCAoYykgMjAyNSAgWXVyaWkgWWFrdWJpbiAoeXVyaWkueWFrdWJpbkBnbWFpbC5jb20pXG4gKlxuICogUGVybWlzc2lvbiBpcyBncmFudGVkIHRvIHVzZSwgY29weSwgbW9kaWZ5LCBhbmQgZGlzdHJpYnV0ZSB0aGlzIHNvZnR3YXJlXG4gKiB1bmRlciB0aGUgTUlUIExpY2Vuc2UuIFNlZSBMSUNFTlNFIGZpbGUgZm9yIGRldGFpbHMuXG4gKi9cblxuaW1wb3J0IHsgSVJlcXVlc3RTeW5jIH0gZnJvbSBcIkAvc2VydmVyL1RyYW5zcG9ydFwiO1xuaW1wb3J0IHsgSnNvblJwY1JlcXVlc3RTeW5jIH0gZnJvbSBcIkAvc2VydmVyL0pzb25ScGNSZXF1ZXN0U3luY1wiO1xuaW1wb3J0IHsgUmVtb3RlTWFrZUNvbnRleHQgfSBmcm9tIFwiQC9zZXJ2ZXIvUmVtb3RlTWFrZUNvbnRleHRcIjtcbmltcG9ydCB7IFVzZXJNYWtlQ29udGV4dCB9IGZyb20gXCJAL2NvcmUvVXNlck1ha2VDb250ZXh0XCI7XG5pbXBvcnQgeyBwZXJmb3JtQ29udGV4dCB9IGZyb20gXCJAL2NvcmUvQmFzZUNvbnRleHRcIjtcbmltcG9ydCB7IFNjb3BlSGVscGVyIH0gZnJvbSBcIkAvY29yZS9TY29wZVwiO1xuXG5leHBvcnQgY2xhc3MgV29ya2VyTm9kZSB7XG4gIHByaXZhdGUgX3RyYW5zcG9ydDogSnNvblJwY1JlcXVlc3RTeW5jO1xuXG4gIHB1YmxpYyBjb25zdHJ1Y3RvcihyZXF1ZXN0U3luYzogSVJlcXVlc3RTeW5jKSB7XG4gICAgdGhpcy5fdHJhbnNwb3J0ID0gbmV3IEpzb25ScGNSZXF1ZXN0U3luYyhyZXF1ZXN0U3luYyk7XG4gIH1cblxuICBwdWJsaWMgYXN5bmMgZXhlY01ha2VTY3JpcHQocGFyYW1zOiBhbnkpOiBQcm9taXNlPHZvaWQ+IHtcbiAgICBjb25zdCB2YXJpYWJsZU1hcCA9IFNjb3BlSGVscGVyLmZyb21KU09OKHBhcmFtcyk7XG5cbiAgICBjb25zdCBtayA9IFVzZXJNYWtlQ29udGV4dC5jcmVhdGUobmV3IFJlbW90ZU1ha2VDb250ZXh0KHZhcmlhYmxlTWFwLCB0aGlzLl90cmFuc3BvcnQpLCB2YXJpYWJsZU1hcCk7XG4gICAgYXdhaXQgcGVyZm9ybUNvbnRleHQobWspO1xuICB9XG59O1xuIiwiLypcbiAqIE1JVCBMaWNlbnNlXG4gKlxuICogQ29weXJpZ2h0IChjKSAyMDI1ICBZdXJpaSBZYWt1YmluICh5dXJpaS55YWt1YmluQGdtYWlsLmNvbSlcbiAqXG4gKiBQZXJtaXNzaW9uIGlzIGdyYW50ZWQgdG8gdXNlLCBjb3B5LCBtb2RpZnksIGFuZCBkaXN0cmlidXRlIHRoaXMgc29mdHdhcmVcbiAqIHVuZGVyIHRoZSBNSVQgTGljZW5zZS4gU2VlIExJQ0VOU0UgZmlsZSBmb3IgZGV0YWlscy5cbiAqL1xuXG5pbXBvcnQgeyBXb3JrZXIgfSBmcm9tIFwibm9kZTp3b3JrZXJfdGhyZWFkc1wiO1xuaW1wb3J0IHsgSU1lc3NhZ2VTZW5kZXIgfSBmcm9tIFwiQC9zZXJ2ZXIvVHJhbnNwb3J0XCI7XG5pbXBvcnQgeyBMb2dnZXIgfSBmcm9tIFwiQC9sb2dnZXJcIjtcblxuY29uc3QgbG9nZ2VyID0gTG9nZ2VyLmNyZWF0ZShpbXBvcnQubWV0YS51cmwpO1xuXG5leHBvcnQgY2xhc3MgV29ya2VyU2VuZGVyIGltcGxlbWVudHMgSU1lc3NhZ2VTZW5kZXIge1xuICBwcml2YXRlIF93b3JrZXI6IFdvcmtlcjtcblxuICBwdWJsaWMgY29uc3RydWN0b3Iod29ya2VyOiBXb3JrZXIpIHtcbiAgICB0aGlzLl93b3JrZXIgPSB3b3JrZXI7XG4gIH1cblxuICBwdWJsaWMgc2VuZE1lc3NhZ2UobWVzc2FnZTogYW55KTogdm9pZCB7XG4gICAgbG9nZ2VyLmRlYnVnKFwiPC0tXCIsIG1lc3NhZ2UpO1xuICAgIHRoaXMuX3dvcmtlci5wb3N0TWVzc2FnZShtZXNzYWdlKTtcbiAgfVxufTtcbiIsIi8qXG4gKiBNSVQgTGljZW5zZVxuICpcbiAqIENvcHlyaWdodCAoYykgMjAyNSAgWXVyaWkgWWFrdWJpbiAoeXVyaWkueWFrdWJpbkBnbWFpbC5jb20pXG4gKlxuICogUGVybWlzc2lvbiBpcyBncmFudGVkIHRvIHVzZSwgY29weSwgbW9kaWZ5LCBhbmQgZGlzdHJpYnV0ZSB0aGlzIHNvZnR3YXJlXG4gKiB1bmRlciB0aGUgTUlUIExpY2Vuc2UuIFNlZSBMSUNFTlNFIGZpbGUgZm9yIGRldGFpbHMuXG4gKi9cblxuZXhwb3J0IG5hbWVzcGFjZSBBcmdzIHtcblxuZnVuY3Rpb24gdG9PcHRpb25LZXkobmFtZTogc3RyaW5nKSB7XG4gIGlmICghbmFtZS5zdGFydHNXaXRoKFwiLS1cIikpXG4gICAgcmV0dXJuIG51bGw7XG5cbiAgbmFtZSA9IG5hbWUuc3Vic3RyaW5nKDIpLnRvTG93ZXJDYXNlKCk7XG4gIGlmICghbmFtZS5sZW5ndGgpXG4gICAgcmV0dXJuIG51bGw7XG5cbiAgbGV0IGtleSA9IG5hbWUuY2hhckF0KDApO1xuICBpZiAoIWtleS5tYXRjaCgvW2Etel0vKSlcbiAgICByZXR1cm4gbnVsbDtcblxuICBsZXQgaHlwaGVuID0gMDtcbiAgZm9yIChsZXQgaSA9IDE7IGkgPCBuYW1lLmxlbmd0aDsgaSsrKSB7XG4gICAgY29uc3QgY2ggPSBuYW1lLmNoYXJBdChpKTtcbiAgICBpZiAoY2gubWF0Y2goL1thLXowLTldLykpIHtcbiAgICAgIGtleSArPSAoaHlwaGVuID8gY2gudG9VcHBlckNhc2UoKSA6IGNoKVxuICAgICAgaHlwaGVuID0gMDtcbiAgICB9XG4gICAgZWxzZSBpZiAoY2ggPT0gXCItXCIpIHtcbiAgICAgIGlmICgrK2h5cGhlbiA+IDEpXG4gICAgICAgIHJldHVybiBudWxsO1xuICAgIH1cbiAgfVxuXG4gIHJldHVybiBoeXBoZW4gPyBudWxsIDoga2V5O1xufVxuXG5leHBvcnQgZnVuY3Rpb24gdG9PYmplY3QoYXJnczogc3RyaW5nW10pOiBvYmplY3Qge1xuICBjb25zdCByZXN1bHQ6IGFueSA9IHt9O1xuXG4gIGxldCBsYXN0S2V5ID0gbnVsbDtcbiAgZm9yIChjb25zdCBpdGVyIG9mIGFyZ3MpIHtcbiAgICBpZiAoaXRlci5zdGFydHNXaXRoKFwiLS1cIikpIHtcbiAgICAgIGNvbnN0IGtleSA9IHRvT3B0aW9uS2V5KGl0ZXIpO1xuICAgICAgaWYgKCFrZXkpXG4gICAgICAgIHRocm93IEVycm9yKGBPcHRpb24gJHtpdGVyfSBpcyBub3Qgc3VwcG9ydGVkYCk7XG4gICAgICBpZiAocmVzdWx0Lmhhc093blByb3BlcnR5KGtleSkpXG4gICAgICAgIHRocm93IEVycm9yKGBDYW5ub3Qgc3BlY2lmeSB0aGUgc2FtZSBvcHRpb24gJyR7aXRlcn0nIG1vcmUgdGhhbiBvbmNlYCk7XG4gICAgICBsYXN0S2V5ID0ga2V5O1xuICAgICAgcmVzdWx0W2tleV0gPSB0cnVlO1xuICAgIH1cbiAgICBlbHNlIGlmIChsYXN0S2V5KSB7XG4gICAgICBjb25zdCB2YWx1ZSA9IHJlc3VsdFtsYXN0S2V5XTtcbiAgICAgIGlmICh0eXBlb2YgdmFsdWUgPT09ICdib29sZWFuJylcbiAgICAgICAgcmVzdWx0W2xhc3RLZXldID0gaXRlcjtcbiAgICAgIGVsc2UgaWYgKHR5cGVvZiB2YWx1ZSA9PT0gJ3N0cmluZycpXG4gICAgICAgIHJlc3VsdFtsYXN0S2V5XSA9IFsgdmFsdWUsIGl0ZXIgXTtcbiAgICAgIGVsc2VcbiAgICAgICAgdmFsdWUucHVzaChpdGVyKTtcbiAgICB9XG4gICAgZWxzZSB7XG4gICAgICB0aHJvdyBFcnJvcihgTmVlZCB0byBzcGVjaWZ5IHRoZSBvcHRpb24gbmFtZSBiZWZvcmUgJyR7aXRlcn0nIHBhcmFtZXRlcmApO1xuICAgIH1cbiAgfVxuXG4gIHJldHVybiByZXN1bHQ7XG59XG5cbn0gLy8gbmFtZXNwYWNlIEFyZ3NcbiIsIi8qXG4gKiBNSVQgTGljZW5zZVxuICpcbiAqIENvcHlyaWdodCAoYykgMjAyNSAgWXVyaWkgWWFrdWJpbiAoeXVyaWkueWFrdWJpbkBnbWFpbC5jb20pXG4gKlxuICogUGVybWlzc2lvbiBpcyBncmFudGVkIHRvIHVzZSwgY29weSwgbW9kaWZ5LCBhbmQgZGlzdHJpYnV0ZSB0aGlzIHNvZnR3YXJlXG4gKiB1bmRlciB0aGUgTUlUIExpY2Vuc2UuIFNlZSBMSUNFTlNFIGZpbGUgZm9yIGRldGFpbHMuXG4gKi9cblxuaW1wb3J0IHBhdGggZnJvbSBcIm5vZGU6cGF0aFwiO1xuaW1wb3J0IGZzIGZyb20gXCJub2RlOmZzXCI7XG5pbXBvcnQgeyBzcGF3biB9IGZyb20gXCJub2RlOmNoaWxkX3Byb2Nlc3NcIjtcbmltcG9ydCB7IExvZ2dlciB9IGZyb20gXCJAL2xvZ2dlclwiO1xuXG5jb25zdCBsb2dnZXIgPSBMb2dnZXIuY3JlYXRlKGltcG9ydC5tZXRhLnVybCk7XG5cbnR5cGUgUmVzdWx0ID0ge1xuICBzdGF0dXM6IG51bWJlcjtcbn07XG5cbmV4cG9ydCBmdW5jdGlvbiBzcGF3bkFzeW5jKGNvbW1hbmQ6IHN0cmluZywgYXJnczogc3RyaW5nW10sIG9wdGlvbnM/OiBhbnkpOiBQcm9taXNlPFJlc3VsdD4ge1xuICBsZXQgZmQgPSBudWxsO1xuICBsZXQgdmVyYm9zZSA9IGZhbHNlO1xuICBpZiAob3B0aW9ucyAmJiBvcHRpb25zLmV4dHJhKSB7XG4gICAgaWYgKG9wdGlvbnMuZXh0cmEudmVyYm9zZSlcbiAgICAgIHZlcmJvc2UgPSB0cnVlO1xuICAgIGlmIChvcHRpb25zLmV4dHJhLm91dHB1dCkge1xuICAgICAgbGV0IGxvZ2ZpbGUgPSBvcHRpb25zLmV4dHJhLm91dHB1dDtcbiAgICAgIGlmICghcGF0aC5pc0Fic29sdXRlKGxvZ2ZpbGUpICYmIG9wdGlvbnMuY3dkKSB7XG4gICAgICAgIGxvZ2ZpbGUgPSBwYXRoLnJlc29sdmUob3B0aW9ucy5jd2QsIGxvZ2ZpbGUpO1xuICAgICAgfVxuICAgICAgZmQgPSBmcy5vcGVuU3luYyhsb2dmaWxlLCBcIncrXCIsIDBvNjY2KTtcbiAgICB9XG4gIH1cbiAgcmV0dXJuIG5ldyBQcm9taXNlKChyZXNvbHZlLCByZWplY3QpID0+IHtcbiAgICBpZiAoZmQgfHwgdmVyYm9zZSkge1xuICAgICAgdmVyYm9zZSAmJiBsb2dnZXIubm90aWNlKFsgcGF0aC5iYXNlbmFtZShjb21tYW5kKSwgLi4uYXJncyBdLmpvaW4oXCIgXCIpKTtcbiAgICAgIGZkICYmIGZzLndyaXRlU3luYyhmZCwgSlNPTi5zdHJpbmdpZnkoe2NvbW1hbmQsIGFyZ3MsIG9wdGlvbnMgfSwgbnVsbCwgMikgKyBcIlxcblwiKTtcbiAgICB9XG4gICAgY29uc3QgZXhlYyA9IHNwYXduKGNvbW1hbmQsIGFyZ3MsIG9wdGlvbnMpO1xuICAgIGV4ZWMuc3Rkb3V0Lm9uKFwiZGF0YVwiLCAoZGF0YSkgPT4ge1xuICAgICAgcHJvY2Vzcy5zdGRvdXQud3JpdGUoZGF0YSk7XG4gICAgICBmZCAmJiBmcy53cml0ZVN5bmMoZmQsIGRhdGEpO1xuICAgIH0pO1xuICAgIGV4ZWMuc3RkZXJyLm9uKFwiZGF0YVwiLCAoZGF0YSkgPT4ge1xuICAgICAgcHJvY2Vzcy5zdGRlcnIud3JpdGUoZGF0YSk7XG4gICAgICBmZCAmJiBmcy53cml0ZVN5bmMoZmQsIGRhdGEpO1xuICAgIH0pO1xuICAgIGV4ZWMub24oXCJjbG9zZVwiLCAoc3RhdHVzOiBudW1iZXIpID0+IHtcbiAgICAgIGZkICYmIGZzLmNsb3NlU3luYyhmZCk7XG4gICAgICByZXNvbHZlKHtzdGF0dXN9KTtcbiAgICB9KTtcbiAgfSk7XG59XG4iLCIvKlxuICogTUlUIExpY2Vuc2VcbiAqXG4gKiBDb3B5cmlnaHQgKGMpIDIwMjUgIFl1cmlpIFlha3ViaW4gKHl1cmlpLnlha3ViaW5AZ21haWwuY29tKVxuICpcbiAqIFBlcm1pc3Npb24gaXMgZ3JhbnRlZCB0byB1c2UsIGNvcHksIG1vZGlmeSwgYW5kIGRpc3RyaWJ1dGUgdGhpcyBzb2Z0d2FyZVxuICogdW5kZXIgdGhlIE1JVCBMaWNlbnNlLiBTZWUgTElDRU5TRSBmaWxlIGZvciBkZXRhaWxzLlxuICovXG5cbmltcG9ydCBmcyBmcm9tIFwibm9kZTpmc1wiO1xuaW1wb3J0IHBhdGggZnJvbSBcIm5vZGU6cGF0aFwiO1xuaW1wb3J0IHVybCBmcm9tIFwibm9kZTp1cmxcIjtcblxuaW1wb3J0IHsgRklMRV9TQ0hFTUUsIElNUE9SVF9TQ0hFTUUsIEhUVFBfU0NIRU1FLCBIVFRQU19TQ0hFTUUgfSBmcm9tIFwiQC91dGlscy9VcmxTY2hlbWVcIjtcbmltcG9ydCB7IHJlcXVpcmVSZXNvbHZlIH0gZnJvbSBcIkAvdXRpbHMvTW9kdWxlXCI7XG5cbmV4cG9ydCBhc3luYyBmdW5jdGlvbiBwYXRoRXhpc3RzKHBhdGg6IHN0cmluZykge1xuICB0cnkge1xuICAgIHJldHVybiAhIShhd2FpdCBmcy5wcm9taXNlcy5zdGF0KHBhdGgpKTtcbiAgfSBjYXRjaCB7XG4gICAgcmV0dXJuIGZhbHNlO1xuICB9XG59XG5cbmV4cG9ydCBmdW5jdGlvbiBwYXRoRXhpc3RzU3luYyhwYXRoOiBzdHJpbmcpIHtcbiAgdHJ5IHtcbiAgICByZXR1cm4gISFmcy5zdGF0U3luYyhwYXRoKTtcbiAgfSBjYXRjaCB7XG4gICAgcmV0dXJuIGZhbHNlO1xuICB9XG59XG5cbmV4cG9ydCBhc3luYyBmdW5jdGlvbiBmaWxlRXhpc3RzKHBhdGg6IHN0cmluZykge1xuICB0cnkge1xuICAgIHJldHVybiAoYXdhaXQgZnMucHJvbWlzZXMuc3RhdChwYXRoKSkuaXNGaWxlKCk7XG4gIH0gY2F0Y2gge1xuICAgIHJldHVybiBmYWxzZTtcbiAgfVxufVxuXG5leHBvcnQgZnVuY3Rpb24gZmlsZUV4aXN0c1N5bmMocGF0aDogc3RyaW5nKSB7XG4gIHRyeSB7XG4gICAgcmV0dXJuIGZzLnN0YXRTeW5jKHBhdGgpLmlzRmlsZSgpO1xuICB9IGNhdGNoIHtcbiAgICByZXR1cm4gZmFsc2U7XG4gIH0gXG59XG5cbmV4cG9ydCBhc3luYyBmdW5jdGlvbiBkaXJlY3RvcnlFeGlzdHMocGF0aDogc3RyaW5nKSB7XG4gIHRyeSB7XG4gICAgcmV0dXJuIChhd2FpdCBmcy5wcm9taXNlcy5zdGF0KHBhdGgpKS5pc0RpcmVjdG9yeSgpO1xuICB9IGNhdGNoIHtcbiAgICByZXR1cm4gZmFsc2U7XG4gIH1cbn1cblxuZXhwb3J0IGZ1bmN0aW9uIGRpcmVjdG9yeUV4aXN0c1N5bmMocGF0aDogc3RyaW5nKSB7XG4gIHRyeSB7XG4gICByZXR1cm4gZnMuc3RhdFN5bmMocGF0aCkuaXNEaXJlY3RvcnkoKTtcbiAgfSBjYXRjaCB7XG4gICAgcmV0dXJuIGZhbHNlO1xuICB9XG59XG5cbmV4cG9ydCBmdW5jdGlvbiBleHRuYW1lKGZ1bGxwYXRoOiBzdHJpbmcsIG9wdGlvbnM6IGFueSkge1xuICBpZiAob3B0aW9ucz8ubG9uZ2VzdCkge1xuICAgIGNvbnN0IGZpbGVuYW1lID0gcGF0aC5iYXNlbmFtZShmdWxscGF0aCk7XG4gICAgY29uc3QgaW5kZXggPSBmaWxlbmFtZS5pbmRleE9mKCcuJyk7XG4gICAgcmV0dXJuIGluZGV4ICE9IC0xID8gZmlsZW5hbWUuc3Vic3RyaW5nKGluZGV4KSA6ICcnO1xuICB9XG5cbiAgcmV0dXJuIHBhdGguZXh0bmFtZShmdWxscGF0aCk7XG59XG5cbmV4cG9ydCBhc3luYyBmdW5jdGlvbiBmaWxlTGlzdChkaXJuYW1lOiBzdHJpbmcsIG9wdGlvbnM6IGFueSk6IFByb21pc2U8QXJyYXk8c3RyaW5nPj4ge1xuICBjb25zdCBsaXN0ID0gbmV3IEFycmF5PHN0cmluZz47XG4gIGlmIChhd2FpdCBkaXJlY3RvcnlFeGlzdHMoZGlybmFtZSkpIHtcbiAgICBmb3IgKGNvbnN0IGl0ZXIgb2YgYXdhaXQgZnMucHJvbWlzZXMucmVhZGRpcihkaXJuYW1lKSkge1xuICAgICAgY29uc3QgZmlsZXBhdGggPSBwYXRoLnJlc29sdmUoZGlybmFtZSwgaXRlcik7XG4gICAgICBjb25zdCBzdGF0ID0gYXdhaXQgZnMucHJvbWlzZXMuc3RhdChmaWxlcGF0aCk7XG4gICAgICBpZiAoc3RhdC5pc0ZpbGUoKSkge1xuICAgICAgICBsaXN0LnB1c2gob3B0aW9ucy5yZWxhdGl2ZSA/IHBhdGgucmVsYXRpdmUob3B0aW9ucy5yZWxhdGl2ZSwgZmlsZXBhdGgpIDogZmlsZXBhdGgpO1xuICAgICAgfVxuICAgICAgZWxzZSBpZiAob3B0aW9ucy5yZWN1cnNpdmUgJiYgc3RhdC5pc0RpcmVjdG9yeSgpKSB7XG4gICAgICAgIGZvciAoY29uc3QgZm5hbWUgb2YgYXdhaXQgZmlsZUxpc3QoZmlsZXBhdGgsIG9wdGlvbnMpKVxuICAgICAgICAgIGxpc3QucHVzaChmbmFtZSk7XG4gICAgICB9XG4gICAgfVxuICB9XG4gIHJldHVybiBsaXN0O1xufVxuXG5leHBvcnQgYXN5bmMgZnVuY3Rpb24gc2F2ZUlmRGlmZmVyZW50KGZpbGVuYW1lOiBzdHJpbmcsIGNvbnRlbnQ6IHN0cmluZykge1xuICBpZiAoYXdhaXQgZmlsZUV4aXN0cyhmaWxlbmFtZSkpIHtcbiAgICBjb25zdCBvbGRDb250ZW50ID0gYXdhaXQgZnMucHJvbWlzZXMucmVhZEZpbGUoZmlsZW5hbWUsIHsgZW5jb2Rpbmc6IFwidXRmOFwiIH0pO1xuICAgIGlmIChjb250ZW50ID09IG9sZENvbnRlbnQpXG4gICAgICByZXR1cm4gZmFsc2U7XG4gIH1cblxuICBhd2FpdCBmcy5wcm9taXNlcy5ta2RpcihwYXRoLmRpcm5hbWUoZmlsZW5hbWUpLCB7IHJlY3Vyc2l2ZTogdHJ1ZSB9KTtcbiAgYXdhaXQgZnMucHJvbWlzZXMud3JpdGVGaWxlKGZpbGVuYW1lLCBjb250ZW50LCB7IGVuY29kaW5nOiBcInV0ZjhcIiB9KTtcblxuICByZXR1cm4gdHJ1ZTtcbn1cblxuZXhwb3J0IGZ1bmN0aW9uIGdldFBhdGhTdHJpbmcoc3RyOiBzdHJpbmcpIHtcbiAgaWYgKHN0ci5zdGFydHNXaXRoKElNUE9SVF9TQ0hFTUUpKVxuICAgIHN0ciA9IHJlcXVpcmVSZXNvbHZlKHN0ci5zbGljZShJTVBPUlRfU0NIRU1FLmxlbmd0aCkpO1xuICBpZiAoc3RyLnN0YXJ0c1dpdGgoRklMRV9TQ0hFTUUpKVxuICAgIHJldHVybiB1cmwuZmlsZVVSTFRvUGF0aChzdHIpO1xuICByZXR1cm4gc3RyO1xufVxuXG5leHBvcnQgZnVuY3Rpb24gaXNVUkwoc3RyOiBzdHJpbmcpIHtcbiAgdHJ5IHtcbiAgICBuZXcgVVJMKHN0cik7XG4gICAgcmV0dXJuIHRydWU7XG4gIH0gY2F0Y2gge1xuICAgIHJldHVybiBmYWxzZTtcbiAgfVxufVxuXG5leHBvcnQgZnVuY3Rpb24gZ2V0VVJMU3RyaW5nKHN0cjogc3RyaW5nKSB7XG4gIGlmIChzdHIuc3RhcnRzV2l0aChJTVBPUlRfU0NIRU1FKSlcbiAgICByZXR1cm4gcmVxdWlyZVJlc29sdmUoc3RyLnNsaWNlKElNUE9SVF9TQ0hFTUUubGVuZ3RoKSk7XG4gIGlmIChpc1VSTChzdHIpKVxuICAgIHJldHVybiB1cmwuZmlsZVVSTFRvUGF0aChzdHIpO1xuICByZXR1cm4gc3RyO1xufVxuXG5leHBvcnQgYXN5bmMgZnVuY3Rpb24gZmV0Y2hCdWZmZXIoc3RyOiBzdHJpbmcpOiBQcm9taXNlPEJ1ZmZlcj4ge1xuICBpZiAoc3RyLnN0YXJ0c1dpdGgoSFRUUF9TQ0hFTUUpIHx8IHN0ci5zdGFydHNXaXRoKEhUVFBTX1NDSEVNRSkpIHtcbiAgICBjb25zdCByZXNwb25zZSA9IGF3YWl0IGZldGNoKHN0cik7XG4gICAgcmV0dXJuIEJ1ZmZlci5mcm9tKGF3YWl0IHJlc3BvbnNlLmFycmF5QnVmZmVyKCkpO1xuICB9XG4gIHJldHVybiBhd2FpdCBmcy5wcm9taXNlcy5yZWFkRmlsZShnZXRVUkxTdHJpbmcoc3RyKSk7XG59XG5cbmV4cG9ydCBhc3luYyBmdW5jdGlvbiBzYXZlQXNKU09OKGZpbGVuYW1lOiBzdHJpbmcsIHZhbHVlOiBhbnksIG9wdGlvbnM/OiB7IHByZXR0eTogYm9vbGVhbiB9KSB7XG4gIGNvbnN0IGNvbnRlbnQgPSBKU09OLnN0cmluZ2lmeSh2YWx1ZSwgbnVsbCwgb3B0aW9ucyAmJiBvcHRpb25zLnByZXR0eSA/IDIgOiAwKTtcbiAgYXdhaXQgZnMucHJvbWlzZXMubWtkaXIocGF0aC5kaXJuYW1lKGZpbGVuYW1lKSwgeyByZWN1cnNpdmU6IHRydWUgfSk7XG4gIGF3YWl0IGZzLnByb21pc2VzLndyaXRlRmlsZShmaWxlbmFtZSwgY29udGVudCwgeyBlbmNvZGluZzogXCJ1dGY4XCIgfSk7XG59XG4iLCIvKlxuICogTUlUIExpY2Vuc2VcbiAqXG4gKiBDb3B5cmlnaHQgKGMpIDIwMjUgIFl1cmlpIFlha3ViaW4gKHl1cmlpLnlha3ViaW5AZ21haWwuY29tKVxuICpcbiAqIFBlcm1pc3Npb24gaXMgZ3JhbnRlZCB0byB1c2UsIGNvcHksIG1vZGlmeSwgYW5kIGRpc3RyaWJ1dGUgdGhpcyBzb2Z0d2FyZVxuICogdW5kZXIgdGhlIE1JVCBMaWNlbnNlLiBTZWUgTElDRU5TRSBmaWxlIGZvciBkZXRhaWxzLlxuICovXG5cbmltcG9ydCBvcyBmcm9tIFwibm9kZTpvc1wiO1xuXG5jb25zdCBzaXplb2ZWb2lkcEJpdHM6IGFueSA9XG57XG4gIGFybTogICAgIDQsXG4gIGFybTY0OiAgIDgsXG4gIGlhMzI6ICAgIDQsXG4gIGxvb25nNjQ6IDgsXG4gIG1pcHM6ICAgIDQsXG4gIG1pcHNlbDogIDQsXG4gIHBwYzogICAgIDQsXG4gIHBwYzY0OiAgIDgsXG4gIHJpc2N2NjQ6IDgsXG4gIHMzOTA6ICAgIDQsXG4gIHMzOTB4OiAgIDgsXG4gIHg2NDogICAgIDQsXG59O1xuXG5jb25zdCBfc2l6ZW9mVm9pZHAgPSBzaXplb2ZWb2lkcEJpdHNbb3MuYXJjaCgpXTtcbmlmICghX3NpemVvZlZvaWRwKVxuICB0aHJvdyBuZXcgRXJyb3IoYFVua25vd24gJHtvcy5hcmNoKCl9IGFyY2hgKTtcblxubGV0IF9leGVjdXRhYmxlU3VmZml4OiBzdHJpbmc7XG5cbmlmIChvcy5wbGF0Zm9ybSgpID09PSBcIndpbjMyXCIpIHtcbiAgX2V4ZWN1dGFibGVTdWZmaXggPSBcIi5leGVcIjtcbn1cbmVsc2Uge1xuICBfZXhlY3V0YWJsZVN1ZmZpeCA9IFwiXCI7XG59XG5cbmV4cG9ydCBjbGFzcyBIb3N0IHtcbiAgc3RhdGljIGdldCBzaXplb2ZWb2lkcCgpOiA0IHwgOCB7XG4gICAgcmV0dXJuIF9zaXplb2ZWb2lkcDtcbiAgfVxuICBzdGF0aWMgZ2V0IGV4ZWN1dGFibGVTdWZmaXgoKTogc3RyaW5nIHtcbiAgICByZXR1cm4gX2V4ZWN1dGFibGVTdWZmaXg7XG4gIH1cbn07XG4iLCIvKlxuICogTUlUIExpY2Vuc2VcbiAqXG4gKiBDb3B5cmlnaHQgKGMpIDIwMjUgIFl1cmlpIFlha3ViaW4gKHl1cmlpLnlha3ViaW5AZ21haWwuY29tKVxuICpcbiAqIFBlcm1pc3Npb24gaXMgZ3JhbnRlZCB0byB1c2UsIGNvcHksIG1vZGlmeSwgYW5kIGRpc3RyaWJ1dGUgdGhpcyBzb2Z0d2FyZVxuICogdW5kZXIgdGhlIE1JVCBMaWNlbnNlLiBTZWUgTElDRU5TRSBmaWxlIGZvciBkZXRhaWxzLlxuICovXG5cbmltcG9ydCBwYXRoIGZyb20gXCJub2RlOnBhdGhcIjtcbmltcG9ydCBmcyBmcm9tIFwibm9kZTpmc1wiO1xuaW1wb3J0IGh0dHAgZnJvbSBcImh0dHBcIjtcbmltcG9ydCBodHRwcyBmcm9tIFwiaHR0cHNcIjtcblxuaW1wb3J0IHsgTG9nZ2VyIH0gZnJvbSBcIkAvbG9nZ2VyXCI7XG5cbmNvbnN0IGxvZ2dlciA9IExvZ2dlci5jcmVhdGUoaW1wb3J0Lm1ldGEudXJsKTtcblxuaW50ZXJmYWNlIElSZXNvbHZlQnVpbGRlciB7XG4gIGFwcGVuZChkYXRhOiBCdWZmZXIpOiB2b2lkO1xuICB0b1Jlc3VsdCgpOiBCdWZmZXIgfCB1bmRlZmluZWQ7XG59O1xuXG5jbGFzcyBCdWZmZXJCdWlsZGVyIGltcGxlbWVudHMgSVJlc29sdmVCdWlsZGVyIHtcbiAgcHJpdmF0ZSBfY2h1bmtzOiBBcnJheTxCdWZmZXI+ID0gW107XG5cbiAgcHVibGljIGFwcGVuZChjaHVuazogQnVmZmVyKTogdm9pZCB7XG4gICAgdGhpcy5fY2h1bmtzLnB1c2goY2h1bmspO1xuICB9XG5cbiAgcHVibGljIHRvUmVzdWx0KCk6IEJ1ZmZlciB7XG4gICAgcmV0dXJuIEJ1ZmZlci5jb25jYXQodGhpcy5fY2h1bmtzKTtcbiAgfVxufTtcblxuY2xhc3MgRmlsZVN5bmNXcml0ZXIgaW1wbGVtZW50cyBJUmVzb2x2ZUJ1aWxkZXIge1xuICBwcml2YXRlIF9mZDogbnVtYmVyO1xuXG4gIHB1YmxpYyBjb25zdHJ1Y3RvcihmaWxlOiBzdHJpbmcpIHtcbiAgICB0aGlzLl9mZCA9IGZzLm9wZW5TeW5jKGZpbGUsIFwid1wiKTtcbiAgfVxuXG4gIHB1YmxpYyBhcHBlbmQoY2h1bms6IEJ1ZmZlcik6IHZvaWQge1xuICAgIGZzLndyaXRlU3luYyh0aGlzLl9mZCwgY2h1bmspO1xuICB9XG5cbiAgcHVibGljIHRvUmVzdWx0KCk6IHVuZGVmaW5lZCB7XG4gICAgZnMuY2xvc2VTeW5jKHRoaXMuX2ZkKTtcbiAgfVxufTtcblxuZnVuY3Rpb24gY3JlYXRlQnVpbGRlcihmaWxlPzogc3RyaW5nKTogSVJlc29sdmVCdWlsZGVyIHtcbiAgaWYgKGZpbGUpXG4gICAgcmV0dXJuIG5ldyBGaWxlU3luY1dyaXRlcihmaWxlKTtcbiAgcmV0dXJuIG5ldyBCdWZmZXJCdWlsZGVyO1xufVxuXG5mdW5jdGlvbiBodHRwUmVxdWVzdCh1cmw6IHN0cmluZywgb3B0aW9uczogaHR0cC5SZXF1ZXN0T3B0aW9ucyB8IGh0dHBzLlJlcXVlc3RPcHRpb25zLCBjYWxsYmFjazogYW55KTogaHR0cC5DbGllbnRSZXF1ZXN0IHtcbiAgaWYgKHVybC5zdGFydHNXaXRoKFwiaHR0cHM6Ly9cIikpXG4gICAgcmV0dXJuIGh0dHBzLnJlcXVlc3QodXJsLCBvcHRpb25zLCBjYWxsYmFjayk7XG4gIHJldHVybiBodHRwLnJlcXVlc3QodXJsLCBvcHRpb25zLCBjYWxsYmFjayk7XG59O1xuXG5pbnRlcmZhY2UgRmV0Y2hPcHRpb25zIHtcbiAgYXR0ZW1wdHM/OiBudW1iZXI7XG59O1xuXG5mdW5jdGlvbiBmZXRjaEltcGwodXJsOiBzdHJpbmcsIGZpbGU6IHN0cmluZyB8IHVuZGVmaW5lZCwgb3B0aW9uczogRmV0Y2hPcHRpb25zKTogUHJvbWlzZTxCdWZmZXJ8dW5kZWZpbmVkPiB7XG4gIHJldHVybiBuZXcgUHJvbWlzZSgocmVzb2x2ZSwgcmVqZWN0KSA9PiB7XG4gICAgY29uc3QgaHR0cE9wdGlvbnMgPSB7XG4gICAgICBtZXRob2Q6ICdHRVQnLFxuICAgICAgdGltZW91dDogNTAwMCxcbiAgICAgIGhlYWRlcnM6IHtcbiAgICAgICAgXCJVc2VyLUFnZW50XCI6IFBST0pFQ1RfTkFNRSArIFwiL1wiICsgUFJPSkVDVF9WRVJTSU9OLFxuICAgICAgICBcIkFjY2VwdFwiOiBcIiovKlwiLFxuICAgICAgfSxcbiAgICB9O1xuXG4gICAgbGV0IGF0dGVtcHRzID0gb3B0aW9ucy5hdHRlbXB0cyB8fCAwO1xuICAgIGNvbnN0IGRvUmVxdWVzdCA9ICh1cmw6IHN0cmluZykgPT4ge1xuICAgICAgY29uc3QgcmVxdWVzdCA9IGh0dHBSZXF1ZXN0KHVybCwgaHR0cE9wdGlvbnMsIG9uUmVxdWVzdCk7XG5cbiAgICAgIGxldCBoYXNFcnJvciA9IGZhbHNlO1xuICAgICAgY29uc3Qgb25FcnJvciA9IChlcnI6IEVycm9yKSA9PiB7XG4gICAgICAgIHJlcXVlc3QuZGVzdHJveSgpO1xuICAgICAgICBpZiAoIWhhc0Vycm9yKSB7XG4gICAgICAgICAgaGFzRXJyb3IgPSB0cnVlO1xuICAgICAgICAgIGlmIChhdHRlbXB0cyA+IDApIHtcbiAgICAgICAgICAgIGxvZ2dlci53YXJuKGVyci5tZXNzYWdlKTtcbiAgICAgICAgICAgIGxvZ2dlci5pbmZvKGByZS13Z2V0ICR7dXJsfSBhdHRlbXB0cyAke2F0dGVtcHRzfWApO1xuICAgICAgICAgICAgYXR0ZW1wdHMtLTtcbiAgICAgICAgICAgIGRvUmVxdWVzdCh1cmwpO1xuICAgICAgICAgIH1cbiAgICAgICAgICBlbHNlIHtcbiAgICAgICAgICAgIHJlamVjdChlcnIpO1xuICAgICAgICAgIH1cbiAgICAgICAgfVxuICAgICAgfTtcblxuICAgICAgcmVxdWVzdC5vbihcInRpbWVvdXRcIiwgKCkgPT4ge1xuICAgICAgICBvbkVycm9yKG5ldyBFcnJvcihcIlRpbWVvdXQgZm9yIFwiICsgdXJsKSk7XG4gICAgICB9KTtcblxuICAgICAgcmVxdWVzdC5vbihcImVycm9yXCIsIChlcnI6IEVycm9yKSA9PiB7XG4gICAgICAgIG9uRXJyb3IoZXJyKTtcbiAgICAgIH0pO1xuXG4gICAgICByZXF1ZXN0LmVuZCgpO1xuICAgIH07XG5cbiAgICBjb25zdCBmaWxlbmFtZSA9IHBhdGguYmFzZW5hbWUodXJsKTtcbiAgICBjb25zdCBvblJlcXVlc3QgPSAocmVzcG9uc2U6IGh0dHAuSW5jb21pbmdNZXNzYWdlKSA9PiB7XG4gICAgICBzd2l0Y2ggKHJlc3BvbnNlLnN0YXR1c0NvZGUpIHtcbiAgICAgIGNhc2UgMjAwOlxuICAgICAgICBsb2dnZXIuZGVidWcoYENvbm5jdGVkIHRvICR7KHJlc3BvbnNlIGFzIGFueSkucmVxLmhvc3R9YCk7XG4gICAgICAgIGxvZ2dlci5kZWJ1ZyhgRG93bmxvYWRpbmcgJHtmaWxlbmFtZX1gKTtcbiAgICAgICAgY29uc3QgYnVpbGRlciA9IGNyZWF0ZUJ1aWxkZXIoZmlsZSk7XG4gICAgICAgIHJlc3BvbnNlLm9uKFwiZGF0YVwiLCAoY2h1bms6IEJ1ZmZlcikgPT4gYnVpbGRlci5hcHBlbmQoY2h1bmspKTtcbiAgICAgICAgcmVzcG9uc2Uub24oXCJlbmRcIiwgKCkgPT4gcmVzb2x2ZShidWlsZGVyLnRvUmVzdWx0KCkpKTtcbiAgICAgICAgcmVzcG9uc2Uub24oJ2Nsb3NlJywgKCkgPT4gbG9nZ2VyLmRlYnVnKFwiQ2xvc2VcIikpO1xuICAgICAgICBicmVhaztcblxuICAgICAgY2FzZSAzMDE6XG4gICAgICBjYXNlIDMwMjpcbiAgICAgICAgcmVzcG9uc2UucmVzdW1lKCk7XG4gICAgICAgIGlmIChyZXNwb25zZS5oZWFkZXJzLmxvY2F0aW9uKSB7XG4gICAgICAgICAgbG9nZ2VyLmluZm8oXCJSZWRpcmVjdCB0byBcIiArIHJlc3BvbnNlLmhlYWRlcnMubG9jYXRpb24pO1xuICAgICAgICAgIGRvUmVxdWVzdChyZXNwb25zZS5oZWFkZXJzLmxvY2F0aW9uKTtcbiAgICAgICAgfVxuICAgICAgICBicmVhaztcblxuICAgICAgZGVmYXVsdDpcbiAgICAgICAgcmVzcG9uc2UucmVzdW1lKCk7XG4gICAgICAgIGNvbnN0IG1lc3NhZ2UgPSBcIkRpZCBub3QgZ2V0IGFuIE9LIGZyb20gdGhlIHNlcnZlci4gQ29kZTogXCIgKyByZXNwb25zZS5zdGF0dXNDb2RlO1xuICAgICAgICBsb2dnZXIuZXJyb3IobWVzc2FnZSk7XG4gICAgICAgIHJlamVjdChtZXNzYWdlKTtcbiAgICAgICAgYnJlYWs7XG4gICAgICB9XG4gICAgfTtcblxuICAgIGxvZ2dlci5pbmZvKFwid2dldCBcIiArIHVybCk7XG4gICAgZG9SZXF1ZXN0KHVybCk7XG4gIH0pO1xufTtcblxuZXhwb3J0IGZ1bmN0aW9uIHJlcXVlc3RHZXQodXJsOiBzdHJpbmcsIG9wdGlvbnM/OiBGZXRjaE9wdGlvbnMpIHtcbiAgcmV0dXJuIGZldGNoSW1wbCh1cmwsIHVuZGVmaW5lZCwgb3B0aW9ucyB8fCB7fSkgYXMgUHJvbWlzZTxCdWZmZXI+O1xufVxuXG5leHBvcnQgZnVuY3Rpb24gZG93bmxvYWRGaWxlKHVybDogc3RyaW5nLCBmaWxlOiBzdHJpbmcsIG9wdGlvbnM/OiBGZXRjaE9wdGlvbnMpIHtcbiAgcmV0dXJuIGZldGNoSW1wbCh1cmwsIGZpbGUsIG9wdGlvbnMgfHwge30pIGFzIFByb21pc2U8dW5kZWZpbmVkPjtcbn1cbiIsIi8qXG4gKiBNSVQgTGljZW5zZVxuICpcbiAqIENvcHlyaWdodCAoYykgMjAyNSAgWXVyaWkgWWFrdWJpbiAoeXVyaWkueWFrdWJpbkBnbWFpbC5jb20pXG4gKlxuICogUGVybWlzc2lvbiBpcyBncmFudGVkIHRvIHVzZSwgY29weSwgbW9kaWZ5LCBhbmQgZGlzdHJpYnV0ZSB0aGlzIHNvZnR3YXJlXG4gKiB1bmRlciB0aGUgTUlUIExpY2Vuc2UuIFNlZSBMSUNFTlNFIGZpbGUgZm9yIGRldGFpbHMuXG4gKi9cblxuaW1wb3J0IHVybCBmcm9tIFwibm9kZTp1cmxcIjtcblxuZXhwb3J0IGNvbnN0IGltcG9ydE1vZHVsZSA9IGFzeW5jIChuYW1lKSA9PiBpbXBvcnQoLyogd2VicGFja0lnbm9yZTogdHJ1ZSAqLyBuYW1lKTtcblxuZXhwb3J0IGZ1bmN0aW9uIGlzRW50cnlQb2ludCgpIHtcbiAgLy8gaWYgKE9iamVjdChpbXBvcnQubWV0YSkudXJsKVxuICAvLyAgIHJldHVybiB1cmwuZmlsZVVSTFRvUGF0aChPYmplY3QoaW1wb3J0Lm1ldGEpLnVybCkgPT09IHByb2Nlc3MuYXJndlsxXTtcbiAgaWYgKHR5cGVvZiByZXF1aXJlICE9PSAndW5kZWZpbmVkJylcbiAgICByZXR1cm4gcmVxdWlyZS5tYWluID09PSBtb2R1bGU7XG4gIHRocm93IG5ldyBFcnJvcihcIk5vIGNvbXBhdGlibGUgbW9kdWxlIHJlc29sdmVyIGZvdW5kXCIpO1xufVxuXG5leHBvcnQgZnVuY3Rpb24gY3VycmVudFNjcmlwdFVSTCgpIHtcbiAgLy8gaWYgKE9iamVjdChpbXBvcnQubWV0YSkudXJsKVxuICAvLyAgIHJldHVybiB1cmwuZmlsZVVSTFRvUGF0aChPYmplY3QoaW1wb3J0Lm1ldGEpLnVybCk7XG4gIGlmICh0eXBlb2YgcmVxdWlyZSAhPT0gJ3VuZGVmaW5lZCcpXG4gICAgcmV0dXJuIHVybC5wYXRoVG9GaWxlVVJMKC8qIHdlYnBhY2tJZ25vcmU6IHRydWUgKi8gX19maWxlbmFtZSk7XG4gIHRocm93IG5ldyBFcnJvcihcIlVua25vd24gY3VycmVudCBmaWxlbmFtZVwiKTtcbn1cbiIsImltcG9ydCBmcyBmcm9tIFwibm9kZTpmc1wiO1xuaW1wb3J0IHBhdGggZnJvbSBcIm5vZGU6cGF0aFwiO1xuXG5pbXBvcnQgeyBmaWxlTGlzdCB9IGZyb20gXCJAL3V0aWxzL0ZpbGVTeXN0ZW1cIjtcbmltcG9ydCB7IExvZ2dlciB9IGZyb20gXCJAL2xvZ2dlclwiO1xuXG5jb25zdCBsb2dnZXIgPSBMb2dnZXIuY3JlYXRlKGltcG9ydC5tZXRhLnVybCk7XG5cbmV4cG9ydCBhc3luYyBmdW5jdGlvbiBtYWtlUGF0Y2goc3JjRGlyOiBzdHJpbmcsIGRlc3REaXI6IHN0cmluZykge1xuICBsb2dnZXIuaW5mbyhgTWFrZSBwYXRjaCAke3NyY0Rpcn0gdG8gJHtkZXN0RGlyfWApO1xuICBjb25zdCBsaXN0ID0gYXdhaXQgZmlsZUxpc3Qoc3JjRGlyLCB7IHJlbGF0aXZlOiBzcmNEaXIsIHJlY3Vyc2l2ZTogdHJ1ZSB9KTtcbiAgZm9yIChjb25zdCBpdGVyIG9mIGxpc3QpIHtcbiAgICBjb25zdCBzb3VyY2UgPSBwYXRoLnJlc29sdmUoc3JjRGlyLCBpdGVyKTtcbiAgICBjb25zdCBkZXN0aW5hdGlvbiA9IHBhdGgucmVzb2x2ZShkZXN0RGlyLCBpdGVyKTtcbiAgICBhd2FpdCBmcy5wcm9taXNlcy5jcChzb3VyY2UsIGRlc3RpbmF0aW9uLCB7IGZvcmNlOiB0cnVlIH0pO1xuICAgIGxvZ2dlci5pbmZvKGAgUmVwbGFjZWQgJHtpdGVyfWApO1xuICB9XG59XG4iLCIvKlxuICogTUlUIExpY2Vuc2VcbiAqXG4gKiBDb3B5cmlnaHQgKGMpIDIwMjUgIFl1cmlpIFlha3ViaW4gKHl1cmlpLnlha3ViaW5AZ21haWwuY29tKVxuICpcbiAqIFBlcm1pc3Npb24gaXMgZ3JhbnRlZCB0byB1c2UsIGNvcHksIG1vZGlmeSwgYW5kIGRpc3RyaWJ1dGUgdGhpcyBzb2Z0d2FyZVxuICogdW5kZXIgdGhlIE1JVCBMaWNlbnNlLiBTZWUgTElDRU5TRSBmaWxlIGZvciBkZXRhaWxzLlxuICovXG5cbmV4cG9ydCB7IGlzRW50cnlQb2ludCB9IGZyb20gXCIuL0ltcG9ydE1vZHVsZS5tanNcIjtcbmV4cG9ydCB7IGltcG9ydE1vZHVsZSB9IGZyb20gXCIuL0ltcG9ydE1vZHVsZS5tanNcIjtcbmV4cG9ydCB7IGN1cnJlbnRTY3JpcHRVUkwgfSBmcm9tIFwiLi9JbXBvcnRNb2R1bGUubWpzXCI7XG5cbmV4cG9ydCBjb25zdCByZXF1aXJlU3luYyA9IGV2YWwoXCJyZXF1aXJlXCIpIGFzIE5vZGVKUy5SZXF1aXJlO1xuXG5leHBvcnQgZnVuY3Rpb24gcmVxdWlyZVJlc29sdmUobmFtZTogc3RyaW5nKSB7XG4gIGlmICh0eXBlb2YgaW1wb3J0Lm1ldGEucmVzb2x2ZSA9PT0gJ2Z1bmN0aW9uJylcbiAgICByZXR1cm4gaW1wb3J0Lm1ldGEucmVzb2x2ZShuYW1lKTtcbiAgaWYgKHR5cGVvZiByZXF1aXJlU3luYyAhPT0gJ3VuZGVmaW5lZCcpXG4gICAgcmV0dXJuIHJlcXVpcmVTeW5jLnJlc29sdmUobmFtZSk7XG4gIHRocm93IG5ldyBFcnJvcihcIk5vIGNvbXBhdGlibGUgbW9kdWxlIHJlc29sdmVyIGZvdW5kXCIpO1xufVxuIiwiLypcbiAqIE1JVCBMaWNlbnNlXG4gKlxuICogQ29weXJpZ2h0IChjKSAyMDI1ICBZdXJpaSBZYWt1YmluICh5dXJpaS55YWt1YmluQGdtYWlsLmNvbSlcbiAqXG4gKiBQZXJtaXNzaW9uIGlzIGdyYW50ZWQgdG8gdXNlLCBjb3B5LCBtb2RpZnksIGFuZCBkaXN0cmlidXRlIHRoaXMgc29mdHdhcmVcbiAqIHVuZGVyIHRoZSBNSVQgTGljZW5zZS4gU2VlIExJQ0VOU0UgZmlsZSBmb3IgZGV0YWlscy5cbiAqL1xuXG5pbXBvcnQgb3MgZnJvbSBcIm5vZGU6b3NcIjtcbmltcG9ydCBub2RlcGF0aCBmcm9tIFwibm9kZTpwYXRoXCI7XG5cbmxldCBuYXRpdmVTZXAgPSAgbm9kZXBhdGgucG9zaXguc2VwO1xubGV0IG90aGVyU2VwID0gbm9kZXBhdGgud2luMzIuc2VwO1xuXG5pZiAob3MucGxhdGZvcm0oKSA9PT0gXCJ3aW4zMlwiKSB7XG4gIFsgbmF0aXZlU2VwLCBvdGhlclNlcCBdID0gWyBvdGhlclNlcCwgbmF0aXZlU2VwIF07XG59XG5cbmV4cG9ydCBuYW1lc3BhY2UgUGF0aCB7XG5cbmV4cG9ydCBjb25zdCBzZXAgPSBub2RlcGF0aC5wb3NpeC5zZXA7XG5leHBvcnQgY29uc3QgZGVsaW1pdGVyID0gbm9kZXBhdGguZGVsaW1pdGVyO1xuXG5leHBvcnQgZnVuY3Rpb24gbmF0aXZlUGF0aChwYXRoOiBzdHJpbmcpOiBzdHJpbmcge1xuICByZXR1cm4gcGF0aC5yZXBsYWNlQWxsKG90aGVyU2VwLCBuYXRpdmVTZXApO1xufVxuXG5leHBvcnQgZnVuY3Rpb24gcmVwcmVzZW50UGF0aChwYXRoOiBzdHJpbmcpOiBzdHJpbmcge1xuICByZXR1cm4gcGF0aC5yZXBsYWNlQWxsKG5vZGVwYXRoLndpbjMyLnNlcCwgbm9kZXBhdGgucG9zaXguc2VwKTtcbn1cblxuZXhwb3J0IGZ1bmN0aW9uIGlzQWJzb2x1dGUocGF0aDogc3RyaW5nKTogYm9vbGVhbiB7XG4gIHJldHVybiBub2RlcGF0aC5pc0Fic29sdXRlKG5hdGl2ZVBhdGgocGF0aCkpO1xufVxuXG5leHBvcnQgZnVuY3Rpb24gam9pbiguLi5wYXRoczogc3RyaW5nW10pOiBzdHJpbmcge1xuICByZXR1cm4gcmVwcmVzZW50UGF0aChub2RlcGF0aC5qb2luKC4uLnBhdGhzLm1hcChpID0+IG5hdGl2ZVBhdGgoaSkpKSk7XG59XG5cbmV4cG9ydCBmdW5jdGlvbiByZXNvbHZlKC4uLnBhdGhzOiBzdHJpbmdbXSk6IHN0cmluZyB7XG4gIHJldHVybiByZXByZXNlbnRQYXRoKG5vZGVwYXRoLnJlc29sdmUoLi4ucGF0aHMubWFwKGkgPT4gbmF0aXZlUGF0aChpKSkpKTtcbn1cblxuZXhwb3J0IGZ1bmN0aW9uIGRpcm5hbWUocGF0aDogc3RyaW5nKTogc3RyaW5nIHtcbiAgcmV0dXJuIHJlcHJlc2VudFBhdGgobm9kZXBhdGguZGlybmFtZShuYXRpdmVQYXRoKHBhdGgpKSk7XG59XG5cbmV4cG9ydCBmdW5jdGlvbiBiYXNlbmFtZShwYXRoOiBzdHJpbmcsIHN1ZmZpeD86IHN0cmluZyk6IHN0cmluZyB7XG4gIHJldHVybiByZXByZXNlbnRQYXRoKG5vZGVwYXRoLmJhc2VuYW1lKG5hdGl2ZVBhdGgocGF0aCksIHN1ZmZpeCkpO1xufVxuXG5leHBvcnQgZnVuY3Rpb24gcmVsYXRpdmUoZnJvbTogc3RyaW5nLCB0bzogc3RyaW5nKTogc3RyaW5nIHtcbiAgcmV0dXJuIHJlcHJlc2VudFBhdGgobm9kZXBhdGgucmVsYXRpdmUobmF0aXZlUGF0aChmcm9tKSwgbmF0aXZlUGF0aCh0bykpKTtcbn1cblxufSAvLyBuYW1lc3BhY2UgUGF0aFxuIiwiLypcbiAqIE1JVCBMaWNlbnNlXG4gKlxuICogQ29weXJpZ2h0IChjKSAyMDI1ICBZdXJpaSBZYWt1YmluICh5dXJpaS55YWt1YmluQGdtYWlsLmNvbSlcbiAqXG4gKiBQZXJtaXNzaW9uIGlzIGdyYW50ZWQgdG8gdXNlLCBjb3B5LCBtb2RpZnksIGFuZCBkaXN0cmlidXRlIHRoaXMgc29mdHdhcmVcbiAqIHVuZGVyIHRoZSBNSVQgTGljZW5zZS4gU2VlIExJQ0VOU0UgZmlsZSBmb3IgZGV0YWlscy5cbiAqL1xuXG5leHBvcnQgZnVuY3Rpb24gZXF1YWxWYWx1ZShhOiBhbnksIGI6IGFueSk6IGJvb2xlYW4ge1xuICBpZiAoYSA9PT0gYilcbiAgICByZXR1cm4gdHJ1ZTtcblxuICBpZiAoYSA9PT0gdW5kZWZpbmVkIHx8IGIgPT09IHVuZGVmaW5lZClcbiAgICByZXR1cm4gZmFsc2U7XG5cbiAgaWYgKHR5cGVvZiBhICE9PSBcIm9iamVjdFwiIHx8IHR5cGVvZiBiICE9PSBcIm9iamVjdFwiKVxuICAgIHJldHVybiBmYWxzZTtcblxuICBjb25zdCBrMSA9IE9iamVjdC5rZXlzKGEpO1xuICBjb25zdCBrMiA9IE9iamVjdC5rZXlzKGIpO1xuXG4gIGlmIChrMS5sZW5ndGggIT0gazIubGVuZ3RoKVxuICAgIHJldHVybiBmYWxzZTtcblxuICBmb3IgKGNvbnN0IGtleSBvZiBrMSkge1xuICAgIGlmICghT2JqZWN0Lmhhc093bihiLCBrZXkpIHx8ICFlcXVhbFZhbHVlKGFba2V5XSwgYltrZXldKSlcbiAgICAgIHJldHVybiBmYWxzZTtcbiAgfVxuXG4gIHJldHVybiB0cnVlO1xufVxuXG5leHBvcnQgZnVuY3Rpb24gZGVlcENvcHkobzogYW55KTogYW55IHtcbiAgaWYgKCFvIHx8IHR5cGVvZiBvICE9PSBcIm9iamVjdFwiKVxuICAgIHJldHVybiBvO1xuICBpZiAoQXJyYXkuaXNBcnJheShvKSkge1xuICAgIGNvbnN0IHJlc3VsdCA9IFtdO1xuICAgIGZvciAoY29uc3QgaXRlciBvZiBvKVxuICAgICAgcmVzdWx0LnB1c2goZGVlcENvcHkoaXRlcikpO1xuICAgIHJldHVybiByZXN1bHQ7XG4gIH1cbiAgZWxzZSB7XG4gICAgY29uc3QgcmVzdWx0ID0ge30gYXMgYW55O1xuICAgIGZvciAoY29uc3QgW2tleSx2YWxdIG9mIE9iamVjdC5lbnRyaWVzKG8pKVxuICAgICAgcmVzdWx0W2tleV0gPSBkZWVwQ29weSh2YWwpO1xuICAgIHJldHVybiByZXN1bHQ7XG4gIH1cbn1cblxuZXhwb3J0IGZ1bmN0aW9uIGFzc2lnbk9iamVjdCh0YXJnZXQ6IGFueSwgc291cmNlOiBhbnkpIHtcbiAgaWYgKEFycmF5LmlzQXJyYXkodGFyZ2V0KSAmJiBBcnJheS5pc0FycmF5KHNvdXJjZSkpIHtcbiAgICBmb3IgKGNvbnN0IGl0ZXIgb2Ygc291cmNlKVxuICAgICAgdGFyZ2V0LnB1c2goaXRlcik7XG4gIH1cbiAgZWxzZSB7XG4gICAgZm9yIChjb25zdCBrZXkgb2YgT2JqZWN0LmtleXMoc291cmNlKSkge1xuICAgICAgY29uc3QgYSA9IHRhcmdldFtrZXldLCBiID0gc291cmNlW2tleV07XG4gICAgICBpZiAoYSAmJiB0eXBlb2YgYSA9PT0gXCJvYmplY3RcIiAmJiBiICYmIHR5cGVvZiBiID09PSBcIm9iamVjdFwiKVxuICAgICAgICBhc3NpZ25PYmplY3QoYSwgYik7XG4gICAgICBlbHNlXG4gICAgICAgIHRhcmdldFtrZXldID0gZGVlcENvcHkoYik7XG4gICAgfVxuICB9XG59XG5cbmV4cG9ydCBmdW5jdGlvbiBhcnJheVdyYXBwZXIodmFsdWU6IGFueSkge1xuICBpZiAodmFsdWUgPT09IHVuZGVmaW5lZCB8fCBBcnJheS5pc0FycmF5KHZhbHVlKSlcbiAgICByZXR1cm4gdmFsdWU7XG4gIHJldHVybiBbIHZhbHVlIF07XG59XG4iLCIvKlxuICogTUlUIExpY2Vuc2VcbiAqXG4gKiBDb3B5cmlnaHQgKGMpIDIwMjUgIFl1cmlpIFlha3ViaW4gKHl1cmlpLnlha3ViaW5AZ21haWwuY29tKVxuICpcbiAqIFBlcm1pc3Npb24gaXMgZ3JhbnRlZCB0byB1c2UsIGNvcHksIG1vZGlmeSwgYW5kIGRpc3RyaWJ1dGUgdGhpcyBzb2Z0d2FyZVxuICogdW5kZXIgdGhlIE1JVCBMaWNlbnNlLiBTZWUgTElDRU5TRSBmaWxlIGZvciBkZXRhaWxzLlxuICovXG5cbmltcG9ydCBmcyBmcm9tIFwibm9kZTpmc1wiO1xuXG5leHBvcnQgY2xhc3MgU2V0dGluZ3NTdG9yYWdlIHtcbiAgcHJpdmF0ZSBfZmlsZW5hbWU6IHN0cmluZztcbiAgcHJpdmF0ZSBfc2V0dGluZ3M6IGFueTtcbiAgcHJpdmF0ZSBfY3VycmVudDogYW55O1xuXG4gIGNvbnN0cnVjdG9yKGZpbGVuYW1lOiBzdHJpbmcpIHtcbiAgICB0aGlzLl9maWxlbmFtZSA9IGZpbGVuYW1lO1xuICB9XG5cbiAgcHVibGljIGFzeW5jIHB1c2gobmFtZTogc3RyaW5nKSB7XG4gICAgaWYgKCF0aGlzLl9zZXR0aW5ncylcbiAgICAgIGF3YWl0IHRoaXMubG9hZCgpO1xuICAgIGxldCBvYmplY3QgPSB0aGlzLl9jdXJyZW50Lm9iamVjdFtuYW1lXTtcbiAgICBpZiAoIW9iamVjdClcbiAgICAgIG9iamVjdCA9IHRoaXMuX2N1cnJlbnQub2JqZWN0W25hbWVdID0ge307XG4gICAgdGhpcy5fY3VycmVudCA9IHsgcGFyZW50OiB0aGlzLl9jdXJyZW50LCBvYmplY3QgfTtcbiAgfVxuXG4gIHB1YmxpYyBhc3luYyBwb3AoKSB7XG4gICAgaWYgKCF0aGlzLl9zZXR0aW5ncylcbiAgICAgIGF3YWl0IHRoaXMubG9hZCgpO1xuICAgIGNvbnNvbGUuYXNzZXJ0KHRoaXMuX2N1cnJlbnQucGFyZW50KTtcbiAgICB0aGlzLl9jdXJyZW50ID0gdGhpcy5fY3VycmVudC5wYXJlbnQ7XG4gIH1cblxuICBwdWJsaWMgYXN5bmMgZ2V0KG5hbWU6IHN0cmluZykge1xuICAgIGlmICghdGhpcy5fc2V0dGluZ3MpXG4gICAgICBhd2FpdCB0aGlzLmxvYWQoKTtcbiAgICByZXR1cm4gdGhpcy5fY3VycmVudC5vYmplY3RbbmFtZV07XG4gIH1cblxuICBwdWJsaWMgYXN5bmMgc2V0KG5hbWU6IHN0cmluZywgdmFsdWU6IGFueSkge1xuICAgIGlmICghdGhpcy5fc2V0dGluZ3MpXG4gICAgICBhd2FpdCB0aGlzLmxvYWQoKTtcbiAgICB0aGlzLl9jdXJyZW50Lm9iamVjdFtuYW1lXSA9IHZhbHVlO1xuICAgIGF3YWl0IHRoaXMuc2F2ZSgpO1xuICB9XG5cbiAgcHVibGljIGFzeW5jIGxvYWQoKSB7XG4gICAgdHJ5IHtcbiAgICAgIGNvbnN0IGNvbnRlbnQgPSBhd2FpdCBmcy5wcm9taXNlcy5yZWFkRmlsZSh0aGlzLl9maWxlbmFtZSwgXCJ1dGYtOFwiKTtcbiAgICAgIHRoaXMuX3NldHRpbmdzID0gSlNPTi5wYXJzZShjb250ZW50KTtcbiAgICB9XG4gICAgY2F0Y2ggKGUpIHtcbiAgICAgIHRoaXMuX3NldHRpbmdzID0ge307XG4gICAgfVxuICAgIHRoaXMuX2N1cnJlbnQgPVxuICAgIHtcbiAgICAgIHBhcmVudDogbnVsbCxcbiAgICAgIG9iamVjdDogdGhpcy5fc2V0dGluZ3MsXG4gICAgfTtcbiAgfVxuXG4gIHB1YmxpYyBhc3luYyBzYXZlKCkge1xuICAgIGNvbnN0IHNwYWNlID0gMjtcbiAgICBjb25zdCBjb250ZW50ID0gSlNPTi5zdHJpbmdpZnkodGhpcy5fc2V0dGluZ3MsIHVuZGVmaW5lZCwgc3BhY2UpO1xuICAgIGF3YWl0IGZzLnByb21pc2VzLndyaXRlRmlsZSh0aGlzLl9maWxlbmFtZSwgY29udGVudCwgeyBlbmNvZGluZzogXCJ1dGYtOFwiLCBmbGFnOiBcIndcIiwgZmx1c2g6IHRydWUgfSk7XG4gIH1cbn07XG4iLCIvKlxuICogTUlUIExpY2Vuc2VcbiAqXG4gKiBDb3B5cmlnaHQgKGMpIDIwMjUgIFl1cmlpIFlha3ViaW4gKHl1cmlpLnlha3ViaW5AZ21haWwuY29tKVxuICpcbiAqIFBlcm1pc3Npb24gaXMgZ3JhbnRlZCB0byB1c2UsIGNvcHksIG1vZGlmeSwgYW5kIGRpc3RyaWJ1dGUgdGhpcyBzb2Z0d2FyZVxuICogdW5kZXIgdGhlIE1JVCBMaWNlbnNlLiBTZWUgTElDRU5TRSBmaWxlIGZvciBkZXRhaWxzLlxuICovXG5cbmV4cG9ydCBmdW5jdGlvbiBlbnN1cmVCb29sZWFuKHZhbHVlOiBhbnkpIHtcbiAgaWYgKHR5cGVvZiB2YWx1ZSA9PT0gXCJib29sZWFuXCIpXG4gICAgcmV0dXJuIHZhbHVlO1xuICB0aHJvdyBuZXcgVHlwZUVycm9yKGBUaGUgJyR7dmFsdWV9JyBpcyBub3QgYSBib29sZWFuYCk7XG59XG5cbmV4cG9ydCBmdW5jdGlvbiBlbnN1cmVOdW1iZXIodmFsdWU6IGFueSkge1xuICBpZiAodHlwZW9mIHZhbHVlID09PSBcIm51bWJlclwiKVxuICAgIHJldHVybiB2YWx1ZTtcbiAgdGhyb3cgbmV3IFR5cGVFcnJvcihgVGhlICcke3ZhbHVlfScgaXMgbm90IGEgbnVtYmVyYCk7XG59XG5cbmV4cG9ydCBmdW5jdGlvbiBlbnN1cmVTdHJpbmcodmFsdWU6IGFueSkge1xuICBpZiAodHlwZW9mIHZhbHVlID09PSBcInN0cmluZ1wiKVxuICAgIHJldHVybiB2YWx1ZTtcbiAgdGhyb3cgbmV3IFR5cGVFcnJvcihgVGhlICcke3ZhbHVlfScgaXMgbm90IGEgc3RyaW5nYCk7XG59XG5cbmV4cG9ydCBmdW5jdGlvbiBlbnN1cmVBcnJheSh2YWx1ZTogYW55KSB7XG4gIGlmIChBcnJheS5pc0FycmF5KHZhbHVlKSlcbiAgICByZXR1cm4gQXJyYXkuZnJvbSh2YWx1ZSk7XG4gIHRocm93IG5ldyBUeXBlRXJyb3IoYFRoZSAnJHt2YWx1ZX0nIGlzIG5vdCBhIGFycmF5YCk7XG59XG4iLCIvKlxuICogTUlUIExpY2Vuc2VcbiAqXG4gKiBDb3B5cmlnaHQgKGMpIDIwMjUgIFl1cmlpIFlha3ViaW4gKHl1cmlpLnlha3ViaW5AZ21haWwuY29tKVxuICpcbiAqIFBlcm1pc3Npb24gaXMgZ3JhbnRlZCB0byB1c2UsIGNvcHksIG1vZGlmeSwgYW5kIGRpc3RyaWJ1dGUgdGhpcyBzb2Z0d2FyZVxuICogdW5kZXIgdGhlIE1JVCBMaWNlbnNlLiBTZWUgTElDRU5TRSBmaWxlIGZvciBkZXRhaWxzLlxuICovXG5cbmV4cG9ydCBjb25zdCBGSUxFX1NDSEVNRSA9IFwiZmlsZTovL1wiO1xuZXhwb3J0IGNvbnN0IElNUE9SVF9TQ0hFTUUgPSBcImltcG9ydDovL1wiO1xuZXhwb3J0IGNvbnN0IEhUVFBfU0NIRU1FID0gXCJodHRwOi8vXCI7XG5leHBvcnQgY29uc3QgSFRUUFNfU0NIRU1FID0gXCJodHRwczovL1wiO1xuIiwibW9kdWxlLmV4cG9ydHMgPSByZXF1aXJlKFwiaHR0cFwiKTsiLCJtb2R1bGUuZXhwb3J0cyA9IHJlcXVpcmUoXCJodHRwc1wiKTsiLCJtb2R1bGUuZXhwb3J0cyA9IHJlcXVpcmUoXCJub2RlOmNoaWxkX3Byb2Nlc3NcIik7IiwibW9kdWxlLmV4cG9ydHMgPSByZXF1aXJlKFwibm9kZTpmc1wiKTsiLCJtb2R1bGUuZXhwb3J0cyA9IHJlcXVpcmUoXCJub2RlOm9zXCIpOyIsIm1vZHVsZS5leHBvcnRzID0gcmVxdWlyZShcIm5vZGU6cGF0aFwiKTsiLCJtb2R1bGUuZXhwb3J0cyA9IHJlcXVpcmUoXCJub2RlOnVybFwiKTsiLCJtb2R1bGUuZXhwb3J0cyA9IHJlcXVpcmUoXCJub2RlOndvcmtlcl90aHJlYWRzXCIpOyIsIi8vIFRoZSBtb2R1bGUgY2FjaGVcbnZhciBfX3dlYnBhY2tfbW9kdWxlX2NhY2hlX18gPSB7fTtcblxuLy8gVGhlIHJlcXVpcmUgZnVuY3Rpb25cbmZ1bmN0aW9uIF9fd2VicGFja19yZXF1aXJlX18obW9kdWxlSWQpIHtcblx0Ly8gQ2hlY2sgaWYgbW9kdWxlIGlzIGluIGNhY2hlXG5cdHZhciBjYWNoZWRNb2R1bGUgPSBfX3dlYnBhY2tfbW9kdWxlX2NhY2hlX19bbW9kdWxlSWRdO1xuXHRpZiAoY2FjaGVkTW9kdWxlICE9PSB1bmRlZmluZWQpIHtcblx0XHRyZXR1cm4gY2FjaGVkTW9kdWxlLmV4cG9ydHM7XG5cdH1cblx0Ly8gQ3JlYXRlIGEgbmV3IG1vZHVsZSAoYW5kIHB1dCBpdCBpbnRvIHRoZSBjYWNoZSlcblx0dmFyIG1vZHVsZSA9IF9fd2VicGFja19tb2R1bGVfY2FjaGVfX1ttb2R1bGVJZF0gPSB7XG5cdFx0Ly8gbm8gbW9kdWxlLmlkIG5lZWRlZFxuXHRcdC8vIG5vIG1vZHVsZS5sb2FkZWQgbmVlZGVkXG5cdFx0ZXhwb3J0czoge31cblx0fTtcblxuXHQvLyBFeGVjdXRlIHRoZSBtb2R1bGUgZnVuY3Rpb25cblx0X193ZWJwYWNrX21vZHVsZXNfX1ttb2R1bGVJZF0obW9kdWxlLCBtb2R1bGUuZXhwb3J0cywgX193ZWJwYWNrX3JlcXVpcmVfXyk7XG5cblx0Ly8gUmV0dXJuIHRoZSBleHBvcnRzIG9mIHRoZSBtb2R1bGVcblx0cmV0dXJuIG1vZHVsZS5leHBvcnRzO1xufVxuXG4iLCIvLyBnZXREZWZhdWx0RXhwb3J0IGZ1bmN0aW9uIGZvciBjb21wYXRpYmlsaXR5IHdpdGggbm9uLWhhcm1vbnkgbW9kdWxlc1xuX193ZWJwYWNrX3JlcXVpcmVfXy5uID0gKG1vZHVsZSkgPT4ge1xuXHR2YXIgZ2V0dGVyID0gbW9kdWxlICYmIG1vZHVsZS5fX2VzTW9kdWxlID9cblx0XHQoKSA9PiAobW9kdWxlWydkZWZhdWx0J10pIDpcblx0XHQoKSA9PiAobW9kdWxlKTtcblx0X193ZWJwYWNrX3JlcXVpcmVfXy5kKGdldHRlciwgeyBhOiBnZXR0ZXIgfSk7XG5cdHJldHVybiBnZXR0ZXI7XG59OyIsIi8vIGRlZmluZSBnZXR0ZXIgZnVuY3Rpb25zIGZvciBoYXJtb255IGV4cG9ydHNcbl9fd2VicGFja19yZXF1aXJlX18uZCA9IChleHBvcnRzLCBkZWZpbml0aW9uKSA9PiB7XG5cdGZvcih2YXIga2V5IGluIGRlZmluaXRpb24pIHtcblx0XHRpZihfX3dlYnBhY2tfcmVxdWlyZV9fLm8oZGVmaW5pdGlvbiwga2V5KSAmJiAhX193ZWJwYWNrX3JlcXVpcmVfXy5vKGV4cG9ydHMsIGtleSkpIHtcblx0XHRcdE9iamVjdC5kZWZpbmVQcm9wZXJ0eShleHBvcnRzLCBrZXksIHsgZW51bWVyYWJsZTogdHJ1ZSwgZ2V0OiBkZWZpbml0aW9uW2tleV0gfSk7XG5cdFx0fVxuXHR9XG59OyIsIl9fd2VicGFja19yZXF1aXJlX18ubyA9IChvYmosIHByb3ApID0+IChPYmplY3QucHJvdG90eXBlLmhhc093blByb3BlcnR5LmNhbGwob2JqLCBwcm9wKSkiLCIvLyBkZWZpbmUgX19lc01vZHVsZSBvbiBleHBvcnRzXG5fX3dlYnBhY2tfcmVxdWlyZV9fLnIgPSAoZXhwb3J0cykgPT4ge1xuXHRpZih0eXBlb2YgU3ltYm9sICE9PSAndW5kZWZpbmVkJyAmJiBTeW1ib2wudG9TdHJpbmdUYWcpIHtcblx0XHRPYmplY3QuZGVmaW5lUHJvcGVydHkoZXhwb3J0cywgU3ltYm9sLnRvU3RyaW5nVGFnLCB7IHZhbHVlOiAnTW9kdWxlJyB9KTtcblx0fVxuXHRPYmplY3QuZGVmaW5lUHJvcGVydHkoZXhwb3J0cywgJ19fZXNNb2R1bGUnLCB7IHZhbHVlOiB0cnVlIH0pO1xufTsiLCIvKlxuICogTUlUIExpY2Vuc2VcbiAqXG4gKiBDb3B5cmlnaHQgKGMpIDIwMjUgIFl1cmlpIFlha3ViaW4gKHl1cmlpLnlha3ViaW5AZ21haWwuY29tKVxuICpcbiAqIFBlcm1pc3Npb24gaXMgZ3JhbnRlZCB0byB1c2UsIGNvcHksIG1vZGlmeSwgYW5kIGRpc3RyaWJ1dGUgdGhpcyBzb2Z0d2FyZVxuICogdW5kZXIgdGhlIE1JVCBMaWNlbnNlLiBTZWUgTElDRU5TRSBmaWxlIGZvciBkZXRhaWxzLlxuICovXG5cbi8vLyA8cmVmZXJlbmNlIHBhdGg9XCJnbG9iYWwuZC50c1wiIC8+XG5cbmltcG9ydCB7IGlzRW50cnlQb2ludCB9IGZyb20gXCJAL3V0aWxzL01vZHVsZVwiO1xuaW1wb3J0ICogYXMgY3h4IGZyb20gXCJAL2N4eFwiO1xuaW1wb3J0IHsgQ01ha2VQcm9jZXNzLCBDVGVzdFByb2Nlc3MsIFNjcmlwdE1vZGVPcHRpb25zLCBnZXRQcm9qZWN0SW5mbyB9IGZyb20gXCJAL2NtYWtlXCI7XG5cbmltcG9ydCB7IHNwYXduQXN5bmMgfSBmcm9tIFwiQC91dGlscy9DaGlsZFByb2Nlc3NcIjtcbmltcG9ydCB7IHJlcXVlc3RHZXQsIGRvd25sb2FkRmlsZSB9IGZyb20gXCJAL3V0aWxzL0h0dHBSZXF1ZXN0XCI7XG5pbXBvcnQgeyBQYXRoIH0gZnJvbSBcIkAvdXRpbHMvUGF0aFwiO1xuaW1wb3J0IHsgcnVuU2NyaXB0IH0gZnJvbSBcIkAvUnVuU2NyaXB0XCI7XG5cbmV4cG9ydCBkZWZhdWx0IHtcbiAgY3h4LFxuICBjbWFrZToge1xuICAgIHNjcmlwdE1vZGU6IChzY3JpcHRGaWxlOiBzdHJpbmcsIHZhcmlhYmxlczogb2JqZWN0LCBvcHRpb25zPzogU2NyaXB0TW9kZU9wdGlvbnMpID0+IENNYWtlUHJvY2Vzcy5nZXRJbnN0YW5jZSgpLnNjcmlwdE1vZGUoc2NyaXB0RmlsZSwgdmFyaWFibGVzLCBvcHRpb25zKSxcbiAgICBjb25maWd1cmU6IChhcmdzOiBhbnkpID0+IENNYWtlUHJvY2Vzcy5nZXRJbnN0YW5jZSgpLmNvbmZpZ3VyZShhcmdzKSxcbiAgICBidWlsZDogKGFyZ3M6IGFueSkgPT4gQ01ha2VQcm9jZXNzLmdldEluc3RhbmNlKCkuYnVpbGQoYXJncyksXG4gICAgaW5zdGFsbDogKGFyZ3M6IGFueSkgPT4gQ01ha2VQcm9jZXNzLmdldEluc3RhbmNlKCkuaW5zdGFsbChhcmdzKSxcbiAgICBleHRyYWN0OiAoYXJnczogYW55KSA9PiBDTWFrZVByb2Nlc3MuZ2V0SW5zdGFuY2UoKS5leHRyYWN0KGFyZ3MpLFxuICAgIGN0ZXN0OiAoYXJnczogYW55KSA9PiBDVGVzdFByb2Nlc3MuZ2V0SW5zdGFuY2UoKS5jdGVzdChhcmdzKSxcbiAgICBnZXRQcm9qZWN0SW5mbyxcbiAgfSxcbiAgcHJvY2Vzczoge1xuICAgIHNwYXduOiBzcGF3bkFzeW5jLFxuICB9LFxuICB1dGlsczoge1xuICAgIHJlcXVlc3RHZXQsXG4gICAgZG93bmxvYWRGaWxlLFxuICB9LFxuICBwYXRoOiBQYXRoLFxufTtcblxuaWYgKGlzRW50cnlQb2ludCgpKSB7XG4gIHJ1blNjcmlwdCgpO1xufVxuIl0sIm5hbWVzIjpbXSwic291cmNlUm9vdCI6IiJ9