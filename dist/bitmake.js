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
            let iter = (it instanceof _core_MakeInterfaces__WEBPACK_IMPORTED_MODULE_0__.InterfaceTarget) ? _core_TargetName__WEBPACK_IMPORTED_MODULE_10__.TargetName.create(it.targetName) : it;
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
            if (typeof iter === "string" || iter instanceof _core_AbsolutePath__WEBPACK_IMPORTED_MODULE_3__.AbsolutePath) {
                iter = scope.SOURCE_DIR.resolve(iter.toString());
                iter = _core_AbsolutePath__WEBPACK_IMPORTED_MODULE_3__.AbsolutePath.create(iter);
                baseDir = baseDir || iter.dirname();
            }
            else if (!(iter instanceof _core_TargetName__WEBPACK_IMPORTED_MODULE_10__.TargetName)) {
                throw new Error(`Not supportet value of ${iter}`);
            }
            const entity = new _core_InstallEntity__WEBPACK_IMPORTED_MODULE_8__.InstallEntity(iter, _core_AbsolutePath__WEBPACK_IMPORTED_MODULE_3__.AbsolutePath.create(scope.INSTALL_PREFIX.resolve(destination)), baseDir ? _core_AbsolutePath__WEBPACK_IMPORTED_MODULE_3__.AbsolutePath.create(baseDir) : undefined);
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
/*
 * MIT License
 *
 * Copyright (c) 2025  Yurii Yakubin (yurii.yakubin@gmail.com)
 *
 * Permission is granted to use, copy, modify, and distribute this software
 * under the MIT License. See LICENSE file for details.
 */
class InstallEntity {
    _value;
    _destination;
    _baseDir;
    constructor(value, destination, baseDir) {
        this._value = value;
        this._destination = destination;
        this._baseDir = baseDir;
    }
    get VALUE() {
        return this._value;
    }
    get DESTINATION() {
        return this._destination;
    }
    get BASE_DIR() {
        return this._baseDir;
    }
    toJSON() {
        const json = {
            type: InstallEntity.name,
            value: this._value,
            destination: this._destination,
        };
        if (this._baseDir)
            json.baseDir = this._baseDir;
        return json;
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
//# sourceMappingURL=data:application/json;charset=utf-8;base64,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QUFHLE1BSWxCO0lBRUQsTUFBTSxZQUFZLEdBQVE7UUFDeEIsS0FBSyxFQUFFLENBQUMsS0FBVSxFQUFFLEVBQUU7WUFDcEIsT0FBTyxLQUFLLENBQUMsT0FBTyxDQUFDLEtBQUssQ0FBQyxDQUFDLENBQUMsQ0FBQyxLQUFLLENBQUMsSUFBSSxDQUFDLEtBQUssQ0FBQyxDQUFDLENBQUMsQ0FBQyxTQUFTLENBQUM7UUFDOUQsQ0FBQztRQUNELE9BQU8sRUFBRSxDQUFDLEtBQVUsRUFBRSxFQUFFO1lBQ3RCLE9BQU8sQ0FBQyxPQUFPLEtBQUssS0FBSyxTQUFTLENBQUMsQ0FBQyxDQUFDLENBQUMsS0FBSyxDQUFDLENBQUMsQ0FBQyxTQUFTLENBQUM7UUFDMUQsQ0FBQztRQUNELE1BQU0sRUFBRSxDQUFDLEtBQVUsRUFBRSxFQUFFO1lBQ3JCLE9BQU8sQ0FBQyxPQUFPLEtBQUssS0FBSyxRQUFRLENBQUMsQ0FBQyxDQUFDLENBQUMsS0FBSyxDQUFDLENBQUMsQ0FBQyxTQUFTLENBQUM7UUFDekQsQ0FBQztRQUNELE1BQU0sRUFBRSxDQUFDLEtBQVUsRUFBRSxFQUFFO1lBQ3JCLE9BQU8sQ0FBQyxPQUFPLEtBQUssS0FBSyxRQUFRLENBQUMsQ0FBQyxDQUFDLENBQUMsS0FBSyxDQUFDLENBQUMsQ0FBQyxTQUFTLENBQUM7UUFDekQsQ0FBQztRQUNELFlBQVksRUFBRSxDQUFDLEtBQVUsRUFBRSxFQUFFO1lBQzNCLE9BQU8sNERBQVksQ0FBQyxNQUFNLENBQUMsS0FBSyxDQUFDLENBQUM7UUFDcEMsQ0FBQztRQUNELFFBQVEsRUFBRSxDQUFDLEtBQVUsRUFBRSxFQUFFO1lBQ3ZCLE9BQU8sNERBQVksQ0FBQyxNQUFNLENBQUMsS0FBSyxDQUFDLENBQUM7UUFDcEMsQ0FBQztRQUNELE9BQU8sRUFBRSxDQUFDLEtBQVUsRUFBRSxFQUFFO1lBQ3RCLE9BQU8sNERBQVksQ0FBQyxNQUFNLENBQUMsS0FBSyxDQUFDLENBQUM7UUFDcEMsQ0FBQztRQUNELE1BQU0sRUFBRSxDQUFDLEtBQVUsRUFBRSxFQUFFO1lB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Q0FBQyxVQUFrQixFQUFFLFNBQWlCLEVBQUUsT0FBMkIsRUFBRSxFQUFFLENBQUMsZ0RBQVksQ0FBQyxXQUFXLEVBQUUsQ0FBQyxVQUFVLENBQUMsVUFBVSxFQUFFLFNBQVMsRUFBRSxPQUFPLENBQUM7UUFDekosU0FBUyxFQUFFLENBQUMsSUFBUyxFQUFFLEVBQUUsQ0FBQyxnREFBWSxDQUFDLFdBQVcsRUFBRSxDQUFDLFNBQVMsQ0FBQyxJQUFJLENBQUM7UUFDcEUsS0FBSyxFQUFFLENBQUMsSUFBUyxFQUFFLEVBQUUsQ0FBQyxnREFBWSxDQUFDLFdBQVcsRUFBRSxDQUFDLEtBQUssQ0FBQyxJQUFJLENBQUM7UUFDNUQsT0FBTyxFQUFFLENBQUMsSUFBUyxFQUFFLEVBQUUsQ0FBQyxnREFBWSxDQUFDLFdBQVcsRUFBRSxDQUFDLE9BQU8sQ0FBQyxJQUFJLENBQUM7UUFDaEUsT0FBTyxFQUFFLENBQUMsSUFBUyxFQUFFLEVBQUUsQ0FBQyxnREFBWSxDQUFDLFdBQVcsRUFBRSxDQUFDLE9BQU8sQ0FBQyxJQUFJLENBQUM7UUFDaEUsS0FBSyxFQUFFLENBQUMsSUFBUyxFQUFFLEVBQUUsQ0FBQyxnREFBWSxDQUFDLFdBQVcsRUFBRSxDQUFDLEtBQUssQ0FBQyxJQUFJLENBQUM7UUFDNUQsY0FBYztLQUNmO0lBQ0QsT0FBTyxFQUFFO1FBQ1AsS0FBSyxFQUFFLDJEQUFVO0tBQ2xCO0lBQ0QsS0FBSyxFQUFFO1FBQ0wsVUFBVTtRQUNWLFlBQVk7S0FDYjtJQUNELElBQUksRUFBRSw2Q0FBSTtDQUNYLEVBQUM7QUFFRixJQUFJLDJEQUFZLEVBQUUsRUFBRSxDQUFDO0lBQ25CLHFEQUFTLEVBQUUsQ0FBQztBQUNkLENBQUMiLCJzb3VyY2VzIjpbIndlYnBhY2s6Ly9iaXRtYWtlL3dlYnBhY2svdW5pdmVyc2FsTW9kdWxlRGVmaW5pdGlvbiIsIndlYnBhY2s6Ly9iaXRtYWtlLy4vc3JjL0NvbnN0YW50cy50cyIsIndlYnBhY2s6Ly9iaXRtYWtlLy4vc3JjL1J1blNjcmlwdC50cyIsIndlYnBhY2s6Ly9iaXRtYWtlLy4vc3JjL2FjdGlvbnMvYml0bWFrZS50cyIsIndlYnBhY2s6Ly9iaXRtYWtlLy4vc3JjL2FjdGlvbnMvY21ha2UudHMiLCJ3ZWJwYWNrOi8vYml0bWFrZS8uL3NyYy9hY3Rpb25zL2NvbmZpZ3VyZS50cyIsIndlYnBhY2s6Ly9iaXRtYWtlLy4vc3JjL2FjdGlvbnMvaW5kZXgudHMiLCJ3ZWJwYWNrOi8vYml0bWFrZS8uL3NyYy9hY3Rpb25zL21ha2UudHMiLCJ3ZWJwYWNrOi8vYml0bWFrZS8uL3NyYy9hY3Rpb25zL25vbmUudHMiLCJ3ZWJwYWNrOi8vYml0bWFrZS8uL3NyYy9hY3Rpb25zL3Byb2Nlc3MudHMiLCJ3ZWJwYWNrOi8vYml0bWFrZS8uL3NyYy9jbWFrZS9Db25zdGFudHMudHMiLCJ3ZWJwYWNrOi8vYml0bWFrZS8uL3NyYy9jbWFrZS9IZWxwZXIudHMiLCJ3ZWJwYWNrOi8vYml0bWFrZS8uL3NyYy9jbWFrZS9pbmRleC50cyIsIndlYnBhY2s6Ly9iaXRtYWtlLy4vc3JjL2NvbW1hbmRzL2J1aWxkLnRzIiwid2VicGFjazovL2JpdG1ha2UvLi9zcmMvY29tbWFuZHMvaW5kZXgudHMiLCJ3ZWJwYWNrOi8vYml0bWFrZS8uL3NyYy9jb21tYW5kcy9pbml0LnRzIiwid2VicGFjazovL2JpdG1ha2UvLi9zcmMvY29yZS9BYnNvbHV0ZVBhdGgudHMiLCJ3ZWJwYWNrOi8vYml0bWFrZS8uL3NyYy9jb3JlL0Jhc2VDb250ZXh0LnRzIiwid2VicGFjazovL2JpdG1ha2UvLi9zcmMvY29yZS9CdWlsZGluU2NyaXB0cy9jX2hlYWRlci50cyIsIndlYnBhY2s6Ly9iaXRtYWtlLy4vc3JjL2NvcmUvQnVpbGRpblNjcmlwdHMvY29uZmlndXJlX2ZpbGUudHMiLCJ3ZWJwYWNrOi8vYml0bWFrZS8uL3NyYy9jb3JlL0J1aWxkaW5TY3JpcHRzL2luZGV4LnRzIiwid2VicGFjazovL2JpdG1ha2UvLi9zcmMvY29yZS9DdXN0b21TY3JpcHQudHMiLCJ3ZWJwYWNrOi8vYml0bWFrZS8uL3NyYy9jb3JlL0RldGVybWluZUNvbXBpbGVyLnRzIiwid2VicGFjazovL2JpdG1ha2UvLi9zcmMvY29yZS9FeGVjU2NyaXB0VGFzay50cyIsIndlYnBhY2s6Ly9iaXRtYWtlLy4vc3JjL2NvcmUvRmlsZUluc3RhbGxhdGlvblRhc2sudHMiLCJ3ZWJwYWNrOi8vYml0bWFrZS8uL3NyYy9jb3JlL0ZpbmRQcm9ncmFtLnRzIiwid2VicGFjazovL2JpdG1ha2UvLi9zcmMvY29yZS9Hb2FsQ29sbGVjdGlvbi50cyIsIndlYnBhY2s6Ly9iaXRtYWtlLy4vc3JjL2NvcmUvSW5zdGFsbEVudGl0eS50cyIsIndlYnBhY2s6Ly9iaXRtYWtlLy4vc3JjL2NvcmUvTG9jYWxNYWtlQ29udGV4dC50cyIsIndlYnBhY2s6Ly9iaXRtYWtlLy4vc3JjL2NvcmUvTWFrZUludGVyZmFjZXMudHMiLCJ3ZWJwYWNrOi8vYml0bWFrZS8uL3NyYy9jb3JlL1BsdWdpbkNvbnRleHQudHMiLCJ3ZWJwYWNrOi8vYml0bWFrZS8uL3NyYy9jb3JlL1Byb2plY3RDb250ZXh0LnRzIiwid2VicGFjazovL2JpdG1ha2UvLi9zcmMvY29yZS9TY29wZS50cyIsIndlYnBhY2s6Ly9iaXRtYWtlLy4vc3JjL2NvcmUvU2NyaXB0Q29sbGVjdGlvbi50cyIsIndlYnBhY2s6Ly9iaXRtYWtlLy4vc3JjL2NvcmUvU2NyaXB0Q29udGV4dC50cyIsIndlYnBhY2s6Ly9iaXRtYWtlLy4vc3JjL2NvcmUvU2ltcGxlT2JqZWN0LnRzIiwid2VicGFjazovL2JpdG1ha2UvLi9zcmMvY29yZS9Tb3VyY2VGaWxlLnRzIiwid2VicGFjazovL2JpdG1ha2UvLi9zcmMvY29yZS9TcGF3blN5bmNUYXNrLnRzIiwid2VicGFjazovL2JpdG1ha2UvLi9zcmMvY29yZS9TeXN0ZW1WYXJpYWJsZXMudHMiLCJ3ZWJwYWNrOi8vYml0bWFrZS8uL3NyYy9jb3JlL1RhcmdldC50cyIsIndlYnBhY2s6Ly9iaXRtYWtlLy4vc3JjL2NvcmUvVGFyZ2V0Q29sbGVjdGlvbi50cyIsIndlYnBhY2s6Ly9iaXRtYWtlLy4vc3JjL2NvcmUvVGFyZ2V0RmlsZS50cyIsIndlYnBhY2s6Ly9iaXRtYWtlLy4vc3JjL2NvcmUvVGFyZ2V0SGVscGVyLnRzIiwid2VicGFjazovL2JpdG1ha2UvLi9zcmMvY29yZS9UYXJnZXRJbmNsdWRlcy50cyIsIndlYnBhY2s6Ly9iaXRtYWtlLy4vc3JjL2NvcmUvVGFyZ2V0TmFtZS50cyIsIndlYnBhY2s6Ly9iaXRtYWtlLy4vc3JjL2NvcmUvVGFyZ2V0T2JqZWN0cy50cyIsIndlYnBhY2s6Ly9iaXRtYWtlLy4vc3JjL2NvcmUvVG9vbGNoYWluQ29udGV4dC50cyIsIndlYnBhY2s6Ly9iaXRtYWtlLy4vc3JjL2NvcmUvVHlwZXMudHMiLCJ3ZWJwYWNrOi8vYml0bWFrZS8uL3NyYy9jb3JlL1VzZXJNYWtlQ29udGV4dC50cyIsIndlYnBhY2s6Ly9iaXRtYWtlLy4vc3JjL2NvcmUvVXNlclNvdXJjZUZpbGVzLnRzIiwid2VicGFjazovL2JpdG1ha2UvLi9zcmMvY29yZS9Vc2VyVGFyZ2V0U3RydWN0LnRzIiwid2VicGFjazovL2JpdG1ha2UvLi9zcmMvY3h4L2luZGV4LnRzIiwid2VicGFjazovL2JpdG1ha2UvLi9zcmMvbG9nZ2VyL2luZGV4LnRzIiwid2VicGFjazovL2JpdG1ha2UvLi9zcmMvc2VydmVyL0pzb25ScGNSZXF1ZXN0U3luYy50cyIsIndlYnBhY2s6Ly9iaXRtYWtlLy4vc3JjL3NlcnZlci9Kc29uUnBjU2VydmVyLnRzIiwid2VicGFjazovL2JpdG1ha2UvLi9zcmMvc2VydmVyL01ha2VDbGllbnQudHMiLCJ3ZWJwYWNrOi8vYml0bWFrZS8uL3NyYy9zZXJ2ZXIvTWFrZVNlcnZlci50cyIsIndlYnBhY2s6Ly9iaXRtYWtlLy4vc3JjL3NlcnZlci9NZW1vcnlUcmFuc3BvcnQudHMiLCJ3ZWJwYWNrOi8vYml0bWFrZS8uL3NyYy9zZXJ2ZXIvTWVzc2FnZVBvcnRTZW5kZXIudHMiLCJ3ZWJwYWNrOi8vYml0bWFrZS8uL3NyYy9zZXJ2ZXIvUmVtb3RlTWFrZUNvbnRleHQudHMiLCJ3ZWJwYWNrOi8vYml0bWFrZS8uL3NyYy9zZXJ2ZXIvUmVtb3RlTWV0aG9kcy50cyIsIndlYnBhY2s6Ly9iaXRtYWtlLy4vc3JjL3NlcnZlci9UcmFuc3BvcnQudHMiLCJ3ZWJwYWNrOi8vYml0bWFrZS8uL3NyYy9zZXJ2ZXIvV29ya2VyTG9vcGVyLnRzIiwid2VicGFjazovL2JpdG1ha2UvLi9zcmMvc2VydmVyL1dvcmtlck5vZGUudHMiLCJ3ZWJwYWNrOi8vYml0bWFrZS8uL3NyYy9zZXJ2ZXIvV29ya2VyU2VuZGVyLnRzIiwid2VicGFjazovL2JpdG1ha2UvLi9zcmMvdXRpbHMvQXJncy50cyIsIndlYnBhY2s6Ly9iaXRtYWtlLy4vc3JjL3V0aWxzL0NoaWxkUHJvY2Vzcy50cyIsIndlYnBhY2s6Ly9iaXRtYWtlLy4vc3JjL3V0aWxzL0ZpbGVTeXN0ZW0udHMiLCJ3ZWJwYWNrOi8vYml0bWFrZS8uL3NyYy91dGlscy9Ib3N0LnRzIiwid2VicGFjazovL2JpdG1ha2UvLi9zcmMvdXRpbHMvSHR0cFJlcXVlc3QudHMiLCJ3ZWJwYWNrOi8vYml0bWFrZS8uL3NyYy91dGlscy9JbXBvcnRNb2R1bGUubWpzIiwid2VicGFjazovL2JpdG1ha2UvLi9zcmMvdXRpbHMvTWFrZVBhdGNoLnRzIiwid2VicGFjazovL2JpdG1ha2UvLi9zcmMvdXRpbHMvTW9kdWxlLnRzIiwid2VicGFjazovL2JpdG1ha2UvLi9zcmMvdXRpbHMvUGF0aC50cyIsIndlYnBhY2s6Ly9iaXRtYWtlLy4vc3JjL3V0aWxzL1ByaW1pdGl2ZXMudHMiLCJ3ZWJwYWNrOi8vYml0bWFrZS8uL3NyYy91dGlscy9TZXR0aW5nc1N0b3JhZ2UudHMiLCJ3ZWJwYWNrOi8vYml0bWFrZS8uL3NyYy91dGlscy9TdHJpY3RUeXBlLnRzIiwid2VicGFjazovL2JpdG1ha2UvLi9zcmMvdXRpbHMvVXJsU2NoZW1lLnRzIiwid2VicGFjazovL2JpdG1ha2UvZXh0ZXJuYWwgbm9kZS1jb21tb25qcyBcImh0dHBcIiIsIndlYnBhY2s6Ly9iaXRtYWtlL2V4dGVybmFsIG5vZGUtY29tbW9uanMgXCJodHRwc1wiIiwid2VicGFjazovL2JpdG1ha2UvZXh0ZXJuYWwgbm9kZS1jb21tb25qcyBcIm5vZGU6Y2hpbGRfcHJvY2Vzc1wiIiwid2VicGFjazovL2JpdG1ha2UvZXh0ZXJuYWwgbm9kZS1jb21tb25qcyBcIm5vZGU6ZnNcIiIsIndlYnBhY2s6Ly9iaXRtYWtlL2V4dGVybmFsIG5vZGUtY29tbW9uanMgXCJub2RlOm9zXCIiLCJ3ZWJwYWNrOi8vYml0bWFrZS9leHRlcm5hbCBub2RlLWNvbW1vbmpzIFwibm9kZTpwYXRoXCIiLCJ3ZWJwYWNrOi8vYml0bWFrZS9leHRlcm5hbCBub2RlLWNvbW1vbmpzIFwibm9kZTp1cmxcIiIsIndlYnBhY2s6Ly9iaXRtYWtlL2V4dGVybmFsIG5vZGUtY29tbW9uanMgXCJub2RlOndvcmtlcl90aHJlYWRzXCIiLCJ3ZWJwYWNrOi8vYml0bWFrZS93ZWJwYWNrL2Jvb3RzdHJhcCIsIndlYnBhY2s6Ly9iaXRtYWtlL3dlYnBhY2svcnVudGltZS9jb21wYXQgZ2V0IGRlZmF1bHQgZXhwb3J0Iiwid2VicGFjazovL2JpdG1ha2Uvd2VicGFjay9ydW50aW1lL2RlZmluZSBwcm9wZXJ0eSBnZXR0ZXJzIiwid2VicGFjazovL2JpdG1ha2Uvd2VicGFjay9ydW50aW1lL2hhc093blByb3BlcnR5IHNob3J0aGFuZCIsIndlYnBhY2s6Ly9iaXRtYWtlL3dlYnBhY2svcnVudGltZS9tYWtlIG5hbWVzcGFjZSBvYmplY3QiLCJ3ZWJwYWNrOi8vYml0bWFrZS8uL3NyYy9pbmRleC50cyJdLCJzb3VyY2VzQ29udGVudCI6WyIoZnVuY3Rpb24gd2VicGFja1VuaXZlcnNhbE1vZHVsZURlZmluaXRpb24ocm9vdCwgZmFjdG9yeSkge1xuXHRpZih0eXBlb2YgZXhwb3J0cyA9PT0gJ29iamVjdCcgJiYgdHlwZW9mIG1vZHVsZSA9PT0gJ29iamVjdCcpXG5cdFx0bW9kdWxlLmV4cG9ydHMgPSBmYWN0b3J5KCk7XG5cdGVsc2UgaWYodHlwZW9mIGRlZmluZSA9PT0gJ2Z1bmN0aW9uJyAmJiBkZWZpbmUuYW1kKVxuXHRcdGRlZmluZShbXSwgZmFjdG9yeSk7XG5cdGVsc2UgaWYodHlwZW9mIGV4cG9ydHMgPT09ICdvYmplY3QnKVxuXHRcdGV4cG9ydHNbXCJiaXRtYWtlXCJdID0gZmFjdG9yeSgpO1xuXHRlbHNlXG5cdFx0cm9vdFtcImJpdG1ha2VcIl0gPSBmYWN0b3J5KCk7XG59KShnbG9iYWwsICgpID0+IHtcbnJldHVybiAiLCIvKlxuICogTUlUIExpY2Vuc2VcbiAqXG4gKiBDb3B5cmlnaHQgKGMpIDIwMjUgIFl1cmlpIFlha3ViaW4gKHl1cmlpLnlha3ViaW5AZ21haWwuY29tKVxuICpcbiAqIFBlcm1pc3Npb24gaXMgZ3JhbnRlZCB0byB1c2UsIGNvcHksIG1vZGlmeSwgYW5kIGRpc3RyaWJ1dGUgdGhpcyBzb2Z0d2FyZVxuICogdW5kZXIgdGhlIE1JVCBMaWNlbnNlLiBTZWUgTElDRU5TRSBmaWxlIGZvciBkZXRhaWxzLlxuICovXG5cbmV4cG9ydCBjb25zdCBVU0VSX0NPTkZJRyA9IFwiYml0bWFrZS5jb25maWcubWpzXCI7XG5leHBvcnQgY29uc3QgUkVRVUVTVF9BVFRFTVBUUyA9IDMwO1xuZXhwb3J0IGNvbnN0IEJVSUxEX1NFVFRJTkdTX0ZJTEUgPSBcIkJ1aWxkU2V0dGluZ3MuanNvblwiO1xuZXhwb3J0IGNvbnN0IEFMTF9UQVJHRVQgPSBcImFsbFwiO1xuZXhwb3J0IGNvbnN0IElOU1RBTExfVEFSR0VUID0gXCJpbnN0YWxsXCI7XG5leHBvcnQgY29uc3QgUEFDS0FHRV9KU09OID0gXCJwYWNrYWdlLmpzb25cIjtcbmV4cG9ydCBjb25zdCBNQUtFX0NBQ0hFID0gXCJNYWtlQ2FjaGUuanNvblwiO1xuZXhwb3J0IGNvbnN0IFNZU1RFTV9WQVJJQUJMRV9HUk9VUCA9IFwic3lzdGVtXCI7XG5leHBvcnQgY29uc3QgQ1VTVE9NX1ZBUklBQkxFX0dST1VQID0gXCJjdXN0b21cIjtcbiIsIi8qXG4gKiBNSVQgTGljZW5zZVxuICpcbiAqIENvcHlyaWdodCAoYykgMjAyNSAgWXVyaWkgWWFrdWJpbiAoeXVyaWkueWFrdWJpbkBnbWFpbC5jb20pXG4gKlxuICogUGVybWlzc2lvbiBpcyBncmFudGVkIHRvIHVzZSwgY29weSwgbW9kaWZ5LCBhbmQgZGlzdHJpYnV0ZSB0aGlzIHNvZnR3YXJlXG4gKiB1bmRlciB0aGUgTUlUIExpY2Vuc2UuIFNlZSBMSUNFTlNFIGZpbGUgZm9yIGRldGFpbHMuXG4gKi9cblxuaW1wb3J0IHsgaXNNYWluVGhyZWFkLCBwYXJlbnRQb3J0LCB3b3JrZXJEYXRhIH0gZnJvbSBcIm5vZGU6d29ya2VyX3RocmVhZHNcIjtcbmltcG9ydCB7IEFyZ3MgfSAgZnJvbSBcIkAvdXRpbHMvQXJnc1wiO1xuaW1wb3J0IGNvbW1hbmRzIGZyb20gXCJAL2NvbW1hbmRzXCI7XG5pbXBvcnQgeyBMb2dnZXIgfSBmcm9tIFwiQC9sb2dnZXJcIjtcbmltcG9ydCB7IE1lc3NhZ2VQb3J0U2VuZGVyIH0gZnJvbSBcIkAvc2VydmVyL01lc3NhZ2VQb3J0U2VuZGVyXCI7XG5pbXBvcnQgeyBXb3JrZXJMb29wZXIgfSBmcm9tIFwiQC9zZXJ2ZXIvV29ya2VyTG9vcGVyXCI7XG5cbmNvbnN0IGxvZ2dlciA9IExvZ2dlci5jcmVhdGUoaW1wb3J0Lm1ldGEudXJsKTtcblxuZXhwb3J0IGFzeW5jIGZ1bmN0aW9uIHJ1bk1haW5TY3JpcHQoKSB7XG4gIGxvZ2dlci5pbmZvKFwiTWFpbiB0aHJlYWQgc3RhcnRlZFwiKVxuICBjb25zdCBvcHRpb25zOiBhbnkgPSB7XG4gICAgaGFuZGxlcjogXCJkZWZhdWx0XCIsXG4gICAgd29ya0RpcjogcHJvY2Vzcy5jd2QoKSxcbiAgICBlbnY6IHt9LFxuICB9O1xuXG4gIGxldCBub2RlRXhlY3V0YWJsZTogc3RyaW5nIHwgdW5kZWZpbmVkO1xuICBpZiAocHJvY2Vzcy5hcmd2Lmxlbmd0aCA+IDApXG4gICAgbm9kZUV4ZWN1dGFibGUgPSBwcm9jZXNzLmFyZ3ZbMF07XG5cbiAgbGV0IGN1cnJlbnRTY3JpcHQ6IHN0cmluZyB8IHVuZGVmaW5lZDtcbiAgaWYgKHByb2Nlc3MuYXJndi5sZW5ndGggPiAxKVxuICAgIGN1cnJlbnRTY3JpcHQgPSBwcm9jZXNzLmFyZ3ZbMV07XG5cbiAgbGV0IGFyZ3NJbmRleCA9IHByb2Nlc3MuYXJndi5sZW5ndGg7XG4gIGlmIChwcm9jZXNzLmFyZ3YubGVuZ3RoID4gMikge1xuICAgIGFyZ3NJbmRleCA9IDI7XG4gICAgY29uc3QgaGFuZGxlciA9IHByb2Nlc3MuYXJndlthcmdzSW5kZXhdO1xuICAgIGlmICghaGFuZGxlci5zdGFydHNXaXRoKFwiLS1cIikpIHtcbiAgICAgIG9wdGlvbnMuaGFuZGxlciA9IGhhbmRsZXI7XG4gICAgICBhcmdzSW5kZXgrKztcbiAgICB9XG4gIH1cblxuICBvcHRpb25zLmVudiA9IEFyZ3MudG9PYmplY3QocHJvY2Vzcy5hcmd2LnNsaWNlKGFyZ3NJbmRleCkpO1xuXG4gIGNvbnN0IGhhbmRsZXIgPSBjb21tYW5kc1tvcHRpb25zLmhhbmRsZXJdO1xuICBpZiAoIWhhbmRsZXIpXG4gICAgdGhyb3cgRXJyb3IoYFRoZSAke1BST0pFQ1RfTkFNRX0gZG9lcyBub3Qgc3VwcG9ydCB0aGUgJHtvcHRpb25zLmhhbmRsZXJ9IGNvbW1hbmRgKTtcblxuICBjb25zdCByZXMgPSBoYW5kbGVyKG9wdGlvbnMpO1xuICBpZiAocmVzIGluc3RhbmNlb2YgUHJvbWlzZSkge1xuICAgIGF3YWl0IHJlcztcbiAgfVxufVxuXG5leHBvcnQgZnVuY3Rpb24gcnVuV29ya2VyU2NyaXB0KCkge1xuICBsb2dnZXIuZGVidWcoXCJXb3JrZXIgdGhyZWFkIHN0YXJ0ZWRcIiwgd29ya2VyRGF0YSk7XG5cbiAgaWYgKCFwYXJlbnRQb3J0KSB7XG4gICAgdGhyb3cgbmV3IEVycm9yKGBXb3JrZXIgbm90IHN1cHBvcnRlZCBwYXJlbnRQb3J0YCk7XG4gIH1cblxuICBjb25zdCBzZW5kZXIgPSBuZXcgTWVzc2FnZVBvcnRTZW5kZXIocGFyZW50UG9ydCk7XG4gIGNvbnN0IGxvb3BlciA9IG5ldyBXb3JrZXJMb29wZXIoc2VuZGVyKTtcblxuICBwYXJlbnRQb3J0Lm9uKFwibWVzc2FnZVwiLCAobWVzc2FnZSkgPT4gbG9vcGVyLmVtaXRNZXNzYWdlKHNlbmRlciwgbWVzc2FnZSkpO1xufVxuXG5leHBvcnQgZnVuY3Rpb24gcnVuU2NyaXB0KCkge1xuICBpZiAoaXNNYWluVGhyZWFkKSB7XG4gICAgcnVuTWFpblNjcmlwdCgpLnRoZW4oKCkgPT4gcHJvY2Vzcy5leGl0KDApKS5jYXRjaCgoZSkgPT4ge1xuICAgICAgaWYgKGUgaW5zdGFuY2VvZiBFcnJvcilcbiAgICAgICAgbG9nZ2VyLmZhdGFsKGUuc3RhY2spO1xuICAgICAgZWxzZVxuICAgICAgICBsb2dnZXIuZmF0YWwoZSk7XG4gICAgICBwcm9jZXNzLmV4aXQoMSk7XG4gICAgfSk7XG4gIH1cbiAgZWxzZSB7XG4gICAgcnVuV29ya2VyU2NyaXB0KCk7XG4gIH1cbn1cbiIsIi8qXG4gKiBNSVQgTGljZW5zZVxuICpcbiAqIENvcHlyaWdodCAoYykgMjAyNSAgWXVyaWkgWWFrdWJpbiAoeXVyaWkueWFrdWJpbkBnbWFpbC5jb20pXG4gKlxuICogUGVybWlzc2lvbiBpcyBncmFudGVkIHRvIHVzZSwgY29weSwgbW9kaWZ5LCBhbmQgZGlzdHJpYnV0ZSB0aGlzIHNvZnR3YXJlXG4gKiB1bmRlciB0aGUgTUlUIExpY2Vuc2UuIFNlZSBMSUNFTlNFIGZpbGUgZm9yIGRldGFpbHMuXG4gKi9cblxuaW1wb3J0IGZzIGZyb20gXCJub2RlOmZzXCI7XG5cbmltcG9ydCB7IFBhdGggfSBmcm9tIFwiQC91dGlscy9QYXRoXCI7XG5pbXBvcnQgeyBNYWtlU2VydmVyIH0gZnJvbSBcIkAvc2VydmVyL01ha2VTZXJ2ZXJcIjtcbmltcG9ydCB7IFBsdWdpbkNvbnRleHQgfSBmcm9tIFwiQC9jb3JlL1BsdWdpbkNvbnRleHRcIjtcbmltcG9ydCB7IFNjb3BlSGVscGVyIH0gZnJvbSBcIkAvY29yZS9TY29wZVwiO1xuaW1wb3J0IHsgVG9vbGNoYWluQ29udGV4dCB9IGZyb20gXCJAL2NvcmUvVG9vbGNoYWluQ29udGV4dFwiO1xuaW1wb3J0IHsgZ2V0UGF0aFN0cmluZywgZ2V0VVJMU3RyaW5nLCBzYXZlQXNKU09OIH0gIGZyb20gXCJAL3V0aWxzL0ZpbGVTeXN0ZW1cIjtcbmltcG9ydCB7IEFic29sdXRlUGF0aCB9IGZyb20gXCJAL2NvcmUvQWJzb2x1dGVQYXRoXCI7XG5pbXBvcnQgeyBpbXBvcnRNb2R1bGUgfSAgZnJvbSBcIkAvdXRpbHMvTW9kdWxlXCI7XG5pbXBvcnQgeyBkZXRlcm1pbmVDb21waWxlciB9ICBmcm9tIFwiQC9jb3JlL0RldGVybWluZUNvbXBpbGVyXCI7XG5pbXBvcnQgeyBTZXR0aW5nc1N0b3JhZ2UgfSBmcm9tIFwiQC91dGlscy9TZXR0aW5nc1N0b3JhZ2VcIjtcbmltcG9ydCB7IElNUE9SVF9TQ0hFTUUgfSBmcm9tIFwiQC91dGlscy9VcmxTY2hlbWVcIjtcbmltcG9ydCB7IElOU1RBTExfVEFSR0VULCBQQUNLQUdFX0pTT04sIE1BS0VfQ0FDSEUgfSBmcm9tIFwiQC9Db25zdGFudHNcIjtcbmltcG9ydCB7IFNZU1RFTV9WQVJJQUJMRV9HUk9VUCB9IGZyb20gXCJAL0NvbnN0YW50c1wiO1xuaW1wb3J0IHsgcmVxdWlyZVJlc29sdmUgfSBmcm9tIFwiQC91dGlscy9Nb2R1bGVcIjtcbmltcG9ydCB7IFN5c3RlbVNjb3BlIH0gZnJvbSBcIkAvY29yZS9TeXN0ZW1TY29wZVwiO1xuaW1wb3J0IFN5c3RlbVZhcmlhYmxlcyBmcm9tIFwiQC9jb3JlL1N5c3RlbVZhcmlhYmxlc1wiO1xuaW1wb3J0IHsgTG9nZ2VyIH0gZnJvbSBcIkAvbG9nZ2VyXCI7XG5cbmNvbnN0IGxvZ2dlciA9IExvZ2dlci5jcmVhdGUoaW1wb3J0Lm1ldGEudXJsKTtcblxuZXhwb3J0IGRlZmF1bHQgYXN5bmMgZnVuY3Rpb24oY29uZmlnOiBhbnksIGVudmlyb25tZW50OiBhbnksIHNldHRpbmdzOiBTZXR0aW5nc1N0b3JhZ2UpIHtcbiAgcHJvY2Vzcy5lbnYgPSBlbnZpcm9ubWVudDtcblxuICBjb25zdCBzZXJ2ZXIgPSBuZXcgTWFrZVNlcnZlcjtcblxuICBjb25zdCB2YXJpYWJsZU1hcCA9IHNlcnZlci5yb290VmFyaWFibGVNYXA7XG4gIFNjb3BlSGVscGVyLmV4dGVuZFZhcmlhYmxlTWFwQnlWYWx1ZXModmFyaWFibGVNYXAsIFwiXCIsIGNvbmZpZy52YXJpYWJsZXMpO1xuICBTY29wZUhlbHBlci5kZWZpbmVWYXJpYWJsZXNJblZhcmlhYmxlTWFwKHZhcmlhYmxlTWFwLCBTWVNURU1fVkFSSUFCTEVfR1JPVVAsIFN5c3RlbVZhcmlhYmxlcyk7XG4gIGNvbnN0IHNjb3BlID0gU2NvcGVIZWxwZXIuY3JlYXRlUHJveHkodmFyaWFibGVNYXApIGFzIFN5c3RlbVNjb3BlO1xuXG4gIGNvbnN0IHNvdXJjZURpciA9IGdldFBhdGhTdHJpbmcoY29uZmlnLnNvdXJjZURpcik7XG4gIGNvbnN0IGJpbmFyeURpciA9IGdldFBhdGhTdHJpbmcoY29uZmlnLmJpbmFyeURpcik7XG5cbiAgc2NvcGUuUFJPSkVDVF9TT1VSQ0VfRElSID0gQWJzb2x1dGVQYXRoLmNyZWF0ZShzb3VyY2VEaXIpO1xuICBzY29wZS5QUk9KRUNUX0JJTkFSWV9ESVIgPSBBYnNvbHV0ZVBhdGguY3JlYXRlKGJpbmFyeURpcik7XG5cbiAgc2NvcGUuUEFDS0FHRV9GSUxFID0gc2NvcGUuUFJPSkVDVF9TT1VSQ0VfRElSLmpvaW4oUEFDS0FHRV9KU09OKTtcbiAgc2NvcGUuQ0FDSEVfRklMRSA9IHNjb3BlLlBST0pFQ1RfQklOQVJZX0RJUi5qb2luKE1BS0VfQ0FDSEUpO1xuICBzY29wZS5TT1VSQ0VfRElSID0gc2NvcGUuUFJPSkVDVF9TT1VSQ0VfRElSO1xuICBzY29wZS5CSU5BUllfRElSID0gc2NvcGUuUFJPSkVDVF9CSU5BUllfRElSO1xuXG4gIGNvbnN0IHBhY2thZ2VKc29uID0gYXdhaXQgZnMucHJvbWlzZXMucmVhZEZpbGUoc2NvcGUuUEFDS0FHRV9GSUxFLnRvU3RyaW5nKCksIFwidXRmOFwiKTtcbiAgY29uc3QgcGtnID0gSlNPTi5wYXJzZShwYWNrYWdlSnNvbik7XG5cbiAgc2NvcGUuQlVJTERfVFlQRSA9IGNvbmZpZy5idWlsZFR5cGU7XG4gIHNjb3BlLlBST0pFQ1RfTkFNRSA9IHBrZy5uYW1lO1xuICBzY29wZS5QUk9KRUNUX1ZFUlNJT04gPSBwa2cudmVyc2lvbjtcbiAgc2NvcGUuUFJPSkVDVF9ERVNDUklQVElPTiA9IHBrZy5kZXNjcmlwdGlvbiB8fCBcIlwiO1xuICBzY29wZS5QUk9KRUNUX0hPTUVQQUdFX1VSTCA9IHBrZy5ob21lcGFnZSB8fCBcIlwiO1xuXG4gIGlmIChjb25maWcuZGVzdERpcilcbiAgICBzY29wZS5ERVNURElSID0gY29uZmlnLmRlc3REaXI7XG5cbiAgZm9yIChjb25zdCBwbHVnaW4gb2YgKHNjb3BlLk1BS0VfUExVR0lOX0xJU1QgfHwgW10pKSB7XG4gICAgY29uc3QgY3dkU2F2ZSA9IHByb2Nlc3MuY3dkKCk7XG5cbiAgICBzY29wZS5TQ1JJUFRfRklMRSA9IEFic29sdXRlUGF0aC5jcmVhdGUocGx1Z2luKTtcbiAgICBzY29wZS5TQ1JJUFRfRElSID0gc2NvcGUuU0NSSVBUX0ZJTEUuZGlybmFtZSgpO1xuICAgIHNjb3BlLlNPVVJDRV9ESVIgPSBzY29wZS5TQ1JJUFRfRElSO1xuXG4gICAgY29uc3QgYmluYXJ5RGlyMSA9IHNjb3BlLlBST0pFQ1RfQklOQVJZX0RJUi5yZWxhdGl2ZShzb3VyY2VEaXIpO1xuICAgIGNvbnN0IGJpbmFyeURpcjIgPSBzY29wZS5QUk9KRUNUX1NPVVJDRV9ESVIucmVsYXRpdmUoc291cmNlRGlyKTtcbiAgICBjb25zdCBiaW5hcnlEaXIgPSAoYmluYXJ5RGlyMi5sZW5ndGggPCBiaW5hcnlEaXIxLmxlbmd0aCA/IGJpbmFyeURpcjIgOiBiaW5hcnlEaXIxKS5yZXBsYWNlKFwiLi4vXCIsIFwiX18vXCIpO1xuICAgIHNjb3BlLkJJTkFSWV9ESVIgPSBzY29wZS5QUk9KRUNUX0JJTkFSWV9ESVIuam9pbihcIk1ha2VQbHVnaW5CaW5hcmllc1wiLCBiaW5hcnlEaXIpO1xuXG4gICAgcHJvY2Vzcy5jaGRpcihzY29wZS5TT1VSQ0VfRElSLnRvU3RyaW5nKCkpO1xuICAgIGNvbnN0IHBsdWdpblVybCA9IGdldFVSTFN0cmluZyhzY29wZS5TQ1JJUFRfRklMRS50b1N0cmluZygpKTtcbiAgICBjb25zdCBtb2R1bGUgPSBhd2FpdCBpbXBvcnRNb2R1bGUocGx1Z2luVXJsKTtcbiAgICBcbiAgICBpZiAoIW1vZHVsZS5kZWZhdWx0KVxuICAgICAgdGhyb3cgbmV3IEVycm9yKGBQbHVnaW4gJHtzY29wZS5TQ1JJUFRfRklMRS5iYXNlbmFtZSgpfSBub3QgY29udGFpbiBkZWZhdWx0IGV4cG9ydGApO1xuXG4gICAgY29uc3QgbWsgPSBQbHVnaW5Db250ZXh0LmNyZWF0ZShzZXJ2ZXIucHJvamVjdCwgdmFyaWFibGVNYXApO1xuICAgIGlmICh0eXBlb2YgbW9kdWxlLmRlZmF1bHQgIT09IFwiZnVuY3Rpb25cIilcbiAgICAgIHRocm93IG5ldyBFcnJvcihgUGx1Z2luICR7c2NvcGUuU0NSSVBUX0ZJTEUuYmFzZW5hbWUoKX0gZXhwb3J0IGhhcyBubyBmdW5jdGlvbiBvciBjbGFzc2ApO1xuICAgIGxldCByZXN1bHQ6IGFueTtcbiAgICBpZiAoL15jbGFzc1xccy8udGVzdChGdW5jdGlvbi5wcm90b3R5cGUudG9TdHJpbmcuY2FsbChtb2R1bGUuZGVmYXVsdCkpKSB7XG4gICAgICBpZiAodHlwZW9mIG1vZHVsZS5kZWZhdWx0LnByb3RvdHlwZS5hcHBseSAhPT0gXCJmdW5jdGlvblwiKVxuICAgICAgICB0aHJvdyBuZXcgRXJyb3IoYFBsdWdpbiBjbGFzcyBvZiAke3Njb3BlLlNDUklQVF9GSUxFLmJhc2VuYW1lKCl9IGhhcyBubyBhcHBseSBtZXRob2RgKTtcbiAgICAgIHJlc3VsdCA9IChuZXcgbW9kdWxlLmRlZmF1bHQpLmFwcGx5KG1rKTtcbiAgICB9XG4gICAgZWxzZSB7XG4gICAgICByZXN1bHQgPSBtb2R1bGUuZGVmYXVsdChtayk7XG4gICAgfVxuXG4gICAgaWYgKHJlc3VsdCBpbnN0YW5jZW9mIFByb21pc2UpXG4gICAgICBhd2FpdCByZXN1bHQ7XG5cbiAgICBwcm9jZXNzLmNoZGlyKGN3ZFNhdmUpO1xuICB9XG5cbiAgaWYgKHNjb3BlLlRPT0xDSEFJTl9GSUxFKSB7XG4gICAgY29uc3QgdG9vbGNoYWluVXJsID0gZ2V0VVJMU3RyaW5nKHNjb3BlLlRPT0xDSEFJTl9GSUxFLnRvU3RyaW5nKCkpO1xuICAgIGNvbnN0IHRvb2xjaGFpbiA9IGF3YWl0IGltcG9ydE1vZHVsZSh0b29sY2hhaW5VcmwpO1xuICAgIGlmICghdG9vbGNoYWluLmRlZmF1bHQpXG4gICAgICB0aHJvdyBuZXcgRXJyb3IoXCJUb29sY2hhaW4gbW9kdWxlIGhhcyBubyBkZWZhdWx0IGV4cG9ydFwiKTtcbiAgICBjb25zdCBtayA9IFRvb2xjaGFpbkNvbnRleHQuY3JlYXRlKHNlcnZlci5wcm9qZWN0LCB2YXJpYWJsZU1hcCk7XG4gICAgY29uc3QgcmVzdWx0ID0gdG9vbGNoYWluLmRlZmF1bHQobWspO1xuICAgIGlmIChyZXN1bHQgaW5zdGFuY2VvZiBQcm9taXNlKVxuICAgICAgYXdhaXQgcmVzdWx0O1xuICB9XG4gIGVsc2Uge1xuICAgIGF3YWl0IGRldGVybWluZUNvbXBpbGVyKHNjb3BlKTtcbiAgfVxuXG4gIGlmIChjb25maWcuc291cmNlVXJsICYmIGNvbmZpZy5zb3VyY2VVcmwuc3RhcnRzV2l0aChJTVBPUlRfU0NIRU1FKSkge1xuICAgIGNvbnN0IHNjcmlwdEZpbGUgPSByZXF1aXJlUmVzb2x2ZShjb25maWcuc291cmNlVXJsLnNsaWNlKElNUE9SVF9TQ0hFTUUubGVuZ3RoKSk7XG4gICAgc2NvcGUuU0NSSVBUX0ZJTEUgPSBBYnNvbHV0ZVBhdGguY3JlYXRlKHNjcmlwdEZpbGUpO1xuICAgIHNjb3BlLlNDUklQVF9ESVIgPSBzY29wZS5TQ1JJUFRfRklMRS5kaXJuYW1lKCk7XG4gIH1cblxuICBzZXJ2ZXIuYWRkRXZlbnRMaXN0ZW5lcihcImNvbmZpZ3VyZVwiLCBhc3luYyAoZXZlbnQpID0+IHtcbiAgICBsb2dnZXIuaW5mbyhcIkNvbmZpZ3VyaW5nIGRvbmVcIik7XG5cbiAgICBpZiAoc2NvcGUuR0xPQkFMX0NPTlRFWFRfSlNPTikge1xuICAgICAgYXdhaXQgc2F2ZUFzSlNPTihzY29wZS5HTE9CQUxfQ09OVEVYVF9KU09OLnRvUGF0aCgpLCBzZXJ2ZXIucHJvamVjdCwgeyBwcmV0dHk6IHRydWUgfSk7XG4gICAgfVxuXG4gICAgY29uc3QgYWxsR29hbExpc3QgPSBzZXJ2ZXIucHJvamVjdC5jcmVhdGVHb2FscyhzY29wZSk7XG4gICAgY29uc3QgZ29hbExpc3QgPSBhbGxHb2FsTGlzdC5nZXRUYXJnZXRMaXN0KElOU1RBTExfVEFSR0VUKTtcblxuICAgIGlmIChzY29wZS5UQVJHRVRfR09BTFNfSlNPTikge1xuICAgICAgYXdhaXQgc2F2ZUFzSlNPTihzY29wZS5UQVJHRVRfR09BTFNfSlNPTi50b1BhdGgoKSwgZ29hbExpc3QsIHsgcHJldHR5OiB0cnVlIH0pO1xuICAgIH1cblxuICAgIGxldCBsb2FkZWQgPSAwO1xuICAgIGNvbnN0IHRvdGFsID0gZ29hbExpc3QubGVuZ3RoO1xuICAgIGZvciAoY29uc3QgaXRlciBvZiBnb2FsTGlzdCkge1xuICAgICAgaWYgKGl0ZXIub3V0cHV0KSB7XG4gICAgICAgIGNvbnN0IG91dHB1dERpciA9IFBhdGguZGlybmFtZShpdGVyLm91dHB1dCk7XG4gICAgICAgIGF3YWl0IGZzLnByb21pc2VzLm1rZGlyKG91dHB1dERpciwgeyByZWN1cnNpdmU6IHRydWUgfSk7XG4gICAgICB9XG4gICAgICBpZiAoaXRlci5tZXNzYWdlKSB7XG4gICAgICAgIGNvbnN0IHJlbGF0aW9uT2ZMZW5ndGggPSBNYXRoLnJvdW5kKCgobG9hZGVkICsgMSkgLyB0b3RhbCkgKiAxMDApO1xuICAgICAgICBjb25zdCBwZXJjZW50ID0gXCJbXCIgKyByZWxhdGlvbk9mTGVuZ3RoLnRvU3RyaW5nKCkucGFkU3RhcnQoMywgXCIgXCIpICsgXCIlXSBcIjtcbiAgICAgICAgbG9nZ2VyLm5vdGljZShwZXJjZW50ICsgaXRlci5tZXNzYWdlKTtcbiAgICAgIH1cbiAgICAgIGF3YWl0IGl0ZXIuZG9Xb3JrKCk7XG4gICAgICBsb2FkZWQrKztcbiAgICB9XG4gIH0pO1xuXG4gIGxldCBmaW5pc2hSZXNvbHZlOiAoKSA9PiB2b2lkO1xuICBjb25zdCByZXN1bHQgPSBuZXcgUHJvbWlzZTx2b2lkPigocmVzb2x2ZSkgPT4ge1xuICAgIGZpbmlzaFJlc29sdmUgPSByZXNvbHZlO1xuICB9KTtcblxuICBzZXJ2ZXIuYWRkRXZlbnRMaXN0ZW5lcihcImJ1aWxkXCIsIChldmVudCkgPT4gZmluaXNoUmVzb2x2ZSgpKTtcblxuICBzZXJ2ZXIuc3RhcnQoKTtcblxuICByZXR1cm4gcmVzdWx0O1xufVxuIiwiLypcbiAqIE1JVCBMaWNlbnNlXG4gKlxuICogQ29weXJpZ2h0IChjKSAyMDI1ICBZdXJpaSBZYWt1YmluICh5dXJpaS55YWt1YmluQGdtYWlsLmNvbSlcbiAqXG4gKiBQZXJtaXNzaW9uIGlzIGdyYW50ZWQgdG8gdXNlLCBjb3B5LCBtb2RpZnksIGFuZCBkaXN0cmlidXRlIHRoaXMgc29mdHdhcmVcbiAqIHVuZGVyIHRoZSBNSVQgTGljZW5zZS4gU2VlIExJQ0VOU0UgZmlsZSBmb3IgZGV0YWlscy5cbiAqL1xuXG5pbXBvcnQgeyBDTWFrZVByb2Nlc3MsIERFRkFVTFRfR0VORVJBVE9SIH0gZnJvbSBcIkAvY21ha2VcIjtcbmltcG9ydCB7IGdldFBhdGhTdHJpbmcgfSAgZnJvbSBcIkAvdXRpbHMvRmlsZVN5c3RlbVwiO1xuaW1wb3J0IHsgU2V0dGluZ3NTdG9yYWdlIH0gZnJvbSBcIkAvdXRpbHMvU2V0dGluZ3NTdG9yYWdlXCI7XG5cbmV4cG9ydCBkZWZhdWx0IGFzeW5jIGZ1bmN0aW9uKGNvbmZpZzogYW55LCBlbnZpcm9ubWVudDogYW55LCBzZXR0aW5nczogU2V0dGluZ3NTdG9yYWdlKSB7XG4gIGNvbnN0IHNvdXJjZURpciA9IGdldFBhdGhTdHJpbmcoY29uZmlnLnNvdXJjZURpcik7XG4gIGNvbnN0IGJpbmFyeURpciA9IGdldFBhdGhTdHJpbmcoY29uZmlnLmJpbmFyeURpcik7XG4gIGNvbnN0IGNtYWtlQXJncyA9IHtcbiAgICBlbnZpcm9ubWVudDoge1xuICAgICAgLi4uZW52aXJvbm1lbnQsXG4gICAgICBERVNURElSOiBjb25maWcuZGVzdERpcixcbiAgICB9LFxuICAgIGdlbmVyYXRvcjogY29uZmlnLmdlbmVyYXRvciB8fCBERUZBVUxUX0dFTkVSQVRPUixcbiAgICBjYWNoZVZhcmlhYmxlczogY29uZmlnLmNhY2hlVmFyaWFibGVzLFxuICAgIHNvdXJjZURpcixcbiAgICBiaW5hcnlEaXIsXG4gIH07XG5cbiAgaWYgKCFjbWFrZUFyZ3MuY2FjaGVWYXJpYWJsZXMuQ01BS0VfQlVJTERfVFlQRSkge1xuICAgIGNtYWtlQXJncy5jYWNoZVZhcmlhYmxlcy5DTUFLRV9CVUlMRF9UWVBFID0gY29uZmlnLmJ1aWxkVHlwZTtcbiAgfVxuXG4gIGNvbnN0IGNtYWtlID0gQ01ha2VQcm9jZXNzLmdldEluc3RhbmNlKCk7XG4gIGF3YWl0IGNtYWtlLmNvbmZpZ3VyZShjbWFrZUFyZ3MpO1xuICBhd2FpdCBjbWFrZS5idWlsZChjbWFrZUFyZ3MpO1xuICBhd2FpdCBjbWFrZS5pbnN0YWxsKGNtYWtlQXJncyk7XG59XG4iLCIvKlxuICogTUlUIExpY2Vuc2VcbiAqXG4gKiBDb3B5cmlnaHQgKGMpIDIwMjUgIFl1cmlpIFlha3ViaW4gKHl1cmlpLnlha3ViaW5AZ21haWwuY29tKVxuICpcbiAqIFBlcm1pc3Npb24gaXMgZ3JhbnRlZCB0byB1c2UsIGNvcHksIG1vZGlmeSwgYW5kIGRpc3RyaWJ1dGUgdGhpcyBzb2Z0d2FyZVxuICogdW5kZXIgdGhlIE1JVCBMaWNlbnNlLiBTZWUgTElDRU5TRSBmaWxlIGZvciBkZXRhaWxzLlxuICovXG5cbmltcG9ydCBwYXRoIGZyb20gXCJub2RlOnBhdGhcIjtcblxuaW1wb3J0IHsgZW5zdXJlQm9vbGVhbiB9IGZyb20gXCJAL3V0aWxzL1N0cmljdFR5cGVcIjtcbmltcG9ydCB7IGdldFBhdGhTdHJpbmcgfSBmcm9tIFwiQC91dGlscy9GaWxlU3lzdGVtXCI7XG5pbXBvcnQgeyBTZXR0aW5nc1N0b3JhZ2UgfSBmcm9tIFwiQC91dGlscy9TZXR0aW5nc1N0b3JhZ2VcIjtcbmltcG9ydCB7IHNwYXduQXN5bmMgfSBmcm9tIFwiQC91dGlscy9DaGlsZFByb2Nlc3NcIjtcblxuZXhwb3J0IGRlZmF1bHQgYXN5bmMgZnVuY3Rpb24oY29uZmlnOiBhbnksIGVudmlyb25tZW50OiBhbnksIHNldHRpbmdzOiBTZXR0aW5nc1N0b3JhZ2UpIHtcbiAgY29uc3Qgc291cmNlRGlyID0gZ2V0UGF0aFN0cmluZyhjb25maWcuc291cmNlRGlyKTtcbiAgY29uc3QgYmluYXJ5RGlyID0gZ2V0UGF0aFN0cmluZyhjb25maWcuYmluYXJ5RGlyKTtcbiAgbGV0IHN0ZXAgPSBhd2FpdCBzZXR0aW5ncy5nZXQoXCJjb25maWd1cmVcIikgfHwgXCJjb25maWdcIjtcbiAgaWYgKHN0ZXAgPT09IFwiY29uZmlnXCIpIHtcbiAgICBjb25zdCBjb21tYW5kID0gcGF0aC5yZXNvbHZlKHNvdXJjZURpciwgXCJjb25maWd1cmVcIik7XG4gICAgY29uc3QgcGFyYW1zID0gW107XG4gICAgaWYgKEFycmF5LmlzQXJyYXkoY29uZmlnLnZhcmlhYmxlcykpIHtcbiAgICAgIGZvciAoY29uc3QgaXRlciBvZiBjb25maWcudmFyaWFibGVzKVxuICAgICAgICBwYXJhbXMucHVzaChpdGVyKTtcbiAgICB9XG4gICAgZWxzZSBpZiAoY29uZmlnLnZhcmlhYmxlcykge1xuICAgICAgZm9yIChjb25zdCBba2V5LHZhbF0gb2YgT2JqZWN0LmVudHJpZXMoY29uZmlnLnZhcmlhYmxlcykpIHtcbiAgICAgICAgaWYgKGtleSA9PT0gXCJmZWF0dXJlc1wiICYmIEFycmF5LmlzQXJyYXkodmFsKSkge1xuICAgICAgICAgIGZvciAoY29uc3QgaXRlciBvZiB2YWwpXG4gICAgICAgICAgICBwYXJhbXMucHVzaChgLS0ke2l0ZXJ9YCk7XG4gICAgICAgIH1cbiAgICAgICAgZWxzZSBpZiAodmFsID09PSBudWxsKVxuICAgICAgICAgIHBhcmFtcy5wdXNoKGAtLSR7a2V5fWApO1xuICAgICAgICBlbHNlXG4gICAgICAgICAgcGFyYW1zLnB1c2goYC0tJHtrZXl9PSR7dmFsfWApO1xuICAgICAgfVxuICAgIH1cbiAgICBpZiAoY29uZmlnLmZlYXR1cmVzKSB7XG4gICAgICBmb3IgKGNvbnN0IGtleSBvZiBjb25maWcuZmVhdHVyZXMpXG4gICAgICAgIHBhcmFtcy5wdXNoKGAtLSR7a2V5fWApO1xuICAgIH1cbiAgICBjb25zdCByZXMxID0gYXdhaXQgc3Bhd25Bc3luYyhjb21tYW5kLCBwYXJhbXMsIHtcbiAgICAgIGN3ZDogYmluYXJ5RGlyLFxuICAgICAgZW52OiBlbnZpcm9ubWVudCxcbiAgICAgIGV4dHJhOiB7XG4gICAgICAgIG91dHB1dDogYGFjLWNvbmZpZ3VyZS0ke3N0ZXB9LmxvZ2AsXG4gICAgICB9LFxuICAgIH0pO1xuICAgIGlmIChyZXMxLnN0YXR1cyAhPT0gMCkge1xuICAgICAgdGhyb3cgbmV3IEVycm9yKGBjb25maWd1cmUgcmV0dXJuZWQgc3RhdHVzICR7cmVzMS5zdGF0dXN9YCk7XG4gICAgfVxuICAgIHN0ZXAgPSBcIm1ha2VcIjtcbiAgICBhd2FpdCBzZXR0aW5ncy5zZXQoXCJjb25maWd1cmVcIiwgc3RlcCk7XG4gIH1cbiAgaWYgKHN0ZXAgPT09IFwibWFrZVwiKSB7XG4gICAgbGV0IHJ1bk1ha2UgPSBmYWxzZTtcbiAgICBpZiAoT2JqZWN0Lmhhc093bihjb25maWcsIFwicnVuTWFrZVwiKSlcbiAgICAgIHJ1bk1ha2UgPSBlbnN1cmVCb29sZWFuKGNvbmZpZy5ydW5NYWtlKTtcbiAgICBpZiAocnVuTWFrZSkge1xuICAgICAgY29uc3QgcmVzMiA9IGF3YWl0IHNwYXduQXN5bmMoXCJtYWtlXCIsIFtdLCB7XG4gICAgICAgIGN3ZDogYmluYXJ5RGlyLFxuICAgICAgICBlbnY6IGVudmlyb25tZW50LFxuICAgICAgICBleHRyYToge1xuICAgICAgICAgIG91dHB1dDogYGFjLWNvbmZpZ3VyZS0ke3N0ZXB9LmxvZ2AsXG4gICAgICAgIH0sXG4gICAgICB9KTtcbiAgICAgIGlmIChyZXMyLnN0YXR1cyAhPT0gMCkge1xuICAgICAgICB0aHJvdyBuZXcgRXJyb3IoYG1ha2UgcmV0dXJuZWQgc3RhdHVzICR7cmVzMi5zdGF0dXN9YCk7XG4gICAgICB9XG4gICAgfVxuICAgIHN0ZXAgPSBcImluc3RhbGxcIjtcbiAgICBhd2FpdCBzZXR0aW5ncy5zZXQoXCJjb25maWd1cmVcIiwgc3RlcCk7XG4gIH1cbiAgaWYgKHN0ZXAgPT09IFwiaW5zdGFsbFwiKSB7XG4gICAgbGV0IHJ1bk1ha2VJbnN0YWxsID0gdHJ1ZTtcbiAgICBpZiAoT2JqZWN0Lmhhc093bihjb25maWcsIFwicnVuTWFrZUluc3RhbGxcIikpXG4gICAgICBydW5NYWtlSW5zdGFsbCA9IGVuc3VyZUJvb2xlYW4oY29uZmlnLnJ1bk1ha2VJbnN0YWxsKTtcbiAgICBpZiAocnVuTWFrZUluc3RhbGwpIHtcbiAgICAgIGNvbnN0IGFyZ3MgPSBbIFwiaW5zdGFsbFwiIF07XG4gICAgICBpZiAoY29uZmlnLmRlc3REaXIpIHtcbiAgICAgICAgYXJncy5wdXNoKGBERVNURElSPSR7Y29uZmlnLmRlc3REaXJ9YCk7XG4gICAgICB9XG4gICAgICBjb25zdCByZXMyID0gYXdhaXQgc3Bhd25Bc3luYyhcIm1ha2VcIiwgYXJncywge1xuICAgICAgICBjd2Q6IGJpbmFyeURpcixcbiAgICAgICAgZW52OiBlbnZpcm9ubWVudCxcbiAgICAgICAgZXh0cmE6IHtcbiAgICAgICAgICBvdXRwdXQ6IGBhYy1jb25maWd1cmUtJHtzdGVwfS5sb2dgLFxuICAgICAgICB9LFxuICAgICAgfSk7XG4gICAgICBpZiAocmVzMi5zdGF0dXMgIT09IDApIHtcbiAgICAgICAgdGhyb3cgbmV3IEVycm9yKGBtYWtlIHJldHVybmVkIHN0YXR1cyAke3JlczIuc3RhdHVzfWApO1xuICAgICAgfVxuICAgIH1cbiAgICBzdGVwID0gXCJkb25lXCI7XG4gICAgYXdhaXQgc2V0dGluZ3Muc2V0KFwiY29uZmlndXJlXCIsIHN0ZXApO1xuICB9XG59XG4iLCIvKlxuICogTUlUIExpY2Vuc2VcbiAqXG4gKiBDb3B5cmlnaHQgKGMpIDIwMjUgIFl1cmlpIFlha3ViaW4gKHl1cmlpLnlha3ViaW5AZ21haWwuY29tKVxuICpcbiAqIFBlcm1pc3Npb24gaXMgZ3JhbnRlZCB0byB1c2UsIGNvcHksIG1vZGlmeSwgYW5kIGRpc3RyaWJ1dGUgdGhpcyBzb2Z0d2FyZVxuICogdW5kZXIgdGhlIE1JVCBMaWNlbnNlLiBTZWUgTElDRU5TRSBmaWxlIGZvciBkZXRhaWxzLlxuICovXG5cbmltcG9ydCB7IFNldHRpbmdzU3RvcmFnZSB9IGZyb20gXCJAL3V0aWxzL1NldHRpbmdzU3RvcmFnZVwiO1xuXG5pbXBvcnQgbm9uZSBmcm9tIFwiQC9hY3Rpb25zL25vbmVcIjtcbmltcG9ydCBwcm9jZXNzIGZyb20gXCJAL2FjdGlvbnMvcHJvY2Vzc1wiO1xuaW1wb3J0IGNvbmZpZ3VyZSBmcm9tIFwiQC9hY3Rpb25zL2NvbmZpZ3VyZVwiO1xuaW1wb3J0IG1ha2UgZnJvbSBcIkAvYWN0aW9ucy9tYWtlXCI7XG5pbXBvcnQgY21ha2UgZnJvbSBcIkAvYWN0aW9ucy9jbWFrZVwiO1xuaW1wb3J0IGJpdG1ha2UgZnJvbSBcIkAvYWN0aW9ucy9iaXRtYWtlXCI7XG5cbmludGVyZmFjZSBBY3Rpb25IYW5kbGVycyB7XG4gIFtuYW1lOiBzdHJpbmddOiAoY29uZmlnOiBhbnksIGVudmlyb25tZW50OiBhbnksIHNldHRpbmdzOiBTZXR0aW5nc1N0b3JhZ2UpID0+IFByb21pc2U8dm9pZD47XG59XG5cbmV4cG9ydCBkZWZhdWx0IDxBY3Rpb25IYW5kbGVycz4ge1xuICBub25lLFxuICBwcm9jZXNzLFxuICBjb25maWd1cmUsXG4gIG1ha2UsXG4gIGNtYWtlLFxuICBiaXRtYWtlLFxufTtcbiIsIi8qXG4gKiBNSVQgTGljZW5zZVxuICpcbiAqIENvcHlyaWdodCAoYykgMjAyNSAgWXVyaWkgWWFrdWJpbiAoeXVyaWkueWFrdWJpbkBnbWFpbC5jb20pXG4gKlxuICogUGVybWlzc2lvbiBpcyBncmFudGVkIHRvIHVzZSwgY29weSwgbW9kaWZ5LCBhbmQgZGlzdHJpYnV0ZSB0aGlzIHNvZnR3YXJlXG4gKiB1bmRlciB0aGUgTUlUIExpY2Vuc2UuIFNlZSBMSUNFTlNFIGZpbGUgZm9yIGRldGFpbHMuXG4gKi9cblxuaW1wb3J0IHsgc3Bhd25Bc3luYyB9IGZyb20gXCJAL3V0aWxzL0NoaWxkUHJvY2Vzc1wiO1xuaW1wb3J0IHsgZ2V0UGF0aFN0cmluZyB9ICBmcm9tIFwiQC91dGlscy9GaWxlU3lzdGVtXCI7XG5pbXBvcnQgeyBTZXR0aW5nc1N0b3JhZ2UgfSBmcm9tIFwiQC91dGlscy9TZXR0aW5nc1N0b3JhZ2VcIjtcblxuZXhwb3J0IGRlZmF1bHQgYXN5bmMgZnVuY3Rpb24oY29uZmlnOiBhbnksIGVudmlyb25tZW50OiBhbnksIHNldHRpbmdzOiBTZXR0aW5nc1N0b3JhZ2UpIHtcbiAgY29uc3QgYmluYXJ5RGlyID0gZ2V0UGF0aFN0cmluZyhjb25maWcuYmluYXJ5RGlyKTtcbiAgY29uc3QgYXJncyA9IGNvbmZpZy5hcmdzIHx8IFtdO1xuICBpZiAoY29uZmlnLmRlc3REaXIpIHtcbiAgICBhcmdzLnB1c2goYERFU1RESVI9JHtjb25maWcuZGVzdERpcn1gKTtcbiAgfVxuICBjb25zdCByZXMyID0gYXdhaXQgc3Bhd25Bc3luYyhcIm1ha2VcIiwgYXJncywge1xuICAgIGN3ZDogYmluYXJ5RGlyLFxuICAgIGVudjogZW52aXJvbm1lbnQsXG4gICAgZXh0cmE6IHtcbiAgICAgIG91dHB1dDogYG1ha2UubG9nYCxcbiAgICB9LFxuICB9KTtcbiAgaWYgKHJlczIuc3RhdHVzICE9PSAwKSB7XG4gICAgdGhyb3cgbmV3IEVycm9yKGBtYWtlIHJldHVybmVkIHN0YXR1cyAke3JlczIuc3RhdHVzfWApO1xuICB9XG59XG4iLCIvKlxuICogTUlUIExpY2Vuc2VcbiAqXG4gKiBDb3B5cmlnaHQgKGMpIDIwMjUgIFl1cmlpIFlha3ViaW4gKHl1cmlpLnlha3ViaW5AZ21haWwuY29tKVxuICpcbiAqIFBlcm1pc3Npb24gaXMgZ3JhbnRlZCB0byB1c2UsIGNvcHksIG1vZGlmeSwgYW5kIGRpc3RyaWJ1dGUgdGhpcyBzb2Z0d2FyZVxuICogdW5kZXIgdGhlIE1JVCBMaWNlbnNlLiBTZWUgTElDRU5TRSBmaWxlIGZvciBkZXRhaWxzLlxuICovXG5cblxuaW1wb3J0IHsgU2V0dGluZ3NTdG9yYWdlIH0gZnJvbSBcIkAvdXRpbHMvU2V0dGluZ3NTdG9yYWdlXCI7XG5pbXBvcnQgeyBMb2dnZXIgfSBmcm9tIFwiQC9sb2dnZXJcIjtcblxuY29uc3QgbG9nZ2VyID0gTG9nZ2VyLmNyZWF0ZShpbXBvcnQubWV0YS51cmwpO1xuXG5leHBvcnQgZGVmYXVsdCBhc3luYyBmdW5jdGlvbihjb25maWc6IGFueSwgZW52aXJvbm1lbnQ6IGFueSwgc2V0dGluZ3M6IFNldHRpbmdzU3RvcmFnZSkge1xuICAvKiBkbyBub3RoaW5nICovXG59XG4iLCIvKlxuICogTUlUIExpY2Vuc2VcbiAqXG4gKiBDb3B5cmlnaHQgKGMpIDIwMjUgIFl1cmlpIFlha3ViaW4gKHl1cmlpLnlha3ViaW5AZ21haWwuY29tKVxuICpcbiAqIFBlcm1pc3Npb24gaXMgZ3JhbnRlZCB0byB1c2UsIGNvcHksIG1vZGlmeSwgYW5kIGRpc3RyaWJ1dGUgdGhpcyBzb2Z0d2FyZVxuICogdW5kZXIgdGhlIE1JVCBMaWNlbnNlLiBTZWUgTElDRU5TRSBmaWxlIGZvciBkZXRhaWxzLlxuICovXG5cblxuaW1wb3J0IHBhdGggZnJvbSBcIm5vZGU6cGF0aFwiO1xuXG5pbXBvcnQgeyBnZXRQYXRoU3RyaW5nIH0gZnJvbSBcIkAvdXRpbHMvRmlsZVN5c3RlbVwiO1xuaW1wb3J0IHsgU2V0dGluZ3NTdG9yYWdlIH0gZnJvbSBcIkAvdXRpbHMvU2V0dGluZ3NTdG9yYWdlXCI7XG5pbXBvcnQgeyBzcGF3bkFzeW5jIH0gZnJvbSBcIkAvdXRpbHMvQ2hpbGRQcm9jZXNzXCI7XG5pbXBvcnQgeyBMb2dnZXIgfSBmcm9tIFwiQC9sb2dnZXJcIjtcblxuY29uc3QgbG9nZ2VyID0gTG9nZ2VyLmNyZWF0ZShpbXBvcnQubWV0YS51cmwpO1xuXG5leHBvcnQgZGVmYXVsdCBhc3luYyBmdW5jdGlvbihjb25maWc6IGFueSwgZW52aXJvbm1lbnQ6IGFueSwgc2V0dGluZ3M6IFNldHRpbmdzU3RvcmFnZSkge1xuICBpZiAoIWNvbmZpZy5jb21tYW5kKVxuICAgIHRocm93IG5ldyBFcnJvcihcIlJlcXVpcmVkIGNvbW1hbmQgZmllbGQgZm9yIHByb2Nlc3MgYWN0aW9uXCIpO1xuICBjb25zdCBzb3VyY2VEaXIgPSBnZXRQYXRoU3RyaW5nKGNvbmZpZy5zb3VyY2VEaXIpO1xuICBjb25zdCBiaW5hcnlEaXIgPSBnZXRQYXRoU3RyaW5nKGNvbmZpZy5iaW5hcnlEaXIpO1xuICBsZXQgeyBjb21tYW5kIH0gPSBjb25maWc7XG4gIGlmICghcGF0aC5pc0Fic29sdXRlKGNvbW1hbmQpICYmIChjb21tYW5kLmluY2x1ZGVzKHBhdGgucG9zaXguZGVsaW1pdGVyKSB8fCBjb21tYW5kLmluY2x1ZGVzKHBhdGgud2luMzIuZGVsaW1pdGVyKSkpIHtcbiAgICBjb21tYW5kID0gcGF0aC5yZXNvbHZlKHNvdXJjZURpciwgY29tbWFuZCk7XG4gIH1cbiAgY29uc3QgcmVzID0gYXdhaXQgc3Bhd25Bc3luYyhjb21tYW5kLCBjb25maWcuYXJncyB8fCBbXSwge1xuICAgIGN3ZDogYmluYXJ5RGlyLFxuICAgIGVudjogZW52aXJvbm1lbnQsXG4gICAgZXh0cmE6IHtcbiAgICAgIG91dHB1dDogYHByb2Nlc3MubG9nYCxcbiAgICB9LFxuICB9KTtcbiAgaWYgKHJlcy5zdGF0dXMgIT09IDApIHtcbiAgICB0aHJvdyBuZXcgRXJyb3IoYHByb2Nlc3MgcmV0dXJuZWQgc3RhdHVzICR7cmVzLnN0YXR1c31gKTtcbiAgfVxufVxuIiwiLypcbiAqIE1JVCBMaWNlbnNlXG4gKlxuICogQ29weXJpZ2h0IChjKSAyMDI1ICBZdXJpaSBZYWt1YmluICh5dXJpaS55YWt1YmluQGdtYWlsLmNvbSlcbiAqXG4gKiBQZXJtaXNzaW9uIGlzIGdyYW50ZWQgdG8gdXNlLCBjb3B5LCBtb2RpZnksIGFuZCBkaXN0cmlidXRlIHRoaXMgc29mdHdhcmVcbiAqIHVuZGVyIHRoZSBNSVQgTGljZW5zZS4gU2VlIExJQ0VOU0UgZmlsZSBmb3IgZGV0YWlscy5cbiAqL1xuXG5leHBvcnQgZW51bSBCb29sZWFuVHlwZSB7XG4gIE9OID0gXCJPTlwiLFxuICBPRkYgPSBcIk9GRlwiLFxufTtcblxuLy8gRW51bSByZXByZXNlbnRpbmcgdmFsdWUgdHlwZXMgdXNlZCBpbiBDTWFrZSBjYWNoZSB2YXJpYWJsZXNcbmV4cG9ydCBlbnVtIFZhbHVlVHlwZSB7XG4gIC8vIFJlcHJlc2VudHMgYSBmdWxsIHBhdGggdG8gYSBmaWxlXG4gIEZJTEVQQVRIID0gXCJGSUxFUEFUSFwiLFxuXG4gIC8vIFJlcHJlc2VudHMgYSBwYXRoIHRvIGEgZGlyZWN0b3J5XG4gIFBBVEggPSBcIlBBVEhcIixcblxuICAvLyBSZXByZXNlbnRzIGEgYm9vbGVhbiB2YWx1ZSAodHJ1ZS9mYWxzZSlcbiAgQk9PTCA9IFwiQk9PTFwiLFxuXG4gIC8vIFJlcHJlc2VudHMgYSBnZW5lcmljIHN0cmluZyB2YWx1ZVxuICBTVFJJTkcgPSBcIlNUUklOR1wiLFxufTtcblxuLy8gQnVpbGRUeXBlIHJlcHJlc2VudGluZyBjb21tb24gQ01ha2UgYnVpbGQgdHlwZXNcbmV4cG9ydCBlbnVtIEJ1aWxkVHlwZSB7XG4gIC8vIERlYnVnIGJ1aWxkIHR5cGU6IGluY2x1ZGVzIGRlYnVnIHN5bWJvbHMsIG5vIG9wdGltaXphdGlvblxuICBEZWJ1ZyA9IFwiRGVidWdcIixcblxuICAvLyBSZWxlYXNlIGJ1aWxkIHR5cGU6IG9wdGltaXplZCBjb2RlLCBubyBkZWJ1ZyBpbmZvXG4gIFJlbGVhc2UgPSBcIlJlbGVhc2VcIixcblxuICAvLyBSZWxlYXNlIHdpdGggZGVidWcgaW5mbzogb3B0aW1pemVkIHdpdGggZGVidWcgc3ltYm9scyBpbmNsdWRlZFxuICBSZWxXaXRoRGViSW5mbyA9IFwiUmVsV2l0aERlYkluZm9cIixcblxuICAvLyBNaW5pbXVtIHNpemUgcmVsZWFzZTogb3B0aW1pemVkIGZvciBzbWFsbGVzdCBiaW5hcnkgc2l6ZVxuICBNaW5TaXplUmVsID0gXCJNaW5TaXplUmVsXCIsXG59O1xuXG4vLyBUaGUgZGVmYXVsdCBuYW1lIG9mIHRoZSBtYWluIENNYWtlIGJ1aWxkIGNvbmZpZ3VyYXRpb24gZmlsZVxuZXhwb3J0IGNvbnN0IENNQUtFX0xJU1RTX1RYVCA9IFwiQ01ha2VMaXN0cy50eHRcIjtcblxuZXhwb3J0IGVudW0gR2VuZXJhdG9yVHlwZSB7XG4gIC8vIE5hbWUgb2YgdGhlIENNYWtlIGdlbmVyYXRvciBmb3Igc3RhbmRhcmQgVW5peCAnbWFrZScgYnVpbGQgc3lzdGVtXG4gIFVuaXhNYWtlZmlsZXMgPSBcIlVuaXggTWFrZWZpbGVzXCIsXG59O1xuXG4vLyBOYW1lIG9mIHRoZSBDTWFrZSBnZW5lcmF0b3IgZm9yIHN0YW5kYXJkIFVuaXggJ21ha2UnIGJ1aWxkIHN5c3RlbVxuZXhwb3J0IGNvbnN0IERFRkFVTFRfR0VORVJBVE9SOiBHZW5lcmF0b3JUeXBlID0gR2VuZXJhdG9yVHlwZS5Vbml4TWFrZWZpbGVzO1xuIiwiLypcbiAqIE1JVCBMaWNlbnNlXG4gKlxuICogQ29weXJpZ2h0IChjKSAyMDI1ICBZdXJpaSBZYWt1YmluICh5dXJpaS55YWt1YmluQGdtYWlsLmNvbSlcbiAqXG4gKiBQZXJtaXNzaW9uIGlzIGdyYW50ZWQgdG8gdXNlLCBjb3B5LCBtb2RpZnksIGFuZCBkaXN0cmlidXRlIHRoaXMgc29mdHdhcmVcbiAqIHVuZGVyIHRoZSBNSVQgTGljZW5zZS4gU2VlIExJQ0VOU0UgZmlsZSBmb3IgZGV0YWlscy5cbiAqL1xuXG5pbXBvcnQgeyBCb29sZWFuVHlwZSB9IGZyb20gXCJAL2NtYWtlL0NvbnN0YW50c1wiO1xuXG5leHBvcnQgZnVuY3Rpb24gY29udmVydFRvVmFsdWUob2JqOiBhbnkpOiBzdHJpbmcge1xuICBpZiAoQXJyYXkuaXNBcnJheShvYmopKVxuICAgIHJldHVybiBvYmoubWFwKGkgPT4gY29udmVydFRvVmFsdWUoaSkpLmpvaW4oXCI7XCIpO1xuXG4gIGlmICh0eXBlb2Ygb2JqID09PSBcImJvb2xlYW5cIilcbiAgICByZXR1cm4gb2JqID8gQm9vbGVhblR5cGUuT04gOiBCb29sZWFuVHlwZS5PRkY7XG5cbiAgcmV0dXJuIG9iai50b1N0cmluZygpO1xufVxuIiwiLypcbiAqIE1JVCBMaWNlbnNlXG4gKlxuICogQ29weXJpZ2h0IChjKSAyMDI1ICBZdXJpaSBZYWt1YmluICh5dXJpaS55YWt1YmluQGdtYWlsLmNvbSlcbiAqXG4gKiBQZXJtaXNzaW9uIGlzIGdyYW50ZWQgdG8gdXNlLCBjb3B5LCBtb2RpZnksIGFuZCBkaXN0cmlidXRlIHRoaXMgc29mdHdhcmVcbiAqIHVuZGVyIHRoZSBNSVQgTGljZW5zZS4gU2VlIExJQ0VOU0UgZmlsZSBmb3IgZGV0YWlscy5cbiAqL1xuXG5pbXBvcnQgb3MgZnJvbSBcIm5vZGU6b3NcIjtcbmltcG9ydCBmcyBmcm9tIFwibm9kZTpmc1wiO1xuaW1wb3J0IHBhdGggZnJvbSBcIm5vZGU6cGF0aFwiO1xuXG5pbXBvcnQgeyBzcGF3bkFzeW5jIH0gZnJvbSBcIkAvdXRpbHMvQ2hpbGRQcm9jZXNzXCI7XG5pbXBvcnQgeyBDTUFLRV9MSVNUU19UWFQsIERFRkFVTFRfR0VORVJBVE9SLCBWYWx1ZVR5cGUgfSBmcm9tIFwiQC9jbWFrZS9Db25zdGFudHNcIjtcbmltcG9ydCB7IGNvbnZlcnRUb1ZhbHVlIH0gZnJvbSBcIkAvY21ha2UvSGVscGVyXCI7XG5pbXBvcnQgeyBIb3N0IH0gZnJvbSBcIkAvdXRpbHMvSG9zdFwiO1xuXG5mdW5jdGlvbiB0b1ZhclR5cGUoa2V5OiBzdHJpbmcsIHZhbDogYW55KSB7XG4gIGNvbnN0IG1hcDogYW55ID0ge1xuICAgIENNQUtFX0lOU1RBTExfUFJFRklYOiBWYWx1ZVR5cGUuUEFUSCxcbiAgICBDTUFLRV9UT09MQ0hBSU5fRklMRTogVmFsdWVUeXBlLkZJTEVQQVRILFxuICB9O1xuXG4gIGlmICh0eXBlb2YgdmFsID09PSBcImJvb2xlYW5cIilcbiAgICByZXR1cm4gVmFsdWVUeXBlLkJPT0w7XG5cbiAgaWYgKG1hcC5oYXNPd25Qcm9wZXJ0eShrZXkpKVxuICAgIHJldHVybiBtYXBba2V5XTtcblxuICByZXR1cm4gVmFsdWVUeXBlLlNUUklORztcbn1cblxuZnVuY3Rpb24gbWFrZUNtZFZhcmlhYmxlKGtleTogc3RyaW5nLCB2YWw6IGFueSwgaXNDYWNoZTogYm9vbGVhbikge1xuICBsZXQgbmFtZSA9IGtleTtcbiAgaWYgKGlzQ2FjaGUpXG4gICAgbmFtZSArPSBcIjpcIiArIHRvVmFyVHlwZShrZXksIHZhbCk7XG4gIHJldHVybiBuYW1lICsgXCI9XCIgKyBjb252ZXJ0VG9WYWx1ZSh2YWwpO1xufVxuXG5mdW5jdGlvbiBtYWtlQ21kVmFyaWFibGVzKHZhcmlhYmxlczogb2JqZWN0LCBpc0NhY2hlOiBib29sZWFuKTogc3RyaW5nW10ge1xuICBjb25zdCByZXN1bHQ6IHN0cmluZ1tdID0gW107XG4gIGZvciAoY29uc3QgW2tleSwgdmFsXSBvZiBPYmplY3QuZW50cmllcyh2YXJpYWJsZXMpKVxuICAgIHJlc3VsdC5wdXNoKFwiLURcIiwgbWFrZUNtZFZhcmlhYmxlKGtleSwgdmFsLCBpc0NhY2hlKSk7XG4gIHJldHVybiByZXN1bHQ7XG59XG5cbmV4cG9ydCBpbnRlcmZhY2UgU2NyaXB0TW9kZU9wdGlvbnMge1xuICBlbnZpcm9ubWVudD86IG9iamVjdDtcbiAgd29ya0Rpcj86IHN0cmluZztcbn07XG5cbmV4cG9ydCBjbGFzcyBDTWFrZVByb2Nlc3Mge1xuICBwcml2YXRlIF9jbWFrZVBhdGg6IHN0cmluZztcblxuICBwdWJsaWMgY29uc3RydWN0b3IoY21ha2VQYXRoOiBzdHJpbmcpIHtcbiAgICB0aGlzLl9jbWFrZVBhdGggPSBjbWFrZVBhdGg7XG4gIH1cblxuICBwdWJsaWMgYXN5bmMgc2NyaXB0TW9kZShzY3JpcHRGaWxlOiBzdHJpbmcsIHZhcmlhYmxlczogb2JqZWN0LCBvcHRpb25zPzogU2NyaXB0TW9kZU9wdGlvbnMpOiBQcm9taXNlPHZvaWQ+IHtcbiAgICBjb25zdCBzcGF3bkFyZ3MgPSBbXG4gICAgICAuLi5tYWtlQ21kVmFyaWFibGVzKHZhcmlhYmxlcywgZmFsc2UpLFxuICAgICAgXCItUFwiLCBzY3JpcHRGaWxlLFxuICAgIF07XG4gICAgY29uc3QgcmVzOiBhbnkgPSBhd2FpdCBzcGF3bkFzeW5jKHRoaXMuX2NtYWtlUGF0aCwgc3Bhd25BcmdzLCB7XG4gICAgICBjd2Q6IG9wdGlvbnM/LndvcmtEaXIsXG4gICAgICBlbnY6IG9wdGlvbnM/LmVudmlyb25tZW50IHx8IHByb2Nlc3MuZW52LFxuICAgIH0pO1xuICAgIGlmIChyZXMuc3RhdHVzICE9PSAwKSB7XG4gICAgICB0aHJvdyBgY21ha2Uuc2NyaXB0TW9kZSByZXR1cm5lZCBzdGF0dXMgJHtyZXMuc3RhdHVzfWA7XG4gICAgfVxuICB9XG5cbiAgcHVibGljIGFzeW5jIGNvbmZpZ3VyZShhcmdzOiBhbnkpOiBQcm9taXNlPHZvaWQ+IHtcbiAgICBjb25zdCBzcGF3bkFyZ3MgPSBbXG4gICAgICBcIi1HXCIsIGFyZ3MuZ2VuZXJhdG9yLFxuICAgICAgLi4ubWFrZUNtZFZhcmlhYmxlcyhhcmdzLmNhY2hlVmFyaWFibGVzLCB0cnVlKSxcbiAgICAgIFwiLVNcIiwgYXJncy5zb3VyY2VEaXIsXG4gICAgICBcIi1CXCIsIGFyZ3MuYmluYXJ5RGlyLFxuICAgIF07XG4gIFxuICAgIGNvbnN0IHJlczogYW55ID0gYXdhaXQgc3Bhd25Bc3luYyh0aGlzLl9jbWFrZVBhdGgsIHNwYXduQXJncywge1xuICAgICAgY3dkOiBhcmdzLmJpbmFyeURpcixcbiAgICAgIGVudjogYXJncy5lbnZpcm9ubWVudCB8fCBwcm9jZXNzLmVudixcbiAgICAgIGV4dHJhOiB7XG4gICAgICAgIG91dHB1dDogYGNtYWtlLmNvbmZpZ3VyZS5sb2dgLFxuICAgICAgfSxcbiAgICB9KTtcbiAgICBpZiAocmVzLnN0YXR1cyAhPT0gMCkge1xuICAgICAgdGhyb3cgYENNYWtlLmNvbmZpZ3VyZSByZXR1cm5lZCBzdGF0dXMgJHtyZXMuc3RhdHVzfWA7XG4gICAgfVxuICB9XG5cbiAgcHVibGljIGFzeW5jIGJ1aWxkKGFyZ3M6IGFueSk6IFByb21pc2U8dm9pZD4ge1xuICAgIGF3YWl0IHRoaXMuY29uZmlndXJlKGFyZ3MpO1xuICBcbiAgICBjb25zdCBzcGF3bkFyZ3M6IHN0cmluZ1tdID0gW1xuICAgICAgJy0tYnVpbGQnLCAnLicsXG4gICAgICAnLS1wYXJhbGxlbCcsIG9zLmF2YWlsYWJsZVBhcmFsbGVsaXNtKCkudG9TdHJpbmcoKSxcbiAgICBdO1xuICAgIGNvbnN0IHJlczogYW55ID0gYXdhaXQgc3Bhd25Bc3luYyh0aGlzLl9jbWFrZVBhdGgsIHNwYXduQXJncywge1xuICAgICAgY3dkOiBhcmdzLmJpbmFyeURpcixcbiAgICAgIGVudjogYXJncy5lbnZpcm9ubWVudCB8fCBwcm9jZXNzLmVudixcbiAgICAgIGV4dHJhOiB7XG4gICAgICAgIG91dHB1dDogYGNtYWtlLmJ1aWxkLmxvZ2AsXG4gICAgICB9LFxuICAgIH0pO1xuICAgIGlmIChyZXMuc3RhdHVzICE9PSAwKSB7XG4gICAgICB0aHJvdyBgQ01ha2UuYnVpbGQgcmV0dXJuZWQgc3RhdHVzICR7cmVzLnN0YXR1c31gO1xuICAgIH1cbiAgfVxuXG4gIHB1YmxpYyBhc3luYyBpbnN0YWxsKGFyZ3M6IGFueSk6IFByb21pc2U8dm9pZD4ge1xuICAgIGF3YWl0IHRoaXMuY29uZmlndXJlKGFyZ3MpO1xuXG4gICAgY29uc3Qgc3Bhd25BcmdzID0gW1xuICAgICAgJy0taW5zdGFsbCcsXG4gICAgICAnLicsXG4gICAgXTtcbiAgICBpZiAoYXJncy5pbnN0YWxsRGlyKSB7XG4gICAgICBzcGF3bkFyZ3MucHVzaCgnLS1wcmVmaXgnLCBhcmdzLmluc3RhbGxEaXIpO1xuICAgIH1cbiAgICBjb25zdCByZXM6IGFueSA9IGF3YWl0IHNwYXduQXN5bmModGhpcy5fY21ha2VQYXRoLCBzcGF3bkFyZ3MsIHtcbiAgICAgIGN3ZDogYXJncy5iaW5hcnlEaXIsXG4gICAgICBlbnY6IGFyZ3MuZW52aXJvbm1lbnQgfHwgcHJvY2Vzcy5lbnYsXG4gICAgICBleHRyYToge1xuICAgICAgICBvdXRwdXQ6IGBjbWFrZS5pbnN0YWxsLmxvZ2AsXG4gICAgICB9LFxuICAgIH0pO1xuICAgIGlmIChyZXMuc3RhdHVzICE9PSAwKSB7XG4gICAgICB0aHJvdyBgQ01ha2UuaW5zdGFsbCByZXR1cm5lZCBzdGF0dXMgJHtyZXMuc3RhdHVzfWA7XG4gICAgfVxuICB9XG4gIFxuICBwdWJsaWMgYXN5bmMgZXh0cmFjdChhcmdzOiBhbnkpOiBQcm9taXNlPHZvaWQ+IHtcbiAgICBjb25zdCBzcGF3bkFyZ3MgPSBbIFwiLUVcIiwgXCJ0YXJcIiwgXCIteHZmXCIsIGFyZ3MuZmlsZW5hbWUgXTtcbiAgICBjb25zdCByZXM6IGFueSA9IGF3YWl0IHNwYXduQXN5bmModGhpcy5fY21ha2VQYXRoLCBzcGF3bkFyZ3MsIHtcbiAgICAgIGN3ZDogYXJncy53b3JrRGlyIHx8IGFyZ3Muc291cmNlRGlyIHx8IGFyZ3MuYmluYXJ5RGlyLFxuICAgICAgZW52OiBhcmdzLmVudmlyb25tZW50IHx8IHByb2Nlc3MuZW52LFxuICAgICAgZXh0cmE6IHtcbiAgICAgICAgb3V0cHV0OiBhcmdzLmxvZ0ZpbGUgfHwgYGNtYWtlLmV4dHJhY3QubG9nYCxcbiAgICAgIH0sXG4gICAgfSk7XG4gICAgaWYgKHJlcy5zdGF0dXMgIT09IDApIHtcbiAgICAgIHRocm93IGBFeHRyYWN0IHJldHVybmVkIHN0YXR1cyAke3Jlcy5zdGF0dXN9YDtcbiAgICB9XG4gIH1cbn07XG5cbmxldCBfY21ha2VJbnN0YW5jZTogQ01ha2VQcm9jZXNzO1xuZXhwb3J0IG5hbWVzcGFjZSBDTWFrZVByb2Nlc3Mge1xuICBleHBvcnQgZnVuY3Rpb24gZ2V0SW5zdGFuY2UoKTogQ01ha2VQcm9jZXNzIHtcbiAgICBpZiAoIV9jbWFrZUluc3RhbmNlKVxuICAgICAgX2NtYWtlSW5zdGFuY2UgPSBuZXcgQ01ha2VQcm9jZXNzKFwiY21ha2VcIiArIEhvc3QuZXhlY3V0YWJsZVN1ZmZpeCk7XG4gICAgcmV0dXJuIF9jbWFrZUluc3RhbmNlO1xuICB9XG59XG5cbmV4cG9ydCBjbGFzcyBDVGVzdFByb2Nlc3Mge1xuICBwcml2YXRlIF9jdGVzdFBhdGg6IHN0cmluZztcblxuICBwdWJsaWMgY29uc3RydWN0b3IoY3Rlc3RQYXRoOiBzdHJpbmcpIHtcbiAgICB0aGlzLl9jdGVzdFBhdGggPSBjdGVzdFBhdGg7XG4gIH1cblxuICBwdWJsaWMgYXN5bmMgY3Rlc3QoYXJnczogYW55KTogUHJvbWlzZTx2b2lkPiB7XG4gICAgY29uc3Qgc3Bhd25BcmdzOiBzdHJpbmdbXSA9IFtdO1xuICAgIGNvbnN0IHJlczogYW55ID0gYXdhaXQgc3Bhd25Bc3luYyh0aGlzLl9jdGVzdFBhdGgsIHNwYXduQXJncywge1xuICAgICAgY3dkOiBhcmdzLmJpbmFyeURpcixcbiAgICAgIGVudjogYXJncy5lbnZpcm9ubWVudCB8fCBwcm9jZXNzLmVudixcbiAgICAgIGV4dHJhOiB7XG4gICAgICAgIG91dHB1dDogYGNtYWtlLmN0ZXN0LmxvZ2AsXG4gICAgICB9LFxuICAgIH0pO1xuICAgIGlmIChyZXMuc3RhdHVzICE9PSAwKSB7XG4gICAgICB0aHJvdyBgQ1Rlc3QgcmV0dXJuZWQgc3RhdHVzICR7cmVzLnN0YXR1c31gO1xuICAgIH1cbiAgfVxufTtcblxubGV0IF9jdGVzdEluc3RhbmNlOiBDVGVzdFByb2Nlc3M7XG5leHBvcnQgbmFtZXNwYWNlIENUZXN0UHJvY2VzcyB7XG4gIGV4cG9ydCBmdW5jdGlvbiBnZXRJbnN0YW5jZSgpOiBDVGVzdFByb2Nlc3Mge1xuICAgIGlmICghX2N0ZXN0SW5zdGFuY2UpXG4gICAgICBfY3Rlc3RJbnN0YW5jZSA9IG5ldyBDVGVzdFByb2Nlc3MoXCJjdGVzdFwiICsgSG9zdC5leGVjdXRhYmxlU3VmZml4KTtcbiAgICByZXR1cm4gX2N0ZXN0SW5zdGFuY2U7XG4gIH1cbn1cblxuZXhwb3J0IGFzeW5jIGZ1bmN0aW9uIGdldFByb2plY3RJbmZvKHNvdXJjZTogc3RyaW5nKSB7XG4gIGNvbnN0IHN0YXQgPSBhd2FpdCBmcy5wcm9taXNlcy5zdGF0KHNvdXJjZSk7XG4gIGlmIChzdGF0LmlzRGlyZWN0b3J5KCkpXG4gICAgc291cmNlID0gcGF0aC5yZXNvbHZlKHNvdXJjZSwgQ01BS0VfTElTVFNfVFhUKTtcbiAgY29uc3QgY29udGVudCA9IGF3YWl0IGZzLnByb21pc2VzLnJlYWRGaWxlKHNvdXJjZSwgeyBlbmNvZGluZzogJ3V0ZjgnIH0pO1xuXG4gIGNvbnN0IHByb2plY3RQYXR0ZXJuID0gL3Byb2plY3QgKlxcKCAqKFteIF0rKSAqKFteKV0qKVxcKS87XG4gIGNvbnN0IHZlcnNpb25QYXR0ZXJuID0gL1ZFUlNJT04gKyhbXiBdKykvO1xuXG4gIGNvbnN0IHJlc3VsdDogYW55ID0ge307XG4gIGxldCBtYXRjaCA9IGNvbnRlbnQubWF0Y2gocHJvamVjdFBhdHRlcm4pO1xuICBpZiAobWF0Y2gpIHtcbiAgICByZXN1bHQubmFtZSA9IG1hdGNoWzFdO1xuICAgIGNvbnN0IHByb2plY3RDb250ZW50ID0gbWF0Y2hbMl07XG4gICAgbWF0Y2ggPSBwcm9qZWN0Q29udGVudC5tYXRjaCh2ZXJzaW9uUGF0dGVybik7XG4gICAgaWYgKG1hdGNoKVxuICAgICAgcmVzdWx0LnZlcnNpb24gPSBtYXRjaFsxXTtcbiAgfVxuXG4gIHJldHVybiByZXN1bHQ7XG59XG5cbmV4cG9ydCBmdW5jdGlvbiBsaW5lVG9TaW5nbENvbW1lbnQobGluZTogc3RyaW5nKSB7XG4gIHJldHVybiBcIiMgXCIgKyBsaW5lO1xufVxuXG5leHBvcnQgZnVuY3Rpb24gbGluZVRvTXVsdGlwbGVDb21tZW50KGxpbmU6IHN0cmluZykge1xuICByZXR1cm4gYCNbPT09WyAke2xpbmV9IF09PT1dYDtcbn1cblxuZXhwb3J0IGZ1bmN0aW9uIGdlbmVyYXRlZFNjcmlwdE5hbWVDb21tZW50KGZpbGVuYW1lOiBzdHJpbmcpIHtcbiAgcmV0dXJuIGxpbmVUb1NpbmdsQ29tbWVudChcIkdlbmVyYXRlZCBmcm9tIFwiICsgcGF0aC5iYXNlbmFtZShmaWxlbmFtZSkpO1xufVxuXG5leHBvcnQgeyBERUZBVUxUX0dFTkVSQVRPUiB9O1xuIiwiLypcbiAqIE1JVCBMaWNlbnNlXG4gKlxuICogQ29weXJpZ2h0IChjKSAyMDI1ICBZdXJpaSBZYWt1YmluICh5dXJpaS55YWt1YmluQGdtYWlsLmNvbSlcbiAqXG4gKiBQZXJtaXNzaW9uIGlzIGdyYW50ZWQgdG8gdXNlLCBjb3B5LCBtb2RpZnksIGFuZCBkaXN0cmlidXRlIHRoaXMgc29mdHdhcmVcbiAqIHVuZGVyIHRoZSBNSVQgTGljZW5zZS4gU2VlIExJQ0VOU0UgZmlsZSBmb3IgZGV0YWlscy5cbiAqL1xuXG5pbXBvcnQgZnMgZnJvbSBcIm5vZGU6ZnNcIjtcbmltcG9ydCB1cmwgZnJvbSBcIm5vZGU6dXJsXCI7XG5cbmltcG9ydCB7IENNYWtlUHJvY2VzcyB9IGZyb20gXCJAL2NtYWtlXCI7XG5pbXBvcnQgeyBQYXRoIH0gZnJvbSBcIkAvdXRpbHMvUGF0aFwiO1xuaW1wb3J0IHsgbWFrZVBhdGNoIH0gZnJvbSBcIkAvdXRpbHMvTWFrZVBhdGNoXCI7XG5pbXBvcnQgeyBzYXZlSWZEaWZmZXJlbnQsIGRpcmVjdG9yeUV4aXN0cyB9IGZyb20gXCJAL3V0aWxzL0ZpbGVTeXN0ZW1cIjtcbmltcG9ydCB7IFNldHRpbmdzU3RvcmFnZSB9IGZyb20gXCJAL3V0aWxzL1NldHRpbmdzU3RvcmFnZVwiO1xuaW1wb3J0IHsgYXJyYXlXcmFwcGVyLCBhc3NpZ25PYmplY3QgfSBmcm9tIFwiQC91dGlscy9QcmltaXRpdmVzXCI7XG5pbXBvcnQgeyBVU0VSX0NPTkZJRywgQlVJTERfU0VUVElOR1NfRklMRSwgUkVRVUVTVF9BVFRFTVBUUyB9IGZyb20gXCJAL0NvbnN0YW50c1wiO1xuaW1wb3J0IHsgREVCVUdfQlVJTERfVFlQRSwgUkVMRUFTRV9CVUlMRF9UWVBFIH0gZnJvbSBcIkAvY29yZS9UeXBlc1wiO1xuaW1wb3J0IHsgSU1QT1JUX1NDSEVNRSB9IGZyb20gXCJAL3V0aWxzL1VybFNjaGVtZVwiO1xuaW1wb3J0IHsgcmVxdWlyZVJlc29sdmUgfSBmcm9tIFwiQC91dGlscy9Nb2R1bGVcIjtcbmltcG9ydCB7IGRvd25sb2FkRmlsZSB9IGZyb20gXCJAL3V0aWxzL0h0dHBSZXF1ZXN0XCI7XG5pbXBvcnQgeyBDb21tYW5kT3B0aW9ucyB9IGZyb20gXCJAL2NvcmUvQ29tbWFuZE9wdGlvbnNcIjtcbmltcG9ydCB7IExvZ2dlciB9IGZyb20gXCJAL2xvZ2dlclwiO1xuaW1wb3J0IHsgZmlsZUV4aXN0cyB9IGZyb20gXCJAL3V0aWxzL0ZpbGVTeXN0ZW1cIjtcbmltcG9ydCB7IGltcG9ydE1vZHVsZSB9IGZyb20gXCJAL3V0aWxzL01vZHVsZVwiO1xuXG5pbXBvcnQgYWN0aW9ucyBmcm9tIFwiQC9hY3Rpb25zXCI7XG5cbmNvbnN0IGxvZ2dlciA9IExvZ2dlci5jcmVhdGUoaW1wb3J0Lm1ldGEudXJsKTtcblxuaW50ZXJmYWNlIElHZW5lcmFsQ29uZmlnIHtcbiAgd29ya0Rpcjogc3RyaW5nO1xuICBidWlsZFR5cGU6IHN0cmluZztcbn07XG5cbmZ1bmN0aW9uIG1lcmdlRW52aXJvbm1lbnQoLi4uYXJnczogYW55KSB7XG4gIGNvbnN0IGVudmlyb25tZW50OiBhbnkgPSB7fTtcbiAgZm9yIChjb25zdCBlbnYgb2YgYXJncykge1xuICAgIGNvbnN0IGxpc3Q6IGFueSA9IE9iamVjdC5lbnRyaWVzKGVudiB8fCB7fSk7XG4gICAgd2hpbGUgKGxpc3QubGVuZ3RoKSB7XG4gICAgICBsZXQgW2tleSx2YWxdID0gbGlzdC5wb3AoKTtcbiAgICAgIGxldCBkZWxpbWl0ZXI7XG4gICAgICBsZXQgam9pbkFmdGVyID0gdHJ1ZTtcbiAgICAgIHN3aXRjaCAoa2V5KSB7XG4gICAgICBjYXNlIFwiUGF0aFwiOlxuICAgICAgY2FzZSBcIlBBVEhcIjpcbiAgICAgICAgZGVsaW1pdGVyID0gUGF0aC5kZWxpbWl0ZXI7XG4gICAgICAgIGpvaW5BZnRlciA9IGZhbHNlO1xuICAgICAgICBicmVhaztcbiAgICAgIGNhc2UgXCJDRkxBR1NcIjpcbiAgICAgIGNhc2UgXCJDWFhGTEFHU1wiOlxuICAgICAgY2FzZSBcIkxERkxBR1NcIjpcbiAgICAgICAgZGVsaW1pdGVyID0gXCIgXCI7XG4gICAgICAgIGJyZWFrO1xuICAgICAgfVxuICAgICAgaWYgKHR5cGVvZiB2YWwgPT09ICdudW1iZXInKVxuICAgICAgICB2YWwgPSB2YWwudG9TdHJpbmcoKTtcbiAgICAgIGVsc2UgaWYgKEFycmF5LmlzQXJyYXkodmFsKSlcbiAgICAgICAgdmFsID0gdmFsLmpvaW4oZGVsaW1pdGVyKTtcbiAgICAgIGlmICghZGVsaW1pdGVyIHx8ICFlbnZpcm9ubWVudFtrZXldKVxuICAgICAgICBlbnZpcm9ubWVudFtrZXldID0gdmFsO1xuICAgICAgZWxzZSBpZiAoam9pbkFmdGVyKVxuICAgICAgICBlbnZpcm9ubWVudFtrZXldID0gdmFsICsgZGVsaW1pdGVyICsgZW52aXJvbm1lbnRba2V5XTtcbiAgICAgIGVsc2VcbiAgICAgICAgZW52aXJvbm1lbnRba2V5XSA9IGVudmlyb25tZW50W2tleV0gKyBkZWxpbWl0ZXIgKyB2YWw7XG4gICAgfVxuICB9XG4gIHJldHVybiBlbnZpcm9ubWVudDtcbn1cblxuZnVuY3Rpb24gcmViYXNlQ29uZmlnKGNvbmZpZzogYW55KSB7XG4gIGNvbnN0IGJhc2VDb25maWc6IGFueSA9IHt9O1xuICBjb25zdCBvdGhlckNvbmZpZzogYW55ID0ge307XG5cbiAgZm9yIChjb25zdCBba2V5LCBlbnRyeV0gb2YgT2JqZWN0LmVudHJpZXMoY29uZmlnKSBhcyBhbnkpIHtcbiAgICAoZW50cnkuYmFzZSA/IG90aGVyQ29uZmlnIDogYmFzZUNvbmZpZylba2V5XSA9IGVudHJ5O1xuICB9XG5cbiAgd2hpbGUgKHRydWUpIHtcbiAgICBjb25zdCBrZXlzID0gT2JqZWN0LmtleXMob3RoZXJDb25maWcpO1xuICAgIGlmIChrZXlzLmxlbmd0aCA9PSAwKVxuICAgICAgYnJlYWs7XG4gICAgY29uc3QgZG9uZUtleXMgPSBbXTtcbiAgICBmb3IgKGNvbnN0IGtleSBvZiBrZXlzKSB7XG4gICAgICBjb25zdCBvdGhlckl0ZXIgPSBvdGhlckNvbmZpZ1trZXldO1xuICAgICAgY29uc3QgYmFzZUxpc3QgPSBbXTtcbiAgICAgIGZvciAoY29uc3QgaXRlciBvZiBhcnJheVdyYXBwZXIob3RoZXJJdGVyLmJhc2UpKSB7XG4gICAgICAgIGNvbnN0IGJhc2VFbnRyeSA9IGJhc2VDb25maWdbaXRlcl07XG4gICAgICAgIGlmICghYmFzZUVudHJ5KSB7XG4gICAgICAgICAgYmFzZUxpc3QubGVuZ3RoID0gMDtcbiAgICAgICAgICBicmVhaztcbiAgICAgICAgfVxuICAgICAgICBiYXNlTGlzdC5wdXNoKGJhc2VFbnRyeSk7XG4gICAgICB9XG4gICAgICBpZiAoYmFzZUxpc3QubGVuZ3RoKSB7XG4gICAgICAgIGJhc2VMaXN0LnB1c2gob3RoZXJJdGVyKTtcbiAgICAgICAgbGV0IG5ld0VudHJ5ID0ge307XG4gICAgICAgIGZvciAoY29uc3QgaXRlciBvZiBiYXNlTGlzdCkge1xuICAgICAgICAgIGFzc2lnbk9iamVjdChuZXdFbnRyeSwgaXRlcik7XG4gICAgICAgIH1cbiAgICAgICAgYmFzZUNvbmZpZ1trZXldID0gbmV3RW50cnk7XG4gICAgICAgIGRvbmVLZXlzLnB1c2goa2V5KTtcbiAgICAgIH1cbiAgICB9XG4gICAgaWYgKGRvbmVLZXlzLmxlbmd0aCA9PSAwKSB7XG4gICAgICBmb3IgKGNvbnN0IGtleSBvZiBrZXlzKVxuICAgICAgICB0aHJvdyBgQ2FuJ3Qgc2V0IGJhc2UgY29uZmlnIGZvciBcIiR7a2V5fWA7XG4gICAgfVxuICAgIGZvciAoY29uc3Qga2V5IG9mIGRvbmVLZXlzKSB7XG4gICAgICBkZWxldGUgYmFzZUNvbmZpZ1trZXldLmJhc2U7XG4gICAgICBkZWxldGUgb3RoZXJDb25maWdba2V5XTtcbiAgICB9XG4gIH1cblxuICByZXR1cm4gYmFzZUNvbmZpZztcbn1cblxuZnVuY3Rpb24gcmVzb2x2ZVN0cmluZ1dpdGhWYXJpYWJsZShjb25maWc6IGFueSwgZW50cnlDb25maWc6IGFueSwgcm9vdENvbmZpZzogYW55LCB2YWw6IGFueSkge1xuICByZXR1cm4gdmFsLnJlcGxhY2UoL1xcJFxceyhbXn1dKylcXH0vZywgKG1hdGNoOiBhbnksIHZhbHVlOiBhbnkpID0+IHtcbiAgICBsZXQgc2VsO1xuICAgIGZvciAoY29uc3QgbmFtZSBvZiB2YWx1ZS5zcGxpdChcIi5cIikpIHtcbiAgICAgIGlmIChzZWwgPT09IHVuZGVmaW5lZCkge1xuICAgICAgICBpZiAoY29uZmlnLmhhc093blByb3BlcnR5KG5hbWUpKVxuICAgICAgICAgIHNlbCA9IGNvbmZpZ1tuYW1lXTtcbiAgICAgICAgZWxzZSBpZiAoY29uZmlnICE9PSBlbnRyeUNvbmZpZyAmJiBlbnRyeUNvbmZpZy5oYXNPd25Qcm9wZXJ0eShuYW1lKSlcbiAgICAgICAgICBzZWwgPSBlbnRyeUNvbmZpZ1tuYW1lXTtcbiAgICAgICAgZWxzZSBpZiAoY29uZmlnICE9PSByb290Q29uZmlnICYmIHJvb3RDb25maWcuaGFzT3duUHJvcGVydHkobmFtZSkpXG4gICAgICAgICAgc2VsID0gcm9vdENvbmZpZ1tuYW1lXTtcbiAgICAgICAgZWxzZSB7XG4gICAgICAgICAgdHJ5IHtcbiAgICAgICAgICAgIGNvbnN0IG1haW5GaWxlID0gcmVxdWlyZVJlc29sdmUobmFtZSk7XG4gICAgICAgICAgICBpZiAobWFpbkZpbGUpIHtcbiAgICAgICAgICAgICAgc2VsID0geyBtYWluRmlsZSwgbWFpbkRpcjogUGF0aC5kaXJuYW1lKG1haW5GaWxlKSwgfTtcbiAgICAgICAgICAgIH1cbiAgICAgICAgIH0gY2F0Y2goZSkge31cbiAgICAgICAgfVxuICAgICAgICBpZiAoc2VsID09PSB1bmRlZmluZWQpXG4gICAgICAgICAgYnJlYWs7XG4gICAgICB9XG4gICAgICBlbHNlIGlmIChzZWwuaGFzT3duUHJvcGVydHkobmFtZSkpIHtcbiAgICAgICAgc2VsID0gc2VsW25hbWVdO1xuICAgICAgfVxuICAgICAgZWxzZSB7XG4gICAgICAgIHNlbCA9IHVuZGVmaW5lZDtcbiAgICAgICAgYnJlYWs7XG4gICAgICB9XG4gICAgfVxuICAgIGlmIChzZWwgPT09IHVuZGVmaW5lZClcbiAgICAgIHRocm93IG5ldyBFcnJvcihgVGhlICR7dmFsdWV9IHZhcmlhYmxlIGRvZXMgbm90IGV4aXN0XCJgKTtcbiAgICByZXR1cm4gc2VsO1xuICB9KTtcbn1cblxuZnVuY3Rpb24gcmVzb2x2ZUNvbmZpZ1N0cmluZ3NJbXBsKGNvbmZpZzogYW55LCBlbnRyeUNvbmZpZzogYW55LCByb290Q29uZmlnOiBhbnkpIHtcbiAgbGV0IGNvdW50ID0gMDtcbiAgZm9yIChjb25zdCBba2V5LCB2YWxdIG9mIE9iamVjdC5lbnRyaWVzKGNvbmZpZykpIHtcbiAgICBpZiAodmFsICYmIHR5cGVvZiB2YWwgPT09IFwib2JqZWN0XCIpXG4gICAgICBjb3VudCArPSByZXNvbHZlQ29uZmlnU3RyaW5nc0ltcGwodmFsLCBlbnRyeUNvbmZpZywgcm9vdENvbmZpZyk7XG4gICAgZWxzZSBpZiAodHlwZW9mIHZhbCA9PT0gXCJzdHJpbmdcIikge1xuICAgICAgY29uc3QgdiA9IHJlc29sdmVTdHJpbmdXaXRoVmFyaWFibGUoY29uZmlnLCBlbnRyeUNvbmZpZywgcm9vdENvbmZpZywgdmFsKTtcbiAgICAgIGlmICh2YWwgIT09IHYpIHtcbiAgICAgICAgY29uZmlnW2tleV0gPSB2O1xuICAgICAgICBjb3VudCsrO1xuICAgICAgfVxuICAgIH1cbiAgfVxuICByZXR1cm4gY291bnQ7XG59XG5cbmZ1bmN0aW9uIHJlc29sdmVDb25maWdTdHJpbmdzKGNvbmZpZzogYW55KSB7XG4gIGZvciAoOzspIHtcbiAgICBsZXQgY291bnQgPSAwO1xuICAgIGZvciAoY29uc3QgW2tleSwgdmFsXSBvZiBPYmplY3QuZW50cmllcyhjb25maWcpKSB7XG4gICAgICBpZiAodmFsICYmIHR5cGVvZiB2YWwgPT09IFwib2JqZWN0XCIpXG4gICAgICAgIGNvdW50ICs9IHJlc29sdmVDb25maWdTdHJpbmdzSW1wbCh2YWwsIHZhbCwgY29uZmlnKTtcbiAgICAgIGVsc2UgIGlmICh0eXBlb2YgdmFsID09PSBcInN0cmluZ1wiKSB7XG4gICAgICAgIGNvbnN0IHYgPSByZXNvbHZlU3RyaW5nV2l0aFZhcmlhYmxlKGNvbmZpZywgY29uZmlnLCBjb25maWcsIHZhbCk7XG4gICAgICAgIGlmICh2YWwgIT09IHYpIHtcbiAgICAgICAgICBjb25maWdba2V5XSA9IHY7XG4gICAgICAgICAgY291bnQrKztcbiAgICAgICAgfVxuICAgICAgfVxuICAgIH1cbiAgICBpZiAoIWNvdW50KVxuICAgICAgYnJlYWs7XG4gIH1cbn1cblxuZnVuY3Rpb24gbWFrZUJ1aWxkQ29uZmlnKGdjb25maWc6IElHZW5lcmFsQ29uZmlnLCBjb25maWc6IGFueSkge1xuICBpZiAoY29uZmlnW1wic291cmNlUm9vdFwiXSkge1xuICAgIHRocm93IG5ldyBFcnJvcihgVmFyaWFibGUgXCJzb3VyY2VSb290XCIgY2Fubm90IGJlIGNoYW5nZWQgdG8gXCIke2NvbmZpZy5zb3VyY2VSb290fVwiYCk7XG4gIH1cblxuICBjb25zdCByb290Q29uZmlnID0gcmViYXNlQ29uZmlnKGNvbmZpZyk7XG5cbiAgcm9vdENvbmZpZy5idWlsZFR5cGUgPSByb290Q29uZmlnLmJ1aWxkVHlwZSB8fCBnY29uZmlnLmJ1aWxkVHlwZTtcbiAgcm9vdENvbmZpZy5zb3VyY2VSb290ID0gcm9vdENvbmZpZy5zb3VyY2VSb290IHx8IGdjb25maWcud29ya0RpcjtcbiAgcm9vdENvbmZpZy5iaW5hcnlSb290ID0gcm9vdENvbmZpZy5iaW5hcnlSb290IHx8IFBhdGguam9pbihnY29uZmlnLndvcmtEaXIsIFwiYnVpbGRcIik7XG5cbiAgZm9yIChjb25zdCBba2V5LCBlbnRyeV0gb2YgT2JqZWN0LmVudHJpZXMocm9vdENvbmZpZykgYXMgYW55KSB7XG4gICAgaWYgKGVudHJ5ICYmIHR5cGVvZiBlbnRyeSA9PT0gXCJvYmplY3RcIiAmJiBlbnRyeS5hY3Rpb24pIHtcbiAgICAgIGVudHJ5LmJ1aWxkVHlwZSA9IGVudHJ5LmJ1aWxkVHlwZSB8fCByb290Q29uZmlnLmJ1aWxkVHlwZTtcbiAgICAgIGNvbnN0IGZvbGRlciA9IGtleS5yZXBsYWNlKFwiOlwiLCBQYXRoLnNlcCk7XG4gICAgICBjb25zdCB3b3JrRGlyID0gUGF0aC5qb2luKHJvb3RDb25maWcuYmluYXJ5Um9vdCwgZm9sZGVyKTtcbiAgICAgIGVudHJ5LnRlbXBEaXIgPSBlbnRyeS50ZW1wRGlyIHx8IFBhdGguam9pbih3b3JrRGlyLCBcInRtcFwiKTtcbiAgICAgIGlmIChlbnRyeS5zb3VyY2VVcmwpIHtcbiAgICAgICAgaWYgKGVudHJ5LnNvdXJjZVVybC5zdGFydHNXaXRoKElNUE9SVF9TQ0hFTUUpKSB7XG4gICAgICAgICAgY29uc3QgZmlsZW5hbWUgPSByZXF1aXJlUmVzb2x2ZShlbnRyeS5zb3VyY2VVcmwuc2xpY2UoSU1QT1JUX1NDSEVNRS5sZW5ndGgpKTtcbiAgICAgICAgICBlbnRyeS5zb3VyY2VEaXIgPSBQYXRoLmRpcm5hbWUoZmlsZW5hbWUpO1xuICAgICAgICB9XG4gICAgICAgIGVsc2Uge1xuICAgICAgICAgIGVudHJ5LmFyY2hpdmVEaXIgPSBlbnRyeS5hcmNoaXZlRGlyIHx8IFBhdGguam9pbih3b3JrRGlyLCBcImFyY1wiKTtcbiAgICAgICAgICBlbnRyeS5leHRyYWN0RGlyID0gZW50cnkuZXh0cmFjdERpciB8fCBQYXRoLmpvaW4od29ya0RpciwgXCJzcmNcIik7XG4gICAgICAgICAgaWYgKCFlbnRyeS5zb3VyY2VEaXIpXG4gICAgICAgICAgICBlbnRyeS5zb3VyY2VEaXIgPSBlbnRyeS5leHRyYWN0RGlyO1xuICAgICAgICAgIGVsc2UgaWYgKCFQYXRoLmlzQWJzb2x1dGUoZW50cnkuc291cmNlRGlyKSlcbiAgICAgICAgICAgIGVudHJ5LnNvdXJjZURpciA9IFBhdGguam9pbihlbnRyeS5leHRyYWN0RGlyLCBlbnRyeS5zb3VyY2VEaXIpO1xuICAgICAgICB9XG4gICAgICB9XG4gICAgICBlbHNlIGlmICghZW50cnkuc291cmNlRGlyKSB7XG4gICAgICAgIHRocm93IG5ldyBFcnJvcihgTWlzc2luZyBzb3VyY2VEaXIgZm9yICR7a2V5fSBhY3Rpb25cImApO1xuICAgICAgfVxuICAgICAgaWYgKGVudHJ5LmJpbmFyeURpciA9PT0gbnVsbClcbiAgICAgICAgZW50cnkuYmluYXJ5RGlyID0gZW50cnkuc291cmNlRGlyO1xuICAgICAgZWxzZSBpZiAoZW50cnkuYmluYXJ5RGlyID09PSB1bmRlZmluZWQpXG4gICAgICAgIGVudHJ5LmJpbmFyeURpciA9IFBhdGguam9pbih3b3JrRGlyLCBcImJpblwiKTtcbiAgICB9XG4gIH1cblxuICByZXNvbHZlQ29uZmlnU3RyaW5ncyhyb290Q29uZmlnKTtcblxuICByZXR1cm4gcm9vdENvbmZpZztcbn1cblxuYXN5bmMgZnVuY3Rpb24gZG9FeHRyYWN0QXJjaGl2ZShnY29uZmlnOiBJR2VuZXJhbENvbmZpZywgZW52aXJvbm1lbnQ6IGFueSwgY29uZmlnOiBhbnksIHNldHRpbmdzOiBhbnkpIHtcbiAgaWYgKCFjb25maWcuc291cmNlVXJsKVxuICAgIHRocm93IG5ldyBFcnJvcihcIlVua25vd24gc291cmNlVXJsXCIpO1xuICBpZiAoIWNvbmZpZy5hcmNoaXZlRGlyKVxuICAgIHRocm93IG5ldyBFcnJvcihcIlVua25vd24gYXJjaGl2ZURpclwiKTtcbiAgaWYgKCFjb25maWcuZXh0cmFjdERpcilcbiAgICB0aHJvdyBuZXcgRXJyb3IoXCJVbmtub3duIGV4dHJhY3REaXJcIik7XG5cbiAgaWYgKCFhd2FpdCBkaXJlY3RvcnlFeGlzdHMoY29uZmlnLmFyY2hpdmVEaXIpKSB7XG4gICAgbG9nZ2VyLm5vdGljZShgbWtkaXIgLXAgJHtjb25maWcuYXJjaGl2ZURpcn1gKTtcbiAgICBhd2FpdCBmcy5wcm9taXNlcy5ta2Rpcihjb25maWcuYXJjaGl2ZURpciwgeyByZWN1cnNpdmU6IHRydWUgfSk7XG4gIH1cblxuICBpZiAoIWF3YWl0IGRpcmVjdG9yeUV4aXN0cyhjb25maWcudGVtcERpcikpIHtcbiAgICBsb2dnZXIubm90aWNlKGBta2RpciAtcCAke2NvbmZpZy50ZW1wRGlyfWApO1xuICAgIGF3YWl0IGZzLnByb21pc2VzLm1rZGlyKGNvbmZpZy50ZW1wRGlyLCB7IHJlY3Vyc2l2ZTogdHJ1ZSB9KTtcbiAgfVxuXG4gIGNvbnN0IGFyY05hbWUgPSBQYXRoLmJhc2VuYW1lKGNvbmZpZy5zb3VyY2VVcmwpO1xuXG4gIGxldCBhcmNGaWxlO1xuICBsZXQgZG93bmxvYWRVcmxzID0gYXdhaXQgc2V0dGluZ3MuZ2V0KFwiZG93bmxvYWRVcmxzXCIpIHx8IHt9O1xuICBpZiAoZG93bmxvYWRVcmxzW2NvbmZpZy5zb3VyY2VVcmxdKVxuICAgIGFyY0ZpbGUgPSBkb3dubG9hZFVybHNbY29uZmlnLnNvdXJjZVVybF07XG4gIGVsc2Uge1xuICAgIGFyY0ZpbGUgPSBQYXRoLmpvaW4oY29uZmlnLmFyY2hpdmVEaXIsIGFyY05hbWUpO1xuICAgIGF3YWl0IGRvd25sb2FkRmlsZShjb25maWcuc291cmNlVXJsLCBhcmNGaWxlLCB7IGF0dGVtcHRzOiBSRVFVRVNUX0FUVEVNUFRTIH0pO1xuICAgIGRvd25sb2FkVXJsc1tjb25maWcuc291cmNlVXJsXSA9IGFyY0ZpbGU7XG4gICAgYXdhaXQgc2V0dGluZ3Muc2V0KFwiZG93bmxvYWRVcmxzXCIsIGRvd25sb2FkVXJscyk7XG4gIH1cblxuICBsZXQgZXh0cmFjdERpcjtcbiAgbGV0IGV4dHJhY3RGaWxlcyA9IGF3YWl0IHNldHRpbmdzLmdldChcImV4dHJhY3RGaWxlc1wiKSB8fCB7fTtcbiAgaWYgKGV4dHJhY3RGaWxlc1thcmNGaWxlXSkge1xuICAgIGV4dHJhY3REaXIgPSBleHRyYWN0RmlsZXNbYXJjRmlsZV07XG4gIH1cbiAgZWxzZSB7XG4gICAgZXh0cmFjdERpciA9IGF3YWl0IGZzLnByb21pc2VzLm1rZHRlbXAoUGF0aC5yZXNvbHZlKGNvbmZpZy50ZW1wRGlyLCBhcmNOYW1lICsgJy4nKSk7XG4gIFxuICAgIGF3YWl0IENNYWtlUHJvY2Vzcy5nZXRJbnN0YW5jZSgpLmV4dHJhY3Qoe1xuICAgICAgZW52aXJvbm1lbnQsXG4gICAgICBmaWxlbmFtZTogYXJjRmlsZSxcbiAgICAgIHdvcmtEaXI6IGV4dHJhY3REaXIsXG4gICAgICBsb2dGaWxlOiAgUGF0aC5qb2luKGNvbmZpZy50ZW1wRGlyLCBQYXRoLmJhc2VuYW1lKGV4dHJhY3REaXIpICsgXCIubG9nXCIpLFxuICAgIH0pO1xuICBcbiAgICBjb25zdCBleHRyYWN0TGlzdCA9IGF3YWl0IGZzLnByb21pc2VzLnJlYWRkaXIoZXh0cmFjdERpcik7XG4gICAgaWYgKGV4dHJhY3RMaXN0Lmxlbmd0aCA9PT0gMSkge1xuICAgICAgZXh0cmFjdERpciA9IFBhdGgucmVzb2x2ZShleHRyYWN0RGlyLCBleHRyYWN0TGlzdFswXSk7XG4gICAgICBpZiAoIWF3YWl0IGRpcmVjdG9yeUV4aXN0cyhleHRyYWN0RGlyKSkge1xuICAgICAgICBsb2dnZXIubm90aWNlKGBybSAtZnIgJHtleHRyYWN0RGlyfWApO1xuICAgICAgICBhd2FpdCBmcy5wcm9taXNlcy5ybShleHRyYWN0RGlyLCB7IHJlY3Vyc2l2ZTogdHJ1ZSB9KTtcbiAgICAgICAgdGhyb3cgbmV3IEVycm9yKGBTdXBwb3J0IG9ubHkgZGlyZWN0b3J5IGZvciBhcmNoaXZlYCk7XG4gICAgICB9XG4gICAgfVxuICBcbiAgICBpZiAoYXdhaXQgZGlyZWN0b3J5RXhpc3RzKGNvbmZpZy5leHRyYWN0RGlyKSkge1xuICAgICAgLy8gVE9ETzogTWFyZ2UgZXh0cmFjdERpciB3aXRoIG91dHB1dFxuICAgICAgbG9nZ2VyLm5vdGljZShgcm0gLWZyICR7Y29uZmlnLmV4dHJhY3REaXJ9YCk7XG4gICAgICBhd2FpdCBmcy5wcm9taXNlcy5ybShjb25maWcuZXh0cmFjdERpciwgeyByZWN1cnNpdmU6IHRydWUgfSk7XG4gICAgfVxuICAgIGVsc2Uge1xuICAgICAgY29uc3QgcGFyZW50RGlyID0gUGF0aC5kaXJuYW1lKGNvbmZpZy5leHRyYWN0RGlyKTtcbiAgICAgIGlmICghYXdhaXQgZGlyZWN0b3J5RXhpc3RzKHBhcmVudERpcikpIHtcbiAgICAgICAgbG9nZ2VyLm5vdGljZShgbWtkaXIgLXAgJHtwYXJlbnREaXJ9YCk7XG4gICAgICAgIGF3YWl0IGZzLnByb21pc2VzLm1rZGlyKHBhcmVudERpciwgeyByZWN1cnNpdmU6IHRydWUgfSk7IFxuICAgICAgfVxuICAgIH1cbiAgXG4gICAgbG9nZ2VyLm5vdGljZShgbXYgJHtleHRyYWN0RGlyfSAke2NvbmZpZy5leHRyYWN0RGlyfWApO1xuICAgIGF3YWl0IGZzLnByb21pc2VzLnJlbmFtZShleHRyYWN0RGlyLCBjb25maWcuZXh0cmFjdERpcik7XG4gIFxuICAgIGV4dHJhY3RGaWxlc1thcmNGaWxlXSA9IGV4dHJhY3REaXI7XG4gICAgYXdhaXQgc2V0dGluZ3Muc2V0KFwiZXh0cmFjdEZpbGVzXCIsIGV4dHJhY3RGaWxlcyk7XG4gIH1cblxuICBpZiAoY29uZmlnLnBhdGNoRGlyKSB7XG4gICAgbGV0IHBhdGNoRGlycyA9IGF3YWl0IHNldHRpbmdzLmdldChcInBhdGNoRGlyc1wiKSB8fCB7fTtcbiAgICBpZiAoIXBhdGNoRGlyc1tjb25maWcucGF0Y2hEaXJdKSB7XG4gICAgICBhd2FpdCBtYWtlUGF0Y2goY29uZmlnLnBhdGNoRGlyLCBjb25maWcuZXh0cmFjdERpcik7XG4gICAgICBwYXRjaERpcnNbY29uZmlnLnBhdGNoRGlyXSA9IGNvbmZpZy5leHRyYWN0RGlyO1xuICAgICAgYXdhaXQgc2V0dGluZ3Muc2V0KFwicGF0Y2hEaXJzXCIsIHBhdGNoRGlycyk7XG4gICAgfVxuICB9XG59XG5cbmFzeW5jIGZ1bmN0aW9uIGRvVGFyZ2V0QnVpbGQoZ2NvbmZpZzogSUdlbmVyYWxDb25maWcsIGVudmlyb25tZW50OiBhbnksIGNvbmZpZzogYW55LCBzZXR0aW5nczogU2V0dGluZ3NTdG9yYWdlKSB7XG4gIGlmIChjb25maWcucHJlQWN0aW9uKSB7XG4gICAgYXdhaXQgc2V0dGluZ3MucHVzaChcInByZUFjdGlvblwiKTtcbiAgICBjb25zdCBuZXdDb25maWc6IGFueSA9IHt9O1xuICAgIGFzc2lnbk9iamVjdChuZXdDb25maWcsIGNvbmZpZyk7XG4gICAgZGVsZXRlIG5ld0NvbmZpZy5hY3Rpb247XG4gICAgZGVsZXRlIG5ld0NvbmZpZy5wcmVBY3Rpb247XG4gICAgZGVsZXRlIG5ld0NvbmZpZy5wb3N0QWN0aW9uO1xuICAgIGFzc2lnbk9iamVjdChuZXdDb25maWcsIGNvbmZpZy5wcmVBY3Rpb24pO1xuICAgIGNvbnN0IG5ld0Vudmlyb25tZW50ID0gbWVyZ2VFbnZpcm9ubWVudChjb25maWcucHJlQWN0aW9uLmVudmlyb25tZW50LCBlbnZpcm9ubWVudCk7XG4gICAgYXdhaXQgZG9UYXJnZXRCdWlsZChnY29uZmlnLCBuZXdFbnZpcm9ubWVudCwgbmV3Q29uZmlnLCBzZXR0aW5ncyk7XG4gICAgYXdhaXQgc2V0dGluZ3MucG9wKCk7XG4gIH1cblxuICBpZiAoQXJyYXkuaXNBcnJheShjb25maWcuYWN0aW9uKSkge1xuICAgIGF3YWl0IHNldHRpbmdzLnB1c2goXCJhY3Rpb25cIik7XG4gICAgZm9yICh2YXIgaSA9IDA7IGkgPCBjb25maWcuYWN0aW9uLmxlbmd0aDsgKytpKSB7XG4gICAgICBhd2FpdCBzZXR0aW5ncy5wdXNoKGkudG9TdHJpbmcoKSk7XG4gICAgICBjb25zdCBuZXdDb25maWc6IGFueSA9IHt9O1xuICAgICAgYXNzaWduT2JqZWN0KG5ld0NvbmZpZywgY29uZmlnKTtcbiAgICAgIGRlbGV0ZSBuZXdDb25maWcuYWN0aW9uO1xuICAgICAgZGVsZXRlIG5ld0NvbmZpZy5wcmVBY3Rpb247XG4gICAgICBkZWxldGUgbmV3Q29uZmlnLnBvc3RBY3Rpb247XG4gICAgICBhc3NpZ25PYmplY3QobmV3Q29uZmlnLCBjb25maWcuYWN0aW9uW2ldKTtcbiAgICAgIGNvbnN0IG5ld0Vudmlyb25tZW50ID0gbWVyZ2VFbnZpcm9ubWVudChjb25maWcuYWN0aW9uW2ldLmVudmlyb25tZW50LCBlbnZpcm9ubWVudCk7XG4gICAgICBhd2FpdCBkb1RhcmdldEJ1aWxkKGdjb25maWcsIG5ld0Vudmlyb25tZW50LCBuZXdDb25maWcsIHNldHRpbmdzKTtcbiAgICAgIGF3YWl0IHNldHRpbmdzLnBvcCgpO1xuICAgIH1cbiAgICBhd2FpdCBzZXR0aW5ncy5wb3AoKTtcbiAgfVxuICBlbHNlIHtcbiAgICBpZiAoIWF3YWl0IGRpcmVjdG9yeUV4aXN0cyhjb25maWcuYmluYXJ5RGlyKSkge1xuICAgICAgYXdhaXQgZnMucHJvbWlzZXMubWtkaXIoY29uZmlnLmJpbmFyeURpciwgeyByZWN1cnNpdmU6IHRydWUgfSk7XG4gICAgfVxuICAgIGlmIChhY3Rpb25zW2NvbmZpZy5hY3Rpb25dKSB7XG4gICAgICBjb25maWcuZGVzY3JpcHRpb24gJiYgbG9nZ2VyLm5vdGljZShjb25maWcuZGVzY3JpcHRpb24pO1xuICAgICAgYXdhaXQgYWN0aW9uc1tjb25maWcuYWN0aW9uXShjb25maWcsIGVudmlyb25tZW50LCBzZXR0aW5ncyk7XG4gICAgfVxuICB9XG5cbiAgaWYgKGNvbmZpZy5wb3N0QWN0aW9uKSB7XG4gICAgYXdhaXQgc2V0dGluZ3MucHVzaChcInBvc3RBY3Rpb25cIik7XG4gICAgY29uc3QgbmV3Q29uZmlnOiBhbnkgPSB7fTtcbiAgICBhc3NpZ25PYmplY3QobmV3Q29uZmlnLCBjb25maWcpO1xuICAgIGRlbGV0ZSBuZXdDb25maWcuYWN0aW9uO1xuICAgIGRlbGV0ZSBuZXdDb25maWcucHJlQWN0aW9uO1xuICAgIGRlbGV0ZSBuZXdDb25maWcucG9zdEFjdGlvbjtcbiAgICBhc3NpZ25PYmplY3QobmV3Q29uZmlnLCBjb25maWcucG9zdEFjdGlvbik7XG4gICAgY29uc3QgbmV3RW52aXJvbm1lbnQgPSBtZXJnZUVudmlyb25tZW50KGNvbmZpZy5wb3N0QWN0aW9uLmVudmlyb25tZW50LCBlbnZpcm9ubWVudCk7XG4gICAgYXdhaXQgZG9UYXJnZXRCdWlsZChnY29uZmlnLCBuZXdFbnZpcm9ubWVudCwgbmV3Q29uZmlnLCBzZXR0aW5ncyk7XG4gICAgYXdhaXQgc2V0dGluZ3MucG9wKCk7XG4gIH1cbn1cblxuYXN5bmMgZnVuY3Rpb24gZ2V0VXNlckNvbmZpZyhvcHRpb25zOiBDb21tYW5kT3B0aW9ucykge1xuICBsZXQgY29uZmlnUGF0aDtcbiAgaWYgKG9wdGlvbnMuZW52LmNvbmZpZykge1xuICAgIGNvbmZpZ1BhdGggPSBQYXRoLmlzQWJzb2x1dGUob3B0aW9ucy5lbnYuY29uZmlnKSA/IG9wdGlvbnMuZW52LmNvbmZpZyA6IFBhdGgucmVzb2x2ZShvcHRpb25zLndvcmtEaXIsIG9wdGlvbnMuZW52LmNvbmZpZyk7XG4gICAgaWYgKCFhd2FpdCBmaWxlRXhpc3RzKGNvbmZpZ1BhdGgpKVxuICAgICAgdGhyb3cgYENvbmZpZ3VyYXRpb24gJyR7b3B0aW9ucy5lbnYuY29uZmlnfScgZmlsZSBkb2VzIG5vdCBleGlzdGA7XG4gIH1cbiAgZWxzZSB7XG4gICAgY29uc3QgdXNlckNvbmZpZ1BhdGggPSBQYXRoLnJlc29sdmUob3B0aW9ucy53b3JrRGlyLCBVU0VSX0NPTkZJRyk7XG4gICAgaWYgKGF3YWl0IGZpbGVFeGlzdHModXNlckNvbmZpZ1BhdGgpKVxuICAgICAgY29uZmlnUGF0aCA9IHVzZXJDb25maWdQYXRoO1xuICAgIGVsc2Uge1xuICAgICAgbG9nZ2VyLndhcm4oYENvbmZpZyBmaWxlICcke1VTRVJfQ09ORklHfScgaXMgbm90IGF2YWlsYWJsZWApO1xuICAgIH1cbiAgfVxuXG4gIGlmICghY29uZmlnUGF0aCkge1xuICAgIHJldHVybiB7XG4gICAgICBcImJ1bmRsZTpvdXRwdXRcIjoge1xuICAgICAgICBhY3Rpb246IFwiYml0bWFrZVwiLFxuICAgICAgICB2YXJpYWJsZXM6IHtcbiAgICAgICAgICBJTlNUQUxMX1BSRUZJWDogXCIvdXNyXCIsXG4gICAgICAgIH0sXG4gICAgICAgIHNvdXJjZURpcjogXCIke3NvdXJjZVJvb3R9XCIsXG4gICAgICAgIGRlc3REaXI6IFwiJHtiaW5hcnlSb290fS9vdXRwdXRcIixcbiAgICAgIH1cbiAgICB9O1xuICB9XG5cbiAgY29uc3QgY29uZmlnVXJsID0gdXJsLnBhdGhUb0ZpbGVVUkwoY29uZmlnUGF0aCk7XG4gIGNvbnN0IGNvbmZpZ01vZHVsZSA9IGF3YWl0IGltcG9ydE1vZHVsZShjb25maWdVcmwpO1xuICBzd2l0Y2ggKHR5cGVvZiBjb25maWdNb2R1bGUuZGVmYXVsdCkge1xuICBjYXNlIFwiZnVuY3Rpb25cIjpcbiAgICBjb25zdCB1c2VyQ29uZmlnID0gY29uZmlnTW9kdWxlLmRlZmF1bHQob3B0aW9ucy5lbnYsIHt9KTtcbiAgICBpZiAodXNlckNvbmZpZyBpbnN0YW5jZW9mIFByb21pc2UpXG4gICAgICByZXR1cm4gYXdhaXQgdXNlckNvbmZpZztcbiAgICByZXR1cm4gdXNlckNvbmZpZztcblxuICBjYXNlIFwib2JqZWN0XCI6XG4gICAgcmV0dXJuIGNvbmZpZ01vZHVsZS5kZWZhdWx0O1xuXG4gIGRlZmF1bHQ6XG4gICAgdGhyb3cgbmV3IEVycm9yKGBVbmtub3duIHVzZXIgY29uZmlndXJhdGlvbiB0eXBlYCk7XG4gIH1cbn1cblxuZXhwb3J0IGRlZmF1bHQgYXN5bmMgKG9wdGlvbnM6IENvbW1hbmRPcHRpb25zKSA9PiB7XG4gIGNvbnN0IGdjb25maWc6IElHZW5lcmFsQ29uZmlnID0ge1xuICAgIGJ1aWxkVHlwZTogb3B0aW9ucy5lbnYuYnVpbGRUeXBlID09IERFQlVHX0JVSUxEX1RZUEUgPyBvcHRpb25zLmVudi5idWlsZFR5cGUgOiBSRUxFQVNFX0JVSUxEX1RZUEUsXG4gICAgd29ya0Rpcjogb3B0aW9ucy53b3JrRGlyLFxuICB9O1xuXG4gIGNvbnN0IHVzZXJDb25maWcgPSBhd2FpdCBnZXRVc2VyQ29uZmlnKG9wdGlvbnMpO1xuICBjb25zdCBidWlsZENvbmZpZyA9IG1ha2VCdWlsZENvbmZpZyhnY29uZmlnLCB1c2VyQ29uZmlnKTtcblxuICBpZiAoYnVpbGRDb25maWcuUkVDSVBFX0NPTlRFTlRfRklMRSkge1xuICAgIGNvbnN0IGpzb25Db25maWcgPSBKU09OLnN0cmluZ2lmeShidWlsZENvbmZpZywgbnVsbCwgMik7XG4gICAgYXdhaXQgc2F2ZUlmRGlmZmVyZW50KGJ1aWxkQ29uZmlnLlJFQ0lQRV9DT05URU5UX0ZJTEUsIGpzb25Db25maWcpO1xuICB9XG5cbiAgY29uc3Qgc2V0dGluZ3NGaWxlbmFtZSA9IFBhdGgucmVzb2x2ZShidWlsZENvbmZpZy5iaW5hcnlSb290LCBCVUlMRF9TRVRUSU5HU19GSUxFKTtcbiAgY29uc3Qgc2V0dGluZ3MgPSBuZXcgU2V0dGluZ3NTdG9yYWdlKHNldHRpbmdzRmlsZW5hbWUpO1xuXG4gIGZvciAoY29uc3QgW2tleSwgZW50cnldIG9mIE9iamVjdC5lbnRyaWVzKGJ1aWxkQ29uZmlnKSBhcyBhbnkpIHtcbiAgICBpZiAoZW50cnkgJiYgdHlwZW9mIGVudHJ5ID09PSBcIm9iamVjdFwiICYmIGVudHJ5LmFjdGlvbiAmJiAhZW50cnkuZGlzYWJsZWQpIHtcbiAgICAgIGF3YWl0IHNldHRpbmdzLnB1c2goa2V5KTtcbiAgICAgIGNvbnN0IGNvbXBsZXRlZCA9IGF3YWl0IHNldHRpbmdzLmdldChcImNvbXBsZXRlZFwiKTtcbiAgICAgIGlmIChlbnRyeS5yZWJ1aWxkIHx8ICFjb21wbGV0ZWQpIHtcbiAgICAgICAgbG9nZ2VyLmluZm8oYFN0YXJ0ZWQgYWN0aW9uOiAke2tleX1gKTtcbiAgICAgICAgY29uc3QgZW52aXJvbm1lbnQgPSBtZXJnZUVudmlyb25tZW50KGVudHJ5LmVudmlyb25tZW50LCBwcm9jZXNzLmVudik7XG4gICAgICAgIGlmIChlbnRyeS5zb3VyY2VVcmwgJiYgIWVudHJ5LnNvdXJjZVVybC5zdGFydHNXaXRoKElNUE9SVF9TQ0hFTUUpKSB7XG4gICAgICAgICAgYXdhaXQgZG9FeHRyYWN0QXJjaGl2ZShnY29uZmlnLCBlbnZpcm9ubWVudCwgZW50cnksIHNldHRpbmdzKTtcbiAgICAgICAgfVxuICAgICAgICBhd2FpdCBkb1RhcmdldEJ1aWxkKGdjb25maWcsIGVudmlyb25tZW50LCBlbnRyeSwgc2V0dGluZ3MpO1xuICAgICAgICBhd2FpdCBzZXR0aW5ncy5zZXQoXCJjb21wbGV0ZWRcIiwgdHJ1ZSk7XG4gICAgICAgIGxvZ2dlci5pbmZvKGBDb21wbGV0ZWQgYWN0aW9uOiAke2tleX1gKTtcbiAgICAgIH1cbiAgICAgIGF3YWl0IHNldHRpbmdzLnBvcCgpO1xuICAgIH1cbiAgfVxufVxuIiwiLypcbiAqIE1JVCBMaWNlbnNlXG4gKlxuICogQ29weXJpZ2h0IChjKSAyMDI1ICBZdXJpaSBZYWt1YmluICh5dXJpaS55YWt1YmluQGdtYWlsLmNvbSlcbiAqXG4gKiBQZXJtaXNzaW9uIGlzIGdyYW50ZWQgdG8gdXNlLCBjb3B5LCBtb2RpZnksIGFuZCBkaXN0cmlidXRlIHRoaXMgc29mdHdhcmVcbiAqIHVuZGVyIHRoZSBNSVQgTGljZW5zZS4gU2VlIExJQ0VOU0UgZmlsZSBmb3IgZGV0YWlscy5cbiAqL1xuXG5pbXBvcnQgeyBDb21tYW5kT3B0aW9ucyB9IGZyb20gXCJAL2NvcmUvQ29tbWFuZE9wdGlvbnNcIjtcbmltcG9ydCBpbml0IGZyb20gXCJAL2NvbW1hbmRzL2luaXRcIjtcbmltcG9ydCBidWlsZCBmcm9tIFwiQC9jb21tYW5kcy9idWlsZFwiO1xuXG5leHBvcnQgZGVmYXVsdCB7XG4gIGRlZmF1bHQ6IGJ1aWxkLFxuICBpbml0LFxuICBidWlsZCxcbn0gYXMgeyBbbmFtZTogc3RyaW5nXTogKG9wdGlvbnM6IENvbW1hbmRPcHRpb25zKSA9PiBhbnk7IH07XG4iLCIvKlxuICogTUlUIExpY2Vuc2VcbiAqXG4gKiBDb3B5cmlnaHQgKGMpIDIwMjUgIFl1cmlpIFlha3ViaW4gKHl1cmlpLnlha3ViaW5AZ21haWwuY29tKVxuICpcbiAqIFBlcm1pc3Npb24gaXMgZ3JhbnRlZCB0byB1c2UsIGNvcHksIG1vZGlmeSwgYW5kIGRpc3RyaWJ1dGUgdGhpcyBzb2Z0d2FyZVxuICogdW5kZXIgdGhlIE1JVCBMaWNlbnNlLiBTZWUgTElDRU5TRSBmaWxlIGZvciBkZXRhaWxzLlxuICovXG5cbmltcG9ydCBwYXRoIGZyb20gXCJub2RlOnBhdGhcIjtcbmltcG9ydCBmcyBmcm9tIFwibm9kZTpmc1wiO1xuXG5pbXBvcnQgeyBmaWxlRXhpc3RzLCBmZXRjaEJ1ZmZlciB9IGZyb20gXCJAL3V0aWxzL0ZpbGVTeXN0ZW1cIjtcbmltcG9ydCB7IFVTRVJfQ09ORklHIH0gZnJvbSBcIkAvQ29uc3RhbnRzXCI7XG5pbXBvcnQgeyBDb21tYW5kT3B0aW9ucyB9IGZyb20gXCJAL2NvcmUvQ29tbWFuZE9wdGlvbnNcIjtcbmltcG9ydCB7IExvZ2dlciB9IGZyb20gXCJAL2xvZ2dlclwiO1xuXG5jb25zdCBsb2dnZXIgPSBMb2dnZXIuY3JlYXRlKGltcG9ydC5tZXRhLnVybCk7XG5cbmV4cG9ydCBkZWZhdWx0IGFzeW5jIGZ1bmN0aW9uKG9wdGlvbnM6IENvbW1hbmRPcHRpb25zKSB7XG4gIGNvbnN0IHByZXNldCA9IG9wdGlvbnMuZW52LnByZXNldDtcblxuICBpZiAoIXByZXNldClcbiAgICB0aHJvdyBuZXcgRXJyb3IoYFByZXNldCAnJHtwcmVzZXR9JyBpcyBub3QgYXZhaWxhYmxlYCk7XG5cbiAgY29uc3QgcHJlc2V0RGF0YSA9IGF3YWl0IGZldGNoQnVmZmVyKHByZXNldCk7XG5cbiAgY29uc3QgdXNlckNvbmZpZ1BhdGggPSBwYXRoLnJlc29sdmUob3B0aW9ucy53b3JrRGlyLCBVU0VSX0NPTkZJRyk7XG4gIGlmIChhd2FpdCBmaWxlRXhpc3RzKHVzZXJDb25maWdQYXRoKSlcbiAgICBhd2FpdCBmcy5wcm9taXNlcy5ybSh1c2VyQ29uZmlnUGF0aCk7XG5cbiAgYXdhaXQgZnMucHJvbWlzZXMud3JpdGVGaWxlKHVzZXJDb25maWdQYXRoLCBwcmVzZXREYXRhLCBcInV0ZjhcIik7XG4gIGxvZ2dlci5pbmZvKGBQcmVzZXQgJyR7cHJlc2V0fScgaW5zdGFsbGVkIHN1Y2Nlc3NmdWxseWApO1xufVxuIiwiLypcbiAqIE1JVCBMaWNlbnNlXG4gKlxuICogQ29weXJpZ2h0IChjKSAyMDI1ICBZdXJpaSBZYWt1YmluICh5dXJpaS55YWt1YmluQGdtYWlsLmNvbSlcbiAqXG4gKiBQZXJtaXNzaW9uIGlzIGdyYW50ZWQgdG8gdXNlLCBjb3B5LCBtb2RpZnksIGFuZCBkaXN0cmlidXRlIHRoaXMgc29mdHdhcmVcbiAqIHVuZGVyIHRoZSBNSVQgTGljZW5zZS4gU2VlIExJQ0VOU0UgZmlsZSBmb3IgZGV0YWlscy5cbiAqL1xuXG5pbXBvcnQgdXJsIGZyb20gXCJub2RlOnVybFwiO1xuaW1wb3J0IHsgUGF0aCB9IGZyb20gXCJAL3V0aWxzL1BhdGhcIjtcbmltcG9ydCB7IEZJTEVfU0NIRU1FIH0gZnJvbSBcIkAvdXRpbHMvVXJsU2NoZW1lXCI7XG5pbXBvcnQgcGF0aCBmcm9tIFwibm9kZTpwYXRoXCI7XG5cbmNvbnN0IFBBVEggPSBTeW1ib2woXCJQQVRIXCIpO1xuXG5leHBvcnQgY2xhc3MgQWJzb2x1dGVQYXRoIHtcbiAgcHJpdmF0ZSBbUEFUSF06IHN0cmluZztcblxuICBwcm90ZWN0ZWQgY29uc3RydWN0b3IoZmlsZXBhdGg6IHN0cmluZykge1xuICAgIGlmIChmaWxlcGF0aC5zdGFydHNXaXRoKEZJTEVfU0NIRU1FKSkge1xuICAgICAgdGhpc1tQQVRIXSA9IGZpbGVwYXRoO1xuICAgIH1cbiAgICBlbHNlIGlmIChQYXRoLmlzQWJzb2x1dGUoZmlsZXBhdGgpKSB7XG4gICAgICB0aGlzW1BBVEhdID0gdXJsLnBhdGhUb0ZpbGVVUkwoZmlsZXBhdGgpLnRvU3RyaW5nKCk7XG4gICAgfVxuICAgIGVsc2Uge1xuICAgICAgdGhyb3cgbmV3IEVycm9yKGBOb3Qgc3VwcG9ydGVkIHJlbGF0aXZlIHBhdGggb2YgXCIke2ZpbGVwYXRofVwiYCk7XG4gICAgfVxuICB9XG5cbiAgcHVibGljIGpvaW4oLi4ucGF0aHM6IEFycmF5PEFic29sdXRlUGF0aCB8IHN0cmluZz4pIHtcbiAgICBjb25zdCBmaWxlcGF0aCA9IFBhdGguam9pbih1cmwuZmlsZVVSTFRvUGF0aCh0aGlzW1BBVEhdKSwgLi4ucGF0aHMubWFwKGkgPT4gaS50b1N0cmluZygpKSk7XG4gICAgcmV0dXJuIEFic29sdXRlUGF0aC5jcmVhdGUoZmlsZXBhdGgpO1xuICB9XG5cbiAgcHVibGljIGRpcm5hbWUoKSB7XG4gICAgcmV0dXJuIEFic29sdXRlUGF0aC5jcmVhdGUocGF0aC5wb3NpeC5kaXJuYW1lKHRoaXNbUEFUSF0pKTtcbiAgfVxuXG4gIHB1YmxpYyBiYXNlbmFtZSgpIHtcbiAgICByZXR1cm4gcGF0aC5wb3NpeC5iYXNlbmFtZSh0aGlzW1BBVEhdKTtcbiAgfVxuXG4gIHB1YmxpYyByZWxhdGl2ZSh0bzogQWJzb2x1dGVQYXRoIHwgc3RyaW5nKSB7XG4gICAgcmV0dXJuIFBhdGgucmVsYXRpdmUodXJsLmZpbGVVUkxUb1BhdGgodGhpc1tQQVRIXSksIEFic29sdXRlUGF0aC5jcmVhdGUodG8pLnRvU3RyaW5nKCkpO1xuICB9XG5cbiAgcHVibGljIHJlc29sdmUoLi4ucGF0aHM6IEFycmF5PEFic29sdXRlUGF0aCB8IHN0cmluZz4pIHtcbiAgICByZXR1cm4gQWJzb2x1dGVQYXRoLmNyZWF0ZShQYXRoLnJlc29sdmUodXJsLmZpbGVVUkxUb1BhdGgodGhpc1tQQVRIXSksIC4uLnBhdGhzLm1hcChpID0+IGkudG9TdHJpbmcoKSkpKTtcbiAgfVxuXG4gIHB1YmxpYyBtYXRjaChyZWdleHA6IFJlZ0V4cCkge1xuICAgIHJldHVybiB0aGlzW1BBVEhdLm1hdGNoKHJlZ2V4cCk7XG4gIH1cblxuICBwdWJsaWMgdG9TdHJpbmcoKSB7XG4gICAgcmV0dXJuIHVybC5maWxlVVJMVG9QYXRoKHRoaXNbUEFUSF0pO1xuICB9XG5cbiAgcHVibGljIHRvUGF0aCgpIHtcbiAgICBpZiAodGhpc1tQQVRIXS5zdGFydHNXaXRoKEZJTEVfU0NIRU1FKSlcbiAgICAgIHJldHVybiB1cmwuZmlsZVVSTFRvUGF0aCh0aGlzW1BBVEhdKTtcbiAgICB0aHJvdyBuZXcgRXJyb3IoYFVSTCAke3RoaXNbUEFUSF19IGNhbid0IGNvbnZlcnQgdG8gcGF0aGApO1xuICB9XG5cbiAgcHVibGljIHZhbHVlT2YoKSB7XG4gICAgcmV0dXJuIHVybC5maWxlVVJMVG9QYXRoKHRoaXNbUEFUSF0pO1xuICB9XG5cbiAgcHVibGljIHRvSlNPTigpIHtcbiAgICByZXR1cm4gdGhpc1tQQVRIXTtcbiAgfVxuXG4gIHB1YmxpYyBzdGF0aWMgaXNBYnNvbHV0ZShmaWxlcGF0aDogQWJzb2x1dGVQYXRoIHwgc3RyaW5nKSB7XG4gICAgaWYgKGZpbGVwYXRoIGluc3RhbmNlb2YgQWJzb2x1dGVQYXRoKVxuICAgICAgcmV0dXJuIHRydWU7XG4gICAgcmV0dXJuIFBhdGguaXNBYnNvbHV0ZShmaWxlcGF0aCk7XG4gIH1cblxuICBwdWJsaWMgc3RhdGljIGVuc3VyZUluc3RhbmNlKHZhbHVlOiBhbnkpOiBBYnNvbHV0ZVBhdGgge1xuICAgIGlmICh2YWx1ZSBpbnN0YW5jZW9mIEFic29sdXRlUGF0aClcbiAgICAgIHJldHVybiB2YWx1ZTtcbiAgICB0aHJvdyBuZXcgRXJyb3IoYFRoZSAnJHt2YWx1ZX0nIGlzIG5vdCBhIEFic29sdXRlUGF0aGApO1xuICB9XG5cbiAgcHVibGljIHN0YXRpYyBjcmVhdGUocGF0aDogQWJzb2x1dGVQYXRoIHwgc3RyaW5nKTogQWJzb2x1dGVQYXRoIHtcbiAgICBpZiAocGF0aCBpbnN0YW5jZW9mIEFic29sdXRlUGF0aClcbiAgICAgIHJldHVybiBwYXRoO1xuXG4gICAgcmV0dXJuIE9iamVjdC5zZWFsKG5ldyBBYnNvbHV0ZVBhdGgocGF0aCkpO1xuICB9XG59O1xuIiwiLypcbiAqIE1JVCBMaWNlbnNlXG4gKlxuICogQ29weXJpZ2h0IChjKSAyMDI1ICBZdXJpaSBZYWt1YmluICh5dXJpaS55YWt1YmluQGdtYWlsLmNvbSlcbiAqXG4gKiBQZXJtaXNzaW9uIGlzIGdyYW50ZWQgdG8gdXNlLCBjb3B5LCBtb2RpZnksIGFuZCBkaXN0cmlidXRlIHRoaXMgc29mdHdhcmVcbiAqIHVuZGVyIHRoZSBNSVQgTGljZW5zZS4gU2VlIExJQ0VOU0UgZmlsZSBmb3IgZGV0YWlscy5cbiAqL1xuXG5pbXBvcnQgeyBJR2VuZXJhbENvbnRleHQsIEludGVyZmFjZVRhcmdldCB9IGZyb20gXCJAL2NvcmUvTWFrZUludGVyZmFjZXNcIjtcbmltcG9ydCB7IGZpbmRQcm9ncmFtU3luYyB9IGZyb20gXCJAL2NvcmUvRmluZFByb2dyYW1cIjtcbmltcG9ydCB7IFNjb3BlSGVscGVyLCBWYXJpYWJsZU1hcCwgVmFyaWFudE1hcCB9IGZyb20gXCJAL2NvcmUvU2NvcGVcIjtcbmltcG9ydCB7IFN5c3RlbVNjb3BlIH0gZnJvbSBcIkAvY29yZS9TeXN0ZW1TY29wZVwiO1xuaW1wb3J0IHsgQWJzb2x1dGVQYXRoIH0gZnJvbSBcIkAvY29yZS9BYnNvbHV0ZVBhdGhcIjtcbmltcG9ydCB7IGltcG9ydE1vZHVsZSB9IGZyb20gXCJAL3V0aWxzL01vZHVsZVwiO1xuaW1wb3J0IHsgTWFpblRhcmdldCwgUG9zdFRhcmdldCB9IGZyb20gXCJAL2NvcmUvVGFyZ2V0XCI7XG5pbXBvcnQgeyBDVVNUT01fVkFSSUFCTEVfR1JPVVAgfSBmcm9tIFwiQC9Db25zdGFudHNcIjtcbmltcG9ydCB7IEN1c3RvbVNjcmlwdCwgUG9zdEN1c3RvbVNjcmlwdCB9IGZyb20gXCJAL2NvcmUvQ3VzdG9tU2NyaXB0XCI7XG5pbXBvcnQgeyBJbnN0YWxsRW50aXR5IH0gZnJvbSBcIkAvY29yZS9JbnN0YWxsRW50aXR5XCI7XG5pbXBvcnQgeyBTY3JpcHRDb2xsZWN0aW9uIH0gZnJvbSBcIkAvY29yZS9TY3JpcHRDb2xsZWN0aW9uXCI7XG5pbXBvcnQgeyBUYXJnZXROYW1lIH0gZnJvbSBcIkAvY29yZS9UYXJnZXROYW1lXCI7XG5pbXBvcnQgeyBMb2dnZXIgfSBmcm9tIFwiQC9sb2dnZXJcIjtcblxuY29uc3QgbG9nZ2VyID0gTG9nZ2VyLmNyZWF0ZShpbXBvcnQubWV0YS51cmwpO1xuXG5leHBvcnQgYWJzdHJhY3QgY2xhc3MgR2VuZXJhbENvbnRleHQgaW1wbGVtZW50cyBJR2VuZXJhbENvbnRleHQge1xuICBwcm90ZWN0ZWQgX3Njb3BlOiBWYXJpYWJsZU1hcDtcblxuICBjb25zdHJ1Y3RvcihzY29wZTogVmFyaWFibGVNYXApIHtcbiAgICB0aGlzLl9zY29wZSA9IHNjb3BlO1xuICB9XG5cbiAgcHVibGljIGZpbmRQcm9ncmFtKG5hbWU6IHN0cmluZyk6IHN0cmluZyB8IHVuZGVmaW5lZCB7XG4gICAgcmV0dXJuIGZpbmRQcm9ncmFtU3luYyhuYW1lKTtcbiAgfVxuXG4gIHB1YmxpYyBnZXRQcm9wZXJ0eSh0aGlzOiBhbnksIG5hbWU6IHN0cmluZyk6IGFueSB7XG4gICAgcmV0dXJuIFNjb3BlSGVscGVyLmdldCh0aGlzLl9zY29wZSwgbmFtZSk7XG4gIH1cblxuICBwdWJsaWMgc2V0UHJvcGVydHkodGhpczogYW55LCBuYW1lOiBzdHJpbmcsIHZhbHVlOiBhbnkpOiBhbnkge1xuICAgIGNvbnN0IGVudHJ5ID0gdGhpcy5fc2NvcGVbbmFtZV07XG4gICAgaWYgKGVudHJ5KVxuICAgICAgU2NvcGVIZWxwZXIuc2V0RW50cnlWYWx1ZShlbnRyeSwgdmFsdWUpO1xuICAgIGVsc2VcbiAgICAgIFNjb3BlSGVscGVyLmRlZmluZVZhcmlhYmxlKHRoaXMuX3Njb3BlLCBcIlwiLCBuYW1lLCB7dmFsdWV9KTtcbiAgICByZXR1cm4gdHJ1ZTtcbiAgfVxuXG4gIHB1YmxpYyBoYXNQcm9wZXJ0eSh0aGlzOiBhbnksIG5hbWU6IHN0cmluZyk6IGJvb2xlYW4ge1xuICAgIHJldHVybiBPYmplY3QuaGFzT3duKHRoaXMuX3Njb3BlLCBuYW1lKTtcbiAgfVxuXG4gIHB1YmxpYyBkZWxldGVQcm9wZXJ0eSh0aGlzOiBhbnksIG5hbWU6IHN0cmluZyk6IGJvb2xlYW4ge1xuICAgIHJldHVybiBkZWxldGUgdGhpcy5fc2NvcGVbbmFtZV07XG4gIH1cblxuICBwdWJsaWMgZ2V0UHJvcGVydHlOYW1lcyh0aGlzOiBhbnkpOiBzdHJpbmdbXSB7XG4gICAgcmV0dXJuIE9iamVjdC5rZXlzKHRoaXMuX3Njb3BlKTtcbiAgfVxufTtcblxuZXhwb3J0IGFic3RyYWN0IGNsYXNzIE1ha2VDb250ZXh0IGV4dGVuZHMgR2VuZXJhbENvbnRleHQge1xuICBwcml2YXRlIF90YXJnZXRzID0gbmV3IE1hcDxzdHJpbmcsIE1haW5UYXJnZXQ+KCk7XG4gIHByaXZhdGUgX3Bvc3RUYXJnZXRzID0gbmV3IE1hcDxzdHJpbmcsIFBvc3RUYXJnZXQ+KCk7XG4gIHByaXZhdGUgX3NjcmlwdENvbGxlY3Rpb24gPSBTY3JpcHRDb2xsZWN0aW9uLmNyZWF0ZSgpO1xuICBwcml2YXRlIF9wb3N0U2NyaXB0cyA9IG5ldyBNYXA8c3RyaW5nLCBQb3N0Q3VzdG9tU2NyaXB0PigpO1xuICBwcml2YXRlIF9pbnN0YWxsTGlzdCA9IG5ldyBBcnJheTxJbnN0YWxsRW50aXR5PigpO1xuXG4gIHByb3RlY3RlZCBjb25zdHJ1Y3RvcihzY29wZTogVmFyaWFibGVNYXApIHtcbiAgICBzdXBlcihzY29wZSk7XG4gIH1cblxuICBhYnN0cmFjdCBleGVjdXRlU2NyaXB0KHNjcmlwdDogYW55LCBwYXJhbXM6IGFueSk6IGFueTtcbiAgYWJzdHJhY3QgYWRkQ2FjaGVWYXJpYWJsZXMocGFyYW1zOiBzdHJpbmcgfCBWYXJpYW50TWFwKTogdm9pZDtcbiAgYWJzdHJhY3QgYWRkU3ViZGlyZWN0b3J5KHNvdXJjZURpcjogc3RyaW5nIHwgQWJzb2x1dGVQYXRoLCBiaW5hcnlEaXI/OiBzdHJpbmcgfCBBYnNvbHV0ZVBhdGgpOiB2b2lkO1xuXG4gIHB1YmxpYyBnZXQgdGFyZ2V0cygpIHtcbiAgICByZXR1cm4gdGhpcy5fdGFyZ2V0cztcbiAgfVxuXG4gIHB1YmxpYyBnZXQgcG9zdFRhcmdldHMoKSB7XG4gICAgcmV0dXJuIHRoaXMuX3Bvc3RUYXJnZXRzO1xuICB9XG5cbiAgcHVibGljIGdldCBzY3JpcHRDb2xsZWN0aW9uKCkge1xuICAgIHJldHVybiB0aGlzLl9zY3JpcHRDb2xsZWN0aW9uO1xuICB9XG5cbiAgcHVibGljIGdldCBwb3N0U2NyaXB0cygpIHtcbiAgICByZXR1cm4gdGhpcy5fcG9zdFNjcmlwdHM7XG4gIH1cblxuICBwdWJsaWMgZ2V0IGluc3RhbGxMaXN0KCkge1xuICAgIHJldHVybiB0aGlzLl9pbnN0YWxsTGlzdDtcbiAgfVxuICBcbiAgcHVibGljIGdldENhY2hlVmFyaWFibGVzKCk6IGFueSB7XG4gICAgcmV0dXJuIFNjb3BlSGVscGVyLmdldFZhcmlhYmxlc0J5R3JvdXAodGhpcy5fc2NvcGUsIENVU1RPTV9WQVJJQUJMRV9HUk9VUCk7XG4gIH1cblxuICBwdWJsaWMgYWRkSW5jbHVkZURpcmVjdG9yaWVzKC4uLmRpcnM6IGFueVtdKSB7XG4gICAgY29uc3Qgc291cmNlRGlyID0gU2NvcGVIZWxwZXIuZ2V0KHRoaXMuX3Njb3BlLCBcIlNPVVJDRV9ESVJcIik7XG4gICAgZm9yIChjb25zdCBpdGVyIG9mIGRpcnMuZmxhdCgpKVxuICAgICAgU2NvcGVIZWxwZXIuZ2V0KHRoaXMuX3Njb3BlLCBcIklOQ0xVREVTXCIpLnB1c2goc291cmNlRGlyLnJlc29sdmUoaXRlcikpO1xuICB9XG5cbiAgcHVibGljIGdldFBvc3RUYXJnZXQobmFtZTogc3RyaW5nKTogUG9zdFRhcmdldCB7XG4gICAgbGV0IHRhcmdldCA9IHRoaXMuX3Bvc3RUYXJnZXRzLmdldChuYW1lKTtcbiAgICBpZiAoIXRhcmdldCkge1xuICAgICAgdGFyZ2V0ID0gUG9zdFRhcmdldC5jcmVhdGUobmFtZSlcbiAgICAgIHRoaXMuX3Bvc3RUYXJnZXRzLnNldChuYW1lLCB0YXJnZXQpO1xuICAgIH1cbiAgICByZXR1cm4gdGFyZ2V0O1xuICB9XG5cbiAgcHVibGljIGhhc01haW5UYXJnZXQobmFtZTogc3RyaW5nKSB7XG4gICAgcmV0dXJuIHRoaXMuX3RhcmdldHMuaGFzKG5hbWUpO1xuICB9XG5cbiAgcHVibGljIGFkZE1haW5UYXJnZXQobmFtZTogc3RyaW5nLCB0YXJnZXQ6IE1haW5UYXJnZXQpIHtcbiAgICB0aGlzLl90YXJnZXRzLnNldChuYW1lLCB0YXJnZXQpO1xuICB9XG5cbiAgcHVibGljIHNjcmlwdChuYW1lOiBzdHJpbmcpOiBQb3N0Q3VzdG9tU2NyaXB0IHtcbiAgICBsZXQgc2NyaXB0ID0gdGhpcy5fcG9zdFNjcmlwdHMuZ2V0KG5hbWUpO1xuICAgIGlmICghc2NyaXB0KSB7XG4gICAgICBzY3JpcHQgPSBQb3N0Q3VzdG9tU2NyaXB0LmNyZWF0ZShuYW1lKVxuICAgICAgdGhpcy5fcG9zdFNjcmlwdHMuc2V0KG5hbWUsIHNjcmlwdCk7XG4gICAgfVxuICAgIHJldHVybiBzY3JpcHQ7XG4gIH1cblxuICBwdWJsaWMgYWRkQ3VzdG9tU2NyaXB0KHNjcmlwdE1vZHVsZTogc3RyaW5nLCBwYXJhbXM6IGFueSk6IEN1c3RvbVNjcmlwdCB7XG4gICAgY29uc3QgdmFyaWFibGVNYXAgPSBTY29wZUhlbHBlci5jbG9uZVZhcmlhYmxlTWFwKHRoaXMuX3Njb3BlKTtcbiAgICBTY29wZUhlbHBlci5leHRlbmRWYXJpYWJsZU1hcEJ5VmFsdWVzKHZhcmlhYmxlTWFwLCBDVVNUT01fVkFSSUFCTEVfR1JPVVAsIHBhcmFtcyk7XG4gICAgU2NvcGVIZWxwZXIuc2V0KHZhcmlhYmxlTWFwLCBcIlNDUklQVF9NT0RVTEVcIiwgc2NyaXB0TW9kdWxlKTtcbiAgICBcbiAgICBjb25zdCBzb3VyY2VEaXIgPSBTY29wZUhlbHBlci5nZXQodmFyaWFibGVNYXAsIFwiU09VUkNFX0RJUlwiKSBhcyBBYnNvbHV0ZVBhdGg7XG4gICAgY29uc3QgYmluYXJ5RGlyID0gU2NvcGVIZWxwZXIuZ2V0KHZhcmlhYmxlTWFwLCBcIkJJTkFSWV9ESVJcIikgYXMgQWJzb2x1dGVQYXRoO1xuXG4gICAgbGV0IGlucHV0RmlsZSA9IFNjb3BlSGVscGVyLmdldCh2YXJpYWJsZU1hcCwgXCJTQ1JJUFRfSU5QVVRcIik7XG4gICAgaWYgKGlucHV0RmlsZSlcbiAgICAgIGlucHV0RmlsZSA9IHNvdXJjZURpci5yZXNvbHZlKGlucHV0RmlsZSk7XG5cbiAgICBsZXQgb3V0cHV0RmlsZSA9IFNjb3BlSGVscGVyLmdldCh2YXJpYWJsZU1hcCwgXCJTQ1JJUFRfT1VUUFVUXCIpO1xuICAgIGlmICghb3V0cHV0RmlsZSlcbiAgICAgIHRocm93IG5ldyBFcnJvcihcIkN1c3RvbVNjcmlwdCBwYXJhbWV0ZXJzIHJlcXVpcmVkIG91dHB1dCBlbnRpdHlcIik7XG5cbiAgICBvdXRwdXRGaWxlID0gc291cmNlRGlyLnJlc29sdmUob3V0cHV0RmlsZSk7XG5cbiAgICBjb25zdCBvcHRpb25zOiBDdXN0b21TY3JpcHQuT3B0aW9ucyA9IHtcbiAgICAgIHZhcmlhYmxlTWFwLFxuICAgICAgbmFtZTogU2NvcGVIZWxwZXIuZ2V0KHZhcmlhYmxlTWFwLCBcIlNDUklQVF9OQU1FXCIpLFxuICAgICAgc2NyaXB0TW9kdWxlLFxuICAgICAgb3V0cHV0OiBvdXRwdXRGaWxlLFxuICAgICAgaW5wdXQ6IGlucHV0RmlsZSxcbiAgICAgIHNvdXJjZURpcixcbiAgICAgIGJpbmFyeURpcixcbiAgICB9O1xuXG4gICAgY29uc3QgdGFyZ2V0ID0gQ3VzdG9tU2NyaXB0LmNyZWF0ZShvcHRpb25zKTtcbiAgICB0aGlzLl9zY3JpcHRDb2xsZWN0aW9uLmFkZCh0YXJnZXQsIG9wdGlvbnMubmFtZSk7XG5cbiAgICByZXR1cm4gdGFyZ2V0O1xuICB9XG5cbiAgcHVibGljIGluc3RhbGwodmFsdWU6IGFueSwgcGFyYW1zOiBhbnkpOiB2b2lkIHtcbiAgICBjb25zdCBzY29wZSA9IFNjb3BlSGVscGVyLmNyZWF0ZVZhcmlhYmxlVmFsdWVzKHRoaXMuX3Njb3BlKTtcbiAgICBmb3IgKGNvbnN0IGl0IG9mIFsgdmFsdWUgXS5mbGF0KCkpIHtcbiAgICAgIGxldCBpdGVyID0gKGl0IGluc3RhbmNlb2YgSW50ZXJmYWNlVGFyZ2V0KSA/IFRhcmdldE5hbWUuY3JlYXRlKGl0LnRhcmdldE5hbWUpIDogaXQ7XG5cbiAgICAgIGxldCBkZXN0aW5hdGlvbjogc3RyaW5nIHwgQWJzb2x1dGVQYXRoIHwgdW5kZWZpbmVkO1xuICAgICAgbGV0IGJhc2VEaXI7XG4gICAgICBpZiAodHlwZW9mIHBhcmFtcyA9PT0gXCJzdHJpbmdcIilcbiAgICAgICAgZGVzdGluYXRpb24gPSBwYXJhbXM7XG4gICAgICBlbHNlIGlmIChwYXJhbXMpIHtcbiAgICAgICAgZGVzdGluYXRpb24gPSBwYXJhbXMuZGVzdGluYXRpb247XG4gICAgICAgIGJhc2VEaXIgPSBwYXJhbXMuYmFzZURpcjtcbiAgICAgIH1cblxuICAgICAgaWYgKCFkZXN0aW5hdGlvbilcbiAgICAgICAgdGhyb3cgbmV3IEVycm9yKGBQYXJhbWV0ZXIgZGVzdGluYXRpb24gaXMgbm90IHNwZWNpZmllZGApO1xuICAgIFxuICAgICAgaWYgKGJhc2VEaXIpXG4gICAgICAgIGJhc2VEaXIgPSBzY29wZS5TT1VSQ0VfRElSLnJlc29sdmUoYmFzZURpcik7XG5cbiAgICAgIGlmICh0eXBlb2YgaXRlciA9PT0gXCJzdHJpbmdcIiB8fCBpdGVyIGluc3RhbmNlb2YgQWJzb2x1dGVQYXRoKSB7XG4gICAgICAgIGl0ZXIgPSBzY29wZS5TT1VSQ0VfRElSLnJlc29sdmUoaXRlci50b1N0cmluZygpKSBhcyBBYnNvbHV0ZVBhdGg7XG4gICAgICAgIGl0ZXIgPSBBYnNvbHV0ZVBhdGguY3JlYXRlKGl0ZXIpO1xuICAgICAgICBiYXNlRGlyID0gYmFzZURpciB8fCBpdGVyLmRpcm5hbWUoKTtcbiAgICAgIH1cbiAgICAgIGVsc2UgaWYgKCEoaXRlciBpbnN0YW5jZW9mIFRhcmdldE5hbWUpKSB7XG4gICAgICAgIHRocm93IG5ldyBFcnJvcihgTm90IHN1cHBvcnRldCB2YWx1ZSBvZiAke2l0ZXJ9YCk7XG4gICAgICB9XG5cbiAgICAgIGNvbnN0IGVudGl0eSA9IG5ldyBJbnN0YWxsRW50aXR5KGl0ZXIsIEFic29sdXRlUGF0aC5jcmVhdGUoc2NvcGUuSU5TVEFMTF9QUkVGSVgucmVzb2x2ZShkZXN0aW5hdGlvbikpLCBiYXNlRGlyID8gQWJzb2x1dGVQYXRoLmNyZWF0ZShiYXNlRGlyKSA6IHVuZGVmaW5lZCk7XG4gICAgICB0aGlzLl9pbnN0YWxsTGlzdC5wdXNoKGVudGl0eSk7XG4gICAgfVxuICB9XG5cbiAgcHVibGljIGdldFZhcmlhYmxlTWFwKCk6IFZhcmlhYmxlTWFwIHtcbiAgICByZXR1cm4gdGhpcy5fc2NvcGU7XG4gIH1cbn07XG5cbmV4cG9ydCBmdW5jdGlvbiBjcmVhdGVDb250ZXh0PFQgZXh0ZW5kcyBJR2VuZXJhbENvbnRleHQ+KGN0eDogVCk6IFQgJiBTeXN0ZW1TY29wZSB7XG4gIGNvbnN0IGhhbmRsZXI6IFByb3h5SGFuZGxlcjxUPiA9IHtcbiAgICBnZXQodGFyZ2V0OiBULCBuYW1lOiBzdHJpbmcsIHJlY2VpdmVyOiBhbnkpIHtcbiAgICAgIGlmIChuYW1lIGluIHRhcmdldClcbiAgICAgICAgcmV0dXJuICh0YXJnZXQgYXMgYW55KVtuYW1lXTtcbiAgICAgIHJldHVybiB0YXJnZXQuZ2V0UHJvcGVydHkobmFtZSk7XG4gICAgfSxcbiAgICBzZXQodGFyZ2V0OiBULCBuYW1lOiBzdHJpbmcsIHZhbHVlOiBhbnkpOiBib29sZWFuIHtcbiAgICAgIHRhcmdldC5zZXRQcm9wZXJ0eShuYW1lLCB2YWx1ZSk7XG4gICAgICByZXR1cm4gdHJ1ZTtcbiAgICB9LFxuICAgIGhhcyh0YXJnZXQ6IFQsIG5hbWU6IHN0cmluZykge1xuICAgICAgcmV0dXJuIG5hbWUgaW4gdGFyZ2V0IHx8IHRhcmdldC5oYXNQcm9wZXJ0eShuYW1lKTtcbiAgICB9LFxuICAgIG93bktleXModGFyZ2V0OiBUKSB7XG4gICAgICByZXR1cm4gdGFyZ2V0LmdldFByb3BlcnR5TmFtZXMoKTtcbiAgICB9LFxuICAgIGRlbGV0ZVByb3BlcnR5KHRhcmdldDogVCwgbmFtZTogc3RyaW5nKSB7XG4gICAgICByZXR1cm4gdGFyZ2V0LmRlbGV0ZVByb3BlcnR5KG5hbWUpO1xuICAgIH0sXG4gICAgZ2V0T3duUHJvcGVydHlEZXNjcmlwdG9yKHRhcmdldDogVCwgbmFtZTogc3RyaW5nKTogUHJvcGVydHlEZXNjcmlwdG9yIHwgdW5kZWZpbmVkIHtcbiAgICAgIGlmICh0YXJnZXQuaGFzUHJvcGVydHkobmFtZSkpIHtcbiAgICAgICAgY29uc3QgdmFsdWUgPSB0YXJnZXQuZ2V0UHJvcGVydHkobmFtZSk7XG4gICAgICAgIHJldHVybiB7IHZhbHVlLCB3cml0YWJsZTogdHJ1ZSwgZW51bWVyYWJsZTogdHJ1ZSwgY29uZmlndXJhYmxlOiB0cnVlIH07XG4gICAgICB9XG4gICAgICByZXR1cm4gdW5kZWZpbmVkO1xuICAgIH0sXG4gIH07XG4gIHJldHVybiBuZXcgUHJveHkoY3R4LCBoYW5kbGVyKSBhcyBUICYgU3lzdGVtU2NvcGU7XG59XG5cbmV4cG9ydCBhc3luYyBmdW5jdGlvbiBwZXJmb3JtQ29udGV4dChtazogSUdlbmVyYWxDb250ZXh0ICYgU3lzdGVtU2NvcGUpIHtcbiAgY29uc3Qgc2NyaXB0VXJsID0gbWsuU0NSSVBUX0ZJTEUudG9KU09OKCk7XG4gIGNvbnN0IG1vZHVsZSA9IGF3YWl0IGltcG9ydE1vZHVsZShzY3JpcHRVcmwpO1xuICBpZiAoIW1vZHVsZS5kZWZhdWx0KVxuICAgIHRocm93IG5ldyBFcnJvcihgU2NyaXB0ICR7c2NyaXB0VXJsfSBoYXMgbm90IGNvbnRhaW4gYSBkZWZhdWx0IGZ1bmN0aW9uYCk7XG5cbiAgY29uc3QgcmVzdWx0ID0gbW9kdWxlLmRlZmF1bHQobWspO1xuICBpZiAocmVzdWx0IGluc3RhbmNlb2YgUHJvbWlzZSlcbiAgICBhd2FpdCByZXN1bHQ7XG59XG5cbmV4cG9ydCBmdW5jdGlvbiBjcmVhdGVWYXJpYWJsZU1hcEZvckRpcmVjdG9yeSh2YXJpYWJsZU1hcDogVmFyaWFibGVNYXAsIHNvdXJjZURpcjogYW55LCBiaW5hcnlEaXI/OiBhbnkpOiBWYXJpYWJsZU1hcCB7XG4gIGlmIChiaW5hcnlEaXIgPT09IHVuZGVmaW5lZCkge1xuICAgIGlmICghQWJzb2x1dGVQYXRoLmlzQWJzb2x1dGUoc291cmNlRGlyKSlcbiAgICAgIGJpbmFyeURpciA9IHNvdXJjZURpcjtcbiAgICBlbHNlIHtcbiAgICAgIGNvbnN0IGJpbmFyeURpcjEgPSBTY29wZUhlbHBlci5nZXQodmFyaWFibGVNYXAsIFwiUFJPSkVDVF9CSU5BUllfRElSXCIpLnJlbGF0aXZlKHNvdXJjZURpcik7XG4gICAgICBjb25zdCBiaW5hcnlEaXIyID0gU2NvcGVIZWxwZXIuZ2V0KHZhcmlhYmxlTWFwLCBcIlBST0pFQ1RfU09VUkNFX0RJUlwiKS5yZWxhdGl2ZShzb3VyY2VEaXIpO1xuICAgICAgYmluYXJ5RGlyID0gKGJpbmFyeURpcjEubGVuZ3RoID4gYmluYXJ5RGlyMi5sZW5ndGgpID8gYmluYXJ5RGlyMiA6IGJpbmFyeURpcjE7XG4gICAgfVxuICB9XG5cbiAgY29uc3QgU09VUkNFX0RJUiA9IFNjb3BlSGVscGVyLmdldCh2YXJpYWJsZU1hcCwgXCJTT1VSQ0VfRElSXCIpLnJlc29sdmUoc291cmNlRGlyKTtcbiAgY29uc3QgQklOQVJZX0RJUiA9IFNjb3BlSGVscGVyLmdldCh2YXJpYWJsZU1hcCwgXCJCSU5BUllfRElSXCIpLnJlc29sdmUoYmluYXJ5RGlyKTtcblxuICBjb25zdCBuZXdWYXJpYWJsZU1hcCA9IFNjb3BlSGVscGVyLmNsb25lVmFyaWFibGVNYXAodmFyaWFibGVNYXApO1xuXG4gIFNjb3BlSGVscGVyLnNldChuZXdWYXJpYWJsZU1hcCwgXCJTT1VSQ0VfRElSXCIsIFNPVVJDRV9ESVIpO1xuICBTY29wZUhlbHBlci5zZXQobmV3VmFyaWFibGVNYXAsIFwiQklOQVJZX0RJUlwiLCBCSU5BUllfRElSKTtcbiAgU2NvcGVIZWxwZXIucmVzZXQobmV3VmFyaWFibGVNYXAsIFwiU0NSSVBUX0RJUlwiKTtcbiAgU2NvcGVIZWxwZXIucmVzZXQobmV3VmFyaWFibGVNYXAsIFwiU0NSSVBUX0ZJTEVcIik7XG5cbiAgcmV0dXJuIG5ld1ZhcmlhYmxlTWFwO1xufVxuIiwiLypcbiAqIE1JVCBMaWNlbnNlXG4gKlxuICogQ29weXJpZ2h0IChjKSAyMDI1ICBZdXJpaSBZYWt1YmluICh5dXJpaS55YWt1YmluQGdtYWlsLmNvbSlcbiAqXG4gKiBQZXJtaXNzaW9uIGlzIGdyYW50ZWQgdG8gdXNlLCBjb3B5LCBtb2RpZnksIGFuZCBkaXN0cmlidXRlIHRoaXMgc29mdHdhcmVcbiAqIHVuZGVyIHRoZSBNSVQgTGljZW5zZS4gU2VlIExJQ0VOU0UgZmlsZSBmb3IgZGV0YWlscy5cbiAqL1xuXG5pbXBvcnQgZnMgZnJvbSBcIm5vZGU6ZnNcIjtcblxuaW1wb3J0IHsgZ2VuZXJhdGVkU2NyaXB0TmFtZUNvbW1lbnQgfSBmcm9tIFwiQC9jeHhcIjtcblxuZXhwb3J0IGRlZmF1bHQgYXN5bmMgZnVuY3Rpb24obWs6IGFueSkge1xuICBjb25zdCBsaW5lcyA9IFtdO1xuXG4gIGxpbmVzLnB1c2goZ2VuZXJhdGVkU2NyaXB0TmFtZUNvbW1lbnQoaW1wb3J0Lm1ldGEuZmlsZW5hbWUpKTtcbiAgbGluZXMucHVzaChcIlwiKTtcblxuICBmb3IgKGNvbnN0IFtuYW1lLCBlbnRyeV0gb2YgT2JqZWN0LmVudHJpZXMobWsuU0NSSVBUX0lOUFVUKSBhcyBhbnkpIHtcbiAgICBpZiAoZW50cnkuZGVzY3JpcHRpb24pIHtcbiAgICAgIGxpbmVzLnB1c2goYC8qICR7ZW50cnkuZGVzY3JpcHRpb259ICovYCk7XG4gICAgfVxuICAgIGlmICh0eXBlb2YgZW50cnkudmFsdWUgPT09IFwiYm9vbGVhblwiKSB7XG4gICAgICBsaW5lcy5wdXNoKGAjZGVmaW5lICR7bmFtZX0gJHtlbnRyeS52YWx1ZSA/IDEgOiAwfWApO1xuICAgIH1cbiAgICBlbHNlIGlmICh0eXBlb2YgZW50cnkudmFsdWUgPT09IFwibnVtYmVyXCIpIHtcbiAgICAgIGxpbmVzLnB1c2goYCNkZWZpbmUgJHtuYW1lfSAke2VudHJ5LnZhbHVlfWApO1xuICAgIH1cbiAgICBlbHNlIGlmICh0eXBlb2YgZW50cnkudmFsdWUgPT09IFwic3RyaW5nXCIpIHtcbiAgICAgIGxpbmVzLnB1c2goYCNkZWZpbmUgJHtuYW1lfSBcIiR7ZW50cnkudmFsdWV9XCJgKTtcbiAgICB9XG4gICAgZWxzZSBpZiAoQXJyYXkuaXNBcnJheShlbnRyeS52YWx1ZSkpIHtcbiAgICAgIGxpbmVzLnB1c2goYCNkZWZpbmUgJHtuYW1lfSBcIiR7ZW50cnkudmFsdWUuam9pbihcIjtcIil9XCJgKTtcbiAgICB9XG4gICAgZWxzZSB7XG4gICAgICB0aHJvdyBuZXcgRXJyb3IoYFwiJHtuYW1lfVwiIGhhcyAke2VudHJ5LnZhbHVlfSB2YWx1ZWApO1xuICAgIH1cbiAgICBsaW5lcy5wdXNoKFwiXCIpO1xuICB9XG5cbiAgYXdhaXQgZnMucHJvbWlzZXMubWtkaXIobWsuU0NSSVBUX09VVFBVVC5kaXJuYW1lKCkudG9TdHJpbmcoKSwgeyByZWN1cnNpdmU6IHRydWUgfSk7XG4gIGF3YWl0IGZzLnByb21pc2VzLndyaXRlRmlsZShtay5TQ1JJUFRfT1VUUFVULnRvU3RyaW5nKCksIGxpbmVzLmpvaW4oXCJcXG5cIiksIFwidXRmLThcIik7XG59XG4iLCIvKlxuICogTUlUIExpY2Vuc2VcbiAqXG4gKiBDb3B5cmlnaHQgKGMpIDIwMjUgIFl1cmlpIFlha3ViaW4gKHl1cmlpLnlha3ViaW5AZ21haWwuY29tKVxuICpcbiAqIFBlcm1pc3Npb24gaXMgZ3JhbnRlZCB0byB1c2UsIGNvcHksIG1vZGlmeSwgYW5kIGRpc3RyaWJ1dGUgdGhpcyBzb2Z0d2FyZVxuICogdW5kZXIgdGhlIE1JVCBMaWNlbnNlLiBTZWUgTElDRU5TRSBmaWxlIGZvciBkZXRhaWxzLlxuICovXG5cbmltcG9ydCBmcyBmcm9tIFwibm9kZTpmc1wiO1xuXG5leHBvcnQgZGVmYXVsdCBhc3luYyBmdW5jdGlvbihtazogYW55KSB7XG4gIGxldCBjb250ZW50ID0gYXdhaXQgZnMucHJvbWlzZXMucmVhZEZpbGUobWsuU0NSSVBUX0lOUFVULnRvU3RyaW5nKCksIFwidXRmLThcIik7XG4gIGNvbnRlbnQgPSBjb250ZW50LnJlcGxhY2UoL0AoW19BLVphLXpdW19BLVphLXowLTldKylAL2csIChtYXRjaCwgdjEpID0+IHtcbiAgICBjb25zdCByZXMgPSBta1t2MV0gfHwgXCJcIjtcbiAgICBpZiAoQXJyYXkuaXNBcnJheShyZXMpKVxuICAgICAgcmV0dXJuIHJlcy5qb2luKFwiXFxuXCIpO1xuICAgIHJldHVybiByZXMudG9TdHJpbmcoKTtcbiAgfSk7XG4gIGNvbnRlbnQgPSBjb250ZW50LnJlcGxhY2UoLyNjbWFrZWRlZmluZSArKFtfQS1aYS16XVtfQS1aYS16MC05XSspICooLiopL2csIChtYXRjaCwgdjEsIHYyKSA9PiB7XG4gICAgcmV0dXJuIG1rW3YxXSA/IGAjZGVmaW5lICR7djF9ICR7djJ9YCA6IGAvKiAjdW5kZWYgJHt2MX0gKi9gO1xuICB9KTtcbiAgYXdhaXQgZnMucHJvbWlzZXMubWtkaXIobWsuU0NSSVBUX09VVFBVVC5kaXJuYW1lKCkudG9TdHJpbmcoKSwgeyByZWN1cnNpdmU6IHRydWUgfSk7XG4gIGF3YWl0IGZzLnByb21pc2VzLndyaXRlRmlsZShtay5TQ1JJUFRfT1VUUFVULnRvU3RyaW5nKCksIGNvbnRlbnQsIFwidXRmLThcIik7XG59XG4iLCIvKlxuICogTUlUIExpY2Vuc2VcbiAqXG4gKiBDb3B5cmlnaHQgKGMpIDIwMjUgIFl1cmlpIFlha3ViaW4gKHl1cmlpLnlha3ViaW5AZ21haWwuY29tKVxuICpcbiAqIFBlcm1pc3Npb24gaXMgZ3JhbnRlZCB0byB1c2UsIGNvcHksIG1vZGlmeSwgYW5kIGRpc3RyaWJ1dGUgdGhpcyBzb2Z0d2FyZVxuICogdW5kZXIgdGhlIE1JVCBMaWNlbnNlLiBTZWUgTElDRU5TRSBmaWxlIGZvciBkZXRhaWxzLlxuICovXG5cbmltcG9ydCBjb25maWd1cmVfZmlsZSBmcm9tIFwiQC9jb3JlL0J1aWxkaW5TY3JpcHRzL2NvbmZpZ3VyZV9maWxlXCI7XG5pbXBvcnQgY19oZWFkZXIgZnJvbSBcIkAvY29yZS9CdWlsZGluU2NyaXB0cy9jX2hlYWRlclwiO1xuXG5leHBvcnQgZGVmYXVsdCB7XG4gIGNvbmZpZ3VyZV9maWxlLFxuICBjX2hlYWRlcixcbn07XG4iLCIvKlxuICogTUlUIExpY2Vuc2VcbiAqXG4gKiBDb3B5cmlnaHQgKGMpIDIwMjUgIFl1cmlpIFlha3ViaW4gKHl1cmlpLnlha3ViaW5AZ21haWwuY29tKVxuICpcbiAqIFBlcm1pc3Npb24gaXMgZ3JhbnRlZCB0byB1c2UsIGNvcHksIG1vZGlmeSwgYW5kIGRpc3RyaWJ1dGUgdGhpcyBzb2Z0d2FyZVxuICogdW5kZXIgdGhlIE1JVCBMaWNlbnNlLiBTZWUgTElDRU5TRSBmaWxlIGZvciBkZXRhaWxzLlxuICovXG5cbmltcG9ydCB7IEludGVyZmFjZVNjcmlwdCB9IGZyb20gXCJAL2NvcmUvTWFrZUludGVyZmFjZXNcIjtcbmltcG9ydCB7IEFic29sdXRlUGF0aCB9IGZyb20gXCJAL2NvcmUvQWJzb2x1dGVQYXRoXCI7XG5pbXBvcnQgeyBTY29wZUhlbHBlciwgVmFyaWFibGVNYXAsIFZhcmlhbnRNYXAgfSBmcm9tIFwiQC9jb3JlL1Njb3BlXCI7XG5pbXBvcnQgeyBTaW1wbGVPYmplY3QgfSBmcm9tIFwiQC9jb3JlL1NpbXBsZU9iamVjdFwiO1xuXG5leHBvcnQgY2xhc3MgUG9zdEN1c3RvbVNjcmlwdCBleHRlbmRzIEludGVyZmFjZVNjcmlwdCB7XG4gIHByaXZhdGUgX25hbWU6IHN0cmluZztcbiAgcHJpdmF0ZSBfdmFyaWFibGVzOiBWYXJpYW50TWFwO1xuXG4gIHByaXZhdGUgY29uc3RydWN0b3IobmFtZTogc3RyaW5nLCB2YXJpYWJsZXM/OiBWYXJpYW50TWFwKSB7XG4gICAgc3VwZXIoKTtcbiAgICB0aGlzLl9uYW1lID0gbmFtZTtcbiAgICB0aGlzLl92YXJpYWJsZXMgPSB2YXJpYWJsZXMgfHwge307XG4gIH1cblxuICBwdWJsaWMgc3RhdGljIGNyZWF0ZShuYW1lOiBzdHJpbmcsIHZhcmlhYmxlcz86IFZhcmlhbnRNYXApIHtcbiAgICByZXR1cm4gT2JqZWN0LnNlYWwobmV3IFBvc3RDdXN0b21TY3JpcHQobmFtZSwgdmFyaWFibGVzKSk7XG4gIH1cblxuICBwdWJsaWMgc3RhdGljIGZyb21KU09OKG9iamVjdDogU2ltcGxlT2JqZWN0KSB7XG4gICAgcmV0dXJuIFBvc3RDdXN0b21TY3JpcHQuY3JlYXRlKG9iamVjdC5uYW1lIGFzIHN0cmluZywgb2JqZWN0LnZhcmlhYmxlcyBhcyBWYXJpYW50TWFwKTtcbiAgfVxuXG4gIHB1YmxpYyBnZXQgdmFyaWFibGVzKCkge1xuICAgIHJldHVybiB0aGlzLl92YXJpYWJsZXM7XG4gIH1cblxuICBwdWJsaWMgbWVyZ2VWYXJpYWJsZXModmFyaWFibGVzOiBWYXJpYW50TWFwKSB7XG4gICAgU2NvcGVIZWxwZXIubWVyZ2VWYXJpYWJsZXModGhpcy5fdmFyaWFibGVzLCB2YXJpYWJsZXMpO1xuICB9XG5cbiAgcHVibGljIHRvSlNPTigpOiBTaW1wbGVPYmplY3Qge1xuICAgIHJldHVybiB7XG4gICAgICB0eXBlOiBQb3N0Q3VzdG9tU2NyaXB0Lm5hbWUsXG4gICAgICBuYW1lOiB0aGlzLl9uYW1lLFxuICAgICAgdmFyaWFibGVzOiB0aGlzLl92YXJpYWJsZXMsXG4gICAgfTtcbiAgfVxuICBcbiAgcHVibGljIHRvU3RyaW5nKCk6IHN0cmluZyB7XG4gICAgcmV0dXJuIGBbb2JqZWN0ICR7UG9zdEN1c3RvbVNjcmlwdC5uYW1lfV1gO1xuICB9XG59O1xuXG5jb25zdCBTQ09QRSAgICAgICAgPSBTeW1ib2woXCJTQ09QRVwiKTtcbmNvbnN0IE5BTUUgICAgICAgICA9IFN5bWJvbChcIk5BTUVcIik7XG5jb25zdCBJTlBVVCAgICAgICAgPSBTeW1ib2woXCJJTlBVVFwiKTtcbmNvbnN0IE9VVFBVVCAgICAgICA9IFN5bWJvbChcIk9VVFBVVFwiKTtcblxuZXhwb3J0IGNsYXNzIEN1c3RvbVNjcmlwdCBleHRlbmRzIEludGVyZmFjZVNjcmlwdCB7XG4gIHByaXZhdGUgW1NDT1BFXTogVmFyaWFibGVNYXA7XG4gIHByaXZhdGUgW05BTUVdOiBzdHJpbmc7XG4gIHByaXZhdGUgX3NjcmlwdE1vZHVsZTogc3RyaW5nIHwgQWJzb2x1dGVQYXRoO1xuICBwcml2YXRlIFtJTlBVVF06IEFic29sdXRlUGF0aCB8IHVuZGVmaW5lZDtcbiAgcHJpdmF0ZSBbT1VUUFVUXTogQWJzb2x1dGVQYXRoO1xuICBwcml2YXRlIF9zb3VyY2VEaXI6IEFic29sdXRlUGF0aDtcbiAgcHJpdmF0ZSBfYmluYXJ5RGlyOiBBYnNvbHV0ZVBhdGg7XG5cbiAgcHJpdmF0ZSBjb25zdHJ1Y3RvcihvcHRpb25zOiBDdXN0b21TY3JpcHQuT3B0aW9ucykge1xuICAgIHN1cGVyKCk7XG4gICAgdGhpc1tTQ09QRV0gPSBvcHRpb25zLnZhcmlhYmxlTWFwO1xuICAgIHRoaXNbTkFNRV0gPSBvcHRpb25zLm5hbWUgfHwgXCJcIjtcbiAgICB0aGlzW0lOUFVUXSA9IG9wdGlvbnMuaW5wdXQ7XG4gICAgdGhpcy5fc2NyaXB0TW9kdWxlID0gb3B0aW9ucy5zY3JpcHRNb2R1bGU7XG4gICAgdGhpc1tPVVRQVVRdID0gb3B0aW9ucy5vdXRwdXQ7XG4gICAgdGhpcy5fc291cmNlRGlyID0gb3B0aW9ucy5zb3VyY2VEaXI7XG4gICAgdGhpcy5fYmluYXJ5RGlyID0gb3B0aW9ucy5iaW5hcnlEaXI7XG4gIH1cblxuICBwdWJsaWMgc3RhdGljIGNyZWF0ZShvcHRpb25zOiBDdXN0b21TY3JpcHQuT3B0aW9ucyk6IEN1c3RvbVNjcmlwdCB7XG4gICAgcmV0dXJuIE9iamVjdC5zZWFsKG5ldyBDdXN0b21TY3JpcHQob3B0aW9ucykpO1xuICB9XG5cbiAgcHVibGljIG1lcmdlVmFyaWFibGVzKHZhcmlhYmxlczogVmFyaWFudE1hcCkge1xuICAgIFNjb3BlSGVscGVyLm1lcmdlVmFyaWFibGVNYXAodGhpc1tTQ09QRV0sIHZhcmlhYmxlcyk7XG4gIH1cblxuICBwdWJsaWMgZ2V0IE5BTUUoKSB7XG4gICAgcmV0dXJuIHRoaXNbTkFNRV07XG4gIH1cblxuICBwdWJsaWMgZ2V0IHNjcmlwdE1vZHVsZSgpIHtcbiAgICByZXR1cm4gdGhpcy5fc2NyaXB0TW9kdWxlO1xuICB9XG5cbiAgcHVibGljIGdldCBJTlBVVCgpOiBBYnNvbHV0ZVBhdGggfCB1bmRlZmluZWQge1xuICAgIHJldHVybiB0aGlzW0lOUFVUXTtcbiAgfVxuXG4gIHB1YmxpYyBnZXQgT1VUUFVUKCk6IEFic29sdXRlUGF0aCB7XG4gICAgcmV0dXJuIHRoaXNbT1VUUFVUXTtcbiAgfVxuXG4gIHB1YmxpYyBnZXQgc291cmNlRGlyKCk6IEFic29sdXRlUGF0aCB7XG4gICAgcmV0dXJuIHRoaXMuX3NvdXJjZURpcjtcbiAgfVxuXG4gIHB1YmxpYyBnZXQgYmluYXJ5RGlyKCk6IEFic29sdXRlUGF0aCB7XG4gICAgcmV0dXJuIHRoaXMuX2JpbmFyeURpcjtcbiAgfVxuXG4gIHB1YmxpYyBnZXQgdmFyaWFibGVNYXAoKSB7XG4gICAgcmV0dXJuIHRoaXNbU0NPUEVdO1xuICB9XG5cbiAgcHVibGljIHBvc3RVcGRhdGUoc2NyaXB0OiBQb3N0Q3VzdG9tU2NyaXB0KSB7XG4gICAgdGhpcy5tZXJnZVZhcmlhYmxlcyhzY3JpcHQudmFyaWFibGVzKTtcbiAgfVxuXG4gIHB1YmxpYyB0b0pTT04oKTogb2JqZWN0IHtcbiAgICByZXR1cm4ge1xuICAgICAgdmFyaWFibGVNYXA6IHRoaXNbU0NPUEVdLFxuICAgICAgTkFNRTogdGhpc1tOQU1FXSxcbiAgICAgIHNjcmlwdE1vZHVsZTogdGhpcy5fc2NyaXB0TW9kdWxlLFxuICAgICAgSU5QVVQ6IHRoaXMuSU5QVVQsXG4gICAgICBPVVRQVVQ6IHRoaXMuT1VUUFVULFxuICAgICAgc291cmNlRGlyOiB0aGlzLl9zb3VyY2VEaXIsXG4gICAgICBiaW5hcnlEaXI6IHRoaXMuX2JpbmFyeURpcixcbiAgICB9XG4gIH1cbn07XG5cbmV4cG9ydCBuYW1lc3BhY2UgQ3VzdG9tU2NyaXB0IHtcblxuZXhwb3J0IGludGVyZmFjZSBPcHRpb25zIHtcbiAgdmFyaWFibGVNYXA6IFZhcmlhYmxlTWFwLFxuICBuYW1lPzogc3RyaW5nLFxuICBzY3JpcHRNb2R1bGU6IHN0cmluZyB8IEFic29sdXRlUGF0aCxcbiAgaW5wdXQ/OiBBYnNvbHV0ZVBhdGgsXG4gIG91dHB1dDogQWJzb2x1dGVQYXRoLFxuICBzb3VyY2VEaXI6IEFic29sdXRlUGF0aCxcbiAgYmluYXJ5RGlyOiBBYnNvbHV0ZVBhdGgsXG59O1xuXG59IC8vIG5hbWVzcGFjZSBDdXN0b21TY3JpcHRcblxuU2ltcGxlT2JqZWN0LnJlZ2lzdGVySW5zdGFuY2VDcmVhdG9yKFBvc3RDdXN0b21TY3JpcHQubmFtZSwgUG9zdEN1c3RvbVNjcmlwdC5mcm9tSlNPTik7XG4iLCIvKlxuICogTUlUIExpY2Vuc2VcbiAqXG4gKiBDb3B5cmlnaHQgKGMpIDIwMjUgIFl1cmlpIFlha3ViaW4gKHl1cmlpLnlha3ViaW5AZ21haWwuY29tKVxuICpcbiAqIFBlcm1pc3Npb24gaXMgZ3JhbnRlZCB0byB1c2UsIGNvcHksIG1vZGlmeSwgYW5kIGRpc3RyaWJ1dGUgdGhpcyBzb2Z0d2FyZVxuICogdW5kZXIgdGhlIE1JVCBMaWNlbnNlLiBTZWUgTElDRU5TRSBmaWxlIGZvciBkZXRhaWxzLlxuICovXG5cbmltcG9ydCB7IGZpbmRQcm9ncmFtIH0gZnJvbSBcIkAvY29yZS9GaW5kUHJvZ3JhbVwiO1xuaW1wb3J0IHsgU3lzdGVtU2NvcGUgfSBmcm9tIFwiQC9jb3JlL1N5c3RlbVNjb3BlXCI7XG5pbXBvcnQgeyBMb2dnZXIgfSBmcm9tIFwiQC9sb2dnZXJcIjtcblxuY29uc3QgbG9nZ2VyID0gTG9nZ2VyLmNyZWF0ZShpbXBvcnQubWV0YS51cmwpO1xuXG5leHBvcnQgYXN5bmMgZnVuY3Rpb24gZGV0ZXJtaW5lQ29tcGlsZXIoc2NvcGU6IFN5c3RlbVNjb3BlKSB7XG4gIGNvbnN0IGNsYW5nUGF0aCA9IGF3YWl0IGZpbmRQcm9ncmFtKFwiY2xhbmdcIik7XG4gIGlmIChjbGFuZ1BhdGgpIHtcbiAgICBsb2dnZXIuaW5mbyhcIlRoZSBDIGNvbXBpbGVyIGlkZW50aWZpY2F0aW9uIGlzIENsYW5nIGEuYi5jXCIpO1xuICAgIHNjb3BlLkFTTV9DT01QSUxFUiA9IFwiY2xhbmdcIjtcbiAgICBzY29wZS5DX0NPTVBJTEVSID0gXCJjbGFuZ1wiO1xuICAgIHNjb3BlLkNYWF9DT01QSUxFUiA9IFwiY2xhbmcrK1wiO1xuICAgIHNjb3BlLkFSID0gXCJsbHZtLWFyXCI7XG4gICAgc2NvcGUuUkFOTElCID0gXCJsbHZtLXJhbmxpYlwiO1xuICAgIHNjb3BlLkxJTktFUiA9IFwibGxkXCI7XG4gICAgc2NvcGUuTk0gPSBcImxsdm0tbm1cIjtcbiAgICBzY29wZS5PQkpDT1BZID0gXCJsbHZtLW9iamNvcHlcIjtcbiAgICBzY29wZS5PQkpEVU1QID0gXCJsbHZtLW9iamR1bXBcIjtcbiAgICBzY29wZS5TVFJJUCA9IFwibGx2bS1zdHJpcFwiO1xuICAgIHJldHVybjtcbiAgfVxuXG4gIGNvbnN0IGdjY1BhdGggPSBhd2FpdCBmaW5kUHJvZ3JhbShcImdjY1wiKTtcbiAgaWYgKGdjY1BhdGgpIHtcbiAgICBsb2dnZXIuaW5mbyhcIlRoZSBDIGNvbXBpbGVyIGlkZW50aWZpY2F0aW9uIGlzIEdOVSBhLmIuY1wiKTtcbiAgICBzY29wZS5BU01fQ09NUElMRVIgPSBcImdjY1wiO1xuICAgIHNjb3BlLkNfQ09NUElMRVIgPSBcImdjY1wiO1xuICAgIHNjb3BlLkNYWF9DT01QSUxFUiA9IFwiZysrXCI7XG4gICAgc2NvcGUuQVIgPSBcImFyXCI7XG4gICAgc2NvcGUuUkFOTElCID0gXCJyYW5saWJcIjtcbiAgICBzY29wZS5MSU5LRVIgPSBcImxkXCI7XG4gICAgc2NvcGUuTk0gPSBcIm5tXCI7XG4gICAgc2NvcGUuT0JKQ09QWSA9IFwib2JqY29weVwiO1xuICAgIHNjb3BlLk9CSkRVTVAgPSBcIm9iamR1bXBcIjtcbiAgICBzY29wZS5TVFJJUCA9IFwic3RyaXBcIjtcbiAgICByZXR1cm47XG4gIH1cblxuICB0aHJvdyBgQ2FuIG5vdCBkZXRlcm1pbmUgY29tcGlsZXJgO1xufVxuIiwiLypcbiAqIE1JVCBMaWNlbnNlXG4gKlxuICogQ29weXJpZ2h0IChjKSAyMDI1ICBZdXJpaSBZYWt1YmluICh5dXJpaS55YWt1YmluQGdtYWlsLmNvbSlcbiAqXG4gKiBQZXJtaXNzaW9uIGlzIGdyYW50ZWQgdG8gdXNlLCBjb3B5LCBtb2RpZnksIGFuZCBkaXN0cmlidXRlIHRoaXMgc29mdHdhcmVcbiAqIHVuZGVyIHRoZSBNSVQgTGljZW5zZS4gU2VlIExJQ0VOU0UgZmlsZSBmb3IgZGV0YWlscy5cbiAqL1xuXG5pbXBvcnQgeyBJbnRlcmZhY2VUYXNrIH0gZnJvbSBcIkAvY29yZS9NYWtlSW50ZXJmYWNlc1wiO1xuaW1wb3J0IHsgQWJzb2x1dGVQYXRoIH0gZnJvbSBcIkAvY29yZS9BYnNvbHV0ZVBhdGhcIjtcbmltcG9ydCB7IGltcG9ydE1vZHVsZSB9IGZyb20gXCJAL3V0aWxzL01vZHVsZVwiO1xuaW1wb3J0IHsgVmFyaWFibGVNYXAgfSBmcm9tIFwiQC9jb3JlL1Njb3BlXCI7XG5pbXBvcnQgeyBTY3JpcHRDb250ZXh0IH0gZnJvbSBcIkAvY29yZS9TY3JpcHRDb250ZXh0XCI7XG5pbXBvcnQgeyBTaW1wbGVPYmplY3QgfSBmcm9tIFwiQC9jb3JlL1NpbXBsZU9iamVjdFwiO1xuaW1wb3J0IHsgTG9nZ2VyIH0gZnJvbSBcIkAvbG9nZ2VyXCI7XG5cbmNvbnN0IGxvZ2dlciA9IExvZ2dlci5jcmVhdGUoaW1wb3J0Lm1ldGEudXJsKTtcblxuZXhwb3J0IGNsYXNzIEV4ZWNTY3JpcHRUYXNrIGV4dGVuZHMgSW50ZXJmYWNlVGFzayB7XG4gIHByaXZhdGUgX3ZhcmlhYmxlTWFwOiBWYXJpYWJsZU1hcDtcbiAgcHJpdmF0ZSBfc2NyaXB0OiBBYnNvbHV0ZVBhdGggfCBGdW5jdGlvbjtcblxuICBwdWJsaWMgY29uc3RydWN0b3IodmFyaWFibGVNYXA6IFZhcmlhYmxlTWFwLCBzY3JpcHQ6IEFic29sdXRlUGF0aCB8IEZ1bmN0aW9uKSB7XG4gICAgc3VwZXIoKTtcbiAgICB0aGlzLl92YXJpYWJsZU1hcCA9IHZhcmlhYmxlTWFwO1xuICAgIHRoaXMuX3NjcmlwdCA9IHNjcmlwdDtcbiAgfVxuXG4gIHB1YmxpYyBhc3luYyBleGVjdXRlKCk6IFByb21pc2U8dm9pZD4ge1xuICAgIGxldCBmdW5jID0gdGhpcy5fc2NyaXB0O1xuICAgIGlmIChmdW5jIGluc3RhbmNlb2YgQWJzb2x1dGVQYXRoKSB7XG4gICAgICBjb25zdCBzY3JpcHRVcmwgPSBmdW5jLnRvSlNPTigpOyAvLyBUT0RPOiB0b1N0cmluZygpXG4gICAgICBsb2dnZXIuZGVidWcoXCJJbXBvcnRcIiwgc2NyaXB0VXJsKTtcbiAgICAgIGZ1bmMgPSAoYXdhaXQgaW1wb3J0TW9kdWxlKHNjcmlwdFVybCkpLmRlZmF1bHQ7XG4gICAgfVxuICAgIGlmIChmdW5jIGluc3RhbmNlb2YgRnVuY3Rpb24pIHtcbiAgICAgIGNvbnN0IG1rID0gU2NyaXB0Q29udGV4dC5jcmVhdGUodGhpcy5fdmFyaWFibGVNYXApO1xuICAgICAgY29uc3QgcmVzdWx0ID0gZnVuYyhtayk7XG4gICAgICBpZiAocmVzdWx0IGluc3RhbmNlb2YgUHJvbWlzZSlcbiAgICAgICAgYXdhaXQgcmVzdWx0O1xuICAgIH1cbiAgICBlbHNlIHtcbiAgICAgIHRocm93IG5ldyBFcnJvcihgVGhlcmUgaXMgbm8gRnVuY3Rpb25gKTtcbiAgICB9XG4gIH1cblxuICBwdWJsaWMgdG9KU09OKCk6IFNpbXBsZU9iamVjdCB7XG4gICAgcmV0dXJuIHtcbiAgICAgIHR5cGU6IEV4ZWNTY3JpcHRUYXNrLm5hbWUsXG4gICAgICB2YXJpYWJsZU1hcDogdGhpcy5fdmFyaWFibGVNYXAsXG4gICAgICBzY3JpcHQ6IHRoaXMuX3NjcmlwdCxcbiAgICB9XG4gIH1cbn07XG4iLCIvKlxuICogTUlUIExpY2Vuc2VcbiAqXG4gKiBDb3B5cmlnaHQgKGMpIDIwMjUgIFl1cmlpIFlha3ViaW4gKHl1cmlpLnlha3ViaW5AZ21haWwuY29tKVxuICpcbiAqIFBlcm1pc3Npb24gaXMgZ3JhbnRlZCB0byB1c2UsIGNvcHksIG1vZGlmeSwgYW5kIGRpc3RyaWJ1dGUgdGhpcyBzb2Z0d2FyZVxuICogdW5kZXIgdGhlIE1JVCBMaWNlbnNlLiBTZWUgTElDRU5TRSBmaWxlIGZvciBkZXRhaWxzLlxuICovXG5cbmltcG9ydCBmcyBmcm9tIFwibm9kZTpmc1wiO1xuXG5pbXBvcnQgeyBJbnRlcmZhY2VUYXNrIH0gZnJvbSBcIkAvY29yZS9NYWtlSW50ZXJmYWNlc1wiO1xuaW1wb3J0IHsgQWJzb2x1dGVQYXRoIH0gZnJvbSBcIkAvY29yZS9BYnNvbHV0ZVBhdGhcIjtcbmltcG9ydCB7IFNpbXBsZU9iamVjdCB9IGZyb20gXCJAL2NvcmUvU2ltcGxlT2JqZWN0XCI7XG5pbXBvcnQgeyBMb2dnZXIgfSBmcm9tIFwiQC9sb2dnZXJcIjtcblxuY29uc3QgbG9nZ2VyID0gTG9nZ2VyLmNyZWF0ZShpbXBvcnQubWV0YS51cmwpO1xuXG5pbnRlcmZhY2UgRW50cnkge1xuICBzcmM6IEFic29sdXRlUGF0aDtcbiAgZGVzdDogQWJzb2x1dGVQYXRoO1xufTtcblxuZXhwb3J0IGNsYXNzIEZpbGVJbnN0YWxsYXRpb25UYXNrIGV4dGVuZHMgSW50ZXJmYWNlVGFzayB7XG4gIHByaXZhdGUgX2VudHJpZXM6IEVudHJ5W107XG5cbiAgcHVibGljIGNvbnN0cnVjdG9yKCkge1xuICAgIHN1cGVyKCk7XG4gICAgdGhpcy5fZW50cmllcyA9IFtdO1xuICB9XG5cbiAgcHVibGljIGFzeW5jIGV4ZWN1dGUoKTogUHJvbWlzZTx2b2lkPiB7XG4gICAgZm9yIChjb25zdCB7c3JjLCBkZXN0fSBvZiB0aGlzLl9lbnRyaWVzKSB7XG4gICAgICBsb2dnZXIubm90aWNlKFwiSW5zdGFsbGluZzogXCIgKyBkZXN0KTtcbiAgICAgIGF3YWl0IGZzLnByb21pc2VzLm1rZGlyKGRlc3QuZGlybmFtZSgpLnRvUGF0aCgpLCB7IHJlY3Vyc2l2ZTogdHJ1ZSB9KTtcbiAgICAgIGF3YWl0IGZzLnByb21pc2VzLmNwKHNyYy50b1BhdGgoKSwgZGVzdC50b1BhdGgoKSwgeyBmb3JjZTogdHJ1ZSB9KTtcbiAgICB9XG4gIH1cblxuICBwdWJsaWMgYWRkKHNyYzogQWJzb2x1dGVQYXRoLCBkZXN0OiBBYnNvbHV0ZVBhdGgpIHtcbiAgICB0aGlzLl9lbnRyaWVzLnB1c2goe3NyYywgZGVzdH0pO1xuICB9XG5cbiAgcHVibGljIHN0YXRpYyBmcm9tSlNPTihvOiBTaW1wbGVPYmplY3QpIHtcbiAgICBjb25zdCB0YXNrID0gbmV3IEZpbGVJbnN0YWxsYXRpb25UYXNrO1xuICAgIGZvciAoY29uc3QgaXRlciBvZiAobyBhcyBhbnkpLmVudHJpZXMgYXMgRW50cnlbXSlcbiAgICAgIHRhc2suX2VudHJpZXMucHVzaChpdGVyKTtcbiAgICByZXR1cm4gdGFzaztcbiAgfVxuXG4gIHB1YmxpYyB0b0pTT04oKTogU2ltcGxlT2JqZWN0IHtcbiAgICByZXR1cm4ge1xuICAgICAgdHlwZTogRmlsZUluc3RhbGxhdGlvblRhc2submFtZSxcbiAgICAgIGVudHJpZXM6IHRoaXMuX2VudHJpZXMsXG4gICAgfVxuICB9XG59O1xuXG5TaW1wbGVPYmplY3QucmVnaXN0ZXJJbnN0YW5jZUNyZWF0b3IoRmlsZUluc3RhbGxhdGlvblRhc2submFtZSwgRmlsZUluc3RhbGxhdGlvblRhc2suZnJvbUpTT04pO1xuIiwiLypcbiAqIE1JVCBMaWNlbnNlXG4gKlxuICogQ29weXJpZ2h0IChjKSAyMDI1ICBZdXJpaSBZYWt1YmluICh5dXJpaS55YWt1YmluQGdtYWlsLmNvbSlcbiAqXG4gKiBQZXJtaXNzaW9uIGlzIGdyYW50ZWQgdG8gdXNlLCBjb3B5LCBtb2RpZnksIGFuZCBkaXN0cmlidXRlIHRoaXMgc29mdHdhcmVcbiAqIHVuZGVyIHRoZSBNSVQgTGljZW5zZS4gU2VlIExJQ0VOU0UgZmlsZSBmb3IgZGV0YWlscy5cbiAqL1xuXG5pbXBvcnQgeyBQYXRoIH0gZnJvbSBcIkAvdXRpbHMvUGF0aFwiO1xuaW1wb3J0IHsgSG9zdCB9IGZyb20gXCJAL3V0aWxzL0hvc3RcIjtcbmltcG9ydCB7IGZpbGVFeGlzdHMsIGZpbGVFeGlzdHNTeW5jIH0gZnJvbSBcIkAvdXRpbHMvRmlsZVN5c3RlbVwiO1xuXG5mdW5jdGlvbiBwb3NzaWJsZVByb2dyYW1MaXN0KG5hbWU6IHN0cmluZykge1xuICBpZiAoSG9zdC5leGVjdXRhYmxlU3VmZml4KVxuICAgIG5hbWUgKz0gSG9zdC5leGVjdXRhYmxlU3VmZml4O1xuXG4gIGNvbnN0IHJlc3VsdCA9IFtdO1xuICBjb25zdCBwYXRocyA9IChwcm9jZXNzLmVudi5QQVRIIHx8IFwiXCIpLnNwbGl0KFBhdGguZGVsaW1pdGVyKTtcbiAgZm9yIChjb25zdCBpdGVyIG9mIHBhdGhzKSB7XG4gICAgY29uc3QgZmlsZW5hbWUgPSBQYXRoLnJlc29sdmUoaXRlciwgbmFtZSk7XG4gICAgcmVzdWx0LnB1c2goZmlsZW5hbWUpO1xuICB9XG5cbiAgcmV0dXJuIHJlc3VsdDtcbn1cblxuZXhwb3J0IGFzeW5jIGZ1bmN0aW9uIGZpbmRQcm9ncmFtKG5hbWU6IHN0cmluZyk6IFByb21pc2U8c3RyaW5nIHwgdW5kZWZpbmVkPiB7XG4gIGZvciAoY29uc3QgaXRlciBvZiBwb3NzaWJsZVByb2dyYW1MaXN0KG5hbWUpKSB7XG4gICAgaWYgKGF3YWl0IGZpbGVFeGlzdHMoaXRlcikpXG4gICAgICByZXR1cm4gaXRlcjtcbiAgfVxuICByZXR1cm4gdW5kZWZpbmVkO1xufVxuXG5leHBvcnQgZnVuY3Rpb24gZmluZFByb2dyYW1TeW5jKG5hbWU6IHN0cmluZyk6IHN0cmluZyB8IHVuZGVmaW5lZCB7XG4gIGZvciAoY29uc3QgaXRlciBvZiBwb3NzaWJsZVByb2dyYW1MaXN0KG5hbWUpKSB7XG4gICAgaWYgKGZpbGVFeGlzdHNTeW5jKGl0ZXIpKVxuICAgICAgcmV0dXJuIGl0ZXI7XG4gIH1cbiAgcmV0dXJuIHVuZGVmaW5lZDtcbn1cbiIsIi8qXG4gKiBNSVQgTGljZW5zZVxuICpcbiAqIENvcHlyaWdodCAoYykgMjAyNSAgWXVyaWkgWWFrdWJpbiAoeXVyaWkueWFrdWJpbkBnbWFpbC5jb20pXG4gKlxuICogUGVybWlzc2lvbiBpcyBncmFudGVkIHRvIHVzZSwgY29weSwgbW9kaWZ5LCBhbmQgZGlzdHJpYnV0ZSB0aGlzIHNvZnR3YXJlXG4gKiB1bmRlciB0aGUgTUlUIExpY2Vuc2UuIFNlZSBMSUNFTlNFIGZpbGUgZm9yIGRldGFpbHMuXG4gKi9cblxuaW1wb3J0IHsgU2ltcGxlT2JqZWN0IH0gZnJvbSBcIkAvY29yZS9TaW1wbGVPYmplY3RcIjtcbmltcG9ydCB7IEludGVyZmFjZVRhc2sgfSBmcm9tIFwiQC9jb3JlL01ha2VJbnRlcmZhY2VzXCI7XG5pbXBvcnQgeyBMb2dnZXIgfSBmcm9tIFwiQC9sb2dnZXJcIjtcbmltcG9ydCB7IEFic29sdXRlUGF0aCB9IGZyb20gXCIuL0Fic29sdXRlUGF0aFwiO1xuXG5jb25zdCBsb2dnZXIgPSBMb2dnZXIuY3JlYXRlKGltcG9ydC5tZXRhLnVybCk7XG5cbmV4cG9ydCBjbGFzcyBHb2FsVGFyZ2V0IHtcbiAgcHJpdmF0ZSBfbWVzc2FnZTogc3RyaW5nIHwgdW5kZWZpbmVkO1xuICBwcml2YXRlIF9uYW1lOiBzdHJpbmcgfCB1bmRlZmluZWQ7XG4gIHByaXZhdGUgX291dHB1dDogc3RyaW5nIHwgdW5kZWZpbmVkO1xuICBwcml2YXRlIF9kZXBlbmRzID0gbmV3IEFycmF5PHN0cmluZz47XG4gIHByaXZhdGUgX3Rhc2tzID0gbmV3IEFycmF5PEludGVyZmFjZVRhc2s+O1xuXG4gIGNvbnN0cnVjdG9yKG5hbWU/OiBzdHJpbmcpIHtcbiAgICB0aGlzLl9uYW1lID0gbmFtZTtcbiAgfVxuXG4gIGdldCBtZXNzYWdlKCk6IHN0cmluZyB8IHVuZGVmaW5lZCB7XG4gICAgcmV0dXJuIHRoaXMuX21lc3NhZ2U7XG4gIH1cblxuICBzZXQgbWVzc2FnZSh2YWx1ZTogc3RyaW5nKSB7XG4gICAgdGhpcy5fbWVzc2FnZSA9IHZhbHVlO1xuICB9XG5cbiAgZ2V0IG5hbWUoKTogc3RyaW5nIHwgdW5kZWZpbmVkIHtcbiAgICByZXR1cm4gdGhpcy5fbmFtZTtcbiAgfVxuXG4gIGdldCBvdXRwdXQoKTogc3RyaW5nIHwgdW5kZWZpbmVkIHtcbiAgICByZXR1cm4gdGhpcy5fb3V0cHV0O1xuICB9XG5cbiAgc2V0IG91dHB1dCh2YWx1ZTogQWJzb2x1dGVQYXRoKSB7XG4gICAgdGhpcy5fb3V0cHV0ID0gdmFsdWUudG9QYXRoKCk7XG4gIH1cblxuICBnZXQgZGVwZW5kcygpOiBzdHJpbmdbXSB7XG4gICAgcmV0dXJuIHRoaXMuX2RlcGVuZHM7XG4gIH1cblxuICBwdWJsaWMgYWRkRGVwZW5kZW5jeSguLi52YWx1ZTogc3RyaW5nW10pIHtcbiAgICB0aGlzLl9kZXBlbmRzLnB1c2goLi4udmFsdWUpO1xuICB9XG5cbiAgcHVibGljIGFkZFRhc2sodGFzazogSW50ZXJmYWNlVGFzaykge1xuICAgIHRoaXMuX3Rhc2tzLnB1c2godGFzayk7XG4gIH1cblxuICBhc3luYyBkb1dvcmsoKTogUHJvbWlzZTx2b2lkPiB7XG4gICAgZm9yIChjb25zdCB0YXNrIG9mIHRoaXMuX3Rhc2tzKSB7XG4gICAgICBjb25zdCByZXMgPSB0YXNrLmV4ZWN1dGUoKTtcbiAgICAgIGlmIChyZXMgaW5zdGFuY2VvZiBQcm9taXNlKVxuICAgICAgICBhd2FpdCByZXM7XG4gICAgfVxuICB9XG5cbiAgcHVibGljIHRvSlNPTigpOiBTaW1wbGVPYmplY3Qge1xuICAgIGNvbnN0IGpzb246IGFueSA9IHtcbiAgICAgIHR5cGU6IEdvYWxUYXJnZXQubmFtZSxcbiAgICAgIGRlcGVuZHM6IHRoaXMuX2RlcGVuZHMsXG4gICAgICB0YXNrczogdGhpcy5fdGFza3MsXG4gICAgfTtcbiAgICBpZiAodGhpcy5fbWVzc2FnZSkge1xuICAgICAganNvbi5tZXNzYWdlID0gdGhpcy5fbWVzc2FnZTtcbiAgICB9XG4gICAgaWYgKHRoaXMuX25hbWUpIHtcbiAgICAgIGpzb24ubmFtZSA9IHRoaXMuX25hbWU7XG4gICAgfVxuICAgIGlmICh0aGlzLl9vdXRwdXQpIHtcbiAgICAgIGpzb24ub3V0cHV0ID0gdGhpcy5fb3V0cHV0O1xuICAgIH1cbiAgICByZXR1cm4ganNvbjtcbiAgfVxufTtcblxuZXhwb3J0IGNsYXNzIEdvYWxDb2xsZWN0aW9uIHtcbiAgcHJpdmF0ZSBfZW50cmllcyA9IG5ldyBBcnJheTxHb2FsVGFyZ2V0PjtcblxuICBwdWJsaWMgZ2V0IEVOVFJJRVMoKSB7XG4gICAgcmV0dXJuIHRoaXMuX2VudHJpZXM7XG4gIH1cblxuICBwdWJsaWMgYWRkVGFyZ2V0KGdlOiBHb2FsVGFyZ2V0KSB7XG4gICAgaWYgKGdlLm5hbWUgJiYgdGhpcy5fZW50cmllcy5maW5kKChpKSA9PiBpLm5hbWUgPT09IGdlLm5hbWUpKVxuICAgICAgdGhyb3cgbmV3IEVycm9yKGBObWFlIFwiJHtnZS5uYW1lfVwiIGV4aXN0c2ApO1xuICAgIGlmIChnZS5vdXRwdXQgJiYgdGhpcy5fZW50cmllcy5maW5kKChpKSA9PiBpLm91dHB1dCA9PT0gZ2Uub3V0cHV0KSlcbiAgICAgIHRocm93IG5ldyBFcnJvcihgT3V0cHV0IFwiJHtnZS5vdXRwdXR9XCIgZXhpc3RzYCk7XG4gICAgdGhpcy5fZW50cmllcy5wdXNoKGdlKTtcbiAgfVxuXG4gIHB1YmxpYyBnZXRUYXJnZXQobmFtZTogc3RyaW5nKTogR29hbFRhcmdldCB8IHVuZGVmaW5lZCB7XG4gICAgaWYgKCFuYW1lKVxuICAgICAgcmV0dXJuIHVuZGVmaW5lZDtcbiAgICByZXR1cm4gdGhpcy5fZW50cmllcy5maW5kKChpKSA9PiBpLm5hbWUgPT09IG5hbWUpO1xuICB9XG5cbiAgcHJpdmF0ZSBhZGRUYXJnZXRMaXN0SW1wbChuYW1lOiBzdHJpbmcsIHJlc3VsdDogQXJyYXk8R29hbFRhcmdldD4pIHtcbiAgICBpZiAocmVzdWx0LmZpbmQoaSA9PiBpLm5hbWUgPT09IG5hbWUgfHwgaS5vdXRwdXQgPT09IG5hbWUpKSB7XG4gICAgICByZXR1cm47XG4gICAgfVxuXG4gICAgY29uc3QgZ29hbCA9IHRoaXMuX2VudHJpZXMuZmluZChpID0+IGkubmFtZSA9PT0gbmFtZSB8fCBpLm91dHB1dCA9PT0gbmFtZSk7XG4gICAgaWYgKCFnb2FsKSB7XG4gICAgICByZXR1cm47XG4gICAgfVxuXG4gICAgZm9yIChjb25zdCBpdGVyIG9mIGdvYWwuZGVwZW5kcykge1xuICAgICAgdGhpcy5hZGRUYXJnZXRMaXN0SW1wbChpdGVyLnRvU3RyaW5nKCksIHJlc3VsdCk7XG4gICAgfVxuXG4gICAgcmVzdWx0LnB1c2goZ29hbCk7XG4gIH1cbiAgXG4gIHB1YmxpYyBnZXRUYXJnZXRMaXN0KG5hbWU6c3RyaW5nKSB7XG4gICAgY29uc3QgcmVzdWx0ID0gbmV3IEFycmF5PEdvYWxUYXJnZXQ+O1xuICAgIHRoaXMuYWRkVGFyZ2V0TGlzdEltcGwobmFtZSwgcmVzdWx0KTtcbiAgICByZXR1cm4gcmVzdWx0O1xuICB9XG4gIFxuICBwdWJsaWMgdG9KU09OKCkge1xuICAgIHJldHVybiB7XG4gICAgICB0eXBlOiBHb2FsQ29sbGVjdGlvbi5uYW1lLFxuICAgICAgZW50cmllczogdGhpcy5fZW50cmllcyxcbiAgICB9O1xuICB9XG59O1xuIiwiLypcbiAqIE1JVCBMaWNlbnNlXG4gKlxuICogQ29weXJpZ2h0IChjKSAyMDI1ICBZdXJpaSBZYWt1YmluICh5dXJpaS55YWt1YmluQGdtYWlsLmNvbSlcbiAqXG4gKiBQZXJtaXNzaW9uIGlzIGdyYW50ZWQgdG8gdXNlLCBjb3B5LCBtb2RpZnksIGFuZCBkaXN0cmlidXRlIHRoaXMgc29mdHdhcmVcbiAqIHVuZGVyIHRoZSBNSVQgTGljZW5zZS4gU2VlIExJQ0VOU0UgZmlsZSBmb3IgZGV0YWlscy5cbiAqL1xuXG5pbXBvcnQgeyBUYXJnZXROYW1lIH0gZnJvbSBcIkAvY29yZS9UYXJnZXROYW1lXCI7XG5pbXBvcnQgeyBBYnNvbHV0ZVBhdGggfSBmcm9tIFwiQC9jb3JlL0Fic29sdXRlUGF0aFwiO1xuaW1wb3J0IHsgU2ltcGxlT2JqZWN0IH0gZnJvbSBcIkAvY29yZS9TaW1wbGVPYmplY3RcIjtcblxuZXhwb3J0IGNsYXNzIEluc3RhbGxFbnRpdHkge1xuICBwcml2YXRlIF92YWx1ZTogQWJzb2x1dGVQYXRoIHwgVGFyZ2V0TmFtZTtcbiAgcHJpdmF0ZSBfZGVzdGluYXRpb246IEFic29sdXRlUGF0aDtcbiAgcHJpdmF0ZSBfYmFzZURpcj86IEFic29sdXRlUGF0aDtcblxuICBwdWJsaWMgY29uc3RydWN0b3IodmFsdWU6IEFic29sdXRlUGF0aCB8IFRhcmdldE5hbWUsIGRlc3RpbmF0aW9uOiBBYnNvbHV0ZVBhdGgsIGJhc2VEaXI/OiBBYnNvbHV0ZVBhdGgpIHtcbiAgICB0aGlzLl92YWx1ZSA9IHZhbHVlO1xuICAgIHRoaXMuX2Rlc3RpbmF0aW9uID0gZGVzdGluYXRpb247XG4gICAgdGhpcy5fYmFzZURpciA9IGJhc2VEaXI7XG4gIH1cblxuICBwdWJsaWMgZ2V0IFZBTFVFICgpIHtcbiAgICByZXR1cm4gdGhpcy5fdmFsdWU7XG4gIH1cblxuICBwdWJsaWMgZ2V0IERFU1RJTkFUSU9OICgpIHtcbiAgICByZXR1cm4gdGhpcy5fZGVzdGluYXRpb247XG4gIH1cblxuICBwdWJsaWMgZ2V0IEJBU0VfRElSICgpIHtcbiAgICByZXR1cm4gdGhpcy5fYmFzZURpcjtcbiAgfVxuXG4gIHB1YmxpYyB0b0pTT04oKTogU2ltcGxlT2JqZWN0IHtcbiAgICBjb25zdCBqc29uOiBTaW1wbGVPYmplY3QgPSB7XG4gICAgICB0eXBlOiBJbnN0YWxsRW50aXR5Lm5hbWUsXG4gICAgICB2YWx1ZTogdGhpcy5fdmFsdWUsXG4gICAgICBkZXN0aW5hdGlvbjogdGhpcy5fZGVzdGluYXRpb24sXG4gICAgfTtcbiAgICBpZiAodGhpcy5fYmFzZURpcilcbiAgICAgIGpzb24uYmFzZURpciA9IHRoaXMuX2Jhc2VEaXI7XG4gICAgcmV0dXJuIGpzb247XG4gIH1cbn07XG4iLCIvKlxuICogTUlUIExpY2Vuc2VcbiAqXG4gKiBDb3B5cmlnaHQgKGMpIDIwMjUgIFl1cmlpIFlha3ViaW4gKHl1cmlpLnlha3ViaW5AZ21haWwuY29tKVxuICpcbiAqIFBlcm1pc3Npb24gaXMgZ3JhbnRlZCB0byB1c2UsIGNvcHksIG1vZGlmeSwgYW5kIGRpc3RyaWJ1dGUgdGhpcyBzb2Z0d2FyZVxuICogdW5kZXIgdGhlIE1JVCBMaWNlbnNlLiBTZWUgTElDRU5TRSBmaWxlIGZvciBkZXRhaWxzLlxuICovXG5cbmltcG9ydCB7IE1ha2VDb250ZXh0IH0gZnJvbSBcIkAvY29yZS9CYXNlQ29udGV4dFwiO1xuaW1wb3J0IHsgZmlsZUV4aXN0c1N5bmMgfSBmcm9tIFwiQC91dGlscy9GaWxlU3lzdGVtXCI7XG5pbXBvcnQgeyBQcm9qZWN0Q29udGV4dCB9IGZyb20gXCJAL2NvcmUvUHJvamVjdENvbnRleHRcIjtcbmltcG9ydCB7IFNjb3BlSGVscGVyLCBWYXJpYW50TWFwLCBWYXJpYWJsZU1hcCB9IGZyb20gXCJAL2NvcmUvU2NvcGVcIjtcbmltcG9ydCB7IHJlcXVpcmVTeW5jIH0gZnJvbSBcIkAvdXRpbHMvTW9kdWxlXCI7XG5pbXBvcnQgeyBDVVNUT01fVkFSSUFCTEVfR1JPVVAgfSBmcm9tIFwiQC9Db25zdGFudHNcIjtcbmltcG9ydCB7IEFic29sdXRlUGF0aCB9IGZyb20gXCJAL2NvcmUvQWJzb2x1dGVQYXRoXCI7XG5pbXBvcnQgeyBMb2dnZXIgfSBmcm9tIFwiQC9sb2dnZXJcIjtcblxuY29uc3QgbG9nZ2VyID0gTG9nZ2VyLmNyZWF0ZShpbXBvcnQubWV0YS51cmwpO1xuXG5leHBvcnQgY2xhc3MgTG9jYWxNYWtlQ29udGV4dCBleHRlbmRzIE1ha2VDb250ZXh0IHtcbiAgcHJpdmF0ZSBfcHJvamVjdDogUHJvamVjdENvbnRleHQ7XG5cbiAgcHVibGljIGNvbnN0cnVjdG9yKHNjb3BlOiBWYXJpYWJsZU1hcCwgcHJvamVjdDogUHJvamVjdENvbnRleHQpIHtcbiAgICBzdXBlcihzY29wZSk7XG4gICAgdGhpcy5fcHJvamVjdCA9IHByb2plY3Q7XG4gIH1cblxuICBwdWJsaWMgZXhlY3V0ZVNjcmlwdChzY3JpcHQ6IGFueSwgcGFyYW1zOiBhbnkpIHtcbiAgICB0aGlzLl9wcm9qZWN0LmV4ZWN1dGVTY3JpcHRTeW5jKHRoaXMuX3Njb3BlLCBzY3JpcHQsIHBhcmFtcyk7XG4gIH1cblxuICBwdWJsaWMgYWRkQ2FjaGVWYXJpYWJsZXMocGFyYW1zOiBzdHJpbmcgfCBWYXJpYW50TWFwKTogdm9pZCB7XG4gICAgbGV0IHZhcmlhYmxlcyA9IHBhcmFtcztcbiAgICBpZiAodHlwZW9mIHBhcmFtcyA9PT0gXCJzdHJpbmdcIikge1xuICAgICAgY29uc3QgZmlsZW5hbWUgPSBTY29wZUhlbHBlci5nZXQodGhpcy5fc2NvcGUsIFwiU09VUkNFX0RJUlwiKS5yZXNvbHZlKHBhcmFtcykudG9TdHJpbmcoKTtcbiAgICAgIGlmICghZmlsZUV4aXN0c1N5bmMoZmlsZW5hbWUpKVxuICAgICAgICByZXR1cm47XG4gICAgICB2YXJpYWJsZXMgPSByZXF1aXJlU3luYyhmaWxlbmFtZSk7XG4gICAgfVxuXG4gICAgU2NvcGVIZWxwZXIuZGVmaW5lVmFyaWFibGVzSW5WYXJpYWJsZU1hcCh0aGlzLl9zY29wZSwgQ1VTVE9NX1ZBUklBQkxFX0dST1VQLCB2YXJpYWJsZXMpO1xuICB9XG5cbiAgcHVibGljIGFkZFN1YmRpcmVjdG9yeShzb3VyY2VEaXI6IHN0cmluZyB8IEFic29sdXRlUGF0aCwgYmluYXJ5RGlyPzogc3RyaW5nIHwgQWJzb2x1dGVQYXRoKTogdm9pZCB7XG4gICAgdGhpcy5fcHJvamVjdC5hZGRTdWJkaXJlY3RvcnkodGhpcy5fc2NvcGUsIHNvdXJjZURpciwgYmluYXJ5RGlyKTtcbiAgfVxufTtcbiIsIi8qXG4gKiBNSVQgTGljZW5zZVxuICpcbiAqIENvcHlyaWdodCAoYykgMjAyNSAgWXVyaWkgWWFrdWJpbiAoeXVyaWkueWFrdWJpbkBnbWFpbC5jb20pXG4gKlxuICogUGVybWlzc2lvbiBpcyBncmFudGVkIHRvIHVzZSwgY29weSwgbW9kaWZ5LCBhbmQgZGlzdHJpYnV0ZSB0aGlzIHNvZnR3YXJlXG4gKiB1bmRlciB0aGUgTUlUIExpY2Vuc2UuIFNlZSBMSUNFTlNFIGZpbGUgZm9yIGRldGFpbHMuXG4gKi9cblxuaW1wb3J0IHsgVGFyZ2V0RmlsZSB9IGZyb20gXCJAL2NvcmUvVGFyZ2V0RmlsZVwiO1xuaW1wb3J0IHsgVGFyZ2V0T2JqZWN0cyB9IGZyb20gXCJAL2NvcmUvVGFyZ2V0T2JqZWN0c1wiO1xuaW1wb3J0IHsgVGFyZ2V0SW5jbHVkZXMgfSBmcm9tIFwiQC9jb3JlL1RhcmdldEluY2x1ZGVzXCI7XG5pbXBvcnQgeyBWYXJpYW50TWFwIH0gZnJvbSBcIkAvY29yZS9TY29wZVwiO1xuaW1wb3J0IHsgQWJzb2x1dGVQYXRoIH0gZnJvbSBcIkAvY29yZS9BYnNvbHV0ZVBhdGhcIjtcbmltcG9ydCB7IFNvdXJjZUZpbGUgfSBmcm9tIFwiQC9jb3JlL1NvdXJjZUZpbGVcIjtcblxuZXhwb3J0IHR5cGUgQ29tcGlsZU9wdGlvbiA9IHN0cmluZyB8IHN0cmluZ1tdO1xuZXhwb3J0IHR5cGUgTGlua09wdGlvbiA9IHN0cmluZyB8IHN0cmluZ1tdO1xuXG5leHBvcnQgYWJzdHJhY3QgY2xhc3MgSW50ZXJmYWNlVGFzayB7XG4gIGFic3RyYWN0IGV4ZWN1dGUoKTogUHJvbWlzZTx2b2lkPiB8IHZvaWQ7XG59O1xuXG5leHBvcnQgYWJzdHJhY3QgY2xhc3MgSW50ZXJmYWNlU291cmNlRmlsZXMge1xuICBhYnN0cmFjdCBzZXRMYW5ndWFnZShsYW5ndWFnZTogc3RyaW5nKTogdm9pZDtcbiAgYWJzdHJhY3QgYWRkRGVmaW5pdGlvbnMoLi4uZGVmaW5pdGlvbnM6IHN0cmluZ1tdKTogdm9pZDtcbiAgYWJzdHJhY3QgYWRkQ29tcGlsZUZsYWdzKC4uLmZsYWdzOiBzdHJpbmdbXSk6IHZvaWQ7XG59O1xuXG5leHBvcnQgYWJzdHJhY3QgY2xhc3MgSW50ZXJmYWNlVGFyZ2V0IHtcbiAgYWJzdHJhY3QgZ2V0IHRhcmdldE5hbWUoKTogc3RyaW5nO1xuICBhYnN0cmFjdCBnZXQgdGFyZ2V0RmlsZSgpOiBUYXJnZXRGaWxlO1xuICBhYnN0cmFjdCBnZXQgaW5jbHVkZXMoKTogVGFyZ2V0SW5jbHVkZXM7XG4gIGFic3RyYWN0IGdldCBvYmplY3RzKCk6IFRhcmdldE9iamVjdHM7XG5cbiAgYWJzdHJhY3Qgc2V0UHJlZml4KHByZWZpeDogc3RyaW5nKTogdm9pZDsgIFxuICBhYnN0cmFjdCBzZXRTdWZmaXgoc3VmZml4OiBzdHJpbmcpOiB2b2lkO1xuICBhYnN0cmFjdCBzZXRPdXRwdXROYW1lKG91dHB1dE5hbWU6IHN0cmluZyk6IHZvaWQ7XG5cbiAgYWJzdHJhY3QgYWRkU291cmNlcyguLi5zb3VyY2VzOiBBcnJheTxUYXJnZXRPYmplY3RzIHwgU291cmNlRmlsZSB8IEFic29sdXRlUGF0aCB8IHN0cmluZz4pOiB2b2lkO1xuICBhYnN0cmFjdCBhZGRJbmNsdWRlcyguLi5pbmNsdWRlczogQXJyYXk8VGFyZ2V0SW5jbHVkZXMgfCBBYnNvbHV0ZVBhdGggfCBzdHJpbmc+KTogdm9pZDtcbiAgYWJzdHJhY3QgYWRkTGlicmFyaWVzKC4uLmxpYnJhcmllczogYW55KTogdm9pZDtcbiAgYWJzdHJhY3QgYWRkQ29tcGlsZU9wdGlvbnMoLi4ub3B0aW9uczogQ29tcGlsZU9wdGlvbltdKTogdm9pZDtcbiAgYWJzdHJhY3QgYWRkTGlua09wdGlvbnMoLi4ub3B0aW9uczogTGlua09wdGlvbltdKTogdm9pZDtcbiAgYWJzdHJhY3QgZ2V0U291cmNlRmlsZXMoLi4uc291cmNlczogYW55W10pOiBJbnRlcmZhY2VTb3VyY2VGaWxlcztcbiAgYWJzdHJhY3QgYWRkRGVmaW5pdGlvbnMoLi4uZGVmaW5pdGlvbnM6IGFueVtdKTogdm9pZDtcbiAgYWJzdHJhY3QgYWRkUHJlQnVpbGQoY29tbWFuZDogYW55LCBhcmdzOiBhbnlbXSk6IHZvaWQ7XG4gIGFic3RyYWN0IGFkZFBvc3RCdWlsZChjb21tYW5kOiBhbnksIGFyZ3M6IGFueVtdKTogdm9pZDtcblxuICBhYnN0cmFjdCBzZXRQb3NpdGlvbkluZGVwZW5kZW50Q29kZSh2YWx1ZTogYm9vbGVhbik6IHZvaWQ7XG4gIGFic3RyYWN0IGFkZFB1YmxpY0luY2x1ZGVzKC4uLmluY2x1ZGVzOiBBcnJheTxUYXJnZXRJbmNsdWRlcyB8IEFic29sdXRlUGF0aCB8IHN0cmluZz4pOiB2b2lkO1xuICBhYnN0cmFjdCBhZGRQdWJsaWNEZWZpbml0aW9ucyguLi5kZWZpbml0aW9uczogYW55KTogdm9pZDtcbiAgYWJzdHJhY3QgYWRkUHVibGljTGlicmFyaWVzKC4uLmxpYnJhcmllczogYW55W10pOiB2b2lkO1xuICBhYnN0cmFjdCBhZGRQdWJsaWNDb21waWxlT3B0aW9ucyguLi5vcHRpb25zOiBDb21waWxlT3B0aW9uW10pOiB2b2lkO1xuICBhYnN0cmFjdCBhZGRQdWJsaWNMaW5rT3B0aW9ucyguLi5vcHRpb25zOiBMaW5rT3B0aW9uW10pOiB2b2lkO1xufTtcblxuZXhwb3J0IGFic3RyYWN0IGNsYXNzIEludGVyZmFjZVNjcmlwdCB7XG4gIGFic3RyYWN0IG1lcmdlVmFyaWFibGVzKHZhcmlhYmxlczogVmFyaWFudE1hcCk6IHZvaWQ7XG59O1xuXG5leHBvcnQgaW50ZXJmYWNlIElHZW5lcmFsQ29udGV4dCB7XG4gIGdldFByb3BlcnR5KG5hbWU6IHN0cmluZyk6IGFueTtcbiAgc2V0UHJvcGVydHkobmFtZTogc3RyaW5nLCB2YWx1ZTogYW55KTogYm9vbGVhbjtcbiAgaGFzUHJvcGVydHkobmFtZTogc3RyaW5nKTogYm9vbGVhbjtcbiAgZGVsZXRlUHJvcGVydHkobmFtZTogc3RyaW5nKTogYm9vbGVhbjtcbiAgZ2V0UHJvcGVydHlOYW1lcygpOiBzdHJpbmdbXTtcblxuICBmaW5kUHJvZ3JhbShuYW1lOiBzdHJpbmcpOiBzdHJpbmcgfCB1bmRlZmluZWQ7XG59O1xuXG5leHBvcnQgaW50ZXJmYWNlIElNYWtlQ29udGV4dCBleHRlbmRzIElHZW5lcmFsQ29udGV4dCB7XG4gIGdldENhY2hlVmFyaWFibGVzKCk6IGFueTtcbiAgYWRkQ2FjaGVWYXJpYWJsZXMocGFyYW1zOiBzdHJpbmcgfCBWYXJpYW50TWFwKTogdm9pZDtcbiAgYWRkSW5jbHVkZURpcmVjdG9yaWVzKC4uLmRpcnM6IGFueVtdKTogdm9pZDtcbiAgYWRkU3ViZGlyZWN0b3J5KHNvdXJjZURpcjogc3RyaW5nIHwgQWJzb2x1dGVQYXRoLCBiaW5hcnlEaXI/OiBzdHJpbmcgfCBBYnNvbHV0ZVBhdGgpOiB2b2lkO1xuICBzY3JpcHQobmFtZTogc3RyaW5nKTogSW50ZXJmYWNlU2NyaXB0O1xuICBhZGRDdXN0b21TY3JpcHQoc2NyaXB0OiBzdHJpbmcsIHBhcmFtczogYW55KTogSW50ZXJmYWNlU2NyaXB0O1xuICB0YXJnZXQobmFtZTogc3RyaW5nKTogSW50ZXJmYWNlVGFyZ2V0O1xuICBhZGRPYmplY3RMaWJyYXJ5KG5hbWU6IHN0cmluZywgLi4uc291cmNlczogYW55W10pOiBJbnRlcmZhY2VUYXJnZXQ7XG4gIGFkZFN0YXRpY0xpYnJhcnkobmFtZTogc3RyaW5nLCAuLi5zb3VyY2VzOiBhbnlbXSk6IEludGVyZmFjZVRhcmdldDtcbiAgYWRkU2hhcmVkTGlicmFyeShuYW1lOiBzdHJpbmcsIC4uLnNvdXJjZXM6IGFueVtdKTogSW50ZXJmYWNlVGFyZ2V0O1xuICBhZGRFeGVjdXRhYmxlKG5hbWU6IHN0cmluZywgLi4uc291cmNlczogYW55W10pOiBJbnRlcmZhY2VUYXJnZXQ7XG4gIGV4ZWN1dGVTY3JpcHQoc2NyaXB0OiBhbnksIHBhcmFtczogYW55KTogdm9pZDtcbiAgaW5zdGFsbCh2YWx1ZTogYW55LCBwYXJhbXM6IGFueSk6IHZvaWQ7XG59O1xuIiwiLypcbiAqIE1JVCBMaWNlbnNlXG4gKlxuICogQ29weXJpZ2h0IChjKSAyMDI1ICBZdXJpaSBZYWt1YmluICh5dXJpaS55YWt1YmluQGdtYWlsLmNvbSlcbiAqXG4gKiBQZXJtaXNzaW9uIGlzIGdyYW50ZWQgdG8gdXNlLCBjb3B5LCBtb2RpZnksIGFuZCBkaXN0cmlidXRlIHRoaXMgc29mdHdhcmVcbiAqIHVuZGVyIHRoZSBNSVQgTGljZW5zZS4gU2VlIExJQ0VOU0UgZmlsZSBmb3IgZGV0YWlscy5cbiAqL1xuXG5pbXBvcnQgeyBQcm9qZWN0Q29udGV4dCB9IGZyb20gXCJAL2NvcmUvUHJvamVjdENvbnRleHRcIjtcbmltcG9ydCB7IFZhcmlhYmxlTWFwIH0gZnJvbSBcIkAvY29yZS9TY29wZVwiO1xuaW1wb3J0IHsgR2VuZXJhbENvbnRleHQsIGNyZWF0ZUNvbnRleHQgfSBmcm9tIFwiQC9jb3JlL0Jhc2VDb250ZXh0XCI7XG5cbmNvbnN0IEdMT0JBTCA9IFN5bWJvbChcIkdMT0JBTFwiKTtcbmNvbnN0IFNDT1BFID0gU3ltYm9sKFwiU0NPUEVcIik7XG5cbmV4cG9ydCBjbGFzcyBQbHVnaW5Db250ZXh0IGV4dGVuZHMgR2VuZXJhbENvbnRleHQge1xuICBbR0xPQkFMXTogUHJvamVjdENvbnRleHQ7XG4gIFtTQ09QRV06IFZhcmlhYmxlTWFwO1xuXG4gIHB1YmxpYyBjb25zdHJ1Y3RvcihnbG9iYWw6IFByb2plY3RDb250ZXh0LCB2YXJpYWJsZU1hcDogVmFyaWFibGVNYXApIHtcbiAgICBzdXBlcih2YXJpYWJsZU1hcCk7XG4gICAgdGhpc1tHTE9CQUxdID0gZ2xvYmFsO1xuICAgIHRoaXNbU0NPUEVdID0gdmFyaWFibGVNYXA7XG4gIH1cblxuICBwdWJsaWMgYWRkU3ViZGlyZWN0b3J5QWxpYXMoc3JjOiBhbnksIGRlc3Q6IGFueSkge1xuICAgIHRoaXNbR0xPQkFMXS5hZGRTdWJkaXJlY3RvcnlBbGlhcyh0aGlzW1NDT1BFXSwgc3JjLCBkZXN0KTtcbiAgfVxuXG4gIHB1YmxpYyBzdGF0aWMgY3JlYXRlKGdsb2JhbDogUHJvamVjdENvbnRleHQsIHZhcmlhYmxlTWFwOiBWYXJpYWJsZU1hcCkge1xuICAgIHJldHVybiBjcmVhdGVDb250ZXh0KG5ldyBQbHVnaW5Db250ZXh0KGdsb2JhbCwgdmFyaWFibGVNYXApKTtcbiAgfVxufTtcbiIsIi8qXG4gKiBNSVQgTGljZW5zZVxuICpcbiAqIENvcHlyaWdodCAoYykgMjAyNSAgWXVyaWkgWWFrdWJpbiAoeXVyaWkueWFrdWJpbkBnbWFpbC5jb20pXG4gKlxuICogUGVybWlzc2lvbiBpcyBncmFudGVkIHRvIHVzZSwgY29weSwgbW9kaWZ5LCBhbmQgZGlzdHJpYnV0ZSB0aGlzIHNvZnR3YXJlXG4gKiB1bmRlciB0aGUgTUlUIExpY2Vuc2UuIFNlZSBMSUNFTlNFIGZpbGUgZm9yIGRldGFpbHMuXG4gKi9cblxuaW1wb3J0IGZzIGZyb20gXCJub2RlOmZzXCI7XG5cbmltcG9ydCB7IEFMTF9UQVJHRVQsIElOU1RBTExfVEFSR0VUIH0gZnJvbSBcIkAvQ29uc3RhbnRzXCI7XG5pbXBvcnQgeyBBYnNvbHV0ZVBhdGggfSBmcm9tIFwiQC9jb3JlL0Fic29sdXRlUGF0aFwiO1xuaW1wb3J0IHsgZmlsZUV4aXN0cywgZmlsZUV4aXN0c1N5bmMgfSBmcm9tIFwiQC91dGlscy9GaWxlU3lzdGVtXCI7XG5pbXBvcnQgeyBUYXJnZXRDb2xsZWN0aW9uIH0gZnJvbSBcIkAvY29yZS9UYXJnZXRDb2xsZWN0aW9uXCI7XG5pbXBvcnQgeyBTY3JpcHRDb2xsZWN0aW9uIH0gZnJvbSBcIkAvY29yZS9TY3JpcHRDb2xsZWN0aW9uXCI7XG5pbXBvcnQgeyBHb2FsQ29sbGVjdGlvbiwgR29hbFRhcmdldCB9IGZyb20gXCJAL2NvcmUvR29hbENvbGxlY3Rpb25cIjtcbmltcG9ydCB7IFVzZXJNYWtlQ29udGV4dCB9IGZyb20gXCJAL2NvcmUvVXNlck1ha2VDb250ZXh0XCI7XG5pbXBvcnQgeyBMb2NhbE1ha2VDb250ZXh0IH0gZnJvbSBcIkAvY29yZS9Mb2NhbE1ha2VDb250ZXh0XCI7XG5pbXBvcnQgeyBUYXJnZXRDb21tYW5kIH0gZnJvbSBcIkAvY29yZS9UYXJnZXRcIjtcbmltcG9ydCB7IFN5c3RlbVNjb3BlIH0gZnJvbSBcIkAvY29yZS9TeXN0ZW1TY29wZVwiO1xuaW1wb3J0IHsgcmVxdWlyZVN5bmMgfSBmcm9tIFwiQC91dGlscy9Nb2R1bGVcIjtcbmltcG9ydCB7IExvZ2dlciB9IGZyb20gXCJAL2xvZ2dlclwiO1xuaW1wb3J0IHsgVGFyZ2V0TmFtZSB9IGZyb20gXCJAL2NvcmUvVGFyZ2V0TmFtZVwiO1xuaW1wb3J0IHsgSW5zdGFsbEVudGl0eSB9IGZyb20gXCJAL2NvcmUvSW5zdGFsbEVudGl0eVwiO1xuaW1wb3J0IHsgU2NyaXB0Q29udGV4dCB9IGZyb20gXCJAL2NvcmUvU2NyaXB0Q29udGV4dFwiO1xuaW1wb3J0IHsgU2NvcGVIZWxwZXIsIFZhcmlhYmxlTWFwIH0gZnJvbSBcIi4vU2NvcGVcIjtcbmltcG9ydCB7IFRhcmdldEZpbGUgfSBmcm9tIFwiQC9jb3JlL1RhcmdldEZpbGVcIjtcbmltcG9ydCB7IFNvdXJjZUZpbGUgfSBmcm9tIFwiQC9jb3JlL1NvdXJjZUZpbGVcIjtcbmltcG9ydCB7IEV4ZWNTY3JpcHRUYXNrIH0gZnJvbSBcIkAvY29yZS9FeGVjU2NyaXB0VGFza1wiO1xuaW1wb3J0IHsgU3Bhd25TeW5jVGFzayB9IGZyb20gXCJAL2NvcmUvU3Bhd25TeW5jVGFza1wiO1xuaW1wb3J0IHsgRmlsZUluc3RhbGxhdGlvblRhc2sgfSBmcm9tIFwiQC9jb3JlL0ZpbGVJbnN0YWxsYXRpb25UYXNrXCI7XG5pbXBvcnQgeyBwZXJmb3JtQ29udGV4dCwgY3JlYXRlVmFyaWFibGVNYXBGb3JEaXJlY3RvcnkgfSBmcm9tIFwiQC9jb3JlL0Jhc2VDb250ZXh0XCI7XG5cbmltcG9ydCBCdWlsZGluU2NyaXB0cyBmcm9tIFwiQC9jb3JlL0J1aWxkaW5TY3JpcHRzXCI7XG5cbmNvbnN0IGxvZ2dlciA9IExvZ2dlci5jcmVhdGUoaW1wb3J0Lm1ldGEudXJsKTtcblxuY29uc3QgVEFSR0VUUyA9IFN5bWJvbChcIlRBUkdFVFNcIik7XG5jb25zdCBDVVNUT01fU0NSSVBUUyA9IFN5bWJvbChcIkNVU1RPTV9TQ1JJUFRTXCIpO1xuY29uc3QgQ0FDSEUgPSBTeW1ib2woXCJDQUNIRVwiKTtcbmNvbnN0IEJVSUxUSU5fU0NSSVBUUyA9IFN5bWJvbChcIkJVSUxUSU5fU0NSSVBUU1wiKTtcblxudHlwZSBTdWJkaXJlY3RvcnlBbGlhcyA9IHtcbiAgW25hbWU6IHN0cmluZ106IEFic29sdXRlUGF0aCB8IG51bGw7XG59O1xuXG50eXBlIENhY2hlVmFyaWFibGVEZXNjcmlwdG9yID0ge1xuICB0eXBlPzogYW55O1xuICB2YWx1ZT86IGFueTtcbiAgZGVzY3JpcHRpb24/OiBzdHJpbmc7XG59O1xuXG50eXBlIENhY2hlVmFyaWFibGVEZXNjcmlwdG9ycyA9IHtcbiAgW25hbWU6IHN0cmluZ106IENhY2hlVmFyaWFibGVEZXNjcmlwdG9yO1xufTtcblxudHlwZSBCdWlsZGluU2NyaXB0cyA9IHtcbiAgW25hbWU6IHN0cmluZ106IEZ1bmN0aW9uO1xufTtcblxuZXhwb3J0IGludGVyZmFjZSBFeGVjU3RydWN0IHtcbiAgY29tbWFuZDogc3RyaW5nO1xuICBhcmdzOiBzdHJpbmdbXTtcbn07XG5cbmZ1bmN0aW9uIGVuc3VyZVZhbHVlQnlUeXBlKHR5cGU6IGFueSwgdmFsdWU6IGFueSkge1xuICBpZiAoQXJyYXkuaXNBcnJheSh0eXBlKSA/IHR5cGUuaW5jbHVkZXModmFsdWUpIDogdHlwZW9mIHZhbHVlID09PSB0eXBlKVxuICAgIHJldHVybiB2YWx1ZTtcbiAgdGhyb3cgbmV3IEVycm9yKGBUaGUgJyR7dmFsdWV9JyBpcyBub3QgYSAke3R5cGV9YCk7XG59XG5cbmZ1bmN0aW9uIHJlc29sdmVJbnN0YW5jZShwcm9qZWN0OiBQcm9qZWN0Q29udGV4dCwgbzogc3RyaW5nIHwgQWJzb2x1dGVQYXRoIHwgVGFyZ2V0RmlsZSk6IHN0cmluZyB7XG4gIGlmICh0eXBlb2YgbyA9PT0gXCJzdHJpbmdcIilcbiAgICByZXR1cm4gbztcblxuICBpZiAobyBpbnN0YW5jZW9mIEFic29sdXRlUGF0aClcbiAgICByZXR1cm4gby50b1N0cmluZygpO1xuXG4gIGlmIChvIGluc3RhbmNlb2YgVGFyZ2V0RmlsZSkge1xuICAgIGNvbnN0IHRhcmdldCA9IHByb2plY3QuVEFSR0VUUy5nZXQoby50YXJnZXROYW1lKTtcbiAgICByZXR1cm4gdGFyZ2V0LmdldEZpbGUoKS50b1N0cmluZygpO1xuICB9XG5cbiAgdGhyb3cgbmV3IEVycm9yKGBVbmFibGUgdG8gcmVzb2x2ZSBvYmplY3QgJHtvfWApO1xufVxuXG5mdW5jdGlvbiByZXNvbHZlVGFyZ2V0Q29tbWFuZChwcm9qZWN0OiBQcm9qZWN0Q29udGV4dCwgdGNtZDogVGFyZ2V0Q29tbWFuZCk6IEV4ZWNTdHJ1Y3Qge1xuICBjb25zdCBjb21tYW5kID0gcmVzb2x2ZUluc3RhbmNlKHByb2plY3QsIHRjbWQuY29tbWFuZCk7XG4gIGNvbnN0IGFyZ3MgPSB0Y21kLmFyZ3MubWFwKGkgPT4gcmVzb2x2ZUluc3RhbmNlKHByb2plY3QsIGkpKTtcbiAgcmV0dXJuIHtjb21tYW5kLCBhcmdzfTtcbn1cblxuZXhwb3J0IGNsYXNzIFByb2plY3RDb250ZXh0IHtcbiAgcHJpdmF0ZSBbVEFSR0VUU106IFRhcmdldENvbGxlY3Rpb247XG4gIHByaXZhdGUgW0NVU1RPTV9TQ1JJUFRTXTogU2NyaXB0Q29sbGVjdGlvbjtcbiAgcHJpdmF0ZSBbQ0FDSEVdOiBDYWNoZVZhcmlhYmxlRGVzY3JpcHRvcnM7XG4gIHByaXZhdGUgX2luc3RhbGxMaXN0OiBJbnN0YWxsRW50aXR5W107XG4gIHByaXZhdGUgX3Byb2Nlc3NlZFZhcmlhYmxlTWFwOiBhbnk7XG4gIHByaXZhdGUgW0JVSUxUSU5fU0NSSVBUU106IEJ1aWxkaW5TY3JpcHRzO1xuICBwcml2YXRlIF9zdWJkaXJBbGlhczogU3ViZGlyZWN0b3J5QWxpYXM7XG4gIHByaXZhdGUgX3N1YmRpckxpc3Q6IFZhcmlhYmxlTWFwW107XG5cbiAgcHJpdmF0ZSBjb25zdHJ1Y3RvcigpIHtcbiAgICB0aGlzW1RBUkdFVFNdID0gVGFyZ2V0Q29sbGVjdGlvbi5jcmVhdGUoKTtcbiAgICB0aGlzW0NVU1RPTV9TQ1JJUFRTXSA9IFNjcmlwdENvbGxlY3Rpb24uY3JlYXRlKCk7XG4gICAgdGhpc1tDQUNIRV0gPSB7fTtcbiAgICB0aGlzLl9pbnN0YWxsTGlzdCA9IFtdO1xuICAgIHRoaXMuX3Byb2Nlc3NlZFZhcmlhYmxlTWFwID0ge307XG4gICAgdGhpcy5fc3ViZGlyQWxpYXMgPSB7fTtcbiAgICB0aGlzW0JVSUxUSU5fU0NSSVBUU10gPSBCdWlsZGluU2NyaXB0cztcbiAgICB0aGlzLl9zdWJkaXJMaXN0ID0gW107XG4gIH1cblxuICBwdWJsaWMgc3RhdGljIGNyZWF0ZSgpIHtcbiAgICByZXR1cm4gT2JqZWN0LnNlYWwobmV3IFByb2plY3RDb250ZXh0KTtcbiAgfVxuXG4gIHB1YmxpYyBnZXQgVEFSR0VUUygpIHtcbiAgICByZXR1cm4gdGhpc1tUQVJHRVRTXTtcbiAgfVxuXG4gIHB1YmxpYyBnZXQgQ0FDSEUoKSB7XG4gICAgcmV0dXJuIHRoaXNbQ0FDSEVdO1xuICB9XG5cbiAgcHVibGljIHJlZ2lzdGVyVmFyaWFibGVNYXAobmFtZTogc3RyaW5nLCB2YXJpYWJsZU1hcDogVmFyaWFibGVNYXApIHtcbiAgICBpZiAodGhpcy5fcHJvY2Vzc2VkVmFyaWFibGVNYXBbbmFtZV0pXG4gICAgICB0aHJvdyBuZXcgRXJyb3IoYFN5c3RlbVZhcmlhYmxlcyBleGlzdHMgZm9yICR7bmFtZX1gKTtcbiAgICB0aGlzLl9wcm9jZXNzZWRWYXJpYWJsZU1hcFtuYW1lXSA9IHZhcmlhYmxlTWFwO1xuICB9XG5cbiAgcHVibGljIHJlc29sdmVTdWJkaXJlY3RvcnkocGF0aDogQWJzb2x1dGVQYXRoIHwgc3RyaW5nKTogQWJzb2x1dGVQYXRoIHwgc3RyaW5nIHwgdW5kZWZpbmVkIHtcbiAgICBjb25zdCByZXNvbHZlZFBhdGggPSB0aGlzLl9zdWJkaXJBbGlhc1twYXRoLnRvU3RyaW5nKCldO1xuICAgIGlmIChyZXNvbHZlZFBhdGggPT09IHVuZGVmaW5lZClcbiAgICAgIHJldHVybiBwYXRoO1xuICAgIGlmIChyZXNvbHZlZFBhdGggPT09IG51bGwpXG4gICAgICByZXR1cm4gdW5kZWZpbmVkO1xuICAgIHJldHVybiByZXNvbHZlZFBhdGg7XG4gIH1cblxuICBwdWJsaWMgYWRkU3ViZGlyZWN0b3J5QWxpYXModmFyaWFibGVNYXA6IFZhcmlhYmxlTWFwLCBzcmM6IGFueSwgZGVzdDogYW55KSB7XG4gICAgY29uc3Qgc3JjUGF0aCA9IEFic29sdXRlUGF0aC5jcmVhdGUoU2NvcGVIZWxwZXIuZ2V0KHZhcmlhYmxlTWFwLCBcIlNPVVJDRV9ESVJcIikucmVzb2x2ZShzcmMpKTtcbiAgICBjb25zdCBkZXN0UGF0aCA9IChkZXN0ID09PSBudWxsKSA/IG51bGwgOiBBYnNvbHV0ZVBhdGguY3JlYXRlKFNjb3BlSGVscGVyLmdldCh2YXJpYWJsZU1hcCwgXCJTT1VSQ0VfRElSXCIpLnJlc29sdmUoZGVzdCkpO1xuICAgIGNvbnN0IHNyY1N0ciA9IHNyY1BhdGgudG9TdHJpbmcoKTtcbiAgICBpZiAodGhpcy5fc3ViZGlyQWxpYXMuaGFzT3duUHJvcGVydHkoc3JjU3RyKSlcbiAgICAgIGxvZ2dlci53YXJuKGBPd2VycmlkZSBcIiR7c3JjU3RyfVwiIHN1YmRpcmVjdG9yeSBhbGlhc2ApO1xuICAgIHRoaXMuX3N1YmRpckFsaWFzW3NyY1N0cl0gPSBkZXN0UGF0aDtcbiAgfVxuXG4gIHB1YmxpYyBhZGRDYWNoZVZhcmlhYmxlcyh2YXJpYWJsZXM6IENhY2hlVmFyaWFibGVEZXNjcmlwdG9ycykge1xuICAgIGNvbnN0IGNhY2hlID0gdGhpc1tDQUNIRV07XG4gICAgZm9yIChjb25zdCBba2V5LCBlbnRyeV0gb2YgT2JqZWN0LmVudHJpZXModmFyaWFibGVzKSkge1xuICAgICAgY2FjaGVba2V5XSA9IGVudHJ5O1xuICAgIH1cbiAgfVxuXG4gIHB1YmxpYyBsb2FkQ2FjaGVWYXJpYWJsZXMoZmlsZW5hbWU6IEFic29sdXRlUGF0aCB8IHN0cmluZykge1xuICAgIGlmIChmaWxlRXhpc3RzU3luYyhmaWxlbmFtZS50b1N0cmluZygpKSkge1xuICAgICAgY29uc3QgdmFyaWFibGVzID0gcmVxdWlyZVN5bmMoZmlsZW5hbWUudG9TdHJpbmcoKSk7XG4gICAgICB0aGlzLmFkZENhY2hlVmFyaWFibGVzKHZhcmlhYmxlcyk7XG4gICAgfVxuICB9XG5cbiAgcHVibGljIGNvcHlDYWNoZVZhcmlhYmxlcyhzY29wZTogYW55KSB7XG4gICAgZm9yIChjb25zdCBbbmFtZSwgZW50cnldIG9mIE9iamVjdC5lbnRyaWVzKHRoaXNbQ0FDSEVdKSkge1xuICAgICAgaWYgKCFPYmplY3QuaGFzT3duKHNjb3BlLCBuYW1lKSkge1xuICAgICAgICBjb25zdCB0eXBlID0gZW50cnkudHlwZSB8fCB0eXBlb2YgZW50cnkudmFsdWU7XG4gICAgICAgIGNvbnN0IGRlc2NyaXB0aW9uID0gZW50cnkuZGVzY3JpcHRpb24gfHwgXCJcIjtcbiAgICAgICAgbGV0IHZhbHVlID0gQXJyYXkuaXNBcnJheShlbnRyeS52YWx1ZSkgPyBbIC4uLmVudHJ5LnZhbHVlIF0gOiBlbnRyeS52YWx1ZTsgIFxuICAgICAgICBjb25zdCBuYW1lU3ltYm9sID0gU3ltYm9sKG5hbWUpO1xuICAgICAgICBzY29wZVtuYW1lU3ltYm9sXSA9IGVuc3VyZVZhbHVlQnlUeXBlKHR5cGUsIHZhbHVlKTtcbiAgXG4gICAgICAgIE9iamVjdC5kZWZpbmVQcm9wZXJ0eShzY29wZSwgbmFtZSwge1xuICAgICAgICAgIGVudW1lcmFibGU6IHRydWUsXG4gICAgICAgICAgZ2V0KCkge1xuICAgICAgICAgICAgcmV0dXJuIHRoaXNbbmFtZVN5bWJvbF07XG4gICAgICAgICAgfSxcbiAgICAgICAgICBzZXQodmFsdWUpIHtcbiAgICAgICAgICAgIHRoaXNbbmFtZVN5bWJvbF0gPSBlbnN1cmVWYWx1ZUJ5VHlwZSh0eXBlLCB2YWx1ZSk7XG4gICAgICAgICAgfSxcbiAgICAgICAgfSk7XG4gICAgICB9XG4gICAgfVxuICB9XG5cbiAgcHVibGljIGV4ZWN1dGVTY3JpcHRTeW5jKHZhcmlhYmxlTWFwOiBWYXJpYWJsZU1hcCwgc2NyaXB0OiBhbnksIHBhcmFtczogYW55KSB7XG4gICAgY29uc3QgbmV3VmFyaWFibGVNYXAgPSBTY29wZUhlbHBlci5jbG9uZVZhcmlhYmxlTWFwKHZhcmlhYmxlTWFwKTtcbiAgICBwYXJhbXMgJiYgU2NvcGVIZWxwZXIuZXh0ZW5kVmFyaWFibGVNYXBCeVZhbHVlcyhuZXdWYXJpYWJsZU1hcCwgXCJcIiwgcGFyYW1zKTtcbiAgICBjb25zdCBzY3JpcHRQYXRoID0gU2NvcGVIZWxwZXIuZ2V0KG5ld1ZhcmlhYmxlTWFwLCBcIlNPVVJDRV9ESVJcIikucmVzb2x2ZShzY3JpcHQpO1xuICAgIGNvbnN0IGZ1bmMgPSByZXF1aXJlU3luYyhzY3JpcHRQYXRoLnRvU3RyaW5nKCkpO1xuICAgIGNvbnN0IG1rID0gU2NyaXB0Q29udGV4dC5jcmVhdGUobmV3VmFyaWFibGVNYXApO1xuICAgIGZ1bmMobWspO1xuICB9XG5cbiAgcHVibGljIHdyaXRlQ2FjaGVWYXJpYWJsZXMoZmlsZW5hbWU6IHN0cmluZykge1xuICAgIGNvbnN0IGpzb24gPSBKU09OLnN0cmluZ2lmeSh0aGlzW0NBQ0hFXSwgbnVsbCwgMik7XG4gICAgZnMud3JpdGVGaWxlU3luYyhmaWxlbmFtZSwganNvbiwgXCJ1dGYtOFwiKTtcbiAgfVxuXG4gIHB1YmxpYyBhc3luYyBwcmVwZWFyU2NyaXB0RmlsZSh2YXJpYWJsZU1hcDogVmFyaWFibGVNYXApOiBQcm9taXNlPGJvb2xlYW4+IHtcbiAgICBjb25zdCBvcmlnaW5Tb3VyY2VEaXIgPSBTY29wZUhlbHBlci5nZXQodmFyaWFibGVNYXAsIFwiU09VUkNFX0RJUlwiKS50b1N0cmluZygpO1xuICAgIGNvbnN0IHJlc29sdmVTb3VyY2VEaXIgPSB0aGlzLnJlc29sdmVTdWJkaXJlY3Rvcnkob3JpZ2luU291cmNlRGlyKTtcbiAgICBpZiAoIXJlc29sdmVTb3VyY2VEaXIpIHtcbiAgICAgIGxvZ2dlci5pbmZvKGBTb3VyY2UgZGlyIFwiJHtvcmlnaW5Tb3VyY2VEaXJ9XCIgd2FzIGRpc2FibGVkYCk7XG4gICAgICByZXR1cm4gZmFsc2U7XG4gICAgfVxuICAgIFNjb3BlSGVscGVyLnNldCh2YXJpYWJsZU1hcCwgXCJTT1VSQ0VfRElSXCIsIHJlc29sdmVTb3VyY2VEaXIpO1xuXG4gICAgaWYgKCFTY29wZUhlbHBlci5nZXQodmFyaWFibGVNYXAsIFwiU0NSSVBUX0ZJTEVcIikpIHtcbiAgICAgIGxldCBzY3JpcHRGaWxlOiBBYnNvbHV0ZVBhdGggfCB1bmRlZmluZWQ7XG4gICAgICBjb25zdCBmaWxlTGlzdCA9IFsgXCIuanNcIiwgXCIubWpzXCIgXS5tYXAoaSA9PiBcIk1ha2VTY3JpcHRcIiArIGkpO1xuICAgICAgZm9yIChjb25zdCBmaWxlbmFtZSBvZiBmaWxlTGlzdCkge1xuICAgICAgICBjb25zdCBpdGVyID0gU2NvcGVIZWxwZXIuZ2V0KHZhcmlhYmxlTWFwLCBcIlNPVVJDRV9ESVJcIikuam9pbihmaWxlbmFtZSk7XG4gICAgICAgIGlmIChhd2FpdCBmaWxlRXhpc3RzKGl0ZXIudG9TdHJpbmcoKSkpIHtcbiAgICAgICAgICBzY3JpcHRGaWxlID0gaXRlcjtcbiAgICAgICAgICBicmVhaztcbiAgICAgICAgfVxuICAgICAgfVxuXG4gICAgICBpZiAoIXNjcmlwdEZpbGUpXG4gICAgICAgIHRocm93IG5ldyBFcnJvcihgVGhlcmUgYXJlIG5vIGZpbGVzICR7ZmlsZUxpc3Quam9pbihcIiwgXCIpfSBpbiBcIiR7U2NvcGVIZWxwZXIuZ2V0KHZhcmlhYmxlTWFwLCBcIlNPVVJDRV9ESVJcIil9XCJgKTtcblxuICAgICAgU2NvcGVIZWxwZXIuc2V0KHZhcmlhYmxlTWFwLCBcIlNDUklQVF9GSUxFXCIsIHNjcmlwdEZpbGUpO1xuICAgICAgU2NvcGVIZWxwZXIuc2V0KHZhcmlhYmxlTWFwLCBcIlNDUklQVF9ESVJcIiwgU2NvcGVIZWxwZXIuZ2V0KHZhcmlhYmxlTWFwLCBcIlNDUklQVF9GSUxFXCIpLmRpcm5hbWUoKSk7XG4gICAgfVxuXG4gICAgdGhpcy5yZWdpc3RlclZhcmlhYmxlTWFwKFNjb3BlSGVscGVyLmdldCh2YXJpYWJsZU1hcCwgXCJTQ1JJUFRfRklMRVwiKS50b1N0cmluZygpLCB2YXJpYWJsZU1hcCk7XG4gICAgcmV0dXJuIHRydWU7XG4gIH1cblxuICBwdWJsaWMgYWRkU3ViZGlyZWN0b3J5KHZhcmlhYmxlTWFwOiBWYXJpYWJsZU1hcCwgc291cmNlRGlyOiBhbnksIGJpbmFyeURpcj86IGFueSkge1xuICAgIGNvbnN0IG5ld1ZhcmlhYmxlTWFwID0gY3JlYXRlVmFyaWFibGVNYXBGb3JEaXJlY3RvcnkodmFyaWFibGVNYXAsIHNvdXJjZURpciwgYmluYXJ5RGlyKTtcbiAgICBpZiAobmV3VmFyaWFibGVNYXApIHtcbiAgICAgIHRoaXMuX3N1YmRpckxpc3QucHVzaChuZXdWYXJpYWJsZU1hcCk7XG4gICAgfVxuICB9XG5cbiAgcHVibGljIGZpbmRTY3JpcHRGdW5jdGlvbihuYW1lOiBzdHJpbmcpOiBGdW5jdGlvbiB8IHVuZGVmaW5lZCB7XG4gICAgcmV0dXJuIHRoaXNbQlVJTFRJTl9TQ1JJUFRTXVtuYW1lXTtcbiAgfVxuXG4gIHB1YmxpYyBhc3luYyBkb1N1YmRpcmVjdG9yeSgpIHtcbiAgICBjb25zdCBjb250ZXh0TGlzdCA9IG5ldyBBcnJheTxMb2NhbE1ha2VDb250ZXh0PigpO1xuXG4gICAgZm9yICg7Oykge1xuICAgICAgY29uc3QgdmFyaWFibGVNYXAgPSB0aGlzLl9zdWJkaXJMaXN0LnNoaWZ0KCk7XG4gICAgICBpZiAoIXZhcmlhYmxlTWFwKVxuICAgICAgICBicmVhaztcblxuICAgICAgaWYgKCFhd2FpdCB0aGlzLnByZXBlYXJTY3JpcHRGaWxlKHZhcmlhYmxlTWFwKSlcbiAgICAgICAgY29udGludWU7XG5cbiAgICAgIGNvbnN0IGN0eCA9IG5ldyBMb2NhbE1ha2VDb250ZXh0KHZhcmlhYmxlTWFwLCB0aGlzKTtcbiAgICAgIGNvbnRleHRMaXN0LnB1c2goY3R4KTtcbiAgICAgIGNvbnN0IG1rID0gVXNlck1ha2VDb250ZXh0LmNyZWF0ZShjdHgsIHZhcmlhYmxlTWFwKTtcblxuICAgICAgY29uc3QgY3dkU2F2ZSA9IHByb2Nlc3MuY3dkKCk7XG4gICAgICBwcm9jZXNzLmNoZGlyKG1rLlNDUklQVF9ESVIudG9TdHJpbmcoKSk7XG4gICAgICBhd2FpdCBwZXJmb3JtQ29udGV4dChtayk7XG4gICAgICBwcm9jZXNzLmNoZGlyKGN3ZFNhdmUpO1xuICAgIH1cblxuICAgIGZvciAoY29uc3QgY3R4IG9mIGNvbnRleHRMaXN0KSB7XG4gICAgICBmb3IgKGNvbnN0IFtuYW1lLCB0YXJnZXRdIG9mIGN0eC50YXJnZXRzKVxuICAgICAgICB0aGlzW1RBUkdFVFNdLnNldChuYW1lLCB0YXJnZXQpO1xuICAgICAgZm9yIChjb25zdCBpdGVyIG9mIGN0eC5zY3JpcHRDb2xsZWN0aW9uLkVOVFJJRVMpXG4gICAgICAgIHRoaXNbQ1VTVE9NX1NDUklQVFNdLmFkZChpdGVyLCBpdGVyLk5BTUUpO1xuICAgICAgdGhpcy5faW5zdGFsbExpc3QucHVzaCguLi5jdHguaW5zdGFsbExpc3QpO1xuICAgIH1cblxuICAgIGZvciAoY29uc3QgY3R4IG9mIGNvbnRleHRMaXN0KSB7XG4gICAgICBmb3IgKGNvbnN0IFtuYW1lLCBwb3N0VGFyZ2V0XSBvZiBjdHgucG9zdFRhcmdldHMpIHtcbiAgICAgICAgY29uc3QgdGFyZ2V0ID0gdGhpc1tUQVJHRVRTXS5nZXQobmFtZSk7XG4gICAgICAgIGlmICghdGFyZ2V0KVxuICAgICAgICAgIHRocm93IG5ldyBFcnJvcihgVGhlcmUgaXMgbm8gVGFyZ2V0IG5hbWVkICR7bmFtZX1gKTtcbiAgICAgICAgdGFyZ2V0LnBvc3RVcGRhdGUocG9zdFRhcmdldCk7XG4gICAgICB9XG4gICAgICBmb3IgKGNvbnN0IFtuYW1lLCBwb3N0U2NyaXB0XSBvZiBjdHgucG9zdFNjcmlwdHMpIHtcbiAgICAgICAgY29uc3Qgc2NyaXB0ID0gdGhpc1tDVVNUT01fU0NSSVBUU10uZ2V0KG5hbWUpO1xuICAgICAgICBpZiAoIXNjcmlwdClcbiAgICAgICAgICB0aHJvdyBuZXcgRXJyb3IoYFRoZXJlIGlzIG5vIEN1c3RvbVNjcmlwdCBuYW1lZCAke25hbWV9YCk7XG4gICAgICAgIHNjcmlwdC5wb3N0VXBkYXRlKHBvc3RTY3JpcHQpO1xuICAgICAgfVxuICAgIH1cbiAgfVxuXG4gIHB1YmxpYyBjcmVhdGVHb2FscyhzY29wZTogU3lzdGVtU2NvcGUpOiBHb2FsQ29sbGVjdGlvbiB7XG4gICAgY29uc3QgZ29hbExpc3QgPSBuZXcgR29hbENvbGxlY3Rpb247XG4gICAgZm9yIChjb25zdCBzY3JpcHQgb2YgdGhpc1tDVVNUT01fU0NSSVBUU10uRU5UUklFUykgeyAgIFxuICAgICAgY29uc3QgZGVwZW5kcyA9IFtdO1xuXG4gICAgICBsZXQgc2NyaXB0T2JqOiBBYnNvbHV0ZVBhdGggfCBGdW5jdGlvbjtcbiAgICAgIGlmICh0eXBlb2Ygc2NyaXB0LnNjcmlwdE1vZHVsZSA9PT0gXCJzdHJpbmdcIikge1xuICAgICAgICBjb25zdCBmdW5jID0gdGhpcy5maW5kU2NyaXB0RnVuY3Rpb24oc2NyaXB0LnNjcmlwdE1vZHVsZSk7XG4gICAgICAgIHNjcmlwdE9iaiA9IGZ1bmMgPyBmdW5jIDogc2NyaXB0LnNvdXJjZURpci5yZXNvbHZlKHNjcmlwdC5zY3JpcHRNb2R1bGUpO1xuICAgICAgfVxuICAgICAgZWxzZSB7XG4gICAgICAgIGRlcGVuZHMucHVzaChzY3JpcHQuc2NyaXB0TW9kdWxlLnRvUGF0aCgpKTtcbiAgICAgICAgc2NyaXB0T2JqID0gc2NyaXB0LnNjcmlwdE1vZHVsZTtcbiAgICAgIH1cblxuICAgICAgaWYgKHNjcmlwdC5JTlBVVCkge1xuICAgICAgICBkZXBlbmRzLnB1c2goc2NyaXB0LklOUFVULnRvUGF0aCgpKTtcbiAgICAgIH1cblxuICAgICAgY29uc3QgbXNnID0gXCJcXHgxYlszNm1cIiArIFwiR2VuZXJhdGluZyBcIiArIHNjcmlwdC5iaW5hcnlEaXIucmVsYXRpdmUoc2NyaXB0Lk9VVFBVVCkgKyBcIlxceDFiWzBtXCI7XG4gICAgICBjb25zdCBnZSA9IG5ldyBHb2FsVGFyZ2V0KHNjcmlwdC5OQU1FKTtcbiAgICAgIGdlLm1lc3NhZ2UgPSBtc2c7XG4gICAgICBnZS5vdXRwdXQgPSBzY3JpcHQuT1VUUFVUO1xuICAgICAgZ2UuYWRkRGVwZW5kZW5jeSguLi5kZXBlbmRzKTtcbiAgICAgIGdlLmFkZFRhc2sobmV3IEV4ZWNTY3JpcHRUYXNrKHNjcmlwdC52YXJpYWJsZU1hcCwgc2NyaXB0T2JqKSk7XG4gICAgICBnb2FsTGlzdC5hZGRUYXJnZXQoZ2UpO1xuICAgIH1cblxuICAgIGNvbnN0IG9iamVjdEZpbGVzID0gbmV3IE1hcDxTb3VyY2VGaWxlLCBBYnNvbHV0ZVBhdGg+KCk7XG4gICAgZm9yIChjb25zdCB0YXJnZXQgb2YgdGhpc1tUQVJHRVRTXS5FTlRSSUVTLnZhbHVlcygpKSB7XG4gICAgICBmb3IgKGNvbnN0IGl0IG9mIHRhcmdldC5nZXRTb3VyY2VGaWxlcygpKSB7XG4gICAgICAgIGlmICghaXQuTEFOR1VBR0UpXG4gICAgICAgICAgY29udGludWU7XG4gICAgICAgIGNvbnN0IHJmaWxlMSA9IHRhcmdldC5iaW5hcnlEaXIucmVsYXRpdmUoaXQuRklMRSk7XG4gICAgICAgIGNvbnN0IHJmaWxlMiA9ICB0YXJnZXQuc291cmNlRGlyLnJlbGF0aXZlKGl0LkZJTEUpO1xuICAgICAgICBjb25zdCByZmlsZSA9IChyZmlsZTIubGVuZ3RoIDwgcmZpbGUxLmxlbmd0aCA/IHJmaWxlMiA6IHJmaWxlMSkucmVwbGFjZShcIi4uL1wiLCBcIl9fL1wiKTtcbiAgICAgICAgY29uc3Qgb2ZpbGUgPSAgdGFyZ2V0LmJpbmFyeURpci5qb2luKFwiTWFrZUZpbGVzXCIsIHRhcmdldC50YXJnZXROYW1lICsgXCIuZGlyXCIsICByZmlsZSArIFwiLm9ialwiKTtcbiAgICAgICAgb2JqZWN0RmlsZXMuc2V0KGl0LCBvZmlsZSk7XG4gICAgICB9XG4gICAgfVxuXG4gICAgZm9yIChjb25zdCBbbmFtZSwgdGFyZ2V0XSBvZiB0aGlzW1RBUkdFVFNdLkVOVFJJRVMpIHtcbiAgICAgIGNvbnN0IGRlcGVuZHMgPSBbXTtcbiAgICAgIGZvciAoY29uc3QgcyBvZiB0YXJnZXQuZ2V0VGFyZ2V0T2JqZWN0cygpKSB7XG4gICAgICAgIGNvbnN0IHQgPSB0aGlzW1RBUkdFVFNdLmdldChzLnRhcmdldE5hbWUpO1xuICAgICAgICBmb3IgKGNvbnN0IGYgb2YgdC5nZXRTb3VyY2VGaWxlcygpKSB7XG4gICAgICAgICAgY29uc3QgbyA9IG9iamVjdEZpbGVzLmdldChmKTtcbiAgICAgICAgICBvICYmIGRlcGVuZHMucHVzaChvLnRvU3RyaW5nKCkpO1xuICAgICAgICB9XG4gICAgICB9XG4gIFxuICAgICAgY29uc3QgaGVhZGVycyA9IHRoaXNbVEFSR0VUU10uYWxsSGVhZGVyc09mKHRhcmdldCk7XG4gICAgICBmb3IgKGNvbnN0IHMgb2YgdGFyZ2V0LmdldFNvdXJjZUZpbGVzKCkpIHtcbiAgICAgICAgaWYgKHMuSEVBREVSX0ZJTEVfT05MWSlcbiAgICAgICAgICBjb250aW51ZTtcblxuICAgICAgICBjb25zdCBvID0gb2JqZWN0RmlsZXMuZ2V0KHMpO1xuICAgICAgICBpZiAoIW8pXG4gICAgICAgICAgdGhyb3cgbmV3IEVycm9yKGBPQkpFQ1RfRklMRSBpcyBudWxsYCk7XG5cbiAgICAgICAgZnMubWtkaXJTeW5jKG8uZGlybmFtZSgpLnRvU3RyaW5nKCksIHsgcmVjdXJzaXZlOiB0cnVlIH0pO1xuICBcbiAgICAgICAgY29uc3QgcmVsYXRpdmVPYmplY3QgPSB0YXJnZXQuYmluYXJ5RGlyLnJlbGF0aXZlKG8pO1xuICAgICAgICBjb25zdCByZWxhdGl2ZUJpbmFyeURpciA9IHNjb3BlLlBST0pFQ1RfQklOQVJZX0RJUi5yZWxhdGl2ZSh0YXJnZXQuYmluYXJ5RGlyKTtcbiAgICAgICAgY29uc3QgbXNnID0gXCJcXHgxYlszMm1cIiArIGBCdWlsZGluZyAke3MuTEFOR1VBR0V9IG9iamVjdCAke3JlbGF0aXZlQmluYXJ5RGlyfS8ke3JlbGF0aXZlT2JqZWN0fWAgKyBcIlxceDFiWzBtXCI7XG4gIFxuICAgICAgICBjb25zdCBkZWZpbml0aW9ucyA9IFtcbiAgICAgICAgICAuLi50aGlzW1RBUkdFVFNdLmFsbERlZmluaXRpb25zT2YodGFyZ2V0KSxcbiAgICAgICAgICAuLi5zLkRFRklORVMsXG4gICAgICAgIF07XG5cbiAgICAgICAgY29uc3QgYXJnczogc3RyaW5nW10gPSBbXTtcbiAgICAgICAgYXJncy5wdXNoKC4uLmRlZmluaXRpb25zLm1hcChpID0+IFwiLURcIiArIGkpKTtcbiAgICAgICAgYXJncy5wdXNoKC4uLnRoaXNbVEFSR0VUU10uYWxsSW5jbHVkZXNPZih0YXJnZXQpLm1hcChpID0+IFwiLUlcIiArIGkpKTtcbiAgICAgICAgYXJncy5wdXNoKC4uLnRoaXNbVEFSR0VUU10uYWxsQ29tcGlsZU9wdGlvbnNPZih0YXJnZXQpKTtcbiAgICAgICAgaWYgKHRhcmdldC5wb3NpdGlvbkluZGVwZW5kZW50Q29kZSlcbiAgICAgICAgICBhcmdzLnB1c2goXCItZlBJQ1wiKTtcbiAgICAgICAgYXJncy5wdXNoKC4uLnMuQ09NUElMRV9GTEFHUy5mbGF0KCkpO1xuICAgICAgICBhcmdzLnB1c2goXCItb1wiLCByZWxhdGl2ZU9iamVjdCk7XG4gICAgICAgIGFyZ3MucHVzaChcIi1jXCIsIHMuRklMRS50b1N0cmluZygpKTtcbiAgXG4gICAgICAgIGNvbnN0IG91dHB1dCA9IEFic29sdXRlUGF0aC5jcmVhdGUodGFyZ2V0LmJpbmFyeURpci5qb2luKHJlbGF0aXZlT2JqZWN0KSk7XG4gICAgICAgIGRlcGVuZHMucHVzaChvdXRwdXQudG9TdHJpbmcoKSk7XG5cbiAgICAgICAgY29uc3QgZ2UgPSBuZXcgR29hbFRhcmdldDtcbiAgICAgICAgZ2UubWVzc2FnZSA9IG1zZztcbiAgICAgICAgZ2Uub3V0cHV0ID0gb3V0cHV0O1xuICAgICAgICBnZS5hZGREZXBlbmRlbmN5KC4uLmhlYWRlcnMpO1xuICAgICAgICBnZS5hZGREZXBlbmRlbmN5KHMuRklMRS50b1BhdGgoKSk7XG4gICAgICAgIGdlLmFkZFRhc2sobmV3IFNwYXduU3luY1Rhc2socy5DT01QSUxFX1BBVEgudG9TdHJpbmcoKSwgYXJncywgdGFyZ2V0LmJpbmFyeURpci50b1BhdGgoKSkpO1xuICAgICAgICBnb2FsTGlzdC5hZGRUYXJnZXQoZ2UpO1xuICAgICAgfVxuXG4gICAgICBjb25zdCBnZW5lcmFsR29hbCA9IG5ldyBHb2FsVGFyZ2V0O1xuICAgICAgZm9yIChjb25zdCBwYXJhbXMgb2YgdGFyZ2V0LnByZUJ1aWxkTGlzdCkge1xuICAgICAgICBjb25zdCBleGVjU3RydWN0ID0gcmVzb2x2ZVRhcmdldENvbW1hbmQodGhpcywgcGFyYW1zKTtcbiAgICAgICAgZ2VuZXJhbEdvYWwuYWRkVGFzayhuZXcgU3Bhd25TeW5jVGFzayhleGVjU3RydWN0LmNvbW1hbmQsIGV4ZWNTdHJ1Y3QuYXJncywgdGFyZ2V0LmJpbmFyeURpci50b1N0cmluZygpKSk7XG4gICAgICB9XG5cbiAgICAgIGNvbnN0IGxpbmtPcHRpb25zID0gdGhpc1tUQVJHRVRTXS5hbGxMaW5rT3B0aW9uc09mKHRhcmdldCk7XG4gICAgICBpZiAodGFyZ2V0LmlzT2JqZWN0TGlicmFyeSkge1xuICAgICAgICBjb25zdCBvYmpzID0gZGVwZW5kcy5maWx0ZXIoaSA9PiBpLmVuZHNXaXRoKFwiLm9cIikgfHwgaS5lbmRzV2l0aChcIi5vYmpcIikpLm1hcChpID0+IHRhcmdldC5nZXRGaWxlRGlyKCkucmVsYXRpdmUoaSkpO1xuICAgICAgICBpZiAob2Jqcy5sZW5ndGgpIHtcbiAgICAgICAgICBjb25zdCBhcmdzID0gW1xuICAgICAgICAgICAgLi4ubGlua09wdGlvbnMsXG4gICAgICAgICAgICBcIi1yXCIsXG4gICAgICAgICAgICBcIi1vXCIsIHRhcmdldC5nZXRGaWxlTmFtZSgpLFxuICAgICAgICAgICAgLi4ub2Jqc1xuICAgICAgICAgIF07XG4gICAgICAgICAgZ2VuZXJhbEdvYWwubWVzc2FnZSA9IGBMaW5raW5nICR7dGFyZ2V0Lmxhbmd1YWdlfSBvYmplY3QgbGlicmFyeSAke3RhcmdldC5nZXRGaWxlTmFtZSgpfWA7XG4gICAgICAgICAgZ2VuZXJhbEdvYWwub3V0cHV0ID0gdGFyZ2V0LmdldEZpbGUoKTtcbiAgICAgICAgICBnZW5lcmFsR29hbC5hZGREZXBlbmRlbmN5KC4uLmRlcGVuZHMpO1xuICAgICAgICAgIGdlbmVyYWxHb2FsLmFkZFRhc2sobmV3IFNwYXduU3luY1Rhc2soc2NvcGUuTElOS0VSLCBhcmdzLCB0YXJnZXQuZ2V0RmlsZURpcigpLnRvU3RyaW5nKCkpKTtcbiAgICAgICAgfVxuICAgICAgICBlbHNlIHtcbiAgICAgICAgICBsb2dnZXIuaW5mbyhgTm8gb2JqZWN0cyBmb3IgXCIke3RhcmdldC50YXJnZXROYW1lfVwiYCk7XG4gICAgICAgIH1cbiAgICAgIH1cbiAgXG4gICAgICBpZiAodGFyZ2V0LmlzU3RhdGljTGlicmFyeSkge1xuICAgICAgICBjb25zdCBvYmpzID0gZGVwZW5kcy5maWx0ZXIoaSA9PiBpLmVuZHNXaXRoKFwiLm9cIikgfHwgaS5lbmRzV2l0aChcIi5vYmpcIikpLm1hcChpID0+IHRhcmdldC5nZXRGaWxlRGlyKCkucmVsYXRpdmUoaSkpO1xuICAgICAgICBpZiAob2Jqcy5sZW5ndGgpIHtcbiAgICAgICAgICBjb25zdCBhcmdzID0gWyBcInJjXCIsIHRhcmdldC5nZXRGaWxlTmFtZSgpICwgLi4ub2JqcyBdO1xuICAgICAgICAgIGdlbmVyYWxHb2FsLm1lc3NhZ2UgPSBgTGlua2luZyAke3RhcmdldC5sYW5ndWFnZX0gc3RhdGljIGxpYnJhcnkgJHt0YXJnZXQuZ2V0RmlsZU5hbWUoKX1gO1xuICAgICAgICAgIGdlbmVyYWxHb2FsLm91dHB1dCA9IHRhcmdldC5nZXRGaWxlKCk7XG4gICAgICAgICAgZ2VuZXJhbEdvYWwuYWRkRGVwZW5kZW5jeSguLi5kZXBlbmRzKTtcbiAgICAgICAgICBnZW5lcmFsR29hbC5hZGRUYXNrKG5ldyBTcGF3blN5bmNUYXNrKHNjb3BlLkFSLCBhcmdzLCB0YXJnZXQuZ2V0RmlsZURpcigpLnRvU3RyaW5nKCkpKTtcbiAgICAgICAgfVxuICAgICAgICBlbHNlIHtcbiAgICAgICAgICBsb2dnZXIuaW5mbyhgTm8gb2JqZWN0cyBmb3IgXCIke3RhcmdldC50YXJnZXROYW1lfVwiYCk7XG4gICAgICAgIH1cbiAgICAgIH1cbiAgXG4gICAgICBpZiAodGFyZ2V0LmlzU2hhcmVkTGlicmFyeSkge1xuICAgICAgICB0aHJvdyBuZXcgRXJyb3IoXCJOb3QgaW1wbGVtZW50ZWRcIik7XG4gICAgICB9XG5cbiAgICAgIGlmICh0YXJnZXQuaXNFeGVjdXRhYmxlKSB7XG4gICAgICAgIGNvbnN0IG9ianMgPSBkZXBlbmRzLmZpbHRlcihpID0+IGkuZW5kc1dpdGgoXCIub1wiKSB8fCBpLmVuZHNXaXRoKFwiLm9ialwiKSkubWFwKGkgPT4gdGFyZ2V0LmdldEZpbGVEaXIoKS5yZWxhdGl2ZShpKSk7XG4gICAgICAgIGlmIChvYmpzLmxlbmd0aCkge1xuICAgICAgICAgIGNvbnN0IGxpYnMgPSB0aGlzW1RBUkdFVFNdLmFsbExpYnJhcmllc09mKHRhcmdldCk7XG4gICAgICAgICAgY29uc3QgYXJncyA9IFtcbiAgICAgICAgICAgIC4uLnRhcmdldC5jb21waWxlckZsYWdzLFxuICAgICAgICAgICAgLi4ubGlua09wdGlvbnMsXG4gICAgICAgICAgICAuLi5vYmpzLFxuICAgICAgICAgICAgXCItb1wiLCB0YXJnZXQuZ2V0RmlsZU5hbWUoKSxcbiAgICAgICAgICAgIC4uLmxpYnMubWFwKGkgPT4gdGFyZ2V0LmdldEZpbGVEaXIoKS5yZWxhdGl2ZShpKSksXG4gICAgICAgICAgXTtcblxuICAgICAgICAgIGdlbmVyYWxHb2FsLm1lc3NhZ2UgPSBgTGlua2luZyAke3RhcmdldC5sYW5ndWFnZX0gZXhlY3V0YWJsZSAke3RhcmdldC5nZXRGaWxlTmFtZSgpfWA7XG4gICAgICAgICAgZ2VuZXJhbEdvYWwub3V0cHV0ID0gdGFyZ2V0LmdldEZpbGUoKTtcbiAgICAgICAgICBnZW5lcmFsR29hbC5hZGREZXBlbmRlbmN5KC4uLmRlcGVuZHMpO1xuICAgICAgICAgIGdlbmVyYWxHb2FsLmFkZERlcGVuZGVuY3koLi4ubGlicyk7XG4gICAgICAgICAgZ2VuZXJhbEdvYWwuYWRkVGFzayhuZXcgU3Bhd25TeW5jVGFzayh0YXJnZXQuY29tcGlsZXJQYXRoLCBhcmdzLCB0YXJnZXQuZ2V0RmlsZURpcigpLnRvU3RyaW5nKCkpKTtcbiAgICAgICAgfVxuICAgICAgICBlbHNlIHtcbiAgICAgICAgICBsb2dnZXIuaW5mbyhgTm8gb2JqZWN0cyBmb3IgXCIke3RhcmdldC50YXJnZXROYW1lfVwiYCk7XG4gICAgICAgIH1cbiAgICAgIH1cblxuICAgICAgZm9yIChjb25zdCBwYXJhbXMgb2YgdGFyZ2V0LnBvc3RCdWlsZExpc3QpIHtcbiAgICAgICAgY29uc3QgZXhlY1N0cnVjdCA9IHJlc29sdmVUYXJnZXRDb21tYW5kKHRoaXMsIHBhcmFtcyk7XG4gICAgICAgIGdlbmVyYWxHb2FsLmFkZFRhc2sobmV3IFNwYXduU3luY1Rhc2soZXhlY1N0cnVjdC5jb21tYW5kLCBleGVjU3RydWN0LmFyZ3MsIHRhcmdldC5iaW5hcnlEaXIudG9TdHJpbmcoKSkpO1xuICAgICAgfVxuICAgICAgXG4gICAgICBnb2FsTGlzdC5hZGRUYXJnZXQoZ2VuZXJhbEdvYWwpO1xuXG4gICAgICBjb25zdCB3b3JrZXIgPSBuZXcgR29hbFRhcmdldChuYW1lKTtcbiAgICAgIHdvcmtlci5tZXNzYWdlID0gYEJ1aWx0IHRhcmdldCAke25hbWV9YDtcbiAgICAgIHdvcmtlci5hZGREZXBlbmRlbmN5KHRhcmdldC5nZXRGaWxlKCkudG9QYXRoKCkpO1xuICAgICAgZ29hbExpc3QuYWRkVGFyZ2V0KHdvcmtlcik7XG4gICAgfVxuXG4gICAgaWYgKHRoaXMuX2luc3RhbGxMaXN0Lmxlbmd0aCkge1xuICAgICAgY29uc3Qgd29ya2VyID0gbmV3IEdvYWxUYXJnZXQoSU5TVEFMTF9UQVJHRVQpO1xuICAgICAgY29uc3QgZmlsZUluc3RhbGxhdGlvblRhc2sgPSBuZXcgRmlsZUluc3RhbGxhdGlvblRhc2s7XG4gICAgICBmb3IgKGNvbnN0IGl0ZXIgb2YgdGhpcy5faW5zdGFsbExpc3QpIHtcbiAgICAgICAgbGV0IHNyYzogQWJzb2x1dGVQYXRoLCBkZXN0OiBBYnNvbHV0ZVBhdGg7XG4gICAgICAgIGlmIChpdGVyLlZBTFVFIGluc3RhbmNlb2YgQWJzb2x1dGVQYXRoKSB7XG4gICAgICAgICAgaWYgKHNjb3BlLlBSRVZFTlRfSU5TVEFMTF9GSUxFUylcbiAgICAgICAgICAgIGNvbnRpbnVlO1xuICAgICAgICAgIHNyYyA9IGl0ZXIuVkFMVUU7XG4gICAgICAgICAgY29uc3QgcmZpbGUgPSAoaXRlci5CQVNFX0RJUiBhcyBhbnkpLnJlbGF0aXZlKGl0ZXIuVkFMVUUpO1xuICAgICAgICAgIGRlc3QgPSBpdGVyLkRFU1RJTkFUSU9OLmpvaW4ocmZpbGUpO1xuICAgICAgICB9XG4gICAgICAgIGVsc2UgaWYgKGl0ZXIuVkFMVUUgaW5zdGFuY2VvZiBUYXJnZXROYW1lKSB7XG4gICAgICAgICAgY29uc3QgdGFyZ2V0TmFtZSA9IGl0ZXIuVkFMVUUudGFyZ2V0TmFtZTtcbiAgICAgICAgICBjb25zdCB0YXJnZXQgPSB0aGlzW1RBUkdFVFNdLmdldCh0YXJnZXROYW1lKTtcbiAgICAgICAgICBzcmMgPSB0YXJnZXQuZ2V0RmlsZSgpO1xuICAgICAgICAgIGRlc3QgPSBpdGVyLkRFU1RJTkFUSU9OLmpvaW4odGFyZ2V0LmdldEZpbGVOYW1lKCkpO1xuICAgICAgICB9XG4gICAgICAgIGVsc2Uge1xuICAgICAgICAgIHRocm93IG5ldyBFcnJvcihgQ2FuIG5vdCBpbnN0YWxsICR7aXRlci5WQUxVRX1gKVxuICAgICAgICB9XG4gICAgICAgIGlmIChzY29wZS5ERVNURElSKVxuICAgICAgICAgIGRlc3QgPSBzY29wZS5ERVNURElSLmpvaW4oZGVzdCk7XG4gICAgICAgIHdvcmtlci5hZGREZXBlbmRlbmN5KHNyYy50b1BhdGgoKSk7XG4gICAgICAgIGZpbGVJbnN0YWxsYXRpb25UYXNrLmFkZChzcmMsIGRlc3QpO1xuICAgICAgfVxuICAgICAgd29ya2VyLmFkZFRhc2soZmlsZUluc3RhbGxhdGlvblRhc2spO1xuICAgICAgZ29hbExpc3QuYWRkVGFyZ2V0KHdvcmtlcik7XG4gICAgfVxuXG4gICAgY29uc3QgZ2UgPSBuZXcgR29hbFRhcmdldChBTExfVEFSR0VUKTtcbiAgICBPYmplY3Qua2V5cyh0aGlzW1RBUkdFVFNdLkVOVFJJRVMpLmZvckVhY2goaSA9PiB2b2lkIGdlLmFkZERlcGVuZGVuY3koaSkpXG4gICAgZ29hbExpc3QuYWRkVGFyZ2V0KGdlKTtcbiAgXG4gICAgcmV0dXJuIGdvYWxMaXN0O1xuICB9XG5cbiAgcHVibGljIHRvSlNPTigpIHtcbiAgICByZXR1cm4ge1xuICAgICAgVEFSR0VUUzogdGhpcy5UQVJHRVRTLFxuICAgICAgQ1VTVE9NX1NDUklQVFM6IHRoaXNbQ1VTVE9NX1NDUklQVFNdLFxuICAgICAgQ0FDSEU6IHRoaXMuQ0FDSEUsXG4gICAgICBpbnN0YWxsTGlzdDogdGhpcy5faW5zdGFsbExpc3QsXG4gICAgICBwcm9jZXNzZWRWYXJpYWJsZU1hcDogdGhpcy5fcHJvY2Vzc2VkVmFyaWFibGVNYXAsXG4gICAgICBzdWJkaXJBbGlhczogdGhpcy5fc3ViZGlyQWxpYXMsXG4gICAgfTtcbiAgfVxufTtcbiIsIi8qXG4gKiBNSVQgTGljZW5zZVxuICpcbiAqIENvcHlyaWdodCAoYykgMjAyNSAgWXVyaWkgWWFrdWJpbiAoeXVyaWkueWFrdWJpbkBnbWFpbC5jb20pXG4gKlxuICogUGVybWlzc2lvbiBpcyBncmFudGVkIHRvIHVzZSwgY29weSwgbW9kaWZ5LCBhbmQgZGlzdHJpYnV0ZSB0aGlzIHNvZnR3YXJlXG4gKiB1bmRlciB0aGUgTUlUIExpY2Vuc2UuIFNlZSBMSUNFTlNFIGZpbGUgZm9yIGRldGFpbHMuXG4gKi9cblxuaW1wb3J0IHsgQWJzb2x1dGVQYXRoIH0gZnJvbSBcIkAvY29yZS9BYnNvbHV0ZVBhdGhcIjtcbmltcG9ydCB7IGRlZXBDb3B5IH0gZnJvbSBcIkAvdXRpbHMvUHJpbWl0aXZlc1wiO1xuXG5pbnRlcmZhY2UgVmFyaWFibGVEZXNjcmlwdG9yIHtcbiAgdHlwZT86IHN0cmluZyB8IHN0cmluZ1tdO1xuICB2YWx1ZT86IGFueTtcbiAgZGVzY3JpcHRpb24/OiBzdHJpbmc7XG59O1xuXG5pbnRlcmZhY2UgVmFyaWFibGVFbnRyeSB7XG4gIG5hbWU6IHN0cmluZztcbiAgdHlwZTogc3RyaW5nIHwgc3RyaW5nW107XG4gIGdyb3VwOiBzdHJpbmc7XG4gIGRlc2NyaXB0aW9uOiBzdHJpbmc7XG4gIGluaXRWYWx1ZT86IGFueTtcbiAgdmFsdWU/OiBhbnk7XG59O1xuXG5leHBvcnQgaW50ZXJmYWNlIFZhcmlhYmxlTWFwIHtcbiAgWyBuYW1lOiBzdHJpbmcgXTogVmFyaWFibGVFbnRyeTtcbn07XG5cbmV4cG9ydCB0eXBlIFZhcmlhbnQgPSBib29sZWFuIHwgbnVtYmVyIHwgc3RyaW5nIHwgYm9vbGVhbltdIHwgbnVtYmVyW10gfCBzdHJpbmdbXTtcbmV4cG9ydCB0eXBlIFZhcmlhbnRNYXAgPSB7XG4gIFsgbmFtZTogc3RyaW5nIF06IFZhcmlhbnQ7XG59O1xuXG5leHBvcnQgbmFtZXNwYWNlIFNjb3BlSGVscGVyIHtcblxuZnVuY3Rpb24gdG9EZXNjcmlwdG9yKHZhbHVlOiBhbnkpOiBWYXJpYWJsZURlc2NyaXB0b3Ige1xuICBpZiAoIXZhbHVlIHx8IHR5cGVvZiB2YWx1ZSA9PT0gXCJib29sZWFuXCIgfHwgdHlwZW9mIHZhbHVlID09PSBcIm51bWJlclwiIHx8IHR5cGVvZiB2YWx1ZSA9PT0gXCJzdHJpbmdcIiB8fCBBcnJheS5pc0FycmF5KHZhbHVlKSkge1xuICAgIHJldHVybiB7IHZhbHVlIH07IFxuICB9XG4gIHJldHVybiB2YWx1ZTtcbn1cblxuZXhwb3J0IGZ1bmN0aW9uIGdldEVudHJ5VmFsdWUoZW50cnk6IFZhcmlhYmxlRW50cnkpOiBhbnkge1xuICAvKmlmICh2YWx1ZSA9PT0gdW5kZWZpbmVkKVxuICAgIHRocm93IG5ldyBFcnJvcihgVmFsdWUgb2YgJHtuYW1lfSBjYW5ub3QgYmUgb2J0YWluZWQgYmVjYXVzZSBpdCBoYXMgbm90IGJlZW4gZXN0YWJsaXNoZWRgKTsqL1xuICByZXR1cm4gKGVudHJ5LnZhbHVlID09PSB1bmRlZmluZWQpID8gZW50cnkuaW5pdFZhbHVlIDogZW50cnkudmFsdWU7XG59XG5cbmV4cG9ydCBmdW5jdGlvbiBnZXQodmFyaWFibGVNYXA6IFZhcmlhYmxlTWFwLCBuYW1lOiBzdHJpbmcpOiBhbnkge1xuICBjb25zdCBlbnRyeSA9IHZhcmlhYmxlTWFwW25hbWVdO1xuICBpZiAoZW50cnkpXG4gICAgcmV0dXJuIGdldEVudHJ5VmFsdWUoZW50cnkpO1xufVxuXG5jb25zdCBtYWtlVmFsdWVNYXA6IGFueSA9IHtcbiAgYXJyYXk6ICh2YWx1ZTogYW55KSA9PiB7XG4gICAgcmV0dXJuIEFycmF5LmlzQXJyYXkodmFsdWUpID8gQXJyYXkuZnJvbSh2YWx1ZSkgOiB1bmRlZmluZWQ7XG4gIH0sXG4gIGJvb2xlYW46ICh2YWx1ZTogYW55KSA9PiB7XG4gICAgcmV0dXJuICh0eXBlb2YgdmFsdWUgPT09IFwiYm9vbGVhblwiKSA/IHZhbHVlIDogdW5kZWZpbmVkO1xuICB9LFxuICBudW1iZXI6ICh2YWx1ZTogYW55KSA9PiB7XG4gICAgcmV0dXJuICh0eXBlb2YgdmFsdWUgPT09IFwibnVtYmVyXCIpID8gdmFsdWUgOiB1bmRlZmluZWQ7XG4gIH0sXG4gIHN0cmluZzogKHZhbHVlOiBhbnkpID0+IHtcbiAgICByZXR1cm4gKHR5cGVvZiB2YWx1ZSA9PT0gXCJzdHJpbmdcIikgPyB2YWx1ZSA6IHVuZGVmaW5lZDtcbiAgfSxcbiAgQWJzb2x1dGVQYXRoOiAodmFsdWU6IGFueSkgPT4ge1xuICAgIHJldHVybiBBYnNvbHV0ZVBhdGguY3JlYXRlKHZhbHVlKTtcbiAgfSxcbiAgRmlsZVBhdGg6ICh2YWx1ZTogYW55KSA9PiB7XG4gICAgcmV0dXJuIEFic29sdXRlUGF0aC5jcmVhdGUodmFsdWUpO1xuICB9LFxuICBEaXJQYXRoOiAodmFsdWU6IGFueSkgPT4ge1xuICAgIHJldHVybiBBYnNvbHV0ZVBhdGguY3JlYXRlKHZhbHVlKTtcbiAgfSxcbiAgb2JqZWN0OiAodmFsdWU6IGFueSkgPT4ge1xuICAgIHJldHVybiB2YWx1ZTtcbiAgfSxcbn07XG5cbmNvbnN0IHRvanNvblZhbHVlTWFwOiBhbnkgPSB7XG4gIGFycmF5OiAodmFsdWU6IGFueSkgPT4ge1xuICAgIGNvbnN0IHJlc3VsdCA9IFtdO1xuICAgIGZvciAoY29uc3QgaXRlciBvZiB2YWx1ZSkge1xuICAgICAgaWYgKGl0ZXIgJiYgdHlwZW9mIGl0ZXIgPT09IFwib2JqZWN0XCIpXG4gICAgICAgIHJlc3VsdC5wdXNoKHR5cGVvZiBpdGVyLnRvSlNPTiA9PT0gXCJmdW5jdGlvblwiID8gaXRlci50b0pTT04oKSA6IGRlZXBDb3B5KGl0ZXIpKTtcbiAgICAgIGVsc2VcbiAgICAgICAgcmVzdWx0LnB1c2goaXRlcik7XG4gICAgfVxuICAgIHJldHVybiByZXN1bHQ7XG4gIH0sXG4gIGJvb2xlYW46ICh2YWx1ZTogYW55KSA9PiB7XG4gICAgcmV0dXJuIHZhbHVlO1xuICB9LFxuICBudW1iZXI6ICh2YWx1ZTogYW55KSA9PiB7XG4gICAgcmV0dXJuIHZhbHVlO1xuICB9LFxuICBzdHJpbmc6ICh2YWx1ZTogYW55KSA9PiB7XG4gICAgcmV0dXJuIHZhbHVlO1xuICB9LFxuICBBYnNvbHV0ZVBhdGg6ICh2YWx1ZTogYW55KSA9PiB7XG4gICAgcmV0dXJuIHZhbHVlLnRvSlNPTigpO1xuICB9LFxuICBGaWxlUGF0aDogKHZhbHVlOiBhbnkpID0+IHtcbiAgICByZXR1cm4gdmFsdWUudG9KU09OKCk7XG4gIH0sXG4gIERpclBhdGg6ICh2YWx1ZTogYW55KSA9PiB7XG4gICAgcmV0dXJuIHZhbHVlLnRvSlNPTigpO1xuICB9LFxuICBvYmplY3Q6ICh2YWx1ZTogYW55KSA9PiB7XG4gICAgcmV0dXJuIGRlZXBDb3B5KHZhbHVlKTtcbiAgfSxcbn07XG5cbmV4cG9ydCBmdW5jdGlvbiBtYWtlSlNPTlZhbHVlKGVudHJ5OiBWYXJpYWJsZUVudHJ5LCB2YWx1ZTogYW55KTogYW55IHtcbiAgaWYgKEFycmF5LmlzQXJyYXkoZW50cnkudHlwZSkpXG4gICAgcmV0dXJuIHZhbHVlO1xuICBjb25zdCBmdW5jID0gdG9qc29uVmFsdWVNYXBbZW50cnkudHlwZV07XG4gIGlmICghZnVuYylcbiAgICB0aHJvdyBuZXcgRXJyb3IoYFVua25vd24gdHlwZSBcIiR7ZW50cnkudHlwZX1cIiBmb3IgJHtlbnRyeS5uYW1lfWApO1xuICByZXR1cm4gZnVuYyh2YWx1ZSk7XG59XG5cbmV4cG9ydCBmdW5jdGlvbiBtYWtlRW50cnlWYWx1ZShlbnRyeTogVmFyaWFibGVFbnRyeSwgdmFsdWU6IGFueSk6IGFueSB7XG4gIGxldCBuZXdWYWx1ZTogYW55O1xuICBpZiAoQXJyYXkuaXNBcnJheShlbnRyeS50eXBlKSlcbiAgICBuZXdWYWx1ZSA9IGVudHJ5LnR5cGUuaW5jbHVkZXModmFsdWUpID8gdmFsdWUgOiB1bmRlZmluZWQ7XG4gIGVsc2Uge1xuICAgIGNvbnN0IGZ1bmMgPSBtYWtlVmFsdWVNYXBbZW50cnkudHlwZV07XG4gICAgaWYgKCFmdW5jKVxuICAgICAgdGhyb3cgbmV3IEVycm9yKGBVbmtub3duIHR5cGUgXCIke2VudHJ5LnR5cGV9XCIgZm9yICR7ZW50cnkubmFtZX1gKTtcbiAgICBuZXdWYWx1ZSA9IGZ1bmModmFsdWUpO1xuICB9XG4gIGlmIChuZXdWYWx1ZSA9PT0gdW5kZWZpbmVkKVxuICAgIHRocm93IG5ldyBUeXBlRXJyb3IoYEF0dGVtcHRpbmcgdG8gc2V0IFwiJHt2YWx1ZX1cIiB0byAke2VudHJ5Lm5hbWV9IGFzIGFuICR7ZW50cnkudHlwZX1gKTtcbiAgcmV0dXJuIG5ld1ZhbHVlO1xufVxuXG5leHBvcnQgZnVuY3Rpb24gY29weUVudHJ5VmFsdWUoZW50cnk6IFZhcmlhYmxlRW50cnksIHRyYW5zZm9ybTogKGVudHJ5OiBWYXJpYWJsZUVudHJ5LCB2YWx1ZTogYW55KSA9PiBhbnkpIHtcbiAgY29uc3QgcmVzdWx0OiBWYXJpYWJsZUVudHJ5ID0ge1xuICAgIG5hbWU6IGVudHJ5Lm5hbWUsXG4gICAgdHlwZTogZW50cnkudHlwZSxcbiAgICBncm91cDogZW50cnkuZ3JvdXAsXG4gICAgZGVzY3JpcHRpb246IGVudHJ5LmRlc2NyaXB0aW9uLFxuICB9O1xuICBpZiAoZW50cnkuaW5pdFZhbHVlICE9PSB1bmRlZmluZWQpXG4gICAgcmVzdWx0LmluaXRWYWx1ZSA9IHRyYW5zZm9ybShlbnRyeSwgZW50cnkuaW5pdFZhbHVlKTtcbiAgaWYgKGVudHJ5LnZhbHVlICE9PSB1bmRlZmluZWQpXG4gICAgcmVzdWx0LnZhbHVlID0gdHJhbnNmb3JtKGVudHJ5LCBlbnRyeS52YWx1ZSk7XG4gIHJldHVybiByZXN1bHQ7XG59XG5cbmV4cG9ydCBmdW5jdGlvbiBmcm9tSlNPTih2YXJpYWJsZU1hcDogVmFyaWFibGVNYXApOiBWYXJpYWJsZU1hcCB7XG4gIGNvbnN0IHJlc3VsdDogVmFyaWFibGVNYXAgPSB7fTtcbiAgZm9yIChjb25zdCBba2V5LCB2YWxdIG9mIE9iamVjdC5lbnRyaWVzKHZhcmlhYmxlTWFwKSlcbiAgICByZXN1bHRba2V5XSA9IGNvcHlFbnRyeVZhbHVlKHZhbCwgbWFrZUVudHJ5VmFsdWUpO1xuICByZXR1cm4gcmVzdWx0O1xufVxuXG5leHBvcnQgZnVuY3Rpb24gdG9KU09OKHZhcmlhYmxlTWFwOiBWYXJpYWJsZU1hcCk6IFZhcmlhYmxlTWFwIHtcbiAgY29uc3QgcmVzdWx0OiBWYXJpYWJsZU1hcCA9IHt9O1xuICBmb3IgKGNvbnN0IFtrZXksIHZhbF0gb2YgT2JqZWN0LmVudHJpZXModmFyaWFibGVNYXApKVxuICAgIHJlc3VsdFtrZXldID0gY29weUVudHJ5VmFsdWUodmFsLCBtYWtlSlNPTlZhbHVlKTtcbiAgcmV0dXJuIHJlc3VsdDtcbn1cblxuZXhwb3J0IGZ1bmN0aW9uIHNldEVudHJ5VmFsdWUoZW50cnk6IFZhcmlhYmxlRW50cnksIHZhbHVlOiBhbnkpOiBhbnkge1xuICBlbnRyeS52YWx1ZSA9IG1ha2VFbnRyeVZhbHVlKGVudHJ5LCB2YWx1ZSk7XG59XG5cbmV4cG9ydCBmdW5jdGlvbiBzZXQodmFyaWFibGVNYXA6IFZhcmlhYmxlTWFwLCBuYW1lOiBzdHJpbmcsIHZhbHVlOiBhbnkpOiB2b2lkIHtcbiAgY29uc3QgZW50cnkgPSB2YXJpYWJsZU1hcFtuYW1lXTtcbiAgaWYgKCFlbnRyeSlcbiAgICB0aHJvdyBuZXcgRXJyb3IoYFZhcmlhYmxlIFwiJHtuYW1lfVwiIGRvZXMgbm90IGV4aXN0c2ApO1xuICBzZXRFbnRyeVZhbHVlKGVudHJ5LCB2YWx1ZSk7XG59XG5cbmV4cG9ydCBmdW5jdGlvbiByZXNldCh2YXJpYWJsZU1hcDogVmFyaWFibGVNYXAsIG5hbWU6IHN0cmluZyk6IHZvaWQge1xuICBjb25zdCBlbnRyeSA9IHZhcmlhYmxlTWFwW25hbWVdO1xuICBpZiAoIWVudHJ5KVxuICAgIHRocm93IG5ldyBFcnJvcihgVmFyaWFibGUgXCIke25hbWV9XCIgZG9lcyBub3QgZXhpc3RzYCk7XG4gIGVudHJ5LnZhbHVlID0gdW5kZWZpbmVkO1xufVxuXG5leHBvcnQgZnVuY3Rpb24gZGVmaW5lVmFyaWFibGUobWFwOiBWYXJpYWJsZU1hcCwgZ3JvdXA6IHN0cmluZywgbmFtZTogc3RyaW5nLCBkZXNjcmlwdG9yOiBWYXJpYWJsZURlc2NyaXB0b3IpIHtcbiAgbGV0IGRlZmluZUVudHJ5ID0gbWFwW25hbWVdO1xuICBsZXQgaXNWYWxpZFZhbHVlID0gKHZhbHVlOiBhbnkpID0+IHRydWU7XG4gIGlmICghZGVmaW5lRW50cnkpIHtcbiAgICBkZWZpbmVFbnRyeSA9IHtcbiAgICAgIG5hbWUsXG4gICAgICB0eXBlOiBcIlwiLCBncm91cCwgdmFsdWU6IHVuZGVmaW5lZCwgIGluaXRWYWx1ZTogdW5kZWZpbmVkLCBkZXNjcmlwdGlvbjogXCJcIixcbiAgICB9O1xuICAgIG1hcFtuYW1lXSA9IGRlZmluZUVudHJ5O1xuICB9XG4gIGVsc2UgaWYgKGdyb3VwICE9PSBkZWZpbmVFbnRyeS5ncm91cCkge1xuICAgIGlmIChkZWZpbmVFbnRyeS5ncm91cClcbiAgICAgIHRocm93IG5ldyBFcnJvcihgQXR0ZW1wdGluZyB0byByZWNyZWF0ZSBcIiR7bmFtZX1cIiB2YXJpYWJsZSB3aXRoIFwiJHtkZWZpbmVFbnRyeS5ncm91cH1cIiBncm91cCBpbiBhbm90aGVyIFwiJHtncm91cH1cImApO1xuICAgIGRlZmluZUVudHJ5Lmdyb3VwID0gZ3JvdXA7XG4gIH1cblxuICBkZWZpbmVFbnRyeS50eXBlID0gZGVzY3JpcHRvci50eXBlIHx8IGRlZmluZUVudHJ5LnR5cGU7XG4gIGRlZmluZUVudHJ5LmRlc2NyaXB0aW9uID0gZGVzY3JpcHRvci5kZXNjcmlwdGlvbiB8fCBkZWZpbmVFbnRyeS5kZXNjcmlwdGlvbjtcblxuICBsZXQgdHlwZTogc3RyaW5nIHwgc3RyaW5nW107XG4gIGlmIChkZWZpbmVFbnRyeS50eXBlKVxuICAgIHR5cGUgPSBkZWZpbmVFbnRyeS50eXBlO1xuICBlbHNlIGlmIChBcnJheS5pc0FycmF5KGRlc2NyaXB0b3IudmFsdWUpKVxuICAgIHR5cGUgPSBcImFycmF5XCI7XG4gIGVsc2UgaWYgKGRlc2NyaXB0b3IudmFsdWUgaW5zdGFuY2VvZiBBYnNvbHV0ZVBhdGgpXG4gICAgdHlwZSA9IFwiQWJzb2x1dGVQYXRoXCI7XG4gIGVsc2VcbiAgICB0eXBlID0gdHlwZW9mIGRlc2NyaXB0b3IudmFsdWU7XG5cbiAgaWYgKEFycmF5LmlzQXJyYXkodHlwZSkpIHtcbiAgICBjb25zdCBlbnVtTGlzdCA9IHR5cGU7XG4gICAgbGV0IGl0ZW1UeXBlO1xuICAgIGZvciAoY29uc3QgaXRlciBvZiBlbnVtTGlzdCkge1xuICAgICAgY29uc3QgaXQgPSB0eXBlb2YgaXRlcjtcbiAgICAgIGlmICghaXRlbVR5cGUpXG4gICAgICAgIGl0ZW1UeXBlID0gaXQ7XG4gICAgICBlbHNlIGlmIChpdGVtVHlwZSAhPT0gaXQpXG4gICAgICAgIHRocm93IG5ldyBFcnJvcihgQWxsIGVsZW1lbnRzIGZvciAke25hbWV9IG11c3QgYmUgb2YgdGhlIHNhbWUgdHlwZWApO1xuICAgIH1cbiAgICBpZiAoaXRlbVR5cGUgIT09IFwiYm9vbGVhblwiICYmIGl0ZW1UeXBlICE9PSBcIm51bWJlclwiICYmIGl0ZW1UeXBlICE9PSBcInN0cmluZ1wiKVxuICAgICAgdGhyb3cgbmV3IEVycm9yKGBFbnVtICR7bmFtZX0gbm90IHN1cHBvcnQgJHtpdGVtVHlwZX0gdHlwZWApO1xuICAgIGlzVmFsaWRWYWx1ZSA9ICh2YWx1ZTogYW55KSA9PiBlbnVtTGlzdC5pbmNsdWRlcyh2YWx1ZSk7XG4gIH1cbiAgZWxzZSBpZiAodHlwZSA9PT0gXCJib29sZWFuXCIpIHtcbiAgICBpc1ZhbGlkVmFsdWUgPSAodmFsdWU6IGFueSkgPT4gdHlwZW9mIHZhbHVlID09PSBcImJvb2xlYW5cIjtcbiAgfVxuICBlbHNlIGlmICh0eXBlID09PSBcIm51bWJlclwiKSB7XG4gICAgaXNWYWxpZFZhbHVlID0gKHZhbHVlOiBhbnkpID0+IHR5cGVvZiB2YWx1ZSA9PT0gXCJudW1iZXJcIjtcbiAgfVxuICBlbHNlIGlmICh0eXBlID09PSBcInN0cmluZ1wiKSB7XG4gICAgaXNWYWxpZFZhbHVlID0gKHZhbHVlOiBhbnkpID0+IHR5cGVvZiB2YWx1ZSA9PT0gXCJzdHJpbmdcIjtcbiAgfVxuICBlbHNlIGlmICh0eXBlID09PSBcImFycmF5XCIpIHtcbiAgICBpc1ZhbGlkVmFsdWUgPSBBcnJheS5pc0FycmF5O1xuICB9XG4gIGVsc2UgaWYgKHR5cGUgPT09IFwiQWJzb2x1dGVQYXRoXCIgfHwgdHlwZSA9PT0gXCJGaWxlUGF0aFwiIHx8IHR5cGUgPT09IFwiRGlyUGF0aFwiKSB7XG4gICAgaXNWYWxpZFZhbHVlID0gKHZhbHVlOiBhbnkpID0+ICEhQWJzb2x1dGVQYXRoLmNyZWF0ZSh2YWx1ZSk7XG4gIH1cbiAgZWxzZSBpZiAodHlwZSAhPT0gXCJvYmplY3RcIiAmJiB0eXBlICE9PSBcImVudW1cIikge1xuICAgIHRocm93IG5ldyBFcnJvcihgVmFyaWFibGUgXCIke25hbWV9XCIgaGFzIHdyb25nIFwiJHt0eXBlfVwiIHR5cGVgKTtcbiAgfVxuXG4gIGlmIChkZXNjcmlwdG9yLnZhbHVlID09PSB1bmRlZmluZWQpIHtcbiAgICBkZWZpbmVFbnRyeS5pbml0VmFsdWUgPSAodHlwZSA9PT0gXCJhcnJheVwiKSA/IFtdIDogdW5kZWZpbmVkO1xuICB9XG4gIGVsc2Uge1xuICAgIGlmICghaXNWYWxpZFZhbHVlKGRlc2NyaXB0b3IudmFsdWUpKVxuICAgICAgICB0aHJvdyBuZXcgVHlwZUVycm9yKGBBdHRlbXB0aW5nIHRvIHNldCBcIiR7ZGVzY3JpcHRvci52YWx1ZX1cIiB0byAke25hbWV9IGFzIGluaXRWYWx1ZWApO1xuICAgIGRlZmluZUVudHJ5LmluaXRWYWx1ZSA9ICh0eXBlID09PSBcImFycmF5XCIpID8gQXJyYXkuZnJvbShkZXNjcmlwdG9yLnZhbHVlKSA6IGRlc2NyaXB0b3IudmFsdWU7XG4gIH1cblxuICBkZWZpbmVFbnRyeS50eXBlID0gdHlwZTtcbiAgaWYgKGRlZmluZUVudHJ5LmluaXRWYWx1ZSAhPT0gdW5kZWZpbmVkKSB7XG4gICAgZGVmaW5lRW50cnkuaW5pdFZhbHVlID0gbWFrZUVudHJ5VmFsdWUoZGVmaW5lRW50cnksIGRlZmluZUVudHJ5LmluaXRWYWx1ZSk7XG4gIH1cbiAgaWYgKGRlZmluZUVudHJ5LnZhbHVlICE9PSB1bmRlZmluZWQpIHtcbiAgICBkZWZpbmVFbnRyeS52YWx1ZSA9IG1ha2VFbnRyeVZhbHVlKGRlZmluZUVudHJ5LCBkZWZpbmVFbnRyeS52YWx1ZSk7XG4gIH1cbn1cblxuZXhwb3J0IGZ1bmN0aW9uIGNyZWF0ZVByb3h5PFQ+KG1hcDogVmFyaWFibGVNYXAsIG8/OiBhbnkpOiBUIHtcbiAgbyA9IG8gfHwge307XG4gIGNvbnN0IGhhbmRsZXI6IFByb3h5SGFuZGxlcjxhbnk+ID0ge1xuICAgIGdldCh0YXJnZXQ6IFZhcmlhYmxlTWFwLCBrZXk6IHN0cmluZywgcmVjZWl2ZXI6IGFueSkge1xuICAgICAgY29uc3QgZW50cnkgPSB0YXJnZXRba2V5XTtcbiAgICAgIGlmIChlbnRyeSlcbiAgICAgICAgcmV0dXJuIGdldEVudHJ5VmFsdWUoZW50cnkpO1xuICAgICAgcmV0dXJuIG9ba2V5XTtcbiAgICB9LFxuICAgIHNldCh0YXJnZXQ6IFZhcmlhYmxlTWFwLCBrZXk6IHN0cmluZywgdmFsdWU6IGFueSk6IGJvb2xlYW4ge1xuICAgICAgY29uc3QgZW50cnkgPSB0YXJnZXRba2V5XTtcbiAgICAgIGlmIChlbnRyeSlcbiAgICAgICAgc2V0RW50cnlWYWx1ZShlbnRyeSwgdmFsdWUpO1xuICAgICAgZWxzZVxuICAgICAgICBkZWZpbmVWYXJpYWJsZSh0YXJnZXQsIFwiXCIsIGtleSwgdG9EZXNjcmlwdG9yKHZhbHVlKSk7XG4gICAgICByZXR1cm4gdHJ1ZTtcbiAgICB9LFxuICAgIGhhcyh0YXJnZXQ6IFZhcmlhYmxlTWFwLCBrZXk6IHN0cmluZykge1xuICAgICAgcmV0dXJuIHRhcmdldC5oYXNPd25Qcm9wZXJ0eShrZXkpIHx8IChrZXkgaW4gdGFyZ2V0KTtcbiAgICB9LFxuICAgIG93bktleXModGFyZ2V0OiBWYXJpYWJsZU1hcCkge1xuICAgICAgcmV0dXJuIE9iamVjdC5rZXlzKHRhcmdldCk7XG4gICAgfSxcbiAgICBkZWxldGVQcm9wZXJ0eSh0YXJnZXQ6IFZhcmlhYmxlTWFwLCBrZXk6IHN0cmluZykge1xuICAgICAgdGhyb3cgbmV3IEVycm9yKGBDYW5ub3QgZGVsZXRlICR7a2V5fSB2YWx1ZWApO1xuICAgIH0sXG4gIH07XG4gIHJldHVybiBuZXcgUHJveHkobWFwLCBoYW5kbGVyKTtcbn1cblxuZXhwb3J0IGZ1bmN0aW9uIGNsb25lVmFyaWFibGVNYXAobWFwOiBWYXJpYWJsZU1hcCkge1xuICBjb25zdCByZXN1bHQ6IFZhcmlhYmxlTWFwID0ge307XG4gIGZvciAoY29uc3QgWyBuYW1lLCBlbnRyeSBdIG9mIE9iamVjdC5lbnRyaWVzKG1hcCkpIHtcbiAgICBkZWZpbmVWYXJpYWJsZShyZXN1bHQsIGVudHJ5Lmdyb3VwLCBuYW1lLCB7XG4gICAgICB0eXBlOiBlbnRyeS50eXBlLFxuICAgICAgZGVzY3JpcHRpb246IGVudHJ5LmRlc2NyaXB0aW9uLFxuICAgICAgdmFsdWU6IGVudHJ5LmluaXRWYWx1ZSxcbiAgICB9KTtcbiAgICBpZiAoZ2V0RW50cnlWYWx1ZShlbnRyeSkgIT09IHVuZGVmaW5lZClcbiAgICAgIHJlc3VsdFtuYW1lXS52YWx1ZSA9IGdldEVudHJ5VmFsdWUoZW50cnkpO1xuICB9XG4gIHJldHVybiByZXN1bHQ7XG59XG5cbmV4cG9ydCBmdW5jdGlvbiBleHRlbmRWYXJpYWJsZU1hcEJ5VmFsdWVzKG1hcDogVmFyaWFibGVNYXAsIGdyb3VwOiBzdHJpbmcsIHZhbHVlczogVmFyaWFudE1hcCkge1xuICBmb3IgKGNvbnN0IFtuYW1lLCB2YWx1ZV0gb2YgT2JqZWN0LmVudHJpZXModmFsdWVzKSkge1xuICAgIGRlZmluZVZhcmlhYmxlKG1hcCwgZ3JvdXAsIG5hbWUsIHsgdmFsdWUgfSk7XG4gICAgbWFwW25hbWVdLnZhbHVlID0gdmFsdWU7XG4gIH1cbn1cblxuZXhwb3J0IGZ1bmN0aW9uIGRlZmluZVZhcmlhYmxlc0luVmFyaWFibGVNYXAobWFwOiBWYXJpYWJsZU1hcCwgZ3JvdXA6IHN0cmluZywgdmFyaWFibGVzOiBhbnkpIHtcbiAgZm9yIChjb25zdCBbbmFtZSwgdmFsdWVdIG9mIE9iamVjdC5lbnRyaWVzKHZhcmlhYmxlcykpIHtcbiAgICBjb25zdCBkZXNjcmlwdG9yID0gdmFsdWUgJiYgdHlwZW9mIHZhbHVlID09PSBcIm9iamVjdFwiID8gdmFsdWUgOiB7dmFsdWUgfTtcbiAgICBkZWZpbmVWYXJpYWJsZShtYXAsIGdyb3VwLCBuYW1lLCBkZXNjcmlwdG9yKTtcbiAgfVxufVxuXG5leHBvcnQgZnVuY3Rpb24gZ2V0VmFyaWFibGVzQnlHcm91cChtYXA6IFZhcmlhYmxlTWFwLCBncm91cD86IHN0cmluZykge1xuICBjb25zdCByZXN1bHQ6IGFueSA9IHt9O1xuICBmb3IgKGNvbnN0IFsgbmFtZSwgZW50cnkgXSBvZiBPYmplY3QuZW50cmllcyhtYXApKSB7XG4gICAgaWYgKGdyb3VwICE9PSB1bmRlZmluZWQgJiYgZW50cnkuZ3JvdXAgJiYgZW50cnkuZ3JvdXAgIT09IGdyb3VwKVxuICAgICAgY29udGludWU7XG4gICAgcmVzdWx0W25hbWVdID0ge1xuICAgICAgdHlwZTogZW50cnkudHlwZSxcbiAgICAgIGRlc2NyaXB0aW9uOiBlbnRyeS5kZXNjcmlwdGlvbixcbiAgICAgIHZhbHVlOiBnZXRFbnRyeVZhbHVlKGVudHJ5KSxcbiAgICB9O1xuICB9XG4gIHJldHVybiByZXN1bHQ7XG59XG5cbmV4cG9ydCBmdW5jdGlvbiBjcmVhdGVWYXJpYWJsZVZhbHVlcyhtYXA6IFZhcmlhYmxlTWFwLCBncm91cD86IHN0cmluZyk6IGFueSB7XG4gIGNvbnN0IHJlc3VsdDogYW55ID0ge307XG4gIGZvciAoY29uc3QgWyBuYW1lLCBlbnRyeSBdIG9mIE9iamVjdC5lbnRyaWVzKG1hcCkpIHtcbiAgICBpZiAoIWdyb3VwIHx8IGdyb3VwID09PSBlbnRyeS5ncm91cClcbiAgICAgIHJlc3VsdFtuYW1lXSA9IGdldEVudHJ5VmFsdWUoZW50cnkpO1xuICB9XG4gIHJldHVybiByZXN1bHQ7XG59XG5cbmV4cG9ydCBmdW5jdGlvbiBtZXJnZVZhcmlhYmxlcyh0YXJnZXQ6IGFueSwgc291cmNlOiBhbnkpOiBvYmplY3Qge1xuICBpZiAoIXRhcmdldCB8fCB0eXBlb2YgdGFyZ2V0ICE9PSBcIm9iamVjdFwiKVxuICAgIHRocm93IG5ldyBFcnJvcihgVGFyZ2V0ICR7dGFyZ2V0fSBpcyBub3Qgb2JqZWN0YCk7XG4gIGlmICghc291cmNlIHx8IHR5cGVvZiBzb3VyY2UgIT09IFwib2JqZWN0XCIpXG4gICAgdGhyb3cgbmV3IEVycm9yKGBTb3VyY2UgJHtzb3VyY2V9IGlzIG5vdCBvYmplY3RgKTtcbiAgaWYgKEFycmF5LmlzQXJyYXkodGFyZ2V0KSkge1xuICAgIGlmICghQXJyYXkuaXNBcnJheShzb3VyY2UpKVxuICAgICAgdGhyb3cgbmV3IEVycm9yKGBTb3VyY2UgaXMgbm90IGFuIGFycmF5YCk7XG4gICAgZm9yIChjb25zdCBpdGVyIG9mIHNvdXJjZSlcbiAgICAgIHRhcmdldC5wdXNoKGl0ZXIpO1xuICB9XG4gIGVsc2Uge1xuICAgIGZvciAoY29uc3QgWyBrZXksIHZhbCBdIG9mIE9iamVjdC5lbnRyaWVzKHNvdXJjZSkpIHtcbiAgICAgIGlmICghT2JqZWN0Lmhhc093bih0YXJnZXQsIGtleSkpIHtcbiAgICAgICAgdGFyZ2V0W2tleV0gPSB2YWw7XG4gICAgICB9XG4gICAgICBlbHNlIGlmICh0YXJnZXRba2V5XSAmJiB0eXBlb2YgdGFyZ2V0W2tleV0gPT09IFwib2JqZWN0XCIpIHtcbiAgICAgICAgaWYgKCF2YWwgfHwgdHlwZW9mIHZhbCAhPT0gXCJvYmplY3RcIilcbiAgICAgICAgICB0aHJvdyBuZXcgRXJyb3IoYFNvdXJjZSAke2tleX0gaGFzICR7dmFsfSB3aGljaCBpcyBub3QgYW4gb2JqZWN0YCk7XG4gICAgICAgIG1lcmdlVmFyaWFibGVzKHRhcmdldFtrZXldLCB2YWwpO1xuICAgICAgfVxuICAgICAgZWxzZSB7XG4gICAgICAgIHRocm93IG5ldyBFcnJvcihgU291cmNlICR7a2V5fSBoYXMgJHt2YWx9IHdoaWNoIGlzIG5vdCAke3R5cGVvZiB0YXJnZXRba2V5XX1gKTtcbiAgICAgIH1cbiAgICB9XG4gIH1cbiAgcmV0dXJuIHRhcmdldDtcbn1cblxuZXhwb3J0IGZ1bmN0aW9uIG1lcmdlVmFyaWFibGVNYXAodGFyZ2V0OiBWYXJpYWJsZU1hcCwgc291cmNlOiBhbnkpOiBWYXJpYWJsZU1hcCB7XG4gIGZvciAoY29uc3QgW25hbWUsIHZhbHVlXSBvZiBPYmplY3QuZW50cmllcyhzb3VyY2UpKSB7XG4gICAgbGV0IGVudHJ5ID0gdGFyZ2V0W25hbWVdO1xuICAgIGlmICghZW50cnkpXG4gICAgICBkZWZpbmVWYXJpYWJsZSh0YXJnZXQsIFwiXCIsIG5hbWUsIHsgdmFsdWUgfSk7XG4gICAgZWxzZSB7XG4gICAgICBsZXQgZGVzdCA9IGdldEVudHJ5VmFsdWUoZW50cnkpO1xuICAgICAgc2V0RW50cnlWYWx1ZShlbnRyeSwgKGRlc3QgJiYgdHlwZW9mIGRlc3QgPT09IFwib2JqZWN0XCIpID8gbWVyZ2VWYXJpYWJsZXMoZGVzdCwgdmFsdWUpIDogdmFsdWUpO1xuICAgIH1cbiAgfVxuICByZXR1cm4gdGFyZ2V0O1xufVxuXG59IC8vIFNjb3BlSGVscGVyXG4iLCIvKlxuICogTUlUIExpY2Vuc2VcbiAqXG4gKiBDb3B5cmlnaHQgKGMpIDIwMjUgIFl1cmlpIFlha3ViaW4gKHl1cmlpLnlha3ViaW5AZ21haWwuY29tKVxuICpcbiAqIFBlcm1pc3Npb24gaXMgZ3JhbnRlZCB0byB1c2UsIGNvcHksIG1vZGlmeSwgYW5kIGRpc3RyaWJ1dGUgdGhpcyBzb2Z0d2FyZVxuICogdW5kZXIgdGhlIE1JVCBMaWNlbnNlLiBTZWUgTElDRU5TRSBmaWxlIGZvciBkZXRhaWxzLlxuICovXG5cbmltcG9ydCB7IEN1c3RvbVNjcmlwdCB9IGZyb20gXCJAL2NvcmUvQ3VzdG9tU2NyaXB0XCI7XG5cbmNvbnN0IE1BUCA9IFN5bWJvbChcIk1BUFwiKTtcbmNvbnN0IEVOVFJJRVMgPSBTeW1ib2woXCJFTlRSSUVTXCIpO1xuXG5leHBvcnQgY2xhc3MgU2NyaXB0Q29sbGVjdGlvbiB7XG4gIHByaXZhdGUgW01BUF06IHsgW25hbWU6IHN0cmluZ106IEN1c3RvbVNjcmlwdCB9O1xuICBwcml2YXRlIFtFTlRSSUVTXTogQ3VzdG9tU2NyaXB0W107XG5cbiAgcHJpdmF0ZSBjb25zdHJ1Y3RvcigpIHtcbiAgICB0aGlzW01BUF0gPSB7fTtcbiAgICB0aGlzW0VOVFJJRVNdID0gW107XG4gIH1cblxuICBwdWJsaWMgc3RhdGljIGNyZWF0ZSgpIHtcbiAgICByZXR1cm4gT2JqZWN0LnNlYWwobmV3IFNjcmlwdENvbGxlY3Rpb24pO1xuICB9XG5cbiAgcHVibGljIGdldCBFTlRSSUVTKCkge1xuICAgIHJldHVybiB0aGlzW0VOVFJJRVNdO1xuICB9XG5cbiAgcHVibGljIGdldChuYW1lOiBzdHJpbmcpOiBDdXN0b21TY3JpcHQgfCB1bmRlZmluZWQge1xuICAgIHJldHVybiB0aGlzW01BUF1bbmFtZV07XG4gIH1cblxuICBwdWJsaWMgYWRkKHRhcmdldDogQ3VzdG9tU2NyaXB0LCBuYW1lPzogc3RyaW5nKSB7XG4gICAgaWYgKG5hbWUpIHtcbiAgICAgIGlmICh0aGlzW01BUF1bbmFtZV0pXG4gICAgICAgIHRocm93IG5ldyBFcnJvcihgU2NyaXB0IFwiJHtuYW1lfVwiIGV4aXN0c2ApO1xuICAgICAgdGhpc1tNQVBdW25hbWVdID0gdGFyZ2V0O1xuICAgIH1cbiAgICB0aGlzW0VOVFJJRVNdLnB1c2godGFyZ2V0KTtcbiAgfVxuICBcbiAgcHVibGljIHRvSlNPTigpOiBvYmplY3Qge1xuICAgIHJldHVybiB0aGlzW0VOVFJJRVNdO1xuICB9XG59O1xuIiwiLypcbiAqIE1JVCBMaWNlbnNlXG4gKlxuICogQ29weXJpZ2h0IChjKSAyMDI1ICBZdXJpaSBZYWt1YmluICh5dXJpaS55YWt1YmluQGdtYWlsLmNvbSlcbiAqXG4gKiBQZXJtaXNzaW9uIGlzIGdyYW50ZWQgdG8gdXNlLCBjb3B5LCBtb2RpZnksIGFuZCBkaXN0cmlidXRlIHRoaXMgc29mdHdhcmVcbiAqIHVuZGVyIHRoZSBNSVQgTGljZW5zZS4gU2VlIExJQ0VOU0UgZmlsZSBmb3IgZGV0YWlscy5cbiAqL1xuXG5pbXBvcnQgeyBWYXJpYWJsZU1hcCB9IGZyb20gXCJAL2NvcmUvU2NvcGVcIjtcbmltcG9ydCB7IEdlbmVyYWxDb250ZXh0LCBjcmVhdGVDb250ZXh0IH0gZnJvbSBcIkAvY29yZS9CYXNlQ29udGV4dFwiO1xuXG5jb25zdCBTQ09QRSA9IFN5bWJvbChcIlNDT1BFXCIpO1xuXG5leHBvcnQgY2xhc3MgU2NyaXB0Q29udGV4dCBleHRlbmRzIEdlbmVyYWxDb250ZXh0IHtcbiAgW1NDT1BFXTogVmFyaWFibGVNYXA7XG5cbiAgY29uc3RydWN0b3Ioc2NvcGU6IFZhcmlhYmxlTWFwKSB7XG4gICAgc3VwZXIoc2NvcGUpO1xuICAgIHRoaXNbU0NPUEVdID0gc2NvcGU7XG4gIH1cblxuICBwdWJsaWMgc3RhdGljIGNyZWF0ZSh2YXJpYWJsZU1hcDogVmFyaWFibGVNYXApIHtcbiAgICByZXR1cm4gY3JlYXRlQ29udGV4dChuZXcgU2NyaXB0Q29udGV4dCh2YXJpYWJsZU1hcCkpO1xuICB9XG59O1xuIiwiLypcbiAqIE1JVCBMaWNlbnNlXG4gKlxuICogQ29weXJpZ2h0IChjKSAyMDI1ICBZdXJpaSBZYWt1YmluICh5dXJpaS55YWt1YmluQGdtYWlsLmNvbSlcbiAqXG4gKiBQZXJtaXNzaW9uIGlzIGdyYW50ZWQgdG8gdXNlLCBjb3B5LCBtb2RpZnksIGFuZCBkaXN0cmlidXRlIHRoaXMgc29mdHdhcmVcbiAqIHVuZGVyIHRoZSBNSVQgTGljZW5zZS4gU2VlIExJQ0VOU0UgZmlsZSBmb3IgZGV0YWlscy5cbiAqL1xuXG5leHBvcnQgaW50ZXJmYWNlIFNpbXBsZU9iamVjdCB7XG4gIHR5cGU6IHN0cmluZztcbiAgW25hbWU6IHN0cmluZ106IG51bGwgfCBib29sZWFuIHwgbnVtYmVyIHwgc3RyaW5nIHxvYmplY3Q7XG59O1xuXG50eXBlIEluc3RhbmNlQ3JlYXRlRnVuY3Rpb24gPSAob2JqZWN0OiBTaW1wbGVPYmplY3QpID0+IGFueTtcblxuY29uc3QgX2NyZWF0b3JzID0gbmV3IE1hcDxzdHJpbmcsIEluc3RhbmNlQ3JlYXRlRnVuY3Rpb24+KCk7XG5cbmV4cG9ydCBuYW1lc3BhY2UgU2ltcGxlT2JqZWN0IHtcblxuZXhwb3J0IGZ1bmN0aW9uIHJlZ2lzdGVySW5zdGFuY2VDcmVhdG9yKG5hbWU6IHN0cmluZywgZnVuYzogSW5zdGFuY2VDcmVhdGVGdW5jdGlvbikge1xuICBpZiAoIW5hbWUgJiYgX2NyZWF0b3JzLmhhcyhuYW1lKSlcbiAgICB0aHJvdyBuZXcgRXJyb3IoYE5hbWUgXCIke25hbWV9XCIgaXMgd3Jvbmcgb3IgcmVnaXN0ZXJlZGApO1xuICBfY3JlYXRvcnMuc2V0KG5hbWUsIGZ1bmMpO1xufVxuXG5leHBvcnQgZnVuY3Rpb24gY3JlYXRlSW5zdGFuY2Uob2JqZWN0OiBTaW1wbGVPYmplY3QpOiBhbnkge1xuICBjb25zdCBmdW5jID0gX2NyZWF0b3JzLmdldChvYmplY3QudHlwZSk7XG4gIGlmICghZnVuYylcbiAgICB0aHJvdyBuZXcgRXJyb3IoYFVrbm93biBvYmplY3QgdHlwZTogJHtKU09OLnN0cmluZ2lmeShvYmplY3QpfWApO1xuICByZXR1cm4gZnVuYyhvYmplY3QpO1xufVxuXG59IC8vIG5hbWVzcGFjZSBTaW1wbGVPYmplY3RcbiIsIi8qXG4gKiBNSVQgTGljZW5zZVxuICpcbiAqIENvcHlyaWdodCAoYykgMjAyNSAgWXVyaWkgWWFrdWJpbiAoeXVyaWkueWFrdWJpbkBnbWFpbC5jb20pXG4gKlxuICogUGVybWlzc2lvbiBpcyBncmFudGVkIHRvIHVzZSwgY29weSwgbW9kaWZ5LCBhbmQgZGlzdHJpYnV0ZSB0aGlzIHNvZnR3YXJlXG4gKiB1bmRlciB0aGUgTUlUIExpY2Vuc2UuIFNlZSBMSUNFTlNFIGZpbGUgZm9yIGRldGFpbHMuXG4gKi9cblxuaW1wb3J0IHsgZW5zdXJlQm9vbGVhbiB9IGZyb20gXCJAL3V0aWxzL1N0cmljdFR5cGVcIjtcbmltcG9ydCB7IEFic29sdXRlUGF0aCB9IGZyb20gXCJAL2NvcmUvQWJzb2x1dGVQYXRoXCI7XG5cbmNvbnN0IExBTkdVQUdFICAgICAgICAgPSBTeW1ib2woXCJMQU5HVUFHRVwiKTtcbmNvbnN0IEhFQURFUl9GSUxFX09OTFkgPSBTeW1ib2woXCJIRUFERVJfRklMRV9PTkxZXCIpO1xuY29uc3QgREVGSU5FUyAgICAgICAgICA9IFN5bWJvbChcIkRFRklORVNcIik7XG5jb25zdCBDT01QSUxFX1BBVEggICAgID0gU3ltYm9sKFwiQ09NUElMRV9QQVRIXCIpO1xuY29uc3QgQ09NUElMRV9GTEFHUyAgICA9IFN5bWJvbChcIkNPTVBJTEVfRkxBR1NcIik7XG5jb25zdCBGSUxFICAgICAgICAgICAgID0gU3ltYm9sKFwiRklMRVwiKTtcbmNvbnN0IEJBU0VfRElSICAgICAgICAgPSBTeW1ib2woXCJCQVNFX0RJUlwiKTtcblxuZXhwb3J0IGNsYXNzIFNvdXJjZUZpbGUge1xuICBwcml2YXRlIFtMQU5HVUFHRV06IHN0cmluZztcbiAgcHJpdmF0ZSBbSEVBREVSX0ZJTEVfT05MWV06IGJvb2xlYW47XG4gIHByaXZhdGUgW0ZJTEVdOiBBYnNvbHV0ZVBhdGg7XG4gIHByaXZhdGUgW0JBU0VfRElSXTogQWJzb2x1dGVQYXRoO1xuICBwcml2YXRlIFtERUZJTkVTXTogc3RyaW5nW107XG4gIHByaXZhdGUgW0NPTVBJTEVfUEFUSF06IHN0cmluZztcbiAgcHJpdmF0ZSBbQ09NUElMRV9GTEFHU106IEFycmF5PHN0cmluZ3xzdHJpbmdbXT47XG5cbiAgcHJpdmF0ZSBjb25zdHJ1Y3RvcihmaWxlbmFtZTogQWJzb2x1dGVQYXRoLCBiYXNlRGlyOiBBYnNvbHV0ZVBhdGgsIGxhbmd1YWdlOiBzdHJpbmcsIGNvbXBpbGVyUGF0aDogc3RyaW5nLCBjb21waWxlRmxhZ3M6IEFycmF5PHN0cmluZyB8IHN0cmluZ1tdPikge1xuICAgIHRoaXNbRklMRV0gPSBmaWxlbmFtZTtcbiAgICB0aGlzW0JBU0VfRElSXSA9IGJhc2VEaXI7XG4gICAgdGhpc1tMQU5HVUFHRV0gPSBsYW5ndWFnZTtcbiAgICB0aGlzW0hFQURFUl9GSUxFX09OTFldID0gIWxhbmd1YWdlO1xuICAgIHRoaXNbREVGSU5FU10gPSBbXTtcbiAgICB0aGlzW0NPTVBJTEVfUEFUSF0gPSBjb21waWxlclBhdGg7XG4gICAgdGhpc1tDT01QSUxFX0ZMQUdTXSA9IFsgLi4uY29tcGlsZUZsYWdzIF07XG4gIH1cblxuICBwdWJsaWMgc3RhdGljIGNyZWF0ZShmaWxlbmFtZTogQWJzb2x1dGVQYXRoLCBiYXNlRGlyOiBBYnNvbHV0ZVBhdGgsIGxhbmd1YWdlOiBzdHJpbmcsIGNvbXBpbGVyUGF0aDogc3RyaW5nLCBjb21waWxlRmxhZ3M6IEFycmF5PHN0cmluZyB8IHN0cmluZ1tdPikge1xuICAgIHJldHVybiBPYmplY3Quc2VhbChuZXcgU291cmNlRmlsZShmaWxlbmFtZSwgYmFzZURpciwgbGFuZ3VhZ2UsIGNvbXBpbGVyUGF0aCwgY29tcGlsZUZsYWdzKSk7XG4gIH1cblxuICBwdWJsaWMgZ2V0IExBTkdVQUdFKCk6IHN0cmluZyB7XG4gICAgcmV0dXJuIHRoaXNbTEFOR1VBR0VdO1xuICB9XG5cbiAgcHVibGljIGdldCBIRUFERVJfRklMRV9PTkxZKCk6IGJvb2xlYW4ge1xuICAgIHJldHVybiB0aGlzW0hFQURFUl9GSUxFX09OTFldO1xuICB9XG5cbiAgcHVibGljIHNldCBIRUFERVJfRklMRV9PTkxZKHZhbHVlOiBib29sZWFuKSB7XG4gICAgdGhpc1tIRUFERVJfRklMRV9PTkxZXSA9IGVuc3VyZUJvb2xlYW4odmFsdWUpO1xuICB9XG5cbiAgcHVibGljIGdldCBERUZJTkVTKCk6IHN0cmluZ1tdIHtcbiAgICByZXR1cm4gdGhpc1tERUZJTkVTXVxuICB9XG5cbiAgcHVibGljIGFkZERlZmluaXRpb24oZGVmaW5pdGlvbjogc3RyaW5nKSB7XG4gICAgdGhpc1tERUZJTkVTXS5wdXNoKGRlZmluaXRpb24pO1xuICB9XG5cbiAgcHVibGljIGdldCBDT01QSUxFX1BBVEgoKTogc3RyaW5nIHtcbiAgICByZXR1cm4gdGhpc1tDT01QSUxFX1BBVEhdO1xuICB9XG5cbiAgcHVibGljIGdldCBDT01QSUxFX0ZMQUdTKCk6IEFycmF5PHN0cmluZyB8IHN0cmluZ1tdPiB7XG4gICAgcmV0dXJuIHRoaXNbQ09NUElMRV9GTEFHU107XG4gIH1cblxuICBwdWJsaWMgZ2V0IEZJTEUoKTogQWJzb2x1dGVQYXRoIHtcbiAgICByZXR1cm4gdGhpc1tGSUxFXTtcbiAgfVxuXG4gIHB1YmxpYyBnZXQgRklMRV9ESVIoKTogQWJzb2x1dGVQYXRoIHtcbiAgICByZXR1cm4gdGhpc1tGSUxFXS5kaXJuYW1lKCk7XG4gIH1cblxuICBwdWJsaWMgZ2V0IEZJTEVfTkFNRSgpOiBzdHJpbmcge1xuICAgIHJldHVybiB0aGlzW0ZJTEVdLmJhc2VuYW1lKCk7XG4gIH1cblxuICBwdWJsaWMgdG9KU09OKCk6IG9iamVjdCB7XG4gICAgcmV0dXJuIHtcbiAgICAgIExBTkdVQUdFOiB0aGlzW0xBTkdVQUdFXSxcbiAgICAgIEhFQURFUl9GSUxFX09OTFk6IHRoaXNbSEVBREVSX0ZJTEVfT05MWV0sXG4gICAgICBERUZJTkVTOiB0aGlzW0RFRklORVNdLFxuICAgICAgQ09NUElMRV9QQVRIOiB0aGlzW0NPTVBJTEVfUEFUSF0sXG4gICAgICBDT01QSUxFX0ZMQUdTOiB0aGlzW0NPTVBJTEVfRkxBR1NdLFxuICAgICAgRklMRTogdGhpc1tGSUxFXSxcbiAgICAgIEZJTEVfRElSOiB0aGlzLkZJTEVfRElSLFxuICAgICAgRklMRV9OQU1FOiB0aGlzLkZJTEVfTkFNRSxcbiAgICAgIEJBU0VfRElSOiB0aGlzW0JBU0VfRElSXSxcbiAgICB9O1xuICB9XG59XG4iLCIvKlxuICogTUlUIExpY2Vuc2VcbiAqXG4gKiBDb3B5cmlnaHQgKGMpIDIwMjUgIFl1cmlpIFlha3ViaW4gKHl1cmlpLnlha3ViaW5AZ21haWwuY29tKVxuICpcbiAqIFBlcm1pc3Npb24gaXMgZ3JhbnRlZCB0byB1c2UsIGNvcHksIG1vZGlmeSwgYW5kIGRpc3RyaWJ1dGUgdGhpcyBzb2Z0d2FyZVxuICogdW5kZXIgdGhlIE1JVCBMaWNlbnNlLiBTZWUgTElDRU5TRSBmaWxlIGZvciBkZXRhaWxzLlxuICovXG5cbmltcG9ydCB7IHNwYXduU3luYyB9IGZyb20gXCJub2RlOmNoaWxkX3Byb2Nlc3NcIjtcblxuaW1wb3J0IHsgSW50ZXJmYWNlVGFzayB9IGZyb20gXCJAL2NvcmUvTWFrZUludGVyZmFjZXNcIjtcbmltcG9ydCB7IFNpbXBsZU9iamVjdCB9IGZyb20gXCJAL2NvcmUvU2ltcGxlT2JqZWN0XCI7XG5pbXBvcnQgeyBMb2dnZXIgfSBmcm9tIFwiQC9sb2dnZXJcIjtcblxuY29uc3QgbG9nZ2VyID0gTG9nZ2VyLmNyZWF0ZShpbXBvcnQubWV0YS51cmwpO1xuXG5pbnRlcmZhY2UgT3B0aW9ucyB7XG4gIGNvbW1hbmQ6IHN0cmluZztcbiAgYXJnczogc3RyaW5nW107XG4gIGN3ZDogc3RyaW5nO1xufTtcblxuZXhwb3J0IGNsYXNzIFNwYXduU3luY1Rhc2sgZXh0ZW5kcyBJbnRlcmZhY2VUYXNrIHtcbiAgcHJpdmF0ZSBfY29tbWFuZDogc3RyaW5nO1xuICBwcml2YXRlIF9hcmdzOiBzdHJpbmdbXTtcbiAgcHJpdmF0ZSBfY3dkOiBzdHJpbmc7XG5cbiAgcHVibGljIGNvbnN0cnVjdG9yKGNvbW1hbmQ6IHN0cmluZywgYXJnczogc3RyaW5nW10sIGN3ZDogc3RyaW5nKSB7XG4gICAgc3VwZXIoKTtcblxuICAgIHRoaXMuX2NvbW1hbmQgPSBjb21tYW5kO1xuICAgIHRoaXMuX2FyZ3MgPSBhcmdzO1xuICAgIHRoaXMuX2N3ZCA9IGN3ZDtcbiAgfVxuXG4gIHB1YmxpYyBleGVjdXRlKCk6IHZvaWQge1xuICAgIGxvZ2dlci5kZWJ1ZyhcInNwYXduU3luY1wiKTtcbiAgICBsb2dnZXIuZGVidWcoXCIgIGNvbW1hbmRcIiwgdGhpcy5fY29tbWFuZCk7XG4gICAgbG9nZ2VyLmRlYnVnKFwiICBjd2RcIiwgdGhpcy5fY3dkKTtcbiAgICBmb3IgKGxldCBpID0gMDsgaSA8IHRoaXMuX2FyZ3MubGVuZ3RoOyBpKyspXG4gICAgICBsb2dnZXIuZGVidWcoYCAgYXJnc1ske2l9XWAsIHRoaXMuX2FyZ3NbaV0pO1xuXG4gICAgY29uc3QgcmVzdWx0ID0gc3Bhd25TeW5jKHRoaXMuX2NvbW1hbmQsIHRoaXMuX2FyZ3MsIHsgY3dkOiB0aGlzLl9jd2QsIGVuY29kaW5nOiBcInV0Zi04XCIgfSk7XG4gICAgaWYgKHJlc3VsdC5lcnJvciB8fCByZXN1bHQuc3RhdHVzKSB7XG4gICAgICBsb2dnZXIubm90aWNlKFwiY2QgXCIgKyB0aGlzLl9jd2QpO1xuICAgICAgbGV0IGNtZCA9IHRoaXMuX2FyZ3Muam9pbihcIiBcIik7XG4gICAgICBjbWQgPSB0aGlzLl9jb21tYW5kICsgKGNtZCA/IFwiIFwiIDogXCJcIikgKyBjbWQ7XG4gICAgICBsb2dnZXIubm90aWNlKGNtZCk7XG4gICAgICBsb2dnZXIubm90aWNlKFwiXCIpO1xuXG4gICAgICBsb2dnZXIuZmF0YWwocmVzdWx0LnN0ZGVycik7XG5cbiAgICAgIGlmIChyZXN1bHQuZXJyb3IpXG4gICAgICAgICAgdGhyb3cgcmVzdWx0LmVycm9yO1xuXG4gICAgICB0aHJvdyBuZXcgRXJyb3IocmVzdWx0LmVycm9yIGFzIGFueSB8fCBcIlN0YXR1cyBcIiArIHJlc3VsdC5zdGF0dXMpO1xuICAgIH1cbiAgICBpZiAocmVzdWx0LnN0ZG91dCkge1xuICAgICAgZm9yIChjb25zdCBsaW5lIG9mIHJlc3VsdC5zdGRvdXQudHJpbSgpLnNwbGl0KFwiXFxuXCIpKSB7XG4gICAgICAgIGxvZ2dlci5ub3RpY2UobGluZSk7XG4gICAgICB9XG4gICAgfVxuICB9XG5cbiAgcHVibGljIHN0YXRpYyBmcm9tSlNPTihvOiBTaW1wbGVPYmplY3QpIHtcbiAgICBjb25zdCBvcHRpb25zOiBPcHRpb25zICYgU2ltcGxlT2JqZWN0ID0gbyBhcyBhbnk7XG4gICAgcmV0dXJuIG5ldyBTcGF3blN5bmNUYXNrKG9wdGlvbnMuY29tbWFuZCwgb3B0aW9ucy5hcmdzLCBvcHRpb25zLmN3ZCk7XG4gIH1cblxuICBwdWJsaWMgdG9KU09OKCk6IE9wdGlvbnMgJiBTaW1wbGVPYmplY3Qge1xuICAgIHJldHVybiB7XG4gICAgICB0eXBlOiBTcGF3blN5bmNUYXNrLm5hbWUsXG4gICAgICBjb21tYW5kOiB0aGlzLl9jb21tYW5kLFxuICAgICAgYXJnczogdGhpcy5fYXJncyxcbiAgICAgIGN3ZDogdGhpcy5fY3dkLFxuICAgIH1cbiAgfVxufTtcblxuU2ltcGxlT2JqZWN0LnJlZ2lzdGVySW5zdGFuY2VDcmVhdG9yKFNwYXduU3luY1Rhc2submFtZSwgU3Bhd25TeW5jVGFzay5mcm9tSlNPTik7XG4iLCIvKlxuICogTUlUIExpY2Vuc2VcbiAqXG4gKiBDb3B5cmlnaHQgKGMpIDIwMjUgIFl1cmlpIFlha3ViaW4gKHl1cmlpLnlha3ViaW5AZ21haWwuY29tKVxuICpcbiAqIFBlcm1pc3Npb24gaXMgZ3JhbnRlZCB0byB1c2UsIGNvcHksIG1vZGlmeSwgYW5kIGRpc3RyaWJ1dGUgdGhpcyBzb2Z0d2FyZVxuICogdW5kZXIgdGhlIE1JVCBMaWNlbnNlLiBTZWUgTElDRU5TRSBmaWxlIGZvciBkZXRhaWxzLlxuICovXG5cbmltcG9ydCBvcyBmcm9tIFwibm9kZTpvc1wiO1xuaW1wb3J0IHsgREVCVUdfQlVJTERfVFlQRSwgUkVMRUFTRV9CVUlMRF9UWVBFIH0gZnJvbSBcIkAvY29yZS9UeXBlc1wiO1xuaW1wb3J0IHsgSG9zdCB9IGZyb20gXCJAL3V0aWxzL0hvc3RcIjtcblxuZXhwb3J0IGRlZmF1bHQge1xuICBTWVNURU1fTkFNRToge1xuICAgIGRlc2NyaXB0aW9uOiBcIkRlZmluZXMgdGhlIHRhcmdldCBPUyBmb3IgdGhlIGJ1aWxkLCB1c2VkIGluIGNyb3NzLWNvbXBpbGF0aW9uIGFuZCBuYXRpdmUgYnVpbGRzXCIsXG4gICAgdmFsdWU6IFwiTGludXhcIixcbiAgfSxcbiAgU1lTVEVNX1BST0NFU1NPUjoge1xuICAgIGRlc2NyaXB0aW9uOiBcIkRlZmluZXMgdGhlIHRhcmdldCBDUFUgYXJjaGl0ZWN0dXJlXCIsXG4gICAgdmFsdWU6IFwid2FzbTMyXCIsXG4gIH0sXG4gIFBST0pFQ1RfTkFNRToge1xuICAgIGRlc2NyaXB0aW9uOiBcIk5hbWUgb2YgdGhlIGN1cnJlbnQgcHJvamVjdFwiLFxuICAgIHZhbHVlOiBcIlwiLFxuICB9LFxuICBQUk9KRUNUX1ZFUlNJT046IHtcbiAgICBkZXNjcmlwdGlvbjogXCJWZXJzaW9uIG9mIHRoZSBjdXJyZW50IHByb2plY3RcIixcbiAgICB2YWx1ZTogXCJcIixcbiAgfSxcbiAgUFJPSkVDVF9ERVNDUklQVElPTjoge1xuICAgIGRlc2NyaXB0aW9uOiBcIkRlc2NyaXB0aW9uIG9mIHRoZSBjdXJyZW50IHByb2plY3RcIixcbiAgICB2YWx1ZTogXCJcIixcbiAgfSxcbiAgUFJPSkVDVF9IT01FUEFHRV9VUkw6IHtcbiAgICBkZXNjcmlwdGlvbjogXCJIb21lcGFnZSBVUkwgb2YgdGhlIGN1cnJlbnQgcHJvamVjdFwiLFxuICAgIHZhbHVlOiBcIlwiLFxuICB9LFxuICBQUk9KRUNUX1NPVVJDRV9ESVI6IHtcbiAgICBkZXNjcmlwdGlvbjogXCJBYnNvbHV0ZSBwYXRoIHRvIHRoZSB0b3AtbGV2ZWwgc291cmNlIGRpcmVjdG9yeSBvZiB0aGUgcHJvamVjdFwiLFxuICAgIHR5cGU6IFwiRGlyUGF0aFwiLFxuICB9LFxuICBQUk9KRUNUX0JJTkFSWV9ESVI6IHtcbiAgICBkZXNjcmlwdGlvbjogXCJBYnNvbHV0ZSBwYXRoIHRvIHRoZSB0b3AtbGV2ZWwgYnVpbGQgKGJpbmFyeSkgZGlyZWN0b3J5IG9mIHRoZSBwcm9qZWN0XCIsXG4gICAgdHlwZTogXCJEaXJQYXRoXCIsXG4gIH0sXG4gIFNDUklQVF9NT0RVTEU6IHtcbiAgICBkZXNjcmlwdGlvbjogXCJNb2R1bGUgbmFtZSBvZiB0aGUgY3VycmVudCBNYWtlU2NyaXB0XCIsXG4gICAgdHlwZTogXCJzdHJpbmdcIixcbiAgfSxcbiAgU0NSSVBUX0ZJTEU6IHtcbiAgICBkZXNjcmlwdGlvbjogXCJGdWxsIHBhdGggdG8gdGhlIGN1cnJlbnQgTWFrZVNjcmlwdCBmaWxlIGJlaW5nIHByb2Nlc3NlZFwiLFxuICAgIHR5cGU6IFwiRmlsZVBhdGhcIixcbiAgfSxcbiAgU0NSSVBUX0RJUjoge1xuICAgIGRlc2NyaXB0aW9uOiBcIkRpcmVjdG9yeSBvZiB0aGUgY3VycmVudCBNYWtlU2NyaXB0IGZpbGUgYmVpbmcgcHJvY2Vzc2VkXCIsXG4gICAgdHlwZTogXCJEaXJQYXRoXCIsXG4gIH0sXG4gIFBBQ0tBR0VfRklMRToge1xuICAgIGRlc2NyaXB0aW9uOiBcIkZpbGVuYW1lIG9mIHByb2plY3QgbWFuaWZlc3QgY29udGFpbmluZyBtZXRhZGF0YSBhbmQgZGVwZW5kZW5jaWVzXCIsXG4gICAgdHlwZTogXCJGaWxlUGF0aFwiLFxuICB9LFxuICBDQUNIRV9GSUxFOiB7XG4gICAgZGVzY3JpcHRpb246IFwiRGVmYXVsdCBmaWxlbmFtZSBvZiB0aGUgQml0TWFrZSBjYWNoZSBzdG9yaW5nIHNldHRpbmdzXCIsXG4gICAgdHlwZTogXCJGaWxlUGF0aFwiLFxuICB9LFxuICBUT09MQ0hBSU5fRklMRToge1xuICAgIGRlc2NyaXB0aW9uOiBcIlNwZWNpZmllcyB0aGUgcGF0aCB0byBhIHRvb2xjaGFpbiBmaWxlIHVzZWQgZm9yIGNyb3NzLWNvbXBpbGF0aW9uXCIsXG4gICAgdHlwZTogXCJzdHJpbmdcIixcbiAgfSxcbiAgQlVJTERfVFlQRToge1xuICAgIGRlc2NyaXB0aW9uOiBcIlNwZWNpZmllcyB0aGUgYnVpbGQgY29uZmlndXJhdGlvbiBmb3IgY29udHJvbGxpbmcgb3B0aW1pemF0aW9uIGxldmVscyBhbmQgZGVidWcgaW5mb3JtYXRpb24gaW4gdGhlIGJ1aWxkIHByb2Nlc3NcIixcbiAgICB0eXBlOiBbIERFQlVHX0JVSUxEX1RZUEUsIFJFTEVBU0VfQlVJTERfVFlQRSBdLFxuICAgIHZhbHVlOiBSRUxFQVNFX0JVSUxEX1RZUEUsXG4gIH0sXG4gIElOU1RBTExfUFJFRklYOiB7XG4gICAgZGVzY3JpcHRpb246IFwiVGhlIHJvb3QgZGlyZWN0b3J5IHdoZXJlIGZpbGVzIHdpbGwgYmUgaW5zdGFsbGVkIGJ5IGRlZmF1bHRcIixcbiAgICB0eXBlOiBcIkRpclBhdGhcIixcbiAgICB2YWx1ZTogXCIvdXNyXCIsXG4gIH0sXG4gIERFU1RESVI6IHtcbiAgICBkZXNjcmlwdGlvbjogXCJUZW1wb3JhcnkgaW5zdGFsbGF0aW9uIHJvb3RcIixcbiAgICB0eXBlOiBcIkRpclBhdGhcIixcbiAgfSxcbiAgU09VUkNFX0RJUjoge1xuICAgIGRlc2NyaXB0aW9uOiBcIlBhdGggdG8gdGhlIHNvdXJjZSBkaXJlY3RvcnkgY3VycmVudGx5IGJlaW5nIHByb2Nlc3NlZFwiLFxuICAgIHR5cGU6IFwiRGlyUGF0aFwiLFxuICB9LFxuICBCSU5BUllfRElSOiB7XG4gICAgZGVzY3JpcHRpb246IFwiUGF0aCB0byB0aGUgYmluYXJ5IGRpcmVjdG9yeSBjdXJyZW50bHkgYmVpbmcgcHJvY2Vzc2VkXCIsXG4gICAgdHlwZTogXCJEaXJQYXRoXCIsXG4gIH0sXG4gIFBPU0lUSU9OX0lOREVQRU5ERU5UX0NPREU6IHtcbiAgICBkZXNjcmlwdGlvbjogXCJFbmFibGVzIFBvc2l0aW9uLUluZGVwZW5kZW50IENvZGUgKFBJQykgZm9yIGJ1aWxkaW5nIHNoYXJlZCBsaWJyYXJpZXNcIixcbiAgICB2YWx1ZTogZmFsc2UsXG4gIH0sXG4gIFBSRVZFTlRfSU5TVEFMTF9GSUxFUzoge1xuICAgIGRlc2NyaXB0aW9uOiBcIlByZXZlbnQgaW5zdGFsbGF0aW9uIG9mIGZpbGVzXCIsXG4gICAgdmFsdWU6IGZhbHNlLFxuICB9LFxuICBIT1NUX1NZU1RFTV9OQU1FOiB7XG4gICAgZGVzY3JpcHRpb246IFwiU3BlY2lmaWVzIHRoZSBPUyBvZiB0aGUgbWFjaGluZSBydW5uaW5nXCIsXG4gICAgdmFsdWU6IG9zLnR5cGUoKSxcbiAgfSxcbiAgSU5DTFVERVM6IHtcbiAgICBkZXNjcmlwdGlvbjogXCJQYXRocyBzZWFyY2hlZCBmb3IgaGVhZGVyIGZpbGVzXCIsXG4gICAgdmFsdWU6IFtdLFxuICB9LFxuICBBU01fQ09NUElMRVI6IHtcbiAgICBkZXNjcmlwdGlvbjogXCJQYXRoIHRvIHRoZSBhc3NlbWJsZXIgY29tcGlsZXIgZGV0ZWN0ZWRcIixcbiAgICB2YWx1ZTogXCJcIixcbiAgfSxcbiAgQVNNX0ZMQUdTOiB7XG4gICAgZGVzY3JpcHRpb246IFwiRmxhZ3MgcGFzc2VkIHRvIHRoZSBhc3NlbWJsZXIgY29tcGlsZXJcIixcbiAgICB2YWx1ZTogW10sXG4gIH0sXG4gIEFTTV9GTEFHU19ERUJVRzoge1xuICAgIGRlc2NyaXB0aW9uOiBcIkFkZGl0aW9uYWwgYXNzZW1ibGVyIGZsYWdzIHVzZWQgd2hlbiBidWlsZGluZyBpbiBEZWJ1ZyBtb2RlXCIsXG4gICAgdmFsdWU6IFsgXCItZ1wiIF0sXG4gIH0sXG4gIEFTTV9GTEFHU19SRUxFQVNFOiB7XG4gICAgZGVzY3JpcHRpb246IFwiQWRkaXRpb25hbCBhc3NlbWJsZXIgZmxhZ3MgdXNlZCB3aGVuIGJ1aWxkaW5nIGluIFJlbGVhc2UgbW9kZVwiLFxuICAgIHZhbHVlOiBbIFwiLU8zXCIsIFwiLUROREVCVUdcIiBdLFxuICB9LFxuICBDX0NPTVBJTEVSOiB7XG4gICAgZGVzY3JpcHRpb246IFwiUGF0aCB0byB0aGUgQyBjb21waWxlciBkZXRlY3RlZFwiLFxuICAgIHZhbHVlOiBcIlwiLFxuICB9LFxuICBDX0ZMQUdTOiB7XG4gICAgZGVzY3JpcHRpb246IFwiRmxhZ3MgcGFzc2VkIHRvIHRoZSBDIGNvbXBpbGVyXCIsXG4gICAgdmFsdWU6IFtdLFxuICB9LFxuICBDX0ZMQUdTX0RFQlVHOiB7XG4gICAgZGVzY3JpcHRpb246IFwiQWRkaXRpb25hbCBDIGNvbXBpbGVyIGZsYWdzIHVzZWQgd2hlbiBidWlsZGluZyBpbiBEZWJ1ZyBtb2RlXCIsXG4gICAgdmFsdWU6IFsgXCItZ1wiIF0sXG4gIH0sXG4gIENfRkxBR1NfUkVMRUFTRToge1xuICAgIGRlc2NyaXB0aW9uOiBcIkFkZGl0aW9uYWwgQyBjb21waWxlciBmbGFncyB1c2VkIHdoZW4gYnVpbGRpbmcgaW4gUmVsZWFzZSBtb2RlXCIsXG4gICAgdmFsdWU6IFsgXCItTzNcIiwgXCItRE5ERUJVR1wiIF0sXG4gIH0sXG4gIENYWF9DT01QSUxFUjoge1xuICAgIGRlc2NyaXB0aW9uOiBcIlBhdGggdG8gdGhlIEMrKyBjb21waWxlciBkZXRlY3RlZFwiLFxuICAgIHZhbHVlOiBcIlwiLFxuICB9LFxuICBDWFhfRkxBR1M6IHtcbiAgICBkZXNjcmlwdGlvbjogXCJGbGFncyBwYXNzZWQgdG8gdGhlIEMgY29tcGlsZXJcIixcbiAgICB2YWx1ZTogW10sXG4gIH0sXG4gIENYWF9GTEFHU19ERUJVRzoge1xuICAgIGRlc2NyaXB0aW9uOiBcIkFkZGl0aW9uYWwgQysrIGNvbXBpbGVyIGZsYWdzIHVzZWQgd2hlbiBidWlsZGluZyBpbiBEZWJ1ZyBtb2RlXCIsXG4gICAgdmFsdWU6IFsgXCItZ1wiIF0sXG4gIH0sXG4gIENYWF9GTEFHU19SRUxFQVNFOiB7XG4gICAgZGVzY3JpcHRpb246IFwiQWRkaXRpb25hbCBDKysgY29tcGlsZXIgZmxhZ3MgdXNlZCB3aGVuIGJ1aWxkaW5nIGluIFJlbGVhc2UgbW9kZVwiLFxuICAgIHZhbHVlOiBbIFwiLU8zXCIsIFwiLUROREVCVUdcIiBdLFxuICB9LFxuICBBUjoge1xuICAgIGRlc2NyaXB0aW9uOiBcIlBhdGggdG8gdGhlIGFyY2hpdmVyIHRvb2wgdXNlZCB0byBjcmVhdGUgc3RhdGljIGxpYnJhcmllc1wiLFxuICAgIHZhbHVlOiBcIlwiLFxuICB9LFxuICBSQU5MSUI6IHtcbiAgICBkZXNjcmlwdGlvbjogXCJUb29sIHVzZWQgdG8gZ2VuZXJhdGUgYW4gaW5kZXggdG8gdGhlIGNvbnRlbnRzIG9mIGFuIGFyY2hpdmUgKHN0YXRpYyBsaWJyYXJ5KVwiLFxuICAgIHZhbHVlOiBcIlwiLFxuICB9LFxuICBMSU5LRVI6IHtcbiAgICBkZXNjcmlwdGlvbjogXCJQYXRoIHRvIHRoZSBsaW5rZXIgdXNlZCB0byBsaW5rIG9iamVjdCBmaWxlcyBhbmQgbGlicmFyaWVzIGludG8gZXhlY3V0YWJsZXNcIixcbiAgICB2YWx1ZTogXCJcIixcbiAgfSxcbiAgTk06IHtcbiAgICBkZXNjcmlwdGlvbjogXCJQYXRoIHRvIHRoZSB0b29sIHVzZWQgdG8gbGlzdCBzeW1ib2xzIGZyb20gb2JqZWN0IGZpbGVzIG9yIGFyY2hpdmVzXCIsXG4gICAgdmFsdWU6IFwiXCIsXG4gIH0sXG4gIE9CSkNPUFk6IHtcbiAgICBkZXNjcmlwdGlvbjogXCJQYXRoIHRvIHRoZSB0b29sIHVzZWQgdG8gY29weSBhbmQgdHJhbnNsYXRlIG9iamVjdCBmaWxlc1wiLFxuICAgIHZhbHVlOiBcIlwiLFxuICB9LFxuICBPQkpEVU1QOiB7XG4gICAgZGVzY3JpcHRpb246IFwiUGF0aCB0byB0aGUgdG9vbCB1c2VkIHRvIGRpc3BsYXkgaW5mb3JtYXRpb24gYWJvdXQgb2JqZWN0IGZpbGVzLCBzdWNoIGFzIGRpc2Fzc2VtYmx5XCIsXG4gICAgdmFsdWU6IFwiXCIsXG4gIH0sXG4gIFNUUklQOiB7XG4gICAgZGVzY3JpcHRpb246IFwiUGF0aCB0byB0aGUgdG9vbCB1c2VkIHRvIHJlbW92ZSBzeW1ib2xzIGZyb20gb2JqZWN0IGZpbGVzIG9yIGV4ZWN1dGFibGVzIHRvIHJlZHVjZSBzaXplXCIsXG4gICAgdmFsdWU6IFwiXCIsXG4gIH0sXG4gIE9CSkVDVF9MSUJSQVJZX1BSRUZJWDoge1xuICAgIGRlc2NyaXB0aW9uOiBcIlByZWZpeCB1c2VkIGZvciBvYmplY3QgbGlicmFyaWVzXCIsXG4gICAgdmFsdWU6IFwiXCIsXG4gIH0sXG4gIE9CSkVDVF9MSUJSQVJZX1NVRkZJWDoge1xuICAgIGRlc2NyaXB0aW9uOiBcIlN1ZmZpeCB1c2VkIGZvciBvYmplY3QgbGlicmFyeSBmaWxlc1wiLFxuICAgIHZhbHVlOiBcIi5vXCIsXG4gIH0sXG4gIE9CSkVDVF9MSU5LRVJfRkxBR1M6IHtcbiAgICBkZXNjcmlwdGlvbjogXCJGbGFncyBwYXNzZWQgdG8gdGhlIGxpbmtlciB3aGVuIGNyZWF0aW5nIG9iamVjdCBsaWJyYXJpZXNcIixcbiAgICB2YWx1ZTogW10sXG4gIH0sXG4gIFNUQVRJQ19MSUJSQVJZX1BSRUZJWDoge1xuICAgIGRlc2NyaXB0aW9uOiBcIlByZWZpeCB1c2VkIGZvciBzdGF0aWMgbGlicmFyeSBmaWxlc1wiLFxuICAgIHZhbHVlOiBcImxpYlwiLFxuICB9LFxuICBTVEFUSUNfTElCUkFSWV9TVUZGSVg6IHtcbiAgICBkZXNjcmlwdGlvbjogXCJTdWZmaXggdXNlZCBmb3Igc3RhdGljIGxpYnJhcnkgZmlsZXNcIixcbiAgICB2YWx1ZTogXCIuYVwiLFxuICB9LFxuICBTVEFUSUNfTElOS0VSX0ZMQUdTOiB7XG4gICAgZGVzY3JpcHRpb246IFwiRmxhZ3MgcGFzc2VkIHRvIHRoZSBsaW5rZXIgd2hlbiBjcmVhdGluZyBzdGF0aWMgbGlicmFyaWVzXCIsXG4gICAgdmFsdWU6IFtdLFxuICB9LFxuICBTSEFSRURfTElCUkFSWV9QUkVGSVg6IHtcbiAgICBkZXNjcmlwdGlvbjogXCJQcmVmaXggdXNlZCBmb3Igc2hhcmVkIGxpYnJhcnkgZmlsZXNcIixcbiAgICB2YWx1ZTogXCJsaWJcIixcbiAgfSxcbiAgU0hBUkVEX0xJQlJBUllfU1VGRklYOiB7XG4gICAgZGVzY3JpcHRpb246IFwiU3VmZml4IHVzZWQgZm9yIHNoYXJlZCBsaWJyYXJ5IGZpbGVzXCIsXG4gICAgdmFsdWU6IFwiLnNvXCIsXG4gIH0sXG4gIFNIQVJFRF9MSU5LRVJfRkxBR1M6IHtcbiAgICBkZXNjcmlwdGlvbjogXCJGbGFncyBwYXNzZWQgdG8gdGhlIGxpbmtlciB3aGVuIGNyZWF0aW5nIHNoYXJlZCBsaWJyYXJpZXNcIixcbiAgICB2YWx1ZTogW10sXG4gIH0sXG4gIEVYRUNVVEFCTEVfU1VGRklYOiB7XG4gICAgZGVzY3JpcHRpb246IFwiU3VmZml4IHVzZWQgZm9yIGV4ZWN1dGFibGUgZmlsZXNcIixcbiAgICB2YWx1ZTogSG9zdC5leGVjdXRhYmxlU3VmZml4LFxuICB9LFxuICBFWEVfTElOS0VSX0ZMQUdTOiB7XG4gICAgZGVzY3JpcHRpb246IFwiRmxhZ3MgcGFzc2VkIHRvIHRoZSBsaW5rZXIgd2hlbiBjcmVhdGluZyBleGVjdXRhYmxlc1wiLFxuICAgIHZhbHVlOiBbXSxcbiAgfSxcbiAgR0xPQkFMX0NPTlRFWFRfSlNPTjoge1xuICAgIGRlc2NyaXB0aW9uOiBcIkZpbGVuYW1lIGZvciBKU09OIG9mIHRoZSBHbG9iYWwgY29udGV4dFwiLFxuICAgIHR5cGU6IFwiRmlsZVBhdGhcIixcbiAgfSxcbiAgVEFSR0VUX0dPQUxTX0pTT046IHtcbiAgICBkZXNjcmlwdGlvbjogXCJGaWxlbmFtZSBmb3IgSlNPTiBvZiB0aGUgVGFyZ2V0IEdvYWxzXCIsXG4gICAgdHlwZTogXCJGaWxlUGF0aFwiLFxuICB9LFxuICBTSVpFT0ZfVk9JRF9QOiB7XG4gICAgZGVzY3JpcHRpb246IFwiRGVmaW5lcyB0aGUgc2l6ZSAoaW4gYnl0ZXMpIG9mIGEgdm9pZCBwb2ludGVyIG9uIHRoZSB0YXJnZXQgYXJjaGl0ZWN0dXJlXCIsXG4gICAgdHlwZTogWyA0LCA4IF0sXG4gICAgdmFsdWU6IEhvc3Quc2l6ZW9mVm9pZHAsXG4gIH0sXG4gIE1BS0VfUExVR0lOX0xJU1Q6IHtcbiAgICBkZXNjcmlwdGlvbjogXCJMaXN0IG9mIHBhdGhzIHRvIHBsdWdpbnNcIixcbiAgICB2YWx1ZTogW10sXG4gIH0sXG4gIEhPU1RfRVhFQ1VUQUJMRV9TVUZGSVg6IHtcbiAgICBkZXNjcmlwdGlvbjogXCJEZWZpbmVzIHRoZSBmaWxlIGV4dGVuc2lvbiBmb3IgZXhlY3V0YWJsZXMgb24gdGhlIGhvc3Qgc3lzdGVtXCIsXG4gICAgdmFsdWU6IEhvc3QuZXhlY3V0YWJsZVN1ZmZpeCxcbiAgICAvLyBSZWFkb25seVxuICB9LFxufTtcbiIsIi8qXG4gKiBNSVQgTGljZW5zZVxuICpcbiAqIENvcHlyaWdodCAoYykgMjAyNSAgWXVyaWkgWWFrdWJpbiAoeXVyaWkueWFrdWJpbkBnbWFpbC5jb20pXG4gKlxuICogUGVybWlzc2lvbiBpcyBncmFudGVkIHRvIHVzZSwgY29weSwgbW9kaWZ5LCBhbmQgZGlzdHJpYnV0ZSB0aGlzIHNvZnR3YXJlXG4gKiB1bmRlciB0aGUgTUlUIExpY2Vuc2UuIFNlZSBMSUNFTlNFIGZpbGUgZm9yIGRldGFpbHMuXG4gKi9cblxuaW1wb3J0IHsgU291cmNlRmlsZSB9IGZyb20gXCJAL2NvcmUvU291cmNlRmlsZVwiO1xuaW1wb3J0IHsgVGFyZ2V0TmFtZSB9IGZyb20gXCJAL2NvcmUvVGFyZ2V0TmFtZVwiO1xuaW1wb3J0IHsgVGFyZ2V0RmlsZSB9IGZyb20gXCJAL2NvcmUvVGFyZ2V0RmlsZVwiO1xuaW1wb3J0IHsgVGFyZ2V0SW5jbHVkZXMgfSBmcm9tIFwiQC9jb3JlL1RhcmdldEluY2x1ZGVzXCI7XG5pbXBvcnQgeyBUYXJnZXRPYmplY3RzIH0gZnJvbSBcIkAvY29yZS9UYXJnZXRPYmplY3RzXCI7XG5pbXBvcnQgeyBBYnNvbHV0ZVBhdGggfSBmcm9tIFwiQC9jb3JlL0Fic29sdXRlUGF0aFwiO1xuaW1wb3J0IHsgU2ltcGxlT2JqZWN0IH0gZnJvbSBcIi4vU2ltcGxlT2JqZWN0XCI7XG5pbXBvcnQgeyBMb2dnZXIgfSBmcm9tIFwiQC9sb2dnZXJcIjtcblxuY29uc3QgbG9nZ2VyID0gTG9nZ2VyLmNyZWF0ZShpbXBvcnQubWV0YS51cmwpO1xuXG5leHBvcnQgaW50ZXJmYWNlIFRhcmdldENvbW1hbmQge1xuICBjb21tYW5kOiBzdHJpbmcgfCBBYnNvbHV0ZVBhdGggfCBUYXJnZXRGaWxlO1xuICBhcmdzOiBBcnJheTxzdHJpbmcgfCBBYnNvbHV0ZVBhdGggfCBUYXJnZXRGaWxlPjtcbn07XG5cbmludGVyZmFjZSBUYXJnZXRWYWx1ZTxUPiB7XG4gIHZhbHVlOiBUO1xuICBwdWJsaWNPbmx5OiBib29sZWFuO1xufTtcblxudHlwZSBUYXJnZXRWYWx1ZUxpc3Q8VD4gPSBBcnJheTxUYXJnZXRWYWx1ZTxUPj47XG5cbmV4cG9ydCBhYnN0cmFjdCBjbGFzcyBCYXNlVGFyZ2V0IHtcbiAgcHJvdGVjdGVkIF9uYW1lOiBzdHJpbmc7XG4gIHByb3RlY3RlZCBfaW5jbHVkZXM6IFRhcmdldFZhbHVlTGlzdDxBYnNvbHV0ZVBhdGggfCBUYXJnZXRJbmNsdWRlcz47XG4gIHByb3RlY3RlZCBfZGVmaW5pdGlvbnM6IFRhcmdldFZhbHVlTGlzdDxzdHJpbmc+O1xuICBwcm90ZWN0ZWQgX2NvbXBpbGVPcHRpb25zOiBUYXJnZXRWYWx1ZUxpc3Q8c3RyaW5nIHwgc3RyaW5nW10+O1xuICBwcm90ZWN0ZWQgX2xpbmtPcHRpb25zOiBUYXJnZXRWYWx1ZUxpc3Q8c3RyaW5nIHwgc3RyaW5nW10+O1xuICBwcm90ZWN0ZWQgX2xpYnJhcmllczogVGFyZ2V0VmFsdWVMaXN0PFRhcmdldE5hbWU+O1xuICBwcm90ZWN0ZWQgX3NvdXJjZXM6IFRhcmdldFZhbHVlTGlzdDxUYXJnZXRPYmplY3RzIHwgU291cmNlRmlsZT47XG4gIHByb3RlY3RlZCBfcHJlQnVpbGRMaXN0OiBUYXJnZXRDb21tYW5kW107XG4gIHByb3RlY3RlZCBfcG9zdEJ1aWxkTGlzdDogVGFyZ2V0Q29tbWFuZFtdO1xuICBwcm90ZWN0ZWQgX2xhbmd1YWdlID0gXCJcIjtcbiAgcHJvdGVjdGVkIF9jb21waWxlclBhdGggPSBcIlwiO1xuICBwcm90ZWN0ZWQgX2NvbXBpbGVyRmxhZ3MgPSBuZXcgQXJyYXk8c3RyaW5nPjtcblxuICBwcm90ZWN0ZWQgY29uc3RydWN0b3IobmFtZTogc3RyaW5nKSB7XG4gICAgdGhpcy5fbmFtZSA9IG5hbWU7XG4gICAgdGhpcy5faW5jbHVkZXMgPSBbXTtcbiAgICB0aGlzLl9kZWZpbml0aW9ucyA9IFtdO1xuICAgIHRoaXMuX2NvbXBpbGVPcHRpb25zID0gW107XG4gICAgdGhpcy5fbGlua09wdGlvbnMgPSBbXTtcbiAgICB0aGlzLl9saWJyYXJpZXMgPSBbXTtcbiAgICB0aGlzLl9zb3VyY2VzID0gW107XG4gICAgdGhpcy5fcHJlQnVpbGRMaXN0ID0gW107XG4gICAgdGhpcy5fcG9zdEJ1aWxkTGlzdCA9IFtdO1xuICB9XG5cbiAgYWJzdHJhY3Qgc2V0UHJlZml4KHZhbHVlOiBzdHJpbmcpIDogdm9pZDtcbiAgYWJzdHJhY3Qgc2V0T3V0cHV0TmFtZSh2YWx1ZTogYW55KSA6IHZvaWQ7XG4gIGFic3RyYWN0IHNldFN1ZmZpeCh2YWx1ZTogc3RyaW5nKSA6IHZvaWQ7XG4gIGFic3RyYWN0IHNldFBvc2l0aW9uSW5kZXBlbmRlbnRDb2RlKHZhbHVlOiBib29sZWFuKSA6IHZvaWQ7XG5cbiAgcHVibGljIGdldCB0YXJnZXROYW1lKCkge1xuICAgIHJldHVybiB0aGlzLl9uYW1lO1xuICB9XG5cbiAgcHVibGljIGdldCBuYW1lKCkgeyAvLyBERUxNRVxuICAgIHJldHVybiB0aGlzLl9uYW1lO1xuICB9XG5cbiAgcHVibGljIGdldCBpbmNsdWRlcygpOiBUYXJnZXRJbmNsdWRlcyB7XG4gICAgcmV0dXJuIFRhcmdldEluY2x1ZGVzLmNyZWF0ZSh0aGlzLl9uYW1lKTtcbiAgfVxuXG4gIHB1YmxpYyBnZXQgb2JqZWN0cygpOiBUYXJnZXRPYmplY3RzIHtcbiAgICByZXR1cm4gVGFyZ2V0T2JqZWN0cy5jcmVhdGUodGhpcy5fbmFtZSk7XG4gIH1cblxuICBwdWJsaWMgZ2V0IHRhcmdldEZpbGUoKTogVGFyZ2V0RmlsZSB7XG4gICAgcmV0dXJuIFRhcmdldEZpbGUuY3JlYXRlKHRoaXMuX25hbWUpO1xuICB9XG5cbiAgcHVibGljIGdldEluY2x1ZGVzKCk6IEFycmF5PEFic29sdXRlUGF0aCB8IFRhcmdldEluY2x1ZGVzPiB7XG4gICAgcmV0dXJuIHRoaXMuX2luY2x1ZGVzLm1hcChpID0+IGkudmFsdWUpO1xuICB9XG5cbiAgcHVibGljIGdldFB1YmxpY0luY2x1ZGVzKCk6IEFycmF5PEFic29sdXRlUGF0aCB8IFRhcmdldEluY2x1ZGVzPiB7XG4gICAgcmV0dXJuIHRoaXMuX2luY2x1ZGVzLmZpbHRlcihpID0+IGkucHVibGljT25seSkubWFwKGkgPT4gaS52YWx1ZSk7XG4gIH1cblxuICBwdWJsaWMgYWRkSW5jbHVkZShwdWJsaWNPbmx5OiBib29sZWFuLCB2YWx1ZTogQWJzb2x1dGVQYXRoIHwgVGFyZ2V0SW5jbHVkZXMpOiB2b2lkIHtcbiAgICB0aGlzLl9pbmNsdWRlcy5wdXNoKHtwdWJsaWNPbmx5LCB2YWx1ZX0pO1xuICB9XG5cbiAgcHVibGljIGdldERlZmluaXRpb25zKCk6IEFycmF5PHN0cmluZz4ge1xuICAgIHJldHVybiB0aGlzLl9kZWZpbml0aW9ucy5tYXAoaSA9PiBpLnZhbHVlKTtcbiAgfVxuXG4gIHB1YmxpYyBnZXRQdWJsaWNEZWZpbml0aW9ucygpOiBBcnJheTxzdHJpbmc+IHtcbiAgICByZXR1cm4gdGhpcy5fZGVmaW5pdGlvbnMuZmlsdGVyKGkgPT4gaS5wdWJsaWNPbmx5KS5tYXAoaSA9PiBpLnZhbHVlKTtcbiAgfVxuXG4gIHB1YmxpYyBhZGREZWZpbml0aW9uKHB1YmxpY09ubHk6IGJvb2xlYW4sIHZhbHVlOiBzdHJpbmcpOiB2b2lkIHtcbiAgICB0aGlzLl9kZWZpbml0aW9ucy5wdXNoKHtwdWJsaWNPbmx5LCB2YWx1ZX0pO1xuICB9XG5cbiAgcHVibGljIGdldENvbXBpbGVPcHRpb25zKCk6IEFycmF5PHN0cmluZyB8IHN0cmluZ1tdPiB7XG4gICAgcmV0dXJuIHRoaXMuX2NvbXBpbGVPcHRpb25zLm1hcChpID0+IGkudmFsdWUpO1xuICB9XG4gIFxuICBwdWJsaWMgZ2V0UHVibGljQ29tcGlsZU9wdGlvbnMoKTogQXJyYXk8c3RyaW5nfHN0cmluZ1tdPiB7XG4gICAgcmV0dXJuIHRoaXMuX2NvbXBpbGVPcHRpb25zLmZpbHRlcihpID0+IGkucHVibGljT25seSkubWFwKGkgPT4gaS52YWx1ZSk7XG4gIH1cblxuICBwdWJsaWMgYWRkQ29tcGlsZU9wdGlvbnMoLi4ub3B0aW9uczogQXJyYXk8c3RyaW5nIHwgc3RyaW5nW10+KTogdm9pZCB7XG4gICAgdGhpcy5hZGRDb21waWxlT3B0aW9uc0ltcGwoZmFsc2UsIC4uLm9wdGlvbnMpO1xuICB9XG5cbiAgcHVibGljIGFkZFB1YmxpY0NvbXBpbGVPcHRpb25zKC4uLm9wdGlvbnM6IEFycmF5PHN0cmluZyB8IHN0cmluZ1tdPik6IHZvaWQge1xuICAgIHRoaXMuYWRkQ29tcGlsZU9wdGlvbnNJbXBsKHRydWUsIC4uLm9wdGlvbnMpO1xuICB9XG5cbiAgcHVibGljIGFkZENvbXBpbGVPcHRpb25zSW1wbChwdWJsaWNPbmx5OiBib29sZWFuLCAuLi5vcHRpb25zOiBBcnJheTxzdHJpbmcgfCBzdHJpbmdbXT4pOiB2b2lkIHtcbiAgICBmb3IgKGNvbnN0IHZhbHVlIG9mIG9wdGlvbnMuZmxhdCgpKVxuICAgICAgdGhpcy5fY29tcGlsZU9wdGlvbnMucHVzaCh7cHVibGljT25seSwgdmFsdWV9KTtcbiAgfVxuXG4gIHB1YmxpYyBnZXRMaW5rT3B0aW9ucygpOiBBcnJheTxzdHJpbmcgfCBzdHJpbmdbXT4ge1xuICAgIHJldHVybiB0aGlzLl9saW5rT3B0aW9ucy5tYXAoaSA9PiBpLnZhbHVlKTtcbiAgfVxuXG4gIHB1YmxpYyBnZXRQdWJsaWNMaW5rT3B0aW9ucygpOiBBcnJheTxzdHJpbmcgfCBzdHJpbmdbXT4ge1xuICAgIHJldHVybiB0aGlzLl9saW5rT3B0aW9ucy5maWx0ZXIoaSA9PiBpLnB1YmxpY09ubHkpLm1hcChpID0+IGkudmFsdWUpO1xuICB9XG5cbiAgcHVibGljIGFkZExpbmtPcHRpb25zKC4uLm9wdGlvbnM6IEFycmF5PHN0cmluZyB8IHN0cmluZ1tdPikge1xuICAgIHRoaXMuYWRkTGlua09wdGlvbnNJbXBsKGZhbHNlLCAuLi5vcHRpb25zKTtcbiAgfVxuXG4gIHB1YmxpYyBhZGRQdWJsaWNMaW5rT3B0aW9ucyguLi5vcHRpb25zOiBBcnJheTxzdHJpbmcgfCBzdHJpbmdbXT4pIHtcbiAgICB0aGlzLmFkZExpbmtPcHRpb25zSW1wbCh0cnVlLCAuLi5vcHRpb25zKTtcbiAgfVxuXG4gIHB1YmxpYyBhZGRMaW5rT3B0aW9uc0ltcGwocHVibGljT25seTogYm9vbGVhbiwgLi4ub3B0aW9uczogQXJyYXk8c3RyaW5nIHwgc3RyaW5nW10+KSB7XG4gICAgZm9yIChjb25zdCB2YWx1ZSBvZiBvcHRpb25zLmZsYXQoKSlcbiAgICAgIHRoaXMuX2xpbmtPcHRpb25zLnB1c2goe3B1YmxpY09ubHksIHZhbHVlfSk7XG4gIH1cblxuICBwdWJsaWMgZ2V0TGlicmFyaWVzKCkge1xuICAgIHJldHVybiB0aGlzLl9saWJyYXJpZXMubWFwKGkgPT4gaS52YWx1ZSk7XG4gIH1cblxuICBwdWJsaWMgZ2V0UHVibGljTGlicmFyaWVzKCkge1xuICAgIHJldHVybiB0aGlzLl9saWJyYXJpZXMuZmlsdGVyKGkgPT4gaS5wdWJsaWNPbmx5KS5tYXAoaSA9PiBpLnZhbHVlKTtcbiAgfVxuXG4gIHB1YmxpYyBhZGRMaWJyYXJpZXMoLi4ubGlicmFyaWVzOiBQb3N0VGFyZ2V0W10pIHtcbiAgICB0aGlzLmFkZExpYnJhcmllc0ltcGwoZmFsc2UsIC4uLmxpYnJhcmllcyk7XG4gIH1cblxuICBwdWJsaWMgYWRkUHVibGljTGlicmFyaWVzKC4uLmxpYnJhcmllczogUG9zdFRhcmdldFtdKSB7XG4gICAgdGhpcy5hZGRMaWJyYXJpZXNJbXBsKHRydWUsIC4uLmxpYnJhcmllcyk7XG4gIH1cblxuICBwdWJsaWMgYWRkTGlicmFyaWVzSW1wbChwdWJsaWNPbmx5OiBib29sZWFuLCAuLi5saWJyYXJpZXM6IFBvc3RUYXJnZXRbXSkge1xuICAgIGZvciAoY29uc3QgaXRlciBvZiBsaWJyYXJpZXMuZmxhdCgpKVxuICAgICAgdGhpcy5fbGlicmFyaWVzLnB1c2goe3B1YmxpY09ubHksIHZhbHVlOiBUYXJnZXROYW1lLmNyZWF0ZShpdGVyLnRhcmdldE5hbWUpfSk7XG4gIH1cblxuICBwdWJsaWMgZ2V0SGVhZGVycygpOiBTb3VyY2VGaWxlW10ge1xuICAgIGNvbnN0IHJlc3VsdCA9IG5ldyBBcnJheTxTb3VyY2VGaWxlPjtcbiAgICBmb3IgKGNvbnN0IGl0ZXIgb2YgdGhpcy5fc291cmNlcykge1xuICAgICAgaWYgKGl0ZXIudmFsdWUgaW5zdGFuY2VvZiBTb3VyY2VGaWxlICYmIGl0ZXIudmFsdWUuSEVBREVSX0ZJTEVfT05MWSlcbiAgICAgICAgcmVzdWx0LnB1c2goaXRlci52YWx1ZSk7XG4gICAgfVxuICAgIHJldHVybiByZXN1bHQ7XG4gIH1cblxuICBwdWJsaWMgZ2V0QWxsU291cmNlcygpIHtcbiAgICByZXR1cm4gdGhpcy5fc291cmNlcztcbiAgfVxuXG4gIHB1YmxpYyBnZXRTb3VyY2VGaWxlcygpOiBTb3VyY2VGaWxlW10ge1xuICAgIHJldHVybiB0aGlzLl9zb3VyY2VzLm1hcChpID0+IGkudmFsdWUpLmZpbHRlcihpID0+IGkgaW5zdGFuY2VvZiBTb3VyY2VGaWxlKTtcbiAgfVxuXG4gIHB1YmxpYyBnZXRUYXJnZXRPYmplY3RzKCk6IFRhcmdldE9iamVjdHNbXSB7XG4gICAgcmV0dXJuIHRoaXMuX3NvdXJjZXMubWFwKGkgPT4gaS52YWx1ZSkuZmlsdGVyKGkgPT4gaSBpbnN0YW5jZW9mIFRhcmdldE9iamVjdHMpO1xuICB9XG5cbiAgcHVibGljIGFkZFNvdXJjZShzb3VyY2U6IFRhcmdldE9iamVjdHMgfCBTb3VyY2VGaWxlKSB7XG4gICAgdGhpcy5fc291cmNlcy5wdXNoKHtwdWJsaWNPbmx5OiBmYWxzZSwgdmFsdWU6IHNvdXJjZX0pO1xuICB9XG5cbiAgcHVibGljIGdldCBwcmVCdWlsZExpc3QoKSB7XG4gICAgcmV0dXJuIHRoaXMuX3ByZUJ1aWxkTGlzdDtcbiAgfVxuXG4gIHB1YmxpYyBhZGRQcmVCdWlsZChjb21tYW5kOiBzdHJpbmcgfCBBYnNvbHV0ZVBhdGggfCBUYXJnZXRGaWxlLCBhcmdzOiBBcnJheTxzdHJpbmcgfCBBYnNvbHV0ZVBhdGggfCBUYXJnZXRGaWxlPikge1xuICAgIHRoaXMuX3ByZUJ1aWxkTGlzdC5wdXNoKHtjb21tYW5kLCBhcmdzfSk7XG4gIH1cblxuICBwdWJsaWMgZ2V0IHBvc3RCdWlsZExpc3QoKSB7XG4gICAgcmV0dXJuIHRoaXMuX3Bvc3RCdWlsZExpc3Q7XG4gIH1cblxuICBwdWJsaWMgYWRkUG9zdEJ1aWxkKGNvbW1hbmQ6IHN0cmluZyB8IEFic29sdXRlUGF0aCB8IFRhcmdldEZpbGUsIGFyZ3M6IEFycmF5PHN0cmluZyB8IEFic29sdXRlUGF0aCB8IFRhcmdldEZpbGU+KSB7XG4gICAgdGhpcy5fcG9zdEJ1aWxkTGlzdC5wdXNoKHtjb21tYW5kLCBhcmdzfSk7XG4gIH1cblxuICBwdWJsaWMgZ2V0IGxhbmd1YWdlKCk6IHN0cmluZyB7XG4gICAgcmV0dXJuIHRoaXMuX2xhbmd1YWdlO1xuICB9XG5cbiAgcHVibGljIHNldCBsYW5ndWFnZSh2YWx1ZTogc3RyaW5nKSB7XG4gICAgdGhpcy5fbGFuZ3VhZ2UgPSB2YWx1ZTtcbiAgfVxuXG4gIHB1YmxpYyBnZXQgY29tcGlsZXJQYXRoKCk6IHN0cmluZyB7XG4gICAgcmV0dXJuIHRoaXMuX2NvbXBpbGVyUGF0aDtcbiAgfVxuXG4gIHB1YmxpYyBzZXQgY29tcGlsZXJQYXRoKHZhbHVlOiBzdHJpbmcpIHtcbiAgICB0aGlzLl9jb21waWxlclBhdGggPSB2YWx1ZTtcbiAgfVxuXG4gIHB1YmxpYyBnZXQgY29tcGlsZXJGbGFncygpOiBzdHJpbmdbXSB7XG4gICAgcmV0dXJuIHRoaXMuX2NvbXBpbGVyRmxhZ3M7XG4gIH1cblxuICBwdWJsaWMgc2V0IGNvbXBpbGVyRmxhZ3ModmFsdWU6IHN0cmluZ1tdKSB7XG4gICAgdGhpcy5fY29tcGlsZXJGbGFncyA9IHZhbHVlO1xuICB9XG5cbiAgcHVibGljIHRvSlNPTigpOiBvYmplY3Qge1xuICAgIHJldHVybiB7XG4gICAgICBuYW1lOiB0aGlzLl9uYW1lLFxuICAgICAgcHJlQnVpbGRMaXN0OiB0aGlzLl9wcmVCdWlsZExpc3QsXG4gICAgICBwb3N0QnVpbGRMaXN0OiB0aGlzLl9wb3N0QnVpbGRMaXN0LFxuICAgICAgaW5jbHVkZXM6IHRoaXMuX2luY2x1ZGVzLFxuICAgICAgY29tcGlsZU9wdGlvbnM6IHRoaXMuX2NvbXBpbGVPcHRpb25zLFxuICAgICAgbGlua09wdGlvbnM6IHRoaXMuX2xpbmtPcHRpb25zLFxuICAgICAgc291cmNlczogdGhpcy5fc291cmNlcyxcbiAgICAgIGxpYnJhcmllczogdGhpcy5fbGlicmFyaWVzLFxuICAgIH1cbiAgfVxufTtcblxuZXhwb3J0IGNsYXNzIFBvc3RUYXJnZXQgZXh0ZW5kcyBCYXNlVGFyZ2V0IHtcbiAgcHJpdmF0ZSBfcHJlZml4Pzogc3RyaW5nO1xuICBwcml2YXRlIF9vdXRwdXROYW1lPzogc3RyaW5nO1xuICBwcml2YXRlIF9zdWZmaXg/OiBzdHJpbmc7XG4gIHByaXZhdGUgX3Bvc2l0aW9uSW5kZXBlbmRlbnRDb2RlPzogYm9vbGVhbjtcblxuICBwcml2YXRlIGNvbnN0cnVjdG9yKG5hbWU6IHN0cmluZykge1xuICAgIHN1cGVyKG5hbWUpO1xuICB9XG5cbiAgcHVibGljIHN0YXRpYyBjcmVhdGUobmFtZTogc3RyaW5nKSB7XG4gICAgcmV0dXJuIE9iamVjdC5zZWFsKG5ldyBQb3N0VGFyZ2V0KG5hbWUpKTtcbiAgfVxuXG4gIHB1YmxpYyBnZXQgcHJlZml4KCkge1xuICAgIHJldHVybiB0aGlzLl9wcmVmaXg7XG4gIH1cblxuICBwdWJsaWMgc2V0UHJlZml4KHZhbHVlOiBzdHJpbmcpIHtcbiAgICB0aGlzLl9wcmVmaXggPSB2YWx1ZTtcbiAgfVxuXG4gIHB1YmxpYyBnZXQgb3V0cHV0TmFtZSgpIHtcbiAgICByZXR1cm4gdGhpcy5fb3V0cHV0TmFtZTtcbiAgfVxuXG4gIHB1YmxpYyBzZXRPdXRwdXROYW1lKHZhbHVlOiBhbnkpIHtcbiAgICB0aGlzLl9vdXRwdXROYW1lID0gdmFsdWU7XG4gIH1cblxuICBwdWJsaWMgZ2V0IHN1ZmZpeCgpIHtcbiAgICByZXR1cm4gdGhpcy5fc3VmZml4O1xuICB9XG5cbiAgcHVibGljIHNldFN1ZmZpeCh2YWx1ZTogc3RyaW5nKSB7XG4gICAgdGhpcy5fc3VmZml4ID0gdmFsdWU7XG4gIH1cblxuICBwdWJsaWMgZ2V0IHBvc2l0aW9uSW5kZXBlbmRlbnRDb2RlKCkge1xuICAgIHJldHVybiB0aGlzLl9wb3NpdGlvbkluZGVwZW5kZW50Q29kZTtcbiAgfVxuXG4gIHB1YmxpYyBzZXRQb3NpdGlvbkluZGVwZW5kZW50Q29kZSh2YWx1ZTogYm9vbGVhbikge1xuICAgIHRoaXMuX3Bvc2l0aW9uSW5kZXBlbmRlbnRDb2RlID0gdmFsdWU7XG4gIH1cblxuICBwdWJsaWMgZ2V0IElOQ0xVREVTKCkge1xuICAgIHJldHVybiB0aGlzLl9pbmNsdWRlcztcbiAgfVxuXG4gIHB1YmxpYyBnZXQgREVGSU5JVElPTlMoKSB7XG4gICAgcmV0dXJuIHRoaXMuX2RlZmluaXRpb25zO1xuICB9XG5cbiAgcHVibGljIGdldCBDT01QSUxFX09QVElPTlMoKSB7XG4gICAgcmV0dXJuIHRoaXMuX2NvbXBpbGVPcHRpb25zO1xuICB9XG5cbiAgcHVibGljIGdldCBMSU5LX09QVElPTlMoKSB7XG4gICAgcmV0dXJuIHRoaXMuX2xpbmtPcHRpb25zO1xuICB9XG5cbiAgcHVibGljIGdldCBMSUJSQVJJRVMoKSB7XG4gICAgcmV0dXJuIHRoaXMuX2xpYnJhcmllcztcbiAgfVxuXG4gIHB1YmxpYyBnZXQgU09VUkNFUygpIHtcbiAgICByZXR1cm4gdGhpcy5fc291cmNlcztcbiAgfVxuXG4gIHB1YmxpYyB0b0pTT04oKTogU2ltcGxlT2JqZWN0IHtcbiAgICBjb25zdCByZXN1bHQ6IGFueSA9IHN1cGVyLnRvSlNPTigpO1xuXG4gICAgcmVzdWx0LnR5cGUgPSBQb3N0VGFyZ2V0Lm5hbWU7XG4gICAgXG4gICAgaWYgKHRoaXMuX3ByZWZpeCAhPT0gdW5kZWZpbmVkKVxuICAgICAgcmVzdWx0LnByZWZpeCA9IHRoaXMuX3ByZWZpeDtcblxuICAgIGlmICh0aGlzLl9vdXRwdXROYW1lICE9PSB1bmRlZmluZWQpXG4gICAgICByZXN1bHQub3V0cHV0TmFtZSA9IHRoaXMuX291dHB1dE5hbWU7XG5cbiAgICBpZiAodGhpcy5fc3VmZml4ICE9PSB1bmRlZmluZWQpXG4gICAgICByZXN1bHQuc3VmZml4ID0gdGhpcy5fc3VmZml4O1xuXG4gICAgaWYgKHRoaXMuX3Bvc2l0aW9uSW5kZXBlbmRlbnRDb2RlICE9PSB1bmRlZmluZWQpXG4gICAgICByZXN1bHQucG9zaXRpb25JbmRlcGVuZGVudENvZGUgPSB0aGlzLl9wb3NpdGlvbkluZGVwZW5kZW50Q29kZTtcblxuICAgIHJldHVybiByZXN1bHQ7XG4gIH1cbn07XG5cbmV4cG9ydCBlbnVtIFRhcmdldFR5cGUge1xuICBPYmplY3RMaWJyYXJ5ID0gMCxcbiAgU3RhdGljTGlicmFyeSA9IDEsXG4gIFNoYXJlZExpYnJhcnkgPSAyLFxuICBFeGVjdXRhYmxlID0gMyxcbn07XG5cbmV4cG9ydCBuYW1lc3BhY2UgVGFyZ2V0VHlwZSB7XG5cbmV4cG9ydCBmdW5jdGlvbiB0b1N0cmluZyh0eXBlOiBUYXJnZXRUeXBlKSB7XG4gIHN3aXRjaCAodHlwZSkge1xuICBjYXNlIFRhcmdldFR5cGUuT2JqZWN0TGlicmFyeTpcbiAgICByZXR1cm4gXCJPYmplY3RMaWJyYXJ5XCI7XG4gIGNhc2UgVGFyZ2V0VHlwZS5TdGF0aWNMaWJyYXJ5OlxuICAgIHJldHVybiBcIlN0YXRpY0xpYnJhcnlcIjtcbiAgY2FzZSBUYXJnZXRUeXBlLlNoYXJlZExpYnJhcnk6XG4gICAgcmV0dXJuIFwiU2hhcmVkTGlicmFyeVwiO1xuICBjYXNlIFRhcmdldFR5cGUuRXhlY3V0YWJsZTpcbiAgICByZXR1cm4gXCJFeGVjdXRhYmxlXCI7XG4gIH1cbiAgdGhyb3cgbmV3IEVycm9yKGBVa25vd24gdGFyZ2V0IHR5cGUgJHt0eXBlfWApO1xufVxuXG59IC8vIG5hbWVzcGFjZSBUYXJnZXRUeXBlXG5cbmV4cG9ydCBjbGFzcyBNYWluVGFyZ2V0IGV4dGVuZHMgQmFzZVRhcmdldCB7XG4gIHByaXZhdGUgX3RhcmdldFR5cGU6IFRhcmdldFR5cGU7XG4gIHByaXZhdGUgX3NvdXJjZURpcjogQWJzb2x1dGVQYXRoO1xuICBwcml2YXRlIF9iaW5hcnlEaXI6IEFic29sdXRlUGF0aDtcbiAgcHJpdmF0ZSBfcHJlZml4ID0gXCJcIjtcbiAgcHJpdmF0ZSBfc3VmZml4ID0gXCJcIjtcbiAgcHJpdmF0ZSBfb3V0cHV0TmFtZTogc3RyaW5nO1xuICBwcml2YXRlIF9wb3NpdGlvbkluZGVwZW5kZW50Q29kZSA9IGZhbHNlO1xuXG4gIHByb3RlY3RlZCBjb25zdHJ1Y3Rvcih0eXBlOiBUYXJnZXRUeXBlLCBuYW1lOiBzdHJpbmcsIHNvdXJjZURpcjogQWJzb2x1dGVQYXRoLCBiaW5hcnlEaXI6IEFic29sdXRlUGF0aCkge1xuICAgIHN1cGVyKG5hbWUpO1xuXG4gICAgdGhpcy5fc291cmNlRGlyID0gc291cmNlRGlyO1xuICAgIHRoaXMuX2JpbmFyeURpciA9IGJpbmFyeURpcjtcbiAgICB0aGlzLl90YXJnZXRUeXBlID0gdHlwZTtcbiAgICB0aGlzLl9vdXRwdXROYW1lID0gbmFtZTtcbiAgfVxuXG4gIHB1YmxpYyBzdGF0aWMgY3JlYXRlKHR5cGU6IFRhcmdldFR5cGUsIG5hbWU6IHN0cmluZywgc291cmNlRGlyOiBBYnNvbHV0ZVBhdGgsIGJpbmFyeURpcjogQWJzb2x1dGVQYXRoKSB7XG4gICAgcmV0dXJuIE9iamVjdC5zZWFsKG5ldyBNYWluVGFyZ2V0KHR5cGUsIG5hbWUsIHNvdXJjZURpciwgYmluYXJ5RGlyKSk7XG4gIH1cblxuICBwdWJsaWMgZ2V0IGlzT2JqZWN0TGlicmFyeSgpIHtcbiAgICByZXR1cm4gdGhpcy5fdGFyZ2V0VHlwZSA9PT0gVGFyZ2V0VHlwZS5PYmplY3RMaWJyYXJ5O1xuICB9XG5cbiAgcHVibGljIGdldCBpc1N0YXRpY0xpYnJhcnkoKSB7XG4gICAgcmV0dXJuIHRoaXMuX3RhcmdldFR5cGUgPT09IFRhcmdldFR5cGUuU3RhdGljTGlicmFyeTtcbiAgfVxuXG4gIHB1YmxpYyBnZXQgaXNTaGFyZWRMaWJyYXJ5KCkge1xuICAgIHJldHVybiB0aGlzLl90YXJnZXRUeXBlID09PSBUYXJnZXRUeXBlLlNoYXJlZExpYnJhcnk7XG4gIH1cblxuICBwdWJsaWMgZ2V0IGlzRXhlY3V0YWJsZSgpIHtcbiAgICByZXR1cm4gdGhpcy5fdGFyZ2V0VHlwZSA9PT0gVGFyZ2V0VHlwZS5FeGVjdXRhYmxlO1xuICB9XG5cbiAgcHVibGljIGdldCBzb3VyY2VEaXIoKSB7XG4gICAgcmV0dXJuIHRoaXMuX3NvdXJjZURpcjtcbiAgfVxuXG4gIHB1YmxpYyBnZXQgYmluYXJ5RGlyKCkge1xuICAgIHJldHVybiB0aGlzLl9iaW5hcnlEaXI7XG4gIH1cblxuICBwdWJsaWMgZ2V0RmlsZURpcigpIHtcbiAgICByZXR1cm4gdGhpcy5fYmluYXJ5RGlyO1xuICB9XG5cbiAgcHVibGljIGdldEZpbGVOYW1lKCkge1xuICAgIHJldHVybiB0aGlzLnByZWZpeCArIHRoaXMub3V0cHV0TmFtZSArIHRoaXMuc3VmZml4O1xuICB9XG5cbiAgcHVibGljIGdldEZpbGUoKSB7XG4gICAgcmV0dXJuIHRoaXMuX2JpbmFyeURpci5qb2luKHRoaXMuZ2V0RmlsZU5hbWUoKSk7XG4gIH1cblxuICBwdWJsaWMgZ2V0IHByZWZpeCgpIHtcbiAgICByZXR1cm4gdGhpcy5fcHJlZml4O1xuICB9XG5cbiAgcHVibGljIHNldFByZWZpeCh2YWx1ZTogc3RyaW5nKSB7XG4gICAgdGhpcy5fcHJlZml4ID0gdmFsdWU7XG4gIH1cblxuICBwdWJsaWMgZ2V0IHN1ZmZpeCgpIHtcbiAgICByZXR1cm4gdGhpcy5fc3VmZml4O1xuICB9XG5cbiAgcHVibGljIHNldFN1ZmZpeCh2YWx1ZTogYW55KSB7XG4gICAgdGhpcy5fc3VmZml4ID0gdmFsdWU7XG4gIH1cblxuICBwdWJsaWMgZ2V0IG91dHB1dE5hbWUoKSB7XG4gICAgcmV0dXJuIHRoaXMuX291dHB1dE5hbWU7XG4gIH1cblxuICBwdWJsaWMgc2V0T3V0cHV0TmFtZSh2YWx1ZTogYW55KSB7XG4gICAgdGhpcy5fb3V0cHV0TmFtZSA9IHZhbHVlO1xuICB9XG5cbiAgcHVibGljIGdldCBwb3NpdGlvbkluZGVwZW5kZW50Q29kZSgpIHtcbiAgICByZXR1cm4gdGhpcy5fcG9zaXRpb25JbmRlcGVuZGVudENvZGU7XG4gIH1cblxuICBwdWJsaWMgc2V0UG9zaXRpb25JbmRlcGVuZGVudENvZGUodmFsdWU6IGJvb2xlYW4pIHtcbiAgICB0aGlzLl9wb3NpdGlvbkluZGVwZW5kZW50Q29kZSA9IHZhbHVlO1xuICB9XG5cbiAgcHVibGljIHBvc3RVcGRhdGUodGFyZ2V0OiBQb3N0VGFyZ2V0KSB7XG4gICAgaWYgKHRhcmdldC5wcmVmaXggIT09IHVuZGVmaW5lZClcbiAgICAgIHRoaXMuX3ByZWZpeCA9IHRhcmdldC5wcmVmaXg7XG4gICAgaWYgKHRhcmdldC5vdXRwdXROYW1lICE9PSB1bmRlZmluZWQpXG4gICAgICB0aGlzLl9vdXRwdXROYW1lID0gdGFyZ2V0Lm91dHB1dE5hbWU7XG4gICAgaWYgKHRhcmdldC5zdWZmaXggIT09IHVuZGVmaW5lZClcbiAgICAgIHRoaXMuX3N1ZmZpeCA9IHRhcmdldC5zdWZmaXg7XG4gICAgaWYgKHRhcmdldC5wb3NpdGlvbkluZGVwZW5kZW50Q29kZSAhPT0gdW5kZWZpbmVkKVxuICAgICAgdGhpcy5fcG9zaXRpb25JbmRlcGVuZGVudENvZGUgPSB0YXJnZXQucG9zaXRpb25JbmRlcGVuZGVudENvZGU7XG4gICAgdGhpcy5faW5jbHVkZXMucHVzaCguLi50YXJnZXQuSU5DTFVERVMpO1xuICAgIHRoaXMuX2RlZmluaXRpb25zLnB1c2goLi4udGFyZ2V0LkRFRklOSVRJT05TKTtcbiAgICB0aGlzLl9jb21waWxlT3B0aW9ucy5wdXNoKC4uLnRhcmdldC5DT01QSUxFX09QVElPTlMpO1xuICAgIHRoaXMuX2xpbmtPcHRpb25zLnB1c2goLi4udGFyZ2V0LkxJTktfT1BUSU9OUyk7XG4gICAgdGhpcy5fbGlicmFyaWVzLnB1c2goLi4udGFyZ2V0LkxJQlJBUklFUyk7XG4gICAgdGhpcy5fc291cmNlcy5wdXNoKC4uLnRhcmdldC5TT1VSQ0VTKTtcbiAgICB0aGlzLl9wcmVCdWlsZExpc3QucHVzaCguLi50YXJnZXQucHJlQnVpbGRMaXN0KTtcbiAgICB0aGlzLl9wb3N0QnVpbGRMaXN0LnB1c2goLi4udGFyZ2V0LnBvc3RCdWlsZExpc3QpO1xuICB9XG5cbiAgcHVibGljIHRvSlNPTigpOiBTaW1wbGVPYmplY3Qge1xuICAgIGNvbnN0IHJlc3VsdDogYW55ID0gc3VwZXIudG9KU09OKCk7XG5cbiAgICByZXN1bHQudHlwZSA9IEJhc2VUYXJnZXQubmFtZTtcbiAgICByZXN1bHQudGFyZ2V0VHlwZSA9IFRhcmdldFR5cGUudG9TdHJpbmcodGhpcy5fdGFyZ2V0VHlwZSk7XG4gICAgcmVzdWx0LnNvdXJjZURpciA9IHRoaXMuX3NvdXJjZURpcjtcbiAgICByZXN1bHQuYmluYXJ5RGlyID0gdGhpcy5fYmluYXJ5RGlyO1xuICAgIHJlc3VsdC5wcmVmaXggPSB0aGlzLl9wcmVmaXg7XG4gICAgcmVzdWx0LnN1ZmZpeCA9IHRoaXMuX3N1ZmZpeDtcbiAgICByZXN1bHQub3V0cHV0TmFtZSA9IHRoaXMuX291dHB1dE5hbWU7XG4gICAgcmVzdWx0LnBvc2l0aW9uSW5kZXBlbmRlbnRDb2RlID0gdGhpcy5fcG9zaXRpb25JbmRlcGVuZGVudENvZGU7XG5cbiAgICByZXR1cm4gcmVzdWx0O1xuICB9XG59O1xuIiwiLypcbiAqIE1JVCBMaWNlbnNlXG4gKlxuICogQ29weXJpZ2h0IChjKSAyMDI1ICBZdXJpaSBZYWt1YmluICh5dXJpaS55YWt1YmluQGdtYWlsLmNvbSlcbiAqXG4gKiBQZXJtaXNzaW9uIGlzIGdyYW50ZWQgdG8gdXNlLCBjb3B5LCBtb2RpZnksIGFuZCBkaXN0cmlidXRlIHRoaXMgc29mdHdhcmVcbiAqIHVuZGVyIHRoZSBNSVQgTGljZW5zZS4gU2VlIExJQ0VOU0UgZmlsZSBmb3IgZGV0YWlscy5cbiAqL1xuXG5pbXBvcnQgeyBUYXJnZXRJbmNsdWRlcyB9ZnJvbSBcIkAvY29yZS9UYXJnZXRJbmNsdWRlc1wiO1xuaW1wb3J0IHsgVGFyZ2V0TmFtZSB9ZnJvbSBcIkAvY29yZS9UYXJnZXROYW1lXCI7XG5pbXBvcnQgeyBNYWluVGFyZ2V0IH0gZnJvbSBcIkAvY29yZS9UYXJnZXRcIjtcbmltcG9ydCB7IEFic29sdXRlUGF0aCB9IGZyb20gXCJAL2NvcmUvQWJzb2x1dGVQYXRoXCI7XG5pbXBvcnQgeyBTaW1wbGVPYmplY3QgfSBmcm9tIFwiQC9jb3JlL1NpbXBsZU9iamVjdFwiO1xuXG5jb25zdCBFTlRSSUVTID0gU3ltYm9sKFwiRU5UUklFU1wiKTtcblxuZXhwb3J0IGNsYXNzIFRhcmdldENvbGxlY3Rpb24ge1xuICBwcml2YXRlIFtFTlRSSUVTXSA9IG5ldyBNYXA8c3RyaW5nLCBNYWluVGFyZ2V0PjtcblxuICBwdWJsaWMgc3RhdGljIGNyZWF0ZSgpIHtcbiAgICByZXR1cm4gT2JqZWN0LnNlYWwobmV3IFRhcmdldENvbGxlY3Rpb24pO1xuICB9XG4gIFxuICBwdWJsaWMgZ2V0IEVOVFJJRVMoKSB7XG4gICAgcmV0dXJuIHRoaXNbRU5UUklFU107XG4gIH1cblxuICBwdWJsaWMgdG9KU09OKCk6IFNpbXBsZU9iamVjdCB7XG4gICAgY29uc3QgcmVzdWx0OiBTaW1wbGVPYmplY3QgPSB7IHR5cGU6IFRhcmdldENvbGxlY3Rpb24ubmFtZSB9O1xuICAgIHRoaXNbRU5UUklFU10uZm9yRWFjaCgodiwgaykgPT4gdm9pZCAocmVzdWx0W2tdID0gdikpO1xuICAgIHJldHVybiByZXN1bHQ7XG4gIH1cblxuICBwdWJsaWMgZ2V0KG5hbWU6IHN0cmluZyk6IE1haW5UYXJnZXQge1xuICAgIGNvbnN0IHJlc3VsdCA9IHRoaXNbRU5UUklFU10uZ2V0KG5hbWUpO1xuICAgIGlmICghcmVzdWx0KVxuICAgICAgdGhyb3cgYFRhcmdldCBcIiR7bmFtZX1cIiBkb2VzIG5vdCBleGlzdGA7XG4gICAgcmV0dXJuIHJlc3VsdDtcbiAgfVxuXG4gIHB1YmxpYyBzZXQobmFtZTogc3RyaW5nLCB0YXJnZXQ6IGFueSkge1xuICAgIGlmICh0aGlzW0VOVFJJRVNdLmhhcyhuYW1lKSlcbiAgICAgIHRocm93IG5ldyBFcnJvcihgVGFyZ2V0IFwiJHtuYW1lfVwiIGV4aXN0c2ApO1xuICAgIHRoaXNbRU5UUklFU10uc2V0KG5hbWUsIHRhcmdldCk7XG4gIH1cblxuICBwcml2YXRlIF9fZ2V0QWxsSW5jbHVkZXMoaW5jbHVkZXM6IHN0cmluZ1tdLCB0YXJnZXRTZXQ6IFNldDxzdHJpbmc+LCBsaXN0OiBBcnJheTxBYnNvbHV0ZVBhdGggfCBUYXJnZXRJbmNsdWRlcz4gfCBBcnJheTxUYXJnZXROYW1lPikge1xuICAgIGZvciAoY29uc3QgaXRlciBvZiBsaXN0KSB7XG4gICAgICBpZiAoaXRlciBpbnN0YW5jZW9mIFRhcmdldEluY2x1ZGVzIHx8IGl0ZXIgaW5zdGFuY2VvZiBUYXJnZXROYW1lKSB7XG4gICAgICAgIGlmICghdGFyZ2V0U2V0LmhhcyhpdGVyLnRhcmdldE5hbWUpKSB7XG4gICAgICAgICAgdGFyZ2V0U2V0LmFkZChpdGVyLnRhcmdldE5hbWUpO1xuICAgICAgICAgIGNvbnN0IHRhcmdldCA9IHRoaXMuZ2V0KGl0ZXIudGFyZ2V0TmFtZSk7XG4gICAgICAgICAgdGhpcy5fX2dldEFsbEluY2x1ZGVzKGluY2x1ZGVzLCB0YXJnZXRTZXQsIHRhcmdldC5nZXRQdWJsaWNJbmNsdWRlcygpKTtcbiAgICAgICAgICB0aGlzLl9fZ2V0QWxsSW5jbHVkZXMoaW5jbHVkZXMsIHRhcmdldFNldCwgdGFyZ2V0LmdldFB1YmxpY0xpYnJhcmllcygpKTtcbiAgICAgICAgfVxuICAgICAgfVxuICAgICAgZWxzZSBpZiAoaXRlciBpbnN0YW5jZW9mIEFic29sdXRlUGF0aCkge1xuICAgICAgICBpZiAoIWluY2x1ZGVzLmluY2x1ZGVzKGl0ZXIudG9TdHJpbmcoKSkpXG4gICAgICAgICAgaW5jbHVkZXMucHVzaChpdGVyLnRvU3RyaW5nKCkpO1xuICAgICAgfVxuICAgICAgZWxzZSB7XG4gICAgICAgIHRocm93IG5ldyBFcnJvcihgTm90IHN1cHBvcnQgaW5zdGFuY2UgJHtpdGVyfWApO1xuICAgICAgfVxuICAgIH1cbiAgfVxuXG4gIHB1YmxpYyBhbGxJbmNsdWRlc09mKHBhcmFtczogc3RyaW5nIHwgTWFpblRhcmdldCk6IHN0cmluZ1tdIHtcbiAgICBjb25zdCB0YXJnZXQgPSAodHlwZW9mIHBhcmFtcyA9PT0gXCJzdHJpbmdcIikgPyB0aGlzLmdldChwYXJhbXMpIDogcGFyYW1zO1xuICAgIGNvbnN0IGluY2x1ZGVzOiBzdHJpbmdbXSA9IFtdO1xuICAgIGNvbnN0IHRhcmdldFNldCA9IG5ldyBTZXQoWyB0YXJnZXQudGFyZ2V0TmFtZSBdKTtcbiAgICB0aGlzLl9fZ2V0QWxsSW5jbHVkZXMoaW5jbHVkZXMsIHRhcmdldFNldCwgdGFyZ2V0LmdldEluY2x1ZGVzKCkpO1xuICAgIHRoaXMuX19nZXRBbGxJbmNsdWRlcyhpbmNsdWRlcywgdGFyZ2V0U2V0LCB0YXJnZXQuZ2V0TGlicmFyaWVzKCkpO1xuICAgIHJldHVybiBpbmNsdWRlcztcbiAgfVxuXG4gIHByaXZhdGUgX19nZXRBbGxIZWFkZXJzKGhlYWRlcnM6IHN0cmluZ1tdLCB0YXJnZXRTZXQ6IFNldDxzdHJpbmc+LCBsaXN0OiBBcnJheTxBYnNvbHV0ZVBhdGggfCBUYXJnZXRJbmNsdWRlcz4gfCBBcnJheTxUYXJnZXROYW1lPikge1xuICAgIGZvciAoY29uc3QgaXRlciBvZiBsaXN0KSB7XG4gICAgICBpZiAoaXRlciBpbnN0YW5jZW9mIFRhcmdldEluY2x1ZGVzIHx8IGl0ZXIgaW5zdGFuY2VvZiBUYXJnZXROYW1lKSB7XG4gICAgICAgIGlmICghdGFyZ2V0U2V0LmhhcyhpdGVyLnRhcmdldE5hbWUpKSB7XG4gICAgICAgICAgdGFyZ2V0U2V0LmFkZChpdGVyLnRhcmdldE5hbWUpO1xuICAgICAgICAgIGNvbnN0IHRhcmdldCA9IHRoaXMuZ2V0KGl0ZXIudGFyZ2V0TmFtZSk7XG4gICAgICAgICAgZm9yIChjb25zdCBoZWFkZXIgb2YgdGFyZ2V0LmdldEhlYWRlcnMoKS5tYXAoKGk6IGFueSkgPT4gaS5GSUxFLnRvU3RyaW5nKCkpKSB7XG4gICAgICAgICAgICBpZiAoIWhlYWRlcnMuaW5jbHVkZXMoaGVhZGVyLnRvU3RyaW5nKCkpKVxuICAgICAgICAgICAgICBoZWFkZXJzLnB1c2goaGVhZGVyLnRvU3RyaW5nKCkpO1xuICAgICAgICAgIH1cbiAgICAgICAgICB0aGlzLl9fZ2V0QWxsSGVhZGVycyhoZWFkZXJzLCB0YXJnZXRTZXQsIHRhcmdldC5nZXRQdWJsaWNJbmNsdWRlcygpKTtcbiAgICAgICAgICB0aGlzLl9fZ2V0QWxsSGVhZGVycyhoZWFkZXJzLCB0YXJnZXRTZXQsIHRhcmdldC5nZXRQdWJsaWNMaWJyYXJpZXMoKSk7XG4gICAgICAgIH1cbiAgICAgIH1cbiAgICB9XG4gIH1cblxuICBwdWJsaWMgYWxsSGVhZGVyc09mKHBhcmFtczogc3RyaW5nIHwgTWFpblRhcmdldCkge1xuICAgIGNvbnN0IHRhcmdldCA9ICh0eXBlb2YgcGFyYW1zID09PSBcInN0cmluZ1wiKSA/IHRoaXMuZ2V0KHBhcmFtcykgOiBwYXJhbXM7XG4gICAgY29uc3QgaGVhZGVycyA9IHRhcmdldC5nZXRIZWFkZXJzKCkubWFwKChpOiBhbnkpID0+IGkuRklMRS50b1N0cmluZygpKTtcbiAgICBjb25zdCB0YXJnZXRTZXQgPSBuZXcgU2V0KFsgdGFyZ2V0LnRhcmdldE5hbWUgXSk7XG4gICAgdGhpcy5fX2dldEFsbEhlYWRlcnMoaGVhZGVycywgdGFyZ2V0U2V0LCB0YXJnZXQuZ2V0SW5jbHVkZXMoKSk7XG4gICAgdGhpcy5fX2dldEFsbEhlYWRlcnMoaGVhZGVycywgdGFyZ2V0U2V0LCB0YXJnZXQuZ2V0TGlicmFyaWVzKCkpO1xuICAgIHJldHVybiBoZWFkZXJzO1xuICB9XG5cbiAgcHJpdmF0ZSBfX2dldEFsbExpYnJhcmllcyhsaWJyYXJpZXM6IHN0cmluZ1tdLCB0YXJnZXRTZXQ6IFNldDxzdHJpbmc+LCBsaXN0OiBBcnJheTxUYXJnZXROYW1lPikge1xuICAgIGZvciAoY29uc3QgaXRlciBvZiBsaXN0KSB7XG4gICAgICBjb25zb2xlLmFzc2VydChpdGVyIGluc3RhbmNlb2YgVGFyZ2V0TmFtZSk7XG4gICAgICBpZiAoIXRhcmdldFNldC5oYXMoaXRlci50YXJnZXROYW1lKSkge1xuICAgICAgICB0YXJnZXRTZXQuYWRkKGl0ZXIudGFyZ2V0TmFtZSk7XG4gICAgICAgIGNvbnN0IHRhcmdldCA9IHRoaXMuZ2V0KGl0ZXIudGFyZ2V0TmFtZSk7XG4gICAgICAgIGxpYnJhcmllcy5wdXNoKHRhcmdldC5nZXRGaWxlKCkudG9TdHJpbmcoKSk7XG4gICAgICAgIHRoaXMuX19nZXRBbGxMaWJyYXJpZXMobGlicmFyaWVzLCB0YXJnZXRTZXQsIHRhcmdldC5nZXRQdWJsaWNMaWJyYXJpZXMoKSk7XG4gICAgICB9XG4gICAgfVxuICB9XG5cbiAgcHVibGljIGFsbExpYnJhcmllc09mKHBhcmFtczogc3RyaW5nIHwgTWFpblRhcmdldCkge1xuICAgIGNvbnN0IHRhcmdldCA9ICh0eXBlb2YgcGFyYW1zID09PSBcInN0cmluZ1wiKSA/IHRoaXMuZ2V0KHBhcmFtcykgOiBwYXJhbXM7XG4gICAgY29uc3QgbGlicmFyaWVzOiBzdHJpbmdbXSA9IFtdO1xuICAgIGNvbnN0IHRhcmdldFNldCA9IG5ldyBTZXQoWyB0YXJnZXQudGFyZ2V0TmFtZSBdKTtcbiAgICB0aGlzLl9fZ2V0QWxsTGlicmFyaWVzKGxpYnJhcmllcywgdGFyZ2V0U2V0LCB0YXJnZXQuZ2V0TGlicmFyaWVzKCkpO1xuICAgIHJldHVybiBsaWJyYXJpZXM7XG4gIH1cblxuICBwcml2YXRlIF9fZ2V0QWxsRGVmaW5pdGlvbnMoZGVmaW5pdGlvbnM6IHN0cmluZ1tdLCB0YXJnZXRTZXQ6IFNldDxzdHJpbmc+LCBsaXN0OiBBcnJheTxzdHJpbmc+IHwgQXJyYXk8VGFyZ2V0TmFtZT4pIHtcbiAgICBmb3IgKGNvbnN0IGl0ZXIgb2YgbGlzdCkge1xuICAgICAgaWYgKGl0ZXIgaW5zdGFuY2VvZiBUYXJnZXROYW1lKSB7XG4gICAgICAgIGlmICghdGFyZ2V0U2V0LmhhcyhpdGVyLnRhcmdldE5hbWUpKSB7XG4gICAgICAgICAgdGFyZ2V0U2V0LmFkZChpdGVyLnRhcmdldE5hbWUpO1xuICAgICAgICAgIGNvbnN0IHRhcmdldCA9IHRoaXMuZ2V0KGl0ZXIudGFyZ2V0TmFtZSk7XG4gICAgICAgICAgdGhpcy5fX2dldEFsbERlZmluaXRpb25zKGRlZmluaXRpb25zLCB0YXJnZXRTZXQsIHRhcmdldC5nZXRQdWJsaWNEZWZpbml0aW9ucygpKTtcbiAgICAgICAgICB0aGlzLl9fZ2V0QWxsRGVmaW5pdGlvbnMoZGVmaW5pdGlvbnMsIHRhcmdldFNldCwgdGFyZ2V0LmdldFB1YmxpY0xpYnJhcmllcygpKTtcbiAgICAgICAgfVxuICAgICAgfVxuICAgICAgZWxzZSBpZiAodHlwZW9mIGl0ZXIgPT09IFwic3RyaW5nXCIpIHtcbiAgICAgICAgaWYgKCFkZWZpbml0aW9ucy5pbmNsdWRlcyhpdGVyKSlcbiAgICAgICAgICBkZWZpbml0aW9ucy5wdXNoKGl0ZXIpO1xuICAgICAgfVxuICAgICAgZWxzZSB7XG4gICAgICAgIHRocm93IG5ldyBFcnJvcihgTm90IHN1cHBvcnQgaW5zdGFuY2UgJHtpdGVyfWApO1xuICAgICAgfVxuICAgIH1cbiAgfVxuXG4gIHB1YmxpYyBhbGxEZWZpbml0aW9uc09mKHBhcmFtczogc3RyaW5nIHwgTWFpblRhcmdldCkge1xuICAgIGNvbnN0IHRhcmdldCA9ICh0eXBlb2YgcGFyYW1zID09PSBcInN0cmluZ1wiKSA/IHRoaXMuZ2V0KHBhcmFtcykgOiBwYXJhbXM7XG4gICAgY29uc3QgZGVmaW5pdGlvbnM6IHN0cmluZ1tdID0gW107XG4gICAgY29uc3QgdGFyZ2V0U2V0ID0gbmV3IFNldChbIHRhcmdldC50YXJnZXROYW1lIF0pO1xuICAgIHRoaXMuX19nZXRBbGxEZWZpbml0aW9ucyhkZWZpbml0aW9ucywgdGFyZ2V0U2V0LCB0YXJnZXQuZ2V0RGVmaW5pdGlvbnMoKSk7XG4gICAgdGhpcy5fX2dldEFsbERlZmluaXRpb25zKGRlZmluaXRpb25zLCB0YXJnZXRTZXQsIHRhcmdldC5nZXRQdWJsaWNMaWJyYXJpZXMoKSk7XG4gICAgcmV0dXJuIGRlZmluaXRpb25zO1xuICB9XG5cbiAgcHJpdmF0ZSBfX2dldEFsbENvbXBpbGVPcHRpb25zKG9wdGlvbnM6IEFycmF5PHN0cmluZ3xzdHJpbmdbXT4sIHRhcmdldFNldDogU2V0PHN0cmluZz4sIGxpc3Q6IEFycmF5PHN0cmluZ3xzdHJpbmdbXT4gfCBBcnJheTxUYXJnZXROYW1lPikge1xuICAgIGZvciAoY29uc3QgaXRlciBvZiBsaXN0KSB7XG4gICAgICBpZiAoaXRlciBpbnN0YW5jZW9mIFRhcmdldE5hbWUpIHtcbiAgICAgICAgaWYgKCF0YXJnZXRTZXQuaGFzKGl0ZXIudGFyZ2V0TmFtZSkpIHtcbiAgICAgICAgICB0YXJnZXRTZXQuYWRkKGl0ZXIudGFyZ2V0TmFtZSk7XG4gICAgICAgICAgY29uc3QgdGFyZ2V0ID0gdGhpcy5nZXQoaXRlci50YXJnZXROYW1lKTtcbiAgICAgICAgICB0aGlzLl9fZ2V0QWxsQ29tcGlsZU9wdGlvbnMob3B0aW9ucywgdGFyZ2V0U2V0LCB0YXJnZXQuZ2V0UHVibGljQ29tcGlsZU9wdGlvbnMoKSk7XG4gICAgICAgICAgdGhpcy5fX2dldEFsbENvbXBpbGVPcHRpb25zKG9wdGlvbnMsIHRhcmdldFNldCwgdGFyZ2V0LmdldFB1YmxpY0xpYnJhcmllcygpKTtcbiAgICAgICAgfVxuICAgICAgfVxuICAgICAgZWxzZSBpZiAodHlwZW9mIGl0ZXIgPT09IFwic3RyaW5nXCIpIHtcbiAgICAgICAgaWYgKCFvcHRpb25zLmluY2x1ZGVzKGl0ZXIpKVxuICAgICAgICAgIG9wdGlvbnMucHVzaChpdGVyKTtcbiAgICAgIH1cbiAgICAgIGVsc2UgaWYgKEFycmF5LmlzQXJyYXkoaXRlcikpIHtcbiAgICAgICAgLy8gVE9ETzogQWRkIGNvbXBhcmUgZm9yIHNhbWUgYXJyYXkgaW4gb3B0aW9uc1xuICAgICAgICBvcHRpb25zLnB1c2goaXRlcik7XG4gICAgICB9XG4gICAgICBlbHNlIHtcbiAgICAgICAgdGhyb3cgbmV3IEVycm9yKGBOb3Qgc3VwcG9ydCBpbnN0YW5jZSAke2l0ZXJ9YCk7XG4gICAgICB9XG4gICAgfVxuICB9XG5cbiAgcHVibGljIGFsbENvbXBpbGVPcHRpb25zT2YocGFyYW1zOiBzdHJpbmcgfCBNYWluVGFyZ2V0KSB7XG4gICAgY29uc3QgdGFyZ2V0ID0gKHR5cGVvZiBwYXJhbXMgPT09IFwic3RyaW5nXCIpID8gdGhpcy5nZXQocGFyYW1zKSA6IHBhcmFtcztcbiAgICBjb25zdCBvcHRpb25zOiBzdHJpbmdbXSA9IFtdO1xuICAgIGNvbnN0IHRhcmdldFNldCA9IG5ldyBTZXQoWyB0YXJnZXQudGFyZ2V0TmFtZSBdKTtcbiAgICB0aGlzLl9fZ2V0QWxsQ29tcGlsZU9wdGlvbnMob3B0aW9ucywgdGFyZ2V0U2V0LCB0YXJnZXQuZ2V0Q29tcGlsZU9wdGlvbnMoKSk7XG4gICAgdGhpcy5fX2dldEFsbENvbXBpbGVPcHRpb25zKG9wdGlvbnMsIHRhcmdldFNldCwgdGFyZ2V0LmdldFB1YmxpY0xpYnJhcmllcygpKTtcbiAgICByZXR1cm4gb3B0aW9ucy5mbGF0KCk7XG4gIH1cblxuICBwcml2YXRlIF9fZ2V0TGlua09wdGlvbnMob3B0aW9uczogQXJyYXk8c3RyaW5nfHN0cmluZ1tdPiwgdGFyZ2V0U2V0OiBTZXQ8c3RyaW5nPiwgbGlzdDogQXJyYXk8c3RyaW5nfHN0cmluZ1tdPiB8IEFycmF5PFRhcmdldE5hbWU+KSB7XG4gICAgZm9yIChjb25zdCBpdGVyIG9mIGxpc3QpIHtcbiAgICAgIGlmIChpdGVyIGluc3RhbmNlb2YgVGFyZ2V0TmFtZSkge1xuICAgICAgICBpZiAoIXRhcmdldFNldC5oYXMoaXRlci50YXJnZXROYW1lKSkge1xuICAgICAgICAgIHRhcmdldFNldC5hZGQoaXRlci50YXJnZXROYW1lKTtcbiAgICAgICAgICBjb25zdCB0YXJnZXQgPSB0aGlzLmdldChpdGVyLnRhcmdldE5hbWUpO1xuICAgICAgICAgIHRoaXMuX19nZXRMaW5rT3B0aW9ucyhvcHRpb25zLCB0YXJnZXRTZXQsIHRhcmdldC5nZXRQdWJsaWNMaW5rT3B0aW9ucygpKTtcbiAgICAgICAgICB0aGlzLl9fZ2V0TGlua09wdGlvbnMob3B0aW9ucywgdGFyZ2V0U2V0LCB0YXJnZXQuZ2V0UHVibGljTGlicmFyaWVzKCkpO1xuICAgICAgICB9XG4gICAgICB9XG4gICAgICBlbHNlIGlmICh0eXBlb2YgaXRlciA9PT0gXCJzdHJpbmdcIikge1xuICAgICAgICBpZiAoIW9wdGlvbnMuaW5jbHVkZXMoaXRlcikpXG4gICAgICAgICAgb3B0aW9ucy5wdXNoKGl0ZXIpO1xuICAgICAgfVxuICAgICAgZWxzZSBpZiAoQXJyYXkuaXNBcnJheShpdGVyKSkge1xuICAgICAgICAvLyBUT0RPOiBBZGQgY29tcGFyZSBmb3Igc2FtZSBhcnJheSBpbiBvcHRpb25zXG4gICAgICAgIG9wdGlvbnMucHVzaChpdGVyKTtcbiAgICAgIH1cbiAgICAgIGVsc2Uge1xuICAgICAgICB0aHJvdyBuZXcgRXJyb3IoYE5vdCBzdXBwb3J0IGluc3RhbmNlICR7aXRlcn1gKTtcbiAgICAgIH1cbiAgICB9XG4gIH1cblxuICBwdWJsaWMgYWxsTGlua09wdGlvbnNPZihwYXJhbXM6IHN0cmluZyB8IE1haW5UYXJnZXQpIHtcbiAgICBjb25zdCB0YXJnZXQgPSAodHlwZW9mIHBhcmFtcyA9PT0gXCJzdHJpbmdcIikgPyB0aGlzLmdldChwYXJhbXMpIDogcGFyYW1zO1xuICAgIGNvbnN0IG9wdGlvbnM6IHN0cmluZ1tdID0gW107XG4gICAgY29uc3QgdGFyZ2V0U2V0ID0gbmV3IFNldChbIHRhcmdldC50YXJnZXROYW1lIF0pO1xuICAgIHRoaXMuX19nZXRMaW5rT3B0aW9ucyhvcHRpb25zLCB0YXJnZXRTZXQsIHRhcmdldC5nZXRMaW5rT3B0aW9ucygpKTtcbiAgICB0aGlzLl9fZ2V0TGlua09wdGlvbnMob3B0aW9ucywgdGFyZ2V0U2V0LCB0YXJnZXQuZ2V0UHVibGljTGlicmFyaWVzKCkpO1xuICAgIHJldHVybiBvcHRpb25zLmZsYXQoKTtcbiAgfVxufVxuIiwiLypcbiAqIE1JVCBMaWNlbnNlXG4gKlxuICogQ29weXJpZ2h0IChjKSAyMDI1ICBZdXJpaSBZYWt1YmluICh5dXJpaS55YWt1YmluQGdtYWlsLmNvbSlcbiAqXG4gKiBQZXJtaXNzaW9uIGlzIGdyYW50ZWQgdG8gdXNlLCBjb3B5LCBtb2RpZnksIGFuZCBkaXN0cmlidXRlIHRoaXMgc29mdHdhcmVcbiAqIHVuZGVyIHRoZSBNSVQgTGljZW5zZS4gU2VlIExJQ0VOU0UgZmlsZSBmb3IgZGV0YWlscy5cbiAqL1xuXG5pbXBvcnQgeyBTaW1wbGVPYmplY3QgfSBmcm9tIFwiQC9jb3JlL1NpbXBsZU9iamVjdFwiO1xuXG5jb25zdCBOQU1FID0gU3ltYm9sKFwiTkFNRVwiKTtcblxuZXhwb3J0IGNsYXNzIFRhcmdldEZpbGUge1xuICBwcml2YXRlIFtOQU1FXTogc3RyaW5nO1xuXG4gIHByaXZhdGUgY29uc3RydWN0b3IodGFyZ2V0TmFtZTogc3RyaW5nKSB7XG4gICAgdGhpc1tOQU1FXSA9IHRhcmdldE5hbWU7XG4gIH1cblxuICBwdWJsaWMgc3RhdGljIGNyZWF0ZShuYW1lOiBzdHJpbmcpIHtcbiAgICByZXR1cm4gT2JqZWN0LnNlYWwobmV3IFRhcmdldEZpbGUobmFtZSkpO1xuICB9XG5cbiAgcHVibGljIHN0YXRpYyBmcm9tSlNPTihvYmplY3Q6IFNpbXBsZU9iamVjdCkge1xuICAgIHJldHVybiBUYXJnZXRGaWxlLmNyZWF0ZShvYmplY3QudGFyZ2V0TmFtZSBhcyBzdHJpbmcpO1xuICB9XG5cbiAgcHVibGljIGdldCB0YXJnZXROYW1lKCk6IHN0cmluZyB7XG4gICAgcmV0dXJuIHRoaXNbTkFNRV07XG4gIH1cblxuICBwdWJsaWMgdG9TdHJpbmcoKTogc3RyaW5nIHtcbiAgICByZXR1cm4gXCIke1wiICsgdGhpc1tOQU1FXSArIFwiLmZpbGV9XCI7XG4gIH1cblxuICBwdWJsaWMgdG9KU09OKCk6IFNpbXBsZU9iamVjdCB7XG4gICAgcmV0dXJuIHtcbiAgICAgIHR5cGU6IFRhcmdldEZpbGUubmFtZSxcbiAgICAgIHRhcmdldE5hbWU6IHRoaXNbTkFNRV0sXG4gICAgfVxuICB9XG59O1xuXG5TaW1wbGVPYmplY3QucmVnaXN0ZXJJbnN0YW5jZUNyZWF0b3IoVGFyZ2V0RmlsZS5uYW1lLCBUYXJnZXRGaWxlLmZyb21KU09OKTtcbiIsIi8qXG4gKiBNSVQgTGljZW5zZVxuICpcbiAqIENvcHlyaWdodCAoYykgMjAyNSAgWXVyaWkgWWFrdWJpbiAoeXVyaWkueWFrdWJpbkBnbWFpbC5jb20pXG4gKlxuICogUGVybWlzc2lvbiBpcyBncmFudGVkIHRvIHVzZSwgY29weSwgbW9kaWZ5LCBhbmQgZGlzdHJpYnV0ZSB0aGlzIHNvZnR3YXJlXG4gKiB1bmRlciB0aGUgTUlUIExpY2Vuc2UuIFNlZSBMSUNFTlNFIGZpbGUgZm9yIGRldGFpbHMuXG4gKi9cblxuaW1wb3J0IHsgTG9nZ2VyIH0gZnJvbSBcIkAvbG9nZ2VyXCI7XG5cbmNvbnN0IGxvZ2dlciA9IExvZ2dlci5jcmVhdGUoaW1wb3J0Lm1ldGEudXJsKTtcblxuZXhwb3J0IG5hbWVzcGFjZSBUYXJnZXRIZWxwZXIge1xuXG5mdW5jdGlvbiBjb252ZXJ0VmFsdWVUb0RlZmluaXRpb24odmFsdWU6IGFueSk6IHN0cmluZyB7XG4gIGlmICh2YWx1ZSA9PT0gdW5kZWZpbmVkKVxuICAgIHRocm93IGBEZWZpbml0aW9uIHVuZGVmaW5lZGA7XG4gIGlmICh0eXBlb2YgdmFsdWUgPT09IFwib2JqZWN0XCIpXG4gICAgcmV0dXJuICdcIicgKyBKU09OLnN0cmluZ2lmeSh2YWx1ZSkgKyAnXCInO1xuICByZXR1cm4gdmFsdWUudG9TdHJpbmcoKTtcbn1cblxuZXhwb3J0IGZ1bmN0aW9uIG5vcm1hbGl6ZURlZmluaXRpb25zKGRlZmluaXRpb25zOiBhbnlbXSk6IHN0cmluZ1tdIHtcbiAgY29uc3QgcmVzdWx0ID0gW107XG4gIGZvciAoY29uc3QgaXRlciBvZiBkZWZpbml0aW9ucykge1xuICAgIGlmICh0eXBlb2YgaXRlciA9PT0gXCJzdHJpbmdcIilcbiAgICAgIHJlc3VsdC5wdXNoKGl0ZXIpO1xuICAgIGVsc2UgaWYgKCFpdGVyKVxuICAgICAgdGhyb3cgbmV3IEVycm9yKGBEZWZlbml0aW9uICR7aXRlcn0gbm90IHN1cHBvcnRlZGApXG4gICAgZWxzZSBpZiAodHlwZW9mIGl0ZXIgPT09IFwib2JqZWN0XCIpIHtcbiAgICAgIGZvciAoY29uc3QgW2tleSwgdmFsXSBvZiBPYmplY3QuZW50cmllcyhpdGVyKSlcbiAgICAgICAgcmVzdWx0LnB1c2goYCR7a2V5fT0ke2NvbnZlcnRWYWx1ZVRvRGVmaW5pdGlvbih2YWwpfWApO1xuICAgIH1cbiAgICBlbHNlXG4gICAgICB0aHJvdyBuZXcgRXJyb3IoYERlZmVuaXRpb24gJHtpdGVyfSBub3Qgc3VwcG9ydGVkYClcbiAgfVxuICByZXR1cm4gcmVzdWx0O1xufVxuXG59IC8vIG5hbWVzcGFjZSBuYW1lc3BhY2VcbiIsIi8qXG4gKiBNSVQgTGljZW5zZVxuICpcbiAqIENvcHlyaWdodCAoYykgMjAyNSAgWXVyaWkgWWFrdWJpbiAoeXVyaWkueWFrdWJpbkBnbWFpbC5jb20pXG4gKlxuICogUGVybWlzc2lvbiBpcyBncmFudGVkIHRvIHVzZSwgY29weSwgbW9kaWZ5LCBhbmQgZGlzdHJpYnV0ZSB0aGlzIHNvZnR3YXJlXG4gKiB1bmRlciB0aGUgTUlUIExpY2Vuc2UuIFNlZSBMSUNFTlNFIGZpbGUgZm9yIGRldGFpbHMuXG4gKi9cblxuaW1wb3J0IHsgU2ltcGxlT2JqZWN0IH0gZnJvbSBcIkAvY29yZS9TaW1wbGVPYmplY3RcIjtcblxuY29uc3QgTkFNRSA9IFN5bWJvbChcIk5BTUVcIik7XG5cbmV4cG9ydCBjbGFzcyBUYXJnZXRJbmNsdWRlcyB7XG4gIHByaXZhdGUgW05BTUVdOiBzdHJpbmc7XG5cbiAgcHJpdmF0ZSBjb25zdHJ1Y3RvcihuYW1lOiBzdHJpbmcpIHtcbiAgICB0aGlzW05BTUVdID0gbmFtZTtcbiAgfVxuXG4gIHB1YmxpYyBzdGF0aWMgY3JlYXRlKG5hbWU6IHN0cmluZykge1xuICAgIHJldHVybiBPYmplY3Quc2VhbChuZXcgVGFyZ2V0SW5jbHVkZXMobmFtZSkpO1xuICB9XG5cbiAgcHVibGljIHN0YXRpYyBmcm9tSlNPTihvYmplY3Q6IFNpbXBsZU9iamVjdCkge1xuICAgIHJldHVybiBUYXJnZXRJbmNsdWRlcy5jcmVhdGUob2JqZWN0LnRhcmdldE5hbWUgYXMgc3RyaW5nKTtcbiAgfVxuXG4gIHB1YmxpYyBnZXQgdGFyZ2V0TmFtZSgpOiBzdHJpbmcge1xuICAgIHJldHVybiB0aGlzW05BTUVdO1xuICB9XG5cbiAgcHVibGljIHRvU3RyaW5nKCk6IHN0cmluZyB7XG4gICAgcmV0dXJuIFwiJHtcIiArIHRoaXNbTkFNRV0gKyBcIi5pbmNsdWRlc31cIjtcbiAgfVxuXG4gIHB1YmxpYyB0b0pTT04oKTogU2ltcGxlT2JqZWN0IHtcbiAgICByZXR1cm4ge1xuICAgICAgdHlwZTogVGFyZ2V0SW5jbHVkZXMubmFtZSxcbiAgICAgIHRhcmdldE5hbWU6IHRoaXNbTkFNRV0sXG4gICAgfVxuICB9XG5cbiAgcHVibGljIHN0YXRpYyBlbnN1cmVJbnN0YW5jZSh2YWx1ZTogYW55KSB7XG4gICAgaWYgKHZhbHVlIGluc3RhbmNlb2YgVGFyZ2V0SW5jbHVkZXMpXG4gICAgICByZXR1cm4gdmFsdWU7XG4gICAgdGhyb3cgbmV3IEVycm9yKGBUaGUgJyR7dmFsdWV9JyBpcyBub3QgYSBUYXJnZXRJbmNsdWRlc2ApO1xuICB9XG59O1xuXG5TaW1wbGVPYmplY3QucmVnaXN0ZXJJbnN0YW5jZUNyZWF0b3IoVGFyZ2V0SW5jbHVkZXMubmFtZSwgVGFyZ2V0SW5jbHVkZXMuZnJvbUpTT04pO1xuIiwiLypcbiAqIE1JVCBMaWNlbnNlXG4gKlxuICogQ29weXJpZ2h0IChjKSAyMDI1ICBZdXJpaSBZYWt1YmluICh5dXJpaS55YWt1YmluQGdtYWlsLmNvbSlcbiAqXG4gKiBQZXJtaXNzaW9uIGlzIGdyYW50ZWQgdG8gdXNlLCBjb3B5LCBtb2RpZnksIGFuZCBkaXN0cmlidXRlIHRoaXMgc29mdHdhcmVcbiAqIHVuZGVyIHRoZSBNSVQgTGljZW5zZS4gU2VlIExJQ0VOU0UgZmlsZSBmb3IgZGV0YWlscy5cbiAqL1xuXG5pbXBvcnQgeyBTaW1wbGVPYmplY3QgfSBmcm9tIFwiQC9jb3JlL1NpbXBsZU9iamVjdFwiO1xuXG5jb25zdCBOQU1FID0gU3ltYm9sKFwiTkFNRVwiKTtcblxuZXhwb3J0IGNsYXNzIFRhcmdldE5hbWUge1xuICBwcml2YXRlIFtOQU1FXTogc3RyaW5nO1xuXG4gIHByaXZhdGUgY29uc3RydWN0b3IobmFtZTogc3RyaW5nKSB7XG4gICAgdGhpc1tOQU1FXSA9IG5hbWU7XG4gIH1cblxuICBwdWJsaWMgc3RhdGljIGNyZWF0ZShuYW1lOiBzdHJpbmcpIHtcbiAgICByZXR1cm4gT2JqZWN0LnNlYWwobmV3IFRhcmdldE5hbWUobmFtZSkpO1xuICB9XG5cbiAgcHVibGljIHN0YXRpYyBmcm9tSlNPTihvYmplY3Q6IFNpbXBsZU9iamVjdCkge1xuICAgIHJldHVybiBUYXJnZXROYW1lLmNyZWF0ZShvYmplY3QudGFyZ2V0TmFtZSBhcyBzdHJpbmcpO1xuICB9XG5cbiAgcHVibGljIGdldCB0YXJnZXROYW1lKCk6IHN0cmluZyB7XG4gICAgcmV0dXJuIHRoaXNbTkFNRV07XG4gIH1cblxuICBwdWJsaWMgdG9TdHJpbmcoKTogc3RyaW5nIHtcbiAgICByZXR1cm4gXCIke1wiICsgdGhpc1tOQU1FXSArIFwiLmxpbmt9XCI7XG4gIH1cblxuICBwdWJsaWMgdG9KU09OKCk6IFNpbXBsZU9iamVjdCB7XG4gICAgcmV0dXJuIHtcbiAgICAgIHR5cGU6IFRhcmdldE5hbWUubmFtZSxcbiAgICAgIHRhcmdldE5hbWU6IHRoaXNbTkFNRV0sXG4gICAgfVxuICB9XG59O1xuXG5TaW1wbGVPYmplY3QucmVnaXN0ZXJJbnN0YW5jZUNyZWF0b3IoVGFyZ2V0TmFtZS5uYW1lLCBUYXJnZXROYW1lLmZyb21KU09OKTtcbiIsIi8qXG4gKiBNSVQgTGljZW5zZVxuICpcbiAqIENvcHlyaWdodCAoYykgMjAyNSAgWXVyaWkgWWFrdWJpbiAoeXVyaWkueWFrdWJpbkBnbWFpbC5jb20pXG4gKlxuICogUGVybWlzc2lvbiBpcyBncmFudGVkIHRvIHVzZSwgY29weSwgbW9kaWZ5LCBhbmQgZGlzdHJpYnV0ZSB0aGlzIHNvZnR3YXJlXG4gKiB1bmRlciB0aGUgTUlUIExpY2Vuc2UuIFNlZSBMSUNFTlNFIGZpbGUgZm9yIGRldGFpbHMuXG4gKi9cblxuaW1wb3J0IHsgU2ltcGxlT2JqZWN0IH0gZnJvbSBcIkAvY29yZS9TaW1wbGVPYmplY3RcIjtcblxuY29uc3QgTkFNRSA9IFN5bWJvbChcIk5BTUVcIik7XG5cbmV4cG9ydCBjbGFzcyBUYXJnZXRPYmplY3RzIHtcbiAgcHJpdmF0ZSBbTkFNRV06IHN0cmluZztcblxuICBwcml2YXRlIGNvbnN0cnVjdG9yKG5hbWU6IHN0cmluZykge1xuICAgIHRoaXNbTkFNRV0gPSBuYW1lO1xuICB9XG5cbiAgcHVibGljIHN0YXRpYyBjcmVhdGUobmFtZTogc3RyaW5nKSB7XG4gICAgcmV0dXJuIE9iamVjdC5zZWFsKG5ldyBUYXJnZXRPYmplY3RzKG5hbWUpKTtcbiAgfVxuXG4gIHB1YmxpYyBzdGF0aWMgZnJvbUpTT04ob2JqZWN0OiBTaW1wbGVPYmplY3QpIHtcbiAgICByZXR1cm4gVGFyZ2V0T2JqZWN0cy5jcmVhdGUob2JqZWN0LnRhcmdldE5hbWUgYXMgc3RyaW5nKTtcbiAgfVxuXG4gIHB1YmxpYyBzdGF0aWMgZW5zdXJlSW5zdGFuY2UodmFsdWU6IGFueSk6IFRhcmdldE9iamVjdHMge1xuICAgIGlmICh2YWx1ZSBpbnN0YW5jZW9mIFRhcmdldE9iamVjdHMpXG4gICAgICByZXR1cm4gdmFsdWU7XG4gICAgdGhyb3cgbmV3IEVycm9yKGBUaGUgJyR7dmFsdWV9JyBpcyBub3QgYSBUYXJnZXRPYmplY3RzYCk7XG4gIH1cblxuICBwdWJsaWMgZ2V0IHRhcmdldE5hbWUoKTogc3RyaW5nIHtcbiAgICByZXR1cm4gdGhpc1tOQU1FXTtcbiAgfVxuXG4gIHB1YmxpYyB0b1N0cmluZygpOiBzdHJpbmcge1xuICAgIHJldHVybiBcIiR7XCIgKyB0aGlzW05BTUVdICsgXCIub2JqZWN0c31cIjtcbiAgfVxuXG4gIHB1YmxpYyB0b0pTT04oKTogU2ltcGxlT2JqZWN0IHtcbiAgICByZXR1cm4ge1xuICAgICAgdHlwZTogVGFyZ2V0T2JqZWN0cy5uYW1lLFxuICAgICAgdGFyZ2V0TmFtZTogdGhpc1tOQU1FXSxcbiAgICB9XG4gIH1cbn07XG5cblNpbXBsZU9iamVjdC5yZWdpc3Rlckluc3RhbmNlQ3JlYXRvcihUYXJnZXRPYmplY3RzLm5hbWUsIFRhcmdldE9iamVjdHMuZnJvbUpTT04pO1xuIiwiLypcbiAqIE1JVCBMaWNlbnNlXG4gKlxuICogQ29weXJpZ2h0IChjKSAyMDI1ICBZdXJpaSBZYWt1YmluICh5dXJpaS55YWt1YmluQGdtYWlsLmNvbSlcbiAqXG4gKiBQZXJtaXNzaW9uIGlzIGdyYW50ZWQgdG8gdXNlLCBjb3B5LCBtb2RpZnksIGFuZCBkaXN0cmlidXRlIHRoaXMgc29mdHdhcmVcbiAqIHVuZGVyIHRoZSBNSVQgTGljZW5zZS4gU2VlIExJQ0VOU0UgZmlsZSBmb3IgZGV0YWlscy5cbiAqL1xuXG5pbXBvcnQgeyBQcm9qZWN0Q29udGV4dCB9IGZyb20gXCJAL2NvcmUvUHJvamVjdENvbnRleHRcIjtcbmltcG9ydCB7IFZhcmlhYmxlTWFwIH0gZnJvbSBcIkAvY29yZS9TY29wZVwiO1xuaW1wb3J0IHsgR2VuZXJhbENvbnRleHQgfSBmcm9tIFwiQC9jb3JlL0Jhc2VDb250ZXh0XCI7XG5pbXBvcnQgeyBjcmVhdGVDb250ZXh0IH0gZnJvbSBcIkAvY29yZS9CYXNlQ29udGV4dFwiO1xuXG5jb25zdCBHTE9CQUwgPSBTeW1ib2woXCJHTE9CQUxcIik7XG5jb25zdCBTQ09QRSA9IFN5bWJvbChcIlNDT1BFXCIpO1xuXG5leHBvcnQgY2xhc3MgVG9vbGNoYWluQ29udGV4dCBleHRlbmRzIEdlbmVyYWxDb250ZXh0IHtcbiAgW1NDT1BFXTogVmFyaWFibGVNYXA7XG4gIFtHTE9CQUxdOiBQcm9qZWN0Q29udGV4dDtcblxuICBjb25zdHJ1Y3RvcihnbG9iYWw6IFByb2plY3RDb250ZXh0LCBzY29wZTogVmFyaWFibGVNYXApIHtcbiAgICBzdXBlcihzY29wZSk7XG4gICAgdGhpc1tHTE9CQUxdID0gZ2xvYmFsO1xuICAgIHRoaXNbU0NPUEVdID0gc2NvcGU7XG4gIH1cblxuICBwdWJsaWMgc3RhdGljIGNyZWF0ZShnbG9iYWw6IFByb2plY3RDb250ZXh0LCB2YXJpYWJsZU1hcDogVmFyaWFibGVNYXApIHtcbiAgICByZXR1cm4gY3JlYXRlQ29udGV4dChuZXcgVG9vbGNoYWluQ29udGV4dChnbG9iYWwsIHZhcmlhYmxlTWFwKSk7XG4gIH1cbn07XG4iLCIvKlxuICogTUlUIExpY2Vuc2VcbiAqXG4gKiBDb3B5cmlnaHQgKGMpIDIwMjUgIFl1cmlpIFlha3ViaW4gKHl1cmlpLnlha3ViaW5AZ21haWwuY29tKVxuICpcbiAqIFBlcm1pc3Npb24gaXMgZ3JhbnRlZCB0byB1c2UsIGNvcHksIG1vZGlmeSwgYW5kIGRpc3RyaWJ1dGUgdGhpcyBzb2Z0d2FyZVxuICogdW5kZXIgdGhlIE1JVCBMaWNlbnNlLiBTZWUgTElDRU5TRSBmaWxlIGZvciBkZXRhaWxzLlxuICovXG5cbmV4cG9ydCBjb25zdCBERUJVR19CVUlMRF9UWVBFID0gXCJEZWJ1Z1wiO1xuZXhwb3J0IGNvbnN0IFJFTEVBU0VfQlVJTERfVFlQRSA9IFwiUmVsZWFzZVwiO1xuIiwiLypcbiAqIE1JVCBMaWNlbnNlXG4gKlxuICogQ29weXJpZ2h0IChjKSAyMDI1ICBZdXJpaSBZYWt1YmluICh5dXJpaS55YWt1YmluQGdtYWlsLmNvbSlcbiAqXG4gKiBQZXJtaXNzaW9uIGlzIGdyYW50ZWQgdG8gdXNlLCBjb3B5LCBtb2RpZnksIGFuZCBkaXN0cmlidXRlIHRoaXMgc29mdHdhcmVcbiAqIHVuZGVyIHRoZSBNSVQgTGljZW5zZS4gU2VlIExJQ0VOU0UgZmlsZSBmb3IgZGV0YWlscy5cbiAqL1xuXG5pbXBvcnQgeyBJTWFrZUNvbnRleHQsIEludGVyZmFjZVNjcmlwdCB9IGZyb20gXCJAL2NvcmUvTWFrZUludGVyZmFjZXNcIjtcbmltcG9ydCB7IFZhcmlhbnRNYXAsIFZhcmlhYmxlTWFwLCBTY29wZUhlbHBlciB9IGZyb20gXCJAL2NvcmUvU2NvcGVcIjtcbmltcG9ydCB7IFN5c3RlbVNjb3BlIH0gZnJvbSBcIkAvY29yZS9TeXN0ZW1TY29wZVwiO1xuaW1wb3J0IHsgR2VuZXJhbENvbnRleHQsIE1ha2VDb250ZXh0LCBjcmVhdGVDb250ZXh0IH0gZnJvbSBcIkAvY29yZS9CYXNlQ29udGV4dFwiO1xuaW1wb3J0IHsgVGFyZ2V0VHlwZSwgTWFpblRhcmdldCB9IGZyb20gXCJAL2NvcmUvVGFyZ2V0XCI7XG5pbXBvcnQgeyBVc2VyVGFyZ2V0U3RydWN0IH0gZnJvbSBcIkAvY29yZS9Vc2VyVGFyZ2V0U3RydWN0XCI7XG5pbXBvcnQgeyBBTExfVEFSR0VULCBJTlNUQUxMX1RBUkdFVCB9IGZyb20gXCJAL0NvbnN0YW50c1wiO1xuaW1wb3J0IHsgTG9nZ2VyIH0gZnJvbSBcIkAvbG9nZ2VyXCI7XG5cbmNvbnN0IGxvZ2dlciA9IExvZ2dlci5jcmVhdGUoaW1wb3J0Lm1ldGEudXJsKTtcblxuY29uc3QgU0NPUEUgPSBTeW1ib2woXCJTQ09QRVwiKTtcbmNvbnN0IElNUEwgPSBTeW1ib2woXCJJTVBMXCIpO1xuXG5mdW5jdGlvbiBjcmVhdGVNYWluVGFyZ2V0SW1wbChjdHg6IE1ha2VDb250ZXh0LCBzY29wZTogU3lzdGVtU2NvcGUsIHR5cGU6IFRhcmdldFR5cGUsIG5hbWU6IHN0cmluZykge1xuICBpZiAodHlwZW9mIG5hbWUgIT09IFwic3RyaW5nXCIpXG4gICAgdGhyb3cgbmV3IEVycm9yKGBUYXJnZXQgXCIke25hbWV9XCIgaXMgbm90IHN0cmluZyB0eXBlYCk7XG5cbiAgaWYgKCFuYW1lKVxuICAgIHRocm93IG5ldyBFcnJvcihgQSB0YXJnZXQgd2l0aCBhbiBlbXB0eSBuYW1lIGNhbm5vdCBleGlzdGApO1xuXG4gIGlmIChjdHguaGFzTWFpblRhcmdldChuYW1lKSlcbiAgICB0aHJvdyBuZXcgRXJyb3IoYFRhcmdldCBcIiR7bmFtZX1cIiBleGlzdHNgKTtcblxuICBpZiAoWyBBTExfVEFSR0VULCBJTlNUQUxMX1RBUkdFVCBdLmluY2x1ZGVzKG5hbWUpKVxuICAgIHRocm93IG5ldyBFcnJvcihgVGFyZ2V0IFwiJHtuYW1lfVwiIGlzIHJlc2VydmVkIG5hbWVgKTtcblxuICBjb25zdCB0YXJnZXQgPSBNYWluVGFyZ2V0LmNyZWF0ZSh0eXBlLCBuYW1lLCBzY29wZS5TT1VSQ0VfRElSLCBzY29wZS5CSU5BUllfRElSKTtcbiAgY3R4LmFkZE1haW5UYXJnZXQobmFtZSwgdGFyZ2V0KTtcbiAgcmV0dXJuIHRhcmdldDtcbn1cblxuZXhwb3J0IGNsYXNzIFVzZXJNYWtlQ29udGV4dCBleHRlbmRzIEdlbmVyYWxDb250ZXh0IGltcGxlbWVudHMgSU1ha2VDb250ZXh0IHtcbiAgW0lNUExdOiBNYWtlQ29udGV4dDtcbiAgW1NDT1BFXTogU3lzdGVtU2NvcGU7XG5cbiAgcHVibGljIGNvbnN0cnVjdG9yKGltcGw6IE1ha2VDb250ZXh0LCB2YXJpYWJsZU1hcDogVmFyaWFibGVNYXApIHtcbiAgICBzdXBlcih2YXJpYWJsZU1hcCk7XG4gICAgdGhpc1tJTVBMXSA9IGltcGw7XG4gICAgdGhpc1tTQ09QRV0gPSBTY29wZUhlbHBlci5jcmVhdGVQcm94eSh2YXJpYWJsZU1hcCk7XG4gIH1cblxuICBwdWJsaWMgc3RhdGljIGNyZWF0ZShpbXBsOiBNYWtlQ29udGV4dCwgdmFyaWFibGVNYXA6IFZhcmlhYmxlTWFwKSB7XG4gICAgcmV0dXJuIGNyZWF0ZUNvbnRleHQobmV3IFVzZXJNYWtlQ29udGV4dChpbXBsLCB2YXJpYWJsZU1hcCkpO1xuICB9XG5cbiAgcHVibGljIGdldENhY2hlVmFyaWFibGVzKCkge1xuICAgIHJldHVybiB0aGlzW0lNUExdLmdldENhY2hlVmFyaWFibGVzKCk7XG4gIH1cblxuICBwdWJsaWMgYWRkQ2FjaGVWYXJpYWJsZXMocGFyYW1zOiBzdHJpbmcgfCBWYXJpYW50TWFwKTogdm9pZCB7XG4gICAgdGhpc1tJTVBMXS5hZGRDYWNoZVZhcmlhYmxlcyhwYXJhbXMpO1xuICB9XG5cbiAgcHVibGljIGFkZEluY2x1ZGVEaXJlY3RvcmllcyguLi5kaXJzOiBhbnlbXSk6IGFueSB7XG4gICAgdGhpc1tJTVBMXS5hZGRJbmNsdWRlRGlyZWN0b3JpZXMoLi4uZGlycyk7XG4gIH1cblxuICBwdWJsaWMgYWRkU3ViZGlyZWN0b3J5KHNvdXJjZURpcjogYW55LCBiaW5hcnlEaXI/OiBhbnkpIHtcbiAgICB0aGlzW0lNUExdLmFkZFN1YmRpcmVjdG9yeShzb3VyY2VEaXIsIGJpbmFyeURpcik7XG4gIH1cbiAgXG4gIHB1YmxpYyBhZGRDdXN0b21TY3JpcHQoc2NyaXB0OiBhbnksIHBhcmFtczogYW55KTogSW50ZXJmYWNlU2NyaXB0IHtcbiAgICByZXR1cm4gdGhpc1tJTVBMXS5hZGRDdXN0b21TY3JpcHQoc2NyaXB0LCBwYXJhbXMpO1xuICB9XG5cbiAgcHVibGljIHRhcmdldChuYW1lOiBzdHJpbmcpOiBVc2VyVGFyZ2V0U3RydWN0IHtcbiAgICByZXR1cm4gVXNlclRhcmdldFN0cnVjdC5jcmVhdGUodGhpc1tJTVBMXS5nZXRQb3N0VGFyZ2V0KG5hbWUpLCB0aGlzW1NDT1BFXSk7XG4gIH1cblxuICBwdWJsaWMgc2NyaXB0KG5hbWU6IHN0cmluZyk6IEludGVyZmFjZVNjcmlwdCB7XG4gICAgcmV0dXJuIHRoaXNbSU1QTF0uc2NyaXB0KG5hbWUpO1xuICB9XG5cbiAgcHVibGljIGluc3RhbGwodmFsdWU6IGFueSwgcGFyYW1zOiBhbnkpOiB2b2lkIHtcbiAgICB0aGlzW0lNUExdLmluc3RhbGwodmFsdWUsIHBhcmFtcyk7XG4gIH1cblxuICBwdWJsaWMgYWRkT2JqZWN0TGlicmFyeShuYW1lOiBzdHJpbmcsIC4uLnNvdXJjZXM6IGFueVtdKTogVXNlclRhcmdldFN0cnVjdCB7XG4gICAgY29uc3QgdGFyZ2V0ID0gY3JlYXRlTWFpblRhcmdldEltcGwodGhpc1tJTVBMXSwgdGhpc1tTQ09QRV0sIFRhcmdldFR5cGUuT2JqZWN0TGlicmFyeSwgbmFtZSk7XG4gICAgdGFyZ2V0LnNldFByZWZpeCh0aGlzW1NDT1BFXS5PQkpFQ1RfTElCUkFSWV9QUkVGSVgpO1xuICAgIHRhcmdldC5zZXRTdWZmaXgodGhpc1tTQ09QRV0uT0JKRUNUX0xJQlJBUllfU1VGRklYKTtcbiAgICB0YXJnZXQuYWRkTGlua09wdGlvbnMoLi4udGhpc1tTQ09QRV0uT0JKRUNUX0xJTktFUl9GTEFHUyk7XG5cbiAgICByZXR1cm4gVXNlclRhcmdldFN0cnVjdC5jcmVhdGUodGFyZ2V0LCB0aGlzW1NDT1BFXSwgLi4uc291cmNlcyk7XG4gIH1cblxuICBwdWJsaWMgYWRkU3RhdGljTGlicmFyeShuYW1lOiBhbnksIC4uLnNvdXJjZXM6IGFueVtdKTogVXNlclRhcmdldFN0cnVjdCB7XG4gICAgY29uc3QgdGFyZ2V0ID0gY3JlYXRlTWFpblRhcmdldEltcGwodGhpc1tJTVBMXSwgdGhpc1tTQ09QRV0sIFRhcmdldFR5cGUuU3RhdGljTGlicmFyeSwgbmFtZSk7XG4gICAgdGFyZ2V0LnNldFByZWZpeCh0aGlzW1NDT1BFXS5TVEFUSUNfTElCUkFSWV9QUkVGSVgpO1xuICAgIHRhcmdldC5zZXRTdWZmaXgodGhpc1tTQ09QRV0uU1RBVElDX0xJQlJBUllfU1VGRklYKTtcbiAgICB0YXJnZXQuYWRkTGlua09wdGlvbnMoLi4udGhpc1tTQ09QRV0uU1RBVElDX0xJTktFUl9GTEFHUyk7XG5cbiAgICByZXR1cm4gVXNlclRhcmdldFN0cnVjdC5jcmVhdGUodGFyZ2V0LCB0aGlzW1NDT1BFXSwgLi4uc291cmNlcyk7XG4gIH1cblxuICBwdWJsaWMgYWRkU2hhcmVkTGlicmFyeShuYW1lOiBhbnksIC4uLnNvdXJjZXM6IGFueVtdKTogVXNlclRhcmdldFN0cnVjdCB7XG4gICAgY29uc3QgdGFyZ2V0ID0gY3JlYXRlTWFpblRhcmdldEltcGwodGhpc1tJTVBMXSwgdGhpc1tTQ09QRV0sIFRhcmdldFR5cGUuU2hhcmVkTGlicmFyeSwgbmFtZSk7XG4gICAgdGFyZ2V0LnNldFByZWZpeCh0aGlzW1NDT1BFXS5TSEFSRURfTElCUkFSWV9QUkVGSVgpO1xuICAgIHRhcmdldC5zZXRTdWZmaXgodGhpc1tTQ09QRV0uU0hBUkVEX0xJQlJBUllfU1VGRklYKTtcbiAgICB0YXJnZXQuYWRkTGlua09wdGlvbnMoLi4udGhpc1tTQ09QRV0uU0hBUkVEX0xJTktFUl9GTEFHUyk7XG5cbiAgICByZXR1cm4gVXNlclRhcmdldFN0cnVjdC5jcmVhdGUodGFyZ2V0LCB0aGlzW1NDT1BFXSwgLi4uc291cmNlcyk7XG4gIH1cblxuICBwdWJsaWMgYWRkRXhlY3V0YWJsZShuYW1lOiBhbnksIC4uLnNvdXJjZXM6IGFueVtdKTogVXNlclRhcmdldFN0cnVjdCB7XG4gICAgY29uc3QgdGFyZ2V0ID0gY3JlYXRlTWFpblRhcmdldEltcGwodGhpc1tJTVBMXSwgdGhpc1tTQ09QRV0sIFRhcmdldFR5cGUuRXhlY3V0YWJsZSwgbmFtZSk7XG4gICAgdGFyZ2V0LnNldFByZWZpeCh0aGlzW1NDT1BFXS5FWEVDVVRBQkxFX1NVRkZJWCk7XG4gICAgdGFyZ2V0LmFkZExpbmtPcHRpb25zKC4uLnRoaXNbU0NPUEVdLkVYRV9MSU5LRVJfRkxBR1MpO1xuXG4gICAgcmV0dXJuIFVzZXJUYXJnZXRTdHJ1Y3QuY3JlYXRlKHRhcmdldCwgdGhpc1tTQ09QRV0sIC4uLnNvdXJjZXMpO1xuICB9XG5cbiAgcHVibGljIGV4ZWN1dGVTY3JpcHQoc2NyaXB0OiBhbnksIHBhcmFtczogYW55KTogdm9pZCB7XG4gICAgdGhpc1tJTVBMXS5leGVjdXRlU2NyaXB0KHNjcmlwdCwgcGFyYW1zKTtcbiAgfVxufTtcbiIsIi8qXG4gKiBNSVQgTGljZW5zZVxuICpcbiAqIENvcHlyaWdodCAoYykgMjAyNSAgWXVyaWkgWWFrdWJpbiAoeXVyaWkueWFrdWJpbkBnbWFpbC5jb20pXG4gKlxuICogUGVybWlzc2lvbiBpcyBncmFudGVkIHRvIHVzZSwgY29weSwgbW9kaWZ5LCBhbmQgZGlzdHJpYnV0ZSB0aGlzIHNvZnR3YXJlXG4gKiB1bmRlciB0aGUgTUlUIExpY2Vuc2UuIFNlZSBMSUNFTlNFIGZpbGUgZm9yIGRldGFpbHMuXG4gKi9cblxuaW1wb3J0IHsgSW50ZXJmYWNlU291cmNlRmlsZXMgfSBmcm9tIFwiQC9jb3JlL01ha2VJbnRlcmZhY2VzXCI7XG5pbXBvcnQgeyBTb3VyY2VGaWxlIH0gZnJvbSBcIkAvY29yZS9Tb3VyY2VGaWxlXCI7XG5pbXBvcnQgeyBUYXJnZXRIZWxwZXIgfSBmcm9tIFwiQC9jb3JlL1RhcmdldEhlbHBlclwiO1xuaW1wb3J0IHsgQmFzZVRhcmdldCB9IGZyb20gXCJAL2NvcmUvVGFyZ2V0XCI7XG5cbmNvbnN0IFRBUkdFVCA9IFN5bWJvbChcIlRBUkdFVFwiKTtcbmNvbnN0IFNPVVJDRVMgPSBTeW1ib2woXCJTT1VSQ0VTXCIpO1xuXG5leHBvcnQgY2xhc3MgVXNlclNvdXJjZUZpbGVzIGV4dGVuZHMgSW50ZXJmYWNlU291cmNlRmlsZXMge1xuICBwcml2YXRlIFtUQVJHRVRdOiBCYXNlVGFyZ2V0O1xuICBwcml2YXRlIFtTT1VSQ0VTXTogU291cmNlRmlsZVtdO1xuXG4gIHByaXZhdGUgY29uc3RydWN0b3IodGFyZ2V0OiBCYXNlVGFyZ2V0LCBzb3VyY2VzOiBTb3VyY2VGaWxlW10pIHtcbiAgICBzdXBlcigpO1xuICAgIHRoaXNbVEFSR0VUXSA9IHRhcmdldDtcbiAgICB0aGlzW1NPVVJDRVNdID0gWyAuLi5zb3VyY2VzIF07XG4gIH1cblxuICBwdWJsaWMgc3RhdGljIGNyZWF0ZSh0YXJnZXQ6IEJhc2VUYXJnZXQsIHNvdXJjZXM6IFNvdXJjZUZpbGVbXSkge1xuICAgIHJldHVybiBPYmplY3Quc2VhbChuZXcgVXNlclNvdXJjZUZpbGVzKHRhcmdldCwgc291cmNlcykpO1xuICB9XG5cbiAgcHVibGljIHNldExhbmd1YWdlKGxhbmd1YWdlOiBzdHJpbmcpOiB2b2lkIHtcbiAgICB0aHJvdyBuZXcgRXJyb3IoXCJOb3QgSW1wbGVtZW50ZWRcIik7XG4gIH1cblxuICBwdWJsaWMgYWRkRGVmaW5pdGlvbnMoLi4uZGVmaW5pdGlvbnM6IHN0cmluZ1tdKSB7XG4gICAgZm9yIChjb25zdCBpdGVyIG9mIFRhcmdldEhlbHBlci5ub3JtYWxpemVEZWZpbml0aW9ucyhkZWZpbml0aW9ucy5mbGF0KCkpKVxuICAgICAgdGhpc1tTT1VSQ0VTXS5mb3JFYWNoKGkgPT4gaS5hZGREZWZpbml0aW9uKGl0ZXIpKTtcbiAgfVxuXG4gIHB1YmxpYyBhZGRDb21waWxlRmxhZ3MoLi4uZmxhZ3M6IHN0cmluZ1tdKSB7XG4gICAgZm9yIChjb25zdCBpdGVyIG9mIGZsYWdzLmZsYXQoKSlcbiAgICAgIHRoaXNbU09VUkNFU10uZm9yRWFjaChpID0+IGkuQ09NUElMRV9GTEFHUy5wdXNoKGl0ZXIpKTtcbiAgfVxuXG4gIHB1YmxpYyB0b0pTT04oKTogb2JqZWN0IHtcbiAgICByZXR1cm4gdGhpc1tTT1VSQ0VTXTtcbiAgfVxufTtcbiIsIi8qXG4gKiBNSVQgTGljZW5zZVxuICpcbiAqIENvcHlyaWdodCAoYykgMjAyNSAgWXVyaWkgWWFrdWJpbiAoeXVyaWkueWFrdWJpbkBnbWFpbC5jb20pXG4gKlxuICogUGVybWlzc2lvbiBpcyBncmFudGVkIHRvIHVzZSwgY29weSwgbW9kaWZ5LCBhbmQgZGlzdHJpYnV0ZSB0aGlzIHNvZnR3YXJlXG4gKiB1bmRlciB0aGUgTUlUIExpY2Vuc2UuIFNlZSBMSUNFTlNFIGZpbGUgZm9yIGRldGFpbHMuXG4gKi9cblxuaW1wb3J0IHsgSW50ZXJmYWNlVGFyZ2V0IH0gZnJvbSBcIkAvY29yZS9NYWtlSW50ZXJmYWNlc1wiO1xuaW1wb3J0IHsgQmFzZVRhcmdldCB9IGZyb20gXCJAL2NvcmUvVGFyZ2V0XCI7XG5pbXBvcnQgeyBTeXN0ZW1TY29wZSB9IGZyb20gXCJAL2NvcmUvU3lzdGVtU2NvcGVcIjtcbmltcG9ydCB7IGVuc3VyZVN0cmluZyB9IGZyb20gXCJAL3V0aWxzL1N0cmljdFR5cGVcIjtcbmltcG9ydCB7IFRhcmdldEluY2x1ZGVzIH0gZnJvbSBcIkAvY29yZS9UYXJnZXRJbmNsdWRlc1wiO1xuaW1wb3J0IHsgVGFyZ2V0T2JqZWN0cyB9IGZyb20gXCJAL2NvcmUvVGFyZ2V0T2JqZWN0c1wiO1xuaW1wb3J0IHsgQWJzb2x1dGVQYXRoIH0gZnJvbSBcIkAvY29yZS9BYnNvbHV0ZVBhdGhcIjtcbmltcG9ydCB7IFNvdXJjZUZpbGUgfSBmcm9tIFwiQC9jb3JlL1NvdXJjZUZpbGVcIjtcbmltcG9ydCB7IFVzZXJTb3VyY2VGaWxlcyB9IGZyb20gXCJAL2NvcmUvVXNlclNvdXJjZUZpbGVzXCI7XG5pbXBvcnQgeyBUYXJnZXRGaWxlIH0gZnJvbSBcIkAvY29yZS9UYXJnZXRGaWxlXCI7XG5pbXBvcnQgeyBUYXJnZXRIZWxwZXIgfSBmcm9tIFwiQC9jb3JlL1RhcmdldEhlbHBlclwiO1xuaW1wb3J0IHsgTG9nZ2VyIH0gZnJvbSBcIkAvbG9nZ2VyXCI7XG5cbmNvbnN0IGxvZ2dlciA9IExvZ2dlci5jcmVhdGUoaW1wb3J0Lm1ldGEudXJsKTtcblxuY29uc3QgU0NPUEUgPSBTeW1ib2woXCJTQ09QRVwiKTtcbmNvbnN0IElNUEwgPSBTeW1ib2woXCJJTVBMXCIpO1xuXG5jb25zdCBfbGFuZ3VhZ2VFeHRlbnNpb25zID0ge1xuICBBU006IFsgXCIuYXNtXCIsIFwiLnNcIiBdLFxuICBDOiAgIFsgXCIuY1wiIF0sXG4gIENYWDogW1wiLmNwcFwiLCBcIi5jY1wiLCBcIi5jeHhcIiBdLFxufTtcblxuZnVuY3Rpb24gaXNTdXBwb3J0TGFuZ3VhZ2UobGFuZ3VhZ2U6IHN0cmluZykge1xuICByZXR1cm4gX2xhbmd1YWdlRXh0ZW5zaW9ucy5oYXNPd25Qcm9wZXJ0eShsYW5ndWFnZSk7XG59XG5cbmZ1bmN0aW9uIGdldEZpbGVMYW5ndWFnZShmaWxlbmFtZTogc3RyaW5nKSB7XG4gIGNvbnN0IGZpbGVuYW1lTG93ZXJDYXNlID0gZmlsZW5hbWUudG9Mb3dlckNhc2UoKTtcbiAgZm9yIChjb25zdCBbbGFuZ3VhZ2UsIGV4dGVuc2lvbnNdIG9mIE9iamVjdC5lbnRyaWVzKF9sYW5ndWFnZUV4dGVuc2lvbnMpKSB7XG4gICAgZm9yIChjb25zdCBpdGVyIG9mIGV4dGVuc2lvbnMpIHtcbiAgICAgIGlmIChmaWxlbmFtZUxvd2VyQ2FzZS5lbmRzV2l0aChpdGVyKSlcbiAgICAgICAgcmV0dXJuIGxhbmd1YWdlO1xuICAgIH1cbiAgfVxuICByZXR1cm4gXCJcIjtcbn1cblxuZnVuY3Rpb24gbWFrZUxhbmd1YWdlKHZhbHVlOiBzdHJpbmcpIHtcbiAgaWYgKGlzU3VwcG9ydExhbmd1YWdlKHZhbHVlKSlcbiAgICByZXR1cm4gdmFsdWU7XG4gIHRocm93IG5ldyBFcnJvcihgTGFuZ3VhZ2UgXCIke3ZhbHVlfVwiIGlzIG5vdCBzdXBwb3J0ZWRgKTtcbn1cblxuZnVuY3Rpb24gYWRkSW5jbHVkZUltcGwodGFyZ2V0OiBCYXNlVGFyZ2V0LCBzb3VyY2VEaXI6IEFic29sdXRlUGF0aCwgcHVibGljT25seTogYm9vbGVhbiwgaW5jbHVkZTogVGFyZ2V0SW5jbHVkZXMgfCBBYnNvbHV0ZVBhdGggfCBzdHJpbmcpOiB2b2lkIHtcbiAgaWYgKGluY2x1ZGUgaW5zdGFuY2VvZiBUYXJnZXRJbmNsdWRlcylcbiAgICB0YXJnZXQuYWRkSW5jbHVkZShwdWJsaWNPbmx5LCBpbmNsdWRlKTtcbiAgZWxzZSBpZiAodHlwZW9mIGluY2x1ZGUgPT09IFwic3RyaW5nXCIpXG4gICAgdGFyZ2V0LmFkZEluY2x1ZGUocHVibGljT25seSwgQWJzb2x1dGVQYXRoLmNyZWF0ZShzb3VyY2VEaXIucmVzb2x2ZShpbmNsdWRlKSkpO1xuICBlbHNlIGlmIChpbmNsdWRlIGluc3RhbmNlb2YgQWJzb2x1dGVQYXRoKVxuICAgIHRhcmdldC5hZGRJbmNsdWRlKHB1YmxpY09ubHksIEFic29sdXRlUGF0aC5jcmVhdGUoaW5jbHVkZSkpO1xuICBlbHNlXG4gICAgdGhyb3cgbmV3IEVycm9yKGBOb3Qgc3VwcG9ydCBpbnN0YW5jZSAke2luY2x1ZGV9YCk7XG59XG5cbmZ1bmN0aW9uIGFkZEluY2x1ZGVzSW1wbCh0YXJnZXQ6IEJhc2VUYXJnZXQsIHNjb3BlOiBTeXN0ZW1TY29wZSwgcHVibGljT25seTogYm9vbGVhbiwgLi4uaW5jbHVkZXM6IEFycmF5PFRhcmdldEluY2x1ZGVzIHwgQWJzb2x1dGVQYXRoIHwgc3RyaW5nPik6IHZvaWQge1xuICBjb25zdCBzb3VyY2VEaXIgPSBzY29wZS5TT1VSQ0VfRElSO1xuICBmb3IgKGNvbnN0IGl0ZXIgb2YgaW5jbHVkZXMuZmxhdCgpKVxuICAgIGFkZEluY2x1ZGVJbXBsKHRhcmdldCwgc291cmNlRGlyLCBwdWJsaWNPbmx5LCBpdGVyKTtcbn1cblxuZnVuY3Rpb24gZW5zdXJlQ21kVmFsdWUodmFsdWU6IGFueSk6IHN0cmluZyB8IEFic29sdXRlUGF0aCB8IFRhcmdldEZpbGUge1xuICBpZiAodHlwZW9mIHZhbHVlID09PSBcInN0cmluZ1wiKVxuICAgIHJldHVybiB2YWx1ZTtcbiAgZWxzZSBpZiAodmFsdWUgaW5zdGFuY2VvZiBUYXJnZXRGaWxlKVxuICAgIHJldHVybiB2YWx1ZTtcbiAgZWxzZSBpZiAodmFsdWUgaW5zdGFuY2VvZiBBYnNvbHV0ZVBhdGgpXG4gICAgcmV0dXJuIHZhbHVlO1xuICBlbHNlXG4gICAgdGhyb3cgbmV3IFR5cGVFcnJvcihgV3JvbmcgdHlwZSAke3ZhbHVlfSBmb3IgY29tbWFuZGApO1xufVxuXG5leHBvcnQgY2xhc3MgVXNlclRhcmdldFN0cnVjdCBleHRlbmRzIEludGVyZmFjZVRhcmdldCB7XG4gIFtJTVBMXTogQmFzZVRhcmdldDtcbiAgW1NDT1BFXTogU3lzdGVtU2NvcGU7XG5cbiAgcHJpdmF0ZSBjb25zdHJ1Y3RvcihpbXBsOiBCYXNlVGFyZ2V0LCBzY29wZTogU3lzdGVtU2NvcGUpIHtcbiAgICBzdXBlcigpO1xuICAgIHRoaXNbSU1QTF0gPSBpbXBsO1xuICAgIHRoaXNbU0NPUEVdID0gc2NvcGU7XG5cbiAgICB0aGlzW0lNUExdLnNldFBvc2l0aW9uSW5kZXBlbmRlbnRDb2RlKHRoaXNbU0NPUEVdLlBPU0lUSU9OX0lOREVQRU5ERU5UX0NPREUpO1xuXG4gICAgYWRkSW5jbHVkZXNJbXBsKHRoaXNbSU1QTF0sIHRoaXNbU0NPUEVdLCBmYWxzZSwgLi4udGhpc1tTQ09QRV0uSU5DTFVERVMpO1xuICB9XG5cbiAgcHVibGljIHN0YXRpYyBjcmVhdGUoaW1wbDogQmFzZVRhcmdldCwgc2NvcGU6IFN5c3RlbVNjb3BlLCAuLi5zb3VyY2VzOiBhbnlbXSkge1xuICAgIGNvbnN0IHRhcmdldCA9IE9iamVjdC5zZWFsKG5ldyBVc2VyVGFyZ2V0U3RydWN0KGltcGwsIHNjb3BlKSk7XG4gICAgdGFyZ2V0LmFkZFNvdXJjZXMoLi4uc291cmNlcyk7XG4gICAgcmV0dXJuIHRhcmdldDtcbiAgfVxuXG4gIHB1YmxpYyBnZXQgdGFyZ2V0TmFtZSgpIHtcbiAgICByZXR1cm4gdGhpc1tJTVBMXS50YXJnZXROYW1lO1xuICB9XG5cbiAgcHVibGljIGdldCB0YXJnZXRGaWxlKCkge1xuICAgIHJldHVybiB0aGlzW0lNUExdLnRhcmdldEZpbGU7XG4gIH1cblxuICBwdWJsaWMgZ2V0IGluY2x1ZGVzKCkge1xuICAgIHJldHVybiB0aGlzW0lNUExdLmluY2x1ZGVzO1xuICB9XG5cbiAgcHVibGljIGdldCBvYmplY3RzKCkge1xuICAgIHJldHVybiB0aGlzW0lNUExdLm9iamVjdHM7XG4gIH1cbiAgXG4gIHB1YmxpYyBzZXRQcmVmaXgodmFsdWU6IGFueSk6IHZvaWQge1xuICAgIHRoaXNbSU1QTF0uc2V0UHJlZml4KGVuc3VyZVN0cmluZyh2YWx1ZSkpO1xuICB9XG5cbiAgcHVibGljIHNldFN1ZmZpeCh2YWx1ZTogYW55KTogdm9pZCB7XG4gICAgdGhpc1tJTVBMXS5zZXRTdWZmaXgoZW5zdXJlU3RyaW5nKHZhbHVlKSk7XG4gIH1cblxuICBwdWJsaWMgc2V0T3V0cHV0TmFtZSh2YWx1ZTogYW55KTogdm9pZCB7XG4gICAgdGhpc1tJTVBMXS5zZXRPdXRwdXROYW1lKGVuc3VyZVN0cmluZyh2YWx1ZSkpO1xuICB9XG5cbiAgcHVibGljIGFkZFNvdXJjZXMoLi4uc291cmNlczogQXJyYXk8VGFyZ2V0T2JqZWN0cyB8IFNvdXJjZUZpbGUgfCBBYnNvbHV0ZVBhdGggfCBzdHJpbmc+KTogdm9pZCB7XG4gICAgY29uc3Qgc2NvcGUgPSB0aGlzW1NDT1BFXTtcbiAgICBmb3IgKGNvbnN0IGl0ZXIgb2Ygc291cmNlcy5mbGF0KCkpIHtcbiAgICAgIGlmICh0eXBlb2YgaXRlciA9PT0gXCJzdHJpbmdcIiB8fCBpdGVyIGluc3RhbmNlb2YgQWJzb2x1dGVQYXRoKSB7XG4gICAgICAgIGNvbnN0IGZpbGVuYW1lID0gc2NvcGUuU09VUkNFX0RJUi5yZXNvbHZlKGl0ZXIpO1xuICAgICAgICBjb25zdCBsYW5ndWFnZSA9IGdldEZpbGVMYW5ndWFnZShmaWxlbmFtZS50b1BhdGgoKSk7XG4gICAgICAgIGxldCBjb21waWxlclBhdGggPSBcIlwiO1xuICAgICAgICBjb25zdCBjb21waWxlckZsYWdzID0gW107XG5cbiAgICAgICAgaWYgKGxhbmd1YWdlKSB7XG4gICAgICAgICAgY29tcGlsZXJQYXRoID0gKHNjb3BlIGFzIGFueSlbbGFuZ3VhZ2UgKyBcIl9DT01QSUxFUlwiXTtcbiAgICAgICAgICBjb25zdCBDT01QSUxFUl9GTEFHUzEgPSAoc2NvcGUgYXMgYW55KVtgJHtsYW5ndWFnZX1fRkxBR1NgXVxuICAgICAgICAgIGlmIChDT01QSUxFUl9GTEFHUzEpIHtcbiAgICAgICAgICAgIGNvbXBpbGVyRmxhZ3MucHVzaCguLi5DT01QSUxFUl9GTEFHUzEpO1xuICAgICAgICAgIH1cblxuICAgICAgICAgIGNvbnN0IENPTVBJTEVSX0ZMQUdTMiA9IChzY29wZSBhcyBhbnkpW2Ake2xhbmd1YWdlfV9GTEFHU18ke3Njb3BlLkJVSUxEX1RZUEUudG9VcHBlckNhc2UoKX1gXVxuICAgICAgICAgIGlmIChDT01QSUxFUl9GTEFHUzIpIHtcbiAgICAgICAgICAgIGNvbXBpbGVyRmxhZ3MucHVzaCguLi5DT01QSUxFUl9GTEFHUzIpO1xuICAgICAgICAgIH1cblxuICAgICAgICAgIGlmICghdGhpc1tJTVBMXS5sYW5ndWFnZSB8fCAodGhpc1tJTVBMXS5sYW5ndWFnZSA9PT0gXCJDXCIgJiYgbGFuZ3VhZ2UgPT09IFwiQ1hYXCIpKSB7XG4gICAgICAgICAgICB0aGlzW0lNUExdLmxhbmd1YWdlID0gbGFuZ3VhZ2U7XG4gICAgICAgICAgICB0aGlzW0lNUExdLmNvbXBpbGVyUGF0aCA9IGNvbXBpbGVyUGF0aDtcbiAgICAgICAgICAgIHRoaXNbSU1QTF0uY29tcGlsZXJGbGFncyA9IFsgLi4uY29tcGlsZXJGbGFncyBdO1xuICAgICAgICAgIH1cbiAgICAgICAgfVxuXG4gICAgICAgIGNvbnN0IHNvdXJjZSA9IFNvdXJjZUZpbGUuY3JlYXRlKGZpbGVuYW1lLCBzY29wZS5TT1VSQ0VfRElSLCBsYW5ndWFnZSwgY29tcGlsZXJQYXRoLCBjb21waWxlckZsYWdzKTtcbiAgICAgICAgdGhpc1tJTVBMXS5hZGRTb3VyY2Uoc291cmNlKTtcbiAgICAgIH1cbiAgICAgIGVsc2UgaWYgKGl0ZXIgaW5zdGFuY2VvZiBUYXJnZXRPYmplY3RzKVxuICAgICAgICB0aGlzW0lNUExdLmFkZFNvdXJjZShpdGVyKTtcbiAgICAgIGVsc2UgaWYgKGl0ZXIgaW5zdGFuY2VvZiBTb3VyY2VGaWxlKVxuICAgICAgICB0aGlzW0lNUExdLmFkZFNvdXJjZShpdGVyKTtcbiAgICAgIGVsc2VcbiAgICAgICAgdGhyb3cgbmV3IEVycm9yKGBOb3Qgc3VwcG9ydCBpbnN0YW5jZSAke2l0ZXJ9YCk7XG4gICAgfVxuICB9XG4gIFxuICBwdWJsaWMgZ2V0U291cmNlRmlsZXMoLi4uc291cmNlczogYW55W10pOiBVc2VyU291cmNlRmlsZXMge1xuICAgIGNvbnN0IHJlc3VsdCA9IFtdO1xuICAgIGNvbnN0IHNjb3BlID0gdGhpc1tTQ09QRV07XG4gICAgY29uc3Qgc291cmNlRmlsZXMgPSB0aGlzW0lNUExdLmdldFNvdXJjZUZpbGVzKCk7XG4gICAgZm9yIChjb25zdCBpdCBvZiBzb3VyY2VzLmZsYXQoKSkge1xuICAgICAgY29uc3QgZmlsZW5hbWUgPSBzY29wZS5TT1VSQ0VfRElSLnJlc29sdmUoaXQpLnRvUGF0aCgpO1xuICAgICAgY29uc3Qgc3JjID0gc291cmNlRmlsZXMuZmluZChpID0+IGkuRklMRS50b1BhdGgoKSA9PT0gZmlsZW5hbWUpO1xuICAgICAgaWYgKCFzcmMpXG4gICAgICAgIHRocm93IG5ldyBFcnJvcihgQ2Fubm90IGZpbmQgXCIke2l0fVwiYCk7XG4gICAgICByZXN1bHQucHVzaChzcmMpO1xuICAgIH1cbiAgICBcbiAgICByZXR1cm4gVXNlclNvdXJjZUZpbGVzLmNyZWF0ZSh0aGlzW0lNUExdLCByZXN1bHQubGVuZ3RoID8gcmVzdWx0IDogc291cmNlRmlsZXMpO1xuICB9XG5cbiAgcHVibGljIGFkZEluY2x1ZGVzKC4uLmluY2x1ZGVzOiBBcnJheTxUYXJnZXRJbmNsdWRlcyB8IEFic29sdXRlUGF0aCB8IHN0cmluZz4pOiB2b2lkIHtcbiAgICBhZGRJbmNsdWRlc0ltcGwodGhpc1tJTVBMXSwgdGhpc1tTQ09QRV0sIGZhbHNlLCAuLi5pbmNsdWRlcyk7XG4gIH1cblxuICBwdWJsaWMgYWRkTGlicmFyaWVzKC4uLmxpYnJhcmllczogYW55W10pOiB2b2lkIHtcbiAgICB0aGlzW0lNUExdLmFkZExpYnJhcmllcyguLi5saWJyYXJpZXMpO1xuICB9XG5cbiAgcHVibGljIGFkZENvbXBpbGVPcHRpb25zKC4uLm9wdGlvbnM6IGFueVtdKTogdm9pZCB7XG4gICAgdGhpc1tJTVBMXS5hZGRDb21waWxlT3B0aW9ucyguLi5vcHRpb25zKTtcbiAgfVxuXG4gIHB1YmxpYyBhZGRMaW5rT3B0aW9ucyguLi5vcHRpb25zOiBhbnlbXSk6IHZvaWQge1xuICAgIHRoaXNbSU1QTF0uYWRkTGlua09wdGlvbnMoLi4ub3B0aW9ucyk7XG4gIH1cblxuICBwdWJsaWMgYWRkRGVmaW5pdGlvbnMoLi4uZGVmaW5pdGlvbnM6IGFueVtdKTogdm9pZCB7XG4gICAgZm9yIChjb25zdCBpdGVyIG9mIFRhcmdldEhlbHBlci5ub3JtYWxpemVEZWZpbml0aW9ucyhkZWZpbml0aW9ucy5mbGF0KCkpKVxuICAgICAgdGhpc1tJTVBMXS5hZGREZWZpbml0aW9uKGZhbHNlLCBpdGVyKTtcbiAgfVxuXG4gIHB1YmxpYyBhZGRQcmVCdWlsZChjb21tYW5kOiBhbnksIGFyZ3M6IGFueVtdKTogdm9pZCB7XG4gICAgdGhpc1tJTVBMXS5hZGRQcmVCdWlsZChlbnN1cmVDbWRWYWx1ZShjb21tYW5kKSwgYXJncy5tYXAoaSA9PiBlbnN1cmVDbWRWYWx1ZShpKSkpO1xuICB9XG5cbiAgcHVibGljIGFkZFBvc3RCdWlsZChjb21tYW5kOiBhbnksIGFyZ3M6IGFueVtdKTogdm9pZCB7XG4gICAgdGhpc1tJTVBMXS5hZGRQb3N0QnVpbGQoZW5zdXJlQ21kVmFsdWUoY29tbWFuZCksIGFyZ3MubWFwKGkgPT4gZW5zdXJlQ21kVmFsdWUoaSkpKTtcbiAgfVxuXG4gIHB1YmxpYyBzZXRQb3NpdGlvbkluZGVwZW5kZW50Q29kZSh2YWx1ZTogYm9vbGVhbik6IHZvaWQge1xuICAgIHRoaXNbSU1QTF0uc2V0UG9zaXRpb25JbmRlcGVuZGVudENvZGUodmFsdWUpO1xuICB9XG5cbiAgcHVibGljIGFkZFB1YmxpY0luY2x1ZGVzKC4uLmluY2x1ZGVzOiBBcnJheTxUYXJnZXRJbmNsdWRlcyB8IEFic29sdXRlUGF0aCB8IHN0cmluZz4pOiB2b2lkIHtcbiAgICBhZGRJbmNsdWRlc0ltcGwodGhpc1tJTVBMXSwgdGhpc1tTQ09QRV0sIHRydWUsIC4uLmluY2x1ZGVzKTtcbiAgfVxuXG4gIHB1YmxpYyBhZGRQdWJsaWNEZWZpbml0aW9ucyguLi5kZWZpbml0aW9uczogYW55KTogdm9pZCB7XG4gICAgZm9yIChjb25zdCBpdGVyIG9mIFRhcmdldEhlbHBlci5ub3JtYWxpemVEZWZpbml0aW9ucyhkZWZpbml0aW9ucy5mbGF0KCkpKVxuICAgICAgdGhpc1tJTVBMXS5hZGREZWZpbml0aW9uKHRydWUsIGl0ZXIpO1xuICB9XG5cbiAgcHVibGljIGFkZFB1YmxpY0xpYnJhcmllcyguLi5saWJyYXJpZXM6IGFueVtdKTogdm9pZCB7XG4gICAgdGhpc1tJTVBMXS5hZGRQdWJsaWNMaWJyYXJpZXMoLi4ubGlicmFyaWVzKTtcbiAgfVxuXG4gIHB1YmxpYyBhZGRQdWJsaWNDb21waWxlT3B0aW9ucyguLi5vcHRpb25zOiBhbnlbXSk6IHZvaWQge1xuICAgIHRoaXNbSU1QTF0uYWRkUHVibGljQ29tcGlsZU9wdGlvbnMoLi4ub3B0aW9ucyk7XG4gIH1cblxuICBwdWJsaWMgYWRkUHVibGljTGlua09wdGlvbnMoLi4ub3B0aW9uczogYW55W10pOiB2b2lkIHtcbiAgICB0aGlzW0lNUExdLmFkZFB1YmxpY0xpbmtPcHRpb25zKC4uLm9wdGlvbnMpO1xuICB9XG59O1xuIiwiLypcbiAqIE1JVCBMaWNlbnNlXG4gKlxuICogQ29weXJpZ2h0IChjKSAyMDI1ICBZdXJpaSBZYWt1YmluICh5dXJpaS55YWt1YmluQGdtYWlsLmNvbSlcbiAqXG4gKiBQZXJtaXNzaW9uIGlzIGdyYW50ZWQgdG8gdXNlLCBjb3B5LCBtb2RpZnksIGFuZCBkaXN0cmlidXRlIHRoaXMgc29mdHdhcmVcbiAqIHVuZGVyIHRoZSBNSVQgTGljZW5zZS4gU2VlIExJQ0VOU0UgZmlsZSBmb3IgZGV0YWlscy5cbiAqL1xuXG5pbXBvcnQgcGF0aCBmcm9tIFwibm9kZTpwYXRoXCI7XG5cbmV4cG9ydCBmdW5jdGlvbiBmaWxlbmFtZVRvUHJhZ21hT25jZU1hY3JvKGZpbGVwYXRoOiBzdHJpbmcsIGRlZXA6IG51bWJlcikge1xuICBpZiAodHlwZW9mIGRlZXAgPT09ICd1bmRlZmluZWQnKVxuICAgIGRlZXAgPSAzO1xuXG4gIGxldCBjb21wb25lbnRzID0gcGF0aC5ub3JtYWxpemUoZmlsZXBhdGgpLnNwbGl0KHBhdGguc2VwKTtcbiAgaWYgKGNvbXBvbmVudHMubGVuZ3RoID4gZGVlcClcbiAgICBjb21wb25lbnRzID0gY29tcG9uZW50cy5zbGljZShjb21wb25lbnRzLmxlbmd0aCAtIGRlZXApO1xuXG4gIHJldHVybiBcIl9cIiArIGNvbXBvbmVudHMuam9pbignXycpLnJlcGxhY2UoL1stIC46JX5dL2csICdfJykudG9VcHBlckNhc2UoKTtcbn1cblxuZXhwb3J0IGZ1bmN0aW9uIGxpbmVUb1NpbmdsQ29tbWVudChsaW5lOiBzdHJpbmcpIHtcbiAgcmV0dXJuIFwiLy9cIiArIGxpbmU7XG59XG5cbmV4cG9ydCBmdW5jdGlvbiBsaW5lVG9NdWx0aXBsZUNvbW1lbnQobGluZTogc3RyaW5nKSB7XG4gIHJldHVybiBgLyogJHtsaW5lfSAqL2A7XG59XG5cbmV4cG9ydCBmdW5jdGlvbiBnZW5lcmF0ZWRTY3JpcHROYW1lQ29tbWVudChmaWxlbmFtZTogc3RyaW5nKSB7XG4gIHJldHVybiBsaW5lVG9NdWx0aXBsZUNvbW1lbnQoXCJHZW5lcmF0ZWQgZnJvbSBcIiArIHBhdGguYmFzZW5hbWUoZmlsZW5hbWUpKTtcbn1cbiIsIi8qXG4gKiBNSVQgTGljZW5zZVxuICpcbiAqIENvcHlyaWdodCAoYykgMjAyNSAgWXVyaWkgWWFrdWJpbiAoeXVyaWkueWFrdWJpbkBnbWFpbC5jb20pXG4gKlxuICogUGVybWlzc2lvbiBpcyBncmFudGVkIHRvIHVzZSwgY29weSwgbW9kaWZ5LCBhbmQgZGlzdHJpYnV0ZSB0aGlzIHNvZnR3YXJlXG4gKiB1bmRlciB0aGUgTUlUIExpY2Vuc2UuIFNlZSBMSUNFTlNFIGZpbGUgZm9yIGRldGFpbHMuXG4gKi9cblxuZXhwb3J0IGludGVyZmFjZSBJTG9nZ2VyIHtcbiAgZGVidWcobWVzc2FnZT86IGFueSwgLi4ucGFyYW1zOiBhbnlbXSk6IHZvaWQ7XG4gIGluZm8obWVzc2FnZT86IGFueSwgLi4ucGFyYW1zOiBhbnlbXSk6IHZvaWQ7XG4gIG5vdGljZShtZXNzYWdlPzogYW55LCAuLi5wYXJhbXM6IGFueVtdKTogdm9pZDtcbiAgd2FybihtZXNzYWdlPzogYW55LCAuLi5wYXJhbXM6IGFueVtdKTogdm9pZDtcbiAgZXJyb3IobWVzc2FnZT86IGFueSwgLi4ucGFyYW1zOiBhbnlbXSk6IHZvaWQ7XG4gIGZhdGFsKG1lc3NhZ2U/OiBhbnksIC4uLnBhcmFtczogYW55W10pOiB2b2lkO1xufTtcblxudHlwZSBMb2dnZXJIYW5kbGVyID0gKG1lc3NhZ2U/OiBhbnksIC4uLnBhcmFtczogYW55W10pID0+IHZvaWQ7O1xuXG5pbnRlcmZhY2UgRW50cnlMb2dnZXIge1xuICB0YWdOYW1lOiBzdHJpbmc7XG4gIGZpbHRlcjogc3RyaW5nO1xuICBsb2dnZXI6IElMb2dnZXI7XG59O1xuXG5jb25zdCBTRVBBUkFUT1IgPSBcIiBcIjtcbmNvbnN0IE1FU1NBR0VfTUFYID0gMjQwO1xuXG5mdW5jdGlvbiB0b01lc3NhZ2VTdHJpbmcobzogYW55KSB7XG4gIHJldHVybiAodHlwZW9mIG8gPT09IFwic3RyaW5nXCIpID8gbyA6IEpTT04uc3RyaW5naWZ5KG8pO1xufVxuXG5mdW5jdGlvbiogbWVzc2FnZUdlbmVyYXRvcihtZXNzYWdlczogc3RyaW5nW10sIG1heExlbmd0aDogbnVtYmVyKSB7XG4gIGxldCBsZW5ndGggPSAwO1xuICBjb25zdCBtc2dMaXN0OiBzdHJpbmdbXSA9IFtdO1xuXG4gIGZvciAoOzspIHtcbiAgICBjb25zdCBpdGVyID0gbWVzc2FnZXMuc2hpZnQoKTtcbiAgICBpZiAoIWl0ZXIpXG4gICAgICBicmVhaztcblxuICAgIGlmIChtc2dMaXN0Lmxlbmd0aClcbiAgICAgIGxlbmd0aCArPSBTRVBBUkFUT1IubGVuZ3RoO1xuXG4gICAgbXNnTGlzdC5wdXNoKGl0ZXIpO1xuICAgIGxlbmd0aCArPSBpdGVyLmxlbmd0aDtcblxuICAgIHdoaWxlIChsZW5ndGggPiBtYXhMZW5ndGgpIHtcbiAgICAgIGNvbnN0IG1zZyA9IG1zZ0xpc3Quam9pbihTRVBBUkFUT1IpO1xuICAgICAgY29uc3QgbmV4dE1zZyA9IG1zZy5zdWJzdHJpbmcobWF4TGVuZ3RoKTtcbiAgICAgIG1zZ0xpc3QubGVuZ3RoID0gMDtcbiAgICAgIG1zZ0xpc3QucHVzaChuZXh0TXNnKTtcbiAgICAgIGxlbmd0aCA9IG5leHRNc2cubGVuZ3RoO1xuICAgICAgeWllbGQgbXNnLnN1YnN0cmluZygwLCBtYXhMZW5ndGgpO1xuICAgIH1cbiAgfVxuXG4gIHlpZWxkIG1zZ0xpc3Quam9pbihTRVBBUkFUT1IpO1xufVxuXG5mdW5jdGlvbiBtYWtlTG9nTWV0aG9kKHdpdGhQcmVmaXg6IGJvb2xlYW4sIHR5cGU6IHN0cmluZywgdGFnTmFtZTogc3RyaW5nLCB0YXJnZXQ6IGFueSwgaGFuZGxlcjogTG9nZ2VySGFuZGxlcikge1xuICByZXR1cm4gKC4uLmFyZ3M6IGFueVtdKSA9PiB7XG4gICAgY29uc3Qgbm93ID0gbmV3IERhdGUoKTtcbiAgICBjb25zdCBtZXNzYWdlcyA9IGFyZ3MubWFwKGkgPT4gdG9NZXNzYWdlU3RyaW5nKGkpKVxuXG4gICAgaWYgKCF3aXRoUHJlZml4KSB7XG4gICAgICBoYW5kbGVyLmNhbGwodGFyZ2V0LCBtZXNzYWdlcy5qb2luKFNFUEFSQVRPUikpO1xuICAgICAgcmV0dXJuO1xuICAgIH1cblxuICAgIGNvbnN0IHByZWZpeCA9IFsgbm93LnRvSVNPU3RyaW5nKCksIHR5cGUsIHRhZ05hbWUgXS5qb2luKFNFUEFSQVRPUik7XG4gICAgZm9yIChjb25zdCBpdGVyIG9mIG1lc3NhZ2VHZW5lcmF0b3IobWVzc2FnZXMsIE1FU1NBR0VfTUFYIC0gcHJlZml4Lmxlbmd0aCAtIFNFUEFSQVRPUi5sZW5ndGgpKSB7XG4gICAgICBoYW5kbGVyLmNhbGwodGFyZ2V0LCBbcHJlZml4LCBpdGVyXS5qb2luKFNFUEFSQVRPUikpO1xuICAgIH1cbiAgfTtcbn1cblxubGV0IF9kZWZhdWx0UGF0dGVybiA9IFwiXCI7XG5jb25zdCBfbG9nZ2VyTWFwID0gbmV3IE1hcDxzdHJpbmcsIEVudHJ5TG9nZ2VyPigpO1xuXG5jb25zdCBzdHViID0gKCkgPT4ge307XG5cbmZ1bmN0aW9uIGluaXRMb2dnZXIobG9nZ2VyOiBJTG9nZ2VyLCB0YWdOYW1lOiBzdHJpbmcsIGZpbHRlcjogc3RyaW5nKSB7XG4gIGxvZ2dlci5kZWJ1ZyA9IHN0dWI7XG4gIGxvZ2dlci5pbmZvID0gc3R1YjtcbiAgbG9nZ2VyLm5vdGljZSA9IHN0dWI7XG4gIGxvZ2dlci53YXJuID0gc3R1YjtcbiAgbG9nZ2VyLmVycm9yID0gc3R1YjtcbiAgbG9nZ2VyLmZhdGFsID0gc3R1YjtcblxuICBsZXQgbGV2ZWwgPSAwO1xuICBjb25zdCBmbGFnczogYW55ID0ge307XG4gIGZvciAoY29uc3QgaXRlciBvZiBmaWx0ZXIuc3BsaXQoXCIsXCIpKSB7XG4gICAgaWYgKGl0ZXIgPT09IFwiKlwiKSB7XG4gICAgICBsZXZlbCA9IDU7XG4gICAgICBicmVhaztcbiAgICB9XG4gICAgaWYgKC9eXFxkKyQvLnRlc3QoaXRlcikpXG4gICAgICBsZXZlbCA9IE1hdGgubWF4KGxldmVsLCBwYXJzZUludChpdGVyKSk7XG4gICAgZWxzZVxuICAgICAgZmxhZ3NbaXRlcl0gPSB0cnVlO1xuICB9XG5cbiAgbG9nZ2VyLmZhdGFsID0gbWFrZUxvZ01ldGhvZChsZXZlbCA+IDIsIFwiRlwiLCB0YWdOYW1lLCBjb25zb2xlLCBjb25zb2xlLmVycm9yKTtcblxuICBpZiAobGV2ZWwgPiAxIHx8IGZsYWdzLmVycm9yKVxuICAgIGxvZ2dlci5lcnJvciA9IG1ha2VMb2dNZXRob2QobGV2ZWwgPiAyLCBcIkVcIiwgdGFnTmFtZSwgY29uc29sZSwgY29uc29sZS5lcnJvcik7XG5cbiAgaWYgKGxldmVsID4gMiB8fCBmbGFncy53YXJuKVxuICAgIGxvZ2dlci53YXJuID0gbWFrZUxvZ01ldGhvZChsZXZlbCA+IDIsIFwiV1wiLCB0YWdOYW1lLCBjb25zb2xlLCBjb25zb2xlLndhcm4pO1xuXG4gIGxvZ2dlci5ub3RpY2UgPSBtYWtlTG9nTWV0aG9kKGxldmVsID4gMiwgXCJOXCIsIHRhZ05hbWUsIGNvbnNvbGUsIGNvbnNvbGUubG9nKTtcblxuICBpZiAobGV2ZWwgPiAzIHx8IGZsYWdzLmluZm8pXG4gICAgbG9nZ2VyLmluZm8gPSBtYWtlTG9nTWV0aG9kKGxldmVsID4gMiwgXCJJXCIsIHRhZ05hbWUsIGNvbnNvbGUsIGNvbnNvbGUuaW5mbyk7XG5cbiAgaWYgKGxldmVsID4gNCB8fCBmbGFncy5kZWJ1ZylcbiAgICBsb2dnZXIuZGVidWcgPSBtYWtlTG9nTWV0aG9kKGxldmVsID4gMiwgXCJEXCIsIHRhZ05hbWUsIGNvbnNvbGUsIGNvbnNvbGUuZGVidWcpO1xufVxuXG5mdW5jdGlvbiBjcmVhdGVFbnRyeSh0YWdOYW1lOiBzdHJpbmcsIGZpbHRlcjogc3RyaW5nKSB7XG4gIGNvbnN0IGVudHJ5ID0geyB0YWdOYW1lLCBmaWx0ZXIsIGxvZ2dlcjoge30gYXMgSUxvZ2dlciB9O1xuICBpbml0TG9nZ2VyKGVudHJ5LmxvZ2dlciwgdGFnTmFtZSwgZmlsdGVyKTtcbiAgcmV0dXJuIGVudHJ5O1xufVxuXG5mdW5jdGlvbiBlbnRyeVNldEZpbHRlcihlbnRyeTogRW50cnlMb2dnZXIsIGZpbHRlcjogc3RyaW5nKSB7XG4gIGlmIChlbnRyeS5maWx0ZXIgIT09IGZpbHRlcikge1xuICAgIGluaXRMb2dnZXIoZW50cnkubG9nZ2VyLCBlbnRyeS50YWdOYW1lLCBmaWx0ZXIpO1xuICAgIGVudHJ5LmZpbHRlciA9IGZpbHRlcjtcbiAgfVxufVxuXG5mdW5jdGlvbiBhbGxTZXRGaWx0ZXIoZmlsdGVyOiBzdHJpbmcpIHtcbiAgX2RlZmF1bHRQYXR0ZXJuID0gZmlsdGVyO1xuICBmb3IgKGNvbnN0IGVudHJ5IG9mIF9sb2dnZXJNYXAudmFsdWVzKCkpXG4gICAgZW50cnlTZXRGaWx0ZXIoZW50cnksIGZpbHRlcik7XG59XG5cbmV4cG9ydCBuYW1lc3BhY2UgTG9nZ2VyIHtcblxuZXhwb3J0IGZ1bmN0aW9uIGNyZWF0ZSh1cmw6IHN0cmluZyk6IElMb2dnZXIge1xuICBjb25zdCB0YWdOYW1lID0gdXJsLnN0YXJ0c1dpdGgoSE9TVF9TT1VSQ0VfVVJMICsgXCIvXCIpID8gdXJsLnN1YnN0cmluZyhIT1NUX1NPVVJDRV9VUkwubGVuZ3RoICsgMSkgOiB1cmw7XG4gIGlmICghdGFnTmFtZSB8fCB0YWdOYW1lID09PSBcIipcIilcbiAgICB0aHJvdyBuZXcgRXJyb3IoYExvZ2dlciAke3VybH0gbm90IGFsbG93ZWRgKTtcblxuICBsZXQgZW50cnkgPSBfbG9nZ2VyTWFwLmdldCh0YWdOYW1lKTtcbiAgaWYgKCFlbnRyeSkge1xuICAgIGVudHJ5ID0gY3JlYXRlRW50cnkodGFnTmFtZSwgX2RlZmF1bHRQYXR0ZXJuKTtcbiAgICBfbG9nZ2VyTWFwLnNldCh0YWdOYW1lLCBlbnRyeSk7XG4gIH1cblxuICByZXR1cm4gZW50cnkubG9nZ2VyO1xufVxuXG5leHBvcnQgZnVuY3Rpb24gZW5hYmxlKGZpbHRlcjogc3RyaW5nKSB7XG4gIGlmIChmaWx0ZXIgPT09IFwiKlwiKSB7XG4gICAgYWxsU2V0RmlsdGVyKFwiKlwiKTtcbiAgICByZXR1cm47XG4gIH1cblxuICBjb25zdCBwYWlyID0gZmlsdGVyLnNwbGl0KFwiOlwiKTtcbiAgaWYgKHBhaXIubGVuZ3RoIDwgMilcbiAgICByZXR1cm47XG5cbiAgaWYgKHBhaXJbMF0gPT09IFwiKlwiKSB7XG4gICAgYWxsU2V0RmlsdGVyKHBhaXJbMV0pO1xuICAgIHJldHVybjtcbiAgfVxuXG4gIGxldCBlbnRyeSA9IF9sb2dnZXJNYXAuZ2V0KHBhaXJbMF0pO1xuICBpZiAoIWVudHJ5KSB7XG4gICAgZW50cnkgPSBjcmVhdGVFbnRyeShwYWlyWzBdLCBwYWlyWzFdKTtcbiAgICBfbG9nZ2VyTWFwLnNldChmaWx0ZXIsIGVudHJ5KTtcbiAgfVxuICBlbHNlICB7XG4gICAgZW50cnlTZXRGaWx0ZXIoZW50cnksIHBhaXJbMV0pO1xuICB9XG59XG5cbn0gLy8gbmFtZXNwYWNlIExvZ2dlclxuXG5mb3IgKGNvbnN0IGl0ZXIgb2YgTE9HR0VSX0RFQlVHKSB7XG4gIExvZ2dlci5lbmFibGUoaXRlcik7XG59XG4iLCIvKlxuICogTUlUIExpY2Vuc2VcbiAqXG4gKiBDb3B5cmlnaHQgKGMpIDIwMjUgIFl1cmlpIFlha3ViaW4gKHl1cmlpLnlha3ViaW5AZ21haWwuY29tKVxuICpcbiAqIFBlcm1pc3Npb24gaXMgZ3JhbnRlZCB0byB1c2UsIGNvcHksIG1vZGlmeSwgYW5kIGRpc3RyaWJ1dGUgdGhpcyBzb2Z0d2FyZVxuICogdW5kZXIgdGhlIE1JVCBMaWNlbnNlLiBTZWUgTElDRU5TRSBmaWxlIGZvciBkZXRhaWxzLlxuICovXG5cbmltcG9ydCB7IEpTT05SUENfVkVSU0lPTiB9IGZyb20gXCJAL3NlcnZlci9UcmFuc3BvcnRcIjtcbmltcG9ydCB7IElSZXF1ZXN0U3luYyB9IGZyb20gXCJAL3NlcnZlci9UcmFuc3BvcnRcIjtcbmltcG9ydCB7IExvZ2dlciB9IGZyb20gXCJAL2xvZ2dlclwiO1xuXG5jb25zdCBsb2dnZXIgPSBMb2dnZXIuY3JlYXRlKGltcG9ydC5tZXRhLnVybCk7XG5cbmV4cG9ydCBjbGFzcyBKc29uUnBjUmVxdWVzdFN5bmMge1xuICBwcml2YXRlIF9yZXF1ZXN0OiBJUmVxdWVzdFN5bmM7XG4gIHByaXZhdGUgX2lkOiBudW1iZXI7XG5cbiAgcHVibGljIGNvbnN0cnVjdG9yKHJlcXVlc3RTeW5jOiBJUmVxdWVzdFN5bmMpIHtcbiAgICB0aGlzLl9yZXF1ZXN0ID0gcmVxdWVzdFN5bmM7XG4gICAgdGhpcy5faWQgPSAxO1xuICB9XG5cbiAgcHVibGljIHJlcXVlc3RTeW5jKG1ldGhvZDogc3RyaW5nLCBwYXJhbXM6IGFueSk6IGFueSB7XG4gICAgbG9nZ2VyLmRlYnVnKFwiSnNvblJwY1JlcXVlc3RTeW5jLnJlcXVlc3RTeW5jKFwiLCBtZXRob2QsIFwiLi4ucGFyYW1zKVwiKTtcbiAgICBjb25zdCBtZXNzYWdlID0ge1xuICAgICAganNvbnJwYzogSlNPTlJQQ19WRVJTSU9OLFxuICAgICAgbWV0aG9kLFxuICAgICAgcGFyYW1zLFxuICAgICAgaWQ6IHRoaXMuX2lkKyssXG4gICAgfTtcbiAgICBjb25zdCByZXNwb25zZSA9IHRoaXMuX3JlcXVlc3QucmVxdWVzdFN5bmMobWVzc2FnZSk7XG4gICAgaWYgKHJlc3BvbnNlLmVycm9yKVxuICAgICAgdGhyb3cgbmV3IEVycm9yKHJlc3BvbnNlLmVycm9yLm1lc3NhZ2UsIHsgY2F1c2U6IHJlc3BvbnNlLmVycm9yLmNvZGUgfSk7XG4gICAgcmV0dXJuIHJlc3BvbnNlLnJlc3VsdDtcbiAgfVxufTtcbiIsIi8qXG4gKiBNSVQgTGljZW5zZVxuICpcbiAqIENvcHlyaWdodCAoYykgMjAyNSAgWXVyaWkgWWFrdWJpbiAoeXVyaWkueWFrdWJpbkBnbWFpbC5jb20pXG4gKlxuICogUGVybWlzc2lvbiBpcyBncmFudGVkIHRvIHVzZSwgY29weSwgbW9kaWZ5LCBhbmQgZGlzdHJpYnV0ZSB0aGlzIHNvZnR3YXJlXG4gKiB1bmRlciB0aGUgTUlUIExpY2Vuc2UuIFNlZSBMSUNFTlNFIGZpbGUgZm9yIGRldGFpbHMuXG4gKi9cblxuaW1wb3J0IHsgSlNPTlJQQ19WRVJTSU9OLCBJTWVzc2FnZVNlbmRlciwgSnNvblJwY0RhdGEsIEpzb25ScGNSZXF1ZXN0SGFuZGxlciwgSUpzb25ScGNSZXF1ZXN0LCBJSnNvblJwY1Jlc3BvbnNlLCBKc29uUnBjQ2FsbGJhY2sgfSBmcm9tIFwiQC9zZXJ2ZXIvVHJhbnNwb3J0XCI7XG5pbXBvcnQgeyBMb2dnZXIgfSBmcm9tIFwiQC9sb2dnZXJcIjtcblxuY29uc3QgbG9nZ2VyID0gTG9nZ2VyLmNyZWF0ZShpbXBvcnQubWV0YS51cmwpO1xuXG5jbGFzcyBKc29uUnBjUmVxdWVzdCBpbXBsZW1lbnRzIElKc29uUnBjUmVxdWVzdCB7XG4gIHByaXZhdGUgX3BhcmFtczogYW55O1xuXG4gIGNvbnN0cnVjdG9yKHBhcmFtczogYW55KSB7XG4gICAgdGhpcy5fcGFyYW1zID0gcGFyYW1zO1xuICB9XG5cbiAgZ2V0IHBhcmFtcygpOiBhbnkge1xuICAgIHJldHVybiB0aGlzLl9wYXJhbXM7XG4gIH1cbn1cblxuY2xhc3MgSnNvblJwY1Jlc3BvbnNlIGltcGxlbWVudHMgSUpzb25ScGNSZXNwb25zZSB7XG4gIHByaXZhdGUgX3NlbmRlcjogSU1lc3NhZ2VTZW5kZXI7XG4gIHByaXZhdGUgX2lkOiBudW1iZXI7XG5cbiAgcHVibGljIGNvbnN0cnVjdG9yKHNlbmRlcjogSU1lc3NhZ2VTZW5kZXIsIGlkOiBudW1iZXIpIHtcbiAgICB0aGlzLl9zZW5kZXIgPSBzZW5kZXI7XG4gICAgdGhpcy5faWQgPSBpZDtcbiAgfVxuXG4gIHNlbmRSZXN1bHQocmVzdWx0OiBhbnkpOiB2b2lkIHtcbiAgICBjb25zdCBtZXNzYWdlOiBKc29uUnBjRGF0YSA9IHtcbiAgICAgIGpzb25ycGM6IEpTT05SUENfVkVSU0lPTixcbiAgICAgIHJlc3VsdDogKHJlc3VsdCAhPT0gdW5kZWZpbmVkKSA/IHJlc3VsdCA6IG51bGwsXG4gICAgICBpZDogdGhpcy5faWQsXG4gICAgfTtcbiAgICBsb2dnZXIuZGVidWcoXCI8LS1cIiwgSlNPTi5zdHJpbmdpZnkobWVzc2FnZSkpO1xuICAgIHRoaXMuX3NlbmRlci5zZW5kTWVzc2FnZShtZXNzYWdlKTtcbiAgfVxuXG4gIHNlbmRFcnJvcihjb2RlOiBudW1iZXIsIG1lc3NhZ2U6IHN0cmluZywgZGF0YT86IGFueSk6IHZvaWQge1xuICAgIGNvbnN0IGVycm9yOiBhbnkgPSB7IGNvZGUsIG1lc3NhZ2UgfTtcbiAgICBpZiAoZGF0YSAhPT0gdW5kZWZpbmVkKSB7XG4gICAgICBlcnJvci5kYXRhID0gZGF0YTtcbiAgICB9XG4gICAgY29uc3QgbXNnOiBKc29uUnBjRGF0YSA9IHtcbiAgICAgIGpzb25ycGM6IEpTT05SUENfVkVSU0lPTixcbiAgICAgIGVycm9yLFxuICAgICAgaWQ6IHRoaXMuX2lkLFxuICAgIH07XG4gICAgbG9nZ2VyLmRlYnVnKFwiPC0tXCIsIEpTT04uc3RyaW5naWZ5KG1zZykpO1xuICAgIHRoaXMuX3NlbmRlci5zZW5kTWVzc2FnZShtc2cpO1xuICB9XG59O1xuXG5leHBvcnQgY2xhc3MgSnNvblJwY1NlcnZlciB7XG4gIHByaXZhdGUgX3JlcXVlc3RIYW5kbGVycyA9IG5ldyBNYXA8c3RyaW5nLCBKc29uUnBjUmVxdWVzdEhhbmRsZXI+KCk7XG5cbiAgcHVibGljIGNvbnN0cnVjdG9yKCkge1xuICB9XG5cbiAgcHVibGljIHJlZ2lzdGVySGFuZGxlcihtZXRob2Q6IHN0cmluZywgaGFuZGxlcjogSnNvblJwY1JlcXVlc3RIYW5kbGVyKTogdm9pZCB7XG4gICAgdGhpcy5fcmVxdWVzdEhhbmRsZXJzLnNldChtZXRob2QsIGhhbmRsZXIpO1xuICB9XG5cbiAgcHVibGljIHJlZ2lzdGVyQ2FsbGJhY2sobWV0aG9kOiBzdHJpbmcsIGNhbGxiYWNrOiBKc29uUnBjQ2FsbGJhY2spOiB2b2lkIHtcbiAgICB0aGlzLl9yZXF1ZXN0SGFuZGxlcnMuc2V0KG1ldGhvZCwgYXN5bmMgKHJlcXVlc3QsIHJlc3BvbnNlKSA9PiB7XG4gICAgICBsZXQgcmVzdWx0OiBhbnkgPSBjYWxsYmFjayhyZXF1ZXN0LnBhcmFtcyk7XG4gICAgICBpZiAocmVzdWx0IGluc3RhbmNlb2YgUHJvbWlzZSlcbiAgICAgICAgcmVzdWx0ID0gYXdhaXQgcmVzdWx0O1xuICAgICAgaWYgKHJlc3VsdCAmJiB0eXBlb2YgcmVzdWx0ID09PSBcIm9iamVjdFwiICYmIHR5cGVvZiByZXN1bHQudG9KU09OID09PSBcImZ1bmN0aW9uXCIpXG4gICAgICAgIHJlc3VsdCA9IHJlc3VsdC50b0pTT04oKTtcbiAgICAgIHJlc3BvbnNlLnNlbmRSZXN1bHQocmVzdWx0KTtcbiAgICB9KTtcbiAgfVxuXG4gIHB1YmxpYyBvblJlcXVlc3Qoc2VuZGVyOiBJTWVzc2FnZVNlbmRlciwgbWV0aG9kOiBhbnksIGlkOiBhbnksIHBhcmFtczogYW55KTogdm9pZCB7XG4gICAgY29uc3QgaGFuZGxlciA9ICh0eXBlb2YgbWV0aG9kID09PSBcInN0cmluZ1wiKSA/IHRoaXMuX3JlcXVlc3RIYW5kbGVycy5nZXQobWV0aG9kKSA6IHVuZGVmaW5lZDtcbiAgICBjb25zdCByZXNwb25zZSA9IG5ldyBKc29uUnBjUmVzcG9uc2Uoc2VuZGVyLCBpZCk7XG4gICAgaWYgKGhhbmRsZXIpIHtcbiAgICAgIGhhbmRsZXIobmV3IEpzb25ScGNSZXF1ZXN0KHBhcmFtcyksIHJlc3BvbnNlKTtcbiAgICB9XG4gICAgZWxzZSB7XG4gICAgICByZXNwb25zZS5zZW5kRXJyb3IoLTMyNjAxLCBcIk1ldGhvZCBub3QgZm91bmRcIik7XG4gICAgfVxuICB9XG5cbiAgcHVibGljIG9uUmVzdWx0KHNlbmRlcjogSU1lc3NhZ2VTZW5kZXIsIHJlc3VsdDogYW55LCBpZDogbnVtYmVyKTogdm9pZCB7XG4gICAgXG4gIH1cblxuICBwdWJsaWMgb25FcnJvcihzZW5kZXI6IElNZXNzYWdlU2VuZGVyLCBlcnJvcjogb2JqZWN0LCBpZDogbnVtYmVyIHwgbnVsbCk6IHZvaWQge1xuICAgIFxuICB9XG5cbiAgcHVibGljIG9uTm90aWZpY2F0aW9uKHNlbmRlcjogSU1lc3NhZ2VTZW5kZXIsIG1ldGhvZDogYW55LCBwYXJhbXM/OiBhbnkpOiB2b2lkIHtcbiAgICBcbiAgfVxuXG4gIHByaXZhdGUgb25NZXNzYWdlSW1wbChzZW5kZXI6IElNZXNzYWdlU2VuZGVyLCBtZXNzYWdlOiBhbnkpOiB2b2lkIHtcbiAgICBpZiAoIW1lc3NhZ2UgfHwgdHlwZW9mIG1lc3NhZ2UgIT09IFwib2JqZWN0XCIpIHtcbiAgICAgIHJldHVybjtcbiAgICB9XG5cbiAgICBjb25zdCBkYXRhID0gbWVzc2FnZSBhcyBKc29uUnBjRGF0YTtcblxuICAgIGlmIChPYmplY3QuaGFzT3duKGRhdGEsIFwibWV0aG9kXCIpKSB7XG4gICAgICBpZiAoT2JqZWN0Lmhhc093bihkYXRhLCBcImlkXCIpKVxuICAgICAgICB0aGlzLm9uUmVxdWVzdChzZW5kZXIsIGRhdGEubWV0aG9kLCBkYXRhLmlkLCBkYXRhLnBhcmFtcyk7XG4gICAgICBlbHNlXG4gICAgICAgIHRoaXMub25Ob3RpZmljYXRpb24oc2VuZGVyLCBkYXRhLm1ldGhvZCwgZGF0YS5wYXJhbXMpO1xuICAgIH1cbiAgICBlbHNlIGlmIChkYXRhLmlkKSB7XG4gICAgICBcbiAgICB9XG4gICAgZWxzZSB7XG5cbiAgICB9XG4gIH1cblxuICBwdWJsaWMgZW1pdE1lc3NhZ2Uoc2VuZGVyOiBJTWVzc2FnZVNlbmRlciwgbWVzc2FnZTogYW55KTogdm9pZCB7XG4gICAgbG9nZ2VyLmRlYnVnKFwiLS0+XCIsIEpTT04uc3RyaW5naWZ5KG1lc3NhZ2UpKTtcbiAgICBpZiAoQXJyYXkuaXNBcnJheShtZXNzYWdlKSlcbiAgICAgIG1lc3NhZ2UuZm9yRWFjaChtc2cgPT4gdGhpcy5vbk1lc3NhZ2VJbXBsKHNlbmRlciwgbXNnKSk7XG4gICAgZWxzZVxuICAgICAgdGhpcy5vbk1lc3NhZ2VJbXBsKHNlbmRlciwgbWVzc2FnZSk7XG4gIH1cbn07XG4iLCIvKlxuICogTUlUIExpY2Vuc2VcbiAqXG4gKiBDb3B5cmlnaHQgKGMpIDIwMjUgIFl1cmlpIFlha3ViaW4gKHl1cmlpLnlha3ViaW5AZ21haWwuY29tKVxuICpcbiAqIFBlcm1pc3Npb24gaXMgZ3JhbnRlZCB0byB1c2UsIGNvcHksIG1vZGlmeSwgYW5kIGRpc3RyaWJ1dGUgdGhpcyBzb2Z0d2FyZVxuICogdW5kZXIgdGhlIE1JVCBMaWNlbnNlLiBTZWUgTElDRU5TRSBmaWxlIGZvciBkZXRhaWxzLlxuICovXG5cbmltcG9ydCB7IFdvcmtlciB9IGZyb20gXCJub2RlOndvcmtlcl90aHJlYWRzXCI7XG5cbmltcG9ydCB7IGN1cnJlbnRTY3JpcHRVUkwgfSBmcm9tIFwiQC91dGlscy9Nb2R1bGVcIjtcbmltcG9ydCB7IE1lbW9yeU1lc3NhZ2VTZW5kZXIgfSBmcm9tIFwiQC9zZXJ2ZXIvTWVtb3J5VHJhbnNwb3J0XCI7XG5pbXBvcnQgeyBXb3JrZXJTZW5kZXIgfSBmcm9tIFwiQC9zZXJ2ZXIvV29ya2VyU2VuZGVyXCI7XG5pbXBvcnQgeyBTY29wZUhlbHBlciwgVmFyaWFibGVNYXAgfSBmcm9tIFwiQC9jb3JlL1Njb3BlXCI7XG5pbXBvcnQgeyBKU09OUlBDX1ZFUlNJT04gfSBmcm9tIFwiQC9zZXJ2ZXIvVHJhbnNwb3J0XCI7XG5pbXBvcnQgeyBKc29uUnBjU2VydmVyIH0gZnJvbSBcIkAvc2VydmVyL0pzb25ScGNTZXJ2ZXJcIjtcbmltcG9ydCB7IExvZ2dlciB9IGZyb20gXCJAL2xvZ2dlclwiO1xuXG5jb25zdCBsb2dnZXIgPSBMb2dnZXIuY3JlYXRlKGltcG9ydC5tZXRhLnVybCk7XG5cbmludGVyZmFjZSBSZXNwb25zZUVudHJ5IHtcbiAgcmVzb2x2ZTogKHZhbHVlOiBhbnkpID0+IHZvaWQ7XG4gIHJlamVjdDogKHJlYXNvbj86IGFueSkgPT4gdm9pZDtcbn07XG5cbmV4cG9ydCBjbGFzcyBNYWtlQ2xpZW50IHtcbiAgcHJpdmF0ZSBfanNvblJwY1NlcnZlcjogSnNvblJwY1NlcnZlcjtcbiAgcHJpdmF0ZSBfd29ya2VyOiBXb3JrZXI7XG4gIHByaXZhdGUgX2lkID0gMTtcbiAgcHJpdmF0ZSBfd2FpdFJlc3BvbnNlTWFwID0gbmV3IE1hcDxudW1iZXIsUmVzcG9uc2VFbnRyeT4oKTs7XG5cbiAgcHVibGljIGNvbnN0cnVjdG9yKGpzb25ScGNTZXJ2ZXI6IEpzb25ScGNTZXJ2ZXIpIHtcbiAgICB0aGlzLl9qc29uUnBjU2VydmVyID0ganNvblJwY1NlcnZlcjtcbiAgICB0aGlzLl93b3JrZXIgPSBuZXcgV29ya2VyKGN1cnJlbnRTY3JpcHRVUkwoKSk7XG4gICAgdGhpcy5fd29ya2VyLm9uKFwibWVzc2FnZVwiLCBtZXNzYWdlID0+IHRoaXMub25Xb3JrZXJNZXNzYWdlKG1lc3NhZ2UpKTtcbiAgICB0aGlzLl93b3JrZXIub24oXCJlcnJvclwiLCBlcnJvciA9PiB0aGlzLm9uV29ya2VyRXJyb3IoZXJyb3IpKTtcbiAgICB0aGlzLl93b3JrZXIub24oXCJleGl0XCIsIGNvZGUgPT4gdGhpcy5vbldvcmtlckV4aXQoY29kZSkpO1xuICB9XG5cbiAgcHVibGljIGFzeW5jIHJlcXVlc3QobWV0aG9kOiBzdHJpbmcsIHBhcmFtczogYW55KTogUHJvbWlzZTxhbnk+IHtcbiAgICBjb25zdCBpZCA9IHRoaXMuX2lkKys7XG4gICAgY29uc3QgcmVzdWx0ID0gbmV3IFByb21pc2U8YW55PigocmVzb2x2ZSwgcmVqZWN0KSA9PiB7XG4gICAgICB0aGlzLl93YWl0UmVzcG9uc2VNYXAuc2V0KGlkLCB7IHJlc29sdmUsIHJlamVjdCB9KTtcbiAgICB9KTtcbiAgICB0aGlzLl93b3JrZXIucG9zdE1lc3NhZ2Uoe1xuICAgICAganNvbnJwYzogSlNPTlJQQ19WRVJTSU9OLFxuICAgICAgbWV0aG9kLFxuICAgICAgcGFyYW1zLFxuICAgICAgaWQsXG4gICAgfSk7XG4gICAgcmV0dXJuIHJlc3VsdDtcbiAgfVxuXG4gIHByaXZhdGUgb25Xb3JrZXJNZXNzYWdlKG1lc3NhZ2U6IGFueSkge1xuICAgIGlmIChtZXNzYWdlIGluc3RhbmNlb2YgU2hhcmVkQXJyYXlCdWZmZXIpIHtcbiAgICAgIGNvbnN0IG10ID0gbmV3IE1lbW9yeU1lc3NhZ2VTZW5kZXIobWVzc2FnZSlcbiAgICAgIHRoaXMuX2pzb25ScGNTZXJ2ZXIuZW1pdE1lc3NhZ2UobXQsIG10LnJlYWRNZXNzYWdlKCkpO1xuICAgIH1cbiAgICBlbHNlIGlmIChPYmplY3QuaGFzT3duKG1lc3NhZ2UsIFwibWV0aG9kXCIpKSB7XG4gICAgICBjb25zdCBzZW5kZXIgPSBuZXcgV29ya2VyU2VuZGVyKHRoaXMuX3dvcmtlcik7XG4gICAgICB0aGlzLl9qc29uUnBjU2VydmVyLmVtaXRNZXNzYWdlKHNlbmRlciwgbWVzc2FnZSk7XG4gICAgfVxuICAgIGVsc2UgaWYgKE9iamVjdC5oYXNPd24obWVzc2FnZSwgXCJpZFwiKSkge1xuICAgICAgY29uc3QgcHJvbWlzZSA9IHRoaXMuX3dhaXRSZXNwb25zZU1hcC5nZXQobWVzc2FnZS5pZCk7XG4gICAgICBpZiAoIXByb21pc2UpXG4gICAgICAgIHRocm93IG5ldyBFcnJvcihgVW5rbm93biByZXNwb25zZSBcIiR7bWVzc2FnZS5pZH1cIiBpZGApO1xuICAgICAgaWYgKE9iamVjdC5oYXNPd24obWVzc2FnZSwgXCJyZXN1bHRcIikpXG4gICAgICAgIHByb21pc2UucmVzb2x2ZShtZXNzYWdlLnJlc3VsdCk7XG4gICAgICBlbHNlIGlmIChPYmplY3QuaGFzT3duKG1lc3NhZ2UsIFwiZXJyb3JcIikpXG4gICAgICAgIHByb21pc2UucmVqZWN0KG1lc3NhZ2UuZXJyb3IpO1xuICAgICAgZWxzZVxuICAgICAgICB0aHJvdyBuZXcgRXJyb3IoYFVua25vd24gbWVzc2FnZSB0eXBlIG9mIFwiJHttZXNzYWdlfVwiYCk7XG4gICAgfVxuICB9XG5cbiAgcHJpdmF0ZSBvbldvcmtlckVycm9yKGVycm9yOiBFcnJvcikge1xuICAgIGlmIChlcnJvciBpbnN0YW5jZW9mIEVycm9yKVxuICAgICAgbG9nZ2VyLmZhdGFsKGVycm9yLnN0YWNrKTtcbiAgICBlbHNlXG4gICAgICBsb2dnZXIuZmF0YWwoZXJyb3IpO1xuICAgIHByb2Nlc3MuZXhpdCgxKTtcbiAgfVxuXG4gIHByaXZhdGUgb25Xb3JrZXJFeGl0KGNvZGU6IG51bWJlcikge1xuICAgIGlmIChjb2RlKVxuICAgICAgcHJvY2Vzcy5leGl0KGNvZGUpO1xuICB9XG59O1xuIiwiLypcbiAqIE1JVCBMaWNlbnNlXG4gKlxuICogQ29weXJpZ2h0IChjKSAyMDI1ICBZdXJpaSBZYWt1YmluICh5dXJpaS55YWt1YmluQGdtYWlsLmNvbSlcbiAqXG4gKiBQZXJtaXNzaW9uIGlzIGdyYW50ZWQgdG8gdXNlLCBjb3B5LCBtb2RpZnksIGFuZCBkaXN0cmlidXRlIHRoaXMgc29mdHdhcmVcbiAqIHVuZGVyIHRoZSBNSVQgTGljZW5zZS4gU2VlIExJQ0VOU0UgZmlsZSBmb3IgZGV0YWlscy5cbiAqL1xuXG5pbXBvcnQgZnMgZnJvbSBcIm5vZGU6ZnNcIjtcblxuaW1wb3J0IHsgUHJvamVjdENvbnRleHQgfSBmcm9tIFwiQC9jb3JlL1Byb2plY3RDb250ZXh0XCI7XG5pbXBvcnQgeyBTY3JpcHRDb250ZXh0IH0gZnJvbSBcIkAvY29yZS9TY3JpcHRDb250ZXh0XCI7XG5pbXBvcnQgeyBTY29wZUhlbHBlciwgVmFyaWFibGVNYXAgfSBmcm9tIFwiQC9jb3JlL1Njb3BlXCI7XG5pbXBvcnQgeyBNYWtlQ2xpZW50IH0gZnJvbSBcIkAvc2VydmVyL01ha2VDbGllbnRcIjtcbmltcG9ydCB7IEpzb25ScGNTZXJ2ZXIgfSBmcm9tIFwiQC9zZXJ2ZXIvSnNvblJwY1NlcnZlclwiO1xuaW1wb3J0IHsgaW1wb3J0TW9kdWxlIH0gZnJvbSBcIkAvdXRpbHMvTW9kdWxlXCI7XG5pbXBvcnQgeyBjcmVhdGVWYXJpYWJsZU1hcEZvckRpcmVjdG9yeSB9IGZyb20gXCJAL2NvcmUvQmFzZUNvbnRleHRcIjtcbmltcG9ydCB7IE1BSU5OT0RFX1NUQVJUTUFLRVNDUklQVCB9IGZyb20gXCJAL3NlcnZlci9SZW1vdGVNZXRob2RzXCI7XG5pbXBvcnQgeyBNQUlOTk9ERV9MT0FESlNPTiB9IGZyb20gXCJAL3NlcnZlci9SZW1vdGVNZXRob2RzXCI7XG5pbXBvcnQgeyBNQUlOTk9ERV9FWEVDVVRFU0NSSVBUIH0gZnJvbSBcIkAvc2VydmVyL1JlbW90ZU1ldGhvZHNcIjtcbmltcG9ydCB7IFdPUktFUk5PREVfU1RBUlRNQUtFU0NSSVBUIH0gZnJvbSBcIkAvc2VydmVyL1JlbW90ZU1ldGhvZHNcIjtcbmltcG9ydCB7IExvZ2dlciB9IGZyb20gXCJAL2xvZ2dlclwiO1xuXG5jb25zdCBsb2dnZXIgPSBMb2dnZXIuY3JlYXRlKGltcG9ydC5tZXRhLnVybCk7XG5cbmV4cG9ydCBjb25zdCBDT05GSUdVUkVfRVZFTlQgPSBcImNvbmZpZ3VyZVwiO1xuZXhwb3J0IGNvbnN0IEJVSUxEX0VWRU5UID0gXCJidWlsZFwiO1xuXG5leHBvcnQgaW50ZXJmYWNlIENvbmZpZ3VyZUV2ZW50IHtcbiAgcHJvamVjdDogUHJvamVjdENvbnRleHQ7XG59O1xuXG5leHBvcnQgaW50ZXJmYWNlIEJ1aWxkRXZlbnQge1xuICBwcm9qZWN0OiBQcm9qZWN0Q29udGV4dDtcbn07XG5cbmV4cG9ydCB0eXBlIENvbmZpZ3VyZUxpc3RlbmVyID0gKGV2ZW50OiBDb25maWd1cmVFdmVudCkgPT4gdm9pZDtcbmV4cG9ydCB0eXBlIEJ1aWxkTGlzdGVuZXIgPSAoZXZlbnQ6IEJ1aWxkRXZlbnQpID0+IHZvaWQ7XG5cbmV4cG9ydCBpbnRlcmZhY2UgTWVtb3J5U2VuZGVyIHtcbiAgc2VuZE1lc3NhZ2UobWVzc2FnZTogYW55KTogdm9pZDtcbn07XG5cbmV4cG9ydCBjbGFzcyBNYWtlU2VydmVyIHtcbiAgcHJpdmF0ZSBfcm9vdFZhcmlhYmxlTWFwOiBWYXJpYWJsZU1hcCA9IHt9O1xuICBwcml2YXRlIF9wcm9qZWN0ID0gUHJvamVjdENvbnRleHQuY3JlYXRlKCk7XG4gIHByaXZhdGUgX2xpc3RlbmVyczogeyBbbmFtZTogc3RyaW5nXTogRnVuY3Rpb25bXSB9O1xuICBwcml2YXRlIF9qc29uUnBjU2VydmVyID0gbmV3IEpzb25ScGNTZXJ2ZXI7XG4gIHByaXZhdGUgX2NsaWVudHMgPSBuZXcgTWFwPHN0cmluZywgTWFrZUNsaWVudD47XG4gIHByaXZhdGUgX2NsaWVudElkQ291bnRlciA9IDE7XG5cbiAgcHVibGljIGNvbnN0cnVjdG9yKCkge1xuICAgIHRoaXMuX2xpc3RlbmVycyA9IHtcbiAgICAgIFsgQ09ORklHVVJFX0VWRU5UIF06IG5ldyBBcnJheTxDb25maWd1cmVMaXN0ZW5lcj4sXG4gICAgICBbIEJVSUxEX0VWRU5UIF06IG5ldyBBcnJheTxCdWlsZExpc3RlbmVyPixcbiAgICB9O1xuICAgIHRoaXMuX2pzb25ScGNTZXJ2ZXIucmVnaXN0ZXJDYWxsYmFjayhNQUlOTk9ERV9FWEVDVVRFU0NSSVBULCBwYXJhbXMgPT4gdGhpcy5leGVjdXRlU2NyaXB0KHBhcmFtcykpO1xuICAgIHRoaXMuX2pzb25ScGNTZXJ2ZXIucmVnaXN0ZXJDYWxsYmFjayhNQUlOTk9ERV9MT0FESlNPTiwgcGFyYW1zID0+IHRoaXMubG9hZEpTT04ocGFyYW1zKSk7XG4gICAgdGhpcy5fanNvblJwY1NlcnZlci5yZWdpc3RlckNhbGxiYWNrKE1BSU5OT0RFX1NUQVJUTUFLRVNDUklQVCwgcGFyYW1zID0+IHRoaXMuc3RhcnRNYWtlU2NyaXB0KHBhcmFtcykpO1xuICB9XG5cbiAgcHVibGljIGdldCByb290VmFyaWFibGVNYXAoKSB7XG4gICAgcmV0dXJuIHRoaXMuX3Jvb3RWYXJpYWJsZU1hcDtcbiAgfVxuXG4gIHB1YmxpYyBnZXQgcHJvamVjdCgpIHtcbiAgICByZXR1cm4gdGhpcy5fcHJvamVjdDtcbiAgfVxuXG4gIHB1YmxpYyBjcmVhdGVDbGllbnQoKSB7XG4gICAgY29uc3QgbmFtZSA9IFwibWtjXCIgKyB0aGlzLl9jbGllbnRJZENvdW50ZXIrKztcbiAgICBjb25zdCBjbGllbnQgPSBuZXcgTWFrZUNsaWVudCh0aGlzLl9qc29uUnBjU2VydmVyKTtcbiAgICB0aGlzLl9jbGllbnRzLnNldChuYW1lLCBjbGllbnQpO1xuICAgIHJldHVybiBjbGllbnQ7XG4gIH1cblxuICBwdWJsaWMgYXN5bmMgc3RhcnRNYWtlU2NyaXB0KHBhcmFtczogYW55KTogUHJvbWlzZTx2b2lkPiB7XG4gICAgbG9nZ2VyLmRlYnVnKFwiTWFrZVNlcnZlci5zdGFydE1ha2VTY3JpcHRcIik7XG5cbiAgICBjb25zdCB2YXJpYWJsZU1hcCA9IFNjb3BlSGVscGVyLmZyb21KU09OKHBhcmFtcyk7XG4gICAgYXdhaXQgdGhpcy5ydW5NYWtlU2NyaXB0KHZhcmlhYmxlTWFwKTtcbiAgfVxuXG4gIHByaXZhdGUgYXN5bmMgbG9hZEpTT04oZmlsZW5hbWU6IHN0cmluZyk6IFByb21pc2U8YW55PiB7XG4gICAgbG9nZ2VyLmRlYnVnKFwiTWFrZVNlcnZlci5sb2FkSlNPTihcIiwgZmlsZW5hbWUsIFwiKVwiKTtcbiAgICBpZiAoZmlsZW5hbWUuZW5kc1dpdGgoXCIuanNvblwiKSkge1xuICAgICAgY29uc3QgY29udGVudCA9IGF3YWl0IGZzLnByb21pc2VzLnJlYWRGaWxlKGZpbGVuYW1lLCBcInV0ZjhcIik7XG4gICAgICByZXR1cm4gSlNPTi5wYXJzZShjb250ZW50KTtcbiAgICB9XG5cbiAgICBjb25zdCBtb2R1bGUgPSBhd2FpdCBpbXBvcnRNb2R1bGUoZmlsZW5hbWUpO1xuICAgIGlmICghbW9kdWxlLmRlZmF1bHQpXG4gICAgICB0aHJvdyBuZXcgRXJyb3IoYFNjcmlwdCBcIiR7ZmlsZW5hbWV9XCIgaGFzIG5vdCBjb250YWluIGEgZGVmYXVsdCBmdW5jdGlvbmApO1xuXG4gICAgcmV0dXJuIG1vZHVsZS5kZWZhdWx0O1xuICB9XG5cbiAgcHJpdmF0ZSBhc3luYyBleGVjdXRlU2NyaXB0KHBhcmFtczogYW55KTogUHJvbWlzZTx2b2lkPiB7XG4gICAgbG9nZ2VyLmRlYnVnKFwiTWFrZVNlcnZlci5leGVjdXRlU2NyaXB0XCIpO1xuICAgIGNvbnN0IHZhcmlhYmxlTWFwID0gU2NvcGVIZWxwZXIuZnJvbUpTT04ocGFyYW1zKTtcbiAgICBjb25zdCBzY3JpcHRGaWxlID0gU2NvcGVIZWxwZXIuZ2V0KHZhcmlhYmxlTWFwLCBcIlNDUklQVF9GSUxFXCIpO1xuXG4gICAgY29uc3QgbW9kdWxlID0gYXdhaXQgaW1wb3J0TW9kdWxlKHNjcmlwdEZpbGUudG9TdHJpbmcoKSk7XG4gICAgaWYgKCFtb2R1bGUuZGVmYXVsdClcbiAgICAgIHRocm93IG5ldyBFcnJvcihgU2NyaXB0IFwiJHtzY3JpcHRGaWxlfVwiIGhhcyBub3QgY29udGFpbiBhIGRlZmF1bHQgZnVuY3Rpb25gKTtcblxuICAgIGNvbnN0IG1rID0gU2NyaXB0Q29udGV4dC5jcmVhdGUodmFyaWFibGVNYXApO1xuICAgIG1vZHVsZS5kZWZhdWx0KG1rKTtcbiAgfVxuXG4gIHB1YmxpYyBhc3luYyBydW5NYWtlU2NyaXB0KHZhcmlhYmxlTWFwOiBWYXJpYWJsZU1hcCk6IFByb21pc2U8Ym9vbGVhbj4ge1xuICAgIGlmICghYXdhaXQgdGhpcy5fcHJvamVjdC5wcmVwZWFyU2NyaXB0RmlsZSh2YXJpYWJsZU1hcCkpXG4gICAgICByZXR1cm4gZmFsc2U7XG5cbiAgICBjb25zdCBjbGllbnQgPSB0aGlzLmNyZWF0ZUNsaWVudCgpO1xuXG4gICAgY29uc3QgY3dkU2F2ZSA9IHByb2Nlc3MuY3dkKCk7XG4gICAgY29uc3Qgc2NyaXB0RGlyID0gU2NvcGVIZWxwZXIuZ2V0KHZhcmlhYmxlTWFwLCBcIlNDUklQVF9ESVJcIik7XG4gICAgcHJvY2Vzcy5jaGRpcihzY3JpcHREaXIudG9TdHJpbmcoKSk7XG4gICAgYXdhaXQgY2xpZW50LnJlcXVlc3QoV09SS0VSTk9ERV9TVEFSVE1BS0VTQ1JJUFQsIFNjb3BlSGVscGVyLnRvSlNPTih2YXJpYWJsZU1hcCkpO1xuICAgIHByb2Nlc3MuY2hkaXIoY3dkU2F2ZSk7XG5cbiAgICByZXR1cm4gdHJ1ZTtcbiAgfVxuXG4gIHB1YmxpYyBhc3luYyBzdGFydCgpIHtcbiAgICBjb25zdCBzb3VyY2VEaXIgPSBTY29wZUhlbHBlci5nZXQodGhpcy5fcm9vdFZhcmlhYmxlTWFwLCBcIlBST0pFQ1RfU09VUkNFX0RJUlwiKTtcbiAgICBjb25zdCBiaW5hcnlEaXIgPSBTY29wZUhlbHBlci5nZXQodGhpcy5fcm9vdFZhcmlhYmxlTWFwLCBcIlBST0pFQ1RfQklOQVJZX0RJUlwiKTtcblxuICAgIC8qY29uc3QgdmFyaWFibGVNYXAgPSBjcmVhdGVWYXJpYWJsZU1hcEZvckRpcmVjdG9yeSh0aGlzLl9yb290VmFyaWFibGVNYXAsIHNvdXJjZURpciwgYmluYXJ5RGlyKTtcbiAgICBpZiAoIWF3YWl0IHRoaXMucnVuTWFrZVNjcmlwdCh2YXJpYWJsZU1hcCkpXG4gICAgICB0aHJvdyBFcnJvcihcIkNhbid0IHByZXBlYXIgU2NyaXB0RmlsZVwiKTtcblxuICAgIHRoaXMub25Db25maWd1cmVFbmQoKTsqL1xuXG4gICAgdGhpcy5fcHJvamVjdC5hZGRTdWJkaXJlY3RvcnkodGhpcy5fcm9vdFZhcmlhYmxlTWFwLCBzb3VyY2VEaXIsIGJpbmFyeURpcik7XG4gICAgdGhpcy5fcHJvamVjdC5kb1N1YmRpcmVjdG9yeSgpLnRoZW4oKCkgPT4gdGhpcy5vbkNvbmZpZ3VyZUVuZCgpKTtcbiAgfVxuXG4gIHByaXZhdGUgYXN5bmMgb25Db25maWd1cmVFbmQoKSB7XG4gICAgY29uc3QgZXZlbnQgPSB7IHByb2plY3Q6IHRoaXMuX3Byb2plY3QgfTtcbiAgICBhd2FpdCB0aGlzLmVtaXRFdmVudChDT05GSUdVUkVfRVZFTlQsIGV2ZW50KTtcbiAgICBhd2FpdCB0aGlzLmVtaXRFdmVudChCVUlMRF9FVkVOVCwgZXZlbnQpO1xuICB9XG5cbiAgcHJpdmF0ZSBhc3luYyBlbWl0RXZlbnQ8VD4odHlwZTogc3RyaW5nLCBldmVudDogVCk6IFByb21pc2U8dm9pZD4ge1xuICAgIGZvciAoY29uc3QgbGlzdGVuZXIgb2YgdGhpcy5fbGlzdGVuZXJzW3R5cGVdKSB7XG4gICAgICBjb25zdCByZXN1bHQgPSBsaXN0ZW5lcihldmVudCk7XG4gICAgICBpZiAocmVzdWx0IGluc3RhbmNlb2YgUHJvbWlzZSlcbiAgICAgICAgYXdhaXQgcmVzdWx0O1xuICAgIH1cbiAgfVxuICBcbiAgcHVibGljIGFkZEV2ZW50TGlzdGVuZXIodHlwZTogXCJjb25maWd1cmVcIiwgbGlzdGVuZXI6IENvbmZpZ3VyZUxpc3RlbmVyKTogdm9pZDtcbiAgcHVibGljIGFkZEV2ZW50TGlzdGVuZXIodHlwZTogXCJidWlsZFwiLCBsaXN0ZW5lcjogQnVpbGRMaXN0ZW5lcik6IHZvaWQ7XG4gIHB1YmxpYyBhZGRFdmVudExpc3RlbmVyKHR5cGU6IHN0cmluZywgbGlzdGVuZXI6IEZ1bmN0aW9uKTogdm9pZCB7XG4gICAgdGhpcy5fbGlzdGVuZXJzW3R5cGVdLnB1c2gobGlzdGVuZXIpO1xuICB9XG59O1xuIiwiLypcbiAqIE1JVCBMaWNlbnNlXG4gKlxuICogQ29weXJpZ2h0IChjKSAyMDI1ICBZdXJpaSBZYWt1YmluICh5dXJpaS55YWt1YmluQGdtYWlsLmNvbSlcbiAqXG4gKiBQZXJtaXNzaW9uIGlzIGdyYW50ZWQgdG8gdXNlLCBjb3B5LCBtb2RpZnksIGFuZCBkaXN0cmlidXRlIHRoaXMgc29mdHdhcmVcbiAqIHVuZGVyIHRoZSBNSVQgTGljZW5zZS4gU2VlIExJQ0VOU0UgZmlsZSBmb3IgZGV0YWlscy5cbiAqL1xuXG5pbXBvcnQgeyBJTWVzc2FnZVNlbmRlciwgSVJlcXVlc3RTeW5jIH0gZnJvbSBcIkAvc2VydmVyL1RyYW5zcG9ydFwiO1xuaW1wb3J0IHsgTG9nZ2VyIH0gZnJvbSBcIkAvbG9nZ2VyXCI7XG5cbmNvbnN0IGxvZ2dlciA9IExvZ2dlci5jcmVhdGUoaW1wb3J0Lm1ldGEudXJsKTtcblxuZXhwb3J0IGNsYXNzIE1lbW9yeU1lc3NhZ2VTZW5kZXIgaW1wbGVtZW50cyBJTWVzc2FnZVNlbmRlciB7XG4gIHByaXZhdGUgX2J1ZmZlcjogU2hhcmVkQXJyYXlCdWZmZXI7XG4gIHByaXZhdGUgX21lbW9yeTogTWVtb3J5VHJhbnNwb3J0LkJ1ZmZlcjtcblxuICBwdWJsaWMgY29uc3RydWN0b3IoYnVmZmVyOiBTaGFyZWRBcnJheUJ1ZmZlcikge1xuICAgIHRoaXMuX2J1ZmZlciA9IGJ1ZmZlcjtcbiAgICB0aGlzLl9tZW1vcnkgPSBuZXcgTWVtb3J5VHJhbnNwb3J0LkJ1ZmZlcihidWZmZXIpO1xuICB9XG5cbiAgcHVibGljIHNlbmRNZXNzYWdlKG1lc3NhZ2U6IGFueSk6IHZvaWQge1xuICAgIHRoaXMuX21lbW9yeS5zZXQobWVzc2FnZSwgdHJ1ZSk7XG4gIH1cblxuICBwdWJsaWMgcmVhZE1lc3NhZ2UoKTogYW55IHtcbiAgICByZXR1cm4gdGhpcy5fbWVtb3J5LmdldCgpO1xuICB9XG59O1xuXG5leHBvcnQgY2xhc3MgTWVtb3J5VHJhbnNwb3J0IGltcGxlbWVudHMgSVJlcXVlc3RTeW5jIHtcbiAgcHJpdmF0ZSBfc2VuZGVyOiBJTWVzc2FnZVNlbmRlcjtcbiAgcHJpdmF0ZSBfYnVmZmVyOiBTaGFyZWRBcnJheUJ1ZmZlcjtcbiAgcHJpdmF0ZSBfbWVtb3J5OiBNZW1vcnlUcmFuc3BvcnQuQnVmZmVyO1xuXG4gIHB1YmxpYyBjb25zdHJ1Y3RvcihzZW5kZXI6IElNZXNzYWdlU2VuZGVyLCBidWZmZXI6IFNoYXJlZEFycmF5QnVmZmVyKSB7XG4gICAgdGhpcy5fc2VuZGVyID0gc2VuZGVyO1xuICAgIHRoaXMuX2J1ZmZlciA9IGJ1ZmZlcjtcbiAgICB0aGlzLl9tZW1vcnkgPSBuZXcgTWVtb3J5VHJhbnNwb3J0LkJ1ZmZlcihidWZmZXIpO1xuICB9XG5cbiAgcHVibGljIHJlcXVlc3RTeW5jKGRhdGE6IGFueSk6IGFueSB7XG4gICAgdGhpcy5fbWVtb3J5LnNldChkYXRhKTtcbiAgICB0aGlzLl9zZW5kZXIuc2VuZE1lc3NhZ2UodGhpcy5fYnVmZmVyKTtcbiAgICByZXR1cm4gdGhpcy5fbWVtb3J5LmdldCh0cnVlKTtcbiAgfVxufTtcblxuZXhwb3J0IG5hbWVzcGFjZSBNZW1vcnlUcmFuc3BvcnQge1xuXG5jb25zdCBNQUdJQ19PRkZTRVQgPSAwO1xuXG5leHBvcnQgY2xhc3MgQnVmZmVyIHtcbiAgcHJpdmF0ZSBfc2lnbmFsOiBJbnQzMkFycmF5O1xuICBwcml2YXRlIF9kYXRhOiBVaW50OEFycmF5O1xuICBwcml2YXRlIF9tYWdpYzogbnVtYmVyO1xuXG4gIHB1YmxpYyBjb25zdHJ1Y3RvcihidWZmZXI6IFNoYXJlZEFycmF5QnVmZmVyKSB7XG4gICAgdGhpcy5fc2lnbmFsID0gbmV3IEludDMyQXJyYXkoYnVmZmVyLCBNQUdJQ19PRkZTRVQsIDEpO1xuICAgIHRoaXMuX2RhdGEgPSBuZXcgVWludDhBcnJheShidWZmZXIsIHRoaXMuX3NpZ25hbC5CWVRFU19QRVJfRUxFTUVOVCk7XG4gICAgdGhpcy5fbWFnaWMgPSAwO1xuICB9XG5cbiAgcHVibGljIGdldChzeW5jID0gZmFsc2UpOiBhbnkge1xuICAgIGlmIChzeW5jKSB7XG4gICAgICBBdG9taWNzLndhaXQodGhpcy5fc2lnbmFsLCBNQUdJQ19PRkZTRVQsIHRoaXMuX21hZ2ljKTtcbiAgICB9XG5cbiAgICB0aGlzLl9tYWdpYyA9IHRoaXMuX3NpZ25hbFswXTtcbiAgICBjb25zdCBsZW5ndGggPSB0aGlzLl9tYWdpYyA+PiA4O1xuICAgIGNvbnN0IGJ5dGVzID0gdGhpcy5fZGF0YS5zbGljZSgwLCBsZW5ndGgpO1xuICAgIGNvbnN0IG1lc3NhZ2UgPSAobmV3IFRleHREZWNvZGVyKCkpLmRlY29kZShieXRlcyk7XG5cbiAgICByZXR1cm4gSlNPTi5wYXJzZShtZXNzYWdlKTtcbiAgfVxuXG4gIHB1YmxpYyBzZXQoanNvbjogYW55LCBub3RpZnkgPSBmYWxzZSkge1xuICAgIGNvbnN0IG1lc3NhZ2UgPSBKU09OLnN0cmluZ2lmeShqc29uKTtcbiAgICBjb25zdCBieXRlcyA9IChuZXcgVGV4dEVuY29kZXIoKSkuZW5jb2RlKG1lc3NhZ2UpO1xuICAgIHRoaXMuX2RhdGEuc2V0KGJ5dGVzKTtcbiAgICB0aGlzLl9tYWdpYyA9IChieXRlcy5sZW5ndGggPDwgOCkgfCAoKHRoaXMuX21hZ2ljICsgMSkgJiAyNTUpO1xuICAgIHRoaXMuX3NpZ25hbFswXSA9IHRoaXMuX21hZ2ljO1xuXG4gICAgaWYgKG5vdGlmeSkge1xuICAgICAgQXRvbWljcy5ub3RpZnkodGhpcy5fc2lnbmFsLCBNQUdJQ19PRkZTRVQsIDEpO1xuICAgIH1cbiAgfVxufTtcblxufSAvLyBuYW1lc3BhY2UgTWVtb3J5VHJhbnNwb3J0XG4iLCIvKlxuICogTUlUIExpY2Vuc2VcbiAqXG4gKiBDb3B5cmlnaHQgKGMpIDIwMjUgIFl1cmlpIFlha3ViaW4gKHl1cmlpLnlha3ViaW5AZ21haWwuY29tKVxuICpcbiAqIFBlcm1pc3Npb24gaXMgZ3JhbnRlZCB0byB1c2UsIGNvcHksIG1vZGlmeSwgYW5kIGRpc3RyaWJ1dGUgdGhpcyBzb2Z0d2FyZVxuICogdW5kZXIgdGhlIE1JVCBMaWNlbnNlLiBTZWUgTElDRU5TRSBmaWxlIGZvciBkZXRhaWxzLlxuICovXG5cbmltcG9ydCB7IE1lc3NhZ2VQb3J0IH0gZnJvbSBcIm5vZGU6d29ya2VyX3RocmVhZHNcIjtcbmltcG9ydCB7IElNZXNzYWdlU2VuZGVyIH0gZnJvbSBcIkAvc2VydmVyL1RyYW5zcG9ydFwiO1xuaW1wb3J0IHsgTG9nZ2VyIH0gZnJvbSBcIkAvbG9nZ2VyXCI7XG5cbmNvbnN0IGxvZ2dlciA9IExvZ2dlci5jcmVhdGUoaW1wb3J0Lm1ldGEudXJsKTtcblxuZXhwb3J0IGNsYXNzIE1lc3NhZ2VQb3J0U2VuZGVyIGltcGxlbWVudHMgSU1lc3NhZ2VTZW5kZXIge1xuICBwcml2YXRlIF9tZXNzYWdlUG9ydDogTWVzc2FnZVBvcnQ7XG5cbiAgcHVibGljIGNvbnN0cnVjdG9yKG1lc3NhZ2VQb3J0OiBNZXNzYWdlUG9ydCkge1xuICAgIHRoaXMuX21lc3NhZ2VQb3J0ID0gbWVzc2FnZVBvcnQ7XG4gIH1cblxuICBwdWJsaWMgc2VuZE1lc3NhZ2UobWVzc2FnZTogYW55KTogdm9pZCB7XG4gICAgbG9nZ2VyLmRlYnVnKFwiPC0tXCIsIEpTT04uc3RyaW5naWZ5KG1lc3NhZ2UpKTtcbiAgICB0aGlzLl9tZXNzYWdlUG9ydC5wb3N0TWVzc2FnZShtZXNzYWdlKTtcbiAgfVxufTtcbiIsIi8qXG4gKiBNSVQgTGljZW5zZVxuICpcbiAqIENvcHlyaWdodCAoYykgMjAyNSAgWXVyaWkgWWFrdWJpbiAoeXVyaWkueWFrdWJpbkBnbWFpbC5jb20pXG4gKlxuICogUGVybWlzc2lvbiBpcyBncmFudGVkIHRvIHVzZSwgY29weSwgbW9kaWZ5LCBhbmQgZGlzdHJpYnV0ZSB0aGlzIHNvZnR3YXJlXG4gKiB1bmRlciB0aGUgTUlUIExpY2Vuc2UuIFNlZSBMSUNFTlNFIGZpbGUgZm9yIGRldGFpbHMuXG4gKi9cblxuaW1wb3J0IHsgTWFrZUNvbnRleHQgfSBmcm9tIFwiQC9jb3JlL0Jhc2VDb250ZXh0XCI7XG5pbXBvcnQgeyBjcmVhdGVWYXJpYWJsZU1hcEZvckRpcmVjdG9yeSB9IGZyb20gXCJAL2NvcmUvQmFzZUNvbnRleHRcIjtcbmltcG9ydCB7IEpzb25ScGNSZXF1ZXN0U3luYyB9IGZyb20gXCJAL3NlcnZlci9Kc29uUnBjUmVxdWVzdFN5bmNcIjtcbmltcG9ydCB7IE1BSU5OT0RFX0xPQURKU09OIH0gZnJvbSBcIkAvc2VydmVyL1JlbW90ZU1ldGhvZHNcIjtcbmltcG9ydCB7IE1BSU5OT0RFX0VYRUNVVEVTQ1JJUFQgfSBmcm9tIFwiQC9zZXJ2ZXIvUmVtb3RlTWV0aG9kc1wiO1xuaW1wb3J0IHsgTUFJTk5PREVfU1RBUlRNQUtFU0NSSVBUIH0gZnJvbSBcIkAvc2VydmVyL1JlbW90ZU1ldGhvZHNcIjtcbmltcG9ydCB7IExvZ2dlciB9IGZyb20gXCJAL2xvZ2dlclwiO1xuaW1wb3J0IHsgU2NvcGVIZWxwZXIsIFZhcmlhYmxlTWFwLCBWYXJpYW50TWFwIH0gZnJvbSBcIkAvY29yZS9TY29wZVwiO1xuaW1wb3J0IHsgQ1VTVE9NX1ZBUklBQkxFX0dST1VQIH0gZnJvbSBcIkAvQ29uc3RhbnRzXCI7XG5pbXBvcnQgeyBBYnNvbHV0ZVBhdGggfSBmcm9tIFwiQC9jb3JlL0Fic29sdXRlUGF0aFwiO1xuXG5jb25zdCBsb2dnZXIgPSBMb2dnZXIuY3JlYXRlKGltcG9ydC5tZXRhLnVybCk7XG5cbmV4cG9ydCBjbGFzcyBSZW1vdGVNYWtlQ29udGV4dCBleHRlbmRzIE1ha2VDb250ZXh0IHtcbiAgcHJpdmF0ZSBfdHJhbnNwb3J0OiBKc29uUnBjUmVxdWVzdFN5bmM7XG5cbiAgcHVibGljIGNvbnN0cnVjdG9yKHNjb3BlOiBWYXJpYWJsZU1hcCwgdHJhbnNwb3J0OiBKc29uUnBjUmVxdWVzdFN5bmMpIHtcbiAgICBzdXBlcihzY29wZSk7XG4gICAgdGhpcy5fdHJhbnNwb3J0ID0gdHJhbnNwb3J0O1xuICB9XG5cbiAgcHVibGljIGV4ZWN1dGVTY3JpcHQoc2NyaXB0OiBhbnksIHBhcmFtczogYW55KTogYW55IHtcbiAgICBsb2dnZXIuZGVidWcoXCJSZW1vdGVNYWtlQ29udGV4dC5leGVjdXRlU2NyaXB0KFwiLCBzY3JpcHQsIHBhcmFtcywgXCIpXCIpO1xuICAgIGNvbnN0IG5ld1ZhcmlhYmxlTWFwID0gU2NvcGVIZWxwZXIuY2xvbmVWYXJpYWJsZU1hcCh0aGlzLl9zY29wZSk7XG4gICAgcGFyYW1zICYmIFNjb3BlSGVscGVyLmV4dGVuZFZhcmlhYmxlTWFwQnlWYWx1ZXMobmV3VmFyaWFibGVNYXAsIFwiXCIsIHBhcmFtcyk7XG4gICAgY29uc3Qgc2NyaXB0RmlsZSA9IFNjb3BlSGVscGVyLmdldChuZXdWYXJpYWJsZU1hcCwgXCJTT1VSQ0VfRElSXCIpLnJlc29sdmUoc2NyaXB0KTtcbiAgICBTY29wZUhlbHBlci5zZXQobmV3VmFyaWFibGVNYXAsIFwiU0NSSVBUX0ZJTEVcIiwgc2NyaXB0RmlsZSk7XG4gICAgU2NvcGVIZWxwZXIuc2V0KG5ld1ZhcmlhYmxlTWFwLCBcIlNDUklQVF9ESVJcIiwgc2NyaXB0RmlsZS5kaXJuYW1lKCkpO1xuICAgIHJldHVybiB0aGlzLl90cmFuc3BvcnQucmVxdWVzdFN5bmMoTUFJTk5PREVfRVhFQ1VURVNDUklQVCwgU2NvcGVIZWxwZXIudG9KU09OKG5ld1ZhcmlhYmxlTWFwKSk7XG4gIH1cbiAgXG4gIHB1YmxpYyBhZGRDYWNoZVZhcmlhYmxlcyhwYXJhbXM6IHN0cmluZyB8IFZhcmlhbnRNYXApOiB2b2lkIHtcbiAgICBsb2dnZXIuZGVidWcoXCJSZW1vdGVNYWtlQ29udGV4dC5hZGRDYWNoZVZhcmlhYmxlcyhcIiwgcGFyYW1zLCBcIilcIik7XG4gICAgbGV0IHZhcmlhYmxlcyA9IHBhcmFtcztcbiAgICBpZiAodHlwZW9mIHBhcmFtcyA9PT0gXCJzdHJpbmdcIikge1xuICAgICAgY29uc3QgZmlsZW5hbWUgPSBTY29wZUhlbHBlci5nZXQodGhpcy5fc2NvcGUsIFwiU09VUkNFX0RJUlwiKS5yZXNvbHZlKHBhcmFtcykudG9TdHJpbmcoKTtcbiAgICAgIHZhcmlhYmxlcyA9IHRoaXMuX3RyYW5zcG9ydC5yZXF1ZXN0U3luYyhNQUlOTk9ERV9MT0FESlNPTiwgZmlsZW5hbWUpO1xuICAgIH1cbiAgICBTY29wZUhlbHBlci5kZWZpbmVWYXJpYWJsZXNJblZhcmlhYmxlTWFwKHRoaXMuX3Njb3BlLCBDVVNUT01fVkFSSUFCTEVfR1JPVVAsIHZhcmlhYmxlcyk7XG4gIH1cblxuICBwdWJsaWMgYWRkU3ViZGlyZWN0b3J5KHNvdXJjZURpcjogc3RyaW5nIHwgQWJzb2x1dGVQYXRoLCBiaW5hcnlEaXI/OiBzdHJpbmcgfCBBYnNvbHV0ZVBhdGgpOiB2b2lkIHtcbiAgICBsb2dnZXIuZGVidWcoXCJSZW1vdGVNYWtlQ29udGV4dC5hZGRTdWJkaXJlY3RvcnkoXCIsIHNvdXJjZURpciwgYmluYXJ5RGlyLCBcIilcIik7XG4gICAgY29uc3QgbmV3VmFyaWFibGVNYXAgPSBjcmVhdGVWYXJpYWJsZU1hcEZvckRpcmVjdG9yeSh0aGlzLl9zY29wZSwgc291cmNlRGlyLCBiaW5hcnlEaXIpO1xuICAgIHRoaXMuX3RyYW5zcG9ydC5yZXF1ZXN0U3luYyhNQUlOTk9ERV9TVEFSVE1BS0VTQ1JJUFQsIFNjb3BlSGVscGVyLnRvSlNPTihuZXdWYXJpYWJsZU1hcCkpO1xuICB9XG59O1xuIiwiLypcbiAqIE1JVCBMaWNlbnNlXG4gKlxuICogQ29weXJpZ2h0IChjKSAyMDI1ICBZdXJpaSBZYWt1YmluICh5dXJpaS55YWt1YmluQGdtYWlsLmNvbSlcbiAqXG4gKiBQZXJtaXNzaW9uIGlzIGdyYW50ZWQgdG8gdXNlLCBjb3B5LCBtb2RpZnksIGFuZCBkaXN0cmlidXRlIHRoaXMgc29mdHdhcmVcbiAqIHVuZGVyIHRoZSBNSVQgTGljZW5zZS4gU2VlIExJQ0VOU0UgZmlsZSBmb3IgZGV0YWlscy5cbiAqL1xuXG5leHBvcnQgY29uc3QgV09SS0VSTk9ERV9TVEFSVE1BS0VTQ1JJUFQgPSBcIldvcmtlck5vZGUuc3RhcnRNYWtlU2NyaXB0XCI7XG5cbmV4cG9ydCBjb25zdCBNQUlOTk9ERV9MT0FESlNPTiA9IFwiTWFpbk5vZGUubG9hZEpTT05cIjtcbmV4cG9ydCBjb25zdCBNQUlOTk9ERV9FWEVDVVRFU0NSSVBUID0gXCJNYWluTm9kZS5leGVjdXRlU2NyaXB0XCI7XG5leHBvcnQgY29uc3QgTUFJTk5PREVfU1RBUlRNQUtFU0NSSVBUID0gXCJNYWluTm9kZS5zdGFydE1ha2VTY3JpcHRcIjtcbiIsIi8qXG4gKiBNSVQgTGljZW5zZVxuICpcbiAqIENvcHlyaWdodCAoYykgMjAyNSAgWXVyaWkgWWFrdWJpbiAoeXVyaWkueWFrdWJpbkBnbWFpbC5jb20pXG4gKlxuICogUGVybWlzc2lvbiBpcyBncmFudGVkIHRvIHVzZSwgY29weSwgbW9kaWZ5LCBhbmQgZGlzdHJpYnV0ZSB0aGlzIHNvZnR3YXJlXG4gKiB1bmRlciB0aGUgTUlUIExpY2Vuc2UuIFNlZSBMSUNFTlNFIGZpbGUgZm9yIGRldGFpbHMuXG4gKi9cblxuZXhwb3J0IGNvbnN0IEpTT05SUENfVkVSU0lPTiA9IFwiMi4wXCI7XG5leHBvcnQgaW50ZXJmYWNlIElNZXNzYWdlU2VuZGVyIHtcbiAgc2VuZE1lc3NhZ2UobWVzc2FnZTogYW55KTogdm9pZDtcbn07XG5cbmV4cG9ydCBpbnRlcmZhY2UgSU1lc3NhZ2VFbWl0dGVyIHtcbiAgZW1pdE1lc3NhZ2Uoc2VuZGVyOiBJTWVzc2FnZVNlbmRlciwgbWVzc2FnZTogYW55KTogdm9pZDtcbn07XG5cbmV4cG9ydCBpbnRlcmZhY2UgSVJlcXVlc3RTeW5jIHtcbiAgcmVxdWVzdFN5bmMoZGF0YTogYW55KTogYW55O1xufTtcblxuZXhwb3J0IGludGVyZmFjZSBJSnNvblJwY1JlY2l2ZXIge1xuICBvblJlcXVlc3QobWV0aG9kOiBzdHJpbmcsIGlkOiBudW1iZXIsIHBhcmFtcz86IGFueSk6IHZvaWQ7XG4gIG9uUmVzdWx0KHJlc3VsdDogYW55LCBpZDogbnVtYmVyKTogdm9pZDtcbiAgb25FcnJvcihlcnJvcjogb2JqZWN0LCBpZDogbnVtYmVyIHwgbnVsbCk6IHZvaWQ7XG4gIG9uTm90aWZpY2F0aW9uKG1ldGhvZDogc3RyaW5nLCBwYXJhbXM/OiBhbnkpOiB2b2lkO1xufTtcblxuZXhwb3J0IGludGVyZmFjZSBJSnNvblJwY1NlbmRlciB7XG4gIC8vIHNlbmRNZXRob2QobWV0aG9kOiBzdHJpbmcsIHBhcmFtcz86IGFueSwgY2FsbGJhY2s6ICgpKTogdm9pZDtcbn07XG5cbmV4cG9ydCBpbnRlcmZhY2UgSnNvblJwY0RhdGEge1xuICBqc29ucnBjOiBzdHJpbmc7XG4gIG1ldGhvZD86IHN0cmluZztcbiAgcGFyYW1zPzogYW55O1xuICBpZD86IG51bWJlcjtcbiAgZXJyb3I/OiB7XG4gICAgY29kZTogbnVtYmVyLFxuICAgIG1lc3NhZ2U6IHN0cmluZyxcbiAgICBkYXRhPzogYW55LFxuICB9LFxuICByZXN1bHQ/OiBhbnk7XG59O1xuXG5leHBvcnQgdHlwZSBKc29uUnBjUmVxdWVzdEhhbmRsZXIgPSAocmVxdWVzdDogSUpzb25ScGNSZXF1ZXN0LCByZXNwb25zZTogSUpzb25ScGNSZXNwb25zZSkgPT4gdm9pZDtcbmV4cG9ydCB0eXBlIEpzb25ScGNDYWxsYmFjayA9IChwYXJhbXM6IGFueSkgPT4gYW55O1xuXG5leHBvcnQgaW50ZXJmYWNlIElKc29uUnBjUmVxdWVzdCB7XG4gIGdldCBwYXJhbXMoKTogYW55O1xufTtcblxuZXhwb3J0IGludGVyZmFjZSBJSnNvblJwY1Jlc3BvbnNlIHtcbiAgc2VuZFJlc3VsdChqc29uOiBhbnkpOiB2b2lkO1xufTtcbiIsIi8qXG4gKiBNSVQgTGljZW5zZVxuICpcbiAqIENvcHlyaWdodCAoYykgMjAyNSAgWXVyaWkgWWFrdWJpbiAoeXVyaWkueWFrdWJpbkBnbWFpbC5jb20pXG4gKlxuICogUGVybWlzc2lvbiBpcyBncmFudGVkIHRvIHVzZSwgY29weSwgbW9kaWZ5LCBhbmQgZGlzdHJpYnV0ZSB0aGlzIHNvZnR3YXJlXG4gKiB1bmRlciB0aGUgTUlUIExpY2Vuc2UuIFNlZSBMSUNFTlNFIGZpbGUgZm9yIGRldGFpbHMuXG4gKi9cblxuaW1wb3J0IHsgSU1lc3NhZ2VTZW5kZXIsIElNZXNzYWdlRW1pdHRlciB9IGZyb20gXCJAL3NlcnZlci9UcmFuc3BvcnRcIjtcbmltcG9ydCB7IE1lbW9yeVRyYW5zcG9ydCB9IGZyb20gXCJAL3NlcnZlci9NZW1vcnlUcmFuc3BvcnRcIjtcbmltcG9ydCB7IEpzb25ScGNTZXJ2ZXIgfSBmcm9tIFwiQC9zZXJ2ZXIvSnNvblJwY1NlcnZlclwiO1xuaW1wb3J0IHsgV29ya2VyTm9kZSB9IGZyb20gXCJAL3NlcnZlci9Xb3JrZXJOb2RlXCI7XG5pbXBvcnQgeyBXT1JLRVJOT0RFX1NUQVJUTUFLRVNDUklQVCB9IGZyb20gXCJAL3NlcnZlci9SZW1vdGVNZXRob2RzXCI7XG5pbXBvcnQgeyBMb2dnZXIgfSBmcm9tIFwiQC9sb2dnZXJcIjtcblxuY29uc3QgbG9nZ2VyID0gTG9nZ2VyLmNyZWF0ZShpbXBvcnQubWV0YS51cmwpO1xuXG5leHBvcnQgY2xhc3MgV29ya2VyTG9vcGVyIGltcGxlbWVudHMgSU1lc3NhZ2VFbWl0dGVyIHtcbiAgcHJpdmF0ZSBfanNvbnJwY1NlcnZlcjogSnNvblJwY1NlcnZlcjtcblxuICBwdWJsaWMgY29uc3RydWN0b3Ioc2VuZGVyOiBJTWVzc2FnZVNlbmRlcikge1xuICAgIHRoaXMuX2pzb25ycGNTZXJ2ZXIgPSBuZXcgSnNvblJwY1NlcnZlcjtcblxuICAgIGNvbnN0IGJ1ZmZlciA9IG5ldyBTaGFyZWRBcnJheUJ1ZmZlcigweDgwMDApO1xuICAgIGNvbnN0IHRyYW5zcG9ydCA9IG5ldyBNZW1vcnlUcmFuc3BvcnQoc2VuZGVyLCBidWZmZXIpO1xuXG4gICAgY29uc3Qgd29ya2VyTm9kZSA9IG5ldyBXb3JrZXJOb2RlKHRyYW5zcG9ydCk7XG4gICAgdGhpcy5fanNvbnJwY1NlcnZlci5yZWdpc3RlckNhbGxiYWNrKFdPUktFUk5PREVfU1RBUlRNQUtFU0NSSVBULCBwYXJhbXMgPT4gd29ya2VyTm9kZS5leGVjTWFrZVNjcmlwdChwYXJhbXMpKTtcbiAgfVxuXG4gIHB1YmxpYyBlbWl0TWVzc2FnZShzZW5kZXI6IElNZXNzYWdlU2VuZGVyLCBtZXNzYWdlOiBhbnkpOiB2b2lkIHtcbiAgICByZXR1cm4gdGhpcy5fanNvbnJwY1NlcnZlci5lbWl0TWVzc2FnZShzZW5kZXIsIG1lc3NhZ2UpO1xuICB9XG59O1xuIiwiLypcbiAqIE1JVCBMaWNlbnNlXG4gKlxuICogQ29weXJpZ2h0IChjKSAyMDI1ICBZdXJpaSBZYWt1YmluICh5dXJpaS55YWt1YmluQGdtYWlsLmNvbSlcbiAqXG4gKiBQZXJtaXNzaW9uIGlzIGdyYW50ZWQgdG8gdXNlLCBjb3B5LCBtb2RpZnksIGFuZCBkaXN0cmlidXRlIHRoaXMgc29mdHdhcmVcbiAqIHVuZGVyIHRoZSBNSVQgTGljZW5zZS4gU2VlIExJQ0VOU0UgZmlsZSBmb3IgZGV0YWlscy5cbiAqL1xuXG5pbXBvcnQgeyBJUmVxdWVzdFN5bmMgfSBmcm9tIFwiQC9zZXJ2ZXIvVHJhbnNwb3J0XCI7XG5pbXBvcnQgeyBKc29uUnBjUmVxdWVzdFN5bmMgfSBmcm9tIFwiQC9zZXJ2ZXIvSnNvblJwY1JlcXVlc3RTeW5jXCI7XG5pbXBvcnQgeyBSZW1vdGVNYWtlQ29udGV4dCB9IGZyb20gXCJAL3NlcnZlci9SZW1vdGVNYWtlQ29udGV4dFwiO1xuaW1wb3J0IHsgVXNlck1ha2VDb250ZXh0IH0gZnJvbSBcIkAvY29yZS9Vc2VyTWFrZUNvbnRleHRcIjtcbmltcG9ydCB7IHBlcmZvcm1Db250ZXh0IH0gZnJvbSBcIkAvY29yZS9CYXNlQ29udGV4dFwiO1xuaW1wb3J0IHsgU2NvcGVIZWxwZXIgfSBmcm9tIFwiQC9jb3JlL1Njb3BlXCI7XG5cbmV4cG9ydCBjbGFzcyBXb3JrZXJOb2RlIHtcbiAgcHJpdmF0ZSBfdHJhbnNwb3J0OiBKc29uUnBjUmVxdWVzdFN5bmM7XG5cbiAgcHVibGljIGNvbnN0cnVjdG9yKHJlcXVlc3RTeW5jOiBJUmVxdWVzdFN5bmMpIHtcbiAgICB0aGlzLl90cmFuc3BvcnQgPSBuZXcgSnNvblJwY1JlcXVlc3RTeW5jKHJlcXVlc3RTeW5jKTtcbiAgfVxuXG4gIHB1YmxpYyBhc3luYyBleGVjTWFrZVNjcmlwdChwYXJhbXM6IGFueSk6IFByb21pc2U8dm9pZD4ge1xuICAgIGNvbnN0IHZhcmlhYmxlTWFwID0gU2NvcGVIZWxwZXIuZnJvbUpTT04ocGFyYW1zKTtcblxuICAgIGNvbnN0IG1rID0gVXNlck1ha2VDb250ZXh0LmNyZWF0ZShuZXcgUmVtb3RlTWFrZUNvbnRleHQodmFyaWFibGVNYXAsIHRoaXMuX3RyYW5zcG9ydCksIHZhcmlhYmxlTWFwKTtcbiAgICBhd2FpdCBwZXJmb3JtQ29udGV4dChtayk7XG4gIH1cbn07XG4iLCIvKlxuICogTUlUIExpY2Vuc2VcbiAqXG4gKiBDb3B5cmlnaHQgKGMpIDIwMjUgIFl1cmlpIFlha3ViaW4gKHl1cmlpLnlha3ViaW5AZ21haWwuY29tKVxuICpcbiAqIFBlcm1pc3Npb24gaXMgZ3JhbnRlZCB0byB1c2UsIGNvcHksIG1vZGlmeSwgYW5kIGRpc3RyaWJ1dGUgdGhpcyBzb2Z0d2FyZVxuICogdW5kZXIgdGhlIE1JVCBMaWNlbnNlLiBTZWUgTElDRU5TRSBmaWxlIGZvciBkZXRhaWxzLlxuICovXG5cbmltcG9ydCB7IFdvcmtlciB9IGZyb20gXCJub2RlOndvcmtlcl90aHJlYWRzXCI7XG5pbXBvcnQgeyBJTWVzc2FnZVNlbmRlciB9IGZyb20gXCJAL3NlcnZlci9UcmFuc3BvcnRcIjtcbmltcG9ydCB7IExvZ2dlciB9IGZyb20gXCJAL2xvZ2dlclwiO1xuXG5jb25zdCBsb2dnZXIgPSBMb2dnZXIuY3JlYXRlKGltcG9ydC5tZXRhLnVybCk7XG5cbmV4cG9ydCBjbGFzcyBXb3JrZXJTZW5kZXIgaW1wbGVtZW50cyBJTWVzc2FnZVNlbmRlciB7XG4gIHByaXZhdGUgX3dvcmtlcjogV29ya2VyO1xuXG4gIHB1YmxpYyBjb25zdHJ1Y3Rvcih3b3JrZXI6IFdvcmtlcikge1xuICAgIHRoaXMuX3dvcmtlciA9IHdvcmtlcjtcbiAgfVxuXG4gIHB1YmxpYyBzZW5kTWVzc2FnZShtZXNzYWdlOiBhbnkpOiB2b2lkIHtcbiAgICBsb2dnZXIuZGVidWcoXCI8LS1cIiwgbWVzc2FnZSk7XG4gICAgdGhpcy5fd29ya2VyLnBvc3RNZXNzYWdlKG1lc3NhZ2UpO1xuICB9XG59O1xuIiwiLypcbiAqIE1JVCBMaWNlbnNlXG4gKlxuICogQ29weXJpZ2h0IChjKSAyMDI1ICBZdXJpaSBZYWt1YmluICh5dXJpaS55YWt1YmluQGdtYWlsLmNvbSlcbiAqXG4gKiBQZXJtaXNzaW9uIGlzIGdyYW50ZWQgdG8gdXNlLCBjb3B5LCBtb2RpZnksIGFuZCBkaXN0cmlidXRlIHRoaXMgc29mdHdhcmVcbiAqIHVuZGVyIHRoZSBNSVQgTGljZW5zZS4gU2VlIExJQ0VOU0UgZmlsZSBmb3IgZGV0YWlscy5cbiAqL1xuXG5leHBvcnQgbmFtZXNwYWNlIEFyZ3Mge1xuXG5mdW5jdGlvbiB0b09wdGlvbktleShuYW1lOiBzdHJpbmcpIHtcbiAgaWYgKCFuYW1lLnN0YXJ0c1dpdGgoXCItLVwiKSlcbiAgICByZXR1cm4gbnVsbDtcblxuICBuYW1lID0gbmFtZS5zdWJzdHJpbmcoMikudG9Mb3dlckNhc2UoKTtcbiAgaWYgKCFuYW1lLmxlbmd0aClcbiAgICByZXR1cm4gbnVsbDtcblxuICBsZXQga2V5ID0gbmFtZS5jaGFyQXQoMCk7XG4gIGlmICgha2V5Lm1hdGNoKC9bYS16XS8pKVxuICAgIHJldHVybiBudWxsO1xuXG4gIGxldCBoeXBoZW4gPSAwO1xuICBmb3IgKGxldCBpID0gMTsgaSA8IG5hbWUubGVuZ3RoOyBpKyspIHtcbiAgICBjb25zdCBjaCA9IG5hbWUuY2hhckF0KGkpO1xuICAgIGlmIChjaC5tYXRjaCgvW2EtejAtOV0vKSkge1xuICAgICAga2V5ICs9IChoeXBoZW4gPyBjaC50b1VwcGVyQ2FzZSgpIDogY2gpXG4gICAgICBoeXBoZW4gPSAwO1xuICAgIH1cbiAgICBlbHNlIGlmIChjaCA9PSBcIi1cIikge1xuICAgICAgaWYgKCsraHlwaGVuID4gMSlcbiAgICAgICAgcmV0dXJuIG51bGw7XG4gICAgfVxuICB9XG5cbiAgcmV0dXJuIGh5cGhlbiA/IG51bGwgOiBrZXk7XG59XG5cbmV4cG9ydCBmdW5jdGlvbiB0b09iamVjdChhcmdzOiBzdHJpbmdbXSk6IG9iamVjdCB7XG4gIGNvbnN0IHJlc3VsdDogYW55ID0ge307XG5cbiAgbGV0IGxhc3RLZXkgPSBudWxsO1xuICBmb3IgKGNvbnN0IGl0ZXIgb2YgYXJncykge1xuICAgIGlmIChpdGVyLnN0YXJ0c1dpdGgoXCItLVwiKSkge1xuICAgICAgY29uc3Qga2V5ID0gdG9PcHRpb25LZXkoaXRlcik7XG4gICAgICBpZiAoIWtleSlcbiAgICAgICAgdGhyb3cgRXJyb3IoYE9wdGlvbiAke2l0ZXJ9IGlzIG5vdCBzdXBwb3J0ZWRgKTtcbiAgICAgIGlmIChyZXN1bHQuaGFzT3duUHJvcGVydHkoa2V5KSlcbiAgICAgICAgdGhyb3cgRXJyb3IoYENhbm5vdCBzcGVjaWZ5IHRoZSBzYW1lIG9wdGlvbiAnJHtpdGVyfScgbW9yZSB0aGFuIG9uY2VgKTtcbiAgICAgIGxhc3RLZXkgPSBrZXk7XG4gICAgICByZXN1bHRba2V5XSA9IHRydWU7XG4gICAgfVxuICAgIGVsc2UgaWYgKGxhc3RLZXkpIHtcbiAgICAgIGNvbnN0IHZhbHVlID0gcmVzdWx0W2xhc3RLZXldO1xuICAgICAgaWYgKHR5cGVvZiB2YWx1ZSA9PT0gJ2Jvb2xlYW4nKVxuICAgICAgICByZXN1bHRbbGFzdEtleV0gPSBpdGVyO1xuICAgICAgZWxzZSBpZiAodHlwZW9mIHZhbHVlID09PSAnc3RyaW5nJylcbiAgICAgICAgcmVzdWx0W2xhc3RLZXldID0gWyB2YWx1ZSwgaXRlciBdO1xuICAgICAgZWxzZVxuICAgICAgICB2YWx1ZS5wdXNoKGl0ZXIpO1xuICAgIH1cbiAgICBlbHNlIHtcbiAgICAgIHRocm93IEVycm9yKGBOZWVkIHRvIHNwZWNpZnkgdGhlIG9wdGlvbiBuYW1lIGJlZm9yZSAnJHtpdGVyfScgcGFyYW1ldGVyYCk7XG4gICAgfVxuICB9XG5cbiAgcmV0dXJuIHJlc3VsdDtcbn1cblxufSAvLyBuYW1lc3BhY2UgQXJnc1xuIiwiLypcbiAqIE1JVCBMaWNlbnNlXG4gKlxuICogQ29weXJpZ2h0IChjKSAyMDI1ICBZdXJpaSBZYWt1YmluICh5dXJpaS55YWt1YmluQGdtYWlsLmNvbSlcbiAqXG4gKiBQZXJtaXNzaW9uIGlzIGdyYW50ZWQgdG8gdXNlLCBjb3B5LCBtb2RpZnksIGFuZCBkaXN0cmlidXRlIHRoaXMgc29mdHdhcmVcbiAqIHVuZGVyIHRoZSBNSVQgTGljZW5zZS4gU2VlIExJQ0VOU0UgZmlsZSBmb3IgZGV0YWlscy5cbiAqL1xuXG5pbXBvcnQgcGF0aCBmcm9tIFwibm9kZTpwYXRoXCI7XG5pbXBvcnQgZnMgZnJvbSBcIm5vZGU6ZnNcIjtcbmltcG9ydCB7IHNwYXduIH0gZnJvbSBcIm5vZGU6Y2hpbGRfcHJvY2Vzc1wiO1xuaW1wb3J0IHsgTG9nZ2VyIH0gZnJvbSBcIkAvbG9nZ2VyXCI7XG5cbmNvbnN0IGxvZ2dlciA9IExvZ2dlci5jcmVhdGUoaW1wb3J0Lm1ldGEudXJsKTtcblxudHlwZSBSZXN1bHQgPSB7XG4gIHN0YXR1czogbnVtYmVyO1xufTtcblxuZXhwb3J0IGZ1bmN0aW9uIHNwYXduQXN5bmMoY29tbWFuZDogc3RyaW5nLCBhcmdzOiBzdHJpbmdbXSwgb3B0aW9ucz86IGFueSk6IFByb21pc2U8UmVzdWx0PiB7XG4gIGxldCBmZCA9IG51bGw7XG4gIGxldCB2ZXJib3NlID0gZmFsc2U7XG4gIGlmIChvcHRpb25zICYmIG9wdGlvbnMuZXh0cmEpIHtcbiAgICBpZiAob3B0aW9ucy5leHRyYS52ZXJib3NlKVxuICAgICAgdmVyYm9zZSA9IHRydWU7XG4gICAgaWYgKG9wdGlvbnMuZXh0cmEub3V0cHV0KSB7XG4gICAgICBsZXQgbG9nZmlsZSA9IG9wdGlvbnMuZXh0cmEub3V0cHV0O1xuICAgICAgaWYgKCFwYXRoLmlzQWJzb2x1dGUobG9nZmlsZSkgJiYgb3B0aW9ucy5jd2QpIHtcbiAgICAgICAgbG9nZmlsZSA9IHBhdGgucmVzb2x2ZShvcHRpb25zLmN3ZCwgbG9nZmlsZSk7XG4gICAgICB9XG4gICAgICBmZCA9IGZzLm9wZW5TeW5jKGxvZ2ZpbGUsIFwidytcIiwgMG82NjYpO1xuICAgIH1cbiAgfVxuICByZXR1cm4gbmV3IFByb21pc2UoKHJlc29sdmUsIHJlamVjdCkgPT4ge1xuICAgIGlmIChmZCB8fCB2ZXJib3NlKSB7XG4gICAgICB2ZXJib3NlICYmIGxvZ2dlci5ub3RpY2UoWyBwYXRoLmJhc2VuYW1lKGNvbW1hbmQpLCAuLi5hcmdzIF0uam9pbihcIiBcIikpO1xuICAgICAgZmQgJiYgZnMud3JpdGVTeW5jKGZkLCBKU09OLnN0cmluZ2lmeSh7Y29tbWFuZCwgYXJncywgb3B0aW9ucyB9LCBudWxsLCAyKSArIFwiXFxuXCIpO1xuICAgIH1cbiAgICBjb25zdCBleGVjID0gc3Bhd24oY29tbWFuZCwgYXJncywgb3B0aW9ucyk7XG4gICAgZXhlYy5zdGRvdXQub24oXCJkYXRhXCIsIChkYXRhKSA9PiB7XG4gICAgICBwcm9jZXNzLnN0ZG91dC53cml0ZShkYXRhKTtcbiAgICAgIGZkICYmIGZzLndyaXRlU3luYyhmZCwgZGF0YSk7XG4gICAgfSk7XG4gICAgZXhlYy5zdGRlcnIub24oXCJkYXRhXCIsIChkYXRhKSA9PiB7XG4gICAgICBwcm9jZXNzLnN0ZGVyci53cml0ZShkYXRhKTtcbiAgICAgIGZkICYmIGZzLndyaXRlU3luYyhmZCwgZGF0YSk7XG4gICAgfSk7XG4gICAgZXhlYy5vbihcImNsb3NlXCIsIChzdGF0dXM6IG51bWJlcikgPT4ge1xuICAgICAgZmQgJiYgZnMuY2xvc2VTeW5jKGZkKTtcbiAgICAgIHJlc29sdmUoe3N0YXR1c30pO1xuICAgIH0pO1xuICB9KTtcbn1cbiIsIi8qXG4gKiBNSVQgTGljZW5zZVxuICpcbiAqIENvcHlyaWdodCAoYykgMjAyNSAgWXVyaWkgWWFrdWJpbiAoeXVyaWkueWFrdWJpbkBnbWFpbC5jb20pXG4gKlxuICogUGVybWlzc2lvbiBpcyBncmFudGVkIHRvIHVzZSwgY29weSwgbW9kaWZ5LCBhbmQgZGlzdHJpYnV0ZSB0aGlzIHNvZnR3YXJlXG4gKiB1bmRlciB0aGUgTUlUIExpY2Vuc2UuIFNlZSBMSUNFTlNFIGZpbGUgZm9yIGRldGFpbHMuXG4gKi9cblxuaW1wb3J0IGZzIGZyb20gXCJub2RlOmZzXCI7XG5pbXBvcnQgcGF0aCBmcm9tIFwibm9kZTpwYXRoXCI7XG5pbXBvcnQgdXJsIGZyb20gXCJub2RlOnVybFwiO1xuXG5pbXBvcnQgeyBGSUxFX1NDSEVNRSwgSU1QT1JUX1NDSEVNRSwgSFRUUF9TQ0hFTUUsIEhUVFBTX1NDSEVNRSB9IGZyb20gXCJAL3V0aWxzL1VybFNjaGVtZVwiO1xuaW1wb3J0IHsgcmVxdWlyZVJlc29sdmUgfSBmcm9tIFwiQC91dGlscy9Nb2R1bGVcIjtcblxuZXhwb3J0IGFzeW5jIGZ1bmN0aW9uIHBhdGhFeGlzdHMocGF0aDogc3RyaW5nKSB7XG4gIHRyeSB7XG4gICAgcmV0dXJuICEhKGF3YWl0IGZzLnByb21pc2VzLnN0YXQocGF0aCkpO1xuICB9IGNhdGNoIHtcbiAgICByZXR1cm4gZmFsc2U7XG4gIH1cbn1cblxuZXhwb3J0IGZ1bmN0aW9uIHBhdGhFeGlzdHNTeW5jKHBhdGg6IHN0cmluZykge1xuICB0cnkge1xuICAgIHJldHVybiAhIWZzLnN0YXRTeW5jKHBhdGgpO1xuICB9IGNhdGNoIHtcbiAgICByZXR1cm4gZmFsc2U7XG4gIH1cbn1cblxuZXhwb3J0IGFzeW5jIGZ1bmN0aW9uIGZpbGVFeGlzdHMocGF0aDogc3RyaW5nKSB7XG4gIHRyeSB7XG4gICAgcmV0dXJuIChhd2FpdCBmcy5wcm9taXNlcy5zdGF0KHBhdGgpKS5pc0ZpbGUoKTtcbiAgfSBjYXRjaCB7XG4gICAgcmV0dXJuIGZhbHNlO1xuICB9XG59XG5cbmV4cG9ydCBmdW5jdGlvbiBmaWxlRXhpc3RzU3luYyhwYXRoOiBzdHJpbmcpIHtcbiAgdHJ5IHtcbiAgICByZXR1cm4gZnMuc3RhdFN5bmMocGF0aCkuaXNGaWxlKCk7XG4gIH0gY2F0Y2gge1xuICAgIHJldHVybiBmYWxzZTtcbiAgfSBcbn1cblxuZXhwb3J0IGFzeW5jIGZ1bmN0aW9uIGRpcmVjdG9yeUV4aXN0cyhwYXRoOiBzdHJpbmcpIHtcbiAgdHJ5IHtcbiAgICByZXR1cm4gKGF3YWl0IGZzLnByb21pc2VzLnN0YXQocGF0aCkpLmlzRGlyZWN0b3J5KCk7XG4gIH0gY2F0Y2gge1xuICAgIHJldHVybiBmYWxzZTtcbiAgfVxufVxuXG5leHBvcnQgZnVuY3Rpb24gZGlyZWN0b3J5RXhpc3RzU3luYyhwYXRoOiBzdHJpbmcpIHtcbiAgdHJ5IHtcbiAgIHJldHVybiBmcy5zdGF0U3luYyhwYXRoKS5pc0RpcmVjdG9yeSgpO1xuICB9IGNhdGNoIHtcbiAgICByZXR1cm4gZmFsc2U7XG4gIH1cbn1cblxuZXhwb3J0IGZ1bmN0aW9uIGV4dG5hbWUoZnVsbHBhdGg6IHN0cmluZywgb3B0aW9uczogYW55KSB7XG4gIGlmIChvcHRpb25zPy5sb25nZXN0KSB7XG4gICAgY29uc3QgZmlsZW5hbWUgPSBwYXRoLmJhc2VuYW1lKGZ1bGxwYXRoKTtcbiAgICBjb25zdCBpbmRleCA9IGZpbGVuYW1lLmluZGV4T2YoJy4nKTtcbiAgICByZXR1cm4gaW5kZXggIT0gLTEgPyBmaWxlbmFtZS5zdWJzdHJpbmcoaW5kZXgpIDogJyc7XG4gIH1cblxuICByZXR1cm4gcGF0aC5leHRuYW1lKGZ1bGxwYXRoKTtcbn1cblxuZXhwb3J0IGFzeW5jIGZ1bmN0aW9uIGZpbGVMaXN0KGRpcm5hbWU6IHN0cmluZywgb3B0aW9uczogYW55KTogUHJvbWlzZTxBcnJheTxzdHJpbmc+PiB7XG4gIGNvbnN0IGxpc3QgPSBuZXcgQXJyYXk8c3RyaW5nPjtcbiAgaWYgKGF3YWl0IGRpcmVjdG9yeUV4aXN0cyhkaXJuYW1lKSkge1xuICAgIGZvciAoY29uc3QgaXRlciBvZiBhd2FpdCBmcy5wcm9taXNlcy5yZWFkZGlyKGRpcm5hbWUpKSB7XG4gICAgICBjb25zdCBmaWxlcGF0aCA9IHBhdGgucmVzb2x2ZShkaXJuYW1lLCBpdGVyKTtcbiAgICAgIGNvbnN0IHN0YXQgPSBhd2FpdCBmcy5wcm9taXNlcy5zdGF0KGZpbGVwYXRoKTtcbiAgICAgIGlmIChzdGF0LmlzRmlsZSgpKSB7XG4gICAgICAgIGxpc3QucHVzaChvcHRpb25zLnJlbGF0aXZlID8gcGF0aC5yZWxhdGl2ZShvcHRpb25zLnJlbGF0aXZlLCBmaWxlcGF0aCkgOiBmaWxlcGF0aCk7XG4gICAgICB9XG4gICAgICBlbHNlIGlmIChvcHRpb25zLnJlY3Vyc2l2ZSAmJiBzdGF0LmlzRGlyZWN0b3J5KCkpIHtcbiAgICAgICAgZm9yIChjb25zdCBmbmFtZSBvZiBhd2FpdCBmaWxlTGlzdChmaWxlcGF0aCwgb3B0aW9ucykpXG4gICAgICAgICAgbGlzdC5wdXNoKGZuYW1lKTtcbiAgICAgIH1cbiAgICB9XG4gIH1cbiAgcmV0dXJuIGxpc3Q7XG59XG5cbmV4cG9ydCBhc3luYyBmdW5jdGlvbiBzYXZlSWZEaWZmZXJlbnQoZmlsZW5hbWU6IHN0cmluZywgY29udGVudDogc3RyaW5nKSB7XG4gIGlmIChhd2FpdCBmaWxlRXhpc3RzKGZpbGVuYW1lKSkge1xuICAgIGNvbnN0IG9sZENvbnRlbnQgPSBhd2FpdCBmcy5wcm9taXNlcy5yZWFkRmlsZShmaWxlbmFtZSwgeyBlbmNvZGluZzogXCJ1dGY4XCIgfSk7XG4gICAgaWYgKGNvbnRlbnQgPT0gb2xkQ29udGVudClcbiAgICAgIHJldHVybiBmYWxzZTtcbiAgfVxuXG4gIGF3YWl0IGZzLnByb21pc2VzLm1rZGlyKHBhdGguZGlybmFtZShmaWxlbmFtZSksIHsgcmVjdXJzaXZlOiB0cnVlIH0pO1xuICBhd2FpdCBmcy5wcm9taXNlcy53cml0ZUZpbGUoZmlsZW5hbWUsIGNvbnRlbnQsIHsgZW5jb2Rpbmc6IFwidXRmOFwiIH0pO1xuXG4gIHJldHVybiB0cnVlO1xufVxuXG5leHBvcnQgZnVuY3Rpb24gZ2V0UGF0aFN0cmluZyhzdHI6IHN0cmluZykge1xuICBpZiAoc3RyLnN0YXJ0c1dpdGgoSU1QT1JUX1NDSEVNRSkpXG4gICAgc3RyID0gcmVxdWlyZVJlc29sdmUoc3RyLnNsaWNlKElNUE9SVF9TQ0hFTUUubGVuZ3RoKSk7XG4gIGlmIChzdHIuc3RhcnRzV2l0aChGSUxFX1NDSEVNRSkpXG4gICAgcmV0dXJuIHVybC5maWxlVVJMVG9QYXRoKHN0cik7XG4gIHJldHVybiBzdHI7XG59XG5cbmV4cG9ydCBmdW5jdGlvbiBpc1VSTChzdHI6IHN0cmluZykge1xuICB0cnkge1xuICAgIG5ldyBVUkwoc3RyKTtcbiAgICByZXR1cm4gdHJ1ZTtcbiAgfSBjYXRjaCB7XG4gICAgcmV0dXJuIGZhbHNlO1xuICB9XG59XG5cbmV4cG9ydCBmdW5jdGlvbiBnZXRVUkxTdHJpbmcoc3RyOiBzdHJpbmcpIHtcbiAgaWYgKHN0ci5zdGFydHNXaXRoKElNUE9SVF9TQ0hFTUUpKVxuICAgIHJldHVybiByZXF1aXJlUmVzb2x2ZShzdHIuc2xpY2UoSU1QT1JUX1NDSEVNRS5sZW5ndGgpKTtcbiAgaWYgKGlzVVJMKHN0cikpXG4gICAgcmV0dXJuIHVybC5maWxlVVJMVG9QYXRoKHN0cik7XG4gIHJldHVybiBzdHI7XG59XG5cbmV4cG9ydCBhc3luYyBmdW5jdGlvbiBmZXRjaEJ1ZmZlcihzdHI6IHN0cmluZyk6IFByb21pc2U8QnVmZmVyPiB7XG4gIGlmIChzdHIuc3RhcnRzV2l0aChIVFRQX1NDSEVNRSkgfHwgc3RyLnN0YXJ0c1dpdGgoSFRUUFNfU0NIRU1FKSkge1xuICAgIGNvbnN0IHJlc3BvbnNlID0gYXdhaXQgZmV0Y2goc3RyKTtcbiAgICByZXR1cm4gQnVmZmVyLmZyb20oYXdhaXQgcmVzcG9uc2UuYXJyYXlCdWZmZXIoKSk7XG4gIH1cbiAgcmV0dXJuIGF3YWl0IGZzLnByb21pc2VzLnJlYWRGaWxlKGdldFVSTFN0cmluZyhzdHIpKTtcbn1cblxuZXhwb3J0IGFzeW5jIGZ1bmN0aW9uIHNhdmVBc0pTT04oZmlsZW5hbWU6IHN0cmluZywgdmFsdWU6IGFueSwgb3B0aW9ucz86IHsgcHJldHR5OiBib29sZWFuIH0pIHtcbiAgY29uc3QgY29udGVudCA9IEpTT04uc3RyaW5naWZ5KHZhbHVlLCBudWxsLCBvcHRpb25zICYmIG9wdGlvbnMucHJldHR5ID8gMiA6IDApO1xuICBhd2FpdCBmcy5wcm9taXNlcy5ta2RpcihwYXRoLmRpcm5hbWUoZmlsZW5hbWUpLCB7IHJlY3Vyc2l2ZTogdHJ1ZSB9KTtcbiAgYXdhaXQgZnMucHJvbWlzZXMud3JpdGVGaWxlKGZpbGVuYW1lLCBjb250ZW50LCB7IGVuY29kaW5nOiBcInV0ZjhcIiB9KTtcbn1cbiIsIi8qXG4gKiBNSVQgTGljZW5zZVxuICpcbiAqIENvcHlyaWdodCAoYykgMjAyNSAgWXVyaWkgWWFrdWJpbiAoeXVyaWkueWFrdWJpbkBnbWFpbC5jb20pXG4gKlxuICogUGVybWlzc2lvbiBpcyBncmFudGVkIHRvIHVzZSwgY29weSwgbW9kaWZ5LCBhbmQgZGlzdHJpYnV0ZSB0aGlzIHNvZnR3YXJlXG4gKiB1bmRlciB0aGUgTUlUIExpY2Vuc2UuIFNlZSBMSUNFTlNFIGZpbGUgZm9yIGRldGFpbHMuXG4gKi9cblxuaW1wb3J0IG9zIGZyb20gXCJub2RlOm9zXCI7XG5cbmNvbnN0IHNpemVvZlZvaWRwQml0czogYW55ID1cbntcbiAgYXJtOiAgICAgNCxcbiAgYXJtNjQ6ICAgOCxcbiAgaWEzMjogICAgNCxcbiAgbG9vbmc2NDogOCxcbiAgbWlwczogICAgNCxcbiAgbWlwc2VsOiAgNCxcbiAgcHBjOiAgICAgNCxcbiAgcHBjNjQ6ICAgOCxcbiAgcmlzY3Y2NDogOCxcbiAgczM5MDogICAgNCxcbiAgczM5MHg6ICAgOCxcbiAgeDY0OiAgICAgNCxcbn07XG5cbmNvbnN0IF9zaXplb2ZWb2lkcCA9IHNpemVvZlZvaWRwQml0c1tvcy5hcmNoKCldO1xuaWYgKCFfc2l6ZW9mVm9pZHApXG4gIHRocm93IG5ldyBFcnJvcihgVW5rbm93biAke29zLmFyY2goKX0gYXJjaGApO1xuXG5sZXQgX2V4ZWN1dGFibGVTdWZmaXg6IHN0cmluZztcblxuaWYgKG9zLnBsYXRmb3JtKCkgPT09IFwid2luMzJcIikge1xuICBfZXhlY3V0YWJsZVN1ZmZpeCA9IFwiLmV4ZVwiO1xufVxuZWxzZSB7XG4gIF9leGVjdXRhYmxlU3VmZml4ID0gXCJcIjtcbn1cblxuZXhwb3J0IGNsYXNzIEhvc3Qge1xuICBzdGF0aWMgZ2V0IHNpemVvZlZvaWRwKCk6IDQgfCA4IHtcbiAgICByZXR1cm4gX3NpemVvZlZvaWRwO1xuICB9XG4gIHN0YXRpYyBnZXQgZXhlY3V0YWJsZVN1ZmZpeCgpOiBzdHJpbmcge1xuICAgIHJldHVybiBfZXhlY3V0YWJsZVN1ZmZpeDtcbiAgfVxufTtcbiIsIi8qXG4gKiBNSVQgTGljZW5zZVxuICpcbiAqIENvcHlyaWdodCAoYykgMjAyNSAgWXVyaWkgWWFrdWJpbiAoeXVyaWkueWFrdWJpbkBnbWFpbC5jb20pXG4gKlxuICogUGVybWlzc2lvbiBpcyBncmFudGVkIHRvIHVzZSwgY29weSwgbW9kaWZ5LCBhbmQgZGlzdHJpYnV0ZSB0aGlzIHNvZnR3YXJlXG4gKiB1bmRlciB0aGUgTUlUIExpY2Vuc2UuIFNlZSBMSUNFTlNFIGZpbGUgZm9yIGRldGFpbHMuXG4gKi9cblxuaW1wb3J0IHBhdGggZnJvbSBcIm5vZGU6cGF0aFwiO1xuaW1wb3J0IGZzIGZyb20gXCJub2RlOmZzXCI7XG5pbXBvcnQgaHR0cCBmcm9tIFwiaHR0cFwiO1xuaW1wb3J0IGh0dHBzIGZyb20gXCJodHRwc1wiO1xuXG5pbXBvcnQgeyBMb2dnZXIgfSBmcm9tIFwiQC9sb2dnZXJcIjtcblxuY29uc3QgbG9nZ2VyID0gTG9nZ2VyLmNyZWF0ZShpbXBvcnQubWV0YS51cmwpO1xuXG5pbnRlcmZhY2UgSVJlc29sdmVCdWlsZGVyIHtcbiAgYXBwZW5kKGRhdGE6IEJ1ZmZlcik6IHZvaWQ7XG4gIHRvUmVzdWx0KCk6IEJ1ZmZlciB8IHVuZGVmaW5lZDtcbn07XG5cbmNsYXNzIEJ1ZmZlckJ1aWxkZXIgaW1wbGVtZW50cyBJUmVzb2x2ZUJ1aWxkZXIge1xuICBwcml2YXRlIF9jaHVua3M6IEFycmF5PEJ1ZmZlcj4gPSBbXTtcblxuICBwdWJsaWMgYXBwZW5kKGNodW5rOiBCdWZmZXIpOiB2b2lkIHtcbiAgICB0aGlzLl9jaHVua3MucHVzaChjaHVuayk7XG4gIH1cblxuICBwdWJsaWMgdG9SZXN1bHQoKTogQnVmZmVyIHtcbiAgICByZXR1cm4gQnVmZmVyLmNvbmNhdCh0aGlzLl9jaHVua3MpO1xuICB9XG59O1xuXG5jbGFzcyBGaWxlU3luY1dyaXRlciBpbXBsZW1lbnRzIElSZXNvbHZlQnVpbGRlciB7XG4gIHByaXZhdGUgX2ZkOiBudW1iZXI7XG5cbiAgcHVibGljIGNvbnN0cnVjdG9yKGZpbGU6IHN0cmluZykge1xuICAgIHRoaXMuX2ZkID0gZnMub3BlblN5bmMoZmlsZSwgXCJ3XCIpO1xuICB9XG5cbiAgcHVibGljIGFwcGVuZChjaHVuazogQnVmZmVyKTogdm9pZCB7XG4gICAgZnMud3JpdGVTeW5jKHRoaXMuX2ZkLCBjaHVuayk7XG4gIH1cblxuICBwdWJsaWMgdG9SZXN1bHQoKTogdW5kZWZpbmVkIHtcbiAgICBmcy5jbG9zZVN5bmModGhpcy5fZmQpO1xuICB9XG59O1xuXG5mdW5jdGlvbiBjcmVhdGVCdWlsZGVyKGZpbGU/OiBzdHJpbmcpOiBJUmVzb2x2ZUJ1aWxkZXIge1xuICBpZiAoZmlsZSlcbiAgICByZXR1cm4gbmV3IEZpbGVTeW5jV3JpdGVyKGZpbGUpO1xuICByZXR1cm4gbmV3IEJ1ZmZlckJ1aWxkZXI7XG59XG5cbmZ1bmN0aW9uIGh0dHBSZXF1ZXN0KHVybDogc3RyaW5nLCBvcHRpb25zOiBodHRwLlJlcXVlc3RPcHRpb25zIHwgaHR0cHMuUmVxdWVzdE9wdGlvbnMsIGNhbGxiYWNrOiBhbnkpOiBodHRwLkNsaWVudFJlcXVlc3Qge1xuICBpZiAodXJsLnN0YXJ0c1dpdGgoXCJodHRwczovL1wiKSlcbiAgICByZXR1cm4gaHR0cHMucmVxdWVzdCh1cmwsIG9wdGlvbnMsIGNhbGxiYWNrKTtcbiAgcmV0dXJuIGh0dHAucmVxdWVzdCh1cmwsIG9wdGlvbnMsIGNhbGxiYWNrKTtcbn07XG5cbmludGVyZmFjZSBGZXRjaE9wdGlvbnMge1xuICBhdHRlbXB0cz86IG51bWJlcjtcbn07XG5cbmZ1bmN0aW9uIGZldGNoSW1wbCh1cmw6IHN0cmluZywgZmlsZTogc3RyaW5nIHwgdW5kZWZpbmVkLCBvcHRpb25zOiBGZXRjaE9wdGlvbnMpOiBQcm9taXNlPEJ1ZmZlcnx1bmRlZmluZWQ+IHtcbiAgcmV0dXJuIG5ldyBQcm9taXNlKChyZXNvbHZlLCByZWplY3QpID0+IHtcbiAgICBjb25zdCBodHRwT3B0aW9ucyA9IHtcbiAgICAgIG1ldGhvZDogJ0dFVCcsXG4gICAgICB0aW1lb3V0OiA1MDAwLFxuICAgICAgaGVhZGVyczoge1xuICAgICAgICBcIlVzZXItQWdlbnRcIjogUFJPSkVDVF9OQU1FICsgXCIvXCIgKyBQUk9KRUNUX1ZFUlNJT04sXG4gICAgICAgIFwiQWNjZXB0XCI6IFwiKi8qXCIsXG4gICAgICB9LFxuICAgIH07XG5cbiAgICBsZXQgYXR0ZW1wdHMgPSBvcHRpb25zLmF0dGVtcHRzIHx8IDA7XG4gICAgY29uc3QgZG9SZXF1ZXN0ID0gKHVybDogc3RyaW5nKSA9PiB7XG4gICAgICBjb25zdCByZXF1ZXN0ID0gaHR0cFJlcXVlc3QodXJsLCBodHRwT3B0aW9ucywgb25SZXF1ZXN0KTtcblxuICAgICAgbGV0IGhhc0Vycm9yID0gZmFsc2U7XG4gICAgICBjb25zdCBvbkVycm9yID0gKGVycjogRXJyb3IpID0+IHtcbiAgICAgICAgcmVxdWVzdC5kZXN0cm95KCk7XG4gICAgICAgIGlmICghaGFzRXJyb3IpIHtcbiAgICAgICAgICBoYXNFcnJvciA9IHRydWU7XG4gICAgICAgICAgaWYgKGF0dGVtcHRzID4gMCkge1xuICAgICAgICAgICAgbG9nZ2VyLndhcm4oZXJyLm1lc3NhZ2UpO1xuICAgICAgICAgICAgbG9nZ2VyLmluZm8oYHJlLXdnZXQgJHt1cmx9IGF0dGVtcHRzICR7YXR0ZW1wdHN9YCk7XG4gICAgICAgICAgICBhdHRlbXB0cy0tO1xuICAgICAgICAgICAgZG9SZXF1ZXN0KHVybCk7XG4gICAgICAgICAgfVxuICAgICAgICAgIGVsc2Uge1xuICAgICAgICAgICAgcmVqZWN0KGVycik7XG4gICAgICAgICAgfVxuICAgICAgICB9XG4gICAgICB9O1xuXG4gICAgICByZXF1ZXN0Lm9uKFwidGltZW91dFwiLCAoKSA9PiB7XG4gICAgICAgIG9uRXJyb3IobmV3IEVycm9yKFwiVGltZW91dCBmb3IgXCIgKyB1cmwpKTtcbiAgICAgIH0pO1xuXG4gICAgICByZXF1ZXN0Lm9uKFwiZXJyb3JcIiwgKGVycjogRXJyb3IpID0+IHtcbiAgICAgICAgb25FcnJvcihlcnIpO1xuICAgICAgfSk7XG5cbiAgICAgIHJlcXVlc3QuZW5kKCk7XG4gICAgfTtcblxuICAgIGNvbnN0IGZpbGVuYW1lID0gcGF0aC5iYXNlbmFtZSh1cmwpO1xuICAgIGNvbnN0IG9uUmVxdWVzdCA9IChyZXNwb25zZTogaHR0cC5JbmNvbWluZ01lc3NhZ2UpID0+IHtcbiAgICAgIHN3aXRjaCAocmVzcG9uc2Uuc3RhdHVzQ29kZSkge1xuICAgICAgY2FzZSAyMDA6XG4gICAgICAgIGxvZ2dlci5kZWJ1ZyhgQ29ubmN0ZWQgdG8gJHsocmVzcG9uc2UgYXMgYW55KS5yZXEuaG9zdH1gKTtcbiAgICAgICAgbG9nZ2VyLmRlYnVnKGBEb3dubG9hZGluZyAke2ZpbGVuYW1lfWApO1xuICAgICAgICBjb25zdCBidWlsZGVyID0gY3JlYXRlQnVpbGRlcihmaWxlKTtcbiAgICAgICAgcmVzcG9uc2Uub24oXCJkYXRhXCIsIChjaHVuazogQnVmZmVyKSA9PiBidWlsZGVyLmFwcGVuZChjaHVuaykpO1xuICAgICAgICByZXNwb25zZS5vbihcImVuZFwiLCAoKSA9PiByZXNvbHZlKGJ1aWxkZXIudG9SZXN1bHQoKSkpO1xuICAgICAgICByZXNwb25zZS5vbignY2xvc2UnLCAoKSA9PiBsb2dnZXIuZGVidWcoXCJDbG9zZVwiKSk7XG4gICAgICAgIGJyZWFrO1xuXG4gICAgICBjYXNlIDMwMTpcbiAgICAgIGNhc2UgMzAyOlxuICAgICAgICByZXNwb25zZS5yZXN1bWUoKTtcbiAgICAgICAgaWYgKHJlc3BvbnNlLmhlYWRlcnMubG9jYXRpb24pIHtcbiAgICAgICAgICBsb2dnZXIuaW5mbyhcIlJlZGlyZWN0IHRvIFwiICsgcmVzcG9uc2UuaGVhZGVycy5sb2NhdGlvbik7XG4gICAgICAgICAgZG9SZXF1ZXN0KHJlc3BvbnNlLmhlYWRlcnMubG9jYXRpb24pO1xuICAgICAgICB9XG4gICAgICAgIGJyZWFrO1xuXG4gICAgICBkZWZhdWx0OlxuICAgICAgICByZXNwb25zZS5yZXN1bWUoKTtcbiAgICAgICAgY29uc3QgbWVzc2FnZSA9IFwiRGlkIG5vdCBnZXQgYW4gT0sgZnJvbSB0aGUgc2VydmVyLiBDb2RlOiBcIiArIHJlc3BvbnNlLnN0YXR1c0NvZGU7XG4gICAgICAgIGxvZ2dlci5lcnJvcihtZXNzYWdlKTtcbiAgICAgICAgcmVqZWN0KG1lc3NhZ2UpO1xuICAgICAgICBicmVhaztcbiAgICAgIH1cbiAgICB9O1xuXG4gICAgbG9nZ2VyLmluZm8oXCJ3Z2V0IFwiICsgdXJsKTtcbiAgICBkb1JlcXVlc3QodXJsKTtcbiAgfSk7XG59O1xuXG5leHBvcnQgZnVuY3Rpb24gcmVxdWVzdEdldCh1cmw6IHN0cmluZywgb3B0aW9ucz86IEZldGNoT3B0aW9ucykge1xuICByZXR1cm4gZmV0Y2hJbXBsKHVybCwgdW5kZWZpbmVkLCBvcHRpb25zIHx8IHt9KSBhcyBQcm9taXNlPEJ1ZmZlcj47XG59XG5cbmV4cG9ydCBmdW5jdGlvbiBkb3dubG9hZEZpbGUodXJsOiBzdHJpbmcsIGZpbGU6IHN0cmluZywgb3B0aW9ucz86IEZldGNoT3B0aW9ucykge1xuICByZXR1cm4gZmV0Y2hJbXBsKHVybCwgZmlsZSwgb3B0aW9ucyB8fCB7fSkgYXMgUHJvbWlzZTx1bmRlZmluZWQ+O1xufVxuIiwiLypcbiAqIE1JVCBMaWNlbnNlXG4gKlxuICogQ29weXJpZ2h0IChjKSAyMDI1ICBZdXJpaSBZYWt1YmluICh5dXJpaS55YWt1YmluQGdtYWlsLmNvbSlcbiAqXG4gKiBQZXJtaXNzaW9uIGlzIGdyYW50ZWQgdG8gdXNlLCBjb3B5LCBtb2RpZnksIGFuZCBkaXN0cmlidXRlIHRoaXMgc29mdHdhcmVcbiAqIHVuZGVyIHRoZSBNSVQgTGljZW5zZS4gU2VlIExJQ0VOU0UgZmlsZSBmb3IgZGV0YWlscy5cbiAqL1xuXG5pbXBvcnQgdXJsIGZyb20gXCJub2RlOnVybFwiO1xuXG5leHBvcnQgY29uc3QgaW1wb3J0TW9kdWxlID0gYXN5bmMgKG5hbWUpID0+IGltcG9ydCgvKiB3ZWJwYWNrSWdub3JlOiB0cnVlICovIG5hbWUpO1xuXG5leHBvcnQgZnVuY3Rpb24gaXNFbnRyeVBvaW50KCkge1xuICAvLyBpZiAoT2JqZWN0KGltcG9ydC5tZXRhKS51cmwpXG4gIC8vICAgcmV0dXJuIHVybC5maWxlVVJMVG9QYXRoKE9iamVjdChpbXBvcnQubWV0YSkudXJsKSA9PT0gcHJvY2Vzcy5hcmd2WzFdO1xuICBpZiAodHlwZW9mIHJlcXVpcmUgIT09ICd1bmRlZmluZWQnKVxuICAgIHJldHVybiByZXF1aXJlLm1haW4gPT09IG1vZHVsZTtcbiAgdGhyb3cgbmV3IEVycm9yKFwiTm8gY29tcGF0aWJsZSBtb2R1bGUgcmVzb2x2ZXIgZm91bmRcIik7XG59XG5cbmV4cG9ydCBmdW5jdGlvbiBjdXJyZW50U2NyaXB0VVJMKCkge1xuICAvLyBpZiAoT2JqZWN0KGltcG9ydC5tZXRhKS51cmwpXG4gIC8vICAgcmV0dXJuIHVybC5maWxlVVJMVG9QYXRoKE9iamVjdChpbXBvcnQubWV0YSkudXJsKTtcbiAgaWYgKHR5cGVvZiByZXF1aXJlICE9PSAndW5kZWZpbmVkJylcbiAgICByZXR1cm4gdXJsLnBhdGhUb0ZpbGVVUkwoLyogd2VicGFja0lnbm9yZTogdHJ1ZSAqLyBfX2ZpbGVuYW1lKTtcbiAgdGhyb3cgbmV3IEVycm9yKFwiVW5rbm93biBjdXJyZW50IGZpbGVuYW1lXCIpO1xufVxuIiwiaW1wb3J0IGZzIGZyb20gXCJub2RlOmZzXCI7XG5pbXBvcnQgcGF0aCBmcm9tIFwibm9kZTpwYXRoXCI7XG5cbmltcG9ydCB7IGZpbGVMaXN0IH0gZnJvbSBcIkAvdXRpbHMvRmlsZVN5c3RlbVwiO1xuaW1wb3J0IHsgTG9nZ2VyIH0gZnJvbSBcIkAvbG9nZ2VyXCI7XG5cbmNvbnN0IGxvZ2dlciA9IExvZ2dlci5jcmVhdGUoaW1wb3J0Lm1ldGEudXJsKTtcblxuZXhwb3J0IGFzeW5jIGZ1bmN0aW9uIG1ha2VQYXRjaChzcmNEaXI6IHN0cmluZywgZGVzdERpcjogc3RyaW5nKSB7XG4gIGxvZ2dlci5pbmZvKGBNYWtlIHBhdGNoICR7c3JjRGlyfSB0byAke2Rlc3REaXJ9YCk7XG4gIGNvbnN0IGxpc3QgPSBhd2FpdCBmaWxlTGlzdChzcmNEaXIsIHsgcmVsYXRpdmU6IHNyY0RpciwgcmVjdXJzaXZlOiB0cnVlIH0pO1xuICBmb3IgKGNvbnN0IGl0ZXIgb2YgbGlzdCkge1xuICAgIGNvbnN0IHNvdXJjZSA9IHBhdGgucmVzb2x2ZShzcmNEaXIsIGl0ZXIpO1xuICAgIGNvbnN0IGRlc3RpbmF0aW9uID0gcGF0aC5yZXNvbHZlKGRlc3REaXIsIGl0ZXIpO1xuICAgIGF3YWl0IGZzLnByb21pc2VzLmNwKHNvdXJjZSwgZGVzdGluYXRpb24sIHsgZm9yY2U6IHRydWUgfSk7XG4gICAgbG9nZ2VyLmluZm8oYCBSZXBsYWNlZCAke2l0ZXJ9YCk7XG4gIH1cbn1cbiIsIi8qXG4gKiBNSVQgTGljZW5zZVxuICpcbiAqIENvcHlyaWdodCAoYykgMjAyNSAgWXVyaWkgWWFrdWJpbiAoeXVyaWkueWFrdWJpbkBnbWFpbC5jb20pXG4gKlxuICogUGVybWlzc2lvbiBpcyBncmFudGVkIHRvIHVzZSwgY29weSwgbW9kaWZ5LCBhbmQgZGlzdHJpYnV0ZSB0aGlzIHNvZnR3YXJlXG4gKiB1bmRlciB0aGUgTUlUIExpY2Vuc2UuIFNlZSBMSUNFTlNFIGZpbGUgZm9yIGRldGFpbHMuXG4gKi9cblxuZXhwb3J0IHsgaXNFbnRyeVBvaW50IH0gZnJvbSBcIi4vSW1wb3J0TW9kdWxlLm1qc1wiO1xuZXhwb3J0IHsgaW1wb3J0TW9kdWxlIH0gZnJvbSBcIi4vSW1wb3J0TW9kdWxlLm1qc1wiO1xuZXhwb3J0IHsgY3VycmVudFNjcmlwdFVSTCB9IGZyb20gXCIuL0ltcG9ydE1vZHVsZS5tanNcIjtcblxuZXhwb3J0IGNvbnN0IHJlcXVpcmVTeW5jID0gZXZhbChcInJlcXVpcmVcIikgYXMgTm9kZUpTLlJlcXVpcmU7XG5cbmV4cG9ydCBmdW5jdGlvbiByZXF1aXJlUmVzb2x2ZShuYW1lOiBzdHJpbmcpIHtcbiAgaWYgKHR5cGVvZiBpbXBvcnQubWV0YS5yZXNvbHZlID09PSAnZnVuY3Rpb24nKVxuICAgIHJldHVybiBpbXBvcnQubWV0YS5yZXNvbHZlKG5hbWUpO1xuICBpZiAodHlwZW9mIHJlcXVpcmVTeW5jICE9PSAndW5kZWZpbmVkJylcbiAgICByZXR1cm4gcmVxdWlyZVN5bmMucmVzb2x2ZShuYW1lKTtcbiAgdGhyb3cgbmV3IEVycm9yKFwiTm8gY29tcGF0aWJsZSBtb2R1bGUgcmVzb2x2ZXIgZm91bmRcIik7XG59XG4iLCIvKlxuICogTUlUIExpY2Vuc2VcbiAqXG4gKiBDb3B5cmlnaHQgKGMpIDIwMjUgIFl1cmlpIFlha3ViaW4gKHl1cmlpLnlha3ViaW5AZ21haWwuY29tKVxuICpcbiAqIFBlcm1pc3Npb24gaXMgZ3JhbnRlZCB0byB1c2UsIGNvcHksIG1vZGlmeSwgYW5kIGRpc3RyaWJ1dGUgdGhpcyBzb2Z0d2FyZVxuICogdW5kZXIgdGhlIE1JVCBMaWNlbnNlLiBTZWUgTElDRU5TRSBmaWxlIGZvciBkZXRhaWxzLlxuICovXG5cbmltcG9ydCBvcyBmcm9tIFwibm9kZTpvc1wiO1xuaW1wb3J0IG5vZGVwYXRoIGZyb20gXCJub2RlOnBhdGhcIjtcblxubGV0IG5hdGl2ZVNlcCA9ICBub2RlcGF0aC5wb3NpeC5zZXA7XG5sZXQgb3RoZXJTZXAgPSBub2RlcGF0aC53aW4zMi5zZXA7XG5cbmlmIChvcy5wbGF0Zm9ybSgpID09PSBcIndpbjMyXCIpIHtcbiAgWyBuYXRpdmVTZXAsIG90aGVyU2VwIF0gPSBbIG90aGVyU2VwLCBuYXRpdmVTZXAgXTtcbn1cblxuZXhwb3J0IG5hbWVzcGFjZSBQYXRoIHtcblxuZXhwb3J0IGNvbnN0IHNlcCA9IG5vZGVwYXRoLnBvc2l4LnNlcDtcbmV4cG9ydCBjb25zdCBkZWxpbWl0ZXIgPSBub2RlcGF0aC5kZWxpbWl0ZXI7XG5cbmV4cG9ydCBmdW5jdGlvbiBuYXRpdmVQYXRoKHBhdGg6IHN0cmluZyk6IHN0cmluZyB7XG4gIHJldHVybiBwYXRoLnJlcGxhY2VBbGwob3RoZXJTZXAsIG5hdGl2ZVNlcCk7XG59XG5cbmV4cG9ydCBmdW5jdGlvbiByZXByZXNlbnRQYXRoKHBhdGg6IHN0cmluZyk6IHN0cmluZyB7XG4gIHJldHVybiBwYXRoLnJlcGxhY2VBbGwobm9kZXBhdGgud2luMzIuc2VwLCBub2RlcGF0aC5wb3NpeC5zZXApO1xufVxuXG5leHBvcnQgZnVuY3Rpb24gaXNBYnNvbHV0ZShwYXRoOiBzdHJpbmcpOiBib29sZWFuIHtcbiAgcmV0dXJuIG5vZGVwYXRoLmlzQWJzb2x1dGUobmF0aXZlUGF0aChwYXRoKSk7XG59XG5cbmV4cG9ydCBmdW5jdGlvbiBqb2luKC4uLnBhdGhzOiBzdHJpbmdbXSk6IHN0cmluZyB7XG4gIHJldHVybiByZXByZXNlbnRQYXRoKG5vZGVwYXRoLmpvaW4oLi4ucGF0aHMubWFwKGkgPT4gbmF0aXZlUGF0aChpKSkpKTtcbn1cblxuZXhwb3J0IGZ1bmN0aW9uIHJlc29sdmUoLi4ucGF0aHM6IHN0cmluZ1tdKTogc3RyaW5nIHtcbiAgcmV0dXJuIHJlcHJlc2VudFBhdGgobm9kZXBhdGgucmVzb2x2ZSguLi5wYXRocy5tYXAoaSA9PiBuYXRpdmVQYXRoKGkpKSkpO1xufVxuXG5leHBvcnQgZnVuY3Rpb24gZGlybmFtZShwYXRoOiBzdHJpbmcpOiBzdHJpbmcge1xuICByZXR1cm4gcmVwcmVzZW50UGF0aChub2RlcGF0aC5kaXJuYW1lKG5hdGl2ZVBhdGgocGF0aCkpKTtcbn1cblxuZXhwb3J0IGZ1bmN0aW9uIGJhc2VuYW1lKHBhdGg6IHN0cmluZywgc3VmZml4Pzogc3RyaW5nKTogc3RyaW5nIHtcbiAgcmV0dXJuIHJlcHJlc2VudFBhdGgobm9kZXBhdGguYmFzZW5hbWUobmF0aXZlUGF0aChwYXRoKSwgc3VmZml4KSk7XG59XG5cbmV4cG9ydCBmdW5jdGlvbiByZWxhdGl2ZShmcm9tOiBzdHJpbmcsIHRvOiBzdHJpbmcpOiBzdHJpbmcge1xuICByZXR1cm4gcmVwcmVzZW50UGF0aChub2RlcGF0aC5yZWxhdGl2ZShuYXRpdmVQYXRoKGZyb20pLCBuYXRpdmVQYXRoKHRvKSkpO1xufVxuXG59IC8vIG5hbWVzcGFjZSBQYXRoXG4iLCIvKlxuICogTUlUIExpY2Vuc2VcbiAqXG4gKiBDb3B5cmlnaHQgKGMpIDIwMjUgIFl1cmlpIFlha3ViaW4gKHl1cmlpLnlha3ViaW5AZ21haWwuY29tKVxuICpcbiAqIFBlcm1pc3Npb24gaXMgZ3JhbnRlZCB0byB1c2UsIGNvcHksIG1vZGlmeSwgYW5kIGRpc3RyaWJ1dGUgdGhpcyBzb2Z0d2FyZVxuICogdW5kZXIgdGhlIE1JVCBMaWNlbnNlLiBTZWUgTElDRU5TRSBmaWxlIGZvciBkZXRhaWxzLlxuICovXG5cbmV4cG9ydCBmdW5jdGlvbiBlcXVhbFZhbHVlKGE6IGFueSwgYjogYW55KTogYm9vbGVhbiB7XG4gIGlmIChhID09PSBiKVxuICAgIHJldHVybiB0cnVlO1xuXG4gIGlmIChhID09PSB1bmRlZmluZWQgfHwgYiA9PT0gdW5kZWZpbmVkKVxuICAgIHJldHVybiBmYWxzZTtcblxuICBpZiAodHlwZW9mIGEgIT09IFwib2JqZWN0XCIgfHwgdHlwZW9mIGIgIT09IFwib2JqZWN0XCIpXG4gICAgcmV0dXJuIGZhbHNlO1xuXG4gIGNvbnN0IGsxID0gT2JqZWN0LmtleXMoYSk7XG4gIGNvbnN0IGsyID0gT2JqZWN0LmtleXMoYik7XG5cbiAgaWYgKGsxLmxlbmd0aCAhPSBrMi5sZW5ndGgpXG4gICAgcmV0dXJuIGZhbHNlO1xuXG4gIGZvciAoY29uc3Qga2V5IG9mIGsxKSB7XG4gICAgaWYgKCFPYmplY3QuaGFzT3duKGIsIGtleSkgfHwgIWVxdWFsVmFsdWUoYVtrZXldLCBiW2tleV0pKVxuICAgICAgcmV0dXJuIGZhbHNlO1xuICB9XG5cbiAgcmV0dXJuIHRydWU7XG59XG5cbmV4cG9ydCBmdW5jdGlvbiBkZWVwQ29weShvOiBhbnkpOiBhbnkge1xuICBpZiAoIW8gfHwgdHlwZW9mIG8gIT09IFwib2JqZWN0XCIpXG4gICAgcmV0dXJuIG87XG4gIGlmIChBcnJheS5pc0FycmF5KG8pKSB7XG4gICAgY29uc3QgcmVzdWx0ID0gW107XG4gICAgZm9yIChjb25zdCBpdGVyIG9mIG8pXG4gICAgICByZXN1bHQucHVzaChkZWVwQ29weShpdGVyKSk7XG4gICAgcmV0dXJuIHJlc3VsdDtcbiAgfVxuICBlbHNlIHtcbiAgICBjb25zdCByZXN1bHQgPSB7fSBhcyBhbnk7XG4gICAgZm9yIChjb25zdCBba2V5LHZhbF0gb2YgT2JqZWN0LmVudHJpZXMobykpXG4gICAgICByZXN1bHRba2V5XSA9IGRlZXBDb3B5KHZhbCk7XG4gICAgcmV0dXJuIHJlc3VsdDtcbiAgfVxufVxuXG5leHBvcnQgZnVuY3Rpb24gYXNzaWduT2JqZWN0KHRhcmdldDogYW55LCBzb3VyY2U6IGFueSkge1xuICBpZiAoQXJyYXkuaXNBcnJheSh0YXJnZXQpICYmIEFycmF5LmlzQXJyYXkoc291cmNlKSkge1xuICAgIGZvciAoY29uc3QgaXRlciBvZiBzb3VyY2UpXG4gICAgICB0YXJnZXQucHVzaChpdGVyKTtcbiAgfVxuICBlbHNlIHtcbiAgICBmb3IgKGNvbnN0IGtleSBvZiBPYmplY3Qua2V5cyhzb3VyY2UpKSB7XG4gICAgICBjb25zdCBhID0gdGFyZ2V0W2tleV0sIGIgPSBzb3VyY2Vba2V5XTtcbiAgICAgIGlmIChhICYmIHR5cGVvZiBhID09PSBcIm9iamVjdFwiICYmIGIgJiYgdHlwZW9mIGIgPT09IFwib2JqZWN0XCIpXG4gICAgICAgIGFzc2lnbk9iamVjdChhLCBiKTtcbiAgICAgIGVsc2VcbiAgICAgICAgdGFyZ2V0W2tleV0gPSBkZWVwQ29weShiKTtcbiAgICB9XG4gIH1cbn1cblxuZXhwb3J0IGZ1bmN0aW9uIGFycmF5V3JhcHBlcih2YWx1ZTogYW55KSB7XG4gIGlmICh2YWx1ZSA9PT0gdW5kZWZpbmVkIHx8IEFycmF5LmlzQXJyYXkodmFsdWUpKVxuICAgIHJldHVybiB2YWx1ZTtcbiAgcmV0dXJuIFsgdmFsdWUgXTtcbn1cbiIsIi8qXG4gKiBNSVQgTGljZW5zZVxuICpcbiAqIENvcHlyaWdodCAoYykgMjAyNSAgWXVyaWkgWWFrdWJpbiAoeXVyaWkueWFrdWJpbkBnbWFpbC5jb20pXG4gKlxuICogUGVybWlzc2lvbiBpcyBncmFudGVkIHRvIHVzZSwgY29weSwgbW9kaWZ5LCBhbmQgZGlzdHJpYnV0ZSB0aGlzIHNvZnR3YXJlXG4gKiB1bmRlciB0aGUgTUlUIExpY2Vuc2UuIFNlZSBMSUNFTlNFIGZpbGUgZm9yIGRldGFpbHMuXG4gKi9cblxuaW1wb3J0IGZzIGZyb20gXCJub2RlOmZzXCI7XG5cbmV4cG9ydCBjbGFzcyBTZXR0aW5nc1N0b3JhZ2Uge1xuICBwcml2YXRlIF9maWxlbmFtZTogc3RyaW5nO1xuICBwcml2YXRlIF9zZXR0aW5nczogYW55O1xuICBwcml2YXRlIF9jdXJyZW50OiBhbnk7XG5cbiAgY29uc3RydWN0b3IoZmlsZW5hbWU6IHN0cmluZykge1xuICAgIHRoaXMuX2ZpbGVuYW1lID0gZmlsZW5hbWU7XG4gIH1cblxuICBwdWJsaWMgYXN5bmMgcHVzaChuYW1lOiBzdHJpbmcpIHtcbiAgICBpZiAoIXRoaXMuX3NldHRpbmdzKVxuICAgICAgYXdhaXQgdGhpcy5sb2FkKCk7XG4gICAgbGV0IG9iamVjdCA9IHRoaXMuX2N1cnJlbnQub2JqZWN0W25hbWVdO1xuICAgIGlmICghb2JqZWN0KVxuICAgICAgb2JqZWN0ID0gdGhpcy5fY3VycmVudC5vYmplY3RbbmFtZV0gPSB7fTtcbiAgICB0aGlzLl9jdXJyZW50ID0geyBwYXJlbnQ6IHRoaXMuX2N1cnJlbnQsIG9iamVjdCB9O1xuICB9XG5cbiAgcHVibGljIGFzeW5jIHBvcCgpIHtcbiAgICBpZiAoIXRoaXMuX3NldHRpbmdzKVxuICAgICAgYXdhaXQgdGhpcy5sb2FkKCk7XG4gICAgY29uc29sZS5hc3NlcnQodGhpcy5fY3VycmVudC5wYXJlbnQpO1xuICAgIHRoaXMuX2N1cnJlbnQgPSB0aGlzLl9jdXJyZW50LnBhcmVudDtcbiAgfVxuXG4gIHB1YmxpYyBhc3luYyBnZXQobmFtZTogc3RyaW5nKSB7XG4gICAgaWYgKCF0aGlzLl9zZXR0aW5ncylcbiAgICAgIGF3YWl0IHRoaXMubG9hZCgpO1xuICAgIHJldHVybiB0aGlzLl9jdXJyZW50Lm9iamVjdFtuYW1lXTtcbiAgfVxuXG4gIHB1YmxpYyBhc3luYyBzZXQobmFtZTogc3RyaW5nLCB2YWx1ZTogYW55KSB7XG4gICAgaWYgKCF0aGlzLl9zZXR0aW5ncylcbiAgICAgIGF3YWl0IHRoaXMubG9hZCgpO1xuICAgIHRoaXMuX2N1cnJlbnQub2JqZWN0W25hbWVdID0gdmFsdWU7XG4gICAgYXdhaXQgdGhpcy5zYXZlKCk7XG4gIH1cblxuICBwdWJsaWMgYXN5bmMgbG9hZCgpIHtcbiAgICB0cnkge1xuICAgICAgY29uc3QgY29udGVudCA9IGF3YWl0IGZzLnByb21pc2VzLnJlYWRGaWxlKHRoaXMuX2ZpbGVuYW1lLCBcInV0Zi04XCIpO1xuICAgICAgdGhpcy5fc2V0dGluZ3MgPSBKU09OLnBhcnNlKGNvbnRlbnQpO1xuICAgIH1cbiAgICBjYXRjaCAoZSkge1xuICAgICAgdGhpcy5fc2V0dGluZ3MgPSB7fTtcbiAgICB9XG4gICAgdGhpcy5fY3VycmVudCA9XG4gICAge1xuICAgICAgcGFyZW50OiBudWxsLFxuICAgICAgb2JqZWN0OiB0aGlzLl9zZXR0aW5ncyxcbiAgICB9O1xuICB9XG5cbiAgcHVibGljIGFzeW5jIHNhdmUoKSB7XG4gICAgY29uc3Qgc3BhY2UgPSAyO1xuICAgIGNvbnN0IGNvbnRlbnQgPSBKU09OLnN0cmluZ2lmeSh0aGlzLl9zZXR0aW5ncywgdW5kZWZpbmVkLCBzcGFjZSk7XG4gICAgYXdhaXQgZnMucHJvbWlzZXMud3JpdGVGaWxlKHRoaXMuX2ZpbGVuYW1lLCBjb250ZW50LCB7IGVuY29kaW5nOiBcInV0Zi04XCIsIGZsYWc6IFwid1wiLCBmbHVzaDogdHJ1ZSB9KTtcbiAgfVxufTtcbiIsIi8qXG4gKiBNSVQgTGljZW5zZVxuICpcbiAqIENvcHlyaWdodCAoYykgMjAyNSAgWXVyaWkgWWFrdWJpbiAoeXVyaWkueWFrdWJpbkBnbWFpbC5jb20pXG4gKlxuICogUGVybWlzc2lvbiBpcyBncmFudGVkIHRvIHVzZSwgY29weSwgbW9kaWZ5LCBhbmQgZGlzdHJpYnV0ZSB0aGlzIHNvZnR3YXJlXG4gKiB1bmRlciB0aGUgTUlUIExpY2Vuc2UuIFNlZSBMSUNFTlNFIGZpbGUgZm9yIGRldGFpbHMuXG4gKi9cblxuZXhwb3J0IGZ1bmN0aW9uIGVuc3VyZUJvb2xlYW4odmFsdWU6IGFueSkge1xuICBpZiAodHlwZW9mIHZhbHVlID09PSBcImJvb2xlYW5cIilcbiAgICByZXR1cm4gdmFsdWU7XG4gIHRocm93IG5ldyBUeXBlRXJyb3IoYFRoZSAnJHt2YWx1ZX0nIGlzIG5vdCBhIGJvb2xlYW5gKTtcbn1cblxuZXhwb3J0IGZ1bmN0aW9uIGVuc3VyZU51bWJlcih2YWx1ZTogYW55KSB7XG4gIGlmICh0eXBlb2YgdmFsdWUgPT09IFwibnVtYmVyXCIpXG4gICAgcmV0dXJuIHZhbHVlO1xuICB0aHJvdyBuZXcgVHlwZUVycm9yKGBUaGUgJyR7dmFsdWV9JyBpcyBub3QgYSBudW1iZXJgKTtcbn1cblxuZXhwb3J0IGZ1bmN0aW9uIGVuc3VyZVN0cmluZyh2YWx1ZTogYW55KSB7XG4gIGlmICh0eXBlb2YgdmFsdWUgPT09IFwic3RyaW5nXCIpXG4gICAgcmV0dXJuIHZhbHVlO1xuICB0aHJvdyBuZXcgVHlwZUVycm9yKGBUaGUgJyR7dmFsdWV9JyBpcyBub3QgYSBzdHJpbmdgKTtcbn1cblxuZXhwb3J0IGZ1bmN0aW9uIGVuc3VyZUFycmF5KHZhbHVlOiBhbnkpIHtcbiAgaWYgKEFycmF5LmlzQXJyYXkodmFsdWUpKVxuICAgIHJldHVybiBBcnJheS5mcm9tKHZhbHVlKTtcbiAgdGhyb3cgbmV3IFR5cGVFcnJvcihgVGhlICcke3ZhbHVlfScgaXMgbm90IGEgYXJyYXlgKTtcbn1cbiIsIi8qXG4gKiBNSVQgTGljZW5zZVxuICpcbiAqIENvcHlyaWdodCAoYykgMjAyNSAgWXVyaWkgWWFrdWJpbiAoeXVyaWkueWFrdWJpbkBnbWFpbC5jb20pXG4gKlxuICogUGVybWlzc2lvbiBpcyBncmFudGVkIHRvIHVzZSwgY29weSwgbW9kaWZ5LCBhbmQgZGlzdHJpYnV0ZSB0aGlzIHNvZnR3YXJlXG4gKiB1bmRlciB0aGUgTUlUIExpY2Vuc2UuIFNlZSBMSUNFTlNFIGZpbGUgZm9yIGRldGFpbHMuXG4gKi9cblxuZXhwb3J0IGNvbnN0IEZJTEVfU0NIRU1FID0gXCJmaWxlOi8vXCI7XG5leHBvcnQgY29uc3QgSU1QT1JUX1NDSEVNRSA9IFwiaW1wb3J0Oi8vXCI7XG5leHBvcnQgY29uc3QgSFRUUF9TQ0hFTUUgPSBcImh0dHA6Ly9cIjtcbmV4cG9ydCBjb25zdCBIVFRQU19TQ0hFTUUgPSBcImh0dHBzOi8vXCI7XG4iLCJtb2R1bGUuZXhwb3J0cyA9IHJlcXVpcmUoXCJodHRwXCIpOyIsIm1vZHVsZS5leHBvcnRzID0gcmVxdWlyZShcImh0dHBzXCIpOyIsIm1vZHVsZS5leHBvcnRzID0gcmVxdWlyZShcIm5vZGU6Y2hpbGRfcHJvY2Vzc1wiKTsiLCJtb2R1bGUuZXhwb3J0cyA9IHJlcXVpcmUoXCJub2RlOmZzXCIpOyIsIm1vZHVsZS5leHBvcnRzID0gcmVxdWlyZShcIm5vZGU6b3NcIik7IiwibW9kdWxlLmV4cG9ydHMgPSByZXF1aXJlKFwibm9kZTpwYXRoXCIpOyIsIm1vZHVsZS5leHBvcnRzID0gcmVxdWlyZShcIm5vZGU6dXJsXCIpOyIsIm1vZHVsZS5leHBvcnRzID0gcmVxdWlyZShcIm5vZGU6d29ya2VyX3RocmVhZHNcIik7IiwiLy8gVGhlIG1vZHVsZSBjYWNoZVxudmFyIF9fd2VicGFja19tb2R1bGVfY2FjaGVfXyA9IHt9O1xuXG4vLyBUaGUgcmVxdWlyZSBmdW5jdGlvblxuZnVuY3Rpb24gX193ZWJwYWNrX3JlcXVpcmVfXyhtb2R1bGVJZCkge1xuXHQvLyBDaGVjayBpZiBtb2R1bGUgaXMgaW4gY2FjaGVcblx0dmFyIGNhY2hlZE1vZHVsZSA9IF9fd2VicGFja19tb2R1bGVfY2FjaGVfX1ttb2R1bGVJZF07XG5cdGlmIChjYWNoZWRNb2R1bGUgIT09IHVuZGVmaW5lZCkge1xuXHRcdHJldHVybiBjYWNoZWRNb2R1bGUuZXhwb3J0cztcblx0fVxuXHQvLyBDcmVhdGUgYSBuZXcgbW9kdWxlIChhbmQgcHV0IGl0IGludG8gdGhlIGNhY2hlKVxuXHR2YXIgbW9kdWxlID0gX193ZWJwYWNrX21vZHVsZV9jYWNoZV9fW21vZHVsZUlkXSA9IHtcblx0XHQvLyBubyBtb2R1bGUuaWQgbmVlZGVkXG5cdFx0Ly8gbm8gbW9kdWxlLmxvYWRlZCBuZWVkZWRcblx0XHRleHBvcnRzOiB7fVxuXHR9O1xuXG5cdC8vIEV4ZWN1dGUgdGhlIG1vZHVsZSBmdW5jdGlvblxuXHRfX3dlYnBhY2tfbW9kdWxlc19fW21vZHVsZUlkXShtb2R1bGUsIG1vZHVsZS5leHBvcnRzLCBfX3dlYnBhY2tfcmVxdWlyZV9fKTtcblxuXHQvLyBSZXR1cm4gdGhlIGV4cG9ydHMgb2YgdGhlIG1vZHVsZVxuXHRyZXR1cm4gbW9kdWxlLmV4cG9ydHM7XG59XG5cbiIsIi8vIGdldERlZmF1bHRFeHBvcnQgZnVuY3Rpb24gZm9yIGNvbXBhdGliaWxpdHkgd2l0aCBub24taGFybW9ueSBtb2R1bGVzXG5fX3dlYnBhY2tfcmVxdWlyZV9fLm4gPSAobW9kdWxlKSA9PiB7XG5cdHZhciBnZXR0ZXIgPSBtb2R1bGUgJiYgbW9kdWxlLl9fZXNNb2R1bGUgP1xuXHRcdCgpID0+IChtb2R1bGVbJ2RlZmF1bHQnXSkgOlxuXHRcdCgpID0+IChtb2R1bGUpO1xuXHRfX3dlYnBhY2tfcmVxdWlyZV9fLmQoZ2V0dGVyLCB7IGE6IGdldHRlciB9KTtcblx0cmV0dXJuIGdldHRlcjtcbn07IiwiLy8gZGVmaW5lIGdldHRlciBmdW5jdGlvbnMgZm9yIGhhcm1vbnkgZXhwb3J0c1xuX193ZWJwYWNrX3JlcXVpcmVfXy5kID0gKGV4cG9ydHMsIGRlZmluaXRpb24pID0+IHtcblx0Zm9yKHZhciBrZXkgaW4gZGVmaW5pdGlvbikge1xuXHRcdGlmKF9fd2VicGFja19yZXF1aXJlX18ubyhkZWZpbml0aW9uLCBrZXkpICYmICFfX3dlYnBhY2tfcmVxdWlyZV9fLm8oZXhwb3J0cywga2V5KSkge1xuXHRcdFx0T2JqZWN0LmRlZmluZVByb3BlcnR5KGV4cG9ydHMsIGtleSwgeyBlbnVtZXJhYmxlOiB0cnVlLCBnZXQ6IGRlZmluaXRpb25ba2V5XSB9KTtcblx0XHR9XG5cdH1cbn07IiwiX193ZWJwYWNrX3JlcXVpcmVfXy5vID0gKG9iaiwgcHJvcCkgPT4gKE9iamVjdC5wcm90b3R5cGUuaGFzT3duUHJvcGVydHkuY2FsbChvYmosIHByb3ApKSIsIi8vIGRlZmluZSBfX2VzTW9kdWxlIG9uIGV4cG9ydHNcbl9fd2VicGFja19yZXF1aXJlX18uciA9IChleHBvcnRzKSA9PiB7XG5cdGlmKHR5cGVvZiBTeW1ib2wgIT09ICd1bmRlZmluZWQnICYmIFN5bWJvbC50b1N0cmluZ1RhZykge1xuXHRcdE9iamVjdC5kZWZpbmVQcm9wZXJ0eShleHBvcnRzLCBTeW1ib2wudG9TdHJpbmdUYWcsIHsgdmFsdWU6ICdNb2R1bGUnIH0pO1xuXHR9XG5cdE9iamVjdC5kZWZpbmVQcm9wZXJ0eShleHBvcnRzLCAnX19lc01vZHVsZScsIHsgdmFsdWU6IHRydWUgfSk7XG59OyIsIi8qXG4gKiBNSVQgTGljZW5zZVxuICpcbiAqIENvcHlyaWdodCAoYykgMjAyNSAgWXVyaWkgWWFrdWJpbiAoeXVyaWkueWFrdWJpbkBnbWFpbC5jb20pXG4gKlxuICogUGVybWlzc2lvbiBpcyBncmFudGVkIHRvIHVzZSwgY29weSwgbW9kaWZ5LCBhbmQgZGlzdHJpYnV0ZSB0aGlzIHNvZnR3YXJlXG4gKiB1bmRlciB0aGUgTUlUIExpY2Vuc2UuIFNlZSBMSUNFTlNFIGZpbGUgZm9yIGRldGFpbHMuXG4gKi9cblxuLy8vIDxyZWZlcmVuY2UgcGF0aD1cImdsb2JhbC5kLnRzXCIgLz5cblxuaW1wb3J0IHsgaXNFbnRyeVBvaW50IH0gZnJvbSBcIkAvdXRpbHMvTW9kdWxlXCI7XG5pbXBvcnQgKiBhcyBjeHggZnJvbSBcIkAvY3h4XCI7XG5pbXBvcnQgeyBDTWFrZVByb2Nlc3MsIENUZXN0UHJvY2VzcywgU2NyaXB0TW9kZU9wdGlvbnMsIGdldFByb2plY3RJbmZvIH0gZnJvbSBcIkAvY21ha2VcIjtcblxuaW1wb3J0IHsgc3Bhd25Bc3luYyB9IGZyb20gXCJAL3V0aWxzL0NoaWxkUHJvY2Vzc1wiO1xuaW1wb3J0IHsgcmVxdWVzdEdldCwgZG93bmxvYWRGaWxlIH0gZnJvbSBcIkAvdXRpbHMvSHR0cFJlcXVlc3RcIjtcbmltcG9ydCB7IFBhdGggfSBmcm9tIFwiQC91dGlscy9QYXRoXCI7XG5pbXBvcnQgeyBydW5TY3JpcHQgfSBmcm9tIFwiQC9SdW5TY3JpcHRcIjtcblxuZXhwb3J0IGRlZmF1bHQge1xuICBjeHgsXG4gIGNtYWtlOiB7XG4gICAgc2NyaXB0TW9kZTogKHNjcmlwdEZpbGU6IHN0cmluZywgdmFyaWFibGVzOiBvYmplY3QsIG9wdGlvbnM/OiBTY3JpcHRNb2RlT3B0aW9ucykgPT4gQ01ha2VQcm9jZXNzLmdldEluc3RhbmNlKCkuc2NyaXB0TW9kZShzY3JpcHRGaWxlLCB2YXJpYWJsZXMsIG9wdGlvbnMpLFxuICAgIGNvbmZpZ3VyZTogKGFyZ3M6IGFueSkgPT4gQ01ha2VQcm9jZXNzLmdldEluc3RhbmNlKCkuY29uZmlndXJlKGFyZ3MpLFxuICAgIGJ1aWxkOiAoYXJnczogYW55KSA9PiBDTWFrZVByb2Nlc3MuZ2V0SW5zdGFuY2UoKS5idWlsZChhcmdzKSxcbiAgICBpbnN0YWxsOiAoYXJnczogYW55KSA9PiBDTWFrZVByb2Nlc3MuZ2V0SW5zdGFuY2UoKS5pbnN0YWxsKGFyZ3MpLFxuICAgIGV4dHJhY3Q6IChhcmdzOiBhbnkpID0+IENNYWtlUHJvY2Vzcy5nZXRJbnN0YW5jZSgpLmV4dHJhY3QoYXJncyksXG4gICAgY3Rlc3Q6IChhcmdzOiBhbnkpID0+IENUZXN0UHJvY2Vzcy5nZXRJbnN0YW5jZSgpLmN0ZXN0KGFyZ3MpLFxuICAgIGdldFByb2plY3RJbmZvLFxuICB9LFxuICBwcm9jZXNzOiB7XG4gICAgc3Bhd246IHNwYXduQXN5bmMsXG4gIH0sXG4gIHV0aWxzOiB7XG4gICAgcmVxdWVzdEdldCxcbiAgICBkb3dubG9hZEZpbGUsXG4gIH0sXG4gIHBhdGg6IFBhdGgsXG59O1xuXG5pZiAoaXNFbnRyeVBvaW50KCkpIHtcbiAgcnVuU2NyaXB0KCk7XG59XG4iXSwibmFtZXMiOltdLCJzb3VyY2VSb290IjoiIn0=