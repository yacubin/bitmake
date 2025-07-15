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
/* harmony import */ var _logger__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! @/logger */ "./src/logger/index.ts");
/* harmony import */ var _core_AbsolutePath__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! @/core/AbsolutePath */ "./src/core/AbsolutePath.ts");
/* harmony import */ var _utils_Module__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(/*! @/utils/Module */ "./src/utils/Module.ts");
/* harmony import */ var _core_Target__WEBPACK_IMPORTED_MODULE_6__ = __webpack_require__(/*! @/core/Target */ "./src/core/Target.ts");
/* harmony import */ var _Constants__WEBPACK_IMPORTED_MODULE_7__ = __webpack_require__(/*! @/Constants */ "./src/Constants.ts");
/* harmony import */ var _core_CustomScript__WEBPACK_IMPORTED_MODULE_8__ = __webpack_require__(/*! @/core/CustomScript */ "./src/core/CustomScript.ts");
/* harmony import */ var _core_InstallEntity__WEBPACK_IMPORTED_MODULE_9__ = __webpack_require__(/*! @/core/InstallEntity */ "./src/core/InstallEntity.ts");
/* harmony import */ var _core_ScriptCollection__WEBPACK_IMPORTED_MODULE_10__ = __webpack_require__(/*! @/core/ScriptCollection */ "./src/core/ScriptCollection.ts");
/* harmony import */ var _core_TargetName__WEBPACK_IMPORTED_MODULE_11__ = __webpack_require__(/*! @/core/TargetName */ "./src/core/TargetName.ts");
/*
 * MIT License
 *
 * Copyright (c) 2025  Yurii Yakubin (yurii.yakubin@gmail.com)
 *
 * Permission is granted to use, copy, modify, and distribute this software
 * under the MIT License. See LICENSE file for details.
 */












const logger = _logger__WEBPACK_IMPORTED_MODULE_3__.Logger.create("file:///mnt/c/opt/work/source/darkit-sdk/external/bitmake/src/core/BaseContext.ts");
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
function makeBaseTargetOptions(name, scope) {
    return {
        name,
        sourceDir: _core_Scope__WEBPACK_IMPORTED_MODULE_2__.ScopeHelper.get(scope, "SOURCE_DIR"),
        binaryDir: _core_Scope__WEBPACK_IMPORTED_MODULE_2__.ScopeHelper.get(scope, "BINARY_DIR"),
    };
}
function makeTargetOptions(name, scope) {
    return {
        name,
        prefix: "",
        suffix: "",
        linkOptions: [],
        positionIndependentCode: _core_Scope__WEBPACK_IMPORTED_MODULE_2__.ScopeHelper.get(scope, "POSITION_INDEPENDENT_CODE"),
        includes: _core_Scope__WEBPACK_IMPORTED_MODULE_2__.ScopeHelper.get(scope, "INCLUDES"),
        sourceDir: _core_Scope__WEBPACK_IMPORTED_MODULE_2__.ScopeHelper.get(scope, "SOURCE_DIR"),
        binaryDir: _core_Scope__WEBPACK_IMPORTED_MODULE_2__.ScopeHelper.get(scope, "BINARY_DIR"),
    };
}
function makeObjectLibraryOptions(name, scope) {
    const options = makeTargetOptions(name, scope);
    options.prefix = _core_Scope__WEBPACK_IMPORTED_MODULE_2__.ScopeHelper.get(scope, "OBJECT_LIBRARY_PREFIX");
    options.suffix = _core_Scope__WEBPACK_IMPORTED_MODULE_2__.ScopeHelper.get(scope, "OBJECT_LIBRARY_SUFFIX");
    options.linkOptions = _core_Scope__WEBPACK_IMPORTED_MODULE_2__.ScopeHelper.get(scope, "OBJECT_LINKER_FLAGS");
    return options;
}
function makeStaticLibraryOptions(name, scope) {
    const options = makeTargetOptions(name, scope);
    options.prefix = _core_Scope__WEBPACK_IMPORTED_MODULE_2__.ScopeHelper.get(scope, "STATIC_LIBRARY_PREFIX");
    options.suffix = _core_Scope__WEBPACK_IMPORTED_MODULE_2__.ScopeHelper.get(scope, "STATIC_LIBRARY_SUFFIX");
    options.linkOptions = _core_Scope__WEBPACK_IMPORTED_MODULE_2__.ScopeHelper.get(scope, "STATIC_LINKER_FLAGS");
    return options;
}
function makeSharedLibraryOptions(name, scope) {
    const options = makeTargetOptions(name, scope);
    options.prefix = _core_Scope__WEBPACK_IMPORTED_MODULE_2__.ScopeHelper.get(scope, "SHARED_LIBRARY_PREFIX");
    options.suffix = _core_Scope__WEBPACK_IMPORTED_MODULE_2__.ScopeHelper.get(scope, "SHARED_LIBRARY_SUFFIX");
    options.linkOptions = _core_Scope__WEBPACK_IMPORTED_MODULE_2__.ScopeHelper.get(scope, "SHARED_LINKER_FLAGS");
    return options;
}
function makeExecutableOptions(name, scope) {
    const options = makeTargetOptions(name, scope);
    options.suffix = _core_Scope__WEBPACK_IMPORTED_MODULE_2__.ScopeHelper.get(scope, "EXECUTABLE_SUFFIX");
    options.linkOptions = _core_Scope__WEBPACK_IMPORTED_MODULE_2__.ScopeHelper.get(scope, "EXE_LINKER_FLAGS");
    return options;
}
class MakeContext extends GeneralContext {
    _targets = new Map();
    _postTargets = new Map();
    _scriptCollection = _core_ScriptCollection__WEBPACK_IMPORTED_MODULE_10__.ScriptCollection.create();
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
        return _core_Scope__WEBPACK_IMPORTED_MODULE_2__.ScopeHelper.getVariablesByGroup(this._scope, _Constants__WEBPACK_IMPORTED_MODULE_7__.CUSTOM_VARIABLE_GROUP);
    }
    addIncludeDirectories(...dirs) {
        const sourceDir = _core_Scope__WEBPACK_IMPORTED_MODULE_2__.ScopeHelper.get(this._scope, "SOURCE_DIR");
        for (const iter of dirs.flat())
            _core_Scope__WEBPACK_IMPORTED_MODULE_2__.ScopeHelper.get(this._scope, "INCLUDES").push(sourceDir.resolve(iter));
    }
    target(name) {
        let target = this._postTargets.get(name);
        if (!target) {
            const options = makeBaseTargetOptions(name, this._scope);
            target = _core_Target__WEBPACK_IMPORTED_MODULE_6__.PostTarget.create(this._scope, options);
            this._postTargets.set(name, target);
        }
        return target;
    }
    addObjectLibrary(name, ...sources) {
        if (this._targets.has(name))
            throw new Error(`Target "${name}" exists`);
        const options = makeObjectLibraryOptions(name, this._scope);
        const target = _core_Target__WEBPACK_IMPORTED_MODULE_6__.ObjectLibrary.create(this._scope, options);
        this._targets.set(name, target);
        target.addSources(...sources);
        return target;
    }
    addStaticLibrary(name, ...sources) {
        if (this._targets.has(name))
            throw new Error(`Target "${name}" exists`);
        const options = makeStaticLibraryOptions(name, this._scope);
        const target = _core_Target__WEBPACK_IMPORTED_MODULE_6__.StaticLibrary.create(this._scope, options);
        this._targets.set(name, target);
        target.addSources(...sources);
        return target;
    }
    addSharedLibrary(name, ...sources) {
        if (this._targets.has(name))
            throw new Error(`Target "${name}" exists`);
        const options = makeSharedLibraryOptions(name, this._scope);
        const target = _core_Target__WEBPACK_IMPORTED_MODULE_6__.SharedLibrary.create(this._scope, options);
        this._targets.set(name, target);
        target.addSources(...sources);
        return target;
    }
    addExecutable(name, ...sources) {
        if (this._targets.has(name))
            throw new Error(`Target "${name}" exists`);
        const options = makeExecutableOptions(name, this._scope);
        const target = _core_Target__WEBPACK_IMPORTED_MODULE_6__.Executable.create(this._scope, options);
        this._targets.set(name, target);
        target.addSources(...sources);
        return target;
    }
    script(name) {
        let script = this._postScripts.get(name);
        if (!script) {
            script = _core_CustomScript__WEBPACK_IMPORTED_MODULE_8__.PostCustomScript.create(name);
            this._postScripts.set(name, script);
        }
        return script;
    }
    addCustomScript(scriptModule, params) {
        const variableMap = _core_Scope__WEBPACK_IMPORTED_MODULE_2__.ScopeHelper.cloneVariableMap(this._scope);
        _core_Scope__WEBPACK_IMPORTED_MODULE_2__.ScopeHelper.extendVariableMapByValues(variableMap, _Constants__WEBPACK_IMPORTED_MODULE_7__.CUSTOM_VARIABLE_GROUP, params);
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
        const target = _core_CustomScript__WEBPACK_IMPORTED_MODULE_8__.CustomScript.create(options);
        this._scriptCollection.add(target, options.name);
        return target;
    }
    install(value, params) {
        const scope = _core_Scope__WEBPACK_IMPORTED_MODULE_2__.ScopeHelper.createVariableValues(this._scope);
        for (const it of [value].flat()) {
            const iter = (it instanceof _core_MakeInterfaces__WEBPACK_IMPORTED_MODULE_0__.InterfaceTarget) ? _core_TargetName__WEBPACK_IMPORTED_MODULE_11__.TargetName.create(it.targetName) : it;
            const entity = _core_InstallEntity__WEBPACK_IMPORTED_MODULE_9__.InstallEntity.create(scope, iter, params);
            this._installList.push(entity);
        }
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
    const module = await (0,_utils_Module__WEBPACK_IMPORTED_MODULE_5__.importModule)(scriptUrl);
    if (!module.default)
        throw new Error(`Script ${scriptUrl} has not contain a default function`);
    const result = module.default(mk);
    if (result instanceof Promise)
        await result;
}
function createVariableMapForDirectory(variableMap, sourceDir, binaryDir) {
    if (binaryDir === undefined) {
        if (!_core_AbsolutePath__WEBPACK_IMPORTED_MODULE_4__.AbsolutePath.isAbsolute(sourceDir))
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
        this._output = value;
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
/* harmony import */ var _core_Target__WEBPACK_IMPORTED_MODULE_9__ = __webpack_require__(/*! @/core/Target */ "./src/core/Target.ts");
/* harmony import */ var _utils_Module__WEBPACK_IMPORTED_MODULE_10__ = __webpack_require__(/*! @/utils/Module */ "./src/utils/Module.ts");
/* harmony import */ var _logger__WEBPACK_IMPORTED_MODULE_11__ = __webpack_require__(/*! @/logger */ "./src/logger/index.ts");
/* harmony import */ var _core_TargetName__WEBPACK_IMPORTED_MODULE_12__ = __webpack_require__(/*! @/core/TargetName */ "./src/core/TargetName.ts");
/* harmony import */ var _core_ScriptContext__WEBPACK_IMPORTED_MODULE_13__ = __webpack_require__(/*! @/core/ScriptContext */ "./src/core/ScriptContext.ts");
/* harmony import */ var _Scope__WEBPACK_IMPORTED_MODULE_14__ = __webpack_require__(/*! ./Scope */ "./src/core/Scope.ts");
/* harmony import */ var _core_TargetFile__WEBPACK_IMPORTED_MODULE_15__ = __webpack_require__(/*! @/core/TargetFile */ "./src/core/TargetFile.ts");
/* harmony import */ var _core_ExecScriptTask__WEBPACK_IMPORTED_MODULE_16__ = __webpack_require__(/*! @/core/ExecScriptTask */ "./src/core/ExecScriptTask.ts");
/* harmony import */ var _core_SpawnSyncTask__WEBPACK_IMPORTED_MODULE_17__ = __webpack_require__(/*! @/core/SpawnSyncTask */ "./src/core/SpawnSyncTask.ts");
/* harmony import */ var _core_FileInstallationTask__WEBPACK_IMPORTED_MODULE_18__ = __webpack_require__(/*! @/core/FileInstallationTask */ "./src/core/FileInstallationTask.ts");
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





















const logger = _logger__WEBPACK_IMPORTED_MODULE_11__.Logger.create("file:///mnt/c/opt/work/source/darkit-sdk/external/bitmake/src/core/ProjectContext.ts");
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
    if (o instanceof _core_TargetFile__WEBPACK_IMPORTED_MODULE_15__.TargetFile) {
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
        const srcPath = _core_AbsolutePath__WEBPACK_IMPORTED_MODULE_2__.AbsolutePath.create(_Scope__WEBPACK_IMPORTED_MODULE_14__.ScopeHelper.get(variableMap, "SOURCE_DIR").resolve(src));
        const destPath = (dest === null) ? null : _core_AbsolutePath__WEBPACK_IMPORTED_MODULE_2__.AbsolutePath.create(_Scope__WEBPACK_IMPORTED_MODULE_14__.ScopeHelper.get(variableMap, "SOURCE_DIR").resolve(dest));
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
            const variables = (0,_utils_Module__WEBPACK_IMPORTED_MODULE_10__.requireSync)(filename.toString());
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
        const newVariableMap = _Scope__WEBPACK_IMPORTED_MODULE_14__.ScopeHelper.cloneVariableMap(variableMap);
        params && _Scope__WEBPACK_IMPORTED_MODULE_14__.ScopeHelper.extendVariableMapByValues(newVariableMap, "", params);
        const scriptPath = _Scope__WEBPACK_IMPORTED_MODULE_14__.ScopeHelper.get(newVariableMap, "SOURCE_DIR").resolve(script);
        const func = (0,_utils_Module__WEBPACK_IMPORTED_MODULE_10__.requireSync)(scriptPath.toString());
        const mk = _core_ScriptContext__WEBPACK_IMPORTED_MODULE_13__.ScriptContext.create(newVariableMap);
        func(mk);
    }
    writeCacheVariables(filename) {
        const json = JSON.stringify(this[CACHE], null, 2);
        node_fs__WEBPACK_IMPORTED_MODULE_0___default().writeFileSync(filename, json, "utf-8");
    }
    async prepearScriptFile(variableMap) {
        const originSourceDir = _Scope__WEBPACK_IMPORTED_MODULE_14__.ScopeHelper.get(variableMap, "SOURCE_DIR").toString();
        const resolveSourceDir = this.resolveSubdirectory(originSourceDir);
        if (!resolveSourceDir) {
            logger.info(`Source dir "${originSourceDir}" was disabled`);
            return false;
        }
        _Scope__WEBPACK_IMPORTED_MODULE_14__.ScopeHelper.set(variableMap, "SOURCE_DIR", resolveSourceDir);
        if (!_Scope__WEBPACK_IMPORTED_MODULE_14__.ScopeHelper.get(variableMap, "SCRIPT_FILE")) {
            let scriptFile;
            const fileList = [".js", ".mjs"].map(i => "MakeScript" + i);
            for (const filename of fileList) {
                const iter = _Scope__WEBPACK_IMPORTED_MODULE_14__.ScopeHelper.get(variableMap, "SOURCE_DIR").join(filename);
                if (await (0,_utils_FileSystem__WEBPACK_IMPORTED_MODULE_3__.fileExists)(iter.toString())) {
                    scriptFile = iter;
                    break;
                }
            }
            if (!scriptFile)
                throw new Error(`There are no files ${fileList.join(", ")} in "${_Scope__WEBPACK_IMPORTED_MODULE_14__.ScopeHelper.get(variableMap, "SOURCE_DIR")}"`);
            _Scope__WEBPACK_IMPORTED_MODULE_14__.ScopeHelper.set(variableMap, "SCRIPT_FILE", scriptFile);
            _Scope__WEBPACK_IMPORTED_MODULE_14__.ScopeHelper.set(variableMap, "SCRIPT_DIR", _Scope__WEBPACK_IMPORTED_MODULE_14__.ScopeHelper.get(variableMap, "SCRIPT_FILE").dirname());
        }
        this.registerVariableMap(_Scope__WEBPACK_IMPORTED_MODULE_14__.ScopeHelper.get(variableMap, "SCRIPT_FILE").toString(), variableMap);
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
            const ctx = new _core_LocalMakeContext__WEBPACK_IMPORTED_MODULE_8__.LocalMakeContext(variableMap, this);
            contextList.push(ctx);
            const mk = _core_UserMakeContext__WEBPACK_IMPORTED_MODULE_7__.UserMakeContext.create(ctx, variableMap);
            const cwdSave = process.cwd();
            process.chdir(mk.SCRIPT_DIR.toString());
            await (0,_core_BaseContext__WEBPACK_IMPORTED_MODULE_19__.performContext)(mk);
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
            ge.output = script.OUTPUT.toString();
            ge.addDependency(...depends);
            ge.addTask(new _core_ExecScriptTask__WEBPACK_IMPORTED_MODULE_16__.ExecScriptTask(script.variableMap, scriptObj));
            goalList.addTarget(ge);
        }
        const objectFiles = new Map();
        for (const target of this[TARGETS].ENTRIES.values()) {
            for (const it of target.getSourceFileList()) {
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
                const command = target.TARGET_SCOPE[s.LANGUAGE + "_COMPILER"].toString();
                const output = _core_AbsolutePath__WEBPACK_IMPORTED_MODULE_2__.AbsolutePath.create(target.binaryDir.join(relativeObject));
                depends.push(output.toString());
                const ge = new _core_GoalCollection__WEBPACK_IMPORTED_MODULE_6__.GoalTarget;
                ge.message = msg;
                ge.output = output.toString();
                ge.addDependency(...headers);
                ge.addDependency(s.FILE.toPath());
                ge.addTask(new _core_SpawnSyncTask__WEBPACK_IMPORTED_MODULE_17__.SpawnSyncTask(command, args, target.binaryDir.toPath()));
                goalList.addTarget(ge);
            }
            const generalGoal = new _core_GoalCollection__WEBPACK_IMPORTED_MODULE_6__.GoalTarget;
            for (const params of target.preBuildList) {
                const execStruct = resolveTargetCommand(this, params);
                generalGoal.addTask(new _core_SpawnSyncTask__WEBPACK_IMPORTED_MODULE_17__.SpawnSyncTask(execStruct.command, execStruct.args, target.binaryDir.toString()));
            }
            const linkOptions = this[TARGETS].allLinkOptionsOf(target);
            if (target instanceof _core_Target__WEBPACK_IMPORTED_MODULE_9__.ObjectLibrary) {
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
                    generalGoal.addTask(new _core_SpawnSyncTask__WEBPACK_IMPORTED_MODULE_17__.SpawnSyncTask(scope.LINKER, args, target.getFileDir().toString()));
                }
                else {
                    logger.info(`No objects for "${target.targetName}"`);
                }
            }
            if (target instanceof _core_Target__WEBPACK_IMPORTED_MODULE_9__.StaticLibrary) {
                const objs = depends.filter(i => i.endsWith(".o") || i.endsWith(".obj")).map(i => target.getFileDir().relative(i));
                if (objs.length) {
                    const args = ["rc", target.getFileName(), ...objs];
                    generalGoal.message = `Linking CXX static library ${target.getFileName()}`;
                    generalGoal.output = target.getFile().toString();
                    generalGoal.addDependency(...depends);
                    generalGoal.addTask(new _core_SpawnSyncTask__WEBPACK_IMPORTED_MODULE_17__.SpawnSyncTask(scope.AR, args, target.getFileDir().toString()));
                }
                else {
                    logger.info(`No objects for "${target.targetName}"`);
                }
            }
            if (target instanceof _core_Target__WEBPACK_IMPORTED_MODULE_9__.SharedLibrary) {
                throw new Error("Not implemented");
            }
            if (target instanceof _core_Target__WEBPACK_IMPORTED_MODULE_9__.Executable) {
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
                    generalGoal.addTask(new _core_SpawnSyncTask__WEBPACK_IMPORTED_MODULE_17__.SpawnSyncTask(scope.CXX_COMPILER, args, target.getFileDir().toString()));
                }
                else {
                    logger.info(`No objects for "${target.targetName}"`);
                }
            }
            for (const params of target.postBuildList) {
                const execStruct = resolveTargetCommand(this, params);
                generalGoal.addTask(new _core_SpawnSyncTask__WEBPACK_IMPORTED_MODULE_17__.SpawnSyncTask(execStruct.command, execStruct.args, target.binaryDir.toString()));
            }
            goalList.addTarget(generalGoal);
            const worker = new _core_GoalCollection__WEBPACK_IMPORTED_MODULE_6__.GoalTarget(name);
            worker.message = `Built target ${name}`;
            worker.addDependency(target.getFile().toPath());
            goalList.addTarget(worker);
        }
        if (this._installList.length) {
            const worker = new _core_GoalCollection__WEBPACK_IMPORTED_MODULE_6__.GoalTarget(_Constants__WEBPACK_IMPORTED_MODULE_1__.INSTALL_TARGET);
            const fileInstallationTask = new _core_FileInstallationTask__WEBPACK_IMPORTED_MODULE_18__.FileInstallationTask;
            for (const iter of this._installList) {
                let src, dest;
                if (iter.VALUE instanceof _core_AbsolutePath__WEBPACK_IMPORTED_MODULE_2__.AbsolutePath) {
                    if (scope.PREVENT_INSTALL_FILES)
                        continue;
                    src = iter.VALUE;
                    const rfile = iter.BASE_DIR.relative(iter.VALUE);
                    dest = iter.DESTINATION.join(rfile);
                }
                else if (iter.VALUE instanceof _core_TargetName__WEBPACK_IMPORTED_MODULE_12__.TargetName) {
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
/* harmony export */   Executable: () => (/* binding */ Executable),
/* harmony export */   MainTarget: () => (/* binding */ MainTarget),
/* harmony export */   ObjectLibrary: () => (/* binding */ ObjectLibrary),
/* harmony export */   PostTarget: () => (/* binding */ PostTarget),
/* harmony export */   SharedLibrary: () => (/* binding */ SharedLibrary),
/* harmony export */   StaticLibrary: () => (/* binding */ StaticLibrary)
/* harmony export */ });
/* harmony import */ var _core_SourceFile__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! @/core/SourceFile */ "./src/core/SourceFile.ts");
/* harmony import */ var _core_SourceFileList__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! @/core/SourceFileList */ "./src/core/SourceFileList.ts");
/* harmony import */ var _core_TargetName__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! @/core/TargetName */ "./src/core/TargetName.ts");
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
    if (source instanceof _core_TargetObjects__WEBPACK_IMPORTED_MODULE_5__.TargetObjects || source instanceof _core_SourceFile__WEBPACK_IMPORTED_MODULE_0__.SourceFile)
        return source;
    if (typeof source === "string" || _core_AbsolutePath__WEBPACK_IMPORTED_MODULE_6__.AbsolutePath.isAbsolute(source)) {
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
;
class BaseTarget {
    [TARGET_SCOPE];
    _name;
    _sourceDir;
    _binaryDir;
    _includes;
    _definitions;
    _compileOptions;
    _linkOptions;
    _libraries;
    _sources;
    _preBuildList;
    _postBuildList;
    constructor(variableMap, options) {
        const name = options.name;
        if (typeof name !== "string")
            throw new Error(`Target "${name}" is not string type`);
        if (!name)
            throw new Error(`A target with an empty name cannot exist`);
        if ([_Constants__WEBPACK_IMPORTED_MODULE_8__.ALL_TARGET, _Constants__WEBPACK_IMPORTED_MODULE_8__.INSTALL_TARGET].includes(name))
            throw new Error(`Target "${name}" is reserved name`);
        const variables = _core_Scope__WEBPACK_IMPORTED_MODULE_7__.ScopeHelper.createVariableValues(variableMap, _Constants__WEBPACK_IMPORTED_MODULE_8__.SYSTEM_VARIABLE_GROUP);
        this[TARGET_SCOPE] = variables;
        this._name = options.name;
        this._sourceDir = options.sourceDir;
        this._binaryDir = options.binaryDir;
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
    get sourceDir() {
        return this._sourceDir;
    }
    get binaryDir() {
        return this._binaryDir;
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
        for (const iter of normalizeIncludes(this._sourceDir, ...includes))
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
        for (const iter of libraries.flat())
            this._libraries.push({ publicOnly, value: _core_TargetName__WEBPACK_IMPORTED_MODULE_2__.TargetName.create(iter.targetName) });
    }
    getHeaders() {
        const result = new Array;
        for (const iter of this._sources) {
            if (iter.value instanceof _core_SourceFile__WEBPACK_IMPORTED_MODULE_0__.SourceFile && iter.value.HEADER_FILE_ONLY)
                result.push(iter.value);
        }
        return result;
    }
    getSources() {
        return this._sources;
    }
    getSourceFileList() {
        return this._sources.map(i => i.value).filter(i => i instanceof _core_SourceFile__WEBPACK_IMPORTED_MODULE_0__.SourceFile);
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
            return _core_SourceFileList__WEBPACK_IMPORTED_MODULE_1__.SourceFileList.create(scope, result);
        return _core_SourceFileList__WEBPACK_IMPORTED_MODULE_1__.SourceFileList.create(scope, sourceFiles);
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
            sourceDir: this._sourceDir,
            binaryDir: this._binaryDir,
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
    constructor(variableMap, options) {
        super(variableMap, options);
    }
    static create(variableMap, options) {
        return Object.seal(new PostTarget(variableMap, options));
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
;
class MainTarget extends BaseTarget {
    _prefix;
    _suffix;
    _outputName;
    _positionIndependentCode;
    constructor(variableMap, options) {
        super(variableMap, options);
        this._prefix = options.prefix;
        this._suffix = options.suffix;
        this._outputName = options.name;
        this._positionIndependentCode = options.positionIndependentCode;
        this.addIncludesImpl(false, ...options.includes);
        this.addLinkOptionsImpl(false, ...options.linkOptions);
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
        result.prefix = this._prefix;
        result.outputName = this._outputName;
        result.suffix = this._suffix;
        result.positionIndependentCode = this._positionIndependentCode;
        return result;
    }
}
;
class ObjectLibrary extends MainTarget {
    constructor(variableMap, options) {
        super(variableMap, options);
    }
    static create(variableMap, options) {
        return Object.seal(new ObjectLibrary(variableMap, options));
    }
    toJSON() {
        const result = super.toJSON();
        result.type = ObjectLibrary.name;
        return result;
    }
}
;
class StaticLibrary extends MainTarget {
    constructor(variableMap, options) {
        super(variableMap, options);
    }
    static create(variableMap, options) {
        return Object.seal(new StaticLibrary(variableMap, options));
    }
    toJSON() {
        const result = super.toJSON();
        result.type = StaticLibrary.name;
        return result;
    }
}
;
class SharedLibrary extends MainTarget {
    constructor(variableMap, options) {
        super(variableMap, options);
    }
    static create(variableMap, options) {
        return Object.seal(new SharedLibrary(variableMap, options));
    }
    toJSON() {
        const result = super.toJSON();
        result.type = SharedLibrary.name;
        return result;
    }
}
class Executable extends MainTarget {
    constructor(variableMap, options) {
        super(variableMap, options);
    }
    static create(variableMap, options) {
        return Object.seal(new Executable(variableMap, options));
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
/* harmony import */ var _core_UserTargetStruct__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! @/core/UserTargetStruct */ "./src/core/UserTargetStruct.ts");
/* harmony import */ var _logger__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! @/logger */ "./src/logger/index.ts");
/*
 * MIT License
 *
 * Copyright (c) 2025  Yurii Yakubin (yurii.yakubin@gmail.com)
 *
 * Permission is granted to use, copy, modify, and distribute this software
 * under the MIT License. See LICENSE file for details.
 */




const logger = _logger__WEBPACK_IMPORTED_MODULE_3__.Logger.create("file:///mnt/c/opt/work/source/darkit-sdk/external/bitmake/src/core/UserMakeContext.ts");
const SCOPE = Symbol("SCOPE");
const IMPL = Symbol("IMPL");
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
        const target = this[IMPL].target(name);
        return _core_UserTargetStruct__WEBPACK_IMPORTED_MODULE_2__.UserTargetStruct.create(target, this[SCOPE]);
    }
    script(name) {
        return this[IMPL].script(name);
    }
    install(value, params) {
        this[IMPL].install(value, params);
    }
    addObjectLibrary(name, ...sources) {
        const target = this[IMPL].addObjectLibrary(name, ...sources);
        return _core_UserTargetStruct__WEBPACK_IMPORTED_MODULE_2__.UserTargetStruct.create(target, this[SCOPE]);
    }
    addStaticLibrary(name, ...sources) {
        const target = this[IMPL].addStaticLibrary(name, ...sources);
        return _core_UserTargetStruct__WEBPACK_IMPORTED_MODULE_2__.UserTargetStruct.create(target, this[SCOPE]);
    }
    addSharedLibrary(name, ...sources) {
        const target = this[IMPL].addSharedLibrary(name, ...sources);
        return _core_UserTargetStruct__WEBPACK_IMPORTED_MODULE_2__.UserTargetStruct.create(target, this[SCOPE]);
    }
    addExecutable(name, ...sources) {
        const target = this[IMPL].addExecutable(name, ...sources);
        return _core_UserTargetStruct__WEBPACK_IMPORTED_MODULE_2__.UserTargetStruct.create(target, this[SCOPE]);
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
/* harmony import */ var _utils_StrictType__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! @/utils/StrictType */ "./src/utils/StrictType.ts");
/* harmony import */ var _logger__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! @/logger */ "./src/logger/index.ts");
/*
 * MIT License
 *
 * Copyright (c) 2025  Yurii Yakubin (yurii.yakubin@gmail.com)
 *
 * Permission is granted to use, copy, modify, and distribute this software
 * under the MIT License. See LICENSE file for details.
 */



const logger = _logger__WEBPACK_IMPORTED_MODULE_2__.Logger.create("file:///mnt/c/opt/work/source/darkit-sdk/external/bitmake/src/core/UserTargetStruct.ts");
const SCOPE = Symbol("SCOPE");
const IMPL = Symbol("IMPL");
class UserTargetStruct extends _core_MakeInterfaces__WEBPACK_IMPORTED_MODULE_0__.InterfaceTarget {
    [IMPL];
    [SCOPE];
    constructor(impl, scope) {
        super();
        this[IMPL] = impl;
        this[SCOPE] = scope;
    }
    static create(impl, scope) {
        return Object.seal(new UserTargetStruct(impl, scope));
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
//# sourceMappingURL=data:application/json;charset=utf-8;base64,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QUFDLElBQVMsRUFBRSxFQUFFLENBQUMsZ0RBQVksQ0FBQyxXQUFXLEVBQUUsQ0FBQyxTQUFTLENBQUMsSUFBSSxDQUFDO1FBQ3BFLEtBQUssRUFBRSxDQUFDLElBQVMsRUFBRSxFQUFFLENBQUMsZ0RBQVksQ0FBQyxXQUFXLEVBQUUsQ0FBQyxLQUFLLENBQUMsSUFBSSxDQUFDO1FBQzVELE9BQU8sRUFBRSxDQUFDLElBQVMsRUFBRSxFQUFFLENBQUMsZ0RBQVksQ0FBQyxXQUFXLEVBQUUsQ0FBQyxPQUFPLENBQUMsSUFBSSxDQUFDO1FBQ2hFLE9BQU8sRUFBRSxDQUFDLElBQVMsRUFBRSxFQUFFLENBQUMsZ0RBQVksQ0FBQyxXQUFXLEVBQUUsQ0FBQyxPQUFPLENBQUMsSUFBSSxDQUFDO1FBQ2hFLEtBQUssRUFBRSxDQUFDLElBQVMsRUFBRSxFQUFFLENBQUMsZ0RBQVksQ0FBQyxXQUFXLEVBQUUsQ0FBQyxLQUFLLENBQUMsSUFBSSxDQUFDO1FBQzVELGNBQWM7S0FDZjtJQUNELE9BQU8sRUFBRTtRQUNQLEtBQUssRUFBRSwyREFBVTtLQUNsQjtJQUNELEtBQUssRUFBRTtRQUNMLFVBQVU7UUFDVixZQUFZO0tBQ2I7SUFDRCxJQUFJLEVBQUUsNkNBQUk7Q0FDWCxFQUFDO0FBRUYsSUFBSSwyREFBWSxFQUFFLEVBQUUsQ0FBQztJQUNuQixxREFBUyxFQUFFLENBQUM7QUFDZCxDQUFDIiwic291cmNlcyI6WyJ3ZWJwYWNrOi8vYml0bWFrZS93ZWJwYWNrL3VuaXZlcnNhbE1vZHVsZURlZmluaXRpb24iLCJ3ZWJwYWNrOi8vYml0bWFrZS8uL3NyYy9Db25zdGFudHMudHMiLCJ3ZWJwYWNrOi8vYml0bWFrZS8uL3NyYy9SdW5TY3JpcHQudHMiLCJ3ZWJwYWNrOi8vYml0bWFrZS8uL3NyYy9hY3Rpb25zL2JpdG1ha2UudHMiLCJ3ZWJwYWNrOi8vYml0bWFrZS8uL3NyYy9hY3Rpb25zL2NtYWtlLnRzIiwid2VicGFjazovL2JpdG1ha2UvLi9zcmMvYWN0aW9ucy9jb25maWd1cmUudHMiLCJ3ZWJwYWNrOi8vYml0bWFrZS8uL3NyYy9hY3Rpb25zL2luZGV4LnRzIiwid2VicGFjazovL2JpdG1ha2UvLi9zcmMvYWN0aW9ucy9tYWtlLnRzIiwid2VicGFjazovL2JpdG1ha2UvLi9zcmMvYWN0aW9ucy9ub25lLnRzIiwid2VicGFjazovL2JpdG1ha2UvLi9zcmMvYWN0aW9ucy9wcm9jZXNzLnRzIiwid2VicGFjazovL2JpdG1ha2UvLi9zcmMvY21ha2UvQ29uc3RhbnRzLnRzIiwid2VicGFjazovL2JpdG1ha2UvLi9zcmMvY21ha2UvSGVscGVyLnRzIiwid2VicGFjazovL2JpdG1ha2UvLi9zcmMvY21ha2UvaW5kZXgudHMiLCJ3ZWJwYWNrOi8vYml0bWFrZS8uL3NyYy9jb21tYW5kcy9idWlsZC50cyIsIndlYnBhY2s6Ly9iaXRtYWtlLy4vc3JjL2NvbW1hbmRzL2luZGV4LnRzIiwid2VicGFjazovL2JpdG1ha2UvLi9zcmMvY29tbWFuZHMvaW5pdC50cyIsIndlYnBhY2s6Ly9iaXRtYWtlLy4vc3JjL2NvcmUvQWJzb2x1dGVQYXRoLnRzIiwid2VicGFjazovL2JpdG1ha2UvLi9zcmMvY29yZS9CYXNlQ29udGV4dC50cyIsIndlYnBhY2s6Ly9iaXRtYWtlLy4vc3JjL2NvcmUvQnVpbGRpblNjcmlwdHMvY19oZWFkZXIudHMiLCJ3ZWJwYWNrOi8vYml0bWFrZS8uL3NyYy9jb3JlL0J1aWxkaW5TY3JpcHRzL2NvbmZpZ3VyZV9maWxlLnRzIiwid2VicGFjazovL2JpdG1ha2UvLi9zcmMvY29yZS9CdWlsZGluU2NyaXB0cy9pbmRleC50cyIsIndlYnBhY2s6Ly9iaXRtYWtlLy4vc3JjL2NvcmUvQ3VzdG9tU2NyaXB0LnRzIiwid2VicGFjazovL2JpdG1ha2UvLi9zcmMvY29yZS9EZWZpbml0aW9uSGVscGVyLnRzIiwid2VicGFjazovL2JpdG1ha2UvLi9zcmMvY29yZS9EZXRlcm1pbmVDb21waWxlci50cyIsIndlYnBhY2s6Ly9iaXRtYWtlLy4vc3JjL2NvcmUvRXhlY1NjcmlwdFRhc2sudHMiLCJ3ZWJwYWNrOi8vYml0bWFrZS8uL3NyYy9jb3JlL0ZpbGVJbnN0YWxsYXRpb25UYXNrLnRzIiwid2VicGFjazovL2JpdG1ha2UvLi9zcmMvY29yZS9GaW5kUHJvZ3JhbS50cyIsIndlYnBhY2s6Ly9iaXRtYWtlLy4vc3JjL2NvcmUvR29hbENvbGxlY3Rpb24udHMiLCJ3ZWJwYWNrOi8vYml0bWFrZS8uL3NyYy9jb3JlL0luc3RhbGxFbnRpdHkudHMiLCJ3ZWJwYWNrOi8vYml0bWFrZS8uL3NyYy9jb3JlL0xvY2FsTWFrZUNvbnRleHQudHMiLCJ3ZWJwYWNrOi8vYml0bWFrZS8uL3NyYy9jb3JlL01ha2VJbnRlcmZhY2VzLnRzIiwid2VicGFjazovL2JpdG1ha2UvLi9zcmMvY29yZS9QbHVnaW5Db250ZXh0LnRzIiwid2VicGFjazovL2JpdG1ha2UvLi9zcmMvY29yZS9Qcm9qZWN0Q29udGV4dC50cyIsIndlYnBhY2s6Ly9iaXRtYWtlLy4vc3JjL2NvcmUvU2NvcGUudHMiLCJ3ZWJwYWNrOi8vYml0bWFrZS8uL3NyYy9jb3JlL1NjcmlwdENvbGxlY3Rpb24udHMiLCJ3ZWJwYWNrOi8vYml0bWFrZS8uL3NyYy9jb3JlL1NjcmlwdENvbnRleHQudHMiLCJ3ZWJwYWNrOi8vYml0bWFrZS8uL3NyYy9jb3JlL1NpbXBsZU9iamVjdC50cyIsIndlYnBhY2s6Ly9iaXRtYWtlLy4vc3JjL2NvcmUvU291cmNlRmlsZS50cyIsIndlYnBhY2s6Ly9iaXRtYWtlLy4vc3JjL2NvcmUvU291cmNlRmlsZUxpc3QudHMiLCJ3ZWJwYWNrOi8vYml0bWFrZS8uL3NyYy9jb3JlL1NwYXduU3luY1Rhc2sudHMiLCJ3ZWJwYWNrOi8vYml0bWFrZS8uL3NyYy9jb3JlL1N5c3RlbVZhcmlhYmxlcy50cyIsIndlYnBhY2s6Ly9iaXRtYWtlLy4vc3JjL2NvcmUvVGFyZ2V0LnRzIiwid2VicGFjazovL2JpdG1ha2UvLi9zcmMvY29yZS9UYXJnZXRDb2xsZWN0aW9uLnRzIiwid2VicGFjazovL2JpdG1ha2UvLi9zcmMvY29yZS9UYXJnZXRGaWxlLnRzIiwid2VicGFjazovL2JpdG1ha2UvLi9zcmMvY29yZS9UYXJnZXRJbmNsdWRlcy50cyIsIndlYnBhY2s6Ly9iaXRtYWtlLy4vc3JjL2NvcmUvVGFyZ2V0TmFtZS50cyIsIndlYnBhY2s6Ly9iaXRtYWtlLy4vc3JjL2NvcmUvVGFyZ2V0T2JqZWN0cy50cyIsIndlYnBhY2s6Ly9iaXRtYWtlLy4vc3JjL2NvcmUvVG9vbGNoYWluQ29udGV4dC50cyIsIndlYnBhY2s6Ly9iaXRtYWtlLy4vc3JjL2NvcmUvVHlwZXMudHMiLCJ3ZWJwYWNrOi8vYml0bWFrZS8uL3NyYy9jb3JlL1VzZXJNYWtlQ29udGV4dC50cyIsIndlYnBhY2s6Ly9iaXRtYWtlLy4vc3JjL2NvcmUvVXNlclRhcmdldFN0cnVjdC50cyIsIndlYnBhY2s6Ly9iaXRtYWtlLy4vc3JjL2N4eC9pbmRleC50cyIsIndlYnBhY2s6Ly9iaXRtYWtlLy4vc3JjL2xvZ2dlci9pbmRleC50cyIsIndlYnBhY2s6Ly9iaXRtYWtlLy4vc3JjL3NlcnZlci9Kc29uUnBjUmVxdWVzdFN5bmMudHMiLCJ3ZWJwYWNrOi8vYml0bWFrZS8uL3NyYy9zZXJ2ZXIvSnNvblJwY1NlcnZlci50cyIsIndlYnBhY2s6Ly9iaXRtYWtlLy4vc3JjL3NlcnZlci9NYWtlQ2xpZW50LnRzIiwid2VicGFjazovL2JpdG1ha2UvLi9zcmMvc2VydmVyL01ha2VTZXJ2ZXIudHMiLCJ3ZWJwYWNrOi8vYml0bWFrZS8uL3NyYy9zZXJ2ZXIvTWVtb3J5VHJhbnNwb3J0LnRzIiwid2VicGFjazovL2JpdG1ha2UvLi9zcmMvc2VydmVyL01lc3NhZ2VQb3J0U2VuZGVyLnRzIiwid2VicGFjazovL2JpdG1ha2UvLi9zcmMvc2VydmVyL1JlbW90ZU1ha2VDb250ZXh0LnRzIiwid2VicGFjazovL2JpdG1ha2UvLi9zcmMvc2VydmVyL1JlbW90ZU1ldGhvZHMudHMiLCJ3ZWJwYWNrOi8vYml0bWFrZS8uL3NyYy9zZXJ2ZXIvVHJhbnNwb3J0LnRzIiwid2VicGFjazovL2JpdG1ha2UvLi9zcmMvc2VydmVyL1dvcmtlckxvb3Blci50cyIsIndlYnBhY2s6Ly9iaXRtYWtlLy4vc3JjL3NlcnZlci9Xb3JrZXJOb2RlLnRzIiwid2VicGFjazovL2JpdG1ha2UvLi9zcmMvc2VydmVyL1dvcmtlclNlbmRlci50cyIsIndlYnBhY2s6Ly9iaXRtYWtlLy4vc3JjL3V0aWxzL0FyZ3MudHMiLCJ3ZWJwYWNrOi8vYml0bWFrZS8uL3NyYy91dGlscy9DaGlsZFByb2Nlc3MudHMiLCJ3ZWJwYWNrOi8vYml0bWFrZS8uL3NyYy91dGlscy9GaWxlU3lzdGVtLnRzIiwid2VicGFjazovL2JpdG1ha2UvLi9zcmMvdXRpbHMvSG9zdC50cyIsIndlYnBhY2s6Ly9iaXRtYWtlLy4vc3JjL3V0aWxzL0h0dHBSZXF1ZXN0LnRzIiwid2VicGFjazovL2JpdG1ha2UvLi9zcmMvdXRpbHMvSW1wb3J0TW9kdWxlLm1qcyIsIndlYnBhY2s6Ly9iaXRtYWtlLy4vc3JjL3V0aWxzL01ha2VQYXRjaC50cyIsIndlYnBhY2s6Ly9iaXRtYWtlLy4vc3JjL3V0aWxzL01vZHVsZS50cyIsIndlYnBhY2s6Ly9iaXRtYWtlLy4vc3JjL3V0aWxzL1BhdGgudHMiLCJ3ZWJwYWNrOi8vYml0bWFrZS8uL3NyYy91dGlscy9QcmltaXRpdmVzLnRzIiwid2VicGFjazovL2JpdG1ha2UvLi9zcmMvdXRpbHMvU2V0dGluZ3NTdG9yYWdlLnRzIiwid2VicGFjazovL2JpdG1ha2UvLi9zcmMvdXRpbHMvU3RyaWN0VHlwZS50cyIsIndlYnBhY2s6Ly9iaXRtYWtlLy4vc3JjL3V0aWxzL1VybFNjaGVtZS50cyIsIndlYnBhY2s6Ly9iaXRtYWtlL2V4dGVybmFsIG5vZGUtY29tbW9uanMgXCJodHRwXCIiLCJ3ZWJwYWNrOi8vYml0bWFrZS9leHRlcm5hbCBub2RlLWNvbW1vbmpzIFwiaHR0cHNcIiIsIndlYnBhY2s6Ly9iaXRtYWtlL2V4dGVybmFsIG5vZGUtY29tbW9uanMgXCJub2RlOmNoaWxkX3Byb2Nlc3NcIiIsIndlYnBhY2s6Ly9iaXRtYWtlL2V4dGVybmFsIG5vZGUtY29tbW9uanMgXCJub2RlOmZzXCIiLCJ3ZWJwYWNrOi8vYml0bWFrZS9leHRlcm5hbCBub2RlLWNvbW1vbmpzIFwibm9kZTpvc1wiIiwid2VicGFjazovL2JpdG1ha2UvZXh0ZXJuYWwgbm9kZS1jb21tb25qcyBcIm5vZGU6cGF0aFwiIiwid2VicGFjazovL2JpdG1ha2UvZXh0ZXJuYWwgbm9kZS1jb21tb25qcyBcIm5vZGU6dXJsXCIiLCJ3ZWJwYWNrOi8vYml0bWFrZS9leHRlcm5hbCBub2RlLWNvbW1vbmpzIFwibm9kZTp3b3JrZXJfdGhyZWFkc1wiIiwid2VicGFjazovL2JpdG1ha2Uvd2VicGFjay9ib290c3RyYXAiLCJ3ZWJwYWNrOi8vYml0bWFrZS93ZWJwYWNrL3J1bnRpbWUvY29tcGF0IGdldCBkZWZhdWx0IGV4cG9ydCIsIndlYnBhY2s6Ly9iaXRtYWtlL3dlYnBhY2svcnVudGltZS9kZWZpbmUgcHJvcGVydHkgZ2V0dGVycyIsIndlYnBhY2s6Ly9iaXRtYWtlL3dlYnBhY2svcnVudGltZS9oYXNPd25Qcm9wZXJ0eSBzaG9ydGhhbmQiLCJ3ZWJwYWNrOi8vYml0bWFrZS93ZWJwYWNrL3J1bnRpbWUvbWFrZSBuYW1lc3BhY2Ugb2JqZWN0Iiwid2VicGFjazovL2JpdG1ha2UvLi9zcmMvaW5kZXgudHMiXSwic291cmNlc0NvbnRlbnQiOlsiKGZ1bmN0aW9uIHdlYnBhY2tVbml2ZXJzYWxNb2R1bGVEZWZpbml0aW9uKHJvb3QsIGZhY3RvcnkpIHtcblx0aWYodHlwZW9mIGV4cG9ydHMgPT09ICdvYmplY3QnICYmIHR5cGVvZiBtb2R1bGUgPT09ICdvYmplY3QnKVxuXHRcdG1vZHVsZS5leHBvcnRzID0gZmFjdG9yeSgpO1xuXHRlbHNlIGlmKHR5cGVvZiBkZWZpbmUgPT09ICdmdW5jdGlvbicgJiYgZGVmaW5lLmFtZClcblx0XHRkZWZpbmUoW10sIGZhY3RvcnkpO1xuXHRlbHNlIGlmKHR5cGVvZiBleHBvcnRzID09PSAnb2JqZWN0Jylcblx0XHRleHBvcnRzW1wiYml0bWFrZVwiXSA9IGZhY3RvcnkoKTtcblx0ZWxzZVxuXHRcdHJvb3RbXCJiaXRtYWtlXCJdID0gZmFjdG9yeSgpO1xufSkoZ2xvYmFsLCAoKSA9PiB7XG5yZXR1cm4gIiwiLypcbiAqIE1JVCBMaWNlbnNlXG4gKlxuICogQ29weXJpZ2h0IChjKSAyMDI1ICBZdXJpaSBZYWt1YmluICh5dXJpaS55YWt1YmluQGdtYWlsLmNvbSlcbiAqXG4gKiBQZXJtaXNzaW9uIGlzIGdyYW50ZWQgdG8gdXNlLCBjb3B5LCBtb2RpZnksIGFuZCBkaXN0cmlidXRlIHRoaXMgc29mdHdhcmVcbiAqIHVuZGVyIHRoZSBNSVQgTGljZW5zZS4gU2VlIExJQ0VOU0UgZmlsZSBmb3IgZGV0YWlscy5cbiAqL1xuXG5leHBvcnQgY29uc3QgVVNFUl9DT05GSUcgPSBcImJpdG1ha2UuY29uZmlnLm1qc1wiO1xuZXhwb3J0IGNvbnN0IFJFUVVFU1RfQVRURU1QVFMgPSAzMDtcbmV4cG9ydCBjb25zdCBCVUlMRF9TRVRUSU5HU19GSUxFID0gXCJCdWlsZFNldHRpbmdzLmpzb25cIjtcbmV4cG9ydCBjb25zdCBBTExfVEFSR0VUID0gXCJhbGxcIjtcbmV4cG9ydCBjb25zdCBJTlNUQUxMX1RBUkdFVCA9IFwiaW5zdGFsbFwiO1xuZXhwb3J0IGNvbnN0IFBBQ0tBR0VfSlNPTiA9IFwicGFja2FnZS5qc29uXCI7XG5leHBvcnQgY29uc3QgTUFLRV9DQUNIRSA9IFwiTWFrZUNhY2hlLmpzb25cIjtcbmV4cG9ydCBjb25zdCBTWVNURU1fVkFSSUFCTEVfR1JPVVAgPSBcInN5c3RlbVwiO1xuZXhwb3J0IGNvbnN0IENVU1RPTV9WQVJJQUJMRV9HUk9VUCA9IFwiY3VzdG9tXCI7XG4iLCIvKlxuICogTUlUIExpY2Vuc2VcbiAqXG4gKiBDb3B5cmlnaHQgKGMpIDIwMjUgIFl1cmlpIFlha3ViaW4gKHl1cmlpLnlha3ViaW5AZ21haWwuY29tKVxuICpcbiAqIFBlcm1pc3Npb24gaXMgZ3JhbnRlZCB0byB1c2UsIGNvcHksIG1vZGlmeSwgYW5kIGRpc3RyaWJ1dGUgdGhpcyBzb2Z0d2FyZVxuICogdW5kZXIgdGhlIE1JVCBMaWNlbnNlLiBTZWUgTElDRU5TRSBmaWxlIGZvciBkZXRhaWxzLlxuICovXG5cbmltcG9ydCB7IGlzTWFpblRocmVhZCwgcGFyZW50UG9ydCwgd29ya2VyRGF0YSB9IGZyb20gXCJub2RlOndvcmtlcl90aHJlYWRzXCI7XG5pbXBvcnQgeyBBcmdzIH0gIGZyb20gXCJAL3V0aWxzL0FyZ3NcIjtcbmltcG9ydCBjb21tYW5kcyBmcm9tIFwiQC9jb21tYW5kc1wiO1xuaW1wb3J0IHsgTG9nZ2VyIH0gZnJvbSBcIkAvbG9nZ2VyXCI7XG5pbXBvcnQgeyBNZXNzYWdlUG9ydFNlbmRlciB9IGZyb20gXCJAL3NlcnZlci9NZXNzYWdlUG9ydFNlbmRlclwiO1xuaW1wb3J0IHsgV29ya2VyTG9vcGVyIH0gZnJvbSBcIkAvc2VydmVyL1dvcmtlckxvb3BlclwiO1xuXG5jb25zdCBsb2dnZXIgPSBMb2dnZXIuY3JlYXRlKGltcG9ydC5tZXRhLnVybCk7XG5cbmV4cG9ydCBhc3luYyBmdW5jdGlvbiBydW5NYWluU2NyaXB0KCkge1xuICBsb2dnZXIuaW5mbyhcIk1haW4gdGhyZWFkIHN0YXJ0ZWRcIilcbiAgY29uc3Qgb3B0aW9uczogYW55ID0ge1xuICAgIGhhbmRsZXI6IFwiZGVmYXVsdFwiLFxuICAgIHdvcmtEaXI6IHByb2Nlc3MuY3dkKCksXG4gICAgZW52OiB7fSxcbiAgfTtcblxuICBsZXQgbm9kZUV4ZWN1dGFibGU6IHN0cmluZyB8IHVuZGVmaW5lZDtcbiAgaWYgKHByb2Nlc3MuYXJndi5sZW5ndGggPiAwKVxuICAgIG5vZGVFeGVjdXRhYmxlID0gcHJvY2Vzcy5hcmd2WzBdO1xuXG4gIGxldCBjdXJyZW50U2NyaXB0OiBzdHJpbmcgfCB1bmRlZmluZWQ7XG4gIGlmIChwcm9jZXNzLmFyZ3YubGVuZ3RoID4gMSlcbiAgICBjdXJyZW50U2NyaXB0ID0gcHJvY2Vzcy5hcmd2WzFdO1xuXG4gIGxldCBhcmdzSW5kZXggPSBwcm9jZXNzLmFyZ3YubGVuZ3RoO1xuICBpZiAocHJvY2Vzcy5hcmd2Lmxlbmd0aCA+IDIpIHtcbiAgICBhcmdzSW5kZXggPSAyO1xuICAgIGNvbnN0IGhhbmRsZXIgPSBwcm9jZXNzLmFyZ3ZbYXJnc0luZGV4XTtcbiAgICBpZiAoIWhhbmRsZXIuc3RhcnRzV2l0aChcIi0tXCIpKSB7XG4gICAgICBvcHRpb25zLmhhbmRsZXIgPSBoYW5kbGVyO1xuICAgICAgYXJnc0luZGV4Kys7XG4gICAgfVxuICB9XG5cbiAgb3B0aW9ucy5lbnYgPSBBcmdzLnRvT2JqZWN0KHByb2Nlc3MuYXJndi5zbGljZShhcmdzSW5kZXgpKTtcblxuICBjb25zdCBoYW5kbGVyID0gY29tbWFuZHNbb3B0aW9ucy5oYW5kbGVyXTtcbiAgaWYgKCFoYW5kbGVyKVxuICAgIHRocm93IEVycm9yKGBUaGUgJHtQUk9KRUNUX05BTUV9IGRvZXMgbm90IHN1cHBvcnQgdGhlICR7b3B0aW9ucy5oYW5kbGVyfSBjb21tYW5kYCk7XG5cbiAgY29uc3QgcmVzID0gaGFuZGxlcihvcHRpb25zKTtcbiAgaWYgKHJlcyBpbnN0YW5jZW9mIFByb21pc2UpIHtcbiAgICBhd2FpdCByZXM7XG4gIH1cbn1cblxuZXhwb3J0IGZ1bmN0aW9uIHJ1bldvcmtlclNjcmlwdCgpIHtcbiAgbG9nZ2VyLmRlYnVnKFwiV29ya2VyIHRocmVhZCBzdGFydGVkXCIsIHdvcmtlckRhdGEpO1xuXG4gIGlmICghcGFyZW50UG9ydCkge1xuICAgIHRocm93IG5ldyBFcnJvcihgV29ya2VyIG5vdCBzdXBwb3J0ZWQgcGFyZW50UG9ydGApO1xuICB9XG5cbiAgY29uc3Qgc2VuZGVyID0gbmV3IE1lc3NhZ2VQb3J0U2VuZGVyKHBhcmVudFBvcnQpO1xuICBjb25zdCBsb29wZXIgPSBuZXcgV29ya2VyTG9vcGVyKHNlbmRlcik7XG5cbiAgcGFyZW50UG9ydC5vbihcIm1lc3NhZ2VcIiwgKG1lc3NhZ2UpID0+IGxvb3Blci5lbWl0TWVzc2FnZShzZW5kZXIsIG1lc3NhZ2UpKTtcbn1cblxuZXhwb3J0IGZ1bmN0aW9uIHJ1blNjcmlwdCgpIHtcbiAgaWYgKGlzTWFpblRocmVhZCkge1xuICAgIHJ1bk1haW5TY3JpcHQoKS50aGVuKCgpID0+IHByb2Nlc3MuZXhpdCgwKSkuY2F0Y2goKGUpID0+IHtcbiAgICAgIGlmIChlIGluc3RhbmNlb2YgRXJyb3IpXG4gICAgICAgIGxvZ2dlci5mYXRhbChlLnN0YWNrKTtcbiAgICAgIGVsc2VcbiAgICAgICAgbG9nZ2VyLmZhdGFsKGUpO1xuICAgICAgcHJvY2Vzcy5leGl0KDEpO1xuICAgIH0pO1xuICB9XG4gIGVsc2Uge1xuICAgIHJ1bldvcmtlclNjcmlwdCgpO1xuICB9XG59XG4iLCIvKlxuICogTUlUIExpY2Vuc2VcbiAqXG4gKiBDb3B5cmlnaHQgKGMpIDIwMjUgIFl1cmlpIFlha3ViaW4gKHl1cmlpLnlha3ViaW5AZ21haWwuY29tKVxuICpcbiAqIFBlcm1pc3Npb24gaXMgZ3JhbnRlZCB0byB1c2UsIGNvcHksIG1vZGlmeSwgYW5kIGRpc3RyaWJ1dGUgdGhpcyBzb2Z0d2FyZVxuICogdW5kZXIgdGhlIE1JVCBMaWNlbnNlLiBTZWUgTElDRU5TRSBmaWxlIGZvciBkZXRhaWxzLlxuICovXG5cbmltcG9ydCBmcyBmcm9tIFwibm9kZTpmc1wiO1xuXG5pbXBvcnQgeyBQYXRoIH0gZnJvbSBcIkAvdXRpbHMvUGF0aFwiO1xuaW1wb3J0IHsgTWFrZVNlcnZlciB9IGZyb20gXCJAL3NlcnZlci9NYWtlU2VydmVyXCI7XG5pbXBvcnQgeyBQbHVnaW5Db250ZXh0IH0gZnJvbSBcIkAvY29yZS9QbHVnaW5Db250ZXh0XCI7XG5pbXBvcnQgeyBTY29wZUhlbHBlciB9IGZyb20gXCJAL2NvcmUvU2NvcGVcIjtcbmltcG9ydCB7IFRvb2xjaGFpbkNvbnRleHQgfSBmcm9tIFwiQC9jb3JlL1Rvb2xjaGFpbkNvbnRleHRcIjtcbmltcG9ydCB7IGdldFBhdGhTdHJpbmcsIGdldFVSTFN0cmluZywgc2F2ZUFzSlNPTiB9ICBmcm9tIFwiQC91dGlscy9GaWxlU3lzdGVtXCI7XG5pbXBvcnQgeyBBYnNvbHV0ZVBhdGggfSBmcm9tIFwiQC9jb3JlL0Fic29sdXRlUGF0aFwiO1xuaW1wb3J0IHsgaW1wb3J0TW9kdWxlIH0gIGZyb20gXCJAL3V0aWxzL01vZHVsZVwiO1xuaW1wb3J0IHsgZGV0ZXJtaW5lQ29tcGlsZXIgfSAgZnJvbSBcIkAvY29yZS9EZXRlcm1pbmVDb21waWxlclwiO1xuaW1wb3J0IHsgU2V0dGluZ3NTdG9yYWdlIH0gZnJvbSBcIkAvdXRpbHMvU2V0dGluZ3NTdG9yYWdlXCI7XG5pbXBvcnQgeyBJTVBPUlRfU0NIRU1FIH0gZnJvbSBcIkAvdXRpbHMvVXJsU2NoZW1lXCI7XG5pbXBvcnQgeyBJTlNUQUxMX1RBUkdFVCwgUEFDS0FHRV9KU09OLCBNQUtFX0NBQ0hFIH0gZnJvbSBcIkAvQ29uc3RhbnRzXCI7XG5pbXBvcnQgeyBTWVNURU1fVkFSSUFCTEVfR1JPVVAgfSBmcm9tIFwiQC9Db25zdGFudHNcIjtcbmltcG9ydCB7IHJlcXVpcmVSZXNvbHZlIH0gZnJvbSBcIkAvdXRpbHMvTW9kdWxlXCI7XG5pbXBvcnQgeyBTeXN0ZW1TY29wZSB9IGZyb20gXCJAL2NvcmUvU3lzdGVtU2NvcGVcIjtcbmltcG9ydCBTeXN0ZW1WYXJpYWJsZXMgZnJvbSBcIkAvY29yZS9TeXN0ZW1WYXJpYWJsZXNcIjtcbmltcG9ydCB7IExvZ2dlciB9IGZyb20gXCJAL2xvZ2dlclwiO1xuXG5jb25zdCBsb2dnZXIgPSBMb2dnZXIuY3JlYXRlKGltcG9ydC5tZXRhLnVybCk7XG5cbmV4cG9ydCBkZWZhdWx0IGFzeW5jIGZ1bmN0aW9uKGNvbmZpZzogYW55LCBlbnZpcm9ubWVudDogYW55LCBzZXR0aW5nczogU2V0dGluZ3NTdG9yYWdlKSB7XG4gIHByb2Nlc3MuZW52ID0gZW52aXJvbm1lbnQ7XG5cbiAgY29uc3Qgc2VydmVyID0gbmV3IE1ha2VTZXJ2ZXI7XG5cbiAgY29uc3QgdmFyaWFibGVNYXAgPSBzZXJ2ZXIucm9vdFZhcmlhYmxlTWFwO1xuICBTY29wZUhlbHBlci5leHRlbmRWYXJpYWJsZU1hcEJ5VmFsdWVzKHZhcmlhYmxlTWFwLCBcIlwiLCBjb25maWcudmFyaWFibGVzKTtcbiAgU2NvcGVIZWxwZXIuZGVmaW5lVmFyaWFibGVzSW5WYXJpYWJsZU1hcCh2YXJpYWJsZU1hcCwgU1lTVEVNX1ZBUklBQkxFX0dST1VQLCBTeXN0ZW1WYXJpYWJsZXMpO1xuICBjb25zdCBzY29wZSA9IFNjb3BlSGVscGVyLmNyZWF0ZVByb3h5KHZhcmlhYmxlTWFwKSBhcyBTeXN0ZW1TY29wZTtcblxuICBjb25zdCBzb3VyY2VEaXIgPSBnZXRQYXRoU3RyaW5nKGNvbmZpZy5zb3VyY2VEaXIpO1xuICBjb25zdCBiaW5hcnlEaXIgPSBnZXRQYXRoU3RyaW5nKGNvbmZpZy5iaW5hcnlEaXIpO1xuXG4gIHNjb3BlLlBST0pFQ1RfU09VUkNFX0RJUiA9IEFic29sdXRlUGF0aC5jcmVhdGUoc291cmNlRGlyKTtcbiAgc2NvcGUuUFJPSkVDVF9CSU5BUllfRElSID0gQWJzb2x1dGVQYXRoLmNyZWF0ZShiaW5hcnlEaXIpO1xuXG4gIHNjb3BlLlBBQ0tBR0VfRklMRSA9IHNjb3BlLlBST0pFQ1RfU09VUkNFX0RJUi5qb2luKFBBQ0tBR0VfSlNPTik7XG4gIHNjb3BlLkNBQ0hFX0ZJTEUgPSBzY29wZS5QUk9KRUNUX0JJTkFSWV9ESVIuam9pbihNQUtFX0NBQ0hFKTtcbiAgc2NvcGUuU09VUkNFX0RJUiA9IHNjb3BlLlBST0pFQ1RfU09VUkNFX0RJUjtcbiAgc2NvcGUuQklOQVJZX0RJUiA9IHNjb3BlLlBST0pFQ1RfQklOQVJZX0RJUjtcblxuICBjb25zdCBwYWNrYWdlSnNvbiA9IGF3YWl0IGZzLnByb21pc2VzLnJlYWRGaWxlKHNjb3BlLlBBQ0tBR0VfRklMRS50b1N0cmluZygpLCBcInV0ZjhcIik7XG4gIGNvbnN0IHBrZyA9IEpTT04ucGFyc2UocGFja2FnZUpzb24pO1xuXG4gIHNjb3BlLkJVSUxEX1RZUEUgPSBjb25maWcuYnVpbGRUeXBlO1xuICBzY29wZS5QUk9KRUNUX05BTUUgPSBwa2cubmFtZTtcbiAgc2NvcGUuUFJPSkVDVF9WRVJTSU9OID0gcGtnLnZlcnNpb247XG4gIHNjb3BlLlBST0pFQ1RfREVTQ1JJUFRJT04gPSBwa2cuZGVzY3JpcHRpb24gfHwgXCJcIjtcbiAgc2NvcGUuUFJPSkVDVF9IT01FUEFHRV9VUkwgPSBwa2cuaG9tZXBhZ2UgfHwgXCJcIjtcblxuICBpZiAoY29uZmlnLmRlc3REaXIpXG4gICAgc2NvcGUuREVTVERJUiA9IGNvbmZpZy5kZXN0RGlyO1xuXG4gIGZvciAoY29uc3QgcGx1Z2luIG9mIChzY29wZS5NQUtFX1BMVUdJTl9MSVNUIHx8IFtdKSkge1xuICAgIGNvbnN0IGN3ZFNhdmUgPSBwcm9jZXNzLmN3ZCgpO1xuXG4gICAgc2NvcGUuU0NSSVBUX0ZJTEUgPSBBYnNvbHV0ZVBhdGguY3JlYXRlKHBsdWdpbik7XG4gICAgc2NvcGUuU0NSSVBUX0RJUiA9IHNjb3BlLlNDUklQVF9GSUxFLmRpcm5hbWUoKTtcbiAgICBzY29wZS5TT1VSQ0VfRElSID0gc2NvcGUuU0NSSVBUX0RJUjtcblxuICAgIGNvbnN0IGJpbmFyeURpcjEgPSBzY29wZS5QUk9KRUNUX0JJTkFSWV9ESVIucmVsYXRpdmUoc291cmNlRGlyKTtcbiAgICBjb25zdCBiaW5hcnlEaXIyID0gc2NvcGUuUFJPSkVDVF9TT1VSQ0VfRElSLnJlbGF0aXZlKHNvdXJjZURpcik7XG4gICAgY29uc3QgYmluYXJ5RGlyID0gKGJpbmFyeURpcjIubGVuZ3RoIDwgYmluYXJ5RGlyMS5sZW5ndGggPyBiaW5hcnlEaXIyIDogYmluYXJ5RGlyMSkucmVwbGFjZShcIi4uL1wiLCBcIl9fL1wiKTtcbiAgICBzY29wZS5CSU5BUllfRElSID0gc2NvcGUuUFJPSkVDVF9CSU5BUllfRElSLmpvaW4oXCJNYWtlUGx1Z2luQmluYXJpZXNcIiwgYmluYXJ5RGlyKTtcblxuICAgIHByb2Nlc3MuY2hkaXIoc2NvcGUuU09VUkNFX0RJUi50b1N0cmluZygpKTtcbiAgICBjb25zdCBwbHVnaW5VcmwgPSBnZXRVUkxTdHJpbmcoc2NvcGUuU0NSSVBUX0ZJTEUudG9TdHJpbmcoKSk7XG4gICAgY29uc3QgbW9kdWxlID0gYXdhaXQgaW1wb3J0TW9kdWxlKHBsdWdpblVybCk7XG4gICAgXG4gICAgaWYgKCFtb2R1bGUuZGVmYXVsdClcbiAgICAgIHRocm93IG5ldyBFcnJvcihgUGx1Z2luICR7c2NvcGUuU0NSSVBUX0ZJTEUuYmFzZW5hbWUoKX0gbm90IGNvbnRhaW4gZGVmYXVsdCBleHBvcnRgKTtcblxuICAgIGNvbnN0IG1rID0gUGx1Z2luQ29udGV4dC5jcmVhdGUoc2VydmVyLnByb2plY3QsIHZhcmlhYmxlTWFwKTtcbiAgICBpZiAodHlwZW9mIG1vZHVsZS5kZWZhdWx0ICE9PSBcImZ1bmN0aW9uXCIpXG4gICAgICB0aHJvdyBuZXcgRXJyb3IoYFBsdWdpbiAke3Njb3BlLlNDUklQVF9GSUxFLmJhc2VuYW1lKCl9IGV4cG9ydCBoYXMgbm8gZnVuY3Rpb24gb3IgY2xhc3NgKTtcbiAgICBsZXQgcmVzdWx0OiBhbnk7XG4gICAgaWYgKC9eY2xhc3NcXHMvLnRlc3QoRnVuY3Rpb24ucHJvdG90eXBlLnRvU3RyaW5nLmNhbGwobW9kdWxlLmRlZmF1bHQpKSkge1xuICAgICAgaWYgKHR5cGVvZiBtb2R1bGUuZGVmYXVsdC5wcm90b3R5cGUuYXBwbHkgIT09IFwiZnVuY3Rpb25cIilcbiAgICAgICAgdGhyb3cgbmV3IEVycm9yKGBQbHVnaW4gY2xhc3Mgb2YgJHtzY29wZS5TQ1JJUFRfRklMRS5iYXNlbmFtZSgpfSBoYXMgbm8gYXBwbHkgbWV0aG9kYCk7XG4gICAgICByZXN1bHQgPSAobmV3IG1vZHVsZS5kZWZhdWx0KS5hcHBseShtayk7XG4gICAgfVxuICAgIGVsc2Uge1xuICAgICAgcmVzdWx0ID0gbW9kdWxlLmRlZmF1bHQobWspO1xuICAgIH1cblxuICAgIGlmIChyZXN1bHQgaW5zdGFuY2VvZiBQcm9taXNlKVxuICAgICAgYXdhaXQgcmVzdWx0O1xuXG4gICAgcHJvY2Vzcy5jaGRpcihjd2RTYXZlKTtcbiAgfVxuXG4gIGlmIChzY29wZS5UT09MQ0hBSU5fRklMRSkge1xuICAgIGNvbnN0IHRvb2xjaGFpblVybCA9IGdldFVSTFN0cmluZyhzY29wZS5UT09MQ0hBSU5fRklMRS50b1N0cmluZygpKTtcbiAgICBjb25zdCB0b29sY2hhaW4gPSBhd2FpdCBpbXBvcnRNb2R1bGUodG9vbGNoYWluVXJsKTtcbiAgICBpZiAoIXRvb2xjaGFpbi5kZWZhdWx0KVxuICAgICAgdGhyb3cgbmV3IEVycm9yKFwiVG9vbGNoYWluIG1vZHVsZSBoYXMgbm8gZGVmYXVsdCBleHBvcnRcIik7XG4gICAgY29uc3QgbWsgPSBUb29sY2hhaW5Db250ZXh0LmNyZWF0ZShzZXJ2ZXIucHJvamVjdCwgdmFyaWFibGVNYXApO1xuICAgIGNvbnN0IHJlc3VsdCA9IHRvb2xjaGFpbi5kZWZhdWx0KG1rKTtcbiAgICBpZiAocmVzdWx0IGluc3RhbmNlb2YgUHJvbWlzZSlcbiAgICAgIGF3YWl0IHJlc3VsdDtcbiAgfVxuICBlbHNlIHtcbiAgICBhd2FpdCBkZXRlcm1pbmVDb21waWxlcihzY29wZSk7XG4gIH1cblxuICBpZiAoY29uZmlnLnNvdXJjZVVybCAmJiBjb25maWcuc291cmNlVXJsLnN0YXJ0c1dpdGgoSU1QT1JUX1NDSEVNRSkpIHtcbiAgICBjb25zdCBzY3JpcHRGaWxlID0gcmVxdWlyZVJlc29sdmUoY29uZmlnLnNvdXJjZVVybC5zbGljZShJTVBPUlRfU0NIRU1FLmxlbmd0aCkpO1xuICAgIHNjb3BlLlNDUklQVF9GSUxFID0gQWJzb2x1dGVQYXRoLmNyZWF0ZShzY3JpcHRGaWxlKTtcbiAgICBzY29wZS5TQ1JJUFRfRElSID0gc2NvcGUuU0NSSVBUX0ZJTEUuZGlybmFtZSgpO1xuICB9XG5cbiAgc2VydmVyLmFkZEV2ZW50TGlzdGVuZXIoXCJjb25maWd1cmVcIiwgYXN5bmMgKGV2ZW50KSA9PiB7XG4gICAgbG9nZ2VyLmluZm8oXCJDb25maWd1cmluZyBkb25lXCIpO1xuXG4gICAgaWYgKHNjb3BlLkdMT0JBTF9DT05URVhUX0pTT04pIHtcbiAgICAgIGF3YWl0IHNhdmVBc0pTT04oc2NvcGUuR0xPQkFMX0NPTlRFWFRfSlNPTi50b1BhdGgoKSwgc2VydmVyLnByb2plY3QsIHsgcHJldHR5OiB0cnVlIH0pO1xuICAgIH1cblxuICAgIGNvbnN0IGFsbEdvYWxMaXN0ID0gc2VydmVyLnByb2plY3QuY3JlYXRlR29hbHMoc2NvcGUpO1xuICAgIGNvbnN0IGdvYWxMaXN0ID0gYWxsR29hbExpc3QuZ2V0VGFyZ2V0TGlzdChJTlNUQUxMX1RBUkdFVCk7XG5cbiAgICBpZiAoc2NvcGUuVEFSR0VUX0dPQUxTX0pTT04pIHtcbiAgICAgIGF3YWl0IHNhdmVBc0pTT04oc2NvcGUuVEFSR0VUX0dPQUxTX0pTT04udG9QYXRoKCksIGdvYWxMaXN0LCB7IHByZXR0eTogdHJ1ZSB9KTtcbiAgICB9XG5cbiAgICBsZXQgbG9hZGVkID0gMDtcbiAgICBjb25zdCB0b3RhbCA9IGdvYWxMaXN0Lmxlbmd0aDtcbiAgICBmb3IgKGNvbnN0IGl0ZXIgb2YgZ29hbExpc3QpIHtcbiAgICAgIGlmIChpdGVyLm91dHB1dCkge1xuICAgICAgICBjb25zdCBvdXRwdXREaXIgPSBQYXRoLmRpcm5hbWUoaXRlci5vdXRwdXQpO1xuICAgICAgICBhd2FpdCBmcy5wcm9taXNlcy5ta2RpcihvdXRwdXREaXIsIHsgcmVjdXJzaXZlOiB0cnVlIH0pO1xuICAgICAgfVxuICAgICAgaWYgKGl0ZXIubWVzc2FnZSkge1xuICAgICAgICBjb25zdCByZWxhdGlvbk9mTGVuZ3RoID0gTWF0aC5yb3VuZCgoKGxvYWRlZCArIDEpIC8gdG90YWwpICogMTAwKTtcbiAgICAgICAgY29uc3QgcGVyY2VudCA9IFwiW1wiICsgcmVsYXRpb25PZkxlbmd0aC50b1N0cmluZygpLnBhZFN0YXJ0KDMsIFwiIFwiKSArIFwiJV0gXCI7XG4gICAgICAgIGxvZ2dlci5ub3RpY2UocGVyY2VudCArIGl0ZXIubWVzc2FnZSk7XG4gICAgICB9XG4gICAgICBhd2FpdCBpdGVyLmRvV29yaygpO1xuICAgICAgbG9hZGVkKys7XG4gICAgfVxuICB9KTtcblxuICBsZXQgZmluaXNoUmVzb2x2ZTogKCkgPT4gdm9pZDtcbiAgY29uc3QgcmVzdWx0ID0gbmV3IFByb21pc2U8dm9pZD4oKHJlc29sdmUpID0+IHtcbiAgICBmaW5pc2hSZXNvbHZlID0gcmVzb2x2ZTtcbiAgfSk7XG5cbiAgc2VydmVyLmFkZEV2ZW50TGlzdGVuZXIoXCJidWlsZFwiLCAoZXZlbnQpID0+IGZpbmlzaFJlc29sdmUoKSk7XG5cbiAgc2VydmVyLnN0YXJ0KCk7XG5cbiAgcmV0dXJuIHJlc3VsdDtcbn1cbiIsIi8qXG4gKiBNSVQgTGljZW5zZVxuICpcbiAqIENvcHlyaWdodCAoYykgMjAyNSAgWXVyaWkgWWFrdWJpbiAoeXVyaWkueWFrdWJpbkBnbWFpbC5jb20pXG4gKlxuICogUGVybWlzc2lvbiBpcyBncmFudGVkIHRvIHVzZSwgY29weSwgbW9kaWZ5LCBhbmQgZGlzdHJpYnV0ZSB0aGlzIHNvZnR3YXJlXG4gKiB1bmRlciB0aGUgTUlUIExpY2Vuc2UuIFNlZSBMSUNFTlNFIGZpbGUgZm9yIGRldGFpbHMuXG4gKi9cblxuaW1wb3J0IHsgQ01ha2VQcm9jZXNzLCBERUZBVUxUX0dFTkVSQVRPUiB9IGZyb20gXCJAL2NtYWtlXCI7XG5pbXBvcnQgeyBnZXRQYXRoU3RyaW5nIH0gIGZyb20gXCJAL3V0aWxzL0ZpbGVTeXN0ZW1cIjtcbmltcG9ydCB7IFNldHRpbmdzU3RvcmFnZSB9IGZyb20gXCJAL3V0aWxzL1NldHRpbmdzU3RvcmFnZVwiO1xuXG5leHBvcnQgZGVmYXVsdCBhc3luYyBmdW5jdGlvbihjb25maWc6IGFueSwgZW52aXJvbm1lbnQ6IGFueSwgc2V0dGluZ3M6IFNldHRpbmdzU3RvcmFnZSkge1xuICBjb25zdCBzb3VyY2VEaXIgPSBnZXRQYXRoU3RyaW5nKGNvbmZpZy5zb3VyY2VEaXIpO1xuICBjb25zdCBiaW5hcnlEaXIgPSBnZXRQYXRoU3RyaW5nKGNvbmZpZy5iaW5hcnlEaXIpO1xuICBjb25zdCBjbWFrZUFyZ3MgPSB7XG4gICAgZW52aXJvbm1lbnQ6IHtcbiAgICAgIC4uLmVudmlyb25tZW50LFxuICAgICAgREVTVERJUjogY29uZmlnLmRlc3REaXIsXG4gICAgfSxcbiAgICBnZW5lcmF0b3I6IGNvbmZpZy5nZW5lcmF0b3IgfHwgREVGQVVMVF9HRU5FUkFUT1IsXG4gICAgY2FjaGVWYXJpYWJsZXM6IGNvbmZpZy5jYWNoZVZhcmlhYmxlcyxcbiAgICBzb3VyY2VEaXIsXG4gICAgYmluYXJ5RGlyLFxuICB9O1xuXG4gIGlmICghY21ha2VBcmdzLmNhY2hlVmFyaWFibGVzLkNNQUtFX0JVSUxEX1RZUEUpIHtcbiAgICBjbWFrZUFyZ3MuY2FjaGVWYXJpYWJsZXMuQ01BS0VfQlVJTERfVFlQRSA9IGNvbmZpZy5idWlsZFR5cGU7XG4gIH1cblxuICBjb25zdCBjbWFrZSA9IENNYWtlUHJvY2Vzcy5nZXRJbnN0YW5jZSgpO1xuICBhd2FpdCBjbWFrZS5jb25maWd1cmUoY21ha2VBcmdzKTtcbiAgYXdhaXQgY21ha2UuYnVpbGQoY21ha2VBcmdzKTtcbiAgYXdhaXQgY21ha2UuaW5zdGFsbChjbWFrZUFyZ3MpO1xufVxuIiwiLypcbiAqIE1JVCBMaWNlbnNlXG4gKlxuICogQ29weXJpZ2h0IChjKSAyMDI1ICBZdXJpaSBZYWt1YmluICh5dXJpaS55YWt1YmluQGdtYWlsLmNvbSlcbiAqXG4gKiBQZXJtaXNzaW9uIGlzIGdyYW50ZWQgdG8gdXNlLCBjb3B5LCBtb2RpZnksIGFuZCBkaXN0cmlidXRlIHRoaXMgc29mdHdhcmVcbiAqIHVuZGVyIHRoZSBNSVQgTGljZW5zZS4gU2VlIExJQ0VOU0UgZmlsZSBmb3IgZGV0YWlscy5cbiAqL1xuXG5pbXBvcnQgcGF0aCBmcm9tIFwibm9kZTpwYXRoXCI7XG5cbmltcG9ydCB7IGVuc3VyZUJvb2xlYW4gfSBmcm9tIFwiQC91dGlscy9TdHJpY3RUeXBlXCI7XG5pbXBvcnQgeyBnZXRQYXRoU3RyaW5nIH0gZnJvbSBcIkAvdXRpbHMvRmlsZVN5c3RlbVwiO1xuaW1wb3J0IHsgU2V0dGluZ3NTdG9yYWdlIH0gZnJvbSBcIkAvdXRpbHMvU2V0dGluZ3NTdG9yYWdlXCI7XG5pbXBvcnQgeyBzcGF3bkFzeW5jIH0gZnJvbSBcIkAvdXRpbHMvQ2hpbGRQcm9jZXNzXCI7XG5cbmV4cG9ydCBkZWZhdWx0IGFzeW5jIGZ1bmN0aW9uKGNvbmZpZzogYW55LCBlbnZpcm9ubWVudDogYW55LCBzZXR0aW5nczogU2V0dGluZ3NTdG9yYWdlKSB7XG4gIGNvbnN0IHNvdXJjZURpciA9IGdldFBhdGhTdHJpbmcoY29uZmlnLnNvdXJjZURpcik7XG4gIGNvbnN0IGJpbmFyeURpciA9IGdldFBhdGhTdHJpbmcoY29uZmlnLmJpbmFyeURpcik7XG4gIGxldCBzdGVwID0gYXdhaXQgc2V0dGluZ3MuZ2V0KFwiY29uZmlndXJlXCIpIHx8IFwiY29uZmlnXCI7XG4gIGlmIChzdGVwID09PSBcImNvbmZpZ1wiKSB7XG4gICAgY29uc3QgY29tbWFuZCA9IHBhdGgucmVzb2x2ZShzb3VyY2VEaXIsIFwiY29uZmlndXJlXCIpO1xuICAgIGNvbnN0IHBhcmFtcyA9IFtdO1xuICAgIGlmIChBcnJheS5pc0FycmF5KGNvbmZpZy52YXJpYWJsZXMpKSB7XG4gICAgICBmb3IgKGNvbnN0IGl0ZXIgb2YgY29uZmlnLnZhcmlhYmxlcylcbiAgICAgICAgcGFyYW1zLnB1c2goaXRlcik7XG4gICAgfVxuICAgIGVsc2UgaWYgKGNvbmZpZy52YXJpYWJsZXMpIHtcbiAgICAgIGZvciAoY29uc3QgW2tleSx2YWxdIG9mIE9iamVjdC5lbnRyaWVzKGNvbmZpZy52YXJpYWJsZXMpKSB7XG4gICAgICAgIGlmIChrZXkgPT09IFwiZmVhdHVyZXNcIiAmJiBBcnJheS5pc0FycmF5KHZhbCkpIHtcbiAgICAgICAgICBmb3IgKGNvbnN0IGl0ZXIgb2YgdmFsKVxuICAgICAgICAgICAgcGFyYW1zLnB1c2goYC0tJHtpdGVyfWApO1xuICAgICAgICB9XG4gICAgICAgIGVsc2UgaWYgKHZhbCA9PT0gbnVsbClcbiAgICAgICAgICBwYXJhbXMucHVzaChgLS0ke2tleX1gKTtcbiAgICAgICAgZWxzZVxuICAgICAgICAgIHBhcmFtcy5wdXNoKGAtLSR7a2V5fT0ke3ZhbH1gKTtcbiAgICAgIH1cbiAgICB9XG4gICAgaWYgKGNvbmZpZy5mZWF0dXJlcykge1xuICAgICAgZm9yIChjb25zdCBrZXkgb2YgY29uZmlnLmZlYXR1cmVzKVxuICAgICAgICBwYXJhbXMucHVzaChgLS0ke2tleX1gKTtcbiAgICB9XG4gICAgY29uc3QgcmVzMSA9IGF3YWl0IHNwYXduQXN5bmMoY29tbWFuZCwgcGFyYW1zLCB7XG4gICAgICBjd2Q6IGJpbmFyeURpcixcbiAgICAgIGVudjogZW52aXJvbm1lbnQsXG4gICAgICBleHRyYToge1xuICAgICAgICBvdXRwdXQ6IGBhYy1jb25maWd1cmUtJHtzdGVwfS5sb2dgLFxuICAgICAgfSxcbiAgICB9KTtcbiAgICBpZiAocmVzMS5zdGF0dXMgIT09IDApIHtcbiAgICAgIHRocm93IG5ldyBFcnJvcihgY29uZmlndXJlIHJldHVybmVkIHN0YXR1cyAke3JlczEuc3RhdHVzfWApO1xuICAgIH1cbiAgICBzdGVwID0gXCJtYWtlXCI7XG4gICAgYXdhaXQgc2V0dGluZ3Muc2V0KFwiY29uZmlndXJlXCIsIHN0ZXApO1xuICB9XG4gIGlmIChzdGVwID09PSBcIm1ha2VcIikge1xuICAgIGxldCBydW5NYWtlID0gZmFsc2U7XG4gICAgaWYgKE9iamVjdC5oYXNPd24oY29uZmlnLCBcInJ1bk1ha2VcIikpXG4gICAgICBydW5NYWtlID0gZW5zdXJlQm9vbGVhbihjb25maWcucnVuTWFrZSk7XG4gICAgaWYgKHJ1bk1ha2UpIHtcbiAgICAgIGNvbnN0IHJlczIgPSBhd2FpdCBzcGF3bkFzeW5jKFwibWFrZVwiLCBbXSwge1xuICAgICAgICBjd2Q6IGJpbmFyeURpcixcbiAgICAgICAgZW52OiBlbnZpcm9ubWVudCxcbiAgICAgICAgZXh0cmE6IHtcbiAgICAgICAgICBvdXRwdXQ6IGBhYy1jb25maWd1cmUtJHtzdGVwfS5sb2dgLFxuICAgICAgICB9LFxuICAgICAgfSk7XG4gICAgICBpZiAocmVzMi5zdGF0dXMgIT09IDApIHtcbiAgICAgICAgdGhyb3cgbmV3IEVycm9yKGBtYWtlIHJldHVybmVkIHN0YXR1cyAke3JlczIuc3RhdHVzfWApO1xuICAgICAgfVxuICAgIH1cbiAgICBzdGVwID0gXCJpbnN0YWxsXCI7XG4gICAgYXdhaXQgc2V0dGluZ3Muc2V0KFwiY29uZmlndXJlXCIsIHN0ZXApO1xuICB9XG4gIGlmIChzdGVwID09PSBcImluc3RhbGxcIikge1xuICAgIGxldCBydW5NYWtlSW5zdGFsbCA9IHRydWU7XG4gICAgaWYgKE9iamVjdC5oYXNPd24oY29uZmlnLCBcInJ1bk1ha2VJbnN0YWxsXCIpKVxuICAgICAgcnVuTWFrZUluc3RhbGwgPSBlbnN1cmVCb29sZWFuKGNvbmZpZy5ydW5NYWtlSW5zdGFsbCk7XG4gICAgaWYgKHJ1bk1ha2VJbnN0YWxsKSB7XG4gICAgICBjb25zdCBhcmdzID0gWyBcImluc3RhbGxcIiBdO1xuICAgICAgaWYgKGNvbmZpZy5kZXN0RGlyKSB7XG4gICAgICAgIGFyZ3MucHVzaChgREVTVERJUj0ke2NvbmZpZy5kZXN0RGlyfWApO1xuICAgICAgfVxuICAgICAgY29uc3QgcmVzMiA9IGF3YWl0IHNwYXduQXN5bmMoXCJtYWtlXCIsIGFyZ3MsIHtcbiAgICAgICAgY3dkOiBiaW5hcnlEaXIsXG4gICAgICAgIGVudjogZW52aXJvbm1lbnQsXG4gICAgICAgIGV4dHJhOiB7XG4gICAgICAgICAgb3V0cHV0OiBgYWMtY29uZmlndXJlLSR7c3RlcH0ubG9nYCxcbiAgICAgICAgfSxcbiAgICAgIH0pO1xuICAgICAgaWYgKHJlczIuc3RhdHVzICE9PSAwKSB7XG4gICAgICAgIHRocm93IG5ldyBFcnJvcihgbWFrZSByZXR1cm5lZCBzdGF0dXMgJHtyZXMyLnN0YXR1c31gKTtcbiAgICAgIH1cbiAgICB9XG4gICAgc3RlcCA9IFwiZG9uZVwiO1xuICAgIGF3YWl0IHNldHRpbmdzLnNldChcImNvbmZpZ3VyZVwiLCBzdGVwKTtcbiAgfVxufVxuIiwiLypcbiAqIE1JVCBMaWNlbnNlXG4gKlxuICogQ29weXJpZ2h0IChjKSAyMDI1ICBZdXJpaSBZYWt1YmluICh5dXJpaS55YWt1YmluQGdtYWlsLmNvbSlcbiAqXG4gKiBQZXJtaXNzaW9uIGlzIGdyYW50ZWQgdG8gdXNlLCBjb3B5LCBtb2RpZnksIGFuZCBkaXN0cmlidXRlIHRoaXMgc29mdHdhcmVcbiAqIHVuZGVyIHRoZSBNSVQgTGljZW5zZS4gU2VlIExJQ0VOU0UgZmlsZSBmb3IgZGV0YWlscy5cbiAqL1xuXG5pbXBvcnQgeyBTZXR0aW5nc1N0b3JhZ2UgfSBmcm9tIFwiQC91dGlscy9TZXR0aW5nc1N0b3JhZ2VcIjtcblxuaW1wb3J0IG5vbmUgZnJvbSBcIkAvYWN0aW9ucy9ub25lXCI7XG5pbXBvcnQgcHJvY2VzcyBmcm9tIFwiQC9hY3Rpb25zL3Byb2Nlc3NcIjtcbmltcG9ydCBjb25maWd1cmUgZnJvbSBcIkAvYWN0aW9ucy9jb25maWd1cmVcIjtcbmltcG9ydCBtYWtlIGZyb20gXCJAL2FjdGlvbnMvbWFrZVwiO1xuaW1wb3J0IGNtYWtlIGZyb20gXCJAL2FjdGlvbnMvY21ha2VcIjtcbmltcG9ydCBiaXRtYWtlIGZyb20gXCJAL2FjdGlvbnMvYml0bWFrZVwiO1xuXG5pbnRlcmZhY2UgQWN0aW9uSGFuZGxlcnMge1xuICBbbmFtZTogc3RyaW5nXTogKGNvbmZpZzogYW55LCBlbnZpcm9ubWVudDogYW55LCBzZXR0aW5nczogU2V0dGluZ3NTdG9yYWdlKSA9PiBQcm9taXNlPHZvaWQ+O1xufVxuXG5leHBvcnQgZGVmYXVsdCA8QWN0aW9uSGFuZGxlcnM+IHtcbiAgbm9uZSxcbiAgcHJvY2VzcyxcbiAgY29uZmlndXJlLFxuICBtYWtlLFxuICBjbWFrZSxcbiAgYml0bWFrZSxcbn07XG4iLCIvKlxuICogTUlUIExpY2Vuc2VcbiAqXG4gKiBDb3B5cmlnaHQgKGMpIDIwMjUgIFl1cmlpIFlha3ViaW4gKHl1cmlpLnlha3ViaW5AZ21haWwuY29tKVxuICpcbiAqIFBlcm1pc3Npb24gaXMgZ3JhbnRlZCB0byB1c2UsIGNvcHksIG1vZGlmeSwgYW5kIGRpc3RyaWJ1dGUgdGhpcyBzb2Z0d2FyZVxuICogdW5kZXIgdGhlIE1JVCBMaWNlbnNlLiBTZWUgTElDRU5TRSBmaWxlIGZvciBkZXRhaWxzLlxuICovXG5cbmltcG9ydCB7IHNwYXduQXN5bmMgfSBmcm9tIFwiQC91dGlscy9DaGlsZFByb2Nlc3NcIjtcbmltcG9ydCB7IGdldFBhdGhTdHJpbmcgfSAgZnJvbSBcIkAvdXRpbHMvRmlsZVN5c3RlbVwiO1xuaW1wb3J0IHsgU2V0dGluZ3NTdG9yYWdlIH0gZnJvbSBcIkAvdXRpbHMvU2V0dGluZ3NTdG9yYWdlXCI7XG5cbmV4cG9ydCBkZWZhdWx0IGFzeW5jIGZ1bmN0aW9uKGNvbmZpZzogYW55LCBlbnZpcm9ubWVudDogYW55LCBzZXR0aW5nczogU2V0dGluZ3NTdG9yYWdlKSB7XG4gIGNvbnN0IGJpbmFyeURpciA9IGdldFBhdGhTdHJpbmcoY29uZmlnLmJpbmFyeURpcik7XG4gIGNvbnN0IGFyZ3MgPSBjb25maWcuYXJncyB8fCBbXTtcbiAgaWYgKGNvbmZpZy5kZXN0RGlyKSB7XG4gICAgYXJncy5wdXNoKGBERVNURElSPSR7Y29uZmlnLmRlc3REaXJ9YCk7XG4gIH1cbiAgY29uc3QgcmVzMiA9IGF3YWl0IHNwYXduQXN5bmMoXCJtYWtlXCIsIGFyZ3MsIHtcbiAgICBjd2Q6IGJpbmFyeURpcixcbiAgICBlbnY6IGVudmlyb25tZW50LFxuICAgIGV4dHJhOiB7XG4gICAgICBvdXRwdXQ6IGBtYWtlLmxvZ2AsXG4gICAgfSxcbiAgfSk7XG4gIGlmIChyZXMyLnN0YXR1cyAhPT0gMCkge1xuICAgIHRocm93IG5ldyBFcnJvcihgbWFrZSByZXR1cm5lZCBzdGF0dXMgJHtyZXMyLnN0YXR1c31gKTtcbiAgfVxufVxuIiwiLypcbiAqIE1JVCBMaWNlbnNlXG4gKlxuICogQ29weXJpZ2h0IChjKSAyMDI1ICBZdXJpaSBZYWt1YmluICh5dXJpaS55YWt1YmluQGdtYWlsLmNvbSlcbiAqXG4gKiBQZXJtaXNzaW9uIGlzIGdyYW50ZWQgdG8gdXNlLCBjb3B5LCBtb2RpZnksIGFuZCBkaXN0cmlidXRlIHRoaXMgc29mdHdhcmVcbiAqIHVuZGVyIHRoZSBNSVQgTGljZW5zZS4gU2VlIExJQ0VOU0UgZmlsZSBmb3IgZGV0YWlscy5cbiAqL1xuXG5cbmltcG9ydCB7IFNldHRpbmdzU3RvcmFnZSB9IGZyb20gXCJAL3V0aWxzL1NldHRpbmdzU3RvcmFnZVwiO1xuaW1wb3J0IHsgTG9nZ2VyIH0gZnJvbSBcIkAvbG9nZ2VyXCI7XG5cbmNvbnN0IGxvZ2dlciA9IExvZ2dlci5jcmVhdGUoaW1wb3J0Lm1ldGEudXJsKTtcblxuZXhwb3J0IGRlZmF1bHQgYXN5bmMgZnVuY3Rpb24oY29uZmlnOiBhbnksIGVudmlyb25tZW50OiBhbnksIHNldHRpbmdzOiBTZXR0aW5nc1N0b3JhZ2UpIHtcbiAgLyogZG8gbm90aGluZyAqL1xufVxuIiwiLypcbiAqIE1JVCBMaWNlbnNlXG4gKlxuICogQ29weXJpZ2h0IChjKSAyMDI1ICBZdXJpaSBZYWt1YmluICh5dXJpaS55YWt1YmluQGdtYWlsLmNvbSlcbiAqXG4gKiBQZXJtaXNzaW9uIGlzIGdyYW50ZWQgdG8gdXNlLCBjb3B5LCBtb2RpZnksIGFuZCBkaXN0cmlidXRlIHRoaXMgc29mdHdhcmVcbiAqIHVuZGVyIHRoZSBNSVQgTGljZW5zZS4gU2VlIExJQ0VOU0UgZmlsZSBmb3IgZGV0YWlscy5cbiAqL1xuXG5cbmltcG9ydCBwYXRoIGZyb20gXCJub2RlOnBhdGhcIjtcblxuaW1wb3J0IHsgZ2V0UGF0aFN0cmluZyB9IGZyb20gXCJAL3V0aWxzL0ZpbGVTeXN0ZW1cIjtcbmltcG9ydCB7IFNldHRpbmdzU3RvcmFnZSB9IGZyb20gXCJAL3V0aWxzL1NldHRpbmdzU3RvcmFnZVwiO1xuaW1wb3J0IHsgc3Bhd25Bc3luYyB9IGZyb20gXCJAL3V0aWxzL0NoaWxkUHJvY2Vzc1wiO1xuaW1wb3J0IHsgTG9nZ2VyIH0gZnJvbSBcIkAvbG9nZ2VyXCI7XG5cbmNvbnN0IGxvZ2dlciA9IExvZ2dlci5jcmVhdGUoaW1wb3J0Lm1ldGEudXJsKTtcblxuZXhwb3J0IGRlZmF1bHQgYXN5bmMgZnVuY3Rpb24oY29uZmlnOiBhbnksIGVudmlyb25tZW50OiBhbnksIHNldHRpbmdzOiBTZXR0aW5nc1N0b3JhZ2UpIHtcbiAgaWYgKCFjb25maWcuY29tbWFuZClcbiAgICB0aHJvdyBuZXcgRXJyb3IoXCJSZXF1aXJlZCBjb21tYW5kIGZpZWxkIGZvciBwcm9jZXNzIGFjdGlvblwiKTtcbiAgY29uc3Qgc291cmNlRGlyID0gZ2V0UGF0aFN0cmluZyhjb25maWcuc291cmNlRGlyKTtcbiAgY29uc3QgYmluYXJ5RGlyID0gZ2V0UGF0aFN0cmluZyhjb25maWcuYmluYXJ5RGlyKTtcbiAgbGV0IHsgY29tbWFuZCB9ID0gY29uZmlnO1xuICBpZiAoIXBhdGguaXNBYnNvbHV0ZShjb21tYW5kKSAmJiAoY29tbWFuZC5pbmNsdWRlcyhwYXRoLnBvc2l4LmRlbGltaXRlcikgfHwgY29tbWFuZC5pbmNsdWRlcyhwYXRoLndpbjMyLmRlbGltaXRlcikpKSB7XG4gICAgY29tbWFuZCA9IHBhdGgucmVzb2x2ZShzb3VyY2VEaXIsIGNvbW1hbmQpO1xuICB9XG4gIGNvbnN0IHJlcyA9IGF3YWl0IHNwYXduQXN5bmMoY29tbWFuZCwgY29uZmlnLmFyZ3MgfHwgW10sIHtcbiAgICBjd2Q6IGJpbmFyeURpcixcbiAgICBlbnY6IGVudmlyb25tZW50LFxuICAgIGV4dHJhOiB7XG4gICAgICBvdXRwdXQ6IGBwcm9jZXNzLmxvZ2AsXG4gICAgfSxcbiAgfSk7XG4gIGlmIChyZXMuc3RhdHVzICE9PSAwKSB7XG4gICAgdGhyb3cgbmV3IEVycm9yKGBwcm9jZXNzIHJldHVybmVkIHN0YXR1cyAke3Jlcy5zdGF0dXN9YCk7XG4gIH1cbn1cbiIsIi8qXG4gKiBNSVQgTGljZW5zZVxuICpcbiAqIENvcHlyaWdodCAoYykgMjAyNSAgWXVyaWkgWWFrdWJpbiAoeXVyaWkueWFrdWJpbkBnbWFpbC5jb20pXG4gKlxuICogUGVybWlzc2lvbiBpcyBncmFudGVkIHRvIHVzZSwgY29weSwgbW9kaWZ5LCBhbmQgZGlzdHJpYnV0ZSB0aGlzIHNvZnR3YXJlXG4gKiB1bmRlciB0aGUgTUlUIExpY2Vuc2UuIFNlZSBMSUNFTlNFIGZpbGUgZm9yIGRldGFpbHMuXG4gKi9cblxuZXhwb3J0IGVudW0gQm9vbGVhblR5cGUge1xuICBPTiA9IFwiT05cIixcbiAgT0ZGID0gXCJPRkZcIixcbn07XG5cbi8vIEVudW0gcmVwcmVzZW50aW5nIHZhbHVlIHR5cGVzIHVzZWQgaW4gQ01ha2UgY2FjaGUgdmFyaWFibGVzXG5leHBvcnQgZW51bSBWYWx1ZVR5cGUge1xuICAvLyBSZXByZXNlbnRzIGEgZnVsbCBwYXRoIHRvIGEgZmlsZVxuICBGSUxFUEFUSCA9IFwiRklMRVBBVEhcIixcblxuICAvLyBSZXByZXNlbnRzIGEgcGF0aCB0byBhIGRpcmVjdG9yeVxuICBQQVRIID0gXCJQQVRIXCIsXG5cbiAgLy8gUmVwcmVzZW50cyBhIGJvb2xlYW4gdmFsdWUgKHRydWUvZmFsc2UpXG4gIEJPT0wgPSBcIkJPT0xcIixcblxuICAvLyBSZXByZXNlbnRzIGEgZ2VuZXJpYyBzdHJpbmcgdmFsdWVcbiAgU1RSSU5HID0gXCJTVFJJTkdcIixcbn07XG5cbi8vIEJ1aWxkVHlwZSByZXByZXNlbnRpbmcgY29tbW9uIENNYWtlIGJ1aWxkIHR5cGVzXG5leHBvcnQgZW51bSBCdWlsZFR5cGUge1xuICAvLyBEZWJ1ZyBidWlsZCB0eXBlOiBpbmNsdWRlcyBkZWJ1ZyBzeW1ib2xzLCBubyBvcHRpbWl6YXRpb25cbiAgRGVidWcgPSBcIkRlYnVnXCIsXG5cbiAgLy8gUmVsZWFzZSBidWlsZCB0eXBlOiBvcHRpbWl6ZWQgY29kZSwgbm8gZGVidWcgaW5mb1xuICBSZWxlYXNlID0gXCJSZWxlYXNlXCIsXG5cbiAgLy8gUmVsZWFzZSB3aXRoIGRlYnVnIGluZm86IG9wdGltaXplZCB3aXRoIGRlYnVnIHN5bWJvbHMgaW5jbHVkZWRcbiAgUmVsV2l0aERlYkluZm8gPSBcIlJlbFdpdGhEZWJJbmZvXCIsXG5cbiAgLy8gTWluaW11bSBzaXplIHJlbGVhc2U6IG9wdGltaXplZCBmb3Igc21hbGxlc3QgYmluYXJ5IHNpemVcbiAgTWluU2l6ZVJlbCA9IFwiTWluU2l6ZVJlbFwiLFxufTtcblxuLy8gVGhlIGRlZmF1bHQgbmFtZSBvZiB0aGUgbWFpbiBDTWFrZSBidWlsZCBjb25maWd1cmF0aW9uIGZpbGVcbmV4cG9ydCBjb25zdCBDTUFLRV9MSVNUU19UWFQgPSBcIkNNYWtlTGlzdHMudHh0XCI7XG5cbmV4cG9ydCBlbnVtIEdlbmVyYXRvclR5cGUge1xuICAvLyBOYW1lIG9mIHRoZSBDTWFrZSBnZW5lcmF0b3IgZm9yIHN0YW5kYXJkIFVuaXggJ21ha2UnIGJ1aWxkIHN5c3RlbVxuICBVbml4TWFrZWZpbGVzID0gXCJVbml4IE1ha2VmaWxlc1wiLFxufTtcblxuLy8gTmFtZSBvZiB0aGUgQ01ha2UgZ2VuZXJhdG9yIGZvciBzdGFuZGFyZCBVbml4ICdtYWtlJyBidWlsZCBzeXN0ZW1cbmV4cG9ydCBjb25zdCBERUZBVUxUX0dFTkVSQVRPUjogR2VuZXJhdG9yVHlwZSA9IEdlbmVyYXRvclR5cGUuVW5peE1ha2VmaWxlcztcbiIsIi8qXG4gKiBNSVQgTGljZW5zZVxuICpcbiAqIENvcHlyaWdodCAoYykgMjAyNSAgWXVyaWkgWWFrdWJpbiAoeXVyaWkueWFrdWJpbkBnbWFpbC5jb20pXG4gKlxuICogUGVybWlzc2lvbiBpcyBncmFudGVkIHRvIHVzZSwgY29weSwgbW9kaWZ5LCBhbmQgZGlzdHJpYnV0ZSB0aGlzIHNvZnR3YXJlXG4gKiB1bmRlciB0aGUgTUlUIExpY2Vuc2UuIFNlZSBMSUNFTlNFIGZpbGUgZm9yIGRldGFpbHMuXG4gKi9cblxuaW1wb3J0IHsgQm9vbGVhblR5cGUgfSBmcm9tIFwiQC9jbWFrZS9Db25zdGFudHNcIjtcblxuZXhwb3J0IGZ1bmN0aW9uIGNvbnZlcnRUb1ZhbHVlKG9iajogYW55KTogc3RyaW5nIHtcbiAgaWYgKEFycmF5LmlzQXJyYXkob2JqKSlcbiAgICByZXR1cm4gb2JqLm1hcChpID0+IGNvbnZlcnRUb1ZhbHVlKGkpKS5qb2luKFwiO1wiKTtcblxuICBpZiAodHlwZW9mIG9iaiA9PT0gXCJib29sZWFuXCIpXG4gICAgcmV0dXJuIG9iaiA/IEJvb2xlYW5UeXBlLk9OIDogQm9vbGVhblR5cGUuT0ZGO1xuXG4gIHJldHVybiBvYmoudG9TdHJpbmcoKTtcbn1cbiIsIi8qXG4gKiBNSVQgTGljZW5zZVxuICpcbiAqIENvcHlyaWdodCAoYykgMjAyNSAgWXVyaWkgWWFrdWJpbiAoeXVyaWkueWFrdWJpbkBnbWFpbC5jb20pXG4gKlxuICogUGVybWlzc2lvbiBpcyBncmFudGVkIHRvIHVzZSwgY29weSwgbW9kaWZ5LCBhbmQgZGlzdHJpYnV0ZSB0aGlzIHNvZnR3YXJlXG4gKiB1bmRlciB0aGUgTUlUIExpY2Vuc2UuIFNlZSBMSUNFTlNFIGZpbGUgZm9yIGRldGFpbHMuXG4gKi9cblxuaW1wb3J0IG9zIGZyb20gXCJub2RlOm9zXCI7XG5pbXBvcnQgZnMgZnJvbSBcIm5vZGU6ZnNcIjtcbmltcG9ydCBwYXRoIGZyb20gXCJub2RlOnBhdGhcIjtcblxuaW1wb3J0IHsgc3Bhd25Bc3luYyB9IGZyb20gXCJAL3V0aWxzL0NoaWxkUHJvY2Vzc1wiO1xuaW1wb3J0IHsgQ01BS0VfTElTVFNfVFhULCBERUZBVUxUX0dFTkVSQVRPUiwgVmFsdWVUeXBlIH0gZnJvbSBcIkAvY21ha2UvQ29uc3RhbnRzXCI7XG5pbXBvcnQgeyBjb252ZXJ0VG9WYWx1ZSB9IGZyb20gXCJAL2NtYWtlL0hlbHBlclwiO1xuaW1wb3J0IHsgSG9zdCB9IGZyb20gXCJAL3V0aWxzL0hvc3RcIjtcblxuZnVuY3Rpb24gdG9WYXJUeXBlKGtleTogc3RyaW5nLCB2YWw6IGFueSkge1xuICBjb25zdCBtYXA6IGFueSA9IHtcbiAgICBDTUFLRV9JTlNUQUxMX1BSRUZJWDogVmFsdWVUeXBlLlBBVEgsXG4gICAgQ01BS0VfVE9PTENIQUlOX0ZJTEU6IFZhbHVlVHlwZS5GSUxFUEFUSCxcbiAgfTtcblxuICBpZiAodHlwZW9mIHZhbCA9PT0gXCJib29sZWFuXCIpXG4gICAgcmV0dXJuIFZhbHVlVHlwZS5CT09MO1xuXG4gIGlmIChtYXAuaGFzT3duUHJvcGVydHkoa2V5KSlcbiAgICByZXR1cm4gbWFwW2tleV07XG5cbiAgcmV0dXJuIFZhbHVlVHlwZS5TVFJJTkc7XG59XG5cbmZ1bmN0aW9uIG1ha2VDbWRWYXJpYWJsZShrZXk6IHN0cmluZywgdmFsOiBhbnksIGlzQ2FjaGU6IGJvb2xlYW4pIHtcbiAgbGV0IG5hbWUgPSBrZXk7XG4gIGlmIChpc0NhY2hlKVxuICAgIG5hbWUgKz0gXCI6XCIgKyB0b1ZhclR5cGUoa2V5LCB2YWwpO1xuICByZXR1cm4gbmFtZSArIFwiPVwiICsgY29udmVydFRvVmFsdWUodmFsKTtcbn1cblxuZnVuY3Rpb24gbWFrZUNtZFZhcmlhYmxlcyh2YXJpYWJsZXM6IG9iamVjdCwgaXNDYWNoZTogYm9vbGVhbik6IHN0cmluZ1tdIHtcbiAgY29uc3QgcmVzdWx0OiBzdHJpbmdbXSA9IFtdO1xuICBmb3IgKGNvbnN0IFtrZXksIHZhbF0gb2YgT2JqZWN0LmVudHJpZXModmFyaWFibGVzKSlcbiAgICByZXN1bHQucHVzaChcIi1EXCIsIG1ha2VDbWRWYXJpYWJsZShrZXksIHZhbCwgaXNDYWNoZSkpO1xuICByZXR1cm4gcmVzdWx0O1xufVxuXG5leHBvcnQgaW50ZXJmYWNlIFNjcmlwdE1vZGVPcHRpb25zIHtcbiAgZW52aXJvbm1lbnQ/OiBvYmplY3Q7XG4gIHdvcmtEaXI/OiBzdHJpbmc7XG59O1xuXG5leHBvcnQgY2xhc3MgQ01ha2VQcm9jZXNzIHtcbiAgcHJpdmF0ZSBfY21ha2VQYXRoOiBzdHJpbmc7XG5cbiAgcHVibGljIGNvbnN0cnVjdG9yKGNtYWtlUGF0aDogc3RyaW5nKSB7XG4gICAgdGhpcy5fY21ha2VQYXRoID0gY21ha2VQYXRoO1xuICB9XG5cbiAgcHVibGljIGFzeW5jIHNjcmlwdE1vZGUoc2NyaXB0RmlsZTogc3RyaW5nLCB2YXJpYWJsZXM6IG9iamVjdCwgb3B0aW9ucz86IFNjcmlwdE1vZGVPcHRpb25zKTogUHJvbWlzZTx2b2lkPiB7XG4gICAgY29uc3Qgc3Bhd25BcmdzID0gW1xuICAgICAgLi4ubWFrZUNtZFZhcmlhYmxlcyh2YXJpYWJsZXMsIGZhbHNlKSxcbiAgICAgIFwiLVBcIiwgc2NyaXB0RmlsZSxcbiAgICBdO1xuICAgIGNvbnN0IHJlczogYW55ID0gYXdhaXQgc3Bhd25Bc3luYyh0aGlzLl9jbWFrZVBhdGgsIHNwYXduQXJncywge1xuICAgICAgY3dkOiBvcHRpb25zPy53b3JrRGlyLFxuICAgICAgZW52OiBvcHRpb25zPy5lbnZpcm9ubWVudCB8fCBwcm9jZXNzLmVudixcbiAgICB9KTtcbiAgICBpZiAocmVzLnN0YXR1cyAhPT0gMCkge1xuICAgICAgdGhyb3cgYGNtYWtlLnNjcmlwdE1vZGUgcmV0dXJuZWQgc3RhdHVzICR7cmVzLnN0YXR1c31gO1xuICAgIH1cbiAgfVxuXG4gIHB1YmxpYyBhc3luYyBjb25maWd1cmUoYXJnczogYW55KTogUHJvbWlzZTx2b2lkPiB7XG4gICAgY29uc3Qgc3Bhd25BcmdzID0gW1xuICAgICAgXCItR1wiLCBhcmdzLmdlbmVyYXRvcixcbiAgICAgIC4uLm1ha2VDbWRWYXJpYWJsZXMoYXJncy5jYWNoZVZhcmlhYmxlcywgdHJ1ZSksXG4gICAgICBcIi1TXCIsIGFyZ3Muc291cmNlRGlyLFxuICAgICAgXCItQlwiLCBhcmdzLmJpbmFyeURpcixcbiAgICBdO1xuICBcbiAgICBjb25zdCByZXM6IGFueSA9IGF3YWl0IHNwYXduQXN5bmModGhpcy5fY21ha2VQYXRoLCBzcGF3bkFyZ3MsIHtcbiAgICAgIGN3ZDogYXJncy5iaW5hcnlEaXIsXG4gICAgICBlbnY6IGFyZ3MuZW52aXJvbm1lbnQgfHwgcHJvY2Vzcy5lbnYsXG4gICAgICBleHRyYToge1xuICAgICAgICBvdXRwdXQ6IGBjbWFrZS5jb25maWd1cmUubG9nYCxcbiAgICAgIH0sXG4gICAgfSk7XG4gICAgaWYgKHJlcy5zdGF0dXMgIT09IDApIHtcbiAgICAgIHRocm93IGBDTWFrZS5jb25maWd1cmUgcmV0dXJuZWQgc3RhdHVzICR7cmVzLnN0YXR1c31gO1xuICAgIH1cbiAgfVxuXG4gIHB1YmxpYyBhc3luYyBidWlsZChhcmdzOiBhbnkpOiBQcm9taXNlPHZvaWQ+IHtcbiAgICBhd2FpdCB0aGlzLmNvbmZpZ3VyZShhcmdzKTtcbiAgXG4gICAgY29uc3Qgc3Bhd25BcmdzOiBzdHJpbmdbXSA9IFtcbiAgICAgICctLWJ1aWxkJywgJy4nLFxuICAgICAgJy0tcGFyYWxsZWwnLCBvcy5hdmFpbGFibGVQYXJhbGxlbGlzbSgpLnRvU3RyaW5nKCksXG4gICAgXTtcbiAgICBjb25zdCByZXM6IGFueSA9IGF3YWl0IHNwYXduQXN5bmModGhpcy5fY21ha2VQYXRoLCBzcGF3bkFyZ3MsIHtcbiAgICAgIGN3ZDogYXJncy5iaW5hcnlEaXIsXG4gICAgICBlbnY6IGFyZ3MuZW52aXJvbm1lbnQgfHwgcHJvY2Vzcy5lbnYsXG4gICAgICBleHRyYToge1xuICAgICAgICBvdXRwdXQ6IGBjbWFrZS5idWlsZC5sb2dgLFxuICAgICAgfSxcbiAgICB9KTtcbiAgICBpZiAocmVzLnN0YXR1cyAhPT0gMCkge1xuICAgICAgdGhyb3cgYENNYWtlLmJ1aWxkIHJldHVybmVkIHN0YXR1cyAke3Jlcy5zdGF0dXN9YDtcbiAgICB9XG4gIH1cblxuICBwdWJsaWMgYXN5bmMgaW5zdGFsbChhcmdzOiBhbnkpOiBQcm9taXNlPHZvaWQ+IHtcbiAgICBhd2FpdCB0aGlzLmNvbmZpZ3VyZShhcmdzKTtcblxuICAgIGNvbnN0IHNwYXduQXJncyA9IFtcbiAgICAgICctLWluc3RhbGwnLFxuICAgICAgJy4nLFxuICAgIF07XG4gICAgaWYgKGFyZ3MuaW5zdGFsbERpcikge1xuICAgICAgc3Bhd25BcmdzLnB1c2goJy0tcHJlZml4JywgYXJncy5pbnN0YWxsRGlyKTtcbiAgICB9XG4gICAgY29uc3QgcmVzOiBhbnkgPSBhd2FpdCBzcGF3bkFzeW5jKHRoaXMuX2NtYWtlUGF0aCwgc3Bhd25BcmdzLCB7XG4gICAgICBjd2Q6IGFyZ3MuYmluYXJ5RGlyLFxuICAgICAgZW52OiBhcmdzLmVudmlyb25tZW50IHx8IHByb2Nlc3MuZW52LFxuICAgICAgZXh0cmE6IHtcbiAgICAgICAgb3V0cHV0OiBgY21ha2UuaW5zdGFsbC5sb2dgLFxuICAgICAgfSxcbiAgICB9KTtcbiAgICBpZiAocmVzLnN0YXR1cyAhPT0gMCkge1xuICAgICAgdGhyb3cgYENNYWtlLmluc3RhbGwgcmV0dXJuZWQgc3RhdHVzICR7cmVzLnN0YXR1c31gO1xuICAgIH1cbiAgfVxuICBcbiAgcHVibGljIGFzeW5jIGV4dHJhY3QoYXJnczogYW55KTogUHJvbWlzZTx2b2lkPiB7XG4gICAgY29uc3Qgc3Bhd25BcmdzID0gWyBcIi1FXCIsIFwidGFyXCIsIFwiLXh2ZlwiLCBhcmdzLmZpbGVuYW1lIF07XG4gICAgY29uc3QgcmVzOiBhbnkgPSBhd2FpdCBzcGF3bkFzeW5jKHRoaXMuX2NtYWtlUGF0aCwgc3Bhd25BcmdzLCB7XG4gICAgICBjd2Q6IGFyZ3Mud29ya0RpciB8fCBhcmdzLnNvdXJjZURpciB8fCBhcmdzLmJpbmFyeURpcixcbiAgICAgIGVudjogYXJncy5lbnZpcm9ubWVudCB8fCBwcm9jZXNzLmVudixcbiAgICAgIGV4dHJhOiB7XG4gICAgICAgIG91dHB1dDogYXJncy5sb2dGaWxlIHx8IGBjbWFrZS5leHRyYWN0LmxvZ2AsXG4gICAgICB9LFxuICAgIH0pO1xuICAgIGlmIChyZXMuc3RhdHVzICE9PSAwKSB7XG4gICAgICB0aHJvdyBgRXh0cmFjdCByZXR1cm5lZCBzdGF0dXMgJHtyZXMuc3RhdHVzfWA7XG4gICAgfVxuICB9XG59O1xuXG5sZXQgX2NtYWtlSW5zdGFuY2U6IENNYWtlUHJvY2VzcztcbmV4cG9ydCBuYW1lc3BhY2UgQ01ha2VQcm9jZXNzIHtcbiAgZXhwb3J0IGZ1bmN0aW9uIGdldEluc3RhbmNlKCk6IENNYWtlUHJvY2VzcyB7XG4gICAgaWYgKCFfY21ha2VJbnN0YW5jZSlcbiAgICAgIF9jbWFrZUluc3RhbmNlID0gbmV3IENNYWtlUHJvY2VzcyhcImNtYWtlXCIgKyBIb3N0LmV4ZWN1dGFibGVTdWZmaXgpO1xuICAgIHJldHVybiBfY21ha2VJbnN0YW5jZTtcbiAgfVxufVxuXG5leHBvcnQgY2xhc3MgQ1Rlc3RQcm9jZXNzIHtcbiAgcHJpdmF0ZSBfY3Rlc3RQYXRoOiBzdHJpbmc7XG5cbiAgcHVibGljIGNvbnN0cnVjdG9yKGN0ZXN0UGF0aDogc3RyaW5nKSB7XG4gICAgdGhpcy5fY3Rlc3RQYXRoID0gY3Rlc3RQYXRoO1xuICB9XG5cbiAgcHVibGljIGFzeW5jIGN0ZXN0KGFyZ3M6IGFueSk6IFByb21pc2U8dm9pZD4ge1xuICAgIGNvbnN0IHNwYXduQXJnczogc3RyaW5nW10gPSBbXTtcbiAgICBjb25zdCByZXM6IGFueSA9IGF3YWl0IHNwYXduQXN5bmModGhpcy5fY3Rlc3RQYXRoLCBzcGF3bkFyZ3MsIHtcbiAgICAgIGN3ZDogYXJncy5iaW5hcnlEaXIsXG4gICAgICBlbnY6IGFyZ3MuZW52aXJvbm1lbnQgfHwgcHJvY2Vzcy5lbnYsXG4gICAgICBleHRyYToge1xuICAgICAgICBvdXRwdXQ6IGBjbWFrZS5jdGVzdC5sb2dgLFxuICAgICAgfSxcbiAgICB9KTtcbiAgICBpZiAocmVzLnN0YXR1cyAhPT0gMCkge1xuICAgICAgdGhyb3cgYENUZXN0IHJldHVybmVkIHN0YXR1cyAke3Jlcy5zdGF0dXN9YDtcbiAgICB9XG4gIH1cbn07XG5cbmxldCBfY3Rlc3RJbnN0YW5jZTogQ1Rlc3RQcm9jZXNzO1xuZXhwb3J0IG5hbWVzcGFjZSBDVGVzdFByb2Nlc3Mge1xuICBleHBvcnQgZnVuY3Rpb24gZ2V0SW5zdGFuY2UoKTogQ1Rlc3RQcm9jZXNzIHtcbiAgICBpZiAoIV9jdGVzdEluc3RhbmNlKVxuICAgICAgX2N0ZXN0SW5zdGFuY2UgPSBuZXcgQ1Rlc3RQcm9jZXNzKFwiY3Rlc3RcIiArIEhvc3QuZXhlY3V0YWJsZVN1ZmZpeCk7XG4gICAgcmV0dXJuIF9jdGVzdEluc3RhbmNlO1xuICB9XG59XG5cbmV4cG9ydCBhc3luYyBmdW5jdGlvbiBnZXRQcm9qZWN0SW5mbyhzb3VyY2U6IHN0cmluZykge1xuICBjb25zdCBzdGF0ID0gYXdhaXQgZnMucHJvbWlzZXMuc3RhdChzb3VyY2UpO1xuICBpZiAoc3RhdC5pc0RpcmVjdG9yeSgpKVxuICAgIHNvdXJjZSA9IHBhdGgucmVzb2x2ZShzb3VyY2UsIENNQUtFX0xJU1RTX1RYVCk7XG4gIGNvbnN0IGNvbnRlbnQgPSBhd2FpdCBmcy5wcm9taXNlcy5yZWFkRmlsZShzb3VyY2UsIHsgZW5jb2Rpbmc6ICd1dGY4JyB9KTtcblxuICBjb25zdCBwcm9qZWN0UGF0dGVybiA9IC9wcm9qZWN0ICpcXCggKihbXiBdKykgKihbXildKilcXCkvO1xuICBjb25zdCB2ZXJzaW9uUGF0dGVybiA9IC9WRVJTSU9OICsoW14gXSspLztcblxuICBjb25zdCByZXN1bHQ6IGFueSA9IHt9O1xuICBsZXQgbWF0Y2ggPSBjb250ZW50Lm1hdGNoKHByb2plY3RQYXR0ZXJuKTtcbiAgaWYgKG1hdGNoKSB7XG4gICAgcmVzdWx0Lm5hbWUgPSBtYXRjaFsxXTtcbiAgICBjb25zdCBwcm9qZWN0Q29udGVudCA9IG1hdGNoWzJdO1xuICAgIG1hdGNoID0gcHJvamVjdENvbnRlbnQubWF0Y2godmVyc2lvblBhdHRlcm4pO1xuICAgIGlmIChtYXRjaClcbiAgICAgIHJlc3VsdC52ZXJzaW9uID0gbWF0Y2hbMV07XG4gIH1cblxuICByZXR1cm4gcmVzdWx0O1xufVxuXG5leHBvcnQgZnVuY3Rpb24gbGluZVRvU2luZ2xDb21tZW50KGxpbmU6IHN0cmluZykge1xuICByZXR1cm4gXCIjIFwiICsgbGluZTtcbn1cblxuZXhwb3J0IGZ1bmN0aW9uIGxpbmVUb011bHRpcGxlQ29tbWVudChsaW5lOiBzdHJpbmcpIHtcbiAgcmV0dXJuIGAjWz09PVsgJHtsaW5lfSBdPT09XWA7XG59XG5cbmV4cG9ydCBmdW5jdGlvbiBnZW5lcmF0ZWRTY3JpcHROYW1lQ29tbWVudChmaWxlbmFtZTogc3RyaW5nKSB7XG4gIHJldHVybiBsaW5lVG9TaW5nbENvbW1lbnQoXCJHZW5lcmF0ZWQgZnJvbSBcIiArIHBhdGguYmFzZW5hbWUoZmlsZW5hbWUpKTtcbn1cblxuZXhwb3J0IHsgREVGQVVMVF9HRU5FUkFUT1IgfTtcbiIsIi8qXG4gKiBNSVQgTGljZW5zZVxuICpcbiAqIENvcHlyaWdodCAoYykgMjAyNSAgWXVyaWkgWWFrdWJpbiAoeXVyaWkueWFrdWJpbkBnbWFpbC5jb20pXG4gKlxuICogUGVybWlzc2lvbiBpcyBncmFudGVkIHRvIHVzZSwgY29weSwgbW9kaWZ5LCBhbmQgZGlzdHJpYnV0ZSB0aGlzIHNvZnR3YXJlXG4gKiB1bmRlciB0aGUgTUlUIExpY2Vuc2UuIFNlZSBMSUNFTlNFIGZpbGUgZm9yIGRldGFpbHMuXG4gKi9cblxuaW1wb3J0IGZzIGZyb20gXCJub2RlOmZzXCI7XG5pbXBvcnQgdXJsIGZyb20gXCJub2RlOnVybFwiO1xuXG5pbXBvcnQgeyBDTWFrZVByb2Nlc3MgfSBmcm9tIFwiQC9jbWFrZVwiO1xuaW1wb3J0IHsgUGF0aCB9IGZyb20gXCJAL3V0aWxzL1BhdGhcIjtcbmltcG9ydCB7IG1ha2VQYXRjaCB9IGZyb20gXCJAL3V0aWxzL01ha2VQYXRjaFwiO1xuaW1wb3J0IHsgc2F2ZUlmRGlmZmVyZW50LCBkaXJlY3RvcnlFeGlzdHMgfSBmcm9tIFwiQC91dGlscy9GaWxlU3lzdGVtXCI7XG5pbXBvcnQgeyBTZXR0aW5nc1N0b3JhZ2UgfSBmcm9tIFwiQC91dGlscy9TZXR0aW5nc1N0b3JhZ2VcIjtcbmltcG9ydCB7IGFycmF5V3JhcHBlciwgYXNzaWduT2JqZWN0IH0gZnJvbSBcIkAvdXRpbHMvUHJpbWl0aXZlc1wiO1xuaW1wb3J0IHsgVVNFUl9DT05GSUcsIEJVSUxEX1NFVFRJTkdTX0ZJTEUsIFJFUVVFU1RfQVRURU1QVFMgfSBmcm9tIFwiQC9Db25zdGFudHNcIjtcbmltcG9ydCB7IERFQlVHX0JVSUxEX1RZUEUsIFJFTEVBU0VfQlVJTERfVFlQRSB9IGZyb20gXCJAL2NvcmUvVHlwZXNcIjtcbmltcG9ydCB7IElNUE9SVF9TQ0hFTUUgfSBmcm9tIFwiQC91dGlscy9VcmxTY2hlbWVcIjtcbmltcG9ydCB7IHJlcXVpcmVSZXNvbHZlIH0gZnJvbSBcIkAvdXRpbHMvTW9kdWxlXCI7XG5pbXBvcnQgeyBkb3dubG9hZEZpbGUgfSBmcm9tIFwiQC91dGlscy9IdHRwUmVxdWVzdFwiO1xuaW1wb3J0IHsgQ29tbWFuZE9wdGlvbnMgfSBmcm9tIFwiQC9jb3JlL0NvbW1hbmRPcHRpb25zXCI7XG5pbXBvcnQgeyBMb2dnZXIgfSBmcm9tIFwiQC9sb2dnZXJcIjtcbmltcG9ydCB7IGZpbGVFeGlzdHMgfSBmcm9tIFwiQC91dGlscy9GaWxlU3lzdGVtXCI7XG5pbXBvcnQgeyBpbXBvcnRNb2R1bGUgfSBmcm9tIFwiQC91dGlscy9Nb2R1bGVcIjtcblxuaW1wb3J0IGFjdGlvbnMgZnJvbSBcIkAvYWN0aW9uc1wiO1xuXG5jb25zdCBsb2dnZXIgPSBMb2dnZXIuY3JlYXRlKGltcG9ydC5tZXRhLnVybCk7XG5cbmludGVyZmFjZSBJR2VuZXJhbENvbmZpZyB7XG4gIHdvcmtEaXI6IHN0cmluZztcbiAgYnVpbGRUeXBlOiBzdHJpbmc7XG59O1xuXG5mdW5jdGlvbiBtZXJnZUVudmlyb25tZW50KC4uLmFyZ3M6IGFueSkge1xuICBjb25zdCBlbnZpcm9ubWVudDogYW55ID0ge307XG4gIGZvciAoY29uc3QgZW52IG9mIGFyZ3MpIHtcbiAgICBjb25zdCBsaXN0OiBhbnkgPSBPYmplY3QuZW50cmllcyhlbnYgfHwge30pO1xuICAgIHdoaWxlIChsaXN0Lmxlbmd0aCkge1xuICAgICAgbGV0IFtrZXksdmFsXSA9IGxpc3QucG9wKCk7XG4gICAgICBsZXQgZGVsaW1pdGVyO1xuICAgICAgbGV0IGpvaW5BZnRlciA9IHRydWU7XG4gICAgICBzd2l0Y2ggKGtleSkge1xuICAgICAgY2FzZSBcIlBhdGhcIjpcbiAgICAgIGNhc2UgXCJQQVRIXCI6XG4gICAgICAgIGRlbGltaXRlciA9IFBhdGguZGVsaW1pdGVyO1xuICAgICAgICBqb2luQWZ0ZXIgPSBmYWxzZTtcbiAgICAgICAgYnJlYWs7XG4gICAgICBjYXNlIFwiQ0ZMQUdTXCI6XG4gICAgICBjYXNlIFwiQ1hYRkxBR1NcIjpcbiAgICAgIGNhc2UgXCJMREZMQUdTXCI6XG4gICAgICAgIGRlbGltaXRlciA9IFwiIFwiO1xuICAgICAgICBicmVhaztcbiAgICAgIH1cbiAgICAgIGlmICh0eXBlb2YgdmFsID09PSAnbnVtYmVyJylcbiAgICAgICAgdmFsID0gdmFsLnRvU3RyaW5nKCk7XG4gICAgICBlbHNlIGlmIChBcnJheS5pc0FycmF5KHZhbCkpXG4gICAgICAgIHZhbCA9IHZhbC5qb2luKGRlbGltaXRlcik7XG4gICAgICBpZiAoIWRlbGltaXRlciB8fCAhZW52aXJvbm1lbnRba2V5XSlcbiAgICAgICAgZW52aXJvbm1lbnRba2V5XSA9IHZhbDtcbiAgICAgIGVsc2UgaWYgKGpvaW5BZnRlcilcbiAgICAgICAgZW52aXJvbm1lbnRba2V5XSA9IHZhbCArIGRlbGltaXRlciArIGVudmlyb25tZW50W2tleV07XG4gICAgICBlbHNlXG4gICAgICAgIGVudmlyb25tZW50W2tleV0gPSBlbnZpcm9ubWVudFtrZXldICsgZGVsaW1pdGVyICsgdmFsO1xuICAgIH1cbiAgfVxuICByZXR1cm4gZW52aXJvbm1lbnQ7XG59XG5cbmZ1bmN0aW9uIHJlYmFzZUNvbmZpZyhjb25maWc6IGFueSkge1xuICBjb25zdCBiYXNlQ29uZmlnOiBhbnkgPSB7fTtcbiAgY29uc3Qgb3RoZXJDb25maWc6IGFueSA9IHt9O1xuXG4gIGZvciAoY29uc3QgW2tleSwgZW50cnldIG9mIE9iamVjdC5lbnRyaWVzKGNvbmZpZykgYXMgYW55KSB7XG4gICAgKGVudHJ5LmJhc2UgPyBvdGhlckNvbmZpZyA6IGJhc2VDb25maWcpW2tleV0gPSBlbnRyeTtcbiAgfVxuXG4gIHdoaWxlICh0cnVlKSB7XG4gICAgY29uc3Qga2V5cyA9IE9iamVjdC5rZXlzKG90aGVyQ29uZmlnKTtcbiAgICBpZiAoa2V5cy5sZW5ndGggPT0gMClcbiAgICAgIGJyZWFrO1xuICAgIGNvbnN0IGRvbmVLZXlzID0gW107XG4gICAgZm9yIChjb25zdCBrZXkgb2Yga2V5cykge1xuICAgICAgY29uc3Qgb3RoZXJJdGVyID0gb3RoZXJDb25maWdba2V5XTtcbiAgICAgIGNvbnN0IGJhc2VMaXN0ID0gW107XG4gICAgICBmb3IgKGNvbnN0IGl0ZXIgb2YgYXJyYXlXcmFwcGVyKG90aGVySXRlci5iYXNlKSkge1xuICAgICAgICBjb25zdCBiYXNlRW50cnkgPSBiYXNlQ29uZmlnW2l0ZXJdO1xuICAgICAgICBpZiAoIWJhc2VFbnRyeSkge1xuICAgICAgICAgIGJhc2VMaXN0Lmxlbmd0aCA9IDA7XG4gICAgICAgICAgYnJlYWs7XG4gICAgICAgIH1cbiAgICAgICAgYmFzZUxpc3QucHVzaChiYXNlRW50cnkpO1xuICAgICAgfVxuICAgICAgaWYgKGJhc2VMaXN0Lmxlbmd0aCkge1xuICAgICAgICBiYXNlTGlzdC5wdXNoKG90aGVySXRlcik7XG4gICAgICAgIGxldCBuZXdFbnRyeSA9IHt9O1xuICAgICAgICBmb3IgKGNvbnN0IGl0ZXIgb2YgYmFzZUxpc3QpIHtcbiAgICAgICAgICBhc3NpZ25PYmplY3QobmV3RW50cnksIGl0ZXIpO1xuICAgICAgICB9XG4gICAgICAgIGJhc2VDb25maWdba2V5XSA9IG5ld0VudHJ5O1xuICAgICAgICBkb25lS2V5cy5wdXNoKGtleSk7XG4gICAgICB9XG4gICAgfVxuICAgIGlmIChkb25lS2V5cy5sZW5ndGggPT0gMCkge1xuICAgICAgZm9yIChjb25zdCBrZXkgb2Yga2V5cylcbiAgICAgICAgdGhyb3cgYENhbid0IHNldCBiYXNlIGNvbmZpZyBmb3IgXCIke2tleX1gO1xuICAgIH1cbiAgICBmb3IgKGNvbnN0IGtleSBvZiBkb25lS2V5cykge1xuICAgICAgZGVsZXRlIGJhc2VDb25maWdba2V5XS5iYXNlO1xuICAgICAgZGVsZXRlIG90aGVyQ29uZmlnW2tleV07XG4gICAgfVxuICB9XG5cbiAgcmV0dXJuIGJhc2VDb25maWc7XG59XG5cbmZ1bmN0aW9uIHJlc29sdmVTdHJpbmdXaXRoVmFyaWFibGUoY29uZmlnOiBhbnksIGVudHJ5Q29uZmlnOiBhbnksIHJvb3RDb25maWc6IGFueSwgdmFsOiBhbnkpIHtcbiAgcmV0dXJuIHZhbC5yZXBsYWNlKC9cXCRcXHsoW159XSspXFx9L2csIChtYXRjaDogYW55LCB2YWx1ZTogYW55KSA9PiB7XG4gICAgbGV0IHNlbDtcbiAgICBmb3IgKGNvbnN0IG5hbWUgb2YgdmFsdWUuc3BsaXQoXCIuXCIpKSB7XG4gICAgICBpZiAoc2VsID09PSB1bmRlZmluZWQpIHtcbiAgICAgICAgaWYgKGNvbmZpZy5oYXNPd25Qcm9wZXJ0eShuYW1lKSlcbiAgICAgICAgICBzZWwgPSBjb25maWdbbmFtZV07XG4gICAgICAgIGVsc2UgaWYgKGNvbmZpZyAhPT0gZW50cnlDb25maWcgJiYgZW50cnlDb25maWcuaGFzT3duUHJvcGVydHkobmFtZSkpXG4gICAgICAgICAgc2VsID0gZW50cnlDb25maWdbbmFtZV07XG4gICAgICAgIGVsc2UgaWYgKGNvbmZpZyAhPT0gcm9vdENvbmZpZyAmJiByb290Q29uZmlnLmhhc093blByb3BlcnR5KG5hbWUpKVxuICAgICAgICAgIHNlbCA9IHJvb3RDb25maWdbbmFtZV07XG4gICAgICAgIGVsc2Uge1xuICAgICAgICAgIHRyeSB7XG4gICAgICAgICAgICBjb25zdCBtYWluRmlsZSA9IHJlcXVpcmVSZXNvbHZlKG5hbWUpO1xuICAgICAgICAgICAgaWYgKG1haW5GaWxlKSB7XG4gICAgICAgICAgICAgIHNlbCA9IHsgbWFpbkZpbGUsIG1haW5EaXI6IFBhdGguZGlybmFtZShtYWluRmlsZSksIH07XG4gICAgICAgICAgICB9XG4gICAgICAgICB9IGNhdGNoKGUpIHt9XG4gICAgICAgIH1cbiAgICAgICAgaWYgKHNlbCA9PT0gdW5kZWZpbmVkKVxuICAgICAgICAgIGJyZWFrO1xuICAgICAgfVxuICAgICAgZWxzZSBpZiAoc2VsLmhhc093blByb3BlcnR5KG5hbWUpKSB7XG4gICAgICAgIHNlbCA9IHNlbFtuYW1lXTtcbiAgICAgIH1cbiAgICAgIGVsc2Uge1xuICAgICAgICBzZWwgPSB1bmRlZmluZWQ7XG4gICAgICAgIGJyZWFrO1xuICAgICAgfVxuICAgIH1cbiAgICBpZiAoc2VsID09PSB1bmRlZmluZWQpXG4gICAgICB0aHJvdyBuZXcgRXJyb3IoYFRoZSAke3ZhbHVlfSB2YXJpYWJsZSBkb2VzIG5vdCBleGlzdFwiYCk7XG4gICAgcmV0dXJuIHNlbDtcbiAgfSk7XG59XG5cbmZ1bmN0aW9uIHJlc29sdmVDb25maWdTdHJpbmdzSW1wbChjb25maWc6IGFueSwgZW50cnlDb25maWc6IGFueSwgcm9vdENvbmZpZzogYW55KSB7XG4gIGxldCBjb3VudCA9IDA7XG4gIGZvciAoY29uc3QgW2tleSwgdmFsXSBvZiBPYmplY3QuZW50cmllcyhjb25maWcpKSB7XG4gICAgaWYgKHZhbCAmJiB0eXBlb2YgdmFsID09PSBcIm9iamVjdFwiKVxuICAgICAgY291bnQgKz0gcmVzb2x2ZUNvbmZpZ1N0cmluZ3NJbXBsKHZhbCwgZW50cnlDb25maWcsIHJvb3RDb25maWcpO1xuICAgIGVsc2UgaWYgKHR5cGVvZiB2YWwgPT09IFwic3RyaW5nXCIpIHtcbiAgICAgIGNvbnN0IHYgPSByZXNvbHZlU3RyaW5nV2l0aFZhcmlhYmxlKGNvbmZpZywgZW50cnlDb25maWcsIHJvb3RDb25maWcsIHZhbCk7XG4gICAgICBpZiAodmFsICE9PSB2KSB7XG4gICAgICAgIGNvbmZpZ1trZXldID0gdjtcbiAgICAgICAgY291bnQrKztcbiAgICAgIH1cbiAgICB9XG4gIH1cbiAgcmV0dXJuIGNvdW50O1xufVxuXG5mdW5jdGlvbiByZXNvbHZlQ29uZmlnU3RyaW5ncyhjb25maWc6IGFueSkge1xuICBmb3IgKDs7KSB7XG4gICAgbGV0IGNvdW50ID0gMDtcbiAgICBmb3IgKGNvbnN0IFtrZXksIHZhbF0gb2YgT2JqZWN0LmVudHJpZXMoY29uZmlnKSkge1xuICAgICAgaWYgKHZhbCAmJiB0eXBlb2YgdmFsID09PSBcIm9iamVjdFwiKVxuICAgICAgICBjb3VudCArPSByZXNvbHZlQ29uZmlnU3RyaW5nc0ltcGwodmFsLCB2YWwsIGNvbmZpZyk7XG4gICAgICBlbHNlICBpZiAodHlwZW9mIHZhbCA9PT0gXCJzdHJpbmdcIikge1xuICAgICAgICBjb25zdCB2ID0gcmVzb2x2ZVN0cmluZ1dpdGhWYXJpYWJsZShjb25maWcsIGNvbmZpZywgY29uZmlnLCB2YWwpO1xuICAgICAgICBpZiAodmFsICE9PSB2KSB7XG4gICAgICAgICAgY29uZmlnW2tleV0gPSB2O1xuICAgICAgICAgIGNvdW50Kys7XG4gICAgICAgIH1cbiAgICAgIH1cbiAgICB9XG4gICAgaWYgKCFjb3VudClcbiAgICAgIGJyZWFrO1xuICB9XG59XG5cbmZ1bmN0aW9uIG1ha2VCdWlsZENvbmZpZyhnY29uZmlnOiBJR2VuZXJhbENvbmZpZywgY29uZmlnOiBhbnkpIHtcbiAgaWYgKGNvbmZpZ1tcInNvdXJjZVJvb3RcIl0pIHtcbiAgICB0aHJvdyBuZXcgRXJyb3IoYFZhcmlhYmxlIFwic291cmNlUm9vdFwiIGNhbm5vdCBiZSBjaGFuZ2VkIHRvIFwiJHtjb25maWcuc291cmNlUm9vdH1cImApO1xuICB9XG5cbiAgY29uc3Qgcm9vdENvbmZpZyA9IHJlYmFzZUNvbmZpZyhjb25maWcpO1xuXG4gIHJvb3RDb25maWcuYnVpbGRUeXBlID0gcm9vdENvbmZpZy5idWlsZFR5cGUgfHwgZ2NvbmZpZy5idWlsZFR5cGU7XG4gIHJvb3RDb25maWcuc291cmNlUm9vdCA9IHJvb3RDb25maWcuc291cmNlUm9vdCB8fCBnY29uZmlnLndvcmtEaXI7XG4gIHJvb3RDb25maWcuYmluYXJ5Um9vdCA9IHJvb3RDb25maWcuYmluYXJ5Um9vdCB8fCBQYXRoLmpvaW4oZ2NvbmZpZy53b3JrRGlyLCBcImJ1aWxkXCIpO1xuXG4gIGZvciAoY29uc3QgW2tleSwgZW50cnldIG9mIE9iamVjdC5lbnRyaWVzKHJvb3RDb25maWcpIGFzIGFueSkge1xuICAgIGlmIChlbnRyeSAmJiB0eXBlb2YgZW50cnkgPT09IFwib2JqZWN0XCIgJiYgZW50cnkuYWN0aW9uKSB7XG4gICAgICBlbnRyeS5idWlsZFR5cGUgPSBlbnRyeS5idWlsZFR5cGUgfHwgcm9vdENvbmZpZy5idWlsZFR5cGU7XG4gICAgICBjb25zdCBmb2xkZXIgPSBrZXkucmVwbGFjZShcIjpcIiwgUGF0aC5zZXApO1xuICAgICAgY29uc3Qgd29ya0RpciA9IFBhdGguam9pbihyb290Q29uZmlnLmJpbmFyeVJvb3QsIGZvbGRlcik7XG4gICAgICBlbnRyeS50ZW1wRGlyID0gZW50cnkudGVtcERpciB8fCBQYXRoLmpvaW4od29ya0RpciwgXCJ0bXBcIik7XG4gICAgICBpZiAoZW50cnkuc291cmNlVXJsKSB7XG4gICAgICAgIGlmIChlbnRyeS5zb3VyY2VVcmwuc3RhcnRzV2l0aChJTVBPUlRfU0NIRU1FKSkge1xuICAgICAgICAgIGNvbnN0IGZpbGVuYW1lID0gcmVxdWlyZVJlc29sdmUoZW50cnkuc291cmNlVXJsLnNsaWNlKElNUE9SVF9TQ0hFTUUubGVuZ3RoKSk7XG4gICAgICAgICAgZW50cnkuc291cmNlRGlyID0gUGF0aC5kaXJuYW1lKGZpbGVuYW1lKTtcbiAgICAgICAgfVxuICAgICAgICBlbHNlIHtcbiAgICAgICAgICBlbnRyeS5hcmNoaXZlRGlyID0gZW50cnkuYXJjaGl2ZURpciB8fCBQYXRoLmpvaW4od29ya0RpciwgXCJhcmNcIik7XG4gICAgICAgICAgZW50cnkuZXh0cmFjdERpciA9IGVudHJ5LmV4dHJhY3REaXIgfHwgUGF0aC5qb2luKHdvcmtEaXIsIFwic3JjXCIpO1xuICAgICAgICAgIGlmICghZW50cnkuc291cmNlRGlyKVxuICAgICAgICAgICAgZW50cnkuc291cmNlRGlyID0gZW50cnkuZXh0cmFjdERpcjtcbiAgICAgICAgICBlbHNlIGlmICghUGF0aC5pc0Fic29sdXRlKGVudHJ5LnNvdXJjZURpcikpXG4gICAgICAgICAgICBlbnRyeS5zb3VyY2VEaXIgPSBQYXRoLmpvaW4oZW50cnkuZXh0cmFjdERpciwgZW50cnkuc291cmNlRGlyKTtcbiAgICAgICAgfVxuICAgICAgfVxuICAgICAgZWxzZSBpZiAoIWVudHJ5LnNvdXJjZURpcikge1xuICAgICAgICB0aHJvdyBuZXcgRXJyb3IoYE1pc3Npbmcgc291cmNlRGlyIGZvciAke2tleX0gYWN0aW9uXCJgKTtcbiAgICAgIH1cbiAgICAgIGlmIChlbnRyeS5iaW5hcnlEaXIgPT09IG51bGwpXG4gICAgICAgIGVudHJ5LmJpbmFyeURpciA9IGVudHJ5LnNvdXJjZURpcjtcbiAgICAgIGVsc2UgaWYgKGVudHJ5LmJpbmFyeURpciA9PT0gdW5kZWZpbmVkKVxuICAgICAgICBlbnRyeS5iaW5hcnlEaXIgPSBQYXRoLmpvaW4od29ya0RpciwgXCJiaW5cIik7XG4gICAgfVxuICB9XG5cbiAgcmVzb2x2ZUNvbmZpZ1N0cmluZ3Mocm9vdENvbmZpZyk7XG5cbiAgcmV0dXJuIHJvb3RDb25maWc7XG59XG5cbmFzeW5jIGZ1bmN0aW9uIGRvRXh0cmFjdEFyY2hpdmUoZ2NvbmZpZzogSUdlbmVyYWxDb25maWcsIGVudmlyb25tZW50OiBhbnksIGNvbmZpZzogYW55LCBzZXR0aW5nczogYW55KSB7XG4gIGlmICghY29uZmlnLnNvdXJjZVVybClcbiAgICB0aHJvdyBuZXcgRXJyb3IoXCJVbmtub3duIHNvdXJjZVVybFwiKTtcbiAgaWYgKCFjb25maWcuYXJjaGl2ZURpcilcbiAgICB0aHJvdyBuZXcgRXJyb3IoXCJVbmtub3duIGFyY2hpdmVEaXJcIik7XG4gIGlmICghY29uZmlnLmV4dHJhY3REaXIpXG4gICAgdGhyb3cgbmV3IEVycm9yKFwiVW5rbm93biBleHRyYWN0RGlyXCIpO1xuXG4gIGlmICghYXdhaXQgZGlyZWN0b3J5RXhpc3RzKGNvbmZpZy5hcmNoaXZlRGlyKSkge1xuICAgIGxvZ2dlci5ub3RpY2UoYG1rZGlyIC1wICR7Y29uZmlnLmFyY2hpdmVEaXJ9YCk7XG4gICAgYXdhaXQgZnMucHJvbWlzZXMubWtkaXIoY29uZmlnLmFyY2hpdmVEaXIsIHsgcmVjdXJzaXZlOiB0cnVlIH0pO1xuICB9XG5cbiAgaWYgKCFhd2FpdCBkaXJlY3RvcnlFeGlzdHMoY29uZmlnLnRlbXBEaXIpKSB7XG4gICAgbG9nZ2VyLm5vdGljZShgbWtkaXIgLXAgJHtjb25maWcudGVtcERpcn1gKTtcbiAgICBhd2FpdCBmcy5wcm9taXNlcy5ta2Rpcihjb25maWcudGVtcERpciwgeyByZWN1cnNpdmU6IHRydWUgfSk7XG4gIH1cblxuICBjb25zdCBhcmNOYW1lID0gUGF0aC5iYXNlbmFtZShjb25maWcuc291cmNlVXJsKTtcblxuICBsZXQgYXJjRmlsZTtcbiAgbGV0IGRvd25sb2FkVXJscyA9IGF3YWl0IHNldHRpbmdzLmdldChcImRvd25sb2FkVXJsc1wiKSB8fCB7fTtcbiAgaWYgKGRvd25sb2FkVXJsc1tjb25maWcuc291cmNlVXJsXSlcbiAgICBhcmNGaWxlID0gZG93bmxvYWRVcmxzW2NvbmZpZy5zb3VyY2VVcmxdO1xuICBlbHNlIHtcbiAgICBhcmNGaWxlID0gUGF0aC5qb2luKGNvbmZpZy5hcmNoaXZlRGlyLCBhcmNOYW1lKTtcbiAgICBhd2FpdCBkb3dubG9hZEZpbGUoY29uZmlnLnNvdXJjZVVybCwgYXJjRmlsZSwgeyBhdHRlbXB0czogUkVRVUVTVF9BVFRFTVBUUyB9KTtcbiAgICBkb3dubG9hZFVybHNbY29uZmlnLnNvdXJjZVVybF0gPSBhcmNGaWxlO1xuICAgIGF3YWl0IHNldHRpbmdzLnNldChcImRvd25sb2FkVXJsc1wiLCBkb3dubG9hZFVybHMpO1xuICB9XG5cbiAgbGV0IGV4dHJhY3REaXI7XG4gIGxldCBleHRyYWN0RmlsZXMgPSBhd2FpdCBzZXR0aW5ncy5nZXQoXCJleHRyYWN0RmlsZXNcIikgfHwge307XG4gIGlmIChleHRyYWN0RmlsZXNbYXJjRmlsZV0pIHtcbiAgICBleHRyYWN0RGlyID0gZXh0cmFjdEZpbGVzW2FyY0ZpbGVdO1xuICB9XG4gIGVsc2Uge1xuICAgIGV4dHJhY3REaXIgPSBhd2FpdCBmcy5wcm9taXNlcy5ta2R0ZW1wKFBhdGgucmVzb2x2ZShjb25maWcudGVtcERpciwgYXJjTmFtZSArICcuJykpO1xuICBcbiAgICBhd2FpdCBDTWFrZVByb2Nlc3MuZ2V0SW5zdGFuY2UoKS5leHRyYWN0KHtcbiAgICAgIGVudmlyb25tZW50LFxuICAgICAgZmlsZW5hbWU6IGFyY0ZpbGUsXG4gICAgICB3b3JrRGlyOiBleHRyYWN0RGlyLFxuICAgICAgbG9nRmlsZTogIFBhdGguam9pbihjb25maWcudGVtcERpciwgUGF0aC5iYXNlbmFtZShleHRyYWN0RGlyKSArIFwiLmxvZ1wiKSxcbiAgICB9KTtcbiAgXG4gICAgY29uc3QgZXh0cmFjdExpc3QgPSBhd2FpdCBmcy5wcm9taXNlcy5yZWFkZGlyKGV4dHJhY3REaXIpO1xuICAgIGlmIChleHRyYWN0TGlzdC5sZW5ndGggPT09IDEpIHtcbiAgICAgIGV4dHJhY3REaXIgPSBQYXRoLnJlc29sdmUoZXh0cmFjdERpciwgZXh0cmFjdExpc3RbMF0pO1xuICAgICAgaWYgKCFhd2FpdCBkaXJlY3RvcnlFeGlzdHMoZXh0cmFjdERpcikpIHtcbiAgICAgICAgbG9nZ2VyLm5vdGljZShgcm0gLWZyICR7ZXh0cmFjdERpcn1gKTtcbiAgICAgICAgYXdhaXQgZnMucHJvbWlzZXMucm0oZXh0cmFjdERpciwgeyByZWN1cnNpdmU6IHRydWUgfSk7XG4gICAgICAgIHRocm93IG5ldyBFcnJvcihgU3VwcG9ydCBvbmx5IGRpcmVjdG9yeSBmb3IgYXJjaGl2ZWApO1xuICAgICAgfVxuICAgIH1cbiAgXG4gICAgaWYgKGF3YWl0IGRpcmVjdG9yeUV4aXN0cyhjb25maWcuZXh0cmFjdERpcikpIHtcbiAgICAgIC8vIFRPRE86IE1hcmdlIGV4dHJhY3REaXIgd2l0aCBvdXRwdXRcbiAgICAgIGxvZ2dlci5ub3RpY2UoYHJtIC1mciAke2NvbmZpZy5leHRyYWN0RGlyfWApO1xuICAgICAgYXdhaXQgZnMucHJvbWlzZXMucm0oY29uZmlnLmV4dHJhY3REaXIsIHsgcmVjdXJzaXZlOiB0cnVlIH0pO1xuICAgIH1cbiAgICBlbHNlIHtcbiAgICAgIGNvbnN0IHBhcmVudERpciA9IFBhdGguZGlybmFtZShjb25maWcuZXh0cmFjdERpcik7XG4gICAgICBpZiAoIWF3YWl0IGRpcmVjdG9yeUV4aXN0cyhwYXJlbnREaXIpKSB7XG4gICAgICAgIGxvZ2dlci5ub3RpY2UoYG1rZGlyIC1wICR7cGFyZW50RGlyfWApO1xuICAgICAgICBhd2FpdCBmcy5wcm9taXNlcy5ta2RpcihwYXJlbnREaXIsIHsgcmVjdXJzaXZlOiB0cnVlIH0pOyBcbiAgICAgIH1cbiAgICB9XG4gIFxuICAgIGxvZ2dlci5ub3RpY2UoYG12ICR7ZXh0cmFjdERpcn0gJHtjb25maWcuZXh0cmFjdERpcn1gKTtcbiAgICBhd2FpdCBmcy5wcm9taXNlcy5yZW5hbWUoZXh0cmFjdERpciwgY29uZmlnLmV4dHJhY3REaXIpO1xuICBcbiAgICBleHRyYWN0RmlsZXNbYXJjRmlsZV0gPSBleHRyYWN0RGlyO1xuICAgIGF3YWl0IHNldHRpbmdzLnNldChcImV4dHJhY3RGaWxlc1wiLCBleHRyYWN0RmlsZXMpO1xuICB9XG5cbiAgaWYgKGNvbmZpZy5wYXRjaERpcikge1xuICAgIGxldCBwYXRjaERpcnMgPSBhd2FpdCBzZXR0aW5ncy5nZXQoXCJwYXRjaERpcnNcIikgfHwge307XG4gICAgaWYgKCFwYXRjaERpcnNbY29uZmlnLnBhdGNoRGlyXSkge1xuICAgICAgYXdhaXQgbWFrZVBhdGNoKGNvbmZpZy5wYXRjaERpciwgY29uZmlnLmV4dHJhY3REaXIpO1xuICAgICAgcGF0Y2hEaXJzW2NvbmZpZy5wYXRjaERpcl0gPSBjb25maWcuZXh0cmFjdERpcjtcbiAgICAgIGF3YWl0IHNldHRpbmdzLnNldChcInBhdGNoRGlyc1wiLCBwYXRjaERpcnMpO1xuICAgIH1cbiAgfVxufVxuXG5hc3luYyBmdW5jdGlvbiBkb1RhcmdldEJ1aWxkKGdjb25maWc6IElHZW5lcmFsQ29uZmlnLCBlbnZpcm9ubWVudDogYW55LCBjb25maWc6IGFueSwgc2V0dGluZ3M6IFNldHRpbmdzU3RvcmFnZSkge1xuICBpZiAoY29uZmlnLnByZUFjdGlvbikge1xuICAgIGF3YWl0IHNldHRpbmdzLnB1c2goXCJwcmVBY3Rpb25cIik7XG4gICAgY29uc3QgbmV3Q29uZmlnOiBhbnkgPSB7fTtcbiAgICBhc3NpZ25PYmplY3QobmV3Q29uZmlnLCBjb25maWcpO1xuICAgIGRlbGV0ZSBuZXdDb25maWcuYWN0aW9uO1xuICAgIGRlbGV0ZSBuZXdDb25maWcucHJlQWN0aW9uO1xuICAgIGRlbGV0ZSBuZXdDb25maWcucG9zdEFjdGlvbjtcbiAgICBhc3NpZ25PYmplY3QobmV3Q29uZmlnLCBjb25maWcucHJlQWN0aW9uKTtcbiAgICBjb25zdCBuZXdFbnZpcm9ubWVudCA9IG1lcmdlRW52aXJvbm1lbnQoY29uZmlnLnByZUFjdGlvbi5lbnZpcm9ubWVudCwgZW52aXJvbm1lbnQpO1xuICAgIGF3YWl0IGRvVGFyZ2V0QnVpbGQoZ2NvbmZpZywgbmV3RW52aXJvbm1lbnQsIG5ld0NvbmZpZywgc2V0dGluZ3MpO1xuICAgIGF3YWl0IHNldHRpbmdzLnBvcCgpO1xuICB9XG5cbiAgaWYgKEFycmF5LmlzQXJyYXkoY29uZmlnLmFjdGlvbikpIHtcbiAgICBhd2FpdCBzZXR0aW5ncy5wdXNoKFwiYWN0aW9uXCIpO1xuICAgIGZvciAodmFyIGkgPSAwOyBpIDwgY29uZmlnLmFjdGlvbi5sZW5ndGg7ICsraSkge1xuICAgICAgYXdhaXQgc2V0dGluZ3MucHVzaChpLnRvU3RyaW5nKCkpO1xuICAgICAgY29uc3QgbmV3Q29uZmlnOiBhbnkgPSB7fTtcbiAgICAgIGFzc2lnbk9iamVjdChuZXdDb25maWcsIGNvbmZpZyk7XG4gICAgICBkZWxldGUgbmV3Q29uZmlnLmFjdGlvbjtcbiAgICAgIGRlbGV0ZSBuZXdDb25maWcucHJlQWN0aW9uO1xuICAgICAgZGVsZXRlIG5ld0NvbmZpZy5wb3N0QWN0aW9uO1xuICAgICAgYXNzaWduT2JqZWN0KG5ld0NvbmZpZywgY29uZmlnLmFjdGlvbltpXSk7XG4gICAgICBjb25zdCBuZXdFbnZpcm9ubWVudCA9IG1lcmdlRW52aXJvbm1lbnQoY29uZmlnLmFjdGlvbltpXS5lbnZpcm9ubWVudCwgZW52aXJvbm1lbnQpO1xuICAgICAgYXdhaXQgZG9UYXJnZXRCdWlsZChnY29uZmlnLCBuZXdFbnZpcm9ubWVudCwgbmV3Q29uZmlnLCBzZXR0aW5ncyk7XG4gICAgICBhd2FpdCBzZXR0aW5ncy5wb3AoKTtcbiAgICB9XG4gICAgYXdhaXQgc2V0dGluZ3MucG9wKCk7XG4gIH1cbiAgZWxzZSB7XG4gICAgaWYgKCFhd2FpdCBkaXJlY3RvcnlFeGlzdHMoY29uZmlnLmJpbmFyeURpcikpIHtcbiAgICAgIGF3YWl0IGZzLnByb21pc2VzLm1rZGlyKGNvbmZpZy5iaW5hcnlEaXIsIHsgcmVjdXJzaXZlOiB0cnVlIH0pO1xuICAgIH1cbiAgICBpZiAoYWN0aW9uc1tjb25maWcuYWN0aW9uXSkge1xuICAgICAgY29uZmlnLmRlc2NyaXB0aW9uICYmIGxvZ2dlci5ub3RpY2UoY29uZmlnLmRlc2NyaXB0aW9uKTtcbiAgICAgIGF3YWl0IGFjdGlvbnNbY29uZmlnLmFjdGlvbl0oY29uZmlnLCBlbnZpcm9ubWVudCwgc2V0dGluZ3MpO1xuICAgIH1cbiAgfVxuXG4gIGlmIChjb25maWcucG9zdEFjdGlvbikge1xuICAgIGF3YWl0IHNldHRpbmdzLnB1c2goXCJwb3N0QWN0aW9uXCIpO1xuICAgIGNvbnN0IG5ld0NvbmZpZzogYW55ID0ge307XG4gICAgYXNzaWduT2JqZWN0KG5ld0NvbmZpZywgY29uZmlnKTtcbiAgICBkZWxldGUgbmV3Q29uZmlnLmFjdGlvbjtcbiAgICBkZWxldGUgbmV3Q29uZmlnLnByZUFjdGlvbjtcbiAgICBkZWxldGUgbmV3Q29uZmlnLnBvc3RBY3Rpb247XG4gICAgYXNzaWduT2JqZWN0KG5ld0NvbmZpZywgY29uZmlnLnBvc3RBY3Rpb24pO1xuICAgIGNvbnN0IG5ld0Vudmlyb25tZW50ID0gbWVyZ2VFbnZpcm9ubWVudChjb25maWcucG9zdEFjdGlvbi5lbnZpcm9ubWVudCwgZW52aXJvbm1lbnQpO1xuICAgIGF3YWl0IGRvVGFyZ2V0QnVpbGQoZ2NvbmZpZywgbmV3RW52aXJvbm1lbnQsIG5ld0NvbmZpZywgc2V0dGluZ3MpO1xuICAgIGF3YWl0IHNldHRpbmdzLnBvcCgpO1xuICB9XG59XG5cbmFzeW5jIGZ1bmN0aW9uIGdldFVzZXJDb25maWcob3B0aW9uczogQ29tbWFuZE9wdGlvbnMpIHtcbiAgbGV0IGNvbmZpZ1BhdGg7XG4gIGlmIChvcHRpb25zLmVudi5jb25maWcpIHtcbiAgICBjb25maWdQYXRoID0gUGF0aC5pc0Fic29sdXRlKG9wdGlvbnMuZW52LmNvbmZpZykgPyBvcHRpb25zLmVudi5jb25maWcgOiBQYXRoLnJlc29sdmUob3B0aW9ucy53b3JrRGlyLCBvcHRpb25zLmVudi5jb25maWcpO1xuICAgIGlmICghYXdhaXQgZmlsZUV4aXN0cyhjb25maWdQYXRoKSlcbiAgICAgIHRocm93IGBDb25maWd1cmF0aW9uICcke29wdGlvbnMuZW52LmNvbmZpZ30nIGZpbGUgZG9lcyBub3QgZXhpc3RgO1xuICB9XG4gIGVsc2Uge1xuICAgIGNvbnN0IHVzZXJDb25maWdQYXRoID0gUGF0aC5yZXNvbHZlKG9wdGlvbnMud29ya0RpciwgVVNFUl9DT05GSUcpO1xuICAgIGlmIChhd2FpdCBmaWxlRXhpc3RzKHVzZXJDb25maWdQYXRoKSlcbiAgICAgIGNvbmZpZ1BhdGggPSB1c2VyQ29uZmlnUGF0aDtcbiAgICBlbHNlIHtcbiAgICAgIGxvZ2dlci53YXJuKGBDb25maWcgZmlsZSAnJHtVU0VSX0NPTkZJR30nIGlzIG5vdCBhdmFpbGFibGVgKTtcbiAgICB9XG4gIH1cblxuICBpZiAoIWNvbmZpZ1BhdGgpIHtcbiAgICByZXR1cm4ge1xuICAgICAgXCJidW5kbGU6b3V0cHV0XCI6IHtcbiAgICAgICAgYWN0aW9uOiBcImJpdG1ha2VcIixcbiAgICAgICAgdmFyaWFibGVzOiB7XG4gICAgICAgICAgSU5TVEFMTF9QUkVGSVg6IFwiL3VzclwiLFxuICAgICAgICB9LFxuICAgICAgICBzb3VyY2VEaXI6IFwiJHtzb3VyY2VSb290fVwiLFxuICAgICAgICBkZXN0RGlyOiBcIiR7YmluYXJ5Um9vdH0vb3V0cHV0XCIsXG4gICAgICB9XG4gICAgfTtcbiAgfVxuXG4gIGNvbnN0IGNvbmZpZ1VybCA9IHVybC5wYXRoVG9GaWxlVVJMKGNvbmZpZ1BhdGgpO1xuICBjb25zdCBjb25maWdNb2R1bGUgPSBhd2FpdCBpbXBvcnRNb2R1bGUoY29uZmlnVXJsKTtcbiAgc3dpdGNoICh0eXBlb2YgY29uZmlnTW9kdWxlLmRlZmF1bHQpIHtcbiAgY2FzZSBcImZ1bmN0aW9uXCI6XG4gICAgY29uc3QgdXNlckNvbmZpZyA9IGNvbmZpZ01vZHVsZS5kZWZhdWx0KG9wdGlvbnMuZW52LCB7fSk7XG4gICAgaWYgKHVzZXJDb25maWcgaW5zdGFuY2VvZiBQcm9taXNlKVxuICAgICAgcmV0dXJuIGF3YWl0IHVzZXJDb25maWc7XG4gICAgcmV0dXJuIHVzZXJDb25maWc7XG5cbiAgY2FzZSBcIm9iamVjdFwiOlxuICAgIHJldHVybiBjb25maWdNb2R1bGUuZGVmYXVsdDtcblxuICBkZWZhdWx0OlxuICAgIHRocm93IG5ldyBFcnJvcihgVW5rbm93biB1c2VyIGNvbmZpZ3VyYXRpb24gdHlwZWApO1xuICB9XG59XG5cbmV4cG9ydCBkZWZhdWx0IGFzeW5jIChvcHRpb25zOiBDb21tYW5kT3B0aW9ucykgPT4ge1xuICBjb25zdCBnY29uZmlnOiBJR2VuZXJhbENvbmZpZyA9IHtcbiAgICBidWlsZFR5cGU6IG9wdGlvbnMuZW52LmJ1aWxkVHlwZSA9PSBERUJVR19CVUlMRF9UWVBFID8gb3B0aW9ucy5lbnYuYnVpbGRUeXBlIDogUkVMRUFTRV9CVUlMRF9UWVBFLFxuICAgIHdvcmtEaXI6IG9wdGlvbnMud29ya0RpcixcbiAgfTtcblxuICBjb25zdCB1c2VyQ29uZmlnID0gYXdhaXQgZ2V0VXNlckNvbmZpZyhvcHRpb25zKTtcbiAgY29uc3QgYnVpbGRDb25maWcgPSBtYWtlQnVpbGRDb25maWcoZ2NvbmZpZywgdXNlckNvbmZpZyk7XG5cbiAgaWYgKGJ1aWxkQ29uZmlnLlJFQ0lQRV9DT05URU5UX0ZJTEUpIHtcbiAgICBjb25zdCBqc29uQ29uZmlnID0gSlNPTi5zdHJpbmdpZnkoYnVpbGRDb25maWcsIG51bGwsIDIpO1xuICAgIGF3YWl0IHNhdmVJZkRpZmZlcmVudChidWlsZENvbmZpZy5SRUNJUEVfQ09OVEVOVF9GSUxFLCBqc29uQ29uZmlnKTtcbiAgfVxuXG4gIGNvbnN0IHNldHRpbmdzRmlsZW5hbWUgPSBQYXRoLnJlc29sdmUoYnVpbGRDb25maWcuYmluYXJ5Um9vdCwgQlVJTERfU0VUVElOR1NfRklMRSk7XG4gIGNvbnN0IHNldHRpbmdzID0gbmV3IFNldHRpbmdzU3RvcmFnZShzZXR0aW5nc0ZpbGVuYW1lKTtcblxuICBmb3IgKGNvbnN0IFtrZXksIGVudHJ5XSBvZiBPYmplY3QuZW50cmllcyhidWlsZENvbmZpZykgYXMgYW55KSB7XG4gICAgaWYgKGVudHJ5ICYmIHR5cGVvZiBlbnRyeSA9PT0gXCJvYmplY3RcIiAmJiBlbnRyeS5hY3Rpb24gJiYgIWVudHJ5LmRpc2FibGVkKSB7XG4gICAgICBhd2FpdCBzZXR0aW5ncy5wdXNoKGtleSk7XG4gICAgICBjb25zdCBjb21wbGV0ZWQgPSBhd2FpdCBzZXR0aW5ncy5nZXQoXCJjb21wbGV0ZWRcIik7XG4gICAgICBpZiAoZW50cnkucmVidWlsZCB8fCAhY29tcGxldGVkKSB7XG4gICAgICAgIGxvZ2dlci5pbmZvKGBTdGFydGVkIGFjdGlvbjogJHtrZXl9YCk7XG4gICAgICAgIGNvbnN0IGVudmlyb25tZW50ID0gbWVyZ2VFbnZpcm9ubWVudChlbnRyeS5lbnZpcm9ubWVudCwgcHJvY2Vzcy5lbnYpO1xuICAgICAgICBpZiAoZW50cnkuc291cmNlVXJsICYmICFlbnRyeS5zb3VyY2VVcmwuc3RhcnRzV2l0aChJTVBPUlRfU0NIRU1FKSkge1xuICAgICAgICAgIGF3YWl0IGRvRXh0cmFjdEFyY2hpdmUoZ2NvbmZpZywgZW52aXJvbm1lbnQsIGVudHJ5LCBzZXR0aW5ncyk7XG4gICAgICAgIH1cbiAgICAgICAgYXdhaXQgZG9UYXJnZXRCdWlsZChnY29uZmlnLCBlbnZpcm9ubWVudCwgZW50cnksIHNldHRpbmdzKTtcbiAgICAgICAgYXdhaXQgc2V0dGluZ3Muc2V0KFwiY29tcGxldGVkXCIsIHRydWUpO1xuICAgICAgICBsb2dnZXIuaW5mbyhgQ29tcGxldGVkIGFjdGlvbjogJHtrZXl9YCk7XG4gICAgICB9XG4gICAgICBhd2FpdCBzZXR0aW5ncy5wb3AoKTtcbiAgICB9XG4gIH1cbn1cbiIsIi8qXG4gKiBNSVQgTGljZW5zZVxuICpcbiAqIENvcHlyaWdodCAoYykgMjAyNSAgWXVyaWkgWWFrdWJpbiAoeXVyaWkueWFrdWJpbkBnbWFpbC5jb20pXG4gKlxuICogUGVybWlzc2lvbiBpcyBncmFudGVkIHRvIHVzZSwgY29weSwgbW9kaWZ5LCBhbmQgZGlzdHJpYnV0ZSB0aGlzIHNvZnR3YXJlXG4gKiB1bmRlciB0aGUgTUlUIExpY2Vuc2UuIFNlZSBMSUNFTlNFIGZpbGUgZm9yIGRldGFpbHMuXG4gKi9cblxuaW1wb3J0IHsgQ29tbWFuZE9wdGlvbnMgfSBmcm9tIFwiQC9jb3JlL0NvbW1hbmRPcHRpb25zXCI7XG5pbXBvcnQgaW5pdCBmcm9tIFwiQC9jb21tYW5kcy9pbml0XCI7XG5pbXBvcnQgYnVpbGQgZnJvbSBcIkAvY29tbWFuZHMvYnVpbGRcIjtcblxuZXhwb3J0IGRlZmF1bHQge1xuICBkZWZhdWx0OiBidWlsZCxcbiAgaW5pdCxcbiAgYnVpbGQsXG59IGFzIHsgW25hbWU6IHN0cmluZ106IChvcHRpb25zOiBDb21tYW5kT3B0aW9ucykgPT4gYW55OyB9O1xuIiwiLypcbiAqIE1JVCBMaWNlbnNlXG4gKlxuICogQ29weXJpZ2h0IChjKSAyMDI1ICBZdXJpaSBZYWt1YmluICh5dXJpaS55YWt1YmluQGdtYWlsLmNvbSlcbiAqXG4gKiBQZXJtaXNzaW9uIGlzIGdyYW50ZWQgdG8gdXNlLCBjb3B5LCBtb2RpZnksIGFuZCBkaXN0cmlidXRlIHRoaXMgc29mdHdhcmVcbiAqIHVuZGVyIHRoZSBNSVQgTGljZW5zZS4gU2VlIExJQ0VOU0UgZmlsZSBmb3IgZGV0YWlscy5cbiAqL1xuXG5pbXBvcnQgcGF0aCBmcm9tIFwibm9kZTpwYXRoXCI7XG5pbXBvcnQgZnMgZnJvbSBcIm5vZGU6ZnNcIjtcblxuaW1wb3J0IHsgZmlsZUV4aXN0cywgZmV0Y2hCdWZmZXIgfSBmcm9tIFwiQC91dGlscy9GaWxlU3lzdGVtXCI7XG5pbXBvcnQgeyBVU0VSX0NPTkZJRyB9IGZyb20gXCJAL0NvbnN0YW50c1wiO1xuaW1wb3J0IHsgQ29tbWFuZE9wdGlvbnMgfSBmcm9tIFwiQC9jb3JlL0NvbW1hbmRPcHRpb25zXCI7XG5pbXBvcnQgeyBMb2dnZXIgfSBmcm9tIFwiQC9sb2dnZXJcIjtcblxuY29uc3QgbG9nZ2VyID0gTG9nZ2VyLmNyZWF0ZShpbXBvcnQubWV0YS51cmwpO1xuXG5leHBvcnQgZGVmYXVsdCBhc3luYyBmdW5jdGlvbihvcHRpb25zOiBDb21tYW5kT3B0aW9ucykge1xuICBjb25zdCBwcmVzZXQgPSBvcHRpb25zLmVudi5wcmVzZXQ7XG5cbiAgaWYgKCFwcmVzZXQpXG4gICAgdGhyb3cgbmV3IEVycm9yKGBQcmVzZXQgJyR7cHJlc2V0fScgaXMgbm90IGF2YWlsYWJsZWApO1xuXG4gIGNvbnN0IHByZXNldERhdGEgPSBhd2FpdCBmZXRjaEJ1ZmZlcihwcmVzZXQpO1xuXG4gIGNvbnN0IHVzZXJDb25maWdQYXRoID0gcGF0aC5yZXNvbHZlKG9wdGlvbnMud29ya0RpciwgVVNFUl9DT05GSUcpO1xuICBpZiAoYXdhaXQgZmlsZUV4aXN0cyh1c2VyQ29uZmlnUGF0aCkpXG4gICAgYXdhaXQgZnMucHJvbWlzZXMucm0odXNlckNvbmZpZ1BhdGgpO1xuXG4gIGF3YWl0IGZzLnByb21pc2VzLndyaXRlRmlsZSh1c2VyQ29uZmlnUGF0aCwgcHJlc2V0RGF0YSwgXCJ1dGY4XCIpO1xuICBsb2dnZXIuaW5mbyhgUHJlc2V0ICcke3ByZXNldH0nIGluc3RhbGxlZCBzdWNjZXNzZnVsbHlgKTtcbn1cbiIsIi8qXG4gKiBNSVQgTGljZW5zZVxuICpcbiAqIENvcHlyaWdodCAoYykgMjAyNSAgWXVyaWkgWWFrdWJpbiAoeXVyaWkueWFrdWJpbkBnbWFpbC5jb20pXG4gKlxuICogUGVybWlzc2lvbiBpcyBncmFudGVkIHRvIHVzZSwgY29weSwgbW9kaWZ5LCBhbmQgZGlzdHJpYnV0ZSB0aGlzIHNvZnR3YXJlXG4gKiB1bmRlciB0aGUgTUlUIExpY2Vuc2UuIFNlZSBMSUNFTlNFIGZpbGUgZm9yIGRldGFpbHMuXG4gKi9cblxuaW1wb3J0IHVybCBmcm9tIFwibm9kZTp1cmxcIjtcbmltcG9ydCB7IFBhdGggfSBmcm9tIFwiQC91dGlscy9QYXRoXCI7XG5pbXBvcnQgeyBGSUxFX1NDSEVNRSB9IGZyb20gXCJAL3V0aWxzL1VybFNjaGVtZVwiO1xuaW1wb3J0IHBhdGggZnJvbSBcIm5vZGU6cGF0aFwiO1xuXG5jb25zdCBQQVRIID0gU3ltYm9sKFwiUEFUSFwiKTtcblxuZXhwb3J0IGNsYXNzIEFic29sdXRlUGF0aCB7XG4gIHByaXZhdGUgW1BBVEhdOiBzdHJpbmc7XG5cbiAgcHJvdGVjdGVkIGNvbnN0cnVjdG9yKGZpbGVwYXRoOiBzdHJpbmcpIHtcbiAgICBpZiAoZmlsZXBhdGguc3RhcnRzV2l0aChGSUxFX1NDSEVNRSkpIHtcbiAgICAgIHRoaXNbUEFUSF0gPSBmaWxlcGF0aDtcbiAgICB9XG4gICAgZWxzZSBpZiAoUGF0aC5pc0Fic29sdXRlKGZpbGVwYXRoKSkge1xuICAgICAgdGhpc1tQQVRIXSA9IHVybC5wYXRoVG9GaWxlVVJMKGZpbGVwYXRoKS50b1N0cmluZygpO1xuICAgIH1cbiAgICBlbHNlIHtcbiAgICAgIHRocm93IG5ldyBFcnJvcihgTm90IHN1cHBvcnRlZCByZWxhdGl2ZSBwYXRoIG9mIFwiJHtmaWxlcGF0aH1cImApO1xuICAgIH1cbiAgfVxuXG4gIHB1YmxpYyBqb2luKC4uLnBhdGhzOiBBcnJheTxBYnNvbHV0ZVBhdGggfCBzdHJpbmc+KSB7XG4gICAgY29uc3QgZmlsZXBhdGggPSBQYXRoLmpvaW4odXJsLmZpbGVVUkxUb1BhdGgodGhpc1tQQVRIXSksIC4uLnBhdGhzLm1hcChpID0+IGkudG9TdHJpbmcoKSkpO1xuICAgIHJldHVybiBBYnNvbHV0ZVBhdGguY3JlYXRlKGZpbGVwYXRoKTtcbiAgfVxuXG4gIHB1YmxpYyBkaXJuYW1lKCkge1xuICAgIHJldHVybiBBYnNvbHV0ZVBhdGguY3JlYXRlKHBhdGgucG9zaXguZGlybmFtZSh0aGlzW1BBVEhdKSk7XG4gIH1cblxuICBwdWJsaWMgYmFzZW5hbWUoKSB7XG4gICAgcmV0dXJuIHBhdGgucG9zaXguYmFzZW5hbWUodGhpc1tQQVRIXSk7XG4gIH1cblxuICBwdWJsaWMgcmVsYXRpdmUodG86IEFic29sdXRlUGF0aCB8IHN0cmluZykge1xuICAgIHJldHVybiBQYXRoLnJlbGF0aXZlKHVybC5maWxlVVJMVG9QYXRoKHRoaXNbUEFUSF0pLCBBYnNvbHV0ZVBhdGguY3JlYXRlKHRvKS50b1N0cmluZygpKTtcbiAgfVxuXG4gIHB1YmxpYyByZXNvbHZlKC4uLnBhdGhzOiBBcnJheTxBYnNvbHV0ZVBhdGggfCBzdHJpbmc+KSB7XG4gICAgcmV0dXJuIEFic29sdXRlUGF0aC5jcmVhdGUoUGF0aC5yZXNvbHZlKHVybC5maWxlVVJMVG9QYXRoKHRoaXNbUEFUSF0pLCAuLi5wYXRocy5tYXAoaSA9PiBpLnRvU3RyaW5nKCkpKSk7XG4gIH1cblxuICBwdWJsaWMgbWF0Y2gocmVnZXhwOiBSZWdFeHApIHtcbiAgICByZXR1cm4gdGhpc1tQQVRIXS5tYXRjaChyZWdleHApO1xuICB9XG5cbiAgcHVibGljIHRvU3RyaW5nKCkge1xuICAgIHJldHVybiB1cmwuZmlsZVVSTFRvUGF0aCh0aGlzW1BBVEhdKTtcbiAgfVxuXG4gIHB1YmxpYyB0b1BhdGgoKSB7XG4gICAgaWYgKHRoaXNbUEFUSF0uc3RhcnRzV2l0aChGSUxFX1NDSEVNRSkpXG4gICAgICByZXR1cm4gdXJsLmZpbGVVUkxUb1BhdGgodGhpc1tQQVRIXSk7XG4gICAgdGhyb3cgbmV3IEVycm9yKGBVUkwgJHt0aGlzW1BBVEhdfSBjYW4ndCBjb252ZXJ0IHRvIHBhdGhgKTtcbiAgfVxuXG4gIHB1YmxpYyB2YWx1ZU9mKCkge1xuICAgIHJldHVybiB1cmwuZmlsZVVSTFRvUGF0aCh0aGlzW1BBVEhdKTtcbiAgfVxuXG4gIHB1YmxpYyB0b0pTT04oKSB7XG4gICAgcmV0dXJuIHRoaXNbUEFUSF07XG4gIH1cblxuICBwdWJsaWMgc3RhdGljIGlzQWJzb2x1dGUoZmlsZXBhdGg6IEFic29sdXRlUGF0aCB8IHN0cmluZykge1xuICAgIGlmIChmaWxlcGF0aCBpbnN0YW5jZW9mIEFic29sdXRlUGF0aClcbiAgICAgIHJldHVybiB0cnVlO1xuICAgIHJldHVybiBQYXRoLmlzQWJzb2x1dGUoZmlsZXBhdGgpO1xuICB9XG5cbiAgcHVibGljIHN0YXRpYyBlbnN1cmVJbnN0YW5jZSh2YWx1ZTogYW55KTogQWJzb2x1dGVQYXRoIHtcbiAgICBpZiAodmFsdWUgaW5zdGFuY2VvZiBBYnNvbHV0ZVBhdGgpXG4gICAgICByZXR1cm4gdmFsdWU7XG4gICAgdGhyb3cgbmV3IEVycm9yKGBUaGUgJyR7dmFsdWV9JyBpcyBub3QgYSBBYnNvbHV0ZVBhdGhgKTtcbiAgfVxuXG4gIHB1YmxpYyBzdGF0aWMgY3JlYXRlKHBhdGg6IEFic29sdXRlUGF0aCB8IHN0cmluZyk6IEFic29sdXRlUGF0aCB7XG4gICAgaWYgKHBhdGggaW5zdGFuY2VvZiBBYnNvbHV0ZVBhdGgpXG4gICAgICByZXR1cm4gcGF0aDtcblxuICAgIHJldHVybiBPYmplY3Quc2VhbChuZXcgQWJzb2x1dGVQYXRoKHBhdGgpKTtcbiAgfVxufTtcbiIsIi8qXG4gKiBNSVQgTGljZW5zZVxuICpcbiAqIENvcHlyaWdodCAoYykgMjAyNSAgWXVyaWkgWWFrdWJpbiAoeXVyaWkueWFrdWJpbkBnbWFpbC5jb20pXG4gKlxuICogUGVybWlzc2lvbiBpcyBncmFudGVkIHRvIHVzZSwgY29weSwgbW9kaWZ5LCBhbmQgZGlzdHJpYnV0ZSB0aGlzIHNvZnR3YXJlXG4gKiB1bmRlciB0aGUgTUlUIExpY2Vuc2UuIFNlZSBMSUNFTlNFIGZpbGUgZm9yIGRldGFpbHMuXG4gKi9cblxuaW1wb3J0IHsgSUdlbmVyYWxDb250ZXh0LCBJbnRlcmZhY2VUYXJnZXQgfSBmcm9tIFwiQC9jb3JlL01ha2VJbnRlcmZhY2VzXCI7XG5pbXBvcnQgeyBmaW5kUHJvZ3JhbVN5bmMgfSBmcm9tIFwiQC9jb3JlL0ZpbmRQcm9ncmFtXCI7XG5pbXBvcnQgeyBTY29wZUhlbHBlciwgVmFyaWFibGVNYXAsIFZhcmlhbnRNYXAgfSBmcm9tIFwiQC9jb3JlL1Njb3BlXCI7XG5pbXBvcnQgeyBMb2dnZXIgfSBmcm9tIFwiQC9sb2dnZXJcIjtcbmltcG9ydCB7IFN5c3RlbVNjb3BlIH0gZnJvbSBcIkAvY29yZS9TeXN0ZW1TY29wZVwiO1xuaW1wb3J0IHsgQWJzb2x1dGVQYXRoIH0gZnJvbSBcIkAvY29yZS9BYnNvbHV0ZVBhdGhcIjtcbmltcG9ydCB7IGltcG9ydE1vZHVsZSB9IGZyb20gXCJAL3V0aWxzL01vZHVsZVwiO1xuaW1wb3J0IHsgT2JqZWN0TGlicmFyeSwgU3RhdGljTGlicmFyeSwgU2hhcmVkTGlicmFyeSwgRXhlY3V0YWJsZSwgTWFpblRhcmdldCwgUG9zdFRhcmdldCwgVGFyZ2V0T3B0aW9ucywgQmFzZVRhcmdldE9wdGlvbnMgfSBmcm9tIFwiQC9jb3JlL1RhcmdldFwiO1xuaW1wb3J0IHsgQ1VTVE9NX1ZBUklBQkxFX0dST1VQIH0gZnJvbSBcIkAvQ29uc3RhbnRzXCI7XG5pbXBvcnQgeyBDdXN0b21TY3JpcHQsIFBvc3RDdXN0b21TY3JpcHQgfSBmcm9tIFwiQC9jb3JlL0N1c3RvbVNjcmlwdFwiO1xuaW1wb3J0IHsgSW5zdGFsbEVudGl0eSB9IGZyb20gXCJAL2NvcmUvSW5zdGFsbEVudGl0eVwiO1xuaW1wb3J0IHsgU2NyaXB0Q29sbGVjdGlvbiB9IGZyb20gXCJAL2NvcmUvU2NyaXB0Q29sbGVjdGlvblwiO1xuaW1wb3J0IHsgVGFyZ2V0TmFtZSB9IGZyb20gXCJAL2NvcmUvVGFyZ2V0TmFtZVwiO1xuXG5jb25zdCBsb2dnZXIgPSBMb2dnZXIuY3JlYXRlKGltcG9ydC5tZXRhLnVybCk7XG5cbmV4cG9ydCBhYnN0cmFjdCBjbGFzcyBHZW5lcmFsQ29udGV4dCBpbXBsZW1lbnRzIElHZW5lcmFsQ29udGV4dCB7XG4gIHByb3RlY3RlZCBfc2NvcGU6IFZhcmlhYmxlTWFwO1xuXG4gIGNvbnN0cnVjdG9yKHNjb3BlOiBWYXJpYWJsZU1hcCkge1xuICAgIHRoaXMuX3Njb3BlID0gc2NvcGU7XG4gIH1cblxuICBwdWJsaWMgZmluZFByb2dyYW0obmFtZTogc3RyaW5nKTogc3RyaW5nIHwgdW5kZWZpbmVkIHtcbiAgICByZXR1cm4gZmluZFByb2dyYW1TeW5jKG5hbWUpO1xuICB9XG5cbiAgcHVibGljIGdldFByb3BlcnR5KHRoaXM6IGFueSwgbmFtZTogc3RyaW5nKTogYW55IHtcbiAgICByZXR1cm4gU2NvcGVIZWxwZXIuZ2V0KHRoaXMuX3Njb3BlLCBuYW1lKTtcbiAgfVxuXG4gIHB1YmxpYyBzZXRQcm9wZXJ0eSh0aGlzOiBhbnksIG5hbWU6IHN0cmluZywgdmFsdWU6IGFueSk6IGFueSB7XG4gICAgY29uc3QgZW50cnkgPSB0aGlzLl9zY29wZVtuYW1lXTtcbiAgICBpZiAoZW50cnkpXG4gICAgICBTY29wZUhlbHBlci5zZXRFbnRyeVZhbHVlKGVudHJ5LCB2YWx1ZSk7XG4gICAgZWxzZVxuICAgICAgU2NvcGVIZWxwZXIuZGVmaW5lVmFyaWFibGUodGhpcy5fc2NvcGUsIFwiXCIsIG5hbWUsIHt2YWx1ZX0pO1xuICAgIHJldHVybiB0cnVlO1xuICB9XG5cbiAgcHVibGljIGhhc1Byb3BlcnR5KHRoaXM6IGFueSwgbmFtZTogc3RyaW5nKTogYm9vbGVhbiB7XG4gICAgcmV0dXJuIE9iamVjdC5oYXNPd24odGhpcy5fc2NvcGUsIG5hbWUpO1xuICB9XG5cbiAgcHVibGljIGRlbGV0ZVByb3BlcnR5KHRoaXM6IGFueSwgbmFtZTogc3RyaW5nKTogYm9vbGVhbiB7XG4gICAgcmV0dXJuIGRlbGV0ZSB0aGlzLl9zY29wZVtuYW1lXTtcbiAgfVxuXG4gIHB1YmxpYyBnZXRQcm9wZXJ0eU5hbWVzKHRoaXM6IGFueSk6IHN0cmluZ1tdIHtcbiAgICByZXR1cm4gT2JqZWN0LmtleXModGhpcy5fc2NvcGUpO1xuICB9XG59O1xuXG5mdW5jdGlvbiBtYWtlQmFzZVRhcmdldE9wdGlvbnMobmFtZTogc3RyaW5nLCBzY29wZTogVmFyaWFibGVNYXApOiBCYXNlVGFyZ2V0T3B0aW9ucyB7XG4gIHJldHVybiB7XG4gICAgbmFtZSxcbiAgICBzb3VyY2VEaXI6IFNjb3BlSGVscGVyLmdldChzY29wZSwgXCJTT1VSQ0VfRElSXCIpLFxuICAgIGJpbmFyeURpcjogU2NvcGVIZWxwZXIuZ2V0KHNjb3BlLCBcIkJJTkFSWV9ESVJcIiksXG4gIH07XG59XG5cbmZ1bmN0aW9uIG1ha2VUYXJnZXRPcHRpb25zKG5hbWU6IHN0cmluZywgc2NvcGU6IFZhcmlhYmxlTWFwKTogVGFyZ2V0T3B0aW9ucyB7XG4gIHJldHVybiB7XG4gICAgbmFtZSxcbiAgICBwcmVmaXg6IFwiXCIsXG4gICAgc3VmZml4OiBcIlwiLFxuICAgIGxpbmtPcHRpb25zOiBbXSxcbiAgICBwb3NpdGlvbkluZGVwZW5kZW50Q29kZTogU2NvcGVIZWxwZXIuZ2V0KHNjb3BlLCBcIlBPU0lUSU9OX0lOREVQRU5ERU5UX0NPREVcIiksXG4gICAgaW5jbHVkZXM6IFNjb3BlSGVscGVyLmdldChzY29wZSwgXCJJTkNMVURFU1wiKSxcbiAgICBzb3VyY2VEaXI6IFNjb3BlSGVscGVyLmdldChzY29wZSwgXCJTT1VSQ0VfRElSXCIpLFxuICAgIGJpbmFyeURpcjogU2NvcGVIZWxwZXIuZ2V0KHNjb3BlLCBcIkJJTkFSWV9ESVJcIiksXG4gIH07XG59XG5cbmZ1bmN0aW9uIG1ha2VPYmplY3RMaWJyYXJ5T3B0aW9ucyhuYW1lOiBzdHJpbmcsIHNjb3BlOiBWYXJpYWJsZU1hcCk6IFRhcmdldE9wdGlvbnMge1xuICBjb25zdCBvcHRpb25zID0gbWFrZVRhcmdldE9wdGlvbnMobmFtZSwgc2NvcGUpO1xuICBvcHRpb25zLnByZWZpeCA9IFNjb3BlSGVscGVyLmdldChzY29wZSwgXCJPQkpFQ1RfTElCUkFSWV9QUkVGSVhcIik7XG4gIG9wdGlvbnMuc3VmZml4ID0gU2NvcGVIZWxwZXIuZ2V0KHNjb3BlLCBcIk9CSkVDVF9MSUJSQVJZX1NVRkZJWFwiKTtcbiAgb3B0aW9ucy5saW5rT3B0aW9ucyA9IFNjb3BlSGVscGVyLmdldChzY29wZSwgXCJPQkpFQ1RfTElOS0VSX0ZMQUdTXCIpO1xuICByZXR1cm4gb3B0aW9ucztcbn1cblxuZnVuY3Rpb24gbWFrZVN0YXRpY0xpYnJhcnlPcHRpb25zKG5hbWU6IHN0cmluZywgc2NvcGU6IFZhcmlhYmxlTWFwKTogVGFyZ2V0T3B0aW9ucyB7XG4gIGNvbnN0IG9wdGlvbnMgPSBtYWtlVGFyZ2V0T3B0aW9ucyhuYW1lLCBzY29wZSk7XG4gIG9wdGlvbnMucHJlZml4ID0gU2NvcGVIZWxwZXIuZ2V0KHNjb3BlLCBcIlNUQVRJQ19MSUJSQVJZX1BSRUZJWFwiKTtcbiAgb3B0aW9ucy5zdWZmaXggPSBTY29wZUhlbHBlci5nZXQoc2NvcGUsIFwiU1RBVElDX0xJQlJBUllfU1VGRklYXCIpO1xuICBvcHRpb25zLmxpbmtPcHRpb25zID0gU2NvcGVIZWxwZXIuZ2V0KHNjb3BlLCBcIlNUQVRJQ19MSU5LRVJfRkxBR1NcIik7XG4gIHJldHVybiBvcHRpb25zO1xufVxuXG5mdW5jdGlvbiBtYWtlU2hhcmVkTGlicmFyeU9wdGlvbnMobmFtZTogc3RyaW5nLCBzY29wZTogVmFyaWFibGVNYXApOiBUYXJnZXRPcHRpb25zIHtcbiAgY29uc3Qgb3B0aW9ucyA9IG1ha2VUYXJnZXRPcHRpb25zKG5hbWUsIHNjb3BlKTtcbiAgb3B0aW9ucy5wcmVmaXggPSBTY29wZUhlbHBlci5nZXQoc2NvcGUsIFwiU0hBUkVEX0xJQlJBUllfUFJFRklYXCIpO1xuICBvcHRpb25zLnN1ZmZpeCA9IFNjb3BlSGVscGVyLmdldChzY29wZSwgXCJTSEFSRURfTElCUkFSWV9TVUZGSVhcIik7XG4gIG9wdGlvbnMubGlua09wdGlvbnMgPSBTY29wZUhlbHBlci5nZXQoc2NvcGUsIFwiU0hBUkVEX0xJTktFUl9GTEFHU1wiKTtcbiAgcmV0dXJuIG9wdGlvbnM7XG59XG5cbmZ1bmN0aW9uIG1ha2VFeGVjdXRhYmxlT3B0aW9ucyhuYW1lOiBzdHJpbmcsIHNjb3BlOiBWYXJpYWJsZU1hcCk6IFRhcmdldE9wdGlvbnMge1xuICBjb25zdCBvcHRpb25zID0gbWFrZVRhcmdldE9wdGlvbnMobmFtZSwgc2NvcGUpO1xuICBvcHRpb25zLnN1ZmZpeCA9IFNjb3BlSGVscGVyLmdldChzY29wZSwgXCJFWEVDVVRBQkxFX1NVRkZJWFwiKTtcbiAgb3B0aW9ucy5saW5rT3B0aW9ucyA9IFNjb3BlSGVscGVyLmdldChzY29wZSwgXCJFWEVfTElOS0VSX0ZMQUdTXCIpO1xuICByZXR1cm4gb3B0aW9ucztcbn1cblxuZXhwb3J0IGFic3RyYWN0IGNsYXNzIE1ha2VDb250ZXh0IGV4dGVuZHMgR2VuZXJhbENvbnRleHQge1xuICBwcml2YXRlIF90YXJnZXRzID0gbmV3IE1hcDxzdHJpbmcsIE1haW5UYXJnZXQ+KCk7XG4gIHByaXZhdGUgX3Bvc3RUYXJnZXRzID0gbmV3IE1hcDxzdHJpbmcsIFBvc3RUYXJnZXQ+KCk7XG4gIHByaXZhdGUgX3NjcmlwdENvbGxlY3Rpb24gPSBTY3JpcHRDb2xsZWN0aW9uLmNyZWF0ZSgpO1xuICBwcml2YXRlIF9wb3N0U2NyaXB0cyA9IG5ldyBNYXA8c3RyaW5nLCBQb3N0Q3VzdG9tU2NyaXB0PigpO1xuICBwcml2YXRlIF9pbnN0YWxsTGlzdCA9IG5ldyBBcnJheTxJbnN0YWxsRW50aXR5PigpO1xuXG4gIHByb3RlY3RlZCBjb25zdHJ1Y3RvcihzY29wZTogVmFyaWFibGVNYXApIHtcbiAgICBzdXBlcihzY29wZSk7XG4gIH1cblxuICBhYnN0cmFjdCBleGVjdXRlU2NyaXB0KHNjcmlwdDogYW55LCBwYXJhbXM6IGFueSk6IGFueTtcbiAgYWJzdHJhY3QgYWRkQ2FjaGVWYXJpYWJsZXMocGFyYW1zOiBzdHJpbmcgfCBWYXJpYW50TWFwKTogdm9pZDtcbiAgYWJzdHJhY3QgYWRkU3ViZGlyZWN0b3J5KHNvdXJjZURpcjogc3RyaW5nIHwgQWJzb2x1dGVQYXRoLCBiaW5hcnlEaXI/OiBzdHJpbmcgfCBBYnNvbHV0ZVBhdGgpOiB2b2lkO1xuXG4gIHB1YmxpYyBnZXQgdGFyZ2V0cygpIHtcbiAgICByZXR1cm4gdGhpcy5fdGFyZ2V0cztcbiAgfVxuXG4gIHB1YmxpYyBnZXQgcG9zdFRhcmdldHMoKSB7XG4gICAgcmV0dXJuIHRoaXMuX3Bvc3RUYXJnZXRzO1xuICB9XG5cbiAgcHVibGljIGdldCBzY3JpcHRDb2xsZWN0aW9uKCkge1xuICAgIHJldHVybiB0aGlzLl9zY3JpcHRDb2xsZWN0aW9uO1xuICB9XG5cbiAgcHVibGljIGdldCBwb3N0U2NyaXB0cygpIHtcbiAgICByZXR1cm4gdGhpcy5fcG9zdFNjcmlwdHM7XG4gIH1cblxuICBwdWJsaWMgZ2V0IGluc3RhbGxMaXN0KCkge1xuICAgIHJldHVybiB0aGlzLl9pbnN0YWxsTGlzdDtcbiAgfVxuICBcbiAgcHVibGljIGdldENhY2hlVmFyaWFibGVzKCk6IGFueSB7XG4gICAgcmV0dXJuIFNjb3BlSGVscGVyLmdldFZhcmlhYmxlc0J5R3JvdXAodGhpcy5fc2NvcGUsIENVU1RPTV9WQVJJQUJMRV9HUk9VUCk7XG4gIH1cblxuICBwdWJsaWMgYWRkSW5jbHVkZURpcmVjdG9yaWVzKC4uLmRpcnM6IGFueVtdKSB7XG4gICAgY29uc3Qgc291cmNlRGlyID0gU2NvcGVIZWxwZXIuZ2V0KHRoaXMuX3Njb3BlLCBcIlNPVVJDRV9ESVJcIik7XG4gICAgZm9yIChjb25zdCBpdGVyIG9mIGRpcnMuZmxhdCgpKVxuICAgICAgU2NvcGVIZWxwZXIuZ2V0KHRoaXMuX3Njb3BlLCBcIklOQ0xVREVTXCIpLnB1c2goc291cmNlRGlyLnJlc29sdmUoaXRlcikpO1xuICB9XG5cbiAgcHVibGljIHRhcmdldChuYW1lOiBzdHJpbmcpOiBQb3N0VGFyZ2V0IHtcbiAgICBsZXQgdGFyZ2V0ID0gdGhpcy5fcG9zdFRhcmdldHMuZ2V0KG5hbWUpO1xuICAgIGlmICghdGFyZ2V0KSB7XG4gICAgICBjb25zdCBvcHRpb25zID0gbWFrZUJhc2VUYXJnZXRPcHRpb25zKG5hbWUsIHRoaXMuX3Njb3BlKTtcbiAgICAgIHRhcmdldCA9IFBvc3RUYXJnZXQuY3JlYXRlKHRoaXMuX3Njb3BlLCBvcHRpb25zKVxuICAgICAgdGhpcy5fcG9zdFRhcmdldHMuc2V0KG5hbWUsIHRhcmdldCk7XG4gICAgfVxuICAgIHJldHVybiB0YXJnZXQ7XG4gIH1cblxuICBwdWJsaWMgYWRkT2JqZWN0TGlicmFyeShuYW1lOiBhbnksIC4uLnNvdXJjZXM6IGFueVtdKTogT2JqZWN0TGlicmFyeSB7XG4gICAgaWYgKHRoaXMuX3RhcmdldHMuaGFzKG5hbWUpKVxuICAgICAgdGhyb3cgbmV3IEVycm9yKGBUYXJnZXQgXCIke25hbWV9XCIgZXhpc3RzYCk7XG5cbiAgICBjb25zdCBvcHRpb25zID0gbWFrZU9iamVjdExpYnJhcnlPcHRpb25zKG5hbWUsIHRoaXMuX3Njb3BlKTtcbiAgICBjb25zdCB0YXJnZXQgPSBPYmplY3RMaWJyYXJ5LmNyZWF0ZSh0aGlzLl9zY29wZSwgb3B0aW9ucyk7XG4gICAgdGhpcy5fdGFyZ2V0cy5zZXQobmFtZSwgdGFyZ2V0KTtcbiAgICB0YXJnZXQuYWRkU291cmNlcyguLi5zb3VyY2VzKTtcbiAgICByZXR1cm4gdGFyZ2V0O1xuICB9XG5cbiAgcHVibGljIGFkZFN0YXRpY0xpYnJhcnkobmFtZTogYW55LCAuLi5zb3VyY2VzOiBhbnlbXSk6IFN0YXRpY0xpYnJhcnkge1xuICAgIGlmICh0aGlzLl90YXJnZXRzLmhhcyhuYW1lKSlcbiAgICAgIHRocm93IG5ldyBFcnJvcihgVGFyZ2V0IFwiJHtuYW1lfVwiIGV4aXN0c2ApO1xuXG4gICAgY29uc3Qgb3B0aW9ucyA9IG1ha2VTdGF0aWNMaWJyYXJ5T3B0aW9ucyhuYW1lLCB0aGlzLl9zY29wZSk7XG4gICAgY29uc3QgdGFyZ2V0ID0gU3RhdGljTGlicmFyeS5jcmVhdGUodGhpcy5fc2NvcGUsIG9wdGlvbnMpO1xuICAgIHRoaXMuX3RhcmdldHMuc2V0KG5hbWUsIHRhcmdldCk7XG4gICAgdGFyZ2V0LmFkZFNvdXJjZXMoLi4uc291cmNlcyk7XG4gICAgcmV0dXJuIHRhcmdldDtcbiAgfVxuXG4gIHB1YmxpYyBhZGRTaGFyZWRMaWJyYXJ5KG5hbWU6IGFueSwgLi4uc291cmNlczogYW55W10pOiBTaGFyZWRMaWJyYXJ5IHtcbiAgICBpZiAodGhpcy5fdGFyZ2V0cy5oYXMobmFtZSkpXG4gICAgICB0aHJvdyBuZXcgRXJyb3IoYFRhcmdldCBcIiR7bmFtZX1cIiBleGlzdHNgKTtcblxuICAgIGNvbnN0IG9wdGlvbnMgPSBtYWtlU2hhcmVkTGlicmFyeU9wdGlvbnMobmFtZSwgdGhpcy5fc2NvcGUpO1xuICAgIGNvbnN0IHRhcmdldCA9IFNoYXJlZExpYnJhcnkuY3JlYXRlKHRoaXMuX3Njb3BlLCBvcHRpb25zKTtcbiAgICB0aGlzLl90YXJnZXRzLnNldChuYW1lLCB0YXJnZXQpO1xuICAgIHRhcmdldC5hZGRTb3VyY2VzKC4uLnNvdXJjZXMpO1xuICAgIHJldHVybiB0YXJnZXQ7XG4gIH1cblxuICBwdWJsaWMgYWRkRXhlY3V0YWJsZShuYW1lOiBzdHJpbmcsIC4uLnNvdXJjZXM6IGFueVtdKTogRXhlY3V0YWJsZSB7XG4gICAgaWYgKHRoaXMuX3RhcmdldHMuaGFzKG5hbWUpKVxuICAgICAgdGhyb3cgbmV3IEVycm9yKGBUYXJnZXQgXCIke25hbWV9XCIgZXhpc3RzYCk7XG5cbiAgICBjb25zdCBvcHRpb25zID0gbWFrZUV4ZWN1dGFibGVPcHRpb25zKG5hbWUsIHRoaXMuX3Njb3BlKTtcbiAgICBjb25zdCB0YXJnZXQgPSBFeGVjdXRhYmxlLmNyZWF0ZSh0aGlzLl9zY29wZSwgb3B0aW9ucyk7XG4gICAgdGhpcy5fdGFyZ2V0cy5zZXQobmFtZSwgdGFyZ2V0KTtcbiAgICB0YXJnZXQuYWRkU291cmNlcyguLi5zb3VyY2VzKTtcbiAgICByZXR1cm4gdGFyZ2V0O1xuICB9XG5cbiAgcHVibGljIHNjcmlwdChuYW1lOiBzdHJpbmcpOiBQb3N0Q3VzdG9tU2NyaXB0IHtcbiAgICBsZXQgc2NyaXB0ID0gdGhpcy5fcG9zdFNjcmlwdHMuZ2V0KG5hbWUpO1xuICAgIGlmICghc2NyaXB0KSB7XG4gICAgICBzY3JpcHQgPSBQb3N0Q3VzdG9tU2NyaXB0LmNyZWF0ZShuYW1lKVxuICAgICAgdGhpcy5fcG9zdFNjcmlwdHMuc2V0KG5hbWUsIHNjcmlwdCk7XG4gICAgfVxuICAgIHJldHVybiBzY3JpcHQ7XG4gIH1cblxuICBwdWJsaWMgYWRkQ3VzdG9tU2NyaXB0KHNjcmlwdE1vZHVsZTogc3RyaW5nLCBwYXJhbXM6IGFueSk6IEN1c3RvbVNjcmlwdCB7XG4gICAgY29uc3QgdmFyaWFibGVNYXAgPSBTY29wZUhlbHBlci5jbG9uZVZhcmlhYmxlTWFwKHRoaXMuX3Njb3BlKTtcbiAgICBTY29wZUhlbHBlci5leHRlbmRWYXJpYWJsZU1hcEJ5VmFsdWVzKHZhcmlhYmxlTWFwLCBDVVNUT01fVkFSSUFCTEVfR1JPVVAsIHBhcmFtcyk7XG4gICAgU2NvcGVIZWxwZXIuc2V0KHZhcmlhYmxlTWFwLCBcIlNDUklQVF9NT0RVTEVcIiwgc2NyaXB0TW9kdWxlKTtcbiAgICBcbiAgICBjb25zdCBzb3VyY2VEaXIgPSBTY29wZUhlbHBlci5nZXQodmFyaWFibGVNYXAsIFwiU09VUkNFX0RJUlwiKSBhcyBBYnNvbHV0ZVBhdGg7XG4gICAgY29uc3QgYmluYXJ5RGlyID0gU2NvcGVIZWxwZXIuZ2V0KHZhcmlhYmxlTWFwLCBcIkJJTkFSWV9ESVJcIikgYXMgQWJzb2x1dGVQYXRoO1xuXG4gICAgbGV0IGlucHV0RmlsZSA9IFNjb3BlSGVscGVyLmdldCh2YXJpYWJsZU1hcCwgXCJTQ1JJUFRfSU5QVVRcIik7XG4gICAgaWYgKGlucHV0RmlsZSlcbiAgICAgIGlucHV0RmlsZSA9IHNvdXJjZURpci5yZXNvbHZlKGlucHV0RmlsZSk7XG5cbiAgICBsZXQgb3V0cHV0RmlsZSA9IFNjb3BlSGVscGVyLmdldCh2YXJpYWJsZU1hcCwgXCJTQ1JJUFRfT1VUUFVUXCIpO1xuICAgIGlmICghb3V0cHV0RmlsZSlcbiAgICAgIHRocm93IG5ldyBFcnJvcihcIkN1c3RvbVNjcmlwdCBwYXJhbWV0ZXJzIHJlcXVpcmVkIG91dHB1dCBlbnRpdHlcIik7XG5cbiAgICBvdXRwdXRGaWxlID0gc291cmNlRGlyLnJlc29sdmUob3V0cHV0RmlsZSk7XG5cbiAgICBjb25zdCBvcHRpb25zOiBDdXN0b21TY3JpcHQuT3B0aW9ucyA9IHtcbiAgICAgIHZhcmlhYmxlTWFwLFxuICAgICAgbmFtZTogU2NvcGVIZWxwZXIuZ2V0KHZhcmlhYmxlTWFwLCBcIlNDUklQVF9OQU1FXCIpLFxuICAgICAgc2NyaXB0TW9kdWxlLFxuICAgICAgb3V0cHV0OiBvdXRwdXRGaWxlLFxuICAgICAgaW5wdXQ6IGlucHV0RmlsZSxcbiAgICAgIHNvdXJjZURpcixcbiAgICAgIGJpbmFyeURpcixcbiAgICB9O1xuXG4gICAgY29uc3QgdGFyZ2V0ID0gQ3VzdG9tU2NyaXB0LmNyZWF0ZShvcHRpb25zKTtcbiAgICB0aGlzLl9zY3JpcHRDb2xsZWN0aW9uLmFkZCh0YXJnZXQsIG9wdGlvbnMubmFtZSk7XG5cbiAgICByZXR1cm4gdGFyZ2V0O1xuICB9XG5cbiAgcHVibGljIGluc3RhbGwodmFsdWU6IGFueSwgcGFyYW1zOiBhbnkpOiB2b2lkIHtcbiAgICBjb25zdCBzY29wZSA9IFNjb3BlSGVscGVyLmNyZWF0ZVZhcmlhYmxlVmFsdWVzKHRoaXMuX3Njb3BlKTtcbiAgICBmb3IgKGNvbnN0IGl0IG9mIFsgdmFsdWUgXS5mbGF0KCkpIHtcbiAgICAgIGNvbnN0IGl0ZXIgPSAoaXQgaW5zdGFuY2VvZiBJbnRlcmZhY2VUYXJnZXQpID8gVGFyZ2V0TmFtZS5jcmVhdGUoaXQudGFyZ2V0TmFtZSkgOiBpdDtcbiAgICAgIGNvbnN0IGVudGl0eSA9IEluc3RhbGxFbnRpdHkuY3JlYXRlKHNjb3BlLCBpdGVyLCBwYXJhbXMpO1xuICAgICAgdGhpcy5faW5zdGFsbExpc3QucHVzaChlbnRpdHkpO1xuICAgIH1cbiAgfVxufTtcblxuZXhwb3J0IGZ1bmN0aW9uIGNyZWF0ZUNvbnRleHQ8VCBleHRlbmRzIElHZW5lcmFsQ29udGV4dD4oY3R4OiBUKTogVCAmIFN5c3RlbVNjb3BlIHtcbiAgY29uc3QgaGFuZGxlcjogUHJveHlIYW5kbGVyPFQ+ID0ge1xuICAgIGdldCh0YXJnZXQ6IFQsIG5hbWU6IHN0cmluZywgcmVjZWl2ZXI6IGFueSkge1xuICAgICAgaWYgKG5hbWUgaW4gdGFyZ2V0KVxuICAgICAgICByZXR1cm4gKHRhcmdldCBhcyBhbnkpW25hbWVdO1xuICAgICAgcmV0dXJuIHRhcmdldC5nZXRQcm9wZXJ0eShuYW1lKTtcbiAgICB9LFxuICAgIHNldCh0YXJnZXQ6IFQsIG5hbWU6IHN0cmluZywgdmFsdWU6IGFueSk6IGJvb2xlYW4ge1xuICAgICAgdGFyZ2V0LnNldFByb3BlcnR5KG5hbWUsIHZhbHVlKTtcbiAgICAgIHJldHVybiB0cnVlO1xuICAgIH0sXG4gICAgaGFzKHRhcmdldDogVCwgbmFtZTogc3RyaW5nKSB7XG4gICAgICByZXR1cm4gbmFtZSBpbiB0YXJnZXQgfHwgdGFyZ2V0Lmhhc1Byb3BlcnR5KG5hbWUpO1xuICAgIH0sXG4gICAgb3duS2V5cyh0YXJnZXQ6IFQpIHtcbiAgICAgIHJldHVybiB0YXJnZXQuZ2V0UHJvcGVydHlOYW1lcygpO1xuICAgIH0sXG4gICAgZGVsZXRlUHJvcGVydHkodGFyZ2V0OiBULCBuYW1lOiBzdHJpbmcpIHtcbiAgICAgIHJldHVybiB0YXJnZXQuZGVsZXRlUHJvcGVydHkobmFtZSk7XG4gICAgfSxcbiAgICBnZXRPd25Qcm9wZXJ0eURlc2NyaXB0b3IodGFyZ2V0OiBULCBuYW1lOiBzdHJpbmcpOiBQcm9wZXJ0eURlc2NyaXB0b3IgfCB1bmRlZmluZWQge1xuICAgICAgaWYgKHRhcmdldC5oYXNQcm9wZXJ0eShuYW1lKSkge1xuICAgICAgICBjb25zdCB2YWx1ZSA9IHRhcmdldC5nZXRQcm9wZXJ0eShuYW1lKTtcbiAgICAgICAgcmV0dXJuIHsgdmFsdWUsIHdyaXRhYmxlOiB0cnVlLCBlbnVtZXJhYmxlOiB0cnVlLCBjb25maWd1cmFibGU6IHRydWUgfTtcbiAgICAgIH1cbiAgICAgIHJldHVybiB1bmRlZmluZWQ7XG4gICAgfSxcbiAgfTtcbiAgcmV0dXJuIG5ldyBQcm94eShjdHgsIGhhbmRsZXIpIGFzIFQgJiBTeXN0ZW1TY29wZTtcbn1cblxuZXhwb3J0IGFzeW5jIGZ1bmN0aW9uIHBlcmZvcm1Db250ZXh0KG1rOiBJR2VuZXJhbENvbnRleHQgJiBTeXN0ZW1TY29wZSkge1xuICBjb25zdCBzY3JpcHRVcmwgPSBtay5TQ1JJUFRfRklMRS50b0pTT04oKTtcbiAgY29uc3QgbW9kdWxlID0gYXdhaXQgaW1wb3J0TW9kdWxlKHNjcmlwdFVybCk7XG4gIGlmICghbW9kdWxlLmRlZmF1bHQpXG4gICAgdGhyb3cgbmV3IEVycm9yKGBTY3JpcHQgJHtzY3JpcHRVcmx9IGhhcyBub3QgY29udGFpbiBhIGRlZmF1bHQgZnVuY3Rpb25gKTtcblxuICBjb25zdCByZXN1bHQgPSBtb2R1bGUuZGVmYXVsdChtayk7XG4gIGlmIChyZXN1bHQgaW5zdGFuY2VvZiBQcm9taXNlKVxuICAgIGF3YWl0IHJlc3VsdDtcbn1cblxuZXhwb3J0IGZ1bmN0aW9uIGNyZWF0ZVZhcmlhYmxlTWFwRm9yRGlyZWN0b3J5KHZhcmlhYmxlTWFwOiBWYXJpYWJsZU1hcCwgc291cmNlRGlyOiBhbnksIGJpbmFyeURpcj86IGFueSk6IFZhcmlhYmxlTWFwIHtcbiAgaWYgKGJpbmFyeURpciA9PT0gdW5kZWZpbmVkKSB7XG4gICAgaWYgKCFBYnNvbHV0ZVBhdGguaXNBYnNvbHV0ZShzb3VyY2VEaXIpKVxuICAgICAgYmluYXJ5RGlyID0gc291cmNlRGlyO1xuICAgIGVsc2Uge1xuICAgICAgY29uc3QgYmluYXJ5RGlyMSA9IFNjb3BlSGVscGVyLmdldCh2YXJpYWJsZU1hcCwgXCJQUk9KRUNUX0JJTkFSWV9ESVJcIikucmVsYXRpdmUoc291cmNlRGlyKTtcbiAgICAgIGNvbnN0IGJpbmFyeURpcjIgPSBTY29wZUhlbHBlci5nZXQodmFyaWFibGVNYXAsIFwiUFJPSkVDVF9TT1VSQ0VfRElSXCIpLnJlbGF0aXZlKHNvdXJjZURpcik7XG4gICAgICBiaW5hcnlEaXIgPSAoYmluYXJ5RGlyMS5sZW5ndGggPiBiaW5hcnlEaXIyLmxlbmd0aCkgPyBiaW5hcnlEaXIyIDogYmluYXJ5RGlyMTtcbiAgICB9XG4gIH1cblxuICBjb25zdCBTT1VSQ0VfRElSID0gU2NvcGVIZWxwZXIuZ2V0KHZhcmlhYmxlTWFwLCBcIlNPVVJDRV9ESVJcIikucmVzb2x2ZShzb3VyY2VEaXIpO1xuICBjb25zdCBCSU5BUllfRElSID0gU2NvcGVIZWxwZXIuZ2V0KHZhcmlhYmxlTWFwLCBcIkJJTkFSWV9ESVJcIikucmVzb2x2ZShiaW5hcnlEaXIpO1xuXG4gIGNvbnN0IG5ld1ZhcmlhYmxlTWFwID0gU2NvcGVIZWxwZXIuY2xvbmVWYXJpYWJsZU1hcCh2YXJpYWJsZU1hcCk7XG5cbiAgU2NvcGVIZWxwZXIuc2V0KG5ld1ZhcmlhYmxlTWFwLCBcIlNPVVJDRV9ESVJcIiwgU09VUkNFX0RJUik7XG4gIFNjb3BlSGVscGVyLnNldChuZXdWYXJpYWJsZU1hcCwgXCJCSU5BUllfRElSXCIsIEJJTkFSWV9ESVIpO1xuICBTY29wZUhlbHBlci5yZXNldChuZXdWYXJpYWJsZU1hcCwgXCJTQ1JJUFRfRElSXCIpO1xuICBTY29wZUhlbHBlci5yZXNldChuZXdWYXJpYWJsZU1hcCwgXCJTQ1JJUFRfRklMRVwiKTtcblxuICByZXR1cm4gbmV3VmFyaWFibGVNYXA7XG59XG4iLCIvKlxuICogTUlUIExpY2Vuc2VcbiAqXG4gKiBDb3B5cmlnaHQgKGMpIDIwMjUgIFl1cmlpIFlha3ViaW4gKHl1cmlpLnlha3ViaW5AZ21haWwuY29tKVxuICpcbiAqIFBlcm1pc3Npb24gaXMgZ3JhbnRlZCB0byB1c2UsIGNvcHksIG1vZGlmeSwgYW5kIGRpc3RyaWJ1dGUgdGhpcyBzb2Z0d2FyZVxuICogdW5kZXIgdGhlIE1JVCBMaWNlbnNlLiBTZWUgTElDRU5TRSBmaWxlIGZvciBkZXRhaWxzLlxuICovXG5cbmltcG9ydCBmcyBmcm9tIFwibm9kZTpmc1wiO1xuXG5pbXBvcnQgeyBnZW5lcmF0ZWRTY3JpcHROYW1lQ29tbWVudCB9IGZyb20gXCJAL2N4eFwiO1xuXG5leHBvcnQgZGVmYXVsdCBhc3luYyBmdW5jdGlvbihtazogYW55KSB7XG4gIGNvbnN0IGxpbmVzID0gW107XG5cbiAgbGluZXMucHVzaChnZW5lcmF0ZWRTY3JpcHROYW1lQ29tbWVudChpbXBvcnQubWV0YS5maWxlbmFtZSkpO1xuICBsaW5lcy5wdXNoKFwiXCIpO1xuXG4gIGZvciAoY29uc3QgW25hbWUsIGVudHJ5XSBvZiBPYmplY3QuZW50cmllcyhtay5TQ1JJUFRfSU5QVVQpIGFzIGFueSkge1xuICAgIGlmIChlbnRyeS5kZXNjcmlwdGlvbikge1xuICAgICAgbGluZXMucHVzaChgLyogJHtlbnRyeS5kZXNjcmlwdGlvbn0gKi9gKTtcbiAgICB9XG4gICAgaWYgKHR5cGVvZiBlbnRyeS52YWx1ZSA9PT0gXCJib29sZWFuXCIpIHtcbiAgICAgIGxpbmVzLnB1c2goYCNkZWZpbmUgJHtuYW1lfSAke2VudHJ5LnZhbHVlID8gMSA6IDB9YCk7XG4gICAgfVxuICAgIGVsc2UgaWYgKHR5cGVvZiBlbnRyeS52YWx1ZSA9PT0gXCJudW1iZXJcIikge1xuICAgICAgbGluZXMucHVzaChgI2RlZmluZSAke25hbWV9ICR7ZW50cnkudmFsdWV9YCk7XG4gICAgfVxuICAgIGVsc2UgaWYgKHR5cGVvZiBlbnRyeS52YWx1ZSA9PT0gXCJzdHJpbmdcIikge1xuICAgICAgbGluZXMucHVzaChgI2RlZmluZSAke25hbWV9IFwiJHtlbnRyeS52YWx1ZX1cImApO1xuICAgIH1cbiAgICBlbHNlIGlmIChBcnJheS5pc0FycmF5KGVudHJ5LnZhbHVlKSkge1xuICAgICAgbGluZXMucHVzaChgI2RlZmluZSAke25hbWV9IFwiJHtlbnRyeS52YWx1ZS5qb2luKFwiO1wiKX1cImApO1xuICAgIH1cbiAgICBlbHNlIHtcbiAgICAgIHRocm93IG5ldyBFcnJvcihgXCIke25hbWV9XCIgaGFzICR7ZW50cnkudmFsdWV9IHZhbHVlYCk7XG4gICAgfVxuICAgIGxpbmVzLnB1c2goXCJcIik7XG4gIH1cblxuICBhd2FpdCBmcy5wcm9taXNlcy5ta2Rpcihtay5TQ1JJUFRfT1VUUFVULmRpcm5hbWUoKS50b1N0cmluZygpLCB7IHJlY3Vyc2l2ZTogdHJ1ZSB9KTtcbiAgYXdhaXQgZnMucHJvbWlzZXMud3JpdGVGaWxlKG1rLlNDUklQVF9PVVRQVVQudG9TdHJpbmcoKSwgbGluZXMuam9pbihcIlxcblwiKSwgXCJ1dGYtOFwiKTtcbn1cbiIsIi8qXG4gKiBNSVQgTGljZW5zZVxuICpcbiAqIENvcHlyaWdodCAoYykgMjAyNSAgWXVyaWkgWWFrdWJpbiAoeXVyaWkueWFrdWJpbkBnbWFpbC5jb20pXG4gKlxuICogUGVybWlzc2lvbiBpcyBncmFudGVkIHRvIHVzZSwgY29weSwgbW9kaWZ5LCBhbmQgZGlzdHJpYnV0ZSB0aGlzIHNvZnR3YXJlXG4gKiB1bmRlciB0aGUgTUlUIExpY2Vuc2UuIFNlZSBMSUNFTlNFIGZpbGUgZm9yIGRldGFpbHMuXG4gKi9cblxuaW1wb3J0IGZzIGZyb20gXCJub2RlOmZzXCI7XG5cbmV4cG9ydCBkZWZhdWx0IGFzeW5jIGZ1bmN0aW9uKG1rOiBhbnkpIHtcbiAgbGV0IGNvbnRlbnQgPSBhd2FpdCBmcy5wcm9taXNlcy5yZWFkRmlsZShtay5TQ1JJUFRfSU5QVVQudG9TdHJpbmcoKSwgXCJ1dGYtOFwiKTtcbiAgY29udGVudCA9IGNvbnRlbnQucmVwbGFjZSgvQChbX0EtWmEtel1bX0EtWmEtejAtOV0rKUAvZywgKG1hdGNoLCB2MSkgPT4ge1xuICAgIGNvbnN0IHJlcyA9IG1rW3YxXSB8fCBcIlwiO1xuICAgIGlmIChBcnJheS5pc0FycmF5KHJlcykpXG4gICAgICByZXR1cm4gcmVzLmpvaW4oXCJcXG5cIik7XG4gICAgcmV0dXJuIHJlcy50b1N0cmluZygpO1xuICB9KTtcbiAgY29udGVudCA9IGNvbnRlbnQucmVwbGFjZSgvI2NtYWtlZGVmaW5lICsoW19BLVphLXpdW19BLVphLXowLTldKykgKiguKikvZywgKG1hdGNoLCB2MSwgdjIpID0+IHtcbiAgICByZXR1cm4gbWtbdjFdID8gYCNkZWZpbmUgJHt2MX0gJHt2Mn1gIDogYC8qICN1bmRlZiAke3YxfSAqL2A7XG4gIH0pO1xuICBhd2FpdCBmcy5wcm9taXNlcy5ta2Rpcihtay5TQ1JJUFRfT1VUUFVULmRpcm5hbWUoKS50b1N0cmluZygpLCB7IHJlY3Vyc2l2ZTogdHJ1ZSB9KTtcbiAgYXdhaXQgZnMucHJvbWlzZXMud3JpdGVGaWxlKG1rLlNDUklQVF9PVVRQVVQudG9TdHJpbmcoKSwgY29udGVudCwgXCJ1dGYtOFwiKTtcbn1cbiIsIi8qXG4gKiBNSVQgTGljZW5zZVxuICpcbiAqIENvcHlyaWdodCAoYykgMjAyNSAgWXVyaWkgWWFrdWJpbiAoeXVyaWkueWFrdWJpbkBnbWFpbC5jb20pXG4gKlxuICogUGVybWlzc2lvbiBpcyBncmFudGVkIHRvIHVzZSwgY29weSwgbW9kaWZ5LCBhbmQgZGlzdHJpYnV0ZSB0aGlzIHNvZnR3YXJlXG4gKiB1bmRlciB0aGUgTUlUIExpY2Vuc2UuIFNlZSBMSUNFTlNFIGZpbGUgZm9yIGRldGFpbHMuXG4gKi9cblxuaW1wb3J0IGNvbmZpZ3VyZV9maWxlIGZyb20gXCJAL2NvcmUvQnVpbGRpblNjcmlwdHMvY29uZmlndXJlX2ZpbGVcIjtcbmltcG9ydCBjX2hlYWRlciBmcm9tIFwiQC9jb3JlL0J1aWxkaW5TY3JpcHRzL2NfaGVhZGVyXCI7XG5cbmV4cG9ydCBkZWZhdWx0IHtcbiAgY29uZmlndXJlX2ZpbGUsXG4gIGNfaGVhZGVyLFxufTtcbiIsIi8qXG4gKiBNSVQgTGljZW5zZVxuICpcbiAqIENvcHlyaWdodCAoYykgMjAyNSAgWXVyaWkgWWFrdWJpbiAoeXVyaWkueWFrdWJpbkBnbWFpbC5jb20pXG4gKlxuICogUGVybWlzc2lvbiBpcyBncmFudGVkIHRvIHVzZSwgY29weSwgbW9kaWZ5LCBhbmQgZGlzdHJpYnV0ZSB0aGlzIHNvZnR3YXJlXG4gKiB1bmRlciB0aGUgTUlUIExpY2Vuc2UuIFNlZSBMSUNFTlNFIGZpbGUgZm9yIGRldGFpbHMuXG4gKi9cblxuaW1wb3J0IHsgSW50ZXJmYWNlU2NyaXB0IH0gZnJvbSBcIkAvY29yZS9NYWtlSW50ZXJmYWNlc1wiO1xuaW1wb3J0IHsgQWJzb2x1dGVQYXRoIH0gZnJvbSBcIkAvY29yZS9BYnNvbHV0ZVBhdGhcIjtcbmltcG9ydCB7IFNjb3BlSGVscGVyLCBWYXJpYWJsZU1hcCwgVmFyaWFudE1hcCB9IGZyb20gXCJAL2NvcmUvU2NvcGVcIjtcbmltcG9ydCB7IFNpbXBsZU9iamVjdCB9IGZyb20gXCJAL2NvcmUvU2ltcGxlT2JqZWN0XCI7XG5cbmV4cG9ydCBjbGFzcyBQb3N0Q3VzdG9tU2NyaXB0IGV4dGVuZHMgSW50ZXJmYWNlU2NyaXB0IHtcbiAgcHJpdmF0ZSBfbmFtZTogc3RyaW5nO1xuICBwcml2YXRlIF92YXJpYWJsZXM6IFZhcmlhbnRNYXA7XG5cbiAgcHJpdmF0ZSBjb25zdHJ1Y3RvcihuYW1lOiBzdHJpbmcsIHZhcmlhYmxlcz86IFZhcmlhbnRNYXApIHtcbiAgICBzdXBlcigpO1xuICAgIHRoaXMuX25hbWUgPSBuYW1lO1xuICAgIHRoaXMuX3ZhcmlhYmxlcyA9IHZhcmlhYmxlcyB8fCB7fTtcbiAgfVxuXG4gIHB1YmxpYyBzdGF0aWMgY3JlYXRlKG5hbWU6IHN0cmluZywgdmFyaWFibGVzPzogVmFyaWFudE1hcCkge1xuICAgIHJldHVybiBPYmplY3Quc2VhbChuZXcgUG9zdEN1c3RvbVNjcmlwdChuYW1lLCB2YXJpYWJsZXMpKTtcbiAgfVxuXG4gIHB1YmxpYyBzdGF0aWMgZnJvbUpTT04ob2JqZWN0OiBTaW1wbGVPYmplY3QpIHtcbiAgICByZXR1cm4gUG9zdEN1c3RvbVNjcmlwdC5jcmVhdGUob2JqZWN0Lm5hbWUgYXMgc3RyaW5nLCBvYmplY3QudmFyaWFibGVzIGFzIFZhcmlhbnRNYXApO1xuICB9XG5cbiAgcHVibGljIGdldCB2YXJpYWJsZXMoKSB7XG4gICAgcmV0dXJuIHRoaXMuX3ZhcmlhYmxlcztcbiAgfVxuXG4gIHB1YmxpYyBtZXJnZVZhcmlhYmxlcyh2YXJpYWJsZXM6IFZhcmlhbnRNYXApIHtcbiAgICBTY29wZUhlbHBlci5tZXJnZVZhcmlhYmxlcyh0aGlzLl92YXJpYWJsZXMsIHZhcmlhYmxlcyk7XG4gIH1cblxuICBwdWJsaWMgdG9KU09OKCk6IFNpbXBsZU9iamVjdCB7XG4gICAgcmV0dXJuIHtcbiAgICAgIHR5cGU6IFBvc3RDdXN0b21TY3JpcHQubmFtZSxcbiAgICAgIG5hbWU6IHRoaXMuX25hbWUsXG4gICAgICB2YXJpYWJsZXM6IHRoaXMuX3ZhcmlhYmxlcyxcbiAgICB9O1xuICB9XG4gIFxuICBwdWJsaWMgdG9TdHJpbmcoKTogc3RyaW5nIHtcbiAgICByZXR1cm4gYFtvYmplY3QgJHtQb3N0Q3VzdG9tU2NyaXB0Lm5hbWV9XWA7XG4gIH1cbn07XG5cbmNvbnN0IFNDT1BFICAgICAgICA9IFN5bWJvbChcIlNDT1BFXCIpO1xuY29uc3QgTkFNRSAgICAgICAgID0gU3ltYm9sKFwiTkFNRVwiKTtcbmNvbnN0IElOUFVUICAgICAgICA9IFN5bWJvbChcIklOUFVUXCIpO1xuY29uc3QgT1VUUFVUICAgICAgID0gU3ltYm9sKFwiT1VUUFVUXCIpO1xuXG5leHBvcnQgY2xhc3MgQ3VzdG9tU2NyaXB0IGV4dGVuZHMgSW50ZXJmYWNlU2NyaXB0IHtcbiAgcHJpdmF0ZSBbU0NPUEVdOiBWYXJpYWJsZU1hcDtcbiAgcHJpdmF0ZSBbTkFNRV06IHN0cmluZztcbiAgcHJpdmF0ZSBfc2NyaXB0TW9kdWxlOiBzdHJpbmcgfCBBYnNvbHV0ZVBhdGg7XG4gIHByaXZhdGUgW0lOUFVUXTogQWJzb2x1dGVQYXRoIHwgdW5kZWZpbmVkO1xuICBwcml2YXRlIFtPVVRQVVRdOiBBYnNvbHV0ZVBhdGg7XG4gIHByaXZhdGUgX3NvdXJjZURpcjogQWJzb2x1dGVQYXRoO1xuICBwcml2YXRlIF9iaW5hcnlEaXI6IEFic29sdXRlUGF0aDtcblxuICBwcml2YXRlIGNvbnN0cnVjdG9yKG9wdGlvbnM6IEN1c3RvbVNjcmlwdC5PcHRpb25zKSB7XG4gICAgc3VwZXIoKTtcbiAgICB0aGlzW1NDT1BFXSA9IG9wdGlvbnMudmFyaWFibGVNYXA7XG4gICAgdGhpc1tOQU1FXSA9IG9wdGlvbnMubmFtZSB8fCBcIlwiO1xuICAgIHRoaXNbSU5QVVRdID0gb3B0aW9ucy5pbnB1dDtcbiAgICB0aGlzLl9zY3JpcHRNb2R1bGUgPSBvcHRpb25zLnNjcmlwdE1vZHVsZTtcbiAgICB0aGlzW09VVFBVVF0gPSBvcHRpb25zLm91dHB1dDtcbiAgICB0aGlzLl9zb3VyY2VEaXIgPSBvcHRpb25zLnNvdXJjZURpcjtcbiAgICB0aGlzLl9iaW5hcnlEaXIgPSBvcHRpb25zLmJpbmFyeURpcjtcbiAgfVxuXG4gIHB1YmxpYyBzdGF0aWMgY3JlYXRlKG9wdGlvbnM6IEN1c3RvbVNjcmlwdC5PcHRpb25zKTogQ3VzdG9tU2NyaXB0IHtcbiAgICByZXR1cm4gT2JqZWN0LnNlYWwobmV3IEN1c3RvbVNjcmlwdChvcHRpb25zKSk7XG4gIH1cblxuICBwdWJsaWMgbWVyZ2VWYXJpYWJsZXModmFyaWFibGVzOiBWYXJpYW50TWFwKSB7XG4gICAgU2NvcGVIZWxwZXIubWVyZ2VWYXJpYWJsZU1hcCh0aGlzW1NDT1BFXSwgdmFyaWFibGVzKTtcbiAgfVxuXG4gIHB1YmxpYyBnZXQgTkFNRSgpIHtcbiAgICByZXR1cm4gdGhpc1tOQU1FXTtcbiAgfVxuXG4gIHB1YmxpYyBnZXQgc2NyaXB0TW9kdWxlKCkge1xuICAgIHJldHVybiB0aGlzLl9zY3JpcHRNb2R1bGU7XG4gIH1cblxuICBwdWJsaWMgZ2V0IElOUFVUKCk6IEFic29sdXRlUGF0aCB8IHVuZGVmaW5lZCB7XG4gICAgcmV0dXJuIHRoaXNbSU5QVVRdO1xuICB9XG5cbiAgcHVibGljIGdldCBPVVRQVVQoKTogQWJzb2x1dGVQYXRoIHtcbiAgICByZXR1cm4gdGhpc1tPVVRQVVRdO1xuICB9XG5cbiAgcHVibGljIGdldCBzb3VyY2VEaXIoKTogQWJzb2x1dGVQYXRoIHtcbiAgICByZXR1cm4gdGhpcy5fc291cmNlRGlyO1xuICB9XG5cbiAgcHVibGljIGdldCBiaW5hcnlEaXIoKTogQWJzb2x1dGVQYXRoIHtcbiAgICByZXR1cm4gdGhpcy5fYmluYXJ5RGlyO1xuICB9XG5cbiAgcHVibGljIGdldCB2YXJpYWJsZU1hcCgpIHtcbiAgICByZXR1cm4gdGhpc1tTQ09QRV07XG4gIH1cblxuICBwdWJsaWMgcG9zdFVwZGF0ZShzY3JpcHQ6IFBvc3RDdXN0b21TY3JpcHQpIHtcbiAgICB0aGlzLm1lcmdlVmFyaWFibGVzKHNjcmlwdC52YXJpYWJsZXMpO1xuICB9XG5cbiAgcHVibGljIHRvSlNPTigpOiBvYmplY3Qge1xuICAgIHJldHVybiB7XG4gICAgICB2YXJpYWJsZU1hcDogdGhpc1tTQ09QRV0sXG4gICAgICBOQU1FOiB0aGlzW05BTUVdLFxuICAgICAgc2NyaXB0TW9kdWxlOiB0aGlzLl9zY3JpcHRNb2R1bGUsXG4gICAgICBJTlBVVDogdGhpcy5JTlBVVCxcbiAgICAgIE9VVFBVVDogdGhpcy5PVVRQVVQsXG4gICAgICBzb3VyY2VEaXI6IHRoaXMuX3NvdXJjZURpcixcbiAgICAgIGJpbmFyeURpcjogdGhpcy5fYmluYXJ5RGlyLFxuICAgIH1cbiAgfVxufTtcblxuZXhwb3J0IG5hbWVzcGFjZSBDdXN0b21TY3JpcHQge1xuXG5leHBvcnQgaW50ZXJmYWNlIE9wdGlvbnMge1xuICB2YXJpYWJsZU1hcDogVmFyaWFibGVNYXAsXG4gIG5hbWU/OiBzdHJpbmcsXG4gIHNjcmlwdE1vZHVsZTogc3RyaW5nIHwgQWJzb2x1dGVQYXRoLFxuICBpbnB1dD86IEFic29sdXRlUGF0aCxcbiAgb3V0cHV0OiBBYnNvbHV0ZVBhdGgsXG4gIHNvdXJjZURpcjogQWJzb2x1dGVQYXRoLFxuICBiaW5hcnlEaXI6IEFic29sdXRlUGF0aCxcbn07XG5cbn0gLy8gbmFtZXNwYWNlIEN1c3RvbVNjcmlwdFxuXG5TaW1wbGVPYmplY3QucmVnaXN0ZXJJbnN0YW5jZUNyZWF0b3IoUG9zdEN1c3RvbVNjcmlwdC5uYW1lLCBQb3N0Q3VzdG9tU2NyaXB0LmZyb21KU09OKTtcbiIsIi8qXG4gKiBNSVQgTGljZW5zZVxuICpcbiAqIENvcHlyaWdodCAoYykgMjAyNSAgWXVyaWkgWWFrdWJpbiAoeXVyaWkueWFrdWJpbkBnbWFpbC5jb20pXG4gKlxuICogUGVybWlzc2lvbiBpcyBncmFudGVkIHRvIHVzZSwgY29weSwgbW9kaWZ5LCBhbmQgZGlzdHJpYnV0ZSB0aGlzIHNvZnR3YXJlXG4gKiB1bmRlciB0aGUgTUlUIExpY2Vuc2UuIFNlZSBMSUNFTlNFIGZpbGUgZm9yIGRldGFpbHMuXG4gKi9cblxuZnVuY3Rpb24gY29udmVydFZhbHVlVG9EZWZpbml0aW9uKHZhbHVlOiBhbnkpOiBzdHJpbmcge1xuICBpZiAodmFsdWUgPT09IHVuZGVmaW5lZClcbiAgICB0aHJvdyBgRGVmaW5pdGlvbiB1bmRlZmluZWRgO1xuICBpZiAodHlwZW9mIHZhbHVlID09PSBcIm9iamVjdFwiKVxuICAgIHJldHVybiAnXCInICsgSlNPTi5zdHJpbmdpZnkodmFsdWUpICsgJ1wiJztcbiAgcmV0dXJuIHZhbHVlLnRvU3RyaW5nKCk7XG59XG5cbmV4cG9ydCBmdW5jdGlvbiBub3JtYWxpemVEZWZpbml0aW9ucyguLi5kZWZpbml0aW9uczogYW55W10pOiBzdHJpbmdbXSB7XG4gIGNvbnN0IHJlc3VsdCA9IFtdO1xuICBmb3IgKGNvbnN0IGl0ZXIgb2YgZGVmaW5pdGlvbnMpIHtcbiAgICBpZiAodHlwZW9mIGl0ZXIgPT09IFwic3RyaW5nXCIpXG4gICAgICByZXN1bHQucHVzaChpdGVyKTtcbiAgICBlbHNlIGlmICghaXRlcilcbiAgICAgIHRocm93IG5ldyBFcnJvcihgRGVmZW5pdGlvbiAke2l0ZXJ9IG5vdCBzdXBwb3J0ZWRgKVxuICAgIGVsc2UgaWYgKEFycmF5LmlzQXJyYXkoaXRlcikpIHtcbiAgICAgIGZvciAoY29uc3QgdmFsIG9mIGl0ZXIpXG4gICAgICAgIHJlc3VsdC5wdXNoKGNvbnZlcnRWYWx1ZVRvRGVmaW5pdGlvbih2YWwpKTtcbiAgICB9XG4gICAgZWxzZSBpZiAodHlwZW9mIGl0ZXIgPT09IFwib2JqZWN0XCIpIHtcbiAgICAgIGZvciAoY29uc3QgW2tleSwgdmFsXSBvZiBPYmplY3QuZW50cmllcyhpdGVyKSlcbiAgICAgICAgcmVzdWx0LnB1c2goYCR7a2V5fT0ke2NvbnZlcnRWYWx1ZVRvRGVmaW5pdGlvbih2YWwpfWApO1xuICAgIH1cbiAgICBlbHNlXG4gICAgICB0aHJvdyBuZXcgRXJyb3IoYERlZmVuaXRpb24gJHtpdGVyfSBub3Qgc3VwcG9ydGVkYClcbiAgfVxuICByZXR1cm4gcmVzdWx0O1xufVxuIiwiLypcbiAqIE1JVCBMaWNlbnNlXG4gKlxuICogQ29weXJpZ2h0IChjKSAyMDI1ICBZdXJpaSBZYWt1YmluICh5dXJpaS55YWt1YmluQGdtYWlsLmNvbSlcbiAqXG4gKiBQZXJtaXNzaW9uIGlzIGdyYW50ZWQgdG8gdXNlLCBjb3B5LCBtb2RpZnksIGFuZCBkaXN0cmlidXRlIHRoaXMgc29mdHdhcmVcbiAqIHVuZGVyIHRoZSBNSVQgTGljZW5zZS4gU2VlIExJQ0VOU0UgZmlsZSBmb3IgZGV0YWlscy5cbiAqL1xuXG5pbXBvcnQgeyBmaW5kUHJvZ3JhbSB9IGZyb20gXCJAL2NvcmUvRmluZFByb2dyYW1cIjtcbmltcG9ydCB7IFN5c3RlbVNjb3BlIH0gZnJvbSBcIkAvY29yZS9TeXN0ZW1TY29wZVwiO1xuaW1wb3J0IHsgTG9nZ2VyIH0gZnJvbSBcIkAvbG9nZ2VyXCI7XG5cbmNvbnN0IGxvZ2dlciA9IExvZ2dlci5jcmVhdGUoaW1wb3J0Lm1ldGEudXJsKTtcblxuZXhwb3J0IGFzeW5jIGZ1bmN0aW9uIGRldGVybWluZUNvbXBpbGVyKHNjb3BlOiBTeXN0ZW1TY29wZSkge1xuICBjb25zdCBjbGFuZ1BhdGggPSBhd2FpdCBmaW5kUHJvZ3JhbShcImNsYW5nXCIpO1xuICBpZiAoY2xhbmdQYXRoKSB7XG4gICAgbG9nZ2VyLmluZm8oXCJUaGUgQyBjb21waWxlciBpZGVudGlmaWNhdGlvbiBpcyBDbGFuZyBhLmIuY1wiKTtcbiAgICBzY29wZS5BU01fQ09NUElMRVIgPSBcImNsYW5nXCI7XG4gICAgc2NvcGUuQ19DT01QSUxFUiA9IFwiY2xhbmdcIjtcbiAgICBzY29wZS5DWFhfQ09NUElMRVIgPSBcImNsYW5nKytcIjtcbiAgICBzY29wZS5BUiA9IFwibGx2bS1hclwiO1xuICAgIHNjb3BlLlJBTkxJQiA9IFwibGx2bS1yYW5saWJcIjtcbiAgICBzY29wZS5MSU5LRVIgPSBcImxsZFwiO1xuICAgIHNjb3BlLk5NID0gXCJsbHZtLW5tXCI7XG4gICAgc2NvcGUuT0JKQ09QWSA9IFwibGx2bS1vYmpjb3B5XCI7XG4gICAgc2NvcGUuT0JKRFVNUCA9IFwibGx2bS1vYmpkdW1wXCI7XG4gICAgc2NvcGUuU1RSSVAgPSBcImxsdm0tc3RyaXBcIjtcbiAgICByZXR1cm47XG4gIH1cblxuICBjb25zdCBnY2NQYXRoID0gYXdhaXQgZmluZFByb2dyYW0oXCJnY2NcIik7XG4gIGlmIChnY2NQYXRoKSB7XG4gICAgbG9nZ2VyLmluZm8oXCJUaGUgQyBjb21waWxlciBpZGVudGlmaWNhdGlvbiBpcyBHTlUgYS5iLmNcIik7XG4gICAgc2NvcGUuQVNNX0NPTVBJTEVSID0gXCJnY2NcIjtcbiAgICBzY29wZS5DX0NPTVBJTEVSID0gXCJnY2NcIjtcbiAgICBzY29wZS5DWFhfQ09NUElMRVIgPSBcImcrK1wiO1xuICAgIHNjb3BlLkFSID0gXCJhclwiO1xuICAgIHNjb3BlLlJBTkxJQiA9IFwicmFubGliXCI7XG4gICAgc2NvcGUuTElOS0VSID0gXCJsZFwiO1xuICAgIHNjb3BlLk5NID0gXCJubVwiO1xuICAgIHNjb3BlLk9CSkNPUFkgPSBcIm9iamNvcHlcIjtcbiAgICBzY29wZS5PQkpEVU1QID0gXCJvYmpkdW1wXCI7XG4gICAgc2NvcGUuU1RSSVAgPSBcInN0cmlwXCI7XG4gICAgcmV0dXJuO1xuICB9XG5cbiAgdGhyb3cgYENhbiBub3QgZGV0ZXJtaW5lIGNvbXBpbGVyYDtcbn1cbiIsIi8qXG4gKiBNSVQgTGljZW5zZVxuICpcbiAqIENvcHlyaWdodCAoYykgMjAyNSAgWXVyaWkgWWFrdWJpbiAoeXVyaWkueWFrdWJpbkBnbWFpbC5jb20pXG4gKlxuICogUGVybWlzc2lvbiBpcyBncmFudGVkIHRvIHVzZSwgY29weSwgbW9kaWZ5LCBhbmQgZGlzdHJpYnV0ZSB0aGlzIHNvZnR3YXJlXG4gKiB1bmRlciB0aGUgTUlUIExpY2Vuc2UuIFNlZSBMSUNFTlNFIGZpbGUgZm9yIGRldGFpbHMuXG4gKi9cblxuaW1wb3J0IHsgSW50ZXJmYWNlVGFzayB9IGZyb20gXCJAL2NvcmUvTWFrZUludGVyZmFjZXNcIjtcbmltcG9ydCB7IEFic29sdXRlUGF0aCB9IGZyb20gXCJAL2NvcmUvQWJzb2x1dGVQYXRoXCI7XG5pbXBvcnQgeyBpbXBvcnRNb2R1bGUgfSBmcm9tIFwiQC91dGlscy9Nb2R1bGVcIjtcbmltcG9ydCB7IFZhcmlhYmxlTWFwIH0gZnJvbSBcIkAvY29yZS9TY29wZVwiO1xuaW1wb3J0IHsgU2NyaXB0Q29udGV4dCB9IGZyb20gXCJAL2NvcmUvU2NyaXB0Q29udGV4dFwiO1xuaW1wb3J0IHsgU2ltcGxlT2JqZWN0IH0gZnJvbSBcIkAvY29yZS9TaW1wbGVPYmplY3RcIjtcbmltcG9ydCB7IExvZ2dlciB9IGZyb20gXCJAL2xvZ2dlclwiO1xuXG5jb25zdCBsb2dnZXIgPSBMb2dnZXIuY3JlYXRlKGltcG9ydC5tZXRhLnVybCk7XG5cbmV4cG9ydCBjbGFzcyBFeGVjU2NyaXB0VGFzayBleHRlbmRzIEludGVyZmFjZVRhc2sge1xuICBwcml2YXRlIF92YXJpYWJsZU1hcDogVmFyaWFibGVNYXA7XG4gIHByaXZhdGUgX3NjcmlwdDogQWJzb2x1dGVQYXRoIHwgRnVuY3Rpb247XG5cbiAgcHVibGljIGNvbnN0cnVjdG9yKHZhcmlhYmxlTWFwOiBWYXJpYWJsZU1hcCwgc2NyaXB0OiBBYnNvbHV0ZVBhdGggfCBGdW5jdGlvbikge1xuICAgIHN1cGVyKCk7XG4gICAgdGhpcy5fdmFyaWFibGVNYXAgPSB2YXJpYWJsZU1hcDtcbiAgICB0aGlzLl9zY3JpcHQgPSBzY3JpcHQ7XG4gIH1cblxuICBwdWJsaWMgYXN5bmMgZXhlY3V0ZSgpOiBQcm9taXNlPHZvaWQ+IHtcbiAgICBsZXQgZnVuYyA9IHRoaXMuX3NjcmlwdDtcbiAgICBpZiAoZnVuYyBpbnN0YW5jZW9mIEFic29sdXRlUGF0aCkge1xuICAgICAgY29uc3Qgc2NyaXB0VXJsID0gZnVuYy50b0pTT04oKTsgLy8gVE9ETzogdG9TdHJpbmcoKVxuICAgICAgbG9nZ2VyLmRlYnVnKFwiSW1wb3J0XCIsIHNjcmlwdFVybCk7XG4gICAgICBmdW5jID0gKGF3YWl0IGltcG9ydE1vZHVsZShzY3JpcHRVcmwpKS5kZWZhdWx0O1xuICAgIH1cbiAgICBpZiAoZnVuYyBpbnN0YW5jZW9mIEZ1bmN0aW9uKSB7XG4gICAgICBjb25zdCBtayA9IFNjcmlwdENvbnRleHQuY3JlYXRlKHRoaXMuX3ZhcmlhYmxlTWFwKTtcbiAgICAgIGNvbnN0IHJlc3VsdCA9IGZ1bmMobWspO1xuICAgICAgaWYgKHJlc3VsdCBpbnN0YW5jZW9mIFByb21pc2UpXG4gICAgICAgIGF3YWl0IHJlc3VsdDtcbiAgICB9XG4gICAgZWxzZSB7XG4gICAgICB0aHJvdyBuZXcgRXJyb3IoYFRoZXJlIGlzIG5vIEZ1bmN0aW9uYCk7XG4gICAgfVxuICB9XG5cbiAgcHVibGljIHRvSlNPTigpOiBTaW1wbGVPYmplY3Qge1xuICAgIHJldHVybiB7XG4gICAgICB0eXBlOiBFeGVjU2NyaXB0VGFzay5uYW1lLFxuICAgICAgdmFyaWFibGVNYXA6IHRoaXMuX3ZhcmlhYmxlTWFwLFxuICAgICAgc2NyaXB0OiB0aGlzLl9zY3JpcHQsXG4gICAgfVxuICB9XG59O1xuIiwiLypcbiAqIE1JVCBMaWNlbnNlXG4gKlxuICogQ29weXJpZ2h0IChjKSAyMDI1ICBZdXJpaSBZYWt1YmluICh5dXJpaS55YWt1YmluQGdtYWlsLmNvbSlcbiAqXG4gKiBQZXJtaXNzaW9uIGlzIGdyYW50ZWQgdG8gdXNlLCBjb3B5LCBtb2RpZnksIGFuZCBkaXN0cmlidXRlIHRoaXMgc29mdHdhcmVcbiAqIHVuZGVyIHRoZSBNSVQgTGljZW5zZS4gU2VlIExJQ0VOU0UgZmlsZSBmb3IgZGV0YWlscy5cbiAqL1xuXG5pbXBvcnQgZnMgZnJvbSBcIm5vZGU6ZnNcIjtcblxuaW1wb3J0IHsgSW50ZXJmYWNlVGFzayB9IGZyb20gXCJAL2NvcmUvTWFrZUludGVyZmFjZXNcIjtcbmltcG9ydCB7IEFic29sdXRlUGF0aCB9IGZyb20gXCJAL2NvcmUvQWJzb2x1dGVQYXRoXCI7XG5pbXBvcnQgeyBTaW1wbGVPYmplY3QgfSBmcm9tIFwiQC9jb3JlL1NpbXBsZU9iamVjdFwiO1xuaW1wb3J0IHsgTG9nZ2VyIH0gZnJvbSBcIkAvbG9nZ2VyXCI7XG5cbmNvbnN0IGxvZ2dlciA9IExvZ2dlci5jcmVhdGUoaW1wb3J0Lm1ldGEudXJsKTtcblxuaW50ZXJmYWNlIEVudHJ5IHtcbiAgc3JjOiBBYnNvbHV0ZVBhdGg7XG4gIGRlc3Q6IEFic29sdXRlUGF0aDtcbn07XG5cbmV4cG9ydCBjbGFzcyBGaWxlSW5zdGFsbGF0aW9uVGFzayBleHRlbmRzIEludGVyZmFjZVRhc2sge1xuICBwcml2YXRlIF9lbnRyaWVzOiBFbnRyeVtdO1xuXG4gIHB1YmxpYyBjb25zdHJ1Y3RvcigpIHtcbiAgICBzdXBlcigpO1xuICAgIHRoaXMuX2VudHJpZXMgPSBbXTtcbiAgfVxuXG4gIHB1YmxpYyBhc3luYyBleGVjdXRlKCk6IFByb21pc2U8dm9pZD4ge1xuICAgIGZvciAoY29uc3Qge3NyYywgZGVzdH0gb2YgdGhpcy5fZW50cmllcykge1xuICAgICAgbG9nZ2VyLm5vdGljZShcIkluc3RhbGxpbmc6IFwiICsgZGVzdCk7XG4gICAgICBhd2FpdCBmcy5wcm9taXNlcy5ta2RpcihkZXN0LmRpcm5hbWUoKS50b1BhdGgoKSwgeyByZWN1cnNpdmU6IHRydWUgfSk7XG4gICAgICBhd2FpdCBmcy5wcm9taXNlcy5jcChzcmMudG9QYXRoKCksIGRlc3QudG9QYXRoKCksIHsgZm9yY2U6IHRydWUgfSk7XG4gICAgfVxuICB9XG5cbiAgcHVibGljIGFkZChzcmM6IEFic29sdXRlUGF0aCwgZGVzdDogQWJzb2x1dGVQYXRoKSB7XG4gICAgdGhpcy5fZW50cmllcy5wdXNoKHtzcmMsIGRlc3R9KTtcbiAgfVxuXG4gIHB1YmxpYyBzdGF0aWMgZnJvbUpTT04obzogU2ltcGxlT2JqZWN0KSB7XG4gICAgY29uc3QgdGFzayA9IG5ldyBGaWxlSW5zdGFsbGF0aW9uVGFzaztcbiAgICBmb3IgKGNvbnN0IGl0ZXIgb2YgKG8gYXMgYW55KS5lbnRyaWVzIGFzIEVudHJ5W10pXG4gICAgICB0YXNrLl9lbnRyaWVzLnB1c2goaXRlcik7XG4gICAgcmV0dXJuIHRhc2s7XG4gIH1cblxuICBwdWJsaWMgdG9KU09OKCk6IFNpbXBsZU9iamVjdCB7XG4gICAgcmV0dXJuIHtcbiAgICAgIHR5cGU6IEZpbGVJbnN0YWxsYXRpb25UYXNrLm5hbWUsXG4gICAgICBlbnRyaWVzOiB0aGlzLl9lbnRyaWVzLFxuICAgIH1cbiAgfVxufTtcblxuU2ltcGxlT2JqZWN0LnJlZ2lzdGVySW5zdGFuY2VDcmVhdG9yKEZpbGVJbnN0YWxsYXRpb25UYXNrLm5hbWUsIEZpbGVJbnN0YWxsYXRpb25UYXNrLmZyb21KU09OKTtcbiIsIi8qXG4gKiBNSVQgTGljZW5zZVxuICpcbiAqIENvcHlyaWdodCAoYykgMjAyNSAgWXVyaWkgWWFrdWJpbiAoeXVyaWkueWFrdWJpbkBnbWFpbC5jb20pXG4gKlxuICogUGVybWlzc2lvbiBpcyBncmFudGVkIHRvIHVzZSwgY29weSwgbW9kaWZ5LCBhbmQgZGlzdHJpYnV0ZSB0aGlzIHNvZnR3YXJlXG4gKiB1bmRlciB0aGUgTUlUIExpY2Vuc2UuIFNlZSBMSUNFTlNFIGZpbGUgZm9yIGRldGFpbHMuXG4gKi9cblxuaW1wb3J0IHsgUGF0aCB9IGZyb20gXCJAL3V0aWxzL1BhdGhcIjtcbmltcG9ydCB7IEhvc3QgfSBmcm9tIFwiQC91dGlscy9Ib3N0XCI7XG5pbXBvcnQgeyBmaWxlRXhpc3RzLCBmaWxlRXhpc3RzU3luYyB9IGZyb20gXCJAL3V0aWxzL0ZpbGVTeXN0ZW1cIjtcblxuZnVuY3Rpb24gcG9zc2libGVQcm9ncmFtTGlzdChuYW1lOiBzdHJpbmcpIHtcbiAgaWYgKEhvc3QuZXhlY3V0YWJsZVN1ZmZpeClcbiAgICBuYW1lICs9IEhvc3QuZXhlY3V0YWJsZVN1ZmZpeDtcblxuICBjb25zdCByZXN1bHQgPSBbXTtcbiAgY29uc3QgcGF0aHMgPSAocHJvY2Vzcy5lbnYuUEFUSCB8fCBcIlwiKS5zcGxpdChQYXRoLmRlbGltaXRlcik7XG4gIGZvciAoY29uc3QgaXRlciBvZiBwYXRocykge1xuICAgIGNvbnN0IGZpbGVuYW1lID0gUGF0aC5yZXNvbHZlKGl0ZXIsIG5hbWUpO1xuICAgIHJlc3VsdC5wdXNoKGZpbGVuYW1lKTtcbiAgfVxuXG4gIHJldHVybiByZXN1bHQ7XG59XG5cbmV4cG9ydCBhc3luYyBmdW5jdGlvbiBmaW5kUHJvZ3JhbShuYW1lOiBzdHJpbmcpOiBQcm9taXNlPHN0cmluZyB8IHVuZGVmaW5lZD4ge1xuICBmb3IgKGNvbnN0IGl0ZXIgb2YgcG9zc2libGVQcm9ncmFtTGlzdChuYW1lKSkge1xuICAgIGlmIChhd2FpdCBmaWxlRXhpc3RzKGl0ZXIpKVxuICAgICAgcmV0dXJuIGl0ZXI7XG4gIH1cbiAgcmV0dXJuIHVuZGVmaW5lZDtcbn1cblxuZXhwb3J0IGZ1bmN0aW9uIGZpbmRQcm9ncmFtU3luYyhuYW1lOiBzdHJpbmcpOiBzdHJpbmcgfCB1bmRlZmluZWQge1xuICBmb3IgKGNvbnN0IGl0ZXIgb2YgcG9zc2libGVQcm9ncmFtTGlzdChuYW1lKSkge1xuICAgIGlmIChmaWxlRXhpc3RzU3luYyhpdGVyKSlcbiAgICAgIHJldHVybiBpdGVyO1xuICB9XG4gIHJldHVybiB1bmRlZmluZWQ7XG59XG4iLCIvKlxuICogTUlUIExpY2Vuc2VcbiAqXG4gKiBDb3B5cmlnaHQgKGMpIDIwMjUgIFl1cmlpIFlha3ViaW4gKHl1cmlpLnlha3ViaW5AZ21haWwuY29tKVxuICpcbiAqIFBlcm1pc3Npb24gaXMgZ3JhbnRlZCB0byB1c2UsIGNvcHksIG1vZGlmeSwgYW5kIGRpc3RyaWJ1dGUgdGhpcyBzb2Z0d2FyZVxuICogdW5kZXIgdGhlIE1JVCBMaWNlbnNlLiBTZWUgTElDRU5TRSBmaWxlIGZvciBkZXRhaWxzLlxuICovXG5cbmltcG9ydCB7IFNpbXBsZU9iamVjdCB9IGZyb20gXCJAL2NvcmUvU2ltcGxlT2JqZWN0XCI7XG5pbXBvcnQgeyBJbnRlcmZhY2VUYXNrIH0gZnJvbSBcIkAvY29yZS9NYWtlSW50ZXJmYWNlc1wiO1xuaW1wb3J0IHsgTG9nZ2VyIH0gZnJvbSBcIkAvbG9nZ2VyXCI7XG5cbmNvbnN0IGxvZ2dlciA9IExvZ2dlci5jcmVhdGUoaW1wb3J0Lm1ldGEudXJsKTtcblxuZXhwb3J0IGNsYXNzIEdvYWxUYXJnZXQge1xuICBwcml2YXRlIF9tZXNzYWdlOiBzdHJpbmcgfCB1bmRlZmluZWQ7XG4gIHByaXZhdGUgX25hbWU6IHN0cmluZyB8IHVuZGVmaW5lZDtcbiAgcHJpdmF0ZSBfb3V0cHV0OiBzdHJpbmcgfCB1bmRlZmluZWQ7XG4gIHByaXZhdGUgX2RlcGVuZHMgPSBuZXcgQXJyYXk8c3RyaW5nPjtcbiAgcHJpdmF0ZSBfdGFza3MgPSBuZXcgQXJyYXk8SW50ZXJmYWNlVGFzaz47XG5cbiAgY29uc3RydWN0b3IobmFtZT86IHN0cmluZykge1xuICAgIHRoaXMuX25hbWUgPSBuYW1lO1xuICB9XG5cbiAgZ2V0IG1lc3NhZ2UoKTogc3RyaW5nIHwgdW5kZWZpbmVkIHtcbiAgICByZXR1cm4gdGhpcy5fbWVzc2FnZTtcbiAgfVxuXG4gIHNldCBtZXNzYWdlKHZhbHVlOiBzdHJpbmcpIHtcbiAgICB0aGlzLl9tZXNzYWdlID0gdmFsdWU7XG4gIH1cblxuICBnZXQgbmFtZSgpOiBzdHJpbmcgfCB1bmRlZmluZWQge1xuICAgIHJldHVybiB0aGlzLl9uYW1lO1xuICB9XG5cbiAgZ2V0IG91dHB1dCgpOiBzdHJpbmcgfCB1bmRlZmluZWQge1xuICAgIHJldHVybiB0aGlzLl9vdXRwdXQ7XG4gIH1cblxuICBzZXQgb3V0cHV0KHZhbHVlOiBzdHJpbmcpIHtcbiAgICB0aGlzLl9vdXRwdXQgPSB2YWx1ZTtcbiAgfVxuXG4gIGdldCBkZXBlbmRzKCk6IHN0cmluZ1tdIHtcbiAgICByZXR1cm4gdGhpcy5fZGVwZW5kcztcbiAgfVxuXG4gIHB1YmxpYyBhZGREZXBlbmRlbmN5KC4uLnZhbHVlOiBzdHJpbmdbXSkge1xuICAgIHRoaXMuX2RlcGVuZHMucHVzaCguLi52YWx1ZSk7XG4gIH1cblxuICBwdWJsaWMgYWRkVGFzayh0YXNrOiBJbnRlcmZhY2VUYXNrKSB7XG4gICAgdGhpcy5fdGFza3MucHVzaCh0YXNrKTtcbiAgfVxuXG4gIGFzeW5jIGRvV29yaygpOiBQcm9taXNlPHZvaWQ+IHtcbiAgICBmb3IgKGNvbnN0IHRhc2sgb2YgdGhpcy5fdGFza3MpIHtcbiAgICAgIGNvbnN0IHJlcyA9IHRhc2suZXhlY3V0ZSgpO1xuICAgICAgaWYgKHJlcyBpbnN0YW5jZW9mIFByb21pc2UpXG4gICAgICAgIGF3YWl0IHJlcztcbiAgICB9XG4gIH1cblxuICBwdWJsaWMgdG9KU09OKCk6IFNpbXBsZU9iamVjdCB7XG4gICAgY29uc3QganNvbjogYW55ID0ge1xuICAgICAgdHlwZTogR29hbFRhcmdldC5uYW1lLFxuICAgICAgZGVwZW5kczogdGhpcy5fZGVwZW5kcyxcbiAgICAgIHRhc2tzOiB0aGlzLl90YXNrcyxcbiAgICB9O1xuICAgIGlmICh0aGlzLl9tZXNzYWdlKSB7XG4gICAgICBqc29uLm1lc3NhZ2UgPSB0aGlzLl9tZXNzYWdlO1xuICAgIH1cbiAgICBpZiAodGhpcy5fbmFtZSkge1xuICAgICAganNvbi5uYW1lID0gdGhpcy5fbmFtZTtcbiAgICB9XG4gICAgaWYgKHRoaXMuX291dHB1dCkge1xuICAgICAganNvbi5vdXRwdXQgPSB0aGlzLl9vdXRwdXQ7XG4gICAgfVxuICAgIHJldHVybiBqc29uO1xuICB9XG59O1xuXG5leHBvcnQgY2xhc3MgR29hbENvbGxlY3Rpb24ge1xuICBwcml2YXRlIF9lbnRyaWVzID0gbmV3IEFycmF5PEdvYWxUYXJnZXQ+O1xuXG4gIHB1YmxpYyBnZXQgRU5UUklFUygpIHtcbiAgICByZXR1cm4gdGhpcy5fZW50cmllcztcbiAgfVxuXG4gIHB1YmxpYyBhZGRUYXJnZXQoZ2U6IEdvYWxUYXJnZXQpIHtcbiAgICBpZiAoZ2UubmFtZSAmJiB0aGlzLl9lbnRyaWVzLmZpbmQoKGkpID0+IGkubmFtZSA9PT0gZ2UubmFtZSkpXG4gICAgICB0aHJvdyBuZXcgRXJyb3IoYE5tYWUgXCIke2dlLm5hbWV9XCIgZXhpc3RzYCk7XG4gICAgaWYgKGdlLm91dHB1dCAmJiB0aGlzLl9lbnRyaWVzLmZpbmQoKGkpID0+IGkub3V0cHV0ID09PSBnZS5vdXRwdXQpKVxuICAgICAgdGhyb3cgbmV3IEVycm9yKGBPdXRwdXQgXCIke2dlLm91dHB1dH1cIiBleGlzdHNgKTtcbiAgICB0aGlzLl9lbnRyaWVzLnB1c2goZ2UpO1xuICB9XG5cbiAgcHVibGljIGdldFRhcmdldChuYW1lOiBzdHJpbmcpOiBHb2FsVGFyZ2V0IHwgdW5kZWZpbmVkIHtcbiAgICBpZiAoIW5hbWUpXG4gICAgICByZXR1cm4gdW5kZWZpbmVkO1xuICAgIHJldHVybiB0aGlzLl9lbnRyaWVzLmZpbmQoKGkpID0+IGkubmFtZSA9PT0gbmFtZSk7XG4gIH1cblxuICBwcml2YXRlIGFkZFRhcmdldExpc3RJbXBsKG5hbWU6IHN0cmluZywgcmVzdWx0OiBBcnJheTxHb2FsVGFyZ2V0Pikge1xuICAgIGlmIChyZXN1bHQuZmluZChpID0+IGkubmFtZSA9PT0gbmFtZSB8fCBpLm91dHB1dCA9PT0gbmFtZSkpIHtcbiAgICAgIHJldHVybjtcbiAgICB9XG5cbiAgICBjb25zdCBnb2FsID0gdGhpcy5fZW50cmllcy5maW5kKGkgPT4gaS5uYW1lID09PSBuYW1lIHx8IGkub3V0cHV0ID09PSBuYW1lKTtcbiAgICBpZiAoIWdvYWwpIHtcbiAgICAgIHJldHVybjtcbiAgICB9XG5cbiAgICBmb3IgKGNvbnN0IGl0ZXIgb2YgZ29hbC5kZXBlbmRzKSB7XG4gICAgICB0aGlzLmFkZFRhcmdldExpc3RJbXBsKGl0ZXIudG9TdHJpbmcoKSwgcmVzdWx0KTtcbiAgICB9XG5cbiAgICByZXN1bHQucHVzaChnb2FsKTtcbiAgfVxuICBcbiAgcHVibGljIGdldFRhcmdldExpc3QobmFtZTpzdHJpbmcpIHtcbiAgICBjb25zdCByZXN1bHQgPSBuZXcgQXJyYXk8R29hbFRhcmdldD47XG4gICAgdGhpcy5hZGRUYXJnZXRMaXN0SW1wbChuYW1lLCByZXN1bHQpO1xuICAgIHJldHVybiByZXN1bHQ7XG4gIH1cbiAgXG4gIHB1YmxpYyB0b0pTT04oKSB7XG4gICAgcmV0dXJuIHtcbiAgICAgIHR5cGU6IEdvYWxDb2xsZWN0aW9uLm5hbWUsXG4gICAgICBlbnRyaWVzOiB0aGlzLl9lbnRyaWVzLFxuICAgIH07XG4gIH1cbn07XG4iLCIvKlxuICogTUlUIExpY2Vuc2VcbiAqXG4gKiBDb3B5cmlnaHQgKGMpIDIwMjUgIFl1cmlpIFlha3ViaW4gKHl1cmlpLnlha3ViaW5AZ21haWwuY29tKVxuICpcbiAqIFBlcm1pc3Npb24gaXMgZ3JhbnRlZCB0byB1c2UsIGNvcHksIG1vZGlmeSwgYW5kIGRpc3RyaWJ1dGUgdGhpcyBzb2Z0d2FyZVxuICogdW5kZXIgdGhlIE1JVCBMaWNlbnNlLiBTZWUgTElDRU5TRSBmaWxlIGZvciBkZXRhaWxzLlxuICovXG5cbmltcG9ydCB7IFRhcmdldE5hbWUgfSBmcm9tIFwiQC9jb3JlL1RhcmdldE5hbWVcIjtcbmltcG9ydCB7IEFic29sdXRlUGF0aCB9IGZyb20gXCJAL2NvcmUvQWJzb2x1dGVQYXRoXCI7XG5pbXBvcnQgeyBTaW1wbGVPYmplY3QgfSBmcm9tIFwiQC9jb3JlL1NpbXBsZU9iamVjdFwiO1xuaW1wb3J0IHsgU3lzdGVtU2NvcGUgfSBmcm9tIFwiQC9jb3JlL1N5c3RlbVNjb3BlXCI7XG5cbmNvbnN0IFZBTFVFICAgICAgID0gU3ltYm9sKFwiVkFMVUVcIik7XG5jb25zdCBERVNUSU5BVElPTiA9IFN5bWJvbChcIkRFU1RJTkFUSU9OXCIpO1xuY29uc3QgQkFTRV9ESVIgICAgPSBTeW1ib2woXCJCQVNFX0RJUlwiKTtcblxuZXhwb3J0IGNsYXNzIEluc3RhbGxFbnRpdHkge1xuICBwcml2YXRlIFtWQUxVRV06IEFic29sdXRlUGF0aCB8IFRhcmdldE5hbWU7XG4gIHByaXZhdGUgW0RFU1RJTkFUSU9OXTogQWJzb2x1dGVQYXRoO1xuICBwcml2YXRlIFtCQVNFX0RJUl06IEFic29sdXRlUGF0aCB8IG51bGw7XG5cbiAgcHJpdmF0ZSBjb25zdHJ1Y3RvcihzY29wZTogU3lzdGVtU2NvcGUsIHZhbHVlOiBzdHJpbmcgfCBBYnNvbHV0ZVBhdGggfCBUYXJnZXROYW1lLCBwYXJhbXM6IHN0cmluZyB8IGFueSkge1xuICAgIGxldCBkZXN0aW5hdGlvbjogc3RyaW5nIHwgQWJzb2x1dGVQYXRoIHwgdW5kZWZpbmVkO1xuICAgIGxldCBiYXNlRGlyO1xuICAgIGlmICh0eXBlb2YgcGFyYW1zID09PSBcInN0cmluZ1wiKVxuICAgICAgZGVzdGluYXRpb24gPSBwYXJhbXM7XG4gICAgZWxzZSBpZiAocGFyYW1zKSB7XG4gICAgICBkZXN0aW5hdGlvbiA9IHBhcmFtcy5kZXN0aW5hdGlvbjtcbiAgICAgIGJhc2VEaXIgPSBwYXJhbXMuYmFzZURpcjtcbiAgICB9XG5cbiAgICBpZiAoIWRlc3RpbmF0aW9uKVxuICAgICAgdGhyb3cgbmV3IEVycm9yKGBQYXJhbWV0ZXIgZGVzdGluYXRpb24gaXMgbm90IHNwZWNpZmllZGApO1xuICBcbiAgICBpZiAoYmFzZURpcilcbiAgICAgIGJhc2VEaXIgPSBzY29wZS5TT1VSQ0VfRElSLnJlc29sdmUoYmFzZURpcik7XG4gIFxuICAgIGlmICh0eXBlb2YgdmFsdWUgPT09IFwic3RyaW5nXCIgfHwgdmFsdWUgaW5zdGFuY2VvZiBBYnNvbHV0ZVBhdGgpIHtcbiAgICAgIHZhbHVlID0gc2NvcGUuU09VUkNFX0RJUi5yZXNvbHZlKHZhbHVlLnRvU3RyaW5nKCkpIGFzIEFic29sdXRlUGF0aDtcbiAgICAgIHZhbHVlID0gQWJzb2x1dGVQYXRoLmNyZWF0ZSh2YWx1ZSk7XG4gICAgICBiYXNlRGlyID0gYmFzZURpciB8fCB2YWx1ZS5kaXJuYW1lKCk7XG4gICAgfVxuICAgIGVsc2UgaWYgKCEodmFsdWUgaW5zdGFuY2VvZiBUYXJnZXROYW1lKSkge1xuICAgICAgdGhyb3cgbmV3IEVycm9yKGBOb3Qgc3VwcG9ydGV0IHZhbHVlIG9mICR7dmFsdWV9YCk7XG4gICAgfVxuICBcbiAgICB0aGlzW1ZBTFVFXSA9IHZhbHVlO1xuICAgIHRoaXNbREVTVElOQVRJT05dID0gQWJzb2x1dGVQYXRoLmNyZWF0ZShzY29wZS5JTlNUQUxMX1BSRUZJWC5yZXNvbHZlKGRlc3RpbmF0aW9uLnRvU3RyaW5nKCkpLnRvU3RyaW5nKCkpO1xuICAgIHRoaXNbQkFTRV9ESVJdID0gYmFzZURpciA/IEFic29sdXRlUGF0aC5jcmVhdGUoYmFzZURpci50b1N0cmluZygpKSA6IG51bGw7XG4gIH1cbiAgXG4gIHB1YmxpYyBzdGF0aWMgY3JlYXRlKHNjb3BlOiBhbnksIHZhbHVlOiBzdHJpbmcgfCBBYnNvbHV0ZVBhdGggfCBUYXJnZXROYW1lLCBwYXJhbXM6IHN0cmluZyB8IGFueSkge1xuICAgIHJldHVybiBPYmplY3Quc2VhbChuZXcgSW5zdGFsbEVudGl0eShzY29wZSwgdmFsdWUsIHBhcmFtcykpO1xuICB9XG5cbiAgcHVibGljIGdldCBWQUxVRSAoKSB7XG4gICAgcmV0dXJuIHRoaXNbVkFMVUVdO1xuICB9XG5cbiAgcHVibGljIGdldCBERVNUSU5BVElPTiAoKSB7XG4gICAgcmV0dXJuIHRoaXNbREVTVElOQVRJT05dO1xuICB9XG5cbiAgcHVibGljIGdldCBCQVNFX0RJUiAoKSB7XG4gICAgcmV0dXJuIHRoaXNbQkFTRV9ESVJdO1xuICB9XG5cbiAgcHVibGljIHRvSlNPTigpOiBTaW1wbGVPYmplY3Qge1xuICAgIHJldHVybiB7XG4gICAgICB0eXBlOiBJbnN0YWxsRW50aXR5Lm5hbWUsXG4gICAgICBWQUxVRTogdGhpcy5WQUxVRSxcbiAgICAgIERFU1RJTkFUSU9OOiB0aGlzLkRFU1RJTkFUSU9OLFxuICAgICAgQkFTRV9ESVI6IHRoaXMuQkFTRV9ESVIsXG4gICAgfTtcbiAgfVxufTtcbiIsIi8qXG4gKiBNSVQgTGljZW5zZVxuICpcbiAqIENvcHlyaWdodCAoYykgMjAyNSAgWXVyaWkgWWFrdWJpbiAoeXVyaWkueWFrdWJpbkBnbWFpbC5jb20pXG4gKlxuICogUGVybWlzc2lvbiBpcyBncmFudGVkIHRvIHVzZSwgY29weSwgbW9kaWZ5LCBhbmQgZGlzdHJpYnV0ZSB0aGlzIHNvZnR3YXJlXG4gKiB1bmRlciB0aGUgTUlUIExpY2Vuc2UuIFNlZSBMSUNFTlNFIGZpbGUgZm9yIGRldGFpbHMuXG4gKi9cblxuaW1wb3J0IHsgSU1ha2VDb250ZXh0IH0gZnJvbSBcIkAvY29yZS9NYWtlSW50ZXJmYWNlc1wiO1xuaW1wb3J0IHsgTWFrZUNvbnRleHQgfSBmcm9tIFwiQC9jb3JlL0Jhc2VDb250ZXh0XCI7XG5pbXBvcnQgeyBmaWxlRXhpc3RzU3luYyB9IGZyb20gXCJAL3V0aWxzL0ZpbGVTeXN0ZW1cIjtcbmltcG9ydCB7IFByb2plY3RDb250ZXh0IH0gZnJvbSBcIkAvY29yZS9Qcm9qZWN0Q29udGV4dFwiO1xuaW1wb3J0IHsgU2NvcGVIZWxwZXIsIFZhcmlhbnRNYXAsIFZhcmlhYmxlTWFwIH0gZnJvbSBcIkAvY29yZS9TY29wZVwiO1xuaW1wb3J0IHsgcmVxdWlyZVN5bmMgfSBmcm9tIFwiQC91dGlscy9Nb2R1bGVcIjtcbmltcG9ydCB7IENVU1RPTV9WQVJJQUJMRV9HUk9VUCB9IGZyb20gXCJAL0NvbnN0YW50c1wiO1xuaW1wb3J0IHsgQWJzb2x1dGVQYXRoIH0gZnJvbSBcIkAvY29yZS9BYnNvbHV0ZVBhdGhcIjtcbmltcG9ydCB7IExvZ2dlciB9IGZyb20gXCJAL2xvZ2dlclwiO1xuXG5jb25zdCBsb2dnZXIgPSBMb2dnZXIuY3JlYXRlKGltcG9ydC5tZXRhLnVybCk7XG5cbmV4cG9ydCBjbGFzcyBMb2NhbE1ha2VDb250ZXh0IGV4dGVuZHMgTWFrZUNvbnRleHQgaW1wbGVtZW50cyBJTWFrZUNvbnRleHQge1xuICBwcml2YXRlIF9wcm9qZWN0OiBQcm9qZWN0Q29udGV4dDtcblxuICBwdWJsaWMgY29uc3RydWN0b3Ioc2NvcGU6IFZhcmlhYmxlTWFwLCBwcm9qZWN0OiBQcm9qZWN0Q29udGV4dCkge1xuICAgIHN1cGVyKHNjb3BlKTtcbiAgICB0aGlzLl9wcm9qZWN0ID0gcHJvamVjdDtcbiAgfVxuXG4gIHB1YmxpYyBleGVjdXRlU2NyaXB0KHNjcmlwdDogYW55LCBwYXJhbXM6IGFueSkge1xuICAgIHRoaXMuX3Byb2plY3QuZXhlY3V0ZVNjcmlwdFN5bmModGhpcy5fc2NvcGUsIHNjcmlwdCwgcGFyYW1zKTtcbiAgfVxuXG4gIHB1YmxpYyBhZGRDYWNoZVZhcmlhYmxlcyhwYXJhbXM6IHN0cmluZyB8IFZhcmlhbnRNYXApOiB2b2lkIHtcbiAgICBsZXQgdmFyaWFibGVzID0gcGFyYW1zO1xuICAgIGlmICh0eXBlb2YgcGFyYW1zID09PSBcInN0cmluZ1wiKSB7XG4gICAgICBjb25zdCBmaWxlbmFtZSA9IFNjb3BlSGVscGVyLmdldCh0aGlzLl9zY29wZSwgXCJTT1VSQ0VfRElSXCIpLnJlc29sdmUocGFyYW1zKS50b1N0cmluZygpO1xuICAgICAgaWYgKCFmaWxlRXhpc3RzU3luYyhmaWxlbmFtZSkpXG4gICAgICAgIHJldHVybjtcbiAgICAgIHZhcmlhYmxlcyA9IHJlcXVpcmVTeW5jKGZpbGVuYW1lKTtcbiAgICB9XG5cbiAgICBTY29wZUhlbHBlci5kZWZpbmVWYXJpYWJsZXNJblZhcmlhYmxlTWFwKHRoaXMuX3Njb3BlLCBDVVNUT01fVkFSSUFCTEVfR1JPVVAsIHZhcmlhYmxlcyk7XG4gIH1cblxuICBwdWJsaWMgYWRkU3ViZGlyZWN0b3J5KHNvdXJjZURpcjogc3RyaW5nIHwgQWJzb2x1dGVQYXRoLCBiaW5hcnlEaXI/OiBzdHJpbmcgfCBBYnNvbHV0ZVBhdGgpOiB2b2lkIHtcbiAgICB0aGlzLl9wcm9qZWN0LmFkZFN1YmRpcmVjdG9yeSh0aGlzLl9zY29wZSwgc291cmNlRGlyLCBiaW5hcnlEaXIpO1xuICB9XG59O1xuIiwiLypcbiAqIE1JVCBMaWNlbnNlXG4gKlxuICogQ29weXJpZ2h0IChjKSAyMDI1ICBZdXJpaSBZYWt1YmluICh5dXJpaS55YWt1YmluQGdtYWlsLmNvbSlcbiAqXG4gKiBQZXJtaXNzaW9uIGlzIGdyYW50ZWQgdG8gdXNlLCBjb3B5LCBtb2RpZnksIGFuZCBkaXN0cmlidXRlIHRoaXMgc29mdHdhcmVcbiAqIHVuZGVyIHRoZSBNSVQgTGljZW5zZS4gU2VlIExJQ0VOU0UgZmlsZSBmb3IgZGV0YWlscy5cbiAqL1xuXG5pbXBvcnQgeyBUYXJnZXRGaWxlIH0gZnJvbSBcIkAvY29yZS9UYXJnZXRGaWxlXCI7XG5pbXBvcnQgeyBUYXJnZXRPYmplY3RzIH0gZnJvbSBcIkAvY29yZS9UYXJnZXRPYmplY3RzXCI7XG5pbXBvcnQgeyBUYXJnZXRJbmNsdWRlcyB9IGZyb20gXCJAL2NvcmUvVGFyZ2V0SW5jbHVkZXNcIjtcbmltcG9ydCB7IFZhcmlhbnRNYXAgfSBmcm9tIFwiQC9jb3JlL1Njb3BlXCI7XG5pbXBvcnQgeyBBYnNvbHV0ZVBhdGggfSBmcm9tIFwiQC9jb3JlL0Fic29sdXRlUGF0aFwiO1xuaW1wb3J0IHsgU291cmNlRmlsZUxpc3QgfSBmcm9tIFwiQC9jb3JlL1NvdXJjZUZpbGVMaXN0XCI7XG5pbXBvcnQgeyBTb3VyY2VGaWxlIH0gZnJvbSBcIkAvY29yZS9Tb3VyY2VGaWxlXCI7XG5cbmV4cG9ydCBhYnN0cmFjdCBjbGFzcyBJbnRlcmZhY2VUYXNrIHtcbiAgYWJzdHJhY3QgZXhlY3V0ZSgpOiBQcm9taXNlPHZvaWQ+IHwgdm9pZDtcbn07XG5cbmV4cG9ydCBhYnN0cmFjdCBjbGFzcyBJbnRlcmZhY2VUYXJnZXQge1xuICBhYnN0cmFjdCBnZXQgdGFyZ2V0TmFtZSgpOiBzdHJpbmc7XG4gIGFic3RyYWN0IGdldCB0YXJnZXRGaWxlKCk6IFRhcmdldEZpbGU7XG4gIGFic3RyYWN0IGdldCBpbmNsdWRlcygpOiBUYXJnZXRJbmNsdWRlcztcbiAgYWJzdHJhY3QgZ2V0IG9iamVjdHMoKTogVGFyZ2V0T2JqZWN0cztcblxuICBhYnN0cmFjdCBzZXRQcmVmaXgocHJlZml4OiBzdHJpbmcpOiB2b2lkOyAgXG4gIGFic3RyYWN0IHNldFN1ZmZpeChzdWZmaXg6IHN0cmluZyk6IHZvaWQ7XG4gIGFic3RyYWN0IHNldE91dHB1dE5hbWUob3V0cHV0TmFtZTogc3RyaW5nKTogdm9pZDtcblxuICBhYnN0cmFjdCBhZGRTb3VyY2VzKC4uLnNvdXJjZXM6IEFycmF5PFRhcmdldE9iamVjdHMgfCBTb3VyY2VGaWxlIHwgQWJzb2x1dGVQYXRoIHwgc3RyaW5nPik6IHZvaWQ7XG4gIGFic3RyYWN0IGFkZEluY2x1ZGVzKC4uLmluY2x1ZGVzOiBBcnJheTxUYXJnZXRJbmNsdWRlcyB8IEFic29sdXRlUGF0aCB8IHN0cmluZz4pOiB2b2lkO1xuICBhYnN0cmFjdCBhZGRMaWJyYXJpZXMoLi4ubGlicmFyaWVzOiBhbnkpOiB2b2lkO1xuICBhYnN0cmFjdCBhZGRDb21waWxlT3B0aW9ucyguLi5vcHRpb25zOiBBcnJheTxzdHJpbmd8c3RyaW5nW10+KTogdm9pZDtcbiAgYWJzdHJhY3QgYWRkTGlua09wdGlvbnMoLi4ub3B0aW9uczogQXJyYXk8c3RyaW5nfHN0cmluZ1tdPik6IHZvaWQ7XG4gIGFic3RyYWN0IGdldFNvdXJjZUZpbGVzKC4uLnNvdXJjZXM6IGFueVtdKTogU291cmNlRmlsZUxpc3Q7XG4gIGFic3RyYWN0IGFkZERlZmluaXRpb25zKC4uLmRlZmluaXRpb25zOiBhbnlbXSk6IHZvaWQ7XG4gIGFic3RyYWN0IGFkZFByZUJ1aWxkKGNvbW1hbmQ6IGFueSwgYXJnczogYW55W10pOiB2b2lkO1xuICBhYnN0cmFjdCBhZGRQb3N0QnVpbGQoY29tbWFuZDogYW55LCBhcmdzOiBhbnlbXSk6IHZvaWQ7XG5cbiAgYWJzdHJhY3Qgc2V0UG9zaXRpb25JbmRlcGVuZGVudENvZGUodmFsdWU6IGJvb2xlYW4pOiB2b2lkO1xuICBhYnN0cmFjdCBhZGRQdWJsaWNJbmNsdWRlcyguLi5pbmNsdWRlczogQXJyYXk8VGFyZ2V0SW5jbHVkZXMgfCBBYnNvbHV0ZVBhdGggfCBzdHJpbmc+KTogdm9pZDtcbiAgYWJzdHJhY3QgYWRkUHVibGljRGVmaW5pdGlvbnMoLi4uZGVmaW5pdGlvbnM6IGFueSk6IHZvaWQ7XG4gIGFic3RyYWN0IGFkZFB1YmxpY0xpYnJhcmllcyguLi5saWJyYXJpZXM6IGFueVtdKTogdm9pZDtcbiAgYWJzdHJhY3QgYWRkUHVibGljQ29tcGlsZU9wdGlvbnMoLi4ub3B0aW9uczogQXJyYXk8c3RyaW5nfHN0cmluZ1tdPik6IHZvaWQ7XG4gIGFic3RyYWN0IGFkZFB1YmxpY0xpbmtPcHRpb25zKC4uLm9wdGlvbnM6IEFycmF5PHN0cmluZ3xzdHJpbmdbXT4pOiB2b2lkO1xufTtcblxuZXhwb3J0IGFic3RyYWN0IGNsYXNzIEludGVyZmFjZVNjcmlwdCB7XG4gIGFic3RyYWN0IG1lcmdlVmFyaWFibGVzKHZhcmlhYmxlczogVmFyaWFudE1hcCk6IHZvaWQ7XG59O1xuXG5leHBvcnQgaW50ZXJmYWNlIElHZW5lcmFsQ29udGV4dCB7XG4gIGdldFByb3BlcnR5KG5hbWU6IHN0cmluZyk6IGFueTtcbiAgc2V0UHJvcGVydHkobmFtZTogc3RyaW5nLCB2YWx1ZTogYW55KTogYm9vbGVhbjtcbiAgaGFzUHJvcGVydHkobmFtZTogc3RyaW5nKTogYm9vbGVhbjtcbiAgZGVsZXRlUHJvcGVydHkobmFtZTogc3RyaW5nKTogYm9vbGVhbjtcbiAgZ2V0UHJvcGVydHlOYW1lcygpOiBzdHJpbmdbXTtcblxuICBmaW5kUHJvZ3JhbShuYW1lOiBzdHJpbmcpOiBzdHJpbmcgfCB1bmRlZmluZWQ7XG59O1xuXG5leHBvcnQgaW50ZXJmYWNlIElNYWtlQ29udGV4dCBleHRlbmRzIElHZW5lcmFsQ29udGV4dCB7XG4gIGdldENhY2hlVmFyaWFibGVzKCk6IGFueTtcbiAgYWRkQ2FjaGVWYXJpYWJsZXMocGFyYW1zOiBzdHJpbmcgfCBWYXJpYW50TWFwKTogdm9pZDtcbiAgYWRkSW5jbHVkZURpcmVjdG9yaWVzKC4uLmRpcnM6IGFueVtdKTogdm9pZDtcbiAgYWRkU3ViZGlyZWN0b3J5KHNvdXJjZURpcjogc3RyaW5nIHwgQWJzb2x1dGVQYXRoLCBiaW5hcnlEaXI/OiBzdHJpbmcgfCBBYnNvbHV0ZVBhdGgpOiB2b2lkO1xuICBzY3JpcHQobmFtZTogc3RyaW5nKTogSW50ZXJmYWNlU2NyaXB0O1xuICBhZGRDdXN0b21TY3JpcHQoc2NyaXB0OiBzdHJpbmcsIHBhcmFtczogYW55KTogSW50ZXJmYWNlU2NyaXB0O1xuICB0YXJnZXQobmFtZTogc3RyaW5nKTogSW50ZXJmYWNlVGFyZ2V0O1xuICBhZGRPYmplY3RMaWJyYXJ5KG5hbWU6IHN0cmluZywgLi4uc291cmNlczogYW55W10pOiBJbnRlcmZhY2VUYXJnZXQ7XG4gIGFkZFN0YXRpY0xpYnJhcnkobmFtZTogc3RyaW5nLCAuLi5zb3VyY2VzOiBhbnlbXSk6IEludGVyZmFjZVRhcmdldDtcbiAgYWRkU2hhcmVkTGlicmFyeShuYW1lOiBzdHJpbmcsIC4uLnNvdXJjZXM6IGFueVtdKTogSW50ZXJmYWNlVGFyZ2V0O1xuICBhZGRFeGVjdXRhYmxlKG5hbWU6IHN0cmluZywgLi4uc291cmNlczogYW55W10pOiBJbnRlcmZhY2VUYXJnZXQ7XG4gIGV4ZWN1dGVTY3JpcHQoc2NyaXB0OiBhbnksIHBhcmFtczogYW55KTogdm9pZDtcbiAgaW5zdGFsbCh2YWx1ZTogYW55LCBwYXJhbXM6IGFueSk6IHZvaWQ7XG59O1xuIiwiLypcbiAqIE1JVCBMaWNlbnNlXG4gKlxuICogQ29weXJpZ2h0IChjKSAyMDI1ICBZdXJpaSBZYWt1YmluICh5dXJpaS55YWt1YmluQGdtYWlsLmNvbSlcbiAqXG4gKiBQZXJtaXNzaW9uIGlzIGdyYW50ZWQgdG8gdXNlLCBjb3B5LCBtb2RpZnksIGFuZCBkaXN0cmlidXRlIHRoaXMgc29mdHdhcmVcbiAqIHVuZGVyIHRoZSBNSVQgTGljZW5zZS4gU2VlIExJQ0VOU0UgZmlsZSBmb3IgZGV0YWlscy5cbiAqL1xuXG5pbXBvcnQgeyBQcm9qZWN0Q29udGV4dCB9IGZyb20gXCJAL2NvcmUvUHJvamVjdENvbnRleHRcIjtcbmltcG9ydCB7IFZhcmlhYmxlTWFwIH0gZnJvbSBcIkAvY29yZS9TY29wZVwiO1xuaW1wb3J0IHsgR2VuZXJhbENvbnRleHQsIGNyZWF0ZUNvbnRleHQgfSBmcm9tIFwiQC9jb3JlL0Jhc2VDb250ZXh0XCI7XG5cbmNvbnN0IEdMT0JBTCA9IFN5bWJvbChcIkdMT0JBTFwiKTtcbmNvbnN0IFNDT1BFID0gU3ltYm9sKFwiU0NPUEVcIik7XG5cbmV4cG9ydCBjbGFzcyBQbHVnaW5Db250ZXh0IGV4dGVuZHMgR2VuZXJhbENvbnRleHQge1xuICBbR0xPQkFMXTogUHJvamVjdENvbnRleHQ7XG4gIFtTQ09QRV06IFZhcmlhYmxlTWFwO1xuXG4gIHB1YmxpYyBjb25zdHJ1Y3RvcihnbG9iYWw6IFByb2plY3RDb250ZXh0LCB2YXJpYWJsZU1hcDogVmFyaWFibGVNYXApIHtcbiAgICBzdXBlcih2YXJpYWJsZU1hcCk7XG4gICAgdGhpc1tHTE9CQUxdID0gZ2xvYmFsO1xuICAgIHRoaXNbU0NPUEVdID0gdmFyaWFibGVNYXA7XG4gIH1cblxuICBwdWJsaWMgYWRkU3ViZGlyZWN0b3J5QWxpYXMoc3JjOiBhbnksIGRlc3Q6IGFueSkge1xuICAgIHRoaXNbR0xPQkFMXS5hZGRTdWJkaXJlY3RvcnlBbGlhcyh0aGlzW1NDT1BFXSwgc3JjLCBkZXN0KTtcbiAgfVxuXG4gIHB1YmxpYyBzdGF0aWMgY3JlYXRlKGdsb2JhbDogUHJvamVjdENvbnRleHQsIHZhcmlhYmxlTWFwOiBWYXJpYWJsZU1hcCkge1xuICAgIHJldHVybiBjcmVhdGVDb250ZXh0KG5ldyBQbHVnaW5Db250ZXh0KGdsb2JhbCwgdmFyaWFibGVNYXApKTtcbiAgfVxufTtcbiIsIi8qXG4gKiBNSVQgTGljZW5zZVxuICpcbiAqIENvcHlyaWdodCAoYykgMjAyNSAgWXVyaWkgWWFrdWJpbiAoeXVyaWkueWFrdWJpbkBnbWFpbC5jb20pXG4gKlxuICogUGVybWlzc2lvbiBpcyBncmFudGVkIHRvIHVzZSwgY29weSwgbW9kaWZ5LCBhbmQgZGlzdHJpYnV0ZSB0aGlzIHNvZnR3YXJlXG4gKiB1bmRlciB0aGUgTUlUIExpY2Vuc2UuIFNlZSBMSUNFTlNFIGZpbGUgZm9yIGRldGFpbHMuXG4gKi9cblxuaW1wb3J0IGZzIGZyb20gXCJub2RlOmZzXCI7XG5cbmltcG9ydCB7IEFMTF9UQVJHRVQsIElOU1RBTExfVEFSR0VUIH0gZnJvbSBcIkAvQ29uc3RhbnRzXCI7XG5pbXBvcnQgeyBBYnNvbHV0ZVBhdGggfSBmcm9tIFwiQC9jb3JlL0Fic29sdXRlUGF0aFwiO1xuaW1wb3J0IHsgZmlsZUV4aXN0cywgZmlsZUV4aXN0c1N5bmMgfSBmcm9tIFwiQC91dGlscy9GaWxlU3lzdGVtXCI7XG5pbXBvcnQgeyBUYXJnZXRDb2xsZWN0aW9uIH0gZnJvbSBcIkAvY29yZS9UYXJnZXRDb2xsZWN0aW9uXCI7XG5pbXBvcnQgeyBTY3JpcHRDb2xsZWN0aW9uIH0gZnJvbSBcIkAvY29yZS9TY3JpcHRDb2xsZWN0aW9uXCI7XG5pbXBvcnQgeyBHb2FsQ29sbGVjdGlvbiwgR29hbFRhcmdldCB9IGZyb20gXCJAL2NvcmUvR29hbENvbGxlY3Rpb25cIjtcbmltcG9ydCB7IFVzZXJNYWtlQ29udGV4dCB9IGZyb20gXCJAL2NvcmUvVXNlck1ha2VDb250ZXh0XCI7XG5pbXBvcnQgeyBMb2NhbE1ha2VDb250ZXh0IH0gZnJvbSBcIkAvY29yZS9Mb2NhbE1ha2VDb250ZXh0XCI7XG5pbXBvcnQgeyBPYmplY3RMaWJyYXJ5LCBTdGF0aWNMaWJyYXJ5LCBTaGFyZWRMaWJyYXJ5LCBFeGVjdXRhYmxlLCBUYXJnZXRDb21tYW5kIH0gZnJvbSBcIkAvY29yZS9UYXJnZXRcIjtcbmltcG9ydCB7IFN5c3RlbVNjb3BlIH0gZnJvbSBcIkAvY29yZS9TeXN0ZW1TY29wZVwiO1xuaW1wb3J0IHsgcmVxdWlyZVN5bmMgfSBmcm9tIFwiQC91dGlscy9Nb2R1bGVcIjtcbmltcG9ydCB7IExvZ2dlciB9IGZyb20gXCJAL2xvZ2dlclwiO1xuaW1wb3J0IHsgVGFyZ2V0TmFtZSB9IGZyb20gXCJAL2NvcmUvVGFyZ2V0TmFtZVwiO1xuaW1wb3J0IHsgSW5zdGFsbEVudGl0eSB9IGZyb20gXCJAL2NvcmUvSW5zdGFsbEVudGl0eVwiO1xuaW1wb3J0IHsgU2NyaXB0Q29udGV4dCB9IGZyb20gXCJAL2NvcmUvU2NyaXB0Q29udGV4dFwiO1xuaW1wb3J0IHsgU2NvcGVIZWxwZXIsIFZhcmlhYmxlTWFwIH0gZnJvbSBcIi4vU2NvcGVcIjtcbmltcG9ydCB7IFRhcmdldEZpbGUgfSBmcm9tIFwiQC9jb3JlL1RhcmdldEZpbGVcIjtcbmltcG9ydCB7IFNvdXJjZUZpbGUgfSBmcm9tIFwiQC9jb3JlL1NvdXJjZUZpbGVcIjtcbmltcG9ydCB7IEV4ZWNTY3JpcHRUYXNrIH0gZnJvbSBcIkAvY29yZS9FeGVjU2NyaXB0VGFza1wiO1xuaW1wb3J0IHsgU3Bhd25TeW5jVGFzayB9IGZyb20gXCJAL2NvcmUvU3Bhd25TeW5jVGFza1wiO1xuaW1wb3J0IHsgRmlsZUluc3RhbGxhdGlvblRhc2sgfSBmcm9tIFwiQC9jb3JlL0ZpbGVJbnN0YWxsYXRpb25UYXNrXCI7XG5pbXBvcnQgeyBwZXJmb3JtQ29udGV4dCwgY3JlYXRlVmFyaWFibGVNYXBGb3JEaXJlY3RvcnkgfSBmcm9tIFwiQC9jb3JlL0Jhc2VDb250ZXh0XCI7XG5cbmltcG9ydCBCdWlsZGluU2NyaXB0cyBmcm9tIFwiQC9jb3JlL0J1aWxkaW5TY3JpcHRzXCI7XG5cbmNvbnN0IGxvZ2dlciA9IExvZ2dlci5jcmVhdGUoaW1wb3J0Lm1ldGEudXJsKTtcblxuY29uc3QgVEFSR0VUUyA9IFN5bWJvbChcIlRBUkdFVFNcIik7XG5jb25zdCBDVVNUT01fU0NSSVBUUyA9IFN5bWJvbChcIkNVU1RPTV9TQ1JJUFRTXCIpO1xuY29uc3QgQ0FDSEUgPSBTeW1ib2woXCJDQUNIRVwiKTtcbmNvbnN0IEJVSUxUSU5fU0NSSVBUUyA9IFN5bWJvbChcIkJVSUxUSU5fU0NSSVBUU1wiKTtcblxudHlwZSBTdWJkaXJlY3RvcnlBbGlhcyA9IHtcbiAgW25hbWU6IHN0cmluZ106IEFic29sdXRlUGF0aCB8IG51bGw7XG59O1xuXG50eXBlIENhY2hlVmFyaWFibGVEZXNjcmlwdG9yID0ge1xuICB0eXBlPzogYW55O1xuICB2YWx1ZT86IGFueTtcbiAgZGVzY3JpcHRpb24/OiBzdHJpbmc7XG59O1xuXG50eXBlIENhY2hlVmFyaWFibGVEZXNjcmlwdG9ycyA9IHtcbiAgW25hbWU6IHN0cmluZ106IENhY2hlVmFyaWFibGVEZXNjcmlwdG9yO1xufTtcblxudHlwZSBCdWlsZGluU2NyaXB0cyA9IHtcbiAgW25hbWU6IHN0cmluZ106IEZ1bmN0aW9uO1xufTtcblxuZXhwb3J0IGludGVyZmFjZSBFeGVjU3RydWN0IHtcbiAgY29tbWFuZDogc3RyaW5nO1xuICBhcmdzOiBzdHJpbmdbXTtcbn07XG5cbmZ1bmN0aW9uIGVuc3VyZVZhbHVlQnlUeXBlKHR5cGU6IGFueSwgdmFsdWU6IGFueSkge1xuICBpZiAoQXJyYXkuaXNBcnJheSh0eXBlKSA/IHR5cGUuaW5jbHVkZXModmFsdWUpIDogdHlwZW9mIHZhbHVlID09PSB0eXBlKVxuICAgIHJldHVybiB2YWx1ZTtcbiAgdGhyb3cgbmV3IEVycm9yKGBUaGUgJyR7dmFsdWV9JyBpcyBub3QgYSAke3R5cGV9YCk7XG59XG5cbmZ1bmN0aW9uIHJlc29sdmVJbnN0YW5jZShwcm9qZWN0OiBQcm9qZWN0Q29udGV4dCwgbzogc3RyaW5nIHwgQWJzb2x1dGVQYXRoIHwgVGFyZ2V0RmlsZSk6IHN0cmluZyB7XG4gIGlmICh0eXBlb2YgbyA9PT0gXCJzdHJpbmdcIilcbiAgICByZXR1cm4gbztcblxuICBpZiAobyBpbnN0YW5jZW9mIEFic29sdXRlUGF0aClcbiAgICByZXR1cm4gby50b1N0cmluZygpO1xuXG4gIGlmIChvIGluc3RhbmNlb2YgVGFyZ2V0RmlsZSkge1xuICAgIGNvbnN0IHRhcmdldCA9IHByb2plY3QuVEFSR0VUUy5nZXQoby50YXJnZXROYW1lKTtcbiAgICByZXR1cm4gdGFyZ2V0LmdldEZpbGUoKS50b1N0cmluZygpO1xuICB9XG5cbiAgdGhyb3cgbmV3IEVycm9yKGBVbmFibGUgdG8gcmVzb2x2ZSBvYmplY3QgJHtvfWApO1xufVxuXG5mdW5jdGlvbiByZXNvbHZlVGFyZ2V0Q29tbWFuZChwcm9qZWN0OiBQcm9qZWN0Q29udGV4dCwgdGNtZDogVGFyZ2V0Q29tbWFuZCk6IEV4ZWNTdHJ1Y3Qge1xuICBjb25zdCBjb21tYW5kID0gcmVzb2x2ZUluc3RhbmNlKHByb2plY3QsIHRjbWQuY29tbWFuZCk7XG4gIGNvbnN0IGFyZ3MgPSB0Y21kLmFyZ3MubWFwKGkgPT4gcmVzb2x2ZUluc3RhbmNlKHByb2plY3QsIGkpKTtcbiAgcmV0dXJuIHtjb21tYW5kLCBhcmdzfTtcbn1cblxuZXhwb3J0IGNsYXNzIFByb2plY3RDb250ZXh0IHtcbiAgcHJpdmF0ZSBbVEFSR0VUU106IFRhcmdldENvbGxlY3Rpb247XG4gIHByaXZhdGUgW0NVU1RPTV9TQ1JJUFRTXTogU2NyaXB0Q29sbGVjdGlvbjtcbiAgcHJpdmF0ZSBbQ0FDSEVdOiBDYWNoZVZhcmlhYmxlRGVzY3JpcHRvcnM7XG4gIHByaXZhdGUgX2luc3RhbGxMaXN0OiBJbnN0YWxsRW50aXR5W107XG4gIHByaXZhdGUgX3Byb2Nlc3NlZFZhcmlhYmxlTWFwOiBhbnk7XG4gIHByaXZhdGUgW0JVSUxUSU5fU0NSSVBUU106IEJ1aWxkaW5TY3JpcHRzO1xuICBwcml2YXRlIF9zdWJkaXJBbGlhczogU3ViZGlyZWN0b3J5QWxpYXM7XG4gIHByaXZhdGUgX3N1YmRpckxpc3Q6IFZhcmlhYmxlTWFwW107XG5cbiAgcHJpdmF0ZSBjb25zdHJ1Y3RvcigpIHtcbiAgICB0aGlzW1RBUkdFVFNdID0gVGFyZ2V0Q29sbGVjdGlvbi5jcmVhdGUoKTtcbiAgICB0aGlzW0NVU1RPTV9TQ1JJUFRTXSA9IFNjcmlwdENvbGxlY3Rpb24uY3JlYXRlKCk7XG4gICAgdGhpc1tDQUNIRV0gPSB7fTtcbiAgICB0aGlzLl9pbnN0YWxsTGlzdCA9IFtdO1xuICAgIHRoaXMuX3Byb2Nlc3NlZFZhcmlhYmxlTWFwID0ge307XG4gICAgdGhpcy5fc3ViZGlyQWxpYXMgPSB7fTtcbiAgICB0aGlzW0JVSUxUSU5fU0NSSVBUU10gPSBCdWlsZGluU2NyaXB0cztcbiAgICB0aGlzLl9zdWJkaXJMaXN0ID0gW107XG4gIH1cblxuICBwdWJsaWMgc3RhdGljIGNyZWF0ZSgpIHtcbiAgICByZXR1cm4gT2JqZWN0LnNlYWwobmV3IFByb2plY3RDb250ZXh0KTtcbiAgfVxuXG4gIHB1YmxpYyBnZXQgVEFSR0VUUygpIHtcbiAgICByZXR1cm4gdGhpc1tUQVJHRVRTXTtcbiAgfVxuXG4gIHB1YmxpYyBnZXQgQ0FDSEUoKSB7XG4gICAgcmV0dXJuIHRoaXNbQ0FDSEVdO1xuICB9XG5cbiAgcHVibGljIHJlZ2lzdGVyVmFyaWFibGVNYXAobmFtZTogc3RyaW5nLCB2YXJpYWJsZU1hcDogVmFyaWFibGVNYXApIHtcbiAgICBpZiAodGhpcy5fcHJvY2Vzc2VkVmFyaWFibGVNYXBbbmFtZV0pXG4gICAgICB0aHJvdyBuZXcgRXJyb3IoYFN5c3RlbVZhcmlhYmxlcyBleGlzdHMgZm9yICR7bmFtZX1gKTtcbiAgICB0aGlzLl9wcm9jZXNzZWRWYXJpYWJsZU1hcFtuYW1lXSA9IHZhcmlhYmxlTWFwO1xuICB9XG5cbiAgcHVibGljIHJlc29sdmVTdWJkaXJlY3RvcnkocGF0aDogQWJzb2x1dGVQYXRoIHwgc3RyaW5nKTogQWJzb2x1dGVQYXRoIHwgc3RyaW5nIHwgdW5kZWZpbmVkIHtcbiAgICBjb25zdCByZXNvbHZlZFBhdGggPSB0aGlzLl9zdWJkaXJBbGlhc1twYXRoLnRvU3RyaW5nKCldO1xuICAgIGlmIChyZXNvbHZlZFBhdGggPT09IHVuZGVmaW5lZClcbiAgICAgIHJldHVybiBwYXRoO1xuICAgIGlmIChyZXNvbHZlZFBhdGggPT09IG51bGwpXG4gICAgICByZXR1cm4gdW5kZWZpbmVkO1xuICAgIHJldHVybiByZXNvbHZlZFBhdGg7XG4gIH1cblxuICBwdWJsaWMgYWRkU3ViZGlyZWN0b3J5QWxpYXModmFyaWFibGVNYXA6IFZhcmlhYmxlTWFwLCBzcmM6IGFueSwgZGVzdDogYW55KSB7XG4gICAgY29uc3Qgc3JjUGF0aCA9IEFic29sdXRlUGF0aC5jcmVhdGUoU2NvcGVIZWxwZXIuZ2V0KHZhcmlhYmxlTWFwLCBcIlNPVVJDRV9ESVJcIikucmVzb2x2ZShzcmMpKTtcbiAgICBjb25zdCBkZXN0UGF0aCA9IChkZXN0ID09PSBudWxsKSA/IG51bGwgOiBBYnNvbHV0ZVBhdGguY3JlYXRlKFNjb3BlSGVscGVyLmdldCh2YXJpYWJsZU1hcCwgXCJTT1VSQ0VfRElSXCIpLnJlc29sdmUoZGVzdCkpO1xuICAgIGNvbnN0IHNyY1N0ciA9IHNyY1BhdGgudG9TdHJpbmcoKTtcbiAgICBpZiAodGhpcy5fc3ViZGlyQWxpYXMuaGFzT3duUHJvcGVydHkoc3JjU3RyKSlcbiAgICAgIGxvZ2dlci53YXJuKGBPd2VycmlkZSBcIiR7c3JjU3RyfVwiIHN1YmRpcmVjdG9yeSBhbGlhc2ApO1xuICAgIHRoaXMuX3N1YmRpckFsaWFzW3NyY1N0cl0gPSBkZXN0UGF0aDtcbiAgfVxuXG4gIHB1YmxpYyBhZGRDYWNoZVZhcmlhYmxlcyh2YXJpYWJsZXM6IENhY2hlVmFyaWFibGVEZXNjcmlwdG9ycykge1xuICAgIGNvbnN0IGNhY2hlID0gdGhpc1tDQUNIRV07XG4gICAgZm9yIChjb25zdCBba2V5LCBlbnRyeV0gb2YgT2JqZWN0LmVudHJpZXModmFyaWFibGVzKSkge1xuICAgICAgY2FjaGVba2V5XSA9IGVudHJ5O1xuICAgIH1cbiAgfVxuXG4gIHB1YmxpYyBsb2FkQ2FjaGVWYXJpYWJsZXMoZmlsZW5hbWU6IEFic29sdXRlUGF0aCB8IHN0cmluZykge1xuICAgIGlmIChmaWxlRXhpc3RzU3luYyhmaWxlbmFtZS50b1N0cmluZygpKSkge1xuICAgICAgY29uc3QgdmFyaWFibGVzID0gcmVxdWlyZVN5bmMoZmlsZW5hbWUudG9TdHJpbmcoKSk7XG4gICAgICB0aGlzLmFkZENhY2hlVmFyaWFibGVzKHZhcmlhYmxlcyk7XG4gICAgfVxuICB9XG5cbiAgcHVibGljIGNvcHlDYWNoZVZhcmlhYmxlcyhzY29wZTogYW55KSB7XG4gICAgZm9yIChjb25zdCBbbmFtZSwgZW50cnldIG9mIE9iamVjdC5lbnRyaWVzKHRoaXNbQ0FDSEVdKSkge1xuICAgICAgaWYgKCFPYmplY3QuaGFzT3duKHNjb3BlLCBuYW1lKSkge1xuICAgICAgICBjb25zdCB0eXBlID0gZW50cnkudHlwZSB8fCB0eXBlb2YgZW50cnkudmFsdWU7XG4gICAgICAgIGNvbnN0IGRlc2NyaXB0aW9uID0gZW50cnkuZGVzY3JpcHRpb24gfHwgXCJcIjtcbiAgICAgICAgbGV0IHZhbHVlID0gQXJyYXkuaXNBcnJheShlbnRyeS52YWx1ZSkgPyBbIC4uLmVudHJ5LnZhbHVlIF0gOiBlbnRyeS52YWx1ZTsgIFxuICAgICAgICBjb25zdCBuYW1lU3ltYm9sID0gU3ltYm9sKG5hbWUpO1xuICAgICAgICBzY29wZVtuYW1lU3ltYm9sXSA9IGVuc3VyZVZhbHVlQnlUeXBlKHR5cGUsIHZhbHVlKTtcbiAgXG4gICAgICAgIE9iamVjdC5kZWZpbmVQcm9wZXJ0eShzY29wZSwgbmFtZSwge1xuICAgICAgICAgIGVudW1lcmFibGU6IHRydWUsXG4gICAgICAgICAgZ2V0KCkge1xuICAgICAgICAgICAgcmV0dXJuIHRoaXNbbmFtZVN5bWJvbF07XG4gICAgICAgICAgfSxcbiAgICAgICAgICBzZXQodmFsdWUpIHtcbiAgICAgICAgICAgIHRoaXNbbmFtZVN5bWJvbF0gPSBlbnN1cmVWYWx1ZUJ5VHlwZSh0eXBlLCB2YWx1ZSk7XG4gICAgICAgICAgfSxcbiAgICAgICAgfSk7XG4gICAgICB9XG4gICAgfVxuICB9XG5cbiAgcHVibGljIGV4ZWN1dGVTY3JpcHRTeW5jKHZhcmlhYmxlTWFwOiBWYXJpYWJsZU1hcCwgc2NyaXB0OiBhbnksIHBhcmFtczogYW55KSB7XG4gICAgY29uc3QgbmV3VmFyaWFibGVNYXAgPSBTY29wZUhlbHBlci5jbG9uZVZhcmlhYmxlTWFwKHZhcmlhYmxlTWFwKTtcbiAgICBwYXJhbXMgJiYgU2NvcGVIZWxwZXIuZXh0ZW5kVmFyaWFibGVNYXBCeVZhbHVlcyhuZXdWYXJpYWJsZU1hcCwgXCJcIiwgcGFyYW1zKTtcbiAgICBjb25zdCBzY3JpcHRQYXRoID0gU2NvcGVIZWxwZXIuZ2V0KG5ld1ZhcmlhYmxlTWFwLCBcIlNPVVJDRV9ESVJcIikucmVzb2x2ZShzY3JpcHQpO1xuICAgIGNvbnN0IGZ1bmMgPSByZXF1aXJlU3luYyhzY3JpcHRQYXRoLnRvU3RyaW5nKCkpO1xuICAgIGNvbnN0IG1rID0gU2NyaXB0Q29udGV4dC5jcmVhdGUobmV3VmFyaWFibGVNYXApO1xuICAgIGZ1bmMobWspO1xuICB9XG5cbiAgcHVibGljIHdyaXRlQ2FjaGVWYXJpYWJsZXMoZmlsZW5hbWU6IHN0cmluZykge1xuICAgIGNvbnN0IGpzb24gPSBKU09OLnN0cmluZ2lmeSh0aGlzW0NBQ0hFXSwgbnVsbCwgMik7XG4gICAgZnMud3JpdGVGaWxlU3luYyhmaWxlbmFtZSwganNvbiwgXCJ1dGYtOFwiKTtcbiAgfVxuXG4gIHB1YmxpYyBhc3luYyBwcmVwZWFyU2NyaXB0RmlsZSh2YXJpYWJsZU1hcDogVmFyaWFibGVNYXApOiBQcm9taXNlPGJvb2xlYW4+IHtcbiAgICBjb25zdCBvcmlnaW5Tb3VyY2VEaXIgPSBTY29wZUhlbHBlci5nZXQodmFyaWFibGVNYXAsIFwiU09VUkNFX0RJUlwiKS50b1N0cmluZygpO1xuICAgIGNvbnN0IHJlc29sdmVTb3VyY2VEaXIgPSB0aGlzLnJlc29sdmVTdWJkaXJlY3Rvcnkob3JpZ2luU291cmNlRGlyKTtcbiAgICBpZiAoIXJlc29sdmVTb3VyY2VEaXIpIHtcbiAgICAgIGxvZ2dlci5pbmZvKGBTb3VyY2UgZGlyIFwiJHtvcmlnaW5Tb3VyY2VEaXJ9XCIgd2FzIGRpc2FibGVkYCk7XG4gICAgICByZXR1cm4gZmFsc2U7XG4gICAgfVxuICAgIFNjb3BlSGVscGVyLnNldCh2YXJpYWJsZU1hcCwgXCJTT1VSQ0VfRElSXCIsIHJlc29sdmVTb3VyY2VEaXIpO1xuXG4gICAgaWYgKCFTY29wZUhlbHBlci5nZXQodmFyaWFibGVNYXAsIFwiU0NSSVBUX0ZJTEVcIikpIHtcbiAgICAgIGxldCBzY3JpcHRGaWxlOiBBYnNvbHV0ZVBhdGggfCB1bmRlZmluZWQ7XG4gICAgICBjb25zdCBmaWxlTGlzdCA9IFsgXCIuanNcIiwgXCIubWpzXCIgXS5tYXAoaSA9PiBcIk1ha2VTY3JpcHRcIiArIGkpO1xuICAgICAgZm9yIChjb25zdCBmaWxlbmFtZSBvZiBmaWxlTGlzdCkge1xuICAgICAgICBjb25zdCBpdGVyID0gU2NvcGVIZWxwZXIuZ2V0KHZhcmlhYmxlTWFwLCBcIlNPVVJDRV9ESVJcIikuam9pbihmaWxlbmFtZSk7XG4gICAgICAgIGlmIChhd2FpdCBmaWxlRXhpc3RzKGl0ZXIudG9TdHJpbmcoKSkpIHtcbiAgICAgICAgICBzY3JpcHRGaWxlID0gaXRlcjtcbiAgICAgICAgICBicmVhaztcbiAgICAgICAgfVxuICAgICAgfVxuXG4gICAgICBpZiAoIXNjcmlwdEZpbGUpXG4gICAgICAgIHRocm93IG5ldyBFcnJvcihgVGhlcmUgYXJlIG5vIGZpbGVzICR7ZmlsZUxpc3Quam9pbihcIiwgXCIpfSBpbiBcIiR7U2NvcGVIZWxwZXIuZ2V0KHZhcmlhYmxlTWFwLCBcIlNPVVJDRV9ESVJcIil9XCJgKTtcblxuICAgICAgU2NvcGVIZWxwZXIuc2V0KHZhcmlhYmxlTWFwLCBcIlNDUklQVF9GSUxFXCIsIHNjcmlwdEZpbGUpO1xuICAgICAgU2NvcGVIZWxwZXIuc2V0KHZhcmlhYmxlTWFwLCBcIlNDUklQVF9ESVJcIiwgU2NvcGVIZWxwZXIuZ2V0KHZhcmlhYmxlTWFwLCBcIlNDUklQVF9GSUxFXCIpLmRpcm5hbWUoKSk7XG4gICAgfVxuXG4gICAgdGhpcy5yZWdpc3RlclZhcmlhYmxlTWFwKFNjb3BlSGVscGVyLmdldCh2YXJpYWJsZU1hcCwgXCJTQ1JJUFRfRklMRVwiKS50b1N0cmluZygpLCB2YXJpYWJsZU1hcCk7XG4gICAgcmV0dXJuIHRydWU7XG4gIH1cblxuICBwdWJsaWMgYWRkU3ViZGlyZWN0b3J5KHZhcmlhYmxlTWFwOiBWYXJpYWJsZU1hcCwgc291cmNlRGlyOiBhbnksIGJpbmFyeURpcj86IGFueSkge1xuICAgIGNvbnN0IG5ld1ZhcmlhYmxlTWFwID0gY3JlYXRlVmFyaWFibGVNYXBGb3JEaXJlY3RvcnkodmFyaWFibGVNYXAsIHNvdXJjZURpciwgYmluYXJ5RGlyKTtcbiAgICBpZiAobmV3VmFyaWFibGVNYXApIHtcbiAgICAgIHRoaXMuX3N1YmRpckxpc3QucHVzaChuZXdWYXJpYWJsZU1hcCk7XG4gICAgfVxuICB9XG5cbiAgcHVibGljIGZpbmRTY3JpcHRGdW5jdGlvbihuYW1lOiBzdHJpbmcpOiBGdW5jdGlvbiB8IHVuZGVmaW5lZCB7XG4gICAgcmV0dXJuIHRoaXNbQlVJTFRJTl9TQ1JJUFRTXVtuYW1lXTtcbiAgfVxuXG4gIHB1YmxpYyBhc3luYyBkb1N1YmRpcmVjdG9yeSgpIHtcbiAgICBjb25zdCBjb250ZXh0TGlzdCA9IG5ldyBBcnJheTxMb2NhbE1ha2VDb250ZXh0PigpO1xuXG4gICAgZm9yICg7Oykge1xuICAgICAgY29uc3QgdmFyaWFibGVNYXAgPSB0aGlzLl9zdWJkaXJMaXN0LnNoaWZ0KCk7XG4gICAgICBpZiAoIXZhcmlhYmxlTWFwKVxuICAgICAgICBicmVhaztcblxuICAgICAgaWYgKCFhd2FpdCB0aGlzLnByZXBlYXJTY3JpcHRGaWxlKHZhcmlhYmxlTWFwKSlcbiAgICAgICAgY29udGludWU7XG5cbiAgICAgIGNvbnN0IGN0eCA9IG5ldyBMb2NhbE1ha2VDb250ZXh0KHZhcmlhYmxlTWFwLCB0aGlzKTtcbiAgICAgIGNvbnRleHRMaXN0LnB1c2goY3R4KTtcbiAgICAgIGNvbnN0IG1rID0gVXNlck1ha2VDb250ZXh0LmNyZWF0ZShjdHgsIHZhcmlhYmxlTWFwKTtcblxuICAgICAgY29uc3QgY3dkU2F2ZSA9IHByb2Nlc3MuY3dkKCk7XG4gICAgICBwcm9jZXNzLmNoZGlyKG1rLlNDUklQVF9ESVIudG9TdHJpbmcoKSk7XG4gICAgICBhd2FpdCBwZXJmb3JtQ29udGV4dChtayk7XG4gICAgICBwcm9jZXNzLmNoZGlyKGN3ZFNhdmUpO1xuICAgIH1cblxuICAgIGZvciAoY29uc3QgY3R4IG9mIGNvbnRleHRMaXN0KSB7XG4gICAgICBmb3IgKGNvbnN0IFtuYW1lLCB0YXJnZXRdIG9mIGN0eC50YXJnZXRzKVxuICAgICAgICB0aGlzW1RBUkdFVFNdLnNldChuYW1lLCB0YXJnZXQpO1xuICAgICAgZm9yIChjb25zdCBpdGVyIG9mIGN0eC5zY3JpcHRDb2xsZWN0aW9uLkVOVFJJRVMpXG4gICAgICAgIHRoaXNbQ1VTVE9NX1NDUklQVFNdLmFkZChpdGVyLCBpdGVyLk5BTUUpO1xuICAgICAgdGhpcy5faW5zdGFsbExpc3QucHVzaCguLi5jdHguaW5zdGFsbExpc3QpO1xuICAgIH1cblxuICAgIGZvciAoY29uc3QgY3R4IG9mIGNvbnRleHRMaXN0KSB7XG4gICAgICBmb3IgKGNvbnN0IFtuYW1lLCBwb3N0VGFyZ2V0XSBvZiBjdHgucG9zdFRhcmdldHMpIHtcbiAgICAgICAgY29uc3QgdGFyZ2V0ID0gdGhpc1tUQVJHRVRTXS5nZXQobmFtZSk7XG4gICAgICAgIGlmICghdGFyZ2V0KVxuICAgICAgICAgIHRocm93IG5ldyBFcnJvcihgVGhlcmUgaXMgbm8gVGFyZ2V0IG5hbWVkICR7bmFtZX1gKTtcbiAgICAgICAgdGFyZ2V0LnBvc3RVcGRhdGUocG9zdFRhcmdldCk7XG4gICAgICB9XG4gICAgICBmb3IgKGNvbnN0IFtuYW1lLCBwb3N0U2NyaXB0XSBvZiBjdHgucG9zdFNjcmlwdHMpIHtcbiAgICAgICAgY29uc3Qgc2NyaXB0ID0gdGhpc1tDVVNUT01fU0NSSVBUU10uZ2V0KG5hbWUpO1xuICAgICAgICBpZiAoIXNjcmlwdClcbiAgICAgICAgICB0aHJvdyBuZXcgRXJyb3IoYFRoZXJlIGlzIG5vIEN1c3RvbVNjcmlwdCBuYW1lZCAke25hbWV9YCk7XG4gICAgICAgIHNjcmlwdC5wb3N0VXBkYXRlKHBvc3RTY3JpcHQpO1xuICAgICAgfVxuICAgIH1cbiAgfVxuXG4gIHB1YmxpYyBjcmVhdGVHb2FscyhzY29wZTogU3lzdGVtU2NvcGUpOiBHb2FsQ29sbGVjdGlvbiB7XG4gICAgY29uc3QgZ29hbExpc3QgPSBuZXcgR29hbENvbGxlY3Rpb247XG4gICAgZm9yIChjb25zdCBzY3JpcHQgb2YgdGhpc1tDVVNUT01fU0NSSVBUU10uRU5UUklFUykgeyAgIFxuICAgICAgY29uc3QgZGVwZW5kcyA9IFtdO1xuXG4gICAgICBsZXQgc2NyaXB0T2JqOiBBYnNvbHV0ZVBhdGggfCBGdW5jdGlvbjtcbiAgICAgIGlmICh0eXBlb2Ygc2NyaXB0LnNjcmlwdE1vZHVsZSA9PT0gXCJzdHJpbmdcIikge1xuICAgICAgICBjb25zdCBmdW5jID0gdGhpcy5maW5kU2NyaXB0RnVuY3Rpb24oc2NyaXB0LnNjcmlwdE1vZHVsZSk7XG4gICAgICAgIHNjcmlwdE9iaiA9IGZ1bmMgPyBmdW5jIDogc2NyaXB0LnNvdXJjZURpci5yZXNvbHZlKHNjcmlwdC5zY3JpcHRNb2R1bGUpO1xuICAgICAgfVxuICAgICAgZWxzZSB7XG4gICAgICAgIGRlcGVuZHMucHVzaChzY3JpcHQuc2NyaXB0TW9kdWxlLnRvUGF0aCgpKTtcbiAgICAgICAgc2NyaXB0T2JqID0gc2NyaXB0LnNjcmlwdE1vZHVsZTtcbiAgICAgIH1cblxuICAgICAgaWYgKHNjcmlwdC5JTlBVVCkge1xuICAgICAgICBkZXBlbmRzLnB1c2goc2NyaXB0LklOUFVULnRvUGF0aCgpKTtcbiAgICAgIH1cblxuICAgICAgY29uc3QgbXNnID0gXCJcXHgxYlszNm1cIiArIFwiR2VuZXJhdGluZyBcIiArIHNjcmlwdC5iaW5hcnlEaXIucmVsYXRpdmUoc2NyaXB0Lk9VVFBVVCkgKyBcIlxceDFiWzBtXCI7XG4gICAgICBjb25zdCBnZSA9IG5ldyBHb2FsVGFyZ2V0KHNjcmlwdC5OQU1FKTtcbiAgICAgIGdlLm1lc3NhZ2UgPSBtc2c7XG4gICAgICBnZS5vdXRwdXQgPSBzY3JpcHQuT1VUUFVULnRvU3RyaW5nKCk7XG4gICAgICBnZS5hZGREZXBlbmRlbmN5KC4uLmRlcGVuZHMpO1xuICAgICAgZ2UuYWRkVGFzayhuZXcgRXhlY1NjcmlwdFRhc2soc2NyaXB0LnZhcmlhYmxlTWFwLCBzY3JpcHRPYmopKTtcbiAgICAgIGdvYWxMaXN0LmFkZFRhcmdldChnZSk7XG4gICAgfVxuXG4gICAgY29uc3Qgb2JqZWN0RmlsZXMgPSBuZXcgTWFwPFNvdXJjZUZpbGUsIEFic29sdXRlUGF0aD4oKTtcbiAgICBmb3IgKGNvbnN0IHRhcmdldCBvZiB0aGlzW1RBUkdFVFNdLkVOVFJJRVMudmFsdWVzKCkpIHtcbiAgICAgIGZvciAoY29uc3QgaXQgb2YgdGFyZ2V0LmdldFNvdXJjZUZpbGVMaXN0KCkpIHtcbiAgICAgICAgaWYgKCFpdC5MQU5HVUFHRSlcbiAgICAgICAgICBjb250aW51ZTtcbiAgICAgICAgY29uc3QgcmZpbGUxID0gdGFyZ2V0LmJpbmFyeURpci5yZWxhdGl2ZShpdC5GSUxFKTtcbiAgICAgICAgY29uc3QgcmZpbGUyID0gIHRhcmdldC5zb3VyY2VEaXIucmVsYXRpdmUoaXQuRklMRSk7XG4gICAgICAgIGNvbnN0IHJmaWxlID0gKHJmaWxlMi5sZW5ndGggPCByZmlsZTEubGVuZ3RoID8gcmZpbGUyIDogcmZpbGUxKS5yZXBsYWNlKFwiLi4vXCIsIFwiX18vXCIpO1xuICAgICAgICBjb25zdCBvZmlsZSA9ICB0YXJnZXQuYmluYXJ5RGlyLmpvaW4oXCJNYWtlRmlsZXNcIiwgdGFyZ2V0LnRhcmdldE5hbWUgKyBcIi5kaXJcIiwgIHJmaWxlICsgXCIub2JqXCIpO1xuICAgICAgICBvYmplY3RGaWxlcy5zZXQoaXQsIG9maWxlKTtcbiAgICAgIH1cbiAgICB9XG5cbiAgICBmb3IgKGNvbnN0IFtuYW1lLCB0YXJnZXRdIG9mIHRoaXNbVEFSR0VUU10uRU5UUklFUykge1xuICAgICAgY29uc3QgZGVwZW5kcyA9IFtdO1xuICAgICAgZm9yIChjb25zdCBzIG9mIHRhcmdldC5nZXRUYXJnZXRPYmplY3RzTGlzdCgpKSB7XG4gICAgICAgIGNvbnN0IHQgPSB0aGlzW1RBUkdFVFNdLmdldChzLnRhcmdldE5hbWUpO1xuICAgICAgICBmb3IgKGNvbnN0IGYgb2YgdC5nZXRTb3VyY2VGaWxlTGlzdCgpKSB7XG4gICAgICAgICAgY29uc3QgbyA9IG9iamVjdEZpbGVzLmdldChmKTtcbiAgICAgICAgICBvICYmIGRlcGVuZHMucHVzaChvLnRvU3RyaW5nKCkpO1xuICAgICAgICB9XG4gICAgICB9XG4gIFxuICAgICAgY29uc3QgaGVhZGVycyA9IHRoaXNbVEFSR0VUU10uYWxsSGVhZGVyc09mKHRhcmdldCk7XG4gICAgICBmb3IgKGNvbnN0IHMgb2YgdGFyZ2V0LmdldFNvdXJjZUZpbGVMaXN0KCkpIHtcbiAgICAgICAgaWYgKHMuSEVBREVSX0ZJTEVfT05MWSlcbiAgICAgICAgICBjb250aW51ZTtcblxuICAgICAgICBjb25zdCBvID0gb2JqZWN0RmlsZXMuZ2V0KHMpO1xuICAgICAgICBpZiAoIW8pXG4gICAgICAgICAgdGhyb3cgbmV3IEVycm9yKGBPQkpFQ1RfRklMRSBpcyBudWxsYCk7XG5cbiAgICAgICAgZnMubWtkaXJTeW5jKG8uZGlybmFtZSgpLnRvU3RyaW5nKCksIHsgcmVjdXJzaXZlOiB0cnVlIH0pO1xuICBcbiAgICAgICAgY29uc3QgcmVsYXRpdmVPYmplY3QgPSB0YXJnZXQuYmluYXJ5RGlyLnJlbGF0aXZlKG8pO1xuICAgICAgICBjb25zdCByZWxhdGl2ZUJpbmFyeURpciA9IHNjb3BlLlBST0pFQ1RfQklOQVJZX0RJUi5yZWxhdGl2ZSh0YXJnZXQuYmluYXJ5RGlyKTtcbiAgICAgICAgY29uc3QgbXNnID0gXCJcXHgxYlszMm1cIiArIGBCdWlsZGluZyAke3MuTEFOR1VBR0V9IG9iamVjdCAke3JlbGF0aXZlQmluYXJ5RGlyfS8ke3JlbGF0aXZlT2JqZWN0fWAgKyBcIlxceDFiWzBtXCI7XG4gIFxuICAgICAgICBjb25zdCBkZWZpbml0aW9ucyA9IFtcbiAgICAgICAgICAuLi50aGlzW1RBUkdFVFNdLmFsbERlZmluaXRpb25zT2YodGFyZ2V0KSxcbiAgICAgICAgICAuLi5zLkRFRklORVMsXG4gICAgICAgIF07XG5cbiAgICAgICAgY29uc3QgYXJnczogc3RyaW5nW10gPSBbXTtcbiAgICAgICAgYXJncy5wdXNoKC4uLmRlZmluaXRpb25zLm1hcChpID0+IFwiLURcIiArIGkpKTtcbiAgICAgICAgYXJncy5wdXNoKC4uLnRoaXNbVEFSR0VUU10uYWxsSW5jbHVkZXNPZih0YXJnZXQpLm1hcChpID0+IFwiLUlcIiArIGkpKTtcbiAgICAgICAgYXJncy5wdXNoKC4uLnRoaXNbVEFSR0VUU10uYWxsQ29tcGlsZU9wdGlvbnNPZih0YXJnZXQpKTtcbiAgICAgICAgaWYgKHRhcmdldC5wb3NpdGlvbkluZGVwZW5kZW50Q29kZSlcbiAgICAgICAgICBhcmdzLnB1c2goXCItZlBJQ1wiKTtcbiAgICAgICAgYXJncy5wdXNoKC4uLnMuQ09NUElMRV9GTEFHUy5mbGF0KCkpO1xuICAgICAgICBhcmdzLnB1c2goXCItb1wiLCByZWxhdGl2ZU9iamVjdCk7XG4gICAgICAgIGFyZ3MucHVzaChcIi1jXCIsIHMuRklMRS50b1N0cmluZygpKTtcbiAgXG4gICAgICAgIGNvbnN0IGNvbW1hbmQgPSAodGFyZ2V0LlRBUkdFVF9TQ09QRSBhcyBhbnkpW3MuTEFOR1VBR0UgKyBcIl9DT01QSUxFUlwiXS50b1N0cmluZygpO1xuICAgICAgICBjb25zdCBvdXRwdXQgPSBBYnNvbHV0ZVBhdGguY3JlYXRlKHRhcmdldC5iaW5hcnlEaXIuam9pbihyZWxhdGl2ZU9iamVjdCkpO1xuICAgICAgICBkZXBlbmRzLnB1c2gob3V0cHV0LnRvU3RyaW5nKCkpO1xuXG4gICAgICAgIGNvbnN0IGdlID0gbmV3IEdvYWxUYXJnZXQ7XG4gICAgICAgIGdlLm1lc3NhZ2UgPSBtc2c7XG4gICAgICAgIGdlLm91dHB1dCA9IG91dHB1dC50b1N0cmluZygpO1xuICAgICAgICBnZS5hZGREZXBlbmRlbmN5KC4uLmhlYWRlcnMpO1xuICAgICAgICBnZS5hZGREZXBlbmRlbmN5KHMuRklMRS50b1BhdGgoKSk7XG4gICAgICAgIGdlLmFkZFRhc2sobmV3IFNwYXduU3luY1Rhc2soY29tbWFuZCwgYXJncywgdGFyZ2V0LmJpbmFyeURpci50b1BhdGgoKSkpO1xuICAgICAgICBnb2FsTGlzdC5hZGRUYXJnZXQoZ2UpO1xuICAgICAgfVxuXG4gICAgICBjb25zdCBnZW5lcmFsR29hbCA9IG5ldyBHb2FsVGFyZ2V0O1xuICAgICAgZm9yIChjb25zdCBwYXJhbXMgb2YgdGFyZ2V0LnByZUJ1aWxkTGlzdCkge1xuICAgICAgICBjb25zdCBleGVjU3RydWN0ID0gcmVzb2x2ZVRhcmdldENvbW1hbmQodGhpcywgcGFyYW1zKTtcbiAgICAgICAgZ2VuZXJhbEdvYWwuYWRkVGFzayhuZXcgU3Bhd25TeW5jVGFzayhleGVjU3RydWN0LmNvbW1hbmQsIGV4ZWNTdHJ1Y3QuYXJncywgdGFyZ2V0LmJpbmFyeURpci50b1N0cmluZygpKSk7XG4gICAgICB9XG5cbiAgICAgIGNvbnN0IGxpbmtPcHRpb25zID0gdGhpc1tUQVJHRVRTXS5hbGxMaW5rT3B0aW9uc09mKHRhcmdldCk7XG4gICAgICBpZiAodGFyZ2V0IGluc3RhbmNlb2YgT2JqZWN0TGlicmFyeSkge1xuICAgICAgICBjb25zdCBvYmpzID0gZGVwZW5kcy5maWx0ZXIoaSA9PiBpLmVuZHNXaXRoKFwiLm9cIikgfHwgaS5lbmRzV2l0aChcIi5vYmpcIikpLm1hcChpID0+IHRhcmdldC5nZXRGaWxlRGlyKCkucmVsYXRpdmUoaSkpO1xuICAgICAgICBpZiAob2Jqcy5sZW5ndGgpIHtcbiAgICAgICAgICBjb25zdCBhcmdzID0gW1xuICAgICAgICAgICAgLi4ubGlua09wdGlvbnMsXG4gICAgICAgICAgICBcIi1yXCIsXG4gICAgICAgICAgICBcIi1vXCIsIHRhcmdldC5nZXRGaWxlTmFtZSgpLFxuICAgICAgICAgICAgLi4ub2Jqc1xuICAgICAgICAgIF07XG4gICAgICAgICAgZ2VuZXJhbEdvYWwubWVzc2FnZSA9IGBMaW5raW5nIENYWCBvYmplY3QgbGlicmFyeSAke3RhcmdldC5nZXRGaWxlTmFtZSgpfWA7XG4gICAgICAgICAgZ2VuZXJhbEdvYWwub3V0cHV0ID0gdGFyZ2V0LmdldEZpbGUoKS50b1N0cmluZygpO1xuICAgICAgICAgIGdlbmVyYWxHb2FsLmFkZERlcGVuZGVuY3koLi4uZGVwZW5kcyk7XG4gICAgICAgICAgZ2VuZXJhbEdvYWwuYWRkVGFzayhuZXcgU3Bhd25TeW5jVGFzayhzY29wZS5MSU5LRVIsIGFyZ3MsIHRhcmdldC5nZXRGaWxlRGlyKCkudG9TdHJpbmcoKSkpO1xuICAgICAgICB9XG4gICAgICAgIGVsc2Uge1xuICAgICAgICAgIGxvZ2dlci5pbmZvKGBObyBvYmplY3RzIGZvciBcIiR7dGFyZ2V0LnRhcmdldE5hbWV9XCJgKTtcbiAgICAgICAgfVxuICAgICAgfVxuICBcbiAgICAgIGlmICh0YXJnZXQgaW5zdGFuY2VvZiBTdGF0aWNMaWJyYXJ5KSB7XG4gICAgICAgIGNvbnN0IG9ianMgPSBkZXBlbmRzLmZpbHRlcihpID0+IGkuZW5kc1dpdGgoXCIub1wiKSB8fCBpLmVuZHNXaXRoKFwiLm9ialwiKSkubWFwKGkgPT4gdGFyZ2V0LmdldEZpbGVEaXIoKS5yZWxhdGl2ZShpKSk7XG4gICAgICAgIGlmIChvYmpzLmxlbmd0aCkge1xuICAgICAgICAgIGNvbnN0IGFyZ3MgPSBbIFwicmNcIiwgdGFyZ2V0LmdldEZpbGVOYW1lKCkgLCAuLi5vYmpzIF07XG4gICAgICAgICAgZ2VuZXJhbEdvYWwubWVzc2FnZSA9IGBMaW5raW5nIENYWCBzdGF0aWMgbGlicmFyeSAke3RhcmdldC5nZXRGaWxlTmFtZSgpfWA7XG4gICAgICAgICAgZ2VuZXJhbEdvYWwub3V0cHV0ID0gdGFyZ2V0LmdldEZpbGUoKS50b1N0cmluZygpO1xuICAgICAgICAgIGdlbmVyYWxHb2FsLmFkZERlcGVuZGVuY3koLi4uZGVwZW5kcyk7XG4gICAgICAgICAgZ2VuZXJhbEdvYWwuYWRkVGFzayhuZXcgU3Bhd25TeW5jVGFzayhzY29wZS5BUiwgYXJncywgdGFyZ2V0LmdldEZpbGVEaXIoKS50b1N0cmluZygpKSk7XG4gICAgICAgIH1cbiAgICAgICAgZWxzZSB7XG4gICAgICAgICAgbG9nZ2VyLmluZm8oYE5vIG9iamVjdHMgZm9yIFwiJHt0YXJnZXQudGFyZ2V0TmFtZX1cImApO1xuICAgICAgICB9XG4gICAgICB9XG4gIFxuICAgICAgaWYgKHRhcmdldCBpbnN0YW5jZW9mIFNoYXJlZExpYnJhcnkpIHtcbiAgICAgICAgdGhyb3cgbmV3IEVycm9yKFwiTm90IGltcGxlbWVudGVkXCIpO1xuICAgICAgfVxuXG4gICAgICBpZiAodGFyZ2V0IGluc3RhbmNlb2YgRXhlY3V0YWJsZSkge1xuICAgICAgICBjb25zdCBvYmpzID0gZGVwZW5kcy5maWx0ZXIoaSA9PiBpLmVuZHNXaXRoKFwiLm9cIikgfHwgaS5lbmRzV2l0aChcIi5vYmpcIikpLm1hcChpID0+IHRhcmdldC5nZXRGaWxlRGlyKCkucmVsYXRpdmUoaSkpO1xuICAgICAgICBpZiAob2Jqcy5sZW5ndGgpIHtcbiAgICAgICAgICBjb25zdCBsaWJzID0gdGhpc1tUQVJHRVRTXS5hbGxMaWJyYXJpZXNPZih0YXJnZXQpO1xuICAgICAgICAgIGNvbnN0IGFyZ3MgPSBbXG4gICAgICAgICAgICAuLi50YXJnZXQuVEFSR0VUX1NDT1BFLkNYWF9GTEFHUyxcbiAgICAgICAgICAgIC4uLmxpbmtPcHRpb25zLFxuICAgICAgICAgICAgLi4ub2JqcyxcbiAgICAgICAgICAgIFwiLW9cIiwgdGFyZ2V0LmdldEZpbGVOYW1lKCksXG4gICAgICAgICAgICAuLi5saWJzLm1hcChpID0+IHRhcmdldC5nZXRGaWxlRGlyKCkucmVsYXRpdmUoaSkpLFxuICAgICAgICAgIF07XG5cbiAgICAgICAgICBnZW5lcmFsR29hbC5tZXNzYWdlID0gYExpbmtpbmcgQ1hYIGV4ZWN1dGFibGUgJHt0YXJnZXQuZ2V0RmlsZU5hbWUoKX1gO1xuICAgICAgICAgIGdlbmVyYWxHb2FsLm91dHB1dCA9IHRhcmdldC5nZXRGaWxlKCkudG9TdHJpbmcoKTtcbiAgICAgICAgICBnZW5lcmFsR29hbC5hZGREZXBlbmRlbmN5KC4uLmRlcGVuZHMpO1xuICAgICAgICAgIGdlbmVyYWxHb2FsLmFkZERlcGVuZGVuY3koLi4ubGlicyk7XG4gICAgICAgICAgZ2VuZXJhbEdvYWwuYWRkVGFzayhuZXcgU3Bhd25TeW5jVGFzayhzY29wZS5DWFhfQ09NUElMRVIsIGFyZ3MsIHRhcmdldC5nZXRGaWxlRGlyKCkudG9TdHJpbmcoKSkpO1xuICAgICAgICB9XG4gICAgICAgIGVsc2Uge1xuICAgICAgICAgIGxvZ2dlci5pbmZvKGBObyBvYmplY3RzIGZvciBcIiR7dGFyZ2V0LnRhcmdldE5hbWV9XCJgKTtcbiAgICAgICAgfVxuICAgICAgfVxuXG4gICAgICBmb3IgKGNvbnN0IHBhcmFtcyBvZiB0YXJnZXQucG9zdEJ1aWxkTGlzdCkge1xuICAgICAgICBjb25zdCBleGVjU3RydWN0ID0gcmVzb2x2ZVRhcmdldENvbW1hbmQodGhpcywgcGFyYW1zKTtcbiAgICAgICAgZ2VuZXJhbEdvYWwuYWRkVGFzayhuZXcgU3Bhd25TeW5jVGFzayhleGVjU3RydWN0LmNvbW1hbmQsIGV4ZWNTdHJ1Y3QuYXJncywgdGFyZ2V0LmJpbmFyeURpci50b1N0cmluZygpKSk7XG4gICAgICB9XG4gICAgICBcbiAgICAgIGdvYWxMaXN0LmFkZFRhcmdldChnZW5lcmFsR29hbCk7XG5cbiAgICAgIGNvbnN0IHdvcmtlciA9IG5ldyBHb2FsVGFyZ2V0KG5hbWUpO1xuICAgICAgd29ya2VyLm1lc3NhZ2UgPSBgQnVpbHQgdGFyZ2V0ICR7bmFtZX1gO1xuICAgICAgd29ya2VyLmFkZERlcGVuZGVuY3kodGFyZ2V0LmdldEZpbGUoKS50b1BhdGgoKSk7XG4gICAgICBnb2FsTGlzdC5hZGRUYXJnZXQod29ya2VyKTtcbiAgICB9XG5cbiAgICBpZiAodGhpcy5faW5zdGFsbExpc3QubGVuZ3RoKSB7XG4gICAgICBjb25zdCB3b3JrZXIgPSBuZXcgR29hbFRhcmdldChJTlNUQUxMX1RBUkdFVCk7XG4gICAgICBjb25zdCBmaWxlSW5zdGFsbGF0aW9uVGFzayA9IG5ldyBGaWxlSW5zdGFsbGF0aW9uVGFzaztcbiAgICAgIGZvciAoY29uc3QgaXRlciBvZiB0aGlzLl9pbnN0YWxsTGlzdCkge1xuICAgICAgICBsZXQgc3JjOiBBYnNvbHV0ZVBhdGgsIGRlc3Q6IEFic29sdXRlUGF0aDtcbiAgICAgICAgaWYgKGl0ZXIuVkFMVUUgaW5zdGFuY2VvZiBBYnNvbHV0ZVBhdGgpIHtcbiAgICAgICAgICBpZiAoc2NvcGUuUFJFVkVOVF9JTlNUQUxMX0ZJTEVTKVxuICAgICAgICAgICAgY29udGludWU7XG4gICAgICAgICAgc3JjID0gaXRlci5WQUxVRTtcbiAgICAgICAgICBjb25zdCByZmlsZSA9IChpdGVyLkJBU0VfRElSIGFzIGFueSkucmVsYXRpdmUoaXRlci5WQUxVRSk7XG4gICAgICAgICAgZGVzdCA9IGl0ZXIuREVTVElOQVRJT04uam9pbihyZmlsZSk7XG4gICAgICAgIH1cbiAgICAgICAgZWxzZSBpZiAoaXRlci5WQUxVRSBpbnN0YW5jZW9mIFRhcmdldE5hbWUpIHtcbiAgICAgICAgICBjb25zdCB0YXJnZXROYW1lID0gaXRlci5WQUxVRS50YXJnZXROYW1lO1xuICAgICAgICAgIGNvbnN0IHRhcmdldCA9IHRoaXNbVEFSR0VUU10uZ2V0KHRhcmdldE5hbWUpO1xuICAgICAgICAgIHNyYyA9IHRhcmdldC5nZXRGaWxlKCk7XG4gICAgICAgICAgZGVzdCA9IGl0ZXIuREVTVElOQVRJT04uam9pbih0YXJnZXQuZ2V0RmlsZU5hbWUoKSk7XG4gICAgICAgIH1cbiAgICAgICAgZWxzZSB7XG4gICAgICAgICAgdGhyb3cgbmV3IEVycm9yKGBDYW4gbm90IGluc3RhbGwgJHtpdGVyLlZBTFVFfWApXG4gICAgICAgIH1cbiAgICAgICAgaWYgKHNjb3BlLkRFU1RESVIpXG4gICAgICAgICAgZGVzdCA9IHNjb3BlLkRFU1RESVIuam9pbihkZXN0KTtcbiAgICAgICAgd29ya2VyLmFkZERlcGVuZGVuY3koc3JjLnRvUGF0aCgpKTtcbiAgICAgICAgZmlsZUluc3RhbGxhdGlvblRhc2suYWRkKHNyYywgZGVzdCk7XG4gICAgICB9XG4gICAgICB3b3JrZXIuYWRkVGFzayhmaWxlSW5zdGFsbGF0aW9uVGFzayk7XG4gICAgICBnb2FsTGlzdC5hZGRUYXJnZXQod29ya2VyKTtcbiAgICB9XG5cbiAgICBjb25zdCBnZSA9IG5ldyBHb2FsVGFyZ2V0KEFMTF9UQVJHRVQpO1xuICAgIE9iamVjdC5rZXlzKHRoaXNbVEFSR0VUU10uRU5UUklFUykuZm9yRWFjaChpID0+IHZvaWQgZ2UuYWRkRGVwZW5kZW5jeShpKSlcbiAgICBnb2FsTGlzdC5hZGRUYXJnZXQoZ2UpO1xuICBcbiAgICByZXR1cm4gZ29hbExpc3Q7XG4gIH1cblxuICBwdWJsaWMgdG9KU09OKCkge1xuICAgIHJldHVybiB7XG4gICAgICBUQVJHRVRTOiB0aGlzLlRBUkdFVFMsXG4gICAgICBDVVNUT01fU0NSSVBUUzogdGhpc1tDVVNUT01fU0NSSVBUU10sXG4gICAgICBDQUNIRTogdGhpcy5DQUNIRSxcbiAgICAgIGluc3RhbGxMaXN0OiB0aGlzLl9pbnN0YWxsTGlzdCxcbiAgICAgIHByb2Nlc3NlZFZhcmlhYmxlTWFwOiB0aGlzLl9wcm9jZXNzZWRWYXJpYWJsZU1hcCxcbiAgICAgIHN1YmRpckFsaWFzOiB0aGlzLl9zdWJkaXJBbGlhcyxcbiAgICB9O1xuICB9XG59O1xuIiwiLypcbiAqIE1JVCBMaWNlbnNlXG4gKlxuICogQ29weXJpZ2h0IChjKSAyMDI1ICBZdXJpaSBZYWt1YmluICh5dXJpaS55YWt1YmluQGdtYWlsLmNvbSlcbiAqXG4gKiBQZXJtaXNzaW9uIGlzIGdyYW50ZWQgdG8gdXNlLCBjb3B5LCBtb2RpZnksIGFuZCBkaXN0cmlidXRlIHRoaXMgc29mdHdhcmVcbiAqIHVuZGVyIHRoZSBNSVQgTGljZW5zZS4gU2VlIExJQ0VOU0UgZmlsZSBmb3IgZGV0YWlscy5cbiAqL1xuXG5pbXBvcnQgeyBBYnNvbHV0ZVBhdGggfSBmcm9tIFwiQC9jb3JlL0Fic29sdXRlUGF0aFwiO1xuaW1wb3J0IHsgZGVlcENvcHkgfSBmcm9tIFwiQC91dGlscy9QcmltaXRpdmVzXCI7XG5cbmludGVyZmFjZSBWYXJpYWJsZURlc2NyaXB0b3Ige1xuICB0eXBlPzogc3RyaW5nIHwgc3RyaW5nW107XG4gIHZhbHVlPzogYW55O1xuICBkZXNjcmlwdGlvbj86IHN0cmluZztcbn07XG5cbmludGVyZmFjZSBWYXJpYWJsZUVudHJ5IHtcbiAgbmFtZTogc3RyaW5nO1xuICB0eXBlOiBzdHJpbmcgfCBzdHJpbmdbXTtcbiAgZ3JvdXA6IHN0cmluZztcbiAgZGVzY3JpcHRpb246IHN0cmluZztcbiAgaW5pdFZhbHVlPzogYW55O1xuICB2YWx1ZT86IGFueTtcbn07XG5cbmV4cG9ydCBpbnRlcmZhY2UgVmFyaWFibGVNYXAge1xuICBbIG5hbWU6IHN0cmluZyBdOiBWYXJpYWJsZUVudHJ5O1xufTtcblxuZXhwb3J0IHR5cGUgVmFyaWFudCA9IGJvb2xlYW4gfCBudW1iZXIgfCBzdHJpbmcgfCBib29sZWFuW10gfCBudW1iZXJbXSB8IHN0cmluZ1tdO1xuZXhwb3J0IHR5cGUgVmFyaWFudE1hcCA9IHtcbiAgWyBuYW1lOiBzdHJpbmcgXTogVmFyaWFudDtcbn07XG5cbmV4cG9ydCBuYW1lc3BhY2UgU2NvcGVIZWxwZXIge1xuXG5mdW5jdGlvbiB0b0Rlc2NyaXB0b3IodmFsdWU6IGFueSk6IFZhcmlhYmxlRGVzY3JpcHRvciB7XG4gIGlmICghdmFsdWUgfHwgdHlwZW9mIHZhbHVlID09PSBcImJvb2xlYW5cIiB8fCB0eXBlb2YgdmFsdWUgPT09IFwibnVtYmVyXCIgfHwgdHlwZW9mIHZhbHVlID09PSBcInN0cmluZ1wiIHx8IEFycmF5LmlzQXJyYXkodmFsdWUpKSB7XG4gICAgcmV0dXJuIHsgdmFsdWUgfTsgXG4gIH1cbiAgcmV0dXJuIHZhbHVlO1xufVxuXG5leHBvcnQgZnVuY3Rpb24gZ2V0RW50cnlWYWx1ZShlbnRyeTogVmFyaWFibGVFbnRyeSk6IGFueSB7XG4gIC8qaWYgKHZhbHVlID09PSB1bmRlZmluZWQpXG4gICAgdGhyb3cgbmV3IEVycm9yKGBWYWx1ZSBvZiAke25hbWV9IGNhbm5vdCBiZSBvYnRhaW5lZCBiZWNhdXNlIGl0IGhhcyBub3QgYmVlbiBlc3RhYmxpc2hlZGApOyovXG4gIHJldHVybiAoZW50cnkudmFsdWUgPT09IHVuZGVmaW5lZCkgPyBlbnRyeS5pbml0VmFsdWUgOiBlbnRyeS52YWx1ZTtcbn1cblxuZXhwb3J0IGZ1bmN0aW9uIGdldCh2YXJpYWJsZU1hcDogVmFyaWFibGVNYXAsIG5hbWU6IHN0cmluZyk6IGFueSB7XG4gIGNvbnN0IGVudHJ5ID0gdmFyaWFibGVNYXBbbmFtZV07XG4gIGlmIChlbnRyeSlcbiAgICByZXR1cm4gZ2V0RW50cnlWYWx1ZShlbnRyeSk7XG59XG5cbmNvbnN0IG1ha2VWYWx1ZU1hcDogYW55ID0ge1xuICBhcnJheTogKHZhbHVlOiBhbnkpID0+IHtcbiAgICByZXR1cm4gQXJyYXkuaXNBcnJheSh2YWx1ZSkgPyBBcnJheS5mcm9tKHZhbHVlKSA6IHVuZGVmaW5lZDtcbiAgfSxcbiAgYm9vbGVhbjogKHZhbHVlOiBhbnkpID0+IHtcbiAgICByZXR1cm4gKHR5cGVvZiB2YWx1ZSA9PT0gXCJib29sZWFuXCIpID8gdmFsdWUgOiB1bmRlZmluZWQ7XG4gIH0sXG4gIG51bWJlcjogKHZhbHVlOiBhbnkpID0+IHtcbiAgICByZXR1cm4gKHR5cGVvZiB2YWx1ZSA9PT0gXCJudW1iZXJcIikgPyB2YWx1ZSA6IHVuZGVmaW5lZDtcbiAgfSxcbiAgc3RyaW5nOiAodmFsdWU6IGFueSkgPT4ge1xuICAgIHJldHVybiAodHlwZW9mIHZhbHVlID09PSBcInN0cmluZ1wiKSA/IHZhbHVlIDogdW5kZWZpbmVkO1xuICB9LFxuICBBYnNvbHV0ZVBhdGg6ICh2YWx1ZTogYW55KSA9PiB7XG4gICAgcmV0dXJuIEFic29sdXRlUGF0aC5jcmVhdGUodmFsdWUpO1xuICB9LFxuICBGaWxlUGF0aDogKHZhbHVlOiBhbnkpID0+IHtcbiAgICByZXR1cm4gQWJzb2x1dGVQYXRoLmNyZWF0ZSh2YWx1ZSk7XG4gIH0sXG4gIERpclBhdGg6ICh2YWx1ZTogYW55KSA9PiB7XG4gICAgcmV0dXJuIEFic29sdXRlUGF0aC5jcmVhdGUodmFsdWUpO1xuICB9LFxuICBvYmplY3Q6ICh2YWx1ZTogYW55KSA9PiB7XG4gICAgcmV0dXJuIHZhbHVlO1xuICB9LFxufTtcblxuY29uc3QgdG9qc29uVmFsdWVNYXA6IGFueSA9IHtcbiAgYXJyYXk6ICh2YWx1ZTogYW55KSA9PiB7XG4gICAgY29uc3QgcmVzdWx0ID0gW107XG4gICAgZm9yIChjb25zdCBpdGVyIG9mIHZhbHVlKSB7XG4gICAgICBpZiAoaXRlciAmJiB0eXBlb2YgaXRlciA9PT0gXCJvYmplY3RcIilcbiAgICAgICAgcmVzdWx0LnB1c2godHlwZW9mIGl0ZXIudG9KU09OID09PSBcImZ1bmN0aW9uXCIgPyBpdGVyLnRvSlNPTigpIDogZGVlcENvcHkoaXRlcikpO1xuICAgICAgZWxzZVxuICAgICAgICByZXN1bHQucHVzaChpdGVyKTtcbiAgICB9XG4gICAgcmV0dXJuIHJlc3VsdDtcbiAgfSxcbiAgYm9vbGVhbjogKHZhbHVlOiBhbnkpID0+IHtcbiAgICByZXR1cm4gdmFsdWU7XG4gIH0sXG4gIG51bWJlcjogKHZhbHVlOiBhbnkpID0+IHtcbiAgICByZXR1cm4gdmFsdWU7XG4gIH0sXG4gIHN0cmluZzogKHZhbHVlOiBhbnkpID0+IHtcbiAgICByZXR1cm4gdmFsdWU7XG4gIH0sXG4gIEFic29sdXRlUGF0aDogKHZhbHVlOiBhbnkpID0+IHtcbiAgICByZXR1cm4gdmFsdWUudG9KU09OKCk7XG4gIH0sXG4gIEZpbGVQYXRoOiAodmFsdWU6IGFueSkgPT4ge1xuICAgIHJldHVybiB2YWx1ZS50b0pTT04oKTtcbiAgfSxcbiAgRGlyUGF0aDogKHZhbHVlOiBhbnkpID0+IHtcbiAgICByZXR1cm4gdmFsdWUudG9KU09OKCk7XG4gIH0sXG4gIG9iamVjdDogKHZhbHVlOiBhbnkpID0+IHtcbiAgICByZXR1cm4gZGVlcENvcHkodmFsdWUpO1xuICB9LFxufTtcblxuZXhwb3J0IGZ1bmN0aW9uIG1ha2VKU09OVmFsdWUoZW50cnk6IFZhcmlhYmxlRW50cnksIHZhbHVlOiBhbnkpOiBhbnkge1xuICBpZiAoQXJyYXkuaXNBcnJheShlbnRyeS50eXBlKSlcbiAgICByZXR1cm4gdmFsdWU7XG4gIGNvbnN0IGZ1bmMgPSB0b2pzb25WYWx1ZU1hcFtlbnRyeS50eXBlXTtcbiAgaWYgKCFmdW5jKVxuICAgIHRocm93IG5ldyBFcnJvcihgVW5rbm93biB0eXBlIFwiJHtlbnRyeS50eXBlfVwiIGZvciAke2VudHJ5Lm5hbWV9YCk7XG4gIHJldHVybiBmdW5jKHZhbHVlKTtcbn1cblxuZXhwb3J0IGZ1bmN0aW9uIG1ha2VFbnRyeVZhbHVlKGVudHJ5OiBWYXJpYWJsZUVudHJ5LCB2YWx1ZTogYW55KTogYW55IHtcbiAgbGV0IG5ld1ZhbHVlOiBhbnk7XG4gIGlmIChBcnJheS5pc0FycmF5KGVudHJ5LnR5cGUpKVxuICAgIG5ld1ZhbHVlID0gZW50cnkudHlwZS5pbmNsdWRlcyh2YWx1ZSkgPyB2YWx1ZSA6IHVuZGVmaW5lZDtcbiAgZWxzZSB7XG4gICAgY29uc3QgZnVuYyA9IG1ha2VWYWx1ZU1hcFtlbnRyeS50eXBlXTtcbiAgICBpZiAoIWZ1bmMpXG4gICAgICB0aHJvdyBuZXcgRXJyb3IoYFVua25vd24gdHlwZSBcIiR7ZW50cnkudHlwZX1cIiBmb3IgJHtlbnRyeS5uYW1lfWApO1xuICAgIG5ld1ZhbHVlID0gZnVuYyh2YWx1ZSk7XG4gIH1cbiAgaWYgKG5ld1ZhbHVlID09PSB1bmRlZmluZWQpXG4gICAgdGhyb3cgbmV3IFR5cGVFcnJvcihgQXR0ZW1wdGluZyB0byBzZXQgXCIke3ZhbHVlfVwiIHRvICR7ZW50cnkubmFtZX0gYXMgYW4gJHtlbnRyeS50eXBlfWApO1xuICByZXR1cm4gbmV3VmFsdWU7XG59XG5cbmV4cG9ydCBmdW5jdGlvbiBjb3B5RW50cnlWYWx1ZShlbnRyeTogVmFyaWFibGVFbnRyeSwgdHJhbnNmb3JtOiAoZW50cnk6IFZhcmlhYmxlRW50cnksIHZhbHVlOiBhbnkpID0+IGFueSkge1xuICBjb25zdCByZXN1bHQ6IFZhcmlhYmxlRW50cnkgPSB7XG4gICAgbmFtZTogZW50cnkubmFtZSxcbiAgICB0eXBlOiBlbnRyeS50eXBlLFxuICAgIGdyb3VwOiBlbnRyeS5ncm91cCxcbiAgICBkZXNjcmlwdGlvbjogZW50cnkuZGVzY3JpcHRpb24sXG4gIH07XG4gIGlmIChlbnRyeS5pbml0VmFsdWUgIT09IHVuZGVmaW5lZClcbiAgICByZXN1bHQuaW5pdFZhbHVlID0gdHJhbnNmb3JtKGVudHJ5LCBlbnRyeS5pbml0VmFsdWUpO1xuICBpZiAoZW50cnkudmFsdWUgIT09IHVuZGVmaW5lZClcbiAgICByZXN1bHQudmFsdWUgPSB0cmFuc2Zvcm0oZW50cnksIGVudHJ5LnZhbHVlKTtcbiAgcmV0dXJuIHJlc3VsdDtcbn1cblxuZXhwb3J0IGZ1bmN0aW9uIGZyb21KU09OKHZhcmlhYmxlTWFwOiBWYXJpYWJsZU1hcCk6IFZhcmlhYmxlTWFwIHtcbiAgY29uc3QgcmVzdWx0OiBWYXJpYWJsZU1hcCA9IHt9O1xuICBmb3IgKGNvbnN0IFtrZXksIHZhbF0gb2YgT2JqZWN0LmVudHJpZXModmFyaWFibGVNYXApKVxuICAgIHJlc3VsdFtrZXldID0gY29weUVudHJ5VmFsdWUodmFsLCBtYWtlRW50cnlWYWx1ZSk7XG4gIHJldHVybiByZXN1bHQ7XG59XG5cbmV4cG9ydCBmdW5jdGlvbiB0b0pTT04odmFyaWFibGVNYXA6IFZhcmlhYmxlTWFwKTogVmFyaWFibGVNYXAge1xuICBjb25zdCByZXN1bHQ6IFZhcmlhYmxlTWFwID0ge307XG4gIGZvciAoY29uc3QgW2tleSwgdmFsXSBvZiBPYmplY3QuZW50cmllcyh2YXJpYWJsZU1hcCkpXG4gICAgcmVzdWx0W2tleV0gPSBjb3B5RW50cnlWYWx1ZSh2YWwsIG1ha2VKU09OVmFsdWUpO1xuICByZXR1cm4gcmVzdWx0O1xufVxuXG5leHBvcnQgZnVuY3Rpb24gc2V0RW50cnlWYWx1ZShlbnRyeTogVmFyaWFibGVFbnRyeSwgdmFsdWU6IGFueSk6IGFueSB7XG4gIGVudHJ5LnZhbHVlID0gbWFrZUVudHJ5VmFsdWUoZW50cnksIHZhbHVlKTtcbn1cblxuZXhwb3J0IGZ1bmN0aW9uIHNldCh2YXJpYWJsZU1hcDogVmFyaWFibGVNYXAsIG5hbWU6IHN0cmluZywgdmFsdWU6IGFueSk6IHZvaWQge1xuICBjb25zdCBlbnRyeSA9IHZhcmlhYmxlTWFwW25hbWVdO1xuICBpZiAoIWVudHJ5KVxuICAgIHRocm93IG5ldyBFcnJvcihgVmFyaWFibGUgXCIke25hbWV9XCIgZG9lcyBub3QgZXhpc3RzYCk7XG4gIHNldEVudHJ5VmFsdWUoZW50cnksIHZhbHVlKTtcbn1cblxuZXhwb3J0IGZ1bmN0aW9uIHJlc2V0KHZhcmlhYmxlTWFwOiBWYXJpYWJsZU1hcCwgbmFtZTogc3RyaW5nKTogdm9pZCB7XG4gIGNvbnN0IGVudHJ5ID0gdmFyaWFibGVNYXBbbmFtZV07XG4gIGlmICghZW50cnkpXG4gICAgdGhyb3cgbmV3IEVycm9yKGBWYXJpYWJsZSBcIiR7bmFtZX1cIiBkb2VzIG5vdCBleGlzdHNgKTtcbiAgZW50cnkudmFsdWUgPSB1bmRlZmluZWQ7XG59XG5cbmV4cG9ydCBmdW5jdGlvbiBkZWZpbmVWYXJpYWJsZShtYXA6IFZhcmlhYmxlTWFwLCBncm91cDogc3RyaW5nLCBuYW1lOiBzdHJpbmcsIGRlc2NyaXB0b3I6IFZhcmlhYmxlRGVzY3JpcHRvcikge1xuICBsZXQgZGVmaW5lRW50cnkgPSBtYXBbbmFtZV07XG4gIGxldCBpc1ZhbGlkVmFsdWUgPSAodmFsdWU6IGFueSkgPT4gdHJ1ZTtcbiAgaWYgKCFkZWZpbmVFbnRyeSkge1xuICAgIGRlZmluZUVudHJ5ID0ge1xuICAgICAgbmFtZSxcbiAgICAgIHR5cGU6IFwiXCIsIGdyb3VwLCB2YWx1ZTogdW5kZWZpbmVkLCAgaW5pdFZhbHVlOiB1bmRlZmluZWQsIGRlc2NyaXB0aW9uOiBcIlwiLFxuICAgIH07XG4gICAgbWFwW25hbWVdID0gZGVmaW5lRW50cnk7XG4gIH1cbiAgZWxzZSBpZiAoZ3JvdXAgIT09IGRlZmluZUVudHJ5Lmdyb3VwKSB7XG4gICAgaWYgKGRlZmluZUVudHJ5Lmdyb3VwKVxuICAgICAgdGhyb3cgbmV3IEVycm9yKGBBdHRlbXB0aW5nIHRvIHJlY3JlYXRlIFwiJHtuYW1lfVwiIHZhcmlhYmxlIHdpdGggXCIke2RlZmluZUVudHJ5Lmdyb3VwfVwiIGdyb3VwIGluIGFub3RoZXIgXCIke2dyb3VwfVwiYCk7XG4gICAgZGVmaW5lRW50cnkuZ3JvdXAgPSBncm91cDtcbiAgfVxuXG4gIGRlZmluZUVudHJ5LnR5cGUgPSBkZXNjcmlwdG9yLnR5cGUgfHwgZGVmaW5lRW50cnkudHlwZTtcbiAgZGVmaW5lRW50cnkuZGVzY3JpcHRpb24gPSBkZXNjcmlwdG9yLmRlc2NyaXB0aW9uIHx8IGRlZmluZUVudHJ5LmRlc2NyaXB0aW9uO1xuXG4gIGxldCB0eXBlOiBzdHJpbmcgfCBzdHJpbmdbXTtcbiAgaWYgKGRlZmluZUVudHJ5LnR5cGUpXG4gICAgdHlwZSA9IGRlZmluZUVudHJ5LnR5cGU7XG4gIGVsc2UgaWYgKEFycmF5LmlzQXJyYXkoZGVzY3JpcHRvci52YWx1ZSkpXG4gICAgdHlwZSA9IFwiYXJyYXlcIjtcbiAgZWxzZSBpZiAoZGVzY3JpcHRvci52YWx1ZSBpbnN0YW5jZW9mIEFic29sdXRlUGF0aClcbiAgICB0eXBlID0gXCJBYnNvbHV0ZVBhdGhcIjtcbiAgZWxzZVxuICAgIHR5cGUgPSB0eXBlb2YgZGVzY3JpcHRvci52YWx1ZTtcblxuICBpZiAoQXJyYXkuaXNBcnJheSh0eXBlKSkge1xuICAgIGNvbnN0IGVudW1MaXN0ID0gdHlwZTtcbiAgICBsZXQgaXRlbVR5cGU7XG4gICAgZm9yIChjb25zdCBpdGVyIG9mIGVudW1MaXN0KSB7XG4gICAgICBjb25zdCBpdCA9IHR5cGVvZiBpdGVyO1xuICAgICAgaWYgKCFpdGVtVHlwZSlcbiAgICAgICAgaXRlbVR5cGUgPSBpdDtcbiAgICAgIGVsc2UgaWYgKGl0ZW1UeXBlICE9PSBpdClcbiAgICAgICAgdGhyb3cgbmV3IEVycm9yKGBBbGwgZWxlbWVudHMgZm9yICR7bmFtZX0gbXVzdCBiZSBvZiB0aGUgc2FtZSB0eXBlYCk7XG4gICAgfVxuICAgIGlmIChpdGVtVHlwZSAhPT0gXCJib29sZWFuXCIgJiYgaXRlbVR5cGUgIT09IFwibnVtYmVyXCIgJiYgaXRlbVR5cGUgIT09IFwic3RyaW5nXCIpXG4gICAgICB0aHJvdyBuZXcgRXJyb3IoYEVudW0gJHtuYW1lfSBub3Qgc3VwcG9ydCAke2l0ZW1UeXBlfSB0eXBlYCk7XG4gICAgaXNWYWxpZFZhbHVlID0gKHZhbHVlOiBhbnkpID0+IGVudW1MaXN0LmluY2x1ZGVzKHZhbHVlKTtcbiAgfVxuICBlbHNlIGlmICh0eXBlID09PSBcImJvb2xlYW5cIikge1xuICAgIGlzVmFsaWRWYWx1ZSA9ICh2YWx1ZTogYW55KSA9PiB0eXBlb2YgdmFsdWUgPT09IFwiYm9vbGVhblwiO1xuICB9XG4gIGVsc2UgaWYgKHR5cGUgPT09IFwibnVtYmVyXCIpIHtcbiAgICBpc1ZhbGlkVmFsdWUgPSAodmFsdWU6IGFueSkgPT4gdHlwZW9mIHZhbHVlID09PSBcIm51bWJlclwiO1xuICB9XG4gIGVsc2UgaWYgKHR5cGUgPT09IFwic3RyaW5nXCIpIHtcbiAgICBpc1ZhbGlkVmFsdWUgPSAodmFsdWU6IGFueSkgPT4gdHlwZW9mIHZhbHVlID09PSBcInN0cmluZ1wiO1xuICB9XG4gIGVsc2UgaWYgKHR5cGUgPT09IFwiYXJyYXlcIikge1xuICAgIGlzVmFsaWRWYWx1ZSA9IEFycmF5LmlzQXJyYXk7XG4gIH1cbiAgZWxzZSBpZiAodHlwZSA9PT0gXCJBYnNvbHV0ZVBhdGhcIiB8fCB0eXBlID09PSBcIkZpbGVQYXRoXCIgfHwgdHlwZSA9PT0gXCJEaXJQYXRoXCIpIHtcbiAgICBpc1ZhbGlkVmFsdWUgPSAodmFsdWU6IGFueSkgPT4gISFBYnNvbHV0ZVBhdGguY3JlYXRlKHZhbHVlKTtcbiAgfVxuICBlbHNlIGlmICh0eXBlICE9PSBcIm9iamVjdFwiICYmIHR5cGUgIT09IFwiZW51bVwiKSB7XG4gICAgdGhyb3cgbmV3IEVycm9yKGBWYXJpYWJsZSBcIiR7bmFtZX1cIiBoYXMgd3JvbmcgXCIke3R5cGV9XCIgdHlwZWApO1xuICB9XG5cbiAgaWYgKGRlc2NyaXB0b3IudmFsdWUgPT09IHVuZGVmaW5lZCkge1xuICAgIGRlZmluZUVudHJ5LmluaXRWYWx1ZSA9ICh0eXBlID09PSBcImFycmF5XCIpID8gW10gOiB1bmRlZmluZWQ7XG4gIH1cbiAgZWxzZSB7XG4gICAgaWYgKCFpc1ZhbGlkVmFsdWUoZGVzY3JpcHRvci52YWx1ZSkpXG4gICAgICAgIHRocm93IG5ldyBUeXBlRXJyb3IoYEF0dGVtcHRpbmcgdG8gc2V0IFwiJHtkZXNjcmlwdG9yLnZhbHVlfVwiIHRvICR7bmFtZX0gYXMgaW5pdFZhbHVlYCk7XG4gICAgZGVmaW5lRW50cnkuaW5pdFZhbHVlID0gKHR5cGUgPT09IFwiYXJyYXlcIikgPyBBcnJheS5mcm9tKGRlc2NyaXB0b3IudmFsdWUpIDogZGVzY3JpcHRvci52YWx1ZTtcbiAgfVxuXG4gIGRlZmluZUVudHJ5LnR5cGUgPSB0eXBlO1xuICBpZiAoZGVmaW5lRW50cnkuaW5pdFZhbHVlICE9PSB1bmRlZmluZWQpIHtcbiAgICBkZWZpbmVFbnRyeS5pbml0VmFsdWUgPSBtYWtlRW50cnlWYWx1ZShkZWZpbmVFbnRyeSwgZGVmaW5lRW50cnkuaW5pdFZhbHVlKTtcbiAgfVxuICBpZiAoZGVmaW5lRW50cnkudmFsdWUgIT09IHVuZGVmaW5lZCkge1xuICAgIGRlZmluZUVudHJ5LnZhbHVlID0gbWFrZUVudHJ5VmFsdWUoZGVmaW5lRW50cnksIGRlZmluZUVudHJ5LnZhbHVlKTtcbiAgfVxufVxuXG5leHBvcnQgZnVuY3Rpb24gY3JlYXRlUHJveHk8VD4obWFwOiBWYXJpYWJsZU1hcCwgbz86IGFueSk6IFQge1xuICBvID0gbyB8fCB7fTtcbiAgY29uc3QgaGFuZGxlcjogUHJveHlIYW5kbGVyPGFueT4gPSB7XG4gICAgZ2V0KHRhcmdldDogVmFyaWFibGVNYXAsIGtleTogc3RyaW5nLCByZWNlaXZlcjogYW55KSB7XG4gICAgICBjb25zdCBlbnRyeSA9IHRhcmdldFtrZXldO1xuICAgICAgaWYgKGVudHJ5KVxuICAgICAgICByZXR1cm4gZ2V0RW50cnlWYWx1ZShlbnRyeSk7XG4gICAgICByZXR1cm4gb1trZXldO1xuICAgIH0sXG4gICAgc2V0KHRhcmdldDogVmFyaWFibGVNYXAsIGtleTogc3RyaW5nLCB2YWx1ZTogYW55KTogYm9vbGVhbiB7XG4gICAgICBjb25zdCBlbnRyeSA9IHRhcmdldFtrZXldO1xuICAgICAgaWYgKGVudHJ5KVxuICAgICAgICBzZXRFbnRyeVZhbHVlKGVudHJ5LCB2YWx1ZSk7XG4gICAgICBlbHNlXG4gICAgICAgIGRlZmluZVZhcmlhYmxlKHRhcmdldCwgXCJcIiwga2V5LCB0b0Rlc2NyaXB0b3IodmFsdWUpKTtcbiAgICAgIHJldHVybiB0cnVlO1xuICAgIH0sXG4gICAgaGFzKHRhcmdldDogVmFyaWFibGVNYXAsIGtleTogc3RyaW5nKSB7XG4gICAgICByZXR1cm4gdGFyZ2V0Lmhhc093blByb3BlcnR5KGtleSkgfHwgKGtleSBpbiB0YXJnZXQpO1xuICAgIH0sXG4gICAgb3duS2V5cyh0YXJnZXQ6IFZhcmlhYmxlTWFwKSB7XG4gICAgICByZXR1cm4gT2JqZWN0LmtleXModGFyZ2V0KTtcbiAgICB9LFxuICAgIGRlbGV0ZVByb3BlcnR5KHRhcmdldDogVmFyaWFibGVNYXAsIGtleTogc3RyaW5nKSB7XG4gICAgICB0aHJvdyBuZXcgRXJyb3IoYENhbm5vdCBkZWxldGUgJHtrZXl9IHZhbHVlYCk7XG4gICAgfSxcbiAgfTtcbiAgcmV0dXJuIG5ldyBQcm94eShtYXAsIGhhbmRsZXIpO1xufVxuXG5leHBvcnQgZnVuY3Rpb24gY2xvbmVWYXJpYWJsZU1hcChtYXA6IFZhcmlhYmxlTWFwKSB7XG4gIGNvbnN0IHJlc3VsdDogVmFyaWFibGVNYXAgPSB7fTtcbiAgZm9yIChjb25zdCBbIG5hbWUsIGVudHJ5IF0gb2YgT2JqZWN0LmVudHJpZXMobWFwKSkge1xuICAgIGRlZmluZVZhcmlhYmxlKHJlc3VsdCwgZW50cnkuZ3JvdXAsIG5hbWUsIHtcbiAgICAgIHR5cGU6IGVudHJ5LnR5cGUsXG4gICAgICBkZXNjcmlwdGlvbjogZW50cnkuZGVzY3JpcHRpb24sXG4gICAgICB2YWx1ZTogZW50cnkuaW5pdFZhbHVlLFxuICAgIH0pO1xuICAgIGlmIChnZXRFbnRyeVZhbHVlKGVudHJ5KSAhPT0gdW5kZWZpbmVkKVxuICAgICAgcmVzdWx0W25hbWVdLnZhbHVlID0gZ2V0RW50cnlWYWx1ZShlbnRyeSk7XG4gIH1cbiAgcmV0dXJuIHJlc3VsdDtcbn1cblxuZXhwb3J0IGZ1bmN0aW9uIGV4dGVuZFZhcmlhYmxlTWFwQnlWYWx1ZXMobWFwOiBWYXJpYWJsZU1hcCwgZ3JvdXA6IHN0cmluZywgdmFsdWVzOiBWYXJpYW50TWFwKSB7XG4gIGZvciAoY29uc3QgW25hbWUsIHZhbHVlXSBvZiBPYmplY3QuZW50cmllcyh2YWx1ZXMpKSB7XG4gICAgZGVmaW5lVmFyaWFibGUobWFwLCBncm91cCwgbmFtZSwgeyB2YWx1ZSB9KTtcbiAgICBtYXBbbmFtZV0udmFsdWUgPSB2YWx1ZTtcbiAgfVxufVxuXG5leHBvcnQgZnVuY3Rpb24gZGVmaW5lVmFyaWFibGVzSW5WYXJpYWJsZU1hcChtYXA6IFZhcmlhYmxlTWFwLCBncm91cDogc3RyaW5nLCB2YXJpYWJsZXM6IGFueSkge1xuICBmb3IgKGNvbnN0IFtuYW1lLCB2YWx1ZV0gb2YgT2JqZWN0LmVudHJpZXModmFyaWFibGVzKSkge1xuICAgIGNvbnN0IGRlc2NyaXB0b3IgPSB2YWx1ZSAmJiB0eXBlb2YgdmFsdWUgPT09IFwib2JqZWN0XCIgPyB2YWx1ZSA6IHt2YWx1ZSB9O1xuICAgIGRlZmluZVZhcmlhYmxlKG1hcCwgZ3JvdXAsIG5hbWUsIGRlc2NyaXB0b3IpO1xuICB9XG59XG5cbmV4cG9ydCBmdW5jdGlvbiBnZXRWYXJpYWJsZXNCeUdyb3VwKG1hcDogVmFyaWFibGVNYXAsIGdyb3VwPzogc3RyaW5nKSB7XG4gIGNvbnN0IHJlc3VsdDogYW55ID0ge307XG4gIGZvciAoY29uc3QgWyBuYW1lLCBlbnRyeSBdIG9mIE9iamVjdC5lbnRyaWVzKG1hcCkpIHtcbiAgICBpZiAoZ3JvdXAgIT09IHVuZGVmaW5lZCAmJiBlbnRyeS5ncm91cCAmJiBlbnRyeS5ncm91cCAhPT0gZ3JvdXApXG4gICAgICBjb250aW51ZTtcbiAgICByZXN1bHRbbmFtZV0gPSB7XG4gICAgICB0eXBlOiBlbnRyeS50eXBlLFxuICAgICAgZGVzY3JpcHRpb246IGVudHJ5LmRlc2NyaXB0aW9uLFxuICAgICAgdmFsdWU6IGdldEVudHJ5VmFsdWUoZW50cnkpLFxuICAgIH07XG4gIH1cbiAgcmV0dXJuIHJlc3VsdDtcbn1cblxuZXhwb3J0IGZ1bmN0aW9uIGNyZWF0ZVZhcmlhYmxlVmFsdWVzKG1hcDogVmFyaWFibGVNYXAsIGdyb3VwPzogc3RyaW5nKTogYW55IHtcbiAgY29uc3QgcmVzdWx0OiBhbnkgPSB7fTtcbiAgZm9yIChjb25zdCBbIG5hbWUsIGVudHJ5IF0gb2YgT2JqZWN0LmVudHJpZXMobWFwKSkge1xuICAgIGlmICghZ3JvdXAgfHwgZ3JvdXAgPT09IGVudHJ5Lmdyb3VwKVxuICAgICAgcmVzdWx0W25hbWVdID0gZ2V0RW50cnlWYWx1ZShlbnRyeSk7XG4gIH1cbiAgcmV0dXJuIHJlc3VsdDtcbn1cblxuZXhwb3J0IGZ1bmN0aW9uIG1lcmdlVmFyaWFibGVzKHRhcmdldDogYW55LCBzb3VyY2U6IGFueSk6IG9iamVjdCB7XG4gIGlmICghdGFyZ2V0IHx8IHR5cGVvZiB0YXJnZXQgIT09IFwib2JqZWN0XCIpXG4gICAgdGhyb3cgbmV3IEVycm9yKGBUYXJnZXQgJHt0YXJnZXR9IGlzIG5vdCBvYmplY3RgKTtcbiAgaWYgKCFzb3VyY2UgfHwgdHlwZW9mIHNvdXJjZSAhPT0gXCJvYmplY3RcIilcbiAgICB0aHJvdyBuZXcgRXJyb3IoYFNvdXJjZSAke3NvdXJjZX0gaXMgbm90IG9iamVjdGApO1xuICBpZiAoQXJyYXkuaXNBcnJheSh0YXJnZXQpKSB7XG4gICAgaWYgKCFBcnJheS5pc0FycmF5KHNvdXJjZSkpXG4gICAgICB0aHJvdyBuZXcgRXJyb3IoYFNvdXJjZSBpcyBub3QgYW4gYXJyYXlgKTtcbiAgICBmb3IgKGNvbnN0IGl0ZXIgb2Ygc291cmNlKVxuICAgICAgdGFyZ2V0LnB1c2goaXRlcik7XG4gIH1cbiAgZWxzZSB7XG4gICAgZm9yIChjb25zdCBbIGtleSwgdmFsIF0gb2YgT2JqZWN0LmVudHJpZXMoc291cmNlKSkge1xuICAgICAgaWYgKCFPYmplY3QuaGFzT3duKHRhcmdldCwga2V5KSkge1xuICAgICAgICB0YXJnZXRba2V5XSA9IHZhbDtcbiAgICAgIH1cbiAgICAgIGVsc2UgaWYgKHRhcmdldFtrZXldICYmIHR5cGVvZiB0YXJnZXRba2V5XSA9PT0gXCJvYmplY3RcIikge1xuICAgICAgICBpZiAoIXZhbCB8fCB0eXBlb2YgdmFsICE9PSBcIm9iamVjdFwiKVxuICAgICAgICAgIHRocm93IG5ldyBFcnJvcihgU291cmNlICR7a2V5fSBoYXMgJHt2YWx9IHdoaWNoIGlzIG5vdCBhbiBvYmplY3RgKTtcbiAgICAgICAgbWVyZ2VWYXJpYWJsZXModGFyZ2V0W2tleV0sIHZhbCk7XG4gICAgICB9XG4gICAgICBlbHNlIHtcbiAgICAgICAgdGhyb3cgbmV3IEVycm9yKGBTb3VyY2UgJHtrZXl9IGhhcyAke3ZhbH0gd2hpY2ggaXMgbm90ICR7dHlwZW9mIHRhcmdldFtrZXldfWApO1xuICAgICAgfVxuICAgIH1cbiAgfVxuICByZXR1cm4gdGFyZ2V0O1xufVxuXG5leHBvcnQgZnVuY3Rpb24gbWVyZ2VWYXJpYWJsZU1hcCh0YXJnZXQ6IFZhcmlhYmxlTWFwLCBzb3VyY2U6IGFueSk6IFZhcmlhYmxlTWFwIHtcbiAgZm9yIChjb25zdCBbbmFtZSwgdmFsdWVdIG9mIE9iamVjdC5lbnRyaWVzKHNvdXJjZSkpIHtcbiAgICBsZXQgZW50cnkgPSB0YXJnZXRbbmFtZV07XG4gICAgaWYgKCFlbnRyeSlcbiAgICAgIGRlZmluZVZhcmlhYmxlKHRhcmdldCwgXCJcIiwgbmFtZSwgeyB2YWx1ZSB9KTtcbiAgICBlbHNlIHtcbiAgICAgIGxldCBkZXN0ID0gZ2V0RW50cnlWYWx1ZShlbnRyeSk7XG4gICAgICBzZXRFbnRyeVZhbHVlKGVudHJ5LCAoZGVzdCAmJiB0eXBlb2YgZGVzdCA9PT0gXCJvYmplY3RcIikgPyBtZXJnZVZhcmlhYmxlcyhkZXN0LCB2YWx1ZSkgOiB2YWx1ZSk7XG4gICAgfVxuICB9XG4gIHJldHVybiB0YXJnZXQ7XG59XG5cbn0gLy8gU2NvcGVIZWxwZXJcbiIsIi8qXG4gKiBNSVQgTGljZW5zZVxuICpcbiAqIENvcHlyaWdodCAoYykgMjAyNSAgWXVyaWkgWWFrdWJpbiAoeXVyaWkueWFrdWJpbkBnbWFpbC5jb20pXG4gKlxuICogUGVybWlzc2lvbiBpcyBncmFudGVkIHRvIHVzZSwgY29weSwgbW9kaWZ5LCBhbmQgZGlzdHJpYnV0ZSB0aGlzIHNvZnR3YXJlXG4gKiB1bmRlciB0aGUgTUlUIExpY2Vuc2UuIFNlZSBMSUNFTlNFIGZpbGUgZm9yIGRldGFpbHMuXG4gKi9cblxuaW1wb3J0IHsgQ3VzdG9tU2NyaXB0IH0gZnJvbSBcIkAvY29yZS9DdXN0b21TY3JpcHRcIjtcblxuY29uc3QgTUFQID0gU3ltYm9sKFwiTUFQXCIpO1xuY29uc3QgRU5UUklFUyA9IFN5bWJvbChcIkVOVFJJRVNcIik7XG5cbmV4cG9ydCBjbGFzcyBTY3JpcHRDb2xsZWN0aW9uIHtcbiAgcHJpdmF0ZSBbTUFQXTogeyBbbmFtZTogc3RyaW5nXTogQ3VzdG9tU2NyaXB0IH07XG4gIHByaXZhdGUgW0VOVFJJRVNdOiBDdXN0b21TY3JpcHRbXTtcblxuICBwcml2YXRlIGNvbnN0cnVjdG9yKCkge1xuICAgIHRoaXNbTUFQXSA9IHt9O1xuICAgIHRoaXNbRU5UUklFU10gPSBbXTtcbiAgfVxuXG4gIHB1YmxpYyBzdGF0aWMgY3JlYXRlKCkge1xuICAgIHJldHVybiBPYmplY3Quc2VhbChuZXcgU2NyaXB0Q29sbGVjdGlvbik7XG4gIH1cblxuICBwdWJsaWMgZ2V0IEVOVFJJRVMoKSB7XG4gICAgcmV0dXJuIHRoaXNbRU5UUklFU107XG4gIH1cblxuICBwdWJsaWMgZ2V0KG5hbWU6IHN0cmluZyk6IEN1c3RvbVNjcmlwdCB8IHVuZGVmaW5lZCB7XG4gICAgcmV0dXJuIHRoaXNbTUFQXVtuYW1lXTtcbiAgfVxuXG4gIHB1YmxpYyBhZGQodGFyZ2V0OiBDdXN0b21TY3JpcHQsIG5hbWU/OiBzdHJpbmcpIHtcbiAgICBpZiAobmFtZSkge1xuICAgICAgaWYgKHRoaXNbTUFQXVtuYW1lXSlcbiAgICAgICAgdGhyb3cgbmV3IEVycm9yKGBTY3JpcHQgXCIke25hbWV9XCIgZXhpc3RzYCk7XG4gICAgICB0aGlzW01BUF1bbmFtZV0gPSB0YXJnZXQ7XG4gICAgfVxuICAgIHRoaXNbRU5UUklFU10ucHVzaCh0YXJnZXQpO1xuICB9XG4gIFxuICBwdWJsaWMgdG9KU09OKCk6IG9iamVjdCB7XG4gICAgcmV0dXJuIHRoaXNbRU5UUklFU107XG4gIH1cbn07XG4iLCIvKlxuICogTUlUIExpY2Vuc2VcbiAqXG4gKiBDb3B5cmlnaHQgKGMpIDIwMjUgIFl1cmlpIFlha3ViaW4gKHl1cmlpLnlha3ViaW5AZ21haWwuY29tKVxuICpcbiAqIFBlcm1pc3Npb24gaXMgZ3JhbnRlZCB0byB1c2UsIGNvcHksIG1vZGlmeSwgYW5kIGRpc3RyaWJ1dGUgdGhpcyBzb2Z0d2FyZVxuICogdW5kZXIgdGhlIE1JVCBMaWNlbnNlLiBTZWUgTElDRU5TRSBmaWxlIGZvciBkZXRhaWxzLlxuICovXG5cbmltcG9ydCB7IFZhcmlhYmxlTWFwIH0gZnJvbSBcIkAvY29yZS9TY29wZVwiO1xuaW1wb3J0IHsgR2VuZXJhbENvbnRleHQsIGNyZWF0ZUNvbnRleHQgfSBmcm9tIFwiQC9jb3JlL0Jhc2VDb250ZXh0XCI7XG5cbmNvbnN0IFNDT1BFID0gU3ltYm9sKFwiU0NPUEVcIik7XG5cbmV4cG9ydCBjbGFzcyBTY3JpcHRDb250ZXh0IGV4dGVuZHMgR2VuZXJhbENvbnRleHQge1xuICBbU0NPUEVdOiBWYXJpYWJsZU1hcDtcblxuICBjb25zdHJ1Y3RvcihzY29wZTogVmFyaWFibGVNYXApIHtcbiAgICBzdXBlcihzY29wZSk7XG4gICAgdGhpc1tTQ09QRV0gPSBzY29wZTtcbiAgfVxuXG4gIHB1YmxpYyBzdGF0aWMgY3JlYXRlKHZhcmlhYmxlTWFwOiBWYXJpYWJsZU1hcCkge1xuICAgIHJldHVybiBjcmVhdGVDb250ZXh0KG5ldyBTY3JpcHRDb250ZXh0KHZhcmlhYmxlTWFwKSk7XG4gIH1cbn07XG4iLCIvKlxuICogTUlUIExpY2Vuc2VcbiAqXG4gKiBDb3B5cmlnaHQgKGMpIDIwMjUgIFl1cmlpIFlha3ViaW4gKHl1cmlpLnlha3ViaW5AZ21haWwuY29tKVxuICpcbiAqIFBlcm1pc3Npb24gaXMgZ3JhbnRlZCB0byB1c2UsIGNvcHksIG1vZGlmeSwgYW5kIGRpc3RyaWJ1dGUgdGhpcyBzb2Z0d2FyZVxuICogdW5kZXIgdGhlIE1JVCBMaWNlbnNlLiBTZWUgTElDRU5TRSBmaWxlIGZvciBkZXRhaWxzLlxuICovXG5cbmV4cG9ydCBpbnRlcmZhY2UgU2ltcGxlT2JqZWN0IHtcbiAgdHlwZTogc3RyaW5nO1xuICBbbmFtZTogc3RyaW5nXTogbnVsbCB8IGJvb2xlYW4gfCBudW1iZXIgfCBzdHJpbmcgfG9iamVjdDtcbn07XG5cbnR5cGUgSW5zdGFuY2VDcmVhdGVGdW5jdGlvbiA9IChvYmplY3Q6IFNpbXBsZU9iamVjdCkgPT4gYW55O1xuXG5jb25zdCBfY3JlYXRvcnMgPSBuZXcgTWFwPHN0cmluZywgSW5zdGFuY2VDcmVhdGVGdW5jdGlvbj4oKTtcblxuZXhwb3J0IG5hbWVzcGFjZSBTaW1wbGVPYmplY3Qge1xuXG5leHBvcnQgZnVuY3Rpb24gcmVnaXN0ZXJJbnN0YW5jZUNyZWF0b3IobmFtZTogc3RyaW5nLCBmdW5jOiBJbnN0YW5jZUNyZWF0ZUZ1bmN0aW9uKSB7XG4gIGlmICghbmFtZSAmJiBfY3JlYXRvcnMuaGFzKG5hbWUpKVxuICAgIHRocm93IG5ldyBFcnJvcihgTmFtZSBcIiR7bmFtZX1cIiBpcyB3cm9uZyBvciByZWdpc3RlcmVkYCk7XG4gIF9jcmVhdG9ycy5zZXQobmFtZSwgZnVuYyk7XG59XG5cbmV4cG9ydCBmdW5jdGlvbiBjcmVhdGVJbnN0YW5jZShvYmplY3Q6IFNpbXBsZU9iamVjdCk6IGFueSB7XG4gIGNvbnN0IGZ1bmMgPSBfY3JlYXRvcnMuZ2V0KG9iamVjdC50eXBlKTtcbiAgaWYgKCFmdW5jKVxuICAgIHRocm93IG5ldyBFcnJvcihgVWtub3duIG9iamVjdCB0eXBlOiAke0pTT04uc3RyaW5naWZ5KG9iamVjdCl9YCk7XG4gIHJldHVybiBmdW5jKG9iamVjdCk7XG59XG5cbn0gLy8gbmFtZXNwYWNlIFNpbXBsZU9iamVjdFxuIiwiLypcbiAqIE1JVCBMaWNlbnNlXG4gKlxuICogQ29weXJpZ2h0IChjKSAyMDI1ICBZdXJpaSBZYWt1YmluICh5dXJpaS55YWt1YmluQGdtYWlsLmNvbSlcbiAqXG4gKiBQZXJtaXNzaW9uIGlzIGdyYW50ZWQgdG8gdXNlLCBjb3B5LCBtb2RpZnksIGFuZCBkaXN0cmlidXRlIHRoaXMgc29mdHdhcmVcbiAqIHVuZGVyIHRoZSBNSVQgTGljZW5zZS4gU2VlIExJQ0VOU0UgZmlsZSBmb3IgZGV0YWlscy5cbiAqL1xuXG5pbXBvcnQgeyBlbnN1cmVCb29sZWFuIH0gZnJvbSBcIkAvdXRpbHMvU3RyaWN0VHlwZVwiO1xuaW1wb3J0IHsgQWJzb2x1dGVQYXRoIH0gZnJvbSBcIkAvY29yZS9BYnNvbHV0ZVBhdGhcIjtcblxuY29uc3QgTEFOR1VBR0UgICAgICAgICAgICA9IFN5bWJvbChcIkxBTkdVQUdFXCIpO1xuY29uc3QgSEVBREVSX0ZJTEVfT05MWSAgICA9IFN5bWJvbChcIkhFQURFUl9GSUxFX09OTFlcIik7XG5jb25zdCBERUZJTkVTICAgICAgICAgICAgID0gU3ltYm9sKFwiREVGSU5FU1wiKTtcbmNvbnN0IENPTVBJTEVfRkxBR1MgICAgICAgPSBTeW1ib2woXCJDT01QSUxFX0ZMQUdTXCIpO1xuY29uc3QgRklMRSAgICAgICAgICAgICAgICA9IFN5bWJvbChcIkZJTEVcIik7XG5jb25zdCBCQVNFX0RJUiAgICAgICAgICAgID0gU3ltYm9sKFwiQkFTRV9ESVJcIik7XG5cbmV4cG9ydCBjbGFzcyBTb3VyY2VGaWxlIHtcbiAgcHJpdmF0ZSBbTEFOR1VBR0VdOiBzdHJpbmc7XG4gIHByaXZhdGUgW0hFQURFUl9GSUxFX09OTFldOiBib29sZWFuO1xuICBwcml2YXRlIFtGSUxFXTogQWJzb2x1dGVQYXRoO1xuICBwcml2YXRlIFtCQVNFX0RJUl06IEFic29sdXRlUGF0aDtcbiAgcHJpdmF0ZSBbREVGSU5FU106IHN0cmluZ1tdO1xuICBwcml2YXRlIFtDT01QSUxFX0ZMQUdTXTogQXJyYXk8c3RyaW5nfHN0cmluZ1tdPjtcblxuICBwcml2YXRlIGNvbnN0cnVjdG9yKGZpbGVuYW1lOiBBYnNvbHV0ZVBhdGgsIGJhc2VEaXI6IEFic29sdXRlUGF0aCwgbGFuZ3VhZ2U6IHN0cmluZywgY29tcGlsZUZsYWdzOiBBcnJheTxzdHJpbmd8c3RyaW5nW10+KSB7XG4gICAgdGhpc1tGSUxFXSA9IGZpbGVuYW1lO1xuICAgIHRoaXNbQkFTRV9ESVJdID0gYmFzZURpcjtcbiAgICB0aGlzW0xBTkdVQUdFXSA9IGxhbmd1YWdlO1xuICAgIHRoaXNbSEVBREVSX0ZJTEVfT05MWV0gPSAhbGFuZ3VhZ2U7XG4gICAgdGhpc1tERUZJTkVTXSA9IFtdO1xuICAgIHRoaXNbQ09NUElMRV9GTEFHU10gPSBbIC4uLmNvbXBpbGVGbGFncyBdO1xuICB9XG5cbiAgcHVibGljIHN0YXRpYyBjcmVhdGUoZmlsZW5hbWU6IEFic29sdXRlUGF0aCwgYmFzZURpcjogQWJzb2x1dGVQYXRoLCBsYW5ndWFnZTogc3RyaW5nLCBjb21waWxlRmxhZ3M6IEFycmF5PHN0cmluZ3xzdHJpbmdbXT4pIHtcbiAgICByZXR1cm4gT2JqZWN0LnNlYWwobmV3IFNvdXJjZUZpbGUoZmlsZW5hbWUsIGJhc2VEaXIsIGxhbmd1YWdlLCBjb21waWxlRmxhZ3MpKTtcbiAgfVxuXG4gIHB1YmxpYyBnZXQgTEFOR1VBR0UoKTogc3RyaW5nIHtcbiAgICByZXR1cm4gdGhpc1tMQU5HVUFHRV07XG4gIH1cblxuICBwdWJsaWMgZ2V0IEhFQURFUl9GSUxFX09OTFkoKTogYm9vbGVhbiB7XG4gICAgcmV0dXJuIHRoaXNbSEVBREVSX0ZJTEVfT05MWV07XG4gIH1cblxuICBwdWJsaWMgc2V0IEhFQURFUl9GSUxFX09OTFkodmFsdWU6IGJvb2xlYW4pIHtcbiAgICB0aGlzW0hFQURFUl9GSUxFX09OTFldID0gZW5zdXJlQm9vbGVhbih2YWx1ZSk7XG4gIH1cblxuICBwdWJsaWMgZ2V0IERFRklORVMoKSB7XG4gICAgcmV0dXJuIHRoaXNbREVGSU5FU11cbiAgfVxuXG4gIHB1YmxpYyBnZXQgQ09NUElMRV9GTEFHUygpIHtcbiAgICByZXR1cm4gdGhpc1tDT01QSUxFX0ZMQUdTXTtcbiAgfVxuXG4gIHB1YmxpYyBnZXQgRklMRSgpOiBBYnNvbHV0ZVBhdGgge1xuICAgIHJldHVybiB0aGlzW0ZJTEVdO1xuICB9XG5cbiAgcHVibGljIGdldCBGSUxFX0RJUigpOiBBYnNvbHV0ZVBhdGgge1xuICAgIHJldHVybiB0aGlzW0ZJTEVdLmRpcm5hbWUoKTtcbiAgfVxuXG4gIHB1YmxpYyBnZXQgRklMRV9OQU1FKCk6IHN0cmluZyB7XG4gICAgcmV0dXJuIHRoaXNbRklMRV0uYmFzZW5hbWUoKTtcbiAgfVxuXG4gIHB1YmxpYyB0b0pTT04oKTogb2JqZWN0IHtcbiAgICByZXR1cm4ge1xuICAgICAgTEFOR1VBR0U6IHRoaXNbTEFOR1VBR0VdLFxuICAgICAgSEVBREVSX0ZJTEVfT05MWTogdGhpc1tIRUFERVJfRklMRV9PTkxZXSxcbiAgICAgIERFRklORVM6IHRoaXNbREVGSU5FU10sXG4gICAgICBDT01QSUxFX0ZMQUdTOiB0aGlzW0NPTVBJTEVfRkxBR1NdLFxuICAgICAgRklMRTogdGhpc1tGSUxFXSxcbiAgICAgIEZJTEVfRElSOiB0aGlzLkZJTEVfRElSLFxuICAgICAgRklMRV9OQU1FOiB0aGlzLkZJTEVfTkFNRSxcbiAgICAgIEJBU0VfRElSOiB0aGlzW0JBU0VfRElSXSxcbiAgICB9O1xuICB9XG59XG4iLCIvKlxuICogTUlUIExpY2Vuc2VcbiAqXG4gKiBDb3B5cmlnaHQgKGMpIDIwMjUgIFl1cmlpIFlha3ViaW4gKHl1cmlpLnlha3ViaW5AZ21haWwuY29tKVxuICpcbiAqIFBlcm1pc3Npb24gaXMgZ3JhbnRlZCB0byB1c2UsIGNvcHksIG1vZGlmeSwgYW5kIGRpc3RyaWJ1dGUgdGhpcyBzb2Z0d2FyZVxuICogdW5kZXIgdGhlIE1JVCBMaWNlbnNlLiBTZWUgTElDRU5TRSBmaWxlIGZvciBkZXRhaWxzLlxuICovXG5cbmltcG9ydCB7IFNvdXJjZUZpbGUgfSBmcm9tIFwiQC9jb3JlL1NvdXJjZUZpbGVcIjtcbmltcG9ydCB7IFN5c3RlbVNjb3BlIH0gZnJvbSBcIkAvY29yZS9TeXN0ZW1TY29wZVwiO1xuaW1wb3J0IHsgbm9ybWFsaXplRGVmaW5pdGlvbnMgfSBmcm9tIFwiQC9jb3JlL0RlZmluaXRpb25IZWxwZXJcIjtcblxuY29uc3QgU09VUkNFUyA9IFN5bWJvbChcIlNPVVJDRVNcIik7XG5cbmV4cG9ydCBjbGFzcyBTb3VyY2VGaWxlTGlzdCB7XG4gIHByaXZhdGUgW1NPVVJDRVNdOiBTb3VyY2VGaWxlW107XG5cbiAgcHJpdmF0ZSBjb25zdHJ1Y3RvcihzY29wZTogU3lzdGVtU2NvcGUsIHNvdXJjZXM6IFNvdXJjZUZpbGVbXSkge1xuICAgIHRoaXNbU09VUkNFU10gPSBbXTtcbiAgICBmb3IgKGNvbnN0IGl0ZXIgb2Ygc291cmNlcykge1xuICAgICAgaWYgKCEoaXRlciBpbnN0YW5jZW9mIFNvdXJjZUZpbGUpKVxuICAgICAgICB0aHJvdyBuZXcgRXJyb3IoYEl0ZW0gJHtpdGVyfSBpcyBub3QgU291cmNlRmlsZWApO1xuICAgICAgdGhpc1tTT1VSQ0VTXS5wdXNoKGl0ZXIpO1xuICAgIH1cbiAgfVxuXG4gIHB1YmxpYyBzdGF0aWMgY3JlYXRlKHNjb3BlOiBTeXN0ZW1TY29wZSwgc291cmNlczogU291cmNlRmlsZVtdKSB7XG4gICAgcmV0dXJuIE9iamVjdC5zZWFsKG5ldyBTb3VyY2VGaWxlTGlzdChzY29wZSwgc291cmNlcykpO1xuICB9XG5cbiAgcHVibGljIGFkZERlZmluaXRpb25zKC4uLmRlZmluaXRpb25zOiBzdHJpbmdbXSkge1xuICAgIGZvciAoY29uc3QgaXRlciBvZiBub3JtYWxpemVEZWZpbml0aW9ucyguLi5kZWZpbml0aW9ucykpXG4gICAgICB0aGlzW1NPVVJDRVNdLmZvckVhY2goaSA9PiBpLkRFRklORVMucHVzaChpdGVyKSk7XG4gIH1cblxuICBwdWJsaWMgYWRkQ29tcGlsZUZsYWdzKC4uLmZsYWdzOiBzdHJpbmdbXSkge1xuICAgIGZvciAoY29uc3QgaXRlciBvZiBmbGFncy5mbGF0KCkpXG4gICAgICB0aGlzW1NPVVJDRVNdLmZvckVhY2goaSA9PiBpLkNPTVBJTEVfRkxBR1MucHVzaChpdGVyKSk7XG4gIH1cblxuICBwdWJsaWMgc291cmNlQXQoaW5kZXg6IG51bWJlcik6IFNvdXJjZUZpbGUge1xuICAgIHJldHVybiB0aGlzW1NPVVJDRVNdW2luZGV4XTtcbiAgfVxuXG4gIHB1YmxpYyBzb3VyY2VDb3VudChpbmRleDogbnVtYmVyKTogbnVtYmVyIHtcbiAgICByZXR1cm4gdGhpc1tTT1VSQ0VTXS5sZW5ndGg7XG4gIH1cblxuICBwdWJsaWMgdG9KU09OKCk6IG9iamVjdCB7XG4gICAgcmV0dXJuIHRoaXNbU09VUkNFU107XG4gIH1cbn07XG4iLCIvKlxuICogTUlUIExpY2Vuc2VcbiAqXG4gKiBDb3B5cmlnaHQgKGMpIDIwMjUgIFl1cmlpIFlha3ViaW4gKHl1cmlpLnlha3ViaW5AZ21haWwuY29tKVxuICpcbiAqIFBlcm1pc3Npb24gaXMgZ3JhbnRlZCB0byB1c2UsIGNvcHksIG1vZGlmeSwgYW5kIGRpc3RyaWJ1dGUgdGhpcyBzb2Z0d2FyZVxuICogdW5kZXIgdGhlIE1JVCBMaWNlbnNlLiBTZWUgTElDRU5TRSBmaWxlIGZvciBkZXRhaWxzLlxuICovXG5cbmltcG9ydCB7IHNwYXduU3luYyB9IGZyb20gXCJub2RlOmNoaWxkX3Byb2Nlc3NcIjtcblxuaW1wb3J0IHsgSW50ZXJmYWNlVGFzayB9IGZyb20gXCJAL2NvcmUvTWFrZUludGVyZmFjZXNcIjtcbmltcG9ydCB7IFNpbXBsZU9iamVjdCB9IGZyb20gXCJAL2NvcmUvU2ltcGxlT2JqZWN0XCI7XG5pbXBvcnQgeyBMb2dnZXIgfSBmcm9tIFwiQC9sb2dnZXJcIjtcblxuY29uc3QgbG9nZ2VyID0gTG9nZ2VyLmNyZWF0ZShpbXBvcnQubWV0YS51cmwpO1xuXG5pbnRlcmZhY2UgT3B0aW9ucyB7XG4gIGNvbW1hbmQ6IHN0cmluZztcbiAgYXJnczogc3RyaW5nW107XG4gIGN3ZDogc3RyaW5nO1xufTtcblxuZXhwb3J0IGNsYXNzIFNwYXduU3luY1Rhc2sgZXh0ZW5kcyBJbnRlcmZhY2VUYXNrIHtcbiAgcHJpdmF0ZSBfY29tbWFuZDogc3RyaW5nO1xuICBwcml2YXRlIF9hcmdzOiBzdHJpbmdbXTtcbiAgcHJpdmF0ZSBfY3dkOiBzdHJpbmc7XG5cbiAgcHVibGljIGNvbnN0cnVjdG9yKGNvbW1hbmQ6IHN0cmluZywgYXJnczogc3RyaW5nW10sIGN3ZDogc3RyaW5nKSB7XG4gICAgc3VwZXIoKTtcblxuICAgIHRoaXMuX2NvbW1hbmQgPSBjb21tYW5kO1xuICAgIHRoaXMuX2FyZ3MgPSBhcmdzO1xuICAgIHRoaXMuX2N3ZCA9IGN3ZDtcbiAgfVxuXG4gIHB1YmxpYyBleGVjdXRlKCk6IHZvaWQge1xuICAgIGxvZ2dlci5kZWJ1ZyhcInNwYXduU3luY1wiKTtcbiAgICBsb2dnZXIuZGVidWcoXCIgIGNvbW1hbmRcIiwgdGhpcy5fY29tbWFuZCk7XG4gICAgbG9nZ2VyLmRlYnVnKFwiICBjd2RcIiwgdGhpcy5fY3dkKTtcbiAgICBmb3IgKGxldCBpID0gMDsgaSA8IHRoaXMuX2FyZ3MubGVuZ3RoOyBpKyspXG4gICAgICBsb2dnZXIuZGVidWcoYCAgYXJnc1ske2l9XWAsIHRoaXMuX2FyZ3NbaV0pO1xuXG4gICAgY29uc3QgcmVzdWx0ID0gc3Bhd25TeW5jKHRoaXMuX2NvbW1hbmQsIHRoaXMuX2FyZ3MsIHsgY3dkOiB0aGlzLl9jd2QsIGVuY29kaW5nOiBcInV0Zi04XCIgfSk7XG4gICAgaWYgKHJlc3VsdC5lcnJvciB8fCByZXN1bHQuc3RhdHVzKSB7XG4gICAgICBsb2dnZXIubm90aWNlKFwiY2QgXCIgKyB0aGlzLl9jd2QpO1xuICAgICAgbGV0IGNtZCA9IHRoaXMuX2FyZ3Muam9pbihcIiBcIik7XG4gICAgICBjbWQgPSB0aGlzLl9jb21tYW5kICsgKGNtZCA/IFwiIFwiIDogXCJcIikgKyBjbWQ7XG4gICAgICBsb2dnZXIubm90aWNlKGNtZCk7XG4gICAgICBsb2dnZXIubm90aWNlKFwiXCIpO1xuXG4gICAgICBsb2dnZXIuZmF0YWwocmVzdWx0LnN0ZGVycik7XG5cbiAgICAgIGlmIChyZXN1bHQuZXJyb3IpXG4gICAgICAgICAgdGhyb3cgcmVzdWx0LmVycm9yO1xuXG4gICAgICB0aHJvdyBuZXcgRXJyb3IocmVzdWx0LmVycm9yIGFzIGFueSB8fCBcIlN0YXR1cyBcIiArIHJlc3VsdC5zdGF0dXMpO1xuICAgIH1cbiAgICBpZiAocmVzdWx0LnN0ZG91dCkge1xuICAgICAgZm9yIChjb25zdCBsaW5lIG9mIHJlc3VsdC5zdGRvdXQudHJpbSgpLnNwbGl0KFwiXFxuXCIpKSB7XG4gICAgICAgIGxvZ2dlci5ub3RpY2UobGluZSk7XG4gICAgICB9XG4gICAgfVxuICB9XG5cbiAgcHVibGljIHN0YXRpYyBmcm9tSlNPTihvOiBTaW1wbGVPYmplY3QpIHtcbiAgICBjb25zdCBvcHRpb25zOiBPcHRpb25zICYgU2ltcGxlT2JqZWN0ID0gbyBhcyBhbnk7XG4gICAgcmV0dXJuIG5ldyBTcGF3blN5bmNUYXNrKG9wdGlvbnMuY29tbWFuZCwgb3B0aW9ucy5hcmdzLCBvcHRpb25zLmN3ZCk7XG4gIH1cblxuICBwdWJsaWMgdG9KU09OKCk6IE9wdGlvbnMgJiBTaW1wbGVPYmplY3Qge1xuICAgIHJldHVybiB7XG4gICAgICB0eXBlOiBTcGF3blN5bmNUYXNrLm5hbWUsXG4gICAgICBjb21tYW5kOiB0aGlzLl9jb21tYW5kLFxuICAgICAgYXJnczogdGhpcy5fYXJncyxcbiAgICAgIGN3ZDogdGhpcy5fY3dkLFxuICAgIH1cbiAgfVxufTtcblxuU2ltcGxlT2JqZWN0LnJlZ2lzdGVySW5zdGFuY2VDcmVhdG9yKFNwYXduU3luY1Rhc2submFtZSwgU3Bhd25TeW5jVGFzay5mcm9tSlNPTik7XG4iLCIvKlxuICogTUlUIExpY2Vuc2VcbiAqXG4gKiBDb3B5cmlnaHQgKGMpIDIwMjUgIFl1cmlpIFlha3ViaW4gKHl1cmlpLnlha3ViaW5AZ21haWwuY29tKVxuICpcbiAqIFBlcm1pc3Npb24gaXMgZ3JhbnRlZCB0byB1c2UsIGNvcHksIG1vZGlmeSwgYW5kIGRpc3RyaWJ1dGUgdGhpcyBzb2Z0d2FyZVxuICogdW5kZXIgdGhlIE1JVCBMaWNlbnNlLiBTZWUgTElDRU5TRSBmaWxlIGZvciBkZXRhaWxzLlxuICovXG5cbmltcG9ydCBvcyBmcm9tIFwibm9kZTpvc1wiO1xuaW1wb3J0IHsgREVCVUdfQlVJTERfVFlQRSwgUkVMRUFTRV9CVUlMRF9UWVBFIH0gZnJvbSBcIkAvY29yZS9UeXBlc1wiO1xuaW1wb3J0IHsgSG9zdCB9IGZyb20gXCJAL3V0aWxzL0hvc3RcIjtcblxuZXhwb3J0IGRlZmF1bHQge1xuICBTWVNURU1fTkFNRToge1xuICAgIGRlc2NyaXB0aW9uOiBcIkRlZmluZXMgdGhlIHRhcmdldCBPUyBmb3IgdGhlIGJ1aWxkLCB1c2VkIGluIGNyb3NzLWNvbXBpbGF0aW9uIGFuZCBuYXRpdmUgYnVpbGRzXCIsXG4gICAgdmFsdWU6IFwiTGludXhcIixcbiAgfSxcbiAgU1lTVEVNX1BST0NFU1NPUjoge1xuICAgIGRlc2NyaXB0aW9uOiBcIkRlZmluZXMgdGhlIHRhcmdldCBDUFUgYXJjaGl0ZWN0dXJlXCIsXG4gICAgdmFsdWU6IFwid2FzbTMyXCIsXG4gIH0sXG4gIFBST0pFQ1RfTkFNRToge1xuICAgIGRlc2NyaXB0aW9uOiBcIk5hbWUgb2YgdGhlIGN1cnJlbnQgcHJvamVjdFwiLFxuICAgIHZhbHVlOiBcIlwiLFxuICB9LFxuICBQUk9KRUNUX1ZFUlNJT046IHtcbiAgICBkZXNjcmlwdGlvbjogXCJWZXJzaW9uIG9mIHRoZSBjdXJyZW50IHByb2plY3RcIixcbiAgICB2YWx1ZTogXCJcIixcbiAgfSxcbiAgUFJPSkVDVF9ERVNDUklQVElPTjoge1xuICAgIGRlc2NyaXB0aW9uOiBcIkRlc2NyaXB0aW9uIG9mIHRoZSBjdXJyZW50IHByb2plY3RcIixcbiAgICB2YWx1ZTogXCJcIixcbiAgfSxcbiAgUFJPSkVDVF9IT01FUEFHRV9VUkw6IHtcbiAgICBkZXNjcmlwdGlvbjogXCJIb21lcGFnZSBVUkwgb2YgdGhlIGN1cnJlbnQgcHJvamVjdFwiLFxuICAgIHZhbHVlOiBcIlwiLFxuICB9LFxuICBQUk9KRUNUX1NPVVJDRV9ESVI6IHtcbiAgICBkZXNjcmlwdGlvbjogXCJBYnNvbHV0ZSBwYXRoIHRvIHRoZSB0b3AtbGV2ZWwgc291cmNlIGRpcmVjdG9yeSBvZiB0aGUgcHJvamVjdFwiLFxuICAgIHR5cGU6IFwiRGlyUGF0aFwiLFxuICB9LFxuICBQUk9KRUNUX0JJTkFSWV9ESVI6IHtcbiAgICBkZXNjcmlwdGlvbjogXCJBYnNvbHV0ZSBwYXRoIHRvIHRoZSB0b3AtbGV2ZWwgYnVpbGQgKGJpbmFyeSkgZGlyZWN0b3J5IG9mIHRoZSBwcm9qZWN0XCIsXG4gICAgdHlwZTogXCJEaXJQYXRoXCIsXG4gIH0sXG4gIFNDUklQVF9NT0RVTEU6IHtcbiAgICBkZXNjcmlwdGlvbjogXCJNb2R1bGUgbmFtZSBvZiB0aGUgY3VycmVudCBNYWtlU2NyaXB0XCIsXG4gICAgdHlwZTogXCJzdHJpbmdcIixcbiAgfSxcbiAgU0NSSVBUX0ZJTEU6IHtcbiAgICBkZXNjcmlwdGlvbjogXCJGdWxsIHBhdGggdG8gdGhlIGN1cnJlbnQgTWFrZVNjcmlwdCBmaWxlIGJlaW5nIHByb2Nlc3NlZFwiLFxuICAgIHR5cGU6IFwiRmlsZVBhdGhcIixcbiAgfSxcbiAgU0NSSVBUX0RJUjoge1xuICAgIGRlc2NyaXB0aW9uOiBcIkRpcmVjdG9yeSBvZiB0aGUgY3VycmVudCBNYWtlU2NyaXB0IGZpbGUgYmVpbmcgcHJvY2Vzc2VkXCIsXG4gICAgdHlwZTogXCJEaXJQYXRoXCIsXG4gIH0sXG4gIFBBQ0tBR0VfRklMRToge1xuICAgIGRlc2NyaXB0aW9uOiBcIkZpbGVuYW1lIG9mIHByb2plY3QgbWFuaWZlc3QgY29udGFpbmluZyBtZXRhZGF0YSBhbmQgZGVwZW5kZW5jaWVzXCIsXG4gICAgdHlwZTogXCJGaWxlUGF0aFwiLFxuICB9LFxuICBDQUNIRV9GSUxFOiB7XG4gICAgZGVzY3JpcHRpb246IFwiRGVmYXVsdCBmaWxlbmFtZSBvZiB0aGUgQml0TWFrZSBjYWNoZSBzdG9yaW5nIHNldHRpbmdzXCIsXG4gICAgdHlwZTogXCJGaWxlUGF0aFwiLFxuICB9LFxuICBUT09MQ0hBSU5fRklMRToge1xuICAgIGRlc2NyaXB0aW9uOiBcIlNwZWNpZmllcyB0aGUgcGF0aCB0byBhIHRvb2xjaGFpbiBmaWxlIHVzZWQgZm9yIGNyb3NzLWNvbXBpbGF0aW9uXCIsXG4gICAgdHlwZTogXCJzdHJpbmdcIixcbiAgfSxcbiAgQlVJTERfVFlQRToge1xuICAgIGRlc2NyaXB0aW9uOiBcIlNwZWNpZmllcyB0aGUgYnVpbGQgY29uZmlndXJhdGlvbiBmb3IgY29udHJvbGxpbmcgb3B0aW1pemF0aW9uIGxldmVscyBhbmQgZGVidWcgaW5mb3JtYXRpb24gaW4gdGhlIGJ1aWxkIHByb2Nlc3NcIixcbiAgICB0eXBlOiBbIERFQlVHX0JVSUxEX1RZUEUsIFJFTEVBU0VfQlVJTERfVFlQRSBdLFxuICAgIHZhbHVlOiBSRUxFQVNFX0JVSUxEX1RZUEUsXG4gIH0sXG4gIElOU1RBTExfUFJFRklYOiB7XG4gICAgZGVzY3JpcHRpb246IFwiVGhlIHJvb3QgZGlyZWN0b3J5IHdoZXJlIGZpbGVzIHdpbGwgYmUgaW5zdGFsbGVkIGJ5IGRlZmF1bHRcIixcbiAgICB0eXBlOiBcIkRpclBhdGhcIixcbiAgICB2YWx1ZTogXCIvdXNyXCIsXG4gIH0sXG4gIERFU1RESVI6IHtcbiAgICBkZXNjcmlwdGlvbjogXCJUZW1wb3JhcnkgaW5zdGFsbGF0aW9uIHJvb3RcIixcbiAgICB0eXBlOiBcIkRpclBhdGhcIixcbiAgfSxcbiAgU09VUkNFX0RJUjoge1xuICAgIGRlc2NyaXB0aW9uOiBcIlBhdGggdG8gdGhlIHNvdXJjZSBkaXJlY3RvcnkgY3VycmVudGx5IGJlaW5nIHByb2Nlc3NlZFwiLFxuICAgIHR5cGU6IFwiRGlyUGF0aFwiLFxuICB9LFxuICBCSU5BUllfRElSOiB7XG4gICAgZGVzY3JpcHRpb246IFwiUGF0aCB0byB0aGUgYmluYXJ5IGRpcmVjdG9yeSBjdXJyZW50bHkgYmVpbmcgcHJvY2Vzc2VkXCIsXG4gICAgdHlwZTogXCJEaXJQYXRoXCIsXG4gIH0sXG4gIFBPU0lUSU9OX0lOREVQRU5ERU5UX0NPREU6IHtcbiAgICBkZXNjcmlwdGlvbjogXCJFbmFibGVzIFBvc2l0aW9uLUluZGVwZW5kZW50IENvZGUgKFBJQykgZm9yIGJ1aWxkaW5nIHNoYXJlZCBsaWJyYXJpZXNcIixcbiAgICB2YWx1ZTogZmFsc2UsXG4gIH0sXG4gIFBSRVZFTlRfSU5TVEFMTF9GSUxFUzoge1xuICAgIGRlc2NyaXB0aW9uOiBcIlByZXZlbnQgaW5zdGFsbGF0aW9uIG9mIGZpbGVzXCIsXG4gICAgdmFsdWU6IGZhbHNlLFxuICB9LFxuICBIT1NUX1NZU1RFTV9OQU1FOiB7XG4gICAgZGVzY3JpcHRpb246IFwiU3BlY2lmaWVzIHRoZSBPUyBvZiB0aGUgbWFjaGluZSBydW5uaW5nXCIsXG4gICAgdmFsdWU6IG9zLnR5cGUoKSxcbiAgfSxcbiAgSU5DTFVERVM6IHtcbiAgICBkZXNjcmlwdGlvbjogXCJQYXRocyBzZWFyY2hlZCBmb3IgaGVhZGVyIGZpbGVzXCIsXG4gICAgdmFsdWU6IFtdLFxuICB9LFxuICBBU01fQ09NUElMRVI6IHtcbiAgICBkZXNjcmlwdGlvbjogXCJQYXRoIHRvIHRoZSBhc3NlbWJsZXIgY29tcGlsZXIgZGV0ZWN0ZWRcIixcbiAgICB2YWx1ZTogXCJcIixcbiAgfSxcbiAgQVNNX0ZMQUdTOiB7XG4gICAgZGVzY3JpcHRpb246IFwiRmxhZ3MgcGFzc2VkIHRvIHRoZSBhc3NlbWJsZXIgY29tcGlsZXJcIixcbiAgICB2YWx1ZTogW10sXG4gIH0sXG4gIEFTTV9GTEFHU19ERUJVRzoge1xuICAgIGRlc2NyaXB0aW9uOiBcIkFkZGl0aW9uYWwgYXNzZW1ibGVyIGZsYWdzIHVzZWQgd2hlbiBidWlsZGluZyBpbiBEZWJ1ZyBtb2RlXCIsXG4gICAgdmFsdWU6IFsgXCItZ1wiIF0sXG4gIH0sXG4gIEFTTV9GTEFHU19SRUxFQVNFOiB7XG4gICAgZGVzY3JpcHRpb246IFwiQWRkaXRpb25hbCBhc3NlbWJsZXIgZmxhZ3MgdXNlZCB3aGVuIGJ1aWxkaW5nIGluIFJlbGVhc2UgbW9kZVwiLFxuICAgIHZhbHVlOiBbIFwiLU8zXCIsIFwiLUROREVCVUdcIiBdLFxuICB9LFxuICBDX0NPTVBJTEVSOiB7XG4gICAgZGVzY3JpcHRpb246IFwiUGF0aCB0byB0aGUgQyBjb21waWxlciBkZXRlY3RlZFwiLFxuICAgIHZhbHVlOiBcIlwiLFxuICB9LFxuICBDX0ZMQUdTOiB7XG4gICAgZGVzY3JpcHRpb246IFwiRmxhZ3MgcGFzc2VkIHRvIHRoZSBDIGNvbXBpbGVyXCIsXG4gICAgdmFsdWU6IFtdLFxuICB9LFxuICBDX0ZMQUdTX0RFQlVHOiB7XG4gICAgZGVzY3JpcHRpb246IFwiQWRkaXRpb25hbCBDIGNvbXBpbGVyIGZsYWdzIHVzZWQgd2hlbiBidWlsZGluZyBpbiBEZWJ1ZyBtb2RlXCIsXG4gICAgdmFsdWU6IFsgXCItZ1wiIF0sXG4gIH0sXG4gIENfRkxBR1NfUkVMRUFTRToge1xuICAgIGRlc2NyaXB0aW9uOiBcIkFkZGl0aW9uYWwgQyBjb21waWxlciBmbGFncyB1c2VkIHdoZW4gYnVpbGRpbmcgaW4gUmVsZWFzZSBtb2RlXCIsXG4gICAgdmFsdWU6IFsgXCItTzNcIiwgXCItRE5ERUJVR1wiIF0sXG4gIH0sXG4gIENYWF9DT01QSUxFUjoge1xuICAgIGRlc2NyaXB0aW9uOiBcIlBhdGggdG8gdGhlIEMrKyBjb21waWxlciBkZXRlY3RlZFwiLFxuICAgIHZhbHVlOiBcIlwiLFxuICB9LFxuICBDWFhfRkxBR1M6IHtcbiAgICBkZXNjcmlwdGlvbjogXCJGbGFncyBwYXNzZWQgdG8gdGhlIEMgY29tcGlsZXJcIixcbiAgICB2YWx1ZTogW10sXG4gIH0sXG4gIENYWF9GTEFHU19ERUJVRzoge1xuICAgIGRlc2NyaXB0aW9uOiBcIkFkZGl0aW9uYWwgQysrIGNvbXBpbGVyIGZsYWdzIHVzZWQgd2hlbiBidWlsZGluZyBpbiBEZWJ1ZyBtb2RlXCIsXG4gICAgdmFsdWU6IFsgXCItZ1wiIF0sXG4gIH0sXG4gIENYWF9GTEFHU19SRUxFQVNFOiB7XG4gICAgZGVzY3JpcHRpb246IFwiQWRkaXRpb25hbCBDKysgY29tcGlsZXIgZmxhZ3MgdXNlZCB3aGVuIGJ1aWxkaW5nIGluIFJlbGVhc2UgbW9kZVwiLFxuICAgIHZhbHVlOiBbIFwiLU8zXCIsIFwiLUROREVCVUdcIiBdLFxuICB9LFxuICBBUjoge1xuICAgIGRlc2NyaXB0aW9uOiBcIlBhdGggdG8gdGhlIGFyY2hpdmVyIHRvb2wgdXNlZCB0byBjcmVhdGUgc3RhdGljIGxpYnJhcmllc1wiLFxuICAgIHZhbHVlOiBcIlwiLFxuICB9LFxuICBSQU5MSUI6IHtcbiAgICBkZXNjcmlwdGlvbjogXCJUb29sIHVzZWQgdG8gZ2VuZXJhdGUgYW4gaW5kZXggdG8gdGhlIGNvbnRlbnRzIG9mIGFuIGFyY2hpdmUgKHN0YXRpYyBsaWJyYXJ5KVwiLFxuICAgIHZhbHVlOiBcIlwiLFxuICB9LFxuICBMSU5LRVI6IHtcbiAgICBkZXNjcmlwdGlvbjogXCJQYXRoIHRvIHRoZSBsaW5rZXIgdXNlZCB0byBsaW5rIG9iamVjdCBmaWxlcyBhbmQgbGlicmFyaWVzIGludG8gZXhlY3V0YWJsZXNcIixcbiAgICB2YWx1ZTogXCJcIixcbiAgfSxcbiAgTk06IHtcbiAgICBkZXNjcmlwdGlvbjogXCJQYXRoIHRvIHRoZSB0b29sIHVzZWQgdG8gbGlzdCBzeW1ib2xzIGZyb20gb2JqZWN0IGZpbGVzIG9yIGFyY2hpdmVzXCIsXG4gICAgdmFsdWU6IFwiXCIsXG4gIH0sXG4gIE9CSkNPUFk6IHtcbiAgICBkZXNjcmlwdGlvbjogXCJQYXRoIHRvIHRoZSB0b29sIHVzZWQgdG8gY29weSBhbmQgdHJhbnNsYXRlIG9iamVjdCBmaWxlc1wiLFxuICAgIHZhbHVlOiBcIlwiLFxuICB9LFxuICBPQkpEVU1QOiB7XG4gICAgZGVzY3JpcHRpb246IFwiUGF0aCB0byB0aGUgdG9vbCB1c2VkIHRvIGRpc3BsYXkgaW5mb3JtYXRpb24gYWJvdXQgb2JqZWN0IGZpbGVzLCBzdWNoIGFzIGRpc2Fzc2VtYmx5XCIsXG4gICAgdmFsdWU6IFwiXCIsXG4gIH0sXG4gIFNUUklQOiB7XG4gICAgZGVzY3JpcHRpb246IFwiUGF0aCB0byB0aGUgdG9vbCB1c2VkIHRvIHJlbW92ZSBzeW1ib2xzIGZyb20gb2JqZWN0IGZpbGVzIG9yIGV4ZWN1dGFibGVzIHRvIHJlZHVjZSBzaXplXCIsXG4gICAgdmFsdWU6IFwiXCIsXG4gIH0sXG4gIE9CSkVDVF9MSUJSQVJZX1BSRUZJWDoge1xuICAgIGRlc2NyaXB0aW9uOiBcIlByZWZpeCB1c2VkIGZvciBvYmplY3QgbGlicmFyaWVzXCIsXG4gICAgdmFsdWU6IFwiXCIsXG4gIH0sXG4gIE9CSkVDVF9MSUJSQVJZX1NVRkZJWDoge1xuICAgIGRlc2NyaXB0aW9uOiBcIlN1ZmZpeCB1c2VkIGZvciBvYmplY3QgbGlicmFyeSBmaWxlc1wiLFxuICAgIHZhbHVlOiBcIi5vXCIsXG4gIH0sXG4gIE9CSkVDVF9MSU5LRVJfRkxBR1M6IHtcbiAgICBkZXNjcmlwdGlvbjogXCJGbGFncyBwYXNzZWQgdG8gdGhlIGxpbmtlciB3aGVuIGNyZWF0aW5nIG9iamVjdCBsaWJyYXJpZXNcIixcbiAgICB2YWx1ZTogW10sXG4gIH0sXG4gIFNUQVRJQ19MSUJSQVJZX1BSRUZJWDoge1xuICAgIGRlc2NyaXB0aW9uOiBcIlByZWZpeCB1c2VkIGZvciBzdGF0aWMgbGlicmFyeSBmaWxlc1wiLFxuICAgIHZhbHVlOiBcImxpYlwiLFxuICB9LFxuICBTVEFUSUNfTElCUkFSWV9TVUZGSVg6IHtcbiAgICBkZXNjcmlwdGlvbjogXCJTdWZmaXggdXNlZCBmb3Igc3RhdGljIGxpYnJhcnkgZmlsZXNcIixcbiAgICB2YWx1ZTogXCIuYVwiLFxuICB9LFxuICBTVEFUSUNfTElOS0VSX0ZMQUdTOiB7XG4gICAgZGVzY3JpcHRpb246IFwiRmxhZ3MgcGFzc2VkIHRvIHRoZSBsaW5rZXIgd2hlbiBjcmVhdGluZyBzdGF0aWMgbGlicmFyaWVzXCIsXG4gICAgdmFsdWU6IFtdLFxuICB9LFxuICBTSEFSRURfTElCUkFSWV9QUkVGSVg6IHtcbiAgICBkZXNjcmlwdGlvbjogXCJQcmVmaXggdXNlZCBmb3Igc2hhcmVkIGxpYnJhcnkgZmlsZXNcIixcbiAgICB2YWx1ZTogXCJsaWJcIixcbiAgfSxcbiAgU0hBUkVEX0xJQlJBUllfU1VGRklYOiB7XG4gICAgZGVzY3JpcHRpb246IFwiU3VmZml4IHVzZWQgZm9yIHNoYXJlZCBsaWJyYXJ5IGZpbGVzXCIsXG4gICAgdmFsdWU6IFwiLnNvXCIsXG4gIH0sXG4gIFNIQVJFRF9MSU5LRVJfRkxBR1M6IHtcbiAgICBkZXNjcmlwdGlvbjogXCJGbGFncyBwYXNzZWQgdG8gdGhlIGxpbmtlciB3aGVuIGNyZWF0aW5nIHNoYXJlZCBsaWJyYXJpZXNcIixcbiAgICB2YWx1ZTogW10sXG4gIH0sXG4gIEVYRUNVVEFCTEVfU1VGRklYOiB7XG4gICAgZGVzY3JpcHRpb246IFwiU3VmZml4IHVzZWQgZm9yIGV4ZWN1dGFibGUgZmlsZXNcIixcbiAgICB2YWx1ZTogSG9zdC5leGVjdXRhYmxlU3VmZml4LFxuICB9LFxuICBFWEVfTElOS0VSX0ZMQUdTOiB7XG4gICAgZGVzY3JpcHRpb246IFwiRmxhZ3MgcGFzc2VkIHRvIHRoZSBsaW5rZXIgd2hlbiBjcmVhdGluZyBleGVjdXRhYmxlc1wiLFxuICAgIHZhbHVlOiBbXSxcbiAgfSxcbiAgR0xPQkFMX0NPTlRFWFRfSlNPTjoge1xuICAgIGRlc2NyaXB0aW9uOiBcIkZpbGVuYW1lIGZvciBKU09OIG9mIHRoZSBHbG9iYWwgY29udGV4dFwiLFxuICAgIHR5cGU6IFwiRmlsZVBhdGhcIixcbiAgfSxcbiAgVEFSR0VUX0dPQUxTX0pTT046IHtcbiAgICBkZXNjcmlwdGlvbjogXCJGaWxlbmFtZSBmb3IgSlNPTiBvZiB0aGUgVGFyZ2V0IEdvYWxzXCIsXG4gICAgdHlwZTogXCJGaWxlUGF0aFwiLFxuICB9LFxuICBTSVpFT0ZfVk9JRF9QOiB7XG4gICAgZGVzY3JpcHRpb246IFwiRGVmaW5lcyB0aGUgc2l6ZSAoaW4gYnl0ZXMpIG9mIGEgdm9pZCBwb2ludGVyIG9uIHRoZSB0YXJnZXQgYXJjaGl0ZWN0dXJlXCIsXG4gICAgdHlwZTogWyA0LCA4IF0sXG4gICAgdmFsdWU6IEhvc3Quc2l6ZW9mVm9pZHAsXG4gIH0sXG4gIE1BS0VfUExVR0lOX0xJU1Q6IHtcbiAgICBkZXNjcmlwdGlvbjogXCJMaXN0IG9mIHBhdGhzIHRvIHBsdWdpbnNcIixcbiAgICB2YWx1ZTogW10sXG4gIH0sXG4gIEhPU1RfRVhFQ1VUQUJMRV9TVUZGSVg6IHtcbiAgICBkZXNjcmlwdGlvbjogXCJEZWZpbmVzIHRoZSBmaWxlIGV4dGVuc2lvbiBmb3IgZXhlY3V0YWJsZXMgb24gdGhlIGhvc3Qgc3lzdGVtXCIsXG4gICAgdmFsdWU6IEhvc3QuZXhlY3V0YWJsZVN1ZmZpeCxcbiAgICAvLyBSZWFkb25seVxuICB9LFxufTtcbiIsIi8qXG4gKiBNSVQgTGljZW5zZVxuICpcbiAqIENvcHlyaWdodCAoYykgMjAyNSAgWXVyaWkgWWFrdWJpbiAoeXVyaWkueWFrdWJpbkBnbWFpbC5jb20pXG4gKlxuICogUGVybWlzc2lvbiBpcyBncmFudGVkIHRvIHVzZSwgY29weSwgbW9kaWZ5LCBhbmQgZGlzdHJpYnV0ZSB0aGlzIHNvZnR3YXJlXG4gKiB1bmRlciB0aGUgTUlUIExpY2Vuc2UuIFNlZSBMSUNFTlNFIGZpbGUgZm9yIGRldGFpbHMuXG4gKi9cblxuaW1wb3J0IHsgSW50ZXJmYWNlVGFyZ2V0IH0gZnJvbSBcIkAvY29yZS9NYWtlSW50ZXJmYWNlc1wiO1xuaW1wb3J0IHsgU291cmNlRmlsZSB9IGZyb20gXCJAL2NvcmUvU291cmNlRmlsZVwiO1xuaW1wb3J0IHsgU291cmNlRmlsZUxpc3QgfSBmcm9tIFwiQC9jb3JlL1NvdXJjZUZpbGVMaXN0XCI7XG5pbXBvcnQgeyBUYXJnZXROYW1lIH0gZnJvbSBcIkAvY29yZS9UYXJnZXROYW1lXCI7XG5pbXBvcnQgeyBUYXJnZXRGaWxlIH0gZnJvbSBcIkAvY29yZS9UYXJnZXRGaWxlXCI7XG5pbXBvcnQgeyBUYXJnZXRJbmNsdWRlcyB9IGZyb20gXCJAL2NvcmUvVGFyZ2V0SW5jbHVkZXNcIjtcbmltcG9ydCB7IFRhcmdldE9iamVjdHMgfSBmcm9tIFwiQC9jb3JlL1RhcmdldE9iamVjdHNcIjtcbmltcG9ydCB7IEFic29sdXRlUGF0aCB9IGZyb20gXCJAL2NvcmUvQWJzb2x1dGVQYXRoXCI7XG5pbXBvcnQgeyBTY29wZUhlbHBlciwgVmFyaWFibGVNYXAgfSBmcm9tIFwiQC9jb3JlL1Njb3BlXCI7XG5pbXBvcnQgeyBTeXN0ZW1TY29wZSB9IGZyb20gXCJAL2NvcmUvU3lzdGVtU2NvcGVcIjtcbmltcG9ydCB7IFNZU1RFTV9WQVJJQUJMRV9HUk9VUCB9IGZyb20gXCJAL0NvbnN0YW50c1wiO1xuaW1wb3J0IHsgbm9ybWFsaXplRGVmaW5pdGlvbnMgfSBmcm9tIFwiQC9jb3JlL0RlZmluaXRpb25IZWxwZXJcIjtcbmltcG9ydCB7IFNpbXBsZU9iamVjdCB9IGZyb20gXCIuL1NpbXBsZU9iamVjdFwiO1xuaW1wb3J0IHsgQUxMX1RBUkdFVCwgSU5TVEFMTF9UQVJHRVQgfSBmcm9tIFwiQC9Db25zdGFudHNcIjtcblxuY29uc3QgX2xhbmd1YWdlRXh0ZW5zaW9ucyA9IHtcbiAgQVNNOiBbIFwiLmFzbVwiLCBcIi5zXCIgXSxcbiAgQzogICBbIFwiLmNcIiBdLFxuICBDWFg6IFtcIi5jcHBcIiwgXCIuY2NcIiwgXCIuY3h4XCIgXSxcbn07XG5cbmZ1bmN0aW9uIG5vcm1hbGl6ZUluY2x1ZGVzKGJhc2VEaXI6IEFic29sdXRlUGF0aCwgLi4uaW5jbHVkZXM6IGFueVtdKTogQXJyYXk8QWJzb2x1dGVQYXRoIHwgVGFyZ2V0SW5jbHVkZXM+IHtcbiAgY29uc3QgcmVzdWx0ID0gW107XG4gIGZvciAoY29uc3QgaXRlciBvZiBpbmNsdWRlcy5mbGF0KCkpIHtcbiAgICBpZiAoaXRlciBpbnN0YW5jZW9mIFRhcmdldEluY2x1ZGVzKVxuICAgICAgcmVzdWx0LnB1c2goaXRlcik7XG4gICAgZWxzZSBpZiAodHlwZW9mIGl0ZXIgPT09IFwic3RyaW5nXCIpXG4gICAgICByZXN1bHQucHVzaChBYnNvbHV0ZVBhdGguY3JlYXRlKGJhc2VEaXIucmVzb2x2ZShpdGVyKSkpO1xuICAgIGVsc2UgaWYgKGl0ZXIgaW5zdGFuY2VvZiBBYnNvbHV0ZVBhdGgpXG4gICAgICByZXN1bHQucHVzaChBYnNvbHV0ZVBhdGguY3JlYXRlKGl0ZXIpKTtcbiAgICBlbHNlXG4gICAgICB0aHJvdyBuZXcgRXJyb3IoYE5vdCBzdXBwb3J0IGluc3RhbmNlICR7aXRlcn1gKTtcbiAgfVxuICByZXR1cm4gcmVzdWx0O1xufVxuXG5mdW5jdGlvbiBpc1N1cHBvcnRMYW5ndWFnZShsYW5ndWFnZTogc3RyaW5nKSB7XG4gIHJldHVybiBfbGFuZ3VhZ2VFeHRlbnNpb25zLmhhc093blByb3BlcnR5KGxhbmd1YWdlKTtcbn1cblxuZnVuY3Rpb24gZ2V0RmlsZUxhbmd1YWdlKGZpbGVuYW1lOiBzdHJpbmcpIHtcbiAgY29uc3QgZmlsZW5hbWVMb3dlckNhc2UgPSBmaWxlbmFtZS50b0xvd2VyQ2FzZSgpO1xuICBmb3IgKGNvbnN0IFtsYW5ndWFnZSwgZXh0ZW5zaW9uc10gb2YgT2JqZWN0LmVudHJpZXMoX2xhbmd1YWdlRXh0ZW5zaW9ucykpIHtcbiAgICBmb3IgKGNvbnN0IGl0ZXIgb2YgZXh0ZW5zaW9ucykge1xuICAgICAgaWYgKGZpbGVuYW1lTG93ZXJDYXNlLmVuZHNXaXRoKGl0ZXIpKVxuICAgICAgICByZXR1cm4gbGFuZ3VhZ2U7XG4gICAgfVxuICB9XG4gIHJldHVybiBcIlwiO1xufVxuXG5mdW5jdGlvbiBtYWtlTGFuZ3VhZ2UodmFsdWU6IHN0cmluZykge1xuICBpZiAoaXNTdXBwb3J0TGFuZ3VhZ2UodmFsdWUpKVxuICAgIHJldHVybiB2YWx1ZTtcbiAgdGhyb3cgbmV3IEVycm9yKGBMYW5ndWFnZSBcIiR7dmFsdWV9XCIgaXMgbm90IHN1cHBvcnRlZGApO1xufVxuXG5mdW5jdGlvbiBjcmVhdGVTb3VyY2VzKHNjb3BlOiBTeXN0ZW1TY29wZSwgc291cmNlOiBUYXJnZXRPYmplY3RzIHwgU291cmNlRmlsZSB8IEFic29sdXRlUGF0aCB8IHN0cmluZyk6IFRhcmdldE9iamVjdHMgfCBTb3VyY2VGaWxlIHtcbiAgaWYgKHNvdXJjZSBpbnN0YW5jZW9mIFRhcmdldE9iamVjdHMgfHwgc291cmNlIGluc3RhbmNlb2YgU291cmNlRmlsZSlcbiAgICByZXR1cm4gc291cmNlO1xuXG4gIGlmICh0eXBlb2Ygc291cmNlID09PSBcInN0cmluZ1wiIHx8IEFic29sdXRlUGF0aC5pc0Fic29sdXRlKHNvdXJjZSkpIHtcbiAgICBjb25zdCBmaWxlbmFtZSA9IHNjb3BlLlNPVVJDRV9ESVIucmVzb2x2ZShzb3VyY2UpO1xuICAgIGNvbnN0IGxhbmd1YWdlID0gZ2V0RmlsZUxhbmd1YWdlKGZpbGVuYW1lLnRvU3RyaW5nKCkpO1xuICAgIGNvbnN0IGNvbXBpbGVGbGFncyA9ICFsYW5ndWFnZSA/IFtdIDogW1xuICAgICAgLi4uKHNjb3BlIGFzIGFueSlbbGFuZ3VhZ2UgKyBcIl9GTEFHU1wiXSxcbiAgICAgIC4uLihzY29wZSBhcyBhbnkpW2xhbmd1YWdlICsgXCJfRkxBR1NfXCIgKyBzY29wZS5CVUlMRF9UWVBFLnRvVXBwZXJDYXNlKCldLFxuICAgIF07XG4gICAgcmV0dXJuIFNvdXJjZUZpbGUuY3JlYXRlKGZpbGVuYW1lLCBzY29wZS5TT1VSQ0VfRElSLCBsYW5ndWFnZSwgY29tcGlsZUZsYWdzKTtcbiAgfVxuICBcbiAgdGhyb3cgbmV3IEVycm9yKGBOb3Qgc3VwcG9ydCBpbnN0YW5jZSAke3NvdXJjZX1gKTtcbn1cblxuZXhwb3J0IGludGVyZmFjZSBUYXJnZXRDb21tYW5kIHtcbiAgY29tbWFuZDogc3RyaW5nIHwgQWJzb2x1dGVQYXRoIHwgVGFyZ2V0RmlsZTtcbiAgYXJnczogQXJyYXk8c3RyaW5nIHwgQWJzb2x1dGVQYXRoIHwgVGFyZ2V0RmlsZT47XG59O1xuXG5mdW5jdGlvbiBtYWtlVGFyZ2V0Q29tbWFuZChfY29tbWFuZDogYW55LCBfYXJnczogYW55W10pOiBUYXJnZXRDb21tYW5kIHtcbiAgbGV0IGNvbW1hbmQ6IHN0cmluZyB8IEFic29sdXRlUGF0aCB8IFRhcmdldEZpbGU7XG4gIGlmICh0eXBlb2YgX2NvbW1hbmQgPT09IFwic3RyaW5nXCIpXG4gICAgY29tbWFuZCA9IF9jb21tYW5kO1xuICBlbHNlIGlmIChfY29tbWFuZCBpbnN0YW5jZW9mIFRhcmdldEZpbGUpXG4gICAgY29tbWFuZCA9IF9jb21tYW5kO1xuICBlbHNlIGlmIChfY29tbWFuZCBpbnN0YW5jZW9mIEFic29sdXRlUGF0aClcbiAgICBjb21tYW5kID0gX2NvbW1hbmQ7XG4gIGVsc2VcbiAgICB0aHJvdyBuZXcgVHlwZUVycm9yKGBXcm9uZyB0eXBlICR7X2NvbW1hbmR9IGZvciBjb21tYW5kYCk7XG5cbiAgY29uc3QgYXJncyA9IG5ldyBBcnJheTxzdHJpbmcgfCBBYnNvbHV0ZVBhdGggfCBUYXJnZXRGaWxlPjtcbiAgZm9yIChjb25zdCBpdGVyIG9mIF9hcmdzKSB7XG4gICAgaWYgKHR5cGVvZiBpdGVyID09PSBcInN0cmluZ1wiKVxuICAgICAgYXJncy5wdXNoKGl0ZXIpO1xuICAgIGVsc2UgaWYgKGl0ZXIgaW5zdGFuY2VvZiBUYXJnZXRGaWxlKVxuICAgICAgYXJncy5wdXNoKGl0ZXIpO1xuICAgIGVsc2UgaWYgKGl0ZXIgaW5zdGFuY2VvZiBBYnNvbHV0ZVBhdGgpXG4gICAgICBhcmdzLnB1c2goaXRlcik7XG4gICAgZWxzZVxuICAgICAgdGhyb3cgbmV3IFR5cGVFcnJvcihgV3JvbmcgdHlwZSAke2l0ZXJ9IGZvciBhcmd1bWVudGApO1xuICB9XG5cbiAgcmV0dXJuIHsgY29tbWFuZCwgYXJncyB9O1xufVxuXG5jb25zdCBUQVJHRVRfU0NPUEUgPSBTeW1ib2woXCJUQVJHRVRfU0NPUEVcIik7XG5cbmludGVyZmFjZSBUYXJnZXRWYWx1ZTxUPiB7XG4gIHZhbHVlOiBUO1xuICBwdWJsaWNPbmx5OiBib29sZWFuO1xufTtcblxudHlwZSBUYXJnZXRWYWx1ZUxpc3Q8VD4gPSBBcnJheTxUYXJnZXRWYWx1ZTxUPj47XG5cbmV4cG9ydCBpbnRlcmZhY2UgQmFzZVRhcmdldE9wdGlvbnMge1xuICBuYW1lOiBzdHJpbmc7XG4gIHNvdXJjZURpcjogQWJzb2x1dGVQYXRoO1xuICBiaW5hcnlEaXI6IEFic29sdXRlUGF0aDtcbn07XG5cbmV4cG9ydCBhYnN0cmFjdCBjbGFzcyBCYXNlVGFyZ2V0IHtcbiAgcHJvdGVjdGVkIFtUQVJHRVRfU0NPUEVdOiBTeXN0ZW1TY29wZTtcblxuICBwcm90ZWN0ZWQgX25hbWU6IHN0cmluZztcbiAgcHJvdGVjdGVkIF9zb3VyY2VEaXI6IEFic29sdXRlUGF0aDtcbiAgcHJvdGVjdGVkIF9iaW5hcnlEaXI6IEFic29sdXRlUGF0aDtcbiAgcHJvdGVjdGVkIF9pbmNsdWRlczogVGFyZ2V0VmFsdWVMaXN0PEFic29sdXRlUGF0aCB8IFRhcmdldEluY2x1ZGVzPjtcbiAgcHJvdGVjdGVkIF9kZWZpbml0aW9uczogVGFyZ2V0VmFsdWVMaXN0PHN0cmluZz47XG4gIHByb3RlY3RlZCBfY29tcGlsZU9wdGlvbnM6IFRhcmdldFZhbHVlTGlzdDxzdHJpbmcgfCBzdHJpbmdbXT47XG4gIHByb3RlY3RlZCBfbGlua09wdGlvbnM6IFRhcmdldFZhbHVlTGlzdDxzdHJpbmcgfCBzdHJpbmdbXT47XG4gIHByb3RlY3RlZCBfbGlicmFyaWVzOiBUYXJnZXRWYWx1ZUxpc3Q8VGFyZ2V0TmFtZT47XG4gIHByb3RlY3RlZCBfc291cmNlczogVGFyZ2V0VmFsdWVMaXN0PFRhcmdldE9iamVjdHMgfCBTb3VyY2VGaWxlPjtcbiAgcHJvdGVjdGVkIF9wcmVCdWlsZExpc3Q6IFRhcmdldENvbW1hbmRbXTtcbiAgcHJvdGVjdGVkIF9wb3N0QnVpbGRMaXN0OiBUYXJnZXRDb21tYW5kW107XG5cbiAgY29uc3RydWN0b3IodmFyaWFibGVNYXA6IFZhcmlhYmxlTWFwLCBvcHRpb25zOiBCYXNlVGFyZ2V0T3B0aW9ucykge1xuICAgIGNvbnN0IG5hbWUgPSBvcHRpb25zLm5hbWU7XG4gICAgaWYgKHR5cGVvZiBuYW1lICE9PSBcInN0cmluZ1wiKVxuICAgICAgdGhyb3cgbmV3IEVycm9yKGBUYXJnZXQgXCIke25hbWV9XCIgaXMgbm90IHN0cmluZyB0eXBlYCk7XG5cbiAgICBpZiAoIW5hbWUpXG4gICAgICB0aHJvdyBuZXcgRXJyb3IoYEEgdGFyZ2V0IHdpdGggYW4gZW1wdHkgbmFtZSBjYW5ub3QgZXhpc3RgKTtcblxuICAgIGlmIChbIEFMTF9UQVJHRVQsIElOU1RBTExfVEFSR0VUIF0uaW5jbHVkZXMobmFtZSkpXG4gICAgICB0aHJvdyBuZXcgRXJyb3IoYFRhcmdldCBcIiR7bmFtZX1cIiBpcyByZXNlcnZlZCBuYW1lYCk7XG5cbiAgICBjb25zdCB2YXJpYWJsZXMgPSBTY29wZUhlbHBlci5jcmVhdGVWYXJpYWJsZVZhbHVlcyh2YXJpYWJsZU1hcCwgU1lTVEVNX1ZBUklBQkxFX0dST1VQKSBhcyBTeXN0ZW1TY29wZTtcbiAgICB0aGlzW1RBUkdFVF9TQ09QRV0gPSB2YXJpYWJsZXM7XG4gICAgdGhpcy5fbmFtZSA9IG9wdGlvbnMubmFtZTtcbiAgICB0aGlzLl9zb3VyY2VEaXIgPSBvcHRpb25zLnNvdXJjZURpcjtcbiAgICB0aGlzLl9iaW5hcnlEaXIgPSBvcHRpb25zLmJpbmFyeURpcjtcbiAgICB0aGlzLl9pbmNsdWRlcyA9IFtdO1xuICAgIHRoaXMuX2RlZmluaXRpb25zID0gW107XG4gICAgdGhpcy5fY29tcGlsZU9wdGlvbnMgPSBbXTtcbiAgICB0aGlzLl9saW5rT3B0aW9ucyA9IFtdO1xuICAgIHRoaXMuX2xpYnJhcmllcyA9IFtdO1xuICAgIHRoaXMuX3NvdXJjZXMgPSBbXTtcbiAgICB0aGlzLl9wcmVCdWlsZExpc3QgPSBbXTtcbiAgICB0aGlzLl9wb3N0QnVpbGRMaXN0ID0gW107XG4gIH1cblxuICBhYnN0cmFjdCBzZXRQcmVmaXgodmFsdWU6IHN0cmluZykgOiB2b2lkO1xuICBhYnN0cmFjdCBzZXRPdXRwdXROYW1lKHZhbHVlOiBhbnkpIDogdm9pZDtcbiAgYWJzdHJhY3Qgc2V0U3VmZml4KHZhbHVlOiBzdHJpbmcpIDogdm9pZDtcbiAgYWJzdHJhY3Qgc2V0UG9zaXRpb25JbmRlcGVuZGVudENvZGUodmFsdWU6IGJvb2xlYW4pIDogdm9pZDtcblxuICBwdWJsaWMgZ2V0IHRhcmdldE5hbWUoKSB7XG4gICAgcmV0dXJuIHRoaXMuX25hbWU7XG4gIH1cblxuICBwdWJsaWMgZ2V0IG5hbWUoKSB7IC8vIERFTE1FXG4gICAgcmV0dXJuIHRoaXMuX25hbWU7XG4gIH1cblxuICBwdWJsaWMgZ2V0IHNvdXJjZURpcigpIHtcbiAgICByZXR1cm4gdGhpcy5fc291cmNlRGlyO1xuICB9XG5cbiAgcHVibGljIGdldCBiaW5hcnlEaXIoKSB7XG4gICAgcmV0dXJuIHRoaXMuX2JpbmFyeURpcjtcbiAgfVxuXG4gIHB1YmxpYyBnZXQgaW5jbHVkZXMoKTogVGFyZ2V0SW5jbHVkZXMge1xuICAgIHJldHVybiBUYXJnZXRJbmNsdWRlcy5jcmVhdGUodGhpcy5fbmFtZSk7XG4gIH1cblxuICBwdWJsaWMgZ2V0IG9iamVjdHMoKTogVGFyZ2V0T2JqZWN0cyB7XG4gICAgcmV0dXJuIFRhcmdldE9iamVjdHMuY3JlYXRlKHRoaXMuX25hbWUpO1xuICB9XG5cbiAgcHVibGljIGdldCB0YXJnZXRGaWxlKCk6IFRhcmdldEZpbGUge1xuICAgIHJldHVybiBUYXJnZXRGaWxlLmNyZWF0ZSh0aGlzLl9uYW1lKTtcbiAgfVxuXG4gIHB1YmxpYyBnZXRJbmNsdWRlcygpOiBBcnJheTxBYnNvbHV0ZVBhdGggfCBUYXJnZXRJbmNsdWRlcz4ge1xuICAgIHJldHVybiB0aGlzLl9pbmNsdWRlcy5tYXAoaSA9PiBpLnZhbHVlKTtcbiAgfVxuXG4gIHB1YmxpYyBnZXRQdWJsaWNJbmNsdWRlcygpOiBBcnJheTxBYnNvbHV0ZVBhdGggfCBUYXJnZXRJbmNsdWRlcz4ge1xuICAgIHJldHVybiB0aGlzLl9pbmNsdWRlcy5maWx0ZXIoaSA9PiBpLnB1YmxpY09ubHkpLm1hcChpID0+IGkudmFsdWUpO1xuICB9XG5cbiAgcHVibGljIGFkZEluY2x1ZGVzKC4uLmluY2x1ZGVzOiBBcnJheTxUYXJnZXRJbmNsdWRlcyB8IEFic29sdXRlUGF0aCB8IHN0cmluZz4pOiB2b2lkIHtcbiAgICB0aGlzLmFkZEluY2x1ZGVzSW1wbChmYWxzZSwgLi4uaW5jbHVkZXMpO1xuICB9XG5cbiAgcHVibGljIGFkZFB1YmxpY0luY2x1ZGVzKC4uLmluY2x1ZGVzOiBBcnJheTxUYXJnZXRJbmNsdWRlcyB8IEFic29sdXRlUGF0aCB8IHN0cmluZz4pOiB2b2lkIHtcbiAgICB0aGlzLmFkZEluY2x1ZGVzSW1wbCh0cnVlLCAuLi5pbmNsdWRlcyk7XG4gIH1cblxuICBwdWJsaWMgYWRkSW5jbHVkZUltcGwocHVibGljT25seTogYm9vbGVhbiwgdmFsdWU6IEFic29sdXRlUGF0aCB8IFRhcmdldEluY2x1ZGVzKTogdm9pZCB7XG4gICAgdGhpcy5faW5jbHVkZXMucHVzaCh7cHVibGljT25seSwgdmFsdWV9KTtcbiAgfVxuXG4gIHB1YmxpYyBhZGRJbmNsdWRlc0ltcGwocHVibGljT25seTogYm9vbGVhbiwgLi4uaW5jbHVkZXM6IEFycmF5PFRhcmdldEluY2x1ZGVzIHwgQWJzb2x1dGVQYXRoIHwgc3RyaW5nPik6IHZvaWQge1xuICAgIGZvciAoY29uc3QgaXRlciBvZiBub3JtYWxpemVJbmNsdWRlcyh0aGlzLl9zb3VyY2VEaXIsIC4uLmluY2x1ZGVzKSlcbiAgICAgIHRoaXMuYWRkSW5jbHVkZUltcGwocHVibGljT25seSwgaXRlcik7XG4gIH1cblxuICBwdWJsaWMgZ2V0RGVmaW5pdGlvbnMoKTogQXJyYXk8c3RyaW5nPiB7XG4gICAgcmV0dXJuIHRoaXMuX2RlZmluaXRpb25zLm1hcChpID0+IGkudmFsdWUpO1xuICB9XG5cbiAgcHVibGljIGdldFB1YmxpY0RlZmluaXRpb25zKCk6IEFycmF5PHN0cmluZz4ge1xuICAgIHJldHVybiB0aGlzLl9kZWZpbml0aW9ucy5maWx0ZXIoaSA9PiBpLnB1YmxpY09ubHkpLm1hcChpID0+IGkudmFsdWUpO1xuICB9XG5cbiAgcHVibGljIGFkZERlZmluaXRpb25zKC4uLmRlZmluaXRpb25zOiBhbnkpOiB2b2lkIHtcbiAgICB0aGlzLmFkZERlZmluaXRpb25zSW1wbChmYWxzZSwgLi4uZGVmaW5pdGlvbnMpO1xuICB9XG5cbiAgcHVibGljIGFkZFB1YmxpY0RlZmluaXRpb25zKC4uLmRlZmluaXRpb25zOiBhbnkpOiB2b2lkIHtcbiAgICB0aGlzLmFkZERlZmluaXRpb25zSW1wbCh0cnVlLCAuLi5kZWZpbml0aW9ucyk7XG4gIH1cblxuICBwdWJsaWMgYWRkRGVmaW5pdGlvbnNJbXBsKHB1YmxpY09ubHk6IGJvb2xlYW4sIC4uLmRlZmluaXRpb25zOiBBcnJheTxzdHJpbmcgfCBvYmplY3Q+KTogdm9pZCB7XG4gICAgZm9yIChjb25zdCB2YWx1ZSBvZiBub3JtYWxpemVEZWZpbml0aW9ucyguLi5kZWZpbml0aW9ucykpXG4gICAgICB0aGlzLl9kZWZpbml0aW9ucy5wdXNoKHtwdWJsaWNPbmx5LCB2YWx1ZX0pO1xuICB9XG5cbiAgcHVibGljIGdldENvbXBpbGVPcHRpb25zKCk6IEFycmF5PHN0cmluZyB8IHN0cmluZ1tdPiB7XG4gICAgcmV0dXJuIHRoaXMuX2NvbXBpbGVPcHRpb25zLm1hcChpID0+IGkudmFsdWUpO1xuICB9XG4gIFxuICBwdWJsaWMgZ2V0UHVibGljQ29tcGlsZU9wdGlvbnMoKTogQXJyYXk8c3RyaW5nfHN0cmluZ1tdPiB7XG4gICAgcmV0dXJuIHRoaXMuX2NvbXBpbGVPcHRpb25zLmZpbHRlcihpID0+IGkucHVibGljT25seSkubWFwKGkgPT4gaS52YWx1ZSk7XG4gIH1cblxuICBwdWJsaWMgYWRkQ29tcGlsZU9wdGlvbnMoLi4ub3B0aW9uczogQXJyYXk8c3RyaW5nIHwgc3RyaW5nW10+KTogdm9pZCB7XG4gICAgdGhpcy5hZGRDb21waWxlT3B0aW9uc0ltcGwoZmFsc2UsIC4uLm9wdGlvbnMpO1xuICB9XG5cbiAgcHVibGljIGFkZFB1YmxpY0NvbXBpbGVPcHRpb25zKC4uLm9wdGlvbnM6IEFycmF5PHN0cmluZyB8IHN0cmluZ1tdPik6IHZvaWQge1xuICAgIHRoaXMuYWRkQ29tcGlsZU9wdGlvbnNJbXBsKHRydWUsIC4uLm9wdGlvbnMpO1xuICB9XG5cbiAgcHVibGljIGFkZENvbXBpbGVPcHRpb25zSW1wbChwdWJsaWNPbmx5OiBib29sZWFuLCAuLi5vcHRpb25zOiBBcnJheTxzdHJpbmcgfCBzdHJpbmdbXT4pOiB2b2lkIHtcbiAgICBmb3IgKGNvbnN0IHZhbHVlIG9mIG9wdGlvbnMuZmxhdCgpKVxuICAgICAgdGhpcy5fY29tcGlsZU9wdGlvbnMucHVzaCh7cHVibGljT25seSwgdmFsdWV9KTtcbiAgfVxuXG4gIHB1YmxpYyBnZXRMaW5rT3B0aW9ucygpOiBBcnJheTxzdHJpbmcgfCBzdHJpbmdbXT4ge1xuICAgIHJldHVybiB0aGlzLl9saW5rT3B0aW9ucy5tYXAoaSA9PiBpLnZhbHVlKTtcbiAgfVxuXG4gIHB1YmxpYyBnZXRQdWJsaWNMaW5rT3B0aW9ucygpOiBBcnJheTxzdHJpbmcgfCBzdHJpbmdbXT4ge1xuICAgIHJldHVybiB0aGlzLl9saW5rT3B0aW9ucy5maWx0ZXIoaSA9PiBpLnB1YmxpY09ubHkpLm1hcChpID0+IGkudmFsdWUpO1xuICB9XG5cbiAgcHVibGljIGFkZExpbmtPcHRpb25zKC4uLm9wdGlvbnM6IEFycmF5PHN0cmluZyB8IHN0cmluZ1tdPikge1xuICAgIHRoaXMuYWRkTGlua09wdGlvbnNJbXBsKGZhbHNlLCAuLi5vcHRpb25zKTtcbiAgfVxuXG4gIHB1YmxpYyBhZGRQdWJsaWNMaW5rT3B0aW9ucyguLi5vcHRpb25zOiBBcnJheTxzdHJpbmcgfCBzdHJpbmdbXT4pIHtcbiAgICB0aGlzLmFkZExpbmtPcHRpb25zSW1wbCh0cnVlLCAuLi5vcHRpb25zKTtcbiAgfVxuXG4gIHB1YmxpYyBhZGRMaW5rT3B0aW9uc0ltcGwocHVibGljT25seTogYm9vbGVhbiwgLi4ub3B0aW9uczogQXJyYXk8c3RyaW5nIHwgc3RyaW5nW10+KSB7XG4gICAgZm9yIChjb25zdCB2YWx1ZSBvZiBvcHRpb25zLmZsYXQoKSlcbiAgICAgIHRoaXMuX2xpbmtPcHRpb25zLnB1c2goe3B1YmxpY09ubHksIHZhbHVlfSk7XG4gIH1cblxuICBwdWJsaWMgZ2V0TGlicmFyaWVzKCkge1xuICAgIHJldHVybiB0aGlzLl9saWJyYXJpZXMubWFwKGkgPT4gaS52YWx1ZSk7XG4gIH1cblxuICBwdWJsaWMgZ2V0UHVibGljTGlicmFyaWVzKCkge1xuICAgIHJldHVybiB0aGlzLl9saWJyYXJpZXMuZmlsdGVyKGkgPT4gaS5wdWJsaWNPbmx5KS5tYXAoaSA9PiBpLnZhbHVlKTtcbiAgfVxuXG4gIHB1YmxpYyBhZGRMaWJyYXJpZXMoLi4ubGlicmFyaWVzOiBQb3N0VGFyZ2V0W10pIHtcbiAgICB0aGlzLmFkZExpYnJhcmllc0ltcGwoZmFsc2UsIC4uLmxpYnJhcmllcyk7XG4gIH1cblxuICBwdWJsaWMgYWRkUHVibGljTGlicmFyaWVzKC4uLmxpYnJhcmllczogUG9zdFRhcmdldFtdKSB7XG4gICAgdGhpcy5hZGRMaWJyYXJpZXNJbXBsKHRydWUsIC4uLmxpYnJhcmllcyk7XG4gIH1cblxuICBwdWJsaWMgYWRkTGlicmFyaWVzSW1wbChwdWJsaWNPbmx5OiBib29sZWFuLCAuLi5saWJyYXJpZXM6IFBvc3RUYXJnZXRbXSkge1xuICAgIGZvciAoY29uc3QgaXRlciBvZiBsaWJyYXJpZXMuZmxhdCgpKVxuICAgICAgdGhpcy5fbGlicmFyaWVzLnB1c2goe3B1YmxpY09ubHksIHZhbHVlOiBUYXJnZXROYW1lLmNyZWF0ZShpdGVyLnRhcmdldE5hbWUpfSk7XG4gIH1cblxuICBwdWJsaWMgZ2V0SGVhZGVycygpOiBTb3VyY2VGaWxlW10ge1xuICAgIGNvbnN0IHJlc3VsdCA9IG5ldyBBcnJheTxTb3VyY2VGaWxlPjtcbiAgICBmb3IgKGNvbnN0IGl0ZXIgb2YgdGhpcy5fc291cmNlcykge1xuICAgICAgaWYgKGl0ZXIudmFsdWUgaW5zdGFuY2VvZiBTb3VyY2VGaWxlICYmIGl0ZXIudmFsdWUuSEVBREVSX0ZJTEVfT05MWSlcbiAgICAgICAgcmVzdWx0LnB1c2goaXRlci52YWx1ZSk7XG4gICAgfVxuICAgIHJldHVybiByZXN1bHQ7XG4gIH1cblxuICBwdWJsaWMgZ2V0U291cmNlcygpIHtcbiAgICByZXR1cm4gdGhpcy5fc291cmNlcztcbiAgfVxuXG4gIHB1YmxpYyBnZXRTb3VyY2VGaWxlTGlzdCgpOiBTb3VyY2VGaWxlW10ge1xuICAgIHJldHVybiB0aGlzLl9zb3VyY2VzLm1hcChpID0+IGkudmFsdWUpLmZpbHRlcihpID0+IGkgaW5zdGFuY2VvZiBTb3VyY2VGaWxlKTtcbiAgfVxuXG4gIHB1YmxpYyBnZXRUYXJnZXRPYmplY3RzTGlzdCgpOiBUYXJnZXRPYmplY3RzW10ge1xuICAgIHJldHVybiB0aGlzLl9zb3VyY2VzLm1hcChpID0+IGkudmFsdWUpLmZpbHRlcihpID0+IGkgaW5zdGFuY2VvZiBUYXJnZXRPYmplY3RzKTtcbiAgfVxuXG4gIHB1YmxpYyBnZXRTb3VyY2VGaWxlcyguLi5zb3VyY2VzOiBhbnlbXSk6IFNvdXJjZUZpbGVMaXN0IHtcbiAgICBjb25zdCByZXN1bHQgPSBbXTtcbiAgICBjb25zdCBzY29wZSA9IHRoaXNbVEFSR0VUX1NDT1BFXTtcbiAgICBjb25zdCBzb3VyY2VGaWxlcyA9IHRoaXMuZ2V0U291cmNlRmlsZUxpc3QoKTtcbiAgICBmb3IgKGNvbnN0IGl0IG9mIHNvdXJjZXMuZmxhdCgpKSB7XG4gICAgICBjb25zdCBmaWxlbmFtZSA9IHNjb3BlLlNPVVJDRV9ESVIucmVzb2x2ZShpdCkudG9TdHJpbmcoKTtcbiAgICAgIGNvbnN0IHNyYyA9IHNvdXJjZUZpbGVzLmZpbmQoaSA9PiBpLkZJTEUudG9TdHJpbmcoKSA9PT0gZmlsZW5hbWUpO1xuICAgICAgaWYgKCFzcmMpXG4gICAgICAgIHRocm93IG5ldyBFcnJvcihgQ2Fubm90IGZpbmQgXCIke2l0fVwiYCk7XG4gICAgICByZXN1bHQucHVzaChzcmMpO1xuICAgIH1cblxuICAgIGlmIChyZXN1bHQubGVuZ3RoKVxuICAgICAgcmV0dXJuIFNvdXJjZUZpbGVMaXN0LmNyZWF0ZShzY29wZSwgcmVzdWx0KTtcblxuICAgIHJldHVybiBTb3VyY2VGaWxlTGlzdC5jcmVhdGUoc2NvcGUsIHNvdXJjZUZpbGVzKTtcbiAgfVxuXG4gIHB1YmxpYyBhZGRTb3VyY2VzKC4uLnNvdXJjZXM6IEFycmF5PFRhcmdldE9iamVjdHMgfCBTb3VyY2VGaWxlIHwgQWJzb2x1dGVQYXRoIHwgc3RyaW5nPikge1xuICAgIGZvciAobGV0IGl0IG9mIHNvdXJjZXMuZmxhdCgpKSB7XG4gICAgICB0aGlzLl9zb3VyY2VzLnB1c2goe3B1YmxpY09ubHk6IGZhbHNlLCB2YWx1ZTogY3JlYXRlU291cmNlcyh0aGlzW1RBUkdFVF9TQ09QRV0sIGl0KX0pO1xuICAgIH1cbiAgfVxuXG4gIHB1YmxpYyBnZXQgcHJlQnVpbGRMaXN0KCkge1xuICAgIHJldHVybiB0aGlzLl9wcmVCdWlsZExpc3Q7XG4gIH1cblxuICBwdWJsaWMgYWRkUHJlQnVpbGQoY29tbWFuZDogYW55LCBhcmdzOiBhbnlbXSkge1xuICAgIHRoaXMuX3ByZUJ1aWxkTGlzdC5wdXNoKG1ha2VUYXJnZXRDb21tYW5kKGNvbW1hbmQsIGFyZ3MpKTtcbiAgfVxuXG4gIHB1YmxpYyBnZXQgcG9zdEJ1aWxkTGlzdCgpIHtcbiAgICByZXR1cm4gdGhpcy5fcG9zdEJ1aWxkTGlzdDtcbiAgfVxuXG4gIHB1YmxpYyBhZGRQb3N0QnVpbGQoY29tbWFuZDogYW55LCBhcmdzOiBhbnlbXSkge1xuICAgIHRoaXMuX3Bvc3RCdWlsZExpc3QucHVzaChtYWtlVGFyZ2V0Q29tbWFuZChjb21tYW5kLCBhcmdzKSk7XG4gIH1cblxuICBwdWJsaWMgdG9KU09OKCk6IG9iamVjdCB7XG4gICAgcmV0dXJuIHtcbiAgICAgIG5hbWU6IHRoaXMuX25hbWUsXG4gICAgICBzb3VyY2VEaXI6IHRoaXMuX3NvdXJjZURpcixcbiAgICAgIGJpbmFyeURpcjogdGhpcy5fYmluYXJ5RGlyLFxuICAgICAgcHJlQnVpbGRMaXN0OiB0aGlzLl9wcmVCdWlsZExpc3QsXG4gICAgICBwb3N0QnVpbGRMaXN0OiB0aGlzLl9wb3N0QnVpbGRMaXN0LFxuICAgICAgaW5jbHVkZXM6IHRoaXMuX2luY2x1ZGVzLFxuICAgICAgY29tcGlsZU9wdGlvbnM6IHRoaXMuX2NvbXBpbGVPcHRpb25zLFxuICAgICAgbGlua09wdGlvbnM6IHRoaXMuX2xpbmtPcHRpb25zLFxuICAgICAgc291cmNlczogdGhpcy5fc291cmNlcyxcbiAgICAgIGxpYnJhcmllczogdGhpcy5fbGlicmFyaWVzLFxuICAgIH1cbiAgfVxufTtcblxuZXhwb3J0IGNsYXNzIFBvc3RUYXJnZXQgZXh0ZW5kcyBCYXNlVGFyZ2V0IHtcbiAgcHJpdmF0ZSBfcHJlZml4Pzogc3RyaW5nO1xuICBwcml2YXRlIF9vdXRwdXROYW1lPzogc3RyaW5nO1xuICBwcml2YXRlIF9zdWZmaXg/OiBzdHJpbmc7XG4gIHByaXZhdGUgX3Bvc2l0aW9uSW5kZXBlbmRlbnRDb2RlPzogYm9vbGVhbjtcblxuICBwcml2YXRlIGNvbnN0cnVjdG9yKHZhcmlhYmxlTWFwOiBWYXJpYWJsZU1hcCwgb3B0aW9uczogQmFzZVRhcmdldE9wdGlvbnMpIHtcbiAgICBzdXBlcih2YXJpYWJsZU1hcCwgb3B0aW9ucyk7XG4gIH1cblxuICBwdWJsaWMgc3RhdGljIGNyZWF0ZSh2YXJpYWJsZU1hcDogVmFyaWFibGVNYXAsIG9wdGlvbnM6IEJhc2VUYXJnZXRPcHRpb25zKSB7XG4gICAgcmV0dXJuIE9iamVjdC5zZWFsKG5ldyBQb3N0VGFyZ2V0KHZhcmlhYmxlTWFwLCBvcHRpb25zKSk7XG4gIH1cblxuICBwdWJsaWMgc3RhdGljIGVuc3VyZUluc3RhbmNlKHZhbHVlOiBhbnkpIHtcbiAgICBpZiAodmFsdWUgaW5zdGFuY2VvZiBQb3N0VGFyZ2V0KVxuICAgICAgcmV0dXJuIHZhbHVlO1xuICAgIHRocm93IG5ldyBFcnJvcihgVGhlICcke3ZhbHVlfScgaXMgbm90IGEgUG9zdFRhcmdldGApO1xuICB9XG5cbiAgcHVibGljIGdldCBwcmVmaXgoKSB7XG4gICAgcmV0dXJuIHRoaXMuX3ByZWZpeDtcbiAgfVxuXG4gIHB1YmxpYyBzZXRQcmVmaXgodmFsdWU6IHN0cmluZykge1xuICAgIHRoaXMuX3ByZWZpeCA9IHZhbHVlO1xuICB9XG5cbiAgcHVibGljIGdldCBvdXRwdXROYW1lKCkge1xuICAgIHJldHVybiB0aGlzLl9vdXRwdXROYW1lO1xuICB9XG5cbiAgcHVibGljIHNldE91dHB1dE5hbWUodmFsdWU6IGFueSkge1xuICAgIHRoaXMuX291dHB1dE5hbWUgPSB2YWx1ZTtcbiAgfVxuXG4gIHB1YmxpYyBnZXQgc3VmZml4KCkge1xuICAgIHJldHVybiB0aGlzLl9zdWZmaXg7XG4gIH1cblxuICBwdWJsaWMgc2V0U3VmZml4KHZhbHVlOiBzdHJpbmcpIHtcbiAgICB0aGlzLl9zdWZmaXggPSB2YWx1ZTtcbiAgfVxuXG4gIHB1YmxpYyBnZXQgcG9zaXRpb25JbmRlcGVuZGVudENvZGUoKSB7XG4gICAgcmV0dXJuIHRoaXMuX3Bvc2l0aW9uSW5kZXBlbmRlbnRDb2RlO1xuICB9XG5cbiAgcHVibGljIHNldFBvc2l0aW9uSW5kZXBlbmRlbnRDb2RlKHZhbHVlOiBib29sZWFuKSB7XG4gICAgdGhpcy5fcG9zaXRpb25JbmRlcGVuZGVudENvZGUgPSB2YWx1ZTtcbiAgfVxuXG4gIHB1YmxpYyBnZXQgSU5DTFVERVMoKSB7XG4gICAgcmV0dXJuIHRoaXMuX2luY2x1ZGVzO1xuICB9XG5cbiAgcHVibGljIGdldCBERUZJTklUSU9OUygpIHtcbiAgICByZXR1cm4gdGhpcy5fZGVmaW5pdGlvbnM7XG4gIH1cblxuICBwdWJsaWMgZ2V0IENPTVBJTEVfT1BUSU9OUygpIHtcbiAgICByZXR1cm4gdGhpcy5fY29tcGlsZU9wdGlvbnM7XG4gIH1cblxuICBwdWJsaWMgZ2V0IExJTktfT1BUSU9OUygpIHtcbiAgICByZXR1cm4gdGhpcy5fbGlua09wdGlvbnM7XG4gIH1cblxuICBwdWJsaWMgZ2V0IExJQlJBUklFUygpIHtcbiAgICByZXR1cm4gdGhpcy5fbGlicmFyaWVzO1xuICB9XG5cbiAgcHVibGljIGdldCBTT1VSQ0VTKCkge1xuICAgIHJldHVybiB0aGlzLl9zb3VyY2VzO1xuICB9XG5cbiAgcHVibGljIHRvSlNPTigpOiBTaW1wbGVPYmplY3Qge1xuICAgIGNvbnN0IHJlc3VsdDogYW55ID0gc3VwZXIudG9KU09OKCk7XG5cbiAgICByZXN1bHQudHlwZSA9IFBvc3RUYXJnZXQubmFtZTtcbiAgICBcbiAgICBpZiAodGhpcy5fcHJlZml4ICE9PSB1bmRlZmluZWQpXG4gICAgICByZXN1bHQucHJlZml4ID0gdGhpcy5fcHJlZml4O1xuXG4gICAgaWYgKHRoaXMuX291dHB1dE5hbWUgIT09IHVuZGVmaW5lZClcbiAgICAgIHJlc3VsdC5vdXRwdXROYW1lID0gdGhpcy5fb3V0cHV0TmFtZTtcblxuICAgIGlmICh0aGlzLl9zdWZmaXggIT09IHVuZGVmaW5lZClcbiAgICAgIHJlc3VsdC5zdWZmaXggPSB0aGlzLl9zdWZmaXg7XG5cbiAgICBpZiAodGhpcy5fcG9zaXRpb25JbmRlcGVuZGVudENvZGUgIT09IHVuZGVmaW5lZClcbiAgICAgIHJlc3VsdC5wb3NpdGlvbkluZGVwZW5kZW50Q29kZSA9IHRoaXMuX3Bvc2l0aW9uSW5kZXBlbmRlbnRDb2RlO1xuXG4gICAgcmV0dXJuIHJlc3VsdDtcbiAgfVxufTtcblxuZXhwb3J0IGludGVyZmFjZSBUYXJnZXRPcHRpb25zIGV4dGVuZHMgQmFzZVRhcmdldE9wdGlvbnMge1xuICBuYW1lOiBzdHJpbmc7XG4gIHNvdXJjZURpcjogQWJzb2x1dGVQYXRoO1xuICBiaW5hcnlEaXI6IEFic29sdXRlUGF0aDtcbiAgcHJlZml4OiBzdHJpbmc7XG4gIHN1ZmZpeDogc3RyaW5nO1xuICBwb3NpdGlvbkluZGVwZW5kZW50Q29kZTogYm9vbGVhbjtcbiAgaW5jbHVkZXM6IEFycmF5PFRhcmdldEluY2x1ZGVzIHwgQWJzb2x1dGVQYXRoIHwgc3RyaW5nPjtcbiAgbGlua09wdGlvbnM6IEFycmF5PHN0cmluZyB8IHN0cmluZ1tdPjtcbn07XG5cbmV4cG9ydCBjbGFzcyBNYWluVGFyZ2V0IGV4dGVuZHMgQmFzZVRhcmdldCB7XG4gIHByb3RlY3RlZCBfcHJlZml4OiBzdHJpbmc7XG4gIHByb3RlY3RlZCBfc3VmZml4OiBzdHJpbmc7XG4gIHByb3RlY3RlZCBfb3V0cHV0TmFtZTogc3RyaW5nO1xuICBwcm90ZWN0ZWQgX3Bvc2l0aW9uSW5kZXBlbmRlbnRDb2RlOiBib29sZWFuO1xuXG4gIHByb3RlY3RlZCBjb25zdHJ1Y3Rvcih2YXJpYWJsZU1hcDogVmFyaWFibGVNYXAsIG9wdGlvbnM6IFRhcmdldE9wdGlvbnMpIHtcbiAgICBzdXBlcih2YXJpYWJsZU1hcCwgb3B0aW9ucyk7XG5cbiAgICB0aGlzLl9wcmVmaXggPSBvcHRpb25zLnByZWZpeDtcbiAgICB0aGlzLl9zdWZmaXggPSBvcHRpb25zLnN1ZmZpeDtcbiAgICB0aGlzLl9vdXRwdXROYW1lID0gb3B0aW9ucy5uYW1lO1xuICAgIHRoaXMuX3Bvc2l0aW9uSW5kZXBlbmRlbnRDb2RlID0gb3B0aW9ucy5wb3NpdGlvbkluZGVwZW5kZW50Q29kZTtcblxuICAgIHRoaXMuYWRkSW5jbHVkZXNJbXBsKGZhbHNlLCAuLi5vcHRpb25zLmluY2x1ZGVzKTtcbiAgICB0aGlzLmFkZExpbmtPcHRpb25zSW1wbChmYWxzZSwgLi4ub3B0aW9ucy5saW5rT3B0aW9ucyk7XG4gIH1cblxuICBwdWJsaWMgZ2V0RmlsZURpcigpIHtcbiAgICByZXR1cm4gdGhpcy5fYmluYXJ5RGlyO1xuICB9XG5cbiAgcHVibGljIGdldEZpbGVOYW1lKCkge1xuICAgIHJldHVybiB0aGlzLnByZWZpeCArIHRoaXMub3V0cHV0TmFtZSArIHRoaXMuc3VmZml4O1xuICB9XG5cbiAgcHVibGljIGdldEZpbGUoKSB7XG4gICAgcmV0dXJuIHRoaXMuX2JpbmFyeURpci5qb2luKHRoaXMuZ2V0RmlsZU5hbWUoKSk7XG4gIH1cblxuICBwdWJsaWMgZ2V0IHByZWZpeCgpIHtcbiAgICByZXR1cm4gdGhpcy5fcHJlZml4O1xuICB9XG5cbiAgcHVibGljIHNldFByZWZpeCh2YWx1ZTogc3RyaW5nKSB7XG4gICAgdGhpcy5fcHJlZml4ID0gdmFsdWU7XG4gIH1cblxuICBwdWJsaWMgZ2V0IHN1ZmZpeCgpIHtcbiAgICByZXR1cm4gdGhpcy5fc3VmZml4O1xuICB9XG5cbiAgcHVibGljIHNldFN1ZmZpeCh2YWx1ZTogYW55KSB7XG4gICAgdGhpcy5fc3VmZml4ID0gdmFsdWU7XG4gIH1cblxuICBwdWJsaWMgZ2V0IG91dHB1dE5hbWUoKSB7XG4gICAgcmV0dXJuIHRoaXMuX291dHB1dE5hbWU7XG4gIH1cblxuICBwdWJsaWMgc2V0T3V0cHV0TmFtZSh2YWx1ZTogYW55KSB7XG4gICAgdGhpcy5fb3V0cHV0TmFtZSA9IHZhbHVlO1xuICB9XG5cbiAgcHVibGljIGdldCBUQVJHRVRfU0NPUEUoKSB7XG4gICAgcmV0dXJuIHRoaXNbVEFSR0VUX1NDT1BFXTtcbiAgfVxuXG4gIHB1YmxpYyBnZXQgcG9zaXRpb25JbmRlcGVuZGVudENvZGUoKSB7XG4gICAgcmV0dXJuIHRoaXMuX3Bvc2l0aW9uSW5kZXBlbmRlbnRDb2RlO1xuICB9XG5cbiAgcHVibGljIHNldFBvc2l0aW9uSW5kZXBlbmRlbnRDb2RlKHZhbHVlOiBib29sZWFuKSB7XG4gICAgdGhpcy5fcG9zaXRpb25JbmRlcGVuZGVudENvZGUgPSB2YWx1ZTtcbiAgfVxuXG4gIHB1YmxpYyBwb3N0VXBkYXRlKHRhcmdldDogUG9zdFRhcmdldCkge1xuICAgIGlmICh0YXJnZXQucHJlZml4ICE9PSB1bmRlZmluZWQpXG4gICAgICB0aGlzLl9wcmVmaXggPSB0YXJnZXQucHJlZml4O1xuICAgIGlmICh0YXJnZXQub3V0cHV0TmFtZSAhPT0gdW5kZWZpbmVkKVxuICAgICAgdGhpcy5fb3V0cHV0TmFtZSA9IHRhcmdldC5vdXRwdXROYW1lO1xuICAgIGlmICh0YXJnZXQuc3VmZml4ICE9PSB1bmRlZmluZWQpXG4gICAgICB0aGlzLl9zdWZmaXggPSB0YXJnZXQuc3VmZml4O1xuICAgIGlmICh0YXJnZXQucG9zaXRpb25JbmRlcGVuZGVudENvZGUgIT09IHVuZGVmaW5lZClcbiAgICAgIHRoaXMuX3Bvc2l0aW9uSW5kZXBlbmRlbnRDb2RlID0gdGFyZ2V0LnBvc2l0aW9uSW5kZXBlbmRlbnRDb2RlO1xuICAgIHRoaXMuX2luY2x1ZGVzLnB1c2goLi4udGFyZ2V0LklOQ0xVREVTKTtcbiAgICB0aGlzLl9kZWZpbml0aW9ucy5wdXNoKC4uLnRhcmdldC5ERUZJTklUSU9OUyk7XG4gICAgdGhpcy5fY29tcGlsZU9wdGlvbnMucHVzaCguLi50YXJnZXQuQ09NUElMRV9PUFRJT05TKTtcbiAgICB0aGlzLl9saW5rT3B0aW9ucy5wdXNoKC4uLnRhcmdldC5MSU5LX09QVElPTlMpO1xuICAgIHRoaXMuX2xpYnJhcmllcy5wdXNoKC4uLnRhcmdldC5MSUJSQVJJRVMpO1xuICAgIHRoaXMuX3NvdXJjZXMucHVzaCguLi50YXJnZXQuU09VUkNFUyk7XG4gICAgdGhpcy5fcHJlQnVpbGRMaXN0LnB1c2goLi4udGFyZ2V0LnByZUJ1aWxkTGlzdCk7XG4gICAgdGhpcy5fcG9zdEJ1aWxkTGlzdC5wdXNoKC4uLnRhcmdldC5wb3N0QnVpbGRMaXN0KTtcbiAgfVxuXG4gIHB1YmxpYyB0b0pTT04oKTogb2JqZWN0IHtcbiAgICBjb25zdCByZXN1bHQ6IGFueSA9IHN1cGVyLnRvSlNPTigpO1xuXG4gICAgcmVzdWx0LnByZWZpeCA9IHRoaXMuX3ByZWZpeDtcbiAgICByZXN1bHQub3V0cHV0TmFtZSA9IHRoaXMuX291dHB1dE5hbWU7XG4gICAgcmVzdWx0LnN1ZmZpeCA9IHRoaXMuX3N1ZmZpeDtcbiAgICByZXN1bHQucG9zaXRpb25JbmRlcGVuZGVudENvZGUgPSB0aGlzLl9wb3NpdGlvbkluZGVwZW5kZW50Q29kZTtcblxuICAgIHJldHVybiByZXN1bHQ7XG4gIH1cbn07XG5cbmV4cG9ydCBjbGFzcyBPYmplY3RMaWJyYXJ5IGV4dGVuZHMgTWFpblRhcmdldCB7XG4gIHByaXZhdGUgY29uc3RydWN0b3IodmFyaWFibGVNYXA6IFZhcmlhYmxlTWFwLCBvcHRpb25zOiBUYXJnZXRPcHRpb25zKSB7XG4gICAgc3VwZXIodmFyaWFibGVNYXAsIG9wdGlvbnMpO1xuICB9XG5cbiAgcHVibGljIHN0YXRpYyBjcmVhdGUodmFyaWFibGVNYXA6IFZhcmlhYmxlTWFwLCBvcHRpb25zOiBUYXJnZXRPcHRpb25zKSB7XG4gICAgcmV0dXJuIE9iamVjdC5zZWFsKG5ldyBPYmplY3RMaWJyYXJ5KHZhcmlhYmxlTWFwLCBvcHRpb25zKSk7XG4gIH1cblxuICBwdWJsaWMgdG9KU09OKCk6IFNpbXBsZU9iamVjdCB7XG4gICAgY29uc3QgcmVzdWx0OiBhbnkgPSBzdXBlci50b0pTT04oKTtcbiAgICByZXN1bHQudHlwZSA9IE9iamVjdExpYnJhcnkubmFtZTtcbiAgICByZXR1cm4gcmVzdWx0O1xuICB9XG59O1xuXG5leHBvcnQgY2xhc3MgU3RhdGljTGlicmFyeSBleHRlbmRzIE1haW5UYXJnZXQge1xuICBwcml2YXRlIGNvbnN0cnVjdG9yKHZhcmlhYmxlTWFwOiBWYXJpYWJsZU1hcCwgb3B0aW9uczogVGFyZ2V0T3B0aW9ucykge1xuICAgIHN1cGVyKHZhcmlhYmxlTWFwLCBvcHRpb25zKTtcbiAgfVxuXG4gIHB1YmxpYyBzdGF0aWMgY3JlYXRlKHZhcmlhYmxlTWFwOiBWYXJpYWJsZU1hcCwgb3B0aW9uczogVGFyZ2V0T3B0aW9ucykge1xuICAgIHJldHVybiBPYmplY3Quc2VhbChuZXcgU3RhdGljTGlicmFyeSh2YXJpYWJsZU1hcCwgb3B0aW9ucykpO1xuICB9XG5cbiAgcHVibGljIHRvSlNPTigpOiBTaW1wbGVPYmplY3Qge1xuICAgIGNvbnN0IHJlc3VsdDogYW55ID0gc3VwZXIudG9KU09OKCk7XG4gICAgcmVzdWx0LnR5cGUgPSBTdGF0aWNMaWJyYXJ5Lm5hbWU7XG4gICAgcmV0dXJuIHJlc3VsdDtcbiAgfVxufTtcblxuZXhwb3J0IGNsYXNzIFNoYXJlZExpYnJhcnkgZXh0ZW5kcyBNYWluVGFyZ2V0IHtcbiAgcHJpdmF0ZSBjb25zdHJ1Y3Rvcih2YXJpYWJsZU1hcDogVmFyaWFibGVNYXAsIG9wdGlvbnM6IFRhcmdldE9wdGlvbnMpIHtcbiAgICBzdXBlcih2YXJpYWJsZU1hcCwgb3B0aW9ucyk7XG4gIH1cblxuICBwdWJsaWMgc3RhdGljIGNyZWF0ZSh2YXJpYWJsZU1hcDogVmFyaWFibGVNYXAsIG9wdGlvbnM6IFRhcmdldE9wdGlvbnMpIHtcbiAgICByZXR1cm4gT2JqZWN0LnNlYWwobmV3IFNoYXJlZExpYnJhcnkodmFyaWFibGVNYXAsIG9wdGlvbnMpKTtcbiAgfVxuXG4gIHB1YmxpYyB0b0pTT04oKTogU2ltcGxlT2JqZWN0IHtcbiAgICBjb25zdCByZXN1bHQ6IGFueSA9IHN1cGVyLnRvSlNPTigpO1xuICAgIHJlc3VsdC50eXBlID0gU2hhcmVkTGlicmFyeS5uYW1lO1xuICAgIHJldHVybiByZXN1bHQ7XG4gIH1cbn1cblxuZXhwb3J0IGNsYXNzIEV4ZWN1dGFibGUgZXh0ZW5kcyBNYWluVGFyZ2V0IHtcbiAgcHJpdmF0ZSBjb25zdHJ1Y3Rvcih2YXJpYWJsZU1hcDogVmFyaWFibGVNYXAsIG9wdGlvbnM6IFRhcmdldE9wdGlvbnMpIHtcbiAgICBzdXBlcih2YXJpYWJsZU1hcCwgb3B0aW9ucyk7XG4gIH1cblxuICBwdWJsaWMgc3RhdGljIGNyZWF0ZSh2YXJpYWJsZU1hcDogVmFyaWFibGVNYXAsIG9wdGlvbnM6IFRhcmdldE9wdGlvbnMpIHtcbiAgICByZXR1cm4gT2JqZWN0LnNlYWwobmV3IEV4ZWN1dGFibGUodmFyaWFibGVNYXAsIG9wdGlvbnMpKTtcbiAgfVxuXG4gIHB1YmxpYyB0b0pTT04oKTogU2ltcGxlT2JqZWN0IHtcbiAgICBjb25zdCByZXN1bHQ6IGFueSA9IHN1cGVyLnRvSlNPTigpO1xuICAgIHJlc3VsdC50eXBlID0gRXhlY3V0YWJsZS5uYW1lO1xuICAgIHJldHVybiByZXN1bHQ7XG4gIH1cbn07XG4iLCIvKlxuICogTUlUIExpY2Vuc2VcbiAqXG4gKiBDb3B5cmlnaHQgKGMpIDIwMjUgIFl1cmlpIFlha3ViaW4gKHl1cmlpLnlha3ViaW5AZ21haWwuY29tKVxuICpcbiAqIFBlcm1pc3Npb24gaXMgZ3JhbnRlZCB0byB1c2UsIGNvcHksIG1vZGlmeSwgYW5kIGRpc3RyaWJ1dGUgdGhpcyBzb2Z0d2FyZVxuICogdW5kZXIgdGhlIE1JVCBMaWNlbnNlLiBTZWUgTElDRU5TRSBmaWxlIGZvciBkZXRhaWxzLlxuICovXG5cbmltcG9ydCB7IFRhcmdldEluY2x1ZGVzIH1mcm9tIFwiQC9jb3JlL1RhcmdldEluY2x1ZGVzXCI7XG5pbXBvcnQgeyBUYXJnZXROYW1lIH1mcm9tIFwiQC9jb3JlL1RhcmdldE5hbWVcIjtcbmltcG9ydCB7IE1haW5UYXJnZXQgfSBmcm9tIFwiQC9jb3JlL1RhcmdldFwiO1xuaW1wb3J0IHsgQWJzb2x1dGVQYXRoIH0gZnJvbSBcIkAvY29yZS9BYnNvbHV0ZVBhdGhcIjtcbmltcG9ydCB7IFNpbXBsZU9iamVjdCB9IGZyb20gXCJAL2NvcmUvU2ltcGxlT2JqZWN0XCI7XG5cbmNvbnN0IEVOVFJJRVMgPSBTeW1ib2woXCJFTlRSSUVTXCIpO1xuXG5leHBvcnQgY2xhc3MgVGFyZ2V0Q29sbGVjdGlvbiB7XG4gIHByaXZhdGUgW0VOVFJJRVNdID0gbmV3IE1hcDxzdHJpbmcsIE1haW5UYXJnZXQ+O1xuXG4gIHB1YmxpYyBzdGF0aWMgY3JlYXRlKCkge1xuICAgIHJldHVybiBPYmplY3Quc2VhbChuZXcgVGFyZ2V0Q29sbGVjdGlvbik7XG4gIH1cbiAgXG4gIHB1YmxpYyBnZXQgRU5UUklFUygpIHtcbiAgICByZXR1cm4gdGhpc1tFTlRSSUVTXTtcbiAgfVxuXG4gIHB1YmxpYyB0b0pTT04oKTogU2ltcGxlT2JqZWN0IHtcbiAgICBjb25zdCByZXN1bHQ6IFNpbXBsZU9iamVjdCA9IHsgdHlwZTogVGFyZ2V0Q29sbGVjdGlvbi5uYW1lIH07XG4gICAgdGhpc1tFTlRSSUVTXS5mb3JFYWNoKCh2LCBrKSA9PiB2b2lkIChyZXN1bHRba10gPSB2KSk7XG4gICAgcmV0dXJuIHJlc3VsdDtcbiAgfVxuXG4gIHB1YmxpYyBnZXQobmFtZTogc3RyaW5nKTogTWFpblRhcmdldCB7XG4gICAgY29uc3QgcmVzdWx0ID0gdGhpc1tFTlRSSUVTXS5nZXQobmFtZSk7XG4gICAgaWYgKCFyZXN1bHQpXG4gICAgICB0aHJvdyBgVGFyZ2V0IFwiJHtuYW1lfVwiIGRvZXMgbm90IGV4aXN0YDtcbiAgICByZXR1cm4gcmVzdWx0O1xuICB9XG5cbiAgcHVibGljIHNldChuYW1lOiBzdHJpbmcsIHRhcmdldDogYW55KSB7XG4gICAgaWYgKHRoaXNbRU5UUklFU10uaGFzKG5hbWUpKVxuICAgICAgdGhyb3cgbmV3IEVycm9yKGBUYXJnZXQgXCIke25hbWV9XCIgZXhpc3RzYCk7XG4gICAgdGhpc1tFTlRSSUVTXS5zZXQobmFtZSwgdGFyZ2V0KTtcbiAgfVxuXG4gIHByaXZhdGUgX19nZXRBbGxJbmNsdWRlcyhpbmNsdWRlczogc3RyaW5nW10sIHRhcmdldFNldDogU2V0PHN0cmluZz4sIGxpc3Q6IEFycmF5PEFic29sdXRlUGF0aCB8IFRhcmdldEluY2x1ZGVzPiB8IEFycmF5PFRhcmdldE5hbWU+KSB7XG4gICAgZm9yIChjb25zdCBpdGVyIG9mIGxpc3QpIHtcbiAgICAgIGlmIChpdGVyIGluc3RhbmNlb2YgVGFyZ2V0SW5jbHVkZXMgfHwgaXRlciBpbnN0YW5jZW9mIFRhcmdldE5hbWUpIHtcbiAgICAgICAgaWYgKCF0YXJnZXRTZXQuaGFzKGl0ZXIudGFyZ2V0TmFtZSkpIHtcbiAgICAgICAgICB0YXJnZXRTZXQuYWRkKGl0ZXIudGFyZ2V0TmFtZSk7XG4gICAgICAgICAgY29uc3QgdGFyZ2V0ID0gdGhpcy5nZXQoaXRlci50YXJnZXROYW1lKTtcbiAgICAgICAgICB0aGlzLl9fZ2V0QWxsSW5jbHVkZXMoaW5jbHVkZXMsIHRhcmdldFNldCwgdGFyZ2V0LmdldFB1YmxpY0luY2x1ZGVzKCkpO1xuICAgICAgICAgIHRoaXMuX19nZXRBbGxJbmNsdWRlcyhpbmNsdWRlcywgdGFyZ2V0U2V0LCB0YXJnZXQuZ2V0UHVibGljTGlicmFyaWVzKCkpO1xuICAgICAgICB9XG4gICAgICB9XG4gICAgICBlbHNlIGlmIChpdGVyIGluc3RhbmNlb2YgQWJzb2x1dGVQYXRoKSB7XG4gICAgICAgIGlmICghaW5jbHVkZXMuaW5jbHVkZXMoaXRlci50b1N0cmluZygpKSlcbiAgICAgICAgICBpbmNsdWRlcy5wdXNoKGl0ZXIudG9TdHJpbmcoKSk7XG4gICAgICB9XG4gICAgICBlbHNlIHtcbiAgICAgICAgdGhyb3cgbmV3IEVycm9yKGBOb3Qgc3VwcG9ydCBpbnN0YW5jZSAke2l0ZXJ9YCk7XG4gICAgICB9XG4gICAgfVxuICB9XG5cbiAgcHVibGljIGFsbEluY2x1ZGVzT2YocGFyYW1zOiBzdHJpbmcgfCBNYWluVGFyZ2V0KTogc3RyaW5nW10ge1xuICAgIGNvbnN0IHRhcmdldCA9ICh0eXBlb2YgcGFyYW1zID09PSBcInN0cmluZ1wiKSA/IHRoaXMuZ2V0KHBhcmFtcykgOiBwYXJhbXM7XG4gICAgY29uc3QgaW5jbHVkZXM6IHN0cmluZ1tdID0gW107XG4gICAgY29uc3QgdGFyZ2V0U2V0ID0gbmV3IFNldChbIHRhcmdldC50YXJnZXROYW1lIF0pO1xuICAgIHRoaXMuX19nZXRBbGxJbmNsdWRlcyhpbmNsdWRlcywgdGFyZ2V0U2V0LCB0YXJnZXQuZ2V0SW5jbHVkZXMoKSk7XG4gICAgdGhpcy5fX2dldEFsbEluY2x1ZGVzKGluY2x1ZGVzLCB0YXJnZXRTZXQsIHRhcmdldC5nZXRMaWJyYXJpZXMoKSk7XG4gICAgcmV0dXJuIGluY2x1ZGVzO1xuICB9XG5cbiAgcHJpdmF0ZSBfX2dldEFsbEhlYWRlcnMoaGVhZGVyczogc3RyaW5nW10sIHRhcmdldFNldDogU2V0PHN0cmluZz4sIGxpc3Q6IEFycmF5PEFic29sdXRlUGF0aCB8IFRhcmdldEluY2x1ZGVzPiB8IEFycmF5PFRhcmdldE5hbWU+KSB7XG4gICAgZm9yIChjb25zdCBpdGVyIG9mIGxpc3QpIHtcbiAgICAgIGlmIChpdGVyIGluc3RhbmNlb2YgVGFyZ2V0SW5jbHVkZXMgfHwgaXRlciBpbnN0YW5jZW9mIFRhcmdldE5hbWUpIHtcbiAgICAgICAgaWYgKCF0YXJnZXRTZXQuaGFzKGl0ZXIudGFyZ2V0TmFtZSkpIHtcbiAgICAgICAgICB0YXJnZXRTZXQuYWRkKGl0ZXIudGFyZ2V0TmFtZSk7XG4gICAgICAgICAgY29uc3QgdGFyZ2V0ID0gdGhpcy5nZXQoaXRlci50YXJnZXROYW1lKTtcbiAgICAgICAgICBmb3IgKGNvbnN0IGhlYWRlciBvZiB0YXJnZXQuZ2V0SGVhZGVycygpLm1hcCgoaTogYW55KSA9PiBpLkZJTEUudG9TdHJpbmcoKSkpIHtcbiAgICAgICAgICAgIGlmICghaGVhZGVycy5pbmNsdWRlcyhoZWFkZXIudG9TdHJpbmcoKSkpXG4gICAgICAgICAgICAgIGhlYWRlcnMucHVzaChoZWFkZXIudG9TdHJpbmcoKSk7XG4gICAgICAgICAgfVxuICAgICAgICAgIHRoaXMuX19nZXRBbGxIZWFkZXJzKGhlYWRlcnMsIHRhcmdldFNldCwgdGFyZ2V0LmdldFB1YmxpY0luY2x1ZGVzKCkpO1xuICAgICAgICAgIHRoaXMuX19nZXRBbGxIZWFkZXJzKGhlYWRlcnMsIHRhcmdldFNldCwgdGFyZ2V0LmdldFB1YmxpY0xpYnJhcmllcygpKTtcbiAgICAgICAgfVxuICAgICAgfVxuICAgIH1cbiAgfVxuXG4gIHB1YmxpYyBhbGxIZWFkZXJzT2YocGFyYW1zOiBzdHJpbmcgfCBNYWluVGFyZ2V0KSB7XG4gICAgY29uc3QgdGFyZ2V0ID0gKHR5cGVvZiBwYXJhbXMgPT09IFwic3RyaW5nXCIpID8gdGhpcy5nZXQocGFyYW1zKSA6IHBhcmFtcztcbiAgICBjb25zdCBoZWFkZXJzID0gdGFyZ2V0LmdldEhlYWRlcnMoKS5tYXAoKGk6IGFueSkgPT4gaS5GSUxFLnRvU3RyaW5nKCkpO1xuICAgIGNvbnN0IHRhcmdldFNldCA9IG5ldyBTZXQoWyB0YXJnZXQudGFyZ2V0TmFtZSBdKTtcbiAgICB0aGlzLl9fZ2V0QWxsSGVhZGVycyhoZWFkZXJzLCB0YXJnZXRTZXQsIHRhcmdldC5nZXRJbmNsdWRlcygpKTtcbiAgICB0aGlzLl9fZ2V0QWxsSGVhZGVycyhoZWFkZXJzLCB0YXJnZXRTZXQsIHRhcmdldC5nZXRMaWJyYXJpZXMoKSk7XG4gICAgcmV0dXJuIGhlYWRlcnM7XG4gIH1cblxuICBwcml2YXRlIF9fZ2V0QWxsTGlicmFyaWVzKGxpYnJhcmllczogc3RyaW5nW10sIHRhcmdldFNldDogU2V0PHN0cmluZz4sIGxpc3Q6IEFycmF5PFRhcmdldE5hbWU+KSB7XG4gICAgZm9yIChjb25zdCBpdGVyIG9mIGxpc3QpIHtcbiAgICAgIGNvbnNvbGUuYXNzZXJ0KGl0ZXIgaW5zdGFuY2VvZiBUYXJnZXROYW1lKTtcbiAgICAgIGlmICghdGFyZ2V0U2V0LmhhcyhpdGVyLnRhcmdldE5hbWUpKSB7XG4gICAgICAgIHRhcmdldFNldC5hZGQoaXRlci50YXJnZXROYW1lKTtcbiAgICAgICAgY29uc3QgdGFyZ2V0ID0gdGhpcy5nZXQoaXRlci50YXJnZXROYW1lKTtcbiAgICAgICAgbGlicmFyaWVzLnB1c2godGFyZ2V0LmdldEZpbGUoKS50b1N0cmluZygpKTtcbiAgICAgICAgdGhpcy5fX2dldEFsbExpYnJhcmllcyhsaWJyYXJpZXMsIHRhcmdldFNldCwgdGFyZ2V0LmdldFB1YmxpY0xpYnJhcmllcygpKTtcbiAgICAgIH1cbiAgICB9XG4gIH1cblxuICBwdWJsaWMgYWxsTGlicmFyaWVzT2YocGFyYW1zOiBzdHJpbmcgfCBNYWluVGFyZ2V0KSB7XG4gICAgY29uc3QgdGFyZ2V0ID0gKHR5cGVvZiBwYXJhbXMgPT09IFwic3RyaW5nXCIpID8gdGhpcy5nZXQocGFyYW1zKSA6IHBhcmFtcztcbiAgICBjb25zdCBsaWJyYXJpZXM6IHN0cmluZ1tdID0gW107XG4gICAgY29uc3QgdGFyZ2V0U2V0ID0gbmV3IFNldChbIHRhcmdldC50YXJnZXROYW1lIF0pO1xuICAgIHRoaXMuX19nZXRBbGxMaWJyYXJpZXMobGlicmFyaWVzLCB0YXJnZXRTZXQsIHRhcmdldC5nZXRMaWJyYXJpZXMoKSk7XG4gICAgcmV0dXJuIGxpYnJhcmllcztcbiAgfVxuXG4gIHByaXZhdGUgX19nZXRBbGxEZWZpbml0aW9ucyhkZWZpbml0aW9uczogc3RyaW5nW10sIHRhcmdldFNldDogU2V0PHN0cmluZz4sIGxpc3Q6IEFycmF5PHN0cmluZz4gfCBBcnJheTxUYXJnZXROYW1lPikge1xuICAgIGZvciAoY29uc3QgaXRlciBvZiBsaXN0KSB7XG4gICAgICBpZiAoaXRlciBpbnN0YW5jZW9mIFRhcmdldE5hbWUpIHtcbiAgICAgICAgaWYgKCF0YXJnZXRTZXQuaGFzKGl0ZXIudGFyZ2V0TmFtZSkpIHtcbiAgICAgICAgICB0YXJnZXRTZXQuYWRkKGl0ZXIudGFyZ2V0TmFtZSk7XG4gICAgICAgICAgY29uc3QgdGFyZ2V0ID0gdGhpcy5nZXQoaXRlci50YXJnZXROYW1lKTtcbiAgICAgICAgICB0aGlzLl9fZ2V0QWxsRGVmaW5pdGlvbnMoZGVmaW5pdGlvbnMsIHRhcmdldFNldCwgdGFyZ2V0LmdldFB1YmxpY0RlZmluaXRpb25zKCkpO1xuICAgICAgICAgIHRoaXMuX19nZXRBbGxEZWZpbml0aW9ucyhkZWZpbml0aW9ucywgdGFyZ2V0U2V0LCB0YXJnZXQuZ2V0UHVibGljTGlicmFyaWVzKCkpO1xuICAgICAgICB9XG4gICAgICB9XG4gICAgICBlbHNlIGlmICh0eXBlb2YgaXRlciA9PT0gXCJzdHJpbmdcIikge1xuICAgICAgICBpZiAoIWRlZmluaXRpb25zLmluY2x1ZGVzKGl0ZXIpKVxuICAgICAgICAgIGRlZmluaXRpb25zLnB1c2goaXRlcik7XG4gICAgICB9XG4gICAgICBlbHNlIHtcbiAgICAgICAgdGhyb3cgbmV3IEVycm9yKGBOb3Qgc3VwcG9ydCBpbnN0YW5jZSAke2l0ZXJ9YCk7XG4gICAgICB9XG4gICAgfVxuICB9XG5cbiAgcHVibGljIGFsbERlZmluaXRpb25zT2YocGFyYW1zOiBzdHJpbmcgfCBNYWluVGFyZ2V0KSB7XG4gICAgY29uc3QgdGFyZ2V0ID0gKHR5cGVvZiBwYXJhbXMgPT09IFwic3RyaW5nXCIpID8gdGhpcy5nZXQocGFyYW1zKSA6IHBhcmFtcztcbiAgICBjb25zdCBkZWZpbml0aW9uczogc3RyaW5nW10gPSBbXTtcbiAgICBjb25zdCB0YXJnZXRTZXQgPSBuZXcgU2V0KFsgdGFyZ2V0LnRhcmdldE5hbWUgXSk7XG4gICAgdGhpcy5fX2dldEFsbERlZmluaXRpb25zKGRlZmluaXRpb25zLCB0YXJnZXRTZXQsIHRhcmdldC5nZXREZWZpbml0aW9ucygpKTtcbiAgICB0aGlzLl9fZ2V0QWxsRGVmaW5pdGlvbnMoZGVmaW5pdGlvbnMsIHRhcmdldFNldCwgdGFyZ2V0LmdldFB1YmxpY0xpYnJhcmllcygpKTtcbiAgICByZXR1cm4gZGVmaW5pdGlvbnM7XG4gIH1cblxuICBwcml2YXRlIF9fZ2V0QWxsQ29tcGlsZU9wdGlvbnMob3B0aW9uczogQXJyYXk8c3RyaW5nfHN0cmluZ1tdPiwgdGFyZ2V0U2V0OiBTZXQ8c3RyaW5nPiwgbGlzdDogQXJyYXk8c3RyaW5nfHN0cmluZ1tdPiB8IEFycmF5PFRhcmdldE5hbWU+KSB7XG4gICAgZm9yIChjb25zdCBpdGVyIG9mIGxpc3QpIHtcbiAgICAgIGlmIChpdGVyIGluc3RhbmNlb2YgVGFyZ2V0TmFtZSkge1xuICAgICAgICBpZiAoIXRhcmdldFNldC5oYXMoaXRlci50YXJnZXROYW1lKSkge1xuICAgICAgICAgIHRhcmdldFNldC5hZGQoaXRlci50YXJnZXROYW1lKTtcbiAgICAgICAgICBjb25zdCB0YXJnZXQgPSB0aGlzLmdldChpdGVyLnRhcmdldE5hbWUpO1xuICAgICAgICAgIHRoaXMuX19nZXRBbGxDb21waWxlT3B0aW9ucyhvcHRpb25zLCB0YXJnZXRTZXQsIHRhcmdldC5nZXRQdWJsaWNDb21waWxlT3B0aW9ucygpKTtcbiAgICAgICAgICB0aGlzLl9fZ2V0QWxsQ29tcGlsZU9wdGlvbnMob3B0aW9ucywgdGFyZ2V0U2V0LCB0YXJnZXQuZ2V0UHVibGljTGlicmFyaWVzKCkpO1xuICAgICAgICB9XG4gICAgICB9XG4gICAgICBlbHNlIGlmICh0eXBlb2YgaXRlciA9PT0gXCJzdHJpbmdcIikge1xuICAgICAgICBpZiAoIW9wdGlvbnMuaW5jbHVkZXMoaXRlcikpXG4gICAgICAgICAgb3B0aW9ucy5wdXNoKGl0ZXIpO1xuICAgICAgfVxuICAgICAgZWxzZSBpZiAoQXJyYXkuaXNBcnJheShpdGVyKSkge1xuICAgICAgICAvLyBUT0RPOiBBZGQgY29tcGFyZSBmb3Igc2FtZSBhcnJheSBpbiBvcHRpb25zXG4gICAgICAgIG9wdGlvbnMucHVzaChpdGVyKTtcbiAgICAgIH1cbiAgICAgIGVsc2Uge1xuICAgICAgICB0aHJvdyBuZXcgRXJyb3IoYE5vdCBzdXBwb3J0IGluc3RhbmNlICR7aXRlcn1gKTtcbiAgICAgIH1cbiAgICB9XG4gIH1cblxuICBwdWJsaWMgYWxsQ29tcGlsZU9wdGlvbnNPZihwYXJhbXM6IHN0cmluZyB8IE1haW5UYXJnZXQpIHtcbiAgICBjb25zdCB0YXJnZXQgPSAodHlwZW9mIHBhcmFtcyA9PT0gXCJzdHJpbmdcIikgPyB0aGlzLmdldChwYXJhbXMpIDogcGFyYW1zO1xuICAgIGNvbnN0IG9wdGlvbnM6IHN0cmluZ1tdID0gW107XG4gICAgY29uc3QgdGFyZ2V0U2V0ID0gbmV3IFNldChbIHRhcmdldC50YXJnZXROYW1lIF0pO1xuICAgIHRoaXMuX19nZXRBbGxDb21waWxlT3B0aW9ucyhvcHRpb25zLCB0YXJnZXRTZXQsIHRhcmdldC5nZXRDb21waWxlT3B0aW9ucygpKTtcbiAgICB0aGlzLl9fZ2V0QWxsQ29tcGlsZU9wdGlvbnMob3B0aW9ucywgdGFyZ2V0U2V0LCB0YXJnZXQuZ2V0UHVibGljTGlicmFyaWVzKCkpO1xuICAgIHJldHVybiBvcHRpb25zLmZsYXQoKTtcbiAgfVxuXG4gIHByaXZhdGUgX19nZXRMaW5rT3B0aW9ucyhvcHRpb25zOiBBcnJheTxzdHJpbmd8c3RyaW5nW10+LCB0YXJnZXRTZXQ6IFNldDxzdHJpbmc+LCBsaXN0OiBBcnJheTxzdHJpbmd8c3RyaW5nW10+IHwgQXJyYXk8VGFyZ2V0TmFtZT4pIHtcbiAgICBmb3IgKGNvbnN0IGl0ZXIgb2YgbGlzdCkge1xuICAgICAgaWYgKGl0ZXIgaW5zdGFuY2VvZiBUYXJnZXROYW1lKSB7XG4gICAgICAgIGlmICghdGFyZ2V0U2V0LmhhcyhpdGVyLnRhcmdldE5hbWUpKSB7XG4gICAgICAgICAgdGFyZ2V0U2V0LmFkZChpdGVyLnRhcmdldE5hbWUpO1xuICAgICAgICAgIGNvbnN0IHRhcmdldCA9IHRoaXMuZ2V0KGl0ZXIudGFyZ2V0TmFtZSk7XG4gICAgICAgICAgdGhpcy5fX2dldExpbmtPcHRpb25zKG9wdGlvbnMsIHRhcmdldFNldCwgdGFyZ2V0LmdldFB1YmxpY0xpbmtPcHRpb25zKCkpO1xuICAgICAgICAgIHRoaXMuX19nZXRMaW5rT3B0aW9ucyhvcHRpb25zLCB0YXJnZXRTZXQsIHRhcmdldC5nZXRQdWJsaWNMaWJyYXJpZXMoKSk7XG4gICAgICAgIH1cbiAgICAgIH1cbiAgICAgIGVsc2UgaWYgKHR5cGVvZiBpdGVyID09PSBcInN0cmluZ1wiKSB7XG4gICAgICAgIGlmICghb3B0aW9ucy5pbmNsdWRlcyhpdGVyKSlcbiAgICAgICAgICBvcHRpb25zLnB1c2goaXRlcik7XG4gICAgICB9XG4gICAgICBlbHNlIGlmIChBcnJheS5pc0FycmF5KGl0ZXIpKSB7XG4gICAgICAgIC8vIFRPRE86IEFkZCBjb21wYXJlIGZvciBzYW1lIGFycmF5IGluIG9wdGlvbnNcbiAgICAgICAgb3B0aW9ucy5wdXNoKGl0ZXIpO1xuICAgICAgfVxuICAgICAgZWxzZSB7XG4gICAgICAgIHRocm93IG5ldyBFcnJvcihgTm90IHN1cHBvcnQgaW5zdGFuY2UgJHtpdGVyfWApO1xuICAgICAgfVxuICAgIH1cbiAgfVxuXG4gIHB1YmxpYyBhbGxMaW5rT3B0aW9uc09mKHBhcmFtczogc3RyaW5nIHwgTWFpblRhcmdldCkge1xuICAgIGNvbnN0IHRhcmdldCA9ICh0eXBlb2YgcGFyYW1zID09PSBcInN0cmluZ1wiKSA/IHRoaXMuZ2V0KHBhcmFtcykgOiBwYXJhbXM7XG4gICAgY29uc3Qgb3B0aW9uczogc3RyaW5nW10gPSBbXTtcbiAgICBjb25zdCB0YXJnZXRTZXQgPSBuZXcgU2V0KFsgdGFyZ2V0LnRhcmdldE5hbWUgXSk7XG4gICAgdGhpcy5fX2dldExpbmtPcHRpb25zKG9wdGlvbnMsIHRhcmdldFNldCwgdGFyZ2V0LmdldExpbmtPcHRpb25zKCkpO1xuICAgIHRoaXMuX19nZXRMaW5rT3B0aW9ucyhvcHRpb25zLCB0YXJnZXRTZXQsIHRhcmdldC5nZXRQdWJsaWNMaWJyYXJpZXMoKSk7XG4gICAgcmV0dXJuIG9wdGlvbnMuZmxhdCgpO1xuICB9XG59XG4iLCIvKlxuICogTUlUIExpY2Vuc2VcbiAqXG4gKiBDb3B5cmlnaHQgKGMpIDIwMjUgIFl1cmlpIFlha3ViaW4gKHl1cmlpLnlha3ViaW5AZ21haWwuY29tKVxuICpcbiAqIFBlcm1pc3Npb24gaXMgZ3JhbnRlZCB0byB1c2UsIGNvcHksIG1vZGlmeSwgYW5kIGRpc3RyaWJ1dGUgdGhpcyBzb2Z0d2FyZVxuICogdW5kZXIgdGhlIE1JVCBMaWNlbnNlLiBTZWUgTElDRU5TRSBmaWxlIGZvciBkZXRhaWxzLlxuICovXG5cbmltcG9ydCB7IFNpbXBsZU9iamVjdCB9IGZyb20gXCJAL2NvcmUvU2ltcGxlT2JqZWN0XCI7XG5cbmNvbnN0IE5BTUUgPSBTeW1ib2woXCJOQU1FXCIpO1xuXG5leHBvcnQgY2xhc3MgVGFyZ2V0RmlsZSB7XG4gIHByaXZhdGUgW05BTUVdOiBzdHJpbmc7XG5cbiAgcHJpdmF0ZSBjb25zdHJ1Y3Rvcih0YXJnZXROYW1lOiBzdHJpbmcpIHtcbiAgICB0aGlzW05BTUVdID0gdGFyZ2V0TmFtZTtcbiAgfVxuXG4gIHB1YmxpYyBzdGF0aWMgY3JlYXRlKG5hbWU6IHN0cmluZykge1xuICAgIHJldHVybiBPYmplY3Quc2VhbChuZXcgVGFyZ2V0RmlsZShuYW1lKSk7XG4gIH1cblxuICBwdWJsaWMgc3RhdGljIGZyb21KU09OKG9iamVjdDogU2ltcGxlT2JqZWN0KSB7XG4gICAgcmV0dXJuIFRhcmdldEZpbGUuY3JlYXRlKG9iamVjdC50YXJnZXROYW1lIGFzIHN0cmluZyk7XG4gIH1cblxuICBwdWJsaWMgZ2V0IHRhcmdldE5hbWUoKTogc3RyaW5nIHtcbiAgICByZXR1cm4gdGhpc1tOQU1FXTtcbiAgfVxuXG4gIHB1YmxpYyB0b1N0cmluZygpOiBzdHJpbmcge1xuICAgIHJldHVybiBcIiR7XCIgKyB0aGlzW05BTUVdICsgXCIuZmlsZX1cIjtcbiAgfVxuXG4gIHB1YmxpYyB0b0pTT04oKTogU2ltcGxlT2JqZWN0IHtcbiAgICByZXR1cm4ge1xuICAgICAgdHlwZTogVGFyZ2V0RmlsZS5uYW1lLFxuICAgICAgdGFyZ2V0TmFtZTogdGhpc1tOQU1FXSxcbiAgICB9XG4gIH1cbn07XG5cblNpbXBsZU9iamVjdC5yZWdpc3Rlckluc3RhbmNlQ3JlYXRvcihUYXJnZXRGaWxlLm5hbWUsIFRhcmdldEZpbGUuZnJvbUpTT04pO1xuIiwiLypcbiAqIE1JVCBMaWNlbnNlXG4gKlxuICogQ29weXJpZ2h0IChjKSAyMDI1ICBZdXJpaSBZYWt1YmluICh5dXJpaS55YWt1YmluQGdtYWlsLmNvbSlcbiAqXG4gKiBQZXJtaXNzaW9uIGlzIGdyYW50ZWQgdG8gdXNlLCBjb3B5LCBtb2RpZnksIGFuZCBkaXN0cmlidXRlIHRoaXMgc29mdHdhcmVcbiAqIHVuZGVyIHRoZSBNSVQgTGljZW5zZS4gU2VlIExJQ0VOU0UgZmlsZSBmb3IgZGV0YWlscy5cbiAqL1xuXG5pbXBvcnQgeyBTaW1wbGVPYmplY3QgfSBmcm9tIFwiQC9jb3JlL1NpbXBsZU9iamVjdFwiO1xuXG5jb25zdCBOQU1FID0gU3ltYm9sKFwiTkFNRVwiKTtcblxuZXhwb3J0IGNsYXNzIFRhcmdldEluY2x1ZGVzIHtcbiAgcHJpdmF0ZSBbTkFNRV06IHN0cmluZztcblxuICBwcml2YXRlIGNvbnN0cnVjdG9yKG5hbWU6IHN0cmluZykge1xuICAgIHRoaXNbTkFNRV0gPSBuYW1lO1xuICB9XG5cbiAgcHVibGljIHN0YXRpYyBjcmVhdGUobmFtZTogc3RyaW5nKSB7XG4gICAgcmV0dXJuIE9iamVjdC5zZWFsKG5ldyBUYXJnZXRJbmNsdWRlcyhuYW1lKSk7XG4gIH1cblxuICBwdWJsaWMgc3RhdGljIGZyb21KU09OKG9iamVjdDogU2ltcGxlT2JqZWN0KSB7XG4gICAgcmV0dXJuIFRhcmdldEluY2x1ZGVzLmNyZWF0ZShvYmplY3QudGFyZ2V0TmFtZSBhcyBzdHJpbmcpO1xuICB9XG5cbiAgcHVibGljIGdldCB0YXJnZXROYW1lKCk6IHN0cmluZyB7XG4gICAgcmV0dXJuIHRoaXNbTkFNRV07XG4gIH1cblxuICBwdWJsaWMgdG9TdHJpbmcoKTogc3RyaW5nIHtcbiAgICByZXR1cm4gXCIke1wiICsgdGhpc1tOQU1FXSArIFwiLmluY2x1ZGVzfVwiO1xuICB9XG5cbiAgcHVibGljIHRvSlNPTigpOiBTaW1wbGVPYmplY3Qge1xuICAgIHJldHVybiB7XG4gICAgICB0eXBlOiBUYXJnZXRJbmNsdWRlcy5uYW1lLFxuICAgICAgdGFyZ2V0TmFtZTogdGhpc1tOQU1FXSxcbiAgICB9XG4gIH1cblxuICBwdWJsaWMgc3RhdGljIGVuc3VyZUluc3RhbmNlKHZhbHVlOiBhbnkpIHtcbiAgICBpZiAodmFsdWUgaW5zdGFuY2VvZiBUYXJnZXRJbmNsdWRlcylcbiAgICAgIHJldHVybiB2YWx1ZTtcbiAgICB0aHJvdyBuZXcgRXJyb3IoYFRoZSAnJHt2YWx1ZX0nIGlzIG5vdCBhIFRhcmdldEluY2x1ZGVzYCk7XG4gIH1cbn07XG5cblNpbXBsZU9iamVjdC5yZWdpc3Rlckluc3RhbmNlQ3JlYXRvcihUYXJnZXRJbmNsdWRlcy5uYW1lLCBUYXJnZXRJbmNsdWRlcy5mcm9tSlNPTik7XG4iLCIvKlxuICogTUlUIExpY2Vuc2VcbiAqXG4gKiBDb3B5cmlnaHQgKGMpIDIwMjUgIFl1cmlpIFlha3ViaW4gKHl1cmlpLnlha3ViaW5AZ21haWwuY29tKVxuICpcbiAqIFBlcm1pc3Npb24gaXMgZ3JhbnRlZCB0byB1c2UsIGNvcHksIG1vZGlmeSwgYW5kIGRpc3RyaWJ1dGUgdGhpcyBzb2Z0d2FyZVxuICogdW5kZXIgdGhlIE1JVCBMaWNlbnNlLiBTZWUgTElDRU5TRSBmaWxlIGZvciBkZXRhaWxzLlxuICovXG5cbmltcG9ydCB7IFNpbXBsZU9iamVjdCB9IGZyb20gXCJAL2NvcmUvU2ltcGxlT2JqZWN0XCI7XG5cbmNvbnN0IE5BTUUgPSBTeW1ib2woXCJOQU1FXCIpO1xuXG5leHBvcnQgY2xhc3MgVGFyZ2V0TmFtZSB7XG4gIHByaXZhdGUgW05BTUVdOiBzdHJpbmc7XG5cbiAgcHJpdmF0ZSBjb25zdHJ1Y3RvcihuYW1lOiBzdHJpbmcpIHtcbiAgICB0aGlzW05BTUVdID0gbmFtZTtcbiAgfVxuXG4gIHB1YmxpYyBzdGF0aWMgY3JlYXRlKG5hbWU6IHN0cmluZykge1xuICAgIHJldHVybiBPYmplY3Quc2VhbChuZXcgVGFyZ2V0TmFtZShuYW1lKSk7XG4gIH1cblxuICBwdWJsaWMgc3RhdGljIGZyb21KU09OKG9iamVjdDogU2ltcGxlT2JqZWN0KSB7XG4gICAgcmV0dXJuIFRhcmdldE5hbWUuY3JlYXRlKG9iamVjdC50YXJnZXROYW1lIGFzIHN0cmluZyk7XG4gIH1cblxuICBwdWJsaWMgZ2V0IHRhcmdldE5hbWUoKTogc3RyaW5nIHtcbiAgICByZXR1cm4gdGhpc1tOQU1FXTtcbiAgfVxuXG4gIHB1YmxpYyB0b1N0cmluZygpOiBzdHJpbmcge1xuICAgIHJldHVybiBcIiR7XCIgKyB0aGlzW05BTUVdICsgXCIubGlua31cIjtcbiAgfVxuXG4gIHB1YmxpYyB0b0pTT04oKTogU2ltcGxlT2JqZWN0IHtcbiAgICByZXR1cm4ge1xuICAgICAgdHlwZTogVGFyZ2V0TmFtZS5uYW1lLFxuICAgICAgdGFyZ2V0TmFtZTogdGhpc1tOQU1FXSxcbiAgICB9XG4gIH1cbn07XG5cblNpbXBsZU9iamVjdC5yZWdpc3Rlckluc3RhbmNlQ3JlYXRvcihUYXJnZXROYW1lLm5hbWUsIFRhcmdldE5hbWUuZnJvbUpTT04pO1xuIiwiLypcbiAqIE1JVCBMaWNlbnNlXG4gKlxuICogQ29weXJpZ2h0IChjKSAyMDI1ICBZdXJpaSBZYWt1YmluICh5dXJpaS55YWt1YmluQGdtYWlsLmNvbSlcbiAqXG4gKiBQZXJtaXNzaW9uIGlzIGdyYW50ZWQgdG8gdXNlLCBjb3B5LCBtb2RpZnksIGFuZCBkaXN0cmlidXRlIHRoaXMgc29mdHdhcmVcbiAqIHVuZGVyIHRoZSBNSVQgTGljZW5zZS4gU2VlIExJQ0VOU0UgZmlsZSBmb3IgZGV0YWlscy5cbiAqL1xuXG5pbXBvcnQgeyBTaW1wbGVPYmplY3QgfSBmcm9tIFwiQC9jb3JlL1NpbXBsZU9iamVjdFwiO1xuXG5jb25zdCBOQU1FID0gU3ltYm9sKFwiTkFNRVwiKTtcblxuZXhwb3J0IGNsYXNzIFRhcmdldE9iamVjdHMge1xuICBwcml2YXRlIFtOQU1FXTogc3RyaW5nO1xuXG4gIHByaXZhdGUgY29uc3RydWN0b3IobmFtZTogc3RyaW5nKSB7XG4gICAgdGhpc1tOQU1FXSA9IG5hbWU7XG4gIH1cblxuICBwdWJsaWMgc3RhdGljIGNyZWF0ZShuYW1lOiBzdHJpbmcpIHtcbiAgICByZXR1cm4gT2JqZWN0LnNlYWwobmV3IFRhcmdldE9iamVjdHMobmFtZSkpO1xuICB9XG5cbiAgcHVibGljIHN0YXRpYyBmcm9tSlNPTihvYmplY3Q6IFNpbXBsZU9iamVjdCkge1xuICAgIHJldHVybiBUYXJnZXRPYmplY3RzLmNyZWF0ZShvYmplY3QudGFyZ2V0TmFtZSBhcyBzdHJpbmcpO1xuICB9XG5cbiAgcHVibGljIHN0YXRpYyBlbnN1cmVJbnN0YW5jZSh2YWx1ZTogYW55KTogVGFyZ2V0T2JqZWN0cyB7XG4gICAgaWYgKHZhbHVlIGluc3RhbmNlb2YgVGFyZ2V0T2JqZWN0cylcbiAgICAgIHJldHVybiB2YWx1ZTtcbiAgICB0aHJvdyBuZXcgRXJyb3IoYFRoZSAnJHt2YWx1ZX0nIGlzIG5vdCBhIFRhcmdldE9iamVjdHNgKTtcbiAgfVxuXG4gIHB1YmxpYyBnZXQgdGFyZ2V0TmFtZSgpOiBzdHJpbmcge1xuICAgIHJldHVybiB0aGlzW05BTUVdO1xuICB9XG5cbiAgcHVibGljIHRvU3RyaW5nKCk6IHN0cmluZyB7XG4gICAgcmV0dXJuIFwiJHtcIiArIHRoaXNbTkFNRV0gKyBcIi5vYmplY3RzfVwiO1xuICB9XG5cbiAgcHVibGljIHRvSlNPTigpOiBTaW1wbGVPYmplY3Qge1xuICAgIHJldHVybiB7XG4gICAgICB0eXBlOiBUYXJnZXRPYmplY3RzLm5hbWUsXG4gICAgICB0YXJnZXROYW1lOiB0aGlzW05BTUVdLFxuICAgIH1cbiAgfVxufTtcblxuU2ltcGxlT2JqZWN0LnJlZ2lzdGVySW5zdGFuY2VDcmVhdG9yKFRhcmdldE9iamVjdHMubmFtZSwgVGFyZ2V0T2JqZWN0cy5mcm9tSlNPTik7XG4iLCIvKlxuICogTUlUIExpY2Vuc2VcbiAqXG4gKiBDb3B5cmlnaHQgKGMpIDIwMjUgIFl1cmlpIFlha3ViaW4gKHl1cmlpLnlha3ViaW5AZ21haWwuY29tKVxuICpcbiAqIFBlcm1pc3Npb24gaXMgZ3JhbnRlZCB0byB1c2UsIGNvcHksIG1vZGlmeSwgYW5kIGRpc3RyaWJ1dGUgdGhpcyBzb2Z0d2FyZVxuICogdW5kZXIgdGhlIE1JVCBMaWNlbnNlLiBTZWUgTElDRU5TRSBmaWxlIGZvciBkZXRhaWxzLlxuICovXG5cbmltcG9ydCB7IFByb2plY3RDb250ZXh0IH0gZnJvbSBcIkAvY29yZS9Qcm9qZWN0Q29udGV4dFwiO1xuaW1wb3J0IHsgVmFyaWFibGVNYXAgfSBmcm9tIFwiQC9jb3JlL1Njb3BlXCI7XG5pbXBvcnQgeyBHZW5lcmFsQ29udGV4dCB9IGZyb20gXCJAL2NvcmUvQmFzZUNvbnRleHRcIjtcbmltcG9ydCB7IGNyZWF0ZUNvbnRleHQgfSBmcm9tIFwiQC9jb3JlL0Jhc2VDb250ZXh0XCI7XG5cbmNvbnN0IEdMT0JBTCA9IFN5bWJvbChcIkdMT0JBTFwiKTtcbmNvbnN0IFNDT1BFID0gU3ltYm9sKFwiU0NPUEVcIik7XG5cbmV4cG9ydCBjbGFzcyBUb29sY2hhaW5Db250ZXh0IGV4dGVuZHMgR2VuZXJhbENvbnRleHQge1xuICBbU0NPUEVdOiBWYXJpYWJsZU1hcDtcbiAgW0dMT0JBTF06IFByb2plY3RDb250ZXh0O1xuXG4gIGNvbnN0cnVjdG9yKGdsb2JhbDogUHJvamVjdENvbnRleHQsIHNjb3BlOiBWYXJpYWJsZU1hcCkge1xuICAgIHN1cGVyKHNjb3BlKTtcbiAgICB0aGlzW0dMT0JBTF0gPSBnbG9iYWw7XG4gICAgdGhpc1tTQ09QRV0gPSBzY29wZTtcbiAgfVxuXG4gIHB1YmxpYyBzdGF0aWMgY3JlYXRlKGdsb2JhbDogUHJvamVjdENvbnRleHQsIHZhcmlhYmxlTWFwOiBWYXJpYWJsZU1hcCkge1xuICAgIHJldHVybiBjcmVhdGVDb250ZXh0KG5ldyBUb29sY2hhaW5Db250ZXh0KGdsb2JhbCwgdmFyaWFibGVNYXApKTtcbiAgfVxufTtcbiIsIi8qXG4gKiBNSVQgTGljZW5zZVxuICpcbiAqIENvcHlyaWdodCAoYykgMjAyNSAgWXVyaWkgWWFrdWJpbiAoeXVyaWkueWFrdWJpbkBnbWFpbC5jb20pXG4gKlxuICogUGVybWlzc2lvbiBpcyBncmFudGVkIHRvIHVzZSwgY29weSwgbW9kaWZ5LCBhbmQgZGlzdHJpYnV0ZSB0aGlzIHNvZnR3YXJlXG4gKiB1bmRlciB0aGUgTUlUIExpY2Vuc2UuIFNlZSBMSUNFTlNFIGZpbGUgZm9yIGRldGFpbHMuXG4gKi9cblxuZXhwb3J0IGNvbnN0IERFQlVHX0JVSUxEX1RZUEUgPSBcIkRlYnVnXCI7XG5leHBvcnQgY29uc3QgUkVMRUFTRV9CVUlMRF9UWVBFID0gXCJSZWxlYXNlXCI7XG4iLCIvKlxuICogTUlUIExpY2Vuc2VcbiAqXG4gKiBDb3B5cmlnaHQgKGMpIDIwMjUgIFl1cmlpIFlha3ViaW4gKHl1cmlpLnlha3ViaW5AZ21haWwuY29tKVxuICpcbiAqIFBlcm1pc3Npb24gaXMgZ3JhbnRlZCB0byB1c2UsIGNvcHksIG1vZGlmeSwgYW5kIGRpc3RyaWJ1dGUgdGhpcyBzb2Z0d2FyZVxuICogdW5kZXIgdGhlIE1JVCBMaWNlbnNlLiBTZWUgTElDRU5TRSBmaWxlIGZvciBkZXRhaWxzLlxuICovXG5cbmltcG9ydCB7IElNYWtlQ29udGV4dCwgSW50ZXJmYWNlU2NyaXB0IH0gZnJvbSBcIkAvY29yZS9NYWtlSW50ZXJmYWNlc1wiO1xuaW1wb3J0IHsgVmFyaWFudE1hcCwgVmFyaWFibGVNYXAsIFNjb3BlSGVscGVyIH0gZnJvbSBcIkAvY29yZS9TY29wZVwiO1xuaW1wb3J0IHsgU3lzdGVtU2NvcGUgfSBmcm9tIFwiQC9jb3JlL1N5c3RlbVNjb3BlXCI7XG5pbXBvcnQgeyBHZW5lcmFsQ29udGV4dCwgTWFrZUNvbnRleHQsIGNyZWF0ZUNvbnRleHQgfSBmcm9tIFwiQC9jb3JlL0Jhc2VDb250ZXh0XCI7XG5pbXBvcnQgeyBVc2VyVGFyZ2V0U3RydWN0IH0gZnJvbSBcIkAvY29yZS9Vc2VyVGFyZ2V0U3RydWN0XCI7XG5pbXBvcnQgeyBMb2dnZXIgfSBmcm9tIFwiQC9sb2dnZXJcIjtcblxuY29uc3QgbG9nZ2VyID0gTG9nZ2VyLmNyZWF0ZShpbXBvcnQubWV0YS51cmwpO1xuXG5jb25zdCBTQ09QRSA9IFN5bWJvbChcIlNDT1BFXCIpO1xuY29uc3QgSU1QTCA9IFN5bWJvbChcIklNUExcIik7XG5cbmV4cG9ydCBjbGFzcyBVc2VyTWFrZUNvbnRleHQgZXh0ZW5kcyBHZW5lcmFsQ29udGV4dCBpbXBsZW1lbnRzIElNYWtlQ29udGV4dCB7XG4gIFtJTVBMXTogTWFrZUNvbnRleHQ7XG4gIFtTQ09QRV06IFN5c3RlbVNjb3BlO1xuXG4gIHB1YmxpYyBjb25zdHJ1Y3RvcihpbXBsOiBNYWtlQ29udGV4dCwgdmFyaWFibGVNYXA6IFZhcmlhYmxlTWFwKSB7XG4gICAgc3VwZXIodmFyaWFibGVNYXApO1xuICAgIHRoaXNbSU1QTF0gPSBpbXBsO1xuICAgIHRoaXNbU0NPUEVdID0gU2NvcGVIZWxwZXIuY3JlYXRlUHJveHkodmFyaWFibGVNYXApO1xuICB9XG5cbiAgcHVibGljIHN0YXRpYyBjcmVhdGUoaW1wbDogTWFrZUNvbnRleHQsIHZhcmlhYmxlTWFwOiBWYXJpYWJsZU1hcCkge1xuICAgIHJldHVybiBjcmVhdGVDb250ZXh0KG5ldyBVc2VyTWFrZUNvbnRleHQoaW1wbCwgdmFyaWFibGVNYXApKTtcbiAgfVxuXG4gIHB1YmxpYyBnZXRDYWNoZVZhcmlhYmxlcygpIHtcbiAgICByZXR1cm4gdGhpc1tJTVBMXS5nZXRDYWNoZVZhcmlhYmxlcygpO1xuICB9XG5cbiAgcHVibGljIGFkZENhY2hlVmFyaWFibGVzKHBhcmFtczogc3RyaW5nIHwgVmFyaWFudE1hcCk6IHZvaWQge1xuICAgIHRoaXNbSU1QTF0uYWRkQ2FjaGVWYXJpYWJsZXMocGFyYW1zKTtcbiAgfVxuXG4gIHB1YmxpYyBhZGRJbmNsdWRlRGlyZWN0b3JpZXMoLi4uZGlyczogYW55W10pOiBhbnkge1xuICAgIHRoaXNbSU1QTF0uYWRkSW5jbHVkZURpcmVjdG9yaWVzKC4uLmRpcnMpO1xuICB9XG5cbiAgcHVibGljIGFkZFN1YmRpcmVjdG9yeShzb3VyY2VEaXI6IGFueSwgYmluYXJ5RGlyPzogYW55KSB7XG4gICAgdGhpc1tJTVBMXS5hZGRTdWJkaXJlY3Rvcnkoc291cmNlRGlyLCBiaW5hcnlEaXIpO1xuICB9XG4gIFxuICBwdWJsaWMgYWRkQ3VzdG9tU2NyaXB0KHNjcmlwdDogYW55LCBwYXJhbXM6IGFueSk6IEludGVyZmFjZVNjcmlwdCB7XG4gICAgcmV0dXJuIHRoaXNbSU1QTF0uYWRkQ3VzdG9tU2NyaXB0KHNjcmlwdCwgcGFyYW1zKTtcbiAgfVxuXG4gIHB1YmxpYyB0YXJnZXQobmFtZTogc3RyaW5nKTogVXNlclRhcmdldFN0cnVjdCB7XG4gICAgY29uc3QgdGFyZ2V0ID0gdGhpc1tJTVBMXS50YXJnZXQobmFtZSk7XG4gICAgcmV0dXJuIFVzZXJUYXJnZXRTdHJ1Y3QuY3JlYXRlKHRhcmdldCwgdGhpc1tTQ09QRV0pO1xuICB9XG5cbiAgcHVibGljIHNjcmlwdChuYW1lOiBzdHJpbmcpOiBJbnRlcmZhY2VTY3JpcHQge1xuICAgIHJldHVybiB0aGlzW0lNUExdLnNjcmlwdChuYW1lKTtcbiAgfVxuXG4gIHB1YmxpYyBpbnN0YWxsKHZhbHVlOiBhbnksIHBhcmFtczogYW55KTogdm9pZCB7XG4gICAgdGhpc1tJTVBMXS5pbnN0YWxsKHZhbHVlLCBwYXJhbXMpO1xuICB9XG5cbiAgcHVibGljIGFkZE9iamVjdExpYnJhcnkobmFtZTogYW55LCAuLi5zb3VyY2VzOiBhbnlbXSk6IFVzZXJUYXJnZXRTdHJ1Y3Qge1xuICAgIGNvbnN0IHRhcmdldCA9IHRoaXNbSU1QTF0uYWRkT2JqZWN0TGlicmFyeShuYW1lLCAuLi5zb3VyY2VzKTtcbiAgICByZXR1cm4gVXNlclRhcmdldFN0cnVjdC5jcmVhdGUodGFyZ2V0LCB0aGlzW1NDT1BFXSk7XG4gIH1cblxuICBwdWJsaWMgYWRkU3RhdGljTGlicmFyeShuYW1lOiBhbnksIC4uLnNvdXJjZXM6IGFueVtdKTogVXNlclRhcmdldFN0cnVjdCB7XG4gICAgY29uc3QgdGFyZ2V0ID0gdGhpc1tJTVBMXS5hZGRTdGF0aWNMaWJyYXJ5KG5hbWUsIC4uLnNvdXJjZXMpO1xuICAgIHJldHVybiBVc2VyVGFyZ2V0U3RydWN0LmNyZWF0ZSh0YXJnZXQsIHRoaXNbU0NPUEVdKTtcbiAgfVxuXG4gIHB1YmxpYyBhZGRTaGFyZWRMaWJyYXJ5KG5hbWU6IGFueSwgLi4uc291cmNlczogYW55W10pOiBVc2VyVGFyZ2V0U3RydWN0IHtcbiAgICBjb25zdCB0YXJnZXQgPSB0aGlzW0lNUExdLmFkZFNoYXJlZExpYnJhcnkobmFtZSwgLi4uc291cmNlcyk7XG4gICAgcmV0dXJuIFVzZXJUYXJnZXRTdHJ1Y3QuY3JlYXRlKHRhcmdldCwgdGhpc1tTQ09QRV0pO1xuICB9XG5cbiAgcHVibGljIGFkZEV4ZWN1dGFibGUobmFtZTogYW55LCAuLi5zb3VyY2VzOiBhbnlbXSk6IFVzZXJUYXJnZXRTdHJ1Y3Qge1xuICAgIGNvbnN0IHRhcmdldCA9IHRoaXNbSU1QTF0uYWRkRXhlY3V0YWJsZShuYW1lLCAuLi5zb3VyY2VzKTtcbiAgICByZXR1cm4gVXNlclRhcmdldFN0cnVjdC5jcmVhdGUodGFyZ2V0LCB0aGlzW1NDT1BFXSk7XG4gIH1cblxuICBwdWJsaWMgZXhlY3V0ZVNjcmlwdChzY3JpcHQ6IGFueSwgcGFyYW1zOiBhbnkpOiB2b2lkIHtcbiAgICB0aGlzW0lNUExdLmV4ZWN1dGVTY3JpcHQoc2NyaXB0LCBwYXJhbXMpO1xuICB9XG59O1xuIiwiLypcbiAqIE1JVCBMaWNlbnNlXG4gKlxuICogQ29weXJpZ2h0IChjKSAyMDI1ICBZdXJpaSBZYWt1YmluICh5dXJpaS55YWt1YmluQGdtYWlsLmNvbSlcbiAqXG4gKiBQZXJtaXNzaW9uIGlzIGdyYW50ZWQgdG8gdXNlLCBjb3B5LCBtb2RpZnksIGFuZCBkaXN0cmlidXRlIHRoaXMgc29mdHdhcmVcbiAqIHVuZGVyIHRoZSBNSVQgTGljZW5zZS4gU2VlIExJQ0VOU0UgZmlsZSBmb3IgZGV0YWlscy5cbiAqL1xuXG5pbXBvcnQgeyBJbnRlcmZhY2VUYXJnZXQgfSBmcm9tIFwiQC9jb3JlL01ha2VJbnRlcmZhY2VzXCI7XG5pbXBvcnQgeyBCYXNlVGFyZ2V0IH0gZnJvbSBcIkAvY29yZS9UYXJnZXRcIjtcbmltcG9ydCB7IFN5c3RlbVNjb3BlIH0gZnJvbSBcIkAvY29yZS9TeXN0ZW1TY29wZVwiO1xuaW1wb3J0IHsgZW5zdXJlU3RyaW5nIH0gZnJvbSBcIkAvdXRpbHMvU3RyaWN0VHlwZVwiO1xuaW1wb3J0IHsgTG9nZ2VyIH0gZnJvbSBcIkAvbG9nZ2VyXCI7XG5cbmNvbnN0IGxvZ2dlciA9IExvZ2dlci5jcmVhdGUoaW1wb3J0Lm1ldGEudXJsKTtcblxuY29uc3QgU0NPUEUgPSBTeW1ib2woXCJTQ09QRVwiKTtcbmNvbnN0IElNUEwgPSBTeW1ib2woXCJJTVBMXCIpO1xuXG5leHBvcnQgY2xhc3MgVXNlclRhcmdldFN0cnVjdCBleHRlbmRzIEludGVyZmFjZVRhcmdldCB7XG4gIFtJTVBMXTogQmFzZVRhcmdldDtcbiAgW1NDT1BFXTogU3lzdGVtU2NvcGU7XG5cbiAgcHJpdmF0ZSBjb25zdHJ1Y3RvcihpbXBsOiBCYXNlVGFyZ2V0LCBzY29wZTogU3lzdGVtU2NvcGUpIHtcbiAgICBzdXBlcigpO1xuICAgIHRoaXNbSU1QTF0gPSBpbXBsO1xuICAgIHRoaXNbU0NPUEVdID0gc2NvcGU7XG4gIH1cblxuICBwdWJsaWMgc3RhdGljIGNyZWF0ZShpbXBsOiBCYXNlVGFyZ2V0LCBzY29wZTogU3lzdGVtU2NvcGUpIHtcbiAgICByZXR1cm4gT2JqZWN0LnNlYWwobmV3IFVzZXJUYXJnZXRTdHJ1Y3QoaW1wbCwgc2NvcGUpKTtcbiAgfVxuXG4gIHB1YmxpYyBnZXQgdGFyZ2V0TmFtZSgpIHtcbiAgICByZXR1cm4gdGhpc1tJTVBMXS50YXJnZXROYW1lO1xuICB9XG5cbiAgcHVibGljIGdldCB0YXJnZXRGaWxlKCkge1xuICAgIHJldHVybiB0aGlzW0lNUExdLnRhcmdldEZpbGU7XG4gIH1cblxuICBwdWJsaWMgZ2V0IGluY2x1ZGVzKCkge1xuICAgIHJldHVybiB0aGlzW0lNUExdLmluY2x1ZGVzO1xuICB9XG5cbiAgcHVibGljIGdldCBvYmplY3RzKCkge1xuICAgIHJldHVybiB0aGlzW0lNUExdLm9iamVjdHM7XG4gIH1cbiAgXG4gIHB1YmxpYyBzZXRQcmVmaXgodmFsdWU6IGFueSk6IHZvaWQge1xuICAgIHRoaXNbSU1QTF0uc2V0UHJlZml4KGVuc3VyZVN0cmluZyh2YWx1ZSkpO1xuICB9XG5cbiAgcHVibGljIHNldFN1ZmZpeCh2YWx1ZTogYW55KTogdm9pZCB7XG4gICAgdGhpc1tJTVBMXS5zZXRTdWZmaXgoZW5zdXJlU3RyaW5nKHZhbHVlKSk7XG4gIH1cblxuICBwdWJsaWMgc2V0T3V0cHV0TmFtZSh2YWx1ZTogYW55KTogdm9pZCB7XG4gICAgdGhpc1tJTVBMXS5zZXRPdXRwdXROYW1lKGVuc3VyZVN0cmluZyh2YWx1ZSkpO1xuICB9XG5cbiAgcHVibGljIGFkZFNvdXJjZXMoLi4uc291cmNlczogYW55W10pOiB2b2lkIHtcbiAgICB0aGlzW0lNUExdLmFkZFNvdXJjZXMoLi4uc291cmNlcyk7XG4gIH1cblxuICBwdWJsaWMgYWRkSW5jbHVkZXMoLi4uaW5jbHVkZXM6IGFueVtdKTogdm9pZCB7XG4gICAgdGhpc1tJTVBMXS5hZGRJbmNsdWRlcyguLi5pbmNsdWRlcyk7XG4gIH1cblxuICBwdWJsaWMgYWRkTGlicmFyaWVzKC4uLmxpYnJhcmllczogYW55W10pOiB2b2lkIHtcbiAgICB0aGlzW0lNUExdLmFkZExpYnJhcmllcyguLi5saWJyYXJpZXMpO1xuICB9XG5cbiAgcHVibGljIGFkZENvbXBpbGVPcHRpb25zKC4uLm9wdGlvbnM6IGFueVtdKTogdm9pZCB7XG4gICAgdGhpc1tJTVBMXS5hZGRDb21waWxlT3B0aW9ucyguLi5vcHRpb25zKTtcbiAgfVxuXG4gIHB1YmxpYyBhZGRMaW5rT3B0aW9ucyguLi5vcHRpb25zOiBhbnlbXSk6IHZvaWQge1xuICAgIHRoaXNbSU1QTF0uYWRkTGlua09wdGlvbnMoLi4ub3B0aW9ucyk7XG4gIH1cblxuICBwdWJsaWMgZ2V0U291cmNlRmlsZXMoLi4uc291cmNlczogYW55W10pIHtcbiAgICByZXR1cm4gdGhpc1tJTVBMXS5nZXRTb3VyY2VGaWxlcyguLi5zb3VyY2VzKTtcbiAgfVxuXG4gIHB1YmxpYyBhZGREZWZpbml0aW9ucyguLi5kZWZpbml0aW9uczogYW55W10pOiB2b2lkIHtcbiAgICB0aGlzW0lNUExdLmFkZERlZmluaXRpb25zKC4uLmRlZmluaXRpb25zKTtcbiAgfVxuXG4gIHB1YmxpYyBhZGRQcmVCdWlsZChjb21tYW5kOiBhbnksIGFyZ3M6IGFueVtdKTogdm9pZCB7XG4gICAgdGhpc1tJTVBMXS5hZGRQcmVCdWlsZChjb21tYW5kLCBhcmdzKTtcbiAgfVxuXG4gIHB1YmxpYyBhZGRQb3N0QnVpbGQoY29tbWFuZDogYW55LCBhcmdzOiBhbnlbXSk6IHZvaWQge1xuICAgIHRoaXNbSU1QTF0uYWRkUG9zdEJ1aWxkKGNvbW1hbmQsIGFyZ3MpO1xuICB9XG5cbiAgcHVibGljIHNldFBvc2l0aW9uSW5kZXBlbmRlbnRDb2RlKHZhbHVlOiBib29sZWFuKTogdm9pZCB7XG4gICAgdGhpc1tJTVBMXS5zZXRQb3NpdGlvbkluZGVwZW5kZW50Q29kZSh2YWx1ZSk7XG4gIH1cblxuICBwdWJsaWMgYWRkUHVibGljSW5jbHVkZXMoLi4uaW5jbHVkZXM6IGFueVtdKTogdm9pZCB7XG4gICAgdGhpc1tJTVBMXS5hZGRQdWJsaWNJbmNsdWRlcyguLi5pbmNsdWRlcyk7XG4gIH1cblxuICBwdWJsaWMgYWRkUHVibGljRGVmaW5pdGlvbnMoLi4uZGVmaW5pdGlvbnM6IGFueSk6IHZvaWQge1xuICAgIHRoaXNbSU1QTF0uYWRkUHVibGljRGVmaW5pdGlvbnMoLi4uZGVmaW5pdGlvbnMpO1xuICB9XG5cbiAgcHVibGljIGFkZFB1YmxpY0xpYnJhcmllcyguLi5saWJyYXJpZXM6IGFueVtdKTogdm9pZCB7XG4gICAgdGhpc1tJTVBMXS5hZGRQdWJsaWNMaWJyYXJpZXMoLi4ubGlicmFyaWVzKTtcbiAgfVxuXG4gIHB1YmxpYyBhZGRQdWJsaWNDb21waWxlT3B0aW9ucyguLi5vcHRpb25zOiBhbnlbXSk6IHZvaWQge1xuICAgIHRoaXNbSU1QTF0uYWRkUHVibGljQ29tcGlsZU9wdGlvbnMoLi4ub3B0aW9ucyk7XG4gIH1cblxuICBwdWJsaWMgYWRkUHVibGljTGlua09wdGlvbnMoLi4ub3B0aW9uczogYW55W10pOiB2b2lkIHtcbiAgICB0aGlzW0lNUExdLmFkZFB1YmxpY0xpbmtPcHRpb25zKC4uLm9wdGlvbnMpO1xuICB9XG59O1xuIiwiLypcbiAqIE1JVCBMaWNlbnNlXG4gKlxuICogQ29weXJpZ2h0IChjKSAyMDI1ICBZdXJpaSBZYWt1YmluICh5dXJpaS55YWt1YmluQGdtYWlsLmNvbSlcbiAqXG4gKiBQZXJtaXNzaW9uIGlzIGdyYW50ZWQgdG8gdXNlLCBjb3B5LCBtb2RpZnksIGFuZCBkaXN0cmlidXRlIHRoaXMgc29mdHdhcmVcbiAqIHVuZGVyIHRoZSBNSVQgTGljZW5zZS4gU2VlIExJQ0VOU0UgZmlsZSBmb3IgZGV0YWlscy5cbiAqL1xuXG5pbXBvcnQgcGF0aCBmcm9tIFwibm9kZTpwYXRoXCI7XG5cbmV4cG9ydCBmdW5jdGlvbiBmaWxlbmFtZVRvUHJhZ21hT25jZU1hY3JvKGZpbGVwYXRoOiBzdHJpbmcsIGRlZXA6IG51bWJlcikge1xuICBpZiAodHlwZW9mIGRlZXAgPT09ICd1bmRlZmluZWQnKVxuICAgIGRlZXAgPSAzO1xuXG4gIGxldCBjb21wb25lbnRzID0gcGF0aC5ub3JtYWxpemUoZmlsZXBhdGgpLnNwbGl0KHBhdGguc2VwKTtcbiAgaWYgKGNvbXBvbmVudHMubGVuZ3RoID4gZGVlcClcbiAgICBjb21wb25lbnRzID0gY29tcG9uZW50cy5zbGljZShjb21wb25lbnRzLmxlbmd0aCAtIGRlZXApO1xuXG4gIHJldHVybiBcIl9cIiArIGNvbXBvbmVudHMuam9pbignXycpLnJlcGxhY2UoL1stIC46JX5dL2csICdfJykudG9VcHBlckNhc2UoKTtcbn1cblxuZXhwb3J0IGZ1bmN0aW9uIGxpbmVUb1NpbmdsQ29tbWVudChsaW5lOiBzdHJpbmcpIHtcbiAgcmV0dXJuIFwiLy9cIiArIGxpbmU7XG59XG5cbmV4cG9ydCBmdW5jdGlvbiBsaW5lVG9NdWx0aXBsZUNvbW1lbnQobGluZTogc3RyaW5nKSB7XG4gIHJldHVybiBgLyogJHtsaW5lfSAqL2A7XG59XG5cbmV4cG9ydCBmdW5jdGlvbiBnZW5lcmF0ZWRTY3JpcHROYW1lQ29tbWVudChmaWxlbmFtZTogc3RyaW5nKSB7XG4gIHJldHVybiBsaW5lVG9NdWx0aXBsZUNvbW1lbnQoXCJHZW5lcmF0ZWQgZnJvbSBcIiArIHBhdGguYmFzZW5hbWUoZmlsZW5hbWUpKTtcbn1cbiIsIi8qXG4gKiBNSVQgTGljZW5zZVxuICpcbiAqIENvcHlyaWdodCAoYykgMjAyNSAgWXVyaWkgWWFrdWJpbiAoeXVyaWkueWFrdWJpbkBnbWFpbC5jb20pXG4gKlxuICogUGVybWlzc2lvbiBpcyBncmFudGVkIHRvIHVzZSwgY29weSwgbW9kaWZ5LCBhbmQgZGlzdHJpYnV0ZSB0aGlzIHNvZnR3YXJlXG4gKiB1bmRlciB0aGUgTUlUIExpY2Vuc2UuIFNlZSBMSUNFTlNFIGZpbGUgZm9yIGRldGFpbHMuXG4gKi9cblxuZXhwb3J0IGludGVyZmFjZSBJTG9nZ2VyIHtcbiAgZGVidWcobWVzc2FnZT86IGFueSwgLi4ucGFyYW1zOiBhbnlbXSk6IHZvaWQ7XG4gIGluZm8obWVzc2FnZT86IGFueSwgLi4ucGFyYW1zOiBhbnlbXSk6IHZvaWQ7XG4gIG5vdGljZShtZXNzYWdlPzogYW55LCAuLi5wYXJhbXM6IGFueVtdKTogdm9pZDtcbiAgd2FybihtZXNzYWdlPzogYW55LCAuLi5wYXJhbXM6IGFueVtdKTogdm9pZDtcbiAgZXJyb3IobWVzc2FnZT86IGFueSwgLi4ucGFyYW1zOiBhbnlbXSk6IHZvaWQ7XG4gIGZhdGFsKG1lc3NhZ2U/OiBhbnksIC4uLnBhcmFtczogYW55W10pOiB2b2lkO1xufTtcblxudHlwZSBMb2dnZXJIYW5kbGVyID0gKG1lc3NhZ2U/OiBhbnksIC4uLnBhcmFtczogYW55W10pID0+IHZvaWQ7O1xuXG5pbnRlcmZhY2UgRW50cnlMb2dnZXIge1xuICB0YWdOYW1lOiBzdHJpbmc7XG4gIGZpbHRlcjogc3RyaW5nO1xuICBsb2dnZXI6IElMb2dnZXI7XG59O1xuXG5jb25zdCBTRVBBUkFUT1IgPSBcIiBcIjtcbmNvbnN0IE1FU1NBR0VfTUFYID0gMjQwO1xuXG5mdW5jdGlvbiB0b01lc3NhZ2VTdHJpbmcobzogYW55KSB7XG4gIHJldHVybiAodHlwZW9mIG8gPT09IFwic3RyaW5nXCIpID8gbyA6IEpTT04uc3RyaW5naWZ5KG8pO1xufVxuXG5mdW5jdGlvbiogbWVzc2FnZUdlbmVyYXRvcihtZXNzYWdlczogc3RyaW5nW10sIG1heExlbmd0aDogbnVtYmVyKSB7XG4gIGxldCBsZW5ndGggPSAwO1xuICBjb25zdCBtc2dMaXN0OiBzdHJpbmdbXSA9IFtdO1xuXG4gIGZvciAoOzspIHtcbiAgICBjb25zdCBpdGVyID0gbWVzc2FnZXMuc2hpZnQoKTtcbiAgICBpZiAoIWl0ZXIpXG4gICAgICBicmVhaztcblxuICAgIGlmIChtc2dMaXN0Lmxlbmd0aClcbiAgICAgIGxlbmd0aCArPSBTRVBBUkFUT1IubGVuZ3RoO1xuXG4gICAgbXNnTGlzdC5wdXNoKGl0ZXIpO1xuICAgIGxlbmd0aCArPSBpdGVyLmxlbmd0aDtcblxuICAgIHdoaWxlIChsZW5ndGggPiBtYXhMZW5ndGgpIHtcbiAgICAgIGNvbnN0IG1zZyA9IG1zZ0xpc3Quam9pbihTRVBBUkFUT1IpO1xuICAgICAgY29uc3QgbmV4dE1zZyA9IG1zZy5zdWJzdHJpbmcobWF4TGVuZ3RoKTtcbiAgICAgIG1zZ0xpc3QubGVuZ3RoID0gMDtcbiAgICAgIG1zZ0xpc3QucHVzaChuZXh0TXNnKTtcbiAgICAgIGxlbmd0aCA9IG5leHRNc2cubGVuZ3RoO1xuICAgICAgeWllbGQgbXNnLnN1YnN0cmluZygwLCBtYXhMZW5ndGgpO1xuICAgIH1cbiAgfVxuXG4gIHlpZWxkIG1zZ0xpc3Quam9pbihTRVBBUkFUT1IpO1xufVxuXG5mdW5jdGlvbiBtYWtlTG9nTWV0aG9kKHdpdGhQcmVmaXg6IGJvb2xlYW4sIHR5cGU6IHN0cmluZywgdGFnTmFtZTogc3RyaW5nLCB0YXJnZXQ6IGFueSwgaGFuZGxlcjogTG9nZ2VySGFuZGxlcikge1xuICByZXR1cm4gKC4uLmFyZ3M6IGFueVtdKSA9PiB7XG4gICAgY29uc3Qgbm93ID0gbmV3IERhdGUoKTtcbiAgICBjb25zdCBtZXNzYWdlcyA9IGFyZ3MubWFwKGkgPT4gdG9NZXNzYWdlU3RyaW5nKGkpKVxuXG4gICAgaWYgKCF3aXRoUHJlZml4KSB7XG4gICAgICBoYW5kbGVyLmNhbGwodGFyZ2V0LCBtZXNzYWdlcy5qb2luKFNFUEFSQVRPUikpO1xuICAgICAgcmV0dXJuO1xuICAgIH1cblxuICAgIGNvbnN0IHByZWZpeCA9IFsgbm93LnRvSVNPU3RyaW5nKCksIHR5cGUsIHRhZ05hbWUgXS5qb2luKFNFUEFSQVRPUik7XG4gICAgZm9yIChjb25zdCBpdGVyIG9mIG1lc3NhZ2VHZW5lcmF0b3IobWVzc2FnZXMsIE1FU1NBR0VfTUFYIC0gcHJlZml4Lmxlbmd0aCAtIFNFUEFSQVRPUi5sZW5ndGgpKSB7XG4gICAgICBoYW5kbGVyLmNhbGwodGFyZ2V0LCBbcHJlZml4LCBpdGVyXS5qb2luKFNFUEFSQVRPUikpO1xuICAgIH1cbiAgfTtcbn1cblxubGV0IF9kZWZhdWx0UGF0dGVybiA9IFwiXCI7XG5jb25zdCBfbG9nZ2VyTWFwID0gbmV3IE1hcDxzdHJpbmcsIEVudHJ5TG9nZ2VyPigpO1xuXG5jb25zdCBzdHViID0gKCkgPT4ge307XG5cbmZ1bmN0aW9uIGluaXRMb2dnZXIobG9nZ2VyOiBJTG9nZ2VyLCB0YWdOYW1lOiBzdHJpbmcsIGZpbHRlcjogc3RyaW5nKSB7XG4gIGxvZ2dlci5kZWJ1ZyA9IHN0dWI7XG4gIGxvZ2dlci5pbmZvID0gc3R1YjtcbiAgbG9nZ2VyLm5vdGljZSA9IHN0dWI7XG4gIGxvZ2dlci53YXJuID0gc3R1YjtcbiAgbG9nZ2VyLmVycm9yID0gc3R1YjtcbiAgbG9nZ2VyLmZhdGFsID0gc3R1YjtcblxuICBsZXQgbGV2ZWwgPSAwO1xuICBjb25zdCBmbGFnczogYW55ID0ge307XG4gIGZvciAoY29uc3QgaXRlciBvZiBmaWx0ZXIuc3BsaXQoXCIsXCIpKSB7XG4gICAgaWYgKGl0ZXIgPT09IFwiKlwiKSB7XG4gICAgICBsZXZlbCA9IDU7XG4gICAgICBicmVhaztcbiAgICB9XG4gICAgaWYgKC9eXFxkKyQvLnRlc3QoaXRlcikpXG4gICAgICBsZXZlbCA9IE1hdGgubWF4KGxldmVsLCBwYXJzZUludChpdGVyKSk7XG4gICAgZWxzZVxuICAgICAgZmxhZ3NbaXRlcl0gPSB0cnVlO1xuICB9XG5cbiAgbG9nZ2VyLmZhdGFsID0gbWFrZUxvZ01ldGhvZChsZXZlbCA+IDIsIFwiRlwiLCB0YWdOYW1lLCBjb25zb2xlLCBjb25zb2xlLmVycm9yKTtcblxuICBpZiAobGV2ZWwgPiAxIHx8IGZsYWdzLmVycm9yKVxuICAgIGxvZ2dlci5lcnJvciA9IG1ha2VMb2dNZXRob2QobGV2ZWwgPiAyLCBcIkVcIiwgdGFnTmFtZSwgY29uc29sZSwgY29uc29sZS5lcnJvcik7XG5cbiAgaWYgKGxldmVsID4gMiB8fCBmbGFncy53YXJuKVxuICAgIGxvZ2dlci53YXJuID0gbWFrZUxvZ01ldGhvZChsZXZlbCA+IDIsIFwiV1wiLCB0YWdOYW1lLCBjb25zb2xlLCBjb25zb2xlLndhcm4pO1xuXG4gIGxvZ2dlci5ub3RpY2UgPSBtYWtlTG9nTWV0aG9kKGxldmVsID4gMiwgXCJOXCIsIHRhZ05hbWUsIGNvbnNvbGUsIGNvbnNvbGUubG9nKTtcblxuICBpZiAobGV2ZWwgPiAzIHx8IGZsYWdzLmluZm8pXG4gICAgbG9nZ2VyLmluZm8gPSBtYWtlTG9nTWV0aG9kKGxldmVsID4gMiwgXCJJXCIsIHRhZ05hbWUsIGNvbnNvbGUsIGNvbnNvbGUuaW5mbyk7XG5cbiAgaWYgKGxldmVsID4gNCB8fCBmbGFncy5kZWJ1ZylcbiAgICBsb2dnZXIuZGVidWcgPSBtYWtlTG9nTWV0aG9kKGxldmVsID4gMiwgXCJEXCIsIHRhZ05hbWUsIGNvbnNvbGUsIGNvbnNvbGUuZGVidWcpO1xufVxuXG5mdW5jdGlvbiBjcmVhdGVFbnRyeSh0YWdOYW1lOiBzdHJpbmcsIGZpbHRlcjogc3RyaW5nKSB7XG4gIGNvbnN0IGVudHJ5ID0geyB0YWdOYW1lLCBmaWx0ZXIsIGxvZ2dlcjoge30gYXMgSUxvZ2dlciB9O1xuICBpbml0TG9nZ2VyKGVudHJ5LmxvZ2dlciwgdGFnTmFtZSwgZmlsdGVyKTtcbiAgcmV0dXJuIGVudHJ5O1xufVxuXG5mdW5jdGlvbiBlbnRyeVNldEZpbHRlcihlbnRyeTogRW50cnlMb2dnZXIsIGZpbHRlcjogc3RyaW5nKSB7XG4gIGlmIChlbnRyeS5maWx0ZXIgIT09IGZpbHRlcikge1xuICAgIGluaXRMb2dnZXIoZW50cnkubG9nZ2VyLCBlbnRyeS50YWdOYW1lLCBmaWx0ZXIpO1xuICAgIGVudHJ5LmZpbHRlciA9IGZpbHRlcjtcbiAgfVxufVxuXG5mdW5jdGlvbiBhbGxTZXRGaWx0ZXIoZmlsdGVyOiBzdHJpbmcpIHtcbiAgX2RlZmF1bHRQYXR0ZXJuID0gZmlsdGVyO1xuICBmb3IgKGNvbnN0IGVudHJ5IG9mIF9sb2dnZXJNYXAudmFsdWVzKCkpXG4gICAgZW50cnlTZXRGaWx0ZXIoZW50cnksIGZpbHRlcik7XG59XG5cbmV4cG9ydCBuYW1lc3BhY2UgTG9nZ2VyIHtcblxuZXhwb3J0IGZ1bmN0aW9uIGNyZWF0ZSh1cmw6IHN0cmluZyk6IElMb2dnZXIge1xuICBjb25zdCB0YWdOYW1lID0gdXJsLnN0YXJ0c1dpdGgoSE9TVF9TT1VSQ0VfVVJMICsgXCIvXCIpID8gdXJsLnN1YnN0cmluZyhIT1NUX1NPVVJDRV9VUkwubGVuZ3RoICsgMSkgOiB1cmw7XG4gIGlmICghdGFnTmFtZSB8fCB0YWdOYW1lID09PSBcIipcIilcbiAgICB0aHJvdyBuZXcgRXJyb3IoYExvZ2dlciAke3VybH0gbm90IGFsbG93ZWRgKTtcblxuICBsZXQgZW50cnkgPSBfbG9nZ2VyTWFwLmdldCh0YWdOYW1lKTtcbiAgaWYgKCFlbnRyeSkge1xuICAgIGVudHJ5ID0gY3JlYXRlRW50cnkodGFnTmFtZSwgX2RlZmF1bHRQYXR0ZXJuKTtcbiAgICBfbG9nZ2VyTWFwLnNldCh0YWdOYW1lLCBlbnRyeSk7XG4gIH1cblxuICByZXR1cm4gZW50cnkubG9nZ2VyO1xufVxuXG5leHBvcnQgZnVuY3Rpb24gZW5hYmxlKGZpbHRlcjogc3RyaW5nKSB7XG4gIGlmIChmaWx0ZXIgPT09IFwiKlwiKSB7XG4gICAgYWxsU2V0RmlsdGVyKFwiKlwiKTtcbiAgICByZXR1cm47XG4gIH1cblxuICBjb25zdCBwYWlyID0gZmlsdGVyLnNwbGl0KFwiOlwiKTtcbiAgaWYgKHBhaXIubGVuZ3RoIDwgMilcbiAgICByZXR1cm47XG5cbiAgaWYgKHBhaXJbMF0gPT09IFwiKlwiKSB7XG4gICAgYWxsU2V0RmlsdGVyKHBhaXJbMV0pO1xuICAgIHJldHVybjtcbiAgfVxuXG4gIGxldCBlbnRyeSA9IF9sb2dnZXJNYXAuZ2V0KHBhaXJbMF0pO1xuICBpZiAoIWVudHJ5KSB7XG4gICAgZW50cnkgPSBjcmVhdGVFbnRyeShwYWlyWzBdLCBwYWlyWzFdKTtcbiAgICBfbG9nZ2VyTWFwLnNldChmaWx0ZXIsIGVudHJ5KTtcbiAgfVxuICBlbHNlICB7XG4gICAgZW50cnlTZXRGaWx0ZXIoZW50cnksIHBhaXJbMV0pO1xuICB9XG59XG5cbn0gLy8gbmFtZXNwYWNlIExvZ2dlclxuXG5mb3IgKGNvbnN0IGl0ZXIgb2YgTE9HR0VSX0RFQlVHKSB7XG4gIExvZ2dlci5lbmFibGUoaXRlcik7XG59XG4iLCIvKlxuICogTUlUIExpY2Vuc2VcbiAqXG4gKiBDb3B5cmlnaHQgKGMpIDIwMjUgIFl1cmlpIFlha3ViaW4gKHl1cmlpLnlha3ViaW5AZ21haWwuY29tKVxuICpcbiAqIFBlcm1pc3Npb24gaXMgZ3JhbnRlZCB0byB1c2UsIGNvcHksIG1vZGlmeSwgYW5kIGRpc3RyaWJ1dGUgdGhpcyBzb2Z0d2FyZVxuICogdW5kZXIgdGhlIE1JVCBMaWNlbnNlLiBTZWUgTElDRU5TRSBmaWxlIGZvciBkZXRhaWxzLlxuICovXG5cbmltcG9ydCB7IEpTT05SUENfVkVSU0lPTiB9IGZyb20gXCJAL3NlcnZlci9UcmFuc3BvcnRcIjtcbmltcG9ydCB7IElSZXF1ZXN0U3luYyB9IGZyb20gXCJAL3NlcnZlci9UcmFuc3BvcnRcIjtcbmltcG9ydCB7IExvZ2dlciB9IGZyb20gXCJAL2xvZ2dlclwiO1xuXG5jb25zdCBsb2dnZXIgPSBMb2dnZXIuY3JlYXRlKGltcG9ydC5tZXRhLnVybCk7XG5cbmV4cG9ydCBjbGFzcyBKc29uUnBjUmVxdWVzdFN5bmMge1xuICBwcml2YXRlIF9yZXF1ZXN0OiBJUmVxdWVzdFN5bmM7XG4gIHByaXZhdGUgX2lkOiBudW1iZXI7XG5cbiAgcHVibGljIGNvbnN0cnVjdG9yKHJlcXVlc3RTeW5jOiBJUmVxdWVzdFN5bmMpIHtcbiAgICB0aGlzLl9yZXF1ZXN0ID0gcmVxdWVzdFN5bmM7XG4gICAgdGhpcy5faWQgPSAxO1xuICB9XG5cbiAgcHVibGljIHJlcXVlc3RTeW5jKG1ldGhvZDogc3RyaW5nLCBwYXJhbXM6IGFueSk6IGFueSB7XG4gICAgbG9nZ2VyLmRlYnVnKFwiSnNvblJwY1JlcXVlc3RTeW5jLnJlcXVlc3RTeW5jKFwiLCBtZXRob2QsIFwiLi4ucGFyYW1zKVwiKTtcbiAgICBjb25zdCBtZXNzYWdlID0ge1xuICAgICAganNvbnJwYzogSlNPTlJQQ19WRVJTSU9OLFxuICAgICAgbWV0aG9kLFxuICAgICAgcGFyYW1zLFxuICAgICAgaWQ6IHRoaXMuX2lkKyssXG4gICAgfTtcbiAgICBjb25zdCByZXNwb25zZSA9IHRoaXMuX3JlcXVlc3QucmVxdWVzdFN5bmMobWVzc2FnZSk7XG4gICAgaWYgKHJlc3BvbnNlLmVycm9yKVxuICAgICAgdGhyb3cgbmV3IEVycm9yKHJlc3BvbnNlLmVycm9yLm1lc3NhZ2UsIHsgY2F1c2U6IHJlc3BvbnNlLmVycm9yLmNvZGUgfSk7XG4gICAgcmV0dXJuIHJlc3BvbnNlLnJlc3VsdDtcbiAgfVxufTtcbiIsIi8qXG4gKiBNSVQgTGljZW5zZVxuICpcbiAqIENvcHlyaWdodCAoYykgMjAyNSAgWXVyaWkgWWFrdWJpbiAoeXVyaWkueWFrdWJpbkBnbWFpbC5jb20pXG4gKlxuICogUGVybWlzc2lvbiBpcyBncmFudGVkIHRvIHVzZSwgY29weSwgbW9kaWZ5LCBhbmQgZGlzdHJpYnV0ZSB0aGlzIHNvZnR3YXJlXG4gKiB1bmRlciB0aGUgTUlUIExpY2Vuc2UuIFNlZSBMSUNFTlNFIGZpbGUgZm9yIGRldGFpbHMuXG4gKi9cblxuaW1wb3J0IHsgSlNPTlJQQ19WRVJTSU9OLCBJTWVzc2FnZVNlbmRlciwgSnNvblJwY0RhdGEsIEpzb25ScGNSZXF1ZXN0SGFuZGxlciwgSUpzb25ScGNSZXF1ZXN0LCBJSnNvblJwY1Jlc3BvbnNlLCBKc29uUnBjQ2FsbGJhY2sgfSBmcm9tIFwiQC9zZXJ2ZXIvVHJhbnNwb3J0XCI7XG5pbXBvcnQgeyBMb2dnZXIgfSBmcm9tIFwiQC9sb2dnZXJcIjtcblxuY29uc3QgbG9nZ2VyID0gTG9nZ2VyLmNyZWF0ZShpbXBvcnQubWV0YS51cmwpO1xuXG5jbGFzcyBKc29uUnBjUmVxdWVzdCBpbXBsZW1lbnRzIElKc29uUnBjUmVxdWVzdCB7XG4gIHByaXZhdGUgX3BhcmFtczogYW55O1xuXG4gIGNvbnN0cnVjdG9yKHBhcmFtczogYW55KSB7XG4gICAgdGhpcy5fcGFyYW1zID0gcGFyYW1zO1xuICB9XG5cbiAgZ2V0IHBhcmFtcygpOiBhbnkge1xuICAgIHJldHVybiB0aGlzLl9wYXJhbXM7XG4gIH1cbn1cblxuY2xhc3MgSnNvblJwY1Jlc3BvbnNlIGltcGxlbWVudHMgSUpzb25ScGNSZXNwb25zZSB7XG4gIHByaXZhdGUgX3NlbmRlcjogSU1lc3NhZ2VTZW5kZXI7XG4gIHByaXZhdGUgX2lkOiBudW1iZXI7XG5cbiAgcHVibGljIGNvbnN0cnVjdG9yKHNlbmRlcjogSU1lc3NhZ2VTZW5kZXIsIGlkOiBudW1iZXIpIHtcbiAgICB0aGlzLl9zZW5kZXIgPSBzZW5kZXI7XG4gICAgdGhpcy5faWQgPSBpZDtcbiAgfVxuXG4gIHNlbmRSZXN1bHQocmVzdWx0OiBhbnkpOiB2b2lkIHtcbiAgICBjb25zdCBtZXNzYWdlOiBKc29uUnBjRGF0YSA9IHtcbiAgICAgIGpzb25ycGM6IEpTT05SUENfVkVSU0lPTixcbiAgICAgIHJlc3VsdDogKHJlc3VsdCAhPT0gdW5kZWZpbmVkKSA/IHJlc3VsdCA6IG51bGwsXG4gICAgICBpZDogdGhpcy5faWQsXG4gICAgfTtcbiAgICBsb2dnZXIuZGVidWcoXCI8LS1cIiwgSlNPTi5zdHJpbmdpZnkobWVzc2FnZSkpO1xuICAgIHRoaXMuX3NlbmRlci5zZW5kTWVzc2FnZShtZXNzYWdlKTtcbiAgfVxuXG4gIHNlbmRFcnJvcihjb2RlOiBudW1iZXIsIG1lc3NhZ2U6IHN0cmluZywgZGF0YT86IGFueSk6IHZvaWQge1xuICAgIGNvbnN0IGVycm9yOiBhbnkgPSB7IGNvZGUsIG1lc3NhZ2UgfTtcbiAgICBpZiAoZGF0YSAhPT0gdW5kZWZpbmVkKSB7XG4gICAgICBlcnJvci5kYXRhID0gZGF0YTtcbiAgICB9XG4gICAgY29uc3QgbXNnOiBKc29uUnBjRGF0YSA9IHtcbiAgICAgIGpzb25ycGM6IEpTT05SUENfVkVSU0lPTixcbiAgICAgIGVycm9yLFxuICAgICAgaWQ6IHRoaXMuX2lkLFxuICAgIH07XG4gICAgbG9nZ2VyLmRlYnVnKFwiPC0tXCIsIEpTT04uc3RyaW5naWZ5KG1zZykpO1xuICAgIHRoaXMuX3NlbmRlci5zZW5kTWVzc2FnZShtc2cpO1xuICB9XG59O1xuXG5leHBvcnQgY2xhc3MgSnNvblJwY1NlcnZlciB7XG4gIHByaXZhdGUgX3JlcXVlc3RIYW5kbGVycyA9IG5ldyBNYXA8c3RyaW5nLCBKc29uUnBjUmVxdWVzdEhhbmRsZXI+KCk7XG5cbiAgcHVibGljIGNvbnN0cnVjdG9yKCkge1xuICB9XG5cbiAgcHVibGljIHJlZ2lzdGVySGFuZGxlcihtZXRob2Q6IHN0cmluZywgaGFuZGxlcjogSnNvblJwY1JlcXVlc3RIYW5kbGVyKTogdm9pZCB7XG4gICAgdGhpcy5fcmVxdWVzdEhhbmRsZXJzLnNldChtZXRob2QsIGhhbmRsZXIpO1xuICB9XG5cbiAgcHVibGljIHJlZ2lzdGVyQ2FsbGJhY2sobWV0aG9kOiBzdHJpbmcsIGNhbGxiYWNrOiBKc29uUnBjQ2FsbGJhY2spOiB2b2lkIHtcbiAgICB0aGlzLl9yZXF1ZXN0SGFuZGxlcnMuc2V0KG1ldGhvZCwgYXN5bmMgKHJlcXVlc3QsIHJlc3BvbnNlKSA9PiB7XG4gICAgICBsZXQgcmVzdWx0OiBhbnkgPSBjYWxsYmFjayhyZXF1ZXN0LnBhcmFtcyk7XG4gICAgICBpZiAocmVzdWx0IGluc3RhbmNlb2YgUHJvbWlzZSlcbiAgICAgICAgcmVzdWx0ID0gYXdhaXQgcmVzdWx0O1xuICAgICAgaWYgKHJlc3VsdCAmJiB0eXBlb2YgcmVzdWx0ID09PSBcIm9iamVjdFwiICYmIHR5cGVvZiByZXN1bHQudG9KU09OID09PSBcImZ1bmN0aW9uXCIpXG4gICAgICAgIHJlc3VsdCA9IHJlc3VsdC50b0pTT04oKTtcbiAgICAgIHJlc3BvbnNlLnNlbmRSZXN1bHQocmVzdWx0KTtcbiAgICB9KTtcbiAgfVxuXG4gIHB1YmxpYyBvblJlcXVlc3Qoc2VuZGVyOiBJTWVzc2FnZVNlbmRlciwgbWV0aG9kOiBhbnksIGlkOiBhbnksIHBhcmFtczogYW55KTogdm9pZCB7XG4gICAgY29uc3QgaGFuZGxlciA9ICh0eXBlb2YgbWV0aG9kID09PSBcInN0cmluZ1wiKSA/IHRoaXMuX3JlcXVlc3RIYW5kbGVycy5nZXQobWV0aG9kKSA6IHVuZGVmaW5lZDtcbiAgICBjb25zdCByZXNwb25zZSA9IG5ldyBKc29uUnBjUmVzcG9uc2Uoc2VuZGVyLCBpZCk7XG4gICAgaWYgKGhhbmRsZXIpIHtcbiAgICAgIGhhbmRsZXIobmV3IEpzb25ScGNSZXF1ZXN0KHBhcmFtcyksIHJlc3BvbnNlKTtcbiAgICB9XG4gICAgZWxzZSB7XG4gICAgICByZXNwb25zZS5zZW5kRXJyb3IoLTMyNjAxLCBcIk1ldGhvZCBub3QgZm91bmRcIik7XG4gICAgfVxuICB9XG5cbiAgcHVibGljIG9uUmVzdWx0KHNlbmRlcjogSU1lc3NhZ2VTZW5kZXIsIHJlc3VsdDogYW55LCBpZDogbnVtYmVyKTogdm9pZCB7XG4gICAgXG4gIH1cblxuICBwdWJsaWMgb25FcnJvcihzZW5kZXI6IElNZXNzYWdlU2VuZGVyLCBlcnJvcjogb2JqZWN0LCBpZDogbnVtYmVyIHwgbnVsbCk6IHZvaWQge1xuICAgIFxuICB9XG5cbiAgcHVibGljIG9uTm90aWZpY2F0aW9uKHNlbmRlcjogSU1lc3NhZ2VTZW5kZXIsIG1ldGhvZDogYW55LCBwYXJhbXM/OiBhbnkpOiB2b2lkIHtcbiAgICBcbiAgfVxuXG4gIHByaXZhdGUgb25NZXNzYWdlSW1wbChzZW5kZXI6IElNZXNzYWdlU2VuZGVyLCBtZXNzYWdlOiBhbnkpOiB2b2lkIHtcbiAgICBpZiAoIW1lc3NhZ2UgfHwgdHlwZW9mIG1lc3NhZ2UgIT09IFwib2JqZWN0XCIpIHtcbiAgICAgIHJldHVybjtcbiAgICB9XG5cbiAgICBjb25zdCBkYXRhID0gbWVzc2FnZSBhcyBKc29uUnBjRGF0YTtcblxuICAgIGlmIChPYmplY3QuaGFzT3duKGRhdGEsIFwibWV0aG9kXCIpKSB7XG4gICAgICBpZiAoT2JqZWN0Lmhhc093bihkYXRhLCBcImlkXCIpKVxuICAgICAgICB0aGlzLm9uUmVxdWVzdChzZW5kZXIsIGRhdGEubWV0aG9kLCBkYXRhLmlkLCBkYXRhLnBhcmFtcyk7XG4gICAgICBlbHNlXG4gICAgICAgIHRoaXMub25Ob3RpZmljYXRpb24oc2VuZGVyLCBkYXRhLm1ldGhvZCwgZGF0YS5wYXJhbXMpO1xuICAgIH1cbiAgICBlbHNlIGlmIChkYXRhLmlkKSB7XG4gICAgICBcbiAgICB9XG4gICAgZWxzZSB7XG5cbiAgICB9XG4gIH1cblxuICBwdWJsaWMgZW1pdE1lc3NhZ2Uoc2VuZGVyOiBJTWVzc2FnZVNlbmRlciwgbWVzc2FnZTogYW55KTogdm9pZCB7XG4gICAgbG9nZ2VyLmRlYnVnKFwiLS0+XCIsIEpTT04uc3RyaW5naWZ5KG1lc3NhZ2UpKTtcbiAgICBpZiAoQXJyYXkuaXNBcnJheShtZXNzYWdlKSlcbiAgICAgIG1lc3NhZ2UuZm9yRWFjaChtc2cgPT4gdGhpcy5vbk1lc3NhZ2VJbXBsKHNlbmRlciwgbXNnKSk7XG4gICAgZWxzZVxuICAgICAgdGhpcy5vbk1lc3NhZ2VJbXBsKHNlbmRlciwgbWVzc2FnZSk7XG4gIH1cbn07XG4iLCIvKlxuICogTUlUIExpY2Vuc2VcbiAqXG4gKiBDb3B5cmlnaHQgKGMpIDIwMjUgIFl1cmlpIFlha3ViaW4gKHl1cmlpLnlha3ViaW5AZ21haWwuY29tKVxuICpcbiAqIFBlcm1pc3Npb24gaXMgZ3JhbnRlZCB0byB1c2UsIGNvcHksIG1vZGlmeSwgYW5kIGRpc3RyaWJ1dGUgdGhpcyBzb2Z0d2FyZVxuICogdW5kZXIgdGhlIE1JVCBMaWNlbnNlLiBTZWUgTElDRU5TRSBmaWxlIGZvciBkZXRhaWxzLlxuICovXG5cbmltcG9ydCB7IFdvcmtlciB9IGZyb20gXCJub2RlOndvcmtlcl90aHJlYWRzXCI7XG5cbmltcG9ydCB7IGN1cnJlbnRTY3JpcHRVUkwgfSBmcm9tIFwiQC91dGlscy9Nb2R1bGVcIjtcbmltcG9ydCB7IE1lbW9yeU1lc3NhZ2VTZW5kZXIgfSBmcm9tIFwiQC9zZXJ2ZXIvTWVtb3J5VHJhbnNwb3J0XCI7XG5pbXBvcnQgeyBXb3JrZXJTZW5kZXIgfSBmcm9tIFwiQC9zZXJ2ZXIvV29ya2VyU2VuZGVyXCI7XG5pbXBvcnQgeyBTY29wZUhlbHBlciwgVmFyaWFibGVNYXAgfSBmcm9tIFwiQC9jb3JlL1Njb3BlXCI7XG5pbXBvcnQgeyBKU09OUlBDX1ZFUlNJT04gfSBmcm9tIFwiQC9zZXJ2ZXIvVHJhbnNwb3J0XCI7XG5pbXBvcnQgeyBKc29uUnBjU2VydmVyIH0gZnJvbSBcIkAvc2VydmVyL0pzb25ScGNTZXJ2ZXJcIjtcbmltcG9ydCB7IExvZ2dlciB9IGZyb20gXCJAL2xvZ2dlclwiO1xuXG5jb25zdCBsb2dnZXIgPSBMb2dnZXIuY3JlYXRlKGltcG9ydC5tZXRhLnVybCk7XG5cbmludGVyZmFjZSBSZXNwb25zZUVudHJ5IHtcbiAgcmVzb2x2ZTogKHZhbHVlOiBhbnkpID0+IHZvaWQ7XG4gIHJlamVjdDogKHJlYXNvbj86IGFueSkgPT4gdm9pZDtcbn07XG5cbmV4cG9ydCBjbGFzcyBNYWtlQ2xpZW50IHtcbiAgcHJpdmF0ZSBfanNvblJwY1NlcnZlcjogSnNvblJwY1NlcnZlcjtcbiAgcHJpdmF0ZSBfd29ya2VyOiBXb3JrZXI7XG4gIHByaXZhdGUgX2lkID0gMTtcbiAgcHJpdmF0ZSBfd2FpdFJlc3BvbnNlTWFwID0gbmV3IE1hcDxudW1iZXIsUmVzcG9uc2VFbnRyeT4oKTs7XG5cbiAgcHVibGljIGNvbnN0cnVjdG9yKGpzb25ScGNTZXJ2ZXI6IEpzb25ScGNTZXJ2ZXIpIHtcbiAgICB0aGlzLl9qc29uUnBjU2VydmVyID0ganNvblJwY1NlcnZlcjtcbiAgICB0aGlzLl93b3JrZXIgPSBuZXcgV29ya2VyKGN1cnJlbnRTY3JpcHRVUkwoKSk7XG4gICAgdGhpcy5fd29ya2VyLm9uKFwibWVzc2FnZVwiLCBtZXNzYWdlID0+IHRoaXMub25Xb3JrZXJNZXNzYWdlKG1lc3NhZ2UpKTtcbiAgICB0aGlzLl93b3JrZXIub24oXCJlcnJvclwiLCBlcnJvciA9PiB0aGlzLm9uV29ya2VyRXJyb3IoZXJyb3IpKTtcbiAgICB0aGlzLl93b3JrZXIub24oXCJleGl0XCIsIGNvZGUgPT4gdGhpcy5vbldvcmtlckV4aXQoY29kZSkpO1xuICB9XG5cbiAgcHVibGljIGFzeW5jIHJlcXVlc3QobWV0aG9kOiBzdHJpbmcsIHBhcmFtczogYW55KTogUHJvbWlzZTxhbnk+IHtcbiAgICBjb25zdCBpZCA9IHRoaXMuX2lkKys7XG4gICAgY29uc3QgcmVzdWx0ID0gbmV3IFByb21pc2U8YW55PigocmVzb2x2ZSwgcmVqZWN0KSA9PiB7XG4gICAgICB0aGlzLl93YWl0UmVzcG9uc2VNYXAuc2V0KGlkLCB7IHJlc29sdmUsIHJlamVjdCB9KTtcbiAgICB9KTtcbiAgICB0aGlzLl93b3JrZXIucG9zdE1lc3NhZ2Uoe1xuICAgICAganNvbnJwYzogSlNPTlJQQ19WRVJTSU9OLFxuICAgICAgbWV0aG9kLFxuICAgICAgcGFyYW1zLFxuICAgICAgaWQsXG4gICAgfSk7XG4gICAgcmV0dXJuIHJlc3VsdDtcbiAgfVxuXG4gIHByaXZhdGUgb25Xb3JrZXJNZXNzYWdlKG1lc3NhZ2U6IGFueSkge1xuICAgIGlmIChtZXNzYWdlIGluc3RhbmNlb2YgU2hhcmVkQXJyYXlCdWZmZXIpIHtcbiAgICAgIGNvbnN0IG10ID0gbmV3IE1lbW9yeU1lc3NhZ2VTZW5kZXIobWVzc2FnZSlcbiAgICAgIHRoaXMuX2pzb25ScGNTZXJ2ZXIuZW1pdE1lc3NhZ2UobXQsIG10LnJlYWRNZXNzYWdlKCkpO1xuICAgIH1cbiAgICBlbHNlIGlmIChPYmplY3QuaGFzT3duKG1lc3NhZ2UsIFwibWV0aG9kXCIpKSB7XG4gICAgICBjb25zdCBzZW5kZXIgPSBuZXcgV29ya2VyU2VuZGVyKHRoaXMuX3dvcmtlcik7XG4gICAgICB0aGlzLl9qc29uUnBjU2VydmVyLmVtaXRNZXNzYWdlKHNlbmRlciwgbWVzc2FnZSk7XG4gICAgfVxuICAgIGVsc2UgaWYgKE9iamVjdC5oYXNPd24obWVzc2FnZSwgXCJpZFwiKSkge1xuICAgICAgY29uc3QgcHJvbWlzZSA9IHRoaXMuX3dhaXRSZXNwb25zZU1hcC5nZXQobWVzc2FnZS5pZCk7XG4gICAgICBpZiAoIXByb21pc2UpXG4gICAgICAgIHRocm93IG5ldyBFcnJvcihgVW5rbm93biByZXNwb25zZSBcIiR7bWVzc2FnZS5pZH1cIiBpZGApO1xuICAgICAgaWYgKE9iamVjdC5oYXNPd24obWVzc2FnZSwgXCJyZXN1bHRcIikpXG4gICAgICAgIHByb21pc2UucmVzb2x2ZShtZXNzYWdlLnJlc3VsdCk7XG4gICAgICBlbHNlIGlmIChPYmplY3QuaGFzT3duKG1lc3NhZ2UsIFwiZXJyb3JcIikpXG4gICAgICAgIHByb21pc2UucmVqZWN0KG1lc3NhZ2UuZXJyb3IpO1xuICAgICAgZWxzZVxuICAgICAgICB0aHJvdyBuZXcgRXJyb3IoYFVua25vd24gbWVzc2FnZSB0eXBlIG9mIFwiJHttZXNzYWdlfVwiYCk7XG4gICAgfVxuICB9XG5cbiAgcHJpdmF0ZSBvbldvcmtlckVycm9yKGVycm9yOiBFcnJvcikge1xuICAgIGlmIChlcnJvciBpbnN0YW5jZW9mIEVycm9yKVxuICAgICAgbG9nZ2VyLmZhdGFsKGVycm9yLnN0YWNrKTtcbiAgICBlbHNlXG4gICAgICBsb2dnZXIuZmF0YWwoZXJyb3IpO1xuICAgIHByb2Nlc3MuZXhpdCgxKTtcbiAgfVxuXG4gIHByaXZhdGUgb25Xb3JrZXJFeGl0KGNvZGU6IG51bWJlcikge1xuICAgIGlmIChjb2RlKVxuICAgICAgcHJvY2Vzcy5leGl0KGNvZGUpO1xuICB9XG59O1xuIiwiLypcbiAqIE1JVCBMaWNlbnNlXG4gKlxuICogQ29weXJpZ2h0IChjKSAyMDI1ICBZdXJpaSBZYWt1YmluICh5dXJpaS55YWt1YmluQGdtYWlsLmNvbSlcbiAqXG4gKiBQZXJtaXNzaW9uIGlzIGdyYW50ZWQgdG8gdXNlLCBjb3B5LCBtb2RpZnksIGFuZCBkaXN0cmlidXRlIHRoaXMgc29mdHdhcmVcbiAqIHVuZGVyIHRoZSBNSVQgTGljZW5zZS4gU2VlIExJQ0VOU0UgZmlsZSBmb3IgZGV0YWlscy5cbiAqL1xuXG5pbXBvcnQgZnMgZnJvbSBcIm5vZGU6ZnNcIjtcblxuaW1wb3J0IHsgUHJvamVjdENvbnRleHQgfSBmcm9tIFwiQC9jb3JlL1Byb2plY3RDb250ZXh0XCI7XG5pbXBvcnQgeyBTY3JpcHRDb250ZXh0IH0gZnJvbSBcIkAvY29yZS9TY3JpcHRDb250ZXh0XCI7XG5pbXBvcnQgeyBTY29wZUhlbHBlciwgVmFyaWFibGVNYXAgfSBmcm9tIFwiQC9jb3JlL1Njb3BlXCI7XG5pbXBvcnQgeyBNYWtlQ2xpZW50IH0gZnJvbSBcIkAvc2VydmVyL01ha2VDbGllbnRcIjtcbmltcG9ydCB7IEpzb25ScGNTZXJ2ZXIgfSBmcm9tIFwiQC9zZXJ2ZXIvSnNvblJwY1NlcnZlclwiO1xuaW1wb3J0IHsgaW1wb3J0TW9kdWxlIH0gZnJvbSBcIkAvdXRpbHMvTW9kdWxlXCI7XG5pbXBvcnQgeyBjcmVhdGVWYXJpYWJsZU1hcEZvckRpcmVjdG9yeSB9IGZyb20gXCJAL2NvcmUvQmFzZUNvbnRleHRcIjtcbmltcG9ydCB7IE1BSU5OT0RFX1NUQVJUTUFLRVNDUklQVCB9IGZyb20gXCJAL3NlcnZlci9SZW1vdGVNZXRob2RzXCI7XG5pbXBvcnQgeyBNQUlOTk9ERV9MT0FESlNPTiB9IGZyb20gXCJAL3NlcnZlci9SZW1vdGVNZXRob2RzXCI7XG5pbXBvcnQgeyBNQUlOTk9ERV9FWEVDVVRFU0NSSVBUIH0gZnJvbSBcIkAvc2VydmVyL1JlbW90ZU1ldGhvZHNcIjtcbmltcG9ydCB7IFdPUktFUk5PREVfU1RBUlRNQUtFU0NSSVBUIH0gZnJvbSBcIkAvc2VydmVyL1JlbW90ZU1ldGhvZHNcIjtcbmltcG9ydCB7IExvZ2dlciB9IGZyb20gXCJAL2xvZ2dlclwiO1xuXG5jb25zdCBsb2dnZXIgPSBMb2dnZXIuY3JlYXRlKGltcG9ydC5tZXRhLnVybCk7XG5cbmV4cG9ydCBjb25zdCBDT05GSUdVUkVfRVZFTlQgPSBcImNvbmZpZ3VyZVwiO1xuZXhwb3J0IGNvbnN0IEJVSUxEX0VWRU5UID0gXCJidWlsZFwiO1xuXG5leHBvcnQgaW50ZXJmYWNlIENvbmZpZ3VyZUV2ZW50IHtcbiAgcHJvamVjdDogUHJvamVjdENvbnRleHQ7XG59O1xuXG5leHBvcnQgaW50ZXJmYWNlIEJ1aWxkRXZlbnQge1xuICBwcm9qZWN0OiBQcm9qZWN0Q29udGV4dDtcbn07XG5cbmV4cG9ydCB0eXBlIENvbmZpZ3VyZUxpc3RlbmVyID0gKGV2ZW50OiBDb25maWd1cmVFdmVudCkgPT4gdm9pZDtcbmV4cG9ydCB0eXBlIEJ1aWxkTGlzdGVuZXIgPSAoZXZlbnQ6IEJ1aWxkRXZlbnQpID0+IHZvaWQ7XG5cbmV4cG9ydCBpbnRlcmZhY2UgTWVtb3J5U2VuZGVyIHtcbiAgc2VuZE1lc3NhZ2UobWVzc2FnZTogYW55KTogdm9pZDtcbn07XG5cbmV4cG9ydCBjbGFzcyBNYWtlU2VydmVyIHtcbiAgcHJpdmF0ZSBfcm9vdFZhcmlhYmxlTWFwOiBWYXJpYWJsZU1hcCA9IHt9O1xuICBwcml2YXRlIF9wcm9qZWN0ID0gUHJvamVjdENvbnRleHQuY3JlYXRlKCk7XG4gIHByaXZhdGUgX2xpc3RlbmVyczogeyBbbmFtZTogc3RyaW5nXTogRnVuY3Rpb25bXSB9O1xuICBwcml2YXRlIF9qc29uUnBjU2VydmVyID0gbmV3IEpzb25ScGNTZXJ2ZXI7XG4gIHByaXZhdGUgX2NsaWVudHMgPSBuZXcgTWFwPHN0cmluZywgTWFrZUNsaWVudD47XG4gIHByaXZhdGUgX2NsaWVudElkQ291bnRlciA9IDE7XG5cbiAgcHVibGljIGNvbnN0cnVjdG9yKCkge1xuICAgIHRoaXMuX2xpc3RlbmVycyA9IHtcbiAgICAgIFsgQ09ORklHVVJFX0VWRU5UIF06IG5ldyBBcnJheTxDb25maWd1cmVMaXN0ZW5lcj4sXG4gICAgICBbIEJVSUxEX0VWRU5UIF06IG5ldyBBcnJheTxCdWlsZExpc3RlbmVyPixcbiAgICB9O1xuICAgIHRoaXMuX2pzb25ScGNTZXJ2ZXIucmVnaXN0ZXJDYWxsYmFjayhNQUlOTk9ERV9FWEVDVVRFU0NSSVBULCBwYXJhbXMgPT4gdGhpcy5leGVjdXRlU2NyaXB0KHBhcmFtcykpO1xuICAgIHRoaXMuX2pzb25ScGNTZXJ2ZXIucmVnaXN0ZXJDYWxsYmFjayhNQUlOTk9ERV9MT0FESlNPTiwgcGFyYW1zID0+IHRoaXMubG9hZEpTT04ocGFyYW1zKSk7XG4gICAgdGhpcy5fanNvblJwY1NlcnZlci5yZWdpc3RlckNhbGxiYWNrKE1BSU5OT0RFX1NUQVJUTUFLRVNDUklQVCwgcGFyYW1zID0+IHRoaXMuc3RhcnRNYWtlU2NyaXB0KHBhcmFtcykpO1xuICB9XG5cbiAgcHVibGljIGdldCByb290VmFyaWFibGVNYXAoKSB7XG4gICAgcmV0dXJuIHRoaXMuX3Jvb3RWYXJpYWJsZU1hcDtcbiAgfVxuXG4gIHB1YmxpYyBnZXQgcHJvamVjdCgpIHtcbiAgICByZXR1cm4gdGhpcy5fcHJvamVjdDtcbiAgfVxuXG4gIHB1YmxpYyBjcmVhdGVDbGllbnQoKSB7XG4gICAgY29uc3QgbmFtZSA9IFwibWtjXCIgKyB0aGlzLl9jbGllbnRJZENvdW50ZXIrKztcbiAgICBjb25zdCBjbGllbnQgPSBuZXcgTWFrZUNsaWVudCh0aGlzLl9qc29uUnBjU2VydmVyKTtcbiAgICB0aGlzLl9jbGllbnRzLnNldChuYW1lLCBjbGllbnQpO1xuICAgIHJldHVybiBjbGllbnQ7XG4gIH1cblxuICBwdWJsaWMgYXN5bmMgc3RhcnRNYWtlU2NyaXB0KHBhcmFtczogYW55KTogUHJvbWlzZTx2b2lkPiB7XG4gICAgbG9nZ2VyLmRlYnVnKFwiTWFrZVNlcnZlci5zdGFydE1ha2VTY3JpcHRcIik7XG5cbiAgICBjb25zdCB2YXJpYWJsZU1hcCA9IFNjb3BlSGVscGVyLmZyb21KU09OKHBhcmFtcyk7XG4gICAgYXdhaXQgdGhpcy5ydW5NYWtlU2NyaXB0KHZhcmlhYmxlTWFwKTtcbiAgfVxuXG4gIHByaXZhdGUgYXN5bmMgbG9hZEpTT04oZmlsZW5hbWU6IHN0cmluZyk6IFByb21pc2U8YW55PiB7XG4gICAgbG9nZ2VyLmRlYnVnKFwiTWFrZVNlcnZlci5sb2FkSlNPTihcIiwgZmlsZW5hbWUsIFwiKVwiKTtcbiAgICBpZiAoZmlsZW5hbWUuZW5kc1dpdGgoXCIuanNvblwiKSkge1xuICAgICAgY29uc3QgY29udGVudCA9IGF3YWl0IGZzLnByb21pc2VzLnJlYWRGaWxlKGZpbGVuYW1lLCBcInV0ZjhcIik7XG4gICAgICByZXR1cm4gSlNPTi5wYXJzZShjb250ZW50KTtcbiAgICB9XG5cbiAgICBjb25zdCBtb2R1bGUgPSBhd2FpdCBpbXBvcnRNb2R1bGUoZmlsZW5hbWUpO1xuICAgIGlmICghbW9kdWxlLmRlZmF1bHQpXG4gICAgICB0aHJvdyBuZXcgRXJyb3IoYFNjcmlwdCBcIiR7ZmlsZW5hbWV9XCIgaGFzIG5vdCBjb250YWluIGEgZGVmYXVsdCBmdW5jdGlvbmApO1xuXG4gICAgcmV0dXJuIG1vZHVsZS5kZWZhdWx0O1xuICB9XG5cbiAgcHJpdmF0ZSBhc3luYyBleGVjdXRlU2NyaXB0KHBhcmFtczogYW55KTogUHJvbWlzZTx2b2lkPiB7XG4gICAgbG9nZ2VyLmRlYnVnKFwiTWFrZVNlcnZlci5leGVjdXRlU2NyaXB0XCIpO1xuICAgIGNvbnN0IHZhcmlhYmxlTWFwID0gU2NvcGVIZWxwZXIuZnJvbUpTT04ocGFyYW1zKTtcbiAgICBjb25zdCBzY3JpcHRGaWxlID0gU2NvcGVIZWxwZXIuZ2V0KHZhcmlhYmxlTWFwLCBcIlNDUklQVF9GSUxFXCIpO1xuXG4gICAgY29uc3QgbW9kdWxlID0gYXdhaXQgaW1wb3J0TW9kdWxlKHNjcmlwdEZpbGUudG9TdHJpbmcoKSk7XG4gICAgaWYgKCFtb2R1bGUuZGVmYXVsdClcbiAgICAgIHRocm93IG5ldyBFcnJvcihgU2NyaXB0IFwiJHtzY3JpcHRGaWxlfVwiIGhhcyBub3QgY29udGFpbiBhIGRlZmF1bHQgZnVuY3Rpb25gKTtcblxuICAgIGNvbnN0IG1rID0gU2NyaXB0Q29udGV4dC5jcmVhdGUodmFyaWFibGVNYXApO1xuICAgIG1vZHVsZS5kZWZhdWx0KG1rKTtcbiAgfVxuXG4gIHB1YmxpYyBhc3luYyBydW5NYWtlU2NyaXB0KHZhcmlhYmxlTWFwOiBWYXJpYWJsZU1hcCk6IFByb21pc2U8Ym9vbGVhbj4ge1xuICAgIGlmICghYXdhaXQgdGhpcy5fcHJvamVjdC5wcmVwZWFyU2NyaXB0RmlsZSh2YXJpYWJsZU1hcCkpXG4gICAgICByZXR1cm4gZmFsc2U7XG5cbiAgICBjb25zdCBjbGllbnQgPSB0aGlzLmNyZWF0ZUNsaWVudCgpO1xuXG4gICAgY29uc3QgY3dkU2F2ZSA9IHByb2Nlc3MuY3dkKCk7XG4gICAgY29uc3Qgc2NyaXB0RGlyID0gU2NvcGVIZWxwZXIuZ2V0KHZhcmlhYmxlTWFwLCBcIlNDUklQVF9ESVJcIik7XG4gICAgcHJvY2Vzcy5jaGRpcihzY3JpcHREaXIudG9TdHJpbmcoKSk7XG4gICAgYXdhaXQgY2xpZW50LnJlcXVlc3QoV09SS0VSTk9ERV9TVEFSVE1BS0VTQ1JJUFQsIFNjb3BlSGVscGVyLnRvSlNPTih2YXJpYWJsZU1hcCkpO1xuICAgIHByb2Nlc3MuY2hkaXIoY3dkU2F2ZSk7XG5cbiAgICByZXR1cm4gdHJ1ZTtcbiAgfVxuXG4gIHB1YmxpYyBhc3luYyBzdGFydCgpIHtcbiAgICBjb25zdCBzb3VyY2VEaXIgPSBTY29wZUhlbHBlci5nZXQodGhpcy5fcm9vdFZhcmlhYmxlTWFwLCBcIlBST0pFQ1RfU09VUkNFX0RJUlwiKTtcbiAgICBjb25zdCBiaW5hcnlEaXIgPSBTY29wZUhlbHBlci5nZXQodGhpcy5fcm9vdFZhcmlhYmxlTWFwLCBcIlBST0pFQ1RfQklOQVJZX0RJUlwiKTtcblxuICAgIC8qY29uc3QgdmFyaWFibGVNYXAgPSBjcmVhdGVWYXJpYWJsZU1hcEZvckRpcmVjdG9yeSh0aGlzLl9yb290VmFyaWFibGVNYXAsIHNvdXJjZURpciwgYmluYXJ5RGlyKTtcbiAgICBpZiAoIWF3YWl0IHRoaXMucnVuTWFrZVNjcmlwdCh2YXJpYWJsZU1hcCkpXG4gICAgICB0aHJvdyBFcnJvcihcIkNhbid0IHByZXBlYXIgU2NyaXB0RmlsZVwiKTsqL1xuXG4gICAgLy8gdGhpcy5vbkNvbmZpZ3VyZUVuZCgpO1xuXG4gICAgdGhpcy5fcHJvamVjdC5hZGRTdWJkaXJlY3RvcnkodGhpcy5fcm9vdFZhcmlhYmxlTWFwLCBzb3VyY2VEaXIsIGJpbmFyeURpcik7XG4gICAgdGhpcy5fcHJvamVjdC5kb1N1YmRpcmVjdG9yeSgpLnRoZW4oKCkgPT4gdGhpcy5vbkNvbmZpZ3VyZUVuZCgpKTtcbiAgfVxuXG4gIHByaXZhdGUgYXN5bmMgb25Db25maWd1cmVFbmQoKSB7XG4gICAgY29uc3QgZXZlbnQgPSB7IHByb2plY3Q6IHRoaXMuX3Byb2plY3QgfTtcbiAgICBhd2FpdCB0aGlzLmVtaXRFdmVudChDT05GSUdVUkVfRVZFTlQsIGV2ZW50KTtcbiAgICBhd2FpdCB0aGlzLmVtaXRFdmVudChCVUlMRF9FVkVOVCwgZXZlbnQpO1xuICB9XG5cbiAgcHJpdmF0ZSBhc3luYyBlbWl0RXZlbnQ8VD4odHlwZTogc3RyaW5nLCBldmVudDogVCk6IFByb21pc2U8dm9pZD4ge1xuICAgIGZvciAoY29uc3QgbGlzdGVuZXIgb2YgdGhpcy5fbGlzdGVuZXJzW3R5cGVdKSB7XG4gICAgICBjb25zdCByZXN1bHQgPSBsaXN0ZW5lcihldmVudCk7XG4gICAgICBpZiAocmVzdWx0IGluc3RhbmNlb2YgUHJvbWlzZSlcbiAgICAgICAgYXdhaXQgcmVzdWx0O1xuICAgIH1cbiAgfVxuICBcbiAgcHVibGljIGFkZEV2ZW50TGlzdGVuZXIodHlwZTogXCJjb25maWd1cmVcIiwgbGlzdGVuZXI6IENvbmZpZ3VyZUxpc3RlbmVyKTogdm9pZDtcbiAgcHVibGljIGFkZEV2ZW50TGlzdGVuZXIodHlwZTogXCJidWlsZFwiLCBsaXN0ZW5lcjogQnVpbGRMaXN0ZW5lcik6IHZvaWQ7XG4gIHB1YmxpYyBhZGRFdmVudExpc3RlbmVyKHR5cGU6IHN0cmluZywgbGlzdGVuZXI6IEZ1bmN0aW9uKTogdm9pZCB7XG4gICAgdGhpcy5fbGlzdGVuZXJzW3R5cGVdLnB1c2gobGlzdGVuZXIpO1xuICB9XG59O1xuIiwiLypcbiAqIE1JVCBMaWNlbnNlXG4gKlxuICogQ29weXJpZ2h0IChjKSAyMDI1ICBZdXJpaSBZYWt1YmluICh5dXJpaS55YWt1YmluQGdtYWlsLmNvbSlcbiAqXG4gKiBQZXJtaXNzaW9uIGlzIGdyYW50ZWQgdG8gdXNlLCBjb3B5LCBtb2RpZnksIGFuZCBkaXN0cmlidXRlIHRoaXMgc29mdHdhcmVcbiAqIHVuZGVyIHRoZSBNSVQgTGljZW5zZS4gU2VlIExJQ0VOU0UgZmlsZSBmb3IgZGV0YWlscy5cbiAqL1xuXG5pbXBvcnQgeyBJTWVzc2FnZVNlbmRlciwgSVJlcXVlc3RTeW5jIH0gZnJvbSBcIkAvc2VydmVyL1RyYW5zcG9ydFwiO1xuaW1wb3J0IHsgTG9nZ2VyIH0gZnJvbSBcIkAvbG9nZ2VyXCI7XG5cbmNvbnN0IGxvZ2dlciA9IExvZ2dlci5jcmVhdGUoaW1wb3J0Lm1ldGEudXJsKTtcblxuZXhwb3J0IGNsYXNzIE1lbW9yeU1lc3NhZ2VTZW5kZXIgaW1wbGVtZW50cyBJTWVzc2FnZVNlbmRlciB7XG4gIHByaXZhdGUgX2J1ZmZlcjogU2hhcmVkQXJyYXlCdWZmZXI7XG4gIHByaXZhdGUgX21lbW9yeTogTWVtb3J5VHJhbnNwb3J0LkJ1ZmZlcjtcblxuICBwdWJsaWMgY29uc3RydWN0b3IoYnVmZmVyOiBTaGFyZWRBcnJheUJ1ZmZlcikge1xuICAgIHRoaXMuX2J1ZmZlciA9IGJ1ZmZlcjtcbiAgICB0aGlzLl9tZW1vcnkgPSBuZXcgTWVtb3J5VHJhbnNwb3J0LkJ1ZmZlcihidWZmZXIpO1xuICB9XG5cbiAgcHVibGljIHNlbmRNZXNzYWdlKG1lc3NhZ2U6IGFueSk6IHZvaWQge1xuICAgIHRoaXMuX21lbW9yeS5zZXQobWVzc2FnZSwgdHJ1ZSk7XG4gIH1cblxuICBwdWJsaWMgcmVhZE1lc3NhZ2UoKTogYW55IHtcbiAgICByZXR1cm4gdGhpcy5fbWVtb3J5LmdldCgpO1xuICB9XG59O1xuXG5leHBvcnQgY2xhc3MgTWVtb3J5VHJhbnNwb3J0IGltcGxlbWVudHMgSVJlcXVlc3RTeW5jIHtcbiAgcHJpdmF0ZSBfc2VuZGVyOiBJTWVzc2FnZVNlbmRlcjtcbiAgcHJpdmF0ZSBfYnVmZmVyOiBTaGFyZWRBcnJheUJ1ZmZlcjtcbiAgcHJpdmF0ZSBfbWVtb3J5OiBNZW1vcnlUcmFuc3BvcnQuQnVmZmVyO1xuXG4gIHB1YmxpYyBjb25zdHJ1Y3RvcihzZW5kZXI6IElNZXNzYWdlU2VuZGVyLCBidWZmZXI6IFNoYXJlZEFycmF5QnVmZmVyKSB7XG4gICAgdGhpcy5fc2VuZGVyID0gc2VuZGVyO1xuICAgIHRoaXMuX2J1ZmZlciA9IGJ1ZmZlcjtcbiAgICB0aGlzLl9tZW1vcnkgPSBuZXcgTWVtb3J5VHJhbnNwb3J0LkJ1ZmZlcihidWZmZXIpO1xuICB9XG5cbiAgcHVibGljIHJlcXVlc3RTeW5jKGRhdGE6IGFueSk6IGFueSB7XG4gICAgdGhpcy5fbWVtb3J5LnNldChkYXRhKTtcbiAgICB0aGlzLl9zZW5kZXIuc2VuZE1lc3NhZ2UodGhpcy5fYnVmZmVyKTtcbiAgICByZXR1cm4gdGhpcy5fbWVtb3J5LmdldCh0cnVlKTtcbiAgfVxufTtcblxuZXhwb3J0IG5hbWVzcGFjZSBNZW1vcnlUcmFuc3BvcnQge1xuXG5jb25zdCBNQUdJQ19PRkZTRVQgPSAwO1xuXG5leHBvcnQgY2xhc3MgQnVmZmVyIHtcbiAgcHJpdmF0ZSBfc2lnbmFsOiBJbnQzMkFycmF5O1xuICBwcml2YXRlIF9kYXRhOiBVaW50OEFycmF5O1xuICBwcml2YXRlIF9tYWdpYzogbnVtYmVyO1xuXG4gIHB1YmxpYyBjb25zdHJ1Y3RvcihidWZmZXI6IFNoYXJlZEFycmF5QnVmZmVyKSB7XG4gICAgdGhpcy5fc2lnbmFsID0gbmV3IEludDMyQXJyYXkoYnVmZmVyLCBNQUdJQ19PRkZTRVQsIDEpO1xuICAgIHRoaXMuX2RhdGEgPSBuZXcgVWludDhBcnJheShidWZmZXIsIHRoaXMuX3NpZ25hbC5CWVRFU19QRVJfRUxFTUVOVCk7XG4gICAgdGhpcy5fbWFnaWMgPSAwO1xuICB9XG5cbiAgcHVibGljIGdldChzeW5jID0gZmFsc2UpOiBhbnkge1xuICAgIGlmIChzeW5jKSB7XG4gICAgICBBdG9taWNzLndhaXQodGhpcy5fc2lnbmFsLCBNQUdJQ19PRkZTRVQsIHRoaXMuX21hZ2ljKTtcbiAgICB9XG5cbiAgICB0aGlzLl9tYWdpYyA9IHRoaXMuX3NpZ25hbFswXTtcbiAgICBjb25zdCBsZW5ndGggPSB0aGlzLl9tYWdpYyA+PiA4O1xuICAgIGNvbnN0IGJ5dGVzID0gdGhpcy5fZGF0YS5zbGljZSgwLCBsZW5ndGgpO1xuICAgIGNvbnN0IG1lc3NhZ2UgPSAobmV3IFRleHREZWNvZGVyKCkpLmRlY29kZShieXRlcyk7XG5cbiAgICByZXR1cm4gSlNPTi5wYXJzZShtZXNzYWdlKTtcbiAgfVxuXG4gIHB1YmxpYyBzZXQoanNvbjogYW55LCBub3RpZnkgPSBmYWxzZSkge1xuICAgIGNvbnN0IG1lc3NhZ2UgPSBKU09OLnN0cmluZ2lmeShqc29uKTtcbiAgICBjb25zdCBieXRlcyA9IChuZXcgVGV4dEVuY29kZXIoKSkuZW5jb2RlKG1lc3NhZ2UpO1xuICAgIHRoaXMuX2RhdGEuc2V0KGJ5dGVzKTtcbiAgICB0aGlzLl9tYWdpYyA9IChieXRlcy5sZW5ndGggPDwgOCkgfCAoKHRoaXMuX21hZ2ljICsgMSkgJiAyNTUpO1xuICAgIHRoaXMuX3NpZ25hbFswXSA9IHRoaXMuX21hZ2ljO1xuXG4gICAgaWYgKG5vdGlmeSkge1xuICAgICAgQXRvbWljcy5ub3RpZnkodGhpcy5fc2lnbmFsLCBNQUdJQ19PRkZTRVQsIDEpO1xuICAgIH1cbiAgfVxufTtcblxufSAvLyBuYW1lc3BhY2UgTWVtb3J5VHJhbnNwb3J0XG4iLCIvKlxuICogTUlUIExpY2Vuc2VcbiAqXG4gKiBDb3B5cmlnaHQgKGMpIDIwMjUgIFl1cmlpIFlha3ViaW4gKHl1cmlpLnlha3ViaW5AZ21haWwuY29tKVxuICpcbiAqIFBlcm1pc3Npb24gaXMgZ3JhbnRlZCB0byB1c2UsIGNvcHksIG1vZGlmeSwgYW5kIGRpc3RyaWJ1dGUgdGhpcyBzb2Z0d2FyZVxuICogdW5kZXIgdGhlIE1JVCBMaWNlbnNlLiBTZWUgTElDRU5TRSBmaWxlIGZvciBkZXRhaWxzLlxuICovXG5cbmltcG9ydCB7IE1lc3NhZ2VQb3J0IH0gZnJvbSBcIm5vZGU6d29ya2VyX3RocmVhZHNcIjtcbmltcG9ydCB7IElNZXNzYWdlU2VuZGVyIH0gZnJvbSBcIkAvc2VydmVyL1RyYW5zcG9ydFwiO1xuaW1wb3J0IHsgTG9nZ2VyIH0gZnJvbSBcIkAvbG9nZ2VyXCI7XG5cbmNvbnN0IGxvZ2dlciA9IExvZ2dlci5jcmVhdGUoaW1wb3J0Lm1ldGEudXJsKTtcblxuZXhwb3J0IGNsYXNzIE1lc3NhZ2VQb3J0U2VuZGVyIGltcGxlbWVudHMgSU1lc3NhZ2VTZW5kZXIge1xuICBwcml2YXRlIF9tZXNzYWdlUG9ydDogTWVzc2FnZVBvcnQ7XG5cbiAgcHVibGljIGNvbnN0cnVjdG9yKG1lc3NhZ2VQb3J0OiBNZXNzYWdlUG9ydCkge1xuICAgIHRoaXMuX21lc3NhZ2VQb3J0ID0gbWVzc2FnZVBvcnQ7XG4gIH1cblxuICBwdWJsaWMgc2VuZE1lc3NhZ2UobWVzc2FnZTogYW55KTogdm9pZCB7XG4gICAgbG9nZ2VyLmRlYnVnKFwiPC0tXCIsIEpTT04uc3RyaW5naWZ5KG1lc3NhZ2UpKTtcbiAgICB0aGlzLl9tZXNzYWdlUG9ydC5wb3N0TWVzc2FnZShtZXNzYWdlKTtcbiAgfVxufTtcbiIsIi8qXG4gKiBNSVQgTGljZW5zZVxuICpcbiAqIENvcHlyaWdodCAoYykgMjAyNSAgWXVyaWkgWWFrdWJpbiAoeXVyaWkueWFrdWJpbkBnbWFpbC5jb20pXG4gKlxuICogUGVybWlzc2lvbiBpcyBncmFudGVkIHRvIHVzZSwgY29weSwgbW9kaWZ5LCBhbmQgZGlzdHJpYnV0ZSB0aGlzIHNvZnR3YXJlXG4gKiB1bmRlciB0aGUgTUlUIExpY2Vuc2UuIFNlZSBMSUNFTlNFIGZpbGUgZm9yIGRldGFpbHMuXG4gKi9cblxuaW1wb3J0IHsgSU1ha2VDb250ZXh0IH0gZnJvbSBcIkAvY29yZS9NYWtlSW50ZXJmYWNlc1wiO1xuaW1wb3J0IHsgTWFrZUNvbnRleHQgfSBmcm9tIFwiQC9jb3JlL0Jhc2VDb250ZXh0XCI7XG5pbXBvcnQgeyBDdXN0b21TY3JpcHQgfSBmcm9tIFwiQC9jb3JlL0N1c3RvbVNjcmlwdFwiO1xuaW1wb3J0IHsgY3JlYXRlVmFyaWFibGVNYXBGb3JEaXJlY3RvcnkgfSBmcm9tIFwiQC9jb3JlL0Jhc2VDb250ZXh0XCI7XG5pbXBvcnQgeyBKc29uUnBjUmVxdWVzdFN5bmMgfSBmcm9tIFwiQC9zZXJ2ZXIvSnNvblJwY1JlcXVlc3RTeW5jXCI7XG5pbXBvcnQgeyBNQUlOTk9ERV9MT0FESlNPTiB9IGZyb20gXCJAL3NlcnZlci9SZW1vdGVNZXRob2RzXCI7XG5pbXBvcnQgeyBNQUlOTk9ERV9FWEVDVVRFU0NSSVBUIH0gZnJvbSBcIkAvc2VydmVyL1JlbW90ZU1ldGhvZHNcIjtcbmltcG9ydCB7IE1BSU5OT0RFX1NUQVJUTUFLRVNDUklQVCB9IGZyb20gXCJAL3NlcnZlci9SZW1vdGVNZXRob2RzXCI7XG5pbXBvcnQgeyBMb2dnZXIgfSBmcm9tIFwiQC9sb2dnZXJcIjtcbmltcG9ydCB7IFNjb3BlSGVscGVyLCBWYXJpYWJsZU1hcCwgVmFyaWFudE1hcCB9IGZyb20gXCJAL2NvcmUvU2NvcGVcIjtcbmltcG9ydCB7IENVU1RPTV9WQVJJQUJMRV9HUk9VUCB9IGZyb20gXCJAL0NvbnN0YW50c1wiO1xuaW1wb3J0IHsgQWJzb2x1dGVQYXRoIH0gZnJvbSBcIkAvY29yZS9BYnNvbHV0ZVBhdGhcIjtcblxuY29uc3QgbG9nZ2VyID0gTG9nZ2VyLmNyZWF0ZShpbXBvcnQubWV0YS51cmwpO1xuXG5leHBvcnQgY2xhc3MgUmVtb3RlTWFrZUNvbnRleHQgZXh0ZW5kcyBNYWtlQ29udGV4dCBpbXBsZW1lbnRzIElNYWtlQ29udGV4dCB7XG4gIHByaXZhdGUgX3RyYW5zcG9ydDogSnNvblJwY1JlcXVlc3RTeW5jO1xuXG4gIHB1YmxpYyBjb25zdHJ1Y3RvcihzY29wZTogVmFyaWFibGVNYXAsIHRyYW5zcG9ydDogSnNvblJwY1JlcXVlc3RTeW5jKSB7XG4gICAgc3VwZXIoc2NvcGUpO1xuICAgIHRoaXMuX3RyYW5zcG9ydCA9IHRyYW5zcG9ydDtcbiAgfVxuXG4gIHB1YmxpYyBleGVjdXRlU2NyaXB0KHNjcmlwdDogYW55LCBwYXJhbXM6IGFueSk6IGFueSB7XG4gICAgbG9nZ2VyLmRlYnVnKFwiUmVtb3RlTWFrZUNvbnRleHQuZXhlY3V0ZVNjcmlwdChcIiwgc2NyaXB0LCBwYXJhbXMsIFwiKVwiKTtcbiAgICBjb25zdCBuZXdWYXJpYWJsZU1hcCA9IFNjb3BlSGVscGVyLmNsb25lVmFyaWFibGVNYXAodGhpcy5fc2NvcGUpO1xuICAgIHBhcmFtcyAmJiBTY29wZUhlbHBlci5leHRlbmRWYXJpYWJsZU1hcEJ5VmFsdWVzKG5ld1ZhcmlhYmxlTWFwLCBcIlwiLCBwYXJhbXMpO1xuICAgIGNvbnN0IHNjcmlwdEZpbGUgPSBTY29wZUhlbHBlci5nZXQobmV3VmFyaWFibGVNYXAsIFwiU09VUkNFX0RJUlwiKS5yZXNvbHZlKHNjcmlwdCk7XG4gICAgU2NvcGVIZWxwZXIuc2V0KG5ld1ZhcmlhYmxlTWFwLCBcIlNDUklQVF9GSUxFXCIsIHNjcmlwdEZpbGUpO1xuICAgIFNjb3BlSGVscGVyLnNldChuZXdWYXJpYWJsZU1hcCwgXCJTQ1JJUFRfRElSXCIsIHNjcmlwdEZpbGUuZGlybmFtZSgpKTtcbiAgICByZXR1cm4gdGhpcy5fdHJhbnNwb3J0LnJlcXVlc3RTeW5jKE1BSU5OT0RFX0VYRUNVVEVTQ1JJUFQsIFNjb3BlSGVscGVyLnRvSlNPTihuZXdWYXJpYWJsZU1hcCkpO1xuICB9XG4gIFxuICBwdWJsaWMgYWRkQ2FjaGVWYXJpYWJsZXMocGFyYW1zOiBzdHJpbmcgfCBWYXJpYW50TWFwKTogdm9pZCB7XG4gICAgbG9nZ2VyLmRlYnVnKFwiUmVtb3RlTWFrZUNvbnRleHQuYWRkQ2FjaGVWYXJpYWJsZXMoXCIsIHBhcmFtcywgXCIpXCIpO1xuICAgIGxldCB2YXJpYWJsZXMgPSBwYXJhbXM7XG4gICAgaWYgKHR5cGVvZiBwYXJhbXMgPT09IFwic3RyaW5nXCIpIHtcbiAgICAgIGNvbnN0IGZpbGVuYW1lID0gU2NvcGVIZWxwZXIuZ2V0KHRoaXMuX3Njb3BlLCBcIlNPVVJDRV9ESVJcIikucmVzb2x2ZShwYXJhbXMpLnRvU3RyaW5nKCk7XG4gICAgICB2YXJpYWJsZXMgPSB0aGlzLl90cmFuc3BvcnQucmVxdWVzdFN5bmMoTUFJTk5PREVfTE9BREpTT04sIGZpbGVuYW1lKTtcbiAgICB9XG4gICAgU2NvcGVIZWxwZXIuZGVmaW5lVmFyaWFibGVzSW5WYXJpYWJsZU1hcCh0aGlzLl9zY29wZSwgQ1VTVE9NX1ZBUklBQkxFX0dST1VQLCB2YXJpYWJsZXMpO1xuICB9XG5cbiAgcHVibGljIGFkZFN1YmRpcmVjdG9yeShzb3VyY2VEaXI6IHN0cmluZyB8IEFic29sdXRlUGF0aCwgYmluYXJ5RGlyPzogc3RyaW5nIHwgQWJzb2x1dGVQYXRoKTogdm9pZCB7XG4gICAgbG9nZ2VyLmRlYnVnKFwiUmVtb3RlTWFrZUNvbnRleHQuYWRkU3ViZGlyZWN0b3J5KFwiLCBzb3VyY2VEaXIsIGJpbmFyeURpciwgXCIpXCIpO1xuICAgIGNvbnN0IG5ld1ZhcmlhYmxlTWFwID0gY3JlYXRlVmFyaWFibGVNYXBGb3JEaXJlY3RvcnkodGhpcy5fc2NvcGUsIHNvdXJjZURpciwgYmluYXJ5RGlyKTtcbiAgICB0aGlzLl90cmFuc3BvcnQucmVxdWVzdFN5bmMoTUFJTk5PREVfU1RBUlRNQUtFU0NSSVBULCBTY29wZUhlbHBlci50b0pTT04obmV3VmFyaWFibGVNYXApKTtcbiAgfVxufTtcbiIsIi8qXG4gKiBNSVQgTGljZW5zZVxuICpcbiAqIENvcHlyaWdodCAoYykgMjAyNSAgWXVyaWkgWWFrdWJpbiAoeXVyaWkueWFrdWJpbkBnbWFpbC5jb20pXG4gKlxuICogUGVybWlzc2lvbiBpcyBncmFudGVkIHRvIHVzZSwgY29weSwgbW9kaWZ5LCBhbmQgZGlzdHJpYnV0ZSB0aGlzIHNvZnR3YXJlXG4gKiB1bmRlciB0aGUgTUlUIExpY2Vuc2UuIFNlZSBMSUNFTlNFIGZpbGUgZm9yIGRldGFpbHMuXG4gKi9cblxuZXhwb3J0IGNvbnN0IFdPUktFUk5PREVfU1RBUlRNQUtFU0NSSVBUID0gXCJXb3JrZXJOb2RlLnN0YXJ0TWFrZVNjcmlwdFwiO1xuXG5leHBvcnQgY29uc3QgTUFJTk5PREVfTE9BREpTT04gPSBcIk1haW5Ob2RlLmxvYWRKU09OXCI7XG5leHBvcnQgY29uc3QgTUFJTk5PREVfRVhFQ1VURVNDUklQVCA9IFwiTWFpbk5vZGUuZXhlY3V0ZVNjcmlwdFwiO1xuZXhwb3J0IGNvbnN0IE1BSU5OT0RFX1NUQVJUTUFLRVNDUklQVCA9IFwiTWFpbk5vZGUuc3RhcnRNYWtlU2NyaXB0XCI7XG4iLCIvKlxuICogTUlUIExpY2Vuc2VcbiAqXG4gKiBDb3B5cmlnaHQgKGMpIDIwMjUgIFl1cmlpIFlha3ViaW4gKHl1cmlpLnlha3ViaW5AZ21haWwuY29tKVxuICpcbiAqIFBlcm1pc3Npb24gaXMgZ3JhbnRlZCB0byB1c2UsIGNvcHksIG1vZGlmeSwgYW5kIGRpc3RyaWJ1dGUgdGhpcyBzb2Z0d2FyZVxuICogdW5kZXIgdGhlIE1JVCBMaWNlbnNlLiBTZWUgTElDRU5TRSBmaWxlIGZvciBkZXRhaWxzLlxuICovXG5cbmV4cG9ydCBjb25zdCBKU09OUlBDX1ZFUlNJT04gPSBcIjIuMFwiO1xuZXhwb3J0IGludGVyZmFjZSBJTWVzc2FnZVNlbmRlciB7XG4gIHNlbmRNZXNzYWdlKG1lc3NhZ2U6IGFueSk6IHZvaWQ7XG59O1xuXG5leHBvcnQgaW50ZXJmYWNlIElNZXNzYWdlRW1pdHRlciB7XG4gIGVtaXRNZXNzYWdlKHNlbmRlcjogSU1lc3NhZ2VTZW5kZXIsIG1lc3NhZ2U6IGFueSk6IHZvaWQ7XG59O1xuXG5leHBvcnQgaW50ZXJmYWNlIElSZXF1ZXN0U3luYyB7XG4gIHJlcXVlc3RTeW5jKGRhdGE6IGFueSk6IGFueTtcbn07XG5cbmV4cG9ydCBpbnRlcmZhY2UgSUpzb25ScGNSZWNpdmVyIHtcbiAgb25SZXF1ZXN0KG1ldGhvZDogc3RyaW5nLCBpZDogbnVtYmVyLCBwYXJhbXM/OiBhbnkpOiB2b2lkO1xuICBvblJlc3VsdChyZXN1bHQ6IGFueSwgaWQ6IG51bWJlcik6IHZvaWQ7XG4gIG9uRXJyb3IoZXJyb3I6IG9iamVjdCwgaWQ6IG51bWJlciB8IG51bGwpOiB2b2lkO1xuICBvbk5vdGlmaWNhdGlvbihtZXRob2Q6IHN0cmluZywgcGFyYW1zPzogYW55KTogdm9pZDtcbn07XG5cbmV4cG9ydCBpbnRlcmZhY2UgSUpzb25ScGNTZW5kZXIge1xuICAvLyBzZW5kTWV0aG9kKG1ldGhvZDogc3RyaW5nLCBwYXJhbXM/OiBhbnksIGNhbGxiYWNrOiAoKSk6IHZvaWQ7XG59O1xuXG5leHBvcnQgaW50ZXJmYWNlIEpzb25ScGNEYXRhIHtcbiAganNvbnJwYzogc3RyaW5nO1xuICBtZXRob2Q/OiBzdHJpbmc7XG4gIHBhcmFtcz86IGFueTtcbiAgaWQ/OiBudW1iZXI7XG4gIGVycm9yPzoge1xuICAgIGNvZGU6IG51bWJlcixcbiAgICBtZXNzYWdlOiBzdHJpbmcsXG4gICAgZGF0YT86IGFueSxcbiAgfSxcbiAgcmVzdWx0PzogYW55O1xufTtcblxuZXhwb3J0IHR5cGUgSnNvblJwY1JlcXVlc3RIYW5kbGVyID0gKHJlcXVlc3Q6IElKc29uUnBjUmVxdWVzdCwgcmVzcG9uc2U6IElKc29uUnBjUmVzcG9uc2UpID0+IHZvaWQ7XG5leHBvcnQgdHlwZSBKc29uUnBjQ2FsbGJhY2sgPSAocGFyYW1zOiBhbnkpID0+IGFueTtcblxuZXhwb3J0IGludGVyZmFjZSBJSnNvblJwY1JlcXVlc3Qge1xuICBnZXQgcGFyYW1zKCk6IGFueTtcbn07XG5cbmV4cG9ydCBpbnRlcmZhY2UgSUpzb25ScGNSZXNwb25zZSB7XG4gIHNlbmRSZXN1bHQoanNvbjogYW55KTogdm9pZDtcbn07XG4iLCIvKlxuICogTUlUIExpY2Vuc2VcbiAqXG4gKiBDb3B5cmlnaHQgKGMpIDIwMjUgIFl1cmlpIFlha3ViaW4gKHl1cmlpLnlha3ViaW5AZ21haWwuY29tKVxuICpcbiAqIFBlcm1pc3Npb24gaXMgZ3JhbnRlZCB0byB1c2UsIGNvcHksIG1vZGlmeSwgYW5kIGRpc3RyaWJ1dGUgdGhpcyBzb2Z0d2FyZVxuICogdW5kZXIgdGhlIE1JVCBMaWNlbnNlLiBTZWUgTElDRU5TRSBmaWxlIGZvciBkZXRhaWxzLlxuICovXG5cbmltcG9ydCB7IElNZXNzYWdlU2VuZGVyLCBJTWVzc2FnZUVtaXR0ZXIgfSBmcm9tIFwiQC9zZXJ2ZXIvVHJhbnNwb3J0XCI7XG5pbXBvcnQgeyBNZW1vcnlUcmFuc3BvcnQgfSBmcm9tIFwiQC9zZXJ2ZXIvTWVtb3J5VHJhbnNwb3J0XCI7XG5pbXBvcnQgeyBKc29uUnBjU2VydmVyIH0gZnJvbSBcIkAvc2VydmVyL0pzb25ScGNTZXJ2ZXJcIjtcbmltcG9ydCB7IFdvcmtlck5vZGUgfSBmcm9tIFwiQC9zZXJ2ZXIvV29ya2VyTm9kZVwiO1xuaW1wb3J0IHsgV09SS0VSTk9ERV9TVEFSVE1BS0VTQ1JJUFQgfSBmcm9tIFwiQC9zZXJ2ZXIvUmVtb3RlTWV0aG9kc1wiO1xuaW1wb3J0IHsgTG9nZ2VyIH0gZnJvbSBcIkAvbG9nZ2VyXCI7XG5cbmNvbnN0IGxvZ2dlciA9IExvZ2dlci5jcmVhdGUoaW1wb3J0Lm1ldGEudXJsKTtcblxuZXhwb3J0IGNsYXNzIFdvcmtlckxvb3BlciBpbXBsZW1lbnRzIElNZXNzYWdlRW1pdHRlciB7XG4gIHByaXZhdGUgX2pzb25ycGNTZXJ2ZXI6IEpzb25ScGNTZXJ2ZXI7XG5cbiAgcHVibGljIGNvbnN0cnVjdG9yKHNlbmRlcjogSU1lc3NhZ2VTZW5kZXIpIHtcbiAgICB0aGlzLl9qc29ucnBjU2VydmVyID0gbmV3IEpzb25ScGNTZXJ2ZXI7XG5cbiAgICBjb25zdCBidWZmZXIgPSBuZXcgU2hhcmVkQXJyYXlCdWZmZXIoMHg4MDAwKTtcbiAgICBjb25zdCB0cmFuc3BvcnQgPSBuZXcgTWVtb3J5VHJhbnNwb3J0KHNlbmRlciwgYnVmZmVyKTtcblxuICAgIGNvbnN0IHdvcmtlck5vZGUgPSBuZXcgV29ya2VyTm9kZSh0cmFuc3BvcnQpO1xuICAgIHRoaXMuX2pzb25ycGNTZXJ2ZXIucmVnaXN0ZXJDYWxsYmFjayhXT1JLRVJOT0RFX1NUQVJUTUFLRVNDUklQVCwgcGFyYW1zID0+IHdvcmtlck5vZGUuZXhlY01ha2VTY3JpcHQocGFyYW1zKSk7XG4gIH1cblxuICBwdWJsaWMgZW1pdE1lc3NhZ2Uoc2VuZGVyOiBJTWVzc2FnZVNlbmRlciwgbWVzc2FnZTogYW55KTogdm9pZCB7XG4gICAgcmV0dXJuIHRoaXMuX2pzb25ycGNTZXJ2ZXIuZW1pdE1lc3NhZ2Uoc2VuZGVyLCBtZXNzYWdlKTtcbiAgfVxufTtcbiIsIi8qXG4gKiBNSVQgTGljZW5zZVxuICpcbiAqIENvcHlyaWdodCAoYykgMjAyNSAgWXVyaWkgWWFrdWJpbiAoeXVyaWkueWFrdWJpbkBnbWFpbC5jb20pXG4gKlxuICogUGVybWlzc2lvbiBpcyBncmFudGVkIHRvIHVzZSwgY29weSwgbW9kaWZ5LCBhbmQgZGlzdHJpYnV0ZSB0aGlzIHNvZnR3YXJlXG4gKiB1bmRlciB0aGUgTUlUIExpY2Vuc2UuIFNlZSBMSUNFTlNFIGZpbGUgZm9yIGRldGFpbHMuXG4gKi9cblxuaW1wb3J0IHsgSVJlcXVlc3RTeW5jIH0gZnJvbSBcIkAvc2VydmVyL1RyYW5zcG9ydFwiO1xuaW1wb3J0IHsgSnNvblJwY1JlcXVlc3RTeW5jIH0gZnJvbSBcIkAvc2VydmVyL0pzb25ScGNSZXF1ZXN0U3luY1wiO1xuaW1wb3J0IHsgUmVtb3RlTWFrZUNvbnRleHQgfSBmcm9tIFwiQC9zZXJ2ZXIvUmVtb3RlTWFrZUNvbnRleHRcIjtcbmltcG9ydCB7IFVzZXJNYWtlQ29udGV4dCB9IGZyb20gXCJAL2NvcmUvVXNlck1ha2VDb250ZXh0XCI7XG5pbXBvcnQgeyBwZXJmb3JtQ29udGV4dCB9IGZyb20gXCJAL2NvcmUvQmFzZUNvbnRleHRcIjtcbmltcG9ydCB7IFNjb3BlSGVscGVyIH0gZnJvbSBcIkAvY29yZS9TY29wZVwiO1xuXG5leHBvcnQgY2xhc3MgV29ya2VyTm9kZSB7XG4gIHByaXZhdGUgX3RyYW5zcG9ydDogSnNvblJwY1JlcXVlc3RTeW5jO1xuXG4gIHB1YmxpYyBjb25zdHJ1Y3RvcihyZXF1ZXN0U3luYzogSVJlcXVlc3RTeW5jKSB7XG4gICAgdGhpcy5fdHJhbnNwb3J0ID0gbmV3IEpzb25ScGNSZXF1ZXN0U3luYyhyZXF1ZXN0U3luYyk7XG4gIH1cblxuICBwdWJsaWMgYXN5bmMgZXhlY01ha2VTY3JpcHQocGFyYW1zOiBhbnkpOiBQcm9taXNlPHZvaWQ+IHtcbiAgICBjb25zdCB2YXJpYWJsZU1hcCA9IFNjb3BlSGVscGVyLmZyb21KU09OKHBhcmFtcyk7XG5cbiAgICBjb25zdCBtayA9IFVzZXJNYWtlQ29udGV4dC5jcmVhdGUobmV3IFJlbW90ZU1ha2VDb250ZXh0KHZhcmlhYmxlTWFwLCB0aGlzLl90cmFuc3BvcnQpLCB2YXJpYWJsZU1hcCk7XG4gICAgYXdhaXQgcGVyZm9ybUNvbnRleHQobWspO1xuICB9XG59O1xuIiwiLypcbiAqIE1JVCBMaWNlbnNlXG4gKlxuICogQ29weXJpZ2h0IChjKSAyMDI1ICBZdXJpaSBZYWt1YmluICh5dXJpaS55YWt1YmluQGdtYWlsLmNvbSlcbiAqXG4gKiBQZXJtaXNzaW9uIGlzIGdyYW50ZWQgdG8gdXNlLCBjb3B5LCBtb2RpZnksIGFuZCBkaXN0cmlidXRlIHRoaXMgc29mdHdhcmVcbiAqIHVuZGVyIHRoZSBNSVQgTGljZW5zZS4gU2VlIExJQ0VOU0UgZmlsZSBmb3IgZGV0YWlscy5cbiAqL1xuXG5pbXBvcnQgeyBXb3JrZXIgfSBmcm9tIFwibm9kZTp3b3JrZXJfdGhyZWFkc1wiO1xuaW1wb3J0IHsgSU1lc3NhZ2VTZW5kZXIgfSBmcm9tIFwiQC9zZXJ2ZXIvVHJhbnNwb3J0XCI7XG5pbXBvcnQgeyBMb2dnZXIgfSBmcm9tIFwiQC9sb2dnZXJcIjtcblxuY29uc3QgbG9nZ2VyID0gTG9nZ2VyLmNyZWF0ZShpbXBvcnQubWV0YS51cmwpO1xuXG5leHBvcnQgY2xhc3MgV29ya2VyU2VuZGVyIGltcGxlbWVudHMgSU1lc3NhZ2VTZW5kZXIge1xuICBwcml2YXRlIF93b3JrZXI6IFdvcmtlcjtcblxuICBwdWJsaWMgY29uc3RydWN0b3Iod29ya2VyOiBXb3JrZXIpIHtcbiAgICB0aGlzLl93b3JrZXIgPSB3b3JrZXI7XG4gIH1cblxuICBwdWJsaWMgc2VuZE1lc3NhZ2UobWVzc2FnZTogYW55KTogdm9pZCB7XG4gICAgbG9nZ2VyLmRlYnVnKFwiPC0tXCIsIG1lc3NhZ2UpO1xuICAgIHRoaXMuX3dvcmtlci5wb3N0TWVzc2FnZShtZXNzYWdlKTtcbiAgfVxufTtcbiIsIi8qXG4gKiBNSVQgTGljZW5zZVxuICpcbiAqIENvcHlyaWdodCAoYykgMjAyNSAgWXVyaWkgWWFrdWJpbiAoeXVyaWkueWFrdWJpbkBnbWFpbC5jb20pXG4gKlxuICogUGVybWlzc2lvbiBpcyBncmFudGVkIHRvIHVzZSwgY29weSwgbW9kaWZ5LCBhbmQgZGlzdHJpYnV0ZSB0aGlzIHNvZnR3YXJlXG4gKiB1bmRlciB0aGUgTUlUIExpY2Vuc2UuIFNlZSBMSUNFTlNFIGZpbGUgZm9yIGRldGFpbHMuXG4gKi9cblxuZXhwb3J0IG5hbWVzcGFjZSBBcmdzIHtcblxuZnVuY3Rpb24gdG9PcHRpb25LZXkobmFtZTogc3RyaW5nKSB7XG4gIGlmICghbmFtZS5zdGFydHNXaXRoKFwiLS1cIikpXG4gICAgcmV0dXJuIG51bGw7XG5cbiAgbmFtZSA9IG5hbWUuc3Vic3RyaW5nKDIpLnRvTG93ZXJDYXNlKCk7XG4gIGlmICghbmFtZS5sZW5ndGgpXG4gICAgcmV0dXJuIG51bGw7XG5cbiAgbGV0IGtleSA9IG5hbWUuY2hhckF0KDApO1xuICBpZiAoIWtleS5tYXRjaCgvW2Etel0vKSlcbiAgICByZXR1cm4gbnVsbDtcblxuICBsZXQgaHlwaGVuID0gMDtcbiAgZm9yIChsZXQgaSA9IDE7IGkgPCBuYW1lLmxlbmd0aDsgaSsrKSB7XG4gICAgY29uc3QgY2ggPSBuYW1lLmNoYXJBdChpKTtcbiAgICBpZiAoY2gubWF0Y2goL1thLXowLTldLykpIHtcbiAgICAgIGtleSArPSAoaHlwaGVuID8gY2gudG9VcHBlckNhc2UoKSA6IGNoKVxuICAgICAgaHlwaGVuID0gMDtcbiAgICB9XG4gICAgZWxzZSBpZiAoY2ggPT0gXCItXCIpIHtcbiAgICAgIGlmICgrK2h5cGhlbiA+IDEpXG4gICAgICAgIHJldHVybiBudWxsO1xuICAgIH1cbiAgfVxuXG4gIHJldHVybiBoeXBoZW4gPyBudWxsIDoga2V5O1xufVxuXG5leHBvcnQgZnVuY3Rpb24gdG9PYmplY3QoYXJnczogc3RyaW5nW10pOiBvYmplY3Qge1xuICBjb25zdCByZXN1bHQ6IGFueSA9IHt9O1xuXG4gIGxldCBsYXN0S2V5ID0gbnVsbDtcbiAgZm9yIChjb25zdCBpdGVyIG9mIGFyZ3MpIHtcbiAgICBpZiAoaXRlci5zdGFydHNXaXRoKFwiLS1cIikpIHtcbiAgICAgIGNvbnN0IGtleSA9IHRvT3B0aW9uS2V5KGl0ZXIpO1xuICAgICAgaWYgKCFrZXkpXG4gICAgICAgIHRocm93IEVycm9yKGBPcHRpb24gJHtpdGVyfSBpcyBub3Qgc3VwcG9ydGVkYCk7XG4gICAgICBpZiAocmVzdWx0Lmhhc093blByb3BlcnR5KGtleSkpXG4gICAgICAgIHRocm93IEVycm9yKGBDYW5ub3Qgc3BlY2lmeSB0aGUgc2FtZSBvcHRpb24gJyR7aXRlcn0nIG1vcmUgdGhhbiBvbmNlYCk7XG4gICAgICBsYXN0S2V5ID0ga2V5O1xuICAgICAgcmVzdWx0W2tleV0gPSB0cnVlO1xuICAgIH1cbiAgICBlbHNlIGlmIChsYXN0S2V5KSB7XG4gICAgICBjb25zdCB2YWx1ZSA9IHJlc3VsdFtsYXN0S2V5XTtcbiAgICAgIGlmICh0eXBlb2YgdmFsdWUgPT09ICdib29sZWFuJylcbiAgICAgICAgcmVzdWx0W2xhc3RLZXldID0gaXRlcjtcbiAgICAgIGVsc2UgaWYgKHR5cGVvZiB2YWx1ZSA9PT0gJ3N0cmluZycpXG4gICAgICAgIHJlc3VsdFtsYXN0S2V5XSA9IFsgdmFsdWUsIGl0ZXIgXTtcbiAgICAgIGVsc2VcbiAgICAgICAgdmFsdWUucHVzaChpdGVyKTtcbiAgICB9XG4gICAgZWxzZSB7XG4gICAgICB0aHJvdyBFcnJvcihgTmVlZCB0byBzcGVjaWZ5IHRoZSBvcHRpb24gbmFtZSBiZWZvcmUgJyR7aXRlcn0nIHBhcmFtZXRlcmApO1xuICAgIH1cbiAgfVxuXG4gIHJldHVybiByZXN1bHQ7XG59XG5cbn0gLy8gbmFtZXNwYWNlIEFyZ3NcbiIsIi8qXG4gKiBNSVQgTGljZW5zZVxuICpcbiAqIENvcHlyaWdodCAoYykgMjAyNSAgWXVyaWkgWWFrdWJpbiAoeXVyaWkueWFrdWJpbkBnbWFpbC5jb20pXG4gKlxuICogUGVybWlzc2lvbiBpcyBncmFudGVkIHRvIHVzZSwgY29weSwgbW9kaWZ5LCBhbmQgZGlzdHJpYnV0ZSB0aGlzIHNvZnR3YXJlXG4gKiB1bmRlciB0aGUgTUlUIExpY2Vuc2UuIFNlZSBMSUNFTlNFIGZpbGUgZm9yIGRldGFpbHMuXG4gKi9cblxuaW1wb3J0IHBhdGggZnJvbSBcIm5vZGU6cGF0aFwiO1xuaW1wb3J0IGZzIGZyb20gXCJub2RlOmZzXCI7XG5pbXBvcnQgeyBzcGF3biB9IGZyb20gXCJub2RlOmNoaWxkX3Byb2Nlc3NcIjtcbmltcG9ydCB7IExvZ2dlciB9IGZyb20gXCJAL2xvZ2dlclwiO1xuXG5jb25zdCBsb2dnZXIgPSBMb2dnZXIuY3JlYXRlKGltcG9ydC5tZXRhLnVybCk7XG5cbnR5cGUgUmVzdWx0ID0ge1xuICBzdGF0dXM6IG51bWJlcjtcbn07XG5cbmV4cG9ydCBmdW5jdGlvbiBzcGF3bkFzeW5jKGNvbW1hbmQ6IHN0cmluZywgYXJnczogc3RyaW5nW10sIG9wdGlvbnM/OiBhbnkpOiBQcm9taXNlPFJlc3VsdD4ge1xuICBsZXQgZmQgPSBudWxsO1xuICBsZXQgdmVyYm9zZSA9IGZhbHNlO1xuICBpZiAob3B0aW9ucyAmJiBvcHRpb25zLmV4dHJhKSB7XG4gICAgaWYgKG9wdGlvbnMuZXh0cmEudmVyYm9zZSlcbiAgICAgIHZlcmJvc2UgPSB0cnVlO1xuICAgIGlmIChvcHRpb25zLmV4dHJhLm91dHB1dCkge1xuICAgICAgbGV0IGxvZ2ZpbGUgPSBvcHRpb25zLmV4dHJhLm91dHB1dDtcbiAgICAgIGlmICghcGF0aC5pc0Fic29sdXRlKGxvZ2ZpbGUpICYmIG9wdGlvbnMuY3dkKSB7XG4gICAgICAgIGxvZ2ZpbGUgPSBwYXRoLnJlc29sdmUob3B0aW9ucy5jd2QsIGxvZ2ZpbGUpO1xuICAgICAgfVxuICAgICAgZmQgPSBmcy5vcGVuU3luYyhsb2dmaWxlLCBcIncrXCIsIDBvNjY2KTtcbiAgICB9XG4gIH1cbiAgcmV0dXJuIG5ldyBQcm9taXNlKChyZXNvbHZlLCByZWplY3QpID0+IHtcbiAgICBpZiAoZmQgfHwgdmVyYm9zZSkge1xuICAgICAgdmVyYm9zZSAmJiBsb2dnZXIubm90aWNlKFsgcGF0aC5iYXNlbmFtZShjb21tYW5kKSwgLi4uYXJncyBdLmpvaW4oXCIgXCIpKTtcbiAgICAgIGZkICYmIGZzLndyaXRlU3luYyhmZCwgSlNPTi5zdHJpbmdpZnkoe2NvbW1hbmQsIGFyZ3MsIG9wdGlvbnMgfSwgbnVsbCwgMikgKyBcIlxcblwiKTtcbiAgICB9XG4gICAgY29uc3QgZXhlYyA9IHNwYXduKGNvbW1hbmQsIGFyZ3MsIG9wdGlvbnMpO1xuICAgIGV4ZWMuc3Rkb3V0Lm9uKFwiZGF0YVwiLCAoZGF0YSkgPT4ge1xuICAgICAgcHJvY2Vzcy5zdGRvdXQud3JpdGUoZGF0YSk7XG4gICAgICBmZCAmJiBmcy53cml0ZVN5bmMoZmQsIGRhdGEpO1xuICAgIH0pO1xuICAgIGV4ZWMuc3RkZXJyLm9uKFwiZGF0YVwiLCAoZGF0YSkgPT4ge1xuICAgICAgcHJvY2Vzcy5zdGRlcnIud3JpdGUoZGF0YSk7XG4gICAgICBmZCAmJiBmcy53cml0ZVN5bmMoZmQsIGRhdGEpO1xuICAgIH0pO1xuICAgIGV4ZWMub24oXCJjbG9zZVwiLCAoc3RhdHVzOiBudW1iZXIpID0+IHtcbiAgICAgIGZkICYmIGZzLmNsb3NlU3luYyhmZCk7XG4gICAgICByZXNvbHZlKHtzdGF0dXN9KTtcbiAgICB9KTtcbiAgfSk7XG59XG4iLCIvKlxuICogTUlUIExpY2Vuc2VcbiAqXG4gKiBDb3B5cmlnaHQgKGMpIDIwMjUgIFl1cmlpIFlha3ViaW4gKHl1cmlpLnlha3ViaW5AZ21haWwuY29tKVxuICpcbiAqIFBlcm1pc3Npb24gaXMgZ3JhbnRlZCB0byB1c2UsIGNvcHksIG1vZGlmeSwgYW5kIGRpc3RyaWJ1dGUgdGhpcyBzb2Z0d2FyZVxuICogdW5kZXIgdGhlIE1JVCBMaWNlbnNlLiBTZWUgTElDRU5TRSBmaWxlIGZvciBkZXRhaWxzLlxuICovXG5cbmltcG9ydCBmcyBmcm9tIFwibm9kZTpmc1wiO1xuaW1wb3J0IHBhdGggZnJvbSBcIm5vZGU6cGF0aFwiO1xuaW1wb3J0IHVybCBmcm9tIFwibm9kZTp1cmxcIjtcblxuaW1wb3J0IHsgRklMRV9TQ0hFTUUsIElNUE9SVF9TQ0hFTUUsIEhUVFBfU0NIRU1FLCBIVFRQU19TQ0hFTUUgfSBmcm9tIFwiQC91dGlscy9VcmxTY2hlbWVcIjtcbmltcG9ydCB7IHJlcXVpcmVSZXNvbHZlIH0gZnJvbSBcIkAvdXRpbHMvTW9kdWxlXCI7XG5cbmV4cG9ydCBhc3luYyBmdW5jdGlvbiBwYXRoRXhpc3RzKHBhdGg6IHN0cmluZykge1xuICB0cnkge1xuICAgIHJldHVybiAhIShhd2FpdCBmcy5wcm9taXNlcy5zdGF0KHBhdGgpKTtcbiAgfSBjYXRjaCB7XG4gICAgcmV0dXJuIGZhbHNlO1xuICB9XG59XG5cbmV4cG9ydCBmdW5jdGlvbiBwYXRoRXhpc3RzU3luYyhwYXRoOiBzdHJpbmcpIHtcbiAgdHJ5IHtcbiAgICByZXR1cm4gISFmcy5zdGF0U3luYyhwYXRoKTtcbiAgfSBjYXRjaCB7XG4gICAgcmV0dXJuIGZhbHNlO1xuICB9XG59XG5cbmV4cG9ydCBhc3luYyBmdW5jdGlvbiBmaWxlRXhpc3RzKHBhdGg6IHN0cmluZykge1xuICB0cnkge1xuICAgIHJldHVybiAoYXdhaXQgZnMucHJvbWlzZXMuc3RhdChwYXRoKSkuaXNGaWxlKCk7XG4gIH0gY2F0Y2gge1xuICAgIHJldHVybiBmYWxzZTtcbiAgfVxufVxuXG5leHBvcnQgZnVuY3Rpb24gZmlsZUV4aXN0c1N5bmMocGF0aDogc3RyaW5nKSB7XG4gIHRyeSB7XG4gICAgcmV0dXJuIGZzLnN0YXRTeW5jKHBhdGgpLmlzRmlsZSgpO1xuICB9IGNhdGNoIHtcbiAgICByZXR1cm4gZmFsc2U7XG4gIH0gXG59XG5cbmV4cG9ydCBhc3luYyBmdW5jdGlvbiBkaXJlY3RvcnlFeGlzdHMocGF0aDogc3RyaW5nKSB7XG4gIHRyeSB7XG4gICAgcmV0dXJuIChhd2FpdCBmcy5wcm9taXNlcy5zdGF0KHBhdGgpKS5pc0RpcmVjdG9yeSgpO1xuICB9IGNhdGNoIHtcbiAgICByZXR1cm4gZmFsc2U7XG4gIH1cbn1cblxuZXhwb3J0IGZ1bmN0aW9uIGRpcmVjdG9yeUV4aXN0c1N5bmMocGF0aDogc3RyaW5nKSB7XG4gIHRyeSB7XG4gICByZXR1cm4gZnMuc3RhdFN5bmMocGF0aCkuaXNEaXJlY3RvcnkoKTtcbiAgfSBjYXRjaCB7XG4gICAgcmV0dXJuIGZhbHNlO1xuICB9XG59XG5cbmV4cG9ydCBmdW5jdGlvbiBleHRuYW1lKGZ1bGxwYXRoOiBzdHJpbmcsIG9wdGlvbnM6IGFueSkge1xuICBpZiAob3B0aW9ucz8ubG9uZ2VzdCkge1xuICAgIGNvbnN0IGZpbGVuYW1lID0gcGF0aC5iYXNlbmFtZShmdWxscGF0aCk7XG4gICAgY29uc3QgaW5kZXggPSBmaWxlbmFtZS5pbmRleE9mKCcuJyk7XG4gICAgcmV0dXJuIGluZGV4ICE9IC0xID8gZmlsZW5hbWUuc3Vic3RyaW5nKGluZGV4KSA6ICcnO1xuICB9XG5cbiAgcmV0dXJuIHBhdGguZXh0bmFtZShmdWxscGF0aCk7XG59XG5cbmV4cG9ydCBhc3luYyBmdW5jdGlvbiBmaWxlTGlzdChkaXJuYW1lOiBzdHJpbmcsIG9wdGlvbnM6IGFueSk6IFByb21pc2U8QXJyYXk8c3RyaW5nPj4ge1xuICBjb25zdCBsaXN0ID0gbmV3IEFycmF5PHN0cmluZz47XG4gIGlmIChhd2FpdCBkaXJlY3RvcnlFeGlzdHMoZGlybmFtZSkpIHtcbiAgICBmb3IgKGNvbnN0IGl0ZXIgb2YgYXdhaXQgZnMucHJvbWlzZXMucmVhZGRpcihkaXJuYW1lKSkge1xuICAgICAgY29uc3QgZmlsZXBhdGggPSBwYXRoLnJlc29sdmUoZGlybmFtZSwgaXRlcik7XG4gICAgICBjb25zdCBzdGF0ID0gYXdhaXQgZnMucHJvbWlzZXMuc3RhdChmaWxlcGF0aCk7XG4gICAgICBpZiAoc3RhdC5pc0ZpbGUoKSkge1xuICAgICAgICBsaXN0LnB1c2gob3B0aW9ucy5yZWxhdGl2ZSA/IHBhdGgucmVsYXRpdmUob3B0aW9ucy5yZWxhdGl2ZSwgZmlsZXBhdGgpIDogZmlsZXBhdGgpO1xuICAgICAgfVxuICAgICAgZWxzZSBpZiAob3B0aW9ucy5yZWN1cnNpdmUgJiYgc3RhdC5pc0RpcmVjdG9yeSgpKSB7XG4gICAgICAgIGZvciAoY29uc3QgZm5hbWUgb2YgYXdhaXQgZmlsZUxpc3QoZmlsZXBhdGgsIG9wdGlvbnMpKVxuICAgICAgICAgIGxpc3QucHVzaChmbmFtZSk7XG4gICAgICB9XG4gICAgfVxuICB9XG4gIHJldHVybiBsaXN0O1xufVxuXG5leHBvcnQgYXN5bmMgZnVuY3Rpb24gc2F2ZUlmRGlmZmVyZW50KGZpbGVuYW1lOiBzdHJpbmcsIGNvbnRlbnQ6IHN0cmluZykge1xuICBpZiAoYXdhaXQgZmlsZUV4aXN0cyhmaWxlbmFtZSkpIHtcbiAgICBjb25zdCBvbGRDb250ZW50ID0gYXdhaXQgZnMucHJvbWlzZXMucmVhZEZpbGUoZmlsZW5hbWUsIHsgZW5jb2Rpbmc6IFwidXRmOFwiIH0pO1xuICAgIGlmIChjb250ZW50ID09IG9sZENvbnRlbnQpXG4gICAgICByZXR1cm4gZmFsc2U7XG4gIH1cblxuICBhd2FpdCBmcy5wcm9taXNlcy5ta2RpcihwYXRoLmRpcm5hbWUoZmlsZW5hbWUpLCB7IHJlY3Vyc2l2ZTogdHJ1ZSB9KTtcbiAgYXdhaXQgZnMucHJvbWlzZXMud3JpdGVGaWxlKGZpbGVuYW1lLCBjb250ZW50LCB7IGVuY29kaW5nOiBcInV0ZjhcIiB9KTtcblxuICByZXR1cm4gdHJ1ZTtcbn1cblxuZXhwb3J0IGZ1bmN0aW9uIGdldFBhdGhTdHJpbmcoc3RyOiBzdHJpbmcpIHtcbiAgaWYgKHN0ci5zdGFydHNXaXRoKElNUE9SVF9TQ0hFTUUpKVxuICAgIHN0ciA9IHJlcXVpcmVSZXNvbHZlKHN0ci5zbGljZShJTVBPUlRfU0NIRU1FLmxlbmd0aCkpO1xuICBpZiAoc3RyLnN0YXJ0c1dpdGgoRklMRV9TQ0hFTUUpKVxuICAgIHJldHVybiB1cmwuZmlsZVVSTFRvUGF0aChzdHIpO1xuICByZXR1cm4gc3RyO1xufVxuXG5leHBvcnQgZnVuY3Rpb24gaXNVUkwoc3RyOiBzdHJpbmcpIHtcbiAgdHJ5IHtcbiAgICBuZXcgVVJMKHN0cik7XG4gICAgcmV0dXJuIHRydWU7XG4gIH0gY2F0Y2gge1xuICAgIHJldHVybiBmYWxzZTtcbiAgfVxufVxuXG5leHBvcnQgZnVuY3Rpb24gZ2V0VVJMU3RyaW5nKHN0cjogc3RyaW5nKSB7XG4gIGlmIChzdHIuc3RhcnRzV2l0aChJTVBPUlRfU0NIRU1FKSlcbiAgICByZXR1cm4gcmVxdWlyZVJlc29sdmUoc3RyLnNsaWNlKElNUE9SVF9TQ0hFTUUubGVuZ3RoKSk7XG4gIGlmIChpc1VSTChzdHIpKVxuICAgIHJldHVybiB1cmwuZmlsZVVSTFRvUGF0aChzdHIpO1xuICByZXR1cm4gc3RyO1xufVxuXG5leHBvcnQgYXN5bmMgZnVuY3Rpb24gZmV0Y2hCdWZmZXIoc3RyOiBzdHJpbmcpOiBQcm9taXNlPEJ1ZmZlcj4ge1xuICBpZiAoc3RyLnN0YXJ0c1dpdGgoSFRUUF9TQ0hFTUUpIHx8IHN0ci5zdGFydHNXaXRoKEhUVFBTX1NDSEVNRSkpIHtcbiAgICBjb25zdCByZXNwb25zZSA9IGF3YWl0IGZldGNoKHN0cik7XG4gICAgcmV0dXJuIEJ1ZmZlci5mcm9tKGF3YWl0IHJlc3BvbnNlLmFycmF5QnVmZmVyKCkpO1xuICB9XG4gIHJldHVybiBhd2FpdCBmcy5wcm9taXNlcy5yZWFkRmlsZShnZXRVUkxTdHJpbmcoc3RyKSk7XG59XG5cbmV4cG9ydCBhc3luYyBmdW5jdGlvbiBzYXZlQXNKU09OKGZpbGVuYW1lOiBzdHJpbmcsIHZhbHVlOiBhbnksIG9wdGlvbnM/OiB7IHByZXR0eTogYm9vbGVhbiB9KSB7XG4gIGNvbnN0IGNvbnRlbnQgPSBKU09OLnN0cmluZ2lmeSh2YWx1ZSwgbnVsbCwgb3B0aW9ucyAmJiBvcHRpb25zLnByZXR0eSA/IDIgOiAwKTtcbiAgYXdhaXQgZnMucHJvbWlzZXMubWtkaXIocGF0aC5kaXJuYW1lKGZpbGVuYW1lKSwgeyByZWN1cnNpdmU6IHRydWUgfSk7XG4gIGF3YWl0IGZzLnByb21pc2VzLndyaXRlRmlsZShmaWxlbmFtZSwgY29udGVudCwgeyBlbmNvZGluZzogXCJ1dGY4XCIgfSk7XG59XG4iLCIvKlxuICogTUlUIExpY2Vuc2VcbiAqXG4gKiBDb3B5cmlnaHQgKGMpIDIwMjUgIFl1cmlpIFlha3ViaW4gKHl1cmlpLnlha3ViaW5AZ21haWwuY29tKVxuICpcbiAqIFBlcm1pc3Npb24gaXMgZ3JhbnRlZCB0byB1c2UsIGNvcHksIG1vZGlmeSwgYW5kIGRpc3RyaWJ1dGUgdGhpcyBzb2Z0d2FyZVxuICogdW5kZXIgdGhlIE1JVCBMaWNlbnNlLiBTZWUgTElDRU5TRSBmaWxlIGZvciBkZXRhaWxzLlxuICovXG5cbmltcG9ydCBvcyBmcm9tIFwibm9kZTpvc1wiO1xuXG5jb25zdCBzaXplb2ZWb2lkcEJpdHM6IGFueSA9XG57XG4gIGFybTogICAgIDQsXG4gIGFybTY0OiAgIDgsXG4gIGlhMzI6ICAgIDQsXG4gIGxvb25nNjQ6IDgsXG4gIG1pcHM6ICAgIDQsXG4gIG1pcHNlbDogIDQsXG4gIHBwYzogICAgIDQsXG4gIHBwYzY0OiAgIDgsXG4gIHJpc2N2NjQ6IDgsXG4gIHMzOTA6ICAgIDQsXG4gIHMzOTB4OiAgIDgsXG4gIHg2NDogICAgIDQsXG59O1xuXG5jb25zdCBfc2l6ZW9mVm9pZHAgPSBzaXplb2ZWb2lkcEJpdHNbb3MuYXJjaCgpXTtcbmlmICghX3NpemVvZlZvaWRwKVxuICB0aHJvdyBuZXcgRXJyb3IoYFVua25vd24gJHtvcy5hcmNoKCl9IGFyY2hgKTtcblxubGV0IF9leGVjdXRhYmxlU3VmZml4OiBzdHJpbmc7XG5cbmlmIChvcy5wbGF0Zm9ybSgpID09PSBcIndpbjMyXCIpIHtcbiAgX2V4ZWN1dGFibGVTdWZmaXggPSBcIi5leGVcIjtcbn1cbmVsc2Uge1xuICBfZXhlY3V0YWJsZVN1ZmZpeCA9IFwiXCI7XG59XG5cbmV4cG9ydCBjbGFzcyBIb3N0IHtcbiAgc3RhdGljIGdldCBzaXplb2ZWb2lkcCgpOiA0IHwgOCB7XG4gICAgcmV0dXJuIF9zaXplb2ZWb2lkcDtcbiAgfVxuICBzdGF0aWMgZ2V0IGV4ZWN1dGFibGVTdWZmaXgoKTogc3RyaW5nIHtcbiAgICByZXR1cm4gX2V4ZWN1dGFibGVTdWZmaXg7XG4gIH1cbn07XG4iLCIvKlxuICogTUlUIExpY2Vuc2VcbiAqXG4gKiBDb3B5cmlnaHQgKGMpIDIwMjUgIFl1cmlpIFlha3ViaW4gKHl1cmlpLnlha3ViaW5AZ21haWwuY29tKVxuICpcbiAqIFBlcm1pc3Npb24gaXMgZ3JhbnRlZCB0byB1c2UsIGNvcHksIG1vZGlmeSwgYW5kIGRpc3RyaWJ1dGUgdGhpcyBzb2Z0d2FyZVxuICogdW5kZXIgdGhlIE1JVCBMaWNlbnNlLiBTZWUgTElDRU5TRSBmaWxlIGZvciBkZXRhaWxzLlxuICovXG5cbmltcG9ydCBwYXRoIGZyb20gXCJub2RlOnBhdGhcIjtcbmltcG9ydCBmcyBmcm9tIFwibm9kZTpmc1wiO1xuaW1wb3J0IGh0dHAgZnJvbSBcImh0dHBcIjtcbmltcG9ydCBodHRwcyBmcm9tIFwiaHR0cHNcIjtcblxuaW1wb3J0IHsgTG9nZ2VyIH0gZnJvbSBcIkAvbG9nZ2VyXCI7XG5cbmNvbnN0IGxvZ2dlciA9IExvZ2dlci5jcmVhdGUoaW1wb3J0Lm1ldGEudXJsKTtcblxuaW50ZXJmYWNlIElSZXNvbHZlQnVpbGRlciB7XG4gIGFwcGVuZChkYXRhOiBCdWZmZXIpOiB2b2lkO1xuICB0b1Jlc3VsdCgpOiBCdWZmZXIgfCB1bmRlZmluZWQ7XG59O1xuXG5jbGFzcyBCdWZmZXJCdWlsZGVyIGltcGxlbWVudHMgSVJlc29sdmVCdWlsZGVyIHtcbiAgcHJpdmF0ZSBfY2h1bmtzOiBBcnJheTxCdWZmZXI+ID0gW107XG5cbiAgcHVibGljIGFwcGVuZChjaHVuazogQnVmZmVyKTogdm9pZCB7XG4gICAgdGhpcy5fY2h1bmtzLnB1c2goY2h1bmspO1xuICB9XG5cbiAgcHVibGljIHRvUmVzdWx0KCk6IEJ1ZmZlciB7XG4gICAgcmV0dXJuIEJ1ZmZlci5jb25jYXQodGhpcy5fY2h1bmtzKTtcbiAgfVxufTtcblxuY2xhc3MgRmlsZVN5bmNXcml0ZXIgaW1wbGVtZW50cyBJUmVzb2x2ZUJ1aWxkZXIge1xuICBwcml2YXRlIF9mZDogbnVtYmVyO1xuXG4gIHB1YmxpYyBjb25zdHJ1Y3RvcihmaWxlOiBzdHJpbmcpIHtcbiAgICB0aGlzLl9mZCA9IGZzLm9wZW5TeW5jKGZpbGUsIFwid1wiKTtcbiAgfVxuXG4gIHB1YmxpYyBhcHBlbmQoY2h1bms6IEJ1ZmZlcik6IHZvaWQge1xuICAgIGZzLndyaXRlU3luYyh0aGlzLl9mZCwgY2h1bmspO1xuICB9XG5cbiAgcHVibGljIHRvUmVzdWx0KCk6IHVuZGVmaW5lZCB7XG4gICAgZnMuY2xvc2VTeW5jKHRoaXMuX2ZkKTtcbiAgfVxufTtcblxuZnVuY3Rpb24gY3JlYXRlQnVpbGRlcihmaWxlPzogc3RyaW5nKTogSVJlc29sdmVCdWlsZGVyIHtcbiAgaWYgKGZpbGUpXG4gICAgcmV0dXJuIG5ldyBGaWxlU3luY1dyaXRlcihmaWxlKTtcbiAgcmV0dXJuIG5ldyBCdWZmZXJCdWlsZGVyO1xufVxuXG5mdW5jdGlvbiBodHRwUmVxdWVzdCh1cmw6IHN0cmluZywgb3B0aW9uczogaHR0cC5SZXF1ZXN0T3B0aW9ucyB8IGh0dHBzLlJlcXVlc3RPcHRpb25zLCBjYWxsYmFjazogYW55KTogaHR0cC5DbGllbnRSZXF1ZXN0IHtcbiAgaWYgKHVybC5zdGFydHNXaXRoKFwiaHR0cHM6Ly9cIikpXG4gICAgcmV0dXJuIGh0dHBzLnJlcXVlc3QodXJsLCBvcHRpb25zLCBjYWxsYmFjayk7XG4gIHJldHVybiBodHRwLnJlcXVlc3QodXJsLCBvcHRpb25zLCBjYWxsYmFjayk7XG59O1xuXG5pbnRlcmZhY2UgRmV0Y2hPcHRpb25zIHtcbiAgYXR0ZW1wdHM/OiBudW1iZXI7XG59O1xuXG5mdW5jdGlvbiBmZXRjaEltcGwodXJsOiBzdHJpbmcsIGZpbGU6IHN0cmluZyB8IHVuZGVmaW5lZCwgb3B0aW9uczogRmV0Y2hPcHRpb25zKTogUHJvbWlzZTxCdWZmZXJ8dW5kZWZpbmVkPiB7XG4gIHJldHVybiBuZXcgUHJvbWlzZSgocmVzb2x2ZSwgcmVqZWN0KSA9PiB7XG4gICAgY29uc3QgaHR0cE9wdGlvbnMgPSB7XG4gICAgICBtZXRob2Q6ICdHRVQnLFxuICAgICAgdGltZW91dDogNTAwMCxcbiAgICAgIGhlYWRlcnM6IHtcbiAgICAgICAgXCJVc2VyLUFnZW50XCI6IFBST0pFQ1RfTkFNRSArIFwiL1wiICsgUFJPSkVDVF9WRVJTSU9OLFxuICAgICAgICBcIkFjY2VwdFwiOiBcIiovKlwiLFxuICAgICAgfSxcbiAgICB9O1xuXG4gICAgbGV0IGF0dGVtcHRzID0gb3B0aW9ucy5hdHRlbXB0cyB8fCAwO1xuICAgIGNvbnN0IGRvUmVxdWVzdCA9ICh1cmw6IHN0cmluZykgPT4ge1xuICAgICAgY29uc3QgcmVxdWVzdCA9IGh0dHBSZXF1ZXN0KHVybCwgaHR0cE9wdGlvbnMsIG9uUmVxdWVzdCk7XG5cbiAgICAgIGxldCBoYXNFcnJvciA9IGZhbHNlO1xuICAgICAgY29uc3Qgb25FcnJvciA9IChlcnI6IEVycm9yKSA9PiB7XG4gICAgICAgIHJlcXVlc3QuZGVzdHJveSgpO1xuICAgICAgICBpZiAoIWhhc0Vycm9yKSB7XG4gICAgICAgICAgaGFzRXJyb3IgPSB0cnVlO1xuICAgICAgICAgIGlmIChhdHRlbXB0cyA+IDApIHtcbiAgICAgICAgICAgIGxvZ2dlci53YXJuKGVyci5tZXNzYWdlKTtcbiAgICAgICAgICAgIGxvZ2dlci5pbmZvKGByZS13Z2V0ICR7dXJsfSBhdHRlbXB0cyAke2F0dGVtcHRzfWApO1xuICAgICAgICAgICAgYXR0ZW1wdHMtLTtcbiAgICAgICAgICAgIGRvUmVxdWVzdCh1cmwpO1xuICAgICAgICAgIH1cbiAgICAgICAgICBlbHNlIHtcbiAgICAgICAgICAgIHJlamVjdChlcnIpO1xuICAgICAgICAgIH1cbiAgICAgICAgfVxuICAgICAgfTtcblxuICAgICAgcmVxdWVzdC5vbihcInRpbWVvdXRcIiwgKCkgPT4ge1xuICAgICAgICBvbkVycm9yKG5ldyBFcnJvcihcIlRpbWVvdXQgZm9yIFwiICsgdXJsKSk7XG4gICAgICB9KTtcblxuICAgICAgcmVxdWVzdC5vbihcImVycm9yXCIsIChlcnI6IEVycm9yKSA9PiB7XG4gICAgICAgIG9uRXJyb3IoZXJyKTtcbiAgICAgIH0pO1xuXG4gICAgICByZXF1ZXN0LmVuZCgpO1xuICAgIH07XG5cbiAgICBjb25zdCBmaWxlbmFtZSA9IHBhdGguYmFzZW5hbWUodXJsKTtcbiAgICBjb25zdCBvblJlcXVlc3QgPSAocmVzcG9uc2U6IGh0dHAuSW5jb21pbmdNZXNzYWdlKSA9PiB7XG4gICAgICBzd2l0Y2ggKHJlc3BvbnNlLnN0YXR1c0NvZGUpIHtcbiAgICAgIGNhc2UgMjAwOlxuICAgICAgICBsb2dnZXIuZGVidWcoYENvbm5jdGVkIHRvICR7KHJlc3BvbnNlIGFzIGFueSkucmVxLmhvc3R9YCk7XG4gICAgICAgIGxvZ2dlci5kZWJ1ZyhgRG93bmxvYWRpbmcgJHtmaWxlbmFtZX1gKTtcbiAgICAgICAgY29uc3QgYnVpbGRlciA9IGNyZWF0ZUJ1aWxkZXIoZmlsZSk7XG4gICAgICAgIHJlc3BvbnNlLm9uKFwiZGF0YVwiLCAoY2h1bms6IEJ1ZmZlcikgPT4gYnVpbGRlci5hcHBlbmQoY2h1bmspKTtcbiAgICAgICAgcmVzcG9uc2Uub24oXCJlbmRcIiwgKCkgPT4gcmVzb2x2ZShidWlsZGVyLnRvUmVzdWx0KCkpKTtcbiAgICAgICAgcmVzcG9uc2Uub24oJ2Nsb3NlJywgKCkgPT4gbG9nZ2VyLmRlYnVnKFwiQ2xvc2VcIikpO1xuICAgICAgICBicmVhaztcblxuICAgICAgY2FzZSAzMDE6XG4gICAgICBjYXNlIDMwMjpcbiAgICAgICAgcmVzcG9uc2UucmVzdW1lKCk7XG4gICAgICAgIGlmIChyZXNwb25zZS5oZWFkZXJzLmxvY2F0aW9uKSB7XG4gICAgICAgICAgbG9nZ2VyLmluZm8oXCJSZWRpcmVjdCB0byBcIiArIHJlc3BvbnNlLmhlYWRlcnMubG9jYXRpb24pO1xuICAgICAgICAgIGRvUmVxdWVzdChyZXNwb25zZS5oZWFkZXJzLmxvY2F0aW9uKTtcbiAgICAgICAgfVxuICAgICAgICBicmVhaztcblxuICAgICAgZGVmYXVsdDpcbiAgICAgICAgcmVzcG9uc2UucmVzdW1lKCk7XG4gICAgICAgIGNvbnN0IG1lc3NhZ2UgPSBcIkRpZCBub3QgZ2V0IGFuIE9LIGZyb20gdGhlIHNlcnZlci4gQ29kZTogXCIgKyByZXNwb25zZS5zdGF0dXNDb2RlO1xuICAgICAgICBsb2dnZXIuZXJyb3IobWVzc2FnZSk7XG4gICAgICAgIHJlamVjdChtZXNzYWdlKTtcbiAgICAgICAgYnJlYWs7XG4gICAgICB9XG4gICAgfTtcblxuICAgIGxvZ2dlci5pbmZvKFwid2dldCBcIiArIHVybCk7XG4gICAgZG9SZXF1ZXN0KHVybCk7XG4gIH0pO1xufTtcblxuZXhwb3J0IGZ1bmN0aW9uIHJlcXVlc3RHZXQodXJsOiBzdHJpbmcsIG9wdGlvbnM/OiBGZXRjaE9wdGlvbnMpIHtcbiAgcmV0dXJuIGZldGNoSW1wbCh1cmwsIHVuZGVmaW5lZCwgb3B0aW9ucyB8fCB7fSkgYXMgUHJvbWlzZTxCdWZmZXI+O1xufVxuXG5leHBvcnQgZnVuY3Rpb24gZG93bmxvYWRGaWxlKHVybDogc3RyaW5nLCBmaWxlOiBzdHJpbmcsIG9wdGlvbnM/OiBGZXRjaE9wdGlvbnMpIHtcbiAgcmV0dXJuIGZldGNoSW1wbCh1cmwsIGZpbGUsIG9wdGlvbnMgfHwge30pIGFzIFByb21pc2U8dW5kZWZpbmVkPjtcbn1cbiIsIi8qXG4gKiBNSVQgTGljZW5zZVxuICpcbiAqIENvcHlyaWdodCAoYykgMjAyNSAgWXVyaWkgWWFrdWJpbiAoeXVyaWkueWFrdWJpbkBnbWFpbC5jb20pXG4gKlxuICogUGVybWlzc2lvbiBpcyBncmFudGVkIHRvIHVzZSwgY29weSwgbW9kaWZ5LCBhbmQgZGlzdHJpYnV0ZSB0aGlzIHNvZnR3YXJlXG4gKiB1bmRlciB0aGUgTUlUIExpY2Vuc2UuIFNlZSBMSUNFTlNFIGZpbGUgZm9yIGRldGFpbHMuXG4gKi9cblxuaW1wb3J0IHVybCBmcm9tIFwibm9kZTp1cmxcIjtcblxuZXhwb3J0IGNvbnN0IGltcG9ydE1vZHVsZSA9IGFzeW5jIChuYW1lKSA9PiBpbXBvcnQoLyogd2VicGFja0lnbm9yZTogdHJ1ZSAqLyBuYW1lKTtcblxuZXhwb3J0IGZ1bmN0aW9uIGlzRW50cnlQb2ludCgpIHtcbiAgLy8gaWYgKE9iamVjdChpbXBvcnQubWV0YSkudXJsKVxuICAvLyAgIHJldHVybiB1cmwuZmlsZVVSTFRvUGF0aChPYmplY3QoaW1wb3J0Lm1ldGEpLnVybCkgPT09IHByb2Nlc3MuYXJndlsxXTtcbiAgaWYgKHR5cGVvZiByZXF1aXJlICE9PSAndW5kZWZpbmVkJylcbiAgICByZXR1cm4gcmVxdWlyZS5tYWluID09PSBtb2R1bGU7XG4gIHRocm93IG5ldyBFcnJvcihcIk5vIGNvbXBhdGlibGUgbW9kdWxlIHJlc29sdmVyIGZvdW5kXCIpO1xufVxuXG5leHBvcnQgZnVuY3Rpb24gY3VycmVudFNjcmlwdFVSTCgpIHtcbiAgLy8gaWYgKE9iamVjdChpbXBvcnQubWV0YSkudXJsKVxuICAvLyAgIHJldHVybiB1cmwuZmlsZVVSTFRvUGF0aChPYmplY3QoaW1wb3J0Lm1ldGEpLnVybCk7XG4gIGlmICh0eXBlb2YgcmVxdWlyZSAhPT0gJ3VuZGVmaW5lZCcpXG4gICAgcmV0dXJuIHVybC5wYXRoVG9GaWxlVVJMKC8qIHdlYnBhY2tJZ25vcmU6IHRydWUgKi8gX19maWxlbmFtZSk7XG4gIHRocm93IG5ldyBFcnJvcihcIlVua25vd24gY3VycmVudCBmaWxlbmFtZVwiKTtcbn1cbiIsImltcG9ydCBmcyBmcm9tIFwibm9kZTpmc1wiO1xuaW1wb3J0IHBhdGggZnJvbSBcIm5vZGU6cGF0aFwiO1xuXG5pbXBvcnQgeyBmaWxlTGlzdCB9IGZyb20gXCJAL3V0aWxzL0ZpbGVTeXN0ZW1cIjtcbmltcG9ydCB7IExvZ2dlciB9IGZyb20gXCJAL2xvZ2dlclwiO1xuXG5jb25zdCBsb2dnZXIgPSBMb2dnZXIuY3JlYXRlKGltcG9ydC5tZXRhLnVybCk7XG5cbmV4cG9ydCBhc3luYyBmdW5jdGlvbiBtYWtlUGF0Y2goc3JjRGlyOiBzdHJpbmcsIGRlc3REaXI6IHN0cmluZykge1xuICBsb2dnZXIuaW5mbyhgTWFrZSBwYXRjaCAke3NyY0Rpcn0gdG8gJHtkZXN0RGlyfWApO1xuICBjb25zdCBsaXN0ID0gYXdhaXQgZmlsZUxpc3Qoc3JjRGlyLCB7IHJlbGF0aXZlOiBzcmNEaXIsIHJlY3Vyc2l2ZTogdHJ1ZSB9KTtcbiAgZm9yIChjb25zdCBpdGVyIG9mIGxpc3QpIHtcbiAgICBjb25zdCBzb3VyY2UgPSBwYXRoLnJlc29sdmUoc3JjRGlyLCBpdGVyKTtcbiAgICBjb25zdCBkZXN0aW5hdGlvbiA9IHBhdGgucmVzb2x2ZShkZXN0RGlyLCBpdGVyKTtcbiAgICBhd2FpdCBmcy5wcm9taXNlcy5jcChzb3VyY2UsIGRlc3RpbmF0aW9uLCB7IGZvcmNlOiB0cnVlIH0pO1xuICAgIGxvZ2dlci5pbmZvKGAgUmVwbGFjZWQgJHtpdGVyfWApO1xuICB9XG59XG4iLCIvKlxuICogTUlUIExpY2Vuc2VcbiAqXG4gKiBDb3B5cmlnaHQgKGMpIDIwMjUgIFl1cmlpIFlha3ViaW4gKHl1cmlpLnlha3ViaW5AZ21haWwuY29tKVxuICpcbiAqIFBlcm1pc3Npb24gaXMgZ3JhbnRlZCB0byB1c2UsIGNvcHksIG1vZGlmeSwgYW5kIGRpc3RyaWJ1dGUgdGhpcyBzb2Z0d2FyZVxuICogdW5kZXIgdGhlIE1JVCBMaWNlbnNlLiBTZWUgTElDRU5TRSBmaWxlIGZvciBkZXRhaWxzLlxuICovXG5cbmV4cG9ydCB7IGlzRW50cnlQb2ludCB9IGZyb20gXCIuL0ltcG9ydE1vZHVsZS5tanNcIjtcbmV4cG9ydCB7IGltcG9ydE1vZHVsZSB9IGZyb20gXCIuL0ltcG9ydE1vZHVsZS5tanNcIjtcbmV4cG9ydCB7IGN1cnJlbnRTY3JpcHRVUkwgfSBmcm9tIFwiLi9JbXBvcnRNb2R1bGUubWpzXCI7XG5cbmV4cG9ydCBjb25zdCByZXF1aXJlU3luYyA9IGV2YWwoXCJyZXF1aXJlXCIpIGFzIE5vZGVKUy5SZXF1aXJlO1xuXG5leHBvcnQgZnVuY3Rpb24gcmVxdWlyZVJlc29sdmUobmFtZTogc3RyaW5nKSB7XG4gIGlmICh0eXBlb2YgaW1wb3J0Lm1ldGEucmVzb2x2ZSA9PT0gJ2Z1bmN0aW9uJylcbiAgICByZXR1cm4gaW1wb3J0Lm1ldGEucmVzb2x2ZShuYW1lKTtcbiAgaWYgKHR5cGVvZiByZXF1aXJlU3luYyAhPT0gJ3VuZGVmaW5lZCcpXG4gICAgcmV0dXJuIHJlcXVpcmVTeW5jLnJlc29sdmUobmFtZSk7XG4gIHRocm93IG5ldyBFcnJvcihcIk5vIGNvbXBhdGlibGUgbW9kdWxlIHJlc29sdmVyIGZvdW5kXCIpO1xufVxuIiwiLypcbiAqIE1JVCBMaWNlbnNlXG4gKlxuICogQ29weXJpZ2h0IChjKSAyMDI1ICBZdXJpaSBZYWt1YmluICh5dXJpaS55YWt1YmluQGdtYWlsLmNvbSlcbiAqXG4gKiBQZXJtaXNzaW9uIGlzIGdyYW50ZWQgdG8gdXNlLCBjb3B5LCBtb2RpZnksIGFuZCBkaXN0cmlidXRlIHRoaXMgc29mdHdhcmVcbiAqIHVuZGVyIHRoZSBNSVQgTGljZW5zZS4gU2VlIExJQ0VOU0UgZmlsZSBmb3IgZGV0YWlscy5cbiAqL1xuXG5pbXBvcnQgb3MgZnJvbSBcIm5vZGU6b3NcIjtcbmltcG9ydCBub2RlcGF0aCBmcm9tIFwibm9kZTpwYXRoXCI7XG5cbmxldCBuYXRpdmVTZXAgPSAgbm9kZXBhdGgucG9zaXguc2VwO1xubGV0IG90aGVyU2VwID0gbm9kZXBhdGgud2luMzIuc2VwO1xuXG5pZiAob3MucGxhdGZvcm0oKSA9PT0gXCJ3aW4zMlwiKSB7XG4gIFsgbmF0aXZlU2VwLCBvdGhlclNlcCBdID0gWyBvdGhlclNlcCwgbmF0aXZlU2VwIF07XG59XG5cbmV4cG9ydCBuYW1lc3BhY2UgUGF0aCB7XG5cbmV4cG9ydCBjb25zdCBzZXAgPSBub2RlcGF0aC5wb3NpeC5zZXA7XG5leHBvcnQgY29uc3QgZGVsaW1pdGVyID0gbm9kZXBhdGguZGVsaW1pdGVyO1xuXG5leHBvcnQgZnVuY3Rpb24gbmF0aXZlUGF0aChwYXRoOiBzdHJpbmcpOiBzdHJpbmcge1xuICByZXR1cm4gcGF0aC5yZXBsYWNlQWxsKG90aGVyU2VwLCBuYXRpdmVTZXApO1xufVxuXG5leHBvcnQgZnVuY3Rpb24gcmVwcmVzZW50UGF0aChwYXRoOiBzdHJpbmcpOiBzdHJpbmcge1xuICByZXR1cm4gcGF0aC5yZXBsYWNlQWxsKG5vZGVwYXRoLndpbjMyLnNlcCwgbm9kZXBhdGgucG9zaXguc2VwKTtcbn1cblxuZXhwb3J0IGZ1bmN0aW9uIGlzQWJzb2x1dGUocGF0aDogc3RyaW5nKTogYm9vbGVhbiB7XG4gIHJldHVybiBub2RlcGF0aC5pc0Fic29sdXRlKG5hdGl2ZVBhdGgocGF0aCkpO1xufVxuXG5leHBvcnQgZnVuY3Rpb24gam9pbiguLi5wYXRoczogc3RyaW5nW10pOiBzdHJpbmcge1xuICByZXR1cm4gcmVwcmVzZW50UGF0aChub2RlcGF0aC5qb2luKC4uLnBhdGhzLm1hcChpID0+IG5hdGl2ZVBhdGgoaSkpKSk7XG59XG5cbmV4cG9ydCBmdW5jdGlvbiByZXNvbHZlKC4uLnBhdGhzOiBzdHJpbmdbXSk6IHN0cmluZyB7XG4gIHJldHVybiByZXByZXNlbnRQYXRoKG5vZGVwYXRoLnJlc29sdmUoLi4ucGF0aHMubWFwKGkgPT4gbmF0aXZlUGF0aChpKSkpKTtcbn1cblxuZXhwb3J0IGZ1bmN0aW9uIGRpcm5hbWUocGF0aDogc3RyaW5nKTogc3RyaW5nIHtcbiAgcmV0dXJuIHJlcHJlc2VudFBhdGgobm9kZXBhdGguZGlybmFtZShuYXRpdmVQYXRoKHBhdGgpKSk7XG59XG5cbmV4cG9ydCBmdW5jdGlvbiBiYXNlbmFtZShwYXRoOiBzdHJpbmcsIHN1ZmZpeD86IHN0cmluZyk6IHN0cmluZyB7XG4gIHJldHVybiByZXByZXNlbnRQYXRoKG5vZGVwYXRoLmJhc2VuYW1lKG5hdGl2ZVBhdGgocGF0aCksIHN1ZmZpeCkpO1xufVxuXG5leHBvcnQgZnVuY3Rpb24gcmVsYXRpdmUoZnJvbTogc3RyaW5nLCB0bzogc3RyaW5nKTogc3RyaW5nIHtcbiAgcmV0dXJuIHJlcHJlc2VudFBhdGgobm9kZXBhdGgucmVsYXRpdmUobmF0aXZlUGF0aChmcm9tKSwgbmF0aXZlUGF0aCh0bykpKTtcbn1cblxufSAvLyBuYW1lc3BhY2UgUGF0aFxuIiwiLypcbiAqIE1JVCBMaWNlbnNlXG4gKlxuICogQ29weXJpZ2h0IChjKSAyMDI1ICBZdXJpaSBZYWt1YmluICh5dXJpaS55YWt1YmluQGdtYWlsLmNvbSlcbiAqXG4gKiBQZXJtaXNzaW9uIGlzIGdyYW50ZWQgdG8gdXNlLCBjb3B5LCBtb2RpZnksIGFuZCBkaXN0cmlidXRlIHRoaXMgc29mdHdhcmVcbiAqIHVuZGVyIHRoZSBNSVQgTGljZW5zZS4gU2VlIExJQ0VOU0UgZmlsZSBmb3IgZGV0YWlscy5cbiAqL1xuXG5leHBvcnQgZnVuY3Rpb24gZXF1YWxWYWx1ZShhOiBhbnksIGI6IGFueSk6IGJvb2xlYW4ge1xuICBpZiAoYSA9PT0gYilcbiAgICByZXR1cm4gdHJ1ZTtcblxuICBpZiAoYSA9PT0gdW5kZWZpbmVkIHx8IGIgPT09IHVuZGVmaW5lZClcbiAgICByZXR1cm4gZmFsc2U7XG5cbiAgaWYgKHR5cGVvZiBhICE9PSBcIm9iamVjdFwiIHx8IHR5cGVvZiBiICE9PSBcIm9iamVjdFwiKVxuICAgIHJldHVybiBmYWxzZTtcblxuICBjb25zdCBrMSA9IE9iamVjdC5rZXlzKGEpO1xuICBjb25zdCBrMiA9IE9iamVjdC5rZXlzKGIpO1xuXG4gIGlmIChrMS5sZW5ndGggIT0gazIubGVuZ3RoKVxuICAgIHJldHVybiBmYWxzZTtcblxuICBmb3IgKGNvbnN0IGtleSBvZiBrMSkge1xuICAgIGlmICghT2JqZWN0Lmhhc093bihiLCBrZXkpIHx8ICFlcXVhbFZhbHVlKGFba2V5XSwgYltrZXldKSlcbiAgICAgIHJldHVybiBmYWxzZTtcbiAgfVxuXG4gIHJldHVybiB0cnVlO1xufVxuXG5leHBvcnQgZnVuY3Rpb24gZGVlcENvcHkobzogYW55KTogYW55IHtcbiAgaWYgKCFvIHx8IHR5cGVvZiBvICE9PSBcIm9iamVjdFwiKVxuICAgIHJldHVybiBvO1xuICBpZiAoQXJyYXkuaXNBcnJheShvKSkge1xuICAgIGNvbnN0IHJlc3VsdCA9IFtdO1xuICAgIGZvciAoY29uc3QgaXRlciBvZiBvKVxuICAgICAgcmVzdWx0LnB1c2goZGVlcENvcHkoaXRlcikpO1xuICAgIHJldHVybiByZXN1bHQ7XG4gIH1cbiAgZWxzZSB7XG4gICAgY29uc3QgcmVzdWx0ID0ge30gYXMgYW55O1xuICAgIGZvciAoY29uc3QgW2tleSx2YWxdIG9mIE9iamVjdC5lbnRyaWVzKG8pKVxuICAgICAgcmVzdWx0W2tleV0gPSBkZWVwQ29weSh2YWwpO1xuICAgIHJldHVybiByZXN1bHQ7XG4gIH1cbn1cblxuZXhwb3J0IGZ1bmN0aW9uIGFzc2lnbk9iamVjdCh0YXJnZXQ6IGFueSwgc291cmNlOiBhbnkpIHtcbiAgaWYgKEFycmF5LmlzQXJyYXkodGFyZ2V0KSAmJiBBcnJheS5pc0FycmF5KHNvdXJjZSkpIHtcbiAgICBmb3IgKGNvbnN0IGl0ZXIgb2Ygc291cmNlKVxuICAgICAgdGFyZ2V0LnB1c2goaXRlcik7XG4gIH1cbiAgZWxzZSB7XG4gICAgZm9yIChjb25zdCBrZXkgb2YgT2JqZWN0LmtleXMoc291cmNlKSkge1xuICAgICAgY29uc3QgYSA9IHRhcmdldFtrZXldLCBiID0gc291cmNlW2tleV07XG4gICAgICBpZiAoYSAmJiB0eXBlb2YgYSA9PT0gXCJvYmplY3RcIiAmJiBiICYmIHR5cGVvZiBiID09PSBcIm9iamVjdFwiKVxuICAgICAgICBhc3NpZ25PYmplY3QoYSwgYik7XG4gICAgICBlbHNlXG4gICAgICAgIHRhcmdldFtrZXldID0gZGVlcENvcHkoYik7XG4gICAgfVxuICB9XG59XG5cbmV4cG9ydCBmdW5jdGlvbiBhcnJheVdyYXBwZXIodmFsdWU6IGFueSkge1xuICBpZiAodmFsdWUgPT09IHVuZGVmaW5lZCB8fCBBcnJheS5pc0FycmF5KHZhbHVlKSlcbiAgICByZXR1cm4gdmFsdWU7XG4gIHJldHVybiBbIHZhbHVlIF07XG59XG4iLCIvKlxuICogTUlUIExpY2Vuc2VcbiAqXG4gKiBDb3B5cmlnaHQgKGMpIDIwMjUgIFl1cmlpIFlha3ViaW4gKHl1cmlpLnlha3ViaW5AZ21haWwuY29tKVxuICpcbiAqIFBlcm1pc3Npb24gaXMgZ3JhbnRlZCB0byB1c2UsIGNvcHksIG1vZGlmeSwgYW5kIGRpc3RyaWJ1dGUgdGhpcyBzb2Z0d2FyZVxuICogdW5kZXIgdGhlIE1JVCBMaWNlbnNlLiBTZWUgTElDRU5TRSBmaWxlIGZvciBkZXRhaWxzLlxuICovXG5cbmltcG9ydCBmcyBmcm9tIFwibm9kZTpmc1wiO1xuXG5leHBvcnQgY2xhc3MgU2V0dGluZ3NTdG9yYWdlIHtcbiAgcHJpdmF0ZSBfZmlsZW5hbWU6IHN0cmluZztcbiAgcHJpdmF0ZSBfc2V0dGluZ3M6IGFueTtcbiAgcHJpdmF0ZSBfY3VycmVudDogYW55O1xuXG4gIGNvbnN0cnVjdG9yKGZpbGVuYW1lOiBzdHJpbmcpIHtcbiAgICB0aGlzLl9maWxlbmFtZSA9IGZpbGVuYW1lO1xuICB9XG5cbiAgcHVibGljIGFzeW5jIHB1c2gobmFtZTogc3RyaW5nKSB7XG4gICAgaWYgKCF0aGlzLl9zZXR0aW5ncylcbiAgICAgIGF3YWl0IHRoaXMubG9hZCgpO1xuICAgIGxldCBvYmplY3QgPSB0aGlzLl9jdXJyZW50Lm9iamVjdFtuYW1lXTtcbiAgICBpZiAoIW9iamVjdClcbiAgICAgIG9iamVjdCA9IHRoaXMuX2N1cnJlbnQub2JqZWN0W25hbWVdID0ge307XG4gICAgdGhpcy5fY3VycmVudCA9IHsgcGFyZW50OiB0aGlzLl9jdXJyZW50LCBvYmplY3QgfTtcbiAgfVxuXG4gIHB1YmxpYyBhc3luYyBwb3AoKSB7XG4gICAgaWYgKCF0aGlzLl9zZXR0aW5ncylcbiAgICAgIGF3YWl0IHRoaXMubG9hZCgpO1xuICAgIGNvbnNvbGUuYXNzZXJ0KHRoaXMuX2N1cnJlbnQucGFyZW50KTtcbiAgICB0aGlzLl9jdXJyZW50ID0gdGhpcy5fY3VycmVudC5wYXJlbnQ7XG4gIH1cblxuICBwdWJsaWMgYXN5bmMgZ2V0KG5hbWU6IHN0cmluZykge1xuICAgIGlmICghdGhpcy5fc2V0dGluZ3MpXG4gICAgICBhd2FpdCB0aGlzLmxvYWQoKTtcbiAgICByZXR1cm4gdGhpcy5fY3VycmVudC5vYmplY3RbbmFtZV07XG4gIH1cblxuICBwdWJsaWMgYXN5bmMgc2V0KG5hbWU6IHN0cmluZywgdmFsdWU6IGFueSkge1xuICAgIGlmICghdGhpcy5fc2V0dGluZ3MpXG4gICAgICBhd2FpdCB0aGlzLmxvYWQoKTtcbiAgICB0aGlzLl9jdXJyZW50Lm9iamVjdFtuYW1lXSA9IHZhbHVlO1xuICAgIGF3YWl0IHRoaXMuc2F2ZSgpO1xuICB9XG5cbiAgcHVibGljIGFzeW5jIGxvYWQoKSB7XG4gICAgdHJ5IHtcbiAgICAgIGNvbnN0IGNvbnRlbnQgPSBhd2FpdCBmcy5wcm9taXNlcy5yZWFkRmlsZSh0aGlzLl9maWxlbmFtZSwgXCJ1dGYtOFwiKTtcbiAgICAgIHRoaXMuX3NldHRpbmdzID0gSlNPTi5wYXJzZShjb250ZW50KTtcbiAgICB9XG4gICAgY2F0Y2ggKGUpIHtcbiAgICAgIHRoaXMuX3NldHRpbmdzID0ge307XG4gICAgfVxuICAgIHRoaXMuX2N1cnJlbnQgPVxuICAgIHtcbiAgICAgIHBhcmVudDogbnVsbCxcbiAgICAgIG9iamVjdDogdGhpcy5fc2V0dGluZ3MsXG4gICAgfTtcbiAgfVxuXG4gIHB1YmxpYyBhc3luYyBzYXZlKCkge1xuICAgIGNvbnN0IHNwYWNlID0gMjtcbiAgICBjb25zdCBjb250ZW50ID0gSlNPTi5zdHJpbmdpZnkodGhpcy5fc2V0dGluZ3MsIHVuZGVmaW5lZCwgc3BhY2UpO1xuICAgIGF3YWl0IGZzLnByb21pc2VzLndyaXRlRmlsZSh0aGlzLl9maWxlbmFtZSwgY29udGVudCwgeyBlbmNvZGluZzogXCJ1dGYtOFwiLCBmbGFnOiBcIndcIiwgZmx1c2g6IHRydWUgfSk7XG4gIH1cbn07XG4iLCIvKlxuICogTUlUIExpY2Vuc2VcbiAqXG4gKiBDb3B5cmlnaHQgKGMpIDIwMjUgIFl1cmlpIFlha3ViaW4gKHl1cmlpLnlha3ViaW5AZ21haWwuY29tKVxuICpcbiAqIFBlcm1pc3Npb24gaXMgZ3JhbnRlZCB0byB1c2UsIGNvcHksIG1vZGlmeSwgYW5kIGRpc3RyaWJ1dGUgdGhpcyBzb2Z0d2FyZVxuICogdW5kZXIgdGhlIE1JVCBMaWNlbnNlLiBTZWUgTElDRU5TRSBmaWxlIGZvciBkZXRhaWxzLlxuICovXG5cbmV4cG9ydCBmdW5jdGlvbiBlbnN1cmVCb29sZWFuKHZhbHVlOiBhbnkpIHtcbiAgaWYgKHR5cGVvZiB2YWx1ZSA9PT0gXCJib29sZWFuXCIpXG4gICAgcmV0dXJuIHZhbHVlO1xuICB0aHJvdyBuZXcgVHlwZUVycm9yKGBUaGUgJyR7dmFsdWV9JyBpcyBub3QgYSBib29sZWFuYCk7XG59XG5cbmV4cG9ydCBmdW5jdGlvbiBlbnN1cmVOdW1iZXIodmFsdWU6IGFueSkge1xuICBpZiAodHlwZW9mIHZhbHVlID09PSBcIm51bWJlclwiKVxuICAgIHJldHVybiB2YWx1ZTtcbiAgdGhyb3cgbmV3IFR5cGVFcnJvcihgVGhlICcke3ZhbHVlfScgaXMgbm90IGEgbnVtYmVyYCk7XG59XG5cbmV4cG9ydCBmdW5jdGlvbiBlbnN1cmVTdHJpbmcodmFsdWU6IGFueSkge1xuICBpZiAodHlwZW9mIHZhbHVlID09PSBcInN0cmluZ1wiKVxuICAgIHJldHVybiB2YWx1ZTtcbiAgdGhyb3cgbmV3IFR5cGVFcnJvcihgVGhlICcke3ZhbHVlfScgaXMgbm90IGEgc3RyaW5nYCk7XG59XG5cbmV4cG9ydCBmdW5jdGlvbiBlbnN1cmVBcnJheSh2YWx1ZTogYW55KSB7XG4gIGlmIChBcnJheS5pc0FycmF5KHZhbHVlKSlcbiAgICByZXR1cm4gQXJyYXkuZnJvbSh2YWx1ZSk7XG4gIHRocm93IG5ldyBUeXBlRXJyb3IoYFRoZSAnJHt2YWx1ZX0nIGlzIG5vdCBhIGFycmF5YCk7XG59XG4iLCIvKlxuICogTUlUIExpY2Vuc2VcbiAqXG4gKiBDb3B5cmlnaHQgKGMpIDIwMjUgIFl1cmlpIFlha3ViaW4gKHl1cmlpLnlha3ViaW5AZ21haWwuY29tKVxuICpcbiAqIFBlcm1pc3Npb24gaXMgZ3JhbnRlZCB0byB1c2UsIGNvcHksIG1vZGlmeSwgYW5kIGRpc3RyaWJ1dGUgdGhpcyBzb2Z0d2FyZVxuICogdW5kZXIgdGhlIE1JVCBMaWNlbnNlLiBTZWUgTElDRU5TRSBmaWxlIGZvciBkZXRhaWxzLlxuICovXG5cbmV4cG9ydCBjb25zdCBGSUxFX1NDSEVNRSA9IFwiZmlsZTovL1wiO1xuZXhwb3J0IGNvbnN0IElNUE9SVF9TQ0hFTUUgPSBcImltcG9ydDovL1wiO1xuZXhwb3J0IGNvbnN0IEhUVFBfU0NIRU1FID0gXCJodHRwOi8vXCI7XG5leHBvcnQgY29uc3QgSFRUUFNfU0NIRU1FID0gXCJodHRwczovL1wiO1xuIiwibW9kdWxlLmV4cG9ydHMgPSByZXF1aXJlKFwiaHR0cFwiKTsiLCJtb2R1bGUuZXhwb3J0cyA9IHJlcXVpcmUoXCJodHRwc1wiKTsiLCJtb2R1bGUuZXhwb3J0cyA9IHJlcXVpcmUoXCJub2RlOmNoaWxkX3Byb2Nlc3NcIik7IiwibW9kdWxlLmV4cG9ydHMgPSByZXF1aXJlKFwibm9kZTpmc1wiKTsiLCJtb2R1bGUuZXhwb3J0cyA9IHJlcXVpcmUoXCJub2RlOm9zXCIpOyIsIm1vZHVsZS5leHBvcnRzID0gcmVxdWlyZShcIm5vZGU6cGF0aFwiKTsiLCJtb2R1bGUuZXhwb3J0cyA9IHJlcXVpcmUoXCJub2RlOnVybFwiKTsiLCJtb2R1bGUuZXhwb3J0cyA9IHJlcXVpcmUoXCJub2RlOndvcmtlcl90aHJlYWRzXCIpOyIsIi8vIFRoZSBtb2R1bGUgY2FjaGVcbnZhciBfX3dlYnBhY2tfbW9kdWxlX2NhY2hlX18gPSB7fTtcblxuLy8gVGhlIHJlcXVpcmUgZnVuY3Rpb25cbmZ1bmN0aW9uIF9fd2VicGFja19yZXF1aXJlX18obW9kdWxlSWQpIHtcblx0Ly8gQ2hlY2sgaWYgbW9kdWxlIGlzIGluIGNhY2hlXG5cdHZhciBjYWNoZWRNb2R1bGUgPSBfX3dlYnBhY2tfbW9kdWxlX2NhY2hlX19bbW9kdWxlSWRdO1xuXHRpZiAoY2FjaGVkTW9kdWxlICE9PSB1bmRlZmluZWQpIHtcblx0XHRyZXR1cm4gY2FjaGVkTW9kdWxlLmV4cG9ydHM7XG5cdH1cblx0Ly8gQ3JlYXRlIGEgbmV3IG1vZHVsZSAoYW5kIHB1dCBpdCBpbnRvIHRoZSBjYWNoZSlcblx0dmFyIG1vZHVsZSA9IF9fd2VicGFja19tb2R1bGVfY2FjaGVfX1ttb2R1bGVJZF0gPSB7XG5cdFx0Ly8gbm8gbW9kdWxlLmlkIG5lZWRlZFxuXHRcdC8vIG5vIG1vZHVsZS5sb2FkZWQgbmVlZGVkXG5cdFx0ZXhwb3J0czoge31cblx0fTtcblxuXHQvLyBFeGVjdXRlIHRoZSBtb2R1bGUgZnVuY3Rpb25cblx0X193ZWJwYWNrX21vZHVsZXNfX1ttb2R1bGVJZF0obW9kdWxlLCBtb2R1bGUuZXhwb3J0cywgX193ZWJwYWNrX3JlcXVpcmVfXyk7XG5cblx0Ly8gUmV0dXJuIHRoZSBleHBvcnRzIG9mIHRoZSBtb2R1bGVcblx0cmV0dXJuIG1vZHVsZS5leHBvcnRzO1xufVxuXG4iLCIvLyBnZXREZWZhdWx0RXhwb3J0IGZ1bmN0aW9uIGZvciBjb21wYXRpYmlsaXR5IHdpdGggbm9uLWhhcm1vbnkgbW9kdWxlc1xuX193ZWJwYWNrX3JlcXVpcmVfXy5uID0gKG1vZHVsZSkgPT4ge1xuXHR2YXIgZ2V0dGVyID0gbW9kdWxlICYmIG1vZHVsZS5fX2VzTW9kdWxlID9cblx0XHQoKSA9PiAobW9kdWxlWydkZWZhdWx0J10pIDpcblx0XHQoKSA9PiAobW9kdWxlKTtcblx0X193ZWJwYWNrX3JlcXVpcmVfXy5kKGdldHRlciwgeyBhOiBnZXR0ZXIgfSk7XG5cdHJldHVybiBnZXR0ZXI7XG59OyIsIi8vIGRlZmluZSBnZXR0ZXIgZnVuY3Rpb25zIGZvciBoYXJtb255IGV4cG9ydHNcbl9fd2VicGFja19yZXF1aXJlX18uZCA9IChleHBvcnRzLCBkZWZpbml0aW9uKSA9PiB7XG5cdGZvcih2YXIga2V5IGluIGRlZmluaXRpb24pIHtcblx0XHRpZihfX3dlYnBhY2tfcmVxdWlyZV9fLm8oZGVmaW5pdGlvbiwga2V5KSAmJiAhX193ZWJwYWNrX3JlcXVpcmVfXy5vKGV4cG9ydHMsIGtleSkpIHtcblx0XHRcdE9iamVjdC5kZWZpbmVQcm9wZXJ0eShleHBvcnRzLCBrZXksIHsgZW51bWVyYWJsZTogdHJ1ZSwgZ2V0OiBkZWZpbml0aW9uW2tleV0gfSk7XG5cdFx0fVxuXHR9XG59OyIsIl9fd2VicGFja19yZXF1aXJlX18ubyA9IChvYmosIHByb3ApID0+IChPYmplY3QucHJvdG90eXBlLmhhc093blByb3BlcnR5LmNhbGwob2JqLCBwcm9wKSkiLCIvLyBkZWZpbmUgX19lc01vZHVsZSBvbiBleHBvcnRzXG5fX3dlYnBhY2tfcmVxdWlyZV9fLnIgPSAoZXhwb3J0cykgPT4ge1xuXHRpZih0eXBlb2YgU3ltYm9sICE9PSAndW5kZWZpbmVkJyAmJiBTeW1ib2wudG9TdHJpbmdUYWcpIHtcblx0XHRPYmplY3QuZGVmaW5lUHJvcGVydHkoZXhwb3J0cywgU3ltYm9sLnRvU3RyaW5nVGFnLCB7IHZhbHVlOiAnTW9kdWxlJyB9KTtcblx0fVxuXHRPYmplY3QuZGVmaW5lUHJvcGVydHkoZXhwb3J0cywgJ19fZXNNb2R1bGUnLCB7IHZhbHVlOiB0cnVlIH0pO1xufTsiLCIvKlxuICogTUlUIExpY2Vuc2VcbiAqXG4gKiBDb3B5cmlnaHQgKGMpIDIwMjUgIFl1cmlpIFlha3ViaW4gKHl1cmlpLnlha3ViaW5AZ21haWwuY29tKVxuICpcbiAqIFBlcm1pc3Npb24gaXMgZ3JhbnRlZCB0byB1c2UsIGNvcHksIG1vZGlmeSwgYW5kIGRpc3RyaWJ1dGUgdGhpcyBzb2Z0d2FyZVxuICogdW5kZXIgdGhlIE1JVCBMaWNlbnNlLiBTZWUgTElDRU5TRSBmaWxlIGZvciBkZXRhaWxzLlxuICovXG5cbi8vLyA8cmVmZXJlbmNlIHBhdGg9XCJnbG9iYWwuZC50c1wiIC8+XG5cbmltcG9ydCB7IGlzRW50cnlQb2ludCB9IGZyb20gXCJAL3V0aWxzL01vZHVsZVwiO1xuaW1wb3J0ICogYXMgY3h4IGZyb20gXCJAL2N4eFwiO1xuaW1wb3J0IHsgQ01ha2VQcm9jZXNzLCBDVGVzdFByb2Nlc3MsIFNjcmlwdE1vZGVPcHRpb25zLCBnZXRQcm9qZWN0SW5mbyB9IGZyb20gXCJAL2NtYWtlXCI7XG5cbmltcG9ydCB7IHNwYXduQXN5bmMgfSBmcm9tIFwiQC91dGlscy9DaGlsZFByb2Nlc3NcIjtcbmltcG9ydCB7IHJlcXVlc3RHZXQsIGRvd25sb2FkRmlsZSB9IGZyb20gXCJAL3V0aWxzL0h0dHBSZXF1ZXN0XCI7XG5pbXBvcnQgeyBQYXRoIH0gZnJvbSBcIkAvdXRpbHMvUGF0aFwiO1xuaW1wb3J0IHsgcnVuU2NyaXB0IH0gZnJvbSBcIkAvUnVuU2NyaXB0XCI7XG5cbmV4cG9ydCBkZWZhdWx0IHtcbiAgY3h4LFxuICBjbWFrZToge1xuICAgIHNjcmlwdE1vZGU6IChzY3JpcHRGaWxlOiBzdHJpbmcsIHZhcmlhYmxlczogb2JqZWN0LCBvcHRpb25zPzogU2NyaXB0TW9kZU9wdGlvbnMpID0+IENNYWtlUHJvY2Vzcy5nZXRJbnN0YW5jZSgpLnNjcmlwdE1vZGUoc2NyaXB0RmlsZSwgdmFyaWFibGVzLCBvcHRpb25zKSxcbiAgICBjb25maWd1cmU6IChhcmdzOiBhbnkpID0+IENNYWtlUHJvY2Vzcy5nZXRJbnN0YW5jZSgpLmNvbmZpZ3VyZShhcmdzKSxcbiAgICBidWlsZDogKGFyZ3M6IGFueSkgPT4gQ01ha2VQcm9jZXNzLmdldEluc3RhbmNlKCkuYnVpbGQoYXJncyksXG4gICAgaW5zdGFsbDogKGFyZ3M6IGFueSkgPT4gQ01ha2VQcm9jZXNzLmdldEluc3RhbmNlKCkuaW5zdGFsbChhcmdzKSxcbiAgICBleHRyYWN0OiAoYXJnczogYW55KSA9PiBDTWFrZVByb2Nlc3MuZ2V0SW5zdGFuY2UoKS5leHRyYWN0KGFyZ3MpLFxuICAgIGN0ZXN0OiAoYXJnczogYW55KSA9PiBDVGVzdFByb2Nlc3MuZ2V0SW5zdGFuY2UoKS5jdGVzdChhcmdzKSxcbiAgICBnZXRQcm9qZWN0SW5mbyxcbiAgfSxcbiAgcHJvY2Vzczoge1xuICAgIHNwYXduOiBzcGF3bkFzeW5jLFxuICB9LFxuICB1dGlsczoge1xuICAgIHJlcXVlc3RHZXQsXG4gICAgZG93bmxvYWRGaWxlLFxuICB9LFxuICBwYXRoOiBQYXRoLFxufTtcblxuaWYgKGlzRW50cnlQb2ludCgpKSB7XG4gIHJ1blNjcmlwdCgpO1xufVxuIl0sIm5hbWVzIjpbXSwic291cmNlUm9vdCI6IiJ9