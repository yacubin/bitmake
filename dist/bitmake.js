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

/***/ "./src/app/RunScript.ts":
/*!******************************!*\
  !*** ./src/app/RunScript.ts ***!
  \******************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   runMainScript: () => (/* binding */ runMainScript),
/* harmony export */   runScript: () => (/* binding */ runScript),
/* harmony export */   runWorkerScript: () => (/* binding */ runWorkerScript)
/* harmony export */ });
/* harmony import */ var _utils_Module__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! @/utils/Module */ "./src/utils/Module.ts");
/* harmony import */ var node_worker_threads__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! node:worker_threads */ "node:worker_threads");
/* harmony import */ var node_worker_threads__WEBPACK_IMPORTED_MODULE_1___default = /*#__PURE__*/__webpack_require__.n(node_worker_threads__WEBPACK_IMPORTED_MODULE_1__);
/* harmony import */ var _utils_Args__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! @/utils/Args */ "./src/utils/Args.ts");
/* harmony import */ var _commands__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! @/commands */ "./src/commands/index.ts");
/* harmony import */ var _logger__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! @/logger */ "./src/logger/index.ts");
/* harmony import */ var _app_RunScriptInit__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(/*! @/app/RunScriptInit */ "./src/app/RunScriptInit.ts");
/* harmony import */ var _server_MessagePortSender__WEBPACK_IMPORTED_MODULE_6__ = __webpack_require__(/*! @/server/MessagePortSender */ "./src/server/MessagePortSender.ts");
/* harmony import */ var _server_WorkerService__WEBPACK_IMPORTED_MODULE_7__ = __webpack_require__(/*! @/server/WorkerService */ "./src/server/WorkerService.ts");
/*
 * MIT License
 *
 * Copyright (c) 2025  Yurii Yakubin (yurii.yakubin@gmail.com)
 *
 * Permission is granted to use, copy, modify, and distribute this software
 * under the MIT License. See LICENSE file for details.
 */








const logger = _logger__WEBPACK_IMPORTED_MODULE_4__.Logger.create("file:///mnt/c/opt/work/source/darkit-sdk/external/bitmake/src/app/RunScript.ts");
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
    options.env = _utils_Args__WEBPACK_IMPORTED_MODULE_2__.Args.toObject(process.argv.slice(argsIndex));
    const handler = _commands__WEBPACK_IMPORTED_MODULE_3__["default"][options.handler];
    if (!handler)
        throw Error(`The ${"bitmake"} does not support the ${options.handler} command`);
    const res = handler(options);
    if (res instanceof Promise) {
        await res;
    }
}
async function runWorkerScript() {
    logger.debug(`Worker thread #${node_worker_threads__WEBPACK_IMPORTED_MODULE_1__.threadId} started`, node_worker_threads__WEBPACK_IMPORTED_MODULE_1__.workerData);
    if (!node_worker_threads__WEBPACK_IMPORTED_MODULE_1__.parentPort) {
        throw new Error(`Worker not supported parentPort`);
    }
    const sender = new _server_MessagePortSender__WEBPACK_IMPORTED_MODULE_6__.MessagePortSender(node_worker_threads__WEBPACK_IMPORTED_MODULE_1__.parentPort);
    const looper = new _server_WorkerService__WEBPACK_IMPORTED_MODULE_7__.WorkerService("w" + node_worker_threads__WEBPACK_IMPORTED_MODULE_1__.threadId, sender);
    node_worker_threads__WEBPACK_IMPORTED_MODULE_1__.parentPort.on("message", (message) => looper.emitMessage(sender, message));
}
function runScript() {
    if (!(0,_utils_Module__WEBPACK_IMPORTED_MODULE_0__.isEntryPoint)())
        return;
    (0,_app_RunScriptInit__WEBPACK_IMPORTED_MODULE_5__.runScriptInit)();
    if (!node_worker_threads__WEBPACK_IMPORTED_MODULE_1__.isMainThread) {
        runWorkerScript();
        return;
    }
    runMainScript().then(() => process.exit(0)).catch((e) => {
        if (e instanceof Error)
            logger.fatal(e.stack);
        else
            logger.fatal(e);
        process.exit(1);
    });
}


/***/ }),

/***/ "./src/app/RunScriptInit.ts":
/*!**********************************!*\
  !*** ./src/app/RunScriptInit.ts ***!
  \**********************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   runScriptInit: () => (/* binding */ runScriptInit)
/* harmony export */ });
/* harmony import */ var _core_CustomScript__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! @/core/CustomScript */ "./src/core/CustomScript.ts");
/* harmony import */ var _core_FileInstallationTask__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! @/core/FileInstallationTask */ "./src/core/FileInstallationTask.ts");
/* harmony import */ var _core_SpawnSyncTask__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! @/core/SpawnSyncTask */ "./src/core/SpawnSyncTask.ts");
/* harmony import */ var _core_TargetFile__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! @/core/TargetFile */ "./src/core/TargetFile.ts");
/* harmony import */ var _core_InstallEntity__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! @/core/InstallEntity */ "./src/core/InstallEntity.ts");
/* harmony import */ var _core_TargetIncludes__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(/*! @/core/TargetIncludes */ "./src/core/TargetIncludes.ts");
/* harmony import */ var _core_TargetObjects__WEBPACK_IMPORTED_MODULE_6__ = __webpack_require__(/*! @/core/TargetObjects */ "./src/core/TargetObjects.ts");
/* harmony import */ var _core_TargetName__WEBPACK_IMPORTED_MODULE_7__ = __webpack_require__(/*! @/core/TargetName */ "./src/core/TargetName.ts");
/* harmony import */ var _core_SourceFile__WEBPACK_IMPORTED_MODULE_8__ = __webpack_require__(/*! @/core/SourceFile */ "./src/core/SourceFile.ts");
/* harmony import */ var _core_AbsolutePath__WEBPACK_IMPORTED_MODULE_9__ = __webpack_require__(/*! @/core/AbsolutePath */ "./src/core/AbsolutePath.ts");
/* harmony import */ var _core_Target__WEBPACK_IMPORTED_MODULE_10__ = __webpack_require__(/*! @/core/Target */ "./src/core/Target.ts");
/* harmony import */ var _core_SimpleObject__WEBPACK_IMPORTED_MODULE_11__ = __webpack_require__(/*! @/core/SimpleObject */ "./src/core/SimpleObject.ts");
/*
 * MIT License
 *
 * Copyright (c) 2025  Yurii Yakubin (yurii.yakubin@gmail.com)
 *
 * Permission is granted to use, copy, modify, and distribute this software
 * under the MIT License. See LICENSE file for details.
 */












function runScriptInit() {
    _core_SimpleObject__WEBPACK_IMPORTED_MODULE_11__.SimpleObject.registerParser(_core_CustomScript__WEBPACK_IMPORTED_MODULE_0__.PostCustomScript.name, _core_CustomScript__WEBPACK_IMPORTED_MODULE_0__.PostCustomScript.fromJSON);
    _core_SimpleObject__WEBPACK_IMPORTED_MODULE_11__.SimpleObject.registerParser(_core_CustomScript__WEBPACK_IMPORTED_MODULE_0__.CustomScript.name, _core_CustomScript__WEBPACK_IMPORTED_MODULE_0__.CustomScript.fromJSON);
    _core_SimpleObject__WEBPACK_IMPORTED_MODULE_11__.SimpleObject.registerParser(_core_FileInstallationTask__WEBPACK_IMPORTED_MODULE_1__.FileInstallationTask.name, _core_FileInstallationTask__WEBPACK_IMPORTED_MODULE_1__.FileInstallationTask.fromJSON);
    _core_SimpleObject__WEBPACK_IMPORTED_MODULE_11__.SimpleObject.registerParser(_core_SpawnSyncTask__WEBPACK_IMPORTED_MODULE_2__.SpawnSyncTask.name, _core_SpawnSyncTask__WEBPACK_IMPORTED_MODULE_2__.SpawnSyncTask.fromJSON);
    _core_SimpleObject__WEBPACK_IMPORTED_MODULE_11__.SimpleObject.registerParser(_core_TargetFile__WEBPACK_IMPORTED_MODULE_3__.TargetFile.name, _core_TargetFile__WEBPACK_IMPORTED_MODULE_3__.TargetFile.fromJSON);
    _core_SimpleObject__WEBPACK_IMPORTED_MODULE_11__.SimpleObject.registerParser(_core_InstallEntity__WEBPACK_IMPORTED_MODULE_4__.InstallEntity.name, _core_InstallEntity__WEBPACK_IMPORTED_MODULE_4__.InstallEntity.fromJSON);
    _core_SimpleObject__WEBPACK_IMPORTED_MODULE_11__.SimpleObject.registerParser(_core_TargetIncludes__WEBPACK_IMPORTED_MODULE_5__.TargetIncludes.name, _core_TargetIncludes__WEBPACK_IMPORTED_MODULE_5__.TargetIncludes.fromJSON);
    _core_SimpleObject__WEBPACK_IMPORTED_MODULE_11__.SimpleObject.registerParser(_core_TargetObjects__WEBPACK_IMPORTED_MODULE_6__.TargetObjects.name, _core_TargetObjects__WEBPACK_IMPORTED_MODULE_6__.TargetObjects.fromJSON);
    _core_SimpleObject__WEBPACK_IMPORTED_MODULE_11__.SimpleObject.registerParser(_core_TargetName__WEBPACK_IMPORTED_MODULE_7__.TargetName.name, _core_TargetName__WEBPACK_IMPORTED_MODULE_7__.TargetName.fromJSON);
    _core_SimpleObject__WEBPACK_IMPORTED_MODULE_11__.SimpleObject.registerParser(_core_SourceFile__WEBPACK_IMPORTED_MODULE_8__.SourceFile.name, _core_SourceFile__WEBPACK_IMPORTED_MODULE_8__.SourceFile.fromJSON);
    _core_SimpleObject__WEBPACK_IMPORTED_MODULE_11__.SimpleObject.registerParser(_core_AbsolutePath__WEBPACK_IMPORTED_MODULE_9__.DirPath.name, _core_AbsolutePath__WEBPACK_IMPORTED_MODULE_9__.DirPath.fromJSON);
    _core_SimpleObject__WEBPACK_IMPORTED_MODULE_11__.SimpleObject.registerParser(_core_AbsolutePath__WEBPACK_IMPORTED_MODULE_9__.FilePath.name, _core_AbsolutePath__WEBPACK_IMPORTED_MODULE_9__.FilePath.fromJSON);
    _core_SimpleObject__WEBPACK_IMPORTED_MODULE_11__.SimpleObject.registerParser(_core_Target__WEBPACK_IMPORTED_MODULE_10__.PostTarget.name, _core_Target__WEBPACK_IMPORTED_MODULE_10__.PostTarget.fromJSON);
    _core_SimpleObject__WEBPACK_IMPORTED_MODULE_11__.SimpleObject.registerParser(_core_Target__WEBPACK_IMPORTED_MODULE_10__.ObjectLibrary.name, _core_Target__WEBPACK_IMPORTED_MODULE_10__.ObjectLibrary.fromJSON);
    _core_SimpleObject__WEBPACK_IMPORTED_MODULE_11__.SimpleObject.registerParser(_core_Target__WEBPACK_IMPORTED_MODULE_10__.StaticLibrary.name, _core_Target__WEBPACK_IMPORTED_MODULE_10__.StaticLibrary.fromJSON);
    _core_SimpleObject__WEBPACK_IMPORTED_MODULE_11__.SimpleObject.registerParser(_core_Target__WEBPACK_IMPORTED_MODULE_10__.SharedLibrary.name, _core_Target__WEBPACK_IMPORTED_MODULE_10__.SharedLibrary.fromJSON);
    _core_SimpleObject__WEBPACK_IMPORTED_MODULE_11__.SimpleObject.registerParser(_core_Target__WEBPACK_IMPORTED_MODULE_10__.Executable.name, _core_Target__WEBPACK_IMPORTED_MODULE_10__.Executable.fromJSON);
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
/* harmony export */   AbsolutePath: () => (/* binding */ AbsolutePath),
/* harmony export */   DirPath: () => (/* binding */ DirPath),
/* harmony export */   FilePath: () => (/* binding */ FilePath)
/* harmony export */ });
/* harmony import */ var node_path__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! node:path */ "node:path");
/* harmony import */ var node_path__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(node_path__WEBPACK_IMPORTED_MODULE_0__);
/* harmony import */ var node_url__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! node:url */ "node:url");
/* harmony import */ var node_url__WEBPACK_IMPORTED_MODULE_1___default = /*#__PURE__*/__webpack_require__.n(node_url__WEBPACK_IMPORTED_MODULE_1__);
/* harmony import */ var _utils_Path__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! @/utils/Path */ "./src/utils/Path.ts");
/* harmony import */ var _utils_UrlScheme__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! @/utils/UrlScheme */ "./src/utils/UrlScheme.ts");
/*
 * MIT License
 *
 * Copyright (c) 2025  Yurii Yakubin (yurii.yakubin@gmail.com)
 *
 * Permission is granted to use, copy, modify, and distribute this software
 * under the MIT License. See LICENSE file for details.
 */




const PATH = Symbol("PATH");
function toPathString(pth) {
    if (typeof pth !== "string")
        return pth.toPath();
    if (pth.startsWith(_utils_UrlScheme__WEBPACK_IMPORTED_MODULE_3__.FILE_SCHEME))
        return node_url__WEBPACK_IMPORTED_MODULE_1___default().fileURLToPath(pth);
    return pth;
}
class AbsolutePath {
    [PATH];
    constructor(filepath) {
        if (filepath.startsWith(_utils_UrlScheme__WEBPACK_IMPORTED_MODULE_3__.FILE_SCHEME)) {
            this[PATH] = filepath;
        }
        else if (_utils_Path__WEBPACK_IMPORTED_MODULE_2__.Path.isAbsolute(filepath)) {
            this[PATH] = node_url__WEBPACK_IMPORTED_MODULE_1___default().pathToFileURL(filepath).toString();
        }
        else {
            throw new Error(`Not supported relative path of "${filepath}"`);
        }
    }
    join(...paths) {
        const filepath = _utils_Path__WEBPACK_IMPORTED_MODULE_2__.Path.join(this.toPath(), ...paths.map(i => toPathString(i)));
        return AbsolutePath.create(filepath);
    }
    dirname() {
        return AbsolutePath.create(node_path__WEBPACK_IMPORTED_MODULE_0___default().posix.dirname(this[PATH]));
    }
    basename() {
        return node_path__WEBPACK_IMPORTED_MODULE_0___default().posix.basename(this[PATH]);
    }
    relative(to) {
        return _utils_Path__WEBPACK_IMPORTED_MODULE_2__.Path.relative(this.toPath(), toPathString(to));
    }
    resolve(...paths) {
        return AbsolutePath.create(_utils_Path__WEBPACK_IMPORTED_MODULE_2__.Path.resolve(this.toPath(), ...paths.map(i => toPathString(i))));
    }
    match(regexp) {
        return this[PATH].match(regexp);
    }
    toString() {
        return node_url__WEBPACK_IMPORTED_MODULE_1___default().fileURLToPath(this[PATH]);
    }
    toPath() {
        if (this[PATH].startsWith(_utils_UrlScheme__WEBPACK_IMPORTED_MODULE_3__.FILE_SCHEME))
            return node_url__WEBPACK_IMPORTED_MODULE_1___default().fileURLToPath(this[PATH]);
        throw new Error(`URL ${this[PATH]} can't convert to path`);
    }
    valueOf() {
        return node_url__WEBPACK_IMPORTED_MODULE_1___default().fileURLToPath(this[PATH]);
    }
    toURLString() {
        return this[PATH];
    }
    toJSON() {
        return this[PATH];
    }
    static isAbsolute(filepath) {
        if (filepath instanceof AbsolutePath)
            return true;
        if (filepath.startsWith(_utils_UrlScheme__WEBPACK_IMPORTED_MODULE_3__.FILE_SCHEME))
            return true;
        return _utils_Path__WEBPACK_IMPORTED_MODULE_2__.Path.isAbsolute(filepath);
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
class DirPath extends AbsolutePath {
    constructor(dirname) {
        super(dirname);
    }
    static create(dirname) {
        if (typeof dirname !== "string")
            dirname = dirname.toURLString();
        return new DirPath(dirname);
    }
    static fromJSON(object) {
        return new DirPath(object.url);
    }
    toJSON() {
        return {
            type: DirPath.name,
            url: this.toURLString(),
        };
    }
}
;
class FilePath extends AbsolutePath {
    constructor(filepath) {
        super(filepath);
    }
    static create(filepath) {
        if (typeof filepath !== "string")
            filepath = filepath.toURLString();
        return new FilePath(filepath);
    }
    static fromJSON(object) {
        return new FilePath(object.url);
    }
    toJSON() {
        return {
            type: FilePath.name,
            url: this.toURLString(),
        };
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
/* harmony import */ var _core_AbsolutePath__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! @/core/AbsolutePath */ "./src/core/AbsolutePath.ts");
/* harmony import */ var _utils_Module__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! @/utils/Module */ "./src/utils/Module.ts");
/* harmony import */ var _core_Target__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! @/core/Target */ "./src/core/Target.ts");
/* harmony import */ var _core_CustomScript__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(/*! @/core/CustomScript */ "./src/core/CustomScript.ts");
/* harmony import */ var _core_InstallEntity__WEBPACK_IMPORTED_MODULE_6__ = __webpack_require__(/*! @/core/InstallEntity */ "./src/core/InstallEntity.ts");
/* harmony import */ var _logger__WEBPACK_IMPORTED_MODULE_7__ = __webpack_require__(/*! @/logger */ "./src/logger/index.ts");
/*
 * MIT License
 *
 * Copyright (c) 2025  Yurii Yakubin (yurii.yakubin@gmail.com)
 *
 * Permission is granted to use, copy, modify, and distribute this software
 * under the MIT License. See LICENSE file for details.
 */








const logger = _logger__WEBPACK_IMPORTED_MODULE_7__.Logger.create("file:///mnt/c/opt/work/source/darkit-sdk/external/bitmake/src/core/BaseContext.ts");
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
class MakeContext /*extends GeneralContext*/ {
    _targets = new Map;
    _postTargets = new Map;
    _mainScripts = new Map;
    _postScripts = new Map;
    _installList = new Array();
    constructor(scope) {
        //super(scope);
    }
    get targets() {
        return this._targets;
    }
    get postTargets() {
        return this._postTargets;
    }
    get mainScripts() {
        return this._mainScripts;
    }
    get postScripts() {
        return this._postScripts;
    }
    get installList() {
        return this._installList;
    }
    getPostTarget(name) {
        let target = this._postTargets.get(name);
        if (!target) {
            target = _core_Target__WEBPACK_IMPORTED_MODULE_4__.PostTarget.create(name);
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
            script = _core_CustomScript__WEBPACK_IMPORTED_MODULE_5__.PostCustomScript.create(name);
            this._postScripts.set(name, script);
        }
        return script;
    }
    addCustomScript(options) {
        const target = _core_CustomScript__WEBPACK_IMPORTED_MODULE_5__.CustomScript.create(options);
        this._mainScripts.set(options.name, target);
        return target;
    }
    addInstallEntry(value, destination, baseDir) {
        const entity = new _core_InstallEntity__WEBPACK_IMPORTED_MODULE_6__.InstallEntity(value, destination, baseDir);
        this._installList.push(entity);
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
    const module = await (0,_utils_Module__WEBPACK_IMPORTED_MODULE_3__.importModule)(scriptUrl);
    if (!module.default)
        throw new Error(`Script ${scriptUrl} has not contain a default function`);
    const result = module.default(mk);
    if (result instanceof Promise)
        await result;
}
function createVariableMapForDirectory(variableMap, sourceDir, binaryDir) {
    if (binaryDir === undefined) {
        if (!_core_AbsolutePath__WEBPACK_IMPORTED_MODULE_2__.AbsolutePath.isAbsolute(sourceDir))
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
/* harmony export */   CustomScript: () => (/* binding */ CustomScript),
/* harmony export */   PostCustomScript: () => (/* binding */ PostCustomScript)
/* harmony export */ });
/* harmony import */ var _core_MakeInterfaces__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! @/core/MakeInterfaces */ "./src/core/MakeInterfaces.ts");
/* harmony import */ var _core_AbsolutePath__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! @/core/AbsolutePath */ "./src/core/AbsolutePath.ts");
/* harmony import */ var _core_Scope__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! @/core/Scope */ "./src/core/Scope.ts");
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
    get name() {
        return this._name;
    }
    get variables() {
        return this._variables;
    }
    mergeVariables(variables) {
        _core_Scope__WEBPACK_IMPORTED_MODULE_2__.ScopeHelper.mergeVariables(this._variables, variables);
    }
    static fromJSON(json) {
        return PostCustomScript.create(json.name, json.variables);
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
class CustomScript extends _core_MakeInterfaces__WEBPACK_IMPORTED_MODULE_0__.InterfaceScript {
    _name;
    _scriptModule;
    _input;
    _output;
    _sourceDir;
    _binaryDir;
    _variableMap;
    constructor(options) {
        super();
        this._variableMap = options.variableMap;
        this._name = options.name;
        this._input = options.input;
        this._scriptModule = options.scriptModule;
        this._output = options.output;
        this._sourceDir = options.sourceDir;
        this._binaryDir = options.binaryDir;
    }
    static create(options) {
        return Object.seal(new CustomScript(options));
    }
    mergeVariables(variables) {
        _core_Scope__WEBPACK_IMPORTED_MODULE_2__.ScopeHelper.mergeVariableMap(this._variableMap, variables);
    }
    get NAME() {
        return this._name;
    }
    get scriptModule() {
        return this._scriptModule;
    }
    get INPUT() {
        return this._input;
    }
    get OUTPUT() {
        return this._output;
    }
    get sourceDir() {
        return this._sourceDir;
    }
    get binaryDir() {
        return this._binaryDir;
    }
    get variableMap() {
        return this._variableMap;
    }
    postUpdate(script) {
        this.mergeVariables(script.variables);
    }
    static fromJSON(json) {
        const options = {
            variableMap: _core_Scope__WEBPACK_IMPORTED_MODULE_2__.ScopeHelper.fromJSON(json.variableMap),
            name: json.name,
            scriptModule: _core_AbsolutePath__WEBPACK_IMPORTED_MODULE_1__.AbsolutePath.isAbsolute(json.scriptModule) ? _core_AbsolutePath__WEBPACK_IMPORTED_MODULE_1__.AbsolutePath.create(json.scriptModule) : json.scriptModule,
            output: _core_AbsolutePath__WEBPACK_IMPORTED_MODULE_1__.AbsolutePath.create(json.output),
            sourceDir: _core_AbsolutePath__WEBPACK_IMPORTED_MODULE_1__.AbsolutePath.create(json.sourceDir),
            binaryDir: _core_AbsolutePath__WEBPACK_IMPORTED_MODULE_1__.AbsolutePath.create(json.binaryDir),
        };
        if (json.input) {
            options.input = _core_AbsolutePath__WEBPACK_IMPORTED_MODULE_1__.AbsolutePath.create(json.input);
        }
        return CustomScript.create(options);
    }
    toJSON() {
        const result = {
            type: CustomScript.name,
            name: this._name,
            scriptModule: this._scriptModule,
            output: this._output.toURLString(),
            sourceDir: this._sourceDir.toURLString(),
            binaryDir: this._binaryDir.toURLString(),
            variableMap: _core_Scope__WEBPACK_IMPORTED_MODULE_2__.ScopeHelper.toJSON(this._variableMap),
        };
        if (this._input) {
            result.input = this._input.toURLString();
        }
        return result;
    }
}
;
(function (CustomScript) {
    ;
})(CustomScript || (CustomScript = {})); // namespace CustomScript


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
/* harmony import */ var _logger__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! @/logger */ "./src/logger/index.ts");
/*
 * MIT License
 *
 * Copyright (c) 2025  Yurii Yakubin (yurii.yakubin@gmail.com)
 *
 * Permission is granted to use, copy, modify, and distribute this software
 * under the MIT License. See LICENSE file for details.
 */



const logger = _logger__WEBPACK_IMPORTED_MODULE_2__.Logger.create("file:///mnt/c/opt/work/source/darkit-sdk/external/bitmake/src/core/FileInstallationTask.ts");
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
/* harmony import */ var _core_AbsolutePath__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! @/core/AbsolutePath */ "./src/core/AbsolutePath.ts");
/* harmony import */ var _core_SimpleObject__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! @/core/SimpleObject */ "./src/core/SimpleObject.ts");
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
    static create(value, destination, baseDir) {
        return new InstallEntity(value, destination, baseDir);
    }
    get value() {
        return this._value;
    }
    get destination() {
        return this._destination;
    }
    get baseDir() {
        return this._baseDir;
    }
    static fromJSON(json) {
        const value = _core_SimpleObject__WEBPACK_IMPORTED_MODULE_1__.SimpleObject.fromJSON(json.value);
        const destination = _core_AbsolutePath__WEBPACK_IMPORTED_MODULE_0__.AbsolutePath.create(json.destination);
        const baseDir = json.baseDir ? _core_AbsolutePath__WEBPACK_IMPORTED_MODULE_0__.AbsolutePath.create(json.baseDir) : undefined;
        return new InstallEntity(value, destination, baseDir);
    }
    toJSON() {
        const result = {
            type: InstallEntity.name,
            value: this._value.toJSON(),
            destination: this._destination.toURLString(),
        };
        if (this._baseDir)
            result.baseDir = this._baseDir.toURLString();
        return result;
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
    executeScript(scope, script, params) {
        this._project.executeScriptSync(scope, script, params);
    }
    addCacheVariables(scope, params) {
        let variables = params;
        if (typeof params === "string") {
            const filename = _core_Scope__WEBPACK_IMPORTED_MODULE_2__.ScopeHelper.get(scope, "SOURCE_DIR").resolve(params).toString();
            if (!(0,_utils_FileSystem__WEBPACK_IMPORTED_MODULE_1__.fileExistsSync)(filename))
                return;
            variables = (0,_utils_Module__WEBPACK_IMPORTED_MODULE_3__.requireSync)(filename);
        }
        _core_Scope__WEBPACK_IMPORTED_MODULE_2__.ScopeHelper.defineVariablesInVariableMap(scope, _Constants__WEBPACK_IMPORTED_MODULE_4__.CUSTOM_VARIABLE_GROUP, variables);
    }
    addSubdirectory(scope, sourceDir, binaryDir) {
        this._project.addSubdirectory(scope, sourceDir, binaryDir);
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
/* harmony import */ var _core_GoalCollection__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(/*! @/core/GoalCollection */ "./src/core/GoalCollection.ts");
/* harmony import */ var _core_UserMakeContext__WEBPACK_IMPORTED_MODULE_6__ = __webpack_require__(/*! @/core/UserMakeContext */ "./src/core/UserMakeContext.ts");
/* harmony import */ var _core_LocalMakeContext__WEBPACK_IMPORTED_MODULE_7__ = __webpack_require__(/*! @/core/LocalMakeContext */ "./src/core/LocalMakeContext.ts");
/* harmony import */ var _utils_Module__WEBPACK_IMPORTED_MODULE_8__ = __webpack_require__(/*! @/utils/Module */ "./src/utils/Module.ts");
/* harmony import */ var _logger__WEBPACK_IMPORTED_MODULE_9__ = __webpack_require__(/*! @/logger */ "./src/logger/index.ts");
/* harmony import */ var _core_TargetName__WEBPACK_IMPORTED_MODULE_10__ = __webpack_require__(/*! @/core/TargetName */ "./src/core/TargetName.ts");
/* harmony import */ var _core_ScriptContext__WEBPACK_IMPORTED_MODULE_11__ = __webpack_require__(/*! @/core/ScriptContext */ "./src/core/ScriptContext.ts");
/* harmony import */ var _Scope__WEBPACK_IMPORTED_MODULE_12__ = __webpack_require__(/*! ./Scope */ "./src/core/Scope.ts");
/* harmony import */ var _core_TargetFile__WEBPACK_IMPORTED_MODULE_13__ = __webpack_require__(/*! @/core/TargetFile */ "./src/core/TargetFile.ts");
/* harmony import */ var _core_ExecScriptTask__WEBPACK_IMPORTED_MODULE_14__ = __webpack_require__(/*! @/core/ExecScriptTask */ "./src/core/ExecScriptTask.ts");
/* harmony import */ var _core_SpawnSyncTask__WEBPACK_IMPORTED_MODULE_15__ = __webpack_require__(/*! @/core/SpawnSyncTask */ "./src/core/SpawnSyncTask.ts");
/* harmony import */ var _core_FileInstallationTask__WEBPACK_IMPORTED_MODULE_16__ = __webpack_require__(/*! @/core/FileInstallationTask */ "./src/core/FileInstallationTask.ts");
/* harmony import */ var _core_BaseContext__WEBPACK_IMPORTED_MODULE_17__ = __webpack_require__(/*! @/core/BaseContext */ "./src/core/BaseContext.ts");
/* harmony import */ var _core_BuildinScripts__WEBPACK_IMPORTED_MODULE_18__ = __webpack_require__(/*! @/core/BuildinScripts */ "./src/core/BuildinScripts/index.ts");
/*
 * MIT License
 *
 * Copyright (c) 2025  Yurii Yakubin (yurii.yakubin@gmail.com)
 *
 * Permission is granted to use, copy, modify, and distribute this software
 * under the MIT License. See LICENSE file for details.
 */



















const logger = _logger__WEBPACK_IMPORTED_MODULE_9__.Logger.create("file:///mnt/c/opt/work/source/darkit-sdk/external/bitmake/src/core/ProjectContext.ts");
const TARGETS = Symbol("TARGETS");
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
    if (o instanceof _core_TargetFile__WEBPACK_IMPORTED_MODULE_13__.TargetFile) {
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
    _customScripts = new Map;
    [CACHE];
    _installList;
    _processedVariableMap;
    [BUILTIN_SCRIPTS];
    _subdirAlias;
    _subdirList;
    constructor() {
        this[TARGETS] = _core_TargetCollection__WEBPACK_IMPORTED_MODULE_4__.TargetCollection.create();
        this[CACHE] = {};
        this._installList = [];
        this._processedVariableMap = {};
        this._subdirAlias = {};
        this[BUILTIN_SCRIPTS] = _core_BuildinScripts__WEBPACK_IMPORTED_MODULE_18__["default"];
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
        const srcPath = _core_AbsolutePath__WEBPACK_IMPORTED_MODULE_2__.AbsolutePath.create(_Scope__WEBPACK_IMPORTED_MODULE_12__.ScopeHelper.get(variableMap, "SOURCE_DIR").resolve(src));
        const destPath = (dest === null) ? null : _core_AbsolutePath__WEBPACK_IMPORTED_MODULE_2__.AbsolutePath.create(_Scope__WEBPACK_IMPORTED_MODULE_12__.ScopeHelper.get(variableMap, "SOURCE_DIR").resolve(dest));
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
            const variables = (0,_utils_Module__WEBPACK_IMPORTED_MODULE_8__.requireSync)(filename.toString());
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
        const newVariableMap = _Scope__WEBPACK_IMPORTED_MODULE_12__.ScopeHelper.cloneVariableMap(variableMap);
        params && _Scope__WEBPACK_IMPORTED_MODULE_12__.ScopeHelper.extendVariableMapByValues(newVariableMap, "", params);
        const scriptPath = _Scope__WEBPACK_IMPORTED_MODULE_12__.ScopeHelper.get(newVariableMap, "SOURCE_DIR").resolve(script);
        const func = (0,_utils_Module__WEBPACK_IMPORTED_MODULE_8__.requireSync)(scriptPath.toString());
        const mk = _core_ScriptContext__WEBPACK_IMPORTED_MODULE_11__.ScriptContext.create(newVariableMap);
        func(mk);
    }
    writeCacheVariables(filename) {
        const json = JSON.stringify(this[CACHE], null, 2);
        node_fs__WEBPACK_IMPORTED_MODULE_0___default().writeFileSync(filename, json, "utf-8");
    }
    async prepearScriptFile(variableMap) {
        const originSourceDir = _Scope__WEBPACK_IMPORTED_MODULE_12__.ScopeHelper.get(variableMap, "SOURCE_DIR").toString();
        const resolveSourceDir = this.resolveSubdirectory(originSourceDir);
        if (!resolveSourceDir) {
            logger.info(`Source dir "${originSourceDir}" was disabled`);
            return false;
        }
        _Scope__WEBPACK_IMPORTED_MODULE_12__.ScopeHelper.set(variableMap, "SOURCE_DIR", resolveSourceDir);
        if (!_Scope__WEBPACK_IMPORTED_MODULE_12__.ScopeHelper.get(variableMap, "SCRIPT_FILE")) {
            let scriptFile;
            const fileList = [".js", ".mjs"].map(i => "MakeScript" + i);
            for (const filename of fileList) {
                const iter = _Scope__WEBPACK_IMPORTED_MODULE_12__.ScopeHelper.get(variableMap, "SOURCE_DIR").join(filename);
                if (await (0,_utils_FileSystem__WEBPACK_IMPORTED_MODULE_3__.fileExists)(iter.toString())) {
                    scriptFile = iter;
                    break;
                }
            }
            if (!scriptFile)
                throw new Error(`There are no files ${fileList.join(", ")} in "${_Scope__WEBPACK_IMPORTED_MODULE_12__.ScopeHelper.get(variableMap, "SOURCE_DIR")}"`);
            _Scope__WEBPACK_IMPORTED_MODULE_12__.ScopeHelper.set(variableMap, "SCRIPT_FILE", scriptFile);
            _Scope__WEBPACK_IMPORTED_MODULE_12__.ScopeHelper.set(variableMap, "SCRIPT_DIR", _Scope__WEBPACK_IMPORTED_MODULE_12__.ScopeHelper.get(variableMap, "SCRIPT_FILE").dirname());
        }
        this.registerVariableMap(_Scope__WEBPACK_IMPORTED_MODULE_12__.ScopeHelper.get(variableMap, "SCRIPT_FILE").toString(), variableMap);
        return true;
    }
    addSubdirectory(variableMap, sourceDir, binaryDir) {
        const newVariableMap = (0,_core_BaseContext__WEBPACK_IMPORTED_MODULE_17__.createVariableMapForDirectory)(variableMap, sourceDir, binaryDir);
        if (newVariableMap) {
            this._subdirList.push(newVariableMap);
        }
    }
    findScriptFunction(name) {
        return this[BUILTIN_SCRIPTS][name];
    }
    applyMainTargets(targets) {
        for (const iter of targets)
            this[TARGETS].set(iter.targetName, iter);
    }
    applyMainScripts(scripts) {
        for (const iter of scripts)
            this._customScripts.set(iter.NAME, iter);
    }
    applyInstallEntities(entries) {
        for (const iter of entries)
            this._installList.push(iter);
    }
    applPostTargets(targets) {
        for (const postTarget of targets) {
            const target = this[TARGETS].get(postTarget.name);
            if (!target)
                throw new Error(`There is no Target named ${name}`);
            target.postUpdate(postTarget);
        }
    }
    applPostScripts(scripts) {
        for (const postScript of scripts) {
            const script = this._customScripts.get(postScript.name);
            if (!script)
                throw new Error(`There is no CustomScript named ${name}`);
            script.postUpdate(postScript);
        }
    }
    async doSubdirectory() {
        const contextList = new Array();
        for (;;) {
            const variableMap = this._subdirList.shift();
            if (!variableMap)
                break;
            if (!await this.prepearScriptFile(variableMap))
                continue;
            const ctx = new _core_LocalMakeContext__WEBPACK_IMPORTED_MODULE_7__.LocalMakeContext(variableMap, this);
            contextList.push(ctx);
            const mk = _core_UserMakeContext__WEBPACK_IMPORTED_MODULE_6__.UserMakeContext.create(ctx, variableMap);
            const cwdSave = process.cwd();
            process.chdir(mk.SCRIPT_DIR.toString());
            await (0,_core_BaseContext__WEBPACK_IMPORTED_MODULE_17__.performContext)(mk);
            process.chdir(cwdSave);
        }
        for (const ctx of contextList) {
            this.applyMainTargets(Array.from(ctx.targets.values()));
            this.applyMainScripts(Array.from(ctx.mainScripts.values()));
            this.applyInstallEntities(ctx.installList);
        }
        for (const ctx of contextList) {
            this.applPostTargets(Array.from(ctx.postTargets.values()));
            this.applPostScripts(Array.from(ctx.postScripts.values()));
        }
    }
    createGoals(scope) {
        const goalList = new _core_GoalCollection__WEBPACK_IMPORTED_MODULE_5__.GoalCollection;
        for (const [name, script] of this._customScripts.entries()) {
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
            const ge = new _core_GoalCollection__WEBPACK_IMPORTED_MODULE_5__.GoalTarget(name);
            ge.message = msg;
            ge.output = script.OUTPUT;
            ge.addDependency(...depends);
            ge.addTask(new _core_ExecScriptTask__WEBPACK_IMPORTED_MODULE_14__.ExecScriptTask(script.variableMap, scriptObj));
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
                const ge = new _core_GoalCollection__WEBPACK_IMPORTED_MODULE_5__.GoalTarget;
                ge.message = msg;
                ge.output = output;
                ge.addDependency(...headers);
                ge.addDependency(s.FILE.toPath());
                ge.addTask(new _core_SpawnSyncTask__WEBPACK_IMPORTED_MODULE_15__.SpawnSyncTask(s.COMPILE_PATH.toString(), args, target.binaryDir.toPath()));
                goalList.addTarget(ge);
            }
            const generalGoal = new _core_GoalCollection__WEBPACK_IMPORTED_MODULE_5__.GoalTarget;
            for (const params of target.preBuildList) {
                const execStruct = resolveTargetCommand(this, params);
                generalGoal.addTask(new _core_SpawnSyncTask__WEBPACK_IMPORTED_MODULE_15__.SpawnSyncTask(execStruct.command, execStruct.args, target.binaryDir.toString()));
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
                    generalGoal.addTask(new _core_SpawnSyncTask__WEBPACK_IMPORTED_MODULE_15__.SpawnSyncTask(scope.LINKER, args, target.getFileDir().toString()));
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
                    generalGoal.addTask(new _core_SpawnSyncTask__WEBPACK_IMPORTED_MODULE_15__.SpawnSyncTask(scope.AR, args, target.getFileDir().toString()));
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
                    generalGoal.addTask(new _core_SpawnSyncTask__WEBPACK_IMPORTED_MODULE_15__.SpawnSyncTask(target.compilerPath, args, target.getFileDir().toString()));
                }
                else {
                    logger.info(`No objects for "${target.targetName}"`);
                }
            }
            for (const params of target.postBuildList) {
                const execStruct = resolveTargetCommand(this, params);
                generalGoal.addTask(new _core_SpawnSyncTask__WEBPACK_IMPORTED_MODULE_15__.SpawnSyncTask(execStruct.command, execStruct.args, target.binaryDir.toString()));
            }
            goalList.addTarget(generalGoal);
            const worker = new _core_GoalCollection__WEBPACK_IMPORTED_MODULE_5__.GoalTarget(name);
            worker.message = `Built target ${name}`;
            worker.addDependency(target.getFile().toPath());
            goalList.addTarget(worker);
        }
        if (this._installList.length) {
            const worker = new _core_GoalCollection__WEBPACK_IMPORTED_MODULE_5__.GoalTarget(_Constants__WEBPACK_IMPORTED_MODULE_1__.INSTALL_TARGET);
            const fileInstallationTask = new _core_FileInstallationTask__WEBPACK_IMPORTED_MODULE_16__.FileInstallationTask;
            for (const iter of this._installList) {
                let src, dest;
                if (iter.value instanceof _core_AbsolutePath__WEBPACK_IMPORTED_MODULE_2__.AbsolutePath) {
                    if (scope.PREVENT_INSTALL_FILES)
                        continue;
                    src = iter.value;
                    const rfile = iter.baseDir.relative(iter.value);
                    dest = iter.destination.join(rfile);
                }
                else if (iter.value instanceof _core_TargetName__WEBPACK_IMPORTED_MODULE_10__.TargetName) {
                    const targetName = iter.value.targetName;
                    const target = this[TARGETS].get(targetName);
                    src = target.getFile();
                    dest = iter.destination.join(target.getFileName());
                }
                else {
                    throw new Error(`Can not install ${iter.value}`);
                }
                if (scope.DESTDIR)
                    dest = scope.DESTDIR.join(dest);
                worker.addDependency(src.toPath());
                fileInstallationTask.add(src, dest);
            }
            worker.addTask(fileInstallationTask);
            goalList.addTarget(worker);
        }
        const ge = new _core_GoalCollection__WEBPACK_IMPORTED_MODULE_5__.GoalTarget(_Constants__WEBPACK_IMPORTED_MODULE_1__.ALL_TARGET);
        Object.keys(this[TARGETS].ENTRIES).forEach(i => void ge.addDependency(i));
        goalList.addTarget(ge);
        return goalList;
    }
    toJSON() {
        return {
            TARGETS: this.TARGETS,
            customScripts: this._customScripts,
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
    function registerParser(name, func) {
        if (!name && _creators.has(name))
            throw new Error(`Name "${name}" is wrong or registered`);
        _creators.set(name, func);
    }
    SimpleObject.registerParser = registerParser;
    function fromJSON(value) {
        if (value === undefined)
            throw new Error("Not support undefined value");
        if (value && typeof value === "object") {
            if (typeof value.type === "string") {
                const func = _creators.get(value.type);
                if (func)
                    return func(value);
                throw new Error(`Uknown object type: ${JSON.stringify(value)}`);
            }
            else if (Array.isArray(value)) {
                return value.map(i => fromJSON(i));
            }
        }
        return value;
    }
    SimpleObject.fromJSON = fromJSON;
    function toJSON(value) {
        if (value && typeof value === "object") {
            if (typeof value.toJSON === "function")
                return value.toJSON();
            else if (Array.isArray(value))
                return value.map(i => toJSON(i));
        }
        return value;
    }
    SimpleObject.toJSON = toJSON;
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
/* harmony import */ var _core_AbsolutePath__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! @/core/AbsolutePath */ "./src/core/AbsolutePath.ts");
/*
 * MIT License
 *
 * Copyright (c) 2025  Yurii Yakubin (yurii.yakubin@gmail.com)
 *
 * Permission is granted to use, copy, modify, and distribute this software
 * under the MIT License. See LICENSE file for details.
 */

class SourceFile {
    _filename;
    _baseDir;
    _headerOnly;
    _language;
    _definitions;
    _compilerPath;
    _compilerOptions;
    constructor(filename, baseDir, headerOnly, language, compilerPath, compilerOptions) {
        this._filename = filename;
        this._baseDir = baseDir;
        this._headerOnly = headerOnly;
        this._language = language;
        this._definitions = [];
        this._compilerPath = compilerPath;
        this._compilerOptions = [...compilerOptions];
    }
    static create(filename, baseDir, headerOnly, language, compilerPath, compilerOptions) {
        return new SourceFile(filename, baseDir, headerOnly, language, compilerPath, compilerOptions);
    }
    get LANGUAGE() {
        return this._language;
    }
    get HEADER_FILE_ONLY() {
        return this._headerOnly;
    }
    get DEFINES() {
        return this._definitions;
    }
    addDefinition(definition) {
        this._definitions.push(definition);
    }
    addCompileOption(option) {
        this._compilerOptions.push(option);
    }
    get COMPILE_PATH() {
        return this._compilerPath;
    }
    get COMPILE_FLAGS() {
        return this._compilerOptions;
    }
    get FILE() {
        return this._filename;
    }
    get FILE_DIR() {
        return this._filename.dirname();
    }
    get FILE_NAME() {
        return this._filename.basename();
    }
    static fromJSON(json) {
        const filename = _core_AbsolutePath__WEBPACK_IMPORTED_MODULE_0__.AbsolutePath.create(json.filename);
        const baseDir = _core_AbsolutePath__WEBPACK_IMPORTED_MODULE_0__.AbsolutePath.create(json.baseDir);
        const headerOnly = json.headerOnly || false;
        const language = json.language || "";
        const compilerPath = json.compilerPath || "";
        const compilerOptions = json.compilerOptions || [];
        const result = new SourceFile(filename, baseDir, headerOnly, language, compilerPath, compilerOptions);
        if (json.definitions)
            result._definitions = Array.from(json.definitions);
        return result;
    }
    toJSON() {
        const json = {
            type: SourceFile.name,
            filename: this._filename.toURLString(),
            baseDir: this._baseDir.toURLString(),
        };
        if (this._headerOnly)
            json.headerOnly = true;
        else {
            if (this._language)
                json.language = this._language;
            if (this._compilerPath)
                json.compilerPath = this._compilerPath;
            if (this._definitions.length)
                json.definitions = [...this._definitions];
            if (this._compilerOptions.length)
                json.compilerOptions = [...this._compilerOptions];
        }
        return json;
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
/* harmony import */ var _logger__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! @/logger */ "./src/logger/index.ts");
/*
 * MIT License
 *
 * Copyright (c) 2025  Yurii Yakubin (yurii.yakubin@gmail.com)
 *
 * Permission is granted to use, copy, modify, and distribute this software
 * under the MIT License. See LICENSE file for details.
 */



const logger = _logger__WEBPACK_IMPORTED_MODULE_2__.Logger.create("file:///mnt/c/opt/work/source/darkit-sdk/external/bitmake/src/core/SpawnSyncTask.ts");
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
/* harmony import */ var _core_TargetName__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! @/core/TargetName */ "./src/core/TargetName.ts");
/* harmony import */ var _core_TargetFile__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! @/core/TargetFile */ "./src/core/TargetFile.ts");
/* harmony import */ var _core_TargetIncludes__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! @/core/TargetIncludes */ "./src/core/TargetIncludes.ts");
/* harmony import */ var _core_TargetObjects__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! @/core/TargetObjects */ "./src/core/TargetObjects.ts");
/* harmony import */ var _core_AbsolutePath__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(/*! @/core/AbsolutePath */ "./src/core/AbsolutePath.ts");
/* harmony import */ var _SimpleObject__WEBPACK_IMPORTED_MODULE_6__ = __webpack_require__(/*! ./SimpleObject */ "./src/core/SimpleObject.ts");
/* harmony import */ var _logger__WEBPACK_IMPORTED_MODULE_7__ = __webpack_require__(/*! @/logger */ "./src/logger/index.ts");
/*
 * MIT License
 *
 * Copyright (c) 2025  Yurii Yakubin (yurii.yakubin@gmail.com)
 *
 * Permission is granted to use, copy, modify, and distribute this software
 * under the MIT License. See LICENSE file for details.
 */








const logger = _logger__WEBPACK_IMPORTED_MODULE_7__.Logger.create("file:///mnt/c/opt/work/source/darkit-sdk/external/bitmake/src/core/Target.ts");
;
;
class TargetElements {
    _list = new Array;
    add(value, isPublic) {
        this._list.push({ value, isPublic });
    }
    concat(other) {
        const result = new TargetElements;
        for (const iter of this._list)
            result._list.push(iter);
        for (const iter of other._list)
            result._list.push(iter);
        return result;
    }
    getAllValues() {
        return this._list.map(i => i.value);
    }
    getPublicValues() {
        return this._list.filter(i => i.isPublic).map(i => i.value);
    }
    static fromJSON(json) {
        const result = new TargetElements;
        for (const iter of json) {
            let isPublic = false;
            let value = iter.private;
            if (!value) {
                value = iter.public;
                isPublic = true;
            }
            value = _SimpleObject__WEBPACK_IMPORTED_MODULE_6__.SimpleObject.fromJSON(value);
            result._list.push({ value, isPublic });
        }
        return result;
    }
    toJSON() {
        const result = [];
        for (const iter of this._list) {
            const name = iter.isPublic ? "public" : "private";
            const value = _SimpleObject__WEBPACK_IMPORTED_MODULE_6__.SimpleObject.toJSON(iter.value);
            result.push({ [name]: value });
        }
        return result;
    }
}
;
class BaseTarget {
    _name;
    _includes = new TargetElements;
    _definitions = new TargetElements;
    _compileOptions = new TargetElements;
    _linkOptions = new TargetElements;
    _libraries = new TargetElements;
    _sources = new Array;
    _preBuildList = new Array;
    _postBuildList = new Array;
    _language = "";
    _compilerPath = "";
    _compilerFlags = new Array;
    constructor(name) {
        this._name = name;
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
        return this._includes.getAllValues();
    }
    getPublicIncludes() {
        return this._includes.getPublicValues();
    }
    addInclude(publicOnly, value) {
        this._includes.add(value, publicOnly);
    }
    getDefinitions() {
        return this._definitions.getAllValues();
    }
    getPublicDefinitions() {
        return this._definitions.getPublicValues();
    }
    addDefinition(publicOnly, value) {
        this._definitions.add(value, publicOnly);
    }
    getCompileOptions() {
        return this._compileOptions.getAllValues();
    }
    getPublicCompileOptions() {
        return this._compileOptions.getPublicValues();
    }
    addCompileOption(publicOnly, option) {
        this._compileOptions.add(option, publicOnly);
    }
    getLinkOptions() {
        return this._linkOptions.getAllValues();
    }
    getPublicLinkOptions() {
        return this._linkOptions.getPublicValues();
    }
    addLinkOptions(...options) {
        this.addLinkOptionsImpl(false, ...options);
    }
    addPublicLinkOptions(...options) {
        this.addLinkOptionsImpl(true, ...options);
    }
    addLinkOptionsImpl(publicOnly, ...options) {
        for (const value of options.flat())
            this._linkOptions.add(value, publicOnly);
    }
    getLibraries() {
        return this._libraries.getAllValues();
    }
    getPublicLibraries() {
        return this._libraries.getPublicValues();
    }
    addLibraries(...libraries) {
        this.addLibrariesImpl(false, ...libraries);
    }
    addPublicLibraries(...libraries) {
        this.addLibrariesImpl(true, ...libraries);
    }
    addLibrariesImpl(publicOnly, ...libraries) {
        for (const iter of libraries.flat())
            this._libraries.add(_core_TargetName__WEBPACK_IMPORTED_MODULE_1__.TargetName.create(iter.targetName), publicOnly);
    }
    getHeaders() {
        return this.getSourceFiles().filter(i => i.HEADER_FILE_ONLY);
    }
    getAllSources() {
        return this._sources;
    }
    getSourceFiles() {
        return this._sources.filter(i => i instanceof _core_SourceFile__WEBPACK_IMPORTED_MODULE_0__.SourceFile);
    }
    getTargetObjects() {
        return this._sources.filter(i => i instanceof _core_TargetObjects__WEBPACK_IMPORTED_MODULE_4__.TargetObjects);
    }
    addSource(source) {
        this._sources.push(source);
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
    postUpdate(target) {
        this._includes = this._includes.concat(target._includes);
        this._definitions = this._definitions.concat(target._definitions);
        this._compileOptions = this._compileOptions.concat(target._compileOptions);
        this._linkOptions = this._linkOptions.concat(target._linkOptions);
        this._libraries = this._libraries.concat(target._libraries);
        this._sources.push(...target._sources);
        this._preBuildList.push(...target._preBuildList);
        this._postBuildList.push(...target._postBuildList);
    }
    putFromJSON(json) {
        this._includes = TargetElements.fromJSON(json.includes);
        this._definitions = TargetElements.fromJSON(json.definitions);
        this._compileOptions = TargetElements.fromJSON(json.compileOptions);
        this._linkOptions = TargetElements.fromJSON(json.linkOptions);
        this._libraries = TargetElements.fromJSON(json.libraries);
        this._sources = _SimpleObject__WEBPACK_IMPORTED_MODULE_6__.SimpleObject.fromJSON(json.sources);
        this._preBuildList = _SimpleObject__WEBPACK_IMPORTED_MODULE_6__.SimpleObject.fromJSON(json.preBuildList);
        this._postBuildList = _SimpleObject__WEBPACK_IMPORTED_MODULE_6__.SimpleObject.fromJSON(json.postBuildList);
        this._language = _SimpleObject__WEBPACK_IMPORTED_MODULE_6__.SimpleObject.fromJSON(json.language);
        this._compilerPath = _SimpleObject__WEBPACK_IMPORTED_MODULE_6__.SimpleObject.fromJSON(json.compilerPath);
        this._compilerFlags = _SimpleObject__WEBPACK_IMPORTED_MODULE_6__.SimpleObject.fromJSON(json.compilerFlags);
    }
    copyToJSON(json) {
        json.name = this._name;
        json.includes = this._includes.toJSON();
        json.definitions = this._definitions.toJSON();
        json.compileOptions = this._compileOptions.toJSON();
        json.linkOptions = this._linkOptions.toJSON();
        json.libraries = this._libraries.toJSON();
        json.sources = _SimpleObject__WEBPACK_IMPORTED_MODULE_6__.SimpleObject.toJSON(this._sources);
        json.preBuildList = _SimpleObject__WEBPACK_IMPORTED_MODULE_6__.SimpleObject.toJSON(this._preBuildList);
        json.postBuildList = _SimpleObject__WEBPACK_IMPORTED_MODULE_6__.SimpleObject.toJSON(this._postBuildList);
        json.language = this._language;
        json.compilerPath = this._compilerPath;
        json.compilerFlags = this._compilerFlags;
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
    static fromJSON(json) {
        const target = new PostTarget(json.name);
        target.putFromJSON(json);
        if (json.prefix !== undefined)
            target._prefix = json.prefix;
        if (json.outputName !== undefined)
            target._outputName = json.outputName;
        if (json.suffix !== undefined)
            target._suffix = json.suffix;
        if (json.positionIndependentCode !== undefined)
            target._positionIndependentCode = json.positionIndependentCode;
        return target;
    }
    toJSON() {
        const result = {
            type: PostTarget.name
        };
        super.copyToJSON(result);
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
    _sourceDir;
    _binaryDir;
    _prefix = "";
    _suffix = "";
    _outputName;
    _positionIndependentCode = false;
    constructor(name, sourceDir, binaryDir) {
        super(name);
        this._sourceDir = sourceDir;
        this._binaryDir = binaryDir;
        this._outputName = name;
    }
    get isObjectLibrary() {
        return false;
    }
    get isStaticLibrary() {
        return false;
    }
    get isSharedLibrary() {
        return false;
    }
    get isExecutable() {
        return false;
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
        super.postUpdate(target);
        if (target.prefix !== undefined)
            this._prefix = target.prefix;
        if (target.suffix !== undefined)
            this._suffix = target.suffix;
        if (target.outputName !== undefined)
            this._outputName = target.outputName;
        if (target.positionIndependentCode !== undefined)
            this._positionIndependentCode = target.positionIndependentCode;
    }
    putFromJSON(json) {
        super.putFromJSON(json);
        this._prefix = json.prefix;
        this._outputName = json.outputName;
        this._suffix = json.suffix;
        this._positionIndependentCode = json.positionIndependentCode;
    }
    copyToJSON(json) {
        super.copyToJSON(json);
        json.sourceDir = this._sourceDir.toURLString();
        json.binaryDir = this._binaryDir.toURLString();
        json.prefix = this._prefix;
        json.suffix = this._suffix;
        json.outputName = this._outputName;
        json.positionIndependentCode = this._positionIndependentCode;
        return json;
    }
}
;
class ObjectLibrary extends MainTarget {
    constructor(name, sourceDir, binaryDir) {
        super(name, sourceDir, binaryDir);
    }
    get isObjectLibrary() {
        return true;
    }
    static fromJSON(json) {
        const target = new ObjectLibrary(json.name, _core_AbsolutePath__WEBPACK_IMPORTED_MODULE_5__.AbsolutePath.create(json.sourceDir), _core_AbsolutePath__WEBPACK_IMPORTED_MODULE_5__.AbsolutePath.create(json.binaryDir));
        target.putFromJSON(json);
        return target;
    }
    toJSON() {
        const result = {
            type: ObjectLibrary.name,
        };
        super.copyToJSON(result);
        return result;
    }
}
;
class StaticLibrary extends MainTarget {
    constructor(name, sourceDir, binaryDir) {
        super(name, sourceDir, binaryDir);
    }
    get isStaticLibrary() {
        return true;
    }
    static fromJSON(json) {
        const target = new StaticLibrary(json.name, _core_AbsolutePath__WEBPACK_IMPORTED_MODULE_5__.AbsolutePath.create(json.sourceDir), _core_AbsolutePath__WEBPACK_IMPORTED_MODULE_5__.AbsolutePath.create(json.binaryDir));
        target.putFromJSON(json);
        return target;
    }
    toJSON() {
        const result = {
            type: StaticLibrary.name,
        };
        super.copyToJSON(result);
        return result;
    }
}
;
class SharedLibrary extends MainTarget {
    constructor(name, sourceDir, binaryDir) {
        super(name, sourceDir, binaryDir);
    }
    get isSharedLibrary() {
        return true;
    }
    static fromJSON(json) {
        const target = new SharedLibrary(json.name, _core_AbsolutePath__WEBPACK_IMPORTED_MODULE_5__.AbsolutePath.create(json.sourceDir), _core_AbsolutePath__WEBPACK_IMPORTED_MODULE_5__.AbsolutePath.create(json.binaryDir));
        target.putFromJSON(json);
        return target;
    }
    toJSON() {
        const result = {
            type: SharedLibrary.name,
        };
        super.copyToJSON(result);
        return result;
    }
}
;
class Executable extends MainTarget {
    constructor(name, sourceDir, binaryDir) {
        super(name, sourceDir, binaryDir);
    }
    get isExecutable() {
        return true;
    }
    static fromJSON(json) {
        const target = new Executable(json.name, _core_AbsolutePath__WEBPACK_IMPORTED_MODULE_5__.AbsolutePath.create(json.sourceDir), _core_AbsolutePath__WEBPACK_IMPORTED_MODULE_5__.AbsolutePath.create(json.binaryDir));
        target.putFromJSON(json);
        return target;
    }
    toJSON() {
        const result = {
            type: Executable.name,
        };
        super.copyToJSON(result);
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
/* harmony import */ var _AbsolutePath__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./AbsolutePath */ "./src/core/AbsolutePath.ts");
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
            else if (iter && typeof iter === "object") {
                for (const [key, val] of Object.entries(iter))
                    result.push(`${key}=${convertValueToDefinition(val)}`);
            }
            else
                throw new Error(`Defenition ${iter} not supported`);
        }
        return result;
    }
    TargetHelper.normalizeDefinitions = normalizeDefinitions;
    function normalizeCompileOptions(options) {
        const result = new Array;
        for (const iter of options) {
            if (typeof iter === "string")
                result.push(iter);
            else if (Array.isArray(iter) && iter.length == 2 && typeof iter[0] === "string") {
                if (typeof iter[1] === "string")
                    result.push([iter[0], iter[1]]);
                else if (iter[1] instanceof _AbsolutePath__WEBPACK_IMPORTED_MODULE_1__.AbsolutePath)
                    result.push([iter[0], iter[1].toPath()]);
                else
                    throw new Error(`CompileOption ${iter} not supported`);
            }
            else {
                throw new Error(`CompileOption ${iter} not supported`);
            }
        }
        return result;
    }
    TargetHelper.normalizeCompileOptions = normalizeCompileOptions;
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
/* harmony import */ var _core_MakeInterfaces__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! @/core/MakeInterfaces */ "./src/core/MakeInterfaces.ts");
/* harmony import */ var _core_Scope__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! @/core/Scope */ "./src/core/Scope.ts");
/* harmony import */ var _core_BaseContext__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! @/core/BaseContext */ "./src/core/BaseContext.ts");
/* harmony import */ var _core_Target__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! @/core/Target */ "./src/core/Target.ts");
/* harmony import */ var _core_UserTargetStruct__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! @/core/UserTargetStruct */ "./src/core/UserTargetStruct.ts");
/* harmony import */ var _Constants__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(/*! @/Constants */ "./src/Constants.ts");
/* harmony import */ var _utils_Random__WEBPACK_IMPORTED_MODULE_6__ = __webpack_require__(/*! @/utils/Random */ "./src/utils/Random.ts");
/* harmony import */ var _logger__WEBPACK_IMPORTED_MODULE_7__ = __webpack_require__(/*! @/logger */ "./src/logger/index.ts");
/* harmony import */ var _AbsolutePath__WEBPACK_IMPORTED_MODULE_8__ = __webpack_require__(/*! ./AbsolutePath */ "./src/core/AbsolutePath.ts");
/* harmony import */ var _core_TargetName__WEBPACK_IMPORTED_MODULE_9__ = __webpack_require__(/*! @/core/TargetName */ "./src/core/TargetName.ts");
/*
 * MIT License
 *
 * Copyright (c) 2025  Yurii Yakubin (yurii.yakubin@gmail.com)
 *
 * Permission is granted to use, copy, modify, and distribute this software
 * under the MIT License. See LICENSE file for details.
 */











const logger = _logger__WEBPACK_IMPORTED_MODULE_7__.Logger.create("file:///mnt/c/opt/work/source/darkit-sdk/external/bitmake/src/core/UserMakeContext.ts");
const SCOPE = Symbol("SCOPE");
const IMPL = Symbol("IMPL");
const VARMAP = Symbol("VARMAP");
function createTargetImpl(TargetCtor, ctx, scope, name) {
    if (typeof name !== "string")
        throw new Error(`Target "${name}" is not string type`);
    if (!name)
        throw new Error(`A target with an empty name cannot exist`);
    if (ctx.hasMainTarget(name))
        throw new Error(`Target "${name}" exists`);
    if ([_Constants__WEBPACK_IMPORTED_MODULE_5__.ALL_TARGET, _Constants__WEBPACK_IMPORTED_MODULE_5__.INSTALL_TARGET].includes(name))
        throw new Error(`Target "${name}" is reserved name`);
    const target = new TargetCtor(name, scope.SOURCE_DIR, scope.BINARY_DIR);
    ctx.addMainTarget(name, target);
    return target;
}
class UserMakeContext extends _core_BaseContext__WEBPACK_IMPORTED_MODULE_2__.GeneralContext {
    [IMPL];
    [VARMAP];
    [SCOPE];
    constructor(impl, variableMap) {
        super(variableMap);
        this[IMPL] = impl;
        this[VARMAP] = variableMap;
        this[SCOPE] = _core_Scope__WEBPACK_IMPORTED_MODULE_1__.ScopeHelper.createProxy(variableMap);
    }
    static create(impl, variableMap) {
        return (0,_core_BaseContext__WEBPACK_IMPORTED_MODULE_2__.createContext)(new UserMakeContext(impl, variableMap));
    }
    getCacheVariables() {
        return _core_Scope__WEBPACK_IMPORTED_MODULE_1__.ScopeHelper.getVariablesByGroup(this[VARMAP], _Constants__WEBPACK_IMPORTED_MODULE_5__.CUSTOM_VARIABLE_GROUP);
    }
    addCacheVariables(params) {
        this[IMPL].addCacheVariables(this[VARMAP], params);
    }
    addIncludeDirectories(...dirs) {
        const sourceDir = this[SCOPE].SOURCE_DIR;
        for (const iter of dirs.flat()) {
            this[SCOPE].INCLUDES.push(sourceDir.resolve(iter));
        }
    }
    addSubdirectory(sourceDir, binaryDir) {
        this[IMPL].addSubdirectory(this[VARMAP], sourceDir, binaryDir);
    }
    addCustomScript(scriptModule, params) {
        const variableMap = _core_Scope__WEBPACK_IMPORTED_MODULE_1__.ScopeHelper.cloneVariableMap(this[VARMAP]);
        _core_Scope__WEBPACK_IMPORTED_MODULE_1__.ScopeHelper.extendVariableMapByValues(variableMap, _Constants__WEBPACK_IMPORTED_MODULE_5__.CUSTOM_VARIABLE_GROUP, params);
        _core_Scope__WEBPACK_IMPORTED_MODULE_1__.ScopeHelper.set(variableMap, "SCRIPT_MODULE", scriptModule);
        const sourceDir = _core_Scope__WEBPACK_IMPORTED_MODULE_1__.ScopeHelper.get(variableMap, "SOURCE_DIR");
        const binaryDir = _core_Scope__WEBPACK_IMPORTED_MODULE_1__.ScopeHelper.get(variableMap, "BINARY_DIR");
        let inputFile = _core_Scope__WEBPACK_IMPORTED_MODULE_1__.ScopeHelper.get(variableMap, "SCRIPT_INPUT");
        if (inputFile)
            inputFile = sourceDir.resolve(inputFile);
        let outputFile = _core_Scope__WEBPACK_IMPORTED_MODULE_1__.ScopeHelper.get(variableMap, "SCRIPT_OUTPUT");
        if (!outputFile)
            throw new Error("CustomScript parameters required output entity");
        outputFile = sourceDir.resolve(outputFile);
        const options = {
            variableMap,
            name: _core_Scope__WEBPACK_IMPORTED_MODULE_1__.ScopeHelper.get(variableMap, "SCRIPT_NAME") || (0,_utils_Random__WEBPACK_IMPORTED_MODULE_6__.randCIdentifer)(16),
            scriptModule,
            output: outputFile,
            input: inputFile,
            sourceDir,
            binaryDir,
        };
        return this[IMPL].addCustomScript(options);
    }
    target(name) {
        return _core_UserTargetStruct__WEBPACK_IMPORTED_MODULE_4__.UserTargetStruct.create(this[IMPL].getPostTarget(name), this[SCOPE]);
    }
    script(name) {
        return this[IMPL].script(name);
    }
    install(value, params) {
        for (const it of [value].flat()) {
            let iter = (it instanceof _core_MakeInterfaces__WEBPACK_IMPORTED_MODULE_0__.InterfaceTarget) ? _core_TargetName__WEBPACK_IMPORTED_MODULE_9__.TargetName.create(it.targetName) : it;
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
                baseDir = this[SCOPE].SOURCE_DIR.resolve(baseDir);
            if (typeof iter === "string" || iter instanceof _AbsolutePath__WEBPACK_IMPORTED_MODULE_8__.AbsolutePath) {
                iter = this[SCOPE].SOURCE_DIR.resolve(iter.toString());
                iter = _AbsolutePath__WEBPACK_IMPORTED_MODULE_8__.FilePath.create(iter);
                baseDir = baseDir || iter.dirname();
            }
            else if (!(iter instanceof _core_TargetName__WEBPACK_IMPORTED_MODULE_9__.TargetName)) {
                throw new Error(`Not supportet value of ${iter}`);
            }
            this[IMPL].addInstallEntry(iter, _AbsolutePath__WEBPACK_IMPORTED_MODULE_8__.AbsolutePath.create(this[SCOPE].INSTALL_PREFIX.resolve(destination)), baseDir);
        }
    }
    addObjectLibrary(name, ...sources) {
        const target = createTargetImpl(_core_Target__WEBPACK_IMPORTED_MODULE_3__.ObjectLibrary, this[IMPL], this[SCOPE], name);
        target.setPrefix(this[SCOPE].OBJECT_LIBRARY_PREFIX);
        target.setSuffix(this[SCOPE].OBJECT_LIBRARY_SUFFIX);
        target.addLinkOptions(...this[SCOPE].OBJECT_LINKER_FLAGS);
        return _core_UserTargetStruct__WEBPACK_IMPORTED_MODULE_4__.UserTargetStruct.create(target, this[SCOPE], ...sources);
    }
    addStaticLibrary(name, ...sources) {
        const target = createTargetImpl(_core_Target__WEBPACK_IMPORTED_MODULE_3__.StaticLibrary, this[IMPL], this[SCOPE], name);
        target.setPrefix(this[SCOPE].STATIC_LIBRARY_PREFIX);
        target.setSuffix(this[SCOPE].STATIC_LIBRARY_SUFFIX);
        target.addLinkOptions(...this[SCOPE].STATIC_LINKER_FLAGS);
        return _core_UserTargetStruct__WEBPACK_IMPORTED_MODULE_4__.UserTargetStruct.create(target, this[SCOPE], ...sources);
    }
    addSharedLibrary(name, ...sources) {
        const target = createTargetImpl(_core_Target__WEBPACK_IMPORTED_MODULE_3__.SharedLibrary, this[IMPL], this[SCOPE], name);
        target.setPrefix(this[SCOPE].SHARED_LIBRARY_PREFIX);
        target.setSuffix(this[SCOPE].SHARED_LIBRARY_SUFFIX);
        target.addLinkOptions(...this[SCOPE].SHARED_LINKER_FLAGS);
        return _core_UserTargetStruct__WEBPACK_IMPORTED_MODULE_4__.UserTargetStruct.create(target, this[SCOPE], ...sources);
    }
    addExecutable(name, ...sources) {
        const target = createTargetImpl(_core_Target__WEBPACK_IMPORTED_MODULE_3__.Executable, this[IMPL], this[SCOPE], name);
        target.setPrefix(this[SCOPE].EXECUTABLE_SUFFIX);
        target.addLinkOptions(...this[SCOPE].EXE_LINKER_FLAGS);
        return _core_UserTargetStruct__WEBPACK_IMPORTED_MODULE_4__.UserTargetStruct.create(target, this[SCOPE], ...sources);
    }
    executeScript(script, params) {
        this[IMPL].executeScript(this[VARMAP], script, params);
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
    addCompileFlags(...options) {
        for (const iter of _core_TargetHelper__WEBPACK_IMPORTED_MODULE_1__.TargetHelper.normalizeCompileOptions(options.flat()))
            this[SOURCES].forEach(i => i.addCompileOption(iter));
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
        target.addInclude(publicOnly, _core_AbsolutePath__WEBPACK_IMPORTED_MODULE_4__.DirPath.create(sourceDir.resolve(include)));
    else if (include instanceof _core_AbsolutePath__WEBPACK_IMPORTED_MODULE_4__.AbsolutePath)
        target.addInclude(publicOnly, _core_AbsolutePath__WEBPACK_IMPORTED_MODULE_4__.DirPath.create(include));
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
        return value.toPath();
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
                const source = _core_SourceFile__WEBPACK_IMPORTED_MODULE_5__.SourceFile.create(filename, scope.SOURCE_DIR, !language, language, compilerPath, compilerFlags);
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
        for (const iter of _core_TargetHelper__WEBPACK_IMPORTED_MODULE_8__.TargetHelper.normalizeCompileOptions(options.flat()))
            this[IMPL].addCompileOption(false, iter);
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
        for (const iter of _core_TargetHelper__WEBPACK_IMPORTED_MODULE_8__.TargetHelper.normalizeCompileOptions(options.flat()))
            this[IMPL].addCompileOption(true, iter);
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
for (const iter of ["*:4"]) {
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
/* harmony export */   MakeClient: () => (/* binding */ MakeClient),
/* harmony export */   WorkerRpcClient: () => (/* binding */ WorkerRpcClient)
/* harmony export */ });
/* harmony import */ var node_worker_threads__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! node:worker_threads */ "node:worker_threads");
/* harmony import */ var node_worker_threads__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(node_worker_threads__WEBPACK_IMPORTED_MODULE_0__);
/* harmony import */ var _utils_Module__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! @/utils/Module */ "./src/utils/Module.ts");
/* harmony import */ var _server_MemoryTransport__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! @/server/MemoryTransport */ "./src/server/MemoryTransport.ts");
/* harmony import */ var _server_WorkerSender__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! @/server/WorkerSender */ "./src/server/WorkerSender.ts");
/* harmony import */ var _server_Transport__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! @/server/Transport */ "./src/server/Transport.ts");
/* harmony import */ var _core_Scope__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(/*! @/core/Scope */ "./src/core/Scope.ts");
/* harmony import */ var _core_SimpleObject__WEBPACK_IMPORTED_MODULE_6__ = __webpack_require__(/*! @/core/SimpleObject */ "./src/core/SimpleObject.ts");
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















const logger = _logger__WEBPACK_IMPORTED_MODULE_8__.Logger.create("file:///mnt/c/opt/work/source/darkit-sdk/external/bitmake/src/server/MakeClient.ts");
;
class WorkerRpcClient {
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
    /*public stopServer(): Promise<number> {
      return this._worker.terminate();
    }*/
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
            throw new Error(`Wortker return exit code ${code}`);
    }
}
;
class MakeClient {
    _workerRpc;
    _mainTargets = new Array;
    _postTargets = new Array;
    _mainScripts = new Array;
    _postScripts = new Array;
    _installEntries = new Array;
    constructor(jsonRpcServer) {
        this._workerRpc = new WorkerRpcClient(jsonRpcServer);
    }
    async execMakeScript(variableMap) {
        const cwdSave = process.cwd();
        const scriptDir = _core_Scope__WEBPACK_IMPORTED_MODULE_5__.ScopeHelper.get(variableMap, "SCRIPT_DIR");
        process.chdir(scriptDir.toString());
        await this._workerRpc.request(_server_RemoteMethods__WEBPACK_IMPORTED_MODULE_7__.WORKERNODE_STARTMAKESCRIPT, _core_Scope__WEBPACK_IMPORTED_MODULE_5__.ScopeHelper.toJSON(variableMap));
        process.chdir(cwdSave);
        const mainTargets = await this._workerRpc.request(_server_RemoteMethods__WEBPACK_IMPORTED_MODULE_7__.WORKERNODE_MAINTARGETS, null);
        this._mainTargets = _core_SimpleObject__WEBPACK_IMPORTED_MODULE_6__.SimpleObject.fromJSON(mainTargets);
        const postTargets = await this._workerRpc.request(_server_RemoteMethods__WEBPACK_IMPORTED_MODULE_7__.WORKERNODE_POSTTARGETS, null);
        this._postTargets = _core_SimpleObject__WEBPACK_IMPORTED_MODULE_6__.SimpleObject.fromJSON(postTargets);
        const mainScripts = await this._workerRpc.request(_server_RemoteMethods__WEBPACK_IMPORTED_MODULE_7__.WORKERNODE_MAINSCRIPTS, null);
        this._mainScripts = _core_SimpleObject__WEBPACK_IMPORTED_MODULE_6__.SimpleObject.fromJSON(mainScripts);
        const postScripts = await this._workerRpc.request(_server_RemoteMethods__WEBPACK_IMPORTED_MODULE_7__.WORKERNODE_POSTSCRIPTS, null);
        this._postScripts = _core_SimpleObject__WEBPACK_IMPORTED_MODULE_6__.SimpleObject.fromJSON(postScripts);
        const installEntries = await this._workerRpc.request(_server_RemoteMethods__WEBPACK_IMPORTED_MODULE_7__.WORKERNODE_INSTALLENTRIES, null);
        this._installEntries = _core_SimpleObject__WEBPACK_IMPORTED_MODULE_6__.SimpleObject.fromJSON(installEntries);
        await this._workerRpc.request(_server_RemoteMethods__WEBPACK_IMPORTED_MODULE_7__.WORKERNODE_PROCESSEXIT, 0);
    }
    get mainTargets() {
        return this._mainTargets;
    }
    get postTargets() {
        return this._postTargets;
    }
    get mainScripts() {
        return this._mainScripts;
    }
    get postScripts() {
        return this._postScripts;
    }
    get installEntries() {
        return this._installEntries;
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
    _clients = new Array;
    constructor() {
        this._listeners = {
            [CONFIGURE_EVENT]: new Array,
            [BUILD_EVENT]: new Array,
        };
        this._jsonRpcServer.registerCallback(_server_RemoteMethods__WEBPACK_IMPORTED_MODULE_8__.MAINNODE_EXECUTESCRIPT, params => this.executeScript(params));
        this._jsonRpcServer.registerCallback(_server_RemoteMethods__WEBPACK_IMPORTED_MODULE_8__.MAINNODE_LOADJSON, params => this.loadJSON(params));
        this._jsonRpcServer.registerCallback(_server_RemoteMethods__WEBPACK_IMPORTED_MODULE_8__.MAINNODE_STARTMAKESCRIPT, params => this.startMakeScript(params));
    }
    get rootVariableMap() {
        return this._rootVariableMap;
    }
    get project() {
        return this._project;
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
        const client = new _server_MakeClient__WEBPACK_IMPORTED_MODULE_4__.MakeClient(this._jsonRpcServer);
        this._clients.push(client);
        await client.execMakeScript(variableMap);
        return true;
    }
    combineResults() {
        for (const ctx of this._clients) {
            this._project.applyMainTargets(ctx.mainTargets);
            this._project.applyMainScripts(ctx.mainScripts);
            this._project.applyInstallEntities(ctx.installEntries);
        }
        for (const ctx of this._clients) {
            this._project.applPostTargets(ctx.postTargets);
            this._project.applPostScripts(ctx.postScripts);
        }
    }
    async start() {
        const sourceDir = _core_Scope__WEBPACK_IMPORTED_MODULE_3__.ScopeHelper.get(this._rootVariableMap, "PROJECT_SOURCE_DIR");
        const binaryDir = _core_Scope__WEBPACK_IMPORTED_MODULE_3__.ScopeHelper.get(this._rootVariableMap, "PROJECT_BINARY_DIR");
        const variableMap = (0,_core_BaseContext__WEBPACK_IMPORTED_MODULE_7__.createVariableMapForDirectory)(this._rootVariableMap, sourceDir, binaryDir);
        if (!await this.runMakeScript(variableMap))
            throw Error("Can't prepear ScriptFile");
        this.combineResults();
        this.onConfigureEnd();
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
    executeScript(scope, script, params) {
        logger.debug("RemoteMakeContext.executeScript(", script, params, ")");
        const newVariableMap = _core_Scope__WEBPACK_IMPORTED_MODULE_3__.ScopeHelper.cloneVariableMap(scope);
        params && _core_Scope__WEBPACK_IMPORTED_MODULE_3__.ScopeHelper.extendVariableMapByValues(newVariableMap, "", params);
        const scriptFile = _core_Scope__WEBPACK_IMPORTED_MODULE_3__.ScopeHelper.get(newVariableMap, "SOURCE_DIR").resolve(script);
        _core_Scope__WEBPACK_IMPORTED_MODULE_3__.ScopeHelper.set(newVariableMap, "SCRIPT_FILE", scriptFile);
        _core_Scope__WEBPACK_IMPORTED_MODULE_3__.ScopeHelper.set(newVariableMap, "SCRIPT_DIR", scriptFile.dirname());
        return this._transport.requestSync(_server_RemoteMethods__WEBPACK_IMPORTED_MODULE_1__.MAINNODE_EXECUTESCRIPT, _core_Scope__WEBPACK_IMPORTED_MODULE_3__.ScopeHelper.toJSON(newVariableMap));
    }
    addCacheVariables(scope, params) {
        logger.debug("RemoteMakeContext.addCacheVariables(", params, ")");
        let variables = params;
        if (typeof params === "string") {
            const filename = _core_Scope__WEBPACK_IMPORTED_MODULE_3__.ScopeHelper.get(scope, "SOURCE_DIR").resolve(params).toString();
            variables = this._transport.requestSync(_server_RemoteMethods__WEBPACK_IMPORTED_MODULE_1__.MAINNODE_LOADJSON, filename);
        }
        _core_Scope__WEBPACK_IMPORTED_MODULE_3__.ScopeHelper.defineVariablesInVariableMap(scope, _Constants__WEBPACK_IMPORTED_MODULE_4__.CUSTOM_VARIABLE_GROUP, variables);
    }
    addSubdirectory(scope, sourceDir, binaryDir) {
        logger.debug("RemoteMakeContext.addSubdirectory(", sourceDir, binaryDir, ")");
        const newVariableMap = (0,_core_BaseContext__WEBPACK_IMPORTED_MODULE_0__.createVariableMapForDirectory)(scope, sourceDir, binaryDir);
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
/* harmony export */   WORKERNODE_CREATEMAKECONTEXT: () => (/* binding */ WORKERNODE_CREATEMAKECONTEXT),
/* harmony export */   WORKERNODE_DELETEMAKECONTEXT: () => (/* binding */ WORKERNODE_DELETEMAKECONTEXT),
/* harmony export */   WORKERNODE_INSTALLENTRIES: () => (/* binding */ WORKERNODE_INSTALLENTRIES),
/* harmony export */   WORKERNODE_MAINSCRIPTS: () => (/* binding */ WORKERNODE_MAINSCRIPTS),
/* harmony export */   WORKERNODE_MAINTARGETS: () => (/* binding */ WORKERNODE_MAINTARGETS),
/* harmony export */   WORKERNODE_POSTSCRIPTS: () => (/* binding */ WORKERNODE_POSTSCRIPTS),
/* harmony export */   WORKERNODE_POSTTARGETS: () => (/* binding */ WORKERNODE_POSTTARGETS),
/* harmony export */   WORKERNODE_PROCESSEXIT: () => (/* binding */ WORKERNODE_PROCESSEXIT),
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
const WORKERNODE_CREATEMAKECONTEXT = "WorkerNode.createMakeContext";
const WORKERNODE_DELETEMAKECONTEXT = "WorkerNode.deleteMakeContext";
const WORKERNODE_STARTMAKESCRIPT = "WorkerNode.startMakeScript";
const WORKERNODE_MAINTARGETS = "WorkerNode.mainTargets";
const WORKERNODE_POSTTARGETS = "WorkerNode.postTargets";
const WORKERNODE_MAINSCRIPTS = "WorkerNode.mainScripts";
const WORKERNODE_POSTSCRIPTS = "WorkerNode.postScripts";
const WORKERNODE_INSTALLENTRIES = "WorkerNode.installEntries";
const WORKERNODE_PROCESSEXIT = "WorkerNode.processExit";
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
/* harmony import */ var _core_SimpleObject__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! @/core/SimpleObject */ "./src/core/SimpleObject.ts");
/* harmony import */ var _core_Scope__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(/*! @/core/Scope */ "./src/core/Scope.ts");
/*
 * MIT License
 *
 * Copyright (c) 2025  Yurii Yakubin (yurii.yakubin@gmail.com)
 *
 * Permission is granted to use, copy, modify, and distribute this software
 * under the MIT License. See LICENSE file for details.
 */






class WorkerNode {
    _name;
    _transport;
    _makeContexts = new Map;
    _makeContextCount = 0;
    _mainTargets = new Array;
    _postTargets = new Array;
    _mainScripts = new Array;
    _postScripts = new Array;
    _installEntries = new Array;
    constructor(name, requestSync) {
        this._name = name;
        this._transport = new _server_JsonRpcRequestSync__WEBPACK_IMPORTED_MODULE_0__.JsonRpcRequestSync(requestSync);
    }
    createMakeContext(params) {
        const mcid = this._name + ":" + this._makeContextCount++;
        return mcid;
    }
    deleteMakeContext(params) {
        return this._makeContexts.delete(params);
    }
    async execMakeScript(params) {
        const variableMap = _core_Scope__WEBPACK_IMPORTED_MODULE_5__.ScopeHelper.fromJSON(params);
        const ctx = new _server_RemoteMakeContext__WEBPACK_IMPORTED_MODULE_1__.RemoteMakeContext(variableMap, this._transport);
        const mk = _core_UserMakeContext__WEBPACK_IMPORTED_MODULE_2__.UserMakeContext.create(ctx, variableMap);
        await (0,_core_BaseContext__WEBPACK_IMPORTED_MODULE_3__.performContext)(mk);
        this._mainTargets = Array.from(ctx.targets.values());
        this._postTargets = Array.from(ctx.postTargets.values());
        this._mainScripts = Array.from(ctx.mainScripts.values());
        this._postScripts = Array.from(ctx.postScripts.values());
        this._installEntries = Array.from(ctx.installList);
    }
    mainTargets(params) {
        return _core_SimpleObject__WEBPACK_IMPORTED_MODULE_4__.SimpleObject.toJSON(this._mainTargets);
    }
    postTargets(params) {
        return _core_SimpleObject__WEBPACK_IMPORTED_MODULE_4__.SimpleObject.toJSON(this._postTargets);
    }
    mainScripts(params) {
        return _core_SimpleObject__WEBPACK_IMPORTED_MODULE_4__.SimpleObject.toJSON(this._mainScripts);
    }
    postScripts(params) {
        return _core_SimpleObject__WEBPACK_IMPORTED_MODULE_4__.SimpleObject.toJSON(this._postScripts);
    }
    installEntries(params) {
        return _core_SimpleObject__WEBPACK_IMPORTED_MODULE_4__.SimpleObject.toJSON(this._installEntries);
    }
    processExit(params) {
        setTimeout(() => process.exit(params), 0);
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

/***/ "./src/server/WorkerService.ts":
/*!*************************************!*\
  !*** ./src/server/WorkerService.ts ***!
  \*************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   WorkerService: () => (/* binding */ WorkerService)
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











const logger = _logger__WEBPACK_IMPORTED_MODULE_4__.Logger.create("file:///mnt/c/opt/work/source/darkit-sdk/external/bitmake/src/server/WorkerService.ts");
class WorkerService {
    _jsonrpcServer;
    constructor(name, sender) {
        this._jsonrpcServer = new _server_JsonRpcServer__WEBPACK_IMPORTED_MODULE_1__.JsonRpcServer;
        const buffer = new SharedArrayBuffer(0x8000);
        const transport = new _server_MemoryTransport__WEBPACK_IMPORTED_MODULE_0__.MemoryTransport(sender, buffer);
        const workerNode = new _server_WorkerNode__WEBPACK_IMPORTED_MODULE_2__.WorkerNode(name, transport);
        this._jsonrpcServer.registerCallback(_server_RemoteMethods__WEBPACK_IMPORTED_MODULE_3__.WORKERNODE_STARTMAKESCRIPT, params => workerNode.execMakeScript(params));
        this._jsonrpcServer.registerCallback(_server_RemoteMethods__WEBPACK_IMPORTED_MODULE_3__.WORKERNODE_MAINTARGETS, params => workerNode.mainTargets(params));
        this._jsonrpcServer.registerCallback(_server_RemoteMethods__WEBPACK_IMPORTED_MODULE_3__.WORKERNODE_POSTTARGETS, params => workerNode.postTargets(params));
        this._jsonrpcServer.registerCallback(_server_RemoteMethods__WEBPACK_IMPORTED_MODULE_3__.WORKERNODE_MAINSCRIPTS, params => workerNode.mainScripts(params));
        this._jsonrpcServer.registerCallback(_server_RemoteMethods__WEBPACK_IMPORTED_MODULE_3__.WORKERNODE_POSTSCRIPTS, params => workerNode.postScripts(params));
        this._jsonrpcServer.registerCallback(_server_RemoteMethods__WEBPACK_IMPORTED_MODULE_3__.WORKERNODE_INSTALLENTRIES, params => workerNode.installEntries(params));
        this._jsonrpcServer.registerCallback(_server_RemoteMethods__WEBPACK_IMPORTED_MODULE_3__.WORKERNODE_PROCESSEXIT, params => workerNode.processExit(params));
    }
    emitMessage(sender, message) {
        return this._jsonrpcServer.emitMessage(sender, message);
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

/***/ "./src/utils/Random.ts":
/*!*****************************!*\
  !*** ./src/utils/Random.ts ***!
  \*****************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   randCIdentifer: () => (/* binding */ randCIdentifer)
/* harmony export */ });
/*
 * MIT License
 *
 * Copyright (c) 2025  Yurii Yakubin (yurii.yakubin@gmail.com)
 *
 * Permission is granted to use, copy, modify, and distribute this software
 * under the MIT License. See LICENSE file for details.
 */
const firstChars = "_abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ";
const otherChars = firstChars + "0123456789";
function getCharOf(chars) {
    return chars.charAt(Math.floor(Math.random() * chars.length));
}
function randCIdentifer(length) {
    if (!length)
        return "";
    let result = getCharOf(firstChars);
    for (let i = 1; i < length; i++)
        result += getCharOf(otherChars);
    return result;
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
/* harmony import */ var _cxx__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! @/cxx */ "./src/cxx/index.ts");
/* harmony import */ var _cmake__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! @/cmake */ "./src/cmake/index.ts");
/* harmony import */ var _utils_ChildProcess__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! @/utils/ChildProcess */ "./src/utils/ChildProcess.ts");
/* harmony import */ var _utils_HttpRequest__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! @/utils/HttpRequest */ "./src/utils/HttpRequest.ts");
/* harmony import */ var _utils_Path__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! @/utils/Path */ "./src/utils/Path.ts");
/* harmony import */ var _app_RunScript__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(/*! @/app/RunScript */ "./src/app/RunScript.ts");
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
    cmake: {
        scriptMode: (scriptFile, variables, options) => _cmake__WEBPACK_IMPORTED_MODULE_1__.CMakeProcess.getInstance().scriptMode(scriptFile, variables, options),
        configure: (args) => _cmake__WEBPACK_IMPORTED_MODULE_1__.CMakeProcess.getInstance().configure(args),
        build: (args) => _cmake__WEBPACK_IMPORTED_MODULE_1__.CMakeProcess.getInstance().build(args),
        install: (args) => _cmake__WEBPACK_IMPORTED_MODULE_1__.CMakeProcess.getInstance().install(args),
        extract: (args) => _cmake__WEBPACK_IMPORTED_MODULE_1__.CMakeProcess.getInstance().extract(args),
        ctest: (args) => _cmake__WEBPACK_IMPORTED_MODULE_1__.CTestProcess.getInstance().ctest(args),
        getProjectInfo: _cmake__WEBPACK_IMPORTED_MODULE_1__.getProjectInfo,
    },
    process: {
        spawn: _utils_ChildProcess__WEBPACK_IMPORTED_MODULE_2__.spawnAsync,
    },
    utils: {
        requestGet: _utils_HttpRequest__WEBPACK_IMPORTED_MODULE_3__.requestGet,
        downloadFile: _utils_HttpRequest__WEBPACK_IMPORTED_MODULE_3__.downloadFile,
    },
    path: _utils_Path__WEBPACK_IMPORTED_MODULE_4__.Path,
});
(0,_app_RunScript__WEBPACK_IMPORTED_MODULE_5__.runScript)();

})();

__webpack_exports__ = __webpack_exports__["default"];
/******/ 	return __webpack_exports__;
/******/ })()
;
});
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiYml0bWFrZS5qcyIsIm1hcHBpbmdzIjoiO0FBQUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsQ0FBQztBQUNEOzs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7O0FDVkE7Ozs7Ozs7R0FPRztBQUVJLE1BQU0sV0FBVyxHQUFHLG9CQUFvQixDQUFDO0FBQ3pDLE1BQU0sZ0JBQWdCLEdBQUcsRUFBRSxDQUFDO0FBQzVCLE1BQU0sbUJBQW1CLEdBQUcsb0JBQW9CLENBQUM7QUFDakQsTUFBTSxVQUFVLEdBQUcsS0FBSyxDQUFDO0FBQ3pCLE1BQU0sY0FBYyxHQUFHLFNBQVMsQ0FBQztBQUNqQyxNQUFNLFlBQVksR0FBRyxjQUFjLENBQUM7QUFDcEMsTUFBTSxVQUFVLEdBQUcsZ0JBQWdCLENBQUM7QUFDcEMsTUFBTSxxQkFBcUIsR0FBRyxRQUFRLENBQUM7QUFDdkMsTUFBTSxxQkFBcUIsR0FBRyxRQUFRLENBQUM7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7OztBQ2pCOUM7Ozs7Ozs7R0FPRztBQUVzQjtBQUVXO0FBQ2E7QUFDSTtBQUNWO0FBQ2dCO0FBQ21CO0FBQzNCO0FBQ0o7QUFDZTtBQUVaO0FBQ3FCO0FBQ25CO0FBQ0o7QUFFSztBQUNuQjtBQUVsQyxNQUFNLE1BQU0sR0FBRyw0Q0FBTSxDQUFDLE1BQU0sQ0FBQyxrRkFBZSxDQUFDLENBQUM7QUFFOUMsNkJBQWUsMENBQWUsTUFBVyxFQUFFLFdBQWdCLEVBQUUsUUFBeUI7SUFDcEYsT0FBTyxDQUFDLEdBQUcsR0FBRyxXQUFXLENBQUM7SUFFMUIsTUFBTSxNQUFNLEdBQUcsSUFBSSwwREFBVSxDQUFDO0lBRTlCLE1BQU0sV0FBVyxHQUFHLE1BQU0sQ0FBQyxlQUFlLENBQUM7SUFDM0Msb0RBQVcsQ0FBQyx5QkFBeUIsQ0FBQyxXQUFXLEVBQUUsRUFBRSxFQUFFLE1BQU0sQ0FBQyxTQUFTLENBQUMsQ0FBQztJQUN6RSxvREFBVyxDQUFDLDRCQUE0QixDQUFDLFdBQVcsRUFBRSw4REFBcUIsRUFBRSw4REFBZSxDQUFDLENBQUM7SUFDOUYsTUFBTSxLQUFLLEdBQUcsb0RBQVcsQ0FBQyxXQUFXLENBQUMsV0FBVyxDQUFnQixDQUFDO0lBRWxFLE1BQU0sU0FBUyxHQUFHLGdFQUFhLENBQUMsTUFBTSxDQUFDLFNBQVMsQ0FBQyxDQUFDO0lBQ2xELE1BQU0sU0FBUyxHQUFHLGdFQUFhLENBQUMsTUFBTSxDQUFDLFNBQVMsQ0FBQyxDQUFDO0lBRWxELEtBQUssQ0FBQyxrQkFBa0IsR0FBRyw0REFBWSxDQUFDLE1BQU0sQ0FBQyxTQUFTLENBQUMsQ0FBQztJQUMxRCxLQUFLLENBQUMsa0JBQWtCLEdBQUcsNERBQVksQ0FBQyxNQUFNLENBQUMsU0FBUyxDQUFDLENBQUM7SUFFMUQsS0FBSyxDQUFDLFlBQVksR0FBRyxLQUFLLENBQUMsa0JBQWtCLENBQUMsSUFBSSxDQUFDLHFEQUFZLENBQUMsQ0FBQztJQUNqRSxLQUFLLENBQUMsVUFBVSxHQUFHLEtBQUssQ0FBQyxrQkFBa0IsQ0FBQyxJQUFJLENBQUMsbURBQVUsQ0FBQyxDQUFDO0lBQzdELEtBQUssQ0FBQyxVQUFVLEdBQUcsS0FBSyxDQUFDLGtCQUFrQixDQUFDO0lBQzVDLEtBQUssQ0FBQyxVQUFVLEdBQUcsS0FBSyxDQUFDLGtCQUFrQixDQUFDO0lBRTVDLE1BQU0sV0FBVyxHQUFHLE1BQU0sdURBQVcsQ0FBQyxRQUFRLENBQUMsS0FBSyxDQUFDLFlBQVksQ0FBQyxRQUFRLEVBQUUsRUFBRSxNQUFNLENBQUMsQ0FBQztJQUN0RixNQUFNLEdBQUcsR0FBRyxJQUFJLENBQUMsS0FBSyxDQUFDLFdBQVcsQ0FBQyxDQUFDO0lBRXBDLEtBQUssQ0FBQyxVQUFVLEdBQUcsTUFBTSxDQUFDLFNBQVMsQ0FBQztJQUNwQyxLQUFLLENBQUMsWUFBWSxHQUFHLEdBQUcsQ0FBQyxJQUFJLENBQUM7SUFDOUIsS0FBSyxDQUFDLGVBQWUsR0FBRyxHQUFHLENBQUMsT0FBTyxDQUFDO0lBQ3BDLEtBQUssQ0FBQyxtQkFBbUIsR0FBRyxHQUFHLENBQUMsV0FBVyxJQUFJLEVBQUUsQ0FBQztJQUNsRCxLQUFLLENBQUMsb0JBQW9CLEdBQUcsR0FBRyxDQUFDLFFBQVEsSUFBSSxFQUFFLENBQUM7SUFFaEQsSUFBSSxNQUFNLENBQUMsT0FBTztRQUNoQixLQUFLLENBQUMsT0FBTyxHQUFHLE1BQU0sQ0FBQyxPQUFPLENBQUM7SUFFakMsS0FBSyxNQUFNLE1BQU0sSUFBSSxDQUFDLEtBQUssQ0FBQyxnQkFBZ0IsSUFBSSxFQUFFLENBQUMsRUFBRSxDQUFDO1FBQ3BELE1BQU0sT0FBTyxHQUFHLE9BQU8sQ0FBQyxHQUFHLEVBQUUsQ0FBQztRQUU5QixLQUFLLENBQUMsV0FBVyxHQUFHLDREQUFZLENBQUMsTUFBTSxDQUFDLE1BQU0sQ0FBQyxDQUFDO1FBQ2hELEtBQUssQ0FBQyxVQUFVLEdBQUcsS0FBSyxDQUFDLFdBQVcsQ0FBQyxPQUFPLEVBQUUsQ0FBQztRQUMvQyxLQUFLLENBQUMsVUFBVSxHQUFHLEtBQUssQ0FBQyxVQUFVLENBQUM7UUFFcEMsTUFBTSxVQUFVLEdBQUcsS0FBSyxDQUFDLGtCQUFrQixDQUFDLFFBQVEsQ0FBQyxTQUFTLENBQUMsQ0FBQztRQUNoRSxNQUFNLFVBQVUsR0FBRyxLQUFLLENBQUMsa0JBQWtCLENBQUMsUUFBUSxDQUFDLFNBQVMsQ0FBQyxDQUFDO1FBQ2hFLE1BQU0sU0FBUyxHQUFHLENBQUMsVUFBVSxDQUFDLE1BQU0sR0FBRyxVQUFVLENBQUMsTUFBTSxDQUFDLENBQUMsQ0FBQyxVQUFVLENBQUMsQ0FBQyxDQUFDLFVBQVUsQ0FBQyxDQUFDLE9BQU8sQ0FBQyxLQUFLLEVBQUUsS0FBSyxDQUFDLENBQUM7UUFDMUcsS0FBSyxDQUFDLFVBQVUsR0FBRyxLQUFLLENBQUMsa0JBQWtCLENBQUMsSUFBSSxDQUFDLG9CQUFvQixFQUFFLFNBQVMsQ0FBQyxDQUFDO1FBRWxGLE9BQU8sQ0FBQyxLQUFLLENBQUMsS0FBSyxDQUFDLFVBQVUsQ0FBQyxRQUFRLEVBQUUsQ0FBQyxDQUFDO1FBQzNDLE1BQU0sU0FBUyxHQUFHLCtEQUFZLENBQUMsS0FBSyxDQUFDLFdBQVcsQ0FBQyxRQUFRLEVBQUUsQ0FBQyxDQUFDO1FBQzdELE1BQU0sTUFBTSxHQUFHLE1BQU0sMkRBQVksQ0FBQyxTQUFTLENBQUMsQ0FBQztRQUU3QyxJQUFJLENBQUMsTUFBTSxDQUFDLE9BQU87WUFDakIsTUFBTSxJQUFJLEtBQUssQ0FBQyxVQUFVLEtBQUssQ0FBQyxXQUFXLENBQUMsUUFBUSxFQUFFLDZCQUE2QixDQUFDLENBQUM7UUFFdkYsTUFBTSxFQUFFLEdBQUcsOERBQWEsQ0FBQyxNQUFNLENBQUMsTUFBTSxDQUFDLE9BQU8sRUFBRSxXQUFXLENBQUMsQ0FBQztRQUM3RCxJQUFJLE9BQU8sTUFBTSxDQUFDLE9BQU8sS0FBSyxVQUFVO1lBQ3RDLE1BQU0sSUFBSSxLQUFLLENBQUMsVUFBVSxLQUFLLENBQUMsV0FBVyxDQUFDLFFBQVEsRUFBRSxrQ0FBa0MsQ0FBQyxDQUFDO1FBQzVGLElBQUksTUFBVyxDQUFDO1FBQ2hCLElBQUksVUFBVSxDQUFDLElBQUksQ0FBQyxRQUFRLENBQUMsU0FBUyxDQUFDLFFBQVEsQ0FBQyxJQUFJLENBQUMsTUFBTSxDQUFDLE9BQU8sQ0FBQyxDQUFDLEVBQUUsQ0FBQztZQUN0RSxJQUFJLE9BQU8sTUFBTSxDQUFDLE9BQU8sQ0FBQyxTQUFTLENBQUMsS0FBSyxLQUFLLFVBQVU7Z0JBQ3RELE1BQU0sSUFBSSxLQUFLLENBQUMsbUJBQW1CLEtBQUssQ0FBQyxXQUFXLENBQUMsUUFBUSxFQUFFLHNCQUFzQixDQUFDLENBQUM7WUFDekYsTUFBTSxHQUFHLENBQUMsSUFBSSxNQUFNLENBQUMsT0FBTyxDQUFDLENBQUMsS0FBSyxDQUFDLEVBQUUsQ0FBQyxDQUFDO1FBQzFDLENBQUM7YUFDSSxDQUFDO1lBQ0osTUFBTSxHQUFHLE1BQU0sQ0FBQyxPQUFPLENBQUMsRUFBRSxDQUFDLENBQUM7UUFDOUIsQ0FBQztRQUVELElBQUksTUFBTSxZQUFZLE9BQU87WUFDM0IsTUFBTSxNQUFNLENBQUM7UUFFZixPQUFPLENBQUMsS0FBSyxDQUFDLE9BQU8sQ0FBQyxDQUFDO0lBQ3pCLENBQUM7SUFFRCxJQUFJLEtBQUssQ0FBQyxjQUFjLEVBQUUsQ0FBQztRQUN6QixNQUFNLFlBQVksR0FBRywrREFBWSxDQUFDLEtBQUssQ0FBQyxjQUFjLENBQUMsUUFBUSxFQUFFLENBQUMsQ0FBQztRQUNuRSxNQUFNLFNBQVMsR0FBRyxNQUFNLDJEQUFZLENBQUMsWUFBWSxDQUFDLENBQUM7UUFDbkQsSUFBSSxDQUFDLFNBQVMsQ0FBQyxPQUFPO1lBQ3BCLE1BQU0sSUFBSSxLQUFLLENBQUMsd0NBQXdDLENBQUMsQ0FBQztRQUM1RCxNQUFNLEVBQUUsR0FBRyxvRUFBZ0IsQ0FBQyxNQUFNLENBQUMsTUFBTSxDQUFDLE9BQU8sRUFBRSxXQUFXLENBQUMsQ0FBQztRQUNoRSxNQUFNLE1BQU0sR0FBRyxTQUFTLENBQUMsT0FBTyxDQUFDLEVBQUUsQ0FBQyxDQUFDO1FBQ3JDLElBQUksTUFBTSxZQUFZLE9BQU87WUFDM0IsTUFBTSxNQUFNLENBQUM7SUFDakIsQ0FBQztTQUNJLENBQUM7UUFDSixNQUFNLDBFQUFpQixDQUFDLEtBQUssQ0FBQyxDQUFDO0lBQ2pDLENBQUM7SUFFRCxJQUFJLE1BQU0sQ0FBQyxTQUFTLElBQUksTUFBTSxDQUFDLFNBQVMsQ0FBQyxVQUFVLENBQUMsNERBQWEsQ0FBQyxFQUFFLENBQUM7UUFDbkUsTUFBTSxVQUFVLEdBQUcsNkRBQWMsQ0FBQyxNQUFNLENBQUMsU0FBUyxDQUFDLEtBQUssQ0FBQyw0REFBYSxDQUFDLE1BQU0sQ0FBQyxDQUFDLENBQUM7UUFDaEYsS0FBSyxDQUFDLFdBQVcsR0FBRyw0REFBWSxDQUFDLE1BQU0sQ0FBQyxVQUFVLENBQUMsQ0FBQztRQUNwRCxLQUFLLENBQUMsVUFBVSxHQUFHLEtBQUssQ0FBQyxXQUFXLENBQUMsT0FBTyxFQUFFLENBQUM7SUFDakQsQ0FBQztJQUVELE1BQU0sQ0FBQyxnQkFBZ0IsQ0FBQyxXQUFXLEVBQUUsS0FBSyxFQUFFLEtBQUssRUFBRSxFQUFFO1FBQ25ELE1BQU0sQ0FBQyxJQUFJLENBQUMsa0JBQWtCLENBQUMsQ0FBQztRQUVoQyxJQUFJLEtBQUssQ0FBQyxtQkFBbUIsRUFBRSxDQUFDO1lBQzlCLE1BQU0sNkRBQVUsQ0FBQyxLQUFLLENBQUMsbUJBQW1CLENBQUMsTUFBTSxFQUFFLEVBQUUsTUFBTSxDQUFDLE9BQU8sRUFBRSxFQUFFLE1BQU0sRUFBRSxJQUFJLEVBQUUsQ0FBQyxDQUFDO1FBQ3pGLENBQUM7UUFFRCxNQUFNLFdBQVcsR0FBRyxNQUFNLENBQUMsT0FBTyxDQUFDLFdBQVcsQ0FBQyxLQUFLLENBQUMsQ0FBQztRQUN0RCxNQUFNLFFBQVEsR0FBRyxXQUFXLENBQUMsYUFBYSxDQUFDLHVEQUFjLENBQUMsQ0FBQztRQUUzRCxJQUFJLEtBQUssQ0FBQyxpQkFBaUIsRUFBRSxDQUFDO1lBQzVCLE1BQU0sNkRBQVUsQ0FBQyxLQUFLLENBQUMsaUJBQWlCLENBQUMsTUFBTSxFQUFFLEVBQUUsUUFBUSxFQUFFLEVBQUUsTUFBTSxFQUFFLElBQUksRUFBRSxDQUFDLENBQUM7UUFDakYsQ0FBQztRQUVELElBQUksTUFBTSxHQUFHLENBQUMsQ0FBQztRQUNmLE1BQU0sS0FBSyxHQUFHLFFBQVEsQ0FBQyxNQUFNLENBQUM7UUFDOUIsS0FBSyxNQUFNLElBQUksSUFBSSxRQUFRLEVBQUUsQ0FBQztZQUM1QixJQUFJLElBQUksQ0FBQyxNQUFNLEVBQUUsQ0FBQztnQkFDaEIsTUFBTSxTQUFTLEdBQUcsNkNBQUksQ0FBQyxPQUFPLENBQUMsSUFBSSxDQUFDLE1BQU0sQ0FBQyxDQUFDO2dCQUM1QyxNQUFNLHVEQUFXLENBQUMsS0FBSyxDQUFDLFNBQVMsRUFBRSxFQUFFLFNBQVMsRUFBRSxJQUFJLEVBQUUsQ0FBQyxDQUFDO1lBQzFELENBQUM7WUFDRCxJQUFJLElBQUksQ0FBQyxPQUFPLEVBQUUsQ0FBQztnQkFDakIsTUFBTSxnQkFBZ0IsR0FBRyxJQUFJLENBQUMsS0FBSyxDQUFDLENBQUMsQ0FBQyxNQUFNLEdBQUcsQ0FBQyxDQUFDLEdBQUcsS0FBSyxDQUFDLEdBQUcsR0FBRyxDQUFDLENBQUM7Z0JBQ2xFLE1BQU0sT0FBTyxHQUFHLEdBQUcsR0FBRyxnQkFBZ0IsQ0FBQyxRQUFRLEVBQUUsQ0FBQyxRQUFRLENBQUMsQ0FBQyxFQUFFLEdBQUcsQ0FBQyxHQUFHLEtBQUssQ0FBQztnQkFDM0UsTUFBTSxDQUFDLE1BQU0sQ0FBQyxPQUFPLEdBQUcsSUFBSSxDQUFDLE9BQU8sQ0FBQyxDQUFDO1lBQ3hDLENBQUM7WUFDRCxNQUFNLElBQUksQ0FBQyxNQUFNLEVBQUUsQ0FBQztZQUNwQixNQUFNLEVBQUUsQ0FBQztRQUNYLENBQUM7SUFDSCxDQUFDLENBQUMsQ0FBQztJQUVILElBQUksYUFBeUIsQ0FBQztJQUM5QixNQUFNLE1BQU0sR0FBRyxJQUFJLE9BQU8sQ0FBTyxDQUFDLE9BQU8sRUFBRSxFQUFFO1FBQzNDLGFBQWEsR0FBRyxPQUFPLENBQUM7SUFDMUIsQ0FBQyxDQUFDLENBQUM7SUFFSCxNQUFNLENBQUMsZ0JBQWdCLENBQUMsT0FBTyxFQUFFLENBQUMsS0FBSyxFQUFFLEVBQUUsQ0FBQyxhQUFhLEVBQUUsQ0FBQyxDQUFDO0lBRTdELE1BQU0sQ0FBQyxLQUFLLEVBQUUsQ0FBQztJQUVmLE9BQU8sTUFBTSxDQUFDO0FBQ2hCLENBQUM7Ozs7Ozs7Ozs7Ozs7Ozs7O0FDbktEOzs7Ozs7O0dBT0c7QUFFdUQ7QUFDTjtBQUdwRCw2QkFBZSwwQ0FBZSxNQUFXLEVBQUUsV0FBZ0IsRUFBRSxRQUF5QjtJQUNwRixNQUFNLFNBQVMsR0FBRyxnRUFBYSxDQUFDLE1BQU0sQ0FBQyxTQUFTLENBQUMsQ0FBQztJQUNsRCxNQUFNLFNBQVMsR0FBRyxnRUFBYSxDQUFDLE1BQU0sQ0FBQyxTQUFTLENBQUMsQ0FBQztJQUNsRCxNQUFNLFNBQVMsR0FBRztRQUNoQixXQUFXLEVBQUU7WUFDWCxHQUFHLFdBQVc7WUFDZCxPQUFPLEVBQUUsTUFBTSxDQUFDLE9BQU87U0FDeEI7UUFDRCxTQUFTLEVBQUUsTUFBTSxDQUFDLFNBQVMsSUFBSSxxREFBaUI7UUFDaEQsY0FBYyxFQUFFLE1BQU0sQ0FBQyxjQUFjO1FBQ3JDLFNBQVM7UUFDVCxTQUFTO0tBQ1YsQ0FBQztJQUVGLElBQUksQ0FBQyxTQUFTLENBQUMsY0FBYyxDQUFDLGdCQUFnQixFQUFFLENBQUM7UUFDL0MsU0FBUyxDQUFDLGNBQWMsQ0FBQyxnQkFBZ0IsR0FBRyxNQUFNLENBQUMsU0FBUyxDQUFDO0lBQy9ELENBQUM7SUFFRCxNQUFNLEtBQUssR0FBRyxnREFBWSxDQUFDLFdBQVcsRUFBRSxDQUFDO0lBQ3pDLE1BQU0sS0FBSyxDQUFDLFNBQVMsQ0FBQyxTQUFTLENBQUMsQ0FBQztJQUNqQyxNQUFNLEtBQUssQ0FBQyxLQUFLLENBQUMsU0FBUyxDQUFDLENBQUM7SUFDN0IsTUFBTSxLQUFLLENBQUMsT0FBTyxDQUFDLFNBQVMsQ0FBQyxDQUFDO0FBQ2pDLENBQUM7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7O0FDbkNEOzs7Ozs7O0dBT0c7QUFFMEI7QUFFc0I7QUFDQTtBQUVEO0FBRWxELDZCQUFlLDBDQUFlLE1BQVcsRUFBRSxXQUFnQixFQUFFLFFBQXlCO0lBQ3BGLE1BQU0sU0FBUyxHQUFHLGdFQUFhLENBQUMsTUFBTSxDQUFDLFNBQVMsQ0FBQyxDQUFDO0lBQ2xELE1BQU0sU0FBUyxHQUFHLGdFQUFhLENBQUMsTUFBTSxDQUFDLFNBQVMsQ0FBQyxDQUFDO0lBQ2xELElBQUksSUFBSSxHQUFHLE1BQU0sUUFBUSxDQUFDLEdBQUcsQ0FBQyxXQUFXLENBQUMsSUFBSSxRQUFRLENBQUM7SUFDdkQsSUFBSSxJQUFJLEtBQUssUUFBUSxFQUFFLENBQUM7UUFDdEIsTUFBTSxPQUFPLEdBQUcsd0RBQVksQ0FBQyxTQUFTLEVBQUUsV0FBVyxDQUFDLENBQUM7UUFDckQsTUFBTSxNQUFNLEdBQUcsRUFBRSxDQUFDO1FBQ2xCLElBQUksS0FBSyxDQUFDLE9BQU8sQ0FBQyxNQUFNLENBQUMsU0FBUyxDQUFDLEVBQUUsQ0FBQztZQUNwQyxLQUFLLE1BQU0sSUFBSSxJQUFJLE1BQU0sQ0FBQyxTQUFTO2dCQUNqQyxNQUFNLENBQUMsSUFBSSxDQUFDLElBQUksQ0FBQyxDQUFDO1FBQ3RCLENBQUM7YUFDSSxJQUFJLE1BQU0sQ0FBQyxTQUFTLEVBQUUsQ0FBQztZQUMxQixLQUFLLE1BQU0sQ0FBQyxHQUFHLEVBQUMsR0FBRyxDQUFDLElBQUksTUFBTSxDQUFDLE9BQU8sQ0FBQyxNQUFNLENBQUMsU0FBUyxDQUFDLEVBQUUsQ0FBQztnQkFDekQsSUFBSSxHQUFHLEtBQUssVUFBVSxJQUFJLEtBQUssQ0FBQyxPQUFPLENBQUMsR0FBRyxDQUFDLEVBQUUsQ0FBQztvQkFDN0MsS0FBSyxNQUFNLElBQUksSUFBSSxHQUFHO3dCQUNwQixNQUFNLENBQUMsSUFBSSxDQUFDLEtBQUssSUFBSSxFQUFFLENBQUMsQ0FBQztnQkFDN0IsQ0FBQztxQkFDSSxJQUFJLEdBQUcsS0FBSyxJQUFJO29CQUNuQixNQUFNLENBQUMsSUFBSSxDQUFDLEtBQUssR0FBRyxFQUFFLENBQUMsQ0FBQzs7b0JBRXhCLE1BQU0sQ0FBQyxJQUFJLENBQUMsS0FBSyxHQUFHLElBQUksR0FBRyxFQUFFLENBQUMsQ0FBQztZQUNuQyxDQUFDO1FBQ0gsQ0FBQztRQUNELElBQUksTUFBTSxDQUFDLFFBQVEsRUFBRSxDQUFDO1lBQ3BCLEtBQUssTUFBTSxHQUFHLElBQUksTUFBTSxDQUFDLFFBQVE7Z0JBQy9CLE1BQU0sQ0FBQyxJQUFJLENBQUMsS0FBSyxHQUFHLEVBQUUsQ0FBQyxDQUFDO1FBQzVCLENBQUM7UUFDRCxNQUFNLElBQUksR0FBRyxNQUFNLCtEQUFVLENBQUMsT0FBTyxFQUFFLE1BQU0sRUFBRTtZQUM3QyxHQUFHLEVBQUUsU0FBUztZQUNkLEdBQUcsRUFBRSxXQUFXO1lBQ2hCLEtBQUssRUFBRTtnQkFDTCxNQUFNLEVBQUUsZ0JBQWdCLElBQUksTUFBTTthQUNuQztTQUNGLENBQUMsQ0FBQztRQUNILElBQUksSUFBSSxDQUFDLE1BQU0sS0FBSyxDQUFDLEVBQUUsQ0FBQztZQUN0QixNQUFNLElBQUksS0FBSyxDQUFDLDZCQUE2QixJQUFJLENBQUMsTUFBTSxFQUFFLENBQUMsQ0FBQztRQUM5RCxDQUFDO1FBQ0QsSUFBSSxHQUFHLE1BQU0sQ0FBQztRQUNkLE1BQU0sUUFBUSxDQUFDLEdBQUcsQ0FBQyxXQUFXLEVBQUUsSUFBSSxDQUFDLENBQUM7SUFDeEMsQ0FBQztJQUNELElBQUksSUFBSSxLQUFLLE1BQU0sRUFBRSxDQUFDO1FBQ3BCLElBQUksT0FBTyxHQUFHLEtBQUssQ0FBQztRQUNwQixJQUFJLE1BQU0sQ0FBQyxNQUFNLENBQUMsTUFBTSxFQUFFLFNBQVMsQ0FBQztZQUNsQyxPQUFPLEdBQUcsZ0VBQWEsQ0FBQyxNQUFNLENBQUMsT0FBTyxDQUFDLENBQUM7UUFDMUMsSUFBSSxPQUFPLEVBQUUsQ0FBQztZQUNaLE1BQU0sSUFBSSxHQUFHLE1BQU0sK0RBQVUsQ0FBQyxNQUFNLEVBQUUsRUFBRSxFQUFFO2dCQUN4QyxHQUFHLEVBQUUsU0FBUztnQkFDZCxHQUFHLEVBQUUsV0FBVztnQkFDaEIsS0FBSyxFQUFFO29CQUNMLE1BQU0sRUFBRSxnQkFBZ0IsSUFBSSxNQUFNO2lCQUNuQzthQUNGLENBQUMsQ0FBQztZQUNILElBQUksSUFBSSxDQUFDLE1BQU0sS0FBSyxDQUFDLEVBQUUsQ0FBQztnQkFDdEIsTUFBTSxJQUFJLEtBQUssQ0FBQyx3QkFBd0IsSUFBSSxDQUFDLE1BQU0sRUFBRSxDQUFDLENBQUM7WUFDekQsQ0FBQztRQUNILENBQUM7UUFDRCxJQUFJLEdBQUcsU0FBUyxDQUFDO1FBQ2pCLE1BQU0sUUFBUSxDQUFDLEdBQUcsQ0FBQyxXQUFXLEVBQUUsSUFBSSxDQUFDLENBQUM7SUFDeEMsQ0FBQztJQUNELElBQUksSUFBSSxLQUFLLFNBQVMsRUFBRSxDQUFDO1FBQ3ZCLElBQUksY0FBYyxHQUFHLElBQUksQ0FBQztRQUMxQixJQUFJLE1BQU0sQ0FBQyxNQUFNLENBQUMsTUFBTSxFQUFFLGdCQUFnQixDQUFDO1lBQ3pDLGNBQWMsR0FBRyxnRUFBYSxDQUFDLE1BQU0sQ0FBQyxjQUFjLENBQUMsQ0FBQztRQUN4RCxJQUFJLGNBQWMsRUFBRSxDQUFDO1lBQ25CLE1BQU0sSUFBSSxHQUFHLENBQUUsU0FBUyxDQUFFLENBQUM7WUFDM0IsSUFBSSxNQUFNLENBQUMsT0FBTyxFQUFFLENBQUM7Z0JBQ25CLElBQUksQ0FBQyxJQUFJLENBQUMsV0FBVyxNQUFNLENBQUMsT0FBTyxFQUFFLENBQUMsQ0FBQztZQUN6QyxDQUFDO1lBQ0QsTUFBTSxJQUFJLEdBQUcsTUFBTSwrREFBVSxDQUFDLE1BQU0sRUFBRSxJQUFJLEVBQUU7Z0JBQzFDLEdBQUcsRUFBRSxTQUFTO2dCQUNkLEdBQUcsRUFBRSxXQUFXO2dCQUNoQixLQUFLLEVBQUU7b0JBQ0wsTUFBTSxFQUFFLGdCQUFnQixJQUFJLE1BQU07aUJBQ25DO2FBQ0YsQ0FBQyxDQUFDO1lBQ0gsSUFBSSxJQUFJLENBQUMsTUFBTSxLQUFLLENBQUMsRUFBRSxDQUFDO2dCQUN0QixNQUFNLElBQUksS0FBSyxDQUFDLHdCQUF3QixJQUFJLENBQUMsTUFBTSxFQUFFLENBQUMsQ0FBQztZQUN6RCxDQUFDO1FBQ0gsQ0FBQztRQUNELElBQUksR0FBRyxNQUFNLENBQUM7UUFDZCxNQUFNLFFBQVEsQ0FBQyxHQUFHLENBQUMsV0FBVyxFQUFFLElBQUksQ0FBQyxDQUFDO0lBQ3hDLENBQUM7QUFDSCxDQUFDOzs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7QUNsR0Q7Ozs7Ozs7R0FPRztBQUkrQjtBQUNNO0FBQ0k7QUFDVjtBQUNFO0FBQ0k7QUFNeEMsaUVBQWdDO0lBQzlCLElBQUk7SUFDSixPQUFPO0lBQ1AsU0FBUztJQUNULElBQUk7SUFDSixLQUFLO0lBQ0wsT0FBTztDQUNSLEVBQUM7Ozs7Ozs7Ozs7Ozs7Ozs7O0FDN0JGOzs7Ozs7O0dBT0c7QUFFK0M7QUFDRTtBQUdwRCw2QkFBZSwwQ0FBZSxNQUFXLEVBQUUsV0FBZ0IsRUFBRSxRQUF5QjtJQUNwRixNQUFNLFNBQVMsR0FBRyxnRUFBYSxDQUFDLE1BQU0sQ0FBQyxTQUFTLENBQUMsQ0FBQztJQUNsRCxNQUFNLElBQUksR0FBRyxNQUFNLENBQUMsSUFBSSxJQUFJLEVBQUUsQ0FBQztJQUMvQixJQUFJLE1BQU0sQ0FBQyxPQUFPLEVBQUUsQ0FBQztRQUNuQixJQUFJLENBQUMsSUFBSSxDQUFDLFdBQVcsTUFBTSxDQUFDLE9BQU8sRUFBRSxDQUFDLENBQUM7SUFDekMsQ0FBQztJQUNELE1BQU0sSUFBSSxHQUFHLE1BQU0sK0RBQVUsQ0FBQyxNQUFNLEVBQUUsSUFBSSxFQUFFO1FBQzFDLEdBQUcsRUFBRSxTQUFTO1FBQ2QsR0FBRyxFQUFFLFdBQVc7UUFDaEIsS0FBSyxFQUFFO1lBQ0wsTUFBTSxFQUFFLFVBQVU7U0FDbkI7S0FDRixDQUFDLENBQUM7SUFDSCxJQUFJLElBQUksQ0FBQyxNQUFNLEtBQUssQ0FBQyxFQUFFLENBQUM7UUFDdEIsTUFBTSxJQUFJLEtBQUssQ0FBQyx3QkFBd0IsSUFBSSxDQUFDLE1BQU0sRUFBRSxDQUFDLENBQUM7SUFDekQsQ0FBQztBQUNILENBQUM7Ozs7Ozs7Ozs7Ozs7Ozs7QUM3QkQ7Ozs7Ozs7R0FPRztBQUkrQjtBQUVsQyxNQUFNLE1BQU0sR0FBRywyQ0FBTSxDQUFDLE1BQU0sQ0FBQywrRUFBZSxDQUFDLENBQUM7QUFFOUMsNkJBQWUsMENBQWUsTUFBVyxFQUFFLFdBQWdCLEVBQUUsUUFBeUI7SUFDcEYsZ0JBQWdCO0FBQ2xCLENBQUM7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7O0FDakJEOzs7Ozs7O0dBT0c7QUFHMEI7QUFFc0I7QUFFRDtBQUNoQjtBQUVsQyxNQUFNLE1BQU0sR0FBRywyQ0FBTSxDQUFDLE1BQU0sQ0FBQyxrRkFBZSxDQUFDLENBQUM7QUFFOUMsNkJBQWUsMENBQWUsTUFBVyxFQUFFLFdBQWdCLEVBQUUsUUFBeUI7SUFDcEYsSUFBSSxDQUFDLE1BQU0sQ0FBQyxPQUFPO1FBQ2pCLE1BQU0sSUFBSSxLQUFLLENBQUMsMkNBQTJDLENBQUMsQ0FBQztJQUMvRCxNQUFNLFNBQVMsR0FBRyxnRUFBYSxDQUFDLE1BQU0sQ0FBQyxTQUFTLENBQUMsQ0FBQztJQUNsRCxNQUFNLFNBQVMsR0FBRyxnRUFBYSxDQUFDLE1BQU0sQ0FBQyxTQUFTLENBQUMsQ0FBQztJQUNsRCxJQUFJLEVBQUUsT0FBTyxFQUFFLEdBQUcsTUFBTSxDQUFDO0lBQ3pCLElBQUksQ0FBQywyREFBZSxDQUFDLE9BQU8sQ0FBQyxJQUFJLENBQUMsT0FBTyxDQUFDLFFBQVEsQ0FBQyx3REFBVSxDQUFDLFNBQVMsQ0FBQyxJQUFJLE9BQU8sQ0FBQyxRQUFRLENBQUMsd0RBQVUsQ0FBQyxTQUFTLENBQUMsQ0FBQyxFQUFFLENBQUM7UUFDcEgsT0FBTyxHQUFHLHdEQUFZLENBQUMsU0FBUyxFQUFFLE9BQU8sQ0FBQyxDQUFDO0lBQzdDLENBQUM7SUFDRCxNQUFNLEdBQUcsR0FBRyxNQUFNLCtEQUFVLENBQUMsT0FBTyxFQUFFLE1BQU0sQ0FBQyxJQUFJLElBQUksRUFBRSxFQUFFO1FBQ3ZELEdBQUcsRUFBRSxTQUFTO1FBQ2QsR0FBRyxFQUFFLFdBQVc7UUFDaEIsS0FBSyxFQUFFO1lBQ0wsTUFBTSxFQUFFLGFBQWE7U0FDdEI7S0FDRixDQUFDLENBQUM7SUFDSCxJQUFJLEdBQUcsQ0FBQyxNQUFNLEtBQUssQ0FBQyxFQUFFLENBQUM7UUFDckIsTUFBTSxJQUFJLEtBQUssQ0FBQywyQkFBMkIsR0FBRyxDQUFDLE1BQU0sRUFBRSxDQUFDLENBQUM7SUFDM0QsQ0FBQztBQUNILENBQUM7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7O0FDdENEOzs7Ozs7O0dBT0c7QUFFMkM7QUFDdUM7QUFDaEQ7QUFDSDtBQUNBO0FBQ2tCO0FBQ1c7QUFDUjtBQUV2RCxNQUFNLE1BQU0sR0FBRywyQ0FBTSxDQUFDLE1BQU0sQ0FBQyxnRkFBZSxDQUFDLENBQUM7QUFFdkMsS0FBSyxVQUFVLGFBQWE7SUFDakMsTUFBTSxDQUFDLElBQUksQ0FBQyxxQkFBcUIsQ0FBQztJQUNsQyxNQUFNLE9BQU8sR0FBUTtRQUNuQixPQUFPLEVBQUUsU0FBUztRQUNsQixPQUFPLEVBQUUsT0FBTyxDQUFDLEdBQUcsRUFBRTtRQUN0QixHQUFHLEVBQUUsRUFBRTtLQUNSLENBQUM7SUFFRixJQUFJLGNBQWtDLENBQUM7SUFDdkMsSUFBSSxPQUFPLENBQUMsSUFBSSxDQUFDLE1BQU0sR0FBRyxDQUFDO1FBQ3pCLGNBQWMsR0FBRyxPQUFPLENBQUMsSUFBSSxDQUFDLENBQUMsQ0FBQyxDQUFDO0lBRW5DLElBQUksYUFBaUMsQ0FBQztJQUN0QyxJQUFJLE9BQU8sQ0FBQyxJQUFJLENBQUMsTUFBTSxHQUFHLENBQUM7UUFDekIsYUFBYSxHQUFHLE9BQU8sQ0FBQyxJQUFJLENBQUMsQ0FBQyxDQUFDLENBQUM7SUFFbEMsSUFBSSxTQUFTLEdBQUcsT0FBTyxDQUFDLElBQUksQ0FBQyxNQUFNLENBQUM7SUFDcEMsSUFBSSxPQUFPLENBQUMsSUFBSSxDQUFDLE1BQU0sR0FBRyxDQUFDLEVBQUUsQ0FBQztRQUM1QixTQUFTLEdBQUcsQ0FBQyxDQUFDO1FBQ2QsTUFBTSxPQUFPLEdBQUcsT0FBTyxDQUFDLElBQUksQ0FBQyxTQUFTLENBQUMsQ0FBQztRQUN4QyxJQUFJLENBQUMsT0FBTyxDQUFDLFVBQVUsQ0FBQyxJQUFJLENBQUMsRUFBRSxDQUFDO1lBQzlCLE9BQU8sQ0FBQyxPQUFPLEdBQUcsT0FBTyxDQUFDO1lBQzFCLFNBQVMsRUFBRSxDQUFDO1FBQ2QsQ0FBQztJQUNILENBQUM7SUFFRCxPQUFPLENBQUMsR0FBRyxHQUFHLDZDQUFJLENBQUMsUUFBUSxDQUFDLE9BQU8sQ0FBQyxJQUFJLENBQUMsS0FBSyxDQUFDLFNBQVMsQ0FBQyxDQUFDLENBQUM7SUFFM0QsTUFBTSxPQUFPLEdBQUcsaURBQVEsQ0FBQyxPQUFPLENBQUMsT0FBTyxDQUFDLENBQUM7SUFDMUMsSUFBSSxDQUFDLE9BQU87UUFDVixNQUFNLEtBQUssQ0FBQyxPQUFPLFNBQVkseUJBQXlCLE9BQU8sQ0FBQyxPQUFPLFVBQVUsQ0FBQyxDQUFDO0lBRXJGLE1BQU0sR0FBRyxHQUFHLE9BQU8sQ0FBQyxPQUFPLENBQUMsQ0FBQztJQUM3QixJQUFJLEdBQUcsWUFBWSxPQUFPLEVBQUUsQ0FBQztRQUMzQixNQUFNLEdBQUcsQ0FBQztJQUNaLENBQUM7QUFDSCxDQUFDO0FBRU0sS0FBSyxVQUFVLGVBQWU7SUFDbkMsTUFBTSxDQUFDLEtBQUssQ0FBQyxrQkFBa0IseURBQVEsVUFBVSxFQUFFLDJEQUFVLENBQUMsQ0FBQztJQUUvRCxJQUFJLENBQUMsMkRBQVUsRUFBRSxDQUFDO1FBQ2hCLE1BQU0sSUFBSSxLQUFLLENBQUMsaUNBQWlDLENBQUMsQ0FBQztJQUNyRCxDQUFDO0lBRUQsTUFBTSxNQUFNLEdBQUcsSUFBSSx3RUFBaUIsQ0FBQywyREFBVSxDQUFDLENBQUM7SUFDakQsTUFBTSxNQUFNLEdBQUcsSUFBSSxnRUFBYSxDQUFDLEdBQUcsR0FBRyx5REFBUSxFQUFFLE1BQU0sQ0FBQyxDQUFDO0lBRXpELDJEQUFVLENBQUMsRUFBRSxDQUFDLFNBQVMsRUFBRSxDQUFDLE9BQU8sRUFBRSxFQUFFLENBQUMsTUFBTSxDQUFDLFdBQVcsQ0FBQyxNQUFNLEVBQUUsT0FBTyxDQUFDLENBQUMsQ0FBQztBQUM3RSxDQUFDO0FBRU0sU0FBUyxTQUFTO0lBQ3ZCLElBQUksQ0FBQywyREFBWSxFQUFFO1FBQ2pCLE9BQU87SUFFVCxpRUFBYSxFQUFFLENBQUM7SUFFaEIsSUFBSSxDQUFDLDZEQUFZLEVBQUUsQ0FBQztRQUNsQixlQUFlLEVBQUUsQ0FBQztRQUNsQixPQUFPO0lBQ1QsQ0FBQztJQUVELGFBQWEsRUFBRSxDQUFDLElBQUksQ0FBQyxHQUFHLEVBQUUsQ0FBQyxPQUFPLENBQUMsSUFBSSxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsS0FBSyxDQUFDLENBQUMsQ0FBQyxFQUFFLEVBQUU7UUFDdEQsSUFBSSxDQUFDLFlBQVksS0FBSztZQUNwQixNQUFNLENBQUMsS0FBSyxDQUFDLENBQUMsQ0FBQyxLQUFLLENBQUMsQ0FBQzs7WUFFdEIsTUFBTSxDQUFDLEtBQUssQ0FBQyxDQUFDLENBQUMsQ0FBQztRQUNsQixPQUFPLENBQUMsSUFBSSxDQUFDLENBQUMsQ0FBQyxDQUFDO0lBQ2xCLENBQUMsQ0FBQyxDQUFDO0FBQ0wsQ0FBQzs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7O0FDekZEOzs7Ozs7O0dBT0c7QUFFa0U7QUFDRjtBQUNkO0FBQ047QUFDTTtBQUNFO0FBQ0Y7QUFDTjtBQUNBO0FBQ1M7QUFDNEM7QUFFakQ7QUFFNUMsU0FBUyxhQUFhO0lBQzNCLDZEQUFZLENBQUMsY0FBYyxDQUFDLGdFQUFnQixDQUFDLElBQUksRUFBRSxnRUFBZ0IsQ0FBQyxRQUFRLENBQUMsQ0FBQztJQUM5RSw2REFBWSxDQUFDLGNBQWMsQ0FBQyw0REFBWSxDQUFDLElBQUksRUFBRSw0REFBWSxDQUFDLFFBQVEsQ0FBQyxDQUFDO0lBQ3RFLDZEQUFZLENBQUMsY0FBYyxDQUFDLDRFQUFvQixDQUFDLElBQUksRUFBRSw0RUFBb0IsQ0FBQyxRQUFRLENBQUMsQ0FBQztJQUN0Riw2REFBWSxDQUFDLGNBQWMsQ0FBQyw4REFBYSxDQUFDLElBQUksRUFBRSw4REFBYSxDQUFDLFFBQVEsQ0FBQyxDQUFDO0lBQ3hFLDZEQUFZLENBQUMsY0FBYyxDQUFDLHdEQUFVLENBQUMsSUFBSSxFQUFFLHdEQUFVLENBQUMsUUFBUSxDQUFDLENBQUM7SUFDbEUsNkRBQVksQ0FBQyxjQUFjLENBQUMsOERBQWEsQ0FBQyxJQUFJLEVBQUUsOERBQWEsQ0FBQyxRQUFRLENBQUMsQ0FBQztJQUN4RSw2REFBWSxDQUFDLGNBQWMsQ0FBQyxnRUFBYyxDQUFDLElBQUksRUFBRSxnRUFBYyxDQUFDLFFBQVEsQ0FBQyxDQUFDO0lBQzFFLDZEQUFZLENBQUMsY0FBYyxDQUFDLDhEQUFhLENBQUMsSUFBSSxFQUFFLDhEQUFhLENBQUMsUUFBUSxDQUFDLENBQUM7SUFDeEUsNkRBQVksQ0FBQyxjQUFjLENBQUMsd0RBQVUsQ0FBQyxJQUFJLEVBQUUsd0RBQVUsQ0FBQyxRQUFRLENBQUMsQ0FBQztJQUNsRSw2REFBWSxDQUFDLGNBQWMsQ0FBQyx3REFBVSxDQUFDLElBQUksRUFBRSx3REFBVSxDQUFDLFFBQVEsQ0FBQyxDQUFDO0lBQ2xFLDZEQUFZLENBQUMsY0FBYyxDQUFDLHVEQUFPLENBQUMsSUFBSSxFQUFFLHVEQUFPLENBQUMsUUFBUSxDQUFDLENBQUM7SUFDNUQsNkRBQVksQ0FBQyxjQUFjLENBQUMsd0RBQVEsQ0FBQyxJQUFJLEVBQUUsd0RBQVEsQ0FBQyxRQUFRLENBQUMsQ0FBQztJQUM5RCw2REFBWSxDQUFDLGNBQWMsQ0FBQyxxREFBVSxDQUFDLElBQUksRUFBRSxxREFBVSxDQUFDLFFBQVEsQ0FBQyxDQUFDO0lBQ2xFLDZEQUFZLENBQUMsY0FBYyxDQUFDLHdEQUFhLENBQUMsSUFBSSxFQUFFLHdEQUFhLENBQUMsUUFBUSxDQUFDLENBQUM7SUFDeEUsNkRBQVksQ0FBQyxjQUFjLENBQUMsd0RBQWEsQ0FBQyxJQUFJLEVBQUUsd0RBQWEsQ0FBQyxRQUFRLENBQUMsQ0FBQztJQUN4RSw2REFBWSxDQUFDLGNBQWMsQ0FBQyx3REFBYSxDQUFDLElBQUksRUFBRSx3REFBYSxDQUFDLFFBQVEsQ0FBQyxDQUFDO0lBQ3hFLDZEQUFZLENBQUMsY0FBYyxDQUFDLHFEQUFVLENBQUMsSUFBSSxFQUFFLHFEQUFVLENBQUMsUUFBUSxDQUFDLENBQUM7QUFDcEUsQ0FBQzs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7QUN6Q0Q7Ozs7Ozs7R0FPRztBQUVILElBQVksV0FHWDtBQUhELFdBQVksV0FBVztJQUNyQix3QkFBUztJQUNULDBCQUFXO0FBQ2IsQ0FBQyxFQUhXLFdBQVcsS0FBWCxXQUFXLFFBR3RCO0FBQUEsQ0FBQztBQUVGLDhEQUE4RDtBQUM5RCxJQUFZLFNBWVg7QUFaRCxXQUFZLFNBQVM7SUFDbkIsbUNBQW1DO0lBQ25DLGtDQUFxQjtJQUVyQixtQ0FBbUM7SUFDbkMsMEJBQWE7SUFFYiwwQ0FBMEM7SUFDMUMsMEJBQWE7SUFFYixvQ0FBb0M7SUFDcEMsOEJBQWlCO0FBQ25CLENBQUMsRUFaVyxTQUFTLEtBQVQsU0FBUyxRQVlwQjtBQUFBLENBQUM7QUFFRixrREFBa0Q7QUFDbEQsSUFBWSxTQVlYO0FBWkQsV0FBWSxTQUFTO0lBQ25CLDREQUE0RDtJQUM1RCw0QkFBZTtJQUVmLG9EQUFvRDtJQUNwRCxnQ0FBbUI7SUFFbkIsaUVBQWlFO0lBQ2pFLDhDQUFpQztJQUVqQywyREFBMkQ7SUFDM0Qsc0NBQXlCO0FBQzNCLENBQUMsRUFaVyxTQUFTLEtBQVQsU0FBUyxRQVlwQjtBQUFBLENBQUM7QUFFRiw4REFBOEQ7QUFDdkQsTUFBTSxlQUFlLEdBQUcsZ0JBQWdCLENBQUM7QUFFaEQsSUFBWSxhQUdYO0FBSEQsV0FBWSxhQUFhO0lBQ3ZCLG9FQUFvRTtJQUNwRSxpREFBZ0M7QUFDbEMsQ0FBQyxFQUhXLGFBQWEsS0FBYixhQUFhLFFBR3hCO0FBQUEsQ0FBQztBQUVGLG9FQUFvRTtBQUM3RCxNQUFNLGlCQUFpQixHQUFrQixhQUFhLENBQUMsYUFBYSxDQUFDOzs7Ozs7Ozs7Ozs7Ozs7O0FDckQ1RTs7Ozs7OztHQU9HO0FBRTZDO0FBRXpDLFNBQVMsY0FBYyxDQUFDLEdBQVE7SUFDckMsSUFBSSxLQUFLLENBQUMsT0FBTyxDQUFDLEdBQUcsQ0FBQztRQUNwQixPQUFPLEdBQUcsQ0FBQyxHQUFHLENBQUMsQ0FBQyxDQUFDLEVBQUUsQ0FBQyxjQUFjLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxJQUFJLENBQUMsR0FBRyxDQUFDLENBQUM7SUFFbkQsSUFBSSxPQUFPLEdBQUcsS0FBSyxTQUFTO1FBQzFCLE9BQU8sR0FBRyxDQUFDLENBQUMsQ0FBQyx5REFBVyxDQUFDLEVBQUUsQ0FBQyxDQUFDLENBQUMseURBQVcsQ0FBQyxHQUFHLENBQUM7SUFFaEQsT0FBTyxHQUFHLENBQUMsUUFBUSxFQUFFLENBQUM7QUFDeEIsQ0FBQzs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7OztBQ25CRDs7Ozs7OztHQU9HO0FBRXNCO0FBQ0E7QUFDSTtBQUVxQjtBQUNnQztBQUNsQztBQUNaO0FBRXBDLFNBQVMsU0FBUyxDQUFDLEdBQVcsRUFBRSxHQUFRO0lBQ3RDLE1BQU0sR0FBRyxHQUFRO1FBQ2Ysb0JBQW9CLEVBQUUsdURBQVMsQ0FBQyxJQUFJO1FBQ3BDLG9CQUFvQixFQUFFLHVEQUFTLENBQUMsUUFBUTtLQUN6QyxDQUFDO0lBRUYsSUFBSSxPQUFPLEdBQUcsS0FBSyxTQUFTO1FBQzFCLE9BQU8sdURBQVMsQ0FBQyxJQUFJLENBQUM7SUFFeEIsSUFBSSxHQUFHLENBQUMsY0FBYyxDQUFDLEdBQUcsQ0FBQztRQUN6QixPQUFPLEdBQUcsQ0FBQyxHQUFHLENBQUMsQ0FBQztJQUVsQixPQUFPLHVEQUFTLENBQUMsTUFBTSxDQUFDO0FBQzFCLENBQUM7QUFFRCxTQUFTLGVBQWUsQ0FBQyxHQUFXLEVBQUUsR0FBUSxFQUFFLE9BQWdCO0lBQzlELElBQUksSUFBSSxHQUFHLEdBQUcsQ0FBQztJQUNmLElBQUksT0FBTztRQUNULElBQUksSUFBSSxHQUFHLEdBQUcsU0FBUyxDQUFDLEdBQUcsRUFBRSxHQUFHLENBQUMsQ0FBQztJQUNwQyxPQUFPLElBQUksR0FBRyxHQUFHLEdBQUcsNkRBQWMsQ0FBQyxHQUFHLENBQUMsQ0FBQztBQUMxQyxDQUFDO0FBRUQsU0FBUyxnQkFBZ0IsQ0FBQyxTQUFpQixFQUFFLE9BQWdCO0lBQzNELE1BQU0sTUFBTSxHQUFhLEVBQUUsQ0FBQztJQUM1QixLQUFLLE1BQU0sQ0FBQyxHQUFHLEVBQUUsR0FBRyxDQUFDLElBQUksTUFBTSxDQUFDLE9BQU8sQ0FBQyxTQUFTLENBQUM7UUFDaEQsTUFBTSxDQUFDLElBQUksQ0FBQyxJQUFJLEVBQUUsZUFBZSxDQUFDLEdBQUcsRUFBRSxHQUFHLEVBQUUsT0FBTyxDQUFDLENBQUMsQ0FBQztJQUN4RCxPQUFPLE1BQU0sQ0FBQztBQUNoQixDQUFDO0FBS0EsQ0FBQztBQUVLLE1BQU0sWUFBWTtJQUNmLFVBQVUsQ0FBUztJQUUzQixZQUFtQixTQUFpQjtRQUNsQyxJQUFJLENBQUMsVUFBVSxHQUFHLFNBQVMsQ0FBQztJQUM5QixDQUFDO0lBRU0sS0FBSyxDQUFDLFVBQVUsQ0FBQyxVQUFrQixFQUFFLFNBQWlCLEVBQUUsT0FBMkI7UUFDeEYsTUFBTSxTQUFTLEdBQUc7WUFDaEIsR0FBRyxnQkFBZ0IsQ0FBQyxTQUFTLEVBQUUsS0FBSyxDQUFDO1lBQ3JDLElBQUksRUFBRSxVQUFVO1NBQ2pCLENBQUM7UUFDRixNQUFNLEdBQUcsR0FBUSxNQUFNLCtEQUFVLENBQUMsSUFBSSxDQUFDLFVBQVUsRUFBRSxTQUFTLEVBQUU7WUFDNUQsR0FBRyxFQUFFLE9BQU8sRUFBRSxPQUFPO1lBQ3JCLEdBQUcsRUFBRSxPQUFPLEVBQUUsV0FBVyxJQUFJLE9BQU8sQ0FBQyxHQUFHO1NBQ3pDLENBQUMsQ0FBQztRQUNILElBQUksR0FBRyxDQUFDLE1BQU0sS0FBSyxDQUFDLEVBQUUsQ0FBQztZQUNyQixNQUFNLG9DQUFvQyxHQUFHLENBQUMsTUFBTSxFQUFFLENBQUM7UUFDekQsQ0FBQztJQUNILENBQUM7SUFFTSxLQUFLLENBQUMsU0FBUyxDQUFDLElBQVM7UUFDOUIsTUFBTSxTQUFTLEdBQUc7WUFDaEIsSUFBSSxFQUFFLElBQUksQ0FBQyxTQUFTO1lBQ3BCLEdBQUcsZ0JBQWdCLENBQUMsSUFBSSxDQUFDLGNBQWMsRUFBRSxJQUFJLENBQUM7WUFDOUMsSUFBSSxFQUFFLElBQUksQ0FBQyxTQUFTO1lBQ3BCLElBQUksRUFBRSxJQUFJLENBQUMsU0FBUztTQUNyQixDQUFDO1FBRUYsTUFBTSxHQUFHLEdBQVEsTUFBTSwrREFBVSxDQUFDLElBQUksQ0FBQyxVQUFVLEVBQUUsU0FBUyxFQUFFO1lBQzVELEdBQUcsRUFBRSxJQUFJLENBQUMsU0FBUztZQUNuQixHQUFHLEVBQUUsSUFBSSxDQUFDLFdBQVcsSUFBSSxPQUFPLENBQUMsR0FBRztZQUNwQyxLQUFLLEVBQUU7Z0JBQ0wsTUFBTSxFQUFFLHFCQUFxQjthQUM5QjtTQUNGLENBQUMsQ0FBQztRQUNILElBQUksR0FBRyxDQUFDLE1BQU0sS0FBSyxDQUFDLEVBQUUsQ0FBQztZQUNyQixNQUFNLG1DQUFtQyxHQUFHLENBQUMsTUFBTSxFQUFFLENBQUM7UUFDeEQsQ0FBQztJQUNILENBQUM7SUFFTSxLQUFLLENBQUMsS0FBSyxDQUFDLElBQVM7UUFDMUIsTUFBTSxJQUFJLENBQUMsU0FBUyxDQUFDLElBQUksQ0FBQyxDQUFDO1FBRTNCLE1BQU0sU0FBUyxHQUFhO1lBQzFCLFNBQVMsRUFBRSxHQUFHO1lBQ2QsWUFBWSxFQUFFLG1FQUF1QixFQUFFLENBQUMsUUFBUSxFQUFFO1NBQ25ELENBQUM7UUFDRixNQUFNLEdBQUcsR0FBUSxNQUFNLCtEQUFVLENBQUMsSUFBSSxDQUFDLFVBQVUsRUFBRSxTQUFTLEVBQUU7WUFDNUQsR0FBRyxFQUFFLElBQUksQ0FBQyxTQUFTO1lBQ25CLEdBQUcsRUFBRSxJQUFJLENBQUMsV0FBVyxJQUFJLE9BQU8sQ0FBQyxHQUFHO1lBQ3BDLEtBQUssRUFBRTtnQkFDTCxNQUFNLEVBQUUsaUJBQWlCO2FBQzFCO1NBQ0YsQ0FBQyxDQUFDO1FBQ0gsSUFBSSxHQUFHLENBQUMsTUFBTSxLQUFLLENBQUMsRUFBRSxDQUFDO1lBQ3JCLE1BQU0sK0JBQStCLEdBQUcsQ0FBQyxNQUFNLEVBQUUsQ0FBQztRQUNwRCxDQUFDO0lBQ0gsQ0FBQztJQUVNLEtBQUssQ0FBQyxPQUFPLENBQUMsSUFBUztRQUM1QixNQUFNLElBQUksQ0FBQyxTQUFTLENBQUMsSUFBSSxDQUFDLENBQUM7UUFFM0IsTUFBTSxTQUFTLEdBQUc7WUFDaEIsV0FBVztZQUNYLEdBQUc7U0FDSixDQUFDO1FBQ0YsSUFBSSxJQUFJLENBQUMsVUFBVSxFQUFFLENBQUM7WUFDcEIsU0FBUyxDQUFDLElBQUksQ0FBQyxVQUFVLEVBQUUsSUFBSSxDQUFDLFVBQVUsQ0FBQyxDQUFDO1FBQzlDLENBQUM7UUFDRCxNQUFNLEdBQUcsR0FBUSxNQUFNLCtEQUFVLENBQUMsSUFBSSxDQUFDLFVBQVUsRUFBRSxTQUFTLEVBQUU7WUFDNUQsR0FBRyxFQUFFLElBQUksQ0FBQyxTQUFTO1lBQ25CLEdBQUcsRUFBRSxJQUFJLENBQUMsV0FBVyxJQUFJLE9BQU8sQ0FBQyxHQUFHO1lBQ3BDLEtBQUssRUFBRTtnQkFDTCxNQUFNLEVBQUUsbUJBQW1CO2FBQzVCO1NBQ0YsQ0FBQyxDQUFDO1FBQ0gsSUFBSSxHQUFHLENBQUMsTUFBTSxLQUFLLENBQUMsRUFBRSxDQUFDO1lBQ3JCLE1BQU0saUNBQWlDLEdBQUcsQ0FBQyxNQUFNLEVBQUUsQ0FBQztRQUN0RCxDQUFDO0lBQ0gsQ0FBQztJQUVNLEtBQUssQ0FBQyxPQUFPLENBQUMsSUFBUztRQUM1QixNQUFNLFNBQVMsR0FBRyxDQUFFLElBQUksRUFBRSxLQUFLLEVBQUUsTUFBTSxFQUFFLElBQUksQ0FBQyxRQUFRLENBQUUsQ0FBQztRQUN6RCxNQUFNLEdBQUcsR0FBUSxNQUFNLCtEQUFVLENBQUMsSUFBSSxDQUFDLFVBQVUsRUFBRSxTQUFTLEVBQUU7WUFDNUQsR0FBRyxFQUFFLElBQUksQ0FBQyxPQUFPLElBQUksSUFBSSxDQUFDLFNBQVMsSUFBSSxJQUFJLENBQUMsU0FBUztZQUNyRCxHQUFHLEVBQUUsSUFBSSxDQUFDLFdBQVcsSUFBSSxPQUFPLENBQUMsR0FBRztZQUNwQyxLQUFLLEVBQUU7Z0JBQ0wsTUFBTSxFQUFFLElBQUksQ0FBQyxPQUFPLElBQUksbUJBQW1CO2FBQzVDO1NBQ0YsQ0FBQyxDQUFDO1FBQ0gsSUFBSSxHQUFHLENBQUMsTUFBTSxLQUFLLENBQUMsRUFBRSxDQUFDO1lBQ3JCLE1BQU0sMkJBQTJCLEdBQUcsQ0FBQyxNQUFNLEVBQUUsQ0FBQztRQUNoRCxDQUFDO0lBQ0gsQ0FBQztDQUNGO0FBQUEsQ0FBQztBQUVGLElBQUksY0FBNEIsQ0FBQztBQUNqQyxXQUFpQixZQUFZO0lBQzNCLFNBQWdCLFdBQVc7UUFDekIsSUFBSSxDQUFDLGNBQWM7WUFDakIsY0FBYyxHQUFHLElBQUksWUFBWSxDQUFDLE9BQU8sR0FBRyw2Q0FBSSxDQUFDLGdCQUFnQixDQUFDLENBQUM7UUFDckUsT0FBTyxjQUFjLENBQUM7SUFDeEIsQ0FBQztJQUplLHdCQUFXLGNBSTFCO0FBQ0gsQ0FBQyxFQU5nQixZQUFZLEtBQVosWUFBWSxRQU01QjtBQUVNLE1BQU0sWUFBWTtJQUNmLFVBQVUsQ0FBUztJQUUzQixZQUFtQixTQUFpQjtRQUNsQyxJQUFJLENBQUMsVUFBVSxHQUFHLFNBQVMsQ0FBQztJQUM5QixDQUFDO0lBRU0sS0FBSyxDQUFDLEtBQUssQ0FBQyxJQUFTO1FBQzFCLE1BQU0sU0FBUyxHQUFhLEVBQUUsQ0FBQztRQUMvQixNQUFNLEdBQUcsR0FBUSxNQUFNLCtEQUFVLENBQUMsSUFBSSxDQUFDLFVBQVUsRUFBRSxTQUFTLEVBQUU7WUFDNUQsR0FBRyxFQUFFLElBQUksQ0FBQyxTQUFTO1lBQ25CLEdBQUcsRUFBRSxJQUFJLENBQUMsV0FBVyxJQUFJLE9BQU8sQ0FBQyxHQUFHO1lBQ3BDLEtBQUssRUFBRTtnQkFDTCxNQUFNLEVBQUUsaUJBQWlCO2FBQzFCO1NBQ0YsQ0FBQyxDQUFDO1FBQ0gsSUFBSSxHQUFHLENBQUMsTUFBTSxLQUFLLENBQUMsRUFBRSxDQUFDO1lBQ3JCLE1BQU0seUJBQXlCLEdBQUcsQ0FBQyxNQUFNLEVBQUUsQ0FBQztRQUM5QyxDQUFDO0lBQ0gsQ0FBQztDQUNGO0FBQUEsQ0FBQztBQUVGLElBQUksY0FBNEIsQ0FBQztBQUNqQyxXQUFpQixZQUFZO0lBQzNCLFNBQWdCLFdBQVc7UUFDekIsSUFBSSxDQUFDLGNBQWM7WUFDakIsY0FBYyxHQUFHLElBQUksWUFBWSxDQUFDLE9BQU8sR0FBRyw2Q0FBSSxDQUFDLGdCQUFnQixDQUFDLENBQUM7UUFDckUsT0FBTyxjQUFjLENBQUM7SUFDeEIsQ0FBQztJQUplLHdCQUFXLGNBSTFCO0FBQ0gsQ0FBQyxFQU5nQixZQUFZLEtBQVosWUFBWSxRQU01QjtBQUVNLEtBQUssVUFBVSxjQUFjLENBQUMsTUFBYztJQUNqRCxNQUFNLElBQUksR0FBRyxNQUFNLHVEQUFXLENBQUMsSUFBSSxDQUFDLE1BQU0sQ0FBQyxDQUFDO0lBQzVDLElBQUksSUFBSSxDQUFDLFdBQVcsRUFBRTtRQUNwQixNQUFNLEdBQUcsd0RBQVksQ0FBQyxNQUFNLEVBQUUsNkRBQWUsQ0FBQyxDQUFDO0lBQ2pELE1BQU0sT0FBTyxHQUFHLE1BQU0sdURBQVcsQ0FBQyxRQUFRLENBQUMsTUFBTSxFQUFFLEVBQUUsUUFBUSxFQUFFLE1BQU0sRUFBRSxDQUFDLENBQUM7SUFFekUsTUFBTSxjQUFjLEdBQUcsaUNBQWlDLENBQUM7SUFDekQsTUFBTSxjQUFjLEdBQUcsa0JBQWtCLENBQUM7SUFFMUMsTUFBTSxNQUFNLEdBQVEsRUFBRSxDQUFDO0lBQ3ZCLElBQUksS0FBSyxHQUFHLE9BQU8sQ0FBQyxLQUFLLENBQUMsY0FBYyxDQUFDLENBQUM7SUFDMUMsSUFBSSxLQUFLLEVBQUUsQ0FBQztRQUNWLE1BQU0sQ0FBQyxJQUFJLEdBQUcsS0FBSyxDQUFDLENBQUMsQ0FBQyxDQUFDO1FBQ3ZCLE1BQU0sY0FBYyxHQUFHLEtBQUssQ0FBQyxDQUFDLENBQUMsQ0FBQztRQUNoQyxLQUFLLEdBQUcsY0FBYyxDQUFDLEtBQUssQ0FBQyxjQUFjLENBQUMsQ0FBQztRQUM3QyxJQUFJLEtBQUs7WUFDUCxNQUFNLENBQUMsT0FBTyxHQUFHLEtBQUssQ0FBQyxDQUFDLENBQUMsQ0FBQztJQUM5QixDQUFDO0lBRUQsT0FBTyxNQUFNLENBQUM7QUFDaEIsQ0FBQztBQUVNLFNBQVMsa0JBQWtCLENBQUMsSUFBWTtJQUM3QyxPQUFPLElBQUksR0FBRyxJQUFJLENBQUM7QUFDckIsQ0FBQztBQUVNLFNBQVMscUJBQXFCLENBQUMsSUFBWTtJQUNoRCxPQUFPLFVBQVUsSUFBSSxRQUFRLENBQUM7QUFDaEMsQ0FBQztBQUVNLFNBQVMsMEJBQTBCLENBQUMsUUFBZ0I7SUFDekQsT0FBTyxrQkFBa0IsQ0FBQyxpQkFBaUIsR0FBRyx5REFBYSxDQUFDLFFBQVEsQ0FBQyxDQUFDLENBQUM7QUFDekUsQ0FBQztBQUU0Qjs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7QUMvTjdCOzs7Ozs7O0dBT0c7QUFFc0I7QUFDRTtBQUVZO0FBQ0g7QUFDVTtBQUN3QjtBQUNaO0FBQ007QUFDaUI7QUFDYjtBQUNsQjtBQUNGO0FBQ0c7QUFFakI7QUFDYztBQUNGO0FBRWQ7QUFFaEMsTUFBTSxNQUFNLEdBQUcsNENBQU0sQ0FBQyxNQUFNLENBQUMsaUZBQWUsQ0FBQyxDQUFDO0FBSzdDLENBQUM7QUFFRixTQUFTLGdCQUFnQixDQUFDLEdBQUcsSUFBUztJQUNwQyxNQUFNLFdBQVcsR0FBUSxFQUFFLENBQUM7SUFDNUIsS0FBSyxNQUFNLEdBQUcsSUFBSSxJQUFJLEVBQUUsQ0FBQztRQUN2QixNQUFNLElBQUksR0FBUSxNQUFNLENBQUMsT0FBTyxDQUFDLEdBQUcsSUFBSSxFQUFFLENBQUMsQ0FBQztRQUM1QyxPQUFPLElBQUksQ0FBQyxNQUFNLEVBQUUsQ0FBQztZQUNuQixJQUFJLENBQUMsR0FBRyxFQUFDLEdBQUcsQ0FBQyxHQUFHLElBQUksQ0FBQyxHQUFHLEVBQUUsQ0FBQztZQUMzQixJQUFJLFNBQVMsQ0FBQztZQUNkLElBQUksU0FBUyxHQUFHLElBQUksQ0FBQztZQUNyQixRQUFRLEdBQUcsRUFBRSxDQUFDO2dCQUNkLEtBQUssTUFBTSxDQUFDO2dCQUNaLEtBQUssTUFBTTtvQkFDVCxTQUFTLEdBQUcsNkNBQUksQ0FBQyxTQUFTLENBQUM7b0JBQzNCLFNBQVMsR0FBRyxLQUFLLENBQUM7b0JBQ2xCLE1BQU07Z0JBQ1IsS0FBSyxRQUFRLENBQUM7Z0JBQ2QsS0FBSyxVQUFVLENBQUM7Z0JBQ2hCLEtBQUssU0FBUztvQkFDWixTQUFTLEdBQUcsR0FBRyxDQUFDO29CQUNoQixNQUFNO1lBQ1IsQ0FBQztZQUNELElBQUksT0FBTyxHQUFHLEtBQUssUUFBUTtnQkFDekIsR0FBRyxHQUFHLEdBQUcsQ0FBQyxRQUFRLEVBQUUsQ0FBQztpQkFDbEIsSUFBSSxLQUFLLENBQUMsT0FBTyxDQUFDLEdBQUcsQ0FBQztnQkFDekIsR0FBRyxHQUFHLEdBQUcsQ0FBQyxJQUFJLENBQUMsU0FBUyxDQUFDLENBQUM7WUFDNUIsSUFBSSxDQUFDLFNBQVMsSUFBSSxDQUFDLFdBQVcsQ0FBQyxHQUFHLENBQUM7Z0JBQ2pDLFdBQVcsQ0FBQyxHQUFHLENBQUMsR0FBRyxHQUFHLENBQUM7aUJBQ3BCLElBQUksU0FBUztnQkFDaEIsV0FBVyxDQUFDLEdBQUcsQ0FBQyxHQUFHLEdBQUcsR0FBRyxTQUFTLEdBQUcsV0FBVyxDQUFDLEdBQUcsQ0FBQyxDQUFDOztnQkFFdEQsV0FBVyxDQUFDLEdBQUcsQ0FBQyxHQUFHLFdBQVcsQ0FBQyxHQUFHLENBQUMsR0FBRyxTQUFTLEdBQUcsR0FBRyxDQUFDO1FBQzFELENBQUM7SUFDSCxDQUFDO0lBQ0QsT0FBTyxXQUFXLENBQUM7QUFDckIsQ0FBQztBQUVELFNBQVMsWUFBWSxDQUFDLE1BQVc7SUFDL0IsTUFBTSxVQUFVLEdBQVEsRUFBRSxDQUFDO0lBQzNCLE1BQU0sV0FBVyxHQUFRLEVBQUUsQ0FBQztJQUU1QixLQUFLLE1BQU0sQ0FBQyxHQUFHLEVBQUUsS0FBSyxDQUFDLElBQUksTUFBTSxDQUFDLE9BQU8sQ0FBQyxNQUFNLENBQVEsRUFBRSxDQUFDO1FBQ3pELENBQUMsS0FBSyxDQUFDLElBQUksQ0FBQyxDQUFDLENBQUMsV0FBVyxDQUFDLENBQUMsQ0FBQyxVQUFVLENBQUMsQ0FBQyxHQUFHLENBQUMsR0FBRyxLQUFLLENBQUM7SUFDdkQsQ0FBQztJQUVELE9BQU8sSUFBSSxFQUFFLENBQUM7UUFDWixNQUFNLElBQUksR0FBRyxNQUFNLENBQUMsSUFBSSxDQUFDLFdBQVcsQ0FBQyxDQUFDO1FBQ3RDLElBQUksSUFBSSxDQUFDLE1BQU0sSUFBSSxDQUFDO1lBQ2xCLE1BQU07UUFDUixNQUFNLFFBQVEsR0FBRyxFQUFFLENBQUM7UUFDcEIsS0FBSyxNQUFNLEdBQUcsSUFBSSxJQUFJLEVBQUUsQ0FBQztZQUN2QixNQUFNLFNBQVMsR0FBRyxXQUFXLENBQUMsR0FBRyxDQUFDLENBQUM7WUFDbkMsTUFBTSxRQUFRLEdBQUcsRUFBRSxDQUFDO1lBQ3BCLEtBQUssTUFBTSxJQUFJLElBQUksK0RBQVksQ0FBQyxTQUFTLENBQUMsSUFBSSxDQUFDLEVBQUUsQ0FBQztnQkFDaEQsTUFBTSxTQUFTLEdBQUcsVUFBVSxDQUFDLElBQUksQ0FBQyxDQUFDO2dCQUNuQyxJQUFJLENBQUMsU0FBUyxFQUFFLENBQUM7b0JBQ2YsUUFBUSxDQUFDLE1BQU0sR0FBRyxDQUFDLENBQUM7b0JBQ3BCLE1BQU07Z0JBQ1IsQ0FBQztnQkFDRCxRQUFRLENBQUMsSUFBSSxDQUFDLFNBQVMsQ0FBQyxDQUFDO1lBQzNCLENBQUM7WUFDRCxJQUFJLFFBQVEsQ0FBQyxNQUFNLEVBQUUsQ0FBQztnQkFDcEIsUUFBUSxDQUFDLElBQUksQ0FBQyxTQUFTLENBQUMsQ0FBQztnQkFDekIsSUFBSSxRQUFRLEdBQUcsRUFBRSxDQUFDO2dCQUNsQixLQUFLLE1BQU0sSUFBSSxJQUFJLFFBQVEsRUFBRSxDQUFDO29CQUM1QiwrREFBWSxDQUFDLFFBQVEsRUFBRSxJQUFJLENBQUMsQ0FBQztnQkFDL0IsQ0FBQztnQkFDRCxVQUFVLENBQUMsR0FBRyxDQUFDLEdBQUcsUUFBUSxDQUFDO2dCQUMzQixRQUFRLENBQUMsSUFBSSxDQUFDLEdBQUcsQ0FBQyxDQUFDO1lBQ3JCLENBQUM7UUFDSCxDQUFDO1FBQ0QsSUFBSSxRQUFRLENBQUMsTUFBTSxJQUFJLENBQUMsRUFBRSxDQUFDO1lBQ3pCLEtBQUssTUFBTSxHQUFHLElBQUksSUFBSTtnQkFDcEIsTUFBTSw4QkFBOEIsR0FBRyxFQUFFLENBQUM7UUFDOUMsQ0FBQztRQUNELEtBQUssTUFBTSxHQUFHLElBQUksUUFBUSxFQUFFLENBQUM7WUFDM0IsT0FBTyxVQUFVLENBQUMsR0FBRyxDQUFDLENBQUMsSUFBSSxDQUFDO1lBQzVCLE9BQU8sV0FBVyxDQUFDLEdBQUcsQ0FBQyxDQUFDO1FBQzFCLENBQUM7SUFDSCxDQUFDO0lBRUQsT0FBTyxVQUFVLENBQUM7QUFDcEIsQ0FBQztBQUVELFNBQVMseUJBQXlCLENBQUMsTUFBVyxFQUFFLFdBQWdCLEVBQUUsVUFBZSxFQUFFLEdBQVE7SUFDekYsT0FBTyxHQUFHLENBQUMsT0FBTyxDQUFDLGdCQUFnQixFQUFFLENBQUMsS0FBVSxFQUFFLEtBQVUsRUFBRSxFQUFFO1FBQzlELElBQUksR0FBRyxDQUFDO1FBQ1IsS0FBSyxNQUFNLElBQUksSUFBSSxLQUFLLENBQUMsS0FBSyxDQUFDLEdBQUcsQ0FBQyxFQUFFLENBQUM7WUFDcEMsSUFBSSxHQUFHLEtBQUssU0FBUyxFQUFFLENBQUM7Z0JBQ3RCLElBQUksTUFBTSxDQUFDLGNBQWMsQ0FBQyxJQUFJLENBQUM7b0JBQzdCLEdBQUcsR0FBRyxNQUFNLENBQUMsSUFBSSxDQUFDLENBQUM7cUJBQ2hCLElBQUksTUFBTSxLQUFLLFdBQVcsSUFBSSxXQUFXLENBQUMsY0FBYyxDQUFDLElBQUksQ0FBQztvQkFDakUsR0FBRyxHQUFHLFdBQVcsQ0FBQyxJQUFJLENBQUMsQ0FBQztxQkFDckIsSUFBSSxNQUFNLEtBQUssVUFBVSxJQUFJLFVBQVUsQ0FBQyxjQUFjLENBQUMsSUFBSSxDQUFDO29CQUMvRCxHQUFHLEdBQUcsVUFBVSxDQUFDLElBQUksQ0FBQyxDQUFDO3FCQUNwQixDQUFDO29CQUNKLElBQUksQ0FBQzt3QkFDSCxNQUFNLFFBQVEsR0FBRyw4REFBYyxDQUFDLElBQUksQ0FBQyxDQUFDO3dCQUN0QyxJQUFJLFFBQVEsRUFBRSxDQUFDOzRCQUNiLEdBQUcsR0FBRyxFQUFFLFFBQVEsRUFBRSxPQUFPLEVBQUUsNkNBQUksQ0FBQyxPQUFPLENBQUMsUUFBUSxDQUFDLEdBQUcsQ0FBQzt3QkFDdkQsQ0FBQztvQkFDSixDQUFDO29CQUFDLE9BQU0sQ0FBQyxFQUFFLENBQUMsRUFBQztnQkFDZCxDQUFDO2dCQUNELElBQUksR0FBRyxLQUFLLFNBQVM7b0JBQ25CLE1BQU07WUFDVixDQUFDO2lCQUNJLElBQUksR0FBRyxDQUFDLGNBQWMsQ0FBQyxJQUFJLENBQUMsRUFBRSxDQUFDO2dCQUNsQyxHQUFHLEdBQUcsR0FBRyxDQUFDLElBQUksQ0FBQyxDQUFDO1lBQ2xCLENBQUM7aUJBQ0ksQ0FBQztnQkFDSixHQUFHLEdBQUcsU0FBUyxDQUFDO2dCQUNoQixNQUFNO1lBQ1IsQ0FBQztRQUNILENBQUM7UUFDRCxJQUFJLEdBQUcsS0FBSyxTQUFTO1lBQ25CLE1BQU0sSUFBSSxLQUFLLENBQUMsT0FBTyxLQUFLLDJCQUEyQixDQUFDLENBQUM7UUFDM0QsT0FBTyxHQUFHLENBQUM7SUFDYixDQUFDLENBQUMsQ0FBQztBQUNMLENBQUM7QUFFRCxTQUFTLHdCQUF3QixDQUFDLE1BQVcsRUFBRSxXQUFnQixFQUFFLFVBQWU7SUFDOUUsSUFBSSxLQUFLLEdBQUcsQ0FBQyxDQUFDO0lBQ2QsS0FBSyxNQUFNLENBQUMsR0FBRyxFQUFFLEdBQUcsQ0FBQyxJQUFJLE1BQU0sQ0FBQyxPQUFPLENBQUMsTUFBTSxDQUFDLEVBQUUsQ0FBQztRQUNoRCxJQUFJLEdBQUcsSUFBSSxPQUFPLEdBQUcsS0FBSyxRQUFRO1lBQ2hDLEtBQUssSUFBSSx3QkFBd0IsQ0FBQyxHQUFHLEVBQUUsV0FBVyxFQUFFLFVBQVUsQ0FBQyxDQUFDO2FBQzdELElBQUksT0FBTyxHQUFHLEtBQUssUUFBUSxFQUFFLENBQUM7WUFDakMsTUFBTSxDQUFDLEdBQUcseUJBQXlCLENBQUMsTUFBTSxFQUFFLFdBQVcsRUFBRSxVQUFVLEVBQUUsR0FBRyxDQUFDLENBQUM7WUFDMUUsSUFBSSxHQUFHLEtBQUssQ0FBQyxFQUFFLENBQUM7Z0JBQ2QsTUFBTSxDQUFDLEdBQUcsQ0FBQyxHQUFHLENBQUMsQ0FBQztnQkFDaEIsS0FBSyxFQUFFLENBQUM7WUFDVixDQUFDO1FBQ0gsQ0FBQztJQUNILENBQUM7SUFDRCxPQUFPLEtBQUssQ0FBQztBQUNmLENBQUM7QUFFRCxTQUFTLG9CQUFvQixDQUFDLE1BQVc7SUFDdkMsU0FBUyxDQUFDO1FBQ1IsSUFBSSxLQUFLLEdBQUcsQ0FBQyxDQUFDO1FBQ2QsS0FBSyxNQUFNLENBQUMsR0FBRyxFQUFFLEdBQUcsQ0FBQyxJQUFJLE1BQU0sQ0FBQyxPQUFPLENBQUMsTUFBTSxDQUFDLEVBQUUsQ0FBQztZQUNoRCxJQUFJLEdBQUcsSUFBSSxPQUFPLEdBQUcsS0FBSyxRQUFRO2dCQUNoQyxLQUFLLElBQUksd0JBQXdCLENBQUMsR0FBRyxFQUFFLEdBQUcsRUFBRSxNQUFNLENBQUMsQ0FBQztpQkFDaEQsSUFBSSxPQUFPLEdBQUcsS0FBSyxRQUFRLEVBQUUsQ0FBQztnQkFDbEMsTUFBTSxDQUFDLEdBQUcseUJBQXlCLENBQUMsTUFBTSxFQUFFLE1BQU0sRUFBRSxNQUFNLEVBQUUsR0FBRyxDQUFDLENBQUM7Z0JBQ2pFLElBQUksR0FBRyxLQUFLLENBQUMsRUFBRSxDQUFDO29CQUNkLE1BQU0sQ0FBQyxHQUFHLENBQUMsR0FBRyxDQUFDLENBQUM7b0JBQ2hCLEtBQUssRUFBRSxDQUFDO2dCQUNWLENBQUM7WUFDSCxDQUFDO1FBQ0gsQ0FBQztRQUNELElBQUksQ0FBQyxLQUFLO1lBQ1IsTUFBTTtJQUNWLENBQUM7QUFDSCxDQUFDO0FBRUQsU0FBUyxlQUFlLENBQUMsT0FBdUIsRUFBRSxNQUFXO0lBQzNELElBQUksTUFBTSxDQUFDLFlBQVksQ0FBQyxFQUFFLENBQUM7UUFDekIsTUFBTSxJQUFJLEtBQUssQ0FBQywrQ0FBK0MsTUFBTSxDQUFDLFVBQVUsR0FBRyxDQUFDLENBQUM7SUFDdkYsQ0FBQztJQUVELE1BQU0sVUFBVSxHQUFHLFlBQVksQ0FBQyxNQUFNLENBQUMsQ0FBQztJQUV4QyxVQUFVLENBQUMsU0FBUyxHQUFHLFVBQVUsQ0FBQyxTQUFTLElBQUksT0FBTyxDQUFDLFNBQVMsQ0FBQztJQUNqRSxVQUFVLENBQUMsVUFBVSxHQUFHLFVBQVUsQ0FBQyxVQUFVLElBQUksT0FBTyxDQUFDLE9BQU8sQ0FBQztJQUNqRSxVQUFVLENBQUMsVUFBVSxHQUFHLFVBQVUsQ0FBQyxVQUFVLElBQUksNkNBQUksQ0FBQyxJQUFJLENBQUMsT0FBTyxDQUFDLE9BQU8sRUFBRSxPQUFPLENBQUMsQ0FBQztJQUVyRixLQUFLLE1BQU0sQ0FBQyxHQUFHLEVBQUUsS0FBSyxDQUFDLElBQUksTUFBTSxDQUFDLE9BQU8sQ0FBQyxVQUFVLENBQVEsRUFBRSxDQUFDO1FBQzdELElBQUksS0FBSyxJQUFJLE9BQU8sS0FBSyxLQUFLLFFBQVEsSUFBSSxLQUFLLENBQUMsTUFBTSxFQUFFLENBQUM7WUFDdkQsS0FBSyxDQUFDLFNBQVMsR0FBRyxLQUFLLENBQUMsU0FBUyxJQUFJLFVBQVUsQ0FBQyxTQUFTLENBQUM7WUFDMUQsTUFBTSxNQUFNLEdBQUcsR0FBRyxDQUFDLE9BQU8sQ0FBQyxHQUFHLEVBQUUsNkNBQUksQ0FBQyxHQUFHLENBQUMsQ0FBQztZQUMxQyxNQUFNLE9BQU8sR0FBRyw2Q0FBSSxDQUFDLElBQUksQ0FBQyxVQUFVLENBQUMsVUFBVSxFQUFFLE1BQU0sQ0FBQyxDQUFDO1lBQ3pELEtBQUssQ0FBQyxPQUFPLEdBQUcsS0FBSyxDQUFDLE9BQU8sSUFBSSw2Q0FBSSxDQUFDLElBQUksQ0FBQyxPQUFPLEVBQUUsS0FBSyxDQUFDLENBQUM7WUFDM0QsSUFBSSxLQUFLLENBQUMsU0FBUyxFQUFFLENBQUM7Z0JBQ3BCLElBQUksS0FBSyxDQUFDLFNBQVMsQ0FBQyxVQUFVLENBQUMsNERBQWEsQ0FBQyxFQUFFLENBQUM7b0JBQzlDLE1BQU0sUUFBUSxHQUFHLDhEQUFjLENBQUMsS0FBSyxDQUFDLFNBQVMsQ0FBQyxLQUFLLENBQUMsNERBQWEsQ0FBQyxNQUFNLENBQUMsQ0FBQyxDQUFDO29CQUM3RSxLQUFLLENBQUMsU0FBUyxHQUFHLDZDQUFJLENBQUMsT0FBTyxDQUFDLFFBQVEsQ0FBQyxDQUFDO2dCQUMzQyxDQUFDO3FCQUNJLENBQUM7b0JBQ0osS0FBSyxDQUFDLFVBQVUsR0FBRyxLQUFLLENBQUMsVUFBVSxJQUFJLDZDQUFJLENBQUMsSUFBSSxDQUFDLE9BQU8sRUFBRSxLQUFLLENBQUMsQ0FBQztvQkFDakUsS0FBSyxDQUFDLFVBQVUsR0FBRyxLQUFLLENBQUMsVUFBVSxJQUFJLDZDQUFJLENBQUMsSUFBSSxDQUFDLE9BQU8sRUFBRSxLQUFLLENBQUMsQ0FBQztvQkFDakUsSUFBSSxDQUFDLEtBQUssQ0FBQyxTQUFTO3dCQUNsQixLQUFLLENBQUMsU0FBUyxHQUFHLEtBQUssQ0FBQyxVQUFVLENBQUM7eUJBQ2hDLElBQUksQ0FBQyw2Q0FBSSxDQUFDLFVBQVUsQ0FBQyxLQUFLLENBQUMsU0FBUyxDQUFDO3dCQUN4QyxLQUFLLENBQUMsU0FBUyxHQUFHLDZDQUFJLENBQUMsSUFBSSxDQUFDLEtBQUssQ0FBQyxVQUFVLEVBQUUsS0FBSyxDQUFDLFNBQVMsQ0FBQyxDQUFDO2dCQUNuRSxDQUFDO1lBQ0gsQ0FBQztpQkFDSSxJQUFJLENBQUMsS0FBSyxDQUFDLFNBQVMsRUFBRSxDQUFDO2dCQUMxQixNQUFNLElBQUksS0FBSyxDQUFDLHlCQUF5QixHQUFHLFVBQVUsQ0FBQyxDQUFDO1lBQzFELENBQUM7WUFDRCxJQUFJLEtBQUssQ0FBQyxTQUFTLEtBQUssSUFBSTtnQkFDMUIsS0FBSyxDQUFDLFNBQVMsR0FBRyxLQUFLLENBQUMsU0FBUyxDQUFDO2lCQUMvQixJQUFJLEtBQUssQ0FBQyxTQUFTLEtBQUssU0FBUztnQkFDcEMsS0FBSyxDQUFDLFNBQVMsR0FBRyw2Q0FBSSxDQUFDLElBQUksQ0FBQyxPQUFPLEVBQUUsS0FBSyxDQUFDLENBQUM7UUFDaEQsQ0FBQztJQUNILENBQUM7SUFFRCxvQkFBb0IsQ0FBQyxVQUFVLENBQUMsQ0FBQztJQUVqQyxPQUFPLFVBQVUsQ0FBQztBQUNwQixDQUFDO0FBRUQsS0FBSyxVQUFVLGdCQUFnQixDQUFDLE9BQXVCLEVBQUUsV0FBZ0IsRUFBRSxNQUFXLEVBQUUsUUFBYTtJQUNuRyxJQUFJLENBQUMsTUFBTSxDQUFDLFNBQVM7UUFDbkIsTUFBTSxJQUFJLEtBQUssQ0FBQyxtQkFBbUIsQ0FBQyxDQUFDO0lBQ3ZDLElBQUksQ0FBQyxNQUFNLENBQUMsVUFBVTtRQUNwQixNQUFNLElBQUksS0FBSyxDQUFDLG9CQUFvQixDQUFDLENBQUM7SUFDeEMsSUFBSSxDQUFDLE1BQU0sQ0FBQyxVQUFVO1FBQ3BCLE1BQU0sSUFBSSxLQUFLLENBQUMsb0JBQW9CLENBQUMsQ0FBQztJQUV4QyxJQUFJLENBQUMsTUFBTSxrRUFBZSxDQUFDLE1BQU0sQ0FBQyxVQUFVLENBQUMsRUFBRSxDQUFDO1FBQzlDLE1BQU0sQ0FBQyxNQUFNLENBQUMsWUFBWSxNQUFNLENBQUMsVUFBVSxFQUFFLENBQUMsQ0FBQztRQUMvQyxNQUFNLHVEQUFXLENBQUMsS0FBSyxDQUFDLE1BQU0sQ0FBQyxVQUFVLEVBQUUsRUFBRSxTQUFTLEVBQUUsSUFBSSxFQUFFLENBQUMsQ0FBQztJQUNsRSxDQUFDO0lBRUQsSUFBSSxDQUFDLE1BQU0sa0VBQWUsQ0FBQyxNQUFNLENBQUMsT0FBTyxDQUFDLEVBQUUsQ0FBQztRQUMzQyxNQUFNLENBQUMsTUFBTSxDQUFDLFlBQVksTUFBTSxDQUFDLE9BQU8sRUFBRSxDQUFDLENBQUM7UUFDNUMsTUFBTSx1REFBVyxDQUFDLEtBQUssQ0FBQyxNQUFNLENBQUMsT0FBTyxFQUFFLEVBQUUsU0FBUyxFQUFFLElBQUksRUFBRSxDQUFDLENBQUM7SUFDL0QsQ0FBQztJQUVELE1BQU0sT0FBTyxHQUFHLDZDQUFJLENBQUMsUUFBUSxDQUFDLE1BQU0sQ0FBQyxTQUFTLENBQUMsQ0FBQztJQUVoRCxJQUFJLE9BQU8sQ0FBQztJQUNaLElBQUksWUFBWSxHQUFHLE1BQU0sUUFBUSxDQUFDLEdBQUcsQ0FBQyxjQUFjLENBQUMsSUFBSSxFQUFFLENBQUM7SUFDNUQsSUFBSSxZQUFZLENBQUMsTUFBTSxDQUFDLFNBQVMsQ0FBQztRQUNoQyxPQUFPLEdBQUcsWUFBWSxDQUFDLE1BQU0sQ0FBQyxTQUFTLENBQUMsQ0FBQztTQUN0QyxDQUFDO1FBQ0osT0FBTyxHQUFHLDZDQUFJLENBQUMsSUFBSSxDQUFDLE1BQU0sQ0FBQyxVQUFVLEVBQUUsT0FBTyxDQUFDLENBQUM7UUFDaEQsTUFBTSxpRUFBWSxDQUFDLE1BQU0sQ0FBQyxTQUFTLEVBQUUsT0FBTyxFQUFFLEVBQUUsUUFBUSxFQUFFLHdEQUFnQixFQUFFLENBQUMsQ0FBQztRQUM5RSxZQUFZLENBQUMsTUFBTSxDQUFDLFNBQVMsQ0FBQyxHQUFHLE9BQU8sQ0FBQztRQUN6QyxNQUFNLFFBQVEsQ0FBQyxHQUFHLENBQUMsY0FBYyxFQUFFLFlBQVksQ0FBQyxDQUFDO0lBQ25ELENBQUM7SUFFRCxJQUFJLFVBQVUsQ0FBQztJQUNmLElBQUksWUFBWSxHQUFHLE1BQU0sUUFBUSxDQUFDLEdBQUcsQ0FBQyxjQUFjLENBQUMsSUFBSSxFQUFFLENBQUM7SUFDNUQsSUFBSSxZQUFZLENBQUMsT0FBTyxDQUFDLEVBQUUsQ0FBQztRQUMxQixVQUFVLEdBQUcsWUFBWSxDQUFDLE9BQU8sQ0FBQyxDQUFDO0lBQ3JDLENBQUM7U0FDSSxDQUFDO1FBQ0osVUFBVSxHQUFHLE1BQU0sdURBQVcsQ0FBQyxPQUFPLENBQUMsNkNBQUksQ0FBQyxPQUFPLENBQUMsTUFBTSxDQUFDLE9BQU8sRUFBRSxPQUFPLEdBQUcsR0FBRyxDQUFDLENBQUMsQ0FBQztRQUVwRixNQUFNLGdEQUFZLENBQUMsV0FBVyxFQUFFLENBQUMsT0FBTyxDQUFDO1lBQ3ZDLFdBQVc7WUFDWCxRQUFRLEVBQUUsT0FBTztZQUNqQixPQUFPLEVBQUUsVUFBVTtZQUNuQixPQUFPLEVBQUcsNkNBQUksQ0FBQyxJQUFJLENBQUMsTUFBTSxDQUFDLE9BQU8sRUFBRSw2Q0FBSSxDQUFDLFFBQVEsQ0FBQyxVQUFVLENBQUMsR0FBRyxNQUFNLENBQUM7U0FDeEUsQ0FBQyxDQUFDO1FBRUgsTUFBTSxXQUFXLEdBQUcsTUFBTSx1REFBVyxDQUFDLE9BQU8sQ0FBQyxVQUFVLENBQUMsQ0FBQztRQUMxRCxJQUFJLFdBQVcsQ0FBQyxNQUFNLEtBQUssQ0FBQyxFQUFFLENBQUM7WUFDN0IsVUFBVSxHQUFHLDZDQUFJLENBQUMsT0FBTyxDQUFDLFVBQVUsRUFBRSxXQUFXLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQztZQUN0RCxJQUFJLENBQUMsTUFBTSxrRUFBZSxDQUFDLFVBQVUsQ0FBQyxFQUFFLENBQUM7Z0JBQ3ZDLE1BQU0sQ0FBQyxNQUFNLENBQUMsVUFBVSxVQUFVLEVBQUUsQ0FBQyxDQUFDO2dCQUN0QyxNQUFNLHVEQUFXLENBQUMsRUFBRSxDQUFDLFVBQVUsRUFBRSxFQUFFLFNBQVMsRUFBRSxJQUFJLEVBQUUsQ0FBQyxDQUFDO2dCQUN0RCxNQUFNLElBQUksS0FBSyxDQUFDLG9DQUFvQyxDQUFDLENBQUM7WUFDeEQsQ0FBQztRQUNILENBQUM7UUFFRCxJQUFJLE1BQU0sa0VBQWUsQ0FBQyxNQUFNLENBQUMsVUFBVSxDQUFDLEVBQUUsQ0FBQztZQUM3QyxxQ0FBcUM7WUFDckMsTUFBTSxDQUFDLE1BQU0sQ0FBQyxVQUFVLE1BQU0sQ0FBQyxVQUFVLEVBQUUsQ0FBQyxDQUFDO1lBQzdDLE1BQU0sdURBQVcsQ0FBQyxFQUFFLENBQUMsTUFBTSxDQUFDLFVBQVUsRUFBRSxFQUFFLFNBQVMsRUFBRSxJQUFJLEVBQUUsQ0FBQyxDQUFDO1FBQy9ELENBQUM7YUFDSSxDQUFDO1lBQ0osTUFBTSxTQUFTLEdBQUcsNkNBQUksQ0FBQyxPQUFPLENBQUMsTUFBTSxDQUFDLFVBQVUsQ0FBQyxDQUFDO1lBQ2xELElBQUksQ0FBQyxNQUFNLGtFQUFlLENBQUMsU0FBUyxDQUFDLEVBQUUsQ0FBQztnQkFDdEMsTUFBTSxDQUFDLE1BQU0sQ0FBQyxZQUFZLFNBQVMsRUFBRSxDQUFDLENBQUM7Z0JBQ3ZDLE1BQU0sdURBQVcsQ0FBQyxLQUFLLENBQUMsU0FBUyxFQUFFLEVBQUUsU0FBUyxFQUFFLElBQUksRUFBRSxDQUFDLENBQUM7WUFDMUQsQ0FBQztRQUNILENBQUM7UUFFRCxNQUFNLENBQUMsTUFBTSxDQUFDLE1BQU0sVUFBVSxJQUFJLE1BQU0sQ0FBQyxVQUFVLEVBQUUsQ0FBQyxDQUFDO1FBQ3ZELE1BQU0sdURBQVcsQ0FBQyxNQUFNLENBQUMsVUFBVSxFQUFFLE1BQU0sQ0FBQyxVQUFVLENBQUMsQ0FBQztRQUV4RCxZQUFZLENBQUMsT0FBTyxDQUFDLEdBQUcsVUFBVSxDQUFDO1FBQ25DLE1BQU0sUUFBUSxDQUFDLEdBQUcsQ0FBQyxjQUFjLEVBQUUsWUFBWSxDQUFDLENBQUM7SUFDbkQsQ0FBQztJQUVELElBQUksTUFBTSxDQUFDLFFBQVEsRUFBRSxDQUFDO1FBQ3BCLElBQUksU0FBUyxHQUFHLE1BQU0sUUFBUSxDQUFDLEdBQUcsQ0FBQyxXQUFXLENBQUMsSUFBSSxFQUFFLENBQUM7UUFDdEQsSUFBSSxDQUFDLFNBQVMsQ0FBQyxNQUFNLENBQUMsUUFBUSxDQUFDLEVBQUUsQ0FBQztZQUNoQyxNQUFNLDJEQUFTLENBQUMsTUFBTSxDQUFDLFFBQVEsRUFBRSxNQUFNLENBQUMsVUFBVSxDQUFDLENBQUM7WUFDcEQsU0FBUyxDQUFDLE1BQU0sQ0FBQyxRQUFRLENBQUMsR0FBRyxNQUFNLENBQUMsVUFBVSxDQUFDO1lBQy9DLE1BQU0sUUFBUSxDQUFDLEdBQUcsQ0FBQyxXQUFXLEVBQUUsU0FBUyxDQUFDLENBQUM7UUFDN0MsQ0FBQztJQUNILENBQUM7QUFDSCxDQUFDO0FBRUQsS0FBSyxVQUFVLGFBQWEsQ0FBQyxPQUF1QixFQUFFLFdBQWdCLEVBQUUsTUFBVyxFQUFFLFFBQXlCO0lBQzVHLElBQUksTUFBTSxDQUFDLFNBQVMsRUFBRSxDQUFDO1FBQ3JCLE1BQU0sUUFBUSxDQUFDLElBQUksQ0FBQyxXQUFXLENBQUMsQ0FBQztRQUNqQyxNQUFNLFNBQVMsR0FBUSxFQUFFLENBQUM7UUFDMUIsK0RBQVksQ0FBQyxTQUFTLEVBQUUsTUFBTSxDQUFDLENBQUM7UUFDaEMsT0FBTyxTQUFTLENBQUMsTUFBTSxDQUFDO1FBQ3hCLE9BQU8sU0FBUyxDQUFDLFNBQVMsQ0FBQztRQUMzQixPQUFPLFNBQVMsQ0FBQyxVQUFVLENBQUM7UUFDNUIsK0RBQVksQ0FBQyxTQUFTLEVBQUUsTUFBTSxDQUFDLFNBQVMsQ0FBQyxDQUFDO1FBQzFDLE1BQU0sY0FBYyxHQUFHLGdCQUFnQixDQUFDLE1BQU0sQ0FBQyxTQUFTLENBQUMsV0FBVyxFQUFFLFdBQVcsQ0FBQyxDQUFDO1FBQ25GLE1BQU0sYUFBYSxDQUFDLE9BQU8sRUFBRSxjQUFjLEVBQUUsU0FBUyxFQUFFLFFBQVEsQ0FBQyxDQUFDO1FBQ2xFLE1BQU0sUUFBUSxDQUFDLEdBQUcsRUFBRSxDQUFDO0lBQ3ZCLENBQUM7SUFFRCxJQUFJLEtBQUssQ0FBQyxPQUFPLENBQUMsTUFBTSxDQUFDLE1BQU0sQ0FBQyxFQUFFLENBQUM7UUFDakMsTUFBTSxRQUFRLENBQUMsSUFBSSxDQUFDLFFBQVEsQ0FBQyxDQUFDO1FBQzlCLEtBQUssSUFBSSxDQUFDLEdBQUcsQ0FBQyxFQUFFLENBQUMsR0FBRyxNQUFNLENBQUMsTUFBTSxDQUFDLE1BQU0sRUFBRSxFQUFFLENBQUMsRUFBRSxDQUFDO1lBQzlDLE1BQU0sUUFBUSxDQUFDLElBQUksQ0FBQyxDQUFDLENBQUMsUUFBUSxFQUFFLENBQUMsQ0FBQztZQUNsQyxNQUFNLFNBQVMsR0FBUSxFQUFFLENBQUM7WUFDMUIsK0RBQVksQ0FBQyxTQUFTLEVBQUUsTUFBTSxDQUFDLENBQUM7WUFDaEMsT0FBTyxTQUFTLENBQUMsTUFBTSxDQUFDO1lBQ3hCLE9BQU8sU0FBUyxDQUFDLFNBQVMsQ0FBQztZQUMzQixPQUFPLFNBQVMsQ0FBQyxVQUFVLENBQUM7WUFDNUIsK0RBQVksQ0FBQyxTQUFTLEVBQUUsTUFBTSxDQUFDLE1BQU0sQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDO1lBQzFDLE1BQU0sY0FBYyxHQUFHLGdCQUFnQixDQUFDLE1BQU0sQ0FBQyxNQUFNLENBQUMsQ0FBQyxDQUFDLENBQUMsV0FBVyxFQUFFLFdBQVcsQ0FBQyxDQUFDO1lBQ25GLE1BQU0sYUFBYSxDQUFDLE9BQU8sRUFBRSxjQUFjLEVBQUUsU0FBUyxFQUFFLFFBQVEsQ0FBQyxDQUFDO1lBQ2xFLE1BQU0sUUFBUSxDQUFDLEdBQUcsRUFBRSxDQUFDO1FBQ3ZCLENBQUM7UUFDRCxNQUFNLFFBQVEsQ0FBQyxHQUFHLEVBQUUsQ0FBQztJQUN2QixDQUFDO1NBQ0ksQ0FBQztRQUNKLElBQUksQ0FBQyxNQUFNLGtFQUFlLENBQUMsTUFBTSxDQUFDLFNBQVMsQ0FBQyxFQUFFLENBQUM7WUFDN0MsTUFBTSx1REFBVyxDQUFDLEtBQUssQ0FBQyxNQUFNLENBQUMsU0FBUyxFQUFFLEVBQUUsU0FBUyxFQUFFLElBQUksRUFBRSxDQUFDLENBQUM7UUFDakUsQ0FBQztRQUNELElBQUksaURBQU8sQ0FBQyxNQUFNLENBQUMsTUFBTSxDQUFDLEVBQUUsQ0FBQztZQUMzQixNQUFNLENBQUMsV0FBVyxJQUFJLE1BQU0sQ0FBQyxNQUFNLENBQUMsTUFBTSxDQUFDLFdBQVcsQ0FBQyxDQUFDO1lBQ3hELE1BQU0saURBQU8sQ0FBQyxNQUFNLENBQUMsTUFBTSxDQUFDLENBQUMsTUFBTSxFQUFFLFdBQVcsRUFBRSxRQUFRLENBQUMsQ0FBQztRQUM5RCxDQUFDO0lBQ0gsQ0FBQztJQUVELElBQUksTUFBTSxDQUFDLFVBQVUsRUFBRSxDQUFDO1FBQ3RCLE1BQU0sUUFBUSxDQUFDLElBQUksQ0FBQyxZQUFZLENBQUMsQ0FBQztRQUNsQyxNQUFNLFNBQVMsR0FBUSxFQUFFLENBQUM7UUFDMUIsK0RBQVksQ0FBQyxTQUFTLEVBQUUsTUFBTSxDQUFDLENBQUM7UUFDaEMsT0FBTyxTQUFTLENBQUMsTUFBTSxDQUFDO1FBQ3hCLE9BQU8sU0FBUyxDQUFDLFNBQVMsQ0FBQztRQUMzQixPQUFPLFNBQVMsQ0FBQyxVQUFVLENBQUM7UUFDNUIsK0RBQVksQ0FBQyxTQUFTLEVBQUUsTUFBTSxDQUFDLFVBQVUsQ0FBQyxDQUFDO1FBQzNDLE1BQU0sY0FBYyxHQUFHLGdCQUFnQixDQUFDLE1BQU0sQ0FBQyxVQUFVLENBQUMsV0FBVyxFQUFFLFdBQVcsQ0FBQyxDQUFDO1FBQ3BGLE1BQU0sYUFBYSxDQUFDLE9BQU8sRUFBRSxjQUFjLEVBQUUsU0FBUyxFQUFFLFFBQVEsQ0FBQyxDQUFDO1FBQ2xFLE1BQU0sUUFBUSxDQUFDLEdBQUcsRUFBRSxDQUFDO0lBQ3ZCLENBQUM7QUFDSCxDQUFDO0FBRUQsS0FBSyxVQUFVLGFBQWEsQ0FBQyxPQUF1QjtJQUNsRCxJQUFJLFVBQVUsQ0FBQztJQUNmLElBQUksT0FBTyxDQUFDLEdBQUcsQ0FBQyxNQUFNLEVBQUUsQ0FBQztRQUN2QixVQUFVLEdBQUcsNkNBQUksQ0FBQyxVQUFVLENBQUMsT0FBTyxDQUFDLEdBQUcsQ0FBQyxNQUFNLENBQUMsQ0FBQyxDQUFDLENBQUMsT0FBTyxDQUFDLEdBQUcsQ0FBQyxNQUFNLENBQUMsQ0FBQyxDQUFDLDZDQUFJLENBQUMsT0FBTyxDQUFDLE9BQU8sQ0FBQyxPQUFPLEVBQUUsT0FBTyxDQUFDLEdBQUcsQ0FBQyxNQUFNLENBQUMsQ0FBQztRQUMxSCxJQUFJLENBQUMsTUFBTSw2REFBVSxDQUFDLFVBQVUsQ0FBQztZQUMvQixNQUFNLGtCQUFrQixPQUFPLENBQUMsR0FBRyxDQUFDLE1BQU0sdUJBQXVCLENBQUM7SUFDdEUsQ0FBQztTQUNJLENBQUM7UUFDSixNQUFNLGNBQWMsR0FBRyw2Q0FBSSxDQUFDLE9BQU8sQ0FBQyxPQUFPLENBQUMsT0FBTyxFQUFFLG1EQUFXLENBQUMsQ0FBQztRQUNsRSxJQUFJLE1BQU0sNkRBQVUsQ0FBQyxjQUFjLENBQUM7WUFDbEMsVUFBVSxHQUFHLGNBQWMsQ0FBQzthQUN6QixDQUFDO1lBQ0osTUFBTSxDQUFDLElBQUksQ0FBQyxnQkFBZ0IsbURBQVcsb0JBQW9CLENBQUMsQ0FBQztRQUMvRCxDQUFDO0lBQ0gsQ0FBQztJQUVELElBQUksQ0FBQyxVQUFVLEVBQUUsQ0FBQztRQUNoQixPQUFPO1lBQ0wsZUFBZSxFQUFFO2dCQUNmLE1BQU0sRUFBRSxTQUFTO2dCQUNqQixTQUFTLEVBQUU7b0JBQ1QsY0FBYyxFQUFFLE1BQU07aUJBQ3ZCO2dCQUNELFNBQVMsRUFBRSxlQUFlO2dCQUMxQixPQUFPLEVBQUUsc0JBQXNCO2FBQ2hDO1NBQ0YsQ0FBQztJQUNKLENBQUM7SUFFRCxNQUFNLFNBQVMsR0FBRyw2REFBaUIsQ0FBQyxVQUFVLENBQUMsQ0FBQztJQUNoRCxNQUFNLFlBQVksR0FBRyxNQUFNLDREQUFZLENBQUMsU0FBUyxDQUFDLENBQUM7SUFDbkQsUUFBUSxPQUFPLFlBQVksQ0FBQyxPQUFPLEVBQUUsQ0FBQztRQUN0QyxLQUFLLFVBQVU7WUFDYixNQUFNLFVBQVUsR0FBRyxZQUFZLENBQUMsT0FBTyxDQUFDLE9BQU8sQ0FBQyxHQUFHLEVBQUUsRUFBRSxDQUFDLENBQUM7WUFDekQsSUFBSSxVQUFVLFlBQVksT0FBTztnQkFDL0IsT0FBTyxNQUFNLFVBQVUsQ0FBQztZQUMxQixPQUFPLFVBQVUsQ0FBQztRQUVwQixLQUFLLFFBQVE7WUFDWCxPQUFPLFlBQVksQ0FBQyxPQUFPLENBQUM7UUFFOUI7WUFDRSxNQUFNLElBQUksS0FBSyxDQUFDLGlDQUFpQyxDQUFDLENBQUM7SUFDckQsQ0FBQztBQUNILENBQUM7QUFFRCxpRUFBZSxLQUFLLEVBQUUsT0FBdUIsRUFBRSxFQUFFO0lBQy9DLE1BQU0sT0FBTyxHQUFtQjtRQUM5QixTQUFTLEVBQUUsT0FBTyxDQUFDLEdBQUcsQ0FBQyxTQUFTLElBQUkseURBQWdCLENBQUMsQ0FBQyxDQUFDLE9BQU8sQ0FBQyxHQUFHLENBQUMsU0FBUyxDQUFDLENBQUMsQ0FBQywyREFBa0I7UUFDakcsT0FBTyxFQUFFLE9BQU8sQ0FBQyxPQUFPO0tBQ3pCLENBQUM7SUFFRixNQUFNLFVBQVUsR0FBRyxNQUFNLGFBQWEsQ0FBQyxPQUFPLENBQUMsQ0FBQztJQUNoRCxNQUFNLFdBQVcsR0FBRyxlQUFlLENBQUMsT0FBTyxFQUFFLFVBQVUsQ0FBQyxDQUFDO0lBRXpELElBQUksV0FBVyxDQUFDLG1CQUFtQixFQUFFLENBQUM7UUFDcEMsTUFBTSxVQUFVLEdBQUcsSUFBSSxDQUFDLFNBQVMsQ0FBQyxXQUFXLEVBQUUsSUFBSSxFQUFFLENBQUMsQ0FBQyxDQUFDO1FBQ3hELE1BQU0sa0VBQWUsQ0FBQyxXQUFXLENBQUMsbUJBQW1CLEVBQUUsVUFBVSxDQUFDLENBQUM7SUFDckUsQ0FBQztJQUVELE1BQU0sZ0JBQWdCLEdBQUcsNkNBQUksQ0FBQyxPQUFPLENBQUMsV0FBVyxDQUFDLFVBQVUsRUFBRSwyREFBbUIsQ0FBQyxDQUFDO0lBQ25GLE1BQU0sUUFBUSxHQUFHLElBQUksbUVBQWUsQ0FBQyxnQkFBZ0IsQ0FBQyxDQUFDO0lBRXZELEtBQUssTUFBTSxDQUFDLEdBQUcsRUFBRSxLQUFLLENBQUMsSUFBSSxNQUFNLENBQUMsT0FBTyxDQUFDLFdBQVcsQ0FBUSxFQUFFLENBQUM7UUFDOUQsSUFBSSxLQUFLLElBQUksT0FBTyxLQUFLLEtBQUssUUFBUSxJQUFJLEtBQUssQ0FBQyxNQUFNLElBQUksQ0FBQyxLQUFLLENBQUMsUUFBUSxFQUFFLENBQUM7WUFDMUUsTUFBTSxRQUFRLENBQUMsSUFBSSxDQUFDLEdBQUcsQ0FBQyxDQUFDO1lBQ3pCLE1BQU0sU0FBUyxHQUFHLE1BQU0sUUFBUSxDQUFDLEdBQUcsQ0FBQyxXQUFXLENBQUMsQ0FBQztZQUNsRCxJQUFJLEtBQUssQ0FBQyxPQUFPLElBQUksQ0FBQyxTQUFTLEVBQUUsQ0FBQztnQkFDaEMsTUFBTSxDQUFDLElBQUksQ0FBQyxtQkFBbUIsR0FBRyxFQUFFLENBQUMsQ0FBQztnQkFDdEMsTUFBTSxXQUFXLEdBQUcsZ0JBQWdCLENBQUMsS0FBSyxDQUFDLFdBQVcsRUFBRSxPQUFPLENBQUMsR0FBRyxDQUFDLENBQUM7Z0JBQ3JFLElBQUksS0FBSyxDQUFDLFNBQVMsSUFBSSxDQUFDLEtBQUssQ0FBQyxTQUFTLENBQUMsVUFBVSxDQUFDLDREQUFhLENBQUMsRUFBRSxDQUFDO29CQUNsRSxNQUFNLGdCQUFnQixDQUFDLE9BQU8sRUFBRSxXQUFXLEVBQUUsS0FBSyxFQUFFLFFBQVEsQ0FBQyxDQUFDO2dCQUNoRSxDQUFDO2dCQUNELE1BQU0sYUFBYSxDQUFDLE9BQU8sRUFBRSxXQUFXLEVBQUUsS0FBSyxFQUFFLFFBQVEsQ0FBQyxDQUFDO2dCQUMzRCxNQUFNLFFBQVEsQ0FBQyxHQUFHLENBQUMsV0FBVyxFQUFFLElBQUksQ0FBQyxDQUFDO2dCQUN0QyxNQUFNLENBQUMsSUFBSSxDQUFDLHFCQUFxQixHQUFHLEVBQUUsQ0FBQyxDQUFDO1lBQzFDLENBQUM7WUFDRCxNQUFNLFFBQVEsQ0FBQyxHQUFHLEVBQUUsQ0FBQztRQUN2QixDQUFDO0lBQ0gsQ0FBQztBQUNILENBQUM7Ozs7Ozs7Ozs7Ozs7Ozs7O0FDeGNEOzs7Ozs7O0dBT0c7QUFHZ0M7QUFDRTtBQUVyQyxpRUFBZTtJQUNiLE9BQU8sRUFBRSx1REFBSztJQUNkLElBQUk7SUFDSixLQUFLO0NBQ21ELEVBQUM7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7QUNqQjNEOzs7Ozs7O0dBT0c7QUFFMEI7QUFDSjtBQUVvQztBQUNuQjtBQUVSO0FBRWxDLE1BQU0sTUFBTSxHQUFHLDJDQUFNLENBQUMsTUFBTSxDQUFDLGdGQUFlLENBQUMsQ0FBQztBQUU5Qyw2QkFBZSwwQ0FBZSxPQUF1QjtJQUNuRCxNQUFNLE1BQU0sR0FBRyxPQUFPLENBQUMsR0FBRyxDQUFDLE1BQU0sQ0FBQztJQUVsQyxJQUFJLENBQUMsTUFBTTtRQUNULE1BQU0sSUFBSSxLQUFLLENBQUMsV0FBVyxNQUFNLG9CQUFvQixDQUFDLENBQUM7SUFFekQsTUFBTSxVQUFVLEdBQUcsTUFBTSw4REFBVyxDQUFDLE1BQU0sQ0FBQyxDQUFDO0lBRTdDLE1BQU0sY0FBYyxHQUFHLHdEQUFZLENBQUMsT0FBTyxDQUFDLE9BQU8sRUFBRSxtREFBVyxDQUFDLENBQUM7SUFDbEUsSUFBSSxNQUFNLDZEQUFVLENBQUMsY0FBYyxDQUFDO1FBQ2xDLE1BQU0sdURBQVcsQ0FBQyxFQUFFLENBQUMsY0FBYyxDQUFDLENBQUM7SUFFdkMsTUFBTSx1REFBVyxDQUFDLFNBQVMsQ0FBQyxjQUFjLEVBQUUsVUFBVSxFQUFFLE1BQU0sQ0FBQyxDQUFDO0lBQ2hFLE1BQU0sQ0FBQyxJQUFJLENBQUMsV0FBVyxNQUFNLDBCQUEwQixDQUFDLENBQUM7QUFDM0QsQ0FBQzs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7QUNqQ0Q7Ozs7Ozs7R0FPRztBQUUwQjtBQUNGO0FBRVM7QUFDWTtBQUdoRCxNQUFNLElBQUksR0FBRyxNQUFNLENBQUMsTUFBTSxDQUFDLENBQUM7QUFFNUIsU0FBUyxZQUFZLENBQUMsR0FBMEI7SUFDOUMsSUFBSSxPQUFPLEdBQUcsS0FBSyxRQUFRO1FBQ3pCLE9BQU8sR0FBRyxDQUFDLE1BQU0sRUFBRSxDQUFDO0lBQ3RCLElBQUksR0FBRyxDQUFDLFVBQVUsQ0FBQyx5REFBVyxDQUFDO1FBQzdCLE9BQU8sNkRBQWlCLENBQUMsR0FBRyxDQUFDLENBQUM7SUFDaEMsT0FBTyxHQUFHLENBQUM7QUFDYixDQUFDO0FBRU0sTUFBTSxZQUFZO0lBQ2YsQ0FBQyxJQUFJLENBQUMsQ0FBUztJQUV2QixZQUFzQixRQUFnQjtRQUNwQyxJQUFJLFFBQVEsQ0FBQyxVQUFVLENBQUMseURBQVcsQ0FBQyxFQUFFLENBQUM7WUFDckMsSUFBSSxDQUFDLElBQUksQ0FBQyxHQUFHLFFBQVEsQ0FBQztRQUN4QixDQUFDO2FBQ0ksSUFBSSw2Q0FBSSxDQUFDLFVBQVUsQ0FBQyxRQUFRLENBQUMsRUFBRSxDQUFDO1lBQ25DLElBQUksQ0FBQyxJQUFJLENBQUMsR0FBRyw2REFBaUIsQ0FBQyxRQUFRLENBQUMsQ0FBQyxRQUFRLEVBQUUsQ0FBQztRQUN0RCxDQUFDO2FBQ0ksQ0FBQztZQUNKLE1BQU0sSUFBSSxLQUFLLENBQUMsbUNBQW1DLFFBQVEsR0FBRyxDQUFDLENBQUM7UUFDbEUsQ0FBQztJQUNILENBQUM7SUFFTSxJQUFJLENBQUMsR0FBRyxLQUFtQztRQUNoRCxNQUFNLFFBQVEsR0FBRyw2Q0FBSSxDQUFDLElBQUksQ0FBQyxJQUFJLENBQUMsTUFBTSxFQUFFLEVBQUUsR0FBRyxLQUFLLENBQUMsR0FBRyxDQUFDLENBQUMsQ0FBQyxFQUFFLENBQUMsWUFBWSxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQztRQUM5RSxPQUFPLFlBQVksQ0FBQyxNQUFNLENBQUMsUUFBUSxDQUFDLENBQUM7SUFDdkMsQ0FBQztJQUVNLE9BQU87UUFDWixPQUFPLFlBQVksQ0FBQyxNQUFNLENBQUMsc0RBQVUsQ0FBQyxPQUFPLENBQUMsSUFBSSxDQUFDLElBQUksQ0FBQyxDQUFDLENBQUMsQ0FBQztJQUM3RCxDQUFDO0lBRU0sUUFBUTtRQUNiLE9BQU8sc0RBQVUsQ0FBQyxRQUFRLENBQUMsSUFBSSxDQUFDLElBQUksQ0FBQyxDQUFDLENBQUM7SUFDekMsQ0FBQztJQUVNLFFBQVEsQ0FBQyxFQUF5QjtRQUN2QyxPQUFPLDZDQUFJLENBQUMsUUFBUSxDQUFDLElBQUksQ0FBQyxNQUFNLEVBQUUsRUFBRSxZQUFZLENBQUMsRUFBRSxDQUFDLENBQUMsQ0FBQztJQUN4RCxDQUFDO0lBRU0sT0FBTyxDQUFDLEdBQUcsS0FBbUM7UUFDbkQsT0FBTyxZQUFZLENBQUMsTUFBTSxDQUFDLDZDQUFJLENBQUMsT0FBTyxDQUFDLElBQUksQ0FBQyxNQUFNLEVBQUUsRUFBRSxHQUFHLEtBQUssQ0FBQyxHQUFHLENBQUMsQ0FBQyxDQUFDLEVBQUUsQ0FBQyxZQUFZLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUM7SUFDOUYsQ0FBQztJQUVNLEtBQUssQ0FBQyxNQUFjO1FBQ3pCLE9BQU8sSUFBSSxDQUFDLElBQUksQ0FBQyxDQUFDLEtBQUssQ0FBQyxNQUFNLENBQUMsQ0FBQztJQUNsQyxDQUFDO0lBRU0sUUFBUTtRQUNiLE9BQU8sNkRBQWlCLENBQUMsSUFBSSxDQUFDLElBQUksQ0FBQyxDQUFDLENBQUM7SUFDdkMsQ0FBQztJQUVNLE1BQU07UUFDWCxJQUFJLElBQUksQ0FBQyxJQUFJLENBQUMsQ0FBQyxVQUFVLENBQUMseURBQVcsQ0FBQztZQUNwQyxPQUFPLDZEQUFpQixDQUFDLElBQUksQ0FBQyxJQUFJLENBQUMsQ0FBQyxDQUFDO1FBQ3ZDLE1BQU0sSUFBSSxLQUFLLENBQUMsT0FBTyxJQUFJLENBQUMsSUFBSSxDQUFDLHdCQUF3QixDQUFDLENBQUM7SUFDN0QsQ0FBQztJQUVNLE9BQU87UUFDWixPQUFPLDZEQUFpQixDQUFDLElBQUksQ0FBQyxJQUFJLENBQUMsQ0FBQyxDQUFDO0lBQ3ZDLENBQUM7SUFFTSxXQUFXO1FBQ2hCLE9BQU8sSUFBSSxDQUFDLElBQUksQ0FBQyxDQUFDO0lBQ3BCLENBQUM7SUFFTSxNQUFNO1FBQ1gsT0FBTyxJQUFJLENBQUMsSUFBSSxDQUFDLENBQUM7SUFDcEIsQ0FBQztJQUVNLE1BQU0sQ0FBQyxVQUFVLENBQUMsUUFBK0I7UUFDdEQsSUFBSSxRQUFRLFlBQVksWUFBWTtZQUNsQyxPQUFPLElBQUksQ0FBQztRQUNkLElBQUksUUFBUSxDQUFDLFVBQVUsQ0FBQyx5REFBVyxDQUFDO1lBQ2xDLE9BQU8sSUFBSSxDQUFDO1FBQ2QsT0FBTyw2Q0FBSSxDQUFDLFVBQVUsQ0FBQyxRQUFRLENBQUMsQ0FBQztJQUNuQyxDQUFDO0lBRU0sTUFBTSxDQUFDLGNBQWMsQ0FBQyxLQUFVO1FBQ3JDLElBQUksS0FBSyxZQUFZLFlBQVk7WUFDL0IsT0FBTyxLQUFLLENBQUM7UUFDZixNQUFNLElBQUksS0FBSyxDQUFDLFFBQVEsS0FBSyx5QkFBeUIsQ0FBQyxDQUFDO0lBQzFELENBQUM7SUFFTSxNQUFNLENBQUMsTUFBTSxDQUFDLElBQTJCO1FBQzlDLElBQUksSUFBSSxZQUFZLFlBQVk7WUFDOUIsT0FBTyxJQUFJLENBQUM7UUFFZCxPQUFPLE1BQU0sQ0FBQyxJQUFJLENBQUMsSUFBSSxZQUFZLENBQUMsSUFBSSxDQUFDLENBQUMsQ0FBQztJQUM3QyxDQUFDO0NBQ0Y7QUFBQSxDQUFDO0FBRUssTUFBTSxPQUFRLFNBQVEsWUFBWTtJQUN2QyxZQUFvQixPQUFlO1FBQ2pDLEtBQUssQ0FBQyxPQUFPLENBQUMsQ0FBQztJQUNqQixDQUFDO0lBRU0sTUFBTSxDQUFDLE1BQU0sQ0FBQyxPQUF3QztRQUMzRCxJQUFJLE9BQU8sT0FBTyxLQUFLLFFBQVE7WUFDN0IsT0FBTyxHQUFHLE9BQU8sQ0FBQyxXQUFXLEVBQUUsQ0FBQztRQUNsQyxPQUFPLElBQUksT0FBTyxDQUFDLE9BQU8sQ0FBQyxDQUFDO0lBQzlCLENBQUM7SUFFTSxNQUFNLENBQUMsUUFBUSxDQUFDLE1BQW9CO1FBQ3pDLE9BQU8sSUFBSSxPQUFPLENBQUMsTUFBTSxDQUFDLEdBQWEsQ0FBQyxDQUFDO0lBQzNDLENBQUM7SUFFTSxNQUFNO1FBQ1gsT0FBTztZQUNMLElBQUksRUFBRSxPQUFPLENBQUMsSUFBSTtZQUNsQixHQUFHLEVBQUUsSUFBSSxDQUFDLFdBQVcsRUFBRTtTQUN4QixDQUFDO0lBQ0osQ0FBQztDQUNGO0FBQUEsQ0FBQztBQUVLLE1BQU0sUUFBUyxTQUFRLFlBQVk7SUFDeEMsWUFBb0IsUUFBZ0I7UUFDbEMsS0FBSyxDQUFDLFFBQVEsQ0FBQyxDQUFDO0lBQ2xCLENBQUM7SUFFTSxNQUFNLENBQUMsTUFBTSxDQUFDLFFBQTBDO1FBQzdELElBQUksT0FBTyxRQUFRLEtBQUssUUFBUTtZQUM5QixRQUFRLEdBQUcsUUFBUSxDQUFDLFdBQVcsRUFBRSxDQUFDO1FBQ3BDLE9BQU8sSUFBSSxRQUFRLENBQUMsUUFBUSxDQUFDLENBQUM7SUFDaEMsQ0FBQztJQUVNLE1BQU0sQ0FBQyxRQUFRLENBQUMsTUFBb0I7UUFDekMsT0FBTyxJQUFJLFFBQVEsQ0FBQyxNQUFNLENBQUMsR0FBYSxDQUFDLENBQUM7SUFDNUMsQ0FBQztJQUVNLE1BQU07UUFDWCxPQUFPO1lBQ0wsSUFBSSxFQUFFLFFBQVEsQ0FBQyxJQUFJO1lBQ25CLEdBQUcsRUFBRSxJQUFJLENBQUMsV0FBVyxFQUFFO1NBQ3hCLENBQUM7SUFDSixDQUFDO0NBQ0Y7QUFBQSxDQUFDOzs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7QUMxSkY7Ozs7Ozs7R0FPRztBQUdrRDtBQUNlO0FBRVA7QUFDZjtBQUNTO0FBQ2M7QUFDaEI7QUFFbkI7QUFFbEMsTUFBTSxNQUFNLEdBQUcsMkNBQU0sQ0FBQyxNQUFNLENBQUMsbUZBQWUsQ0FBQyxDQUFDO0FBRXZDLE1BQWUsY0FBYztJQUN4QixNQUFNLENBQWM7SUFFOUIsWUFBWSxLQUFrQjtRQUM1QixJQUFJLENBQUMsTUFBTSxHQUFHLEtBQUssQ0FBQztJQUN0QixDQUFDO0lBRU0sV0FBVyxDQUFDLElBQVk7UUFDN0IsT0FBTyxrRUFBZSxDQUFDLElBQUksQ0FBQyxDQUFDO0lBQy9CLENBQUM7SUFFTSxXQUFXLENBQVksSUFBWTtRQUN4QyxPQUFPLG9EQUFXLENBQUMsR0FBRyxDQUFDLElBQUksQ0FBQyxNQUFNLEVBQUUsSUFBSSxDQUFDLENBQUM7SUFDNUMsQ0FBQztJQUVNLFdBQVcsQ0FBWSxJQUFZLEVBQUUsS0FBVTtRQUNwRCxNQUFNLEtBQUssR0FBRyxJQUFJLENBQUMsTUFBTSxDQUFDLElBQUksQ0FBQyxDQUFDO1FBQ2hDLElBQUksS0FBSztZQUNQLG9EQUFXLENBQUMsYUFBYSxDQUFDLEtBQUssRUFBRSxLQUFLLENBQUMsQ0FBQzs7WUFFeEMsb0RBQVcsQ0FBQyxjQUFjLENBQUMsSUFBSSxDQUFDLE1BQU0sRUFBRSxFQUFFLEVBQUUsSUFBSSxFQUFFLEVBQUMsS0FBSyxFQUFDLENBQUMsQ0FBQztRQUM3RCxPQUFPLElBQUksQ0FBQztJQUNkLENBQUM7SUFFTSxXQUFXLENBQVksSUFBWTtRQUN4QyxPQUFPLE1BQU0sQ0FBQyxNQUFNLENBQUMsSUFBSSxDQUFDLE1BQU0sRUFBRSxJQUFJLENBQUMsQ0FBQztJQUMxQyxDQUFDO0lBRU0sY0FBYyxDQUFZLElBQVk7UUFDM0MsT0FBTyxPQUFPLElBQUksQ0FBQyxNQUFNLENBQUMsSUFBSSxDQUFDLENBQUM7SUFDbEMsQ0FBQztJQUVNLGdCQUFnQjtRQUNyQixPQUFPLE1BQU0sQ0FBQyxJQUFJLENBQUMsSUFBSSxDQUFDLE1BQU0sQ0FBQyxDQUFDO0lBQ2xDLENBQUM7Q0FDRjtBQUFBLENBQUM7QUFFSyxNQUFlLFdBQVcsQ0FBQywwQkFBMEI7SUFDbEQsUUFBUSxHQUFHLElBQUksR0FBdUIsQ0FBQztJQUN2QyxZQUFZLEdBQUcsSUFBSSxHQUF1QixDQUFDO0lBQzNDLFlBQVksR0FBRyxJQUFJLEdBQXlCLENBQUM7SUFDN0MsWUFBWSxHQUFHLElBQUksR0FBNkIsQ0FBQztJQUNqRCxZQUFZLEdBQUcsSUFBSSxLQUFLLEVBQWlCLENBQUM7SUFFbEQsWUFBc0IsS0FBa0I7UUFDdEMsZUFBZTtJQUNqQixDQUFDO0lBTUQsSUFBVyxPQUFPO1FBQ2hCLE9BQU8sSUFBSSxDQUFDLFFBQVEsQ0FBQztJQUN2QixDQUFDO0lBRUQsSUFBVyxXQUFXO1FBQ3BCLE9BQU8sSUFBSSxDQUFDLFlBQVksQ0FBQztJQUMzQixDQUFDO0lBRUQsSUFBVyxXQUFXO1FBQ3BCLE9BQU8sSUFBSSxDQUFDLFlBQVksQ0FBQztJQUMzQixDQUFDO0lBRUQsSUFBVyxXQUFXO1FBQ3BCLE9BQU8sSUFBSSxDQUFDLFlBQVksQ0FBQztJQUMzQixDQUFDO0lBRUQsSUFBVyxXQUFXO1FBQ3BCLE9BQU8sSUFBSSxDQUFDLFlBQVksQ0FBQztJQUMzQixDQUFDO0lBRU0sYUFBYSxDQUFDLElBQVk7UUFDL0IsSUFBSSxNQUFNLEdBQUcsSUFBSSxDQUFDLFlBQVksQ0FBQyxHQUFHLENBQUMsSUFBSSxDQUFDLENBQUM7UUFDekMsSUFBSSxDQUFDLE1BQU0sRUFBRSxDQUFDO1lBQ1osTUFBTSxHQUFHLG9EQUFVLENBQUMsTUFBTSxDQUFDLElBQUksQ0FBQztZQUNoQyxJQUFJLENBQUMsWUFBWSxDQUFDLEdBQUcsQ0FBQyxJQUFJLEVBQUUsTUFBTSxDQUFDLENBQUM7UUFDdEMsQ0FBQztRQUNELE9BQU8sTUFBTSxDQUFDO0lBQ2hCLENBQUM7SUFFTSxhQUFhLENBQUMsSUFBWTtRQUMvQixPQUFPLElBQUksQ0FBQyxRQUFRLENBQUMsR0FBRyxDQUFDLElBQUksQ0FBQyxDQUFDO0lBQ2pDLENBQUM7SUFFTSxhQUFhLENBQUMsSUFBWSxFQUFFLE1BQWtCO1FBQ25ELElBQUksQ0FBQyxRQUFRLENBQUMsR0FBRyxDQUFDLElBQUksRUFBRSxNQUFNLENBQUMsQ0FBQztJQUNsQyxDQUFDO0lBRU0sTUFBTSxDQUFDLElBQVk7UUFDeEIsSUFBSSxNQUFNLEdBQUcsSUFBSSxDQUFDLFlBQVksQ0FBQyxHQUFHLENBQUMsSUFBSSxDQUFDLENBQUM7UUFDekMsSUFBSSxDQUFDLE1BQU0sRUFBRSxDQUFDO1lBQ1osTUFBTSxHQUFHLGdFQUFnQixDQUFDLE1BQU0sQ0FBQyxJQUFJLENBQUM7WUFDdEMsSUFBSSxDQUFDLFlBQVksQ0FBQyxHQUFHLENBQUMsSUFBSSxFQUFFLE1BQU0sQ0FBQyxDQUFDO1FBQ3RDLENBQUM7UUFDRCxPQUFPLE1BQU0sQ0FBQztJQUNoQixDQUFDO0lBRU0sZUFBZSxDQUFDLE9BQTZCO1FBQ2xELE1BQU0sTUFBTSxHQUFHLDREQUFZLENBQUMsTUFBTSxDQUFDLE9BQU8sQ0FBQyxDQUFDO1FBQzVDLElBQUksQ0FBQyxZQUFZLENBQUMsR0FBRyxDQUFDLE9BQU8sQ0FBQyxJQUFJLEVBQUUsTUFBTSxDQUFDLENBQUM7UUFDNUMsT0FBTyxNQUFNLENBQUM7SUFDaEIsQ0FBQztJQUVNLGVBQWUsQ0FBQyxLQUE0QixFQUFFLFdBQXlCLEVBQUUsT0FBc0I7UUFDcEcsTUFBTSxNQUFNLEdBQUcsSUFBSSw4REFBYSxDQUFDLEtBQUssRUFBRSxXQUFXLEVBQUUsT0FBTyxDQUFDLENBQUM7UUFDOUQsSUFBSSxDQUFDLFlBQVksQ0FBQyxJQUFJLENBQUMsTUFBTSxDQUFDLENBQUM7SUFDakMsQ0FBQztDQUNGO0FBQUEsQ0FBQztBQUVLLFNBQVMsYUFBYSxDQUE0QixHQUFNO0lBQzdELE1BQU0sT0FBTyxHQUFvQjtRQUMvQixHQUFHLENBQUMsTUFBUyxFQUFFLElBQVksRUFBRSxRQUFhO1lBQ3hDLElBQUksSUFBSSxJQUFJLE1BQU07Z0JBQ2hCLE9BQVEsTUFBYyxDQUFDLElBQUksQ0FBQyxDQUFDO1lBQy9CLE9BQU8sTUFBTSxDQUFDLFdBQVcsQ0FBQyxJQUFJLENBQUMsQ0FBQztRQUNsQyxDQUFDO1FBQ0QsR0FBRyxDQUFDLE1BQVMsRUFBRSxJQUFZLEVBQUUsS0FBVTtZQUNyQyxNQUFNLENBQUMsV0FBVyxDQUFDLElBQUksRUFBRSxLQUFLLENBQUMsQ0FBQztZQUNoQyxPQUFPLElBQUksQ0FBQztRQUNkLENBQUM7UUFDRCxHQUFHLENBQUMsTUFBUyxFQUFFLElBQVk7WUFDekIsT0FBTyxJQUFJLElBQUksTUFBTSxJQUFJLE1BQU0sQ0FBQyxXQUFXLENBQUMsSUFBSSxDQUFDLENBQUM7UUFDcEQsQ0FBQztRQUNELE9BQU8sQ0FBQyxNQUFTO1lBQ2YsT0FBTyxNQUFNLENBQUMsZ0JBQWdCLEVBQUUsQ0FBQztRQUNuQyxDQUFDO1FBQ0QsY0FBYyxDQUFDLE1BQVMsRUFBRSxJQUFZO1lBQ3BDLE9BQU8sTUFBTSxDQUFDLGNBQWMsQ0FBQyxJQUFJLENBQUMsQ0FBQztRQUNyQyxDQUFDO1FBQ0Qsd0JBQXdCLENBQUMsTUFBUyxFQUFFLElBQVk7WUFDOUMsSUFBSSxNQUFNLENBQUMsV0FBVyxDQUFDLElBQUksQ0FBQyxFQUFFLENBQUM7Z0JBQzdCLE1BQU0sS0FBSyxHQUFHLE1BQU0sQ0FBQyxXQUFXLENBQUMsSUFBSSxDQUFDLENBQUM7Z0JBQ3ZDLE9BQU8sRUFBRSxLQUFLLEVBQUUsUUFBUSxFQUFFLElBQUksRUFBRSxVQUFVLEVBQUUsSUFBSSxFQUFFLFlBQVksRUFBRSxJQUFJLEVBQUUsQ0FBQztZQUN6RSxDQUFDO1lBQ0QsT0FBTyxTQUFTLENBQUM7UUFDbkIsQ0FBQztLQUNGLENBQUM7SUFDRixPQUFPLElBQUksS0FBSyxDQUFDLEdBQUcsRUFBRSxPQUFPLENBQW9CLENBQUM7QUFDcEQsQ0FBQztBQUVNLEtBQUssVUFBVSxjQUFjLENBQUMsRUFBaUM7SUFDcEUsTUFBTSxTQUFTLEdBQUcsRUFBRSxDQUFDLFdBQVcsQ0FBQyxNQUFNLEVBQUUsQ0FBQztJQUMxQyxNQUFNLE1BQU0sR0FBRyxNQUFNLDJEQUFZLENBQUMsU0FBUyxDQUFDLENBQUM7SUFDN0MsSUFBSSxDQUFDLE1BQU0sQ0FBQyxPQUFPO1FBQ2pCLE1BQU0sSUFBSSxLQUFLLENBQUMsVUFBVSxTQUFTLHFDQUFxQyxDQUFDLENBQUM7SUFFNUUsTUFBTSxNQUFNLEdBQUcsTUFBTSxDQUFDLE9BQU8sQ0FBQyxFQUFFLENBQUMsQ0FBQztJQUNsQyxJQUFJLE1BQU0sWUFBWSxPQUFPO1FBQzNCLE1BQU0sTUFBTSxDQUFDO0FBQ2pCLENBQUM7QUFFTSxTQUFTLDZCQUE2QixDQUFDLFdBQXdCLEVBQUUsU0FBYyxFQUFFLFNBQWU7SUFDckcsSUFBSSxTQUFTLEtBQUssU0FBUyxFQUFFLENBQUM7UUFDNUIsSUFBSSxDQUFDLDREQUFZLENBQUMsVUFBVSxDQUFDLFNBQVMsQ0FBQztZQUNyQyxTQUFTLEdBQUcsU0FBUyxDQUFDO2FBQ25CLENBQUM7WUFDSixNQUFNLFVBQVUsR0FBRyxvREFBVyxDQUFDLEdBQUcsQ0FBQyxXQUFXLEVBQUUsb0JBQW9CLENBQUMsQ0FBQyxRQUFRLENBQUMsU0FBUyxDQUFDLENBQUM7WUFDMUYsTUFBTSxVQUFVLEdBQUcsb0RBQVcsQ0FBQyxHQUFHLENBQUMsV0FBVyxFQUFFLG9CQUFvQixDQUFDLENBQUMsUUFBUSxDQUFDLFNBQVMsQ0FBQyxDQUFDO1lBQzFGLFNBQVMsR0FBRyxDQUFDLFVBQVUsQ0FBQyxNQUFNLEdBQUcsVUFBVSxDQUFDLE1BQU0sQ0FBQyxDQUFDLENBQUMsQ0FBQyxVQUFVLENBQUMsQ0FBQyxDQUFDLFVBQVUsQ0FBQztRQUNoRixDQUFDO0lBQ0gsQ0FBQztJQUVELE1BQU0sVUFBVSxHQUFHLG9EQUFXLENBQUMsR0FBRyxDQUFDLFdBQVcsRUFBRSxZQUFZLENBQUMsQ0FBQyxPQUFPLENBQUMsU0FBUyxDQUFDLENBQUM7SUFDakYsTUFBTSxVQUFVLEdBQUcsb0RBQVcsQ0FBQyxHQUFHLENBQUMsV0FBVyxFQUFFLFlBQVksQ0FBQyxDQUFDLE9BQU8sQ0FBQyxTQUFTLENBQUMsQ0FBQztJQUVqRixNQUFNLGNBQWMsR0FBRyxvREFBVyxDQUFDLGdCQUFnQixDQUFDLFdBQVcsQ0FBQyxDQUFDO0lBRWpFLG9EQUFXLENBQUMsR0FBRyxDQUFDLGNBQWMsRUFBRSxZQUFZLEVBQUUsVUFBVSxDQUFDLENBQUM7SUFDMUQsb0RBQVcsQ0FBQyxHQUFHLENBQUMsY0FBYyxFQUFFLFlBQVksRUFBRSxVQUFVLENBQUMsQ0FBQztJQUMxRCxvREFBVyxDQUFDLEtBQUssQ0FBQyxjQUFjLEVBQUUsWUFBWSxDQUFDLENBQUM7SUFDaEQsb0RBQVcsQ0FBQyxLQUFLLENBQUMsY0FBYyxFQUFFLGFBQWEsQ0FBQyxDQUFDO0lBRWpELE9BQU8sY0FBYyxDQUFDO0FBQ3hCLENBQUM7Ozs7Ozs7Ozs7Ozs7Ozs7OztBQ3JNRDs7Ozs7OztHQU9HO0FBRXNCO0FBRTBCO0FBRW5ELDZCQUFlLDBDQUFlLEVBQU87SUFDbkMsTUFBTSxLQUFLLEdBQUcsRUFBRSxDQUFDO0lBRWpCLEtBQUssQ0FBQyxJQUFJLENBQUMsZ0VBQTBCLENBQUMsZ0RBQW9CLENBQUMsQ0FBQyxDQUFDO0lBQzdELEtBQUssQ0FBQyxJQUFJLENBQUMsRUFBRSxDQUFDLENBQUM7SUFFZixLQUFLLE1BQU0sQ0FBQyxJQUFJLEVBQUUsS0FBSyxDQUFDLElBQUksTUFBTSxDQUFDLE9BQU8sQ0FBQyxFQUFFLENBQUMsWUFBWSxDQUFRLEVBQUUsQ0FBQztRQUNuRSxJQUFJLEtBQUssQ0FBQyxXQUFXLEVBQUUsQ0FBQztZQUN0QixLQUFLLENBQUMsSUFBSSxDQUFDLE1BQU0sS0FBSyxDQUFDLFdBQVcsS0FBSyxDQUFDLENBQUM7UUFDM0MsQ0FBQztRQUNELElBQUksT0FBTyxLQUFLLENBQUMsS0FBSyxLQUFLLFNBQVMsRUFBRSxDQUFDO1lBQ3JDLEtBQUssQ0FBQyxJQUFJLENBQUMsV0FBVyxJQUFJLElBQUksS0FBSyxDQUFDLEtBQUssQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLEVBQUUsQ0FBQyxDQUFDO1FBQ3ZELENBQUM7YUFDSSxJQUFJLE9BQU8sS0FBSyxDQUFDLEtBQUssS0FBSyxRQUFRLEVBQUUsQ0FBQztZQUN6QyxLQUFLLENBQUMsSUFBSSxDQUFDLFdBQVcsSUFBSSxJQUFJLEtBQUssQ0FBQyxLQUFLLEVBQUUsQ0FBQyxDQUFDO1FBQy9DLENBQUM7YUFDSSxJQUFJLE9BQU8sS0FBSyxDQUFDLEtBQUssS0FBSyxRQUFRLEVBQUUsQ0FBQztZQUN6QyxLQUFLLENBQUMsSUFBSSxDQUFDLFdBQVcsSUFBSSxLQUFLLEtBQUssQ0FBQyxLQUFLLEdBQUcsQ0FBQyxDQUFDO1FBQ2pELENBQUM7YUFDSSxJQUFJLEtBQUssQ0FBQyxPQUFPLENBQUMsS0FBSyxDQUFDLEtBQUssQ0FBQyxFQUFFLENBQUM7WUFDcEMsS0FBSyxDQUFDLElBQUksQ0FBQyxXQUFXLElBQUksS0FBSyxLQUFLLENBQUMsS0FBSyxDQUFDLElBQUksQ0FBQyxHQUFHLENBQUMsR0FBRyxDQUFDLENBQUM7UUFDM0QsQ0FBQzthQUNJLENBQUM7WUFDSixNQUFNLElBQUksS0FBSyxDQUFDLElBQUksSUFBSSxTQUFTLEtBQUssQ0FBQyxLQUFLLFFBQVEsQ0FBQyxDQUFDO1FBQ3hELENBQUM7UUFDRCxLQUFLLENBQUMsSUFBSSxDQUFDLEVBQUUsQ0FBQyxDQUFDO0lBQ2pCLENBQUM7SUFFRCxNQUFNLHVEQUFXLENBQUMsS0FBSyxDQUFDLEVBQUUsQ0FBQyxhQUFhLENBQUMsT0FBTyxFQUFFLENBQUMsUUFBUSxFQUFFLEVBQUUsRUFBRSxTQUFTLEVBQUUsSUFBSSxFQUFFLENBQUMsQ0FBQztJQUNwRixNQUFNLHVEQUFXLENBQUMsU0FBUyxDQUFDLEVBQUUsQ0FBQyxhQUFhLENBQUMsUUFBUSxFQUFFLEVBQUUsS0FBSyxDQUFDLElBQUksQ0FBQyxJQUFJLENBQUMsRUFBRSxPQUFPLENBQUMsQ0FBQztBQUN0RixDQUFDOzs7Ozs7Ozs7Ozs7Ozs7OztBQzNDRDs7Ozs7OztHQU9HO0FBRXNCO0FBRXpCLDZCQUFlLDBDQUFlLEVBQU87SUFDbkMsSUFBSSxPQUFPLEdBQUcsTUFBTSx1REFBVyxDQUFDLFFBQVEsQ0FBQyxFQUFFLENBQUMsWUFBWSxDQUFDLFFBQVEsRUFBRSxFQUFFLE9BQU8sQ0FBQyxDQUFDO0lBQzlFLE9BQU8sR0FBRyxPQUFPLENBQUMsT0FBTyxDQUFDLDZCQUE2QixFQUFFLENBQUMsS0FBSyxFQUFFLEVBQUUsRUFBRSxFQUFFO1FBQ3JFLE1BQU0sR0FBRyxHQUFHLEVBQUUsQ0FBQyxFQUFFLENBQUMsSUFBSSxFQUFFLENBQUM7UUFDekIsSUFBSSxLQUFLLENBQUMsT0FBTyxDQUFDLEdBQUcsQ0FBQztZQUNwQixPQUFPLEdBQUcsQ0FBQyxJQUFJLENBQUMsSUFBSSxDQUFDLENBQUM7UUFDeEIsT0FBTyxHQUFHLENBQUMsUUFBUSxFQUFFLENBQUM7SUFDeEIsQ0FBQyxDQUFDLENBQUM7SUFDSCxPQUFPLEdBQUcsT0FBTyxDQUFDLE9BQU8sQ0FBQywrQ0FBK0MsRUFBRSxDQUFDLEtBQUssRUFBRSxFQUFFLEVBQUUsRUFBRSxFQUFFLEVBQUU7UUFDM0YsT0FBTyxFQUFFLENBQUMsRUFBRSxDQUFDLENBQUMsQ0FBQyxDQUFDLFdBQVcsRUFBRSxJQUFJLEVBQUUsRUFBRSxDQUFDLENBQUMsQ0FBQyxhQUFhLEVBQUUsS0FBSyxDQUFDO0lBQy9ELENBQUMsQ0FBQyxDQUFDO0lBQ0gsTUFBTSx1REFBVyxDQUFDLEtBQUssQ0FBQyxFQUFFLENBQUMsYUFBYSxDQUFDLE9BQU8sRUFBRSxDQUFDLFFBQVEsRUFBRSxFQUFFLEVBQUUsU0FBUyxFQUFFLElBQUksRUFBRSxDQUFDLENBQUM7SUFDcEYsTUFBTSx1REFBVyxDQUFDLFNBQVMsQ0FBQyxFQUFFLENBQUMsYUFBYSxDQUFDLFFBQVEsRUFBRSxFQUFFLE9BQU8sRUFBRSxPQUFPLENBQUMsQ0FBQztBQUM3RSxDQUFDOzs7Ozs7Ozs7Ozs7Ozs7OztBQ3hCRDs7Ozs7OztHQU9HO0FBRStEO0FBQ1o7QUFFdEQsaUVBQWU7SUFDYixjQUFjO0lBQ2QsUUFBUTtDQUNULEVBQUM7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7QUNmRjs7Ozs7OztHQU9HO0FBRXFEO0FBQ0w7QUFDaUI7QUFHN0QsTUFBTSxnQkFBaUIsU0FBUSxpRUFBZTtJQUMzQyxLQUFLLENBQVM7SUFDZCxVQUFVLENBQWE7SUFFL0IsWUFBb0IsSUFBWSxFQUFFLFNBQXNCO1FBQ3RELEtBQUssRUFBRSxDQUFDO1FBQ1IsSUFBSSxDQUFDLEtBQUssR0FBRyxJQUFJLENBQUM7UUFDbEIsSUFBSSxDQUFDLFVBQVUsR0FBRyxTQUFTLElBQUksRUFBRSxDQUFDO0lBQ3BDLENBQUM7SUFFTSxNQUFNLENBQUMsTUFBTSxDQUFDLElBQVksRUFBRSxTQUFzQjtRQUN2RCxPQUFPLE1BQU0sQ0FBQyxJQUFJLENBQUMsSUFBSSxnQkFBZ0IsQ0FBQyxJQUFJLEVBQUUsU0FBUyxDQUFDLENBQUMsQ0FBQztJQUM1RCxDQUFDO0lBRUQsSUFBVyxJQUFJO1FBQ2IsT0FBTyxJQUFJLENBQUMsS0FBSyxDQUFDO0lBQ3BCLENBQUM7SUFFRCxJQUFXLFNBQVM7UUFDbEIsT0FBTyxJQUFJLENBQUMsVUFBVSxDQUFDO0lBQ3pCLENBQUM7SUFFTSxjQUFjLENBQUMsU0FBcUI7UUFDekMsb0RBQVcsQ0FBQyxjQUFjLENBQUMsSUFBSSxDQUFDLFVBQVUsRUFBRSxTQUFTLENBQUMsQ0FBQztJQUN6RCxDQUFDO0lBRU0sTUFBTSxDQUFDLFFBQVEsQ0FBQyxJQUFTO1FBQzlCLE9BQU8sZ0JBQWdCLENBQUMsTUFBTSxDQUFDLElBQUksQ0FBQyxJQUFJLEVBQUUsSUFBSSxDQUFDLFNBQVMsQ0FBQyxDQUFDO0lBQzVELENBQUM7SUFFTSxNQUFNO1FBQ1gsT0FBTztZQUNMLElBQUksRUFBRSxnQkFBZ0IsQ0FBQyxJQUFJO1lBQzNCLElBQUksRUFBRSxJQUFJLENBQUMsS0FBSztZQUNoQixTQUFTLEVBQUUsSUFBSSxDQUFDLFVBQVU7U0FDM0IsQ0FBQztJQUNKLENBQUM7SUFFTSxRQUFRO1FBQ2IsT0FBTyxXQUFXLGdCQUFnQixDQUFDLElBQUksR0FBRyxDQUFDO0lBQzdDLENBQUM7Q0FDRjtBQUFBLENBQUM7QUFFSyxNQUFNLFlBQWEsU0FBUSxpRUFBZTtJQUN2QyxLQUFLLENBQVM7SUFDZCxhQUFhLENBQXdCO0lBQ3JDLE1BQU0sQ0FBZ0I7SUFDdEIsT0FBTyxDQUFlO0lBQ3RCLFVBQVUsQ0FBZTtJQUN6QixVQUFVLENBQWU7SUFDekIsWUFBWSxDQUFjO0lBRWxDLFlBQW9CLE9BQTZCO1FBQy9DLEtBQUssRUFBRSxDQUFDO1FBQ1IsSUFBSSxDQUFDLFlBQVksR0FBRyxPQUFPLENBQUMsV0FBVyxDQUFDO1FBQ3hDLElBQUksQ0FBQyxLQUFLLEdBQUcsT0FBTyxDQUFDLElBQUksQ0FBQztRQUMxQixJQUFJLENBQUMsTUFBTSxHQUFHLE9BQU8sQ0FBQyxLQUFLLENBQUM7UUFDNUIsSUFBSSxDQUFDLGFBQWEsR0FBRyxPQUFPLENBQUMsWUFBWSxDQUFDO1FBQzFDLElBQUksQ0FBQyxPQUFPLEdBQUcsT0FBTyxDQUFDLE1BQU0sQ0FBQztRQUM5QixJQUFJLENBQUMsVUFBVSxHQUFHLE9BQU8sQ0FBQyxTQUFTLENBQUM7UUFDcEMsSUFBSSxDQUFDLFVBQVUsR0FBRyxPQUFPLENBQUMsU0FBUyxDQUFDO0lBQ3RDLENBQUM7SUFFTSxNQUFNLENBQUMsTUFBTSxDQUFDLE9BQTZCO1FBQ2hELE9BQU8sTUFBTSxDQUFDLElBQUksQ0FBQyxJQUFJLFlBQVksQ0FBQyxPQUFPLENBQUMsQ0FBQyxDQUFDO0lBQ2hELENBQUM7SUFFTSxjQUFjLENBQUMsU0FBcUI7UUFDekMsb0RBQVcsQ0FBQyxnQkFBZ0IsQ0FBQyxJQUFJLENBQUMsWUFBWSxFQUFFLFNBQVMsQ0FBQyxDQUFDO0lBQzdELENBQUM7SUFFRCxJQUFXLElBQUk7UUFDYixPQUFPLElBQUksQ0FBQyxLQUFLLENBQUM7SUFDcEIsQ0FBQztJQUVELElBQVcsWUFBWTtRQUNyQixPQUFPLElBQUksQ0FBQyxhQUFhLENBQUM7SUFDNUIsQ0FBQztJQUVELElBQVcsS0FBSztRQUNkLE9BQU8sSUFBSSxDQUFDLE1BQU0sQ0FBQztJQUNyQixDQUFDO0lBRUQsSUFBVyxNQUFNO1FBQ2YsT0FBTyxJQUFJLENBQUMsT0FBTyxDQUFDO0lBQ3RCLENBQUM7SUFFRCxJQUFXLFNBQVM7UUFDbEIsT0FBTyxJQUFJLENBQUMsVUFBVSxDQUFDO0lBQ3pCLENBQUM7SUFFRCxJQUFXLFNBQVM7UUFDbEIsT0FBTyxJQUFJLENBQUMsVUFBVSxDQUFDO0lBQ3pCLENBQUM7SUFFRCxJQUFXLFdBQVc7UUFDcEIsT0FBTyxJQUFJLENBQUMsWUFBWSxDQUFDO0lBQzNCLENBQUM7SUFFTSxVQUFVLENBQUMsTUFBd0I7UUFDeEMsSUFBSSxDQUFDLGNBQWMsQ0FBQyxNQUFNLENBQUMsU0FBUyxDQUFDLENBQUM7SUFDeEMsQ0FBQztJQUVNLE1BQU0sQ0FBQyxRQUFRLENBQUMsSUFBUztRQUM5QixNQUFNLE9BQU8sR0FBeUI7WUFDcEMsV0FBVyxFQUFFLG9EQUFXLENBQUMsUUFBUSxDQUFDLElBQUksQ0FBQyxXQUFXLENBQUM7WUFDbkQsSUFBSSxFQUFFLElBQUksQ0FBQyxJQUFJO1lBQ2YsWUFBWSxFQUFFLDREQUFZLENBQUMsVUFBVSxDQUFDLElBQUksQ0FBQyxZQUFZLENBQUMsQ0FBQyxDQUFDLENBQUMsNERBQVksQ0FBQyxNQUFNLENBQUMsSUFBSSxDQUFDLFlBQVksQ0FBQyxDQUFDLENBQUMsQ0FBQyxJQUFJLENBQUMsWUFBWTtZQUNySCxNQUFNLEVBQUUsNERBQVksQ0FBQyxNQUFNLENBQUMsSUFBSSxDQUFDLE1BQU0sQ0FBQztZQUN4QyxTQUFTLEVBQUUsNERBQVksQ0FBQyxNQUFNLENBQUMsSUFBSSxDQUFDLFNBQVMsQ0FBQztZQUM5QyxTQUFTLEVBQUUsNERBQVksQ0FBQyxNQUFNLENBQUMsSUFBSSxDQUFDLFNBQVMsQ0FBQztTQUMvQyxDQUFDO1FBQ0YsSUFBSSxJQUFJLENBQUMsS0FBSyxFQUFFLENBQUM7WUFDZixPQUFPLENBQUMsS0FBSyxHQUFHLDREQUFZLENBQUMsTUFBTSxDQUFDLElBQUksQ0FBQyxLQUFLLENBQUMsQ0FBQztRQUNsRCxDQUFDO1FBQ0QsT0FBTyxZQUFZLENBQUMsTUFBTSxDQUFDLE9BQU8sQ0FBQyxDQUFDO0lBQ3RDLENBQUM7SUFFTSxNQUFNO1FBQ1gsTUFBTSxNQUFNLEdBQWlCO1lBQzNCLElBQUksRUFBRSxZQUFZLENBQUMsSUFBSTtZQUN2QixJQUFJLEVBQUUsSUFBSSxDQUFDLEtBQUs7WUFDaEIsWUFBWSxFQUFFLElBQUksQ0FBQyxhQUFhO1lBQ2hDLE1BQU0sRUFBRSxJQUFJLENBQUMsT0FBTyxDQUFDLFdBQVcsRUFBRTtZQUNsQyxTQUFTLEVBQUUsSUFBSSxDQUFDLFVBQVUsQ0FBQyxXQUFXLEVBQUU7WUFDeEMsU0FBUyxFQUFFLElBQUksQ0FBQyxVQUFVLENBQUMsV0FBVyxFQUFFO1lBQ3hDLFdBQVcsRUFBRSxvREFBVyxDQUFDLE1BQU0sQ0FBQyxJQUFJLENBQUMsWUFBWSxDQUFDO1NBQ25ELENBQUM7UUFDRixJQUFJLElBQUksQ0FBQyxNQUFNLEVBQUUsQ0FBQztZQUNoQixNQUFNLENBQUMsS0FBSyxHQUFHLElBQUksQ0FBQyxNQUFNLENBQUMsV0FBVyxFQUFFLENBQUM7UUFDM0MsQ0FBQztRQUNELE9BQU8sTUFBTSxDQUFDO0lBQ2hCLENBQUM7Q0FDRjtBQUFBLENBQUM7QUFFRixXQUFpQixZQUFZO0lBVTVCLENBQUM7QUFFRixDQUFDLEVBWmdCLFlBQVksS0FBWixZQUFZLFFBWTVCLENBQUMseUJBQXlCOzs7Ozs7Ozs7Ozs7Ozs7OztBQ2pLM0I7Ozs7Ozs7R0FPRztBQUU4QztBQUVmO0FBRWxDLE1BQU0sTUFBTSxHQUFHLDJDQUFNLENBQUMsTUFBTSxDQUFDLHlGQUFlLENBQUMsQ0FBQztBQUV2QyxLQUFLLFVBQVUsaUJBQWlCLENBQUMsS0FBa0I7SUFDeEQsTUFBTSxTQUFTLEdBQUcsTUFBTSw4REFBVyxDQUFDLE9BQU8sQ0FBQyxDQUFDO0lBQzdDLElBQUksU0FBUyxFQUFFLENBQUM7UUFDZCxNQUFNLENBQUMsSUFBSSxDQUFDLDhDQUE4QyxDQUFDLENBQUM7UUFDNUQsS0FBSyxDQUFDLFlBQVksR0FBRyxPQUFPLENBQUM7UUFDN0IsS0FBSyxDQUFDLFVBQVUsR0FBRyxPQUFPLENBQUM7UUFDM0IsS0FBSyxDQUFDLFlBQVksR0FBRyxTQUFTLENBQUM7UUFDL0IsS0FBSyxDQUFDLEVBQUUsR0FBRyxTQUFTLENBQUM7UUFDckIsS0FBSyxDQUFDLE1BQU0sR0FBRyxhQUFhLENBQUM7UUFDN0IsS0FBSyxDQUFDLE1BQU0sR0FBRyxLQUFLLENBQUM7UUFDckIsS0FBSyxDQUFDLEVBQUUsR0FBRyxTQUFTLENBQUM7UUFDckIsS0FBSyxDQUFDLE9BQU8sR0FBRyxjQUFjLENBQUM7UUFDL0IsS0FBSyxDQUFDLE9BQU8sR0FBRyxjQUFjLENBQUM7UUFDL0IsS0FBSyxDQUFDLEtBQUssR0FBRyxZQUFZLENBQUM7UUFDM0IsT0FBTztJQUNULENBQUM7SUFFRCxNQUFNLE9BQU8sR0FBRyxNQUFNLDhEQUFXLENBQUMsS0FBSyxDQUFDLENBQUM7SUFDekMsSUFBSSxPQUFPLEVBQUUsQ0FBQztRQUNaLE1BQU0sQ0FBQyxJQUFJLENBQUMsNENBQTRDLENBQUMsQ0FBQztRQUMxRCxLQUFLLENBQUMsWUFBWSxHQUFHLEtBQUssQ0FBQztRQUMzQixLQUFLLENBQUMsVUFBVSxHQUFHLEtBQUssQ0FBQztRQUN6QixLQUFLLENBQUMsWUFBWSxHQUFHLEtBQUssQ0FBQztRQUMzQixLQUFLLENBQUMsRUFBRSxHQUFHLElBQUksQ0FBQztRQUNoQixLQUFLLENBQUMsTUFBTSxHQUFHLFFBQVEsQ0FBQztRQUN4QixLQUFLLENBQUMsTUFBTSxHQUFHLElBQUksQ0FBQztRQUNwQixLQUFLLENBQUMsRUFBRSxHQUFHLElBQUksQ0FBQztRQUNoQixLQUFLLENBQUMsT0FBTyxHQUFHLFNBQVMsQ0FBQztRQUMxQixLQUFLLENBQUMsT0FBTyxHQUFHLFNBQVMsQ0FBQztRQUMxQixLQUFLLENBQUMsS0FBSyxHQUFHLE9BQU8sQ0FBQztRQUN0QixPQUFPO0lBQ1QsQ0FBQztJQUVELE1BQU0sNEJBQTRCLENBQUM7QUFDckMsQ0FBQzs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7QUNqREQ7Ozs7Ozs7R0FPRztBQUVtRDtBQUNIO0FBQ0w7QUFFTztBQUVuQjtBQUVsQyxNQUFNLE1BQU0sR0FBRywyQ0FBTSxDQUFDLE1BQU0sQ0FBQyxzRkFBZSxDQUFDLENBQUM7QUFFdkMsTUFBTSxjQUFlLFNBQVEsK0RBQWE7SUFDdkMsWUFBWSxDQUFjO0lBQzFCLE9BQU8sQ0FBMEI7SUFFekMsWUFBbUIsV0FBd0IsRUFBRSxNQUErQjtRQUMxRSxLQUFLLEVBQUUsQ0FBQztRQUNSLElBQUksQ0FBQyxZQUFZLEdBQUcsV0FBVyxDQUFDO1FBQ2hDLElBQUksQ0FBQyxPQUFPLEdBQUcsTUFBTSxDQUFDO0lBQ3hCLENBQUM7SUFFTSxLQUFLLENBQUMsT0FBTztRQUNsQixJQUFJLElBQUksR0FBRyxJQUFJLENBQUMsT0FBTyxDQUFDO1FBQ3hCLElBQUksSUFBSSxZQUFZLDREQUFZLEVBQUUsQ0FBQztZQUNqQyxNQUFNLFNBQVMsR0FBRyxJQUFJLENBQUMsTUFBTSxFQUFFLENBQUMsQ0FBQyxtQkFBbUI7WUFDcEQsTUFBTSxDQUFDLEtBQUssQ0FBQyxRQUFRLEVBQUUsU0FBUyxDQUFDLENBQUM7WUFDbEMsSUFBSSxHQUFHLENBQUMsTUFBTSwyREFBWSxDQUFDLFNBQVMsQ0FBQyxDQUFDLENBQUMsT0FBTyxDQUFDO1FBQ2pELENBQUM7UUFDRCxJQUFJLElBQUksWUFBWSxRQUFRLEVBQUUsQ0FBQztZQUM3QixNQUFNLEVBQUUsR0FBRyw4REFBYSxDQUFDLE1BQU0sQ0FBQyxJQUFJLENBQUMsWUFBWSxDQUFDLENBQUM7WUFDbkQsTUFBTSxNQUFNLEdBQUcsSUFBSSxDQUFDLEVBQUUsQ0FBQyxDQUFDO1lBQ3hCLElBQUksTUFBTSxZQUFZLE9BQU87Z0JBQzNCLE1BQU0sTUFBTSxDQUFDO1FBQ2pCLENBQUM7YUFDSSxDQUFDO1lBQ0osTUFBTSxJQUFJLEtBQUssQ0FBQyxzQkFBc0IsQ0FBQyxDQUFDO1FBQzFDLENBQUM7SUFDSCxDQUFDO0lBRU0sTUFBTTtRQUNYLE9BQU87WUFDTCxJQUFJLEVBQUUsY0FBYyxDQUFDLElBQUk7WUFDekIsV0FBVyxFQUFFLElBQUksQ0FBQyxZQUFZO1lBQzlCLE1BQU0sRUFBRSxJQUFJLENBQUMsT0FBTztTQUNyQjtJQUNILENBQUM7Q0FDRjtBQUFBLENBQUM7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7QUN0REY7Ozs7Ozs7R0FPRztBQUVzQjtBQUU2QjtBQUdwQjtBQUVsQyxNQUFNLE1BQU0sR0FBRywyQ0FBTSxDQUFDLE1BQU0sQ0FBQyw0RkFBZSxDQUFDLENBQUM7QUFLN0MsQ0FBQztBQUVLLE1BQU0sb0JBQXFCLFNBQVEsK0RBQWE7SUFDN0MsUUFBUSxDQUFVO0lBRTFCO1FBQ0UsS0FBSyxFQUFFLENBQUM7UUFDUixJQUFJLENBQUMsUUFBUSxHQUFHLEVBQUUsQ0FBQztJQUNyQixDQUFDO0lBRU0sS0FBSyxDQUFDLE9BQU87UUFDbEIsS0FBSyxNQUFNLEVBQUMsR0FBRyxFQUFFLElBQUksRUFBQyxJQUFJLElBQUksQ0FBQyxRQUFRLEVBQUUsQ0FBQztZQUN4QyxNQUFNLENBQUMsTUFBTSxDQUFDLGNBQWMsR0FBRyxJQUFJLENBQUMsQ0FBQztZQUNyQyxNQUFNLHVEQUFXLENBQUMsS0FBSyxDQUFDLElBQUksQ0FBQyxPQUFPLEVBQUUsQ0FBQyxNQUFNLEVBQUUsRUFBRSxFQUFFLFNBQVMsRUFBRSxJQUFJLEVBQUUsQ0FBQyxDQUFDO1lBQ3RFLE1BQU0sdURBQVcsQ0FBQyxFQUFFLENBQUMsR0FBRyxDQUFDLE1BQU0sRUFBRSxFQUFFLElBQUksQ0FBQyxNQUFNLEVBQUUsRUFBRSxFQUFFLEtBQUssRUFBRSxJQUFJLEVBQUUsQ0FBQyxDQUFDO1FBQ3JFLENBQUM7SUFDSCxDQUFDO0lBRU0sR0FBRyxDQUFDLEdBQWlCLEVBQUUsSUFBa0I7UUFDOUMsSUFBSSxDQUFDLFFBQVEsQ0FBQyxJQUFJLENBQUMsRUFBQyxHQUFHLEVBQUUsSUFBSSxFQUFDLENBQUMsQ0FBQztJQUNsQyxDQUFDO0lBRU0sTUFBTSxDQUFDLFFBQVEsQ0FBQyxDQUFlO1FBQ3BDLE1BQU0sSUFBSSxHQUFHLElBQUksb0JBQW9CLENBQUM7UUFDdEMsS0FBSyxNQUFNLElBQUksSUFBSyxDQUFTLENBQUMsT0FBa0I7WUFDOUMsSUFBSSxDQUFDLFFBQVEsQ0FBQyxJQUFJLENBQUMsSUFBSSxDQUFDLENBQUM7UUFDM0IsT0FBTyxJQUFJLENBQUM7SUFDZCxDQUFDO0lBRU0sTUFBTTtRQUNYLE9BQU87WUFDTCxJQUFJLEVBQUUsb0JBQW9CLENBQUMsSUFBSTtZQUMvQixPQUFPLEVBQUUsSUFBSSxDQUFDLFFBQVE7U0FDdkI7SUFDSCxDQUFDO0NBQ0Y7QUFBQSxDQUFDOzs7Ozs7Ozs7Ozs7Ozs7Ozs7O0FDeERGOzs7Ozs7O0dBT0c7QUFFaUM7QUFDQTtBQUM0QjtBQUVoRSxTQUFTLG1CQUFtQixDQUFDLElBQVk7SUFDdkMsSUFBSSw2Q0FBSSxDQUFDLGdCQUFnQjtRQUN2QixJQUFJLElBQUksNkNBQUksQ0FBQyxnQkFBZ0IsQ0FBQztJQUVoQyxNQUFNLE1BQU0sR0FBRyxFQUFFLENBQUM7SUFDbEIsTUFBTSxLQUFLLEdBQUcsQ0FBQyxPQUFPLENBQUMsR0FBRyxDQUFDLElBQUksSUFBSSxFQUFFLENBQUMsQ0FBQyxLQUFLLENBQUMsNkNBQUksQ0FBQyxTQUFTLENBQUMsQ0FBQztJQUM3RCxLQUFLLE1BQU0sSUFBSSxJQUFJLEtBQUssRUFBRSxDQUFDO1FBQ3pCLE1BQU0sUUFBUSxHQUFHLDZDQUFJLENBQUMsT0FBTyxDQUFDLElBQUksRUFBRSxJQUFJLENBQUMsQ0FBQztRQUMxQyxNQUFNLENBQUMsSUFBSSxDQUFDLFFBQVEsQ0FBQyxDQUFDO0lBQ3hCLENBQUM7SUFFRCxPQUFPLE1BQU0sQ0FBQztBQUNoQixDQUFDO0FBRU0sS0FBSyxVQUFVLFdBQVcsQ0FBQyxJQUFZO0lBQzVDLEtBQUssTUFBTSxJQUFJLElBQUksbUJBQW1CLENBQUMsSUFBSSxDQUFDLEVBQUUsQ0FBQztRQUM3QyxJQUFJLE1BQU0sNkRBQVUsQ0FBQyxJQUFJLENBQUM7WUFDeEIsT0FBTyxJQUFJLENBQUM7SUFDaEIsQ0FBQztJQUNELE9BQU8sU0FBUyxDQUFDO0FBQ25CLENBQUM7QUFFTSxTQUFTLGVBQWUsQ0FBQyxJQUFZO0lBQzFDLEtBQUssTUFBTSxJQUFJLElBQUksbUJBQW1CLENBQUMsSUFBSSxDQUFDLEVBQUUsQ0FBQztRQUM3QyxJQUFJLGlFQUFjLENBQUMsSUFBSSxDQUFDO1lBQ3RCLE9BQU8sSUFBSSxDQUFDO0lBQ2hCLENBQUM7SUFDRCxPQUFPLFNBQVMsQ0FBQztBQUNuQixDQUFDOzs7Ozs7Ozs7Ozs7Ozs7OztBQ3pDRDs7Ozs7OztHQU9HO0FBSStCO0FBR2xDLE1BQU0sTUFBTSxHQUFHLDJDQUFNLENBQUMsTUFBTSxDQUFDLHNGQUFlLENBQUMsQ0FBQztBQUV2QyxNQUFNLFVBQVU7SUFDYixRQUFRLENBQXFCO0lBQzdCLEtBQUssQ0FBcUI7SUFDMUIsT0FBTyxDQUFxQjtJQUM1QixRQUFRLEdBQUcsSUFBSSxLQUFhLENBQUM7SUFDN0IsTUFBTSxHQUFHLElBQUksS0FBb0IsQ0FBQztJQUUxQyxZQUFZLElBQWE7UUFDdkIsSUFBSSxDQUFDLEtBQUssR0FBRyxJQUFJLENBQUM7SUFDcEIsQ0FBQztJQUVELElBQUksT0FBTztRQUNULE9BQU8sSUFBSSxDQUFDLFFBQVEsQ0FBQztJQUN2QixDQUFDO0lBRUQsSUFBSSxPQUFPLENBQUMsS0FBYTtRQUN2QixJQUFJLENBQUMsUUFBUSxHQUFHLEtBQUssQ0FBQztJQUN4QixDQUFDO0lBRUQsSUFBSSxJQUFJO1FBQ04sT0FBTyxJQUFJLENBQUMsS0FBSyxDQUFDO0lBQ3BCLENBQUM7SUFFRCxJQUFJLE1BQU07UUFDUixPQUFPLElBQUksQ0FBQyxPQUFPLENBQUM7SUFDdEIsQ0FBQztJQUVELElBQUksTUFBTSxDQUFDLEtBQW1CO1FBQzVCLElBQUksQ0FBQyxPQUFPLEdBQUcsS0FBSyxDQUFDLE1BQU0sRUFBRSxDQUFDO0lBQ2hDLENBQUM7SUFFRCxJQUFJLE9BQU87UUFDVCxPQUFPLElBQUksQ0FBQyxRQUFRLENBQUM7SUFDdkIsQ0FBQztJQUVNLGFBQWEsQ0FBQyxHQUFHLEtBQWU7UUFDckMsSUFBSSxDQUFDLFFBQVEsQ0FBQyxJQUFJLENBQUMsR0FBRyxLQUFLLENBQUMsQ0FBQztJQUMvQixDQUFDO0lBRU0sT0FBTyxDQUFDLElBQW1CO1FBQ2hDLElBQUksQ0FBQyxNQUFNLENBQUMsSUFBSSxDQUFDLElBQUksQ0FBQyxDQUFDO0lBQ3pCLENBQUM7SUFFRCxLQUFLLENBQUMsTUFBTTtRQUNWLEtBQUssTUFBTSxJQUFJLElBQUksSUFBSSxDQUFDLE1BQU0sRUFBRSxDQUFDO1lBQy9CLE1BQU0sR0FBRyxHQUFHLElBQUksQ0FBQyxPQUFPLEVBQUUsQ0FBQztZQUMzQixJQUFJLEdBQUcsWUFBWSxPQUFPO2dCQUN4QixNQUFNLEdBQUcsQ0FBQztRQUNkLENBQUM7SUFDSCxDQUFDO0lBRU0sTUFBTTtRQUNYLE1BQU0sSUFBSSxHQUFRO1lBQ2hCLElBQUksRUFBRSxVQUFVLENBQUMsSUFBSTtZQUNyQixPQUFPLEVBQUUsSUFBSSxDQUFDLFFBQVE7WUFDdEIsS0FBSyxFQUFFLElBQUksQ0FBQyxNQUFNO1NBQ25CLENBQUM7UUFDRixJQUFJLElBQUksQ0FBQyxRQUFRLEVBQUUsQ0FBQztZQUNsQixJQUFJLENBQUMsT0FBTyxHQUFHLElBQUksQ0FBQyxRQUFRLENBQUM7UUFDL0IsQ0FBQztRQUNELElBQUksSUFBSSxDQUFDLEtBQUssRUFBRSxDQUFDO1lBQ2YsSUFBSSxDQUFDLElBQUksR0FBRyxJQUFJLENBQUMsS0FBSyxDQUFDO1FBQ3pCLENBQUM7UUFDRCxJQUFJLElBQUksQ0FBQyxPQUFPLEVBQUUsQ0FBQztZQUNqQixJQUFJLENBQUMsTUFBTSxHQUFHLElBQUksQ0FBQyxPQUFPLENBQUM7UUFDN0IsQ0FBQztRQUNELE9BQU8sSUFBSSxDQUFDO0lBQ2QsQ0FBQztDQUNGO0FBQUEsQ0FBQztBQUVLLE1BQU0sY0FBYztJQUNqQixRQUFRLEdBQUcsSUFBSSxLQUFpQixDQUFDO0lBRXpDLElBQVcsT0FBTztRQUNoQixPQUFPLElBQUksQ0FBQyxRQUFRLENBQUM7SUFDdkIsQ0FBQztJQUVNLFNBQVMsQ0FBQyxFQUFjO1FBQzdCLElBQUksRUFBRSxDQUFDLElBQUksSUFBSSxJQUFJLENBQUMsUUFBUSxDQUFDLElBQUksQ0FBQyxDQUFDLENBQUMsRUFBRSxFQUFFLENBQUMsQ0FBQyxDQUFDLElBQUksS0FBSyxFQUFFLENBQUMsSUFBSSxDQUFDO1lBQzFELE1BQU0sSUFBSSxLQUFLLENBQUMsU0FBUyxFQUFFLENBQUMsSUFBSSxVQUFVLENBQUMsQ0FBQztRQUM5QyxJQUFJLEVBQUUsQ0FBQyxNQUFNLElBQUksSUFBSSxDQUFDLFFBQVEsQ0FBQyxJQUFJLENBQUMsQ0FBQyxDQUFDLEVBQUUsRUFBRSxDQUFDLENBQUMsQ0FBQyxNQUFNLEtBQUssRUFBRSxDQUFDLE1BQU0sQ0FBQztZQUNoRSxNQUFNLElBQUksS0FBSyxDQUFDLFdBQVcsRUFBRSxDQUFDLE1BQU0sVUFBVSxDQUFDLENBQUM7UUFDbEQsSUFBSSxDQUFDLFFBQVEsQ0FBQyxJQUFJLENBQUMsRUFBRSxDQUFDLENBQUM7SUFDekIsQ0FBQztJQUVNLFNBQVMsQ0FBQyxJQUFZO1FBQzNCLElBQUksQ0FBQyxJQUFJO1lBQ1AsT0FBTyxTQUFTLENBQUM7UUFDbkIsT0FBTyxJQUFJLENBQUMsUUFBUSxDQUFDLElBQUksQ0FBQyxDQUFDLENBQUMsRUFBRSxFQUFFLENBQUMsQ0FBQyxDQUFDLElBQUksS0FBSyxJQUFJLENBQUMsQ0FBQztJQUNwRCxDQUFDO0lBRU8saUJBQWlCLENBQUMsSUFBWSxFQUFFLE1BQXlCO1FBQy9ELElBQUksTUFBTSxDQUFDLElBQUksQ0FBQyxDQUFDLENBQUMsRUFBRSxDQUFDLENBQUMsQ0FBQyxJQUFJLEtBQUssSUFBSSxJQUFJLENBQUMsQ0FBQyxNQUFNLEtBQUssSUFBSSxDQUFDLEVBQUUsQ0FBQztZQUMzRCxPQUFPO1FBQ1QsQ0FBQztRQUVELE1BQU0sSUFBSSxHQUFHLElBQUksQ0FBQyxRQUFRLENBQUMsSUFBSSxDQUFDLENBQUMsQ0FBQyxFQUFFLENBQUMsQ0FBQyxDQUFDLElBQUksS0FBSyxJQUFJLElBQUksQ0FBQyxDQUFDLE1BQU0sS0FBSyxJQUFJLENBQUMsQ0FBQztRQUMzRSxJQUFJLENBQUMsSUFBSSxFQUFFLENBQUM7WUFDVixPQUFPO1FBQ1QsQ0FBQztRQUVELEtBQUssTUFBTSxJQUFJLElBQUksSUFBSSxDQUFDLE9BQU8sRUFBRSxDQUFDO1lBQ2hDLElBQUksQ0FBQyxpQkFBaUIsQ0FBQyxJQUFJLENBQUMsUUFBUSxFQUFFLEVBQUUsTUFBTSxDQUFDLENBQUM7UUFDbEQsQ0FBQztRQUVELE1BQU0sQ0FBQyxJQUFJLENBQUMsSUFBSSxDQUFDLENBQUM7SUFDcEIsQ0FBQztJQUVNLGFBQWEsQ0FBQyxJQUFXO1FBQzlCLE1BQU0sTUFBTSxHQUFHLElBQUksS0FBaUIsQ0FBQztRQUNyQyxJQUFJLENBQUMsaUJBQWlCLENBQUMsSUFBSSxFQUFFLE1BQU0sQ0FBQyxDQUFDO1FBQ3JDLE9BQU8sTUFBTSxDQUFDO0lBQ2hCLENBQUM7SUFFTSxNQUFNO1FBQ1gsT0FBTztZQUNMLElBQUksRUFBRSxjQUFjLENBQUMsSUFBSTtZQUN6QixPQUFPLEVBQUUsSUFBSSxDQUFDLFFBQVE7U0FDdkIsQ0FBQztJQUNKLENBQUM7Q0FDRjtBQUFBLENBQUM7Ozs7Ozs7Ozs7Ozs7Ozs7O0FDeElGOzs7Ozs7O0dBT0c7QUFHMEQ7QUFDVjtBQUU1QyxNQUFNLGFBQWE7SUFDaEIsTUFBTSxDQUF3QjtJQUM5QixZQUFZLENBQWU7SUFDM0IsUUFBUSxDQUFnQjtJQUVoQyxZQUFtQixLQUE0QixFQUFFLFdBQXlCLEVBQUUsT0FBc0I7UUFDaEcsSUFBSSxDQUFDLE1BQU0sR0FBRyxLQUFLLENBQUM7UUFDcEIsSUFBSSxDQUFDLFlBQVksR0FBRyxXQUFXLENBQUM7UUFDaEMsSUFBSSxDQUFDLFFBQVEsR0FBRyxPQUFPLENBQUM7SUFDMUIsQ0FBQztJQUVNLE1BQU0sQ0FBQyxNQUFNLENBQUMsS0FBNEIsRUFBRSxXQUF5QixFQUFFLE9BQXNCO1FBQ2xHLE9BQU8sSUFBSSxhQUFhLENBQUMsS0FBSyxFQUFFLFdBQVcsRUFBRSxPQUFPLENBQUMsQ0FBQztJQUN4RCxDQUFDO0lBRUQsSUFBVyxLQUFLO1FBQ2QsT0FBTyxJQUFJLENBQUMsTUFBTSxDQUFDO0lBQ3JCLENBQUM7SUFFRCxJQUFXLFdBQVc7UUFDcEIsT0FBTyxJQUFJLENBQUMsWUFBWSxDQUFDO0lBQzNCLENBQUM7SUFFRCxJQUFXLE9BQU87UUFDaEIsT0FBTyxJQUFJLENBQUMsUUFBUSxDQUFDO0lBQ3ZCLENBQUM7SUFFTSxNQUFNLENBQUMsUUFBUSxDQUFDLElBQVM7UUFDOUIsTUFBTSxLQUFLLEdBQUcsNERBQVksQ0FBQyxRQUFRLENBQUMsSUFBSSxDQUFDLEtBQUssQ0FBQyxDQUFDO1FBQ2hELE1BQU0sV0FBVyxHQUFHLDREQUFZLENBQUMsTUFBTSxDQUFDLElBQUksQ0FBQyxXQUFXLENBQUMsQ0FBQztRQUMxRCxNQUFNLE9BQU8sR0FBRyxJQUFJLENBQUMsT0FBTyxDQUFDLENBQUMsQ0FBQyw0REFBWSxDQUFDLE1BQU0sQ0FBQyxJQUFJLENBQUMsT0FBTyxDQUFDLENBQUMsQ0FBQyxDQUFDLFNBQVMsQ0FBQztRQUM3RSxPQUFPLElBQUksYUFBYSxDQUFDLEtBQUssRUFBRSxXQUFXLEVBQUUsT0FBTyxDQUFDLENBQUM7SUFDeEQsQ0FBQztJQUVNLE1BQU07UUFDWCxNQUFNLE1BQU0sR0FBaUI7WUFDM0IsSUFBSSxFQUFFLGFBQWEsQ0FBQyxJQUFJO1lBQ3hCLEtBQUssRUFBRSxJQUFJLENBQUMsTUFBTSxDQUFDLE1BQU0sRUFBRTtZQUMzQixXQUFXLEVBQUUsSUFBSSxDQUFDLFlBQVksQ0FBQyxXQUFXLEVBQUU7U0FDN0MsQ0FBQztRQUNGLElBQUksSUFBSSxDQUFDLFFBQVE7WUFDZixNQUFNLENBQUMsT0FBTyxHQUFHLElBQUksQ0FBQyxRQUFRLENBQUMsV0FBVyxFQUFFLENBQUM7UUFDL0MsT0FBTyxNQUFNLENBQUM7SUFDaEIsQ0FBQztDQUNGO0FBQUEsQ0FBQzs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7O0FDekRGOzs7Ozs7O0dBT0c7QUFFOEM7QUFDRztBQUVnQjtBQUN2QjtBQUNPO0FBRWxCO0FBRWxDLE1BQU0sTUFBTSxHQUFHLDJDQUFNLENBQUMsTUFBTSxDQUFDLHdGQUFlLENBQUMsQ0FBQztBQUV2QyxNQUFNLGdCQUFpQixTQUFRLDBEQUFXO0lBQ3ZDLFFBQVEsQ0FBaUI7SUFFakMsWUFBbUIsS0FBa0IsRUFBRSxPQUF1QjtRQUM1RCxLQUFLLENBQUMsS0FBSyxDQUFDLENBQUM7UUFDYixJQUFJLENBQUMsUUFBUSxHQUFHLE9BQU8sQ0FBQztJQUMxQixDQUFDO0lBRU0sYUFBYSxDQUFDLEtBQWtCLEVBQUUsTUFBVyxFQUFFLE1BQVc7UUFDL0QsSUFBSSxDQUFDLFFBQVEsQ0FBQyxpQkFBaUIsQ0FBQyxLQUFLLEVBQUUsTUFBTSxFQUFFLE1BQU0sQ0FBQyxDQUFDO0lBQ3pELENBQUM7SUFFTSxpQkFBaUIsQ0FBQyxLQUFrQixFQUFFLE1BQTJCO1FBQ3RFLElBQUksU0FBUyxHQUFHLE1BQU0sQ0FBQztRQUN2QixJQUFJLE9BQU8sTUFBTSxLQUFLLFFBQVEsRUFBRSxDQUFDO1lBQy9CLE1BQU0sUUFBUSxHQUFHLG9EQUFXLENBQUMsR0FBRyxDQUFDLEtBQUssRUFBRSxZQUFZLENBQUMsQ0FBQyxPQUFPLENBQUMsTUFBTSxDQUFDLENBQUMsUUFBUSxFQUFFLENBQUM7WUFDakYsSUFBSSxDQUFDLGlFQUFjLENBQUMsUUFBUSxDQUFDO2dCQUMzQixPQUFPO1lBQ1QsU0FBUyxHQUFHLDBEQUFXLENBQUMsUUFBUSxDQUFDLENBQUM7UUFDcEMsQ0FBQztRQUVELG9EQUFXLENBQUMsNEJBQTRCLENBQUMsS0FBSyxFQUFFLDZEQUFxQixFQUFFLFNBQVMsQ0FBQyxDQUFDO0lBQ3BGLENBQUM7SUFFTSxlQUFlLENBQUMsS0FBa0IsRUFBRSxTQUFnQyxFQUFFLFNBQWlDO1FBQzVHLElBQUksQ0FBQyxRQUFRLENBQUMsZUFBZSxDQUFDLEtBQUssRUFBRSxTQUFTLEVBQUUsU0FBUyxDQUFDLENBQUM7SUFDN0QsQ0FBQztDQUNGO0FBQUEsQ0FBQzs7Ozs7Ozs7Ozs7Ozs7Ozs7O0FDL0NGOzs7Ozs7O0dBT0c7QUFlSSxNQUFlLGFBQWE7Q0FFbEM7QUFBQSxDQUFDO0FBRUssTUFBZSxvQkFBb0I7Q0FJekM7QUFBQSxDQUFDO0FBRUssTUFBZSxlQUFlO0NBMEJwQztBQUFBLENBQUM7QUFFSyxNQUFlLGVBQWU7Q0FFcEM7QUFBQSxDQUFDO0FBVUQsQ0FBQztBQWdCRCxDQUFDOzs7Ozs7Ozs7Ozs7Ozs7O0FDeEZGOzs7Ozs7O0dBT0c7QUFJZ0U7QUFFbkUsTUFBTSxNQUFNLEdBQUcsTUFBTSxDQUFDLFFBQVEsQ0FBQyxDQUFDO0FBQ2hDLE1BQU0sS0FBSyxHQUFHLE1BQU0sQ0FBQyxPQUFPLENBQUMsQ0FBQztBQUV2QixNQUFNLGFBQWMsU0FBUSw2REFBYztJQUMvQyxDQUFDLE1BQU0sQ0FBQyxDQUFpQjtJQUN6QixDQUFDLEtBQUssQ0FBQyxDQUFjO0lBRXJCLFlBQW1CLE1BQXNCLEVBQUUsV0FBd0I7UUFDakUsS0FBSyxDQUFDLFdBQVcsQ0FBQyxDQUFDO1FBQ25CLElBQUksQ0FBQyxNQUFNLENBQUMsR0FBRyxNQUFNLENBQUM7UUFDdEIsSUFBSSxDQUFDLEtBQUssQ0FBQyxHQUFHLFdBQVcsQ0FBQztJQUM1QixDQUFDO0lBRU0sb0JBQW9CLENBQUMsR0FBUSxFQUFFLElBQVM7UUFDN0MsSUFBSSxDQUFDLE1BQU0sQ0FBQyxDQUFDLG9CQUFvQixDQUFDLElBQUksQ0FBQyxLQUFLLENBQUMsRUFBRSxHQUFHLEVBQUUsSUFBSSxDQUFDLENBQUM7SUFDNUQsQ0FBQztJQUVNLE1BQU0sQ0FBQyxNQUFNLENBQUMsTUFBc0IsRUFBRSxXQUF3QjtRQUNuRSxPQUFPLGdFQUFhLENBQUMsSUFBSSxhQUFhLENBQUMsTUFBTSxFQUFFLFdBQVcsQ0FBQyxDQUFDLENBQUM7SUFDL0QsQ0FBQztDQUNGO0FBQUEsQ0FBQzs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7QUNqQ0Y7Ozs7Ozs7R0FPRztBQUVzQjtBQUVnQztBQUNOO0FBQ2E7QUFDTDtBQUNRO0FBQ1Y7QUFDRTtBQUdkO0FBQ1g7QUFDYTtBQUdNO0FBQ0Y7QUFDSjtBQUVRO0FBQ0Y7QUFDYztBQUVnQjtBQUVoQztBQUVuRCxNQUFNLE1BQU0sR0FBRywyQ0FBTSxDQUFDLE1BQU0sQ0FBQyxzRkFBZSxDQUFDLENBQUM7QUFFOUMsTUFBTSxPQUFPLEdBQUcsTUFBTSxDQUFDLFNBQVMsQ0FBQyxDQUFDO0FBQ2xDLE1BQU0sS0FBSyxHQUFHLE1BQU0sQ0FBQyxPQUFPLENBQUMsQ0FBQztBQUM5QixNQUFNLGVBQWUsR0FBRyxNQUFNLENBQUMsaUJBQWlCLENBQUMsQ0FBQztBQXVCakQsQ0FBQztBQUVGLFNBQVMsaUJBQWlCLENBQUMsSUFBUyxFQUFFLEtBQVU7SUFDOUMsSUFBSSxLQUFLLENBQUMsT0FBTyxDQUFDLElBQUksQ0FBQyxDQUFDLENBQUMsQ0FBQyxJQUFJLENBQUMsUUFBUSxDQUFDLEtBQUssQ0FBQyxDQUFDLENBQUMsQ0FBQyxPQUFPLEtBQUssS0FBSyxJQUFJO1FBQ3BFLE9BQU8sS0FBSyxDQUFDO0lBQ2YsTUFBTSxJQUFJLEtBQUssQ0FBQyxRQUFRLEtBQUssY0FBYyxJQUFJLEVBQUUsQ0FBQyxDQUFDO0FBQ3JELENBQUM7QUFFRCxTQUFTLGVBQWUsQ0FBQyxPQUF1QixFQUFFLENBQXFDO0lBQ3JGLElBQUksT0FBTyxDQUFDLEtBQUssUUFBUTtRQUN2QixPQUFPLENBQUMsQ0FBQztJQUVYLElBQUksQ0FBQyxZQUFZLDREQUFZO1FBQzNCLE9BQU8sQ0FBQyxDQUFDLFFBQVEsRUFBRSxDQUFDO0lBRXRCLElBQUksQ0FBQyxZQUFZLHlEQUFVLEVBQUUsQ0FBQztRQUM1QixNQUFNLE1BQU0sR0FBRyxPQUFPLENBQUMsT0FBTyxDQUFDLEdBQUcsQ0FBQyxDQUFDLENBQUMsVUFBVSxDQUFDLENBQUM7UUFDakQsT0FBTyxNQUFNLENBQUMsT0FBTyxFQUFFLENBQUMsUUFBUSxFQUFFLENBQUM7SUFDckMsQ0FBQztJQUVELE1BQU0sSUFBSSxLQUFLLENBQUMsNEJBQTRCLENBQUMsRUFBRSxDQUFDLENBQUM7QUFDbkQsQ0FBQztBQUVELFNBQVMsb0JBQW9CLENBQUMsT0FBdUIsRUFBRSxJQUFtQjtJQUN4RSxNQUFNLE9BQU8sR0FBRyxlQUFlLENBQUMsT0FBTyxFQUFFLElBQUksQ0FBQyxPQUFPLENBQUMsQ0FBQztJQUN2RCxNQUFNLElBQUksR0FBRyxJQUFJLENBQUMsSUFBSSxDQUFDLEdBQUcsQ0FBQyxDQUFDLENBQUMsRUFBRSxDQUFDLGVBQWUsQ0FBQyxPQUFPLEVBQUUsQ0FBQyxDQUFDLENBQUMsQ0FBQztJQUM3RCxPQUFPLEVBQUMsT0FBTyxFQUFFLElBQUksRUFBQyxDQUFDO0FBQ3pCLENBQUM7QUFFTSxNQUFNLGNBQWM7SUFDakIsQ0FBQyxPQUFPLENBQUMsQ0FBbUI7SUFDNUIsY0FBYyxHQUFHLElBQUksR0FBeUIsQ0FBQztJQUUvQyxDQUFDLEtBQUssQ0FBQyxDQUEyQjtJQUNsQyxZQUFZLENBQWtCO0lBQzlCLHFCQUFxQixDQUFNO0lBQzNCLENBQUMsZUFBZSxDQUFDLENBQWlCO0lBQ2xDLFlBQVksQ0FBb0I7SUFDaEMsV0FBVyxDQUFnQjtJQUVuQztRQUNFLElBQUksQ0FBQyxPQUFPLENBQUMsR0FBRyxvRUFBZ0IsQ0FBQyxNQUFNLEVBQUUsQ0FBQztRQUMxQyxJQUFJLENBQUMsS0FBSyxDQUFDLEdBQUcsRUFBRSxDQUFDO1FBQ2pCLElBQUksQ0FBQyxZQUFZLEdBQUcsRUFBRSxDQUFDO1FBQ3ZCLElBQUksQ0FBQyxxQkFBcUIsR0FBRyxFQUFFLENBQUM7UUFDaEMsSUFBSSxDQUFDLFlBQVksR0FBRyxFQUFFLENBQUM7UUFDdkIsSUFBSSxDQUFDLGVBQWUsQ0FBQyxHQUFHLDZEQUFjLENBQUM7UUFDdkMsSUFBSSxDQUFDLFdBQVcsR0FBRyxFQUFFLENBQUM7SUFDeEIsQ0FBQztJQUVNLE1BQU0sQ0FBQyxNQUFNO1FBQ2xCLE9BQU8sTUFBTSxDQUFDLElBQUksQ0FBQyxJQUFJLGNBQWMsQ0FBQyxDQUFDO0lBQ3pDLENBQUM7SUFFRCxJQUFXLE9BQU87UUFDaEIsT0FBTyxJQUFJLENBQUMsT0FBTyxDQUFDLENBQUM7SUFDdkIsQ0FBQztJQUVELElBQVcsS0FBSztRQUNkLE9BQU8sSUFBSSxDQUFDLEtBQUssQ0FBQyxDQUFDO0lBQ3JCLENBQUM7SUFFTSxtQkFBbUIsQ0FBQyxJQUFZLEVBQUUsV0FBd0I7UUFDL0QsSUFBSSxJQUFJLENBQUMscUJBQXFCLENBQUMsSUFBSSxDQUFDO1lBQ2xDLE1BQU0sSUFBSSxLQUFLLENBQUMsOEJBQThCLElBQUksRUFBRSxDQUFDLENBQUM7UUFDeEQsSUFBSSxDQUFDLHFCQUFxQixDQUFDLElBQUksQ0FBQyxHQUFHLFdBQVcsQ0FBQztJQUNqRCxDQUFDO0lBRU0sbUJBQW1CLENBQUMsSUFBMkI7UUFDcEQsTUFBTSxZQUFZLEdBQUcsSUFBSSxDQUFDLFlBQVksQ0FBQyxJQUFJLENBQUMsUUFBUSxFQUFFLENBQUMsQ0FBQztRQUN4RCxJQUFJLFlBQVksS0FBSyxTQUFTO1lBQzVCLE9BQU8sSUFBSSxDQUFDO1FBQ2QsSUFBSSxZQUFZLEtBQUssSUFBSTtZQUN2QixPQUFPLFNBQVMsQ0FBQztRQUNuQixPQUFPLFlBQVksQ0FBQztJQUN0QixDQUFDO0lBRU0sb0JBQW9CLENBQUMsV0FBd0IsRUFBRSxHQUFRLEVBQUUsSUFBUztRQUN2RSxNQUFNLE9BQU8sR0FBRyw0REFBWSxDQUFDLE1BQU0sQ0FBQyxnREFBVyxDQUFDLEdBQUcsQ0FBQyxXQUFXLEVBQUUsWUFBWSxDQUFDLENBQUMsT0FBTyxDQUFDLEdBQUcsQ0FBQyxDQUFDLENBQUM7UUFDN0YsTUFBTSxRQUFRLEdBQUcsQ0FBQyxJQUFJLEtBQUssSUFBSSxDQUFDLENBQUMsQ0FBQyxDQUFDLElBQUksQ0FBQyxDQUFDLENBQUMsNERBQVksQ0FBQyxNQUFNLENBQUMsZ0RBQVcsQ0FBQyxHQUFHLENBQUMsV0FBVyxFQUFFLFlBQVksQ0FBQyxDQUFDLE9BQU8sQ0FBQyxJQUFJLENBQUMsQ0FBQyxDQUFDO1FBQ3hILE1BQU0sTUFBTSxHQUFHLE9BQU8sQ0FBQyxRQUFRLEVBQUUsQ0FBQztRQUNsQyxJQUFJLElBQUksQ0FBQyxZQUFZLENBQUMsY0FBYyxDQUFDLE1BQU0sQ0FBQztZQUMxQyxNQUFNLENBQUMsSUFBSSxDQUFDLGFBQWEsTUFBTSxzQkFBc0IsQ0FBQyxDQUFDO1FBQ3pELElBQUksQ0FBQyxZQUFZLENBQUMsTUFBTSxDQUFDLEdBQUcsUUFBUSxDQUFDO0lBQ3ZDLENBQUM7SUFFTSxpQkFBaUIsQ0FBQyxTQUFtQztRQUMxRCxNQUFNLEtBQUssR0FBRyxJQUFJLENBQUMsS0FBSyxDQUFDLENBQUM7UUFDMUIsS0FBSyxNQUFNLENBQUMsR0FBRyxFQUFFLEtBQUssQ0FBQyxJQUFJLE1BQU0sQ0FBQyxPQUFPLENBQUMsU0FBUyxDQUFDLEVBQUUsQ0FBQztZQUNyRCxLQUFLLENBQUMsR0FBRyxDQUFDLEdBQUcsS0FBSyxDQUFDO1FBQ3JCLENBQUM7SUFDSCxDQUFDO0lBRU0sa0JBQWtCLENBQUMsUUFBK0I7UUFDdkQsSUFBSSxpRUFBYyxDQUFDLFFBQVEsQ0FBQyxRQUFRLEVBQUUsQ0FBQyxFQUFFLENBQUM7WUFDeEMsTUFBTSxTQUFTLEdBQUcsMERBQVcsQ0FBQyxRQUFRLENBQUMsUUFBUSxFQUFFLENBQUMsQ0FBQztZQUNuRCxJQUFJLENBQUMsaUJBQWlCLENBQUMsU0FBUyxDQUFDLENBQUM7UUFDcEMsQ0FBQztJQUNILENBQUM7SUFFTSxrQkFBa0IsQ0FBQyxLQUFVO1FBQ2xDLEtBQUssTUFBTSxDQUFDLElBQUksRUFBRSxLQUFLLENBQUMsSUFBSSxNQUFNLENBQUMsT0FBTyxDQUFDLElBQUksQ0FBQyxLQUFLLENBQUMsQ0FBQyxFQUFFLENBQUM7WUFDeEQsSUFBSSxDQUFDLE1BQU0sQ0FBQyxNQUFNLENBQUMsS0FBSyxFQUFFLElBQUksQ0FBQyxFQUFFLENBQUM7Z0JBQ2hDLE1BQU0sSUFBSSxHQUFHLEtBQUssQ0FBQyxJQUFJLElBQUksT0FBTyxLQUFLLENBQUMsS0FBSyxDQUFDO2dCQUM5QyxNQUFNLFdBQVcsR0FBRyxLQUFLLENBQUMsV0FBVyxJQUFJLEVBQUUsQ0FBQztnQkFDNUMsSUFBSSxLQUFLLEdBQUcsS0FBSyxDQUFDLE9BQU8sQ0FBQyxLQUFLLENBQUMsS0FBSyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUUsR0FBRyxLQUFLLENBQUMsS0FBSyxDQUFFLENBQUMsQ0FBQyxDQUFDLEtBQUssQ0FBQyxLQUFLLENBQUM7Z0JBQzFFLE1BQU0sVUFBVSxHQUFHLE1BQU0sQ0FBQyxJQUFJLENBQUMsQ0FBQztnQkFDaEMsS0FBSyxDQUFDLFVBQVUsQ0FBQyxHQUFHLGlCQUFpQixDQUFDLElBQUksRUFBRSxLQUFLLENBQUMsQ0FBQztnQkFFbkQsTUFBTSxDQUFDLGNBQWMsQ0FBQyxLQUFLLEVBQUUsSUFBSSxFQUFFO29CQUNqQyxVQUFVLEVBQUUsSUFBSTtvQkFDaEIsR0FBRzt3QkFDRCxPQUFPLElBQUksQ0FBQyxVQUFVLENBQUMsQ0FBQztvQkFDMUIsQ0FBQztvQkFDRCxHQUFHLENBQUMsS0FBSzt3QkFDUCxJQUFJLENBQUMsVUFBVSxDQUFDLEdBQUcsaUJBQWlCLENBQUMsSUFBSSxFQUFFLEtBQUssQ0FBQyxDQUFDO29CQUNwRCxDQUFDO2lCQUNGLENBQUMsQ0FBQztZQUNMLENBQUM7UUFDSCxDQUFDO0lBQ0gsQ0FBQztJQUVNLGlCQUFpQixDQUFDLFdBQXdCLEVBQUUsTUFBVyxFQUFFLE1BQVc7UUFDekUsTUFBTSxjQUFjLEdBQUcsZ0RBQVcsQ0FBQyxnQkFBZ0IsQ0FBQyxXQUFXLENBQUMsQ0FBQztRQUNqRSxNQUFNLElBQUksZ0RBQVcsQ0FBQyx5QkFBeUIsQ0FBQyxjQUFjLEVBQUUsRUFBRSxFQUFFLE1BQU0sQ0FBQyxDQUFDO1FBQzVFLE1BQU0sVUFBVSxHQUFHLGdEQUFXLENBQUMsR0FBRyxDQUFDLGNBQWMsRUFBRSxZQUFZLENBQUMsQ0FBQyxPQUFPLENBQUMsTUFBTSxDQUFDLENBQUM7UUFDakYsTUFBTSxJQUFJLEdBQUcsMERBQVcsQ0FBQyxVQUFVLENBQUMsUUFBUSxFQUFFLENBQUMsQ0FBQztRQUNoRCxNQUFNLEVBQUUsR0FBRywrREFBYSxDQUFDLE1BQU0sQ0FBQyxjQUFjLENBQUMsQ0FBQztRQUNoRCxJQUFJLENBQUMsRUFBRSxDQUFDLENBQUM7SUFDWCxDQUFDO0lBRU0sbUJBQW1CLENBQUMsUUFBZ0I7UUFDekMsTUFBTSxJQUFJLEdBQUcsSUFBSSxDQUFDLFNBQVMsQ0FBQyxJQUFJLENBQUMsS0FBSyxDQUFDLEVBQUUsSUFBSSxFQUFFLENBQUMsQ0FBQyxDQUFDO1FBQ2xELDREQUFnQixDQUFDLFFBQVEsRUFBRSxJQUFJLEVBQUUsT0FBTyxDQUFDLENBQUM7SUFDNUMsQ0FBQztJQUVNLEtBQUssQ0FBQyxpQkFBaUIsQ0FBQyxXQUF3QjtRQUNyRCxNQUFNLGVBQWUsR0FBRyxnREFBVyxDQUFDLEdBQUcsQ0FBQyxXQUFXLEVBQUUsWUFBWSxDQUFDLENBQUMsUUFBUSxFQUFFLENBQUM7UUFDOUUsTUFBTSxnQkFBZ0IsR0FBRyxJQUFJLENBQUMsbUJBQW1CLENBQUMsZUFBZSxDQUFDLENBQUM7UUFDbkUsSUFBSSxDQUFDLGdCQUFnQixFQUFFLENBQUM7WUFDdEIsTUFBTSxDQUFDLElBQUksQ0FBQyxlQUFlLGVBQWUsZ0JBQWdCLENBQUMsQ0FBQztZQUM1RCxPQUFPLEtBQUssQ0FBQztRQUNmLENBQUM7UUFDRCxnREFBVyxDQUFDLEdBQUcsQ0FBQyxXQUFXLEVBQUUsWUFBWSxFQUFFLGdCQUFnQixDQUFDLENBQUM7UUFFN0QsSUFBSSxDQUFDLGdEQUFXLENBQUMsR0FBRyxDQUFDLFdBQVcsRUFBRSxhQUFhLENBQUMsRUFBRSxDQUFDO1lBQ2pELElBQUksVUFBb0MsQ0FBQztZQUN6QyxNQUFNLFFBQVEsR0FBRyxDQUFFLEtBQUssRUFBRSxNQUFNLENBQUUsQ0FBQyxHQUFHLENBQUMsQ0FBQyxDQUFDLEVBQUUsQ0FBQyxZQUFZLEdBQUcsQ0FBQyxDQUFDLENBQUM7WUFDOUQsS0FBSyxNQUFNLFFBQVEsSUFBSSxRQUFRLEVBQUUsQ0FBQztnQkFDaEMsTUFBTSxJQUFJLEdBQUcsZ0RBQVcsQ0FBQyxHQUFHLENBQUMsV0FBVyxFQUFFLFlBQVksQ0FBQyxDQUFDLElBQUksQ0FBQyxRQUFRLENBQUMsQ0FBQztnQkFDdkUsSUFBSSxNQUFNLDZEQUFVLENBQUMsSUFBSSxDQUFDLFFBQVEsRUFBRSxDQUFDLEVBQUUsQ0FBQztvQkFDdEMsVUFBVSxHQUFHLElBQUksQ0FBQztvQkFDbEIsTUFBTTtnQkFDUixDQUFDO1lBQ0gsQ0FBQztZQUVELElBQUksQ0FBQyxVQUFVO2dCQUNiLE1BQU0sSUFBSSxLQUFLLENBQUMsc0JBQXNCLFFBQVEsQ0FBQyxJQUFJLENBQUMsSUFBSSxDQUFDLFFBQVEsZ0RBQVcsQ0FBQyxHQUFHLENBQUMsV0FBVyxFQUFFLFlBQVksQ0FBQyxHQUFHLENBQUMsQ0FBQztZQUVsSCxnREFBVyxDQUFDLEdBQUcsQ0FBQyxXQUFXLEVBQUUsYUFBYSxFQUFFLFVBQVUsQ0FBQyxDQUFDO1lBQ3hELGdEQUFXLENBQUMsR0FBRyxDQUFDLFdBQVcsRUFBRSxZQUFZLEVBQUUsZ0RBQVcsQ0FBQyxHQUFHLENBQUMsV0FBVyxFQUFFLGFBQWEsQ0FBQyxDQUFDLE9BQU8sRUFBRSxDQUFDLENBQUM7UUFDcEcsQ0FBQztRQUVELElBQUksQ0FBQyxtQkFBbUIsQ0FBQyxnREFBVyxDQUFDLEdBQUcsQ0FBQyxXQUFXLEVBQUUsYUFBYSxDQUFDLENBQUMsUUFBUSxFQUFFLEVBQUUsV0FBVyxDQUFDLENBQUM7UUFDOUYsT0FBTyxJQUFJLENBQUM7SUFDZCxDQUFDO0lBRU0sZUFBZSxDQUFDLFdBQXdCLEVBQUUsU0FBYyxFQUFFLFNBQWU7UUFDOUUsTUFBTSxjQUFjLEdBQUcsaUZBQTZCLENBQUMsV0FBVyxFQUFFLFNBQVMsRUFBRSxTQUFTLENBQUMsQ0FBQztRQUN4RixJQUFJLGNBQWMsRUFBRSxDQUFDO1lBQ25CLElBQUksQ0FBQyxXQUFXLENBQUMsSUFBSSxDQUFDLGNBQWMsQ0FBQyxDQUFDO1FBQ3hDLENBQUM7SUFDSCxDQUFDO0lBRU0sa0JBQWtCLENBQUMsSUFBWTtRQUNwQyxPQUFPLElBQUksQ0FBQyxlQUFlLENBQUMsQ0FBQyxJQUFJLENBQUMsQ0FBQztJQUNyQyxDQUFDO0lBRU0sZ0JBQWdCLENBQUMsT0FBcUI7UUFDM0MsS0FBSyxNQUFNLElBQUksSUFBSSxPQUFPO1lBQ3hCLElBQUksQ0FBQyxPQUFPLENBQUMsQ0FBQyxHQUFHLENBQUMsSUFBSSxDQUFDLFVBQVUsRUFBRSxJQUFJLENBQUMsQ0FBQztJQUM3QyxDQUFDO0lBRU0sZ0JBQWdCLENBQUMsT0FBdUI7UUFDN0MsS0FBSyxNQUFNLElBQUksSUFBSSxPQUFPO1lBQ3RCLElBQUksQ0FBQyxjQUFjLENBQUMsR0FBRyxDQUFDLElBQUksQ0FBQyxJQUFJLEVBQUUsSUFBSSxDQUFDLENBQUM7SUFDL0MsQ0FBQztJQUVNLG9CQUFvQixDQUFDLE9BQXdCO1FBQ2xELEtBQUssTUFBTSxJQUFJLElBQUksT0FBTztZQUN0QixJQUFJLENBQUMsWUFBWSxDQUFDLElBQUksQ0FBQyxJQUFJLENBQUMsQ0FBQztJQUNuQyxDQUFDO0lBRU0sZUFBZSxDQUFDLE9BQXFCO1FBQzFDLEtBQUssTUFBTSxVQUFVLElBQUksT0FBTyxFQUFFLENBQUM7WUFDakMsTUFBTSxNQUFNLEdBQUcsSUFBSSxDQUFDLE9BQU8sQ0FBQyxDQUFDLEdBQUcsQ0FBQyxVQUFVLENBQUMsSUFBSSxDQUFDLENBQUM7WUFDbEQsSUFBSSxDQUFDLE1BQU07Z0JBQ1QsTUFBTSxJQUFJLEtBQUssQ0FBQyw0QkFBNEIsSUFBSSxFQUFFLENBQUMsQ0FBQztZQUN0RCxNQUFNLENBQUMsVUFBVSxDQUFDLFVBQVUsQ0FBQyxDQUFDO1FBQ2hDLENBQUM7SUFDSCxDQUFDO0lBRU0sZUFBZSxDQUFDLE9BQTJCO1FBQ2hELEtBQUssTUFBTSxVQUFVLElBQUksT0FBTyxFQUFFLENBQUM7WUFDakMsTUFBTSxNQUFNLEdBQUcsSUFBSSxDQUFDLGNBQWMsQ0FBQyxHQUFHLENBQUMsVUFBVSxDQUFDLElBQUksQ0FBQyxDQUFDO1lBQ3hELElBQUksQ0FBQyxNQUFNO2dCQUNULE1BQU0sSUFBSSxLQUFLLENBQUMsa0NBQWtDLElBQUksRUFBRSxDQUFDLENBQUM7WUFDNUQsTUFBTSxDQUFDLFVBQVUsQ0FBQyxVQUFVLENBQUMsQ0FBQztRQUNoQyxDQUFDO0lBQ0gsQ0FBQztJQUVNLEtBQUssQ0FBQyxjQUFjO1FBQ3pCLE1BQU0sV0FBVyxHQUFHLElBQUksS0FBSyxFQUFvQixDQUFDO1FBRWxELFNBQVMsQ0FBQztZQUNSLE1BQU0sV0FBVyxHQUFHLElBQUksQ0FBQyxXQUFXLENBQUMsS0FBSyxFQUFFLENBQUM7WUFDN0MsSUFBSSxDQUFDLFdBQVc7Z0JBQ2QsTUFBTTtZQUVSLElBQUksQ0FBQyxNQUFNLElBQUksQ0FBQyxpQkFBaUIsQ0FBQyxXQUFXLENBQUM7Z0JBQzVDLFNBQVM7WUFFWCxNQUFNLEdBQUcsR0FBRyxJQUFJLG9FQUFnQixDQUFDLFdBQVcsRUFBRSxJQUFJLENBQUMsQ0FBQztZQUNwRCxXQUFXLENBQUMsSUFBSSxDQUFDLEdBQUcsQ0FBQyxDQUFDO1lBQ3RCLE1BQU0sRUFBRSxHQUFHLGtFQUFlLENBQUMsTUFBTSxDQUFDLEdBQUcsRUFBRSxXQUFXLENBQUMsQ0FBQztZQUVwRCxNQUFNLE9BQU8sR0FBRyxPQUFPLENBQUMsR0FBRyxFQUFFLENBQUM7WUFDOUIsT0FBTyxDQUFDLEtBQUssQ0FBQyxFQUFFLENBQUMsVUFBVSxDQUFDLFFBQVEsRUFBRSxDQUFDLENBQUM7WUFDeEMsTUFBTSxrRUFBYyxDQUFDLEVBQUUsQ0FBQyxDQUFDO1lBQ3pCLE9BQU8sQ0FBQyxLQUFLLENBQUMsT0FBTyxDQUFDLENBQUM7UUFDekIsQ0FBQztRQUVELEtBQUssTUFBTSxHQUFHLElBQUksV0FBVyxFQUFFLENBQUM7WUFDOUIsSUFBSSxDQUFDLGdCQUFnQixDQUFDLEtBQUssQ0FBQyxJQUFJLENBQUMsR0FBRyxDQUFDLE9BQU8sQ0FBQyxNQUFNLEVBQUUsQ0FBQyxDQUFDLENBQUM7WUFDeEQsSUFBSSxDQUFDLGdCQUFnQixDQUFDLEtBQUssQ0FBQyxJQUFJLENBQUMsR0FBRyxDQUFDLFdBQVcsQ0FBQyxNQUFNLEVBQUUsQ0FBQyxDQUFDLENBQUM7WUFDNUQsSUFBSSxDQUFDLG9CQUFvQixDQUFDLEdBQUcsQ0FBQyxXQUFXLENBQUMsQ0FBQztRQUM3QyxDQUFDO1FBRUQsS0FBSyxNQUFNLEdBQUcsSUFBSSxXQUFXLEVBQUUsQ0FBQztZQUM5QixJQUFJLENBQUMsZUFBZSxDQUFDLEtBQUssQ0FBQyxJQUFJLENBQUMsR0FBRyxDQUFDLFdBQVcsQ0FBQyxNQUFNLEVBQUUsQ0FBQyxDQUFDLENBQUM7WUFDM0QsSUFBSSxDQUFDLGVBQWUsQ0FBQyxLQUFLLENBQUMsSUFBSSxDQUFDLEdBQUcsQ0FBQyxXQUFXLENBQUMsTUFBTSxFQUFFLENBQUMsQ0FBQyxDQUFDO1FBQzdELENBQUM7SUFDSCxDQUFDO0lBRU0sV0FBVyxDQUFDLEtBQWtCO1FBQ25DLE1BQU0sUUFBUSxHQUFHLElBQUksZ0VBQWMsQ0FBQztRQUNwQyxLQUFLLE1BQU0sQ0FBQyxJQUFJLEVBQUUsTUFBTSxDQUFDLElBQUksSUFBSSxDQUFDLGNBQWMsQ0FBQyxPQUFPLEVBQUUsRUFBRSxDQUFDO1lBQzNELE1BQU0sT0FBTyxHQUFHLEVBQUUsQ0FBQztZQUVuQixJQUFJLFNBQWtDLENBQUM7WUFDdkMsSUFBSSxPQUFPLE1BQU0sQ0FBQyxZQUFZLEtBQUssUUFBUSxFQUFFLENBQUM7Z0JBQzVDLE1BQU0sSUFBSSxHQUFHLElBQUksQ0FBQyxrQkFBa0IsQ0FBQyxNQUFNLENBQUMsWUFBWSxDQUFDLENBQUM7Z0JBQzFELFNBQVMsR0FBRyxJQUFJLENBQUMsQ0FBQyxDQUFDLElBQUksQ0FBQyxDQUFDLENBQUMsTUFBTSxDQUFDLFNBQVMsQ0FBQyxPQUFPLENBQUMsTUFBTSxDQUFDLFlBQVksQ0FBQyxDQUFDO1lBQzFFLENBQUM7aUJBQ0ksQ0FBQztnQkFDSixPQUFPLENBQUMsSUFBSSxDQUFDLE1BQU0sQ0FBQyxZQUFZLENBQUMsTUFBTSxFQUFFLENBQUMsQ0FBQztnQkFDM0MsU0FBUyxHQUFHLE1BQU0sQ0FBQyxZQUFZLENBQUM7WUFDbEMsQ0FBQztZQUVELElBQUksTUFBTSxDQUFDLEtBQUssRUFBRSxDQUFDO2dCQUNqQixPQUFPLENBQUMsSUFBSSxDQUFDLE1BQU0sQ0FBQyxLQUFLLENBQUMsTUFBTSxFQUFFLENBQUMsQ0FBQztZQUN0QyxDQUFDO1lBRUQsTUFBTSxHQUFHLEdBQUcsVUFBVSxHQUFHLGFBQWEsR0FBRyxNQUFNLENBQUMsU0FBUyxDQUFDLFFBQVEsQ0FBQyxNQUFNLENBQUMsTUFBTSxDQUFDLEdBQUcsU0FBUyxDQUFDO1lBQzlGLE1BQU0sRUFBRSxHQUFHLElBQUksNERBQVUsQ0FBQyxJQUFJLENBQUMsQ0FBQztZQUNoQyxFQUFFLENBQUMsT0FBTyxHQUFHLEdBQUcsQ0FBQztZQUNqQixFQUFFLENBQUMsTUFBTSxHQUFHLE1BQU0sQ0FBQyxNQUFNLENBQUM7WUFDMUIsRUFBRSxDQUFDLGFBQWEsQ0FBQyxHQUFHLE9BQU8sQ0FBQyxDQUFDO1lBQzdCLEVBQUUsQ0FBQyxPQUFPLENBQUMsSUFBSSxpRUFBYyxDQUFDLE1BQU0sQ0FBQyxXQUFXLEVBQUUsU0FBUyxDQUFDLENBQUMsQ0FBQztZQUM5RCxRQUFRLENBQUMsU0FBUyxDQUFDLEVBQUUsQ0FBQyxDQUFDO1FBQ3pCLENBQUM7UUFFRCxNQUFNLFdBQVcsR0FBRyxJQUFJLEdBQUcsRUFBNEIsQ0FBQztRQUN4RCxLQUFLLE1BQU0sTUFBTSxJQUFJLElBQUksQ0FBQyxPQUFPLENBQUMsQ0FBQyxPQUFPLENBQUMsTUFBTSxFQUFFLEVBQUUsQ0FBQztZQUNwRCxLQUFLLE1BQU0sRUFBRSxJQUFJLE1BQU0sQ0FBQyxjQUFjLEVBQUUsRUFBRSxDQUFDO2dCQUN6QyxJQUFJLENBQUMsRUFBRSxDQUFDLFFBQVE7b0JBQ2QsU0FBUztnQkFDWCxNQUFNLE1BQU0sR0FBRyxNQUFNLENBQUMsU0FBUyxDQUFDLFFBQVEsQ0FBQyxFQUFFLENBQUMsSUFBSSxDQUFDLENBQUM7Z0JBQ2xELE1BQU0sTUFBTSxHQUFJLE1BQU0sQ0FBQyxTQUFTLENBQUMsUUFBUSxDQUFDLEVBQUUsQ0FBQyxJQUFJLENBQUMsQ0FBQztnQkFDbkQsTUFBTSxLQUFLLEdBQUcsQ0FBQyxNQUFNLENBQUMsTUFBTSxHQUFHLE1BQU0sQ0FBQyxNQUFNLENBQUMsQ0FBQyxDQUFDLE1BQU0sQ0FBQyxDQUFDLENBQUMsTUFBTSxDQUFDLENBQUMsT0FBTyxDQUFDLEtBQUssRUFBRSxLQUFLLENBQUMsQ0FBQztnQkFDdEYsTUFBTSxLQUFLLEdBQUksTUFBTSxDQUFDLFNBQVMsQ0FBQyxJQUFJLENBQUMsV0FBVyxFQUFFLE1BQU0sQ0FBQyxVQUFVLEdBQUcsTUFBTSxFQUFHLEtBQUssR0FBRyxNQUFNLENBQUMsQ0FBQztnQkFDL0YsV0FBVyxDQUFDLEdBQUcsQ0FBQyxFQUFFLEVBQUUsS0FBSyxDQUFDLENBQUM7WUFDN0IsQ0FBQztRQUNILENBQUM7UUFFRCxLQUFLLE1BQU0sQ0FBQyxJQUFJLEVBQUUsTUFBTSxDQUFDLElBQUksSUFBSSxDQUFDLE9BQU8sQ0FBQyxDQUFDLE9BQU8sRUFBRSxDQUFDO1lBQ25ELE1BQU0sT0FBTyxHQUFHLEVBQUUsQ0FBQztZQUNuQixLQUFLLE1BQU0sQ0FBQyxJQUFJLE1BQU0sQ0FBQyxnQkFBZ0IsRUFBRSxFQUFFLENBQUM7Z0JBQzFDLE1BQU0sQ0FBQyxHQUFHLElBQUksQ0FBQyxPQUFPLENBQUMsQ0FBQyxHQUFHLENBQUMsQ0FBQyxDQUFDLFVBQVUsQ0FBQyxDQUFDO2dCQUMxQyxLQUFLLE1BQU0sQ0FBQyxJQUFJLENBQUMsQ0FBQyxjQUFjLEVBQUUsRUFBRSxDQUFDO29CQUNuQyxNQUFNLENBQUMsR0FBRyxXQUFXLENBQUMsR0FBRyxDQUFDLENBQUMsQ0FBQyxDQUFDO29CQUM3QixDQUFDLElBQUksT0FBTyxDQUFDLElBQUksQ0FBQyxDQUFDLENBQUMsUUFBUSxFQUFFLENBQUMsQ0FBQztnQkFDbEMsQ0FBQztZQUNILENBQUM7WUFFRCxNQUFNLE9BQU8sR0FBRyxJQUFJLENBQUMsT0FBTyxDQUFDLENBQUMsWUFBWSxDQUFDLE1BQU0sQ0FBQyxDQUFDO1lBQ25ELEtBQUssTUFBTSxDQUFDLElBQUksTUFBTSxDQUFDLGNBQWMsRUFBRSxFQUFFLENBQUM7Z0JBQ3hDLElBQUksQ0FBQyxDQUFDLGdCQUFnQjtvQkFDcEIsU0FBUztnQkFFWCxNQUFNLENBQUMsR0FBRyxXQUFXLENBQUMsR0FBRyxDQUFDLENBQUMsQ0FBQyxDQUFDO2dCQUM3QixJQUFJLENBQUMsQ0FBQztvQkFDSixNQUFNLElBQUksS0FBSyxDQUFDLHFCQUFxQixDQUFDLENBQUM7Z0JBRXpDLHdEQUFZLENBQUMsQ0FBQyxDQUFDLE9BQU8sRUFBRSxDQUFDLFFBQVEsRUFBRSxFQUFFLEVBQUUsU0FBUyxFQUFFLElBQUksRUFBRSxDQUFDLENBQUM7Z0JBRTFELE1BQU0sY0FBYyxHQUFHLE1BQU0sQ0FBQyxTQUFTLENBQUMsUUFBUSxDQUFDLENBQUMsQ0FBQyxDQUFDO2dCQUNwRCxNQUFNLGlCQUFpQixHQUFHLEtBQUssQ0FBQyxrQkFBa0IsQ0FBQyxRQUFRLENBQUMsTUFBTSxDQUFDLFNBQVMsQ0FBQyxDQUFDO2dCQUM5RSxNQUFNLEdBQUcsR0FBRyxVQUFVLEdBQUcsWUFBWSxDQUFDLENBQUMsUUFBUSxXQUFXLGlCQUFpQixJQUFJLGNBQWMsRUFBRSxHQUFHLFNBQVMsQ0FBQztnQkFFNUcsTUFBTSxXQUFXLEdBQUc7b0JBQ2xCLEdBQUcsSUFBSSxDQUFDLE9BQU8sQ0FBQyxDQUFDLGdCQUFnQixDQUFDLE1BQU0sQ0FBQztvQkFDekMsR0FBRyxDQUFDLENBQUMsT0FBTztpQkFDYixDQUFDO2dCQUVGLE1BQU0sSUFBSSxHQUFhLEVBQUUsQ0FBQztnQkFDMUIsSUFBSSxDQUFDLElBQUksQ0FBQyxHQUFHLFdBQVcsQ0FBQyxHQUFHLENBQUMsQ0FBQyxDQUFDLEVBQUUsQ0FBQyxJQUFJLEdBQUcsQ0FBQyxDQUFDLENBQUMsQ0FBQztnQkFDN0MsSUFBSSxDQUFDLElBQUksQ0FBQyxHQUFHLElBQUksQ0FBQyxPQUFPLENBQUMsQ0FBQyxhQUFhLENBQUMsTUFBTSxDQUFDLENBQUMsR0FBRyxDQUFDLENBQUMsQ0FBQyxFQUFFLENBQUMsSUFBSSxHQUFHLENBQUMsQ0FBQyxDQUFDLENBQUM7Z0JBQ3JFLElBQUksQ0FBQyxJQUFJLENBQUMsR0FBRyxJQUFJLENBQUMsT0FBTyxDQUFDLENBQUMsbUJBQW1CLENBQUMsTUFBTSxDQUFDLENBQUMsQ0FBQztnQkFDeEQsSUFBSSxNQUFNLENBQUMsdUJBQXVCO29CQUNoQyxJQUFJLENBQUMsSUFBSSxDQUFDLE9BQU8sQ0FBQyxDQUFDO2dCQUNyQixJQUFJLENBQUMsSUFBSSxDQUFDLEdBQUcsQ0FBQyxDQUFDLGFBQWEsQ0FBQyxJQUFJLEVBQUUsQ0FBQyxDQUFDO2dCQUNyQyxJQUFJLENBQUMsSUFBSSxDQUFDLElBQUksRUFBRSxjQUFjLENBQUMsQ0FBQztnQkFDaEMsSUFBSSxDQUFDLElBQUksQ0FBQyxJQUFJLEVBQUUsQ0FBQyxDQUFDLElBQUksQ0FBQyxRQUFRLEVBQUUsQ0FBQyxDQUFDO2dCQUVuQyxNQUFNLE1BQU0sR0FBRyw0REFBWSxDQUFDLE1BQU0sQ0FBQyxNQUFNLENBQUMsU0FBUyxDQUFDLElBQUksQ0FBQyxjQUFjLENBQUMsQ0FBQyxDQUFDO2dCQUMxRSxPQUFPLENBQUMsSUFBSSxDQUFDLE1BQU0sQ0FBQyxRQUFRLEVBQUUsQ0FBQyxDQUFDO2dCQUVoQyxNQUFNLEVBQUUsR0FBRyxJQUFJLDREQUFVLENBQUM7Z0JBQzFCLEVBQUUsQ0FBQyxPQUFPLEdBQUcsR0FBRyxDQUFDO2dCQUNqQixFQUFFLENBQUMsTUFBTSxHQUFHLE1BQU0sQ0FBQztnQkFDbkIsRUFBRSxDQUFDLGFBQWEsQ0FBQyxHQUFHLE9BQU8sQ0FBQyxDQUFDO2dCQUM3QixFQUFFLENBQUMsYUFBYSxDQUFDLENBQUMsQ0FBQyxJQUFJLENBQUMsTUFBTSxFQUFFLENBQUMsQ0FBQztnQkFDbEMsRUFBRSxDQUFDLE9BQU8sQ0FBQyxJQUFJLCtEQUFhLENBQUMsQ0FBQyxDQUFDLFlBQVksQ0FBQyxRQUFRLEVBQUUsRUFBRSxJQUFJLEVBQUUsTUFBTSxDQUFDLFNBQVMsQ0FBQyxNQUFNLEVBQUUsQ0FBQyxDQUFDLENBQUM7Z0JBQzFGLFFBQVEsQ0FBQyxTQUFTLENBQUMsRUFBRSxDQUFDLENBQUM7WUFDekIsQ0FBQztZQUVELE1BQU0sV0FBVyxHQUFHLElBQUksNERBQVUsQ0FBQztZQUNuQyxLQUFLLE1BQU0sTUFBTSxJQUFJLE1BQU0sQ0FBQyxZQUFZLEVBQUUsQ0FBQztnQkFDekMsTUFBTSxVQUFVLEdBQUcsb0JBQW9CLENBQUMsSUFBSSxFQUFFLE1BQU0sQ0FBQyxDQUFDO2dCQUN0RCxXQUFXLENBQUMsT0FBTyxDQUFDLElBQUksK0RBQWEsQ0FBQyxVQUFVLENBQUMsT0FBTyxFQUFFLFVBQVUsQ0FBQyxJQUFJLEVBQUUsTUFBTSxDQUFDLFNBQVMsQ0FBQyxRQUFRLEVBQUUsQ0FBQyxDQUFDLENBQUM7WUFDM0csQ0FBQztZQUVELE1BQU0sV0FBVyxHQUFHLElBQUksQ0FBQyxPQUFPLENBQUMsQ0FBQyxnQkFBZ0IsQ0FBQyxNQUFNLENBQUMsQ0FBQztZQUMzRCxJQUFJLE1BQU0sQ0FBQyxlQUFlLEVBQUUsQ0FBQztnQkFDM0IsTUFBTSxJQUFJLEdBQUcsT0FBTyxDQUFDLE1BQU0sQ0FBQyxDQUFDLENBQUMsRUFBRSxDQUFDLENBQUMsQ0FBQyxRQUFRLENBQUMsSUFBSSxDQUFDLElBQUksQ0FBQyxDQUFDLFFBQVEsQ0FBQyxNQUFNLENBQUMsQ0FBQyxDQUFDLEdBQUcsQ0FBQyxDQUFDLENBQUMsRUFBRSxDQUFDLE1BQU0sQ0FBQyxVQUFVLEVBQUUsQ0FBQyxRQUFRLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQztnQkFDbkgsSUFBSSxJQUFJLENBQUMsTUFBTSxFQUFFLENBQUM7b0JBQ2hCLE1BQU0sSUFBSSxHQUFHO3dCQUNYLEdBQUcsV0FBVzt3QkFDZCxJQUFJO3dCQUNKLElBQUksRUFBRSxNQUFNLENBQUMsV0FBVyxFQUFFO3dCQUMxQixHQUFHLElBQUk7cUJBQ1IsQ0FBQztvQkFDRixXQUFXLENBQUMsT0FBTyxHQUFHLFdBQVcsTUFBTSxDQUFDLFFBQVEsbUJBQW1CLE1BQU0sQ0FBQyxXQUFXLEVBQUUsRUFBRSxDQUFDO29CQUMxRixXQUFXLENBQUMsTUFBTSxHQUFHLE1BQU0sQ0FBQyxPQUFPLEVBQUUsQ0FBQztvQkFDdEMsV0FBVyxDQUFDLGFBQWEsQ0FBQyxHQUFHLE9BQU8sQ0FBQyxDQUFDO29CQUN0QyxXQUFXLENBQUMsT0FBTyxDQUFDLElBQUksK0RBQWEsQ0FBQyxLQUFLLENBQUMsTUFBTSxFQUFFLElBQUksRUFBRSxNQUFNLENBQUMsVUFBVSxFQUFFLENBQUMsUUFBUSxFQUFFLENBQUMsQ0FBQyxDQUFDO2dCQUM3RixDQUFDO3FCQUNJLENBQUM7b0JBQ0osTUFBTSxDQUFDLElBQUksQ0FBQyxtQkFBbUIsTUFBTSxDQUFDLFVBQVUsR0FBRyxDQUFDLENBQUM7Z0JBQ3ZELENBQUM7WUFDSCxDQUFDO1lBRUQsSUFBSSxNQUFNLENBQUMsZUFBZSxFQUFFLENBQUM7Z0JBQzNCLE1BQU0sSUFBSSxHQUFHLE9BQU8sQ0FBQyxNQUFNLENBQUMsQ0FBQyxDQUFDLEVBQUUsQ0FBQyxDQUFDLENBQUMsUUFBUSxDQUFDLElBQUksQ0FBQyxJQUFJLENBQUMsQ0FBQyxRQUFRLENBQUMsTUFBTSxDQUFDLENBQUMsQ0FBQyxHQUFHLENBQUMsQ0FBQyxDQUFDLEVBQUUsQ0FBQyxNQUFNLENBQUMsVUFBVSxFQUFFLENBQUMsUUFBUSxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUM7Z0JBQ25ILElBQUksSUFBSSxDQUFDLE1BQU0sRUFBRSxDQUFDO29CQUNoQixNQUFNLElBQUksR0FBRyxDQUFFLElBQUksRUFBRSxNQUFNLENBQUMsV0FBVyxFQUFFLEVBQUcsR0FBRyxJQUFJLENBQUUsQ0FBQztvQkFDdEQsV0FBVyxDQUFDLE9BQU8sR0FBRyxXQUFXLE1BQU0sQ0FBQyxRQUFRLG1CQUFtQixNQUFNLENBQUMsV0FBVyxFQUFFLEVBQUUsQ0FBQztvQkFDMUYsV0FBVyxDQUFDLE1BQU0sR0FBRyxNQUFNLENBQUMsT0FBTyxFQUFFLENBQUM7b0JBQ3RDLFdBQVcsQ0FBQyxhQUFhLENBQUMsR0FBRyxPQUFPLENBQUMsQ0FBQztvQkFDdEMsV0FBVyxDQUFDLE9BQU8sQ0FBQyxJQUFJLCtEQUFhLENBQUMsS0FBSyxDQUFDLEVBQUUsRUFBRSxJQUFJLEVBQUUsTUFBTSxDQUFDLFVBQVUsRUFBRSxDQUFDLFFBQVEsRUFBRSxDQUFDLENBQUMsQ0FBQztnQkFDekYsQ0FBQztxQkFDSSxDQUFDO29CQUNKLE1BQU0sQ0FBQyxJQUFJLENBQUMsbUJBQW1CLE1BQU0sQ0FBQyxVQUFVLEdBQUcsQ0FBQyxDQUFDO2dCQUN2RCxDQUFDO1lBQ0gsQ0FBQztZQUVELElBQUksTUFBTSxDQUFDLGVBQWUsRUFBRSxDQUFDO2dCQUMzQixNQUFNLElBQUksS0FBSyxDQUFDLGlCQUFpQixDQUFDLENBQUM7WUFDckMsQ0FBQztZQUVELElBQUksTUFBTSxDQUFDLFlBQVksRUFBRSxDQUFDO2dCQUN4QixNQUFNLElBQUksR0FBRyxPQUFPLENBQUMsTUFBTSxDQUFDLENBQUMsQ0FBQyxFQUFFLENBQUMsQ0FBQyxDQUFDLFFBQVEsQ0FBQyxJQUFJLENBQUMsSUFBSSxDQUFDLENBQUMsUUFBUSxDQUFDLE1BQU0sQ0FBQyxDQUFDLENBQUMsR0FBRyxDQUFDLENBQUMsQ0FBQyxFQUFFLENBQUMsTUFBTSxDQUFDLFVBQVUsRUFBRSxDQUFDLFFBQVEsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDO2dCQUNuSCxJQUFJLElBQUksQ0FBQyxNQUFNLEVBQUUsQ0FBQztvQkFDaEIsTUFBTSxJQUFJLEdBQUcsSUFBSSxDQUFDLE9BQU8sQ0FBQyxDQUFDLGNBQWMsQ0FBQyxNQUFNLENBQUMsQ0FBQztvQkFDbEQsTUFBTSxJQUFJLEdBQUc7d0JBQ1gsR0FBRyxNQUFNLENBQUMsYUFBYTt3QkFDdkIsR0FBRyxXQUFXO3dCQUNkLEdBQUcsSUFBSTt3QkFDUCxJQUFJLEVBQUUsTUFBTSxDQUFDLFdBQVcsRUFBRTt3QkFDMUIsR0FBRyxJQUFJLENBQUMsR0FBRyxDQUFDLENBQUMsQ0FBQyxFQUFFLENBQUMsTUFBTSxDQUFDLFVBQVUsRUFBRSxDQUFDLFFBQVEsQ0FBQyxDQUFDLENBQUMsQ0FBQztxQkFDbEQsQ0FBQztvQkFFRixXQUFXLENBQUMsT0FBTyxHQUFHLFdBQVcsTUFBTSxDQUFDLFFBQVEsZUFBZSxNQUFNLENBQUMsV0FBVyxFQUFFLEVBQUUsQ0FBQztvQkFDdEYsV0FBVyxDQUFDLE1BQU0sR0FBRyxNQUFNLENBQUMsT0FBTyxFQUFFLENBQUM7b0JBQ3RDLFdBQVcsQ0FBQyxhQUFhLENBQUMsR0FBRyxPQUFPLENBQUMsQ0FBQztvQkFDdEMsV0FBVyxDQUFDLGFBQWEsQ0FBQyxHQUFHLElBQUksQ0FBQyxDQUFDO29CQUNuQyxXQUFXLENBQUMsT0FBTyxDQUFDLElBQUksK0RBQWEsQ0FBQyxNQUFNLENBQUMsWUFBWSxFQUFFLElBQUksRUFBRSxNQUFNLENBQUMsVUFBVSxFQUFFLENBQUMsUUFBUSxFQUFFLENBQUMsQ0FBQyxDQUFDO2dCQUNwRyxDQUFDO3FCQUNJLENBQUM7b0JBQ0osTUFBTSxDQUFDLElBQUksQ0FBQyxtQkFBbUIsTUFBTSxDQUFDLFVBQVUsR0FBRyxDQUFDLENBQUM7Z0JBQ3ZELENBQUM7WUFDSCxDQUFDO1lBRUQsS0FBSyxNQUFNLE1BQU0sSUFBSSxNQUFNLENBQUMsYUFBYSxFQUFFLENBQUM7Z0JBQzFDLE1BQU0sVUFBVSxHQUFHLG9CQUFvQixDQUFDLElBQUksRUFBRSxNQUFNLENBQUMsQ0FBQztnQkFDdEQsV0FBVyxDQUFDLE9BQU8sQ0FBQyxJQUFJLCtEQUFhLENBQUMsVUFBVSxDQUFDLE9BQU8sRUFBRSxVQUFVLENBQUMsSUFBSSxFQUFFLE1BQU0sQ0FBQyxTQUFTLENBQUMsUUFBUSxFQUFFLENBQUMsQ0FBQyxDQUFDO1lBQzNHLENBQUM7WUFFRCxRQUFRLENBQUMsU0FBUyxDQUFDLFdBQVcsQ0FBQyxDQUFDO1lBRWhDLE1BQU0sTUFBTSxHQUFHLElBQUksNERBQVUsQ0FBQyxJQUFJLENBQUMsQ0FBQztZQUNwQyxNQUFNLENBQUMsT0FBTyxHQUFHLGdCQUFnQixJQUFJLEVBQUUsQ0FBQztZQUN4QyxNQUFNLENBQUMsYUFBYSxDQUFDLE1BQU0sQ0FBQyxPQUFPLEVBQUUsQ0FBQyxNQUFNLEVBQUUsQ0FBQyxDQUFDO1lBQ2hELFFBQVEsQ0FBQyxTQUFTLENBQUMsTUFBTSxDQUFDLENBQUM7UUFDN0IsQ0FBQztRQUVELElBQUksSUFBSSxDQUFDLFlBQVksQ0FBQyxNQUFNLEVBQUUsQ0FBQztZQUM3QixNQUFNLE1BQU0sR0FBRyxJQUFJLDREQUFVLENBQUMsc0RBQWMsQ0FBQyxDQUFDO1lBQzlDLE1BQU0sb0JBQW9CLEdBQUcsSUFBSSw2RUFBb0IsQ0FBQztZQUN0RCxLQUFLLE1BQU0sSUFBSSxJQUFJLElBQUksQ0FBQyxZQUFZLEVBQUUsQ0FBQztnQkFDckMsSUFBSSxHQUFpQixFQUFFLElBQWtCLENBQUM7Z0JBQzFDLElBQUksSUFBSSxDQUFDLEtBQUssWUFBWSw0REFBWSxFQUFFLENBQUM7b0JBQ3ZDLElBQUksS0FBSyxDQUFDLHFCQUFxQjt3QkFDN0IsU0FBUztvQkFDWCxHQUFHLEdBQUcsSUFBSSxDQUFDLEtBQUssQ0FBQztvQkFDakIsTUFBTSxLQUFLLEdBQUksSUFBSSxDQUFDLE9BQWUsQ0FBQyxRQUFRLENBQUMsSUFBSSxDQUFDLEtBQUssQ0FBQyxDQUFDO29CQUN6RCxJQUFJLEdBQUcsSUFBSSxDQUFDLFdBQVcsQ0FBQyxJQUFJLENBQUMsS0FBSyxDQUFDLENBQUM7Z0JBQ3RDLENBQUM7cUJBQ0ksSUFBSSxJQUFJLENBQUMsS0FBSyxZQUFZLHlEQUFVLEVBQUUsQ0FBQztvQkFDMUMsTUFBTSxVQUFVLEdBQUcsSUFBSSxDQUFDLEtBQUssQ0FBQyxVQUFVLENBQUM7b0JBQ3pDLE1BQU0sTUFBTSxHQUFHLElBQUksQ0FBQyxPQUFPLENBQUMsQ0FBQyxHQUFHLENBQUMsVUFBVSxDQUFDLENBQUM7b0JBQzdDLEdBQUcsR0FBRyxNQUFNLENBQUMsT0FBTyxFQUFFLENBQUM7b0JBQ3ZCLElBQUksR0FBRyxJQUFJLENBQUMsV0FBVyxDQUFDLElBQUksQ0FBQyxNQUFNLENBQUMsV0FBVyxFQUFFLENBQUMsQ0FBQztnQkFDckQsQ0FBQztxQkFDSSxDQUFDO29CQUNKLE1BQU0sSUFBSSxLQUFLLENBQUMsbUJBQW1CLElBQUksQ0FBQyxLQUFLLEVBQUUsQ0FBQztnQkFDbEQsQ0FBQztnQkFDRCxJQUFJLEtBQUssQ0FBQyxPQUFPO29CQUNmLElBQUksR0FBRyxLQUFLLENBQUMsT0FBTyxDQUFDLElBQUksQ0FBQyxJQUFJLENBQUMsQ0FBQztnQkFDbEMsTUFBTSxDQUFDLGFBQWEsQ0FBQyxHQUFHLENBQUMsTUFBTSxFQUFFLENBQUMsQ0FBQztnQkFDbkMsb0JBQW9CLENBQUMsR0FBRyxDQUFDLEdBQUcsRUFBRSxJQUFJLENBQUMsQ0FBQztZQUN0QyxDQUFDO1lBQ0QsTUFBTSxDQUFDLE9BQU8sQ0FBQyxvQkFBb0IsQ0FBQyxDQUFDO1lBQ3JDLFFBQVEsQ0FBQyxTQUFTLENBQUMsTUFBTSxDQUFDLENBQUM7UUFDN0IsQ0FBQztRQUVELE1BQU0sRUFBRSxHQUFHLElBQUksNERBQVUsQ0FBQyxrREFBVSxDQUFDLENBQUM7UUFDdEMsTUFBTSxDQUFDLElBQUksQ0FBQyxJQUFJLENBQUMsT0FBTyxDQUFDLENBQUMsT0FBTyxDQUFDLENBQUMsT0FBTyxDQUFDLENBQUMsQ0FBQyxFQUFFLENBQUMsS0FBSyxFQUFFLENBQUMsYUFBYSxDQUFDLENBQUMsQ0FBQyxDQUFDO1FBQ3pFLFFBQVEsQ0FBQyxTQUFTLENBQUMsRUFBRSxDQUFDLENBQUM7UUFFdkIsT0FBTyxRQUFRLENBQUM7SUFDbEIsQ0FBQztJQUVNLE1BQU07UUFDWCxPQUFPO1lBQ0wsT0FBTyxFQUFFLElBQUksQ0FBQyxPQUFPO1lBQ3JCLGFBQWEsRUFBRSxJQUFJLENBQUMsY0FBYztZQUNsQyxLQUFLLEVBQUUsSUFBSSxDQUFDLEtBQUs7WUFDakIsV0FBVyxFQUFFLElBQUksQ0FBQyxZQUFZO1lBQzlCLG9CQUFvQixFQUFFLElBQUksQ0FBQyxxQkFBcUI7WUFDaEQsV0FBVyxFQUFFLElBQUksQ0FBQyxZQUFZO1NBQy9CLENBQUM7SUFDSixDQUFDO0NBQ0Y7QUFBQSxDQUFDOzs7Ozs7Ozs7Ozs7Ozs7OztBQ2hoQkY7Ozs7Ozs7R0FPRztBQUVnRDtBQUNMO0FBTTdDLENBQUM7QUFTRCxDQUFDO0FBSUQsQ0FBQztBQU9LLElBQVUsV0FBVyxDQW1XM0I7QUFuV0QsV0FBaUIsV0FBVztJQUU1QixTQUFTLFlBQVksQ0FBQyxLQUFVO1FBQzlCLElBQUksQ0FBQyxLQUFLLElBQUksT0FBTyxLQUFLLEtBQUssU0FBUyxJQUFJLE9BQU8sS0FBSyxLQUFLLFFBQVEsSUFBSSxPQUFPLEtBQUssS0FBSyxRQUFRLElBQUksS0FBSyxDQUFDLE9BQU8sQ0FBQyxLQUFLLENBQUMsRUFBRSxDQUFDO1lBQzNILE9BQU8sRUFBRSxLQUFLLEVBQUUsQ0FBQztRQUNuQixDQUFDO1FBQ0QsT0FBTyxLQUFLLENBQUM7SUFDZixDQUFDO0lBRUQsU0FBZ0IsYUFBYSxDQUFDLEtBQW9CO1FBQ2hEO3VHQUMrRjtRQUMvRixPQUFPLENBQUMsS0FBSyxDQUFDLEtBQUssS0FBSyxTQUFTLENBQUMsQ0FBQyxDQUFDLENBQUMsS0FBSyxDQUFDLFNBQVMsQ0FBQyxDQUFDLENBQUMsS0FBSyxDQUFDLEtBQUssQ0FBQztJQUNyRSxDQUFDO0lBSmUseUJBQWEsZ0JBSTVCO0lBRUQsU0FBZ0IsR0FBRyxDQUFDLFdBQXdCLEVBQUUsSUFBWTtRQUN4RCxNQUFNLEtBQUssR0FBRyxXQUFXLENBQUMsSUFBSSxDQUFDLENBQUM7UUFDaEMsSUFBSSxLQUFLO1lBQ1AsT0FBTyxhQUFhLENBQUMsS0FBSyxDQUFDLENBQUM7SUFDaEMsQ0FBQztJQUplLGVBQUcsTUFJbEI7SUFFRCxNQUFNLFlBQVksR0FBUTtRQUN4QixLQUFLLEVBQUUsQ0FBQyxLQUFVLEVBQUUsRUFBRTtZQUNwQixPQUFPLEtBQUssQ0FBQyxPQUFPLENBQUMsS0FBSyxDQUFDLENBQUMsQ0FBQyxDQUFDLEtBQUssQ0FBQyxJQUFJLENBQUMsS0FBSyxDQUFDLENBQUMsQ0FBQyxDQUFDLFNBQVMsQ0FBQztRQUM5RCxDQUFDO1FBQ0QsT0FBTyxFQUFFLENBQUMsS0FBVSxFQUFFLEVBQUU7WUFDdEIsT0FBTyxDQUFDLE9BQU8sS0FBSyxLQUFLLFNBQVMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxLQUFLLENBQUMsQ0FBQyxDQUFDLFNBQVMsQ0FBQztRQUMxRCxDQUFDO1FBQ0QsTUFBTSxFQUFFLENBQUMsS0FBVSxFQUFFLEVBQUU7WUFDckIsT0FBTyxDQUFDLE9BQU8sS0FBSyxLQUFLLFFBQVEsQ0FBQyxDQUFDLENBQUMsQ0FBQyxLQUFLLENBQUMsQ0FBQyxDQUFDLFNBQVMsQ0FBQztRQUN6RCxDQUFDO1FBQ0QsTUFBTSxFQUFFLENBQUMsS0FBVSxFQUFFLEVBQUU7WUFDckIsT0FBTyxDQUFDLE9BQU8sS0FBSyxLQUFLLFFBQVEsQ0FBQyxDQUFDLENBQUMsQ0FBQyxLQUFLLENBQUMsQ0FBQyxDQUFDLFNBQVMsQ0FBQztRQUN6RCxDQUFDO1FBQ0QsWUFBWSxFQUFFLENBQUMsS0FBVSxFQUFFLEVBQUU7WUFDM0IsT0FBTyw0REFBWSxDQUFDLE1BQU0sQ0FBQyxLQUFLLENBQUMsQ0FBQztRQUNwQyxDQUFDO1FBQ0QsUUFBUSxFQUFFLENBQUMsS0FBVSxFQUFFLEVBQUU7WUFDdkIsT0FBTyw0REFBWSxDQUFDLE1BQU0sQ0FBQyxLQUFLLENBQUMsQ0FBQztRQUNwQyxDQUFDO1FBQ0QsT0FBTyxFQUFFLENBQUMsS0FBVSxFQUFFLEVBQUU7WUFDdEIsT0FBTyw0REFBWSxDQUFDLE1BQU0sQ0FBQyxLQUFLLENBQUMsQ0FBQztRQUNwQyxDQUFDO1FBQ0QsTUFBTSxFQUFFLENBQUMsS0FBVSxFQUFFLEVBQUU7WUFDckIsT0FBTyxLQUFLLENBQUM7UUFDZixDQUFDO0tBQ0YsQ0FBQztJQUVGLE1BQU0sY0FBYyxHQUFRO1FBQzFCLEtBQUssRUFBRSxDQUFDLEtBQVUsRUFBRSxFQUFFO1lBQ3BCLE1BQU0sTUFBTSxHQUFHLEVBQUUsQ0FBQztZQUNsQixLQUFLLE1BQU0sSUFBSSxJQUFJLEtBQUssRUFBRSxDQUFDO2dCQUN6QixJQUFJLElBQUksSUFBSSxPQUFPLElBQUksS0FBSyxRQUFRO29CQUNsQyxNQUFNLENBQUMsSUFBSSxDQUFDLE9BQU8sSUFBSSxDQUFDLE1BQU0sS0FBSyxVQUFVLENBQUMsQ0FBQyxDQUFDLElBQUksQ0FBQyxNQUFNLEVBQUUsQ0FBQyxDQUFDLENBQUMsMkRBQVEsQ0FBQyxJQUFJLENBQUMsQ0FBQyxDQUFDOztvQkFFaEYsTUFBTSxDQUFDLElBQUksQ0FBQyxJQUFJLENBQUMsQ0FBQztZQUN0QixDQUFDO1lBQ0QsT0FBTyxNQUFNLENBQUM7UUFDaEIsQ0FBQztRQUNELE9BQU8sRUFBRSxDQUFDLEtBQVUsRUFBRSxFQUFFO1lBQ3RCLE9BQU8sS0FBSyxDQUFDO1FBQ2YsQ0FBQztRQUNELE1BQU0sRUFBRSxDQUFDLEtBQVUsRUFBRSxFQUFFO1lBQ3JCLE9BQU8sS0FBSyxDQUFDO1FBQ2YsQ0FBQztRQUNELE1BQU0sRUFBRSxDQUFDLEtBQVUsRUFBRSxFQUFFO1lBQ3JCLE9BQU8sS0FBSyxDQUFDO1FBQ2YsQ0FBQztRQUNELFlBQVksRUFBRSxDQUFDLEtBQVUsRUFBRSxFQUFFO1lBQzNCLE9BQU8sS0FBSyxDQUFDLE1BQU0sRUFBRSxDQUFDO1FBQ3hCLENBQUM7UUFDRCxRQUFRLEVBQUUsQ0FBQyxLQUFVLEVBQUUsRUFBRTtZQUN2QixPQUFPLEtBQUssQ0FBQyxNQUFNLEVBQUUsQ0FBQztRQUN4QixDQUFDO1FBQ0QsT0FBTyxFQUFFLENBQUMsS0FBVSxFQUFFLEVBQUU7WUFDdEIsT0FBTyxLQUFLLENBQUMsTUFBTSxFQUFFLENBQUM7UUFDeEIsQ0FBQztRQUNELE1BQU0sRUFBRSxDQUFDLEtBQVUsRUFBRSxFQUFFO1lBQ3JCLE9BQU8sMkRBQVEsQ0FBQyxLQUFLLENBQUMsQ0FBQztRQUN6QixDQUFDO0tBQ0YsQ0FBQztJQUVGLFNBQWdCLGFBQWEsQ0FBQyxLQUFvQixFQUFFLEtBQVU7UUFDNUQsSUFBSSxLQUFLLENBQUMsT0FBTyxDQUFDLEtBQUssQ0FBQyxJQUFJLENBQUM7WUFDM0IsT0FBTyxLQUFLLENBQUM7UUFDZixNQUFNLElBQUksR0FBRyxjQUFjLENBQUMsS0FBSyxDQUFDLElBQUksQ0FBQyxDQUFDO1FBQ3hDLElBQUksQ0FBQyxJQUFJO1lBQ1AsTUFBTSxJQUFJLEtBQUssQ0FBQyxpQkFBaUIsS0FBSyxDQUFDLElBQUksU0FBUyxLQUFLLENBQUMsSUFBSSxFQUFFLENBQUMsQ0FBQztRQUNwRSxPQUFPLElBQUksQ0FBQyxLQUFLLENBQUMsQ0FBQztJQUNyQixDQUFDO0lBUGUseUJBQWEsZ0JBTzVCO0lBRUQsU0FBZ0IsY0FBYyxDQUFDLEtBQW9CLEVBQUUsS0FBVTtRQUM3RCxJQUFJLFFBQWEsQ0FBQztRQUNsQixJQUFJLEtBQUssQ0FBQyxPQUFPLENBQUMsS0FBSyxDQUFDLElBQUksQ0FBQztZQUMzQixRQUFRLEdBQUcsS0FBSyxDQUFDLElBQUksQ0FBQyxRQUFRLENBQUMsS0FBSyxDQUFDLENBQUMsQ0FBQyxDQUFDLEtBQUssQ0FBQyxDQUFDLENBQUMsU0FBUyxDQUFDO2FBQ3ZELENBQUM7WUFDSixNQUFNLElBQUksR0FBRyxZQUFZLENBQUMsS0FBSyxDQUFDLElBQUksQ0FBQyxDQUFDO1lBQ3RDLElBQUksQ0FBQyxJQUFJO2dCQUNQLE1BQU0sSUFBSSxLQUFLLENBQUMsaUJBQWlCLEtBQUssQ0FBQyxJQUFJLFNBQVMsS0FBSyxDQUFDLElBQUksRUFBRSxDQUFDLENBQUM7WUFDcEUsUUFBUSxHQUFHLElBQUksQ0FBQyxLQUFLLENBQUMsQ0FBQztRQUN6QixDQUFDO1FBQ0QsSUFBSSxRQUFRLEtBQUssU0FBUztZQUN4QixNQUFNLElBQUksU0FBUyxDQUFDLHNCQUFzQixLQUFLLFFBQVEsS0FBSyxDQUFDLElBQUksVUFBVSxLQUFLLENBQUMsSUFBSSxFQUFFLENBQUMsQ0FBQztRQUMzRixPQUFPLFFBQVEsQ0FBQztJQUNsQixDQUFDO0lBYmUsMEJBQWMsaUJBYTdCO0lBRUQsU0FBZ0IsY0FBYyxDQUFDLEtBQW9CLEVBQUUsU0FBb0Q7UUFDdkcsTUFBTSxNQUFNLEdBQWtCO1lBQzVCLElBQUksRUFBRSxLQUFLLENBQUMsSUFBSTtZQUNoQixJQUFJLEVBQUUsS0FBSyxDQUFDLElBQUk7WUFDaEIsS0FBSyxFQUFFLEtBQUssQ0FBQyxLQUFLO1lBQ2xCLFdBQVcsRUFBRSxLQUFLLENBQUMsV0FBVztTQUMvQixDQUFDO1FBQ0YsSUFBSSxLQUFLLENBQUMsU0FBUyxLQUFLLFNBQVM7WUFDL0IsTUFBTSxDQUFDLFNBQVMsR0FBRyxTQUFTLENBQUMsS0FBSyxFQUFFLEtBQUssQ0FBQyxTQUFTLENBQUMsQ0FBQztRQUN2RCxJQUFJLEtBQUssQ0FBQyxLQUFLLEtBQUssU0FBUztZQUMzQixNQUFNLENBQUMsS0FBSyxHQUFHLFNBQVMsQ0FBQyxLQUFLLEVBQUUsS0FBSyxDQUFDLEtBQUssQ0FBQyxDQUFDO1FBQy9DLE9BQU8sTUFBTSxDQUFDO0lBQ2hCLENBQUM7SUFaZSwwQkFBYyxpQkFZN0I7SUFFRCxTQUFnQixRQUFRLENBQUMsV0FBd0I7UUFDL0MsTUFBTSxNQUFNLEdBQWdCLEVBQUUsQ0FBQztRQUMvQixLQUFLLE1BQU0sQ0FBQyxHQUFHLEVBQUUsR0FBRyxDQUFDLElBQUksTUFBTSxDQUFDLE9BQU8sQ0FBQyxXQUFXLENBQUM7WUFDbEQsTUFBTSxDQUFDLEdBQUcsQ0FBQyxHQUFHLGNBQWMsQ0FBQyxHQUFHLEVBQUUsY0FBYyxDQUFDLENBQUM7UUFDcEQsT0FBTyxNQUFNLENBQUM7SUFDaEIsQ0FBQztJQUxlLG9CQUFRLFdBS3ZCO0lBRUQsU0FBZ0IsTUFBTSxDQUFDLFdBQXdCO1FBQzdDLE1BQU0sTUFBTSxHQUFnQixFQUFFLENBQUM7UUFDL0IsS0FBSyxNQUFNLENBQUMsR0FBRyxFQUFFLEdBQUcsQ0FBQyxJQUFJLE1BQU0sQ0FBQyxPQUFPLENBQUMsV0FBVyxDQUFDO1lBQ2xELE1BQU0sQ0FBQyxHQUFHLENBQUMsR0FBRyxjQUFjLENBQUMsR0FBRyxFQUFFLGFBQWEsQ0FBQyxDQUFDO1FBQ25ELE9BQU8sTUFBTSxDQUFDO0lBQ2hCLENBQUM7SUFMZSxrQkFBTSxTQUtyQjtJQUVELFNBQWdCLGFBQWEsQ0FBQyxLQUFvQixFQUFFLEtBQVU7UUFDNUQsS0FBSyxDQUFDLEtBQUssR0FBRyxjQUFjLENBQUMsS0FBSyxFQUFFLEtBQUssQ0FBQyxDQUFDO0lBQzdDLENBQUM7SUFGZSx5QkFBYSxnQkFFNUI7SUFFRCxTQUFnQixHQUFHLENBQUMsV0FBd0IsRUFBRSxJQUFZLEVBQUUsS0FBVTtRQUNwRSxNQUFNLEtBQUssR0FBRyxXQUFXLENBQUMsSUFBSSxDQUFDLENBQUM7UUFDaEMsSUFBSSxDQUFDLEtBQUs7WUFDUixNQUFNLElBQUksS0FBSyxDQUFDLGFBQWEsSUFBSSxtQkFBbUIsQ0FBQyxDQUFDO1FBQ3hELGFBQWEsQ0FBQyxLQUFLLEVBQUUsS0FBSyxDQUFDLENBQUM7SUFDOUIsQ0FBQztJQUxlLGVBQUcsTUFLbEI7SUFFRCxTQUFnQixLQUFLLENBQUMsV0FBd0IsRUFBRSxJQUFZO1FBQzFELE1BQU0sS0FBSyxHQUFHLFdBQVcsQ0FBQyxJQUFJLENBQUMsQ0FBQztRQUNoQyxJQUFJLENBQUMsS0FBSztZQUNSLE1BQU0sSUFBSSxLQUFLLENBQUMsYUFBYSxJQUFJLG1CQUFtQixDQUFDLENBQUM7UUFDeEQsS0FBSyxDQUFDLEtBQUssR0FBRyxTQUFTLENBQUM7SUFDMUIsQ0FBQztJQUxlLGlCQUFLLFFBS3BCO0lBRUQsU0FBZ0IsY0FBYyxDQUFDLEdBQWdCLEVBQUUsS0FBYSxFQUFFLElBQVksRUFBRSxVQUE4QjtRQUMxRyxJQUFJLFdBQVcsR0FBRyxHQUFHLENBQUMsSUFBSSxDQUFDLENBQUM7UUFDNUIsSUFBSSxZQUFZLEdBQUcsQ0FBQyxLQUFVLEVBQUUsRUFBRSxDQUFDLElBQUksQ0FBQztRQUN4QyxJQUFJLENBQUMsV0FBVyxFQUFFLENBQUM7WUFDakIsV0FBVyxHQUFHO2dCQUNaLElBQUk7Z0JBQ0osSUFBSSxFQUFFLEVBQUUsRUFBRSxLQUFLLEVBQUUsS0FBSyxFQUFFLFNBQVMsRUFBRyxTQUFTLEVBQUUsU0FBUyxFQUFFLFdBQVcsRUFBRSxFQUFFO2FBQzFFLENBQUM7WUFDRixHQUFHLENBQUMsSUFBSSxDQUFDLEdBQUcsV0FBVyxDQUFDO1FBQzFCLENBQUM7YUFDSSxJQUFJLEtBQUssS0FBSyxXQUFXLENBQUMsS0FBSyxFQUFFLENBQUM7WUFDckMsSUFBSSxXQUFXLENBQUMsS0FBSztnQkFDbkIsTUFBTSxJQUFJLEtBQUssQ0FBQywyQkFBMkIsSUFBSSxvQkFBb0IsV0FBVyxDQUFDLEtBQUssdUJBQXVCLEtBQUssR0FBRyxDQUFDLENBQUM7WUFDdkgsV0FBVyxDQUFDLEtBQUssR0FBRyxLQUFLLENBQUM7UUFDNUIsQ0FBQztRQUVELFdBQVcsQ0FBQyxJQUFJLEdBQUcsVUFBVSxDQUFDLElBQUksSUFBSSxXQUFXLENBQUMsSUFBSSxDQUFDO1FBQ3ZELFdBQVcsQ0FBQyxXQUFXLEdBQUcsVUFBVSxDQUFDLFdBQVcsSUFBSSxXQUFXLENBQUMsV0FBVyxDQUFDO1FBRTVFLElBQUksSUFBdUIsQ0FBQztRQUM1QixJQUFJLFdBQVcsQ0FBQyxJQUFJO1lBQ2xCLElBQUksR0FBRyxXQUFXLENBQUMsSUFBSSxDQUFDO2FBQ3JCLElBQUksS0FBSyxDQUFDLE9BQU8sQ0FBQyxVQUFVLENBQUMsS0FBSyxDQUFDO1lBQ3RDLElBQUksR0FBRyxPQUFPLENBQUM7YUFDWixJQUFJLFVBQVUsQ0FBQyxLQUFLLFlBQVksNERBQVk7WUFDL0MsSUFBSSxHQUFHLGNBQWMsQ0FBQzs7WUFFdEIsSUFBSSxHQUFHLE9BQU8sVUFBVSxDQUFDLEtBQUssQ0FBQztRQUVqQyxJQUFJLEtBQUssQ0FBQyxPQUFPLENBQUMsSUFBSSxDQUFDLEVBQUUsQ0FBQztZQUN4QixNQUFNLFFBQVEsR0FBRyxJQUFJLENBQUM7WUFDdEIsSUFBSSxRQUFRLENBQUM7WUFDYixLQUFLLE1BQU0sSUFBSSxJQUFJLFFBQVEsRUFBRSxDQUFDO2dCQUM1QixNQUFNLEVBQUUsR0FBRyxPQUFPLElBQUksQ0FBQztnQkFDdkIsSUFBSSxDQUFDLFFBQVE7b0JBQ1gsUUFBUSxHQUFHLEVBQUUsQ0FBQztxQkFDWCxJQUFJLFFBQVEsS0FBSyxFQUFFO29CQUN0QixNQUFNLElBQUksS0FBSyxDQUFDLG9CQUFvQixJQUFJLDJCQUEyQixDQUFDLENBQUM7WUFDekUsQ0FBQztZQUNELElBQUksUUFBUSxLQUFLLFNBQVMsSUFBSSxRQUFRLEtBQUssUUFBUSxJQUFJLFFBQVEsS0FBSyxRQUFRO2dCQUMxRSxNQUFNLElBQUksS0FBSyxDQUFDLFFBQVEsSUFBSSxnQkFBZ0IsUUFBUSxPQUFPLENBQUMsQ0FBQztZQUMvRCxZQUFZLEdBQUcsQ0FBQyxLQUFVLEVBQUUsRUFBRSxDQUFDLFFBQVEsQ0FBQyxRQUFRLENBQUMsS0FBSyxDQUFDLENBQUM7UUFDMUQsQ0FBQzthQUNJLElBQUksSUFBSSxLQUFLLFNBQVMsRUFBRSxDQUFDO1lBQzVCLFlBQVksR0FBRyxDQUFDLEtBQVUsRUFBRSxFQUFFLENBQUMsT0FBTyxLQUFLLEtBQUssU0FBUyxDQUFDO1FBQzVELENBQUM7YUFDSSxJQUFJLElBQUksS0FBSyxRQUFRLEVBQUUsQ0FBQztZQUMzQixZQUFZLEdBQUcsQ0FBQyxLQUFVLEVBQUUsRUFBRSxDQUFDLE9BQU8sS0FBSyxLQUFLLFFBQVEsQ0FBQztRQUMzRCxDQUFDO2FBQ0ksSUFBSSxJQUFJLEtBQUssUUFBUSxFQUFFLENBQUM7WUFDM0IsWUFBWSxHQUFHLENBQUMsS0FBVSxFQUFFLEVBQUUsQ0FBQyxPQUFPLEtBQUssS0FBSyxRQUFRLENBQUM7UUFDM0QsQ0FBQzthQUNJLElBQUksSUFBSSxLQUFLLE9BQU8sRUFBRSxDQUFDO1lBQzFCLFlBQVksR0FBRyxLQUFLLENBQUMsT0FBTyxDQUFDO1FBQy9CLENBQUM7YUFDSSxJQUFJLElBQUksS0FBSyxjQUFjLElBQUksSUFBSSxLQUFLLFVBQVUsSUFBSSxJQUFJLEtBQUssU0FBUyxFQUFFLENBQUM7WUFDOUUsWUFBWSxHQUFHLENBQUMsS0FBVSxFQUFFLEVBQUUsQ0FBQyxDQUFDLENBQUMsNERBQVksQ0FBQyxNQUFNLENBQUMsS0FBSyxDQUFDLENBQUM7UUFDOUQsQ0FBQzthQUNJLElBQUksSUFBSSxLQUFLLFFBQVEsSUFBSSxJQUFJLEtBQUssTUFBTSxFQUFFLENBQUM7WUFDOUMsTUFBTSxJQUFJLEtBQUssQ0FBQyxhQUFhLElBQUksZ0JBQWdCLElBQUksUUFBUSxDQUFDLENBQUM7UUFDakUsQ0FBQztRQUVELElBQUksVUFBVSxDQUFDLEtBQUssS0FBSyxTQUFTLEVBQUUsQ0FBQztZQUNuQyxXQUFXLENBQUMsU0FBUyxHQUFHLENBQUMsSUFBSSxLQUFLLE9BQU8sQ0FBQyxDQUFDLENBQUMsQ0FBQyxFQUFFLENBQUMsQ0FBQyxDQUFDLFNBQVMsQ0FBQztRQUM5RCxDQUFDO2FBQ0ksQ0FBQztZQUNKLElBQUksQ0FBQyxZQUFZLENBQUMsVUFBVSxDQUFDLEtBQUssQ0FBQztnQkFDL0IsTUFBTSxJQUFJLFNBQVMsQ0FBQyxzQkFBc0IsVUFBVSxDQUFDLEtBQUssUUFBUSxJQUFJLGVBQWUsQ0FBQyxDQUFDO1lBQzNGLFdBQVcsQ0FBQyxTQUFTLEdBQUcsQ0FBQyxJQUFJLEtBQUssT0FBTyxDQUFDLENBQUMsQ0FBQyxDQUFDLEtBQUssQ0FBQyxJQUFJLENBQUMsVUFBVSxDQUFDLEtBQUssQ0FBQyxDQUFDLENBQUMsQ0FBQyxVQUFVLENBQUMsS0FBSyxDQUFDO1FBQy9GLENBQUM7UUFFRCxXQUFXLENBQUMsSUFBSSxHQUFHLElBQUksQ0FBQztRQUN4QixJQUFJLFdBQVcsQ0FBQyxTQUFTLEtBQUssU0FBUyxFQUFFLENBQUM7WUFDeEMsV0FBVyxDQUFDLFNBQVMsR0FBRyxjQUFjLENBQUMsV0FBVyxFQUFFLFdBQVcsQ0FBQyxTQUFTLENBQUMsQ0FBQztRQUM3RSxDQUFDO1FBQ0QsSUFBSSxXQUFXLENBQUMsS0FBSyxLQUFLLFNBQVMsRUFBRSxDQUFDO1lBQ3BDLFdBQVcsQ0FBQyxLQUFLLEdBQUcsY0FBYyxDQUFDLFdBQVcsRUFBRSxXQUFXLENBQUMsS0FBSyxDQUFDLENBQUM7UUFDckUsQ0FBQztJQUNILENBQUM7SUE5RWUsMEJBQWMsaUJBOEU3QjtJQUVELFNBQWdCLFdBQVcsQ0FBSSxHQUFnQixFQUFFLENBQU87UUFDdEQsQ0FBQyxHQUFHLENBQUMsSUFBSSxFQUFFLENBQUM7UUFDWixNQUFNLE9BQU8sR0FBc0I7WUFDakMsR0FBRyxDQUFDLE1BQW1CLEVBQUUsR0FBVyxFQUFFLFFBQWE7Z0JBQ2pELE1BQU0sS0FBSyxHQUFHLE1BQU0sQ0FBQyxHQUFHLENBQUMsQ0FBQztnQkFDMUIsSUFBSSxLQUFLO29CQUNQLE9BQU8sYUFBYSxDQUFDLEtBQUssQ0FBQyxDQUFDO2dCQUM5QixPQUFPLENBQUMsQ0FBQyxHQUFHLENBQUMsQ0FBQztZQUNoQixDQUFDO1lBQ0QsR0FBRyxDQUFDLE1BQW1CLEVBQUUsR0FBVyxFQUFFLEtBQVU7Z0JBQzlDLE1BQU0sS0FBSyxHQUFHLE1BQU0sQ0FBQyxHQUFHLENBQUMsQ0FBQztnQkFDMUIsSUFBSSxLQUFLO29CQUNQLGFBQWEsQ0FBQyxLQUFLLEVBQUUsS0FBSyxDQUFDLENBQUM7O29CQUU1QixjQUFjLENBQUMsTUFBTSxFQUFFLEVBQUUsRUFBRSxHQUFHLEVBQUUsWUFBWSxDQUFDLEtBQUssQ0FBQyxDQUFDLENBQUM7Z0JBQ3ZELE9BQU8sSUFBSSxDQUFDO1lBQ2QsQ0FBQztZQUNELEdBQUcsQ0FBQyxNQUFtQixFQUFFLEdBQVc7Z0JBQ2xDLE9BQU8sTUFBTSxDQUFDLGNBQWMsQ0FBQyxHQUFHLENBQUMsSUFBSSxDQUFDLEdBQUcsSUFBSSxNQUFNLENBQUMsQ0FBQztZQUN2RCxDQUFDO1lBQ0QsT0FBTyxDQUFDLE1BQW1CO2dCQUN6QixPQUFPLE1BQU0sQ0FBQyxJQUFJLENBQUMsTUFBTSxDQUFDLENBQUM7WUFDN0IsQ0FBQztZQUNELGNBQWMsQ0FBQyxNQUFtQixFQUFFLEdBQVc7Z0JBQzdDLE1BQU0sSUFBSSxLQUFLLENBQUMsaUJBQWlCLEdBQUcsUUFBUSxDQUFDLENBQUM7WUFDaEQsQ0FBQztTQUNGLENBQUM7UUFDRixPQUFPLElBQUksS0FBSyxDQUFDLEdBQUcsRUFBRSxPQUFPLENBQUMsQ0FBQztJQUNqQyxDQUFDO0lBNUJlLHVCQUFXLGNBNEIxQjtJQUVELFNBQWdCLGdCQUFnQixDQUFDLEdBQWdCO1FBQy9DLE1BQU0sTUFBTSxHQUFnQixFQUFFLENBQUM7UUFDL0IsS0FBSyxNQUFNLENBQUUsSUFBSSxFQUFFLEtBQUssQ0FBRSxJQUFJLE1BQU0sQ0FBQyxPQUFPLENBQUMsR0FBRyxDQUFDLEVBQUUsQ0FBQztZQUNsRCxjQUFjLENBQUMsTUFBTSxFQUFFLEtBQUssQ0FBQyxLQUFLLEVBQUUsSUFBSSxFQUFFO2dCQUN4QyxJQUFJLEVBQUUsS0FBSyxDQUFDLElBQUk7Z0JBQ2hCLFdBQVcsRUFBRSxLQUFLLENBQUMsV0FBVztnQkFDOUIsS0FBSyxFQUFFLEtBQUssQ0FBQyxTQUFTO2FBQ3ZCLENBQUMsQ0FBQztZQUNILElBQUksYUFBYSxDQUFDLEtBQUssQ0FBQyxLQUFLLFNBQVM7Z0JBQ3BDLE1BQU0sQ0FBQyxJQUFJLENBQUMsQ0FBQyxLQUFLLEdBQUcsYUFBYSxDQUFDLEtBQUssQ0FBQyxDQUFDO1FBQzlDLENBQUM7UUFDRCxPQUFPLE1BQU0sQ0FBQztJQUNoQixDQUFDO0lBWmUsNEJBQWdCLG1CQVkvQjtJQUVELFNBQWdCLHlCQUF5QixDQUFDLEdBQWdCLEVBQUUsS0FBYSxFQUFFLE1BQWtCO1FBQzNGLEtBQUssTUFBTSxDQUFDLElBQUksRUFBRSxLQUFLLENBQUMsSUFBSSxNQUFNLENBQUMsT0FBTyxDQUFDLE1BQU0sQ0FBQyxFQUFFLENBQUM7WUFDbkQsY0FBYyxDQUFDLEdBQUcsRUFBRSxLQUFLLEVBQUUsSUFBSSxFQUFFLEVBQUUsS0FBSyxFQUFFLENBQUMsQ0FBQztZQUM1QyxHQUFHLENBQUMsSUFBSSxDQUFDLENBQUMsS0FBSyxHQUFHLEtBQUssQ0FBQztRQUMxQixDQUFDO0lBQ0gsQ0FBQztJQUxlLHFDQUF5Qiw0QkFLeEM7SUFFRCxTQUFnQiw0QkFBNEIsQ0FBQyxHQUFnQixFQUFFLEtBQWEsRUFBRSxTQUFjO1FBQzFGLEtBQUssTUFBTSxDQUFDLElBQUksRUFBRSxLQUFLLENBQUMsSUFBSSxNQUFNLENBQUMsT0FBTyxDQUFDLFNBQVMsQ0FBQyxFQUFFLENBQUM7WUFDdEQsTUFBTSxVQUFVLEdBQUcsS0FBSyxJQUFJLE9BQU8sS0FBSyxLQUFLLFFBQVEsQ0FBQyxDQUFDLENBQUMsS0FBSyxDQUFDLENBQUMsQ0FBQyxFQUFDLEtBQUssRUFBRSxDQUFDO1lBQ3pFLGNBQWMsQ0FBQyxHQUFHLEVBQUUsS0FBSyxFQUFFLElBQUksRUFBRSxVQUFVLENBQUMsQ0FBQztRQUMvQyxDQUFDO0lBQ0gsQ0FBQztJQUxlLHdDQUE0QiwrQkFLM0M7SUFFRCxTQUFnQixtQkFBbUIsQ0FBQyxHQUFnQixFQUFFLEtBQWM7UUFDbEUsTUFBTSxNQUFNLEdBQVEsRUFBRSxDQUFDO1FBQ3ZCLEtBQUssTUFBTSxDQUFFLElBQUksRUFBRSxLQUFLLENBQUUsSUFBSSxNQUFNLENBQUMsT0FBTyxDQUFDLEdBQUcsQ0FBQyxFQUFFLENBQUM7WUFDbEQsSUFBSSxLQUFLLEtBQUssU0FBUyxJQUFJLEtBQUssQ0FBQyxLQUFLLElBQUksS0FBSyxDQUFDLEtBQUssS0FBSyxLQUFLO2dCQUM3RCxTQUFTO1lBQ1gsTUFBTSxDQUFDLElBQUksQ0FBQyxHQUFHO2dCQUNiLElBQUksRUFBRSxLQUFLLENBQUMsSUFBSTtnQkFDaEIsV0FBVyxFQUFFLEtBQUssQ0FBQyxXQUFXO2dCQUM5QixLQUFLLEVBQUUsYUFBYSxDQUFDLEtBQUssQ0FBQzthQUM1QixDQUFDO1FBQ0osQ0FBQztRQUNELE9BQU8sTUFBTSxDQUFDO0lBQ2hCLENBQUM7SUFaZSwrQkFBbUIsc0JBWWxDO0lBRUQsU0FBZ0Isb0JBQW9CLENBQUMsR0FBZ0IsRUFBRSxLQUFjO1FBQ25FLE1BQU0sTUFBTSxHQUFRLEVBQUUsQ0FBQztRQUN2QixLQUFLLE1BQU0sQ0FBRSxJQUFJLEVBQUUsS0FBSyxDQUFFLElBQUksTUFBTSxDQUFDLE9BQU8sQ0FBQyxHQUFHLENBQUMsRUFBRSxDQUFDO1lBQ2xELElBQUksQ0FBQyxLQUFLLElBQUksS0FBSyxLQUFLLEtBQUssQ0FBQyxLQUFLO2dCQUNqQyxNQUFNLENBQUMsSUFBSSxDQUFDLEdBQUcsYUFBYSxDQUFDLEtBQUssQ0FBQyxDQUFDO1FBQ3hDLENBQUM7UUFDRCxPQUFPLE1BQU0sQ0FBQztJQUNoQixDQUFDO0lBUGUsZ0NBQW9CLHVCQU9uQztJQUVELFNBQWdCLGNBQWMsQ0FBQyxNQUFXLEVBQUUsTUFBVztRQUNyRCxJQUFJLENBQUMsTUFBTSxJQUFJLE9BQU8sTUFBTSxLQUFLLFFBQVE7WUFDdkMsTUFBTSxJQUFJLEtBQUssQ0FBQyxVQUFVLE1BQU0sZ0JBQWdCLENBQUMsQ0FBQztRQUNwRCxJQUFJLENBQUMsTUFBTSxJQUFJLE9BQU8sTUFBTSxLQUFLLFFBQVE7WUFDdkMsTUFBTSxJQUFJLEtBQUssQ0FBQyxVQUFVLE1BQU0sZ0JBQWdCLENBQUMsQ0FBQztRQUNwRCxJQUFJLEtBQUssQ0FBQyxPQUFPLENBQUMsTUFBTSxDQUFDLEVBQUUsQ0FBQztZQUMxQixJQUFJLENBQUMsS0FBSyxDQUFDLE9BQU8sQ0FBQyxNQUFNLENBQUM7Z0JBQ3hCLE1BQU0sSUFBSSxLQUFLLENBQUMsd0JBQXdCLENBQUMsQ0FBQztZQUM1QyxLQUFLLE1BQU0sSUFBSSxJQUFJLE1BQU07Z0JBQ3ZCLE1BQU0sQ0FBQyxJQUFJLENBQUMsSUFBSSxDQUFDLENBQUM7UUFDdEIsQ0FBQzthQUNJLENBQUM7WUFDSixLQUFLLE1BQU0sQ0FBRSxHQUFHLEVBQUUsR0FBRyxDQUFFLElBQUksTUFBTSxDQUFDLE9BQU8sQ0FBQyxNQUFNLENBQUMsRUFBRSxDQUFDO2dCQUNsRCxJQUFJLENBQUMsTUFBTSxDQUFDLE1BQU0sQ0FBQyxNQUFNLEVBQUUsR0FBRyxDQUFDLEVBQUUsQ0FBQztvQkFDaEMsTUFBTSxDQUFDLEdBQUcsQ0FBQyxHQUFHLEdBQUcsQ0FBQztnQkFDcEIsQ0FBQztxQkFDSSxJQUFJLE1BQU0sQ0FBQyxHQUFHLENBQUMsSUFBSSxPQUFPLE1BQU0sQ0FBQyxHQUFHLENBQUMsS0FBSyxRQUFRLEVBQUUsQ0FBQztvQkFDeEQsSUFBSSxDQUFDLEdBQUcsSUFBSSxPQUFPLEdBQUcsS0FBSyxRQUFRO3dCQUNqQyxNQUFNLElBQUksS0FBSyxDQUFDLFVBQVUsR0FBRyxRQUFRLEdBQUcseUJBQXlCLENBQUMsQ0FBQztvQkFDckUsY0FBYyxDQUFDLE1BQU0sQ0FBQyxHQUFHLENBQUMsRUFBRSxHQUFHLENBQUMsQ0FBQztnQkFDbkMsQ0FBQztxQkFDSSxDQUFDO29CQUNKLE1BQU0sSUFBSSxLQUFLLENBQUMsVUFBVSxHQUFHLFFBQVEsR0FBRyxpQkFBaUIsT0FBTyxNQUFNLENBQUMsR0FBRyxDQUFDLEVBQUUsQ0FBQyxDQUFDO2dCQUNqRixDQUFDO1lBQ0gsQ0FBQztRQUNILENBQUM7UUFDRCxPQUFPLE1BQU0sQ0FBQztJQUNoQixDQUFDO0lBM0JlLDBCQUFjLGlCQTJCN0I7SUFFRCxTQUFnQixnQkFBZ0IsQ0FBQyxNQUFtQixFQUFFLE1BQVc7UUFDL0QsS0FBSyxNQUFNLENBQUMsSUFBSSxFQUFFLEtBQUssQ0FBQyxJQUFJLE1BQU0sQ0FBQyxPQUFPLENBQUMsTUFBTSxDQUFDLEVBQUUsQ0FBQztZQUNuRCxJQUFJLEtBQUssR0FBRyxNQUFNLENBQUMsSUFBSSxDQUFDLENBQUM7WUFDekIsSUFBSSxDQUFDLEtBQUs7Z0JBQ1IsY0FBYyxDQUFDLE1BQU0sRUFBRSxFQUFFLEVBQUUsSUFBSSxFQUFFLEVBQUUsS0FBSyxFQUFFLENBQUMsQ0FBQztpQkFDekMsQ0FBQztnQkFDSixJQUFJLElBQUksR0FBRyxhQUFhLENBQUMsS0FBSyxDQUFDLENBQUM7Z0JBQ2hDLGFBQWEsQ0FBQyxLQUFLLEVBQUUsQ0FBQyxJQUFJLElBQUksT0FBTyxJQUFJLEtBQUssUUFBUSxDQUFDLENBQUMsQ0FBQyxDQUFDLGNBQWMsQ0FBQyxJQUFJLEVBQUUsS0FBSyxDQUFDLENBQUMsQ0FBQyxDQUFDLEtBQUssQ0FBQyxDQUFDO1lBQ2pHLENBQUM7UUFDSCxDQUFDO1FBQ0QsT0FBTyxNQUFNLENBQUM7SUFDaEIsQ0FBQztJQVhlLDRCQUFnQixtQkFXL0I7QUFFRCxDQUFDLEVBbldnQixXQUFXLEtBQVgsV0FBVyxRQW1XM0IsQ0FBQyxjQUFjOzs7Ozs7Ozs7Ozs7Ozs7O0FDdlloQjs7Ozs7OztHQU9HO0FBR2dFO0FBRW5FLE1BQU0sS0FBSyxHQUFHLE1BQU0sQ0FBQyxPQUFPLENBQUMsQ0FBQztBQUV2QixNQUFNLGFBQWMsU0FBUSw2REFBYztJQUMvQyxDQUFDLEtBQUssQ0FBQyxDQUFjO0lBRXJCLFlBQVksS0FBa0I7UUFDNUIsS0FBSyxDQUFDLEtBQUssQ0FBQyxDQUFDO1FBQ2IsSUFBSSxDQUFDLEtBQUssQ0FBQyxHQUFHLEtBQUssQ0FBQztJQUN0QixDQUFDO0lBRU0sTUFBTSxDQUFDLE1BQU0sQ0FBQyxXQUF3QjtRQUMzQyxPQUFPLGdFQUFhLENBQUMsSUFBSSxhQUFhLENBQUMsV0FBVyxDQUFDLENBQUMsQ0FBQztJQUN2RCxDQUFDO0NBQ0Y7QUFBQSxDQUFDOzs7Ozs7Ozs7Ozs7Ozs7QUN6QkY7Ozs7Ozs7R0FPRztBQUtGLENBQUM7QUFJRixNQUFNLFNBQVMsR0FBRyxJQUFJLEdBQUcsRUFBa0MsQ0FBQztBQUVyRCxJQUFVLFlBQVksQ0FtQzVCO0FBbkNELFdBQWlCLFlBQVk7SUFFN0IsU0FBZ0IsY0FBYyxDQUFDLElBQVksRUFBRSxJQUE0QjtRQUN2RSxJQUFJLENBQUMsSUFBSSxJQUFJLFNBQVMsQ0FBQyxHQUFHLENBQUMsSUFBSSxDQUFDO1lBQzlCLE1BQU0sSUFBSSxLQUFLLENBQUMsU0FBUyxJQUFJLDBCQUEwQixDQUFDLENBQUM7UUFDM0QsU0FBUyxDQUFDLEdBQUcsQ0FBQyxJQUFJLEVBQUUsSUFBSSxDQUFDLENBQUM7SUFDNUIsQ0FBQztJQUplLDJCQUFjLGlCQUk3QjtJQUVELFNBQWdCLFFBQVEsQ0FBQyxLQUFtQjtRQUMxQyxJQUFJLEtBQUssS0FBSyxTQUFTO1lBQ3JCLE1BQU0sSUFBSSxLQUFLLENBQUMsNkJBQTZCLENBQUMsQ0FBQztRQUNqRCxJQUFJLEtBQUssSUFBSSxPQUFPLEtBQUssS0FBSyxRQUFRLEVBQUUsQ0FBQztZQUN2QyxJQUFJLE9BQU8sS0FBSyxDQUFDLElBQUksS0FBSyxRQUFRLEVBQUUsQ0FBQztnQkFDbkMsTUFBTSxJQUFJLEdBQUcsU0FBUyxDQUFDLEdBQUcsQ0FBQyxLQUFLLENBQUMsSUFBSSxDQUFDLENBQUM7Z0JBQ3ZDLElBQUksSUFBSTtvQkFDTixPQUFPLElBQUksQ0FBQyxLQUFLLENBQUMsQ0FBQztnQkFDckIsTUFBTSxJQUFJLEtBQUssQ0FBQyx1QkFBdUIsSUFBSSxDQUFDLFNBQVMsQ0FBQyxLQUFLLENBQUMsRUFBRSxDQUFDLENBQUM7WUFDbEUsQ0FBQztpQkFDSSxJQUFJLEtBQUssQ0FBQyxPQUFPLENBQUMsS0FBSyxDQUFDLEVBQUUsQ0FBQztnQkFDOUIsT0FBTyxLQUFLLENBQUMsR0FBRyxDQUFDLENBQUMsQ0FBQyxFQUFFLENBQUMsUUFBUSxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUM7WUFDckMsQ0FBQztRQUNILENBQUM7UUFDRCxPQUFPLEtBQUssQ0FBQztJQUNmLENBQUM7SUFmZSxxQkFBUSxXQWV2QjtJQUVELFNBQWdCLE1BQU0sQ0FBQyxLQUFVO1FBQy9CLElBQUksS0FBSyxJQUFJLE9BQU8sS0FBSyxLQUFLLFFBQVEsRUFBRSxDQUFDO1lBQ3ZDLElBQUksT0FBTyxLQUFLLENBQUMsTUFBTSxLQUFLLFVBQVU7Z0JBQ3BDLE9BQU8sS0FBSyxDQUFDLE1BQU0sRUFBRSxDQUFDO2lCQUNuQixJQUFJLEtBQUssQ0FBQyxPQUFPLENBQUMsS0FBSyxDQUFDO2dCQUMzQixPQUFPLEtBQUssQ0FBQyxHQUFHLENBQUMsQ0FBQyxDQUFDLEVBQUUsQ0FBQyxNQUFNLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQztRQUNyQyxDQUFDO1FBQ0QsT0FBTyxLQUFLLENBQUM7SUFDZixDQUFDO0lBUmUsbUJBQU0sU0FRckI7QUFFRCxDQUFDLEVBbkNnQixZQUFZLEtBQVosWUFBWSxRQW1DNUIsQ0FBQyx5QkFBeUI7Ozs7Ozs7Ozs7Ozs7Ozs7QUNyRDNCOzs7Ozs7O0dBT0c7QUFFZ0Q7QUFHNUMsTUFBTSxVQUFVO0lBQ2IsU0FBUyxDQUFlO0lBQ3hCLFFBQVEsQ0FBZTtJQUV2QixXQUFXLENBQVU7SUFFckIsU0FBUyxDQUFTO0lBQ2xCLFlBQVksQ0FBVztJQUN2QixhQUFhLENBQVM7SUFDdEIsZ0JBQWdCLENBQTJCO0lBRW5ELFlBQW9CLFFBQXNCLEVBQUUsT0FBcUIsRUFBRSxVQUFtQixFQUFFLFFBQWdCLEVBQUUsWUFBb0IsRUFBRSxlQUF5QztRQUN2SyxJQUFJLENBQUMsU0FBUyxHQUFHLFFBQVEsQ0FBQztRQUMxQixJQUFJLENBQUMsUUFBUSxHQUFHLE9BQU8sQ0FBQztRQUV4QixJQUFJLENBQUMsV0FBVyxHQUFHLFVBQVUsQ0FBQztRQUU5QixJQUFJLENBQUMsU0FBUyxHQUFHLFFBQVEsQ0FBQztRQUMxQixJQUFJLENBQUMsWUFBWSxHQUFHLEVBQUUsQ0FBQztRQUN2QixJQUFJLENBQUMsYUFBYSxHQUFHLFlBQVksQ0FBQztRQUNsQyxJQUFJLENBQUMsZ0JBQWdCLEdBQUcsQ0FBRSxHQUFHLGVBQWUsQ0FBRSxDQUFDO0lBQ2pELENBQUM7SUFFTSxNQUFNLENBQUMsTUFBTSxDQUFDLFFBQXNCLEVBQUUsT0FBcUIsRUFBRSxVQUFtQixFQUFFLFFBQWdCLEVBQUUsWUFBb0IsRUFBRSxlQUF5QztRQUN4SyxPQUFPLElBQUksVUFBVSxDQUFDLFFBQVEsRUFBRSxPQUFPLEVBQUUsVUFBVSxFQUFFLFFBQVEsRUFBRSxZQUFZLEVBQUUsZUFBZSxDQUFDLENBQUM7SUFDaEcsQ0FBQztJQUVELElBQVcsUUFBUTtRQUNqQixPQUFPLElBQUksQ0FBQyxTQUFTLENBQUM7SUFDeEIsQ0FBQztJQUVELElBQVcsZ0JBQWdCO1FBQ3pCLE9BQU8sSUFBSSxDQUFDLFdBQVcsQ0FBQztJQUMxQixDQUFDO0lBRUQsSUFBVyxPQUFPO1FBQ2hCLE9BQU8sSUFBSSxDQUFDLFlBQVksQ0FBQztJQUMzQixDQUFDO0lBRU0sYUFBYSxDQUFDLFVBQWtCO1FBQ3JDLElBQUksQ0FBQyxZQUFZLENBQUMsSUFBSSxDQUFDLFVBQVUsQ0FBQyxDQUFDO0lBQ3JDLENBQUM7SUFFTSxnQkFBZ0IsQ0FBQyxNQUFtQztRQUN6RCxJQUFJLENBQUMsZ0JBQWdCLENBQUMsSUFBSSxDQUFDLE1BQU0sQ0FBQyxDQUFDO0lBQ3JDLENBQUM7SUFFRCxJQUFXLFlBQVk7UUFDckIsT0FBTyxJQUFJLENBQUMsYUFBYSxDQUFDO0lBQzVCLENBQUM7SUFFRCxJQUFXLGFBQWE7UUFDdEIsT0FBTyxJQUFJLENBQUMsZ0JBQWdCLENBQUM7SUFDL0IsQ0FBQztJQUVELElBQVcsSUFBSTtRQUNiLE9BQU8sSUFBSSxDQUFDLFNBQVMsQ0FBQztJQUN4QixDQUFDO0lBRUQsSUFBVyxRQUFRO1FBQ2pCLE9BQU8sSUFBSSxDQUFDLFNBQVMsQ0FBQyxPQUFPLEVBQUUsQ0FBQztJQUNsQyxDQUFDO0lBRUQsSUFBVyxTQUFTO1FBQ2xCLE9BQU8sSUFBSSxDQUFDLFNBQVMsQ0FBQyxRQUFRLEVBQUUsQ0FBQztJQUNuQyxDQUFDO0lBRU0sTUFBTSxDQUFDLFFBQVEsQ0FBQyxJQUFTO1FBQzlCLE1BQU0sUUFBUSxHQUFHLDREQUFZLENBQUMsTUFBTSxDQUFDLElBQUksQ0FBQyxRQUFRLENBQUMsQ0FBQztRQUNwRCxNQUFNLE9BQU8sR0FBRyw0REFBWSxDQUFDLE1BQU0sQ0FBQyxJQUFJLENBQUMsT0FBTyxDQUFDLENBQUM7UUFDbEQsTUFBTSxVQUFVLEdBQUcsSUFBSSxDQUFDLFVBQVUsSUFBSSxLQUFLLENBQUM7UUFDNUMsTUFBTSxRQUFRLEdBQUcsSUFBSSxDQUFDLFFBQVEsSUFBSSxFQUFFLENBQUM7UUFDckMsTUFBTSxZQUFZLEdBQUcsSUFBSSxDQUFDLFlBQVksSUFBSSxFQUFFLENBQUM7UUFDN0MsTUFBTSxlQUFlLEdBQUcsSUFBSSxDQUFDLGVBQWUsSUFBSSxFQUFFLENBQUM7UUFDbkQsTUFBTSxNQUFNLEdBQUcsSUFBSSxVQUFVLENBQUMsUUFBUSxFQUFFLE9BQU8sRUFBRSxVQUFVLEVBQUUsUUFBUSxFQUFFLFlBQVksRUFBRSxlQUFlLENBQUMsQ0FBQztRQUN0RyxJQUFJLElBQUksQ0FBQyxXQUFXO1lBQ2xCLE1BQU0sQ0FBQyxZQUFZLEdBQUcsS0FBSyxDQUFDLElBQUksQ0FBQyxJQUFJLENBQUMsV0FBVyxDQUFDLENBQUM7UUFDckQsT0FBTyxNQUFNLENBQUM7SUFDaEIsQ0FBQztJQUVNLE1BQU07UUFDWCxNQUFNLElBQUksR0FBaUI7WUFDekIsSUFBSSxFQUFFLFVBQVUsQ0FBQyxJQUFJO1lBQ3JCLFFBQVEsRUFBRSxJQUFJLENBQUMsU0FBUyxDQUFDLFdBQVcsRUFBRTtZQUN0QyxPQUFPLEVBQUUsSUFBSSxDQUFDLFFBQVEsQ0FBQyxXQUFXLEVBQUU7U0FDckMsQ0FBQztRQUNGLElBQUksSUFBSSxDQUFDLFdBQVc7WUFDbEIsSUFBSSxDQUFDLFVBQVUsR0FBRyxJQUFJLENBQUM7YUFDcEIsQ0FBQztZQUNKLElBQUksSUFBSSxDQUFDLFNBQVM7Z0JBQ2hCLElBQUksQ0FBQyxRQUFRLEdBQUcsSUFBSSxDQUFDLFNBQVMsQ0FBQztZQUNqQyxJQUFJLElBQUksQ0FBQyxhQUFhO2dCQUNwQixJQUFJLENBQUMsWUFBWSxHQUFHLElBQUksQ0FBQyxhQUFhLENBQUM7WUFDekMsSUFBSSxJQUFJLENBQUMsWUFBWSxDQUFDLE1BQU07Z0JBQzFCLElBQUksQ0FBQyxXQUFXLEdBQUcsQ0FBRSxHQUFHLElBQUksQ0FBQyxZQUFZLENBQUUsQ0FBQztZQUM5QyxJQUFJLElBQUksQ0FBQyxnQkFBZ0IsQ0FBQyxNQUFNO2dCQUM5QixJQUFJLENBQUMsZUFBZSxHQUFHLENBQUUsR0FBRyxJQUFJLENBQUMsZ0JBQWdCLENBQUUsQ0FBQztRQUN4RCxDQUFDO1FBQ0QsT0FBTyxJQUFJLENBQUM7SUFDZCxDQUFDO0NBQ0Y7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7QUNoSEQ7Ozs7Ozs7R0FPRztBQUU0QztBQUVPO0FBRXBCO0FBRWxDLE1BQU0sTUFBTSxHQUFHLDJDQUFNLENBQUMsTUFBTSxDQUFDLHFGQUFlLENBQUMsQ0FBQztBQU03QyxDQUFDO0FBRUssTUFBTSxhQUFjLFNBQVEsK0RBQWE7SUFDdEMsUUFBUSxDQUFTO0lBQ2pCLEtBQUssQ0FBVztJQUNoQixJQUFJLENBQVM7SUFFckIsWUFBbUIsT0FBZSxFQUFFLElBQWMsRUFBRSxHQUFXO1FBQzdELEtBQUssRUFBRSxDQUFDO1FBRVIsSUFBSSxDQUFDLFFBQVEsR0FBRyxPQUFPLENBQUM7UUFDeEIsSUFBSSxDQUFDLEtBQUssR0FBRyxJQUFJLENBQUM7UUFDbEIsSUFBSSxDQUFDLElBQUksR0FBRyxHQUFHLENBQUM7SUFDbEIsQ0FBQztJQUVNLE9BQU87UUFDWixNQUFNLENBQUMsS0FBSyxDQUFDLFdBQVcsQ0FBQyxDQUFDO1FBQzFCLE1BQU0sQ0FBQyxLQUFLLENBQUMsV0FBVyxFQUFFLElBQUksQ0FBQyxRQUFRLENBQUMsQ0FBQztRQUN6QyxNQUFNLENBQUMsS0FBSyxDQUFDLE9BQU8sRUFBRSxJQUFJLENBQUMsSUFBSSxDQUFDLENBQUM7UUFDakMsS0FBSyxJQUFJLENBQUMsR0FBRyxDQUFDLEVBQUUsQ0FBQyxHQUFHLElBQUksQ0FBQyxLQUFLLENBQUMsTUFBTSxFQUFFLENBQUMsRUFBRTtZQUN4QyxNQUFNLENBQUMsS0FBSyxDQUFDLFVBQVUsQ0FBQyxHQUFHLEVBQUUsSUFBSSxDQUFDLEtBQUssQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDO1FBRTlDLE1BQU0sTUFBTSxHQUFHLDZEQUFTLENBQUMsSUFBSSxDQUFDLFFBQVEsRUFBRSxJQUFJLENBQUMsS0FBSyxFQUFFLEVBQUUsR0FBRyxFQUFFLElBQUksQ0FBQyxJQUFJLEVBQUUsUUFBUSxFQUFFLE9BQU8sRUFBRSxDQUFDLENBQUM7UUFDM0YsSUFBSSxNQUFNLENBQUMsS0FBSyxJQUFJLE1BQU0sQ0FBQyxNQUFNLEVBQUUsQ0FBQztZQUNsQyxNQUFNLENBQUMsTUFBTSxDQUFDLEtBQUssR0FBRyxJQUFJLENBQUMsSUFBSSxDQUFDLENBQUM7WUFDakMsSUFBSSxHQUFHLEdBQUcsSUFBSSxDQUFDLEtBQUssQ0FBQyxJQUFJLENBQUMsR0FBRyxDQUFDLENBQUM7WUFDL0IsR0FBRyxHQUFHLElBQUksQ0FBQyxRQUFRLEdBQUcsQ0FBQyxHQUFHLENBQUMsQ0FBQyxDQUFDLEdBQUcsQ0FBQyxDQUFDLENBQUMsRUFBRSxDQUFDLEdBQUcsR0FBRyxDQUFDO1lBQzdDLE1BQU0sQ0FBQyxNQUFNLENBQUMsR0FBRyxDQUFDLENBQUM7WUFDbkIsTUFBTSxDQUFDLE1BQU0sQ0FBQyxFQUFFLENBQUMsQ0FBQztZQUVsQixNQUFNLENBQUMsS0FBSyxDQUFDLE1BQU0sQ0FBQyxNQUFNLENBQUMsQ0FBQztZQUU1QixJQUFJLE1BQU0sQ0FBQyxLQUFLO2dCQUNaLE1BQU0sTUFBTSxDQUFDLEtBQUssQ0FBQztZQUV2QixNQUFNLElBQUksS0FBSyxDQUFDLE1BQU0sQ0FBQyxLQUFZLElBQUksU0FBUyxHQUFHLE1BQU0sQ0FBQyxNQUFNLENBQUMsQ0FBQztRQUNwRSxDQUFDO1FBQ0QsSUFBSSxNQUFNLENBQUMsTUFBTSxFQUFFLENBQUM7WUFDbEIsS0FBSyxNQUFNLElBQUksSUFBSSxNQUFNLENBQUMsTUFBTSxDQUFDLElBQUksRUFBRSxDQUFDLEtBQUssQ0FBQyxJQUFJLENBQUMsRUFBRSxDQUFDO2dCQUNwRCxNQUFNLENBQUMsTUFBTSxDQUFDLElBQUksQ0FBQyxDQUFDO1lBQ3RCLENBQUM7UUFDSCxDQUFDO0lBQ0gsQ0FBQztJQUVNLE1BQU0sQ0FBQyxRQUFRLENBQUMsQ0FBZTtRQUNwQyxNQUFNLE9BQU8sR0FBMkIsQ0FBUSxDQUFDO1FBQ2pELE9BQU8sSUFBSSxhQUFhLENBQUMsT0FBTyxDQUFDLE9BQU8sRUFBRSxPQUFPLENBQUMsSUFBSSxFQUFFLE9BQU8sQ0FBQyxHQUFHLENBQUMsQ0FBQztJQUN2RSxDQUFDO0lBRU0sTUFBTTtRQUNYLE9BQU87WUFDTCxJQUFJLEVBQUUsYUFBYSxDQUFDLElBQUk7WUFDeEIsT0FBTyxFQUFFLElBQUksQ0FBQyxRQUFRO1lBQ3RCLElBQUksRUFBRSxJQUFJLENBQUMsS0FBSztZQUNoQixHQUFHLEVBQUUsSUFBSSxDQUFDLElBQUk7U0FDZjtJQUNILENBQUM7Q0FDRjtBQUFBLENBQUM7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7QUM5RUY7Ozs7Ozs7R0FPRztBQUVzQjtBQUMyQztBQUNoQztBQUVwQyxpRUFBZTtJQUNiLFdBQVcsRUFBRTtRQUNYLFdBQVcsRUFBRSxrRkFBa0Y7UUFDL0YsS0FBSyxFQUFFLE9BQU87S0FDZjtJQUNELGdCQUFnQixFQUFFO1FBQ2hCLFdBQVcsRUFBRSxxQ0FBcUM7UUFDbEQsS0FBSyxFQUFFLFFBQVE7S0FDaEI7SUFDRCxZQUFZLEVBQUU7UUFDWixXQUFXLEVBQUUsNkJBQTZCO1FBQzFDLEtBQUssRUFBRSxFQUFFO0tBQ1Y7SUFDRCxlQUFlLEVBQUU7UUFDZixXQUFXLEVBQUUsZ0NBQWdDO1FBQzdDLEtBQUssRUFBRSxFQUFFO0tBQ1Y7SUFDRCxtQkFBbUIsRUFBRTtRQUNuQixXQUFXLEVBQUUsb0NBQW9DO1FBQ2pELEtBQUssRUFBRSxFQUFFO0tBQ1Y7SUFDRCxvQkFBb0IsRUFBRTtRQUNwQixXQUFXLEVBQUUscUNBQXFDO1FBQ2xELEtBQUssRUFBRSxFQUFFO0tBQ1Y7SUFDRCxrQkFBa0IsRUFBRTtRQUNsQixXQUFXLEVBQUUsZ0VBQWdFO1FBQzdFLElBQUksRUFBRSxTQUFTO0tBQ2hCO0lBQ0Qsa0JBQWtCLEVBQUU7UUFDbEIsV0FBVyxFQUFFLHdFQUF3RTtRQUNyRixJQUFJLEVBQUUsU0FBUztLQUNoQjtJQUNELGFBQWEsRUFBRTtRQUNiLFdBQVcsRUFBRSx1Q0FBdUM7UUFDcEQsSUFBSSxFQUFFLFFBQVE7S0FDZjtJQUNELFdBQVcsRUFBRTtRQUNYLFdBQVcsRUFBRSwwREFBMEQ7UUFDdkUsSUFBSSxFQUFFLFVBQVU7S0FDakI7SUFDRCxVQUFVLEVBQUU7UUFDVixXQUFXLEVBQUUsMERBQTBEO1FBQ3ZFLElBQUksRUFBRSxTQUFTO0tBQ2hCO0lBQ0QsWUFBWSxFQUFFO1FBQ1osV0FBVyxFQUFFLG1FQUFtRTtRQUNoRixJQUFJLEVBQUUsVUFBVTtLQUNqQjtJQUNELFVBQVUsRUFBRTtRQUNWLFdBQVcsRUFBRSx3REFBd0Q7UUFDckUsSUFBSSxFQUFFLFVBQVU7S0FDakI7SUFDRCxjQUFjLEVBQUU7UUFDZCxXQUFXLEVBQUUsbUVBQW1FO1FBQ2hGLElBQUksRUFBRSxRQUFRO0tBQ2Y7SUFDRCxVQUFVLEVBQUU7UUFDVixXQUFXLEVBQUUsa0hBQWtIO1FBQy9ILElBQUksRUFBRSxDQUFFLHlEQUFnQixFQUFFLDJEQUFrQixDQUFFO1FBQzlDLEtBQUssRUFBRSwyREFBa0I7S0FDMUI7SUFDRCxjQUFjLEVBQUU7UUFDZCxXQUFXLEVBQUUsNkRBQTZEO1FBQzFFLElBQUksRUFBRSxTQUFTO1FBQ2YsS0FBSyxFQUFFLE1BQU07S0FDZDtJQUNELE9BQU8sRUFBRTtRQUNQLFdBQVcsRUFBRSw2QkFBNkI7UUFDMUMsSUFBSSxFQUFFLFNBQVM7S0FDaEI7SUFDRCxVQUFVLEVBQUU7UUFDVixXQUFXLEVBQUUsd0RBQXdEO1FBQ3JFLElBQUksRUFBRSxTQUFTO0tBQ2hCO0lBQ0QsVUFBVSxFQUFFO1FBQ1YsV0FBVyxFQUFFLHdEQUF3RDtRQUNyRSxJQUFJLEVBQUUsU0FBUztLQUNoQjtJQUNELHlCQUF5QixFQUFFO1FBQ3pCLFdBQVcsRUFBRSx1RUFBdUU7UUFDcEYsS0FBSyxFQUFFLEtBQUs7S0FDYjtJQUNELHFCQUFxQixFQUFFO1FBQ3JCLFdBQVcsRUFBRSwrQkFBK0I7UUFDNUMsS0FBSyxFQUFFLEtBQUs7S0FDYjtJQUNELGdCQUFnQixFQUFFO1FBQ2hCLFdBQVcsRUFBRSx5Q0FBeUM7UUFDdEQsS0FBSyxFQUFFLG1EQUFPLEVBQUU7S0FDakI7SUFDRCxRQUFRLEVBQUU7UUFDUixXQUFXLEVBQUUsaUNBQWlDO1FBQzlDLEtBQUssRUFBRSxFQUFFO0tBQ1Y7SUFDRCxZQUFZLEVBQUU7UUFDWixXQUFXLEVBQUUseUNBQXlDO1FBQ3RELEtBQUssRUFBRSxFQUFFO0tBQ1Y7SUFDRCxTQUFTLEVBQUU7UUFDVCxXQUFXLEVBQUUsd0NBQXdDO1FBQ3JELEtBQUssRUFBRSxFQUFFO0tBQ1Y7SUFDRCxlQUFlLEVBQUU7UUFDZixXQUFXLEVBQUUsNkRBQTZEO1FBQzFFLEtBQUssRUFBRSxDQUFFLElBQUksQ0FBRTtLQUNoQjtJQUNELGlCQUFpQixFQUFFO1FBQ2pCLFdBQVcsRUFBRSwrREFBK0Q7UUFDNUUsS0FBSyxFQUFFLENBQUUsS0FBSyxFQUFFLFVBQVUsQ0FBRTtLQUM3QjtJQUNELFVBQVUsRUFBRTtRQUNWLFdBQVcsRUFBRSxpQ0FBaUM7UUFDOUMsS0FBSyxFQUFFLEVBQUU7S0FDVjtJQUNELE9BQU8sRUFBRTtRQUNQLFdBQVcsRUFBRSxnQ0FBZ0M7UUFDN0MsS0FBSyxFQUFFLEVBQUU7S0FDVjtJQUNELGFBQWEsRUFBRTtRQUNiLFdBQVcsRUFBRSw4REFBOEQ7UUFDM0UsS0FBSyxFQUFFLENBQUUsSUFBSSxDQUFFO0tBQ2hCO0lBQ0QsZUFBZSxFQUFFO1FBQ2YsV0FBVyxFQUFFLGdFQUFnRTtRQUM3RSxLQUFLLEVBQUUsQ0FBRSxLQUFLLEVBQUUsVUFBVSxDQUFFO0tBQzdCO0lBQ0QsWUFBWSxFQUFFO1FBQ1osV0FBVyxFQUFFLG1DQUFtQztRQUNoRCxLQUFLLEVBQUUsRUFBRTtLQUNWO0lBQ0QsU0FBUyxFQUFFO1FBQ1QsV0FBVyxFQUFFLGdDQUFnQztRQUM3QyxLQUFLLEVBQUUsRUFBRTtLQUNWO0lBQ0QsZUFBZSxFQUFFO1FBQ2YsV0FBVyxFQUFFLGdFQUFnRTtRQUM3RSxLQUFLLEVBQUUsQ0FBRSxJQUFJLENBQUU7S0FDaEI7SUFDRCxpQkFBaUIsRUFBRTtRQUNqQixXQUFXLEVBQUUsa0VBQWtFO1FBQy9FLEtBQUssRUFBRSxDQUFFLEtBQUssRUFBRSxVQUFVLENBQUU7S0FDN0I7SUFDRCxFQUFFLEVBQUU7UUFDRixXQUFXLEVBQUUsMkRBQTJEO1FBQ3hFLEtBQUssRUFBRSxFQUFFO0tBQ1Y7SUFDRCxNQUFNLEVBQUU7UUFDTixXQUFXLEVBQUUsK0VBQStFO1FBQzVGLEtBQUssRUFBRSxFQUFFO0tBQ1Y7SUFDRCxNQUFNLEVBQUU7UUFDTixXQUFXLEVBQUUsNkVBQTZFO1FBQzFGLEtBQUssRUFBRSxFQUFFO0tBQ1Y7SUFDRCxFQUFFLEVBQUU7UUFDRixXQUFXLEVBQUUscUVBQXFFO1FBQ2xGLEtBQUssRUFBRSxFQUFFO0tBQ1Y7SUFDRCxPQUFPLEVBQUU7UUFDUCxXQUFXLEVBQUUsMERBQTBEO1FBQ3ZFLEtBQUssRUFBRSxFQUFFO0tBQ1Y7SUFDRCxPQUFPLEVBQUU7UUFDUCxXQUFXLEVBQUUsc0ZBQXNGO1FBQ25HLEtBQUssRUFBRSxFQUFFO0tBQ1Y7SUFDRCxLQUFLLEVBQUU7UUFDTCxXQUFXLEVBQUUseUZBQXlGO1FBQ3RHLEtBQUssRUFBRSxFQUFFO0tBQ1Y7SUFDRCxxQkFBcUIsRUFBRTtRQUNyQixXQUFXLEVBQUUsa0NBQWtDO1FBQy9DLEtBQUssRUFBRSxFQUFFO0tBQ1Y7SUFDRCxxQkFBcUIsRUFBRTtRQUNyQixXQUFXLEVBQUUsc0NBQXNDO1FBQ25ELEtBQUssRUFBRSxJQUFJO0tBQ1o7SUFDRCxtQkFBbUIsRUFBRTtRQUNuQixXQUFXLEVBQUUsMkRBQTJEO1FBQ3hFLEtBQUssRUFBRSxFQUFFO0tBQ1Y7SUFDRCxxQkFBcUIsRUFBRTtRQUNyQixXQUFXLEVBQUUsc0NBQXNDO1FBQ25ELEtBQUssRUFBRSxLQUFLO0tBQ2I7SUFDRCxxQkFBcUIsRUFBRTtRQUNyQixXQUFXLEVBQUUsc0NBQXNDO1FBQ25ELEtBQUssRUFBRSxJQUFJO0tBQ1o7SUFDRCxtQkFBbUIsRUFBRTtRQUNuQixXQUFXLEVBQUUsMkRBQTJEO1FBQ3hFLEtBQUssRUFBRSxFQUFFO0tBQ1Y7SUFDRCxxQkFBcUIsRUFBRTtRQUNyQixXQUFXLEVBQUUsc0NBQXNDO1FBQ25ELEtBQUssRUFBRSxLQUFLO0tBQ2I7SUFDRCxxQkFBcUIsRUFBRTtRQUNyQixXQUFXLEVBQUUsc0NBQXNDO1FBQ25ELEtBQUssRUFBRSxLQUFLO0tBQ2I7SUFDRCxtQkFBbUIsRUFBRTtRQUNuQixXQUFXLEVBQUUsMkRBQTJEO1FBQ3hFLEtBQUssRUFBRSxFQUFFO0tBQ1Y7SUFDRCxpQkFBaUIsRUFBRTtRQUNqQixXQUFXLEVBQUUsa0NBQWtDO1FBQy9DLEtBQUssRUFBRSw2Q0FBSSxDQUFDLGdCQUFnQjtLQUM3QjtJQUNELGdCQUFnQixFQUFFO1FBQ2hCLFdBQVcsRUFBRSxzREFBc0Q7UUFDbkUsS0FBSyxFQUFFLEVBQUU7S0FDVjtJQUNELG1CQUFtQixFQUFFO1FBQ25CLFdBQVcsRUFBRSx5Q0FBeUM7UUFDdEQsSUFBSSxFQUFFLFVBQVU7S0FDakI7SUFDRCxpQkFBaUIsRUFBRTtRQUNqQixXQUFXLEVBQUUsdUNBQXVDO1FBQ3BELElBQUksRUFBRSxVQUFVO0tBQ2pCO0lBQ0QsYUFBYSxFQUFFO1FBQ2IsV0FBVyxFQUFFLDBFQUEwRTtRQUN2RixJQUFJLEVBQUUsQ0FBRSxDQUFDLEVBQUUsQ0FBQyxDQUFFO1FBQ2QsS0FBSyxFQUFFLDZDQUFJLENBQUMsV0FBVztLQUN4QjtJQUNELGdCQUFnQixFQUFFO1FBQ2hCLFdBQVcsRUFBRSwwQkFBMEI7UUFDdkMsS0FBSyxFQUFFLEVBQUU7S0FDVjtJQUNELHNCQUFzQixFQUFFO1FBQ3RCLFdBQVcsRUFBRSwrREFBK0Q7UUFDNUUsS0FBSyxFQUFFLDZDQUFJLENBQUMsZ0JBQWdCO1FBQzVCLFdBQVc7S0FDWjtDQUNGLEVBQUM7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7O0FDMVBGOzs7Ozs7O0dBT0c7QUFFNEM7QUFDQTtBQUNBO0FBQ1E7QUFDRjtBQUNPO0FBQ2Q7QUFDWjtBQUVsQyxNQUFNLE1BQU0sR0FBRywyQ0FBTSxDQUFDLE1BQU0sQ0FBQyw4RUFBZSxDQUFDLENBQUM7QUFLN0MsQ0FBQztBQUtELENBQUM7QUFFRixNQUFNLGNBQWM7SUFDVixLQUFLLEdBQUcsSUFBSSxLQUF1QixDQUFDO0lBRXJDLEdBQUcsQ0FBQyxLQUFRLEVBQUUsUUFBa0I7UUFDckMsSUFBSSxDQUFDLEtBQUssQ0FBQyxJQUFJLENBQUMsRUFBQyxLQUFLLEVBQUUsUUFBUSxFQUFDLENBQUMsQ0FBQztJQUNyQyxDQUFDO0lBRU0sTUFBTSxDQUFDLEtBQXdCO1FBQ3BDLE1BQU0sTUFBTSxHQUFHLElBQUksY0FBaUIsQ0FBQztRQUNyQyxLQUFLLE1BQU0sSUFBSSxJQUFJLElBQUksQ0FBQyxLQUFLO1lBQzNCLE1BQU0sQ0FBQyxLQUFLLENBQUMsSUFBSSxDQUFDLElBQUksQ0FBQyxDQUFDO1FBQzFCLEtBQUssTUFBTSxJQUFJLElBQUksS0FBSyxDQUFDLEtBQUs7WUFDNUIsTUFBTSxDQUFDLEtBQUssQ0FBQyxJQUFJLENBQUMsSUFBSSxDQUFDLENBQUM7UUFDMUIsT0FBTyxNQUFNLENBQUM7SUFDaEIsQ0FBQztJQUVNLFlBQVk7UUFDakIsT0FBTyxJQUFJLENBQUMsS0FBSyxDQUFDLEdBQUcsQ0FBQyxDQUFDLENBQUMsRUFBRSxDQUFDLENBQUMsQ0FBQyxLQUFLLENBQUMsQ0FBQztJQUN0QyxDQUFDO0lBRU0sZUFBZTtRQUNwQixPQUFPLElBQUksQ0FBQyxLQUFLLENBQUMsTUFBTSxDQUFDLENBQUMsQ0FBQyxFQUFFLENBQUMsQ0FBQyxDQUFDLFFBQVEsQ0FBQyxDQUFDLEdBQUcsQ0FBQyxDQUFDLENBQUMsRUFBRSxDQUFDLENBQUMsQ0FBQyxLQUFLLENBQUMsQ0FBQztJQUM5RCxDQUFDO0lBRU0sTUFBTSxDQUFDLFFBQVEsQ0FBSSxJQUFXO1FBQ25DLE1BQU0sTUFBTSxHQUFHLElBQUksY0FBaUIsQ0FBQztRQUNyQyxLQUFLLE1BQU0sSUFBSSxJQUFJLElBQUksRUFBRSxDQUFDO1lBQ3hCLElBQUksUUFBUSxHQUFHLEtBQUssQ0FBQztZQUNyQixJQUFJLEtBQUssR0FBRyxJQUFJLENBQUMsT0FBTyxDQUFDO1lBQ3pCLElBQUksQ0FBQyxLQUFLLEVBQUUsQ0FBQztnQkFDWCxLQUFLLEdBQUcsSUFBSSxDQUFDLE1BQU0sQ0FBQztnQkFDcEIsUUFBUSxHQUFHLElBQUksQ0FBQztZQUNsQixDQUFDO1lBQ0QsS0FBSyxHQUFHLHVEQUFZLENBQUMsUUFBUSxDQUFDLEtBQUssQ0FBQyxDQUFDO1lBQ3JDLE1BQU0sQ0FBQyxLQUFLLENBQUMsSUFBSSxDQUFDLEVBQUMsS0FBSyxFQUFFLFFBQVEsRUFBQyxDQUFDLENBQUM7UUFDdkMsQ0FBQztRQUNELE9BQU8sTUFBTSxDQUFDO0lBQ2hCLENBQUM7SUFFTSxNQUFNO1FBQ1gsTUFBTSxNQUFNLEdBQVEsRUFBRSxDQUFDO1FBQ3ZCLEtBQUssTUFBTSxJQUFJLElBQUksSUFBSSxDQUFDLEtBQUssRUFBRSxDQUFDO1lBQzlCLE1BQU0sSUFBSSxHQUFHLElBQUksQ0FBQyxRQUFRLENBQUMsQ0FBQyxDQUFDLFFBQVEsQ0FBQyxDQUFDLENBQUMsU0FBUyxDQUFDO1lBQ2xELE1BQU0sS0FBSyxHQUFHLHVEQUFZLENBQUMsTUFBTSxDQUFDLElBQUksQ0FBQyxLQUFLLENBQUMsQ0FBQztZQUM5QyxNQUFNLENBQUMsSUFBSSxDQUFDLEVBQUUsQ0FBQyxJQUFJLENBQUMsRUFBRyxLQUFLLEVBQUUsQ0FBQyxDQUFDO1FBQ2xDLENBQUM7UUFDRCxPQUFPLE1BQU0sQ0FBQztJQUNoQixDQUFDO0NBQ0Y7QUFBQSxDQUFDO0FBRUssTUFBZSxVQUFVO0lBQ3BCLEtBQUssQ0FBUztJQUNkLFNBQVMsR0FBRyxJQUFJLGNBQXdDLENBQUM7SUFDekQsWUFBWSxHQUFHLElBQUksY0FBc0IsQ0FBQztJQUMxQyxlQUFlLEdBQUcsSUFBSSxjQUFpQyxDQUFDO0lBQ3hELFlBQVksR0FBRyxJQUFJLGNBQWlDLENBQUM7SUFDckQsVUFBVSxHQUFHLElBQUksY0FBMEIsQ0FBQztJQUM1QyxRQUFRLEdBQUcsSUFBSSxLQUFpQyxDQUFDO0lBQ2pELGFBQWEsR0FBRyxJQUFJLEtBQW9CLENBQUM7SUFDekMsY0FBYyxHQUFHLElBQUksS0FBb0IsQ0FBQztJQUMxQyxTQUFTLEdBQUcsRUFBRSxDQUFDO0lBQ2YsYUFBYSxHQUFHLEVBQUUsQ0FBQztJQUNuQixjQUFjLEdBQUcsSUFBSSxLQUFhLENBQUM7SUFFN0MsWUFBc0IsSUFBWTtRQUNoQyxJQUFJLENBQUMsS0FBSyxHQUFHLElBQUksQ0FBQztJQUNwQixDQUFDO0lBT0QsSUFBVyxVQUFVO1FBQ25CLE9BQU8sSUFBSSxDQUFDLEtBQUssQ0FBQztJQUNwQixDQUFDO0lBRUQsSUFBVyxJQUFJO1FBQ2IsT0FBTyxJQUFJLENBQUMsS0FBSyxDQUFDO0lBQ3BCLENBQUM7SUFFRCxJQUFXLFFBQVE7UUFDakIsT0FBTyxnRUFBYyxDQUFDLE1BQU0sQ0FBQyxJQUFJLENBQUMsS0FBSyxDQUFDLENBQUM7SUFDM0MsQ0FBQztJQUVELElBQVcsT0FBTztRQUNoQixPQUFPLDhEQUFhLENBQUMsTUFBTSxDQUFDLElBQUksQ0FBQyxLQUFLLENBQUMsQ0FBQztJQUMxQyxDQUFDO0lBRUQsSUFBVyxVQUFVO1FBQ25CLE9BQU8sd0RBQVUsQ0FBQyxNQUFNLENBQUMsSUFBSSxDQUFDLEtBQUssQ0FBQyxDQUFDO0lBQ3ZDLENBQUM7SUFFTSxXQUFXO1FBQ2hCLE9BQU8sSUFBSSxDQUFDLFNBQVMsQ0FBQyxZQUFZLEVBQUUsQ0FBQztJQUN2QyxDQUFDO0lBRU0saUJBQWlCO1FBQ3RCLE9BQU8sSUFBSSxDQUFDLFNBQVMsQ0FBQyxlQUFlLEVBQUUsQ0FBQztJQUMxQyxDQUFDO0lBRU0sVUFBVSxDQUFDLFVBQW1CLEVBQUUsS0FBK0I7UUFDcEUsSUFBSSxDQUFDLFNBQVMsQ0FBQyxHQUFHLENBQUMsS0FBSyxFQUFFLFVBQVUsQ0FBQyxDQUFDO0lBQ3hDLENBQUM7SUFFTSxjQUFjO1FBQ25CLE9BQU8sSUFBSSxDQUFDLFlBQVksQ0FBQyxZQUFZLEVBQUUsQ0FBQztJQUMxQyxDQUFDO0lBRU0sb0JBQW9CO1FBQ3pCLE9BQU8sSUFBSSxDQUFDLFlBQVksQ0FBQyxlQUFlLEVBQUUsQ0FBQztJQUM3QyxDQUFDO0lBRU0sYUFBYSxDQUFDLFVBQW1CLEVBQUUsS0FBYTtRQUNyRCxJQUFJLENBQUMsWUFBWSxDQUFDLEdBQUcsQ0FBQyxLQUFLLEVBQUUsVUFBVSxDQUFDLENBQUM7SUFDM0MsQ0FBQztJQUVNLGlCQUFpQjtRQUN0QixPQUFPLElBQUksQ0FBQyxlQUFlLENBQUMsWUFBWSxFQUFFLENBQUM7SUFDN0MsQ0FBQztJQUVNLHVCQUF1QjtRQUM1QixPQUFPLElBQUksQ0FBQyxlQUFlLENBQUMsZUFBZSxFQUFFLENBQUM7SUFDaEQsQ0FBQztJQUVNLGdCQUFnQixDQUFDLFVBQW1CLEVBQUUsTUFBeUI7UUFDcEUsSUFBSSxDQUFDLGVBQWUsQ0FBQyxHQUFHLENBQUMsTUFBTSxFQUFFLFVBQVUsQ0FBQyxDQUFDO0lBQy9DLENBQUM7SUFFTSxjQUFjO1FBQ25CLE9BQU8sSUFBSSxDQUFDLFlBQVksQ0FBQyxZQUFZLEVBQUUsQ0FBQztJQUMxQyxDQUFDO0lBRU0sb0JBQW9CO1FBQ3pCLE9BQU8sSUFBSSxDQUFDLFlBQVksQ0FBQyxlQUFlLEVBQUUsQ0FBQztJQUM3QyxDQUFDO0lBRU0sY0FBYyxDQUFDLEdBQUcsT0FBaUM7UUFDeEQsSUFBSSxDQUFDLGtCQUFrQixDQUFDLEtBQUssRUFBRSxHQUFHLE9BQU8sQ0FBQyxDQUFDO0lBQzdDLENBQUM7SUFFTSxvQkFBb0IsQ0FBQyxHQUFHLE9BQWlDO1FBQzlELElBQUksQ0FBQyxrQkFBa0IsQ0FBQyxJQUFJLEVBQUUsR0FBRyxPQUFPLENBQUMsQ0FBQztJQUM1QyxDQUFDO0lBRU0sa0JBQWtCLENBQUMsVUFBbUIsRUFBRSxHQUFHLE9BQWlDO1FBQ2pGLEtBQUssTUFBTSxLQUFLLElBQUksT0FBTyxDQUFDLElBQUksRUFBRTtZQUNoQyxJQUFJLENBQUMsWUFBWSxDQUFDLEdBQUcsQ0FBQyxLQUFLLEVBQUUsVUFBVSxDQUFDLENBQUM7SUFDN0MsQ0FBQztJQUVNLFlBQVk7UUFDakIsT0FBTyxJQUFJLENBQUMsVUFBVSxDQUFDLFlBQVksRUFBRTtJQUN2QyxDQUFDO0lBRU0sa0JBQWtCO1FBQ3ZCLE9BQU8sSUFBSSxDQUFDLFVBQVUsQ0FBQyxlQUFlLEVBQUUsQ0FBQztJQUMzQyxDQUFDO0lBRU0sWUFBWSxDQUFDLEdBQUcsU0FBdUI7UUFDNUMsSUFBSSxDQUFDLGdCQUFnQixDQUFDLEtBQUssRUFBRSxHQUFHLFNBQVMsQ0FBQyxDQUFDO0lBQzdDLENBQUM7SUFFTSxrQkFBa0IsQ0FBQyxHQUFHLFNBQXVCO1FBQ2xELElBQUksQ0FBQyxnQkFBZ0IsQ0FBQyxJQUFJLEVBQUUsR0FBRyxTQUFTLENBQUMsQ0FBQztJQUM1QyxDQUFDO0lBRU0sZ0JBQWdCLENBQUMsVUFBbUIsRUFBRSxHQUFHLFNBQXVCO1FBQ3JFLEtBQUssTUFBTSxJQUFJLElBQUksU0FBUyxDQUFDLElBQUksRUFBRTtZQUNqQyxJQUFJLENBQUMsVUFBVSxDQUFDLEdBQUcsQ0FBQyx3REFBVSxDQUFDLE1BQU0sQ0FBQyxJQUFJLENBQUMsVUFBVSxDQUFDLEVBQUUsVUFBVSxDQUFDLENBQUM7SUFDeEUsQ0FBQztJQUVNLFVBQVU7UUFDZixPQUFPLElBQUksQ0FBQyxjQUFjLEVBQUUsQ0FBQyxNQUFNLENBQUMsQ0FBQyxDQUFDLEVBQUUsQ0FBQyxDQUFDLENBQUMsZ0JBQWdCLENBQUMsQ0FBQztJQUMvRCxDQUFDO0lBRU0sYUFBYTtRQUNsQixPQUFPLElBQUksQ0FBQyxRQUFRLENBQUM7SUFDdkIsQ0FBQztJQUVNLGNBQWM7UUFDbkIsT0FBTyxJQUFJLENBQUMsUUFBUSxDQUFDLE1BQU0sQ0FBQyxDQUFDLENBQUMsRUFBRSxDQUFDLENBQUMsWUFBWSx3REFBVSxDQUFDLENBQUM7SUFDNUQsQ0FBQztJQUVNLGdCQUFnQjtRQUNyQixPQUFPLElBQUksQ0FBQyxRQUFRLENBQUMsTUFBTSxDQUFDLENBQUMsQ0FBQyxFQUFFLENBQUMsQ0FBQyxZQUFZLDhEQUFhLENBQUMsQ0FBQztJQUMvRCxDQUFDO0lBRU0sU0FBUyxDQUFDLE1BQWtDO1FBQ2pELElBQUksQ0FBQyxRQUFRLENBQUMsSUFBSSxDQUFDLE1BQU0sQ0FBQyxDQUFDO0lBQzdCLENBQUM7SUFFRCxJQUFXLFlBQVk7UUFDckIsT0FBTyxJQUFJLENBQUMsYUFBYSxDQUFDO0lBQzVCLENBQUM7SUFFTSxXQUFXLENBQUMsT0FBNEIsRUFBRSxJQUFnQztRQUMvRSxJQUFJLENBQUMsYUFBYSxDQUFDLElBQUksQ0FBQyxFQUFDLE9BQU8sRUFBRSxJQUFJLEVBQUMsQ0FBQyxDQUFDO0lBQzNDLENBQUM7SUFFRCxJQUFXLGFBQWE7UUFDdEIsT0FBTyxJQUFJLENBQUMsY0FBYyxDQUFDO0lBQzdCLENBQUM7SUFFTSxZQUFZLENBQUMsT0FBNEIsRUFBRSxJQUFnQztRQUNoRixJQUFJLENBQUMsY0FBYyxDQUFDLElBQUksQ0FBQyxFQUFDLE9BQU8sRUFBRSxJQUFJLEVBQUMsQ0FBQyxDQUFDO0lBQzVDLENBQUM7SUFFRCxJQUFXLFFBQVE7UUFDakIsT0FBTyxJQUFJLENBQUMsU0FBUyxDQUFDO0lBQ3hCLENBQUM7SUFFRCxJQUFXLFFBQVEsQ0FBQyxLQUFhO1FBQy9CLElBQUksQ0FBQyxTQUFTLEdBQUcsS0FBSyxDQUFDO0lBQ3pCLENBQUM7SUFFRCxJQUFXLFlBQVk7UUFDckIsT0FBTyxJQUFJLENBQUMsYUFBYSxDQUFDO0lBQzVCLENBQUM7SUFFRCxJQUFXLFlBQVksQ0FBQyxLQUFhO1FBQ25DLElBQUksQ0FBQyxhQUFhLEdBQUcsS0FBSyxDQUFDO0lBQzdCLENBQUM7SUFFRCxJQUFXLGFBQWE7UUFDdEIsT0FBTyxJQUFJLENBQUMsY0FBYyxDQUFDO0lBQzdCLENBQUM7SUFFRCxJQUFXLGFBQWEsQ0FBQyxLQUFlO1FBQ3RDLElBQUksQ0FBQyxjQUFjLEdBQUcsS0FBSyxDQUFDO0lBQzlCLENBQUM7SUFFTSxVQUFVLENBQUMsTUFBa0I7UUFDbEMsSUFBSSxDQUFDLFNBQVMsR0FBRyxJQUFJLENBQUMsU0FBUyxDQUFDLE1BQU0sQ0FBQyxNQUFNLENBQUMsU0FBUyxDQUFDLENBQUM7UUFDekQsSUFBSSxDQUFDLFlBQVksR0FBRyxJQUFJLENBQUMsWUFBWSxDQUFDLE1BQU0sQ0FBQyxNQUFNLENBQUMsWUFBWSxDQUFDLENBQUM7UUFDbEUsSUFBSSxDQUFDLGVBQWUsR0FBRyxJQUFJLENBQUMsZUFBZSxDQUFDLE1BQU0sQ0FBQyxNQUFNLENBQUMsZUFBZSxDQUFDLENBQUM7UUFDM0UsSUFBSSxDQUFDLFlBQVksR0FBRyxJQUFJLENBQUMsWUFBWSxDQUFDLE1BQU0sQ0FBQyxNQUFNLENBQUMsWUFBWSxDQUFDLENBQUM7UUFDbEUsSUFBSSxDQUFDLFVBQVUsR0FBRyxJQUFJLENBQUMsVUFBVSxDQUFDLE1BQU0sQ0FBQyxNQUFNLENBQUMsVUFBVSxDQUFDLENBQUM7UUFDNUQsSUFBSSxDQUFDLFFBQVEsQ0FBQyxJQUFJLENBQUMsR0FBRyxNQUFNLENBQUMsUUFBUSxDQUFDLENBQUM7UUFDdkMsSUFBSSxDQUFDLGFBQWEsQ0FBQyxJQUFJLENBQUMsR0FBRyxNQUFNLENBQUMsYUFBYSxDQUFDLENBQUM7UUFDakQsSUFBSSxDQUFDLGNBQWMsQ0FBQyxJQUFJLENBQUMsR0FBRyxNQUFNLENBQUMsY0FBYyxDQUFDLENBQUM7SUFDckQsQ0FBQztJQUVTLFdBQVcsQ0FBQyxJQUFTO1FBQzdCLElBQUksQ0FBQyxTQUFTLEdBQUcsY0FBYyxDQUFDLFFBQVEsQ0FBMkIsSUFBSSxDQUFDLFFBQVEsQ0FBQyxDQUFDO1FBQ2xGLElBQUksQ0FBQyxZQUFZLEdBQUcsY0FBYyxDQUFDLFFBQVEsQ0FBUyxJQUFJLENBQUMsV0FBVyxDQUFDLENBQUM7UUFDdEUsSUFBSSxDQUFDLGVBQWUsR0FBRyxjQUFjLENBQUMsUUFBUSxDQUFvQixJQUFJLENBQUMsY0FBYyxDQUFDLENBQUM7UUFDdkYsSUFBSSxDQUFDLFlBQVksR0FBRyxjQUFjLENBQUMsUUFBUSxDQUFvQixJQUFJLENBQUMsV0FBVyxDQUFDLENBQUM7UUFDakYsSUFBSSxDQUFDLFVBQVUsR0FBRyxjQUFjLENBQUMsUUFBUSxDQUFhLElBQUksQ0FBQyxTQUFTLENBQUMsQ0FBQztRQUN0RSxJQUFJLENBQUMsUUFBUSxHQUFHLHVEQUFZLENBQUMsUUFBUSxDQUFDLElBQUksQ0FBQyxPQUFPLENBQUMsQ0FBQztRQUNwRCxJQUFJLENBQUMsYUFBYSxHQUFHLHVEQUFZLENBQUMsUUFBUSxDQUFDLElBQUksQ0FBQyxZQUFZLENBQUMsQ0FBQztRQUM5RCxJQUFJLENBQUMsY0FBYyxHQUFHLHVEQUFZLENBQUMsUUFBUSxDQUFDLElBQUksQ0FBQyxhQUFhLENBQUMsQ0FBQztRQUNoRSxJQUFJLENBQUMsU0FBUyxHQUFHLHVEQUFZLENBQUMsUUFBUSxDQUFDLElBQUksQ0FBQyxRQUFRLENBQUMsQ0FBQztRQUN0RCxJQUFJLENBQUMsYUFBYSxHQUFHLHVEQUFZLENBQUMsUUFBUSxDQUFDLElBQUksQ0FBQyxZQUFZLENBQUMsQ0FBQztRQUM5RCxJQUFJLENBQUMsY0FBYyxHQUFHLHVEQUFZLENBQUMsUUFBUSxDQUFDLElBQUksQ0FBQyxhQUFhLENBQUMsQ0FBQztJQUNsRSxDQUFDO0lBRVMsVUFBVSxDQUFDLElBQVM7UUFDNUIsSUFBSSxDQUFDLElBQUksR0FBRyxJQUFJLENBQUMsS0FBSyxDQUFDO1FBQ3ZCLElBQUksQ0FBQyxRQUFRLEdBQUcsSUFBSSxDQUFDLFNBQVMsQ0FBQyxNQUFNLEVBQUUsQ0FBQztRQUN4QyxJQUFJLENBQUMsV0FBVyxHQUFHLElBQUksQ0FBQyxZQUFZLENBQUMsTUFBTSxFQUFFLENBQUM7UUFDOUMsSUFBSSxDQUFDLGNBQWMsR0FBRyxJQUFJLENBQUMsZUFBZSxDQUFDLE1BQU0sRUFBRSxDQUFDO1FBQ3BELElBQUksQ0FBQyxXQUFXLEdBQUcsSUFBSSxDQUFDLFlBQVksQ0FBQyxNQUFNLEVBQUUsQ0FBQztRQUM5QyxJQUFJLENBQUMsU0FBUyxHQUFHLElBQUksQ0FBQyxVQUFVLENBQUMsTUFBTSxFQUFFLENBQUM7UUFDMUMsSUFBSSxDQUFDLE9BQU8sR0FBRyx1REFBWSxDQUFDLE1BQU0sQ0FBQyxJQUFJLENBQUMsUUFBUSxDQUFDLENBQUM7UUFDbEQsSUFBSSxDQUFDLFlBQVksR0FBRyx1REFBWSxDQUFDLE1BQU0sQ0FBQyxJQUFJLENBQUMsYUFBYSxDQUFDLENBQUM7UUFDNUQsSUFBSSxDQUFDLGFBQWEsR0FBRyx1REFBWSxDQUFDLE1BQU0sQ0FBQyxJQUFJLENBQUMsY0FBYyxDQUFDLENBQUM7UUFDOUQsSUFBSSxDQUFDLFFBQVEsR0FBRyxJQUFJLENBQUMsU0FBUyxDQUFDO1FBQy9CLElBQUksQ0FBQyxZQUFZLEdBQUcsSUFBSSxDQUFDLGFBQWEsQ0FBQztRQUN2QyxJQUFJLENBQUMsYUFBYSxHQUFHLElBQUksQ0FBQyxjQUFjLENBQUM7SUFDM0MsQ0FBQztDQUNGO0FBQUEsQ0FBQztBQUVLLE1BQU0sVUFBVyxTQUFRLFVBQVU7SUFDaEMsT0FBTyxDQUFVO0lBQ2pCLFdBQVcsQ0FBVTtJQUNyQixPQUFPLENBQVU7SUFDakIsd0JBQXdCLENBQVc7SUFFM0MsWUFBb0IsSUFBWTtRQUM5QixLQUFLLENBQUMsSUFBSSxDQUFDLENBQUM7SUFDZCxDQUFDO0lBRU0sTUFBTSxDQUFDLE1BQU0sQ0FBQyxJQUFZO1FBQy9CLE9BQU8sTUFBTSxDQUFDLElBQUksQ0FBQyxJQUFJLFVBQVUsQ0FBQyxJQUFJLENBQUMsQ0FBQyxDQUFDO0lBQzNDLENBQUM7SUFFRCxJQUFXLE1BQU07UUFDZixPQUFPLElBQUksQ0FBQyxPQUFPLENBQUM7SUFDdEIsQ0FBQztJQUVNLFNBQVMsQ0FBQyxLQUFhO1FBQzVCLElBQUksQ0FBQyxPQUFPLEdBQUcsS0FBSyxDQUFDO0lBQ3ZCLENBQUM7SUFFRCxJQUFXLFVBQVU7UUFDbkIsT0FBTyxJQUFJLENBQUMsV0FBVyxDQUFDO0lBQzFCLENBQUM7SUFFTSxhQUFhLENBQUMsS0FBVTtRQUM3QixJQUFJLENBQUMsV0FBVyxHQUFHLEtBQUssQ0FBQztJQUMzQixDQUFDO0lBRUQsSUFBVyxNQUFNO1FBQ2YsT0FBTyxJQUFJLENBQUMsT0FBTyxDQUFDO0lBQ3RCLENBQUM7SUFFTSxTQUFTLENBQUMsS0FBYTtRQUM1QixJQUFJLENBQUMsT0FBTyxHQUFHLEtBQUssQ0FBQztJQUN2QixDQUFDO0lBRUQsSUFBVyx1QkFBdUI7UUFDaEMsT0FBTyxJQUFJLENBQUMsd0JBQXdCLENBQUM7SUFDdkMsQ0FBQztJQUVNLDBCQUEwQixDQUFDLEtBQWM7UUFDOUMsSUFBSSxDQUFDLHdCQUF3QixHQUFHLEtBQUssQ0FBQztJQUN4QyxDQUFDO0lBRUQsSUFBVyxlQUFlO1FBQ3hCLE9BQU8sSUFBSSxDQUFDLGVBQWUsQ0FBQztJQUM5QixDQUFDO0lBRUQsSUFBVyxZQUFZO1FBQ3JCLE9BQU8sSUFBSSxDQUFDLFlBQVksQ0FBQztJQUMzQixDQUFDO0lBRUQsSUFBVyxTQUFTO1FBQ2xCLE9BQU8sSUFBSSxDQUFDLFVBQVUsQ0FBQztJQUN6QixDQUFDO0lBRUQsSUFBVyxPQUFPO1FBQ2hCLE9BQU8sSUFBSSxDQUFDLFFBQVEsQ0FBQztJQUN2QixDQUFDO0lBRU0sTUFBTSxDQUFDLFFBQVEsQ0FBQyxJQUFTO1FBQzlCLE1BQU0sTUFBTSxHQUFHLElBQUksVUFBVSxDQUFDLElBQUksQ0FBQyxJQUFJLENBQUMsQ0FBQztRQUV6QyxNQUFNLENBQUMsV0FBVyxDQUFDLElBQUksQ0FBQyxDQUFDO1FBRXpCLElBQUksSUFBSSxDQUFDLE1BQU0sS0FBSyxTQUFTO1lBQzNCLE1BQU0sQ0FBQyxPQUFPLEdBQUcsSUFBSSxDQUFDLE1BQU0sQ0FBQztRQUUvQixJQUFJLElBQUksQ0FBQyxVQUFVLEtBQUssU0FBUztZQUMvQixNQUFNLENBQUMsV0FBVyxHQUFHLElBQUksQ0FBQyxVQUFVLENBQUM7UUFFdkMsSUFBSSxJQUFJLENBQUMsTUFBTSxLQUFLLFNBQVM7WUFDM0IsTUFBTSxDQUFDLE9BQU8sR0FBRyxJQUFJLENBQUMsTUFBTSxDQUFDO1FBRS9CLElBQUksSUFBSSxDQUFDLHVCQUF1QixLQUFLLFNBQVM7WUFDNUMsTUFBTSxDQUFDLHdCQUF3QixHQUFHLElBQUksQ0FBQyx1QkFBdUIsQ0FBQztRQUVqRSxPQUFPLE1BQU0sQ0FBQztJQUNoQixDQUFDO0lBRU0sTUFBTTtRQUNYLE1BQU0sTUFBTSxHQUFpQjtZQUMzQixJQUFJLEVBQUUsVUFBVSxDQUFDLElBQUk7U0FDdEIsQ0FBQztRQUVGLEtBQUssQ0FBQyxVQUFVLENBQUMsTUFBTSxDQUFDLENBQUM7UUFFekIsSUFBSSxJQUFJLENBQUMsT0FBTyxLQUFLLFNBQVM7WUFDNUIsTUFBTSxDQUFDLE1BQU0sR0FBRyxJQUFJLENBQUMsT0FBTyxDQUFDO1FBRS9CLElBQUksSUFBSSxDQUFDLFdBQVcsS0FBSyxTQUFTO1lBQ2hDLE1BQU0sQ0FBQyxVQUFVLEdBQUcsSUFBSSxDQUFDLFdBQVcsQ0FBQztRQUV2QyxJQUFJLElBQUksQ0FBQyxPQUFPLEtBQUssU0FBUztZQUM1QixNQUFNLENBQUMsTUFBTSxHQUFHLElBQUksQ0FBQyxPQUFPLENBQUM7UUFFL0IsSUFBSSxJQUFJLENBQUMsd0JBQXdCLEtBQUssU0FBUztZQUM3QyxNQUFNLENBQUMsdUJBQXVCLEdBQUcsSUFBSSxDQUFDLHdCQUF3QixDQUFDO1FBRWpFLE9BQU8sTUFBTSxDQUFDO0lBQ2hCLENBQUM7Q0FDRjtBQUFBLENBQUM7QUFFSyxNQUFlLFVBQVcsU0FBUSxVQUFVO0lBQ3pDLFVBQVUsQ0FBZTtJQUN6QixVQUFVLENBQWU7SUFDekIsT0FBTyxHQUFHLEVBQUUsQ0FBQztJQUNiLE9BQU8sR0FBRyxFQUFFLENBQUM7SUFDYixXQUFXLENBQVM7SUFDcEIsd0JBQXdCLEdBQUcsS0FBSyxDQUFDO0lBRXpDLFlBQXNCLElBQVksRUFBRSxTQUF1QixFQUFFLFNBQXVCO1FBQ2xGLEtBQUssQ0FBQyxJQUFJLENBQUMsQ0FBQztRQUVaLElBQUksQ0FBQyxVQUFVLEdBQUcsU0FBUyxDQUFDO1FBQzVCLElBQUksQ0FBQyxVQUFVLEdBQUcsU0FBUyxDQUFDO1FBQzVCLElBQUksQ0FBQyxXQUFXLEdBQUcsSUFBSSxDQUFDO0lBQzFCLENBQUM7SUFFRCxJQUFXLGVBQWU7UUFDeEIsT0FBTyxLQUFLLENBQUM7SUFDZixDQUFDO0lBRUQsSUFBVyxlQUFlO1FBQ3hCLE9BQU8sS0FBSyxDQUFDO0lBQ2YsQ0FBQztJQUVELElBQVcsZUFBZTtRQUN4QixPQUFPLEtBQUssQ0FBQztJQUNmLENBQUM7SUFFRCxJQUFXLFlBQVk7UUFDckIsT0FBTyxLQUFLLENBQUM7SUFDZixDQUFDO0lBRUQsSUFBVyxTQUFTO1FBQ2xCLE9BQU8sSUFBSSxDQUFDLFVBQVUsQ0FBQztJQUN6QixDQUFDO0lBRUQsSUFBVyxTQUFTO1FBQ2xCLE9BQU8sSUFBSSxDQUFDLFVBQVUsQ0FBQztJQUN6QixDQUFDO0lBRU0sVUFBVTtRQUNmLE9BQU8sSUFBSSxDQUFDLFVBQVUsQ0FBQztJQUN6QixDQUFDO0lBRU0sV0FBVztRQUNoQixPQUFPLElBQUksQ0FBQyxNQUFNLEdBQUcsSUFBSSxDQUFDLFVBQVUsR0FBRyxJQUFJLENBQUMsTUFBTSxDQUFDO0lBQ3JELENBQUM7SUFFTSxPQUFPO1FBQ1osT0FBTyxJQUFJLENBQUMsVUFBVSxDQUFDLElBQUksQ0FBQyxJQUFJLENBQUMsV0FBVyxFQUFFLENBQUMsQ0FBQztJQUNsRCxDQUFDO0lBRUQsSUFBVyxNQUFNO1FBQ2YsT0FBTyxJQUFJLENBQUMsT0FBTyxDQUFDO0lBQ3RCLENBQUM7SUFFTSxTQUFTLENBQUMsS0FBYTtRQUM1QixJQUFJLENBQUMsT0FBTyxHQUFHLEtBQUssQ0FBQztJQUN2QixDQUFDO0lBRUQsSUFBVyxNQUFNO1FBQ2YsT0FBTyxJQUFJLENBQUMsT0FBTyxDQUFDO0lBQ3RCLENBQUM7SUFFTSxTQUFTLENBQUMsS0FBVTtRQUN6QixJQUFJLENBQUMsT0FBTyxHQUFHLEtBQUssQ0FBQztJQUN2QixDQUFDO0lBRUQsSUFBVyxVQUFVO1FBQ25CLE9BQU8sSUFBSSxDQUFDLFdBQVcsQ0FBQztJQUMxQixDQUFDO0lBRU0sYUFBYSxDQUFDLEtBQVU7UUFDN0IsSUFBSSxDQUFDLFdBQVcsR0FBRyxLQUFLLENBQUM7SUFDM0IsQ0FBQztJQUVELElBQVcsdUJBQXVCO1FBQ2hDLE9BQU8sSUFBSSxDQUFDLHdCQUF3QixDQUFDO0lBQ3ZDLENBQUM7SUFFTSwwQkFBMEIsQ0FBQyxLQUFjO1FBQzlDLElBQUksQ0FBQyx3QkFBd0IsR0FBRyxLQUFLLENBQUM7SUFDeEMsQ0FBQztJQUVNLFVBQVUsQ0FBQyxNQUFrQjtRQUNsQyxLQUFLLENBQUMsVUFBVSxDQUFDLE1BQU0sQ0FBQyxDQUFDO1FBRXpCLElBQUksTUFBTSxDQUFDLE1BQU0sS0FBSyxTQUFTO1lBQzdCLElBQUksQ0FBQyxPQUFPLEdBQUcsTUFBTSxDQUFDLE1BQU0sQ0FBQztRQUMvQixJQUFJLE1BQU0sQ0FBQyxNQUFNLEtBQUssU0FBUztZQUM3QixJQUFJLENBQUMsT0FBTyxHQUFHLE1BQU0sQ0FBQyxNQUFNLENBQUM7UUFDL0IsSUFBSSxNQUFNLENBQUMsVUFBVSxLQUFLLFNBQVM7WUFDakMsSUFBSSxDQUFDLFdBQVcsR0FBRyxNQUFNLENBQUMsVUFBVSxDQUFDO1FBQ3ZDLElBQUksTUFBTSxDQUFDLHVCQUF1QixLQUFLLFNBQVM7WUFDOUMsSUFBSSxDQUFDLHdCQUF3QixHQUFHLE1BQU0sQ0FBQyx1QkFBdUIsQ0FBQztJQUNuRSxDQUFDO0lBRVMsV0FBVyxDQUFDLElBQVM7UUFDN0IsS0FBSyxDQUFDLFdBQVcsQ0FBQyxJQUFJLENBQUMsQ0FBQztRQUV4QixJQUFJLENBQUMsT0FBTyxHQUFHLElBQUksQ0FBQyxNQUFNLENBQUM7UUFDM0IsSUFBSSxDQUFDLFdBQVcsR0FBRyxJQUFJLENBQUMsVUFBVSxDQUFDO1FBQ25DLElBQUksQ0FBQyxPQUFPLEdBQUcsSUFBSSxDQUFDLE1BQU0sQ0FBQztRQUMzQixJQUFJLENBQUMsd0JBQXdCLEdBQUcsSUFBSSxDQUFDLHVCQUF1QixDQUFDO0lBQy9ELENBQUM7SUFFUyxVQUFVLENBQUMsSUFBUztRQUM1QixLQUFLLENBQUMsVUFBVSxDQUFDLElBQUksQ0FBQyxDQUFDO1FBRXZCLElBQUksQ0FBQyxTQUFTLEdBQUcsSUFBSSxDQUFDLFVBQVUsQ0FBQyxXQUFXLEVBQUUsQ0FBQztRQUMvQyxJQUFJLENBQUMsU0FBUyxHQUFHLElBQUksQ0FBQyxVQUFVLENBQUMsV0FBVyxFQUFFLENBQUM7UUFDL0MsSUFBSSxDQUFDLE1BQU0sR0FBRyxJQUFJLENBQUMsT0FBTyxDQUFDO1FBQzNCLElBQUksQ0FBQyxNQUFNLEdBQUcsSUFBSSxDQUFDLE9BQU8sQ0FBQztRQUMzQixJQUFJLENBQUMsVUFBVSxHQUFHLElBQUksQ0FBQyxXQUFXLENBQUM7UUFDbkMsSUFBSSxDQUFDLHVCQUF1QixHQUFHLElBQUksQ0FBQyx3QkFBd0IsQ0FBQztRQUU3RCxPQUFPLElBQUksQ0FBQztJQUNkLENBQUM7Q0FDRjtBQUFBLENBQUM7QUFFSyxNQUFNLGFBQWMsU0FBUSxVQUFVO0lBQzNDLFlBQW1CLElBQVksRUFBRSxTQUF1QixFQUFFLFNBQXVCO1FBQy9FLEtBQUssQ0FBQyxJQUFJLEVBQUUsU0FBUyxFQUFFLFNBQVMsQ0FBQyxDQUFDO0lBQ3BDLENBQUM7SUFFRCxJQUFXLGVBQWU7UUFDeEIsT0FBTyxJQUFJLENBQUM7SUFDZCxDQUFDO0lBRU0sTUFBTSxDQUFDLFFBQVEsQ0FBQyxJQUFTO1FBQzlCLE1BQU0sTUFBTSxHQUFHLElBQUksYUFBYSxDQUFDLElBQUksQ0FBQyxJQUFJLEVBQUUsNERBQVksQ0FBQyxNQUFNLENBQUMsSUFBSSxDQUFDLFNBQVMsQ0FBQyxFQUFFLDREQUFZLENBQUMsTUFBTSxDQUFDLElBQUksQ0FBQyxTQUFTLENBQUMsQ0FBQyxDQUFDO1FBQ3RILE1BQU0sQ0FBQyxXQUFXLENBQUMsSUFBSSxDQUFDLENBQUM7UUFDekIsT0FBTyxNQUFNLENBQUM7SUFDaEIsQ0FBQztJQUVNLE1BQU07UUFDWCxNQUFNLE1BQU0sR0FBaUI7WUFDM0IsSUFBSSxFQUFFLGFBQWEsQ0FBQyxJQUFJO1NBQ3pCLENBQUM7UUFDRixLQUFLLENBQUMsVUFBVSxDQUFDLE1BQU0sQ0FBQyxDQUFDO1FBQ3pCLE9BQU8sTUFBTSxDQUFDO0lBQ2hCLENBQUM7Q0FDRjtBQUFBLENBQUM7QUFFSyxNQUFNLGFBQWMsU0FBUSxVQUFVO0lBQzNDLFlBQW1CLElBQVksRUFBRSxTQUF1QixFQUFFLFNBQXVCO1FBQy9FLEtBQUssQ0FBQyxJQUFJLEVBQUUsU0FBUyxFQUFFLFNBQVMsQ0FBQyxDQUFDO0lBQ3BDLENBQUM7SUFFRCxJQUFXLGVBQWU7UUFDeEIsT0FBTyxJQUFJLENBQUM7SUFDZCxDQUFDO0lBRU0sTUFBTSxDQUFDLFFBQVEsQ0FBQyxJQUFTO1FBQzlCLE1BQU0sTUFBTSxHQUFHLElBQUksYUFBYSxDQUFDLElBQUksQ0FBQyxJQUFJLEVBQUUsNERBQVksQ0FBQyxNQUFNLENBQUMsSUFBSSxDQUFDLFNBQVMsQ0FBQyxFQUFFLDREQUFZLENBQUMsTUFBTSxDQUFDLElBQUksQ0FBQyxTQUFTLENBQUMsQ0FBQyxDQUFDO1FBQ3RILE1BQU0sQ0FBQyxXQUFXLENBQUMsSUFBSSxDQUFDLENBQUM7UUFDekIsT0FBTyxNQUFNLENBQUM7SUFDaEIsQ0FBQztJQUVNLE1BQU07UUFDWCxNQUFNLE1BQU0sR0FBaUI7WUFDM0IsSUFBSSxFQUFFLGFBQWEsQ0FBQyxJQUFJO1NBQ3pCLENBQUM7UUFDRixLQUFLLENBQUMsVUFBVSxDQUFDLE1BQU0sQ0FBQyxDQUFDO1FBQ3pCLE9BQU8sTUFBTSxDQUFDO0lBQ2hCLENBQUM7Q0FDRjtBQUFBLENBQUM7QUFFSyxNQUFNLGFBQWMsU0FBUSxVQUFVO0lBQzNDLFlBQW1CLElBQVksRUFBRSxTQUF1QixFQUFFLFNBQXVCO1FBQy9FLEtBQUssQ0FBQyxJQUFJLEVBQUUsU0FBUyxFQUFFLFNBQVMsQ0FBQyxDQUFDO0lBQ3BDLENBQUM7SUFFRCxJQUFXLGVBQWU7UUFDeEIsT0FBTyxJQUFJLENBQUM7SUFDZCxDQUFDO0lBRU0sTUFBTSxDQUFDLFFBQVEsQ0FBQyxJQUFTO1FBQzlCLE1BQU0sTUFBTSxHQUFHLElBQUksYUFBYSxDQUFDLElBQUksQ0FBQyxJQUFJLEVBQUUsNERBQVksQ0FBQyxNQUFNLENBQUMsSUFBSSxDQUFDLFNBQVMsQ0FBQyxFQUFFLDREQUFZLENBQUMsTUFBTSxDQUFDLElBQUksQ0FBQyxTQUFTLENBQUMsQ0FBQyxDQUFDO1FBQ3RILE1BQU0sQ0FBQyxXQUFXLENBQUMsSUFBSSxDQUFDLENBQUM7UUFDekIsT0FBTyxNQUFNLENBQUM7SUFDaEIsQ0FBQztJQUVNLE1BQU07UUFDWCxNQUFNLE1BQU0sR0FBaUI7WUFDM0IsSUFBSSxFQUFFLGFBQWEsQ0FBQyxJQUFJO1NBQ3pCLENBQUM7UUFDRixLQUFLLENBQUMsVUFBVSxDQUFDLE1BQU0sQ0FBQyxDQUFDO1FBQ3pCLE9BQU8sTUFBTSxDQUFDO0lBQ2hCLENBQUM7Q0FDRjtBQUFBLENBQUM7QUFFSyxNQUFNLFVBQVcsU0FBUSxVQUFVO0lBQ3hDLFlBQW1CLElBQVksRUFBRSxTQUF1QixFQUFFLFNBQXVCO1FBQy9FLEtBQUssQ0FBQyxJQUFJLEVBQUUsU0FBUyxFQUFFLFNBQVMsQ0FBQyxDQUFDO0lBQ3BDLENBQUM7SUFFRCxJQUFXLFlBQVk7UUFDckIsT0FBTyxJQUFJLENBQUM7SUFDZCxDQUFDO0lBRU0sTUFBTSxDQUFDLFFBQVEsQ0FBQyxJQUFTO1FBQzlCLE1BQU0sTUFBTSxHQUFHLElBQUksVUFBVSxDQUFDLElBQUksQ0FBQyxJQUFJLEVBQUUsNERBQVksQ0FBQyxNQUFNLENBQUMsSUFBSSxDQUFDLFNBQVMsQ0FBQyxFQUFFLDREQUFZLENBQUMsTUFBTSxDQUFDLElBQUksQ0FBQyxTQUFTLENBQUMsQ0FBQyxDQUFDO1FBQ25ILE1BQU0sQ0FBQyxXQUFXLENBQUMsSUFBSSxDQUFDLENBQUM7UUFDekIsT0FBTyxNQUFNLENBQUM7SUFDaEIsQ0FBQztJQUVNLE1BQU07UUFDWCxNQUFNLE1BQU0sR0FBaUI7WUFDM0IsSUFBSSxFQUFFLFVBQVUsQ0FBQyxJQUFJO1NBQ3RCLENBQUM7UUFDRixLQUFLLENBQUMsVUFBVSxDQUFDLE1BQU0sQ0FBQyxDQUFDO1FBQ3pCLE9BQU8sTUFBTSxDQUFDO0lBQ2hCLENBQUM7Q0FDRjtBQUFBLENBQUM7Ozs7Ozs7Ozs7Ozs7Ozs7OztBQzdtQkY7Ozs7Ozs7R0FPRztBQUVtRDtBQUNSO0FBRUs7QUFHbkQsTUFBTSxPQUFPLEdBQUcsTUFBTSxDQUFDLFNBQVMsQ0FBQyxDQUFDO0FBRTNCLE1BQU0sZ0JBQWdCO0lBQ25CLENBQUMsT0FBTyxDQUFDLEdBQUcsSUFBSSxHQUF1QixDQUFDO0lBRXpDLE1BQU0sQ0FBQyxNQUFNO1FBQ2xCLE9BQU8sTUFBTSxDQUFDLElBQUksQ0FBQyxJQUFJLGdCQUFnQixDQUFDLENBQUM7SUFDM0MsQ0FBQztJQUVELElBQVcsT0FBTztRQUNoQixPQUFPLElBQUksQ0FBQyxPQUFPLENBQUMsQ0FBQztJQUN2QixDQUFDO0lBRU0sTUFBTTtRQUNYLE1BQU0sTUFBTSxHQUFpQixFQUFFLElBQUksRUFBRSxnQkFBZ0IsQ0FBQyxJQUFJLEVBQUUsQ0FBQztRQUM3RCxJQUFJLENBQUMsT0FBTyxDQUFDLENBQUMsT0FBTyxDQUFDLENBQUMsQ0FBQyxFQUFFLENBQUMsRUFBRSxFQUFFLENBQUMsS0FBSyxDQUFDLE1BQU0sQ0FBQyxDQUFDLENBQUMsR0FBRyxDQUFDLENBQUMsQ0FBQyxDQUFDO1FBQ3RELE9BQU8sTUFBTSxDQUFDO0lBQ2hCLENBQUM7SUFFTSxHQUFHLENBQUMsSUFBWTtRQUNyQixNQUFNLE1BQU0sR0FBRyxJQUFJLENBQUMsT0FBTyxDQUFDLENBQUMsR0FBRyxDQUFDLElBQUksQ0FBQyxDQUFDO1FBQ3ZDLElBQUksQ0FBQyxNQUFNO1lBQ1QsTUFBTSxXQUFXLElBQUksa0JBQWtCLENBQUM7UUFDMUMsT0FBTyxNQUFNLENBQUM7SUFDaEIsQ0FBQztJQUVNLEdBQUcsQ0FBQyxJQUFZLEVBQUUsTUFBVztRQUNsQyxJQUFJLElBQUksQ0FBQyxPQUFPLENBQUMsQ0FBQyxHQUFHLENBQUMsSUFBSSxDQUFDO1lBQ3pCLE1BQU0sSUFBSSxLQUFLLENBQUMsV0FBVyxJQUFJLFVBQVUsQ0FBQyxDQUFDO1FBQzdDLElBQUksQ0FBQyxPQUFPLENBQUMsQ0FBQyxHQUFHLENBQUMsSUFBSSxFQUFFLE1BQU0sQ0FBQyxDQUFDO0lBQ2xDLENBQUM7SUFFTyxnQkFBZ0IsQ0FBQyxRQUFrQixFQUFFLFNBQXNCLEVBQUUsSUFBOEQ7UUFDakksS0FBSyxNQUFNLElBQUksSUFBSSxJQUFJLEVBQUUsQ0FBQztZQUN4QixJQUFJLElBQUksWUFBWSxnRUFBYyxJQUFJLElBQUksWUFBWSx3REFBVSxFQUFFLENBQUM7Z0JBQ2pFLElBQUksQ0FBQyxTQUFTLENBQUMsR0FBRyxDQUFDLElBQUksQ0FBQyxVQUFVLENBQUMsRUFBRSxDQUFDO29CQUNwQyxTQUFTLENBQUMsR0FBRyxDQUFDLElBQUksQ0FBQyxVQUFVLENBQUMsQ0FBQztvQkFDL0IsTUFBTSxNQUFNLEdBQUcsSUFBSSxDQUFDLEdBQUcsQ0FBQyxJQUFJLENBQUMsVUFBVSxDQUFDLENBQUM7b0JBQ3pDLElBQUksQ0FBQyxnQkFBZ0IsQ0FBQyxRQUFRLEVBQUUsU0FBUyxFQUFFLE1BQU0sQ0FBQyxpQkFBaUIsRUFBRSxDQUFDLENBQUM7b0JBQ3ZFLElBQUksQ0FBQyxnQkFBZ0IsQ0FBQyxRQUFRLEVBQUUsU0FBUyxFQUFFLE1BQU0sQ0FBQyxrQkFBa0IsRUFBRSxDQUFDLENBQUM7Z0JBQzFFLENBQUM7WUFDSCxDQUFDO2lCQUNJLElBQUksSUFBSSxZQUFZLDREQUFZLEVBQUUsQ0FBQztnQkFDdEMsSUFBSSxDQUFDLFFBQVEsQ0FBQyxRQUFRLENBQUMsSUFBSSxDQUFDLFFBQVEsRUFBRSxDQUFDO29CQUNyQyxRQUFRLENBQUMsSUFBSSxDQUFDLElBQUksQ0FBQyxRQUFRLEVBQUUsQ0FBQyxDQUFDO1lBQ25DLENBQUM7aUJBQ0ksQ0FBQztnQkFDSixNQUFNLElBQUksS0FBSyxDQUFDLHdCQUF3QixJQUFJLEVBQUUsQ0FBQyxDQUFDO1lBQ2xELENBQUM7UUFDSCxDQUFDO0lBQ0gsQ0FBQztJQUVNLGFBQWEsQ0FBQyxNQUEyQjtRQUM5QyxNQUFNLE1BQU0sR0FBRyxDQUFDLE9BQU8sTUFBTSxLQUFLLFFBQVEsQ0FBQyxDQUFDLENBQUMsQ0FBQyxJQUFJLENBQUMsR0FBRyxDQUFDLE1BQU0sQ0FBQyxDQUFDLENBQUMsQ0FBQyxNQUFNLENBQUM7UUFDeEUsTUFBTSxRQUFRLEdBQWEsRUFBRSxDQUFDO1FBQzlCLE1BQU0sU0FBUyxHQUFHLElBQUksR0FBRyxDQUFDLENBQUUsTUFBTSxDQUFDLFVBQVUsQ0FBRSxDQUFDLENBQUM7UUFDakQsSUFBSSxDQUFDLGdCQUFnQixDQUFDLFFBQVEsRUFBRSxTQUFTLEVBQUUsTUFBTSxDQUFDLFdBQVcsRUFBRSxDQUFDLENBQUM7UUFDakUsSUFBSSxDQUFDLGdCQUFnQixDQUFDLFFBQVEsRUFBRSxTQUFTLEVBQUUsTUFBTSxDQUFDLFlBQVksRUFBRSxDQUFDLENBQUM7UUFDbEUsT0FBTyxRQUFRLENBQUM7SUFDbEIsQ0FBQztJQUVPLGVBQWUsQ0FBQyxPQUFpQixFQUFFLFNBQXNCLEVBQUUsSUFBOEQ7UUFDL0gsS0FBSyxNQUFNLElBQUksSUFBSSxJQUFJLEVBQUUsQ0FBQztZQUN4QixJQUFJLElBQUksWUFBWSxnRUFBYyxJQUFJLElBQUksWUFBWSx3REFBVSxFQUFFLENBQUM7Z0JBQ2pFLElBQUksQ0FBQyxTQUFTLENBQUMsR0FBRyxDQUFDLElBQUksQ0FBQyxVQUFVLENBQUMsRUFBRSxDQUFDO29CQUNwQyxTQUFTLENBQUMsR0FBRyxDQUFDLElBQUksQ0FBQyxVQUFVLENBQUMsQ0FBQztvQkFDL0IsTUFBTSxNQUFNLEdBQUcsSUFBSSxDQUFDLEdBQUcsQ0FBQyxJQUFJLENBQUMsVUFBVSxDQUFDLENBQUM7b0JBQ3pDLEtBQUssTUFBTSxNQUFNLElBQUksTUFBTSxDQUFDLFVBQVUsRUFBRSxDQUFDLEdBQUcsQ0FBQyxDQUFDLENBQU0sRUFBRSxFQUFFLENBQUMsQ0FBQyxDQUFDLElBQUksQ0FBQyxRQUFRLEVBQUUsQ0FBQyxFQUFFLENBQUM7d0JBQzVFLElBQUksQ0FBQyxPQUFPLENBQUMsUUFBUSxDQUFDLE1BQU0sQ0FBQyxRQUFRLEVBQUUsQ0FBQzs0QkFDdEMsT0FBTyxDQUFDLElBQUksQ0FBQyxNQUFNLENBQUMsUUFBUSxFQUFFLENBQUMsQ0FBQztvQkFDcEMsQ0FBQztvQkFDRCxJQUFJLENBQUMsZUFBZSxDQUFDLE9BQU8sRUFBRSxTQUFTLEVBQUUsTUFBTSxDQUFDLGlCQUFpQixFQUFFLENBQUMsQ0FBQztvQkFDckUsSUFBSSxDQUFDLGVBQWUsQ0FBQyxPQUFPLEVBQUUsU0FBUyxFQUFFLE1BQU0sQ0FBQyxrQkFBa0IsRUFBRSxDQUFDLENBQUM7Z0JBQ3hFLENBQUM7WUFDSCxDQUFDO1FBQ0gsQ0FBQztJQUNILENBQUM7SUFFTSxZQUFZLENBQUMsTUFBMkI7UUFDN0MsTUFBTSxNQUFNLEdBQUcsQ0FBQyxPQUFPLE1BQU0sS0FBSyxRQUFRLENBQUMsQ0FBQyxDQUFDLENBQUMsSUFBSSxDQUFDLEdBQUcsQ0FBQyxNQUFNLENBQUMsQ0FBQyxDQUFDLENBQUMsTUFBTSxDQUFDO1FBQ3hFLE1BQU0sT0FBTyxHQUFHLE1BQU0sQ0FBQyxVQUFVLEVBQUUsQ0FBQyxHQUFHLENBQUMsQ0FBQyxDQUFNLEVBQUUsRUFBRSxDQUFDLENBQUMsQ0FBQyxJQUFJLENBQUMsUUFBUSxFQUFFLENBQUMsQ0FBQztRQUN2RSxNQUFNLFNBQVMsR0FBRyxJQUFJLEdBQUcsQ0FBQyxDQUFFLE1BQU0sQ0FBQyxVQUFVLENBQUUsQ0FBQyxDQUFDO1FBQ2pELElBQUksQ0FBQyxlQUFlLENBQUMsT0FBTyxFQUFFLFNBQVMsRUFBRSxNQUFNLENBQUMsV0FBVyxFQUFFLENBQUMsQ0FBQztRQUMvRCxJQUFJLENBQUMsZUFBZSxDQUFDLE9BQU8sRUFBRSxTQUFTLEVBQUUsTUFBTSxDQUFDLFlBQVksRUFBRSxDQUFDLENBQUM7UUFDaEUsT0FBTyxPQUFPLENBQUM7SUFDakIsQ0FBQztJQUVPLGlCQUFpQixDQUFDLFNBQW1CLEVBQUUsU0FBc0IsRUFBRSxJQUF1QjtRQUM1RixLQUFLLE1BQU0sSUFBSSxJQUFJLElBQUksRUFBRSxDQUFDO1lBQ3hCLE9BQU8sQ0FBQyxNQUFNLENBQUMsSUFBSSxZQUFZLHdEQUFVLENBQUMsQ0FBQztZQUMzQyxJQUFJLENBQUMsU0FBUyxDQUFDLEdBQUcsQ0FBQyxJQUFJLENBQUMsVUFBVSxDQUFDLEVBQUUsQ0FBQztnQkFDcEMsU0FBUyxDQUFDLEdBQUcsQ0FBQyxJQUFJLENBQUMsVUFBVSxDQUFDLENBQUM7Z0JBQy9CLE1BQU0sTUFBTSxHQUFHLElBQUksQ0FBQyxHQUFHLENBQUMsSUFBSSxDQUFDLFVBQVUsQ0FBQyxDQUFDO2dCQUN6QyxTQUFTLENBQUMsSUFBSSxDQUFDLE1BQU0sQ0FBQyxPQUFPLEVBQUUsQ0FBQyxRQUFRLEVBQUUsQ0FBQyxDQUFDO2dCQUM1QyxJQUFJLENBQUMsaUJBQWlCLENBQUMsU0FBUyxFQUFFLFNBQVMsRUFBRSxNQUFNLENBQUMsa0JBQWtCLEVBQUUsQ0FBQyxDQUFDO1lBQzVFLENBQUM7UUFDSCxDQUFDO0lBQ0gsQ0FBQztJQUVNLGNBQWMsQ0FBQyxNQUEyQjtRQUMvQyxNQUFNLE1BQU0sR0FBRyxDQUFDLE9BQU8sTUFBTSxLQUFLLFFBQVEsQ0FBQyxDQUFDLENBQUMsQ0FBQyxJQUFJLENBQUMsR0FBRyxDQUFDLE1BQU0sQ0FBQyxDQUFDLENBQUMsQ0FBQyxNQUFNLENBQUM7UUFDeEUsTUFBTSxTQUFTLEdBQWEsRUFBRSxDQUFDO1FBQy9CLE1BQU0sU0FBUyxHQUFHLElBQUksR0FBRyxDQUFDLENBQUUsTUFBTSxDQUFDLFVBQVUsQ0FBRSxDQUFDLENBQUM7UUFDakQsSUFBSSxDQUFDLGlCQUFpQixDQUFDLFNBQVMsRUFBRSxTQUFTLEVBQUUsTUFBTSxDQUFDLFlBQVksRUFBRSxDQUFDLENBQUM7UUFDcEUsT0FBTyxTQUFTLENBQUM7SUFDbkIsQ0FBQztJQUVPLG1CQUFtQixDQUFDLFdBQXFCLEVBQUUsU0FBc0IsRUFBRSxJQUF1QztRQUNoSCxLQUFLLE1BQU0sSUFBSSxJQUFJLElBQUksRUFBRSxDQUFDO1lBQ3hCLElBQUksSUFBSSxZQUFZLHdEQUFVLEVBQUUsQ0FBQztnQkFDL0IsSUFBSSxDQUFDLFNBQVMsQ0FBQyxHQUFHLENBQUMsSUFBSSxDQUFDLFVBQVUsQ0FBQyxFQUFFLENBQUM7b0JBQ3BDLFNBQVMsQ0FBQyxHQUFHLENBQUMsSUFBSSxDQUFDLFVBQVUsQ0FBQyxDQUFDO29CQUMvQixNQUFNLE1BQU0sR0FBRyxJQUFJLENBQUMsR0FBRyxDQUFDLElBQUksQ0FBQyxVQUFVLENBQUMsQ0FBQztvQkFDekMsSUFBSSxDQUFDLG1CQUFtQixDQUFDLFdBQVcsRUFBRSxTQUFTLEVBQUUsTUFBTSxDQUFDLG9CQUFvQixFQUFFLENBQUMsQ0FBQztvQkFDaEYsSUFBSSxDQUFDLG1CQUFtQixDQUFDLFdBQVcsRUFBRSxTQUFTLEVBQUUsTUFBTSxDQUFDLGtCQUFrQixFQUFFLENBQUMsQ0FBQztnQkFDaEYsQ0FBQztZQUNILENBQUM7aUJBQ0ksSUFBSSxPQUFPLElBQUksS0FBSyxRQUFRLEVBQUUsQ0FBQztnQkFDbEMsSUFBSSxDQUFDLFdBQVcsQ0FBQyxRQUFRLENBQUMsSUFBSSxDQUFDO29CQUM3QixXQUFXLENBQUMsSUFBSSxDQUFDLElBQUksQ0FBQyxDQUFDO1lBQzNCLENBQUM7aUJBQ0ksQ0FBQztnQkFDSixNQUFNLElBQUksS0FBSyxDQUFDLHdCQUF3QixJQUFJLEVBQUUsQ0FBQyxDQUFDO1lBQ2xELENBQUM7UUFDSCxDQUFDO0lBQ0gsQ0FBQztJQUVNLGdCQUFnQixDQUFDLE1BQTJCO1FBQ2pELE1BQU0sTUFBTSxHQUFHLENBQUMsT0FBTyxNQUFNLEtBQUssUUFBUSxDQUFDLENBQUMsQ0FBQyxDQUFDLElBQUksQ0FBQyxHQUFHLENBQUMsTUFBTSxDQUFDLENBQUMsQ0FBQyxDQUFDLE1BQU0sQ0FBQztRQUN4RSxNQUFNLFdBQVcsR0FBYSxFQUFFLENBQUM7UUFDakMsTUFBTSxTQUFTLEdBQUcsSUFBSSxHQUFHLENBQUMsQ0FBRSxNQUFNLENBQUMsVUFBVSxDQUFFLENBQUMsQ0FBQztRQUNqRCxJQUFJLENBQUMsbUJBQW1CLENBQUMsV0FBVyxFQUFFLFNBQVMsRUFBRSxNQUFNLENBQUMsY0FBYyxFQUFFLENBQUMsQ0FBQztRQUMxRSxJQUFJLENBQUMsbUJBQW1CLENBQUMsV0FBVyxFQUFFLFNBQVMsRUFBRSxNQUFNLENBQUMsa0JBQWtCLEVBQUUsQ0FBQyxDQUFDO1FBQzlFLE9BQU8sV0FBVyxDQUFDO0lBQ3JCLENBQUM7SUFFTyxzQkFBc0IsQ0FBQyxPQUErQixFQUFFLFNBQXNCLEVBQUUsSUFBZ0Q7UUFDdEksS0FBSyxNQUFNLElBQUksSUFBSSxJQUFJLEVBQUUsQ0FBQztZQUN4QixJQUFJLElBQUksWUFBWSx3REFBVSxFQUFFLENBQUM7Z0JBQy9CLElBQUksQ0FBQyxTQUFTLENBQUMsR0FBRyxDQUFDLElBQUksQ0FBQyxVQUFVLENBQUMsRUFBRSxDQUFDO29CQUNwQyxTQUFTLENBQUMsR0FBRyxDQUFDLElBQUksQ0FBQyxVQUFVLENBQUMsQ0FBQztvQkFDL0IsTUFBTSxNQUFNLEdBQUcsSUFBSSxDQUFDLEdBQUcsQ0FBQyxJQUFJLENBQUMsVUFBVSxDQUFDLENBQUM7b0JBQ3pDLElBQUksQ0FBQyxzQkFBc0IsQ0FBQyxPQUFPLEVBQUUsU0FBUyxFQUFFLE1BQU0sQ0FBQyx1QkFBdUIsRUFBRSxDQUFDLENBQUM7b0JBQ2xGLElBQUksQ0FBQyxzQkFBc0IsQ0FBQyxPQUFPLEVBQUUsU0FBUyxFQUFFLE1BQU0sQ0FBQyxrQkFBa0IsRUFBRSxDQUFDLENBQUM7Z0JBQy9FLENBQUM7WUFDSCxDQUFDO2lCQUNJLElBQUksT0FBTyxJQUFJLEtBQUssUUFBUSxFQUFFLENBQUM7Z0JBQ2xDLElBQUksQ0FBQyxPQUFPLENBQUMsUUFBUSxDQUFDLElBQUksQ0FBQztvQkFDekIsT0FBTyxDQUFDLElBQUksQ0FBQyxJQUFJLENBQUMsQ0FBQztZQUN2QixDQUFDO2lCQUNJLElBQUksS0FBSyxDQUFDLE9BQU8sQ0FBQyxJQUFJLENBQUMsRUFBRSxDQUFDO2dCQUM3Qiw4Q0FBOEM7Z0JBQzlDLE9BQU8sQ0FBQyxJQUFJLENBQUMsSUFBSSxDQUFDLENBQUM7WUFDckIsQ0FBQztpQkFDSSxDQUFDO2dCQUNKLE1BQU0sSUFBSSxLQUFLLENBQUMsd0JBQXdCLElBQUksRUFBRSxDQUFDLENBQUM7WUFDbEQsQ0FBQztRQUNILENBQUM7SUFDSCxDQUFDO0lBRU0sbUJBQW1CLENBQUMsTUFBMkI7UUFDcEQsTUFBTSxNQUFNLEdBQUcsQ0FBQyxPQUFPLE1BQU0sS0FBSyxRQUFRLENBQUMsQ0FBQyxDQUFDLENBQUMsSUFBSSxDQUFDLEdBQUcsQ0FBQyxNQUFNLENBQUMsQ0FBQyxDQUFDLENBQUMsTUFBTSxDQUFDO1FBQ3hFLE1BQU0sT0FBTyxHQUFhLEVBQUUsQ0FBQztRQUM3QixNQUFNLFNBQVMsR0FBRyxJQUFJLEdBQUcsQ0FBQyxDQUFFLE1BQU0sQ0FBQyxVQUFVLENBQUUsQ0FBQyxDQUFDO1FBQ2pELElBQUksQ0FBQyxzQkFBc0IsQ0FBQyxPQUFPLEVBQUUsU0FBUyxFQUFFLE1BQU0sQ0FBQyxpQkFBaUIsRUFBRSxDQUFDLENBQUM7UUFDNUUsSUFBSSxDQUFDLHNCQUFzQixDQUFDLE9BQU8sRUFBRSxTQUFTLEVBQUUsTUFBTSxDQUFDLGtCQUFrQixFQUFFLENBQUMsQ0FBQztRQUM3RSxPQUFPLE9BQU8sQ0FBQyxJQUFJLEVBQUUsQ0FBQztJQUN4QixDQUFDO0lBRU8sZ0JBQWdCLENBQUMsT0FBK0IsRUFBRSxTQUFzQixFQUFFLElBQWdEO1FBQ2hJLEtBQUssTUFBTSxJQUFJLElBQUksSUFBSSxFQUFFLENBQUM7WUFDeEIsSUFBSSxJQUFJLFlBQVksd0RBQVUsRUFBRSxDQUFDO2dCQUMvQixJQUFJLENBQUMsU0FBUyxDQUFDLEdBQUcsQ0FBQyxJQUFJLENBQUMsVUFBVSxDQUFDLEVBQUUsQ0FBQztvQkFDcEMsU0FBUyxDQUFDLEdBQUcsQ0FBQyxJQUFJLENBQUMsVUFBVSxDQUFDLENBQUM7b0JBQy9CLE1BQU0sTUFBTSxHQUFHLElBQUksQ0FBQyxHQUFHLENBQUMsSUFBSSxDQUFDLFVBQVUsQ0FBQyxDQUFDO29CQUN6QyxJQUFJLENBQUMsZ0JBQWdCLENBQUMsT0FBTyxFQUFFLFNBQVMsRUFBRSxNQUFNLENBQUMsb0JBQW9CLEVBQUUsQ0FBQyxDQUFDO29CQUN6RSxJQUFJLENBQUMsZ0JBQWdCLENBQUMsT0FBTyxFQUFFLFNBQVMsRUFBRSxNQUFNLENBQUMsa0JBQWtCLEVBQUUsQ0FBQyxDQUFDO2dCQUN6RSxDQUFDO1lBQ0gsQ0FBQztpQkFDSSxJQUFJLE9BQU8sSUFBSSxLQUFLLFFBQVEsRUFBRSxDQUFDO2dCQUNsQyxJQUFJLENBQUMsT0FBTyxDQUFDLFFBQVEsQ0FBQyxJQUFJLENBQUM7b0JBQ3pCLE9BQU8sQ0FBQyxJQUFJLENBQUMsSUFBSSxDQUFDLENBQUM7WUFDdkIsQ0FBQztpQkFDSSxJQUFJLEtBQUssQ0FBQyxPQUFPLENBQUMsSUFBSSxDQUFDLEVBQUUsQ0FBQztnQkFDN0IsOENBQThDO2dCQUM5QyxPQUFPLENBQUMsSUFBSSxDQUFDLElBQUksQ0FBQyxDQUFDO1lBQ3JCLENBQUM7aUJBQ0ksQ0FBQztnQkFDSixNQUFNLElBQUksS0FBSyxDQUFDLHdCQUF3QixJQUFJLEVBQUUsQ0FBQyxDQUFDO1lBQ2xELENBQUM7UUFDSCxDQUFDO0lBQ0gsQ0FBQztJQUVNLGdCQUFnQixDQUFDLE1BQTJCO1FBQ2pELE1BQU0sTUFBTSxHQUFHLENBQUMsT0FBTyxNQUFNLEtBQUssUUFBUSxDQUFDLENBQUMsQ0FBQyxDQUFDLElBQUksQ0FBQyxHQUFHLENBQUMsTUFBTSxDQUFDLENBQUMsQ0FBQyxDQUFDLE1BQU0sQ0FBQztRQUN4RSxNQUFNLE9BQU8sR0FBYSxFQUFFLENBQUM7UUFDN0IsTUFBTSxTQUFTLEdBQUcsSUFBSSxHQUFHLENBQUMsQ0FBRSxNQUFNLENBQUMsVUFBVSxDQUFFLENBQUMsQ0FBQztRQUNqRCxJQUFJLENBQUMsZ0JBQWdCLENBQUMsT0FBTyxFQUFFLFNBQVMsRUFBRSxNQUFNLENBQUMsY0FBYyxFQUFFLENBQUMsQ0FBQztRQUNuRSxJQUFJLENBQUMsZ0JBQWdCLENBQUMsT0FBTyxFQUFFLFNBQVMsRUFBRSxNQUFNLENBQUMsa0JBQWtCLEVBQUUsQ0FBQyxDQUFDO1FBQ3ZFLE9BQU8sT0FBTyxDQUFDLElBQUksRUFBRSxDQUFDO0lBQ3hCLENBQUM7Q0FDRjs7Ozs7Ozs7Ozs7Ozs7O0FDeE5EOzs7Ozs7O0dBT0c7QUFJSCxNQUFNLElBQUksR0FBRyxNQUFNLENBQUMsTUFBTSxDQUFDLENBQUM7QUFFckIsTUFBTSxVQUFVO0lBQ2IsQ0FBQyxJQUFJLENBQUMsQ0FBUztJQUV2QixZQUFvQixVQUFrQjtRQUNwQyxJQUFJLENBQUMsSUFBSSxDQUFDLEdBQUcsVUFBVSxDQUFDO0lBQzFCLENBQUM7SUFFTSxNQUFNLENBQUMsTUFBTSxDQUFDLElBQVk7UUFDL0IsT0FBTyxNQUFNLENBQUMsSUFBSSxDQUFDLElBQUksVUFBVSxDQUFDLElBQUksQ0FBQyxDQUFDLENBQUM7SUFDM0MsQ0FBQztJQUVNLE1BQU0sQ0FBQyxRQUFRLENBQUMsTUFBb0I7UUFDekMsT0FBTyxVQUFVLENBQUMsTUFBTSxDQUFDLE1BQU0sQ0FBQyxVQUFvQixDQUFDLENBQUM7SUFDeEQsQ0FBQztJQUVELElBQVcsVUFBVTtRQUNuQixPQUFPLElBQUksQ0FBQyxJQUFJLENBQUMsQ0FBQztJQUNwQixDQUFDO0lBRU0sUUFBUTtRQUNiLE9BQU8sSUFBSSxHQUFHLElBQUksQ0FBQyxJQUFJLENBQUMsR0FBRyxRQUFRLENBQUM7SUFDdEMsQ0FBQztJQUVNLE1BQU07UUFDWCxPQUFPO1lBQ0wsSUFBSSxFQUFFLFVBQVUsQ0FBQyxJQUFJO1lBQ3JCLFVBQVUsRUFBRSxJQUFJLENBQUMsSUFBSSxDQUFDO1NBQ3ZCO0lBQ0gsQ0FBQztDQUNGO0FBQUEsQ0FBQzs7Ozs7Ozs7Ozs7Ozs7Ozs7QUMxQ0Y7Ozs7Ozs7R0FPRztBQUUrQjtBQUVZO0FBRTlDLE1BQU0sTUFBTSxHQUFHLDJDQUFNLENBQUMsTUFBTSxDQUFDLG9GQUFlLENBQUMsQ0FBQztBQUV2QyxJQUFVLFlBQVksQ0E2QzVCO0FBN0NELFdBQWlCLFlBQVk7SUFFN0IsU0FBUyx3QkFBd0IsQ0FBQyxLQUFVO1FBQzFDLElBQUksS0FBSyxLQUFLLFNBQVM7WUFDckIsTUFBTSxzQkFBc0IsQ0FBQztRQUMvQixJQUFJLE9BQU8sS0FBSyxLQUFLLFFBQVE7WUFDM0IsT0FBTyxHQUFHLEdBQUcsSUFBSSxDQUFDLFNBQVMsQ0FBQyxLQUFLLENBQUMsR0FBRyxHQUFHLENBQUM7UUFDM0MsT0FBTyxLQUFLLENBQUMsUUFBUSxFQUFFLENBQUM7SUFDMUIsQ0FBQztJQUVELFNBQWdCLG9CQUFvQixDQUFDLFdBQWtCO1FBQ3JELE1BQU0sTUFBTSxHQUFHLEVBQUUsQ0FBQztRQUNsQixLQUFLLE1BQU0sSUFBSSxJQUFJLFdBQVcsRUFBRSxDQUFDO1lBQy9CLElBQUksT0FBTyxJQUFJLEtBQUssUUFBUTtnQkFDMUIsTUFBTSxDQUFDLElBQUksQ0FBQyxJQUFJLENBQUMsQ0FBQztpQkFDZixJQUFJLElBQUksSUFBSSxPQUFPLElBQUksS0FBSyxRQUFRLEVBQUUsQ0FBQztnQkFDMUMsS0FBSyxNQUFNLENBQUMsR0FBRyxFQUFFLEdBQUcsQ0FBQyxJQUFJLE1BQU0sQ0FBQyxPQUFPLENBQUMsSUFBSSxDQUFDO29CQUMzQyxNQUFNLENBQUMsSUFBSSxDQUFDLEdBQUcsR0FBRyxJQUFJLHdCQUF3QixDQUFDLEdBQUcsQ0FBQyxFQUFFLENBQUMsQ0FBQztZQUMzRCxDQUFDOztnQkFFQyxNQUFNLElBQUksS0FBSyxDQUFDLGNBQWMsSUFBSSxnQkFBZ0IsQ0FBQyxDQUFDO1FBQ3hELENBQUM7UUFDRCxPQUFPLE1BQU0sQ0FBQztJQUNoQixDQUFDO0lBYmUsaUNBQW9CLHVCQWFuQztJQUVELFNBQWdCLHVCQUF1QixDQUFDLE9BQXdCO1FBQzlELE1BQU0sTUFBTSxHQUFHLElBQUksS0FBZ0MsQ0FBQztRQUNwRCxLQUFLLE1BQU0sSUFBSSxJQUFJLE9BQU8sRUFBRSxDQUFDO1lBQzNCLElBQUksT0FBTyxJQUFJLEtBQUssUUFBUTtnQkFDMUIsTUFBTSxDQUFDLElBQUksQ0FBQyxJQUFJLENBQUMsQ0FBQztpQkFDZixJQUFJLEtBQUssQ0FBQyxPQUFPLENBQUMsSUFBSSxDQUFDLElBQUksSUFBSSxDQUFDLE1BQU0sSUFBSSxDQUFDLElBQUksT0FBTyxJQUFJLENBQUMsQ0FBQyxDQUFDLEtBQUssUUFBUSxFQUFFLENBQUM7Z0JBQ2hGLElBQUksT0FBTyxJQUFJLENBQUMsQ0FBQyxDQUFDLEtBQUssUUFBUTtvQkFDN0IsTUFBTSxDQUFDLElBQUksQ0FBQyxDQUFFLElBQUksQ0FBQyxDQUFDLENBQUMsRUFBRSxJQUFJLENBQUMsQ0FBQyxDQUFDLENBQUUsQ0FBQyxDQUFDO3FCQUMvQixJQUFJLElBQUksQ0FBQyxDQUFDLENBQUMsWUFBWSx1REFBWTtvQkFDdEMsTUFBTSxDQUFDLElBQUksQ0FBQyxDQUFFLElBQUksQ0FBQyxDQUFDLENBQUMsRUFBRSxJQUFJLENBQUMsQ0FBQyxDQUFDLENBQUMsTUFBTSxFQUFFLENBQUUsQ0FBQyxDQUFDOztvQkFFM0MsTUFBTSxJQUFJLEtBQUssQ0FBQyxpQkFBaUIsSUFBSSxnQkFBZ0IsQ0FBQyxDQUFDO1lBQzNELENBQUM7aUJBQ0ksQ0FBQztnQkFDSixNQUFNLElBQUksS0FBSyxDQUFDLGlCQUFpQixJQUFJLGdCQUFnQixDQUFDLENBQUM7WUFDekQsQ0FBQztRQUNILENBQUM7UUFDRCxPQUFPLE1BQU0sQ0FBQztJQUNoQixDQUFDO0lBbEJlLG9DQUF1QiwwQkFrQnRDO0FBRUQsQ0FBQyxFQTdDZ0IsWUFBWSxLQUFaLFlBQVksUUE2QzVCLENBQUMsc0JBQXNCOzs7Ozs7Ozs7Ozs7Ozs7QUM1RHhCOzs7Ozs7O0dBT0c7QUFJSCxNQUFNLElBQUksR0FBRyxNQUFNLENBQUMsTUFBTSxDQUFDLENBQUM7QUFFckIsTUFBTSxjQUFjO0lBQ2pCLENBQUMsSUFBSSxDQUFDLENBQVM7SUFFdkIsWUFBb0IsSUFBWTtRQUM5QixJQUFJLENBQUMsSUFBSSxDQUFDLEdBQUcsSUFBSSxDQUFDO0lBQ3BCLENBQUM7SUFFTSxNQUFNLENBQUMsTUFBTSxDQUFDLElBQVk7UUFDL0IsT0FBTyxNQUFNLENBQUMsSUFBSSxDQUFDLElBQUksY0FBYyxDQUFDLElBQUksQ0FBQyxDQUFDLENBQUM7SUFDL0MsQ0FBQztJQUVNLE1BQU0sQ0FBQyxRQUFRLENBQUMsTUFBb0I7UUFDekMsT0FBTyxjQUFjLENBQUMsTUFBTSxDQUFDLE1BQU0sQ0FBQyxVQUFvQixDQUFDLENBQUM7SUFDNUQsQ0FBQztJQUVELElBQVcsVUFBVTtRQUNuQixPQUFPLElBQUksQ0FBQyxJQUFJLENBQUMsQ0FBQztJQUNwQixDQUFDO0lBRU0sUUFBUTtRQUNiLE9BQU8sSUFBSSxHQUFHLElBQUksQ0FBQyxJQUFJLENBQUMsR0FBRyxZQUFZLENBQUM7SUFDMUMsQ0FBQztJQUVNLE1BQU07UUFDWCxPQUFPO1lBQ0wsSUFBSSxFQUFFLGNBQWMsQ0FBQyxJQUFJO1lBQ3pCLFVBQVUsRUFBRSxJQUFJLENBQUMsSUFBSSxDQUFDO1NBQ3ZCO0lBQ0gsQ0FBQztJQUVNLE1BQU0sQ0FBQyxjQUFjLENBQUMsS0FBVTtRQUNyQyxJQUFJLEtBQUssWUFBWSxjQUFjO1lBQ2pDLE9BQU8sS0FBSyxDQUFDO1FBQ2YsTUFBTSxJQUFJLEtBQUssQ0FBQyxRQUFRLEtBQUssMkJBQTJCLENBQUMsQ0FBQztJQUM1RCxDQUFDO0NBQ0Y7QUFBQSxDQUFDOzs7Ozs7Ozs7Ozs7Ozs7QUNoREY7Ozs7Ozs7R0FPRztBQUlILE1BQU0sSUFBSSxHQUFHLE1BQU0sQ0FBQyxNQUFNLENBQUMsQ0FBQztBQUVyQixNQUFNLFVBQVU7SUFDYixDQUFDLElBQUksQ0FBQyxDQUFTO0lBRXZCLFlBQW9CLElBQVk7UUFDOUIsSUFBSSxDQUFDLElBQUksQ0FBQyxHQUFHLElBQUksQ0FBQztJQUNwQixDQUFDO0lBRU0sTUFBTSxDQUFDLE1BQU0sQ0FBQyxJQUFZO1FBQy9CLE9BQU8sTUFBTSxDQUFDLElBQUksQ0FBQyxJQUFJLFVBQVUsQ0FBQyxJQUFJLENBQUMsQ0FBQyxDQUFDO0lBQzNDLENBQUM7SUFFTSxNQUFNLENBQUMsUUFBUSxDQUFDLE1BQW9CO1FBQ3pDLE9BQU8sVUFBVSxDQUFDLE1BQU0sQ0FBQyxNQUFNLENBQUMsVUFBb0IsQ0FBQyxDQUFDO0lBQ3hELENBQUM7SUFFRCxJQUFXLFVBQVU7UUFDbkIsT0FBTyxJQUFJLENBQUMsSUFBSSxDQUFDLENBQUM7SUFDcEIsQ0FBQztJQUVNLFFBQVE7UUFDYixPQUFPLElBQUksR0FBRyxJQUFJLENBQUMsSUFBSSxDQUFDLEdBQUcsUUFBUSxDQUFDO0lBQ3RDLENBQUM7SUFFTSxNQUFNO1FBQ1gsT0FBTztZQUNMLElBQUksRUFBRSxVQUFVLENBQUMsSUFBSTtZQUNyQixVQUFVLEVBQUUsSUFBSSxDQUFDLElBQUksQ0FBQztTQUN2QjtJQUNILENBQUM7Q0FDRjtBQUFBLENBQUM7Ozs7Ozs7Ozs7Ozs7OztBQzFDRjs7Ozs7OztHQU9HO0FBSUgsTUFBTSxJQUFJLEdBQUcsTUFBTSxDQUFDLE1BQU0sQ0FBQyxDQUFDO0FBRXJCLE1BQU0sYUFBYTtJQUNoQixDQUFDLElBQUksQ0FBQyxDQUFTO0lBRXZCLFlBQW9CLElBQVk7UUFDOUIsSUFBSSxDQUFDLElBQUksQ0FBQyxHQUFHLElBQUksQ0FBQztJQUNwQixDQUFDO0lBRU0sTUFBTSxDQUFDLE1BQU0sQ0FBQyxJQUFZO1FBQy9CLE9BQU8sTUFBTSxDQUFDLElBQUksQ0FBQyxJQUFJLGFBQWEsQ0FBQyxJQUFJLENBQUMsQ0FBQyxDQUFDO0lBQzlDLENBQUM7SUFFTSxNQUFNLENBQUMsUUFBUSxDQUFDLE1BQW9CO1FBQ3pDLE9BQU8sYUFBYSxDQUFDLE1BQU0sQ0FBQyxNQUFNLENBQUMsVUFBb0IsQ0FBQyxDQUFDO0lBQzNELENBQUM7SUFFTSxNQUFNLENBQUMsY0FBYyxDQUFDLEtBQVU7UUFDckMsSUFBSSxLQUFLLFlBQVksYUFBYTtZQUNoQyxPQUFPLEtBQUssQ0FBQztRQUNmLE1BQU0sSUFBSSxLQUFLLENBQUMsUUFBUSxLQUFLLDBCQUEwQixDQUFDLENBQUM7SUFDM0QsQ0FBQztJQUVELElBQVcsVUFBVTtRQUNuQixPQUFPLElBQUksQ0FBQyxJQUFJLENBQUMsQ0FBQztJQUNwQixDQUFDO0lBRU0sUUFBUTtRQUNiLE9BQU8sSUFBSSxHQUFHLElBQUksQ0FBQyxJQUFJLENBQUMsR0FBRyxXQUFXLENBQUM7SUFDekMsQ0FBQztJQUVNLE1BQU07UUFDWCxPQUFPO1lBQ0wsSUFBSSxFQUFFLGFBQWEsQ0FBQyxJQUFJO1lBQ3hCLFVBQVUsRUFBRSxJQUFJLENBQUMsSUFBSSxDQUFDO1NBQ3ZCO0lBQ0gsQ0FBQztDQUNGO0FBQUEsQ0FBQzs7Ozs7Ozs7Ozs7Ozs7OztBQ2hERjs7Ozs7OztHQU9HO0FBSWlEO0FBQ0Q7QUFFbkQsTUFBTSxNQUFNLEdBQUcsTUFBTSxDQUFDLFFBQVEsQ0FBQyxDQUFDO0FBQ2hDLE1BQU0sS0FBSyxHQUFHLE1BQU0sQ0FBQyxPQUFPLENBQUMsQ0FBQztBQUV2QixNQUFNLGdCQUFpQixTQUFRLDZEQUFjO0lBQ2xELENBQUMsS0FBSyxDQUFDLENBQWM7SUFDckIsQ0FBQyxNQUFNLENBQUMsQ0FBaUI7SUFFekIsWUFBWSxNQUFzQixFQUFFLEtBQWtCO1FBQ3BELEtBQUssQ0FBQyxLQUFLLENBQUMsQ0FBQztRQUNiLElBQUksQ0FBQyxNQUFNLENBQUMsR0FBRyxNQUFNLENBQUM7UUFDdEIsSUFBSSxDQUFDLEtBQUssQ0FBQyxHQUFHLEtBQUssQ0FBQztJQUN0QixDQUFDO0lBRU0sTUFBTSxDQUFDLE1BQU0sQ0FBQyxNQUFzQixFQUFFLFdBQXdCO1FBQ25FLE9BQU8sZ0VBQWEsQ0FBQyxJQUFJLGdCQUFnQixDQUFDLE1BQU0sRUFBRSxXQUFXLENBQUMsQ0FBQyxDQUFDO0lBQ2xFLENBQUM7Q0FDRjtBQUFBLENBQUM7Ozs7Ozs7Ozs7Ozs7Ozs7QUM5QkY7Ozs7Ozs7R0FPRztBQUVJLE1BQU0sZ0JBQWdCLEdBQUcsT0FBTyxDQUFDO0FBQ2pDLE1BQU0sa0JBQWtCLEdBQUcsU0FBUyxDQUFDOzs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7O0FDVjVDOzs7Ozs7O0dBT0c7QUFFb0Y7QUFDbkI7QUFFWTtBQUNvQjtBQUN6QztBQUNGO0FBQ0w7QUFDSjtBQUNkO0FBQ3NCO0FBQ1Q7QUFFL0MsTUFBTSxNQUFNLEdBQUcsMkNBQU0sQ0FBQyxNQUFNLENBQUMsdUZBQWUsQ0FBQyxDQUFDO0FBRTlDLE1BQU0sS0FBSyxHQUFHLE1BQU0sQ0FBQyxPQUFPLENBQUMsQ0FBQztBQUM5QixNQUFNLElBQUksR0FBRyxNQUFNLENBQUMsTUFBTSxDQUFDLENBQUM7QUFDNUIsTUFBTSxNQUFNLEdBQUcsTUFBTSxDQUFDLFFBQVEsQ0FBQyxDQUFDO0FBRWhDLFNBQVMsZ0JBQWdCLENBQXVCLFVBQXFDLEVBQUUsR0FBZ0IsRUFBRSxLQUFrQixFQUFFLElBQVk7SUFDdkksSUFBSSxPQUFPLElBQUksS0FBSyxRQUFRO1FBQzFCLE1BQU0sSUFBSSxLQUFLLENBQUMsV0FBVyxJQUFJLHNCQUFzQixDQUFDLENBQUM7SUFFekQsSUFBSSxDQUFDLElBQUk7UUFDUCxNQUFNLElBQUksS0FBSyxDQUFDLDBDQUEwQyxDQUFDLENBQUM7SUFFOUQsSUFBSSxHQUFHLENBQUMsYUFBYSxDQUFDLElBQUksQ0FBQztRQUN6QixNQUFNLElBQUksS0FBSyxDQUFDLFdBQVcsSUFBSSxVQUFVLENBQUMsQ0FBQztJQUU3QyxJQUFJLENBQUUsa0RBQVUsRUFBRSxzREFBYyxDQUFFLENBQUMsUUFBUSxDQUFDLElBQUksQ0FBQztRQUMvQyxNQUFNLElBQUksS0FBSyxDQUFDLFdBQVcsSUFBSSxvQkFBb0IsQ0FBQyxDQUFDO0lBRXZELE1BQU0sTUFBTSxHQUFHLElBQUksVUFBVSxDQUFDLElBQUksRUFBRSxLQUFLLENBQUMsVUFBVSxFQUFFLEtBQUssQ0FBQyxVQUFVLENBQUMsQ0FBQztJQUN4RSxHQUFHLENBQUMsYUFBYSxDQUFDLElBQUksRUFBRSxNQUFNLENBQUMsQ0FBQztJQUNoQyxPQUFPLE1BQU0sQ0FBQztBQUNoQixDQUFDO0FBRU0sTUFBTSxlQUFnQixTQUFRLDZEQUFjO0lBQ3pDLENBQUMsSUFBSSxDQUFDLENBQWM7SUFDcEIsQ0FBQyxNQUFNLENBQUMsQ0FBYztJQUN0QixDQUFDLEtBQUssQ0FBQyxDQUFjO0lBRTdCLFlBQW1CLElBQWlCLEVBQUUsV0FBd0I7UUFDNUQsS0FBSyxDQUFDLFdBQVcsQ0FBQyxDQUFDO1FBQ25CLElBQUksQ0FBQyxJQUFJLENBQUMsR0FBRyxJQUFJLENBQUM7UUFDbEIsSUFBSSxDQUFDLE1BQU0sQ0FBQyxHQUFHLFdBQVcsQ0FBQztRQUMzQixJQUFJLENBQUMsS0FBSyxDQUFDLEdBQUcsb0RBQVcsQ0FBQyxXQUFXLENBQUMsV0FBVyxDQUFDLENBQUM7SUFDckQsQ0FBQztJQUVNLE1BQU0sQ0FBQyxNQUFNLENBQUMsSUFBaUIsRUFBRSxXQUF3QjtRQUM5RCxPQUFPLGdFQUFhLENBQUMsSUFBSSxlQUFlLENBQUMsSUFBSSxFQUFFLFdBQVcsQ0FBQyxDQUFDLENBQUM7SUFDL0QsQ0FBQztJQUVNLGlCQUFpQjtRQUN0QixPQUFPLG9EQUFXLENBQUMsbUJBQW1CLENBQUMsSUFBSSxDQUFDLE1BQU0sQ0FBQyxFQUFFLDZEQUFxQixDQUFDLENBQUM7SUFDOUUsQ0FBQztJQUVNLGlCQUFpQixDQUFDLE1BQTJCO1FBQ2xELElBQUksQ0FBQyxJQUFJLENBQUMsQ0FBQyxpQkFBaUIsQ0FBQyxJQUFJLENBQUMsTUFBTSxDQUFDLEVBQUUsTUFBTSxDQUFDLENBQUM7SUFDckQsQ0FBQztJQUVNLHFCQUFxQixDQUFDLEdBQUcsSUFBVztRQUN6QyxNQUFNLFNBQVMsR0FBRyxJQUFJLENBQUMsS0FBSyxDQUFDLENBQUMsVUFBVSxDQUFDO1FBQ3pDLEtBQUssTUFBTSxJQUFJLElBQUksSUFBSSxDQUFDLElBQUksRUFBRSxFQUFFLENBQUM7WUFDL0IsSUFBSSxDQUFDLEtBQUssQ0FBQyxDQUFDLFFBQVEsQ0FBQyxJQUFJLENBQUMsU0FBUyxDQUFDLE9BQU8sQ0FBQyxJQUFJLENBQUMsQ0FBQyxDQUFDO1FBQ3JELENBQUM7SUFDSCxDQUFDO0lBRU0sZUFBZSxDQUFDLFNBQWMsRUFBRSxTQUFlO1FBQ3BELElBQUksQ0FBQyxJQUFJLENBQUMsQ0FBQyxlQUFlLENBQUMsSUFBSSxDQUFDLE1BQU0sQ0FBQyxFQUFFLFNBQVMsRUFBRSxTQUFTLENBQUMsQ0FBQztJQUNqRSxDQUFDO0lBRU0sZUFBZSxDQUFDLFlBQW1DLEVBQUUsTUFBVztRQUNyRSxNQUFNLFdBQVcsR0FBRyxvREFBVyxDQUFDLGdCQUFnQixDQUFDLElBQUksQ0FBQyxNQUFNLENBQUMsQ0FBQyxDQUFDO1FBQy9ELG9EQUFXLENBQUMseUJBQXlCLENBQUMsV0FBVyxFQUFFLDZEQUFxQixFQUFFLE1BQU0sQ0FBQyxDQUFDO1FBQ2xGLG9EQUFXLENBQUMsR0FBRyxDQUFDLFdBQVcsRUFBRSxlQUFlLEVBQUUsWUFBWSxDQUFDLENBQUM7UUFFNUQsTUFBTSxTQUFTLEdBQUcsb0RBQVcsQ0FBQyxHQUFHLENBQUMsV0FBVyxFQUFFLFlBQVksQ0FBaUIsQ0FBQztRQUM3RSxNQUFNLFNBQVMsR0FBRyxvREFBVyxDQUFDLEdBQUcsQ0FBQyxXQUFXLEVBQUUsWUFBWSxDQUFpQixDQUFDO1FBRTdFLElBQUksU0FBUyxHQUFHLG9EQUFXLENBQUMsR0FBRyxDQUFDLFdBQVcsRUFBRSxjQUFjLENBQUMsQ0FBQztRQUM3RCxJQUFJLFNBQVM7WUFDWCxTQUFTLEdBQUcsU0FBUyxDQUFDLE9BQU8sQ0FBQyxTQUFTLENBQUMsQ0FBQztRQUUzQyxJQUFJLFVBQVUsR0FBRyxvREFBVyxDQUFDLEdBQUcsQ0FBQyxXQUFXLEVBQUUsZUFBZSxDQUFDLENBQUM7UUFDL0QsSUFBSSxDQUFDLFVBQVU7WUFDYixNQUFNLElBQUksS0FBSyxDQUFDLGdEQUFnRCxDQUFDLENBQUM7UUFFcEUsVUFBVSxHQUFHLFNBQVMsQ0FBQyxPQUFPLENBQUMsVUFBVSxDQUFDLENBQUM7UUFFM0MsTUFBTSxPQUFPLEdBQUc7WUFDZCxXQUFXO1lBQ1gsSUFBSSxFQUFFLG9EQUFXLENBQUMsR0FBRyxDQUFDLFdBQVcsRUFBRSxhQUFhLENBQUMsSUFBSSw2REFBYyxDQUFDLEVBQUUsQ0FBQztZQUN2RSxZQUFZO1lBQ1osTUFBTSxFQUFFLFVBQVU7WUFDbEIsS0FBSyxFQUFFLFNBQVM7WUFDaEIsU0FBUztZQUNULFNBQVM7U0FDVixDQUFDO1FBRUYsT0FBTyxJQUFJLENBQUMsSUFBSSxDQUFDLENBQUMsZUFBZSxDQUFDLE9BQU8sQ0FBQyxDQUFDO0lBQzdDLENBQUM7SUFFTSxNQUFNLENBQUMsSUFBWTtRQUN4QixPQUFPLG9FQUFnQixDQUFDLE1BQU0sQ0FBQyxJQUFJLENBQUMsSUFBSSxDQUFDLENBQUMsYUFBYSxDQUFDLElBQUksQ0FBQyxFQUFFLElBQUksQ0FBQyxLQUFLLENBQUMsQ0FBQyxDQUFDO0lBQzlFLENBQUM7SUFFTSxNQUFNLENBQUMsSUFBWTtRQUN4QixPQUFPLElBQUksQ0FBQyxJQUFJLENBQUMsQ0FBQyxNQUFNLENBQUMsSUFBSSxDQUFDLENBQUM7SUFDakMsQ0FBQztJQUVNLE9BQU8sQ0FBQyxLQUFVLEVBQUUsTUFBVztRQUNwQyxLQUFLLE1BQU0sRUFBRSxJQUFJLENBQUUsS0FBSyxDQUFFLENBQUMsSUFBSSxFQUFFLEVBQUUsQ0FBQztZQUNsQyxJQUFJLElBQUksR0FBRyxDQUFDLEVBQUUsWUFBWSxpRUFBZSxDQUFDLENBQUMsQ0FBQyxDQUFDLHdEQUFVLENBQUMsTUFBTSxDQUFDLEVBQUUsQ0FBQyxVQUFVLENBQUMsQ0FBQyxDQUFDLENBQUMsRUFBRSxDQUFDO1lBRW5GLElBQUksV0FBOEMsQ0FBQztZQUNuRCxJQUFJLE9BQU8sQ0FBQztZQUNaLElBQUksT0FBTyxNQUFNLEtBQUssUUFBUTtnQkFDNUIsV0FBVyxHQUFHLE1BQU0sQ0FBQztpQkFDbEIsSUFBSSxNQUFNLEVBQUUsQ0FBQztnQkFDaEIsV0FBVyxHQUFHLE1BQU0sQ0FBQyxXQUFXLENBQUM7Z0JBQ2pDLE9BQU8sR0FBRyxNQUFNLENBQUMsT0FBTyxDQUFDO1lBQzNCLENBQUM7WUFFRCxJQUFJLENBQUMsV0FBVztnQkFDZCxNQUFNLElBQUksS0FBSyxDQUFDLHdDQUF3QyxDQUFDLENBQUM7WUFFNUQsSUFBSSxPQUFPO2dCQUNULE9BQU8sR0FBRyxJQUFJLENBQUMsS0FBSyxDQUFDLENBQUMsVUFBVSxDQUFDLE9BQU8sQ0FBQyxPQUFPLENBQUMsQ0FBQztZQUVwRCxJQUFJLE9BQU8sSUFBSSxLQUFLLFFBQVEsSUFBSSxJQUFJLFlBQVksdURBQVksRUFBRSxDQUFDO2dCQUM3RCxJQUFJLEdBQUcsSUFBSSxDQUFDLEtBQUssQ0FBQyxDQUFDLFVBQVUsQ0FBQyxPQUFPLENBQUMsSUFBSSxDQUFDLFFBQVEsRUFBRSxDQUFDLENBQUM7Z0JBQ3ZELElBQUksR0FBRyxtREFBUSxDQUFDLE1BQU0sQ0FBQyxJQUFJLENBQUMsQ0FBQztnQkFDN0IsT0FBTyxHQUFHLE9BQU8sSUFBSSxJQUFJLENBQUMsT0FBTyxFQUFFLENBQUM7WUFDdEMsQ0FBQztpQkFDSSxJQUFJLENBQUMsQ0FBQyxJQUFJLFlBQVksd0RBQVUsQ0FBQyxFQUFFLENBQUM7Z0JBQ3ZDLE1BQU0sSUFBSSxLQUFLLENBQUMsMEJBQTBCLElBQUksRUFBRSxDQUFDLENBQUM7WUFDcEQsQ0FBQztZQUVELElBQUksQ0FBQyxJQUFJLENBQUMsQ0FBQyxlQUFlLENBQUMsSUFBSSxFQUFFLHVEQUFZLENBQUMsTUFBTSxDQUFDLElBQUksQ0FBQyxLQUFLLENBQUMsQ0FBQyxjQUFjLENBQUMsT0FBTyxDQUFDLFdBQVcsQ0FBQyxDQUFDLEVBQUUsT0FBTyxDQUFDLENBQUM7UUFDbEgsQ0FBQztJQUNILENBQUM7SUFFTSxnQkFBZ0IsQ0FBQyxJQUFZLEVBQUUsR0FBRyxPQUFjO1FBQ3JELE1BQU0sTUFBTSxHQUFHLGdCQUFnQixDQUFDLHVEQUFhLEVBQUUsSUFBSSxDQUFDLElBQUksQ0FBQyxFQUFFLElBQUksQ0FBQyxLQUFLLENBQUMsRUFBRSxJQUFJLENBQUMsQ0FBQztRQUM5RSxNQUFNLENBQUMsU0FBUyxDQUFDLElBQUksQ0FBQyxLQUFLLENBQUMsQ0FBQyxxQkFBcUIsQ0FBQyxDQUFDO1FBQ3BELE1BQU0sQ0FBQyxTQUFTLENBQUMsSUFBSSxDQUFDLEtBQUssQ0FBQyxDQUFDLHFCQUFxQixDQUFDLENBQUM7UUFDcEQsTUFBTSxDQUFDLGNBQWMsQ0FBQyxHQUFHLElBQUksQ0FBQyxLQUFLLENBQUMsQ0FBQyxtQkFBbUIsQ0FBQyxDQUFDO1FBRTFELE9BQU8sb0VBQWdCLENBQUMsTUFBTSxDQUFDLE1BQU0sRUFBRSxJQUFJLENBQUMsS0FBSyxDQUFDLEVBQUUsR0FBRyxPQUFPLENBQUMsQ0FBQztJQUNsRSxDQUFDO0lBRU0sZ0JBQWdCLENBQUMsSUFBUyxFQUFFLEdBQUcsT0FBYztRQUNsRCxNQUFNLE1BQU0sR0FBRyxnQkFBZ0IsQ0FBQyx1REFBYSxFQUFFLElBQUksQ0FBQyxJQUFJLENBQUMsRUFBRSxJQUFJLENBQUMsS0FBSyxDQUFDLEVBQUUsSUFBSSxDQUFDLENBQUM7UUFDOUUsTUFBTSxDQUFDLFNBQVMsQ0FBQyxJQUFJLENBQUMsS0FBSyxDQUFDLENBQUMscUJBQXFCLENBQUMsQ0FBQztRQUNwRCxNQUFNLENBQUMsU0FBUyxDQUFDLElBQUksQ0FBQyxLQUFLLENBQUMsQ0FBQyxxQkFBcUIsQ0FBQyxDQUFDO1FBQ3BELE1BQU0sQ0FBQyxjQUFjLENBQUMsR0FBRyxJQUFJLENBQUMsS0FBSyxDQUFDLENBQUMsbUJBQW1CLENBQUMsQ0FBQztRQUUxRCxPQUFPLG9FQUFnQixDQUFDLE1BQU0sQ0FBQyxNQUFNLEVBQUUsSUFBSSxDQUFDLEtBQUssQ0FBQyxFQUFFLEdBQUcsT0FBTyxDQUFDLENBQUM7SUFDbEUsQ0FBQztJQUVNLGdCQUFnQixDQUFDLElBQVMsRUFBRSxHQUFHLE9BQWM7UUFDbEQsTUFBTSxNQUFNLEdBQUcsZ0JBQWdCLENBQUMsdURBQWEsRUFBRSxJQUFJLENBQUMsSUFBSSxDQUFDLEVBQUUsSUFBSSxDQUFDLEtBQUssQ0FBQyxFQUFFLElBQUksQ0FBQyxDQUFDO1FBQzlFLE1BQU0sQ0FBQyxTQUFTLENBQUMsSUFBSSxDQUFDLEtBQUssQ0FBQyxDQUFDLHFCQUFxQixDQUFDLENBQUM7UUFDcEQsTUFBTSxDQUFDLFNBQVMsQ0FBQyxJQUFJLENBQUMsS0FBSyxDQUFDLENBQUMscUJBQXFCLENBQUMsQ0FBQztRQUNwRCxNQUFNLENBQUMsY0FBYyxDQUFDLEdBQUcsSUFBSSxDQUFDLEtBQUssQ0FBQyxDQUFDLG1CQUFtQixDQUFDLENBQUM7UUFFMUQsT0FBTyxvRUFBZ0IsQ0FBQyxNQUFNLENBQUMsTUFBTSxFQUFFLElBQUksQ0FBQyxLQUFLLENBQUMsRUFBRSxHQUFHLE9BQU8sQ0FBQyxDQUFDO0lBQ2xFLENBQUM7SUFFTSxhQUFhLENBQUMsSUFBUyxFQUFFLEdBQUcsT0FBYztRQUMvQyxNQUFNLE1BQU0sR0FBRyxnQkFBZ0IsQ0FBQyxvREFBVSxFQUFFLElBQUksQ0FBQyxJQUFJLENBQUMsRUFBRSxJQUFJLENBQUMsS0FBSyxDQUFDLEVBQUUsSUFBSSxDQUFDLENBQUM7UUFDM0UsTUFBTSxDQUFDLFNBQVMsQ0FBQyxJQUFJLENBQUMsS0FBSyxDQUFDLENBQUMsaUJBQWlCLENBQUMsQ0FBQztRQUNoRCxNQUFNLENBQUMsY0FBYyxDQUFDLEdBQUcsSUFBSSxDQUFDLEtBQUssQ0FBQyxDQUFDLGdCQUFnQixDQUFDLENBQUM7UUFFdkQsT0FBTyxvRUFBZ0IsQ0FBQyxNQUFNLENBQUMsTUFBTSxFQUFFLElBQUksQ0FBQyxLQUFLLENBQUMsRUFBRSxHQUFHLE9BQU8sQ0FBQyxDQUFDO0lBQ2xFLENBQUM7SUFFTSxhQUFhLENBQUMsTUFBVyxFQUFFLE1BQVc7UUFDM0MsSUFBSSxDQUFDLElBQUksQ0FBQyxDQUFDLGFBQWEsQ0FBQyxJQUFJLENBQUMsTUFBTSxDQUFDLEVBQUUsTUFBTSxFQUFFLE1BQU0sQ0FBQyxDQUFDO0lBQ3pELENBQUM7Q0FDRjtBQUFBLENBQUM7Ozs7Ozs7Ozs7Ozs7Ozs7O0FDOUxGOzs7Ozs7O0dBT0c7QUFFMEQ7QUFFVjtBQUduRCxNQUFNLE1BQU0sR0FBRyxNQUFNLENBQUMsUUFBUSxDQUFDLENBQUM7QUFDaEMsTUFBTSxPQUFPLEdBQUcsTUFBTSxDQUFDLFNBQVMsQ0FBQyxDQUFDO0FBRTNCLE1BQU0sZUFBZ0IsU0FBUSxzRUFBb0I7SUFDL0MsQ0FBQyxNQUFNLENBQUMsQ0FBYTtJQUNyQixDQUFDLE9BQU8sQ0FBQyxDQUFlO0lBRWhDLFlBQW9CLE1BQWtCLEVBQUUsT0FBcUI7UUFDM0QsS0FBSyxFQUFFLENBQUM7UUFDUixJQUFJLENBQUMsTUFBTSxDQUFDLEdBQUcsTUFBTSxDQUFDO1FBQ3RCLElBQUksQ0FBQyxPQUFPLENBQUMsR0FBRyxDQUFFLEdBQUcsT0FBTyxDQUFFLENBQUM7SUFDakMsQ0FBQztJQUVNLE1BQU0sQ0FBQyxNQUFNLENBQUMsTUFBa0IsRUFBRSxPQUFxQjtRQUM1RCxPQUFPLE1BQU0sQ0FBQyxJQUFJLENBQUMsSUFBSSxlQUFlLENBQUMsTUFBTSxFQUFFLE9BQU8sQ0FBQyxDQUFDLENBQUM7SUFDM0QsQ0FBQztJQUVNLFdBQVcsQ0FBQyxRQUFnQjtRQUNqQyxNQUFNLElBQUksS0FBSyxDQUFDLGlCQUFpQixDQUFDLENBQUM7SUFDckMsQ0FBQztJQUVNLGNBQWMsQ0FBQyxHQUFHLFdBQXFCO1FBQzVDLEtBQUssTUFBTSxJQUFJLElBQUksNERBQVksQ0FBQyxvQkFBb0IsQ0FBQyxXQUFXLENBQUMsSUFBSSxFQUFFLENBQUM7WUFDdEUsSUFBSSxDQUFDLE9BQU8sQ0FBQyxDQUFDLE9BQU8sQ0FBQyxDQUFDLENBQUMsRUFBRSxDQUFDLENBQUMsQ0FBQyxhQUFhLENBQUMsSUFBSSxDQUFDLENBQUMsQ0FBQztJQUN0RCxDQUFDO0lBRU0sZUFBZSxDQUFDLEdBQUcsT0FBaUI7UUFDekMsS0FBSyxNQUFNLElBQUksSUFBSSw0REFBWSxDQUFDLHVCQUF1QixDQUFDLE9BQU8sQ0FBQyxJQUFJLEVBQUUsQ0FBQztZQUNyRSxJQUFJLENBQUMsT0FBTyxDQUFDLENBQUMsT0FBTyxDQUFDLENBQUMsQ0FBQyxFQUFFLENBQUMsQ0FBQyxDQUFDLGdCQUFnQixDQUFDLElBQUksQ0FBQyxDQUFDLENBQUM7SUFDekQsQ0FBQztJQUVNLE1BQU07UUFDWCxPQUFPLElBQUksQ0FBQyxPQUFPLENBQUMsQ0FBQztJQUN2QixDQUFDO0NBQ0Y7QUFBQSxDQUFDOzs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7O0FDaERGOzs7Ozs7O0dBT0c7QUFFcUQ7QUFHTjtBQUNLO0FBQ0Y7QUFDTztBQUNiO0FBQ1U7QUFDVjtBQUNJO0FBQ2pCO0FBRWxDLE1BQU0sTUFBTSxHQUFHLDJDQUFNLENBQUMsTUFBTSxDQUFDLHdGQUFlLENBQUMsQ0FBQztBQUU5QyxNQUFNLEtBQUssR0FBRyxNQUFNLENBQUMsT0FBTyxDQUFDLENBQUM7QUFDOUIsTUFBTSxJQUFJLEdBQUcsTUFBTSxDQUFDLE1BQU0sQ0FBQyxDQUFDO0FBRTVCLE1BQU0sbUJBQW1CLEdBQUc7SUFDMUIsR0FBRyxFQUFFLENBQUUsTUFBTSxFQUFFLElBQUksQ0FBRTtJQUNyQixDQUFDLEVBQUksQ0FBRSxJQUFJLENBQUU7SUFDYixHQUFHLEVBQUUsQ0FBQyxNQUFNLEVBQUUsS0FBSyxFQUFFLE1BQU0sQ0FBRTtDQUM5QixDQUFDO0FBRUYsU0FBUyxpQkFBaUIsQ0FBQyxRQUFnQjtJQUN6QyxPQUFPLG1CQUFtQixDQUFDLGNBQWMsQ0FBQyxRQUFRLENBQUMsQ0FBQztBQUN0RCxDQUFDO0FBRUQsU0FBUyxlQUFlLENBQUMsUUFBZ0I7SUFDdkMsTUFBTSxpQkFBaUIsR0FBRyxRQUFRLENBQUMsV0FBVyxFQUFFLENBQUM7SUFDakQsS0FBSyxNQUFNLENBQUMsUUFBUSxFQUFFLFVBQVUsQ0FBQyxJQUFJLE1BQU0sQ0FBQyxPQUFPLENBQUMsbUJBQW1CLENBQUMsRUFBRSxDQUFDO1FBQ3pFLEtBQUssTUFBTSxJQUFJLElBQUksVUFBVSxFQUFFLENBQUM7WUFDOUIsSUFBSSxpQkFBaUIsQ0FBQyxRQUFRLENBQUMsSUFBSSxDQUFDO2dCQUNsQyxPQUFPLFFBQVEsQ0FBQztRQUNwQixDQUFDO0lBQ0gsQ0FBQztJQUNELE9BQU8sRUFBRSxDQUFDO0FBQ1osQ0FBQztBQUVELFNBQVMsWUFBWSxDQUFDLEtBQWE7SUFDakMsSUFBSSxpQkFBaUIsQ0FBQyxLQUFLLENBQUM7UUFDMUIsT0FBTyxLQUFLLENBQUM7SUFDZixNQUFNLElBQUksS0FBSyxDQUFDLGFBQWEsS0FBSyxvQkFBb0IsQ0FBQyxDQUFDO0FBQzFELENBQUM7QUFFRCxTQUFTLGNBQWMsQ0FBQyxNQUFrQixFQUFFLFNBQXVCLEVBQUUsVUFBbUIsRUFBRSxPQUErQztJQUN2SSxJQUFJLE9BQU8sWUFBWSxnRUFBYztRQUNuQyxNQUFNLENBQUMsVUFBVSxDQUFDLFVBQVUsRUFBRSxPQUFPLENBQUMsQ0FBQztTQUNwQyxJQUFJLE9BQU8sT0FBTyxLQUFLLFFBQVE7UUFDbEMsTUFBTSxDQUFDLFVBQVUsQ0FBQyxVQUFVLEVBQUUsdURBQU8sQ0FBQyxNQUFNLENBQUMsU0FBUyxDQUFDLE9BQU8sQ0FBQyxPQUFPLENBQUMsQ0FBQyxDQUFDLENBQUM7U0FDdkUsSUFBSSxPQUFPLFlBQVksNERBQVk7UUFDdEMsTUFBTSxDQUFDLFVBQVUsQ0FBQyxVQUFVLEVBQUUsdURBQU8sQ0FBQyxNQUFNLENBQUMsT0FBTyxDQUFDLENBQUMsQ0FBQzs7UUFFdkQsTUFBTSxJQUFJLEtBQUssQ0FBQyx3QkFBd0IsT0FBTyxFQUFFLENBQUMsQ0FBQztBQUN2RCxDQUFDO0FBRUQsU0FBUyxlQUFlLENBQUMsTUFBa0IsRUFBRSxLQUFrQixFQUFFLFVBQW1CLEVBQUUsR0FBRyxRQUF1RDtJQUM5SSxNQUFNLFNBQVMsR0FBRyxLQUFLLENBQUMsVUFBVSxDQUFDO0lBQ25DLEtBQUssTUFBTSxJQUFJLElBQUksUUFBUSxDQUFDLElBQUksRUFBRTtRQUNoQyxjQUFjLENBQUMsTUFBTSxFQUFFLFNBQVMsRUFBRSxVQUFVLEVBQUUsSUFBSSxDQUFDLENBQUM7QUFDeEQsQ0FBQztBQUVELFNBQVMsY0FBYyxDQUFDLEtBQVU7SUFDaEMsSUFBSSxPQUFPLEtBQUssS0FBSyxRQUFRO1FBQzNCLE9BQU8sS0FBSyxDQUFDO1NBQ1YsSUFBSSxLQUFLLFlBQVksd0RBQVU7UUFDbEMsT0FBTyxLQUFLLENBQUM7U0FDVixJQUFJLEtBQUssWUFBWSw0REFBWTtRQUNwQyxPQUFPLEtBQUssQ0FBQyxNQUFNLEVBQUUsQ0FBQzs7UUFFdEIsTUFBTSxJQUFJLFNBQVMsQ0FBQyxjQUFjLEtBQUssY0FBYyxDQUFDLENBQUM7QUFDM0QsQ0FBQztBQUVNLE1BQU0sZ0JBQWlCLFNBQVEsaUVBQWU7SUFDbkQsQ0FBQyxJQUFJLENBQUMsQ0FBYTtJQUNuQixDQUFDLEtBQUssQ0FBQyxDQUFjO0lBRXJCLFlBQW9CLElBQWdCLEVBQUUsS0FBa0I7UUFDdEQsS0FBSyxFQUFFLENBQUM7UUFDUixJQUFJLENBQUMsSUFBSSxDQUFDLEdBQUcsSUFBSSxDQUFDO1FBQ2xCLElBQUksQ0FBQyxLQUFLLENBQUMsR0FBRyxLQUFLLENBQUM7UUFFcEIsSUFBSSxDQUFDLElBQUksQ0FBQyxDQUFDLDBCQUEwQixDQUFDLElBQUksQ0FBQyxLQUFLLENBQUMsQ0FBQyx5QkFBeUIsQ0FBQyxDQUFDO1FBRTdFLGVBQWUsQ0FBQyxJQUFJLENBQUMsSUFBSSxDQUFDLEVBQUUsSUFBSSxDQUFDLEtBQUssQ0FBQyxFQUFFLEtBQUssRUFBRSxHQUFHLElBQUksQ0FBQyxLQUFLLENBQUMsQ0FBQyxRQUFRLENBQUMsQ0FBQztJQUMzRSxDQUFDO0lBRU0sTUFBTSxDQUFDLE1BQU0sQ0FBQyxJQUFnQixFQUFFLEtBQWtCLEVBQUUsR0FBRyxPQUFjO1FBQzFFLE1BQU0sTUFBTSxHQUFHLE1BQU0sQ0FBQyxJQUFJLENBQUMsSUFBSSxnQkFBZ0IsQ0FBQyxJQUFJLEVBQUUsS0FBSyxDQUFDLENBQUMsQ0FBQztRQUM5RCxNQUFNLENBQUMsVUFBVSxDQUFDLEdBQUcsT0FBTyxDQUFDLENBQUM7UUFDOUIsT0FBTyxNQUFNLENBQUM7SUFDaEIsQ0FBQztJQUVELElBQVcsVUFBVTtRQUNuQixPQUFPLElBQUksQ0FBQyxJQUFJLENBQUMsQ0FBQyxVQUFVLENBQUM7SUFDL0IsQ0FBQztJQUVELElBQVcsVUFBVTtRQUNuQixPQUFPLElBQUksQ0FBQyxJQUFJLENBQUMsQ0FBQyxVQUFVLENBQUM7SUFDL0IsQ0FBQztJQUVELElBQVcsUUFBUTtRQUNqQixPQUFPLElBQUksQ0FBQyxJQUFJLENBQUMsQ0FBQyxRQUFRLENBQUM7SUFDN0IsQ0FBQztJQUVELElBQVcsT0FBTztRQUNoQixPQUFPLElBQUksQ0FBQyxJQUFJLENBQUMsQ0FBQyxPQUFPLENBQUM7SUFDNUIsQ0FBQztJQUVNLFNBQVMsQ0FBQyxLQUFVO1FBQ3pCLElBQUksQ0FBQyxJQUFJLENBQUMsQ0FBQyxTQUFTLENBQUMsK0RBQVksQ0FBQyxLQUFLLENBQUMsQ0FBQyxDQUFDO0lBQzVDLENBQUM7SUFFTSxTQUFTLENBQUMsS0FBVTtRQUN6QixJQUFJLENBQUMsSUFBSSxDQUFDLENBQUMsU0FBUyxDQUFDLCtEQUFZLENBQUMsS0FBSyxDQUFDLENBQUMsQ0FBQztJQUM1QyxDQUFDO0lBRU0sYUFBYSxDQUFDLEtBQVU7UUFDN0IsSUFBSSxDQUFDLElBQUksQ0FBQyxDQUFDLGFBQWEsQ0FBQywrREFBWSxDQUFDLEtBQUssQ0FBQyxDQUFDLENBQUM7SUFDaEQsQ0FBQztJQUVNLFVBQVUsQ0FBQyxHQUFHLE9BQWtFO1FBQ3JGLE1BQU0sS0FBSyxHQUFHLElBQUksQ0FBQyxLQUFLLENBQUMsQ0FBQztRQUMxQixLQUFLLE1BQU0sSUFBSSxJQUFJLE9BQU8sQ0FBQyxJQUFJLEVBQUUsRUFBRSxDQUFDO1lBQ2xDLElBQUksT0FBTyxJQUFJLEtBQUssUUFBUSxJQUFJLElBQUksWUFBWSw0REFBWSxFQUFFLENBQUM7Z0JBQzdELE1BQU0sUUFBUSxHQUFHLEtBQUssQ0FBQyxVQUFVLENBQUMsT0FBTyxDQUFDLElBQUksQ0FBQyxDQUFDO2dCQUNoRCxNQUFNLFFBQVEsR0FBRyxlQUFlLENBQUMsUUFBUSxDQUFDLE1BQU0sRUFBRSxDQUFDLENBQUM7Z0JBQ3BELElBQUksWUFBWSxHQUFHLEVBQUUsQ0FBQztnQkFDdEIsTUFBTSxhQUFhLEdBQUcsRUFBRSxDQUFDO2dCQUV6QixJQUFJLFFBQVEsRUFBRSxDQUFDO29CQUNiLFlBQVksR0FBSSxLQUFhLENBQUMsUUFBUSxHQUFHLFdBQVcsQ0FBQyxDQUFDO29CQUN0RCxNQUFNLGVBQWUsR0FBSSxLQUFhLENBQUMsR0FBRyxRQUFRLFFBQVEsQ0FBQztvQkFDM0QsSUFBSSxlQUFlLEVBQUUsQ0FBQzt3QkFDcEIsYUFBYSxDQUFDLElBQUksQ0FBQyxHQUFHLGVBQWUsQ0FBQyxDQUFDO29CQUN6QyxDQUFDO29CQUVELE1BQU0sZUFBZSxHQUFJLEtBQWEsQ0FBQyxHQUFHLFFBQVEsVUFBVSxLQUFLLENBQUMsVUFBVSxDQUFDLFdBQVcsRUFBRSxFQUFFLENBQUM7b0JBQzdGLElBQUksZUFBZSxFQUFFLENBQUM7d0JBQ3BCLGFBQWEsQ0FBQyxJQUFJLENBQUMsR0FBRyxlQUFlLENBQUMsQ0FBQztvQkFDekMsQ0FBQztvQkFFRCxJQUFJLENBQUMsSUFBSSxDQUFDLElBQUksQ0FBQyxDQUFDLFFBQVEsSUFBSSxDQUFDLElBQUksQ0FBQyxJQUFJLENBQUMsQ0FBQyxRQUFRLEtBQUssR0FBRyxJQUFJLFFBQVEsS0FBSyxLQUFLLENBQUMsRUFBRSxDQUFDO3dCQUNoRixJQUFJLENBQUMsSUFBSSxDQUFDLENBQUMsUUFBUSxHQUFHLFFBQVEsQ0FBQzt3QkFDL0IsSUFBSSxDQUFDLElBQUksQ0FBQyxDQUFDLFlBQVksR0FBRyxZQUFZLENBQUM7d0JBQ3ZDLElBQUksQ0FBQyxJQUFJLENBQUMsQ0FBQyxhQUFhLEdBQUcsQ0FBRSxHQUFHLGFBQWEsQ0FBRSxDQUFDO29CQUNsRCxDQUFDO2dCQUNILENBQUM7Z0JBRUQsTUFBTSxNQUFNLEdBQUcsd0RBQVUsQ0FBQyxNQUFNLENBQUMsUUFBUSxFQUFFLEtBQUssQ0FBQyxVQUFVLEVBQUUsQ0FBQyxRQUFRLEVBQUUsUUFBUSxFQUFFLFlBQVksRUFBRSxhQUFhLENBQUMsQ0FBQztnQkFDL0csSUFBSSxDQUFDLElBQUksQ0FBQyxDQUFDLFNBQVMsQ0FBQyxNQUFNLENBQUMsQ0FBQztZQUMvQixDQUFDO2lCQUNJLElBQUksSUFBSSxZQUFZLDhEQUFhO2dCQUNwQyxJQUFJLENBQUMsSUFBSSxDQUFDLENBQUMsU0FBUyxDQUFDLElBQUksQ0FBQyxDQUFDO2lCQUN4QixJQUFJLElBQUksWUFBWSx3REFBVTtnQkFDakMsSUFBSSxDQUFDLElBQUksQ0FBQyxDQUFDLFNBQVMsQ0FBQyxJQUFJLENBQUMsQ0FBQzs7Z0JBRTNCLE1BQU0sSUFBSSxLQUFLLENBQUMsd0JBQXdCLElBQUksRUFBRSxDQUFDLENBQUM7UUFDcEQsQ0FBQztJQUNILENBQUM7SUFFTSxjQUFjLENBQUMsR0FBRyxPQUFjO1FBQ3JDLE1BQU0sTUFBTSxHQUFHLEVBQUUsQ0FBQztRQUNsQixNQUFNLEtBQUssR0FBRyxJQUFJLENBQUMsS0FBSyxDQUFDLENBQUM7UUFDMUIsTUFBTSxXQUFXLEdBQUcsSUFBSSxDQUFDLElBQUksQ0FBQyxDQUFDLGNBQWMsRUFBRSxDQUFDO1FBQ2hELEtBQUssTUFBTSxFQUFFLElBQUksT0FBTyxDQUFDLElBQUksRUFBRSxFQUFFLENBQUM7WUFDaEMsTUFBTSxRQUFRLEdBQUcsS0FBSyxDQUFDLFVBQVUsQ0FBQyxPQUFPLENBQUMsRUFBRSxDQUFDLENBQUMsTUFBTSxFQUFFLENBQUM7WUFDdkQsTUFBTSxHQUFHLEdBQUcsV0FBVyxDQUFDLElBQUksQ0FBQyxDQUFDLENBQUMsRUFBRSxDQUFDLENBQUMsQ0FBQyxJQUFJLENBQUMsTUFBTSxFQUFFLEtBQUssUUFBUSxDQUFDLENBQUM7WUFDaEUsSUFBSSxDQUFDLEdBQUc7Z0JBQ04sTUFBTSxJQUFJLEtBQUssQ0FBQyxnQkFBZ0IsRUFBRSxHQUFHLENBQUMsQ0FBQztZQUN6QyxNQUFNLENBQUMsSUFBSSxDQUFDLEdBQUcsQ0FBQyxDQUFDO1FBQ25CLENBQUM7UUFFRCxPQUFPLGtFQUFlLENBQUMsTUFBTSxDQUFDLElBQUksQ0FBQyxJQUFJLENBQUMsRUFBRSxNQUFNLENBQUMsTUFBTSxDQUFDLENBQUMsQ0FBQyxNQUFNLENBQUMsQ0FBQyxDQUFDLFdBQVcsQ0FBQyxDQUFDO0lBQ2xGLENBQUM7SUFFTSxXQUFXLENBQUMsR0FBRyxRQUF1RDtRQUMzRSxlQUFlLENBQUMsSUFBSSxDQUFDLElBQUksQ0FBQyxFQUFFLElBQUksQ0FBQyxLQUFLLENBQUMsRUFBRSxLQUFLLEVBQUUsR0FBRyxRQUFRLENBQUMsQ0FBQztJQUMvRCxDQUFDO0lBRU0sWUFBWSxDQUFDLEdBQUcsU0FBZ0I7UUFDckMsSUFBSSxDQUFDLElBQUksQ0FBQyxDQUFDLFlBQVksQ0FBQyxHQUFHLFNBQVMsQ0FBQyxDQUFDO0lBQ3hDLENBQUM7SUFFTSxpQkFBaUIsQ0FBQyxHQUFHLE9BQWM7UUFDeEMsS0FBSyxNQUFNLElBQUksSUFBSSw0REFBWSxDQUFDLHVCQUF1QixDQUFDLE9BQU8sQ0FBQyxJQUFJLEVBQUUsQ0FBQztZQUNyRSxJQUFJLENBQUMsSUFBSSxDQUFDLENBQUMsZ0JBQWdCLENBQUMsS0FBSyxFQUFFLElBQUksQ0FBQyxDQUFDO0lBQzdDLENBQUM7SUFFTSxjQUFjLENBQUMsR0FBRyxPQUFjO1FBQ3JDLElBQUksQ0FBQyxJQUFJLENBQUMsQ0FBQyxjQUFjLENBQUMsR0FBRyxPQUFPLENBQUMsQ0FBQztJQUN4QyxDQUFDO0lBRU0sY0FBYyxDQUFDLEdBQUcsV0FBa0I7UUFDekMsS0FBSyxNQUFNLElBQUksSUFBSSw0REFBWSxDQUFDLG9CQUFvQixDQUFDLFdBQVcsQ0FBQyxJQUFJLEVBQUUsQ0FBQztZQUN0RSxJQUFJLENBQUMsSUFBSSxDQUFDLENBQUMsYUFBYSxDQUFDLEtBQUssRUFBRSxJQUFJLENBQUMsQ0FBQztJQUMxQyxDQUFDO0lBRU0sV0FBVyxDQUFDLE9BQVksRUFBRSxJQUFXO1FBQzFDLElBQUksQ0FBQyxJQUFJLENBQUMsQ0FBQyxXQUFXLENBQUMsY0FBYyxDQUFDLE9BQU8sQ0FBQyxFQUFFLElBQUksQ0FBQyxHQUFHLENBQUMsQ0FBQyxDQUFDLEVBQUUsQ0FBQyxjQUFjLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDO0lBQ3BGLENBQUM7SUFFTSxZQUFZLENBQUMsT0FBWSxFQUFFLElBQVc7UUFDM0MsSUFBSSxDQUFDLElBQUksQ0FBQyxDQUFDLFlBQVksQ0FBQyxjQUFjLENBQUMsT0FBTyxDQUFDLEVBQUUsSUFBSSxDQUFDLEdBQUcsQ0FBQyxDQUFDLENBQUMsRUFBRSxDQUFDLGNBQWMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUM7SUFDckYsQ0FBQztJQUVNLDBCQUEwQixDQUFDLEtBQWM7UUFDOUMsSUFBSSxDQUFDLElBQUksQ0FBQyxDQUFDLDBCQUEwQixDQUFDLEtBQUssQ0FBQyxDQUFDO0lBQy9DLENBQUM7SUFFTSxpQkFBaUIsQ0FBQyxHQUFHLFFBQXVEO1FBQ2pGLGVBQWUsQ0FBQyxJQUFJLENBQUMsSUFBSSxDQUFDLEVBQUUsSUFBSSxDQUFDLEtBQUssQ0FBQyxFQUFFLElBQUksRUFBRSxHQUFHLFFBQVEsQ0FBQyxDQUFDO0lBQzlELENBQUM7SUFFTSxvQkFBb0IsQ0FBQyxHQUFHLFdBQWdCO1FBQzdDLEtBQUssTUFBTSxJQUFJLElBQUksNERBQVksQ0FBQyxvQkFBb0IsQ0FBQyxXQUFXLENBQUMsSUFBSSxFQUFFLENBQUM7WUFDdEUsSUFBSSxDQUFDLElBQUksQ0FBQyxDQUFDLGFBQWEsQ0FBQyxJQUFJLEVBQUUsSUFBSSxDQUFDLENBQUM7SUFDekMsQ0FBQztJQUVNLGtCQUFrQixDQUFDLEdBQUcsU0FBZ0I7UUFDM0MsSUFBSSxDQUFDLElBQUksQ0FBQyxDQUFDLGtCQUFrQixDQUFDLEdBQUcsU0FBUyxDQUFDLENBQUM7SUFDOUMsQ0FBQztJQUVNLHVCQUF1QixDQUFDLEdBQUcsT0FBYztRQUM5QyxLQUFLLE1BQU0sSUFBSSxJQUFJLDREQUFZLENBQUMsdUJBQXVCLENBQUMsT0FBTyxDQUFDLElBQUksRUFBRSxDQUFDO1lBQ3JFLElBQUksQ0FBQyxJQUFJLENBQUMsQ0FBQyxnQkFBZ0IsQ0FBQyxJQUFJLEVBQUUsSUFBSSxDQUFDLENBQUM7SUFDNUMsQ0FBQztJQUVNLG9CQUFvQixDQUFDLEdBQUcsT0FBYztRQUMzQyxJQUFJLENBQUMsSUFBSSxDQUFDLENBQUMsb0JBQW9CLENBQUMsR0FBRyxPQUFPLENBQUMsQ0FBQztJQUM5QyxDQUFDO0NBQ0Y7QUFBQSxDQUFDOzs7Ozs7Ozs7Ozs7Ozs7Ozs7OztBQ2hQRjs7Ozs7OztHQU9HO0FBRTBCO0FBRXRCLFNBQVMseUJBQXlCLENBQUMsUUFBZ0IsRUFBRSxJQUFZO0lBQ3RFLElBQUksT0FBTyxJQUFJLEtBQUssV0FBVztRQUM3QixJQUFJLEdBQUcsQ0FBQyxDQUFDO0lBRVgsSUFBSSxVQUFVLEdBQUcsMERBQWMsQ0FBQyxRQUFRLENBQUMsQ0FBQyxLQUFLLENBQUMsc0RBQVEsQ0FBQyxDQUFDO0lBQzFELElBQUksVUFBVSxDQUFDLE1BQU0sR0FBRyxJQUFJO1FBQzFCLFVBQVUsR0FBRyxVQUFVLENBQUMsS0FBSyxDQUFDLFVBQVUsQ0FBQyxNQUFNLEdBQUcsSUFBSSxDQUFDLENBQUM7SUFFMUQsT0FBTyxHQUFHLEdBQUcsVUFBVSxDQUFDLElBQUksQ0FBQyxHQUFHLENBQUMsQ0FBQyxPQUFPLENBQUMsV0FBVyxFQUFFLEdBQUcsQ0FBQyxDQUFDLFdBQVcsRUFBRSxDQUFDO0FBQzVFLENBQUM7QUFFTSxTQUFTLGtCQUFrQixDQUFDLElBQVk7SUFDN0MsT0FBTyxJQUFJLEdBQUcsSUFBSSxDQUFDO0FBQ3JCLENBQUM7QUFFTSxTQUFTLHFCQUFxQixDQUFDLElBQVk7SUFDaEQsT0FBTyxNQUFNLElBQUksS0FBSyxDQUFDO0FBQ3pCLENBQUM7QUFFTSxTQUFTLDBCQUEwQixDQUFDLFFBQWdCO0lBQ3pELE9BQU8scUJBQXFCLENBQUMsaUJBQWlCLEdBQUcseURBQWEsQ0FBQyxRQUFRLENBQUMsQ0FBQyxDQUFDO0FBQzVFLENBQUM7Ozs7Ozs7Ozs7Ozs7OztBQ2hDRDs7Ozs7OztHQU9HO0FBU0YsQ0FBQztBQUU2RCxDQUFDO0FBTS9ELENBQUM7QUFFRixNQUFNLFNBQVMsR0FBRyxHQUFHLENBQUM7QUFDdEIsTUFBTSxXQUFXLEdBQUcsR0FBRyxDQUFDO0FBRXhCLFNBQVMsZUFBZSxDQUFDLENBQU07SUFDN0IsT0FBTyxDQUFDLE9BQU8sQ0FBQyxLQUFLLFFBQVEsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLElBQUksQ0FBQyxTQUFTLENBQUMsQ0FBQyxDQUFDLENBQUM7QUFDekQsQ0FBQztBQUVELFFBQVEsQ0FBQyxDQUFDLGdCQUFnQixDQUFDLFFBQWtCLEVBQUUsU0FBaUI7SUFDOUQsSUFBSSxNQUFNLEdBQUcsQ0FBQyxDQUFDO0lBQ2YsTUFBTSxPQUFPLEdBQWEsRUFBRSxDQUFDO0lBRTdCLFNBQVMsQ0FBQztRQUNSLE1BQU0sSUFBSSxHQUFHLFFBQVEsQ0FBQyxLQUFLLEVBQUUsQ0FBQztRQUM5QixJQUFJLENBQUMsSUFBSTtZQUNQLE1BQU07UUFFUixJQUFJLE9BQU8sQ0FBQyxNQUFNO1lBQ2hCLE1BQU0sSUFBSSxTQUFTLENBQUMsTUFBTSxDQUFDO1FBRTdCLE9BQU8sQ0FBQyxJQUFJLENBQUMsSUFBSSxDQUFDLENBQUM7UUFDbkIsTUFBTSxJQUFJLElBQUksQ0FBQyxNQUFNLENBQUM7UUFFdEIsT0FBTyxNQUFNLEdBQUcsU0FBUyxFQUFFLENBQUM7WUFDMUIsTUFBTSxHQUFHLEdBQUcsT0FBTyxDQUFDLElBQUksQ0FBQyxTQUFTLENBQUMsQ0FBQztZQUNwQyxNQUFNLE9BQU8sR0FBRyxHQUFHLENBQUMsU0FBUyxDQUFDLFNBQVMsQ0FBQyxDQUFDO1lBQ3pDLE9BQU8sQ0FBQyxNQUFNLEdBQUcsQ0FBQyxDQUFDO1lBQ25CLE9BQU8sQ0FBQyxJQUFJLENBQUMsT0FBTyxDQUFDLENBQUM7WUFDdEIsTUFBTSxHQUFHLE9BQU8sQ0FBQyxNQUFNLENBQUM7WUFDeEIsTUFBTSxHQUFHLENBQUMsU0FBUyxDQUFDLENBQUMsRUFBRSxTQUFTLENBQUMsQ0FBQztRQUNwQyxDQUFDO0lBQ0gsQ0FBQztJQUVELE1BQU0sT0FBTyxDQUFDLElBQUksQ0FBQyxTQUFTLENBQUMsQ0FBQztBQUNoQyxDQUFDO0FBRUQsU0FBUyxhQUFhLENBQUMsVUFBbUIsRUFBRSxJQUFZLEVBQUUsT0FBZSxFQUFFLE1BQVcsRUFBRSxPQUFzQjtJQUM1RyxPQUFPLENBQUMsR0FBRyxJQUFXLEVBQUUsRUFBRTtRQUN4QixNQUFNLEdBQUcsR0FBRyxJQUFJLElBQUksRUFBRSxDQUFDO1FBQ3ZCLE1BQU0sUUFBUSxHQUFHLElBQUksQ0FBQyxHQUFHLENBQUMsQ0FBQyxDQUFDLEVBQUUsQ0FBQyxlQUFlLENBQUMsQ0FBQyxDQUFDLENBQUM7UUFFbEQsSUFBSSxDQUFDLFVBQVUsRUFBRSxDQUFDO1lBQ2hCLE9BQU8sQ0FBQyxJQUFJLENBQUMsTUFBTSxFQUFFLFFBQVEsQ0FBQyxJQUFJLENBQUMsU0FBUyxDQUFDLENBQUMsQ0FBQztZQUMvQyxPQUFPO1FBQ1QsQ0FBQztRQUVELE1BQU0sTUFBTSxHQUFHLENBQUUsR0FBRyxDQUFDLFdBQVcsRUFBRSxFQUFFLElBQUksRUFBRSxPQUFPLENBQUUsQ0FBQyxJQUFJLENBQUMsU0FBUyxDQUFDLENBQUM7UUFDcEUsS0FBSyxNQUFNLElBQUksSUFBSSxnQkFBZ0IsQ0FBQyxRQUFRLEVBQUUsV0FBVyxHQUFHLE1BQU0sQ0FBQyxNQUFNLEdBQUcsU0FBUyxDQUFDLE1BQU0sQ0FBQyxFQUFFLENBQUM7WUFDOUYsT0FBTyxDQUFDLElBQUksQ0FBQyxNQUFNLEVBQUUsQ0FBQyxNQUFNLEVBQUUsSUFBSSxDQUFDLENBQUMsSUFBSSxDQUFDLFNBQVMsQ0FBQyxDQUFDLENBQUM7UUFDdkQsQ0FBQztJQUNILENBQUMsQ0FBQztBQUNKLENBQUM7QUFFRCxJQUFJLGVBQWUsR0FBRyxFQUFFLENBQUM7QUFDekIsTUFBTSxVQUFVLEdBQUcsSUFBSSxHQUFHLEVBQXVCLENBQUM7QUFFbEQsTUFBTSxJQUFJLEdBQUcsR0FBRyxFQUFFLEdBQUUsQ0FBQyxDQUFDO0FBRXRCLFNBQVMsVUFBVSxDQUFDLE1BQWUsRUFBRSxPQUFlLEVBQUUsTUFBYztJQUNsRSxNQUFNLENBQUMsS0FBSyxHQUFHLElBQUksQ0FBQztJQUNwQixNQUFNLENBQUMsSUFBSSxHQUFHLElBQUksQ0FBQztJQUNuQixNQUFNLENBQUMsTUFBTSxHQUFHLElBQUksQ0FBQztJQUNyQixNQUFNLENBQUMsSUFBSSxHQUFHLElBQUksQ0FBQztJQUNuQixNQUFNLENBQUMsS0FBSyxHQUFHLElBQUksQ0FBQztJQUNwQixNQUFNLENBQUMsS0FBSyxHQUFHLElBQUksQ0FBQztJQUVwQixJQUFJLEtBQUssR0FBRyxDQUFDLENBQUM7SUFDZCxNQUFNLEtBQUssR0FBUSxFQUFFLENBQUM7SUFDdEIsS0FBSyxNQUFNLElBQUksSUFBSSxNQUFNLENBQUMsS0FBSyxDQUFDLEdBQUcsQ0FBQyxFQUFFLENBQUM7UUFDckMsSUFBSSxJQUFJLEtBQUssR0FBRyxFQUFFLENBQUM7WUFDakIsS0FBSyxHQUFHLENBQUMsQ0FBQztZQUNWLE1BQU07UUFDUixDQUFDO1FBQ0QsSUFBSSxPQUFPLENBQUMsSUFBSSxDQUFDLElBQUksQ0FBQztZQUNwQixLQUFLLEdBQUcsSUFBSSxDQUFDLEdBQUcsQ0FBQyxLQUFLLEVBQUUsUUFBUSxDQUFDLElBQUksQ0FBQyxDQUFDLENBQUM7O1lBRXhDLEtBQUssQ0FBQyxJQUFJLENBQUMsR0FBRyxJQUFJLENBQUM7SUFDdkIsQ0FBQztJQUVELE1BQU0sQ0FBQyxLQUFLLEdBQUcsYUFBYSxDQUFDLEtBQUssR0FBRyxDQUFDLEVBQUUsR0FBRyxFQUFFLE9BQU8sRUFBRSxPQUFPLEVBQUUsT0FBTyxDQUFDLEtBQUssQ0FBQyxDQUFDO0lBRTlFLElBQUksS0FBSyxHQUFHLENBQUMsSUFBSSxLQUFLLENBQUMsS0FBSztRQUMxQixNQUFNLENBQUMsS0FBSyxHQUFHLGFBQWEsQ0FBQyxLQUFLLEdBQUcsQ0FBQyxFQUFFLEdBQUcsRUFBRSxPQUFPLEVBQUUsT0FBTyxFQUFFLE9BQU8sQ0FBQyxLQUFLLENBQUMsQ0FBQztJQUVoRixJQUFJLEtBQUssR0FBRyxDQUFDLElBQUksS0FBSyxDQUFDLElBQUk7UUFDekIsTUFBTSxDQUFDLElBQUksR0FBRyxhQUFhLENBQUMsS0FBSyxHQUFHLENBQUMsRUFBRSxHQUFHLEVBQUUsT0FBTyxFQUFFLE9BQU8sRUFBRSxPQUFPLENBQUMsSUFBSSxDQUFDLENBQUM7SUFFOUUsTUFBTSxDQUFDLE1BQU0sR0FBRyxhQUFhLENBQUMsS0FBSyxHQUFHLENBQUMsRUFBRSxHQUFHLEVBQUUsT0FBTyxFQUFFLE9BQU8sRUFBRSxPQUFPLENBQUMsR0FBRyxDQUFDLENBQUM7SUFFN0UsSUFBSSxLQUFLLEdBQUcsQ0FBQyxJQUFJLEtBQUssQ0FBQyxJQUFJO1FBQ3pCLE1BQU0sQ0FBQyxJQUFJLEdBQUcsYUFBYSxDQUFDLEtBQUssR0FBRyxDQUFDLEVBQUUsR0FBRyxFQUFFLE9BQU8sRUFBRSxPQUFPLEVBQUUsT0FBTyxDQUFDLElBQUksQ0FBQyxDQUFDO0lBRTlFLElBQUksS0FBSyxHQUFHLENBQUMsSUFBSSxLQUFLLENBQUMsS0FBSztRQUMxQixNQUFNLENBQUMsS0FBSyxHQUFHLGFBQWEsQ0FBQyxLQUFLLEdBQUcsQ0FBQyxFQUFFLEdBQUcsRUFBRSxPQUFPLEVBQUUsT0FBTyxFQUFFLE9BQU8sQ0FBQyxLQUFLLENBQUMsQ0FBQztBQUNsRixDQUFDO0FBRUQsU0FBUyxXQUFXLENBQUMsT0FBZSxFQUFFLE1BQWM7SUFDbEQsTUFBTSxLQUFLLEdBQUcsRUFBRSxPQUFPLEVBQUUsTUFBTSxFQUFFLE1BQU0sRUFBRSxFQUFhLEVBQUUsQ0FBQztJQUN6RCxVQUFVLENBQUMsS0FBSyxDQUFDLE1BQU0sRUFBRSxPQUFPLEVBQUUsTUFBTSxDQUFDLENBQUM7SUFDMUMsT0FBTyxLQUFLLENBQUM7QUFDZixDQUFDO0FBRUQsU0FBUyxjQUFjLENBQUMsS0FBa0IsRUFBRSxNQUFjO0lBQ3hELElBQUksS0FBSyxDQUFDLE1BQU0sS0FBSyxNQUFNLEVBQUUsQ0FBQztRQUM1QixVQUFVLENBQUMsS0FBSyxDQUFDLE1BQU0sRUFBRSxLQUFLLENBQUMsT0FBTyxFQUFFLE1BQU0sQ0FBQyxDQUFDO1FBQ2hELEtBQUssQ0FBQyxNQUFNLEdBQUcsTUFBTSxDQUFDO0lBQ3hCLENBQUM7QUFDSCxDQUFDO0FBRUQsU0FBUyxZQUFZLENBQUMsTUFBYztJQUNsQyxlQUFlLEdBQUcsTUFBTSxDQUFDO0lBQ3pCLEtBQUssTUFBTSxLQUFLLElBQUksVUFBVSxDQUFDLE1BQU0sRUFBRTtRQUNyQyxjQUFjLENBQUMsS0FBSyxFQUFFLE1BQU0sQ0FBQyxDQUFDO0FBQ2xDLENBQUM7QUFFTSxJQUFVLE1BQU0sQ0F5Q3RCO0FBekNELFdBQWlCLE1BQU07SUFFdkIsU0FBZ0IsTUFBTSxDQUFDLEdBQVc7UUFDaEMsTUFBTSxPQUFPLEdBQUcsR0FBRyxDQUFDLFVBQVUsQ0FBQywrREFBZSxHQUFHLEdBQUcsQ0FBQyxDQUFDLENBQUMsQ0FBQyxHQUFHLENBQUMsU0FBUyxDQUFDLCtEQUFlLENBQUMsTUFBTSxHQUFHLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxHQUFHLENBQUM7UUFDeEcsSUFBSSxDQUFDLE9BQU8sSUFBSSxPQUFPLEtBQUssR0FBRztZQUM3QixNQUFNLElBQUksS0FBSyxDQUFDLFVBQVUsR0FBRyxjQUFjLENBQUMsQ0FBQztRQUUvQyxJQUFJLEtBQUssR0FBRyxVQUFVLENBQUMsR0FBRyxDQUFDLE9BQU8sQ0FBQyxDQUFDO1FBQ3BDLElBQUksQ0FBQyxLQUFLLEVBQUUsQ0FBQztZQUNYLEtBQUssR0FBRyxXQUFXLENBQUMsT0FBTyxFQUFFLGVBQWUsQ0FBQyxDQUFDO1lBQzlDLFVBQVUsQ0FBQyxHQUFHLENBQUMsT0FBTyxFQUFFLEtBQUssQ0FBQyxDQUFDO1FBQ2pDLENBQUM7UUFFRCxPQUFPLEtBQUssQ0FBQyxNQUFNLENBQUM7SUFDdEIsQ0FBQztJQVplLGFBQU0sU0FZckI7SUFFRCxTQUFnQixNQUFNLENBQUMsTUFBYztRQUNuQyxJQUFJLE1BQU0sS0FBSyxHQUFHLEVBQUUsQ0FBQztZQUNuQixZQUFZLENBQUMsR0FBRyxDQUFDLENBQUM7WUFDbEIsT0FBTztRQUNULENBQUM7UUFFRCxNQUFNLElBQUksR0FBRyxNQUFNLENBQUMsS0FBSyxDQUFDLEdBQUcsQ0FBQyxDQUFDO1FBQy9CLElBQUksSUFBSSxDQUFDLE1BQU0sR0FBRyxDQUFDO1lBQ2pCLE9BQU87UUFFVCxJQUFJLElBQUksQ0FBQyxDQUFDLENBQUMsS0FBSyxHQUFHLEVBQUUsQ0FBQztZQUNwQixZQUFZLENBQUMsSUFBSSxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUM7WUFDdEIsT0FBTztRQUNULENBQUM7UUFFRCxJQUFJLEtBQUssR0FBRyxVQUFVLENBQUMsR0FBRyxDQUFDLElBQUksQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDO1FBQ3BDLElBQUksQ0FBQyxLQUFLLEVBQUUsQ0FBQztZQUNYLEtBQUssR0FBRyxXQUFXLENBQUMsSUFBSSxDQUFDLENBQUMsQ0FBQyxFQUFFLElBQUksQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDO1lBQ3RDLFVBQVUsQ0FBQyxHQUFHLENBQUMsTUFBTSxFQUFFLEtBQUssQ0FBQyxDQUFDO1FBQ2hDLENBQUM7YUFDSyxDQUFDO1lBQ0wsY0FBYyxDQUFDLEtBQUssRUFBRSxJQUFJLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQztRQUNqQyxDQUFDO0lBQ0gsQ0FBQztJQXZCZSxhQUFNLFNBdUJyQjtBQUVELENBQUMsRUF6Q2dCLE1BQU0sS0FBTixNQUFNLFFBeUN0QixDQUFDLG1CQUFtQjtBQUVyQixLQUFLLE1BQU0sSUFBSSxJQUFJLE9BQVksRUFBRSxDQUFDO0lBQ2hDLE1BQU0sQ0FBQyxNQUFNLENBQUMsSUFBSSxDQUFDLENBQUM7QUFDdEIsQ0FBQzs7Ozs7Ozs7Ozs7Ozs7Ozs7QUN6TEQ7Ozs7Ozs7R0FPRztBQUVrRDtBQUVuQjtBQUVsQyxNQUFNLE1BQU0sR0FBRywyQ0FBTSxDQUFDLE1BQU0sQ0FBQyw0RkFBZSxDQUFDLENBQUM7QUFFdkMsTUFBTSxrQkFBa0I7SUFDckIsUUFBUSxDQUFlO0lBQ3ZCLEdBQUcsQ0FBUztJQUVwQixZQUFtQixXQUF5QjtRQUMxQyxJQUFJLENBQUMsUUFBUSxHQUFHLFdBQVcsQ0FBQztRQUM1QixJQUFJLENBQUMsR0FBRyxHQUFHLENBQUMsQ0FBQztJQUNmLENBQUM7SUFFTSxXQUFXLENBQUMsTUFBYyxFQUFFLE1BQVc7UUFDNUMsTUFBTSxDQUFDLEtBQUssQ0FBQyxpQ0FBaUMsRUFBRSxNQUFNLEVBQUUsWUFBWSxDQUFDLENBQUM7UUFDdEUsTUFBTSxPQUFPLEdBQUc7WUFDZCxPQUFPLEVBQUUsOERBQWU7WUFDeEIsTUFBTTtZQUNOLE1BQU07WUFDTixFQUFFLEVBQUUsSUFBSSxDQUFDLEdBQUcsRUFBRTtTQUNmLENBQUM7UUFDRixNQUFNLFFBQVEsR0FBRyxJQUFJLENBQUMsUUFBUSxDQUFDLFdBQVcsQ0FBQyxPQUFPLENBQUMsQ0FBQztRQUNwRCxJQUFJLFFBQVEsQ0FBQyxLQUFLO1lBQ2hCLE1BQU0sSUFBSSxLQUFLLENBQUMsUUFBUSxDQUFDLEtBQUssQ0FBQyxPQUFPLEVBQUUsRUFBRSxLQUFLLEVBQUUsUUFBUSxDQUFDLEtBQUssQ0FBQyxJQUFJLEVBQUUsQ0FBQyxDQUFDO1FBQzFFLE9BQU8sUUFBUSxDQUFDLE1BQU0sQ0FBQztJQUN6QixDQUFDO0NBQ0Y7QUFBQSxDQUFDOzs7Ozs7Ozs7Ozs7Ozs7OztBQ3JDRjs7Ozs7OztHQU9HO0FBRTBKO0FBQzNIO0FBRWxDLE1BQU0sTUFBTSxHQUFHLDJDQUFNLENBQUMsTUFBTSxDQUFDLHVGQUFlLENBQUMsQ0FBQztBQUU5QyxNQUFNLGNBQWM7SUFDVixPQUFPLENBQU07SUFFckIsWUFBWSxNQUFXO1FBQ3JCLElBQUksQ0FBQyxPQUFPLEdBQUcsTUFBTSxDQUFDO0lBQ3hCLENBQUM7SUFFRCxJQUFJLE1BQU07UUFDUixPQUFPLElBQUksQ0FBQyxPQUFPLENBQUM7SUFDdEIsQ0FBQztDQUNGO0FBRUQsTUFBTSxlQUFlO0lBQ1gsT0FBTyxDQUFpQjtJQUN4QixHQUFHLENBQVM7SUFFcEIsWUFBbUIsTUFBc0IsRUFBRSxFQUFVO1FBQ25ELElBQUksQ0FBQyxPQUFPLEdBQUcsTUFBTSxDQUFDO1FBQ3RCLElBQUksQ0FBQyxHQUFHLEdBQUcsRUFBRSxDQUFDO0lBQ2hCLENBQUM7SUFFRCxVQUFVLENBQUMsTUFBVztRQUNwQixNQUFNLE9BQU8sR0FBZ0I7WUFDM0IsT0FBTyxFQUFFLDhEQUFlO1lBQ3hCLE1BQU0sRUFBRSxDQUFDLE1BQU0sS0FBSyxTQUFTLENBQUMsQ0FBQyxDQUFDLENBQUMsTUFBTSxDQUFDLENBQUMsQ0FBQyxJQUFJO1lBQzlDLEVBQUUsRUFBRSxJQUFJLENBQUMsR0FBRztTQUNiLENBQUM7UUFDRixNQUFNLENBQUMsS0FBSyxDQUFDLEtBQUssRUFBRSxJQUFJLENBQUMsU0FBUyxDQUFDLE9BQU8sQ0FBQyxDQUFDLENBQUM7UUFDN0MsSUFBSSxDQUFDLE9BQU8sQ0FBQyxXQUFXLENBQUMsT0FBTyxDQUFDLENBQUM7SUFDcEMsQ0FBQztJQUVELFNBQVMsQ0FBQyxJQUFZLEVBQUUsT0FBZSxFQUFFLElBQVU7UUFDakQsTUFBTSxLQUFLLEdBQVEsRUFBRSxJQUFJLEVBQUUsT0FBTyxFQUFFLENBQUM7UUFDckMsSUFBSSxJQUFJLEtBQUssU0FBUyxFQUFFLENBQUM7WUFDdkIsS0FBSyxDQUFDLElBQUksR0FBRyxJQUFJLENBQUM7UUFDcEIsQ0FBQztRQUNELE1BQU0sR0FBRyxHQUFnQjtZQUN2QixPQUFPLEVBQUUsOERBQWU7WUFDeEIsS0FBSztZQUNMLEVBQUUsRUFBRSxJQUFJLENBQUMsR0FBRztTQUNiLENBQUM7UUFDRixNQUFNLENBQUMsS0FBSyxDQUFDLEtBQUssRUFBRSxJQUFJLENBQUMsU0FBUyxDQUFDLEdBQUcsQ0FBQyxDQUFDLENBQUM7UUFDekMsSUFBSSxDQUFDLE9BQU8sQ0FBQyxXQUFXLENBQUMsR0FBRyxDQUFDLENBQUM7SUFDaEMsQ0FBQztDQUNGO0FBQUEsQ0FBQztBQUVLLE1BQU0sYUFBYTtJQUNoQixnQkFBZ0IsR0FBRyxJQUFJLEdBQUcsRUFBaUMsQ0FBQztJQUVwRTtJQUNBLENBQUM7SUFFTSxlQUFlLENBQUMsTUFBYyxFQUFFLE9BQThCO1FBQ25FLElBQUksQ0FBQyxnQkFBZ0IsQ0FBQyxHQUFHLENBQUMsTUFBTSxFQUFFLE9BQU8sQ0FBQyxDQUFDO0lBQzdDLENBQUM7SUFFTSxnQkFBZ0IsQ0FBQyxNQUFjLEVBQUUsUUFBeUI7UUFDL0QsSUFBSSxDQUFDLGdCQUFnQixDQUFDLEdBQUcsQ0FBQyxNQUFNLEVBQUUsS0FBSyxFQUFFLE9BQU8sRUFBRSxRQUFRLEVBQUUsRUFBRTtZQUM1RCxJQUFJLE1BQU0sR0FBUSxRQUFRLENBQUMsT0FBTyxDQUFDLE1BQU0sQ0FBQyxDQUFDO1lBQzNDLElBQUksTUFBTSxZQUFZLE9BQU87Z0JBQzNCLE1BQU0sR0FBRyxNQUFNLE1BQU0sQ0FBQztZQUN4QixJQUFJLE1BQU0sSUFBSSxPQUFPLE1BQU0sS0FBSyxRQUFRLElBQUksT0FBTyxNQUFNLENBQUMsTUFBTSxLQUFLLFVBQVU7Z0JBQzdFLE1BQU0sR0FBRyxNQUFNLENBQUMsTUFBTSxFQUFFLENBQUM7WUFDM0IsUUFBUSxDQUFDLFVBQVUsQ0FBQyxNQUFNLENBQUMsQ0FBQztRQUM5QixDQUFDLENBQUMsQ0FBQztJQUNMLENBQUM7SUFFTSxTQUFTLENBQUMsTUFBc0IsRUFBRSxNQUFXLEVBQUUsRUFBTyxFQUFFLE1BQVc7UUFDeEUsTUFBTSxPQUFPLEdBQUcsQ0FBQyxPQUFPLE1BQU0sS0FBSyxRQUFRLENBQUMsQ0FBQyxDQUFDLENBQUMsSUFBSSxDQUFDLGdCQUFnQixDQUFDLEdBQUcsQ0FBQyxNQUFNLENBQUMsQ0FBQyxDQUFDLENBQUMsU0FBUyxDQUFDO1FBQzdGLE1BQU0sUUFBUSxHQUFHLElBQUksZUFBZSxDQUFDLE1BQU0sRUFBRSxFQUFFLENBQUMsQ0FBQztRQUNqRCxJQUFJLE9BQU8sRUFBRSxDQUFDO1lBQ1osT0FBTyxDQUFDLElBQUksY0FBYyxDQUFDLE1BQU0sQ0FBQyxFQUFFLFFBQVEsQ0FBQyxDQUFDO1FBQ2hELENBQUM7YUFDSSxDQUFDO1lBQ0osUUFBUSxDQUFDLFNBQVMsQ0FBQyxDQUFDLEtBQUssRUFBRSxrQkFBa0IsQ0FBQyxDQUFDO1FBQ2pELENBQUM7SUFDSCxDQUFDO0lBRU0sUUFBUSxDQUFDLE1BQXNCLEVBQUUsTUFBVyxFQUFFLEVBQVU7SUFFL0QsQ0FBQztJQUVNLE9BQU8sQ0FBQyxNQUFzQixFQUFFLEtBQWEsRUFBRSxFQUFpQjtJQUV2RSxDQUFDO0lBRU0sY0FBYyxDQUFDLE1BQXNCLEVBQUUsTUFBVyxFQUFFLE1BQVk7SUFFdkUsQ0FBQztJQUVPLGFBQWEsQ0FBQyxNQUFzQixFQUFFLE9BQVk7UUFDeEQsSUFBSSxDQUFDLE9BQU8sSUFBSSxPQUFPLE9BQU8sS0FBSyxRQUFRLEVBQUUsQ0FBQztZQUM1QyxPQUFPO1FBQ1QsQ0FBQztRQUVELE1BQU0sSUFBSSxHQUFHLE9BQXNCLENBQUM7UUFFcEMsSUFBSSxNQUFNLENBQUMsTUFBTSxDQUFDLElBQUksRUFBRSxRQUFRLENBQUMsRUFBRSxDQUFDO1lBQ2xDLElBQUksTUFBTSxDQUFDLE1BQU0sQ0FBQyxJQUFJLEVBQUUsSUFBSSxDQUFDO2dCQUMzQixJQUFJLENBQUMsU0FBUyxDQUFDLE1BQU0sRUFBRSxJQUFJLENBQUMsTUFBTSxFQUFFLElBQUksQ0FBQyxFQUFFLEVBQUUsSUFBSSxDQUFDLE1BQU0sQ0FBQyxDQUFDOztnQkFFMUQsSUFBSSxDQUFDLGNBQWMsQ0FBQyxNQUFNLEVBQUUsSUFBSSxDQUFDLE1BQU0sRUFBRSxJQUFJLENBQUMsTUFBTSxDQUFDLENBQUM7UUFDMUQsQ0FBQzthQUNJLElBQUksSUFBSSxDQUFDLEVBQUUsRUFBRSxDQUFDO1FBRW5CLENBQUM7YUFDSSxDQUFDO1FBRU4sQ0FBQztJQUNILENBQUM7SUFFTSxXQUFXLENBQUMsTUFBc0IsRUFBRSxPQUFZO1FBQ3JELE1BQU0sQ0FBQyxLQUFLLENBQUMsS0FBSyxFQUFFLElBQUksQ0FBQyxTQUFTLENBQUMsT0FBTyxDQUFDLENBQUMsQ0FBQztRQUM3QyxJQUFJLEtBQUssQ0FBQyxPQUFPLENBQUMsT0FBTyxDQUFDO1lBQ3hCLE9BQU8sQ0FBQyxPQUFPLENBQUMsR0FBRyxDQUFDLEVBQUUsQ0FBQyxJQUFJLENBQUMsYUFBYSxDQUFDLE1BQU0sRUFBRSxHQUFHLENBQUMsQ0FBQyxDQUFDOztZQUV4RCxJQUFJLENBQUMsYUFBYSxDQUFDLE1BQU0sRUFBRSxPQUFPLENBQUMsQ0FBQztJQUN4QyxDQUFDO0NBQ0Y7QUFBQSxDQUFDOzs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7OztBQ3BJRjs7Ozs7OztHQU9HO0FBRTBDO0FBRUs7QUFDYTtBQUNWO0FBQ0E7QUFFRztBQUlMO0FBQ2lCO0FBQ0o7QUFDQTtBQUNBO0FBQ0E7QUFDRztBQUNIO0FBQzlCO0FBRWxDLE1BQU0sTUFBTSxHQUFHLDJDQUFNLENBQUMsTUFBTSxDQUFDLG9GQUFlLENBQUMsQ0FBQztBQUs3QyxDQUFDO0FBRUssTUFBTSxlQUFlO0lBQ2xCLGNBQWMsQ0FBZ0I7SUFDOUIsT0FBTyxDQUFTO0lBQ2hCLEdBQUcsR0FBRyxDQUFDLENBQUM7SUFDUixnQkFBZ0IsR0FBRyxJQUFJLEdBQUcsRUFBd0IsQ0FBQztJQUFBLENBQUM7SUFFNUQsWUFBbUIsYUFBNEI7UUFDN0MsSUFBSSxDQUFDLGNBQWMsR0FBRyxhQUFhLENBQUM7UUFDcEMsSUFBSSxDQUFDLE9BQU8sR0FBRyxJQUFJLHVEQUFNLENBQUMsK0RBQWdCLEVBQUUsQ0FBQyxDQUFDO1FBQzlDLElBQUksQ0FBQyxPQUFPLENBQUMsRUFBRSxDQUFDLFNBQVMsRUFBRSxPQUFPLENBQUMsRUFBRSxDQUFDLElBQUksQ0FBQyxlQUFlLENBQUMsT0FBTyxDQUFDLENBQUMsQ0FBQztRQUNyRSxJQUFJLENBQUMsT0FBTyxDQUFDLEVBQUUsQ0FBQyxPQUFPLEVBQUUsS0FBSyxDQUFDLEVBQUUsQ0FBQyxJQUFJLENBQUMsYUFBYSxDQUFDLEtBQUssQ0FBQyxDQUFDLENBQUM7UUFDN0QsSUFBSSxDQUFDLE9BQU8sQ0FBQyxFQUFFLENBQUMsTUFBTSxFQUFFLElBQUksQ0FBQyxFQUFFLENBQUMsSUFBSSxDQUFDLFlBQVksQ0FBQyxJQUFJLENBQUMsQ0FBQyxDQUFDO0lBQzNELENBQUM7SUFFRDs7T0FFRztJQUVJLEtBQUssQ0FBQyxPQUFPLENBQUMsTUFBYyxFQUFFLE1BQVc7UUFDOUMsTUFBTSxFQUFFLEdBQUcsSUFBSSxDQUFDLEdBQUcsRUFBRSxDQUFDO1FBQ3RCLE1BQU0sTUFBTSxHQUFHLElBQUksT0FBTyxDQUFNLENBQUMsT0FBTyxFQUFFLE1BQU0sRUFBRSxFQUFFO1lBQ2xELElBQUksQ0FBQyxnQkFBZ0IsQ0FBQyxHQUFHLENBQUMsRUFBRSxFQUFFLEVBQUUsT0FBTyxFQUFFLE1BQU0sRUFBRSxDQUFDLENBQUM7UUFDckQsQ0FBQyxDQUFDLENBQUM7UUFDSCxJQUFJLENBQUMsT0FBTyxDQUFDLFdBQVcsQ0FBQztZQUN2QixPQUFPLEVBQUUsOERBQWU7WUFDeEIsTUFBTTtZQUNOLE1BQU07WUFDTixFQUFFO1NBQ0gsQ0FBQyxDQUFDO1FBQ0gsT0FBTyxNQUFNLENBQUM7SUFDaEIsQ0FBQztJQUVPLGVBQWUsQ0FBQyxPQUFZO1FBQ2xDLElBQUksT0FBTyxZQUFZLGlCQUFpQixFQUFFLENBQUM7WUFDekMsTUFBTSxFQUFFLEdBQUcsSUFBSSx3RUFBbUIsQ0FBQyxPQUFPLENBQUM7WUFDM0MsSUFBSSxDQUFDLGNBQWMsQ0FBQyxXQUFXLENBQUMsRUFBRSxFQUFFLEVBQUUsQ0FBQyxXQUFXLEVBQUUsQ0FBQyxDQUFDO1FBQ3hELENBQUM7YUFDSSxJQUFJLE1BQU0sQ0FBQyxNQUFNLENBQUMsT0FBTyxFQUFFLFFBQVEsQ0FBQyxFQUFFLENBQUM7WUFDMUMsTUFBTSxNQUFNLEdBQUcsSUFBSSw4REFBWSxDQUFDLElBQUksQ0FBQyxPQUFPLENBQUMsQ0FBQztZQUM5QyxJQUFJLENBQUMsY0FBYyxDQUFDLFdBQVcsQ0FBQyxNQUFNLEVBQUUsT0FBTyxDQUFDLENBQUM7UUFDbkQsQ0FBQzthQUNJLElBQUksTUFBTSxDQUFDLE1BQU0sQ0FBQyxPQUFPLEVBQUUsSUFBSSxDQUFDLEVBQUUsQ0FBQztZQUN0QyxNQUFNLE9BQU8sR0FBRyxJQUFJLENBQUMsZ0JBQWdCLENBQUMsR0FBRyxDQUFDLE9BQU8sQ0FBQyxFQUFFLENBQUMsQ0FBQztZQUN0RCxJQUFJLENBQUMsT0FBTztnQkFDVixNQUFNLElBQUksS0FBSyxDQUFDLHFCQUFxQixPQUFPLENBQUMsRUFBRSxNQUFNLENBQUMsQ0FBQztZQUN6RCxJQUFJLE1BQU0sQ0FBQyxNQUFNLENBQUMsT0FBTyxFQUFFLFFBQVEsQ0FBQztnQkFDbEMsT0FBTyxDQUFDLE9BQU8sQ0FBQyxPQUFPLENBQUMsTUFBTSxDQUFDLENBQUM7aUJBQzdCLElBQUksTUFBTSxDQUFDLE1BQU0sQ0FBQyxPQUFPLEVBQUUsT0FBTyxDQUFDO2dCQUN0QyxPQUFPLENBQUMsTUFBTSxDQUFDLE9BQU8sQ0FBQyxLQUFLLENBQUMsQ0FBQzs7Z0JBRTlCLE1BQU0sSUFBSSxLQUFLLENBQUMsNEJBQTRCLE9BQU8sR0FBRyxDQUFDLENBQUM7UUFDNUQsQ0FBQztJQUNILENBQUM7SUFFTyxhQUFhLENBQUMsS0FBWTtRQUNoQyxJQUFJLEtBQUssWUFBWSxLQUFLO1lBQ3hCLE1BQU0sQ0FBQyxLQUFLLENBQUMsS0FBSyxDQUFDLEtBQUssQ0FBQyxDQUFDOztZQUUxQixNQUFNLENBQUMsS0FBSyxDQUFDLEtBQUssQ0FBQyxDQUFDO1FBQ3RCLE9BQU8sQ0FBQyxJQUFJLENBQUMsQ0FBQyxDQUFDLENBQUM7SUFDbEIsQ0FBQztJQUVPLFlBQVksQ0FBQyxJQUFZO1FBQy9CLElBQUksSUFBSTtZQUNOLE1BQU0sSUFBSSxLQUFLLENBQUMsNEJBQTRCLElBQUksRUFBRSxDQUFDLENBQUM7SUFDeEQsQ0FBQztDQUNGO0FBQUEsQ0FBQztBQUVLLE1BQU0sVUFBVTtJQUNiLFVBQVUsQ0FBa0I7SUFDNUIsWUFBWSxHQUFHLElBQUksS0FBaUIsQ0FBQztJQUNyQyxZQUFZLEdBQUcsSUFBSSxLQUFpQixDQUFDO0lBQ3JDLFlBQVksR0FBRyxJQUFJLEtBQW1CLENBQUM7SUFDdkMsWUFBWSxHQUFHLElBQUksS0FBdUIsQ0FBQztJQUMzQyxlQUFlLEdBQUcsSUFBSSxLQUFvQixDQUFDO0lBRW5ELFlBQW1CLGFBQTRCO1FBQzdDLElBQUksQ0FBQyxVQUFVLEdBQUcsSUFBSSxlQUFlLENBQUMsYUFBYSxDQUFDLENBQUM7SUFDdkQsQ0FBQztJQUVNLEtBQUssQ0FBQyxjQUFjLENBQUMsV0FBd0I7UUFDbEQsTUFBTSxPQUFPLEdBQUcsT0FBTyxDQUFDLEdBQUcsRUFBRSxDQUFDO1FBQzlCLE1BQU0sU0FBUyxHQUFHLG9EQUFXLENBQUMsR0FBRyxDQUFDLFdBQVcsRUFBRSxZQUFZLENBQUMsQ0FBQztRQUM3RCxPQUFPLENBQUMsS0FBSyxDQUFDLFNBQVMsQ0FBQyxRQUFRLEVBQUUsQ0FBQyxDQUFDO1FBQ3BDLE1BQU0sSUFBSSxDQUFDLFVBQVUsQ0FBQyxPQUFPLENBQUMsNkVBQTBCLEVBQUUsb0RBQVcsQ0FBQyxNQUFNLENBQUMsV0FBVyxDQUFDLENBQUMsQ0FBQztRQUMzRixPQUFPLENBQUMsS0FBSyxDQUFDLE9BQU8sQ0FBQyxDQUFDO1FBRXZCLE1BQU0sV0FBVyxHQUFHLE1BQU0sSUFBSSxDQUFDLFVBQVUsQ0FBQyxPQUFPLENBQUMseUVBQXNCLEVBQUUsSUFBSSxDQUFDLENBQUM7UUFDaEYsSUFBSSxDQUFDLFlBQVksR0FBRyw0REFBWSxDQUFDLFFBQVEsQ0FBQyxXQUFXLENBQUMsQ0FBQztRQUV2RCxNQUFNLFdBQVcsR0FBRyxNQUFNLElBQUksQ0FBQyxVQUFVLENBQUMsT0FBTyxDQUFDLHlFQUFzQixFQUFFLElBQUksQ0FBQyxDQUFDO1FBQ2hGLElBQUksQ0FBQyxZQUFZLEdBQUcsNERBQVksQ0FBQyxRQUFRLENBQUMsV0FBVyxDQUFDLENBQUM7UUFFdkQsTUFBTSxXQUFXLEdBQUcsTUFBTSxJQUFJLENBQUMsVUFBVSxDQUFDLE9BQU8sQ0FBQyx5RUFBc0IsRUFBRSxJQUFJLENBQUMsQ0FBQztRQUNoRixJQUFJLENBQUMsWUFBWSxHQUFHLDREQUFZLENBQUMsUUFBUSxDQUFDLFdBQVcsQ0FBQyxDQUFDO1FBRXZELE1BQU0sV0FBVyxHQUFHLE1BQU0sSUFBSSxDQUFDLFVBQVUsQ0FBQyxPQUFPLENBQUMseUVBQXNCLEVBQUUsSUFBSSxDQUFDLENBQUM7UUFDaEYsSUFBSSxDQUFDLFlBQVksR0FBRyw0REFBWSxDQUFDLFFBQVEsQ0FBQyxXQUFXLENBQUMsQ0FBQztRQUV2RCxNQUFNLGNBQWMsR0FBRyxNQUFNLElBQUksQ0FBQyxVQUFVLENBQUMsT0FBTyxDQUFDLDRFQUF5QixFQUFFLElBQUksQ0FBQyxDQUFDO1FBQ3RGLElBQUksQ0FBQyxlQUFlLEdBQUcsNERBQVksQ0FBQyxRQUFRLENBQUMsY0FBYyxDQUFDLENBQUM7UUFFN0QsTUFBTSxJQUFJLENBQUMsVUFBVSxDQUFDLE9BQU8sQ0FBQyx5RUFBc0IsRUFBRSxDQUFDLENBQUMsQ0FBQztJQUMzRCxDQUFDO0lBRUQsSUFBVyxXQUFXO1FBQ3BCLE9BQU8sSUFBSSxDQUFDLFlBQVksQ0FBQztJQUMzQixDQUFDO0lBRUQsSUFBVyxXQUFXO1FBQ3BCLE9BQU8sSUFBSSxDQUFDLFlBQVksQ0FBQztJQUMzQixDQUFDO0lBRUQsSUFBVyxXQUFXO1FBQ3BCLE9BQU8sSUFBSSxDQUFDLFlBQVksQ0FBQztJQUMzQixDQUFDO0lBRUQsSUFBVyxXQUFXO1FBQ3BCLE9BQU8sSUFBSSxDQUFDLFlBQVksQ0FBQztJQUMzQixDQUFDO0lBRUQsSUFBVyxjQUFjO1FBQ3ZCLE9BQU8sSUFBSSxDQUFDLGVBQWUsQ0FBQztJQUM5QixDQUFDO0NBQ0Y7QUFBQSxDQUFDOzs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7O0FDaktGOzs7Ozs7O0dBT0c7QUFFc0I7QUFFOEI7QUFDRjtBQUNHO0FBQ1A7QUFDTTtBQUNUO0FBQ3FCO0FBQ0Q7QUFDUDtBQUNLO0FBQzlCO0FBRWxDLE1BQU0sTUFBTSxHQUFHLDJDQUFNLENBQUMsTUFBTSxDQUFDLG9GQUFlLENBQUMsQ0FBQztBQUV2QyxNQUFNLGVBQWUsR0FBRyxXQUFXLENBQUM7QUFDcEMsTUFBTSxXQUFXLEdBQUcsT0FBTyxDQUFDO0FBSWxDLENBQUM7QUFJRCxDQUFDO0FBT0QsQ0FBQztBQUVLLE1BQU0sVUFBVTtJQUNiLGdCQUFnQixHQUFnQixFQUFFLENBQUM7SUFDbkMsUUFBUSxHQUFHLGdFQUFjLENBQUMsTUFBTSxFQUFFLENBQUM7SUFDbkMsVUFBVSxDQUFpQztJQUMzQyxjQUFjLEdBQUcsSUFBSSxnRUFBYSxDQUFDO0lBQ25DLFFBQVEsR0FBRyxJQUFJLEtBQWlCLENBQUM7SUFFekM7UUFDRSxJQUFJLENBQUMsVUFBVSxHQUFHO1lBQ2hCLENBQUUsZUFBZSxDQUFFLEVBQUUsSUFBSSxLQUF3QjtZQUNqRCxDQUFFLFdBQVcsQ0FBRSxFQUFFLElBQUksS0FBb0I7U0FDMUMsQ0FBQztRQUNGLElBQUksQ0FBQyxjQUFjLENBQUMsZ0JBQWdCLENBQUMseUVBQXNCLEVBQUUsTUFBTSxDQUFDLEVBQUUsQ0FBQyxJQUFJLENBQUMsYUFBYSxDQUFDLE1BQU0sQ0FBQyxDQUFDLENBQUM7UUFDbkcsSUFBSSxDQUFDLGNBQWMsQ0FBQyxnQkFBZ0IsQ0FBQyxvRUFBaUIsRUFBRSxNQUFNLENBQUMsRUFBRSxDQUFDLElBQUksQ0FBQyxRQUFRLENBQUMsTUFBTSxDQUFDLENBQUMsQ0FBQztRQUN6RixJQUFJLENBQUMsY0FBYyxDQUFDLGdCQUFnQixDQUFDLDJFQUF3QixFQUFFLE1BQU0sQ0FBQyxFQUFFLENBQUMsSUFBSSxDQUFDLGVBQWUsQ0FBQyxNQUFNLENBQUMsQ0FBQyxDQUFDO0lBQ3pHLENBQUM7SUFFRCxJQUFXLGVBQWU7UUFDeEIsT0FBTyxJQUFJLENBQUMsZ0JBQWdCLENBQUM7SUFDL0IsQ0FBQztJQUVELElBQVcsT0FBTztRQUNoQixPQUFPLElBQUksQ0FBQyxRQUFRLENBQUM7SUFDdkIsQ0FBQztJQUVNLEtBQUssQ0FBQyxlQUFlLENBQUMsTUFBVztRQUN0QyxNQUFNLENBQUMsS0FBSyxDQUFDLDRCQUE0QixDQUFDLENBQUM7UUFFM0MsTUFBTSxXQUFXLEdBQUcsb0RBQVcsQ0FBQyxRQUFRLENBQUMsTUFBTSxDQUFDLENBQUM7UUFDakQsTUFBTSxJQUFJLENBQUMsYUFBYSxDQUFDLFdBQVcsQ0FBQyxDQUFDO0lBQ3hDLENBQUM7SUFFTyxLQUFLLENBQUMsUUFBUSxDQUFDLFFBQWdCO1FBQ3JDLE1BQU0sQ0FBQyxLQUFLLENBQUMsc0JBQXNCLEVBQUUsUUFBUSxFQUFFLEdBQUcsQ0FBQyxDQUFDO1FBQ3BELElBQUksUUFBUSxDQUFDLFFBQVEsQ0FBQyxPQUFPLENBQUMsRUFBRSxDQUFDO1lBQy9CLE1BQU0sT0FBTyxHQUFHLE1BQU0sdURBQVcsQ0FBQyxRQUFRLENBQUMsUUFBUSxFQUFFLE1BQU0sQ0FBQyxDQUFDO1lBQzdELE9BQU8sSUFBSSxDQUFDLEtBQUssQ0FBQyxPQUFPLENBQUMsQ0FBQztRQUM3QixDQUFDO1FBRUQsTUFBTSxNQUFNLEdBQUcsTUFBTSwyREFBWSxDQUFDLFFBQVEsQ0FBQyxDQUFDO1FBQzVDLElBQUksQ0FBQyxNQUFNLENBQUMsT0FBTztZQUNqQixNQUFNLElBQUksS0FBSyxDQUFDLFdBQVcsUUFBUSxzQ0FBc0MsQ0FBQyxDQUFDO1FBRTdFLE9BQU8sTUFBTSxDQUFDLE9BQU8sQ0FBQztJQUN4QixDQUFDO0lBRU8sS0FBSyxDQUFDLGFBQWEsQ0FBQyxNQUFXO1FBQ3JDLE1BQU0sQ0FBQyxLQUFLLENBQUMsMEJBQTBCLENBQUMsQ0FBQztRQUN6QyxNQUFNLFdBQVcsR0FBRyxvREFBVyxDQUFDLFFBQVEsQ0FBQyxNQUFNLENBQUMsQ0FBQztRQUNqRCxNQUFNLFVBQVUsR0FBRyxvREFBVyxDQUFDLEdBQUcsQ0FBQyxXQUFXLEVBQUUsYUFBYSxDQUFDLENBQUM7UUFFL0QsTUFBTSxNQUFNLEdBQUcsTUFBTSwyREFBWSxDQUFDLFVBQVUsQ0FBQyxRQUFRLEVBQUUsQ0FBQyxDQUFDO1FBQ3pELElBQUksQ0FBQyxNQUFNLENBQUMsT0FBTztZQUNqQixNQUFNLElBQUksS0FBSyxDQUFDLFdBQVcsVUFBVSxzQ0FBc0MsQ0FBQyxDQUFDO1FBRS9FLE1BQU0sRUFBRSxHQUFHLDhEQUFhLENBQUMsTUFBTSxDQUFDLFdBQVcsQ0FBQyxDQUFDO1FBQzdDLE1BQU0sQ0FBQyxPQUFPLENBQUMsRUFBRSxDQUFDLENBQUM7SUFDckIsQ0FBQztJQUVNLEtBQUssQ0FBQyxhQUFhLENBQUMsV0FBd0I7UUFDakQsSUFBSSxDQUFDLE1BQU0sSUFBSSxDQUFDLFFBQVEsQ0FBQyxpQkFBaUIsQ0FBQyxXQUFXLENBQUM7WUFDckQsT0FBTyxLQUFLLENBQUM7UUFFZixNQUFNLE1BQU0sR0FBRyxJQUFJLDBEQUFVLENBQUMsSUFBSSxDQUFDLGNBQWMsQ0FBQyxDQUFDO1FBQ25ELElBQUksQ0FBQyxRQUFRLENBQUMsSUFBSSxDQUFDLE1BQU0sQ0FBQyxDQUFDO1FBRTNCLE1BQU0sTUFBTSxDQUFDLGNBQWMsQ0FBQyxXQUFXLENBQUMsQ0FBQztRQUN6QyxPQUFPLElBQUksQ0FBQztJQUNkLENBQUM7SUFFTSxjQUFjO1FBQ25CLEtBQUssTUFBTSxHQUFHLElBQUksSUFBSSxDQUFDLFFBQVEsRUFBRSxDQUFDO1lBQ2hDLElBQUksQ0FBQyxRQUFRLENBQUMsZ0JBQWdCLENBQUMsR0FBRyxDQUFDLFdBQVcsQ0FBQyxDQUFDO1lBQ2hELElBQUksQ0FBQyxRQUFRLENBQUMsZ0JBQWdCLENBQUMsR0FBRyxDQUFDLFdBQVcsQ0FBQyxDQUFDO1lBQ2hELElBQUksQ0FBQyxRQUFRLENBQUMsb0JBQW9CLENBQUMsR0FBRyxDQUFDLGNBQWMsQ0FBQyxDQUFDO1FBQ3pELENBQUM7UUFDRCxLQUFLLE1BQU0sR0FBRyxJQUFJLElBQUksQ0FBQyxRQUFRLEVBQUUsQ0FBQztZQUNoQyxJQUFJLENBQUMsUUFBUSxDQUFDLGVBQWUsQ0FBQyxHQUFHLENBQUMsV0FBVyxDQUFDLENBQUM7WUFDL0MsSUFBSSxDQUFDLFFBQVEsQ0FBQyxlQUFlLENBQUMsR0FBRyxDQUFDLFdBQVcsQ0FBQyxDQUFDO1FBQ2pELENBQUM7SUFDSCxDQUFDO0lBRU0sS0FBSyxDQUFDLEtBQUs7UUFDaEIsTUFBTSxTQUFTLEdBQUcsb0RBQVcsQ0FBQyxHQUFHLENBQUMsSUFBSSxDQUFDLGdCQUFnQixFQUFFLG9CQUFvQixDQUFDLENBQUM7UUFDL0UsTUFBTSxTQUFTLEdBQUcsb0RBQVcsQ0FBQyxHQUFHLENBQUMsSUFBSSxDQUFDLGdCQUFnQixFQUFFLG9CQUFvQixDQUFDLENBQUM7UUFFL0UsTUFBTSxXQUFXLEdBQUcsZ0ZBQTZCLENBQUMsSUFBSSxDQUFDLGdCQUFnQixFQUFFLFNBQVMsRUFBRSxTQUFTLENBQUMsQ0FBQztRQUMvRixJQUFJLENBQUMsTUFBTSxJQUFJLENBQUMsYUFBYSxDQUFDLFdBQVcsQ0FBQztZQUN4QyxNQUFNLEtBQUssQ0FBQywwQkFBMEIsQ0FBQyxDQUFDO1FBRTFDLElBQUksQ0FBQyxjQUFjLEVBQUUsQ0FBQztRQUN0QixJQUFJLENBQUMsY0FBYyxFQUFFLENBQUM7UUFFdEI7MkVBQ21FO0lBQ3JFLENBQUM7SUFFTyxLQUFLLENBQUMsY0FBYztRQUMxQixNQUFNLEtBQUssR0FBRyxFQUFFLE9BQU8sRUFBRSxJQUFJLENBQUMsUUFBUSxFQUFFLENBQUM7UUFDekMsTUFBTSxJQUFJLENBQUMsU0FBUyxDQUFDLGVBQWUsRUFBRSxLQUFLLENBQUMsQ0FBQztRQUM3QyxNQUFNLElBQUksQ0FBQyxTQUFTLENBQUMsV0FBVyxFQUFFLEtBQUssQ0FBQyxDQUFDO0lBQzNDLENBQUM7SUFFTyxLQUFLLENBQUMsU0FBUyxDQUFJLElBQVksRUFBRSxLQUFRO1FBQy9DLEtBQUssTUFBTSxRQUFRLElBQUksSUFBSSxDQUFDLFVBQVUsQ0FBQyxJQUFJLENBQUMsRUFBRSxDQUFDO1lBQzdDLE1BQU0sTUFBTSxHQUFHLFFBQVEsQ0FBQyxLQUFLLENBQUMsQ0FBQztZQUMvQixJQUFJLE1BQU0sWUFBWSxPQUFPO2dCQUMzQixNQUFNLE1BQU0sQ0FBQztRQUNqQixDQUFDO0lBQ0gsQ0FBQztJQUlNLGdCQUFnQixDQUFDLElBQVksRUFBRSxRQUFrQjtRQUN0RCxJQUFJLENBQUMsVUFBVSxDQUFDLElBQUksQ0FBQyxDQUFDLElBQUksQ0FBQyxRQUFRLENBQUMsQ0FBQztJQUN2QyxDQUFDO0NBQ0Y7QUFBQSxDQUFDOzs7Ozs7Ozs7Ozs7Ozs7OztBQy9KRjs7Ozs7OztHQU9HO0FBRytCO0FBRWxDLE1BQU0sTUFBTSxHQUFHLDJDQUFNLENBQUMsTUFBTSxDQUFDLHlGQUFlLENBQUMsQ0FBQztBQUV2QyxNQUFNLG1CQUFtQjtJQUN0QixPQUFPLENBQW9CO0lBQzNCLE9BQU8sQ0FBeUI7SUFFeEMsWUFBbUIsTUFBeUI7UUFDMUMsSUFBSSxDQUFDLE9BQU8sR0FBRyxNQUFNLENBQUM7UUFDdEIsSUFBSSxDQUFDLE9BQU8sR0FBRyxJQUFJLGVBQWUsQ0FBQyxNQUFNLENBQUMsTUFBTSxDQUFDLENBQUM7SUFDcEQsQ0FBQztJQUVNLFdBQVcsQ0FBQyxPQUFZO1FBQzdCLElBQUksQ0FBQyxPQUFPLENBQUMsR0FBRyxDQUFDLE9BQU8sRUFBRSxJQUFJLENBQUMsQ0FBQztJQUNsQyxDQUFDO0lBRU0sV0FBVztRQUNoQixPQUFPLElBQUksQ0FBQyxPQUFPLENBQUMsR0FBRyxFQUFFLENBQUM7SUFDNUIsQ0FBQztDQUNGO0FBQUEsQ0FBQztBQUVLLE1BQU0sZUFBZTtJQUNsQixPQUFPLENBQWlCO0lBQ3hCLE9BQU8sQ0FBb0I7SUFDM0IsT0FBTyxDQUF5QjtJQUV4QyxZQUFtQixNQUFzQixFQUFFLE1BQXlCO1FBQ2xFLElBQUksQ0FBQyxPQUFPLEdBQUcsTUFBTSxDQUFDO1FBQ3RCLElBQUksQ0FBQyxPQUFPLEdBQUcsTUFBTSxDQUFDO1FBQ3RCLElBQUksQ0FBQyxPQUFPLEdBQUcsSUFBSSxlQUFlLENBQUMsTUFBTSxDQUFDLE1BQU0sQ0FBQyxDQUFDO0lBQ3BELENBQUM7SUFFTSxXQUFXLENBQUMsSUFBUztRQUMxQixJQUFJLENBQUMsT0FBTyxDQUFDLEdBQUcsQ0FBQyxJQUFJLENBQUMsQ0FBQztRQUN2QixJQUFJLENBQUMsT0FBTyxDQUFDLFdBQVcsQ0FBQyxJQUFJLENBQUMsT0FBTyxDQUFDLENBQUM7UUFDdkMsT0FBTyxJQUFJLENBQUMsT0FBTyxDQUFDLEdBQUcsQ0FBQyxJQUFJLENBQUMsQ0FBQztJQUNoQyxDQUFDO0NBQ0Y7QUFBQSxDQUFDO0FBRUYsV0FBaUIsZUFBZTtJQUVoQyxNQUFNLFlBQVksR0FBRyxDQUFDLENBQUM7SUFFdkIsTUFBYSxNQUFNO1FBQ1QsT0FBTyxDQUFhO1FBQ3BCLEtBQUssQ0FBYTtRQUNsQixNQUFNLENBQVM7UUFFdkIsWUFBbUIsTUFBeUI7WUFDMUMsSUFBSSxDQUFDLE9BQU8sR0FBRyxJQUFJLFVBQVUsQ0FBQyxNQUFNLEVBQUUsWUFBWSxFQUFFLENBQUMsQ0FBQyxDQUFDO1lBQ3ZELElBQUksQ0FBQyxLQUFLLEdBQUcsSUFBSSxVQUFVLENBQUMsTUFBTSxFQUFFLElBQUksQ0FBQyxPQUFPLENBQUMsaUJBQWlCLENBQUMsQ0FBQztZQUNwRSxJQUFJLENBQUMsTUFBTSxHQUFHLENBQUMsQ0FBQztRQUNsQixDQUFDO1FBRU0sR0FBRyxDQUFDLElBQUksR0FBRyxLQUFLO1lBQ3JCLElBQUksSUFBSSxFQUFFLENBQUM7Z0JBQ1QsT0FBTyxDQUFDLElBQUksQ0FBQyxJQUFJLENBQUMsT0FBTyxFQUFFLFlBQVksRUFBRSxJQUFJLENBQUMsTUFBTSxDQUFDLENBQUM7WUFDeEQsQ0FBQztZQUVELElBQUksQ0FBQyxNQUFNLEdBQUcsSUFBSSxDQUFDLE9BQU8sQ0FBQyxDQUFDLENBQUMsQ0FBQztZQUM5QixNQUFNLE1BQU0sR0FBRyxJQUFJLENBQUMsTUFBTSxJQUFJLENBQUMsQ0FBQztZQUNoQyxNQUFNLEtBQUssR0FBRyxJQUFJLENBQUMsS0FBSyxDQUFDLEtBQUssQ0FBQyxDQUFDLEVBQUUsTUFBTSxDQUFDLENBQUM7WUFDMUMsTUFBTSxPQUFPLEdBQUcsQ0FBQyxJQUFJLFdBQVcsRUFBRSxDQUFDLENBQUMsTUFBTSxDQUFDLEtBQUssQ0FBQyxDQUFDO1lBRWxELE9BQU8sSUFBSSxDQUFDLEtBQUssQ0FBQyxPQUFPLENBQUMsQ0FBQztRQUM3QixDQUFDO1FBRU0sR0FBRyxDQUFDLElBQVMsRUFBRSxNQUFNLEdBQUcsS0FBSztZQUNsQyxNQUFNLE9BQU8sR0FBRyxJQUFJLENBQUMsU0FBUyxDQUFDLElBQUksQ0FBQyxDQUFDO1lBQ3JDLE1BQU0sS0FBSyxHQUFHLENBQUMsSUFBSSxXQUFXLEVBQUUsQ0FBQyxDQUFDLE1BQU0sQ0FBQyxPQUFPLENBQUMsQ0FBQztZQUNsRCxJQUFJLENBQUMsS0FBSyxDQUFDLEdBQUcsQ0FBQyxLQUFLLENBQUMsQ0FBQztZQUN0QixJQUFJLENBQUMsTUFBTSxHQUFHLENBQUMsS0FBSyxDQUFDLE1BQU0sSUFBSSxDQUFDLENBQUMsR0FBRyxDQUFDLENBQUMsSUFBSSxDQUFDLE1BQU0sR0FBRyxDQUFDLENBQUMsR0FBRyxHQUFHLENBQUMsQ0FBQztZQUM5RCxJQUFJLENBQUMsT0FBTyxDQUFDLENBQUMsQ0FBQyxHQUFHLElBQUksQ0FBQyxNQUFNLENBQUM7WUFFOUIsSUFBSSxNQUFNLEVBQUUsQ0FBQztnQkFDWCxPQUFPLENBQUMsTUFBTSxDQUFDLElBQUksQ0FBQyxPQUFPLEVBQUUsWUFBWSxFQUFFLENBQUMsQ0FBQyxDQUFDO1lBQ2hELENBQUM7UUFDSCxDQUFDO0tBQ0Y7SUFuQ1ksc0JBQU0sU0FtQ2xCO0lBQUEsQ0FBQztBQUVGLENBQUMsRUF6Q2dCLGVBQWUsS0FBZixlQUFlLFFBeUMvQixDQUFDLDRCQUE0Qjs7Ozs7Ozs7Ozs7Ozs7OztBQzNGOUI7Ozs7Ozs7R0FPRztBQUkrQjtBQUVsQyxNQUFNLE1BQU0sR0FBRywyQ0FBTSxDQUFDLE1BQU0sQ0FBQywyRkFBZSxDQUFDLENBQUM7QUFFdkMsTUFBTSxpQkFBaUI7SUFDcEIsWUFBWSxDQUFjO0lBRWxDLFlBQW1CLFdBQXdCO1FBQ3pDLElBQUksQ0FBQyxZQUFZLEdBQUcsV0FBVyxDQUFDO0lBQ2xDLENBQUM7SUFFTSxXQUFXLENBQUMsT0FBWTtRQUM3QixNQUFNLENBQUMsS0FBSyxDQUFDLEtBQUssRUFBRSxJQUFJLENBQUMsU0FBUyxDQUFDLE9BQU8sQ0FBQyxDQUFDLENBQUM7UUFDN0MsSUFBSSxDQUFDLFlBQVksQ0FBQyxXQUFXLENBQUMsT0FBTyxDQUFDLENBQUM7SUFDekMsQ0FBQztDQUNGO0FBQUEsQ0FBQzs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7QUMxQkY7Ozs7Ozs7R0FPRztBQUU4QztBQUNrQjtBQUVSO0FBQ0s7QUFDRTtBQUNoQztBQUNrQztBQUNoQjtBQUdwRCxNQUFNLE1BQU0sR0FBRywyQ0FBTSxDQUFDLE1BQU0sQ0FBQywyRkFBZSxDQUFDLENBQUM7QUFFdkMsTUFBTSxpQkFBa0IsU0FBUSwwREFBVztJQUN4QyxVQUFVLENBQXFCO0lBRXZDLFlBQW1CLEtBQWtCLEVBQUUsU0FBNkI7UUFDbEUsS0FBSyxDQUFDLEtBQUssQ0FBQyxDQUFDO1FBQ2IsSUFBSSxDQUFDLFVBQVUsR0FBRyxTQUFTLENBQUM7SUFDOUIsQ0FBQztJQUVNLGFBQWEsQ0FBQyxLQUFrQixFQUFFLE1BQVcsRUFBRSxNQUFXO1FBQy9ELE1BQU0sQ0FBQyxLQUFLLENBQUMsa0NBQWtDLEVBQUUsTUFBTSxFQUFFLE1BQU0sRUFBRSxHQUFHLENBQUMsQ0FBQztRQUN0RSxNQUFNLGNBQWMsR0FBRyxvREFBVyxDQUFDLGdCQUFnQixDQUFDLEtBQUssQ0FBQyxDQUFDO1FBQzNELE1BQU0sSUFBSSxvREFBVyxDQUFDLHlCQUF5QixDQUFDLGNBQWMsRUFBRSxFQUFFLEVBQUUsTUFBTSxDQUFDLENBQUM7UUFDNUUsTUFBTSxVQUFVLEdBQUcsb0RBQVcsQ0FBQyxHQUFHLENBQUMsY0FBYyxFQUFFLFlBQVksQ0FBQyxDQUFDLE9BQU8sQ0FBQyxNQUFNLENBQUMsQ0FBQztRQUNqRixvREFBVyxDQUFDLEdBQUcsQ0FBQyxjQUFjLEVBQUUsYUFBYSxFQUFFLFVBQVUsQ0FBQyxDQUFDO1FBQzNELG9EQUFXLENBQUMsR0FBRyxDQUFDLGNBQWMsRUFBRSxZQUFZLEVBQUUsVUFBVSxDQUFDLE9BQU8sRUFBRSxDQUFDLENBQUM7UUFDcEUsT0FBTyxJQUFJLENBQUMsVUFBVSxDQUFDLFdBQVcsQ0FBQyx5RUFBc0IsRUFBRSxvREFBVyxDQUFDLE1BQU0sQ0FBQyxjQUFjLENBQUMsQ0FBQyxDQUFDO0lBQ2pHLENBQUM7SUFFTSxpQkFBaUIsQ0FBQyxLQUFrQixFQUFFLE1BQTJCO1FBQ3RFLE1BQU0sQ0FBQyxLQUFLLENBQUMsc0NBQXNDLEVBQUUsTUFBTSxFQUFFLEdBQUcsQ0FBQyxDQUFDO1FBQ2xFLElBQUksU0FBUyxHQUFHLE1BQU0sQ0FBQztRQUN2QixJQUFJLE9BQU8sTUFBTSxLQUFLLFFBQVEsRUFBRSxDQUFDO1lBQy9CLE1BQU0sUUFBUSxHQUFHLG9EQUFXLENBQUMsR0FBRyxDQUFDLEtBQUssRUFBRSxZQUFZLENBQUMsQ0FBQyxPQUFPLENBQUMsTUFBTSxDQUFDLENBQUMsUUFBUSxFQUFFLENBQUM7WUFDakYsU0FBUyxHQUFHLElBQUksQ0FBQyxVQUFVLENBQUMsV0FBVyxDQUFDLG9FQUFpQixFQUFFLFFBQVEsQ0FBQyxDQUFDO1FBQ3ZFLENBQUM7UUFDRCxvREFBVyxDQUFDLDRCQUE0QixDQUFDLEtBQUssRUFBRSw2REFBcUIsRUFBRSxTQUFTLENBQUMsQ0FBQztJQUNwRixDQUFDO0lBRU0sZUFBZSxDQUFDLEtBQWtCLEVBQUUsU0FBZ0MsRUFBRSxTQUFpQztRQUM1RyxNQUFNLENBQUMsS0FBSyxDQUFDLG9DQUFvQyxFQUFFLFNBQVMsRUFBRSxTQUFTLEVBQUUsR0FBRyxDQUFDLENBQUM7UUFDOUUsTUFBTSxjQUFjLEdBQUcsZ0ZBQTZCLENBQUMsS0FBSyxFQUFFLFNBQVMsRUFBRSxTQUFTLENBQUMsQ0FBQztRQUNsRixJQUFJLENBQUMsVUFBVSxDQUFDLFdBQVcsQ0FBQywyRUFBd0IsRUFBRSxvREFBVyxDQUFDLE1BQU0sQ0FBQyxjQUFjLENBQUMsQ0FBQyxDQUFDO0lBQzVGLENBQUM7Q0FDRjtBQUFBLENBQUM7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7O0FDdkRGOzs7Ozs7O0dBT0c7QUFFSSxNQUFNLDRCQUE0QixHQUFHLDhCQUE4QixDQUFDO0FBQ3BFLE1BQU0sNEJBQTRCLEdBQUcsOEJBQThCLENBQUM7QUFDcEUsTUFBTSwwQkFBMEIsR0FBRyw0QkFBNEIsQ0FBQztBQUNoRSxNQUFNLHNCQUFzQixHQUFHLHdCQUF3QixDQUFDO0FBQ3hELE1BQU0sc0JBQXNCLEdBQUcsd0JBQXdCLENBQUM7QUFDeEQsTUFBTSxzQkFBc0IsR0FBRyx3QkFBd0IsQ0FBQztBQUN4RCxNQUFNLHNCQUFzQixHQUFHLHdCQUF3QixDQUFDO0FBQ3hELE1BQU0seUJBQXlCLEdBQUcsMkJBQTJCLENBQUM7QUFDOUQsTUFBTSxzQkFBc0IsR0FBRyx3QkFBd0IsQ0FBQztBQUV4RCxNQUFNLGlCQUFpQixHQUFHLG1CQUFtQixDQUFDO0FBQzlDLE1BQU0sc0JBQXNCLEdBQUcsd0JBQXdCLENBQUM7QUFDeEQsTUFBTSx3QkFBd0IsR0FBRywwQkFBMEIsQ0FBQzs7Ozs7Ozs7Ozs7Ozs7O0FDckJuRTs7Ozs7OztHQU9HO0FBRUksTUFBTSxlQUFlLEdBQUcsS0FBSyxDQUFDO0FBR3BDLENBQUM7QUFJRCxDQUFDO0FBSUQsQ0FBQztBQU9ELENBQUM7QUFJRCxDQUFDO0FBYUQsQ0FBQztBQU9ELENBQUM7QUFJRCxDQUFDOzs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7QUN2REY7Ozs7Ozs7R0FPRztBQUc4RDtBQUNGO0FBQ047QUFDTDtBQUlEO0FBQ1I7QUFFcEMsTUFBTSxVQUFVO0lBQ2IsS0FBSyxDQUFTO0lBQ2QsVUFBVSxDQUFxQjtJQUMvQixhQUFhLEdBQUcsSUFBSSxHQUE4QixDQUFDO0lBQ25ELGlCQUFpQixHQUFHLENBQUMsQ0FBQztJQUN0QixZQUFZLEdBQUcsSUFBSSxLQUFpQixDQUFDO0lBQ3JDLFlBQVksR0FBRyxJQUFJLEtBQWlCLENBQUM7SUFDckMsWUFBWSxHQUFHLElBQUksS0FBbUIsQ0FBQztJQUN2QyxZQUFZLEdBQUcsSUFBSSxLQUF1QixDQUFDO0lBQzNDLGVBQWUsR0FBRyxJQUFJLEtBQW9CLENBQUM7SUFFbkQsWUFBbUIsSUFBWSxFQUFFLFdBQXlCO1FBQ3hELElBQUksQ0FBQyxLQUFLLEdBQUcsSUFBSSxDQUFDO1FBQ2xCLElBQUksQ0FBQyxVQUFVLEdBQUcsSUFBSSwwRUFBa0IsQ0FBQyxXQUFXLENBQUMsQ0FBQztJQUN4RCxDQUFDO0lBRU0saUJBQWlCLENBQUMsTUFBVztRQUNsQyxNQUFNLElBQUksR0FBRyxJQUFJLENBQUMsS0FBSyxHQUFHLEdBQUcsR0FBRyxJQUFJLENBQUMsaUJBQWlCLEVBQUUsQ0FBQztRQUN6RCxPQUFPLElBQUksQ0FBQztJQUNkLENBQUM7SUFFTSxpQkFBaUIsQ0FBQyxNQUFXO1FBQ2xDLE9BQU8sSUFBSSxDQUFDLGFBQWEsQ0FBQyxNQUFNLENBQUMsTUFBTSxDQUFDLENBQUM7SUFDM0MsQ0FBQztJQUVNLEtBQUssQ0FBQyxjQUFjLENBQUMsTUFBVztRQUNyQyxNQUFNLFdBQVcsR0FBRyxvREFBVyxDQUFDLFFBQVEsQ0FBQyxNQUFNLENBQUMsQ0FBQztRQUVqRCxNQUFNLEdBQUcsR0FBRyxJQUFJLHdFQUFpQixDQUFDLFdBQVcsRUFBRSxJQUFJLENBQUMsVUFBVSxDQUFDLENBQUM7UUFDaEUsTUFBTSxFQUFFLEdBQUcsa0VBQWUsQ0FBQyxNQUFNLENBQUMsR0FBRyxFQUFFLFdBQVcsQ0FBQyxDQUFDO1FBQ3BELE1BQU0saUVBQWMsQ0FBQyxFQUFFLENBQUMsQ0FBQztRQUV6QixJQUFJLENBQUMsWUFBWSxHQUFHLEtBQUssQ0FBQyxJQUFJLENBQUMsR0FBRyxDQUFDLE9BQU8sQ0FBQyxNQUFNLEVBQUUsQ0FBQyxDQUFDO1FBQ3JELElBQUksQ0FBQyxZQUFZLEdBQUcsS0FBSyxDQUFDLElBQUksQ0FBQyxHQUFHLENBQUMsV0FBVyxDQUFDLE1BQU0sRUFBRSxDQUFDLENBQUM7UUFDekQsSUFBSSxDQUFDLFlBQVksR0FBRyxLQUFLLENBQUMsSUFBSSxDQUFDLEdBQUcsQ0FBQyxXQUFXLENBQUMsTUFBTSxFQUFFLENBQUMsQ0FBQztRQUN6RCxJQUFJLENBQUMsWUFBWSxHQUFHLEtBQUssQ0FBQyxJQUFJLENBQUMsR0FBRyxDQUFDLFdBQVcsQ0FBQyxNQUFNLEVBQUUsQ0FBQyxDQUFDO1FBQ3pELElBQUksQ0FBQyxlQUFlLEdBQUcsS0FBSyxDQUFDLElBQUksQ0FBQyxHQUFHLENBQUMsV0FBVyxDQUFDLENBQUM7SUFDckQsQ0FBQztJQUVNLFdBQVcsQ0FBQyxNQUFXO1FBQzVCLE9BQU8sNERBQVksQ0FBQyxNQUFNLENBQUMsSUFBSSxDQUFDLFlBQVksQ0FBQyxDQUFDO0lBQ2hELENBQUM7SUFFTSxXQUFXLENBQUMsTUFBVztRQUM1QixPQUFPLDREQUFZLENBQUMsTUFBTSxDQUFDLElBQUksQ0FBQyxZQUFZLENBQUMsQ0FBQztJQUNoRCxDQUFDO0lBRU0sV0FBVyxDQUFDLE1BQVc7UUFDNUIsT0FBTyw0REFBWSxDQUFDLE1BQU0sQ0FBQyxJQUFJLENBQUMsWUFBWSxDQUFDLENBQUM7SUFDaEQsQ0FBQztJQUVNLFdBQVcsQ0FBQyxNQUFXO1FBQzVCLE9BQU8sNERBQVksQ0FBQyxNQUFNLENBQUMsSUFBSSxDQUFDLFlBQVksQ0FBQyxDQUFDO0lBQ2hELENBQUM7SUFFTSxjQUFjLENBQUMsTUFBVztRQUMvQixPQUFPLDREQUFZLENBQUMsTUFBTSxDQUFDLElBQUksQ0FBQyxlQUFlLENBQUMsQ0FBQztJQUNuRCxDQUFDO0lBRU0sV0FBVyxDQUFDLE1BQVc7UUFDNUIsVUFBVSxDQUFDLEdBQUcsRUFBRSxDQUFDLE9BQU8sQ0FBQyxJQUFJLENBQUMsTUFBTSxDQUFDLEVBQUUsQ0FBQyxDQUFDLENBQUM7SUFDNUMsQ0FBQztDQUNGO0FBQUEsQ0FBQzs7Ozs7Ozs7Ozs7Ozs7OztBQ2xGRjs7Ozs7OztHQU9HO0FBSStCO0FBRWxDLE1BQU0sTUFBTSxHQUFHLDJDQUFNLENBQUMsTUFBTSxDQUFDLHNGQUFlLENBQUMsQ0FBQztBQUV2QyxNQUFNLFlBQVk7SUFDZixPQUFPLENBQVM7SUFFeEIsWUFBbUIsTUFBYztRQUMvQixJQUFJLENBQUMsT0FBTyxHQUFHLE1BQU0sQ0FBQztJQUN4QixDQUFDO0lBRU0sV0FBVyxDQUFDLE9BQVk7UUFDN0IsTUFBTSxDQUFDLEtBQUssQ0FBQyxLQUFLLEVBQUUsT0FBTyxDQUFDLENBQUM7UUFDN0IsSUFBSSxDQUFDLE9BQU8sQ0FBQyxXQUFXLENBQUMsT0FBTyxDQUFDLENBQUM7SUFDcEMsQ0FBQztDQUNGO0FBQUEsQ0FBQzs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7QUMxQkY7Ozs7Ozs7R0FPRztBQUd3RDtBQUNKO0FBQ047QUFDbUI7QUFDSjtBQUNBO0FBQ0E7QUFDQTtBQUNHO0FBQ0g7QUFDOUI7QUFFbEMsTUFBTSxNQUFNLEdBQUcsMkNBQU0sQ0FBQyxNQUFNLENBQUMsdUZBQWUsQ0FBQyxDQUFDO0FBRXZDLE1BQU0sYUFBYTtJQUNoQixjQUFjLENBQWdCO0lBRXRDLFlBQW1CLElBQVksRUFBRSxNQUFzQjtRQUNyRCxJQUFJLENBQUMsY0FBYyxHQUFHLElBQUksZ0VBQWEsQ0FBQztRQUV4QyxNQUFNLE1BQU0sR0FBRyxJQUFJLGlCQUFpQixDQUFDLE1BQU0sQ0FBQyxDQUFDO1FBQzdDLE1BQU0sU0FBUyxHQUFHLElBQUksb0VBQWUsQ0FBQyxNQUFNLEVBQUUsTUFBTSxDQUFDLENBQUM7UUFFdEQsTUFBTSxVQUFVLEdBQUcsSUFBSSwwREFBVSxDQUFDLElBQUksRUFBRSxTQUFTLENBQUMsQ0FBQztRQUNuRCxJQUFJLENBQUMsY0FBYyxDQUFDLGdCQUFnQixDQUFDLDZFQUEwQixFQUFFLE1BQU0sQ0FBQyxFQUFFLENBQUMsVUFBVSxDQUFDLGNBQWMsQ0FBQyxNQUFNLENBQUMsQ0FBQyxDQUFDO1FBQzlHLElBQUksQ0FBQyxjQUFjLENBQUMsZ0JBQWdCLENBQUMseUVBQXNCLEVBQUUsTUFBTSxDQUFDLEVBQUUsQ0FBQyxVQUFVLENBQUMsV0FBVyxDQUFDLE1BQU0sQ0FBQyxDQUFDLENBQUM7UUFDdkcsSUFBSSxDQUFDLGNBQWMsQ0FBQyxnQkFBZ0IsQ0FBQyx5RUFBc0IsRUFBRSxNQUFNLENBQUMsRUFBRSxDQUFDLFVBQVUsQ0FBQyxXQUFXLENBQUMsTUFBTSxDQUFDLENBQUMsQ0FBQztRQUN2RyxJQUFJLENBQUMsY0FBYyxDQUFDLGdCQUFnQixDQUFDLHlFQUFzQixFQUFFLE1BQU0sQ0FBQyxFQUFFLENBQUMsVUFBVSxDQUFDLFdBQVcsQ0FBQyxNQUFNLENBQUMsQ0FBQyxDQUFDO1FBQ3ZHLElBQUksQ0FBQyxjQUFjLENBQUMsZ0JBQWdCLENBQUMseUVBQXNCLEVBQUUsTUFBTSxDQUFDLEVBQUUsQ0FBQyxVQUFVLENBQUMsV0FBVyxDQUFDLE1BQU0sQ0FBQyxDQUFDLENBQUM7UUFDdkcsSUFBSSxDQUFDLGNBQWMsQ0FBQyxnQkFBZ0IsQ0FBQyw0RUFBeUIsRUFBRSxNQUFNLENBQUMsRUFBRSxDQUFDLFVBQVUsQ0FBQyxjQUFjLENBQUMsTUFBTSxDQUFDLENBQUMsQ0FBQztRQUM3RyxJQUFJLENBQUMsY0FBYyxDQUFDLGdCQUFnQixDQUFDLHlFQUFzQixFQUFFLE1BQU0sQ0FBQyxFQUFFLENBQUMsVUFBVSxDQUFDLFdBQVcsQ0FBQyxNQUFNLENBQUMsQ0FBQyxDQUFDO0lBQ3pHLENBQUM7SUFFTSxXQUFXLENBQUMsTUFBc0IsRUFBRSxPQUFZO1FBQ3JELE9BQU8sSUFBSSxDQUFDLGNBQWMsQ0FBQyxXQUFXLENBQUMsTUFBTSxFQUFFLE9BQU8sQ0FBQyxDQUFDO0lBQzFELENBQUM7Q0FDRjtBQUFBLENBQUM7Ozs7Ozs7Ozs7Ozs7OztBQzlDRjs7Ozs7OztHQU9HO0FBRUksSUFBVSxJQUFJLENBNkRwQjtBQTdERCxXQUFpQixJQUFJO0lBRXJCLFNBQVMsV0FBVyxDQUFDLElBQVk7UUFDL0IsSUFBSSxDQUFDLElBQUksQ0FBQyxVQUFVLENBQUMsSUFBSSxDQUFDO1lBQ3hCLE9BQU8sSUFBSSxDQUFDO1FBRWQsSUFBSSxHQUFHLElBQUksQ0FBQyxTQUFTLENBQUMsQ0FBQyxDQUFDLENBQUMsV0FBVyxFQUFFLENBQUM7UUFDdkMsSUFBSSxDQUFDLElBQUksQ0FBQyxNQUFNO1lBQ2QsT0FBTyxJQUFJLENBQUM7UUFFZCxJQUFJLEdBQUcsR0FBRyxJQUFJLENBQUMsTUFBTSxDQUFDLENBQUMsQ0FBQyxDQUFDO1FBQ3pCLElBQUksQ0FBQyxHQUFHLENBQUMsS0FBSyxDQUFDLE9BQU8sQ0FBQztZQUNyQixPQUFPLElBQUksQ0FBQztRQUVkLElBQUksTUFBTSxHQUFHLENBQUMsQ0FBQztRQUNmLEtBQUssSUFBSSxDQUFDLEdBQUcsQ0FBQyxFQUFFLENBQUMsR0FBRyxJQUFJLENBQUMsTUFBTSxFQUFFLENBQUMsRUFBRSxFQUFFLENBQUM7WUFDckMsTUFBTSxFQUFFLEdBQUcsSUFBSSxDQUFDLE1BQU0sQ0FBQyxDQUFDLENBQUMsQ0FBQztZQUMxQixJQUFJLEVBQUUsQ0FBQyxLQUFLLENBQUMsVUFBVSxDQUFDLEVBQUUsQ0FBQztnQkFDekIsR0FBRyxJQUFJLENBQUMsTUFBTSxDQUFDLENBQUMsQ0FBQyxFQUFFLENBQUMsV0FBVyxFQUFFLENBQUMsQ0FBQyxDQUFDLEVBQUUsQ0FBQztnQkFDdkMsTUFBTSxHQUFHLENBQUMsQ0FBQztZQUNiLENBQUM7aUJBQ0ksSUFBSSxFQUFFLElBQUksR0FBRyxFQUFFLENBQUM7Z0JBQ25CLElBQUksRUFBRSxNQUFNLEdBQUcsQ0FBQztvQkFDZCxPQUFPLElBQUksQ0FBQztZQUNoQixDQUFDO1FBQ0gsQ0FBQztRQUVELE9BQU8sTUFBTSxDQUFDLENBQUMsQ0FBQyxJQUFJLENBQUMsQ0FBQyxDQUFDLEdBQUcsQ0FBQztJQUM3QixDQUFDO0lBRUQsU0FBZ0IsUUFBUSxDQUFDLElBQWM7UUFDckMsTUFBTSxNQUFNLEdBQVEsRUFBRSxDQUFDO1FBRXZCLElBQUksT0FBTyxHQUFHLElBQUksQ0FBQztRQUNuQixLQUFLLE1BQU0sSUFBSSxJQUFJLElBQUksRUFBRSxDQUFDO1lBQ3hCLElBQUksSUFBSSxDQUFDLFVBQVUsQ0FBQyxJQUFJLENBQUMsRUFBRSxDQUFDO2dCQUMxQixNQUFNLEdBQUcsR0FBRyxXQUFXLENBQUMsSUFBSSxDQUFDLENBQUM7Z0JBQzlCLElBQUksQ0FBQyxHQUFHO29CQUNOLE1BQU0sS0FBSyxDQUFDLFVBQVUsSUFBSSxtQkFBbUIsQ0FBQyxDQUFDO2dCQUNqRCxJQUFJLE1BQU0sQ0FBQyxjQUFjLENBQUMsR0FBRyxDQUFDO29CQUM1QixNQUFNLEtBQUssQ0FBQyxtQ0FBbUMsSUFBSSxrQkFBa0IsQ0FBQyxDQUFDO2dCQUN6RSxPQUFPLEdBQUcsR0FBRyxDQUFDO2dCQUNkLE1BQU0sQ0FBQyxHQUFHLENBQUMsR0FBRyxJQUFJLENBQUM7WUFDckIsQ0FBQztpQkFDSSxJQUFJLE9BQU8sRUFBRSxDQUFDO2dCQUNqQixNQUFNLEtBQUssR0FBRyxNQUFNLENBQUMsT0FBTyxDQUFDLENBQUM7Z0JBQzlCLElBQUksT0FBTyxLQUFLLEtBQUssU0FBUztvQkFDNUIsTUFBTSxDQUFDLE9BQU8sQ0FBQyxHQUFHLElBQUksQ0FBQztxQkFDcEIsSUFBSSxPQUFPLEtBQUssS0FBSyxRQUFRO29CQUNoQyxNQUFNLENBQUMsT0FBTyxDQUFDLEdBQUcsQ0FBRSxLQUFLLEVBQUUsSUFBSSxDQUFFLENBQUM7O29CQUVsQyxLQUFLLENBQUMsSUFBSSxDQUFDLElBQUksQ0FBQyxDQUFDO1lBQ3JCLENBQUM7aUJBQ0ksQ0FBQztnQkFDSixNQUFNLEtBQUssQ0FBQywyQ0FBMkMsSUFBSSxhQUFhLENBQUMsQ0FBQztZQUM1RSxDQUFDO1FBQ0gsQ0FBQztRQUVELE9BQU8sTUFBTSxDQUFDO0lBQ2hCLENBQUM7SUE3QmUsYUFBUSxXQTZCdkI7QUFFRCxDQUFDLEVBN0RnQixJQUFJLEtBQUosSUFBSSxRQTZEcEIsQ0FBQyxpQkFBaUI7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7QUN0RW5COzs7Ozs7O0dBT0c7QUFFMEI7QUFDSjtBQUNrQjtBQUNUO0FBRWxDLE1BQU0sTUFBTSxHQUFHLDJDQUFNLENBQUMsTUFBTSxDQUFDLHFGQUFlLENBQUMsQ0FBQztBQU12QyxTQUFTLFVBQVUsQ0FBQyxPQUFlLEVBQUUsSUFBYyxFQUFFLE9BQWE7SUFDdkUsSUFBSSxFQUFFLEdBQUcsSUFBSSxDQUFDO0lBQ2QsSUFBSSxPQUFPLEdBQUcsS0FBSyxDQUFDO0lBQ3BCLElBQUksT0FBTyxJQUFJLE9BQU8sQ0FBQyxLQUFLLEVBQUUsQ0FBQztRQUM3QixJQUFJLE9BQU8sQ0FBQyxLQUFLLENBQUMsT0FBTztZQUN2QixPQUFPLEdBQUcsSUFBSSxDQUFDO1FBQ2pCLElBQUksT0FBTyxDQUFDLEtBQUssQ0FBQyxNQUFNLEVBQUUsQ0FBQztZQUN6QixJQUFJLE9BQU8sR0FBRyxPQUFPLENBQUMsS0FBSyxDQUFDLE1BQU0sQ0FBQztZQUNuQyxJQUFJLENBQUMsMkRBQWUsQ0FBQyxPQUFPLENBQUMsSUFBSSxPQUFPLENBQUMsR0FBRyxFQUFFLENBQUM7Z0JBQzdDLE9BQU8sR0FBRyx3REFBWSxDQUFDLE9BQU8sQ0FBQyxHQUFHLEVBQUUsT0FBTyxDQUFDLENBQUM7WUFDL0MsQ0FBQztZQUNELEVBQUUsR0FBRyx1REFBVyxDQUFDLE9BQU8sRUFBRSxJQUFJLEVBQUUsS0FBSyxDQUFDLENBQUM7UUFDekMsQ0FBQztJQUNILENBQUM7SUFDRCxPQUFPLElBQUksT0FBTyxDQUFDLENBQUMsT0FBTyxFQUFFLE1BQU0sRUFBRSxFQUFFO1FBQ3JDLElBQUksRUFBRSxJQUFJLE9BQU8sRUFBRSxDQUFDO1lBQ2xCLE9BQU8sSUFBSSxNQUFNLENBQUMsTUFBTSxDQUFDLENBQUUseURBQWEsQ0FBQyxPQUFPLENBQUMsRUFBRSxHQUFHLElBQUksQ0FBRSxDQUFDLElBQUksQ0FBQyxHQUFHLENBQUMsQ0FBQyxDQUFDO1lBQ3hFLEVBQUUsSUFBSSx3REFBWSxDQUFDLEVBQUUsRUFBRSxJQUFJLENBQUMsU0FBUyxDQUFDLEVBQUMsT0FBTyxFQUFFLElBQUksRUFBRSxPQUFPLEVBQUUsRUFBRSxJQUFJLEVBQUUsQ0FBQyxDQUFDLEdBQUcsSUFBSSxDQUFDLENBQUM7UUFDcEYsQ0FBQztRQUNELE1BQU0sSUFBSSxHQUFHLHlEQUFLLENBQUMsT0FBTyxFQUFFLElBQUksRUFBRSxPQUFPLENBQUMsQ0FBQztRQUMzQyxJQUFJLENBQUMsTUFBTSxDQUFDLEVBQUUsQ0FBQyxNQUFNLEVBQUUsQ0FBQyxJQUFJLEVBQUUsRUFBRTtZQUM5QixPQUFPLENBQUMsTUFBTSxDQUFDLEtBQUssQ0FBQyxJQUFJLENBQUMsQ0FBQztZQUMzQixFQUFFLElBQUksd0RBQVksQ0FBQyxFQUFFLEVBQUUsSUFBSSxDQUFDLENBQUM7UUFDL0IsQ0FBQyxDQUFDLENBQUM7UUFDSCxJQUFJLENBQUMsTUFBTSxDQUFDLEVBQUUsQ0FBQyxNQUFNLEVBQUUsQ0FBQyxJQUFJLEVBQUUsRUFBRTtZQUM5QixPQUFPLENBQUMsTUFBTSxDQUFDLEtBQUssQ0FBQyxJQUFJLENBQUMsQ0FBQztZQUMzQixFQUFFLElBQUksd0RBQVksQ0FBQyxFQUFFLEVBQUUsSUFBSSxDQUFDLENBQUM7UUFDL0IsQ0FBQyxDQUFDLENBQUM7UUFDSCxJQUFJLENBQUMsRUFBRSxDQUFDLE9BQU8sRUFBRSxDQUFDLE1BQWMsRUFBRSxFQUFFO1lBQ2xDLEVBQUUsSUFBSSx3REFBWSxDQUFDLEVBQUUsQ0FBQyxDQUFDO1lBQ3ZCLE9BQU8sQ0FBQyxFQUFDLE1BQU0sRUFBQyxDQUFDLENBQUM7UUFDcEIsQ0FBQyxDQUFDLENBQUM7SUFDTCxDQUFDLENBQUMsQ0FBQztBQUNMLENBQUM7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7OztBQ3JERDs7Ozs7OztHQU9HO0FBRXNCO0FBQ0k7QUFDRjtBQUUrRDtBQUMxQztBQUV6QyxLQUFLLFVBQVUsVUFBVSxDQUFDLElBQVk7SUFDM0MsSUFBSSxDQUFDO1FBQ0gsT0FBTyxDQUFDLENBQUMsQ0FBQyxNQUFNLHVEQUFXLENBQUMsSUFBSSxDQUFDLElBQUksQ0FBQyxDQUFDLENBQUM7SUFDMUMsQ0FBQztJQUFDLE1BQU0sQ0FBQztRQUNQLE9BQU8sS0FBSyxDQUFDO0lBQ2YsQ0FBQztBQUNILENBQUM7QUFFTSxTQUFTLGNBQWMsQ0FBQyxJQUFZO0lBQ3pDLElBQUksQ0FBQztRQUNILE9BQU8sQ0FBQyxDQUFDLHVEQUFXLENBQUMsSUFBSSxDQUFDLENBQUM7SUFDN0IsQ0FBQztJQUFDLE1BQU0sQ0FBQztRQUNQLE9BQU8sS0FBSyxDQUFDO0lBQ2YsQ0FBQztBQUNILENBQUM7QUFFTSxLQUFLLFVBQVUsVUFBVSxDQUFDLElBQVk7SUFDM0MsSUFBSSxDQUFDO1FBQ0gsT0FBTyxDQUFDLE1BQU0sdURBQVcsQ0FBQyxJQUFJLENBQUMsSUFBSSxDQUFDLENBQUMsQ0FBQyxNQUFNLEVBQUUsQ0FBQztJQUNqRCxDQUFDO0lBQUMsTUFBTSxDQUFDO1FBQ1AsT0FBTyxLQUFLLENBQUM7SUFDZixDQUFDO0FBQ0gsQ0FBQztBQUVNLFNBQVMsY0FBYyxDQUFDLElBQVk7SUFDekMsSUFBSSxDQUFDO1FBQ0gsT0FBTyx1REFBVyxDQUFDLElBQUksQ0FBQyxDQUFDLE1BQU0sRUFBRSxDQUFDO0lBQ3BDLENBQUM7SUFBQyxNQUFNLENBQUM7UUFDUCxPQUFPLEtBQUssQ0FBQztJQUNmLENBQUM7QUFDSCxDQUFDO0FBRU0sS0FBSyxVQUFVLGVBQWUsQ0FBQyxJQUFZO0lBQ2hELElBQUksQ0FBQztRQUNILE9BQU8sQ0FBQyxNQUFNLHVEQUFXLENBQUMsSUFBSSxDQUFDLElBQUksQ0FBQyxDQUFDLENBQUMsV0FBVyxFQUFFLENBQUM7SUFDdEQsQ0FBQztJQUFDLE1BQU0sQ0FBQztRQUNQLE9BQU8sS0FBSyxDQUFDO0lBQ2YsQ0FBQztBQUNILENBQUM7QUFFTSxTQUFTLG1CQUFtQixDQUFDLElBQVk7SUFDOUMsSUFBSSxDQUFDO1FBQ0osT0FBTyx1REFBVyxDQUFDLElBQUksQ0FBQyxDQUFDLFdBQVcsRUFBRSxDQUFDO0lBQ3hDLENBQUM7SUFBQyxNQUFNLENBQUM7UUFDUCxPQUFPLEtBQUssQ0FBQztJQUNmLENBQUM7QUFDSCxDQUFDO0FBRU0sU0FBUyxPQUFPLENBQUMsUUFBZ0IsRUFBRSxPQUFZO0lBQ3BELElBQUksT0FBTyxFQUFFLE9BQU8sRUFBRSxDQUFDO1FBQ3JCLE1BQU0sUUFBUSxHQUFHLHlEQUFhLENBQUMsUUFBUSxDQUFDLENBQUM7UUFDekMsTUFBTSxLQUFLLEdBQUcsUUFBUSxDQUFDLE9BQU8sQ0FBQyxHQUFHLENBQUMsQ0FBQztRQUNwQyxPQUFPLEtBQUssSUFBSSxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsUUFBUSxDQUFDLFNBQVMsQ0FBQyxLQUFLLENBQUMsQ0FBQyxDQUFDLENBQUMsRUFBRSxDQUFDO0lBQ3RELENBQUM7SUFFRCxPQUFPLHdEQUFZLENBQUMsUUFBUSxDQUFDLENBQUM7QUFDaEMsQ0FBQztBQUVNLEtBQUssVUFBVSxRQUFRLENBQUMsT0FBZSxFQUFFLE9BQVk7SUFDMUQsTUFBTSxJQUFJLEdBQUcsSUFBSSxLQUFhLENBQUM7SUFDL0IsSUFBSSxNQUFNLGVBQWUsQ0FBQyxPQUFPLENBQUMsRUFBRSxDQUFDO1FBQ25DLEtBQUssTUFBTSxJQUFJLElBQUksTUFBTSx1REFBVyxDQUFDLE9BQU8sQ0FBQyxPQUFPLENBQUMsRUFBRSxDQUFDO1lBQ3RELE1BQU0sUUFBUSxHQUFHLHdEQUFZLENBQUMsT0FBTyxFQUFFLElBQUksQ0FBQyxDQUFDO1lBQzdDLE1BQU0sSUFBSSxHQUFHLE1BQU0sdURBQVcsQ0FBQyxJQUFJLENBQUMsUUFBUSxDQUFDLENBQUM7WUFDOUMsSUFBSSxJQUFJLENBQUMsTUFBTSxFQUFFLEVBQUUsQ0FBQztnQkFDbEIsSUFBSSxDQUFDLElBQUksQ0FBQyxPQUFPLENBQUMsUUFBUSxDQUFDLENBQUMsQ0FBQyx5REFBYSxDQUFDLE9BQU8sQ0FBQyxRQUFRLEVBQUUsUUFBUSxDQUFDLENBQUMsQ0FBQyxDQUFDLFFBQVEsQ0FBQyxDQUFDO1lBQ3JGLENBQUM7aUJBQ0ksSUFBSSxPQUFPLENBQUMsU0FBUyxJQUFJLElBQUksQ0FBQyxXQUFXLEVBQUUsRUFBRSxDQUFDO2dCQUNqRCxLQUFLLE1BQU0sS0FBSyxJQUFJLE1BQU0sUUFBUSxDQUFDLFFBQVEsRUFBRSxPQUFPLENBQUM7b0JBQ25ELElBQUksQ0FBQyxJQUFJLENBQUMsS0FBSyxDQUFDLENBQUM7WUFDckIsQ0FBQztRQUNILENBQUM7SUFDSCxDQUFDO0lBQ0QsT0FBTyxJQUFJLENBQUM7QUFDZCxDQUFDO0FBRU0sS0FBSyxVQUFVLGVBQWUsQ0FBQyxRQUFnQixFQUFFLE9BQWU7SUFDckUsSUFBSSxNQUFNLFVBQVUsQ0FBQyxRQUFRLENBQUMsRUFBRSxDQUFDO1FBQy9CLE1BQU0sVUFBVSxHQUFHLE1BQU0sdURBQVcsQ0FBQyxRQUFRLENBQUMsUUFBUSxFQUFFLEVBQUUsUUFBUSxFQUFFLE1BQU0sRUFBRSxDQUFDLENBQUM7UUFDOUUsSUFBSSxPQUFPLElBQUksVUFBVTtZQUN2QixPQUFPLEtBQUssQ0FBQztJQUNqQixDQUFDO0lBRUQsTUFBTSx1REFBVyxDQUFDLEtBQUssQ0FBQyx3REFBWSxDQUFDLFFBQVEsQ0FBQyxFQUFFLEVBQUUsU0FBUyxFQUFFLElBQUksRUFBRSxDQUFDLENBQUM7SUFDckUsTUFBTSx1REFBVyxDQUFDLFNBQVMsQ0FBQyxRQUFRLEVBQUUsT0FBTyxFQUFFLEVBQUUsUUFBUSxFQUFFLE1BQU0sRUFBRSxDQUFDLENBQUM7SUFFckUsT0FBTyxJQUFJLENBQUM7QUFDZCxDQUFDO0FBRU0sU0FBUyxhQUFhLENBQUMsR0FBVztJQUN2QyxJQUFJLEdBQUcsQ0FBQyxVQUFVLENBQUMsMkRBQWEsQ0FBQztRQUMvQixHQUFHLEdBQUcsNkRBQWMsQ0FBQyxHQUFHLENBQUMsS0FBSyxDQUFDLDJEQUFhLENBQUMsTUFBTSxDQUFDLENBQUMsQ0FBQztJQUN4RCxJQUFJLEdBQUcsQ0FBQyxVQUFVLENBQUMseURBQVcsQ0FBQztRQUM3QixPQUFPLDZEQUFpQixDQUFDLEdBQUcsQ0FBQyxDQUFDO0lBQ2hDLE9BQU8sR0FBRyxDQUFDO0FBQ2IsQ0FBQztBQUVNLFNBQVMsS0FBSyxDQUFDLEdBQVc7SUFDL0IsSUFBSSxDQUFDO1FBQ0gsSUFBSSxHQUFHLENBQUMsR0FBRyxDQUFDLENBQUM7UUFDYixPQUFPLElBQUksQ0FBQztJQUNkLENBQUM7SUFBQyxNQUFNLENBQUM7UUFDUCxPQUFPLEtBQUssQ0FBQztJQUNmLENBQUM7QUFDSCxDQUFDO0FBRU0sU0FBUyxZQUFZLENBQUMsR0FBVztJQUN0QyxJQUFJLEdBQUcsQ0FBQyxVQUFVLENBQUMsMkRBQWEsQ0FBQztRQUMvQixPQUFPLDZEQUFjLENBQUMsR0FBRyxDQUFDLEtBQUssQ0FBQywyREFBYSxDQUFDLE1BQU0sQ0FBQyxDQUFDLENBQUM7SUFDekQsSUFBSSxLQUFLLENBQUMsR0FBRyxDQUFDO1FBQ1osT0FBTyw2REFBaUIsQ0FBQyxHQUFHLENBQUMsQ0FBQztJQUNoQyxPQUFPLEdBQUcsQ0FBQztBQUNiLENBQUM7QUFFTSxLQUFLLFVBQVUsV0FBVyxDQUFDLEdBQVc7SUFDM0MsSUFBSSxHQUFHLENBQUMsVUFBVSxDQUFDLHlEQUFXLENBQUMsSUFBSSxHQUFHLENBQUMsVUFBVSxDQUFDLDBEQUFZLENBQUMsRUFBRSxDQUFDO1FBQ2hFLE1BQU0sUUFBUSxHQUFHLE1BQU0sS0FBSyxDQUFDLEdBQUcsQ0FBQyxDQUFDO1FBQ2xDLE9BQU8sTUFBTSxDQUFDLElBQUksQ0FBQyxNQUFNLFFBQVEsQ0FBQyxXQUFXLEVBQUUsQ0FBQyxDQUFDO0lBQ25ELENBQUM7SUFDRCxPQUFPLE1BQU0sdURBQVcsQ0FBQyxRQUFRLENBQUMsWUFBWSxDQUFDLEdBQUcsQ0FBQyxDQUFDLENBQUM7QUFDdkQsQ0FBQztBQUVNLEtBQUssVUFBVSxVQUFVLENBQUMsUUFBZ0IsRUFBRSxLQUFVLEVBQUUsT0FBNkI7SUFDMUYsTUFBTSxPQUFPLEdBQUcsSUFBSSxDQUFDLFNBQVMsQ0FBQyxLQUFLLEVBQUUsSUFBSSxFQUFFLE9BQU8sSUFBSSxPQUFPLENBQUMsTUFBTSxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDO0lBQy9FLE1BQU0sdURBQVcsQ0FBQyxLQUFLLENBQUMsd0RBQVksQ0FBQyxRQUFRLENBQUMsRUFBRSxFQUFFLFNBQVMsRUFBRSxJQUFJLEVBQUUsQ0FBQyxDQUFDO0lBQ3JFLE1BQU0sdURBQVcsQ0FBQyxTQUFTLENBQUMsUUFBUSxFQUFFLE9BQU8sRUFBRSxFQUFFLFFBQVEsRUFBRSxNQUFNLEVBQUUsQ0FBQyxDQUFDO0FBQ3ZFLENBQUM7Ozs7Ozs7Ozs7Ozs7Ozs7O0FDOUlEOzs7Ozs7O0dBT0c7QUFFc0I7QUFFekIsTUFBTSxlQUFlLEdBQ3JCO0lBQ0UsR0FBRyxFQUFNLENBQUM7SUFDVixLQUFLLEVBQUksQ0FBQztJQUNWLElBQUksRUFBSyxDQUFDO0lBQ1YsT0FBTyxFQUFFLENBQUM7SUFDVixJQUFJLEVBQUssQ0FBQztJQUNWLE1BQU0sRUFBRyxDQUFDO0lBQ1YsR0FBRyxFQUFNLENBQUM7SUFDVixLQUFLLEVBQUksQ0FBQztJQUNWLE9BQU8sRUFBRSxDQUFDO0lBQ1YsSUFBSSxFQUFLLENBQUM7SUFDVixLQUFLLEVBQUksQ0FBQztJQUNWLEdBQUcsRUFBTSxDQUFDO0NBQ1gsQ0FBQztBQUVGLE1BQU0sWUFBWSxHQUFHLGVBQWUsQ0FBQyxtREFBTyxFQUFFLENBQUMsQ0FBQztBQUNoRCxJQUFJLENBQUMsWUFBWTtJQUNmLE1BQU0sSUFBSSxLQUFLLENBQUMsV0FBVyxtREFBTyxFQUFFLE9BQU8sQ0FBQyxDQUFDO0FBRS9DLElBQUksaUJBQXlCLENBQUM7QUFFOUIsSUFBSSx1REFBVyxFQUFFLEtBQUssT0FBTyxFQUFFLENBQUM7SUFDOUIsaUJBQWlCLEdBQUcsTUFBTSxDQUFDO0FBQzdCLENBQUM7S0FDSSxDQUFDO0lBQ0osaUJBQWlCLEdBQUcsRUFBRSxDQUFDO0FBQ3pCLENBQUM7QUFFTSxNQUFNLElBQUk7SUFDZixNQUFNLEtBQUssV0FBVztRQUNwQixPQUFPLFlBQVksQ0FBQztJQUN0QixDQUFDO0lBQ0QsTUFBTSxLQUFLLGdCQUFnQjtRQUN6QixPQUFPLGlCQUFpQixDQUFDO0lBQzNCLENBQUM7Q0FDRjtBQUFBLENBQUM7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7QUMvQ0Y7Ozs7Ozs7R0FPRztBQUUwQjtBQUNKO0FBQ0Q7QUFDRTtBQUVRO0FBRWxDLE1BQU0sTUFBTSxHQUFHLDJDQUFNLENBQUMsTUFBTSxDQUFDLG9GQUFlLENBQUMsQ0FBQztBQUs3QyxDQUFDO0FBRUYsTUFBTSxhQUFhO0lBQ1QsT0FBTyxHQUFrQixFQUFFLENBQUM7SUFFN0IsTUFBTSxDQUFDLEtBQWE7UUFDekIsSUFBSSxDQUFDLE9BQU8sQ0FBQyxJQUFJLENBQUMsS0FBSyxDQUFDLENBQUM7SUFDM0IsQ0FBQztJQUVNLFFBQVE7UUFDYixPQUFPLE1BQU0sQ0FBQyxNQUFNLENBQUMsSUFBSSxDQUFDLE9BQU8sQ0FBQyxDQUFDO0lBQ3JDLENBQUM7Q0FDRjtBQUFBLENBQUM7QUFFRixNQUFNLGNBQWM7SUFDVixHQUFHLENBQVM7SUFFcEIsWUFBbUIsSUFBWTtRQUM3QixJQUFJLENBQUMsR0FBRyxHQUFHLHVEQUFXLENBQUMsSUFBSSxFQUFFLEdBQUcsQ0FBQyxDQUFDO0lBQ3BDLENBQUM7SUFFTSxNQUFNLENBQUMsS0FBYTtRQUN6Qix3REFBWSxDQUFDLElBQUksQ0FBQyxHQUFHLEVBQUUsS0FBSyxDQUFDLENBQUM7SUFDaEMsQ0FBQztJQUVNLFFBQVE7UUFDYix3REFBWSxDQUFDLElBQUksQ0FBQyxHQUFHLENBQUMsQ0FBQztJQUN6QixDQUFDO0NBQ0Y7QUFBQSxDQUFDO0FBRUYsU0FBUyxhQUFhLENBQUMsSUFBYTtJQUNsQyxJQUFJLElBQUk7UUFDTixPQUFPLElBQUksY0FBYyxDQUFDLElBQUksQ0FBQyxDQUFDO0lBQ2xDLE9BQU8sSUFBSSxhQUFhLENBQUM7QUFDM0IsQ0FBQztBQUVELFNBQVMsV0FBVyxDQUFDLEdBQVcsRUFBRSxPQUFtRCxFQUFFLFFBQWE7SUFDbEcsSUFBSSxHQUFHLENBQUMsVUFBVSxDQUFDLFVBQVUsQ0FBQztRQUM1QixPQUFPLG9EQUFhLENBQUMsR0FBRyxFQUFFLE9BQU8sRUFBRSxRQUFRLENBQUMsQ0FBQztJQUMvQyxPQUFPLG1EQUFZLENBQUMsR0FBRyxFQUFFLE9BQU8sRUFBRSxRQUFRLENBQUMsQ0FBQztBQUM5QyxDQUFDO0FBQUEsQ0FBQztBQUlELENBQUM7QUFFRixTQUFTLFNBQVMsQ0FBQyxHQUFXLEVBQUUsSUFBd0IsRUFBRSxPQUFxQjtJQUM3RSxPQUFPLElBQUksT0FBTyxDQUFDLENBQUMsT0FBTyxFQUFFLE1BQU0sRUFBRSxFQUFFO1FBQ3JDLE1BQU0sV0FBVyxHQUFHO1lBQ2xCLE1BQU0sRUFBRSxLQUFLO1lBQ2IsT0FBTyxFQUFFLElBQUk7WUFDYixPQUFPLEVBQUU7Z0JBQ1AsWUFBWSxFQUFFLFNBQVksR0FBRyxHQUFHLEdBQUcsa0JBQWU7Z0JBQ2xELFFBQVEsRUFBRSxLQUFLO2FBQ2hCO1NBQ0YsQ0FBQztRQUVGLElBQUksUUFBUSxHQUFHLE9BQU8sQ0FBQyxRQUFRLElBQUksQ0FBQyxDQUFDO1FBQ3JDLE1BQU0sU0FBUyxHQUFHLENBQUMsR0FBVyxFQUFFLEVBQUU7WUFDaEMsTUFBTSxPQUFPLEdBQUcsV0FBVyxDQUFDLEdBQUcsRUFBRSxXQUFXLEVBQUUsU0FBUyxDQUFDLENBQUM7WUFFekQsSUFBSSxRQUFRLEdBQUcsS0FBSyxDQUFDO1lBQ3JCLE1BQU0sT0FBTyxHQUFHLENBQUMsR0FBVSxFQUFFLEVBQUU7Z0JBQzdCLE9BQU8sQ0FBQyxPQUFPLEVBQUUsQ0FBQztnQkFDbEIsSUFBSSxDQUFDLFFBQVEsRUFBRSxDQUFDO29CQUNkLFFBQVEsR0FBRyxJQUFJLENBQUM7b0JBQ2hCLElBQUksUUFBUSxHQUFHLENBQUMsRUFBRSxDQUFDO3dCQUNqQixNQUFNLENBQUMsSUFBSSxDQUFDLEdBQUcsQ0FBQyxPQUFPLENBQUMsQ0FBQzt3QkFDekIsTUFBTSxDQUFDLElBQUksQ0FBQyxXQUFXLEdBQUcsYUFBYSxRQUFRLEVBQUUsQ0FBQyxDQUFDO3dCQUNuRCxRQUFRLEVBQUUsQ0FBQzt3QkFDWCxTQUFTLENBQUMsR0FBRyxDQUFDLENBQUM7b0JBQ2pCLENBQUM7eUJBQ0ksQ0FBQzt3QkFDSixNQUFNLENBQUMsR0FBRyxDQUFDLENBQUM7b0JBQ2QsQ0FBQztnQkFDSCxDQUFDO1lBQ0gsQ0FBQyxDQUFDO1lBRUYsT0FBTyxDQUFDLEVBQUUsQ0FBQyxTQUFTLEVBQUUsR0FBRyxFQUFFO2dCQUN6QixPQUFPLENBQUMsSUFBSSxLQUFLLENBQUMsY0FBYyxHQUFHLEdBQUcsQ0FBQyxDQUFDLENBQUM7WUFDM0MsQ0FBQyxDQUFDLENBQUM7WUFFSCxPQUFPLENBQUMsRUFBRSxDQUFDLE9BQU8sRUFBRSxDQUFDLEdBQVUsRUFBRSxFQUFFO2dCQUNqQyxPQUFPLENBQUMsR0FBRyxDQUFDLENBQUM7WUFDZixDQUFDLENBQUMsQ0FBQztZQUVILE9BQU8sQ0FBQyxHQUFHLEVBQUUsQ0FBQztRQUNoQixDQUFDLENBQUM7UUFFRixNQUFNLFFBQVEsR0FBRyx5REFBYSxDQUFDLEdBQUcsQ0FBQyxDQUFDO1FBQ3BDLE1BQU0sU0FBUyxHQUFHLENBQUMsUUFBOEIsRUFBRSxFQUFFO1lBQ25ELFFBQVEsUUFBUSxDQUFDLFVBQVUsRUFBRSxDQUFDO2dCQUM5QixLQUFLLEdBQUc7b0JBQ04sTUFBTSxDQUFDLEtBQUssQ0FBQyxlQUFnQixRQUFnQixDQUFDLEdBQUcsQ0FBQyxJQUFJLEVBQUUsQ0FBQyxDQUFDO29CQUMxRCxNQUFNLENBQUMsS0FBSyxDQUFDLGVBQWUsUUFBUSxFQUFFLENBQUMsQ0FBQztvQkFDeEMsTUFBTSxPQUFPLEdBQUcsYUFBYSxDQUFDLElBQUksQ0FBQyxDQUFDO29CQUNwQyxRQUFRLENBQUMsRUFBRSxDQUFDLE1BQU0sRUFBRSxDQUFDLEtBQWEsRUFBRSxFQUFFLENBQUMsT0FBTyxDQUFDLE1BQU0sQ0FBQyxLQUFLLENBQUMsQ0FBQyxDQUFDO29CQUM5RCxRQUFRLENBQUMsRUFBRSxDQUFDLEtBQUssRUFBRSxHQUFHLEVBQUUsQ0FBQyxPQUFPLENBQUMsT0FBTyxDQUFDLFFBQVEsRUFBRSxDQUFDLENBQUMsQ0FBQztvQkFDdEQsUUFBUSxDQUFDLEVBQUUsQ0FBQyxPQUFPLEVBQUUsR0FBRyxFQUFFLENBQUMsTUFBTSxDQUFDLEtBQUssQ0FBQyxPQUFPLENBQUMsQ0FBQyxDQUFDO29CQUNsRCxNQUFNO2dCQUVSLEtBQUssR0FBRyxDQUFDO2dCQUNULEtBQUssR0FBRztvQkFDTixRQUFRLENBQUMsTUFBTSxFQUFFLENBQUM7b0JBQ2xCLElBQUksUUFBUSxDQUFDLE9BQU8sQ0FBQyxRQUFRLEVBQUUsQ0FBQzt3QkFDOUIsTUFBTSxDQUFDLElBQUksQ0FBQyxjQUFjLEdBQUcsUUFBUSxDQUFDLE9BQU8sQ0FBQyxRQUFRLENBQUMsQ0FBQzt3QkFDeEQsU0FBUyxDQUFDLFFBQVEsQ0FBQyxPQUFPLENBQUMsUUFBUSxDQUFDLENBQUM7b0JBQ3ZDLENBQUM7b0JBQ0QsTUFBTTtnQkFFUjtvQkFDRSxRQUFRLENBQUMsTUFBTSxFQUFFLENBQUM7b0JBQ2xCLE1BQU0sT0FBTyxHQUFHLDJDQUEyQyxHQUFHLFFBQVEsQ0FBQyxVQUFVLENBQUM7b0JBQ2xGLE1BQU0sQ0FBQyxLQUFLLENBQUMsT0FBTyxDQUFDLENBQUM7b0JBQ3RCLE1BQU0sQ0FBQyxPQUFPLENBQUMsQ0FBQztvQkFDaEIsTUFBTTtZQUNSLENBQUM7UUFDSCxDQUFDLENBQUM7UUFFRixNQUFNLENBQUMsSUFBSSxDQUFDLE9BQU8sR0FBRyxHQUFHLENBQUMsQ0FBQztRQUMzQixTQUFTLENBQUMsR0FBRyxDQUFDLENBQUM7SUFDakIsQ0FBQyxDQUFDLENBQUM7QUFDTCxDQUFDO0FBQUEsQ0FBQztBQUVLLFNBQVMsVUFBVSxDQUFDLEdBQVcsRUFBRSxPQUFzQjtJQUM1RCxPQUFPLFNBQVMsQ0FBQyxHQUFHLEVBQUUsU0FBUyxFQUFFLE9BQU8sSUFBSSxFQUFFLENBQW9CLENBQUM7QUFDckUsQ0FBQztBQUVNLFNBQVMsWUFBWSxDQUFDLEdBQVcsRUFBRSxJQUFZLEVBQUUsT0FBc0I7SUFDNUUsT0FBTyxTQUFTLENBQUMsR0FBRyxFQUFFLElBQUksRUFBRSxPQUFPLElBQUksRUFBRSxDQUF1QixDQUFDO0FBQ25FLENBQUM7Ozs7Ozs7Ozs7Ozs7Ozs7OztBQ3ZKRDtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUUyQjs7QUFFcEI7O0FBRUE7QUFDUDtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRU87QUFDUDtBQUNBO0FBQ0E7QUFDQSxXQUFXLG1EQUFpQjtBQUM1QjtBQUNBOzs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7QUMzQnlCO0FBQ0k7QUFFaUI7QUFDWjtBQUVsQyxNQUFNLE1BQU0sR0FBRywyQ0FBTSxDQUFDLE1BQU0sQ0FBQyxrRkFBZSxDQUFDLENBQUM7QUFFdkMsS0FBSyxVQUFVLFNBQVMsQ0FBQyxNQUFjLEVBQUUsT0FBZTtJQUM3RCxNQUFNLENBQUMsSUFBSSxDQUFDLGNBQWMsTUFBTSxPQUFPLE9BQU8sRUFBRSxDQUFDLENBQUM7SUFDbEQsTUFBTSxJQUFJLEdBQUcsTUFBTSwyREFBUSxDQUFDLE1BQU0sRUFBRSxFQUFFLFFBQVEsRUFBRSxNQUFNLEVBQUUsU0FBUyxFQUFFLElBQUksRUFBRSxDQUFDLENBQUM7SUFDM0UsS0FBSyxNQUFNLElBQUksSUFBSSxJQUFJLEVBQUUsQ0FBQztRQUN4QixNQUFNLE1BQU0sR0FBRyx3REFBWSxDQUFDLE1BQU0sRUFBRSxJQUFJLENBQUMsQ0FBQztRQUMxQyxNQUFNLFdBQVcsR0FBRyx3REFBWSxDQUFDLE9BQU8sRUFBRSxJQUFJLENBQUMsQ0FBQztRQUNoRCxNQUFNLHVEQUFXLENBQUMsRUFBRSxDQUFDLE1BQU0sRUFBRSxXQUFXLEVBQUUsRUFBRSxLQUFLLEVBQUUsSUFBSSxFQUFFLENBQUMsQ0FBQztRQUMzRCxNQUFNLENBQUMsSUFBSSxDQUFDLGFBQWEsSUFBSSxFQUFFLENBQUMsQ0FBQztJQUNuQyxDQUFDO0FBQ0gsQ0FBQzs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7QUNqQkQ7Ozs7Ozs7R0FPRztBQUUrQztBQUNBO0FBQ0k7QUFFL0MsTUFBTSxXQUFXLEdBQUcsSUFBSSxDQUFDLFNBQVMsQ0FBbUIsQ0FBQztBQUV0RCxTQUFTLGNBQWMsQ0FBQyxJQUFZO0lBQ3pDLElBQUksS0FBeUM7UUFDM0MsRUFBaUM7SUFDbkMsSUFBSSxPQUFPLFdBQVcsS0FBSyxXQUFXO1FBQ3BDLE9BQU8sV0FBVyxDQUFDLE9BQU8sQ0FBQyxJQUFJLENBQUMsQ0FBQztJQUNuQyxNQUFNLElBQUksS0FBSyxDQUFDLHFDQUFxQyxDQUFDLENBQUM7QUFDekQsQ0FBQzs7Ozs7Ozs7Ozs7Ozs7Ozs7OztBQ3JCRDs7Ozs7OztHQU9HO0FBRXNCO0FBQ1E7QUFFakMsSUFBSSxTQUFTLEdBQUksd0RBQWMsQ0FBQyxHQUFHLENBQUM7QUFDcEMsSUFBSSxRQUFRLEdBQUcsd0RBQWMsQ0FBQyxHQUFHLENBQUM7QUFFbEMsSUFBSSx1REFBVyxFQUFFLEtBQUssT0FBTyxFQUFFLENBQUM7SUFDOUIsQ0FBRSxTQUFTLEVBQUUsUUFBUSxDQUFFLEdBQUcsQ0FBRSxRQUFRLEVBQUUsU0FBUyxDQUFFLENBQUM7QUFDcEQsQ0FBQztBQUVNLElBQVUsSUFBSSxDQXFDcEI7QUFyQ0QsV0FBaUIsSUFBSTtJQUVSLFFBQUcsR0FBRyx3REFBYyxDQUFDLEdBQUcsQ0FBQztJQUN6QixjQUFTLEdBQUcsNERBQWtCLENBQUM7SUFFNUMsU0FBZ0IsVUFBVSxDQUFDLElBQVk7UUFDckMsT0FBTyxJQUFJLENBQUMsVUFBVSxDQUFDLFFBQVEsRUFBRSxTQUFTLENBQUMsQ0FBQztJQUM5QyxDQUFDO0lBRmUsZUFBVSxhQUV6QjtJQUVELFNBQWdCLGFBQWEsQ0FBQyxJQUFZO1FBQ3hDLE9BQU8sSUFBSSxDQUFDLFVBQVUsQ0FBQyx3REFBYyxDQUFDLEdBQUcsRUFBRSx3REFBYyxDQUFDLEdBQUcsQ0FBQyxDQUFDO0lBQ2pFLENBQUM7SUFGZSxrQkFBYSxnQkFFNUI7SUFFRCxTQUFnQixVQUFVLENBQUMsSUFBWTtRQUNyQyxPQUFPLDJEQUFtQixDQUFDLFVBQVUsQ0FBQyxJQUFJLENBQUMsQ0FBQyxDQUFDO0lBQy9DLENBQUM7SUFGZSxlQUFVLGFBRXpCO0lBRUQsU0FBZ0IsSUFBSSxDQUFDLEdBQUcsS0FBZTtRQUNyQyxPQUFPLGFBQWEsQ0FBQyxxREFBYSxDQUFDLEdBQUcsS0FBSyxDQUFDLEdBQUcsQ0FBQyxDQUFDLENBQUMsRUFBRSxDQUFDLFVBQVUsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQztJQUN4RSxDQUFDO0lBRmUsU0FBSSxPQUVuQjtJQUVELFNBQWdCLE9BQU8sQ0FBQyxHQUFHLEtBQWU7UUFDeEMsT0FBTyxhQUFhLENBQUMsd0RBQWdCLENBQUMsR0FBRyxLQUFLLENBQUMsR0FBRyxDQUFDLENBQUMsQ0FBQyxFQUFFLENBQUMsVUFBVSxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDO0lBQzNFLENBQUM7SUFGZSxZQUFPLFVBRXRCO0lBRUQsU0FBZ0IsT0FBTyxDQUFDLElBQVk7UUFDbEMsT0FBTyxhQUFhLENBQUMsd0RBQWdCLENBQUMsVUFBVSxDQUFDLElBQUksQ0FBQyxDQUFDLENBQUMsQ0FBQztJQUMzRCxDQUFDO0lBRmUsWUFBTyxVQUV0QjtJQUVELFNBQWdCLFFBQVEsQ0FBQyxJQUFZLEVBQUUsTUFBZTtRQUNwRCxPQUFPLGFBQWEsQ0FBQyx5REFBaUIsQ0FBQyxVQUFVLENBQUMsSUFBSSxDQUFDLEVBQUUsTUFBTSxDQUFDLENBQUMsQ0FBQztJQUNwRSxDQUFDO0lBRmUsYUFBUSxXQUV2QjtJQUVELFNBQWdCLFFBQVEsQ0FBQyxJQUFZLEVBQUUsRUFBVTtRQUMvQyxPQUFPLGFBQWEsQ0FBQyx5REFBaUIsQ0FBQyxVQUFVLENBQUMsSUFBSSxDQUFDLEVBQUUsVUFBVSxDQUFDLEVBQUUsQ0FBQyxDQUFDLENBQUMsQ0FBQztJQUM1RSxDQUFDO0lBRmUsYUFBUSxXQUV2QjtBQUVELENBQUMsRUFyQ2dCLElBQUksS0FBSixJQUFJLFFBcUNwQixDQUFDLGlCQUFpQjs7Ozs7Ozs7Ozs7Ozs7Ozs7O0FDeERuQjs7Ozs7OztHQU9HO0FBRUksU0FBUyxVQUFVLENBQUMsQ0FBTSxFQUFFLENBQU07SUFDdkMsSUFBSSxDQUFDLEtBQUssQ0FBQztRQUNULE9BQU8sSUFBSSxDQUFDO0lBRWQsSUFBSSxDQUFDLEtBQUssU0FBUyxJQUFJLENBQUMsS0FBSyxTQUFTO1FBQ3BDLE9BQU8sS0FBSyxDQUFDO0lBRWYsSUFBSSxPQUFPLENBQUMsS0FBSyxRQUFRLElBQUksT0FBTyxDQUFDLEtBQUssUUFBUTtRQUNoRCxPQUFPLEtBQUssQ0FBQztJQUVmLE1BQU0sRUFBRSxHQUFHLE1BQU0sQ0FBQyxJQUFJLENBQUMsQ0FBQyxDQUFDLENBQUM7SUFDMUIsTUFBTSxFQUFFLEdBQUcsTUFBTSxDQUFDLElBQUksQ0FBQyxDQUFDLENBQUMsQ0FBQztJQUUxQixJQUFJLEVBQUUsQ0FBQyxNQUFNLElBQUksRUFBRSxDQUFDLE1BQU07UUFDeEIsT0FBTyxLQUFLLENBQUM7SUFFZixLQUFLLE1BQU0sR0FBRyxJQUFJLEVBQUUsRUFBRSxDQUFDO1FBQ3JCLElBQUksQ0FBQyxNQUFNLENBQUMsTUFBTSxDQUFDLENBQUMsRUFBRSxHQUFHLENBQUMsSUFBSSxDQUFDLFVBQVUsQ0FBQyxDQUFDLENBQUMsR0FBRyxDQUFDLEVBQUUsQ0FBQyxDQUFDLEdBQUcsQ0FBQyxDQUFDO1lBQ3ZELE9BQU8sS0FBSyxDQUFDO0lBQ2pCLENBQUM7SUFFRCxPQUFPLElBQUksQ0FBQztBQUNkLENBQUM7QUFFTSxTQUFTLFFBQVEsQ0FBQyxDQUFNO0lBQzdCLElBQUksQ0FBQyxDQUFDLElBQUksT0FBTyxDQUFDLEtBQUssUUFBUTtRQUM3QixPQUFPLENBQUMsQ0FBQztJQUNYLElBQUksS0FBSyxDQUFDLE9BQU8sQ0FBQyxDQUFDLENBQUMsRUFBRSxDQUFDO1FBQ3JCLE1BQU0sTUFBTSxHQUFHLEVBQUUsQ0FBQztRQUNsQixLQUFLLE1BQU0sSUFBSSxJQUFJLENBQUM7WUFDbEIsTUFBTSxDQUFDLElBQUksQ0FBQyxRQUFRLENBQUMsSUFBSSxDQUFDLENBQUMsQ0FBQztRQUM5QixPQUFPLE1BQU0sQ0FBQztJQUNoQixDQUFDO1NBQ0ksQ0FBQztRQUNKLE1BQU0sTUFBTSxHQUFHLEVBQVMsQ0FBQztRQUN6QixLQUFLLE1BQU0sQ0FBQyxHQUFHLEVBQUMsR0FBRyxDQUFDLElBQUksTUFBTSxDQUFDLE9BQU8sQ0FBQyxDQUFDLENBQUM7WUFDdkMsTUFBTSxDQUFDLEdBQUcsQ0FBQyxHQUFHLFFBQVEsQ0FBQyxHQUFHLENBQUMsQ0FBQztRQUM5QixPQUFPLE1BQU0sQ0FBQztJQUNoQixDQUFDO0FBQ0gsQ0FBQztBQUVNLFNBQVMsWUFBWSxDQUFDLE1BQVcsRUFBRSxNQUFXO0lBQ25ELElBQUksS0FBSyxDQUFDLE9BQU8sQ0FBQyxNQUFNLENBQUMsSUFBSSxLQUFLLENBQUMsT0FBTyxDQUFDLE1BQU0sQ0FBQyxFQUFFLENBQUM7UUFDbkQsS0FBSyxNQUFNLElBQUksSUFBSSxNQUFNO1lBQ3ZCLE1BQU0sQ0FBQyxJQUFJLENBQUMsSUFBSSxDQUFDLENBQUM7SUFDdEIsQ0FBQztTQUNJLENBQUM7UUFDSixLQUFLLE1BQU0sR0FBRyxJQUFJLE1BQU0sQ0FBQyxJQUFJLENBQUMsTUFBTSxDQUFDLEVBQUUsQ0FBQztZQUN0QyxNQUFNLENBQUMsR0FBRyxNQUFNLENBQUMsR0FBRyxDQUFDLEVBQUUsQ0FBQyxHQUFHLE1BQU0sQ0FBQyxHQUFHLENBQUMsQ0FBQztZQUN2QyxJQUFJLENBQUMsSUFBSSxPQUFPLENBQUMsS0FBSyxRQUFRLElBQUksQ0FBQyxJQUFJLE9BQU8sQ0FBQyxLQUFLLFFBQVE7Z0JBQzFELFlBQVksQ0FBQyxDQUFDLEVBQUUsQ0FBQyxDQUFDLENBQUM7O2dCQUVuQixNQUFNLENBQUMsR0FBRyxDQUFDLEdBQUcsUUFBUSxDQUFDLENBQUMsQ0FBQyxDQUFDO1FBQzlCLENBQUM7SUFDSCxDQUFDO0FBQ0gsQ0FBQztBQUVNLFNBQVMsWUFBWSxDQUFDLEtBQVU7SUFDckMsSUFBSSxLQUFLLEtBQUssU0FBUyxJQUFJLEtBQUssQ0FBQyxPQUFPLENBQUMsS0FBSyxDQUFDO1FBQzdDLE9BQU8sS0FBSyxDQUFDO0lBQ2YsT0FBTyxDQUFFLEtBQUssQ0FBRSxDQUFDO0FBQ25CLENBQUM7Ozs7Ozs7Ozs7Ozs7OztBQ3RFRDs7Ozs7OztHQU9HO0FBRUgsTUFBTSxVQUFVLEdBQUcsdURBQXVELENBQUM7QUFDM0UsTUFBTSxVQUFVLEdBQUcsVUFBVSxHQUFHLFlBQVksQ0FBQztBQUU3QyxTQUFTLFNBQVMsQ0FBQyxLQUFhO0lBQzlCLE9BQU8sS0FBSyxDQUFDLE1BQU0sQ0FBQyxJQUFJLENBQUMsS0FBSyxDQUFDLElBQUksQ0FBQyxNQUFNLEVBQUUsR0FBRyxLQUFLLENBQUMsTUFBTSxDQUFDLENBQUMsQ0FBQztBQUNoRSxDQUFDO0FBRU0sU0FBUyxjQUFjLENBQUMsTUFBYztJQUMzQyxJQUFJLENBQUMsTUFBTTtRQUNULE9BQU8sRUFBRSxDQUFDO0lBRVosSUFBSSxNQUFNLEdBQUcsU0FBUyxDQUFDLFVBQVUsQ0FBQyxDQUFDO0lBQ25DLEtBQUssSUFBSSxDQUFDLEdBQUcsQ0FBQyxFQUFFLENBQUMsR0FBRyxNQUFNLEVBQUUsQ0FBQyxFQUFFO1FBQzdCLE1BQU0sSUFBSSxTQUFTLENBQUMsVUFBVSxDQUFDLENBQUM7SUFFbEMsT0FBTyxNQUFNLENBQUM7QUFDaEIsQ0FBQzs7Ozs7Ozs7Ozs7Ozs7Ozs7QUN6QkQ7Ozs7Ozs7R0FPRztBQUVzQjtBQUVsQixNQUFNLGVBQWU7SUFDbEIsU0FBUyxDQUFTO0lBQ2xCLFNBQVMsQ0FBTTtJQUNmLFFBQVEsQ0FBTTtJQUV0QixZQUFZLFFBQWdCO1FBQzFCLElBQUksQ0FBQyxTQUFTLEdBQUcsUUFBUSxDQUFDO0lBQzVCLENBQUM7SUFFTSxLQUFLLENBQUMsSUFBSSxDQUFDLElBQVk7UUFDNUIsSUFBSSxDQUFDLElBQUksQ0FBQyxTQUFTO1lBQ2pCLE1BQU0sSUFBSSxDQUFDLElBQUksRUFBRSxDQUFDO1FBQ3BCLElBQUksTUFBTSxHQUFHLElBQUksQ0FBQyxRQUFRLENBQUMsTUFBTSxDQUFDLElBQUksQ0FBQyxDQUFDO1FBQ3hDLElBQUksQ0FBQyxNQUFNO1lBQ1QsTUFBTSxHQUFHLElBQUksQ0FBQyxRQUFRLENBQUMsTUFBTSxDQUFDLElBQUksQ0FBQyxHQUFHLEVBQUUsQ0FBQztRQUMzQyxJQUFJLENBQUMsUUFBUSxHQUFHLEVBQUUsTUFBTSxFQUFFLElBQUksQ0FBQyxRQUFRLEVBQUUsTUFBTSxFQUFFLENBQUM7SUFDcEQsQ0FBQztJQUVNLEtBQUssQ0FBQyxHQUFHO1FBQ2QsSUFBSSxDQUFDLElBQUksQ0FBQyxTQUFTO1lBQ2pCLE1BQU0sSUFBSSxDQUFDLElBQUksRUFBRSxDQUFDO1FBQ3BCLE9BQU8sQ0FBQyxNQUFNLENBQUMsSUFBSSxDQUFDLFFBQVEsQ0FBQyxNQUFNLENBQUMsQ0FBQztRQUNyQyxJQUFJLENBQUMsUUFBUSxHQUFHLElBQUksQ0FBQyxRQUFRLENBQUMsTUFBTSxDQUFDO0lBQ3ZDLENBQUM7SUFFTSxLQUFLLENBQUMsR0FBRyxDQUFDLElBQVk7UUFDM0IsSUFBSSxDQUFDLElBQUksQ0FBQyxTQUFTO1lBQ2pCLE1BQU0sSUFBSSxDQUFDLElBQUksRUFBRSxDQUFDO1FBQ3BCLE9BQU8sSUFBSSxDQUFDLFFBQVEsQ0FBQyxNQUFNLENBQUMsSUFBSSxDQUFDLENBQUM7SUFDcEMsQ0FBQztJQUVNLEtBQUssQ0FBQyxHQUFHLENBQUMsSUFBWSxFQUFFLEtBQVU7UUFDdkMsSUFBSSxDQUFDLElBQUksQ0FBQyxTQUFTO1lBQ2pCLE1BQU0sSUFBSSxDQUFDLElBQUksRUFBRSxDQUFDO1FBQ3BCLElBQUksQ0FBQyxRQUFRLENBQUMsTUFBTSxDQUFDLElBQUksQ0FBQyxHQUFHLEtBQUssQ0FBQztRQUNuQyxNQUFNLElBQUksQ0FBQyxJQUFJLEVBQUUsQ0FBQztJQUNwQixDQUFDO0lBRU0sS0FBSyxDQUFDLElBQUk7UUFDZixJQUFJLENBQUM7WUFDSCxNQUFNLE9BQU8sR0FBRyxNQUFNLHVEQUFXLENBQUMsUUFBUSxDQUFDLElBQUksQ0FBQyxTQUFTLEVBQUUsT0FBTyxDQUFDLENBQUM7WUFDcEUsSUFBSSxDQUFDLFNBQVMsR0FBRyxJQUFJLENBQUMsS0FBSyxDQUFDLE9BQU8sQ0FBQyxDQUFDO1FBQ3ZDLENBQUM7UUFDRCxPQUFPLENBQUMsRUFBRSxDQUFDO1lBQ1QsSUFBSSxDQUFDLFNBQVMsR0FBRyxFQUFFLENBQUM7UUFDdEIsQ0FBQztRQUNELElBQUksQ0FBQyxRQUFRO1lBQ2I7Z0JBQ0UsTUFBTSxFQUFFLElBQUk7Z0JBQ1osTUFBTSxFQUFFLElBQUksQ0FBQyxTQUFTO2FBQ3ZCLENBQUM7SUFDSixDQUFDO0lBRU0sS0FBSyxDQUFDLElBQUk7UUFDZixNQUFNLEtBQUssR0FBRyxDQUFDLENBQUM7UUFDaEIsTUFBTSxPQUFPLEdBQUcsSUFBSSxDQUFDLFNBQVMsQ0FBQyxJQUFJLENBQUMsU0FBUyxFQUFFLFNBQVMsRUFBRSxLQUFLLENBQUMsQ0FBQztRQUNqRSxNQUFNLHVEQUFXLENBQUMsU0FBUyxDQUFDLElBQUksQ0FBQyxTQUFTLEVBQUUsT0FBTyxFQUFFLEVBQUUsUUFBUSxFQUFFLE9BQU8sRUFBRSxJQUFJLEVBQUUsR0FBRyxFQUFFLEtBQUssRUFBRSxJQUFJLEVBQUUsQ0FBQyxDQUFDO0lBQ3RHLENBQUM7Q0FDRjtBQUFBLENBQUM7Ozs7Ozs7Ozs7Ozs7Ozs7OztBQ3JFRjs7Ozs7OztHQU9HO0FBRUksU0FBUyxhQUFhLENBQUMsS0FBVTtJQUN0QyxJQUFJLE9BQU8sS0FBSyxLQUFLLFNBQVM7UUFDNUIsT0FBTyxLQUFLLENBQUM7SUFDZixNQUFNLElBQUksU0FBUyxDQUFDLFFBQVEsS0FBSyxvQkFBb0IsQ0FBQyxDQUFDO0FBQ3pELENBQUM7QUFFTSxTQUFTLFlBQVksQ0FBQyxLQUFVO0lBQ3JDLElBQUksT0FBTyxLQUFLLEtBQUssUUFBUTtRQUMzQixPQUFPLEtBQUssQ0FBQztJQUNmLE1BQU0sSUFBSSxTQUFTLENBQUMsUUFBUSxLQUFLLG1CQUFtQixDQUFDLENBQUM7QUFDeEQsQ0FBQztBQUVNLFNBQVMsWUFBWSxDQUFDLEtBQVU7SUFDckMsSUFBSSxPQUFPLEtBQUssS0FBSyxRQUFRO1FBQzNCLE9BQU8sS0FBSyxDQUFDO0lBQ2YsTUFBTSxJQUFJLFNBQVMsQ0FBQyxRQUFRLEtBQUssbUJBQW1CLENBQUMsQ0FBQztBQUN4RCxDQUFDO0FBRU0sU0FBUyxXQUFXLENBQUMsS0FBVTtJQUNwQyxJQUFJLEtBQUssQ0FBQyxPQUFPLENBQUMsS0FBSyxDQUFDO1FBQ3RCLE9BQU8sS0FBSyxDQUFDLElBQUksQ0FBQyxLQUFLLENBQUMsQ0FBQztJQUMzQixNQUFNLElBQUksU0FBUyxDQUFDLFFBQVEsS0FBSyxrQkFBa0IsQ0FBQyxDQUFDO0FBQ3ZELENBQUM7Ozs7Ozs7Ozs7Ozs7Ozs7OztBQy9CRDs7Ozs7OztHQU9HO0FBRUksTUFBTSxXQUFXLEdBQUcsU0FBUyxDQUFDO0FBQzlCLE1BQU0sYUFBYSxHQUFHLFdBQVcsQ0FBQztBQUNsQyxNQUFNLFdBQVcsR0FBRyxTQUFTLENBQUM7QUFDOUIsTUFBTSxZQUFZLEdBQUcsVUFBVSxDQUFDOzs7Ozs7Ozs7OztBQ1p2Qzs7Ozs7Ozs7OztBQ0FBOzs7Ozs7Ozs7O0FDQUE7Ozs7Ozs7Ozs7QUNBQTs7Ozs7Ozs7OztBQ0FBOzs7Ozs7Ozs7O0FDQUE7Ozs7Ozs7Ozs7QUNBQTs7Ozs7Ozs7OztBQ0FBOzs7Ozs7VUNBQTtVQUNBOztVQUVBO1VBQ0E7VUFDQTtVQUNBO1VBQ0E7VUFDQTtVQUNBO1VBQ0E7VUFDQTtVQUNBO1VBQ0E7VUFDQTtVQUNBOztVQUVBO1VBQ0E7O1VBRUE7VUFDQTtVQUNBOzs7OztXQ3RCQTtXQUNBO1dBQ0E7V0FDQTtXQUNBO1dBQ0EsaUNBQWlDLFdBQVc7V0FDNUM7V0FDQTs7Ozs7V0NQQTtXQUNBO1dBQ0E7V0FDQTtXQUNBLHlDQUF5Qyx3Q0FBd0M7V0FDakY7V0FDQTtXQUNBOzs7OztXQ1BBOzs7OztXQ0FBO1dBQ0E7V0FDQTtXQUNBLHVEQUF1RCxpQkFBaUI7V0FDeEU7V0FDQSxnREFBZ0QsYUFBYTtXQUM3RDs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7QUNOQTs7Ozs7OztHQU9HO0FBRUgsb0NBQW9DO0FBRVA7QUFDMkQ7QUFFdEM7QUFDYTtBQUMzQjtBQUNRO0FBRTVDLGlFQUFlO0lBQ2IsR0FBRztJQUNILEtBQUssRUFBRTtRQUNMLFVBQVUsRUFBRSxDQUFDLFVBQWtCLEVBQUUsU0FBaUIsRUFBRSxPQUEyQixFQUFFLEVBQUUsQ0FBQyxnREFBWSxDQUFDLFdBQVcsRUFBRSxDQUFDLFVBQVUsQ0FBQyxVQUFVLEVBQUUsU0FBUyxFQUFFLE9BQU8sQ0FBQztRQUN6SixTQUFTLEVBQUUsQ0FBQyxJQUFTLEVBQUUsRUFBRSxDQUFDLGdEQUFZLENBQUMsV0FBVyxFQUFFLENBQUMsU0FBUyxDQUFDLElBQUksQ0FBQztRQUNwRSxLQUFLLEVBQUUsQ0FBQyxJQUFTLEVBQUUsRUFBRSxDQUFDLGdEQUFZLENBQUMsV0FBVyxFQUFFLENBQUMsS0FBSyxDQUFDLElBQUksQ0FBQztRQUM1RCxPQUFPLEVBQUUsQ0FBQyxJQUFTLEVBQUUsRUFBRSxDQUFDLGdEQUFZLENBQUMsV0FBVyxFQUFFLENBQUMsT0FBTyxDQUFDLElBQUksQ0FBQztRQUNoRSxPQUFPLEVBQUUsQ0FBQyxJQUFTLEVBQUUsRUFBRSxDQUFDLGdEQUFZLENBQUMsV0FBVyxFQUFFLENBQUMsT0FBTyxDQUFDLElBQUksQ0FBQztRQUNoRSxLQUFLLEVBQUUsQ0FBQyxJQUFTLEVBQUUsRUFBRSxDQUFDLGdEQUFZLENBQUMsV0FBVyxFQUFFLENBQUMsS0FBSyxDQUFDLElBQUksQ0FBQztRQUM1RCxjQUFjO0tBQ2Y7SUFDRCxPQUFPLEVBQUU7UUFDUCxLQUFLLEVBQUUsMkRBQVU7S0FDbEI7SUFDRCxLQUFLLEVBQUU7UUFDTCxVQUFVO1FBQ1YsWUFBWTtLQUNiO0lBQ0QsSUFBSSxFQUFFLDZDQUFJO0NBQ1gsRUFBQztBQUVGLHlEQUFTLEVBQUUsQ0FBQyIsInNvdXJjZXMiOlsid2VicGFjazovL2JpdG1ha2Uvd2VicGFjay91bml2ZXJzYWxNb2R1bGVEZWZpbml0aW9uIiwid2VicGFjazovL2JpdG1ha2UvLi9zcmMvQ29uc3RhbnRzLnRzIiwid2VicGFjazovL2JpdG1ha2UvLi9zcmMvYWN0aW9ucy9iaXRtYWtlLnRzIiwid2VicGFjazovL2JpdG1ha2UvLi9zcmMvYWN0aW9ucy9jbWFrZS50cyIsIndlYnBhY2s6Ly9iaXRtYWtlLy4vc3JjL2FjdGlvbnMvY29uZmlndXJlLnRzIiwid2VicGFjazovL2JpdG1ha2UvLi9zcmMvYWN0aW9ucy9pbmRleC50cyIsIndlYnBhY2s6Ly9iaXRtYWtlLy4vc3JjL2FjdGlvbnMvbWFrZS50cyIsIndlYnBhY2s6Ly9iaXRtYWtlLy4vc3JjL2FjdGlvbnMvbm9uZS50cyIsIndlYnBhY2s6Ly9iaXRtYWtlLy4vc3JjL2FjdGlvbnMvcHJvY2Vzcy50cyIsIndlYnBhY2s6Ly9iaXRtYWtlLy4vc3JjL2FwcC9SdW5TY3JpcHQudHMiLCJ3ZWJwYWNrOi8vYml0bWFrZS8uL3NyYy9hcHAvUnVuU2NyaXB0SW5pdC50cyIsIndlYnBhY2s6Ly9iaXRtYWtlLy4vc3JjL2NtYWtlL0NvbnN0YW50cy50cyIsIndlYnBhY2s6Ly9iaXRtYWtlLy4vc3JjL2NtYWtlL0hlbHBlci50cyIsIndlYnBhY2s6Ly9iaXRtYWtlLy4vc3JjL2NtYWtlL2luZGV4LnRzIiwid2VicGFjazovL2JpdG1ha2UvLi9zcmMvY29tbWFuZHMvYnVpbGQudHMiLCJ3ZWJwYWNrOi8vYml0bWFrZS8uL3NyYy9jb21tYW5kcy9pbmRleC50cyIsIndlYnBhY2s6Ly9iaXRtYWtlLy4vc3JjL2NvbW1hbmRzL2luaXQudHMiLCJ3ZWJwYWNrOi8vYml0bWFrZS8uL3NyYy9jb3JlL0Fic29sdXRlUGF0aC50cyIsIndlYnBhY2s6Ly9iaXRtYWtlLy4vc3JjL2NvcmUvQmFzZUNvbnRleHQudHMiLCJ3ZWJwYWNrOi8vYml0bWFrZS8uL3NyYy9jb3JlL0J1aWxkaW5TY3JpcHRzL2NfaGVhZGVyLnRzIiwid2VicGFjazovL2JpdG1ha2UvLi9zcmMvY29yZS9CdWlsZGluU2NyaXB0cy9jb25maWd1cmVfZmlsZS50cyIsIndlYnBhY2s6Ly9iaXRtYWtlLy4vc3JjL2NvcmUvQnVpbGRpblNjcmlwdHMvaW5kZXgudHMiLCJ3ZWJwYWNrOi8vYml0bWFrZS8uL3NyYy9jb3JlL0N1c3RvbVNjcmlwdC50cyIsIndlYnBhY2s6Ly9iaXRtYWtlLy4vc3JjL2NvcmUvRGV0ZXJtaW5lQ29tcGlsZXIudHMiLCJ3ZWJwYWNrOi8vYml0bWFrZS8uL3NyYy9jb3JlL0V4ZWNTY3JpcHRUYXNrLnRzIiwid2VicGFjazovL2JpdG1ha2UvLi9zcmMvY29yZS9GaWxlSW5zdGFsbGF0aW9uVGFzay50cyIsIndlYnBhY2s6Ly9iaXRtYWtlLy4vc3JjL2NvcmUvRmluZFByb2dyYW0udHMiLCJ3ZWJwYWNrOi8vYml0bWFrZS8uL3NyYy9jb3JlL0dvYWxDb2xsZWN0aW9uLnRzIiwid2VicGFjazovL2JpdG1ha2UvLi9zcmMvY29yZS9JbnN0YWxsRW50aXR5LnRzIiwid2VicGFjazovL2JpdG1ha2UvLi9zcmMvY29yZS9Mb2NhbE1ha2VDb250ZXh0LnRzIiwid2VicGFjazovL2JpdG1ha2UvLi9zcmMvY29yZS9NYWtlSW50ZXJmYWNlcy50cyIsIndlYnBhY2s6Ly9iaXRtYWtlLy4vc3JjL2NvcmUvUGx1Z2luQ29udGV4dC50cyIsIndlYnBhY2s6Ly9iaXRtYWtlLy4vc3JjL2NvcmUvUHJvamVjdENvbnRleHQudHMiLCJ3ZWJwYWNrOi8vYml0bWFrZS8uL3NyYy9jb3JlL1Njb3BlLnRzIiwid2VicGFjazovL2JpdG1ha2UvLi9zcmMvY29yZS9TY3JpcHRDb250ZXh0LnRzIiwid2VicGFjazovL2JpdG1ha2UvLi9zcmMvY29yZS9TaW1wbGVPYmplY3QudHMiLCJ3ZWJwYWNrOi8vYml0bWFrZS8uL3NyYy9jb3JlL1NvdXJjZUZpbGUudHMiLCJ3ZWJwYWNrOi8vYml0bWFrZS8uL3NyYy9jb3JlL1NwYXduU3luY1Rhc2sudHMiLCJ3ZWJwYWNrOi8vYml0bWFrZS8uL3NyYy9jb3JlL1N5c3RlbVZhcmlhYmxlcy50cyIsIndlYnBhY2s6Ly9iaXRtYWtlLy4vc3JjL2NvcmUvVGFyZ2V0LnRzIiwid2VicGFjazovL2JpdG1ha2UvLi9zcmMvY29yZS9UYXJnZXRDb2xsZWN0aW9uLnRzIiwid2VicGFjazovL2JpdG1ha2UvLi9zcmMvY29yZS9UYXJnZXRGaWxlLnRzIiwid2VicGFjazovL2JpdG1ha2UvLi9zcmMvY29yZS9UYXJnZXRIZWxwZXIudHMiLCJ3ZWJwYWNrOi8vYml0bWFrZS8uL3NyYy9jb3JlL1RhcmdldEluY2x1ZGVzLnRzIiwid2VicGFjazovL2JpdG1ha2UvLi9zcmMvY29yZS9UYXJnZXROYW1lLnRzIiwid2VicGFjazovL2JpdG1ha2UvLi9zcmMvY29yZS9UYXJnZXRPYmplY3RzLnRzIiwid2VicGFjazovL2JpdG1ha2UvLi9zcmMvY29yZS9Ub29sY2hhaW5Db250ZXh0LnRzIiwid2VicGFjazovL2JpdG1ha2UvLi9zcmMvY29yZS9UeXBlcy50cyIsIndlYnBhY2s6Ly9iaXRtYWtlLy4vc3JjL2NvcmUvVXNlck1ha2VDb250ZXh0LnRzIiwid2VicGFjazovL2JpdG1ha2UvLi9zcmMvY29yZS9Vc2VyU291cmNlRmlsZXMudHMiLCJ3ZWJwYWNrOi8vYml0bWFrZS8uL3NyYy9jb3JlL1VzZXJUYXJnZXRTdHJ1Y3QudHMiLCJ3ZWJwYWNrOi8vYml0bWFrZS8uL3NyYy9jeHgvaW5kZXgudHMiLCJ3ZWJwYWNrOi8vYml0bWFrZS8uL3NyYy9sb2dnZXIvaW5kZXgudHMiLCJ3ZWJwYWNrOi8vYml0bWFrZS8uL3NyYy9zZXJ2ZXIvSnNvblJwY1JlcXVlc3RTeW5jLnRzIiwid2VicGFjazovL2JpdG1ha2UvLi9zcmMvc2VydmVyL0pzb25ScGNTZXJ2ZXIudHMiLCJ3ZWJwYWNrOi8vYml0bWFrZS8uL3NyYy9zZXJ2ZXIvTWFrZUNsaWVudC50cyIsIndlYnBhY2s6Ly9iaXRtYWtlLy4vc3JjL3NlcnZlci9NYWtlU2VydmVyLnRzIiwid2VicGFjazovL2JpdG1ha2UvLi9zcmMvc2VydmVyL01lbW9yeVRyYW5zcG9ydC50cyIsIndlYnBhY2s6Ly9iaXRtYWtlLy4vc3JjL3NlcnZlci9NZXNzYWdlUG9ydFNlbmRlci50cyIsIndlYnBhY2s6Ly9iaXRtYWtlLy4vc3JjL3NlcnZlci9SZW1vdGVNYWtlQ29udGV4dC50cyIsIndlYnBhY2s6Ly9iaXRtYWtlLy4vc3JjL3NlcnZlci9SZW1vdGVNZXRob2RzLnRzIiwid2VicGFjazovL2JpdG1ha2UvLi9zcmMvc2VydmVyL1RyYW5zcG9ydC50cyIsIndlYnBhY2s6Ly9iaXRtYWtlLy4vc3JjL3NlcnZlci9Xb3JrZXJOb2RlLnRzIiwid2VicGFjazovL2JpdG1ha2UvLi9zcmMvc2VydmVyL1dvcmtlclNlbmRlci50cyIsIndlYnBhY2s6Ly9iaXRtYWtlLy4vc3JjL3NlcnZlci9Xb3JrZXJTZXJ2aWNlLnRzIiwid2VicGFjazovL2JpdG1ha2UvLi9zcmMvdXRpbHMvQXJncy50cyIsIndlYnBhY2s6Ly9iaXRtYWtlLy4vc3JjL3V0aWxzL0NoaWxkUHJvY2Vzcy50cyIsIndlYnBhY2s6Ly9iaXRtYWtlLy4vc3JjL3V0aWxzL0ZpbGVTeXN0ZW0udHMiLCJ3ZWJwYWNrOi8vYml0bWFrZS8uL3NyYy91dGlscy9Ib3N0LnRzIiwid2VicGFjazovL2JpdG1ha2UvLi9zcmMvdXRpbHMvSHR0cFJlcXVlc3QudHMiLCJ3ZWJwYWNrOi8vYml0bWFrZS8uL3NyYy91dGlscy9JbXBvcnRNb2R1bGUubWpzIiwid2VicGFjazovL2JpdG1ha2UvLi9zcmMvdXRpbHMvTWFrZVBhdGNoLnRzIiwid2VicGFjazovL2JpdG1ha2UvLi9zcmMvdXRpbHMvTW9kdWxlLnRzIiwid2VicGFjazovL2JpdG1ha2UvLi9zcmMvdXRpbHMvUGF0aC50cyIsIndlYnBhY2s6Ly9iaXRtYWtlLy4vc3JjL3V0aWxzL1ByaW1pdGl2ZXMudHMiLCJ3ZWJwYWNrOi8vYml0bWFrZS8uL3NyYy91dGlscy9SYW5kb20udHMiLCJ3ZWJwYWNrOi8vYml0bWFrZS8uL3NyYy91dGlscy9TZXR0aW5nc1N0b3JhZ2UudHMiLCJ3ZWJwYWNrOi8vYml0bWFrZS8uL3NyYy91dGlscy9TdHJpY3RUeXBlLnRzIiwid2VicGFjazovL2JpdG1ha2UvLi9zcmMvdXRpbHMvVXJsU2NoZW1lLnRzIiwid2VicGFjazovL2JpdG1ha2UvZXh0ZXJuYWwgbm9kZS1jb21tb25qcyBcImh0dHBcIiIsIndlYnBhY2s6Ly9iaXRtYWtlL2V4dGVybmFsIG5vZGUtY29tbW9uanMgXCJodHRwc1wiIiwid2VicGFjazovL2JpdG1ha2UvZXh0ZXJuYWwgbm9kZS1jb21tb25qcyBcIm5vZGU6Y2hpbGRfcHJvY2Vzc1wiIiwid2VicGFjazovL2JpdG1ha2UvZXh0ZXJuYWwgbm9kZS1jb21tb25qcyBcIm5vZGU6ZnNcIiIsIndlYnBhY2s6Ly9iaXRtYWtlL2V4dGVybmFsIG5vZGUtY29tbW9uanMgXCJub2RlOm9zXCIiLCJ3ZWJwYWNrOi8vYml0bWFrZS9leHRlcm5hbCBub2RlLWNvbW1vbmpzIFwibm9kZTpwYXRoXCIiLCJ3ZWJwYWNrOi8vYml0bWFrZS9leHRlcm5hbCBub2RlLWNvbW1vbmpzIFwibm9kZTp1cmxcIiIsIndlYnBhY2s6Ly9iaXRtYWtlL2V4dGVybmFsIG5vZGUtY29tbW9uanMgXCJub2RlOndvcmtlcl90aHJlYWRzXCIiLCJ3ZWJwYWNrOi8vYml0bWFrZS93ZWJwYWNrL2Jvb3RzdHJhcCIsIndlYnBhY2s6Ly9iaXRtYWtlL3dlYnBhY2svcnVudGltZS9jb21wYXQgZ2V0IGRlZmF1bHQgZXhwb3J0Iiwid2VicGFjazovL2JpdG1ha2Uvd2VicGFjay9ydW50aW1lL2RlZmluZSBwcm9wZXJ0eSBnZXR0ZXJzIiwid2VicGFjazovL2JpdG1ha2Uvd2VicGFjay9ydW50aW1lL2hhc093blByb3BlcnR5IHNob3J0aGFuZCIsIndlYnBhY2s6Ly9iaXRtYWtlL3dlYnBhY2svcnVudGltZS9tYWtlIG5hbWVzcGFjZSBvYmplY3QiLCJ3ZWJwYWNrOi8vYml0bWFrZS8uL3NyYy9pbmRleC50cyJdLCJzb3VyY2VzQ29udGVudCI6WyIoZnVuY3Rpb24gd2VicGFja1VuaXZlcnNhbE1vZHVsZURlZmluaXRpb24ocm9vdCwgZmFjdG9yeSkge1xuXHRpZih0eXBlb2YgZXhwb3J0cyA9PT0gJ29iamVjdCcgJiYgdHlwZW9mIG1vZHVsZSA9PT0gJ29iamVjdCcpXG5cdFx0bW9kdWxlLmV4cG9ydHMgPSBmYWN0b3J5KCk7XG5cdGVsc2UgaWYodHlwZW9mIGRlZmluZSA9PT0gJ2Z1bmN0aW9uJyAmJiBkZWZpbmUuYW1kKVxuXHRcdGRlZmluZShbXSwgZmFjdG9yeSk7XG5cdGVsc2UgaWYodHlwZW9mIGV4cG9ydHMgPT09ICdvYmplY3QnKVxuXHRcdGV4cG9ydHNbXCJiaXRtYWtlXCJdID0gZmFjdG9yeSgpO1xuXHRlbHNlXG5cdFx0cm9vdFtcImJpdG1ha2VcIl0gPSBmYWN0b3J5KCk7XG59KShnbG9iYWwsICgpID0+IHtcbnJldHVybiAiLCIvKlxuICogTUlUIExpY2Vuc2VcbiAqXG4gKiBDb3B5cmlnaHQgKGMpIDIwMjUgIFl1cmlpIFlha3ViaW4gKHl1cmlpLnlha3ViaW5AZ21haWwuY29tKVxuICpcbiAqIFBlcm1pc3Npb24gaXMgZ3JhbnRlZCB0byB1c2UsIGNvcHksIG1vZGlmeSwgYW5kIGRpc3RyaWJ1dGUgdGhpcyBzb2Z0d2FyZVxuICogdW5kZXIgdGhlIE1JVCBMaWNlbnNlLiBTZWUgTElDRU5TRSBmaWxlIGZvciBkZXRhaWxzLlxuICovXG5cbmV4cG9ydCBjb25zdCBVU0VSX0NPTkZJRyA9IFwiYml0bWFrZS5jb25maWcubWpzXCI7XG5leHBvcnQgY29uc3QgUkVRVUVTVF9BVFRFTVBUUyA9IDMwO1xuZXhwb3J0IGNvbnN0IEJVSUxEX1NFVFRJTkdTX0ZJTEUgPSBcIkJ1aWxkU2V0dGluZ3MuanNvblwiO1xuZXhwb3J0IGNvbnN0IEFMTF9UQVJHRVQgPSBcImFsbFwiO1xuZXhwb3J0IGNvbnN0IElOU1RBTExfVEFSR0VUID0gXCJpbnN0YWxsXCI7XG5leHBvcnQgY29uc3QgUEFDS0FHRV9KU09OID0gXCJwYWNrYWdlLmpzb25cIjtcbmV4cG9ydCBjb25zdCBNQUtFX0NBQ0hFID0gXCJNYWtlQ2FjaGUuanNvblwiO1xuZXhwb3J0IGNvbnN0IFNZU1RFTV9WQVJJQUJMRV9HUk9VUCA9IFwic3lzdGVtXCI7XG5leHBvcnQgY29uc3QgQ1VTVE9NX1ZBUklBQkxFX0dST1VQID0gXCJjdXN0b21cIjtcbiIsIi8qXG4gKiBNSVQgTGljZW5zZVxuICpcbiAqIENvcHlyaWdodCAoYykgMjAyNSAgWXVyaWkgWWFrdWJpbiAoeXVyaWkueWFrdWJpbkBnbWFpbC5jb20pXG4gKlxuICogUGVybWlzc2lvbiBpcyBncmFudGVkIHRvIHVzZSwgY29weSwgbW9kaWZ5LCBhbmQgZGlzdHJpYnV0ZSB0aGlzIHNvZnR3YXJlXG4gKiB1bmRlciB0aGUgTUlUIExpY2Vuc2UuIFNlZSBMSUNFTlNFIGZpbGUgZm9yIGRldGFpbHMuXG4gKi9cblxuaW1wb3J0IGZzIGZyb20gXCJub2RlOmZzXCI7XG5cbmltcG9ydCB7IFBhdGggfSBmcm9tIFwiQC91dGlscy9QYXRoXCI7XG5pbXBvcnQgeyBNYWtlU2VydmVyIH0gZnJvbSBcIkAvc2VydmVyL01ha2VTZXJ2ZXJcIjtcbmltcG9ydCB7IFBsdWdpbkNvbnRleHQgfSBmcm9tIFwiQC9jb3JlL1BsdWdpbkNvbnRleHRcIjtcbmltcG9ydCB7IFNjb3BlSGVscGVyIH0gZnJvbSBcIkAvY29yZS9TY29wZVwiO1xuaW1wb3J0IHsgVG9vbGNoYWluQ29udGV4dCB9IGZyb20gXCJAL2NvcmUvVG9vbGNoYWluQ29udGV4dFwiO1xuaW1wb3J0IHsgZ2V0UGF0aFN0cmluZywgZ2V0VVJMU3RyaW5nLCBzYXZlQXNKU09OIH0gIGZyb20gXCJAL3V0aWxzL0ZpbGVTeXN0ZW1cIjtcbmltcG9ydCB7IEFic29sdXRlUGF0aCB9IGZyb20gXCJAL2NvcmUvQWJzb2x1dGVQYXRoXCI7XG5pbXBvcnQgeyBpbXBvcnRNb2R1bGUgfSAgZnJvbSBcIkAvdXRpbHMvTW9kdWxlXCI7XG5pbXBvcnQgeyBkZXRlcm1pbmVDb21waWxlciB9ICBmcm9tIFwiQC9jb3JlL0RldGVybWluZUNvbXBpbGVyXCI7XG5pbXBvcnQgeyBTZXR0aW5nc1N0b3JhZ2UgfSBmcm9tIFwiQC91dGlscy9TZXR0aW5nc1N0b3JhZ2VcIjtcbmltcG9ydCB7IElNUE9SVF9TQ0hFTUUgfSBmcm9tIFwiQC91dGlscy9VcmxTY2hlbWVcIjtcbmltcG9ydCB7IElOU1RBTExfVEFSR0VULCBQQUNLQUdFX0pTT04sIE1BS0VfQ0FDSEUgfSBmcm9tIFwiQC9Db25zdGFudHNcIjtcbmltcG9ydCB7IFNZU1RFTV9WQVJJQUJMRV9HUk9VUCB9IGZyb20gXCJAL0NvbnN0YW50c1wiO1xuaW1wb3J0IHsgcmVxdWlyZVJlc29sdmUgfSBmcm9tIFwiQC91dGlscy9Nb2R1bGVcIjtcbmltcG9ydCB7IFN5c3RlbVNjb3BlIH0gZnJvbSBcIkAvY29yZS9TeXN0ZW1TY29wZVwiO1xuaW1wb3J0IFN5c3RlbVZhcmlhYmxlcyBmcm9tIFwiQC9jb3JlL1N5c3RlbVZhcmlhYmxlc1wiO1xuaW1wb3J0IHsgTG9nZ2VyIH0gZnJvbSBcIkAvbG9nZ2VyXCI7XG5cbmNvbnN0IGxvZ2dlciA9IExvZ2dlci5jcmVhdGUoaW1wb3J0Lm1ldGEudXJsKTtcblxuZXhwb3J0IGRlZmF1bHQgYXN5bmMgZnVuY3Rpb24oY29uZmlnOiBhbnksIGVudmlyb25tZW50OiBhbnksIHNldHRpbmdzOiBTZXR0aW5nc1N0b3JhZ2UpIHtcbiAgcHJvY2Vzcy5lbnYgPSBlbnZpcm9ubWVudDtcblxuICBjb25zdCBzZXJ2ZXIgPSBuZXcgTWFrZVNlcnZlcjtcblxuICBjb25zdCB2YXJpYWJsZU1hcCA9IHNlcnZlci5yb290VmFyaWFibGVNYXA7XG4gIFNjb3BlSGVscGVyLmV4dGVuZFZhcmlhYmxlTWFwQnlWYWx1ZXModmFyaWFibGVNYXAsIFwiXCIsIGNvbmZpZy52YXJpYWJsZXMpO1xuICBTY29wZUhlbHBlci5kZWZpbmVWYXJpYWJsZXNJblZhcmlhYmxlTWFwKHZhcmlhYmxlTWFwLCBTWVNURU1fVkFSSUFCTEVfR1JPVVAsIFN5c3RlbVZhcmlhYmxlcyk7XG4gIGNvbnN0IHNjb3BlID0gU2NvcGVIZWxwZXIuY3JlYXRlUHJveHkodmFyaWFibGVNYXApIGFzIFN5c3RlbVNjb3BlO1xuXG4gIGNvbnN0IHNvdXJjZURpciA9IGdldFBhdGhTdHJpbmcoY29uZmlnLnNvdXJjZURpcik7XG4gIGNvbnN0IGJpbmFyeURpciA9IGdldFBhdGhTdHJpbmcoY29uZmlnLmJpbmFyeURpcik7XG5cbiAgc2NvcGUuUFJPSkVDVF9TT1VSQ0VfRElSID0gQWJzb2x1dGVQYXRoLmNyZWF0ZShzb3VyY2VEaXIpO1xuICBzY29wZS5QUk9KRUNUX0JJTkFSWV9ESVIgPSBBYnNvbHV0ZVBhdGguY3JlYXRlKGJpbmFyeURpcik7XG5cbiAgc2NvcGUuUEFDS0FHRV9GSUxFID0gc2NvcGUuUFJPSkVDVF9TT1VSQ0VfRElSLmpvaW4oUEFDS0FHRV9KU09OKTtcbiAgc2NvcGUuQ0FDSEVfRklMRSA9IHNjb3BlLlBST0pFQ1RfQklOQVJZX0RJUi5qb2luKE1BS0VfQ0FDSEUpO1xuICBzY29wZS5TT1VSQ0VfRElSID0gc2NvcGUuUFJPSkVDVF9TT1VSQ0VfRElSO1xuICBzY29wZS5CSU5BUllfRElSID0gc2NvcGUuUFJPSkVDVF9CSU5BUllfRElSO1xuXG4gIGNvbnN0IHBhY2thZ2VKc29uID0gYXdhaXQgZnMucHJvbWlzZXMucmVhZEZpbGUoc2NvcGUuUEFDS0FHRV9GSUxFLnRvU3RyaW5nKCksIFwidXRmOFwiKTtcbiAgY29uc3QgcGtnID0gSlNPTi5wYXJzZShwYWNrYWdlSnNvbik7XG5cbiAgc2NvcGUuQlVJTERfVFlQRSA9IGNvbmZpZy5idWlsZFR5cGU7XG4gIHNjb3BlLlBST0pFQ1RfTkFNRSA9IHBrZy5uYW1lO1xuICBzY29wZS5QUk9KRUNUX1ZFUlNJT04gPSBwa2cudmVyc2lvbjtcbiAgc2NvcGUuUFJPSkVDVF9ERVNDUklQVElPTiA9IHBrZy5kZXNjcmlwdGlvbiB8fCBcIlwiO1xuICBzY29wZS5QUk9KRUNUX0hPTUVQQUdFX1VSTCA9IHBrZy5ob21lcGFnZSB8fCBcIlwiO1xuXG4gIGlmIChjb25maWcuZGVzdERpcilcbiAgICBzY29wZS5ERVNURElSID0gY29uZmlnLmRlc3REaXI7XG5cbiAgZm9yIChjb25zdCBwbHVnaW4gb2YgKHNjb3BlLk1BS0VfUExVR0lOX0xJU1QgfHwgW10pKSB7XG4gICAgY29uc3QgY3dkU2F2ZSA9IHByb2Nlc3MuY3dkKCk7XG5cbiAgICBzY29wZS5TQ1JJUFRfRklMRSA9IEFic29sdXRlUGF0aC5jcmVhdGUocGx1Z2luKTtcbiAgICBzY29wZS5TQ1JJUFRfRElSID0gc2NvcGUuU0NSSVBUX0ZJTEUuZGlybmFtZSgpO1xuICAgIHNjb3BlLlNPVVJDRV9ESVIgPSBzY29wZS5TQ1JJUFRfRElSO1xuXG4gICAgY29uc3QgYmluYXJ5RGlyMSA9IHNjb3BlLlBST0pFQ1RfQklOQVJZX0RJUi5yZWxhdGl2ZShzb3VyY2VEaXIpO1xuICAgIGNvbnN0IGJpbmFyeURpcjIgPSBzY29wZS5QUk9KRUNUX1NPVVJDRV9ESVIucmVsYXRpdmUoc291cmNlRGlyKTtcbiAgICBjb25zdCBiaW5hcnlEaXIgPSAoYmluYXJ5RGlyMi5sZW5ndGggPCBiaW5hcnlEaXIxLmxlbmd0aCA/IGJpbmFyeURpcjIgOiBiaW5hcnlEaXIxKS5yZXBsYWNlKFwiLi4vXCIsIFwiX18vXCIpO1xuICAgIHNjb3BlLkJJTkFSWV9ESVIgPSBzY29wZS5QUk9KRUNUX0JJTkFSWV9ESVIuam9pbihcIk1ha2VQbHVnaW5CaW5hcmllc1wiLCBiaW5hcnlEaXIpO1xuXG4gICAgcHJvY2Vzcy5jaGRpcihzY29wZS5TT1VSQ0VfRElSLnRvU3RyaW5nKCkpO1xuICAgIGNvbnN0IHBsdWdpblVybCA9IGdldFVSTFN0cmluZyhzY29wZS5TQ1JJUFRfRklMRS50b1N0cmluZygpKTtcbiAgICBjb25zdCBtb2R1bGUgPSBhd2FpdCBpbXBvcnRNb2R1bGUocGx1Z2luVXJsKTtcbiAgICBcbiAgICBpZiAoIW1vZHVsZS5kZWZhdWx0KVxuICAgICAgdGhyb3cgbmV3IEVycm9yKGBQbHVnaW4gJHtzY29wZS5TQ1JJUFRfRklMRS5iYXNlbmFtZSgpfSBub3QgY29udGFpbiBkZWZhdWx0IGV4cG9ydGApO1xuXG4gICAgY29uc3QgbWsgPSBQbHVnaW5Db250ZXh0LmNyZWF0ZShzZXJ2ZXIucHJvamVjdCwgdmFyaWFibGVNYXApO1xuICAgIGlmICh0eXBlb2YgbW9kdWxlLmRlZmF1bHQgIT09IFwiZnVuY3Rpb25cIilcbiAgICAgIHRocm93IG5ldyBFcnJvcihgUGx1Z2luICR7c2NvcGUuU0NSSVBUX0ZJTEUuYmFzZW5hbWUoKX0gZXhwb3J0IGhhcyBubyBmdW5jdGlvbiBvciBjbGFzc2ApO1xuICAgIGxldCByZXN1bHQ6IGFueTtcbiAgICBpZiAoL15jbGFzc1xccy8udGVzdChGdW5jdGlvbi5wcm90b3R5cGUudG9TdHJpbmcuY2FsbChtb2R1bGUuZGVmYXVsdCkpKSB7XG4gICAgICBpZiAodHlwZW9mIG1vZHVsZS5kZWZhdWx0LnByb3RvdHlwZS5hcHBseSAhPT0gXCJmdW5jdGlvblwiKVxuICAgICAgICB0aHJvdyBuZXcgRXJyb3IoYFBsdWdpbiBjbGFzcyBvZiAke3Njb3BlLlNDUklQVF9GSUxFLmJhc2VuYW1lKCl9IGhhcyBubyBhcHBseSBtZXRob2RgKTtcbiAgICAgIHJlc3VsdCA9IChuZXcgbW9kdWxlLmRlZmF1bHQpLmFwcGx5KG1rKTtcbiAgICB9XG4gICAgZWxzZSB7XG4gICAgICByZXN1bHQgPSBtb2R1bGUuZGVmYXVsdChtayk7XG4gICAgfVxuXG4gICAgaWYgKHJlc3VsdCBpbnN0YW5jZW9mIFByb21pc2UpXG4gICAgICBhd2FpdCByZXN1bHQ7XG5cbiAgICBwcm9jZXNzLmNoZGlyKGN3ZFNhdmUpO1xuICB9XG5cbiAgaWYgKHNjb3BlLlRPT0xDSEFJTl9GSUxFKSB7XG4gICAgY29uc3QgdG9vbGNoYWluVXJsID0gZ2V0VVJMU3RyaW5nKHNjb3BlLlRPT0xDSEFJTl9GSUxFLnRvU3RyaW5nKCkpO1xuICAgIGNvbnN0IHRvb2xjaGFpbiA9IGF3YWl0IGltcG9ydE1vZHVsZSh0b29sY2hhaW5VcmwpO1xuICAgIGlmICghdG9vbGNoYWluLmRlZmF1bHQpXG4gICAgICB0aHJvdyBuZXcgRXJyb3IoXCJUb29sY2hhaW4gbW9kdWxlIGhhcyBubyBkZWZhdWx0IGV4cG9ydFwiKTtcbiAgICBjb25zdCBtayA9IFRvb2xjaGFpbkNvbnRleHQuY3JlYXRlKHNlcnZlci5wcm9qZWN0LCB2YXJpYWJsZU1hcCk7XG4gICAgY29uc3QgcmVzdWx0ID0gdG9vbGNoYWluLmRlZmF1bHQobWspO1xuICAgIGlmIChyZXN1bHQgaW5zdGFuY2VvZiBQcm9taXNlKVxuICAgICAgYXdhaXQgcmVzdWx0O1xuICB9XG4gIGVsc2Uge1xuICAgIGF3YWl0IGRldGVybWluZUNvbXBpbGVyKHNjb3BlKTtcbiAgfVxuXG4gIGlmIChjb25maWcuc291cmNlVXJsICYmIGNvbmZpZy5zb3VyY2VVcmwuc3RhcnRzV2l0aChJTVBPUlRfU0NIRU1FKSkge1xuICAgIGNvbnN0IHNjcmlwdEZpbGUgPSByZXF1aXJlUmVzb2x2ZShjb25maWcuc291cmNlVXJsLnNsaWNlKElNUE9SVF9TQ0hFTUUubGVuZ3RoKSk7XG4gICAgc2NvcGUuU0NSSVBUX0ZJTEUgPSBBYnNvbHV0ZVBhdGguY3JlYXRlKHNjcmlwdEZpbGUpO1xuICAgIHNjb3BlLlNDUklQVF9ESVIgPSBzY29wZS5TQ1JJUFRfRklMRS5kaXJuYW1lKCk7XG4gIH1cblxuICBzZXJ2ZXIuYWRkRXZlbnRMaXN0ZW5lcihcImNvbmZpZ3VyZVwiLCBhc3luYyAoZXZlbnQpID0+IHtcbiAgICBsb2dnZXIuaW5mbyhcIkNvbmZpZ3VyaW5nIGRvbmVcIik7XG5cbiAgICBpZiAoc2NvcGUuR0xPQkFMX0NPTlRFWFRfSlNPTikge1xuICAgICAgYXdhaXQgc2F2ZUFzSlNPTihzY29wZS5HTE9CQUxfQ09OVEVYVF9KU09OLnRvUGF0aCgpLCBzZXJ2ZXIucHJvamVjdCwgeyBwcmV0dHk6IHRydWUgfSk7XG4gICAgfVxuXG4gICAgY29uc3QgYWxsR29hbExpc3QgPSBzZXJ2ZXIucHJvamVjdC5jcmVhdGVHb2FscyhzY29wZSk7XG4gICAgY29uc3QgZ29hbExpc3QgPSBhbGxHb2FsTGlzdC5nZXRUYXJnZXRMaXN0KElOU1RBTExfVEFSR0VUKTtcblxuICAgIGlmIChzY29wZS5UQVJHRVRfR09BTFNfSlNPTikge1xuICAgICAgYXdhaXQgc2F2ZUFzSlNPTihzY29wZS5UQVJHRVRfR09BTFNfSlNPTi50b1BhdGgoKSwgZ29hbExpc3QsIHsgcHJldHR5OiB0cnVlIH0pO1xuICAgIH1cblxuICAgIGxldCBsb2FkZWQgPSAwO1xuICAgIGNvbnN0IHRvdGFsID0gZ29hbExpc3QubGVuZ3RoO1xuICAgIGZvciAoY29uc3QgaXRlciBvZiBnb2FsTGlzdCkge1xuICAgICAgaWYgKGl0ZXIub3V0cHV0KSB7XG4gICAgICAgIGNvbnN0IG91dHB1dERpciA9IFBhdGguZGlybmFtZShpdGVyLm91dHB1dCk7XG4gICAgICAgIGF3YWl0IGZzLnByb21pc2VzLm1rZGlyKG91dHB1dERpciwgeyByZWN1cnNpdmU6IHRydWUgfSk7XG4gICAgICB9XG4gICAgICBpZiAoaXRlci5tZXNzYWdlKSB7XG4gICAgICAgIGNvbnN0IHJlbGF0aW9uT2ZMZW5ndGggPSBNYXRoLnJvdW5kKCgobG9hZGVkICsgMSkgLyB0b3RhbCkgKiAxMDApO1xuICAgICAgICBjb25zdCBwZXJjZW50ID0gXCJbXCIgKyByZWxhdGlvbk9mTGVuZ3RoLnRvU3RyaW5nKCkucGFkU3RhcnQoMywgXCIgXCIpICsgXCIlXSBcIjtcbiAgICAgICAgbG9nZ2VyLm5vdGljZShwZXJjZW50ICsgaXRlci5tZXNzYWdlKTtcbiAgICAgIH1cbiAgICAgIGF3YWl0IGl0ZXIuZG9Xb3JrKCk7XG4gICAgICBsb2FkZWQrKztcbiAgICB9XG4gIH0pO1xuXG4gIGxldCBmaW5pc2hSZXNvbHZlOiAoKSA9PiB2b2lkO1xuICBjb25zdCByZXN1bHQgPSBuZXcgUHJvbWlzZTx2b2lkPigocmVzb2x2ZSkgPT4ge1xuICAgIGZpbmlzaFJlc29sdmUgPSByZXNvbHZlO1xuICB9KTtcblxuICBzZXJ2ZXIuYWRkRXZlbnRMaXN0ZW5lcihcImJ1aWxkXCIsIChldmVudCkgPT4gZmluaXNoUmVzb2x2ZSgpKTtcblxuICBzZXJ2ZXIuc3RhcnQoKTtcblxuICByZXR1cm4gcmVzdWx0O1xufVxuIiwiLypcbiAqIE1JVCBMaWNlbnNlXG4gKlxuICogQ29weXJpZ2h0IChjKSAyMDI1ICBZdXJpaSBZYWt1YmluICh5dXJpaS55YWt1YmluQGdtYWlsLmNvbSlcbiAqXG4gKiBQZXJtaXNzaW9uIGlzIGdyYW50ZWQgdG8gdXNlLCBjb3B5LCBtb2RpZnksIGFuZCBkaXN0cmlidXRlIHRoaXMgc29mdHdhcmVcbiAqIHVuZGVyIHRoZSBNSVQgTGljZW5zZS4gU2VlIExJQ0VOU0UgZmlsZSBmb3IgZGV0YWlscy5cbiAqL1xuXG5pbXBvcnQgeyBDTWFrZVByb2Nlc3MsIERFRkFVTFRfR0VORVJBVE9SIH0gZnJvbSBcIkAvY21ha2VcIjtcbmltcG9ydCB7IGdldFBhdGhTdHJpbmcgfSAgZnJvbSBcIkAvdXRpbHMvRmlsZVN5c3RlbVwiO1xuaW1wb3J0IHsgU2V0dGluZ3NTdG9yYWdlIH0gZnJvbSBcIkAvdXRpbHMvU2V0dGluZ3NTdG9yYWdlXCI7XG5cbmV4cG9ydCBkZWZhdWx0IGFzeW5jIGZ1bmN0aW9uKGNvbmZpZzogYW55LCBlbnZpcm9ubWVudDogYW55LCBzZXR0aW5nczogU2V0dGluZ3NTdG9yYWdlKSB7XG4gIGNvbnN0IHNvdXJjZURpciA9IGdldFBhdGhTdHJpbmcoY29uZmlnLnNvdXJjZURpcik7XG4gIGNvbnN0IGJpbmFyeURpciA9IGdldFBhdGhTdHJpbmcoY29uZmlnLmJpbmFyeURpcik7XG4gIGNvbnN0IGNtYWtlQXJncyA9IHtcbiAgICBlbnZpcm9ubWVudDoge1xuICAgICAgLi4uZW52aXJvbm1lbnQsXG4gICAgICBERVNURElSOiBjb25maWcuZGVzdERpcixcbiAgICB9LFxuICAgIGdlbmVyYXRvcjogY29uZmlnLmdlbmVyYXRvciB8fCBERUZBVUxUX0dFTkVSQVRPUixcbiAgICBjYWNoZVZhcmlhYmxlczogY29uZmlnLmNhY2hlVmFyaWFibGVzLFxuICAgIHNvdXJjZURpcixcbiAgICBiaW5hcnlEaXIsXG4gIH07XG5cbiAgaWYgKCFjbWFrZUFyZ3MuY2FjaGVWYXJpYWJsZXMuQ01BS0VfQlVJTERfVFlQRSkge1xuICAgIGNtYWtlQXJncy5jYWNoZVZhcmlhYmxlcy5DTUFLRV9CVUlMRF9UWVBFID0gY29uZmlnLmJ1aWxkVHlwZTtcbiAgfVxuXG4gIGNvbnN0IGNtYWtlID0gQ01ha2VQcm9jZXNzLmdldEluc3RhbmNlKCk7XG4gIGF3YWl0IGNtYWtlLmNvbmZpZ3VyZShjbWFrZUFyZ3MpO1xuICBhd2FpdCBjbWFrZS5idWlsZChjbWFrZUFyZ3MpO1xuICBhd2FpdCBjbWFrZS5pbnN0YWxsKGNtYWtlQXJncyk7XG59XG4iLCIvKlxuICogTUlUIExpY2Vuc2VcbiAqXG4gKiBDb3B5cmlnaHQgKGMpIDIwMjUgIFl1cmlpIFlha3ViaW4gKHl1cmlpLnlha3ViaW5AZ21haWwuY29tKVxuICpcbiAqIFBlcm1pc3Npb24gaXMgZ3JhbnRlZCB0byB1c2UsIGNvcHksIG1vZGlmeSwgYW5kIGRpc3RyaWJ1dGUgdGhpcyBzb2Z0d2FyZVxuICogdW5kZXIgdGhlIE1JVCBMaWNlbnNlLiBTZWUgTElDRU5TRSBmaWxlIGZvciBkZXRhaWxzLlxuICovXG5cbmltcG9ydCBwYXRoIGZyb20gXCJub2RlOnBhdGhcIjtcblxuaW1wb3J0IHsgZW5zdXJlQm9vbGVhbiB9IGZyb20gXCJAL3V0aWxzL1N0cmljdFR5cGVcIjtcbmltcG9ydCB7IGdldFBhdGhTdHJpbmcgfSBmcm9tIFwiQC91dGlscy9GaWxlU3lzdGVtXCI7XG5pbXBvcnQgeyBTZXR0aW5nc1N0b3JhZ2UgfSBmcm9tIFwiQC91dGlscy9TZXR0aW5nc1N0b3JhZ2VcIjtcbmltcG9ydCB7IHNwYXduQXN5bmMgfSBmcm9tIFwiQC91dGlscy9DaGlsZFByb2Nlc3NcIjtcblxuZXhwb3J0IGRlZmF1bHQgYXN5bmMgZnVuY3Rpb24oY29uZmlnOiBhbnksIGVudmlyb25tZW50OiBhbnksIHNldHRpbmdzOiBTZXR0aW5nc1N0b3JhZ2UpIHtcbiAgY29uc3Qgc291cmNlRGlyID0gZ2V0UGF0aFN0cmluZyhjb25maWcuc291cmNlRGlyKTtcbiAgY29uc3QgYmluYXJ5RGlyID0gZ2V0UGF0aFN0cmluZyhjb25maWcuYmluYXJ5RGlyKTtcbiAgbGV0IHN0ZXAgPSBhd2FpdCBzZXR0aW5ncy5nZXQoXCJjb25maWd1cmVcIikgfHwgXCJjb25maWdcIjtcbiAgaWYgKHN0ZXAgPT09IFwiY29uZmlnXCIpIHtcbiAgICBjb25zdCBjb21tYW5kID0gcGF0aC5yZXNvbHZlKHNvdXJjZURpciwgXCJjb25maWd1cmVcIik7XG4gICAgY29uc3QgcGFyYW1zID0gW107XG4gICAgaWYgKEFycmF5LmlzQXJyYXkoY29uZmlnLnZhcmlhYmxlcykpIHtcbiAgICAgIGZvciAoY29uc3QgaXRlciBvZiBjb25maWcudmFyaWFibGVzKVxuICAgICAgICBwYXJhbXMucHVzaChpdGVyKTtcbiAgICB9XG4gICAgZWxzZSBpZiAoY29uZmlnLnZhcmlhYmxlcykge1xuICAgICAgZm9yIChjb25zdCBba2V5LHZhbF0gb2YgT2JqZWN0LmVudHJpZXMoY29uZmlnLnZhcmlhYmxlcykpIHtcbiAgICAgICAgaWYgKGtleSA9PT0gXCJmZWF0dXJlc1wiICYmIEFycmF5LmlzQXJyYXkodmFsKSkge1xuICAgICAgICAgIGZvciAoY29uc3QgaXRlciBvZiB2YWwpXG4gICAgICAgICAgICBwYXJhbXMucHVzaChgLS0ke2l0ZXJ9YCk7XG4gICAgICAgIH1cbiAgICAgICAgZWxzZSBpZiAodmFsID09PSBudWxsKVxuICAgICAgICAgIHBhcmFtcy5wdXNoKGAtLSR7a2V5fWApO1xuICAgICAgICBlbHNlXG4gICAgICAgICAgcGFyYW1zLnB1c2goYC0tJHtrZXl9PSR7dmFsfWApO1xuICAgICAgfVxuICAgIH1cbiAgICBpZiAoY29uZmlnLmZlYXR1cmVzKSB7XG4gICAgICBmb3IgKGNvbnN0IGtleSBvZiBjb25maWcuZmVhdHVyZXMpXG4gICAgICAgIHBhcmFtcy5wdXNoKGAtLSR7a2V5fWApO1xuICAgIH1cbiAgICBjb25zdCByZXMxID0gYXdhaXQgc3Bhd25Bc3luYyhjb21tYW5kLCBwYXJhbXMsIHtcbiAgICAgIGN3ZDogYmluYXJ5RGlyLFxuICAgICAgZW52OiBlbnZpcm9ubWVudCxcbiAgICAgIGV4dHJhOiB7XG4gICAgICAgIG91dHB1dDogYGFjLWNvbmZpZ3VyZS0ke3N0ZXB9LmxvZ2AsXG4gICAgICB9LFxuICAgIH0pO1xuICAgIGlmIChyZXMxLnN0YXR1cyAhPT0gMCkge1xuICAgICAgdGhyb3cgbmV3IEVycm9yKGBjb25maWd1cmUgcmV0dXJuZWQgc3RhdHVzICR7cmVzMS5zdGF0dXN9YCk7XG4gICAgfVxuICAgIHN0ZXAgPSBcIm1ha2VcIjtcbiAgICBhd2FpdCBzZXR0aW5ncy5zZXQoXCJjb25maWd1cmVcIiwgc3RlcCk7XG4gIH1cbiAgaWYgKHN0ZXAgPT09IFwibWFrZVwiKSB7XG4gICAgbGV0IHJ1bk1ha2UgPSBmYWxzZTtcbiAgICBpZiAoT2JqZWN0Lmhhc093bihjb25maWcsIFwicnVuTWFrZVwiKSlcbiAgICAgIHJ1bk1ha2UgPSBlbnN1cmVCb29sZWFuKGNvbmZpZy5ydW5NYWtlKTtcbiAgICBpZiAocnVuTWFrZSkge1xuICAgICAgY29uc3QgcmVzMiA9IGF3YWl0IHNwYXduQXN5bmMoXCJtYWtlXCIsIFtdLCB7XG4gICAgICAgIGN3ZDogYmluYXJ5RGlyLFxuICAgICAgICBlbnY6IGVudmlyb25tZW50LFxuICAgICAgICBleHRyYToge1xuICAgICAgICAgIG91dHB1dDogYGFjLWNvbmZpZ3VyZS0ke3N0ZXB9LmxvZ2AsXG4gICAgICAgIH0sXG4gICAgICB9KTtcbiAgICAgIGlmIChyZXMyLnN0YXR1cyAhPT0gMCkge1xuICAgICAgICB0aHJvdyBuZXcgRXJyb3IoYG1ha2UgcmV0dXJuZWQgc3RhdHVzICR7cmVzMi5zdGF0dXN9YCk7XG4gICAgICB9XG4gICAgfVxuICAgIHN0ZXAgPSBcImluc3RhbGxcIjtcbiAgICBhd2FpdCBzZXR0aW5ncy5zZXQoXCJjb25maWd1cmVcIiwgc3RlcCk7XG4gIH1cbiAgaWYgKHN0ZXAgPT09IFwiaW5zdGFsbFwiKSB7XG4gICAgbGV0IHJ1bk1ha2VJbnN0YWxsID0gdHJ1ZTtcbiAgICBpZiAoT2JqZWN0Lmhhc093bihjb25maWcsIFwicnVuTWFrZUluc3RhbGxcIikpXG4gICAgICBydW5NYWtlSW5zdGFsbCA9IGVuc3VyZUJvb2xlYW4oY29uZmlnLnJ1bk1ha2VJbnN0YWxsKTtcbiAgICBpZiAocnVuTWFrZUluc3RhbGwpIHtcbiAgICAgIGNvbnN0IGFyZ3MgPSBbIFwiaW5zdGFsbFwiIF07XG4gICAgICBpZiAoY29uZmlnLmRlc3REaXIpIHtcbiAgICAgICAgYXJncy5wdXNoKGBERVNURElSPSR7Y29uZmlnLmRlc3REaXJ9YCk7XG4gICAgICB9XG4gICAgICBjb25zdCByZXMyID0gYXdhaXQgc3Bhd25Bc3luYyhcIm1ha2VcIiwgYXJncywge1xuICAgICAgICBjd2Q6IGJpbmFyeURpcixcbiAgICAgICAgZW52OiBlbnZpcm9ubWVudCxcbiAgICAgICAgZXh0cmE6IHtcbiAgICAgICAgICBvdXRwdXQ6IGBhYy1jb25maWd1cmUtJHtzdGVwfS5sb2dgLFxuICAgICAgICB9LFxuICAgICAgfSk7XG4gICAgICBpZiAocmVzMi5zdGF0dXMgIT09IDApIHtcbiAgICAgICAgdGhyb3cgbmV3IEVycm9yKGBtYWtlIHJldHVybmVkIHN0YXR1cyAke3JlczIuc3RhdHVzfWApO1xuICAgICAgfVxuICAgIH1cbiAgICBzdGVwID0gXCJkb25lXCI7XG4gICAgYXdhaXQgc2V0dGluZ3Muc2V0KFwiY29uZmlndXJlXCIsIHN0ZXApO1xuICB9XG59XG4iLCIvKlxuICogTUlUIExpY2Vuc2VcbiAqXG4gKiBDb3B5cmlnaHQgKGMpIDIwMjUgIFl1cmlpIFlha3ViaW4gKHl1cmlpLnlha3ViaW5AZ21haWwuY29tKVxuICpcbiAqIFBlcm1pc3Npb24gaXMgZ3JhbnRlZCB0byB1c2UsIGNvcHksIG1vZGlmeSwgYW5kIGRpc3RyaWJ1dGUgdGhpcyBzb2Z0d2FyZVxuICogdW5kZXIgdGhlIE1JVCBMaWNlbnNlLiBTZWUgTElDRU5TRSBmaWxlIGZvciBkZXRhaWxzLlxuICovXG5cbmltcG9ydCB7IFNldHRpbmdzU3RvcmFnZSB9IGZyb20gXCJAL3V0aWxzL1NldHRpbmdzU3RvcmFnZVwiO1xuXG5pbXBvcnQgbm9uZSBmcm9tIFwiQC9hY3Rpb25zL25vbmVcIjtcbmltcG9ydCBwcm9jZXNzIGZyb20gXCJAL2FjdGlvbnMvcHJvY2Vzc1wiO1xuaW1wb3J0IGNvbmZpZ3VyZSBmcm9tIFwiQC9hY3Rpb25zL2NvbmZpZ3VyZVwiO1xuaW1wb3J0IG1ha2UgZnJvbSBcIkAvYWN0aW9ucy9tYWtlXCI7XG5pbXBvcnQgY21ha2UgZnJvbSBcIkAvYWN0aW9ucy9jbWFrZVwiO1xuaW1wb3J0IGJpdG1ha2UgZnJvbSBcIkAvYWN0aW9ucy9iaXRtYWtlXCI7XG5cbmludGVyZmFjZSBBY3Rpb25IYW5kbGVycyB7XG4gIFtuYW1lOiBzdHJpbmddOiAoY29uZmlnOiBhbnksIGVudmlyb25tZW50OiBhbnksIHNldHRpbmdzOiBTZXR0aW5nc1N0b3JhZ2UpID0+IFByb21pc2U8dm9pZD47XG59XG5cbmV4cG9ydCBkZWZhdWx0IDxBY3Rpb25IYW5kbGVycz4ge1xuICBub25lLFxuICBwcm9jZXNzLFxuICBjb25maWd1cmUsXG4gIG1ha2UsXG4gIGNtYWtlLFxuICBiaXRtYWtlLFxufTtcbiIsIi8qXG4gKiBNSVQgTGljZW5zZVxuICpcbiAqIENvcHlyaWdodCAoYykgMjAyNSAgWXVyaWkgWWFrdWJpbiAoeXVyaWkueWFrdWJpbkBnbWFpbC5jb20pXG4gKlxuICogUGVybWlzc2lvbiBpcyBncmFudGVkIHRvIHVzZSwgY29weSwgbW9kaWZ5LCBhbmQgZGlzdHJpYnV0ZSB0aGlzIHNvZnR3YXJlXG4gKiB1bmRlciB0aGUgTUlUIExpY2Vuc2UuIFNlZSBMSUNFTlNFIGZpbGUgZm9yIGRldGFpbHMuXG4gKi9cblxuaW1wb3J0IHsgc3Bhd25Bc3luYyB9IGZyb20gXCJAL3V0aWxzL0NoaWxkUHJvY2Vzc1wiO1xuaW1wb3J0IHsgZ2V0UGF0aFN0cmluZyB9ICBmcm9tIFwiQC91dGlscy9GaWxlU3lzdGVtXCI7XG5pbXBvcnQgeyBTZXR0aW5nc1N0b3JhZ2UgfSBmcm9tIFwiQC91dGlscy9TZXR0aW5nc1N0b3JhZ2VcIjtcblxuZXhwb3J0IGRlZmF1bHQgYXN5bmMgZnVuY3Rpb24oY29uZmlnOiBhbnksIGVudmlyb25tZW50OiBhbnksIHNldHRpbmdzOiBTZXR0aW5nc1N0b3JhZ2UpIHtcbiAgY29uc3QgYmluYXJ5RGlyID0gZ2V0UGF0aFN0cmluZyhjb25maWcuYmluYXJ5RGlyKTtcbiAgY29uc3QgYXJncyA9IGNvbmZpZy5hcmdzIHx8IFtdO1xuICBpZiAoY29uZmlnLmRlc3REaXIpIHtcbiAgICBhcmdzLnB1c2goYERFU1RESVI9JHtjb25maWcuZGVzdERpcn1gKTtcbiAgfVxuICBjb25zdCByZXMyID0gYXdhaXQgc3Bhd25Bc3luYyhcIm1ha2VcIiwgYXJncywge1xuICAgIGN3ZDogYmluYXJ5RGlyLFxuICAgIGVudjogZW52aXJvbm1lbnQsXG4gICAgZXh0cmE6IHtcbiAgICAgIG91dHB1dDogYG1ha2UubG9nYCxcbiAgICB9LFxuICB9KTtcbiAgaWYgKHJlczIuc3RhdHVzICE9PSAwKSB7XG4gICAgdGhyb3cgbmV3IEVycm9yKGBtYWtlIHJldHVybmVkIHN0YXR1cyAke3JlczIuc3RhdHVzfWApO1xuICB9XG59XG4iLCIvKlxuICogTUlUIExpY2Vuc2VcbiAqXG4gKiBDb3B5cmlnaHQgKGMpIDIwMjUgIFl1cmlpIFlha3ViaW4gKHl1cmlpLnlha3ViaW5AZ21haWwuY29tKVxuICpcbiAqIFBlcm1pc3Npb24gaXMgZ3JhbnRlZCB0byB1c2UsIGNvcHksIG1vZGlmeSwgYW5kIGRpc3RyaWJ1dGUgdGhpcyBzb2Z0d2FyZVxuICogdW5kZXIgdGhlIE1JVCBMaWNlbnNlLiBTZWUgTElDRU5TRSBmaWxlIGZvciBkZXRhaWxzLlxuICovXG5cblxuaW1wb3J0IHsgU2V0dGluZ3NTdG9yYWdlIH0gZnJvbSBcIkAvdXRpbHMvU2V0dGluZ3NTdG9yYWdlXCI7XG5pbXBvcnQgeyBMb2dnZXIgfSBmcm9tIFwiQC9sb2dnZXJcIjtcblxuY29uc3QgbG9nZ2VyID0gTG9nZ2VyLmNyZWF0ZShpbXBvcnQubWV0YS51cmwpO1xuXG5leHBvcnQgZGVmYXVsdCBhc3luYyBmdW5jdGlvbihjb25maWc6IGFueSwgZW52aXJvbm1lbnQ6IGFueSwgc2V0dGluZ3M6IFNldHRpbmdzU3RvcmFnZSkge1xuICAvKiBkbyBub3RoaW5nICovXG59XG4iLCIvKlxuICogTUlUIExpY2Vuc2VcbiAqXG4gKiBDb3B5cmlnaHQgKGMpIDIwMjUgIFl1cmlpIFlha3ViaW4gKHl1cmlpLnlha3ViaW5AZ21haWwuY29tKVxuICpcbiAqIFBlcm1pc3Npb24gaXMgZ3JhbnRlZCB0byB1c2UsIGNvcHksIG1vZGlmeSwgYW5kIGRpc3RyaWJ1dGUgdGhpcyBzb2Z0d2FyZVxuICogdW5kZXIgdGhlIE1JVCBMaWNlbnNlLiBTZWUgTElDRU5TRSBmaWxlIGZvciBkZXRhaWxzLlxuICovXG5cblxuaW1wb3J0IHBhdGggZnJvbSBcIm5vZGU6cGF0aFwiO1xuXG5pbXBvcnQgeyBnZXRQYXRoU3RyaW5nIH0gZnJvbSBcIkAvdXRpbHMvRmlsZVN5c3RlbVwiO1xuaW1wb3J0IHsgU2V0dGluZ3NTdG9yYWdlIH0gZnJvbSBcIkAvdXRpbHMvU2V0dGluZ3NTdG9yYWdlXCI7XG5pbXBvcnQgeyBzcGF3bkFzeW5jIH0gZnJvbSBcIkAvdXRpbHMvQ2hpbGRQcm9jZXNzXCI7XG5pbXBvcnQgeyBMb2dnZXIgfSBmcm9tIFwiQC9sb2dnZXJcIjtcblxuY29uc3QgbG9nZ2VyID0gTG9nZ2VyLmNyZWF0ZShpbXBvcnQubWV0YS51cmwpO1xuXG5leHBvcnQgZGVmYXVsdCBhc3luYyBmdW5jdGlvbihjb25maWc6IGFueSwgZW52aXJvbm1lbnQ6IGFueSwgc2V0dGluZ3M6IFNldHRpbmdzU3RvcmFnZSkge1xuICBpZiAoIWNvbmZpZy5jb21tYW5kKVxuICAgIHRocm93IG5ldyBFcnJvcihcIlJlcXVpcmVkIGNvbW1hbmQgZmllbGQgZm9yIHByb2Nlc3MgYWN0aW9uXCIpO1xuICBjb25zdCBzb3VyY2VEaXIgPSBnZXRQYXRoU3RyaW5nKGNvbmZpZy5zb3VyY2VEaXIpO1xuICBjb25zdCBiaW5hcnlEaXIgPSBnZXRQYXRoU3RyaW5nKGNvbmZpZy5iaW5hcnlEaXIpO1xuICBsZXQgeyBjb21tYW5kIH0gPSBjb25maWc7XG4gIGlmICghcGF0aC5pc0Fic29sdXRlKGNvbW1hbmQpICYmIChjb21tYW5kLmluY2x1ZGVzKHBhdGgucG9zaXguZGVsaW1pdGVyKSB8fCBjb21tYW5kLmluY2x1ZGVzKHBhdGgud2luMzIuZGVsaW1pdGVyKSkpIHtcbiAgICBjb21tYW5kID0gcGF0aC5yZXNvbHZlKHNvdXJjZURpciwgY29tbWFuZCk7XG4gIH1cbiAgY29uc3QgcmVzID0gYXdhaXQgc3Bhd25Bc3luYyhjb21tYW5kLCBjb25maWcuYXJncyB8fCBbXSwge1xuICAgIGN3ZDogYmluYXJ5RGlyLFxuICAgIGVudjogZW52aXJvbm1lbnQsXG4gICAgZXh0cmE6IHtcbiAgICAgIG91dHB1dDogYHByb2Nlc3MubG9nYCxcbiAgICB9LFxuICB9KTtcbiAgaWYgKHJlcy5zdGF0dXMgIT09IDApIHtcbiAgICB0aHJvdyBuZXcgRXJyb3IoYHByb2Nlc3MgcmV0dXJuZWQgc3RhdHVzICR7cmVzLnN0YXR1c31gKTtcbiAgfVxufVxuIiwiLypcbiAqIE1JVCBMaWNlbnNlXG4gKlxuICogQ29weXJpZ2h0IChjKSAyMDI1ICBZdXJpaSBZYWt1YmluICh5dXJpaS55YWt1YmluQGdtYWlsLmNvbSlcbiAqXG4gKiBQZXJtaXNzaW9uIGlzIGdyYW50ZWQgdG8gdXNlLCBjb3B5LCBtb2RpZnksIGFuZCBkaXN0cmlidXRlIHRoaXMgc29mdHdhcmVcbiAqIHVuZGVyIHRoZSBNSVQgTGljZW5zZS4gU2VlIExJQ0VOU0UgZmlsZSBmb3IgZGV0YWlscy5cbiAqL1xuXG5pbXBvcnQgeyBpc0VudHJ5UG9pbnQgfSBmcm9tIFwiQC91dGlscy9Nb2R1bGVcIjtcbmltcG9ydCB7IGlzTWFpblRocmVhZCwgcGFyZW50UG9ydCwgd29ya2VyRGF0YSwgdGhyZWFkSWQgfSBmcm9tIFwibm9kZTp3b3JrZXJfdGhyZWFkc1wiO1xuaW1wb3J0IHsgQXJncyB9ICBmcm9tIFwiQC91dGlscy9BcmdzXCI7XG5pbXBvcnQgY29tbWFuZHMgZnJvbSBcIkAvY29tbWFuZHNcIjtcbmltcG9ydCB7IExvZ2dlciB9IGZyb20gXCJAL2xvZ2dlclwiO1xuaW1wb3J0IHsgcnVuU2NyaXB0SW5pdCB9IGZyb20gXCJAL2FwcC9SdW5TY3JpcHRJbml0XCI7XG5pbXBvcnQgeyBNZXNzYWdlUG9ydFNlbmRlciB9IGZyb20gXCJAL3NlcnZlci9NZXNzYWdlUG9ydFNlbmRlclwiO1xuaW1wb3J0IHsgV29ya2VyU2VydmljZSB9IGZyb20gXCJAL3NlcnZlci9Xb3JrZXJTZXJ2aWNlXCI7XG5cbmNvbnN0IGxvZ2dlciA9IExvZ2dlci5jcmVhdGUoaW1wb3J0Lm1ldGEudXJsKTtcblxuZXhwb3J0IGFzeW5jIGZ1bmN0aW9uIHJ1bk1haW5TY3JpcHQoKSB7XG4gIGxvZ2dlci5pbmZvKFwiTWFpbiB0aHJlYWQgc3RhcnRlZFwiKVxuICBjb25zdCBvcHRpb25zOiBhbnkgPSB7XG4gICAgaGFuZGxlcjogXCJkZWZhdWx0XCIsXG4gICAgd29ya0RpcjogcHJvY2Vzcy5jd2QoKSxcbiAgICBlbnY6IHt9LFxuICB9O1xuXG4gIGxldCBub2RlRXhlY3V0YWJsZTogc3RyaW5nIHwgdW5kZWZpbmVkO1xuICBpZiAocHJvY2Vzcy5hcmd2Lmxlbmd0aCA+IDApXG4gICAgbm9kZUV4ZWN1dGFibGUgPSBwcm9jZXNzLmFyZ3ZbMF07XG5cbiAgbGV0IGN1cnJlbnRTY3JpcHQ6IHN0cmluZyB8IHVuZGVmaW5lZDtcbiAgaWYgKHByb2Nlc3MuYXJndi5sZW5ndGggPiAxKVxuICAgIGN1cnJlbnRTY3JpcHQgPSBwcm9jZXNzLmFyZ3ZbMV07XG5cbiAgbGV0IGFyZ3NJbmRleCA9IHByb2Nlc3MuYXJndi5sZW5ndGg7XG4gIGlmIChwcm9jZXNzLmFyZ3YubGVuZ3RoID4gMikge1xuICAgIGFyZ3NJbmRleCA9IDI7XG4gICAgY29uc3QgaGFuZGxlciA9IHByb2Nlc3MuYXJndlthcmdzSW5kZXhdO1xuICAgIGlmICghaGFuZGxlci5zdGFydHNXaXRoKFwiLS1cIikpIHtcbiAgICAgIG9wdGlvbnMuaGFuZGxlciA9IGhhbmRsZXI7XG4gICAgICBhcmdzSW5kZXgrKztcbiAgICB9XG4gIH1cblxuICBvcHRpb25zLmVudiA9IEFyZ3MudG9PYmplY3QocHJvY2Vzcy5hcmd2LnNsaWNlKGFyZ3NJbmRleCkpO1xuXG4gIGNvbnN0IGhhbmRsZXIgPSBjb21tYW5kc1tvcHRpb25zLmhhbmRsZXJdO1xuICBpZiAoIWhhbmRsZXIpXG4gICAgdGhyb3cgRXJyb3IoYFRoZSAke1BST0pFQ1RfTkFNRX0gZG9lcyBub3Qgc3VwcG9ydCB0aGUgJHtvcHRpb25zLmhhbmRsZXJ9IGNvbW1hbmRgKTtcblxuICBjb25zdCByZXMgPSBoYW5kbGVyKG9wdGlvbnMpO1xuICBpZiAocmVzIGluc3RhbmNlb2YgUHJvbWlzZSkge1xuICAgIGF3YWl0IHJlcztcbiAgfVxufVxuXG5leHBvcnQgYXN5bmMgZnVuY3Rpb24gcnVuV29ya2VyU2NyaXB0KCkge1xuICBsb2dnZXIuZGVidWcoYFdvcmtlciB0aHJlYWQgIyR7dGhyZWFkSWR9IHN0YXJ0ZWRgLCB3b3JrZXJEYXRhKTtcblxuICBpZiAoIXBhcmVudFBvcnQpIHtcbiAgICB0aHJvdyBuZXcgRXJyb3IoYFdvcmtlciBub3Qgc3VwcG9ydGVkIHBhcmVudFBvcnRgKTtcbiAgfVxuXG4gIGNvbnN0IHNlbmRlciA9IG5ldyBNZXNzYWdlUG9ydFNlbmRlcihwYXJlbnRQb3J0KTtcbiAgY29uc3QgbG9vcGVyID0gbmV3IFdvcmtlclNlcnZpY2UoXCJ3XCIgKyB0aHJlYWRJZCwgc2VuZGVyKTtcblxuICBwYXJlbnRQb3J0Lm9uKFwibWVzc2FnZVwiLCAobWVzc2FnZSkgPT4gbG9vcGVyLmVtaXRNZXNzYWdlKHNlbmRlciwgbWVzc2FnZSkpO1xufVxuXG5leHBvcnQgZnVuY3Rpb24gcnVuU2NyaXB0KCkge1xuICBpZiAoIWlzRW50cnlQb2ludCgpKVxuICAgIHJldHVybjtcblxuICBydW5TY3JpcHRJbml0KCk7XG5cbiAgaWYgKCFpc01haW5UaHJlYWQpIHtcbiAgICBydW5Xb3JrZXJTY3JpcHQoKTtcbiAgICByZXR1cm47XG4gIH1cblxuICBydW5NYWluU2NyaXB0KCkudGhlbigoKSA9PiBwcm9jZXNzLmV4aXQoMCkpLmNhdGNoKChlKSA9PiB7XG4gICAgaWYgKGUgaW5zdGFuY2VvZiBFcnJvcilcbiAgICAgIGxvZ2dlci5mYXRhbChlLnN0YWNrKTtcbiAgICBlbHNlXG4gICAgICBsb2dnZXIuZmF0YWwoZSk7XG4gICAgcHJvY2Vzcy5leGl0KDEpO1xuICB9KTtcbn1cbiIsIi8qXG4gKiBNSVQgTGljZW5zZVxuICpcbiAqIENvcHlyaWdodCAoYykgMjAyNSAgWXVyaWkgWWFrdWJpbiAoeXVyaWkueWFrdWJpbkBnbWFpbC5jb20pXG4gKlxuICogUGVybWlzc2lvbiBpcyBncmFudGVkIHRvIHVzZSwgY29weSwgbW9kaWZ5LCBhbmQgZGlzdHJpYnV0ZSB0aGlzIHNvZnR3YXJlXG4gKiB1bmRlciB0aGUgTUlUIExpY2Vuc2UuIFNlZSBMSUNFTlNFIGZpbGUgZm9yIGRldGFpbHMuXG4gKi9cblxuaW1wb3J0IHsgQ3VzdG9tU2NyaXB0LCBQb3N0Q3VzdG9tU2NyaXB0IH0gZnJvbSBcIkAvY29yZS9DdXN0b21TY3JpcHRcIjtcbmltcG9ydCB7IEZpbGVJbnN0YWxsYXRpb25UYXNrIH0gZnJvbSBcIkAvY29yZS9GaWxlSW5zdGFsbGF0aW9uVGFza1wiO1xuaW1wb3J0IHsgU3Bhd25TeW5jVGFzayB9IGZyb20gXCJAL2NvcmUvU3Bhd25TeW5jVGFza1wiO1xuaW1wb3J0IHsgVGFyZ2V0RmlsZSB9IGZyb20gXCJAL2NvcmUvVGFyZ2V0RmlsZVwiO1xuaW1wb3J0IHsgSW5zdGFsbEVudGl0eSB9IGZyb20gXCJAL2NvcmUvSW5zdGFsbEVudGl0eVwiO1xuaW1wb3J0IHsgVGFyZ2V0SW5jbHVkZXMgfSBmcm9tIFwiQC9jb3JlL1RhcmdldEluY2x1ZGVzXCI7XG5pbXBvcnQgeyBUYXJnZXRPYmplY3RzIH0gZnJvbSBcIkAvY29yZS9UYXJnZXRPYmplY3RzXCI7XG5pbXBvcnQgeyBUYXJnZXROYW1lIH0gZnJvbSBcIkAvY29yZS9UYXJnZXROYW1lXCI7XG5pbXBvcnQgeyBTb3VyY2VGaWxlIH0gZnJvbSBcIkAvY29yZS9Tb3VyY2VGaWxlXCI7XG5pbXBvcnQgeyBEaXJQYXRoLCBGaWxlUGF0aCB9IGZyb20gXCJAL2NvcmUvQWJzb2x1dGVQYXRoXCI7XG5pbXBvcnQgeyBQb3N0VGFyZ2V0LCBPYmplY3RMaWJyYXJ5LCBTdGF0aWNMaWJyYXJ5LCBTaGFyZWRMaWJyYXJ5LCBFeGVjdXRhYmxlIH0gZnJvbSBcIkAvY29yZS9UYXJnZXRcIjtcblxuaW1wb3J0IHsgU2ltcGxlT2JqZWN0IH0gZnJvbSBcIkAvY29yZS9TaW1wbGVPYmplY3RcIjtcblxuZXhwb3J0IGZ1bmN0aW9uIHJ1blNjcmlwdEluaXQoKSB7IFxuICBTaW1wbGVPYmplY3QucmVnaXN0ZXJQYXJzZXIoUG9zdEN1c3RvbVNjcmlwdC5uYW1lLCBQb3N0Q3VzdG9tU2NyaXB0LmZyb21KU09OKTtcbiAgU2ltcGxlT2JqZWN0LnJlZ2lzdGVyUGFyc2VyKEN1c3RvbVNjcmlwdC5uYW1lLCBDdXN0b21TY3JpcHQuZnJvbUpTT04pO1xuICBTaW1wbGVPYmplY3QucmVnaXN0ZXJQYXJzZXIoRmlsZUluc3RhbGxhdGlvblRhc2submFtZSwgRmlsZUluc3RhbGxhdGlvblRhc2suZnJvbUpTT04pO1xuICBTaW1wbGVPYmplY3QucmVnaXN0ZXJQYXJzZXIoU3Bhd25TeW5jVGFzay5uYW1lLCBTcGF3blN5bmNUYXNrLmZyb21KU09OKTtcbiAgU2ltcGxlT2JqZWN0LnJlZ2lzdGVyUGFyc2VyKFRhcmdldEZpbGUubmFtZSwgVGFyZ2V0RmlsZS5mcm9tSlNPTik7XG4gIFNpbXBsZU9iamVjdC5yZWdpc3RlclBhcnNlcihJbnN0YWxsRW50aXR5Lm5hbWUsIEluc3RhbGxFbnRpdHkuZnJvbUpTT04pO1xuICBTaW1wbGVPYmplY3QucmVnaXN0ZXJQYXJzZXIoVGFyZ2V0SW5jbHVkZXMubmFtZSwgVGFyZ2V0SW5jbHVkZXMuZnJvbUpTT04pO1xuICBTaW1wbGVPYmplY3QucmVnaXN0ZXJQYXJzZXIoVGFyZ2V0T2JqZWN0cy5uYW1lLCBUYXJnZXRPYmplY3RzLmZyb21KU09OKTtcbiAgU2ltcGxlT2JqZWN0LnJlZ2lzdGVyUGFyc2VyKFRhcmdldE5hbWUubmFtZSwgVGFyZ2V0TmFtZS5mcm9tSlNPTik7XG4gIFNpbXBsZU9iamVjdC5yZWdpc3RlclBhcnNlcihTb3VyY2VGaWxlLm5hbWUsIFNvdXJjZUZpbGUuZnJvbUpTT04pO1xuICBTaW1wbGVPYmplY3QucmVnaXN0ZXJQYXJzZXIoRGlyUGF0aC5uYW1lLCBEaXJQYXRoLmZyb21KU09OKTtcbiAgU2ltcGxlT2JqZWN0LnJlZ2lzdGVyUGFyc2VyKEZpbGVQYXRoLm5hbWUsIEZpbGVQYXRoLmZyb21KU09OKTtcbiAgU2ltcGxlT2JqZWN0LnJlZ2lzdGVyUGFyc2VyKFBvc3RUYXJnZXQubmFtZSwgUG9zdFRhcmdldC5mcm9tSlNPTik7XG4gIFNpbXBsZU9iamVjdC5yZWdpc3RlclBhcnNlcihPYmplY3RMaWJyYXJ5Lm5hbWUsIE9iamVjdExpYnJhcnkuZnJvbUpTT04pO1xuICBTaW1wbGVPYmplY3QucmVnaXN0ZXJQYXJzZXIoU3RhdGljTGlicmFyeS5uYW1lLCBTdGF0aWNMaWJyYXJ5LmZyb21KU09OKTtcbiAgU2ltcGxlT2JqZWN0LnJlZ2lzdGVyUGFyc2VyKFNoYXJlZExpYnJhcnkubmFtZSwgU2hhcmVkTGlicmFyeS5mcm9tSlNPTik7XG4gIFNpbXBsZU9iamVjdC5yZWdpc3RlclBhcnNlcihFeGVjdXRhYmxlLm5hbWUsIEV4ZWN1dGFibGUuZnJvbUpTT04pO1xufVxuIiwiLypcbiAqIE1JVCBMaWNlbnNlXG4gKlxuICogQ29weXJpZ2h0IChjKSAyMDI1ICBZdXJpaSBZYWt1YmluICh5dXJpaS55YWt1YmluQGdtYWlsLmNvbSlcbiAqXG4gKiBQZXJtaXNzaW9uIGlzIGdyYW50ZWQgdG8gdXNlLCBjb3B5LCBtb2RpZnksIGFuZCBkaXN0cmlidXRlIHRoaXMgc29mdHdhcmVcbiAqIHVuZGVyIHRoZSBNSVQgTGljZW5zZS4gU2VlIExJQ0VOU0UgZmlsZSBmb3IgZGV0YWlscy5cbiAqL1xuXG5leHBvcnQgZW51bSBCb29sZWFuVHlwZSB7XG4gIE9OID0gXCJPTlwiLFxuICBPRkYgPSBcIk9GRlwiLFxufTtcblxuLy8gRW51bSByZXByZXNlbnRpbmcgdmFsdWUgdHlwZXMgdXNlZCBpbiBDTWFrZSBjYWNoZSB2YXJpYWJsZXNcbmV4cG9ydCBlbnVtIFZhbHVlVHlwZSB7XG4gIC8vIFJlcHJlc2VudHMgYSBmdWxsIHBhdGggdG8gYSBmaWxlXG4gIEZJTEVQQVRIID0gXCJGSUxFUEFUSFwiLFxuXG4gIC8vIFJlcHJlc2VudHMgYSBwYXRoIHRvIGEgZGlyZWN0b3J5XG4gIFBBVEggPSBcIlBBVEhcIixcblxuICAvLyBSZXByZXNlbnRzIGEgYm9vbGVhbiB2YWx1ZSAodHJ1ZS9mYWxzZSlcbiAgQk9PTCA9IFwiQk9PTFwiLFxuXG4gIC8vIFJlcHJlc2VudHMgYSBnZW5lcmljIHN0cmluZyB2YWx1ZVxuICBTVFJJTkcgPSBcIlNUUklOR1wiLFxufTtcblxuLy8gQnVpbGRUeXBlIHJlcHJlc2VudGluZyBjb21tb24gQ01ha2UgYnVpbGQgdHlwZXNcbmV4cG9ydCBlbnVtIEJ1aWxkVHlwZSB7XG4gIC8vIERlYnVnIGJ1aWxkIHR5cGU6IGluY2x1ZGVzIGRlYnVnIHN5bWJvbHMsIG5vIG9wdGltaXphdGlvblxuICBEZWJ1ZyA9IFwiRGVidWdcIixcblxuICAvLyBSZWxlYXNlIGJ1aWxkIHR5cGU6IG9wdGltaXplZCBjb2RlLCBubyBkZWJ1ZyBpbmZvXG4gIFJlbGVhc2UgPSBcIlJlbGVhc2VcIixcblxuICAvLyBSZWxlYXNlIHdpdGggZGVidWcgaW5mbzogb3B0aW1pemVkIHdpdGggZGVidWcgc3ltYm9scyBpbmNsdWRlZFxuICBSZWxXaXRoRGViSW5mbyA9IFwiUmVsV2l0aERlYkluZm9cIixcblxuICAvLyBNaW5pbXVtIHNpemUgcmVsZWFzZTogb3B0aW1pemVkIGZvciBzbWFsbGVzdCBiaW5hcnkgc2l6ZVxuICBNaW5TaXplUmVsID0gXCJNaW5TaXplUmVsXCIsXG59O1xuXG4vLyBUaGUgZGVmYXVsdCBuYW1lIG9mIHRoZSBtYWluIENNYWtlIGJ1aWxkIGNvbmZpZ3VyYXRpb24gZmlsZVxuZXhwb3J0IGNvbnN0IENNQUtFX0xJU1RTX1RYVCA9IFwiQ01ha2VMaXN0cy50eHRcIjtcblxuZXhwb3J0IGVudW0gR2VuZXJhdG9yVHlwZSB7XG4gIC8vIE5hbWUgb2YgdGhlIENNYWtlIGdlbmVyYXRvciBmb3Igc3RhbmRhcmQgVW5peCAnbWFrZScgYnVpbGQgc3lzdGVtXG4gIFVuaXhNYWtlZmlsZXMgPSBcIlVuaXggTWFrZWZpbGVzXCIsXG59O1xuXG4vLyBOYW1lIG9mIHRoZSBDTWFrZSBnZW5lcmF0b3IgZm9yIHN0YW5kYXJkIFVuaXggJ21ha2UnIGJ1aWxkIHN5c3RlbVxuZXhwb3J0IGNvbnN0IERFRkFVTFRfR0VORVJBVE9SOiBHZW5lcmF0b3JUeXBlID0gR2VuZXJhdG9yVHlwZS5Vbml4TWFrZWZpbGVzO1xuIiwiLypcbiAqIE1JVCBMaWNlbnNlXG4gKlxuICogQ29weXJpZ2h0IChjKSAyMDI1ICBZdXJpaSBZYWt1YmluICh5dXJpaS55YWt1YmluQGdtYWlsLmNvbSlcbiAqXG4gKiBQZXJtaXNzaW9uIGlzIGdyYW50ZWQgdG8gdXNlLCBjb3B5LCBtb2RpZnksIGFuZCBkaXN0cmlidXRlIHRoaXMgc29mdHdhcmVcbiAqIHVuZGVyIHRoZSBNSVQgTGljZW5zZS4gU2VlIExJQ0VOU0UgZmlsZSBmb3IgZGV0YWlscy5cbiAqL1xuXG5pbXBvcnQgeyBCb29sZWFuVHlwZSB9IGZyb20gXCJAL2NtYWtlL0NvbnN0YW50c1wiO1xuXG5leHBvcnQgZnVuY3Rpb24gY29udmVydFRvVmFsdWUob2JqOiBhbnkpOiBzdHJpbmcge1xuICBpZiAoQXJyYXkuaXNBcnJheShvYmopKVxuICAgIHJldHVybiBvYmoubWFwKGkgPT4gY29udmVydFRvVmFsdWUoaSkpLmpvaW4oXCI7XCIpO1xuXG4gIGlmICh0eXBlb2Ygb2JqID09PSBcImJvb2xlYW5cIilcbiAgICByZXR1cm4gb2JqID8gQm9vbGVhblR5cGUuT04gOiBCb29sZWFuVHlwZS5PRkY7XG5cbiAgcmV0dXJuIG9iai50b1N0cmluZygpO1xufVxuIiwiLypcbiAqIE1JVCBMaWNlbnNlXG4gKlxuICogQ29weXJpZ2h0IChjKSAyMDI1ICBZdXJpaSBZYWt1YmluICh5dXJpaS55YWt1YmluQGdtYWlsLmNvbSlcbiAqXG4gKiBQZXJtaXNzaW9uIGlzIGdyYW50ZWQgdG8gdXNlLCBjb3B5LCBtb2RpZnksIGFuZCBkaXN0cmlidXRlIHRoaXMgc29mdHdhcmVcbiAqIHVuZGVyIHRoZSBNSVQgTGljZW5zZS4gU2VlIExJQ0VOU0UgZmlsZSBmb3IgZGV0YWlscy5cbiAqL1xuXG5pbXBvcnQgb3MgZnJvbSBcIm5vZGU6b3NcIjtcbmltcG9ydCBmcyBmcm9tIFwibm9kZTpmc1wiO1xuaW1wb3J0IHBhdGggZnJvbSBcIm5vZGU6cGF0aFwiO1xuXG5pbXBvcnQgeyBzcGF3bkFzeW5jIH0gZnJvbSBcIkAvdXRpbHMvQ2hpbGRQcm9jZXNzXCI7XG5pbXBvcnQgeyBDTUFLRV9MSVNUU19UWFQsIERFRkFVTFRfR0VORVJBVE9SLCBWYWx1ZVR5cGUgfSBmcm9tIFwiQC9jbWFrZS9Db25zdGFudHNcIjtcbmltcG9ydCB7IGNvbnZlcnRUb1ZhbHVlIH0gZnJvbSBcIkAvY21ha2UvSGVscGVyXCI7XG5pbXBvcnQgeyBIb3N0IH0gZnJvbSBcIkAvdXRpbHMvSG9zdFwiO1xuXG5mdW5jdGlvbiB0b1ZhclR5cGUoa2V5OiBzdHJpbmcsIHZhbDogYW55KSB7XG4gIGNvbnN0IG1hcDogYW55ID0ge1xuICAgIENNQUtFX0lOU1RBTExfUFJFRklYOiBWYWx1ZVR5cGUuUEFUSCxcbiAgICBDTUFLRV9UT09MQ0hBSU5fRklMRTogVmFsdWVUeXBlLkZJTEVQQVRILFxuICB9O1xuXG4gIGlmICh0eXBlb2YgdmFsID09PSBcImJvb2xlYW5cIilcbiAgICByZXR1cm4gVmFsdWVUeXBlLkJPT0w7XG5cbiAgaWYgKG1hcC5oYXNPd25Qcm9wZXJ0eShrZXkpKVxuICAgIHJldHVybiBtYXBba2V5XTtcblxuICByZXR1cm4gVmFsdWVUeXBlLlNUUklORztcbn1cblxuZnVuY3Rpb24gbWFrZUNtZFZhcmlhYmxlKGtleTogc3RyaW5nLCB2YWw6IGFueSwgaXNDYWNoZTogYm9vbGVhbikge1xuICBsZXQgbmFtZSA9IGtleTtcbiAgaWYgKGlzQ2FjaGUpXG4gICAgbmFtZSArPSBcIjpcIiArIHRvVmFyVHlwZShrZXksIHZhbCk7XG4gIHJldHVybiBuYW1lICsgXCI9XCIgKyBjb252ZXJ0VG9WYWx1ZSh2YWwpO1xufVxuXG5mdW5jdGlvbiBtYWtlQ21kVmFyaWFibGVzKHZhcmlhYmxlczogb2JqZWN0LCBpc0NhY2hlOiBib29sZWFuKTogc3RyaW5nW10ge1xuICBjb25zdCByZXN1bHQ6IHN0cmluZ1tdID0gW107XG4gIGZvciAoY29uc3QgW2tleSwgdmFsXSBvZiBPYmplY3QuZW50cmllcyh2YXJpYWJsZXMpKVxuICAgIHJlc3VsdC5wdXNoKFwiLURcIiwgbWFrZUNtZFZhcmlhYmxlKGtleSwgdmFsLCBpc0NhY2hlKSk7XG4gIHJldHVybiByZXN1bHQ7XG59XG5cbmV4cG9ydCBpbnRlcmZhY2UgU2NyaXB0TW9kZU9wdGlvbnMge1xuICBlbnZpcm9ubWVudD86IG9iamVjdDtcbiAgd29ya0Rpcj86IHN0cmluZztcbn07XG5cbmV4cG9ydCBjbGFzcyBDTWFrZVByb2Nlc3Mge1xuICBwcml2YXRlIF9jbWFrZVBhdGg6IHN0cmluZztcblxuICBwdWJsaWMgY29uc3RydWN0b3IoY21ha2VQYXRoOiBzdHJpbmcpIHtcbiAgICB0aGlzLl9jbWFrZVBhdGggPSBjbWFrZVBhdGg7XG4gIH1cblxuICBwdWJsaWMgYXN5bmMgc2NyaXB0TW9kZShzY3JpcHRGaWxlOiBzdHJpbmcsIHZhcmlhYmxlczogb2JqZWN0LCBvcHRpb25zPzogU2NyaXB0TW9kZU9wdGlvbnMpOiBQcm9taXNlPHZvaWQ+IHtcbiAgICBjb25zdCBzcGF3bkFyZ3MgPSBbXG4gICAgICAuLi5tYWtlQ21kVmFyaWFibGVzKHZhcmlhYmxlcywgZmFsc2UpLFxuICAgICAgXCItUFwiLCBzY3JpcHRGaWxlLFxuICAgIF07XG4gICAgY29uc3QgcmVzOiBhbnkgPSBhd2FpdCBzcGF3bkFzeW5jKHRoaXMuX2NtYWtlUGF0aCwgc3Bhd25BcmdzLCB7XG4gICAgICBjd2Q6IG9wdGlvbnM/LndvcmtEaXIsXG4gICAgICBlbnY6IG9wdGlvbnM/LmVudmlyb25tZW50IHx8IHByb2Nlc3MuZW52LFxuICAgIH0pO1xuICAgIGlmIChyZXMuc3RhdHVzICE9PSAwKSB7XG4gICAgICB0aHJvdyBgY21ha2Uuc2NyaXB0TW9kZSByZXR1cm5lZCBzdGF0dXMgJHtyZXMuc3RhdHVzfWA7XG4gICAgfVxuICB9XG5cbiAgcHVibGljIGFzeW5jIGNvbmZpZ3VyZShhcmdzOiBhbnkpOiBQcm9taXNlPHZvaWQ+IHtcbiAgICBjb25zdCBzcGF3bkFyZ3MgPSBbXG4gICAgICBcIi1HXCIsIGFyZ3MuZ2VuZXJhdG9yLFxuICAgICAgLi4ubWFrZUNtZFZhcmlhYmxlcyhhcmdzLmNhY2hlVmFyaWFibGVzLCB0cnVlKSxcbiAgICAgIFwiLVNcIiwgYXJncy5zb3VyY2VEaXIsXG4gICAgICBcIi1CXCIsIGFyZ3MuYmluYXJ5RGlyLFxuICAgIF07XG4gIFxuICAgIGNvbnN0IHJlczogYW55ID0gYXdhaXQgc3Bhd25Bc3luYyh0aGlzLl9jbWFrZVBhdGgsIHNwYXduQXJncywge1xuICAgICAgY3dkOiBhcmdzLmJpbmFyeURpcixcbiAgICAgIGVudjogYXJncy5lbnZpcm9ubWVudCB8fCBwcm9jZXNzLmVudixcbiAgICAgIGV4dHJhOiB7XG4gICAgICAgIG91dHB1dDogYGNtYWtlLmNvbmZpZ3VyZS5sb2dgLFxuICAgICAgfSxcbiAgICB9KTtcbiAgICBpZiAocmVzLnN0YXR1cyAhPT0gMCkge1xuICAgICAgdGhyb3cgYENNYWtlLmNvbmZpZ3VyZSByZXR1cm5lZCBzdGF0dXMgJHtyZXMuc3RhdHVzfWA7XG4gICAgfVxuICB9XG5cbiAgcHVibGljIGFzeW5jIGJ1aWxkKGFyZ3M6IGFueSk6IFByb21pc2U8dm9pZD4ge1xuICAgIGF3YWl0IHRoaXMuY29uZmlndXJlKGFyZ3MpO1xuICBcbiAgICBjb25zdCBzcGF3bkFyZ3M6IHN0cmluZ1tdID0gW1xuICAgICAgJy0tYnVpbGQnLCAnLicsXG4gICAgICAnLS1wYXJhbGxlbCcsIG9zLmF2YWlsYWJsZVBhcmFsbGVsaXNtKCkudG9TdHJpbmcoKSxcbiAgICBdO1xuICAgIGNvbnN0IHJlczogYW55ID0gYXdhaXQgc3Bhd25Bc3luYyh0aGlzLl9jbWFrZVBhdGgsIHNwYXduQXJncywge1xuICAgICAgY3dkOiBhcmdzLmJpbmFyeURpcixcbiAgICAgIGVudjogYXJncy5lbnZpcm9ubWVudCB8fCBwcm9jZXNzLmVudixcbiAgICAgIGV4dHJhOiB7XG4gICAgICAgIG91dHB1dDogYGNtYWtlLmJ1aWxkLmxvZ2AsXG4gICAgICB9LFxuICAgIH0pO1xuICAgIGlmIChyZXMuc3RhdHVzICE9PSAwKSB7XG4gICAgICB0aHJvdyBgQ01ha2UuYnVpbGQgcmV0dXJuZWQgc3RhdHVzICR7cmVzLnN0YXR1c31gO1xuICAgIH1cbiAgfVxuXG4gIHB1YmxpYyBhc3luYyBpbnN0YWxsKGFyZ3M6IGFueSk6IFByb21pc2U8dm9pZD4ge1xuICAgIGF3YWl0IHRoaXMuY29uZmlndXJlKGFyZ3MpO1xuXG4gICAgY29uc3Qgc3Bhd25BcmdzID0gW1xuICAgICAgJy0taW5zdGFsbCcsXG4gICAgICAnLicsXG4gICAgXTtcbiAgICBpZiAoYXJncy5pbnN0YWxsRGlyKSB7XG4gICAgICBzcGF3bkFyZ3MucHVzaCgnLS1wcmVmaXgnLCBhcmdzLmluc3RhbGxEaXIpO1xuICAgIH1cbiAgICBjb25zdCByZXM6IGFueSA9IGF3YWl0IHNwYXduQXN5bmModGhpcy5fY21ha2VQYXRoLCBzcGF3bkFyZ3MsIHtcbiAgICAgIGN3ZDogYXJncy5iaW5hcnlEaXIsXG4gICAgICBlbnY6IGFyZ3MuZW52aXJvbm1lbnQgfHwgcHJvY2Vzcy5lbnYsXG4gICAgICBleHRyYToge1xuICAgICAgICBvdXRwdXQ6IGBjbWFrZS5pbnN0YWxsLmxvZ2AsXG4gICAgICB9LFxuICAgIH0pO1xuICAgIGlmIChyZXMuc3RhdHVzICE9PSAwKSB7XG4gICAgICB0aHJvdyBgQ01ha2UuaW5zdGFsbCByZXR1cm5lZCBzdGF0dXMgJHtyZXMuc3RhdHVzfWA7XG4gICAgfVxuICB9XG4gIFxuICBwdWJsaWMgYXN5bmMgZXh0cmFjdChhcmdzOiBhbnkpOiBQcm9taXNlPHZvaWQ+IHtcbiAgICBjb25zdCBzcGF3bkFyZ3MgPSBbIFwiLUVcIiwgXCJ0YXJcIiwgXCIteHZmXCIsIGFyZ3MuZmlsZW5hbWUgXTtcbiAgICBjb25zdCByZXM6IGFueSA9IGF3YWl0IHNwYXduQXN5bmModGhpcy5fY21ha2VQYXRoLCBzcGF3bkFyZ3MsIHtcbiAgICAgIGN3ZDogYXJncy53b3JrRGlyIHx8IGFyZ3Muc291cmNlRGlyIHx8IGFyZ3MuYmluYXJ5RGlyLFxuICAgICAgZW52OiBhcmdzLmVudmlyb25tZW50IHx8IHByb2Nlc3MuZW52LFxuICAgICAgZXh0cmE6IHtcbiAgICAgICAgb3V0cHV0OiBhcmdzLmxvZ0ZpbGUgfHwgYGNtYWtlLmV4dHJhY3QubG9nYCxcbiAgICAgIH0sXG4gICAgfSk7XG4gICAgaWYgKHJlcy5zdGF0dXMgIT09IDApIHtcbiAgICAgIHRocm93IGBFeHRyYWN0IHJldHVybmVkIHN0YXR1cyAke3Jlcy5zdGF0dXN9YDtcbiAgICB9XG4gIH1cbn07XG5cbmxldCBfY21ha2VJbnN0YW5jZTogQ01ha2VQcm9jZXNzO1xuZXhwb3J0IG5hbWVzcGFjZSBDTWFrZVByb2Nlc3Mge1xuICBleHBvcnQgZnVuY3Rpb24gZ2V0SW5zdGFuY2UoKTogQ01ha2VQcm9jZXNzIHtcbiAgICBpZiAoIV9jbWFrZUluc3RhbmNlKVxuICAgICAgX2NtYWtlSW5zdGFuY2UgPSBuZXcgQ01ha2VQcm9jZXNzKFwiY21ha2VcIiArIEhvc3QuZXhlY3V0YWJsZVN1ZmZpeCk7XG4gICAgcmV0dXJuIF9jbWFrZUluc3RhbmNlO1xuICB9XG59XG5cbmV4cG9ydCBjbGFzcyBDVGVzdFByb2Nlc3Mge1xuICBwcml2YXRlIF9jdGVzdFBhdGg6IHN0cmluZztcblxuICBwdWJsaWMgY29uc3RydWN0b3IoY3Rlc3RQYXRoOiBzdHJpbmcpIHtcbiAgICB0aGlzLl9jdGVzdFBhdGggPSBjdGVzdFBhdGg7XG4gIH1cblxuICBwdWJsaWMgYXN5bmMgY3Rlc3QoYXJnczogYW55KTogUHJvbWlzZTx2b2lkPiB7XG4gICAgY29uc3Qgc3Bhd25BcmdzOiBzdHJpbmdbXSA9IFtdO1xuICAgIGNvbnN0IHJlczogYW55ID0gYXdhaXQgc3Bhd25Bc3luYyh0aGlzLl9jdGVzdFBhdGgsIHNwYXduQXJncywge1xuICAgICAgY3dkOiBhcmdzLmJpbmFyeURpcixcbiAgICAgIGVudjogYXJncy5lbnZpcm9ubWVudCB8fCBwcm9jZXNzLmVudixcbiAgICAgIGV4dHJhOiB7XG4gICAgICAgIG91dHB1dDogYGNtYWtlLmN0ZXN0LmxvZ2AsXG4gICAgICB9LFxuICAgIH0pO1xuICAgIGlmIChyZXMuc3RhdHVzICE9PSAwKSB7XG4gICAgICB0aHJvdyBgQ1Rlc3QgcmV0dXJuZWQgc3RhdHVzICR7cmVzLnN0YXR1c31gO1xuICAgIH1cbiAgfVxufTtcblxubGV0IF9jdGVzdEluc3RhbmNlOiBDVGVzdFByb2Nlc3M7XG5leHBvcnQgbmFtZXNwYWNlIENUZXN0UHJvY2VzcyB7XG4gIGV4cG9ydCBmdW5jdGlvbiBnZXRJbnN0YW5jZSgpOiBDVGVzdFByb2Nlc3Mge1xuICAgIGlmICghX2N0ZXN0SW5zdGFuY2UpXG4gICAgICBfY3Rlc3RJbnN0YW5jZSA9IG5ldyBDVGVzdFByb2Nlc3MoXCJjdGVzdFwiICsgSG9zdC5leGVjdXRhYmxlU3VmZml4KTtcbiAgICByZXR1cm4gX2N0ZXN0SW5zdGFuY2U7XG4gIH1cbn1cblxuZXhwb3J0IGFzeW5jIGZ1bmN0aW9uIGdldFByb2plY3RJbmZvKHNvdXJjZTogc3RyaW5nKSB7XG4gIGNvbnN0IHN0YXQgPSBhd2FpdCBmcy5wcm9taXNlcy5zdGF0KHNvdXJjZSk7XG4gIGlmIChzdGF0LmlzRGlyZWN0b3J5KCkpXG4gICAgc291cmNlID0gcGF0aC5yZXNvbHZlKHNvdXJjZSwgQ01BS0VfTElTVFNfVFhUKTtcbiAgY29uc3QgY29udGVudCA9IGF3YWl0IGZzLnByb21pc2VzLnJlYWRGaWxlKHNvdXJjZSwgeyBlbmNvZGluZzogJ3V0ZjgnIH0pO1xuXG4gIGNvbnN0IHByb2plY3RQYXR0ZXJuID0gL3Byb2plY3QgKlxcKCAqKFteIF0rKSAqKFteKV0qKVxcKS87XG4gIGNvbnN0IHZlcnNpb25QYXR0ZXJuID0gL1ZFUlNJT04gKyhbXiBdKykvO1xuXG4gIGNvbnN0IHJlc3VsdDogYW55ID0ge307XG4gIGxldCBtYXRjaCA9IGNvbnRlbnQubWF0Y2gocHJvamVjdFBhdHRlcm4pO1xuICBpZiAobWF0Y2gpIHtcbiAgICByZXN1bHQubmFtZSA9IG1hdGNoWzFdO1xuICAgIGNvbnN0IHByb2plY3RDb250ZW50ID0gbWF0Y2hbMl07XG4gICAgbWF0Y2ggPSBwcm9qZWN0Q29udGVudC5tYXRjaCh2ZXJzaW9uUGF0dGVybik7XG4gICAgaWYgKG1hdGNoKVxuICAgICAgcmVzdWx0LnZlcnNpb24gPSBtYXRjaFsxXTtcbiAgfVxuXG4gIHJldHVybiByZXN1bHQ7XG59XG5cbmV4cG9ydCBmdW5jdGlvbiBsaW5lVG9TaW5nbENvbW1lbnQobGluZTogc3RyaW5nKSB7XG4gIHJldHVybiBcIiMgXCIgKyBsaW5lO1xufVxuXG5leHBvcnQgZnVuY3Rpb24gbGluZVRvTXVsdGlwbGVDb21tZW50KGxpbmU6IHN0cmluZykge1xuICByZXR1cm4gYCNbPT09WyAke2xpbmV9IF09PT1dYDtcbn1cblxuZXhwb3J0IGZ1bmN0aW9uIGdlbmVyYXRlZFNjcmlwdE5hbWVDb21tZW50KGZpbGVuYW1lOiBzdHJpbmcpIHtcbiAgcmV0dXJuIGxpbmVUb1NpbmdsQ29tbWVudChcIkdlbmVyYXRlZCBmcm9tIFwiICsgcGF0aC5iYXNlbmFtZShmaWxlbmFtZSkpO1xufVxuXG5leHBvcnQgeyBERUZBVUxUX0dFTkVSQVRPUiB9O1xuIiwiLypcbiAqIE1JVCBMaWNlbnNlXG4gKlxuICogQ29weXJpZ2h0IChjKSAyMDI1ICBZdXJpaSBZYWt1YmluICh5dXJpaS55YWt1YmluQGdtYWlsLmNvbSlcbiAqXG4gKiBQZXJtaXNzaW9uIGlzIGdyYW50ZWQgdG8gdXNlLCBjb3B5LCBtb2RpZnksIGFuZCBkaXN0cmlidXRlIHRoaXMgc29mdHdhcmVcbiAqIHVuZGVyIHRoZSBNSVQgTGljZW5zZS4gU2VlIExJQ0VOU0UgZmlsZSBmb3IgZGV0YWlscy5cbiAqL1xuXG5pbXBvcnQgZnMgZnJvbSBcIm5vZGU6ZnNcIjtcbmltcG9ydCB1cmwgZnJvbSBcIm5vZGU6dXJsXCI7XG5cbmltcG9ydCB7IENNYWtlUHJvY2VzcyB9IGZyb20gXCJAL2NtYWtlXCI7XG5pbXBvcnQgeyBQYXRoIH0gZnJvbSBcIkAvdXRpbHMvUGF0aFwiO1xuaW1wb3J0IHsgbWFrZVBhdGNoIH0gZnJvbSBcIkAvdXRpbHMvTWFrZVBhdGNoXCI7XG5pbXBvcnQgeyBzYXZlSWZEaWZmZXJlbnQsIGRpcmVjdG9yeUV4aXN0cyB9IGZyb20gXCJAL3V0aWxzL0ZpbGVTeXN0ZW1cIjtcbmltcG9ydCB7IFNldHRpbmdzU3RvcmFnZSB9IGZyb20gXCJAL3V0aWxzL1NldHRpbmdzU3RvcmFnZVwiO1xuaW1wb3J0IHsgYXJyYXlXcmFwcGVyLCBhc3NpZ25PYmplY3QgfSBmcm9tIFwiQC91dGlscy9QcmltaXRpdmVzXCI7XG5pbXBvcnQgeyBVU0VSX0NPTkZJRywgQlVJTERfU0VUVElOR1NfRklMRSwgUkVRVUVTVF9BVFRFTVBUUyB9IGZyb20gXCJAL0NvbnN0YW50c1wiO1xuaW1wb3J0IHsgREVCVUdfQlVJTERfVFlQRSwgUkVMRUFTRV9CVUlMRF9UWVBFIH0gZnJvbSBcIkAvY29yZS9UeXBlc1wiO1xuaW1wb3J0IHsgSU1QT1JUX1NDSEVNRSB9IGZyb20gXCJAL3V0aWxzL1VybFNjaGVtZVwiO1xuaW1wb3J0IHsgcmVxdWlyZVJlc29sdmUgfSBmcm9tIFwiQC91dGlscy9Nb2R1bGVcIjtcbmltcG9ydCB7IGRvd25sb2FkRmlsZSB9IGZyb20gXCJAL3V0aWxzL0h0dHBSZXF1ZXN0XCI7XG5pbXBvcnQgeyBDb21tYW5kT3B0aW9ucyB9IGZyb20gXCJAL2NvcmUvQ29tbWFuZE9wdGlvbnNcIjtcbmltcG9ydCB7IExvZ2dlciB9IGZyb20gXCJAL2xvZ2dlclwiO1xuaW1wb3J0IHsgZmlsZUV4aXN0cyB9IGZyb20gXCJAL3V0aWxzL0ZpbGVTeXN0ZW1cIjtcbmltcG9ydCB7IGltcG9ydE1vZHVsZSB9IGZyb20gXCJAL3V0aWxzL01vZHVsZVwiO1xuXG5pbXBvcnQgYWN0aW9ucyBmcm9tIFwiQC9hY3Rpb25zXCI7XG5cbmNvbnN0IGxvZ2dlciA9IExvZ2dlci5jcmVhdGUoaW1wb3J0Lm1ldGEudXJsKTtcblxuaW50ZXJmYWNlIElHZW5lcmFsQ29uZmlnIHtcbiAgd29ya0Rpcjogc3RyaW5nO1xuICBidWlsZFR5cGU6IHN0cmluZztcbn07XG5cbmZ1bmN0aW9uIG1lcmdlRW52aXJvbm1lbnQoLi4uYXJnczogYW55KSB7XG4gIGNvbnN0IGVudmlyb25tZW50OiBhbnkgPSB7fTtcbiAgZm9yIChjb25zdCBlbnYgb2YgYXJncykge1xuICAgIGNvbnN0IGxpc3Q6IGFueSA9IE9iamVjdC5lbnRyaWVzKGVudiB8fCB7fSk7XG4gICAgd2hpbGUgKGxpc3QubGVuZ3RoKSB7XG4gICAgICBsZXQgW2tleSx2YWxdID0gbGlzdC5wb3AoKTtcbiAgICAgIGxldCBkZWxpbWl0ZXI7XG4gICAgICBsZXQgam9pbkFmdGVyID0gdHJ1ZTtcbiAgICAgIHN3aXRjaCAoa2V5KSB7XG4gICAgICBjYXNlIFwiUGF0aFwiOlxuICAgICAgY2FzZSBcIlBBVEhcIjpcbiAgICAgICAgZGVsaW1pdGVyID0gUGF0aC5kZWxpbWl0ZXI7XG4gICAgICAgIGpvaW5BZnRlciA9IGZhbHNlO1xuICAgICAgICBicmVhaztcbiAgICAgIGNhc2UgXCJDRkxBR1NcIjpcbiAgICAgIGNhc2UgXCJDWFhGTEFHU1wiOlxuICAgICAgY2FzZSBcIkxERkxBR1NcIjpcbiAgICAgICAgZGVsaW1pdGVyID0gXCIgXCI7XG4gICAgICAgIGJyZWFrO1xuICAgICAgfVxuICAgICAgaWYgKHR5cGVvZiB2YWwgPT09ICdudW1iZXInKVxuICAgICAgICB2YWwgPSB2YWwudG9TdHJpbmcoKTtcbiAgICAgIGVsc2UgaWYgKEFycmF5LmlzQXJyYXkodmFsKSlcbiAgICAgICAgdmFsID0gdmFsLmpvaW4oZGVsaW1pdGVyKTtcbiAgICAgIGlmICghZGVsaW1pdGVyIHx8ICFlbnZpcm9ubWVudFtrZXldKVxuICAgICAgICBlbnZpcm9ubWVudFtrZXldID0gdmFsO1xuICAgICAgZWxzZSBpZiAoam9pbkFmdGVyKVxuICAgICAgICBlbnZpcm9ubWVudFtrZXldID0gdmFsICsgZGVsaW1pdGVyICsgZW52aXJvbm1lbnRba2V5XTtcbiAgICAgIGVsc2VcbiAgICAgICAgZW52aXJvbm1lbnRba2V5XSA9IGVudmlyb25tZW50W2tleV0gKyBkZWxpbWl0ZXIgKyB2YWw7XG4gICAgfVxuICB9XG4gIHJldHVybiBlbnZpcm9ubWVudDtcbn1cblxuZnVuY3Rpb24gcmViYXNlQ29uZmlnKGNvbmZpZzogYW55KSB7XG4gIGNvbnN0IGJhc2VDb25maWc6IGFueSA9IHt9O1xuICBjb25zdCBvdGhlckNvbmZpZzogYW55ID0ge307XG5cbiAgZm9yIChjb25zdCBba2V5LCBlbnRyeV0gb2YgT2JqZWN0LmVudHJpZXMoY29uZmlnKSBhcyBhbnkpIHtcbiAgICAoZW50cnkuYmFzZSA/IG90aGVyQ29uZmlnIDogYmFzZUNvbmZpZylba2V5XSA9IGVudHJ5O1xuICB9XG5cbiAgd2hpbGUgKHRydWUpIHtcbiAgICBjb25zdCBrZXlzID0gT2JqZWN0LmtleXMob3RoZXJDb25maWcpO1xuICAgIGlmIChrZXlzLmxlbmd0aCA9PSAwKVxuICAgICAgYnJlYWs7XG4gICAgY29uc3QgZG9uZUtleXMgPSBbXTtcbiAgICBmb3IgKGNvbnN0IGtleSBvZiBrZXlzKSB7XG4gICAgICBjb25zdCBvdGhlckl0ZXIgPSBvdGhlckNvbmZpZ1trZXldO1xuICAgICAgY29uc3QgYmFzZUxpc3QgPSBbXTtcbiAgICAgIGZvciAoY29uc3QgaXRlciBvZiBhcnJheVdyYXBwZXIob3RoZXJJdGVyLmJhc2UpKSB7XG4gICAgICAgIGNvbnN0IGJhc2VFbnRyeSA9IGJhc2VDb25maWdbaXRlcl07XG4gICAgICAgIGlmICghYmFzZUVudHJ5KSB7XG4gICAgICAgICAgYmFzZUxpc3QubGVuZ3RoID0gMDtcbiAgICAgICAgICBicmVhaztcbiAgICAgICAgfVxuICAgICAgICBiYXNlTGlzdC5wdXNoKGJhc2VFbnRyeSk7XG4gICAgICB9XG4gICAgICBpZiAoYmFzZUxpc3QubGVuZ3RoKSB7XG4gICAgICAgIGJhc2VMaXN0LnB1c2gob3RoZXJJdGVyKTtcbiAgICAgICAgbGV0IG5ld0VudHJ5ID0ge307XG4gICAgICAgIGZvciAoY29uc3QgaXRlciBvZiBiYXNlTGlzdCkge1xuICAgICAgICAgIGFzc2lnbk9iamVjdChuZXdFbnRyeSwgaXRlcik7XG4gICAgICAgIH1cbiAgICAgICAgYmFzZUNvbmZpZ1trZXldID0gbmV3RW50cnk7XG4gICAgICAgIGRvbmVLZXlzLnB1c2goa2V5KTtcbiAgICAgIH1cbiAgICB9XG4gICAgaWYgKGRvbmVLZXlzLmxlbmd0aCA9PSAwKSB7XG4gICAgICBmb3IgKGNvbnN0IGtleSBvZiBrZXlzKVxuICAgICAgICB0aHJvdyBgQ2FuJ3Qgc2V0IGJhc2UgY29uZmlnIGZvciBcIiR7a2V5fWA7XG4gICAgfVxuICAgIGZvciAoY29uc3Qga2V5IG9mIGRvbmVLZXlzKSB7XG4gICAgICBkZWxldGUgYmFzZUNvbmZpZ1trZXldLmJhc2U7XG4gICAgICBkZWxldGUgb3RoZXJDb25maWdba2V5XTtcbiAgICB9XG4gIH1cblxuICByZXR1cm4gYmFzZUNvbmZpZztcbn1cblxuZnVuY3Rpb24gcmVzb2x2ZVN0cmluZ1dpdGhWYXJpYWJsZShjb25maWc6IGFueSwgZW50cnlDb25maWc6IGFueSwgcm9vdENvbmZpZzogYW55LCB2YWw6IGFueSkge1xuICByZXR1cm4gdmFsLnJlcGxhY2UoL1xcJFxceyhbXn1dKylcXH0vZywgKG1hdGNoOiBhbnksIHZhbHVlOiBhbnkpID0+IHtcbiAgICBsZXQgc2VsO1xuICAgIGZvciAoY29uc3QgbmFtZSBvZiB2YWx1ZS5zcGxpdChcIi5cIikpIHtcbiAgICAgIGlmIChzZWwgPT09IHVuZGVmaW5lZCkge1xuICAgICAgICBpZiAoY29uZmlnLmhhc093blByb3BlcnR5KG5hbWUpKVxuICAgICAgICAgIHNlbCA9IGNvbmZpZ1tuYW1lXTtcbiAgICAgICAgZWxzZSBpZiAoY29uZmlnICE9PSBlbnRyeUNvbmZpZyAmJiBlbnRyeUNvbmZpZy5oYXNPd25Qcm9wZXJ0eShuYW1lKSlcbiAgICAgICAgICBzZWwgPSBlbnRyeUNvbmZpZ1tuYW1lXTtcbiAgICAgICAgZWxzZSBpZiAoY29uZmlnICE9PSByb290Q29uZmlnICYmIHJvb3RDb25maWcuaGFzT3duUHJvcGVydHkobmFtZSkpXG4gICAgICAgICAgc2VsID0gcm9vdENvbmZpZ1tuYW1lXTtcbiAgICAgICAgZWxzZSB7XG4gICAgICAgICAgdHJ5IHtcbiAgICAgICAgICAgIGNvbnN0IG1haW5GaWxlID0gcmVxdWlyZVJlc29sdmUobmFtZSk7XG4gICAgICAgICAgICBpZiAobWFpbkZpbGUpIHtcbiAgICAgICAgICAgICAgc2VsID0geyBtYWluRmlsZSwgbWFpbkRpcjogUGF0aC5kaXJuYW1lKG1haW5GaWxlKSwgfTtcbiAgICAgICAgICAgIH1cbiAgICAgICAgIH0gY2F0Y2goZSkge31cbiAgICAgICAgfVxuICAgICAgICBpZiAoc2VsID09PSB1bmRlZmluZWQpXG4gICAgICAgICAgYnJlYWs7XG4gICAgICB9XG4gICAgICBlbHNlIGlmIChzZWwuaGFzT3duUHJvcGVydHkobmFtZSkpIHtcbiAgICAgICAgc2VsID0gc2VsW25hbWVdO1xuICAgICAgfVxuICAgICAgZWxzZSB7XG4gICAgICAgIHNlbCA9IHVuZGVmaW5lZDtcbiAgICAgICAgYnJlYWs7XG4gICAgICB9XG4gICAgfVxuICAgIGlmIChzZWwgPT09IHVuZGVmaW5lZClcbiAgICAgIHRocm93IG5ldyBFcnJvcihgVGhlICR7dmFsdWV9IHZhcmlhYmxlIGRvZXMgbm90IGV4aXN0XCJgKTtcbiAgICByZXR1cm4gc2VsO1xuICB9KTtcbn1cblxuZnVuY3Rpb24gcmVzb2x2ZUNvbmZpZ1N0cmluZ3NJbXBsKGNvbmZpZzogYW55LCBlbnRyeUNvbmZpZzogYW55LCByb290Q29uZmlnOiBhbnkpIHtcbiAgbGV0IGNvdW50ID0gMDtcbiAgZm9yIChjb25zdCBba2V5LCB2YWxdIG9mIE9iamVjdC5lbnRyaWVzKGNvbmZpZykpIHtcbiAgICBpZiAodmFsICYmIHR5cGVvZiB2YWwgPT09IFwib2JqZWN0XCIpXG4gICAgICBjb3VudCArPSByZXNvbHZlQ29uZmlnU3RyaW5nc0ltcGwodmFsLCBlbnRyeUNvbmZpZywgcm9vdENvbmZpZyk7XG4gICAgZWxzZSBpZiAodHlwZW9mIHZhbCA9PT0gXCJzdHJpbmdcIikge1xuICAgICAgY29uc3QgdiA9IHJlc29sdmVTdHJpbmdXaXRoVmFyaWFibGUoY29uZmlnLCBlbnRyeUNvbmZpZywgcm9vdENvbmZpZywgdmFsKTtcbiAgICAgIGlmICh2YWwgIT09IHYpIHtcbiAgICAgICAgY29uZmlnW2tleV0gPSB2O1xuICAgICAgICBjb3VudCsrO1xuICAgICAgfVxuICAgIH1cbiAgfVxuICByZXR1cm4gY291bnQ7XG59XG5cbmZ1bmN0aW9uIHJlc29sdmVDb25maWdTdHJpbmdzKGNvbmZpZzogYW55KSB7XG4gIGZvciAoOzspIHtcbiAgICBsZXQgY291bnQgPSAwO1xuICAgIGZvciAoY29uc3QgW2tleSwgdmFsXSBvZiBPYmplY3QuZW50cmllcyhjb25maWcpKSB7XG4gICAgICBpZiAodmFsICYmIHR5cGVvZiB2YWwgPT09IFwib2JqZWN0XCIpXG4gICAgICAgIGNvdW50ICs9IHJlc29sdmVDb25maWdTdHJpbmdzSW1wbCh2YWwsIHZhbCwgY29uZmlnKTtcbiAgICAgIGVsc2UgIGlmICh0eXBlb2YgdmFsID09PSBcInN0cmluZ1wiKSB7XG4gICAgICAgIGNvbnN0IHYgPSByZXNvbHZlU3RyaW5nV2l0aFZhcmlhYmxlKGNvbmZpZywgY29uZmlnLCBjb25maWcsIHZhbCk7XG4gICAgICAgIGlmICh2YWwgIT09IHYpIHtcbiAgICAgICAgICBjb25maWdba2V5XSA9IHY7XG4gICAgICAgICAgY291bnQrKztcbiAgICAgICAgfVxuICAgICAgfVxuICAgIH1cbiAgICBpZiAoIWNvdW50KVxuICAgICAgYnJlYWs7XG4gIH1cbn1cblxuZnVuY3Rpb24gbWFrZUJ1aWxkQ29uZmlnKGdjb25maWc6IElHZW5lcmFsQ29uZmlnLCBjb25maWc6IGFueSkge1xuICBpZiAoY29uZmlnW1wic291cmNlUm9vdFwiXSkge1xuICAgIHRocm93IG5ldyBFcnJvcihgVmFyaWFibGUgXCJzb3VyY2VSb290XCIgY2Fubm90IGJlIGNoYW5nZWQgdG8gXCIke2NvbmZpZy5zb3VyY2VSb290fVwiYCk7XG4gIH1cblxuICBjb25zdCByb290Q29uZmlnID0gcmViYXNlQ29uZmlnKGNvbmZpZyk7XG5cbiAgcm9vdENvbmZpZy5idWlsZFR5cGUgPSByb290Q29uZmlnLmJ1aWxkVHlwZSB8fCBnY29uZmlnLmJ1aWxkVHlwZTtcbiAgcm9vdENvbmZpZy5zb3VyY2VSb290ID0gcm9vdENvbmZpZy5zb3VyY2VSb290IHx8IGdjb25maWcud29ya0RpcjtcbiAgcm9vdENvbmZpZy5iaW5hcnlSb290ID0gcm9vdENvbmZpZy5iaW5hcnlSb290IHx8IFBhdGguam9pbihnY29uZmlnLndvcmtEaXIsIFwiYnVpbGRcIik7XG5cbiAgZm9yIChjb25zdCBba2V5LCBlbnRyeV0gb2YgT2JqZWN0LmVudHJpZXMocm9vdENvbmZpZykgYXMgYW55KSB7XG4gICAgaWYgKGVudHJ5ICYmIHR5cGVvZiBlbnRyeSA9PT0gXCJvYmplY3RcIiAmJiBlbnRyeS5hY3Rpb24pIHtcbiAgICAgIGVudHJ5LmJ1aWxkVHlwZSA9IGVudHJ5LmJ1aWxkVHlwZSB8fCByb290Q29uZmlnLmJ1aWxkVHlwZTtcbiAgICAgIGNvbnN0IGZvbGRlciA9IGtleS5yZXBsYWNlKFwiOlwiLCBQYXRoLnNlcCk7XG4gICAgICBjb25zdCB3b3JrRGlyID0gUGF0aC5qb2luKHJvb3RDb25maWcuYmluYXJ5Um9vdCwgZm9sZGVyKTtcbiAgICAgIGVudHJ5LnRlbXBEaXIgPSBlbnRyeS50ZW1wRGlyIHx8IFBhdGguam9pbih3b3JrRGlyLCBcInRtcFwiKTtcbiAgICAgIGlmIChlbnRyeS5zb3VyY2VVcmwpIHtcbiAgICAgICAgaWYgKGVudHJ5LnNvdXJjZVVybC5zdGFydHNXaXRoKElNUE9SVF9TQ0hFTUUpKSB7XG4gICAgICAgICAgY29uc3QgZmlsZW5hbWUgPSByZXF1aXJlUmVzb2x2ZShlbnRyeS5zb3VyY2VVcmwuc2xpY2UoSU1QT1JUX1NDSEVNRS5sZW5ndGgpKTtcbiAgICAgICAgICBlbnRyeS5zb3VyY2VEaXIgPSBQYXRoLmRpcm5hbWUoZmlsZW5hbWUpO1xuICAgICAgICB9XG4gICAgICAgIGVsc2Uge1xuICAgICAgICAgIGVudHJ5LmFyY2hpdmVEaXIgPSBlbnRyeS5hcmNoaXZlRGlyIHx8IFBhdGguam9pbih3b3JrRGlyLCBcImFyY1wiKTtcbiAgICAgICAgICBlbnRyeS5leHRyYWN0RGlyID0gZW50cnkuZXh0cmFjdERpciB8fCBQYXRoLmpvaW4od29ya0RpciwgXCJzcmNcIik7XG4gICAgICAgICAgaWYgKCFlbnRyeS5zb3VyY2VEaXIpXG4gICAgICAgICAgICBlbnRyeS5zb3VyY2VEaXIgPSBlbnRyeS5leHRyYWN0RGlyO1xuICAgICAgICAgIGVsc2UgaWYgKCFQYXRoLmlzQWJzb2x1dGUoZW50cnkuc291cmNlRGlyKSlcbiAgICAgICAgICAgIGVudHJ5LnNvdXJjZURpciA9IFBhdGguam9pbihlbnRyeS5leHRyYWN0RGlyLCBlbnRyeS5zb3VyY2VEaXIpO1xuICAgICAgICB9XG4gICAgICB9XG4gICAgICBlbHNlIGlmICghZW50cnkuc291cmNlRGlyKSB7XG4gICAgICAgIHRocm93IG5ldyBFcnJvcihgTWlzc2luZyBzb3VyY2VEaXIgZm9yICR7a2V5fSBhY3Rpb25cImApO1xuICAgICAgfVxuICAgICAgaWYgKGVudHJ5LmJpbmFyeURpciA9PT0gbnVsbClcbiAgICAgICAgZW50cnkuYmluYXJ5RGlyID0gZW50cnkuc291cmNlRGlyO1xuICAgICAgZWxzZSBpZiAoZW50cnkuYmluYXJ5RGlyID09PSB1bmRlZmluZWQpXG4gICAgICAgIGVudHJ5LmJpbmFyeURpciA9IFBhdGguam9pbih3b3JrRGlyLCBcImJpblwiKTtcbiAgICB9XG4gIH1cblxuICByZXNvbHZlQ29uZmlnU3RyaW5ncyhyb290Q29uZmlnKTtcblxuICByZXR1cm4gcm9vdENvbmZpZztcbn1cblxuYXN5bmMgZnVuY3Rpb24gZG9FeHRyYWN0QXJjaGl2ZShnY29uZmlnOiBJR2VuZXJhbENvbmZpZywgZW52aXJvbm1lbnQ6IGFueSwgY29uZmlnOiBhbnksIHNldHRpbmdzOiBhbnkpIHtcbiAgaWYgKCFjb25maWcuc291cmNlVXJsKVxuICAgIHRocm93IG5ldyBFcnJvcihcIlVua25vd24gc291cmNlVXJsXCIpO1xuICBpZiAoIWNvbmZpZy5hcmNoaXZlRGlyKVxuICAgIHRocm93IG5ldyBFcnJvcihcIlVua25vd24gYXJjaGl2ZURpclwiKTtcbiAgaWYgKCFjb25maWcuZXh0cmFjdERpcilcbiAgICB0aHJvdyBuZXcgRXJyb3IoXCJVbmtub3duIGV4dHJhY3REaXJcIik7XG5cbiAgaWYgKCFhd2FpdCBkaXJlY3RvcnlFeGlzdHMoY29uZmlnLmFyY2hpdmVEaXIpKSB7XG4gICAgbG9nZ2VyLm5vdGljZShgbWtkaXIgLXAgJHtjb25maWcuYXJjaGl2ZURpcn1gKTtcbiAgICBhd2FpdCBmcy5wcm9taXNlcy5ta2Rpcihjb25maWcuYXJjaGl2ZURpciwgeyByZWN1cnNpdmU6IHRydWUgfSk7XG4gIH1cblxuICBpZiAoIWF3YWl0IGRpcmVjdG9yeUV4aXN0cyhjb25maWcudGVtcERpcikpIHtcbiAgICBsb2dnZXIubm90aWNlKGBta2RpciAtcCAke2NvbmZpZy50ZW1wRGlyfWApO1xuICAgIGF3YWl0IGZzLnByb21pc2VzLm1rZGlyKGNvbmZpZy50ZW1wRGlyLCB7IHJlY3Vyc2l2ZTogdHJ1ZSB9KTtcbiAgfVxuXG4gIGNvbnN0IGFyY05hbWUgPSBQYXRoLmJhc2VuYW1lKGNvbmZpZy5zb3VyY2VVcmwpO1xuXG4gIGxldCBhcmNGaWxlO1xuICBsZXQgZG93bmxvYWRVcmxzID0gYXdhaXQgc2V0dGluZ3MuZ2V0KFwiZG93bmxvYWRVcmxzXCIpIHx8IHt9O1xuICBpZiAoZG93bmxvYWRVcmxzW2NvbmZpZy5zb3VyY2VVcmxdKVxuICAgIGFyY0ZpbGUgPSBkb3dubG9hZFVybHNbY29uZmlnLnNvdXJjZVVybF07XG4gIGVsc2Uge1xuICAgIGFyY0ZpbGUgPSBQYXRoLmpvaW4oY29uZmlnLmFyY2hpdmVEaXIsIGFyY05hbWUpO1xuICAgIGF3YWl0IGRvd25sb2FkRmlsZShjb25maWcuc291cmNlVXJsLCBhcmNGaWxlLCB7IGF0dGVtcHRzOiBSRVFVRVNUX0FUVEVNUFRTIH0pO1xuICAgIGRvd25sb2FkVXJsc1tjb25maWcuc291cmNlVXJsXSA9IGFyY0ZpbGU7XG4gICAgYXdhaXQgc2V0dGluZ3Muc2V0KFwiZG93bmxvYWRVcmxzXCIsIGRvd25sb2FkVXJscyk7XG4gIH1cblxuICBsZXQgZXh0cmFjdERpcjtcbiAgbGV0IGV4dHJhY3RGaWxlcyA9IGF3YWl0IHNldHRpbmdzLmdldChcImV4dHJhY3RGaWxlc1wiKSB8fCB7fTtcbiAgaWYgKGV4dHJhY3RGaWxlc1thcmNGaWxlXSkge1xuICAgIGV4dHJhY3REaXIgPSBleHRyYWN0RmlsZXNbYXJjRmlsZV07XG4gIH1cbiAgZWxzZSB7XG4gICAgZXh0cmFjdERpciA9IGF3YWl0IGZzLnByb21pc2VzLm1rZHRlbXAoUGF0aC5yZXNvbHZlKGNvbmZpZy50ZW1wRGlyLCBhcmNOYW1lICsgJy4nKSk7XG4gIFxuICAgIGF3YWl0IENNYWtlUHJvY2Vzcy5nZXRJbnN0YW5jZSgpLmV4dHJhY3Qoe1xuICAgICAgZW52aXJvbm1lbnQsXG4gICAgICBmaWxlbmFtZTogYXJjRmlsZSxcbiAgICAgIHdvcmtEaXI6IGV4dHJhY3REaXIsXG4gICAgICBsb2dGaWxlOiAgUGF0aC5qb2luKGNvbmZpZy50ZW1wRGlyLCBQYXRoLmJhc2VuYW1lKGV4dHJhY3REaXIpICsgXCIubG9nXCIpLFxuICAgIH0pO1xuICBcbiAgICBjb25zdCBleHRyYWN0TGlzdCA9IGF3YWl0IGZzLnByb21pc2VzLnJlYWRkaXIoZXh0cmFjdERpcik7XG4gICAgaWYgKGV4dHJhY3RMaXN0Lmxlbmd0aCA9PT0gMSkge1xuICAgICAgZXh0cmFjdERpciA9IFBhdGgucmVzb2x2ZShleHRyYWN0RGlyLCBleHRyYWN0TGlzdFswXSk7XG4gICAgICBpZiAoIWF3YWl0IGRpcmVjdG9yeUV4aXN0cyhleHRyYWN0RGlyKSkge1xuICAgICAgICBsb2dnZXIubm90aWNlKGBybSAtZnIgJHtleHRyYWN0RGlyfWApO1xuICAgICAgICBhd2FpdCBmcy5wcm9taXNlcy5ybShleHRyYWN0RGlyLCB7IHJlY3Vyc2l2ZTogdHJ1ZSB9KTtcbiAgICAgICAgdGhyb3cgbmV3IEVycm9yKGBTdXBwb3J0IG9ubHkgZGlyZWN0b3J5IGZvciBhcmNoaXZlYCk7XG4gICAgICB9XG4gICAgfVxuICBcbiAgICBpZiAoYXdhaXQgZGlyZWN0b3J5RXhpc3RzKGNvbmZpZy5leHRyYWN0RGlyKSkge1xuICAgICAgLy8gVE9ETzogTWFyZ2UgZXh0cmFjdERpciB3aXRoIG91dHB1dFxuICAgICAgbG9nZ2VyLm5vdGljZShgcm0gLWZyICR7Y29uZmlnLmV4dHJhY3REaXJ9YCk7XG4gICAgICBhd2FpdCBmcy5wcm9taXNlcy5ybShjb25maWcuZXh0cmFjdERpciwgeyByZWN1cnNpdmU6IHRydWUgfSk7XG4gICAgfVxuICAgIGVsc2Uge1xuICAgICAgY29uc3QgcGFyZW50RGlyID0gUGF0aC5kaXJuYW1lKGNvbmZpZy5leHRyYWN0RGlyKTtcbiAgICAgIGlmICghYXdhaXQgZGlyZWN0b3J5RXhpc3RzKHBhcmVudERpcikpIHtcbiAgICAgICAgbG9nZ2VyLm5vdGljZShgbWtkaXIgLXAgJHtwYXJlbnREaXJ9YCk7XG4gICAgICAgIGF3YWl0IGZzLnByb21pc2VzLm1rZGlyKHBhcmVudERpciwgeyByZWN1cnNpdmU6IHRydWUgfSk7IFxuICAgICAgfVxuICAgIH1cbiAgXG4gICAgbG9nZ2VyLm5vdGljZShgbXYgJHtleHRyYWN0RGlyfSAke2NvbmZpZy5leHRyYWN0RGlyfWApO1xuICAgIGF3YWl0IGZzLnByb21pc2VzLnJlbmFtZShleHRyYWN0RGlyLCBjb25maWcuZXh0cmFjdERpcik7XG4gIFxuICAgIGV4dHJhY3RGaWxlc1thcmNGaWxlXSA9IGV4dHJhY3REaXI7XG4gICAgYXdhaXQgc2V0dGluZ3Muc2V0KFwiZXh0cmFjdEZpbGVzXCIsIGV4dHJhY3RGaWxlcyk7XG4gIH1cblxuICBpZiAoY29uZmlnLnBhdGNoRGlyKSB7XG4gICAgbGV0IHBhdGNoRGlycyA9IGF3YWl0IHNldHRpbmdzLmdldChcInBhdGNoRGlyc1wiKSB8fCB7fTtcbiAgICBpZiAoIXBhdGNoRGlyc1tjb25maWcucGF0Y2hEaXJdKSB7XG4gICAgICBhd2FpdCBtYWtlUGF0Y2goY29uZmlnLnBhdGNoRGlyLCBjb25maWcuZXh0cmFjdERpcik7XG4gICAgICBwYXRjaERpcnNbY29uZmlnLnBhdGNoRGlyXSA9IGNvbmZpZy5leHRyYWN0RGlyO1xuICAgICAgYXdhaXQgc2V0dGluZ3Muc2V0KFwicGF0Y2hEaXJzXCIsIHBhdGNoRGlycyk7XG4gICAgfVxuICB9XG59XG5cbmFzeW5jIGZ1bmN0aW9uIGRvVGFyZ2V0QnVpbGQoZ2NvbmZpZzogSUdlbmVyYWxDb25maWcsIGVudmlyb25tZW50OiBhbnksIGNvbmZpZzogYW55LCBzZXR0aW5nczogU2V0dGluZ3NTdG9yYWdlKSB7XG4gIGlmIChjb25maWcucHJlQWN0aW9uKSB7XG4gICAgYXdhaXQgc2V0dGluZ3MucHVzaChcInByZUFjdGlvblwiKTtcbiAgICBjb25zdCBuZXdDb25maWc6IGFueSA9IHt9O1xuICAgIGFzc2lnbk9iamVjdChuZXdDb25maWcsIGNvbmZpZyk7XG4gICAgZGVsZXRlIG5ld0NvbmZpZy5hY3Rpb247XG4gICAgZGVsZXRlIG5ld0NvbmZpZy5wcmVBY3Rpb247XG4gICAgZGVsZXRlIG5ld0NvbmZpZy5wb3N0QWN0aW9uO1xuICAgIGFzc2lnbk9iamVjdChuZXdDb25maWcsIGNvbmZpZy5wcmVBY3Rpb24pO1xuICAgIGNvbnN0IG5ld0Vudmlyb25tZW50ID0gbWVyZ2VFbnZpcm9ubWVudChjb25maWcucHJlQWN0aW9uLmVudmlyb25tZW50LCBlbnZpcm9ubWVudCk7XG4gICAgYXdhaXQgZG9UYXJnZXRCdWlsZChnY29uZmlnLCBuZXdFbnZpcm9ubWVudCwgbmV3Q29uZmlnLCBzZXR0aW5ncyk7XG4gICAgYXdhaXQgc2V0dGluZ3MucG9wKCk7XG4gIH1cblxuICBpZiAoQXJyYXkuaXNBcnJheShjb25maWcuYWN0aW9uKSkge1xuICAgIGF3YWl0IHNldHRpbmdzLnB1c2goXCJhY3Rpb25cIik7XG4gICAgZm9yICh2YXIgaSA9IDA7IGkgPCBjb25maWcuYWN0aW9uLmxlbmd0aDsgKytpKSB7XG4gICAgICBhd2FpdCBzZXR0aW5ncy5wdXNoKGkudG9TdHJpbmcoKSk7XG4gICAgICBjb25zdCBuZXdDb25maWc6IGFueSA9IHt9O1xuICAgICAgYXNzaWduT2JqZWN0KG5ld0NvbmZpZywgY29uZmlnKTtcbiAgICAgIGRlbGV0ZSBuZXdDb25maWcuYWN0aW9uO1xuICAgICAgZGVsZXRlIG5ld0NvbmZpZy5wcmVBY3Rpb247XG4gICAgICBkZWxldGUgbmV3Q29uZmlnLnBvc3RBY3Rpb247XG4gICAgICBhc3NpZ25PYmplY3QobmV3Q29uZmlnLCBjb25maWcuYWN0aW9uW2ldKTtcbiAgICAgIGNvbnN0IG5ld0Vudmlyb25tZW50ID0gbWVyZ2VFbnZpcm9ubWVudChjb25maWcuYWN0aW9uW2ldLmVudmlyb25tZW50LCBlbnZpcm9ubWVudCk7XG4gICAgICBhd2FpdCBkb1RhcmdldEJ1aWxkKGdjb25maWcsIG5ld0Vudmlyb25tZW50LCBuZXdDb25maWcsIHNldHRpbmdzKTtcbiAgICAgIGF3YWl0IHNldHRpbmdzLnBvcCgpO1xuICAgIH1cbiAgICBhd2FpdCBzZXR0aW5ncy5wb3AoKTtcbiAgfVxuICBlbHNlIHtcbiAgICBpZiAoIWF3YWl0IGRpcmVjdG9yeUV4aXN0cyhjb25maWcuYmluYXJ5RGlyKSkge1xuICAgICAgYXdhaXQgZnMucHJvbWlzZXMubWtkaXIoY29uZmlnLmJpbmFyeURpciwgeyByZWN1cnNpdmU6IHRydWUgfSk7XG4gICAgfVxuICAgIGlmIChhY3Rpb25zW2NvbmZpZy5hY3Rpb25dKSB7XG4gICAgICBjb25maWcuZGVzY3JpcHRpb24gJiYgbG9nZ2VyLm5vdGljZShjb25maWcuZGVzY3JpcHRpb24pO1xuICAgICAgYXdhaXQgYWN0aW9uc1tjb25maWcuYWN0aW9uXShjb25maWcsIGVudmlyb25tZW50LCBzZXR0aW5ncyk7XG4gICAgfVxuICB9XG5cbiAgaWYgKGNvbmZpZy5wb3N0QWN0aW9uKSB7XG4gICAgYXdhaXQgc2V0dGluZ3MucHVzaChcInBvc3RBY3Rpb25cIik7XG4gICAgY29uc3QgbmV3Q29uZmlnOiBhbnkgPSB7fTtcbiAgICBhc3NpZ25PYmplY3QobmV3Q29uZmlnLCBjb25maWcpO1xuICAgIGRlbGV0ZSBuZXdDb25maWcuYWN0aW9uO1xuICAgIGRlbGV0ZSBuZXdDb25maWcucHJlQWN0aW9uO1xuICAgIGRlbGV0ZSBuZXdDb25maWcucG9zdEFjdGlvbjtcbiAgICBhc3NpZ25PYmplY3QobmV3Q29uZmlnLCBjb25maWcucG9zdEFjdGlvbik7XG4gICAgY29uc3QgbmV3RW52aXJvbm1lbnQgPSBtZXJnZUVudmlyb25tZW50KGNvbmZpZy5wb3N0QWN0aW9uLmVudmlyb25tZW50LCBlbnZpcm9ubWVudCk7XG4gICAgYXdhaXQgZG9UYXJnZXRCdWlsZChnY29uZmlnLCBuZXdFbnZpcm9ubWVudCwgbmV3Q29uZmlnLCBzZXR0aW5ncyk7XG4gICAgYXdhaXQgc2V0dGluZ3MucG9wKCk7XG4gIH1cbn1cblxuYXN5bmMgZnVuY3Rpb24gZ2V0VXNlckNvbmZpZyhvcHRpb25zOiBDb21tYW5kT3B0aW9ucykge1xuICBsZXQgY29uZmlnUGF0aDtcbiAgaWYgKG9wdGlvbnMuZW52LmNvbmZpZykge1xuICAgIGNvbmZpZ1BhdGggPSBQYXRoLmlzQWJzb2x1dGUob3B0aW9ucy5lbnYuY29uZmlnKSA/IG9wdGlvbnMuZW52LmNvbmZpZyA6IFBhdGgucmVzb2x2ZShvcHRpb25zLndvcmtEaXIsIG9wdGlvbnMuZW52LmNvbmZpZyk7XG4gICAgaWYgKCFhd2FpdCBmaWxlRXhpc3RzKGNvbmZpZ1BhdGgpKVxuICAgICAgdGhyb3cgYENvbmZpZ3VyYXRpb24gJyR7b3B0aW9ucy5lbnYuY29uZmlnfScgZmlsZSBkb2VzIG5vdCBleGlzdGA7XG4gIH1cbiAgZWxzZSB7XG4gICAgY29uc3QgdXNlckNvbmZpZ1BhdGggPSBQYXRoLnJlc29sdmUob3B0aW9ucy53b3JrRGlyLCBVU0VSX0NPTkZJRyk7XG4gICAgaWYgKGF3YWl0IGZpbGVFeGlzdHModXNlckNvbmZpZ1BhdGgpKVxuICAgICAgY29uZmlnUGF0aCA9IHVzZXJDb25maWdQYXRoO1xuICAgIGVsc2Uge1xuICAgICAgbG9nZ2VyLndhcm4oYENvbmZpZyBmaWxlICcke1VTRVJfQ09ORklHfScgaXMgbm90IGF2YWlsYWJsZWApO1xuICAgIH1cbiAgfVxuXG4gIGlmICghY29uZmlnUGF0aCkge1xuICAgIHJldHVybiB7XG4gICAgICBcImJ1bmRsZTpvdXRwdXRcIjoge1xuICAgICAgICBhY3Rpb246IFwiYml0bWFrZVwiLFxuICAgICAgICB2YXJpYWJsZXM6IHtcbiAgICAgICAgICBJTlNUQUxMX1BSRUZJWDogXCIvdXNyXCIsXG4gICAgICAgIH0sXG4gICAgICAgIHNvdXJjZURpcjogXCIke3NvdXJjZVJvb3R9XCIsXG4gICAgICAgIGRlc3REaXI6IFwiJHtiaW5hcnlSb290fS9vdXRwdXRcIixcbiAgICAgIH1cbiAgICB9O1xuICB9XG5cbiAgY29uc3QgY29uZmlnVXJsID0gdXJsLnBhdGhUb0ZpbGVVUkwoY29uZmlnUGF0aCk7XG4gIGNvbnN0IGNvbmZpZ01vZHVsZSA9IGF3YWl0IGltcG9ydE1vZHVsZShjb25maWdVcmwpO1xuICBzd2l0Y2ggKHR5cGVvZiBjb25maWdNb2R1bGUuZGVmYXVsdCkge1xuICBjYXNlIFwiZnVuY3Rpb25cIjpcbiAgICBjb25zdCB1c2VyQ29uZmlnID0gY29uZmlnTW9kdWxlLmRlZmF1bHQob3B0aW9ucy5lbnYsIHt9KTtcbiAgICBpZiAodXNlckNvbmZpZyBpbnN0YW5jZW9mIFByb21pc2UpXG4gICAgICByZXR1cm4gYXdhaXQgdXNlckNvbmZpZztcbiAgICByZXR1cm4gdXNlckNvbmZpZztcblxuICBjYXNlIFwib2JqZWN0XCI6XG4gICAgcmV0dXJuIGNvbmZpZ01vZHVsZS5kZWZhdWx0O1xuXG4gIGRlZmF1bHQ6XG4gICAgdGhyb3cgbmV3IEVycm9yKGBVbmtub3duIHVzZXIgY29uZmlndXJhdGlvbiB0eXBlYCk7XG4gIH1cbn1cblxuZXhwb3J0IGRlZmF1bHQgYXN5bmMgKG9wdGlvbnM6IENvbW1hbmRPcHRpb25zKSA9PiB7XG4gIGNvbnN0IGdjb25maWc6IElHZW5lcmFsQ29uZmlnID0ge1xuICAgIGJ1aWxkVHlwZTogb3B0aW9ucy5lbnYuYnVpbGRUeXBlID09IERFQlVHX0JVSUxEX1RZUEUgPyBvcHRpb25zLmVudi5idWlsZFR5cGUgOiBSRUxFQVNFX0JVSUxEX1RZUEUsXG4gICAgd29ya0Rpcjogb3B0aW9ucy53b3JrRGlyLFxuICB9O1xuXG4gIGNvbnN0IHVzZXJDb25maWcgPSBhd2FpdCBnZXRVc2VyQ29uZmlnKG9wdGlvbnMpO1xuICBjb25zdCBidWlsZENvbmZpZyA9IG1ha2VCdWlsZENvbmZpZyhnY29uZmlnLCB1c2VyQ29uZmlnKTtcblxuICBpZiAoYnVpbGRDb25maWcuUkVDSVBFX0NPTlRFTlRfRklMRSkge1xuICAgIGNvbnN0IGpzb25Db25maWcgPSBKU09OLnN0cmluZ2lmeShidWlsZENvbmZpZywgbnVsbCwgMik7XG4gICAgYXdhaXQgc2F2ZUlmRGlmZmVyZW50KGJ1aWxkQ29uZmlnLlJFQ0lQRV9DT05URU5UX0ZJTEUsIGpzb25Db25maWcpO1xuICB9XG5cbiAgY29uc3Qgc2V0dGluZ3NGaWxlbmFtZSA9IFBhdGgucmVzb2x2ZShidWlsZENvbmZpZy5iaW5hcnlSb290LCBCVUlMRF9TRVRUSU5HU19GSUxFKTtcbiAgY29uc3Qgc2V0dGluZ3MgPSBuZXcgU2V0dGluZ3NTdG9yYWdlKHNldHRpbmdzRmlsZW5hbWUpO1xuXG4gIGZvciAoY29uc3QgW2tleSwgZW50cnldIG9mIE9iamVjdC5lbnRyaWVzKGJ1aWxkQ29uZmlnKSBhcyBhbnkpIHtcbiAgICBpZiAoZW50cnkgJiYgdHlwZW9mIGVudHJ5ID09PSBcIm9iamVjdFwiICYmIGVudHJ5LmFjdGlvbiAmJiAhZW50cnkuZGlzYWJsZWQpIHtcbiAgICAgIGF3YWl0IHNldHRpbmdzLnB1c2goa2V5KTtcbiAgICAgIGNvbnN0IGNvbXBsZXRlZCA9IGF3YWl0IHNldHRpbmdzLmdldChcImNvbXBsZXRlZFwiKTtcbiAgICAgIGlmIChlbnRyeS5yZWJ1aWxkIHx8ICFjb21wbGV0ZWQpIHtcbiAgICAgICAgbG9nZ2VyLmluZm8oYFN0YXJ0ZWQgYWN0aW9uOiAke2tleX1gKTtcbiAgICAgICAgY29uc3QgZW52aXJvbm1lbnQgPSBtZXJnZUVudmlyb25tZW50KGVudHJ5LmVudmlyb25tZW50LCBwcm9jZXNzLmVudik7XG4gICAgICAgIGlmIChlbnRyeS5zb3VyY2VVcmwgJiYgIWVudHJ5LnNvdXJjZVVybC5zdGFydHNXaXRoKElNUE9SVF9TQ0hFTUUpKSB7XG4gICAgICAgICAgYXdhaXQgZG9FeHRyYWN0QXJjaGl2ZShnY29uZmlnLCBlbnZpcm9ubWVudCwgZW50cnksIHNldHRpbmdzKTtcbiAgICAgICAgfVxuICAgICAgICBhd2FpdCBkb1RhcmdldEJ1aWxkKGdjb25maWcsIGVudmlyb25tZW50LCBlbnRyeSwgc2V0dGluZ3MpO1xuICAgICAgICBhd2FpdCBzZXR0aW5ncy5zZXQoXCJjb21wbGV0ZWRcIiwgdHJ1ZSk7XG4gICAgICAgIGxvZ2dlci5pbmZvKGBDb21wbGV0ZWQgYWN0aW9uOiAke2tleX1gKTtcbiAgICAgIH1cbiAgICAgIGF3YWl0IHNldHRpbmdzLnBvcCgpO1xuICAgIH1cbiAgfVxufVxuIiwiLypcbiAqIE1JVCBMaWNlbnNlXG4gKlxuICogQ29weXJpZ2h0IChjKSAyMDI1ICBZdXJpaSBZYWt1YmluICh5dXJpaS55YWt1YmluQGdtYWlsLmNvbSlcbiAqXG4gKiBQZXJtaXNzaW9uIGlzIGdyYW50ZWQgdG8gdXNlLCBjb3B5LCBtb2RpZnksIGFuZCBkaXN0cmlidXRlIHRoaXMgc29mdHdhcmVcbiAqIHVuZGVyIHRoZSBNSVQgTGljZW5zZS4gU2VlIExJQ0VOU0UgZmlsZSBmb3IgZGV0YWlscy5cbiAqL1xuXG5pbXBvcnQgeyBDb21tYW5kT3B0aW9ucyB9IGZyb20gXCJAL2NvcmUvQ29tbWFuZE9wdGlvbnNcIjtcbmltcG9ydCBpbml0IGZyb20gXCJAL2NvbW1hbmRzL2luaXRcIjtcbmltcG9ydCBidWlsZCBmcm9tIFwiQC9jb21tYW5kcy9idWlsZFwiO1xuXG5leHBvcnQgZGVmYXVsdCB7XG4gIGRlZmF1bHQ6IGJ1aWxkLFxuICBpbml0LFxuICBidWlsZCxcbn0gYXMgeyBbbmFtZTogc3RyaW5nXTogKG9wdGlvbnM6IENvbW1hbmRPcHRpb25zKSA9PiBhbnk7IH07XG4iLCIvKlxuICogTUlUIExpY2Vuc2VcbiAqXG4gKiBDb3B5cmlnaHQgKGMpIDIwMjUgIFl1cmlpIFlha3ViaW4gKHl1cmlpLnlha3ViaW5AZ21haWwuY29tKVxuICpcbiAqIFBlcm1pc3Npb24gaXMgZ3JhbnRlZCB0byB1c2UsIGNvcHksIG1vZGlmeSwgYW5kIGRpc3RyaWJ1dGUgdGhpcyBzb2Z0d2FyZVxuICogdW5kZXIgdGhlIE1JVCBMaWNlbnNlLiBTZWUgTElDRU5TRSBmaWxlIGZvciBkZXRhaWxzLlxuICovXG5cbmltcG9ydCBwYXRoIGZyb20gXCJub2RlOnBhdGhcIjtcbmltcG9ydCBmcyBmcm9tIFwibm9kZTpmc1wiO1xuXG5pbXBvcnQgeyBmaWxlRXhpc3RzLCBmZXRjaEJ1ZmZlciB9IGZyb20gXCJAL3V0aWxzL0ZpbGVTeXN0ZW1cIjtcbmltcG9ydCB7IFVTRVJfQ09ORklHIH0gZnJvbSBcIkAvQ29uc3RhbnRzXCI7XG5pbXBvcnQgeyBDb21tYW5kT3B0aW9ucyB9IGZyb20gXCJAL2NvcmUvQ29tbWFuZE9wdGlvbnNcIjtcbmltcG9ydCB7IExvZ2dlciB9IGZyb20gXCJAL2xvZ2dlclwiO1xuXG5jb25zdCBsb2dnZXIgPSBMb2dnZXIuY3JlYXRlKGltcG9ydC5tZXRhLnVybCk7XG5cbmV4cG9ydCBkZWZhdWx0IGFzeW5jIGZ1bmN0aW9uKG9wdGlvbnM6IENvbW1hbmRPcHRpb25zKSB7XG4gIGNvbnN0IHByZXNldCA9IG9wdGlvbnMuZW52LnByZXNldDtcblxuICBpZiAoIXByZXNldClcbiAgICB0aHJvdyBuZXcgRXJyb3IoYFByZXNldCAnJHtwcmVzZXR9JyBpcyBub3QgYXZhaWxhYmxlYCk7XG5cbiAgY29uc3QgcHJlc2V0RGF0YSA9IGF3YWl0IGZldGNoQnVmZmVyKHByZXNldCk7XG5cbiAgY29uc3QgdXNlckNvbmZpZ1BhdGggPSBwYXRoLnJlc29sdmUob3B0aW9ucy53b3JrRGlyLCBVU0VSX0NPTkZJRyk7XG4gIGlmIChhd2FpdCBmaWxlRXhpc3RzKHVzZXJDb25maWdQYXRoKSlcbiAgICBhd2FpdCBmcy5wcm9taXNlcy5ybSh1c2VyQ29uZmlnUGF0aCk7XG5cbiAgYXdhaXQgZnMucHJvbWlzZXMud3JpdGVGaWxlKHVzZXJDb25maWdQYXRoLCBwcmVzZXREYXRhLCBcInV0ZjhcIik7XG4gIGxvZ2dlci5pbmZvKGBQcmVzZXQgJyR7cHJlc2V0fScgaW5zdGFsbGVkIHN1Y2Nlc3NmdWxseWApO1xufVxuIiwiLypcbiAqIE1JVCBMaWNlbnNlXG4gKlxuICogQ29weXJpZ2h0IChjKSAyMDI1ICBZdXJpaSBZYWt1YmluICh5dXJpaS55YWt1YmluQGdtYWlsLmNvbSlcbiAqXG4gKiBQZXJtaXNzaW9uIGlzIGdyYW50ZWQgdG8gdXNlLCBjb3B5LCBtb2RpZnksIGFuZCBkaXN0cmlidXRlIHRoaXMgc29mdHdhcmVcbiAqIHVuZGVyIHRoZSBNSVQgTGljZW5zZS4gU2VlIExJQ0VOU0UgZmlsZSBmb3IgZGV0YWlscy5cbiAqL1xuXG5pbXBvcnQgcGF0aCBmcm9tIFwibm9kZTpwYXRoXCI7XG5pbXBvcnQgdXJsIGZyb20gXCJub2RlOnVybFwiO1xuXG5pbXBvcnQgeyBQYXRoIH0gZnJvbSBcIkAvdXRpbHMvUGF0aFwiO1xuaW1wb3J0IHsgRklMRV9TQ0hFTUUgfSBmcm9tIFwiQC91dGlscy9VcmxTY2hlbWVcIjtcbmltcG9ydCB7IFNpbXBsZU9iamVjdCB9IGZyb20gXCJAL2NvcmUvU2ltcGxlT2JqZWN0XCI7XG5cbmNvbnN0IFBBVEggPSBTeW1ib2woXCJQQVRIXCIpO1xuXG5mdW5jdGlvbiB0b1BhdGhTdHJpbmcocHRoOiBzdHJpbmcgfCBBYnNvbHV0ZVBhdGgpIHtcbiAgaWYgKHR5cGVvZiBwdGggIT09IFwic3RyaW5nXCIpXG4gICAgcmV0dXJuIHB0aC50b1BhdGgoKTtcbiAgaWYgKHB0aC5zdGFydHNXaXRoKEZJTEVfU0NIRU1FKSlcbiAgICByZXR1cm4gdXJsLmZpbGVVUkxUb1BhdGgocHRoKTtcbiAgcmV0dXJuIHB0aDtcbn1cblxuZXhwb3J0IGNsYXNzIEFic29sdXRlUGF0aCB7XG4gIHByaXZhdGUgW1BBVEhdOiBzdHJpbmc7XG5cbiAgcHJvdGVjdGVkIGNvbnN0cnVjdG9yKGZpbGVwYXRoOiBzdHJpbmcpIHtcbiAgICBpZiAoZmlsZXBhdGguc3RhcnRzV2l0aChGSUxFX1NDSEVNRSkpIHtcbiAgICAgIHRoaXNbUEFUSF0gPSBmaWxlcGF0aDtcbiAgICB9XG4gICAgZWxzZSBpZiAoUGF0aC5pc0Fic29sdXRlKGZpbGVwYXRoKSkge1xuICAgICAgdGhpc1tQQVRIXSA9IHVybC5wYXRoVG9GaWxlVVJMKGZpbGVwYXRoKS50b1N0cmluZygpO1xuICAgIH1cbiAgICBlbHNlIHtcbiAgICAgIHRocm93IG5ldyBFcnJvcihgTm90IHN1cHBvcnRlZCByZWxhdGl2ZSBwYXRoIG9mIFwiJHtmaWxlcGF0aH1cImApO1xuICAgIH1cbiAgfVxuXG4gIHB1YmxpYyBqb2luKC4uLnBhdGhzOiBBcnJheTxBYnNvbHV0ZVBhdGggfCBzdHJpbmc+KSB7XG4gICAgY29uc3QgZmlsZXBhdGggPSBQYXRoLmpvaW4odGhpcy50b1BhdGgoKSwgLi4ucGF0aHMubWFwKGkgPT4gdG9QYXRoU3RyaW5nKGkpKSk7XG4gICAgcmV0dXJuIEFic29sdXRlUGF0aC5jcmVhdGUoZmlsZXBhdGgpO1xuICB9XG5cbiAgcHVibGljIGRpcm5hbWUoKSB7XG4gICAgcmV0dXJuIEFic29sdXRlUGF0aC5jcmVhdGUocGF0aC5wb3NpeC5kaXJuYW1lKHRoaXNbUEFUSF0pKTtcbiAgfVxuXG4gIHB1YmxpYyBiYXNlbmFtZSgpIHtcbiAgICByZXR1cm4gcGF0aC5wb3NpeC5iYXNlbmFtZSh0aGlzW1BBVEhdKTtcbiAgfVxuXG4gIHB1YmxpYyByZWxhdGl2ZSh0bzogQWJzb2x1dGVQYXRoIHwgc3RyaW5nKSB7XG4gICAgcmV0dXJuIFBhdGgucmVsYXRpdmUodGhpcy50b1BhdGgoKSwgdG9QYXRoU3RyaW5nKHRvKSk7XG4gIH1cblxuICBwdWJsaWMgcmVzb2x2ZSguLi5wYXRoczogQXJyYXk8QWJzb2x1dGVQYXRoIHwgc3RyaW5nPikge1xuICAgIHJldHVybiBBYnNvbHV0ZVBhdGguY3JlYXRlKFBhdGgucmVzb2x2ZSh0aGlzLnRvUGF0aCgpLCAuLi5wYXRocy5tYXAoaSA9PiB0b1BhdGhTdHJpbmcoaSkpKSk7XG4gIH1cblxuICBwdWJsaWMgbWF0Y2gocmVnZXhwOiBSZWdFeHApIHtcbiAgICByZXR1cm4gdGhpc1tQQVRIXS5tYXRjaChyZWdleHApO1xuICB9XG5cbiAgcHVibGljIHRvU3RyaW5nKCkge1xuICAgIHJldHVybiB1cmwuZmlsZVVSTFRvUGF0aCh0aGlzW1BBVEhdKTtcbiAgfVxuXG4gIHB1YmxpYyB0b1BhdGgoKSB7XG4gICAgaWYgKHRoaXNbUEFUSF0uc3RhcnRzV2l0aChGSUxFX1NDSEVNRSkpXG4gICAgICByZXR1cm4gdXJsLmZpbGVVUkxUb1BhdGgodGhpc1tQQVRIXSk7XG4gICAgdGhyb3cgbmV3IEVycm9yKGBVUkwgJHt0aGlzW1BBVEhdfSBjYW4ndCBjb252ZXJ0IHRvIHBhdGhgKTtcbiAgfVxuXG4gIHB1YmxpYyB2YWx1ZU9mKCkge1xuICAgIHJldHVybiB1cmwuZmlsZVVSTFRvUGF0aCh0aGlzW1BBVEhdKTtcbiAgfVxuXG4gIHB1YmxpYyB0b1VSTFN0cmluZygpIHtcbiAgICByZXR1cm4gdGhpc1tQQVRIXTtcbiAgfVxuXG4gIHB1YmxpYyB0b0pTT04oKTogYW55IHtcbiAgICByZXR1cm4gdGhpc1tQQVRIXTtcbiAgfVxuXG4gIHB1YmxpYyBzdGF0aWMgaXNBYnNvbHV0ZShmaWxlcGF0aDogQWJzb2x1dGVQYXRoIHwgc3RyaW5nKSB7XG4gICAgaWYgKGZpbGVwYXRoIGluc3RhbmNlb2YgQWJzb2x1dGVQYXRoKVxuICAgICAgcmV0dXJuIHRydWU7XG4gICAgaWYgKGZpbGVwYXRoLnN0YXJ0c1dpdGgoRklMRV9TQ0hFTUUpKVxuICAgICAgcmV0dXJuIHRydWU7XG4gICAgcmV0dXJuIFBhdGguaXNBYnNvbHV0ZShmaWxlcGF0aCk7XG4gIH1cblxuICBwdWJsaWMgc3RhdGljIGVuc3VyZUluc3RhbmNlKHZhbHVlOiBhbnkpOiBBYnNvbHV0ZVBhdGgge1xuICAgIGlmICh2YWx1ZSBpbnN0YW5jZW9mIEFic29sdXRlUGF0aClcbiAgICAgIHJldHVybiB2YWx1ZTtcbiAgICB0aHJvdyBuZXcgRXJyb3IoYFRoZSAnJHt2YWx1ZX0nIGlzIG5vdCBhIEFic29sdXRlUGF0aGApO1xuICB9XG5cbiAgcHVibGljIHN0YXRpYyBjcmVhdGUocGF0aDogQWJzb2x1dGVQYXRoIHwgc3RyaW5nKTogQWJzb2x1dGVQYXRoIHtcbiAgICBpZiAocGF0aCBpbnN0YW5jZW9mIEFic29sdXRlUGF0aClcbiAgICAgIHJldHVybiBwYXRoO1xuXG4gICAgcmV0dXJuIE9iamVjdC5zZWFsKG5ldyBBYnNvbHV0ZVBhdGgocGF0aCkpO1xuICB9XG59O1xuXG5leHBvcnQgY2xhc3MgRGlyUGF0aCBleHRlbmRzIEFic29sdXRlUGF0aCB7XG4gIHByaXZhdGUgY29uc3RydWN0b3IoZGlybmFtZTogc3RyaW5nKSB7XG4gICAgc3VwZXIoZGlybmFtZSk7XG4gIH1cblxuICBwdWJsaWMgc3RhdGljIGNyZWF0ZShkaXJuYW1lOiBEaXJQYXRoIHwgQWJzb2x1dGVQYXRoIHwgc3RyaW5nKTogRGlyUGF0aCB7XG4gICAgaWYgKHR5cGVvZiBkaXJuYW1lICE9PSBcInN0cmluZ1wiKVxuICAgICAgZGlybmFtZSA9IGRpcm5hbWUudG9VUkxTdHJpbmcoKTtcbiAgICByZXR1cm4gbmV3IERpclBhdGgoZGlybmFtZSk7XG4gIH1cblxuICBwdWJsaWMgc3RhdGljIGZyb21KU09OKG9iamVjdDogU2ltcGxlT2JqZWN0KSB7XG4gICAgcmV0dXJuIG5ldyBEaXJQYXRoKG9iamVjdC51cmwgYXMgc3RyaW5nKTtcbiAgfVxuXG4gIHB1YmxpYyB0b0pTT04oKTogU2ltcGxlT2JqZWN0IHtcbiAgICByZXR1cm4ge1xuICAgICAgdHlwZTogRGlyUGF0aC5uYW1lLFxuICAgICAgdXJsOiB0aGlzLnRvVVJMU3RyaW5nKCksXG4gICAgfTtcbiAgfVxufTtcblxuZXhwb3J0IGNsYXNzIEZpbGVQYXRoIGV4dGVuZHMgQWJzb2x1dGVQYXRoIHtcbiAgcHJpdmF0ZSBjb25zdHJ1Y3RvcihmaWxlcGF0aDogc3RyaW5nKSB7XG4gICAgc3VwZXIoZmlsZXBhdGgpO1xuICB9XG5cbiAgcHVibGljIHN0YXRpYyBjcmVhdGUoZmlsZXBhdGg6IEZpbGVQYXRoIHwgQWJzb2x1dGVQYXRoIHwgc3RyaW5nKTogRmlsZVBhdGgge1xuICAgIGlmICh0eXBlb2YgZmlsZXBhdGggIT09IFwic3RyaW5nXCIpXG4gICAgICBmaWxlcGF0aCA9IGZpbGVwYXRoLnRvVVJMU3RyaW5nKCk7XG4gICAgcmV0dXJuIG5ldyBGaWxlUGF0aChmaWxlcGF0aCk7XG4gIH1cblxuICBwdWJsaWMgc3RhdGljIGZyb21KU09OKG9iamVjdDogU2ltcGxlT2JqZWN0KSB7XG4gICAgcmV0dXJuIG5ldyBGaWxlUGF0aChvYmplY3QudXJsIGFzIHN0cmluZyk7XG4gIH1cblxuICBwdWJsaWMgdG9KU09OKCk6IFNpbXBsZU9iamVjdCB7XG4gICAgcmV0dXJuIHtcbiAgICAgIHR5cGU6IEZpbGVQYXRoLm5hbWUsXG4gICAgICB1cmw6IHRoaXMudG9VUkxTdHJpbmcoKSxcbiAgICB9O1xuICB9XG59O1xuIiwiLypcbiAqIE1JVCBMaWNlbnNlXG4gKlxuICogQ29weXJpZ2h0IChjKSAyMDI1ICBZdXJpaSBZYWt1YmluICh5dXJpaS55YWt1YmluQGdtYWlsLmNvbSlcbiAqXG4gKiBQZXJtaXNzaW9uIGlzIGdyYW50ZWQgdG8gdXNlLCBjb3B5LCBtb2RpZnksIGFuZCBkaXN0cmlidXRlIHRoaXMgc29mdHdhcmVcbiAqIHVuZGVyIHRoZSBNSVQgTGljZW5zZS4gU2VlIExJQ0VOU0UgZmlsZSBmb3IgZGV0YWlscy5cbiAqL1xuXG5pbXBvcnQgeyBJR2VuZXJhbENvbnRleHQgfSBmcm9tIFwiQC9jb3JlL01ha2VJbnRlcmZhY2VzXCI7XG5pbXBvcnQgeyBmaW5kUHJvZ3JhbVN5bmMgfSBmcm9tIFwiQC9jb3JlL0ZpbmRQcm9ncmFtXCI7XG5pbXBvcnQgeyBTY29wZUhlbHBlciwgVmFyaWFibGVNYXAsIFZhcmlhbnRNYXAgfSBmcm9tIFwiQC9jb3JlL1Njb3BlXCI7XG5pbXBvcnQgeyBTeXN0ZW1TY29wZSB9IGZyb20gXCJAL2NvcmUvU3lzdGVtU2NvcGVcIjtcbmltcG9ydCB7IEZpbGVQYXRoLCBBYnNvbHV0ZVBhdGggfSBmcm9tIFwiQC9jb3JlL0Fic29sdXRlUGF0aFwiO1xuaW1wb3J0IHsgaW1wb3J0TW9kdWxlIH0gZnJvbSBcIkAvdXRpbHMvTW9kdWxlXCI7XG5pbXBvcnQgeyBNYWluVGFyZ2V0LCBQb3N0VGFyZ2V0IH0gZnJvbSBcIkAvY29yZS9UYXJnZXRcIjtcbmltcG9ydCB7IEN1c3RvbVNjcmlwdCwgUG9zdEN1c3RvbVNjcmlwdCB9IGZyb20gXCJAL2NvcmUvQ3VzdG9tU2NyaXB0XCI7XG5pbXBvcnQgeyBJbnN0YWxsRW50aXR5IH0gZnJvbSBcIkAvY29yZS9JbnN0YWxsRW50aXR5XCI7XG5pbXBvcnQgeyBUYXJnZXROYW1lIH0gZnJvbSBcIkAvY29yZS9UYXJnZXROYW1lXCI7XG5pbXBvcnQgeyBMb2dnZXIgfSBmcm9tIFwiQC9sb2dnZXJcIjtcblxuY29uc3QgbG9nZ2VyID0gTG9nZ2VyLmNyZWF0ZShpbXBvcnQubWV0YS51cmwpO1xuXG5leHBvcnQgYWJzdHJhY3QgY2xhc3MgR2VuZXJhbENvbnRleHQgaW1wbGVtZW50cyBJR2VuZXJhbENvbnRleHQge1xuICBwcm90ZWN0ZWQgX3Njb3BlOiBWYXJpYWJsZU1hcDtcblxuICBjb25zdHJ1Y3RvcihzY29wZTogVmFyaWFibGVNYXApIHtcbiAgICB0aGlzLl9zY29wZSA9IHNjb3BlO1xuICB9XG5cbiAgcHVibGljIGZpbmRQcm9ncmFtKG5hbWU6IHN0cmluZyk6IHN0cmluZyB8IHVuZGVmaW5lZCB7XG4gICAgcmV0dXJuIGZpbmRQcm9ncmFtU3luYyhuYW1lKTtcbiAgfVxuXG4gIHB1YmxpYyBnZXRQcm9wZXJ0eSh0aGlzOiBhbnksIG5hbWU6IHN0cmluZyk6IGFueSB7XG4gICAgcmV0dXJuIFNjb3BlSGVscGVyLmdldCh0aGlzLl9zY29wZSwgbmFtZSk7XG4gIH1cblxuICBwdWJsaWMgc2V0UHJvcGVydHkodGhpczogYW55LCBuYW1lOiBzdHJpbmcsIHZhbHVlOiBhbnkpOiBhbnkge1xuICAgIGNvbnN0IGVudHJ5ID0gdGhpcy5fc2NvcGVbbmFtZV07XG4gICAgaWYgKGVudHJ5KVxuICAgICAgU2NvcGVIZWxwZXIuc2V0RW50cnlWYWx1ZShlbnRyeSwgdmFsdWUpO1xuICAgIGVsc2VcbiAgICAgIFNjb3BlSGVscGVyLmRlZmluZVZhcmlhYmxlKHRoaXMuX3Njb3BlLCBcIlwiLCBuYW1lLCB7dmFsdWV9KTtcbiAgICByZXR1cm4gdHJ1ZTtcbiAgfVxuXG4gIHB1YmxpYyBoYXNQcm9wZXJ0eSh0aGlzOiBhbnksIG5hbWU6IHN0cmluZyk6IGJvb2xlYW4ge1xuICAgIHJldHVybiBPYmplY3QuaGFzT3duKHRoaXMuX3Njb3BlLCBuYW1lKTtcbiAgfVxuXG4gIHB1YmxpYyBkZWxldGVQcm9wZXJ0eSh0aGlzOiBhbnksIG5hbWU6IHN0cmluZyk6IGJvb2xlYW4ge1xuICAgIHJldHVybiBkZWxldGUgdGhpcy5fc2NvcGVbbmFtZV07XG4gIH1cblxuICBwdWJsaWMgZ2V0UHJvcGVydHlOYW1lcyh0aGlzOiBhbnkpOiBzdHJpbmdbXSB7XG4gICAgcmV0dXJuIE9iamVjdC5rZXlzKHRoaXMuX3Njb3BlKTtcbiAgfVxufTtcblxuZXhwb3J0IGFic3RyYWN0IGNsYXNzIE1ha2VDb250ZXh0IC8qZXh0ZW5kcyBHZW5lcmFsQ29udGV4dCovIHtcbiAgcHJpdmF0ZSBfdGFyZ2V0cyA9IG5ldyBNYXA8c3RyaW5nLCBNYWluVGFyZ2V0PjtcbiAgcHJpdmF0ZSBfcG9zdFRhcmdldHMgPSBuZXcgTWFwPHN0cmluZywgUG9zdFRhcmdldD47XG4gIHByaXZhdGUgX21haW5TY3JpcHRzID0gbmV3IE1hcDxzdHJpbmcsIEN1c3RvbVNjcmlwdD47XG4gIHByaXZhdGUgX3Bvc3RTY3JpcHRzID0gbmV3IE1hcDxzdHJpbmcsIFBvc3RDdXN0b21TY3JpcHQ+O1xuICBwcml2YXRlIF9pbnN0YWxsTGlzdCA9IG5ldyBBcnJheTxJbnN0YWxsRW50aXR5PigpO1xuXG4gIHByb3RlY3RlZCBjb25zdHJ1Y3RvcihzY29wZTogVmFyaWFibGVNYXApIHtcbiAgICAvL3N1cGVyKHNjb3BlKTtcbiAgfVxuXG4gIGFic3RyYWN0IGV4ZWN1dGVTY3JpcHQoc2NvcGU6IFZhcmlhYmxlTWFwLCBzY3JpcHQ6IGFueSwgcGFyYW1zOiBhbnkpOiBhbnk7XG4gIGFic3RyYWN0IGFkZENhY2hlVmFyaWFibGVzKHNjb3BlOiBWYXJpYWJsZU1hcCwgcGFyYW1zOiBzdHJpbmcgfCBWYXJpYW50TWFwKTogdm9pZDtcbiAgYWJzdHJhY3QgYWRkU3ViZGlyZWN0b3J5KHNjb3BlOiBWYXJpYWJsZU1hcCwgc291cmNlRGlyOiBzdHJpbmcgfCBBYnNvbHV0ZVBhdGgsIGJpbmFyeURpcj86IHN0cmluZyB8IEFic29sdXRlUGF0aCk6IHZvaWQ7XG5cbiAgcHVibGljIGdldCB0YXJnZXRzKCkge1xuICAgIHJldHVybiB0aGlzLl90YXJnZXRzO1xuICB9XG5cbiAgcHVibGljIGdldCBwb3N0VGFyZ2V0cygpIHtcbiAgICByZXR1cm4gdGhpcy5fcG9zdFRhcmdldHM7XG4gIH1cblxuICBwdWJsaWMgZ2V0IG1haW5TY3JpcHRzKCkge1xuICAgIHJldHVybiB0aGlzLl9tYWluU2NyaXB0cztcbiAgfVxuXG4gIHB1YmxpYyBnZXQgcG9zdFNjcmlwdHMoKSB7XG4gICAgcmV0dXJuIHRoaXMuX3Bvc3RTY3JpcHRzO1xuICB9XG5cbiAgcHVibGljIGdldCBpbnN0YWxsTGlzdCgpIHtcbiAgICByZXR1cm4gdGhpcy5faW5zdGFsbExpc3Q7XG4gIH1cblxuICBwdWJsaWMgZ2V0UG9zdFRhcmdldChuYW1lOiBzdHJpbmcpOiBQb3N0VGFyZ2V0IHtcbiAgICBsZXQgdGFyZ2V0ID0gdGhpcy5fcG9zdFRhcmdldHMuZ2V0KG5hbWUpO1xuICAgIGlmICghdGFyZ2V0KSB7XG4gICAgICB0YXJnZXQgPSBQb3N0VGFyZ2V0LmNyZWF0ZShuYW1lKVxuICAgICAgdGhpcy5fcG9zdFRhcmdldHMuc2V0KG5hbWUsIHRhcmdldCk7XG4gICAgfVxuICAgIHJldHVybiB0YXJnZXQ7XG4gIH1cblxuICBwdWJsaWMgaGFzTWFpblRhcmdldChuYW1lOiBzdHJpbmcpIHtcbiAgICByZXR1cm4gdGhpcy5fdGFyZ2V0cy5oYXMobmFtZSk7XG4gIH1cblxuICBwdWJsaWMgYWRkTWFpblRhcmdldChuYW1lOiBzdHJpbmcsIHRhcmdldDogTWFpblRhcmdldCkge1xuICAgIHRoaXMuX3RhcmdldHMuc2V0KG5hbWUsIHRhcmdldCk7XG4gIH1cblxuICBwdWJsaWMgc2NyaXB0KG5hbWU6IHN0cmluZyk6IFBvc3RDdXN0b21TY3JpcHQge1xuICAgIGxldCBzY3JpcHQgPSB0aGlzLl9wb3N0U2NyaXB0cy5nZXQobmFtZSk7XG4gICAgaWYgKCFzY3JpcHQpIHtcbiAgICAgIHNjcmlwdCA9IFBvc3RDdXN0b21TY3JpcHQuY3JlYXRlKG5hbWUpXG4gICAgICB0aGlzLl9wb3N0U2NyaXB0cy5zZXQobmFtZSwgc2NyaXB0KTtcbiAgICB9XG4gICAgcmV0dXJuIHNjcmlwdDtcbiAgfVxuXG4gIHB1YmxpYyBhZGRDdXN0b21TY3JpcHQob3B0aW9uczogQ3VzdG9tU2NyaXB0Lk9wdGlvbnMpOiBDdXN0b21TY3JpcHQge1xuICAgIGNvbnN0IHRhcmdldCA9IEN1c3RvbVNjcmlwdC5jcmVhdGUob3B0aW9ucyk7XG4gICAgdGhpcy5fbWFpblNjcmlwdHMuc2V0KG9wdGlvbnMubmFtZSwgdGFyZ2V0KTtcbiAgICByZXR1cm4gdGFyZ2V0O1xuICB9XG5cbiAgcHVibGljIGFkZEluc3RhbGxFbnRyeSh2YWx1ZTogRmlsZVBhdGggfCBUYXJnZXROYW1lLCBkZXN0aW5hdGlvbjogQWJzb2x1dGVQYXRoLCBiYXNlRGlyPzogQWJzb2x1dGVQYXRoKTogdm9pZCB7XG4gICAgY29uc3QgZW50aXR5ID0gbmV3IEluc3RhbGxFbnRpdHkodmFsdWUsIGRlc3RpbmF0aW9uLCBiYXNlRGlyKTtcbiAgICB0aGlzLl9pbnN0YWxsTGlzdC5wdXNoKGVudGl0eSk7XG4gIH1cbn07XG5cbmV4cG9ydCBmdW5jdGlvbiBjcmVhdGVDb250ZXh0PFQgZXh0ZW5kcyBJR2VuZXJhbENvbnRleHQ+KGN0eDogVCk6IFQgJiBTeXN0ZW1TY29wZSB7XG4gIGNvbnN0IGhhbmRsZXI6IFByb3h5SGFuZGxlcjxUPiA9IHtcbiAgICBnZXQodGFyZ2V0OiBULCBuYW1lOiBzdHJpbmcsIHJlY2VpdmVyOiBhbnkpIHtcbiAgICAgIGlmIChuYW1lIGluIHRhcmdldClcbiAgICAgICAgcmV0dXJuICh0YXJnZXQgYXMgYW55KVtuYW1lXTtcbiAgICAgIHJldHVybiB0YXJnZXQuZ2V0UHJvcGVydHkobmFtZSk7XG4gICAgfSxcbiAgICBzZXQodGFyZ2V0OiBULCBuYW1lOiBzdHJpbmcsIHZhbHVlOiBhbnkpOiBib29sZWFuIHtcbiAgICAgIHRhcmdldC5zZXRQcm9wZXJ0eShuYW1lLCB2YWx1ZSk7XG4gICAgICByZXR1cm4gdHJ1ZTtcbiAgICB9LFxuICAgIGhhcyh0YXJnZXQ6IFQsIG5hbWU6IHN0cmluZykge1xuICAgICAgcmV0dXJuIG5hbWUgaW4gdGFyZ2V0IHx8IHRhcmdldC5oYXNQcm9wZXJ0eShuYW1lKTtcbiAgICB9LFxuICAgIG93bktleXModGFyZ2V0OiBUKSB7XG4gICAgICByZXR1cm4gdGFyZ2V0LmdldFByb3BlcnR5TmFtZXMoKTtcbiAgICB9LFxuICAgIGRlbGV0ZVByb3BlcnR5KHRhcmdldDogVCwgbmFtZTogc3RyaW5nKSB7XG4gICAgICByZXR1cm4gdGFyZ2V0LmRlbGV0ZVByb3BlcnR5KG5hbWUpO1xuICAgIH0sXG4gICAgZ2V0T3duUHJvcGVydHlEZXNjcmlwdG9yKHRhcmdldDogVCwgbmFtZTogc3RyaW5nKTogUHJvcGVydHlEZXNjcmlwdG9yIHwgdW5kZWZpbmVkIHtcbiAgICAgIGlmICh0YXJnZXQuaGFzUHJvcGVydHkobmFtZSkpIHtcbiAgICAgICAgY29uc3QgdmFsdWUgPSB0YXJnZXQuZ2V0UHJvcGVydHkobmFtZSk7XG4gICAgICAgIHJldHVybiB7IHZhbHVlLCB3cml0YWJsZTogdHJ1ZSwgZW51bWVyYWJsZTogdHJ1ZSwgY29uZmlndXJhYmxlOiB0cnVlIH07XG4gICAgICB9XG4gICAgICByZXR1cm4gdW5kZWZpbmVkO1xuICAgIH0sXG4gIH07XG4gIHJldHVybiBuZXcgUHJveHkoY3R4LCBoYW5kbGVyKSBhcyBUICYgU3lzdGVtU2NvcGU7XG59XG5cbmV4cG9ydCBhc3luYyBmdW5jdGlvbiBwZXJmb3JtQ29udGV4dChtazogSUdlbmVyYWxDb250ZXh0ICYgU3lzdGVtU2NvcGUpIHtcbiAgY29uc3Qgc2NyaXB0VXJsID0gbWsuU0NSSVBUX0ZJTEUudG9KU09OKCk7XG4gIGNvbnN0IG1vZHVsZSA9IGF3YWl0IGltcG9ydE1vZHVsZShzY3JpcHRVcmwpO1xuICBpZiAoIW1vZHVsZS5kZWZhdWx0KVxuICAgIHRocm93IG5ldyBFcnJvcihgU2NyaXB0ICR7c2NyaXB0VXJsfSBoYXMgbm90IGNvbnRhaW4gYSBkZWZhdWx0IGZ1bmN0aW9uYCk7XG5cbiAgY29uc3QgcmVzdWx0ID0gbW9kdWxlLmRlZmF1bHQobWspO1xuICBpZiAocmVzdWx0IGluc3RhbmNlb2YgUHJvbWlzZSlcbiAgICBhd2FpdCByZXN1bHQ7XG59XG5cbmV4cG9ydCBmdW5jdGlvbiBjcmVhdGVWYXJpYWJsZU1hcEZvckRpcmVjdG9yeSh2YXJpYWJsZU1hcDogVmFyaWFibGVNYXAsIHNvdXJjZURpcjogYW55LCBiaW5hcnlEaXI/OiBhbnkpOiBWYXJpYWJsZU1hcCB7XG4gIGlmIChiaW5hcnlEaXIgPT09IHVuZGVmaW5lZCkge1xuICAgIGlmICghQWJzb2x1dGVQYXRoLmlzQWJzb2x1dGUoc291cmNlRGlyKSlcbiAgICAgIGJpbmFyeURpciA9IHNvdXJjZURpcjtcbiAgICBlbHNlIHtcbiAgICAgIGNvbnN0IGJpbmFyeURpcjEgPSBTY29wZUhlbHBlci5nZXQodmFyaWFibGVNYXAsIFwiUFJPSkVDVF9CSU5BUllfRElSXCIpLnJlbGF0aXZlKHNvdXJjZURpcik7XG4gICAgICBjb25zdCBiaW5hcnlEaXIyID0gU2NvcGVIZWxwZXIuZ2V0KHZhcmlhYmxlTWFwLCBcIlBST0pFQ1RfU09VUkNFX0RJUlwiKS5yZWxhdGl2ZShzb3VyY2VEaXIpO1xuICAgICAgYmluYXJ5RGlyID0gKGJpbmFyeURpcjEubGVuZ3RoID4gYmluYXJ5RGlyMi5sZW5ndGgpID8gYmluYXJ5RGlyMiA6IGJpbmFyeURpcjE7XG4gICAgfVxuICB9XG5cbiAgY29uc3QgU09VUkNFX0RJUiA9IFNjb3BlSGVscGVyLmdldCh2YXJpYWJsZU1hcCwgXCJTT1VSQ0VfRElSXCIpLnJlc29sdmUoc291cmNlRGlyKTtcbiAgY29uc3QgQklOQVJZX0RJUiA9IFNjb3BlSGVscGVyLmdldCh2YXJpYWJsZU1hcCwgXCJCSU5BUllfRElSXCIpLnJlc29sdmUoYmluYXJ5RGlyKTtcblxuICBjb25zdCBuZXdWYXJpYWJsZU1hcCA9IFNjb3BlSGVscGVyLmNsb25lVmFyaWFibGVNYXAodmFyaWFibGVNYXApO1xuXG4gIFNjb3BlSGVscGVyLnNldChuZXdWYXJpYWJsZU1hcCwgXCJTT1VSQ0VfRElSXCIsIFNPVVJDRV9ESVIpO1xuICBTY29wZUhlbHBlci5zZXQobmV3VmFyaWFibGVNYXAsIFwiQklOQVJZX0RJUlwiLCBCSU5BUllfRElSKTtcbiAgU2NvcGVIZWxwZXIucmVzZXQobmV3VmFyaWFibGVNYXAsIFwiU0NSSVBUX0RJUlwiKTtcbiAgU2NvcGVIZWxwZXIucmVzZXQobmV3VmFyaWFibGVNYXAsIFwiU0NSSVBUX0ZJTEVcIik7XG5cbiAgcmV0dXJuIG5ld1ZhcmlhYmxlTWFwO1xufVxuIiwiLypcbiAqIE1JVCBMaWNlbnNlXG4gKlxuICogQ29weXJpZ2h0IChjKSAyMDI1ICBZdXJpaSBZYWt1YmluICh5dXJpaS55YWt1YmluQGdtYWlsLmNvbSlcbiAqXG4gKiBQZXJtaXNzaW9uIGlzIGdyYW50ZWQgdG8gdXNlLCBjb3B5LCBtb2RpZnksIGFuZCBkaXN0cmlidXRlIHRoaXMgc29mdHdhcmVcbiAqIHVuZGVyIHRoZSBNSVQgTGljZW5zZS4gU2VlIExJQ0VOU0UgZmlsZSBmb3IgZGV0YWlscy5cbiAqL1xuXG5pbXBvcnQgZnMgZnJvbSBcIm5vZGU6ZnNcIjtcblxuaW1wb3J0IHsgZ2VuZXJhdGVkU2NyaXB0TmFtZUNvbW1lbnQgfSBmcm9tIFwiQC9jeHhcIjtcblxuZXhwb3J0IGRlZmF1bHQgYXN5bmMgZnVuY3Rpb24obWs6IGFueSkge1xuICBjb25zdCBsaW5lcyA9IFtdO1xuXG4gIGxpbmVzLnB1c2goZ2VuZXJhdGVkU2NyaXB0TmFtZUNvbW1lbnQoaW1wb3J0Lm1ldGEuZmlsZW5hbWUpKTtcbiAgbGluZXMucHVzaChcIlwiKTtcblxuICBmb3IgKGNvbnN0IFtuYW1lLCBlbnRyeV0gb2YgT2JqZWN0LmVudHJpZXMobWsuU0NSSVBUX0lOUFVUKSBhcyBhbnkpIHtcbiAgICBpZiAoZW50cnkuZGVzY3JpcHRpb24pIHtcbiAgICAgIGxpbmVzLnB1c2goYC8qICR7ZW50cnkuZGVzY3JpcHRpb259ICovYCk7XG4gICAgfVxuICAgIGlmICh0eXBlb2YgZW50cnkudmFsdWUgPT09IFwiYm9vbGVhblwiKSB7XG4gICAgICBsaW5lcy5wdXNoKGAjZGVmaW5lICR7bmFtZX0gJHtlbnRyeS52YWx1ZSA/IDEgOiAwfWApO1xuICAgIH1cbiAgICBlbHNlIGlmICh0eXBlb2YgZW50cnkudmFsdWUgPT09IFwibnVtYmVyXCIpIHtcbiAgICAgIGxpbmVzLnB1c2goYCNkZWZpbmUgJHtuYW1lfSAke2VudHJ5LnZhbHVlfWApO1xuICAgIH1cbiAgICBlbHNlIGlmICh0eXBlb2YgZW50cnkudmFsdWUgPT09IFwic3RyaW5nXCIpIHtcbiAgICAgIGxpbmVzLnB1c2goYCNkZWZpbmUgJHtuYW1lfSBcIiR7ZW50cnkudmFsdWV9XCJgKTtcbiAgICB9XG4gICAgZWxzZSBpZiAoQXJyYXkuaXNBcnJheShlbnRyeS52YWx1ZSkpIHtcbiAgICAgIGxpbmVzLnB1c2goYCNkZWZpbmUgJHtuYW1lfSBcIiR7ZW50cnkudmFsdWUuam9pbihcIjtcIil9XCJgKTtcbiAgICB9XG4gICAgZWxzZSB7XG4gICAgICB0aHJvdyBuZXcgRXJyb3IoYFwiJHtuYW1lfVwiIGhhcyAke2VudHJ5LnZhbHVlfSB2YWx1ZWApO1xuICAgIH1cbiAgICBsaW5lcy5wdXNoKFwiXCIpO1xuICB9XG5cbiAgYXdhaXQgZnMucHJvbWlzZXMubWtkaXIobWsuU0NSSVBUX09VVFBVVC5kaXJuYW1lKCkudG9TdHJpbmcoKSwgeyByZWN1cnNpdmU6IHRydWUgfSk7XG4gIGF3YWl0IGZzLnByb21pc2VzLndyaXRlRmlsZShtay5TQ1JJUFRfT1VUUFVULnRvU3RyaW5nKCksIGxpbmVzLmpvaW4oXCJcXG5cIiksIFwidXRmLThcIik7XG59XG4iLCIvKlxuICogTUlUIExpY2Vuc2VcbiAqXG4gKiBDb3B5cmlnaHQgKGMpIDIwMjUgIFl1cmlpIFlha3ViaW4gKHl1cmlpLnlha3ViaW5AZ21haWwuY29tKVxuICpcbiAqIFBlcm1pc3Npb24gaXMgZ3JhbnRlZCB0byB1c2UsIGNvcHksIG1vZGlmeSwgYW5kIGRpc3RyaWJ1dGUgdGhpcyBzb2Z0d2FyZVxuICogdW5kZXIgdGhlIE1JVCBMaWNlbnNlLiBTZWUgTElDRU5TRSBmaWxlIGZvciBkZXRhaWxzLlxuICovXG5cbmltcG9ydCBmcyBmcm9tIFwibm9kZTpmc1wiO1xuXG5leHBvcnQgZGVmYXVsdCBhc3luYyBmdW5jdGlvbihtazogYW55KSB7XG4gIGxldCBjb250ZW50ID0gYXdhaXQgZnMucHJvbWlzZXMucmVhZEZpbGUobWsuU0NSSVBUX0lOUFVULnRvU3RyaW5nKCksIFwidXRmLThcIik7XG4gIGNvbnRlbnQgPSBjb250ZW50LnJlcGxhY2UoL0AoW19BLVphLXpdW19BLVphLXowLTldKylAL2csIChtYXRjaCwgdjEpID0+IHtcbiAgICBjb25zdCByZXMgPSBta1t2MV0gfHwgXCJcIjtcbiAgICBpZiAoQXJyYXkuaXNBcnJheShyZXMpKVxuICAgICAgcmV0dXJuIHJlcy5qb2luKFwiXFxuXCIpO1xuICAgIHJldHVybiByZXMudG9TdHJpbmcoKTtcbiAgfSk7XG4gIGNvbnRlbnQgPSBjb250ZW50LnJlcGxhY2UoLyNjbWFrZWRlZmluZSArKFtfQS1aYS16XVtfQS1aYS16MC05XSspICooLiopL2csIChtYXRjaCwgdjEsIHYyKSA9PiB7XG4gICAgcmV0dXJuIG1rW3YxXSA/IGAjZGVmaW5lICR7djF9ICR7djJ9YCA6IGAvKiAjdW5kZWYgJHt2MX0gKi9gO1xuICB9KTtcbiAgYXdhaXQgZnMucHJvbWlzZXMubWtkaXIobWsuU0NSSVBUX09VVFBVVC5kaXJuYW1lKCkudG9TdHJpbmcoKSwgeyByZWN1cnNpdmU6IHRydWUgfSk7XG4gIGF3YWl0IGZzLnByb21pc2VzLndyaXRlRmlsZShtay5TQ1JJUFRfT1VUUFVULnRvU3RyaW5nKCksIGNvbnRlbnQsIFwidXRmLThcIik7XG59XG4iLCIvKlxuICogTUlUIExpY2Vuc2VcbiAqXG4gKiBDb3B5cmlnaHQgKGMpIDIwMjUgIFl1cmlpIFlha3ViaW4gKHl1cmlpLnlha3ViaW5AZ21haWwuY29tKVxuICpcbiAqIFBlcm1pc3Npb24gaXMgZ3JhbnRlZCB0byB1c2UsIGNvcHksIG1vZGlmeSwgYW5kIGRpc3RyaWJ1dGUgdGhpcyBzb2Z0d2FyZVxuICogdW5kZXIgdGhlIE1JVCBMaWNlbnNlLiBTZWUgTElDRU5TRSBmaWxlIGZvciBkZXRhaWxzLlxuICovXG5cbmltcG9ydCBjb25maWd1cmVfZmlsZSBmcm9tIFwiQC9jb3JlL0J1aWxkaW5TY3JpcHRzL2NvbmZpZ3VyZV9maWxlXCI7XG5pbXBvcnQgY19oZWFkZXIgZnJvbSBcIkAvY29yZS9CdWlsZGluU2NyaXB0cy9jX2hlYWRlclwiO1xuXG5leHBvcnQgZGVmYXVsdCB7XG4gIGNvbmZpZ3VyZV9maWxlLFxuICBjX2hlYWRlcixcbn07XG4iLCIvKlxuICogTUlUIExpY2Vuc2VcbiAqXG4gKiBDb3B5cmlnaHQgKGMpIDIwMjUgIFl1cmlpIFlha3ViaW4gKHl1cmlpLnlha3ViaW5AZ21haWwuY29tKVxuICpcbiAqIFBlcm1pc3Npb24gaXMgZ3JhbnRlZCB0byB1c2UsIGNvcHksIG1vZGlmeSwgYW5kIGRpc3RyaWJ1dGUgdGhpcyBzb2Z0d2FyZVxuICogdW5kZXIgdGhlIE1JVCBMaWNlbnNlLiBTZWUgTElDRU5TRSBmaWxlIGZvciBkZXRhaWxzLlxuICovXG5cbmltcG9ydCB7IEludGVyZmFjZVNjcmlwdCB9IGZyb20gXCJAL2NvcmUvTWFrZUludGVyZmFjZXNcIjtcbmltcG9ydCB7IEFic29sdXRlUGF0aCB9IGZyb20gXCJAL2NvcmUvQWJzb2x1dGVQYXRoXCI7XG5pbXBvcnQgeyBTY29wZUhlbHBlciwgVmFyaWFibGVNYXAsIFZhcmlhbnRNYXAgfSBmcm9tIFwiQC9jb3JlL1Njb3BlXCI7XG5pbXBvcnQgeyBTaW1wbGVPYmplY3QgfSBmcm9tIFwiQC9jb3JlL1NpbXBsZU9iamVjdFwiO1xuXG5leHBvcnQgY2xhc3MgUG9zdEN1c3RvbVNjcmlwdCBleHRlbmRzIEludGVyZmFjZVNjcmlwdCB7XG4gIHByaXZhdGUgX25hbWU6IHN0cmluZztcbiAgcHJpdmF0ZSBfdmFyaWFibGVzOiBWYXJpYW50TWFwO1xuXG4gIHByaXZhdGUgY29uc3RydWN0b3IobmFtZTogc3RyaW5nLCB2YXJpYWJsZXM/OiBWYXJpYW50TWFwKSB7XG4gICAgc3VwZXIoKTtcbiAgICB0aGlzLl9uYW1lID0gbmFtZTtcbiAgICB0aGlzLl92YXJpYWJsZXMgPSB2YXJpYWJsZXMgfHwge307XG4gIH1cblxuICBwdWJsaWMgc3RhdGljIGNyZWF0ZShuYW1lOiBzdHJpbmcsIHZhcmlhYmxlcz86IFZhcmlhbnRNYXApIHtcbiAgICByZXR1cm4gT2JqZWN0LnNlYWwobmV3IFBvc3RDdXN0b21TY3JpcHQobmFtZSwgdmFyaWFibGVzKSk7XG4gIH1cblxuICBwdWJsaWMgZ2V0IG5hbWUoKSB7XG4gICAgcmV0dXJuIHRoaXMuX25hbWU7XG4gIH1cblxuICBwdWJsaWMgZ2V0IHZhcmlhYmxlcygpIHtcbiAgICByZXR1cm4gdGhpcy5fdmFyaWFibGVzO1xuICB9XG5cbiAgcHVibGljIG1lcmdlVmFyaWFibGVzKHZhcmlhYmxlczogVmFyaWFudE1hcCkge1xuICAgIFNjb3BlSGVscGVyLm1lcmdlVmFyaWFibGVzKHRoaXMuX3ZhcmlhYmxlcywgdmFyaWFibGVzKTtcbiAgfVxuXG4gIHB1YmxpYyBzdGF0aWMgZnJvbUpTT04oanNvbjogYW55KSB7XG4gICAgcmV0dXJuIFBvc3RDdXN0b21TY3JpcHQuY3JlYXRlKGpzb24ubmFtZSwganNvbi52YXJpYWJsZXMpO1xuICB9XG5cbiAgcHVibGljIHRvSlNPTigpOiBTaW1wbGVPYmplY3Qge1xuICAgIHJldHVybiB7XG4gICAgICB0eXBlOiBQb3N0Q3VzdG9tU2NyaXB0Lm5hbWUsXG4gICAgICBuYW1lOiB0aGlzLl9uYW1lLFxuICAgICAgdmFyaWFibGVzOiB0aGlzLl92YXJpYWJsZXMsXG4gICAgfTtcbiAgfVxuICBcbiAgcHVibGljIHRvU3RyaW5nKCk6IHN0cmluZyB7XG4gICAgcmV0dXJuIGBbb2JqZWN0ICR7UG9zdEN1c3RvbVNjcmlwdC5uYW1lfV1gO1xuICB9XG59O1xuXG5leHBvcnQgY2xhc3MgQ3VzdG9tU2NyaXB0IGV4dGVuZHMgSW50ZXJmYWNlU2NyaXB0IHtcbiAgcHJpdmF0ZSBfbmFtZTogc3RyaW5nO1xuICBwcml2YXRlIF9zY3JpcHRNb2R1bGU6IHN0cmluZyB8IEFic29sdXRlUGF0aDtcbiAgcHJpdmF0ZSBfaW5wdXQ/OiBBYnNvbHV0ZVBhdGg7XG4gIHByaXZhdGUgX291dHB1dDogQWJzb2x1dGVQYXRoO1xuICBwcml2YXRlIF9zb3VyY2VEaXI6IEFic29sdXRlUGF0aDtcbiAgcHJpdmF0ZSBfYmluYXJ5RGlyOiBBYnNvbHV0ZVBhdGg7XG4gIHByaXZhdGUgX3ZhcmlhYmxlTWFwOiBWYXJpYWJsZU1hcDtcblxuICBwcml2YXRlIGNvbnN0cnVjdG9yKG9wdGlvbnM6IEN1c3RvbVNjcmlwdC5PcHRpb25zKSB7XG4gICAgc3VwZXIoKTtcbiAgICB0aGlzLl92YXJpYWJsZU1hcCA9IG9wdGlvbnMudmFyaWFibGVNYXA7XG4gICAgdGhpcy5fbmFtZSA9IG9wdGlvbnMubmFtZTtcbiAgICB0aGlzLl9pbnB1dCA9IG9wdGlvbnMuaW5wdXQ7XG4gICAgdGhpcy5fc2NyaXB0TW9kdWxlID0gb3B0aW9ucy5zY3JpcHRNb2R1bGU7XG4gICAgdGhpcy5fb3V0cHV0ID0gb3B0aW9ucy5vdXRwdXQ7XG4gICAgdGhpcy5fc291cmNlRGlyID0gb3B0aW9ucy5zb3VyY2VEaXI7XG4gICAgdGhpcy5fYmluYXJ5RGlyID0gb3B0aW9ucy5iaW5hcnlEaXI7XG4gIH1cblxuICBwdWJsaWMgc3RhdGljIGNyZWF0ZShvcHRpb25zOiBDdXN0b21TY3JpcHQuT3B0aW9ucyk6IEN1c3RvbVNjcmlwdCB7XG4gICAgcmV0dXJuIE9iamVjdC5zZWFsKG5ldyBDdXN0b21TY3JpcHQob3B0aW9ucykpO1xuICB9XG5cbiAgcHVibGljIG1lcmdlVmFyaWFibGVzKHZhcmlhYmxlczogVmFyaWFudE1hcCkge1xuICAgIFNjb3BlSGVscGVyLm1lcmdlVmFyaWFibGVNYXAodGhpcy5fdmFyaWFibGVNYXAsIHZhcmlhYmxlcyk7XG4gIH1cblxuICBwdWJsaWMgZ2V0IE5BTUUoKSB7XG4gICAgcmV0dXJuIHRoaXMuX25hbWU7XG4gIH1cblxuICBwdWJsaWMgZ2V0IHNjcmlwdE1vZHVsZSgpIHtcbiAgICByZXR1cm4gdGhpcy5fc2NyaXB0TW9kdWxlO1xuICB9XG5cbiAgcHVibGljIGdldCBJTlBVVCgpOiBBYnNvbHV0ZVBhdGggfCB1bmRlZmluZWQge1xuICAgIHJldHVybiB0aGlzLl9pbnB1dDtcbiAgfVxuXG4gIHB1YmxpYyBnZXQgT1VUUFVUKCk6IEFic29sdXRlUGF0aCB7XG4gICAgcmV0dXJuIHRoaXMuX291dHB1dDtcbiAgfVxuXG4gIHB1YmxpYyBnZXQgc291cmNlRGlyKCk6IEFic29sdXRlUGF0aCB7XG4gICAgcmV0dXJuIHRoaXMuX3NvdXJjZURpcjtcbiAgfVxuXG4gIHB1YmxpYyBnZXQgYmluYXJ5RGlyKCk6IEFic29sdXRlUGF0aCB7XG4gICAgcmV0dXJuIHRoaXMuX2JpbmFyeURpcjtcbiAgfVxuXG4gIHB1YmxpYyBnZXQgdmFyaWFibGVNYXAoKSB7XG4gICAgcmV0dXJuIHRoaXMuX3ZhcmlhYmxlTWFwO1xuICB9XG5cbiAgcHVibGljIHBvc3RVcGRhdGUoc2NyaXB0OiBQb3N0Q3VzdG9tU2NyaXB0KSB7XG4gICAgdGhpcy5tZXJnZVZhcmlhYmxlcyhzY3JpcHQudmFyaWFibGVzKTtcbiAgfVxuXG4gIHB1YmxpYyBzdGF0aWMgZnJvbUpTT04oanNvbjogYW55KSB7XG4gICAgY29uc3Qgb3B0aW9uczogQ3VzdG9tU2NyaXB0Lk9wdGlvbnMgPSB7XG4gICAgICB2YXJpYWJsZU1hcDogU2NvcGVIZWxwZXIuZnJvbUpTT04oanNvbi52YXJpYWJsZU1hcCksXG4gICAgICBuYW1lOiBqc29uLm5hbWUsXG4gICAgICBzY3JpcHRNb2R1bGU6IEFic29sdXRlUGF0aC5pc0Fic29sdXRlKGpzb24uc2NyaXB0TW9kdWxlKSA/IEFic29sdXRlUGF0aC5jcmVhdGUoanNvbi5zY3JpcHRNb2R1bGUpIDoganNvbi5zY3JpcHRNb2R1bGUsXG4gICAgICBvdXRwdXQ6IEFic29sdXRlUGF0aC5jcmVhdGUoanNvbi5vdXRwdXQpLFxuICAgICAgc291cmNlRGlyOiBBYnNvbHV0ZVBhdGguY3JlYXRlKGpzb24uc291cmNlRGlyKSxcbiAgICAgIGJpbmFyeURpcjogQWJzb2x1dGVQYXRoLmNyZWF0ZShqc29uLmJpbmFyeURpciksXG4gICAgfTtcbiAgICBpZiAoanNvbi5pbnB1dCkge1xuICAgICAgb3B0aW9ucy5pbnB1dCA9IEFic29sdXRlUGF0aC5jcmVhdGUoanNvbi5pbnB1dCk7XG4gICAgfVxuICAgIHJldHVybiBDdXN0b21TY3JpcHQuY3JlYXRlKG9wdGlvbnMpO1xuICB9XG5cbiAgcHVibGljIHRvSlNPTigpOiBTaW1wbGVPYmplY3Qge1xuICAgIGNvbnN0IHJlc3VsdDogU2ltcGxlT2JqZWN0ID0ge1xuICAgICAgdHlwZTogQ3VzdG9tU2NyaXB0Lm5hbWUsXG4gICAgICBuYW1lOiB0aGlzLl9uYW1lLFxuICAgICAgc2NyaXB0TW9kdWxlOiB0aGlzLl9zY3JpcHRNb2R1bGUsXG4gICAgICBvdXRwdXQ6IHRoaXMuX291dHB1dC50b1VSTFN0cmluZygpLFxuICAgICAgc291cmNlRGlyOiB0aGlzLl9zb3VyY2VEaXIudG9VUkxTdHJpbmcoKSxcbiAgICAgIGJpbmFyeURpcjogdGhpcy5fYmluYXJ5RGlyLnRvVVJMU3RyaW5nKCksXG4gICAgICB2YXJpYWJsZU1hcDogU2NvcGVIZWxwZXIudG9KU09OKHRoaXMuX3ZhcmlhYmxlTWFwKSxcbiAgICB9O1xuICAgIGlmICh0aGlzLl9pbnB1dCkge1xuICAgICAgcmVzdWx0LmlucHV0ID0gdGhpcy5faW5wdXQudG9VUkxTdHJpbmcoKTtcbiAgICB9XG4gICAgcmV0dXJuIHJlc3VsdDtcbiAgfVxufTtcblxuZXhwb3J0IG5hbWVzcGFjZSBDdXN0b21TY3JpcHQge1xuXG5leHBvcnQgaW50ZXJmYWNlIE9wdGlvbnMge1xuICBuYW1lOiBzdHJpbmcsXG4gIHNjcmlwdE1vZHVsZTogc3RyaW5nIHwgQWJzb2x1dGVQYXRoLFxuICBpbnB1dD86IEFic29sdXRlUGF0aCxcbiAgb3V0cHV0OiBBYnNvbHV0ZVBhdGgsXG4gIHNvdXJjZURpcjogQWJzb2x1dGVQYXRoLFxuICBiaW5hcnlEaXI6IEFic29sdXRlUGF0aCxcbiAgdmFyaWFibGVNYXA6IFZhcmlhYmxlTWFwLFxufTtcblxufSAvLyBuYW1lc3BhY2UgQ3VzdG9tU2NyaXB0XG4iLCIvKlxuICogTUlUIExpY2Vuc2VcbiAqXG4gKiBDb3B5cmlnaHQgKGMpIDIwMjUgIFl1cmlpIFlha3ViaW4gKHl1cmlpLnlha3ViaW5AZ21haWwuY29tKVxuICpcbiAqIFBlcm1pc3Npb24gaXMgZ3JhbnRlZCB0byB1c2UsIGNvcHksIG1vZGlmeSwgYW5kIGRpc3RyaWJ1dGUgdGhpcyBzb2Z0d2FyZVxuICogdW5kZXIgdGhlIE1JVCBMaWNlbnNlLiBTZWUgTElDRU5TRSBmaWxlIGZvciBkZXRhaWxzLlxuICovXG5cbmltcG9ydCB7IGZpbmRQcm9ncmFtIH0gZnJvbSBcIkAvY29yZS9GaW5kUHJvZ3JhbVwiO1xuaW1wb3J0IHsgU3lzdGVtU2NvcGUgfSBmcm9tIFwiQC9jb3JlL1N5c3RlbVNjb3BlXCI7XG5pbXBvcnQgeyBMb2dnZXIgfSBmcm9tIFwiQC9sb2dnZXJcIjtcblxuY29uc3QgbG9nZ2VyID0gTG9nZ2VyLmNyZWF0ZShpbXBvcnQubWV0YS51cmwpO1xuXG5leHBvcnQgYXN5bmMgZnVuY3Rpb24gZGV0ZXJtaW5lQ29tcGlsZXIoc2NvcGU6IFN5c3RlbVNjb3BlKSB7XG4gIGNvbnN0IGNsYW5nUGF0aCA9IGF3YWl0IGZpbmRQcm9ncmFtKFwiY2xhbmdcIik7XG4gIGlmIChjbGFuZ1BhdGgpIHtcbiAgICBsb2dnZXIuaW5mbyhcIlRoZSBDIGNvbXBpbGVyIGlkZW50aWZpY2F0aW9uIGlzIENsYW5nIGEuYi5jXCIpO1xuICAgIHNjb3BlLkFTTV9DT01QSUxFUiA9IFwiY2xhbmdcIjtcbiAgICBzY29wZS5DX0NPTVBJTEVSID0gXCJjbGFuZ1wiO1xuICAgIHNjb3BlLkNYWF9DT01QSUxFUiA9IFwiY2xhbmcrK1wiO1xuICAgIHNjb3BlLkFSID0gXCJsbHZtLWFyXCI7XG4gICAgc2NvcGUuUkFOTElCID0gXCJsbHZtLXJhbmxpYlwiO1xuICAgIHNjb3BlLkxJTktFUiA9IFwibGxkXCI7XG4gICAgc2NvcGUuTk0gPSBcImxsdm0tbm1cIjtcbiAgICBzY29wZS5PQkpDT1BZID0gXCJsbHZtLW9iamNvcHlcIjtcbiAgICBzY29wZS5PQkpEVU1QID0gXCJsbHZtLW9iamR1bXBcIjtcbiAgICBzY29wZS5TVFJJUCA9IFwibGx2bS1zdHJpcFwiO1xuICAgIHJldHVybjtcbiAgfVxuXG4gIGNvbnN0IGdjY1BhdGggPSBhd2FpdCBmaW5kUHJvZ3JhbShcImdjY1wiKTtcbiAgaWYgKGdjY1BhdGgpIHtcbiAgICBsb2dnZXIuaW5mbyhcIlRoZSBDIGNvbXBpbGVyIGlkZW50aWZpY2F0aW9uIGlzIEdOVSBhLmIuY1wiKTtcbiAgICBzY29wZS5BU01fQ09NUElMRVIgPSBcImdjY1wiO1xuICAgIHNjb3BlLkNfQ09NUElMRVIgPSBcImdjY1wiO1xuICAgIHNjb3BlLkNYWF9DT01QSUxFUiA9IFwiZysrXCI7XG4gICAgc2NvcGUuQVIgPSBcImFyXCI7XG4gICAgc2NvcGUuUkFOTElCID0gXCJyYW5saWJcIjtcbiAgICBzY29wZS5MSU5LRVIgPSBcImxkXCI7XG4gICAgc2NvcGUuTk0gPSBcIm5tXCI7XG4gICAgc2NvcGUuT0JKQ09QWSA9IFwib2JqY29weVwiO1xuICAgIHNjb3BlLk9CSkRVTVAgPSBcIm9iamR1bXBcIjtcbiAgICBzY29wZS5TVFJJUCA9IFwic3RyaXBcIjtcbiAgICByZXR1cm47XG4gIH1cblxuICB0aHJvdyBgQ2FuIG5vdCBkZXRlcm1pbmUgY29tcGlsZXJgO1xufVxuIiwiLypcbiAqIE1JVCBMaWNlbnNlXG4gKlxuICogQ29weXJpZ2h0IChjKSAyMDI1ICBZdXJpaSBZYWt1YmluICh5dXJpaS55YWt1YmluQGdtYWlsLmNvbSlcbiAqXG4gKiBQZXJtaXNzaW9uIGlzIGdyYW50ZWQgdG8gdXNlLCBjb3B5LCBtb2RpZnksIGFuZCBkaXN0cmlidXRlIHRoaXMgc29mdHdhcmVcbiAqIHVuZGVyIHRoZSBNSVQgTGljZW5zZS4gU2VlIExJQ0VOU0UgZmlsZSBmb3IgZGV0YWlscy5cbiAqL1xuXG5pbXBvcnQgeyBJbnRlcmZhY2VUYXNrIH0gZnJvbSBcIkAvY29yZS9NYWtlSW50ZXJmYWNlc1wiO1xuaW1wb3J0IHsgQWJzb2x1dGVQYXRoIH0gZnJvbSBcIkAvY29yZS9BYnNvbHV0ZVBhdGhcIjtcbmltcG9ydCB7IGltcG9ydE1vZHVsZSB9IGZyb20gXCJAL3V0aWxzL01vZHVsZVwiO1xuaW1wb3J0IHsgVmFyaWFibGVNYXAgfSBmcm9tIFwiQC9jb3JlL1Njb3BlXCI7XG5pbXBvcnQgeyBTY3JpcHRDb250ZXh0IH0gZnJvbSBcIkAvY29yZS9TY3JpcHRDb250ZXh0XCI7XG5pbXBvcnQgeyBTaW1wbGVPYmplY3QgfSBmcm9tIFwiQC9jb3JlL1NpbXBsZU9iamVjdFwiO1xuaW1wb3J0IHsgTG9nZ2VyIH0gZnJvbSBcIkAvbG9nZ2VyXCI7XG5cbmNvbnN0IGxvZ2dlciA9IExvZ2dlci5jcmVhdGUoaW1wb3J0Lm1ldGEudXJsKTtcblxuZXhwb3J0IGNsYXNzIEV4ZWNTY3JpcHRUYXNrIGV4dGVuZHMgSW50ZXJmYWNlVGFzayB7XG4gIHByaXZhdGUgX3ZhcmlhYmxlTWFwOiBWYXJpYWJsZU1hcDtcbiAgcHJpdmF0ZSBfc2NyaXB0OiBBYnNvbHV0ZVBhdGggfCBGdW5jdGlvbjtcblxuICBwdWJsaWMgY29uc3RydWN0b3IodmFyaWFibGVNYXA6IFZhcmlhYmxlTWFwLCBzY3JpcHQ6IEFic29sdXRlUGF0aCB8IEZ1bmN0aW9uKSB7XG4gICAgc3VwZXIoKTtcbiAgICB0aGlzLl92YXJpYWJsZU1hcCA9IHZhcmlhYmxlTWFwO1xuICAgIHRoaXMuX3NjcmlwdCA9IHNjcmlwdDtcbiAgfVxuXG4gIHB1YmxpYyBhc3luYyBleGVjdXRlKCk6IFByb21pc2U8dm9pZD4ge1xuICAgIGxldCBmdW5jID0gdGhpcy5fc2NyaXB0O1xuICAgIGlmIChmdW5jIGluc3RhbmNlb2YgQWJzb2x1dGVQYXRoKSB7XG4gICAgICBjb25zdCBzY3JpcHRVcmwgPSBmdW5jLnRvSlNPTigpOyAvLyBUT0RPOiB0b1N0cmluZygpXG4gICAgICBsb2dnZXIuZGVidWcoXCJJbXBvcnRcIiwgc2NyaXB0VXJsKTtcbiAgICAgIGZ1bmMgPSAoYXdhaXQgaW1wb3J0TW9kdWxlKHNjcmlwdFVybCkpLmRlZmF1bHQ7XG4gICAgfVxuICAgIGlmIChmdW5jIGluc3RhbmNlb2YgRnVuY3Rpb24pIHtcbiAgICAgIGNvbnN0IG1rID0gU2NyaXB0Q29udGV4dC5jcmVhdGUodGhpcy5fdmFyaWFibGVNYXApO1xuICAgICAgY29uc3QgcmVzdWx0ID0gZnVuYyhtayk7XG4gICAgICBpZiAocmVzdWx0IGluc3RhbmNlb2YgUHJvbWlzZSlcbiAgICAgICAgYXdhaXQgcmVzdWx0O1xuICAgIH1cbiAgICBlbHNlIHtcbiAgICAgIHRocm93IG5ldyBFcnJvcihgVGhlcmUgaXMgbm8gRnVuY3Rpb25gKTtcbiAgICB9XG4gIH1cblxuICBwdWJsaWMgdG9KU09OKCk6IFNpbXBsZU9iamVjdCB7XG4gICAgcmV0dXJuIHtcbiAgICAgIHR5cGU6IEV4ZWNTY3JpcHRUYXNrLm5hbWUsXG4gICAgICB2YXJpYWJsZU1hcDogdGhpcy5fdmFyaWFibGVNYXAsXG4gICAgICBzY3JpcHQ6IHRoaXMuX3NjcmlwdCxcbiAgICB9XG4gIH1cbn07XG4iLCIvKlxuICogTUlUIExpY2Vuc2VcbiAqXG4gKiBDb3B5cmlnaHQgKGMpIDIwMjUgIFl1cmlpIFlha3ViaW4gKHl1cmlpLnlha3ViaW5AZ21haWwuY29tKVxuICpcbiAqIFBlcm1pc3Npb24gaXMgZ3JhbnRlZCB0byB1c2UsIGNvcHksIG1vZGlmeSwgYW5kIGRpc3RyaWJ1dGUgdGhpcyBzb2Z0d2FyZVxuICogdW5kZXIgdGhlIE1JVCBMaWNlbnNlLiBTZWUgTElDRU5TRSBmaWxlIGZvciBkZXRhaWxzLlxuICovXG5cbmltcG9ydCBmcyBmcm9tIFwibm9kZTpmc1wiO1xuXG5pbXBvcnQgeyBJbnRlcmZhY2VUYXNrIH0gZnJvbSBcIkAvY29yZS9NYWtlSW50ZXJmYWNlc1wiO1xuaW1wb3J0IHsgQWJzb2x1dGVQYXRoIH0gZnJvbSBcIkAvY29yZS9BYnNvbHV0ZVBhdGhcIjtcbmltcG9ydCB7IFNpbXBsZU9iamVjdCB9IGZyb20gXCJAL2NvcmUvU2ltcGxlT2JqZWN0XCI7XG5pbXBvcnQgeyBMb2dnZXIgfSBmcm9tIFwiQC9sb2dnZXJcIjtcblxuY29uc3QgbG9nZ2VyID0gTG9nZ2VyLmNyZWF0ZShpbXBvcnQubWV0YS51cmwpO1xuXG5pbnRlcmZhY2UgRW50cnkge1xuICBzcmM6IEFic29sdXRlUGF0aDtcbiAgZGVzdDogQWJzb2x1dGVQYXRoO1xufTtcblxuZXhwb3J0IGNsYXNzIEZpbGVJbnN0YWxsYXRpb25UYXNrIGV4dGVuZHMgSW50ZXJmYWNlVGFzayB7XG4gIHByaXZhdGUgX2VudHJpZXM6IEVudHJ5W107XG5cbiAgcHVibGljIGNvbnN0cnVjdG9yKCkge1xuICAgIHN1cGVyKCk7XG4gICAgdGhpcy5fZW50cmllcyA9IFtdO1xuICB9XG5cbiAgcHVibGljIGFzeW5jIGV4ZWN1dGUoKTogUHJvbWlzZTx2b2lkPiB7XG4gICAgZm9yIChjb25zdCB7c3JjLCBkZXN0fSBvZiB0aGlzLl9lbnRyaWVzKSB7XG4gICAgICBsb2dnZXIubm90aWNlKFwiSW5zdGFsbGluZzogXCIgKyBkZXN0KTtcbiAgICAgIGF3YWl0IGZzLnByb21pc2VzLm1rZGlyKGRlc3QuZGlybmFtZSgpLnRvUGF0aCgpLCB7IHJlY3Vyc2l2ZTogdHJ1ZSB9KTtcbiAgICAgIGF3YWl0IGZzLnByb21pc2VzLmNwKHNyYy50b1BhdGgoKSwgZGVzdC50b1BhdGgoKSwgeyBmb3JjZTogdHJ1ZSB9KTtcbiAgICB9XG4gIH1cblxuICBwdWJsaWMgYWRkKHNyYzogQWJzb2x1dGVQYXRoLCBkZXN0OiBBYnNvbHV0ZVBhdGgpIHtcbiAgICB0aGlzLl9lbnRyaWVzLnB1c2goe3NyYywgZGVzdH0pO1xuICB9XG5cbiAgcHVibGljIHN0YXRpYyBmcm9tSlNPTihvOiBTaW1wbGVPYmplY3QpIHtcbiAgICBjb25zdCB0YXNrID0gbmV3IEZpbGVJbnN0YWxsYXRpb25UYXNrO1xuICAgIGZvciAoY29uc3QgaXRlciBvZiAobyBhcyBhbnkpLmVudHJpZXMgYXMgRW50cnlbXSlcbiAgICAgIHRhc2suX2VudHJpZXMucHVzaChpdGVyKTtcbiAgICByZXR1cm4gdGFzaztcbiAgfVxuXG4gIHB1YmxpYyB0b0pTT04oKTogU2ltcGxlT2JqZWN0IHtcbiAgICByZXR1cm4ge1xuICAgICAgdHlwZTogRmlsZUluc3RhbGxhdGlvblRhc2submFtZSxcbiAgICAgIGVudHJpZXM6IHRoaXMuX2VudHJpZXMsXG4gICAgfVxuICB9XG59O1xuIiwiLypcbiAqIE1JVCBMaWNlbnNlXG4gKlxuICogQ29weXJpZ2h0IChjKSAyMDI1ICBZdXJpaSBZYWt1YmluICh5dXJpaS55YWt1YmluQGdtYWlsLmNvbSlcbiAqXG4gKiBQZXJtaXNzaW9uIGlzIGdyYW50ZWQgdG8gdXNlLCBjb3B5LCBtb2RpZnksIGFuZCBkaXN0cmlidXRlIHRoaXMgc29mdHdhcmVcbiAqIHVuZGVyIHRoZSBNSVQgTGljZW5zZS4gU2VlIExJQ0VOU0UgZmlsZSBmb3IgZGV0YWlscy5cbiAqL1xuXG5pbXBvcnQgeyBQYXRoIH0gZnJvbSBcIkAvdXRpbHMvUGF0aFwiO1xuaW1wb3J0IHsgSG9zdCB9IGZyb20gXCJAL3V0aWxzL0hvc3RcIjtcbmltcG9ydCB7IGZpbGVFeGlzdHMsIGZpbGVFeGlzdHNTeW5jIH0gZnJvbSBcIkAvdXRpbHMvRmlsZVN5c3RlbVwiO1xuXG5mdW5jdGlvbiBwb3NzaWJsZVByb2dyYW1MaXN0KG5hbWU6IHN0cmluZykge1xuICBpZiAoSG9zdC5leGVjdXRhYmxlU3VmZml4KVxuICAgIG5hbWUgKz0gSG9zdC5leGVjdXRhYmxlU3VmZml4O1xuXG4gIGNvbnN0IHJlc3VsdCA9IFtdO1xuICBjb25zdCBwYXRocyA9IChwcm9jZXNzLmVudi5QQVRIIHx8IFwiXCIpLnNwbGl0KFBhdGguZGVsaW1pdGVyKTtcbiAgZm9yIChjb25zdCBpdGVyIG9mIHBhdGhzKSB7XG4gICAgY29uc3QgZmlsZW5hbWUgPSBQYXRoLnJlc29sdmUoaXRlciwgbmFtZSk7XG4gICAgcmVzdWx0LnB1c2goZmlsZW5hbWUpO1xuICB9XG5cbiAgcmV0dXJuIHJlc3VsdDtcbn1cblxuZXhwb3J0IGFzeW5jIGZ1bmN0aW9uIGZpbmRQcm9ncmFtKG5hbWU6IHN0cmluZyk6IFByb21pc2U8c3RyaW5nIHwgdW5kZWZpbmVkPiB7XG4gIGZvciAoY29uc3QgaXRlciBvZiBwb3NzaWJsZVByb2dyYW1MaXN0KG5hbWUpKSB7XG4gICAgaWYgKGF3YWl0IGZpbGVFeGlzdHMoaXRlcikpXG4gICAgICByZXR1cm4gaXRlcjtcbiAgfVxuICByZXR1cm4gdW5kZWZpbmVkO1xufVxuXG5leHBvcnQgZnVuY3Rpb24gZmluZFByb2dyYW1TeW5jKG5hbWU6IHN0cmluZyk6IHN0cmluZyB8IHVuZGVmaW5lZCB7XG4gIGZvciAoY29uc3QgaXRlciBvZiBwb3NzaWJsZVByb2dyYW1MaXN0KG5hbWUpKSB7XG4gICAgaWYgKGZpbGVFeGlzdHNTeW5jKGl0ZXIpKVxuICAgICAgcmV0dXJuIGl0ZXI7XG4gIH1cbiAgcmV0dXJuIHVuZGVmaW5lZDtcbn1cbiIsIi8qXG4gKiBNSVQgTGljZW5zZVxuICpcbiAqIENvcHlyaWdodCAoYykgMjAyNSAgWXVyaWkgWWFrdWJpbiAoeXVyaWkueWFrdWJpbkBnbWFpbC5jb20pXG4gKlxuICogUGVybWlzc2lvbiBpcyBncmFudGVkIHRvIHVzZSwgY29weSwgbW9kaWZ5LCBhbmQgZGlzdHJpYnV0ZSB0aGlzIHNvZnR3YXJlXG4gKiB1bmRlciB0aGUgTUlUIExpY2Vuc2UuIFNlZSBMSUNFTlNFIGZpbGUgZm9yIGRldGFpbHMuXG4gKi9cblxuaW1wb3J0IHsgU2ltcGxlT2JqZWN0IH0gZnJvbSBcIkAvY29yZS9TaW1wbGVPYmplY3RcIjtcbmltcG9ydCB7IEludGVyZmFjZVRhc2sgfSBmcm9tIFwiQC9jb3JlL01ha2VJbnRlcmZhY2VzXCI7XG5pbXBvcnQgeyBMb2dnZXIgfSBmcm9tIFwiQC9sb2dnZXJcIjtcbmltcG9ydCB7IEFic29sdXRlUGF0aCB9IGZyb20gXCIuL0Fic29sdXRlUGF0aFwiO1xuXG5jb25zdCBsb2dnZXIgPSBMb2dnZXIuY3JlYXRlKGltcG9ydC5tZXRhLnVybCk7XG5cbmV4cG9ydCBjbGFzcyBHb2FsVGFyZ2V0IHtcbiAgcHJpdmF0ZSBfbWVzc2FnZTogc3RyaW5nIHwgdW5kZWZpbmVkO1xuICBwcml2YXRlIF9uYW1lOiBzdHJpbmcgfCB1bmRlZmluZWQ7XG4gIHByaXZhdGUgX291dHB1dDogc3RyaW5nIHwgdW5kZWZpbmVkO1xuICBwcml2YXRlIF9kZXBlbmRzID0gbmV3IEFycmF5PHN0cmluZz47XG4gIHByaXZhdGUgX3Rhc2tzID0gbmV3IEFycmF5PEludGVyZmFjZVRhc2s+O1xuXG4gIGNvbnN0cnVjdG9yKG5hbWU/OiBzdHJpbmcpIHtcbiAgICB0aGlzLl9uYW1lID0gbmFtZTtcbiAgfVxuXG4gIGdldCBtZXNzYWdlKCk6IHN0cmluZyB8IHVuZGVmaW5lZCB7XG4gICAgcmV0dXJuIHRoaXMuX21lc3NhZ2U7XG4gIH1cblxuICBzZXQgbWVzc2FnZSh2YWx1ZTogc3RyaW5nKSB7XG4gICAgdGhpcy5fbWVzc2FnZSA9IHZhbHVlO1xuICB9XG5cbiAgZ2V0IG5hbWUoKTogc3RyaW5nIHwgdW5kZWZpbmVkIHtcbiAgICByZXR1cm4gdGhpcy5fbmFtZTtcbiAgfVxuXG4gIGdldCBvdXRwdXQoKTogc3RyaW5nIHwgdW5kZWZpbmVkIHtcbiAgICByZXR1cm4gdGhpcy5fb3V0cHV0O1xuICB9XG5cbiAgc2V0IG91dHB1dCh2YWx1ZTogQWJzb2x1dGVQYXRoKSB7XG4gICAgdGhpcy5fb3V0cHV0ID0gdmFsdWUudG9QYXRoKCk7XG4gIH1cblxuICBnZXQgZGVwZW5kcygpOiBzdHJpbmdbXSB7XG4gICAgcmV0dXJuIHRoaXMuX2RlcGVuZHM7XG4gIH1cblxuICBwdWJsaWMgYWRkRGVwZW5kZW5jeSguLi52YWx1ZTogc3RyaW5nW10pIHtcbiAgICB0aGlzLl9kZXBlbmRzLnB1c2goLi4udmFsdWUpO1xuICB9XG5cbiAgcHVibGljIGFkZFRhc2sodGFzazogSW50ZXJmYWNlVGFzaykge1xuICAgIHRoaXMuX3Rhc2tzLnB1c2godGFzayk7XG4gIH1cblxuICBhc3luYyBkb1dvcmsoKTogUHJvbWlzZTx2b2lkPiB7XG4gICAgZm9yIChjb25zdCB0YXNrIG9mIHRoaXMuX3Rhc2tzKSB7XG4gICAgICBjb25zdCByZXMgPSB0YXNrLmV4ZWN1dGUoKTtcbiAgICAgIGlmIChyZXMgaW5zdGFuY2VvZiBQcm9taXNlKVxuICAgICAgICBhd2FpdCByZXM7XG4gICAgfVxuICB9XG5cbiAgcHVibGljIHRvSlNPTigpOiBTaW1wbGVPYmplY3Qge1xuICAgIGNvbnN0IGpzb246IGFueSA9IHtcbiAgICAgIHR5cGU6IEdvYWxUYXJnZXQubmFtZSxcbiAgICAgIGRlcGVuZHM6IHRoaXMuX2RlcGVuZHMsXG4gICAgICB0YXNrczogdGhpcy5fdGFza3MsXG4gICAgfTtcbiAgICBpZiAodGhpcy5fbWVzc2FnZSkge1xuICAgICAganNvbi5tZXNzYWdlID0gdGhpcy5fbWVzc2FnZTtcbiAgICB9XG4gICAgaWYgKHRoaXMuX25hbWUpIHtcbiAgICAgIGpzb24ubmFtZSA9IHRoaXMuX25hbWU7XG4gICAgfVxuICAgIGlmICh0aGlzLl9vdXRwdXQpIHtcbiAgICAgIGpzb24ub3V0cHV0ID0gdGhpcy5fb3V0cHV0O1xuICAgIH1cbiAgICByZXR1cm4ganNvbjtcbiAgfVxufTtcblxuZXhwb3J0IGNsYXNzIEdvYWxDb2xsZWN0aW9uIHtcbiAgcHJpdmF0ZSBfZW50cmllcyA9IG5ldyBBcnJheTxHb2FsVGFyZ2V0PjtcblxuICBwdWJsaWMgZ2V0IEVOVFJJRVMoKSB7XG4gICAgcmV0dXJuIHRoaXMuX2VudHJpZXM7XG4gIH1cblxuICBwdWJsaWMgYWRkVGFyZ2V0KGdlOiBHb2FsVGFyZ2V0KSB7XG4gICAgaWYgKGdlLm5hbWUgJiYgdGhpcy5fZW50cmllcy5maW5kKChpKSA9PiBpLm5hbWUgPT09IGdlLm5hbWUpKVxuICAgICAgdGhyb3cgbmV3IEVycm9yKGBObWFlIFwiJHtnZS5uYW1lfVwiIGV4aXN0c2ApO1xuICAgIGlmIChnZS5vdXRwdXQgJiYgdGhpcy5fZW50cmllcy5maW5kKChpKSA9PiBpLm91dHB1dCA9PT0gZ2Uub3V0cHV0KSlcbiAgICAgIHRocm93IG5ldyBFcnJvcihgT3V0cHV0IFwiJHtnZS5vdXRwdXR9XCIgZXhpc3RzYCk7XG4gICAgdGhpcy5fZW50cmllcy5wdXNoKGdlKTtcbiAgfVxuXG4gIHB1YmxpYyBnZXRUYXJnZXQobmFtZTogc3RyaW5nKTogR29hbFRhcmdldCB8IHVuZGVmaW5lZCB7XG4gICAgaWYgKCFuYW1lKVxuICAgICAgcmV0dXJuIHVuZGVmaW5lZDtcbiAgICByZXR1cm4gdGhpcy5fZW50cmllcy5maW5kKChpKSA9PiBpLm5hbWUgPT09IG5hbWUpO1xuICB9XG5cbiAgcHJpdmF0ZSBhZGRUYXJnZXRMaXN0SW1wbChuYW1lOiBzdHJpbmcsIHJlc3VsdDogQXJyYXk8R29hbFRhcmdldD4pIHtcbiAgICBpZiAocmVzdWx0LmZpbmQoaSA9PiBpLm5hbWUgPT09IG5hbWUgfHwgaS5vdXRwdXQgPT09IG5hbWUpKSB7XG4gICAgICByZXR1cm47XG4gICAgfVxuXG4gICAgY29uc3QgZ29hbCA9IHRoaXMuX2VudHJpZXMuZmluZChpID0+IGkubmFtZSA9PT0gbmFtZSB8fCBpLm91dHB1dCA9PT0gbmFtZSk7XG4gICAgaWYgKCFnb2FsKSB7XG4gICAgICByZXR1cm47XG4gICAgfVxuXG4gICAgZm9yIChjb25zdCBpdGVyIG9mIGdvYWwuZGVwZW5kcykge1xuICAgICAgdGhpcy5hZGRUYXJnZXRMaXN0SW1wbChpdGVyLnRvU3RyaW5nKCksIHJlc3VsdCk7XG4gICAgfVxuXG4gICAgcmVzdWx0LnB1c2goZ29hbCk7XG4gIH1cbiAgXG4gIHB1YmxpYyBnZXRUYXJnZXRMaXN0KG5hbWU6c3RyaW5nKSB7XG4gICAgY29uc3QgcmVzdWx0ID0gbmV3IEFycmF5PEdvYWxUYXJnZXQ+O1xuICAgIHRoaXMuYWRkVGFyZ2V0TGlzdEltcGwobmFtZSwgcmVzdWx0KTtcbiAgICByZXR1cm4gcmVzdWx0O1xuICB9XG4gIFxuICBwdWJsaWMgdG9KU09OKCkge1xuICAgIHJldHVybiB7XG4gICAgICB0eXBlOiBHb2FsQ29sbGVjdGlvbi5uYW1lLFxuICAgICAgZW50cmllczogdGhpcy5fZW50cmllcyxcbiAgICB9O1xuICB9XG59O1xuIiwiLypcbiAqIE1JVCBMaWNlbnNlXG4gKlxuICogQ29weXJpZ2h0IChjKSAyMDI1ICBZdXJpaSBZYWt1YmluICh5dXJpaS55YWt1YmluQGdtYWlsLmNvbSlcbiAqXG4gKiBQZXJtaXNzaW9uIGlzIGdyYW50ZWQgdG8gdXNlLCBjb3B5LCBtb2RpZnksIGFuZCBkaXN0cmlidXRlIHRoaXMgc29mdHdhcmVcbiAqIHVuZGVyIHRoZSBNSVQgTGljZW5zZS4gU2VlIExJQ0VOU0UgZmlsZSBmb3IgZGV0YWlscy5cbiAqL1xuXG5pbXBvcnQgeyBUYXJnZXROYW1lIH0gZnJvbSBcIkAvY29yZS9UYXJnZXROYW1lXCI7XG5pbXBvcnQgeyBGaWxlUGF0aCwgQWJzb2x1dGVQYXRoIH0gZnJvbSBcIkAvY29yZS9BYnNvbHV0ZVBhdGhcIjtcbmltcG9ydCB7IFNpbXBsZU9iamVjdCB9IGZyb20gXCJAL2NvcmUvU2ltcGxlT2JqZWN0XCI7XG5cbmV4cG9ydCBjbGFzcyBJbnN0YWxsRW50aXR5IHtcbiAgcHJpdmF0ZSBfdmFsdWU6IEZpbGVQYXRoIHwgVGFyZ2V0TmFtZTtcbiAgcHJpdmF0ZSBfZGVzdGluYXRpb246IEFic29sdXRlUGF0aDtcbiAgcHJpdmF0ZSBfYmFzZURpcj86IEFic29sdXRlUGF0aDtcblxuICBwdWJsaWMgY29uc3RydWN0b3IodmFsdWU6IEZpbGVQYXRoIHwgVGFyZ2V0TmFtZSwgZGVzdGluYXRpb246IEFic29sdXRlUGF0aCwgYmFzZURpcj86IEFic29sdXRlUGF0aCkge1xuICAgIHRoaXMuX3ZhbHVlID0gdmFsdWU7XG4gICAgdGhpcy5fZGVzdGluYXRpb24gPSBkZXN0aW5hdGlvbjtcbiAgICB0aGlzLl9iYXNlRGlyID0gYmFzZURpcjtcbiAgfVxuXG4gIHB1YmxpYyBzdGF0aWMgY3JlYXRlKHZhbHVlOiBGaWxlUGF0aCB8IFRhcmdldE5hbWUsIGRlc3RpbmF0aW9uOiBBYnNvbHV0ZVBhdGgsIGJhc2VEaXI/OiBBYnNvbHV0ZVBhdGgpIHtcbiAgICByZXR1cm4gbmV3IEluc3RhbGxFbnRpdHkodmFsdWUsIGRlc3RpbmF0aW9uLCBiYXNlRGlyKTtcbiAgfVxuXG4gIHB1YmxpYyBnZXQgdmFsdWUgKCkge1xuICAgIHJldHVybiB0aGlzLl92YWx1ZTtcbiAgfVxuXG4gIHB1YmxpYyBnZXQgZGVzdGluYXRpb24gKCkge1xuICAgIHJldHVybiB0aGlzLl9kZXN0aW5hdGlvbjtcbiAgfVxuXG4gIHB1YmxpYyBnZXQgYmFzZURpciAoKSB7XG4gICAgcmV0dXJuIHRoaXMuX2Jhc2VEaXI7XG4gIH1cblxuICBwdWJsaWMgc3RhdGljIGZyb21KU09OKGpzb246IGFueSkge1xuICAgIGNvbnN0IHZhbHVlID0gU2ltcGxlT2JqZWN0LmZyb21KU09OKGpzb24udmFsdWUpO1xuICAgIGNvbnN0IGRlc3RpbmF0aW9uID0gQWJzb2x1dGVQYXRoLmNyZWF0ZShqc29uLmRlc3RpbmF0aW9uKTtcbiAgICBjb25zdCBiYXNlRGlyID0ganNvbi5iYXNlRGlyID8gQWJzb2x1dGVQYXRoLmNyZWF0ZShqc29uLmJhc2VEaXIpIDogdW5kZWZpbmVkO1xuICAgIHJldHVybiBuZXcgSW5zdGFsbEVudGl0eSh2YWx1ZSwgZGVzdGluYXRpb24sIGJhc2VEaXIpO1xuICB9XG5cbiAgcHVibGljIHRvSlNPTigpOiBTaW1wbGVPYmplY3Qge1xuICAgIGNvbnN0IHJlc3VsdDogU2ltcGxlT2JqZWN0ID0ge1xuICAgICAgdHlwZTogSW5zdGFsbEVudGl0eS5uYW1lLFxuICAgICAgdmFsdWU6IHRoaXMuX3ZhbHVlLnRvSlNPTigpLFxuICAgICAgZGVzdGluYXRpb246IHRoaXMuX2Rlc3RpbmF0aW9uLnRvVVJMU3RyaW5nKCksXG4gICAgfTtcbiAgICBpZiAodGhpcy5fYmFzZURpcilcbiAgICAgIHJlc3VsdC5iYXNlRGlyID0gdGhpcy5fYmFzZURpci50b1VSTFN0cmluZygpO1xuICAgIHJldHVybiByZXN1bHQ7XG4gIH1cbn07XG4iLCIvKlxuICogTUlUIExpY2Vuc2VcbiAqXG4gKiBDb3B5cmlnaHQgKGMpIDIwMjUgIFl1cmlpIFlha3ViaW4gKHl1cmlpLnlha3ViaW5AZ21haWwuY29tKVxuICpcbiAqIFBlcm1pc3Npb24gaXMgZ3JhbnRlZCB0byB1c2UsIGNvcHksIG1vZGlmeSwgYW5kIGRpc3RyaWJ1dGUgdGhpcyBzb2Z0d2FyZVxuICogdW5kZXIgdGhlIE1JVCBMaWNlbnNlLiBTZWUgTElDRU5TRSBmaWxlIGZvciBkZXRhaWxzLlxuICovXG5cbmltcG9ydCB7IE1ha2VDb250ZXh0IH0gZnJvbSBcIkAvY29yZS9CYXNlQ29udGV4dFwiO1xuaW1wb3J0IHsgZmlsZUV4aXN0c1N5bmMgfSBmcm9tIFwiQC91dGlscy9GaWxlU3lzdGVtXCI7XG5pbXBvcnQgeyBQcm9qZWN0Q29udGV4dCB9IGZyb20gXCJAL2NvcmUvUHJvamVjdENvbnRleHRcIjtcbmltcG9ydCB7IFNjb3BlSGVscGVyLCBWYXJpYW50TWFwLCBWYXJpYWJsZU1hcCB9IGZyb20gXCJAL2NvcmUvU2NvcGVcIjtcbmltcG9ydCB7IHJlcXVpcmVTeW5jIH0gZnJvbSBcIkAvdXRpbHMvTW9kdWxlXCI7XG5pbXBvcnQgeyBDVVNUT01fVkFSSUFCTEVfR1JPVVAgfSBmcm9tIFwiQC9Db25zdGFudHNcIjtcbmltcG9ydCB7IEFic29sdXRlUGF0aCB9IGZyb20gXCJAL2NvcmUvQWJzb2x1dGVQYXRoXCI7XG5pbXBvcnQgeyBMb2dnZXIgfSBmcm9tIFwiQC9sb2dnZXJcIjtcblxuY29uc3QgbG9nZ2VyID0gTG9nZ2VyLmNyZWF0ZShpbXBvcnQubWV0YS51cmwpO1xuXG5leHBvcnQgY2xhc3MgTG9jYWxNYWtlQ29udGV4dCBleHRlbmRzIE1ha2VDb250ZXh0IHtcbiAgcHJpdmF0ZSBfcHJvamVjdDogUHJvamVjdENvbnRleHQ7XG5cbiAgcHVibGljIGNvbnN0cnVjdG9yKHNjb3BlOiBWYXJpYWJsZU1hcCwgcHJvamVjdDogUHJvamVjdENvbnRleHQpIHtcbiAgICBzdXBlcihzY29wZSk7XG4gICAgdGhpcy5fcHJvamVjdCA9IHByb2plY3Q7XG4gIH1cblxuICBwdWJsaWMgZXhlY3V0ZVNjcmlwdChzY29wZTogVmFyaWFibGVNYXAsIHNjcmlwdDogYW55LCBwYXJhbXM6IGFueSkge1xuICAgIHRoaXMuX3Byb2plY3QuZXhlY3V0ZVNjcmlwdFN5bmMoc2NvcGUsIHNjcmlwdCwgcGFyYW1zKTtcbiAgfVxuXG4gIHB1YmxpYyBhZGRDYWNoZVZhcmlhYmxlcyhzY29wZTogVmFyaWFibGVNYXAsIHBhcmFtczogc3RyaW5nIHwgVmFyaWFudE1hcCk6IHZvaWQge1xuICAgIGxldCB2YXJpYWJsZXMgPSBwYXJhbXM7XG4gICAgaWYgKHR5cGVvZiBwYXJhbXMgPT09IFwic3RyaW5nXCIpIHtcbiAgICAgIGNvbnN0IGZpbGVuYW1lID0gU2NvcGVIZWxwZXIuZ2V0KHNjb3BlLCBcIlNPVVJDRV9ESVJcIikucmVzb2x2ZShwYXJhbXMpLnRvU3RyaW5nKCk7XG4gICAgICBpZiAoIWZpbGVFeGlzdHNTeW5jKGZpbGVuYW1lKSlcbiAgICAgICAgcmV0dXJuO1xuICAgICAgdmFyaWFibGVzID0gcmVxdWlyZVN5bmMoZmlsZW5hbWUpO1xuICAgIH1cblxuICAgIFNjb3BlSGVscGVyLmRlZmluZVZhcmlhYmxlc0luVmFyaWFibGVNYXAoc2NvcGUsIENVU1RPTV9WQVJJQUJMRV9HUk9VUCwgdmFyaWFibGVzKTtcbiAgfVxuXG4gIHB1YmxpYyBhZGRTdWJkaXJlY3Rvcnkoc2NvcGU6IFZhcmlhYmxlTWFwLCBzb3VyY2VEaXI6IHN0cmluZyB8IEFic29sdXRlUGF0aCwgYmluYXJ5RGlyPzogc3RyaW5nIHwgQWJzb2x1dGVQYXRoKTogdm9pZCB7XG4gICAgdGhpcy5fcHJvamVjdC5hZGRTdWJkaXJlY3Rvcnkoc2NvcGUsIHNvdXJjZURpciwgYmluYXJ5RGlyKTtcbiAgfVxufTtcbiIsIi8qXG4gKiBNSVQgTGljZW5zZVxuICpcbiAqIENvcHlyaWdodCAoYykgMjAyNSAgWXVyaWkgWWFrdWJpbiAoeXVyaWkueWFrdWJpbkBnbWFpbC5jb20pXG4gKlxuICogUGVybWlzc2lvbiBpcyBncmFudGVkIHRvIHVzZSwgY29weSwgbW9kaWZ5LCBhbmQgZGlzdHJpYnV0ZSB0aGlzIHNvZnR3YXJlXG4gKiB1bmRlciB0aGUgTUlUIExpY2Vuc2UuIFNlZSBMSUNFTlNFIGZpbGUgZm9yIGRldGFpbHMuXG4gKi9cblxuaW1wb3J0IHsgVGFyZ2V0RmlsZSB9IGZyb20gXCJAL2NvcmUvVGFyZ2V0RmlsZVwiO1xuaW1wb3J0IHsgVGFyZ2V0T2JqZWN0cyB9IGZyb20gXCJAL2NvcmUvVGFyZ2V0T2JqZWN0c1wiO1xuaW1wb3J0IHsgVGFyZ2V0SW5jbHVkZXMgfSBmcm9tIFwiQC9jb3JlL1RhcmdldEluY2x1ZGVzXCI7XG5pbXBvcnQgeyBWYXJpYW50TWFwIH0gZnJvbSBcIkAvY29yZS9TY29wZVwiO1xuaW1wb3J0IHsgQWJzb2x1dGVQYXRoIH0gZnJvbSBcIkAvY29yZS9BYnNvbHV0ZVBhdGhcIjtcbmltcG9ydCB7IFNvdXJjZUZpbGUgfSBmcm9tIFwiQC9jb3JlL1NvdXJjZUZpbGVcIjtcblxuZXhwb3J0IHR5cGUgRGVmaW5pdGlvbiA9IHN0cmluZyB8IG9iamVjdDtcbmV4cG9ydCB0eXBlIENvbXBpbGVPcHRpb25TaW5nbGUgPSBzdHJpbmc7XG5leHBvcnQgdHlwZSBDb21waWxlT3B0aW9uTXVsdGkgPSBbIHN0cmluZywgc3RyaW5nIHwgQWJzb2x1dGVQYXRoIF07XG5leHBvcnQgdHlwZSBDb21waWxlT3B0aW9uID0gQ29tcGlsZU9wdGlvblNpbmdsZSB8IENvbXBpbGVPcHRpb25NdWx0aTtcbmV4cG9ydCB0eXBlIExpbmtPcHRpb24gPSBzdHJpbmcgfCBzdHJpbmdbXTtcblxuZXhwb3J0IGFic3RyYWN0IGNsYXNzIEludGVyZmFjZVRhc2sge1xuICBhYnN0cmFjdCBleGVjdXRlKCk6IFByb21pc2U8dm9pZD4gfCB2b2lkO1xufTtcblxuZXhwb3J0IGFic3RyYWN0IGNsYXNzIEludGVyZmFjZVNvdXJjZUZpbGVzIHtcbiAgYWJzdHJhY3Qgc2V0TGFuZ3VhZ2UobGFuZ3VhZ2U6IHN0cmluZyk6IHZvaWQ7XG4gIGFic3RyYWN0IGFkZERlZmluaXRpb25zKC4uLmRlZmluaXRpb25zOiBzdHJpbmdbXSk6IHZvaWQ7XG4gIGFic3RyYWN0IGFkZENvbXBpbGVGbGFncyguLi5mbGFnczogc3RyaW5nW10pOiB2b2lkO1xufTtcblxuZXhwb3J0IGFic3RyYWN0IGNsYXNzIEludGVyZmFjZVRhcmdldCB7XG4gIGFic3RyYWN0IGdldCB0YXJnZXROYW1lKCk6IHN0cmluZztcbiAgYWJzdHJhY3QgZ2V0IHRhcmdldEZpbGUoKTogVGFyZ2V0RmlsZTtcbiAgYWJzdHJhY3QgZ2V0IGluY2x1ZGVzKCk6IFRhcmdldEluY2x1ZGVzO1xuICBhYnN0cmFjdCBnZXQgb2JqZWN0cygpOiBUYXJnZXRPYmplY3RzO1xuXG4gIGFic3RyYWN0IHNldFByZWZpeChwcmVmaXg6IHN0cmluZyk6IHZvaWQ7ICBcbiAgYWJzdHJhY3Qgc2V0U3VmZml4KHN1ZmZpeDogc3RyaW5nKTogdm9pZDtcbiAgYWJzdHJhY3Qgc2V0T3V0cHV0TmFtZShvdXRwdXROYW1lOiBzdHJpbmcpOiB2b2lkO1xuXG4gIGFic3RyYWN0IGFkZFNvdXJjZXMoLi4uc291cmNlczogQXJyYXk8VGFyZ2V0T2JqZWN0cyB8IFNvdXJjZUZpbGUgfCBBYnNvbHV0ZVBhdGggfCBzdHJpbmc+KTogdm9pZDtcbiAgYWJzdHJhY3QgYWRkSW5jbHVkZXMoLi4uaW5jbHVkZXM6IEFycmF5PFRhcmdldEluY2x1ZGVzIHwgQWJzb2x1dGVQYXRoIHwgc3RyaW5nPik6IHZvaWQ7XG4gIGFic3RyYWN0IGFkZExpYnJhcmllcyguLi5saWJyYXJpZXM6IGFueSk6IHZvaWQ7XG4gIGFic3RyYWN0IGFkZENvbXBpbGVPcHRpb25zKC4uLm9wdGlvbnM6IENvbXBpbGVPcHRpb25bXSk6IHZvaWQ7XG4gIGFic3RyYWN0IGFkZExpbmtPcHRpb25zKC4uLm9wdGlvbnM6IExpbmtPcHRpb25bXSk6IHZvaWQ7XG4gIGFic3RyYWN0IGdldFNvdXJjZUZpbGVzKC4uLnNvdXJjZXM6IGFueVtdKTogSW50ZXJmYWNlU291cmNlRmlsZXM7XG4gIGFic3RyYWN0IGFkZERlZmluaXRpb25zKC4uLmRlZmluaXRpb25zOiBEZWZpbml0aW9uW10pOiB2b2lkO1xuICBhYnN0cmFjdCBhZGRQcmVCdWlsZChjb21tYW5kOiBhbnksIGFyZ3M6IGFueVtdKTogdm9pZDtcbiAgYWJzdHJhY3QgYWRkUG9zdEJ1aWxkKGNvbW1hbmQ6IGFueSwgYXJnczogYW55W10pOiB2b2lkO1xuXG4gIGFic3RyYWN0IHNldFBvc2l0aW9uSW5kZXBlbmRlbnRDb2RlKHZhbHVlOiBib29sZWFuKTogdm9pZDtcbiAgYWJzdHJhY3QgYWRkUHVibGljSW5jbHVkZXMoLi4uaW5jbHVkZXM6IEFycmF5PFRhcmdldEluY2x1ZGVzIHwgQWJzb2x1dGVQYXRoIHwgc3RyaW5nPik6IHZvaWQ7XG4gIGFic3RyYWN0IGFkZFB1YmxpY0RlZmluaXRpb25zKC4uLmRlZmluaXRpb25zOiBEZWZpbml0aW9uW10pOiB2b2lkO1xuICBhYnN0cmFjdCBhZGRQdWJsaWNMaWJyYXJpZXMoLi4ubGlicmFyaWVzOiBhbnlbXSk6IHZvaWQ7XG4gIGFic3RyYWN0IGFkZFB1YmxpY0NvbXBpbGVPcHRpb25zKC4uLm9wdGlvbnM6IENvbXBpbGVPcHRpb25bXSk6IHZvaWQ7XG4gIGFic3RyYWN0IGFkZFB1YmxpY0xpbmtPcHRpb25zKC4uLm9wdGlvbnM6IExpbmtPcHRpb25bXSk6IHZvaWQ7XG59O1xuXG5leHBvcnQgYWJzdHJhY3QgY2xhc3MgSW50ZXJmYWNlU2NyaXB0IHtcbiAgYWJzdHJhY3QgbWVyZ2VWYXJpYWJsZXModmFyaWFibGVzOiBWYXJpYW50TWFwKTogdm9pZDtcbn07XG5cbmV4cG9ydCBpbnRlcmZhY2UgSUdlbmVyYWxDb250ZXh0IHtcbiAgZ2V0UHJvcGVydHkobmFtZTogc3RyaW5nKTogYW55O1xuICBzZXRQcm9wZXJ0eShuYW1lOiBzdHJpbmcsIHZhbHVlOiBhbnkpOiBib29sZWFuO1xuICBoYXNQcm9wZXJ0eShuYW1lOiBzdHJpbmcpOiBib29sZWFuO1xuICBkZWxldGVQcm9wZXJ0eShuYW1lOiBzdHJpbmcpOiBib29sZWFuO1xuICBnZXRQcm9wZXJ0eU5hbWVzKCk6IHN0cmluZ1tdO1xuXG4gIGZpbmRQcm9ncmFtKG5hbWU6IHN0cmluZyk6IHN0cmluZyB8IHVuZGVmaW5lZDtcbn07XG5cbmV4cG9ydCBpbnRlcmZhY2UgSU1ha2VDb250ZXh0IGV4dGVuZHMgSUdlbmVyYWxDb250ZXh0IHtcbiAgZ2V0Q2FjaGVWYXJpYWJsZXMoKTogYW55O1xuICBhZGRDYWNoZVZhcmlhYmxlcyhwYXJhbXM6IHN0cmluZyB8IFZhcmlhbnRNYXApOiB2b2lkO1xuICBhZGRJbmNsdWRlRGlyZWN0b3JpZXMoLi4uZGlyczogYW55W10pOiB2b2lkO1xuICBhZGRTdWJkaXJlY3Rvcnkoc291cmNlRGlyOiBzdHJpbmcgfCBBYnNvbHV0ZVBhdGgsIGJpbmFyeURpcj86IHN0cmluZyB8IEFic29sdXRlUGF0aCk6IHZvaWQ7XG4gIHNjcmlwdChuYW1lOiBzdHJpbmcpOiBJbnRlcmZhY2VTY3JpcHQ7XG4gIGFkZEN1c3RvbVNjcmlwdChzY3JpcHQ6IHN0cmluZywgcGFyYW1zOiBhbnkpOiBJbnRlcmZhY2VTY3JpcHQ7XG4gIHRhcmdldChuYW1lOiBzdHJpbmcpOiBJbnRlcmZhY2VUYXJnZXQ7XG4gIGFkZE9iamVjdExpYnJhcnkobmFtZTogc3RyaW5nLCAuLi5zb3VyY2VzOiBhbnlbXSk6IEludGVyZmFjZVRhcmdldDtcbiAgYWRkU3RhdGljTGlicmFyeShuYW1lOiBzdHJpbmcsIC4uLnNvdXJjZXM6IGFueVtdKTogSW50ZXJmYWNlVGFyZ2V0O1xuICBhZGRTaGFyZWRMaWJyYXJ5KG5hbWU6IHN0cmluZywgLi4uc291cmNlczogYW55W10pOiBJbnRlcmZhY2VUYXJnZXQ7XG4gIGFkZEV4ZWN1dGFibGUobmFtZTogc3RyaW5nLCAuLi5zb3VyY2VzOiBhbnlbXSk6IEludGVyZmFjZVRhcmdldDtcbiAgZXhlY3V0ZVNjcmlwdChzY3JpcHQ6IGFueSwgcGFyYW1zOiBhbnkpOiB2b2lkO1xuICBpbnN0YWxsKHZhbHVlOiBhbnksIHBhcmFtczogYW55KTogdm9pZDtcbn07XG4iLCIvKlxuICogTUlUIExpY2Vuc2VcbiAqXG4gKiBDb3B5cmlnaHQgKGMpIDIwMjUgIFl1cmlpIFlha3ViaW4gKHl1cmlpLnlha3ViaW5AZ21haWwuY29tKVxuICpcbiAqIFBlcm1pc3Npb24gaXMgZ3JhbnRlZCB0byB1c2UsIGNvcHksIG1vZGlmeSwgYW5kIGRpc3RyaWJ1dGUgdGhpcyBzb2Z0d2FyZVxuICogdW5kZXIgdGhlIE1JVCBMaWNlbnNlLiBTZWUgTElDRU5TRSBmaWxlIGZvciBkZXRhaWxzLlxuICovXG5cbmltcG9ydCB7IFByb2plY3RDb250ZXh0IH0gZnJvbSBcIkAvY29yZS9Qcm9qZWN0Q29udGV4dFwiO1xuaW1wb3J0IHsgVmFyaWFibGVNYXAgfSBmcm9tIFwiQC9jb3JlL1Njb3BlXCI7XG5pbXBvcnQgeyBHZW5lcmFsQ29udGV4dCwgY3JlYXRlQ29udGV4dCB9IGZyb20gXCJAL2NvcmUvQmFzZUNvbnRleHRcIjtcblxuY29uc3QgR0xPQkFMID0gU3ltYm9sKFwiR0xPQkFMXCIpO1xuY29uc3QgU0NPUEUgPSBTeW1ib2woXCJTQ09QRVwiKTtcblxuZXhwb3J0IGNsYXNzIFBsdWdpbkNvbnRleHQgZXh0ZW5kcyBHZW5lcmFsQ29udGV4dCB7XG4gIFtHTE9CQUxdOiBQcm9qZWN0Q29udGV4dDtcbiAgW1NDT1BFXTogVmFyaWFibGVNYXA7XG5cbiAgcHVibGljIGNvbnN0cnVjdG9yKGdsb2JhbDogUHJvamVjdENvbnRleHQsIHZhcmlhYmxlTWFwOiBWYXJpYWJsZU1hcCkge1xuICAgIHN1cGVyKHZhcmlhYmxlTWFwKTtcbiAgICB0aGlzW0dMT0JBTF0gPSBnbG9iYWw7XG4gICAgdGhpc1tTQ09QRV0gPSB2YXJpYWJsZU1hcDtcbiAgfVxuXG4gIHB1YmxpYyBhZGRTdWJkaXJlY3RvcnlBbGlhcyhzcmM6IGFueSwgZGVzdDogYW55KSB7XG4gICAgdGhpc1tHTE9CQUxdLmFkZFN1YmRpcmVjdG9yeUFsaWFzKHRoaXNbU0NPUEVdLCBzcmMsIGRlc3QpO1xuICB9XG5cbiAgcHVibGljIHN0YXRpYyBjcmVhdGUoZ2xvYmFsOiBQcm9qZWN0Q29udGV4dCwgdmFyaWFibGVNYXA6IFZhcmlhYmxlTWFwKSB7XG4gICAgcmV0dXJuIGNyZWF0ZUNvbnRleHQobmV3IFBsdWdpbkNvbnRleHQoZ2xvYmFsLCB2YXJpYWJsZU1hcCkpO1xuICB9XG59O1xuIiwiLypcbiAqIE1JVCBMaWNlbnNlXG4gKlxuICogQ29weXJpZ2h0IChjKSAyMDI1ICBZdXJpaSBZYWt1YmluICh5dXJpaS55YWt1YmluQGdtYWlsLmNvbSlcbiAqXG4gKiBQZXJtaXNzaW9uIGlzIGdyYW50ZWQgdG8gdXNlLCBjb3B5LCBtb2RpZnksIGFuZCBkaXN0cmlidXRlIHRoaXMgc29mdHdhcmVcbiAqIHVuZGVyIHRoZSBNSVQgTGljZW5zZS4gU2VlIExJQ0VOU0UgZmlsZSBmb3IgZGV0YWlscy5cbiAqL1xuXG5pbXBvcnQgZnMgZnJvbSBcIm5vZGU6ZnNcIjtcblxuaW1wb3J0IHsgQUxMX1RBUkdFVCwgSU5TVEFMTF9UQVJHRVQgfSBmcm9tIFwiQC9Db25zdGFudHNcIjtcbmltcG9ydCB7IEFic29sdXRlUGF0aCB9IGZyb20gXCJAL2NvcmUvQWJzb2x1dGVQYXRoXCI7XG5pbXBvcnQgeyBmaWxlRXhpc3RzLCBmaWxlRXhpc3RzU3luYyB9IGZyb20gXCJAL3V0aWxzL0ZpbGVTeXN0ZW1cIjtcbmltcG9ydCB7IFRhcmdldENvbGxlY3Rpb24gfSBmcm9tIFwiQC9jb3JlL1RhcmdldENvbGxlY3Rpb25cIjtcbmltcG9ydCB7IEdvYWxDb2xsZWN0aW9uLCBHb2FsVGFyZ2V0IH0gZnJvbSBcIkAvY29yZS9Hb2FsQ29sbGVjdGlvblwiO1xuaW1wb3J0IHsgVXNlck1ha2VDb250ZXh0IH0gZnJvbSBcIkAvY29yZS9Vc2VyTWFrZUNvbnRleHRcIjtcbmltcG9ydCB7IExvY2FsTWFrZUNvbnRleHQgfSBmcm9tIFwiQC9jb3JlL0xvY2FsTWFrZUNvbnRleHRcIjtcbmltcG9ydCB7IFRhcmdldENvbW1hbmQgfSBmcm9tIFwiQC9jb3JlL1RhcmdldFwiO1xuaW1wb3J0IHsgU3lzdGVtU2NvcGUgfSBmcm9tIFwiQC9jb3JlL1N5c3RlbVNjb3BlXCI7XG5pbXBvcnQgeyByZXF1aXJlU3luYyB9IGZyb20gXCJAL3V0aWxzL01vZHVsZVwiO1xuaW1wb3J0IHsgTG9nZ2VyIH0gZnJvbSBcIkAvbG9nZ2VyXCI7XG5pbXBvcnQgeyBUYXJnZXROYW1lIH0gZnJvbSBcIkAvY29yZS9UYXJnZXROYW1lXCI7XG5pbXBvcnQgeyBNYWluVGFyZ2V0LCBQb3N0VGFyZ2V0IH0gZnJvbSBcIkAvY29yZS9UYXJnZXRcIjtcbmltcG9ydCB7IEluc3RhbGxFbnRpdHkgfSBmcm9tIFwiQC9jb3JlL0luc3RhbGxFbnRpdHlcIjtcbmltcG9ydCB7IFNjcmlwdENvbnRleHQgfSBmcm9tIFwiQC9jb3JlL1NjcmlwdENvbnRleHRcIjtcbmltcG9ydCB7IFNjb3BlSGVscGVyLCBWYXJpYWJsZU1hcCB9IGZyb20gXCIuL1Njb3BlXCI7XG5pbXBvcnQgeyBUYXJnZXRGaWxlIH0gZnJvbSBcIkAvY29yZS9UYXJnZXRGaWxlXCI7XG5pbXBvcnQgeyBTb3VyY2VGaWxlIH0gZnJvbSBcIkAvY29yZS9Tb3VyY2VGaWxlXCI7XG5pbXBvcnQgeyBFeGVjU2NyaXB0VGFzayB9IGZyb20gXCJAL2NvcmUvRXhlY1NjcmlwdFRhc2tcIjtcbmltcG9ydCB7IFNwYXduU3luY1Rhc2sgfSBmcm9tIFwiQC9jb3JlL1NwYXduU3luY1Rhc2tcIjtcbmltcG9ydCB7IEZpbGVJbnN0YWxsYXRpb25UYXNrIH0gZnJvbSBcIkAvY29yZS9GaWxlSW5zdGFsbGF0aW9uVGFza1wiO1xuaW1wb3J0IHsgQ3VzdG9tU2NyaXB0LCBQb3N0Q3VzdG9tU2NyaXB0IH0gZnJvbSBcIkAvY29yZS9DdXN0b21TY3JpcHRcIjtcbmltcG9ydCB7IHBlcmZvcm1Db250ZXh0LCBjcmVhdGVWYXJpYWJsZU1hcEZvckRpcmVjdG9yeSB9IGZyb20gXCJAL2NvcmUvQmFzZUNvbnRleHRcIjtcblxuaW1wb3J0IEJ1aWxkaW5TY3JpcHRzIGZyb20gXCJAL2NvcmUvQnVpbGRpblNjcmlwdHNcIjtcblxuY29uc3QgbG9nZ2VyID0gTG9nZ2VyLmNyZWF0ZShpbXBvcnQubWV0YS51cmwpO1xuXG5jb25zdCBUQVJHRVRTID0gU3ltYm9sKFwiVEFSR0VUU1wiKTtcbmNvbnN0IENBQ0hFID0gU3ltYm9sKFwiQ0FDSEVcIik7XG5jb25zdCBCVUlMVElOX1NDUklQVFMgPSBTeW1ib2woXCJCVUlMVElOX1NDUklQVFNcIik7XG5cbnR5cGUgU3ViZGlyZWN0b3J5QWxpYXMgPSB7XG4gIFtuYW1lOiBzdHJpbmddOiBBYnNvbHV0ZVBhdGggfCBudWxsO1xufTtcblxudHlwZSBDYWNoZVZhcmlhYmxlRGVzY3JpcHRvciA9IHtcbiAgdHlwZT86IGFueTtcbiAgdmFsdWU/OiBhbnk7XG4gIGRlc2NyaXB0aW9uPzogc3RyaW5nO1xufTtcblxudHlwZSBDYWNoZVZhcmlhYmxlRGVzY3JpcHRvcnMgPSB7XG4gIFtuYW1lOiBzdHJpbmddOiBDYWNoZVZhcmlhYmxlRGVzY3JpcHRvcjtcbn07XG5cbnR5cGUgQnVpbGRpblNjcmlwdHMgPSB7XG4gIFtuYW1lOiBzdHJpbmddOiBGdW5jdGlvbjtcbn07XG5cbmV4cG9ydCBpbnRlcmZhY2UgRXhlY1N0cnVjdCB7XG4gIGNvbW1hbmQ6IHN0cmluZztcbiAgYXJnczogc3RyaW5nW107XG59O1xuXG5mdW5jdGlvbiBlbnN1cmVWYWx1ZUJ5VHlwZSh0eXBlOiBhbnksIHZhbHVlOiBhbnkpIHtcbiAgaWYgKEFycmF5LmlzQXJyYXkodHlwZSkgPyB0eXBlLmluY2x1ZGVzKHZhbHVlKSA6IHR5cGVvZiB2YWx1ZSA9PT0gdHlwZSlcbiAgICByZXR1cm4gdmFsdWU7XG4gIHRocm93IG5ldyBFcnJvcihgVGhlICcke3ZhbHVlfScgaXMgbm90IGEgJHt0eXBlfWApO1xufVxuXG5mdW5jdGlvbiByZXNvbHZlSW5zdGFuY2UocHJvamVjdDogUHJvamVjdENvbnRleHQsIG86IHN0cmluZyB8IEFic29sdXRlUGF0aCB8IFRhcmdldEZpbGUpOiBzdHJpbmcge1xuICBpZiAodHlwZW9mIG8gPT09IFwic3RyaW5nXCIpXG4gICAgcmV0dXJuIG87XG5cbiAgaWYgKG8gaW5zdGFuY2VvZiBBYnNvbHV0ZVBhdGgpXG4gICAgcmV0dXJuIG8udG9TdHJpbmcoKTtcblxuICBpZiAobyBpbnN0YW5jZW9mIFRhcmdldEZpbGUpIHtcbiAgICBjb25zdCB0YXJnZXQgPSBwcm9qZWN0LlRBUkdFVFMuZ2V0KG8udGFyZ2V0TmFtZSk7XG4gICAgcmV0dXJuIHRhcmdldC5nZXRGaWxlKCkudG9TdHJpbmcoKTtcbiAgfVxuXG4gIHRocm93IG5ldyBFcnJvcihgVW5hYmxlIHRvIHJlc29sdmUgb2JqZWN0ICR7b31gKTtcbn1cblxuZnVuY3Rpb24gcmVzb2x2ZVRhcmdldENvbW1hbmQocHJvamVjdDogUHJvamVjdENvbnRleHQsIHRjbWQ6IFRhcmdldENvbW1hbmQpOiBFeGVjU3RydWN0IHtcbiAgY29uc3QgY29tbWFuZCA9IHJlc29sdmVJbnN0YW5jZShwcm9qZWN0LCB0Y21kLmNvbW1hbmQpO1xuICBjb25zdCBhcmdzID0gdGNtZC5hcmdzLm1hcChpID0+IHJlc29sdmVJbnN0YW5jZShwcm9qZWN0LCBpKSk7XG4gIHJldHVybiB7Y29tbWFuZCwgYXJnc307XG59XG5cbmV4cG9ydCBjbGFzcyBQcm9qZWN0Q29udGV4dCB7XG4gIHByaXZhdGUgW1RBUkdFVFNdOiBUYXJnZXRDb2xsZWN0aW9uO1xuICBwcml2YXRlIF9jdXN0b21TY3JpcHRzID0gbmV3IE1hcDxzdHJpbmcsIEN1c3RvbVNjcmlwdD47XG5cbiAgcHJpdmF0ZSBbQ0FDSEVdOiBDYWNoZVZhcmlhYmxlRGVzY3JpcHRvcnM7XG4gIHByaXZhdGUgX2luc3RhbGxMaXN0OiBJbnN0YWxsRW50aXR5W107XG4gIHByaXZhdGUgX3Byb2Nlc3NlZFZhcmlhYmxlTWFwOiBhbnk7XG4gIHByaXZhdGUgW0JVSUxUSU5fU0NSSVBUU106IEJ1aWxkaW5TY3JpcHRzO1xuICBwcml2YXRlIF9zdWJkaXJBbGlhczogU3ViZGlyZWN0b3J5QWxpYXM7XG4gIHByaXZhdGUgX3N1YmRpckxpc3Q6IFZhcmlhYmxlTWFwW107XG5cbiAgcHJpdmF0ZSBjb25zdHJ1Y3RvcigpIHtcbiAgICB0aGlzW1RBUkdFVFNdID0gVGFyZ2V0Q29sbGVjdGlvbi5jcmVhdGUoKTtcbiAgICB0aGlzW0NBQ0hFXSA9IHt9O1xuICAgIHRoaXMuX2luc3RhbGxMaXN0ID0gW107XG4gICAgdGhpcy5fcHJvY2Vzc2VkVmFyaWFibGVNYXAgPSB7fTtcbiAgICB0aGlzLl9zdWJkaXJBbGlhcyA9IHt9O1xuICAgIHRoaXNbQlVJTFRJTl9TQ1JJUFRTXSA9IEJ1aWxkaW5TY3JpcHRzO1xuICAgIHRoaXMuX3N1YmRpckxpc3QgPSBbXTtcbiAgfVxuXG4gIHB1YmxpYyBzdGF0aWMgY3JlYXRlKCkge1xuICAgIHJldHVybiBPYmplY3Quc2VhbChuZXcgUHJvamVjdENvbnRleHQpO1xuICB9XG5cbiAgcHVibGljIGdldCBUQVJHRVRTKCkge1xuICAgIHJldHVybiB0aGlzW1RBUkdFVFNdO1xuICB9XG5cbiAgcHVibGljIGdldCBDQUNIRSgpIHtcbiAgICByZXR1cm4gdGhpc1tDQUNIRV07XG4gIH1cblxuICBwdWJsaWMgcmVnaXN0ZXJWYXJpYWJsZU1hcChuYW1lOiBzdHJpbmcsIHZhcmlhYmxlTWFwOiBWYXJpYWJsZU1hcCkge1xuICAgIGlmICh0aGlzLl9wcm9jZXNzZWRWYXJpYWJsZU1hcFtuYW1lXSlcbiAgICAgIHRocm93IG5ldyBFcnJvcihgU3lzdGVtVmFyaWFibGVzIGV4aXN0cyBmb3IgJHtuYW1lfWApO1xuICAgIHRoaXMuX3Byb2Nlc3NlZFZhcmlhYmxlTWFwW25hbWVdID0gdmFyaWFibGVNYXA7XG4gIH1cblxuICBwdWJsaWMgcmVzb2x2ZVN1YmRpcmVjdG9yeShwYXRoOiBBYnNvbHV0ZVBhdGggfCBzdHJpbmcpOiBBYnNvbHV0ZVBhdGggfCBzdHJpbmcgfCB1bmRlZmluZWQge1xuICAgIGNvbnN0IHJlc29sdmVkUGF0aCA9IHRoaXMuX3N1YmRpckFsaWFzW3BhdGgudG9TdHJpbmcoKV07XG4gICAgaWYgKHJlc29sdmVkUGF0aCA9PT0gdW5kZWZpbmVkKVxuICAgICAgcmV0dXJuIHBhdGg7XG4gICAgaWYgKHJlc29sdmVkUGF0aCA9PT0gbnVsbClcbiAgICAgIHJldHVybiB1bmRlZmluZWQ7XG4gICAgcmV0dXJuIHJlc29sdmVkUGF0aDtcbiAgfVxuXG4gIHB1YmxpYyBhZGRTdWJkaXJlY3RvcnlBbGlhcyh2YXJpYWJsZU1hcDogVmFyaWFibGVNYXAsIHNyYzogYW55LCBkZXN0OiBhbnkpIHtcbiAgICBjb25zdCBzcmNQYXRoID0gQWJzb2x1dGVQYXRoLmNyZWF0ZShTY29wZUhlbHBlci5nZXQodmFyaWFibGVNYXAsIFwiU09VUkNFX0RJUlwiKS5yZXNvbHZlKHNyYykpO1xuICAgIGNvbnN0IGRlc3RQYXRoID0gKGRlc3QgPT09IG51bGwpID8gbnVsbCA6IEFic29sdXRlUGF0aC5jcmVhdGUoU2NvcGVIZWxwZXIuZ2V0KHZhcmlhYmxlTWFwLCBcIlNPVVJDRV9ESVJcIikucmVzb2x2ZShkZXN0KSk7XG4gICAgY29uc3Qgc3JjU3RyID0gc3JjUGF0aC50b1N0cmluZygpO1xuICAgIGlmICh0aGlzLl9zdWJkaXJBbGlhcy5oYXNPd25Qcm9wZXJ0eShzcmNTdHIpKVxuICAgICAgbG9nZ2VyLndhcm4oYE93ZXJyaWRlIFwiJHtzcmNTdHJ9XCIgc3ViZGlyZWN0b3J5IGFsaWFzYCk7XG4gICAgdGhpcy5fc3ViZGlyQWxpYXNbc3JjU3RyXSA9IGRlc3RQYXRoO1xuICB9XG5cbiAgcHVibGljIGFkZENhY2hlVmFyaWFibGVzKHZhcmlhYmxlczogQ2FjaGVWYXJpYWJsZURlc2NyaXB0b3JzKSB7XG4gICAgY29uc3QgY2FjaGUgPSB0aGlzW0NBQ0hFXTtcbiAgICBmb3IgKGNvbnN0IFtrZXksIGVudHJ5XSBvZiBPYmplY3QuZW50cmllcyh2YXJpYWJsZXMpKSB7XG4gICAgICBjYWNoZVtrZXldID0gZW50cnk7XG4gICAgfVxuICB9XG5cbiAgcHVibGljIGxvYWRDYWNoZVZhcmlhYmxlcyhmaWxlbmFtZTogQWJzb2x1dGVQYXRoIHwgc3RyaW5nKSB7XG4gICAgaWYgKGZpbGVFeGlzdHNTeW5jKGZpbGVuYW1lLnRvU3RyaW5nKCkpKSB7XG4gICAgICBjb25zdCB2YXJpYWJsZXMgPSByZXF1aXJlU3luYyhmaWxlbmFtZS50b1N0cmluZygpKTtcbiAgICAgIHRoaXMuYWRkQ2FjaGVWYXJpYWJsZXModmFyaWFibGVzKTtcbiAgICB9XG4gIH1cblxuICBwdWJsaWMgY29weUNhY2hlVmFyaWFibGVzKHNjb3BlOiBhbnkpIHtcbiAgICBmb3IgKGNvbnN0IFtuYW1lLCBlbnRyeV0gb2YgT2JqZWN0LmVudHJpZXModGhpc1tDQUNIRV0pKSB7XG4gICAgICBpZiAoIU9iamVjdC5oYXNPd24oc2NvcGUsIG5hbWUpKSB7XG4gICAgICAgIGNvbnN0IHR5cGUgPSBlbnRyeS50eXBlIHx8IHR5cGVvZiBlbnRyeS52YWx1ZTtcbiAgICAgICAgY29uc3QgZGVzY3JpcHRpb24gPSBlbnRyeS5kZXNjcmlwdGlvbiB8fCBcIlwiO1xuICAgICAgICBsZXQgdmFsdWUgPSBBcnJheS5pc0FycmF5KGVudHJ5LnZhbHVlKSA/IFsgLi4uZW50cnkudmFsdWUgXSA6IGVudHJ5LnZhbHVlOyAgXG4gICAgICAgIGNvbnN0IG5hbWVTeW1ib2wgPSBTeW1ib2wobmFtZSk7XG4gICAgICAgIHNjb3BlW25hbWVTeW1ib2xdID0gZW5zdXJlVmFsdWVCeVR5cGUodHlwZSwgdmFsdWUpO1xuICBcbiAgICAgICAgT2JqZWN0LmRlZmluZVByb3BlcnR5KHNjb3BlLCBuYW1lLCB7XG4gICAgICAgICAgZW51bWVyYWJsZTogdHJ1ZSxcbiAgICAgICAgICBnZXQoKSB7XG4gICAgICAgICAgICByZXR1cm4gdGhpc1tuYW1lU3ltYm9sXTtcbiAgICAgICAgICB9LFxuICAgICAgICAgIHNldCh2YWx1ZSkge1xuICAgICAgICAgICAgdGhpc1tuYW1lU3ltYm9sXSA9IGVuc3VyZVZhbHVlQnlUeXBlKHR5cGUsIHZhbHVlKTtcbiAgICAgICAgICB9LFxuICAgICAgICB9KTtcbiAgICAgIH1cbiAgICB9XG4gIH1cblxuICBwdWJsaWMgZXhlY3V0ZVNjcmlwdFN5bmModmFyaWFibGVNYXA6IFZhcmlhYmxlTWFwLCBzY3JpcHQ6IGFueSwgcGFyYW1zOiBhbnkpIHtcbiAgICBjb25zdCBuZXdWYXJpYWJsZU1hcCA9IFNjb3BlSGVscGVyLmNsb25lVmFyaWFibGVNYXAodmFyaWFibGVNYXApO1xuICAgIHBhcmFtcyAmJiBTY29wZUhlbHBlci5leHRlbmRWYXJpYWJsZU1hcEJ5VmFsdWVzKG5ld1ZhcmlhYmxlTWFwLCBcIlwiLCBwYXJhbXMpO1xuICAgIGNvbnN0IHNjcmlwdFBhdGggPSBTY29wZUhlbHBlci5nZXQobmV3VmFyaWFibGVNYXAsIFwiU09VUkNFX0RJUlwiKS5yZXNvbHZlKHNjcmlwdCk7XG4gICAgY29uc3QgZnVuYyA9IHJlcXVpcmVTeW5jKHNjcmlwdFBhdGgudG9TdHJpbmcoKSk7XG4gICAgY29uc3QgbWsgPSBTY3JpcHRDb250ZXh0LmNyZWF0ZShuZXdWYXJpYWJsZU1hcCk7XG4gICAgZnVuYyhtayk7XG4gIH1cblxuICBwdWJsaWMgd3JpdGVDYWNoZVZhcmlhYmxlcyhmaWxlbmFtZTogc3RyaW5nKSB7XG4gICAgY29uc3QganNvbiA9IEpTT04uc3RyaW5naWZ5KHRoaXNbQ0FDSEVdLCBudWxsLCAyKTtcbiAgICBmcy53cml0ZUZpbGVTeW5jKGZpbGVuYW1lLCBqc29uLCBcInV0Zi04XCIpO1xuICB9XG5cbiAgcHVibGljIGFzeW5jIHByZXBlYXJTY3JpcHRGaWxlKHZhcmlhYmxlTWFwOiBWYXJpYWJsZU1hcCk6IFByb21pc2U8Ym9vbGVhbj4ge1xuICAgIGNvbnN0IG9yaWdpblNvdXJjZURpciA9IFNjb3BlSGVscGVyLmdldCh2YXJpYWJsZU1hcCwgXCJTT1VSQ0VfRElSXCIpLnRvU3RyaW5nKCk7XG4gICAgY29uc3QgcmVzb2x2ZVNvdXJjZURpciA9IHRoaXMucmVzb2x2ZVN1YmRpcmVjdG9yeShvcmlnaW5Tb3VyY2VEaXIpO1xuICAgIGlmICghcmVzb2x2ZVNvdXJjZURpcikge1xuICAgICAgbG9nZ2VyLmluZm8oYFNvdXJjZSBkaXIgXCIke29yaWdpblNvdXJjZURpcn1cIiB3YXMgZGlzYWJsZWRgKTtcbiAgICAgIHJldHVybiBmYWxzZTtcbiAgICB9XG4gICAgU2NvcGVIZWxwZXIuc2V0KHZhcmlhYmxlTWFwLCBcIlNPVVJDRV9ESVJcIiwgcmVzb2x2ZVNvdXJjZURpcik7XG5cbiAgICBpZiAoIVNjb3BlSGVscGVyLmdldCh2YXJpYWJsZU1hcCwgXCJTQ1JJUFRfRklMRVwiKSkge1xuICAgICAgbGV0IHNjcmlwdEZpbGU6IEFic29sdXRlUGF0aCB8IHVuZGVmaW5lZDtcbiAgICAgIGNvbnN0IGZpbGVMaXN0ID0gWyBcIi5qc1wiLCBcIi5tanNcIiBdLm1hcChpID0+IFwiTWFrZVNjcmlwdFwiICsgaSk7XG4gICAgICBmb3IgKGNvbnN0IGZpbGVuYW1lIG9mIGZpbGVMaXN0KSB7XG4gICAgICAgIGNvbnN0IGl0ZXIgPSBTY29wZUhlbHBlci5nZXQodmFyaWFibGVNYXAsIFwiU09VUkNFX0RJUlwiKS5qb2luKGZpbGVuYW1lKTtcbiAgICAgICAgaWYgKGF3YWl0IGZpbGVFeGlzdHMoaXRlci50b1N0cmluZygpKSkge1xuICAgICAgICAgIHNjcmlwdEZpbGUgPSBpdGVyO1xuICAgICAgICAgIGJyZWFrO1xuICAgICAgICB9XG4gICAgICB9XG5cbiAgICAgIGlmICghc2NyaXB0RmlsZSlcbiAgICAgICAgdGhyb3cgbmV3IEVycm9yKGBUaGVyZSBhcmUgbm8gZmlsZXMgJHtmaWxlTGlzdC5qb2luKFwiLCBcIil9IGluIFwiJHtTY29wZUhlbHBlci5nZXQodmFyaWFibGVNYXAsIFwiU09VUkNFX0RJUlwiKX1cImApO1xuXG4gICAgICBTY29wZUhlbHBlci5zZXQodmFyaWFibGVNYXAsIFwiU0NSSVBUX0ZJTEVcIiwgc2NyaXB0RmlsZSk7XG4gICAgICBTY29wZUhlbHBlci5zZXQodmFyaWFibGVNYXAsIFwiU0NSSVBUX0RJUlwiLCBTY29wZUhlbHBlci5nZXQodmFyaWFibGVNYXAsIFwiU0NSSVBUX0ZJTEVcIikuZGlybmFtZSgpKTtcbiAgICB9XG5cbiAgICB0aGlzLnJlZ2lzdGVyVmFyaWFibGVNYXAoU2NvcGVIZWxwZXIuZ2V0KHZhcmlhYmxlTWFwLCBcIlNDUklQVF9GSUxFXCIpLnRvU3RyaW5nKCksIHZhcmlhYmxlTWFwKTtcbiAgICByZXR1cm4gdHJ1ZTtcbiAgfVxuXG4gIHB1YmxpYyBhZGRTdWJkaXJlY3RvcnkodmFyaWFibGVNYXA6IFZhcmlhYmxlTWFwLCBzb3VyY2VEaXI6IGFueSwgYmluYXJ5RGlyPzogYW55KSB7XG4gICAgY29uc3QgbmV3VmFyaWFibGVNYXAgPSBjcmVhdGVWYXJpYWJsZU1hcEZvckRpcmVjdG9yeSh2YXJpYWJsZU1hcCwgc291cmNlRGlyLCBiaW5hcnlEaXIpO1xuICAgIGlmIChuZXdWYXJpYWJsZU1hcCkge1xuICAgICAgdGhpcy5fc3ViZGlyTGlzdC5wdXNoKG5ld1ZhcmlhYmxlTWFwKTtcbiAgICB9XG4gIH1cblxuICBwdWJsaWMgZmluZFNjcmlwdEZ1bmN0aW9uKG5hbWU6IHN0cmluZyk6IEZ1bmN0aW9uIHwgdW5kZWZpbmVkIHtcbiAgICByZXR1cm4gdGhpc1tCVUlMVElOX1NDUklQVFNdW25hbWVdO1xuICB9XG5cbiAgcHVibGljIGFwcGx5TWFpblRhcmdldHModGFyZ2V0czogTWFpblRhcmdldFtdKSB7XG4gICAgZm9yIChjb25zdCBpdGVyIG9mIHRhcmdldHMpXG4gICAgICB0aGlzW1RBUkdFVFNdLnNldChpdGVyLnRhcmdldE5hbWUsIGl0ZXIpO1xuICB9XG5cbiAgcHVibGljIGFwcGx5TWFpblNjcmlwdHMoc2NyaXB0czogQ3VzdG9tU2NyaXB0W10pIHtcbiAgICBmb3IgKGNvbnN0IGl0ZXIgb2Ygc2NyaXB0cylcbiAgICAgICAgdGhpcy5fY3VzdG9tU2NyaXB0cy5zZXQoaXRlci5OQU1FLCBpdGVyKTtcbiAgfVxuXG4gIHB1YmxpYyBhcHBseUluc3RhbGxFbnRpdGllcyhlbnRyaWVzOiBJbnN0YWxsRW50aXR5W10pIHtcbiAgICBmb3IgKGNvbnN0IGl0ZXIgb2YgZW50cmllcylcbiAgICAgICAgdGhpcy5faW5zdGFsbExpc3QucHVzaChpdGVyKTtcbiAgfVxuXG4gIHB1YmxpYyBhcHBsUG9zdFRhcmdldHModGFyZ2V0czogUG9zdFRhcmdldFtdKSB7XG4gICAgZm9yIChjb25zdCBwb3N0VGFyZ2V0IG9mIHRhcmdldHMpIHtcbiAgICAgIGNvbnN0IHRhcmdldCA9IHRoaXNbVEFSR0VUU10uZ2V0KHBvc3RUYXJnZXQubmFtZSk7XG4gICAgICBpZiAoIXRhcmdldClcbiAgICAgICAgdGhyb3cgbmV3IEVycm9yKGBUaGVyZSBpcyBubyBUYXJnZXQgbmFtZWQgJHtuYW1lfWApO1xuICAgICAgdGFyZ2V0LnBvc3RVcGRhdGUocG9zdFRhcmdldCk7XG4gICAgfVxuICB9XG5cbiAgcHVibGljIGFwcGxQb3N0U2NyaXB0cyhzY3JpcHRzOiBQb3N0Q3VzdG9tU2NyaXB0W10pIHtcbiAgICBmb3IgKGNvbnN0IHBvc3RTY3JpcHQgb2Ygc2NyaXB0cykge1xuICAgICAgY29uc3Qgc2NyaXB0ID0gdGhpcy5fY3VzdG9tU2NyaXB0cy5nZXQocG9zdFNjcmlwdC5uYW1lKTtcbiAgICAgIGlmICghc2NyaXB0KVxuICAgICAgICB0aHJvdyBuZXcgRXJyb3IoYFRoZXJlIGlzIG5vIEN1c3RvbVNjcmlwdCBuYW1lZCAke25hbWV9YCk7XG4gICAgICBzY3JpcHQucG9zdFVwZGF0ZShwb3N0U2NyaXB0KTtcbiAgICB9XG4gIH1cblxuICBwdWJsaWMgYXN5bmMgZG9TdWJkaXJlY3RvcnkoKSB7XG4gICAgY29uc3QgY29udGV4dExpc3QgPSBuZXcgQXJyYXk8TG9jYWxNYWtlQ29udGV4dD4oKTtcblxuICAgIGZvciAoOzspIHtcbiAgICAgIGNvbnN0IHZhcmlhYmxlTWFwID0gdGhpcy5fc3ViZGlyTGlzdC5zaGlmdCgpO1xuICAgICAgaWYgKCF2YXJpYWJsZU1hcClcbiAgICAgICAgYnJlYWs7XG5cbiAgICAgIGlmICghYXdhaXQgdGhpcy5wcmVwZWFyU2NyaXB0RmlsZSh2YXJpYWJsZU1hcCkpXG4gICAgICAgIGNvbnRpbnVlO1xuXG4gICAgICBjb25zdCBjdHggPSBuZXcgTG9jYWxNYWtlQ29udGV4dCh2YXJpYWJsZU1hcCwgdGhpcyk7XG4gICAgICBjb250ZXh0TGlzdC5wdXNoKGN0eCk7XG4gICAgICBjb25zdCBtayA9IFVzZXJNYWtlQ29udGV4dC5jcmVhdGUoY3R4LCB2YXJpYWJsZU1hcCk7XG5cbiAgICAgIGNvbnN0IGN3ZFNhdmUgPSBwcm9jZXNzLmN3ZCgpO1xuICAgICAgcHJvY2Vzcy5jaGRpcihtay5TQ1JJUFRfRElSLnRvU3RyaW5nKCkpO1xuICAgICAgYXdhaXQgcGVyZm9ybUNvbnRleHQobWspO1xuICAgICAgcHJvY2Vzcy5jaGRpcihjd2RTYXZlKTtcbiAgICB9XG5cbiAgICBmb3IgKGNvbnN0IGN0eCBvZiBjb250ZXh0TGlzdCkge1xuICAgICAgdGhpcy5hcHBseU1haW5UYXJnZXRzKEFycmF5LmZyb20oY3R4LnRhcmdldHMudmFsdWVzKCkpKTtcbiAgICAgIHRoaXMuYXBwbHlNYWluU2NyaXB0cyhBcnJheS5mcm9tKGN0eC5tYWluU2NyaXB0cy52YWx1ZXMoKSkpO1xuICAgICAgdGhpcy5hcHBseUluc3RhbGxFbnRpdGllcyhjdHguaW5zdGFsbExpc3QpO1xuICAgIH1cblxuICAgIGZvciAoY29uc3QgY3R4IG9mIGNvbnRleHRMaXN0KSB7XG4gICAgICB0aGlzLmFwcGxQb3N0VGFyZ2V0cyhBcnJheS5mcm9tKGN0eC5wb3N0VGFyZ2V0cy52YWx1ZXMoKSkpO1xuICAgICAgdGhpcy5hcHBsUG9zdFNjcmlwdHMoQXJyYXkuZnJvbShjdHgucG9zdFNjcmlwdHMudmFsdWVzKCkpKTtcbiAgICB9XG4gIH1cblxuICBwdWJsaWMgY3JlYXRlR29hbHMoc2NvcGU6IFN5c3RlbVNjb3BlKTogR29hbENvbGxlY3Rpb24ge1xuICAgIGNvbnN0IGdvYWxMaXN0ID0gbmV3IEdvYWxDb2xsZWN0aW9uO1xuICAgIGZvciAoY29uc3QgW25hbWUsIHNjcmlwdF0gb2YgdGhpcy5fY3VzdG9tU2NyaXB0cy5lbnRyaWVzKCkpIHsgICBcbiAgICAgIGNvbnN0IGRlcGVuZHMgPSBbXTtcblxuICAgICAgbGV0IHNjcmlwdE9iajogQWJzb2x1dGVQYXRoIHwgRnVuY3Rpb247XG4gICAgICBpZiAodHlwZW9mIHNjcmlwdC5zY3JpcHRNb2R1bGUgPT09IFwic3RyaW5nXCIpIHtcbiAgICAgICAgY29uc3QgZnVuYyA9IHRoaXMuZmluZFNjcmlwdEZ1bmN0aW9uKHNjcmlwdC5zY3JpcHRNb2R1bGUpO1xuICAgICAgICBzY3JpcHRPYmogPSBmdW5jID8gZnVuYyA6IHNjcmlwdC5zb3VyY2VEaXIucmVzb2x2ZShzY3JpcHQuc2NyaXB0TW9kdWxlKTtcbiAgICAgIH1cbiAgICAgIGVsc2Uge1xuICAgICAgICBkZXBlbmRzLnB1c2goc2NyaXB0LnNjcmlwdE1vZHVsZS50b1BhdGgoKSk7XG4gICAgICAgIHNjcmlwdE9iaiA9IHNjcmlwdC5zY3JpcHRNb2R1bGU7XG4gICAgICB9XG5cbiAgICAgIGlmIChzY3JpcHQuSU5QVVQpIHtcbiAgICAgICAgZGVwZW5kcy5wdXNoKHNjcmlwdC5JTlBVVC50b1BhdGgoKSk7XG4gICAgICB9XG5cbiAgICAgIGNvbnN0IG1zZyA9IFwiXFx4MWJbMzZtXCIgKyBcIkdlbmVyYXRpbmcgXCIgKyBzY3JpcHQuYmluYXJ5RGlyLnJlbGF0aXZlKHNjcmlwdC5PVVRQVVQpICsgXCJcXHgxYlswbVwiO1xuICAgICAgY29uc3QgZ2UgPSBuZXcgR29hbFRhcmdldChuYW1lKTtcbiAgICAgIGdlLm1lc3NhZ2UgPSBtc2c7XG4gICAgICBnZS5vdXRwdXQgPSBzY3JpcHQuT1VUUFVUO1xuICAgICAgZ2UuYWRkRGVwZW5kZW5jeSguLi5kZXBlbmRzKTtcbiAgICAgIGdlLmFkZFRhc2sobmV3IEV4ZWNTY3JpcHRUYXNrKHNjcmlwdC52YXJpYWJsZU1hcCwgc2NyaXB0T2JqKSk7XG4gICAgICBnb2FsTGlzdC5hZGRUYXJnZXQoZ2UpO1xuICAgIH1cblxuICAgIGNvbnN0IG9iamVjdEZpbGVzID0gbmV3IE1hcDxTb3VyY2VGaWxlLCBBYnNvbHV0ZVBhdGg+KCk7XG4gICAgZm9yIChjb25zdCB0YXJnZXQgb2YgdGhpc1tUQVJHRVRTXS5FTlRSSUVTLnZhbHVlcygpKSB7XG4gICAgICBmb3IgKGNvbnN0IGl0IG9mIHRhcmdldC5nZXRTb3VyY2VGaWxlcygpKSB7XG4gICAgICAgIGlmICghaXQuTEFOR1VBR0UpXG4gICAgICAgICAgY29udGludWU7XG4gICAgICAgIGNvbnN0IHJmaWxlMSA9IHRhcmdldC5iaW5hcnlEaXIucmVsYXRpdmUoaXQuRklMRSk7XG4gICAgICAgIGNvbnN0IHJmaWxlMiA9ICB0YXJnZXQuc291cmNlRGlyLnJlbGF0aXZlKGl0LkZJTEUpO1xuICAgICAgICBjb25zdCByZmlsZSA9IChyZmlsZTIubGVuZ3RoIDwgcmZpbGUxLmxlbmd0aCA/IHJmaWxlMiA6IHJmaWxlMSkucmVwbGFjZShcIi4uL1wiLCBcIl9fL1wiKTtcbiAgICAgICAgY29uc3Qgb2ZpbGUgPSAgdGFyZ2V0LmJpbmFyeURpci5qb2luKFwiTWFrZUZpbGVzXCIsIHRhcmdldC50YXJnZXROYW1lICsgXCIuZGlyXCIsICByZmlsZSArIFwiLm9ialwiKTtcbiAgICAgICAgb2JqZWN0RmlsZXMuc2V0KGl0LCBvZmlsZSk7XG4gICAgICB9XG4gICAgfVxuXG4gICAgZm9yIChjb25zdCBbbmFtZSwgdGFyZ2V0XSBvZiB0aGlzW1RBUkdFVFNdLkVOVFJJRVMpIHtcbiAgICAgIGNvbnN0IGRlcGVuZHMgPSBbXTtcbiAgICAgIGZvciAoY29uc3QgcyBvZiB0YXJnZXQuZ2V0VGFyZ2V0T2JqZWN0cygpKSB7XG4gICAgICAgIGNvbnN0IHQgPSB0aGlzW1RBUkdFVFNdLmdldChzLnRhcmdldE5hbWUpO1xuICAgICAgICBmb3IgKGNvbnN0IGYgb2YgdC5nZXRTb3VyY2VGaWxlcygpKSB7XG4gICAgICAgICAgY29uc3QgbyA9IG9iamVjdEZpbGVzLmdldChmKTtcbiAgICAgICAgICBvICYmIGRlcGVuZHMucHVzaChvLnRvU3RyaW5nKCkpO1xuICAgICAgICB9XG4gICAgICB9XG4gIFxuICAgICAgY29uc3QgaGVhZGVycyA9IHRoaXNbVEFSR0VUU10uYWxsSGVhZGVyc09mKHRhcmdldCk7XG4gICAgICBmb3IgKGNvbnN0IHMgb2YgdGFyZ2V0LmdldFNvdXJjZUZpbGVzKCkpIHtcbiAgICAgICAgaWYgKHMuSEVBREVSX0ZJTEVfT05MWSlcbiAgICAgICAgICBjb250aW51ZTtcblxuICAgICAgICBjb25zdCBvID0gb2JqZWN0RmlsZXMuZ2V0KHMpO1xuICAgICAgICBpZiAoIW8pXG4gICAgICAgICAgdGhyb3cgbmV3IEVycm9yKGBPQkpFQ1RfRklMRSBpcyBudWxsYCk7XG5cbiAgICAgICAgZnMubWtkaXJTeW5jKG8uZGlybmFtZSgpLnRvU3RyaW5nKCksIHsgcmVjdXJzaXZlOiB0cnVlIH0pO1xuICBcbiAgICAgICAgY29uc3QgcmVsYXRpdmVPYmplY3QgPSB0YXJnZXQuYmluYXJ5RGlyLnJlbGF0aXZlKG8pO1xuICAgICAgICBjb25zdCByZWxhdGl2ZUJpbmFyeURpciA9IHNjb3BlLlBST0pFQ1RfQklOQVJZX0RJUi5yZWxhdGl2ZSh0YXJnZXQuYmluYXJ5RGlyKTtcbiAgICAgICAgY29uc3QgbXNnID0gXCJcXHgxYlszMm1cIiArIGBCdWlsZGluZyAke3MuTEFOR1VBR0V9IG9iamVjdCAke3JlbGF0aXZlQmluYXJ5RGlyfS8ke3JlbGF0aXZlT2JqZWN0fWAgKyBcIlxceDFiWzBtXCI7XG4gIFxuICAgICAgICBjb25zdCBkZWZpbml0aW9ucyA9IFtcbiAgICAgICAgICAuLi50aGlzW1RBUkdFVFNdLmFsbERlZmluaXRpb25zT2YodGFyZ2V0KSxcbiAgICAgICAgICAuLi5zLkRFRklORVMsXG4gICAgICAgIF07XG5cbiAgICAgICAgY29uc3QgYXJnczogc3RyaW5nW10gPSBbXTtcbiAgICAgICAgYXJncy5wdXNoKC4uLmRlZmluaXRpb25zLm1hcChpID0+IFwiLURcIiArIGkpKTtcbiAgICAgICAgYXJncy5wdXNoKC4uLnRoaXNbVEFSR0VUU10uYWxsSW5jbHVkZXNPZih0YXJnZXQpLm1hcChpID0+IFwiLUlcIiArIGkpKTtcbiAgICAgICAgYXJncy5wdXNoKC4uLnRoaXNbVEFSR0VUU10uYWxsQ29tcGlsZU9wdGlvbnNPZih0YXJnZXQpKTtcbiAgICAgICAgaWYgKHRhcmdldC5wb3NpdGlvbkluZGVwZW5kZW50Q29kZSlcbiAgICAgICAgICBhcmdzLnB1c2goXCItZlBJQ1wiKTtcbiAgICAgICAgYXJncy5wdXNoKC4uLnMuQ09NUElMRV9GTEFHUy5mbGF0KCkpO1xuICAgICAgICBhcmdzLnB1c2goXCItb1wiLCByZWxhdGl2ZU9iamVjdCk7XG4gICAgICAgIGFyZ3MucHVzaChcIi1jXCIsIHMuRklMRS50b1N0cmluZygpKTtcbiAgXG4gICAgICAgIGNvbnN0IG91dHB1dCA9IEFic29sdXRlUGF0aC5jcmVhdGUodGFyZ2V0LmJpbmFyeURpci5qb2luKHJlbGF0aXZlT2JqZWN0KSk7XG4gICAgICAgIGRlcGVuZHMucHVzaChvdXRwdXQudG9TdHJpbmcoKSk7XG5cbiAgICAgICAgY29uc3QgZ2UgPSBuZXcgR29hbFRhcmdldDtcbiAgICAgICAgZ2UubWVzc2FnZSA9IG1zZztcbiAgICAgICAgZ2Uub3V0cHV0ID0gb3V0cHV0O1xuICAgICAgICBnZS5hZGREZXBlbmRlbmN5KC4uLmhlYWRlcnMpO1xuICAgICAgICBnZS5hZGREZXBlbmRlbmN5KHMuRklMRS50b1BhdGgoKSk7XG4gICAgICAgIGdlLmFkZFRhc2sobmV3IFNwYXduU3luY1Rhc2socy5DT01QSUxFX1BBVEgudG9TdHJpbmcoKSwgYXJncywgdGFyZ2V0LmJpbmFyeURpci50b1BhdGgoKSkpO1xuICAgICAgICBnb2FsTGlzdC5hZGRUYXJnZXQoZ2UpO1xuICAgICAgfVxuXG4gICAgICBjb25zdCBnZW5lcmFsR29hbCA9IG5ldyBHb2FsVGFyZ2V0O1xuICAgICAgZm9yIChjb25zdCBwYXJhbXMgb2YgdGFyZ2V0LnByZUJ1aWxkTGlzdCkge1xuICAgICAgICBjb25zdCBleGVjU3RydWN0ID0gcmVzb2x2ZVRhcmdldENvbW1hbmQodGhpcywgcGFyYW1zKTtcbiAgICAgICAgZ2VuZXJhbEdvYWwuYWRkVGFzayhuZXcgU3Bhd25TeW5jVGFzayhleGVjU3RydWN0LmNvbW1hbmQsIGV4ZWNTdHJ1Y3QuYXJncywgdGFyZ2V0LmJpbmFyeURpci50b1N0cmluZygpKSk7XG4gICAgICB9XG5cbiAgICAgIGNvbnN0IGxpbmtPcHRpb25zID0gdGhpc1tUQVJHRVRTXS5hbGxMaW5rT3B0aW9uc09mKHRhcmdldCk7XG4gICAgICBpZiAodGFyZ2V0LmlzT2JqZWN0TGlicmFyeSkge1xuICAgICAgICBjb25zdCBvYmpzID0gZGVwZW5kcy5maWx0ZXIoaSA9PiBpLmVuZHNXaXRoKFwiLm9cIikgfHwgaS5lbmRzV2l0aChcIi5vYmpcIikpLm1hcChpID0+IHRhcmdldC5nZXRGaWxlRGlyKCkucmVsYXRpdmUoaSkpO1xuICAgICAgICBpZiAob2Jqcy5sZW5ndGgpIHtcbiAgICAgICAgICBjb25zdCBhcmdzID0gW1xuICAgICAgICAgICAgLi4ubGlua09wdGlvbnMsXG4gICAgICAgICAgICBcIi1yXCIsXG4gICAgICAgICAgICBcIi1vXCIsIHRhcmdldC5nZXRGaWxlTmFtZSgpLFxuICAgICAgICAgICAgLi4ub2Jqc1xuICAgICAgICAgIF07XG4gICAgICAgICAgZ2VuZXJhbEdvYWwubWVzc2FnZSA9IGBMaW5raW5nICR7dGFyZ2V0Lmxhbmd1YWdlfSBvYmplY3QgbGlicmFyeSAke3RhcmdldC5nZXRGaWxlTmFtZSgpfWA7XG4gICAgICAgICAgZ2VuZXJhbEdvYWwub3V0cHV0ID0gdGFyZ2V0LmdldEZpbGUoKTtcbiAgICAgICAgICBnZW5lcmFsR29hbC5hZGREZXBlbmRlbmN5KC4uLmRlcGVuZHMpO1xuICAgICAgICAgIGdlbmVyYWxHb2FsLmFkZFRhc2sobmV3IFNwYXduU3luY1Rhc2soc2NvcGUuTElOS0VSLCBhcmdzLCB0YXJnZXQuZ2V0RmlsZURpcigpLnRvU3RyaW5nKCkpKTtcbiAgICAgICAgfVxuICAgICAgICBlbHNlIHtcbiAgICAgICAgICBsb2dnZXIuaW5mbyhgTm8gb2JqZWN0cyBmb3IgXCIke3RhcmdldC50YXJnZXROYW1lfVwiYCk7XG4gICAgICAgIH1cbiAgICAgIH1cbiAgXG4gICAgICBpZiAodGFyZ2V0LmlzU3RhdGljTGlicmFyeSkge1xuICAgICAgICBjb25zdCBvYmpzID0gZGVwZW5kcy5maWx0ZXIoaSA9PiBpLmVuZHNXaXRoKFwiLm9cIikgfHwgaS5lbmRzV2l0aChcIi5vYmpcIikpLm1hcChpID0+IHRhcmdldC5nZXRGaWxlRGlyKCkucmVsYXRpdmUoaSkpO1xuICAgICAgICBpZiAob2Jqcy5sZW5ndGgpIHtcbiAgICAgICAgICBjb25zdCBhcmdzID0gWyBcInJjXCIsIHRhcmdldC5nZXRGaWxlTmFtZSgpICwgLi4ub2JqcyBdO1xuICAgICAgICAgIGdlbmVyYWxHb2FsLm1lc3NhZ2UgPSBgTGlua2luZyAke3RhcmdldC5sYW5ndWFnZX0gc3RhdGljIGxpYnJhcnkgJHt0YXJnZXQuZ2V0RmlsZU5hbWUoKX1gO1xuICAgICAgICAgIGdlbmVyYWxHb2FsLm91dHB1dCA9IHRhcmdldC5nZXRGaWxlKCk7XG4gICAgICAgICAgZ2VuZXJhbEdvYWwuYWRkRGVwZW5kZW5jeSguLi5kZXBlbmRzKTtcbiAgICAgICAgICBnZW5lcmFsR29hbC5hZGRUYXNrKG5ldyBTcGF3blN5bmNUYXNrKHNjb3BlLkFSLCBhcmdzLCB0YXJnZXQuZ2V0RmlsZURpcigpLnRvU3RyaW5nKCkpKTtcbiAgICAgICAgfVxuICAgICAgICBlbHNlIHtcbiAgICAgICAgICBsb2dnZXIuaW5mbyhgTm8gb2JqZWN0cyBmb3IgXCIke3RhcmdldC50YXJnZXROYW1lfVwiYCk7XG4gICAgICAgIH1cbiAgICAgIH1cbiAgXG4gICAgICBpZiAodGFyZ2V0LmlzU2hhcmVkTGlicmFyeSkge1xuICAgICAgICB0aHJvdyBuZXcgRXJyb3IoXCJOb3QgaW1wbGVtZW50ZWRcIik7XG4gICAgICB9XG5cbiAgICAgIGlmICh0YXJnZXQuaXNFeGVjdXRhYmxlKSB7XG4gICAgICAgIGNvbnN0IG9ianMgPSBkZXBlbmRzLmZpbHRlcihpID0+IGkuZW5kc1dpdGgoXCIub1wiKSB8fCBpLmVuZHNXaXRoKFwiLm9ialwiKSkubWFwKGkgPT4gdGFyZ2V0LmdldEZpbGVEaXIoKS5yZWxhdGl2ZShpKSk7XG4gICAgICAgIGlmIChvYmpzLmxlbmd0aCkge1xuICAgICAgICAgIGNvbnN0IGxpYnMgPSB0aGlzW1RBUkdFVFNdLmFsbExpYnJhcmllc09mKHRhcmdldCk7XG4gICAgICAgICAgY29uc3QgYXJncyA9IFtcbiAgICAgICAgICAgIC4uLnRhcmdldC5jb21waWxlckZsYWdzLFxuICAgICAgICAgICAgLi4ubGlua09wdGlvbnMsXG4gICAgICAgICAgICAuLi5vYmpzLFxuICAgICAgICAgICAgXCItb1wiLCB0YXJnZXQuZ2V0RmlsZU5hbWUoKSxcbiAgICAgICAgICAgIC4uLmxpYnMubWFwKGkgPT4gdGFyZ2V0LmdldEZpbGVEaXIoKS5yZWxhdGl2ZShpKSksXG4gICAgICAgICAgXTtcblxuICAgICAgICAgIGdlbmVyYWxHb2FsLm1lc3NhZ2UgPSBgTGlua2luZyAke3RhcmdldC5sYW5ndWFnZX0gZXhlY3V0YWJsZSAke3RhcmdldC5nZXRGaWxlTmFtZSgpfWA7XG4gICAgICAgICAgZ2VuZXJhbEdvYWwub3V0cHV0ID0gdGFyZ2V0LmdldEZpbGUoKTtcbiAgICAgICAgICBnZW5lcmFsR29hbC5hZGREZXBlbmRlbmN5KC4uLmRlcGVuZHMpO1xuICAgICAgICAgIGdlbmVyYWxHb2FsLmFkZERlcGVuZGVuY3koLi4ubGlicyk7XG4gICAgICAgICAgZ2VuZXJhbEdvYWwuYWRkVGFzayhuZXcgU3Bhd25TeW5jVGFzayh0YXJnZXQuY29tcGlsZXJQYXRoLCBhcmdzLCB0YXJnZXQuZ2V0RmlsZURpcigpLnRvU3RyaW5nKCkpKTtcbiAgICAgICAgfVxuICAgICAgICBlbHNlIHtcbiAgICAgICAgICBsb2dnZXIuaW5mbyhgTm8gb2JqZWN0cyBmb3IgXCIke3RhcmdldC50YXJnZXROYW1lfVwiYCk7XG4gICAgICAgIH1cbiAgICAgIH1cblxuICAgICAgZm9yIChjb25zdCBwYXJhbXMgb2YgdGFyZ2V0LnBvc3RCdWlsZExpc3QpIHtcbiAgICAgICAgY29uc3QgZXhlY1N0cnVjdCA9IHJlc29sdmVUYXJnZXRDb21tYW5kKHRoaXMsIHBhcmFtcyk7XG4gICAgICAgIGdlbmVyYWxHb2FsLmFkZFRhc2sobmV3IFNwYXduU3luY1Rhc2soZXhlY1N0cnVjdC5jb21tYW5kLCBleGVjU3RydWN0LmFyZ3MsIHRhcmdldC5iaW5hcnlEaXIudG9TdHJpbmcoKSkpO1xuICAgICAgfVxuICAgICAgXG4gICAgICBnb2FsTGlzdC5hZGRUYXJnZXQoZ2VuZXJhbEdvYWwpO1xuXG4gICAgICBjb25zdCB3b3JrZXIgPSBuZXcgR29hbFRhcmdldChuYW1lKTtcbiAgICAgIHdvcmtlci5tZXNzYWdlID0gYEJ1aWx0IHRhcmdldCAke25hbWV9YDtcbiAgICAgIHdvcmtlci5hZGREZXBlbmRlbmN5KHRhcmdldC5nZXRGaWxlKCkudG9QYXRoKCkpO1xuICAgICAgZ29hbExpc3QuYWRkVGFyZ2V0KHdvcmtlcik7XG4gICAgfVxuXG4gICAgaWYgKHRoaXMuX2luc3RhbGxMaXN0Lmxlbmd0aCkge1xuICAgICAgY29uc3Qgd29ya2VyID0gbmV3IEdvYWxUYXJnZXQoSU5TVEFMTF9UQVJHRVQpO1xuICAgICAgY29uc3QgZmlsZUluc3RhbGxhdGlvblRhc2sgPSBuZXcgRmlsZUluc3RhbGxhdGlvblRhc2s7XG4gICAgICBmb3IgKGNvbnN0IGl0ZXIgb2YgdGhpcy5faW5zdGFsbExpc3QpIHtcbiAgICAgICAgbGV0IHNyYzogQWJzb2x1dGVQYXRoLCBkZXN0OiBBYnNvbHV0ZVBhdGg7XG4gICAgICAgIGlmIChpdGVyLnZhbHVlIGluc3RhbmNlb2YgQWJzb2x1dGVQYXRoKSB7XG4gICAgICAgICAgaWYgKHNjb3BlLlBSRVZFTlRfSU5TVEFMTF9GSUxFUylcbiAgICAgICAgICAgIGNvbnRpbnVlO1xuICAgICAgICAgIHNyYyA9IGl0ZXIudmFsdWU7XG4gICAgICAgICAgY29uc3QgcmZpbGUgPSAoaXRlci5iYXNlRGlyIGFzIGFueSkucmVsYXRpdmUoaXRlci52YWx1ZSk7XG4gICAgICAgICAgZGVzdCA9IGl0ZXIuZGVzdGluYXRpb24uam9pbihyZmlsZSk7XG4gICAgICAgIH1cbiAgICAgICAgZWxzZSBpZiAoaXRlci52YWx1ZSBpbnN0YW5jZW9mIFRhcmdldE5hbWUpIHtcbiAgICAgICAgICBjb25zdCB0YXJnZXROYW1lID0gaXRlci52YWx1ZS50YXJnZXROYW1lO1xuICAgICAgICAgIGNvbnN0IHRhcmdldCA9IHRoaXNbVEFSR0VUU10uZ2V0KHRhcmdldE5hbWUpO1xuICAgICAgICAgIHNyYyA9IHRhcmdldC5nZXRGaWxlKCk7XG4gICAgICAgICAgZGVzdCA9IGl0ZXIuZGVzdGluYXRpb24uam9pbih0YXJnZXQuZ2V0RmlsZU5hbWUoKSk7XG4gICAgICAgIH1cbiAgICAgICAgZWxzZSB7XG4gICAgICAgICAgdGhyb3cgbmV3IEVycm9yKGBDYW4gbm90IGluc3RhbGwgJHtpdGVyLnZhbHVlfWApXG4gICAgICAgIH1cbiAgICAgICAgaWYgKHNjb3BlLkRFU1RESVIpXG4gICAgICAgICAgZGVzdCA9IHNjb3BlLkRFU1RESVIuam9pbihkZXN0KTtcbiAgICAgICAgd29ya2VyLmFkZERlcGVuZGVuY3koc3JjLnRvUGF0aCgpKTtcbiAgICAgICAgZmlsZUluc3RhbGxhdGlvblRhc2suYWRkKHNyYywgZGVzdCk7XG4gICAgICB9XG4gICAgICB3b3JrZXIuYWRkVGFzayhmaWxlSW5zdGFsbGF0aW9uVGFzayk7XG4gICAgICBnb2FsTGlzdC5hZGRUYXJnZXQod29ya2VyKTtcbiAgICB9XG5cbiAgICBjb25zdCBnZSA9IG5ldyBHb2FsVGFyZ2V0KEFMTF9UQVJHRVQpO1xuICAgIE9iamVjdC5rZXlzKHRoaXNbVEFSR0VUU10uRU5UUklFUykuZm9yRWFjaChpID0+IHZvaWQgZ2UuYWRkRGVwZW5kZW5jeShpKSlcbiAgICBnb2FsTGlzdC5hZGRUYXJnZXQoZ2UpO1xuICBcbiAgICByZXR1cm4gZ29hbExpc3Q7XG4gIH1cblxuICBwdWJsaWMgdG9KU09OKCkge1xuICAgIHJldHVybiB7XG4gICAgICBUQVJHRVRTOiB0aGlzLlRBUkdFVFMsXG4gICAgICBjdXN0b21TY3JpcHRzOiB0aGlzLl9jdXN0b21TY3JpcHRzLFxuICAgICAgQ0FDSEU6IHRoaXMuQ0FDSEUsXG4gICAgICBpbnN0YWxsTGlzdDogdGhpcy5faW5zdGFsbExpc3QsXG4gICAgICBwcm9jZXNzZWRWYXJpYWJsZU1hcDogdGhpcy5fcHJvY2Vzc2VkVmFyaWFibGVNYXAsXG4gICAgICBzdWJkaXJBbGlhczogdGhpcy5fc3ViZGlyQWxpYXMsXG4gICAgfTtcbiAgfVxufTtcbiIsIi8qXG4gKiBNSVQgTGljZW5zZVxuICpcbiAqIENvcHlyaWdodCAoYykgMjAyNSAgWXVyaWkgWWFrdWJpbiAoeXVyaWkueWFrdWJpbkBnbWFpbC5jb20pXG4gKlxuICogUGVybWlzc2lvbiBpcyBncmFudGVkIHRvIHVzZSwgY29weSwgbW9kaWZ5LCBhbmQgZGlzdHJpYnV0ZSB0aGlzIHNvZnR3YXJlXG4gKiB1bmRlciB0aGUgTUlUIExpY2Vuc2UuIFNlZSBMSUNFTlNFIGZpbGUgZm9yIGRldGFpbHMuXG4gKi9cblxuaW1wb3J0IHsgQWJzb2x1dGVQYXRoIH0gZnJvbSBcIkAvY29yZS9BYnNvbHV0ZVBhdGhcIjtcbmltcG9ydCB7IGRlZXBDb3B5IH0gZnJvbSBcIkAvdXRpbHMvUHJpbWl0aXZlc1wiO1xuXG5pbnRlcmZhY2UgVmFyaWFibGVEZXNjcmlwdG9yIHtcbiAgdHlwZT86IHN0cmluZyB8IHN0cmluZ1tdO1xuICB2YWx1ZT86IGFueTtcbiAgZGVzY3JpcHRpb24/OiBzdHJpbmc7XG59O1xuXG5pbnRlcmZhY2UgVmFyaWFibGVFbnRyeSB7XG4gIG5hbWU6IHN0cmluZztcbiAgdHlwZTogc3RyaW5nIHwgc3RyaW5nW107XG4gIGdyb3VwOiBzdHJpbmc7XG4gIGRlc2NyaXB0aW9uOiBzdHJpbmc7XG4gIGluaXRWYWx1ZT86IGFueTtcbiAgdmFsdWU/OiBhbnk7XG59O1xuXG5leHBvcnQgaW50ZXJmYWNlIFZhcmlhYmxlTWFwIHtcbiAgWyBuYW1lOiBzdHJpbmcgXTogVmFyaWFibGVFbnRyeTtcbn07XG5cbmV4cG9ydCB0eXBlIFZhcmlhbnQgPSBib29sZWFuIHwgbnVtYmVyIHwgc3RyaW5nIHwgYm9vbGVhbltdIHwgbnVtYmVyW10gfCBzdHJpbmdbXTtcbmV4cG9ydCB0eXBlIFZhcmlhbnRNYXAgPSB7XG4gIFsgbmFtZTogc3RyaW5nIF06IFZhcmlhbnQ7XG59O1xuXG5leHBvcnQgbmFtZXNwYWNlIFNjb3BlSGVscGVyIHtcblxuZnVuY3Rpb24gdG9EZXNjcmlwdG9yKHZhbHVlOiBhbnkpOiBWYXJpYWJsZURlc2NyaXB0b3Ige1xuICBpZiAoIXZhbHVlIHx8IHR5cGVvZiB2YWx1ZSA9PT0gXCJib29sZWFuXCIgfHwgdHlwZW9mIHZhbHVlID09PSBcIm51bWJlclwiIHx8IHR5cGVvZiB2YWx1ZSA9PT0gXCJzdHJpbmdcIiB8fCBBcnJheS5pc0FycmF5KHZhbHVlKSkge1xuICAgIHJldHVybiB7IHZhbHVlIH07IFxuICB9XG4gIHJldHVybiB2YWx1ZTtcbn1cblxuZXhwb3J0IGZ1bmN0aW9uIGdldEVudHJ5VmFsdWUoZW50cnk6IFZhcmlhYmxlRW50cnkpOiBhbnkge1xuICAvKmlmICh2YWx1ZSA9PT0gdW5kZWZpbmVkKVxuICAgIHRocm93IG5ldyBFcnJvcihgVmFsdWUgb2YgJHtuYW1lfSBjYW5ub3QgYmUgb2J0YWluZWQgYmVjYXVzZSBpdCBoYXMgbm90IGJlZW4gZXN0YWJsaXNoZWRgKTsqL1xuICByZXR1cm4gKGVudHJ5LnZhbHVlID09PSB1bmRlZmluZWQpID8gZW50cnkuaW5pdFZhbHVlIDogZW50cnkudmFsdWU7XG59XG5cbmV4cG9ydCBmdW5jdGlvbiBnZXQodmFyaWFibGVNYXA6IFZhcmlhYmxlTWFwLCBuYW1lOiBzdHJpbmcpOiBhbnkge1xuICBjb25zdCBlbnRyeSA9IHZhcmlhYmxlTWFwW25hbWVdO1xuICBpZiAoZW50cnkpXG4gICAgcmV0dXJuIGdldEVudHJ5VmFsdWUoZW50cnkpO1xufVxuXG5jb25zdCBtYWtlVmFsdWVNYXA6IGFueSA9IHtcbiAgYXJyYXk6ICh2YWx1ZTogYW55KSA9PiB7XG4gICAgcmV0dXJuIEFycmF5LmlzQXJyYXkodmFsdWUpID8gQXJyYXkuZnJvbSh2YWx1ZSkgOiB1bmRlZmluZWQ7XG4gIH0sXG4gIGJvb2xlYW46ICh2YWx1ZTogYW55KSA9PiB7XG4gICAgcmV0dXJuICh0eXBlb2YgdmFsdWUgPT09IFwiYm9vbGVhblwiKSA/IHZhbHVlIDogdW5kZWZpbmVkO1xuICB9LFxuICBudW1iZXI6ICh2YWx1ZTogYW55KSA9PiB7XG4gICAgcmV0dXJuICh0eXBlb2YgdmFsdWUgPT09IFwibnVtYmVyXCIpID8gdmFsdWUgOiB1bmRlZmluZWQ7XG4gIH0sXG4gIHN0cmluZzogKHZhbHVlOiBhbnkpID0+IHtcbiAgICByZXR1cm4gKHR5cGVvZiB2YWx1ZSA9PT0gXCJzdHJpbmdcIikgPyB2YWx1ZSA6IHVuZGVmaW5lZDtcbiAgfSxcbiAgQWJzb2x1dGVQYXRoOiAodmFsdWU6IGFueSkgPT4ge1xuICAgIHJldHVybiBBYnNvbHV0ZVBhdGguY3JlYXRlKHZhbHVlKTtcbiAgfSxcbiAgRmlsZVBhdGg6ICh2YWx1ZTogYW55KSA9PiB7XG4gICAgcmV0dXJuIEFic29sdXRlUGF0aC5jcmVhdGUodmFsdWUpO1xuICB9LFxuICBEaXJQYXRoOiAodmFsdWU6IGFueSkgPT4ge1xuICAgIHJldHVybiBBYnNvbHV0ZVBhdGguY3JlYXRlKHZhbHVlKTtcbiAgfSxcbiAgb2JqZWN0OiAodmFsdWU6IGFueSkgPT4ge1xuICAgIHJldHVybiB2YWx1ZTtcbiAgfSxcbn07XG5cbmNvbnN0IHRvanNvblZhbHVlTWFwOiBhbnkgPSB7XG4gIGFycmF5OiAodmFsdWU6IGFueSkgPT4ge1xuICAgIGNvbnN0IHJlc3VsdCA9IFtdO1xuICAgIGZvciAoY29uc3QgaXRlciBvZiB2YWx1ZSkge1xuICAgICAgaWYgKGl0ZXIgJiYgdHlwZW9mIGl0ZXIgPT09IFwib2JqZWN0XCIpXG4gICAgICAgIHJlc3VsdC5wdXNoKHR5cGVvZiBpdGVyLnRvSlNPTiA9PT0gXCJmdW5jdGlvblwiID8gaXRlci50b0pTT04oKSA6IGRlZXBDb3B5KGl0ZXIpKTtcbiAgICAgIGVsc2VcbiAgICAgICAgcmVzdWx0LnB1c2goaXRlcik7XG4gICAgfVxuICAgIHJldHVybiByZXN1bHQ7XG4gIH0sXG4gIGJvb2xlYW46ICh2YWx1ZTogYW55KSA9PiB7XG4gICAgcmV0dXJuIHZhbHVlO1xuICB9LFxuICBudW1iZXI6ICh2YWx1ZTogYW55KSA9PiB7XG4gICAgcmV0dXJuIHZhbHVlO1xuICB9LFxuICBzdHJpbmc6ICh2YWx1ZTogYW55KSA9PiB7XG4gICAgcmV0dXJuIHZhbHVlO1xuICB9LFxuICBBYnNvbHV0ZVBhdGg6ICh2YWx1ZTogYW55KSA9PiB7XG4gICAgcmV0dXJuIHZhbHVlLnRvSlNPTigpO1xuICB9LFxuICBGaWxlUGF0aDogKHZhbHVlOiBhbnkpID0+IHtcbiAgICByZXR1cm4gdmFsdWUudG9KU09OKCk7XG4gIH0sXG4gIERpclBhdGg6ICh2YWx1ZTogYW55KSA9PiB7XG4gICAgcmV0dXJuIHZhbHVlLnRvSlNPTigpO1xuICB9LFxuICBvYmplY3Q6ICh2YWx1ZTogYW55KSA9PiB7XG4gICAgcmV0dXJuIGRlZXBDb3B5KHZhbHVlKTtcbiAgfSxcbn07XG5cbmV4cG9ydCBmdW5jdGlvbiBtYWtlSlNPTlZhbHVlKGVudHJ5OiBWYXJpYWJsZUVudHJ5LCB2YWx1ZTogYW55KTogYW55IHtcbiAgaWYgKEFycmF5LmlzQXJyYXkoZW50cnkudHlwZSkpXG4gICAgcmV0dXJuIHZhbHVlO1xuICBjb25zdCBmdW5jID0gdG9qc29uVmFsdWVNYXBbZW50cnkudHlwZV07XG4gIGlmICghZnVuYylcbiAgICB0aHJvdyBuZXcgRXJyb3IoYFVua25vd24gdHlwZSBcIiR7ZW50cnkudHlwZX1cIiBmb3IgJHtlbnRyeS5uYW1lfWApO1xuICByZXR1cm4gZnVuYyh2YWx1ZSk7XG59XG5cbmV4cG9ydCBmdW5jdGlvbiBtYWtlRW50cnlWYWx1ZShlbnRyeTogVmFyaWFibGVFbnRyeSwgdmFsdWU6IGFueSk6IGFueSB7XG4gIGxldCBuZXdWYWx1ZTogYW55O1xuICBpZiAoQXJyYXkuaXNBcnJheShlbnRyeS50eXBlKSlcbiAgICBuZXdWYWx1ZSA9IGVudHJ5LnR5cGUuaW5jbHVkZXModmFsdWUpID8gdmFsdWUgOiB1bmRlZmluZWQ7XG4gIGVsc2Uge1xuICAgIGNvbnN0IGZ1bmMgPSBtYWtlVmFsdWVNYXBbZW50cnkudHlwZV07XG4gICAgaWYgKCFmdW5jKVxuICAgICAgdGhyb3cgbmV3IEVycm9yKGBVbmtub3duIHR5cGUgXCIke2VudHJ5LnR5cGV9XCIgZm9yICR7ZW50cnkubmFtZX1gKTtcbiAgICBuZXdWYWx1ZSA9IGZ1bmModmFsdWUpO1xuICB9XG4gIGlmIChuZXdWYWx1ZSA9PT0gdW5kZWZpbmVkKVxuICAgIHRocm93IG5ldyBUeXBlRXJyb3IoYEF0dGVtcHRpbmcgdG8gc2V0IFwiJHt2YWx1ZX1cIiB0byAke2VudHJ5Lm5hbWV9IGFzIGFuICR7ZW50cnkudHlwZX1gKTtcbiAgcmV0dXJuIG5ld1ZhbHVlO1xufVxuXG5leHBvcnQgZnVuY3Rpb24gY29weUVudHJ5VmFsdWUoZW50cnk6IFZhcmlhYmxlRW50cnksIHRyYW5zZm9ybTogKGVudHJ5OiBWYXJpYWJsZUVudHJ5LCB2YWx1ZTogYW55KSA9PiBhbnkpIHtcbiAgY29uc3QgcmVzdWx0OiBWYXJpYWJsZUVudHJ5ID0ge1xuICAgIG5hbWU6IGVudHJ5Lm5hbWUsXG4gICAgdHlwZTogZW50cnkudHlwZSxcbiAgICBncm91cDogZW50cnkuZ3JvdXAsXG4gICAgZGVzY3JpcHRpb246IGVudHJ5LmRlc2NyaXB0aW9uLFxuICB9O1xuICBpZiAoZW50cnkuaW5pdFZhbHVlICE9PSB1bmRlZmluZWQpXG4gICAgcmVzdWx0LmluaXRWYWx1ZSA9IHRyYW5zZm9ybShlbnRyeSwgZW50cnkuaW5pdFZhbHVlKTtcbiAgaWYgKGVudHJ5LnZhbHVlICE9PSB1bmRlZmluZWQpXG4gICAgcmVzdWx0LnZhbHVlID0gdHJhbnNmb3JtKGVudHJ5LCBlbnRyeS52YWx1ZSk7XG4gIHJldHVybiByZXN1bHQ7XG59XG5cbmV4cG9ydCBmdW5jdGlvbiBmcm9tSlNPTih2YXJpYWJsZU1hcDogVmFyaWFibGVNYXApOiBWYXJpYWJsZU1hcCB7XG4gIGNvbnN0IHJlc3VsdDogVmFyaWFibGVNYXAgPSB7fTtcbiAgZm9yIChjb25zdCBba2V5LCB2YWxdIG9mIE9iamVjdC5lbnRyaWVzKHZhcmlhYmxlTWFwKSlcbiAgICByZXN1bHRba2V5XSA9IGNvcHlFbnRyeVZhbHVlKHZhbCwgbWFrZUVudHJ5VmFsdWUpO1xuICByZXR1cm4gcmVzdWx0O1xufVxuXG5leHBvcnQgZnVuY3Rpb24gdG9KU09OKHZhcmlhYmxlTWFwOiBWYXJpYWJsZU1hcCk6IFZhcmlhYmxlTWFwIHtcbiAgY29uc3QgcmVzdWx0OiBWYXJpYWJsZU1hcCA9IHt9O1xuICBmb3IgKGNvbnN0IFtrZXksIHZhbF0gb2YgT2JqZWN0LmVudHJpZXModmFyaWFibGVNYXApKVxuICAgIHJlc3VsdFtrZXldID0gY29weUVudHJ5VmFsdWUodmFsLCBtYWtlSlNPTlZhbHVlKTtcbiAgcmV0dXJuIHJlc3VsdDtcbn1cblxuZXhwb3J0IGZ1bmN0aW9uIHNldEVudHJ5VmFsdWUoZW50cnk6IFZhcmlhYmxlRW50cnksIHZhbHVlOiBhbnkpOiBhbnkge1xuICBlbnRyeS52YWx1ZSA9IG1ha2VFbnRyeVZhbHVlKGVudHJ5LCB2YWx1ZSk7XG59XG5cbmV4cG9ydCBmdW5jdGlvbiBzZXQodmFyaWFibGVNYXA6IFZhcmlhYmxlTWFwLCBuYW1lOiBzdHJpbmcsIHZhbHVlOiBhbnkpOiB2b2lkIHtcbiAgY29uc3QgZW50cnkgPSB2YXJpYWJsZU1hcFtuYW1lXTtcbiAgaWYgKCFlbnRyeSlcbiAgICB0aHJvdyBuZXcgRXJyb3IoYFZhcmlhYmxlIFwiJHtuYW1lfVwiIGRvZXMgbm90IGV4aXN0c2ApO1xuICBzZXRFbnRyeVZhbHVlKGVudHJ5LCB2YWx1ZSk7XG59XG5cbmV4cG9ydCBmdW5jdGlvbiByZXNldCh2YXJpYWJsZU1hcDogVmFyaWFibGVNYXAsIG5hbWU6IHN0cmluZyk6IHZvaWQge1xuICBjb25zdCBlbnRyeSA9IHZhcmlhYmxlTWFwW25hbWVdO1xuICBpZiAoIWVudHJ5KVxuICAgIHRocm93IG5ldyBFcnJvcihgVmFyaWFibGUgXCIke25hbWV9XCIgZG9lcyBub3QgZXhpc3RzYCk7XG4gIGVudHJ5LnZhbHVlID0gdW5kZWZpbmVkO1xufVxuXG5leHBvcnQgZnVuY3Rpb24gZGVmaW5lVmFyaWFibGUobWFwOiBWYXJpYWJsZU1hcCwgZ3JvdXA6IHN0cmluZywgbmFtZTogc3RyaW5nLCBkZXNjcmlwdG9yOiBWYXJpYWJsZURlc2NyaXB0b3IpIHtcbiAgbGV0IGRlZmluZUVudHJ5ID0gbWFwW25hbWVdO1xuICBsZXQgaXNWYWxpZFZhbHVlID0gKHZhbHVlOiBhbnkpID0+IHRydWU7XG4gIGlmICghZGVmaW5lRW50cnkpIHtcbiAgICBkZWZpbmVFbnRyeSA9IHtcbiAgICAgIG5hbWUsXG4gICAgICB0eXBlOiBcIlwiLCBncm91cCwgdmFsdWU6IHVuZGVmaW5lZCwgIGluaXRWYWx1ZTogdW5kZWZpbmVkLCBkZXNjcmlwdGlvbjogXCJcIixcbiAgICB9O1xuICAgIG1hcFtuYW1lXSA9IGRlZmluZUVudHJ5O1xuICB9XG4gIGVsc2UgaWYgKGdyb3VwICE9PSBkZWZpbmVFbnRyeS5ncm91cCkge1xuICAgIGlmIChkZWZpbmVFbnRyeS5ncm91cClcbiAgICAgIHRocm93IG5ldyBFcnJvcihgQXR0ZW1wdGluZyB0byByZWNyZWF0ZSBcIiR7bmFtZX1cIiB2YXJpYWJsZSB3aXRoIFwiJHtkZWZpbmVFbnRyeS5ncm91cH1cIiBncm91cCBpbiBhbm90aGVyIFwiJHtncm91cH1cImApO1xuICAgIGRlZmluZUVudHJ5Lmdyb3VwID0gZ3JvdXA7XG4gIH1cblxuICBkZWZpbmVFbnRyeS50eXBlID0gZGVzY3JpcHRvci50eXBlIHx8IGRlZmluZUVudHJ5LnR5cGU7XG4gIGRlZmluZUVudHJ5LmRlc2NyaXB0aW9uID0gZGVzY3JpcHRvci5kZXNjcmlwdGlvbiB8fCBkZWZpbmVFbnRyeS5kZXNjcmlwdGlvbjtcblxuICBsZXQgdHlwZTogc3RyaW5nIHwgc3RyaW5nW107XG4gIGlmIChkZWZpbmVFbnRyeS50eXBlKVxuICAgIHR5cGUgPSBkZWZpbmVFbnRyeS50eXBlO1xuICBlbHNlIGlmIChBcnJheS5pc0FycmF5KGRlc2NyaXB0b3IudmFsdWUpKVxuICAgIHR5cGUgPSBcImFycmF5XCI7XG4gIGVsc2UgaWYgKGRlc2NyaXB0b3IudmFsdWUgaW5zdGFuY2VvZiBBYnNvbHV0ZVBhdGgpXG4gICAgdHlwZSA9IFwiQWJzb2x1dGVQYXRoXCI7XG4gIGVsc2VcbiAgICB0eXBlID0gdHlwZW9mIGRlc2NyaXB0b3IudmFsdWU7XG5cbiAgaWYgKEFycmF5LmlzQXJyYXkodHlwZSkpIHtcbiAgICBjb25zdCBlbnVtTGlzdCA9IHR5cGU7XG4gICAgbGV0IGl0ZW1UeXBlO1xuICAgIGZvciAoY29uc3QgaXRlciBvZiBlbnVtTGlzdCkge1xuICAgICAgY29uc3QgaXQgPSB0eXBlb2YgaXRlcjtcbiAgICAgIGlmICghaXRlbVR5cGUpXG4gICAgICAgIGl0ZW1UeXBlID0gaXQ7XG4gICAgICBlbHNlIGlmIChpdGVtVHlwZSAhPT0gaXQpXG4gICAgICAgIHRocm93IG5ldyBFcnJvcihgQWxsIGVsZW1lbnRzIGZvciAke25hbWV9IG11c3QgYmUgb2YgdGhlIHNhbWUgdHlwZWApO1xuICAgIH1cbiAgICBpZiAoaXRlbVR5cGUgIT09IFwiYm9vbGVhblwiICYmIGl0ZW1UeXBlICE9PSBcIm51bWJlclwiICYmIGl0ZW1UeXBlICE9PSBcInN0cmluZ1wiKVxuICAgICAgdGhyb3cgbmV3IEVycm9yKGBFbnVtICR7bmFtZX0gbm90IHN1cHBvcnQgJHtpdGVtVHlwZX0gdHlwZWApO1xuICAgIGlzVmFsaWRWYWx1ZSA9ICh2YWx1ZTogYW55KSA9PiBlbnVtTGlzdC5pbmNsdWRlcyh2YWx1ZSk7XG4gIH1cbiAgZWxzZSBpZiAodHlwZSA9PT0gXCJib29sZWFuXCIpIHtcbiAgICBpc1ZhbGlkVmFsdWUgPSAodmFsdWU6IGFueSkgPT4gdHlwZW9mIHZhbHVlID09PSBcImJvb2xlYW5cIjtcbiAgfVxuICBlbHNlIGlmICh0eXBlID09PSBcIm51bWJlclwiKSB7XG4gICAgaXNWYWxpZFZhbHVlID0gKHZhbHVlOiBhbnkpID0+IHR5cGVvZiB2YWx1ZSA9PT0gXCJudW1iZXJcIjtcbiAgfVxuICBlbHNlIGlmICh0eXBlID09PSBcInN0cmluZ1wiKSB7XG4gICAgaXNWYWxpZFZhbHVlID0gKHZhbHVlOiBhbnkpID0+IHR5cGVvZiB2YWx1ZSA9PT0gXCJzdHJpbmdcIjtcbiAgfVxuICBlbHNlIGlmICh0eXBlID09PSBcImFycmF5XCIpIHtcbiAgICBpc1ZhbGlkVmFsdWUgPSBBcnJheS5pc0FycmF5O1xuICB9XG4gIGVsc2UgaWYgKHR5cGUgPT09IFwiQWJzb2x1dGVQYXRoXCIgfHwgdHlwZSA9PT0gXCJGaWxlUGF0aFwiIHx8IHR5cGUgPT09IFwiRGlyUGF0aFwiKSB7XG4gICAgaXNWYWxpZFZhbHVlID0gKHZhbHVlOiBhbnkpID0+ICEhQWJzb2x1dGVQYXRoLmNyZWF0ZSh2YWx1ZSk7XG4gIH1cbiAgZWxzZSBpZiAodHlwZSAhPT0gXCJvYmplY3RcIiAmJiB0eXBlICE9PSBcImVudW1cIikge1xuICAgIHRocm93IG5ldyBFcnJvcihgVmFyaWFibGUgXCIke25hbWV9XCIgaGFzIHdyb25nIFwiJHt0eXBlfVwiIHR5cGVgKTtcbiAgfVxuXG4gIGlmIChkZXNjcmlwdG9yLnZhbHVlID09PSB1bmRlZmluZWQpIHtcbiAgICBkZWZpbmVFbnRyeS5pbml0VmFsdWUgPSAodHlwZSA9PT0gXCJhcnJheVwiKSA/IFtdIDogdW5kZWZpbmVkO1xuICB9XG4gIGVsc2Uge1xuICAgIGlmICghaXNWYWxpZFZhbHVlKGRlc2NyaXB0b3IudmFsdWUpKVxuICAgICAgICB0aHJvdyBuZXcgVHlwZUVycm9yKGBBdHRlbXB0aW5nIHRvIHNldCBcIiR7ZGVzY3JpcHRvci52YWx1ZX1cIiB0byAke25hbWV9IGFzIGluaXRWYWx1ZWApO1xuICAgIGRlZmluZUVudHJ5LmluaXRWYWx1ZSA9ICh0eXBlID09PSBcImFycmF5XCIpID8gQXJyYXkuZnJvbShkZXNjcmlwdG9yLnZhbHVlKSA6IGRlc2NyaXB0b3IudmFsdWU7XG4gIH1cblxuICBkZWZpbmVFbnRyeS50eXBlID0gdHlwZTtcbiAgaWYgKGRlZmluZUVudHJ5LmluaXRWYWx1ZSAhPT0gdW5kZWZpbmVkKSB7XG4gICAgZGVmaW5lRW50cnkuaW5pdFZhbHVlID0gbWFrZUVudHJ5VmFsdWUoZGVmaW5lRW50cnksIGRlZmluZUVudHJ5LmluaXRWYWx1ZSk7XG4gIH1cbiAgaWYgKGRlZmluZUVudHJ5LnZhbHVlICE9PSB1bmRlZmluZWQpIHtcbiAgICBkZWZpbmVFbnRyeS52YWx1ZSA9IG1ha2VFbnRyeVZhbHVlKGRlZmluZUVudHJ5LCBkZWZpbmVFbnRyeS52YWx1ZSk7XG4gIH1cbn1cblxuZXhwb3J0IGZ1bmN0aW9uIGNyZWF0ZVByb3h5PFQ+KG1hcDogVmFyaWFibGVNYXAsIG8/OiBhbnkpOiBUIHtcbiAgbyA9IG8gfHwge307XG4gIGNvbnN0IGhhbmRsZXI6IFByb3h5SGFuZGxlcjxhbnk+ID0ge1xuICAgIGdldCh0YXJnZXQ6IFZhcmlhYmxlTWFwLCBrZXk6IHN0cmluZywgcmVjZWl2ZXI6IGFueSkge1xuICAgICAgY29uc3QgZW50cnkgPSB0YXJnZXRba2V5XTtcbiAgICAgIGlmIChlbnRyeSlcbiAgICAgICAgcmV0dXJuIGdldEVudHJ5VmFsdWUoZW50cnkpO1xuICAgICAgcmV0dXJuIG9ba2V5XTtcbiAgICB9LFxuICAgIHNldCh0YXJnZXQ6IFZhcmlhYmxlTWFwLCBrZXk6IHN0cmluZywgdmFsdWU6IGFueSk6IGJvb2xlYW4ge1xuICAgICAgY29uc3QgZW50cnkgPSB0YXJnZXRba2V5XTtcbiAgICAgIGlmIChlbnRyeSlcbiAgICAgICAgc2V0RW50cnlWYWx1ZShlbnRyeSwgdmFsdWUpO1xuICAgICAgZWxzZVxuICAgICAgICBkZWZpbmVWYXJpYWJsZSh0YXJnZXQsIFwiXCIsIGtleSwgdG9EZXNjcmlwdG9yKHZhbHVlKSk7XG4gICAgICByZXR1cm4gdHJ1ZTtcbiAgICB9LFxuICAgIGhhcyh0YXJnZXQ6IFZhcmlhYmxlTWFwLCBrZXk6IHN0cmluZykge1xuICAgICAgcmV0dXJuIHRhcmdldC5oYXNPd25Qcm9wZXJ0eShrZXkpIHx8IChrZXkgaW4gdGFyZ2V0KTtcbiAgICB9LFxuICAgIG93bktleXModGFyZ2V0OiBWYXJpYWJsZU1hcCkge1xuICAgICAgcmV0dXJuIE9iamVjdC5rZXlzKHRhcmdldCk7XG4gICAgfSxcbiAgICBkZWxldGVQcm9wZXJ0eSh0YXJnZXQ6IFZhcmlhYmxlTWFwLCBrZXk6IHN0cmluZykge1xuICAgICAgdGhyb3cgbmV3IEVycm9yKGBDYW5ub3QgZGVsZXRlICR7a2V5fSB2YWx1ZWApO1xuICAgIH0sXG4gIH07XG4gIHJldHVybiBuZXcgUHJveHkobWFwLCBoYW5kbGVyKTtcbn1cblxuZXhwb3J0IGZ1bmN0aW9uIGNsb25lVmFyaWFibGVNYXAobWFwOiBWYXJpYWJsZU1hcCkge1xuICBjb25zdCByZXN1bHQ6IFZhcmlhYmxlTWFwID0ge307XG4gIGZvciAoY29uc3QgWyBuYW1lLCBlbnRyeSBdIG9mIE9iamVjdC5lbnRyaWVzKG1hcCkpIHtcbiAgICBkZWZpbmVWYXJpYWJsZShyZXN1bHQsIGVudHJ5Lmdyb3VwLCBuYW1lLCB7XG4gICAgICB0eXBlOiBlbnRyeS50eXBlLFxuICAgICAgZGVzY3JpcHRpb246IGVudHJ5LmRlc2NyaXB0aW9uLFxuICAgICAgdmFsdWU6IGVudHJ5LmluaXRWYWx1ZSxcbiAgICB9KTtcbiAgICBpZiAoZ2V0RW50cnlWYWx1ZShlbnRyeSkgIT09IHVuZGVmaW5lZClcbiAgICAgIHJlc3VsdFtuYW1lXS52YWx1ZSA9IGdldEVudHJ5VmFsdWUoZW50cnkpO1xuICB9XG4gIHJldHVybiByZXN1bHQ7XG59XG5cbmV4cG9ydCBmdW5jdGlvbiBleHRlbmRWYXJpYWJsZU1hcEJ5VmFsdWVzKG1hcDogVmFyaWFibGVNYXAsIGdyb3VwOiBzdHJpbmcsIHZhbHVlczogVmFyaWFudE1hcCkge1xuICBmb3IgKGNvbnN0IFtuYW1lLCB2YWx1ZV0gb2YgT2JqZWN0LmVudHJpZXModmFsdWVzKSkge1xuICAgIGRlZmluZVZhcmlhYmxlKG1hcCwgZ3JvdXAsIG5hbWUsIHsgdmFsdWUgfSk7XG4gICAgbWFwW25hbWVdLnZhbHVlID0gdmFsdWU7XG4gIH1cbn1cblxuZXhwb3J0IGZ1bmN0aW9uIGRlZmluZVZhcmlhYmxlc0luVmFyaWFibGVNYXAobWFwOiBWYXJpYWJsZU1hcCwgZ3JvdXA6IHN0cmluZywgdmFyaWFibGVzOiBhbnkpIHtcbiAgZm9yIChjb25zdCBbbmFtZSwgdmFsdWVdIG9mIE9iamVjdC5lbnRyaWVzKHZhcmlhYmxlcykpIHtcbiAgICBjb25zdCBkZXNjcmlwdG9yID0gdmFsdWUgJiYgdHlwZW9mIHZhbHVlID09PSBcIm9iamVjdFwiID8gdmFsdWUgOiB7dmFsdWUgfTtcbiAgICBkZWZpbmVWYXJpYWJsZShtYXAsIGdyb3VwLCBuYW1lLCBkZXNjcmlwdG9yKTtcbiAgfVxufVxuXG5leHBvcnQgZnVuY3Rpb24gZ2V0VmFyaWFibGVzQnlHcm91cChtYXA6IFZhcmlhYmxlTWFwLCBncm91cD86IHN0cmluZykge1xuICBjb25zdCByZXN1bHQ6IGFueSA9IHt9O1xuICBmb3IgKGNvbnN0IFsgbmFtZSwgZW50cnkgXSBvZiBPYmplY3QuZW50cmllcyhtYXApKSB7XG4gICAgaWYgKGdyb3VwICE9PSB1bmRlZmluZWQgJiYgZW50cnkuZ3JvdXAgJiYgZW50cnkuZ3JvdXAgIT09IGdyb3VwKVxuICAgICAgY29udGludWU7XG4gICAgcmVzdWx0W25hbWVdID0ge1xuICAgICAgdHlwZTogZW50cnkudHlwZSxcbiAgICAgIGRlc2NyaXB0aW9uOiBlbnRyeS5kZXNjcmlwdGlvbixcbiAgICAgIHZhbHVlOiBnZXRFbnRyeVZhbHVlKGVudHJ5KSxcbiAgICB9O1xuICB9XG4gIHJldHVybiByZXN1bHQ7XG59XG5cbmV4cG9ydCBmdW5jdGlvbiBjcmVhdGVWYXJpYWJsZVZhbHVlcyhtYXA6IFZhcmlhYmxlTWFwLCBncm91cD86IHN0cmluZyk6IGFueSB7XG4gIGNvbnN0IHJlc3VsdDogYW55ID0ge307XG4gIGZvciAoY29uc3QgWyBuYW1lLCBlbnRyeSBdIG9mIE9iamVjdC5lbnRyaWVzKG1hcCkpIHtcbiAgICBpZiAoIWdyb3VwIHx8IGdyb3VwID09PSBlbnRyeS5ncm91cClcbiAgICAgIHJlc3VsdFtuYW1lXSA9IGdldEVudHJ5VmFsdWUoZW50cnkpO1xuICB9XG4gIHJldHVybiByZXN1bHQ7XG59XG5cbmV4cG9ydCBmdW5jdGlvbiBtZXJnZVZhcmlhYmxlcyh0YXJnZXQ6IGFueSwgc291cmNlOiBhbnkpOiBvYmplY3Qge1xuICBpZiAoIXRhcmdldCB8fCB0eXBlb2YgdGFyZ2V0ICE9PSBcIm9iamVjdFwiKVxuICAgIHRocm93IG5ldyBFcnJvcihgVGFyZ2V0ICR7dGFyZ2V0fSBpcyBub3Qgb2JqZWN0YCk7XG4gIGlmICghc291cmNlIHx8IHR5cGVvZiBzb3VyY2UgIT09IFwib2JqZWN0XCIpXG4gICAgdGhyb3cgbmV3IEVycm9yKGBTb3VyY2UgJHtzb3VyY2V9IGlzIG5vdCBvYmplY3RgKTtcbiAgaWYgKEFycmF5LmlzQXJyYXkodGFyZ2V0KSkge1xuICAgIGlmICghQXJyYXkuaXNBcnJheShzb3VyY2UpKVxuICAgICAgdGhyb3cgbmV3IEVycm9yKGBTb3VyY2UgaXMgbm90IGFuIGFycmF5YCk7XG4gICAgZm9yIChjb25zdCBpdGVyIG9mIHNvdXJjZSlcbiAgICAgIHRhcmdldC5wdXNoKGl0ZXIpO1xuICB9XG4gIGVsc2Uge1xuICAgIGZvciAoY29uc3QgWyBrZXksIHZhbCBdIG9mIE9iamVjdC5lbnRyaWVzKHNvdXJjZSkpIHtcbiAgICAgIGlmICghT2JqZWN0Lmhhc093bih0YXJnZXQsIGtleSkpIHtcbiAgICAgICAgdGFyZ2V0W2tleV0gPSB2YWw7XG4gICAgICB9XG4gICAgICBlbHNlIGlmICh0YXJnZXRba2V5XSAmJiB0eXBlb2YgdGFyZ2V0W2tleV0gPT09IFwib2JqZWN0XCIpIHtcbiAgICAgICAgaWYgKCF2YWwgfHwgdHlwZW9mIHZhbCAhPT0gXCJvYmplY3RcIilcbiAgICAgICAgICB0aHJvdyBuZXcgRXJyb3IoYFNvdXJjZSAke2tleX0gaGFzICR7dmFsfSB3aGljaCBpcyBub3QgYW4gb2JqZWN0YCk7XG4gICAgICAgIG1lcmdlVmFyaWFibGVzKHRhcmdldFtrZXldLCB2YWwpO1xuICAgICAgfVxuICAgICAgZWxzZSB7XG4gICAgICAgIHRocm93IG5ldyBFcnJvcihgU291cmNlICR7a2V5fSBoYXMgJHt2YWx9IHdoaWNoIGlzIG5vdCAke3R5cGVvZiB0YXJnZXRba2V5XX1gKTtcbiAgICAgIH1cbiAgICB9XG4gIH1cbiAgcmV0dXJuIHRhcmdldDtcbn1cblxuZXhwb3J0IGZ1bmN0aW9uIG1lcmdlVmFyaWFibGVNYXAodGFyZ2V0OiBWYXJpYWJsZU1hcCwgc291cmNlOiBhbnkpOiBWYXJpYWJsZU1hcCB7XG4gIGZvciAoY29uc3QgW25hbWUsIHZhbHVlXSBvZiBPYmplY3QuZW50cmllcyhzb3VyY2UpKSB7XG4gICAgbGV0IGVudHJ5ID0gdGFyZ2V0W25hbWVdO1xuICAgIGlmICghZW50cnkpXG4gICAgICBkZWZpbmVWYXJpYWJsZSh0YXJnZXQsIFwiXCIsIG5hbWUsIHsgdmFsdWUgfSk7XG4gICAgZWxzZSB7XG4gICAgICBsZXQgZGVzdCA9IGdldEVudHJ5VmFsdWUoZW50cnkpO1xuICAgICAgc2V0RW50cnlWYWx1ZShlbnRyeSwgKGRlc3QgJiYgdHlwZW9mIGRlc3QgPT09IFwib2JqZWN0XCIpID8gbWVyZ2VWYXJpYWJsZXMoZGVzdCwgdmFsdWUpIDogdmFsdWUpO1xuICAgIH1cbiAgfVxuICByZXR1cm4gdGFyZ2V0O1xufVxuXG59IC8vIFNjb3BlSGVscGVyXG4iLCIvKlxuICogTUlUIExpY2Vuc2VcbiAqXG4gKiBDb3B5cmlnaHQgKGMpIDIwMjUgIFl1cmlpIFlha3ViaW4gKHl1cmlpLnlha3ViaW5AZ21haWwuY29tKVxuICpcbiAqIFBlcm1pc3Npb24gaXMgZ3JhbnRlZCB0byB1c2UsIGNvcHksIG1vZGlmeSwgYW5kIGRpc3RyaWJ1dGUgdGhpcyBzb2Z0d2FyZVxuICogdW5kZXIgdGhlIE1JVCBMaWNlbnNlLiBTZWUgTElDRU5TRSBmaWxlIGZvciBkZXRhaWxzLlxuICovXG5cbmltcG9ydCB7IFZhcmlhYmxlTWFwIH0gZnJvbSBcIkAvY29yZS9TY29wZVwiO1xuaW1wb3J0IHsgR2VuZXJhbENvbnRleHQsIGNyZWF0ZUNvbnRleHQgfSBmcm9tIFwiQC9jb3JlL0Jhc2VDb250ZXh0XCI7XG5cbmNvbnN0IFNDT1BFID0gU3ltYm9sKFwiU0NPUEVcIik7XG5cbmV4cG9ydCBjbGFzcyBTY3JpcHRDb250ZXh0IGV4dGVuZHMgR2VuZXJhbENvbnRleHQge1xuICBbU0NPUEVdOiBWYXJpYWJsZU1hcDtcblxuICBjb25zdHJ1Y3RvcihzY29wZTogVmFyaWFibGVNYXApIHtcbiAgICBzdXBlcihzY29wZSk7XG4gICAgdGhpc1tTQ09QRV0gPSBzY29wZTtcbiAgfVxuXG4gIHB1YmxpYyBzdGF0aWMgY3JlYXRlKHZhcmlhYmxlTWFwOiBWYXJpYWJsZU1hcCkge1xuICAgIHJldHVybiBjcmVhdGVDb250ZXh0KG5ldyBTY3JpcHRDb250ZXh0KHZhcmlhYmxlTWFwKSk7XG4gIH1cbn07XG4iLCIvKlxuICogTUlUIExpY2Vuc2VcbiAqXG4gKiBDb3B5cmlnaHQgKGMpIDIwMjUgIFl1cmlpIFlha3ViaW4gKHl1cmlpLnlha3ViaW5AZ21haWwuY29tKVxuICpcbiAqIFBlcm1pc3Npb24gaXMgZ3JhbnRlZCB0byB1c2UsIGNvcHksIG1vZGlmeSwgYW5kIGRpc3RyaWJ1dGUgdGhpcyBzb2Z0d2FyZVxuICogdW5kZXIgdGhlIE1JVCBMaWNlbnNlLiBTZWUgTElDRU5TRSBmaWxlIGZvciBkZXRhaWxzLlxuICovXG5cbmV4cG9ydCBpbnRlcmZhY2UgU2ltcGxlT2JqZWN0IHtcbiAgdHlwZTogc3RyaW5nO1xuICBbbmFtZTogc3RyaW5nXTogbnVsbCB8IGJvb2xlYW4gfCBudW1iZXIgfCBzdHJpbmcgfG9iamVjdDtcbn07XG5cbnR5cGUgSW5zdGFuY2VDcmVhdGVGdW5jdGlvbiA9IChvYmplY3Q6IFNpbXBsZU9iamVjdCkgPT4gYW55O1xuXG5jb25zdCBfY3JlYXRvcnMgPSBuZXcgTWFwPHN0cmluZywgSW5zdGFuY2VDcmVhdGVGdW5jdGlvbj4oKTtcblxuZXhwb3J0IG5hbWVzcGFjZSBTaW1wbGVPYmplY3Qge1xuXG5leHBvcnQgZnVuY3Rpb24gcmVnaXN0ZXJQYXJzZXIobmFtZTogc3RyaW5nLCBmdW5jOiBJbnN0YW5jZUNyZWF0ZUZ1bmN0aW9uKSB7XG4gIGlmICghbmFtZSAmJiBfY3JlYXRvcnMuaGFzKG5hbWUpKVxuICAgIHRocm93IG5ldyBFcnJvcihgTmFtZSBcIiR7bmFtZX1cIiBpcyB3cm9uZyBvciByZWdpc3RlcmVkYCk7XG4gIF9jcmVhdG9ycy5zZXQobmFtZSwgZnVuYyk7XG59XG5cbmV4cG9ydCBmdW5jdGlvbiBmcm9tSlNPTih2YWx1ZTogU2ltcGxlT2JqZWN0KTogYW55IHtcbiAgaWYgKHZhbHVlID09PSB1bmRlZmluZWQpXG4gICAgdGhyb3cgbmV3IEVycm9yKFwiTm90IHN1cHBvcnQgdW5kZWZpbmVkIHZhbHVlXCIpO1xuICBpZiAodmFsdWUgJiYgdHlwZW9mIHZhbHVlID09PSBcIm9iamVjdFwiKSB7XG4gICAgaWYgKHR5cGVvZiB2YWx1ZS50eXBlID09PSBcInN0cmluZ1wiKSB7XG4gICAgICBjb25zdCBmdW5jID0gX2NyZWF0b3JzLmdldCh2YWx1ZS50eXBlKTtcbiAgICAgIGlmIChmdW5jKVxuICAgICAgICByZXR1cm4gZnVuYyh2YWx1ZSk7XG4gICAgICB0aHJvdyBuZXcgRXJyb3IoYFVrbm93biBvYmplY3QgdHlwZTogJHtKU09OLnN0cmluZ2lmeSh2YWx1ZSl9YCk7XG4gICAgfVxuICAgIGVsc2UgaWYgKEFycmF5LmlzQXJyYXkodmFsdWUpKSB7XG4gICAgICByZXR1cm4gdmFsdWUubWFwKGkgPT4gZnJvbUpTT04oaSkpO1xuICAgIH1cbiAgfVxuICByZXR1cm4gdmFsdWU7XG59XG5cbmV4cG9ydCBmdW5jdGlvbiB0b0pTT04odmFsdWU6IGFueSk6IGFueSB7XG4gIGlmICh2YWx1ZSAmJiB0eXBlb2YgdmFsdWUgPT09IFwib2JqZWN0XCIpIHtcbiAgICBpZiAodHlwZW9mIHZhbHVlLnRvSlNPTiA9PT0gXCJmdW5jdGlvblwiKVxuICAgICAgcmV0dXJuIHZhbHVlLnRvSlNPTigpO1xuICAgIGVsc2UgaWYgKEFycmF5LmlzQXJyYXkodmFsdWUpKVxuICAgICAgcmV0dXJuIHZhbHVlLm1hcChpID0+IHRvSlNPTihpKSk7XG4gIH1cbiAgcmV0dXJuIHZhbHVlO1xufVxuXG59IC8vIG5hbWVzcGFjZSBTaW1wbGVPYmplY3RcbiIsIi8qXG4gKiBNSVQgTGljZW5zZVxuICpcbiAqIENvcHlyaWdodCAoYykgMjAyNSAgWXVyaWkgWWFrdWJpbiAoeXVyaWkueWFrdWJpbkBnbWFpbC5jb20pXG4gKlxuICogUGVybWlzc2lvbiBpcyBncmFudGVkIHRvIHVzZSwgY29weSwgbW9kaWZ5LCBhbmQgZGlzdHJpYnV0ZSB0aGlzIHNvZnR3YXJlXG4gKiB1bmRlciB0aGUgTUlUIExpY2Vuc2UuIFNlZSBMSUNFTlNFIGZpbGUgZm9yIGRldGFpbHMuXG4gKi9cblxuaW1wb3J0IHsgQWJzb2x1dGVQYXRoIH0gZnJvbSBcIkAvY29yZS9BYnNvbHV0ZVBhdGhcIjtcbmltcG9ydCB7IFNpbXBsZU9iamVjdCB9IGZyb20gXCJAL2NvcmUvU2ltcGxlT2JqZWN0XCI7XG5cbmV4cG9ydCBjbGFzcyBTb3VyY2VGaWxlIHtcbiAgcHJpdmF0ZSBfZmlsZW5hbWU6IEFic29sdXRlUGF0aDtcbiAgcHJpdmF0ZSBfYmFzZURpcjogQWJzb2x1dGVQYXRoO1xuICBcbiAgcHJpdmF0ZSBfaGVhZGVyT25seTogYm9vbGVhbjtcblxuICBwcml2YXRlIF9sYW5ndWFnZTogc3RyaW5nO1xuICBwcml2YXRlIF9kZWZpbml0aW9uczogc3RyaW5nW107XG4gIHByaXZhdGUgX2NvbXBpbGVyUGF0aDogc3RyaW5nO1xuICBwcml2YXRlIF9jb21waWxlck9wdGlvbnM6IEFycmF5PHN0cmluZyB8IHN0cmluZ1tdPjtcblxuICBwcml2YXRlIGNvbnN0cnVjdG9yKGZpbGVuYW1lOiBBYnNvbHV0ZVBhdGgsIGJhc2VEaXI6IEFic29sdXRlUGF0aCwgaGVhZGVyT25seTogYm9vbGVhbiwgbGFuZ3VhZ2U6IHN0cmluZywgY29tcGlsZXJQYXRoOiBzdHJpbmcsIGNvbXBpbGVyT3B0aW9uczogQXJyYXk8c3RyaW5nIHwgc3RyaW5nW10+KSB7XG4gICAgdGhpcy5fZmlsZW5hbWUgPSBmaWxlbmFtZTtcbiAgICB0aGlzLl9iYXNlRGlyID0gYmFzZURpcjtcblxuICAgIHRoaXMuX2hlYWRlck9ubHkgPSBoZWFkZXJPbmx5O1xuXG4gICAgdGhpcy5fbGFuZ3VhZ2UgPSBsYW5ndWFnZTtcbiAgICB0aGlzLl9kZWZpbml0aW9ucyA9IFtdO1xuICAgIHRoaXMuX2NvbXBpbGVyUGF0aCA9IGNvbXBpbGVyUGF0aDtcbiAgICB0aGlzLl9jb21waWxlck9wdGlvbnMgPSBbIC4uLmNvbXBpbGVyT3B0aW9ucyBdO1xuICB9XG5cbiAgcHVibGljIHN0YXRpYyBjcmVhdGUoZmlsZW5hbWU6IEFic29sdXRlUGF0aCwgYmFzZURpcjogQWJzb2x1dGVQYXRoLCBoZWFkZXJPbmx5OiBib29sZWFuLCBsYW5ndWFnZTogc3RyaW5nLCBjb21waWxlclBhdGg6IHN0cmluZywgY29tcGlsZXJPcHRpb25zOiBBcnJheTxzdHJpbmcgfCBzdHJpbmdbXT4pIHtcbiAgICByZXR1cm4gbmV3IFNvdXJjZUZpbGUoZmlsZW5hbWUsIGJhc2VEaXIsIGhlYWRlck9ubHksIGxhbmd1YWdlLCBjb21waWxlclBhdGgsIGNvbXBpbGVyT3B0aW9ucyk7XG4gIH1cblxuICBwdWJsaWMgZ2V0IExBTkdVQUdFKCk6IHN0cmluZyB7XG4gICAgcmV0dXJuIHRoaXMuX2xhbmd1YWdlO1xuICB9XG5cbiAgcHVibGljIGdldCBIRUFERVJfRklMRV9PTkxZKCk6IGJvb2xlYW4ge1xuICAgIHJldHVybiB0aGlzLl9oZWFkZXJPbmx5O1xuICB9XG5cbiAgcHVibGljIGdldCBERUZJTkVTKCk6IHN0cmluZ1tdIHtcbiAgICByZXR1cm4gdGhpcy5fZGVmaW5pdGlvbnM7XG4gIH1cblxuICBwdWJsaWMgYWRkRGVmaW5pdGlvbihkZWZpbml0aW9uOiBzdHJpbmcpIHtcbiAgICB0aGlzLl9kZWZpbml0aW9ucy5wdXNoKGRlZmluaXRpb24pO1xuICB9XG5cbiAgcHVibGljIGFkZENvbXBpbGVPcHRpb24ob3B0aW9uOiBzdHJpbmcgfCBbIHN0cmluZywgc3RyaW5nIF0pOiB2b2lkIHtcbiAgICB0aGlzLl9jb21waWxlck9wdGlvbnMucHVzaChvcHRpb24pO1xuICB9XG5cbiAgcHVibGljIGdldCBDT01QSUxFX1BBVEgoKTogc3RyaW5nIHtcbiAgICByZXR1cm4gdGhpcy5fY29tcGlsZXJQYXRoO1xuICB9XG5cbiAgcHVibGljIGdldCBDT01QSUxFX0ZMQUdTKCk6IEFycmF5PHN0cmluZyB8IHN0cmluZ1tdPiB7XG4gICAgcmV0dXJuIHRoaXMuX2NvbXBpbGVyT3B0aW9ucztcbiAgfVxuXG4gIHB1YmxpYyBnZXQgRklMRSgpOiBBYnNvbHV0ZVBhdGgge1xuICAgIHJldHVybiB0aGlzLl9maWxlbmFtZTtcbiAgfVxuXG4gIHB1YmxpYyBnZXQgRklMRV9ESVIoKTogQWJzb2x1dGVQYXRoIHtcbiAgICByZXR1cm4gdGhpcy5fZmlsZW5hbWUuZGlybmFtZSgpO1xuICB9XG5cbiAgcHVibGljIGdldCBGSUxFX05BTUUoKTogc3RyaW5nIHtcbiAgICByZXR1cm4gdGhpcy5fZmlsZW5hbWUuYmFzZW5hbWUoKTtcbiAgfVxuXG4gIHB1YmxpYyBzdGF0aWMgZnJvbUpTT04oanNvbjogYW55KTogU291cmNlRmlsZSB7XG4gICAgY29uc3QgZmlsZW5hbWUgPSBBYnNvbHV0ZVBhdGguY3JlYXRlKGpzb24uZmlsZW5hbWUpO1xuICAgIGNvbnN0IGJhc2VEaXIgPSBBYnNvbHV0ZVBhdGguY3JlYXRlKGpzb24uYmFzZURpcik7XG4gICAgY29uc3QgaGVhZGVyT25seSA9IGpzb24uaGVhZGVyT25seSB8fCBmYWxzZTtcbiAgICBjb25zdCBsYW5ndWFnZSA9IGpzb24ubGFuZ3VhZ2UgfHwgXCJcIjtcbiAgICBjb25zdCBjb21waWxlclBhdGggPSBqc29uLmNvbXBpbGVyUGF0aCB8fCBcIlwiO1xuICAgIGNvbnN0IGNvbXBpbGVyT3B0aW9ucyA9IGpzb24uY29tcGlsZXJPcHRpb25zIHx8IFtdO1xuICAgIGNvbnN0IHJlc3VsdCA9IG5ldyBTb3VyY2VGaWxlKGZpbGVuYW1lLCBiYXNlRGlyLCBoZWFkZXJPbmx5LCBsYW5ndWFnZSwgY29tcGlsZXJQYXRoLCBjb21waWxlck9wdGlvbnMpO1xuICAgIGlmIChqc29uLmRlZmluaXRpb25zKVxuICAgICAgcmVzdWx0Ll9kZWZpbml0aW9ucyA9IEFycmF5LmZyb20oanNvbi5kZWZpbml0aW9ucyk7XG4gICAgcmV0dXJuIHJlc3VsdDtcbiAgfVxuXG4gIHB1YmxpYyB0b0pTT04oKTogU2ltcGxlT2JqZWN0IHtcbiAgICBjb25zdCBqc29uOiBTaW1wbGVPYmplY3QgPSB7XG4gICAgICB0eXBlOiBTb3VyY2VGaWxlLm5hbWUsXG4gICAgICBmaWxlbmFtZTogdGhpcy5fZmlsZW5hbWUudG9VUkxTdHJpbmcoKSxcbiAgICAgIGJhc2VEaXI6IHRoaXMuX2Jhc2VEaXIudG9VUkxTdHJpbmcoKSxcbiAgICB9O1xuICAgIGlmICh0aGlzLl9oZWFkZXJPbmx5KVxuICAgICAganNvbi5oZWFkZXJPbmx5ID0gdHJ1ZTtcbiAgICBlbHNlIHtcbiAgICAgIGlmICh0aGlzLl9sYW5ndWFnZSlcbiAgICAgICAganNvbi5sYW5ndWFnZSA9IHRoaXMuX2xhbmd1YWdlO1xuICAgICAgaWYgKHRoaXMuX2NvbXBpbGVyUGF0aClcbiAgICAgICAganNvbi5jb21waWxlclBhdGggPSB0aGlzLl9jb21waWxlclBhdGg7XG4gICAgICBpZiAodGhpcy5fZGVmaW5pdGlvbnMubGVuZ3RoKVxuICAgICAgICBqc29uLmRlZmluaXRpb25zID0gWyAuLi50aGlzLl9kZWZpbml0aW9ucyBdO1xuICAgICAgaWYgKHRoaXMuX2NvbXBpbGVyT3B0aW9ucy5sZW5ndGgpXG4gICAgICAgIGpzb24uY29tcGlsZXJPcHRpb25zID0gWyAuLi50aGlzLl9jb21waWxlck9wdGlvbnMgXTtcbiAgICB9XG4gICAgcmV0dXJuIGpzb247XG4gIH1cbn1cbiIsIi8qXG4gKiBNSVQgTGljZW5zZVxuICpcbiAqIENvcHlyaWdodCAoYykgMjAyNSAgWXVyaWkgWWFrdWJpbiAoeXVyaWkueWFrdWJpbkBnbWFpbC5jb20pXG4gKlxuICogUGVybWlzc2lvbiBpcyBncmFudGVkIHRvIHVzZSwgY29weSwgbW9kaWZ5LCBhbmQgZGlzdHJpYnV0ZSB0aGlzIHNvZnR3YXJlXG4gKiB1bmRlciB0aGUgTUlUIExpY2Vuc2UuIFNlZSBMSUNFTlNFIGZpbGUgZm9yIGRldGFpbHMuXG4gKi9cblxuaW1wb3J0IHsgc3Bhd25TeW5jIH0gZnJvbSBcIm5vZGU6Y2hpbGRfcHJvY2Vzc1wiO1xuXG5pbXBvcnQgeyBJbnRlcmZhY2VUYXNrIH0gZnJvbSBcIkAvY29yZS9NYWtlSW50ZXJmYWNlc1wiO1xuaW1wb3J0IHsgU2ltcGxlT2JqZWN0IH0gZnJvbSBcIkAvY29yZS9TaW1wbGVPYmplY3RcIjtcbmltcG9ydCB7IExvZ2dlciB9IGZyb20gXCJAL2xvZ2dlclwiO1xuXG5jb25zdCBsb2dnZXIgPSBMb2dnZXIuY3JlYXRlKGltcG9ydC5tZXRhLnVybCk7XG5cbmludGVyZmFjZSBPcHRpb25zIHtcbiAgY29tbWFuZDogc3RyaW5nO1xuICBhcmdzOiBzdHJpbmdbXTtcbiAgY3dkOiBzdHJpbmc7XG59O1xuXG5leHBvcnQgY2xhc3MgU3Bhd25TeW5jVGFzayBleHRlbmRzIEludGVyZmFjZVRhc2sge1xuICBwcml2YXRlIF9jb21tYW5kOiBzdHJpbmc7XG4gIHByaXZhdGUgX2FyZ3M6IHN0cmluZ1tdO1xuICBwcml2YXRlIF9jd2Q6IHN0cmluZztcblxuICBwdWJsaWMgY29uc3RydWN0b3IoY29tbWFuZDogc3RyaW5nLCBhcmdzOiBzdHJpbmdbXSwgY3dkOiBzdHJpbmcpIHtcbiAgICBzdXBlcigpO1xuXG4gICAgdGhpcy5fY29tbWFuZCA9IGNvbW1hbmQ7XG4gICAgdGhpcy5fYXJncyA9IGFyZ3M7XG4gICAgdGhpcy5fY3dkID0gY3dkO1xuICB9XG5cbiAgcHVibGljIGV4ZWN1dGUoKTogdm9pZCB7XG4gICAgbG9nZ2VyLmRlYnVnKFwic3Bhd25TeW5jXCIpO1xuICAgIGxvZ2dlci5kZWJ1ZyhcIiAgY29tbWFuZFwiLCB0aGlzLl9jb21tYW5kKTtcbiAgICBsb2dnZXIuZGVidWcoXCIgIGN3ZFwiLCB0aGlzLl9jd2QpO1xuICAgIGZvciAobGV0IGkgPSAwOyBpIDwgdGhpcy5fYXJncy5sZW5ndGg7IGkrKylcbiAgICAgIGxvZ2dlci5kZWJ1ZyhgICBhcmdzWyR7aX1dYCwgdGhpcy5fYXJnc1tpXSk7XG5cbiAgICBjb25zdCByZXN1bHQgPSBzcGF3blN5bmModGhpcy5fY29tbWFuZCwgdGhpcy5fYXJncywgeyBjd2Q6IHRoaXMuX2N3ZCwgZW5jb2Rpbmc6IFwidXRmLThcIiB9KTtcbiAgICBpZiAocmVzdWx0LmVycm9yIHx8IHJlc3VsdC5zdGF0dXMpIHtcbiAgICAgIGxvZ2dlci5ub3RpY2UoXCJjZCBcIiArIHRoaXMuX2N3ZCk7XG4gICAgICBsZXQgY21kID0gdGhpcy5fYXJncy5qb2luKFwiIFwiKTtcbiAgICAgIGNtZCA9IHRoaXMuX2NvbW1hbmQgKyAoY21kID8gXCIgXCIgOiBcIlwiKSArIGNtZDtcbiAgICAgIGxvZ2dlci5ub3RpY2UoY21kKTtcbiAgICAgIGxvZ2dlci5ub3RpY2UoXCJcIik7XG5cbiAgICAgIGxvZ2dlci5mYXRhbChyZXN1bHQuc3RkZXJyKTtcblxuICAgICAgaWYgKHJlc3VsdC5lcnJvcilcbiAgICAgICAgICB0aHJvdyByZXN1bHQuZXJyb3I7XG5cbiAgICAgIHRocm93IG5ldyBFcnJvcihyZXN1bHQuZXJyb3IgYXMgYW55IHx8IFwiU3RhdHVzIFwiICsgcmVzdWx0LnN0YXR1cyk7XG4gICAgfVxuICAgIGlmIChyZXN1bHQuc3Rkb3V0KSB7XG4gICAgICBmb3IgKGNvbnN0IGxpbmUgb2YgcmVzdWx0LnN0ZG91dC50cmltKCkuc3BsaXQoXCJcXG5cIikpIHtcbiAgICAgICAgbG9nZ2VyLm5vdGljZShsaW5lKTtcbiAgICAgIH1cbiAgICB9XG4gIH1cblxuICBwdWJsaWMgc3RhdGljIGZyb21KU09OKG86IFNpbXBsZU9iamVjdCkge1xuICAgIGNvbnN0IG9wdGlvbnM6IE9wdGlvbnMgJiBTaW1wbGVPYmplY3QgPSBvIGFzIGFueTtcbiAgICByZXR1cm4gbmV3IFNwYXduU3luY1Rhc2sob3B0aW9ucy5jb21tYW5kLCBvcHRpb25zLmFyZ3MsIG9wdGlvbnMuY3dkKTtcbiAgfVxuXG4gIHB1YmxpYyB0b0pTT04oKTogT3B0aW9ucyAmIFNpbXBsZU9iamVjdCB7XG4gICAgcmV0dXJuIHtcbiAgICAgIHR5cGU6IFNwYXduU3luY1Rhc2submFtZSxcbiAgICAgIGNvbW1hbmQ6IHRoaXMuX2NvbW1hbmQsXG4gICAgICBhcmdzOiB0aGlzLl9hcmdzLFxuICAgICAgY3dkOiB0aGlzLl9jd2QsXG4gICAgfVxuICB9XG59O1xuIiwiLypcbiAqIE1JVCBMaWNlbnNlXG4gKlxuICogQ29weXJpZ2h0IChjKSAyMDI1ICBZdXJpaSBZYWt1YmluICh5dXJpaS55YWt1YmluQGdtYWlsLmNvbSlcbiAqXG4gKiBQZXJtaXNzaW9uIGlzIGdyYW50ZWQgdG8gdXNlLCBjb3B5LCBtb2RpZnksIGFuZCBkaXN0cmlidXRlIHRoaXMgc29mdHdhcmVcbiAqIHVuZGVyIHRoZSBNSVQgTGljZW5zZS4gU2VlIExJQ0VOU0UgZmlsZSBmb3IgZGV0YWlscy5cbiAqL1xuXG5pbXBvcnQgb3MgZnJvbSBcIm5vZGU6b3NcIjtcbmltcG9ydCB7IERFQlVHX0JVSUxEX1RZUEUsIFJFTEVBU0VfQlVJTERfVFlQRSB9IGZyb20gXCJAL2NvcmUvVHlwZXNcIjtcbmltcG9ydCB7IEhvc3QgfSBmcm9tIFwiQC91dGlscy9Ib3N0XCI7XG5cbmV4cG9ydCBkZWZhdWx0IHtcbiAgU1lTVEVNX05BTUU6IHtcbiAgICBkZXNjcmlwdGlvbjogXCJEZWZpbmVzIHRoZSB0YXJnZXQgT1MgZm9yIHRoZSBidWlsZCwgdXNlZCBpbiBjcm9zcy1jb21waWxhdGlvbiBhbmQgbmF0aXZlIGJ1aWxkc1wiLFxuICAgIHZhbHVlOiBcIkxpbnV4XCIsXG4gIH0sXG4gIFNZU1RFTV9QUk9DRVNTT1I6IHtcbiAgICBkZXNjcmlwdGlvbjogXCJEZWZpbmVzIHRoZSB0YXJnZXQgQ1BVIGFyY2hpdGVjdHVyZVwiLFxuICAgIHZhbHVlOiBcIndhc20zMlwiLFxuICB9LFxuICBQUk9KRUNUX05BTUU6IHtcbiAgICBkZXNjcmlwdGlvbjogXCJOYW1lIG9mIHRoZSBjdXJyZW50IHByb2plY3RcIixcbiAgICB2YWx1ZTogXCJcIixcbiAgfSxcbiAgUFJPSkVDVF9WRVJTSU9OOiB7XG4gICAgZGVzY3JpcHRpb246IFwiVmVyc2lvbiBvZiB0aGUgY3VycmVudCBwcm9qZWN0XCIsXG4gICAgdmFsdWU6IFwiXCIsXG4gIH0sXG4gIFBST0pFQ1RfREVTQ1JJUFRJT046IHtcbiAgICBkZXNjcmlwdGlvbjogXCJEZXNjcmlwdGlvbiBvZiB0aGUgY3VycmVudCBwcm9qZWN0XCIsXG4gICAgdmFsdWU6IFwiXCIsXG4gIH0sXG4gIFBST0pFQ1RfSE9NRVBBR0VfVVJMOiB7XG4gICAgZGVzY3JpcHRpb246IFwiSG9tZXBhZ2UgVVJMIG9mIHRoZSBjdXJyZW50IHByb2plY3RcIixcbiAgICB2YWx1ZTogXCJcIixcbiAgfSxcbiAgUFJPSkVDVF9TT1VSQ0VfRElSOiB7XG4gICAgZGVzY3JpcHRpb246IFwiQWJzb2x1dGUgcGF0aCB0byB0aGUgdG9wLWxldmVsIHNvdXJjZSBkaXJlY3Rvcnkgb2YgdGhlIHByb2plY3RcIixcbiAgICB0eXBlOiBcIkRpclBhdGhcIixcbiAgfSxcbiAgUFJPSkVDVF9CSU5BUllfRElSOiB7XG4gICAgZGVzY3JpcHRpb246IFwiQWJzb2x1dGUgcGF0aCB0byB0aGUgdG9wLWxldmVsIGJ1aWxkIChiaW5hcnkpIGRpcmVjdG9yeSBvZiB0aGUgcHJvamVjdFwiLFxuICAgIHR5cGU6IFwiRGlyUGF0aFwiLFxuICB9LFxuICBTQ1JJUFRfTU9EVUxFOiB7XG4gICAgZGVzY3JpcHRpb246IFwiTW9kdWxlIG5hbWUgb2YgdGhlIGN1cnJlbnQgTWFrZVNjcmlwdFwiLFxuICAgIHR5cGU6IFwic3RyaW5nXCIsXG4gIH0sXG4gIFNDUklQVF9GSUxFOiB7XG4gICAgZGVzY3JpcHRpb246IFwiRnVsbCBwYXRoIHRvIHRoZSBjdXJyZW50IE1ha2VTY3JpcHQgZmlsZSBiZWluZyBwcm9jZXNzZWRcIixcbiAgICB0eXBlOiBcIkZpbGVQYXRoXCIsXG4gIH0sXG4gIFNDUklQVF9ESVI6IHtcbiAgICBkZXNjcmlwdGlvbjogXCJEaXJlY3Rvcnkgb2YgdGhlIGN1cnJlbnQgTWFrZVNjcmlwdCBmaWxlIGJlaW5nIHByb2Nlc3NlZFwiLFxuICAgIHR5cGU6IFwiRGlyUGF0aFwiLFxuICB9LFxuICBQQUNLQUdFX0ZJTEU6IHtcbiAgICBkZXNjcmlwdGlvbjogXCJGaWxlbmFtZSBvZiBwcm9qZWN0IG1hbmlmZXN0IGNvbnRhaW5pbmcgbWV0YWRhdGEgYW5kIGRlcGVuZGVuY2llc1wiLFxuICAgIHR5cGU6IFwiRmlsZVBhdGhcIixcbiAgfSxcbiAgQ0FDSEVfRklMRToge1xuICAgIGRlc2NyaXB0aW9uOiBcIkRlZmF1bHQgZmlsZW5hbWUgb2YgdGhlIEJpdE1ha2UgY2FjaGUgc3RvcmluZyBzZXR0aW5nc1wiLFxuICAgIHR5cGU6IFwiRmlsZVBhdGhcIixcbiAgfSxcbiAgVE9PTENIQUlOX0ZJTEU6IHtcbiAgICBkZXNjcmlwdGlvbjogXCJTcGVjaWZpZXMgdGhlIHBhdGggdG8gYSB0b29sY2hhaW4gZmlsZSB1c2VkIGZvciBjcm9zcy1jb21waWxhdGlvblwiLFxuICAgIHR5cGU6IFwic3RyaW5nXCIsXG4gIH0sXG4gIEJVSUxEX1RZUEU6IHtcbiAgICBkZXNjcmlwdGlvbjogXCJTcGVjaWZpZXMgdGhlIGJ1aWxkIGNvbmZpZ3VyYXRpb24gZm9yIGNvbnRyb2xsaW5nIG9wdGltaXphdGlvbiBsZXZlbHMgYW5kIGRlYnVnIGluZm9ybWF0aW9uIGluIHRoZSBidWlsZCBwcm9jZXNzXCIsXG4gICAgdHlwZTogWyBERUJVR19CVUlMRF9UWVBFLCBSRUxFQVNFX0JVSUxEX1RZUEUgXSxcbiAgICB2YWx1ZTogUkVMRUFTRV9CVUlMRF9UWVBFLFxuICB9LFxuICBJTlNUQUxMX1BSRUZJWDoge1xuICAgIGRlc2NyaXB0aW9uOiBcIlRoZSByb290IGRpcmVjdG9yeSB3aGVyZSBmaWxlcyB3aWxsIGJlIGluc3RhbGxlZCBieSBkZWZhdWx0XCIsXG4gICAgdHlwZTogXCJEaXJQYXRoXCIsXG4gICAgdmFsdWU6IFwiL3VzclwiLFxuICB9LFxuICBERVNURElSOiB7XG4gICAgZGVzY3JpcHRpb246IFwiVGVtcG9yYXJ5IGluc3RhbGxhdGlvbiByb290XCIsXG4gICAgdHlwZTogXCJEaXJQYXRoXCIsXG4gIH0sXG4gIFNPVVJDRV9ESVI6IHtcbiAgICBkZXNjcmlwdGlvbjogXCJQYXRoIHRvIHRoZSBzb3VyY2UgZGlyZWN0b3J5IGN1cnJlbnRseSBiZWluZyBwcm9jZXNzZWRcIixcbiAgICB0eXBlOiBcIkRpclBhdGhcIixcbiAgfSxcbiAgQklOQVJZX0RJUjoge1xuICAgIGRlc2NyaXB0aW9uOiBcIlBhdGggdG8gdGhlIGJpbmFyeSBkaXJlY3RvcnkgY3VycmVudGx5IGJlaW5nIHByb2Nlc3NlZFwiLFxuICAgIHR5cGU6IFwiRGlyUGF0aFwiLFxuICB9LFxuICBQT1NJVElPTl9JTkRFUEVOREVOVF9DT0RFOiB7XG4gICAgZGVzY3JpcHRpb246IFwiRW5hYmxlcyBQb3NpdGlvbi1JbmRlcGVuZGVudCBDb2RlIChQSUMpIGZvciBidWlsZGluZyBzaGFyZWQgbGlicmFyaWVzXCIsXG4gICAgdmFsdWU6IGZhbHNlLFxuICB9LFxuICBQUkVWRU5UX0lOU1RBTExfRklMRVM6IHtcbiAgICBkZXNjcmlwdGlvbjogXCJQcmV2ZW50IGluc3RhbGxhdGlvbiBvZiBmaWxlc1wiLFxuICAgIHZhbHVlOiBmYWxzZSxcbiAgfSxcbiAgSE9TVF9TWVNURU1fTkFNRToge1xuICAgIGRlc2NyaXB0aW9uOiBcIlNwZWNpZmllcyB0aGUgT1Mgb2YgdGhlIG1hY2hpbmUgcnVubmluZ1wiLFxuICAgIHZhbHVlOiBvcy50eXBlKCksXG4gIH0sXG4gIElOQ0xVREVTOiB7XG4gICAgZGVzY3JpcHRpb246IFwiUGF0aHMgc2VhcmNoZWQgZm9yIGhlYWRlciBmaWxlc1wiLFxuICAgIHZhbHVlOiBbXSxcbiAgfSxcbiAgQVNNX0NPTVBJTEVSOiB7XG4gICAgZGVzY3JpcHRpb246IFwiUGF0aCB0byB0aGUgYXNzZW1ibGVyIGNvbXBpbGVyIGRldGVjdGVkXCIsXG4gICAgdmFsdWU6IFwiXCIsXG4gIH0sXG4gIEFTTV9GTEFHUzoge1xuICAgIGRlc2NyaXB0aW9uOiBcIkZsYWdzIHBhc3NlZCB0byB0aGUgYXNzZW1ibGVyIGNvbXBpbGVyXCIsXG4gICAgdmFsdWU6IFtdLFxuICB9LFxuICBBU01fRkxBR1NfREVCVUc6IHtcbiAgICBkZXNjcmlwdGlvbjogXCJBZGRpdGlvbmFsIGFzc2VtYmxlciBmbGFncyB1c2VkIHdoZW4gYnVpbGRpbmcgaW4gRGVidWcgbW9kZVwiLFxuICAgIHZhbHVlOiBbIFwiLWdcIiBdLFxuICB9LFxuICBBU01fRkxBR1NfUkVMRUFTRToge1xuICAgIGRlc2NyaXB0aW9uOiBcIkFkZGl0aW9uYWwgYXNzZW1ibGVyIGZsYWdzIHVzZWQgd2hlbiBidWlsZGluZyBpbiBSZWxlYXNlIG1vZGVcIixcbiAgICB2YWx1ZTogWyBcIi1PM1wiLCBcIi1ETkRFQlVHXCIgXSxcbiAgfSxcbiAgQ19DT01QSUxFUjoge1xuICAgIGRlc2NyaXB0aW9uOiBcIlBhdGggdG8gdGhlIEMgY29tcGlsZXIgZGV0ZWN0ZWRcIixcbiAgICB2YWx1ZTogXCJcIixcbiAgfSxcbiAgQ19GTEFHUzoge1xuICAgIGRlc2NyaXB0aW9uOiBcIkZsYWdzIHBhc3NlZCB0byB0aGUgQyBjb21waWxlclwiLFxuICAgIHZhbHVlOiBbXSxcbiAgfSxcbiAgQ19GTEFHU19ERUJVRzoge1xuICAgIGRlc2NyaXB0aW9uOiBcIkFkZGl0aW9uYWwgQyBjb21waWxlciBmbGFncyB1c2VkIHdoZW4gYnVpbGRpbmcgaW4gRGVidWcgbW9kZVwiLFxuICAgIHZhbHVlOiBbIFwiLWdcIiBdLFxuICB9LFxuICBDX0ZMQUdTX1JFTEVBU0U6IHtcbiAgICBkZXNjcmlwdGlvbjogXCJBZGRpdGlvbmFsIEMgY29tcGlsZXIgZmxhZ3MgdXNlZCB3aGVuIGJ1aWxkaW5nIGluIFJlbGVhc2UgbW9kZVwiLFxuICAgIHZhbHVlOiBbIFwiLU8zXCIsIFwiLUROREVCVUdcIiBdLFxuICB9LFxuICBDWFhfQ09NUElMRVI6IHtcbiAgICBkZXNjcmlwdGlvbjogXCJQYXRoIHRvIHRoZSBDKysgY29tcGlsZXIgZGV0ZWN0ZWRcIixcbiAgICB2YWx1ZTogXCJcIixcbiAgfSxcbiAgQ1hYX0ZMQUdTOiB7XG4gICAgZGVzY3JpcHRpb246IFwiRmxhZ3MgcGFzc2VkIHRvIHRoZSBDIGNvbXBpbGVyXCIsXG4gICAgdmFsdWU6IFtdLFxuICB9LFxuICBDWFhfRkxBR1NfREVCVUc6IHtcbiAgICBkZXNjcmlwdGlvbjogXCJBZGRpdGlvbmFsIEMrKyBjb21waWxlciBmbGFncyB1c2VkIHdoZW4gYnVpbGRpbmcgaW4gRGVidWcgbW9kZVwiLFxuICAgIHZhbHVlOiBbIFwiLWdcIiBdLFxuICB9LFxuICBDWFhfRkxBR1NfUkVMRUFTRToge1xuICAgIGRlc2NyaXB0aW9uOiBcIkFkZGl0aW9uYWwgQysrIGNvbXBpbGVyIGZsYWdzIHVzZWQgd2hlbiBidWlsZGluZyBpbiBSZWxlYXNlIG1vZGVcIixcbiAgICB2YWx1ZTogWyBcIi1PM1wiLCBcIi1ETkRFQlVHXCIgXSxcbiAgfSxcbiAgQVI6IHtcbiAgICBkZXNjcmlwdGlvbjogXCJQYXRoIHRvIHRoZSBhcmNoaXZlciB0b29sIHVzZWQgdG8gY3JlYXRlIHN0YXRpYyBsaWJyYXJpZXNcIixcbiAgICB2YWx1ZTogXCJcIixcbiAgfSxcbiAgUkFOTElCOiB7XG4gICAgZGVzY3JpcHRpb246IFwiVG9vbCB1c2VkIHRvIGdlbmVyYXRlIGFuIGluZGV4IHRvIHRoZSBjb250ZW50cyBvZiBhbiBhcmNoaXZlIChzdGF0aWMgbGlicmFyeSlcIixcbiAgICB2YWx1ZTogXCJcIixcbiAgfSxcbiAgTElOS0VSOiB7XG4gICAgZGVzY3JpcHRpb246IFwiUGF0aCB0byB0aGUgbGlua2VyIHVzZWQgdG8gbGluayBvYmplY3QgZmlsZXMgYW5kIGxpYnJhcmllcyBpbnRvIGV4ZWN1dGFibGVzXCIsXG4gICAgdmFsdWU6IFwiXCIsXG4gIH0sXG4gIE5NOiB7XG4gICAgZGVzY3JpcHRpb246IFwiUGF0aCB0byB0aGUgdG9vbCB1c2VkIHRvIGxpc3Qgc3ltYm9scyBmcm9tIG9iamVjdCBmaWxlcyBvciBhcmNoaXZlc1wiLFxuICAgIHZhbHVlOiBcIlwiLFxuICB9LFxuICBPQkpDT1BZOiB7XG4gICAgZGVzY3JpcHRpb246IFwiUGF0aCB0byB0aGUgdG9vbCB1c2VkIHRvIGNvcHkgYW5kIHRyYW5zbGF0ZSBvYmplY3QgZmlsZXNcIixcbiAgICB2YWx1ZTogXCJcIixcbiAgfSxcbiAgT0JKRFVNUDoge1xuICAgIGRlc2NyaXB0aW9uOiBcIlBhdGggdG8gdGhlIHRvb2wgdXNlZCB0byBkaXNwbGF5IGluZm9ybWF0aW9uIGFib3V0IG9iamVjdCBmaWxlcywgc3VjaCBhcyBkaXNhc3NlbWJseVwiLFxuICAgIHZhbHVlOiBcIlwiLFxuICB9LFxuICBTVFJJUDoge1xuICAgIGRlc2NyaXB0aW9uOiBcIlBhdGggdG8gdGhlIHRvb2wgdXNlZCB0byByZW1vdmUgc3ltYm9scyBmcm9tIG9iamVjdCBmaWxlcyBvciBleGVjdXRhYmxlcyB0byByZWR1Y2Ugc2l6ZVwiLFxuICAgIHZhbHVlOiBcIlwiLFxuICB9LFxuICBPQkpFQ1RfTElCUkFSWV9QUkVGSVg6IHtcbiAgICBkZXNjcmlwdGlvbjogXCJQcmVmaXggdXNlZCBmb3Igb2JqZWN0IGxpYnJhcmllc1wiLFxuICAgIHZhbHVlOiBcIlwiLFxuICB9LFxuICBPQkpFQ1RfTElCUkFSWV9TVUZGSVg6IHtcbiAgICBkZXNjcmlwdGlvbjogXCJTdWZmaXggdXNlZCBmb3Igb2JqZWN0IGxpYnJhcnkgZmlsZXNcIixcbiAgICB2YWx1ZTogXCIub1wiLFxuICB9LFxuICBPQkpFQ1RfTElOS0VSX0ZMQUdTOiB7XG4gICAgZGVzY3JpcHRpb246IFwiRmxhZ3MgcGFzc2VkIHRvIHRoZSBsaW5rZXIgd2hlbiBjcmVhdGluZyBvYmplY3QgbGlicmFyaWVzXCIsXG4gICAgdmFsdWU6IFtdLFxuICB9LFxuICBTVEFUSUNfTElCUkFSWV9QUkVGSVg6IHtcbiAgICBkZXNjcmlwdGlvbjogXCJQcmVmaXggdXNlZCBmb3Igc3RhdGljIGxpYnJhcnkgZmlsZXNcIixcbiAgICB2YWx1ZTogXCJsaWJcIixcbiAgfSxcbiAgU1RBVElDX0xJQlJBUllfU1VGRklYOiB7XG4gICAgZGVzY3JpcHRpb246IFwiU3VmZml4IHVzZWQgZm9yIHN0YXRpYyBsaWJyYXJ5IGZpbGVzXCIsXG4gICAgdmFsdWU6IFwiLmFcIixcbiAgfSxcbiAgU1RBVElDX0xJTktFUl9GTEFHUzoge1xuICAgIGRlc2NyaXB0aW9uOiBcIkZsYWdzIHBhc3NlZCB0byB0aGUgbGlua2VyIHdoZW4gY3JlYXRpbmcgc3RhdGljIGxpYnJhcmllc1wiLFxuICAgIHZhbHVlOiBbXSxcbiAgfSxcbiAgU0hBUkVEX0xJQlJBUllfUFJFRklYOiB7XG4gICAgZGVzY3JpcHRpb246IFwiUHJlZml4IHVzZWQgZm9yIHNoYXJlZCBsaWJyYXJ5IGZpbGVzXCIsXG4gICAgdmFsdWU6IFwibGliXCIsXG4gIH0sXG4gIFNIQVJFRF9MSUJSQVJZX1NVRkZJWDoge1xuICAgIGRlc2NyaXB0aW9uOiBcIlN1ZmZpeCB1c2VkIGZvciBzaGFyZWQgbGlicmFyeSBmaWxlc1wiLFxuICAgIHZhbHVlOiBcIi5zb1wiLFxuICB9LFxuICBTSEFSRURfTElOS0VSX0ZMQUdTOiB7XG4gICAgZGVzY3JpcHRpb246IFwiRmxhZ3MgcGFzc2VkIHRvIHRoZSBsaW5rZXIgd2hlbiBjcmVhdGluZyBzaGFyZWQgbGlicmFyaWVzXCIsXG4gICAgdmFsdWU6IFtdLFxuICB9LFxuICBFWEVDVVRBQkxFX1NVRkZJWDoge1xuICAgIGRlc2NyaXB0aW9uOiBcIlN1ZmZpeCB1c2VkIGZvciBleGVjdXRhYmxlIGZpbGVzXCIsXG4gICAgdmFsdWU6IEhvc3QuZXhlY3V0YWJsZVN1ZmZpeCxcbiAgfSxcbiAgRVhFX0xJTktFUl9GTEFHUzoge1xuICAgIGRlc2NyaXB0aW9uOiBcIkZsYWdzIHBhc3NlZCB0byB0aGUgbGlua2VyIHdoZW4gY3JlYXRpbmcgZXhlY3V0YWJsZXNcIixcbiAgICB2YWx1ZTogW10sXG4gIH0sXG4gIEdMT0JBTF9DT05URVhUX0pTT046IHtcbiAgICBkZXNjcmlwdGlvbjogXCJGaWxlbmFtZSBmb3IgSlNPTiBvZiB0aGUgR2xvYmFsIGNvbnRleHRcIixcbiAgICB0eXBlOiBcIkZpbGVQYXRoXCIsXG4gIH0sXG4gIFRBUkdFVF9HT0FMU19KU09OOiB7XG4gICAgZGVzY3JpcHRpb246IFwiRmlsZW5hbWUgZm9yIEpTT04gb2YgdGhlIFRhcmdldCBHb2Fsc1wiLFxuICAgIHR5cGU6IFwiRmlsZVBhdGhcIixcbiAgfSxcbiAgU0laRU9GX1ZPSURfUDoge1xuICAgIGRlc2NyaXB0aW9uOiBcIkRlZmluZXMgdGhlIHNpemUgKGluIGJ5dGVzKSBvZiBhIHZvaWQgcG9pbnRlciBvbiB0aGUgdGFyZ2V0IGFyY2hpdGVjdHVyZVwiLFxuICAgIHR5cGU6IFsgNCwgOCBdLFxuICAgIHZhbHVlOiBIb3N0LnNpemVvZlZvaWRwLFxuICB9LFxuICBNQUtFX1BMVUdJTl9MSVNUOiB7XG4gICAgZGVzY3JpcHRpb246IFwiTGlzdCBvZiBwYXRocyB0byBwbHVnaW5zXCIsXG4gICAgdmFsdWU6IFtdLFxuICB9LFxuICBIT1NUX0VYRUNVVEFCTEVfU1VGRklYOiB7XG4gICAgZGVzY3JpcHRpb246IFwiRGVmaW5lcyB0aGUgZmlsZSBleHRlbnNpb24gZm9yIGV4ZWN1dGFibGVzIG9uIHRoZSBob3N0IHN5c3RlbVwiLFxuICAgIHZhbHVlOiBIb3N0LmV4ZWN1dGFibGVTdWZmaXgsXG4gICAgLy8gUmVhZG9ubHlcbiAgfSxcbn07XG4iLCIvKlxuICogTUlUIExpY2Vuc2VcbiAqXG4gKiBDb3B5cmlnaHQgKGMpIDIwMjUgIFl1cmlpIFlha3ViaW4gKHl1cmlpLnlha3ViaW5AZ21haWwuY29tKVxuICpcbiAqIFBlcm1pc3Npb24gaXMgZ3JhbnRlZCB0byB1c2UsIGNvcHksIG1vZGlmeSwgYW5kIGRpc3RyaWJ1dGUgdGhpcyBzb2Z0d2FyZVxuICogdW5kZXIgdGhlIE1JVCBMaWNlbnNlLiBTZWUgTElDRU5TRSBmaWxlIGZvciBkZXRhaWxzLlxuICovXG5cbmltcG9ydCB7IFNvdXJjZUZpbGUgfSBmcm9tIFwiQC9jb3JlL1NvdXJjZUZpbGVcIjtcbmltcG9ydCB7IFRhcmdldE5hbWUgfSBmcm9tIFwiQC9jb3JlL1RhcmdldE5hbWVcIjtcbmltcG9ydCB7IFRhcmdldEZpbGUgfSBmcm9tIFwiQC9jb3JlL1RhcmdldEZpbGVcIjtcbmltcG9ydCB7IFRhcmdldEluY2x1ZGVzIH0gZnJvbSBcIkAvY29yZS9UYXJnZXRJbmNsdWRlc1wiO1xuaW1wb3J0IHsgVGFyZ2V0T2JqZWN0cyB9IGZyb20gXCJAL2NvcmUvVGFyZ2V0T2JqZWN0c1wiO1xuaW1wb3J0IHsgRGlyUGF0aCwgQWJzb2x1dGVQYXRoIH0gZnJvbSBcIkAvY29yZS9BYnNvbHV0ZVBhdGhcIjtcbmltcG9ydCB7IFNpbXBsZU9iamVjdCB9IGZyb20gXCIuL1NpbXBsZU9iamVjdFwiO1xuaW1wb3J0IHsgTG9nZ2VyIH0gZnJvbSBcIkAvbG9nZ2VyXCI7XG5cbmNvbnN0IGxvZ2dlciA9IExvZ2dlci5jcmVhdGUoaW1wb3J0Lm1ldGEudXJsKTtcblxuZXhwb3J0IGludGVyZmFjZSBUYXJnZXRDb21tYW5kIHtcbiAgY29tbWFuZDogc3RyaW5nIHwgVGFyZ2V0RmlsZTtcbiAgYXJnczogQXJyYXk8c3RyaW5nIHwgVGFyZ2V0RmlsZT47XG59O1xuXG5pbnRlcmZhY2UgVGFyZ2V0RWxlbWVudDxUPiB7XG4gIHZhbHVlOiBUO1xuICBpc1B1YmxpYz86IGJvb2xlYW47XG59O1xuXG5jbGFzcyBUYXJnZXRFbGVtZW50czxUPiB7XG4gIHByaXZhdGUgX2xpc3QgPSBuZXcgQXJyYXk8VGFyZ2V0RWxlbWVudDxUPj47XG5cbiAgcHVibGljIGFkZCh2YWx1ZTogVCwgaXNQdWJsaWM/OiBib29sZWFuKSB7XG4gICAgdGhpcy5fbGlzdC5wdXNoKHt2YWx1ZSwgaXNQdWJsaWN9KTtcbiAgfVxuXG4gIHB1YmxpYyBjb25jYXQob3RoZXI6IFRhcmdldEVsZW1lbnRzPFQ+KSB7XG4gICAgY29uc3QgcmVzdWx0ID0gbmV3IFRhcmdldEVsZW1lbnRzPFQ+O1xuICAgIGZvciAoY29uc3QgaXRlciBvZiB0aGlzLl9saXN0KVxuICAgICAgcmVzdWx0Ll9saXN0LnB1c2goaXRlcik7XG4gICAgZm9yIChjb25zdCBpdGVyIG9mIG90aGVyLl9saXN0KVxuICAgICAgcmVzdWx0Ll9saXN0LnB1c2goaXRlcik7XG4gICAgcmV0dXJuIHJlc3VsdDtcbiAgfVxuXG4gIHB1YmxpYyBnZXRBbGxWYWx1ZXMoKTogVFtdIHtcbiAgICByZXR1cm4gdGhpcy5fbGlzdC5tYXAoaSA9PiBpLnZhbHVlKTtcbiAgfVxuXG4gIHB1YmxpYyBnZXRQdWJsaWNWYWx1ZXMoKSB7XG4gICAgcmV0dXJuIHRoaXMuX2xpc3QuZmlsdGVyKGkgPT4gaS5pc1B1YmxpYykubWFwKGkgPT4gaS52YWx1ZSk7XG4gIH1cblxuICBwdWJsaWMgc3RhdGljIGZyb21KU09OPFU+KGpzb246IGFueVtdKSB7XG4gICAgY29uc3QgcmVzdWx0ID0gbmV3IFRhcmdldEVsZW1lbnRzPFU+O1xuICAgIGZvciAoY29uc3QgaXRlciBvZiBqc29uKSB7XG4gICAgICBsZXQgaXNQdWJsaWMgPSBmYWxzZTtcbiAgICAgIGxldCB2YWx1ZSA9IGl0ZXIucHJpdmF0ZTtcbiAgICAgIGlmICghdmFsdWUpIHtcbiAgICAgICAgdmFsdWUgPSBpdGVyLnB1YmxpYztcbiAgICAgICAgaXNQdWJsaWMgPSB0cnVlO1xuICAgICAgfVxuICAgICAgdmFsdWUgPSBTaW1wbGVPYmplY3QuZnJvbUpTT04odmFsdWUpO1xuICAgICAgcmVzdWx0Ll9saXN0LnB1c2goe3ZhbHVlLCBpc1B1YmxpY30pO1xuICAgIH1cbiAgICByZXR1cm4gcmVzdWx0O1xuICB9XG5cbiAgcHVibGljIHRvSlNPTigpIHtcbiAgICBjb25zdCByZXN1bHQ6IGFueSA9IFtdO1xuICAgIGZvciAoY29uc3QgaXRlciBvZiB0aGlzLl9saXN0KSB7XG4gICAgICBjb25zdCBuYW1lID0gaXRlci5pc1B1YmxpYyA/IFwicHVibGljXCIgOiBcInByaXZhdGVcIjtcbiAgICAgIGNvbnN0IHZhbHVlID0gU2ltcGxlT2JqZWN0LnRvSlNPTihpdGVyLnZhbHVlKTtcbiAgICAgIHJlc3VsdC5wdXNoKHsgW25hbWVdIDogdmFsdWUgfSk7XG4gICAgfVxuICAgIHJldHVybiByZXN1bHQ7XG4gIH1cbn07XG5cbmV4cG9ydCBhYnN0cmFjdCBjbGFzcyBCYXNlVGFyZ2V0IHtcbiAgcHJvdGVjdGVkIF9uYW1lOiBzdHJpbmc7XG4gIHByb3RlY3RlZCBfaW5jbHVkZXMgPSBuZXcgVGFyZ2V0RWxlbWVudHM8RGlyUGF0aCB8IFRhcmdldEluY2x1ZGVzPjtcbiAgcHJvdGVjdGVkIF9kZWZpbml0aW9ucyA9IG5ldyBUYXJnZXRFbGVtZW50czxzdHJpbmc+O1xuICBwcm90ZWN0ZWQgX2NvbXBpbGVPcHRpb25zID0gbmV3IFRhcmdldEVsZW1lbnRzPHN0cmluZyB8IHN0cmluZ1tdPjtcbiAgcHJvdGVjdGVkIF9saW5rT3B0aW9ucyA9IG5ldyBUYXJnZXRFbGVtZW50czxzdHJpbmcgfCBzdHJpbmdbXT47XG4gIHByb3RlY3RlZCBfbGlicmFyaWVzID0gbmV3IFRhcmdldEVsZW1lbnRzPFRhcmdldE5hbWU+O1xuICBwcm90ZWN0ZWQgX3NvdXJjZXMgPSBuZXcgQXJyYXk8VGFyZ2V0T2JqZWN0cyB8IFNvdXJjZUZpbGU+O1xuICBwcm90ZWN0ZWQgX3ByZUJ1aWxkTGlzdCA9IG5ldyBBcnJheTxUYXJnZXRDb21tYW5kPjtcbiAgcHJvdGVjdGVkIF9wb3N0QnVpbGRMaXN0ID0gbmV3IEFycmF5PFRhcmdldENvbW1hbmQ+O1xuICBwcm90ZWN0ZWQgX2xhbmd1YWdlID0gXCJcIjtcbiAgcHJvdGVjdGVkIF9jb21waWxlclBhdGggPSBcIlwiO1xuICBwcm90ZWN0ZWQgX2NvbXBpbGVyRmxhZ3MgPSBuZXcgQXJyYXk8c3RyaW5nPjtcblxuICBwcm90ZWN0ZWQgY29uc3RydWN0b3IobmFtZTogc3RyaW5nKSB7XG4gICAgdGhpcy5fbmFtZSA9IG5hbWU7XG4gIH1cblxuICBhYnN0cmFjdCBzZXRQcmVmaXgodmFsdWU6IHN0cmluZykgOiB2b2lkO1xuICBhYnN0cmFjdCBzZXRPdXRwdXROYW1lKHZhbHVlOiBhbnkpIDogdm9pZDtcbiAgYWJzdHJhY3Qgc2V0U3VmZml4KHZhbHVlOiBzdHJpbmcpIDogdm9pZDtcbiAgYWJzdHJhY3Qgc2V0UG9zaXRpb25JbmRlcGVuZGVudENvZGUodmFsdWU6IGJvb2xlYW4pIDogdm9pZDtcblxuICBwdWJsaWMgZ2V0IHRhcmdldE5hbWUoKSB7XG4gICAgcmV0dXJuIHRoaXMuX25hbWU7XG4gIH1cblxuICBwdWJsaWMgZ2V0IG5hbWUoKSB7IC8vIERFTE1FXG4gICAgcmV0dXJuIHRoaXMuX25hbWU7XG4gIH1cblxuICBwdWJsaWMgZ2V0IGluY2x1ZGVzKCk6IFRhcmdldEluY2x1ZGVzIHtcbiAgICByZXR1cm4gVGFyZ2V0SW5jbHVkZXMuY3JlYXRlKHRoaXMuX25hbWUpO1xuICB9XG5cbiAgcHVibGljIGdldCBvYmplY3RzKCk6IFRhcmdldE9iamVjdHMge1xuICAgIHJldHVybiBUYXJnZXRPYmplY3RzLmNyZWF0ZSh0aGlzLl9uYW1lKTtcbiAgfVxuXG4gIHB1YmxpYyBnZXQgdGFyZ2V0RmlsZSgpOiBUYXJnZXRGaWxlIHtcbiAgICByZXR1cm4gVGFyZ2V0RmlsZS5jcmVhdGUodGhpcy5fbmFtZSk7XG4gIH1cblxuICBwdWJsaWMgZ2V0SW5jbHVkZXMoKTogQXJyYXk8RGlyUGF0aCB8IFRhcmdldEluY2x1ZGVzPiB7XG4gICAgcmV0dXJuIHRoaXMuX2luY2x1ZGVzLmdldEFsbFZhbHVlcygpO1xuICB9XG5cbiAgcHVibGljIGdldFB1YmxpY0luY2x1ZGVzKCk6IEFycmF5PERpclBhdGggfCBUYXJnZXRJbmNsdWRlcz4ge1xuICAgIHJldHVybiB0aGlzLl9pbmNsdWRlcy5nZXRQdWJsaWNWYWx1ZXMoKTtcbiAgfVxuXG4gIHB1YmxpYyBhZGRJbmNsdWRlKHB1YmxpY09ubHk6IGJvb2xlYW4sIHZhbHVlOiBEaXJQYXRoIHwgVGFyZ2V0SW5jbHVkZXMpOiB2b2lkIHtcbiAgICB0aGlzLl9pbmNsdWRlcy5hZGQodmFsdWUsIHB1YmxpY09ubHkpO1xuICB9XG5cbiAgcHVibGljIGdldERlZmluaXRpb25zKCk6IEFycmF5PHN0cmluZz4ge1xuICAgIHJldHVybiB0aGlzLl9kZWZpbml0aW9ucy5nZXRBbGxWYWx1ZXMoKTtcbiAgfVxuXG4gIHB1YmxpYyBnZXRQdWJsaWNEZWZpbml0aW9ucygpOiBBcnJheTxzdHJpbmc+IHtcbiAgICByZXR1cm4gdGhpcy5fZGVmaW5pdGlvbnMuZ2V0UHVibGljVmFsdWVzKCk7XG4gIH1cblxuICBwdWJsaWMgYWRkRGVmaW5pdGlvbihwdWJsaWNPbmx5OiBib29sZWFuLCB2YWx1ZTogc3RyaW5nKTogdm9pZCB7XG4gICAgdGhpcy5fZGVmaW5pdGlvbnMuYWRkKHZhbHVlLCBwdWJsaWNPbmx5KTtcbiAgfVxuXG4gIHB1YmxpYyBnZXRDb21waWxlT3B0aW9ucygpOiBBcnJheTxzdHJpbmcgfCBzdHJpbmdbXT4ge1xuICAgIHJldHVybiB0aGlzLl9jb21waWxlT3B0aW9ucy5nZXRBbGxWYWx1ZXMoKTtcbiAgfVxuICBcbiAgcHVibGljIGdldFB1YmxpY0NvbXBpbGVPcHRpb25zKCk6IEFycmF5PHN0cmluZ3xzdHJpbmdbXT4ge1xuICAgIHJldHVybiB0aGlzLl9jb21waWxlT3B0aW9ucy5nZXRQdWJsaWNWYWx1ZXMoKTtcbiAgfVxuXG4gIHB1YmxpYyBhZGRDb21waWxlT3B0aW9uKHB1YmxpY09ubHk6IGJvb2xlYW4sIG9wdGlvbjogc3RyaW5nIHwgc3RyaW5nW10pOiB2b2lkIHtcbiAgICB0aGlzLl9jb21waWxlT3B0aW9ucy5hZGQob3B0aW9uLCBwdWJsaWNPbmx5KTtcbiAgfVxuXG4gIHB1YmxpYyBnZXRMaW5rT3B0aW9ucygpOiBBcnJheTxzdHJpbmcgfCBzdHJpbmdbXT4ge1xuICAgIHJldHVybiB0aGlzLl9saW5rT3B0aW9ucy5nZXRBbGxWYWx1ZXMoKTtcbiAgfVxuXG4gIHB1YmxpYyBnZXRQdWJsaWNMaW5rT3B0aW9ucygpOiBBcnJheTxzdHJpbmcgfCBzdHJpbmdbXT4ge1xuICAgIHJldHVybiB0aGlzLl9saW5rT3B0aW9ucy5nZXRQdWJsaWNWYWx1ZXMoKTtcbiAgfVxuXG4gIHB1YmxpYyBhZGRMaW5rT3B0aW9ucyguLi5vcHRpb25zOiBBcnJheTxzdHJpbmcgfCBzdHJpbmdbXT4pIHtcbiAgICB0aGlzLmFkZExpbmtPcHRpb25zSW1wbChmYWxzZSwgLi4ub3B0aW9ucyk7XG4gIH1cblxuICBwdWJsaWMgYWRkUHVibGljTGlua09wdGlvbnMoLi4ub3B0aW9uczogQXJyYXk8c3RyaW5nIHwgc3RyaW5nW10+KSB7XG4gICAgdGhpcy5hZGRMaW5rT3B0aW9uc0ltcGwodHJ1ZSwgLi4ub3B0aW9ucyk7XG4gIH1cblxuICBwdWJsaWMgYWRkTGlua09wdGlvbnNJbXBsKHB1YmxpY09ubHk6IGJvb2xlYW4sIC4uLm9wdGlvbnM6IEFycmF5PHN0cmluZyB8IHN0cmluZ1tdPikge1xuICAgIGZvciAoY29uc3QgdmFsdWUgb2Ygb3B0aW9ucy5mbGF0KCkpXG4gICAgICB0aGlzLl9saW5rT3B0aW9ucy5hZGQodmFsdWUsIHB1YmxpY09ubHkpO1xuICB9XG5cbiAgcHVibGljIGdldExpYnJhcmllcygpIHtcbiAgICByZXR1cm4gdGhpcy5fbGlicmFyaWVzLmdldEFsbFZhbHVlcygpXG4gIH1cblxuICBwdWJsaWMgZ2V0UHVibGljTGlicmFyaWVzKCkge1xuICAgIHJldHVybiB0aGlzLl9saWJyYXJpZXMuZ2V0UHVibGljVmFsdWVzKCk7XG4gIH1cblxuICBwdWJsaWMgYWRkTGlicmFyaWVzKC4uLmxpYnJhcmllczogUG9zdFRhcmdldFtdKSB7XG4gICAgdGhpcy5hZGRMaWJyYXJpZXNJbXBsKGZhbHNlLCAuLi5saWJyYXJpZXMpO1xuICB9XG5cbiAgcHVibGljIGFkZFB1YmxpY0xpYnJhcmllcyguLi5saWJyYXJpZXM6IFBvc3RUYXJnZXRbXSkge1xuICAgIHRoaXMuYWRkTGlicmFyaWVzSW1wbCh0cnVlLCAuLi5saWJyYXJpZXMpO1xuICB9XG5cbiAgcHVibGljIGFkZExpYnJhcmllc0ltcGwocHVibGljT25seTogYm9vbGVhbiwgLi4ubGlicmFyaWVzOiBQb3N0VGFyZ2V0W10pIHtcbiAgICBmb3IgKGNvbnN0IGl0ZXIgb2YgbGlicmFyaWVzLmZsYXQoKSlcbiAgICAgIHRoaXMuX2xpYnJhcmllcy5hZGQoVGFyZ2V0TmFtZS5jcmVhdGUoaXRlci50YXJnZXROYW1lKSwgcHVibGljT25seSk7XG4gIH1cblxuICBwdWJsaWMgZ2V0SGVhZGVycygpOiBTb3VyY2VGaWxlW10ge1xuICAgIHJldHVybiB0aGlzLmdldFNvdXJjZUZpbGVzKCkuZmlsdGVyKGkgPT4gaS5IRUFERVJfRklMRV9PTkxZKTtcbiAgfVxuXG4gIHB1YmxpYyBnZXRBbGxTb3VyY2VzKCkge1xuICAgIHJldHVybiB0aGlzLl9zb3VyY2VzO1xuICB9XG5cbiAgcHVibGljIGdldFNvdXJjZUZpbGVzKCk6IFNvdXJjZUZpbGVbXSB7XG4gICAgcmV0dXJuIHRoaXMuX3NvdXJjZXMuZmlsdGVyKGkgPT4gaSBpbnN0YW5jZW9mIFNvdXJjZUZpbGUpO1xuICB9XG5cbiAgcHVibGljIGdldFRhcmdldE9iamVjdHMoKTogVGFyZ2V0T2JqZWN0c1tdIHtcbiAgICByZXR1cm4gdGhpcy5fc291cmNlcy5maWx0ZXIoaSA9PiBpIGluc3RhbmNlb2YgVGFyZ2V0T2JqZWN0cyk7XG4gIH1cblxuICBwdWJsaWMgYWRkU291cmNlKHNvdXJjZTogVGFyZ2V0T2JqZWN0cyB8IFNvdXJjZUZpbGUpIHtcbiAgICB0aGlzLl9zb3VyY2VzLnB1c2goc291cmNlKTtcbiAgfVxuXG4gIHB1YmxpYyBnZXQgcHJlQnVpbGRMaXN0KCkge1xuICAgIHJldHVybiB0aGlzLl9wcmVCdWlsZExpc3Q7XG4gIH1cblxuICBwdWJsaWMgYWRkUHJlQnVpbGQoY29tbWFuZDogc3RyaW5nIHwgVGFyZ2V0RmlsZSwgYXJnczogQXJyYXk8c3RyaW5nIHwgVGFyZ2V0RmlsZT4pIHtcbiAgICB0aGlzLl9wcmVCdWlsZExpc3QucHVzaCh7Y29tbWFuZCwgYXJnc30pO1xuICB9XG5cbiAgcHVibGljIGdldCBwb3N0QnVpbGRMaXN0KCkge1xuICAgIHJldHVybiB0aGlzLl9wb3N0QnVpbGRMaXN0O1xuICB9XG5cbiAgcHVibGljIGFkZFBvc3RCdWlsZChjb21tYW5kOiBzdHJpbmcgfCBUYXJnZXRGaWxlLCBhcmdzOiBBcnJheTxzdHJpbmcgfCBUYXJnZXRGaWxlPikge1xuICAgIHRoaXMuX3Bvc3RCdWlsZExpc3QucHVzaCh7Y29tbWFuZCwgYXJnc30pO1xuICB9XG5cbiAgcHVibGljIGdldCBsYW5ndWFnZSgpOiBzdHJpbmcge1xuICAgIHJldHVybiB0aGlzLl9sYW5ndWFnZTtcbiAgfVxuXG4gIHB1YmxpYyBzZXQgbGFuZ3VhZ2UodmFsdWU6IHN0cmluZykge1xuICAgIHRoaXMuX2xhbmd1YWdlID0gdmFsdWU7XG4gIH1cblxuICBwdWJsaWMgZ2V0IGNvbXBpbGVyUGF0aCgpOiBzdHJpbmcge1xuICAgIHJldHVybiB0aGlzLl9jb21waWxlclBhdGg7XG4gIH1cblxuICBwdWJsaWMgc2V0IGNvbXBpbGVyUGF0aCh2YWx1ZTogc3RyaW5nKSB7XG4gICAgdGhpcy5fY29tcGlsZXJQYXRoID0gdmFsdWU7XG4gIH1cblxuICBwdWJsaWMgZ2V0IGNvbXBpbGVyRmxhZ3MoKTogc3RyaW5nW10ge1xuICAgIHJldHVybiB0aGlzLl9jb21waWxlckZsYWdzO1xuICB9XG5cbiAgcHVibGljIHNldCBjb21waWxlckZsYWdzKHZhbHVlOiBzdHJpbmdbXSkge1xuICAgIHRoaXMuX2NvbXBpbGVyRmxhZ3MgPSB2YWx1ZTtcbiAgfVxuXG4gIHB1YmxpYyBwb3N0VXBkYXRlKHRhcmdldDogQmFzZVRhcmdldCkge1xuICAgIHRoaXMuX2luY2x1ZGVzID0gdGhpcy5faW5jbHVkZXMuY29uY2F0KHRhcmdldC5faW5jbHVkZXMpO1xuICAgIHRoaXMuX2RlZmluaXRpb25zID0gdGhpcy5fZGVmaW5pdGlvbnMuY29uY2F0KHRhcmdldC5fZGVmaW5pdGlvbnMpO1xuICAgIHRoaXMuX2NvbXBpbGVPcHRpb25zID0gdGhpcy5fY29tcGlsZU9wdGlvbnMuY29uY2F0KHRhcmdldC5fY29tcGlsZU9wdGlvbnMpO1xuICAgIHRoaXMuX2xpbmtPcHRpb25zID0gdGhpcy5fbGlua09wdGlvbnMuY29uY2F0KHRhcmdldC5fbGlua09wdGlvbnMpO1xuICAgIHRoaXMuX2xpYnJhcmllcyA9IHRoaXMuX2xpYnJhcmllcy5jb25jYXQodGFyZ2V0Ll9saWJyYXJpZXMpO1xuICAgIHRoaXMuX3NvdXJjZXMucHVzaCguLi50YXJnZXQuX3NvdXJjZXMpO1xuICAgIHRoaXMuX3ByZUJ1aWxkTGlzdC5wdXNoKC4uLnRhcmdldC5fcHJlQnVpbGRMaXN0KTtcbiAgICB0aGlzLl9wb3N0QnVpbGRMaXN0LnB1c2goLi4udGFyZ2V0Ll9wb3N0QnVpbGRMaXN0KTtcbiAgfVxuXG4gIHByb3RlY3RlZCBwdXRGcm9tSlNPTihqc29uOiBhbnkpIHtcbiAgICB0aGlzLl9pbmNsdWRlcyA9IFRhcmdldEVsZW1lbnRzLmZyb21KU09OPERpclBhdGggfCBUYXJnZXRJbmNsdWRlcz4oanNvbi5pbmNsdWRlcyk7XG4gICAgdGhpcy5fZGVmaW5pdGlvbnMgPSBUYXJnZXRFbGVtZW50cy5mcm9tSlNPTjxzdHJpbmc+KGpzb24uZGVmaW5pdGlvbnMpO1xuICAgIHRoaXMuX2NvbXBpbGVPcHRpb25zID0gVGFyZ2V0RWxlbWVudHMuZnJvbUpTT048c3RyaW5nIHwgc3RyaW5nW10+KGpzb24uY29tcGlsZU9wdGlvbnMpO1xuICAgIHRoaXMuX2xpbmtPcHRpb25zID0gVGFyZ2V0RWxlbWVudHMuZnJvbUpTT048c3RyaW5nIHwgc3RyaW5nW10+KGpzb24ubGlua09wdGlvbnMpO1xuICAgIHRoaXMuX2xpYnJhcmllcyA9IFRhcmdldEVsZW1lbnRzLmZyb21KU09OPFRhcmdldE5hbWU+KGpzb24ubGlicmFyaWVzKTtcbiAgICB0aGlzLl9zb3VyY2VzID0gU2ltcGxlT2JqZWN0LmZyb21KU09OKGpzb24uc291cmNlcyk7XG4gICAgdGhpcy5fcHJlQnVpbGRMaXN0ID0gU2ltcGxlT2JqZWN0LmZyb21KU09OKGpzb24ucHJlQnVpbGRMaXN0KTtcbiAgICB0aGlzLl9wb3N0QnVpbGRMaXN0ID0gU2ltcGxlT2JqZWN0LmZyb21KU09OKGpzb24ucG9zdEJ1aWxkTGlzdCk7XG4gICAgdGhpcy5fbGFuZ3VhZ2UgPSBTaW1wbGVPYmplY3QuZnJvbUpTT04oanNvbi5sYW5ndWFnZSk7XG4gICAgdGhpcy5fY29tcGlsZXJQYXRoID0gU2ltcGxlT2JqZWN0LmZyb21KU09OKGpzb24uY29tcGlsZXJQYXRoKTtcbiAgICB0aGlzLl9jb21waWxlckZsYWdzID0gU2ltcGxlT2JqZWN0LmZyb21KU09OKGpzb24uY29tcGlsZXJGbGFncyk7XG4gIH1cblxuICBwcm90ZWN0ZWQgY29weVRvSlNPTihqc29uOiBhbnkpIHtcbiAgICBqc29uLm5hbWUgPSB0aGlzLl9uYW1lO1xuICAgIGpzb24uaW5jbHVkZXMgPSB0aGlzLl9pbmNsdWRlcy50b0pTT04oKTtcbiAgICBqc29uLmRlZmluaXRpb25zID0gdGhpcy5fZGVmaW5pdGlvbnMudG9KU09OKCk7XG4gICAganNvbi5jb21waWxlT3B0aW9ucyA9IHRoaXMuX2NvbXBpbGVPcHRpb25zLnRvSlNPTigpO1xuICAgIGpzb24ubGlua09wdGlvbnMgPSB0aGlzLl9saW5rT3B0aW9ucy50b0pTT04oKTtcbiAgICBqc29uLmxpYnJhcmllcyA9IHRoaXMuX2xpYnJhcmllcy50b0pTT04oKTtcbiAgICBqc29uLnNvdXJjZXMgPSBTaW1wbGVPYmplY3QudG9KU09OKHRoaXMuX3NvdXJjZXMpO1xuICAgIGpzb24ucHJlQnVpbGRMaXN0ID0gU2ltcGxlT2JqZWN0LnRvSlNPTih0aGlzLl9wcmVCdWlsZExpc3QpO1xuICAgIGpzb24ucG9zdEJ1aWxkTGlzdCA9IFNpbXBsZU9iamVjdC50b0pTT04odGhpcy5fcG9zdEJ1aWxkTGlzdCk7XG4gICAganNvbi5sYW5ndWFnZSA9IHRoaXMuX2xhbmd1YWdlO1xuICAgIGpzb24uY29tcGlsZXJQYXRoID0gdGhpcy5fY29tcGlsZXJQYXRoO1xuICAgIGpzb24uY29tcGlsZXJGbGFncyA9IHRoaXMuX2NvbXBpbGVyRmxhZ3M7XG4gIH1cbn07XG5cbmV4cG9ydCBjbGFzcyBQb3N0VGFyZ2V0IGV4dGVuZHMgQmFzZVRhcmdldCB7XG4gIHByaXZhdGUgX3ByZWZpeD86IHN0cmluZztcbiAgcHJpdmF0ZSBfb3V0cHV0TmFtZT86IHN0cmluZztcbiAgcHJpdmF0ZSBfc3VmZml4Pzogc3RyaW5nO1xuICBwcml2YXRlIF9wb3NpdGlvbkluZGVwZW5kZW50Q29kZT86IGJvb2xlYW47XG5cbiAgcHJpdmF0ZSBjb25zdHJ1Y3RvcihuYW1lOiBzdHJpbmcpIHtcbiAgICBzdXBlcihuYW1lKTtcbiAgfVxuXG4gIHB1YmxpYyBzdGF0aWMgY3JlYXRlKG5hbWU6IHN0cmluZykge1xuICAgIHJldHVybiBPYmplY3Quc2VhbChuZXcgUG9zdFRhcmdldChuYW1lKSk7XG4gIH1cblxuICBwdWJsaWMgZ2V0IHByZWZpeCgpIHtcbiAgICByZXR1cm4gdGhpcy5fcHJlZml4O1xuICB9XG5cbiAgcHVibGljIHNldFByZWZpeCh2YWx1ZTogc3RyaW5nKSB7XG4gICAgdGhpcy5fcHJlZml4ID0gdmFsdWU7XG4gIH1cblxuICBwdWJsaWMgZ2V0IG91dHB1dE5hbWUoKSB7XG4gICAgcmV0dXJuIHRoaXMuX291dHB1dE5hbWU7XG4gIH1cblxuICBwdWJsaWMgc2V0T3V0cHV0TmFtZSh2YWx1ZTogYW55KSB7XG4gICAgdGhpcy5fb3V0cHV0TmFtZSA9IHZhbHVlO1xuICB9XG5cbiAgcHVibGljIGdldCBzdWZmaXgoKSB7XG4gICAgcmV0dXJuIHRoaXMuX3N1ZmZpeDtcbiAgfVxuXG4gIHB1YmxpYyBzZXRTdWZmaXgodmFsdWU6IHN0cmluZykge1xuICAgIHRoaXMuX3N1ZmZpeCA9IHZhbHVlO1xuICB9XG5cbiAgcHVibGljIGdldCBwb3NpdGlvbkluZGVwZW5kZW50Q29kZSgpIHtcbiAgICByZXR1cm4gdGhpcy5fcG9zaXRpb25JbmRlcGVuZGVudENvZGU7XG4gIH1cblxuICBwdWJsaWMgc2V0UG9zaXRpb25JbmRlcGVuZGVudENvZGUodmFsdWU6IGJvb2xlYW4pIHtcbiAgICB0aGlzLl9wb3NpdGlvbkluZGVwZW5kZW50Q29kZSA9IHZhbHVlO1xuICB9XG5cbiAgcHVibGljIGdldCBDT01QSUxFX09QVElPTlMoKSB7XG4gICAgcmV0dXJuIHRoaXMuX2NvbXBpbGVPcHRpb25zO1xuICB9XG5cbiAgcHVibGljIGdldCBMSU5LX09QVElPTlMoKSB7XG4gICAgcmV0dXJuIHRoaXMuX2xpbmtPcHRpb25zO1xuICB9XG5cbiAgcHVibGljIGdldCBMSUJSQVJJRVMoKSB7XG4gICAgcmV0dXJuIHRoaXMuX2xpYnJhcmllcztcbiAgfVxuXG4gIHB1YmxpYyBnZXQgU09VUkNFUygpIHtcbiAgICByZXR1cm4gdGhpcy5fc291cmNlcztcbiAgfVxuXG4gIHB1YmxpYyBzdGF0aWMgZnJvbUpTT04oanNvbjogYW55KTogUG9zdFRhcmdldCB7XG4gICAgY29uc3QgdGFyZ2V0ID0gbmV3IFBvc3RUYXJnZXQoanNvbi5uYW1lKTtcblxuICAgIHRhcmdldC5wdXRGcm9tSlNPTihqc29uKTtcblxuICAgIGlmIChqc29uLnByZWZpeCAhPT0gdW5kZWZpbmVkKVxuICAgICAgdGFyZ2V0Ll9wcmVmaXggPSBqc29uLnByZWZpeDtcblxuICAgIGlmIChqc29uLm91dHB1dE5hbWUgIT09IHVuZGVmaW5lZClcbiAgICAgIHRhcmdldC5fb3V0cHV0TmFtZSA9IGpzb24ub3V0cHV0TmFtZTtcblxuICAgIGlmIChqc29uLnN1ZmZpeCAhPT0gdW5kZWZpbmVkKVxuICAgICAgdGFyZ2V0Ll9zdWZmaXggPSBqc29uLnN1ZmZpeDtcblxuICAgIGlmIChqc29uLnBvc2l0aW9uSW5kZXBlbmRlbnRDb2RlICE9PSB1bmRlZmluZWQpXG4gICAgICB0YXJnZXQuX3Bvc2l0aW9uSW5kZXBlbmRlbnRDb2RlID0ganNvbi5wb3NpdGlvbkluZGVwZW5kZW50Q29kZTtcblxuICAgIHJldHVybiB0YXJnZXQ7XG4gIH1cblxuICBwdWJsaWMgdG9KU09OKCk6IFNpbXBsZU9iamVjdCB7XG4gICAgY29uc3QgcmVzdWx0OiBTaW1wbGVPYmplY3QgPSB7XG4gICAgICB0eXBlOiBQb3N0VGFyZ2V0Lm5hbWVcbiAgICB9O1xuXG4gICAgc3VwZXIuY29weVRvSlNPTihyZXN1bHQpO1xuXG4gICAgaWYgKHRoaXMuX3ByZWZpeCAhPT0gdW5kZWZpbmVkKVxuICAgICAgcmVzdWx0LnByZWZpeCA9IHRoaXMuX3ByZWZpeDtcblxuICAgIGlmICh0aGlzLl9vdXRwdXROYW1lICE9PSB1bmRlZmluZWQpXG4gICAgICByZXN1bHQub3V0cHV0TmFtZSA9IHRoaXMuX291dHB1dE5hbWU7XG5cbiAgICBpZiAodGhpcy5fc3VmZml4ICE9PSB1bmRlZmluZWQpXG4gICAgICByZXN1bHQuc3VmZml4ID0gdGhpcy5fc3VmZml4O1xuXG4gICAgaWYgKHRoaXMuX3Bvc2l0aW9uSW5kZXBlbmRlbnRDb2RlICE9PSB1bmRlZmluZWQpXG4gICAgICByZXN1bHQucG9zaXRpb25JbmRlcGVuZGVudENvZGUgPSB0aGlzLl9wb3NpdGlvbkluZGVwZW5kZW50Q29kZTtcblxuICAgIHJldHVybiByZXN1bHQ7XG4gIH1cbn07XG5cbmV4cG9ydCBhYnN0cmFjdCBjbGFzcyBNYWluVGFyZ2V0IGV4dGVuZHMgQmFzZVRhcmdldCB7XG4gIHByaXZhdGUgX3NvdXJjZURpcjogQWJzb2x1dGVQYXRoO1xuICBwcml2YXRlIF9iaW5hcnlEaXI6IEFic29sdXRlUGF0aDtcbiAgcHJpdmF0ZSBfcHJlZml4ID0gXCJcIjtcbiAgcHJpdmF0ZSBfc3VmZml4ID0gXCJcIjtcbiAgcHJpdmF0ZSBfb3V0cHV0TmFtZTogc3RyaW5nO1xuICBwcml2YXRlIF9wb3NpdGlvbkluZGVwZW5kZW50Q29kZSA9IGZhbHNlO1xuXG4gIHByb3RlY3RlZCBjb25zdHJ1Y3RvcihuYW1lOiBzdHJpbmcsIHNvdXJjZURpcjogQWJzb2x1dGVQYXRoLCBiaW5hcnlEaXI6IEFic29sdXRlUGF0aCkge1xuICAgIHN1cGVyKG5hbWUpO1xuXG4gICAgdGhpcy5fc291cmNlRGlyID0gc291cmNlRGlyO1xuICAgIHRoaXMuX2JpbmFyeURpciA9IGJpbmFyeURpcjtcbiAgICB0aGlzLl9vdXRwdXROYW1lID0gbmFtZTtcbiAgfVxuXG4gIHB1YmxpYyBnZXQgaXNPYmplY3RMaWJyYXJ5KCk6IGJvb2xlYW4ge1xuICAgIHJldHVybiBmYWxzZTtcbiAgfVxuXG4gIHB1YmxpYyBnZXQgaXNTdGF0aWNMaWJyYXJ5KCk6IGJvb2xlYW4ge1xuICAgIHJldHVybiBmYWxzZTtcbiAgfVxuXG4gIHB1YmxpYyBnZXQgaXNTaGFyZWRMaWJyYXJ5KCk6IGJvb2xlYW4ge1xuICAgIHJldHVybiBmYWxzZTtcbiAgfVxuXG4gIHB1YmxpYyBnZXQgaXNFeGVjdXRhYmxlKCk6IGJvb2xlYW4ge1xuICAgIHJldHVybiBmYWxzZTtcbiAgfVxuXG4gIHB1YmxpYyBnZXQgc291cmNlRGlyKCkge1xuICAgIHJldHVybiB0aGlzLl9zb3VyY2VEaXI7XG4gIH1cblxuICBwdWJsaWMgZ2V0IGJpbmFyeURpcigpIHtcbiAgICByZXR1cm4gdGhpcy5fYmluYXJ5RGlyO1xuICB9XG5cbiAgcHVibGljIGdldEZpbGVEaXIoKSB7XG4gICAgcmV0dXJuIHRoaXMuX2JpbmFyeURpcjtcbiAgfVxuXG4gIHB1YmxpYyBnZXRGaWxlTmFtZSgpIHtcbiAgICByZXR1cm4gdGhpcy5wcmVmaXggKyB0aGlzLm91dHB1dE5hbWUgKyB0aGlzLnN1ZmZpeDtcbiAgfVxuXG4gIHB1YmxpYyBnZXRGaWxlKCkge1xuICAgIHJldHVybiB0aGlzLl9iaW5hcnlEaXIuam9pbih0aGlzLmdldEZpbGVOYW1lKCkpO1xuICB9XG5cbiAgcHVibGljIGdldCBwcmVmaXgoKSB7XG4gICAgcmV0dXJuIHRoaXMuX3ByZWZpeDtcbiAgfVxuXG4gIHB1YmxpYyBzZXRQcmVmaXgodmFsdWU6IHN0cmluZykge1xuICAgIHRoaXMuX3ByZWZpeCA9IHZhbHVlO1xuICB9XG5cbiAgcHVibGljIGdldCBzdWZmaXgoKSB7XG4gICAgcmV0dXJuIHRoaXMuX3N1ZmZpeDtcbiAgfVxuXG4gIHB1YmxpYyBzZXRTdWZmaXgodmFsdWU6IGFueSkge1xuICAgIHRoaXMuX3N1ZmZpeCA9IHZhbHVlO1xuICB9XG5cbiAgcHVibGljIGdldCBvdXRwdXROYW1lKCkge1xuICAgIHJldHVybiB0aGlzLl9vdXRwdXROYW1lO1xuICB9XG5cbiAgcHVibGljIHNldE91dHB1dE5hbWUodmFsdWU6IGFueSkge1xuICAgIHRoaXMuX291dHB1dE5hbWUgPSB2YWx1ZTtcbiAgfVxuXG4gIHB1YmxpYyBnZXQgcG9zaXRpb25JbmRlcGVuZGVudENvZGUoKSB7XG4gICAgcmV0dXJuIHRoaXMuX3Bvc2l0aW9uSW5kZXBlbmRlbnRDb2RlO1xuICB9XG5cbiAgcHVibGljIHNldFBvc2l0aW9uSW5kZXBlbmRlbnRDb2RlKHZhbHVlOiBib29sZWFuKSB7XG4gICAgdGhpcy5fcG9zaXRpb25JbmRlcGVuZGVudENvZGUgPSB2YWx1ZTtcbiAgfVxuXG4gIHB1YmxpYyBwb3N0VXBkYXRlKHRhcmdldDogUG9zdFRhcmdldCkge1xuICAgIHN1cGVyLnBvc3RVcGRhdGUodGFyZ2V0KTtcblxuICAgIGlmICh0YXJnZXQucHJlZml4ICE9PSB1bmRlZmluZWQpXG4gICAgICB0aGlzLl9wcmVmaXggPSB0YXJnZXQucHJlZml4O1xuICAgIGlmICh0YXJnZXQuc3VmZml4ICE9PSB1bmRlZmluZWQpXG4gICAgICB0aGlzLl9zdWZmaXggPSB0YXJnZXQuc3VmZml4O1xuICAgIGlmICh0YXJnZXQub3V0cHV0TmFtZSAhPT0gdW5kZWZpbmVkKVxuICAgICAgdGhpcy5fb3V0cHV0TmFtZSA9IHRhcmdldC5vdXRwdXROYW1lO1xuICAgIGlmICh0YXJnZXQucG9zaXRpb25JbmRlcGVuZGVudENvZGUgIT09IHVuZGVmaW5lZClcbiAgICAgIHRoaXMuX3Bvc2l0aW9uSW5kZXBlbmRlbnRDb2RlID0gdGFyZ2V0LnBvc2l0aW9uSW5kZXBlbmRlbnRDb2RlO1xuICB9XG5cbiAgcHJvdGVjdGVkIHB1dEZyb21KU09OKGpzb246IGFueSkge1xuICAgIHN1cGVyLnB1dEZyb21KU09OKGpzb24pO1xuXG4gICAgdGhpcy5fcHJlZml4ID0ganNvbi5wcmVmaXg7XG4gICAgdGhpcy5fb3V0cHV0TmFtZSA9IGpzb24ub3V0cHV0TmFtZTtcbiAgICB0aGlzLl9zdWZmaXggPSBqc29uLnN1ZmZpeDtcbiAgICB0aGlzLl9wb3NpdGlvbkluZGVwZW5kZW50Q29kZSA9IGpzb24ucG9zaXRpb25JbmRlcGVuZGVudENvZGU7XG4gIH1cblxuICBwcm90ZWN0ZWQgY29weVRvSlNPTihqc29uOiBhbnkpIHtcbiAgICBzdXBlci5jb3B5VG9KU09OKGpzb24pO1xuXG4gICAganNvbi5zb3VyY2VEaXIgPSB0aGlzLl9zb3VyY2VEaXIudG9VUkxTdHJpbmcoKTtcbiAgICBqc29uLmJpbmFyeURpciA9IHRoaXMuX2JpbmFyeURpci50b1VSTFN0cmluZygpO1xuICAgIGpzb24ucHJlZml4ID0gdGhpcy5fcHJlZml4O1xuICAgIGpzb24uc3VmZml4ID0gdGhpcy5fc3VmZml4O1xuICAgIGpzb24ub3V0cHV0TmFtZSA9IHRoaXMuX291dHB1dE5hbWU7XG4gICAganNvbi5wb3NpdGlvbkluZGVwZW5kZW50Q29kZSA9IHRoaXMuX3Bvc2l0aW9uSW5kZXBlbmRlbnRDb2RlO1xuXG4gICAgcmV0dXJuIGpzb247XG4gIH1cbn07XG5cbmV4cG9ydCBjbGFzcyBPYmplY3RMaWJyYXJ5IGV4dGVuZHMgTWFpblRhcmdldCB7XG4gIHB1YmxpYyBjb25zdHJ1Y3RvcihuYW1lOiBzdHJpbmcsIHNvdXJjZURpcjogQWJzb2x1dGVQYXRoLCBiaW5hcnlEaXI6IEFic29sdXRlUGF0aCkge1xuICAgIHN1cGVyKG5hbWUsIHNvdXJjZURpciwgYmluYXJ5RGlyKTtcbiAgfVxuXG4gIHB1YmxpYyBnZXQgaXNPYmplY3RMaWJyYXJ5KCk6IGJvb2xlYW4ge1xuICAgIHJldHVybiB0cnVlO1xuICB9XG5cbiAgcHVibGljIHN0YXRpYyBmcm9tSlNPTihqc29uOiBhbnkpOiBPYmplY3RMaWJyYXJ5IHtcbiAgICBjb25zdCB0YXJnZXQgPSBuZXcgT2JqZWN0TGlicmFyeShqc29uLm5hbWUsIEFic29sdXRlUGF0aC5jcmVhdGUoanNvbi5zb3VyY2VEaXIpLCBBYnNvbHV0ZVBhdGguY3JlYXRlKGpzb24uYmluYXJ5RGlyKSk7XG4gICAgdGFyZ2V0LnB1dEZyb21KU09OKGpzb24pO1xuICAgIHJldHVybiB0YXJnZXQ7XG4gIH1cblxuICBwdWJsaWMgdG9KU09OKCk6IFNpbXBsZU9iamVjdCB7XG4gICAgY29uc3QgcmVzdWx0OiBTaW1wbGVPYmplY3QgPSB7XG4gICAgICB0eXBlOiBPYmplY3RMaWJyYXJ5Lm5hbWUsXG4gICAgfTtcbiAgICBzdXBlci5jb3B5VG9KU09OKHJlc3VsdCk7XG4gICAgcmV0dXJuIHJlc3VsdDtcbiAgfVxufTtcblxuZXhwb3J0IGNsYXNzIFN0YXRpY0xpYnJhcnkgZXh0ZW5kcyBNYWluVGFyZ2V0IHtcbiAgcHVibGljIGNvbnN0cnVjdG9yKG5hbWU6IHN0cmluZywgc291cmNlRGlyOiBBYnNvbHV0ZVBhdGgsIGJpbmFyeURpcjogQWJzb2x1dGVQYXRoKSB7XG4gICAgc3VwZXIobmFtZSwgc291cmNlRGlyLCBiaW5hcnlEaXIpO1xuICB9XG5cbiAgcHVibGljIGdldCBpc1N0YXRpY0xpYnJhcnkoKTogYm9vbGVhbiB7XG4gICAgcmV0dXJuIHRydWU7XG4gIH1cblxuICBwdWJsaWMgc3RhdGljIGZyb21KU09OKGpzb246IGFueSk6IFN0YXRpY0xpYnJhcnkge1xuICAgIGNvbnN0IHRhcmdldCA9IG5ldyBTdGF0aWNMaWJyYXJ5KGpzb24ubmFtZSwgQWJzb2x1dGVQYXRoLmNyZWF0ZShqc29uLnNvdXJjZURpciksIEFic29sdXRlUGF0aC5jcmVhdGUoanNvbi5iaW5hcnlEaXIpKTtcbiAgICB0YXJnZXQucHV0RnJvbUpTT04oanNvbik7XG4gICAgcmV0dXJuIHRhcmdldDtcbiAgfVxuXG4gIHB1YmxpYyB0b0pTT04oKTogU2ltcGxlT2JqZWN0IHtcbiAgICBjb25zdCByZXN1bHQ6IFNpbXBsZU9iamVjdCA9IHtcbiAgICAgIHR5cGU6IFN0YXRpY0xpYnJhcnkubmFtZSxcbiAgICB9O1xuICAgIHN1cGVyLmNvcHlUb0pTT04ocmVzdWx0KTtcbiAgICByZXR1cm4gcmVzdWx0O1xuICB9XG59O1xuXG5leHBvcnQgY2xhc3MgU2hhcmVkTGlicmFyeSBleHRlbmRzIE1haW5UYXJnZXQge1xuICBwdWJsaWMgY29uc3RydWN0b3IobmFtZTogc3RyaW5nLCBzb3VyY2VEaXI6IEFic29sdXRlUGF0aCwgYmluYXJ5RGlyOiBBYnNvbHV0ZVBhdGgpIHtcbiAgICBzdXBlcihuYW1lLCBzb3VyY2VEaXIsIGJpbmFyeURpcik7XG4gIH1cblxuICBwdWJsaWMgZ2V0IGlzU2hhcmVkTGlicmFyeSgpOiBib29sZWFuIHtcbiAgICByZXR1cm4gdHJ1ZTtcbiAgfVxuXG4gIHB1YmxpYyBzdGF0aWMgZnJvbUpTT04oanNvbjogYW55KTogU2hhcmVkTGlicmFyeSB7XG4gICAgY29uc3QgdGFyZ2V0ID0gbmV3IFNoYXJlZExpYnJhcnkoanNvbi5uYW1lLCBBYnNvbHV0ZVBhdGguY3JlYXRlKGpzb24uc291cmNlRGlyKSwgQWJzb2x1dGVQYXRoLmNyZWF0ZShqc29uLmJpbmFyeURpcikpO1xuICAgIHRhcmdldC5wdXRGcm9tSlNPTihqc29uKTtcbiAgICByZXR1cm4gdGFyZ2V0O1xuICB9XG5cbiAgcHVibGljIHRvSlNPTigpOiBTaW1wbGVPYmplY3Qge1xuICAgIGNvbnN0IHJlc3VsdDogU2ltcGxlT2JqZWN0ID0ge1xuICAgICAgdHlwZTogU2hhcmVkTGlicmFyeS5uYW1lLFxuICAgIH07XG4gICAgc3VwZXIuY29weVRvSlNPTihyZXN1bHQpO1xuICAgIHJldHVybiByZXN1bHQ7XG4gIH1cbn07XG5cbmV4cG9ydCBjbGFzcyBFeGVjdXRhYmxlIGV4dGVuZHMgTWFpblRhcmdldCB7XG4gIHB1YmxpYyBjb25zdHJ1Y3RvcihuYW1lOiBzdHJpbmcsIHNvdXJjZURpcjogQWJzb2x1dGVQYXRoLCBiaW5hcnlEaXI6IEFic29sdXRlUGF0aCkge1xuICAgIHN1cGVyKG5hbWUsIHNvdXJjZURpciwgYmluYXJ5RGlyKTtcbiAgfVxuXG4gIHB1YmxpYyBnZXQgaXNFeGVjdXRhYmxlKCk6IGJvb2xlYW4ge1xuICAgIHJldHVybiB0cnVlO1xuICB9XG5cbiAgcHVibGljIHN0YXRpYyBmcm9tSlNPTihqc29uOiBhbnkpOiBFeGVjdXRhYmxlIHtcbiAgICBjb25zdCB0YXJnZXQgPSBuZXcgRXhlY3V0YWJsZShqc29uLm5hbWUsIEFic29sdXRlUGF0aC5jcmVhdGUoanNvbi5zb3VyY2VEaXIpLCBBYnNvbHV0ZVBhdGguY3JlYXRlKGpzb24uYmluYXJ5RGlyKSk7XG4gICAgdGFyZ2V0LnB1dEZyb21KU09OKGpzb24pO1xuICAgIHJldHVybiB0YXJnZXQ7XG4gIH1cblxuICBwdWJsaWMgdG9KU09OKCk6IFNpbXBsZU9iamVjdCB7XG4gICAgY29uc3QgcmVzdWx0OiBTaW1wbGVPYmplY3QgPSB7XG4gICAgICB0eXBlOiBFeGVjdXRhYmxlLm5hbWUsXG4gICAgfTtcbiAgICBzdXBlci5jb3B5VG9KU09OKHJlc3VsdCk7XG4gICAgcmV0dXJuIHJlc3VsdDtcbiAgfVxufTtcbiIsIi8qXG4gKiBNSVQgTGljZW5zZVxuICpcbiAqIENvcHlyaWdodCAoYykgMjAyNSAgWXVyaWkgWWFrdWJpbiAoeXVyaWkueWFrdWJpbkBnbWFpbC5jb20pXG4gKlxuICogUGVybWlzc2lvbiBpcyBncmFudGVkIHRvIHVzZSwgY29weSwgbW9kaWZ5LCBhbmQgZGlzdHJpYnV0ZSB0aGlzIHNvZnR3YXJlXG4gKiB1bmRlciB0aGUgTUlUIExpY2Vuc2UuIFNlZSBMSUNFTlNFIGZpbGUgZm9yIGRldGFpbHMuXG4gKi9cblxuaW1wb3J0IHsgVGFyZ2V0SW5jbHVkZXMgfWZyb20gXCJAL2NvcmUvVGFyZ2V0SW5jbHVkZXNcIjtcbmltcG9ydCB7IFRhcmdldE5hbWUgfWZyb20gXCJAL2NvcmUvVGFyZ2V0TmFtZVwiO1xuaW1wb3J0IHsgTWFpblRhcmdldCB9IGZyb20gXCJAL2NvcmUvVGFyZ2V0XCI7XG5pbXBvcnQgeyBBYnNvbHV0ZVBhdGggfSBmcm9tIFwiQC9jb3JlL0Fic29sdXRlUGF0aFwiO1xuaW1wb3J0IHsgU2ltcGxlT2JqZWN0IH0gZnJvbSBcIkAvY29yZS9TaW1wbGVPYmplY3RcIjtcblxuY29uc3QgRU5UUklFUyA9IFN5bWJvbChcIkVOVFJJRVNcIik7XG5cbmV4cG9ydCBjbGFzcyBUYXJnZXRDb2xsZWN0aW9uIHtcbiAgcHJpdmF0ZSBbRU5UUklFU10gPSBuZXcgTWFwPHN0cmluZywgTWFpblRhcmdldD47XG5cbiAgcHVibGljIHN0YXRpYyBjcmVhdGUoKSB7XG4gICAgcmV0dXJuIE9iamVjdC5zZWFsKG5ldyBUYXJnZXRDb2xsZWN0aW9uKTtcbiAgfVxuICBcbiAgcHVibGljIGdldCBFTlRSSUVTKCkge1xuICAgIHJldHVybiB0aGlzW0VOVFJJRVNdO1xuICB9XG5cbiAgcHVibGljIHRvSlNPTigpOiBTaW1wbGVPYmplY3Qge1xuICAgIGNvbnN0IHJlc3VsdDogU2ltcGxlT2JqZWN0ID0geyB0eXBlOiBUYXJnZXRDb2xsZWN0aW9uLm5hbWUgfTtcbiAgICB0aGlzW0VOVFJJRVNdLmZvckVhY2goKHYsIGspID0+IHZvaWQgKHJlc3VsdFtrXSA9IHYpKTtcbiAgICByZXR1cm4gcmVzdWx0O1xuICB9XG5cbiAgcHVibGljIGdldChuYW1lOiBzdHJpbmcpOiBNYWluVGFyZ2V0IHtcbiAgICBjb25zdCByZXN1bHQgPSB0aGlzW0VOVFJJRVNdLmdldChuYW1lKTtcbiAgICBpZiAoIXJlc3VsdClcbiAgICAgIHRocm93IGBUYXJnZXQgXCIke25hbWV9XCIgZG9lcyBub3QgZXhpc3RgO1xuICAgIHJldHVybiByZXN1bHQ7XG4gIH1cblxuICBwdWJsaWMgc2V0KG5hbWU6IHN0cmluZywgdGFyZ2V0OiBhbnkpIHtcbiAgICBpZiAodGhpc1tFTlRSSUVTXS5oYXMobmFtZSkpXG4gICAgICB0aHJvdyBuZXcgRXJyb3IoYFRhcmdldCBcIiR7bmFtZX1cIiBleGlzdHNgKTtcbiAgICB0aGlzW0VOVFJJRVNdLnNldChuYW1lLCB0YXJnZXQpO1xuICB9XG5cbiAgcHJpdmF0ZSBfX2dldEFsbEluY2x1ZGVzKGluY2x1ZGVzOiBzdHJpbmdbXSwgdGFyZ2V0U2V0OiBTZXQ8c3RyaW5nPiwgbGlzdDogQXJyYXk8QWJzb2x1dGVQYXRoIHwgVGFyZ2V0SW5jbHVkZXM+IHwgQXJyYXk8VGFyZ2V0TmFtZT4pIHtcbiAgICBmb3IgKGNvbnN0IGl0ZXIgb2YgbGlzdCkge1xuICAgICAgaWYgKGl0ZXIgaW5zdGFuY2VvZiBUYXJnZXRJbmNsdWRlcyB8fCBpdGVyIGluc3RhbmNlb2YgVGFyZ2V0TmFtZSkge1xuICAgICAgICBpZiAoIXRhcmdldFNldC5oYXMoaXRlci50YXJnZXROYW1lKSkge1xuICAgICAgICAgIHRhcmdldFNldC5hZGQoaXRlci50YXJnZXROYW1lKTtcbiAgICAgICAgICBjb25zdCB0YXJnZXQgPSB0aGlzLmdldChpdGVyLnRhcmdldE5hbWUpO1xuICAgICAgICAgIHRoaXMuX19nZXRBbGxJbmNsdWRlcyhpbmNsdWRlcywgdGFyZ2V0U2V0LCB0YXJnZXQuZ2V0UHVibGljSW5jbHVkZXMoKSk7XG4gICAgICAgICAgdGhpcy5fX2dldEFsbEluY2x1ZGVzKGluY2x1ZGVzLCB0YXJnZXRTZXQsIHRhcmdldC5nZXRQdWJsaWNMaWJyYXJpZXMoKSk7XG4gICAgICAgIH1cbiAgICAgIH1cbiAgICAgIGVsc2UgaWYgKGl0ZXIgaW5zdGFuY2VvZiBBYnNvbHV0ZVBhdGgpIHtcbiAgICAgICAgaWYgKCFpbmNsdWRlcy5pbmNsdWRlcyhpdGVyLnRvU3RyaW5nKCkpKVxuICAgICAgICAgIGluY2x1ZGVzLnB1c2goaXRlci50b1N0cmluZygpKTtcbiAgICAgIH1cbiAgICAgIGVsc2Uge1xuICAgICAgICB0aHJvdyBuZXcgRXJyb3IoYE5vdCBzdXBwb3J0IGluc3RhbmNlICR7aXRlcn1gKTtcbiAgICAgIH1cbiAgICB9XG4gIH1cblxuICBwdWJsaWMgYWxsSW5jbHVkZXNPZihwYXJhbXM6IHN0cmluZyB8IE1haW5UYXJnZXQpOiBzdHJpbmdbXSB7XG4gICAgY29uc3QgdGFyZ2V0ID0gKHR5cGVvZiBwYXJhbXMgPT09IFwic3RyaW5nXCIpID8gdGhpcy5nZXQocGFyYW1zKSA6IHBhcmFtcztcbiAgICBjb25zdCBpbmNsdWRlczogc3RyaW5nW10gPSBbXTtcbiAgICBjb25zdCB0YXJnZXRTZXQgPSBuZXcgU2V0KFsgdGFyZ2V0LnRhcmdldE5hbWUgXSk7XG4gICAgdGhpcy5fX2dldEFsbEluY2x1ZGVzKGluY2x1ZGVzLCB0YXJnZXRTZXQsIHRhcmdldC5nZXRJbmNsdWRlcygpKTtcbiAgICB0aGlzLl9fZ2V0QWxsSW5jbHVkZXMoaW5jbHVkZXMsIHRhcmdldFNldCwgdGFyZ2V0LmdldExpYnJhcmllcygpKTtcbiAgICByZXR1cm4gaW5jbHVkZXM7XG4gIH1cblxuICBwcml2YXRlIF9fZ2V0QWxsSGVhZGVycyhoZWFkZXJzOiBzdHJpbmdbXSwgdGFyZ2V0U2V0OiBTZXQ8c3RyaW5nPiwgbGlzdDogQXJyYXk8QWJzb2x1dGVQYXRoIHwgVGFyZ2V0SW5jbHVkZXM+IHwgQXJyYXk8VGFyZ2V0TmFtZT4pIHtcbiAgICBmb3IgKGNvbnN0IGl0ZXIgb2YgbGlzdCkge1xuICAgICAgaWYgKGl0ZXIgaW5zdGFuY2VvZiBUYXJnZXRJbmNsdWRlcyB8fCBpdGVyIGluc3RhbmNlb2YgVGFyZ2V0TmFtZSkge1xuICAgICAgICBpZiAoIXRhcmdldFNldC5oYXMoaXRlci50YXJnZXROYW1lKSkge1xuICAgICAgICAgIHRhcmdldFNldC5hZGQoaXRlci50YXJnZXROYW1lKTtcbiAgICAgICAgICBjb25zdCB0YXJnZXQgPSB0aGlzLmdldChpdGVyLnRhcmdldE5hbWUpO1xuICAgICAgICAgIGZvciAoY29uc3QgaGVhZGVyIG9mIHRhcmdldC5nZXRIZWFkZXJzKCkubWFwKChpOiBhbnkpID0+IGkuRklMRS50b1N0cmluZygpKSkge1xuICAgICAgICAgICAgaWYgKCFoZWFkZXJzLmluY2x1ZGVzKGhlYWRlci50b1N0cmluZygpKSlcbiAgICAgICAgICAgICAgaGVhZGVycy5wdXNoKGhlYWRlci50b1N0cmluZygpKTtcbiAgICAgICAgICB9XG4gICAgICAgICAgdGhpcy5fX2dldEFsbEhlYWRlcnMoaGVhZGVycywgdGFyZ2V0U2V0LCB0YXJnZXQuZ2V0UHVibGljSW5jbHVkZXMoKSk7XG4gICAgICAgICAgdGhpcy5fX2dldEFsbEhlYWRlcnMoaGVhZGVycywgdGFyZ2V0U2V0LCB0YXJnZXQuZ2V0UHVibGljTGlicmFyaWVzKCkpO1xuICAgICAgICB9XG4gICAgICB9XG4gICAgfVxuICB9XG5cbiAgcHVibGljIGFsbEhlYWRlcnNPZihwYXJhbXM6IHN0cmluZyB8IE1haW5UYXJnZXQpIHtcbiAgICBjb25zdCB0YXJnZXQgPSAodHlwZW9mIHBhcmFtcyA9PT0gXCJzdHJpbmdcIikgPyB0aGlzLmdldChwYXJhbXMpIDogcGFyYW1zO1xuICAgIGNvbnN0IGhlYWRlcnMgPSB0YXJnZXQuZ2V0SGVhZGVycygpLm1hcCgoaTogYW55KSA9PiBpLkZJTEUudG9TdHJpbmcoKSk7XG4gICAgY29uc3QgdGFyZ2V0U2V0ID0gbmV3IFNldChbIHRhcmdldC50YXJnZXROYW1lIF0pO1xuICAgIHRoaXMuX19nZXRBbGxIZWFkZXJzKGhlYWRlcnMsIHRhcmdldFNldCwgdGFyZ2V0LmdldEluY2x1ZGVzKCkpO1xuICAgIHRoaXMuX19nZXRBbGxIZWFkZXJzKGhlYWRlcnMsIHRhcmdldFNldCwgdGFyZ2V0LmdldExpYnJhcmllcygpKTtcbiAgICByZXR1cm4gaGVhZGVycztcbiAgfVxuXG4gIHByaXZhdGUgX19nZXRBbGxMaWJyYXJpZXMobGlicmFyaWVzOiBzdHJpbmdbXSwgdGFyZ2V0U2V0OiBTZXQ8c3RyaW5nPiwgbGlzdDogQXJyYXk8VGFyZ2V0TmFtZT4pIHtcbiAgICBmb3IgKGNvbnN0IGl0ZXIgb2YgbGlzdCkge1xuICAgICAgY29uc29sZS5hc3NlcnQoaXRlciBpbnN0YW5jZW9mIFRhcmdldE5hbWUpO1xuICAgICAgaWYgKCF0YXJnZXRTZXQuaGFzKGl0ZXIudGFyZ2V0TmFtZSkpIHtcbiAgICAgICAgdGFyZ2V0U2V0LmFkZChpdGVyLnRhcmdldE5hbWUpO1xuICAgICAgICBjb25zdCB0YXJnZXQgPSB0aGlzLmdldChpdGVyLnRhcmdldE5hbWUpO1xuICAgICAgICBsaWJyYXJpZXMucHVzaCh0YXJnZXQuZ2V0RmlsZSgpLnRvU3RyaW5nKCkpO1xuICAgICAgICB0aGlzLl9fZ2V0QWxsTGlicmFyaWVzKGxpYnJhcmllcywgdGFyZ2V0U2V0LCB0YXJnZXQuZ2V0UHVibGljTGlicmFyaWVzKCkpO1xuICAgICAgfVxuICAgIH1cbiAgfVxuXG4gIHB1YmxpYyBhbGxMaWJyYXJpZXNPZihwYXJhbXM6IHN0cmluZyB8IE1haW5UYXJnZXQpIHtcbiAgICBjb25zdCB0YXJnZXQgPSAodHlwZW9mIHBhcmFtcyA9PT0gXCJzdHJpbmdcIikgPyB0aGlzLmdldChwYXJhbXMpIDogcGFyYW1zO1xuICAgIGNvbnN0IGxpYnJhcmllczogc3RyaW5nW10gPSBbXTtcbiAgICBjb25zdCB0YXJnZXRTZXQgPSBuZXcgU2V0KFsgdGFyZ2V0LnRhcmdldE5hbWUgXSk7XG4gICAgdGhpcy5fX2dldEFsbExpYnJhcmllcyhsaWJyYXJpZXMsIHRhcmdldFNldCwgdGFyZ2V0LmdldExpYnJhcmllcygpKTtcbiAgICByZXR1cm4gbGlicmFyaWVzO1xuICB9XG5cbiAgcHJpdmF0ZSBfX2dldEFsbERlZmluaXRpb25zKGRlZmluaXRpb25zOiBzdHJpbmdbXSwgdGFyZ2V0U2V0OiBTZXQ8c3RyaW5nPiwgbGlzdDogQXJyYXk8c3RyaW5nPiB8IEFycmF5PFRhcmdldE5hbWU+KSB7XG4gICAgZm9yIChjb25zdCBpdGVyIG9mIGxpc3QpIHtcbiAgICAgIGlmIChpdGVyIGluc3RhbmNlb2YgVGFyZ2V0TmFtZSkge1xuICAgICAgICBpZiAoIXRhcmdldFNldC5oYXMoaXRlci50YXJnZXROYW1lKSkge1xuICAgICAgICAgIHRhcmdldFNldC5hZGQoaXRlci50YXJnZXROYW1lKTtcbiAgICAgICAgICBjb25zdCB0YXJnZXQgPSB0aGlzLmdldChpdGVyLnRhcmdldE5hbWUpO1xuICAgICAgICAgIHRoaXMuX19nZXRBbGxEZWZpbml0aW9ucyhkZWZpbml0aW9ucywgdGFyZ2V0U2V0LCB0YXJnZXQuZ2V0UHVibGljRGVmaW5pdGlvbnMoKSk7XG4gICAgICAgICAgdGhpcy5fX2dldEFsbERlZmluaXRpb25zKGRlZmluaXRpb25zLCB0YXJnZXRTZXQsIHRhcmdldC5nZXRQdWJsaWNMaWJyYXJpZXMoKSk7XG4gICAgICAgIH1cbiAgICAgIH1cbiAgICAgIGVsc2UgaWYgKHR5cGVvZiBpdGVyID09PSBcInN0cmluZ1wiKSB7XG4gICAgICAgIGlmICghZGVmaW5pdGlvbnMuaW5jbHVkZXMoaXRlcikpXG4gICAgICAgICAgZGVmaW5pdGlvbnMucHVzaChpdGVyKTtcbiAgICAgIH1cbiAgICAgIGVsc2Uge1xuICAgICAgICB0aHJvdyBuZXcgRXJyb3IoYE5vdCBzdXBwb3J0IGluc3RhbmNlICR7aXRlcn1gKTtcbiAgICAgIH1cbiAgICB9XG4gIH1cblxuICBwdWJsaWMgYWxsRGVmaW5pdGlvbnNPZihwYXJhbXM6IHN0cmluZyB8IE1haW5UYXJnZXQpIHtcbiAgICBjb25zdCB0YXJnZXQgPSAodHlwZW9mIHBhcmFtcyA9PT0gXCJzdHJpbmdcIikgPyB0aGlzLmdldChwYXJhbXMpIDogcGFyYW1zO1xuICAgIGNvbnN0IGRlZmluaXRpb25zOiBzdHJpbmdbXSA9IFtdO1xuICAgIGNvbnN0IHRhcmdldFNldCA9IG5ldyBTZXQoWyB0YXJnZXQudGFyZ2V0TmFtZSBdKTtcbiAgICB0aGlzLl9fZ2V0QWxsRGVmaW5pdGlvbnMoZGVmaW5pdGlvbnMsIHRhcmdldFNldCwgdGFyZ2V0LmdldERlZmluaXRpb25zKCkpO1xuICAgIHRoaXMuX19nZXRBbGxEZWZpbml0aW9ucyhkZWZpbml0aW9ucywgdGFyZ2V0U2V0LCB0YXJnZXQuZ2V0UHVibGljTGlicmFyaWVzKCkpO1xuICAgIHJldHVybiBkZWZpbml0aW9ucztcbiAgfVxuXG4gIHByaXZhdGUgX19nZXRBbGxDb21waWxlT3B0aW9ucyhvcHRpb25zOiBBcnJheTxzdHJpbmd8c3RyaW5nW10+LCB0YXJnZXRTZXQ6IFNldDxzdHJpbmc+LCBsaXN0OiBBcnJheTxzdHJpbmd8c3RyaW5nW10+IHwgQXJyYXk8VGFyZ2V0TmFtZT4pIHtcbiAgICBmb3IgKGNvbnN0IGl0ZXIgb2YgbGlzdCkge1xuICAgICAgaWYgKGl0ZXIgaW5zdGFuY2VvZiBUYXJnZXROYW1lKSB7XG4gICAgICAgIGlmICghdGFyZ2V0U2V0LmhhcyhpdGVyLnRhcmdldE5hbWUpKSB7XG4gICAgICAgICAgdGFyZ2V0U2V0LmFkZChpdGVyLnRhcmdldE5hbWUpO1xuICAgICAgICAgIGNvbnN0IHRhcmdldCA9IHRoaXMuZ2V0KGl0ZXIudGFyZ2V0TmFtZSk7XG4gICAgICAgICAgdGhpcy5fX2dldEFsbENvbXBpbGVPcHRpb25zKG9wdGlvbnMsIHRhcmdldFNldCwgdGFyZ2V0LmdldFB1YmxpY0NvbXBpbGVPcHRpb25zKCkpO1xuICAgICAgICAgIHRoaXMuX19nZXRBbGxDb21waWxlT3B0aW9ucyhvcHRpb25zLCB0YXJnZXRTZXQsIHRhcmdldC5nZXRQdWJsaWNMaWJyYXJpZXMoKSk7XG4gICAgICAgIH1cbiAgICAgIH1cbiAgICAgIGVsc2UgaWYgKHR5cGVvZiBpdGVyID09PSBcInN0cmluZ1wiKSB7XG4gICAgICAgIGlmICghb3B0aW9ucy5pbmNsdWRlcyhpdGVyKSlcbiAgICAgICAgICBvcHRpb25zLnB1c2goaXRlcik7XG4gICAgICB9XG4gICAgICBlbHNlIGlmIChBcnJheS5pc0FycmF5KGl0ZXIpKSB7XG4gICAgICAgIC8vIFRPRE86IEFkZCBjb21wYXJlIGZvciBzYW1lIGFycmF5IGluIG9wdGlvbnNcbiAgICAgICAgb3B0aW9ucy5wdXNoKGl0ZXIpO1xuICAgICAgfVxuICAgICAgZWxzZSB7XG4gICAgICAgIHRocm93IG5ldyBFcnJvcihgTm90IHN1cHBvcnQgaW5zdGFuY2UgJHtpdGVyfWApO1xuICAgICAgfVxuICAgIH1cbiAgfVxuXG4gIHB1YmxpYyBhbGxDb21waWxlT3B0aW9uc09mKHBhcmFtczogc3RyaW5nIHwgTWFpblRhcmdldCkge1xuICAgIGNvbnN0IHRhcmdldCA9ICh0eXBlb2YgcGFyYW1zID09PSBcInN0cmluZ1wiKSA/IHRoaXMuZ2V0KHBhcmFtcykgOiBwYXJhbXM7XG4gICAgY29uc3Qgb3B0aW9uczogc3RyaW5nW10gPSBbXTtcbiAgICBjb25zdCB0YXJnZXRTZXQgPSBuZXcgU2V0KFsgdGFyZ2V0LnRhcmdldE5hbWUgXSk7XG4gICAgdGhpcy5fX2dldEFsbENvbXBpbGVPcHRpb25zKG9wdGlvbnMsIHRhcmdldFNldCwgdGFyZ2V0LmdldENvbXBpbGVPcHRpb25zKCkpO1xuICAgIHRoaXMuX19nZXRBbGxDb21waWxlT3B0aW9ucyhvcHRpb25zLCB0YXJnZXRTZXQsIHRhcmdldC5nZXRQdWJsaWNMaWJyYXJpZXMoKSk7XG4gICAgcmV0dXJuIG9wdGlvbnMuZmxhdCgpO1xuICB9XG5cbiAgcHJpdmF0ZSBfX2dldExpbmtPcHRpb25zKG9wdGlvbnM6IEFycmF5PHN0cmluZ3xzdHJpbmdbXT4sIHRhcmdldFNldDogU2V0PHN0cmluZz4sIGxpc3Q6IEFycmF5PHN0cmluZ3xzdHJpbmdbXT4gfCBBcnJheTxUYXJnZXROYW1lPikge1xuICAgIGZvciAoY29uc3QgaXRlciBvZiBsaXN0KSB7XG4gICAgICBpZiAoaXRlciBpbnN0YW5jZW9mIFRhcmdldE5hbWUpIHtcbiAgICAgICAgaWYgKCF0YXJnZXRTZXQuaGFzKGl0ZXIudGFyZ2V0TmFtZSkpIHtcbiAgICAgICAgICB0YXJnZXRTZXQuYWRkKGl0ZXIudGFyZ2V0TmFtZSk7XG4gICAgICAgICAgY29uc3QgdGFyZ2V0ID0gdGhpcy5nZXQoaXRlci50YXJnZXROYW1lKTtcbiAgICAgICAgICB0aGlzLl9fZ2V0TGlua09wdGlvbnMob3B0aW9ucywgdGFyZ2V0U2V0LCB0YXJnZXQuZ2V0UHVibGljTGlua09wdGlvbnMoKSk7XG4gICAgICAgICAgdGhpcy5fX2dldExpbmtPcHRpb25zKG9wdGlvbnMsIHRhcmdldFNldCwgdGFyZ2V0LmdldFB1YmxpY0xpYnJhcmllcygpKTtcbiAgICAgICAgfVxuICAgICAgfVxuICAgICAgZWxzZSBpZiAodHlwZW9mIGl0ZXIgPT09IFwic3RyaW5nXCIpIHtcbiAgICAgICAgaWYgKCFvcHRpb25zLmluY2x1ZGVzKGl0ZXIpKVxuICAgICAgICAgIG9wdGlvbnMucHVzaChpdGVyKTtcbiAgICAgIH1cbiAgICAgIGVsc2UgaWYgKEFycmF5LmlzQXJyYXkoaXRlcikpIHtcbiAgICAgICAgLy8gVE9ETzogQWRkIGNvbXBhcmUgZm9yIHNhbWUgYXJyYXkgaW4gb3B0aW9uc1xuICAgICAgICBvcHRpb25zLnB1c2goaXRlcik7XG4gICAgICB9XG4gICAgICBlbHNlIHtcbiAgICAgICAgdGhyb3cgbmV3IEVycm9yKGBOb3Qgc3VwcG9ydCBpbnN0YW5jZSAke2l0ZXJ9YCk7XG4gICAgICB9XG4gICAgfVxuICB9XG5cbiAgcHVibGljIGFsbExpbmtPcHRpb25zT2YocGFyYW1zOiBzdHJpbmcgfCBNYWluVGFyZ2V0KSB7XG4gICAgY29uc3QgdGFyZ2V0ID0gKHR5cGVvZiBwYXJhbXMgPT09IFwic3RyaW5nXCIpID8gdGhpcy5nZXQocGFyYW1zKSA6IHBhcmFtcztcbiAgICBjb25zdCBvcHRpb25zOiBzdHJpbmdbXSA9IFtdO1xuICAgIGNvbnN0IHRhcmdldFNldCA9IG5ldyBTZXQoWyB0YXJnZXQudGFyZ2V0TmFtZSBdKTtcbiAgICB0aGlzLl9fZ2V0TGlua09wdGlvbnMob3B0aW9ucywgdGFyZ2V0U2V0LCB0YXJnZXQuZ2V0TGlua09wdGlvbnMoKSk7XG4gICAgdGhpcy5fX2dldExpbmtPcHRpb25zKG9wdGlvbnMsIHRhcmdldFNldCwgdGFyZ2V0LmdldFB1YmxpY0xpYnJhcmllcygpKTtcbiAgICByZXR1cm4gb3B0aW9ucy5mbGF0KCk7XG4gIH1cbn1cbiIsIi8qXG4gKiBNSVQgTGljZW5zZVxuICpcbiAqIENvcHlyaWdodCAoYykgMjAyNSAgWXVyaWkgWWFrdWJpbiAoeXVyaWkueWFrdWJpbkBnbWFpbC5jb20pXG4gKlxuICogUGVybWlzc2lvbiBpcyBncmFudGVkIHRvIHVzZSwgY29weSwgbW9kaWZ5LCBhbmQgZGlzdHJpYnV0ZSB0aGlzIHNvZnR3YXJlXG4gKiB1bmRlciB0aGUgTUlUIExpY2Vuc2UuIFNlZSBMSUNFTlNFIGZpbGUgZm9yIGRldGFpbHMuXG4gKi9cblxuaW1wb3J0IHsgU2ltcGxlT2JqZWN0IH0gZnJvbSBcIkAvY29yZS9TaW1wbGVPYmplY3RcIjtcblxuY29uc3QgTkFNRSA9IFN5bWJvbChcIk5BTUVcIik7XG5cbmV4cG9ydCBjbGFzcyBUYXJnZXRGaWxlIHtcbiAgcHJpdmF0ZSBbTkFNRV06IHN0cmluZztcblxuICBwcml2YXRlIGNvbnN0cnVjdG9yKHRhcmdldE5hbWU6IHN0cmluZykge1xuICAgIHRoaXNbTkFNRV0gPSB0YXJnZXROYW1lO1xuICB9XG5cbiAgcHVibGljIHN0YXRpYyBjcmVhdGUobmFtZTogc3RyaW5nKSB7XG4gICAgcmV0dXJuIE9iamVjdC5zZWFsKG5ldyBUYXJnZXRGaWxlKG5hbWUpKTtcbiAgfVxuXG4gIHB1YmxpYyBzdGF0aWMgZnJvbUpTT04ob2JqZWN0OiBTaW1wbGVPYmplY3QpIHtcbiAgICByZXR1cm4gVGFyZ2V0RmlsZS5jcmVhdGUob2JqZWN0LnRhcmdldE5hbWUgYXMgc3RyaW5nKTtcbiAgfVxuXG4gIHB1YmxpYyBnZXQgdGFyZ2V0TmFtZSgpOiBzdHJpbmcge1xuICAgIHJldHVybiB0aGlzW05BTUVdO1xuICB9XG5cbiAgcHVibGljIHRvU3RyaW5nKCk6IHN0cmluZyB7XG4gICAgcmV0dXJuIFwiJHtcIiArIHRoaXNbTkFNRV0gKyBcIi5maWxlfVwiO1xuICB9XG5cbiAgcHVibGljIHRvSlNPTigpOiBTaW1wbGVPYmplY3Qge1xuICAgIHJldHVybiB7XG4gICAgICB0eXBlOiBUYXJnZXRGaWxlLm5hbWUsXG4gICAgICB0YXJnZXROYW1lOiB0aGlzW05BTUVdLFxuICAgIH1cbiAgfVxufTtcbiIsIi8qXG4gKiBNSVQgTGljZW5zZVxuICpcbiAqIENvcHlyaWdodCAoYykgMjAyNSAgWXVyaWkgWWFrdWJpbiAoeXVyaWkueWFrdWJpbkBnbWFpbC5jb20pXG4gKlxuICogUGVybWlzc2lvbiBpcyBncmFudGVkIHRvIHVzZSwgY29weSwgbW9kaWZ5LCBhbmQgZGlzdHJpYnV0ZSB0aGlzIHNvZnR3YXJlXG4gKiB1bmRlciB0aGUgTUlUIExpY2Vuc2UuIFNlZSBMSUNFTlNFIGZpbGUgZm9yIGRldGFpbHMuXG4gKi9cblxuaW1wb3J0IHsgTG9nZ2VyIH0gZnJvbSBcIkAvbG9nZ2VyXCI7XG5pbXBvcnQgeyBDb21waWxlT3B0aW9uIH0gZnJvbSBcIkAvY29yZS9NYWtlSW50ZXJmYWNlc1wiO1xuaW1wb3J0IHsgQWJzb2x1dGVQYXRoIH0gZnJvbSBcIi4vQWJzb2x1dGVQYXRoXCI7XG5cbmNvbnN0IGxvZ2dlciA9IExvZ2dlci5jcmVhdGUoaW1wb3J0Lm1ldGEudXJsKTtcblxuZXhwb3J0IG5hbWVzcGFjZSBUYXJnZXRIZWxwZXIge1xuXG5mdW5jdGlvbiBjb252ZXJ0VmFsdWVUb0RlZmluaXRpb24odmFsdWU6IGFueSk6IHN0cmluZyB7XG4gIGlmICh2YWx1ZSA9PT0gdW5kZWZpbmVkKVxuICAgIHRocm93IGBEZWZpbml0aW9uIHVuZGVmaW5lZGA7XG4gIGlmICh0eXBlb2YgdmFsdWUgPT09IFwib2JqZWN0XCIpXG4gICAgcmV0dXJuICdcIicgKyBKU09OLnN0cmluZ2lmeSh2YWx1ZSkgKyAnXCInO1xuICByZXR1cm4gdmFsdWUudG9TdHJpbmcoKTtcbn1cblxuZXhwb3J0IGZ1bmN0aW9uIG5vcm1hbGl6ZURlZmluaXRpb25zKGRlZmluaXRpb25zOiBhbnlbXSk6IHN0cmluZ1tdIHtcbiAgY29uc3QgcmVzdWx0ID0gW107XG4gIGZvciAoY29uc3QgaXRlciBvZiBkZWZpbml0aW9ucykge1xuICAgIGlmICh0eXBlb2YgaXRlciA9PT0gXCJzdHJpbmdcIilcbiAgICAgIHJlc3VsdC5wdXNoKGl0ZXIpO1xuICAgIGVsc2UgaWYgKGl0ZXIgJiYgdHlwZW9mIGl0ZXIgPT09IFwib2JqZWN0XCIpIHtcbiAgICAgIGZvciAoY29uc3QgW2tleSwgdmFsXSBvZiBPYmplY3QuZW50cmllcyhpdGVyKSlcbiAgICAgICAgcmVzdWx0LnB1c2goYCR7a2V5fT0ke2NvbnZlcnRWYWx1ZVRvRGVmaW5pdGlvbih2YWwpfWApO1xuICAgIH1cbiAgICBlbHNlXG4gICAgICB0aHJvdyBuZXcgRXJyb3IoYERlZmVuaXRpb24gJHtpdGVyfSBub3Qgc3VwcG9ydGVkYCk7XG4gIH1cbiAgcmV0dXJuIHJlc3VsdDtcbn1cblxuZXhwb3J0IGZ1bmN0aW9uIG5vcm1hbGl6ZUNvbXBpbGVPcHRpb25zKG9wdGlvbnM6IENvbXBpbGVPcHRpb25bXSk6IEFycmF5PHN0cmluZyB8IFtzdHJpbmcsIHN0cmluZ10+IHtcbiAgY29uc3QgcmVzdWx0ID0gbmV3IEFycmF5PHN0cmluZyB8IFtzdHJpbmcsIHN0cmluZ10+O1xuICBmb3IgKGNvbnN0IGl0ZXIgb2Ygb3B0aW9ucykge1xuICAgIGlmICh0eXBlb2YgaXRlciA9PT0gXCJzdHJpbmdcIilcbiAgICAgIHJlc3VsdC5wdXNoKGl0ZXIpO1xuICAgIGVsc2UgaWYgKEFycmF5LmlzQXJyYXkoaXRlcikgJiYgaXRlci5sZW5ndGggPT0gMiAmJiB0eXBlb2YgaXRlclswXSA9PT0gXCJzdHJpbmdcIikge1xuICAgICAgaWYgKHR5cGVvZiBpdGVyWzFdID09PSBcInN0cmluZ1wiKVxuICAgICAgICByZXN1bHQucHVzaChbIGl0ZXJbMF0sIGl0ZXJbMV0gXSk7XG4gICAgICBlbHNlIGlmIChpdGVyWzFdIGluc3RhbmNlb2YgQWJzb2x1dGVQYXRoKVxuICAgICAgICByZXN1bHQucHVzaChbIGl0ZXJbMF0sIGl0ZXJbMV0udG9QYXRoKCkgXSk7XG4gICAgICBlbHNlXG4gICAgICAgIHRocm93IG5ldyBFcnJvcihgQ29tcGlsZU9wdGlvbiAke2l0ZXJ9IG5vdCBzdXBwb3J0ZWRgKTtcbiAgICB9XG4gICAgZWxzZSB7XG4gICAgICB0aHJvdyBuZXcgRXJyb3IoYENvbXBpbGVPcHRpb24gJHtpdGVyfSBub3Qgc3VwcG9ydGVkYCk7XG4gICAgfVxuICB9XG4gIHJldHVybiByZXN1bHQ7XG59XG5cbn0gLy8gbmFtZXNwYWNlIG5hbWVzcGFjZVxuIiwiLypcbiAqIE1JVCBMaWNlbnNlXG4gKlxuICogQ29weXJpZ2h0IChjKSAyMDI1ICBZdXJpaSBZYWt1YmluICh5dXJpaS55YWt1YmluQGdtYWlsLmNvbSlcbiAqXG4gKiBQZXJtaXNzaW9uIGlzIGdyYW50ZWQgdG8gdXNlLCBjb3B5LCBtb2RpZnksIGFuZCBkaXN0cmlidXRlIHRoaXMgc29mdHdhcmVcbiAqIHVuZGVyIHRoZSBNSVQgTGljZW5zZS4gU2VlIExJQ0VOU0UgZmlsZSBmb3IgZGV0YWlscy5cbiAqL1xuXG5pbXBvcnQgeyBTaW1wbGVPYmplY3QgfSBmcm9tIFwiQC9jb3JlL1NpbXBsZU9iamVjdFwiO1xuXG5jb25zdCBOQU1FID0gU3ltYm9sKFwiTkFNRVwiKTtcblxuZXhwb3J0IGNsYXNzIFRhcmdldEluY2x1ZGVzIHtcbiAgcHJpdmF0ZSBbTkFNRV06IHN0cmluZztcblxuICBwcml2YXRlIGNvbnN0cnVjdG9yKG5hbWU6IHN0cmluZykge1xuICAgIHRoaXNbTkFNRV0gPSBuYW1lO1xuICB9XG5cbiAgcHVibGljIHN0YXRpYyBjcmVhdGUobmFtZTogc3RyaW5nKSB7XG4gICAgcmV0dXJuIE9iamVjdC5zZWFsKG5ldyBUYXJnZXRJbmNsdWRlcyhuYW1lKSk7XG4gIH1cblxuICBwdWJsaWMgc3RhdGljIGZyb21KU09OKG9iamVjdDogU2ltcGxlT2JqZWN0KSB7XG4gICAgcmV0dXJuIFRhcmdldEluY2x1ZGVzLmNyZWF0ZShvYmplY3QudGFyZ2V0TmFtZSBhcyBzdHJpbmcpO1xuICB9XG5cbiAgcHVibGljIGdldCB0YXJnZXROYW1lKCk6IHN0cmluZyB7XG4gICAgcmV0dXJuIHRoaXNbTkFNRV07XG4gIH1cblxuICBwdWJsaWMgdG9TdHJpbmcoKTogc3RyaW5nIHtcbiAgICByZXR1cm4gXCIke1wiICsgdGhpc1tOQU1FXSArIFwiLmluY2x1ZGVzfVwiO1xuICB9XG5cbiAgcHVibGljIHRvSlNPTigpOiBTaW1wbGVPYmplY3Qge1xuICAgIHJldHVybiB7XG4gICAgICB0eXBlOiBUYXJnZXRJbmNsdWRlcy5uYW1lLFxuICAgICAgdGFyZ2V0TmFtZTogdGhpc1tOQU1FXSxcbiAgICB9XG4gIH1cblxuICBwdWJsaWMgc3RhdGljIGVuc3VyZUluc3RhbmNlKHZhbHVlOiBhbnkpIHtcbiAgICBpZiAodmFsdWUgaW5zdGFuY2VvZiBUYXJnZXRJbmNsdWRlcylcbiAgICAgIHJldHVybiB2YWx1ZTtcbiAgICB0aHJvdyBuZXcgRXJyb3IoYFRoZSAnJHt2YWx1ZX0nIGlzIG5vdCBhIFRhcmdldEluY2x1ZGVzYCk7XG4gIH1cbn07XG4iLCIvKlxuICogTUlUIExpY2Vuc2VcbiAqXG4gKiBDb3B5cmlnaHQgKGMpIDIwMjUgIFl1cmlpIFlha3ViaW4gKHl1cmlpLnlha3ViaW5AZ21haWwuY29tKVxuICpcbiAqIFBlcm1pc3Npb24gaXMgZ3JhbnRlZCB0byB1c2UsIGNvcHksIG1vZGlmeSwgYW5kIGRpc3RyaWJ1dGUgdGhpcyBzb2Z0d2FyZVxuICogdW5kZXIgdGhlIE1JVCBMaWNlbnNlLiBTZWUgTElDRU5TRSBmaWxlIGZvciBkZXRhaWxzLlxuICovXG5cbmltcG9ydCB7IFNpbXBsZU9iamVjdCB9IGZyb20gXCJAL2NvcmUvU2ltcGxlT2JqZWN0XCI7XG5cbmNvbnN0IE5BTUUgPSBTeW1ib2woXCJOQU1FXCIpO1xuXG5leHBvcnQgY2xhc3MgVGFyZ2V0TmFtZSB7XG4gIHByaXZhdGUgW05BTUVdOiBzdHJpbmc7XG5cbiAgcHJpdmF0ZSBjb25zdHJ1Y3RvcihuYW1lOiBzdHJpbmcpIHtcbiAgICB0aGlzW05BTUVdID0gbmFtZTtcbiAgfVxuXG4gIHB1YmxpYyBzdGF0aWMgY3JlYXRlKG5hbWU6IHN0cmluZykge1xuICAgIHJldHVybiBPYmplY3Quc2VhbChuZXcgVGFyZ2V0TmFtZShuYW1lKSk7XG4gIH1cblxuICBwdWJsaWMgc3RhdGljIGZyb21KU09OKG9iamVjdDogU2ltcGxlT2JqZWN0KSB7XG4gICAgcmV0dXJuIFRhcmdldE5hbWUuY3JlYXRlKG9iamVjdC50YXJnZXROYW1lIGFzIHN0cmluZyk7XG4gIH1cblxuICBwdWJsaWMgZ2V0IHRhcmdldE5hbWUoKTogc3RyaW5nIHtcbiAgICByZXR1cm4gdGhpc1tOQU1FXTtcbiAgfVxuXG4gIHB1YmxpYyB0b1N0cmluZygpOiBzdHJpbmcge1xuICAgIHJldHVybiBcIiR7XCIgKyB0aGlzW05BTUVdICsgXCIubGlua31cIjtcbiAgfVxuXG4gIHB1YmxpYyB0b0pTT04oKTogU2ltcGxlT2JqZWN0IHtcbiAgICByZXR1cm4ge1xuICAgICAgdHlwZTogVGFyZ2V0TmFtZS5uYW1lLFxuICAgICAgdGFyZ2V0TmFtZTogdGhpc1tOQU1FXSxcbiAgICB9XG4gIH1cbn07XG4iLCIvKlxuICogTUlUIExpY2Vuc2VcbiAqXG4gKiBDb3B5cmlnaHQgKGMpIDIwMjUgIFl1cmlpIFlha3ViaW4gKHl1cmlpLnlha3ViaW5AZ21haWwuY29tKVxuICpcbiAqIFBlcm1pc3Npb24gaXMgZ3JhbnRlZCB0byB1c2UsIGNvcHksIG1vZGlmeSwgYW5kIGRpc3RyaWJ1dGUgdGhpcyBzb2Z0d2FyZVxuICogdW5kZXIgdGhlIE1JVCBMaWNlbnNlLiBTZWUgTElDRU5TRSBmaWxlIGZvciBkZXRhaWxzLlxuICovXG5cbmltcG9ydCB7IFNpbXBsZU9iamVjdCB9IGZyb20gXCJAL2NvcmUvU2ltcGxlT2JqZWN0XCI7XG5cbmNvbnN0IE5BTUUgPSBTeW1ib2woXCJOQU1FXCIpO1xuXG5leHBvcnQgY2xhc3MgVGFyZ2V0T2JqZWN0cyB7XG4gIHByaXZhdGUgW05BTUVdOiBzdHJpbmc7XG5cbiAgcHJpdmF0ZSBjb25zdHJ1Y3RvcihuYW1lOiBzdHJpbmcpIHtcbiAgICB0aGlzW05BTUVdID0gbmFtZTtcbiAgfVxuXG4gIHB1YmxpYyBzdGF0aWMgY3JlYXRlKG5hbWU6IHN0cmluZykge1xuICAgIHJldHVybiBPYmplY3Quc2VhbChuZXcgVGFyZ2V0T2JqZWN0cyhuYW1lKSk7XG4gIH1cblxuICBwdWJsaWMgc3RhdGljIGZyb21KU09OKG9iamVjdDogU2ltcGxlT2JqZWN0KSB7XG4gICAgcmV0dXJuIFRhcmdldE9iamVjdHMuY3JlYXRlKG9iamVjdC50YXJnZXROYW1lIGFzIHN0cmluZyk7XG4gIH1cblxuICBwdWJsaWMgc3RhdGljIGVuc3VyZUluc3RhbmNlKHZhbHVlOiBhbnkpOiBUYXJnZXRPYmplY3RzIHtcbiAgICBpZiAodmFsdWUgaW5zdGFuY2VvZiBUYXJnZXRPYmplY3RzKVxuICAgICAgcmV0dXJuIHZhbHVlO1xuICAgIHRocm93IG5ldyBFcnJvcihgVGhlICcke3ZhbHVlfScgaXMgbm90IGEgVGFyZ2V0T2JqZWN0c2ApO1xuICB9XG5cbiAgcHVibGljIGdldCB0YXJnZXROYW1lKCk6IHN0cmluZyB7XG4gICAgcmV0dXJuIHRoaXNbTkFNRV07XG4gIH1cblxuICBwdWJsaWMgdG9TdHJpbmcoKTogc3RyaW5nIHtcbiAgICByZXR1cm4gXCIke1wiICsgdGhpc1tOQU1FXSArIFwiLm9iamVjdHN9XCI7XG4gIH1cblxuICBwdWJsaWMgdG9KU09OKCk6IFNpbXBsZU9iamVjdCB7XG4gICAgcmV0dXJuIHtcbiAgICAgIHR5cGU6IFRhcmdldE9iamVjdHMubmFtZSxcbiAgICAgIHRhcmdldE5hbWU6IHRoaXNbTkFNRV0sXG4gICAgfVxuICB9XG59O1xuIiwiLypcbiAqIE1JVCBMaWNlbnNlXG4gKlxuICogQ29weXJpZ2h0IChjKSAyMDI1ICBZdXJpaSBZYWt1YmluICh5dXJpaS55YWt1YmluQGdtYWlsLmNvbSlcbiAqXG4gKiBQZXJtaXNzaW9uIGlzIGdyYW50ZWQgdG8gdXNlLCBjb3B5LCBtb2RpZnksIGFuZCBkaXN0cmlidXRlIHRoaXMgc29mdHdhcmVcbiAqIHVuZGVyIHRoZSBNSVQgTGljZW5zZS4gU2VlIExJQ0VOU0UgZmlsZSBmb3IgZGV0YWlscy5cbiAqL1xuXG5pbXBvcnQgeyBQcm9qZWN0Q29udGV4dCB9IGZyb20gXCJAL2NvcmUvUHJvamVjdENvbnRleHRcIjtcbmltcG9ydCB7IFZhcmlhYmxlTWFwIH0gZnJvbSBcIkAvY29yZS9TY29wZVwiO1xuaW1wb3J0IHsgR2VuZXJhbENvbnRleHQgfSBmcm9tIFwiQC9jb3JlL0Jhc2VDb250ZXh0XCI7XG5pbXBvcnQgeyBjcmVhdGVDb250ZXh0IH0gZnJvbSBcIkAvY29yZS9CYXNlQ29udGV4dFwiO1xuXG5jb25zdCBHTE9CQUwgPSBTeW1ib2woXCJHTE9CQUxcIik7XG5jb25zdCBTQ09QRSA9IFN5bWJvbChcIlNDT1BFXCIpO1xuXG5leHBvcnQgY2xhc3MgVG9vbGNoYWluQ29udGV4dCBleHRlbmRzIEdlbmVyYWxDb250ZXh0IHtcbiAgW1NDT1BFXTogVmFyaWFibGVNYXA7XG4gIFtHTE9CQUxdOiBQcm9qZWN0Q29udGV4dDtcblxuICBjb25zdHJ1Y3RvcihnbG9iYWw6IFByb2plY3RDb250ZXh0LCBzY29wZTogVmFyaWFibGVNYXApIHtcbiAgICBzdXBlcihzY29wZSk7XG4gICAgdGhpc1tHTE9CQUxdID0gZ2xvYmFsO1xuICAgIHRoaXNbU0NPUEVdID0gc2NvcGU7XG4gIH1cblxuICBwdWJsaWMgc3RhdGljIGNyZWF0ZShnbG9iYWw6IFByb2plY3RDb250ZXh0LCB2YXJpYWJsZU1hcDogVmFyaWFibGVNYXApIHtcbiAgICByZXR1cm4gY3JlYXRlQ29udGV4dChuZXcgVG9vbGNoYWluQ29udGV4dChnbG9iYWwsIHZhcmlhYmxlTWFwKSk7XG4gIH1cbn07XG4iLCIvKlxuICogTUlUIExpY2Vuc2VcbiAqXG4gKiBDb3B5cmlnaHQgKGMpIDIwMjUgIFl1cmlpIFlha3ViaW4gKHl1cmlpLnlha3ViaW5AZ21haWwuY29tKVxuICpcbiAqIFBlcm1pc3Npb24gaXMgZ3JhbnRlZCB0byB1c2UsIGNvcHksIG1vZGlmeSwgYW5kIGRpc3RyaWJ1dGUgdGhpcyBzb2Z0d2FyZVxuICogdW5kZXIgdGhlIE1JVCBMaWNlbnNlLiBTZWUgTElDRU5TRSBmaWxlIGZvciBkZXRhaWxzLlxuICovXG5cbmV4cG9ydCBjb25zdCBERUJVR19CVUlMRF9UWVBFID0gXCJEZWJ1Z1wiO1xuZXhwb3J0IGNvbnN0IFJFTEVBU0VfQlVJTERfVFlQRSA9IFwiUmVsZWFzZVwiO1xuIiwiLypcbiAqIE1JVCBMaWNlbnNlXG4gKlxuICogQ29weXJpZ2h0IChjKSAyMDI1ICBZdXJpaSBZYWt1YmluICh5dXJpaS55YWt1YmluQGdtYWlsLmNvbSlcbiAqXG4gKiBQZXJtaXNzaW9uIGlzIGdyYW50ZWQgdG8gdXNlLCBjb3B5LCBtb2RpZnksIGFuZCBkaXN0cmlidXRlIHRoaXMgc29mdHdhcmVcbiAqIHVuZGVyIHRoZSBNSVQgTGljZW5zZS4gU2VlIExJQ0VOU0UgZmlsZSBmb3IgZGV0YWlscy5cbiAqL1xuXG5pbXBvcnQgeyBJTWFrZUNvbnRleHQsIEludGVyZmFjZVRhcmdldCwgSW50ZXJmYWNlU2NyaXB0IH0gZnJvbSBcIkAvY29yZS9NYWtlSW50ZXJmYWNlc1wiO1xuaW1wb3J0IHsgVmFyaWFudE1hcCwgVmFyaWFibGVNYXAsIFNjb3BlSGVscGVyIH0gZnJvbSBcIkAvY29yZS9TY29wZVwiO1xuaW1wb3J0IHsgU3lzdGVtU2NvcGUgfSBmcm9tIFwiQC9jb3JlL1N5c3RlbVNjb3BlXCI7XG5pbXBvcnQgeyBHZW5lcmFsQ29udGV4dCwgTWFrZUNvbnRleHQsIGNyZWF0ZUNvbnRleHQgfSBmcm9tIFwiQC9jb3JlL0Jhc2VDb250ZXh0XCI7XG5pbXBvcnQgeyBPYmplY3RMaWJyYXJ5LCBTdGF0aWNMaWJyYXJ5LCBTaGFyZWRMaWJyYXJ5LCBFeGVjdXRhYmxlLCBNYWluVGFyZ2V0IH0gZnJvbSBcIkAvY29yZS9UYXJnZXRcIjtcbmltcG9ydCB7IFVzZXJUYXJnZXRTdHJ1Y3QgfSBmcm9tIFwiQC9jb3JlL1VzZXJUYXJnZXRTdHJ1Y3RcIjtcbmltcG9ydCB7IEFMTF9UQVJHRVQsIElOU1RBTExfVEFSR0VUIH0gZnJvbSBcIkAvQ29uc3RhbnRzXCI7XG5pbXBvcnQgeyBDVVNUT01fVkFSSUFCTEVfR1JPVVAgfSBmcm9tIFwiQC9Db25zdGFudHNcIjtcbmltcG9ydCB7IHJhbmRDSWRlbnRpZmVyIH0gZnJvbSBcIkAvdXRpbHMvUmFuZG9tXCI7XG5pbXBvcnQgeyBMb2dnZXIgfSBmcm9tIFwiQC9sb2dnZXJcIjtcbmltcG9ydCB7IEZpbGVQYXRoLCBBYnNvbHV0ZVBhdGggfSBmcm9tIFwiLi9BYnNvbHV0ZVBhdGhcIjtcbmltcG9ydCB7IFRhcmdldE5hbWUgfSBmcm9tIFwiQC9jb3JlL1RhcmdldE5hbWVcIjtcblxuY29uc3QgbG9nZ2VyID0gTG9nZ2VyLmNyZWF0ZShpbXBvcnQubWV0YS51cmwpO1xuXG5jb25zdCBTQ09QRSA9IFN5bWJvbChcIlNDT1BFXCIpO1xuY29uc3QgSU1QTCA9IFN5bWJvbChcIklNUExcIik7XG5jb25zdCBWQVJNQVAgPSBTeW1ib2woXCJWQVJNQVBcIik7XG5cbmZ1bmN0aW9uIGNyZWF0ZVRhcmdldEltcGw8VCBleHRlbmRzIE1haW5UYXJnZXQ+KFRhcmdldEN0b3I6IG5ldyAoLi4uYXJnczogYW55W10pID0+IFQsIGN0eDogTWFrZUNvbnRleHQsIHNjb3BlOiBTeXN0ZW1TY29wZSwgbmFtZTogc3RyaW5nKSB7XG4gIGlmICh0eXBlb2YgbmFtZSAhPT0gXCJzdHJpbmdcIilcbiAgICB0aHJvdyBuZXcgRXJyb3IoYFRhcmdldCBcIiR7bmFtZX1cIiBpcyBub3Qgc3RyaW5nIHR5cGVgKTtcblxuICBpZiAoIW5hbWUpXG4gICAgdGhyb3cgbmV3IEVycm9yKGBBIHRhcmdldCB3aXRoIGFuIGVtcHR5IG5hbWUgY2Fubm90IGV4aXN0YCk7XG5cbiAgaWYgKGN0eC5oYXNNYWluVGFyZ2V0KG5hbWUpKVxuICAgIHRocm93IG5ldyBFcnJvcihgVGFyZ2V0IFwiJHtuYW1lfVwiIGV4aXN0c2ApO1xuXG4gIGlmIChbIEFMTF9UQVJHRVQsIElOU1RBTExfVEFSR0VUIF0uaW5jbHVkZXMobmFtZSkpXG4gICAgdGhyb3cgbmV3IEVycm9yKGBUYXJnZXQgXCIke25hbWV9XCIgaXMgcmVzZXJ2ZWQgbmFtZWApO1xuXG4gIGNvbnN0IHRhcmdldCA9IG5ldyBUYXJnZXRDdG9yKG5hbWUsIHNjb3BlLlNPVVJDRV9ESVIsIHNjb3BlLkJJTkFSWV9ESVIpO1xuICBjdHguYWRkTWFpblRhcmdldChuYW1lLCB0YXJnZXQpO1xuICByZXR1cm4gdGFyZ2V0O1xufVxuXG5leHBvcnQgY2xhc3MgVXNlck1ha2VDb250ZXh0IGV4dGVuZHMgR2VuZXJhbENvbnRleHQgaW1wbGVtZW50cyBJTWFrZUNvbnRleHQge1xuICBwcml2YXRlIFtJTVBMXTogTWFrZUNvbnRleHQ7XG4gIHByaXZhdGUgW1ZBUk1BUF06IFZhcmlhYmxlTWFwO1xuICBwcml2YXRlIFtTQ09QRV06IFN5c3RlbVNjb3BlO1xuXG4gIHB1YmxpYyBjb25zdHJ1Y3RvcihpbXBsOiBNYWtlQ29udGV4dCwgdmFyaWFibGVNYXA6IFZhcmlhYmxlTWFwKSB7XG4gICAgc3VwZXIodmFyaWFibGVNYXApO1xuICAgIHRoaXNbSU1QTF0gPSBpbXBsO1xuICAgIHRoaXNbVkFSTUFQXSA9IHZhcmlhYmxlTWFwO1xuICAgIHRoaXNbU0NPUEVdID0gU2NvcGVIZWxwZXIuY3JlYXRlUHJveHkodmFyaWFibGVNYXApO1xuICB9XG5cbiAgcHVibGljIHN0YXRpYyBjcmVhdGUoaW1wbDogTWFrZUNvbnRleHQsIHZhcmlhYmxlTWFwOiBWYXJpYWJsZU1hcCkge1xuICAgIHJldHVybiBjcmVhdGVDb250ZXh0KG5ldyBVc2VyTWFrZUNvbnRleHQoaW1wbCwgdmFyaWFibGVNYXApKTtcbiAgfVxuXG4gIHB1YmxpYyBnZXRDYWNoZVZhcmlhYmxlcygpIHtcbiAgICByZXR1cm4gU2NvcGVIZWxwZXIuZ2V0VmFyaWFibGVzQnlHcm91cCh0aGlzW1ZBUk1BUF0sIENVU1RPTV9WQVJJQUJMRV9HUk9VUCk7XG4gIH1cblxuICBwdWJsaWMgYWRkQ2FjaGVWYXJpYWJsZXMocGFyYW1zOiBzdHJpbmcgfCBWYXJpYW50TWFwKTogdm9pZCB7XG4gICAgdGhpc1tJTVBMXS5hZGRDYWNoZVZhcmlhYmxlcyh0aGlzW1ZBUk1BUF0sIHBhcmFtcyk7XG4gIH1cblxuICBwdWJsaWMgYWRkSW5jbHVkZURpcmVjdG9yaWVzKC4uLmRpcnM6IGFueVtdKTogYW55IHtcbiAgICBjb25zdCBzb3VyY2VEaXIgPSB0aGlzW1NDT1BFXS5TT1VSQ0VfRElSO1xuICAgIGZvciAoY29uc3QgaXRlciBvZiBkaXJzLmZsYXQoKSkge1xuICAgICAgdGhpc1tTQ09QRV0uSU5DTFVERVMucHVzaChzb3VyY2VEaXIucmVzb2x2ZShpdGVyKSk7XG4gICAgfVxuICB9XG5cbiAgcHVibGljIGFkZFN1YmRpcmVjdG9yeShzb3VyY2VEaXI6IGFueSwgYmluYXJ5RGlyPzogYW55KSB7XG4gICAgdGhpc1tJTVBMXS5hZGRTdWJkaXJlY3RvcnkodGhpc1tWQVJNQVBdLCBzb3VyY2VEaXIsIGJpbmFyeURpcik7XG4gIH1cbiAgXG4gIHB1YmxpYyBhZGRDdXN0b21TY3JpcHQoc2NyaXB0TW9kdWxlOiBzdHJpbmcgfCBBYnNvbHV0ZVBhdGgsIHBhcmFtczogYW55KTogSW50ZXJmYWNlU2NyaXB0IHtcbiAgICBjb25zdCB2YXJpYWJsZU1hcCA9IFNjb3BlSGVscGVyLmNsb25lVmFyaWFibGVNYXAodGhpc1tWQVJNQVBdKTtcbiAgICBTY29wZUhlbHBlci5leHRlbmRWYXJpYWJsZU1hcEJ5VmFsdWVzKHZhcmlhYmxlTWFwLCBDVVNUT01fVkFSSUFCTEVfR1JPVVAsIHBhcmFtcyk7XG4gICAgU2NvcGVIZWxwZXIuc2V0KHZhcmlhYmxlTWFwLCBcIlNDUklQVF9NT0RVTEVcIiwgc2NyaXB0TW9kdWxlKTtcbiAgICBcbiAgICBjb25zdCBzb3VyY2VEaXIgPSBTY29wZUhlbHBlci5nZXQodmFyaWFibGVNYXAsIFwiU09VUkNFX0RJUlwiKSBhcyBBYnNvbHV0ZVBhdGg7XG4gICAgY29uc3QgYmluYXJ5RGlyID0gU2NvcGVIZWxwZXIuZ2V0KHZhcmlhYmxlTWFwLCBcIkJJTkFSWV9ESVJcIikgYXMgQWJzb2x1dGVQYXRoO1xuXG4gICAgbGV0IGlucHV0RmlsZSA9IFNjb3BlSGVscGVyLmdldCh2YXJpYWJsZU1hcCwgXCJTQ1JJUFRfSU5QVVRcIik7XG4gICAgaWYgKGlucHV0RmlsZSlcbiAgICAgIGlucHV0RmlsZSA9IHNvdXJjZURpci5yZXNvbHZlKGlucHV0RmlsZSk7XG5cbiAgICBsZXQgb3V0cHV0RmlsZSA9IFNjb3BlSGVscGVyLmdldCh2YXJpYWJsZU1hcCwgXCJTQ1JJUFRfT1VUUFVUXCIpO1xuICAgIGlmICghb3V0cHV0RmlsZSlcbiAgICAgIHRocm93IG5ldyBFcnJvcihcIkN1c3RvbVNjcmlwdCBwYXJhbWV0ZXJzIHJlcXVpcmVkIG91dHB1dCBlbnRpdHlcIik7XG5cbiAgICBvdXRwdXRGaWxlID0gc291cmNlRGlyLnJlc29sdmUob3V0cHV0RmlsZSk7XG5cbiAgICBjb25zdCBvcHRpb25zID0ge1xuICAgICAgdmFyaWFibGVNYXAsXG4gICAgICBuYW1lOiBTY29wZUhlbHBlci5nZXQodmFyaWFibGVNYXAsIFwiU0NSSVBUX05BTUVcIikgfHwgcmFuZENJZGVudGlmZXIoMTYpLFxuICAgICAgc2NyaXB0TW9kdWxlLFxuICAgICAgb3V0cHV0OiBvdXRwdXRGaWxlLFxuICAgICAgaW5wdXQ6IGlucHV0RmlsZSxcbiAgICAgIHNvdXJjZURpcixcbiAgICAgIGJpbmFyeURpcixcbiAgICB9O1xuXG4gICAgcmV0dXJuIHRoaXNbSU1QTF0uYWRkQ3VzdG9tU2NyaXB0KG9wdGlvbnMpO1xuICB9XG5cbiAgcHVibGljIHRhcmdldChuYW1lOiBzdHJpbmcpOiBVc2VyVGFyZ2V0U3RydWN0IHtcbiAgICByZXR1cm4gVXNlclRhcmdldFN0cnVjdC5jcmVhdGUodGhpc1tJTVBMXS5nZXRQb3N0VGFyZ2V0KG5hbWUpLCB0aGlzW1NDT1BFXSk7XG4gIH1cblxuICBwdWJsaWMgc2NyaXB0KG5hbWU6IHN0cmluZyk6IEludGVyZmFjZVNjcmlwdCB7XG4gICAgcmV0dXJuIHRoaXNbSU1QTF0uc2NyaXB0KG5hbWUpO1xuICB9XG5cbiAgcHVibGljIGluc3RhbGwodmFsdWU6IGFueSwgcGFyYW1zOiBhbnkpOiB2b2lkIHtcbiAgICBmb3IgKGNvbnN0IGl0IG9mIFsgdmFsdWUgXS5mbGF0KCkpIHtcbiAgICAgIGxldCBpdGVyID0gKGl0IGluc3RhbmNlb2YgSW50ZXJmYWNlVGFyZ2V0KSA/IFRhcmdldE5hbWUuY3JlYXRlKGl0LnRhcmdldE5hbWUpIDogaXQ7XG5cbiAgICAgIGxldCBkZXN0aW5hdGlvbjogc3RyaW5nIHwgQWJzb2x1dGVQYXRoIHwgdW5kZWZpbmVkO1xuICAgICAgbGV0IGJhc2VEaXI7XG4gICAgICBpZiAodHlwZW9mIHBhcmFtcyA9PT0gXCJzdHJpbmdcIilcbiAgICAgICAgZGVzdGluYXRpb24gPSBwYXJhbXM7XG4gICAgICBlbHNlIGlmIChwYXJhbXMpIHtcbiAgICAgICAgZGVzdGluYXRpb24gPSBwYXJhbXMuZGVzdGluYXRpb247XG4gICAgICAgIGJhc2VEaXIgPSBwYXJhbXMuYmFzZURpcjtcbiAgICAgIH1cblxuICAgICAgaWYgKCFkZXN0aW5hdGlvbilcbiAgICAgICAgdGhyb3cgbmV3IEVycm9yKGBQYXJhbWV0ZXIgZGVzdGluYXRpb24gaXMgbm90IHNwZWNpZmllZGApO1xuICAgIFxuICAgICAgaWYgKGJhc2VEaXIpXG4gICAgICAgIGJhc2VEaXIgPSB0aGlzW1NDT1BFXS5TT1VSQ0VfRElSLnJlc29sdmUoYmFzZURpcik7XG5cbiAgICAgIGlmICh0eXBlb2YgaXRlciA9PT0gXCJzdHJpbmdcIiB8fCBpdGVyIGluc3RhbmNlb2YgQWJzb2x1dGVQYXRoKSB7XG4gICAgICAgIGl0ZXIgPSB0aGlzW1NDT1BFXS5TT1VSQ0VfRElSLnJlc29sdmUoaXRlci50b1N0cmluZygpKTtcbiAgICAgICAgaXRlciA9IEZpbGVQYXRoLmNyZWF0ZShpdGVyKTtcbiAgICAgICAgYmFzZURpciA9IGJhc2VEaXIgfHwgaXRlci5kaXJuYW1lKCk7XG4gICAgICB9XG4gICAgICBlbHNlIGlmICghKGl0ZXIgaW5zdGFuY2VvZiBUYXJnZXROYW1lKSkge1xuICAgICAgICB0aHJvdyBuZXcgRXJyb3IoYE5vdCBzdXBwb3J0ZXQgdmFsdWUgb2YgJHtpdGVyfWApO1xuICAgICAgfVxuXG4gICAgICB0aGlzW0lNUExdLmFkZEluc3RhbGxFbnRyeShpdGVyLCBBYnNvbHV0ZVBhdGguY3JlYXRlKHRoaXNbU0NPUEVdLklOU1RBTExfUFJFRklYLnJlc29sdmUoZGVzdGluYXRpb24pKSwgYmFzZURpcik7XG4gICAgfVxuICB9XG5cbiAgcHVibGljIGFkZE9iamVjdExpYnJhcnkobmFtZTogc3RyaW5nLCAuLi5zb3VyY2VzOiBhbnlbXSk6IFVzZXJUYXJnZXRTdHJ1Y3Qge1xuICAgIGNvbnN0IHRhcmdldCA9IGNyZWF0ZVRhcmdldEltcGwoT2JqZWN0TGlicmFyeSwgdGhpc1tJTVBMXSwgdGhpc1tTQ09QRV0sIG5hbWUpO1xuICAgIHRhcmdldC5zZXRQcmVmaXgodGhpc1tTQ09QRV0uT0JKRUNUX0xJQlJBUllfUFJFRklYKTtcbiAgICB0YXJnZXQuc2V0U3VmZml4KHRoaXNbU0NPUEVdLk9CSkVDVF9MSUJSQVJZX1NVRkZJWCk7XG4gICAgdGFyZ2V0LmFkZExpbmtPcHRpb25zKC4uLnRoaXNbU0NPUEVdLk9CSkVDVF9MSU5LRVJfRkxBR1MpO1xuXG4gICAgcmV0dXJuIFVzZXJUYXJnZXRTdHJ1Y3QuY3JlYXRlKHRhcmdldCwgdGhpc1tTQ09QRV0sIC4uLnNvdXJjZXMpO1xuICB9XG5cbiAgcHVibGljIGFkZFN0YXRpY0xpYnJhcnkobmFtZTogYW55LCAuLi5zb3VyY2VzOiBhbnlbXSk6IFVzZXJUYXJnZXRTdHJ1Y3Qge1xuICAgIGNvbnN0IHRhcmdldCA9IGNyZWF0ZVRhcmdldEltcGwoU3RhdGljTGlicmFyeSwgdGhpc1tJTVBMXSwgdGhpc1tTQ09QRV0sIG5hbWUpO1xuICAgIHRhcmdldC5zZXRQcmVmaXgodGhpc1tTQ09QRV0uU1RBVElDX0xJQlJBUllfUFJFRklYKTtcbiAgICB0YXJnZXQuc2V0U3VmZml4KHRoaXNbU0NPUEVdLlNUQVRJQ19MSUJSQVJZX1NVRkZJWCk7XG4gICAgdGFyZ2V0LmFkZExpbmtPcHRpb25zKC4uLnRoaXNbU0NPUEVdLlNUQVRJQ19MSU5LRVJfRkxBR1MpO1xuXG4gICAgcmV0dXJuIFVzZXJUYXJnZXRTdHJ1Y3QuY3JlYXRlKHRhcmdldCwgdGhpc1tTQ09QRV0sIC4uLnNvdXJjZXMpO1xuICB9XG5cbiAgcHVibGljIGFkZFNoYXJlZExpYnJhcnkobmFtZTogYW55LCAuLi5zb3VyY2VzOiBhbnlbXSk6IFVzZXJUYXJnZXRTdHJ1Y3Qge1xuICAgIGNvbnN0IHRhcmdldCA9IGNyZWF0ZVRhcmdldEltcGwoU2hhcmVkTGlicmFyeSwgdGhpc1tJTVBMXSwgdGhpc1tTQ09QRV0sIG5hbWUpO1xuICAgIHRhcmdldC5zZXRQcmVmaXgodGhpc1tTQ09QRV0uU0hBUkVEX0xJQlJBUllfUFJFRklYKTtcbiAgICB0YXJnZXQuc2V0U3VmZml4KHRoaXNbU0NPUEVdLlNIQVJFRF9MSUJSQVJZX1NVRkZJWCk7XG4gICAgdGFyZ2V0LmFkZExpbmtPcHRpb25zKC4uLnRoaXNbU0NPUEVdLlNIQVJFRF9MSU5LRVJfRkxBR1MpO1xuXG4gICAgcmV0dXJuIFVzZXJUYXJnZXRTdHJ1Y3QuY3JlYXRlKHRhcmdldCwgdGhpc1tTQ09QRV0sIC4uLnNvdXJjZXMpO1xuICB9XG5cbiAgcHVibGljIGFkZEV4ZWN1dGFibGUobmFtZTogYW55LCAuLi5zb3VyY2VzOiBhbnlbXSk6IFVzZXJUYXJnZXRTdHJ1Y3Qge1xuICAgIGNvbnN0IHRhcmdldCA9IGNyZWF0ZVRhcmdldEltcGwoRXhlY3V0YWJsZSwgdGhpc1tJTVBMXSwgdGhpc1tTQ09QRV0sIG5hbWUpO1xuICAgIHRhcmdldC5zZXRQcmVmaXgodGhpc1tTQ09QRV0uRVhFQ1VUQUJMRV9TVUZGSVgpO1xuICAgIHRhcmdldC5hZGRMaW5rT3B0aW9ucyguLi50aGlzW1NDT1BFXS5FWEVfTElOS0VSX0ZMQUdTKTtcblxuICAgIHJldHVybiBVc2VyVGFyZ2V0U3RydWN0LmNyZWF0ZSh0YXJnZXQsIHRoaXNbU0NPUEVdLCAuLi5zb3VyY2VzKTtcbiAgfVxuXG4gIHB1YmxpYyBleGVjdXRlU2NyaXB0KHNjcmlwdDogYW55LCBwYXJhbXM6IGFueSk6IHZvaWQge1xuICAgIHRoaXNbSU1QTF0uZXhlY3V0ZVNjcmlwdCh0aGlzW1ZBUk1BUF0sIHNjcmlwdCwgcGFyYW1zKTtcbiAgfVxufTtcbiIsIi8qXG4gKiBNSVQgTGljZW5zZVxuICpcbiAqIENvcHlyaWdodCAoYykgMjAyNSAgWXVyaWkgWWFrdWJpbiAoeXVyaWkueWFrdWJpbkBnbWFpbC5jb20pXG4gKlxuICogUGVybWlzc2lvbiBpcyBncmFudGVkIHRvIHVzZSwgY29weSwgbW9kaWZ5LCBhbmQgZGlzdHJpYnV0ZSB0aGlzIHNvZnR3YXJlXG4gKiB1bmRlciB0aGUgTUlUIExpY2Vuc2UuIFNlZSBMSUNFTlNFIGZpbGUgZm9yIGRldGFpbHMuXG4gKi9cblxuaW1wb3J0IHsgSW50ZXJmYWNlU291cmNlRmlsZXMgfSBmcm9tIFwiQC9jb3JlL01ha2VJbnRlcmZhY2VzXCI7XG5pbXBvcnQgeyBTb3VyY2VGaWxlIH0gZnJvbSBcIkAvY29yZS9Tb3VyY2VGaWxlXCI7XG5pbXBvcnQgeyBUYXJnZXRIZWxwZXIgfSBmcm9tIFwiQC9jb3JlL1RhcmdldEhlbHBlclwiO1xuaW1wb3J0IHsgQmFzZVRhcmdldCB9IGZyb20gXCJAL2NvcmUvVGFyZ2V0XCI7XG5cbmNvbnN0IFRBUkdFVCA9IFN5bWJvbChcIlRBUkdFVFwiKTtcbmNvbnN0IFNPVVJDRVMgPSBTeW1ib2woXCJTT1VSQ0VTXCIpO1xuXG5leHBvcnQgY2xhc3MgVXNlclNvdXJjZUZpbGVzIGV4dGVuZHMgSW50ZXJmYWNlU291cmNlRmlsZXMge1xuICBwcml2YXRlIFtUQVJHRVRdOiBCYXNlVGFyZ2V0O1xuICBwcml2YXRlIFtTT1VSQ0VTXTogU291cmNlRmlsZVtdO1xuXG4gIHByaXZhdGUgY29uc3RydWN0b3IodGFyZ2V0OiBCYXNlVGFyZ2V0LCBzb3VyY2VzOiBTb3VyY2VGaWxlW10pIHtcbiAgICBzdXBlcigpO1xuICAgIHRoaXNbVEFSR0VUXSA9IHRhcmdldDtcbiAgICB0aGlzW1NPVVJDRVNdID0gWyAuLi5zb3VyY2VzIF07XG4gIH1cblxuICBwdWJsaWMgc3RhdGljIGNyZWF0ZSh0YXJnZXQ6IEJhc2VUYXJnZXQsIHNvdXJjZXM6IFNvdXJjZUZpbGVbXSkge1xuICAgIHJldHVybiBPYmplY3Quc2VhbChuZXcgVXNlclNvdXJjZUZpbGVzKHRhcmdldCwgc291cmNlcykpO1xuICB9XG5cbiAgcHVibGljIHNldExhbmd1YWdlKGxhbmd1YWdlOiBzdHJpbmcpOiB2b2lkIHtcbiAgICB0aHJvdyBuZXcgRXJyb3IoXCJOb3QgSW1wbGVtZW50ZWRcIik7XG4gIH1cblxuICBwdWJsaWMgYWRkRGVmaW5pdGlvbnMoLi4uZGVmaW5pdGlvbnM6IHN0cmluZ1tdKSB7XG4gICAgZm9yIChjb25zdCBpdGVyIG9mIFRhcmdldEhlbHBlci5ub3JtYWxpemVEZWZpbml0aW9ucyhkZWZpbml0aW9ucy5mbGF0KCkpKVxuICAgICAgdGhpc1tTT1VSQ0VTXS5mb3JFYWNoKGkgPT4gaS5hZGREZWZpbml0aW9uKGl0ZXIpKTtcbiAgfVxuXG4gIHB1YmxpYyBhZGRDb21waWxlRmxhZ3MoLi4ub3B0aW9uczogc3RyaW5nW10pIHtcbiAgICBmb3IgKGNvbnN0IGl0ZXIgb2YgVGFyZ2V0SGVscGVyLm5vcm1hbGl6ZUNvbXBpbGVPcHRpb25zKG9wdGlvbnMuZmxhdCgpKSlcbiAgICAgIHRoaXNbU09VUkNFU10uZm9yRWFjaChpID0+IGkuYWRkQ29tcGlsZU9wdGlvbihpdGVyKSk7XG4gIH1cblxuICBwdWJsaWMgdG9KU09OKCk6IG9iamVjdCB7XG4gICAgcmV0dXJuIHRoaXNbU09VUkNFU107XG4gIH1cbn07XG4iLCIvKlxuICogTUlUIExpY2Vuc2VcbiAqXG4gKiBDb3B5cmlnaHQgKGMpIDIwMjUgIFl1cmlpIFlha3ViaW4gKHl1cmlpLnlha3ViaW5AZ21haWwuY29tKVxuICpcbiAqIFBlcm1pc3Npb24gaXMgZ3JhbnRlZCB0byB1c2UsIGNvcHksIG1vZGlmeSwgYW5kIGRpc3RyaWJ1dGUgdGhpcyBzb2Z0d2FyZVxuICogdW5kZXIgdGhlIE1JVCBMaWNlbnNlLiBTZWUgTElDRU5TRSBmaWxlIGZvciBkZXRhaWxzLlxuICovXG5cbmltcG9ydCB7IEludGVyZmFjZVRhcmdldCB9IGZyb20gXCJAL2NvcmUvTWFrZUludGVyZmFjZXNcIjtcbmltcG9ydCB7IEJhc2VUYXJnZXQgfSBmcm9tIFwiQC9jb3JlL1RhcmdldFwiO1xuaW1wb3J0IHsgU3lzdGVtU2NvcGUgfSBmcm9tIFwiQC9jb3JlL1N5c3RlbVNjb3BlXCI7XG5pbXBvcnQgeyBlbnN1cmVTdHJpbmcgfSBmcm9tIFwiQC91dGlscy9TdHJpY3RUeXBlXCI7XG5pbXBvcnQgeyBUYXJnZXRJbmNsdWRlcyB9IGZyb20gXCJAL2NvcmUvVGFyZ2V0SW5jbHVkZXNcIjtcbmltcG9ydCB7IFRhcmdldE9iamVjdHMgfSBmcm9tIFwiQC9jb3JlL1RhcmdldE9iamVjdHNcIjtcbmltcG9ydCB7IERpclBhdGgsIEFic29sdXRlUGF0aCB9IGZyb20gXCJAL2NvcmUvQWJzb2x1dGVQYXRoXCI7XG5pbXBvcnQgeyBTb3VyY2VGaWxlIH0gZnJvbSBcIkAvY29yZS9Tb3VyY2VGaWxlXCI7XG5pbXBvcnQgeyBVc2VyU291cmNlRmlsZXMgfSBmcm9tIFwiQC9jb3JlL1VzZXJTb3VyY2VGaWxlc1wiO1xuaW1wb3J0IHsgVGFyZ2V0RmlsZSB9IGZyb20gXCJAL2NvcmUvVGFyZ2V0RmlsZVwiO1xuaW1wb3J0IHsgVGFyZ2V0SGVscGVyIH0gZnJvbSBcIkAvY29yZS9UYXJnZXRIZWxwZXJcIjtcbmltcG9ydCB7IExvZ2dlciB9IGZyb20gXCJAL2xvZ2dlclwiO1xuXG5jb25zdCBsb2dnZXIgPSBMb2dnZXIuY3JlYXRlKGltcG9ydC5tZXRhLnVybCk7XG5cbmNvbnN0IFNDT1BFID0gU3ltYm9sKFwiU0NPUEVcIik7XG5jb25zdCBJTVBMID0gU3ltYm9sKFwiSU1QTFwiKTtcblxuY29uc3QgX2xhbmd1YWdlRXh0ZW5zaW9ucyA9IHtcbiAgQVNNOiBbIFwiLmFzbVwiLCBcIi5zXCIgXSxcbiAgQzogICBbIFwiLmNcIiBdLFxuICBDWFg6IFtcIi5jcHBcIiwgXCIuY2NcIiwgXCIuY3h4XCIgXSxcbn07XG5cbmZ1bmN0aW9uIGlzU3VwcG9ydExhbmd1YWdlKGxhbmd1YWdlOiBzdHJpbmcpIHtcbiAgcmV0dXJuIF9sYW5ndWFnZUV4dGVuc2lvbnMuaGFzT3duUHJvcGVydHkobGFuZ3VhZ2UpO1xufVxuXG5mdW5jdGlvbiBnZXRGaWxlTGFuZ3VhZ2UoZmlsZW5hbWU6IHN0cmluZykge1xuICBjb25zdCBmaWxlbmFtZUxvd2VyQ2FzZSA9IGZpbGVuYW1lLnRvTG93ZXJDYXNlKCk7XG4gIGZvciAoY29uc3QgW2xhbmd1YWdlLCBleHRlbnNpb25zXSBvZiBPYmplY3QuZW50cmllcyhfbGFuZ3VhZ2VFeHRlbnNpb25zKSkge1xuICAgIGZvciAoY29uc3QgaXRlciBvZiBleHRlbnNpb25zKSB7XG4gICAgICBpZiAoZmlsZW5hbWVMb3dlckNhc2UuZW5kc1dpdGgoaXRlcikpXG4gICAgICAgIHJldHVybiBsYW5ndWFnZTtcbiAgICB9XG4gIH1cbiAgcmV0dXJuIFwiXCI7XG59XG5cbmZ1bmN0aW9uIG1ha2VMYW5ndWFnZSh2YWx1ZTogc3RyaW5nKSB7XG4gIGlmIChpc1N1cHBvcnRMYW5ndWFnZSh2YWx1ZSkpXG4gICAgcmV0dXJuIHZhbHVlO1xuICB0aHJvdyBuZXcgRXJyb3IoYExhbmd1YWdlIFwiJHt2YWx1ZX1cIiBpcyBub3Qgc3VwcG9ydGVkYCk7XG59XG5cbmZ1bmN0aW9uIGFkZEluY2x1ZGVJbXBsKHRhcmdldDogQmFzZVRhcmdldCwgc291cmNlRGlyOiBBYnNvbHV0ZVBhdGgsIHB1YmxpY09ubHk6IGJvb2xlYW4sIGluY2x1ZGU6IFRhcmdldEluY2x1ZGVzIHwgQWJzb2x1dGVQYXRoIHwgc3RyaW5nKTogdm9pZCB7XG4gIGlmIChpbmNsdWRlIGluc3RhbmNlb2YgVGFyZ2V0SW5jbHVkZXMpXG4gICAgdGFyZ2V0LmFkZEluY2x1ZGUocHVibGljT25seSwgaW5jbHVkZSk7XG4gIGVsc2UgaWYgKHR5cGVvZiBpbmNsdWRlID09PSBcInN0cmluZ1wiKVxuICAgIHRhcmdldC5hZGRJbmNsdWRlKHB1YmxpY09ubHksIERpclBhdGguY3JlYXRlKHNvdXJjZURpci5yZXNvbHZlKGluY2x1ZGUpKSk7XG4gIGVsc2UgaWYgKGluY2x1ZGUgaW5zdGFuY2VvZiBBYnNvbHV0ZVBhdGgpXG4gICAgdGFyZ2V0LmFkZEluY2x1ZGUocHVibGljT25seSwgRGlyUGF0aC5jcmVhdGUoaW5jbHVkZSkpO1xuICBlbHNlXG4gICAgdGhyb3cgbmV3IEVycm9yKGBOb3Qgc3VwcG9ydCBpbnN0YW5jZSAke2luY2x1ZGV9YCk7XG59XG5cbmZ1bmN0aW9uIGFkZEluY2x1ZGVzSW1wbCh0YXJnZXQ6IEJhc2VUYXJnZXQsIHNjb3BlOiBTeXN0ZW1TY29wZSwgcHVibGljT25seTogYm9vbGVhbiwgLi4uaW5jbHVkZXM6IEFycmF5PFRhcmdldEluY2x1ZGVzIHwgQWJzb2x1dGVQYXRoIHwgc3RyaW5nPik6IHZvaWQge1xuICBjb25zdCBzb3VyY2VEaXIgPSBzY29wZS5TT1VSQ0VfRElSO1xuICBmb3IgKGNvbnN0IGl0ZXIgb2YgaW5jbHVkZXMuZmxhdCgpKVxuICAgIGFkZEluY2x1ZGVJbXBsKHRhcmdldCwgc291cmNlRGlyLCBwdWJsaWNPbmx5LCBpdGVyKTtcbn1cblxuZnVuY3Rpb24gZW5zdXJlQ21kVmFsdWUodmFsdWU6IGFueSk6IHN0cmluZyB8IFRhcmdldEZpbGUge1xuICBpZiAodHlwZW9mIHZhbHVlID09PSBcInN0cmluZ1wiKVxuICAgIHJldHVybiB2YWx1ZTtcbiAgZWxzZSBpZiAodmFsdWUgaW5zdGFuY2VvZiBUYXJnZXRGaWxlKVxuICAgIHJldHVybiB2YWx1ZTtcbiAgZWxzZSBpZiAodmFsdWUgaW5zdGFuY2VvZiBBYnNvbHV0ZVBhdGgpXG4gICAgcmV0dXJuIHZhbHVlLnRvUGF0aCgpO1xuICBlbHNlXG4gICAgdGhyb3cgbmV3IFR5cGVFcnJvcihgV3JvbmcgdHlwZSAke3ZhbHVlfSBmb3IgY29tbWFuZGApO1xufVxuXG5leHBvcnQgY2xhc3MgVXNlclRhcmdldFN0cnVjdCBleHRlbmRzIEludGVyZmFjZVRhcmdldCB7XG4gIFtJTVBMXTogQmFzZVRhcmdldDtcbiAgW1NDT1BFXTogU3lzdGVtU2NvcGU7XG5cbiAgcHJpdmF0ZSBjb25zdHJ1Y3RvcihpbXBsOiBCYXNlVGFyZ2V0LCBzY29wZTogU3lzdGVtU2NvcGUpIHtcbiAgICBzdXBlcigpO1xuICAgIHRoaXNbSU1QTF0gPSBpbXBsO1xuICAgIHRoaXNbU0NPUEVdID0gc2NvcGU7XG5cbiAgICB0aGlzW0lNUExdLnNldFBvc2l0aW9uSW5kZXBlbmRlbnRDb2RlKHRoaXNbU0NPUEVdLlBPU0lUSU9OX0lOREVQRU5ERU5UX0NPREUpO1xuXG4gICAgYWRkSW5jbHVkZXNJbXBsKHRoaXNbSU1QTF0sIHRoaXNbU0NPUEVdLCBmYWxzZSwgLi4udGhpc1tTQ09QRV0uSU5DTFVERVMpO1xuICB9XG5cbiAgcHVibGljIHN0YXRpYyBjcmVhdGUoaW1wbDogQmFzZVRhcmdldCwgc2NvcGU6IFN5c3RlbVNjb3BlLCAuLi5zb3VyY2VzOiBhbnlbXSkge1xuICAgIGNvbnN0IHRhcmdldCA9IE9iamVjdC5zZWFsKG5ldyBVc2VyVGFyZ2V0U3RydWN0KGltcGwsIHNjb3BlKSk7XG4gICAgdGFyZ2V0LmFkZFNvdXJjZXMoLi4uc291cmNlcyk7XG4gICAgcmV0dXJuIHRhcmdldDtcbiAgfVxuXG4gIHB1YmxpYyBnZXQgdGFyZ2V0TmFtZSgpIHtcbiAgICByZXR1cm4gdGhpc1tJTVBMXS50YXJnZXROYW1lO1xuICB9XG5cbiAgcHVibGljIGdldCB0YXJnZXRGaWxlKCkge1xuICAgIHJldHVybiB0aGlzW0lNUExdLnRhcmdldEZpbGU7XG4gIH1cblxuICBwdWJsaWMgZ2V0IGluY2x1ZGVzKCkge1xuICAgIHJldHVybiB0aGlzW0lNUExdLmluY2x1ZGVzO1xuICB9XG5cbiAgcHVibGljIGdldCBvYmplY3RzKCkge1xuICAgIHJldHVybiB0aGlzW0lNUExdLm9iamVjdHM7XG4gIH1cbiAgXG4gIHB1YmxpYyBzZXRQcmVmaXgodmFsdWU6IGFueSk6IHZvaWQge1xuICAgIHRoaXNbSU1QTF0uc2V0UHJlZml4KGVuc3VyZVN0cmluZyh2YWx1ZSkpO1xuICB9XG5cbiAgcHVibGljIHNldFN1ZmZpeCh2YWx1ZTogYW55KTogdm9pZCB7XG4gICAgdGhpc1tJTVBMXS5zZXRTdWZmaXgoZW5zdXJlU3RyaW5nKHZhbHVlKSk7XG4gIH1cblxuICBwdWJsaWMgc2V0T3V0cHV0TmFtZSh2YWx1ZTogYW55KTogdm9pZCB7XG4gICAgdGhpc1tJTVBMXS5zZXRPdXRwdXROYW1lKGVuc3VyZVN0cmluZyh2YWx1ZSkpO1xuICB9XG5cbiAgcHVibGljIGFkZFNvdXJjZXMoLi4uc291cmNlczogQXJyYXk8VGFyZ2V0T2JqZWN0cyB8IFNvdXJjZUZpbGUgfCBBYnNvbHV0ZVBhdGggfCBzdHJpbmc+KTogdm9pZCB7XG4gICAgY29uc3Qgc2NvcGUgPSB0aGlzW1NDT1BFXTtcbiAgICBmb3IgKGNvbnN0IGl0ZXIgb2Ygc291cmNlcy5mbGF0KCkpIHtcbiAgICAgIGlmICh0eXBlb2YgaXRlciA9PT0gXCJzdHJpbmdcIiB8fCBpdGVyIGluc3RhbmNlb2YgQWJzb2x1dGVQYXRoKSB7XG4gICAgICAgIGNvbnN0IGZpbGVuYW1lID0gc2NvcGUuU09VUkNFX0RJUi5yZXNvbHZlKGl0ZXIpO1xuICAgICAgICBjb25zdCBsYW5ndWFnZSA9IGdldEZpbGVMYW5ndWFnZShmaWxlbmFtZS50b1BhdGgoKSk7XG4gICAgICAgIGxldCBjb21waWxlclBhdGggPSBcIlwiO1xuICAgICAgICBjb25zdCBjb21waWxlckZsYWdzID0gW107XG5cbiAgICAgICAgaWYgKGxhbmd1YWdlKSB7XG4gICAgICAgICAgY29tcGlsZXJQYXRoID0gKHNjb3BlIGFzIGFueSlbbGFuZ3VhZ2UgKyBcIl9DT01QSUxFUlwiXTtcbiAgICAgICAgICBjb25zdCBDT01QSUxFUl9GTEFHUzEgPSAoc2NvcGUgYXMgYW55KVtgJHtsYW5ndWFnZX1fRkxBR1NgXVxuICAgICAgICAgIGlmIChDT01QSUxFUl9GTEFHUzEpIHtcbiAgICAgICAgICAgIGNvbXBpbGVyRmxhZ3MucHVzaCguLi5DT01QSUxFUl9GTEFHUzEpO1xuICAgICAgICAgIH1cblxuICAgICAgICAgIGNvbnN0IENPTVBJTEVSX0ZMQUdTMiA9IChzY29wZSBhcyBhbnkpW2Ake2xhbmd1YWdlfV9GTEFHU18ke3Njb3BlLkJVSUxEX1RZUEUudG9VcHBlckNhc2UoKX1gXVxuICAgICAgICAgIGlmIChDT01QSUxFUl9GTEFHUzIpIHtcbiAgICAgICAgICAgIGNvbXBpbGVyRmxhZ3MucHVzaCguLi5DT01QSUxFUl9GTEFHUzIpO1xuICAgICAgICAgIH1cblxuICAgICAgICAgIGlmICghdGhpc1tJTVBMXS5sYW5ndWFnZSB8fCAodGhpc1tJTVBMXS5sYW5ndWFnZSA9PT0gXCJDXCIgJiYgbGFuZ3VhZ2UgPT09IFwiQ1hYXCIpKSB7XG4gICAgICAgICAgICB0aGlzW0lNUExdLmxhbmd1YWdlID0gbGFuZ3VhZ2U7XG4gICAgICAgICAgICB0aGlzW0lNUExdLmNvbXBpbGVyUGF0aCA9IGNvbXBpbGVyUGF0aDtcbiAgICAgICAgICAgIHRoaXNbSU1QTF0uY29tcGlsZXJGbGFncyA9IFsgLi4uY29tcGlsZXJGbGFncyBdO1xuICAgICAgICAgIH1cbiAgICAgICAgfVxuXG4gICAgICAgIGNvbnN0IHNvdXJjZSA9IFNvdXJjZUZpbGUuY3JlYXRlKGZpbGVuYW1lLCBzY29wZS5TT1VSQ0VfRElSLCAhbGFuZ3VhZ2UsIGxhbmd1YWdlLCBjb21waWxlclBhdGgsIGNvbXBpbGVyRmxhZ3MpO1xuICAgICAgICB0aGlzW0lNUExdLmFkZFNvdXJjZShzb3VyY2UpO1xuICAgICAgfVxuICAgICAgZWxzZSBpZiAoaXRlciBpbnN0YW5jZW9mIFRhcmdldE9iamVjdHMpXG4gICAgICAgIHRoaXNbSU1QTF0uYWRkU291cmNlKGl0ZXIpO1xuICAgICAgZWxzZSBpZiAoaXRlciBpbnN0YW5jZW9mIFNvdXJjZUZpbGUpXG4gICAgICAgIHRoaXNbSU1QTF0uYWRkU291cmNlKGl0ZXIpO1xuICAgICAgZWxzZVxuICAgICAgICB0aHJvdyBuZXcgRXJyb3IoYE5vdCBzdXBwb3J0IGluc3RhbmNlICR7aXRlcn1gKTtcbiAgICB9XG4gIH1cbiAgXG4gIHB1YmxpYyBnZXRTb3VyY2VGaWxlcyguLi5zb3VyY2VzOiBhbnlbXSk6IFVzZXJTb3VyY2VGaWxlcyB7XG4gICAgY29uc3QgcmVzdWx0ID0gW107XG4gICAgY29uc3Qgc2NvcGUgPSB0aGlzW1NDT1BFXTtcbiAgICBjb25zdCBzb3VyY2VGaWxlcyA9IHRoaXNbSU1QTF0uZ2V0U291cmNlRmlsZXMoKTtcbiAgICBmb3IgKGNvbnN0IGl0IG9mIHNvdXJjZXMuZmxhdCgpKSB7XG4gICAgICBjb25zdCBmaWxlbmFtZSA9IHNjb3BlLlNPVVJDRV9ESVIucmVzb2x2ZShpdCkudG9QYXRoKCk7XG4gICAgICBjb25zdCBzcmMgPSBzb3VyY2VGaWxlcy5maW5kKGkgPT4gaS5GSUxFLnRvUGF0aCgpID09PSBmaWxlbmFtZSk7XG4gICAgICBpZiAoIXNyYylcbiAgICAgICAgdGhyb3cgbmV3IEVycm9yKGBDYW5ub3QgZmluZCBcIiR7aXR9XCJgKTtcbiAgICAgIHJlc3VsdC5wdXNoKHNyYyk7XG4gICAgfVxuICAgIFxuICAgIHJldHVybiBVc2VyU291cmNlRmlsZXMuY3JlYXRlKHRoaXNbSU1QTF0sIHJlc3VsdC5sZW5ndGggPyByZXN1bHQgOiBzb3VyY2VGaWxlcyk7XG4gIH1cblxuICBwdWJsaWMgYWRkSW5jbHVkZXMoLi4uaW5jbHVkZXM6IEFycmF5PFRhcmdldEluY2x1ZGVzIHwgQWJzb2x1dGVQYXRoIHwgc3RyaW5nPik6IHZvaWQge1xuICAgIGFkZEluY2x1ZGVzSW1wbCh0aGlzW0lNUExdLCB0aGlzW1NDT1BFXSwgZmFsc2UsIC4uLmluY2x1ZGVzKTtcbiAgfVxuXG4gIHB1YmxpYyBhZGRMaWJyYXJpZXMoLi4ubGlicmFyaWVzOiBhbnlbXSk6IHZvaWQge1xuICAgIHRoaXNbSU1QTF0uYWRkTGlicmFyaWVzKC4uLmxpYnJhcmllcyk7XG4gIH1cblxuICBwdWJsaWMgYWRkQ29tcGlsZU9wdGlvbnMoLi4ub3B0aW9uczogYW55W10pOiB2b2lkIHtcbiAgICBmb3IgKGNvbnN0IGl0ZXIgb2YgVGFyZ2V0SGVscGVyLm5vcm1hbGl6ZUNvbXBpbGVPcHRpb25zKG9wdGlvbnMuZmxhdCgpKSlcbiAgICAgIHRoaXNbSU1QTF0uYWRkQ29tcGlsZU9wdGlvbihmYWxzZSwgaXRlcik7XG4gIH1cblxuICBwdWJsaWMgYWRkTGlua09wdGlvbnMoLi4ub3B0aW9uczogYW55W10pOiB2b2lkIHtcbiAgICB0aGlzW0lNUExdLmFkZExpbmtPcHRpb25zKC4uLm9wdGlvbnMpO1xuICB9XG5cbiAgcHVibGljIGFkZERlZmluaXRpb25zKC4uLmRlZmluaXRpb25zOiBhbnlbXSk6IHZvaWQge1xuICAgIGZvciAoY29uc3QgaXRlciBvZiBUYXJnZXRIZWxwZXIubm9ybWFsaXplRGVmaW5pdGlvbnMoZGVmaW5pdGlvbnMuZmxhdCgpKSlcbiAgICAgIHRoaXNbSU1QTF0uYWRkRGVmaW5pdGlvbihmYWxzZSwgaXRlcik7XG4gIH1cblxuICBwdWJsaWMgYWRkUHJlQnVpbGQoY29tbWFuZDogYW55LCBhcmdzOiBhbnlbXSk6IHZvaWQge1xuICAgIHRoaXNbSU1QTF0uYWRkUHJlQnVpbGQoZW5zdXJlQ21kVmFsdWUoY29tbWFuZCksIGFyZ3MubWFwKGkgPT4gZW5zdXJlQ21kVmFsdWUoaSkpKTtcbiAgfVxuXG4gIHB1YmxpYyBhZGRQb3N0QnVpbGQoY29tbWFuZDogYW55LCBhcmdzOiBhbnlbXSk6IHZvaWQge1xuICAgIHRoaXNbSU1QTF0uYWRkUG9zdEJ1aWxkKGVuc3VyZUNtZFZhbHVlKGNvbW1hbmQpLCBhcmdzLm1hcChpID0+IGVuc3VyZUNtZFZhbHVlKGkpKSk7XG4gIH1cblxuICBwdWJsaWMgc2V0UG9zaXRpb25JbmRlcGVuZGVudENvZGUodmFsdWU6IGJvb2xlYW4pOiB2b2lkIHtcbiAgICB0aGlzW0lNUExdLnNldFBvc2l0aW9uSW5kZXBlbmRlbnRDb2RlKHZhbHVlKTtcbiAgfVxuXG4gIHB1YmxpYyBhZGRQdWJsaWNJbmNsdWRlcyguLi5pbmNsdWRlczogQXJyYXk8VGFyZ2V0SW5jbHVkZXMgfCBBYnNvbHV0ZVBhdGggfCBzdHJpbmc+KTogdm9pZCB7XG4gICAgYWRkSW5jbHVkZXNJbXBsKHRoaXNbSU1QTF0sIHRoaXNbU0NPUEVdLCB0cnVlLCAuLi5pbmNsdWRlcyk7XG4gIH1cblxuICBwdWJsaWMgYWRkUHVibGljRGVmaW5pdGlvbnMoLi4uZGVmaW5pdGlvbnM6IGFueSk6IHZvaWQge1xuICAgIGZvciAoY29uc3QgaXRlciBvZiBUYXJnZXRIZWxwZXIubm9ybWFsaXplRGVmaW5pdGlvbnMoZGVmaW5pdGlvbnMuZmxhdCgpKSlcbiAgICAgIHRoaXNbSU1QTF0uYWRkRGVmaW5pdGlvbih0cnVlLCBpdGVyKTtcbiAgfVxuXG4gIHB1YmxpYyBhZGRQdWJsaWNMaWJyYXJpZXMoLi4ubGlicmFyaWVzOiBhbnlbXSk6IHZvaWQge1xuICAgIHRoaXNbSU1QTF0uYWRkUHVibGljTGlicmFyaWVzKC4uLmxpYnJhcmllcyk7XG4gIH1cblxuICBwdWJsaWMgYWRkUHVibGljQ29tcGlsZU9wdGlvbnMoLi4ub3B0aW9uczogYW55W10pOiB2b2lkIHtcbiAgICBmb3IgKGNvbnN0IGl0ZXIgb2YgVGFyZ2V0SGVscGVyLm5vcm1hbGl6ZUNvbXBpbGVPcHRpb25zKG9wdGlvbnMuZmxhdCgpKSlcbiAgICAgIHRoaXNbSU1QTF0uYWRkQ29tcGlsZU9wdGlvbih0cnVlLCBpdGVyKTtcbiAgfVxuXG4gIHB1YmxpYyBhZGRQdWJsaWNMaW5rT3B0aW9ucyguLi5vcHRpb25zOiBhbnlbXSk6IHZvaWQge1xuICAgIHRoaXNbSU1QTF0uYWRkUHVibGljTGlua09wdGlvbnMoLi4ub3B0aW9ucyk7XG4gIH1cbn07XG4iLCIvKlxuICogTUlUIExpY2Vuc2VcbiAqXG4gKiBDb3B5cmlnaHQgKGMpIDIwMjUgIFl1cmlpIFlha3ViaW4gKHl1cmlpLnlha3ViaW5AZ21haWwuY29tKVxuICpcbiAqIFBlcm1pc3Npb24gaXMgZ3JhbnRlZCB0byB1c2UsIGNvcHksIG1vZGlmeSwgYW5kIGRpc3RyaWJ1dGUgdGhpcyBzb2Z0d2FyZVxuICogdW5kZXIgdGhlIE1JVCBMaWNlbnNlLiBTZWUgTElDRU5TRSBmaWxlIGZvciBkZXRhaWxzLlxuICovXG5cbmltcG9ydCBwYXRoIGZyb20gXCJub2RlOnBhdGhcIjtcblxuZXhwb3J0IGZ1bmN0aW9uIGZpbGVuYW1lVG9QcmFnbWFPbmNlTWFjcm8oZmlsZXBhdGg6IHN0cmluZywgZGVlcDogbnVtYmVyKSB7XG4gIGlmICh0eXBlb2YgZGVlcCA9PT0gJ3VuZGVmaW5lZCcpXG4gICAgZGVlcCA9IDM7XG5cbiAgbGV0IGNvbXBvbmVudHMgPSBwYXRoLm5vcm1hbGl6ZShmaWxlcGF0aCkuc3BsaXQocGF0aC5zZXApO1xuICBpZiAoY29tcG9uZW50cy5sZW5ndGggPiBkZWVwKVxuICAgIGNvbXBvbmVudHMgPSBjb21wb25lbnRzLnNsaWNlKGNvbXBvbmVudHMubGVuZ3RoIC0gZGVlcCk7XG5cbiAgcmV0dXJuIFwiX1wiICsgY29tcG9uZW50cy5qb2luKCdfJykucmVwbGFjZSgvWy0gLjolfl0vZywgJ18nKS50b1VwcGVyQ2FzZSgpO1xufVxuXG5leHBvcnQgZnVuY3Rpb24gbGluZVRvU2luZ2xDb21tZW50KGxpbmU6IHN0cmluZykge1xuICByZXR1cm4gXCIvL1wiICsgbGluZTtcbn1cblxuZXhwb3J0IGZ1bmN0aW9uIGxpbmVUb011bHRpcGxlQ29tbWVudChsaW5lOiBzdHJpbmcpIHtcbiAgcmV0dXJuIGAvKiAke2xpbmV9ICovYDtcbn1cblxuZXhwb3J0IGZ1bmN0aW9uIGdlbmVyYXRlZFNjcmlwdE5hbWVDb21tZW50KGZpbGVuYW1lOiBzdHJpbmcpIHtcbiAgcmV0dXJuIGxpbmVUb011bHRpcGxlQ29tbWVudChcIkdlbmVyYXRlZCBmcm9tIFwiICsgcGF0aC5iYXNlbmFtZShmaWxlbmFtZSkpO1xufVxuIiwiLypcbiAqIE1JVCBMaWNlbnNlXG4gKlxuICogQ29weXJpZ2h0IChjKSAyMDI1ICBZdXJpaSBZYWt1YmluICh5dXJpaS55YWt1YmluQGdtYWlsLmNvbSlcbiAqXG4gKiBQZXJtaXNzaW9uIGlzIGdyYW50ZWQgdG8gdXNlLCBjb3B5LCBtb2RpZnksIGFuZCBkaXN0cmlidXRlIHRoaXMgc29mdHdhcmVcbiAqIHVuZGVyIHRoZSBNSVQgTGljZW5zZS4gU2VlIExJQ0VOU0UgZmlsZSBmb3IgZGV0YWlscy5cbiAqL1xuXG5leHBvcnQgaW50ZXJmYWNlIElMb2dnZXIge1xuICBkZWJ1ZyhtZXNzYWdlPzogYW55LCAuLi5wYXJhbXM6IGFueVtdKTogdm9pZDtcbiAgaW5mbyhtZXNzYWdlPzogYW55LCAuLi5wYXJhbXM6IGFueVtdKTogdm9pZDtcbiAgbm90aWNlKG1lc3NhZ2U/OiBhbnksIC4uLnBhcmFtczogYW55W10pOiB2b2lkO1xuICB3YXJuKG1lc3NhZ2U/OiBhbnksIC4uLnBhcmFtczogYW55W10pOiB2b2lkO1xuICBlcnJvcihtZXNzYWdlPzogYW55LCAuLi5wYXJhbXM6IGFueVtdKTogdm9pZDtcbiAgZmF0YWwobWVzc2FnZT86IGFueSwgLi4ucGFyYW1zOiBhbnlbXSk6IHZvaWQ7XG59O1xuXG50eXBlIExvZ2dlckhhbmRsZXIgPSAobWVzc2FnZT86IGFueSwgLi4ucGFyYW1zOiBhbnlbXSkgPT4gdm9pZDs7XG5cbmludGVyZmFjZSBFbnRyeUxvZ2dlciB7XG4gIHRhZ05hbWU6IHN0cmluZztcbiAgZmlsdGVyOiBzdHJpbmc7XG4gIGxvZ2dlcjogSUxvZ2dlcjtcbn07XG5cbmNvbnN0IFNFUEFSQVRPUiA9IFwiIFwiO1xuY29uc3QgTUVTU0FHRV9NQVggPSAyNDA7XG5cbmZ1bmN0aW9uIHRvTWVzc2FnZVN0cmluZyhvOiBhbnkpIHtcbiAgcmV0dXJuICh0eXBlb2YgbyA9PT0gXCJzdHJpbmdcIikgPyBvIDogSlNPTi5zdHJpbmdpZnkobyk7XG59XG5cbmZ1bmN0aW9uKiBtZXNzYWdlR2VuZXJhdG9yKG1lc3NhZ2VzOiBzdHJpbmdbXSwgbWF4TGVuZ3RoOiBudW1iZXIpIHtcbiAgbGV0IGxlbmd0aCA9IDA7XG4gIGNvbnN0IG1zZ0xpc3Q6IHN0cmluZ1tdID0gW107XG5cbiAgZm9yICg7Oykge1xuICAgIGNvbnN0IGl0ZXIgPSBtZXNzYWdlcy5zaGlmdCgpO1xuICAgIGlmICghaXRlcilcbiAgICAgIGJyZWFrO1xuXG4gICAgaWYgKG1zZ0xpc3QubGVuZ3RoKVxuICAgICAgbGVuZ3RoICs9IFNFUEFSQVRPUi5sZW5ndGg7XG5cbiAgICBtc2dMaXN0LnB1c2goaXRlcik7XG4gICAgbGVuZ3RoICs9IGl0ZXIubGVuZ3RoO1xuXG4gICAgd2hpbGUgKGxlbmd0aCA+IG1heExlbmd0aCkge1xuICAgICAgY29uc3QgbXNnID0gbXNnTGlzdC5qb2luKFNFUEFSQVRPUik7XG4gICAgICBjb25zdCBuZXh0TXNnID0gbXNnLnN1YnN0cmluZyhtYXhMZW5ndGgpO1xuICAgICAgbXNnTGlzdC5sZW5ndGggPSAwO1xuICAgICAgbXNnTGlzdC5wdXNoKG5leHRNc2cpO1xuICAgICAgbGVuZ3RoID0gbmV4dE1zZy5sZW5ndGg7XG4gICAgICB5aWVsZCBtc2cuc3Vic3RyaW5nKDAsIG1heExlbmd0aCk7XG4gICAgfVxuICB9XG5cbiAgeWllbGQgbXNnTGlzdC5qb2luKFNFUEFSQVRPUik7XG59XG5cbmZ1bmN0aW9uIG1ha2VMb2dNZXRob2Qod2l0aFByZWZpeDogYm9vbGVhbiwgdHlwZTogc3RyaW5nLCB0YWdOYW1lOiBzdHJpbmcsIHRhcmdldDogYW55LCBoYW5kbGVyOiBMb2dnZXJIYW5kbGVyKSB7XG4gIHJldHVybiAoLi4uYXJnczogYW55W10pID0+IHtcbiAgICBjb25zdCBub3cgPSBuZXcgRGF0ZSgpO1xuICAgIGNvbnN0IG1lc3NhZ2VzID0gYXJncy5tYXAoaSA9PiB0b01lc3NhZ2VTdHJpbmcoaSkpXG5cbiAgICBpZiAoIXdpdGhQcmVmaXgpIHtcbiAgICAgIGhhbmRsZXIuY2FsbCh0YXJnZXQsIG1lc3NhZ2VzLmpvaW4oU0VQQVJBVE9SKSk7XG4gICAgICByZXR1cm47XG4gICAgfVxuXG4gICAgY29uc3QgcHJlZml4ID0gWyBub3cudG9JU09TdHJpbmcoKSwgdHlwZSwgdGFnTmFtZSBdLmpvaW4oU0VQQVJBVE9SKTtcbiAgICBmb3IgKGNvbnN0IGl0ZXIgb2YgbWVzc2FnZUdlbmVyYXRvcihtZXNzYWdlcywgTUVTU0FHRV9NQVggLSBwcmVmaXgubGVuZ3RoIC0gU0VQQVJBVE9SLmxlbmd0aCkpIHtcbiAgICAgIGhhbmRsZXIuY2FsbCh0YXJnZXQsIFtwcmVmaXgsIGl0ZXJdLmpvaW4oU0VQQVJBVE9SKSk7XG4gICAgfVxuICB9O1xufVxuXG5sZXQgX2RlZmF1bHRQYXR0ZXJuID0gXCJcIjtcbmNvbnN0IF9sb2dnZXJNYXAgPSBuZXcgTWFwPHN0cmluZywgRW50cnlMb2dnZXI+KCk7XG5cbmNvbnN0IHN0dWIgPSAoKSA9PiB7fTtcblxuZnVuY3Rpb24gaW5pdExvZ2dlcihsb2dnZXI6IElMb2dnZXIsIHRhZ05hbWU6IHN0cmluZywgZmlsdGVyOiBzdHJpbmcpIHtcbiAgbG9nZ2VyLmRlYnVnID0gc3R1YjtcbiAgbG9nZ2VyLmluZm8gPSBzdHViO1xuICBsb2dnZXIubm90aWNlID0gc3R1YjtcbiAgbG9nZ2VyLndhcm4gPSBzdHViO1xuICBsb2dnZXIuZXJyb3IgPSBzdHViO1xuICBsb2dnZXIuZmF0YWwgPSBzdHViO1xuXG4gIGxldCBsZXZlbCA9IDA7XG4gIGNvbnN0IGZsYWdzOiBhbnkgPSB7fTtcbiAgZm9yIChjb25zdCBpdGVyIG9mIGZpbHRlci5zcGxpdChcIixcIikpIHtcbiAgICBpZiAoaXRlciA9PT0gXCIqXCIpIHtcbiAgICAgIGxldmVsID0gNTtcbiAgICAgIGJyZWFrO1xuICAgIH1cbiAgICBpZiAoL15cXGQrJC8udGVzdChpdGVyKSlcbiAgICAgIGxldmVsID0gTWF0aC5tYXgobGV2ZWwsIHBhcnNlSW50KGl0ZXIpKTtcbiAgICBlbHNlXG4gICAgICBmbGFnc1tpdGVyXSA9IHRydWU7XG4gIH1cblxuICBsb2dnZXIuZmF0YWwgPSBtYWtlTG9nTWV0aG9kKGxldmVsID4gMiwgXCJGXCIsIHRhZ05hbWUsIGNvbnNvbGUsIGNvbnNvbGUuZXJyb3IpO1xuXG4gIGlmIChsZXZlbCA+IDEgfHwgZmxhZ3MuZXJyb3IpXG4gICAgbG9nZ2VyLmVycm9yID0gbWFrZUxvZ01ldGhvZChsZXZlbCA+IDIsIFwiRVwiLCB0YWdOYW1lLCBjb25zb2xlLCBjb25zb2xlLmVycm9yKTtcblxuICBpZiAobGV2ZWwgPiAyIHx8IGZsYWdzLndhcm4pXG4gICAgbG9nZ2VyLndhcm4gPSBtYWtlTG9nTWV0aG9kKGxldmVsID4gMiwgXCJXXCIsIHRhZ05hbWUsIGNvbnNvbGUsIGNvbnNvbGUud2Fybik7XG5cbiAgbG9nZ2VyLm5vdGljZSA9IG1ha2VMb2dNZXRob2QobGV2ZWwgPiAyLCBcIk5cIiwgdGFnTmFtZSwgY29uc29sZSwgY29uc29sZS5sb2cpO1xuXG4gIGlmIChsZXZlbCA+IDMgfHwgZmxhZ3MuaW5mbylcbiAgICBsb2dnZXIuaW5mbyA9IG1ha2VMb2dNZXRob2QobGV2ZWwgPiAyLCBcIklcIiwgdGFnTmFtZSwgY29uc29sZSwgY29uc29sZS5pbmZvKTtcblxuICBpZiAobGV2ZWwgPiA0IHx8IGZsYWdzLmRlYnVnKVxuICAgIGxvZ2dlci5kZWJ1ZyA9IG1ha2VMb2dNZXRob2QobGV2ZWwgPiAyLCBcIkRcIiwgdGFnTmFtZSwgY29uc29sZSwgY29uc29sZS5kZWJ1Zyk7XG59XG5cbmZ1bmN0aW9uIGNyZWF0ZUVudHJ5KHRhZ05hbWU6IHN0cmluZywgZmlsdGVyOiBzdHJpbmcpIHtcbiAgY29uc3QgZW50cnkgPSB7IHRhZ05hbWUsIGZpbHRlciwgbG9nZ2VyOiB7fSBhcyBJTG9nZ2VyIH07XG4gIGluaXRMb2dnZXIoZW50cnkubG9nZ2VyLCB0YWdOYW1lLCBmaWx0ZXIpO1xuICByZXR1cm4gZW50cnk7XG59XG5cbmZ1bmN0aW9uIGVudHJ5U2V0RmlsdGVyKGVudHJ5OiBFbnRyeUxvZ2dlciwgZmlsdGVyOiBzdHJpbmcpIHtcbiAgaWYgKGVudHJ5LmZpbHRlciAhPT0gZmlsdGVyKSB7XG4gICAgaW5pdExvZ2dlcihlbnRyeS5sb2dnZXIsIGVudHJ5LnRhZ05hbWUsIGZpbHRlcik7XG4gICAgZW50cnkuZmlsdGVyID0gZmlsdGVyO1xuICB9XG59XG5cbmZ1bmN0aW9uIGFsbFNldEZpbHRlcihmaWx0ZXI6IHN0cmluZykge1xuICBfZGVmYXVsdFBhdHRlcm4gPSBmaWx0ZXI7XG4gIGZvciAoY29uc3QgZW50cnkgb2YgX2xvZ2dlck1hcC52YWx1ZXMoKSlcbiAgICBlbnRyeVNldEZpbHRlcihlbnRyeSwgZmlsdGVyKTtcbn1cblxuZXhwb3J0IG5hbWVzcGFjZSBMb2dnZXIge1xuXG5leHBvcnQgZnVuY3Rpb24gY3JlYXRlKHVybDogc3RyaW5nKTogSUxvZ2dlciB7XG4gIGNvbnN0IHRhZ05hbWUgPSB1cmwuc3RhcnRzV2l0aChIT1NUX1NPVVJDRV9VUkwgKyBcIi9cIikgPyB1cmwuc3Vic3RyaW5nKEhPU1RfU09VUkNFX1VSTC5sZW5ndGggKyAxKSA6IHVybDtcbiAgaWYgKCF0YWdOYW1lIHx8IHRhZ05hbWUgPT09IFwiKlwiKVxuICAgIHRocm93IG5ldyBFcnJvcihgTG9nZ2VyICR7dXJsfSBub3QgYWxsb3dlZGApO1xuXG4gIGxldCBlbnRyeSA9IF9sb2dnZXJNYXAuZ2V0KHRhZ05hbWUpO1xuICBpZiAoIWVudHJ5KSB7XG4gICAgZW50cnkgPSBjcmVhdGVFbnRyeSh0YWdOYW1lLCBfZGVmYXVsdFBhdHRlcm4pO1xuICAgIF9sb2dnZXJNYXAuc2V0KHRhZ05hbWUsIGVudHJ5KTtcbiAgfVxuXG4gIHJldHVybiBlbnRyeS5sb2dnZXI7XG59XG5cbmV4cG9ydCBmdW5jdGlvbiBlbmFibGUoZmlsdGVyOiBzdHJpbmcpIHtcbiAgaWYgKGZpbHRlciA9PT0gXCIqXCIpIHtcbiAgICBhbGxTZXRGaWx0ZXIoXCIqXCIpO1xuICAgIHJldHVybjtcbiAgfVxuXG4gIGNvbnN0IHBhaXIgPSBmaWx0ZXIuc3BsaXQoXCI6XCIpO1xuICBpZiAocGFpci5sZW5ndGggPCAyKVxuICAgIHJldHVybjtcblxuICBpZiAocGFpclswXSA9PT0gXCIqXCIpIHtcbiAgICBhbGxTZXRGaWx0ZXIocGFpclsxXSk7XG4gICAgcmV0dXJuO1xuICB9XG5cbiAgbGV0IGVudHJ5ID0gX2xvZ2dlck1hcC5nZXQocGFpclswXSk7XG4gIGlmICghZW50cnkpIHtcbiAgICBlbnRyeSA9IGNyZWF0ZUVudHJ5KHBhaXJbMF0sIHBhaXJbMV0pO1xuICAgIF9sb2dnZXJNYXAuc2V0KGZpbHRlciwgZW50cnkpO1xuICB9XG4gIGVsc2UgIHtcbiAgICBlbnRyeVNldEZpbHRlcihlbnRyeSwgcGFpclsxXSk7XG4gIH1cbn1cblxufSAvLyBuYW1lc3BhY2UgTG9nZ2VyXG5cbmZvciAoY29uc3QgaXRlciBvZiBMT0dHRVJfREVCVUcpIHtcbiAgTG9nZ2VyLmVuYWJsZShpdGVyKTtcbn1cbiIsIi8qXG4gKiBNSVQgTGljZW5zZVxuICpcbiAqIENvcHlyaWdodCAoYykgMjAyNSAgWXVyaWkgWWFrdWJpbiAoeXVyaWkueWFrdWJpbkBnbWFpbC5jb20pXG4gKlxuICogUGVybWlzc2lvbiBpcyBncmFudGVkIHRvIHVzZSwgY29weSwgbW9kaWZ5LCBhbmQgZGlzdHJpYnV0ZSB0aGlzIHNvZnR3YXJlXG4gKiB1bmRlciB0aGUgTUlUIExpY2Vuc2UuIFNlZSBMSUNFTlNFIGZpbGUgZm9yIGRldGFpbHMuXG4gKi9cblxuaW1wb3J0IHsgSlNPTlJQQ19WRVJTSU9OIH0gZnJvbSBcIkAvc2VydmVyL1RyYW5zcG9ydFwiO1xuaW1wb3J0IHsgSVJlcXVlc3RTeW5jIH0gZnJvbSBcIkAvc2VydmVyL1RyYW5zcG9ydFwiO1xuaW1wb3J0IHsgTG9nZ2VyIH0gZnJvbSBcIkAvbG9nZ2VyXCI7XG5cbmNvbnN0IGxvZ2dlciA9IExvZ2dlci5jcmVhdGUoaW1wb3J0Lm1ldGEudXJsKTtcblxuZXhwb3J0IGNsYXNzIEpzb25ScGNSZXF1ZXN0U3luYyB7XG4gIHByaXZhdGUgX3JlcXVlc3Q6IElSZXF1ZXN0U3luYztcbiAgcHJpdmF0ZSBfaWQ6IG51bWJlcjtcblxuICBwdWJsaWMgY29uc3RydWN0b3IocmVxdWVzdFN5bmM6IElSZXF1ZXN0U3luYykge1xuICAgIHRoaXMuX3JlcXVlc3QgPSByZXF1ZXN0U3luYztcbiAgICB0aGlzLl9pZCA9IDE7XG4gIH1cblxuICBwdWJsaWMgcmVxdWVzdFN5bmMobWV0aG9kOiBzdHJpbmcsIHBhcmFtczogYW55KTogYW55IHtcbiAgICBsb2dnZXIuZGVidWcoXCJKc29uUnBjUmVxdWVzdFN5bmMucmVxdWVzdFN5bmMoXCIsIG1ldGhvZCwgXCIuLi5wYXJhbXMpXCIpO1xuICAgIGNvbnN0IG1lc3NhZ2UgPSB7XG4gICAgICBqc29ucnBjOiBKU09OUlBDX1ZFUlNJT04sXG4gICAgICBtZXRob2QsXG4gICAgICBwYXJhbXMsXG4gICAgICBpZDogdGhpcy5faWQrKyxcbiAgICB9O1xuICAgIGNvbnN0IHJlc3BvbnNlID0gdGhpcy5fcmVxdWVzdC5yZXF1ZXN0U3luYyhtZXNzYWdlKTtcbiAgICBpZiAocmVzcG9uc2UuZXJyb3IpXG4gICAgICB0aHJvdyBuZXcgRXJyb3IocmVzcG9uc2UuZXJyb3IubWVzc2FnZSwgeyBjYXVzZTogcmVzcG9uc2UuZXJyb3IuY29kZSB9KTtcbiAgICByZXR1cm4gcmVzcG9uc2UucmVzdWx0O1xuICB9XG59O1xuIiwiLypcbiAqIE1JVCBMaWNlbnNlXG4gKlxuICogQ29weXJpZ2h0IChjKSAyMDI1ICBZdXJpaSBZYWt1YmluICh5dXJpaS55YWt1YmluQGdtYWlsLmNvbSlcbiAqXG4gKiBQZXJtaXNzaW9uIGlzIGdyYW50ZWQgdG8gdXNlLCBjb3B5LCBtb2RpZnksIGFuZCBkaXN0cmlidXRlIHRoaXMgc29mdHdhcmVcbiAqIHVuZGVyIHRoZSBNSVQgTGljZW5zZS4gU2VlIExJQ0VOU0UgZmlsZSBmb3IgZGV0YWlscy5cbiAqL1xuXG5pbXBvcnQgeyBKU09OUlBDX1ZFUlNJT04sIElNZXNzYWdlU2VuZGVyLCBKc29uUnBjRGF0YSwgSnNvblJwY1JlcXVlc3RIYW5kbGVyLCBJSnNvblJwY1JlcXVlc3QsIElKc29uUnBjUmVzcG9uc2UsIEpzb25ScGNDYWxsYmFjayB9IGZyb20gXCJAL3NlcnZlci9UcmFuc3BvcnRcIjtcbmltcG9ydCB7IExvZ2dlciB9IGZyb20gXCJAL2xvZ2dlclwiO1xuXG5jb25zdCBsb2dnZXIgPSBMb2dnZXIuY3JlYXRlKGltcG9ydC5tZXRhLnVybCk7XG5cbmNsYXNzIEpzb25ScGNSZXF1ZXN0IGltcGxlbWVudHMgSUpzb25ScGNSZXF1ZXN0IHtcbiAgcHJpdmF0ZSBfcGFyYW1zOiBhbnk7XG5cbiAgY29uc3RydWN0b3IocGFyYW1zOiBhbnkpIHtcbiAgICB0aGlzLl9wYXJhbXMgPSBwYXJhbXM7XG4gIH1cblxuICBnZXQgcGFyYW1zKCk6IGFueSB7XG4gICAgcmV0dXJuIHRoaXMuX3BhcmFtcztcbiAgfVxufVxuXG5jbGFzcyBKc29uUnBjUmVzcG9uc2UgaW1wbGVtZW50cyBJSnNvblJwY1Jlc3BvbnNlIHtcbiAgcHJpdmF0ZSBfc2VuZGVyOiBJTWVzc2FnZVNlbmRlcjtcbiAgcHJpdmF0ZSBfaWQ6IG51bWJlcjtcblxuICBwdWJsaWMgY29uc3RydWN0b3Ioc2VuZGVyOiBJTWVzc2FnZVNlbmRlciwgaWQ6IG51bWJlcikge1xuICAgIHRoaXMuX3NlbmRlciA9IHNlbmRlcjtcbiAgICB0aGlzLl9pZCA9IGlkO1xuICB9XG5cbiAgc2VuZFJlc3VsdChyZXN1bHQ6IGFueSk6IHZvaWQge1xuICAgIGNvbnN0IG1lc3NhZ2U6IEpzb25ScGNEYXRhID0ge1xuICAgICAganNvbnJwYzogSlNPTlJQQ19WRVJTSU9OLFxuICAgICAgcmVzdWx0OiAocmVzdWx0ICE9PSB1bmRlZmluZWQpID8gcmVzdWx0IDogbnVsbCxcbiAgICAgIGlkOiB0aGlzLl9pZCxcbiAgICB9O1xuICAgIGxvZ2dlci5kZWJ1ZyhcIjwtLVwiLCBKU09OLnN0cmluZ2lmeShtZXNzYWdlKSk7XG4gICAgdGhpcy5fc2VuZGVyLnNlbmRNZXNzYWdlKG1lc3NhZ2UpO1xuICB9XG5cbiAgc2VuZEVycm9yKGNvZGU6IG51bWJlciwgbWVzc2FnZTogc3RyaW5nLCBkYXRhPzogYW55KTogdm9pZCB7XG4gICAgY29uc3QgZXJyb3I6IGFueSA9IHsgY29kZSwgbWVzc2FnZSB9O1xuICAgIGlmIChkYXRhICE9PSB1bmRlZmluZWQpIHtcbiAgICAgIGVycm9yLmRhdGEgPSBkYXRhO1xuICAgIH1cbiAgICBjb25zdCBtc2c6IEpzb25ScGNEYXRhID0ge1xuICAgICAganNvbnJwYzogSlNPTlJQQ19WRVJTSU9OLFxuICAgICAgZXJyb3IsXG4gICAgICBpZDogdGhpcy5faWQsXG4gICAgfTtcbiAgICBsb2dnZXIuZGVidWcoXCI8LS1cIiwgSlNPTi5zdHJpbmdpZnkobXNnKSk7XG4gICAgdGhpcy5fc2VuZGVyLnNlbmRNZXNzYWdlKG1zZyk7XG4gIH1cbn07XG5cbmV4cG9ydCBjbGFzcyBKc29uUnBjU2VydmVyIHtcbiAgcHJpdmF0ZSBfcmVxdWVzdEhhbmRsZXJzID0gbmV3IE1hcDxzdHJpbmcsIEpzb25ScGNSZXF1ZXN0SGFuZGxlcj4oKTtcblxuICBwdWJsaWMgY29uc3RydWN0b3IoKSB7XG4gIH1cblxuICBwdWJsaWMgcmVnaXN0ZXJIYW5kbGVyKG1ldGhvZDogc3RyaW5nLCBoYW5kbGVyOiBKc29uUnBjUmVxdWVzdEhhbmRsZXIpOiB2b2lkIHtcbiAgICB0aGlzLl9yZXF1ZXN0SGFuZGxlcnMuc2V0KG1ldGhvZCwgaGFuZGxlcik7XG4gIH1cblxuICBwdWJsaWMgcmVnaXN0ZXJDYWxsYmFjayhtZXRob2Q6IHN0cmluZywgY2FsbGJhY2s6IEpzb25ScGNDYWxsYmFjayk6IHZvaWQge1xuICAgIHRoaXMuX3JlcXVlc3RIYW5kbGVycy5zZXQobWV0aG9kLCBhc3luYyAocmVxdWVzdCwgcmVzcG9uc2UpID0+IHtcbiAgICAgIGxldCByZXN1bHQ6IGFueSA9IGNhbGxiYWNrKHJlcXVlc3QucGFyYW1zKTtcbiAgICAgIGlmIChyZXN1bHQgaW5zdGFuY2VvZiBQcm9taXNlKVxuICAgICAgICByZXN1bHQgPSBhd2FpdCByZXN1bHQ7XG4gICAgICBpZiAocmVzdWx0ICYmIHR5cGVvZiByZXN1bHQgPT09IFwib2JqZWN0XCIgJiYgdHlwZW9mIHJlc3VsdC50b0pTT04gPT09IFwiZnVuY3Rpb25cIilcbiAgICAgICAgcmVzdWx0ID0gcmVzdWx0LnRvSlNPTigpO1xuICAgICAgcmVzcG9uc2Uuc2VuZFJlc3VsdChyZXN1bHQpO1xuICAgIH0pO1xuICB9XG5cbiAgcHVibGljIG9uUmVxdWVzdChzZW5kZXI6IElNZXNzYWdlU2VuZGVyLCBtZXRob2Q6IGFueSwgaWQ6IGFueSwgcGFyYW1zOiBhbnkpOiB2b2lkIHtcbiAgICBjb25zdCBoYW5kbGVyID0gKHR5cGVvZiBtZXRob2QgPT09IFwic3RyaW5nXCIpID8gdGhpcy5fcmVxdWVzdEhhbmRsZXJzLmdldChtZXRob2QpIDogdW5kZWZpbmVkO1xuICAgIGNvbnN0IHJlc3BvbnNlID0gbmV3IEpzb25ScGNSZXNwb25zZShzZW5kZXIsIGlkKTtcbiAgICBpZiAoaGFuZGxlcikge1xuICAgICAgaGFuZGxlcihuZXcgSnNvblJwY1JlcXVlc3QocGFyYW1zKSwgcmVzcG9uc2UpO1xuICAgIH1cbiAgICBlbHNlIHtcbiAgICAgIHJlc3BvbnNlLnNlbmRFcnJvcigtMzI2MDEsIFwiTWV0aG9kIG5vdCBmb3VuZFwiKTtcbiAgICB9XG4gIH1cblxuICBwdWJsaWMgb25SZXN1bHQoc2VuZGVyOiBJTWVzc2FnZVNlbmRlciwgcmVzdWx0OiBhbnksIGlkOiBudW1iZXIpOiB2b2lkIHtcbiAgICBcbiAgfVxuXG4gIHB1YmxpYyBvbkVycm9yKHNlbmRlcjogSU1lc3NhZ2VTZW5kZXIsIGVycm9yOiBvYmplY3QsIGlkOiBudW1iZXIgfCBudWxsKTogdm9pZCB7XG4gICAgXG4gIH1cblxuICBwdWJsaWMgb25Ob3RpZmljYXRpb24oc2VuZGVyOiBJTWVzc2FnZVNlbmRlciwgbWV0aG9kOiBhbnksIHBhcmFtcz86IGFueSk6IHZvaWQge1xuICAgIFxuICB9XG5cbiAgcHJpdmF0ZSBvbk1lc3NhZ2VJbXBsKHNlbmRlcjogSU1lc3NhZ2VTZW5kZXIsIG1lc3NhZ2U6IGFueSk6IHZvaWQge1xuICAgIGlmICghbWVzc2FnZSB8fCB0eXBlb2YgbWVzc2FnZSAhPT0gXCJvYmplY3RcIikge1xuICAgICAgcmV0dXJuO1xuICAgIH1cblxuICAgIGNvbnN0IGRhdGEgPSBtZXNzYWdlIGFzIEpzb25ScGNEYXRhO1xuXG4gICAgaWYgKE9iamVjdC5oYXNPd24oZGF0YSwgXCJtZXRob2RcIikpIHtcbiAgICAgIGlmIChPYmplY3QuaGFzT3duKGRhdGEsIFwiaWRcIikpXG4gICAgICAgIHRoaXMub25SZXF1ZXN0KHNlbmRlciwgZGF0YS5tZXRob2QsIGRhdGEuaWQsIGRhdGEucGFyYW1zKTtcbiAgICAgIGVsc2VcbiAgICAgICAgdGhpcy5vbk5vdGlmaWNhdGlvbihzZW5kZXIsIGRhdGEubWV0aG9kLCBkYXRhLnBhcmFtcyk7XG4gICAgfVxuICAgIGVsc2UgaWYgKGRhdGEuaWQpIHtcbiAgICAgIFxuICAgIH1cbiAgICBlbHNlIHtcblxuICAgIH1cbiAgfVxuXG4gIHB1YmxpYyBlbWl0TWVzc2FnZShzZW5kZXI6IElNZXNzYWdlU2VuZGVyLCBtZXNzYWdlOiBhbnkpOiB2b2lkIHtcbiAgICBsb2dnZXIuZGVidWcoXCItLT5cIiwgSlNPTi5zdHJpbmdpZnkobWVzc2FnZSkpO1xuICAgIGlmIChBcnJheS5pc0FycmF5KG1lc3NhZ2UpKVxuICAgICAgbWVzc2FnZS5mb3JFYWNoKG1zZyA9PiB0aGlzLm9uTWVzc2FnZUltcGwoc2VuZGVyLCBtc2cpKTtcbiAgICBlbHNlXG4gICAgICB0aGlzLm9uTWVzc2FnZUltcGwoc2VuZGVyLCBtZXNzYWdlKTtcbiAgfVxufTtcbiIsIi8qXG4gKiBNSVQgTGljZW5zZVxuICpcbiAqIENvcHlyaWdodCAoYykgMjAyNSAgWXVyaWkgWWFrdWJpbiAoeXVyaWkueWFrdWJpbkBnbWFpbC5jb20pXG4gKlxuICogUGVybWlzc2lvbiBpcyBncmFudGVkIHRvIHVzZSwgY29weSwgbW9kaWZ5LCBhbmQgZGlzdHJpYnV0ZSB0aGlzIHNvZnR3YXJlXG4gKiB1bmRlciB0aGUgTUlUIExpY2Vuc2UuIFNlZSBMSUNFTlNFIGZpbGUgZm9yIGRldGFpbHMuXG4gKi9cblxuaW1wb3J0IHsgV29ya2VyIH0gZnJvbSBcIm5vZGU6d29ya2VyX3RocmVhZHNcIjtcblxuaW1wb3J0IHsgY3VycmVudFNjcmlwdFVSTCB9IGZyb20gXCJAL3V0aWxzL01vZHVsZVwiO1xuaW1wb3J0IHsgTWVtb3J5TWVzc2FnZVNlbmRlciB9IGZyb20gXCJAL3NlcnZlci9NZW1vcnlUcmFuc3BvcnRcIjtcbmltcG9ydCB7IFdvcmtlclNlbmRlciB9IGZyb20gXCJAL3NlcnZlci9Xb3JrZXJTZW5kZXJcIjtcbmltcG9ydCB7IEpTT05SUENfVkVSU0lPTiB9IGZyb20gXCJAL3NlcnZlci9UcmFuc3BvcnRcIjtcbmltcG9ydCB7IEpzb25ScGNTZXJ2ZXIgfSBmcm9tIFwiQC9zZXJ2ZXIvSnNvblJwY1NlcnZlclwiO1xuaW1wb3J0IHsgU2NvcGVIZWxwZXIsIFZhcmlhYmxlTWFwIH0gZnJvbSBcIkAvY29yZS9TY29wZVwiO1xuaW1wb3J0IHsgTWFpblRhcmdldCwgUG9zdFRhcmdldCB9IGZyb20gXCJAL2NvcmUvVGFyZ2V0XCI7XG5pbXBvcnQgeyBQb3N0Q3VzdG9tU2NyaXB0LCBDdXN0b21TY3JpcHQgfSBmcm9tIFwiQC9jb3JlL0N1c3RvbVNjcmlwdFwiO1xuaW1wb3J0IHsgSW5zdGFsbEVudGl0eSB9IGZyb20gXCJAL2NvcmUvSW5zdGFsbEVudGl0eVwiO1xuaW1wb3J0IHsgU2ltcGxlT2JqZWN0IH0gZnJvbSBcIkAvY29yZS9TaW1wbGVPYmplY3RcIjtcbmltcG9ydCB7IFdPUktFUk5PREVfU1RBUlRNQUtFU0NSSVBUIH0gZnJvbSBcIkAvc2VydmVyL1JlbW90ZU1ldGhvZHNcIjtcbmltcG9ydCB7IFdPUktFUk5PREVfTUFJTlRBUkdFVFMgfSBmcm9tIFwiQC9zZXJ2ZXIvUmVtb3RlTWV0aG9kc1wiO1xuaW1wb3J0IHsgV09SS0VSTk9ERV9QT1NUVEFSR0VUUyB9IGZyb20gXCJAL3NlcnZlci9SZW1vdGVNZXRob2RzXCI7XG5pbXBvcnQgeyBXT1JLRVJOT0RFX01BSU5TQ1JJUFRTIH0gZnJvbSBcIkAvc2VydmVyL1JlbW90ZU1ldGhvZHNcIjtcbmltcG9ydCB7IFdPUktFUk5PREVfUE9TVFNDUklQVFMgfSBmcm9tIFwiQC9zZXJ2ZXIvUmVtb3RlTWV0aG9kc1wiO1xuaW1wb3J0IHsgV09SS0VSTk9ERV9JTlNUQUxMRU5UUklFUyB9IGZyb20gXCJAL3NlcnZlci9SZW1vdGVNZXRob2RzXCI7XG5pbXBvcnQgeyBXT1JLRVJOT0RFX1BST0NFU1NFWElUIH0gZnJvbSBcIkAvc2VydmVyL1JlbW90ZU1ldGhvZHNcIjtcbmltcG9ydCB7IExvZ2dlciB9IGZyb20gXCJAL2xvZ2dlclwiO1xuXG5jb25zdCBsb2dnZXIgPSBMb2dnZXIuY3JlYXRlKGltcG9ydC5tZXRhLnVybCk7XG5cbmludGVyZmFjZSBSZXNwb25zZUVudHJ5IHtcbiAgcmVzb2x2ZTogKHZhbHVlOiBhbnkpID0+IHZvaWQ7XG4gIHJlamVjdDogKHJlYXNvbj86IGFueSkgPT4gdm9pZDtcbn07XG5cbmV4cG9ydCBjbGFzcyBXb3JrZXJScGNDbGllbnQge1xuICBwcml2YXRlIF9qc29uUnBjU2VydmVyOiBKc29uUnBjU2VydmVyO1xuICBwcml2YXRlIF93b3JrZXI6IFdvcmtlcjtcbiAgcHJpdmF0ZSBfaWQgPSAxO1xuICBwcml2YXRlIF93YWl0UmVzcG9uc2VNYXAgPSBuZXcgTWFwPG51bWJlcixSZXNwb25zZUVudHJ5PigpOztcblxuICBwdWJsaWMgY29uc3RydWN0b3IoanNvblJwY1NlcnZlcjogSnNvblJwY1NlcnZlcikge1xuICAgIHRoaXMuX2pzb25ScGNTZXJ2ZXIgPSBqc29uUnBjU2VydmVyO1xuICAgIHRoaXMuX3dvcmtlciA9IG5ldyBXb3JrZXIoY3VycmVudFNjcmlwdFVSTCgpKTtcbiAgICB0aGlzLl93b3JrZXIub24oXCJtZXNzYWdlXCIsIG1lc3NhZ2UgPT4gdGhpcy5vbldvcmtlck1lc3NhZ2UobWVzc2FnZSkpO1xuICAgIHRoaXMuX3dvcmtlci5vbihcImVycm9yXCIsIGVycm9yID0+IHRoaXMub25Xb3JrZXJFcnJvcihlcnJvcikpO1xuICAgIHRoaXMuX3dvcmtlci5vbihcImV4aXRcIiwgY29kZSA9PiB0aGlzLm9uV29ya2VyRXhpdChjb2RlKSk7XG4gIH1cblxuICAvKnB1YmxpYyBzdG9wU2VydmVyKCk6IFByb21pc2U8bnVtYmVyPiB7XG4gICAgcmV0dXJuIHRoaXMuX3dvcmtlci50ZXJtaW5hdGUoKTtcbiAgfSovXG5cbiAgcHVibGljIGFzeW5jIHJlcXVlc3QobWV0aG9kOiBzdHJpbmcsIHBhcmFtczogYW55KTogUHJvbWlzZTxhbnk+IHtcbiAgICBjb25zdCBpZCA9IHRoaXMuX2lkKys7XG4gICAgY29uc3QgcmVzdWx0ID0gbmV3IFByb21pc2U8YW55PigocmVzb2x2ZSwgcmVqZWN0KSA9PiB7XG4gICAgICB0aGlzLl93YWl0UmVzcG9uc2VNYXAuc2V0KGlkLCB7IHJlc29sdmUsIHJlamVjdCB9KTtcbiAgICB9KTtcbiAgICB0aGlzLl93b3JrZXIucG9zdE1lc3NhZ2Uoe1xuICAgICAganNvbnJwYzogSlNPTlJQQ19WRVJTSU9OLFxuICAgICAgbWV0aG9kLFxuICAgICAgcGFyYW1zLFxuICAgICAgaWQsXG4gICAgfSk7XG4gICAgcmV0dXJuIHJlc3VsdDtcbiAgfVxuXG4gIHByaXZhdGUgb25Xb3JrZXJNZXNzYWdlKG1lc3NhZ2U6IGFueSkge1xuICAgIGlmIChtZXNzYWdlIGluc3RhbmNlb2YgU2hhcmVkQXJyYXlCdWZmZXIpIHtcbiAgICAgIGNvbnN0IG10ID0gbmV3IE1lbW9yeU1lc3NhZ2VTZW5kZXIobWVzc2FnZSlcbiAgICAgIHRoaXMuX2pzb25ScGNTZXJ2ZXIuZW1pdE1lc3NhZ2UobXQsIG10LnJlYWRNZXNzYWdlKCkpO1xuICAgIH1cbiAgICBlbHNlIGlmIChPYmplY3QuaGFzT3duKG1lc3NhZ2UsIFwibWV0aG9kXCIpKSB7XG4gICAgICBjb25zdCBzZW5kZXIgPSBuZXcgV29ya2VyU2VuZGVyKHRoaXMuX3dvcmtlcik7XG4gICAgICB0aGlzLl9qc29uUnBjU2VydmVyLmVtaXRNZXNzYWdlKHNlbmRlciwgbWVzc2FnZSk7XG4gICAgfVxuICAgIGVsc2UgaWYgKE9iamVjdC5oYXNPd24obWVzc2FnZSwgXCJpZFwiKSkge1xuICAgICAgY29uc3QgcHJvbWlzZSA9IHRoaXMuX3dhaXRSZXNwb25zZU1hcC5nZXQobWVzc2FnZS5pZCk7XG4gICAgICBpZiAoIXByb21pc2UpXG4gICAgICAgIHRocm93IG5ldyBFcnJvcihgVW5rbm93biByZXNwb25zZSBcIiR7bWVzc2FnZS5pZH1cIiBpZGApO1xuICAgICAgaWYgKE9iamVjdC5oYXNPd24obWVzc2FnZSwgXCJyZXN1bHRcIikpXG4gICAgICAgIHByb21pc2UucmVzb2x2ZShtZXNzYWdlLnJlc3VsdCk7XG4gICAgICBlbHNlIGlmIChPYmplY3QuaGFzT3duKG1lc3NhZ2UsIFwiZXJyb3JcIikpXG4gICAgICAgIHByb21pc2UucmVqZWN0KG1lc3NhZ2UuZXJyb3IpO1xuICAgICAgZWxzZVxuICAgICAgICB0aHJvdyBuZXcgRXJyb3IoYFVua25vd24gbWVzc2FnZSB0eXBlIG9mIFwiJHttZXNzYWdlfVwiYCk7XG4gICAgfVxuICB9XG5cbiAgcHJpdmF0ZSBvbldvcmtlckVycm9yKGVycm9yOiBFcnJvcikge1xuICAgIGlmIChlcnJvciBpbnN0YW5jZW9mIEVycm9yKVxuICAgICAgbG9nZ2VyLmZhdGFsKGVycm9yLnN0YWNrKTtcbiAgICBlbHNlXG4gICAgICBsb2dnZXIuZmF0YWwoZXJyb3IpO1xuICAgIHByb2Nlc3MuZXhpdCgxKTtcbiAgfVxuXG4gIHByaXZhdGUgb25Xb3JrZXJFeGl0KGNvZGU6IG51bWJlcikge1xuICAgIGlmIChjb2RlKVxuICAgICAgdGhyb3cgbmV3IEVycm9yKGBXb3J0a2VyIHJldHVybiBleGl0IGNvZGUgJHtjb2RlfWApO1xuICB9XG59O1xuXG5leHBvcnQgY2xhc3MgTWFrZUNsaWVudCB7XG4gIHByaXZhdGUgX3dvcmtlclJwYzogV29ya2VyUnBjQ2xpZW50O1xuICBwcml2YXRlIF9tYWluVGFyZ2V0cyA9IG5ldyBBcnJheTxNYWluVGFyZ2V0PjtcbiAgcHJpdmF0ZSBfcG9zdFRhcmdldHMgPSBuZXcgQXJyYXk8UG9zdFRhcmdldD47XG4gIHByaXZhdGUgX21haW5TY3JpcHRzID0gbmV3IEFycmF5PEN1c3RvbVNjcmlwdD47XG4gIHByaXZhdGUgX3Bvc3RTY3JpcHRzID0gbmV3IEFycmF5PFBvc3RDdXN0b21TY3JpcHQ+O1xuICBwcml2YXRlIF9pbnN0YWxsRW50cmllcyA9IG5ldyBBcnJheTxJbnN0YWxsRW50aXR5PjtcblxuICBwdWJsaWMgY29uc3RydWN0b3IoanNvblJwY1NlcnZlcjogSnNvblJwY1NlcnZlcikge1xuICAgIHRoaXMuX3dvcmtlclJwYyA9IG5ldyBXb3JrZXJScGNDbGllbnQoanNvblJwY1NlcnZlcik7XG4gIH1cblxuICBwdWJsaWMgYXN5bmMgZXhlY01ha2VTY3JpcHQodmFyaWFibGVNYXA6IFZhcmlhYmxlTWFwKTogUHJvbWlzZTx2b2lkPiB7XG4gICAgY29uc3QgY3dkU2F2ZSA9IHByb2Nlc3MuY3dkKCk7XG4gICAgY29uc3Qgc2NyaXB0RGlyID0gU2NvcGVIZWxwZXIuZ2V0KHZhcmlhYmxlTWFwLCBcIlNDUklQVF9ESVJcIik7XG4gICAgcHJvY2Vzcy5jaGRpcihzY3JpcHREaXIudG9TdHJpbmcoKSk7XG4gICAgYXdhaXQgdGhpcy5fd29ya2VyUnBjLnJlcXVlc3QoV09SS0VSTk9ERV9TVEFSVE1BS0VTQ1JJUFQsIFNjb3BlSGVscGVyLnRvSlNPTih2YXJpYWJsZU1hcCkpO1xuICAgIHByb2Nlc3MuY2hkaXIoY3dkU2F2ZSk7XG5cbiAgICBjb25zdCBtYWluVGFyZ2V0cyA9IGF3YWl0IHRoaXMuX3dvcmtlclJwYy5yZXF1ZXN0KFdPUktFUk5PREVfTUFJTlRBUkdFVFMsIG51bGwpO1xuICAgIHRoaXMuX21haW5UYXJnZXRzID0gU2ltcGxlT2JqZWN0LmZyb21KU09OKG1haW5UYXJnZXRzKTtcblxuICAgIGNvbnN0IHBvc3RUYXJnZXRzID0gYXdhaXQgdGhpcy5fd29ya2VyUnBjLnJlcXVlc3QoV09SS0VSTk9ERV9QT1NUVEFSR0VUUywgbnVsbCk7XG4gICAgdGhpcy5fcG9zdFRhcmdldHMgPSBTaW1wbGVPYmplY3QuZnJvbUpTT04ocG9zdFRhcmdldHMpO1xuXG4gICAgY29uc3QgbWFpblNjcmlwdHMgPSBhd2FpdCB0aGlzLl93b3JrZXJScGMucmVxdWVzdChXT1JLRVJOT0RFX01BSU5TQ1JJUFRTLCBudWxsKTtcbiAgICB0aGlzLl9tYWluU2NyaXB0cyA9IFNpbXBsZU9iamVjdC5mcm9tSlNPTihtYWluU2NyaXB0cyk7XG5cbiAgICBjb25zdCBwb3N0U2NyaXB0cyA9IGF3YWl0IHRoaXMuX3dvcmtlclJwYy5yZXF1ZXN0KFdPUktFUk5PREVfUE9TVFNDUklQVFMsIG51bGwpO1xuICAgIHRoaXMuX3Bvc3RTY3JpcHRzID0gU2ltcGxlT2JqZWN0LmZyb21KU09OKHBvc3RTY3JpcHRzKTtcblxuICAgIGNvbnN0IGluc3RhbGxFbnRyaWVzID0gYXdhaXQgdGhpcy5fd29ya2VyUnBjLnJlcXVlc3QoV09SS0VSTk9ERV9JTlNUQUxMRU5UUklFUywgbnVsbCk7XG4gICAgdGhpcy5faW5zdGFsbEVudHJpZXMgPSBTaW1wbGVPYmplY3QuZnJvbUpTT04oaW5zdGFsbEVudHJpZXMpO1xuXG4gICAgYXdhaXQgdGhpcy5fd29ya2VyUnBjLnJlcXVlc3QoV09SS0VSTk9ERV9QUk9DRVNTRVhJVCwgMCk7XG4gIH1cblxuICBwdWJsaWMgZ2V0IG1haW5UYXJnZXRzKCk6IE1haW5UYXJnZXRbXSB7XG4gICAgcmV0dXJuIHRoaXMuX21haW5UYXJnZXRzO1xuICB9XG5cbiAgcHVibGljIGdldCBwb3N0VGFyZ2V0cygpOiBQb3N0VGFyZ2V0W10ge1xuICAgIHJldHVybiB0aGlzLl9wb3N0VGFyZ2V0cztcbiAgfVxuXG4gIHB1YmxpYyBnZXQgbWFpblNjcmlwdHMoKTogQ3VzdG9tU2NyaXB0W10ge1xuICAgIHJldHVybiB0aGlzLl9tYWluU2NyaXB0cztcbiAgfVxuXG4gIHB1YmxpYyBnZXQgcG9zdFNjcmlwdHMoKTogUG9zdEN1c3RvbVNjcmlwdFtdIHtcbiAgICByZXR1cm4gdGhpcy5fcG9zdFNjcmlwdHM7XG4gIH1cblxuICBwdWJsaWMgZ2V0IGluc3RhbGxFbnRyaWVzKCk6IEluc3RhbGxFbnRpdHlbXSB7XG4gICAgcmV0dXJuIHRoaXMuX2luc3RhbGxFbnRyaWVzO1xuICB9XG59O1xuIiwiLypcbiAqIE1JVCBMaWNlbnNlXG4gKlxuICogQ29weXJpZ2h0IChjKSAyMDI1ICBZdXJpaSBZYWt1YmluICh5dXJpaS55YWt1YmluQGdtYWlsLmNvbSlcbiAqXG4gKiBQZXJtaXNzaW9uIGlzIGdyYW50ZWQgdG8gdXNlLCBjb3B5LCBtb2RpZnksIGFuZCBkaXN0cmlidXRlIHRoaXMgc29mdHdhcmVcbiAqIHVuZGVyIHRoZSBNSVQgTGljZW5zZS4gU2VlIExJQ0VOU0UgZmlsZSBmb3IgZGV0YWlscy5cbiAqL1xuXG5pbXBvcnQgZnMgZnJvbSBcIm5vZGU6ZnNcIjtcblxuaW1wb3J0IHsgUHJvamVjdENvbnRleHQgfSBmcm9tIFwiQC9jb3JlL1Byb2plY3RDb250ZXh0XCI7XG5pbXBvcnQgeyBTY3JpcHRDb250ZXh0IH0gZnJvbSBcIkAvY29yZS9TY3JpcHRDb250ZXh0XCI7XG5pbXBvcnQgeyBTY29wZUhlbHBlciwgVmFyaWFibGVNYXAgfSBmcm9tIFwiQC9jb3JlL1Njb3BlXCI7XG5pbXBvcnQgeyBNYWtlQ2xpZW50IH0gZnJvbSBcIkAvc2VydmVyL01ha2VDbGllbnRcIjtcbmltcG9ydCB7IEpzb25ScGNTZXJ2ZXIgfSBmcm9tIFwiQC9zZXJ2ZXIvSnNvblJwY1NlcnZlclwiO1xuaW1wb3J0IHsgaW1wb3J0TW9kdWxlIH0gZnJvbSBcIkAvdXRpbHMvTW9kdWxlXCI7XG5pbXBvcnQgeyBjcmVhdGVWYXJpYWJsZU1hcEZvckRpcmVjdG9yeSB9IGZyb20gXCJAL2NvcmUvQmFzZUNvbnRleHRcIjtcbmltcG9ydCB7IE1BSU5OT0RFX1NUQVJUTUFLRVNDUklQVCB9IGZyb20gXCJAL3NlcnZlci9SZW1vdGVNZXRob2RzXCI7XG5pbXBvcnQgeyBNQUlOTk9ERV9MT0FESlNPTiB9IGZyb20gXCJAL3NlcnZlci9SZW1vdGVNZXRob2RzXCI7XG5pbXBvcnQgeyBNQUlOTk9ERV9FWEVDVVRFU0NSSVBUIH0gZnJvbSBcIkAvc2VydmVyL1JlbW90ZU1ldGhvZHNcIjtcbmltcG9ydCB7IExvZ2dlciB9IGZyb20gXCJAL2xvZ2dlclwiO1xuXG5jb25zdCBsb2dnZXIgPSBMb2dnZXIuY3JlYXRlKGltcG9ydC5tZXRhLnVybCk7XG5cbmV4cG9ydCBjb25zdCBDT05GSUdVUkVfRVZFTlQgPSBcImNvbmZpZ3VyZVwiO1xuZXhwb3J0IGNvbnN0IEJVSUxEX0VWRU5UID0gXCJidWlsZFwiO1xuXG5leHBvcnQgaW50ZXJmYWNlIENvbmZpZ3VyZUV2ZW50IHtcbiAgcHJvamVjdDogUHJvamVjdENvbnRleHQ7XG59O1xuXG5leHBvcnQgaW50ZXJmYWNlIEJ1aWxkRXZlbnQge1xuICBwcm9qZWN0OiBQcm9qZWN0Q29udGV4dDtcbn07XG5cbmV4cG9ydCB0eXBlIENvbmZpZ3VyZUxpc3RlbmVyID0gKGV2ZW50OiBDb25maWd1cmVFdmVudCkgPT4gdm9pZDtcbmV4cG9ydCB0eXBlIEJ1aWxkTGlzdGVuZXIgPSAoZXZlbnQ6IEJ1aWxkRXZlbnQpID0+IHZvaWQ7XG5cbmV4cG9ydCBpbnRlcmZhY2UgTWVtb3J5U2VuZGVyIHtcbiAgc2VuZE1lc3NhZ2UobWVzc2FnZTogYW55KTogdm9pZDtcbn07XG5cbmV4cG9ydCBjbGFzcyBNYWtlU2VydmVyIHtcbiAgcHJpdmF0ZSBfcm9vdFZhcmlhYmxlTWFwOiBWYXJpYWJsZU1hcCA9IHt9O1xuICBwcml2YXRlIF9wcm9qZWN0ID0gUHJvamVjdENvbnRleHQuY3JlYXRlKCk7XG4gIHByaXZhdGUgX2xpc3RlbmVyczogeyBbbmFtZTogc3RyaW5nXTogRnVuY3Rpb25bXSB9O1xuICBwcml2YXRlIF9qc29uUnBjU2VydmVyID0gbmV3IEpzb25ScGNTZXJ2ZXI7XG4gIHByaXZhdGUgX2NsaWVudHMgPSBuZXcgQXJyYXk8TWFrZUNsaWVudD47XG5cbiAgcHVibGljIGNvbnN0cnVjdG9yKCkge1xuICAgIHRoaXMuX2xpc3RlbmVycyA9IHtcbiAgICAgIFsgQ09ORklHVVJFX0VWRU5UIF06IG5ldyBBcnJheTxDb25maWd1cmVMaXN0ZW5lcj4sXG4gICAgICBbIEJVSUxEX0VWRU5UIF06IG5ldyBBcnJheTxCdWlsZExpc3RlbmVyPixcbiAgICB9O1xuICAgIHRoaXMuX2pzb25ScGNTZXJ2ZXIucmVnaXN0ZXJDYWxsYmFjayhNQUlOTk9ERV9FWEVDVVRFU0NSSVBULCBwYXJhbXMgPT4gdGhpcy5leGVjdXRlU2NyaXB0KHBhcmFtcykpO1xuICAgIHRoaXMuX2pzb25ScGNTZXJ2ZXIucmVnaXN0ZXJDYWxsYmFjayhNQUlOTk9ERV9MT0FESlNPTiwgcGFyYW1zID0+IHRoaXMubG9hZEpTT04ocGFyYW1zKSk7XG4gICAgdGhpcy5fanNvblJwY1NlcnZlci5yZWdpc3RlckNhbGxiYWNrKE1BSU5OT0RFX1NUQVJUTUFLRVNDUklQVCwgcGFyYW1zID0+IHRoaXMuc3RhcnRNYWtlU2NyaXB0KHBhcmFtcykpO1xuICB9XG5cbiAgcHVibGljIGdldCByb290VmFyaWFibGVNYXAoKSB7XG4gICAgcmV0dXJuIHRoaXMuX3Jvb3RWYXJpYWJsZU1hcDtcbiAgfVxuXG4gIHB1YmxpYyBnZXQgcHJvamVjdCgpIHtcbiAgICByZXR1cm4gdGhpcy5fcHJvamVjdDtcbiAgfVxuXG4gIHB1YmxpYyBhc3luYyBzdGFydE1ha2VTY3JpcHQocGFyYW1zOiBhbnkpOiBQcm9taXNlPHZvaWQ+IHtcbiAgICBsb2dnZXIuZGVidWcoXCJNYWtlU2VydmVyLnN0YXJ0TWFrZVNjcmlwdFwiKTtcblxuICAgIGNvbnN0IHZhcmlhYmxlTWFwID0gU2NvcGVIZWxwZXIuZnJvbUpTT04ocGFyYW1zKTtcbiAgICBhd2FpdCB0aGlzLnJ1bk1ha2VTY3JpcHQodmFyaWFibGVNYXApO1xuICB9XG5cbiAgcHJpdmF0ZSBhc3luYyBsb2FkSlNPTihmaWxlbmFtZTogc3RyaW5nKTogUHJvbWlzZTxhbnk+IHtcbiAgICBsb2dnZXIuZGVidWcoXCJNYWtlU2VydmVyLmxvYWRKU09OKFwiLCBmaWxlbmFtZSwgXCIpXCIpO1xuICAgIGlmIChmaWxlbmFtZS5lbmRzV2l0aChcIi5qc29uXCIpKSB7XG4gICAgICBjb25zdCBjb250ZW50ID0gYXdhaXQgZnMucHJvbWlzZXMucmVhZEZpbGUoZmlsZW5hbWUsIFwidXRmOFwiKTtcbiAgICAgIHJldHVybiBKU09OLnBhcnNlKGNvbnRlbnQpO1xuICAgIH1cblxuICAgIGNvbnN0IG1vZHVsZSA9IGF3YWl0IGltcG9ydE1vZHVsZShmaWxlbmFtZSk7XG4gICAgaWYgKCFtb2R1bGUuZGVmYXVsdClcbiAgICAgIHRocm93IG5ldyBFcnJvcihgU2NyaXB0IFwiJHtmaWxlbmFtZX1cIiBoYXMgbm90IGNvbnRhaW4gYSBkZWZhdWx0IGZ1bmN0aW9uYCk7XG5cbiAgICByZXR1cm4gbW9kdWxlLmRlZmF1bHQ7XG4gIH1cblxuICBwcml2YXRlIGFzeW5jIGV4ZWN1dGVTY3JpcHQocGFyYW1zOiBhbnkpOiBQcm9taXNlPHZvaWQ+IHtcbiAgICBsb2dnZXIuZGVidWcoXCJNYWtlU2VydmVyLmV4ZWN1dGVTY3JpcHRcIik7XG4gICAgY29uc3QgdmFyaWFibGVNYXAgPSBTY29wZUhlbHBlci5mcm9tSlNPTihwYXJhbXMpO1xuICAgIGNvbnN0IHNjcmlwdEZpbGUgPSBTY29wZUhlbHBlci5nZXQodmFyaWFibGVNYXAsIFwiU0NSSVBUX0ZJTEVcIik7XG5cbiAgICBjb25zdCBtb2R1bGUgPSBhd2FpdCBpbXBvcnRNb2R1bGUoc2NyaXB0RmlsZS50b1N0cmluZygpKTtcbiAgICBpZiAoIW1vZHVsZS5kZWZhdWx0KVxuICAgICAgdGhyb3cgbmV3IEVycm9yKGBTY3JpcHQgXCIke3NjcmlwdEZpbGV9XCIgaGFzIG5vdCBjb250YWluIGEgZGVmYXVsdCBmdW5jdGlvbmApO1xuXG4gICAgY29uc3QgbWsgPSBTY3JpcHRDb250ZXh0LmNyZWF0ZSh2YXJpYWJsZU1hcCk7XG4gICAgbW9kdWxlLmRlZmF1bHQobWspO1xuICB9XG5cbiAgcHVibGljIGFzeW5jIHJ1bk1ha2VTY3JpcHQodmFyaWFibGVNYXA6IFZhcmlhYmxlTWFwKTogUHJvbWlzZTxib29sZWFuPiB7XG4gICAgaWYgKCFhd2FpdCB0aGlzLl9wcm9qZWN0LnByZXBlYXJTY3JpcHRGaWxlKHZhcmlhYmxlTWFwKSlcbiAgICAgIHJldHVybiBmYWxzZTtcblxuICAgIGNvbnN0IGNsaWVudCA9IG5ldyBNYWtlQ2xpZW50KHRoaXMuX2pzb25ScGNTZXJ2ZXIpO1xuICAgIHRoaXMuX2NsaWVudHMucHVzaChjbGllbnQpO1xuXG4gICAgYXdhaXQgY2xpZW50LmV4ZWNNYWtlU2NyaXB0KHZhcmlhYmxlTWFwKTtcbiAgICByZXR1cm4gdHJ1ZTtcbiAgfVxuXG4gIHB1YmxpYyBjb21iaW5lUmVzdWx0cygpIHtcbiAgICBmb3IgKGNvbnN0IGN0eCBvZiB0aGlzLl9jbGllbnRzKSB7XG4gICAgICB0aGlzLl9wcm9qZWN0LmFwcGx5TWFpblRhcmdldHMoY3R4Lm1haW5UYXJnZXRzKTtcbiAgICAgIHRoaXMuX3Byb2plY3QuYXBwbHlNYWluU2NyaXB0cyhjdHgubWFpblNjcmlwdHMpO1xuICAgICAgdGhpcy5fcHJvamVjdC5hcHBseUluc3RhbGxFbnRpdGllcyhjdHguaW5zdGFsbEVudHJpZXMpO1xuICAgIH1cbiAgICBmb3IgKGNvbnN0IGN0eCBvZiB0aGlzLl9jbGllbnRzKSB7XG4gICAgICB0aGlzLl9wcm9qZWN0LmFwcGxQb3N0VGFyZ2V0cyhjdHgucG9zdFRhcmdldHMpO1xuICAgICAgdGhpcy5fcHJvamVjdC5hcHBsUG9zdFNjcmlwdHMoY3R4LnBvc3RTY3JpcHRzKTtcbiAgICB9XG4gIH1cblxuICBwdWJsaWMgYXN5bmMgc3RhcnQoKSB7XG4gICAgY29uc3Qgc291cmNlRGlyID0gU2NvcGVIZWxwZXIuZ2V0KHRoaXMuX3Jvb3RWYXJpYWJsZU1hcCwgXCJQUk9KRUNUX1NPVVJDRV9ESVJcIik7XG4gICAgY29uc3QgYmluYXJ5RGlyID0gU2NvcGVIZWxwZXIuZ2V0KHRoaXMuX3Jvb3RWYXJpYWJsZU1hcCwgXCJQUk9KRUNUX0JJTkFSWV9ESVJcIik7XG5cbiAgICBjb25zdCB2YXJpYWJsZU1hcCA9IGNyZWF0ZVZhcmlhYmxlTWFwRm9yRGlyZWN0b3J5KHRoaXMuX3Jvb3RWYXJpYWJsZU1hcCwgc291cmNlRGlyLCBiaW5hcnlEaXIpO1xuICAgIGlmICghYXdhaXQgdGhpcy5ydW5NYWtlU2NyaXB0KHZhcmlhYmxlTWFwKSlcbiAgICAgIHRocm93IEVycm9yKFwiQ2FuJ3QgcHJlcGVhciBTY3JpcHRGaWxlXCIpO1xuXG4gICAgdGhpcy5jb21iaW5lUmVzdWx0cygpO1xuICAgIHRoaXMub25Db25maWd1cmVFbmQoKTtcblxuICAgIC8qdGhpcy5fcHJvamVjdC5hZGRTdWJkaXJlY3RvcnkodGhpcy5fcm9vdFZhcmlhYmxlTWFwLCBzb3VyY2VEaXIsIGJpbmFyeURpcik7XG4gICAgdGhpcy5fcHJvamVjdC5kb1N1YmRpcmVjdG9yeSgpLnRoZW4oKCkgPT4gdGhpcy5vbkNvbmZpZ3VyZUVuZCgpKTsqL1xuICB9XG5cbiAgcHJpdmF0ZSBhc3luYyBvbkNvbmZpZ3VyZUVuZCgpIHtcbiAgICBjb25zdCBldmVudCA9IHsgcHJvamVjdDogdGhpcy5fcHJvamVjdCB9O1xuICAgIGF3YWl0IHRoaXMuZW1pdEV2ZW50KENPTkZJR1VSRV9FVkVOVCwgZXZlbnQpO1xuICAgIGF3YWl0IHRoaXMuZW1pdEV2ZW50KEJVSUxEX0VWRU5ULCBldmVudCk7XG4gIH1cblxuICBwcml2YXRlIGFzeW5jIGVtaXRFdmVudDxUPih0eXBlOiBzdHJpbmcsIGV2ZW50OiBUKTogUHJvbWlzZTx2b2lkPiB7XG4gICAgZm9yIChjb25zdCBsaXN0ZW5lciBvZiB0aGlzLl9saXN0ZW5lcnNbdHlwZV0pIHtcbiAgICAgIGNvbnN0IHJlc3VsdCA9IGxpc3RlbmVyKGV2ZW50KTtcbiAgICAgIGlmIChyZXN1bHQgaW5zdGFuY2VvZiBQcm9taXNlKVxuICAgICAgICBhd2FpdCByZXN1bHQ7XG4gICAgfVxuICB9XG4gIFxuICBwdWJsaWMgYWRkRXZlbnRMaXN0ZW5lcih0eXBlOiBcImNvbmZpZ3VyZVwiLCBsaXN0ZW5lcjogQ29uZmlndXJlTGlzdGVuZXIpOiB2b2lkO1xuICBwdWJsaWMgYWRkRXZlbnRMaXN0ZW5lcih0eXBlOiBcImJ1aWxkXCIsIGxpc3RlbmVyOiBCdWlsZExpc3RlbmVyKTogdm9pZDtcbiAgcHVibGljIGFkZEV2ZW50TGlzdGVuZXIodHlwZTogc3RyaW5nLCBsaXN0ZW5lcjogRnVuY3Rpb24pOiB2b2lkIHtcbiAgICB0aGlzLl9saXN0ZW5lcnNbdHlwZV0ucHVzaChsaXN0ZW5lcik7XG4gIH1cbn07XG4iLCIvKlxuICogTUlUIExpY2Vuc2VcbiAqXG4gKiBDb3B5cmlnaHQgKGMpIDIwMjUgIFl1cmlpIFlha3ViaW4gKHl1cmlpLnlha3ViaW5AZ21haWwuY29tKVxuICpcbiAqIFBlcm1pc3Npb24gaXMgZ3JhbnRlZCB0byB1c2UsIGNvcHksIG1vZGlmeSwgYW5kIGRpc3RyaWJ1dGUgdGhpcyBzb2Z0d2FyZVxuICogdW5kZXIgdGhlIE1JVCBMaWNlbnNlLiBTZWUgTElDRU5TRSBmaWxlIGZvciBkZXRhaWxzLlxuICovXG5cbmltcG9ydCB7IElNZXNzYWdlU2VuZGVyLCBJUmVxdWVzdFN5bmMgfSBmcm9tIFwiQC9zZXJ2ZXIvVHJhbnNwb3J0XCI7XG5pbXBvcnQgeyBMb2dnZXIgfSBmcm9tIFwiQC9sb2dnZXJcIjtcblxuY29uc3QgbG9nZ2VyID0gTG9nZ2VyLmNyZWF0ZShpbXBvcnQubWV0YS51cmwpO1xuXG5leHBvcnQgY2xhc3MgTWVtb3J5TWVzc2FnZVNlbmRlciBpbXBsZW1lbnRzIElNZXNzYWdlU2VuZGVyIHtcbiAgcHJpdmF0ZSBfYnVmZmVyOiBTaGFyZWRBcnJheUJ1ZmZlcjtcbiAgcHJpdmF0ZSBfbWVtb3J5OiBNZW1vcnlUcmFuc3BvcnQuQnVmZmVyO1xuXG4gIHB1YmxpYyBjb25zdHJ1Y3RvcihidWZmZXI6IFNoYXJlZEFycmF5QnVmZmVyKSB7XG4gICAgdGhpcy5fYnVmZmVyID0gYnVmZmVyO1xuICAgIHRoaXMuX21lbW9yeSA9IG5ldyBNZW1vcnlUcmFuc3BvcnQuQnVmZmVyKGJ1ZmZlcik7XG4gIH1cblxuICBwdWJsaWMgc2VuZE1lc3NhZ2UobWVzc2FnZTogYW55KTogdm9pZCB7XG4gICAgdGhpcy5fbWVtb3J5LnNldChtZXNzYWdlLCB0cnVlKTtcbiAgfVxuXG4gIHB1YmxpYyByZWFkTWVzc2FnZSgpOiBhbnkge1xuICAgIHJldHVybiB0aGlzLl9tZW1vcnkuZ2V0KCk7XG4gIH1cbn07XG5cbmV4cG9ydCBjbGFzcyBNZW1vcnlUcmFuc3BvcnQgaW1wbGVtZW50cyBJUmVxdWVzdFN5bmMge1xuICBwcml2YXRlIF9zZW5kZXI6IElNZXNzYWdlU2VuZGVyO1xuICBwcml2YXRlIF9idWZmZXI6IFNoYXJlZEFycmF5QnVmZmVyO1xuICBwcml2YXRlIF9tZW1vcnk6IE1lbW9yeVRyYW5zcG9ydC5CdWZmZXI7XG5cbiAgcHVibGljIGNvbnN0cnVjdG9yKHNlbmRlcjogSU1lc3NhZ2VTZW5kZXIsIGJ1ZmZlcjogU2hhcmVkQXJyYXlCdWZmZXIpIHtcbiAgICB0aGlzLl9zZW5kZXIgPSBzZW5kZXI7XG4gICAgdGhpcy5fYnVmZmVyID0gYnVmZmVyO1xuICAgIHRoaXMuX21lbW9yeSA9IG5ldyBNZW1vcnlUcmFuc3BvcnQuQnVmZmVyKGJ1ZmZlcik7XG4gIH1cblxuICBwdWJsaWMgcmVxdWVzdFN5bmMoZGF0YTogYW55KTogYW55IHtcbiAgICB0aGlzLl9tZW1vcnkuc2V0KGRhdGEpO1xuICAgIHRoaXMuX3NlbmRlci5zZW5kTWVzc2FnZSh0aGlzLl9idWZmZXIpO1xuICAgIHJldHVybiB0aGlzLl9tZW1vcnkuZ2V0KHRydWUpO1xuICB9XG59O1xuXG5leHBvcnQgbmFtZXNwYWNlIE1lbW9yeVRyYW5zcG9ydCB7XG5cbmNvbnN0IE1BR0lDX09GRlNFVCA9IDA7XG5cbmV4cG9ydCBjbGFzcyBCdWZmZXIge1xuICBwcml2YXRlIF9zaWduYWw6IEludDMyQXJyYXk7XG4gIHByaXZhdGUgX2RhdGE6IFVpbnQ4QXJyYXk7XG4gIHByaXZhdGUgX21hZ2ljOiBudW1iZXI7XG5cbiAgcHVibGljIGNvbnN0cnVjdG9yKGJ1ZmZlcjogU2hhcmVkQXJyYXlCdWZmZXIpIHtcbiAgICB0aGlzLl9zaWduYWwgPSBuZXcgSW50MzJBcnJheShidWZmZXIsIE1BR0lDX09GRlNFVCwgMSk7XG4gICAgdGhpcy5fZGF0YSA9IG5ldyBVaW50OEFycmF5KGJ1ZmZlciwgdGhpcy5fc2lnbmFsLkJZVEVTX1BFUl9FTEVNRU5UKTtcbiAgICB0aGlzLl9tYWdpYyA9IDA7XG4gIH1cblxuICBwdWJsaWMgZ2V0KHN5bmMgPSBmYWxzZSk6IGFueSB7XG4gICAgaWYgKHN5bmMpIHtcbiAgICAgIEF0b21pY3Mud2FpdCh0aGlzLl9zaWduYWwsIE1BR0lDX09GRlNFVCwgdGhpcy5fbWFnaWMpO1xuICAgIH1cblxuICAgIHRoaXMuX21hZ2ljID0gdGhpcy5fc2lnbmFsWzBdO1xuICAgIGNvbnN0IGxlbmd0aCA9IHRoaXMuX21hZ2ljID4+IDg7XG4gICAgY29uc3QgYnl0ZXMgPSB0aGlzLl9kYXRhLnNsaWNlKDAsIGxlbmd0aCk7XG4gICAgY29uc3QgbWVzc2FnZSA9IChuZXcgVGV4dERlY29kZXIoKSkuZGVjb2RlKGJ5dGVzKTtcblxuICAgIHJldHVybiBKU09OLnBhcnNlKG1lc3NhZ2UpO1xuICB9XG5cbiAgcHVibGljIHNldChqc29uOiBhbnksIG5vdGlmeSA9IGZhbHNlKSB7XG4gICAgY29uc3QgbWVzc2FnZSA9IEpTT04uc3RyaW5naWZ5KGpzb24pO1xuICAgIGNvbnN0IGJ5dGVzID0gKG5ldyBUZXh0RW5jb2RlcigpKS5lbmNvZGUobWVzc2FnZSk7XG4gICAgdGhpcy5fZGF0YS5zZXQoYnl0ZXMpO1xuICAgIHRoaXMuX21hZ2ljID0gKGJ5dGVzLmxlbmd0aCA8PCA4KSB8ICgodGhpcy5fbWFnaWMgKyAxKSAmIDI1NSk7XG4gICAgdGhpcy5fc2lnbmFsWzBdID0gdGhpcy5fbWFnaWM7XG5cbiAgICBpZiAobm90aWZ5KSB7XG4gICAgICBBdG9taWNzLm5vdGlmeSh0aGlzLl9zaWduYWwsIE1BR0lDX09GRlNFVCwgMSk7XG4gICAgfVxuICB9XG59O1xuXG59IC8vIG5hbWVzcGFjZSBNZW1vcnlUcmFuc3BvcnRcbiIsIi8qXG4gKiBNSVQgTGljZW5zZVxuICpcbiAqIENvcHlyaWdodCAoYykgMjAyNSAgWXVyaWkgWWFrdWJpbiAoeXVyaWkueWFrdWJpbkBnbWFpbC5jb20pXG4gKlxuICogUGVybWlzc2lvbiBpcyBncmFudGVkIHRvIHVzZSwgY29weSwgbW9kaWZ5LCBhbmQgZGlzdHJpYnV0ZSB0aGlzIHNvZnR3YXJlXG4gKiB1bmRlciB0aGUgTUlUIExpY2Vuc2UuIFNlZSBMSUNFTlNFIGZpbGUgZm9yIGRldGFpbHMuXG4gKi9cblxuaW1wb3J0IHsgTWVzc2FnZVBvcnQgfSBmcm9tIFwibm9kZTp3b3JrZXJfdGhyZWFkc1wiO1xuaW1wb3J0IHsgSU1lc3NhZ2VTZW5kZXIgfSBmcm9tIFwiQC9zZXJ2ZXIvVHJhbnNwb3J0XCI7XG5pbXBvcnQgeyBMb2dnZXIgfSBmcm9tIFwiQC9sb2dnZXJcIjtcblxuY29uc3QgbG9nZ2VyID0gTG9nZ2VyLmNyZWF0ZShpbXBvcnQubWV0YS51cmwpO1xuXG5leHBvcnQgY2xhc3MgTWVzc2FnZVBvcnRTZW5kZXIgaW1wbGVtZW50cyBJTWVzc2FnZVNlbmRlciB7XG4gIHByaXZhdGUgX21lc3NhZ2VQb3J0OiBNZXNzYWdlUG9ydDtcblxuICBwdWJsaWMgY29uc3RydWN0b3IobWVzc2FnZVBvcnQ6IE1lc3NhZ2VQb3J0KSB7XG4gICAgdGhpcy5fbWVzc2FnZVBvcnQgPSBtZXNzYWdlUG9ydDtcbiAgfVxuXG4gIHB1YmxpYyBzZW5kTWVzc2FnZShtZXNzYWdlOiBhbnkpOiB2b2lkIHtcbiAgICBsb2dnZXIuZGVidWcoXCI8LS1cIiwgSlNPTi5zdHJpbmdpZnkobWVzc2FnZSkpO1xuICAgIHRoaXMuX21lc3NhZ2VQb3J0LnBvc3RNZXNzYWdlKG1lc3NhZ2UpO1xuICB9XG59O1xuIiwiLypcbiAqIE1JVCBMaWNlbnNlXG4gKlxuICogQ29weXJpZ2h0IChjKSAyMDI1ICBZdXJpaSBZYWt1YmluICh5dXJpaS55YWt1YmluQGdtYWlsLmNvbSlcbiAqXG4gKiBQZXJtaXNzaW9uIGlzIGdyYW50ZWQgdG8gdXNlLCBjb3B5LCBtb2RpZnksIGFuZCBkaXN0cmlidXRlIHRoaXMgc29mdHdhcmVcbiAqIHVuZGVyIHRoZSBNSVQgTGljZW5zZS4gU2VlIExJQ0VOU0UgZmlsZSBmb3IgZGV0YWlscy5cbiAqL1xuXG5pbXBvcnQgeyBNYWtlQ29udGV4dCB9IGZyb20gXCJAL2NvcmUvQmFzZUNvbnRleHRcIjtcbmltcG9ydCB7IGNyZWF0ZVZhcmlhYmxlTWFwRm9yRGlyZWN0b3J5IH0gZnJvbSBcIkAvY29yZS9CYXNlQ29udGV4dFwiO1xuaW1wb3J0IHsgSnNvblJwY1JlcXVlc3RTeW5jIH0gZnJvbSBcIkAvc2VydmVyL0pzb25ScGNSZXF1ZXN0U3luY1wiO1xuaW1wb3J0IHsgTUFJTk5PREVfTE9BREpTT04gfSBmcm9tIFwiQC9zZXJ2ZXIvUmVtb3RlTWV0aG9kc1wiO1xuaW1wb3J0IHsgTUFJTk5PREVfRVhFQ1VURVNDUklQVCB9IGZyb20gXCJAL3NlcnZlci9SZW1vdGVNZXRob2RzXCI7XG5pbXBvcnQgeyBNQUlOTk9ERV9TVEFSVE1BS0VTQ1JJUFQgfSBmcm9tIFwiQC9zZXJ2ZXIvUmVtb3RlTWV0aG9kc1wiO1xuaW1wb3J0IHsgTG9nZ2VyIH0gZnJvbSBcIkAvbG9nZ2VyXCI7XG5pbXBvcnQgeyBTY29wZUhlbHBlciwgVmFyaWFibGVNYXAsIFZhcmlhbnRNYXAgfSBmcm9tIFwiQC9jb3JlL1Njb3BlXCI7XG5pbXBvcnQgeyBDVVNUT01fVkFSSUFCTEVfR1JPVVAgfSBmcm9tIFwiQC9Db25zdGFudHNcIjtcbmltcG9ydCB7IEFic29sdXRlUGF0aCB9IGZyb20gXCJAL2NvcmUvQWJzb2x1dGVQYXRoXCI7XG5cbmNvbnN0IGxvZ2dlciA9IExvZ2dlci5jcmVhdGUoaW1wb3J0Lm1ldGEudXJsKTtcblxuZXhwb3J0IGNsYXNzIFJlbW90ZU1ha2VDb250ZXh0IGV4dGVuZHMgTWFrZUNvbnRleHQge1xuICBwcml2YXRlIF90cmFuc3BvcnQ6IEpzb25ScGNSZXF1ZXN0U3luYztcblxuICBwdWJsaWMgY29uc3RydWN0b3Ioc2NvcGU6IFZhcmlhYmxlTWFwLCB0cmFuc3BvcnQ6IEpzb25ScGNSZXF1ZXN0U3luYykge1xuICAgIHN1cGVyKHNjb3BlKTtcbiAgICB0aGlzLl90cmFuc3BvcnQgPSB0cmFuc3BvcnQ7XG4gIH1cblxuICBwdWJsaWMgZXhlY3V0ZVNjcmlwdChzY29wZTogVmFyaWFibGVNYXAsIHNjcmlwdDogYW55LCBwYXJhbXM6IGFueSk6IGFueSB7XG4gICAgbG9nZ2VyLmRlYnVnKFwiUmVtb3RlTWFrZUNvbnRleHQuZXhlY3V0ZVNjcmlwdChcIiwgc2NyaXB0LCBwYXJhbXMsIFwiKVwiKTtcbiAgICBjb25zdCBuZXdWYXJpYWJsZU1hcCA9IFNjb3BlSGVscGVyLmNsb25lVmFyaWFibGVNYXAoc2NvcGUpO1xuICAgIHBhcmFtcyAmJiBTY29wZUhlbHBlci5leHRlbmRWYXJpYWJsZU1hcEJ5VmFsdWVzKG5ld1ZhcmlhYmxlTWFwLCBcIlwiLCBwYXJhbXMpO1xuICAgIGNvbnN0IHNjcmlwdEZpbGUgPSBTY29wZUhlbHBlci5nZXQobmV3VmFyaWFibGVNYXAsIFwiU09VUkNFX0RJUlwiKS5yZXNvbHZlKHNjcmlwdCk7XG4gICAgU2NvcGVIZWxwZXIuc2V0KG5ld1ZhcmlhYmxlTWFwLCBcIlNDUklQVF9GSUxFXCIsIHNjcmlwdEZpbGUpO1xuICAgIFNjb3BlSGVscGVyLnNldChuZXdWYXJpYWJsZU1hcCwgXCJTQ1JJUFRfRElSXCIsIHNjcmlwdEZpbGUuZGlybmFtZSgpKTtcbiAgICByZXR1cm4gdGhpcy5fdHJhbnNwb3J0LnJlcXVlc3RTeW5jKE1BSU5OT0RFX0VYRUNVVEVTQ1JJUFQsIFNjb3BlSGVscGVyLnRvSlNPTihuZXdWYXJpYWJsZU1hcCkpO1xuICB9XG4gIFxuICBwdWJsaWMgYWRkQ2FjaGVWYXJpYWJsZXMoc2NvcGU6IFZhcmlhYmxlTWFwLCBwYXJhbXM6IHN0cmluZyB8IFZhcmlhbnRNYXApOiB2b2lkIHtcbiAgICBsb2dnZXIuZGVidWcoXCJSZW1vdGVNYWtlQ29udGV4dC5hZGRDYWNoZVZhcmlhYmxlcyhcIiwgcGFyYW1zLCBcIilcIik7XG4gICAgbGV0IHZhcmlhYmxlcyA9IHBhcmFtcztcbiAgICBpZiAodHlwZW9mIHBhcmFtcyA9PT0gXCJzdHJpbmdcIikge1xuICAgICAgY29uc3QgZmlsZW5hbWUgPSBTY29wZUhlbHBlci5nZXQoc2NvcGUsIFwiU09VUkNFX0RJUlwiKS5yZXNvbHZlKHBhcmFtcykudG9TdHJpbmcoKTtcbiAgICAgIHZhcmlhYmxlcyA9IHRoaXMuX3RyYW5zcG9ydC5yZXF1ZXN0U3luYyhNQUlOTk9ERV9MT0FESlNPTiwgZmlsZW5hbWUpO1xuICAgIH1cbiAgICBTY29wZUhlbHBlci5kZWZpbmVWYXJpYWJsZXNJblZhcmlhYmxlTWFwKHNjb3BlLCBDVVNUT01fVkFSSUFCTEVfR1JPVVAsIHZhcmlhYmxlcyk7XG4gIH1cblxuICBwdWJsaWMgYWRkU3ViZGlyZWN0b3J5KHNjb3BlOiBWYXJpYWJsZU1hcCwgc291cmNlRGlyOiBzdHJpbmcgfCBBYnNvbHV0ZVBhdGgsIGJpbmFyeURpcj86IHN0cmluZyB8IEFic29sdXRlUGF0aCk6IHZvaWQge1xuICAgIGxvZ2dlci5kZWJ1ZyhcIlJlbW90ZU1ha2VDb250ZXh0LmFkZFN1YmRpcmVjdG9yeShcIiwgc291cmNlRGlyLCBiaW5hcnlEaXIsIFwiKVwiKTtcbiAgICBjb25zdCBuZXdWYXJpYWJsZU1hcCA9IGNyZWF0ZVZhcmlhYmxlTWFwRm9yRGlyZWN0b3J5KHNjb3BlLCBzb3VyY2VEaXIsIGJpbmFyeURpcik7XG4gICAgdGhpcy5fdHJhbnNwb3J0LnJlcXVlc3RTeW5jKE1BSU5OT0RFX1NUQVJUTUFLRVNDUklQVCwgU2NvcGVIZWxwZXIudG9KU09OKG5ld1ZhcmlhYmxlTWFwKSk7XG4gIH1cbn07XG4iLCIvKlxuICogTUlUIExpY2Vuc2VcbiAqXG4gKiBDb3B5cmlnaHQgKGMpIDIwMjUgIFl1cmlpIFlha3ViaW4gKHl1cmlpLnlha3ViaW5AZ21haWwuY29tKVxuICpcbiAqIFBlcm1pc3Npb24gaXMgZ3JhbnRlZCB0byB1c2UsIGNvcHksIG1vZGlmeSwgYW5kIGRpc3RyaWJ1dGUgdGhpcyBzb2Z0d2FyZVxuICogdW5kZXIgdGhlIE1JVCBMaWNlbnNlLiBTZWUgTElDRU5TRSBmaWxlIGZvciBkZXRhaWxzLlxuICovXG5cbmV4cG9ydCBjb25zdCBXT1JLRVJOT0RFX0NSRUFURU1BS0VDT05URVhUID0gXCJXb3JrZXJOb2RlLmNyZWF0ZU1ha2VDb250ZXh0XCI7XG5leHBvcnQgY29uc3QgV09SS0VSTk9ERV9ERUxFVEVNQUtFQ09OVEVYVCA9IFwiV29ya2VyTm9kZS5kZWxldGVNYWtlQ29udGV4dFwiO1xuZXhwb3J0IGNvbnN0IFdPUktFUk5PREVfU1RBUlRNQUtFU0NSSVBUID0gXCJXb3JrZXJOb2RlLnN0YXJ0TWFrZVNjcmlwdFwiO1xuZXhwb3J0IGNvbnN0IFdPUktFUk5PREVfTUFJTlRBUkdFVFMgPSBcIldvcmtlck5vZGUubWFpblRhcmdldHNcIjtcbmV4cG9ydCBjb25zdCBXT1JLRVJOT0RFX1BPU1RUQVJHRVRTID0gXCJXb3JrZXJOb2RlLnBvc3RUYXJnZXRzXCI7XG5leHBvcnQgY29uc3QgV09SS0VSTk9ERV9NQUlOU0NSSVBUUyA9IFwiV29ya2VyTm9kZS5tYWluU2NyaXB0c1wiO1xuZXhwb3J0IGNvbnN0IFdPUktFUk5PREVfUE9TVFNDUklQVFMgPSBcIldvcmtlck5vZGUucG9zdFNjcmlwdHNcIjtcbmV4cG9ydCBjb25zdCBXT1JLRVJOT0RFX0lOU1RBTExFTlRSSUVTID0gXCJXb3JrZXJOb2RlLmluc3RhbGxFbnRyaWVzXCI7XG5leHBvcnQgY29uc3QgV09SS0VSTk9ERV9QUk9DRVNTRVhJVCA9IFwiV29ya2VyTm9kZS5wcm9jZXNzRXhpdFwiO1xuXG5leHBvcnQgY29uc3QgTUFJTk5PREVfTE9BREpTT04gPSBcIk1haW5Ob2RlLmxvYWRKU09OXCI7XG5leHBvcnQgY29uc3QgTUFJTk5PREVfRVhFQ1VURVNDUklQVCA9IFwiTWFpbk5vZGUuZXhlY3V0ZVNjcmlwdFwiO1xuZXhwb3J0IGNvbnN0IE1BSU5OT0RFX1NUQVJUTUFLRVNDUklQVCA9IFwiTWFpbk5vZGUuc3RhcnRNYWtlU2NyaXB0XCI7XG4iLCIvKlxuICogTUlUIExpY2Vuc2VcbiAqXG4gKiBDb3B5cmlnaHQgKGMpIDIwMjUgIFl1cmlpIFlha3ViaW4gKHl1cmlpLnlha3ViaW5AZ21haWwuY29tKVxuICpcbiAqIFBlcm1pc3Npb24gaXMgZ3JhbnRlZCB0byB1c2UsIGNvcHksIG1vZGlmeSwgYW5kIGRpc3RyaWJ1dGUgdGhpcyBzb2Z0d2FyZVxuICogdW5kZXIgdGhlIE1JVCBMaWNlbnNlLiBTZWUgTElDRU5TRSBmaWxlIGZvciBkZXRhaWxzLlxuICovXG5cbmV4cG9ydCBjb25zdCBKU09OUlBDX1ZFUlNJT04gPSBcIjIuMFwiO1xuZXhwb3J0IGludGVyZmFjZSBJTWVzc2FnZVNlbmRlciB7XG4gIHNlbmRNZXNzYWdlKG1lc3NhZ2U6IGFueSk6IHZvaWQ7XG59O1xuXG5leHBvcnQgaW50ZXJmYWNlIElNZXNzYWdlRW1pdHRlciB7XG4gIGVtaXRNZXNzYWdlKHNlbmRlcjogSU1lc3NhZ2VTZW5kZXIsIG1lc3NhZ2U6IGFueSk6IHZvaWQ7XG59O1xuXG5leHBvcnQgaW50ZXJmYWNlIElSZXF1ZXN0U3luYyB7XG4gIHJlcXVlc3RTeW5jKGRhdGE6IGFueSk6IGFueTtcbn07XG5cbmV4cG9ydCBpbnRlcmZhY2UgSUpzb25ScGNSZWNpdmVyIHtcbiAgb25SZXF1ZXN0KG1ldGhvZDogc3RyaW5nLCBpZDogbnVtYmVyLCBwYXJhbXM/OiBhbnkpOiB2b2lkO1xuICBvblJlc3VsdChyZXN1bHQ6IGFueSwgaWQ6IG51bWJlcik6IHZvaWQ7XG4gIG9uRXJyb3IoZXJyb3I6IG9iamVjdCwgaWQ6IG51bWJlciB8IG51bGwpOiB2b2lkO1xuICBvbk5vdGlmaWNhdGlvbihtZXRob2Q6IHN0cmluZywgcGFyYW1zPzogYW55KTogdm9pZDtcbn07XG5cbmV4cG9ydCBpbnRlcmZhY2UgSUpzb25ScGNTZW5kZXIge1xuICAvLyBzZW5kTWV0aG9kKG1ldGhvZDogc3RyaW5nLCBwYXJhbXM/OiBhbnksIGNhbGxiYWNrOiAoKSk6IHZvaWQ7XG59O1xuXG5leHBvcnQgaW50ZXJmYWNlIEpzb25ScGNEYXRhIHtcbiAganNvbnJwYzogc3RyaW5nO1xuICBtZXRob2Q/OiBzdHJpbmc7XG4gIHBhcmFtcz86IGFueTtcbiAgaWQ/OiBudW1iZXI7XG4gIGVycm9yPzoge1xuICAgIGNvZGU6IG51bWJlcixcbiAgICBtZXNzYWdlOiBzdHJpbmcsXG4gICAgZGF0YT86IGFueSxcbiAgfSxcbiAgcmVzdWx0PzogYW55O1xufTtcblxuZXhwb3J0IHR5cGUgSnNvblJwY1JlcXVlc3RIYW5kbGVyID0gKHJlcXVlc3Q6IElKc29uUnBjUmVxdWVzdCwgcmVzcG9uc2U6IElKc29uUnBjUmVzcG9uc2UpID0+IHZvaWQ7XG5leHBvcnQgdHlwZSBKc29uUnBjQ2FsbGJhY2sgPSAocGFyYW1zOiBhbnkpID0+IGFueTtcblxuZXhwb3J0IGludGVyZmFjZSBJSnNvblJwY1JlcXVlc3Qge1xuICBnZXQgcGFyYW1zKCk6IGFueTtcbn07XG5cbmV4cG9ydCBpbnRlcmZhY2UgSUpzb25ScGNSZXNwb25zZSB7XG4gIHNlbmRSZXN1bHQoanNvbjogYW55KTogdm9pZDtcbn07XG4iLCIvKlxuICogTUlUIExpY2Vuc2VcbiAqXG4gKiBDb3B5cmlnaHQgKGMpIDIwMjUgIFl1cmlpIFlha3ViaW4gKHl1cmlpLnlha3ViaW5AZ21haWwuY29tKVxuICpcbiAqIFBlcm1pc3Npb24gaXMgZ3JhbnRlZCB0byB1c2UsIGNvcHksIG1vZGlmeSwgYW5kIGRpc3RyaWJ1dGUgdGhpcyBzb2Z0d2FyZVxuICogdW5kZXIgdGhlIE1JVCBMaWNlbnNlLiBTZWUgTElDRU5TRSBmaWxlIGZvciBkZXRhaWxzLlxuICovXG5cbmltcG9ydCB7IElSZXF1ZXN0U3luYyB9IGZyb20gXCJAL3NlcnZlci9UcmFuc3BvcnRcIjtcbmltcG9ydCB7IEpzb25ScGNSZXF1ZXN0U3luYyB9IGZyb20gXCJAL3NlcnZlci9Kc29uUnBjUmVxdWVzdFN5bmNcIjtcbmltcG9ydCB7IFJlbW90ZU1ha2VDb250ZXh0IH0gZnJvbSBcIkAvc2VydmVyL1JlbW90ZU1ha2VDb250ZXh0XCI7XG5pbXBvcnQgeyBVc2VyTWFrZUNvbnRleHQgfSBmcm9tIFwiQC9jb3JlL1VzZXJNYWtlQ29udGV4dFwiO1xuaW1wb3J0IHsgcGVyZm9ybUNvbnRleHQgfSBmcm9tIFwiQC9jb3JlL0Jhc2VDb250ZXh0XCI7XG5pbXBvcnQgeyBNYWluVGFyZ2V0LCBQb3N0VGFyZ2V0IH0gZnJvbSBcIkAvY29yZS9UYXJnZXRcIjtcbmltcG9ydCB7IFBvc3RDdXN0b21TY3JpcHQsIEN1c3RvbVNjcmlwdCB9IGZyb20gXCJAL2NvcmUvQ3VzdG9tU2NyaXB0XCI7XG5pbXBvcnQgeyBJbnN0YWxsRW50aXR5IH0gZnJvbSBcIkAvY29yZS9JbnN0YWxsRW50aXR5XCI7XG5pbXBvcnQgeyBTaW1wbGVPYmplY3QgfSBmcm9tIFwiQC9jb3JlL1NpbXBsZU9iamVjdFwiO1xuaW1wb3J0IHsgU2NvcGVIZWxwZXIgfSBmcm9tIFwiQC9jb3JlL1Njb3BlXCI7XG5cbmV4cG9ydCBjbGFzcyBXb3JrZXJOb2RlIHtcbiAgcHJpdmF0ZSBfbmFtZTogc3RyaW5nO1xuICBwcml2YXRlIF90cmFuc3BvcnQ6IEpzb25ScGNSZXF1ZXN0U3luYztcbiAgcHJpdmF0ZSBfbWFrZUNvbnRleHRzID0gbmV3IE1hcDxzdHJpbmcsIFJlbW90ZU1ha2VDb250ZXh0PjtcbiAgcHJpdmF0ZSBfbWFrZUNvbnRleHRDb3VudCA9IDA7XG4gIHByaXZhdGUgX21haW5UYXJnZXRzID0gbmV3IEFycmF5PE1haW5UYXJnZXQ+O1xuICBwcml2YXRlIF9wb3N0VGFyZ2V0cyA9IG5ldyBBcnJheTxQb3N0VGFyZ2V0PjtcbiAgcHJpdmF0ZSBfbWFpblNjcmlwdHMgPSBuZXcgQXJyYXk8Q3VzdG9tU2NyaXB0PjtcbiAgcHJpdmF0ZSBfcG9zdFNjcmlwdHMgPSBuZXcgQXJyYXk8UG9zdEN1c3RvbVNjcmlwdD47XG4gIHByaXZhdGUgX2luc3RhbGxFbnRyaWVzID0gbmV3IEFycmF5PEluc3RhbGxFbnRpdHk+O1xuXG4gIHB1YmxpYyBjb25zdHJ1Y3RvcihuYW1lOiBzdHJpbmcsIHJlcXVlc3RTeW5jOiBJUmVxdWVzdFN5bmMpIHtcbiAgICB0aGlzLl9uYW1lID0gbmFtZTtcbiAgICB0aGlzLl90cmFuc3BvcnQgPSBuZXcgSnNvblJwY1JlcXVlc3RTeW5jKHJlcXVlc3RTeW5jKTtcbiAgfVxuXG4gIHB1YmxpYyBjcmVhdGVNYWtlQ29udGV4dChwYXJhbXM6IGFueSkge1xuICAgIGNvbnN0IG1jaWQgPSB0aGlzLl9uYW1lICsgXCI6XCIgKyB0aGlzLl9tYWtlQ29udGV4dENvdW50Kys7XG4gICAgcmV0dXJuIG1jaWQ7XG4gIH1cblxuICBwdWJsaWMgZGVsZXRlTWFrZUNvbnRleHQocGFyYW1zOiBhbnkpIHtcbiAgICByZXR1cm4gdGhpcy5fbWFrZUNvbnRleHRzLmRlbGV0ZShwYXJhbXMpO1xuICB9XG5cbiAgcHVibGljIGFzeW5jIGV4ZWNNYWtlU2NyaXB0KHBhcmFtczogYW55KTogUHJvbWlzZTx2b2lkPiB7XG4gICAgY29uc3QgdmFyaWFibGVNYXAgPSBTY29wZUhlbHBlci5mcm9tSlNPTihwYXJhbXMpO1xuXG4gICAgY29uc3QgY3R4ID0gbmV3IFJlbW90ZU1ha2VDb250ZXh0KHZhcmlhYmxlTWFwLCB0aGlzLl90cmFuc3BvcnQpO1xuICAgIGNvbnN0IG1rID0gVXNlck1ha2VDb250ZXh0LmNyZWF0ZShjdHgsIHZhcmlhYmxlTWFwKTtcbiAgICBhd2FpdCBwZXJmb3JtQ29udGV4dChtayk7XG5cbiAgICB0aGlzLl9tYWluVGFyZ2V0cyA9IEFycmF5LmZyb20oY3R4LnRhcmdldHMudmFsdWVzKCkpO1xuICAgIHRoaXMuX3Bvc3RUYXJnZXRzID0gQXJyYXkuZnJvbShjdHgucG9zdFRhcmdldHMudmFsdWVzKCkpO1xuICAgIHRoaXMuX21haW5TY3JpcHRzID0gQXJyYXkuZnJvbShjdHgubWFpblNjcmlwdHMudmFsdWVzKCkpO1xuICAgIHRoaXMuX3Bvc3RTY3JpcHRzID0gQXJyYXkuZnJvbShjdHgucG9zdFNjcmlwdHMudmFsdWVzKCkpO1xuICAgIHRoaXMuX2luc3RhbGxFbnRyaWVzID0gQXJyYXkuZnJvbShjdHguaW5zdGFsbExpc3QpO1xuICB9XG5cbiAgcHVibGljIG1haW5UYXJnZXRzKHBhcmFtczogYW55KTogTWFpblRhcmdldFtdIHtcbiAgICByZXR1cm4gU2ltcGxlT2JqZWN0LnRvSlNPTih0aGlzLl9tYWluVGFyZ2V0cyk7XG4gIH1cblxuICBwdWJsaWMgcG9zdFRhcmdldHMocGFyYW1zOiBhbnkpOiBQb3N0VGFyZ2V0W10ge1xuICAgIHJldHVybiBTaW1wbGVPYmplY3QudG9KU09OKHRoaXMuX3Bvc3RUYXJnZXRzKTtcbiAgfVxuXG4gIHB1YmxpYyBtYWluU2NyaXB0cyhwYXJhbXM6IGFueSk6IEN1c3RvbVNjcmlwdFtdIHtcbiAgICByZXR1cm4gU2ltcGxlT2JqZWN0LnRvSlNPTih0aGlzLl9tYWluU2NyaXB0cyk7XG4gIH1cblxuICBwdWJsaWMgcG9zdFNjcmlwdHMocGFyYW1zOiBhbnkpOiBQb3N0Q3VzdG9tU2NyaXB0W10ge1xuICAgIHJldHVybiBTaW1wbGVPYmplY3QudG9KU09OKHRoaXMuX3Bvc3RTY3JpcHRzKTtcbiAgfVxuXG4gIHB1YmxpYyBpbnN0YWxsRW50cmllcyhwYXJhbXM6IGFueSk6IFBvc3RUYXJnZXRbXSB7XG4gICAgcmV0dXJuIFNpbXBsZU9iamVjdC50b0pTT04odGhpcy5faW5zdGFsbEVudHJpZXMpO1xuICB9XG5cbiAgcHVibGljIHByb2Nlc3NFeGl0KHBhcmFtczogYW55KTogdm9pZCB7XG4gICAgc2V0VGltZW91dCgoKSA9PiBwcm9jZXNzLmV4aXQocGFyYW1zKSwgMCk7XG4gIH1cbn07XG4iLCIvKlxuICogTUlUIExpY2Vuc2VcbiAqXG4gKiBDb3B5cmlnaHQgKGMpIDIwMjUgIFl1cmlpIFlha3ViaW4gKHl1cmlpLnlha3ViaW5AZ21haWwuY29tKVxuICpcbiAqIFBlcm1pc3Npb24gaXMgZ3JhbnRlZCB0byB1c2UsIGNvcHksIG1vZGlmeSwgYW5kIGRpc3RyaWJ1dGUgdGhpcyBzb2Z0d2FyZVxuICogdW5kZXIgdGhlIE1JVCBMaWNlbnNlLiBTZWUgTElDRU5TRSBmaWxlIGZvciBkZXRhaWxzLlxuICovXG5cbmltcG9ydCB7IFdvcmtlciB9IGZyb20gXCJub2RlOndvcmtlcl90aHJlYWRzXCI7XG5pbXBvcnQgeyBJTWVzc2FnZVNlbmRlciB9IGZyb20gXCJAL3NlcnZlci9UcmFuc3BvcnRcIjtcbmltcG9ydCB7IExvZ2dlciB9IGZyb20gXCJAL2xvZ2dlclwiO1xuXG5jb25zdCBsb2dnZXIgPSBMb2dnZXIuY3JlYXRlKGltcG9ydC5tZXRhLnVybCk7XG5cbmV4cG9ydCBjbGFzcyBXb3JrZXJTZW5kZXIgaW1wbGVtZW50cyBJTWVzc2FnZVNlbmRlciB7XG4gIHByaXZhdGUgX3dvcmtlcjogV29ya2VyO1xuXG4gIHB1YmxpYyBjb25zdHJ1Y3Rvcih3b3JrZXI6IFdvcmtlcikge1xuICAgIHRoaXMuX3dvcmtlciA9IHdvcmtlcjtcbiAgfVxuXG4gIHB1YmxpYyBzZW5kTWVzc2FnZShtZXNzYWdlOiBhbnkpOiB2b2lkIHtcbiAgICBsb2dnZXIuZGVidWcoXCI8LS1cIiwgbWVzc2FnZSk7XG4gICAgdGhpcy5fd29ya2VyLnBvc3RNZXNzYWdlKG1lc3NhZ2UpO1xuICB9XG59O1xuIiwiLypcbiAqIE1JVCBMaWNlbnNlXG4gKlxuICogQ29weXJpZ2h0IChjKSAyMDI1ICBZdXJpaSBZYWt1YmluICh5dXJpaS55YWt1YmluQGdtYWlsLmNvbSlcbiAqXG4gKiBQZXJtaXNzaW9uIGlzIGdyYW50ZWQgdG8gdXNlLCBjb3B5LCBtb2RpZnksIGFuZCBkaXN0cmlidXRlIHRoaXMgc29mdHdhcmVcbiAqIHVuZGVyIHRoZSBNSVQgTGljZW5zZS4gU2VlIExJQ0VOU0UgZmlsZSBmb3IgZGV0YWlscy5cbiAqL1xuXG5pbXBvcnQgeyBJTWVzc2FnZVNlbmRlciwgSU1lc3NhZ2VFbWl0dGVyIH0gZnJvbSBcIkAvc2VydmVyL1RyYW5zcG9ydFwiO1xuaW1wb3J0IHsgTWVtb3J5VHJhbnNwb3J0IH0gZnJvbSBcIkAvc2VydmVyL01lbW9yeVRyYW5zcG9ydFwiO1xuaW1wb3J0IHsgSnNvblJwY1NlcnZlciB9IGZyb20gXCJAL3NlcnZlci9Kc29uUnBjU2VydmVyXCI7XG5pbXBvcnQgeyBXb3JrZXJOb2RlIH0gZnJvbSBcIkAvc2VydmVyL1dvcmtlck5vZGVcIjtcbmltcG9ydCB7IFdPUktFUk5PREVfU1RBUlRNQUtFU0NSSVBUIH0gZnJvbSBcIkAvc2VydmVyL1JlbW90ZU1ldGhvZHNcIjtcbmltcG9ydCB7IFdPUktFUk5PREVfTUFJTlRBUkdFVFMgfSBmcm9tIFwiQC9zZXJ2ZXIvUmVtb3RlTWV0aG9kc1wiO1xuaW1wb3J0IHsgV09SS0VSTk9ERV9QT1NUVEFSR0VUUyB9IGZyb20gXCJAL3NlcnZlci9SZW1vdGVNZXRob2RzXCI7XG5pbXBvcnQgeyBXT1JLRVJOT0RFX01BSU5TQ1JJUFRTIH0gZnJvbSBcIkAvc2VydmVyL1JlbW90ZU1ldGhvZHNcIjtcbmltcG9ydCB7IFdPUktFUk5PREVfUE9TVFNDUklQVFMgfSBmcm9tIFwiQC9zZXJ2ZXIvUmVtb3RlTWV0aG9kc1wiO1xuaW1wb3J0IHsgV09SS0VSTk9ERV9JTlNUQUxMRU5UUklFUyB9IGZyb20gXCJAL3NlcnZlci9SZW1vdGVNZXRob2RzXCI7XG5pbXBvcnQgeyBXT1JLRVJOT0RFX1BST0NFU1NFWElUIH0gZnJvbSBcIkAvc2VydmVyL1JlbW90ZU1ldGhvZHNcIjtcbmltcG9ydCB7IExvZ2dlciB9IGZyb20gXCJAL2xvZ2dlclwiO1xuXG5jb25zdCBsb2dnZXIgPSBMb2dnZXIuY3JlYXRlKGltcG9ydC5tZXRhLnVybCk7XG5cbmV4cG9ydCBjbGFzcyBXb3JrZXJTZXJ2aWNlIGltcGxlbWVudHMgSU1lc3NhZ2VFbWl0dGVyIHtcbiAgcHJpdmF0ZSBfanNvbnJwY1NlcnZlcjogSnNvblJwY1NlcnZlcjtcblxuICBwdWJsaWMgY29uc3RydWN0b3IobmFtZTogc3RyaW5nLCBzZW5kZXI6IElNZXNzYWdlU2VuZGVyKSB7XG4gICAgdGhpcy5fanNvbnJwY1NlcnZlciA9IG5ldyBKc29uUnBjU2VydmVyO1xuXG4gICAgY29uc3QgYnVmZmVyID0gbmV3IFNoYXJlZEFycmF5QnVmZmVyKDB4ODAwMCk7XG4gICAgY29uc3QgdHJhbnNwb3J0ID0gbmV3IE1lbW9yeVRyYW5zcG9ydChzZW5kZXIsIGJ1ZmZlcik7XG5cbiAgICBjb25zdCB3b3JrZXJOb2RlID0gbmV3IFdvcmtlck5vZGUobmFtZSwgdHJhbnNwb3J0KTtcbiAgICB0aGlzLl9qc29ucnBjU2VydmVyLnJlZ2lzdGVyQ2FsbGJhY2soV09SS0VSTk9ERV9TVEFSVE1BS0VTQ1JJUFQsIHBhcmFtcyA9PiB3b3JrZXJOb2RlLmV4ZWNNYWtlU2NyaXB0KHBhcmFtcykpO1xuICAgIHRoaXMuX2pzb25ycGNTZXJ2ZXIucmVnaXN0ZXJDYWxsYmFjayhXT1JLRVJOT0RFX01BSU5UQVJHRVRTLCBwYXJhbXMgPT4gd29ya2VyTm9kZS5tYWluVGFyZ2V0cyhwYXJhbXMpKTtcbiAgICB0aGlzLl9qc29ucnBjU2VydmVyLnJlZ2lzdGVyQ2FsbGJhY2soV09SS0VSTk9ERV9QT1NUVEFSR0VUUywgcGFyYW1zID0+IHdvcmtlck5vZGUucG9zdFRhcmdldHMocGFyYW1zKSk7XG4gICAgdGhpcy5fanNvbnJwY1NlcnZlci5yZWdpc3RlckNhbGxiYWNrKFdPUktFUk5PREVfTUFJTlNDUklQVFMsIHBhcmFtcyA9PiB3b3JrZXJOb2RlLm1haW5TY3JpcHRzKHBhcmFtcykpO1xuICAgIHRoaXMuX2pzb25ycGNTZXJ2ZXIucmVnaXN0ZXJDYWxsYmFjayhXT1JLRVJOT0RFX1BPU1RTQ1JJUFRTLCBwYXJhbXMgPT4gd29ya2VyTm9kZS5wb3N0U2NyaXB0cyhwYXJhbXMpKTtcbiAgICB0aGlzLl9qc29ucnBjU2VydmVyLnJlZ2lzdGVyQ2FsbGJhY2soV09SS0VSTk9ERV9JTlNUQUxMRU5UUklFUywgcGFyYW1zID0+IHdvcmtlck5vZGUuaW5zdGFsbEVudHJpZXMocGFyYW1zKSk7XG4gICAgdGhpcy5fanNvbnJwY1NlcnZlci5yZWdpc3RlckNhbGxiYWNrKFdPUktFUk5PREVfUFJPQ0VTU0VYSVQsIHBhcmFtcyA9PiB3b3JrZXJOb2RlLnByb2Nlc3NFeGl0KHBhcmFtcykpO1xuICB9XG5cbiAgcHVibGljIGVtaXRNZXNzYWdlKHNlbmRlcjogSU1lc3NhZ2VTZW5kZXIsIG1lc3NhZ2U6IGFueSk6IHZvaWQge1xuICAgIHJldHVybiB0aGlzLl9qc29ucnBjU2VydmVyLmVtaXRNZXNzYWdlKHNlbmRlciwgbWVzc2FnZSk7XG4gIH1cbn07XG4iLCIvKlxuICogTUlUIExpY2Vuc2VcbiAqXG4gKiBDb3B5cmlnaHQgKGMpIDIwMjUgIFl1cmlpIFlha3ViaW4gKHl1cmlpLnlha3ViaW5AZ21haWwuY29tKVxuICpcbiAqIFBlcm1pc3Npb24gaXMgZ3JhbnRlZCB0byB1c2UsIGNvcHksIG1vZGlmeSwgYW5kIGRpc3RyaWJ1dGUgdGhpcyBzb2Z0d2FyZVxuICogdW5kZXIgdGhlIE1JVCBMaWNlbnNlLiBTZWUgTElDRU5TRSBmaWxlIGZvciBkZXRhaWxzLlxuICovXG5cbmV4cG9ydCBuYW1lc3BhY2UgQXJncyB7XG5cbmZ1bmN0aW9uIHRvT3B0aW9uS2V5KG5hbWU6IHN0cmluZykge1xuICBpZiAoIW5hbWUuc3RhcnRzV2l0aChcIi0tXCIpKVxuICAgIHJldHVybiBudWxsO1xuXG4gIG5hbWUgPSBuYW1lLnN1YnN0cmluZygyKS50b0xvd2VyQ2FzZSgpO1xuICBpZiAoIW5hbWUubGVuZ3RoKVxuICAgIHJldHVybiBudWxsO1xuXG4gIGxldCBrZXkgPSBuYW1lLmNoYXJBdCgwKTtcbiAgaWYgKCFrZXkubWF0Y2goL1thLXpdLykpXG4gICAgcmV0dXJuIG51bGw7XG5cbiAgbGV0IGh5cGhlbiA9IDA7XG4gIGZvciAobGV0IGkgPSAxOyBpIDwgbmFtZS5sZW5ndGg7IGkrKykge1xuICAgIGNvbnN0IGNoID0gbmFtZS5jaGFyQXQoaSk7XG4gICAgaWYgKGNoLm1hdGNoKC9bYS16MC05XS8pKSB7XG4gICAgICBrZXkgKz0gKGh5cGhlbiA/IGNoLnRvVXBwZXJDYXNlKCkgOiBjaClcbiAgICAgIGh5cGhlbiA9IDA7XG4gICAgfVxuICAgIGVsc2UgaWYgKGNoID09IFwiLVwiKSB7XG4gICAgICBpZiAoKytoeXBoZW4gPiAxKVxuICAgICAgICByZXR1cm4gbnVsbDtcbiAgICB9XG4gIH1cblxuICByZXR1cm4gaHlwaGVuID8gbnVsbCA6IGtleTtcbn1cblxuZXhwb3J0IGZ1bmN0aW9uIHRvT2JqZWN0KGFyZ3M6IHN0cmluZ1tdKTogb2JqZWN0IHtcbiAgY29uc3QgcmVzdWx0OiBhbnkgPSB7fTtcblxuICBsZXQgbGFzdEtleSA9IG51bGw7XG4gIGZvciAoY29uc3QgaXRlciBvZiBhcmdzKSB7XG4gICAgaWYgKGl0ZXIuc3RhcnRzV2l0aChcIi0tXCIpKSB7XG4gICAgICBjb25zdCBrZXkgPSB0b09wdGlvbktleShpdGVyKTtcbiAgICAgIGlmICgha2V5KVxuICAgICAgICB0aHJvdyBFcnJvcihgT3B0aW9uICR7aXRlcn0gaXMgbm90IHN1cHBvcnRlZGApO1xuICAgICAgaWYgKHJlc3VsdC5oYXNPd25Qcm9wZXJ0eShrZXkpKVxuICAgICAgICB0aHJvdyBFcnJvcihgQ2Fubm90IHNwZWNpZnkgdGhlIHNhbWUgb3B0aW9uICcke2l0ZXJ9JyBtb3JlIHRoYW4gb25jZWApO1xuICAgICAgbGFzdEtleSA9IGtleTtcbiAgICAgIHJlc3VsdFtrZXldID0gdHJ1ZTtcbiAgICB9XG4gICAgZWxzZSBpZiAobGFzdEtleSkge1xuICAgICAgY29uc3QgdmFsdWUgPSByZXN1bHRbbGFzdEtleV07XG4gICAgICBpZiAodHlwZW9mIHZhbHVlID09PSAnYm9vbGVhbicpXG4gICAgICAgIHJlc3VsdFtsYXN0S2V5XSA9IGl0ZXI7XG4gICAgICBlbHNlIGlmICh0eXBlb2YgdmFsdWUgPT09ICdzdHJpbmcnKVxuICAgICAgICByZXN1bHRbbGFzdEtleV0gPSBbIHZhbHVlLCBpdGVyIF07XG4gICAgICBlbHNlXG4gICAgICAgIHZhbHVlLnB1c2goaXRlcik7XG4gICAgfVxuICAgIGVsc2Uge1xuICAgICAgdGhyb3cgRXJyb3IoYE5lZWQgdG8gc3BlY2lmeSB0aGUgb3B0aW9uIG5hbWUgYmVmb3JlICcke2l0ZXJ9JyBwYXJhbWV0ZXJgKTtcbiAgICB9XG4gIH1cblxuICByZXR1cm4gcmVzdWx0O1xufVxuXG59IC8vIG5hbWVzcGFjZSBBcmdzXG4iLCIvKlxuICogTUlUIExpY2Vuc2VcbiAqXG4gKiBDb3B5cmlnaHQgKGMpIDIwMjUgIFl1cmlpIFlha3ViaW4gKHl1cmlpLnlha3ViaW5AZ21haWwuY29tKVxuICpcbiAqIFBlcm1pc3Npb24gaXMgZ3JhbnRlZCB0byB1c2UsIGNvcHksIG1vZGlmeSwgYW5kIGRpc3RyaWJ1dGUgdGhpcyBzb2Z0d2FyZVxuICogdW5kZXIgdGhlIE1JVCBMaWNlbnNlLiBTZWUgTElDRU5TRSBmaWxlIGZvciBkZXRhaWxzLlxuICovXG5cbmltcG9ydCBwYXRoIGZyb20gXCJub2RlOnBhdGhcIjtcbmltcG9ydCBmcyBmcm9tIFwibm9kZTpmc1wiO1xuaW1wb3J0IHsgc3Bhd24gfSBmcm9tIFwibm9kZTpjaGlsZF9wcm9jZXNzXCI7XG5pbXBvcnQgeyBMb2dnZXIgfSBmcm9tIFwiQC9sb2dnZXJcIjtcblxuY29uc3QgbG9nZ2VyID0gTG9nZ2VyLmNyZWF0ZShpbXBvcnQubWV0YS51cmwpO1xuXG50eXBlIFJlc3VsdCA9IHtcbiAgc3RhdHVzOiBudW1iZXI7XG59O1xuXG5leHBvcnQgZnVuY3Rpb24gc3Bhd25Bc3luYyhjb21tYW5kOiBzdHJpbmcsIGFyZ3M6IHN0cmluZ1tdLCBvcHRpb25zPzogYW55KTogUHJvbWlzZTxSZXN1bHQ+IHtcbiAgbGV0IGZkID0gbnVsbDtcbiAgbGV0IHZlcmJvc2UgPSBmYWxzZTtcbiAgaWYgKG9wdGlvbnMgJiYgb3B0aW9ucy5leHRyYSkge1xuICAgIGlmIChvcHRpb25zLmV4dHJhLnZlcmJvc2UpXG4gICAgICB2ZXJib3NlID0gdHJ1ZTtcbiAgICBpZiAob3B0aW9ucy5leHRyYS5vdXRwdXQpIHtcbiAgICAgIGxldCBsb2dmaWxlID0gb3B0aW9ucy5leHRyYS5vdXRwdXQ7XG4gICAgICBpZiAoIXBhdGguaXNBYnNvbHV0ZShsb2dmaWxlKSAmJiBvcHRpb25zLmN3ZCkge1xuICAgICAgICBsb2dmaWxlID0gcGF0aC5yZXNvbHZlKG9wdGlvbnMuY3dkLCBsb2dmaWxlKTtcbiAgICAgIH1cbiAgICAgIGZkID0gZnMub3BlblN5bmMobG9nZmlsZSwgXCJ3K1wiLCAwbzY2Nik7XG4gICAgfVxuICB9XG4gIHJldHVybiBuZXcgUHJvbWlzZSgocmVzb2x2ZSwgcmVqZWN0KSA9PiB7XG4gICAgaWYgKGZkIHx8IHZlcmJvc2UpIHtcbiAgICAgIHZlcmJvc2UgJiYgbG9nZ2VyLm5vdGljZShbIHBhdGguYmFzZW5hbWUoY29tbWFuZCksIC4uLmFyZ3MgXS5qb2luKFwiIFwiKSk7XG4gICAgICBmZCAmJiBmcy53cml0ZVN5bmMoZmQsIEpTT04uc3RyaW5naWZ5KHtjb21tYW5kLCBhcmdzLCBvcHRpb25zIH0sIG51bGwsIDIpICsgXCJcXG5cIik7XG4gICAgfVxuICAgIGNvbnN0IGV4ZWMgPSBzcGF3bihjb21tYW5kLCBhcmdzLCBvcHRpb25zKTtcbiAgICBleGVjLnN0ZG91dC5vbihcImRhdGFcIiwgKGRhdGEpID0+IHtcbiAgICAgIHByb2Nlc3Muc3Rkb3V0LndyaXRlKGRhdGEpO1xuICAgICAgZmQgJiYgZnMud3JpdGVTeW5jKGZkLCBkYXRhKTtcbiAgICB9KTtcbiAgICBleGVjLnN0ZGVyci5vbihcImRhdGFcIiwgKGRhdGEpID0+IHtcbiAgICAgIHByb2Nlc3Muc3RkZXJyLndyaXRlKGRhdGEpO1xuICAgICAgZmQgJiYgZnMud3JpdGVTeW5jKGZkLCBkYXRhKTtcbiAgICB9KTtcbiAgICBleGVjLm9uKFwiY2xvc2VcIiwgKHN0YXR1czogbnVtYmVyKSA9PiB7XG4gICAgICBmZCAmJiBmcy5jbG9zZVN5bmMoZmQpO1xuICAgICAgcmVzb2x2ZSh7c3RhdHVzfSk7XG4gICAgfSk7XG4gIH0pO1xufVxuIiwiLypcbiAqIE1JVCBMaWNlbnNlXG4gKlxuICogQ29weXJpZ2h0IChjKSAyMDI1ICBZdXJpaSBZYWt1YmluICh5dXJpaS55YWt1YmluQGdtYWlsLmNvbSlcbiAqXG4gKiBQZXJtaXNzaW9uIGlzIGdyYW50ZWQgdG8gdXNlLCBjb3B5LCBtb2RpZnksIGFuZCBkaXN0cmlidXRlIHRoaXMgc29mdHdhcmVcbiAqIHVuZGVyIHRoZSBNSVQgTGljZW5zZS4gU2VlIExJQ0VOU0UgZmlsZSBmb3IgZGV0YWlscy5cbiAqL1xuXG5pbXBvcnQgZnMgZnJvbSBcIm5vZGU6ZnNcIjtcbmltcG9ydCBwYXRoIGZyb20gXCJub2RlOnBhdGhcIjtcbmltcG9ydCB1cmwgZnJvbSBcIm5vZGU6dXJsXCI7XG5cbmltcG9ydCB7IEZJTEVfU0NIRU1FLCBJTVBPUlRfU0NIRU1FLCBIVFRQX1NDSEVNRSwgSFRUUFNfU0NIRU1FIH0gZnJvbSBcIkAvdXRpbHMvVXJsU2NoZW1lXCI7XG5pbXBvcnQgeyByZXF1aXJlUmVzb2x2ZSB9IGZyb20gXCJAL3V0aWxzL01vZHVsZVwiO1xuXG5leHBvcnQgYXN5bmMgZnVuY3Rpb24gcGF0aEV4aXN0cyhwYXRoOiBzdHJpbmcpIHtcbiAgdHJ5IHtcbiAgICByZXR1cm4gISEoYXdhaXQgZnMucHJvbWlzZXMuc3RhdChwYXRoKSk7XG4gIH0gY2F0Y2gge1xuICAgIHJldHVybiBmYWxzZTtcbiAgfVxufVxuXG5leHBvcnQgZnVuY3Rpb24gcGF0aEV4aXN0c1N5bmMocGF0aDogc3RyaW5nKSB7XG4gIHRyeSB7XG4gICAgcmV0dXJuICEhZnMuc3RhdFN5bmMocGF0aCk7XG4gIH0gY2F0Y2gge1xuICAgIHJldHVybiBmYWxzZTtcbiAgfVxufVxuXG5leHBvcnQgYXN5bmMgZnVuY3Rpb24gZmlsZUV4aXN0cyhwYXRoOiBzdHJpbmcpIHtcbiAgdHJ5IHtcbiAgICByZXR1cm4gKGF3YWl0IGZzLnByb21pc2VzLnN0YXQocGF0aCkpLmlzRmlsZSgpO1xuICB9IGNhdGNoIHtcbiAgICByZXR1cm4gZmFsc2U7XG4gIH1cbn1cblxuZXhwb3J0IGZ1bmN0aW9uIGZpbGVFeGlzdHNTeW5jKHBhdGg6IHN0cmluZykge1xuICB0cnkge1xuICAgIHJldHVybiBmcy5zdGF0U3luYyhwYXRoKS5pc0ZpbGUoKTtcbiAgfSBjYXRjaCB7XG4gICAgcmV0dXJuIGZhbHNlO1xuICB9IFxufVxuXG5leHBvcnQgYXN5bmMgZnVuY3Rpb24gZGlyZWN0b3J5RXhpc3RzKHBhdGg6IHN0cmluZykge1xuICB0cnkge1xuICAgIHJldHVybiAoYXdhaXQgZnMucHJvbWlzZXMuc3RhdChwYXRoKSkuaXNEaXJlY3RvcnkoKTtcbiAgfSBjYXRjaCB7XG4gICAgcmV0dXJuIGZhbHNlO1xuICB9XG59XG5cbmV4cG9ydCBmdW5jdGlvbiBkaXJlY3RvcnlFeGlzdHNTeW5jKHBhdGg6IHN0cmluZykge1xuICB0cnkge1xuICAgcmV0dXJuIGZzLnN0YXRTeW5jKHBhdGgpLmlzRGlyZWN0b3J5KCk7XG4gIH0gY2F0Y2gge1xuICAgIHJldHVybiBmYWxzZTtcbiAgfVxufVxuXG5leHBvcnQgZnVuY3Rpb24gZXh0bmFtZShmdWxscGF0aDogc3RyaW5nLCBvcHRpb25zOiBhbnkpIHtcbiAgaWYgKG9wdGlvbnM/Lmxvbmdlc3QpIHtcbiAgICBjb25zdCBmaWxlbmFtZSA9IHBhdGguYmFzZW5hbWUoZnVsbHBhdGgpO1xuICAgIGNvbnN0IGluZGV4ID0gZmlsZW5hbWUuaW5kZXhPZignLicpO1xuICAgIHJldHVybiBpbmRleCAhPSAtMSA/IGZpbGVuYW1lLnN1YnN0cmluZyhpbmRleCkgOiAnJztcbiAgfVxuXG4gIHJldHVybiBwYXRoLmV4dG5hbWUoZnVsbHBhdGgpO1xufVxuXG5leHBvcnQgYXN5bmMgZnVuY3Rpb24gZmlsZUxpc3QoZGlybmFtZTogc3RyaW5nLCBvcHRpb25zOiBhbnkpOiBQcm9taXNlPEFycmF5PHN0cmluZz4+IHtcbiAgY29uc3QgbGlzdCA9IG5ldyBBcnJheTxzdHJpbmc+O1xuICBpZiAoYXdhaXQgZGlyZWN0b3J5RXhpc3RzKGRpcm5hbWUpKSB7XG4gICAgZm9yIChjb25zdCBpdGVyIG9mIGF3YWl0IGZzLnByb21pc2VzLnJlYWRkaXIoZGlybmFtZSkpIHtcbiAgICAgIGNvbnN0IGZpbGVwYXRoID0gcGF0aC5yZXNvbHZlKGRpcm5hbWUsIGl0ZXIpO1xuICAgICAgY29uc3Qgc3RhdCA9IGF3YWl0IGZzLnByb21pc2VzLnN0YXQoZmlsZXBhdGgpO1xuICAgICAgaWYgKHN0YXQuaXNGaWxlKCkpIHtcbiAgICAgICAgbGlzdC5wdXNoKG9wdGlvbnMucmVsYXRpdmUgPyBwYXRoLnJlbGF0aXZlKG9wdGlvbnMucmVsYXRpdmUsIGZpbGVwYXRoKSA6IGZpbGVwYXRoKTtcbiAgICAgIH1cbiAgICAgIGVsc2UgaWYgKG9wdGlvbnMucmVjdXJzaXZlICYmIHN0YXQuaXNEaXJlY3RvcnkoKSkge1xuICAgICAgICBmb3IgKGNvbnN0IGZuYW1lIG9mIGF3YWl0IGZpbGVMaXN0KGZpbGVwYXRoLCBvcHRpb25zKSlcbiAgICAgICAgICBsaXN0LnB1c2goZm5hbWUpO1xuICAgICAgfVxuICAgIH1cbiAgfVxuICByZXR1cm4gbGlzdDtcbn1cblxuZXhwb3J0IGFzeW5jIGZ1bmN0aW9uIHNhdmVJZkRpZmZlcmVudChmaWxlbmFtZTogc3RyaW5nLCBjb250ZW50OiBzdHJpbmcpIHtcbiAgaWYgKGF3YWl0IGZpbGVFeGlzdHMoZmlsZW5hbWUpKSB7XG4gICAgY29uc3Qgb2xkQ29udGVudCA9IGF3YWl0IGZzLnByb21pc2VzLnJlYWRGaWxlKGZpbGVuYW1lLCB7IGVuY29kaW5nOiBcInV0ZjhcIiB9KTtcbiAgICBpZiAoY29udGVudCA9PSBvbGRDb250ZW50KVxuICAgICAgcmV0dXJuIGZhbHNlO1xuICB9XG5cbiAgYXdhaXQgZnMucHJvbWlzZXMubWtkaXIocGF0aC5kaXJuYW1lKGZpbGVuYW1lKSwgeyByZWN1cnNpdmU6IHRydWUgfSk7XG4gIGF3YWl0IGZzLnByb21pc2VzLndyaXRlRmlsZShmaWxlbmFtZSwgY29udGVudCwgeyBlbmNvZGluZzogXCJ1dGY4XCIgfSk7XG5cbiAgcmV0dXJuIHRydWU7XG59XG5cbmV4cG9ydCBmdW5jdGlvbiBnZXRQYXRoU3RyaW5nKHN0cjogc3RyaW5nKSB7XG4gIGlmIChzdHIuc3RhcnRzV2l0aChJTVBPUlRfU0NIRU1FKSlcbiAgICBzdHIgPSByZXF1aXJlUmVzb2x2ZShzdHIuc2xpY2UoSU1QT1JUX1NDSEVNRS5sZW5ndGgpKTtcbiAgaWYgKHN0ci5zdGFydHNXaXRoKEZJTEVfU0NIRU1FKSlcbiAgICByZXR1cm4gdXJsLmZpbGVVUkxUb1BhdGgoc3RyKTtcbiAgcmV0dXJuIHN0cjtcbn1cblxuZXhwb3J0IGZ1bmN0aW9uIGlzVVJMKHN0cjogc3RyaW5nKSB7XG4gIHRyeSB7XG4gICAgbmV3IFVSTChzdHIpO1xuICAgIHJldHVybiB0cnVlO1xuICB9IGNhdGNoIHtcbiAgICByZXR1cm4gZmFsc2U7XG4gIH1cbn1cblxuZXhwb3J0IGZ1bmN0aW9uIGdldFVSTFN0cmluZyhzdHI6IHN0cmluZykge1xuICBpZiAoc3RyLnN0YXJ0c1dpdGgoSU1QT1JUX1NDSEVNRSkpXG4gICAgcmV0dXJuIHJlcXVpcmVSZXNvbHZlKHN0ci5zbGljZShJTVBPUlRfU0NIRU1FLmxlbmd0aCkpO1xuICBpZiAoaXNVUkwoc3RyKSlcbiAgICByZXR1cm4gdXJsLmZpbGVVUkxUb1BhdGgoc3RyKTtcbiAgcmV0dXJuIHN0cjtcbn1cblxuZXhwb3J0IGFzeW5jIGZ1bmN0aW9uIGZldGNoQnVmZmVyKHN0cjogc3RyaW5nKTogUHJvbWlzZTxCdWZmZXI+IHtcbiAgaWYgKHN0ci5zdGFydHNXaXRoKEhUVFBfU0NIRU1FKSB8fCBzdHIuc3RhcnRzV2l0aChIVFRQU19TQ0hFTUUpKSB7XG4gICAgY29uc3QgcmVzcG9uc2UgPSBhd2FpdCBmZXRjaChzdHIpO1xuICAgIHJldHVybiBCdWZmZXIuZnJvbShhd2FpdCByZXNwb25zZS5hcnJheUJ1ZmZlcigpKTtcbiAgfVxuICByZXR1cm4gYXdhaXQgZnMucHJvbWlzZXMucmVhZEZpbGUoZ2V0VVJMU3RyaW5nKHN0cikpO1xufVxuXG5leHBvcnQgYXN5bmMgZnVuY3Rpb24gc2F2ZUFzSlNPTihmaWxlbmFtZTogc3RyaW5nLCB2YWx1ZTogYW55LCBvcHRpb25zPzogeyBwcmV0dHk6IGJvb2xlYW4gfSkge1xuICBjb25zdCBjb250ZW50ID0gSlNPTi5zdHJpbmdpZnkodmFsdWUsIG51bGwsIG9wdGlvbnMgJiYgb3B0aW9ucy5wcmV0dHkgPyAyIDogMCk7XG4gIGF3YWl0IGZzLnByb21pc2VzLm1rZGlyKHBhdGguZGlybmFtZShmaWxlbmFtZSksIHsgcmVjdXJzaXZlOiB0cnVlIH0pO1xuICBhd2FpdCBmcy5wcm9taXNlcy53cml0ZUZpbGUoZmlsZW5hbWUsIGNvbnRlbnQsIHsgZW5jb2Rpbmc6IFwidXRmOFwiIH0pO1xufVxuIiwiLypcbiAqIE1JVCBMaWNlbnNlXG4gKlxuICogQ29weXJpZ2h0IChjKSAyMDI1ICBZdXJpaSBZYWt1YmluICh5dXJpaS55YWt1YmluQGdtYWlsLmNvbSlcbiAqXG4gKiBQZXJtaXNzaW9uIGlzIGdyYW50ZWQgdG8gdXNlLCBjb3B5LCBtb2RpZnksIGFuZCBkaXN0cmlidXRlIHRoaXMgc29mdHdhcmVcbiAqIHVuZGVyIHRoZSBNSVQgTGljZW5zZS4gU2VlIExJQ0VOU0UgZmlsZSBmb3IgZGV0YWlscy5cbiAqL1xuXG5pbXBvcnQgb3MgZnJvbSBcIm5vZGU6b3NcIjtcblxuY29uc3Qgc2l6ZW9mVm9pZHBCaXRzOiBhbnkgPVxue1xuICBhcm06ICAgICA0LFxuICBhcm02NDogICA4LFxuICBpYTMyOiAgICA0LFxuICBsb29uZzY0OiA4LFxuICBtaXBzOiAgICA0LFxuICBtaXBzZWw6ICA0LFxuICBwcGM6ICAgICA0LFxuICBwcGM2NDogICA4LFxuICByaXNjdjY0OiA4LFxuICBzMzkwOiAgICA0LFxuICBzMzkweDogICA4LFxuICB4NjQ6ICAgICA0LFxufTtcblxuY29uc3QgX3NpemVvZlZvaWRwID0gc2l6ZW9mVm9pZHBCaXRzW29zLmFyY2goKV07XG5pZiAoIV9zaXplb2ZWb2lkcClcbiAgdGhyb3cgbmV3IEVycm9yKGBVbmtub3duICR7b3MuYXJjaCgpfSBhcmNoYCk7XG5cbmxldCBfZXhlY3V0YWJsZVN1ZmZpeDogc3RyaW5nO1xuXG5pZiAob3MucGxhdGZvcm0oKSA9PT0gXCJ3aW4zMlwiKSB7XG4gIF9leGVjdXRhYmxlU3VmZml4ID0gXCIuZXhlXCI7XG59XG5lbHNlIHtcbiAgX2V4ZWN1dGFibGVTdWZmaXggPSBcIlwiO1xufVxuXG5leHBvcnQgY2xhc3MgSG9zdCB7XG4gIHN0YXRpYyBnZXQgc2l6ZW9mVm9pZHAoKTogNCB8IDgge1xuICAgIHJldHVybiBfc2l6ZW9mVm9pZHA7XG4gIH1cbiAgc3RhdGljIGdldCBleGVjdXRhYmxlU3VmZml4KCk6IHN0cmluZyB7XG4gICAgcmV0dXJuIF9leGVjdXRhYmxlU3VmZml4O1xuICB9XG59O1xuIiwiLypcbiAqIE1JVCBMaWNlbnNlXG4gKlxuICogQ29weXJpZ2h0IChjKSAyMDI1ICBZdXJpaSBZYWt1YmluICh5dXJpaS55YWt1YmluQGdtYWlsLmNvbSlcbiAqXG4gKiBQZXJtaXNzaW9uIGlzIGdyYW50ZWQgdG8gdXNlLCBjb3B5LCBtb2RpZnksIGFuZCBkaXN0cmlidXRlIHRoaXMgc29mdHdhcmVcbiAqIHVuZGVyIHRoZSBNSVQgTGljZW5zZS4gU2VlIExJQ0VOU0UgZmlsZSBmb3IgZGV0YWlscy5cbiAqL1xuXG5pbXBvcnQgcGF0aCBmcm9tIFwibm9kZTpwYXRoXCI7XG5pbXBvcnQgZnMgZnJvbSBcIm5vZGU6ZnNcIjtcbmltcG9ydCBodHRwIGZyb20gXCJodHRwXCI7XG5pbXBvcnQgaHR0cHMgZnJvbSBcImh0dHBzXCI7XG5cbmltcG9ydCB7IExvZ2dlciB9IGZyb20gXCJAL2xvZ2dlclwiO1xuXG5jb25zdCBsb2dnZXIgPSBMb2dnZXIuY3JlYXRlKGltcG9ydC5tZXRhLnVybCk7XG5cbmludGVyZmFjZSBJUmVzb2x2ZUJ1aWxkZXIge1xuICBhcHBlbmQoZGF0YTogQnVmZmVyKTogdm9pZDtcbiAgdG9SZXN1bHQoKTogQnVmZmVyIHwgdW5kZWZpbmVkO1xufTtcblxuY2xhc3MgQnVmZmVyQnVpbGRlciBpbXBsZW1lbnRzIElSZXNvbHZlQnVpbGRlciB7XG4gIHByaXZhdGUgX2NodW5rczogQXJyYXk8QnVmZmVyPiA9IFtdO1xuXG4gIHB1YmxpYyBhcHBlbmQoY2h1bms6IEJ1ZmZlcik6IHZvaWQge1xuICAgIHRoaXMuX2NodW5rcy5wdXNoKGNodW5rKTtcbiAgfVxuXG4gIHB1YmxpYyB0b1Jlc3VsdCgpOiBCdWZmZXIge1xuICAgIHJldHVybiBCdWZmZXIuY29uY2F0KHRoaXMuX2NodW5rcyk7XG4gIH1cbn07XG5cbmNsYXNzIEZpbGVTeW5jV3JpdGVyIGltcGxlbWVudHMgSVJlc29sdmVCdWlsZGVyIHtcbiAgcHJpdmF0ZSBfZmQ6IG51bWJlcjtcblxuICBwdWJsaWMgY29uc3RydWN0b3IoZmlsZTogc3RyaW5nKSB7XG4gICAgdGhpcy5fZmQgPSBmcy5vcGVuU3luYyhmaWxlLCBcIndcIik7XG4gIH1cblxuICBwdWJsaWMgYXBwZW5kKGNodW5rOiBCdWZmZXIpOiB2b2lkIHtcbiAgICBmcy53cml0ZVN5bmModGhpcy5fZmQsIGNodW5rKTtcbiAgfVxuXG4gIHB1YmxpYyB0b1Jlc3VsdCgpOiB1bmRlZmluZWQge1xuICAgIGZzLmNsb3NlU3luYyh0aGlzLl9mZCk7XG4gIH1cbn07XG5cbmZ1bmN0aW9uIGNyZWF0ZUJ1aWxkZXIoZmlsZT86IHN0cmluZyk6IElSZXNvbHZlQnVpbGRlciB7XG4gIGlmIChmaWxlKVxuICAgIHJldHVybiBuZXcgRmlsZVN5bmNXcml0ZXIoZmlsZSk7XG4gIHJldHVybiBuZXcgQnVmZmVyQnVpbGRlcjtcbn1cblxuZnVuY3Rpb24gaHR0cFJlcXVlc3QodXJsOiBzdHJpbmcsIG9wdGlvbnM6IGh0dHAuUmVxdWVzdE9wdGlvbnMgfCBodHRwcy5SZXF1ZXN0T3B0aW9ucywgY2FsbGJhY2s6IGFueSk6IGh0dHAuQ2xpZW50UmVxdWVzdCB7XG4gIGlmICh1cmwuc3RhcnRzV2l0aChcImh0dHBzOi8vXCIpKVxuICAgIHJldHVybiBodHRwcy5yZXF1ZXN0KHVybCwgb3B0aW9ucywgY2FsbGJhY2spO1xuICByZXR1cm4gaHR0cC5yZXF1ZXN0KHVybCwgb3B0aW9ucywgY2FsbGJhY2spO1xufTtcblxuaW50ZXJmYWNlIEZldGNoT3B0aW9ucyB7XG4gIGF0dGVtcHRzPzogbnVtYmVyO1xufTtcblxuZnVuY3Rpb24gZmV0Y2hJbXBsKHVybDogc3RyaW5nLCBmaWxlOiBzdHJpbmcgfCB1bmRlZmluZWQsIG9wdGlvbnM6IEZldGNoT3B0aW9ucyk6IFByb21pc2U8QnVmZmVyfHVuZGVmaW5lZD4ge1xuICByZXR1cm4gbmV3IFByb21pc2UoKHJlc29sdmUsIHJlamVjdCkgPT4ge1xuICAgIGNvbnN0IGh0dHBPcHRpb25zID0ge1xuICAgICAgbWV0aG9kOiAnR0VUJyxcbiAgICAgIHRpbWVvdXQ6IDUwMDAsXG4gICAgICBoZWFkZXJzOiB7XG4gICAgICAgIFwiVXNlci1BZ2VudFwiOiBQUk9KRUNUX05BTUUgKyBcIi9cIiArIFBST0pFQ1RfVkVSU0lPTixcbiAgICAgICAgXCJBY2NlcHRcIjogXCIqLypcIixcbiAgICAgIH0sXG4gICAgfTtcblxuICAgIGxldCBhdHRlbXB0cyA9IG9wdGlvbnMuYXR0ZW1wdHMgfHwgMDtcbiAgICBjb25zdCBkb1JlcXVlc3QgPSAodXJsOiBzdHJpbmcpID0+IHtcbiAgICAgIGNvbnN0IHJlcXVlc3QgPSBodHRwUmVxdWVzdCh1cmwsIGh0dHBPcHRpb25zLCBvblJlcXVlc3QpO1xuXG4gICAgICBsZXQgaGFzRXJyb3IgPSBmYWxzZTtcbiAgICAgIGNvbnN0IG9uRXJyb3IgPSAoZXJyOiBFcnJvcikgPT4ge1xuICAgICAgICByZXF1ZXN0LmRlc3Ryb3koKTtcbiAgICAgICAgaWYgKCFoYXNFcnJvcikge1xuICAgICAgICAgIGhhc0Vycm9yID0gdHJ1ZTtcbiAgICAgICAgICBpZiAoYXR0ZW1wdHMgPiAwKSB7XG4gICAgICAgICAgICBsb2dnZXIud2FybihlcnIubWVzc2FnZSk7XG4gICAgICAgICAgICBsb2dnZXIuaW5mbyhgcmUtd2dldCAke3VybH0gYXR0ZW1wdHMgJHthdHRlbXB0c31gKTtcbiAgICAgICAgICAgIGF0dGVtcHRzLS07XG4gICAgICAgICAgICBkb1JlcXVlc3QodXJsKTtcbiAgICAgICAgICB9XG4gICAgICAgICAgZWxzZSB7XG4gICAgICAgICAgICByZWplY3QoZXJyKTtcbiAgICAgICAgICB9XG4gICAgICAgIH1cbiAgICAgIH07XG5cbiAgICAgIHJlcXVlc3Qub24oXCJ0aW1lb3V0XCIsICgpID0+IHtcbiAgICAgICAgb25FcnJvcihuZXcgRXJyb3IoXCJUaW1lb3V0IGZvciBcIiArIHVybCkpO1xuICAgICAgfSk7XG5cbiAgICAgIHJlcXVlc3Qub24oXCJlcnJvclwiLCAoZXJyOiBFcnJvcikgPT4ge1xuICAgICAgICBvbkVycm9yKGVycik7XG4gICAgICB9KTtcblxuICAgICAgcmVxdWVzdC5lbmQoKTtcbiAgICB9O1xuXG4gICAgY29uc3QgZmlsZW5hbWUgPSBwYXRoLmJhc2VuYW1lKHVybCk7XG4gICAgY29uc3Qgb25SZXF1ZXN0ID0gKHJlc3BvbnNlOiBodHRwLkluY29taW5nTWVzc2FnZSkgPT4ge1xuICAgICAgc3dpdGNoIChyZXNwb25zZS5zdGF0dXNDb2RlKSB7XG4gICAgICBjYXNlIDIwMDpcbiAgICAgICAgbG9nZ2VyLmRlYnVnKGBDb25uY3RlZCB0byAkeyhyZXNwb25zZSBhcyBhbnkpLnJlcS5ob3N0fWApO1xuICAgICAgICBsb2dnZXIuZGVidWcoYERvd25sb2FkaW5nICR7ZmlsZW5hbWV9YCk7XG4gICAgICAgIGNvbnN0IGJ1aWxkZXIgPSBjcmVhdGVCdWlsZGVyKGZpbGUpO1xuICAgICAgICByZXNwb25zZS5vbihcImRhdGFcIiwgKGNodW5rOiBCdWZmZXIpID0+IGJ1aWxkZXIuYXBwZW5kKGNodW5rKSk7XG4gICAgICAgIHJlc3BvbnNlLm9uKFwiZW5kXCIsICgpID0+IHJlc29sdmUoYnVpbGRlci50b1Jlc3VsdCgpKSk7XG4gICAgICAgIHJlc3BvbnNlLm9uKCdjbG9zZScsICgpID0+IGxvZ2dlci5kZWJ1ZyhcIkNsb3NlXCIpKTtcbiAgICAgICAgYnJlYWs7XG5cbiAgICAgIGNhc2UgMzAxOlxuICAgICAgY2FzZSAzMDI6XG4gICAgICAgIHJlc3BvbnNlLnJlc3VtZSgpO1xuICAgICAgICBpZiAocmVzcG9uc2UuaGVhZGVycy5sb2NhdGlvbikge1xuICAgICAgICAgIGxvZ2dlci5pbmZvKFwiUmVkaXJlY3QgdG8gXCIgKyByZXNwb25zZS5oZWFkZXJzLmxvY2F0aW9uKTtcbiAgICAgICAgICBkb1JlcXVlc3QocmVzcG9uc2UuaGVhZGVycy5sb2NhdGlvbik7XG4gICAgICAgIH1cbiAgICAgICAgYnJlYWs7XG5cbiAgICAgIGRlZmF1bHQ6XG4gICAgICAgIHJlc3BvbnNlLnJlc3VtZSgpO1xuICAgICAgICBjb25zdCBtZXNzYWdlID0gXCJEaWQgbm90IGdldCBhbiBPSyBmcm9tIHRoZSBzZXJ2ZXIuIENvZGU6IFwiICsgcmVzcG9uc2Uuc3RhdHVzQ29kZTtcbiAgICAgICAgbG9nZ2VyLmVycm9yKG1lc3NhZ2UpO1xuICAgICAgICByZWplY3QobWVzc2FnZSk7XG4gICAgICAgIGJyZWFrO1xuICAgICAgfVxuICAgIH07XG5cbiAgICBsb2dnZXIuaW5mbyhcIndnZXQgXCIgKyB1cmwpO1xuICAgIGRvUmVxdWVzdCh1cmwpO1xuICB9KTtcbn07XG5cbmV4cG9ydCBmdW5jdGlvbiByZXF1ZXN0R2V0KHVybDogc3RyaW5nLCBvcHRpb25zPzogRmV0Y2hPcHRpb25zKSB7XG4gIHJldHVybiBmZXRjaEltcGwodXJsLCB1bmRlZmluZWQsIG9wdGlvbnMgfHwge30pIGFzIFByb21pc2U8QnVmZmVyPjtcbn1cblxuZXhwb3J0IGZ1bmN0aW9uIGRvd25sb2FkRmlsZSh1cmw6IHN0cmluZywgZmlsZTogc3RyaW5nLCBvcHRpb25zPzogRmV0Y2hPcHRpb25zKSB7XG4gIHJldHVybiBmZXRjaEltcGwodXJsLCBmaWxlLCBvcHRpb25zIHx8IHt9KSBhcyBQcm9taXNlPHVuZGVmaW5lZD47XG59XG4iLCIvKlxuICogTUlUIExpY2Vuc2VcbiAqXG4gKiBDb3B5cmlnaHQgKGMpIDIwMjUgIFl1cmlpIFlha3ViaW4gKHl1cmlpLnlha3ViaW5AZ21haWwuY29tKVxuICpcbiAqIFBlcm1pc3Npb24gaXMgZ3JhbnRlZCB0byB1c2UsIGNvcHksIG1vZGlmeSwgYW5kIGRpc3RyaWJ1dGUgdGhpcyBzb2Z0d2FyZVxuICogdW5kZXIgdGhlIE1JVCBMaWNlbnNlLiBTZWUgTElDRU5TRSBmaWxlIGZvciBkZXRhaWxzLlxuICovXG5cbmltcG9ydCB1cmwgZnJvbSBcIm5vZGU6dXJsXCI7XG5cbmV4cG9ydCBjb25zdCBpbXBvcnRNb2R1bGUgPSBhc3luYyAobmFtZSkgPT4gaW1wb3J0KC8qIHdlYnBhY2tJZ25vcmU6IHRydWUgKi8gbmFtZSk7XG5cbmV4cG9ydCBmdW5jdGlvbiBpc0VudHJ5UG9pbnQoKSB7XG4gIC8vIGlmIChPYmplY3QoaW1wb3J0Lm1ldGEpLnVybClcbiAgLy8gICByZXR1cm4gdXJsLmZpbGVVUkxUb1BhdGgoT2JqZWN0KGltcG9ydC5tZXRhKS51cmwpID09PSBwcm9jZXNzLmFyZ3ZbMV07XG4gIGlmICh0eXBlb2YgcmVxdWlyZSAhPT0gJ3VuZGVmaW5lZCcpXG4gICAgcmV0dXJuIHJlcXVpcmUubWFpbiA9PT0gbW9kdWxlO1xuICB0aHJvdyBuZXcgRXJyb3IoXCJObyBjb21wYXRpYmxlIG1vZHVsZSByZXNvbHZlciBmb3VuZFwiKTtcbn1cblxuZXhwb3J0IGZ1bmN0aW9uIGN1cnJlbnRTY3JpcHRVUkwoKSB7XG4gIC8vIGlmIChPYmplY3QoaW1wb3J0Lm1ldGEpLnVybClcbiAgLy8gICByZXR1cm4gdXJsLmZpbGVVUkxUb1BhdGgoT2JqZWN0KGltcG9ydC5tZXRhKS51cmwpO1xuICBpZiAodHlwZW9mIHJlcXVpcmUgIT09ICd1bmRlZmluZWQnKVxuICAgIHJldHVybiB1cmwucGF0aFRvRmlsZVVSTCgvKiB3ZWJwYWNrSWdub3JlOiB0cnVlICovIF9fZmlsZW5hbWUpO1xuICB0aHJvdyBuZXcgRXJyb3IoXCJVbmtub3duIGN1cnJlbnQgZmlsZW5hbWVcIik7XG59XG4iLCJpbXBvcnQgZnMgZnJvbSBcIm5vZGU6ZnNcIjtcbmltcG9ydCBwYXRoIGZyb20gXCJub2RlOnBhdGhcIjtcblxuaW1wb3J0IHsgZmlsZUxpc3QgfSBmcm9tIFwiQC91dGlscy9GaWxlU3lzdGVtXCI7XG5pbXBvcnQgeyBMb2dnZXIgfSBmcm9tIFwiQC9sb2dnZXJcIjtcblxuY29uc3QgbG9nZ2VyID0gTG9nZ2VyLmNyZWF0ZShpbXBvcnQubWV0YS51cmwpO1xuXG5leHBvcnQgYXN5bmMgZnVuY3Rpb24gbWFrZVBhdGNoKHNyY0Rpcjogc3RyaW5nLCBkZXN0RGlyOiBzdHJpbmcpIHtcbiAgbG9nZ2VyLmluZm8oYE1ha2UgcGF0Y2ggJHtzcmNEaXJ9IHRvICR7ZGVzdERpcn1gKTtcbiAgY29uc3QgbGlzdCA9IGF3YWl0IGZpbGVMaXN0KHNyY0RpciwgeyByZWxhdGl2ZTogc3JjRGlyLCByZWN1cnNpdmU6IHRydWUgfSk7XG4gIGZvciAoY29uc3QgaXRlciBvZiBsaXN0KSB7XG4gICAgY29uc3Qgc291cmNlID0gcGF0aC5yZXNvbHZlKHNyY0RpciwgaXRlcik7XG4gICAgY29uc3QgZGVzdGluYXRpb24gPSBwYXRoLnJlc29sdmUoZGVzdERpciwgaXRlcik7XG4gICAgYXdhaXQgZnMucHJvbWlzZXMuY3Aoc291cmNlLCBkZXN0aW5hdGlvbiwgeyBmb3JjZTogdHJ1ZSB9KTtcbiAgICBsb2dnZXIuaW5mbyhgIFJlcGxhY2VkICR7aXRlcn1gKTtcbiAgfVxufVxuIiwiLypcbiAqIE1JVCBMaWNlbnNlXG4gKlxuICogQ29weXJpZ2h0IChjKSAyMDI1ICBZdXJpaSBZYWt1YmluICh5dXJpaS55YWt1YmluQGdtYWlsLmNvbSlcbiAqXG4gKiBQZXJtaXNzaW9uIGlzIGdyYW50ZWQgdG8gdXNlLCBjb3B5LCBtb2RpZnksIGFuZCBkaXN0cmlidXRlIHRoaXMgc29mdHdhcmVcbiAqIHVuZGVyIHRoZSBNSVQgTGljZW5zZS4gU2VlIExJQ0VOU0UgZmlsZSBmb3IgZGV0YWlscy5cbiAqL1xuXG5leHBvcnQgeyBpc0VudHJ5UG9pbnQgfSBmcm9tIFwiLi9JbXBvcnRNb2R1bGUubWpzXCI7XG5leHBvcnQgeyBpbXBvcnRNb2R1bGUgfSBmcm9tIFwiLi9JbXBvcnRNb2R1bGUubWpzXCI7XG5leHBvcnQgeyBjdXJyZW50U2NyaXB0VVJMIH0gZnJvbSBcIi4vSW1wb3J0TW9kdWxlLm1qc1wiO1xuXG5leHBvcnQgY29uc3QgcmVxdWlyZVN5bmMgPSBldmFsKFwicmVxdWlyZVwiKSBhcyBOb2RlSlMuUmVxdWlyZTtcblxuZXhwb3J0IGZ1bmN0aW9uIHJlcXVpcmVSZXNvbHZlKG5hbWU6IHN0cmluZykge1xuICBpZiAodHlwZW9mIGltcG9ydC5tZXRhLnJlc29sdmUgPT09ICdmdW5jdGlvbicpXG4gICAgcmV0dXJuIGltcG9ydC5tZXRhLnJlc29sdmUobmFtZSk7XG4gIGlmICh0eXBlb2YgcmVxdWlyZVN5bmMgIT09ICd1bmRlZmluZWQnKVxuICAgIHJldHVybiByZXF1aXJlU3luYy5yZXNvbHZlKG5hbWUpO1xuICB0aHJvdyBuZXcgRXJyb3IoXCJObyBjb21wYXRpYmxlIG1vZHVsZSByZXNvbHZlciBmb3VuZFwiKTtcbn1cbiIsIi8qXG4gKiBNSVQgTGljZW5zZVxuICpcbiAqIENvcHlyaWdodCAoYykgMjAyNSAgWXVyaWkgWWFrdWJpbiAoeXVyaWkueWFrdWJpbkBnbWFpbC5jb20pXG4gKlxuICogUGVybWlzc2lvbiBpcyBncmFudGVkIHRvIHVzZSwgY29weSwgbW9kaWZ5LCBhbmQgZGlzdHJpYnV0ZSB0aGlzIHNvZnR3YXJlXG4gKiB1bmRlciB0aGUgTUlUIExpY2Vuc2UuIFNlZSBMSUNFTlNFIGZpbGUgZm9yIGRldGFpbHMuXG4gKi9cblxuaW1wb3J0IG9zIGZyb20gXCJub2RlOm9zXCI7XG5pbXBvcnQgbm9kZXBhdGggZnJvbSBcIm5vZGU6cGF0aFwiO1xuXG5sZXQgbmF0aXZlU2VwID0gIG5vZGVwYXRoLnBvc2l4LnNlcDtcbmxldCBvdGhlclNlcCA9IG5vZGVwYXRoLndpbjMyLnNlcDtcblxuaWYgKG9zLnBsYXRmb3JtKCkgPT09IFwid2luMzJcIikge1xuICBbIG5hdGl2ZVNlcCwgb3RoZXJTZXAgXSA9IFsgb3RoZXJTZXAsIG5hdGl2ZVNlcCBdO1xufVxuXG5leHBvcnQgbmFtZXNwYWNlIFBhdGgge1xuXG5leHBvcnQgY29uc3Qgc2VwID0gbm9kZXBhdGgucG9zaXguc2VwO1xuZXhwb3J0IGNvbnN0IGRlbGltaXRlciA9IG5vZGVwYXRoLmRlbGltaXRlcjtcblxuZXhwb3J0IGZ1bmN0aW9uIG5hdGl2ZVBhdGgocGF0aDogc3RyaW5nKTogc3RyaW5nIHtcbiAgcmV0dXJuIHBhdGgucmVwbGFjZUFsbChvdGhlclNlcCwgbmF0aXZlU2VwKTtcbn1cblxuZXhwb3J0IGZ1bmN0aW9uIHJlcHJlc2VudFBhdGgocGF0aDogc3RyaW5nKTogc3RyaW5nIHtcbiAgcmV0dXJuIHBhdGgucmVwbGFjZUFsbChub2RlcGF0aC53aW4zMi5zZXAsIG5vZGVwYXRoLnBvc2l4LnNlcCk7XG59XG5cbmV4cG9ydCBmdW5jdGlvbiBpc0Fic29sdXRlKHBhdGg6IHN0cmluZyk6IGJvb2xlYW4ge1xuICByZXR1cm4gbm9kZXBhdGguaXNBYnNvbHV0ZShuYXRpdmVQYXRoKHBhdGgpKTtcbn1cblxuZXhwb3J0IGZ1bmN0aW9uIGpvaW4oLi4ucGF0aHM6IHN0cmluZ1tdKTogc3RyaW5nIHtcbiAgcmV0dXJuIHJlcHJlc2VudFBhdGgobm9kZXBhdGguam9pbiguLi5wYXRocy5tYXAoaSA9PiBuYXRpdmVQYXRoKGkpKSkpO1xufVxuXG5leHBvcnQgZnVuY3Rpb24gcmVzb2x2ZSguLi5wYXRoczogc3RyaW5nW10pOiBzdHJpbmcge1xuICByZXR1cm4gcmVwcmVzZW50UGF0aChub2RlcGF0aC5yZXNvbHZlKC4uLnBhdGhzLm1hcChpID0+IG5hdGl2ZVBhdGgoaSkpKSk7XG59XG5cbmV4cG9ydCBmdW5jdGlvbiBkaXJuYW1lKHBhdGg6IHN0cmluZyk6IHN0cmluZyB7XG4gIHJldHVybiByZXByZXNlbnRQYXRoKG5vZGVwYXRoLmRpcm5hbWUobmF0aXZlUGF0aChwYXRoKSkpO1xufVxuXG5leHBvcnQgZnVuY3Rpb24gYmFzZW5hbWUocGF0aDogc3RyaW5nLCBzdWZmaXg/OiBzdHJpbmcpOiBzdHJpbmcge1xuICByZXR1cm4gcmVwcmVzZW50UGF0aChub2RlcGF0aC5iYXNlbmFtZShuYXRpdmVQYXRoKHBhdGgpLCBzdWZmaXgpKTtcbn1cblxuZXhwb3J0IGZ1bmN0aW9uIHJlbGF0aXZlKGZyb206IHN0cmluZywgdG86IHN0cmluZyk6IHN0cmluZyB7XG4gIHJldHVybiByZXByZXNlbnRQYXRoKG5vZGVwYXRoLnJlbGF0aXZlKG5hdGl2ZVBhdGgoZnJvbSksIG5hdGl2ZVBhdGgodG8pKSk7XG59XG5cbn0gLy8gbmFtZXNwYWNlIFBhdGhcbiIsIi8qXG4gKiBNSVQgTGljZW5zZVxuICpcbiAqIENvcHlyaWdodCAoYykgMjAyNSAgWXVyaWkgWWFrdWJpbiAoeXVyaWkueWFrdWJpbkBnbWFpbC5jb20pXG4gKlxuICogUGVybWlzc2lvbiBpcyBncmFudGVkIHRvIHVzZSwgY29weSwgbW9kaWZ5LCBhbmQgZGlzdHJpYnV0ZSB0aGlzIHNvZnR3YXJlXG4gKiB1bmRlciB0aGUgTUlUIExpY2Vuc2UuIFNlZSBMSUNFTlNFIGZpbGUgZm9yIGRldGFpbHMuXG4gKi9cblxuZXhwb3J0IGZ1bmN0aW9uIGVxdWFsVmFsdWUoYTogYW55LCBiOiBhbnkpOiBib29sZWFuIHtcbiAgaWYgKGEgPT09IGIpXG4gICAgcmV0dXJuIHRydWU7XG5cbiAgaWYgKGEgPT09IHVuZGVmaW5lZCB8fCBiID09PSB1bmRlZmluZWQpXG4gICAgcmV0dXJuIGZhbHNlO1xuXG4gIGlmICh0eXBlb2YgYSAhPT0gXCJvYmplY3RcIiB8fCB0eXBlb2YgYiAhPT0gXCJvYmplY3RcIilcbiAgICByZXR1cm4gZmFsc2U7XG5cbiAgY29uc3QgazEgPSBPYmplY3Qua2V5cyhhKTtcbiAgY29uc3QgazIgPSBPYmplY3Qua2V5cyhiKTtcblxuICBpZiAoazEubGVuZ3RoICE9IGsyLmxlbmd0aClcbiAgICByZXR1cm4gZmFsc2U7XG5cbiAgZm9yIChjb25zdCBrZXkgb2YgazEpIHtcbiAgICBpZiAoIU9iamVjdC5oYXNPd24oYiwga2V5KSB8fCAhZXF1YWxWYWx1ZShhW2tleV0sIGJba2V5XSkpXG4gICAgICByZXR1cm4gZmFsc2U7XG4gIH1cblxuICByZXR1cm4gdHJ1ZTtcbn1cblxuZXhwb3J0IGZ1bmN0aW9uIGRlZXBDb3B5KG86IGFueSk6IGFueSB7XG4gIGlmICghbyB8fCB0eXBlb2YgbyAhPT0gXCJvYmplY3RcIilcbiAgICByZXR1cm4gbztcbiAgaWYgKEFycmF5LmlzQXJyYXkobykpIHtcbiAgICBjb25zdCByZXN1bHQgPSBbXTtcbiAgICBmb3IgKGNvbnN0IGl0ZXIgb2YgbylcbiAgICAgIHJlc3VsdC5wdXNoKGRlZXBDb3B5KGl0ZXIpKTtcbiAgICByZXR1cm4gcmVzdWx0O1xuICB9XG4gIGVsc2Uge1xuICAgIGNvbnN0IHJlc3VsdCA9IHt9IGFzIGFueTtcbiAgICBmb3IgKGNvbnN0IFtrZXksdmFsXSBvZiBPYmplY3QuZW50cmllcyhvKSlcbiAgICAgIHJlc3VsdFtrZXldID0gZGVlcENvcHkodmFsKTtcbiAgICByZXR1cm4gcmVzdWx0O1xuICB9XG59XG5cbmV4cG9ydCBmdW5jdGlvbiBhc3NpZ25PYmplY3QodGFyZ2V0OiBhbnksIHNvdXJjZTogYW55KSB7XG4gIGlmIChBcnJheS5pc0FycmF5KHRhcmdldCkgJiYgQXJyYXkuaXNBcnJheShzb3VyY2UpKSB7XG4gICAgZm9yIChjb25zdCBpdGVyIG9mIHNvdXJjZSlcbiAgICAgIHRhcmdldC5wdXNoKGl0ZXIpO1xuICB9XG4gIGVsc2Uge1xuICAgIGZvciAoY29uc3Qga2V5IG9mIE9iamVjdC5rZXlzKHNvdXJjZSkpIHtcbiAgICAgIGNvbnN0IGEgPSB0YXJnZXRba2V5XSwgYiA9IHNvdXJjZVtrZXldO1xuICAgICAgaWYgKGEgJiYgdHlwZW9mIGEgPT09IFwib2JqZWN0XCIgJiYgYiAmJiB0eXBlb2YgYiA9PT0gXCJvYmplY3RcIilcbiAgICAgICAgYXNzaWduT2JqZWN0KGEsIGIpO1xuICAgICAgZWxzZVxuICAgICAgICB0YXJnZXRba2V5XSA9IGRlZXBDb3B5KGIpO1xuICAgIH1cbiAgfVxufVxuXG5leHBvcnQgZnVuY3Rpb24gYXJyYXlXcmFwcGVyKHZhbHVlOiBhbnkpIHtcbiAgaWYgKHZhbHVlID09PSB1bmRlZmluZWQgfHwgQXJyYXkuaXNBcnJheSh2YWx1ZSkpXG4gICAgcmV0dXJuIHZhbHVlO1xuICByZXR1cm4gWyB2YWx1ZSBdO1xufVxuIiwiLypcbiAqIE1JVCBMaWNlbnNlXG4gKlxuICogQ29weXJpZ2h0IChjKSAyMDI1ICBZdXJpaSBZYWt1YmluICh5dXJpaS55YWt1YmluQGdtYWlsLmNvbSlcbiAqXG4gKiBQZXJtaXNzaW9uIGlzIGdyYW50ZWQgdG8gdXNlLCBjb3B5LCBtb2RpZnksIGFuZCBkaXN0cmlidXRlIHRoaXMgc29mdHdhcmVcbiAqIHVuZGVyIHRoZSBNSVQgTGljZW5zZS4gU2VlIExJQ0VOU0UgZmlsZSBmb3IgZGV0YWlscy5cbiAqL1xuXG5jb25zdCBmaXJzdENoYXJzID0gXCJfYWJjZGVmZ2hpamtsbW5vcHFyc3R1dnd4eXpBQkNERUZHSElKS0xNTk9QUVJTVFVWV1hZWlwiO1xuY29uc3Qgb3RoZXJDaGFycyA9IGZpcnN0Q2hhcnMgKyBcIjAxMjM0NTY3ODlcIjtcblxuZnVuY3Rpb24gZ2V0Q2hhck9mKGNoYXJzOiBzdHJpbmcpIHtcbiAgcmV0dXJuIGNoYXJzLmNoYXJBdChNYXRoLmZsb29yKE1hdGgucmFuZG9tKCkgKiBjaGFycy5sZW5ndGgpKTtcbn1cblxuZXhwb3J0IGZ1bmN0aW9uIHJhbmRDSWRlbnRpZmVyKGxlbmd0aDogbnVtYmVyKSB7XG4gIGlmICghbGVuZ3RoKVxuICAgIHJldHVybiBcIlwiO1xuXG4gIGxldCByZXN1bHQgPSBnZXRDaGFyT2YoZmlyc3RDaGFycyk7XG4gIGZvciAobGV0IGkgPSAxOyBpIDwgbGVuZ3RoOyBpKyspXG4gICAgcmVzdWx0ICs9IGdldENoYXJPZihvdGhlckNoYXJzKTtcblxuICByZXR1cm4gcmVzdWx0O1xufVxuIiwiLypcbiAqIE1JVCBMaWNlbnNlXG4gKlxuICogQ29weXJpZ2h0IChjKSAyMDI1ICBZdXJpaSBZYWt1YmluICh5dXJpaS55YWt1YmluQGdtYWlsLmNvbSlcbiAqXG4gKiBQZXJtaXNzaW9uIGlzIGdyYW50ZWQgdG8gdXNlLCBjb3B5LCBtb2RpZnksIGFuZCBkaXN0cmlidXRlIHRoaXMgc29mdHdhcmVcbiAqIHVuZGVyIHRoZSBNSVQgTGljZW5zZS4gU2VlIExJQ0VOU0UgZmlsZSBmb3IgZGV0YWlscy5cbiAqL1xuXG5pbXBvcnQgZnMgZnJvbSBcIm5vZGU6ZnNcIjtcblxuZXhwb3J0IGNsYXNzIFNldHRpbmdzU3RvcmFnZSB7XG4gIHByaXZhdGUgX2ZpbGVuYW1lOiBzdHJpbmc7XG4gIHByaXZhdGUgX3NldHRpbmdzOiBhbnk7XG4gIHByaXZhdGUgX2N1cnJlbnQ6IGFueTtcblxuICBjb25zdHJ1Y3RvcihmaWxlbmFtZTogc3RyaW5nKSB7XG4gICAgdGhpcy5fZmlsZW5hbWUgPSBmaWxlbmFtZTtcbiAgfVxuXG4gIHB1YmxpYyBhc3luYyBwdXNoKG5hbWU6IHN0cmluZykge1xuICAgIGlmICghdGhpcy5fc2V0dGluZ3MpXG4gICAgICBhd2FpdCB0aGlzLmxvYWQoKTtcbiAgICBsZXQgb2JqZWN0ID0gdGhpcy5fY3VycmVudC5vYmplY3RbbmFtZV07XG4gICAgaWYgKCFvYmplY3QpXG4gICAgICBvYmplY3QgPSB0aGlzLl9jdXJyZW50Lm9iamVjdFtuYW1lXSA9IHt9O1xuICAgIHRoaXMuX2N1cnJlbnQgPSB7IHBhcmVudDogdGhpcy5fY3VycmVudCwgb2JqZWN0IH07XG4gIH1cblxuICBwdWJsaWMgYXN5bmMgcG9wKCkge1xuICAgIGlmICghdGhpcy5fc2V0dGluZ3MpXG4gICAgICBhd2FpdCB0aGlzLmxvYWQoKTtcbiAgICBjb25zb2xlLmFzc2VydCh0aGlzLl9jdXJyZW50LnBhcmVudCk7XG4gICAgdGhpcy5fY3VycmVudCA9IHRoaXMuX2N1cnJlbnQucGFyZW50O1xuICB9XG5cbiAgcHVibGljIGFzeW5jIGdldChuYW1lOiBzdHJpbmcpIHtcbiAgICBpZiAoIXRoaXMuX3NldHRpbmdzKVxuICAgICAgYXdhaXQgdGhpcy5sb2FkKCk7XG4gICAgcmV0dXJuIHRoaXMuX2N1cnJlbnQub2JqZWN0W25hbWVdO1xuICB9XG5cbiAgcHVibGljIGFzeW5jIHNldChuYW1lOiBzdHJpbmcsIHZhbHVlOiBhbnkpIHtcbiAgICBpZiAoIXRoaXMuX3NldHRpbmdzKVxuICAgICAgYXdhaXQgdGhpcy5sb2FkKCk7XG4gICAgdGhpcy5fY3VycmVudC5vYmplY3RbbmFtZV0gPSB2YWx1ZTtcbiAgICBhd2FpdCB0aGlzLnNhdmUoKTtcbiAgfVxuXG4gIHB1YmxpYyBhc3luYyBsb2FkKCkge1xuICAgIHRyeSB7XG4gICAgICBjb25zdCBjb250ZW50ID0gYXdhaXQgZnMucHJvbWlzZXMucmVhZEZpbGUodGhpcy5fZmlsZW5hbWUsIFwidXRmLThcIik7XG4gICAgICB0aGlzLl9zZXR0aW5ncyA9IEpTT04ucGFyc2UoY29udGVudCk7XG4gICAgfVxuICAgIGNhdGNoIChlKSB7XG4gICAgICB0aGlzLl9zZXR0aW5ncyA9IHt9O1xuICAgIH1cbiAgICB0aGlzLl9jdXJyZW50ID1cbiAgICB7XG4gICAgICBwYXJlbnQ6IG51bGwsXG4gICAgICBvYmplY3Q6IHRoaXMuX3NldHRpbmdzLFxuICAgIH07XG4gIH1cblxuICBwdWJsaWMgYXN5bmMgc2F2ZSgpIHtcbiAgICBjb25zdCBzcGFjZSA9IDI7XG4gICAgY29uc3QgY29udGVudCA9IEpTT04uc3RyaW5naWZ5KHRoaXMuX3NldHRpbmdzLCB1bmRlZmluZWQsIHNwYWNlKTtcbiAgICBhd2FpdCBmcy5wcm9taXNlcy53cml0ZUZpbGUodGhpcy5fZmlsZW5hbWUsIGNvbnRlbnQsIHsgZW5jb2Rpbmc6IFwidXRmLThcIiwgZmxhZzogXCJ3XCIsIGZsdXNoOiB0cnVlIH0pO1xuICB9XG59O1xuIiwiLypcbiAqIE1JVCBMaWNlbnNlXG4gKlxuICogQ29weXJpZ2h0IChjKSAyMDI1ICBZdXJpaSBZYWt1YmluICh5dXJpaS55YWt1YmluQGdtYWlsLmNvbSlcbiAqXG4gKiBQZXJtaXNzaW9uIGlzIGdyYW50ZWQgdG8gdXNlLCBjb3B5LCBtb2RpZnksIGFuZCBkaXN0cmlidXRlIHRoaXMgc29mdHdhcmVcbiAqIHVuZGVyIHRoZSBNSVQgTGljZW5zZS4gU2VlIExJQ0VOU0UgZmlsZSBmb3IgZGV0YWlscy5cbiAqL1xuXG5leHBvcnQgZnVuY3Rpb24gZW5zdXJlQm9vbGVhbih2YWx1ZTogYW55KSB7XG4gIGlmICh0eXBlb2YgdmFsdWUgPT09IFwiYm9vbGVhblwiKVxuICAgIHJldHVybiB2YWx1ZTtcbiAgdGhyb3cgbmV3IFR5cGVFcnJvcihgVGhlICcke3ZhbHVlfScgaXMgbm90IGEgYm9vbGVhbmApO1xufVxuXG5leHBvcnQgZnVuY3Rpb24gZW5zdXJlTnVtYmVyKHZhbHVlOiBhbnkpIHtcbiAgaWYgKHR5cGVvZiB2YWx1ZSA9PT0gXCJudW1iZXJcIilcbiAgICByZXR1cm4gdmFsdWU7XG4gIHRocm93IG5ldyBUeXBlRXJyb3IoYFRoZSAnJHt2YWx1ZX0nIGlzIG5vdCBhIG51bWJlcmApO1xufVxuXG5leHBvcnQgZnVuY3Rpb24gZW5zdXJlU3RyaW5nKHZhbHVlOiBhbnkpIHtcbiAgaWYgKHR5cGVvZiB2YWx1ZSA9PT0gXCJzdHJpbmdcIilcbiAgICByZXR1cm4gdmFsdWU7XG4gIHRocm93IG5ldyBUeXBlRXJyb3IoYFRoZSAnJHt2YWx1ZX0nIGlzIG5vdCBhIHN0cmluZ2ApO1xufVxuXG5leHBvcnQgZnVuY3Rpb24gZW5zdXJlQXJyYXkodmFsdWU6IGFueSkge1xuICBpZiAoQXJyYXkuaXNBcnJheSh2YWx1ZSkpXG4gICAgcmV0dXJuIEFycmF5LmZyb20odmFsdWUpO1xuICB0aHJvdyBuZXcgVHlwZUVycm9yKGBUaGUgJyR7dmFsdWV9JyBpcyBub3QgYSBhcnJheWApO1xufVxuIiwiLypcbiAqIE1JVCBMaWNlbnNlXG4gKlxuICogQ29weXJpZ2h0IChjKSAyMDI1ICBZdXJpaSBZYWt1YmluICh5dXJpaS55YWt1YmluQGdtYWlsLmNvbSlcbiAqXG4gKiBQZXJtaXNzaW9uIGlzIGdyYW50ZWQgdG8gdXNlLCBjb3B5LCBtb2RpZnksIGFuZCBkaXN0cmlidXRlIHRoaXMgc29mdHdhcmVcbiAqIHVuZGVyIHRoZSBNSVQgTGljZW5zZS4gU2VlIExJQ0VOU0UgZmlsZSBmb3IgZGV0YWlscy5cbiAqL1xuXG5leHBvcnQgY29uc3QgRklMRV9TQ0hFTUUgPSBcImZpbGU6Ly9cIjtcbmV4cG9ydCBjb25zdCBJTVBPUlRfU0NIRU1FID0gXCJpbXBvcnQ6Ly9cIjtcbmV4cG9ydCBjb25zdCBIVFRQX1NDSEVNRSA9IFwiaHR0cDovL1wiO1xuZXhwb3J0IGNvbnN0IEhUVFBTX1NDSEVNRSA9IFwiaHR0cHM6Ly9cIjtcbiIsIm1vZHVsZS5leHBvcnRzID0gcmVxdWlyZShcImh0dHBcIik7IiwibW9kdWxlLmV4cG9ydHMgPSByZXF1aXJlKFwiaHR0cHNcIik7IiwibW9kdWxlLmV4cG9ydHMgPSByZXF1aXJlKFwibm9kZTpjaGlsZF9wcm9jZXNzXCIpOyIsIm1vZHVsZS5leHBvcnRzID0gcmVxdWlyZShcIm5vZGU6ZnNcIik7IiwibW9kdWxlLmV4cG9ydHMgPSByZXF1aXJlKFwibm9kZTpvc1wiKTsiLCJtb2R1bGUuZXhwb3J0cyA9IHJlcXVpcmUoXCJub2RlOnBhdGhcIik7IiwibW9kdWxlLmV4cG9ydHMgPSByZXF1aXJlKFwibm9kZTp1cmxcIik7IiwibW9kdWxlLmV4cG9ydHMgPSByZXF1aXJlKFwibm9kZTp3b3JrZXJfdGhyZWFkc1wiKTsiLCIvLyBUaGUgbW9kdWxlIGNhY2hlXG52YXIgX193ZWJwYWNrX21vZHVsZV9jYWNoZV9fID0ge307XG5cbi8vIFRoZSByZXF1aXJlIGZ1bmN0aW9uXG5mdW5jdGlvbiBfX3dlYnBhY2tfcmVxdWlyZV9fKG1vZHVsZUlkKSB7XG5cdC8vIENoZWNrIGlmIG1vZHVsZSBpcyBpbiBjYWNoZVxuXHR2YXIgY2FjaGVkTW9kdWxlID0gX193ZWJwYWNrX21vZHVsZV9jYWNoZV9fW21vZHVsZUlkXTtcblx0aWYgKGNhY2hlZE1vZHVsZSAhPT0gdW5kZWZpbmVkKSB7XG5cdFx0cmV0dXJuIGNhY2hlZE1vZHVsZS5leHBvcnRzO1xuXHR9XG5cdC8vIENyZWF0ZSBhIG5ldyBtb2R1bGUgKGFuZCBwdXQgaXQgaW50byB0aGUgY2FjaGUpXG5cdHZhciBtb2R1bGUgPSBfX3dlYnBhY2tfbW9kdWxlX2NhY2hlX19bbW9kdWxlSWRdID0ge1xuXHRcdC8vIG5vIG1vZHVsZS5pZCBuZWVkZWRcblx0XHQvLyBubyBtb2R1bGUubG9hZGVkIG5lZWRlZFxuXHRcdGV4cG9ydHM6IHt9XG5cdH07XG5cblx0Ly8gRXhlY3V0ZSB0aGUgbW9kdWxlIGZ1bmN0aW9uXG5cdF9fd2VicGFja19tb2R1bGVzX19bbW9kdWxlSWRdKG1vZHVsZSwgbW9kdWxlLmV4cG9ydHMsIF9fd2VicGFja19yZXF1aXJlX18pO1xuXG5cdC8vIFJldHVybiB0aGUgZXhwb3J0cyBvZiB0aGUgbW9kdWxlXG5cdHJldHVybiBtb2R1bGUuZXhwb3J0cztcbn1cblxuIiwiLy8gZ2V0RGVmYXVsdEV4cG9ydCBmdW5jdGlvbiBmb3IgY29tcGF0aWJpbGl0eSB3aXRoIG5vbi1oYXJtb255IG1vZHVsZXNcbl9fd2VicGFja19yZXF1aXJlX18ubiA9IChtb2R1bGUpID0+IHtcblx0dmFyIGdldHRlciA9IG1vZHVsZSAmJiBtb2R1bGUuX19lc01vZHVsZSA/XG5cdFx0KCkgPT4gKG1vZHVsZVsnZGVmYXVsdCddKSA6XG5cdFx0KCkgPT4gKG1vZHVsZSk7XG5cdF9fd2VicGFja19yZXF1aXJlX18uZChnZXR0ZXIsIHsgYTogZ2V0dGVyIH0pO1xuXHRyZXR1cm4gZ2V0dGVyO1xufTsiLCIvLyBkZWZpbmUgZ2V0dGVyIGZ1bmN0aW9ucyBmb3IgaGFybW9ueSBleHBvcnRzXG5fX3dlYnBhY2tfcmVxdWlyZV9fLmQgPSAoZXhwb3J0cywgZGVmaW5pdGlvbikgPT4ge1xuXHRmb3IodmFyIGtleSBpbiBkZWZpbml0aW9uKSB7XG5cdFx0aWYoX193ZWJwYWNrX3JlcXVpcmVfXy5vKGRlZmluaXRpb24sIGtleSkgJiYgIV9fd2VicGFja19yZXF1aXJlX18ubyhleHBvcnRzLCBrZXkpKSB7XG5cdFx0XHRPYmplY3QuZGVmaW5lUHJvcGVydHkoZXhwb3J0cywga2V5LCB7IGVudW1lcmFibGU6IHRydWUsIGdldDogZGVmaW5pdGlvbltrZXldIH0pO1xuXHRcdH1cblx0fVxufTsiLCJfX3dlYnBhY2tfcmVxdWlyZV9fLm8gPSAob2JqLCBwcm9wKSA9PiAoT2JqZWN0LnByb3RvdHlwZS5oYXNPd25Qcm9wZXJ0eS5jYWxsKG9iaiwgcHJvcCkpIiwiLy8gZGVmaW5lIF9fZXNNb2R1bGUgb24gZXhwb3J0c1xuX193ZWJwYWNrX3JlcXVpcmVfXy5yID0gKGV4cG9ydHMpID0+IHtcblx0aWYodHlwZW9mIFN5bWJvbCAhPT0gJ3VuZGVmaW5lZCcgJiYgU3ltYm9sLnRvU3RyaW5nVGFnKSB7XG5cdFx0T2JqZWN0LmRlZmluZVByb3BlcnR5KGV4cG9ydHMsIFN5bWJvbC50b1N0cmluZ1RhZywgeyB2YWx1ZTogJ01vZHVsZScgfSk7XG5cdH1cblx0T2JqZWN0LmRlZmluZVByb3BlcnR5KGV4cG9ydHMsICdfX2VzTW9kdWxlJywgeyB2YWx1ZTogdHJ1ZSB9KTtcbn07IiwiLypcbiAqIE1JVCBMaWNlbnNlXG4gKlxuICogQ29weXJpZ2h0IChjKSAyMDI1ICBZdXJpaSBZYWt1YmluICh5dXJpaS55YWt1YmluQGdtYWlsLmNvbSlcbiAqXG4gKiBQZXJtaXNzaW9uIGlzIGdyYW50ZWQgdG8gdXNlLCBjb3B5LCBtb2RpZnksIGFuZCBkaXN0cmlidXRlIHRoaXMgc29mdHdhcmVcbiAqIHVuZGVyIHRoZSBNSVQgTGljZW5zZS4gU2VlIExJQ0VOU0UgZmlsZSBmb3IgZGV0YWlscy5cbiAqL1xuXG4vLy8gPHJlZmVyZW5jZSBwYXRoPVwiZ2xvYmFsLmQudHNcIiAvPlxuXG5pbXBvcnQgKiBhcyBjeHggZnJvbSBcIkAvY3h4XCI7XG5pbXBvcnQgeyBDTWFrZVByb2Nlc3MsIENUZXN0UHJvY2VzcywgU2NyaXB0TW9kZU9wdGlvbnMsIGdldFByb2plY3RJbmZvIH0gZnJvbSBcIkAvY21ha2VcIjtcblxuaW1wb3J0IHsgc3Bhd25Bc3luYyB9IGZyb20gXCJAL3V0aWxzL0NoaWxkUHJvY2Vzc1wiO1xuaW1wb3J0IHsgcmVxdWVzdEdldCwgZG93bmxvYWRGaWxlIH0gZnJvbSBcIkAvdXRpbHMvSHR0cFJlcXVlc3RcIjtcbmltcG9ydCB7IFBhdGggfSBmcm9tIFwiQC91dGlscy9QYXRoXCI7XG5pbXBvcnQgeyBydW5TY3JpcHQgfSBmcm9tIFwiQC9hcHAvUnVuU2NyaXB0XCI7XG5cbmV4cG9ydCBkZWZhdWx0IHtcbiAgY3h4LFxuICBjbWFrZToge1xuICAgIHNjcmlwdE1vZGU6IChzY3JpcHRGaWxlOiBzdHJpbmcsIHZhcmlhYmxlczogb2JqZWN0LCBvcHRpb25zPzogU2NyaXB0TW9kZU9wdGlvbnMpID0+IENNYWtlUHJvY2Vzcy5nZXRJbnN0YW5jZSgpLnNjcmlwdE1vZGUoc2NyaXB0RmlsZSwgdmFyaWFibGVzLCBvcHRpb25zKSxcbiAgICBjb25maWd1cmU6IChhcmdzOiBhbnkpID0+IENNYWtlUHJvY2Vzcy5nZXRJbnN0YW5jZSgpLmNvbmZpZ3VyZShhcmdzKSxcbiAgICBidWlsZDogKGFyZ3M6IGFueSkgPT4gQ01ha2VQcm9jZXNzLmdldEluc3RhbmNlKCkuYnVpbGQoYXJncyksXG4gICAgaW5zdGFsbDogKGFyZ3M6IGFueSkgPT4gQ01ha2VQcm9jZXNzLmdldEluc3RhbmNlKCkuaW5zdGFsbChhcmdzKSxcbiAgICBleHRyYWN0OiAoYXJnczogYW55KSA9PiBDTWFrZVByb2Nlc3MuZ2V0SW5zdGFuY2UoKS5leHRyYWN0KGFyZ3MpLFxuICAgIGN0ZXN0OiAoYXJnczogYW55KSA9PiBDVGVzdFByb2Nlc3MuZ2V0SW5zdGFuY2UoKS5jdGVzdChhcmdzKSxcbiAgICBnZXRQcm9qZWN0SW5mbyxcbiAgfSxcbiAgcHJvY2Vzczoge1xuICAgIHNwYXduOiBzcGF3bkFzeW5jLFxuICB9LFxuICB1dGlsczoge1xuICAgIHJlcXVlc3RHZXQsXG4gICAgZG93bmxvYWRGaWxlLFxuICB9LFxuICBwYXRoOiBQYXRoLFxufTtcblxucnVuU2NyaXB0KCk7XG4iXSwibmFtZXMiOltdLCJzb3VyY2VSb290IjoiIn0=