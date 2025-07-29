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
/* harmony import */ var _utils_Locator__WEBPACK_IMPORTED_MODULE_7__ = __webpack_require__(/*! @/utils/Locator */ "./src/utils/Locator.ts");
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
    scope.PROJECT_SOURCE_DIR = _utils_Locator__WEBPACK_IMPORTED_MODULE_7__.Locator.create(sourceDir);
    scope.PROJECT_BINARY_DIR = _utils_Locator__WEBPACK_IMPORTED_MODULE_7__.Locator.create(binaryDir);
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
        scope.SCRIPT_FILE = _utils_Locator__WEBPACK_IMPORTED_MODULE_7__.Locator.create(plugin);
        scope.SCRIPT_DIR = scope.SCRIPT_FILE.dirname();
        scope.SOURCE_DIR = scope.SCRIPT_DIR;
        const binaryDir1 = scope.PROJECT_BINARY_DIR.relative(sourceDir);
        const binaryDir2 = scope.PROJECT_SOURCE_DIR.relative(sourceDir);
        const binaryDir = (binaryDir2.length < binaryDir1.length ? binaryDir2 : binaryDir1).replace("../", "__/");
        scope.BINARY_DIR = scope.PROJECT_BINARY_DIR.join("MakePluginBinaries", binaryDir);
        process.chdir(scope.SOURCE_DIR.toPath());
        const pluginUrl = scope.SCRIPT_FILE.toURLString();
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
        const toolchainUrl = scope.TOOLCHAIN_FILE.toURLString();
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
        scope.SCRIPT_FILE = _utils_Locator__WEBPACK_IMPORTED_MODULE_7__.Locator.create(scriptFile);
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
        cacheVariables: config.cacheVariables || {},
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
/* harmony import */ var _server_WorkerMessageDispatcher__WEBPACK_IMPORTED_MODULE_7__ = __webpack_require__(/*! @/server/WorkerMessageDispatcher */ "./src/server/WorkerMessageDispatcher.ts");
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
    const dispatcher = new _server_WorkerMessageDispatcher__WEBPACK_IMPORTED_MODULE_7__.WorkerMessageDispatcher("w" + node_worker_threads__WEBPACK_IMPORTED_MODULE_1__.threadId, sender);
    node_worker_threads__WEBPACK_IMPORTED_MODULE_1__.parentPort.on("message", (message) => {
        dispatcher.prerformMessage(message).then(data => sender.sendMessage(data));
    });
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
/* harmony import */ var _utils_Locator__WEBPACK_IMPORTED_MODULE_9__ = __webpack_require__(/*! @/utils/Locator */ "./src/utils/Locator.ts");
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
    _core_SimpleObject__WEBPACK_IMPORTED_MODULE_11__.SimpleObject.registerParser(_utils_Locator__WEBPACK_IMPORTED_MODULE_9__.DirPath.name, _utils_Locator__WEBPACK_IMPORTED_MODULE_9__.DirPath.fromJSON);
    _core_SimpleObject__WEBPACK_IMPORTED_MODULE_11__.SimpleObject.registerParser(_utils_Locator__WEBPACK_IMPORTED_MODULE_9__.FilePath.name, _utils_Locator__WEBPACK_IMPORTED_MODULE_9__.FilePath.fromJSON);
    _core_SimpleObject__WEBPACK_IMPORTED_MODULE_11__.SimpleObject.registerParser(_core_Target__WEBPACK_IMPORTED_MODULE_10__.PostTarget.name, _core_Target__WEBPACK_IMPORTED_MODULE_10__.PostTarget.fromJSON);
    _core_SimpleObject__WEBPACK_IMPORTED_MODULE_11__.SimpleObject.registerParser(_core_Target__WEBPACK_IMPORTED_MODULE_10__.ObjectLibrary.name, _core_Target__WEBPACK_IMPORTED_MODULE_10__.ObjectLibrary.fromJSON);
    _core_SimpleObject__WEBPACK_IMPORTED_MODULE_11__.SimpleObject.registerParser(_core_Target__WEBPACK_IMPORTED_MODULE_10__.StaticLibrary.name, _core_Target__WEBPACK_IMPORTED_MODULE_10__.StaticLibrary.fromJSON);
    _core_SimpleObject__WEBPACK_IMPORTED_MODULE_11__.SimpleObject.registerParser(_core_Target__WEBPACK_IMPORTED_MODULE_10__.SharedLibrary.name, _core_Target__WEBPACK_IMPORTED_MODULE_10__.SharedLibrary.fromJSON);
    _core_SimpleObject__WEBPACK_IMPORTED_MODULE_11__.SimpleObject.registerParser(_core_Target__WEBPACK_IMPORTED_MODULE_10__.Executable.name, _core_Target__WEBPACK_IMPORTED_MODULE_10__.Executable.fromJSON);
}


/***/ }),

/***/ "./src/clang/index.ts":
/*!****************************!*\
  !*** ./src/clang/index.ts ***!
  \****************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   clang: () => (/* binding */ clang)
/* harmony export */ });
/* harmony import */ var _utils_ChildProcess__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! @/utils/ChildProcess */ "./src/utils/ChildProcess.ts");
/* harmony import */ var _logger__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! @/logger */ "./src/logger/index.ts");
/*
 * MIT License
 *
 * Copyright (c) 2025  Yurii Yakubin (yurii.yakubin@gmail.com)
 *
 * Permission is granted to use, copy, modify, and distribute this software
 * under the MIT License. See LICENSE file for details.
 */


const logger = _logger__WEBPACK_IMPORTED_MODULE_1__.Logger.create("file:///mnt/c/opt/work/source/darkit-sdk/external/bitmake/src/clang/index.ts");
const VERSION_REGEX = /^clang version (\d+.\d.\d+)/;
var clang;
(function (clang) {
    async function readVersion(clangPath) {
        const { stdout } = await (0,_utils_ChildProcess__WEBPACK_IMPORTED_MODULE_0__.execFileAsync)(clangPath, ["--version"]);
        const content = stdout.toString();
        let match = content.match(VERSION_REGEX);
        if (!match)
            throw new Error("The pattern of the Clang version is different");
        return match[1];
    }
    clang.readVersion = readVersion;
})(clang || (clang = {})); // namespace clang


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
/* harmony import */ var _utils_JSValue__WEBPACK_IMPORTED_MODULE_14__ = __webpack_require__(/*! @/utils/JSValue */ "./src/utils/JSValue.ts");
/* harmony import */ var _utils_Locator__WEBPACK_IMPORTED_MODULE_15__ = __webpack_require__(/*! @/utils/Locator */ "./src/utils/Locator.ts");
/* harmony import */ var _actions__WEBPACK_IMPORTED_MODULE_16__ = __webpack_require__(/*! @/actions */ "./src/actions/index.ts");
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
;
async function resolveEnvironment(environment) {
    if (typeof environment !== "string")
        return environment;
    const envFile = _utils_Locator__WEBPACK_IMPORTED_MODULE_15__.Locator.create(environment);
    return (0,_utils_JSValue__WEBPACK_IMPORTED_MODULE_14__.loadJSValue)(envFile);
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
        const newEnvironment = mergeEnvironment(await resolveEnvironment(config.preAction.environment), environment);
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
            const newEnvironment = mergeEnvironment(await resolveEnvironment(config.action[i].environment), environment);
            await doTargetBuild(gconfig, newEnvironment, newConfig, settings);
            await settings.pop();
        }
        await settings.pop();
    }
    else {
        if (!await (0,_utils_FileSystem__WEBPACK_IMPORTED_MODULE_5__.directoryExists)(config.binaryDir)) {
            await node_fs__WEBPACK_IMPORTED_MODULE_0___default().promises.mkdir(config.binaryDir, { recursive: true });
        }
        if (_actions__WEBPACK_IMPORTED_MODULE_16__["default"][config.action]) {
            config.description && logger.notice(config.description);
            await _actions__WEBPACK_IMPORTED_MODULE_16__["default"][config.action](config, environment, settings);
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
        const newEnvironment = mergeEnvironment(await resolveEnvironment(config.postAction.environment), environment);
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
                const environment = mergeEnvironment(await resolveEnvironment(entry.environment), process.env);
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
/* harmony import */ var _utils_Locator__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! @/utils/Locator */ "./src/utils/Locator.ts");
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
class MakeContext {
    _targets = new Map;
    _postTargets = new Map;
    _mainScripts = new Map;
    _postScripts = new Map;
    _installList = new Array();
    constructor() {
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
        if (!_utils_Locator__WEBPACK_IMPORTED_MODULE_2__.Locator.isAbsolute(sourceDir))
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

/***/ "./src/core/BuiltinScripts/c_header.ts":
/*!*********************************************!*\
  !*** ./src/core/BuiltinScripts/c_header.ts ***!
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

/***/ "./src/core/BuiltinScripts/configure_file.ts":
/*!***************************************************!*\
  !*** ./src/core/BuiltinScripts/configure_file.ts ***!
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

/***/ "./src/core/BuiltinScripts/index.ts":
/*!******************************************!*\
  !*** ./src/core/BuiltinScripts/index.ts ***!
  \******************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (__WEBPACK_DEFAULT_EXPORT__)
/* harmony export */ });
/* harmony import */ var _core_BuiltinScripts_configure_file__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! @/core/BuiltinScripts/configure_file */ "./src/core/BuiltinScripts/configure_file.ts");
/* harmony import */ var _core_BuiltinScripts_c_header__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! @/core/BuiltinScripts/c_header */ "./src/core/BuiltinScripts/c_header.ts");
/*
 * MIT License
 *
 * Copyright (c) 2025  Yurii Yakubin (yurii.yakubin@gmail.com)
 *
 * Permission is granted to use, copy, modify, and distribute this software
 * under the MIT License. See LICENSE file for details.
 */


/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = ({
    configure_file: _core_BuiltinScripts_configure_file__WEBPACK_IMPORTED_MODULE_0__["default"],
    c_header: _core_BuiltinScripts_c_header__WEBPACK_IMPORTED_MODULE_1__["default"],
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
/* harmony import */ var _utils_Locator__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! @/utils/Locator */ "./src/utils/Locator.ts");
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
            scriptModule: _utils_Locator__WEBPACK_IMPORTED_MODULE_1__.Locator.isAbsolute(json.scriptModule) ? _utils_Locator__WEBPACK_IMPORTED_MODULE_1__.Locator.create(json.scriptModule) : json.scriptModule,
            output: _utils_Locator__WEBPACK_IMPORTED_MODULE_1__.Locator.create(json.output),
            sourceDir: _utils_Locator__WEBPACK_IMPORTED_MODULE_1__.Locator.create(json.sourceDir),
            binaryDir: _utils_Locator__WEBPACK_IMPORTED_MODULE_1__.Locator.create(json.binaryDir),
        };
        if (json.input) {
            options.input = _utils_Locator__WEBPACK_IMPORTED_MODULE_1__.Locator.create(json.input);
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
/* harmony import */ var _clang_index__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! @/clang/index */ "./src/clang/index.ts");
/* harmony import */ var _logger__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! @/logger */ "./src/logger/index.ts");
/*
 * MIT License
 *
 * Copyright (c) 2025  Yurii Yakubin (yurii.yakubin@gmail.com)
 *
 * Permission is granted to use, copy, modify, and distribute this software
 * under the MIT License. See LICENSE file for details.
 */



const logger = _logger__WEBPACK_IMPORTED_MODULE_2__.Logger.create("file:///mnt/c/opt/work/source/darkit-sdk/external/bitmake/src/core/DetermineCompiler.ts");
async function determineCompiler(scope) {
    const clangPath = await (0,_core_FindProgram__WEBPACK_IMPORTED_MODULE_0__.findProgram)("clang");
    if (clangPath) {
        let version = "Unknown";
        try {
            version = await _clang_index__WEBPACK_IMPORTED_MODULE_1__.clang.readVersion(clangPath);
        }
        catch (e) {
            logger.error("Cannot read version from", clangPath);
        }
        logger.info("The C compiler identification is Clang", version);
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
/* harmony import */ var _utils_Locator__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! @/utils/Locator */ "./src/utils/Locator.ts");
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
        if (func instanceof _utils_Locator__WEBPACK_IMPORTED_MODULE_1__.Locator) {
            const scriptUrl = func.toURLString();
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
/* harmony import */ var _utils_Locator__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! @/utils/Locator */ "./src/utils/Locator.ts");
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
        const destination = _utils_Locator__WEBPACK_IMPORTED_MODULE_0__.Locator.create(json.destination);
        const baseDir = json.baseDir ? _utils_Locator__WEBPACK_IMPORTED_MODULE_0__.Locator.create(json.baseDir) : undefined;
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
/* harmony import */ var _utils_Locator__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! @/utils/Locator */ "./src/utils/Locator.ts");
/* harmony import */ var _utils_FileSystem__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! @/utils/FileSystem */ "./src/utils/FileSystem.ts");
/* harmony import */ var _core_TargetCollection__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! @/core/TargetCollection */ "./src/core/TargetCollection.ts");
/* harmony import */ var _core_GoalCollection__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(/*! @/core/GoalCollection */ "./src/core/GoalCollection.ts");
/* harmony import */ var _utils_Module__WEBPACK_IMPORTED_MODULE_6__ = __webpack_require__(/*! @/utils/Module */ "./src/utils/Module.ts");
/* harmony import */ var _logger__WEBPACK_IMPORTED_MODULE_7__ = __webpack_require__(/*! @/logger */ "./src/logger/index.ts");
/* harmony import */ var _core_TargetName__WEBPACK_IMPORTED_MODULE_8__ = __webpack_require__(/*! @/core/TargetName */ "./src/core/TargetName.ts");
/* harmony import */ var _core_ScriptContext__WEBPACK_IMPORTED_MODULE_9__ = __webpack_require__(/*! @/core/ScriptContext */ "./src/core/ScriptContext.ts");
/* harmony import */ var _Scope__WEBPACK_IMPORTED_MODULE_10__ = __webpack_require__(/*! ./Scope */ "./src/core/Scope.ts");
/* harmony import */ var _core_TargetFile__WEBPACK_IMPORTED_MODULE_11__ = __webpack_require__(/*! @/core/TargetFile */ "./src/core/TargetFile.ts");
/* harmony import */ var _core_ExecScriptTask__WEBPACK_IMPORTED_MODULE_12__ = __webpack_require__(/*! @/core/ExecScriptTask */ "./src/core/ExecScriptTask.ts");
/* harmony import */ var _core_SpawnSyncTask__WEBPACK_IMPORTED_MODULE_13__ = __webpack_require__(/*! @/core/SpawnSyncTask */ "./src/core/SpawnSyncTask.ts");
/* harmony import */ var _core_FileInstallationTask__WEBPACK_IMPORTED_MODULE_14__ = __webpack_require__(/*! @/core/FileInstallationTask */ "./src/core/FileInstallationTask.ts");
/* harmony import */ var _core_BuiltinScripts__WEBPACK_IMPORTED_MODULE_15__ = __webpack_require__(/*! @/core/BuiltinScripts */ "./src/core/BuiltinScripts/index.ts");
/*
 * MIT License
 *
 * Copyright (c) 2025  Yurii Yakubin (yurii.yakubin@gmail.com)
 *
 * Permission is granted to use, copy, modify, and distribute this software
 * under the MIT License. See LICENSE file for details.
 */
















const logger = _logger__WEBPACK_IMPORTED_MODULE_7__.Logger.create("file:///mnt/c/opt/work/source/darkit-sdk/external/bitmake/src/core/ProjectContext.ts");
const TARGETS = Symbol("TARGETS");
const CACHE = Symbol("CACHE");
;
function ensureValueByType(type, value) {
    if (Array.isArray(type) ? type.includes(value) : typeof value === type)
        return value;
    throw new Error(`The '${value}' is not a ${type}`);
}
function resolveInstance(project, o) {
    if (typeof o === "string")
        return o;
    if (o instanceof _utils_Locator__WEBPACK_IMPORTED_MODULE_2__.Locator)
        return o.toString();
    if (o instanceof _core_TargetFile__WEBPACK_IMPORTED_MODULE_11__.TargetFile) {
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
    _builtinScripts;
    _subdirAlias;
    constructor() {
        this[TARGETS] = _core_TargetCollection__WEBPACK_IMPORTED_MODULE_4__.TargetCollection.create();
        this[CACHE] = {};
        this._installList = [];
        this._processedVariableMap = {};
        this._subdirAlias = {};
        this._builtinScripts = _core_BuiltinScripts__WEBPACK_IMPORTED_MODULE_15__["default"];
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
        const srcPath = _utils_Locator__WEBPACK_IMPORTED_MODULE_2__.Locator.create(_Scope__WEBPACK_IMPORTED_MODULE_10__.ScopeHelper.get(variableMap, "SOURCE_DIR").resolve(src));
        const destPath = (dest === null) ? null : _utils_Locator__WEBPACK_IMPORTED_MODULE_2__.Locator.create(_Scope__WEBPACK_IMPORTED_MODULE_10__.ScopeHelper.get(variableMap, "SOURCE_DIR").resolve(dest));
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
            const variables = (0,_utils_Module__WEBPACK_IMPORTED_MODULE_6__.requireSync)(filename.toString());
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
        const newVariableMap = _Scope__WEBPACK_IMPORTED_MODULE_10__.ScopeHelper.cloneVariableMap(variableMap);
        params && _Scope__WEBPACK_IMPORTED_MODULE_10__.ScopeHelper.extendVariableMapByValues(newVariableMap, "", params);
        const scriptPath = _Scope__WEBPACK_IMPORTED_MODULE_10__.ScopeHelper.get(newVariableMap, "SOURCE_DIR").resolve(script);
        const func = (0,_utils_Module__WEBPACK_IMPORTED_MODULE_6__.requireSync)(scriptPath.toString());
        const mk = _core_ScriptContext__WEBPACK_IMPORTED_MODULE_9__.ScriptContext.create(newVariableMap);
        func(mk);
    }
    writeCacheVariables(filename) {
        const json = JSON.stringify(this[CACHE], null, 2);
        node_fs__WEBPACK_IMPORTED_MODULE_0___default().writeFileSync(filename, json, "utf-8");
    }
    async prepearScriptFile(variableMap) {
        const originSourceDir = _Scope__WEBPACK_IMPORTED_MODULE_10__.ScopeHelper.get(variableMap, "SOURCE_DIR").toString();
        const resolveSourceDir = this.resolveSubdirectory(originSourceDir);
        if (!resolveSourceDir) {
            logger.info(`Source dir "${originSourceDir}" was disabled`);
            return false;
        }
        _Scope__WEBPACK_IMPORTED_MODULE_10__.ScopeHelper.set(variableMap, "SOURCE_DIR", resolveSourceDir);
        if (!_Scope__WEBPACK_IMPORTED_MODULE_10__.ScopeHelper.get(variableMap, "SCRIPT_FILE")) {
            let scriptFile;
            const fileList = [".js", ".mjs"].map(i => "MakeScript" + i);
            for (const filename of fileList) {
                const iter = _Scope__WEBPACK_IMPORTED_MODULE_10__.ScopeHelper.get(variableMap, "SOURCE_DIR").join(filename);
                if (await (0,_utils_FileSystem__WEBPACK_IMPORTED_MODULE_3__.fileExists)(iter.toString())) {
                    scriptFile = iter;
                    break;
                }
            }
            if (!scriptFile)
                throw new Error(`There are no files ${fileList.join(", ")} in "${_Scope__WEBPACK_IMPORTED_MODULE_10__.ScopeHelper.get(variableMap, "SOURCE_DIR")}"`);
            _Scope__WEBPACK_IMPORTED_MODULE_10__.ScopeHelper.set(variableMap, "SCRIPT_FILE", scriptFile);
            _Scope__WEBPACK_IMPORTED_MODULE_10__.ScopeHelper.set(variableMap, "SCRIPT_DIR", _Scope__WEBPACK_IMPORTED_MODULE_10__.ScopeHelper.get(variableMap, "SCRIPT_FILE").dirname());
        }
        this.registerVariableMap(_Scope__WEBPACK_IMPORTED_MODULE_10__.ScopeHelper.get(variableMap, "SCRIPT_FILE").toString(), variableMap);
        return true;
    }
    findScriptFunction(name) {
        return this._builtinScripts[name];
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
            ge.addTask(new _core_ExecScriptTask__WEBPACK_IMPORTED_MODULE_12__.ExecScriptTask(script.variableMap, scriptObj));
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
                const output = _utils_Locator__WEBPACK_IMPORTED_MODULE_2__.Locator.create(target.binaryDir.join(relativeObject));
                depends.push(output.toString());
                const ge = new _core_GoalCollection__WEBPACK_IMPORTED_MODULE_5__.GoalTarget;
                ge.message = msg;
                ge.output = output;
                ge.addDependency(...headers);
                ge.addDependency(s.FILE.toPath());
                ge.addTask(new _core_SpawnSyncTask__WEBPACK_IMPORTED_MODULE_13__.SpawnSyncTask(s.COMPILE_PATH.toString(), args, target.binaryDir.toPath()));
                goalList.addTarget(ge);
            }
            const generalGoal = new _core_GoalCollection__WEBPACK_IMPORTED_MODULE_5__.GoalTarget;
            for (const params of target.preBuildList) {
                const execStruct = resolveTargetCommand(this, params);
                generalGoal.addTask(new _core_SpawnSyncTask__WEBPACK_IMPORTED_MODULE_13__.SpawnSyncTask(execStruct.command, execStruct.args, target.binaryDir.toString()));
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
                    generalGoal.addTask(new _core_SpawnSyncTask__WEBPACK_IMPORTED_MODULE_13__.SpawnSyncTask(scope.LINKER, args, target.getFileDir().toString()));
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
                    generalGoal.addTask(new _core_SpawnSyncTask__WEBPACK_IMPORTED_MODULE_13__.SpawnSyncTask(scope.AR, args, target.getFileDir().toString()));
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
                    generalGoal.addTask(new _core_SpawnSyncTask__WEBPACK_IMPORTED_MODULE_13__.SpawnSyncTask(target.compilerPath, args, target.getFileDir().toString()));
                }
                else {
                    logger.info(`No objects for "${target.targetName}"`);
                }
            }
            for (const params of target.postBuildList) {
                const execStruct = resolveTargetCommand(this, params);
                generalGoal.addTask(new _core_SpawnSyncTask__WEBPACK_IMPORTED_MODULE_13__.SpawnSyncTask(execStruct.command, execStruct.args, target.binaryDir.toString()));
            }
            goalList.addTarget(generalGoal);
            const worker = new _core_GoalCollection__WEBPACK_IMPORTED_MODULE_5__.GoalTarget(name);
            worker.message = `Built target ${name}`;
            worker.addDependency(target.getFile().toPath());
            goalList.addTarget(worker);
        }
        if (this._installList.length) {
            const worker = new _core_GoalCollection__WEBPACK_IMPORTED_MODULE_5__.GoalTarget(_Constants__WEBPACK_IMPORTED_MODULE_1__.INSTALL_TARGET);
            const fileInstallationTask = new _core_FileInstallationTask__WEBPACK_IMPORTED_MODULE_14__.FileInstallationTask;
            for (const iter of this._installList) {
                let src, dest;
                if (iter.value instanceof _utils_Locator__WEBPACK_IMPORTED_MODULE_2__.Locator) {
                    if (scope.PREVENT_INSTALL_FILES)
                        continue;
                    src = iter.value;
                    const rfile = iter.baseDir.relative(iter.value);
                    dest = iter.destination.join(rfile);
                }
                else if (iter.value instanceof _core_TargetName__WEBPACK_IMPORTED_MODULE_8__.TargetName) {
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
/* harmony import */ var _utils_Locator__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! @/utils/Locator */ "./src/utils/Locator.ts");
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
        Locator: (value) => {
            return _utils_Locator__WEBPACK_IMPORTED_MODULE_0__.Locator.create(value);
        },
        FilePath: (value) => {
            return _utils_Locator__WEBPACK_IMPORTED_MODULE_0__.Locator.create(value);
        },
        DirPath: (value) => {
            return _utils_Locator__WEBPACK_IMPORTED_MODULE_0__.Locator.create(value);
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
        Locator: (value) => {
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
            throw new Error(`Unknown type "${entry.type}"`);
        return func(value);
    }
    function makeEntryValue(entry, value) {
        let newValue;
        if (Array.isArray(entry.type))
            newValue = entry.type.includes(value) ? value : undefined;
        else {
            const func = makeValueMap[entry.type];
            if (!func)
                throw new Error(`Unknown type "${entry.type}"`);
            newValue = func(value);
        }
        if (newValue === undefined)
            throw new TypeError(`Attempting to set "${value}" to type ${entry.type}`);
        return newValue;
    }
    function copyEntryValue(entry, transform) {
        const result = {
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
        else if (descriptor.value instanceof _utils_Locator__WEBPACK_IMPORTED_MODULE_0__.Locator)
            type = "Locator";
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
        else if (type === "Locator" || type === "FilePath" || type === "DirPath") {
            isValidValue = (value) => !!_utils_Locator__WEBPACK_IMPORTED_MODULE_0__.Locator.create(value);
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
/* harmony import */ var _utils_Locator__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! @/utils/Locator */ "./src/utils/Locator.ts");
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
        const filename = _utils_Locator__WEBPACK_IMPORTED_MODULE_0__.Locator.create(json.filename);
        const baseDir = _utils_Locator__WEBPACK_IMPORTED_MODULE_0__.Locator.create(json.baseDir);
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
/* harmony import */ var _core_MakeInterfaces__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! @/core/MakeInterfaces */ "./src/core/MakeInterfaces.ts");
/* harmony import */ var _utils_ChildProcess__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! @/utils/ChildProcess */ "./src/utils/ChildProcess.ts");
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
class SpawnSyncTask extends _core_MakeInterfaces__WEBPACK_IMPORTED_MODULE_0__.InterfaceTask {
    _command;
    _args;
    _cwd;
    constructor(command, args, cwd) {
        super();
        this._command = command;
        this._args = args;
        this._cwd = cwd;
    }
    async execute() {
        logger.debug("spawnAsync");
        logger.debug("  command", this._command);
        logger.debug("  cwd", this._cwd);
        for (let i = 0; i < this._args.length; i++)
            logger.debug(`  args[${i}]`, this._args[i]);
        const result = await (0,_utils_ChildProcess__WEBPACK_IMPORTED_MODULE_1__.spawnAsync)(this._command, this._args, { cwd: this._cwd, encoding: "utf-8", nostdout: true });
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
/* harmony import */ var _utils_Locator__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(/*! @/utils/Locator */ "./src/utils/Locator.ts");
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
        const target = new ObjectLibrary(json.name, _utils_Locator__WEBPACK_IMPORTED_MODULE_5__.Locator.create(json.sourceDir), _utils_Locator__WEBPACK_IMPORTED_MODULE_5__.Locator.create(json.binaryDir));
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
        const target = new StaticLibrary(json.name, _utils_Locator__WEBPACK_IMPORTED_MODULE_5__.Locator.create(json.sourceDir), _utils_Locator__WEBPACK_IMPORTED_MODULE_5__.Locator.create(json.binaryDir));
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
        const target = new SharedLibrary(json.name, _utils_Locator__WEBPACK_IMPORTED_MODULE_5__.Locator.create(json.sourceDir), _utils_Locator__WEBPACK_IMPORTED_MODULE_5__.Locator.create(json.binaryDir));
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
        const target = new Executable(json.name, _utils_Locator__WEBPACK_IMPORTED_MODULE_5__.Locator.create(json.sourceDir), _utils_Locator__WEBPACK_IMPORTED_MODULE_5__.Locator.create(json.binaryDir));
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
/* harmony import */ var _utils_Locator__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! @/utils/Locator */ "./src/utils/Locator.ts");
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
            else if (iter instanceof _utils_Locator__WEBPACK_IMPORTED_MODULE_2__.Locator) {
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
/* harmony import */ var _utils_Locator__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! @/utils/Locator */ "./src/utils/Locator.ts");
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
                else if (iter[1] instanceof _utils_Locator__WEBPACK_IMPORTED_MODULE_1__.Locator)
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
/* harmony import */ var _utils_Locator__WEBPACK_IMPORTED_MODULE_8__ = __webpack_require__(/*! @/utils/Locator */ "./src/utils/Locator.ts");
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
        let variables = params;
        if (typeof params === "string") {
            const url = this[SCOPE].SOURCE_DIR.resolve(params).toURLString();
            variables = this[IMPL].loadJSON(url);
        }
        _core_Scope__WEBPACK_IMPORTED_MODULE_1__.ScopeHelper.defineVariablesInVariableMap(this[VARMAP], _Constants__WEBPACK_IMPORTED_MODULE_5__.CUSTOM_VARIABLE_GROUP, variables);
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
            if (typeof iter === "string" || iter instanceof _utils_Locator__WEBPACK_IMPORTED_MODULE_8__.Locator) {
                iter = this[SCOPE].SOURCE_DIR.resolve(iter.toString());
                iter = _utils_Locator__WEBPACK_IMPORTED_MODULE_8__.FilePath.create(iter);
                baseDir = baseDir || iter.dirname();
            }
            else if (!(iter instanceof _core_TargetName__WEBPACK_IMPORTED_MODULE_9__.TargetName)) {
                throw new Error(`Not supportet value of ${iter}`);
            }
            this[IMPL].addInstallEntry(iter, _utils_Locator__WEBPACK_IMPORTED_MODULE_8__.Locator.create(this[SCOPE].INSTALL_PREFIX.resolve(destination)), baseDir);
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
/* harmony import */ var _utils_Locator__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! @/utils/Locator */ "./src/utils/Locator.ts");
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
        target.addInclude(publicOnly, _utils_Locator__WEBPACK_IMPORTED_MODULE_4__.DirPath.create(sourceDir.resolve(include)));
    else if (include instanceof _utils_Locator__WEBPACK_IMPORTED_MODULE_4__.Locator)
        target.addInclude(publicOnly, _utils_Locator__WEBPACK_IMPORTED_MODULE_4__.DirPath.create(include));
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
    else if (value instanceof _utils_Locator__WEBPACK_IMPORTED_MODULE_4__.Locator)
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
            if (typeof iter === "string" || iter instanceof _utils_Locator__WEBPACK_IMPORTED_MODULE_4__.Locator) {
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

/***/ "./src/server/JsonRpcDispatcher.ts":
/*!*****************************************!*\
  !*** ./src/server/JsonRpcDispatcher.ts ***!
  \*****************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   JsonRpcDispatcher: () => (/* binding */ JsonRpcDispatcher)
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


const logger = _logger__WEBPACK_IMPORTED_MODULE_1__.Logger.create("file:///mnt/c/opt/work/source/darkit-sdk/external/bitmake/src/server/JsonRpcDispatcher.ts");
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
    _id;
    _callback;
    constructor(id, callback) {
        this._id = id;
        this._callback = callback;
    }
    sendResult(result) {
        const message = {
            jsonrpc: _server_Transport__WEBPACK_IMPORTED_MODULE_0__.JSONRPC_VERSION,
            result: (result !== undefined) ? result : null,
            id: this._id,
        };
        logger.debug("<--", JSON.stringify(message));
        this._callback(message);
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
        this._callback(msg);
    }
}
;
class JsonRpcDispatcher {
    _requestHandlers = new Map;
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
    onMessage(data, callback) {
        if (data && typeof data === "object" && typeof data.id === "number") {
            const response = new JsonRpcResponse(data.id, callback);
            if (typeof data.method === "string") {
                const handler = this._requestHandlers.get(data.method);
                if (handler)
                    handler(new JsonRpcRequest(data.params), response);
                else
                    response.sendError(-32601, "Method not found");
            }
            else {
                response.sendError(-32600, "Invalid Request");
            }
        }
        else {
            const response = new JsonRpcResponse(null, callback);
            response.sendError(-32600, "Invalid Request");
        }
    }
    prerformMessage(message) {
        logger.debug("-->", JSON.stringify(message));
        return new Promise((resolve) => {
            if (!Array.isArray(message))
                this.onMessage(message, resolve);
            let count = message.length;
            const result = new Array(message.length);
            for (let i = 0; i < message.length; i++) {
                this.onMessage(message[i], data => {
                    result[i] = data;
                    if (!--count)
                        resolve(result);
                });
            }
        });
    }
}
;


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
/* harmony import */ var _server_Transport__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! @/server/Transport */ "./src/server/Transport.ts");
/* harmony import */ var _core_Scope__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! @/core/Scope */ "./src/core/Scope.ts");
/* harmony import */ var _core_SimpleObject__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(/*! @/core/SimpleObject */ "./src/core/SimpleObject.ts");
/* harmony import */ var _server_RemoteMethods__WEBPACK_IMPORTED_MODULE_6__ = __webpack_require__(/*! @/server/RemoteMethods */ "./src/server/RemoteMethods.ts");
/* harmony import */ var _logger__WEBPACK_IMPORTED_MODULE_7__ = __webpack_require__(/*! @/logger */ "./src/logger/index.ts");
/*
 * MIT License
 *
 * Copyright (c) 2025  Yurii Yakubin (yurii.yakubin@gmail.com)
 *
 * Permission is granted to use, copy, modify, and distribute this software
 * under the MIT License. See LICENSE file for details.
 */
















const logger = _logger__WEBPACK_IMPORTED_MODULE_7__.Logger.create("file:///mnt/c/opt/work/source/darkit-sdk/external/bitmake/src/server/MakeClient.ts");
;
class WorkerRpcClient {
    _jsonRpcDispatcher;
    _worker;
    _id = 1;
    _waitResponseMap = new Map();
    ;
    constructor(jsonRpcDispatcher) {
        this._jsonRpcDispatcher = jsonRpcDispatcher;
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
            jsonrpc: _server_Transport__WEBPACK_IMPORTED_MODULE_3__.JSONRPC_VERSION,
            method,
            params,
            id,
        });
        return result;
    }
    onWorkerMessage(message) {
        if (message instanceof SharedArrayBuffer) {
            const mt = new _server_MemoryTransport__WEBPACK_IMPORTED_MODULE_2__.MemoryMessageSender(message);
            this._jsonRpcDispatcher.prerformMessage(mt.readMessage()).then(data => mt.sendMessage(data));
        }
        else if (Object.hasOwn(message, "method")) {
            this._jsonRpcDispatcher.prerformMessage(message).then(data => this._worker.postMessage(data));
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
class MakeContextClient {
    _workerRpc;
    constructor(jsonRpcDispatcher) {
        this._workerRpc = new WorkerRpcClient(jsonRpcDispatcher);
    }
    createContext() {
        return this._workerRpc.request(_server_RemoteMethods__WEBPACK_IMPORTED_MODULE_6__.MAKECONTEXT_CREATECONTEXT, null);
    }
    destroyContext(mkid) {
        return this._workerRpc.request(_server_RemoteMethods__WEBPACK_IMPORTED_MODULE_6__.MAKECONTEXT_DESTROYCONTEXT, { mkid });
    }
    execScript(mkid, variableMap) {
        const scope = _core_Scope__WEBPACK_IMPORTED_MODULE_4__.ScopeHelper.toJSON(variableMap);
        return this._workerRpc.request(_server_RemoteMethods__WEBPACK_IMPORTED_MODULE_6__.MAKECONTEXT_EXECSCRIPT, { mkid, scope });
    }
    async mainTargets(mkid) {
        const result = await this._workerRpc.request(_server_RemoteMethods__WEBPACK_IMPORTED_MODULE_6__.MAKECONTEXT_MAINTARGETS, { mkid });
        return _core_SimpleObject__WEBPACK_IMPORTED_MODULE_5__.SimpleObject.fromJSON(result);
    }
    async postTargets(mkid) {
        const result = await this._workerRpc.request(_server_RemoteMethods__WEBPACK_IMPORTED_MODULE_6__.MAKECONTEXT_POSTTARGETS, { mkid });
        return _core_SimpleObject__WEBPACK_IMPORTED_MODULE_5__.SimpleObject.fromJSON(result);
    }
    async mainScripts(mkid) {
        const result = await this._workerRpc.request(_server_RemoteMethods__WEBPACK_IMPORTED_MODULE_6__.MAKECONTEXT_MAINSCRIPTS, { mkid });
        return _core_SimpleObject__WEBPACK_IMPORTED_MODULE_5__.SimpleObject.fromJSON(result);
    }
    async postScripts(mkid) {
        const result = await this._workerRpc.request(_server_RemoteMethods__WEBPACK_IMPORTED_MODULE_6__.MAKECONTEXT_POSTSCRIPTS, { mkid });
        return _core_SimpleObject__WEBPACK_IMPORTED_MODULE_5__.SimpleObject.fromJSON(result);
    }
    async installEntries(mkid) {
        const result = await this._workerRpc.request(_server_RemoteMethods__WEBPACK_IMPORTED_MODULE_6__.MAKECONTEXT_INSTALLENTRIES, { mkid });
        return _core_SimpleObject__WEBPACK_IMPORTED_MODULE_5__.SimpleObject.fromJSON(result);
    }
    processExit(code) {
        return this._workerRpc.request(_server_RemoteMethods__WEBPACK_IMPORTED_MODULE_6__.WORKERSERVICE_PROCESSEXIT, 0);
    }
}
;
class MakeClient {
    _makeContext;
    _mainTargets = new Array;
    _postTargets = new Array;
    _mainScripts = new Array;
    _postScripts = new Array;
    _installEntries = new Array;
    constructor(jsonRpcDispatcher) {
        this._makeContext = new MakeContextClient(jsonRpcDispatcher);
    }
    async execMakeScript(variableMap) {
        const mkid = await this._makeContext.createContext();
        const cwdSave = process.cwd();
        const scriptDir = _core_Scope__WEBPACK_IMPORTED_MODULE_4__.ScopeHelper.get(variableMap, "SCRIPT_DIR");
        process.chdir(scriptDir.toString());
        await this._makeContext.execScript(mkid, variableMap);
        process.chdir(cwdSave);
        this._mainTargets = await this._makeContext.mainTargets(mkid);
        this._postTargets = await this._makeContext.postTargets(mkid);
        this._mainScripts = await this._makeContext.mainScripts(mkid);
        this._postScripts = await this._makeContext.postScripts(mkid);
        this._installEntries = await this._makeContext.installEntries(mkid);
        await this._makeContext.processExit(0);
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

/***/ "./src/server/MakeContextProvider.ts":
/*!*******************************************!*\
  !*** ./src/server/MakeContextProvider.ts ***!
  \*******************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   MakeContextProvider: () => (/* binding */ MakeContextProvider)
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






class MakeContextProvider {
    _name;
    _transport;
    _makeContexts = new Map;
    _makeContextCount = 0;
    constructor(name, requestSync) {
        this._name = name;
        this._transport = new _server_JsonRpcRequestSync__WEBPACK_IMPORTED_MODULE_0__.JsonRpcRequestSync(requestSync);
    }
    createContext(params) {
        const mkid = this._name + ":" + this._makeContextCount++;
        const ctx = new _server_RemoteMakeContext__WEBPACK_IMPORTED_MODULE_1__.RemoteMakeContext(this._transport);
        this._makeContexts.set(mkid, ctx);
        return mkid;
    }
    destroyContext(params) {
        return this._makeContexts.delete(params.mkid);
    }
    getContext(mkid) {
        const context = this._makeContexts.get(mkid);
        if (context)
            return context;
        throw new Error(`Not exists make context with id ${mkid}`);
    }
    async execScript(params) {
        const ctx = this.getContext(params.mkid);
        const variableMap = _core_Scope__WEBPACK_IMPORTED_MODULE_5__.ScopeHelper.fromJSON(params.scope);
        const mk = _core_UserMakeContext__WEBPACK_IMPORTED_MODULE_2__.UserMakeContext.create(ctx, variableMap);
        await (0,_core_BaseContext__WEBPACK_IMPORTED_MODULE_3__.performContext)(mk);
    }
    mainTargets(params) {
        const ctx = this.getContext(params.mkid);
        const mainTargets = Array.from(ctx.targets.values());
        return _core_SimpleObject__WEBPACK_IMPORTED_MODULE_4__.SimpleObject.toJSON(mainTargets);
    }
    postTargets(params) {
        const ctx = this.getContext(params.mkid);
        const postTargets = Array.from(ctx.postTargets.values());
        return _core_SimpleObject__WEBPACK_IMPORTED_MODULE_4__.SimpleObject.toJSON(postTargets);
    }
    mainScripts(params) {
        const ctx = this.getContext(params.mkid);
        const mainScripts = Array.from(ctx.mainScripts.values());
        return _core_SimpleObject__WEBPACK_IMPORTED_MODULE_4__.SimpleObject.toJSON(mainScripts);
    }
    postScripts(params) {
        const ctx = this.getContext(params.mkid);
        const postScripts = Array.from(ctx.postScripts.values());
        return _core_SimpleObject__WEBPACK_IMPORTED_MODULE_4__.SimpleObject.toJSON(postScripts);
    }
    installEntries(params) {
        const ctx = this.getContext(params.mkid);
        const installEntries = ctx.installList;
        return _core_SimpleObject__WEBPACK_IMPORTED_MODULE_4__.SimpleObject.toJSON(installEntries);
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
/* harmony import */ var _core_ProjectContext__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! @/core/ProjectContext */ "./src/core/ProjectContext.ts");
/* harmony import */ var _core_ScriptContext__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! @/core/ScriptContext */ "./src/core/ScriptContext.ts");
/* harmony import */ var _core_Scope__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! @/core/Scope */ "./src/core/Scope.ts");
/* harmony import */ var _server_MakeClient__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! @/server/MakeClient */ "./src/server/MakeClient.ts");
/* harmony import */ var _server_JsonRpcDispatcher__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! @/server/JsonRpcDispatcher */ "./src/server/JsonRpcDispatcher.ts");
/* harmony import */ var _utils_Module__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(/*! @/utils/Module */ "./src/utils/Module.ts");
/* harmony import */ var _utils_JSValue__WEBPACK_IMPORTED_MODULE_6__ = __webpack_require__(/*! @/utils/JSValue */ "./src/utils/JSValue.ts");
/* harmony import */ var _core_BaseContext__WEBPACK_IMPORTED_MODULE_7__ = __webpack_require__(/*! @/core/BaseContext */ "./src/core/BaseContext.ts");
/* harmony import */ var _server_RemoteMethods__WEBPACK_IMPORTED_MODULE_8__ = __webpack_require__(/*! @/server/RemoteMethods */ "./src/server/RemoteMethods.ts");
/* harmony import */ var _logger__WEBPACK_IMPORTED_MODULE_9__ = __webpack_require__(/*! @/logger */ "./src/logger/index.ts");
/* harmony import */ var _utils_Locator__WEBPACK_IMPORTED_MODULE_10__ = __webpack_require__(/*! @/utils/Locator */ "./src/utils/Locator.ts");
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
    _project = _core_ProjectContext__WEBPACK_IMPORTED_MODULE_0__.ProjectContext.create();
    _listeners;
    _jsonRpcDispatcher = new _server_JsonRpcDispatcher__WEBPACK_IMPORTED_MODULE_4__.JsonRpcDispatcher;
    _clients = new Array;
    constructor() {
        this._listeners = {
            [CONFIGURE_EVENT]: new Array,
            [BUILD_EVENT]: new Array,
        };
        this._jsonRpcDispatcher.registerCallback(_server_RemoteMethods__WEBPACK_IMPORTED_MODULE_8__.MAINNODE_EXECUTESCRIPT, params => this.executeScript(params));
        this._jsonRpcDispatcher.registerCallback(_server_RemoteMethods__WEBPACK_IMPORTED_MODULE_8__.MAINNODE_LOADJSON, params => this.loadJSON(params));
        this._jsonRpcDispatcher.registerCallback(_server_RemoteMethods__WEBPACK_IMPORTED_MODULE_8__.MAINNODE_STARTMAKESCRIPT, params => this.startMakeScript(params));
    }
    get rootVariableMap() {
        return this._rootVariableMap;
    }
    get project() {
        return this._project;
    }
    async startMakeScript(params) {
        logger.debug("MakeServer.startMakeScript");
        const variableMap = _core_Scope__WEBPACK_IMPORTED_MODULE_2__.ScopeHelper.fromJSON(params);
        await this.runMakeScript(variableMap);
    }
    async loadJSON(filename) {
        logger.debug("MakeServer.loadJSON(", filename, ")");
        return await (0,_utils_JSValue__WEBPACK_IMPORTED_MODULE_6__.loadJSValue)(_utils_Locator__WEBPACK_IMPORTED_MODULE_10__.Locator.create(filename));
    }
    async executeScript(params) {
        logger.debug("MakeServer.executeScript");
        const variableMap = _core_Scope__WEBPACK_IMPORTED_MODULE_2__.ScopeHelper.fromJSON(params);
        const scriptFile = _core_Scope__WEBPACK_IMPORTED_MODULE_2__.ScopeHelper.get(variableMap, "SCRIPT_FILE");
        const module = await (0,_utils_Module__WEBPACK_IMPORTED_MODULE_5__.importModule)(scriptFile.toURLString());
        if (!module.default)
            throw new Error(`Script "${scriptFile}" has not contain a default function`);
        const mk = _core_ScriptContext__WEBPACK_IMPORTED_MODULE_1__.ScriptContext.create(variableMap);
        module.default(mk);
    }
    async runMakeScript(variableMap) {
        if (!await this._project.prepearScriptFile(variableMap))
            return false;
        const client = new _server_MakeClient__WEBPACK_IMPORTED_MODULE_3__.MakeClient(this._jsonRpcDispatcher);
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
        const sourceDir = _core_Scope__WEBPACK_IMPORTED_MODULE_2__.ScopeHelper.get(this._rootVariableMap, "PROJECT_SOURCE_DIR");
        const binaryDir = _core_Scope__WEBPACK_IMPORTED_MODULE_2__.ScopeHelper.get(this._rootVariableMap, "PROJECT_BINARY_DIR");
        const variableMap = (0,_core_BaseContext__WEBPACK_IMPORTED_MODULE_7__.createVariableMapForDirectory)(this._rootVariableMap, sourceDir, binaryDir);
        if (!await this.runMakeScript(variableMap))
            throw Error("Can't prepear ScriptFile");
        this.combineResults();
        this.onConfigureEnd();
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
    constructor(transport) {
        super();
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
    loadJSON(filename) {
        return this._transport.requestSync(_server_RemoteMethods__WEBPACK_IMPORTED_MODULE_1__.MAINNODE_LOADJSON, filename);
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
/* harmony export */   MAKECONTEXT_CREATECONTEXT: () => (/* binding */ MAKECONTEXT_CREATECONTEXT),
/* harmony export */   MAKECONTEXT_DESTROYCONTEXT: () => (/* binding */ MAKECONTEXT_DESTROYCONTEXT),
/* harmony export */   MAKECONTEXT_EXECSCRIPT: () => (/* binding */ MAKECONTEXT_EXECSCRIPT),
/* harmony export */   MAKECONTEXT_INSTALLENTRIES: () => (/* binding */ MAKECONTEXT_INSTALLENTRIES),
/* harmony export */   MAKECONTEXT_MAINSCRIPTS: () => (/* binding */ MAKECONTEXT_MAINSCRIPTS),
/* harmony export */   MAKECONTEXT_MAINTARGETS: () => (/* binding */ MAKECONTEXT_MAINTARGETS),
/* harmony export */   MAKECONTEXT_POSTSCRIPTS: () => (/* binding */ MAKECONTEXT_POSTSCRIPTS),
/* harmony export */   MAKECONTEXT_POSTTARGETS: () => (/* binding */ MAKECONTEXT_POSTTARGETS),
/* harmony export */   WORKERSERVICE_PROCESSEXIT: () => (/* binding */ WORKERSERVICE_PROCESSEXIT)
/* harmony export */ });
/*
 * MIT License
 *
 * Copyright (c) 2025  Yurii Yakubin (yurii.yakubin@gmail.com)
 *
 * Permission is granted to use, copy, modify, and distribute this software
 * under the MIT License. See LICENSE file for details.
 */
const MAKECONTEXT_CREATECONTEXT = "MakeContext.createContext";
const MAKECONTEXT_DESTROYCONTEXT = "MakeContext.destroyContext";
const MAKECONTEXT_EXECSCRIPT = "MakeContext.execScript";
const MAKECONTEXT_MAINTARGETS = "MakeContext.mainTargets";
const MAKECONTEXT_POSTTARGETS = "MakeContext.postTargets";
const MAKECONTEXT_MAINSCRIPTS = "MakeContext.mainScripts";
const MAKECONTEXT_POSTSCRIPTS = "MakeContext.postScripts";
const MAKECONTEXT_INSTALLENTRIES = "MakeContext.installEntries";
const WORKERSERVICE_PROCESSEXIT = "WorkerService.processExit";
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

/***/ "./src/server/WorkerMessageDispatcher.ts":
/*!***********************************************!*\
  !*** ./src/server/WorkerMessageDispatcher.ts ***!
  \***********************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   WorkerMessageDispatcher: () => (/* binding */ WorkerMessageDispatcher)
/* harmony export */ });
/* harmony import */ var _server_MemoryTransport__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! @/server/MemoryTransport */ "./src/server/MemoryTransport.ts");
/* harmony import */ var _server_JsonRpcDispatcher__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! @/server/JsonRpcDispatcher */ "./src/server/JsonRpcDispatcher.ts");
/* harmony import */ var _server_MakeContextProvider__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! @/server/MakeContextProvider */ "./src/server/MakeContextProvider.ts");
/* harmony import */ var _server_WorkerServiceProvider__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! @/server/WorkerServiceProvider */ "./src/server/WorkerServiceProvider.ts");
/* harmony import */ var _server_RemoteMethods__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! @/server/RemoteMethods */ "./src/server/RemoteMethods.ts");
/* harmony import */ var _logger__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(/*! @/logger */ "./src/logger/index.ts");
/*
 * MIT License
 *
 * Copyright (c) 2025  Yurii Yakubin (yurii.yakubin@gmail.com)
 *
 * Permission is granted to use, copy, modify, and distribute this software
 * under the MIT License. See LICENSE file for details.
 */














const logger = _logger__WEBPACK_IMPORTED_MODULE_5__.Logger.create("file:///mnt/c/opt/work/source/darkit-sdk/external/bitmake/src/server/WorkerMessageDispatcher.ts");
class WorkerMessageDispatcher {
    _jsonRpcDispatcher;
    constructor(name, sender) {
        this._jsonRpcDispatcher = new _server_JsonRpcDispatcher__WEBPACK_IMPORTED_MODULE_1__.JsonRpcDispatcher;
        const buffer = new SharedArrayBuffer(0x8000);
        const transport = new _server_MemoryTransport__WEBPACK_IMPORTED_MODULE_0__.MemoryTransport(sender, buffer);
        const makeContext = new _server_MakeContextProvider__WEBPACK_IMPORTED_MODULE_2__.MakeContextProvider(name, transport);
        this._jsonRpcDispatcher.registerCallback(_server_RemoteMethods__WEBPACK_IMPORTED_MODULE_4__.MAKECONTEXT_CREATECONTEXT, params => makeContext.createContext(params));
        this._jsonRpcDispatcher.registerCallback(_server_RemoteMethods__WEBPACK_IMPORTED_MODULE_4__.MAKECONTEXT_DESTROYCONTEXT, params => makeContext.destroyContext(params));
        this._jsonRpcDispatcher.registerCallback(_server_RemoteMethods__WEBPACK_IMPORTED_MODULE_4__.MAKECONTEXT_EXECSCRIPT, params => makeContext.execScript(params));
        this._jsonRpcDispatcher.registerCallback(_server_RemoteMethods__WEBPACK_IMPORTED_MODULE_4__.MAKECONTEXT_MAINTARGETS, params => makeContext.mainTargets(params));
        this._jsonRpcDispatcher.registerCallback(_server_RemoteMethods__WEBPACK_IMPORTED_MODULE_4__.MAKECONTEXT_POSTTARGETS, params => makeContext.postTargets(params));
        this._jsonRpcDispatcher.registerCallback(_server_RemoteMethods__WEBPACK_IMPORTED_MODULE_4__.MAKECONTEXT_MAINSCRIPTS, params => makeContext.mainScripts(params));
        this._jsonRpcDispatcher.registerCallback(_server_RemoteMethods__WEBPACK_IMPORTED_MODULE_4__.MAKECONTEXT_POSTSCRIPTS, params => makeContext.postScripts(params));
        this._jsonRpcDispatcher.registerCallback(_server_RemoteMethods__WEBPACK_IMPORTED_MODULE_4__.MAKECONTEXT_INSTALLENTRIES, params => makeContext.installEntries(params));
        const workerService = new _server_WorkerServiceProvider__WEBPACK_IMPORTED_MODULE_3__.WorkerServiceProvider;
        this._jsonRpcDispatcher.registerCallback(_server_RemoteMethods__WEBPACK_IMPORTED_MODULE_4__.WORKERSERVICE_PROCESSEXIT, params => workerService.processExit(params));
    }
    prerformMessage(message) {
        return this._jsonRpcDispatcher.prerformMessage(message);
    }
}
;


/***/ }),

/***/ "./src/server/WorkerServiceProvider.ts":
/*!*********************************************!*\
  !*** ./src/server/WorkerServiceProvider.ts ***!
  \*********************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   WorkerServiceProvider: () => (/* binding */ WorkerServiceProvider)
/* harmony export */ });
/*
 * MIT License
 *
 * Copyright (c) 2025  Yurii Yakubin (yurii.yakubin@gmail.com)
 *
 * Permission is granted to use, copy, modify, and distribute this software
 * under the MIT License. See LICENSE file for details.
 */
class WorkerServiceProvider {
    processExit(params) {
        setTimeout(() => process.exit(params), 0);
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
/* harmony export */   execFileAsync: () => (/* binding */ execFileAsync),
/* harmony export */   spawnAsync: () => (/* binding */ spawnAsync)
/* harmony export */ });
/* harmony import */ var node_path__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! node:path */ "node:path");
/* harmony import */ var node_path__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(node_path__WEBPACK_IMPORTED_MODULE_0__);
/* harmony import */ var node_fs__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! node:fs */ "node:fs");
/* harmony import */ var node_fs__WEBPACK_IMPORTED_MODULE_1___default = /*#__PURE__*/__webpack_require__.n(node_fs__WEBPACK_IMPORTED_MODULE_1__);
/* harmony import */ var node_child_process__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! node:child_process */ "node:child_process");
/* harmony import */ var node_child_process__WEBPACK_IMPORTED_MODULE_2___default = /*#__PURE__*/__webpack_require__.n(node_child_process__WEBPACK_IMPORTED_MODULE_2__);
/* harmony import */ var node_util__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! node:util */ "node:util");
/* harmony import */ var node_util__WEBPACK_IMPORTED_MODULE_3___default = /*#__PURE__*/__webpack_require__.n(node_util__WEBPACK_IMPORTED_MODULE_3__);
/* harmony import */ var _logger__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! @/logger */ "./src/logger/index.ts");
/*
 * MIT License
 *
 * Copyright (c) 2025  Yurii Yakubin (yurii.yakubin@gmail.com)
 *
 * Permission is granted to use, copy, modify, and distribute this software
 * under the MIT License. See LICENSE file for details.
 */





const logger = _logger__WEBPACK_IMPORTED_MODULE_4__.Logger.create("file:///mnt/c/opt/work/source/darkit-sdk/external/bitmake/src/utils/ChildProcess.ts");
;
;
function spawnAsync(command, args, options) {
    let fd = null;
    let verbose = false;
    const encoding = options?.encoding;
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
        verbose && logger.notice([node_path__WEBPACK_IMPORTED_MODULE_0___default().basename(command), ...args].join(" "));
        if (fd) {
            node_fs__WEBPACK_IMPORTED_MODULE_1___default().writeSync(fd, JSON.stringify({ command, args, options }, null, 2) + "\n");
        }
        const stdout = [];
        const stderr = [];
        const output = [];
        const exec = (0,node_child_process__WEBPACK_IMPORTED_MODULE_2__.spawn)(command, args, options);
        if (fd) {
            exec.stdout.addListener("data", chunk => node_fs__WEBPACK_IMPORTED_MODULE_1___default().writeSync(fd, chunk));
            exec.stderr.addListener("data", chunk => node_fs__WEBPACK_IMPORTED_MODULE_1___default().writeSync(fd, chunk));
            exec.addListener("close", () => node_fs__WEBPACK_IMPORTED_MODULE_1___default().closeSync(fd));
        }
        else {
            exec.stdout.addListener("data", chunk => {
                stdout.push(chunk);
                output.push(chunk);
            });
            exec.stderr.addListener("data", chunk => {
                stderr.push(chunk);
                output.push(chunk);
            });
        }
        if (!options?.nostdout) {
            exec.stdout.addListener("data", chunk => process.stdout.write(chunk));
            exec.stderr.addListener("data", chunk => process.stderr.write(chunk));
        }
        exec.addListener("close", (status) => resolve({
            status,
            stdout: Buffer.concat(stdout).toString(encoding),
            stderr: Buffer.concat(stderr).toString(encoding),
            output: Buffer.concat(output).toString(encoding),
        }));
    });
}
const execFileAsync = node_util__WEBPACK_IMPORTED_MODULE_3___default().promisify(node_child_process__WEBPACK_IMPORTED_MODULE_2__.execFile);


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
/* harmony export */   resolveURLString: () => (/* binding */ resolveURLString),
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
function resolveURLString(str) {
    if (str.startsWith(_utils_UrlScheme__WEBPACK_IMPORTED_MODULE_3__.IMPORT_SCHEME))
        return (0,_utils_Module__WEBPACK_IMPORTED_MODULE_4__.requireResolve)(str.slice(_utils_UrlScheme__WEBPACK_IMPORTED_MODULE_3__.IMPORT_SCHEME.length));
    return isURL(str) ? str : node_url__WEBPACK_IMPORTED_MODULE_2___default().pathToFileURL(str);
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
                "User-Agent": "bitmake" + "/" + "0.0.1-develop.12",
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

/***/ "./src/utils/JSValue.ts":
/*!******************************!*\
  !*** ./src/utils/JSValue.ts ***!
  \******************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   loadJSValue: () => (/* binding */ loadJSValue)
/* harmony export */ });
/* harmony import */ var node_fs__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! node:fs */ "node:fs");
/* harmony import */ var node_fs__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(node_fs__WEBPACK_IMPORTED_MODULE_0__);
/* harmony import */ var _utils_Module__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! @/utils/Module */ "./src/utils/Module.ts");
/*
 * MIT License
 *
 * Copyright (c) 2025  Yurii Yakubin (yurii.yakubin@gmail.com)
 *
 * Permission is granted to use, copy, modify, and distribute this software
 * under the MIT License. See LICENSE file for details.
 */


async function loadJSValue(filename) {
    if (filename.endsWith(".json")) {
        const content = await node_fs__WEBPACK_IMPORTED_MODULE_0___default().promises.readFile(filename.toPath(), "utf8");
        return JSON.parse(content);
    }
    const module = await (0,_utils_Module__WEBPACK_IMPORTED_MODULE_1__.importModule)(filename.toURLString());
    if (!module.default)
        throw new Error(`Script "${filename}" has not contain a default function`);
    return module.default;
}


/***/ }),

/***/ "./src/utils/Locator.ts":
/*!******************************!*\
  !*** ./src/utils/Locator.ts ***!
  \******************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   DirPath: () => (/* binding */ DirPath),
/* harmony export */   FilePath: () => (/* binding */ FilePath),
/* harmony export */   Locator: () => (/* binding */ Locator)
/* harmony export */ });
/* harmony import */ var node_path__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! node:path */ "node:path");
/* harmony import */ var node_path__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(node_path__WEBPACK_IMPORTED_MODULE_0__);
/* harmony import */ var node_url__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! node:url */ "node:url");
/* harmony import */ var node_url__WEBPACK_IMPORTED_MODULE_1___default = /*#__PURE__*/__webpack_require__.n(node_url__WEBPACK_IMPORTED_MODULE_1__);
/* harmony import */ var _utils_UrlScheme__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! @/utils/UrlScheme */ "./src/utils/UrlScheme.ts");
/* harmony import */ var _utils_Module__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! @/utils/Module */ "./src/utils/Module.ts");
/*
 * MIT License
 *
 * Copyright (c) 2025  Yurii Yakubin (yurii.yakubin@gmail.com)
 *
 * Permission is granted to use, copy, modify, and distribute this software
 * under the MIT License. See LICENSE file for details.
 */




const PATH = Symbol("PATH");
function isAbsolute(filepath) {
    if (filepath.startsWith(_utils_UrlScheme__WEBPACK_IMPORTED_MODULE_2__.FILE_SCHEME))
        return true;
    if (filepath.startsWith(_utils_UrlScheme__WEBPACK_IMPORTED_MODULE_2__.IMPORT_SCHEME))
        return true;
    if (filepath.startsWith("/"))
        return true;
    if (filepath.match(/^[a-zA-Z]:[\\/]/))
        return true;
    /* \\localhost */
    /* \\wsl.localhost\Ubuntu\opt */
    return false;
}
function toURLString(str) {
    if (str.startsWith(_utils_UrlScheme__WEBPACK_IMPORTED_MODULE_2__.FILE_SCHEME) || str.startsWith(_utils_UrlScheme__WEBPACK_IMPORTED_MODULE_2__.IMPORT_SCHEME))
        return str;
    if (isAbsolute(str))
        return node_url__WEBPACK_IMPORTED_MODULE_1___default().pathToFileURL(str).toString();
    throw new Error(`Not supported relative path of "${str}"`);
}
class Locator {
    [PATH];
    constructor(urlString) {
        this[PATH] = urlString;
    }
    join(...paths) {
        const url = new URL(this[PATH]);
        url.pathname = node_path__WEBPACK_IMPORTED_MODULE_0___default().posix.join(url.pathname, ...paths.map(i => {
            if (i instanceof Locator)
                return new URL(i[PATH]).pathname;
            if (typeof i === "string")
                return i.replaceAll((node_path__WEBPACK_IMPORTED_MODULE_0___default().win32).sep, (node_path__WEBPACK_IMPORTED_MODULE_0___default().posix).sep);
            throw new Error(`Attempted to join to wrong type ${i} type`);
        }));
        return new Locator(url.toString());
    }
    dirname() {
        const dirname = node_path__WEBPACK_IMPORTED_MODULE_0___default().posix.dirname(this[PATH]);
        return new Locator(dirname);
    }
    basename() {
        return node_path__WEBPACK_IMPORTED_MODULE_0___default().posix.basename(this[PATH]);
    }
    extname() {
        return node_path__WEBPACK_IMPORTED_MODULE_0___default().posix.extname(this[PATH]);
    }
    relative(to) {
        if (to instanceof Locator)
            to = to[PATH];
        const leftUrl = new URL(this[PATH]);
        const rightUrl = new URL(toURLString(to));
        if (leftUrl.protocol !== rightUrl.protocol)
            throw new Error(`Protocol ${leftUrl.protocol} did not match for ${to}`);
        if (leftUrl.host !== rightUrl.host)
            throw new Error(`Host ${leftUrl.host} did not match for ${to}`);
        return node_path__WEBPACK_IMPORTED_MODULE_0___default().posix.relative(leftUrl.pathname, rightUrl.pathname);
    }
    resolve(...paths) {
        if (paths.length === 0)
            return this;
        let rootPath = this[PATH];
        const pathStrings = [];
        for (let i = paths.length - 1; i >= 0; i--) {
            const iter = paths[i];
            if (iter instanceof Locator) {
                rootPath = iter[PATH];
                break;
            }
            if (Locator.isAbsolute(iter)) {
                rootPath = toURLString(iter);
                break;
            }
            pathStrings.push(iter.replaceAll("\\", "/"));
        }
        const url = new URL(rootPath);
        url.pathname = node_path__WEBPACK_IMPORTED_MODULE_0___default().posix.resolve(url.pathname, ...pathStrings);
        return new Locator(url.toString());
    }
    match(regexp) {
        return this[PATH].match(regexp);
    }
    startsWith(searchString, position) {
        return this[PATH].startsWith(searchString, position);
    }
    endsWith(searchString, endPosition) {
        return this[PATH].endsWith(searchString, endPosition);
    }
    toString() {
        return node_url__WEBPACK_IMPORTED_MODULE_1___default().fileURLToPath(this[PATH]);
    }
    toPath() {
        if (this[PATH].startsWith(_utils_UrlScheme__WEBPACK_IMPORTED_MODULE_2__.FILE_SCHEME))
            return node_url__WEBPACK_IMPORTED_MODULE_1___default().fileURLToPath(this[PATH]);
        if (this[PATH].startsWith(_utils_UrlScheme__WEBPACK_IMPORTED_MODULE_2__.IMPORT_SCHEME))
            return (0,_utils_Module__WEBPACK_IMPORTED_MODULE_3__.requireResolve)(this[PATH].slice(_utils_UrlScheme__WEBPACK_IMPORTED_MODULE_2__.IMPORT_SCHEME.length));
        throw new Error(`URL ${this[PATH]} can't convert to path`);
    }
    valueOf() {
        return node_url__WEBPACK_IMPORTED_MODULE_1___default().fileURLToPath(this[PATH]);
    }
    toURLString() {
        if (this[PATH].startsWith(_utils_UrlScheme__WEBPACK_IMPORTED_MODULE_2__.IMPORT_SCHEME))
            return node_url__WEBPACK_IMPORTED_MODULE_1___default().pathToFileURL((0,_utils_Module__WEBPACK_IMPORTED_MODULE_3__.requireResolve)(this[PATH].slice(_utils_UrlScheme__WEBPACK_IMPORTED_MODULE_2__.IMPORT_SCHEME.length))).toString();
        return this[PATH];
    }
    toJSON() {
        return this[PATH];
    }
    static isAbsolute(filepath) {
        if (filepath instanceof Locator)
            return true;
        return isAbsolute(filepath);
    }
    static ensureInstance(value) {
        if (value instanceof Locator)
            return value;
        throw new Error(`The '${value}' is not a Locator`);
    }
    static create(path) {
        if (path instanceof Locator)
            return path;
        return Object.seal(new Locator(toURLString(path)));
    }
}
;
class DirPath extends Locator {
    constructor(dirname) {
        super(dirname);
    }
    static create(dirname) {
        if (typeof dirname !== "string")
            dirname = dirname.toURLString();
        return new DirPath(toURLString(dirname));
    }
    static fromJSON(object) {
        return DirPath.create(object.url);
    }
    toJSON() {
        return {
            type: DirPath.name,
            url: this.toURLString(),
        };
    }
}
;
class FilePath extends Locator {
    constructor(filepath) {
        super(filepath);
    }
    static create(filepath) {
        if (typeof filepath !== "string")
            filepath = filepath.toURLString();
        return new FilePath(toURLString(filepath));
    }
    static fromJSON(object) {
        return FilePath.create(object.url);
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

/***/ "node:util":
/*!****************************!*\
  !*** external "node:util" ***!
  \****************************/
/***/ ((module) => {

module.exports = require("node:util");

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
//# sourceMappingURL=data:application/json;charset=utf-8;base64,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QUFFLFdBQVcsQ0FBQyxDQUFDO1FBQ3BELE1BQU0saUVBQWMsQ0FBQyxFQUFFLENBQUMsQ0FBQztJQUMzQixDQUFDO0lBRU0sV0FBVyxDQUFDLE1BQVc7UUFDNUIsTUFBTSxHQUFHLEdBQUcsSUFBSSxDQUFDLFVBQVUsQ0FBQyxNQUFNLENBQUMsSUFBSSxDQUFDLENBQUM7UUFDekMsTUFBTSxXQUFXLEdBQUcsS0FBSyxDQUFDLElBQUksQ0FBQyxHQUFHLENBQUMsT0FBTyxDQUFDLE1BQU0sRUFBRSxDQUFDLENBQUM7UUFDckQsT0FBTyw0REFBWSxDQUFDLE1BQU0sQ0FBQyxXQUFXLENBQUMsQ0FBQztJQUMxQyxDQUFDO0lBRU0sV0FBVyxDQUFDLE1BQVc7UUFDNUIsTUFBTSxHQUFHLEdBQUcsSUFBSSxDQUFDLFVBQVUsQ0FBQyxNQUFNLENBQUMsSUFBSSxDQUFDLENBQUM7UUFDekMsTUFBTSxXQUFXLEdBQUcsS0FBSyxDQUFDLElBQUksQ0FBQyxHQUFHLENBQUMsV0FBVyxDQUFDLE1BQU0sRUFBRSxDQUFDLENBQUM7UUFDekQsT0FBTyw0REFBWSxDQUFDLE1BQU0sQ0FBQyxXQUFXLENBQUMsQ0FBQztJQUMxQyxDQUFDO0lBRU0sV0FBVyxDQUFDLE1BQVc7UUFDNUIsTUFBTSxHQUFHLEdBQUcsSUFBSSxDQUFDLFVBQVUsQ0FBQyxNQUFNLENBQUMsSUFBSSxDQUFDLENBQUM7UUFDekMsTUFBTSxXQUFXLEdBQUcsS0FBSyxDQUFDLElBQUksQ0FBQyxHQUFHLENBQUMsV0FBVyxDQUFDLE1BQU0sRUFBRSxDQUFDLENBQUM7UUFDekQsT0FBTyw0REFBWSxDQUFDLE1BQU0sQ0FBQyxXQUFXLENBQUMsQ0FBQztJQUMxQyxDQUFDO0lBRU0sV0FBVyxDQUFDLE1BQVc7UUFDNUIsTUFBTSxHQUFHLEdBQUcsSUFBSSxDQUFDLFVBQVUsQ0FBQyxNQUFNLENBQUMsSUFBSSxDQUFDLENBQUM7UUFDekMsTUFBTSxXQUFXLEdBQUcsS0FBSyxDQUFDLElBQUksQ0FBQyxHQUFHLENBQUMsV0FBVyxDQUFDLE1BQU0sRUFBRSxD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QzFCLElBQUksQ0FBQyxTQUFTLEdBQUcsUUFBUSxDQUFDO0lBQzVCLENBQUM7SUFFTSxLQUFLLENBQUMsSUFBSSxDQUFDLElBQVk7UUFDNUIsSUFBSSxDQUFDLElBQUksQ0FBQyxTQUFTO1lBQ2pCLE1BQU0sSUFBSSxDQUFDLElBQUksRUFBRSxDQUFDO1FBQ3BCLElBQUksTUFBTSxHQUFHLElBQUksQ0FBQyxRQUFRLENBQUMsTUFBTSxDQUFDLElBQUksQ0FBQyxDQUFDO1FBQ3hDLElBQUksQ0FBQyxNQUFNO1lBQ1QsTUFBTSxHQUFHLElBQUksQ0FBQyxRQUFRLENBQUMsTUFBTSxDQUFDLElBQUksQ0FBQyxHQUFHLEVBQUUsQ0FBQztRQUMzQyxJQUFJLENBQUMsUUFBUSxHQUFHLEVBQUUsTUFBTSxFQUFFLElBQUksQ0FBQyxRQUFRLEVBQUUsTUFBTSxFQUFFLENBQUM7SUFDcEQsQ0FBQztJQUVNLEtBQUssQ0FBQyxHQUFHO1FBQ2QsSUFBSSxDQUFDLElBQUksQ0FBQyxTQUFTO1lBQ2pCLE1BQU0sSUFBSSxDQUFDLElBQUksRUFBRSxDQUFDO1FBQ3BCLE9BQU8sQ0FBQyxNQUFNLENBQUMsSUFBSSxDQUFDLFFBQVEsQ0FBQyxNQUFNLENBQUMsQ0FBQztRQUNyQyxJQUFJLENBQUMsUUFBUSxHQUFHLElBQUksQ0FBQyxRQUFRLENBQUMsTUFBTSxDQUFDO0lBQ3ZDLENBQUM7SUFFTSxLQUFLLENBQUMsR0FBRyxDQUFDLElBQVk7UUFDM0IsSUFBSSxDQUFDLElBQUksQ0FBQyxTQUFTO1lBQ2pCLE1BQU0sSUFBSSxDQUFDLElBQUksRUFBRSxDQUFDO1FBQ3BCLE9BQU8sSUFBSSxDQUFDLFFBQVEsQ0FBQyxNQUFNLENBQUMsSUFBSSxDQUFDLENBQUM7SUFDcEMsQ0FBQztJQUVNLEtBQUssQ0FBQyxHQUFHLENBQUMsSUFBWSxFQUFFLEtBQVU7UUFDdkMsSUFBSSxDQUFDLElBQUksQ0FBQyxTQUFTO1lBQ2pCLE1BQU0sSUFBSSxDQUFDLElBQUksRUFBRSxDQUFDO1FBQ3BCLElBQUksQ0FBQyxRQUFRLENBQUMsTUFB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RUFBRTtRQUNMLFVBQVU7UUFDVixZQUFZO0tBQ2I7SUFDRCxJQUFJLEVBQUUsNkNBQUk7Q0FDWCxFQUFDO0FBRUYseURBQVMsRUFBRSxDQUFDIiwic291cmNlcyI6WyJ3ZWJwYWNrOi8vYml0bWFrZS93ZWJwYWNrL3VuaXZlcnNhbE1vZHVsZURlZmluaXRpb24iLCJ3ZWJwYWNrOi8vYml0bWFrZS8uL3NyYy9Db25zdGFudHMudHMiLCJ3ZWJwYWNrOi8vYml0bWFrZS8uL3NyYy9hY3Rpb25zL2JpdG1ha2UudHMiLCJ3ZWJwYWNrOi8vYml0bWFrZS8uL3NyYy9hY3Rpb25zL2NtYWtlLnRzIiwid2VicGFjazovL2JpdG1ha2UvLi9zcmMvYWN0aW9ucy9jb25maWd1cmUudHMiLCJ3ZWJwYWNrOi8vYml0bWFrZS8uL3NyYy9hY3Rpb25zL2luZGV4LnRzIiwid2VicGFjazovL2JpdG1ha2UvLi9zcmMvYWN0aW9ucy9tYWtlLnRzIiwid2VicGFjazovL2JpdG1ha2UvLi9zcmMvYWN0aW9ucy9ub25lLnRzIiwid2VicGFjazovL2JpdG1ha2UvLi9zcmMvYWN0aW9ucy9wcm9jZXNzLnRzIiwid2VicGFjazovL2JpdG1ha2UvLi9zcmMvYXBwL1J1blNjcmlwdC50cyIsIndlYnBhY2s6Ly9iaXRtYWtlLy4vc3JjL2FwcC9SdW5TY3JpcHRJbml0LnRzIiwid2VicGFjazovL2JpdG1ha2UvLi9zcmMvY2xhbmcvaW5kZXgudHMiLCJ3ZWJwYWNrOi8vYml0bWFrZS8uL3NyYy9jbWFrZS9Db25zdGFudHMudHMiLCJ3ZWJwYWNrOi8vYml0bWFrZS8uL3NyYy9jbWFrZS9IZWxwZXIudHMiLCJ3ZWJwYWNrOi8vYml0bWFrZS8uL3NyYy9jbWFrZS9pbmRleC50cyIsIndlYnBhY2s6Ly9iaXRtYWtlLy4vc3JjL2NvbW1hbmRzL2J1aWxkLnRzIiwid2VicGFjazovL2JpdG1ha2UvLi9zcmMvY29tbWFuZHMvaW5kZXgudHMiLCJ3ZWJwYWNrOi8vYml0bWFrZS8uL3NyYy9jb21tYW5kcy9pbml0LnRzIiwid2VicGFjazovL2JpdG1ha2UvLi9zcmMvY29yZS9CYXNlQ29udGV4dC50cyIsIndlYnBhY2s6Ly9iaXRtYWtlLy4vc3JjL2NvcmUvQnVpbHRpblNjcmlwdHMvY19oZWFkZXIudHMiLCJ3ZWJwYWNrOi8vYml0bWFrZS8uL3NyYy9jb3JlL0J1aWx0aW5TY3JpcHRzL2NvbmZpZ3VyZV9maWxlLnRzIiwid2VicGFjazovL2JpdG1ha2UvLi9zcmMvY29yZS9CdWlsdGluU2NyaXB0cy9pbmRleC50cyIsIndlYnBhY2s6Ly9iaXRtYWtlLy4vc3JjL2NvcmUvQ3VzdG9tU2NyaXB0LnRzIiwid2VicGFjazovL2JpdG1ha2UvLi9zcmMvY29yZS9EZXRlcm1pbmVDb21waWxlci50cyIsIndlYnBhY2s6Ly9iaXRtYWtlLy4vc3JjL2NvcmUvRXhlY1NjcmlwdFRhc2sudHMiLCJ3ZWJwYWNrOi8vYml0bWFrZS8uL3NyYy9jb3JlL0ZpbGVJbnN0YWxsYXRpb25UYXNrLnRzIiwid2VicGFjazovL2JpdG1ha2UvLi9zcmMvY29yZS9GaW5kUHJvZ3JhbS50cyIsIndlYnBhY2s6Ly9iaXRtYWtlLy4vc3JjL2NvcmUvR29hbENvbGxlY3Rpb24udHMiLCJ3ZWJwYWNrOi8vYml0bWFrZS8uL3NyYy9jb3JlL0luc3RhbGxFbnRpdHkudHMiLCJ3ZWJwYWNrOi8vYml0bWFrZS8uL3NyYy9jb3JlL01ha2VJbnRlcmZhY2VzLnRzIiwid2VicGFjazovL2JpdG1ha2UvLi9zcmMvY29yZS9QbHVnaW5Db250ZXh0LnRzIiwid2VicGFjazovL2JpdG1ha2UvLi9zcmMvY29yZS9Qcm9qZWN0Q29udGV4dC50cyIsIndlYnBhY2s6Ly9iaXRtYWtlLy4vc3JjL2NvcmUvU2NvcGUudHMiLCJ3ZWJwYWNrOi8vYml0bWFrZS8uL3NyYy9jb3JlL1NjcmlwdENvbnRleHQudHMiLCJ3ZWJwYWNrOi8vYml0bWFrZS8uL3NyYy9jb3JlL1NpbXBsZU9iamVjdC50cyIsIndlYnBhY2s6Ly9iaXRtYWtlLy4vc3JjL2NvcmUvU291cmNlRmlsZS50cyIsIndlYnBhY2s6Ly9iaXRtYWtlLy4vc3JjL2NvcmUvU3Bhd25TeW5jVGFzay50cyIsIndlYnBhY2s6Ly9iaXRtYWtlLy4vc3JjL2NvcmUvU3lzdGVtVmFyaWFibGVzLnRzIiwid2VicGFjazovL2JpdG1ha2UvLi9zcmMvY29yZS9UYXJnZXQudHMiLCJ3ZWJwYWNrOi8vYml0bWFrZS8uL3NyYy9jb3JlL1RhcmdldENvbGxlY3Rpb24udHMiLCJ3ZWJwYWNrOi8vYml0bWFrZS8uL3NyYy9jb3JlL1RhcmdldEZpbGUudHMiLCJ3ZWJwYWNrOi8vYml0bWFrZS8uL3NyYy9jb3JlL1RhcmdldEhlbHBlci50cyIsIndlYnBhY2s6Ly9iaXRtYWtlLy4vc3JjL2NvcmUvVGFyZ2V0SW5jbHVkZXMudHMiLCJ3ZWJwYWNrOi8vYml0bWFrZS8uL3NyYy9jb3JlL1RhcmdldE5hbWUudHMiLCJ3ZWJwYWNrOi8vYml0bWFrZS8uL3NyYy9jb3JlL1RhcmdldE9iamVjdHMudHMiLCJ3ZWJwYWNrOi8vYml0bWFrZS8uL3NyYy9jb3JlL1Rvb2xjaGFpbkNvbnRleHQudHMiLCJ3ZWJwYWNrOi8vYml0bWFrZS8uL3NyYy9jb3JlL1R5cGVzLnRzIiwid2VicGFjazovL2JpdG1ha2UvLi9zcmMvY29yZS9Vc2VyTWFrZUNvbnRleHQudHMiLCJ3ZWJwYWNrOi8vYml0bWFrZS8uL3NyYy9jb3JlL1VzZXJTb3VyY2VGaWxlcy50cyIsIndlYnBhY2s6Ly9iaXRtYWtlLy4vc3JjL2NvcmUvVXNlclRhcmdldFN0cnVjdC50cyIsIndlYnBhY2s6Ly9iaXRtYWtlLy4vc3JjL2N4eC9pbmRleC50cyIsIndlYnBhY2s6Ly9iaXRtYWtlLy4vc3JjL2xvZ2dlci9pbmRleC50cyIsIndlYnBhY2s6Ly9iaXRtYWtlLy4vc3JjL3NlcnZlci9Kc29uUnBjRGlzcGF0Y2hlci50cyIsIndlYnBhY2s6Ly9iaXRtYWtlLy4vc3JjL3NlcnZlci9Kc29uUnBjUmVxdWVzdFN5bmMudHMiLCJ3ZWJwYWNrOi8vYml0bWFrZS8uL3NyYy9zZXJ2ZXIvTWFrZUNsaWVudC50cyIsIndlYnBhY2s6Ly9iaXRtYWtlLy4vc3JjL3NlcnZlci9NYWtlQ29udGV4dFByb3ZpZGVyLnRzIiwid2VicGFjazovL2JpdG1ha2UvLi9zcmMvc2VydmVyL01ha2VTZXJ2ZXIudHMiLCJ3ZWJwYWNrOi8vYml0bWFrZS8uL3NyYy9zZXJ2ZXIvTWVtb3J5VHJhbnNwb3J0LnRzIiwid2VicGFjazovL2JpdG1ha2UvLi9zcmMvc2VydmVyL01lc3NhZ2VQb3J0U2VuZGVyLnRzIiwid2VicGFjazovL2JpdG1ha2UvLi9zcmMvc2VydmVyL1JlbW90ZU1ha2VDb250ZXh0LnRzIiwid2VicGFjazovL2JpdG1ha2UvLi9zcmMvc2VydmVyL1JlbW90ZU1ldGhvZHMudHMiLCJ3ZWJwYWNrOi8vYml0bWFrZS8uL3NyYy9zZXJ2ZXIvVHJhbnNwb3J0LnRzIiwid2VicGFjazovL2JpdG1ha2UvLi9zcmMvc2VydmVyL1dvcmtlck1lc3NhZ2VEaXNwYXRjaGVyLnRzIiwid2VicGFjazovL2JpdG1ha2UvLi9zcmMvc2VydmVyL1dvcmtlclNlcnZpY2VQcm92aWRlci50cyIsIndlYnBhY2s6Ly9iaXRtYWtlLy4vc3JjL3V0aWxzL0FyZ3MudHMiLCJ3ZWJwYWNrOi8vYml0bWFrZS8uL3NyYy91dGlscy9DaGlsZFByb2Nlc3MudHMiLCJ3ZWJwYWNrOi8vYml0bWFrZS8uL3NyYy91dGlscy9GaWxlU3lzdGVtLnRzIiwid2VicGFjazovL2JpdG1ha2UvLi9zcmMvdXRpbHMvSG9zdC50cyIsIndlYnBhY2s6Ly9iaXRtYWtlLy4vc3JjL3V0aWxzL0h0dHBSZXF1ZXN0LnRzIiwid2VicGFjazovL2JpdG1ha2UvLi9zcmMvdXRpbHMvSW1wb3J0TW9kdWxlLm1qcyIsIndlYnBhY2s6Ly9iaXRtYWtlLy4vc3JjL3V0aWxzL0pTVmFsdWUudHMiLCJ3ZWJwYWNrOi8vYml0bWFrZS8uL3NyYy91dGlscy9Mb2NhdG9yLnRzIiwid2VicGFjazovL2JpdG1ha2UvLi9zcmMvdXRpbHMvTWFrZVBhdGNoLnRzIiwid2VicGFjazovL2JpdG1ha2UvLi9zcmMvdXRpbHMvTW9kdWxlLnRzIiwid2VicGFjazovL2JpdG1ha2UvLi9zcmMvdXRpbHMvUGF0aC50cyIsIndlYnBhY2s6Ly9iaXRtYWtlLy4vc3JjL3V0aWxzL1ByaW1pdGl2ZXMudHMiLCJ3ZWJwYWNrOi8vYml0bWFrZS8uL3NyYy91dGlscy9SYW5kb20udHMiLCJ3ZWJwYWNrOi8vYml0bWFrZS8uL3NyYy91dGlscy9TZXR0aW5nc1N0b3JhZ2UudHMiLCJ3ZWJwYWNrOi8vYml0bWFrZS8uL3NyYy91dGlscy9TdHJpY3RUeXBlLnRzIiwid2VicGFjazovL2JpdG1ha2UvLi9zcmMvdXRpbHMvVXJsU2NoZW1lLnRzIiwid2VicGFjazovL2JpdG1ha2UvZXh0ZXJuYWwgbm9kZS1jb21tb25qcyBcImh0dHBcIiIsIndlYnBhY2s6Ly9iaXRtYWtlL2V4dGVybmFsIG5vZGUtY29tbW9uanMgXCJodHRwc1wiIiwid2VicGFjazovL2JpdG1ha2UvZXh0ZXJuYWwgbm9kZS1jb21tb25qcyBcIm5vZGU6Y2hpbGRfcHJvY2Vzc1wiIiwid2VicGFjazovL2JpdG1ha2UvZXh0ZXJuYWwgbm9kZS1jb21tb25qcyBcIm5vZGU6ZnNcIiIsIndlYnBhY2s6Ly9iaXRtYWtlL2V4dGVybmFsIG5vZGUtY29tbW9uanMgXCJub2RlOm9zXCIiLCJ3ZWJwYWNrOi8vYml0bWFrZS9leHRlcm5hbCBub2RlLWNvbW1vbmpzIFwibm9kZTpwYXRoXCIiLCJ3ZWJwYWNrOi8vYml0bWFrZS9leHRlcm5hbCBub2RlLWNvbW1vbmpzIFwibm9kZTp1cmxcIiIsIndlYnBhY2s6Ly9iaXRtYWtlL2V4dGVybmFsIG5vZGUtY29tbW9uanMgXCJub2RlOnV0aWxcIiIsIndlYnBhY2s6Ly9iaXRtYWtlL2V4dGVybmFsIG5vZGUtY29tbW9uanMgXCJub2RlOndvcmtlcl90aHJlYWRzXCIiLCJ3ZWJwYWNrOi8vYml0bWFrZS93ZWJwYWNrL2Jvb3RzdHJhcCIsIndlYnBhY2s6Ly9iaXRtYWtlL3dlYnBhY2svcnVudGltZS9jb21wYXQgZ2V0IGRlZmF1bHQgZXhwb3J0Iiwid2VicGFjazovL2JpdG1ha2Uvd2VicGFjay9ydW50aW1lL2RlZmluZSBwcm9wZXJ0eSBnZXR0ZXJzIiwid2VicGFjazovL2JpdG1ha2Uvd2VicGFjay9ydW50aW1lL2hhc093blByb3BlcnR5IHNob3J0aGFuZCIsIndlYnBhY2s6Ly9iaXRtYWtlL3dlYnBhY2svcnVudGltZS9tYWtlIG5hbWVzcGFjZSBvYmplY3QiLCJ3ZWJwYWNrOi8vYml0bWFrZS8uL3NyYy9pbmRleC50cyJdLCJzb3VyY2VzQ29udGVudCI6WyIoZnVuY3Rpb24gd2VicGFja1VuaXZlcnNhbE1vZHVsZURlZmluaXRpb24ocm9vdCwgZmFjdG9yeSkge1xuXHRpZih0eXBlb2YgZXhwb3J0cyA9PT0gJ29iamVjdCcgJiYgdHlwZW9mIG1vZHVsZSA9PT0gJ29iamVjdCcpXG5cdFx0bW9kdWxlLmV4cG9ydHMgPSBmYWN0b3J5KCk7XG5cdGVsc2UgaWYodHlwZW9mIGRlZmluZSA9PT0gJ2Z1bmN0aW9uJyAmJiBkZWZpbmUuYW1kKVxuXHRcdGRlZmluZShbXSwgZmFjdG9yeSk7XG5cdGVsc2UgaWYodHlwZW9mIGV4cG9ydHMgPT09ICdvYmplY3QnKVxuXHRcdGV4cG9ydHNbXCJiaXRtYWtlXCJdID0gZmFjdG9yeSgpO1xuXHRlbHNlXG5cdFx0cm9vdFtcImJpdG1ha2VcIl0gPSBmYWN0b3J5KCk7XG59KShnbG9iYWwsICgpID0+IHtcbnJldHVybiAiLCIvKlxuICogTUlUIExpY2Vuc2VcbiAqXG4gKiBDb3B5cmlnaHQgKGMpIDIwMjUgIFl1cmlpIFlha3ViaW4gKHl1cmlpLnlha3ViaW5AZ21haWwuY29tKVxuICpcbiAqIFBlcm1pc3Npb24gaXMgZ3JhbnRlZCB0byB1c2UsIGNvcHksIG1vZGlmeSwgYW5kIGRpc3RyaWJ1dGUgdGhpcyBzb2Z0d2FyZVxuICogdW5kZXIgdGhlIE1JVCBMaWNlbnNlLiBTZWUgTElDRU5TRSBmaWxlIGZvciBkZXRhaWxzLlxuICovXG5cbmV4cG9ydCBjb25zdCBVU0VSX0NPTkZJRyA9IFwiYml0bWFrZS5jb25maWcubWpzXCI7XG5leHBvcnQgY29uc3QgUkVRVUVTVF9BVFRFTVBUUyA9IDMwO1xuZXhwb3J0IGNvbnN0IEJVSUxEX1NFVFRJTkdTX0ZJTEUgPSBcIkJ1aWxkU2V0dGluZ3MuanNvblwiO1xuZXhwb3J0IGNvbnN0IEFMTF9UQVJHRVQgPSBcImFsbFwiO1xuZXhwb3J0IGNvbnN0IElOU1RBTExfVEFSR0VUID0gXCJpbnN0YWxsXCI7XG5leHBvcnQgY29uc3QgUEFDS0FHRV9KU09OID0gXCJwYWNrYWdlLmpzb25cIjtcbmV4cG9ydCBjb25zdCBNQUtFX0NBQ0hFID0gXCJNYWtlQ2FjaGUuanNvblwiO1xuZXhwb3J0IGNvbnN0IFNZU1RFTV9WQVJJQUJMRV9HUk9VUCA9IFwic3lzdGVtXCI7XG5leHBvcnQgY29uc3QgQ1VTVE9NX1ZBUklBQkxFX0dST1VQID0gXCJjdXN0b21cIjtcbiIsIi8qXG4gKiBNSVQgTGljZW5zZVxuICpcbiAqIENvcHlyaWdodCAoYykgMjAyNSAgWXVyaWkgWWFrdWJpbiAoeXVyaWkueWFrdWJpbkBnbWFpbC5jb20pXG4gKlxuICogUGVybWlzc2lvbiBpcyBncmFudGVkIHRvIHVzZSwgY29weSwgbW9kaWZ5LCBhbmQgZGlzdHJpYnV0ZSB0aGlzIHNvZnR3YXJlXG4gKiB1bmRlciB0aGUgTUlUIExpY2Vuc2UuIFNlZSBMSUNFTlNFIGZpbGUgZm9yIGRldGFpbHMuXG4gKi9cblxuaW1wb3J0IGZzIGZyb20gXCJub2RlOmZzXCI7XG5cbmltcG9ydCB7IFBhdGggfSBmcm9tIFwiQC91dGlscy9QYXRoXCI7XG5pbXBvcnQgeyBNYWtlU2VydmVyIH0gZnJvbSBcIkAvc2VydmVyL01ha2VTZXJ2ZXJcIjtcbmltcG9ydCB7IFBsdWdpbkNvbnRleHQgfSBmcm9tIFwiQC9jb3JlL1BsdWdpbkNvbnRleHRcIjtcbmltcG9ydCB7IFNjb3BlSGVscGVyIH0gZnJvbSBcIkAvY29yZS9TY29wZVwiO1xuaW1wb3J0IHsgVG9vbGNoYWluQ29udGV4dCB9IGZyb20gXCJAL2NvcmUvVG9vbGNoYWluQ29udGV4dFwiO1xuaW1wb3J0IHsgZ2V0UGF0aFN0cmluZywgc2F2ZUFzSlNPTiB9ICBmcm9tIFwiQC91dGlscy9GaWxlU3lzdGVtXCI7XG5pbXBvcnQgeyBMb2NhdG9yIH0gZnJvbSBcIkAvdXRpbHMvTG9jYXRvclwiO1xuaW1wb3J0IHsgaW1wb3J0TW9kdWxlIH0gIGZyb20gXCJAL3V0aWxzL01vZHVsZVwiO1xuaW1wb3J0IHsgZGV0ZXJtaW5lQ29tcGlsZXIgfSAgZnJvbSBcIkAvY29yZS9EZXRlcm1pbmVDb21waWxlclwiO1xuaW1wb3J0IHsgU2V0dGluZ3NTdG9yYWdlIH0gZnJvbSBcIkAvdXRpbHMvU2V0dGluZ3NTdG9yYWdlXCI7XG5pbXBvcnQgeyBJTVBPUlRfU0NIRU1FIH0gZnJvbSBcIkAvdXRpbHMvVXJsU2NoZW1lXCI7XG5pbXBvcnQgeyBJTlNUQUxMX1RBUkdFVCwgUEFDS0FHRV9KU09OLCBNQUtFX0NBQ0hFIH0gZnJvbSBcIkAvQ29uc3RhbnRzXCI7XG5pbXBvcnQgeyBTWVNURU1fVkFSSUFCTEVfR1JPVVAgfSBmcm9tIFwiQC9Db25zdGFudHNcIjtcbmltcG9ydCB7IHJlcXVpcmVSZXNvbHZlIH0gZnJvbSBcIkAvdXRpbHMvTW9kdWxlXCI7XG5pbXBvcnQgeyBTeXN0ZW1TY29wZSB9IGZyb20gXCJAL2NvcmUvU3lzdGVtU2NvcGVcIjtcbmltcG9ydCBTeXN0ZW1WYXJpYWJsZXMgZnJvbSBcIkAvY29yZS9TeXN0ZW1WYXJpYWJsZXNcIjtcbmltcG9ydCB7IExvZ2dlciB9IGZyb20gXCJAL2xvZ2dlclwiO1xuXG5jb25zdCBsb2dnZXIgPSBMb2dnZXIuY3JlYXRlKGltcG9ydC5tZXRhLnVybCk7XG5cbmV4cG9ydCBkZWZhdWx0IGFzeW5jIGZ1bmN0aW9uKGNvbmZpZzogYW55LCBlbnZpcm9ubWVudDogYW55LCBzZXR0aW5nczogU2V0dGluZ3NTdG9yYWdlKSB7XG4gIHByb2Nlc3MuZW52ID0gZW52aXJvbm1lbnQ7XG5cbiAgY29uc3Qgc2VydmVyID0gbmV3IE1ha2VTZXJ2ZXI7XG5cbiAgY29uc3QgdmFyaWFibGVNYXAgPSBzZXJ2ZXIucm9vdFZhcmlhYmxlTWFwO1xuICBTY29wZUhlbHBlci5leHRlbmRWYXJpYWJsZU1hcEJ5VmFsdWVzKHZhcmlhYmxlTWFwLCBcIlwiLCBjb25maWcudmFyaWFibGVzKTtcbiAgU2NvcGVIZWxwZXIuZGVmaW5lVmFyaWFibGVzSW5WYXJpYWJsZU1hcCh2YXJpYWJsZU1hcCwgU1lTVEVNX1ZBUklBQkxFX0dST1VQLCBTeXN0ZW1WYXJpYWJsZXMpO1xuICBjb25zdCBzY29wZSA9IFNjb3BlSGVscGVyLmNyZWF0ZVByb3h5KHZhcmlhYmxlTWFwKSBhcyBTeXN0ZW1TY29wZTtcblxuICBjb25zdCBzb3VyY2VEaXIgPSBnZXRQYXRoU3RyaW5nKGNvbmZpZy5zb3VyY2VEaXIpO1xuICBjb25zdCBiaW5hcnlEaXIgPSBnZXRQYXRoU3RyaW5nKGNvbmZpZy5iaW5hcnlEaXIpO1xuXG4gIHNjb3BlLlBST0pFQ1RfU09VUkNFX0RJUiA9IExvY2F0b3IuY3JlYXRlKHNvdXJjZURpcik7XG4gIHNjb3BlLlBST0pFQ1RfQklOQVJZX0RJUiA9IExvY2F0b3IuY3JlYXRlKGJpbmFyeURpcik7XG5cbiAgc2NvcGUuUEFDS0FHRV9GSUxFID0gc2NvcGUuUFJPSkVDVF9TT1VSQ0VfRElSLmpvaW4oUEFDS0FHRV9KU09OKTtcbiAgc2NvcGUuQ0FDSEVfRklMRSA9IHNjb3BlLlBST0pFQ1RfQklOQVJZX0RJUi5qb2luKE1BS0VfQ0FDSEUpO1xuICBzY29wZS5TT1VSQ0VfRElSID0gc2NvcGUuUFJPSkVDVF9TT1VSQ0VfRElSO1xuICBzY29wZS5CSU5BUllfRElSID0gc2NvcGUuUFJPSkVDVF9CSU5BUllfRElSO1xuXG4gIGNvbnN0IHBhY2thZ2VKc29uID0gYXdhaXQgZnMucHJvbWlzZXMucmVhZEZpbGUoc2NvcGUuUEFDS0FHRV9GSUxFLnRvU3RyaW5nKCksIFwidXRmOFwiKTtcbiAgY29uc3QgcGtnID0gSlNPTi5wYXJzZShwYWNrYWdlSnNvbik7XG5cbiAgc2NvcGUuQlVJTERfVFlQRSA9IGNvbmZpZy5idWlsZFR5cGU7XG4gIHNjb3BlLlBST0pFQ1RfTkFNRSA9IHBrZy5uYW1lO1xuICBzY29wZS5QUk9KRUNUX1ZFUlNJT04gPSBwa2cudmVyc2lvbjtcbiAgc2NvcGUuUFJPSkVDVF9ERVNDUklQVElPTiA9IHBrZy5kZXNjcmlwdGlvbiB8fCBcIlwiO1xuICBzY29wZS5QUk9KRUNUX0hPTUVQQUdFX1VSTCA9IHBrZy5ob21lcGFnZSB8fCBcIlwiO1xuXG4gIGlmIChjb25maWcuZGVzdERpcilcbiAgICBzY29wZS5ERVNURElSID0gY29uZmlnLmRlc3REaXI7XG5cbiAgZm9yIChjb25zdCBwbHVnaW4gb2YgKHNjb3BlLk1BS0VfUExVR0lOX0xJU1QgfHwgW10pKSB7XG4gICAgY29uc3QgY3dkU2F2ZSA9IHByb2Nlc3MuY3dkKCk7XG5cbiAgICBzY29wZS5TQ1JJUFRfRklMRSA9IExvY2F0b3IuY3JlYXRlKHBsdWdpbik7XG4gICAgc2NvcGUuU0NSSVBUX0RJUiA9IHNjb3BlLlNDUklQVF9GSUxFLmRpcm5hbWUoKTtcbiAgICBzY29wZS5TT1VSQ0VfRElSID0gc2NvcGUuU0NSSVBUX0RJUjtcblxuICAgIGNvbnN0IGJpbmFyeURpcjEgPSBzY29wZS5QUk9KRUNUX0JJTkFSWV9ESVIucmVsYXRpdmUoc291cmNlRGlyKTtcbiAgICBjb25zdCBiaW5hcnlEaXIyID0gc2NvcGUuUFJPSkVDVF9TT1VSQ0VfRElSLnJlbGF0aXZlKHNvdXJjZURpcik7XG4gICAgY29uc3QgYmluYXJ5RGlyID0gKGJpbmFyeURpcjIubGVuZ3RoIDwgYmluYXJ5RGlyMS5sZW5ndGggPyBiaW5hcnlEaXIyIDogYmluYXJ5RGlyMSkucmVwbGFjZShcIi4uL1wiLCBcIl9fL1wiKTtcbiAgICBzY29wZS5CSU5BUllfRElSID0gc2NvcGUuUFJPSkVDVF9CSU5BUllfRElSLmpvaW4oXCJNYWtlUGx1Z2luQmluYXJpZXNcIiwgYmluYXJ5RGlyKTtcblxuICAgIHByb2Nlc3MuY2hkaXIoc2NvcGUuU09VUkNFX0RJUi50b1BhdGgoKSk7XG4gICAgY29uc3QgcGx1Z2luVXJsID0gc2NvcGUuU0NSSVBUX0ZJTEUudG9VUkxTdHJpbmcoKTtcbiAgICBjb25zdCBtb2R1bGUgPSBhd2FpdCBpbXBvcnRNb2R1bGUocGx1Z2luVXJsKTtcbiAgICBcbiAgICBpZiAoIW1vZHVsZS5kZWZhdWx0KVxuICAgICAgdGhyb3cgbmV3IEVycm9yKGBQbHVnaW4gJHtzY29wZS5TQ1JJUFRfRklMRS5iYXNlbmFtZSgpfSBub3QgY29udGFpbiBkZWZhdWx0IGV4cG9ydGApO1xuXG4gICAgY29uc3QgbWsgPSBQbHVnaW5Db250ZXh0LmNyZWF0ZShzZXJ2ZXIucHJvamVjdCwgdmFyaWFibGVNYXApO1xuICAgIGlmICh0eXBlb2YgbW9kdWxlLmRlZmF1bHQgIT09IFwiZnVuY3Rpb25cIilcbiAgICAgIHRocm93IG5ldyBFcnJvcihgUGx1Z2luICR7c2NvcGUuU0NSSVBUX0ZJTEUuYmFzZW5hbWUoKX0gZXhwb3J0IGhhcyBubyBmdW5jdGlvbiBvciBjbGFzc2ApO1xuICAgIGxldCByZXN1bHQ6IGFueTtcbiAgICBpZiAoL15jbGFzc1xccy8udGVzdChGdW5jdGlvbi5wcm90b3R5cGUudG9TdHJpbmcuY2FsbChtb2R1bGUuZGVmYXVsdCkpKSB7XG4gICAgICBpZiAodHlwZW9mIG1vZHVsZS5kZWZhdWx0LnByb3RvdHlwZS5hcHBseSAhPT0gXCJmdW5jdGlvblwiKVxuICAgICAgICB0aHJvdyBuZXcgRXJyb3IoYFBsdWdpbiBjbGFzcyBvZiAke3Njb3BlLlNDUklQVF9GSUxFLmJhc2VuYW1lKCl9IGhhcyBubyBhcHBseSBtZXRob2RgKTtcbiAgICAgIHJlc3VsdCA9IChuZXcgbW9kdWxlLmRlZmF1bHQpLmFwcGx5KG1rKTtcbiAgICB9XG4gICAgZWxzZSB7XG4gICAgICByZXN1bHQgPSBtb2R1bGUuZGVmYXVsdChtayk7XG4gICAgfVxuXG4gICAgaWYgKHJlc3VsdCBpbnN0YW5jZW9mIFByb21pc2UpXG4gICAgICBhd2FpdCByZXN1bHQ7XG5cbiAgICBwcm9jZXNzLmNoZGlyKGN3ZFNhdmUpO1xuICB9XG5cbiAgaWYgKHNjb3BlLlRPT0xDSEFJTl9GSUxFKSB7XG4gICAgY29uc3QgdG9vbGNoYWluVXJsID0gc2NvcGUuVE9PTENIQUlOX0ZJTEUudG9VUkxTdHJpbmcoKTtcbiAgICBjb25zdCB0b29sY2hhaW4gPSBhd2FpdCBpbXBvcnRNb2R1bGUodG9vbGNoYWluVXJsKTtcbiAgICBpZiAoIXRvb2xjaGFpbi5kZWZhdWx0KVxuICAgICAgdGhyb3cgbmV3IEVycm9yKFwiVG9vbGNoYWluIG1vZHVsZSBoYXMgbm8gZGVmYXVsdCBleHBvcnRcIik7XG4gICAgY29uc3QgbWsgPSBUb29sY2hhaW5Db250ZXh0LmNyZWF0ZShzZXJ2ZXIucHJvamVjdCwgdmFyaWFibGVNYXApO1xuICAgIGNvbnN0IHJlc3VsdCA9IHRvb2xjaGFpbi5kZWZhdWx0KG1rKTtcbiAgICBpZiAocmVzdWx0IGluc3RhbmNlb2YgUHJvbWlzZSlcbiAgICAgIGF3YWl0IHJlc3VsdDtcbiAgfVxuICBlbHNlIHtcbiAgICBhd2FpdCBkZXRlcm1pbmVDb21waWxlcihzY29wZSk7XG4gIH1cblxuICBpZiAoY29uZmlnLnNvdXJjZVVybCAmJiBjb25maWcuc291cmNlVXJsLnN0YXJ0c1dpdGgoSU1QT1JUX1NDSEVNRSkpIHtcbiAgICBjb25zdCBzY3JpcHRGaWxlID0gcmVxdWlyZVJlc29sdmUoY29uZmlnLnNvdXJjZVVybC5zbGljZShJTVBPUlRfU0NIRU1FLmxlbmd0aCkpO1xuICAgIHNjb3BlLlNDUklQVF9GSUxFID0gTG9jYXRvci5jcmVhdGUoc2NyaXB0RmlsZSk7XG4gICAgc2NvcGUuU0NSSVBUX0RJUiA9IHNjb3BlLlNDUklQVF9GSUxFLmRpcm5hbWUoKTtcbiAgfVxuXG4gIHNlcnZlci5hZGRFdmVudExpc3RlbmVyKFwiY29uZmlndXJlXCIsIGFzeW5jIChldmVudCkgPT4ge1xuICAgIGxvZ2dlci5pbmZvKFwiQ29uZmlndXJpbmcgZG9uZVwiKTtcblxuICAgIGlmIChzY29wZS5HTE9CQUxfQ09OVEVYVF9KU09OKSB7XG4gICAgICBhd2FpdCBzYXZlQXNKU09OKHNjb3BlLkdMT0JBTF9DT05URVhUX0pTT04udG9QYXRoKCksIHNlcnZlci5wcm9qZWN0LCB7IHByZXR0eTogdHJ1ZSB9KTtcbiAgICB9XG5cbiAgICBjb25zdCBhbGxHb2FsTGlzdCA9IHNlcnZlci5wcm9qZWN0LmNyZWF0ZUdvYWxzKHNjb3BlKTtcbiAgICBjb25zdCBnb2FsTGlzdCA9IGFsbEdvYWxMaXN0LmdldFRhcmdldExpc3QoSU5TVEFMTF9UQVJHRVQpO1xuXG4gICAgaWYgKHNjb3BlLlRBUkdFVF9HT0FMU19KU09OKSB7XG4gICAgICBhd2FpdCBzYXZlQXNKU09OKHNjb3BlLlRBUkdFVF9HT0FMU19KU09OLnRvUGF0aCgpLCBnb2FsTGlzdCwgeyBwcmV0dHk6IHRydWUgfSk7XG4gICAgfVxuXG4gICAgbGV0IGxvYWRlZCA9IDA7XG4gICAgY29uc3QgdG90YWwgPSBnb2FsTGlzdC5sZW5ndGg7XG4gICAgZm9yIChjb25zdCBpdGVyIG9mIGdvYWxMaXN0KSB7XG4gICAgICBpZiAoaXRlci5vdXRwdXQpIHtcbiAgICAgICAgY29uc3Qgb3V0cHV0RGlyID0gUGF0aC5kaXJuYW1lKGl0ZXIub3V0cHV0KTtcbiAgICAgICAgYXdhaXQgZnMucHJvbWlzZXMubWtkaXIob3V0cHV0RGlyLCB7IHJlY3Vyc2l2ZTogdHJ1ZSB9KTtcbiAgICAgIH1cbiAgICAgIGlmIChpdGVyLm1lc3NhZ2UpIHtcbiAgICAgICAgY29uc3QgcmVsYXRpb25PZkxlbmd0aCA9IE1hdGgucm91bmQoKChsb2FkZWQgKyAxKSAvIHRvdGFsKSAqIDEwMCk7XG4gICAgICAgIGNvbnN0IHBlcmNlbnQgPSBcIltcIiArIHJlbGF0aW9uT2ZMZW5ndGgudG9TdHJpbmcoKS5wYWRTdGFydCgzLCBcIiBcIikgKyBcIiVdIFwiO1xuICAgICAgICBsb2dnZXIubm90aWNlKHBlcmNlbnQgKyBpdGVyLm1lc3NhZ2UpO1xuICAgICAgfVxuICAgICAgYXdhaXQgaXRlci5kb1dvcmsoKTtcbiAgICAgIGxvYWRlZCsrO1xuICAgIH1cbiAgfSk7XG5cbiAgbGV0IGZpbmlzaFJlc29sdmU6ICgpID0+IHZvaWQ7XG4gIGNvbnN0IHJlc3VsdCA9IG5ldyBQcm9taXNlPHZvaWQ+KChyZXNvbHZlKSA9PiB7XG4gICAgZmluaXNoUmVzb2x2ZSA9IHJlc29sdmU7XG4gIH0pO1xuXG4gIHNlcnZlci5hZGRFdmVudExpc3RlbmVyKFwiYnVpbGRcIiwgKGV2ZW50KSA9PiBmaW5pc2hSZXNvbHZlKCkpO1xuXG4gIHNlcnZlci5zdGFydCgpO1xuXG4gIHJldHVybiByZXN1bHQ7XG59XG4iLCIvKlxuICogTUlUIExpY2Vuc2VcbiAqXG4gKiBDb3B5cmlnaHQgKGMpIDIwMjUgIFl1cmlpIFlha3ViaW4gKHl1cmlpLnlha3ViaW5AZ21haWwuY29tKVxuICpcbiAqIFBlcm1pc3Npb24gaXMgZ3JhbnRlZCB0byB1c2UsIGNvcHksIG1vZGlmeSwgYW5kIGRpc3RyaWJ1dGUgdGhpcyBzb2Z0d2FyZVxuICogdW5kZXIgdGhlIE1JVCBMaWNlbnNlLiBTZWUgTElDRU5TRSBmaWxlIGZvciBkZXRhaWxzLlxuICovXG5cbmltcG9ydCB7IENNYWtlUHJvY2VzcywgREVGQVVMVF9HRU5FUkFUT1IgfSBmcm9tIFwiQC9jbWFrZVwiO1xuaW1wb3J0IHsgZ2V0UGF0aFN0cmluZyB9ICBmcm9tIFwiQC91dGlscy9GaWxlU3lzdGVtXCI7XG5pbXBvcnQgeyBTZXR0aW5nc1N0b3JhZ2UgfSBmcm9tIFwiQC91dGlscy9TZXR0aW5nc1N0b3JhZ2VcIjtcblxuZXhwb3J0IGRlZmF1bHQgYXN5bmMgZnVuY3Rpb24oY29uZmlnOiBhbnksIGVudmlyb25tZW50OiBhbnksIHNldHRpbmdzOiBTZXR0aW5nc1N0b3JhZ2UpIHtcbiAgY29uc3Qgc291cmNlRGlyID0gZ2V0UGF0aFN0cmluZyhjb25maWcuc291cmNlRGlyKTtcbiAgY29uc3QgYmluYXJ5RGlyID0gZ2V0UGF0aFN0cmluZyhjb25maWcuYmluYXJ5RGlyKTtcbiAgY29uc3QgY21ha2VBcmdzID0ge1xuICAgIGVudmlyb25tZW50OiB7XG4gICAgICAuLi5lbnZpcm9ubWVudCxcbiAgICAgIERFU1RESVI6IGNvbmZpZy5kZXN0RGlyLFxuICAgIH0sXG4gICAgZ2VuZXJhdG9yOiBjb25maWcuZ2VuZXJhdG9yIHx8IERFRkFVTFRfR0VORVJBVE9SLFxuICAgIGNhY2hlVmFyaWFibGVzOiBjb25maWcuY2FjaGVWYXJpYWJsZXMgfHwge30sXG4gICAgc291cmNlRGlyLFxuICAgIGJpbmFyeURpcixcbiAgfTtcblxuICBpZiAoIWNtYWtlQXJncy5jYWNoZVZhcmlhYmxlcy5DTUFLRV9CVUlMRF9UWVBFKSB7XG4gICAgY21ha2VBcmdzLmNhY2hlVmFyaWFibGVzLkNNQUtFX0JVSUxEX1RZUEUgPSBjb25maWcuYnVpbGRUeXBlO1xuICB9XG5cbiAgY29uc3QgY21ha2UgPSBDTWFrZVByb2Nlc3MuZ2V0SW5zdGFuY2UoKTtcbiAgYXdhaXQgY21ha2UuY29uZmlndXJlKGNtYWtlQXJncyk7XG4gIGF3YWl0IGNtYWtlLmJ1aWxkKGNtYWtlQXJncyk7XG4gIGF3YWl0IGNtYWtlLmluc3RhbGwoY21ha2VBcmdzKTtcbn1cbiIsIi8qXG4gKiBNSVQgTGljZW5zZVxuICpcbiAqIENvcHlyaWdodCAoYykgMjAyNSAgWXVyaWkgWWFrdWJpbiAoeXVyaWkueWFrdWJpbkBnbWFpbC5jb20pXG4gKlxuICogUGVybWlzc2lvbiBpcyBncmFudGVkIHRvIHVzZSwgY29weSwgbW9kaWZ5LCBhbmQgZGlzdHJpYnV0ZSB0aGlzIHNvZnR3YXJlXG4gKiB1bmRlciB0aGUgTUlUIExpY2Vuc2UuIFNlZSBMSUNFTlNFIGZpbGUgZm9yIGRldGFpbHMuXG4gKi9cblxuaW1wb3J0IHBhdGggZnJvbSBcIm5vZGU6cGF0aFwiO1xuXG5pbXBvcnQgeyBlbnN1cmVCb29sZWFuIH0gZnJvbSBcIkAvdXRpbHMvU3RyaWN0VHlwZVwiO1xuaW1wb3J0IHsgZ2V0UGF0aFN0cmluZyB9IGZyb20gXCJAL3V0aWxzL0ZpbGVTeXN0ZW1cIjtcbmltcG9ydCB7IFNldHRpbmdzU3RvcmFnZSB9IGZyb20gXCJAL3V0aWxzL1NldHRpbmdzU3RvcmFnZVwiO1xuaW1wb3J0IHsgc3Bhd25Bc3luYyB9IGZyb20gXCJAL3V0aWxzL0NoaWxkUHJvY2Vzc1wiO1xuXG5leHBvcnQgZGVmYXVsdCBhc3luYyBmdW5jdGlvbihjb25maWc6IGFueSwgZW52aXJvbm1lbnQ6IGFueSwgc2V0dGluZ3M6IFNldHRpbmdzU3RvcmFnZSkge1xuICBjb25zdCBzb3VyY2VEaXIgPSBnZXRQYXRoU3RyaW5nKGNvbmZpZy5zb3VyY2VEaXIpO1xuICBjb25zdCBiaW5hcnlEaXIgPSBnZXRQYXRoU3RyaW5nKGNvbmZpZy5iaW5hcnlEaXIpO1xuICBsZXQgc3RlcCA9IGF3YWl0IHNldHRpbmdzLmdldChcImNvbmZpZ3VyZVwiKSB8fCBcImNvbmZpZ1wiO1xuICBpZiAoc3RlcCA9PT0gXCJjb25maWdcIikge1xuICAgIGNvbnN0IGNvbW1hbmQgPSBwYXRoLnJlc29sdmUoc291cmNlRGlyLCBcImNvbmZpZ3VyZVwiKTtcbiAgICBjb25zdCBwYXJhbXMgPSBbXTtcbiAgICBpZiAoQXJyYXkuaXNBcnJheShjb25maWcudmFyaWFibGVzKSkge1xuICAgICAgZm9yIChjb25zdCBpdGVyIG9mIGNvbmZpZy52YXJpYWJsZXMpXG4gICAgICAgIHBhcmFtcy5wdXNoKGl0ZXIpO1xuICAgIH1cbiAgICBlbHNlIGlmIChjb25maWcudmFyaWFibGVzKSB7XG4gICAgICBmb3IgKGNvbnN0IFtrZXksdmFsXSBvZiBPYmplY3QuZW50cmllcyhjb25maWcudmFyaWFibGVzKSkge1xuICAgICAgICBpZiAoa2V5ID09PSBcImZlYXR1cmVzXCIgJiYgQXJyYXkuaXNBcnJheSh2YWwpKSB7XG4gICAgICAgICAgZm9yIChjb25zdCBpdGVyIG9mIHZhbClcbiAgICAgICAgICAgIHBhcmFtcy5wdXNoKGAtLSR7aXRlcn1gKTtcbiAgICAgICAgfVxuICAgICAgICBlbHNlIGlmICh2YWwgPT09IG51bGwpXG4gICAgICAgICAgcGFyYW1zLnB1c2goYC0tJHtrZXl9YCk7XG4gICAgICAgIGVsc2VcbiAgICAgICAgICBwYXJhbXMucHVzaChgLS0ke2tleX09JHt2YWx9YCk7XG4gICAgICB9XG4gICAgfVxuICAgIGlmIChjb25maWcuZmVhdHVyZXMpIHtcbiAgICAgIGZvciAoY29uc3Qga2V5IG9mIGNvbmZpZy5mZWF0dXJlcylcbiAgICAgICAgcGFyYW1zLnB1c2goYC0tJHtrZXl9YCk7XG4gICAgfVxuICAgIGNvbnN0IHJlczEgPSBhd2FpdCBzcGF3bkFzeW5jKGNvbW1hbmQsIHBhcmFtcywge1xuICAgICAgY3dkOiBiaW5hcnlEaXIsXG4gICAgICBlbnY6IGVudmlyb25tZW50LFxuICAgICAgZXh0cmE6IHtcbiAgICAgICAgb3V0cHV0OiBgYWMtY29uZmlndXJlLSR7c3RlcH0ubG9nYCxcbiAgICAgIH0sXG4gICAgfSk7XG4gICAgaWYgKHJlczEuc3RhdHVzICE9PSAwKSB7XG4gICAgICB0aHJvdyBuZXcgRXJyb3IoYGNvbmZpZ3VyZSByZXR1cm5lZCBzdGF0dXMgJHtyZXMxLnN0YXR1c31gKTtcbiAgICB9XG4gICAgc3RlcCA9IFwibWFrZVwiO1xuICAgIGF3YWl0IHNldHRpbmdzLnNldChcImNvbmZpZ3VyZVwiLCBzdGVwKTtcbiAgfVxuICBpZiAoc3RlcCA9PT0gXCJtYWtlXCIpIHtcbiAgICBsZXQgcnVuTWFrZSA9IGZhbHNlO1xuICAgIGlmIChPYmplY3QuaGFzT3duKGNvbmZpZywgXCJydW5NYWtlXCIpKVxuICAgICAgcnVuTWFrZSA9IGVuc3VyZUJvb2xlYW4oY29uZmlnLnJ1bk1ha2UpO1xuICAgIGlmIChydW5NYWtlKSB7XG4gICAgICBjb25zdCByZXMyID0gYXdhaXQgc3Bhd25Bc3luYyhcIm1ha2VcIiwgW10sIHtcbiAgICAgICAgY3dkOiBiaW5hcnlEaXIsXG4gICAgICAgIGVudjogZW52aXJvbm1lbnQsXG4gICAgICAgIGV4dHJhOiB7XG4gICAgICAgICAgb3V0cHV0OiBgYWMtY29uZmlndXJlLSR7c3RlcH0ubG9nYCxcbiAgICAgICAgfSxcbiAgICAgIH0pO1xuICAgICAgaWYgKHJlczIuc3RhdHVzICE9PSAwKSB7XG4gICAgICAgIHRocm93IG5ldyBFcnJvcihgbWFrZSByZXR1cm5lZCBzdGF0dXMgJHtyZXMyLnN0YXR1c31gKTtcbiAgICAgIH1cbiAgICB9XG4gICAgc3RlcCA9IFwiaW5zdGFsbFwiO1xuICAgIGF3YWl0IHNldHRpbmdzLnNldChcImNvbmZpZ3VyZVwiLCBzdGVwKTtcbiAgfVxuICBpZiAoc3RlcCA9PT0gXCJpbnN0YWxsXCIpIHtcbiAgICBsZXQgcnVuTWFrZUluc3RhbGwgPSB0cnVlO1xuICAgIGlmIChPYmplY3QuaGFzT3duKGNvbmZpZywgXCJydW5NYWtlSW5zdGFsbFwiKSlcbiAgICAgIHJ1bk1ha2VJbnN0YWxsID0gZW5zdXJlQm9vbGVhbihjb25maWcucnVuTWFrZUluc3RhbGwpO1xuICAgIGlmIChydW5NYWtlSW5zdGFsbCkge1xuICAgICAgY29uc3QgYXJncyA9IFsgXCJpbnN0YWxsXCIgXTtcbiAgICAgIGlmIChjb25maWcuZGVzdERpcikge1xuICAgICAgICBhcmdzLnB1c2goYERFU1RESVI9JHtjb25maWcuZGVzdERpcn1gKTtcbiAgICAgIH1cbiAgICAgIGNvbnN0IHJlczIgPSBhd2FpdCBzcGF3bkFzeW5jKFwibWFrZVwiLCBhcmdzLCB7XG4gICAgICAgIGN3ZDogYmluYXJ5RGlyLFxuICAgICAgICBlbnY6IGVudmlyb25tZW50LFxuICAgICAgICBleHRyYToge1xuICAgICAgICAgIG91dHB1dDogYGFjLWNvbmZpZ3VyZS0ke3N0ZXB9LmxvZ2AsXG4gICAgICAgIH0sXG4gICAgICB9KTtcbiAgICAgIGlmIChyZXMyLnN0YXR1cyAhPT0gMCkge1xuICAgICAgICB0aHJvdyBuZXcgRXJyb3IoYG1ha2UgcmV0dXJuZWQgc3RhdHVzICR7cmVzMi5zdGF0dXN9YCk7XG4gICAgICB9XG4gICAgfVxuICAgIHN0ZXAgPSBcImRvbmVcIjtcbiAgICBhd2FpdCBzZXR0aW5ncy5zZXQoXCJjb25maWd1cmVcIiwgc3RlcCk7XG4gIH1cbn1cbiIsIi8qXG4gKiBNSVQgTGljZW5zZVxuICpcbiAqIENvcHlyaWdodCAoYykgMjAyNSAgWXVyaWkgWWFrdWJpbiAoeXVyaWkueWFrdWJpbkBnbWFpbC5jb20pXG4gKlxuICogUGVybWlzc2lvbiBpcyBncmFudGVkIHRvIHVzZSwgY29weSwgbW9kaWZ5LCBhbmQgZGlzdHJpYnV0ZSB0aGlzIHNvZnR3YXJlXG4gKiB1bmRlciB0aGUgTUlUIExpY2Vuc2UuIFNlZSBMSUNFTlNFIGZpbGUgZm9yIGRldGFpbHMuXG4gKi9cblxuaW1wb3J0IHsgU2V0dGluZ3NTdG9yYWdlIH0gZnJvbSBcIkAvdXRpbHMvU2V0dGluZ3NTdG9yYWdlXCI7XG5cbmltcG9ydCBub25lIGZyb20gXCJAL2FjdGlvbnMvbm9uZVwiO1xuaW1wb3J0IHByb2Nlc3MgZnJvbSBcIkAvYWN0aW9ucy9wcm9jZXNzXCI7XG5pbXBvcnQgY29uZmlndXJlIGZyb20gXCJAL2FjdGlvbnMvY29uZmlndXJlXCI7XG5pbXBvcnQgbWFrZSBmcm9tIFwiQC9hY3Rpb25zL21ha2VcIjtcbmltcG9ydCBjbWFrZSBmcm9tIFwiQC9hY3Rpb25zL2NtYWtlXCI7XG5pbXBvcnQgYml0bWFrZSBmcm9tIFwiQC9hY3Rpb25zL2JpdG1ha2VcIjtcblxuaW50ZXJmYWNlIEFjdGlvbkhhbmRsZXJzIHtcbiAgW25hbWU6IHN0cmluZ106IChjb25maWc6IGFueSwgZW52aXJvbm1lbnQ6IGFueSwgc2V0dGluZ3M6IFNldHRpbmdzU3RvcmFnZSkgPT4gUHJvbWlzZTx2b2lkPjtcbn1cblxuZXhwb3J0IGRlZmF1bHQgPEFjdGlvbkhhbmRsZXJzPiB7XG4gIG5vbmUsXG4gIHByb2Nlc3MsXG4gIGNvbmZpZ3VyZSxcbiAgbWFrZSxcbiAgY21ha2UsXG4gIGJpdG1ha2UsXG59O1xuIiwiLypcbiAqIE1JVCBMaWNlbnNlXG4gKlxuICogQ29weXJpZ2h0IChjKSAyMDI1ICBZdXJpaSBZYWt1YmluICh5dXJpaS55YWt1YmluQGdtYWlsLmNvbSlcbiAqXG4gKiBQZXJtaXNzaW9uIGlzIGdyYW50ZWQgdG8gdXNlLCBjb3B5LCBtb2RpZnksIGFuZCBkaXN0cmlidXRlIHRoaXMgc29mdHdhcmVcbiAqIHVuZGVyIHRoZSBNSVQgTGljZW5zZS4gU2VlIExJQ0VOU0UgZmlsZSBmb3IgZGV0YWlscy5cbiAqL1xuXG5pbXBvcnQgeyBzcGF3bkFzeW5jIH0gZnJvbSBcIkAvdXRpbHMvQ2hpbGRQcm9jZXNzXCI7XG5pbXBvcnQgeyBnZXRQYXRoU3RyaW5nIH0gIGZyb20gXCJAL3V0aWxzL0ZpbGVTeXN0ZW1cIjtcbmltcG9ydCB7IFNldHRpbmdzU3RvcmFnZSB9IGZyb20gXCJAL3V0aWxzL1NldHRpbmdzU3RvcmFnZVwiO1xuXG5leHBvcnQgZGVmYXVsdCBhc3luYyBmdW5jdGlvbihjb25maWc6IGFueSwgZW52aXJvbm1lbnQ6IGFueSwgc2V0dGluZ3M6IFNldHRpbmdzU3RvcmFnZSkge1xuICBjb25zdCBiaW5hcnlEaXIgPSBnZXRQYXRoU3RyaW5nKGNvbmZpZy5iaW5hcnlEaXIpO1xuICBjb25zdCBhcmdzID0gY29uZmlnLmFyZ3MgfHwgW107XG4gIGlmIChjb25maWcuZGVzdERpcikge1xuICAgIGFyZ3MucHVzaChgREVTVERJUj0ke2NvbmZpZy5kZXN0RGlyfWApO1xuICB9XG4gIGNvbnN0IHJlczIgPSBhd2FpdCBzcGF3bkFzeW5jKFwibWFrZVwiLCBhcmdzLCB7XG4gICAgY3dkOiBiaW5hcnlEaXIsXG4gICAgZW52OiBlbnZpcm9ubWVudCxcbiAgICBleHRyYToge1xuICAgICAgb3V0cHV0OiBgbWFrZS5sb2dgLFxuICAgIH0sXG4gIH0pO1xuICBpZiAocmVzMi5zdGF0dXMgIT09IDApIHtcbiAgICB0aHJvdyBuZXcgRXJyb3IoYG1ha2UgcmV0dXJuZWQgc3RhdHVzICR7cmVzMi5zdGF0dXN9YCk7XG4gIH1cbn1cbiIsIi8qXG4gKiBNSVQgTGljZW5zZVxuICpcbiAqIENvcHlyaWdodCAoYykgMjAyNSAgWXVyaWkgWWFrdWJpbiAoeXVyaWkueWFrdWJpbkBnbWFpbC5jb20pXG4gKlxuICogUGVybWlzc2lvbiBpcyBncmFudGVkIHRvIHVzZSwgY29weSwgbW9kaWZ5LCBhbmQgZGlzdHJpYnV0ZSB0aGlzIHNvZnR3YXJlXG4gKiB1bmRlciB0aGUgTUlUIExpY2Vuc2UuIFNlZSBMSUNFTlNFIGZpbGUgZm9yIGRldGFpbHMuXG4gKi9cblxuXG5pbXBvcnQgeyBTZXR0aW5nc1N0b3JhZ2UgfSBmcm9tIFwiQC91dGlscy9TZXR0aW5nc1N0b3JhZ2VcIjtcbmltcG9ydCB7IExvZ2dlciB9IGZyb20gXCJAL2xvZ2dlclwiO1xuXG5jb25zdCBsb2dnZXIgPSBMb2dnZXIuY3JlYXRlKGltcG9ydC5tZXRhLnVybCk7XG5cbmV4cG9ydCBkZWZhdWx0IGFzeW5jIGZ1bmN0aW9uKGNvbmZpZzogYW55LCBlbnZpcm9ubWVudDogYW55LCBzZXR0aW5nczogU2V0dGluZ3NTdG9yYWdlKSB7XG4gIC8qIGRvIG5vdGhpbmcgKi9cbn1cbiIsIi8qXG4gKiBNSVQgTGljZW5zZVxuICpcbiAqIENvcHlyaWdodCAoYykgMjAyNSAgWXVyaWkgWWFrdWJpbiAoeXVyaWkueWFrdWJpbkBnbWFpbC5jb20pXG4gKlxuICogUGVybWlzc2lvbiBpcyBncmFudGVkIHRvIHVzZSwgY29weSwgbW9kaWZ5LCBhbmQgZGlzdHJpYnV0ZSB0aGlzIHNvZnR3YXJlXG4gKiB1bmRlciB0aGUgTUlUIExpY2Vuc2UuIFNlZSBMSUNFTlNFIGZpbGUgZm9yIGRldGFpbHMuXG4gKi9cblxuXG5pbXBvcnQgcGF0aCBmcm9tIFwibm9kZTpwYXRoXCI7XG5cbmltcG9ydCB7IGdldFBhdGhTdHJpbmcgfSBmcm9tIFwiQC91dGlscy9GaWxlU3lzdGVtXCI7XG5pbXBvcnQgeyBTZXR0aW5nc1N0b3JhZ2UgfSBmcm9tIFwiQC91dGlscy9TZXR0aW5nc1N0b3JhZ2VcIjtcbmltcG9ydCB7IHNwYXduQXN5bmMgfSBmcm9tIFwiQC91dGlscy9DaGlsZFByb2Nlc3NcIjtcbmltcG9ydCB7IExvZ2dlciB9IGZyb20gXCJAL2xvZ2dlclwiO1xuXG5jb25zdCBsb2dnZXIgPSBMb2dnZXIuY3JlYXRlKGltcG9ydC5tZXRhLnVybCk7XG5cbmV4cG9ydCBkZWZhdWx0IGFzeW5jIGZ1bmN0aW9uKGNvbmZpZzogYW55LCBlbnZpcm9ubWVudDogYW55LCBzZXR0aW5nczogU2V0dGluZ3NTdG9yYWdlKSB7XG4gIGlmICghY29uZmlnLmNvbW1hbmQpXG4gICAgdGhyb3cgbmV3IEVycm9yKFwiUmVxdWlyZWQgY29tbWFuZCBmaWVsZCBmb3IgcHJvY2VzcyBhY3Rpb25cIik7XG4gIGNvbnN0IHNvdXJjZURpciA9IGdldFBhdGhTdHJpbmcoY29uZmlnLnNvdXJjZURpcik7XG4gIGNvbnN0IGJpbmFyeURpciA9IGdldFBhdGhTdHJpbmcoY29uZmlnLmJpbmFyeURpcik7XG4gIGxldCB7IGNvbW1hbmQgfSA9IGNvbmZpZztcbiAgaWYgKCFwYXRoLmlzQWJzb2x1dGUoY29tbWFuZCkgJiYgKGNvbW1hbmQuaW5jbHVkZXMocGF0aC5wb3NpeC5kZWxpbWl0ZXIpIHx8IGNvbW1hbmQuaW5jbHVkZXMocGF0aC53aW4zMi5kZWxpbWl0ZXIpKSkge1xuICAgIGNvbW1hbmQgPSBwYXRoLnJlc29sdmUoc291cmNlRGlyLCBjb21tYW5kKTtcbiAgfVxuICBjb25zdCByZXMgPSBhd2FpdCBzcGF3bkFzeW5jKGNvbW1hbmQsIGNvbmZpZy5hcmdzIHx8IFtdLCB7XG4gICAgY3dkOiBiaW5hcnlEaXIsXG4gICAgZW52OiBlbnZpcm9ubWVudCxcbiAgICBleHRyYToge1xuICAgICAgb3V0cHV0OiBgcHJvY2Vzcy5sb2dgLFxuICAgIH0sXG4gIH0pO1xuICBpZiAocmVzLnN0YXR1cyAhPT0gMCkge1xuICAgIHRocm93IG5ldyBFcnJvcihgcHJvY2VzcyByZXR1cm5lZCBzdGF0dXMgJHtyZXMuc3RhdHVzfWApO1xuICB9XG59XG4iLCIvKlxuICogTUlUIExpY2Vuc2VcbiAqXG4gKiBDb3B5cmlnaHQgKGMpIDIwMjUgIFl1cmlpIFlha3ViaW4gKHl1cmlpLnlha3ViaW5AZ21haWwuY29tKVxuICpcbiAqIFBlcm1pc3Npb24gaXMgZ3JhbnRlZCB0byB1c2UsIGNvcHksIG1vZGlmeSwgYW5kIGRpc3RyaWJ1dGUgdGhpcyBzb2Z0d2FyZVxuICogdW5kZXIgdGhlIE1JVCBMaWNlbnNlLiBTZWUgTElDRU5TRSBmaWxlIGZvciBkZXRhaWxzLlxuICovXG5cbmltcG9ydCB7IGlzRW50cnlQb2ludCB9IGZyb20gXCJAL3V0aWxzL01vZHVsZVwiO1xuaW1wb3J0IHsgaXNNYWluVGhyZWFkLCBwYXJlbnRQb3J0LCB3b3JrZXJEYXRhLCB0aHJlYWRJZCB9IGZyb20gXCJub2RlOndvcmtlcl90aHJlYWRzXCI7XG5pbXBvcnQgeyBBcmdzIH0gIGZyb20gXCJAL3V0aWxzL0FyZ3NcIjtcbmltcG9ydCBjb21tYW5kcyBmcm9tIFwiQC9jb21tYW5kc1wiO1xuaW1wb3J0IHsgTG9nZ2VyIH0gZnJvbSBcIkAvbG9nZ2VyXCI7XG5pbXBvcnQgeyBydW5TY3JpcHRJbml0IH0gZnJvbSBcIkAvYXBwL1J1blNjcmlwdEluaXRcIjtcbmltcG9ydCB7IE1lc3NhZ2VQb3J0U2VuZGVyIH0gZnJvbSBcIkAvc2VydmVyL01lc3NhZ2VQb3J0U2VuZGVyXCI7XG5pbXBvcnQgeyBXb3JrZXJNZXNzYWdlRGlzcGF0Y2hlciB9IGZyb20gXCJAL3NlcnZlci9Xb3JrZXJNZXNzYWdlRGlzcGF0Y2hlclwiO1xuXG5jb25zdCBsb2dnZXIgPSBMb2dnZXIuY3JlYXRlKGltcG9ydC5tZXRhLnVybCk7XG5cbmV4cG9ydCBhc3luYyBmdW5jdGlvbiBydW5NYWluU2NyaXB0KCkge1xuICBsb2dnZXIuaW5mbyhcIk1haW4gdGhyZWFkIHN0YXJ0ZWRcIilcbiAgY29uc3Qgb3B0aW9uczogYW55ID0ge1xuICAgIGhhbmRsZXI6IFwiZGVmYXVsdFwiLFxuICAgIHdvcmtEaXI6IHByb2Nlc3MuY3dkKCksXG4gICAgZW52OiB7fSxcbiAgfTtcblxuICBsZXQgbm9kZUV4ZWN1dGFibGU6IHN0cmluZyB8IHVuZGVmaW5lZDtcbiAgaWYgKHByb2Nlc3MuYXJndi5sZW5ndGggPiAwKVxuICAgIG5vZGVFeGVjdXRhYmxlID0gcHJvY2Vzcy5hcmd2WzBdO1xuXG4gIGxldCBjdXJyZW50U2NyaXB0OiBzdHJpbmcgfCB1bmRlZmluZWQ7XG4gIGlmIChwcm9jZXNzLmFyZ3YubGVuZ3RoID4gMSlcbiAgICBjdXJyZW50U2NyaXB0ID0gcHJvY2Vzcy5hcmd2WzFdO1xuXG4gIGxldCBhcmdzSW5kZXggPSBwcm9jZXNzLmFyZ3YubGVuZ3RoO1xuICBpZiAocHJvY2Vzcy5hcmd2Lmxlbmd0aCA+IDIpIHtcbiAgICBhcmdzSW5kZXggPSAyO1xuICAgIGNvbnN0IGhhbmRsZXIgPSBwcm9jZXNzLmFyZ3ZbYXJnc0luZGV4XTtcbiAgICBpZiAoIWhhbmRsZXIuc3RhcnRzV2l0aChcIi0tXCIpKSB7XG4gICAgICBvcHRpb25zLmhhbmRsZXIgPSBoYW5kbGVyO1xuICAgICAgYXJnc0luZGV4Kys7XG4gICAgfVxuICB9XG5cbiAgb3B0aW9ucy5lbnYgPSBBcmdzLnRvT2JqZWN0KHByb2Nlc3MuYXJndi5zbGljZShhcmdzSW5kZXgpKTtcblxuICBjb25zdCBoYW5kbGVyID0gY29tbWFuZHNbb3B0aW9ucy5oYW5kbGVyXTtcbiAgaWYgKCFoYW5kbGVyKVxuICAgIHRocm93IEVycm9yKGBUaGUgJHtQUk9KRUNUX05BTUV9IGRvZXMgbm90IHN1cHBvcnQgdGhlICR7b3B0aW9ucy5oYW5kbGVyfSBjb21tYW5kYCk7XG5cbiAgY29uc3QgcmVzID0gaGFuZGxlcihvcHRpb25zKTtcbiAgaWYgKHJlcyBpbnN0YW5jZW9mIFByb21pc2UpIHtcbiAgICBhd2FpdCByZXM7XG4gIH1cbn1cblxuZXhwb3J0IGFzeW5jIGZ1bmN0aW9uIHJ1bldvcmtlclNjcmlwdCgpIHtcbiAgbG9nZ2VyLmRlYnVnKGBXb3JrZXIgdGhyZWFkICMke3RocmVhZElkfSBzdGFydGVkYCwgd29ya2VyRGF0YSk7XG5cbiAgaWYgKCFwYXJlbnRQb3J0KSB7XG4gICAgdGhyb3cgbmV3IEVycm9yKGBXb3JrZXIgbm90IHN1cHBvcnRlZCBwYXJlbnRQb3J0YCk7XG4gIH1cblxuICBjb25zdCBzZW5kZXIgPSBuZXcgTWVzc2FnZVBvcnRTZW5kZXIocGFyZW50UG9ydCk7XG4gIGNvbnN0IGRpc3BhdGNoZXIgPSBuZXcgV29ya2VyTWVzc2FnZURpc3BhdGNoZXIoXCJ3XCIgKyB0aHJlYWRJZCwgc2VuZGVyKTtcbiAgcGFyZW50UG9ydC5vbihcIm1lc3NhZ2VcIiwgKG1lc3NhZ2UpID0+IHtcbiAgICBkaXNwYXRjaGVyLnByZXJmb3JtTWVzc2FnZShtZXNzYWdlKS50aGVuKGRhdGEgPT4gc2VuZGVyLnNlbmRNZXNzYWdlKGRhdGEpKTtcbiAgfSk7XG59XG5cbmV4cG9ydCBmdW5jdGlvbiBydW5TY3JpcHQoKSB7XG4gIGlmICghaXNFbnRyeVBvaW50KCkpXG4gICAgcmV0dXJuO1xuXG4gIHJ1blNjcmlwdEluaXQoKTtcblxuICBpZiAoIWlzTWFpblRocmVhZCkge1xuICAgIHJ1bldvcmtlclNjcmlwdCgpO1xuICAgIHJldHVybjtcbiAgfVxuXG4gIHJ1bk1haW5TY3JpcHQoKS50aGVuKCgpID0+IHByb2Nlc3MuZXhpdCgwKSkuY2F0Y2goKGUpID0+IHtcbiAgICBpZiAoZSBpbnN0YW5jZW9mIEVycm9yKVxuICAgICAgbG9nZ2VyLmZhdGFsKGUuc3RhY2spO1xuICAgIGVsc2VcbiAgICAgIGxvZ2dlci5mYXRhbChlKTtcbiAgICBwcm9jZXNzLmV4aXQoMSk7XG4gIH0pO1xufVxuIiwiLypcbiAqIE1JVCBMaWNlbnNlXG4gKlxuICogQ29weXJpZ2h0IChjKSAyMDI1ICBZdXJpaSBZYWt1YmluICh5dXJpaS55YWt1YmluQGdtYWlsLmNvbSlcbiAqXG4gKiBQZXJtaXNzaW9uIGlzIGdyYW50ZWQgdG8gdXNlLCBjb3B5LCBtb2RpZnksIGFuZCBkaXN0cmlidXRlIHRoaXMgc29mdHdhcmVcbiAqIHVuZGVyIHRoZSBNSVQgTGljZW5zZS4gU2VlIExJQ0VOU0UgZmlsZSBmb3IgZGV0YWlscy5cbiAqL1xuXG5pbXBvcnQgeyBDdXN0b21TY3JpcHQsIFBvc3RDdXN0b21TY3JpcHQgfSBmcm9tIFwiQC9jb3JlL0N1c3RvbVNjcmlwdFwiO1xuaW1wb3J0IHsgRmlsZUluc3RhbGxhdGlvblRhc2sgfSBmcm9tIFwiQC9jb3JlL0ZpbGVJbnN0YWxsYXRpb25UYXNrXCI7XG5pbXBvcnQgeyBTcGF3blN5bmNUYXNrIH0gZnJvbSBcIkAvY29yZS9TcGF3blN5bmNUYXNrXCI7XG5pbXBvcnQgeyBUYXJnZXRGaWxlIH0gZnJvbSBcIkAvY29yZS9UYXJnZXRGaWxlXCI7XG5pbXBvcnQgeyBJbnN0YWxsRW50aXR5IH0gZnJvbSBcIkAvY29yZS9JbnN0YWxsRW50aXR5XCI7XG5pbXBvcnQgeyBUYXJnZXRJbmNsdWRlcyB9IGZyb20gXCJAL2NvcmUvVGFyZ2V0SW5jbHVkZXNcIjtcbmltcG9ydCB7IFRhcmdldE9iamVjdHMgfSBmcm9tIFwiQC9jb3JlL1RhcmdldE9iamVjdHNcIjtcbmltcG9ydCB7IFRhcmdldE5hbWUgfSBmcm9tIFwiQC9jb3JlL1RhcmdldE5hbWVcIjtcbmltcG9ydCB7IFNvdXJjZUZpbGUgfSBmcm9tIFwiQC9jb3JlL1NvdXJjZUZpbGVcIjtcbmltcG9ydCB7IERpclBhdGgsIEZpbGVQYXRoIH0gZnJvbSBcIkAvdXRpbHMvTG9jYXRvclwiO1xuaW1wb3J0IHsgUG9zdFRhcmdldCwgT2JqZWN0TGlicmFyeSwgU3RhdGljTGlicmFyeSwgU2hhcmVkTGlicmFyeSwgRXhlY3V0YWJsZSB9IGZyb20gXCJAL2NvcmUvVGFyZ2V0XCI7XG5cbmltcG9ydCB7IFNpbXBsZU9iamVjdCB9IGZyb20gXCJAL2NvcmUvU2ltcGxlT2JqZWN0XCI7XG5cbmV4cG9ydCBmdW5jdGlvbiBydW5TY3JpcHRJbml0KCkgeyBcbiAgU2ltcGxlT2JqZWN0LnJlZ2lzdGVyUGFyc2VyKFBvc3RDdXN0b21TY3JpcHQubmFtZSwgUG9zdEN1c3RvbVNjcmlwdC5mcm9tSlNPTik7XG4gIFNpbXBsZU9iamVjdC5yZWdpc3RlclBhcnNlcihDdXN0b21TY3JpcHQubmFtZSwgQ3VzdG9tU2NyaXB0LmZyb21KU09OKTtcbiAgU2ltcGxlT2JqZWN0LnJlZ2lzdGVyUGFyc2VyKEZpbGVJbnN0YWxsYXRpb25UYXNrLm5hbWUsIEZpbGVJbnN0YWxsYXRpb25UYXNrLmZyb21KU09OKTtcbiAgU2ltcGxlT2JqZWN0LnJlZ2lzdGVyUGFyc2VyKFNwYXduU3luY1Rhc2submFtZSwgU3Bhd25TeW5jVGFzay5mcm9tSlNPTik7XG4gIFNpbXBsZU9iamVjdC5yZWdpc3RlclBhcnNlcihUYXJnZXRGaWxlLm5hbWUsIFRhcmdldEZpbGUuZnJvbUpTT04pO1xuICBTaW1wbGVPYmplY3QucmVnaXN0ZXJQYXJzZXIoSW5zdGFsbEVudGl0eS5uYW1lLCBJbnN0YWxsRW50aXR5LmZyb21KU09OKTtcbiAgU2ltcGxlT2JqZWN0LnJlZ2lzdGVyUGFyc2VyKFRhcmdldEluY2x1ZGVzLm5hbWUsIFRhcmdldEluY2x1ZGVzLmZyb21KU09OKTtcbiAgU2ltcGxlT2JqZWN0LnJlZ2lzdGVyUGFyc2VyKFRhcmdldE9iamVjdHMubmFtZSwgVGFyZ2V0T2JqZWN0cy5mcm9tSlNPTik7XG4gIFNpbXBsZU9iamVjdC5yZWdpc3RlclBhcnNlcihUYXJnZXROYW1lLm5hbWUsIFRhcmdldE5hbWUuZnJvbUpTT04pO1xuICBTaW1wbGVPYmplY3QucmVnaXN0ZXJQYXJzZXIoU291cmNlRmlsZS5uYW1lLCBTb3VyY2VGaWxlLmZyb21KU09OKTtcbiAgU2ltcGxlT2JqZWN0LnJlZ2lzdGVyUGFyc2VyKERpclBhdGgubmFtZSwgRGlyUGF0aC5mcm9tSlNPTik7XG4gIFNpbXBsZU9iamVjdC5yZWdpc3RlclBhcnNlcihGaWxlUGF0aC5uYW1lLCBGaWxlUGF0aC5mcm9tSlNPTik7XG4gIFNpbXBsZU9iamVjdC5yZWdpc3RlclBhcnNlcihQb3N0VGFyZ2V0Lm5hbWUsIFBvc3RUYXJnZXQuZnJvbUpTT04pO1xuICBTaW1wbGVPYmplY3QucmVnaXN0ZXJQYXJzZXIoT2JqZWN0TGlicmFyeS5uYW1lLCBPYmplY3RMaWJyYXJ5LmZyb21KU09OKTtcbiAgU2ltcGxlT2JqZWN0LnJlZ2lzdGVyUGFyc2VyKFN0YXRpY0xpYnJhcnkubmFtZSwgU3RhdGljTGlicmFyeS5mcm9tSlNPTik7XG4gIFNpbXBsZU9iamVjdC5yZWdpc3RlclBhcnNlcihTaGFyZWRMaWJyYXJ5Lm5hbWUsIFNoYXJlZExpYnJhcnkuZnJvbUpTT04pO1xuICBTaW1wbGVPYmplY3QucmVnaXN0ZXJQYXJzZXIoRXhlY3V0YWJsZS5uYW1lLCBFeGVjdXRhYmxlLmZyb21KU09OKTtcbn1cbiIsIi8qXG4gKiBNSVQgTGljZW5zZVxuICpcbiAqIENvcHlyaWdodCAoYykgMjAyNSAgWXVyaWkgWWFrdWJpbiAoeXVyaWkueWFrdWJpbkBnbWFpbC5jb20pXG4gKlxuICogUGVybWlzc2lvbiBpcyBncmFudGVkIHRvIHVzZSwgY29weSwgbW9kaWZ5LCBhbmQgZGlzdHJpYnV0ZSB0aGlzIHNvZnR3YXJlXG4gKiB1bmRlciB0aGUgTUlUIExpY2Vuc2UuIFNlZSBMSUNFTlNFIGZpbGUgZm9yIGRldGFpbHMuXG4gKi9cblxuaW1wb3J0IHsgZXhlY0ZpbGVBc3luYyB9IGZyb20gXCJAL3V0aWxzL0NoaWxkUHJvY2Vzc1wiO1xuaW1wb3J0IHsgTG9nZ2VyIH0gZnJvbSBcIkAvbG9nZ2VyXCI7XG5cbmNvbnN0IGxvZ2dlciA9IExvZ2dlci5jcmVhdGUoaW1wb3J0Lm1ldGEudXJsKTtcblxuY29uc3QgVkVSU0lPTl9SRUdFWCA9IC9eY2xhbmcgdmVyc2lvbiAoXFxkKy5cXGQuXFxkKykvO1xuXG5leHBvcnQgbmFtZXNwYWNlIGNsYW5nIHtcbmV4cG9ydCBhc3luYyBmdW5jdGlvbiByZWFkVmVyc2lvbihjbGFuZ1BhdGg6IHN0cmluZykge1xuICBjb25zdCB7IHN0ZG91dCB9ID0gYXdhaXQgZXhlY0ZpbGVBc3luYyhjbGFuZ1BhdGgsIFsgXCItLXZlcnNpb25cIiBdKTtcblxuICBjb25zdCBjb250ZW50ID0gc3Rkb3V0LnRvU3RyaW5nKCk7XG4gIGxldCBtYXRjaCA9IGNvbnRlbnQubWF0Y2goVkVSU0lPTl9SRUdFWCk7XG4gIGlmICghbWF0Y2gpXG4gICAgdGhyb3cgbmV3IEVycm9yKFwiVGhlIHBhdHRlcm4gb2YgdGhlIENsYW5nIHZlcnNpb24gaXMgZGlmZmVyZW50XCIpO1xuICBcbiAgcmV0dXJuIG1hdGNoWzFdO1xufVxufSAvLyBuYW1lc3BhY2UgY2xhbmdcbiIsIi8qXG4gKiBNSVQgTGljZW5zZVxuICpcbiAqIENvcHlyaWdodCAoYykgMjAyNSAgWXVyaWkgWWFrdWJpbiAoeXVyaWkueWFrdWJpbkBnbWFpbC5jb20pXG4gKlxuICogUGVybWlzc2lvbiBpcyBncmFudGVkIHRvIHVzZSwgY29weSwgbW9kaWZ5LCBhbmQgZGlzdHJpYnV0ZSB0aGlzIHNvZnR3YXJlXG4gKiB1bmRlciB0aGUgTUlUIExpY2Vuc2UuIFNlZSBMSUNFTlNFIGZpbGUgZm9yIGRldGFpbHMuXG4gKi9cblxuZXhwb3J0IGVudW0gQm9vbGVhblR5cGUge1xuICBPTiA9IFwiT05cIixcbiAgT0ZGID0gXCJPRkZcIixcbn07XG5cbi8vIEVudW0gcmVwcmVzZW50aW5nIHZhbHVlIHR5cGVzIHVzZWQgaW4gQ01ha2UgY2FjaGUgdmFyaWFibGVzXG5leHBvcnQgZW51bSBWYWx1ZVR5cGUge1xuICAvLyBSZXByZXNlbnRzIGEgZnVsbCBwYXRoIHRvIGEgZmlsZVxuICBGSUxFUEFUSCA9IFwiRklMRVBBVEhcIixcblxuICAvLyBSZXByZXNlbnRzIGEgcGF0aCB0byBhIGRpcmVjdG9yeVxuICBQQVRIID0gXCJQQVRIXCIsXG5cbiAgLy8gUmVwcmVzZW50cyBhIGJvb2xlYW4gdmFsdWUgKHRydWUvZmFsc2UpXG4gIEJPT0wgPSBcIkJPT0xcIixcblxuICAvLyBSZXByZXNlbnRzIGEgZ2VuZXJpYyBzdHJpbmcgdmFsdWVcbiAgU1RSSU5HID0gXCJTVFJJTkdcIixcbn07XG5cbi8vIEJ1aWxkVHlwZSByZXByZXNlbnRpbmcgY29tbW9uIENNYWtlIGJ1aWxkIHR5cGVzXG5leHBvcnQgZW51bSBCdWlsZFR5cGUge1xuICAvLyBEZWJ1ZyBidWlsZCB0eXBlOiBpbmNsdWRlcyBkZWJ1ZyBzeW1ib2xzLCBubyBvcHRpbWl6YXRpb25cbiAgRGVidWcgPSBcIkRlYnVnXCIsXG5cbiAgLy8gUmVsZWFzZSBidWlsZCB0eXBlOiBvcHRpbWl6ZWQgY29kZSwgbm8gZGVidWcgaW5mb1xuICBSZWxlYXNlID0gXCJSZWxlYXNlXCIsXG5cbiAgLy8gUmVsZWFzZSB3aXRoIGRlYnVnIGluZm86IG9wdGltaXplZCB3aXRoIGRlYnVnIHN5bWJvbHMgaW5jbHVkZWRcbiAgUmVsV2l0aERlYkluZm8gPSBcIlJlbFdpdGhEZWJJbmZvXCIsXG5cbiAgLy8gTWluaW11bSBzaXplIHJlbGVhc2U6IG9wdGltaXplZCBmb3Igc21hbGxlc3QgYmluYXJ5IHNpemVcbiAgTWluU2l6ZVJlbCA9IFwiTWluU2l6ZVJlbFwiLFxufTtcblxuLy8gVGhlIGRlZmF1bHQgbmFtZSBvZiB0aGUgbWFpbiBDTWFrZSBidWlsZCBjb25maWd1cmF0aW9uIGZpbGVcbmV4cG9ydCBjb25zdCBDTUFLRV9MSVNUU19UWFQgPSBcIkNNYWtlTGlzdHMudHh0XCI7XG5cbmV4cG9ydCBlbnVtIEdlbmVyYXRvclR5cGUge1xuICAvLyBOYW1lIG9mIHRoZSBDTWFrZSBnZW5lcmF0b3IgZm9yIHN0YW5kYXJkIFVuaXggJ21ha2UnIGJ1aWxkIHN5c3RlbVxuICBVbml4TWFrZWZpbGVzID0gXCJVbml4IE1ha2VmaWxlc1wiLFxufTtcblxuLy8gTmFtZSBvZiB0aGUgQ01ha2UgZ2VuZXJhdG9yIGZvciBzdGFuZGFyZCBVbml4ICdtYWtlJyBidWlsZCBzeXN0ZW1cbmV4cG9ydCBjb25zdCBERUZBVUxUX0dFTkVSQVRPUjogR2VuZXJhdG9yVHlwZSA9IEdlbmVyYXRvclR5cGUuVW5peE1ha2VmaWxlcztcbiIsIi8qXG4gKiBNSVQgTGljZW5zZVxuICpcbiAqIENvcHlyaWdodCAoYykgMjAyNSAgWXVyaWkgWWFrdWJpbiAoeXVyaWkueWFrdWJpbkBnbWFpbC5jb20pXG4gKlxuICogUGVybWlzc2lvbiBpcyBncmFudGVkIHRvIHVzZSwgY29weSwgbW9kaWZ5LCBhbmQgZGlzdHJpYnV0ZSB0aGlzIHNvZnR3YXJlXG4gKiB1bmRlciB0aGUgTUlUIExpY2Vuc2UuIFNlZSBMSUNFTlNFIGZpbGUgZm9yIGRldGFpbHMuXG4gKi9cblxuaW1wb3J0IHsgQm9vbGVhblR5cGUgfSBmcm9tIFwiQC9jbWFrZS9Db25zdGFudHNcIjtcblxuZXhwb3J0IGZ1bmN0aW9uIGNvbnZlcnRUb1ZhbHVlKG9iajogYW55KTogc3RyaW5nIHtcbiAgaWYgKEFycmF5LmlzQXJyYXkob2JqKSlcbiAgICByZXR1cm4gb2JqLm1hcChpID0+IGNvbnZlcnRUb1ZhbHVlKGkpKS5qb2luKFwiO1wiKTtcblxuICBpZiAodHlwZW9mIG9iaiA9PT0gXCJib29sZWFuXCIpXG4gICAgcmV0dXJuIG9iaiA/IEJvb2xlYW5UeXBlLk9OIDogQm9vbGVhblR5cGUuT0ZGO1xuXG4gIHJldHVybiBvYmoudG9TdHJpbmcoKTtcbn1cbiIsIi8qXG4gKiBNSVQgTGljZW5zZVxuICpcbiAqIENvcHlyaWdodCAoYykgMjAyNSAgWXVyaWkgWWFrdWJpbiAoeXVyaWkueWFrdWJpbkBnbWFpbC5jb20pXG4gKlxuICogUGVybWlzc2lvbiBpcyBncmFudGVkIHRvIHVzZSwgY29weSwgbW9kaWZ5LCBhbmQgZGlzdHJpYnV0ZSB0aGlzIHNvZnR3YXJlXG4gKiB1bmRlciB0aGUgTUlUIExpY2Vuc2UuIFNlZSBMSUNFTlNFIGZpbGUgZm9yIGRldGFpbHMuXG4gKi9cblxuaW1wb3J0IG9zIGZyb20gXCJub2RlOm9zXCI7XG5pbXBvcnQgZnMgZnJvbSBcIm5vZGU6ZnNcIjtcbmltcG9ydCBwYXRoIGZyb20gXCJub2RlOnBhdGhcIjtcblxuaW1wb3J0IHsgc3Bhd25Bc3luYyB9IGZyb20gXCJAL3V0aWxzL0NoaWxkUHJvY2Vzc1wiO1xuaW1wb3J0IHsgQ01BS0VfTElTVFNfVFhULCBERUZBVUxUX0dFTkVSQVRPUiwgVmFsdWVUeXBlIH0gZnJvbSBcIkAvY21ha2UvQ29uc3RhbnRzXCI7XG5pbXBvcnQgeyBjb252ZXJ0VG9WYWx1ZSB9IGZyb20gXCJAL2NtYWtlL0hlbHBlclwiO1xuaW1wb3J0IHsgSG9zdCB9IGZyb20gXCJAL3V0aWxzL0hvc3RcIjtcblxuZnVuY3Rpb24gdG9WYXJUeXBlKGtleTogc3RyaW5nLCB2YWw6IGFueSkge1xuICBjb25zdCBtYXA6IGFueSA9IHtcbiAgICBDTUFLRV9JTlNUQUxMX1BSRUZJWDogVmFsdWVUeXBlLlBBVEgsXG4gICAgQ01BS0VfVE9PTENIQUlOX0ZJTEU6IFZhbHVlVHlwZS5GSUxFUEFUSCxcbiAgfTtcblxuICBpZiAodHlwZW9mIHZhbCA9PT0gXCJib29sZWFuXCIpXG4gICAgcmV0dXJuIFZhbHVlVHlwZS5CT09MO1xuXG4gIGlmIChtYXAuaGFzT3duUHJvcGVydHkoa2V5KSlcbiAgICByZXR1cm4gbWFwW2tleV07XG5cbiAgcmV0dXJuIFZhbHVlVHlwZS5TVFJJTkc7XG59XG5cbmZ1bmN0aW9uIG1ha2VDbWRWYXJpYWJsZShrZXk6IHN0cmluZywgdmFsOiBhbnksIGlzQ2FjaGU6IGJvb2xlYW4pIHtcbiAgbGV0IG5hbWUgPSBrZXk7XG4gIGlmIChpc0NhY2hlKVxuICAgIG5hbWUgKz0gXCI6XCIgKyB0b1ZhclR5cGUoa2V5LCB2YWwpO1xuICByZXR1cm4gbmFtZSArIFwiPVwiICsgY29udmVydFRvVmFsdWUodmFsKTtcbn1cblxuZnVuY3Rpb24gbWFrZUNtZFZhcmlhYmxlcyh2YXJpYWJsZXM6IG9iamVjdCwgaXNDYWNoZTogYm9vbGVhbik6IHN0cmluZ1tdIHtcbiAgY29uc3QgcmVzdWx0OiBzdHJpbmdbXSA9IFtdO1xuICBmb3IgKGNvbnN0IFtrZXksIHZhbF0gb2YgT2JqZWN0LmVudHJpZXModmFyaWFibGVzKSlcbiAgICByZXN1bHQucHVzaChcIi1EXCIsIG1ha2VDbWRWYXJpYWJsZShrZXksIHZhbCwgaXNDYWNoZSkpO1xuICByZXR1cm4gcmVzdWx0O1xufVxuXG5leHBvcnQgaW50ZXJmYWNlIFNjcmlwdE1vZGVPcHRpb25zIHtcbiAgZW52aXJvbm1lbnQ/OiBvYmplY3Q7XG4gIHdvcmtEaXI/OiBzdHJpbmc7XG59O1xuXG5leHBvcnQgY2xhc3MgQ01ha2VQcm9jZXNzIHtcbiAgcHJpdmF0ZSBfY21ha2VQYXRoOiBzdHJpbmc7XG5cbiAgcHVibGljIGNvbnN0cnVjdG9yKGNtYWtlUGF0aDogc3RyaW5nKSB7XG4gICAgdGhpcy5fY21ha2VQYXRoID0gY21ha2VQYXRoO1xuICB9XG5cbiAgcHVibGljIGFzeW5jIHNjcmlwdE1vZGUoc2NyaXB0RmlsZTogc3RyaW5nLCB2YXJpYWJsZXM6IG9iamVjdCwgb3B0aW9ucz86IFNjcmlwdE1vZGVPcHRpb25zKTogUHJvbWlzZTx2b2lkPiB7XG4gICAgY29uc3Qgc3Bhd25BcmdzID0gW1xuICAgICAgLi4ubWFrZUNtZFZhcmlhYmxlcyh2YXJpYWJsZXMsIGZhbHNlKSxcbiAgICAgIFwiLVBcIiwgc2NyaXB0RmlsZSxcbiAgICBdO1xuICAgIGNvbnN0IHJlczogYW55ID0gYXdhaXQgc3Bhd25Bc3luYyh0aGlzLl9jbWFrZVBhdGgsIHNwYXduQXJncywge1xuICAgICAgY3dkOiBvcHRpb25zPy53b3JrRGlyLFxuICAgICAgZW52OiBvcHRpb25zPy5lbnZpcm9ubWVudCB8fCBwcm9jZXNzLmVudixcbiAgICB9KTtcbiAgICBpZiAocmVzLnN0YXR1cyAhPT0gMCkge1xuICAgICAgdGhyb3cgYGNtYWtlLnNjcmlwdE1vZGUgcmV0dXJuZWQgc3RhdHVzICR7cmVzLnN0YXR1c31gO1xuICAgIH1cbiAgfVxuXG4gIHB1YmxpYyBhc3luYyBjb25maWd1cmUoYXJnczogYW55KTogUHJvbWlzZTx2b2lkPiB7XG4gICAgY29uc3Qgc3Bhd25BcmdzID0gW1xuICAgICAgXCItR1wiLCBhcmdzLmdlbmVyYXRvcixcbiAgICAgIC4uLm1ha2VDbWRWYXJpYWJsZXMoYXJncy5jYWNoZVZhcmlhYmxlcywgdHJ1ZSksXG4gICAgICBcIi1TXCIsIGFyZ3Muc291cmNlRGlyLFxuICAgICAgXCItQlwiLCBhcmdzLmJpbmFyeURpcixcbiAgICBdO1xuICBcbiAgICBjb25zdCByZXM6IGFueSA9IGF3YWl0IHNwYXduQXN5bmModGhpcy5fY21ha2VQYXRoLCBzcGF3bkFyZ3MsIHtcbiAgICAgIGN3ZDogYXJncy5iaW5hcnlEaXIsXG4gICAgICBlbnY6IGFyZ3MuZW52aXJvbm1lbnQgfHwgcHJvY2Vzcy5lbnYsXG4gICAgICBleHRyYToge1xuICAgICAgICBvdXRwdXQ6IGBjbWFrZS5jb25maWd1cmUubG9nYCxcbiAgICAgIH0sXG4gICAgfSk7XG4gICAgaWYgKHJlcy5zdGF0dXMgIT09IDApIHtcbiAgICAgIHRocm93IGBDTWFrZS5jb25maWd1cmUgcmV0dXJuZWQgc3RhdHVzICR7cmVzLnN0YXR1c31gO1xuICAgIH1cbiAgfVxuXG4gIHB1YmxpYyBhc3luYyBidWlsZChhcmdzOiBhbnkpOiBQcm9taXNlPHZvaWQ+IHtcbiAgICBhd2FpdCB0aGlzLmNvbmZpZ3VyZShhcmdzKTtcbiAgXG4gICAgY29uc3Qgc3Bhd25BcmdzOiBzdHJpbmdbXSA9IFtcbiAgICAgICctLWJ1aWxkJywgJy4nLFxuICAgICAgJy0tcGFyYWxsZWwnLCBvcy5hdmFpbGFibGVQYXJhbGxlbGlzbSgpLnRvU3RyaW5nKCksXG4gICAgXTtcbiAgICBjb25zdCByZXM6IGFueSA9IGF3YWl0IHNwYXduQXN5bmModGhpcy5fY21ha2VQYXRoLCBzcGF3bkFyZ3MsIHtcbiAgICAgIGN3ZDogYXJncy5iaW5hcnlEaXIsXG4gICAgICBlbnY6IGFyZ3MuZW52aXJvbm1lbnQgfHwgcHJvY2Vzcy5lbnYsXG4gICAgICBleHRyYToge1xuICAgICAgICBvdXRwdXQ6IGBjbWFrZS5idWlsZC5sb2dgLFxuICAgICAgfSxcbiAgICB9KTtcbiAgICBpZiAocmVzLnN0YXR1cyAhPT0gMCkge1xuICAgICAgdGhyb3cgYENNYWtlLmJ1aWxkIHJldHVybmVkIHN0YXR1cyAke3Jlcy5zdGF0dXN9YDtcbiAgICB9XG4gIH1cblxuICBwdWJsaWMgYXN5bmMgaW5zdGFsbChhcmdzOiBhbnkpOiBQcm9taXNlPHZvaWQ+IHtcbiAgICBhd2FpdCB0aGlzLmNvbmZpZ3VyZShhcmdzKTtcblxuICAgIGNvbnN0IHNwYXduQXJncyA9IFtcbiAgICAgICctLWluc3RhbGwnLFxuICAgICAgJy4nLFxuICAgIF07XG4gICAgaWYgKGFyZ3MuaW5zdGFsbERpcikge1xuICAgICAgc3Bhd25BcmdzLnB1c2goJy0tcHJlZml4JywgYXJncy5pbnN0YWxsRGlyKTtcbiAgICB9XG4gICAgY29uc3QgcmVzOiBhbnkgPSBhd2FpdCBzcGF3bkFzeW5jKHRoaXMuX2NtYWtlUGF0aCwgc3Bhd25BcmdzLCB7XG4gICAgICBjd2Q6IGFyZ3MuYmluYXJ5RGlyLFxuICAgICAgZW52OiBhcmdzLmVudmlyb25tZW50IHx8IHByb2Nlc3MuZW52LFxuICAgICAgZXh0cmE6IHtcbiAgICAgICAgb3V0cHV0OiBgY21ha2UuaW5zdGFsbC5sb2dgLFxuICAgICAgfSxcbiAgICB9KTtcbiAgICBpZiAocmVzLnN0YXR1cyAhPT0gMCkge1xuICAgICAgdGhyb3cgYENNYWtlLmluc3RhbGwgcmV0dXJuZWQgc3RhdHVzICR7cmVzLnN0YXR1c31gO1xuICAgIH1cbiAgfVxuICBcbiAgcHVibGljIGFzeW5jIGV4dHJhY3QoYXJnczogYW55KTogUHJvbWlzZTx2b2lkPiB7XG4gICAgY29uc3Qgc3Bhd25BcmdzID0gWyBcIi1FXCIsIFwidGFyXCIsIFwiLXh2ZlwiLCBhcmdzLmZpbGVuYW1lIF07XG4gICAgY29uc3QgcmVzOiBhbnkgPSBhd2FpdCBzcGF3bkFzeW5jKHRoaXMuX2NtYWtlUGF0aCwgc3Bhd25BcmdzLCB7XG4gICAgICBjd2Q6IGFyZ3Mud29ya0RpciB8fCBhcmdzLnNvdXJjZURpciB8fCBhcmdzLmJpbmFyeURpcixcbiAgICAgIGVudjogYXJncy5lbnZpcm9ubWVudCB8fCBwcm9jZXNzLmVudixcbiAgICAgIGV4dHJhOiB7XG4gICAgICAgIG91dHB1dDogYXJncy5sb2dGaWxlIHx8IGBjbWFrZS5leHRyYWN0LmxvZ2AsXG4gICAgICB9LFxuICAgIH0pO1xuICAgIGlmIChyZXMuc3RhdHVzICE9PSAwKSB7XG4gICAgICB0aHJvdyBgRXh0cmFjdCByZXR1cm5lZCBzdGF0dXMgJHtyZXMuc3RhdHVzfWA7XG4gICAgfVxuICB9XG59O1xuXG5sZXQgX2NtYWtlSW5zdGFuY2U6IENNYWtlUHJvY2VzcztcbmV4cG9ydCBuYW1lc3BhY2UgQ01ha2VQcm9jZXNzIHtcbiAgZXhwb3J0IGZ1bmN0aW9uIGdldEluc3RhbmNlKCk6IENNYWtlUHJvY2VzcyB7XG4gICAgaWYgKCFfY21ha2VJbnN0YW5jZSlcbiAgICAgIF9jbWFrZUluc3RhbmNlID0gbmV3IENNYWtlUHJvY2VzcyhcImNtYWtlXCIgKyBIb3N0LmV4ZWN1dGFibGVTdWZmaXgpO1xuICAgIHJldHVybiBfY21ha2VJbnN0YW5jZTtcbiAgfVxufVxuXG5leHBvcnQgY2xhc3MgQ1Rlc3RQcm9jZXNzIHtcbiAgcHJpdmF0ZSBfY3Rlc3RQYXRoOiBzdHJpbmc7XG5cbiAgcHVibGljIGNvbnN0cnVjdG9yKGN0ZXN0UGF0aDogc3RyaW5nKSB7XG4gICAgdGhpcy5fY3Rlc3RQYXRoID0gY3Rlc3RQYXRoO1xuICB9XG5cbiAgcHVibGljIGFzeW5jIGN0ZXN0KGFyZ3M6IGFueSk6IFByb21pc2U8dm9pZD4ge1xuICAgIGNvbnN0IHNwYXduQXJnczogc3RyaW5nW10gPSBbXTtcbiAgICBjb25zdCByZXM6IGFueSA9IGF3YWl0IHNwYXduQXN5bmModGhpcy5fY3Rlc3RQYXRoLCBzcGF3bkFyZ3MsIHtcbiAgICAgIGN3ZDogYXJncy5iaW5hcnlEaXIsXG4gICAgICBlbnY6IGFyZ3MuZW52aXJvbm1lbnQgfHwgcHJvY2Vzcy5lbnYsXG4gICAgICBleHRyYToge1xuICAgICAgICBvdXRwdXQ6IGBjbWFrZS5jdGVzdC5sb2dgLFxuICAgICAgfSxcbiAgICB9KTtcbiAgICBpZiAocmVzLnN0YXR1cyAhPT0gMCkge1xuICAgICAgdGhyb3cgYENUZXN0IHJldHVybmVkIHN0YXR1cyAke3Jlcy5zdGF0dXN9YDtcbiAgICB9XG4gIH1cbn07XG5cbmxldCBfY3Rlc3RJbnN0YW5jZTogQ1Rlc3RQcm9jZXNzO1xuZXhwb3J0IG5hbWVzcGFjZSBDVGVzdFByb2Nlc3Mge1xuICBleHBvcnQgZnVuY3Rpb24gZ2V0SW5zdGFuY2UoKTogQ1Rlc3RQcm9jZXNzIHtcbiAgICBpZiAoIV9jdGVzdEluc3RhbmNlKVxuICAgICAgX2N0ZXN0SW5zdGFuY2UgPSBuZXcgQ1Rlc3RQcm9jZXNzKFwiY3Rlc3RcIiArIEhvc3QuZXhlY3V0YWJsZVN1ZmZpeCk7XG4gICAgcmV0dXJuIF9jdGVzdEluc3RhbmNlO1xuICB9XG59XG5cbmV4cG9ydCBhc3luYyBmdW5jdGlvbiBnZXRQcm9qZWN0SW5mbyhzb3VyY2U6IHN0cmluZykge1xuICBjb25zdCBzdGF0ID0gYXdhaXQgZnMucHJvbWlzZXMuc3RhdChzb3VyY2UpO1xuICBpZiAoc3RhdC5pc0RpcmVjdG9yeSgpKVxuICAgIHNvdXJjZSA9IHBhdGgucmVzb2x2ZShzb3VyY2UsIENNQUtFX0xJU1RTX1RYVCk7XG4gIGNvbnN0IGNvbnRlbnQgPSBhd2FpdCBmcy5wcm9taXNlcy5yZWFkRmlsZShzb3VyY2UsIHsgZW5jb2Rpbmc6ICd1dGY4JyB9KTtcblxuICBjb25zdCBwcm9qZWN0UGF0dGVybiA9IC9wcm9qZWN0ICpcXCggKihbXiBdKykgKihbXildKilcXCkvO1xuICBjb25zdCB2ZXJzaW9uUGF0dGVybiA9IC9WRVJTSU9OICsoW14gXSspLztcblxuICBjb25zdCByZXN1bHQ6IGFueSA9IHt9O1xuICBsZXQgbWF0Y2ggPSBjb250ZW50Lm1hdGNoKHByb2plY3RQYXR0ZXJuKTtcbiAgaWYgKG1hdGNoKSB7XG4gICAgcmVzdWx0Lm5hbWUgPSBtYXRjaFsxXTtcbiAgICBjb25zdCBwcm9qZWN0Q29udGVudCA9IG1hdGNoWzJdO1xuICAgIG1hdGNoID0gcHJvamVjdENvbnRlbnQubWF0Y2godmVyc2lvblBhdHRlcm4pO1xuICAgIGlmIChtYXRjaClcbiAgICAgIHJlc3VsdC52ZXJzaW9uID0gbWF0Y2hbMV07XG4gIH1cblxuICByZXR1cm4gcmVzdWx0O1xufVxuXG5leHBvcnQgZnVuY3Rpb24gbGluZVRvU2luZ2xDb21tZW50KGxpbmU6IHN0cmluZykge1xuICByZXR1cm4gXCIjIFwiICsgbGluZTtcbn1cblxuZXhwb3J0IGZ1bmN0aW9uIGxpbmVUb011bHRpcGxlQ29tbWVudChsaW5lOiBzdHJpbmcpIHtcbiAgcmV0dXJuIGAjWz09PVsgJHtsaW5lfSBdPT09XWA7XG59XG5cbmV4cG9ydCBmdW5jdGlvbiBnZW5lcmF0ZWRTY3JpcHROYW1lQ29tbWVudChmaWxlbmFtZTogc3RyaW5nKSB7XG4gIHJldHVybiBsaW5lVG9TaW5nbENvbW1lbnQoXCJHZW5lcmF0ZWQgZnJvbSBcIiArIHBhdGguYmFzZW5hbWUoZmlsZW5hbWUpKTtcbn1cblxuZXhwb3J0IHsgREVGQVVMVF9HRU5FUkFUT1IgfTtcbiIsIi8qXG4gKiBNSVQgTGljZW5zZVxuICpcbiAqIENvcHlyaWdodCAoYykgMjAyNSAgWXVyaWkgWWFrdWJpbiAoeXVyaWkueWFrdWJpbkBnbWFpbC5jb20pXG4gKlxuICogUGVybWlzc2lvbiBpcyBncmFudGVkIHRvIHVzZSwgY29weSwgbW9kaWZ5LCBhbmQgZGlzdHJpYnV0ZSB0aGlzIHNvZnR3YXJlXG4gKiB1bmRlciB0aGUgTUlUIExpY2Vuc2UuIFNlZSBMSUNFTlNFIGZpbGUgZm9yIGRldGFpbHMuXG4gKi9cblxuaW1wb3J0IGZzIGZyb20gXCJub2RlOmZzXCI7XG5pbXBvcnQgdXJsIGZyb20gXCJub2RlOnVybFwiO1xuXG5pbXBvcnQgeyBDTWFrZVByb2Nlc3MgfSBmcm9tIFwiQC9jbWFrZVwiO1xuaW1wb3J0IHsgUGF0aCB9IGZyb20gXCJAL3V0aWxzL1BhdGhcIjtcbmltcG9ydCB7IG1ha2VQYXRjaCB9IGZyb20gXCJAL3V0aWxzL01ha2VQYXRjaFwiO1xuaW1wb3J0IHsgc2F2ZUlmRGlmZmVyZW50LCBkaXJlY3RvcnlFeGlzdHMgfSBmcm9tIFwiQC91dGlscy9GaWxlU3lzdGVtXCI7XG5pbXBvcnQgeyBTZXR0aW5nc1N0b3JhZ2UgfSBmcm9tIFwiQC91dGlscy9TZXR0aW5nc1N0b3JhZ2VcIjtcbmltcG9ydCB7IGFycmF5V3JhcHBlciwgYXNzaWduT2JqZWN0IH0gZnJvbSBcIkAvdXRpbHMvUHJpbWl0aXZlc1wiO1xuaW1wb3J0IHsgVVNFUl9DT05GSUcsIEJVSUxEX1NFVFRJTkdTX0ZJTEUsIFJFUVVFU1RfQVRURU1QVFMgfSBmcm9tIFwiQC9Db25zdGFudHNcIjtcbmltcG9ydCB7IERFQlVHX0JVSUxEX1RZUEUsIFJFTEVBU0VfQlVJTERfVFlQRSB9IGZyb20gXCJAL2NvcmUvVHlwZXNcIjtcbmltcG9ydCB7IElNUE9SVF9TQ0hFTUUgfSBmcm9tIFwiQC91dGlscy9VcmxTY2hlbWVcIjtcbmltcG9ydCB7IHJlcXVpcmVSZXNvbHZlIH0gZnJvbSBcIkAvdXRpbHMvTW9kdWxlXCI7XG5pbXBvcnQgeyBkb3dubG9hZEZpbGUgfSBmcm9tIFwiQC91dGlscy9IdHRwUmVxdWVzdFwiO1xuaW1wb3J0IHsgQ29tbWFuZE9wdGlvbnMgfSBmcm9tIFwiQC9jb3JlL0NvbW1hbmRPcHRpb25zXCI7XG5pbXBvcnQgeyBMb2dnZXIgfSBmcm9tIFwiQC9sb2dnZXJcIjtcbmltcG9ydCB7IGZpbGVFeGlzdHMgfSBmcm9tIFwiQC91dGlscy9GaWxlU3lzdGVtXCI7XG5pbXBvcnQgeyBsb2FkSlNWYWx1ZSB9IGZyb20gXCJAL3V0aWxzL0pTVmFsdWVcIjtcbmltcG9ydCB7IGltcG9ydE1vZHVsZSB9IGZyb20gXCJAL3V0aWxzL01vZHVsZVwiO1xuaW1wb3J0IHsgTG9jYXRvciB9IGZyb20gXCJAL3V0aWxzL0xvY2F0b3JcIjtcblxuaW1wb3J0IGFjdGlvbnMgZnJvbSBcIkAvYWN0aW9uc1wiO1xuXG5jb25zdCBsb2dnZXIgPSBMb2dnZXIuY3JlYXRlKGltcG9ydC5tZXRhLnVybCk7XG5cbmludGVyZmFjZSBJR2VuZXJhbENvbmZpZyB7XG4gIHdvcmtEaXI6IHN0cmluZztcbiAgYnVpbGRUeXBlOiBzdHJpbmc7XG59O1xuXG5mdW5jdGlvbiBtZXJnZUVudmlyb25tZW50KC4uLmFyZ3M6IGFueSkge1xuICBjb25zdCBlbnZpcm9ubWVudDogYW55ID0ge307XG4gIGZvciAoY29uc3QgZW52IG9mIGFyZ3MpIHtcbiAgICBjb25zdCBsaXN0OiBhbnkgPSBPYmplY3QuZW50cmllcyhlbnYgfHwge30pO1xuICAgIHdoaWxlIChsaXN0Lmxlbmd0aCkge1xuICAgICAgbGV0IFtrZXksdmFsXSA9IGxpc3QucG9wKCk7XG4gICAgICBsZXQgZGVsaW1pdGVyO1xuICAgICAgbGV0IGpvaW5BZnRlciA9IHRydWU7XG4gICAgICBzd2l0Y2ggKGtleSkge1xuICAgICAgY2FzZSBcIlBhdGhcIjpcbiAgICAgIGNhc2UgXCJQQVRIXCI6XG4gICAgICAgIGRlbGltaXRlciA9IFBhdGguZGVsaW1pdGVyO1xuICAgICAgICBqb2luQWZ0ZXIgPSBmYWxzZTtcbiAgICAgICAgYnJlYWs7XG4gICAgICBjYXNlIFwiQ0ZMQUdTXCI6XG4gICAgICBjYXNlIFwiQ1hYRkxBR1NcIjpcbiAgICAgIGNhc2UgXCJMREZMQUdTXCI6XG4gICAgICAgIGRlbGltaXRlciA9IFwiIFwiO1xuICAgICAgICBicmVhaztcbiAgICAgIH1cbiAgICAgIGlmICh0eXBlb2YgdmFsID09PSAnbnVtYmVyJylcbiAgICAgICAgdmFsID0gdmFsLnRvU3RyaW5nKCk7XG4gICAgICBlbHNlIGlmIChBcnJheS5pc0FycmF5KHZhbCkpXG4gICAgICAgIHZhbCA9IHZhbC5qb2luKGRlbGltaXRlcik7XG4gICAgICBpZiAoIWRlbGltaXRlciB8fCAhZW52aXJvbm1lbnRba2V5XSlcbiAgICAgICAgZW52aXJvbm1lbnRba2V5XSA9IHZhbDtcbiAgICAgIGVsc2UgaWYgKGpvaW5BZnRlcilcbiAgICAgICAgZW52aXJvbm1lbnRba2V5XSA9IHZhbCArIGRlbGltaXRlciArIGVudmlyb25tZW50W2tleV07XG4gICAgICBlbHNlXG4gICAgICAgIGVudmlyb25tZW50W2tleV0gPSBlbnZpcm9ubWVudFtrZXldICsgZGVsaW1pdGVyICsgdmFsO1xuICAgIH1cbiAgfVxuICByZXR1cm4gZW52aXJvbm1lbnQ7XG59XG5cbmludGVyZmFjZSBFbnZpcm9ubWVudCB7XG4gIFtuYW1lOiBzdHJpbmddOiBib29sZWFuIHwgbnVtYmVyIHwgc3RyaW5nIHwgc3RyaW5nW107XG59O1xuXG5hc3luYyBmdW5jdGlvbiByZXNvbHZlRW52aXJvbm1lbnQoZW52aXJvbm1lbnQ6IEVudmlyb25tZW50IHwgc3RyaW5nKTogUHJvbWlzZTxFbnZpcm9ubWVudD4ge1xuICBpZiAodHlwZW9mIGVudmlyb25tZW50ICE9PSBcInN0cmluZ1wiKVxuICAgIHJldHVybiBlbnZpcm9ubWVudDtcblxuICBjb25zdCBlbnZGaWxlID0gTG9jYXRvci5jcmVhdGUoZW52aXJvbm1lbnQpO1xuICByZXR1cm4gbG9hZEpTVmFsdWUoZW52RmlsZSk7XG59XG5cbmZ1bmN0aW9uIHJlYmFzZUNvbmZpZyhjb25maWc6IGFueSkge1xuICBjb25zdCBiYXNlQ29uZmlnOiBhbnkgPSB7fTtcbiAgY29uc3Qgb3RoZXJDb25maWc6IGFueSA9IHt9O1xuXG4gIGZvciAoY29uc3QgW2tleSwgZW50cnldIG9mIE9iamVjdC5lbnRyaWVzKGNvbmZpZykgYXMgYW55KSB7XG4gICAgKGVudHJ5LmJhc2UgPyBvdGhlckNvbmZpZyA6IGJhc2VDb25maWcpW2tleV0gPSBlbnRyeTtcbiAgfVxuXG4gIHdoaWxlICh0cnVlKSB7XG4gICAgY29uc3Qga2V5cyA9IE9iamVjdC5rZXlzKG90aGVyQ29uZmlnKTtcbiAgICBpZiAoa2V5cy5sZW5ndGggPT0gMClcbiAgICAgIGJyZWFrO1xuICAgIGNvbnN0IGRvbmVLZXlzID0gW107XG4gICAgZm9yIChjb25zdCBrZXkgb2Yga2V5cykge1xuICAgICAgY29uc3Qgb3RoZXJJdGVyID0gb3RoZXJDb25maWdba2V5XTtcbiAgICAgIGNvbnN0IGJhc2VMaXN0ID0gW107XG4gICAgICBmb3IgKGNvbnN0IGl0ZXIgb2YgYXJyYXlXcmFwcGVyKG90aGVySXRlci5iYXNlKSkge1xuICAgICAgICBjb25zdCBiYXNlRW50cnkgPSBiYXNlQ29uZmlnW2l0ZXJdO1xuICAgICAgICBpZiAoIWJhc2VFbnRyeSkge1xuICAgICAgICAgIGJhc2VMaXN0Lmxlbmd0aCA9IDA7XG4gICAgICAgICAgYnJlYWs7XG4gICAgICAgIH1cbiAgICAgICAgYmFzZUxpc3QucHVzaChiYXNlRW50cnkpO1xuICAgICAgfVxuICAgICAgaWYgKGJhc2VMaXN0Lmxlbmd0aCkge1xuICAgICAgICBiYXNlTGlzdC5wdXNoKG90aGVySXRlcik7XG4gICAgICAgIGxldCBuZXdFbnRyeSA9IHt9O1xuICAgICAgICBmb3IgKGNvbnN0IGl0ZXIgb2YgYmFzZUxpc3QpIHtcbiAgICAgICAgICBhc3NpZ25PYmplY3QobmV3RW50cnksIGl0ZXIpO1xuICAgICAgICB9XG4gICAgICAgIGJhc2VDb25maWdba2V5XSA9IG5ld0VudHJ5O1xuICAgICAgICBkb25lS2V5cy5wdXNoKGtleSk7XG4gICAgICB9XG4gICAgfVxuICAgIGlmIChkb25lS2V5cy5sZW5ndGggPT0gMCkge1xuICAgICAgZm9yIChjb25zdCBrZXkgb2Yga2V5cylcbiAgICAgICAgdGhyb3cgYENhbid0IHNldCBiYXNlIGNvbmZpZyBmb3IgXCIke2tleX1gO1xuICAgIH1cbiAgICBmb3IgKGNvbnN0IGtleSBvZiBkb25lS2V5cykge1xuICAgICAgZGVsZXRlIGJhc2VDb25maWdba2V5XS5iYXNlO1xuICAgICAgZGVsZXRlIG90aGVyQ29uZmlnW2tleV07XG4gICAgfVxuICB9XG5cbiAgcmV0dXJuIGJhc2VDb25maWc7XG59XG5cbmZ1bmN0aW9uIHJlc29sdmVTdHJpbmdXaXRoVmFyaWFibGUoY29uZmlnOiBhbnksIGVudHJ5Q29uZmlnOiBhbnksIHJvb3RDb25maWc6IGFueSwgdmFsOiBhbnkpIHtcbiAgcmV0dXJuIHZhbC5yZXBsYWNlKC9cXCRcXHsoW159XSspXFx9L2csIChtYXRjaDogYW55LCB2YWx1ZTogYW55KSA9PiB7XG4gICAgbGV0IHNlbDtcbiAgICBmb3IgKGNvbnN0IG5hbWUgb2YgdmFsdWUuc3BsaXQoXCIuXCIpKSB7XG4gICAgICBpZiAoc2VsID09PSB1bmRlZmluZWQpIHtcbiAgICAgICAgaWYgKGNvbmZpZy5oYXNPd25Qcm9wZXJ0eShuYW1lKSlcbiAgICAgICAgICBzZWwgPSBjb25maWdbbmFtZV07XG4gICAgICAgIGVsc2UgaWYgKGNvbmZpZyAhPT0gZW50cnlDb25maWcgJiYgZW50cnlDb25maWcuaGFzT3duUHJvcGVydHkobmFtZSkpXG4gICAgICAgICAgc2VsID0gZW50cnlDb25maWdbbmFtZV07XG4gICAgICAgIGVsc2UgaWYgKGNvbmZpZyAhPT0gcm9vdENvbmZpZyAmJiByb290Q29uZmlnLmhhc093blByb3BlcnR5KG5hbWUpKVxuICAgICAgICAgIHNlbCA9IHJvb3RDb25maWdbbmFtZV07XG4gICAgICAgIGVsc2Uge1xuICAgICAgICAgIHRyeSB7XG4gICAgICAgICAgICBjb25zdCBtYWluRmlsZSA9IHJlcXVpcmVSZXNvbHZlKG5hbWUpO1xuICAgICAgICAgICAgaWYgKG1haW5GaWxlKSB7XG4gICAgICAgICAgICAgIHNlbCA9IHsgbWFpbkZpbGUsIG1haW5EaXI6IFBhdGguZGlybmFtZShtYWluRmlsZSksIH07XG4gICAgICAgICAgICB9XG4gICAgICAgICB9IGNhdGNoKGUpIHt9XG4gICAgICAgIH1cbiAgICAgICAgaWYgKHNlbCA9PT0gdW5kZWZpbmVkKVxuICAgICAgICAgIGJyZWFrO1xuICAgICAgfVxuICAgICAgZWxzZSBpZiAoc2VsLmhhc093blByb3BlcnR5KG5hbWUpKSB7XG4gICAgICAgIHNlbCA9IHNlbFtuYW1lXTtcbiAgICAgIH1cbiAgICAgIGVsc2Uge1xuICAgICAgICBzZWwgPSB1bmRlZmluZWQ7XG4gICAgICAgIGJyZWFrO1xuICAgICAgfVxuICAgIH1cbiAgICBpZiAoc2VsID09PSB1bmRlZmluZWQpXG4gICAgICB0aHJvdyBuZXcgRXJyb3IoYFRoZSAke3ZhbHVlfSB2YXJpYWJsZSBkb2VzIG5vdCBleGlzdFwiYCk7XG4gICAgcmV0dXJuIHNlbDtcbiAgfSk7XG59XG5cbmZ1bmN0aW9uIHJlc29sdmVDb25maWdTdHJpbmdzSW1wbChjb25maWc6IGFueSwgZW50cnlDb25maWc6IGFueSwgcm9vdENvbmZpZzogYW55KSB7XG4gIGxldCBjb3VudCA9IDA7XG4gIGZvciAoY29uc3QgW2tleSwgdmFsXSBvZiBPYmplY3QuZW50cmllcyhjb25maWcpKSB7XG4gICAgaWYgKHZhbCAmJiB0eXBlb2YgdmFsID09PSBcIm9iamVjdFwiKVxuICAgICAgY291bnQgKz0gcmVzb2x2ZUNvbmZpZ1N0cmluZ3NJbXBsKHZhbCwgZW50cnlDb25maWcsIHJvb3RDb25maWcpO1xuICAgIGVsc2UgaWYgKHR5cGVvZiB2YWwgPT09IFwic3RyaW5nXCIpIHtcbiAgICAgIGNvbnN0IHYgPSByZXNvbHZlU3RyaW5nV2l0aFZhcmlhYmxlKGNvbmZpZywgZW50cnlDb25maWcsIHJvb3RDb25maWcsIHZhbCk7XG4gICAgICBpZiAodmFsICE9PSB2KSB7XG4gICAgICAgIGNvbmZpZ1trZXldID0gdjtcbiAgICAgICAgY291bnQrKztcbiAgICAgIH1cbiAgICB9XG4gIH1cbiAgcmV0dXJuIGNvdW50O1xufVxuXG5mdW5jdGlvbiByZXNvbHZlQ29uZmlnU3RyaW5ncyhjb25maWc6IGFueSkge1xuICBmb3IgKDs7KSB7XG4gICAgbGV0IGNvdW50ID0gMDtcbiAgICBmb3IgKGNvbnN0IFtrZXksIHZhbF0gb2YgT2JqZWN0LmVudHJpZXMoY29uZmlnKSkge1xuICAgICAgaWYgKHZhbCAmJiB0eXBlb2YgdmFsID09PSBcIm9iamVjdFwiKVxuICAgICAgICBjb3VudCArPSByZXNvbHZlQ29uZmlnU3RyaW5nc0ltcGwodmFsLCB2YWwsIGNvbmZpZyk7XG4gICAgICBlbHNlICBpZiAodHlwZW9mIHZhbCA9PT0gXCJzdHJpbmdcIikge1xuICAgICAgICBjb25zdCB2ID0gcmVzb2x2ZVN0cmluZ1dpdGhWYXJpYWJsZShjb25maWcsIGNvbmZpZywgY29uZmlnLCB2YWwpO1xuICAgICAgICBpZiAodmFsICE9PSB2KSB7XG4gICAgICAgICAgY29uZmlnW2tleV0gPSB2O1xuICAgICAgICAgIGNvdW50Kys7XG4gICAgICAgIH1cbiAgICAgIH1cbiAgICB9XG4gICAgaWYgKCFjb3VudClcbiAgICAgIGJyZWFrO1xuICB9XG59XG5cbmZ1bmN0aW9uIG1ha2VCdWlsZENvbmZpZyhnY29uZmlnOiBJR2VuZXJhbENvbmZpZywgY29uZmlnOiBhbnkpIHtcbiAgaWYgKGNvbmZpZ1tcInNvdXJjZVJvb3RcIl0pIHtcbiAgICB0aHJvdyBuZXcgRXJyb3IoYFZhcmlhYmxlIFwic291cmNlUm9vdFwiIGNhbm5vdCBiZSBjaGFuZ2VkIHRvIFwiJHtjb25maWcuc291cmNlUm9vdH1cImApO1xuICB9XG5cbiAgY29uc3Qgcm9vdENvbmZpZyA9IHJlYmFzZUNvbmZpZyhjb25maWcpO1xuXG4gIHJvb3RDb25maWcuYnVpbGRUeXBlID0gcm9vdENvbmZpZy5idWlsZFR5cGUgfHwgZ2NvbmZpZy5idWlsZFR5cGU7XG4gIHJvb3RDb25maWcuc291cmNlUm9vdCA9IHJvb3RDb25maWcuc291cmNlUm9vdCB8fCBnY29uZmlnLndvcmtEaXI7XG4gIHJvb3RDb25maWcuYmluYXJ5Um9vdCA9IHJvb3RDb25maWcuYmluYXJ5Um9vdCB8fCBQYXRoLmpvaW4oZ2NvbmZpZy53b3JrRGlyLCBcImJ1aWxkXCIpO1xuXG4gIGZvciAoY29uc3QgW2tleSwgZW50cnldIG9mIE9iamVjdC5lbnRyaWVzKHJvb3RDb25maWcpIGFzIGFueSkge1xuICAgIGlmIChlbnRyeSAmJiB0eXBlb2YgZW50cnkgPT09IFwib2JqZWN0XCIgJiYgZW50cnkuYWN0aW9uKSB7XG4gICAgICBlbnRyeS5idWlsZFR5cGUgPSBlbnRyeS5idWlsZFR5cGUgfHwgcm9vdENvbmZpZy5idWlsZFR5cGU7XG4gICAgICBjb25zdCBmb2xkZXIgPSBrZXkucmVwbGFjZShcIjpcIiwgUGF0aC5zZXApO1xuICAgICAgY29uc3Qgd29ya0RpciA9IFBhdGguam9pbihyb290Q29uZmlnLmJpbmFyeVJvb3QsIGZvbGRlcik7XG4gICAgICBlbnRyeS50ZW1wRGlyID0gZW50cnkudGVtcERpciB8fCBQYXRoLmpvaW4od29ya0RpciwgXCJ0bXBcIik7XG4gICAgICBpZiAoZW50cnkuc291cmNlVXJsKSB7XG4gICAgICAgIGlmIChlbnRyeS5zb3VyY2VVcmwuc3RhcnRzV2l0aChJTVBPUlRfU0NIRU1FKSkge1xuICAgICAgICAgIGNvbnN0IGZpbGVuYW1lID0gcmVxdWlyZVJlc29sdmUoZW50cnkuc291cmNlVXJsLnNsaWNlKElNUE9SVF9TQ0hFTUUubGVuZ3RoKSk7XG4gICAgICAgICAgZW50cnkuc291cmNlRGlyID0gUGF0aC5kaXJuYW1lKGZpbGVuYW1lKTtcbiAgICAgICAgfVxuICAgICAgICBlbHNlIHtcbiAgICAgICAgICBlbnRyeS5hcmNoaXZlRGlyID0gZW50cnkuYXJjaGl2ZURpciB8fCBQYXRoLmpvaW4od29ya0RpciwgXCJhcmNcIik7XG4gICAgICAgICAgZW50cnkuZXh0cmFjdERpciA9IGVudHJ5LmV4dHJhY3REaXIgfHwgUGF0aC5qb2luKHdvcmtEaXIsIFwic3JjXCIpO1xuICAgICAgICAgIGlmICghZW50cnkuc291cmNlRGlyKVxuICAgICAgICAgICAgZW50cnkuc291cmNlRGlyID0gZW50cnkuZXh0cmFjdERpcjtcbiAgICAgICAgICBlbHNlIGlmICghUGF0aC5pc0Fic29sdXRlKGVudHJ5LnNvdXJjZURpcikpXG4gICAgICAgICAgICBlbnRyeS5zb3VyY2VEaXIgPSBQYXRoLmpvaW4oZW50cnkuZXh0cmFjdERpciwgZW50cnkuc291cmNlRGlyKTtcbiAgICAgICAgfVxuICAgICAgfVxuICAgICAgZWxzZSBpZiAoIWVudHJ5LnNvdXJjZURpcikge1xuICAgICAgICB0aHJvdyBuZXcgRXJyb3IoYE1pc3Npbmcgc291cmNlRGlyIGZvciAke2tleX0gYWN0aW9uXCJgKTtcbiAgICAgIH1cbiAgICAgIGlmIChlbnRyeS5iaW5hcnlEaXIgPT09IG51bGwpXG4gICAgICAgIGVudHJ5LmJpbmFyeURpciA9IGVudHJ5LnNvdXJjZURpcjtcbiAgICAgIGVsc2UgaWYgKGVudHJ5LmJpbmFyeURpciA9PT0gdW5kZWZpbmVkKVxuICAgICAgICBlbnRyeS5iaW5hcnlEaXIgPSBQYXRoLmpvaW4od29ya0RpciwgXCJiaW5cIik7XG4gICAgfVxuICB9XG5cbiAgcmVzb2x2ZUNvbmZpZ1N0cmluZ3Mocm9vdENvbmZpZyk7XG5cbiAgcmV0dXJuIHJvb3RDb25maWc7XG59XG5cbmFzeW5jIGZ1bmN0aW9uIGRvRXh0cmFjdEFyY2hpdmUoZ2NvbmZpZzogSUdlbmVyYWxDb25maWcsIGVudmlyb25tZW50OiBhbnksIGNvbmZpZzogYW55LCBzZXR0aW5nczogYW55KSB7XG4gIGlmICghY29uZmlnLnNvdXJjZVVybClcbiAgICB0aHJvdyBuZXcgRXJyb3IoXCJVbmtub3duIHNvdXJjZVVybFwiKTtcbiAgaWYgKCFjb25maWcuYXJjaGl2ZURpcilcbiAgICB0aHJvdyBuZXcgRXJyb3IoXCJVbmtub3duIGFyY2hpdmVEaXJcIik7XG4gIGlmICghY29uZmlnLmV4dHJhY3REaXIpXG4gICAgdGhyb3cgbmV3IEVycm9yKFwiVW5rbm93biBleHRyYWN0RGlyXCIpO1xuXG4gIGlmICghYXdhaXQgZGlyZWN0b3J5RXhpc3RzKGNvbmZpZy5hcmNoaXZlRGlyKSkge1xuICAgIGxvZ2dlci5ub3RpY2UoYG1rZGlyIC1wICR7Y29uZmlnLmFyY2hpdmVEaXJ9YCk7XG4gICAgYXdhaXQgZnMucHJvbWlzZXMubWtkaXIoY29uZmlnLmFyY2hpdmVEaXIsIHsgcmVjdXJzaXZlOiB0cnVlIH0pO1xuICB9XG5cbiAgaWYgKCFhd2FpdCBkaXJlY3RvcnlFeGlzdHMoY29uZmlnLnRlbXBEaXIpKSB7XG4gICAgbG9nZ2VyLm5vdGljZShgbWtkaXIgLXAgJHtjb25maWcudGVtcERpcn1gKTtcbiAgICBhd2FpdCBmcy5wcm9taXNlcy5ta2Rpcihjb25maWcudGVtcERpciwgeyByZWN1cnNpdmU6IHRydWUgfSk7XG4gIH1cblxuICBjb25zdCBhcmNOYW1lID0gUGF0aC5iYXNlbmFtZShjb25maWcuc291cmNlVXJsKTtcblxuICBsZXQgYXJjRmlsZTtcbiAgbGV0IGRvd25sb2FkVXJscyA9IGF3YWl0IHNldHRpbmdzLmdldChcImRvd25sb2FkVXJsc1wiKSB8fCB7fTtcbiAgaWYgKGRvd25sb2FkVXJsc1tjb25maWcuc291cmNlVXJsXSlcbiAgICBhcmNGaWxlID0gZG93bmxvYWRVcmxzW2NvbmZpZy5zb3VyY2VVcmxdO1xuICBlbHNlIHtcbiAgICBhcmNGaWxlID0gUGF0aC5qb2luKGNvbmZpZy5hcmNoaXZlRGlyLCBhcmNOYW1lKTtcbiAgICBhd2FpdCBkb3dubG9hZEZpbGUoY29uZmlnLnNvdXJjZVVybCwgYXJjRmlsZSwgeyBhdHRlbXB0czogUkVRVUVTVF9BVFRFTVBUUyB9KTtcbiAgICBkb3dubG9hZFVybHNbY29uZmlnLnNvdXJjZVVybF0gPSBhcmNGaWxlO1xuICAgIGF3YWl0IHNldHRpbmdzLnNldChcImRvd25sb2FkVXJsc1wiLCBkb3dubG9hZFVybHMpO1xuICB9XG5cbiAgbGV0IGV4dHJhY3REaXI7XG4gIGxldCBleHRyYWN0RmlsZXMgPSBhd2FpdCBzZXR0aW5ncy5nZXQoXCJleHRyYWN0RmlsZXNcIikgfHwge307XG4gIGlmIChleHRyYWN0RmlsZXNbYXJjRmlsZV0pIHtcbiAgICBleHRyYWN0RGlyID0gZXh0cmFjdEZpbGVzW2FyY0ZpbGVdO1xuICB9XG4gIGVsc2Uge1xuICAgIGV4dHJhY3REaXIgPSBhd2FpdCBmcy5wcm9taXNlcy5ta2R0ZW1wKFBhdGgucmVzb2x2ZShjb25maWcudGVtcERpciwgYXJjTmFtZSArICcuJykpO1xuICBcbiAgICBhd2FpdCBDTWFrZVByb2Nlc3MuZ2V0SW5zdGFuY2UoKS5leHRyYWN0KHtcbiAgICAgIGVudmlyb25tZW50LFxuICAgICAgZmlsZW5hbWU6IGFyY0ZpbGUsXG4gICAgICB3b3JrRGlyOiBleHRyYWN0RGlyLFxuICAgICAgbG9nRmlsZTogIFBhdGguam9pbihjb25maWcudGVtcERpciwgUGF0aC5iYXNlbmFtZShleHRyYWN0RGlyKSArIFwiLmxvZ1wiKSxcbiAgICB9KTtcbiAgXG4gICAgY29uc3QgZXh0cmFjdExpc3QgPSBhd2FpdCBmcy5wcm9taXNlcy5yZWFkZGlyKGV4dHJhY3REaXIpO1xuICAgIGlmIChleHRyYWN0TGlzdC5sZW5ndGggPT09IDEpIHtcbiAgICAgIGV4dHJhY3REaXIgPSBQYXRoLnJlc29sdmUoZXh0cmFjdERpciwgZXh0cmFjdExpc3RbMF0pO1xuICAgICAgaWYgKCFhd2FpdCBkaXJlY3RvcnlFeGlzdHMoZXh0cmFjdERpcikpIHtcbiAgICAgICAgbG9nZ2VyLm5vdGljZShgcm0gLWZyICR7ZXh0cmFjdERpcn1gKTtcbiAgICAgICAgYXdhaXQgZnMucHJvbWlzZXMucm0oZXh0cmFjdERpciwgeyByZWN1cnNpdmU6IHRydWUgfSk7XG4gICAgICAgIHRocm93IG5ldyBFcnJvcihgU3VwcG9ydCBvbmx5IGRpcmVjdG9yeSBmb3IgYXJjaGl2ZWApO1xuICAgICAgfVxuICAgIH1cbiAgXG4gICAgaWYgKGF3YWl0IGRpcmVjdG9yeUV4aXN0cyhjb25maWcuZXh0cmFjdERpcikpIHtcbiAgICAgIC8vIFRPRE86IE1hcmdlIGV4dHJhY3REaXIgd2l0aCBvdXRwdXRcbiAgICAgIGxvZ2dlci5ub3RpY2UoYHJtIC1mciAke2NvbmZpZy5leHRyYWN0RGlyfWApO1xuICAgICAgYXdhaXQgZnMucHJvbWlzZXMucm0oY29uZmlnLmV4dHJhY3REaXIsIHsgcmVjdXJzaXZlOiB0cnVlIH0pO1xuICAgIH1cbiAgICBlbHNlIHtcbiAgICAgIGNvbnN0IHBhcmVudERpciA9IFBhdGguZGlybmFtZShjb25maWcuZXh0cmFjdERpcik7XG4gICAgICBpZiAoIWF3YWl0IGRpcmVjdG9yeUV4aXN0cyhwYXJlbnREaXIpKSB7XG4gICAgICAgIGxvZ2dlci5ub3RpY2UoYG1rZGlyIC1wICR7cGFyZW50RGlyfWApO1xuICAgICAgICBhd2FpdCBmcy5wcm9taXNlcy5ta2RpcihwYXJlbnREaXIsIHsgcmVjdXJzaXZlOiB0cnVlIH0pOyBcbiAgICAgIH1cbiAgICB9XG4gIFxuICAgIGxvZ2dlci5ub3RpY2UoYG12ICR7ZXh0cmFjdERpcn0gJHtjb25maWcuZXh0cmFjdERpcn1gKTtcbiAgICBhd2FpdCBmcy5wcm9taXNlcy5yZW5hbWUoZXh0cmFjdERpciwgY29uZmlnLmV4dHJhY3REaXIpO1xuICBcbiAgICBleHRyYWN0RmlsZXNbYXJjRmlsZV0gPSBleHRyYWN0RGlyO1xuICAgIGF3YWl0IHNldHRpbmdzLnNldChcImV4dHJhY3RGaWxlc1wiLCBleHRyYWN0RmlsZXMpO1xuICB9XG5cbiAgaWYgKGNvbmZpZy5wYXRjaERpcikge1xuICAgIGxldCBwYXRjaERpcnMgPSBhd2FpdCBzZXR0aW5ncy5nZXQoXCJwYXRjaERpcnNcIikgfHwge307XG4gICAgaWYgKCFwYXRjaERpcnNbY29uZmlnLnBhdGNoRGlyXSkge1xuICAgICAgYXdhaXQgbWFrZVBhdGNoKGNvbmZpZy5wYXRjaERpciwgY29uZmlnLmV4dHJhY3REaXIpO1xuICAgICAgcGF0Y2hEaXJzW2NvbmZpZy5wYXRjaERpcl0gPSBjb25maWcuZXh0cmFjdERpcjtcbiAgICAgIGF3YWl0IHNldHRpbmdzLnNldChcInBhdGNoRGlyc1wiLCBwYXRjaERpcnMpO1xuICAgIH1cbiAgfVxufVxuXG5hc3luYyBmdW5jdGlvbiBkb1RhcmdldEJ1aWxkKGdjb25maWc6IElHZW5lcmFsQ29uZmlnLCBlbnZpcm9ubWVudDogYW55LCBjb25maWc6IGFueSwgc2V0dGluZ3M6IFNldHRpbmdzU3RvcmFnZSkge1xuICBpZiAoY29uZmlnLnByZUFjdGlvbikge1xuICAgIGF3YWl0IHNldHRpbmdzLnB1c2goXCJwcmVBY3Rpb25cIik7XG4gICAgY29uc3QgbmV3Q29uZmlnOiBhbnkgPSB7fTtcbiAgICBhc3NpZ25PYmplY3QobmV3Q29uZmlnLCBjb25maWcpO1xuICAgIGRlbGV0ZSBuZXdDb25maWcuYWN0aW9uO1xuICAgIGRlbGV0ZSBuZXdDb25maWcucHJlQWN0aW9uO1xuICAgIGRlbGV0ZSBuZXdDb25maWcucG9zdEFjdGlvbjtcbiAgICBhc3NpZ25PYmplY3QobmV3Q29uZmlnLCBjb25maWcucHJlQWN0aW9uKTtcbiAgICBjb25zdCBuZXdFbnZpcm9ubWVudCA9IG1lcmdlRW52aXJvbm1lbnQoYXdhaXQgcmVzb2x2ZUVudmlyb25tZW50KGNvbmZpZy5wcmVBY3Rpb24uZW52aXJvbm1lbnQpLCBlbnZpcm9ubWVudCk7XG4gICAgYXdhaXQgZG9UYXJnZXRCdWlsZChnY29uZmlnLCBuZXdFbnZpcm9ubWVudCwgbmV3Q29uZmlnLCBzZXR0aW5ncyk7XG4gICAgYXdhaXQgc2V0dGluZ3MucG9wKCk7XG4gIH1cblxuICBpZiAoQXJyYXkuaXNBcnJheShjb25maWcuYWN0aW9uKSkge1xuICAgIGF3YWl0IHNldHRpbmdzLnB1c2goXCJhY3Rpb25cIik7XG4gICAgZm9yICh2YXIgaSA9IDA7IGkgPCBjb25maWcuYWN0aW9uLmxlbmd0aDsgKytpKSB7XG4gICAgICBhd2FpdCBzZXR0aW5ncy5wdXNoKGkudG9TdHJpbmcoKSk7XG4gICAgICBjb25zdCBuZXdDb25maWc6IGFueSA9IHt9O1xuICAgICAgYXNzaWduT2JqZWN0KG5ld0NvbmZpZywgY29uZmlnKTtcbiAgICAgIGRlbGV0ZSBuZXdDb25maWcuYWN0aW9uO1xuICAgICAgZGVsZXRlIG5ld0NvbmZpZy5wcmVBY3Rpb247XG4gICAgICBkZWxldGUgbmV3Q29uZmlnLnBvc3RBY3Rpb247XG4gICAgICBhc3NpZ25PYmplY3QobmV3Q29uZmlnLCBjb25maWcuYWN0aW9uW2ldKTtcbiAgICAgIGNvbnN0IG5ld0Vudmlyb25tZW50ID0gbWVyZ2VFbnZpcm9ubWVudChhd2FpdCByZXNvbHZlRW52aXJvbm1lbnQoY29uZmlnLmFjdGlvbltpXS5lbnZpcm9ubWVudCksIGVudmlyb25tZW50KTtcbiAgICAgIGF3YWl0IGRvVGFyZ2V0QnVpbGQoZ2NvbmZpZywgbmV3RW52aXJvbm1lbnQsIG5ld0NvbmZpZywgc2V0dGluZ3MpO1xuICAgICAgYXdhaXQgc2V0dGluZ3MucG9wKCk7XG4gICAgfVxuICAgIGF3YWl0IHNldHRpbmdzLnBvcCgpO1xuICB9XG4gIGVsc2Uge1xuICAgIGlmICghYXdhaXQgZGlyZWN0b3J5RXhpc3RzKGNvbmZpZy5iaW5hcnlEaXIpKSB7XG4gICAgICBhd2FpdCBmcy5wcm9taXNlcy5ta2Rpcihjb25maWcuYmluYXJ5RGlyLCB7IHJlY3Vyc2l2ZTogdHJ1ZSB9KTtcbiAgICB9XG4gICAgaWYgKGFjdGlvbnNbY29uZmlnLmFjdGlvbl0pIHtcbiAgICAgIGNvbmZpZy5kZXNjcmlwdGlvbiAmJiBsb2dnZXIubm90aWNlKGNvbmZpZy5kZXNjcmlwdGlvbik7XG4gICAgICBhd2FpdCBhY3Rpb25zW2NvbmZpZy5hY3Rpb25dKGNvbmZpZywgZW52aXJvbm1lbnQsIHNldHRpbmdzKTtcbiAgICB9XG4gIH1cblxuICBpZiAoY29uZmlnLnBvc3RBY3Rpb24pIHtcbiAgICBhd2FpdCBzZXR0aW5ncy5wdXNoKFwicG9zdEFjdGlvblwiKTtcbiAgICBjb25zdCBuZXdDb25maWc6IGFueSA9IHt9O1xuICAgIGFzc2lnbk9iamVjdChuZXdDb25maWcsIGNvbmZpZyk7XG4gICAgZGVsZXRlIG5ld0NvbmZpZy5hY3Rpb247XG4gICAgZGVsZXRlIG5ld0NvbmZpZy5wcmVBY3Rpb247XG4gICAgZGVsZXRlIG5ld0NvbmZpZy5wb3N0QWN0aW9uO1xuICAgIGFzc2lnbk9iamVjdChuZXdDb25maWcsIGNvbmZpZy5wb3N0QWN0aW9uKTtcbiAgICBjb25zdCBuZXdFbnZpcm9ubWVudCA9IG1lcmdlRW52aXJvbm1lbnQoYXdhaXQgcmVzb2x2ZUVudmlyb25tZW50KGNvbmZpZy5wb3N0QWN0aW9uLmVudmlyb25tZW50KSwgZW52aXJvbm1lbnQpO1xuICAgIGF3YWl0IGRvVGFyZ2V0QnVpbGQoZ2NvbmZpZywgbmV3RW52aXJvbm1lbnQsIG5ld0NvbmZpZywgc2V0dGluZ3MpO1xuICAgIGF3YWl0IHNldHRpbmdzLnBvcCgpO1xuICB9XG59XG5cbmFzeW5jIGZ1bmN0aW9uIGdldFVzZXJDb25maWcob3B0aW9uczogQ29tbWFuZE9wdGlvbnMpIHtcbiAgbGV0IGNvbmZpZ1BhdGg7XG4gIGlmIChvcHRpb25zLmVudi5jb25maWcpIHtcbiAgICBjb25maWdQYXRoID0gUGF0aC5pc0Fic29sdXRlKG9wdGlvbnMuZW52LmNvbmZpZykgPyBvcHRpb25zLmVudi5jb25maWcgOiBQYXRoLnJlc29sdmUob3B0aW9ucy53b3JrRGlyLCBvcHRpb25zLmVudi5jb25maWcpO1xuICAgIGlmICghYXdhaXQgZmlsZUV4aXN0cyhjb25maWdQYXRoKSlcbiAgICAgIHRocm93IGBDb25maWd1cmF0aW9uICcke29wdGlvbnMuZW52LmNvbmZpZ30nIGZpbGUgZG9lcyBub3QgZXhpc3RgO1xuICB9XG4gIGVsc2Uge1xuICAgIGNvbnN0IHVzZXJDb25maWdQYXRoID0gUGF0aC5yZXNvbHZlKG9wdGlvbnMud29ya0RpciwgVVNFUl9DT05GSUcpO1xuICAgIGlmIChhd2FpdCBmaWxlRXhpc3RzKHVzZXJDb25maWdQYXRoKSlcbiAgICAgIGNvbmZpZ1BhdGggPSB1c2VyQ29uZmlnUGF0aDtcbiAgICBlbHNlIHtcbiAgICAgIGxvZ2dlci53YXJuKGBDb25maWcgZmlsZSAnJHtVU0VSX0NPTkZJR30nIGlzIG5vdCBhdmFpbGFibGVgKTtcbiAgICB9XG4gIH1cblxuICBpZiAoIWNvbmZpZ1BhdGgpIHtcbiAgICByZXR1cm4ge1xuICAgICAgXCJidW5kbGU6b3V0cHV0XCI6IHtcbiAgICAgICAgYWN0aW9uOiBcImJpdG1ha2VcIixcbiAgICAgICAgdmFyaWFibGVzOiB7XG4gICAgICAgICAgSU5TVEFMTF9QUkVGSVg6IFwiL3VzclwiLFxuICAgICAgICB9LFxuICAgICAgICBzb3VyY2VEaXI6IFwiJHtzb3VyY2VSb290fVwiLFxuICAgICAgICBkZXN0RGlyOiBcIiR7YmluYXJ5Um9vdH0vb3V0cHV0XCIsXG4gICAgICB9XG4gICAgfTtcbiAgfVxuXG4gIGNvbnN0IGNvbmZpZ1VybCA9IHVybC5wYXRoVG9GaWxlVVJMKGNvbmZpZ1BhdGgpO1xuICBjb25zdCBjb25maWdNb2R1bGUgPSBhd2FpdCBpbXBvcnRNb2R1bGUoY29uZmlnVXJsKTtcbiAgc3dpdGNoICh0eXBlb2YgY29uZmlnTW9kdWxlLmRlZmF1bHQpIHtcbiAgY2FzZSBcImZ1bmN0aW9uXCI6XG4gICAgY29uc3QgdXNlckNvbmZpZyA9IGNvbmZpZ01vZHVsZS5kZWZhdWx0KG9wdGlvbnMuZW52LCB7fSk7XG4gICAgaWYgKHVzZXJDb25maWcgaW5zdGFuY2VvZiBQcm9taXNlKVxuICAgICAgcmV0dXJuIGF3YWl0IHVzZXJDb25maWc7XG4gICAgcmV0dXJuIHVzZXJDb25maWc7XG5cbiAgY2FzZSBcIm9iamVjdFwiOlxuICAgIHJldHVybiBjb25maWdNb2R1bGUuZGVmYXVsdDtcblxuICBkZWZhdWx0OlxuICAgIHRocm93IG5ldyBFcnJvcihgVW5rbm93biB1c2VyIGNvbmZpZ3VyYXRpb24gdHlwZWApO1xuICB9XG59XG5cbmV4cG9ydCBkZWZhdWx0IGFzeW5jIChvcHRpb25zOiBDb21tYW5kT3B0aW9ucykgPT4ge1xuICBjb25zdCBnY29uZmlnOiBJR2VuZXJhbENvbmZpZyA9IHtcbiAgICBidWlsZFR5cGU6IG9wdGlvbnMuZW52LmJ1aWxkVHlwZSA9PSBERUJVR19CVUlMRF9UWVBFID8gb3B0aW9ucy5lbnYuYnVpbGRUeXBlIDogUkVMRUFTRV9CVUlMRF9UWVBFLFxuICAgIHdvcmtEaXI6IG9wdGlvbnMud29ya0RpcixcbiAgfTtcblxuICBjb25zdCB1c2VyQ29uZmlnID0gYXdhaXQgZ2V0VXNlckNvbmZpZyhvcHRpb25zKTtcbiAgY29uc3QgYnVpbGRDb25maWcgPSBtYWtlQnVpbGRDb25maWcoZ2NvbmZpZywgdXNlckNvbmZpZyk7XG5cbiAgaWYgKGJ1aWxkQ29uZmlnLlJFQ0lQRV9DT05URU5UX0ZJTEUpIHtcbiAgICBjb25zdCBqc29uQ29uZmlnID0gSlNPTi5zdHJpbmdpZnkoYnVpbGRDb25maWcsIG51bGwsIDIpO1xuICAgIGF3YWl0IHNhdmVJZkRpZmZlcmVudChidWlsZENvbmZpZy5SRUNJUEVfQ09OVEVOVF9GSUxFLCBqc29uQ29uZmlnKTtcbiAgfVxuXG4gIGNvbnN0IHNldHRpbmdzRmlsZW5hbWUgPSBQYXRoLnJlc29sdmUoYnVpbGRDb25maWcuYmluYXJ5Um9vdCwgQlVJTERfU0VUVElOR1NfRklMRSk7XG4gIGNvbnN0IHNldHRpbmdzID0gbmV3IFNldHRpbmdzU3RvcmFnZShzZXR0aW5nc0ZpbGVuYW1lKTtcblxuICBmb3IgKGNvbnN0IFtrZXksIGVudHJ5XSBvZiBPYmplY3QuZW50cmllcyhidWlsZENvbmZpZykgYXMgYW55KSB7XG4gICAgaWYgKGVudHJ5ICYmIHR5cGVvZiBlbnRyeSA9PT0gXCJvYmplY3RcIiAmJiBlbnRyeS5hY3Rpb24gJiYgIWVudHJ5LmRpc2FibGVkKSB7XG4gICAgICBhd2FpdCBzZXR0aW5ncy5wdXNoKGtleSk7XG4gICAgICBjb25zdCBjb21wbGV0ZWQgPSBhd2FpdCBzZXR0aW5ncy5nZXQoXCJjb21wbGV0ZWRcIik7XG4gICAgICBpZiAoZW50cnkucmVidWlsZCB8fCAhY29tcGxldGVkKSB7XG4gICAgICAgIGxvZ2dlci5pbmZvKGBTdGFydGVkIGFjdGlvbjogJHtrZXl9YCk7XG4gICAgICAgIGNvbnN0IGVudmlyb25tZW50ID0gbWVyZ2VFbnZpcm9ubWVudChhd2FpdCByZXNvbHZlRW52aXJvbm1lbnQoZW50cnkuZW52aXJvbm1lbnQpLCBwcm9jZXNzLmVudik7XG4gICAgICAgIGlmIChlbnRyeS5zb3VyY2VVcmwgJiYgIWVudHJ5LnNvdXJjZVVybC5zdGFydHNXaXRoKElNUE9SVF9TQ0hFTUUpKSB7XG4gICAgICAgICAgYXdhaXQgZG9FeHRyYWN0QXJjaGl2ZShnY29uZmlnLCBlbnZpcm9ubWVudCwgZW50cnksIHNldHRpbmdzKTtcbiAgICAgICAgfVxuICAgICAgICBhd2FpdCBkb1RhcmdldEJ1aWxkKGdjb25maWcsIGVudmlyb25tZW50LCBlbnRyeSwgc2V0dGluZ3MpO1xuICAgICAgICBhd2FpdCBzZXR0aW5ncy5zZXQoXCJjb21wbGV0ZWRcIiwgdHJ1ZSk7XG4gICAgICAgIGxvZ2dlci5pbmZvKGBDb21wbGV0ZWQgYWN0aW9uOiAke2tleX1gKTtcbiAgICAgIH1cbiAgICAgIGF3YWl0IHNldHRpbmdzLnBvcCgpO1xuICAgIH1cbiAgfVxufVxuIiwiLypcbiAqIE1JVCBMaWNlbnNlXG4gKlxuICogQ29weXJpZ2h0IChjKSAyMDI1ICBZdXJpaSBZYWt1YmluICh5dXJpaS55YWt1YmluQGdtYWlsLmNvbSlcbiAqXG4gKiBQZXJtaXNzaW9uIGlzIGdyYW50ZWQgdG8gdXNlLCBjb3B5LCBtb2RpZnksIGFuZCBkaXN0cmlidXRlIHRoaXMgc29mdHdhcmVcbiAqIHVuZGVyIHRoZSBNSVQgTGljZW5zZS4gU2VlIExJQ0VOU0UgZmlsZSBmb3IgZGV0YWlscy5cbiAqL1xuXG5pbXBvcnQgeyBDb21tYW5kT3B0aW9ucyB9IGZyb20gXCJAL2NvcmUvQ29tbWFuZE9wdGlvbnNcIjtcbmltcG9ydCBpbml0IGZyb20gXCJAL2NvbW1hbmRzL2luaXRcIjtcbmltcG9ydCBidWlsZCBmcm9tIFwiQC9jb21tYW5kcy9idWlsZFwiO1xuXG5leHBvcnQgZGVmYXVsdCB7XG4gIGRlZmF1bHQ6IGJ1aWxkLFxuICBpbml0LFxuICBidWlsZCxcbn0gYXMgeyBbbmFtZTogc3RyaW5nXTogKG9wdGlvbnM6IENvbW1hbmRPcHRpb25zKSA9PiBhbnk7IH07XG4iLCIvKlxuICogTUlUIExpY2Vuc2VcbiAqXG4gKiBDb3B5cmlnaHQgKGMpIDIwMjUgIFl1cmlpIFlha3ViaW4gKHl1cmlpLnlha3ViaW5AZ21haWwuY29tKVxuICpcbiAqIFBlcm1pc3Npb24gaXMgZ3JhbnRlZCB0byB1c2UsIGNvcHksIG1vZGlmeSwgYW5kIGRpc3RyaWJ1dGUgdGhpcyBzb2Z0d2FyZVxuICogdW5kZXIgdGhlIE1JVCBMaWNlbnNlLiBTZWUgTElDRU5TRSBmaWxlIGZvciBkZXRhaWxzLlxuICovXG5cbmltcG9ydCBwYXRoIGZyb20gXCJub2RlOnBhdGhcIjtcbmltcG9ydCBmcyBmcm9tIFwibm9kZTpmc1wiO1xuXG5pbXBvcnQgeyBmaWxlRXhpc3RzLCBmZXRjaEJ1ZmZlciB9IGZyb20gXCJAL3V0aWxzL0ZpbGVTeXN0ZW1cIjtcbmltcG9ydCB7IFVTRVJfQ09ORklHIH0gZnJvbSBcIkAvQ29uc3RhbnRzXCI7XG5pbXBvcnQgeyBDb21tYW5kT3B0aW9ucyB9IGZyb20gXCJAL2NvcmUvQ29tbWFuZE9wdGlvbnNcIjtcbmltcG9ydCB7IExvZ2dlciB9IGZyb20gXCJAL2xvZ2dlclwiO1xuXG5jb25zdCBsb2dnZXIgPSBMb2dnZXIuY3JlYXRlKGltcG9ydC5tZXRhLnVybCk7XG5cbmV4cG9ydCBkZWZhdWx0IGFzeW5jIGZ1bmN0aW9uKG9wdGlvbnM6IENvbW1hbmRPcHRpb25zKSB7XG4gIGNvbnN0IHByZXNldCA9IG9wdGlvbnMuZW52LnByZXNldDtcblxuICBpZiAoIXByZXNldClcbiAgICB0aHJvdyBuZXcgRXJyb3IoYFByZXNldCAnJHtwcmVzZXR9JyBpcyBub3QgYXZhaWxhYmxlYCk7XG5cbiAgY29uc3QgcHJlc2V0RGF0YSA9IGF3YWl0IGZldGNoQnVmZmVyKHByZXNldCk7XG5cbiAgY29uc3QgdXNlckNvbmZpZ1BhdGggPSBwYXRoLnJlc29sdmUob3B0aW9ucy53b3JrRGlyLCBVU0VSX0NPTkZJRyk7XG4gIGlmIChhd2FpdCBmaWxlRXhpc3RzKHVzZXJDb25maWdQYXRoKSlcbiAgICBhd2FpdCBmcy5wcm9taXNlcy5ybSh1c2VyQ29uZmlnUGF0aCk7XG5cbiAgYXdhaXQgZnMucHJvbWlzZXMud3JpdGVGaWxlKHVzZXJDb25maWdQYXRoLCBwcmVzZXREYXRhLCBcInV0ZjhcIik7XG4gIGxvZ2dlci5pbmZvKGBQcmVzZXQgJyR7cHJlc2V0fScgaW5zdGFsbGVkIHN1Y2Nlc3NmdWxseWApO1xufVxuIiwiLypcbiAqIE1JVCBMaWNlbnNlXG4gKlxuICogQ29weXJpZ2h0IChjKSAyMDI1ICBZdXJpaSBZYWt1YmluICh5dXJpaS55YWt1YmluQGdtYWlsLmNvbSlcbiAqXG4gKiBQZXJtaXNzaW9uIGlzIGdyYW50ZWQgdG8gdXNlLCBjb3B5LCBtb2RpZnksIGFuZCBkaXN0cmlidXRlIHRoaXMgc29mdHdhcmVcbiAqIHVuZGVyIHRoZSBNSVQgTGljZW5zZS4gU2VlIExJQ0VOU0UgZmlsZSBmb3IgZGV0YWlscy5cbiAqL1xuXG5pbXBvcnQgeyBJR2VuZXJhbENvbnRleHQgfSBmcm9tIFwiQC9jb3JlL01ha2VJbnRlcmZhY2VzXCI7XG5pbXBvcnQgeyBmaW5kUHJvZ3JhbVN5bmMgfSBmcm9tIFwiQC9jb3JlL0ZpbmRQcm9ncmFtXCI7XG5pbXBvcnQgeyBTY29wZUhlbHBlciwgVmFyaWFibGVNYXAgfSBmcm9tIFwiQC9jb3JlL1Njb3BlXCI7XG5pbXBvcnQgeyBTeXN0ZW1TY29wZSB9IGZyb20gXCJAL2NvcmUvU3lzdGVtU2NvcGVcIjtcbmltcG9ydCB7IEZpbGVQYXRoLCBMb2NhdG9yIH0gZnJvbSBcIkAvdXRpbHMvTG9jYXRvclwiO1xuaW1wb3J0IHsgaW1wb3J0TW9kdWxlIH0gZnJvbSBcIkAvdXRpbHMvTW9kdWxlXCI7XG5pbXBvcnQgeyBNYWluVGFyZ2V0LCBQb3N0VGFyZ2V0IH0gZnJvbSBcIkAvY29yZS9UYXJnZXRcIjtcbmltcG9ydCB7IEN1c3RvbVNjcmlwdCwgUG9zdEN1c3RvbVNjcmlwdCB9IGZyb20gXCJAL2NvcmUvQ3VzdG9tU2NyaXB0XCI7XG5pbXBvcnQgeyBJbnN0YWxsRW50aXR5IH0gZnJvbSBcIkAvY29yZS9JbnN0YWxsRW50aXR5XCI7XG5pbXBvcnQgeyBUYXJnZXROYW1lIH0gZnJvbSBcIkAvY29yZS9UYXJnZXROYW1lXCI7XG5pbXBvcnQgeyBMb2dnZXIgfSBmcm9tIFwiQC9sb2dnZXJcIjtcblxuY29uc3QgbG9nZ2VyID0gTG9nZ2VyLmNyZWF0ZShpbXBvcnQubWV0YS51cmwpO1xuXG5leHBvcnQgYWJzdHJhY3QgY2xhc3MgR2VuZXJhbENvbnRleHQgaW1wbGVtZW50cyBJR2VuZXJhbENvbnRleHQge1xuICBwcm90ZWN0ZWQgX3Njb3BlOiBWYXJpYWJsZU1hcDtcblxuICBjb25zdHJ1Y3RvcihzY29wZTogVmFyaWFibGVNYXApIHtcbiAgICB0aGlzLl9zY29wZSA9IHNjb3BlO1xuICB9XG5cbiAgcHVibGljIGZpbmRQcm9ncmFtKG5hbWU6IHN0cmluZyk6IHN0cmluZyB8IHVuZGVmaW5lZCB7XG4gICAgcmV0dXJuIGZpbmRQcm9ncmFtU3luYyhuYW1lKTtcbiAgfVxuXG4gIHB1YmxpYyBnZXRQcm9wZXJ0eSh0aGlzOiBhbnksIG5hbWU6IHN0cmluZyk6IGFueSB7XG4gICAgcmV0dXJuIFNjb3BlSGVscGVyLmdldCh0aGlzLl9zY29wZSwgbmFtZSk7XG4gIH1cblxuICBwdWJsaWMgc2V0UHJvcGVydHkodGhpczogYW55LCBuYW1lOiBzdHJpbmcsIHZhbHVlOiBhbnkpOiBhbnkge1xuICAgIGNvbnN0IGVudHJ5ID0gdGhpcy5fc2NvcGVbbmFtZV07XG4gICAgaWYgKGVudHJ5KVxuICAgICAgU2NvcGVIZWxwZXIuc2V0RW50cnlWYWx1ZShlbnRyeSwgdmFsdWUpO1xuICAgIGVsc2VcbiAgICAgIFNjb3BlSGVscGVyLmRlZmluZVZhcmlhYmxlKHRoaXMuX3Njb3BlLCBcIlwiLCBuYW1lLCB7dmFsdWV9KTtcbiAgICByZXR1cm4gdHJ1ZTtcbiAgfVxuXG4gIHB1YmxpYyBoYXNQcm9wZXJ0eSh0aGlzOiBhbnksIG5hbWU6IHN0cmluZyk6IGJvb2xlYW4ge1xuICAgIHJldHVybiBPYmplY3QuaGFzT3duKHRoaXMuX3Njb3BlLCBuYW1lKTtcbiAgfVxuXG4gIHB1YmxpYyBkZWxldGVQcm9wZXJ0eSh0aGlzOiBhbnksIG5hbWU6IHN0cmluZyk6IGJvb2xlYW4ge1xuICAgIHJldHVybiBkZWxldGUgdGhpcy5fc2NvcGVbbmFtZV07XG4gIH1cblxuICBwdWJsaWMgZ2V0UHJvcGVydHlOYW1lcyh0aGlzOiBhbnkpOiBzdHJpbmdbXSB7XG4gICAgcmV0dXJuIE9iamVjdC5rZXlzKHRoaXMuX3Njb3BlKTtcbiAgfVxufTtcblxuZXhwb3J0IGFic3RyYWN0IGNsYXNzIE1ha2VDb250ZXh0IHtcbiAgcHJpdmF0ZSBfdGFyZ2V0cyA9IG5ldyBNYXA8c3RyaW5nLCBNYWluVGFyZ2V0PjtcbiAgcHJpdmF0ZSBfcG9zdFRhcmdldHMgPSBuZXcgTWFwPHN0cmluZywgUG9zdFRhcmdldD47XG4gIHByaXZhdGUgX21haW5TY3JpcHRzID0gbmV3IE1hcDxzdHJpbmcsIEN1c3RvbVNjcmlwdD47XG4gIHByaXZhdGUgX3Bvc3RTY3JpcHRzID0gbmV3IE1hcDxzdHJpbmcsIFBvc3RDdXN0b21TY3JpcHQ+O1xuICBwcml2YXRlIF9pbnN0YWxsTGlzdCA9IG5ldyBBcnJheTxJbnN0YWxsRW50aXR5PigpO1xuXG4gIHByb3RlY3RlZCBjb25zdHJ1Y3RvcigpIHtcbiAgfVxuXG4gIGFic3RyYWN0IGV4ZWN1dGVTY3JpcHQoc2NvcGU6IFZhcmlhYmxlTWFwLCBzY3JpcHQ6IGFueSwgcGFyYW1zOiBhbnkpOiBhbnk7XG4gIGFic3RyYWN0IGxvYWRKU09OKHVybDogc3RyaW5nKTogYW55O1xuICBhYnN0cmFjdCBhZGRTdWJkaXJlY3Rvcnkoc2NvcGU6IFZhcmlhYmxlTWFwLCBzb3VyY2VEaXI6IHN0cmluZyB8IExvY2F0b3IsIGJpbmFyeURpcj86IHN0cmluZyB8IExvY2F0b3IpOiB2b2lkO1xuXG4gIHB1YmxpYyBnZXQgdGFyZ2V0cygpIHtcbiAgICByZXR1cm4gdGhpcy5fdGFyZ2V0cztcbiAgfVxuXG4gIHB1YmxpYyBnZXQgcG9zdFRhcmdldHMoKSB7XG4gICAgcmV0dXJuIHRoaXMuX3Bvc3RUYXJnZXRzO1xuICB9XG5cbiAgcHVibGljIGdldCBtYWluU2NyaXB0cygpIHtcbiAgICByZXR1cm4gdGhpcy5fbWFpblNjcmlwdHM7XG4gIH1cblxuICBwdWJsaWMgZ2V0IHBvc3RTY3JpcHRzKCkge1xuICAgIHJldHVybiB0aGlzLl9wb3N0U2NyaXB0cztcbiAgfVxuXG4gIHB1YmxpYyBnZXQgaW5zdGFsbExpc3QoKSB7XG4gICAgcmV0dXJuIHRoaXMuX2luc3RhbGxMaXN0O1xuICB9XG5cbiAgcHVibGljIGdldFBvc3RUYXJnZXQobmFtZTogc3RyaW5nKTogUG9zdFRhcmdldCB7XG4gICAgbGV0IHRhcmdldCA9IHRoaXMuX3Bvc3RUYXJnZXRzLmdldChuYW1lKTtcbiAgICBpZiAoIXRhcmdldCkge1xuICAgICAgdGFyZ2V0ID0gUG9zdFRhcmdldC5jcmVhdGUobmFtZSlcbiAgICAgIHRoaXMuX3Bvc3RUYXJnZXRzLnNldChuYW1lLCB0YXJnZXQpO1xuICAgIH1cbiAgICByZXR1cm4gdGFyZ2V0O1xuICB9XG5cbiAgcHVibGljIGhhc01haW5UYXJnZXQobmFtZTogc3RyaW5nKSB7XG4gICAgcmV0dXJuIHRoaXMuX3RhcmdldHMuaGFzKG5hbWUpO1xuICB9XG5cbiAgcHVibGljIGFkZE1haW5UYXJnZXQobmFtZTogc3RyaW5nLCB0YXJnZXQ6IE1haW5UYXJnZXQpIHtcbiAgICB0aGlzLl90YXJnZXRzLnNldChuYW1lLCB0YXJnZXQpO1xuICB9XG5cbiAgcHVibGljIHNjcmlwdChuYW1lOiBzdHJpbmcpOiBQb3N0Q3VzdG9tU2NyaXB0IHtcbiAgICBsZXQgc2NyaXB0ID0gdGhpcy5fcG9zdFNjcmlwdHMuZ2V0KG5hbWUpO1xuICAgIGlmICghc2NyaXB0KSB7XG4gICAgICBzY3JpcHQgPSBQb3N0Q3VzdG9tU2NyaXB0LmNyZWF0ZShuYW1lKVxuICAgICAgdGhpcy5fcG9zdFNjcmlwdHMuc2V0KG5hbWUsIHNjcmlwdCk7XG4gICAgfVxuICAgIHJldHVybiBzY3JpcHQ7XG4gIH1cblxuICBwdWJsaWMgYWRkQ3VzdG9tU2NyaXB0KG9wdGlvbnM6IEN1c3RvbVNjcmlwdC5PcHRpb25zKTogQ3VzdG9tU2NyaXB0IHtcbiAgICBjb25zdCB0YXJnZXQgPSBDdXN0b21TY3JpcHQuY3JlYXRlKG9wdGlvbnMpO1xuICAgIHRoaXMuX21haW5TY3JpcHRzLnNldChvcHRpb25zLm5hbWUsIHRhcmdldCk7XG4gICAgcmV0dXJuIHRhcmdldDtcbiAgfVxuXG4gIHB1YmxpYyBhZGRJbnN0YWxsRW50cnkodmFsdWU6IEZpbGVQYXRoIHwgVGFyZ2V0TmFtZSwgZGVzdGluYXRpb246IExvY2F0b3IsIGJhc2VEaXI/OiBMb2NhdG9yKTogdm9pZCB7XG4gICAgY29uc3QgZW50aXR5ID0gbmV3IEluc3RhbGxFbnRpdHkodmFsdWUsIGRlc3RpbmF0aW9uLCBiYXNlRGlyKTtcbiAgICB0aGlzLl9pbnN0YWxsTGlzdC5wdXNoKGVudGl0eSk7XG4gIH1cbn07XG5cbmV4cG9ydCBmdW5jdGlvbiBjcmVhdGVDb250ZXh0PFQgZXh0ZW5kcyBJR2VuZXJhbENvbnRleHQ+KGN0eDogVCk6IFQgJiBTeXN0ZW1TY29wZSB7XG4gIGNvbnN0IGhhbmRsZXI6IFByb3h5SGFuZGxlcjxUPiA9IHtcbiAgICBnZXQodGFyZ2V0OiBULCBuYW1lOiBzdHJpbmcsIHJlY2VpdmVyOiBhbnkpIHtcbiAgICAgIGlmIChuYW1lIGluIHRhcmdldClcbiAgICAgICAgcmV0dXJuICh0YXJnZXQgYXMgYW55KVtuYW1lXTtcbiAgICAgIHJldHVybiB0YXJnZXQuZ2V0UHJvcGVydHkobmFtZSk7XG4gICAgfSxcbiAgICBzZXQodGFyZ2V0OiBULCBuYW1lOiBzdHJpbmcsIHZhbHVlOiBhbnkpOiBib29sZWFuIHtcbiAgICAgIHRhcmdldC5zZXRQcm9wZXJ0eShuYW1lLCB2YWx1ZSk7XG4gICAgICByZXR1cm4gdHJ1ZTtcbiAgICB9LFxuICAgIGhhcyh0YXJnZXQ6IFQsIG5hbWU6IHN0cmluZykge1xuICAgICAgcmV0dXJuIG5hbWUgaW4gdGFyZ2V0IHx8IHRhcmdldC5oYXNQcm9wZXJ0eShuYW1lKTtcbiAgICB9LFxuICAgIG93bktleXModGFyZ2V0OiBUKSB7XG4gICAgICByZXR1cm4gdGFyZ2V0LmdldFByb3BlcnR5TmFtZXMoKTtcbiAgICB9LFxuICAgIGRlbGV0ZVByb3BlcnR5KHRhcmdldDogVCwgbmFtZTogc3RyaW5nKSB7XG4gICAgICByZXR1cm4gdGFyZ2V0LmRlbGV0ZVByb3BlcnR5KG5hbWUpO1xuICAgIH0sXG4gICAgZ2V0T3duUHJvcGVydHlEZXNjcmlwdG9yKHRhcmdldDogVCwgbmFtZTogc3RyaW5nKTogUHJvcGVydHlEZXNjcmlwdG9yIHwgdW5kZWZpbmVkIHtcbiAgICAgIGlmICh0YXJnZXQuaGFzUHJvcGVydHkobmFtZSkpIHtcbiAgICAgICAgY29uc3QgdmFsdWUgPSB0YXJnZXQuZ2V0UHJvcGVydHkobmFtZSk7XG4gICAgICAgIHJldHVybiB7IHZhbHVlLCB3cml0YWJsZTogdHJ1ZSwgZW51bWVyYWJsZTogdHJ1ZSwgY29uZmlndXJhYmxlOiB0cnVlIH07XG4gICAgICB9XG4gICAgICByZXR1cm4gdW5kZWZpbmVkO1xuICAgIH0sXG4gIH07XG4gIHJldHVybiBuZXcgUHJveHkoY3R4LCBoYW5kbGVyKSBhcyBUICYgU3lzdGVtU2NvcGU7XG59XG5cbmV4cG9ydCBhc3luYyBmdW5jdGlvbiBwZXJmb3JtQ29udGV4dChtazogSUdlbmVyYWxDb250ZXh0ICYgU3lzdGVtU2NvcGUpIHtcbiAgY29uc3Qgc2NyaXB0VXJsID0gbWsuU0NSSVBUX0ZJTEUudG9KU09OKCk7XG4gIGNvbnN0IG1vZHVsZSA9IGF3YWl0IGltcG9ydE1vZHVsZShzY3JpcHRVcmwpO1xuICBpZiAoIW1vZHVsZS5kZWZhdWx0KVxuICAgIHRocm93IG5ldyBFcnJvcihgU2NyaXB0ICR7c2NyaXB0VXJsfSBoYXMgbm90IGNvbnRhaW4gYSBkZWZhdWx0IGZ1bmN0aW9uYCk7XG5cbiAgY29uc3QgcmVzdWx0ID0gbW9kdWxlLmRlZmF1bHQobWspO1xuICBpZiAocmVzdWx0IGluc3RhbmNlb2YgUHJvbWlzZSlcbiAgICBhd2FpdCByZXN1bHQ7XG59XG5cbmV4cG9ydCBmdW5jdGlvbiBjcmVhdGVWYXJpYWJsZU1hcEZvckRpcmVjdG9yeSh2YXJpYWJsZU1hcDogVmFyaWFibGVNYXAsIHNvdXJjZURpcjogYW55LCBiaW5hcnlEaXI/OiBhbnkpOiBWYXJpYWJsZU1hcCB7XG4gIGlmIChiaW5hcnlEaXIgPT09IHVuZGVmaW5lZCkge1xuICAgIGlmICghTG9jYXRvci5pc0Fic29sdXRlKHNvdXJjZURpcikpXG4gICAgICBiaW5hcnlEaXIgPSBzb3VyY2VEaXI7XG4gICAgZWxzZSB7XG4gICAgICBjb25zdCBiaW5hcnlEaXIxID0gU2NvcGVIZWxwZXIuZ2V0KHZhcmlhYmxlTWFwLCBcIlBST0pFQ1RfQklOQVJZX0RJUlwiKS5yZWxhdGl2ZShzb3VyY2VEaXIpO1xuICAgICAgY29uc3QgYmluYXJ5RGlyMiA9IFNjb3BlSGVscGVyLmdldCh2YXJpYWJsZU1hcCwgXCJQUk9KRUNUX1NPVVJDRV9ESVJcIikucmVsYXRpdmUoc291cmNlRGlyKTtcbiAgICAgIGJpbmFyeURpciA9IChiaW5hcnlEaXIxLmxlbmd0aCA+IGJpbmFyeURpcjIubGVuZ3RoKSA/IGJpbmFyeURpcjIgOiBiaW5hcnlEaXIxO1xuICAgIH1cbiAgfVxuXG4gIGNvbnN0IFNPVVJDRV9ESVIgPSBTY29wZUhlbHBlci5nZXQodmFyaWFibGVNYXAsIFwiU09VUkNFX0RJUlwiKS5yZXNvbHZlKHNvdXJjZURpcik7XG4gIGNvbnN0IEJJTkFSWV9ESVIgPSBTY29wZUhlbHBlci5nZXQodmFyaWFibGVNYXAsIFwiQklOQVJZX0RJUlwiKS5yZXNvbHZlKGJpbmFyeURpcik7XG5cbiAgY29uc3QgbmV3VmFyaWFibGVNYXAgPSBTY29wZUhlbHBlci5jbG9uZVZhcmlhYmxlTWFwKHZhcmlhYmxlTWFwKTtcblxuICBTY29wZUhlbHBlci5zZXQobmV3VmFyaWFibGVNYXAsIFwiU09VUkNFX0RJUlwiLCBTT1VSQ0VfRElSKTtcbiAgU2NvcGVIZWxwZXIuc2V0KG5ld1ZhcmlhYmxlTWFwLCBcIkJJTkFSWV9ESVJcIiwgQklOQVJZX0RJUik7XG4gIFNjb3BlSGVscGVyLnJlc2V0KG5ld1ZhcmlhYmxlTWFwLCBcIlNDUklQVF9ESVJcIik7XG4gIFNjb3BlSGVscGVyLnJlc2V0KG5ld1ZhcmlhYmxlTWFwLCBcIlNDUklQVF9GSUxFXCIpO1xuXG4gIHJldHVybiBuZXdWYXJpYWJsZU1hcDtcbn1cbiIsIi8qXG4gKiBNSVQgTGljZW5zZVxuICpcbiAqIENvcHlyaWdodCAoYykgMjAyNSAgWXVyaWkgWWFrdWJpbiAoeXVyaWkueWFrdWJpbkBnbWFpbC5jb20pXG4gKlxuICogUGVybWlzc2lvbiBpcyBncmFudGVkIHRvIHVzZSwgY29weSwgbW9kaWZ5LCBhbmQgZGlzdHJpYnV0ZSB0aGlzIHNvZnR3YXJlXG4gKiB1bmRlciB0aGUgTUlUIExpY2Vuc2UuIFNlZSBMSUNFTlNFIGZpbGUgZm9yIGRldGFpbHMuXG4gKi9cblxuaW1wb3J0IGZzIGZyb20gXCJub2RlOmZzXCI7XG5cbmltcG9ydCB7IGdlbmVyYXRlZFNjcmlwdE5hbWVDb21tZW50IH0gZnJvbSBcIkAvY3h4XCI7XG5cbmV4cG9ydCBkZWZhdWx0IGFzeW5jIGZ1bmN0aW9uKG1rOiBhbnkpIHtcbiAgY29uc3QgbGluZXMgPSBbXTtcblxuICBsaW5lcy5wdXNoKGdlbmVyYXRlZFNjcmlwdE5hbWVDb21tZW50KGltcG9ydC5tZXRhLmZpbGVuYW1lKSk7XG4gIGxpbmVzLnB1c2goXCJcIik7XG5cbiAgZm9yIChjb25zdCBbbmFtZSwgZW50cnldIG9mIE9iamVjdC5lbnRyaWVzKG1rLlNDUklQVF9JTlBVVCkgYXMgYW55KSB7XG4gICAgaWYgKGVudHJ5LmRlc2NyaXB0aW9uKSB7XG4gICAgICBsaW5lcy5wdXNoKGAvKiAke2VudHJ5LmRlc2NyaXB0aW9ufSAqL2ApO1xuICAgIH1cbiAgICBpZiAodHlwZW9mIGVudHJ5LnZhbHVlID09PSBcImJvb2xlYW5cIikge1xuICAgICAgbGluZXMucHVzaChgI2RlZmluZSAke25hbWV9ICR7ZW50cnkudmFsdWUgPyAxIDogMH1gKTtcbiAgICB9XG4gICAgZWxzZSBpZiAodHlwZW9mIGVudHJ5LnZhbHVlID09PSBcIm51bWJlclwiKSB7XG4gICAgICBsaW5lcy5wdXNoKGAjZGVmaW5lICR7bmFtZX0gJHtlbnRyeS52YWx1ZX1gKTtcbiAgICB9XG4gICAgZWxzZSBpZiAodHlwZW9mIGVudHJ5LnZhbHVlID09PSBcInN0cmluZ1wiKSB7XG4gICAgICBsaW5lcy5wdXNoKGAjZGVmaW5lICR7bmFtZX0gXCIke2VudHJ5LnZhbHVlfVwiYCk7XG4gICAgfVxuICAgIGVsc2UgaWYgKEFycmF5LmlzQXJyYXkoZW50cnkudmFsdWUpKSB7XG4gICAgICBsaW5lcy5wdXNoKGAjZGVmaW5lICR7bmFtZX0gXCIke2VudHJ5LnZhbHVlLmpvaW4oXCI7XCIpfVwiYCk7XG4gICAgfVxuICAgIGVsc2Uge1xuICAgICAgdGhyb3cgbmV3IEVycm9yKGBcIiR7bmFtZX1cIiBoYXMgJHtlbnRyeS52YWx1ZX0gdmFsdWVgKTtcbiAgICB9XG4gICAgbGluZXMucHVzaChcIlwiKTtcbiAgfVxuXG4gIGF3YWl0IGZzLnByb21pc2VzLm1rZGlyKG1rLlNDUklQVF9PVVRQVVQuZGlybmFtZSgpLnRvU3RyaW5nKCksIHsgcmVjdXJzaXZlOiB0cnVlIH0pO1xuICBhd2FpdCBmcy5wcm9taXNlcy53cml0ZUZpbGUobWsuU0NSSVBUX09VVFBVVC50b1N0cmluZygpLCBsaW5lcy5qb2luKFwiXFxuXCIpLCBcInV0Zi04XCIpO1xufVxuIiwiLypcbiAqIE1JVCBMaWNlbnNlXG4gKlxuICogQ29weXJpZ2h0IChjKSAyMDI1ICBZdXJpaSBZYWt1YmluICh5dXJpaS55YWt1YmluQGdtYWlsLmNvbSlcbiAqXG4gKiBQZXJtaXNzaW9uIGlzIGdyYW50ZWQgdG8gdXNlLCBjb3B5LCBtb2RpZnksIGFuZCBkaXN0cmlidXRlIHRoaXMgc29mdHdhcmVcbiAqIHVuZGVyIHRoZSBNSVQgTGljZW5zZS4gU2VlIExJQ0VOU0UgZmlsZSBmb3IgZGV0YWlscy5cbiAqL1xuXG5pbXBvcnQgZnMgZnJvbSBcIm5vZGU6ZnNcIjtcblxuZXhwb3J0IGRlZmF1bHQgYXN5bmMgZnVuY3Rpb24obWs6IGFueSkge1xuICBsZXQgY29udGVudCA9IGF3YWl0IGZzLnByb21pc2VzLnJlYWRGaWxlKG1rLlNDUklQVF9JTlBVVC50b1N0cmluZygpLCBcInV0Zi04XCIpO1xuICBjb250ZW50ID0gY29udGVudC5yZXBsYWNlKC9AKFtfQS1aYS16XVtfQS1aYS16MC05XSspQC9nLCAobWF0Y2gsIHYxKSA9PiB7XG4gICAgY29uc3QgcmVzID0gbWtbdjFdIHx8IFwiXCI7XG4gICAgaWYgKEFycmF5LmlzQXJyYXkocmVzKSlcbiAgICAgIHJldHVybiByZXMuam9pbihcIlxcblwiKTtcbiAgICByZXR1cm4gcmVzLnRvU3RyaW5nKCk7XG4gIH0pO1xuICBjb250ZW50ID0gY29udGVudC5yZXBsYWNlKC8jY21ha2VkZWZpbmUgKyhbX0EtWmEtel1bX0EtWmEtejAtOV0rKSAqKC4qKS9nLCAobWF0Y2gsIHYxLCB2MikgPT4ge1xuICAgIHJldHVybiBta1t2MV0gPyBgI2RlZmluZSAke3YxfSAke3YyfWAgOiBgLyogI3VuZGVmICR7djF9ICovYDtcbiAgfSk7XG4gIGF3YWl0IGZzLnByb21pc2VzLm1rZGlyKG1rLlNDUklQVF9PVVRQVVQuZGlybmFtZSgpLnRvU3RyaW5nKCksIHsgcmVjdXJzaXZlOiB0cnVlIH0pO1xuICBhd2FpdCBmcy5wcm9taXNlcy53cml0ZUZpbGUobWsuU0NSSVBUX09VVFBVVC50b1N0cmluZygpLCBjb250ZW50LCBcInV0Zi04XCIpO1xufVxuIiwiLypcbiAqIE1JVCBMaWNlbnNlXG4gKlxuICogQ29weXJpZ2h0IChjKSAyMDI1ICBZdXJpaSBZYWt1YmluICh5dXJpaS55YWt1YmluQGdtYWlsLmNvbSlcbiAqXG4gKiBQZXJtaXNzaW9uIGlzIGdyYW50ZWQgdG8gdXNlLCBjb3B5LCBtb2RpZnksIGFuZCBkaXN0cmlidXRlIHRoaXMgc29mdHdhcmVcbiAqIHVuZGVyIHRoZSBNSVQgTGljZW5zZS4gU2VlIExJQ0VOU0UgZmlsZSBmb3IgZGV0YWlscy5cbiAqL1xuXG5pbXBvcnQgY29uZmlndXJlX2ZpbGUgZnJvbSBcIkAvY29yZS9CdWlsdGluU2NyaXB0cy9jb25maWd1cmVfZmlsZVwiO1xuaW1wb3J0IGNfaGVhZGVyIGZyb20gXCJAL2NvcmUvQnVpbHRpblNjcmlwdHMvY19oZWFkZXJcIjtcblxuZXhwb3J0IGRlZmF1bHQge1xuICBjb25maWd1cmVfZmlsZSxcbiAgY19oZWFkZXIsXG59O1xuIiwiLypcbiAqIE1JVCBMaWNlbnNlXG4gKlxuICogQ29weXJpZ2h0IChjKSAyMDI1ICBZdXJpaSBZYWt1YmluICh5dXJpaS55YWt1YmluQGdtYWlsLmNvbSlcbiAqXG4gKiBQZXJtaXNzaW9uIGlzIGdyYW50ZWQgdG8gdXNlLCBjb3B5LCBtb2RpZnksIGFuZCBkaXN0cmlidXRlIHRoaXMgc29mdHdhcmVcbiAqIHVuZGVyIHRoZSBNSVQgTGljZW5zZS4gU2VlIExJQ0VOU0UgZmlsZSBmb3IgZGV0YWlscy5cbiAqL1xuXG5pbXBvcnQgeyBJbnRlcmZhY2VTY3JpcHQgfSBmcm9tIFwiQC9jb3JlL01ha2VJbnRlcmZhY2VzXCI7XG5pbXBvcnQgeyBMb2NhdG9yIH0gZnJvbSBcIkAvdXRpbHMvTG9jYXRvclwiO1xuaW1wb3J0IHsgU2NvcGVIZWxwZXIsIFZhcmlhYmxlTWFwLCBWYXJpYW50TWFwIH0gZnJvbSBcIkAvY29yZS9TY29wZVwiO1xuaW1wb3J0IHsgU2ltcGxlT2JqZWN0IH0gZnJvbSBcIkAvY29yZS9TaW1wbGVPYmplY3RcIjtcblxuZXhwb3J0IGNsYXNzIFBvc3RDdXN0b21TY3JpcHQgZXh0ZW5kcyBJbnRlcmZhY2VTY3JpcHQge1xuICBwcml2YXRlIF9uYW1lOiBzdHJpbmc7XG4gIHByaXZhdGUgX3ZhcmlhYmxlczogVmFyaWFudE1hcDtcblxuICBwcml2YXRlIGNvbnN0cnVjdG9yKG5hbWU6IHN0cmluZywgdmFyaWFibGVzPzogVmFyaWFudE1hcCkge1xuICAgIHN1cGVyKCk7XG4gICAgdGhpcy5fbmFtZSA9IG5hbWU7XG4gICAgdGhpcy5fdmFyaWFibGVzID0gdmFyaWFibGVzIHx8IHt9O1xuICB9XG5cbiAgcHVibGljIHN0YXRpYyBjcmVhdGUobmFtZTogc3RyaW5nLCB2YXJpYWJsZXM/OiBWYXJpYW50TWFwKSB7XG4gICAgcmV0dXJuIE9iamVjdC5zZWFsKG5ldyBQb3N0Q3VzdG9tU2NyaXB0KG5hbWUsIHZhcmlhYmxlcykpO1xuICB9XG5cbiAgcHVibGljIGdldCBuYW1lKCkge1xuICAgIHJldHVybiB0aGlzLl9uYW1lO1xuICB9XG5cbiAgcHVibGljIGdldCB2YXJpYWJsZXMoKSB7XG4gICAgcmV0dXJuIHRoaXMuX3ZhcmlhYmxlcztcbiAgfVxuXG4gIHB1YmxpYyBtZXJnZVZhcmlhYmxlcyh2YXJpYWJsZXM6IFZhcmlhbnRNYXApIHtcbiAgICBTY29wZUhlbHBlci5tZXJnZVZhcmlhYmxlcyh0aGlzLl92YXJpYWJsZXMsIHZhcmlhYmxlcyk7XG4gIH1cblxuICBwdWJsaWMgc3RhdGljIGZyb21KU09OKGpzb246IGFueSkge1xuICAgIHJldHVybiBQb3N0Q3VzdG9tU2NyaXB0LmNyZWF0ZShqc29uLm5hbWUsIGpzb24udmFyaWFibGVzKTtcbiAgfVxuXG4gIHB1YmxpYyB0b0pTT04oKTogU2ltcGxlT2JqZWN0IHtcbiAgICByZXR1cm4ge1xuICAgICAgdHlwZTogUG9zdEN1c3RvbVNjcmlwdC5uYW1lLFxuICAgICAgbmFtZTogdGhpcy5fbmFtZSxcbiAgICAgIHZhcmlhYmxlczogdGhpcy5fdmFyaWFibGVzLFxuICAgIH07XG4gIH1cbiAgXG4gIHB1YmxpYyB0b1N0cmluZygpOiBzdHJpbmcge1xuICAgIHJldHVybiBgW29iamVjdCAke1Bvc3RDdXN0b21TY3JpcHQubmFtZX1dYDtcbiAgfVxufTtcblxuZXhwb3J0IGNsYXNzIEN1c3RvbVNjcmlwdCBleHRlbmRzIEludGVyZmFjZVNjcmlwdCB7XG4gIHByaXZhdGUgX25hbWU6IHN0cmluZztcbiAgcHJpdmF0ZSBfc2NyaXB0TW9kdWxlOiBzdHJpbmcgfCBMb2NhdG9yO1xuICBwcml2YXRlIF9pbnB1dD86IExvY2F0b3I7XG4gIHByaXZhdGUgX291dHB1dDogTG9jYXRvcjtcbiAgcHJpdmF0ZSBfc291cmNlRGlyOiBMb2NhdG9yO1xuICBwcml2YXRlIF9iaW5hcnlEaXI6IExvY2F0b3I7XG4gIHByaXZhdGUgX3ZhcmlhYmxlTWFwOiBWYXJpYWJsZU1hcDtcblxuICBwcml2YXRlIGNvbnN0cnVjdG9yKG9wdGlvbnM6IEN1c3RvbVNjcmlwdC5PcHRpb25zKSB7XG4gICAgc3VwZXIoKTtcbiAgICB0aGlzLl92YXJpYWJsZU1hcCA9IG9wdGlvbnMudmFyaWFibGVNYXA7XG4gICAgdGhpcy5fbmFtZSA9IG9wdGlvbnMubmFtZTtcbiAgICB0aGlzLl9pbnB1dCA9IG9wdGlvbnMuaW5wdXQ7XG4gICAgdGhpcy5fc2NyaXB0TW9kdWxlID0gb3B0aW9ucy5zY3JpcHRNb2R1bGU7XG4gICAgdGhpcy5fb3V0cHV0ID0gb3B0aW9ucy5vdXRwdXQ7XG4gICAgdGhpcy5fc291cmNlRGlyID0gb3B0aW9ucy5zb3VyY2VEaXI7XG4gICAgdGhpcy5fYmluYXJ5RGlyID0gb3B0aW9ucy5iaW5hcnlEaXI7XG4gIH1cblxuICBwdWJsaWMgc3RhdGljIGNyZWF0ZShvcHRpb25zOiBDdXN0b21TY3JpcHQuT3B0aW9ucyk6IEN1c3RvbVNjcmlwdCB7XG4gICAgcmV0dXJuIE9iamVjdC5zZWFsKG5ldyBDdXN0b21TY3JpcHQob3B0aW9ucykpO1xuICB9XG5cbiAgcHVibGljIG1lcmdlVmFyaWFibGVzKHZhcmlhYmxlczogVmFyaWFudE1hcCkge1xuICAgIFNjb3BlSGVscGVyLm1lcmdlVmFyaWFibGVNYXAodGhpcy5fdmFyaWFibGVNYXAsIHZhcmlhYmxlcyk7XG4gIH1cblxuICBwdWJsaWMgZ2V0IE5BTUUoKSB7XG4gICAgcmV0dXJuIHRoaXMuX25hbWU7XG4gIH1cblxuICBwdWJsaWMgZ2V0IHNjcmlwdE1vZHVsZSgpIHtcbiAgICByZXR1cm4gdGhpcy5fc2NyaXB0TW9kdWxlO1xuICB9XG5cbiAgcHVibGljIGdldCBJTlBVVCgpOiBMb2NhdG9yIHwgdW5kZWZpbmVkIHtcbiAgICByZXR1cm4gdGhpcy5faW5wdXQ7XG4gIH1cblxuICBwdWJsaWMgZ2V0IE9VVFBVVCgpOiBMb2NhdG9yIHtcbiAgICByZXR1cm4gdGhpcy5fb3V0cHV0O1xuICB9XG5cbiAgcHVibGljIGdldCBzb3VyY2VEaXIoKTogTG9jYXRvciB7XG4gICAgcmV0dXJuIHRoaXMuX3NvdXJjZURpcjtcbiAgfVxuXG4gIHB1YmxpYyBnZXQgYmluYXJ5RGlyKCk6IExvY2F0b3Ige1xuICAgIHJldHVybiB0aGlzLl9iaW5hcnlEaXI7XG4gIH1cblxuICBwdWJsaWMgZ2V0IHZhcmlhYmxlTWFwKCkge1xuICAgIHJldHVybiB0aGlzLl92YXJpYWJsZU1hcDtcbiAgfVxuXG4gIHB1YmxpYyBwb3N0VXBkYXRlKHNjcmlwdDogUG9zdEN1c3RvbVNjcmlwdCkge1xuICAgIHRoaXMubWVyZ2VWYXJpYWJsZXMoc2NyaXB0LnZhcmlhYmxlcyk7XG4gIH1cblxuICBwdWJsaWMgc3RhdGljIGZyb21KU09OKGpzb246IGFueSkge1xuICAgIGNvbnN0IG9wdGlvbnM6IEN1c3RvbVNjcmlwdC5PcHRpb25zID0ge1xuICAgICAgdmFyaWFibGVNYXA6IFNjb3BlSGVscGVyLmZyb21KU09OKGpzb24udmFyaWFibGVNYXApLFxuICAgICAgbmFtZToganNvbi5uYW1lLFxuICAgICAgc2NyaXB0TW9kdWxlOiBMb2NhdG9yLmlzQWJzb2x1dGUoanNvbi5zY3JpcHRNb2R1bGUpID8gTG9jYXRvci5jcmVhdGUoanNvbi5zY3JpcHRNb2R1bGUpIDoganNvbi5zY3JpcHRNb2R1bGUsXG4gICAgICBvdXRwdXQ6IExvY2F0b3IuY3JlYXRlKGpzb24ub3V0cHV0KSxcbiAgICAgIHNvdXJjZURpcjogTG9jYXRvci5jcmVhdGUoanNvbi5zb3VyY2VEaXIpLFxuICAgICAgYmluYXJ5RGlyOiBMb2NhdG9yLmNyZWF0ZShqc29uLmJpbmFyeURpciksXG4gICAgfTtcbiAgICBpZiAoanNvbi5pbnB1dCkge1xuICAgICAgb3B0aW9ucy5pbnB1dCA9IExvY2F0b3IuY3JlYXRlKGpzb24uaW5wdXQpO1xuICAgIH1cbiAgICByZXR1cm4gQ3VzdG9tU2NyaXB0LmNyZWF0ZShvcHRpb25zKTtcbiAgfVxuXG4gIHB1YmxpYyB0b0pTT04oKTogU2ltcGxlT2JqZWN0IHtcbiAgICBjb25zdCByZXN1bHQ6IFNpbXBsZU9iamVjdCA9IHtcbiAgICAgIHR5cGU6IEN1c3RvbVNjcmlwdC5uYW1lLFxuICAgICAgbmFtZTogdGhpcy5fbmFtZSxcbiAgICAgIHNjcmlwdE1vZHVsZTogdGhpcy5fc2NyaXB0TW9kdWxlLFxuICAgICAgb3V0cHV0OiB0aGlzLl9vdXRwdXQudG9VUkxTdHJpbmcoKSxcbiAgICAgIHNvdXJjZURpcjogdGhpcy5fc291cmNlRGlyLnRvVVJMU3RyaW5nKCksXG4gICAgICBiaW5hcnlEaXI6IHRoaXMuX2JpbmFyeURpci50b1VSTFN0cmluZygpLFxuICAgICAgdmFyaWFibGVNYXA6IFNjb3BlSGVscGVyLnRvSlNPTih0aGlzLl92YXJpYWJsZU1hcCksXG4gICAgfTtcbiAgICBpZiAodGhpcy5faW5wdXQpIHtcbiAgICAgIHJlc3VsdC5pbnB1dCA9IHRoaXMuX2lucHV0LnRvVVJMU3RyaW5nKCk7XG4gICAgfVxuICAgIHJldHVybiByZXN1bHQ7XG4gIH1cbn07XG5cbmV4cG9ydCBuYW1lc3BhY2UgQ3VzdG9tU2NyaXB0IHtcblxuZXhwb3J0IGludGVyZmFjZSBPcHRpb25zIHtcbiAgbmFtZTogc3RyaW5nLFxuICBzY3JpcHRNb2R1bGU6IHN0cmluZyB8IExvY2F0b3IsXG4gIGlucHV0PzogTG9jYXRvcixcbiAgb3V0cHV0OiBMb2NhdG9yLFxuICBzb3VyY2VEaXI6IExvY2F0b3IsXG4gIGJpbmFyeURpcjogTG9jYXRvcixcbiAgdmFyaWFibGVNYXA6IFZhcmlhYmxlTWFwLFxufTtcblxufSAvLyBuYW1lc3BhY2UgQ3VzdG9tU2NyaXB0XG4iLCIvKlxuICogTUlUIExpY2Vuc2VcbiAqXG4gKiBDb3B5cmlnaHQgKGMpIDIwMjUgIFl1cmlpIFlha3ViaW4gKHl1cmlpLnlha3ViaW5AZ21haWwuY29tKVxuICpcbiAqIFBlcm1pc3Npb24gaXMgZ3JhbnRlZCB0byB1c2UsIGNvcHksIG1vZGlmeSwgYW5kIGRpc3RyaWJ1dGUgdGhpcyBzb2Z0d2FyZVxuICogdW5kZXIgdGhlIE1JVCBMaWNlbnNlLiBTZWUgTElDRU5TRSBmaWxlIGZvciBkZXRhaWxzLlxuICovXG5cbmltcG9ydCB7IGZpbmRQcm9ncmFtIH0gZnJvbSBcIkAvY29yZS9GaW5kUHJvZ3JhbVwiO1xuaW1wb3J0IHsgU3lzdGVtU2NvcGUgfSBmcm9tIFwiQC9jb3JlL1N5c3RlbVNjb3BlXCI7XG5pbXBvcnQgeyBjbGFuZyB9IGZyb20gXCJAL2NsYW5nL2luZGV4XCI7XG5pbXBvcnQgeyBMb2dnZXIgfSBmcm9tIFwiQC9sb2dnZXJcIjtcblxuY29uc3QgbG9nZ2VyID0gTG9nZ2VyLmNyZWF0ZShpbXBvcnQubWV0YS51cmwpO1xuXG5leHBvcnQgYXN5bmMgZnVuY3Rpb24gZGV0ZXJtaW5lQ29tcGlsZXIoc2NvcGU6IFN5c3RlbVNjb3BlKSB7XG4gIGNvbnN0IGNsYW5nUGF0aCA9IGF3YWl0IGZpbmRQcm9ncmFtKFwiY2xhbmdcIik7XG4gIGlmIChjbGFuZ1BhdGgpIHtcbiAgICBsZXQgdmVyc2lvbiA9IFwiVW5rbm93blwiO1xuICAgIHRyeSB7XG4gICAgICB2ZXJzaW9uID0gYXdhaXQgY2xhbmcucmVhZFZlcnNpb24oY2xhbmdQYXRoKTtcbiAgICB9XG4gICAgY2F0Y2ggKGUpIHtcbiAgICAgIGxvZ2dlci5lcnJvcihcIkNhbm5vdCByZWFkIHZlcnNpb24gZnJvbVwiLCBjbGFuZ1BhdGgpO1xuICAgIH1cbiAgICBsb2dnZXIuaW5mbyhcIlRoZSBDIGNvbXBpbGVyIGlkZW50aWZpY2F0aW9uIGlzIENsYW5nXCIsIHZlcnNpb24pO1xuICAgIHNjb3BlLkFTTV9DT01QSUxFUiA9IFwiY2xhbmdcIjtcbiAgICBzY29wZS5DX0NPTVBJTEVSID0gXCJjbGFuZ1wiO1xuICAgIHNjb3BlLkNYWF9DT01QSUxFUiA9IFwiY2xhbmcrK1wiO1xuICAgIHNjb3BlLkFSID0gXCJsbHZtLWFyXCI7XG4gICAgc2NvcGUuUkFOTElCID0gXCJsbHZtLXJhbmxpYlwiO1xuICAgIHNjb3BlLkxJTktFUiA9IFwibGxkXCI7XG4gICAgc2NvcGUuTk0gPSBcImxsdm0tbm1cIjtcbiAgICBzY29wZS5PQkpDT1BZID0gXCJsbHZtLW9iamNvcHlcIjtcbiAgICBzY29wZS5PQkpEVU1QID0gXCJsbHZtLW9iamR1bXBcIjtcbiAgICBzY29wZS5TVFJJUCA9IFwibGx2bS1zdHJpcFwiO1xuICAgIHJldHVybjtcbiAgfVxuXG4gIGNvbnN0IGdjY1BhdGggPSBhd2FpdCBmaW5kUHJvZ3JhbShcImdjY1wiKTtcbiAgaWYgKGdjY1BhdGgpIHtcbiAgICBsb2dnZXIuaW5mbyhcIlRoZSBDIGNvbXBpbGVyIGlkZW50aWZpY2F0aW9uIGlzIEdOVSBhLmIuY1wiKTtcbiAgICBzY29wZS5BU01fQ09NUElMRVIgPSBcImdjY1wiO1xuICAgIHNjb3BlLkNfQ09NUElMRVIgPSBcImdjY1wiO1xuICAgIHNjb3BlLkNYWF9DT01QSUxFUiA9IFwiZysrXCI7XG4gICAgc2NvcGUuQVIgPSBcImFyXCI7XG4gICAgc2NvcGUuUkFOTElCID0gXCJyYW5saWJcIjtcbiAgICBzY29wZS5MSU5LRVIgPSBcImxkXCI7XG4gICAgc2NvcGUuTk0gPSBcIm5tXCI7XG4gICAgc2NvcGUuT0JKQ09QWSA9IFwib2JqY29weVwiO1xuICAgIHNjb3BlLk9CSkRVTVAgPSBcIm9iamR1bXBcIjtcbiAgICBzY29wZS5TVFJJUCA9IFwic3RyaXBcIjtcbiAgICByZXR1cm47XG4gIH1cblxuICB0aHJvdyBgQ2FuIG5vdCBkZXRlcm1pbmUgY29tcGlsZXJgO1xufVxuIiwiLypcbiAqIE1JVCBMaWNlbnNlXG4gKlxuICogQ29weXJpZ2h0IChjKSAyMDI1ICBZdXJpaSBZYWt1YmluICh5dXJpaS55YWt1YmluQGdtYWlsLmNvbSlcbiAqXG4gKiBQZXJtaXNzaW9uIGlzIGdyYW50ZWQgdG8gdXNlLCBjb3B5LCBtb2RpZnksIGFuZCBkaXN0cmlidXRlIHRoaXMgc29mdHdhcmVcbiAqIHVuZGVyIHRoZSBNSVQgTGljZW5zZS4gU2VlIExJQ0VOU0UgZmlsZSBmb3IgZGV0YWlscy5cbiAqL1xuXG5pbXBvcnQgeyBJbnRlcmZhY2VUYXNrIH0gZnJvbSBcIkAvY29yZS9NYWtlSW50ZXJmYWNlc1wiO1xuaW1wb3J0IHsgTG9jYXRvciB9IGZyb20gXCJAL3V0aWxzL0xvY2F0b3JcIjtcbmltcG9ydCB7IGltcG9ydE1vZHVsZSB9IGZyb20gXCJAL3V0aWxzL01vZHVsZVwiO1xuaW1wb3J0IHsgVmFyaWFibGVNYXAgfSBmcm9tIFwiQC9jb3JlL1Njb3BlXCI7XG5pbXBvcnQgeyBTY3JpcHRDb250ZXh0IH0gZnJvbSBcIkAvY29yZS9TY3JpcHRDb250ZXh0XCI7XG5pbXBvcnQgeyBTaW1wbGVPYmplY3QgfSBmcm9tIFwiQC9jb3JlL1NpbXBsZU9iamVjdFwiO1xuaW1wb3J0IHsgTG9nZ2VyIH0gZnJvbSBcIkAvbG9nZ2VyXCI7XG5cbmNvbnN0IGxvZ2dlciA9IExvZ2dlci5jcmVhdGUoaW1wb3J0Lm1ldGEudXJsKTtcblxuZXhwb3J0IGNsYXNzIEV4ZWNTY3JpcHRUYXNrIGV4dGVuZHMgSW50ZXJmYWNlVGFzayB7XG4gIHByaXZhdGUgX3ZhcmlhYmxlTWFwOiBWYXJpYWJsZU1hcDtcbiAgcHJpdmF0ZSBfc2NyaXB0OiBMb2NhdG9yIHwgRnVuY3Rpb247XG5cbiAgcHVibGljIGNvbnN0cnVjdG9yKHZhcmlhYmxlTWFwOiBWYXJpYWJsZU1hcCwgc2NyaXB0OiBMb2NhdG9yIHwgRnVuY3Rpb24pIHtcbiAgICBzdXBlcigpO1xuICAgIHRoaXMuX3ZhcmlhYmxlTWFwID0gdmFyaWFibGVNYXA7XG4gICAgdGhpcy5fc2NyaXB0ID0gc2NyaXB0O1xuICB9XG5cbiAgcHVibGljIGFzeW5jIGV4ZWN1dGUoKTogUHJvbWlzZTx2b2lkPiB7XG4gICAgbGV0IGZ1bmMgPSB0aGlzLl9zY3JpcHQ7XG4gICAgaWYgKGZ1bmMgaW5zdGFuY2VvZiBMb2NhdG9yKSB7XG4gICAgICBjb25zdCBzY3JpcHRVcmwgPSBmdW5jLnRvVVJMU3RyaW5nKCk7XG4gICAgICBsb2dnZXIuZGVidWcoXCJJbXBvcnRcIiwgc2NyaXB0VXJsKTtcbiAgICAgIGZ1bmMgPSAoYXdhaXQgaW1wb3J0TW9kdWxlKHNjcmlwdFVybCkpLmRlZmF1bHQ7XG4gICAgfVxuICAgIGlmIChmdW5jIGluc3RhbmNlb2YgRnVuY3Rpb24pIHtcbiAgICAgIGNvbnN0IG1rID0gU2NyaXB0Q29udGV4dC5jcmVhdGUodGhpcy5fdmFyaWFibGVNYXApO1xuICAgICAgY29uc3QgcmVzdWx0ID0gZnVuYyhtayk7XG4gICAgICBpZiAocmVzdWx0IGluc3RhbmNlb2YgUHJvbWlzZSlcbiAgICAgICAgYXdhaXQgcmVzdWx0O1xuICAgIH1cbiAgICBlbHNlIHtcbiAgICAgIHRocm93IG5ldyBFcnJvcihgVGhlcmUgaXMgbm8gRnVuY3Rpb25gKTtcbiAgICB9XG4gIH1cblxuICBwdWJsaWMgdG9KU09OKCk6IFNpbXBsZU9iamVjdCB7XG4gICAgcmV0dXJuIHtcbiAgICAgIHR5cGU6IEV4ZWNTY3JpcHRUYXNrLm5hbWUsXG4gICAgICB2YXJpYWJsZU1hcDogdGhpcy5fdmFyaWFibGVNYXAsXG4gICAgICBzY3JpcHQ6IHRoaXMuX3NjcmlwdCxcbiAgICB9XG4gIH1cbn07XG4iLCIvKlxuICogTUlUIExpY2Vuc2VcbiAqXG4gKiBDb3B5cmlnaHQgKGMpIDIwMjUgIFl1cmlpIFlha3ViaW4gKHl1cmlpLnlha3ViaW5AZ21haWwuY29tKVxuICpcbiAqIFBlcm1pc3Npb24gaXMgZ3JhbnRlZCB0byB1c2UsIGNvcHksIG1vZGlmeSwgYW5kIGRpc3RyaWJ1dGUgdGhpcyBzb2Z0d2FyZVxuICogdW5kZXIgdGhlIE1JVCBMaWNlbnNlLiBTZWUgTElDRU5TRSBmaWxlIGZvciBkZXRhaWxzLlxuICovXG5cbmltcG9ydCBmcyBmcm9tIFwibm9kZTpmc1wiO1xuXG5pbXBvcnQgeyBJbnRlcmZhY2VUYXNrIH0gZnJvbSBcIkAvY29yZS9NYWtlSW50ZXJmYWNlc1wiO1xuaW1wb3J0IHsgTG9jYXRvciB9IGZyb20gXCJAL3V0aWxzL0xvY2F0b3JcIjtcbmltcG9ydCB7IFNpbXBsZU9iamVjdCB9IGZyb20gXCJAL2NvcmUvU2ltcGxlT2JqZWN0XCI7XG5pbXBvcnQgeyBMb2dnZXIgfSBmcm9tIFwiQC9sb2dnZXJcIjtcblxuY29uc3QgbG9nZ2VyID0gTG9nZ2VyLmNyZWF0ZShpbXBvcnQubWV0YS51cmwpO1xuXG5pbnRlcmZhY2UgRW50cnkge1xuICBzcmM6IExvY2F0b3I7XG4gIGRlc3Q6IExvY2F0b3I7XG59O1xuXG5leHBvcnQgY2xhc3MgRmlsZUluc3RhbGxhdGlvblRhc2sgZXh0ZW5kcyBJbnRlcmZhY2VUYXNrIHtcbiAgcHJpdmF0ZSBfZW50cmllczogRW50cnlbXTtcblxuICBwdWJsaWMgY29uc3RydWN0b3IoKSB7XG4gICAgc3VwZXIoKTtcbiAgICB0aGlzLl9lbnRyaWVzID0gW107XG4gIH1cblxuICBwdWJsaWMgYXN5bmMgZXhlY3V0ZSgpOiBQcm9taXNlPHZvaWQ+IHtcbiAgICBmb3IgKGNvbnN0IHtzcmMsIGRlc3R9IG9mIHRoaXMuX2VudHJpZXMpIHtcbiAgICAgIGxvZ2dlci5ub3RpY2UoXCJJbnN0YWxsaW5nOiBcIiArIGRlc3QpO1xuICAgICAgYXdhaXQgZnMucHJvbWlzZXMubWtkaXIoZGVzdC5kaXJuYW1lKCkudG9QYXRoKCksIHsgcmVjdXJzaXZlOiB0cnVlIH0pO1xuICAgICAgYXdhaXQgZnMucHJvbWlzZXMuY3Aoc3JjLnRvUGF0aCgpLCBkZXN0LnRvUGF0aCgpLCB7IGZvcmNlOiB0cnVlIH0pO1xuICAgIH1cbiAgfVxuXG4gIHB1YmxpYyBhZGQoc3JjOiBMb2NhdG9yLCBkZXN0OiBMb2NhdG9yKSB7XG4gICAgdGhpcy5fZW50cmllcy5wdXNoKHtzcmMsIGRlc3R9KTtcbiAgfVxuXG4gIHB1YmxpYyBzdGF0aWMgZnJvbUpTT04obzogU2ltcGxlT2JqZWN0KSB7XG4gICAgY29uc3QgdGFzayA9IG5ldyBGaWxlSW5zdGFsbGF0aW9uVGFzaztcbiAgICBmb3IgKGNvbnN0IGl0ZXIgb2YgKG8gYXMgYW55KS5lbnRyaWVzIGFzIEVudHJ5W10pXG4gICAgICB0YXNrLl9lbnRyaWVzLnB1c2goaXRlcik7XG4gICAgcmV0dXJuIHRhc2s7XG4gIH1cblxuICBwdWJsaWMgdG9KU09OKCk6IFNpbXBsZU9iamVjdCB7XG4gICAgcmV0dXJuIHtcbiAgICAgIHR5cGU6IEZpbGVJbnN0YWxsYXRpb25UYXNrLm5hbWUsXG4gICAgICBlbnRyaWVzOiB0aGlzLl9lbnRyaWVzLFxuICAgIH1cbiAgfVxufTtcbiIsIi8qXG4gKiBNSVQgTGljZW5zZVxuICpcbiAqIENvcHlyaWdodCAoYykgMjAyNSAgWXVyaWkgWWFrdWJpbiAoeXVyaWkueWFrdWJpbkBnbWFpbC5jb20pXG4gKlxuICogUGVybWlzc2lvbiBpcyBncmFudGVkIHRvIHVzZSwgY29weSwgbW9kaWZ5LCBhbmQgZGlzdHJpYnV0ZSB0aGlzIHNvZnR3YXJlXG4gKiB1bmRlciB0aGUgTUlUIExpY2Vuc2UuIFNlZSBMSUNFTlNFIGZpbGUgZm9yIGRldGFpbHMuXG4gKi9cblxuaW1wb3J0IHsgUGF0aCB9IGZyb20gXCJAL3V0aWxzL1BhdGhcIjtcbmltcG9ydCB7IEhvc3QgfSBmcm9tIFwiQC91dGlscy9Ib3N0XCI7XG5pbXBvcnQgeyBmaWxlRXhpc3RzLCBmaWxlRXhpc3RzU3luYyB9IGZyb20gXCJAL3V0aWxzL0ZpbGVTeXN0ZW1cIjtcblxuZnVuY3Rpb24gcG9zc2libGVQcm9ncmFtTGlzdChuYW1lOiBzdHJpbmcpIHtcbiAgaWYgKEhvc3QuZXhlY3V0YWJsZVN1ZmZpeClcbiAgICBuYW1lICs9IEhvc3QuZXhlY3V0YWJsZVN1ZmZpeDtcblxuICBjb25zdCByZXN1bHQgPSBbXTtcbiAgY29uc3QgcGF0aHMgPSAocHJvY2Vzcy5lbnYuUEFUSCB8fCBcIlwiKS5zcGxpdChQYXRoLmRlbGltaXRlcik7XG4gIGZvciAoY29uc3QgaXRlciBvZiBwYXRocykge1xuICAgIGNvbnN0IGZpbGVuYW1lID0gUGF0aC5yZXNvbHZlKGl0ZXIsIG5hbWUpO1xuICAgIHJlc3VsdC5wdXNoKGZpbGVuYW1lKTtcbiAgfVxuXG4gIHJldHVybiByZXN1bHQ7XG59XG5cbmV4cG9ydCBhc3luYyBmdW5jdGlvbiBmaW5kUHJvZ3JhbShuYW1lOiBzdHJpbmcpOiBQcm9taXNlPHN0cmluZyB8IHVuZGVmaW5lZD4ge1xuICBmb3IgKGNvbnN0IGl0ZXIgb2YgcG9zc2libGVQcm9ncmFtTGlzdChuYW1lKSkge1xuICAgIGlmIChhd2FpdCBmaWxlRXhpc3RzKGl0ZXIpKVxuICAgICAgcmV0dXJuIGl0ZXI7XG4gIH1cbiAgcmV0dXJuIHVuZGVmaW5lZDtcbn1cblxuZXhwb3J0IGZ1bmN0aW9uIGZpbmRQcm9ncmFtU3luYyhuYW1lOiBzdHJpbmcpOiBzdHJpbmcgfCB1bmRlZmluZWQge1xuICBmb3IgKGNvbnN0IGl0ZXIgb2YgcG9zc2libGVQcm9ncmFtTGlzdChuYW1lKSkge1xuICAgIGlmIChmaWxlRXhpc3RzU3luYyhpdGVyKSlcbiAgICAgIHJldHVybiBpdGVyO1xuICB9XG4gIHJldHVybiB1bmRlZmluZWQ7XG59XG4iLCIvKlxuICogTUlUIExpY2Vuc2VcbiAqXG4gKiBDb3B5cmlnaHQgKGMpIDIwMjUgIFl1cmlpIFlha3ViaW4gKHl1cmlpLnlha3ViaW5AZ21haWwuY29tKVxuICpcbiAqIFBlcm1pc3Npb24gaXMgZ3JhbnRlZCB0byB1c2UsIGNvcHksIG1vZGlmeSwgYW5kIGRpc3RyaWJ1dGUgdGhpcyBzb2Z0d2FyZVxuICogdW5kZXIgdGhlIE1JVCBMaWNlbnNlLiBTZWUgTElDRU5TRSBmaWxlIGZvciBkZXRhaWxzLlxuICovXG5cbmltcG9ydCB7IFNpbXBsZU9iamVjdCB9IGZyb20gXCJAL2NvcmUvU2ltcGxlT2JqZWN0XCI7XG5pbXBvcnQgeyBJbnRlcmZhY2VUYXNrIH0gZnJvbSBcIkAvY29yZS9NYWtlSW50ZXJmYWNlc1wiO1xuaW1wb3J0IHsgTG9nZ2VyIH0gZnJvbSBcIkAvbG9nZ2VyXCI7XG5pbXBvcnQgeyBMb2NhdG9yIH0gZnJvbSBcIkAvdXRpbHMvTG9jYXRvclwiO1xuXG5jb25zdCBsb2dnZXIgPSBMb2dnZXIuY3JlYXRlKGltcG9ydC5tZXRhLnVybCk7XG5cbmV4cG9ydCBjbGFzcyBHb2FsVGFyZ2V0IHtcbiAgcHJpdmF0ZSBfbWVzc2FnZTogc3RyaW5nIHwgdW5kZWZpbmVkO1xuICBwcml2YXRlIF9uYW1lOiBzdHJpbmcgfCB1bmRlZmluZWQ7XG4gIHByaXZhdGUgX291dHB1dDogc3RyaW5nIHwgdW5kZWZpbmVkO1xuICBwcml2YXRlIF9kZXBlbmRzID0gbmV3IEFycmF5PHN0cmluZz47XG4gIHByaXZhdGUgX3Rhc2tzID0gbmV3IEFycmF5PEludGVyZmFjZVRhc2s+O1xuXG4gIGNvbnN0cnVjdG9yKG5hbWU/OiBzdHJpbmcpIHtcbiAgICB0aGlzLl9uYW1lID0gbmFtZTtcbiAgfVxuXG4gIGdldCBtZXNzYWdlKCk6IHN0cmluZyB8IHVuZGVmaW5lZCB7XG4gICAgcmV0dXJuIHRoaXMuX21lc3NhZ2U7XG4gIH1cblxuICBzZXQgbWVzc2FnZSh2YWx1ZTogc3RyaW5nKSB7XG4gICAgdGhpcy5fbWVzc2FnZSA9IHZhbHVlO1xuICB9XG5cbiAgZ2V0IG5hbWUoKTogc3RyaW5nIHwgdW5kZWZpbmVkIHtcbiAgICByZXR1cm4gdGhpcy5fbmFtZTtcbiAgfVxuXG4gIGdldCBvdXRwdXQoKTogc3RyaW5nIHwgdW5kZWZpbmVkIHtcbiAgICByZXR1cm4gdGhpcy5fb3V0cHV0O1xuICB9XG5cbiAgc2V0IG91dHB1dCh2YWx1ZTogTG9jYXRvcikge1xuICAgIHRoaXMuX291dHB1dCA9IHZhbHVlLnRvUGF0aCgpO1xuICB9XG5cbiAgZ2V0IGRlcGVuZHMoKTogc3RyaW5nW10ge1xuICAgIHJldHVybiB0aGlzLl9kZXBlbmRzO1xuICB9XG5cbiAgcHVibGljIGFkZERlcGVuZGVuY3koLi4udmFsdWU6IHN0cmluZ1tdKSB7XG4gICAgdGhpcy5fZGVwZW5kcy5wdXNoKC4uLnZhbHVlKTtcbiAgfVxuXG4gIHB1YmxpYyBhZGRUYXNrKHRhc2s6IEludGVyZmFjZVRhc2spIHtcbiAgICB0aGlzLl90YXNrcy5wdXNoKHRhc2spO1xuICB9XG5cbiAgYXN5bmMgZG9Xb3JrKCk6IFByb21pc2U8dm9pZD4ge1xuICAgIGZvciAoY29uc3QgdGFzayBvZiB0aGlzLl90YXNrcykge1xuICAgICAgY29uc3QgcmVzID0gdGFzay5leGVjdXRlKCk7XG4gICAgICBpZiAocmVzIGluc3RhbmNlb2YgUHJvbWlzZSlcbiAgICAgICAgYXdhaXQgcmVzO1xuICAgIH1cbiAgfVxuXG4gIHB1YmxpYyB0b0pTT04oKTogU2ltcGxlT2JqZWN0IHtcbiAgICBjb25zdCBqc29uOiBhbnkgPSB7XG4gICAgICB0eXBlOiBHb2FsVGFyZ2V0Lm5hbWUsXG4gICAgICBkZXBlbmRzOiB0aGlzLl9kZXBlbmRzLFxuICAgICAgdGFza3M6IHRoaXMuX3Rhc2tzLFxuICAgIH07XG4gICAgaWYgKHRoaXMuX21lc3NhZ2UpIHtcbiAgICAgIGpzb24ubWVzc2FnZSA9IHRoaXMuX21lc3NhZ2U7XG4gICAgfVxuICAgIGlmICh0aGlzLl9uYW1lKSB7XG4gICAgICBqc29uLm5hbWUgPSB0aGlzLl9uYW1lO1xuICAgIH1cbiAgICBpZiAodGhpcy5fb3V0cHV0KSB7XG4gICAgICBqc29uLm91dHB1dCA9IHRoaXMuX291dHB1dDtcbiAgICB9XG4gICAgcmV0dXJuIGpzb247XG4gIH1cbn07XG5cbmV4cG9ydCBjbGFzcyBHb2FsQ29sbGVjdGlvbiB7XG4gIHByaXZhdGUgX2VudHJpZXMgPSBuZXcgQXJyYXk8R29hbFRhcmdldD47XG5cbiAgcHVibGljIGdldCBFTlRSSUVTKCkge1xuICAgIHJldHVybiB0aGlzLl9lbnRyaWVzO1xuICB9XG5cbiAgcHVibGljIGFkZFRhcmdldChnZTogR29hbFRhcmdldCkge1xuICAgIGlmIChnZS5uYW1lICYmIHRoaXMuX2VudHJpZXMuZmluZCgoaSkgPT4gaS5uYW1lID09PSBnZS5uYW1lKSlcbiAgICAgIHRocm93IG5ldyBFcnJvcihgTm1hZSBcIiR7Z2UubmFtZX1cIiBleGlzdHNgKTtcbiAgICBpZiAoZ2Uub3V0cHV0ICYmIHRoaXMuX2VudHJpZXMuZmluZCgoaSkgPT4gaS5vdXRwdXQgPT09IGdlLm91dHB1dCkpXG4gICAgICB0aHJvdyBuZXcgRXJyb3IoYE91dHB1dCBcIiR7Z2Uub3V0cHV0fVwiIGV4aXN0c2ApO1xuICAgIHRoaXMuX2VudHJpZXMucHVzaChnZSk7XG4gIH1cblxuICBwdWJsaWMgZ2V0VGFyZ2V0KG5hbWU6IHN0cmluZyk6IEdvYWxUYXJnZXQgfCB1bmRlZmluZWQge1xuICAgIGlmICghbmFtZSlcbiAgICAgIHJldHVybiB1bmRlZmluZWQ7XG4gICAgcmV0dXJuIHRoaXMuX2VudHJpZXMuZmluZCgoaSkgPT4gaS5uYW1lID09PSBuYW1lKTtcbiAgfVxuXG4gIHByaXZhdGUgYWRkVGFyZ2V0TGlzdEltcGwobmFtZTogc3RyaW5nLCByZXN1bHQ6IEFycmF5PEdvYWxUYXJnZXQ+KSB7XG4gICAgaWYgKHJlc3VsdC5maW5kKGkgPT4gaS5uYW1lID09PSBuYW1lIHx8IGkub3V0cHV0ID09PSBuYW1lKSkge1xuICAgICAgcmV0dXJuO1xuICAgIH1cblxuICAgIGNvbnN0IGdvYWwgPSB0aGlzLl9lbnRyaWVzLmZpbmQoaSA9PiBpLm5hbWUgPT09IG5hbWUgfHwgaS5vdXRwdXQgPT09IG5hbWUpO1xuICAgIGlmICghZ29hbCkge1xuICAgICAgcmV0dXJuO1xuICAgIH1cblxuICAgIGZvciAoY29uc3QgaXRlciBvZiBnb2FsLmRlcGVuZHMpIHtcbiAgICAgIHRoaXMuYWRkVGFyZ2V0TGlzdEltcGwoaXRlci50b1N0cmluZygpLCByZXN1bHQpO1xuICAgIH1cblxuICAgIHJlc3VsdC5wdXNoKGdvYWwpO1xuICB9XG4gIFxuICBwdWJsaWMgZ2V0VGFyZ2V0TGlzdChuYW1lOnN0cmluZykge1xuICAgIGNvbnN0IHJlc3VsdCA9IG5ldyBBcnJheTxHb2FsVGFyZ2V0PjtcbiAgICB0aGlzLmFkZFRhcmdldExpc3RJbXBsKG5hbWUsIHJlc3VsdCk7XG4gICAgcmV0dXJuIHJlc3VsdDtcbiAgfVxuICBcbiAgcHVibGljIHRvSlNPTigpIHtcbiAgICByZXR1cm4ge1xuICAgICAgdHlwZTogR29hbENvbGxlY3Rpb24ubmFtZSxcbiAgICAgIGVudHJpZXM6IHRoaXMuX2VudHJpZXMsXG4gICAgfTtcbiAgfVxufTtcbiIsIi8qXG4gKiBNSVQgTGljZW5zZVxuICpcbiAqIENvcHlyaWdodCAoYykgMjAyNSAgWXVyaWkgWWFrdWJpbiAoeXVyaWkueWFrdWJpbkBnbWFpbC5jb20pXG4gKlxuICogUGVybWlzc2lvbiBpcyBncmFudGVkIHRvIHVzZSwgY29weSwgbW9kaWZ5LCBhbmQgZGlzdHJpYnV0ZSB0aGlzIHNvZnR3YXJlXG4gKiB1bmRlciB0aGUgTUlUIExpY2Vuc2UuIFNlZSBMSUNFTlNFIGZpbGUgZm9yIGRldGFpbHMuXG4gKi9cblxuaW1wb3J0IHsgVGFyZ2V0TmFtZSB9IGZyb20gXCJAL2NvcmUvVGFyZ2V0TmFtZVwiO1xuaW1wb3J0IHsgRmlsZVBhdGgsIExvY2F0b3IgfSBmcm9tIFwiQC91dGlscy9Mb2NhdG9yXCI7XG5pbXBvcnQgeyBTaW1wbGVPYmplY3QgfSBmcm9tIFwiQC9jb3JlL1NpbXBsZU9iamVjdFwiO1xuXG5leHBvcnQgY2xhc3MgSW5zdGFsbEVudGl0eSB7XG4gIHByaXZhdGUgX3ZhbHVlOiBGaWxlUGF0aCB8IFRhcmdldE5hbWU7XG4gIHByaXZhdGUgX2Rlc3RpbmF0aW9uOiBMb2NhdG9yO1xuICBwcml2YXRlIF9iYXNlRGlyPzogTG9jYXRvcjtcblxuICBwdWJsaWMgY29uc3RydWN0b3IodmFsdWU6IEZpbGVQYXRoIHwgVGFyZ2V0TmFtZSwgZGVzdGluYXRpb246IExvY2F0b3IsIGJhc2VEaXI/OiBMb2NhdG9yKSB7XG4gICAgdGhpcy5fdmFsdWUgPSB2YWx1ZTtcbiAgICB0aGlzLl9kZXN0aW5hdGlvbiA9IGRlc3RpbmF0aW9uO1xuICAgIHRoaXMuX2Jhc2VEaXIgPSBiYXNlRGlyO1xuICB9XG5cbiAgcHVibGljIHN0YXRpYyBjcmVhdGUodmFsdWU6IEZpbGVQYXRoIHwgVGFyZ2V0TmFtZSwgZGVzdGluYXRpb246IExvY2F0b3IsIGJhc2VEaXI/OiBMb2NhdG9yKSB7XG4gICAgcmV0dXJuIG5ldyBJbnN0YWxsRW50aXR5KHZhbHVlLCBkZXN0aW5hdGlvbiwgYmFzZURpcik7XG4gIH1cblxuICBwdWJsaWMgZ2V0IHZhbHVlICgpIHtcbiAgICByZXR1cm4gdGhpcy5fdmFsdWU7XG4gIH1cblxuICBwdWJsaWMgZ2V0IGRlc3RpbmF0aW9uICgpIHtcbiAgICByZXR1cm4gdGhpcy5fZGVzdGluYXRpb247XG4gIH1cblxuICBwdWJsaWMgZ2V0IGJhc2VEaXIgKCkge1xuICAgIHJldHVybiB0aGlzLl9iYXNlRGlyO1xuICB9XG5cbiAgcHVibGljIHN0YXRpYyBmcm9tSlNPTihqc29uOiBhbnkpIHtcbiAgICBjb25zdCB2YWx1ZSA9IFNpbXBsZU9iamVjdC5mcm9tSlNPTihqc29uLnZhbHVlKTtcbiAgICBjb25zdCBkZXN0aW5hdGlvbiA9IExvY2F0b3IuY3JlYXRlKGpzb24uZGVzdGluYXRpb24pO1xuICAgIGNvbnN0IGJhc2VEaXIgPSBqc29uLmJhc2VEaXIgPyBMb2NhdG9yLmNyZWF0ZShqc29uLmJhc2VEaXIpIDogdW5kZWZpbmVkO1xuICAgIHJldHVybiBuZXcgSW5zdGFsbEVudGl0eSh2YWx1ZSwgZGVzdGluYXRpb24sIGJhc2VEaXIpO1xuICB9XG5cbiAgcHVibGljIHRvSlNPTigpOiBTaW1wbGVPYmplY3Qge1xuICAgIGNvbnN0IHJlc3VsdDogU2ltcGxlT2JqZWN0ID0ge1xuICAgICAgdHlwZTogSW5zdGFsbEVudGl0eS5uYW1lLFxuICAgICAgdmFsdWU6IHRoaXMuX3ZhbHVlLnRvSlNPTigpLFxuICAgICAgZGVzdGluYXRpb246IHRoaXMuX2Rlc3RpbmF0aW9uLnRvVVJMU3RyaW5nKCksXG4gICAgfTtcbiAgICBpZiAodGhpcy5fYmFzZURpcilcbiAgICAgIHJlc3VsdC5iYXNlRGlyID0gdGhpcy5fYmFzZURpci50b1VSTFN0cmluZygpO1xuICAgIHJldHVybiByZXN1bHQ7XG4gIH1cbn07XG4iLCIvKlxuICogTUlUIExpY2Vuc2VcbiAqXG4gKiBDb3B5cmlnaHQgKGMpIDIwMjUgIFl1cmlpIFlha3ViaW4gKHl1cmlpLnlha3ViaW5AZ21haWwuY29tKVxuICpcbiAqIFBlcm1pc3Npb24gaXMgZ3JhbnRlZCB0byB1c2UsIGNvcHksIG1vZGlmeSwgYW5kIGRpc3RyaWJ1dGUgdGhpcyBzb2Z0d2FyZVxuICogdW5kZXIgdGhlIE1JVCBMaWNlbnNlLiBTZWUgTElDRU5TRSBmaWxlIGZvciBkZXRhaWxzLlxuICovXG5cbmltcG9ydCB7IFRhcmdldEZpbGUgfSBmcm9tIFwiQC9jb3JlL1RhcmdldEZpbGVcIjtcbmltcG9ydCB7IFRhcmdldE9iamVjdHMgfSBmcm9tIFwiQC9jb3JlL1RhcmdldE9iamVjdHNcIjtcbmltcG9ydCB7IFRhcmdldEluY2x1ZGVzIH0gZnJvbSBcIkAvY29yZS9UYXJnZXRJbmNsdWRlc1wiO1xuaW1wb3J0IHsgVmFyaWFudE1hcCB9IGZyb20gXCJAL2NvcmUvU2NvcGVcIjtcbmltcG9ydCB7IExvY2F0b3IgfSBmcm9tIFwiQC91dGlscy9Mb2NhdG9yXCI7XG5pbXBvcnQgeyBTb3VyY2VGaWxlIH0gZnJvbSBcIkAvY29yZS9Tb3VyY2VGaWxlXCI7XG5cbmV4cG9ydCB0eXBlIERlZmluaXRpb24gPSBzdHJpbmcgfCBvYmplY3Q7XG5leHBvcnQgdHlwZSBDb21waWxlT3B0aW9uU2luZ2xlID0gc3RyaW5nO1xuZXhwb3J0IHR5cGUgQ29tcGlsZU9wdGlvbk11bHRpID0gWyBzdHJpbmcsIHN0cmluZyB8IExvY2F0b3IgXTtcbmV4cG9ydCB0eXBlIENvbXBpbGVPcHRpb24gPSBDb21waWxlT3B0aW9uU2luZ2xlIHwgQ29tcGlsZU9wdGlvbk11bHRpO1xuZXhwb3J0IHR5cGUgTGlua09wdGlvbiA9IHN0cmluZyB8IHN0cmluZ1tdO1xuXG5leHBvcnQgYWJzdHJhY3QgY2xhc3MgSW50ZXJmYWNlVGFzayB7XG4gIGFic3RyYWN0IGV4ZWN1dGUoKTogUHJvbWlzZTx2b2lkPiB8IHZvaWQ7XG59O1xuXG5leHBvcnQgYWJzdHJhY3QgY2xhc3MgSW50ZXJmYWNlU291cmNlRmlsZXMge1xuICBhYnN0cmFjdCBzZXRMYW5ndWFnZShsYW5ndWFnZTogc3RyaW5nKTogdm9pZDtcbiAgYWJzdHJhY3QgYWRkRGVmaW5pdGlvbnMoLi4uZGVmaW5pdGlvbnM6IHN0cmluZ1tdKTogdm9pZDtcbiAgYWJzdHJhY3QgYWRkQ29tcGlsZUZsYWdzKC4uLmZsYWdzOiBzdHJpbmdbXSk6IHZvaWQ7XG59O1xuXG5leHBvcnQgYWJzdHJhY3QgY2xhc3MgSW50ZXJmYWNlVGFyZ2V0IHtcbiAgYWJzdHJhY3QgZ2V0IHRhcmdldE5hbWUoKTogc3RyaW5nO1xuICBhYnN0cmFjdCBnZXQgdGFyZ2V0RmlsZSgpOiBUYXJnZXRGaWxlO1xuICBhYnN0cmFjdCBnZXQgaW5jbHVkZXMoKTogVGFyZ2V0SW5jbHVkZXM7XG4gIGFic3RyYWN0IGdldCBvYmplY3RzKCk6IFRhcmdldE9iamVjdHM7XG5cbiAgYWJzdHJhY3Qgc2V0UHJlZml4KHByZWZpeDogc3RyaW5nKTogdm9pZDsgIFxuICBhYnN0cmFjdCBzZXRTdWZmaXgoc3VmZml4OiBzdHJpbmcpOiB2b2lkO1xuICBhYnN0cmFjdCBzZXRPdXRwdXROYW1lKG91dHB1dE5hbWU6IHN0cmluZyk6IHZvaWQ7XG5cbiAgYWJzdHJhY3QgYWRkU291cmNlcyguLi5zb3VyY2VzOiBBcnJheTxUYXJnZXRPYmplY3RzIHwgU291cmNlRmlsZSB8IExvY2F0b3IgfCBzdHJpbmc+KTogdm9pZDtcbiAgYWJzdHJhY3QgYWRkSW5jbHVkZXMoLi4uaW5jbHVkZXM6IEFycmF5PFRhcmdldEluY2x1ZGVzIHwgTG9jYXRvciB8IHN0cmluZz4pOiB2b2lkO1xuICBhYnN0cmFjdCBhZGRMaWJyYXJpZXMoLi4ubGlicmFyaWVzOiBhbnkpOiB2b2lkO1xuICBhYnN0cmFjdCBhZGRDb21waWxlT3B0aW9ucyguLi5vcHRpb25zOiBDb21waWxlT3B0aW9uW10pOiB2b2lkO1xuICBhYnN0cmFjdCBhZGRMaW5rT3B0aW9ucyguLi5vcHRpb25zOiBMaW5rT3B0aW9uW10pOiB2b2lkO1xuICBhYnN0cmFjdCBnZXRTb3VyY2VGaWxlcyguLi5zb3VyY2VzOiBhbnlbXSk6IEludGVyZmFjZVNvdXJjZUZpbGVzO1xuICBhYnN0cmFjdCBhZGREZWZpbml0aW9ucyguLi5kZWZpbml0aW9uczogRGVmaW5pdGlvbltdKTogdm9pZDtcbiAgYWJzdHJhY3QgYWRkUHJlQnVpbGQoY29tbWFuZDogYW55LCBhcmdzOiBhbnlbXSk6IHZvaWQ7XG4gIGFic3RyYWN0IGFkZFBvc3RCdWlsZChjb21tYW5kOiBhbnksIGFyZ3M6IGFueVtdKTogdm9pZDtcblxuICBhYnN0cmFjdCBzZXRQb3NpdGlvbkluZGVwZW5kZW50Q29kZSh2YWx1ZTogYm9vbGVhbik6IHZvaWQ7XG4gIGFic3RyYWN0IGFkZFB1YmxpY0luY2x1ZGVzKC4uLmluY2x1ZGVzOiBBcnJheTxUYXJnZXRJbmNsdWRlcyB8IExvY2F0b3IgfCBzdHJpbmc+KTogdm9pZDtcbiAgYWJzdHJhY3QgYWRkUHVibGljRGVmaW5pdGlvbnMoLi4uZGVmaW5pdGlvbnM6IERlZmluaXRpb25bXSk6IHZvaWQ7XG4gIGFic3RyYWN0IGFkZFB1YmxpY0xpYnJhcmllcyguLi5saWJyYXJpZXM6IGFueVtdKTogdm9pZDtcbiAgYWJzdHJhY3QgYWRkUHVibGljQ29tcGlsZU9wdGlvbnMoLi4ub3B0aW9uczogQ29tcGlsZU9wdGlvbltdKTogdm9pZDtcbiAgYWJzdHJhY3QgYWRkUHVibGljTGlua09wdGlvbnMoLi4ub3B0aW9uczogTGlua09wdGlvbltdKTogdm9pZDtcbn07XG5cbmV4cG9ydCBhYnN0cmFjdCBjbGFzcyBJbnRlcmZhY2VTY3JpcHQge1xuICBhYnN0cmFjdCBtZXJnZVZhcmlhYmxlcyh2YXJpYWJsZXM6IFZhcmlhbnRNYXApOiB2b2lkO1xufTtcblxuZXhwb3J0IGludGVyZmFjZSBJR2VuZXJhbENvbnRleHQge1xuICBnZXRQcm9wZXJ0eShuYW1lOiBzdHJpbmcpOiBhbnk7XG4gIHNldFByb3BlcnR5KG5hbWU6IHN0cmluZywgdmFsdWU6IGFueSk6IGJvb2xlYW47XG4gIGhhc1Byb3BlcnR5KG5hbWU6IHN0cmluZyk6IGJvb2xlYW47XG4gIGRlbGV0ZVByb3BlcnR5KG5hbWU6IHN0cmluZyk6IGJvb2xlYW47XG4gIGdldFByb3BlcnR5TmFtZXMoKTogc3RyaW5nW107XG5cbiAgZmluZFByb2dyYW0obmFtZTogc3RyaW5nKTogc3RyaW5nIHwgdW5kZWZpbmVkO1xufTtcblxuZXhwb3J0IGludGVyZmFjZSBJTWFrZUNvbnRleHQgZXh0ZW5kcyBJR2VuZXJhbENvbnRleHQge1xuICBnZXRDYWNoZVZhcmlhYmxlcygpOiBhbnk7XG4gIGFkZENhY2hlVmFyaWFibGVzKHBhcmFtczogc3RyaW5nIHwgVmFyaWFudE1hcCk6IHZvaWQ7XG4gIGFkZEluY2x1ZGVEaXJlY3RvcmllcyguLi5kaXJzOiBhbnlbXSk6IHZvaWQ7XG4gIGFkZFN1YmRpcmVjdG9yeShzb3VyY2VEaXI6IHN0cmluZyB8IExvY2F0b3IsIGJpbmFyeURpcj86IHN0cmluZyB8IExvY2F0b3IpOiB2b2lkO1xuICBzY3JpcHQobmFtZTogc3RyaW5nKTogSW50ZXJmYWNlU2NyaXB0O1xuICBhZGRDdXN0b21TY3JpcHQoc2NyaXB0OiBzdHJpbmcsIHBhcmFtczogYW55KTogSW50ZXJmYWNlU2NyaXB0O1xuICB0YXJnZXQobmFtZTogc3RyaW5nKTogSW50ZXJmYWNlVGFyZ2V0O1xuICBhZGRPYmplY3RMaWJyYXJ5KG5hbWU6IHN0cmluZywgLi4uc291cmNlczogYW55W10pOiBJbnRlcmZhY2VUYXJnZXQ7XG4gIGFkZFN0YXRpY0xpYnJhcnkobmFtZTogc3RyaW5nLCAuLi5zb3VyY2VzOiBhbnlbXSk6IEludGVyZmFjZVRhcmdldDtcbiAgYWRkU2hhcmVkTGlicmFyeShuYW1lOiBzdHJpbmcsIC4uLnNvdXJjZXM6IGFueVtdKTogSW50ZXJmYWNlVGFyZ2V0O1xuICBhZGRFeGVjdXRhYmxlKG5hbWU6IHN0cmluZywgLi4uc291cmNlczogYW55W10pOiBJbnRlcmZhY2VUYXJnZXQ7XG4gIGV4ZWN1dGVTY3JpcHQoc2NyaXB0OiBhbnksIHBhcmFtczogYW55KTogdm9pZDtcbiAgaW5zdGFsbCh2YWx1ZTogYW55LCBwYXJhbXM6IGFueSk6IHZvaWQ7XG59O1xuIiwiLypcbiAqIE1JVCBMaWNlbnNlXG4gKlxuICogQ29weXJpZ2h0IChjKSAyMDI1ICBZdXJpaSBZYWt1YmluICh5dXJpaS55YWt1YmluQGdtYWlsLmNvbSlcbiAqXG4gKiBQZXJtaXNzaW9uIGlzIGdyYW50ZWQgdG8gdXNlLCBjb3B5LCBtb2RpZnksIGFuZCBkaXN0cmlidXRlIHRoaXMgc29mdHdhcmVcbiAqIHVuZGVyIHRoZSBNSVQgTGljZW5zZS4gU2VlIExJQ0VOU0UgZmlsZSBmb3IgZGV0YWlscy5cbiAqL1xuXG5pbXBvcnQgeyBQcm9qZWN0Q29udGV4dCB9IGZyb20gXCJAL2NvcmUvUHJvamVjdENvbnRleHRcIjtcbmltcG9ydCB7IFZhcmlhYmxlTWFwIH0gZnJvbSBcIkAvY29yZS9TY29wZVwiO1xuaW1wb3J0IHsgR2VuZXJhbENvbnRleHQsIGNyZWF0ZUNvbnRleHQgfSBmcm9tIFwiQC9jb3JlL0Jhc2VDb250ZXh0XCI7XG5cbmNvbnN0IEdMT0JBTCA9IFN5bWJvbChcIkdMT0JBTFwiKTtcbmNvbnN0IFNDT1BFID0gU3ltYm9sKFwiU0NPUEVcIik7XG5cbmV4cG9ydCBjbGFzcyBQbHVnaW5Db250ZXh0IGV4dGVuZHMgR2VuZXJhbENvbnRleHQge1xuICBbR0xPQkFMXTogUHJvamVjdENvbnRleHQ7XG4gIFtTQ09QRV06IFZhcmlhYmxlTWFwO1xuXG4gIHB1YmxpYyBjb25zdHJ1Y3RvcihnbG9iYWw6IFByb2plY3RDb250ZXh0LCB2YXJpYWJsZU1hcDogVmFyaWFibGVNYXApIHtcbiAgICBzdXBlcih2YXJpYWJsZU1hcCk7XG4gICAgdGhpc1tHTE9CQUxdID0gZ2xvYmFsO1xuICAgIHRoaXNbU0NPUEVdID0gdmFyaWFibGVNYXA7XG4gIH1cblxuICBwdWJsaWMgYWRkU3ViZGlyZWN0b3J5QWxpYXMoc3JjOiBhbnksIGRlc3Q6IGFueSkge1xuICAgIHRoaXNbR0xPQkFMXS5hZGRTdWJkaXJlY3RvcnlBbGlhcyh0aGlzW1NDT1BFXSwgc3JjLCBkZXN0KTtcbiAgfVxuXG4gIHB1YmxpYyBzdGF0aWMgY3JlYXRlKGdsb2JhbDogUHJvamVjdENvbnRleHQsIHZhcmlhYmxlTWFwOiBWYXJpYWJsZU1hcCkge1xuICAgIHJldHVybiBjcmVhdGVDb250ZXh0KG5ldyBQbHVnaW5Db250ZXh0KGdsb2JhbCwgdmFyaWFibGVNYXApKTtcbiAgfVxufTtcbiIsIi8qXG4gKiBNSVQgTGljZW5zZVxuICpcbiAqIENvcHlyaWdodCAoYykgMjAyNSAgWXVyaWkgWWFrdWJpbiAoeXVyaWkueWFrdWJpbkBnbWFpbC5jb20pXG4gKlxuICogUGVybWlzc2lvbiBpcyBncmFudGVkIHRvIHVzZSwgY29weSwgbW9kaWZ5LCBhbmQgZGlzdHJpYnV0ZSB0aGlzIHNvZnR3YXJlXG4gKiB1bmRlciB0aGUgTUlUIExpY2Vuc2UuIFNlZSBMSUNFTlNFIGZpbGUgZm9yIGRldGFpbHMuXG4gKi9cblxuaW1wb3J0IGZzIGZyb20gXCJub2RlOmZzXCI7XG5cbmltcG9ydCB7IEFMTF9UQVJHRVQsIElOU1RBTExfVEFSR0VUIH0gZnJvbSBcIkAvQ29uc3RhbnRzXCI7XG5pbXBvcnQgeyBMb2NhdG9yIH0gZnJvbSBcIkAvdXRpbHMvTG9jYXRvclwiO1xuaW1wb3J0IHsgZmlsZUV4aXN0cywgZmlsZUV4aXN0c1N5bmMgfSBmcm9tIFwiQC91dGlscy9GaWxlU3lzdGVtXCI7XG5pbXBvcnQgeyBUYXJnZXRDb2xsZWN0aW9uIH0gZnJvbSBcIkAvY29yZS9UYXJnZXRDb2xsZWN0aW9uXCI7XG5pbXBvcnQgeyBHb2FsQ29sbGVjdGlvbiwgR29hbFRhcmdldCB9IGZyb20gXCJAL2NvcmUvR29hbENvbGxlY3Rpb25cIjtcbmltcG9ydCB7IFRhcmdldENvbW1hbmQgfSBmcm9tIFwiQC9jb3JlL1RhcmdldFwiO1xuaW1wb3J0IHsgU3lzdGVtU2NvcGUgfSBmcm9tIFwiQC9jb3JlL1N5c3RlbVNjb3BlXCI7XG5pbXBvcnQgeyByZXF1aXJlU3luYyB9IGZyb20gXCJAL3V0aWxzL01vZHVsZVwiO1xuaW1wb3J0IHsgTG9nZ2VyIH0gZnJvbSBcIkAvbG9nZ2VyXCI7XG5pbXBvcnQgeyBUYXJnZXROYW1lIH0gZnJvbSBcIkAvY29yZS9UYXJnZXROYW1lXCI7XG5pbXBvcnQgeyBNYWluVGFyZ2V0LCBQb3N0VGFyZ2V0IH0gZnJvbSBcIkAvY29yZS9UYXJnZXRcIjtcbmltcG9ydCB7IEluc3RhbGxFbnRpdHkgfSBmcm9tIFwiQC9jb3JlL0luc3RhbGxFbnRpdHlcIjtcbmltcG9ydCB7IFNjcmlwdENvbnRleHQgfSBmcm9tIFwiQC9jb3JlL1NjcmlwdENvbnRleHRcIjtcbmltcG9ydCB7IFNjb3BlSGVscGVyLCBWYXJpYWJsZU1hcCB9IGZyb20gXCIuL1Njb3BlXCI7XG5pbXBvcnQgeyBUYXJnZXRGaWxlIH0gZnJvbSBcIkAvY29yZS9UYXJnZXRGaWxlXCI7XG5pbXBvcnQgeyBTb3VyY2VGaWxlIH0gZnJvbSBcIkAvY29yZS9Tb3VyY2VGaWxlXCI7XG5pbXBvcnQgeyBFeGVjU2NyaXB0VGFzayB9IGZyb20gXCJAL2NvcmUvRXhlY1NjcmlwdFRhc2tcIjtcbmltcG9ydCB7IFNwYXduU3luY1Rhc2sgfSBmcm9tIFwiQC9jb3JlL1NwYXduU3luY1Rhc2tcIjtcbmltcG9ydCB7IEZpbGVJbnN0YWxsYXRpb25UYXNrIH0gZnJvbSBcIkAvY29yZS9GaWxlSW5zdGFsbGF0aW9uVGFza1wiO1xuaW1wb3J0IHsgQ3VzdG9tU2NyaXB0LCBQb3N0Q3VzdG9tU2NyaXB0IH0gZnJvbSBcIkAvY29yZS9DdXN0b21TY3JpcHRcIjtcblxuaW1wb3J0IGJ1aWx0aW5TY3JpcHRzIGZyb20gXCJAL2NvcmUvQnVpbHRpblNjcmlwdHNcIjtcblxuY29uc3QgbG9nZ2VyID0gTG9nZ2VyLmNyZWF0ZShpbXBvcnQubWV0YS51cmwpO1xuXG5jb25zdCBUQVJHRVRTID0gU3ltYm9sKFwiVEFSR0VUU1wiKTtcbmNvbnN0IENBQ0hFID0gU3ltYm9sKFwiQ0FDSEVcIik7XG5cbnR5cGUgU3ViZGlyZWN0b3J5QWxpYXMgPSB7XG4gIFtuYW1lOiBzdHJpbmddOiBMb2NhdG9yIHwgbnVsbDtcbn07XG5cbnR5cGUgQ2FjaGVWYXJpYWJsZURlc2NyaXB0b3IgPSB7XG4gIHR5cGU/OiBhbnk7XG4gIHZhbHVlPzogYW55O1xuICBkZXNjcmlwdGlvbj86IHN0cmluZztcbn07XG5cbnR5cGUgQ2FjaGVWYXJpYWJsZURlc2NyaXB0b3JzID0ge1xuICBbbmFtZTogc3RyaW5nXTogQ2FjaGVWYXJpYWJsZURlc2NyaXB0b3I7XG59O1xuXG50eXBlIEJ1aWxkaW5TY3JpcHRzID0ge1xuICBbbmFtZTogc3RyaW5nXTogRnVuY3Rpb247XG59O1xuXG5leHBvcnQgaW50ZXJmYWNlIEV4ZWNTdHJ1Y3Qge1xuICBjb21tYW5kOiBzdHJpbmc7XG4gIGFyZ3M6IHN0cmluZ1tdO1xufTtcblxuZnVuY3Rpb24gZW5zdXJlVmFsdWVCeVR5cGUodHlwZTogYW55LCB2YWx1ZTogYW55KSB7XG4gIGlmIChBcnJheS5pc0FycmF5KHR5cGUpID8gdHlwZS5pbmNsdWRlcyh2YWx1ZSkgOiB0eXBlb2YgdmFsdWUgPT09IHR5cGUpXG4gICAgcmV0dXJuIHZhbHVlO1xuICB0aHJvdyBuZXcgRXJyb3IoYFRoZSAnJHt2YWx1ZX0nIGlzIG5vdCBhICR7dHlwZX1gKTtcbn1cblxuZnVuY3Rpb24gcmVzb2x2ZUluc3RhbmNlKHByb2plY3Q6IFByb2plY3RDb250ZXh0LCBvOiBzdHJpbmcgfCBMb2NhdG9yIHwgVGFyZ2V0RmlsZSk6IHN0cmluZyB7XG4gIGlmICh0eXBlb2YgbyA9PT0gXCJzdHJpbmdcIilcbiAgICByZXR1cm4gbztcblxuICBpZiAobyBpbnN0YW5jZW9mIExvY2F0b3IpXG4gICAgcmV0dXJuIG8udG9TdHJpbmcoKTtcblxuICBpZiAobyBpbnN0YW5jZW9mIFRhcmdldEZpbGUpIHtcbiAgICBjb25zdCB0YXJnZXQgPSBwcm9qZWN0LlRBUkdFVFMuZ2V0KG8udGFyZ2V0TmFtZSk7XG4gICAgcmV0dXJuIHRhcmdldC5nZXRGaWxlKCkudG9TdHJpbmcoKTtcbiAgfVxuXG4gIHRocm93IG5ldyBFcnJvcihgVW5hYmxlIHRvIHJlc29sdmUgb2JqZWN0ICR7b31gKTtcbn1cblxuZnVuY3Rpb24gcmVzb2x2ZVRhcmdldENvbW1hbmQocHJvamVjdDogUHJvamVjdENvbnRleHQsIHRjbWQ6IFRhcmdldENvbW1hbmQpOiBFeGVjU3RydWN0IHtcbiAgY29uc3QgY29tbWFuZCA9IHJlc29sdmVJbnN0YW5jZShwcm9qZWN0LCB0Y21kLmNvbW1hbmQpO1xuICBjb25zdCBhcmdzID0gdGNtZC5hcmdzLm1hcChpID0+IHJlc29sdmVJbnN0YW5jZShwcm9qZWN0LCBpKSk7XG4gIHJldHVybiB7Y29tbWFuZCwgYXJnc307XG59XG5cbmV4cG9ydCBjbGFzcyBQcm9qZWN0Q29udGV4dCB7XG4gIHByaXZhdGUgW1RBUkdFVFNdOiBUYXJnZXRDb2xsZWN0aW9uO1xuICBwcml2YXRlIF9jdXN0b21TY3JpcHRzID0gbmV3IE1hcDxzdHJpbmcsIEN1c3RvbVNjcmlwdD47XG5cbiAgcHJpdmF0ZSBbQ0FDSEVdOiBDYWNoZVZhcmlhYmxlRGVzY3JpcHRvcnM7XG4gIHByaXZhdGUgX2luc3RhbGxMaXN0OiBJbnN0YWxsRW50aXR5W107XG4gIHByaXZhdGUgX3Byb2Nlc3NlZFZhcmlhYmxlTWFwOiBhbnk7XG4gIHByaXZhdGUgX2J1aWx0aW5TY3JpcHRzOiBCdWlsZGluU2NyaXB0cztcbiAgcHJpdmF0ZSBfc3ViZGlyQWxpYXM6IFN1YmRpcmVjdG9yeUFsaWFzO1xuXG4gIHByaXZhdGUgY29uc3RydWN0b3IoKSB7XG4gICAgdGhpc1tUQVJHRVRTXSA9IFRhcmdldENvbGxlY3Rpb24uY3JlYXRlKCk7XG4gICAgdGhpc1tDQUNIRV0gPSB7fTtcbiAgICB0aGlzLl9pbnN0YWxsTGlzdCA9IFtdO1xuICAgIHRoaXMuX3Byb2Nlc3NlZFZhcmlhYmxlTWFwID0ge307XG4gICAgdGhpcy5fc3ViZGlyQWxpYXMgPSB7fTtcbiAgICB0aGlzLl9idWlsdGluU2NyaXB0cyA9IGJ1aWx0aW5TY3JpcHRzO1xuICB9XG5cbiAgcHVibGljIHN0YXRpYyBjcmVhdGUoKSB7XG4gICAgcmV0dXJuIE9iamVjdC5zZWFsKG5ldyBQcm9qZWN0Q29udGV4dCk7XG4gIH1cblxuICBwdWJsaWMgZ2V0IFRBUkdFVFMoKSB7XG4gICAgcmV0dXJuIHRoaXNbVEFSR0VUU107XG4gIH1cblxuICBwdWJsaWMgZ2V0IENBQ0hFKCkge1xuICAgIHJldHVybiB0aGlzW0NBQ0hFXTtcbiAgfVxuXG4gIHB1YmxpYyByZWdpc3RlclZhcmlhYmxlTWFwKG5hbWU6IHN0cmluZywgdmFyaWFibGVNYXA6IFZhcmlhYmxlTWFwKSB7XG4gICAgaWYgKHRoaXMuX3Byb2Nlc3NlZFZhcmlhYmxlTWFwW25hbWVdKVxuICAgICAgdGhyb3cgbmV3IEVycm9yKGBTeXN0ZW1WYXJpYWJsZXMgZXhpc3RzIGZvciAke25hbWV9YCk7XG4gICAgdGhpcy5fcHJvY2Vzc2VkVmFyaWFibGVNYXBbbmFtZV0gPSB2YXJpYWJsZU1hcDtcbiAgfVxuXG4gIHB1YmxpYyByZXNvbHZlU3ViZGlyZWN0b3J5KHBhdGg6IExvY2F0b3IgfCBzdHJpbmcpOiBMb2NhdG9yIHwgc3RyaW5nIHwgdW5kZWZpbmVkIHtcbiAgICBjb25zdCByZXNvbHZlZFBhdGggPSB0aGlzLl9zdWJkaXJBbGlhc1twYXRoLnRvU3RyaW5nKCldO1xuICAgIGlmIChyZXNvbHZlZFBhdGggPT09IHVuZGVmaW5lZClcbiAgICAgIHJldHVybiBwYXRoO1xuICAgIGlmIChyZXNvbHZlZFBhdGggPT09IG51bGwpXG4gICAgICByZXR1cm4gdW5kZWZpbmVkO1xuICAgIHJldHVybiByZXNvbHZlZFBhdGg7XG4gIH1cblxuICBwdWJsaWMgYWRkU3ViZGlyZWN0b3J5QWxpYXModmFyaWFibGVNYXA6IFZhcmlhYmxlTWFwLCBzcmM6IGFueSwgZGVzdDogYW55KSB7XG4gICAgY29uc3Qgc3JjUGF0aCA9IExvY2F0b3IuY3JlYXRlKFNjb3BlSGVscGVyLmdldCh2YXJpYWJsZU1hcCwgXCJTT1VSQ0VfRElSXCIpLnJlc29sdmUoc3JjKSk7XG4gICAgY29uc3QgZGVzdFBhdGggPSAoZGVzdCA9PT0gbnVsbCkgPyBudWxsIDogTG9jYXRvci5jcmVhdGUoU2NvcGVIZWxwZXIuZ2V0KHZhcmlhYmxlTWFwLCBcIlNPVVJDRV9ESVJcIikucmVzb2x2ZShkZXN0KSk7XG4gICAgY29uc3Qgc3JjU3RyID0gc3JjUGF0aC50b1N0cmluZygpO1xuICAgIGlmICh0aGlzLl9zdWJkaXJBbGlhcy5oYXNPd25Qcm9wZXJ0eShzcmNTdHIpKVxuICAgICAgbG9nZ2VyLndhcm4oYE93ZXJyaWRlIFwiJHtzcmNTdHJ9XCIgc3ViZGlyZWN0b3J5IGFsaWFzYCk7XG4gICAgdGhpcy5fc3ViZGlyQWxpYXNbc3JjU3RyXSA9IGRlc3RQYXRoO1xuICB9XG5cbiAgcHVibGljIGFkZENhY2hlVmFyaWFibGVzKHZhcmlhYmxlczogQ2FjaGVWYXJpYWJsZURlc2NyaXB0b3JzKSB7XG4gICAgY29uc3QgY2FjaGUgPSB0aGlzW0NBQ0hFXTtcbiAgICBmb3IgKGNvbnN0IFtrZXksIGVudHJ5XSBvZiBPYmplY3QuZW50cmllcyh2YXJpYWJsZXMpKSB7XG4gICAgICBjYWNoZVtrZXldID0gZW50cnk7XG4gICAgfVxuICB9XG5cbiAgcHVibGljIGxvYWRDYWNoZVZhcmlhYmxlcyhmaWxlbmFtZTogTG9jYXRvciB8IHN0cmluZykge1xuICAgIGlmIChmaWxlRXhpc3RzU3luYyhmaWxlbmFtZS50b1N0cmluZygpKSkge1xuICAgICAgY29uc3QgdmFyaWFibGVzID0gcmVxdWlyZVN5bmMoZmlsZW5hbWUudG9TdHJpbmcoKSk7XG4gICAgICB0aGlzLmFkZENhY2hlVmFyaWFibGVzKHZhcmlhYmxlcyk7XG4gICAgfVxuICB9XG5cbiAgcHVibGljIGNvcHlDYWNoZVZhcmlhYmxlcyhzY29wZTogYW55KSB7XG4gICAgZm9yIChjb25zdCBbbmFtZSwgZW50cnldIG9mIE9iamVjdC5lbnRyaWVzKHRoaXNbQ0FDSEVdKSkge1xuICAgICAgaWYgKCFPYmplY3QuaGFzT3duKHNjb3BlLCBuYW1lKSkge1xuICAgICAgICBjb25zdCB0eXBlID0gZW50cnkudHlwZSB8fCB0eXBlb2YgZW50cnkudmFsdWU7XG4gICAgICAgIGNvbnN0IGRlc2NyaXB0aW9uID0gZW50cnkuZGVzY3JpcHRpb24gfHwgXCJcIjtcbiAgICAgICAgbGV0IHZhbHVlID0gQXJyYXkuaXNBcnJheShlbnRyeS52YWx1ZSkgPyBbIC4uLmVudHJ5LnZhbHVlIF0gOiBlbnRyeS52YWx1ZTsgIFxuICAgICAgICBjb25zdCBuYW1lU3ltYm9sID0gU3ltYm9sKG5hbWUpO1xuICAgICAgICBzY29wZVtuYW1lU3ltYm9sXSA9IGVuc3VyZVZhbHVlQnlUeXBlKHR5cGUsIHZhbHVlKTtcbiAgXG4gICAgICAgIE9iamVjdC5kZWZpbmVQcm9wZXJ0eShzY29wZSwgbmFtZSwge1xuICAgICAgICAgIGVudW1lcmFibGU6IHRydWUsXG4gICAgICAgICAgZ2V0KCkge1xuICAgICAgICAgICAgcmV0dXJuIHRoaXNbbmFtZVN5bWJvbF07XG4gICAgICAgICAgfSxcbiAgICAgICAgICBzZXQodmFsdWUpIHtcbiAgICAgICAgICAgIHRoaXNbbmFtZVN5bWJvbF0gPSBlbnN1cmVWYWx1ZUJ5VHlwZSh0eXBlLCB2YWx1ZSk7XG4gICAgICAgICAgfSxcbiAgICAgICAgfSk7XG4gICAgICB9XG4gICAgfVxuICB9XG5cbiAgcHVibGljIGV4ZWN1dGVTY3JpcHRTeW5jKHZhcmlhYmxlTWFwOiBWYXJpYWJsZU1hcCwgc2NyaXB0OiBhbnksIHBhcmFtczogYW55KSB7XG4gICAgY29uc3QgbmV3VmFyaWFibGVNYXAgPSBTY29wZUhlbHBlci5jbG9uZVZhcmlhYmxlTWFwKHZhcmlhYmxlTWFwKTtcbiAgICBwYXJhbXMgJiYgU2NvcGVIZWxwZXIuZXh0ZW5kVmFyaWFibGVNYXBCeVZhbHVlcyhuZXdWYXJpYWJsZU1hcCwgXCJcIiwgcGFyYW1zKTtcbiAgICBjb25zdCBzY3JpcHRQYXRoID0gU2NvcGVIZWxwZXIuZ2V0KG5ld1ZhcmlhYmxlTWFwLCBcIlNPVVJDRV9ESVJcIikucmVzb2x2ZShzY3JpcHQpO1xuICAgIGNvbnN0IGZ1bmMgPSByZXF1aXJlU3luYyhzY3JpcHRQYXRoLnRvU3RyaW5nKCkpO1xuICAgIGNvbnN0IG1rID0gU2NyaXB0Q29udGV4dC5jcmVhdGUobmV3VmFyaWFibGVNYXApO1xuICAgIGZ1bmMobWspO1xuICB9XG5cbiAgcHVibGljIHdyaXRlQ2FjaGVWYXJpYWJsZXMoZmlsZW5hbWU6IHN0cmluZykge1xuICAgIGNvbnN0IGpzb24gPSBKU09OLnN0cmluZ2lmeSh0aGlzW0NBQ0hFXSwgbnVsbCwgMik7XG4gICAgZnMud3JpdGVGaWxlU3luYyhmaWxlbmFtZSwganNvbiwgXCJ1dGYtOFwiKTtcbiAgfVxuXG4gIHB1YmxpYyBhc3luYyBwcmVwZWFyU2NyaXB0RmlsZSh2YXJpYWJsZU1hcDogVmFyaWFibGVNYXApOiBQcm9taXNlPGJvb2xlYW4+IHtcbiAgICBjb25zdCBvcmlnaW5Tb3VyY2VEaXIgPSBTY29wZUhlbHBlci5nZXQodmFyaWFibGVNYXAsIFwiU09VUkNFX0RJUlwiKS50b1N0cmluZygpO1xuICAgIGNvbnN0IHJlc29sdmVTb3VyY2VEaXIgPSB0aGlzLnJlc29sdmVTdWJkaXJlY3Rvcnkob3JpZ2luU291cmNlRGlyKTtcbiAgICBpZiAoIXJlc29sdmVTb3VyY2VEaXIpIHtcbiAgICAgIGxvZ2dlci5pbmZvKGBTb3VyY2UgZGlyIFwiJHtvcmlnaW5Tb3VyY2VEaXJ9XCIgd2FzIGRpc2FibGVkYCk7XG4gICAgICByZXR1cm4gZmFsc2U7XG4gICAgfVxuICAgIFNjb3BlSGVscGVyLnNldCh2YXJpYWJsZU1hcCwgXCJTT1VSQ0VfRElSXCIsIHJlc29sdmVTb3VyY2VEaXIpO1xuXG4gICAgaWYgKCFTY29wZUhlbHBlci5nZXQodmFyaWFibGVNYXAsIFwiU0NSSVBUX0ZJTEVcIikpIHtcbiAgICAgIGxldCBzY3JpcHRGaWxlOiBMb2NhdG9yIHwgdW5kZWZpbmVkO1xuICAgICAgY29uc3QgZmlsZUxpc3QgPSBbIFwiLmpzXCIsIFwiLm1qc1wiIF0ubWFwKGkgPT4gXCJNYWtlU2NyaXB0XCIgKyBpKTtcbiAgICAgIGZvciAoY29uc3QgZmlsZW5hbWUgb2YgZmlsZUxpc3QpIHtcbiAgICAgICAgY29uc3QgaXRlciA9IFNjb3BlSGVscGVyLmdldCh2YXJpYWJsZU1hcCwgXCJTT1VSQ0VfRElSXCIpLmpvaW4oZmlsZW5hbWUpO1xuICAgICAgICBpZiAoYXdhaXQgZmlsZUV4aXN0cyhpdGVyLnRvU3RyaW5nKCkpKSB7XG4gICAgICAgICAgc2NyaXB0RmlsZSA9IGl0ZXI7XG4gICAgICAgICAgYnJlYWs7XG4gICAgICAgIH1cbiAgICAgIH1cblxuICAgICAgaWYgKCFzY3JpcHRGaWxlKVxuICAgICAgICB0aHJvdyBuZXcgRXJyb3IoYFRoZXJlIGFyZSBubyBmaWxlcyAke2ZpbGVMaXN0LmpvaW4oXCIsIFwiKX0gaW4gXCIke1Njb3BlSGVscGVyLmdldCh2YXJpYWJsZU1hcCwgXCJTT1VSQ0VfRElSXCIpfVwiYCk7XG5cbiAgICAgIFNjb3BlSGVscGVyLnNldCh2YXJpYWJsZU1hcCwgXCJTQ1JJUFRfRklMRVwiLCBzY3JpcHRGaWxlKTtcbiAgICAgIFNjb3BlSGVscGVyLnNldCh2YXJpYWJsZU1hcCwgXCJTQ1JJUFRfRElSXCIsIFNjb3BlSGVscGVyLmdldCh2YXJpYWJsZU1hcCwgXCJTQ1JJUFRfRklMRVwiKS5kaXJuYW1lKCkpO1xuICAgIH1cblxuICAgIHRoaXMucmVnaXN0ZXJWYXJpYWJsZU1hcChTY29wZUhlbHBlci5nZXQodmFyaWFibGVNYXAsIFwiU0NSSVBUX0ZJTEVcIikudG9TdHJpbmcoKSwgdmFyaWFibGVNYXApO1xuICAgIHJldHVybiB0cnVlO1xuICB9XG5cbiAgcHVibGljIGZpbmRTY3JpcHRGdW5jdGlvbihuYW1lOiBzdHJpbmcpOiBGdW5jdGlvbiB8IHVuZGVmaW5lZCB7XG4gICAgcmV0dXJuIHRoaXMuX2J1aWx0aW5TY3JpcHRzW25hbWVdO1xuICB9XG5cbiAgcHVibGljIGFwcGx5TWFpblRhcmdldHModGFyZ2V0czogTWFpblRhcmdldFtdKSB7XG4gICAgZm9yIChjb25zdCBpdGVyIG9mIHRhcmdldHMpXG4gICAgICB0aGlzW1RBUkdFVFNdLnNldChpdGVyLnRhcmdldE5hbWUsIGl0ZXIpO1xuICB9XG5cbiAgcHVibGljIGFwcGx5TWFpblNjcmlwdHMoc2NyaXB0czogQ3VzdG9tU2NyaXB0W10pIHtcbiAgICBmb3IgKGNvbnN0IGl0ZXIgb2Ygc2NyaXB0cylcbiAgICAgICAgdGhpcy5fY3VzdG9tU2NyaXB0cy5zZXQoaXRlci5OQU1FLCBpdGVyKTtcbiAgfVxuXG4gIHB1YmxpYyBhcHBseUluc3RhbGxFbnRpdGllcyhlbnRyaWVzOiBJbnN0YWxsRW50aXR5W10pIHtcbiAgICBmb3IgKGNvbnN0IGl0ZXIgb2YgZW50cmllcylcbiAgICAgICAgdGhpcy5faW5zdGFsbExpc3QucHVzaChpdGVyKTtcbiAgfVxuXG4gIHB1YmxpYyBhcHBsUG9zdFRhcmdldHModGFyZ2V0czogUG9zdFRhcmdldFtdKSB7XG4gICAgZm9yIChjb25zdCBwb3N0VGFyZ2V0IG9mIHRhcmdldHMpIHtcbiAgICAgIGNvbnN0IHRhcmdldCA9IHRoaXNbVEFSR0VUU10uZ2V0KHBvc3RUYXJnZXQubmFtZSk7XG4gICAgICBpZiAoIXRhcmdldClcbiAgICAgICAgdGhyb3cgbmV3IEVycm9yKGBUaGVyZSBpcyBubyBUYXJnZXQgbmFtZWQgJHtuYW1lfWApO1xuICAgICAgdGFyZ2V0LnBvc3RVcGRhdGUocG9zdFRhcmdldCk7XG4gICAgfVxuICB9XG5cbiAgcHVibGljIGFwcGxQb3N0U2NyaXB0cyhzY3JpcHRzOiBQb3N0Q3VzdG9tU2NyaXB0W10pIHtcbiAgICBmb3IgKGNvbnN0IHBvc3RTY3JpcHQgb2Ygc2NyaXB0cykge1xuICAgICAgY29uc3Qgc2NyaXB0ID0gdGhpcy5fY3VzdG9tU2NyaXB0cy5nZXQocG9zdFNjcmlwdC5uYW1lKTtcbiAgICAgIGlmICghc2NyaXB0KVxuICAgICAgICB0aHJvdyBuZXcgRXJyb3IoYFRoZXJlIGlzIG5vIEN1c3RvbVNjcmlwdCBuYW1lZCAke25hbWV9YCk7XG4gICAgICBzY3JpcHQucG9zdFVwZGF0ZShwb3N0U2NyaXB0KTtcbiAgICB9XG4gIH1cblxuICBwdWJsaWMgY3JlYXRlR29hbHMoc2NvcGU6IFN5c3RlbVNjb3BlKTogR29hbENvbGxlY3Rpb24ge1xuICAgIGNvbnN0IGdvYWxMaXN0ID0gbmV3IEdvYWxDb2xsZWN0aW9uO1xuICAgIGZvciAoY29uc3QgW25hbWUsIHNjcmlwdF0gb2YgdGhpcy5fY3VzdG9tU2NyaXB0cy5lbnRyaWVzKCkpIHsgICBcbiAgICAgIGNvbnN0IGRlcGVuZHMgPSBbXTtcblxuICAgICAgbGV0IHNjcmlwdE9iajogTG9jYXRvciB8IEZ1bmN0aW9uO1xuICAgICAgaWYgKHR5cGVvZiBzY3JpcHQuc2NyaXB0TW9kdWxlID09PSBcInN0cmluZ1wiKSB7XG4gICAgICAgIGNvbnN0IGZ1bmMgPSB0aGlzLmZpbmRTY3JpcHRGdW5jdGlvbihzY3JpcHQuc2NyaXB0TW9kdWxlKTtcbiAgICAgICAgc2NyaXB0T2JqID0gZnVuYyA/IGZ1bmMgOiBzY3JpcHQuc291cmNlRGlyLnJlc29sdmUoc2NyaXB0LnNjcmlwdE1vZHVsZSk7XG4gICAgICB9XG4gICAgICBlbHNlIHtcbiAgICAgICAgZGVwZW5kcy5wdXNoKHNjcmlwdC5zY3JpcHRNb2R1bGUudG9QYXRoKCkpO1xuICAgICAgICBzY3JpcHRPYmogPSBzY3JpcHQuc2NyaXB0TW9kdWxlO1xuICAgICAgfVxuXG4gICAgICBpZiAoc2NyaXB0LklOUFVUKSB7XG4gICAgICAgIGRlcGVuZHMucHVzaChzY3JpcHQuSU5QVVQudG9QYXRoKCkpO1xuICAgICAgfVxuXG4gICAgICBjb25zdCBtc2cgPSBcIlxceDFiWzM2bVwiICsgXCJHZW5lcmF0aW5nIFwiICsgc2NyaXB0LmJpbmFyeURpci5yZWxhdGl2ZShzY3JpcHQuT1VUUFVUKSArIFwiXFx4MWJbMG1cIjtcbiAgICAgIGNvbnN0IGdlID0gbmV3IEdvYWxUYXJnZXQobmFtZSk7XG4gICAgICBnZS5tZXNzYWdlID0gbXNnO1xuICAgICAgZ2Uub3V0cHV0ID0gc2NyaXB0Lk9VVFBVVDtcbiAgICAgIGdlLmFkZERlcGVuZGVuY3koLi4uZGVwZW5kcyk7XG4gICAgICBnZS5hZGRUYXNrKG5ldyBFeGVjU2NyaXB0VGFzayhzY3JpcHQudmFyaWFibGVNYXAsIHNjcmlwdE9iaikpO1xuICAgICAgZ29hbExpc3QuYWRkVGFyZ2V0KGdlKTtcbiAgICB9XG5cbiAgICBjb25zdCBvYmplY3RGaWxlcyA9IG5ldyBNYXA8U291cmNlRmlsZSwgTG9jYXRvcj4oKTtcbiAgICBmb3IgKGNvbnN0IHRhcmdldCBvZiB0aGlzW1RBUkdFVFNdLkVOVFJJRVMudmFsdWVzKCkpIHtcbiAgICAgIGZvciAoY29uc3QgaXQgb2YgdGFyZ2V0LmdldFNvdXJjZUZpbGVzKCkpIHtcbiAgICAgICAgaWYgKCFpdC5MQU5HVUFHRSlcbiAgICAgICAgICBjb250aW51ZTtcbiAgICAgICAgY29uc3QgcmZpbGUxID0gdGFyZ2V0LmJpbmFyeURpci5yZWxhdGl2ZShpdC5GSUxFKTtcbiAgICAgICAgY29uc3QgcmZpbGUyID0gIHRhcmdldC5zb3VyY2VEaXIucmVsYXRpdmUoaXQuRklMRSk7XG4gICAgICAgIGNvbnN0IHJmaWxlID0gKHJmaWxlMi5sZW5ndGggPCByZmlsZTEubGVuZ3RoID8gcmZpbGUyIDogcmZpbGUxKS5yZXBsYWNlKFwiLi4vXCIsIFwiX18vXCIpO1xuICAgICAgICBjb25zdCBvZmlsZSA9ICB0YXJnZXQuYmluYXJ5RGlyLmpvaW4oXCJNYWtlRmlsZXNcIiwgdGFyZ2V0LnRhcmdldE5hbWUgKyBcIi5kaXJcIiwgIHJmaWxlICsgXCIub2JqXCIpO1xuICAgICAgICBvYmplY3RGaWxlcy5zZXQoaXQsIG9maWxlKTtcbiAgICAgIH1cbiAgICB9XG5cbiAgICBmb3IgKGNvbnN0IFtuYW1lLCB0YXJnZXRdIG9mIHRoaXNbVEFSR0VUU10uRU5UUklFUykge1xuICAgICAgY29uc3QgZGVwZW5kcyA9IFtdO1xuICAgICAgZm9yIChjb25zdCBzIG9mIHRhcmdldC5nZXRUYXJnZXRPYmplY3RzKCkpIHtcbiAgICAgICAgY29uc3QgdCA9IHRoaXNbVEFSR0VUU10uZ2V0KHMudGFyZ2V0TmFtZSk7XG4gICAgICAgIGZvciAoY29uc3QgZiBvZiB0LmdldFNvdXJjZUZpbGVzKCkpIHtcbiAgICAgICAgICBjb25zdCBvID0gb2JqZWN0RmlsZXMuZ2V0KGYpO1xuICAgICAgICAgIG8gJiYgZGVwZW5kcy5wdXNoKG8udG9TdHJpbmcoKSk7XG4gICAgICAgIH1cbiAgICAgIH1cbiAgXG4gICAgICBjb25zdCBoZWFkZXJzID0gdGhpc1tUQVJHRVRTXS5hbGxIZWFkZXJzT2YodGFyZ2V0KTtcbiAgICAgIGZvciAoY29uc3QgcyBvZiB0YXJnZXQuZ2V0U291cmNlRmlsZXMoKSkge1xuICAgICAgICBpZiAocy5IRUFERVJfRklMRV9PTkxZKVxuICAgICAgICAgIGNvbnRpbnVlO1xuXG4gICAgICAgIGNvbnN0IG8gPSBvYmplY3RGaWxlcy5nZXQocyk7XG4gICAgICAgIGlmICghbylcbiAgICAgICAgICB0aHJvdyBuZXcgRXJyb3IoYE9CSkVDVF9GSUxFIGlzIG51bGxgKTtcblxuICAgICAgICBmcy5ta2RpclN5bmMoby5kaXJuYW1lKCkudG9TdHJpbmcoKSwgeyByZWN1cnNpdmU6IHRydWUgfSk7XG4gIFxuICAgICAgICBjb25zdCByZWxhdGl2ZU9iamVjdCA9IHRhcmdldC5iaW5hcnlEaXIucmVsYXRpdmUobyk7XG4gICAgICAgIGNvbnN0IHJlbGF0aXZlQmluYXJ5RGlyID0gc2NvcGUuUFJPSkVDVF9CSU5BUllfRElSLnJlbGF0aXZlKHRhcmdldC5iaW5hcnlEaXIpO1xuICAgICAgICBjb25zdCBtc2cgPSBcIlxceDFiWzMybVwiICsgYEJ1aWxkaW5nICR7cy5MQU5HVUFHRX0gb2JqZWN0ICR7cmVsYXRpdmVCaW5hcnlEaXJ9LyR7cmVsYXRpdmVPYmplY3R9YCArIFwiXFx4MWJbMG1cIjtcbiAgXG4gICAgICAgIGNvbnN0IGRlZmluaXRpb25zID0gW1xuICAgICAgICAgIC4uLnRoaXNbVEFSR0VUU10uYWxsRGVmaW5pdGlvbnNPZih0YXJnZXQpLFxuICAgICAgICAgIC4uLnMuREVGSU5FUyxcbiAgICAgICAgXTtcblxuICAgICAgICBjb25zdCBhcmdzOiBzdHJpbmdbXSA9IFtdO1xuICAgICAgICBhcmdzLnB1c2goLi4uZGVmaW5pdGlvbnMubWFwKGkgPT4gXCItRFwiICsgaSkpO1xuICAgICAgICBhcmdzLnB1c2goLi4udGhpc1tUQVJHRVRTXS5hbGxJbmNsdWRlc09mKHRhcmdldCkubWFwKGkgPT4gXCItSVwiICsgaSkpO1xuICAgICAgICBhcmdzLnB1c2goLi4udGhpc1tUQVJHRVRTXS5hbGxDb21waWxlT3B0aW9uc09mKHRhcmdldCkpO1xuICAgICAgICBpZiAodGFyZ2V0LnBvc2l0aW9uSW5kZXBlbmRlbnRDb2RlKVxuICAgICAgICAgIGFyZ3MucHVzaChcIi1mUElDXCIpO1xuICAgICAgICBhcmdzLnB1c2goLi4ucy5DT01QSUxFX0ZMQUdTLmZsYXQoKSk7XG4gICAgICAgIGFyZ3MucHVzaChcIi1vXCIsIHJlbGF0aXZlT2JqZWN0KTtcbiAgICAgICAgYXJncy5wdXNoKFwiLWNcIiwgcy5GSUxFLnRvU3RyaW5nKCkpO1xuICBcbiAgICAgICAgY29uc3Qgb3V0cHV0ID0gTG9jYXRvci5jcmVhdGUodGFyZ2V0LmJpbmFyeURpci5qb2luKHJlbGF0aXZlT2JqZWN0KSk7XG4gICAgICAgIGRlcGVuZHMucHVzaChvdXRwdXQudG9TdHJpbmcoKSk7XG5cbiAgICAgICAgY29uc3QgZ2UgPSBuZXcgR29hbFRhcmdldDtcbiAgICAgICAgZ2UubWVzc2FnZSA9IG1zZztcbiAgICAgICAgZ2Uub3V0cHV0ID0gb3V0cHV0O1xuICAgICAgICBnZS5hZGREZXBlbmRlbmN5KC4uLmhlYWRlcnMpO1xuICAgICAgICBnZS5hZGREZXBlbmRlbmN5KHMuRklMRS50b1BhdGgoKSk7XG4gICAgICAgIGdlLmFkZFRhc2sobmV3IFNwYXduU3luY1Rhc2socy5DT01QSUxFX1BBVEgudG9TdHJpbmcoKSwgYXJncywgdGFyZ2V0LmJpbmFyeURpci50b1BhdGgoKSkpO1xuICAgICAgICBnb2FsTGlzdC5hZGRUYXJnZXQoZ2UpO1xuICAgICAgfVxuXG4gICAgICBjb25zdCBnZW5lcmFsR29hbCA9IG5ldyBHb2FsVGFyZ2V0O1xuICAgICAgZm9yIChjb25zdCBwYXJhbXMgb2YgdGFyZ2V0LnByZUJ1aWxkTGlzdCkge1xuICAgICAgICBjb25zdCBleGVjU3RydWN0ID0gcmVzb2x2ZVRhcmdldENvbW1hbmQodGhpcywgcGFyYW1zKTtcbiAgICAgICAgZ2VuZXJhbEdvYWwuYWRkVGFzayhuZXcgU3Bhd25TeW5jVGFzayhleGVjU3RydWN0LmNvbW1hbmQsIGV4ZWNTdHJ1Y3QuYXJncywgdGFyZ2V0LmJpbmFyeURpci50b1N0cmluZygpKSk7XG4gICAgICB9XG5cbiAgICAgIGNvbnN0IGxpbmtPcHRpb25zID0gdGhpc1tUQVJHRVRTXS5hbGxMaW5rT3B0aW9uc09mKHRhcmdldCk7XG4gICAgICBpZiAodGFyZ2V0LmlzT2JqZWN0TGlicmFyeSkge1xuICAgICAgICBjb25zdCBvYmpzID0gZGVwZW5kcy5maWx0ZXIoaSA9PiBpLmVuZHNXaXRoKFwiLm9cIikgfHwgaS5lbmRzV2l0aChcIi5vYmpcIikpLm1hcChpID0+IHRhcmdldC5nZXRGaWxlRGlyKCkucmVsYXRpdmUoaSkpO1xuICAgICAgICBpZiAob2Jqcy5sZW5ndGgpIHtcbiAgICAgICAgICBjb25zdCBhcmdzID0gW1xuICAgICAgICAgICAgLi4ubGlua09wdGlvbnMsXG4gICAgICAgICAgICBcIi1yXCIsXG4gICAgICAgICAgICBcIi1vXCIsIHRhcmdldC5nZXRGaWxlTmFtZSgpLFxuICAgICAgICAgICAgLi4ub2Jqc1xuICAgICAgICAgIF07XG4gICAgICAgICAgZ2VuZXJhbEdvYWwubWVzc2FnZSA9IGBMaW5raW5nICR7dGFyZ2V0Lmxhbmd1YWdlfSBvYmplY3QgbGlicmFyeSAke3RhcmdldC5nZXRGaWxlTmFtZSgpfWA7XG4gICAgICAgICAgZ2VuZXJhbEdvYWwub3V0cHV0ID0gdGFyZ2V0LmdldEZpbGUoKTtcbiAgICAgICAgICBnZW5lcmFsR29hbC5hZGREZXBlbmRlbmN5KC4uLmRlcGVuZHMpO1xuICAgICAgICAgIGdlbmVyYWxHb2FsLmFkZFRhc2sobmV3IFNwYXduU3luY1Rhc2soc2NvcGUuTElOS0VSLCBhcmdzLCB0YXJnZXQuZ2V0RmlsZURpcigpLnRvU3RyaW5nKCkpKTtcbiAgICAgICAgfVxuICAgICAgICBlbHNlIHtcbiAgICAgICAgICBsb2dnZXIuaW5mbyhgTm8gb2JqZWN0cyBmb3IgXCIke3RhcmdldC50YXJnZXROYW1lfVwiYCk7XG4gICAgICAgIH1cbiAgICAgIH1cbiAgXG4gICAgICBpZiAodGFyZ2V0LmlzU3RhdGljTGlicmFyeSkge1xuICAgICAgICBjb25zdCBvYmpzID0gZGVwZW5kcy5maWx0ZXIoaSA9PiBpLmVuZHNXaXRoKFwiLm9cIikgfHwgaS5lbmRzV2l0aChcIi5vYmpcIikpLm1hcChpID0+IHRhcmdldC5nZXRGaWxlRGlyKCkucmVsYXRpdmUoaSkpO1xuICAgICAgICBpZiAob2Jqcy5sZW5ndGgpIHtcbiAgICAgICAgICBjb25zdCBhcmdzID0gWyBcInJjXCIsIHRhcmdldC5nZXRGaWxlTmFtZSgpICwgLi4ub2JqcyBdO1xuICAgICAgICAgIGdlbmVyYWxHb2FsLm1lc3NhZ2UgPSBgTGlua2luZyAke3RhcmdldC5sYW5ndWFnZX0gc3RhdGljIGxpYnJhcnkgJHt0YXJnZXQuZ2V0RmlsZU5hbWUoKX1gO1xuICAgICAgICAgIGdlbmVyYWxHb2FsLm91dHB1dCA9IHRhcmdldC5nZXRGaWxlKCk7XG4gICAgICAgICAgZ2VuZXJhbEdvYWwuYWRkRGVwZW5kZW5jeSguLi5kZXBlbmRzKTtcbiAgICAgICAgICBnZW5lcmFsR29hbC5hZGRUYXNrKG5ldyBTcGF3blN5bmNUYXNrKHNjb3BlLkFSLCBhcmdzLCB0YXJnZXQuZ2V0RmlsZURpcigpLnRvU3RyaW5nKCkpKTtcbiAgICAgICAgfVxuICAgICAgICBlbHNlIHtcbiAgICAgICAgICBsb2dnZXIuaW5mbyhgTm8gb2JqZWN0cyBmb3IgXCIke3RhcmdldC50YXJnZXROYW1lfVwiYCk7XG4gICAgICAgIH1cbiAgICAgIH1cbiAgXG4gICAgICBpZiAodGFyZ2V0LmlzU2hhcmVkTGlicmFyeSkge1xuICAgICAgICB0aHJvdyBuZXcgRXJyb3IoXCJOb3QgaW1wbGVtZW50ZWRcIik7XG4gICAgICB9XG5cbiAgICAgIGlmICh0YXJnZXQuaXNFeGVjdXRhYmxlKSB7XG4gICAgICAgIGNvbnN0IG9ianMgPSBkZXBlbmRzLmZpbHRlcihpID0+IGkuZW5kc1dpdGgoXCIub1wiKSB8fCBpLmVuZHNXaXRoKFwiLm9ialwiKSkubWFwKGkgPT4gdGFyZ2V0LmdldEZpbGVEaXIoKS5yZWxhdGl2ZShpKSk7XG4gICAgICAgIGlmIChvYmpzLmxlbmd0aCkge1xuICAgICAgICAgIGNvbnN0IGxpYnMgPSB0aGlzW1RBUkdFVFNdLmFsbExpYnJhcmllc09mKHRhcmdldCk7XG4gICAgICAgICAgY29uc3QgYXJncyA9IFtcbiAgICAgICAgICAgIC4uLnRhcmdldC5jb21waWxlckZsYWdzLFxuICAgICAgICAgICAgLi4ubGlua09wdGlvbnMsXG4gICAgICAgICAgICAuLi5vYmpzLFxuICAgICAgICAgICAgXCItb1wiLCB0YXJnZXQuZ2V0RmlsZU5hbWUoKSxcbiAgICAgICAgICAgIC4uLmxpYnMubWFwKGkgPT4gdGFyZ2V0LmdldEZpbGVEaXIoKS5yZWxhdGl2ZShpKSksXG4gICAgICAgICAgXTtcblxuICAgICAgICAgIGdlbmVyYWxHb2FsLm1lc3NhZ2UgPSBgTGlua2luZyAke3RhcmdldC5sYW5ndWFnZX0gZXhlY3V0YWJsZSAke3RhcmdldC5nZXRGaWxlTmFtZSgpfWA7XG4gICAgICAgICAgZ2VuZXJhbEdvYWwub3V0cHV0ID0gdGFyZ2V0LmdldEZpbGUoKTtcbiAgICAgICAgICBnZW5lcmFsR29hbC5hZGREZXBlbmRlbmN5KC4uLmRlcGVuZHMpO1xuICAgICAgICAgIGdlbmVyYWxHb2FsLmFkZERlcGVuZGVuY3koLi4ubGlicyk7XG4gICAgICAgICAgZ2VuZXJhbEdvYWwuYWRkVGFzayhuZXcgU3Bhd25TeW5jVGFzayh0YXJnZXQuY29tcGlsZXJQYXRoLCBhcmdzLCB0YXJnZXQuZ2V0RmlsZURpcigpLnRvU3RyaW5nKCkpKTtcbiAgICAgICAgfVxuICAgICAgICBlbHNlIHtcbiAgICAgICAgICBsb2dnZXIuaW5mbyhgTm8gb2JqZWN0cyBmb3IgXCIke3RhcmdldC50YXJnZXROYW1lfVwiYCk7XG4gICAgICAgIH1cbiAgICAgIH1cblxuICAgICAgZm9yIChjb25zdCBwYXJhbXMgb2YgdGFyZ2V0LnBvc3RCdWlsZExpc3QpIHtcbiAgICAgICAgY29uc3QgZXhlY1N0cnVjdCA9IHJlc29sdmVUYXJnZXRDb21tYW5kKHRoaXMsIHBhcmFtcyk7XG4gICAgICAgIGdlbmVyYWxHb2FsLmFkZFRhc2sobmV3IFNwYXduU3luY1Rhc2soZXhlY1N0cnVjdC5jb21tYW5kLCBleGVjU3RydWN0LmFyZ3MsIHRhcmdldC5iaW5hcnlEaXIudG9TdHJpbmcoKSkpO1xuICAgICAgfVxuICAgICAgXG4gICAgICBnb2FsTGlzdC5hZGRUYXJnZXQoZ2VuZXJhbEdvYWwpO1xuXG4gICAgICBjb25zdCB3b3JrZXIgPSBuZXcgR29hbFRhcmdldChuYW1lKTtcbiAgICAgIHdvcmtlci5tZXNzYWdlID0gYEJ1aWx0IHRhcmdldCAke25hbWV9YDtcbiAgICAgIHdvcmtlci5hZGREZXBlbmRlbmN5KHRhcmdldC5nZXRGaWxlKCkudG9QYXRoKCkpO1xuICAgICAgZ29hbExpc3QuYWRkVGFyZ2V0KHdvcmtlcik7XG4gICAgfVxuXG4gICAgaWYgKHRoaXMuX2luc3RhbGxMaXN0Lmxlbmd0aCkge1xuICAgICAgY29uc3Qgd29ya2VyID0gbmV3IEdvYWxUYXJnZXQoSU5TVEFMTF9UQVJHRVQpO1xuICAgICAgY29uc3QgZmlsZUluc3RhbGxhdGlvblRhc2sgPSBuZXcgRmlsZUluc3RhbGxhdGlvblRhc2s7XG4gICAgICBmb3IgKGNvbnN0IGl0ZXIgb2YgdGhpcy5faW5zdGFsbExpc3QpIHtcbiAgICAgICAgbGV0IHNyYzogTG9jYXRvciwgZGVzdDogTG9jYXRvcjtcbiAgICAgICAgaWYgKGl0ZXIudmFsdWUgaW5zdGFuY2VvZiBMb2NhdG9yKSB7XG4gICAgICAgICAgaWYgKHNjb3BlLlBSRVZFTlRfSU5TVEFMTF9GSUxFUylcbiAgICAgICAgICAgIGNvbnRpbnVlO1xuICAgICAgICAgIHNyYyA9IGl0ZXIudmFsdWU7XG4gICAgICAgICAgY29uc3QgcmZpbGUgPSAoaXRlci5iYXNlRGlyIGFzIGFueSkucmVsYXRpdmUoaXRlci52YWx1ZSk7XG4gICAgICAgICAgZGVzdCA9IGl0ZXIuZGVzdGluYXRpb24uam9pbihyZmlsZSk7XG4gICAgICAgIH1cbiAgICAgICAgZWxzZSBpZiAoaXRlci52YWx1ZSBpbnN0YW5jZW9mIFRhcmdldE5hbWUpIHtcbiAgICAgICAgICBjb25zdCB0YXJnZXROYW1lID0gaXRlci52YWx1ZS50YXJnZXROYW1lO1xuICAgICAgICAgIGNvbnN0IHRhcmdldCA9IHRoaXNbVEFSR0VUU10uZ2V0KHRhcmdldE5hbWUpO1xuICAgICAgICAgIHNyYyA9IHRhcmdldC5nZXRGaWxlKCk7XG4gICAgICAgICAgZGVzdCA9IGl0ZXIuZGVzdGluYXRpb24uam9pbih0YXJnZXQuZ2V0RmlsZU5hbWUoKSk7XG4gICAgICAgIH1cbiAgICAgICAgZWxzZSB7XG4gICAgICAgICAgdGhyb3cgbmV3IEVycm9yKGBDYW4gbm90IGluc3RhbGwgJHtpdGVyLnZhbHVlfWApXG4gICAgICAgIH1cbiAgICAgICAgaWYgKHNjb3BlLkRFU1RESVIpXG4gICAgICAgICAgZGVzdCA9IHNjb3BlLkRFU1RESVIuam9pbihkZXN0KTtcbiAgICAgICAgd29ya2VyLmFkZERlcGVuZGVuY3koc3JjLnRvUGF0aCgpKTtcbiAgICAgICAgZmlsZUluc3RhbGxhdGlvblRhc2suYWRkKHNyYywgZGVzdCk7XG4gICAgICB9XG4gICAgICB3b3JrZXIuYWRkVGFzayhmaWxlSW5zdGFsbGF0aW9uVGFzayk7XG4gICAgICBnb2FsTGlzdC5hZGRUYXJnZXQod29ya2VyKTtcbiAgICB9XG5cbiAgICBjb25zdCBnZSA9IG5ldyBHb2FsVGFyZ2V0KEFMTF9UQVJHRVQpO1xuICAgIE9iamVjdC5rZXlzKHRoaXNbVEFSR0VUU10uRU5UUklFUykuZm9yRWFjaChpID0+IHZvaWQgZ2UuYWRkRGVwZW5kZW5jeShpKSlcbiAgICBnb2FsTGlzdC5hZGRUYXJnZXQoZ2UpO1xuICBcbiAgICByZXR1cm4gZ29hbExpc3Q7XG4gIH1cblxuICBwdWJsaWMgdG9KU09OKCkge1xuICAgIHJldHVybiB7XG4gICAgICBUQVJHRVRTOiB0aGlzLlRBUkdFVFMsXG4gICAgICBjdXN0b21TY3JpcHRzOiB0aGlzLl9jdXN0b21TY3JpcHRzLFxuICAgICAgQ0FDSEU6IHRoaXMuQ0FDSEUsXG4gICAgICBpbnN0YWxsTGlzdDogdGhpcy5faW5zdGFsbExpc3QsXG4gICAgICBwcm9jZXNzZWRWYXJpYWJsZU1hcDogdGhpcy5fcHJvY2Vzc2VkVmFyaWFibGVNYXAsXG4gICAgICBzdWJkaXJBbGlhczogdGhpcy5fc3ViZGlyQWxpYXMsXG4gICAgfTtcbiAgfVxufTtcbiIsIi8qXG4gKiBNSVQgTGljZW5zZVxuICpcbiAqIENvcHlyaWdodCAoYykgMjAyNSAgWXVyaWkgWWFrdWJpbiAoeXVyaWkueWFrdWJpbkBnbWFpbC5jb20pXG4gKlxuICogUGVybWlzc2lvbiBpcyBncmFudGVkIHRvIHVzZSwgY29weSwgbW9kaWZ5LCBhbmQgZGlzdHJpYnV0ZSB0aGlzIHNvZnR3YXJlXG4gKiB1bmRlciB0aGUgTUlUIExpY2Vuc2UuIFNlZSBMSUNFTlNFIGZpbGUgZm9yIGRldGFpbHMuXG4gKi9cblxuaW1wb3J0IHsgTG9jYXRvciB9IGZyb20gXCJAL3V0aWxzL0xvY2F0b3JcIjtcbmltcG9ydCB7IGRlZXBDb3B5IH0gZnJvbSBcIkAvdXRpbHMvUHJpbWl0aXZlc1wiO1xuXG5pbnRlcmZhY2UgVmFyaWFibGVEZXNjcmlwdG9yIHtcbiAgdHlwZT86IHN0cmluZyB8IHN0cmluZ1tdO1xuICB2YWx1ZT86IGFueTtcbiAgZGVzY3JpcHRpb24/OiBzdHJpbmc7XG59O1xuXG5pbnRlcmZhY2UgVmFyaWFibGVFbnRyeSB7XG4gIHR5cGU6IHN0cmluZyB8IHN0cmluZ1tdO1xuICBncm91cDogc3RyaW5nO1xuICBkZXNjcmlwdGlvbjogc3RyaW5nO1xuICBpbml0VmFsdWU/OiBhbnk7XG4gIHZhbHVlPzogYW55O1xufTtcblxuZXhwb3J0IGludGVyZmFjZSBWYXJpYWJsZU1hcCB7XG4gIFsgbmFtZTogc3RyaW5nIF06IFZhcmlhYmxlRW50cnk7XG59O1xuXG5leHBvcnQgdHlwZSBWYXJpYW50ID0gYm9vbGVhbiB8IG51bWJlciB8IHN0cmluZyB8IGJvb2xlYW5bXSB8IG51bWJlcltdIHwgc3RyaW5nW107XG5leHBvcnQgdHlwZSBWYXJpYW50TWFwID0ge1xuICBbIG5hbWU6IHN0cmluZyBdOiBWYXJpYW50O1xufTtcblxuZXhwb3J0IG5hbWVzcGFjZSBTY29wZUhlbHBlciB7XG5cbmZ1bmN0aW9uIHRvRGVzY3JpcHRvcih2YWx1ZTogYW55KTogVmFyaWFibGVEZXNjcmlwdG9yIHtcbiAgaWYgKCF2YWx1ZSB8fCB0eXBlb2YgdmFsdWUgPT09IFwiYm9vbGVhblwiIHx8IHR5cGVvZiB2YWx1ZSA9PT0gXCJudW1iZXJcIiB8fCB0eXBlb2YgdmFsdWUgPT09IFwic3RyaW5nXCIgfHwgQXJyYXkuaXNBcnJheSh2YWx1ZSkpIHtcbiAgICByZXR1cm4geyB2YWx1ZSB9OyBcbiAgfVxuICByZXR1cm4gdmFsdWU7XG59XG5cbmZ1bmN0aW9uIGdldEVudHJ5VmFsdWUoZW50cnk6IFZhcmlhYmxlRW50cnkpOiBhbnkge1xuICAvKmlmICh2YWx1ZSA9PT0gdW5kZWZpbmVkKVxuICAgIHRocm93IG5ldyBFcnJvcihgVmFsdWUgb2YgJHtuYW1lfSBjYW5ub3QgYmUgb2J0YWluZWQgYmVjYXVzZSBpdCBoYXMgbm90IGJlZW4gZXN0YWJsaXNoZWRgKTsqL1xuICByZXR1cm4gKGVudHJ5LnZhbHVlID09PSB1bmRlZmluZWQpID8gZW50cnkuaW5pdFZhbHVlIDogZW50cnkudmFsdWU7XG59XG5cbmV4cG9ydCBmdW5jdGlvbiBnZXQodmFyaWFibGVNYXA6IFZhcmlhYmxlTWFwLCBuYW1lOiBzdHJpbmcpOiBhbnkge1xuICBjb25zdCBlbnRyeSA9IHZhcmlhYmxlTWFwW25hbWVdO1xuICBpZiAoZW50cnkpXG4gICAgcmV0dXJuIGdldEVudHJ5VmFsdWUoZW50cnkpO1xufVxuXG5jb25zdCBtYWtlVmFsdWVNYXA6IGFueSA9IHtcbiAgYXJyYXk6ICh2YWx1ZTogYW55KSA9PiB7XG4gICAgcmV0dXJuIEFycmF5LmlzQXJyYXkodmFsdWUpID8gQXJyYXkuZnJvbSh2YWx1ZSkgOiB1bmRlZmluZWQ7XG4gIH0sXG4gIGJvb2xlYW46ICh2YWx1ZTogYW55KSA9PiB7XG4gICAgcmV0dXJuICh0eXBlb2YgdmFsdWUgPT09IFwiYm9vbGVhblwiKSA/IHZhbHVlIDogdW5kZWZpbmVkO1xuICB9LFxuICBudW1iZXI6ICh2YWx1ZTogYW55KSA9PiB7XG4gICAgcmV0dXJuICh0eXBlb2YgdmFsdWUgPT09IFwibnVtYmVyXCIpID8gdmFsdWUgOiB1bmRlZmluZWQ7XG4gIH0sXG4gIHN0cmluZzogKHZhbHVlOiBhbnkpID0+IHtcbiAgICByZXR1cm4gKHR5cGVvZiB2YWx1ZSA9PT0gXCJzdHJpbmdcIikgPyB2YWx1ZSA6IHVuZGVmaW5lZDtcbiAgfSxcbiAgTG9jYXRvcjogKHZhbHVlOiBhbnkpID0+IHtcbiAgICByZXR1cm4gTG9jYXRvci5jcmVhdGUodmFsdWUpO1xuICB9LFxuICBGaWxlUGF0aDogKHZhbHVlOiBhbnkpID0+IHtcbiAgICByZXR1cm4gTG9jYXRvci5jcmVhdGUodmFsdWUpO1xuICB9LFxuICBEaXJQYXRoOiAodmFsdWU6IGFueSkgPT4ge1xuICAgIHJldHVybiBMb2NhdG9yLmNyZWF0ZSh2YWx1ZSk7XG4gIH0sXG4gIG9iamVjdDogKHZhbHVlOiBhbnkpID0+IHtcbiAgICByZXR1cm4gdmFsdWU7XG4gIH0sXG59O1xuXG5jb25zdCB0b2pzb25WYWx1ZU1hcDogYW55ID0ge1xuICBhcnJheTogKHZhbHVlOiBhbnkpID0+IHtcbiAgICBjb25zdCByZXN1bHQgPSBbXTtcbiAgICBmb3IgKGNvbnN0IGl0ZXIgb2YgdmFsdWUpIHtcbiAgICAgIGlmIChpdGVyICYmIHR5cGVvZiBpdGVyID09PSBcIm9iamVjdFwiKVxuICAgICAgICByZXN1bHQucHVzaCh0eXBlb2YgaXRlci50b0pTT04gPT09IFwiZnVuY3Rpb25cIiA/IGl0ZXIudG9KU09OKCkgOiBkZWVwQ29weShpdGVyKSk7XG4gICAgICBlbHNlXG4gICAgICAgIHJlc3VsdC5wdXNoKGl0ZXIpO1xuICAgIH1cbiAgICByZXR1cm4gcmVzdWx0O1xuICB9LFxuICBib29sZWFuOiAodmFsdWU6IGFueSkgPT4ge1xuICAgIHJldHVybiB2YWx1ZTtcbiAgfSxcbiAgbnVtYmVyOiAodmFsdWU6IGFueSkgPT4ge1xuICAgIHJldHVybiB2YWx1ZTtcbiAgfSxcbiAgc3RyaW5nOiAodmFsdWU6IGFueSkgPT4ge1xuICAgIHJldHVybiB2YWx1ZTtcbiAgfSxcbiAgTG9jYXRvcjogKHZhbHVlOiBhbnkpID0+IHtcbiAgICByZXR1cm4gdmFsdWUudG9KU09OKCk7XG4gIH0sXG4gIEZpbGVQYXRoOiAodmFsdWU6IGFueSkgPT4ge1xuICAgIHJldHVybiB2YWx1ZS50b0pTT04oKTtcbiAgfSxcbiAgRGlyUGF0aDogKHZhbHVlOiBhbnkpID0+IHtcbiAgICByZXR1cm4gdmFsdWUudG9KU09OKCk7XG4gIH0sXG4gIG9iamVjdDogKHZhbHVlOiBhbnkpID0+IHtcbiAgICByZXR1cm4gZGVlcENvcHkodmFsdWUpO1xuICB9LFxufTtcblxuZnVuY3Rpb24gbWFrZUpTT05WYWx1ZShlbnRyeTogVmFyaWFibGVFbnRyeSwgdmFsdWU6IGFueSk6IGFueSB7XG4gIGlmIChBcnJheS5pc0FycmF5KGVudHJ5LnR5cGUpKVxuICAgIHJldHVybiB2YWx1ZTtcbiAgY29uc3QgZnVuYyA9IHRvanNvblZhbHVlTWFwW2VudHJ5LnR5cGVdO1xuICBpZiAoIWZ1bmMpXG4gICAgdGhyb3cgbmV3IEVycm9yKGBVbmtub3duIHR5cGUgXCIke2VudHJ5LnR5cGV9XCJgKTtcbiAgcmV0dXJuIGZ1bmModmFsdWUpO1xufVxuXG5mdW5jdGlvbiBtYWtlRW50cnlWYWx1ZShlbnRyeTogVmFyaWFibGVFbnRyeSwgdmFsdWU6IGFueSk6IGFueSB7XG4gIGxldCBuZXdWYWx1ZTogYW55O1xuICBpZiAoQXJyYXkuaXNBcnJheShlbnRyeS50eXBlKSlcbiAgICBuZXdWYWx1ZSA9IGVudHJ5LnR5cGUuaW5jbHVkZXModmFsdWUpID8gdmFsdWUgOiB1bmRlZmluZWQ7XG4gIGVsc2Uge1xuICAgIGNvbnN0IGZ1bmMgPSBtYWtlVmFsdWVNYXBbZW50cnkudHlwZV07XG4gICAgaWYgKCFmdW5jKVxuICAgICAgdGhyb3cgbmV3IEVycm9yKGBVbmtub3duIHR5cGUgXCIke2VudHJ5LnR5cGV9XCJgKTtcbiAgICBuZXdWYWx1ZSA9IGZ1bmModmFsdWUpO1xuICB9XG4gIGlmIChuZXdWYWx1ZSA9PT0gdW5kZWZpbmVkKVxuICAgIHRocm93IG5ldyBUeXBlRXJyb3IoYEF0dGVtcHRpbmcgdG8gc2V0IFwiJHt2YWx1ZX1cIiB0byB0eXBlICR7ZW50cnkudHlwZX1gKTtcbiAgcmV0dXJuIG5ld1ZhbHVlO1xufVxuXG5leHBvcnQgZnVuY3Rpb24gY29weUVudHJ5VmFsdWUoZW50cnk6IFZhcmlhYmxlRW50cnksIHRyYW5zZm9ybTogKGVudHJ5OiBWYXJpYWJsZUVudHJ5LCB2YWx1ZTogYW55KSA9PiBhbnkpIHtcbiAgY29uc3QgcmVzdWx0OiBWYXJpYWJsZUVudHJ5ID0ge1xuICAgIHR5cGU6IGVudHJ5LnR5cGUsXG4gICAgZ3JvdXA6IGVudHJ5Lmdyb3VwLFxuICAgIGRlc2NyaXB0aW9uOiBlbnRyeS5kZXNjcmlwdGlvbixcbiAgfTtcbiAgaWYgKGVudHJ5LmluaXRWYWx1ZSAhPT0gdW5kZWZpbmVkKVxuICAgIHJlc3VsdC5pbml0VmFsdWUgPSB0cmFuc2Zvcm0oZW50cnksIGVudHJ5LmluaXRWYWx1ZSk7XG4gIGlmIChlbnRyeS52YWx1ZSAhPT0gdW5kZWZpbmVkKVxuICAgIHJlc3VsdC52YWx1ZSA9IHRyYW5zZm9ybShlbnRyeSwgZW50cnkudmFsdWUpO1xuICByZXR1cm4gcmVzdWx0O1xufVxuXG5leHBvcnQgZnVuY3Rpb24gZnJvbUpTT04odmFyaWFibGVNYXA6IFZhcmlhYmxlTWFwKTogVmFyaWFibGVNYXAge1xuICBjb25zdCByZXN1bHQ6IFZhcmlhYmxlTWFwID0ge307XG4gIGZvciAoY29uc3QgW2tleSwgdmFsXSBvZiBPYmplY3QuZW50cmllcyh2YXJpYWJsZU1hcCkpXG4gICAgcmVzdWx0W2tleV0gPSBjb3B5RW50cnlWYWx1ZSh2YWwsIG1ha2VFbnRyeVZhbHVlKTtcbiAgcmV0dXJuIHJlc3VsdDtcbn1cblxuZXhwb3J0IGZ1bmN0aW9uIHRvSlNPTih2YXJpYWJsZU1hcDogVmFyaWFibGVNYXApOiBWYXJpYWJsZU1hcCB7XG4gIGNvbnN0IHJlc3VsdDogVmFyaWFibGVNYXAgPSB7fTtcbiAgZm9yIChjb25zdCBba2V5LCB2YWxdIG9mIE9iamVjdC5lbnRyaWVzKHZhcmlhYmxlTWFwKSlcbiAgICByZXN1bHRba2V5XSA9IGNvcHlFbnRyeVZhbHVlKHZhbCwgbWFrZUpTT05WYWx1ZSk7XG4gIHJldHVybiByZXN1bHQ7XG59XG5cbmV4cG9ydCBmdW5jdGlvbiBzZXRFbnRyeVZhbHVlKGVudHJ5OiBWYXJpYWJsZUVudHJ5LCB2YWx1ZTogYW55KTogYW55IHtcbiAgZW50cnkudmFsdWUgPSBtYWtlRW50cnlWYWx1ZShlbnRyeSwgdmFsdWUpO1xufVxuXG5leHBvcnQgZnVuY3Rpb24gc2V0KHZhcmlhYmxlTWFwOiBWYXJpYWJsZU1hcCwgbmFtZTogc3RyaW5nLCB2YWx1ZTogYW55KTogdm9pZCB7XG4gIGNvbnN0IGVudHJ5ID0gdmFyaWFibGVNYXBbbmFtZV07XG4gIGlmICghZW50cnkpXG4gICAgdGhyb3cgbmV3IEVycm9yKGBWYXJpYWJsZSBcIiR7bmFtZX1cIiBkb2VzIG5vdCBleGlzdHNgKTtcbiAgc2V0RW50cnlWYWx1ZShlbnRyeSwgdmFsdWUpO1xufVxuXG5leHBvcnQgZnVuY3Rpb24gcmVzZXQodmFyaWFibGVNYXA6IFZhcmlhYmxlTWFwLCBuYW1lOiBzdHJpbmcpOiB2b2lkIHtcbiAgY29uc3QgZW50cnkgPSB2YXJpYWJsZU1hcFtuYW1lXTtcbiAgaWYgKCFlbnRyeSlcbiAgICB0aHJvdyBuZXcgRXJyb3IoYFZhcmlhYmxlIFwiJHtuYW1lfVwiIGRvZXMgbm90IGV4aXN0c2ApO1xuICBlbnRyeS52YWx1ZSA9IHVuZGVmaW5lZDtcbn1cblxuZXhwb3J0IGZ1bmN0aW9uIGRlZmluZVZhcmlhYmxlKG1hcDogVmFyaWFibGVNYXAsIGdyb3VwOiBzdHJpbmcsIG5hbWU6IHN0cmluZywgZGVzY3JpcHRvcjogVmFyaWFibGVEZXNjcmlwdG9yKSB7XG4gIGxldCBkZWZpbmVFbnRyeSA9IG1hcFtuYW1lXTtcbiAgbGV0IGlzVmFsaWRWYWx1ZSA9ICh2YWx1ZTogYW55KSA9PiB0cnVlO1xuICBpZiAoIWRlZmluZUVudHJ5KSB7XG4gICAgZGVmaW5lRW50cnkgPSB7XG4gICAgICB0eXBlOiBcIlwiLCBncm91cCwgdmFsdWU6IHVuZGVmaW5lZCwgIGluaXRWYWx1ZTogdW5kZWZpbmVkLCBkZXNjcmlwdGlvbjogXCJcIixcbiAgICB9O1xuICAgIG1hcFtuYW1lXSA9IGRlZmluZUVudHJ5O1xuICB9XG4gIGVsc2UgaWYgKGdyb3VwICE9PSBkZWZpbmVFbnRyeS5ncm91cCkge1xuICAgIGlmIChkZWZpbmVFbnRyeS5ncm91cClcbiAgICAgIHRocm93IG5ldyBFcnJvcihgQXR0ZW1wdGluZyB0byByZWNyZWF0ZSBcIiR7bmFtZX1cIiB2YXJpYWJsZSB3aXRoIFwiJHtkZWZpbmVFbnRyeS5ncm91cH1cIiBncm91cCBpbiBhbm90aGVyIFwiJHtncm91cH1cImApO1xuICAgIGRlZmluZUVudHJ5Lmdyb3VwID0gZ3JvdXA7XG4gIH1cblxuICBkZWZpbmVFbnRyeS50eXBlID0gZGVzY3JpcHRvci50eXBlIHx8IGRlZmluZUVudHJ5LnR5cGU7XG4gIGRlZmluZUVudHJ5LmRlc2NyaXB0aW9uID0gZGVzY3JpcHRvci5kZXNjcmlwdGlvbiB8fCBkZWZpbmVFbnRyeS5kZXNjcmlwdGlvbjtcblxuICBsZXQgdHlwZTogc3RyaW5nIHwgc3RyaW5nW107XG4gIGlmIChkZWZpbmVFbnRyeS50eXBlKVxuICAgIHR5cGUgPSBkZWZpbmVFbnRyeS50eXBlO1xuICBlbHNlIGlmIChBcnJheS5pc0FycmF5KGRlc2NyaXB0b3IudmFsdWUpKVxuICAgIHR5cGUgPSBcImFycmF5XCI7XG4gIGVsc2UgaWYgKGRlc2NyaXB0b3IudmFsdWUgaW5zdGFuY2VvZiBMb2NhdG9yKVxuICAgIHR5cGUgPSBcIkxvY2F0b3JcIjtcbiAgZWxzZVxuICAgIHR5cGUgPSB0eXBlb2YgZGVzY3JpcHRvci52YWx1ZTtcblxuICBpZiAoQXJyYXkuaXNBcnJheSh0eXBlKSkge1xuICAgIGNvbnN0IGVudW1MaXN0ID0gdHlwZTtcbiAgICBsZXQgaXRlbVR5cGU7XG4gICAgZm9yIChjb25zdCBpdGVyIG9mIGVudW1MaXN0KSB7XG4gICAgICBjb25zdCBpdCA9IHR5cGVvZiBpdGVyO1xuICAgICAgaWYgKCFpdGVtVHlwZSlcbiAgICAgICAgaXRlbVR5cGUgPSBpdDtcbiAgICAgIGVsc2UgaWYgKGl0ZW1UeXBlICE9PSBpdClcbiAgICAgICAgdGhyb3cgbmV3IEVycm9yKGBBbGwgZWxlbWVudHMgZm9yICR7bmFtZX0gbXVzdCBiZSBvZiB0aGUgc2FtZSB0eXBlYCk7XG4gICAgfVxuICAgIGlmIChpdGVtVHlwZSAhPT0gXCJib29sZWFuXCIgJiYgaXRlbVR5cGUgIT09IFwibnVtYmVyXCIgJiYgaXRlbVR5cGUgIT09IFwic3RyaW5nXCIpXG4gICAgICB0aHJvdyBuZXcgRXJyb3IoYEVudW0gJHtuYW1lfSBub3Qgc3VwcG9ydCAke2l0ZW1UeXBlfSB0eXBlYCk7XG4gICAgaXNWYWxpZFZhbHVlID0gKHZhbHVlOiBhbnkpID0+IGVudW1MaXN0LmluY2x1ZGVzKHZhbHVlKTtcbiAgfVxuICBlbHNlIGlmICh0eXBlID09PSBcImJvb2xlYW5cIikge1xuICAgIGlzVmFsaWRWYWx1ZSA9ICh2YWx1ZTogYW55KSA9PiB0eXBlb2YgdmFsdWUgPT09IFwiYm9vbGVhblwiO1xuICB9XG4gIGVsc2UgaWYgKHR5cGUgPT09IFwibnVtYmVyXCIpIHtcbiAgICBpc1ZhbGlkVmFsdWUgPSAodmFsdWU6IGFueSkgPT4gdHlwZW9mIHZhbHVlID09PSBcIm51bWJlclwiO1xuICB9XG4gIGVsc2UgaWYgKHR5cGUgPT09IFwic3RyaW5nXCIpIHtcbiAgICBpc1ZhbGlkVmFsdWUgPSAodmFsdWU6IGFueSkgPT4gdHlwZW9mIHZhbHVlID09PSBcInN0cmluZ1wiO1xuICB9XG4gIGVsc2UgaWYgKHR5cGUgPT09IFwiYXJyYXlcIikge1xuICAgIGlzVmFsaWRWYWx1ZSA9IEFycmF5LmlzQXJyYXk7XG4gIH1cbiAgZWxzZSBpZiAodHlwZSA9PT0gXCJMb2NhdG9yXCIgfHwgdHlwZSA9PT0gXCJGaWxlUGF0aFwiIHx8IHR5cGUgPT09IFwiRGlyUGF0aFwiKSB7XG4gICAgaXNWYWxpZFZhbHVlID0gKHZhbHVlOiBhbnkpID0+ICEhTG9jYXRvci5jcmVhdGUodmFsdWUpO1xuICB9XG4gIGVsc2UgaWYgKHR5cGUgIT09IFwib2JqZWN0XCIgJiYgdHlwZSAhPT0gXCJlbnVtXCIpIHtcbiAgICB0aHJvdyBuZXcgRXJyb3IoYFZhcmlhYmxlIFwiJHtuYW1lfVwiIGhhcyB3cm9uZyBcIiR7dHlwZX1cIiB0eXBlYCk7XG4gIH1cblxuICBpZiAoZGVzY3JpcHRvci52YWx1ZSA9PT0gdW5kZWZpbmVkKSB7XG4gICAgZGVmaW5lRW50cnkuaW5pdFZhbHVlID0gKHR5cGUgPT09IFwiYXJyYXlcIikgPyBbXSA6IHVuZGVmaW5lZDtcbiAgfVxuICBlbHNlIHtcbiAgICBpZiAoIWlzVmFsaWRWYWx1ZShkZXNjcmlwdG9yLnZhbHVlKSlcbiAgICAgICAgdGhyb3cgbmV3IFR5cGVFcnJvcihgQXR0ZW1wdGluZyB0byBzZXQgXCIke2Rlc2NyaXB0b3IudmFsdWV9XCIgdG8gJHtuYW1lfSBhcyBpbml0VmFsdWVgKTtcbiAgICBkZWZpbmVFbnRyeS5pbml0VmFsdWUgPSAodHlwZSA9PT0gXCJhcnJheVwiKSA/IEFycmF5LmZyb20oZGVzY3JpcHRvci52YWx1ZSkgOiBkZXNjcmlwdG9yLnZhbHVlO1xuICB9XG5cbiAgZGVmaW5lRW50cnkudHlwZSA9IHR5cGU7XG4gIGlmIChkZWZpbmVFbnRyeS5pbml0VmFsdWUgIT09IHVuZGVmaW5lZCkge1xuICAgIGRlZmluZUVudHJ5LmluaXRWYWx1ZSA9IG1ha2VFbnRyeVZhbHVlKGRlZmluZUVudHJ5LCBkZWZpbmVFbnRyeS5pbml0VmFsdWUpO1xuICB9XG4gIGlmIChkZWZpbmVFbnRyeS52YWx1ZSAhPT0gdW5kZWZpbmVkKSB7XG4gICAgZGVmaW5lRW50cnkudmFsdWUgPSBtYWtlRW50cnlWYWx1ZShkZWZpbmVFbnRyeSwgZGVmaW5lRW50cnkudmFsdWUpO1xuICB9XG59XG5cbmV4cG9ydCBmdW5jdGlvbiBjcmVhdGVQcm94eTxUPihtYXA6IFZhcmlhYmxlTWFwLCBvPzogYW55KTogVCB7XG4gIG8gPSBvIHx8IHt9O1xuICBjb25zdCBoYW5kbGVyOiBQcm94eUhhbmRsZXI8YW55PiA9IHtcbiAgICBnZXQodGFyZ2V0OiBWYXJpYWJsZU1hcCwga2V5OiBzdHJpbmcsIHJlY2VpdmVyOiBhbnkpIHtcbiAgICAgIGNvbnN0IGVudHJ5ID0gdGFyZ2V0W2tleV07XG4gICAgICBpZiAoZW50cnkpXG4gICAgICAgIHJldHVybiBnZXRFbnRyeVZhbHVlKGVudHJ5KTtcbiAgICAgIHJldHVybiBvW2tleV07XG4gICAgfSxcbiAgICBzZXQodGFyZ2V0OiBWYXJpYWJsZU1hcCwga2V5OiBzdHJpbmcsIHZhbHVlOiBhbnkpOiBib29sZWFuIHtcbiAgICAgIGNvbnN0IGVudHJ5ID0gdGFyZ2V0W2tleV07XG4gICAgICBpZiAoZW50cnkpXG4gICAgICAgIHNldEVudHJ5VmFsdWUoZW50cnksIHZhbHVlKTtcbiAgICAgIGVsc2VcbiAgICAgICAgZGVmaW5lVmFyaWFibGUodGFyZ2V0LCBcIlwiLCBrZXksIHRvRGVzY3JpcHRvcih2YWx1ZSkpO1xuICAgICAgcmV0dXJuIHRydWU7XG4gICAgfSxcbiAgICBoYXModGFyZ2V0OiBWYXJpYWJsZU1hcCwga2V5OiBzdHJpbmcpIHtcbiAgICAgIHJldHVybiB0YXJnZXQuaGFzT3duUHJvcGVydHkoa2V5KSB8fCAoa2V5IGluIHRhcmdldCk7XG4gICAgfSxcbiAgICBvd25LZXlzKHRhcmdldDogVmFyaWFibGVNYXApIHtcbiAgICAgIHJldHVybiBPYmplY3Qua2V5cyh0YXJnZXQpO1xuICAgIH0sXG4gICAgZGVsZXRlUHJvcGVydHkodGFyZ2V0OiBWYXJpYWJsZU1hcCwga2V5OiBzdHJpbmcpIHtcbiAgICAgIHRocm93IG5ldyBFcnJvcihgQ2Fubm90IGRlbGV0ZSAke2tleX0gdmFsdWVgKTtcbiAgICB9LFxuICB9O1xuICByZXR1cm4gbmV3IFByb3h5KG1hcCwgaGFuZGxlcik7XG59XG5cbmV4cG9ydCBmdW5jdGlvbiBjbG9uZVZhcmlhYmxlTWFwKG1hcDogVmFyaWFibGVNYXApIHtcbiAgY29uc3QgcmVzdWx0OiBWYXJpYWJsZU1hcCA9IHt9O1xuICBmb3IgKGNvbnN0IFsgbmFtZSwgZW50cnkgXSBvZiBPYmplY3QuZW50cmllcyhtYXApKSB7XG4gICAgZGVmaW5lVmFyaWFibGUocmVzdWx0LCBlbnRyeS5ncm91cCwgbmFtZSwge1xuICAgICAgdHlwZTogZW50cnkudHlwZSxcbiAgICAgIGRlc2NyaXB0aW9uOiBlbnRyeS5kZXNjcmlwdGlvbixcbiAgICAgIHZhbHVlOiBlbnRyeS5pbml0VmFsdWUsXG4gICAgfSk7XG4gICAgaWYgKGdldEVudHJ5VmFsdWUoZW50cnkpICE9PSB1bmRlZmluZWQpXG4gICAgICByZXN1bHRbbmFtZV0udmFsdWUgPSBnZXRFbnRyeVZhbHVlKGVudHJ5KTtcbiAgfVxuICByZXR1cm4gcmVzdWx0O1xufVxuXG5leHBvcnQgZnVuY3Rpb24gZXh0ZW5kVmFyaWFibGVNYXBCeVZhbHVlcyhtYXA6IFZhcmlhYmxlTWFwLCBncm91cDogc3RyaW5nLCB2YWx1ZXM6IFZhcmlhbnRNYXApIHtcbiAgZm9yIChjb25zdCBbbmFtZSwgdmFsdWVdIG9mIE9iamVjdC5lbnRyaWVzKHZhbHVlcykpIHtcbiAgICBkZWZpbmVWYXJpYWJsZShtYXAsIGdyb3VwLCBuYW1lLCB7IHZhbHVlIH0pO1xuICAgIG1hcFtuYW1lXS52YWx1ZSA9IHZhbHVlO1xuICB9XG59XG5cbmV4cG9ydCBmdW5jdGlvbiBkZWZpbmVWYXJpYWJsZXNJblZhcmlhYmxlTWFwKG1hcDogVmFyaWFibGVNYXAsIGdyb3VwOiBzdHJpbmcsIHZhcmlhYmxlczogYW55KSB7XG4gIGZvciAoY29uc3QgW25hbWUsIHZhbHVlXSBvZiBPYmplY3QuZW50cmllcyh2YXJpYWJsZXMpKSB7XG4gICAgY29uc3QgZGVzY3JpcHRvciA9IHZhbHVlICYmIHR5cGVvZiB2YWx1ZSA9PT0gXCJvYmplY3RcIiA/IHZhbHVlIDoge3ZhbHVlIH07XG4gICAgZGVmaW5lVmFyaWFibGUobWFwLCBncm91cCwgbmFtZSwgZGVzY3JpcHRvcik7XG4gIH1cbn1cblxuZXhwb3J0IGZ1bmN0aW9uIGdldFZhcmlhYmxlc0J5R3JvdXAobWFwOiBWYXJpYWJsZU1hcCwgZ3JvdXA/OiBzdHJpbmcpIHtcbiAgY29uc3QgcmVzdWx0OiBhbnkgPSB7fTtcbiAgZm9yIChjb25zdCBbIG5hbWUsIGVudHJ5IF0gb2YgT2JqZWN0LmVudHJpZXMobWFwKSkge1xuICAgIGlmIChncm91cCAhPT0gdW5kZWZpbmVkICYmIGVudHJ5Lmdyb3VwICYmIGVudHJ5Lmdyb3VwICE9PSBncm91cClcbiAgICAgIGNvbnRpbnVlO1xuICAgIHJlc3VsdFtuYW1lXSA9IHtcbiAgICAgIHR5cGU6IGVudHJ5LnR5cGUsXG4gICAgICBkZXNjcmlwdGlvbjogZW50cnkuZGVzY3JpcHRpb24sXG4gICAgICB2YWx1ZTogZ2V0RW50cnlWYWx1ZShlbnRyeSksXG4gICAgfTtcbiAgfVxuICByZXR1cm4gcmVzdWx0O1xufVxuXG5leHBvcnQgZnVuY3Rpb24gY3JlYXRlVmFyaWFibGVWYWx1ZXMobWFwOiBWYXJpYWJsZU1hcCwgZ3JvdXA/OiBzdHJpbmcpOiBhbnkge1xuICBjb25zdCByZXN1bHQ6IGFueSA9IHt9O1xuICBmb3IgKGNvbnN0IFsgbmFtZSwgZW50cnkgXSBvZiBPYmplY3QuZW50cmllcyhtYXApKSB7XG4gICAgaWYgKCFncm91cCB8fCBncm91cCA9PT0gZW50cnkuZ3JvdXApXG4gICAgICByZXN1bHRbbmFtZV0gPSBnZXRFbnRyeVZhbHVlKGVudHJ5KTtcbiAgfVxuICByZXR1cm4gcmVzdWx0O1xufVxuXG5leHBvcnQgZnVuY3Rpb24gbWVyZ2VWYXJpYWJsZXModGFyZ2V0OiBhbnksIHNvdXJjZTogYW55KTogb2JqZWN0IHtcbiAgaWYgKCF0YXJnZXQgfHwgdHlwZW9mIHRhcmdldCAhPT0gXCJvYmplY3RcIilcbiAgICB0aHJvdyBuZXcgRXJyb3IoYFRhcmdldCAke3RhcmdldH0gaXMgbm90IG9iamVjdGApO1xuICBpZiAoIXNvdXJjZSB8fCB0eXBlb2Ygc291cmNlICE9PSBcIm9iamVjdFwiKVxuICAgIHRocm93IG5ldyBFcnJvcihgU291cmNlICR7c291cmNlfSBpcyBub3Qgb2JqZWN0YCk7XG4gIGlmIChBcnJheS5pc0FycmF5KHRhcmdldCkpIHtcbiAgICBpZiAoIUFycmF5LmlzQXJyYXkoc291cmNlKSlcbiAgICAgIHRocm93IG5ldyBFcnJvcihgU291cmNlIGlzIG5vdCBhbiBhcnJheWApO1xuICAgIGZvciAoY29uc3QgaXRlciBvZiBzb3VyY2UpXG4gICAgICB0YXJnZXQucHVzaChpdGVyKTtcbiAgfVxuICBlbHNlIHtcbiAgICBmb3IgKGNvbnN0IFsga2V5LCB2YWwgXSBvZiBPYmplY3QuZW50cmllcyhzb3VyY2UpKSB7XG4gICAgICBpZiAoIU9iamVjdC5oYXNPd24odGFyZ2V0LCBrZXkpKSB7XG4gICAgICAgIHRhcmdldFtrZXldID0gdmFsO1xuICAgICAgfVxuICAgICAgZWxzZSBpZiAodGFyZ2V0W2tleV0gJiYgdHlwZW9mIHRhcmdldFtrZXldID09PSBcIm9iamVjdFwiKSB7XG4gICAgICAgIGlmICghdmFsIHx8IHR5cGVvZiB2YWwgIT09IFwib2JqZWN0XCIpXG4gICAgICAgICAgdGhyb3cgbmV3IEVycm9yKGBTb3VyY2UgJHtrZXl9IGhhcyAke3ZhbH0gd2hpY2ggaXMgbm90IGFuIG9iamVjdGApO1xuICAgICAgICBtZXJnZVZhcmlhYmxlcyh0YXJnZXRba2V5XSwgdmFsKTtcbiAgICAgIH1cbiAgICAgIGVsc2Uge1xuICAgICAgICB0aHJvdyBuZXcgRXJyb3IoYFNvdXJjZSAke2tleX0gaGFzICR7dmFsfSB3aGljaCBpcyBub3QgJHt0eXBlb2YgdGFyZ2V0W2tleV19YCk7XG4gICAgICB9XG4gICAgfVxuICB9XG4gIHJldHVybiB0YXJnZXQ7XG59XG5cbmV4cG9ydCBmdW5jdGlvbiBtZXJnZVZhcmlhYmxlTWFwKHRhcmdldDogVmFyaWFibGVNYXAsIHNvdXJjZTogYW55KTogVmFyaWFibGVNYXAge1xuICBmb3IgKGNvbnN0IFtuYW1lLCB2YWx1ZV0gb2YgT2JqZWN0LmVudHJpZXMoc291cmNlKSkge1xuICAgIGxldCBlbnRyeSA9IHRhcmdldFtuYW1lXTtcbiAgICBpZiAoIWVudHJ5KVxuICAgICAgZGVmaW5lVmFyaWFibGUodGFyZ2V0LCBcIlwiLCBuYW1lLCB7IHZhbHVlIH0pO1xuICAgIGVsc2Uge1xuICAgICAgbGV0IGRlc3QgPSBnZXRFbnRyeVZhbHVlKGVudHJ5KTtcbiAgICAgIHNldEVudHJ5VmFsdWUoZW50cnksIChkZXN0ICYmIHR5cGVvZiBkZXN0ID09PSBcIm9iamVjdFwiKSA/IG1lcmdlVmFyaWFibGVzKGRlc3QsIHZhbHVlKSA6IHZhbHVlKTtcbiAgICB9XG4gIH1cbiAgcmV0dXJuIHRhcmdldDtcbn1cblxufSAvLyBTY29wZUhlbHBlclxuIiwiLypcbiAqIE1JVCBMaWNlbnNlXG4gKlxuICogQ29weXJpZ2h0IChjKSAyMDI1ICBZdXJpaSBZYWt1YmluICh5dXJpaS55YWt1YmluQGdtYWlsLmNvbSlcbiAqXG4gKiBQZXJtaXNzaW9uIGlzIGdyYW50ZWQgdG8gdXNlLCBjb3B5LCBtb2RpZnksIGFuZCBkaXN0cmlidXRlIHRoaXMgc29mdHdhcmVcbiAqIHVuZGVyIHRoZSBNSVQgTGljZW5zZS4gU2VlIExJQ0VOU0UgZmlsZSBmb3IgZGV0YWlscy5cbiAqL1xuXG5pbXBvcnQgeyBWYXJpYWJsZU1hcCB9IGZyb20gXCJAL2NvcmUvU2NvcGVcIjtcbmltcG9ydCB7IEdlbmVyYWxDb250ZXh0LCBjcmVhdGVDb250ZXh0IH0gZnJvbSBcIkAvY29yZS9CYXNlQ29udGV4dFwiO1xuXG5jb25zdCBTQ09QRSA9IFN5bWJvbChcIlNDT1BFXCIpO1xuXG5leHBvcnQgY2xhc3MgU2NyaXB0Q29udGV4dCBleHRlbmRzIEdlbmVyYWxDb250ZXh0IHtcbiAgW1NDT1BFXTogVmFyaWFibGVNYXA7XG5cbiAgY29uc3RydWN0b3Ioc2NvcGU6IFZhcmlhYmxlTWFwKSB7XG4gICAgc3VwZXIoc2NvcGUpO1xuICAgIHRoaXNbU0NPUEVdID0gc2NvcGU7XG4gIH1cblxuICBwdWJsaWMgc3RhdGljIGNyZWF0ZSh2YXJpYWJsZU1hcDogVmFyaWFibGVNYXApIHtcbiAgICByZXR1cm4gY3JlYXRlQ29udGV4dChuZXcgU2NyaXB0Q29udGV4dCh2YXJpYWJsZU1hcCkpO1xuICB9XG59O1xuIiwiLypcbiAqIE1JVCBMaWNlbnNlXG4gKlxuICogQ29weXJpZ2h0IChjKSAyMDI1ICBZdXJpaSBZYWt1YmluICh5dXJpaS55YWt1YmluQGdtYWlsLmNvbSlcbiAqXG4gKiBQZXJtaXNzaW9uIGlzIGdyYW50ZWQgdG8gdXNlLCBjb3B5LCBtb2RpZnksIGFuZCBkaXN0cmlidXRlIHRoaXMgc29mdHdhcmVcbiAqIHVuZGVyIHRoZSBNSVQgTGljZW5zZS4gU2VlIExJQ0VOU0UgZmlsZSBmb3IgZGV0YWlscy5cbiAqL1xuXG5leHBvcnQgaW50ZXJmYWNlIFNpbXBsZU9iamVjdCB7XG4gIHR5cGU6IHN0cmluZztcbiAgW25hbWU6IHN0cmluZ106IG51bGwgfCBib29sZWFuIHwgbnVtYmVyIHwgc3RyaW5nIHxvYmplY3Q7XG59O1xuXG50eXBlIEluc3RhbmNlQ3JlYXRlRnVuY3Rpb24gPSAob2JqZWN0OiBTaW1wbGVPYmplY3QpID0+IGFueTtcblxuY29uc3QgX2NyZWF0b3JzID0gbmV3IE1hcDxzdHJpbmcsIEluc3RhbmNlQ3JlYXRlRnVuY3Rpb24+KCk7XG5cbmV4cG9ydCBuYW1lc3BhY2UgU2ltcGxlT2JqZWN0IHtcblxuZXhwb3J0IGZ1bmN0aW9uIHJlZ2lzdGVyUGFyc2VyKG5hbWU6IHN0cmluZywgZnVuYzogSW5zdGFuY2VDcmVhdGVGdW5jdGlvbikge1xuICBpZiAoIW5hbWUgJiYgX2NyZWF0b3JzLmhhcyhuYW1lKSlcbiAgICB0aHJvdyBuZXcgRXJyb3IoYE5hbWUgXCIke25hbWV9XCIgaXMgd3Jvbmcgb3IgcmVnaXN0ZXJlZGApO1xuICBfY3JlYXRvcnMuc2V0KG5hbWUsIGZ1bmMpO1xufVxuXG5leHBvcnQgZnVuY3Rpb24gZnJvbUpTT04odmFsdWU6IFNpbXBsZU9iamVjdCk6IGFueSB7XG4gIGlmICh2YWx1ZSA9PT0gdW5kZWZpbmVkKVxuICAgIHRocm93IG5ldyBFcnJvcihcIk5vdCBzdXBwb3J0IHVuZGVmaW5lZCB2YWx1ZVwiKTtcbiAgaWYgKHZhbHVlICYmIHR5cGVvZiB2YWx1ZSA9PT0gXCJvYmplY3RcIikge1xuICAgIGlmICh0eXBlb2YgdmFsdWUudHlwZSA9PT0gXCJzdHJpbmdcIikge1xuICAgICAgY29uc3QgZnVuYyA9IF9jcmVhdG9ycy5nZXQodmFsdWUudHlwZSk7XG4gICAgICBpZiAoZnVuYylcbiAgICAgICAgcmV0dXJuIGZ1bmModmFsdWUpO1xuICAgICAgdGhyb3cgbmV3IEVycm9yKGBVa25vd24gb2JqZWN0IHR5cGU6ICR7SlNPTi5zdHJpbmdpZnkodmFsdWUpfWApO1xuICAgIH1cbiAgICBlbHNlIGlmIChBcnJheS5pc0FycmF5KHZhbHVlKSkge1xuICAgICAgcmV0dXJuIHZhbHVlLm1hcChpID0+IGZyb21KU09OKGkpKTtcbiAgICB9XG4gIH1cbiAgcmV0dXJuIHZhbHVlO1xufVxuXG5leHBvcnQgZnVuY3Rpb24gdG9KU09OKHZhbHVlOiBhbnkpOiBhbnkge1xuICBpZiAodmFsdWUgJiYgdHlwZW9mIHZhbHVlID09PSBcIm9iamVjdFwiKSB7XG4gICAgaWYgKHR5cGVvZiB2YWx1ZS50b0pTT04gPT09IFwiZnVuY3Rpb25cIilcbiAgICAgIHJldHVybiB2YWx1ZS50b0pTT04oKTtcbiAgICBlbHNlIGlmIChBcnJheS5pc0FycmF5KHZhbHVlKSlcbiAgICAgIHJldHVybiB2YWx1ZS5tYXAoaSA9PiB0b0pTT04oaSkpO1xuICB9XG4gIHJldHVybiB2YWx1ZTtcbn1cblxufSAvLyBuYW1lc3BhY2UgU2ltcGxlT2JqZWN0XG4iLCIvKlxuICogTUlUIExpY2Vuc2VcbiAqXG4gKiBDb3B5cmlnaHQgKGMpIDIwMjUgIFl1cmlpIFlha3ViaW4gKHl1cmlpLnlha3ViaW5AZ21haWwuY29tKVxuICpcbiAqIFBlcm1pc3Npb24gaXMgZ3JhbnRlZCB0byB1c2UsIGNvcHksIG1vZGlmeSwgYW5kIGRpc3RyaWJ1dGUgdGhpcyBzb2Z0d2FyZVxuICogdW5kZXIgdGhlIE1JVCBMaWNlbnNlLiBTZWUgTElDRU5TRSBmaWxlIGZvciBkZXRhaWxzLlxuICovXG5cbmltcG9ydCB7IExvY2F0b3IgfSBmcm9tIFwiQC91dGlscy9Mb2NhdG9yXCI7XG5pbXBvcnQgeyBTaW1wbGVPYmplY3QgfSBmcm9tIFwiQC9jb3JlL1NpbXBsZU9iamVjdFwiO1xuXG5leHBvcnQgY2xhc3MgU291cmNlRmlsZSB7XG4gIHByaXZhdGUgX2ZpbGVuYW1lOiBMb2NhdG9yO1xuICBwcml2YXRlIF9iYXNlRGlyOiBMb2NhdG9yO1xuICBcbiAgcHJpdmF0ZSBfaGVhZGVyT25seTogYm9vbGVhbjtcblxuICBwcml2YXRlIF9sYW5ndWFnZTogc3RyaW5nO1xuICBwcml2YXRlIF9kZWZpbml0aW9uczogc3RyaW5nW107XG4gIHByaXZhdGUgX2NvbXBpbGVyUGF0aDogc3RyaW5nO1xuICBwcml2YXRlIF9jb21waWxlck9wdGlvbnM6IEFycmF5PHN0cmluZyB8IHN0cmluZ1tdPjtcblxuICBwcml2YXRlIGNvbnN0cnVjdG9yKGZpbGVuYW1lOiBMb2NhdG9yLCBiYXNlRGlyOiBMb2NhdG9yLCBoZWFkZXJPbmx5OiBib29sZWFuLCBsYW5ndWFnZTogc3RyaW5nLCBjb21waWxlclBhdGg6IHN0cmluZywgY29tcGlsZXJPcHRpb25zOiBBcnJheTxzdHJpbmcgfCBzdHJpbmdbXT4pIHtcbiAgICB0aGlzLl9maWxlbmFtZSA9IGZpbGVuYW1lO1xuICAgIHRoaXMuX2Jhc2VEaXIgPSBiYXNlRGlyO1xuXG4gICAgdGhpcy5faGVhZGVyT25seSA9IGhlYWRlck9ubHk7XG5cbiAgICB0aGlzLl9sYW5ndWFnZSA9IGxhbmd1YWdlO1xuICAgIHRoaXMuX2RlZmluaXRpb25zID0gW107XG4gICAgdGhpcy5fY29tcGlsZXJQYXRoID0gY29tcGlsZXJQYXRoO1xuICAgIHRoaXMuX2NvbXBpbGVyT3B0aW9ucyA9IFsgLi4uY29tcGlsZXJPcHRpb25zIF07XG4gIH1cblxuICBwdWJsaWMgc3RhdGljIGNyZWF0ZShmaWxlbmFtZTogTG9jYXRvciwgYmFzZURpcjogTG9jYXRvciwgaGVhZGVyT25seTogYm9vbGVhbiwgbGFuZ3VhZ2U6IHN0cmluZywgY29tcGlsZXJQYXRoOiBzdHJpbmcsIGNvbXBpbGVyT3B0aW9uczogQXJyYXk8c3RyaW5nIHwgc3RyaW5nW10+KSB7XG4gICAgcmV0dXJuIG5ldyBTb3VyY2VGaWxlKGZpbGVuYW1lLCBiYXNlRGlyLCBoZWFkZXJPbmx5LCBsYW5ndWFnZSwgY29tcGlsZXJQYXRoLCBjb21waWxlck9wdGlvbnMpO1xuICB9XG5cbiAgcHVibGljIGdldCBMQU5HVUFHRSgpOiBzdHJpbmcge1xuICAgIHJldHVybiB0aGlzLl9sYW5ndWFnZTtcbiAgfVxuXG4gIHB1YmxpYyBnZXQgSEVBREVSX0ZJTEVfT05MWSgpOiBib29sZWFuIHtcbiAgICByZXR1cm4gdGhpcy5faGVhZGVyT25seTtcbiAgfVxuXG4gIHB1YmxpYyBnZXQgREVGSU5FUygpOiBzdHJpbmdbXSB7XG4gICAgcmV0dXJuIHRoaXMuX2RlZmluaXRpb25zO1xuICB9XG5cbiAgcHVibGljIGFkZERlZmluaXRpb24oZGVmaW5pdGlvbjogc3RyaW5nKSB7XG4gICAgdGhpcy5fZGVmaW5pdGlvbnMucHVzaChkZWZpbml0aW9uKTtcbiAgfVxuXG4gIHB1YmxpYyBhZGRDb21waWxlT3B0aW9uKG9wdGlvbjogc3RyaW5nIHwgWyBzdHJpbmcsIHN0cmluZyBdKTogdm9pZCB7XG4gICAgdGhpcy5fY29tcGlsZXJPcHRpb25zLnB1c2gob3B0aW9uKTtcbiAgfVxuXG4gIHB1YmxpYyBnZXQgQ09NUElMRV9QQVRIKCk6IHN0cmluZyB7XG4gICAgcmV0dXJuIHRoaXMuX2NvbXBpbGVyUGF0aDtcbiAgfVxuXG4gIHB1YmxpYyBnZXQgQ09NUElMRV9GTEFHUygpOiBBcnJheTxzdHJpbmcgfCBzdHJpbmdbXT4ge1xuICAgIHJldHVybiB0aGlzLl9jb21waWxlck9wdGlvbnM7XG4gIH1cblxuICBwdWJsaWMgZ2V0IEZJTEUoKTogTG9jYXRvciB7XG4gICAgcmV0dXJuIHRoaXMuX2ZpbGVuYW1lO1xuICB9XG5cbiAgcHVibGljIGdldCBGSUxFX0RJUigpOiBMb2NhdG9yIHtcbiAgICByZXR1cm4gdGhpcy5fZmlsZW5hbWUuZGlybmFtZSgpO1xuICB9XG5cbiAgcHVibGljIGdldCBGSUxFX05BTUUoKTogc3RyaW5nIHtcbiAgICByZXR1cm4gdGhpcy5fZmlsZW5hbWUuYmFzZW5hbWUoKTtcbiAgfVxuXG4gIHB1YmxpYyBzdGF0aWMgZnJvbUpTT04oanNvbjogYW55KTogU291cmNlRmlsZSB7XG4gICAgY29uc3QgZmlsZW5hbWUgPSBMb2NhdG9yLmNyZWF0ZShqc29uLmZpbGVuYW1lKTtcbiAgICBjb25zdCBiYXNlRGlyID0gTG9jYXRvci5jcmVhdGUoanNvbi5iYXNlRGlyKTtcbiAgICBjb25zdCBoZWFkZXJPbmx5ID0ganNvbi5oZWFkZXJPbmx5IHx8IGZhbHNlO1xuICAgIGNvbnN0IGxhbmd1YWdlID0ganNvbi5sYW5ndWFnZSB8fCBcIlwiO1xuICAgIGNvbnN0IGNvbXBpbGVyUGF0aCA9IGpzb24uY29tcGlsZXJQYXRoIHx8IFwiXCI7XG4gICAgY29uc3QgY29tcGlsZXJPcHRpb25zID0ganNvbi5jb21waWxlck9wdGlvbnMgfHwgW107XG4gICAgY29uc3QgcmVzdWx0ID0gbmV3IFNvdXJjZUZpbGUoZmlsZW5hbWUsIGJhc2VEaXIsIGhlYWRlck9ubHksIGxhbmd1YWdlLCBjb21waWxlclBhdGgsIGNvbXBpbGVyT3B0aW9ucyk7XG4gICAgaWYgKGpzb24uZGVmaW5pdGlvbnMpXG4gICAgICByZXN1bHQuX2RlZmluaXRpb25zID0gQXJyYXkuZnJvbShqc29uLmRlZmluaXRpb25zKTtcbiAgICByZXR1cm4gcmVzdWx0O1xuICB9XG5cbiAgcHVibGljIHRvSlNPTigpOiBTaW1wbGVPYmplY3Qge1xuICAgIGNvbnN0IGpzb246IFNpbXBsZU9iamVjdCA9IHtcbiAgICAgIHR5cGU6IFNvdXJjZUZpbGUubmFtZSxcbiAgICAgIGZpbGVuYW1lOiB0aGlzLl9maWxlbmFtZS50b1VSTFN0cmluZygpLFxuICAgICAgYmFzZURpcjogdGhpcy5fYmFzZURpci50b1VSTFN0cmluZygpLFxuICAgIH07XG4gICAgaWYgKHRoaXMuX2hlYWRlck9ubHkpXG4gICAgICBqc29uLmhlYWRlck9ubHkgPSB0cnVlO1xuICAgIGVsc2Uge1xuICAgICAgaWYgKHRoaXMuX2xhbmd1YWdlKVxuICAgICAgICBqc29uLmxhbmd1YWdlID0gdGhpcy5fbGFuZ3VhZ2U7XG4gICAgICBpZiAodGhpcy5fY29tcGlsZXJQYXRoKVxuICAgICAgICBqc29uLmNvbXBpbGVyUGF0aCA9IHRoaXMuX2NvbXBpbGVyUGF0aDtcbiAgICAgIGlmICh0aGlzLl9kZWZpbml0aW9ucy5sZW5ndGgpXG4gICAgICAgIGpzb24uZGVmaW5pdGlvbnMgPSBbIC4uLnRoaXMuX2RlZmluaXRpb25zIF07XG4gICAgICBpZiAodGhpcy5fY29tcGlsZXJPcHRpb25zLmxlbmd0aClcbiAgICAgICAganNvbi5jb21waWxlck9wdGlvbnMgPSBbIC4uLnRoaXMuX2NvbXBpbGVyT3B0aW9ucyBdO1xuICAgIH1cbiAgICByZXR1cm4ganNvbjtcbiAgfVxufVxuIiwiLypcbiAqIE1JVCBMaWNlbnNlXG4gKlxuICogQ29weXJpZ2h0IChjKSAyMDI1ICBZdXJpaSBZYWt1YmluICh5dXJpaS55YWt1YmluQGdtYWlsLmNvbSlcbiAqXG4gKiBQZXJtaXNzaW9uIGlzIGdyYW50ZWQgdG8gdXNlLCBjb3B5LCBtb2RpZnksIGFuZCBkaXN0cmlidXRlIHRoaXMgc29mdHdhcmVcbiAqIHVuZGVyIHRoZSBNSVQgTGljZW5zZS4gU2VlIExJQ0VOU0UgZmlsZSBmb3IgZGV0YWlscy5cbiAqL1xuXG5pbXBvcnQgeyBJbnRlcmZhY2VUYXNrIH0gZnJvbSBcIkAvY29yZS9NYWtlSW50ZXJmYWNlc1wiO1xuaW1wb3J0IHsgU2ltcGxlT2JqZWN0IH0gZnJvbSBcIkAvY29yZS9TaW1wbGVPYmplY3RcIjtcbmltcG9ydCB7IHNwYXduQXN5bmMgfSBmcm9tIFwiQC91dGlscy9DaGlsZFByb2Nlc3NcIjtcbmltcG9ydCB7IExvZ2dlciB9IGZyb20gXCJAL2xvZ2dlclwiO1xuXG5jb25zdCBsb2dnZXIgPSBMb2dnZXIuY3JlYXRlKGltcG9ydC5tZXRhLnVybCk7XG5cbmludGVyZmFjZSBPcHRpb25zIHtcbiAgY29tbWFuZDogc3RyaW5nO1xuICBhcmdzOiBzdHJpbmdbXTtcbiAgY3dkOiBzdHJpbmc7XG59O1xuXG5leHBvcnQgY2xhc3MgU3Bhd25TeW5jVGFzayBleHRlbmRzIEludGVyZmFjZVRhc2sge1xuICBwcml2YXRlIF9jb21tYW5kOiBzdHJpbmc7XG4gIHByaXZhdGUgX2FyZ3M6IHN0cmluZ1tdO1xuICBwcml2YXRlIF9jd2Q6IHN0cmluZztcblxuICBwdWJsaWMgY29uc3RydWN0b3IoY29tbWFuZDogc3RyaW5nLCBhcmdzOiBzdHJpbmdbXSwgY3dkOiBzdHJpbmcpIHtcbiAgICBzdXBlcigpO1xuXG4gICAgdGhpcy5fY29tbWFuZCA9IGNvbW1hbmQ7XG4gICAgdGhpcy5fYXJncyA9IGFyZ3M7XG4gICAgdGhpcy5fY3dkID0gY3dkO1xuICB9XG5cbiAgcHVibGljIGFzeW5jIGV4ZWN1dGUoKTogUHJvbWlzZTx2b2lkPiB7XG4gICAgbG9nZ2VyLmRlYnVnKFwic3Bhd25Bc3luY1wiKTtcbiAgICBsb2dnZXIuZGVidWcoXCIgIGNvbW1hbmRcIiwgdGhpcy5fY29tbWFuZCk7XG4gICAgbG9nZ2VyLmRlYnVnKFwiICBjd2RcIiwgdGhpcy5fY3dkKTtcbiAgICBmb3IgKGxldCBpID0gMDsgaSA8IHRoaXMuX2FyZ3MubGVuZ3RoOyBpKyspXG4gICAgICBsb2dnZXIuZGVidWcoYCAgYXJnc1ske2l9XWAsIHRoaXMuX2FyZ3NbaV0pO1xuXG4gICAgY29uc3QgcmVzdWx0ID0gYXdhaXQgc3Bhd25Bc3luYyh0aGlzLl9jb21tYW5kLCB0aGlzLl9hcmdzLCB7IGN3ZDogdGhpcy5fY3dkLCBlbmNvZGluZzogXCJ1dGYtOFwiLCBub3N0ZG91dDogdHJ1ZSB9KTtcbiAgICBpZiAocmVzdWx0LmVycm9yIHx8IHJlc3VsdC5zdGF0dXMpIHtcbiAgICAgIGxvZ2dlci5ub3RpY2UoXCJjZCBcIiArIHRoaXMuX2N3ZCk7XG4gICAgICBsZXQgY21kID0gdGhpcy5fYXJncy5qb2luKFwiIFwiKTtcbiAgICAgIGNtZCA9IHRoaXMuX2NvbW1hbmQgKyAoY21kID8gXCIgXCIgOiBcIlwiKSArIGNtZDtcbiAgICAgIGxvZ2dlci5ub3RpY2UoY21kKTtcbiAgICAgIGxvZ2dlci5ub3RpY2UoXCJcIik7XG5cbiAgICAgIGxvZ2dlci5mYXRhbChyZXN1bHQuc3RkZXJyKTtcblxuICAgICAgaWYgKHJlc3VsdC5lcnJvcilcbiAgICAgICAgICB0aHJvdyByZXN1bHQuZXJyb3I7XG5cbiAgICAgIHRocm93IG5ldyBFcnJvcihyZXN1bHQuZXJyb3IgYXMgYW55IHx8IFwiU3RhdHVzIFwiICsgcmVzdWx0LnN0YXR1cyk7XG4gICAgfVxuICAgIGlmIChyZXN1bHQuc3Rkb3V0KSB7XG4gICAgICBmb3IgKGNvbnN0IGxpbmUgb2YgcmVzdWx0LnN0ZG91dC50cmltKCkuc3BsaXQoXCJcXG5cIikpIHtcbiAgICAgICAgbG9nZ2VyLm5vdGljZShsaW5lKTtcbiAgICAgIH1cbiAgICB9XG4gIH1cblxuICBwdWJsaWMgc3RhdGljIGZyb21KU09OKG86IFNpbXBsZU9iamVjdCkge1xuICAgIGNvbnN0IG9wdGlvbnM6IE9wdGlvbnMgJiBTaW1wbGVPYmplY3QgPSBvIGFzIGFueTtcbiAgICByZXR1cm4gbmV3IFNwYXduU3luY1Rhc2sob3B0aW9ucy5jb21tYW5kLCBvcHRpb25zLmFyZ3MsIG9wdGlvbnMuY3dkKTtcbiAgfVxuXG4gIHB1YmxpYyB0b0pTT04oKTogT3B0aW9ucyAmIFNpbXBsZU9iamVjdCB7XG4gICAgcmV0dXJuIHtcbiAgICAgIHR5cGU6IFNwYXduU3luY1Rhc2submFtZSxcbiAgICAgIGNvbW1hbmQ6IHRoaXMuX2NvbW1hbmQsXG4gICAgICBhcmdzOiB0aGlzLl9hcmdzLFxuICAgICAgY3dkOiB0aGlzLl9jd2QsXG4gICAgfVxuICB9XG59O1xuIiwiLypcbiAqIE1JVCBMaWNlbnNlXG4gKlxuICogQ29weXJpZ2h0IChjKSAyMDI1ICBZdXJpaSBZYWt1YmluICh5dXJpaS55YWt1YmluQGdtYWlsLmNvbSlcbiAqXG4gKiBQZXJtaXNzaW9uIGlzIGdyYW50ZWQgdG8gdXNlLCBjb3B5LCBtb2RpZnksIGFuZCBkaXN0cmlidXRlIHRoaXMgc29mdHdhcmVcbiAqIHVuZGVyIHRoZSBNSVQgTGljZW5zZS4gU2VlIExJQ0VOU0UgZmlsZSBmb3IgZGV0YWlscy5cbiAqL1xuXG5pbXBvcnQgb3MgZnJvbSBcIm5vZGU6b3NcIjtcbmltcG9ydCB7IERFQlVHX0JVSUxEX1RZUEUsIFJFTEVBU0VfQlVJTERfVFlQRSB9IGZyb20gXCJAL2NvcmUvVHlwZXNcIjtcbmltcG9ydCB7IEhvc3QgfSBmcm9tIFwiQC91dGlscy9Ib3N0XCI7XG5cbmV4cG9ydCBkZWZhdWx0IHtcbiAgU1lTVEVNX05BTUU6IHtcbiAgICBkZXNjcmlwdGlvbjogXCJEZWZpbmVzIHRoZSB0YXJnZXQgT1MgZm9yIHRoZSBidWlsZCwgdXNlZCBpbiBjcm9zcy1jb21waWxhdGlvbiBhbmQgbmF0aXZlIGJ1aWxkc1wiLFxuICAgIHZhbHVlOiBcIkxpbnV4XCIsXG4gIH0sXG4gIFNZU1RFTV9QUk9DRVNTT1I6IHtcbiAgICBkZXNjcmlwdGlvbjogXCJEZWZpbmVzIHRoZSB0YXJnZXQgQ1BVIGFyY2hpdGVjdHVyZVwiLFxuICAgIHZhbHVlOiBcIndhc20zMlwiLFxuICB9LFxuICBQUk9KRUNUX05BTUU6IHtcbiAgICBkZXNjcmlwdGlvbjogXCJOYW1lIG9mIHRoZSBjdXJyZW50IHByb2plY3RcIixcbiAgICB2YWx1ZTogXCJcIixcbiAgfSxcbiAgUFJPSkVDVF9WRVJTSU9OOiB7XG4gICAgZGVzY3JpcHRpb246IFwiVmVyc2lvbiBvZiB0aGUgY3VycmVudCBwcm9qZWN0XCIsXG4gICAgdmFsdWU6IFwiXCIsXG4gIH0sXG4gIFBST0pFQ1RfREVTQ1JJUFRJT046IHtcbiAgICBkZXNjcmlwdGlvbjogXCJEZXNjcmlwdGlvbiBvZiB0aGUgY3VycmVudCBwcm9qZWN0XCIsXG4gICAgdmFsdWU6IFwiXCIsXG4gIH0sXG4gIFBST0pFQ1RfSE9NRVBBR0VfVVJMOiB7XG4gICAgZGVzY3JpcHRpb246IFwiSG9tZXBhZ2UgVVJMIG9mIHRoZSBjdXJyZW50IHByb2plY3RcIixcbiAgICB2YWx1ZTogXCJcIixcbiAgfSxcbiAgUFJPSkVDVF9TT1VSQ0VfRElSOiB7XG4gICAgZGVzY3JpcHRpb246IFwiQWJzb2x1dGUgcGF0aCB0byB0aGUgdG9wLWxldmVsIHNvdXJjZSBkaXJlY3Rvcnkgb2YgdGhlIHByb2plY3RcIixcbiAgICB0eXBlOiBcIkRpclBhdGhcIixcbiAgfSxcbiAgUFJPSkVDVF9CSU5BUllfRElSOiB7XG4gICAgZGVzY3JpcHRpb246IFwiQWJzb2x1dGUgcGF0aCB0byB0aGUgdG9wLWxldmVsIGJ1aWxkIChiaW5hcnkpIGRpcmVjdG9yeSBvZiB0aGUgcHJvamVjdFwiLFxuICAgIHR5cGU6IFwiRGlyUGF0aFwiLFxuICB9LFxuICBTQ1JJUFRfTU9EVUxFOiB7XG4gICAgZGVzY3JpcHRpb246IFwiTW9kdWxlIG5hbWUgb2YgdGhlIGN1cnJlbnQgTWFrZVNjcmlwdFwiLFxuICAgIHR5cGU6IFwic3RyaW5nXCIsXG4gIH0sXG4gIFNDUklQVF9GSUxFOiB7XG4gICAgZGVzY3JpcHRpb246IFwiRnVsbCBwYXRoIHRvIHRoZSBjdXJyZW50IE1ha2VTY3JpcHQgZmlsZSBiZWluZyBwcm9jZXNzZWRcIixcbiAgICB0eXBlOiBcIkZpbGVQYXRoXCIsXG4gIH0sXG4gIFNDUklQVF9ESVI6IHtcbiAgICBkZXNjcmlwdGlvbjogXCJEaXJlY3Rvcnkgb2YgdGhlIGN1cnJlbnQgTWFrZVNjcmlwdCBmaWxlIGJlaW5nIHByb2Nlc3NlZFwiLFxuICAgIHR5cGU6IFwiRGlyUGF0aFwiLFxuICB9LFxuICBQQUNLQUdFX0ZJTEU6IHtcbiAgICBkZXNjcmlwdGlvbjogXCJGaWxlbmFtZSBvZiBwcm9qZWN0IG1hbmlmZXN0IGNvbnRhaW5pbmcgbWV0YWRhdGEgYW5kIGRlcGVuZGVuY2llc1wiLFxuICAgIHR5cGU6IFwiRmlsZVBhdGhcIixcbiAgfSxcbiAgQ0FDSEVfRklMRToge1xuICAgIGRlc2NyaXB0aW9uOiBcIkRlZmF1bHQgZmlsZW5hbWUgb2YgdGhlIEJpdE1ha2UgY2FjaGUgc3RvcmluZyBzZXR0aW5nc1wiLFxuICAgIHR5cGU6IFwiRmlsZVBhdGhcIixcbiAgfSxcbiAgVE9PTENIQUlOX0ZJTEU6IHtcbiAgICBkZXNjcmlwdGlvbjogXCJTcGVjaWZpZXMgdGhlIHBhdGggdG8gYSB0b29sY2hhaW4gZmlsZSB1c2VkIGZvciBjcm9zcy1jb21waWxhdGlvblwiLFxuICAgIHR5cGU6IFwiRmlsZVBhdGhcIixcbiAgfSxcbiAgQlVJTERfVFlQRToge1xuICAgIGRlc2NyaXB0aW9uOiBcIlNwZWNpZmllcyB0aGUgYnVpbGQgY29uZmlndXJhdGlvbiBmb3IgY29udHJvbGxpbmcgb3B0aW1pemF0aW9uIGxldmVscyBhbmQgZGVidWcgaW5mb3JtYXRpb24gaW4gdGhlIGJ1aWxkIHByb2Nlc3NcIixcbiAgICB0eXBlOiBbIERFQlVHX0JVSUxEX1RZUEUsIFJFTEVBU0VfQlVJTERfVFlQRSBdLFxuICAgIHZhbHVlOiBSRUxFQVNFX0JVSUxEX1RZUEUsXG4gIH0sXG4gIElOU1RBTExfUFJFRklYOiB7XG4gICAgZGVzY3JpcHRpb246IFwiVGhlIHJvb3QgZGlyZWN0b3J5IHdoZXJlIGZpbGVzIHdpbGwgYmUgaW5zdGFsbGVkIGJ5IGRlZmF1bHRcIixcbiAgICB0eXBlOiBcIkRpclBhdGhcIixcbiAgICB2YWx1ZTogXCIvdXNyXCIsXG4gIH0sXG4gIERFU1RESVI6IHtcbiAgICBkZXNjcmlwdGlvbjogXCJUZW1wb3JhcnkgaW5zdGFsbGF0aW9uIHJvb3RcIixcbiAgICB0eXBlOiBcIkRpclBhdGhcIixcbiAgfSxcbiAgU09VUkNFX0RJUjoge1xuICAgIGRlc2NyaXB0aW9uOiBcIlBhdGggdG8gdGhlIHNvdXJjZSBkaXJlY3RvcnkgY3VycmVudGx5IGJlaW5nIHByb2Nlc3NlZFwiLFxuICAgIHR5cGU6IFwiRGlyUGF0aFwiLFxuICB9LFxuICBCSU5BUllfRElSOiB7XG4gICAgZGVzY3JpcHRpb246IFwiUGF0aCB0byB0aGUgYmluYXJ5IGRpcmVjdG9yeSBjdXJyZW50bHkgYmVpbmcgcHJvY2Vzc2VkXCIsXG4gICAgdHlwZTogXCJEaXJQYXRoXCIsXG4gIH0sXG4gIFBPU0lUSU9OX0lOREVQRU5ERU5UX0NPREU6IHtcbiAgICBkZXNjcmlwdGlvbjogXCJFbmFibGVzIFBvc2l0aW9uLUluZGVwZW5kZW50IENvZGUgKFBJQykgZm9yIGJ1aWxkaW5nIHNoYXJlZCBsaWJyYXJpZXNcIixcbiAgICB2YWx1ZTogZmFsc2UsXG4gIH0sXG4gIFBSRVZFTlRfSU5TVEFMTF9GSUxFUzoge1xuICAgIGRlc2NyaXB0aW9uOiBcIlByZXZlbnQgaW5zdGFsbGF0aW9uIG9mIGZpbGVzXCIsXG4gICAgdmFsdWU6IGZhbHNlLFxuICB9LFxuICBIT1NUX1NZU1RFTV9OQU1FOiB7XG4gICAgZGVzY3JpcHRpb246IFwiU3BlY2lmaWVzIHRoZSBPUyBvZiB0aGUgbWFjaGluZSBydW5uaW5nXCIsXG4gICAgdmFsdWU6IG9zLnR5cGUoKSxcbiAgfSxcbiAgSU5DTFVERVM6IHtcbiAgICBkZXNjcmlwdGlvbjogXCJQYXRocyBzZWFyY2hlZCBmb3IgaGVhZGVyIGZpbGVzXCIsXG4gICAgdmFsdWU6IFtdLFxuICB9LFxuICBBU01fQ09NUElMRVI6IHtcbiAgICBkZXNjcmlwdGlvbjogXCJQYXRoIHRvIHRoZSBhc3NlbWJsZXIgY29tcGlsZXIgZGV0ZWN0ZWRcIixcbiAgICB2YWx1ZTogXCJcIixcbiAgfSxcbiAgQVNNX0ZMQUdTOiB7XG4gICAgZGVzY3JpcHRpb246IFwiRmxhZ3MgcGFzc2VkIHRvIHRoZSBhc3NlbWJsZXIgY29tcGlsZXJcIixcbiAgICB2YWx1ZTogW10sXG4gIH0sXG4gIEFTTV9GTEFHU19ERUJVRzoge1xuICAgIGRlc2NyaXB0aW9uOiBcIkFkZGl0aW9uYWwgYXNzZW1ibGVyIGZsYWdzIHVzZWQgd2hlbiBidWlsZGluZyBpbiBEZWJ1ZyBtb2RlXCIsXG4gICAgdmFsdWU6IFsgXCItZ1wiIF0sXG4gIH0sXG4gIEFTTV9GTEFHU19SRUxFQVNFOiB7XG4gICAgZGVzY3JpcHRpb246IFwiQWRkaXRpb25hbCBhc3NlbWJsZXIgZmxhZ3MgdXNlZCB3aGVuIGJ1aWxkaW5nIGluIFJlbGVhc2UgbW9kZVwiLFxuICAgIHZhbHVlOiBbIFwiLU8zXCIsIFwiLUROREVCVUdcIiBdLFxuICB9LFxuICBDX0NPTVBJTEVSOiB7XG4gICAgZGVzY3JpcHRpb246IFwiUGF0aCB0byB0aGUgQyBjb21waWxlciBkZXRlY3RlZFwiLFxuICAgIHZhbHVlOiBcIlwiLFxuICB9LFxuICBDX0ZMQUdTOiB7XG4gICAgZGVzY3JpcHRpb246IFwiRmxhZ3MgcGFzc2VkIHRvIHRoZSBDIGNvbXBpbGVyXCIsXG4gICAgdmFsdWU6IFtdLFxuICB9LFxuICBDX0ZMQUdTX0RFQlVHOiB7XG4gICAgZGVzY3JpcHRpb246IFwiQWRkaXRpb25hbCBDIGNvbXBpbGVyIGZsYWdzIHVzZWQgd2hlbiBidWlsZGluZyBpbiBEZWJ1ZyBtb2RlXCIsXG4gICAgdmFsdWU6IFsgXCItZ1wiIF0sXG4gIH0sXG4gIENfRkxBR1NfUkVMRUFTRToge1xuICAgIGRlc2NyaXB0aW9uOiBcIkFkZGl0aW9uYWwgQyBjb21waWxlciBmbGFncyB1c2VkIHdoZW4gYnVpbGRpbmcgaW4gUmVsZWFzZSBtb2RlXCIsXG4gICAgdmFsdWU6IFsgXCItTzNcIiwgXCItRE5ERUJVR1wiIF0sXG4gIH0sXG4gIENYWF9DT01QSUxFUjoge1xuICAgIGRlc2NyaXB0aW9uOiBcIlBhdGggdG8gdGhlIEMrKyBjb21waWxlciBkZXRlY3RlZFwiLFxuICAgIHZhbHVlOiBcIlwiLFxuICB9LFxuICBDWFhfRkxBR1M6IHtcbiAgICBkZXNjcmlwdGlvbjogXCJGbGFncyBwYXNzZWQgdG8gdGhlIEMgY29tcGlsZXJcIixcbiAgICB2YWx1ZTogW10sXG4gIH0sXG4gIENYWF9GTEFHU19ERUJVRzoge1xuICAgIGRlc2NyaXB0aW9uOiBcIkFkZGl0aW9uYWwgQysrIGNvbXBpbGVyIGZsYWdzIHVzZWQgd2hlbiBidWlsZGluZyBpbiBEZWJ1ZyBtb2RlXCIsXG4gICAgdmFsdWU6IFsgXCItZ1wiIF0sXG4gIH0sXG4gIENYWF9GTEFHU19SRUxFQVNFOiB7XG4gICAgZGVzY3JpcHRpb246IFwiQWRkaXRpb25hbCBDKysgY29tcGlsZXIgZmxhZ3MgdXNlZCB3aGVuIGJ1aWxkaW5nIGluIFJlbGVhc2UgbW9kZVwiLFxuICAgIHZhbHVlOiBbIFwiLU8zXCIsIFwiLUROREVCVUdcIiBdLFxuICB9LFxuICBBUjoge1xuICAgIGRlc2NyaXB0aW9uOiBcIlBhdGggdG8gdGhlIGFyY2hpdmVyIHRvb2wgdXNlZCB0byBjcmVhdGUgc3RhdGljIGxpYnJhcmllc1wiLFxuICAgIHZhbHVlOiBcIlwiLFxuICB9LFxuICBSQU5MSUI6IHtcbiAgICBkZXNjcmlwdGlvbjogXCJUb29sIHVzZWQgdG8gZ2VuZXJhdGUgYW4gaW5kZXggdG8gdGhlIGNvbnRlbnRzIG9mIGFuIGFyY2hpdmUgKHN0YXRpYyBsaWJyYXJ5KVwiLFxuICAgIHZhbHVlOiBcIlwiLFxuICB9LFxuICBMSU5LRVI6IHtcbiAgICBkZXNjcmlwdGlvbjogXCJQYXRoIHRvIHRoZSBsaW5rZXIgdXNlZCB0byBsaW5rIG9iamVjdCBmaWxlcyBhbmQgbGlicmFyaWVzIGludG8gZXhlY3V0YWJsZXNcIixcbiAgICB2YWx1ZTogXCJcIixcbiAgfSxcbiAgTk06IHtcbiAgICBkZXNjcmlwdGlvbjogXCJQYXRoIHRvIHRoZSB0b29sIHVzZWQgdG8gbGlzdCBzeW1ib2xzIGZyb20gb2JqZWN0IGZpbGVzIG9yIGFyY2hpdmVzXCIsXG4gICAgdmFsdWU6IFwiXCIsXG4gIH0sXG4gIE9CSkNPUFk6IHtcbiAgICBkZXNjcmlwdGlvbjogXCJQYXRoIHRvIHRoZSB0b29sIHVzZWQgdG8gY29weSBhbmQgdHJhbnNsYXRlIG9iamVjdCBmaWxlc1wiLFxuICAgIHZhbHVlOiBcIlwiLFxuICB9LFxuICBPQkpEVU1QOiB7XG4gICAgZGVzY3JpcHRpb246IFwiUGF0aCB0byB0aGUgdG9vbCB1c2VkIHRvIGRpc3BsYXkgaW5mb3JtYXRpb24gYWJvdXQgb2JqZWN0IGZpbGVzLCBzdWNoIGFzIGRpc2Fzc2VtYmx5XCIsXG4gICAgdmFsdWU6IFwiXCIsXG4gIH0sXG4gIFNUUklQOiB7XG4gICAgZGVzY3JpcHRpb246IFwiUGF0aCB0byB0aGUgdG9vbCB1c2VkIHRvIHJlbW92ZSBzeW1ib2xzIGZyb20gb2JqZWN0IGZpbGVzIG9yIGV4ZWN1dGFibGVzIHRvIHJlZHVjZSBzaXplXCIsXG4gICAgdmFsdWU6IFwiXCIsXG4gIH0sXG4gIE9CSkVDVF9MSUJSQVJZX1BSRUZJWDoge1xuICAgIGRlc2NyaXB0aW9uOiBcIlByZWZpeCB1c2VkIGZvciBvYmplY3QgbGlicmFyaWVzXCIsXG4gICAgdmFsdWU6IFwiXCIsXG4gIH0sXG4gIE9CSkVDVF9MSUJSQVJZX1NVRkZJWDoge1xuICAgIGRlc2NyaXB0aW9uOiBcIlN1ZmZpeCB1c2VkIGZvciBvYmplY3QgbGlicmFyeSBmaWxlc1wiLFxuICAgIHZhbHVlOiBcIi5vXCIsXG4gIH0sXG4gIE9CSkVDVF9MSU5LRVJfRkxBR1M6IHtcbiAgICBkZXNjcmlwdGlvbjogXCJGbGFncyBwYXNzZWQgdG8gdGhlIGxpbmtlciB3aGVuIGNyZWF0aW5nIG9iamVjdCBsaWJyYXJpZXNcIixcbiAgICB2YWx1ZTogW10sXG4gIH0sXG4gIFNUQVRJQ19MSUJSQVJZX1BSRUZJWDoge1xuICAgIGRlc2NyaXB0aW9uOiBcIlByZWZpeCB1c2VkIGZvciBzdGF0aWMgbGlicmFyeSBmaWxlc1wiLFxuICAgIHZhbHVlOiBcImxpYlwiLFxuICB9LFxuICBTVEFUSUNfTElCUkFSWV9TVUZGSVg6IHtcbiAgICBkZXNjcmlwdGlvbjogXCJTdWZmaXggdXNlZCBmb3Igc3RhdGljIGxpYnJhcnkgZmlsZXNcIixcbiAgICB2YWx1ZTogXCIuYVwiLFxuICB9LFxuICBTVEFUSUNfTElOS0VSX0ZMQUdTOiB7XG4gICAgZGVzY3JpcHRpb246IFwiRmxhZ3MgcGFzc2VkIHRvIHRoZSBsaW5rZXIgd2hlbiBjcmVhdGluZyBzdGF0aWMgbGlicmFyaWVzXCIsXG4gICAgdmFsdWU6IFtdLFxuICB9LFxuICBTSEFSRURfTElCUkFSWV9QUkVGSVg6IHtcbiAgICBkZXNjcmlwdGlvbjogXCJQcmVmaXggdXNlZCBmb3Igc2hhcmVkIGxpYnJhcnkgZmlsZXNcIixcbiAgICB2YWx1ZTogXCJsaWJcIixcbiAgfSxcbiAgU0hBUkVEX0xJQlJBUllfU1VGRklYOiB7XG4gICAgZGVzY3JpcHRpb246IFwiU3VmZml4IHVzZWQgZm9yIHNoYXJlZCBsaWJyYXJ5IGZpbGVzXCIsXG4gICAgdmFsdWU6IFwiLnNvXCIsXG4gIH0sXG4gIFNIQVJFRF9MSU5LRVJfRkxBR1M6IHtcbiAgICBkZXNjcmlwdGlvbjogXCJGbGFncyBwYXNzZWQgdG8gdGhlIGxpbmtlciB3aGVuIGNyZWF0aW5nIHNoYXJlZCBsaWJyYXJpZXNcIixcbiAgICB2YWx1ZTogW10sXG4gIH0sXG4gIEVYRUNVVEFCTEVfU1VGRklYOiB7XG4gICAgZGVzY3JpcHRpb246IFwiU3VmZml4IHVzZWQgZm9yIGV4ZWN1dGFibGUgZmlsZXNcIixcbiAgICB2YWx1ZTogSG9zdC5leGVjdXRhYmxlU3VmZml4LFxuICB9LFxuICBFWEVfTElOS0VSX0ZMQUdTOiB7XG4gICAgZGVzY3JpcHRpb246IFwiRmxhZ3MgcGFzc2VkIHRvIHRoZSBsaW5rZXIgd2hlbiBjcmVhdGluZyBleGVjdXRhYmxlc1wiLFxuICAgIHZhbHVlOiBbXSxcbiAgfSxcbiAgR0xPQkFMX0NPTlRFWFRfSlNPTjoge1xuICAgIGRlc2NyaXB0aW9uOiBcIkZpbGVuYW1lIGZvciBKU09OIG9mIHRoZSBHbG9iYWwgY29udGV4dFwiLFxuICAgIHR5cGU6IFwiRmlsZVBhdGhcIixcbiAgfSxcbiAgVEFSR0VUX0dPQUxTX0pTT046IHtcbiAgICBkZXNjcmlwdGlvbjogXCJGaWxlbmFtZSBmb3IgSlNPTiBvZiB0aGUgVGFyZ2V0IEdvYWxzXCIsXG4gICAgdHlwZTogXCJGaWxlUGF0aFwiLFxuICB9LFxuICBTSVpFT0ZfVk9JRF9QOiB7XG4gICAgZGVzY3JpcHRpb246IFwiRGVmaW5lcyB0aGUgc2l6ZSAoaW4gYnl0ZXMpIG9mIGEgdm9pZCBwb2ludGVyIG9uIHRoZSB0YXJnZXQgYXJjaGl0ZWN0dXJlXCIsXG4gICAgdHlwZTogWyA0LCA4IF0sXG4gICAgdmFsdWU6IEhvc3Quc2l6ZW9mVm9pZHAsXG4gIH0sXG4gIE1BS0VfUExVR0lOX0xJU1Q6IHtcbiAgICBkZXNjcmlwdGlvbjogXCJMaXN0IG9mIHBhdGhzIHRvIHBsdWdpbnNcIixcbiAgICB2YWx1ZTogW10sXG4gIH0sXG4gIEhPU1RfRVhFQ1VUQUJMRV9TVUZGSVg6IHtcbiAgICBkZXNjcmlwdGlvbjogXCJEZWZpbmVzIHRoZSBmaWxlIGV4dGVuc2lvbiBmb3IgZXhlY3V0YWJsZXMgb24gdGhlIGhvc3Qgc3lzdGVtXCIsXG4gICAgdmFsdWU6IEhvc3QuZXhlY3V0YWJsZVN1ZmZpeCxcbiAgICAvLyBSZWFkb25seVxuICB9LFxufTtcbiIsIi8qXG4gKiBNSVQgTGljZW5zZVxuICpcbiAqIENvcHlyaWdodCAoYykgMjAyNSAgWXVyaWkgWWFrdWJpbiAoeXVyaWkueWFrdWJpbkBnbWFpbC5jb20pXG4gKlxuICogUGVybWlzc2lvbiBpcyBncmFudGVkIHRvIHVzZSwgY29weSwgbW9kaWZ5LCBhbmQgZGlzdHJpYnV0ZSB0aGlzIHNvZnR3YXJlXG4gKiB1bmRlciB0aGUgTUlUIExpY2Vuc2UuIFNlZSBMSUNFTlNFIGZpbGUgZm9yIGRldGFpbHMuXG4gKi9cblxuaW1wb3J0IHsgU291cmNlRmlsZSB9IGZyb20gXCJAL2NvcmUvU291cmNlRmlsZVwiO1xuaW1wb3J0IHsgVGFyZ2V0TmFtZSB9IGZyb20gXCJAL2NvcmUvVGFyZ2V0TmFtZVwiO1xuaW1wb3J0IHsgVGFyZ2V0RmlsZSB9IGZyb20gXCJAL2NvcmUvVGFyZ2V0RmlsZVwiO1xuaW1wb3J0IHsgVGFyZ2V0SW5jbHVkZXMgfSBmcm9tIFwiQC9jb3JlL1RhcmdldEluY2x1ZGVzXCI7XG5pbXBvcnQgeyBUYXJnZXRPYmplY3RzIH0gZnJvbSBcIkAvY29yZS9UYXJnZXRPYmplY3RzXCI7XG5pbXBvcnQgeyBEaXJQYXRoLCBMb2NhdG9yIH0gZnJvbSBcIkAvdXRpbHMvTG9jYXRvclwiO1xuaW1wb3J0IHsgU2ltcGxlT2JqZWN0IH0gZnJvbSBcIi4vU2ltcGxlT2JqZWN0XCI7XG5pbXBvcnQgeyBMb2dnZXIgfSBmcm9tIFwiQC9sb2dnZXJcIjtcblxuY29uc3QgbG9nZ2VyID0gTG9nZ2VyLmNyZWF0ZShpbXBvcnQubWV0YS51cmwpO1xuXG5leHBvcnQgaW50ZXJmYWNlIFRhcmdldENvbW1hbmQge1xuICBjb21tYW5kOiBzdHJpbmcgfCBUYXJnZXRGaWxlO1xuICBhcmdzOiBBcnJheTxzdHJpbmcgfCBUYXJnZXRGaWxlPjtcbn07XG5cbmludGVyZmFjZSBUYXJnZXRFbGVtZW50PFQ+IHtcbiAgdmFsdWU6IFQ7XG4gIGlzUHVibGljPzogYm9vbGVhbjtcbn07XG5cbmNsYXNzIFRhcmdldEVsZW1lbnRzPFQ+IHtcbiAgcHJpdmF0ZSBfbGlzdCA9IG5ldyBBcnJheTxUYXJnZXRFbGVtZW50PFQ+PjtcblxuICBwdWJsaWMgYWRkKHZhbHVlOiBULCBpc1B1YmxpYz86IGJvb2xlYW4pIHtcbiAgICB0aGlzLl9saXN0LnB1c2goe3ZhbHVlLCBpc1B1YmxpY30pO1xuICB9XG5cbiAgcHVibGljIGNvbmNhdChvdGhlcjogVGFyZ2V0RWxlbWVudHM8VD4pIHtcbiAgICBjb25zdCByZXN1bHQgPSBuZXcgVGFyZ2V0RWxlbWVudHM8VD47XG4gICAgZm9yIChjb25zdCBpdGVyIG9mIHRoaXMuX2xpc3QpXG4gICAgICByZXN1bHQuX2xpc3QucHVzaChpdGVyKTtcbiAgICBmb3IgKGNvbnN0IGl0ZXIgb2Ygb3RoZXIuX2xpc3QpXG4gICAgICByZXN1bHQuX2xpc3QucHVzaChpdGVyKTtcbiAgICByZXR1cm4gcmVzdWx0O1xuICB9XG5cbiAgcHVibGljIGdldEFsbFZhbHVlcygpOiBUW10ge1xuICAgIHJldHVybiB0aGlzLl9saXN0Lm1hcChpID0+IGkudmFsdWUpO1xuICB9XG5cbiAgcHVibGljIGdldFB1YmxpY1ZhbHVlcygpIHtcbiAgICByZXR1cm4gdGhpcy5fbGlzdC5maWx0ZXIoaSA9PiBpLmlzUHVibGljKS5tYXAoaSA9PiBpLnZhbHVlKTtcbiAgfVxuXG4gIHB1YmxpYyBzdGF0aWMgZnJvbUpTT048VT4oanNvbjogYW55W10pIHtcbiAgICBjb25zdCByZXN1bHQgPSBuZXcgVGFyZ2V0RWxlbWVudHM8VT47XG4gICAgZm9yIChjb25zdCBpdGVyIG9mIGpzb24pIHtcbiAgICAgIGxldCBpc1B1YmxpYyA9IGZhbHNlO1xuICAgICAgbGV0IHZhbHVlID0gaXRlci5wcml2YXRlO1xuICAgICAgaWYgKCF2YWx1ZSkge1xuICAgICAgICB2YWx1ZSA9IGl0ZXIucHVibGljO1xuICAgICAgICBpc1B1YmxpYyA9IHRydWU7XG4gICAgICB9XG4gICAgICB2YWx1ZSA9IFNpbXBsZU9iamVjdC5mcm9tSlNPTih2YWx1ZSk7XG4gICAgICByZXN1bHQuX2xpc3QucHVzaCh7dmFsdWUsIGlzUHVibGljfSk7XG4gICAgfVxuICAgIHJldHVybiByZXN1bHQ7XG4gIH1cblxuICBwdWJsaWMgdG9KU09OKCkge1xuICAgIGNvbnN0IHJlc3VsdDogYW55ID0gW107XG4gICAgZm9yIChjb25zdCBpdGVyIG9mIHRoaXMuX2xpc3QpIHtcbiAgICAgIGNvbnN0IG5hbWUgPSBpdGVyLmlzUHVibGljID8gXCJwdWJsaWNcIiA6IFwicHJpdmF0ZVwiO1xuICAgICAgY29uc3QgdmFsdWUgPSBTaW1wbGVPYmplY3QudG9KU09OKGl0ZXIudmFsdWUpO1xuICAgICAgcmVzdWx0LnB1c2goeyBbbmFtZV0gOiB2YWx1ZSB9KTtcbiAgICB9XG4gICAgcmV0dXJuIHJlc3VsdDtcbiAgfVxufTtcblxuZXhwb3J0IGFic3RyYWN0IGNsYXNzIEJhc2VUYXJnZXQge1xuICBwcm90ZWN0ZWQgX25hbWU6IHN0cmluZztcbiAgcHJvdGVjdGVkIF9pbmNsdWRlcyA9IG5ldyBUYXJnZXRFbGVtZW50czxEaXJQYXRoIHwgVGFyZ2V0SW5jbHVkZXM+O1xuICBwcm90ZWN0ZWQgX2RlZmluaXRpb25zID0gbmV3IFRhcmdldEVsZW1lbnRzPHN0cmluZz47XG4gIHByb3RlY3RlZCBfY29tcGlsZU9wdGlvbnMgPSBuZXcgVGFyZ2V0RWxlbWVudHM8c3RyaW5nIHwgc3RyaW5nW10+O1xuICBwcm90ZWN0ZWQgX2xpbmtPcHRpb25zID0gbmV3IFRhcmdldEVsZW1lbnRzPHN0cmluZyB8IHN0cmluZ1tdPjtcbiAgcHJvdGVjdGVkIF9saWJyYXJpZXMgPSBuZXcgVGFyZ2V0RWxlbWVudHM8VGFyZ2V0TmFtZT47XG4gIHByb3RlY3RlZCBfc291cmNlcyA9IG5ldyBBcnJheTxUYXJnZXRPYmplY3RzIHwgU291cmNlRmlsZT47XG4gIHByb3RlY3RlZCBfcHJlQnVpbGRMaXN0ID0gbmV3IEFycmF5PFRhcmdldENvbW1hbmQ+O1xuICBwcm90ZWN0ZWQgX3Bvc3RCdWlsZExpc3QgPSBuZXcgQXJyYXk8VGFyZ2V0Q29tbWFuZD47XG4gIHByb3RlY3RlZCBfbGFuZ3VhZ2UgPSBcIlwiO1xuICBwcm90ZWN0ZWQgX2NvbXBpbGVyUGF0aCA9IFwiXCI7XG4gIHByb3RlY3RlZCBfY29tcGlsZXJGbGFncyA9IG5ldyBBcnJheTxzdHJpbmc+O1xuXG4gIHByb3RlY3RlZCBjb25zdHJ1Y3RvcihuYW1lOiBzdHJpbmcpIHtcbiAgICB0aGlzLl9uYW1lID0gbmFtZTtcbiAgfVxuXG4gIGFic3RyYWN0IHNldFByZWZpeCh2YWx1ZTogc3RyaW5nKSA6IHZvaWQ7XG4gIGFic3RyYWN0IHNldE91dHB1dE5hbWUodmFsdWU6IGFueSkgOiB2b2lkO1xuICBhYnN0cmFjdCBzZXRTdWZmaXgodmFsdWU6IHN0cmluZykgOiB2b2lkO1xuICBhYnN0cmFjdCBzZXRQb3NpdGlvbkluZGVwZW5kZW50Q29kZSh2YWx1ZTogYm9vbGVhbikgOiB2b2lkO1xuXG4gIHB1YmxpYyBnZXQgdGFyZ2V0TmFtZSgpIHtcbiAgICByZXR1cm4gdGhpcy5fbmFtZTtcbiAgfVxuXG4gIHB1YmxpYyBnZXQgbmFtZSgpIHsgLy8gREVMTUVcbiAgICByZXR1cm4gdGhpcy5fbmFtZTtcbiAgfVxuXG4gIHB1YmxpYyBnZXQgaW5jbHVkZXMoKTogVGFyZ2V0SW5jbHVkZXMge1xuICAgIHJldHVybiBUYXJnZXRJbmNsdWRlcy5jcmVhdGUodGhpcy5fbmFtZSk7XG4gIH1cblxuICBwdWJsaWMgZ2V0IG9iamVjdHMoKTogVGFyZ2V0T2JqZWN0cyB7XG4gICAgcmV0dXJuIFRhcmdldE9iamVjdHMuY3JlYXRlKHRoaXMuX25hbWUpO1xuICB9XG5cbiAgcHVibGljIGdldCB0YXJnZXRGaWxlKCk6IFRhcmdldEZpbGUge1xuICAgIHJldHVybiBUYXJnZXRGaWxlLmNyZWF0ZSh0aGlzLl9uYW1lKTtcbiAgfVxuXG4gIHB1YmxpYyBnZXRJbmNsdWRlcygpOiBBcnJheTxEaXJQYXRoIHwgVGFyZ2V0SW5jbHVkZXM+IHtcbiAgICByZXR1cm4gdGhpcy5faW5jbHVkZXMuZ2V0QWxsVmFsdWVzKCk7XG4gIH1cblxuICBwdWJsaWMgZ2V0UHVibGljSW5jbHVkZXMoKTogQXJyYXk8RGlyUGF0aCB8IFRhcmdldEluY2x1ZGVzPiB7XG4gICAgcmV0dXJuIHRoaXMuX2luY2x1ZGVzLmdldFB1YmxpY1ZhbHVlcygpO1xuICB9XG5cbiAgcHVibGljIGFkZEluY2x1ZGUocHVibGljT25seTogYm9vbGVhbiwgdmFsdWU6IERpclBhdGggfCBUYXJnZXRJbmNsdWRlcyk6IHZvaWQge1xuICAgIHRoaXMuX2luY2x1ZGVzLmFkZCh2YWx1ZSwgcHVibGljT25seSk7XG4gIH1cblxuICBwdWJsaWMgZ2V0RGVmaW5pdGlvbnMoKTogQXJyYXk8c3RyaW5nPiB7XG4gICAgcmV0dXJuIHRoaXMuX2RlZmluaXRpb25zLmdldEFsbFZhbHVlcygpO1xuICB9XG5cbiAgcHVibGljIGdldFB1YmxpY0RlZmluaXRpb25zKCk6IEFycmF5PHN0cmluZz4ge1xuICAgIHJldHVybiB0aGlzLl9kZWZpbml0aW9ucy5nZXRQdWJsaWNWYWx1ZXMoKTtcbiAgfVxuXG4gIHB1YmxpYyBhZGREZWZpbml0aW9uKHB1YmxpY09ubHk6IGJvb2xlYW4sIHZhbHVlOiBzdHJpbmcpOiB2b2lkIHtcbiAgICB0aGlzLl9kZWZpbml0aW9ucy5hZGQodmFsdWUsIHB1YmxpY09ubHkpO1xuICB9XG5cbiAgcHVibGljIGdldENvbXBpbGVPcHRpb25zKCk6IEFycmF5PHN0cmluZyB8IHN0cmluZ1tdPiB7XG4gICAgcmV0dXJuIHRoaXMuX2NvbXBpbGVPcHRpb25zLmdldEFsbFZhbHVlcygpO1xuICB9XG4gIFxuICBwdWJsaWMgZ2V0UHVibGljQ29tcGlsZU9wdGlvbnMoKTogQXJyYXk8c3RyaW5nfHN0cmluZ1tdPiB7XG4gICAgcmV0dXJuIHRoaXMuX2NvbXBpbGVPcHRpb25zLmdldFB1YmxpY1ZhbHVlcygpO1xuICB9XG5cbiAgcHVibGljIGFkZENvbXBpbGVPcHRpb24ocHVibGljT25seTogYm9vbGVhbiwgb3B0aW9uOiBzdHJpbmcgfCBzdHJpbmdbXSk6IHZvaWQge1xuICAgIHRoaXMuX2NvbXBpbGVPcHRpb25zLmFkZChvcHRpb24sIHB1YmxpY09ubHkpO1xuICB9XG5cbiAgcHVibGljIGdldExpbmtPcHRpb25zKCk6IEFycmF5PHN0cmluZyB8IHN0cmluZ1tdPiB7XG4gICAgcmV0dXJuIHRoaXMuX2xpbmtPcHRpb25zLmdldEFsbFZhbHVlcygpO1xuICB9XG5cbiAgcHVibGljIGdldFB1YmxpY0xpbmtPcHRpb25zKCk6IEFycmF5PHN0cmluZyB8IHN0cmluZ1tdPiB7XG4gICAgcmV0dXJuIHRoaXMuX2xpbmtPcHRpb25zLmdldFB1YmxpY1ZhbHVlcygpO1xuICB9XG5cbiAgcHVibGljIGFkZExpbmtPcHRpb25zKC4uLm9wdGlvbnM6IEFycmF5PHN0cmluZyB8IHN0cmluZ1tdPikge1xuICAgIHRoaXMuYWRkTGlua09wdGlvbnNJbXBsKGZhbHNlLCAuLi5vcHRpb25zKTtcbiAgfVxuXG4gIHB1YmxpYyBhZGRQdWJsaWNMaW5rT3B0aW9ucyguLi5vcHRpb25zOiBBcnJheTxzdHJpbmcgfCBzdHJpbmdbXT4pIHtcbiAgICB0aGlzLmFkZExpbmtPcHRpb25zSW1wbCh0cnVlLCAuLi5vcHRpb25zKTtcbiAgfVxuXG4gIHB1YmxpYyBhZGRMaW5rT3B0aW9uc0ltcGwocHVibGljT25seTogYm9vbGVhbiwgLi4ub3B0aW9uczogQXJyYXk8c3RyaW5nIHwgc3RyaW5nW10+KSB7XG4gICAgZm9yIChjb25zdCB2YWx1ZSBvZiBvcHRpb25zLmZsYXQoKSlcbiAgICAgIHRoaXMuX2xpbmtPcHRpb25zLmFkZCh2YWx1ZSwgcHVibGljT25seSk7XG4gIH1cblxuICBwdWJsaWMgZ2V0TGlicmFyaWVzKCkge1xuICAgIHJldHVybiB0aGlzLl9saWJyYXJpZXMuZ2V0QWxsVmFsdWVzKClcbiAgfVxuXG4gIHB1YmxpYyBnZXRQdWJsaWNMaWJyYXJpZXMoKSB7XG4gICAgcmV0dXJuIHRoaXMuX2xpYnJhcmllcy5nZXRQdWJsaWNWYWx1ZXMoKTtcbiAgfVxuXG4gIHB1YmxpYyBhZGRMaWJyYXJpZXMoLi4ubGlicmFyaWVzOiBQb3N0VGFyZ2V0W10pIHtcbiAgICB0aGlzLmFkZExpYnJhcmllc0ltcGwoZmFsc2UsIC4uLmxpYnJhcmllcyk7XG4gIH1cblxuICBwdWJsaWMgYWRkUHVibGljTGlicmFyaWVzKC4uLmxpYnJhcmllczogUG9zdFRhcmdldFtdKSB7XG4gICAgdGhpcy5hZGRMaWJyYXJpZXNJbXBsKHRydWUsIC4uLmxpYnJhcmllcyk7XG4gIH1cblxuICBwdWJsaWMgYWRkTGlicmFyaWVzSW1wbChwdWJsaWNPbmx5OiBib29sZWFuLCAuLi5saWJyYXJpZXM6IFBvc3RUYXJnZXRbXSkge1xuICAgIGZvciAoY29uc3QgaXRlciBvZiBsaWJyYXJpZXMuZmxhdCgpKVxuICAgICAgdGhpcy5fbGlicmFyaWVzLmFkZChUYXJnZXROYW1lLmNyZWF0ZShpdGVyLnRhcmdldE5hbWUpLCBwdWJsaWNPbmx5KTtcbiAgfVxuXG4gIHB1YmxpYyBnZXRIZWFkZXJzKCk6IFNvdXJjZUZpbGVbXSB7XG4gICAgcmV0dXJuIHRoaXMuZ2V0U291cmNlRmlsZXMoKS5maWx0ZXIoaSA9PiBpLkhFQURFUl9GSUxFX09OTFkpO1xuICB9XG5cbiAgcHVibGljIGdldEFsbFNvdXJjZXMoKSB7XG4gICAgcmV0dXJuIHRoaXMuX3NvdXJjZXM7XG4gIH1cblxuICBwdWJsaWMgZ2V0U291cmNlRmlsZXMoKTogU291cmNlRmlsZVtdIHtcbiAgICByZXR1cm4gdGhpcy5fc291cmNlcy5maWx0ZXIoaSA9PiBpIGluc3RhbmNlb2YgU291cmNlRmlsZSk7XG4gIH1cblxuICBwdWJsaWMgZ2V0VGFyZ2V0T2JqZWN0cygpOiBUYXJnZXRPYmplY3RzW10ge1xuICAgIHJldHVybiB0aGlzLl9zb3VyY2VzLmZpbHRlcihpID0+IGkgaW5zdGFuY2VvZiBUYXJnZXRPYmplY3RzKTtcbiAgfVxuXG4gIHB1YmxpYyBhZGRTb3VyY2Uoc291cmNlOiBUYXJnZXRPYmplY3RzIHwgU291cmNlRmlsZSkge1xuICAgIHRoaXMuX3NvdXJjZXMucHVzaChzb3VyY2UpO1xuICB9XG5cbiAgcHVibGljIGdldCBwcmVCdWlsZExpc3QoKSB7XG4gICAgcmV0dXJuIHRoaXMuX3ByZUJ1aWxkTGlzdDtcbiAgfVxuXG4gIHB1YmxpYyBhZGRQcmVCdWlsZChjb21tYW5kOiBzdHJpbmcgfCBUYXJnZXRGaWxlLCBhcmdzOiBBcnJheTxzdHJpbmcgfCBUYXJnZXRGaWxlPikge1xuICAgIHRoaXMuX3ByZUJ1aWxkTGlzdC5wdXNoKHtjb21tYW5kLCBhcmdzfSk7XG4gIH1cblxuICBwdWJsaWMgZ2V0IHBvc3RCdWlsZExpc3QoKSB7XG4gICAgcmV0dXJuIHRoaXMuX3Bvc3RCdWlsZExpc3Q7XG4gIH1cblxuICBwdWJsaWMgYWRkUG9zdEJ1aWxkKGNvbW1hbmQ6IHN0cmluZyB8IFRhcmdldEZpbGUsIGFyZ3M6IEFycmF5PHN0cmluZyB8IFRhcmdldEZpbGU+KSB7XG4gICAgdGhpcy5fcG9zdEJ1aWxkTGlzdC5wdXNoKHtjb21tYW5kLCBhcmdzfSk7XG4gIH1cblxuICBwdWJsaWMgZ2V0IGxhbmd1YWdlKCk6IHN0cmluZyB7XG4gICAgcmV0dXJuIHRoaXMuX2xhbmd1YWdlO1xuICB9XG5cbiAgcHVibGljIHNldCBsYW5ndWFnZSh2YWx1ZTogc3RyaW5nKSB7XG4gICAgdGhpcy5fbGFuZ3VhZ2UgPSB2YWx1ZTtcbiAgfVxuXG4gIHB1YmxpYyBnZXQgY29tcGlsZXJQYXRoKCk6IHN0cmluZyB7XG4gICAgcmV0dXJuIHRoaXMuX2NvbXBpbGVyUGF0aDtcbiAgfVxuXG4gIHB1YmxpYyBzZXQgY29tcGlsZXJQYXRoKHZhbHVlOiBzdHJpbmcpIHtcbiAgICB0aGlzLl9jb21waWxlclBhdGggPSB2YWx1ZTtcbiAgfVxuXG4gIHB1YmxpYyBnZXQgY29tcGlsZXJGbGFncygpOiBzdHJpbmdbXSB7XG4gICAgcmV0dXJuIHRoaXMuX2NvbXBpbGVyRmxhZ3M7XG4gIH1cblxuICBwdWJsaWMgc2V0IGNvbXBpbGVyRmxhZ3ModmFsdWU6IHN0cmluZ1tdKSB7XG4gICAgdGhpcy5fY29tcGlsZXJGbGFncyA9IHZhbHVlO1xuICB9XG5cbiAgcHVibGljIHBvc3RVcGRhdGUodGFyZ2V0OiBCYXNlVGFyZ2V0KSB7XG4gICAgdGhpcy5faW5jbHVkZXMgPSB0aGlzLl9pbmNsdWRlcy5jb25jYXQodGFyZ2V0Ll9pbmNsdWRlcyk7XG4gICAgdGhpcy5fZGVmaW5pdGlvbnMgPSB0aGlzLl9kZWZpbml0aW9ucy5jb25jYXQodGFyZ2V0Ll9kZWZpbml0aW9ucyk7XG4gICAgdGhpcy5fY29tcGlsZU9wdGlvbnMgPSB0aGlzLl9jb21waWxlT3B0aW9ucy5jb25jYXQodGFyZ2V0Ll9jb21waWxlT3B0aW9ucyk7XG4gICAgdGhpcy5fbGlua09wdGlvbnMgPSB0aGlzLl9saW5rT3B0aW9ucy5jb25jYXQodGFyZ2V0Ll9saW5rT3B0aW9ucyk7XG4gICAgdGhpcy5fbGlicmFyaWVzID0gdGhpcy5fbGlicmFyaWVzLmNvbmNhdCh0YXJnZXQuX2xpYnJhcmllcyk7XG4gICAgdGhpcy5fc291cmNlcy5wdXNoKC4uLnRhcmdldC5fc291cmNlcyk7XG4gICAgdGhpcy5fcHJlQnVpbGRMaXN0LnB1c2goLi4udGFyZ2V0Ll9wcmVCdWlsZExpc3QpO1xuICAgIHRoaXMuX3Bvc3RCdWlsZExpc3QucHVzaCguLi50YXJnZXQuX3Bvc3RCdWlsZExpc3QpO1xuICB9XG5cbiAgcHJvdGVjdGVkIHB1dEZyb21KU09OKGpzb246IGFueSkge1xuICAgIHRoaXMuX2luY2x1ZGVzID0gVGFyZ2V0RWxlbWVudHMuZnJvbUpTT048RGlyUGF0aCB8IFRhcmdldEluY2x1ZGVzPihqc29uLmluY2x1ZGVzKTtcbiAgICB0aGlzLl9kZWZpbml0aW9ucyA9IFRhcmdldEVsZW1lbnRzLmZyb21KU09OPHN0cmluZz4oanNvbi5kZWZpbml0aW9ucyk7XG4gICAgdGhpcy5fY29tcGlsZU9wdGlvbnMgPSBUYXJnZXRFbGVtZW50cy5mcm9tSlNPTjxzdHJpbmcgfCBzdHJpbmdbXT4oanNvbi5jb21waWxlT3B0aW9ucyk7XG4gICAgdGhpcy5fbGlua09wdGlvbnMgPSBUYXJnZXRFbGVtZW50cy5mcm9tSlNPTjxzdHJpbmcgfCBzdHJpbmdbXT4oanNvbi5saW5rT3B0aW9ucyk7XG4gICAgdGhpcy5fbGlicmFyaWVzID0gVGFyZ2V0RWxlbWVudHMuZnJvbUpTT048VGFyZ2V0TmFtZT4oanNvbi5saWJyYXJpZXMpO1xuICAgIHRoaXMuX3NvdXJjZXMgPSBTaW1wbGVPYmplY3QuZnJvbUpTT04oanNvbi5zb3VyY2VzKTtcbiAgICB0aGlzLl9wcmVCdWlsZExpc3QgPSBTaW1wbGVPYmplY3QuZnJvbUpTT04oanNvbi5wcmVCdWlsZExpc3QpO1xuICAgIHRoaXMuX3Bvc3RCdWlsZExpc3QgPSBTaW1wbGVPYmplY3QuZnJvbUpTT04oanNvbi5wb3N0QnVpbGRMaXN0KTtcbiAgICB0aGlzLl9sYW5ndWFnZSA9IFNpbXBsZU9iamVjdC5mcm9tSlNPTihqc29uLmxhbmd1YWdlKTtcbiAgICB0aGlzLl9jb21waWxlclBhdGggPSBTaW1wbGVPYmplY3QuZnJvbUpTT04oanNvbi5jb21waWxlclBhdGgpO1xuICAgIHRoaXMuX2NvbXBpbGVyRmxhZ3MgPSBTaW1wbGVPYmplY3QuZnJvbUpTT04oanNvbi5jb21waWxlckZsYWdzKTtcbiAgfVxuXG4gIHByb3RlY3RlZCBjb3B5VG9KU09OKGpzb246IGFueSkge1xuICAgIGpzb24ubmFtZSA9IHRoaXMuX25hbWU7XG4gICAganNvbi5pbmNsdWRlcyA9IHRoaXMuX2luY2x1ZGVzLnRvSlNPTigpO1xuICAgIGpzb24uZGVmaW5pdGlvbnMgPSB0aGlzLl9kZWZpbml0aW9ucy50b0pTT04oKTtcbiAgICBqc29uLmNvbXBpbGVPcHRpb25zID0gdGhpcy5fY29tcGlsZU9wdGlvbnMudG9KU09OKCk7XG4gICAganNvbi5saW5rT3B0aW9ucyA9IHRoaXMuX2xpbmtPcHRpb25zLnRvSlNPTigpO1xuICAgIGpzb24ubGlicmFyaWVzID0gdGhpcy5fbGlicmFyaWVzLnRvSlNPTigpO1xuICAgIGpzb24uc291cmNlcyA9IFNpbXBsZU9iamVjdC50b0pTT04odGhpcy5fc291cmNlcyk7XG4gICAganNvbi5wcmVCdWlsZExpc3QgPSBTaW1wbGVPYmplY3QudG9KU09OKHRoaXMuX3ByZUJ1aWxkTGlzdCk7XG4gICAganNvbi5wb3N0QnVpbGRMaXN0ID0gU2ltcGxlT2JqZWN0LnRvSlNPTih0aGlzLl9wb3N0QnVpbGRMaXN0KTtcbiAgICBqc29uLmxhbmd1YWdlID0gdGhpcy5fbGFuZ3VhZ2U7XG4gICAganNvbi5jb21waWxlclBhdGggPSB0aGlzLl9jb21waWxlclBhdGg7XG4gICAganNvbi5jb21waWxlckZsYWdzID0gdGhpcy5fY29tcGlsZXJGbGFncztcbiAgfVxufTtcblxuZXhwb3J0IGNsYXNzIFBvc3RUYXJnZXQgZXh0ZW5kcyBCYXNlVGFyZ2V0IHtcbiAgcHJpdmF0ZSBfcHJlZml4Pzogc3RyaW5nO1xuICBwcml2YXRlIF9vdXRwdXROYW1lPzogc3RyaW5nO1xuICBwcml2YXRlIF9zdWZmaXg/OiBzdHJpbmc7XG4gIHByaXZhdGUgX3Bvc2l0aW9uSW5kZXBlbmRlbnRDb2RlPzogYm9vbGVhbjtcblxuICBwcml2YXRlIGNvbnN0cnVjdG9yKG5hbWU6IHN0cmluZykge1xuICAgIHN1cGVyKG5hbWUpO1xuICB9XG5cbiAgcHVibGljIHN0YXRpYyBjcmVhdGUobmFtZTogc3RyaW5nKSB7XG4gICAgcmV0dXJuIE9iamVjdC5zZWFsKG5ldyBQb3N0VGFyZ2V0KG5hbWUpKTtcbiAgfVxuXG4gIHB1YmxpYyBnZXQgcHJlZml4KCkge1xuICAgIHJldHVybiB0aGlzLl9wcmVmaXg7XG4gIH1cblxuICBwdWJsaWMgc2V0UHJlZml4KHZhbHVlOiBzdHJpbmcpIHtcbiAgICB0aGlzLl9wcmVmaXggPSB2YWx1ZTtcbiAgfVxuXG4gIHB1YmxpYyBnZXQgb3V0cHV0TmFtZSgpIHtcbiAgICByZXR1cm4gdGhpcy5fb3V0cHV0TmFtZTtcbiAgfVxuXG4gIHB1YmxpYyBzZXRPdXRwdXROYW1lKHZhbHVlOiBhbnkpIHtcbiAgICB0aGlzLl9vdXRwdXROYW1lID0gdmFsdWU7XG4gIH1cblxuICBwdWJsaWMgZ2V0IHN1ZmZpeCgpIHtcbiAgICByZXR1cm4gdGhpcy5fc3VmZml4O1xuICB9XG5cbiAgcHVibGljIHNldFN1ZmZpeCh2YWx1ZTogc3RyaW5nKSB7XG4gICAgdGhpcy5fc3VmZml4ID0gdmFsdWU7XG4gIH1cblxuICBwdWJsaWMgZ2V0IHBvc2l0aW9uSW5kZXBlbmRlbnRDb2RlKCkge1xuICAgIHJldHVybiB0aGlzLl9wb3NpdGlvbkluZGVwZW5kZW50Q29kZTtcbiAgfVxuXG4gIHB1YmxpYyBzZXRQb3NpdGlvbkluZGVwZW5kZW50Q29kZSh2YWx1ZTogYm9vbGVhbikge1xuICAgIHRoaXMuX3Bvc2l0aW9uSW5kZXBlbmRlbnRDb2RlID0gdmFsdWU7XG4gIH1cblxuICBwdWJsaWMgZ2V0IENPTVBJTEVfT1BUSU9OUygpIHtcbiAgICByZXR1cm4gdGhpcy5fY29tcGlsZU9wdGlvbnM7XG4gIH1cblxuICBwdWJsaWMgZ2V0IExJTktfT1BUSU9OUygpIHtcbiAgICByZXR1cm4gdGhpcy5fbGlua09wdGlvbnM7XG4gIH1cblxuICBwdWJsaWMgZ2V0IExJQlJBUklFUygpIHtcbiAgICByZXR1cm4gdGhpcy5fbGlicmFyaWVzO1xuICB9XG5cbiAgcHVibGljIGdldCBTT1VSQ0VTKCkge1xuICAgIHJldHVybiB0aGlzLl9zb3VyY2VzO1xuICB9XG5cbiAgcHVibGljIHN0YXRpYyBmcm9tSlNPTihqc29uOiBhbnkpOiBQb3N0VGFyZ2V0IHtcbiAgICBjb25zdCB0YXJnZXQgPSBuZXcgUG9zdFRhcmdldChqc29uLm5hbWUpO1xuXG4gICAgdGFyZ2V0LnB1dEZyb21KU09OKGpzb24pO1xuXG4gICAgaWYgKGpzb24ucHJlZml4ICE9PSB1bmRlZmluZWQpXG4gICAgICB0YXJnZXQuX3ByZWZpeCA9IGpzb24ucHJlZml4O1xuXG4gICAgaWYgKGpzb24ub3V0cHV0TmFtZSAhPT0gdW5kZWZpbmVkKVxuICAgICAgdGFyZ2V0Ll9vdXRwdXROYW1lID0ganNvbi5vdXRwdXROYW1lO1xuXG4gICAgaWYgKGpzb24uc3VmZml4ICE9PSB1bmRlZmluZWQpXG4gICAgICB0YXJnZXQuX3N1ZmZpeCA9IGpzb24uc3VmZml4O1xuXG4gICAgaWYgKGpzb24ucG9zaXRpb25JbmRlcGVuZGVudENvZGUgIT09IHVuZGVmaW5lZClcbiAgICAgIHRhcmdldC5fcG9zaXRpb25JbmRlcGVuZGVudENvZGUgPSBqc29uLnBvc2l0aW9uSW5kZXBlbmRlbnRDb2RlO1xuXG4gICAgcmV0dXJuIHRhcmdldDtcbiAgfVxuXG4gIHB1YmxpYyB0b0pTT04oKTogU2ltcGxlT2JqZWN0IHtcbiAgICBjb25zdCByZXN1bHQ6IFNpbXBsZU9iamVjdCA9IHtcbiAgICAgIHR5cGU6IFBvc3RUYXJnZXQubmFtZVxuICAgIH07XG5cbiAgICBzdXBlci5jb3B5VG9KU09OKHJlc3VsdCk7XG5cbiAgICBpZiAodGhpcy5fcHJlZml4ICE9PSB1bmRlZmluZWQpXG4gICAgICByZXN1bHQucHJlZml4ID0gdGhpcy5fcHJlZml4O1xuXG4gICAgaWYgKHRoaXMuX291dHB1dE5hbWUgIT09IHVuZGVmaW5lZClcbiAgICAgIHJlc3VsdC5vdXRwdXROYW1lID0gdGhpcy5fb3V0cHV0TmFtZTtcblxuICAgIGlmICh0aGlzLl9zdWZmaXggIT09IHVuZGVmaW5lZClcbiAgICAgIHJlc3VsdC5zdWZmaXggPSB0aGlzLl9zdWZmaXg7XG5cbiAgICBpZiAodGhpcy5fcG9zaXRpb25JbmRlcGVuZGVudENvZGUgIT09IHVuZGVmaW5lZClcbiAgICAgIHJlc3VsdC5wb3NpdGlvbkluZGVwZW5kZW50Q29kZSA9IHRoaXMuX3Bvc2l0aW9uSW5kZXBlbmRlbnRDb2RlO1xuXG4gICAgcmV0dXJuIHJlc3VsdDtcbiAgfVxufTtcblxuZXhwb3J0IGFic3RyYWN0IGNsYXNzIE1haW5UYXJnZXQgZXh0ZW5kcyBCYXNlVGFyZ2V0IHtcbiAgcHJpdmF0ZSBfc291cmNlRGlyOiBMb2NhdG9yO1xuICBwcml2YXRlIF9iaW5hcnlEaXI6IExvY2F0b3I7XG4gIHByaXZhdGUgX3ByZWZpeCA9IFwiXCI7XG4gIHByaXZhdGUgX3N1ZmZpeCA9IFwiXCI7XG4gIHByaXZhdGUgX291dHB1dE5hbWU6IHN0cmluZztcbiAgcHJpdmF0ZSBfcG9zaXRpb25JbmRlcGVuZGVudENvZGUgPSBmYWxzZTtcblxuICBwcm90ZWN0ZWQgY29uc3RydWN0b3IobmFtZTogc3RyaW5nLCBzb3VyY2VEaXI6IExvY2F0b3IsIGJpbmFyeURpcjogTG9jYXRvcikge1xuICAgIHN1cGVyKG5hbWUpO1xuXG4gICAgdGhpcy5fc291cmNlRGlyID0gc291cmNlRGlyO1xuICAgIHRoaXMuX2JpbmFyeURpciA9IGJpbmFyeURpcjtcbiAgICB0aGlzLl9vdXRwdXROYW1lID0gbmFtZTtcbiAgfVxuXG4gIHB1YmxpYyBnZXQgaXNPYmplY3RMaWJyYXJ5KCk6IGJvb2xlYW4ge1xuICAgIHJldHVybiBmYWxzZTtcbiAgfVxuXG4gIHB1YmxpYyBnZXQgaXNTdGF0aWNMaWJyYXJ5KCk6IGJvb2xlYW4ge1xuICAgIHJldHVybiBmYWxzZTtcbiAgfVxuXG4gIHB1YmxpYyBnZXQgaXNTaGFyZWRMaWJyYXJ5KCk6IGJvb2xlYW4ge1xuICAgIHJldHVybiBmYWxzZTtcbiAgfVxuXG4gIHB1YmxpYyBnZXQgaXNFeGVjdXRhYmxlKCk6IGJvb2xlYW4ge1xuICAgIHJldHVybiBmYWxzZTtcbiAgfVxuXG4gIHB1YmxpYyBnZXQgc291cmNlRGlyKCkge1xuICAgIHJldHVybiB0aGlzLl9zb3VyY2VEaXI7XG4gIH1cblxuICBwdWJsaWMgZ2V0IGJpbmFyeURpcigpIHtcbiAgICByZXR1cm4gdGhpcy5fYmluYXJ5RGlyO1xuICB9XG5cbiAgcHVibGljIGdldEZpbGVEaXIoKSB7XG4gICAgcmV0dXJuIHRoaXMuX2JpbmFyeURpcjtcbiAgfVxuXG4gIHB1YmxpYyBnZXRGaWxlTmFtZSgpIHtcbiAgICByZXR1cm4gdGhpcy5wcmVmaXggKyB0aGlzLm91dHB1dE5hbWUgKyB0aGlzLnN1ZmZpeDtcbiAgfVxuXG4gIHB1YmxpYyBnZXRGaWxlKCkge1xuICAgIHJldHVybiB0aGlzLl9iaW5hcnlEaXIuam9pbih0aGlzLmdldEZpbGVOYW1lKCkpO1xuICB9XG5cbiAgcHVibGljIGdldCBwcmVmaXgoKSB7XG4gICAgcmV0dXJuIHRoaXMuX3ByZWZpeDtcbiAgfVxuXG4gIHB1YmxpYyBzZXRQcmVmaXgodmFsdWU6IHN0cmluZykge1xuICAgIHRoaXMuX3ByZWZpeCA9IHZhbHVlO1xuICB9XG5cbiAgcHVibGljIGdldCBzdWZmaXgoKSB7XG4gICAgcmV0dXJuIHRoaXMuX3N1ZmZpeDtcbiAgfVxuXG4gIHB1YmxpYyBzZXRTdWZmaXgodmFsdWU6IGFueSkge1xuICAgIHRoaXMuX3N1ZmZpeCA9IHZhbHVlO1xuICB9XG5cbiAgcHVibGljIGdldCBvdXRwdXROYW1lKCkge1xuICAgIHJldHVybiB0aGlzLl9vdXRwdXROYW1lO1xuICB9XG5cbiAgcHVibGljIHNldE91dHB1dE5hbWUodmFsdWU6IGFueSkge1xuICAgIHRoaXMuX291dHB1dE5hbWUgPSB2YWx1ZTtcbiAgfVxuXG4gIHB1YmxpYyBnZXQgcG9zaXRpb25JbmRlcGVuZGVudENvZGUoKSB7XG4gICAgcmV0dXJuIHRoaXMuX3Bvc2l0aW9uSW5kZXBlbmRlbnRDb2RlO1xuICB9XG5cbiAgcHVibGljIHNldFBvc2l0aW9uSW5kZXBlbmRlbnRDb2RlKHZhbHVlOiBib29sZWFuKSB7XG4gICAgdGhpcy5fcG9zaXRpb25JbmRlcGVuZGVudENvZGUgPSB2YWx1ZTtcbiAgfVxuXG4gIHB1YmxpYyBwb3N0VXBkYXRlKHRhcmdldDogUG9zdFRhcmdldCkge1xuICAgIHN1cGVyLnBvc3RVcGRhdGUodGFyZ2V0KTtcblxuICAgIGlmICh0YXJnZXQucHJlZml4ICE9PSB1bmRlZmluZWQpXG4gICAgICB0aGlzLl9wcmVmaXggPSB0YXJnZXQucHJlZml4O1xuICAgIGlmICh0YXJnZXQuc3VmZml4ICE9PSB1bmRlZmluZWQpXG4gICAgICB0aGlzLl9zdWZmaXggPSB0YXJnZXQuc3VmZml4O1xuICAgIGlmICh0YXJnZXQub3V0cHV0TmFtZSAhPT0gdW5kZWZpbmVkKVxuICAgICAgdGhpcy5fb3V0cHV0TmFtZSA9IHRhcmdldC5vdXRwdXROYW1lO1xuICAgIGlmICh0YXJnZXQucG9zaXRpb25JbmRlcGVuZGVudENvZGUgIT09IHVuZGVmaW5lZClcbiAgICAgIHRoaXMuX3Bvc2l0aW9uSW5kZXBlbmRlbnRDb2RlID0gdGFyZ2V0LnBvc2l0aW9uSW5kZXBlbmRlbnRDb2RlO1xuICB9XG5cbiAgcHJvdGVjdGVkIHB1dEZyb21KU09OKGpzb246IGFueSkge1xuICAgIHN1cGVyLnB1dEZyb21KU09OKGpzb24pO1xuXG4gICAgdGhpcy5fcHJlZml4ID0ganNvbi5wcmVmaXg7XG4gICAgdGhpcy5fb3V0cHV0TmFtZSA9IGpzb24ub3V0cHV0TmFtZTtcbiAgICB0aGlzLl9zdWZmaXggPSBqc29uLnN1ZmZpeDtcbiAgICB0aGlzLl9wb3NpdGlvbkluZGVwZW5kZW50Q29kZSA9IGpzb24ucG9zaXRpb25JbmRlcGVuZGVudENvZGU7XG4gIH1cblxuICBwcm90ZWN0ZWQgY29weVRvSlNPTihqc29uOiBhbnkpIHtcbiAgICBzdXBlci5jb3B5VG9KU09OKGpzb24pO1xuXG4gICAganNvbi5zb3VyY2VEaXIgPSB0aGlzLl9zb3VyY2VEaXIudG9VUkxTdHJpbmcoKTtcbiAgICBqc29uLmJpbmFyeURpciA9IHRoaXMuX2JpbmFyeURpci50b1VSTFN0cmluZygpO1xuICAgIGpzb24ucHJlZml4ID0gdGhpcy5fcHJlZml4O1xuICAgIGpzb24uc3VmZml4ID0gdGhpcy5fc3VmZml4O1xuICAgIGpzb24ub3V0cHV0TmFtZSA9IHRoaXMuX291dHB1dE5hbWU7XG4gICAganNvbi5wb3NpdGlvbkluZGVwZW5kZW50Q29kZSA9IHRoaXMuX3Bvc2l0aW9uSW5kZXBlbmRlbnRDb2RlO1xuXG4gICAgcmV0dXJuIGpzb247XG4gIH1cbn07XG5cbmV4cG9ydCBjbGFzcyBPYmplY3RMaWJyYXJ5IGV4dGVuZHMgTWFpblRhcmdldCB7XG4gIHB1YmxpYyBjb25zdHJ1Y3RvcihuYW1lOiBzdHJpbmcsIHNvdXJjZURpcjogTG9jYXRvciwgYmluYXJ5RGlyOiBMb2NhdG9yKSB7XG4gICAgc3VwZXIobmFtZSwgc291cmNlRGlyLCBiaW5hcnlEaXIpO1xuICB9XG5cbiAgcHVibGljIGdldCBpc09iamVjdExpYnJhcnkoKTogYm9vbGVhbiB7XG4gICAgcmV0dXJuIHRydWU7XG4gIH1cblxuICBwdWJsaWMgc3RhdGljIGZyb21KU09OKGpzb246IGFueSk6IE9iamVjdExpYnJhcnkge1xuICAgIGNvbnN0IHRhcmdldCA9IG5ldyBPYmplY3RMaWJyYXJ5KGpzb24ubmFtZSwgTG9jYXRvci5jcmVhdGUoanNvbi5zb3VyY2VEaXIpLCBMb2NhdG9yLmNyZWF0ZShqc29uLmJpbmFyeURpcikpO1xuICAgIHRhcmdldC5wdXRGcm9tSlNPTihqc29uKTtcbiAgICByZXR1cm4gdGFyZ2V0O1xuICB9XG5cbiAgcHVibGljIHRvSlNPTigpOiBTaW1wbGVPYmplY3Qge1xuICAgIGNvbnN0IHJlc3VsdDogU2ltcGxlT2JqZWN0ID0ge1xuICAgICAgdHlwZTogT2JqZWN0TGlicmFyeS5uYW1lLFxuICAgIH07XG4gICAgc3VwZXIuY29weVRvSlNPTihyZXN1bHQpO1xuICAgIHJldHVybiByZXN1bHQ7XG4gIH1cbn07XG5cbmV4cG9ydCBjbGFzcyBTdGF0aWNMaWJyYXJ5IGV4dGVuZHMgTWFpblRhcmdldCB7XG4gIHB1YmxpYyBjb25zdHJ1Y3RvcihuYW1lOiBzdHJpbmcsIHNvdXJjZURpcjogTG9jYXRvciwgYmluYXJ5RGlyOiBMb2NhdG9yKSB7XG4gICAgc3VwZXIobmFtZSwgc291cmNlRGlyLCBiaW5hcnlEaXIpO1xuICB9XG5cbiAgcHVibGljIGdldCBpc1N0YXRpY0xpYnJhcnkoKTogYm9vbGVhbiB7XG4gICAgcmV0dXJuIHRydWU7XG4gIH1cblxuICBwdWJsaWMgc3RhdGljIGZyb21KU09OKGpzb246IGFueSk6IFN0YXRpY0xpYnJhcnkge1xuICAgIGNvbnN0IHRhcmdldCA9IG5ldyBTdGF0aWNMaWJyYXJ5KGpzb24ubmFtZSwgTG9jYXRvci5jcmVhdGUoanNvbi5zb3VyY2VEaXIpLCBMb2NhdG9yLmNyZWF0ZShqc29uLmJpbmFyeURpcikpO1xuICAgIHRhcmdldC5wdXRGcm9tSlNPTihqc29uKTtcbiAgICByZXR1cm4gdGFyZ2V0O1xuICB9XG5cbiAgcHVibGljIHRvSlNPTigpOiBTaW1wbGVPYmplY3Qge1xuICAgIGNvbnN0IHJlc3VsdDogU2ltcGxlT2JqZWN0ID0ge1xuICAgICAgdHlwZTogU3RhdGljTGlicmFyeS5uYW1lLFxuICAgIH07XG4gICAgc3VwZXIuY29weVRvSlNPTihyZXN1bHQpO1xuICAgIHJldHVybiByZXN1bHQ7XG4gIH1cbn07XG5cbmV4cG9ydCBjbGFzcyBTaGFyZWRMaWJyYXJ5IGV4dGVuZHMgTWFpblRhcmdldCB7XG4gIHB1YmxpYyBjb25zdHJ1Y3RvcihuYW1lOiBzdHJpbmcsIHNvdXJjZURpcjogTG9jYXRvciwgYmluYXJ5RGlyOiBMb2NhdG9yKSB7XG4gICAgc3VwZXIobmFtZSwgc291cmNlRGlyLCBiaW5hcnlEaXIpO1xuICB9XG5cbiAgcHVibGljIGdldCBpc1NoYXJlZExpYnJhcnkoKTogYm9vbGVhbiB7XG4gICAgcmV0dXJuIHRydWU7XG4gIH1cblxuICBwdWJsaWMgc3RhdGljIGZyb21KU09OKGpzb246IGFueSk6IFNoYXJlZExpYnJhcnkge1xuICAgIGNvbnN0IHRhcmdldCA9IG5ldyBTaGFyZWRMaWJyYXJ5KGpzb24ubmFtZSwgTG9jYXRvci5jcmVhdGUoanNvbi5zb3VyY2VEaXIpLCBMb2NhdG9yLmNyZWF0ZShqc29uLmJpbmFyeURpcikpO1xuICAgIHRhcmdldC5wdXRGcm9tSlNPTihqc29uKTtcbiAgICByZXR1cm4gdGFyZ2V0O1xuICB9XG5cbiAgcHVibGljIHRvSlNPTigpOiBTaW1wbGVPYmplY3Qge1xuICAgIGNvbnN0IHJlc3VsdDogU2ltcGxlT2JqZWN0ID0ge1xuICAgICAgdHlwZTogU2hhcmVkTGlicmFyeS5uYW1lLFxuICAgIH07XG4gICAgc3VwZXIuY29weVRvSlNPTihyZXN1bHQpO1xuICAgIHJldHVybiByZXN1bHQ7XG4gIH1cbn07XG5cbmV4cG9ydCBjbGFzcyBFeGVjdXRhYmxlIGV4dGVuZHMgTWFpblRhcmdldCB7XG4gIHB1YmxpYyBjb25zdHJ1Y3RvcihuYW1lOiBzdHJpbmcsIHNvdXJjZURpcjogTG9jYXRvciwgYmluYXJ5RGlyOiBMb2NhdG9yKSB7XG4gICAgc3VwZXIobmFtZSwgc291cmNlRGlyLCBiaW5hcnlEaXIpO1xuICB9XG5cbiAgcHVibGljIGdldCBpc0V4ZWN1dGFibGUoKTogYm9vbGVhbiB7XG4gICAgcmV0dXJuIHRydWU7XG4gIH1cblxuICBwdWJsaWMgc3RhdGljIGZyb21KU09OKGpzb246IGFueSk6IEV4ZWN1dGFibGUge1xuICAgIGNvbnN0IHRhcmdldCA9IG5ldyBFeGVjdXRhYmxlKGpzb24ubmFtZSwgTG9jYXRvci5jcmVhdGUoanNvbi5zb3VyY2VEaXIpLCBMb2NhdG9yLmNyZWF0ZShqc29uLmJpbmFyeURpcikpO1xuICAgIHRhcmdldC5wdXRGcm9tSlNPTihqc29uKTtcbiAgICByZXR1cm4gdGFyZ2V0O1xuICB9XG5cbiAgcHVibGljIHRvSlNPTigpOiBTaW1wbGVPYmplY3Qge1xuICAgIGNvbnN0IHJlc3VsdDogU2ltcGxlT2JqZWN0ID0ge1xuICAgICAgdHlwZTogRXhlY3V0YWJsZS5uYW1lLFxuICAgIH07XG4gICAgc3VwZXIuY29weVRvSlNPTihyZXN1bHQpO1xuICAgIHJldHVybiByZXN1bHQ7XG4gIH1cbn07XG4iLCIvKlxuICogTUlUIExpY2Vuc2VcbiAqXG4gKiBDb3B5cmlnaHQgKGMpIDIwMjUgIFl1cmlpIFlha3ViaW4gKHl1cmlpLnlha3ViaW5AZ21haWwuY29tKVxuICpcbiAqIFBlcm1pc3Npb24gaXMgZ3JhbnRlZCB0byB1c2UsIGNvcHksIG1vZGlmeSwgYW5kIGRpc3RyaWJ1dGUgdGhpcyBzb2Z0d2FyZVxuICogdW5kZXIgdGhlIE1JVCBMaWNlbnNlLiBTZWUgTElDRU5TRSBmaWxlIGZvciBkZXRhaWxzLlxuICovXG5cbmltcG9ydCB7IFRhcmdldEluY2x1ZGVzIH1mcm9tIFwiQC9jb3JlL1RhcmdldEluY2x1ZGVzXCI7XG5pbXBvcnQgeyBUYXJnZXROYW1lIH1mcm9tIFwiQC9jb3JlL1RhcmdldE5hbWVcIjtcbmltcG9ydCB7IE1haW5UYXJnZXQgfSBmcm9tIFwiQC9jb3JlL1RhcmdldFwiO1xuaW1wb3J0IHsgTG9jYXRvciB9IGZyb20gXCJAL3V0aWxzL0xvY2F0b3JcIjtcbmltcG9ydCB7IFNpbXBsZU9iamVjdCB9IGZyb20gXCJAL2NvcmUvU2ltcGxlT2JqZWN0XCI7XG5cbmNvbnN0IEVOVFJJRVMgPSBTeW1ib2woXCJFTlRSSUVTXCIpO1xuXG5leHBvcnQgY2xhc3MgVGFyZ2V0Q29sbGVjdGlvbiB7XG4gIHByaXZhdGUgW0VOVFJJRVNdID0gbmV3IE1hcDxzdHJpbmcsIE1haW5UYXJnZXQ+O1xuXG4gIHB1YmxpYyBzdGF0aWMgY3JlYXRlKCkge1xuICAgIHJldHVybiBPYmplY3Quc2VhbChuZXcgVGFyZ2V0Q29sbGVjdGlvbik7XG4gIH1cbiAgXG4gIHB1YmxpYyBnZXQgRU5UUklFUygpIHtcbiAgICByZXR1cm4gdGhpc1tFTlRSSUVTXTtcbiAgfVxuXG4gIHB1YmxpYyB0b0pTT04oKTogU2ltcGxlT2JqZWN0IHtcbiAgICBjb25zdCByZXN1bHQ6IFNpbXBsZU9iamVjdCA9IHsgdHlwZTogVGFyZ2V0Q29sbGVjdGlvbi5uYW1lIH07XG4gICAgdGhpc1tFTlRSSUVTXS5mb3JFYWNoKCh2LCBrKSA9PiB2b2lkIChyZXN1bHRba10gPSB2KSk7XG4gICAgcmV0dXJuIHJlc3VsdDtcbiAgfVxuXG4gIHB1YmxpYyBnZXQobmFtZTogc3RyaW5nKTogTWFpblRhcmdldCB7XG4gICAgY29uc3QgcmVzdWx0ID0gdGhpc1tFTlRSSUVTXS5nZXQobmFtZSk7XG4gICAgaWYgKCFyZXN1bHQpXG4gICAgICB0aHJvdyBgVGFyZ2V0IFwiJHtuYW1lfVwiIGRvZXMgbm90IGV4aXN0YDtcbiAgICByZXR1cm4gcmVzdWx0O1xuICB9XG5cbiAgcHVibGljIHNldChuYW1lOiBzdHJpbmcsIHRhcmdldDogYW55KSB7XG4gICAgaWYgKHRoaXNbRU5UUklFU10uaGFzKG5hbWUpKVxuICAgICAgdGhyb3cgbmV3IEVycm9yKGBUYXJnZXQgXCIke25hbWV9XCIgZXhpc3RzYCk7XG4gICAgdGhpc1tFTlRSSUVTXS5zZXQobmFtZSwgdGFyZ2V0KTtcbiAgfVxuXG4gIHByaXZhdGUgX19nZXRBbGxJbmNsdWRlcyhpbmNsdWRlczogc3RyaW5nW10sIHRhcmdldFNldDogU2V0PHN0cmluZz4sIGxpc3Q6IEFycmF5PExvY2F0b3IgfCBUYXJnZXRJbmNsdWRlcz4gfCBBcnJheTxUYXJnZXROYW1lPikge1xuICAgIGZvciAoY29uc3QgaXRlciBvZiBsaXN0KSB7XG4gICAgICBpZiAoaXRlciBpbnN0YW5jZW9mIFRhcmdldEluY2x1ZGVzIHx8IGl0ZXIgaW5zdGFuY2VvZiBUYXJnZXROYW1lKSB7XG4gICAgICAgIGlmICghdGFyZ2V0U2V0LmhhcyhpdGVyLnRhcmdldE5hbWUpKSB7XG4gICAgICAgICAgdGFyZ2V0U2V0LmFkZChpdGVyLnRhcmdldE5hbWUpO1xuICAgICAgICAgIGNvbnN0IHRhcmdldCA9IHRoaXMuZ2V0KGl0ZXIudGFyZ2V0TmFtZSk7XG4gICAgICAgICAgdGhpcy5fX2dldEFsbEluY2x1ZGVzKGluY2x1ZGVzLCB0YXJnZXRTZXQsIHRhcmdldC5nZXRQdWJsaWNJbmNsdWRlcygpKTtcbiAgICAgICAgICB0aGlzLl9fZ2V0QWxsSW5jbHVkZXMoaW5jbHVkZXMsIHRhcmdldFNldCwgdGFyZ2V0LmdldFB1YmxpY0xpYnJhcmllcygpKTtcbiAgICAgICAgfVxuICAgICAgfVxuICAgICAgZWxzZSBpZiAoaXRlciBpbnN0YW5jZW9mIExvY2F0b3IpIHtcbiAgICAgICAgaWYgKCFpbmNsdWRlcy5pbmNsdWRlcyhpdGVyLnRvU3RyaW5nKCkpKVxuICAgICAgICAgIGluY2x1ZGVzLnB1c2goaXRlci50b1N0cmluZygpKTtcbiAgICAgIH1cbiAgICAgIGVsc2Uge1xuICAgICAgICB0aHJvdyBuZXcgRXJyb3IoYE5vdCBzdXBwb3J0IGluc3RhbmNlICR7aXRlcn1gKTtcbiAgICAgIH1cbiAgICB9XG4gIH1cblxuICBwdWJsaWMgYWxsSW5jbHVkZXNPZihwYXJhbXM6IHN0cmluZyB8IE1haW5UYXJnZXQpOiBzdHJpbmdbXSB7XG4gICAgY29uc3QgdGFyZ2V0ID0gKHR5cGVvZiBwYXJhbXMgPT09IFwic3RyaW5nXCIpID8gdGhpcy5nZXQocGFyYW1zKSA6IHBhcmFtcztcbiAgICBjb25zdCBpbmNsdWRlczogc3RyaW5nW10gPSBbXTtcbiAgICBjb25zdCB0YXJnZXRTZXQgPSBuZXcgU2V0KFsgdGFyZ2V0LnRhcmdldE5hbWUgXSk7XG4gICAgdGhpcy5fX2dldEFsbEluY2x1ZGVzKGluY2x1ZGVzLCB0YXJnZXRTZXQsIHRhcmdldC5nZXRJbmNsdWRlcygpKTtcbiAgICB0aGlzLl9fZ2V0QWxsSW5jbHVkZXMoaW5jbHVkZXMsIHRhcmdldFNldCwgdGFyZ2V0LmdldExpYnJhcmllcygpKTtcbiAgICByZXR1cm4gaW5jbHVkZXM7XG4gIH1cblxuICBwcml2YXRlIF9fZ2V0QWxsSGVhZGVycyhoZWFkZXJzOiBzdHJpbmdbXSwgdGFyZ2V0U2V0OiBTZXQ8c3RyaW5nPiwgbGlzdDogQXJyYXk8TG9jYXRvciB8IFRhcmdldEluY2x1ZGVzPiB8IEFycmF5PFRhcmdldE5hbWU+KSB7XG4gICAgZm9yIChjb25zdCBpdGVyIG9mIGxpc3QpIHtcbiAgICAgIGlmIChpdGVyIGluc3RhbmNlb2YgVGFyZ2V0SW5jbHVkZXMgfHwgaXRlciBpbnN0YW5jZW9mIFRhcmdldE5hbWUpIHtcbiAgICAgICAgaWYgKCF0YXJnZXRTZXQuaGFzKGl0ZXIudGFyZ2V0TmFtZSkpIHtcbiAgICAgICAgICB0YXJnZXRTZXQuYWRkKGl0ZXIudGFyZ2V0TmFtZSk7XG4gICAgICAgICAgY29uc3QgdGFyZ2V0ID0gdGhpcy5nZXQoaXRlci50YXJnZXROYW1lKTtcbiAgICAgICAgICBmb3IgKGNvbnN0IGhlYWRlciBvZiB0YXJnZXQuZ2V0SGVhZGVycygpLm1hcCgoaTogYW55KSA9PiBpLkZJTEUudG9TdHJpbmcoKSkpIHtcbiAgICAgICAgICAgIGlmICghaGVhZGVycy5pbmNsdWRlcyhoZWFkZXIudG9TdHJpbmcoKSkpXG4gICAgICAgICAgICAgIGhlYWRlcnMucHVzaChoZWFkZXIudG9TdHJpbmcoKSk7XG4gICAgICAgICAgfVxuICAgICAgICAgIHRoaXMuX19nZXRBbGxIZWFkZXJzKGhlYWRlcnMsIHRhcmdldFNldCwgdGFyZ2V0LmdldFB1YmxpY0luY2x1ZGVzKCkpO1xuICAgICAgICAgIHRoaXMuX19nZXRBbGxIZWFkZXJzKGhlYWRlcnMsIHRhcmdldFNldCwgdGFyZ2V0LmdldFB1YmxpY0xpYnJhcmllcygpKTtcbiAgICAgICAgfVxuICAgICAgfVxuICAgIH1cbiAgfVxuXG4gIHB1YmxpYyBhbGxIZWFkZXJzT2YocGFyYW1zOiBzdHJpbmcgfCBNYWluVGFyZ2V0KSB7XG4gICAgY29uc3QgdGFyZ2V0ID0gKHR5cGVvZiBwYXJhbXMgPT09IFwic3RyaW5nXCIpID8gdGhpcy5nZXQocGFyYW1zKSA6IHBhcmFtcztcbiAgICBjb25zdCBoZWFkZXJzID0gdGFyZ2V0LmdldEhlYWRlcnMoKS5tYXAoKGk6IGFueSkgPT4gaS5GSUxFLnRvU3RyaW5nKCkpO1xuICAgIGNvbnN0IHRhcmdldFNldCA9IG5ldyBTZXQoWyB0YXJnZXQudGFyZ2V0TmFtZSBdKTtcbiAgICB0aGlzLl9fZ2V0QWxsSGVhZGVycyhoZWFkZXJzLCB0YXJnZXRTZXQsIHRhcmdldC5nZXRJbmNsdWRlcygpKTtcbiAgICB0aGlzLl9fZ2V0QWxsSGVhZGVycyhoZWFkZXJzLCB0YXJnZXRTZXQsIHRhcmdldC5nZXRMaWJyYXJpZXMoKSk7XG4gICAgcmV0dXJuIGhlYWRlcnM7XG4gIH1cblxuICBwcml2YXRlIF9fZ2V0QWxsTGlicmFyaWVzKGxpYnJhcmllczogc3RyaW5nW10sIHRhcmdldFNldDogU2V0PHN0cmluZz4sIGxpc3Q6IEFycmF5PFRhcmdldE5hbWU+KSB7XG4gICAgZm9yIChjb25zdCBpdGVyIG9mIGxpc3QpIHtcbiAgICAgIGNvbnNvbGUuYXNzZXJ0KGl0ZXIgaW5zdGFuY2VvZiBUYXJnZXROYW1lKTtcbiAgICAgIGlmICghdGFyZ2V0U2V0LmhhcyhpdGVyLnRhcmdldE5hbWUpKSB7XG4gICAgICAgIHRhcmdldFNldC5hZGQoaXRlci50YXJnZXROYW1lKTtcbiAgICAgICAgY29uc3QgdGFyZ2V0ID0gdGhpcy5nZXQoaXRlci50YXJnZXROYW1lKTtcbiAgICAgICAgbGlicmFyaWVzLnB1c2godGFyZ2V0LmdldEZpbGUoKS50b1N0cmluZygpKTtcbiAgICAgICAgdGhpcy5fX2dldEFsbExpYnJhcmllcyhsaWJyYXJpZXMsIHRhcmdldFNldCwgdGFyZ2V0LmdldFB1YmxpY0xpYnJhcmllcygpKTtcbiAgICAgIH1cbiAgICB9XG4gIH1cblxuICBwdWJsaWMgYWxsTGlicmFyaWVzT2YocGFyYW1zOiBzdHJpbmcgfCBNYWluVGFyZ2V0KSB7XG4gICAgY29uc3QgdGFyZ2V0ID0gKHR5cGVvZiBwYXJhbXMgPT09IFwic3RyaW5nXCIpID8gdGhpcy5nZXQocGFyYW1zKSA6IHBhcmFtcztcbiAgICBjb25zdCBsaWJyYXJpZXM6IHN0cmluZ1tdID0gW107XG4gICAgY29uc3QgdGFyZ2V0U2V0ID0gbmV3IFNldChbIHRhcmdldC50YXJnZXROYW1lIF0pO1xuICAgIHRoaXMuX19nZXRBbGxMaWJyYXJpZXMobGlicmFyaWVzLCB0YXJnZXRTZXQsIHRhcmdldC5nZXRMaWJyYXJpZXMoKSk7XG4gICAgcmV0dXJuIGxpYnJhcmllcztcbiAgfVxuXG4gIHByaXZhdGUgX19nZXRBbGxEZWZpbml0aW9ucyhkZWZpbml0aW9uczogc3RyaW5nW10sIHRhcmdldFNldDogU2V0PHN0cmluZz4sIGxpc3Q6IEFycmF5PHN0cmluZz4gfCBBcnJheTxUYXJnZXROYW1lPikge1xuICAgIGZvciAoY29uc3QgaXRlciBvZiBsaXN0KSB7XG4gICAgICBpZiAoaXRlciBpbnN0YW5jZW9mIFRhcmdldE5hbWUpIHtcbiAgICAgICAgaWYgKCF0YXJnZXRTZXQuaGFzKGl0ZXIudGFyZ2V0TmFtZSkpIHtcbiAgICAgICAgICB0YXJnZXRTZXQuYWRkKGl0ZXIudGFyZ2V0TmFtZSk7XG4gICAgICAgICAgY29uc3QgdGFyZ2V0ID0gdGhpcy5nZXQoaXRlci50YXJnZXROYW1lKTtcbiAgICAgICAgICB0aGlzLl9fZ2V0QWxsRGVmaW5pdGlvbnMoZGVmaW5pdGlvbnMsIHRhcmdldFNldCwgdGFyZ2V0LmdldFB1YmxpY0RlZmluaXRpb25zKCkpO1xuICAgICAgICAgIHRoaXMuX19nZXRBbGxEZWZpbml0aW9ucyhkZWZpbml0aW9ucywgdGFyZ2V0U2V0LCB0YXJnZXQuZ2V0UHVibGljTGlicmFyaWVzKCkpO1xuICAgICAgICB9XG4gICAgICB9XG4gICAgICBlbHNlIGlmICh0eXBlb2YgaXRlciA9PT0gXCJzdHJpbmdcIikge1xuICAgICAgICBpZiAoIWRlZmluaXRpb25zLmluY2x1ZGVzKGl0ZXIpKVxuICAgICAgICAgIGRlZmluaXRpb25zLnB1c2goaXRlcik7XG4gICAgICB9XG4gICAgICBlbHNlIHtcbiAgICAgICAgdGhyb3cgbmV3IEVycm9yKGBOb3Qgc3VwcG9ydCBpbnN0YW5jZSAke2l0ZXJ9YCk7XG4gICAgICB9XG4gICAgfVxuICB9XG5cbiAgcHVibGljIGFsbERlZmluaXRpb25zT2YocGFyYW1zOiBzdHJpbmcgfCBNYWluVGFyZ2V0KSB7XG4gICAgY29uc3QgdGFyZ2V0ID0gKHR5cGVvZiBwYXJhbXMgPT09IFwic3RyaW5nXCIpID8gdGhpcy5nZXQocGFyYW1zKSA6IHBhcmFtcztcbiAgICBjb25zdCBkZWZpbml0aW9uczogc3RyaW5nW10gPSBbXTtcbiAgICBjb25zdCB0YXJnZXRTZXQgPSBuZXcgU2V0KFsgdGFyZ2V0LnRhcmdldE5hbWUgXSk7XG4gICAgdGhpcy5fX2dldEFsbERlZmluaXRpb25zKGRlZmluaXRpb25zLCB0YXJnZXRTZXQsIHRhcmdldC5nZXREZWZpbml0aW9ucygpKTtcbiAgICB0aGlzLl9fZ2V0QWxsRGVmaW5pdGlvbnMoZGVmaW5pdGlvbnMsIHRhcmdldFNldCwgdGFyZ2V0LmdldFB1YmxpY0xpYnJhcmllcygpKTtcbiAgICByZXR1cm4gZGVmaW5pdGlvbnM7XG4gIH1cblxuICBwcml2YXRlIF9fZ2V0QWxsQ29tcGlsZU9wdGlvbnMob3B0aW9uczogQXJyYXk8c3RyaW5nfHN0cmluZ1tdPiwgdGFyZ2V0U2V0OiBTZXQ8c3RyaW5nPiwgbGlzdDogQXJyYXk8c3RyaW5nfHN0cmluZ1tdPiB8IEFycmF5PFRhcmdldE5hbWU+KSB7XG4gICAgZm9yIChjb25zdCBpdGVyIG9mIGxpc3QpIHtcbiAgICAgIGlmIChpdGVyIGluc3RhbmNlb2YgVGFyZ2V0TmFtZSkge1xuICAgICAgICBpZiAoIXRhcmdldFNldC5oYXMoaXRlci50YXJnZXROYW1lKSkge1xuICAgICAgICAgIHRhcmdldFNldC5hZGQoaXRlci50YXJnZXROYW1lKTtcbiAgICAgICAgICBjb25zdCB0YXJnZXQgPSB0aGlzLmdldChpdGVyLnRhcmdldE5hbWUpO1xuICAgICAgICAgIHRoaXMuX19nZXRBbGxDb21waWxlT3B0aW9ucyhvcHRpb25zLCB0YXJnZXRTZXQsIHRhcmdldC5nZXRQdWJsaWNDb21waWxlT3B0aW9ucygpKTtcbiAgICAgICAgICB0aGlzLl9fZ2V0QWxsQ29tcGlsZU9wdGlvbnMob3B0aW9ucywgdGFyZ2V0U2V0LCB0YXJnZXQuZ2V0UHVibGljTGlicmFyaWVzKCkpO1xuICAgICAgICB9XG4gICAgICB9XG4gICAgICBlbHNlIGlmICh0eXBlb2YgaXRlciA9PT0gXCJzdHJpbmdcIikge1xuICAgICAgICBpZiAoIW9wdGlvbnMuaW5jbHVkZXMoaXRlcikpXG4gICAgICAgICAgb3B0aW9ucy5wdXNoKGl0ZXIpO1xuICAgICAgfVxuICAgICAgZWxzZSBpZiAoQXJyYXkuaXNBcnJheShpdGVyKSkge1xuICAgICAgICAvLyBUT0RPOiBBZGQgY29tcGFyZSBmb3Igc2FtZSBhcnJheSBpbiBvcHRpb25zXG4gICAgICAgIG9wdGlvbnMucHVzaChpdGVyKTtcbiAgICAgIH1cbiAgICAgIGVsc2Uge1xuICAgICAgICB0aHJvdyBuZXcgRXJyb3IoYE5vdCBzdXBwb3J0IGluc3RhbmNlICR7aXRlcn1gKTtcbiAgICAgIH1cbiAgICB9XG4gIH1cblxuICBwdWJsaWMgYWxsQ29tcGlsZU9wdGlvbnNPZihwYXJhbXM6IHN0cmluZyB8IE1haW5UYXJnZXQpIHtcbiAgICBjb25zdCB0YXJnZXQgPSAodHlwZW9mIHBhcmFtcyA9PT0gXCJzdHJpbmdcIikgPyB0aGlzLmdldChwYXJhbXMpIDogcGFyYW1zO1xuICAgIGNvbnN0IG9wdGlvbnM6IHN0cmluZ1tdID0gW107XG4gICAgY29uc3QgdGFyZ2V0U2V0ID0gbmV3IFNldChbIHRhcmdldC50YXJnZXROYW1lIF0pO1xuICAgIHRoaXMuX19nZXRBbGxDb21waWxlT3B0aW9ucyhvcHRpb25zLCB0YXJnZXRTZXQsIHRhcmdldC5nZXRDb21waWxlT3B0aW9ucygpKTtcbiAgICB0aGlzLl9fZ2V0QWxsQ29tcGlsZU9wdGlvbnMob3B0aW9ucywgdGFyZ2V0U2V0LCB0YXJnZXQuZ2V0UHVibGljTGlicmFyaWVzKCkpO1xuICAgIHJldHVybiBvcHRpb25zLmZsYXQoKTtcbiAgfVxuXG4gIHByaXZhdGUgX19nZXRMaW5rT3B0aW9ucyhvcHRpb25zOiBBcnJheTxzdHJpbmd8c3RyaW5nW10+LCB0YXJnZXRTZXQ6IFNldDxzdHJpbmc+LCBsaXN0OiBBcnJheTxzdHJpbmd8c3RyaW5nW10+IHwgQXJyYXk8VGFyZ2V0TmFtZT4pIHtcbiAgICBmb3IgKGNvbnN0IGl0ZXIgb2YgbGlzdCkge1xuICAgICAgaWYgKGl0ZXIgaW5zdGFuY2VvZiBUYXJnZXROYW1lKSB7XG4gICAgICAgIGlmICghdGFyZ2V0U2V0LmhhcyhpdGVyLnRhcmdldE5hbWUpKSB7XG4gICAgICAgICAgdGFyZ2V0U2V0LmFkZChpdGVyLnRhcmdldE5hbWUpO1xuICAgICAgICAgIGNvbnN0IHRhcmdldCA9IHRoaXMuZ2V0KGl0ZXIudGFyZ2V0TmFtZSk7XG4gICAgICAgICAgdGhpcy5fX2dldExpbmtPcHRpb25zKG9wdGlvbnMsIHRhcmdldFNldCwgdGFyZ2V0LmdldFB1YmxpY0xpbmtPcHRpb25zKCkpO1xuICAgICAgICAgIHRoaXMuX19nZXRMaW5rT3B0aW9ucyhvcHRpb25zLCB0YXJnZXRTZXQsIHRhcmdldC5nZXRQdWJsaWNMaWJyYXJpZXMoKSk7XG4gICAgICAgIH1cbiAgICAgIH1cbiAgICAgIGVsc2UgaWYgKHR5cGVvZiBpdGVyID09PSBcInN0cmluZ1wiKSB7XG4gICAgICAgIGlmICghb3B0aW9ucy5pbmNsdWRlcyhpdGVyKSlcbiAgICAgICAgICBvcHRpb25zLnB1c2goaXRlcik7XG4gICAgICB9XG4gICAgICBlbHNlIGlmIChBcnJheS5pc0FycmF5KGl0ZXIpKSB7XG4gICAgICAgIC8vIFRPRE86IEFkZCBjb21wYXJlIGZvciBzYW1lIGFycmF5IGluIG9wdGlvbnNcbiAgICAgICAgb3B0aW9ucy5wdXNoKGl0ZXIpO1xuICAgICAgfVxuICAgICAgZWxzZSB7XG4gICAgICAgIHRocm93IG5ldyBFcnJvcihgTm90IHN1cHBvcnQgaW5zdGFuY2UgJHtpdGVyfWApO1xuICAgICAgfVxuICAgIH1cbiAgfVxuXG4gIHB1YmxpYyBhbGxMaW5rT3B0aW9uc09mKHBhcmFtczogc3RyaW5nIHwgTWFpblRhcmdldCkge1xuICAgIGNvbnN0IHRhcmdldCA9ICh0eXBlb2YgcGFyYW1zID09PSBcInN0cmluZ1wiKSA/IHRoaXMuZ2V0KHBhcmFtcykgOiBwYXJhbXM7XG4gICAgY29uc3Qgb3B0aW9uczogc3RyaW5nW10gPSBbXTtcbiAgICBjb25zdCB0YXJnZXRTZXQgPSBuZXcgU2V0KFsgdGFyZ2V0LnRhcmdldE5hbWUgXSk7XG4gICAgdGhpcy5fX2dldExpbmtPcHRpb25zKG9wdGlvbnMsIHRhcmdldFNldCwgdGFyZ2V0LmdldExpbmtPcHRpb25zKCkpO1xuICAgIHRoaXMuX19nZXRMaW5rT3B0aW9ucyhvcHRpb25zLCB0YXJnZXRTZXQsIHRhcmdldC5nZXRQdWJsaWNMaWJyYXJpZXMoKSk7XG4gICAgcmV0dXJuIG9wdGlvbnMuZmxhdCgpO1xuICB9XG59XG4iLCIvKlxuICogTUlUIExpY2Vuc2VcbiAqXG4gKiBDb3B5cmlnaHQgKGMpIDIwMjUgIFl1cmlpIFlha3ViaW4gKHl1cmlpLnlha3ViaW5AZ21haWwuY29tKVxuICpcbiAqIFBlcm1pc3Npb24gaXMgZ3JhbnRlZCB0byB1c2UsIGNvcHksIG1vZGlmeSwgYW5kIGRpc3RyaWJ1dGUgdGhpcyBzb2Z0d2FyZVxuICogdW5kZXIgdGhlIE1JVCBMaWNlbnNlLiBTZWUgTElDRU5TRSBmaWxlIGZvciBkZXRhaWxzLlxuICovXG5cbmltcG9ydCB7IFNpbXBsZU9iamVjdCB9IGZyb20gXCJAL2NvcmUvU2ltcGxlT2JqZWN0XCI7XG5cbmNvbnN0IE5BTUUgPSBTeW1ib2woXCJOQU1FXCIpO1xuXG5leHBvcnQgY2xhc3MgVGFyZ2V0RmlsZSB7XG4gIHByaXZhdGUgW05BTUVdOiBzdHJpbmc7XG5cbiAgcHJpdmF0ZSBjb25zdHJ1Y3Rvcih0YXJnZXROYW1lOiBzdHJpbmcpIHtcbiAgICB0aGlzW05BTUVdID0gdGFyZ2V0TmFtZTtcbiAgfVxuXG4gIHB1YmxpYyBzdGF0aWMgY3JlYXRlKG5hbWU6IHN0cmluZykge1xuICAgIHJldHVybiBPYmplY3Quc2VhbChuZXcgVGFyZ2V0RmlsZShuYW1lKSk7XG4gIH1cblxuICBwdWJsaWMgc3RhdGljIGZyb21KU09OKG9iamVjdDogU2ltcGxlT2JqZWN0KSB7XG4gICAgcmV0dXJuIFRhcmdldEZpbGUuY3JlYXRlKG9iamVjdC50YXJnZXROYW1lIGFzIHN0cmluZyk7XG4gIH1cblxuICBwdWJsaWMgZ2V0IHRhcmdldE5hbWUoKTogc3RyaW5nIHtcbiAgICByZXR1cm4gdGhpc1tOQU1FXTtcbiAgfVxuXG4gIHB1YmxpYyB0b1N0cmluZygpOiBzdHJpbmcge1xuICAgIHJldHVybiBcIiR7XCIgKyB0aGlzW05BTUVdICsgXCIuZmlsZX1cIjtcbiAgfVxuXG4gIHB1YmxpYyB0b0pTT04oKTogU2ltcGxlT2JqZWN0IHtcbiAgICByZXR1cm4ge1xuICAgICAgdHlwZTogVGFyZ2V0RmlsZS5uYW1lLFxuICAgICAgdGFyZ2V0TmFtZTogdGhpc1tOQU1FXSxcbiAgICB9XG4gIH1cbn07XG4iLCIvKlxuICogTUlUIExpY2Vuc2VcbiAqXG4gKiBDb3B5cmlnaHQgKGMpIDIwMjUgIFl1cmlpIFlha3ViaW4gKHl1cmlpLnlha3ViaW5AZ21haWwuY29tKVxuICpcbiAqIFBlcm1pc3Npb24gaXMgZ3JhbnRlZCB0byB1c2UsIGNvcHksIG1vZGlmeSwgYW5kIGRpc3RyaWJ1dGUgdGhpcyBzb2Z0d2FyZVxuICogdW5kZXIgdGhlIE1JVCBMaWNlbnNlLiBTZWUgTElDRU5TRSBmaWxlIGZvciBkZXRhaWxzLlxuICovXG5cbmltcG9ydCB7IExvZ2dlciB9IGZyb20gXCJAL2xvZ2dlclwiO1xuaW1wb3J0IHsgQ29tcGlsZU9wdGlvbiB9IGZyb20gXCJAL2NvcmUvTWFrZUludGVyZmFjZXNcIjtcbmltcG9ydCB7IExvY2F0b3IgfSBmcm9tIFwiQC91dGlscy9Mb2NhdG9yXCI7XG5cbmNvbnN0IGxvZ2dlciA9IExvZ2dlci5jcmVhdGUoaW1wb3J0Lm1ldGEudXJsKTtcblxuZXhwb3J0IG5hbWVzcGFjZSBUYXJnZXRIZWxwZXIge1xuXG5mdW5jdGlvbiBjb252ZXJ0VmFsdWVUb0RlZmluaXRpb24odmFsdWU6IGFueSk6IHN0cmluZyB7XG4gIGlmICh2YWx1ZSA9PT0gdW5kZWZpbmVkKVxuICAgIHRocm93IGBEZWZpbml0aW9uIHVuZGVmaW5lZGA7XG4gIGlmICh0eXBlb2YgdmFsdWUgPT09IFwib2JqZWN0XCIpXG4gICAgcmV0dXJuICdcIicgKyBKU09OLnN0cmluZ2lmeSh2YWx1ZSkgKyAnXCInO1xuICByZXR1cm4gdmFsdWUudG9TdHJpbmcoKTtcbn1cblxuZXhwb3J0IGZ1bmN0aW9uIG5vcm1hbGl6ZURlZmluaXRpb25zKGRlZmluaXRpb25zOiBhbnlbXSk6IHN0cmluZ1tdIHtcbiAgY29uc3QgcmVzdWx0ID0gW107XG4gIGZvciAoY29uc3QgaXRlciBvZiBkZWZpbml0aW9ucykge1xuICAgIGlmICh0eXBlb2YgaXRlciA9PT0gXCJzdHJpbmdcIilcbiAgICAgIHJlc3VsdC5wdXNoKGl0ZXIpO1xuICAgIGVsc2UgaWYgKGl0ZXIgJiYgdHlwZW9mIGl0ZXIgPT09IFwib2JqZWN0XCIpIHtcbiAgICAgIGZvciAoY29uc3QgW2tleSwgdmFsXSBvZiBPYmplY3QuZW50cmllcyhpdGVyKSlcbiAgICAgICAgcmVzdWx0LnB1c2goYCR7a2V5fT0ke2NvbnZlcnRWYWx1ZVRvRGVmaW5pdGlvbih2YWwpfWApO1xuICAgIH1cbiAgICBlbHNlXG4gICAgICB0aHJvdyBuZXcgRXJyb3IoYERlZmVuaXRpb24gJHtpdGVyfSBub3Qgc3VwcG9ydGVkYCk7XG4gIH1cbiAgcmV0dXJuIHJlc3VsdDtcbn1cblxuZXhwb3J0IGZ1bmN0aW9uIG5vcm1hbGl6ZUNvbXBpbGVPcHRpb25zKG9wdGlvbnM6IENvbXBpbGVPcHRpb25bXSk6IEFycmF5PHN0cmluZyB8IFtzdHJpbmcsIHN0cmluZ10+IHtcbiAgY29uc3QgcmVzdWx0ID0gbmV3IEFycmF5PHN0cmluZyB8IFtzdHJpbmcsIHN0cmluZ10+O1xuICBmb3IgKGNvbnN0IGl0ZXIgb2Ygb3B0aW9ucykge1xuICAgIGlmICh0eXBlb2YgaXRlciA9PT0gXCJzdHJpbmdcIilcbiAgICAgIHJlc3VsdC5wdXNoKGl0ZXIpO1xuICAgIGVsc2UgaWYgKEFycmF5LmlzQXJyYXkoaXRlcikgJiYgaXRlci5sZW5ndGggPT0gMiAmJiB0eXBlb2YgaXRlclswXSA9PT0gXCJzdHJpbmdcIikge1xuICAgICAgaWYgKHR5cGVvZiBpdGVyWzFdID09PSBcInN0cmluZ1wiKVxuICAgICAgICByZXN1bHQucHVzaChbIGl0ZXJbMF0sIGl0ZXJbMV0gXSk7XG4gICAgICBlbHNlIGlmIChpdGVyWzFdIGluc3RhbmNlb2YgTG9jYXRvcilcbiAgICAgICAgcmVzdWx0LnB1c2goWyBpdGVyWzBdLCBpdGVyWzFdLnRvUGF0aCgpIF0pO1xuICAgICAgZWxzZVxuICAgICAgICB0aHJvdyBuZXcgRXJyb3IoYENvbXBpbGVPcHRpb24gJHtpdGVyfSBub3Qgc3VwcG9ydGVkYCk7XG4gICAgfVxuICAgIGVsc2Uge1xuICAgICAgdGhyb3cgbmV3IEVycm9yKGBDb21waWxlT3B0aW9uICR7aXRlcn0gbm90IHN1cHBvcnRlZGApO1xuICAgIH1cbiAgfVxuICByZXR1cm4gcmVzdWx0O1xufVxuXG59IC8vIG5hbWVzcGFjZSBuYW1lc3BhY2VcbiIsIi8qXG4gKiBNSVQgTGljZW5zZVxuICpcbiAqIENvcHlyaWdodCAoYykgMjAyNSAgWXVyaWkgWWFrdWJpbiAoeXVyaWkueWFrdWJpbkBnbWFpbC5jb20pXG4gKlxuICogUGVybWlzc2lvbiBpcyBncmFudGVkIHRvIHVzZSwgY29weSwgbW9kaWZ5LCBhbmQgZGlzdHJpYnV0ZSB0aGlzIHNvZnR3YXJlXG4gKiB1bmRlciB0aGUgTUlUIExpY2Vuc2UuIFNlZSBMSUNFTlNFIGZpbGUgZm9yIGRldGFpbHMuXG4gKi9cblxuaW1wb3J0IHsgU2ltcGxlT2JqZWN0IH0gZnJvbSBcIkAvY29yZS9TaW1wbGVPYmplY3RcIjtcblxuY29uc3QgTkFNRSA9IFN5bWJvbChcIk5BTUVcIik7XG5cbmV4cG9ydCBjbGFzcyBUYXJnZXRJbmNsdWRlcyB7XG4gIHByaXZhdGUgW05BTUVdOiBzdHJpbmc7XG5cbiAgcHJpdmF0ZSBjb25zdHJ1Y3RvcihuYW1lOiBzdHJpbmcpIHtcbiAgICB0aGlzW05BTUVdID0gbmFtZTtcbiAgfVxuXG4gIHB1YmxpYyBzdGF0aWMgY3JlYXRlKG5hbWU6IHN0cmluZykge1xuICAgIHJldHVybiBPYmplY3Quc2VhbChuZXcgVGFyZ2V0SW5jbHVkZXMobmFtZSkpO1xuICB9XG5cbiAgcHVibGljIHN0YXRpYyBmcm9tSlNPTihvYmplY3Q6IFNpbXBsZU9iamVjdCkge1xuICAgIHJldHVybiBUYXJnZXRJbmNsdWRlcy5jcmVhdGUob2JqZWN0LnRhcmdldE5hbWUgYXMgc3RyaW5nKTtcbiAgfVxuXG4gIHB1YmxpYyBnZXQgdGFyZ2V0TmFtZSgpOiBzdHJpbmcge1xuICAgIHJldHVybiB0aGlzW05BTUVdO1xuICB9XG5cbiAgcHVibGljIHRvU3RyaW5nKCk6IHN0cmluZyB7XG4gICAgcmV0dXJuIFwiJHtcIiArIHRoaXNbTkFNRV0gKyBcIi5pbmNsdWRlc31cIjtcbiAgfVxuXG4gIHB1YmxpYyB0b0pTT04oKTogU2ltcGxlT2JqZWN0IHtcbiAgICByZXR1cm4ge1xuICAgICAgdHlwZTogVGFyZ2V0SW5jbHVkZXMubmFtZSxcbiAgICAgIHRhcmdldE5hbWU6IHRoaXNbTkFNRV0sXG4gICAgfVxuICB9XG5cbiAgcHVibGljIHN0YXRpYyBlbnN1cmVJbnN0YW5jZSh2YWx1ZTogYW55KSB7XG4gICAgaWYgKHZhbHVlIGluc3RhbmNlb2YgVGFyZ2V0SW5jbHVkZXMpXG4gICAgICByZXR1cm4gdmFsdWU7XG4gICAgdGhyb3cgbmV3IEVycm9yKGBUaGUgJyR7dmFsdWV9JyBpcyBub3QgYSBUYXJnZXRJbmNsdWRlc2ApO1xuICB9XG59O1xuIiwiLypcbiAqIE1JVCBMaWNlbnNlXG4gKlxuICogQ29weXJpZ2h0IChjKSAyMDI1ICBZdXJpaSBZYWt1YmluICh5dXJpaS55YWt1YmluQGdtYWlsLmNvbSlcbiAqXG4gKiBQZXJtaXNzaW9uIGlzIGdyYW50ZWQgdG8gdXNlLCBjb3B5LCBtb2RpZnksIGFuZCBkaXN0cmlidXRlIHRoaXMgc29mdHdhcmVcbiAqIHVuZGVyIHRoZSBNSVQgTGljZW5zZS4gU2VlIExJQ0VOU0UgZmlsZSBmb3IgZGV0YWlscy5cbiAqL1xuXG5pbXBvcnQgeyBTaW1wbGVPYmplY3QgfSBmcm9tIFwiQC9jb3JlL1NpbXBsZU9iamVjdFwiO1xuXG5jb25zdCBOQU1FID0gU3ltYm9sKFwiTkFNRVwiKTtcblxuZXhwb3J0IGNsYXNzIFRhcmdldE5hbWUge1xuICBwcml2YXRlIFtOQU1FXTogc3RyaW5nO1xuXG4gIHByaXZhdGUgY29uc3RydWN0b3IobmFtZTogc3RyaW5nKSB7XG4gICAgdGhpc1tOQU1FXSA9IG5hbWU7XG4gIH1cblxuICBwdWJsaWMgc3RhdGljIGNyZWF0ZShuYW1lOiBzdHJpbmcpIHtcbiAgICByZXR1cm4gT2JqZWN0LnNlYWwobmV3IFRhcmdldE5hbWUobmFtZSkpO1xuICB9XG5cbiAgcHVibGljIHN0YXRpYyBmcm9tSlNPTihvYmplY3Q6IFNpbXBsZU9iamVjdCkge1xuICAgIHJldHVybiBUYXJnZXROYW1lLmNyZWF0ZShvYmplY3QudGFyZ2V0TmFtZSBhcyBzdHJpbmcpO1xuICB9XG5cbiAgcHVibGljIGdldCB0YXJnZXROYW1lKCk6IHN0cmluZyB7XG4gICAgcmV0dXJuIHRoaXNbTkFNRV07XG4gIH1cblxuICBwdWJsaWMgdG9TdHJpbmcoKTogc3RyaW5nIHtcbiAgICByZXR1cm4gXCIke1wiICsgdGhpc1tOQU1FXSArIFwiLmxpbmt9XCI7XG4gIH1cblxuICBwdWJsaWMgdG9KU09OKCk6IFNpbXBsZU9iamVjdCB7XG4gICAgcmV0dXJuIHtcbiAgICAgIHR5cGU6IFRhcmdldE5hbWUubmFtZSxcbiAgICAgIHRhcmdldE5hbWU6IHRoaXNbTkFNRV0sXG4gICAgfVxuICB9XG59O1xuIiwiLypcbiAqIE1JVCBMaWNlbnNlXG4gKlxuICogQ29weXJpZ2h0IChjKSAyMDI1ICBZdXJpaSBZYWt1YmluICh5dXJpaS55YWt1YmluQGdtYWlsLmNvbSlcbiAqXG4gKiBQZXJtaXNzaW9uIGlzIGdyYW50ZWQgdG8gdXNlLCBjb3B5LCBtb2RpZnksIGFuZCBkaXN0cmlidXRlIHRoaXMgc29mdHdhcmVcbiAqIHVuZGVyIHRoZSBNSVQgTGljZW5zZS4gU2VlIExJQ0VOU0UgZmlsZSBmb3IgZGV0YWlscy5cbiAqL1xuXG5pbXBvcnQgeyBTaW1wbGVPYmplY3QgfSBmcm9tIFwiQC9jb3JlL1NpbXBsZU9iamVjdFwiO1xuXG5jb25zdCBOQU1FID0gU3ltYm9sKFwiTkFNRVwiKTtcblxuZXhwb3J0IGNsYXNzIFRhcmdldE9iamVjdHMge1xuICBwcml2YXRlIFtOQU1FXTogc3RyaW5nO1xuXG4gIHByaXZhdGUgY29uc3RydWN0b3IobmFtZTogc3RyaW5nKSB7XG4gICAgdGhpc1tOQU1FXSA9IG5hbWU7XG4gIH1cblxuICBwdWJsaWMgc3RhdGljIGNyZWF0ZShuYW1lOiBzdHJpbmcpIHtcbiAgICByZXR1cm4gT2JqZWN0LnNlYWwobmV3IFRhcmdldE9iamVjdHMobmFtZSkpO1xuICB9XG5cbiAgcHVibGljIHN0YXRpYyBmcm9tSlNPTihvYmplY3Q6IFNpbXBsZU9iamVjdCkge1xuICAgIHJldHVybiBUYXJnZXRPYmplY3RzLmNyZWF0ZShvYmplY3QudGFyZ2V0TmFtZSBhcyBzdHJpbmcpO1xuICB9XG5cbiAgcHVibGljIHN0YXRpYyBlbnN1cmVJbnN0YW5jZSh2YWx1ZTogYW55KTogVGFyZ2V0T2JqZWN0cyB7XG4gICAgaWYgKHZhbHVlIGluc3RhbmNlb2YgVGFyZ2V0T2JqZWN0cylcbiAgICAgIHJldHVybiB2YWx1ZTtcbiAgICB0aHJvdyBuZXcgRXJyb3IoYFRoZSAnJHt2YWx1ZX0nIGlzIG5vdCBhIFRhcmdldE9iamVjdHNgKTtcbiAgfVxuXG4gIHB1YmxpYyBnZXQgdGFyZ2V0TmFtZSgpOiBzdHJpbmcge1xuICAgIHJldHVybiB0aGlzW05BTUVdO1xuICB9XG5cbiAgcHVibGljIHRvU3RyaW5nKCk6IHN0cmluZyB7XG4gICAgcmV0dXJuIFwiJHtcIiArIHRoaXNbTkFNRV0gKyBcIi5vYmplY3RzfVwiO1xuICB9XG5cbiAgcHVibGljIHRvSlNPTigpOiBTaW1wbGVPYmplY3Qge1xuICAgIHJldHVybiB7XG4gICAgICB0eXBlOiBUYXJnZXRPYmplY3RzLm5hbWUsXG4gICAgICB0YXJnZXROYW1lOiB0aGlzW05BTUVdLFxuICAgIH1cbiAgfVxufTtcbiIsIi8qXG4gKiBNSVQgTGljZW5zZVxuICpcbiAqIENvcHlyaWdodCAoYykgMjAyNSAgWXVyaWkgWWFrdWJpbiAoeXVyaWkueWFrdWJpbkBnbWFpbC5jb20pXG4gKlxuICogUGVybWlzc2lvbiBpcyBncmFudGVkIHRvIHVzZSwgY29weSwgbW9kaWZ5LCBhbmQgZGlzdHJpYnV0ZSB0aGlzIHNvZnR3YXJlXG4gKiB1bmRlciB0aGUgTUlUIExpY2Vuc2UuIFNlZSBMSUNFTlNFIGZpbGUgZm9yIGRldGFpbHMuXG4gKi9cblxuaW1wb3J0IHsgUHJvamVjdENvbnRleHQgfSBmcm9tIFwiQC9jb3JlL1Byb2plY3RDb250ZXh0XCI7XG5pbXBvcnQgeyBWYXJpYWJsZU1hcCB9IGZyb20gXCJAL2NvcmUvU2NvcGVcIjtcbmltcG9ydCB7IEdlbmVyYWxDb250ZXh0IH0gZnJvbSBcIkAvY29yZS9CYXNlQ29udGV4dFwiO1xuaW1wb3J0IHsgY3JlYXRlQ29udGV4dCB9IGZyb20gXCJAL2NvcmUvQmFzZUNvbnRleHRcIjtcblxuY29uc3QgR0xPQkFMID0gU3ltYm9sKFwiR0xPQkFMXCIpO1xuY29uc3QgU0NPUEUgPSBTeW1ib2woXCJTQ09QRVwiKTtcblxuZXhwb3J0IGNsYXNzIFRvb2xjaGFpbkNvbnRleHQgZXh0ZW5kcyBHZW5lcmFsQ29udGV4dCB7XG4gIFtTQ09QRV06IFZhcmlhYmxlTWFwO1xuICBbR0xPQkFMXTogUHJvamVjdENvbnRleHQ7XG5cbiAgY29uc3RydWN0b3IoZ2xvYmFsOiBQcm9qZWN0Q29udGV4dCwgc2NvcGU6IFZhcmlhYmxlTWFwKSB7XG4gICAgc3VwZXIoc2NvcGUpO1xuICAgIHRoaXNbR0xPQkFMXSA9IGdsb2JhbDtcbiAgICB0aGlzW1NDT1BFXSA9IHNjb3BlO1xuICB9XG5cbiAgcHVibGljIHN0YXRpYyBjcmVhdGUoZ2xvYmFsOiBQcm9qZWN0Q29udGV4dCwgdmFyaWFibGVNYXA6IFZhcmlhYmxlTWFwKSB7XG4gICAgcmV0dXJuIGNyZWF0ZUNvbnRleHQobmV3IFRvb2xjaGFpbkNvbnRleHQoZ2xvYmFsLCB2YXJpYWJsZU1hcCkpO1xuICB9XG59O1xuIiwiLypcbiAqIE1JVCBMaWNlbnNlXG4gKlxuICogQ29weXJpZ2h0IChjKSAyMDI1ICBZdXJpaSBZYWt1YmluICh5dXJpaS55YWt1YmluQGdtYWlsLmNvbSlcbiAqXG4gKiBQZXJtaXNzaW9uIGlzIGdyYW50ZWQgdG8gdXNlLCBjb3B5LCBtb2RpZnksIGFuZCBkaXN0cmlidXRlIHRoaXMgc29mdHdhcmVcbiAqIHVuZGVyIHRoZSBNSVQgTGljZW5zZS4gU2VlIExJQ0VOU0UgZmlsZSBmb3IgZGV0YWlscy5cbiAqL1xuXG5leHBvcnQgY29uc3QgREVCVUdfQlVJTERfVFlQRSA9IFwiRGVidWdcIjtcbmV4cG9ydCBjb25zdCBSRUxFQVNFX0JVSUxEX1RZUEUgPSBcIlJlbGVhc2VcIjtcbiIsIi8qXG4gKiBNSVQgTGljZW5zZVxuICpcbiAqIENvcHlyaWdodCAoYykgMjAyNSAgWXVyaWkgWWFrdWJpbiAoeXVyaWkueWFrdWJpbkBnbWFpbC5jb20pXG4gKlxuICogUGVybWlzc2lvbiBpcyBncmFudGVkIHRvIHVzZSwgY29weSwgbW9kaWZ5LCBhbmQgZGlzdHJpYnV0ZSB0aGlzIHNvZnR3YXJlXG4gKiB1bmRlciB0aGUgTUlUIExpY2Vuc2UuIFNlZSBMSUNFTlNFIGZpbGUgZm9yIGRldGFpbHMuXG4gKi9cblxuaW1wb3J0IHsgSU1ha2VDb250ZXh0LCBJbnRlcmZhY2VUYXJnZXQsIEludGVyZmFjZVNjcmlwdCB9IGZyb20gXCJAL2NvcmUvTWFrZUludGVyZmFjZXNcIjtcbmltcG9ydCB7IFZhcmlhbnRNYXAsIFZhcmlhYmxlTWFwLCBTY29wZUhlbHBlciB9IGZyb20gXCJAL2NvcmUvU2NvcGVcIjtcbmltcG9ydCB7IFN5c3RlbVNjb3BlIH0gZnJvbSBcIkAvY29yZS9TeXN0ZW1TY29wZVwiO1xuaW1wb3J0IHsgR2VuZXJhbENvbnRleHQsIE1ha2VDb250ZXh0LCBjcmVhdGVDb250ZXh0IH0gZnJvbSBcIkAvY29yZS9CYXNlQ29udGV4dFwiO1xuaW1wb3J0IHsgT2JqZWN0TGlicmFyeSwgU3RhdGljTGlicmFyeSwgU2hhcmVkTGlicmFyeSwgRXhlY3V0YWJsZSwgTWFpblRhcmdldCB9IGZyb20gXCJAL2NvcmUvVGFyZ2V0XCI7XG5pbXBvcnQgeyBVc2VyVGFyZ2V0U3RydWN0IH0gZnJvbSBcIkAvY29yZS9Vc2VyVGFyZ2V0U3RydWN0XCI7XG5pbXBvcnQgeyBBTExfVEFSR0VULCBJTlNUQUxMX1RBUkdFVCB9IGZyb20gXCJAL0NvbnN0YW50c1wiO1xuaW1wb3J0IHsgQ1VTVE9NX1ZBUklBQkxFX0dST1VQIH0gZnJvbSBcIkAvQ29uc3RhbnRzXCI7XG5pbXBvcnQgeyByYW5kQ0lkZW50aWZlciB9IGZyb20gXCJAL3V0aWxzL1JhbmRvbVwiO1xuaW1wb3J0IHsgTG9nZ2VyIH0gZnJvbSBcIkAvbG9nZ2VyXCI7XG5pbXBvcnQgeyBGaWxlUGF0aCwgTG9jYXRvciB9IGZyb20gXCJAL3V0aWxzL0xvY2F0b3JcIjtcbmltcG9ydCB7IFRhcmdldE5hbWUgfSBmcm9tIFwiQC9jb3JlL1RhcmdldE5hbWVcIjtcblxuY29uc3QgbG9nZ2VyID0gTG9nZ2VyLmNyZWF0ZShpbXBvcnQubWV0YS51cmwpO1xuXG5jb25zdCBTQ09QRSA9IFN5bWJvbChcIlNDT1BFXCIpO1xuY29uc3QgSU1QTCA9IFN5bWJvbChcIklNUExcIik7XG5jb25zdCBWQVJNQVAgPSBTeW1ib2woXCJWQVJNQVBcIik7XG5cbmZ1bmN0aW9uIGNyZWF0ZVRhcmdldEltcGw8VCBleHRlbmRzIE1haW5UYXJnZXQ+KFRhcmdldEN0b3I6IG5ldyAoLi4uYXJnczogYW55W10pID0+IFQsIGN0eDogTWFrZUNvbnRleHQsIHNjb3BlOiBTeXN0ZW1TY29wZSwgbmFtZTogc3RyaW5nKSB7XG4gIGlmICh0eXBlb2YgbmFtZSAhPT0gXCJzdHJpbmdcIilcbiAgICB0aHJvdyBuZXcgRXJyb3IoYFRhcmdldCBcIiR7bmFtZX1cIiBpcyBub3Qgc3RyaW5nIHR5cGVgKTtcblxuICBpZiAoIW5hbWUpXG4gICAgdGhyb3cgbmV3IEVycm9yKGBBIHRhcmdldCB3aXRoIGFuIGVtcHR5IG5hbWUgY2Fubm90IGV4aXN0YCk7XG5cbiAgaWYgKGN0eC5oYXNNYWluVGFyZ2V0KG5hbWUpKVxuICAgIHRocm93IG5ldyBFcnJvcihgVGFyZ2V0IFwiJHtuYW1lfVwiIGV4aXN0c2ApO1xuXG4gIGlmIChbIEFMTF9UQVJHRVQsIElOU1RBTExfVEFSR0VUIF0uaW5jbHVkZXMobmFtZSkpXG4gICAgdGhyb3cgbmV3IEVycm9yKGBUYXJnZXQgXCIke25hbWV9XCIgaXMgcmVzZXJ2ZWQgbmFtZWApO1xuXG4gIGNvbnN0IHRhcmdldCA9IG5ldyBUYXJnZXRDdG9yKG5hbWUsIHNjb3BlLlNPVVJDRV9ESVIsIHNjb3BlLkJJTkFSWV9ESVIpO1xuICBjdHguYWRkTWFpblRhcmdldChuYW1lLCB0YXJnZXQpO1xuICByZXR1cm4gdGFyZ2V0O1xufVxuXG5leHBvcnQgY2xhc3MgVXNlck1ha2VDb250ZXh0IGV4dGVuZHMgR2VuZXJhbENvbnRleHQgaW1wbGVtZW50cyBJTWFrZUNvbnRleHQge1xuICBwcml2YXRlIFtJTVBMXTogTWFrZUNvbnRleHQ7XG4gIHByaXZhdGUgW1ZBUk1BUF06IFZhcmlhYmxlTWFwO1xuICBwcml2YXRlIFtTQ09QRV06IFN5c3RlbVNjb3BlO1xuXG4gIHB1YmxpYyBjb25zdHJ1Y3RvcihpbXBsOiBNYWtlQ29udGV4dCwgdmFyaWFibGVNYXA6IFZhcmlhYmxlTWFwKSB7XG4gICAgc3VwZXIodmFyaWFibGVNYXApO1xuICAgIHRoaXNbSU1QTF0gPSBpbXBsO1xuICAgIHRoaXNbVkFSTUFQXSA9IHZhcmlhYmxlTWFwO1xuICAgIHRoaXNbU0NPUEVdID0gU2NvcGVIZWxwZXIuY3JlYXRlUHJveHkodmFyaWFibGVNYXApO1xuICB9XG5cbiAgcHVibGljIHN0YXRpYyBjcmVhdGUoaW1wbDogTWFrZUNvbnRleHQsIHZhcmlhYmxlTWFwOiBWYXJpYWJsZU1hcCkge1xuICAgIHJldHVybiBjcmVhdGVDb250ZXh0KG5ldyBVc2VyTWFrZUNvbnRleHQoaW1wbCwgdmFyaWFibGVNYXApKTtcbiAgfVxuXG4gIHB1YmxpYyBnZXRDYWNoZVZhcmlhYmxlcygpIHtcbiAgICByZXR1cm4gU2NvcGVIZWxwZXIuZ2V0VmFyaWFibGVzQnlHcm91cCh0aGlzW1ZBUk1BUF0sIENVU1RPTV9WQVJJQUJMRV9HUk9VUCk7XG4gIH1cblxuICBwdWJsaWMgYWRkQ2FjaGVWYXJpYWJsZXMocGFyYW1zOiBzdHJpbmcgfCBWYXJpYW50TWFwKTogdm9pZCB7XG4gICAgbGV0IHZhcmlhYmxlcyA9IHBhcmFtcztcbiAgICBpZiAodHlwZW9mIHBhcmFtcyA9PT0gXCJzdHJpbmdcIikge1xuICAgICAgY29uc3QgdXJsID0gdGhpc1tTQ09QRV0uU09VUkNFX0RJUi5yZXNvbHZlKHBhcmFtcykudG9VUkxTdHJpbmcoKTtcbiAgICAgIHZhcmlhYmxlcyA9IHRoaXNbSU1QTF0ubG9hZEpTT04odXJsKTtcbiAgICB9XG4gICAgU2NvcGVIZWxwZXIuZGVmaW5lVmFyaWFibGVzSW5WYXJpYWJsZU1hcCh0aGlzW1ZBUk1BUF0sIENVU1RPTV9WQVJJQUJMRV9HUk9VUCwgdmFyaWFibGVzKTtcbiAgfVxuXG4gIHB1YmxpYyBhZGRJbmNsdWRlRGlyZWN0b3JpZXMoLi4uZGlyczogYW55W10pOiBhbnkge1xuICAgIGNvbnN0IHNvdXJjZURpciA9IHRoaXNbU0NPUEVdLlNPVVJDRV9ESVI7XG4gICAgZm9yIChjb25zdCBpdGVyIG9mIGRpcnMuZmxhdCgpKSB7XG4gICAgICB0aGlzW1NDT1BFXS5JTkNMVURFUy5wdXNoKHNvdXJjZURpci5yZXNvbHZlKGl0ZXIpKTtcbiAgICB9XG4gIH1cblxuICBwdWJsaWMgYWRkU3ViZGlyZWN0b3J5KHNvdXJjZURpcjogYW55LCBiaW5hcnlEaXI/OiBhbnkpIHtcbiAgICB0aGlzW0lNUExdLmFkZFN1YmRpcmVjdG9yeSh0aGlzW1ZBUk1BUF0sIHNvdXJjZURpciwgYmluYXJ5RGlyKTtcbiAgfVxuICBcbiAgcHVibGljIGFkZEN1c3RvbVNjcmlwdChzY3JpcHRNb2R1bGU6IHN0cmluZyB8IExvY2F0b3IsIHBhcmFtczogYW55KTogSW50ZXJmYWNlU2NyaXB0IHtcbiAgICBjb25zdCB2YXJpYWJsZU1hcCA9IFNjb3BlSGVscGVyLmNsb25lVmFyaWFibGVNYXAodGhpc1tWQVJNQVBdKTtcbiAgICBTY29wZUhlbHBlci5leHRlbmRWYXJpYWJsZU1hcEJ5VmFsdWVzKHZhcmlhYmxlTWFwLCBDVVNUT01fVkFSSUFCTEVfR1JPVVAsIHBhcmFtcyk7XG4gICAgU2NvcGVIZWxwZXIuc2V0KHZhcmlhYmxlTWFwLCBcIlNDUklQVF9NT0RVTEVcIiwgc2NyaXB0TW9kdWxlKTtcbiAgICBcbiAgICBjb25zdCBzb3VyY2VEaXIgPSBTY29wZUhlbHBlci5nZXQodmFyaWFibGVNYXAsIFwiU09VUkNFX0RJUlwiKSBhcyBMb2NhdG9yO1xuICAgIGNvbnN0IGJpbmFyeURpciA9IFNjb3BlSGVscGVyLmdldCh2YXJpYWJsZU1hcCwgXCJCSU5BUllfRElSXCIpIGFzIExvY2F0b3I7XG5cbiAgICBsZXQgaW5wdXRGaWxlID0gU2NvcGVIZWxwZXIuZ2V0KHZhcmlhYmxlTWFwLCBcIlNDUklQVF9JTlBVVFwiKTtcbiAgICBpZiAoaW5wdXRGaWxlKVxuICAgICAgaW5wdXRGaWxlID0gc291cmNlRGlyLnJlc29sdmUoaW5wdXRGaWxlKTtcblxuICAgIGxldCBvdXRwdXRGaWxlID0gU2NvcGVIZWxwZXIuZ2V0KHZhcmlhYmxlTWFwLCBcIlNDUklQVF9PVVRQVVRcIik7XG4gICAgaWYgKCFvdXRwdXRGaWxlKVxuICAgICAgdGhyb3cgbmV3IEVycm9yKFwiQ3VzdG9tU2NyaXB0IHBhcmFtZXRlcnMgcmVxdWlyZWQgb3V0cHV0IGVudGl0eVwiKTtcblxuICAgIG91dHB1dEZpbGUgPSBzb3VyY2VEaXIucmVzb2x2ZShvdXRwdXRGaWxlKTtcblxuICAgIGNvbnN0IG9wdGlvbnMgPSB7XG4gICAgICB2YXJpYWJsZU1hcCxcbiAgICAgIG5hbWU6IFNjb3BlSGVscGVyLmdldCh2YXJpYWJsZU1hcCwgXCJTQ1JJUFRfTkFNRVwiKSB8fCByYW5kQ0lkZW50aWZlcigxNiksXG4gICAgICBzY3JpcHRNb2R1bGUsXG4gICAgICBvdXRwdXQ6IG91dHB1dEZpbGUsXG4gICAgICBpbnB1dDogaW5wdXRGaWxlLFxuICAgICAgc291cmNlRGlyLFxuICAgICAgYmluYXJ5RGlyLFxuICAgIH07XG5cbiAgICByZXR1cm4gdGhpc1tJTVBMXS5hZGRDdXN0b21TY3JpcHQob3B0aW9ucyk7XG4gIH1cblxuICBwdWJsaWMgdGFyZ2V0KG5hbWU6IHN0cmluZyk6IFVzZXJUYXJnZXRTdHJ1Y3Qge1xuICAgIHJldHVybiBVc2VyVGFyZ2V0U3RydWN0LmNyZWF0ZSh0aGlzW0lNUExdLmdldFBvc3RUYXJnZXQobmFtZSksIHRoaXNbU0NPUEVdKTtcbiAgfVxuXG4gIHB1YmxpYyBzY3JpcHQobmFtZTogc3RyaW5nKTogSW50ZXJmYWNlU2NyaXB0IHtcbiAgICByZXR1cm4gdGhpc1tJTVBMXS5zY3JpcHQobmFtZSk7XG4gIH1cblxuICBwdWJsaWMgaW5zdGFsbCh2YWx1ZTogYW55LCBwYXJhbXM6IGFueSk6IHZvaWQge1xuICAgIGZvciAoY29uc3QgaXQgb2YgWyB2YWx1ZSBdLmZsYXQoKSkge1xuICAgICAgbGV0IGl0ZXIgPSAoaXQgaW5zdGFuY2VvZiBJbnRlcmZhY2VUYXJnZXQpID8gVGFyZ2V0TmFtZS5jcmVhdGUoaXQudGFyZ2V0TmFtZSkgOiBpdDtcblxuICAgICAgbGV0IGRlc3RpbmF0aW9uOiBzdHJpbmcgfCBMb2NhdG9yIHwgdW5kZWZpbmVkO1xuICAgICAgbGV0IGJhc2VEaXI7XG4gICAgICBpZiAodHlwZW9mIHBhcmFtcyA9PT0gXCJzdHJpbmdcIilcbiAgICAgICAgZGVzdGluYXRpb24gPSBwYXJhbXM7XG4gICAgICBlbHNlIGlmIChwYXJhbXMpIHtcbiAgICAgICAgZGVzdGluYXRpb24gPSBwYXJhbXMuZGVzdGluYXRpb247XG4gICAgICAgIGJhc2VEaXIgPSBwYXJhbXMuYmFzZURpcjtcbiAgICAgIH1cblxuICAgICAgaWYgKCFkZXN0aW5hdGlvbilcbiAgICAgICAgdGhyb3cgbmV3IEVycm9yKGBQYXJhbWV0ZXIgZGVzdGluYXRpb24gaXMgbm90IHNwZWNpZmllZGApO1xuICAgIFxuICAgICAgaWYgKGJhc2VEaXIpXG4gICAgICAgIGJhc2VEaXIgPSB0aGlzW1NDT1BFXS5TT1VSQ0VfRElSLnJlc29sdmUoYmFzZURpcik7XG5cbiAgICAgIGlmICh0eXBlb2YgaXRlciA9PT0gXCJzdHJpbmdcIiB8fCBpdGVyIGluc3RhbmNlb2YgTG9jYXRvcikge1xuICAgICAgICBpdGVyID0gdGhpc1tTQ09QRV0uU09VUkNFX0RJUi5yZXNvbHZlKGl0ZXIudG9TdHJpbmcoKSk7XG4gICAgICAgIGl0ZXIgPSBGaWxlUGF0aC5jcmVhdGUoaXRlcik7XG4gICAgICAgIGJhc2VEaXIgPSBiYXNlRGlyIHx8IGl0ZXIuZGlybmFtZSgpO1xuICAgICAgfVxuICAgICAgZWxzZSBpZiAoIShpdGVyIGluc3RhbmNlb2YgVGFyZ2V0TmFtZSkpIHtcbiAgICAgICAgdGhyb3cgbmV3IEVycm9yKGBOb3Qgc3VwcG9ydGV0IHZhbHVlIG9mICR7aXRlcn1gKTtcbiAgICAgIH1cblxuICAgICAgdGhpc1tJTVBMXS5hZGRJbnN0YWxsRW50cnkoaXRlciwgTG9jYXRvci5jcmVhdGUodGhpc1tTQ09QRV0uSU5TVEFMTF9QUkVGSVgucmVzb2x2ZShkZXN0aW5hdGlvbikpLCBiYXNlRGlyKTtcbiAgICB9XG4gIH1cblxuICBwdWJsaWMgYWRkT2JqZWN0TGlicmFyeShuYW1lOiBzdHJpbmcsIC4uLnNvdXJjZXM6IGFueVtdKTogVXNlclRhcmdldFN0cnVjdCB7XG4gICAgY29uc3QgdGFyZ2V0ID0gY3JlYXRlVGFyZ2V0SW1wbChPYmplY3RMaWJyYXJ5LCB0aGlzW0lNUExdLCB0aGlzW1NDT1BFXSwgbmFtZSk7XG4gICAgdGFyZ2V0LnNldFByZWZpeCh0aGlzW1NDT1BFXS5PQkpFQ1RfTElCUkFSWV9QUkVGSVgpO1xuICAgIHRhcmdldC5zZXRTdWZmaXgodGhpc1tTQ09QRV0uT0JKRUNUX0xJQlJBUllfU1VGRklYKTtcbiAgICB0YXJnZXQuYWRkTGlua09wdGlvbnMoLi4udGhpc1tTQ09QRV0uT0JKRUNUX0xJTktFUl9GTEFHUyk7XG5cbiAgICByZXR1cm4gVXNlclRhcmdldFN0cnVjdC5jcmVhdGUodGFyZ2V0LCB0aGlzW1NDT1BFXSwgLi4uc291cmNlcyk7XG4gIH1cblxuICBwdWJsaWMgYWRkU3RhdGljTGlicmFyeShuYW1lOiBhbnksIC4uLnNvdXJjZXM6IGFueVtdKTogVXNlclRhcmdldFN0cnVjdCB7XG4gICAgY29uc3QgdGFyZ2V0ID0gY3JlYXRlVGFyZ2V0SW1wbChTdGF0aWNMaWJyYXJ5LCB0aGlzW0lNUExdLCB0aGlzW1NDT1BFXSwgbmFtZSk7XG4gICAgdGFyZ2V0LnNldFByZWZpeCh0aGlzW1NDT1BFXS5TVEFUSUNfTElCUkFSWV9QUkVGSVgpO1xuICAgIHRhcmdldC5zZXRTdWZmaXgodGhpc1tTQ09QRV0uU1RBVElDX0xJQlJBUllfU1VGRklYKTtcbiAgICB0YXJnZXQuYWRkTGlua09wdGlvbnMoLi4udGhpc1tTQ09QRV0uU1RBVElDX0xJTktFUl9GTEFHUyk7XG5cbiAgICByZXR1cm4gVXNlclRhcmdldFN0cnVjdC5jcmVhdGUodGFyZ2V0LCB0aGlzW1NDT1BFXSwgLi4uc291cmNlcyk7XG4gIH1cblxuICBwdWJsaWMgYWRkU2hhcmVkTGlicmFyeShuYW1lOiBhbnksIC4uLnNvdXJjZXM6IGFueVtdKTogVXNlclRhcmdldFN0cnVjdCB7XG4gICAgY29uc3QgdGFyZ2V0ID0gY3JlYXRlVGFyZ2V0SW1wbChTaGFyZWRMaWJyYXJ5LCB0aGlzW0lNUExdLCB0aGlzW1NDT1BFXSwgbmFtZSk7XG4gICAgdGFyZ2V0LnNldFByZWZpeCh0aGlzW1NDT1BFXS5TSEFSRURfTElCUkFSWV9QUkVGSVgpO1xuICAgIHRhcmdldC5zZXRTdWZmaXgodGhpc1tTQ09QRV0uU0hBUkVEX0xJQlJBUllfU1VGRklYKTtcbiAgICB0YXJnZXQuYWRkTGlua09wdGlvbnMoLi4udGhpc1tTQ09QRV0uU0hBUkVEX0xJTktFUl9GTEFHUyk7XG5cbiAgICByZXR1cm4gVXNlclRhcmdldFN0cnVjdC5jcmVhdGUodGFyZ2V0LCB0aGlzW1NDT1BFXSwgLi4uc291cmNlcyk7XG4gIH1cblxuICBwdWJsaWMgYWRkRXhlY3V0YWJsZShuYW1lOiBhbnksIC4uLnNvdXJjZXM6IGFueVtdKTogVXNlclRhcmdldFN0cnVjdCB7XG4gICAgY29uc3QgdGFyZ2V0ID0gY3JlYXRlVGFyZ2V0SW1wbChFeGVjdXRhYmxlLCB0aGlzW0lNUExdLCB0aGlzW1NDT1BFXSwgbmFtZSk7XG4gICAgdGFyZ2V0LnNldFByZWZpeCh0aGlzW1NDT1BFXS5FWEVDVVRBQkxFX1NVRkZJWCk7XG4gICAgdGFyZ2V0LmFkZExpbmtPcHRpb25zKC4uLnRoaXNbU0NPUEVdLkVYRV9MSU5LRVJfRkxBR1MpO1xuXG4gICAgcmV0dXJuIFVzZXJUYXJnZXRTdHJ1Y3QuY3JlYXRlKHRhcmdldCwgdGhpc1tTQ09QRV0sIC4uLnNvdXJjZXMpO1xuICB9XG5cbiAgcHVibGljIGV4ZWN1dGVTY3JpcHQoc2NyaXB0OiBhbnksIHBhcmFtczogYW55KTogdm9pZCB7XG4gICAgdGhpc1tJTVBMXS5leGVjdXRlU2NyaXB0KHRoaXNbVkFSTUFQXSwgc2NyaXB0LCBwYXJhbXMpO1xuICB9XG59O1xuIiwiLypcbiAqIE1JVCBMaWNlbnNlXG4gKlxuICogQ29weXJpZ2h0IChjKSAyMDI1ICBZdXJpaSBZYWt1YmluICh5dXJpaS55YWt1YmluQGdtYWlsLmNvbSlcbiAqXG4gKiBQZXJtaXNzaW9uIGlzIGdyYW50ZWQgdG8gdXNlLCBjb3B5LCBtb2RpZnksIGFuZCBkaXN0cmlidXRlIHRoaXMgc29mdHdhcmVcbiAqIHVuZGVyIHRoZSBNSVQgTGljZW5zZS4gU2VlIExJQ0VOU0UgZmlsZSBmb3IgZGV0YWlscy5cbiAqL1xuXG5pbXBvcnQgeyBJbnRlcmZhY2VTb3VyY2VGaWxlcyB9IGZyb20gXCJAL2NvcmUvTWFrZUludGVyZmFjZXNcIjtcbmltcG9ydCB7IFNvdXJjZUZpbGUgfSBmcm9tIFwiQC9jb3JlL1NvdXJjZUZpbGVcIjtcbmltcG9ydCB7IFRhcmdldEhlbHBlciB9IGZyb20gXCJAL2NvcmUvVGFyZ2V0SGVscGVyXCI7XG5pbXBvcnQgeyBCYXNlVGFyZ2V0IH0gZnJvbSBcIkAvY29yZS9UYXJnZXRcIjtcblxuY29uc3QgVEFSR0VUID0gU3ltYm9sKFwiVEFSR0VUXCIpO1xuY29uc3QgU09VUkNFUyA9IFN5bWJvbChcIlNPVVJDRVNcIik7XG5cbmV4cG9ydCBjbGFzcyBVc2VyU291cmNlRmlsZXMgZXh0ZW5kcyBJbnRlcmZhY2VTb3VyY2VGaWxlcyB7XG4gIHByaXZhdGUgW1RBUkdFVF06IEJhc2VUYXJnZXQ7XG4gIHByaXZhdGUgW1NPVVJDRVNdOiBTb3VyY2VGaWxlW107XG5cbiAgcHJpdmF0ZSBjb25zdHJ1Y3Rvcih0YXJnZXQ6IEJhc2VUYXJnZXQsIHNvdXJjZXM6IFNvdXJjZUZpbGVbXSkge1xuICAgIHN1cGVyKCk7XG4gICAgdGhpc1tUQVJHRVRdID0gdGFyZ2V0O1xuICAgIHRoaXNbU09VUkNFU10gPSBbIC4uLnNvdXJjZXMgXTtcbiAgfVxuXG4gIHB1YmxpYyBzdGF0aWMgY3JlYXRlKHRhcmdldDogQmFzZVRhcmdldCwgc291cmNlczogU291cmNlRmlsZVtdKSB7XG4gICAgcmV0dXJuIE9iamVjdC5zZWFsKG5ldyBVc2VyU291cmNlRmlsZXModGFyZ2V0LCBzb3VyY2VzKSk7XG4gIH1cblxuICBwdWJsaWMgc2V0TGFuZ3VhZ2UobGFuZ3VhZ2U6IHN0cmluZyk6IHZvaWQge1xuICAgIHRocm93IG5ldyBFcnJvcihcIk5vdCBJbXBsZW1lbnRlZFwiKTtcbiAgfVxuXG4gIHB1YmxpYyBhZGREZWZpbml0aW9ucyguLi5kZWZpbml0aW9uczogc3RyaW5nW10pIHtcbiAgICBmb3IgKGNvbnN0IGl0ZXIgb2YgVGFyZ2V0SGVscGVyLm5vcm1hbGl6ZURlZmluaXRpb25zKGRlZmluaXRpb25zLmZsYXQoKSkpXG4gICAgICB0aGlzW1NPVVJDRVNdLmZvckVhY2goaSA9PiBpLmFkZERlZmluaXRpb24oaXRlcikpO1xuICB9XG5cbiAgcHVibGljIGFkZENvbXBpbGVGbGFncyguLi5vcHRpb25zOiBzdHJpbmdbXSkge1xuICAgIGZvciAoY29uc3QgaXRlciBvZiBUYXJnZXRIZWxwZXIubm9ybWFsaXplQ29tcGlsZU9wdGlvbnMob3B0aW9ucy5mbGF0KCkpKVxuICAgICAgdGhpc1tTT1VSQ0VTXS5mb3JFYWNoKGkgPT4gaS5hZGRDb21waWxlT3B0aW9uKGl0ZXIpKTtcbiAgfVxuXG4gIHB1YmxpYyB0b0pTT04oKTogb2JqZWN0IHtcbiAgICByZXR1cm4gdGhpc1tTT1VSQ0VTXTtcbiAgfVxufTtcbiIsIi8qXG4gKiBNSVQgTGljZW5zZVxuICpcbiAqIENvcHlyaWdodCAoYykgMjAyNSAgWXVyaWkgWWFrdWJpbiAoeXVyaWkueWFrdWJpbkBnbWFpbC5jb20pXG4gKlxuICogUGVybWlzc2lvbiBpcyBncmFudGVkIHRvIHVzZSwgY29weSwgbW9kaWZ5LCBhbmQgZGlzdHJpYnV0ZSB0aGlzIHNvZnR3YXJlXG4gKiB1bmRlciB0aGUgTUlUIExpY2Vuc2UuIFNlZSBMSUNFTlNFIGZpbGUgZm9yIGRldGFpbHMuXG4gKi9cblxuaW1wb3J0IHsgSW50ZXJmYWNlVGFyZ2V0IH0gZnJvbSBcIkAvY29yZS9NYWtlSW50ZXJmYWNlc1wiO1xuaW1wb3J0IHsgQmFzZVRhcmdldCB9IGZyb20gXCJAL2NvcmUvVGFyZ2V0XCI7XG5pbXBvcnQgeyBTeXN0ZW1TY29wZSB9IGZyb20gXCJAL2NvcmUvU3lzdGVtU2NvcGVcIjtcbmltcG9ydCB7IGVuc3VyZVN0cmluZyB9IGZyb20gXCJAL3V0aWxzL1N0cmljdFR5cGVcIjtcbmltcG9ydCB7IFRhcmdldEluY2x1ZGVzIH0gZnJvbSBcIkAvY29yZS9UYXJnZXRJbmNsdWRlc1wiO1xuaW1wb3J0IHsgVGFyZ2V0T2JqZWN0cyB9IGZyb20gXCJAL2NvcmUvVGFyZ2V0T2JqZWN0c1wiO1xuaW1wb3J0IHsgRGlyUGF0aCwgTG9jYXRvciB9IGZyb20gXCJAL3V0aWxzL0xvY2F0b3JcIjtcbmltcG9ydCB7IFNvdXJjZUZpbGUgfSBmcm9tIFwiQC9jb3JlL1NvdXJjZUZpbGVcIjtcbmltcG9ydCB7IFVzZXJTb3VyY2VGaWxlcyB9IGZyb20gXCJAL2NvcmUvVXNlclNvdXJjZUZpbGVzXCI7XG5pbXBvcnQgeyBUYXJnZXRGaWxlIH0gZnJvbSBcIkAvY29yZS9UYXJnZXRGaWxlXCI7XG5pbXBvcnQgeyBUYXJnZXRIZWxwZXIgfSBmcm9tIFwiQC9jb3JlL1RhcmdldEhlbHBlclwiO1xuaW1wb3J0IHsgTG9nZ2VyIH0gZnJvbSBcIkAvbG9nZ2VyXCI7XG5cbmNvbnN0IGxvZ2dlciA9IExvZ2dlci5jcmVhdGUoaW1wb3J0Lm1ldGEudXJsKTtcblxuY29uc3QgU0NPUEUgPSBTeW1ib2woXCJTQ09QRVwiKTtcbmNvbnN0IElNUEwgPSBTeW1ib2woXCJJTVBMXCIpO1xuXG5jb25zdCBfbGFuZ3VhZ2VFeHRlbnNpb25zID0ge1xuICBBU006IFsgXCIuYXNtXCIsIFwiLnNcIiBdLFxuICBDOiAgIFsgXCIuY1wiIF0sXG4gIENYWDogW1wiLmNwcFwiLCBcIi5jY1wiLCBcIi5jeHhcIiBdLFxufTtcblxuZnVuY3Rpb24gaXNTdXBwb3J0TGFuZ3VhZ2UobGFuZ3VhZ2U6IHN0cmluZykge1xuICByZXR1cm4gX2xhbmd1YWdlRXh0ZW5zaW9ucy5oYXNPd25Qcm9wZXJ0eShsYW5ndWFnZSk7XG59XG5cbmZ1bmN0aW9uIGdldEZpbGVMYW5ndWFnZShmaWxlbmFtZTogc3RyaW5nKSB7XG4gIGNvbnN0IGZpbGVuYW1lTG93ZXJDYXNlID0gZmlsZW5hbWUudG9Mb3dlckNhc2UoKTtcbiAgZm9yIChjb25zdCBbbGFuZ3VhZ2UsIGV4dGVuc2lvbnNdIG9mIE9iamVjdC5lbnRyaWVzKF9sYW5ndWFnZUV4dGVuc2lvbnMpKSB7XG4gICAgZm9yIChjb25zdCBpdGVyIG9mIGV4dGVuc2lvbnMpIHtcbiAgICAgIGlmIChmaWxlbmFtZUxvd2VyQ2FzZS5lbmRzV2l0aChpdGVyKSlcbiAgICAgICAgcmV0dXJuIGxhbmd1YWdlO1xuICAgIH1cbiAgfVxuICByZXR1cm4gXCJcIjtcbn1cblxuZnVuY3Rpb24gbWFrZUxhbmd1YWdlKHZhbHVlOiBzdHJpbmcpIHtcbiAgaWYgKGlzU3VwcG9ydExhbmd1YWdlKHZhbHVlKSlcbiAgICByZXR1cm4gdmFsdWU7XG4gIHRocm93IG5ldyBFcnJvcihgTGFuZ3VhZ2UgXCIke3ZhbHVlfVwiIGlzIG5vdCBzdXBwb3J0ZWRgKTtcbn1cblxuZnVuY3Rpb24gYWRkSW5jbHVkZUltcGwodGFyZ2V0OiBCYXNlVGFyZ2V0LCBzb3VyY2VEaXI6IExvY2F0b3IsIHB1YmxpY09ubHk6IGJvb2xlYW4sIGluY2x1ZGU6IFRhcmdldEluY2x1ZGVzIHwgTG9jYXRvciB8IHN0cmluZyk6IHZvaWQge1xuICBpZiAoaW5jbHVkZSBpbnN0YW5jZW9mIFRhcmdldEluY2x1ZGVzKVxuICAgIHRhcmdldC5hZGRJbmNsdWRlKHB1YmxpY09ubHksIGluY2x1ZGUpO1xuICBlbHNlIGlmICh0eXBlb2YgaW5jbHVkZSA9PT0gXCJzdHJpbmdcIilcbiAgICB0YXJnZXQuYWRkSW5jbHVkZShwdWJsaWNPbmx5LCBEaXJQYXRoLmNyZWF0ZShzb3VyY2VEaXIucmVzb2x2ZShpbmNsdWRlKSkpO1xuICBlbHNlIGlmIChpbmNsdWRlIGluc3RhbmNlb2YgTG9jYXRvcilcbiAgICB0YXJnZXQuYWRkSW5jbHVkZShwdWJsaWNPbmx5LCBEaXJQYXRoLmNyZWF0ZShpbmNsdWRlKSk7XG4gIGVsc2VcbiAgICB0aHJvdyBuZXcgRXJyb3IoYE5vdCBzdXBwb3J0IGluc3RhbmNlICR7aW5jbHVkZX1gKTtcbn1cblxuZnVuY3Rpb24gYWRkSW5jbHVkZXNJbXBsKHRhcmdldDogQmFzZVRhcmdldCwgc2NvcGU6IFN5c3RlbVNjb3BlLCBwdWJsaWNPbmx5OiBib29sZWFuLCAuLi5pbmNsdWRlczogQXJyYXk8VGFyZ2V0SW5jbHVkZXMgfCBMb2NhdG9yIHwgc3RyaW5nPik6IHZvaWQge1xuICBjb25zdCBzb3VyY2VEaXIgPSBzY29wZS5TT1VSQ0VfRElSO1xuICBmb3IgKGNvbnN0IGl0ZXIgb2YgaW5jbHVkZXMuZmxhdCgpKVxuICAgIGFkZEluY2x1ZGVJbXBsKHRhcmdldCwgc291cmNlRGlyLCBwdWJsaWNPbmx5LCBpdGVyKTtcbn1cblxuZnVuY3Rpb24gZW5zdXJlQ21kVmFsdWUodmFsdWU6IGFueSk6IHN0cmluZyB8IFRhcmdldEZpbGUge1xuICBpZiAodHlwZW9mIHZhbHVlID09PSBcInN0cmluZ1wiKVxuICAgIHJldHVybiB2YWx1ZTtcbiAgZWxzZSBpZiAodmFsdWUgaW5zdGFuY2VvZiBUYXJnZXRGaWxlKVxuICAgIHJldHVybiB2YWx1ZTtcbiAgZWxzZSBpZiAodmFsdWUgaW5zdGFuY2VvZiBMb2NhdG9yKVxuICAgIHJldHVybiB2YWx1ZS50b1BhdGgoKTtcbiAgZWxzZVxuICAgIHRocm93IG5ldyBUeXBlRXJyb3IoYFdyb25nIHR5cGUgJHt2YWx1ZX0gZm9yIGNvbW1hbmRgKTtcbn1cblxuZXhwb3J0IGNsYXNzIFVzZXJUYXJnZXRTdHJ1Y3QgZXh0ZW5kcyBJbnRlcmZhY2VUYXJnZXQge1xuICBbSU1QTF06IEJhc2VUYXJnZXQ7XG4gIFtTQ09QRV06IFN5c3RlbVNjb3BlO1xuXG4gIHByaXZhdGUgY29uc3RydWN0b3IoaW1wbDogQmFzZVRhcmdldCwgc2NvcGU6IFN5c3RlbVNjb3BlKSB7XG4gICAgc3VwZXIoKTtcbiAgICB0aGlzW0lNUExdID0gaW1wbDtcbiAgICB0aGlzW1NDT1BFXSA9IHNjb3BlO1xuXG4gICAgdGhpc1tJTVBMXS5zZXRQb3NpdGlvbkluZGVwZW5kZW50Q29kZSh0aGlzW1NDT1BFXS5QT1NJVElPTl9JTkRFUEVOREVOVF9DT0RFKTtcblxuICAgIGFkZEluY2x1ZGVzSW1wbCh0aGlzW0lNUExdLCB0aGlzW1NDT1BFXSwgZmFsc2UsIC4uLnRoaXNbU0NPUEVdLklOQ0xVREVTKTtcbiAgfVxuXG4gIHB1YmxpYyBzdGF0aWMgY3JlYXRlKGltcGw6IEJhc2VUYXJnZXQsIHNjb3BlOiBTeXN0ZW1TY29wZSwgLi4uc291cmNlczogYW55W10pIHtcbiAgICBjb25zdCB0YXJnZXQgPSBPYmplY3Quc2VhbChuZXcgVXNlclRhcmdldFN0cnVjdChpbXBsLCBzY29wZSkpO1xuICAgIHRhcmdldC5hZGRTb3VyY2VzKC4uLnNvdXJjZXMpO1xuICAgIHJldHVybiB0YXJnZXQ7XG4gIH1cblxuICBwdWJsaWMgZ2V0IHRhcmdldE5hbWUoKSB7XG4gICAgcmV0dXJuIHRoaXNbSU1QTF0udGFyZ2V0TmFtZTtcbiAgfVxuXG4gIHB1YmxpYyBnZXQgdGFyZ2V0RmlsZSgpIHtcbiAgICByZXR1cm4gdGhpc1tJTVBMXS50YXJnZXRGaWxlO1xuICB9XG5cbiAgcHVibGljIGdldCBpbmNsdWRlcygpIHtcbiAgICByZXR1cm4gdGhpc1tJTVBMXS5pbmNsdWRlcztcbiAgfVxuXG4gIHB1YmxpYyBnZXQgb2JqZWN0cygpIHtcbiAgICByZXR1cm4gdGhpc1tJTVBMXS5vYmplY3RzO1xuICB9XG4gIFxuICBwdWJsaWMgc2V0UHJlZml4KHZhbHVlOiBhbnkpOiB2b2lkIHtcbiAgICB0aGlzW0lNUExdLnNldFByZWZpeChlbnN1cmVTdHJpbmcodmFsdWUpKTtcbiAgfVxuXG4gIHB1YmxpYyBzZXRTdWZmaXgodmFsdWU6IGFueSk6IHZvaWQge1xuICAgIHRoaXNbSU1QTF0uc2V0U3VmZml4KGVuc3VyZVN0cmluZyh2YWx1ZSkpO1xuICB9XG5cbiAgcHVibGljIHNldE91dHB1dE5hbWUodmFsdWU6IGFueSk6IHZvaWQge1xuICAgIHRoaXNbSU1QTF0uc2V0T3V0cHV0TmFtZShlbnN1cmVTdHJpbmcodmFsdWUpKTtcbiAgfVxuXG4gIHB1YmxpYyBhZGRTb3VyY2VzKC4uLnNvdXJjZXM6IEFycmF5PFRhcmdldE9iamVjdHMgfCBTb3VyY2VGaWxlIHwgTG9jYXRvciB8IHN0cmluZz4pOiB2b2lkIHtcbiAgICBjb25zdCBzY29wZSA9IHRoaXNbU0NPUEVdO1xuICAgIGZvciAoY29uc3QgaXRlciBvZiBzb3VyY2VzLmZsYXQoKSkge1xuICAgICAgaWYgKHR5cGVvZiBpdGVyID09PSBcInN0cmluZ1wiIHx8IGl0ZXIgaW5zdGFuY2VvZiBMb2NhdG9yKSB7XG4gICAgICAgIGNvbnN0IGZpbGVuYW1lID0gc2NvcGUuU09VUkNFX0RJUi5yZXNvbHZlKGl0ZXIpO1xuICAgICAgICBjb25zdCBsYW5ndWFnZSA9IGdldEZpbGVMYW5ndWFnZShmaWxlbmFtZS50b1BhdGgoKSk7XG4gICAgICAgIGxldCBjb21waWxlclBhdGggPSBcIlwiO1xuICAgICAgICBjb25zdCBjb21waWxlckZsYWdzID0gW107XG5cbiAgICAgICAgaWYgKGxhbmd1YWdlKSB7XG4gICAgICAgICAgY29tcGlsZXJQYXRoID0gKHNjb3BlIGFzIGFueSlbbGFuZ3VhZ2UgKyBcIl9DT01QSUxFUlwiXTtcbiAgICAgICAgICBjb25zdCBDT01QSUxFUl9GTEFHUzEgPSAoc2NvcGUgYXMgYW55KVtgJHtsYW5ndWFnZX1fRkxBR1NgXVxuICAgICAgICAgIGlmIChDT01QSUxFUl9GTEFHUzEpIHtcbiAgICAgICAgICAgIGNvbXBpbGVyRmxhZ3MucHVzaCguLi5DT01QSUxFUl9GTEFHUzEpO1xuICAgICAgICAgIH1cblxuICAgICAgICAgIGNvbnN0IENPTVBJTEVSX0ZMQUdTMiA9IChzY29wZSBhcyBhbnkpW2Ake2xhbmd1YWdlfV9GTEFHU18ke3Njb3BlLkJVSUxEX1RZUEUudG9VcHBlckNhc2UoKX1gXVxuICAgICAgICAgIGlmIChDT01QSUxFUl9GTEFHUzIpIHtcbiAgICAgICAgICAgIGNvbXBpbGVyRmxhZ3MucHVzaCguLi5DT01QSUxFUl9GTEFHUzIpO1xuICAgICAgICAgIH1cblxuICAgICAgICAgIGlmICghdGhpc1tJTVBMXS5sYW5ndWFnZSB8fCAodGhpc1tJTVBMXS5sYW5ndWFnZSA9PT0gXCJDXCIgJiYgbGFuZ3VhZ2UgPT09IFwiQ1hYXCIpKSB7XG4gICAgICAgICAgICB0aGlzW0lNUExdLmxhbmd1YWdlID0gbGFuZ3VhZ2U7XG4gICAgICAgICAgICB0aGlzW0lNUExdLmNvbXBpbGVyUGF0aCA9IGNvbXBpbGVyUGF0aDtcbiAgICAgICAgICAgIHRoaXNbSU1QTF0uY29tcGlsZXJGbGFncyA9IFsgLi4uY29tcGlsZXJGbGFncyBdO1xuICAgICAgICAgIH1cbiAgICAgICAgfVxuXG4gICAgICAgIGNvbnN0IHNvdXJjZSA9IFNvdXJjZUZpbGUuY3JlYXRlKGZpbGVuYW1lLCBzY29wZS5TT1VSQ0VfRElSLCAhbGFuZ3VhZ2UsIGxhbmd1YWdlLCBjb21waWxlclBhdGgsIGNvbXBpbGVyRmxhZ3MpO1xuICAgICAgICB0aGlzW0lNUExdLmFkZFNvdXJjZShzb3VyY2UpO1xuICAgICAgfVxuICAgICAgZWxzZSBpZiAoaXRlciBpbnN0YW5jZW9mIFRhcmdldE9iamVjdHMpXG4gICAgICAgIHRoaXNbSU1QTF0uYWRkU291cmNlKGl0ZXIpO1xuICAgICAgZWxzZSBpZiAoaXRlciBpbnN0YW5jZW9mIFNvdXJjZUZpbGUpXG4gICAgICAgIHRoaXNbSU1QTF0uYWRkU291cmNlKGl0ZXIpO1xuICAgICAgZWxzZVxuICAgICAgICB0aHJvdyBuZXcgRXJyb3IoYE5vdCBzdXBwb3J0IGluc3RhbmNlICR7aXRlcn1gKTtcbiAgICB9XG4gIH1cbiAgXG4gIHB1YmxpYyBnZXRTb3VyY2VGaWxlcyguLi5zb3VyY2VzOiBhbnlbXSk6IFVzZXJTb3VyY2VGaWxlcyB7XG4gICAgY29uc3QgcmVzdWx0ID0gW107XG4gICAgY29uc3Qgc2NvcGUgPSB0aGlzW1NDT1BFXTtcbiAgICBjb25zdCBzb3VyY2VGaWxlcyA9IHRoaXNbSU1QTF0uZ2V0U291cmNlRmlsZXMoKTtcbiAgICBmb3IgKGNvbnN0IGl0IG9mIHNvdXJjZXMuZmxhdCgpKSB7XG4gICAgICBjb25zdCBmaWxlbmFtZSA9IHNjb3BlLlNPVVJDRV9ESVIucmVzb2x2ZShpdCkudG9QYXRoKCk7XG4gICAgICBjb25zdCBzcmMgPSBzb3VyY2VGaWxlcy5maW5kKGkgPT4gaS5GSUxFLnRvUGF0aCgpID09PSBmaWxlbmFtZSk7XG4gICAgICBpZiAoIXNyYylcbiAgICAgICAgdGhyb3cgbmV3IEVycm9yKGBDYW5ub3QgZmluZCBcIiR7aXR9XCJgKTtcbiAgICAgIHJlc3VsdC5wdXNoKHNyYyk7XG4gICAgfVxuICAgIFxuICAgIHJldHVybiBVc2VyU291cmNlRmlsZXMuY3JlYXRlKHRoaXNbSU1QTF0sIHJlc3VsdC5sZW5ndGggPyByZXN1bHQgOiBzb3VyY2VGaWxlcyk7XG4gIH1cblxuICBwdWJsaWMgYWRkSW5jbHVkZXMoLi4uaW5jbHVkZXM6IEFycmF5PFRhcmdldEluY2x1ZGVzIHwgTG9jYXRvciB8IHN0cmluZz4pOiB2b2lkIHtcbiAgICBhZGRJbmNsdWRlc0ltcGwodGhpc1tJTVBMXSwgdGhpc1tTQ09QRV0sIGZhbHNlLCAuLi5pbmNsdWRlcyk7XG4gIH1cblxuICBwdWJsaWMgYWRkTGlicmFyaWVzKC4uLmxpYnJhcmllczogYW55W10pOiB2b2lkIHtcbiAgICB0aGlzW0lNUExdLmFkZExpYnJhcmllcyguLi5saWJyYXJpZXMpO1xuICB9XG5cbiAgcHVibGljIGFkZENvbXBpbGVPcHRpb25zKC4uLm9wdGlvbnM6IGFueVtdKTogdm9pZCB7XG4gICAgZm9yIChjb25zdCBpdGVyIG9mIFRhcmdldEhlbHBlci5ub3JtYWxpemVDb21waWxlT3B0aW9ucyhvcHRpb25zLmZsYXQoKSkpXG4gICAgICB0aGlzW0lNUExdLmFkZENvbXBpbGVPcHRpb24oZmFsc2UsIGl0ZXIpO1xuICB9XG5cbiAgcHVibGljIGFkZExpbmtPcHRpb25zKC4uLm9wdGlvbnM6IGFueVtdKTogdm9pZCB7XG4gICAgdGhpc1tJTVBMXS5hZGRMaW5rT3B0aW9ucyguLi5vcHRpb25zKTtcbiAgfVxuXG4gIHB1YmxpYyBhZGREZWZpbml0aW9ucyguLi5kZWZpbml0aW9uczogYW55W10pOiB2b2lkIHtcbiAgICBmb3IgKGNvbnN0IGl0ZXIgb2YgVGFyZ2V0SGVscGVyLm5vcm1hbGl6ZURlZmluaXRpb25zKGRlZmluaXRpb25zLmZsYXQoKSkpXG4gICAgICB0aGlzW0lNUExdLmFkZERlZmluaXRpb24oZmFsc2UsIGl0ZXIpO1xuICB9XG5cbiAgcHVibGljIGFkZFByZUJ1aWxkKGNvbW1hbmQ6IGFueSwgYXJnczogYW55W10pOiB2b2lkIHtcbiAgICB0aGlzW0lNUExdLmFkZFByZUJ1aWxkKGVuc3VyZUNtZFZhbHVlKGNvbW1hbmQpLCBhcmdzLm1hcChpID0+IGVuc3VyZUNtZFZhbHVlKGkpKSk7XG4gIH1cblxuICBwdWJsaWMgYWRkUG9zdEJ1aWxkKGNvbW1hbmQ6IGFueSwgYXJnczogYW55W10pOiB2b2lkIHtcbiAgICB0aGlzW0lNUExdLmFkZFBvc3RCdWlsZChlbnN1cmVDbWRWYWx1ZShjb21tYW5kKSwgYXJncy5tYXAoaSA9PiBlbnN1cmVDbWRWYWx1ZShpKSkpO1xuICB9XG5cbiAgcHVibGljIHNldFBvc2l0aW9uSW5kZXBlbmRlbnRDb2RlKHZhbHVlOiBib29sZWFuKTogdm9pZCB7XG4gICAgdGhpc1tJTVBMXS5zZXRQb3NpdGlvbkluZGVwZW5kZW50Q29kZSh2YWx1ZSk7XG4gIH1cblxuICBwdWJsaWMgYWRkUHVibGljSW5jbHVkZXMoLi4uaW5jbHVkZXM6IEFycmF5PFRhcmdldEluY2x1ZGVzIHwgTG9jYXRvciB8IHN0cmluZz4pOiB2b2lkIHtcbiAgICBhZGRJbmNsdWRlc0ltcGwodGhpc1tJTVBMXSwgdGhpc1tTQ09QRV0sIHRydWUsIC4uLmluY2x1ZGVzKTtcbiAgfVxuXG4gIHB1YmxpYyBhZGRQdWJsaWNEZWZpbml0aW9ucyguLi5kZWZpbml0aW9uczogYW55KTogdm9pZCB7XG4gICAgZm9yIChjb25zdCBpdGVyIG9mIFRhcmdldEhlbHBlci5ub3JtYWxpemVEZWZpbml0aW9ucyhkZWZpbml0aW9ucy5mbGF0KCkpKVxuICAgICAgdGhpc1tJTVBMXS5hZGREZWZpbml0aW9uKHRydWUsIGl0ZXIpO1xuICB9XG5cbiAgcHVibGljIGFkZFB1YmxpY0xpYnJhcmllcyguLi5saWJyYXJpZXM6IGFueVtdKTogdm9pZCB7XG4gICAgdGhpc1tJTVBMXS5hZGRQdWJsaWNMaWJyYXJpZXMoLi4ubGlicmFyaWVzKTtcbiAgfVxuXG4gIHB1YmxpYyBhZGRQdWJsaWNDb21waWxlT3B0aW9ucyguLi5vcHRpb25zOiBhbnlbXSk6IHZvaWQge1xuICAgIGZvciAoY29uc3QgaXRlciBvZiBUYXJnZXRIZWxwZXIubm9ybWFsaXplQ29tcGlsZU9wdGlvbnMob3B0aW9ucy5mbGF0KCkpKVxuICAgICAgdGhpc1tJTVBMXS5hZGRDb21waWxlT3B0aW9uKHRydWUsIGl0ZXIpO1xuICB9XG5cbiAgcHVibGljIGFkZFB1YmxpY0xpbmtPcHRpb25zKC4uLm9wdGlvbnM6IGFueVtdKTogdm9pZCB7XG4gICAgdGhpc1tJTVBMXS5hZGRQdWJsaWNMaW5rT3B0aW9ucyguLi5vcHRpb25zKTtcbiAgfVxufTtcbiIsIi8qXG4gKiBNSVQgTGljZW5zZVxuICpcbiAqIENvcHlyaWdodCAoYykgMjAyNSAgWXVyaWkgWWFrdWJpbiAoeXVyaWkueWFrdWJpbkBnbWFpbC5jb20pXG4gKlxuICogUGVybWlzc2lvbiBpcyBncmFudGVkIHRvIHVzZSwgY29weSwgbW9kaWZ5LCBhbmQgZGlzdHJpYnV0ZSB0aGlzIHNvZnR3YXJlXG4gKiB1bmRlciB0aGUgTUlUIExpY2Vuc2UuIFNlZSBMSUNFTlNFIGZpbGUgZm9yIGRldGFpbHMuXG4gKi9cblxuaW1wb3J0IHBhdGggZnJvbSBcIm5vZGU6cGF0aFwiO1xuXG5leHBvcnQgZnVuY3Rpb24gZmlsZW5hbWVUb1ByYWdtYU9uY2VNYWNybyhmaWxlcGF0aDogc3RyaW5nLCBkZWVwOiBudW1iZXIpIHtcbiAgaWYgKHR5cGVvZiBkZWVwID09PSAndW5kZWZpbmVkJylcbiAgICBkZWVwID0gMztcblxuICBsZXQgY29tcG9uZW50cyA9IHBhdGgubm9ybWFsaXplKGZpbGVwYXRoKS5zcGxpdChwYXRoLnNlcCk7XG4gIGlmIChjb21wb25lbnRzLmxlbmd0aCA+IGRlZXApXG4gICAgY29tcG9uZW50cyA9IGNvbXBvbmVudHMuc2xpY2UoY29tcG9uZW50cy5sZW5ndGggLSBkZWVwKTtcblxuICByZXR1cm4gXCJfXCIgKyBjb21wb25lbnRzLmpvaW4oJ18nKS5yZXBsYWNlKC9bLSAuOiV+XS9nLCAnXycpLnRvVXBwZXJDYXNlKCk7XG59XG5cbmV4cG9ydCBmdW5jdGlvbiBsaW5lVG9TaW5nbENvbW1lbnQobGluZTogc3RyaW5nKSB7XG4gIHJldHVybiBcIi8vXCIgKyBsaW5lO1xufVxuXG5leHBvcnQgZnVuY3Rpb24gbGluZVRvTXVsdGlwbGVDb21tZW50KGxpbmU6IHN0cmluZykge1xuICByZXR1cm4gYC8qICR7bGluZX0gKi9gO1xufVxuXG5leHBvcnQgZnVuY3Rpb24gZ2VuZXJhdGVkU2NyaXB0TmFtZUNvbW1lbnQoZmlsZW5hbWU6IHN0cmluZykge1xuICByZXR1cm4gbGluZVRvTXVsdGlwbGVDb21tZW50KFwiR2VuZXJhdGVkIGZyb20gXCIgKyBwYXRoLmJhc2VuYW1lKGZpbGVuYW1lKSk7XG59XG4iLCIvKlxuICogTUlUIExpY2Vuc2VcbiAqXG4gKiBDb3B5cmlnaHQgKGMpIDIwMjUgIFl1cmlpIFlha3ViaW4gKHl1cmlpLnlha3ViaW5AZ21haWwuY29tKVxuICpcbiAqIFBlcm1pc3Npb24gaXMgZ3JhbnRlZCB0byB1c2UsIGNvcHksIG1vZGlmeSwgYW5kIGRpc3RyaWJ1dGUgdGhpcyBzb2Z0d2FyZVxuICogdW5kZXIgdGhlIE1JVCBMaWNlbnNlLiBTZWUgTElDRU5TRSBmaWxlIGZvciBkZXRhaWxzLlxuICovXG5cbmV4cG9ydCBpbnRlcmZhY2UgSUxvZ2dlciB7XG4gIGRlYnVnKG1lc3NhZ2U/OiBhbnksIC4uLnBhcmFtczogYW55W10pOiB2b2lkO1xuICBpbmZvKG1lc3NhZ2U/OiBhbnksIC4uLnBhcmFtczogYW55W10pOiB2b2lkO1xuICBub3RpY2UobWVzc2FnZT86IGFueSwgLi4ucGFyYW1zOiBhbnlbXSk6IHZvaWQ7XG4gIHdhcm4obWVzc2FnZT86IGFueSwgLi4ucGFyYW1zOiBhbnlbXSk6IHZvaWQ7XG4gIGVycm9yKG1lc3NhZ2U/OiBhbnksIC4uLnBhcmFtczogYW55W10pOiB2b2lkO1xuICBmYXRhbChtZXNzYWdlPzogYW55LCAuLi5wYXJhbXM6IGFueVtdKTogdm9pZDtcbn07XG5cbnR5cGUgTG9nZ2VySGFuZGxlciA9IChtZXNzYWdlPzogYW55LCAuLi5wYXJhbXM6IGFueVtdKSA9PiB2b2lkOztcblxuaW50ZXJmYWNlIEVudHJ5TG9nZ2VyIHtcbiAgdGFnTmFtZTogc3RyaW5nO1xuICBmaWx0ZXI6IHN0cmluZztcbiAgbG9nZ2VyOiBJTG9nZ2VyO1xufTtcblxuY29uc3QgU0VQQVJBVE9SID0gXCIgXCI7XG5jb25zdCBNRVNTQUdFX01BWCA9IDI0MDtcblxuZnVuY3Rpb24gdG9NZXNzYWdlU3RyaW5nKG86IGFueSkge1xuICByZXR1cm4gKHR5cGVvZiBvID09PSBcInN0cmluZ1wiKSA/IG8gOiBKU09OLnN0cmluZ2lmeShvKTtcbn1cblxuZnVuY3Rpb24qIG1lc3NhZ2VHZW5lcmF0b3IobWVzc2FnZXM6IHN0cmluZ1tdLCBtYXhMZW5ndGg6IG51bWJlcikge1xuICBsZXQgbGVuZ3RoID0gMDtcbiAgY29uc3QgbXNnTGlzdDogc3RyaW5nW10gPSBbXTtcblxuICBmb3IgKDs7KSB7XG4gICAgY29uc3QgaXRlciA9IG1lc3NhZ2VzLnNoaWZ0KCk7XG4gICAgaWYgKCFpdGVyKVxuICAgICAgYnJlYWs7XG5cbiAgICBpZiAobXNnTGlzdC5sZW5ndGgpXG4gICAgICBsZW5ndGggKz0gU0VQQVJBVE9SLmxlbmd0aDtcblxuICAgIG1zZ0xpc3QucHVzaChpdGVyKTtcbiAgICBsZW5ndGggKz0gaXRlci5sZW5ndGg7XG5cbiAgICB3aGlsZSAobGVuZ3RoID4gbWF4TGVuZ3RoKSB7XG4gICAgICBjb25zdCBtc2cgPSBtc2dMaXN0LmpvaW4oU0VQQVJBVE9SKTtcbiAgICAgIGNvbnN0IG5leHRNc2cgPSBtc2cuc3Vic3RyaW5nKG1heExlbmd0aCk7XG4gICAgICBtc2dMaXN0Lmxlbmd0aCA9IDA7XG4gICAgICBtc2dMaXN0LnB1c2gobmV4dE1zZyk7XG4gICAgICBsZW5ndGggPSBuZXh0TXNnLmxlbmd0aDtcbiAgICAgIHlpZWxkIG1zZy5zdWJzdHJpbmcoMCwgbWF4TGVuZ3RoKTtcbiAgICB9XG4gIH1cblxuICB5aWVsZCBtc2dMaXN0LmpvaW4oU0VQQVJBVE9SKTtcbn1cblxuZnVuY3Rpb24gbWFrZUxvZ01ldGhvZCh3aXRoUHJlZml4OiBib29sZWFuLCB0eXBlOiBzdHJpbmcsIHRhZ05hbWU6IHN0cmluZywgdGFyZ2V0OiBhbnksIGhhbmRsZXI6IExvZ2dlckhhbmRsZXIpIHtcbiAgcmV0dXJuICguLi5hcmdzOiBhbnlbXSkgPT4ge1xuICAgIGNvbnN0IG5vdyA9IG5ldyBEYXRlKCk7XG4gICAgY29uc3QgbWVzc2FnZXMgPSBhcmdzLm1hcChpID0+IHRvTWVzc2FnZVN0cmluZyhpKSlcblxuICAgIGlmICghd2l0aFByZWZpeCkge1xuICAgICAgaGFuZGxlci5jYWxsKHRhcmdldCwgbWVzc2FnZXMuam9pbihTRVBBUkFUT1IpKTtcbiAgICAgIHJldHVybjtcbiAgICB9XG5cbiAgICBjb25zdCBwcmVmaXggPSBbIG5vdy50b0lTT1N0cmluZygpLCB0eXBlLCB0YWdOYW1lIF0uam9pbihTRVBBUkFUT1IpO1xuICAgIGZvciAoY29uc3QgaXRlciBvZiBtZXNzYWdlR2VuZXJhdG9yKG1lc3NhZ2VzLCBNRVNTQUdFX01BWCAtIHByZWZpeC5sZW5ndGggLSBTRVBBUkFUT1IubGVuZ3RoKSkge1xuICAgICAgaGFuZGxlci5jYWxsKHRhcmdldCwgW3ByZWZpeCwgaXRlcl0uam9pbihTRVBBUkFUT1IpKTtcbiAgICB9XG4gIH07XG59XG5cbmxldCBfZGVmYXVsdFBhdHRlcm4gPSBcIlwiO1xuY29uc3QgX2xvZ2dlck1hcCA9IG5ldyBNYXA8c3RyaW5nLCBFbnRyeUxvZ2dlcj4oKTtcblxuY29uc3Qgc3R1YiA9ICgpID0+IHt9O1xuXG5mdW5jdGlvbiBpbml0TG9nZ2VyKGxvZ2dlcjogSUxvZ2dlciwgdGFnTmFtZTogc3RyaW5nLCBmaWx0ZXI6IHN0cmluZykge1xuICBsb2dnZXIuZGVidWcgPSBzdHViO1xuICBsb2dnZXIuaW5mbyA9IHN0dWI7XG4gIGxvZ2dlci5ub3RpY2UgPSBzdHViO1xuICBsb2dnZXIud2FybiA9IHN0dWI7XG4gIGxvZ2dlci5lcnJvciA9IHN0dWI7XG4gIGxvZ2dlci5mYXRhbCA9IHN0dWI7XG5cbiAgbGV0IGxldmVsID0gMDtcbiAgY29uc3QgZmxhZ3M6IGFueSA9IHt9O1xuICBmb3IgKGNvbnN0IGl0ZXIgb2YgZmlsdGVyLnNwbGl0KFwiLFwiKSkge1xuICAgIGlmIChpdGVyID09PSBcIipcIikge1xuICAgICAgbGV2ZWwgPSA1O1xuICAgICAgYnJlYWs7XG4gICAgfVxuICAgIGlmICgvXlxcZCskLy50ZXN0KGl0ZXIpKVxuICAgICAgbGV2ZWwgPSBNYXRoLm1heChsZXZlbCwgcGFyc2VJbnQoaXRlcikpO1xuICAgIGVsc2VcbiAgICAgIGZsYWdzW2l0ZXJdID0gdHJ1ZTtcbiAgfVxuXG4gIGxvZ2dlci5mYXRhbCA9IG1ha2VMb2dNZXRob2QobGV2ZWwgPiAyLCBcIkZcIiwgdGFnTmFtZSwgY29uc29sZSwgY29uc29sZS5lcnJvcik7XG5cbiAgaWYgKGxldmVsID4gMSB8fCBmbGFncy5lcnJvcilcbiAgICBsb2dnZXIuZXJyb3IgPSBtYWtlTG9nTWV0aG9kKGxldmVsID4gMiwgXCJFXCIsIHRhZ05hbWUsIGNvbnNvbGUsIGNvbnNvbGUuZXJyb3IpO1xuXG4gIGlmIChsZXZlbCA+IDIgfHwgZmxhZ3Mud2FybilcbiAgICBsb2dnZXIud2FybiA9IG1ha2VMb2dNZXRob2QobGV2ZWwgPiAyLCBcIldcIiwgdGFnTmFtZSwgY29uc29sZSwgY29uc29sZS53YXJuKTtcblxuICBsb2dnZXIubm90aWNlID0gbWFrZUxvZ01ldGhvZChsZXZlbCA+IDIsIFwiTlwiLCB0YWdOYW1lLCBjb25zb2xlLCBjb25zb2xlLmxvZyk7XG5cbiAgaWYgKGxldmVsID4gMyB8fCBmbGFncy5pbmZvKVxuICAgIGxvZ2dlci5pbmZvID0gbWFrZUxvZ01ldGhvZChsZXZlbCA+IDIsIFwiSVwiLCB0YWdOYW1lLCBjb25zb2xlLCBjb25zb2xlLmluZm8pO1xuXG4gIGlmIChsZXZlbCA+IDQgfHwgZmxhZ3MuZGVidWcpXG4gICAgbG9nZ2VyLmRlYnVnID0gbWFrZUxvZ01ldGhvZChsZXZlbCA+IDIsIFwiRFwiLCB0YWdOYW1lLCBjb25zb2xlLCBjb25zb2xlLmRlYnVnKTtcbn1cblxuZnVuY3Rpb24gY3JlYXRlRW50cnkodGFnTmFtZTogc3RyaW5nLCBmaWx0ZXI6IHN0cmluZykge1xuICBjb25zdCBlbnRyeSA9IHsgdGFnTmFtZSwgZmlsdGVyLCBsb2dnZXI6IHt9IGFzIElMb2dnZXIgfTtcbiAgaW5pdExvZ2dlcihlbnRyeS5sb2dnZXIsIHRhZ05hbWUsIGZpbHRlcik7XG4gIHJldHVybiBlbnRyeTtcbn1cblxuZnVuY3Rpb24gZW50cnlTZXRGaWx0ZXIoZW50cnk6IEVudHJ5TG9nZ2VyLCBmaWx0ZXI6IHN0cmluZykge1xuICBpZiAoZW50cnkuZmlsdGVyICE9PSBmaWx0ZXIpIHtcbiAgICBpbml0TG9nZ2VyKGVudHJ5LmxvZ2dlciwgZW50cnkudGFnTmFtZSwgZmlsdGVyKTtcbiAgICBlbnRyeS5maWx0ZXIgPSBmaWx0ZXI7XG4gIH1cbn1cblxuZnVuY3Rpb24gYWxsU2V0RmlsdGVyKGZpbHRlcjogc3RyaW5nKSB7XG4gIF9kZWZhdWx0UGF0dGVybiA9IGZpbHRlcjtcbiAgZm9yIChjb25zdCBlbnRyeSBvZiBfbG9nZ2VyTWFwLnZhbHVlcygpKVxuICAgIGVudHJ5U2V0RmlsdGVyKGVudHJ5LCBmaWx0ZXIpO1xufVxuXG5leHBvcnQgbmFtZXNwYWNlIExvZ2dlciB7XG5cbmV4cG9ydCBmdW5jdGlvbiBjcmVhdGUodXJsOiBzdHJpbmcpOiBJTG9nZ2VyIHtcbiAgY29uc3QgdGFnTmFtZSA9IHVybC5zdGFydHNXaXRoKEhPU1RfU09VUkNFX1VSTCArIFwiL1wiKSA/IHVybC5zdWJzdHJpbmcoSE9TVF9TT1VSQ0VfVVJMLmxlbmd0aCArIDEpIDogdXJsO1xuICBpZiAoIXRhZ05hbWUgfHwgdGFnTmFtZSA9PT0gXCIqXCIpXG4gICAgdGhyb3cgbmV3IEVycm9yKGBMb2dnZXIgJHt1cmx9IG5vdCBhbGxvd2VkYCk7XG5cbiAgbGV0IGVudHJ5ID0gX2xvZ2dlck1hcC5nZXQodGFnTmFtZSk7XG4gIGlmICghZW50cnkpIHtcbiAgICBlbnRyeSA9IGNyZWF0ZUVudHJ5KHRhZ05hbWUsIF9kZWZhdWx0UGF0dGVybik7XG4gICAgX2xvZ2dlck1hcC5zZXQodGFnTmFtZSwgZW50cnkpO1xuICB9XG5cbiAgcmV0dXJuIGVudHJ5LmxvZ2dlcjtcbn1cblxuZXhwb3J0IGZ1bmN0aW9uIGVuYWJsZShmaWx0ZXI6IHN0cmluZykge1xuICBpZiAoZmlsdGVyID09PSBcIipcIikge1xuICAgIGFsbFNldEZpbHRlcihcIipcIik7XG4gICAgcmV0dXJuO1xuICB9XG5cbiAgY29uc3QgcGFpciA9IGZpbHRlci5zcGxpdChcIjpcIik7XG4gIGlmIChwYWlyLmxlbmd0aCA8IDIpXG4gICAgcmV0dXJuO1xuXG4gIGlmIChwYWlyWzBdID09PSBcIipcIikge1xuICAgIGFsbFNldEZpbHRlcihwYWlyWzFdKTtcbiAgICByZXR1cm47XG4gIH1cblxuICBsZXQgZW50cnkgPSBfbG9nZ2VyTWFwLmdldChwYWlyWzBdKTtcbiAgaWYgKCFlbnRyeSkge1xuICAgIGVudHJ5ID0gY3JlYXRlRW50cnkocGFpclswXSwgcGFpclsxXSk7XG4gICAgX2xvZ2dlck1hcC5zZXQoZmlsdGVyLCBlbnRyeSk7XG4gIH1cbiAgZWxzZSAge1xuICAgIGVudHJ5U2V0RmlsdGVyKGVudHJ5LCBwYWlyWzFdKTtcbiAgfVxufVxuXG59IC8vIG5hbWVzcGFjZSBMb2dnZXJcblxuZm9yIChjb25zdCBpdGVyIG9mIExPR0dFUl9ERUJVRykge1xuICBMb2dnZXIuZW5hYmxlKGl0ZXIpO1xufVxuIiwiLypcbiAqIE1JVCBMaWNlbnNlXG4gKlxuICogQ29weXJpZ2h0IChjKSAyMDI1ICBZdXJpaSBZYWt1YmluICh5dXJpaS55YWt1YmluQGdtYWlsLmNvbSlcbiAqXG4gKiBQZXJtaXNzaW9uIGlzIGdyYW50ZWQgdG8gdXNlLCBjb3B5LCBtb2RpZnksIGFuZCBkaXN0cmlidXRlIHRoaXMgc29mdHdhcmVcbiAqIHVuZGVyIHRoZSBNSVQgTGljZW5zZS4gU2VlIExJQ0VOU0UgZmlsZSBmb3IgZGV0YWlscy5cbiAqL1xuXG5pbXBvcnQgeyBKU09OUlBDX1ZFUlNJT04sIEpzb25ScGNEYXRhLCBKc29uUnBjUmVxdWVzdEhhbmRsZXIsIElKc29uUnBjUmVxdWVzdCwgSUpzb25ScGNSZXNwb25zZSwgSnNvblJwY0RhdGFDYWxsYmFjaywgSnNvblJwY0NhbGxiYWNrIH0gZnJvbSBcIkAvc2VydmVyL1RyYW5zcG9ydFwiO1xuaW1wb3J0IHsgTG9nZ2VyIH0gZnJvbSBcIkAvbG9nZ2VyXCI7XG5cbmNvbnN0IGxvZ2dlciA9IExvZ2dlci5jcmVhdGUoaW1wb3J0Lm1ldGEudXJsKTtcblxuY2xhc3MgSnNvblJwY1JlcXVlc3QgaW1wbGVtZW50cyBJSnNvblJwY1JlcXVlc3Qge1xuICBwcml2YXRlIF9wYXJhbXM6IGFueTtcblxuICBjb25zdHJ1Y3RvcihwYXJhbXM6IGFueSkge1xuICAgIHRoaXMuX3BhcmFtcyA9IHBhcmFtcztcbiAgfVxuXG4gIGdldCBwYXJhbXMoKTogYW55IHtcbiAgICByZXR1cm4gdGhpcy5fcGFyYW1zO1xuICB9XG59XG5cbmNsYXNzIEpzb25ScGNSZXNwb25zZSBpbXBsZW1lbnRzIElKc29uUnBjUmVzcG9uc2Uge1xuICBwcml2YXRlIF9pZDogbnVtYmVyIHwgbnVsbDtcbiAgcHJpdmF0ZSBfY2FsbGJhY2s6IEpzb25ScGNEYXRhQ2FsbGJhY2s7XG5cbiAgcHVibGljIGNvbnN0cnVjdG9yKGlkOiBudW1iZXIgfCBudWxsLCBjYWxsYmFjazogSnNvblJwY0RhdGFDYWxsYmFjaykge1xuICAgIHRoaXMuX2lkID0gaWQ7XG4gICAgdGhpcy5fY2FsbGJhY2sgPSBjYWxsYmFjaztcbiAgfVxuXG4gIHNlbmRSZXN1bHQocmVzdWx0OiBhbnkpOiB2b2lkIHtcbiAgICBjb25zdCBtZXNzYWdlOiBKc29uUnBjRGF0YSA9IHtcbiAgICAgIGpzb25ycGM6IEpTT05SUENfVkVSU0lPTixcbiAgICAgIHJlc3VsdDogKHJlc3VsdCAhPT0gdW5kZWZpbmVkKSA/IHJlc3VsdCA6IG51bGwsXG4gICAgICBpZDogdGhpcy5faWQsXG4gICAgfTtcbiAgICBsb2dnZXIuZGVidWcoXCI8LS1cIiwgSlNPTi5zdHJpbmdpZnkobWVzc2FnZSkpO1xuICAgIHRoaXMuX2NhbGxiYWNrKG1lc3NhZ2UpO1xuICB9XG5cbiAgc2VuZEVycm9yKGNvZGU6IG51bWJlciwgbWVzc2FnZTogc3RyaW5nLCBkYXRhPzogYW55KTogdm9pZCB7XG4gICAgY29uc3QgZXJyb3I6IGFueSA9IHsgY29kZSwgbWVzc2FnZSB9O1xuICAgIGlmIChkYXRhICE9PSB1bmRlZmluZWQpIHtcbiAgICAgIGVycm9yLmRhdGEgPSBkYXRhO1xuICAgIH1cbiAgICBjb25zdCBtc2c6IEpzb25ScGNEYXRhID0ge1xuICAgICAganNvbnJwYzogSlNPTlJQQ19WRVJTSU9OLFxuICAgICAgZXJyb3IsXG4gICAgICBpZDogdGhpcy5faWQsXG4gICAgfTtcbiAgICBsb2dnZXIuZGVidWcoXCI8LS1cIiwgSlNPTi5zdHJpbmdpZnkobXNnKSk7XG4gICAgdGhpcy5fY2FsbGJhY2sobXNnKTtcbiAgfVxufTtcblxuZXhwb3J0IGNsYXNzIEpzb25ScGNEaXNwYXRjaGVyIHtcbiAgcHJpdmF0ZSBfcmVxdWVzdEhhbmRsZXJzID0gbmV3IE1hcDxzdHJpbmcsIEpzb25ScGNSZXF1ZXN0SGFuZGxlcj47XG5cbiAgcHVibGljIHJlZ2lzdGVySGFuZGxlcihtZXRob2Q6IHN0cmluZywgaGFuZGxlcjogSnNvblJwY1JlcXVlc3RIYW5kbGVyKTogdm9pZCB7XG4gICAgdGhpcy5fcmVxdWVzdEhhbmRsZXJzLnNldChtZXRob2QsIGhhbmRsZXIpO1xuICB9XG5cbiAgcHVibGljIHJlZ2lzdGVyQ2FsbGJhY2sobWV0aG9kOiBzdHJpbmcsIGNhbGxiYWNrOiBKc29uUnBjQ2FsbGJhY2spOiB2b2lkIHtcbiAgICB0aGlzLl9yZXF1ZXN0SGFuZGxlcnMuc2V0KG1ldGhvZCwgYXN5bmMgKHJlcXVlc3QsIHJlc3BvbnNlKSA9PiB7XG4gICAgICBsZXQgcmVzdWx0OiBhbnkgPSBjYWxsYmFjayhyZXF1ZXN0LnBhcmFtcyk7XG4gICAgICBpZiAocmVzdWx0IGluc3RhbmNlb2YgUHJvbWlzZSlcbiAgICAgICAgcmVzdWx0ID0gYXdhaXQgcmVzdWx0O1xuICAgICAgaWYgKHJlc3VsdCAmJiB0eXBlb2YgcmVzdWx0ID09PSBcIm9iamVjdFwiICYmIHR5cGVvZiByZXN1bHQudG9KU09OID09PSBcImZ1bmN0aW9uXCIpXG4gICAgICAgIHJlc3VsdCA9IHJlc3VsdC50b0pTT04oKTtcbiAgICAgIHJlc3BvbnNlLnNlbmRSZXN1bHQocmVzdWx0KTtcbiAgICB9KTtcbiAgfVxuXG4gIHByaXZhdGUgb25NZXNzYWdlKGRhdGE6IEpzb25ScGNEYXRhLCBjYWxsYmFjazogSnNvblJwY0RhdGFDYWxsYmFjayk6IHZvaWQge1xuICAgIGlmIChkYXRhICYmIHR5cGVvZiBkYXRhID09PSBcIm9iamVjdFwiICYmIHR5cGVvZiBkYXRhLmlkID09PSBcIm51bWJlclwiKSB7XG4gICAgICBjb25zdCByZXNwb25zZSA9IG5ldyBKc29uUnBjUmVzcG9uc2UoZGF0YS5pZCwgY2FsbGJhY2spO1xuICAgICAgaWYgKHR5cGVvZiBkYXRhLm1ldGhvZCA9PT0gXCJzdHJpbmdcIikge1xuICAgICAgICBjb25zdCBoYW5kbGVyID0gdGhpcy5fcmVxdWVzdEhhbmRsZXJzLmdldChkYXRhLm1ldGhvZCk7XG4gICAgICAgIGlmIChoYW5kbGVyKVxuICAgICAgICAgIGhhbmRsZXIobmV3IEpzb25ScGNSZXF1ZXN0KGRhdGEucGFyYW1zKSwgcmVzcG9uc2UpO1xuICAgICAgICBlbHNlXG4gICAgICAgICAgcmVzcG9uc2Uuc2VuZEVycm9yKC0zMjYwMSwgXCJNZXRob2Qgbm90IGZvdW5kXCIpO1xuICAgICAgfVxuICAgICAgZWxzZSB7XG4gICAgICAgIHJlc3BvbnNlLnNlbmRFcnJvcigtMzI2MDAsIFwiSW52YWxpZCBSZXF1ZXN0XCIpO1xuICAgICAgfVxuICAgIH1cbiAgICBlbHNlIHtcbiAgICAgIGNvbnN0IHJlc3BvbnNlID0gbmV3IEpzb25ScGNSZXNwb25zZShudWxsLCBjYWxsYmFjayk7XG4gICAgICByZXNwb25zZS5zZW5kRXJyb3IoLTMyNjAwLCBcIkludmFsaWQgUmVxdWVzdFwiKTtcbiAgICB9XG4gIH1cblxuICBwdWJsaWMgcHJlcmZvcm1NZXNzYWdlKG1lc3NhZ2U6IGFueSk6IFByb21pc2U8SnNvblJwY0RhdGEgfCBKc29uUnBjRGF0YVtdPiB7XG4gICAgbG9nZ2VyLmRlYnVnKFwiLS0+XCIsIEpTT04uc3RyaW5naWZ5KG1lc3NhZ2UpKTtcbiAgICByZXR1cm4gbmV3IFByb21pc2UoKHJlc29sdmUpID0+IHtcbiAgICAgIGlmICghQXJyYXkuaXNBcnJheShtZXNzYWdlKSlcbiAgICAgICAgdGhpcy5vbk1lc3NhZ2UobWVzc2FnZSwgcmVzb2x2ZSlcblxuICAgICAgbGV0IGNvdW50ID0gbWVzc2FnZS5sZW5ndGg7XG4gICAgICBjb25zdCByZXN1bHQgPSBuZXcgQXJyYXk8SnNvblJwY0RhdGE+KG1lc3NhZ2UubGVuZ3RoKTtcbiAgICAgIGZvciAobGV0IGkgPSAwOyBpIDwgbWVzc2FnZS5sZW5ndGg7IGkrKykge1xuICAgICAgICB0aGlzLm9uTWVzc2FnZShtZXNzYWdlW2ldLCBkYXRhID0+IHtcbiAgICAgICAgICByZXN1bHRbaV0gPSBkYXRhO1xuICAgICAgICAgIGlmICghLS1jb3VudClcbiAgICAgICAgICAgIHJlc29sdmUocmVzdWx0KTtcbiAgICAgICAgfSk7XG4gICAgICB9XG4gICAgfSk7XG4gIH1cbn07XG4iLCIvKlxuICogTUlUIExpY2Vuc2VcbiAqXG4gKiBDb3B5cmlnaHQgKGMpIDIwMjUgIFl1cmlpIFlha3ViaW4gKHl1cmlpLnlha3ViaW5AZ21haWwuY29tKVxuICpcbiAqIFBlcm1pc3Npb24gaXMgZ3JhbnRlZCB0byB1c2UsIGNvcHksIG1vZGlmeSwgYW5kIGRpc3RyaWJ1dGUgdGhpcyBzb2Z0d2FyZVxuICogdW5kZXIgdGhlIE1JVCBMaWNlbnNlLiBTZWUgTElDRU5TRSBmaWxlIGZvciBkZXRhaWxzLlxuICovXG5cbmltcG9ydCB7IEpTT05SUENfVkVSU0lPTiB9IGZyb20gXCJAL3NlcnZlci9UcmFuc3BvcnRcIjtcbmltcG9ydCB7IElSZXF1ZXN0U3luYyB9IGZyb20gXCJAL3NlcnZlci9UcmFuc3BvcnRcIjtcbmltcG9ydCB7IExvZ2dlciB9IGZyb20gXCJAL2xvZ2dlclwiO1xuXG5jb25zdCBsb2dnZXIgPSBMb2dnZXIuY3JlYXRlKGltcG9ydC5tZXRhLnVybCk7XG5cbmV4cG9ydCBjbGFzcyBKc29uUnBjUmVxdWVzdFN5bmMge1xuICBwcml2YXRlIF9yZXF1ZXN0OiBJUmVxdWVzdFN5bmM7XG4gIHByaXZhdGUgX2lkOiBudW1iZXI7XG5cbiAgcHVibGljIGNvbnN0cnVjdG9yKHJlcXVlc3RTeW5jOiBJUmVxdWVzdFN5bmMpIHtcbiAgICB0aGlzLl9yZXF1ZXN0ID0gcmVxdWVzdFN5bmM7XG4gICAgdGhpcy5faWQgPSAxO1xuICB9XG5cbiAgcHVibGljIHJlcXVlc3RTeW5jKG1ldGhvZDogc3RyaW5nLCBwYXJhbXM6IGFueSk6IGFueSB7XG4gICAgbG9nZ2VyLmRlYnVnKFwiSnNvblJwY1JlcXVlc3RTeW5jLnJlcXVlc3RTeW5jKFwiLCBtZXRob2QsIFwiLi4ucGFyYW1zKVwiKTtcbiAgICBjb25zdCBtZXNzYWdlID0ge1xuICAgICAganNvbnJwYzogSlNPTlJQQ19WRVJTSU9OLFxuICAgICAgbWV0aG9kLFxuICAgICAgcGFyYW1zLFxuICAgICAgaWQ6IHRoaXMuX2lkKyssXG4gICAgfTtcbiAgICBjb25zdCByZXNwb25zZSA9IHRoaXMuX3JlcXVlc3QucmVxdWVzdFN5bmMobWVzc2FnZSk7XG4gICAgaWYgKHJlc3BvbnNlLmVycm9yKVxuICAgICAgdGhyb3cgbmV3IEVycm9yKHJlc3BvbnNlLmVycm9yLm1lc3NhZ2UsIHsgY2F1c2U6IHJlc3BvbnNlLmVycm9yLmNvZGUgfSk7XG4gICAgcmV0dXJuIHJlc3BvbnNlLnJlc3VsdDtcbiAgfVxufTtcbiIsIi8qXG4gKiBNSVQgTGljZW5zZVxuICpcbiAqIENvcHlyaWdodCAoYykgMjAyNSAgWXVyaWkgWWFrdWJpbiAoeXVyaWkueWFrdWJpbkBnbWFpbC5jb20pXG4gKlxuICogUGVybWlzc2lvbiBpcyBncmFudGVkIHRvIHVzZSwgY29weSwgbW9kaWZ5LCBhbmQgZGlzdHJpYnV0ZSB0aGlzIHNvZnR3YXJlXG4gKiB1bmRlciB0aGUgTUlUIExpY2Vuc2UuIFNlZSBMSUNFTlNFIGZpbGUgZm9yIGRldGFpbHMuXG4gKi9cblxuaW1wb3J0IHsgV29ya2VyIH0gZnJvbSBcIm5vZGU6d29ya2VyX3RocmVhZHNcIjtcblxuaW1wb3J0IHsgY3VycmVudFNjcmlwdFVSTCB9IGZyb20gXCJAL3V0aWxzL01vZHVsZVwiO1xuaW1wb3J0IHsgTWVtb3J5TWVzc2FnZVNlbmRlciB9IGZyb20gXCJAL3NlcnZlci9NZW1vcnlUcmFuc3BvcnRcIjtcbmltcG9ydCB7IEpTT05SUENfVkVSU0lPTiB9IGZyb20gXCJAL3NlcnZlci9UcmFuc3BvcnRcIjtcbmltcG9ydCB7IEpzb25ScGNEaXNwYXRjaGVyIH0gZnJvbSBcIkAvc2VydmVyL0pzb25ScGNEaXNwYXRjaGVyXCI7XG5pbXBvcnQgeyBTY29wZUhlbHBlciwgVmFyaWFibGVNYXAgfSBmcm9tIFwiQC9jb3JlL1Njb3BlXCI7XG5pbXBvcnQgeyBNYWluVGFyZ2V0LCBQb3N0VGFyZ2V0IH0gZnJvbSBcIkAvY29yZS9UYXJnZXRcIjtcbmltcG9ydCB7IFBvc3RDdXN0b21TY3JpcHQsIEN1c3RvbVNjcmlwdCB9IGZyb20gXCJAL2NvcmUvQ3VzdG9tU2NyaXB0XCI7XG5pbXBvcnQgeyBJbnN0YWxsRW50aXR5IH0gZnJvbSBcIkAvY29yZS9JbnN0YWxsRW50aXR5XCI7XG5pbXBvcnQgeyBTaW1wbGVPYmplY3QgfSBmcm9tIFwiQC9jb3JlL1NpbXBsZU9iamVjdFwiO1xuaW1wb3J0IHsgTUFLRUNPTlRFWFRfQ1JFQVRFQ09OVEVYVCB9IGZyb20gXCJAL3NlcnZlci9SZW1vdGVNZXRob2RzXCI7XG5pbXBvcnQgeyBNQUtFQ09OVEVYVF9ERVNUUk9ZQ09OVEVYVCB9IGZyb20gXCJAL3NlcnZlci9SZW1vdGVNZXRob2RzXCI7XG5pbXBvcnQgeyBNQUtFQ09OVEVYVF9FWEVDU0NSSVBUIH0gZnJvbSBcIkAvc2VydmVyL1JlbW90ZU1ldGhvZHNcIjtcbmltcG9ydCB7IE1BS0VDT05URVhUX01BSU5UQVJHRVRTIH0gZnJvbSBcIkAvc2VydmVyL1JlbW90ZU1ldGhvZHNcIjtcbmltcG9ydCB7IE1BS0VDT05URVhUX1BPU1RUQVJHRVRTIH0gZnJvbSBcIkAvc2VydmVyL1JlbW90ZU1ldGhvZHNcIjtcbmltcG9ydCB7IE1BS0VDT05URVhUX01BSU5TQ1JJUFRTIH0gZnJvbSBcIkAvc2VydmVyL1JlbW90ZU1ldGhvZHNcIjtcbmltcG9ydCB7IE1BS0VDT05URVhUX1BPU1RTQ1JJUFRTIH0gZnJvbSBcIkAvc2VydmVyL1JlbW90ZU1ldGhvZHNcIjtcbmltcG9ydCB7IE1BS0VDT05URVhUX0lOU1RBTExFTlRSSUVTIH0gZnJvbSBcIkAvc2VydmVyL1JlbW90ZU1ldGhvZHNcIjtcbmltcG9ydCB7IFdPUktFUlNFUlZJQ0VfUFJPQ0VTU0VYSVQgfSBmcm9tIFwiQC9zZXJ2ZXIvUmVtb3RlTWV0aG9kc1wiO1xuaW1wb3J0IHsgTG9nZ2VyIH0gZnJvbSBcIkAvbG9nZ2VyXCI7XG5cbmNvbnN0IGxvZ2dlciA9IExvZ2dlci5jcmVhdGUoaW1wb3J0Lm1ldGEudXJsKTtcblxuaW50ZXJmYWNlIFJlc3BvbnNlRW50cnkge1xuICByZXNvbHZlOiAodmFsdWU6IGFueSkgPT4gdm9pZDtcbiAgcmVqZWN0OiAocmVhc29uPzogYW55KSA9PiB2b2lkO1xufTtcblxuZXhwb3J0IGNsYXNzIFdvcmtlclJwY0NsaWVudCB7XG4gIHByaXZhdGUgX2pzb25ScGNEaXNwYXRjaGVyOiBKc29uUnBjRGlzcGF0Y2hlcjtcbiAgcHJpdmF0ZSBfd29ya2VyOiBXb3JrZXI7XG4gIHByaXZhdGUgX2lkID0gMTtcbiAgcHJpdmF0ZSBfd2FpdFJlc3BvbnNlTWFwID0gbmV3IE1hcDxudW1iZXIsUmVzcG9uc2VFbnRyeT4oKTs7XG5cbiAgcHVibGljIGNvbnN0cnVjdG9yKGpzb25ScGNEaXNwYXRjaGVyOiBKc29uUnBjRGlzcGF0Y2hlcikge1xuICAgIHRoaXMuX2pzb25ScGNEaXNwYXRjaGVyID0ganNvblJwY0Rpc3BhdGNoZXI7XG4gICAgdGhpcy5fd29ya2VyID0gbmV3IFdvcmtlcihjdXJyZW50U2NyaXB0VVJMKCkpO1xuICAgIHRoaXMuX3dvcmtlci5vbihcIm1lc3NhZ2VcIiwgbWVzc2FnZSA9PiB0aGlzLm9uV29ya2VyTWVzc2FnZShtZXNzYWdlKSk7XG4gICAgdGhpcy5fd29ya2VyLm9uKFwiZXJyb3JcIiwgZXJyb3IgPT4gdGhpcy5vbldvcmtlckVycm9yKGVycm9yKSk7XG4gICAgdGhpcy5fd29ya2VyLm9uKFwiZXhpdFwiLCBjb2RlID0+IHRoaXMub25Xb3JrZXJFeGl0KGNvZGUpKTtcbiAgfVxuXG4gIC8qcHVibGljIHN0b3BTZXJ2ZXIoKTogUHJvbWlzZTxudW1iZXI+IHtcbiAgICByZXR1cm4gdGhpcy5fd29ya2VyLnRlcm1pbmF0ZSgpO1xuICB9Ki9cblxuICBwdWJsaWMgYXN5bmMgcmVxdWVzdChtZXRob2Q6IHN0cmluZywgcGFyYW1zOiBhbnkpOiBQcm9taXNlPGFueT4ge1xuICAgIGNvbnN0IGlkID0gdGhpcy5faWQrKztcbiAgICBjb25zdCByZXN1bHQgPSBuZXcgUHJvbWlzZTxhbnk+KChyZXNvbHZlLCByZWplY3QpID0+IHtcbiAgICAgIHRoaXMuX3dhaXRSZXNwb25zZU1hcC5zZXQoaWQsIHsgcmVzb2x2ZSwgcmVqZWN0IH0pO1xuICAgIH0pO1xuICAgIHRoaXMuX3dvcmtlci5wb3N0TWVzc2FnZSh7XG4gICAgICBqc29ucnBjOiBKU09OUlBDX1ZFUlNJT04sXG4gICAgICBtZXRob2QsXG4gICAgICBwYXJhbXMsXG4gICAgICBpZCxcbiAgICB9KTtcbiAgICByZXR1cm4gcmVzdWx0O1xuICB9XG5cbiAgcHJpdmF0ZSBvbldvcmtlck1lc3NhZ2UobWVzc2FnZTogYW55KSB7XG4gICAgaWYgKG1lc3NhZ2UgaW5zdGFuY2VvZiBTaGFyZWRBcnJheUJ1ZmZlcikge1xuICAgICAgY29uc3QgbXQgPSBuZXcgTWVtb3J5TWVzc2FnZVNlbmRlcihtZXNzYWdlKVxuICAgICAgdGhpcy5fanNvblJwY0Rpc3BhdGNoZXIucHJlcmZvcm1NZXNzYWdlKG10LnJlYWRNZXNzYWdlKCkpLnRoZW4oZGF0YSA9PiBtdC5zZW5kTWVzc2FnZShkYXRhKSlcbiAgICB9XG4gICAgZWxzZSBpZiAoT2JqZWN0Lmhhc093bihtZXNzYWdlLCBcIm1ldGhvZFwiKSkge1xuICAgICAgdGhpcy5fanNvblJwY0Rpc3BhdGNoZXIucHJlcmZvcm1NZXNzYWdlKG1lc3NhZ2UpLnRoZW4oZGF0YSA9PiB0aGlzLl93b3JrZXIucG9zdE1lc3NhZ2UoZGF0YSkpO1xuICAgIH1cbiAgICBlbHNlIGlmIChPYmplY3QuaGFzT3duKG1lc3NhZ2UsIFwiaWRcIikpIHtcbiAgICAgIGNvbnN0IHByb21pc2UgPSB0aGlzLl93YWl0UmVzcG9uc2VNYXAuZ2V0KG1lc3NhZ2UuaWQpO1xuICAgICAgaWYgKCFwcm9taXNlKVxuICAgICAgICB0aHJvdyBuZXcgRXJyb3IoYFVua25vd24gcmVzcG9uc2UgXCIke21lc3NhZ2UuaWR9XCIgaWRgKTtcbiAgICAgIGlmIChPYmplY3QuaGFzT3duKG1lc3NhZ2UsIFwicmVzdWx0XCIpKVxuICAgICAgICBwcm9taXNlLnJlc29sdmUobWVzc2FnZS5yZXN1bHQpO1xuICAgICAgZWxzZSBpZiAoT2JqZWN0Lmhhc093bihtZXNzYWdlLCBcImVycm9yXCIpKVxuICAgICAgICBwcm9taXNlLnJlamVjdChtZXNzYWdlLmVycm9yKTtcbiAgICAgIGVsc2VcbiAgICAgICAgdGhyb3cgbmV3IEVycm9yKGBVbmtub3duIG1lc3NhZ2UgdHlwZSBvZiBcIiR7bWVzc2FnZX1cImApO1xuICAgIH1cbiAgfVxuXG4gIHByaXZhdGUgb25Xb3JrZXJFcnJvcihlcnJvcjogRXJyb3IpIHtcbiAgICBpZiAoZXJyb3IgaW5zdGFuY2VvZiBFcnJvcilcbiAgICAgIGxvZ2dlci5mYXRhbChlcnJvci5zdGFjayk7XG4gICAgZWxzZVxuICAgICAgbG9nZ2VyLmZhdGFsKGVycm9yKTtcbiAgICBwcm9jZXNzLmV4aXQoMSk7XG4gIH1cblxuICBwcml2YXRlIG9uV29ya2VyRXhpdChjb2RlOiBudW1iZXIpIHtcbiAgICBpZiAoY29kZSlcbiAgICAgIHRocm93IG5ldyBFcnJvcihgV29ydGtlciByZXR1cm4gZXhpdCBjb2RlICR7Y29kZX1gKTtcbiAgfVxufTtcblxuY2xhc3MgTWFrZUNvbnRleHRDbGllbnQge1xuICBwcml2YXRlIF93b3JrZXJScGM6IFdvcmtlclJwY0NsaWVudDtcblxuICBwdWJsaWMgY29uc3RydWN0b3IoanNvblJwY0Rpc3BhdGNoZXI6IEpzb25ScGNEaXNwYXRjaGVyKSB7XG4gICAgdGhpcy5fd29ya2VyUnBjID0gbmV3IFdvcmtlclJwY0NsaWVudChqc29uUnBjRGlzcGF0Y2hlcik7XG4gIH1cblxuICBwdWJsaWMgY3JlYXRlQ29udGV4dCgpOiBQcm9taXNlPHN0cmluZz4ge1xuICAgIHJldHVybiB0aGlzLl93b3JrZXJScGMucmVxdWVzdChNQUtFQ09OVEVYVF9DUkVBVEVDT05URVhULCBudWxsKTtcbiAgfVxuXG4gIHB1YmxpYyBkZXN0cm95Q29udGV4dChta2lkOiBzdHJpbmcpOiBQcm9taXNlPHZvaWQ+IHtcbiAgICByZXR1cm4gdGhpcy5fd29ya2VyUnBjLnJlcXVlc3QoTUFLRUNPTlRFWFRfREVTVFJPWUNPTlRFWFQsIHsgbWtpZCB9KTtcbiAgfVxuXG4gIHB1YmxpYyBleGVjU2NyaXB0KG1raWQ6IHN0cmluZywgdmFyaWFibGVNYXA6IFZhcmlhYmxlTWFwKTogUHJvbWlzZTxzdHJpbmc+IHtcbiAgICBjb25zdCBzY29wZSA9IFNjb3BlSGVscGVyLnRvSlNPTih2YXJpYWJsZU1hcCk7XG4gICAgcmV0dXJuIHRoaXMuX3dvcmtlclJwYy5yZXF1ZXN0KE1BS0VDT05URVhUX0VYRUNTQ1JJUFQsIHsgbWtpZCwgc2NvcGUgfSk7XG4gIH1cblxuICBwdWJsaWMgYXN5bmMgbWFpblRhcmdldHMobWtpZDogc3RyaW5nKTogUHJvbWlzZTxNYWluVGFyZ2V0W10+IHtcbiAgICBjb25zdCByZXN1bHQgPSBhd2FpdCB0aGlzLl93b3JrZXJScGMucmVxdWVzdChNQUtFQ09OVEVYVF9NQUlOVEFSR0VUUywgeyBta2lkIH0pO1xuICAgIHJldHVybiBTaW1wbGVPYmplY3QuZnJvbUpTT04ocmVzdWx0KTtcbiAgfVxuXG4gIHB1YmxpYyBhc3luYyBwb3N0VGFyZ2V0cyhta2lkOiBzdHJpbmcpOiBQcm9taXNlPFBvc3RUYXJnZXRbXT4ge1xuICAgIGNvbnN0IHJlc3VsdCA9IGF3YWl0IHRoaXMuX3dvcmtlclJwYy5yZXF1ZXN0KE1BS0VDT05URVhUX1BPU1RUQVJHRVRTLCB7IG1raWQgfSk7XG4gICAgcmV0dXJuIFNpbXBsZU9iamVjdC5mcm9tSlNPTihyZXN1bHQpO1xuICB9XG5cbiAgcHVibGljIGFzeW5jIG1haW5TY3JpcHRzKG1raWQ6IHN0cmluZyk6IFByb21pc2U8Q3VzdG9tU2NyaXB0W10+IHtcbiAgICBjb25zdCByZXN1bHQgPSBhd2FpdCB0aGlzLl93b3JrZXJScGMucmVxdWVzdChNQUtFQ09OVEVYVF9NQUlOU0NSSVBUUywgeyBta2lkIH0pO1xuICAgIHJldHVybiBTaW1wbGVPYmplY3QuZnJvbUpTT04ocmVzdWx0KTtcbiAgfVxuXG4gIHB1YmxpYyBhc3luYyBwb3N0U2NyaXB0cyhta2lkOiBzdHJpbmcpOiBQcm9taXNlPFBvc3RDdXN0b21TY3JpcHRbXT4ge1xuICAgIGNvbnN0IHJlc3VsdCA9IGF3YWl0IHRoaXMuX3dvcmtlclJwYy5yZXF1ZXN0KE1BS0VDT05URVhUX1BPU1RTQ1JJUFRTLCB7IG1raWQgfSk7XG4gICAgcmV0dXJuIFNpbXBsZU9iamVjdC5mcm9tSlNPTihyZXN1bHQpO1xuICB9XG5cbiAgcHVibGljIGFzeW5jIGluc3RhbGxFbnRyaWVzKG1raWQ6IHN0cmluZyk6IFByb21pc2U8SW5zdGFsbEVudGl0eVtdPiB7XG4gICAgY29uc3QgcmVzdWx0ID0gYXdhaXQgdGhpcy5fd29ya2VyUnBjLnJlcXVlc3QoTUFLRUNPTlRFWFRfSU5TVEFMTEVOVFJJRVMsIHsgbWtpZCB9KTtcbiAgICByZXR1cm4gU2ltcGxlT2JqZWN0LmZyb21KU09OKHJlc3VsdCk7XG4gIH1cblxuICBwdWJsaWMgcHJvY2Vzc0V4aXQoY29kZTogbnVtYmVyKTogUHJvbWlzZTx2b2lkPiB7XG4gICAgcmV0dXJuIHRoaXMuX3dvcmtlclJwYy5yZXF1ZXN0KFdPUktFUlNFUlZJQ0VfUFJPQ0VTU0VYSVQsIDApO1xuICB9XG59O1xuXG5leHBvcnQgY2xhc3MgTWFrZUNsaWVudCB7XG4gIHByaXZhdGUgX21ha2VDb250ZXh0OiBNYWtlQ29udGV4dENsaWVudDtcbiAgcHJpdmF0ZSBfbWFpblRhcmdldHMgPSBuZXcgQXJyYXk8TWFpblRhcmdldD47XG4gIHByaXZhdGUgX3Bvc3RUYXJnZXRzID0gbmV3IEFycmF5PFBvc3RUYXJnZXQ+O1xuICBwcml2YXRlIF9tYWluU2NyaXB0cyA9IG5ldyBBcnJheTxDdXN0b21TY3JpcHQ+O1xuICBwcml2YXRlIF9wb3N0U2NyaXB0cyA9IG5ldyBBcnJheTxQb3N0Q3VzdG9tU2NyaXB0PjtcbiAgcHJpdmF0ZSBfaW5zdGFsbEVudHJpZXMgPSBuZXcgQXJyYXk8SW5zdGFsbEVudGl0eT47XG5cbiAgcHVibGljIGNvbnN0cnVjdG9yKGpzb25ScGNEaXNwYXRjaGVyOiBKc29uUnBjRGlzcGF0Y2hlcikge1xuICAgIHRoaXMuX21ha2VDb250ZXh0ID0gbmV3IE1ha2VDb250ZXh0Q2xpZW50KGpzb25ScGNEaXNwYXRjaGVyKTtcbiAgfVxuXG4gIHB1YmxpYyBhc3luYyBleGVjTWFrZVNjcmlwdCh2YXJpYWJsZU1hcDogVmFyaWFibGVNYXApOiBQcm9taXNlPHZvaWQ+IHtcbiAgICBjb25zdCBta2lkID0gYXdhaXQgdGhpcy5fbWFrZUNvbnRleHQuY3JlYXRlQ29udGV4dCgpO1xuXG4gICAgY29uc3QgY3dkU2F2ZSA9IHByb2Nlc3MuY3dkKCk7XG4gICAgY29uc3Qgc2NyaXB0RGlyID0gU2NvcGVIZWxwZXIuZ2V0KHZhcmlhYmxlTWFwLCBcIlNDUklQVF9ESVJcIik7XG4gICAgcHJvY2Vzcy5jaGRpcihzY3JpcHREaXIudG9TdHJpbmcoKSk7XG4gICAgYXdhaXQgdGhpcy5fbWFrZUNvbnRleHQuZXhlY1NjcmlwdChta2lkLCB2YXJpYWJsZU1hcCk7XG4gICAgcHJvY2Vzcy5jaGRpcihjd2RTYXZlKTtcblxuICAgIHRoaXMuX21haW5UYXJnZXRzID0gYXdhaXQgdGhpcy5fbWFrZUNvbnRleHQubWFpblRhcmdldHMobWtpZCk7XG4gICAgdGhpcy5fcG9zdFRhcmdldHMgPSBhd2FpdCB0aGlzLl9tYWtlQ29udGV4dC5wb3N0VGFyZ2V0cyhta2lkKTtcbiAgICB0aGlzLl9tYWluU2NyaXB0cyA9IGF3YWl0IHRoaXMuX21ha2VDb250ZXh0Lm1haW5TY3JpcHRzKG1raWQpO1xuICAgIHRoaXMuX3Bvc3RTY3JpcHRzID0gYXdhaXQgdGhpcy5fbWFrZUNvbnRleHQucG9zdFNjcmlwdHMobWtpZCk7XG4gICAgdGhpcy5faW5zdGFsbEVudHJpZXMgPSBhd2FpdCB0aGlzLl9tYWtlQ29udGV4dC5pbnN0YWxsRW50cmllcyhta2lkKTtcblxuICAgIGF3YWl0IHRoaXMuX21ha2VDb250ZXh0LnByb2Nlc3NFeGl0KDApO1xuICB9XG5cbiAgcHVibGljIGdldCBtYWluVGFyZ2V0cygpOiBNYWluVGFyZ2V0W10ge1xuICAgIHJldHVybiB0aGlzLl9tYWluVGFyZ2V0cztcbiAgfVxuXG4gIHB1YmxpYyBnZXQgcG9zdFRhcmdldHMoKTogUG9zdFRhcmdldFtdIHtcbiAgICByZXR1cm4gdGhpcy5fcG9zdFRhcmdldHM7XG4gIH1cblxuICBwdWJsaWMgZ2V0IG1haW5TY3JpcHRzKCk6IEN1c3RvbVNjcmlwdFtdIHtcbiAgICByZXR1cm4gdGhpcy5fbWFpblNjcmlwdHM7XG4gIH1cblxuICBwdWJsaWMgZ2V0IHBvc3RTY3JpcHRzKCk6IFBvc3RDdXN0b21TY3JpcHRbXSB7XG4gICAgcmV0dXJuIHRoaXMuX3Bvc3RTY3JpcHRzO1xuICB9XG5cbiAgcHVibGljIGdldCBpbnN0YWxsRW50cmllcygpOiBJbnN0YWxsRW50aXR5W10ge1xuICAgIHJldHVybiB0aGlzLl9pbnN0YWxsRW50cmllcztcbiAgfVxufTtcbiIsIi8qXG4gKiBNSVQgTGljZW5zZVxuICpcbiAqIENvcHlyaWdodCAoYykgMjAyNSAgWXVyaWkgWWFrdWJpbiAoeXVyaWkueWFrdWJpbkBnbWFpbC5jb20pXG4gKlxuICogUGVybWlzc2lvbiBpcyBncmFudGVkIHRvIHVzZSwgY29weSwgbW9kaWZ5LCBhbmQgZGlzdHJpYnV0ZSB0aGlzIHNvZnR3YXJlXG4gKiB1bmRlciB0aGUgTUlUIExpY2Vuc2UuIFNlZSBMSUNFTlNFIGZpbGUgZm9yIGRldGFpbHMuXG4gKi9cblxuaW1wb3J0IHsgSVJlcXVlc3RTeW5jIH0gZnJvbSBcIkAvc2VydmVyL1RyYW5zcG9ydFwiO1xuaW1wb3J0IHsgSnNvblJwY1JlcXVlc3RTeW5jIH0gZnJvbSBcIkAvc2VydmVyL0pzb25ScGNSZXF1ZXN0U3luY1wiO1xuaW1wb3J0IHsgUmVtb3RlTWFrZUNvbnRleHQgfSBmcm9tIFwiQC9zZXJ2ZXIvUmVtb3RlTWFrZUNvbnRleHRcIjtcbmltcG9ydCB7IFVzZXJNYWtlQ29udGV4dCB9IGZyb20gXCJAL2NvcmUvVXNlck1ha2VDb250ZXh0XCI7XG5pbXBvcnQgeyBwZXJmb3JtQ29udGV4dCB9IGZyb20gXCJAL2NvcmUvQmFzZUNvbnRleHRcIjtcbmltcG9ydCB7IFNpbXBsZU9iamVjdCB9IGZyb20gXCJAL2NvcmUvU2ltcGxlT2JqZWN0XCI7XG5pbXBvcnQgeyBTY29wZUhlbHBlciB9IGZyb20gXCJAL2NvcmUvU2NvcGVcIjtcblxuZXhwb3J0IGNsYXNzIE1ha2VDb250ZXh0UHJvdmlkZXIge1xuICBwcml2YXRlIF9uYW1lOiBzdHJpbmc7XG4gIHByaXZhdGUgX3RyYW5zcG9ydDogSnNvblJwY1JlcXVlc3RTeW5jO1xuICBwcml2YXRlIF9tYWtlQ29udGV4dHMgPSBuZXcgTWFwPHN0cmluZywgUmVtb3RlTWFrZUNvbnRleHQ+O1xuICBwcml2YXRlIF9tYWtlQ29udGV4dENvdW50ID0gMDtcblxuICBwdWJsaWMgY29uc3RydWN0b3IobmFtZTogc3RyaW5nLCByZXF1ZXN0U3luYzogSVJlcXVlc3RTeW5jKSB7XG4gICAgdGhpcy5fbmFtZSA9IG5hbWU7XG4gICAgdGhpcy5fdHJhbnNwb3J0ID0gbmV3IEpzb25ScGNSZXF1ZXN0U3luYyhyZXF1ZXN0U3luYyk7XG4gIH1cblxuICBwdWJsaWMgY3JlYXRlQ29udGV4dChwYXJhbXM6IGFueSkge1xuICAgIGNvbnN0IG1raWQgPSB0aGlzLl9uYW1lICsgXCI6XCIgKyB0aGlzLl9tYWtlQ29udGV4dENvdW50Kys7XG4gICAgY29uc3QgY3R4ID0gbmV3IFJlbW90ZU1ha2VDb250ZXh0KHRoaXMuX3RyYW5zcG9ydCk7XG4gICAgdGhpcy5fbWFrZUNvbnRleHRzLnNldChta2lkLCBjdHgpO1xuICAgIHJldHVybiBta2lkO1xuICB9XG5cbiAgcHVibGljIGRlc3Ryb3lDb250ZXh0KHBhcmFtczogYW55KSB7XG4gICAgcmV0dXJuIHRoaXMuX21ha2VDb250ZXh0cy5kZWxldGUocGFyYW1zLm1raWQpO1xuICB9XG5cbiAgcHJpdmF0ZSBnZXRDb250ZXh0KG1raWQ6IHN0cmluZykge1xuICAgIGNvbnN0IGNvbnRleHQgPSB0aGlzLl9tYWtlQ29udGV4dHMuZ2V0KG1raWQpO1xuICAgIGlmIChjb250ZXh0KVxuICAgICAgcmV0dXJuIGNvbnRleHQ7XG4gICAgdGhyb3cgbmV3IEVycm9yKGBOb3QgZXhpc3RzIG1ha2UgY29udGV4dCB3aXRoIGlkICR7bWtpZH1gKTtcbiAgfVxuXG4gIHB1YmxpYyBhc3luYyBleGVjU2NyaXB0KHBhcmFtczogYW55KTogUHJvbWlzZTx2b2lkPiB7XG4gICAgY29uc3QgY3R4ID0gdGhpcy5nZXRDb250ZXh0KHBhcmFtcy5ta2lkKTtcbiAgICBjb25zdCB2YXJpYWJsZU1hcCA9IFNjb3BlSGVscGVyLmZyb21KU09OKHBhcmFtcy5zY29wZSk7XG4gICAgY29uc3QgbWsgPSBVc2VyTWFrZUNvbnRleHQuY3JlYXRlKGN0eCwgdmFyaWFibGVNYXApO1xuICAgIGF3YWl0IHBlcmZvcm1Db250ZXh0KG1rKTtcbiAgfVxuXG4gIHB1YmxpYyBtYWluVGFyZ2V0cyhwYXJhbXM6IGFueSkge1xuICAgIGNvbnN0IGN0eCA9IHRoaXMuZ2V0Q29udGV4dChwYXJhbXMubWtpZCk7XG4gICAgY29uc3QgbWFpblRhcmdldHMgPSBBcnJheS5mcm9tKGN0eC50YXJnZXRzLnZhbHVlcygpKTtcbiAgICByZXR1cm4gU2ltcGxlT2JqZWN0LnRvSlNPTihtYWluVGFyZ2V0cyk7XG4gIH1cblxuICBwdWJsaWMgcG9zdFRhcmdldHMocGFyYW1zOiBhbnkpIHtcbiAgICBjb25zdCBjdHggPSB0aGlzLmdldENvbnRleHQocGFyYW1zLm1raWQpO1xuICAgIGNvbnN0IHBvc3RUYXJnZXRzID0gQXJyYXkuZnJvbShjdHgucG9zdFRhcmdldHMudmFsdWVzKCkpO1xuICAgIHJldHVybiBTaW1wbGVPYmplY3QudG9KU09OKHBvc3RUYXJnZXRzKTtcbiAgfVxuXG4gIHB1YmxpYyBtYWluU2NyaXB0cyhwYXJhbXM6IGFueSkge1xuICAgIGNvbnN0IGN0eCA9IHRoaXMuZ2V0Q29udGV4dChwYXJhbXMubWtpZCk7XG4gICAgY29uc3QgbWFpblNjcmlwdHMgPSBBcnJheS5mcm9tKGN0eC5tYWluU2NyaXB0cy52YWx1ZXMoKSk7XG4gICAgcmV0dXJuIFNpbXBsZU9iamVjdC50b0pTT04obWFpblNjcmlwdHMpO1xuICB9XG5cbiAgcHVibGljIHBvc3RTY3JpcHRzKHBhcmFtczogYW55KSB7XG4gICAgY29uc3QgY3R4ID0gdGhpcy5nZXRDb250ZXh0KHBhcmFtcy5ta2lkKTtcbiAgICBjb25zdCBwb3N0U2NyaXB0cyA9IEFycmF5LmZyb20oY3R4LnBvc3RTY3JpcHRzLnZhbHVlcygpKTtcbiAgICByZXR1cm4gU2ltcGxlT2JqZWN0LnRvSlNPTihwb3N0U2NyaXB0cyk7XG4gIH1cblxuICBwdWJsaWMgaW5zdGFsbEVudHJpZXMocGFyYW1zOiBhbnkpIHtcbiAgICBjb25zdCBjdHggPSB0aGlzLmdldENvbnRleHQocGFyYW1zLm1raWQpO1xuICAgIGNvbnN0IGluc3RhbGxFbnRyaWVzID0gY3R4Lmluc3RhbGxMaXN0O1xuICAgIHJldHVybiBTaW1wbGVPYmplY3QudG9KU09OKGluc3RhbGxFbnRyaWVzKTtcbiAgfVxufTtcbiIsIi8qXG4gKiBNSVQgTGljZW5zZVxuICpcbiAqIENvcHlyaWdodCAoYykgMjAyNSAgWXVyaWkgWWFrdWJpbiAoeXVyaWkueWFrdWJpbkBnbWFpbC5jb20pXG4gKlxuICogUGVybWlzc2lvbiBpcyBncmFudGVkIHRvIHVzZSwgY29weSwgbW9kaWZ5LCBhbmQgZGlzdHJpYnV0ZSB0aGlzIHNvZnR3YXJlXG4gKiB1bmRlciB0aGUgTUlUIExpY2Vuc2UuIFNlZSBMSUNFTlNFIGZpbGUgZm9yIGRldGFpbHMuXG4gKi9cblxuaW1wb3J0IHsgUHJvamVjdENvbnRleHQgfSBmcm9tIFwiQC9jb3JlL1Byb2plY3RDb250ZXh0XCI7XG5pbXBvcnQgeyBTY3JpcHRDb250ZXh0IH0gZnJvbSBcIkAvY29yZS9TY3JpcHRDb250ZXh0XCI7XG5pbXBvcnQgeyBTY29wZUhlbHBlciwgVmFyaWFibGVNYXAgfSBmcm9tIFwiQC9jb3JlL1Njb3BlXCI7XG5pbXBvcnQgeyBNYWtlQ2xpZW50IH0gZnJvbSBcIkAvc2VydmVyL01ha2VDbGllbnRcIjtcbmltcG9ydCB7IEpzb25ScGNEaXNwYXRjaGVyIH0gZnJvbSBcIkAvc2VydmVyL0pzb25ScGNEaXNwYXRjaGVyXCI7XG5pbXBvcnQgeyBpbXBvcnRNb2R1bGUgfSBmcm9tIFwiQC91dGlscy9Nb2R1bGVcIjtcbmltcG9ydCB7IGxvYWRKU1ZhbHVlIH0gZnJvbSBcIkAvdXRpbHMvSlNWYWx1ZVwiO1xuaW1wb3J0IHsgY3JlYXRlVmFyaWFibGVNYXBGb3JEaXJlY3RvcnkgfSBmcm9tIFwiQC9jb3JlL0Jhc2VDb250ZXh0XCI7XG5pbXBvcnQgeyBNQUlOTk9ERV9TVEFSVE1BS0VTQ1JJUFQgfSBmcm9tIFwiQC9zZXJ2ZXIvUmVtb3RlTWV0aG9kc1wiO1xuaW1wb3J0IHsgTUFJTk5PREVfTE9BREpTT04gfSBmcm9tIFwiQC9zZXJ2ZXIvUmVtb3RlTWV0aG9kc1wiO1xuaW1wb3J0IHsgTUFJTk5PREVfRVhFQ1VURVNDUklQVCB9IGZyb20gXCJAL3NlcnZlci9SZW1vdGVNZXRob2RzXCI7XG5pbXBvcnQgeyBMb2dnZXIgfSBmcm9tIFwiQC9sb2dnZXJcIjtcbmltcG9ydCB7IExvY2F0b3IgfSBmcm9tIFwiQC91dGlscy9Mb2NhdG9yXCI7XG5cbmNvbnN0IGxvZ2dlciA9IExvZ2dlci5jcmVhdGUoaW1wb3J0Lm1ldGEudXJsKTtcblxuZXhwb3J0IGNvbnN0IENPTkZJR1VSRV9FVkVOVCA9IFwiY29uZmlndXJlXCI7XG5leHBvcnQgY29uc3QgQlVJTERfRVZFTlQgPSBcImJ1aWxkXCI7XG5cbmV4cG9ydCBpbnRlcmZhY2UgQ29uZmlndXJlRXZlbnQge1xuICBwcm9qZWN0OiBQcm9qZWN0Q29udGV4dDtcbn07XG5cbmV4cG9ydCBpbnRlcmZhY2UgQnVpbGRFdmVudCB7XG4gIHByb2plY3Q6IFByb2plY3RDb250ZXh0O1xufTtcblxuZXhwb3J0IHR5cGUgQ29uZmlndXJlTGlzdGVuZXIgPSAoZXZlbnQ6IENvbmZpZ3VyZUV2ZW50KSA9PiB2b2lkO1xuZXhwb3J0IHR5cGUgQnVpbGRMaXN0ZW5lciA9IChldmVudDogQnVpbGRFdmVudCkgPT4gdm9pZDtcblxuZXhwb3J0IGludGVyZmFjZSBNZW1vcnlTZW5kZXIge1xuICBzZW5kTWVzc2FnZShtZXNzYWdlOiBhbnkpOiB2b2lkO1xufTtcblxuZXhwb3J0IGNsYXNzIE1ha2VTZXJ2ZXIge1xuICBwcml2YXRlIF9yb290VmFyaWFibGVNYXA6IFZhcmlhYmxlTWFwID0ge307XG4gIHByaXZhdGUgX3Byb2plY3QgPSBQcm9qZWN0Q29udGV4dC5jcmVhdGUoKTtcbiAgcHJpdmF0ZSBfbGlzdGVuZXJzOiB7IFtuYW1lOiBzdHJpbmddOiBGdW5jdGlvbltdIH07XG4gIHByaXZhdGUgX2pzb25ScGNEaXNwYXRjaGVyID0gbmV3IEpzb25ScGNEaXNwYXRjaGVyO1xuICBwcml2YXRlIF9jbGllbnRzID0gbmV3IEFycmF5PE1ha2VDbGllbnQ+O1xuXG4gIHB1YmxpYyBjb25zdHJ1Y3RvcigpIHtcbiAgICB0aGlzLl9saXN0ZW5lcnMgPSB7XG4gICAgICBbIENPTkZJR1VSRV9FVkVOVCBdOiBuZXcgQXJyYXk8Q29uZmlndXJlTGlzdGVuZXI+LFxuICAgICAgWyBCVUlMRF9FVkVOVCBdOiBuZXcgQXJyYXk8QnVpbGRMaXN0ZW5lcj4sXG4gICAgfTtcbiAgICB0aGlzLl9qc29uUnBjRGlzcGF0Y2hlci5yZWdpc3RlckNhbGxiYWNrKE1BSU5OT0RFX0VYRUNVVEVTQ1JJUFQsIHBhcmFtcyA9PiB0aGlzLmV4ZWN1dGVTY3JpcHQocGFyYW1zKSk7XG4gICAgdGhpcy5fanNvblJwY0Rpc3BhdGNoZXIucmVnaXN0ZXJDYWxsYmFjayhNQUlOTk9ERV9MT0FESlNPTiwgcGFyYW1zID0+IHRoaXMubG9hZEpTT04ocGFyYW1zKSk7XG4gICAgdGhpcy5fanNvblJwY0Rpc3BhdGNoZXIucmVnaXN0ZXJDYWxsYmFjayhNQUlOTk9ERV9TVEFSVE1BS0VTQ1JJUFQsIHBhcmFtcyA9PiB0aGlzLnN0YXJ0TWFrZVNjcmlwdChwYXJhbXMpKTtcbiAgfVxuXG4gIHB1YmxpYyBnZXQgcm9vdFZhcmlhYmxlTWFwKCkge1xuICAgIHJldHVybiB0aGlzLl9yb290VmFyaWFibGVNYXA7XG4gIH1cblxuICBwdWJsaWMgZ2V0IHByb2plY3QoKSB7XG4gICAgcmV0dXJuIHRoaXMuX3Byb2plY3Q7XG4gIH1cblxuICBwdWJsaWMgYXN5bmMgc3RhcnRNYWtlU2NyaXB0KHBhcmFtczogYW55KTogUHJvbWlzZTx2b2lkPiB7XG4gICAgbG9nZ2VyLmRlYnVnKFwiTWFrZVNlcnZlci5zdGFydE1ha2VTY3JpcHRcIik7XG5cbiAgICBjb25zdCB2YXJpYWJsZU1hcCA9IFNjb3BlSGVscGVyLmZyb21KU09OKHBhcmFtcyk7XG4gICAgYXdhaXQgdGhpcy5ydW5NYWtlU2NyaXB0KHZhcmlhYmxlTWFwKTtcbiAgfVxuXG4gIHByaXZhdGUgYXN5bmMgbG9hZEpTT04oZmlsZW5hbWU6IHN0cmluZyk6IFByb21pc2U8YW55PiB7XG4gICAgbG9nZ2VyLmRlYnVnKFwiTWFrZVNlcnZlci5sb2FkSlNPTihcIiwgZmlsZW5hbWUsIFwiKVwiKTtcbiAgICByZXR1cm4gYXdhaXQgbG9hZEpTVmFsdWUoTG9jYXRvci5jcmVhdGUoZmlsZW5hbWUpKTtcbiAgfVxuXG4gIHByaXZhdGUgYXN5bmMgZXhlY3V0ZVNjcmlwdChwYXJhbXM6IGFueSk6IFByb21pc2U8dm9pZD4ge1xuICAgIGxvZ2dlci5kZWJ1ZyhcIk1ha2VTZXJ2ZXIuZXhlY3V0ZVNjcmlwdFwiKTtcbiAgICBjb25zdCB2YXJpYWJsZU1hcCA9IFNjb3BlSGVscGVyLmZyb21KU09OKHBhcmFtcyk7XG4gICAgY29uc3Qgc2NyaXB0RmlsZSA9IFNjb3BlSGVscGVyLmdldCh2YXJpYWJsZU1hcCwgXCJTQ1JJUFRfRklMRVwiKTtcblxuICAgIGNvbnN0IG1vZHVsZSA9IGF3YWl0IGltcG9ydE1vZHVsZShzY3JpcHRGaWxlLnRvVVJMU3RyaW5nKCkpO1xuICAgIGlmICghbW9kdWxlLmRlZmF1bHQpXG4gICAgICB0aHJvdyBuZXcgRXJyb3IoYFNjcmlwdCBcIiR7c2NyaXB0RmlsZX1cIiBoYXMgbm90IGNvbnRhaW4gYSBkZWZhdWx0IGZ1bmN0aW9uYCk7XG5cbiAgICBjb25zdCBtayA9IFNjcmlwdENvbnRleHQuY3JlYXRlKHZhcmlhYmxlTWFwKTtcbiAgICBtb2R1bGUuZGVmYXVsdChtayk7XG4gIH1cblxuICBwdWJsaWMgYXN5bmMgcnVuTWFrZVNjcmlwdCh2YXJpYWJsZU1hcDogVmFyaWFibGVNYXApOiBQcm9taXNlPGJvb2xlYW4+IHtcbiAgICBpZiAoIWF3YWl0IHRoaXMuX3Byb2plY3QucHJlcGVhclNjcmlwdEZpbGUodmFyaWFibGVNYXApKVxuICAgICAgcmV0dXJuIGZhbHNlO1xuXG4gICAgY29uc3QgY2xpZW50ID0gbmV3IE1ha2VDbGllbnQodGhpcy5fanNvblJwY0Rpc3BhdGNoZXIpO1xuICAgIHRoaXMuX2NsaWVudHMucHVzaChjbGllbnQpO1xuXG4gICAgYXdhaXQgY2xpZW50LmV4ZWNNYWtlU2NyaXB0KHZhcmlhYmxlTWFwKTtcbiAgICByZXR1cm4gdHJ1ZTtcbiAgfVxuXG4gIHB1YmxpYyBjb21iaW5lUmVzdWx0cygpIHtcbiAgICBmb3IgKGNvbnN0IGN0eCBvZiB0aGlzLl9jbGllbnRzKSB7XG4gICAgICB0aGlzLl9wcm9qZWN0LmFwcGx5TWFpblRhcmdldHMoY3R4Lm1haW5UYXJnZXRzKTtcbiAgICAgIHRoaXMuX3Byb2plY3QuYXBwbHlNYWluU2NyaXB0cyhjdHgubWFpblNjcmlwdHMpO1xuICAgICAgdGhpcy5fcHJvamVjdC5hcHBseUluc3RhbGxFbnRpdGllcyhjdHguaW5zdGFsbEVudHJpZXMpO1xuICAgIH1cbiAgICBmb3IgKGNvbnN0IGN0eCBvZiB0aGlzLl9jbGllbnRzKSB7XG4gICAgICB0aGlzLl9wcm9qZWN0LmFwcGxQb3N0VGFyZ2V0cyhjdHgucG9zdFRhcmdldHMpO1xuICAgICAgdGhpcy5fcHJvamVjdC5hcHBsUG9zdFNjcmlwdHMoY3R4LnBvc3RTY3JpcHRzKTtcbiAgICB9XG4gIH1cblxuICBwdWJsaWMgYXN5bmMgc3RhcnQoKSB7XG4gICAgY29uc3Qgc291cmNlRGlyID0gU2NvcGVIZWxwZXIuZ2V0KHRoaXMuX3Jvb3RWYXJpYWJsZU1hcCwgXCJQUk9KRUNUX1NPVVJDRV9ESVJcIik7XG4gICAgY29uc3QgYmluYXJ5RGlyID0gU2NvcGVIZWxwZXIuZ2V0KHRoaXMuX3Jvb3RWYXJpYWJsZU1hcCwgXCJQUk9KRUNUX0JJTkFSWV9ESVJcIik7XG5cbiAgICBjb25zdCB2YXJpYWJsZU1hcCA9IGNyZWF0ZVZhcmlhYmxlTWFwRm9yRGlyZWN0b3J5KHRoaXMuX3Jvb3RWYXJpYWJsZU1hcCwgc291cmNlRGlyLCBiaW5hcnlEaXIpO1xuICAgIGlmICghYXdhaXQgdGhpcy5ydW5NYWtlU2NyaXB0KHZhcmlhYmxlTWFwKSlcbiAgICAgIHRocm93IEVycm9yKFwiQ2FuJ3QgcHJlcGVhciBTY3JpcHRGaWxlXCIpO1xuXG4gICAgdGhpcy5jb21iaW5lUmVzdWx0cygpO1xuICAgIHRoaXMub25Db25maWd1cmVFbmQoKTtcbiAgfVxuXG4gIHByaXZhdGUgYXN5bmMgb25Db25maWd1cmVFbmQoKSB7XG4gICAgY29uc3QgZXZlbnQgPSB7IHByb2plY3Q6IHRoaXMuX3Byb2plY3QgfTtcbiAgICBhd2FpdCB0aGlzLmVtaXRFdmVudChDT05GSUdVUkVfRVZFTlQsIGV2ZW50KTtcbiAgICBhd2FpdCB0aGlzLmVtaXRFdmVudChCVUlMRF9FVkVOVCwgZXZlbnQpO1xuICB9XG5cbiAgcHJpdmF0ZSBhc3luYyBlbWl0RXZlbnQ8VD4odHlwZTogc3RyaW5nLCBldmVudDogVCk6IFByb21pc2U8dm9pZD4ge1xuICAgIGZvciAoY29uc3QgbGlzdGVuZXIgb2YgdGhpcy5fbGlzdGVuZXJzW3R5cGVdKSB7XG4gICAgICBjb25zdCByZXN1bHQgPSBsaXN0ZW5lcihldmVudCk7XG4gICAgICBpZiAocmVzdWx0IGluc3RhbmNlb2YgUHJvbWlzZSlcbiAgICAgICAgYXdhaXQgcmVzdWx0O1xuICAgIH1cbiAgfVxuICBcbiAgcHVibGljIGFkZEV2ZW50TGlzdGVuZXIodHlwZTogXCJjb25maWd1cmVcIiwgbGlzdGVuZXI6IENvbmZpZ3VyZUxpc3RlbmVyKTogdm9pZDtcbiAgcHVibGljIGFkZEV2ZW50TGlzdGVuZXIodHlwZTogXCJidWlsZFwiLCBsaXN0ZW5lcjogQnVpbGRMaXN0ZW5lcik6IHZvaWQ7XG4gIHB1YmxpYyBhZGRFdmVudExpc3RlbmVyKHR5cGU6IHN0cmluZywgbGlzdGVuZXI6IEZ1bmN0aW9uKTogdm9pZCB7XG4gICAgdGhpcy5fbGlzdGVuZXJzW3R5cGVdLnB1c2gobGlzdGVuZXIpO1xuICB9XG59O1xuIiwiLypcbiAqIE1JVCBMaWNlbnNlXG4gKlxuICogQ29weXJpZ2h0IChjKSAyMDI1ICBZdXJpaSBZYWt1YmluICh5dXJpaS55YWt1YmluQGdtYWlsLmNvbSlcbiAqXG4gKiBQZXJtaXNzaW9uIGlzIGdyYW50ZWQgdG8gdXNlLCBjb3B5LCBtb2RpZnksIGFuZCBkaXN0cmlidXRlIHRoaXMgc29mdHdhcmVcbiAqIHVuZGVyIHRoZSBNSVQgTGljZW5zZS4gU2VlIExJQ0VOU0UgZmlsZSBmb3IgZGV0YWlscy5cbiAqL1xuXG5pbXBvcnQgeyBJTWVzc2FnZVNlbmRlciwgSVJlcXVlc3RTeW5jIH0gZnJvbSBcIkAvc2VydmVyL1RyYW5zcG9ydFwiO1xuaW1wb3J0IHsgTG9nZ2VyIH0gZnJvbSBcIkAvbG9nZ2VyXCI7XG5cbmNvbnN0IGxvZ2dlciA9IExvZ2dlci5jcmVhdGUoaW1wb3J0Lm1ldGEudXJsKTtcblxuZXhwb3J0IGNsYXNzIE1lbW9yeU1lc3NhZ2VTZW5kZXIgaW1wbGVtZW50cyBJTWVzc2FnZVNlbmRlciB7XG4gIHByaXZhdGUgX2J1ZmZlcjogU2hhcmVkQXJyYXlCdWZmZXI7XG4gIHByaXZhdGUgX21lbW9yeTogTWVtb3J5VHJhbnNwb3J0LkJ1ZmZlcjtcblxuICBwdWJsaWMgY29uc3RydWN0b3IoYnVmZmVyOiBTaGFyZWRBcnJheUJ1ZmZlcikge1xuICAgIHRoaXMuX2J1ZmZlciA9IGJ1ZmZlcjtcbiAgICB0aGlzLl9tZW1vcnkgPSBuZXcgTWVtb3J5VHJhbnNwb3J0LkJ1ZmZlcihidWZmZXIpO1xuICB9XG5cbiAgcHVibGljIHNlbmRNZXNzYWdlKG1lc3NhZ2U6IGFueSk6IHZvaWQge1xuICAgIHRoaXMuX21lbW9yeS5zZXQobWVzc2FnZSwgdHJ1ZSk7XG4gIH1cblxuICBwdWJsaWMgcmVhZE1lc3NhZ2UoKTogYW55IHtcbiAgICByZXR1cm4gdGhpcy5fbWVtb3J5LmdldCgpO1xuICB9XG59O1xuXG5leHBvcnQgY2xhc3MgTWVtb3J5VHJhbnNwb3J0IGltcGxlbWVudHMgSVJlcXVlc3RTeW5jIHtcbiAgcHJpdmF0ZSBfc2VuZGVyOiBJTWVzc2FnZVNlbmRlcjtcbiAgcHJpdmF0ZSBfYnVmZmVyOiBTaGFyZWRBcnJheUJ1ZmZlcjtcbiAgcHJpdmF0ZSBfbWVtb3J5OiBNZW1vcnlUcmFuc3BvcnQuQnVmZmVyO1xuXG4gIHB1YmxpYyBjb25zdHJ1Y3RvcihzZW5kZXI6IElNZXNzYWdlU2VuZGVyLCBidWZmZXI6IFNoYXJlZEFycmF5QnVmZmVyKSB7XG4gICAgdGhpcy5fc2VuZGVyID0gc2VuZGVyO1xuICAgIHRoaXMuX2J1ZmZlciA9IGJ1ZmZlcjtcbiAgICB0aGlzLl9tZW1vcnkgPSBuZXcgTWVtb3J5VHJhbnNwb3J0LkJ1ZmZlcihidWZmZXIpO1xuICB9XG5cbiAgcHVibGljIHJlcXVlc3RTeW5jKGRhdGE6IGFueSk6IGFueSB7XG4gICAgdGhpcy5fbWVtb3J5LnNldChkYXRhKTtcbiAgICB0aGlzLl9zZW5kZXIuc2VuZE1lc3NhZ2UodGhpcy5fYnVmZmVyKTtcbiAgICByZXR1cm4gdGhpcy5fbWVtb3J5LmdldCh0cnVlKTtcbiAgfVxufTtcblxuZXhwb3J0IG5hbWVzcGFjZSBNZW1vcnlUcmFuc3BvcnQge1xuXG5jb25zdCBNQUdJQ19PRkZTRVQgPSAwO1xuXG5leHBvcnQgY2xhc3MgQnVmZmVyIHtcbiAgcHJpdmF0ZSBfc2lnbmFsOiBJbnQzMkFycmF5O1xuICBwcml2YXRlIF9kYXRhOiBVaW50OEFycmF5O1xuICBwcml2YXRlIF9tYWdpYzogbnVtYmVyO1xuXG4gIHB1YmxpYyBjb25zdHJ1Y3RvcihidWZmZXI6IFNoYXJlZEFycmF5QnVmZmVyKSB7XG4gICAgdGhpcy5fc2lnbmFsID0gbmV3IEludDMyQXJyYXkoYnVmZmVyLCBNQUdJQ19PRkZTRVQsIDEpO1xuICAgIHRoaXMuX2RhdGEgPSBuZXcgVWludDhBcnJheShidWZmZXIsIHRoaXMuX3NpZ25hbC5CWVRFU19QRVJfRUxFTUVOVCk7XG4gICAgdGhpcy5fbWFnaWMgPSAwO1xuICB9XG5cbiAgcHVibGljIGdldChzeW5jID0gZmFsc2UpOiBhbnkge1xuICAgIGlmIChzeW5jKSB7XG4gICAgICBBdG9taWNzLndhaXQodGhpcy5fc2lnbmFsLCBNQUdJQ19PRkZTRVQsIHRoaXMuX21hZ2ljKTtcbiAgICB9XG5cbiAgICB0aGlzLl9tYWdpYyA9IHRoaXMuX3NpZ25hbFswXTtcbiAgICBjb25zdCBsZW5ndGggPSB0aGlzLl9tYWdpYyA+PiA4O1xuICAgIGNvbnN0IGJ5dGVzID0gdGhpcy5fZGF0YS5zbGljZSgwLCBsZW5ndGgpO1xuICAgIGNvbnN0IG1lc3NhZ2UgPSAobmV3IFRleHREZWNvZGVyKCkpLmRlY29kZShieXRlcyk7XG5cbiAgICByZXR1cm4gSlNPTi5wYXJzZShtZXNzYWdlKTtcbiAgfVxuXG4gIHB1YmxpYyBzZXQoanNvbjogYW55LCBub3RpZnkgPSBmYWxzZSkge1xuICAgIGNvbnN0IG1lc3NhZ2UgPSBKU09OLnN0cmluZ2lmeShqc29uKTtcbiAgICBjb25zdCBieXRlcyA9IChuZXcgVGV4dEVuY29kZXIoKSkuZW5jb2RlKG1lc3NhZ2UpO1xuICAgIHRoaXMuX2RhdGEuc2V0KGJ5dGVzKTtcbiAgICB0aGlzLl9tYWdpYyA9IChieXRlcy5sZW5ndGggPDwgOCkgfCAoKHRoaXMuX21hZ2ljICsgMSkgJiAyNTUpO1xuICAgIHRoaXMuX3NpZ25hbFswXSA9IHRoaXMuX21hZ2ljO1xuXG4gICAgaWYgKG5vdGlmeSkge1xuICAgICAgQXRvbWljcy5ub3RpZnkodGhpcy5fc2lnbmFsLCBNQUdJQ19PRkZTRVQsIDEpO1xuICAgIH1cbiAgfVxufTtcblxufSAvLyBuYW1lc3BhY2UgTWVtb3J5VHJhbnNwb3J0XG4iLCIvKlxuICogTUlUIExpY2Vuc2VcbiAqXG4gKiBDb3B5cmlnaHQgKGMpIDIwMjUgIFl1cmlpIFlha3ViaW4gKHl1cmlpLnlha3ViaW5AZ21haWwuY29tKVxuICpcbiAqIFBlcm1pc3Npb24gaXMgZ3JhbnRlZCB0byB1c2UsIGNvcHksIG1vZGlmeSwgYW5kIGRpc3RyaWJ1dGUgdGhpcyBzb2Z0d2FyZVxuICogdW5kZXIgdGhlIE1JVCBMaWNlbnNlLiBTZWUgTElDRU5TRSBmaWxlIGZvciBkZXRhaWxzLlxuICovXG5cbmltcG9ydCB7IE1lc3NhZ2VQb3J0IH0gZnJvbSBcIm5vZGU6d29ya2VyX3RocmVhZHNcIjtcbmltcG9ydCB7IElNZXNzYWdlU2VuZGVyIH0gZnJvbSBcIkAvc2VydmVyL1RyYW5zcG9ydFwiO1xuaW1wb3J0IHsgTG9nZ2VyIH0gZnJvbSBcIkAvbG9nZ2VyXCI7XG5cbmNvbnN0IGxvZ2dlciA9IExvZ2dlci5jcmVhdGUoaW1wb3J0Lm1ldGEudXJsKTtcblxuZXhwb3J0IGNsYXNzIE1lc3NhZ2VQb3J0U2VuZGVyIGltcGxlbWVudHMgSU1lc3NhZ2VTZW5kZXIge1xuICBwcml2YXRlIF9tZXNzYWdlUG9ydDogTWVzc2FnZVBvcnQ7XG5cbiAgcHVibGljIGNvbnN0cnVjdG9yKG1lc3NhZ2VQb3J0OiBNZXNzYWdlUG9ydCkge1xuICAgIHRoaXMuX21lc3NhZ2VQb3J0ID0gbWVzc2FnZVBvcnQ7XG4gIH1cblxuICBwdWJsaWMgc2VuZE1lc3NhZ2UobWVzc2FnZTogYW55KTogdm9pZCB7XG4gICAgbG9nZ2VyLmRlYnVnKFwiPC0tXCIsIEpTT04uc3RyaW5naWZ5KG1lc3NhZ2UpKTtcbiAgICB0aGlzLl9tZXNzYWdlUG9ydC5wb3N0TWVzc2FnZShtZXNzYWdlKTtcbiAgfVxufTtcbiIsIi8qXG4gKiBNSVQgTGljZW5zZVxuICpcbiAqIENvcHlyaWdodCAoYykgMjAyNSAgWXVyaWkgWWFrdWJpbiAoeXVyaWkueWFrdWJpbkBnbWFpbC5jb20pXG4gKlxuICogUGVybWlzc2lvbiBpcyBncmFudGVkIHRvIHVzZSwgY29weSwgbW9kaWZ5LCBhbmQgZGlzdHJpYnV0ZSB0aGlzIHNvZnR3YXJlXG4gKiB1bmRlciB0aGUgTUlUIExpY2Vuc2UuIFNlZSBMSUNFTlNFIGZpbGUgZm9yIGRldGFpbHMuXG4gKi9cblxuaW1wb3J0IHsgTWFrZUNvbnRleHQgfSBmcm9tIFwiQC9jb3JlL0Jhc2VDb250ZXh0XCI7XG5pbXBvcnQgeyBjcmVhdGVWYXJpYWJsZU1hcEZvckRpcmVjdG9yeSB9IGZyb20gXCJAL2NvcmUvQmFzZUNvbnRleHRcIjtcbmltcG9ydCB7IEpzb25ScGNSZXF1ZXN0U3luYyB9IGZyb20gXCJAL3NlcnZlci9Kc29uUnBjUmVxdWVzdFN5bmNcIjtcbmltcG9ydCB7IE1BSU5OT0RFX0xPQURKU09OIH0gZnJvbSBcIkAvc2VydmVyL1JlbW90ZU1ldGhvZHNcIjtcbmltcG9ydCB7IE1BSU5OT0RFX0VYRUNVVEVTQ1JJUFQgfSBmcm9tIFwiQC9zZXJ2ZXIvUmVtb3RlTWV0aG9kc1wiO1xuaW1wb3J0IHsgTUFJTk5PREVfU1RBUlRNQUtFU0NSSVBUIH0gZnJvbSBcIkAvc2VydmVyL1JlbW90ZU1ldGhvZHNcIjtcbmltcG9ydCB7IExvZ2dlciB9IGZyb20gXCJAL2xvZ2dlclwiO1xuaW1wb3J0IHsgU2NvcGVIZWxwZXIsIFZhcmlhYmxlTWFwLCBWYXJpYW50TWFwIH0gZnJvbSBcIkAvY29yZS9TY29wZVwiO1xuaW1wb3J0IHsgTG9jYXRvciB9IGZyb20gXCJAL3V0aWxzL0xvY2F0b3JcIjtcblxuY29uc3QgbG9nZ2VyID0gTG9nZ2VyLmNyZWF0ZShpbXBvcnQubWV0YS51cmwpO1xuXG5leHBvcnQgY2xhc3MgUmVtb3RlTWFrZUNvbnRleHQgZXh0ZW5kcyBNYWtlQ29udGV4dCB7XG4gIHByaXZhdGUgX3RyYW5zcG9ydDogSnNvblJwY1JlcXVlc3RTeW5jO1xuXG4gIHB1YmxpYyBjb25zdHJ1Y3Rvcih0cmFuc3BvcnQ6IEpzb25ScGNSZXF1ZXN0U3luYykge1xuICAgIHN1cGVyKCk7XG4gICAgdGhpcy5fdHJhbnNwb3J0ID0gdHJhbnNwb3J0O1xuICB9XG5cbiAgcHVibGljIGV4ZWN1dGVTY3JpcHQoc2NvcGU6IFZhcmlhYmxlTWFwLCBzY3JpcHQ6IGFueSwgcGFyYW1zOiBhbnkpOiBhbnkge1xuICAgIGxvZ2dlci5kZWJ1ZyhcIlJlbW90ZU1ha2VDb250ZXh0LmV4ZWN1dGVTY3JpcHQoXCIsIHNjcmlwdCwgcGFyYW1zLCBcIilcIik7XG4gICAgY29uc3QgbmV3VmFyaWFibGVNYXAgPSBTY29wZUhlbHBlci5jbG9uZVZhcmlhYmxlTWFwKHNjb3BlKTtcbiAgICBwYXJhbXMgJiYgU2NvcGVIZWxwZXIuZXh0ZW5kVmFyaWFibGVNYXBCeVZhbHVlcyhuZXdWYXJpYWJsZU1hcCwgXCJcIiwgcGFyYW1zKTtcbiAgICBjb25zdCBzY3JpcHRGaWxlID0gU2NvcGVIZWxwZXIuZ2V0KG5ld1ZhcmlhYmxlTWFwLCBcIlNPVVJDRV9ESVJcIikucmVzb2x2ZShzY3JpcHQpO1xuICAgIFNjb3BlSGVscGVyLnNldChuZXdWYXJpYWJsZU1hcCwgXCJTQ1JJUFRfRklMRVwiLCBzY3JpcHRGaWxlKTtcbiAgICBTY29wZUhlbHBlci5zZXQobmV3VmFyaWFibGVNYXAsIFwiU0NSSVBUX0RJUlwiLCBzY3JpcHRGaWxlLmRpcm5hbWUoKSk7XG4gICAgcmV0dXJuIHRoaXMuX3RyYW5zcG9ydC5yZXF1ZXN0U3luYyhNQUlOTk9ERV9FWEVDVVRFU0NSSVBULCBTY29wZUhlbHBlci50b0pTT04obmV3VmFyaWFibGVNYXApKTtcbiAgfVxuICBcbiAgcHVibGljIGxvYWRKU09OKGZpbGVuYW1lOiBzdHJpbmcpOiBhbnkge1xuICAgIHJldHVybiB0aGlzLl90cmFuc3BvcnQucmVxdWVzdFN5bmMoTUFJTk5PREVfTE9BREpTT04sIGZpbGVuYW1lKTtcbiAgfVxuXG4gIHB1YmxpYyBhZGRTdWJkaXJlY3Rvcnkoc2NvcGU6IFZhcmlhYmxlTWFwLCBzb3VyY2VEaXI6IHN0cmluZyB8IExvY2F0b3IsIGJpbmFyeURpcj86IHN0cmluZyB8IExvY2F0b3IpOiB2b2lkIHtcbiAgICBsb2dnZXIuZGVidWcoXCJSZW1vdGVNYWtlQ29udGV4dC5hZGRTdWJkaXJlY3RvcnkoXCIsIHNvdXJjZURpciwgYmluYXJ5RGlyLCBcIilcIik7XG4gICAgY29uc3QgbmV3VmFyaWFibGVNYXAgPSBjcmVhdGVWYXJpYWJsZU1hcEZvckRpcmVjdG9yeShzY29wZSwgc291cmNlRGlyLCBiaW5hcnlEaXIpO1xuICAgIHRoaXMuX3RyYW5zcG9ydC5yZXF1ZXN0U3luYyhNQUlOTk9ERV9TVEFSVE1BS0VTQ1JJUFQsIFNjb3BlSGVscGVyLnRvSlNPTihuZXdWYXJpYWJsZU1hcCkpO1xuICB9XG59O1xuIiwiLypcbiAqIE1JVCBMaWNlbnNlXG4gKlxuICogQ29weXJpZ2h0IChjKSAyMDI1ICBZdXJpaSBZYWt1YmluICh5dXJpaS55YWt1YmluQGdtYWlsLmNvbSlcbiAqXG4gKiBQZXJtaXNzaW9uIGlzIGdyYW50ZWQgdG8gdXNlLCBjb3B5LCBtb2RpZnksIGFuZCBkaXN0cmlidXRlIHRoaXMgc29mdHdhcmVcbiAqIHVuZGVyIHRoZSBNSVQgTGljZW5zZS4gU2VlIExJQ0VOU0UgZmlsZSBmb3IgZGV0YWlscy5cbiAqL1xuXG5leHBvcnQgY29uc3QgTUFLRUNPTlRFWFRfQ1JFQVRFQ09OVEVYVCA9IFwiTWFrZUNvbnRleHQuY3JlYXRlQ29udGV4dFwiO1xuZXhwb3J0IGNvbnN0IE1BS0VDT05URVhUX0RFU1RST1lDT05URVhUID0gXCJNYWtlQ29udGV4dC5kZXN0cm95Q29udGV4dFwiO1xuZXhwb3J0IGNvbnN0IE1BS0VDT05URVhUX0VYRUNTQ1JJUFQgPSBcIk1ha2VDb250ZXh0LmV4ZWNTY3JpcHRcIjtcbmV4cG9ydCBjb25zdCBNQUtFQ09OVEVYVF9NQUlOVEFSR0VUUyA9IFwiTWFrZUNvbnRleHQubWFpblRhcmdldHNcIjtcbmV4cG9ydCBjb25zdCBNQUtFQ09OVEVYVF9QT1NUVEFSR0VUUyA9IFwiTWFrZUNvbnRleHQucG9zdFRhcmdldHNcIjtcbmV4cG9ydCBjb25zdCBNQUtFQ09OVEVYVF9NQUlOU0NSSVBUUyA9IFwiTWFrZUNvbnRleHQubWFpblNjcmlwdHNcIjtcbmV4cG9ydCBjb25zdCBNQUtFQ09OVEVYVF9QT1NUU0NSSVBUUyA9IFwiTWFrZUNvbnRleHQucG9zdFNjcmlwdHNcIjtcbmV4cG9ydCBjb25zdCBNQUtFQ09OVEVYVF9JTlNUQUxMRU5UUklFUyA9IFwiTWFrZUNvbnRleHQuaW5zdGFsbEVudHJpZXNcIjtcbmV4cG9ydCBjb25zdCBXT1JLRVJTRVJWSUNFX1BST0NFU1NFWElUID0gXCJXb3JrZXJTZXJ2aWNlLnByb2Nlc3NFeGl0XCI7XG5cbmV4cG9ydCBjb25zdCBNQUlOTk9ERV9MT0FESlNPTiA9IFwiTWFpbk5vZGUubG9hZEpTT05cIjtcbmV4cG9ydCBjb25zdCBNQUlOTk9ERV9FWEVDVVRFU0NSSVBUID0gXCJNYWluTm9kZS5leGVjdXRlU2NyaXB0XCI7XG5leHBvcnQgY29uc3QgTUFJTk5PREVfU1RBUlRNQUtFU0NSSVBUID0gXCJNYWluTm9kZS5zdGFydE1ha2VTY3JpcHRcIjtcbiIsIi8qXG4gKiBNSVQgTGljZW5zZVxuICpcbiAqIENvcHlyaWdodCAoYykgMjAyNSAgWXVyaWkgWWFrdWJpbiAoeXVyaWkueWFrdWJpbkBnbWFpbC5jb20pXG4gKlxuICogUGVybWlzc2lvbiBpcyBncmFudGVkIHRvIHVzZSwgY29weSwgbW9kaWZ5LCBhbmQgZGlzdHJpYnV0ZSB0aGlzIHNvZnR3YXJlXG4gKiB1bmRlciB0aGUgTUlUIExpY2Vuc2UuIFNlZSBMSUNFTlNFIGZpbGUgZm9yIGRldGFpbHMuXG4gKi9cblxuZXhwb3J0IGNvbnN0IEpTT05SUENfVkVSU0lPTiA9IFwiMi4wXCI7XG5leHBvcnQgaW50ZXJmYWNlIElNZXNzYWdlU2VuZGVyIHtcbiAgc2VuZE1lc3NhZ2UobWVzc2FnZTogYW55KTogdm9pZDtcbn07XG5cbmV4cG9ydCBpbnRlcmZhY2UgSU1lc3NhZ2VFbWl0dGVyIHtcbiAgZW1pdE1lc3NhZ2Uoc2VuZGVyOiBJTWVzc2FnZVNlbmRlciwgbWVzc2FnZTogYW55KTogdm9pZDtcbn07XG5cbmV4cG9ydCBpbnRlcmZhY2UgSVJlcXVlc3RTeW5jIHtcbiAgcmVxdWVzdFN5bmMoZGF0YTogYW55KTogYW55O1xufTtcblxuZXhwb3J0IGludGVyZmFjZSBJSnNvblJwY1JlY2l2ZXIge1xuICBvblJlcXVlc3QobWV0aG9kOiBzdHJpbmcsIGlkOiBudW1iZXIsIHBhcmFtcz86IGFueSk6IHZvaWQ7XG4gIG9uUmVzdWx0KHJlc3VsdDogYW55LCBpZDogbnVtYmVyKTogdm9pZDtcbiAgb25FcnJvcihlcnJvcjogb2JqZWN0LCBpZDogbnVtYmVyIHwgbnVsbCk6IHZvaWQ7XG4gIG9uTm90aWZpY2F0aW9uKG1ldGhvZDogc3RyaW5nLCBwYXJhbXM/OiBhbnkpOiB2b2lkO1xufTtcblxuZXhwb3J0IGludGVyZmFjZSBJSnNvblJwY1NlbmRlciB7XG4gIC8vIHNlbmRNZXRob2QobWV0aG9kOiBzdHJpbmcsIHBhcmFtcz86IGFueSwgY2FsbGJhY2s6ICgpKTogdm9pZDtcbn07XG5cbmV4cG9ydCBpbnRlcmZhY2UgSnNvblJwY0RhdGEge1xuICBqc29ucnBjOiBzdHJpbmc7XG4gIG1ldGhvZD86IHN0cmluZztcbiAgcGFyYW1zPzogYW55O1xuICBpZD86IG51bWJlciB8IG51bGw7XG4gIGVycm9yPzoge1xuICAgIGNvZGU6IG51bWJlcixcbiAgICBtZXNzYWdlOiBzdHJpbmcsXG4gICAgZGF0YT86IGFueSxcbiAgfSxcbiAgcmVzdWx0PzogYW55O1xufTtcblxuZXhwb3J0IHR5cGUgSnNvblJwY1JlcXVlc3RIYW5kbGVyID0gKHJlcXVlc3Q6IElKc29uUnBjUmVxdWVzdCwgcmVzcG9uc2U6IElKc29uUnBjUmVzcG9uc2UpID0+IHZvaWQ7XG5leHBvcnQgdHlwZSBKc29uUnBjQ2FsbGJhY2sgPSAocGFyYW1zPzogYW55KSA9PiBhbnk7XG5leHBvcnQgdHlwZSBKc29uUnBjRGF0YUNhbGxiYWNrID0gKGRhdGE6IEpzb25ScGNEYXRhKSA9PiB2b2lkO1xuXG5leHBvcnQgaW50ZXJmYWNlIElKc29uUnBjUmVxdWVzdCB7XG4gIGdldCBwYXJhbXMoKTogYW55O1xufTtcblxuZXhwb3J0IGludGVyZmFjZSBJSnNvblJwY1Jlc3BvbnNlIHtcbiAgc2VuZFJlc3VsdChqc29uOiBhbnkpOiB2b2lkO1xufTtcbiIsIi8qXG4gKiBNSVQgTGljZW5zZVxuICpcbiAqIENvcHlyaWdodCAoYykgMjAyNSAgWXVyaWkgWWFrdWJpbiAoeXVyaWkueWFrdWJpbkBnbWFpbC5jb20pXG4gKlxuICogUGVybWlzc2lvbiBpcyBncmFudGVkIHRvIHVzZSwgY29weSwgbW9kaWZ5LCBhbmQgZGlzdHJpYnV0ZSB0aGlzIHNvZnR3YXJlXG4gKiB1bmRlciB0aGUgTUlUIExpY2Vuc2UuIFNlZSBMSUNFTlNFIGZpbGUgZm9yIGRldGFpbHMuXG4gKi9cblxuaW1wb3J0IHsgSU1lc3NhZ2VTZW5kZXIgfSBmcm9tIFwiQC9zZXJ2ZXIvVHJhbnNwb3J0XCI7XG5pbXBvcnQgeyBNZW1vcnlUcmFuc3BvcnQgfSBmcm9tIFwiQC9zZXJ2ZXIvTWVtb3J5VHJhbnNwb3J0XCI7XG5pbXBvcnQgeyBKc29uUnBjRGlzcGF0Y2hlciB9IGZyb20gXCJAL3NlcnZlci9Kc29uUnBjRGlzcGF0Y2hlclwiO1xuaW1wb3J0IHsgTWFrZUNvbnRleHRQcm92aWRlciB9IGZyb20gXCJAL3NlcnZlci9NYWtlQ29udGV4dFByb3ZpZGVyXCI7XG5pbXBvcnQgeyBXb3JrZXJTZXJ2aWNlUHJvdmlkZXIgfSBmcm9tIFwiQC9zZXJ2ZXIvV29ya2VyU2VydmljZVByb3ZpZGVyXCI7XG5pbXBvcnQgeyBNQUtFQ09OVEVYVF9DUkVBVEVDT05URVhUIH0gZnJvbSBcIkAvc2VydmVyL1JlbW90ZU1ldGhvZHNcIjtcbmltcG9ydCB7IE1BS0VDT05URVhUX0RFU1RST1lDT05URVhUIH0gZnJvbSBcIkAvc2VydmVyL1JlbW90ZU1ldGhvZHNcIjtcbmltcG9ydCB7IE1BS0VDT05URVhUX0VYRUNTQ1JJUFQgfSBmcm9tIFwiQC9zZXJ2ZXIvUmVtb3RlTWV0aG9kc1wiO1xuaW1wb3J0IHsgTUFLRUNPTlRFWFRfTUFJTlRBUkdFVFMgfSBmcm9tIFwiQC9zZXJ2ZXIvUmVtb3RlTWV0aG9kc1wiO1xuaW1wb3J0IHsgTUFLRUNPTlRFWFRfUE9TVFRBUkdFVFMgfSBmcm9tIFwiQC9zZXJ2ZXIvUmVtb3RlTWV0aG9kc1wiO1xuaW1wb3J0IHsgTUFLRUNPTlRFWFRfTUFJTlNDUklQVFMgfSBmcm9tIFwiQC9zZXJ2ZXIvUmVtb3RlTWV0aG9kc1wiO1xuaW1wb3J0IHsgTUFLRUNPTlRFWFRfUE9TVFNDUklQVFMgfSBmcm9tIFwiQC9zZXJ2ZXIvUmVtb3RlTWV0aG9kc1wiO1xuaW1wb3J0IHsgTUFLRUNPTlRFWFRfSU5TVEFMTEVOVFJJRVMgfSBmcm9tIFwiQC9zZXJ2ZXIvUmVtb3RlTWV0aG9kc1wiO1xuaW1wb3J0IHsgV09SS0VSU0VSVklDRV9QUk9DRVNTRVhJVCB9IGZyb20gXCJAL3NlcnZlci9SZW1vdGVNZXRob2RzXCI7XG5pbXBvcnQgeyBMb2dnZXIgfSBmcm9tIFwiQC9sb2dnZXJcIjtcblxuY29uc3QgbG9nZ2VyID0gTG9nZ2VyLmNyZWF0ZShpbXBvcnQubWV0YS51cmwpO1xuXG5leHBvcnQgY2xhc3MgV29ya2VyTWVzc2FnZURpc3BhdGNoZXIge1xuICBwcml2YXRlIF9qc29uUnBjRGlzcGF0Y2hlcjogSnNvblJwY0Rpc3BhdGNoZXI7XG5cbiAgcHVibGljIGNvbnN0cnVjdG9yKG5hbWU6IHN0cmluZywgc2VuZGVyOiBJTWVzc2FnZVNlbmRlcikge1xuICAgIHRoaXMuX2pzb25ScGNEaXNwYXRjaGVyID0gbmV3IEpzb25ScGNEaXNwYXRjaGVyO1xuXG4gICAgY29uc3QgYnVmZmVyID0gbmV3IFNoYXJlZEFycmF5QnVmZmVyKDB4ODAwMCk7XG4gICAgY29uc3QgdHJhbnNwb3J0ID0gbmV3IE1lbW9yeVRyYW5zcG9ydChzZW5kZXIsIGJ1ZmZlcik7XG5cbiAgICBjb25zdCBtYWtlQ29udGV4dCA9IG5ldyBNYWtlQ29udGV4dFByb3ZpZGVyKG5hbWUsIHRyYW5zcG9ydCk7XG4gICAgdGhpcy5fanNvblJwY0Rpc3BhdGNoZXIucmVnaXN0ZXJDYWxsYmFjayhNQUtFQ09OVEVYVF9DUkVBVEVDT05URVhULCBwYXJhbXMgPT4gbWFrZUNvbnRleHQuY3JlYXRlQ29udGV4dChwYXJhbXMpKTtcbiAgICB0aGlzLl9qc29uUnBjRGlzcGF0Y2hlci5yZWdpc3RlckNhbGxiYWNrKE1BS0VDT05URVhUX0RFU1RST1lDT05URVhULCBwYXJhbXMgPT4gbWFrZUNvbnRleHQuZGVzdHJveUNvbnRleHQocGFyYW1zKSk7XG4gICAgdGhpcy5fanNvblJwY0Rpc3BhdGNoZXIucmVnaXN0ZXJDYWxsYmFjayhNQUtFQ09OVEVYVF9FWEVDU0NSSVBULCBwYXJhbXMgPT4gbWFrZUNvbnRleHQuZXhlY1NjcmlwdChwYXJhbXMpKTtcbiAgICB0aGlzLl9qc29uUnBjRGlzcGF0Y2hlci5yZWdpc3RlckNhbGxiYWNrKE1BS0VDT05URVhUX01BSU5UQVJHRVRTLCBwYXJhbXMgPT4gbWFrZUNvbnRleHQubWFpblRhcmdldHMocGFyYW1zKSk7XG4gICAgdGhpcy5fanNvblJwY0Rpc3BhdGNoZXIucmVnaXN0ZXJDYWxsYmFjayhNQUtFQ09OVEVYVF9QT1NUVEFSR0VUUywgcGFyYW1zID0+IG1ha2VDb250ZXh0LnBvc3RUYXJnZXRzKHBhcmFtcykpO1xuICAgIHRoaXMuX2pzb25ScGNEaXNwYXRjaGVyLnJlZ2lzdGVyQ2FsbGJhY2soTUFLRUNPTlRFWFRfTUFJTlNDUklQVFMsIHBhcmFtcyA9PiBtYWtlQ29udGV4dC5tYWluU2NyaXB0cyhwYXJhbXMpKTtcbiAgICB0aGlzLl9qc29uUnBjRGlzcGF0Y2hlci5yZWdpc3RlckNhbGxiYWNrKE1BS0VDT05URVhUX1BPU1RTQ1JJUFRTLCBwYXJhbXMgPT4gbWFrZUNvbnRleHQucG9zdFNjcmlwdHMocGFyYW1zKSk7XG4gICAgdGhpcy5fanNvblJwY0Rpc3BhdGNoZXIucmVnaXN0ZXJDYWxsYmFjayhNQUtFQ09OVEVYVF9JTlNUQUxMRU5UUklFUywgcGFyYW1zID0+IG1ha2VDb250ZXh0Lmluc3RhbGxFbnRyaWVzKHBhcmFtcykpO1xuXG4gICAgY29uc3Qgd29ya2VyU2VydmljZSA9IG5ldyBXb3JrZXJTZXJ2aWNlUHJvdmlkZXI7XG4gICAgdGhpcy5fanNvblJwY0Rpc3BhdGNoZXIucmVnaXN0ZXJDYWxsYmFjayhXT1JLRVJTRVJWSUNFX1BST0NFU1NFWElULCBwYXJhbXMgPT4gd29ya2VyU2VydmljZS5wcm9jZXNzRXhpdChwYXJhbXMpKTtcbiAgfVxuXG4gIHB1YmxpYyBwcmVyZm9ybU1lc3NhZ2UobWVzc2FnZTogYW55KTogUHJvbWlzZTxhbnk+IHtcbiAgICByZXR1cm4gdGhpcy5fanNvblJwY0Rpc3BhdGNoZXIucHJlcmZvcm1NZXNzYWdlKG1lc3NhZ2UpO1xuICB9XG59O1xuIiwiLypcbiAqIE1JVCBMaWNlbnNlXG4gKlxuICogQ29weXJpZ2h0IChjKSAyMDI1ICBZdXJpaSBZYWt1YmluICh5dXJpaS55YWt1YmluQGdtYWlsLmNvbSlcbiAqXG4gKiBQZXJtaXNzaW9uIGlzIGdyYW50ZWQgdG8gdXNlLCBjb3B5LCBtb2RpZnksIGFuZCBkaXN0cmlidXRlIHRoaXMgc29mdHdhcmVcbiAqIHVuZGVyIHRoZSBNSVQgTGljZW5zZS4gU2VlIExJQ0VOU0UgZmlsZSBmb3IgZGV0YWlscy5cbiAqL1xuXG5leHBvcnQgY2xhc3MgV29ya2VyU2VydmljZVByb3ZpZGVyIHtcbiAgcHVibGljIHByb2Nlc3NFeGl0KHBhcmFtczogYW55KTogdm9pZCB7XG4gICAgc2V0VGltZW91dCgoKSA9PiBwcm9jZXNzLmV4aXQocGFyYW1zKSwgMCk7XG4gIH1cbn07XG4iLCIvKlxuICogTUlUIExpY2Vuc2VcbiAqXG4gKiBDb3B5cmlnaHQgKGMpIDIwMjUgIFl1cmlpIFlha3ViaW4gKHl1cmlpLnlha3ViaW5AZ21haWwuY29tKVxuICpcbiAqIFBlcm1pc3Npb24gaXMgZ3JhbnRlZCB0byB1c2UsIGNvcHksIG1vZGlmeSwgYW5kIGRpc3RyaWJ1dGUgdGhpcyBzb2Z0d2FyZVxuICogdW5kZXIgdGhlIE1JVCBMaWNlbnNlLiBTZWUgTElDRU5TRSBmaWxlIGZvciBkZXRhaWxzLlxuICovXG5cbmV4cG9ydCBuYW1lc3BhY2UgQXJncyB7XG5cbmZ1bmN0aW9uIHRvT3B0aW9uS2V5KG5hbWU6IHN0cmluZykge1xuICBpZiAoIW5hbWUuc3RhcnRzV2l0aChcIi0tXCIpKVxuICAgIHJldHVybiBudWxsO1xuXG4gIG5hbWUgPSBuYW1lLnN1YnN0cmluZygyKS50b0xvd2VyQ2FzZSgpO1xuICBpZiAoIW5hbWUubGVuZ3RoKVxuICAgIHJldHVybiBudWxsO1xuXG4gIGxldCBrZXkgPSBuYW1lLmNoYXJBdCgwKTtcbiAgaWYgKCFrZXkubWF0Y2goL1thLXpdLykpXG4gICAgcmV0dXJuIG51bGw7XG5cbiAgbGV0IGh5cGhlbiA9IDA7XG4gIGZvciAobGV0IGkgPSAxOyBpIDwgbmFtZS5sZW5ndGg7IGkrKykge1xuICAgIGNvbnN0IGNoID0gbmFtZS5jaGFyQXQoaSk7XG4gICAgaWYgKGNoLm1hdGNoKC9bYS16MC05XS8pKSB7XG4gICAgICBrZXkgKz0gKGh5cGhlbiA/IGNoLnRvVXBwZXJDYXNlKCkgOiBjaClcbiAgICAgIGh5cGhlbiA9IDA7XG4gICAgfVxuICAgIGVsc2UgaWYgKGNoID09IFwiLVwiKSB7XG4gICAgICBpZiAoKytoeXBoZW4gPiAxKVxuICAgICAgICByZXR1cm4gbnVsbDtcbiAgICB9XG4gIH1cblxuICByZXR1cm4gaHlwaGVuID8gbnVsbCA6IGtleTtcbn1cblxuZXhwb3J0IGZ1bmN0aW9uIHRvT2JqZWN0KGFyZ3M6IHN0cmluZ1tdKTogb2JqZWN0IHtcbiAgY29uc3QgcmVzdWx0OiBhbnkgPSB7fTtcblxuICBsZXQgbGFzdEtleSA9IG51bGw7XG4gIGZvciAoY29uc3QgaXRlciBvZiBhcmdzKSB7XG4gICAgaWYgKGl0ZXIuc3RhcnRzV2l0aChcIi0tXCIpKSB7XG4gICAgICBjb25zdCBrZXkgPSB0b09wdGlvbktleShpdGVyKTtcbiAgICAgIGlmICgha2V5KVxuICAgICAgICB0aHJvdyBFcnJvcihgT3B0aW9uICR7aXRlcn0gaXMgbm90IHN1cHBvcnRlZGApO1xuICAgICAgaWYgKHJlc3VsdC5oYXNPd25Qcm9wZXJ0eShrZXkpKVxuICAgICAgICB0aHJvdyBFcnJvcihgQ2Fubm90IHNwZWNpZnkgdGhlIHNhbWUgb3B0aW9uICcke2l0ZXJ9JyBtb3JlIHRoYW4gb25jZWApO1xuICAgICAgbGFzdEtleSA9IGtleTtcbiAgICAgIHJlc3VsdFtrZXldID0gdHJ1ZTtcbiAgICB9XG4gICAgZWxzZSBpZiAobGFzdEtleSkge1xuICAgICAgY29uc3QgdmFsdWUgPSByZXN1bHRbbGFzdEtleV07XG4gICAgICBpZiAodHlwZW9mIHZhbHVlID09PSAnYm9vbGVhbicpXG4gICAgICAgIHJlc3VsdFtsYXN0S2V5XSA9IGl0ZXI7XG4gICAgICBlbHNlIGlmICh0eXBlb2YgdmFsdWUgPT09ICdzdHJpbmcnKVxuICAgICAgICByZXN1bHRbbGFzdEtleV0gPSBbIHZhbHVlLCBpdGVyIF07XG4gICAgICBlbHNlXG4gICAgICAgIHZhbHVlLnB1c2goaXRlcik7XG4gICAgfVxuICAgIGVsc2Uge1xuICAgICAgdGhyb3cgRXJyb3IoYE5lZWQgdG8gc3BlY2lmeSB0aGUgb3B0aW9uIG5hbWUgYmVmb3JlICcke2l0ZXJ9JyBwYXJhbWV0ZXJgKTtcbiAgICB9XG4gIH1cblxuICByZXR1cm4gcmVzdWx0O1xufVxuXG59IC8vIG5hbWVzcGFjZSBBcmdzXG4iLCIvKlxuICogTUlUIExpY2Vuc2VcbiAqXG4gKiBDb3B5cmlnaHQgKGMpIDIwMjUgIFl1cmlpIFlha3ViaW4gKHl1cmlpLnlha3ViaW5AZ21haWwuY29tKVxuICpcbiAqIFBlcm1pc3Npb24gaXMgZ3JhbnRlZCB0byB1c2UsIGNvcHksIG1vZGlmeSwgYW5kIGRpc3RyaWJ1dGUgdGhpcyBzb2Z0d2FyZVxuICogdW5kZXIgdGhlIE1JVCBMaWNlbnNlLiBTZWUgTElDRU5TRSBmaWxlIGZvciBkZXRhaWxzLlxuICovXG5cbmltcG9ydCBwYXRoIGZyb20gXCJub2RlOnBhdGhcIjtcbmltcG9ydCBmcyBmcm9tIFwibm9kZTpmc1wiO1xuaW1wb3J0IHsgc3Bhd24sIGV4ZWNGaWxlIH0gZnJvbSBcIm5vZGU6Y2hpbGRfcHJvY2Vzc1wiO1xuaW1wb3J0IHV0aWwgZnJvbSBcIm5vZGU6dXRpbFwiO1xuaW1wb3J0IHsgTG9nZ2VyIH0gZnJvbSBcIkAvbG9nZ2VyXCI7XG5cbmNvbnN0IGxvZ2dlciA9IExvZ2dlci5jcmVhdGUoaW1wb3J0Lm1ldGEudXJsKTtcblxuaW50ZXJmYWNlIFNwYXduQXN5bmNPcHRpb25zIHtcbiAgY3dkPzogc3RyaW5nO1xuICBlbmNvZGluZz86IEJ1ZmZlckVuY29kaW5nO1xuICBlbnY/OiBhbnk7XG4gIG5vc3Rkb3V0PzogYm9vbGVhbjtcbiAgZXh0cmE/OiB7XG4gICAgdmVyYm9zZT86IGJvb2xlYW47XG4gICAgb3V0cHV0Pzogc3RyaW5nO1xuICB9O1xufTtcblxuaW50ZXJmYWNlIFNwYXduQXN5bmNSZXR1cm5zIHtcbiAgc3RhdHVzOiBudW1iZXI7XG4gIHN0ZG91dDogc3RyaW5nO1xuICBzdGRlcnI6IHN0cmluZztcbiAgb3V0cHV0OiBzdHJpbmc7XG4gIGVycm9yPzogRXJyb3IgfCB1bmRlZmluZWQ7XG59O1xuXG5leHBvcnQgZnVuY3Rpb24gc3Bhd25Bc3luYyhjb21tYW5kOiBzdHJpbmcsIGFyZ3M6IHN0cmluZ1tdLCBvcHRpb25zPzogU3Bhd25Bc3luY09wdGlvbnMpOiBQcm9taXNlPFNwYXduQXN5bmNSZXR1cm5zPiB7XG4gIGxldCBmZCA9IG51bGw7XG4gIGxldCB2ZXJib3NlID0gZmFsc2U7XG4gIGNvbnN0IGVuY29kaW5nID0gb3B0aW9ucz8uZW5jb2Rpbmc7XG5cbiAgaWYgKG9wdGlvbnMgJiYgb3B0aW9ucy5leHRyYSkge1xuICAgIGlmIChvcHRpb25zLmV4dHJhLnZlcmJvc2UpXG4gICAgICB2ZXJib3NlID0gdHJ1ZTtcbiAgICBpZiAob3B0aW9ucy5leHRyYS5vdXRwdXQpIHtcbiAgICAgIGxldCBsb2dmaWxlID0gb3B0aW9ucy5leHRyYS5vdXRwdXQ7XG4gICAgICBpZiAoIXBhdGguaXNBYnNvbHV0ZShsb2dmaWxlKSAmJiBvcHRpb25zLmN3ZCkge1xuICAgICAgICBsb2dmaWxlID0gcGF0aC5yZXNvbHZlKG9wdGlvbnMuY3dkLCBsb2dmaWxlKTtcbiAgICAgIH1cbiAgICAgIGZkID0gZnMub3BlblN5bmMobG9nZmlsZSwgXCJ3K1wiLCAwbzY2Nik7XG4gICAgfVxuICB9XG5cbiAgcmV0dXJuIG5ldyBQcm9taXNlKChyZXNvbHZlLCByZWplY3QpID0+IHtcbiAgICB2ZXJib3NlICYmIGxvZ2dlci5ub3RpY2UoWyBwYXRoLmJhc2VuYW1lKGNvbW1hbmQpLCAuLi5hcmdzIF0uam9pbihcIiBcIikpO1xuXG4gICAgaWYgKGZkKSB7XG4gICAgICBmcy53cml0ZVN5bmMoZmQsIEpTT04uc3RyaW5naWZ5KHtjb21tYW5kLCBhcmdzLCBvcHRpb25zIH0sIG51bGwsIDIpICsgXCJcXG5cIik7XG4gICAgfVxuXG4gICAgY29uc3Qgc3Rkb3V0OiBCdWZmZXJbXSA9IFtdO1xuICAgIGNvbnN0IHN0ZGVycjogQnVmZmVyW10gPSBbXTtcbiAgICBjb25zdCBvdXRwdXQ6IEJ1ZmZlcltdID0gW107XG5cbiAgICBjb25zdCBleGVjID0gc3Bhd24oY29tbWFuZCwgYXJncywgb3B0aW9ucyk7XG5cbiAgICBpZiAoZmQpIHtcbiAgICAgIGV4ZWMuc3Rkb3V0LmFkZExpc3RlbmVyKFwiZGF0YVwiLCBjaHVuayA9PiBmcy53cml0ZVN5bmMoZmQsIGNodW5rKSk7XG4gICAgICBleGVjLnN0ZGVyci5hZGRMaXN0ZW5lcihcImRhdGFcIiwgY2h1bmsgPT4gZnMud3JpdGVTeW5jKGZkLCBjaHVuaykpO1xuICAgICAgZXhlYy5hZGRMaXN0ZW5lcihcImNsb3NlXCIsICgpID0+IGZzLmNsb3NlU3luYyhmZCkpO1xuICAgIH1cbiAgICBlbHNlIHtcbiAgICAgIGV4ZWMuc3Rkb3V0LmFkZExpc3RlbmVyKFwiZGF0YVwiLCBjaHVuayA9PiB7XG4gICAgICAgIHN0ZG91dC5wdXNoKGNodW5rKTtcbiAgICAgICAgb3V0cHV0LnB1c2goY2h1bmspO1xuICAgICAgfSk7XG4gICAgICBleGVjLnN0ZGVyci5hZGRMaXN0ZW5lcihcImRhdGFcIiwgY2h1bmsgPT4ge1xuICAgICAgICBzdGRlcnIucHVzaChjaHVuayk7XG4gICAgICAgIG91dHB1dC5wdXNoKGNodW5rKTtcbiAgICAgIH0pO1xuICAgIH1cblxuICAgIGlmICghb3B0aW9ucz8ubm9zdGRvdXQpIHtcbiAgICAgIGV4ZWMuc3Rkb3V0LmFkZExpc3RlbmVyKFwiZGF0YVwiLCBjaHVuayA9PiBwcm9jZXNzLnN0ZG91dC53cml0ZShjaHVuaykpO1xuICAgICAgZXhlYy5zdGRlcnIuYWRkTGlzdGVuZXIoXCJkYXRhXCIsIGNodW5rID0+IHByb2Nlc3Muc3RkZXJyLndyaXRlKGNodW5rKSk7XG4gICAgfVxuXG4gICAgZXhlYy5hZGRMaXN0ZW5lcihcImNsb3NlXCIsIChzdGF0dXM6IG51bWJlcikgPT4gcmVzb2x2ZSh7XG4gICAgICBzdGF0dXMsXG4gICAgICBzdGRvdXQ6IEJ1ZmZlci5jb25jYXQoc3Rkb3V0KS50b1N0cmluZyhlbmNvZGluZyksXG4gICAgICBzdGRlcnI6IEJ1ZmZlci5jb25jYXQoc3RkZXJyKS50b1N0cmluZyhlbmNvZGluZyksXG4gICAgICBvdXRwdXQ6IEJ1ZmZlci5jb25jYXQob3V0cHV0KS50b1N0cmluZyhlbmNvZGluZyksXG4gICAgfSkpO1xuICB9KTtcbn1cblxuZXhwb3J0IGNvbnN0IGV4ZWNGaWxlQXN5bmMgPSB1dGlsLnByb21pc2lmeShleGVjRmlsZSk7XG4iLCIvKlxuICogTUlUIExpY2Vuc2VcbiAqXG4gKiBDb3B5cmlnaHQgKGMpIDIwMjUgIFl1cmlpIFlha3ViaW4gKHl1cmlpLnlha3ViaW5AZ21haWwuY29tKVxuICpcbiAqIFBlcm1pc3Npb24gaXMgZ3JhbnRlZCB0byB1c2UsIGNvcHksIG1vZGlmeSwgYW5kIGRpc3RyaWJ1dGUgdGhpcyBzb2Z0d2FyZVxuICogdW5kZXIgdGhlIE1JVCBMaWNlbnNlLiBTZWUgTElDRU5TRSBmaWxlIGZvciBkZXRhaWxzLlxuICovXG5cbmltcG9ydCBmcyBmcm9tIFwibm9kZTpmc1wiO1xuaW1wb3J0IHBhdGggZnJvbSBcIm5vZGU6cGF0aFwiO1xuaW1wb3J0IHVybCBmcm9tIFwibm9kZTp1cmxcIjtcblxuaW1wb3J0IHsgRklMRV9TQ0hFTUUsIElNUE9SVF9TQ0hFTUUsIEhUVFBfU0NIRU1FLCBIVFRQU19TQ0hFTUUgfSBmcm9tIFwiQC91dGlscy9VcmxTY2hlbWVcIjtcbmltcG9ydCB7IHJlcXVpcmVSZXNvbHZlIH0gZnJvbSBcIkAvdXRpbHMvTW9kdWxlXCI7XG5cbmV4cG9ydCBhc3luYyBmdW5jdGlvbiBwYXRoRXhpc3RzKHBhdGg6IHN0cmluZykge1xuICB0cnkge1xuICAgIHJldHVybiAhIShhd2FpdCBmcy5wcm9taXNlcy5zdGF0KHBhdGgpKTtcbiAgfSBjYXRjaCB7XG4gICAgcmV0dXJuIGZhbHNlO1xuICB9XG59XG5cbmV4cG9ydCBmdW5jdGlvbiBwYXRoRXhpc3RzU3luYyhwYXRoOiBzdHJpbmcpIHtcbiAgdHJ5IHtcbiAgICByZXR1cm4gISFmcy5zdGF0U3luYyhwYXRoKTtcbiAgfSBjYXRjaCB7XG4gICAgcmV0dXJuIGZhbHNlO1xuICB9XG59XG5cbmV4cG9ydCBhc3luYyBmdW5jdGlvbiBmaWxlRXhpc3RzKHBhdGg6IHN0cmluZykge1xuICB0cnkge1xuICAgIHJldHVybiAoYXdhaXQgZnMucHJvbWlzZXMuc3RhdChwYXRoKSkuaXNGaWxlKCk7XG4gIH0gY2F0Y2gge1xuICAgIHJldHVybiBmYWxzZTtcbiAgfVxufVxuXG5leHBvcnQgZnVuY3Rpb24gZmlsZUV4aXN0c1N5bmMocGF0aDogc3RyaW5nKSB7XG4gIHRyeSB7XG4gICAgcmV0dXJuIGZzLnN0YXRTeW5jKHBhdGgpLmlzRmlsZSgpO1xuICB9IGNhdGNoIHtcbiAgICByZXR1cm4gZmFsc2U7XG4gIH0gXG59XG5cbmV4cG9ydCBhc3luYyBmdW5jdGlvbiBkaXJlY3RvcnlFeGlzdHMocGF0aDogc3RyaW5nKSB7XG4gIHRyeSB7XG4gICAgcmV0dXJuIChhd2FpdCBmcy5wcm9taXNlcy5zdGF0KHBhdGgpKS5pc0RpcmVjdG9yeSgpO1xuICB9IGNhdGNoIHtcbiAgICByZXR1cm4gZmFsc2U7XG4gIH1cbn1cblxuZXhwb3J0IGZ1bmN0aW9uIGRpcmVjdG9yeUV4aXN0c1N5bmMocGF0aDogc3RyaW5nKSB7XG4gIHRyeSB7XG4gICByZXR1cm4gZnMuc3RhdFN5bmMocGF0aCkuaXNEaXJlY3RvcnkoKTtcbiAgfSBjYXRjaCB7XG4gICAgcmV0dXJuIGZhbHNlO1xuICB9XG59XG5cbmV4cG9ydCBmdW5jdGlvbiBleHRuYW1lKGZ1bGxwYXRoOiBzdHJpbmcsIG9wdGlvbnM6IGFueSkge1xuICBpZiAob3B0aW9ucz8ubG9uZ2VzdCkge1xuICAgIGNvbnN0IGZpbGVuYW1lID0gcGF0aC5iYXNlbmFtZShmdWxscGF0aCk7XG4gICAgY29uc3QgaW5kZXggPSBmaWxlbmFtZS5pbmRleE9mKCcuJyk7XG4gICAgcmV0dXJuIGluZGV4ICE9IC0xID8gZmlsZW5hbWUuc3Vic3RyaW5nKGluZGV4KSA6ICcnO1xuICB9XG5cbiAgcmV0dXJuIHBhdGguZXh0bmFtZShmdWxscGF0aCk7XG59XG5cbmV4cG9ydCBhc3luYyBmdW5jdGlvbiBmaWxlTGlzdChkaXJuYW1lOiBzdHJpbmcsIG9wdGlvbnM6IGFueSk6IFByb21pc2U8QXJyYXk8c3RyaW5nPj4ge1xuICBjb25zdCBsaXN0ID0gbmV3IEFycmF5PHN0cmluZz47XG4gIGlmIChhd2FpdCBkaXJlY3RvcnlFeGlzdHMoZGlybmFtZSkpIHtcbiAgICBmb3IgKGNvbnN0IGl0ZXIgb2YgYXdhaXQgZnMucHJvbWlzZXMucmVhZGRpcihkaXJuYW1lKSkge1xuICAgICAgY29uc3QgZmlsZXBhdGggPSBwYXRoLnJlc29sdmUoZGlybmFtZSwgaXRlcik7XG4gICAgICBjb25zdCBzdGF0ID0gYXdhaXQgZnMucHJvbWlzZXMuc3RhdChmaWxlcGF0aCk7XG4gICAgICBpZiAoc3RhdC5pc0ZpbGUoKSkge1xuICAgICAgICBsaXN0LnB1c2gob3B0aW9ucy5yZWxhdGl2ZSA/IHBhdGgucmVsYXRpdmUob3B0aW9ucy5yZWxhdGl2ZSwgZmlsZXBhdGgpIDogZmlsZXBhdGgpO1xuICAgICAgfVxuICAgICAgZWxzZSBpZiAob3B0aW9ucy5yZWN1cnNpdmUgJiYgc3RhdC5pc0RpcmVjdG9yeSgpKSB7XG4gICAgICAgIGZvciAoY29uc3QgZm5hbWUgb2YgYXdhaXQgZmlsZUxpc3QoZmlsZXBhdGgsIG9wdGlvbnMpKVxuICAgICAgICAgIGxpc3QucHVzaChmbmFtZSk7XG4gICAgICB9XG4gICAgfVxuICB9XG4gIHJldHVybiBsaXN0O1xufVxuXG5leHBvcnQgYXN5bmMgZnVuY3Rpb24gc2F2ZUlmRGlmZmVyZW50KGZpbGVuYW1lOiBzdHJpbmcsIGNvbnRlbnQ6IHN0cmluZykge1xuICBpZiAoYXdhaXQgZmlsZUV4aXN0cyhmaWxlbmFtZSkpIHtcbiAgICBjb25zdCBvbGRDb250ZW50ID0gYXdhaXQgZnMucHJvbWlzZXMucmVhZEZpbGUoZmlsZW5hbWUsIHsgZW5jb2Rpbmc6IFwidXRmOFwiIH0pO1xuICAgIGlmIChjb250ZW50ID09IG9sZENvbnRlbnQpXG4gICAgICByZXR1cm4gZmFsc2U7XG4gIH1cblxuICBhd2FpdCBmcy5wcm9taXNlcy5ta2RpcihwYXRoLmRpcm5hbWUoZmlsZW5hbWUpLCB7IHJlY3Vyc2l2ZTogdHJ1ZSB9KTtcbiAgYXdhaXQgZnMucHJvbWlzZXMud3JpdGVGaWxlKGZpbGVuYW1lLCBjb250ZW50LCB7IGVuY29kaW5nOiBcInV0ZjhcIiB9KTtcblxuICByZXR1cm4gdHJ1ZTtcbn1cblxuZXhwb3J0IGZ1bmN0aW9uIGdldFBhdGhTdHJpbmcoc3RyOiBzdHJpbmcpIHtcbiAgaWYgKHN0ci5zdGFydHNXaXRoKElNUE9SVF9TQ0hFTUUpKVxuICAgIHN0ciA9IHJlcXVpcmVSZXNvbHZlKHN0ci5zbGljZShJTVBPUlRfU0NIRU1FLmxlbmd0aCkpO1xuICBpZiAoc3RyLnN0YXJ0c1dpdGgoRklMRV9TQ0hFTUUpKVxuICAgIHJldHVybiB1cmwuZmlsZVVSTFRvUGF0aChzdHIpO1xuICByZXR1cm4gc3RyO1xufVxuXG5leHBvcnQgZnVuY3Rpb24gaXNVUkwoc3RyOiBzdHJpbmcpIHtcbiAgdHJ5IHtcbiAgICBuZXcgVVJMKHN0cik7XG4gICAgcmV0dXJuIHRydWU7XG4gIH0gY2F0Y2gge1xuICAgIHJldHVybiBmYWxzZTtcbiAgfVxufVxuXG5leHBvcnQgZnVuY3Rpb24gZ2V0VVJMU3RyaW5nKHN0cjogc3RyaW5nKSB7XG4gIGlmIChzdHIuc3RhcnRzV2l0aChJTVBPUlRfU0NIRU1FKSlcbiAgICByZXR1cm4gcmVxdWlyZVJlc29sdmUoc3RyLnNsaWNlKElNUE9SVF9TQ0hFTUUubGVuZ3RoKSk7XG4gIGlmIChpc1VSTChzdHIpKVxuICAgIHJldHVybiB1cmwuZmlsZVVSTFRvUGF0aChzdHIpO1xuICByZXR1cm4gc3RyO1xufVxuXG5leHBvcnQgZnVuY3Rpb24gcmVzb2x2ZVVSTFN0cmluZyhzdHI6IHN0cmluZykge1xuICBpZiAoc3RyLnN0YXJ0c1dpdGgoSU1QT1JUX1NDSEVNRSkpXG4gICAgcmV0dXJuIHJlcXVpcmVSZXNvbHZlKHN0ci5zbGljZShJTVBPUlRfU0NIRU1FLmxlbmd0aCkpO1xuICByZXR1cm4gaXNVUkwoc3RyKSA/IHN0ciA6IHVybC5wYXRoVG9GaWxlVVJMKHN0cik7XG59XG5cbmV4cG9ydCBhc3luYyBmdW5jdGlvbiBmZXRjaEJ1ZmZlcihzdHI6IHN0cmluZyk6IFByb21pc2U8QnVmZmVyPiB7XG4gIGlmIChzdHIuc3RhcnRzV2l0aChIVFRQX1NDSEVNRSkgfHwgc3RyLnN0YXJ0c1dpdGgoSFRUUFNfU0NIRU1FKSkge1xuICAgIGNvbnN0IHJlc3BvbnNlID0gYXdhaXQgZmV0Y2goc3RyKTtcbiAgICByZXR1cm4gQnVmZmVyLmZyb20oYXdhaXQgcmVzcG9uc2UuYXJyYXlCdWZmZXIoKSk7XG4gIH1cbiAgcmV0dXJuIGF3YWl0IGZzLnByb21pc2VzLnJlYWRGaWxlKGdldFVSTFN0cmluZyhzdHIpKTtcbn1cblxuZXhwb3J0IGFzeW5jIGZ1bmN0aW9uIHNhdmVBc0pTT04oZmlsZW5hbWU6IHN0cmluZywgdmFsdWU6IGFueSwgb3B0aW9ucz86IHsgcHJldHR5OiBib29sZWFuIH0pIHtcbiAgY29uc3QgY29udGVudCA9IEpTT04uc3RyaW5naWZ5KHZhbHVlLCBudWxsLCBvcHRpb25zICYmIG9wdGlvbnMucHJldHR5ID8gMiA6IDApO1xuICBhd2FpdCBmcy5wcm9taXNlcy5ta2RpcihwYXRoLmRpcm5hbWUoZmlsZW5hbWUpLCB7IHJlY3Vyc2l2ZTogdHJ1ZSB9KTtcbiAgYXdhaXQgZnMucHJvbWlzZXMud3JpdGVGaWxlKGZpbGVuYW1lLCBjb250ZW50LCB7IGVuY29kaW5nOiBcInV0ZjhcIiB9KTtcbn1cbiIsIi8qXG4gKiBNSVQgTGljZW5zZVxuICpcbiAqIENvcHlyaWdodCAoYykgMjAyNSAgWXVyaWkgWWFrdWJpbiAoeXVyaWkueWFrdWJpbkBnbWFpbC5jb20pXG4gKlxuICogUGVybWlzc2lvbiBpcyBncmFudGVkIHRvIHVzZSwgY29weSwgbW9kaWZ5LCBhbmQgZGlzdHJpYnV0ZSB0aGlzIHNvZnR3YXJlXG4gKiB1bmRlciB0aGUgTUlUIExpY2Vuc2UuIFNlZSBMSUNFTlNFIGZpbGUgZm9yIGRldGFpbHMuXG4gKi9cblxuaW1wb3J0IG9zIGZyb20gXCJub2RlOm9zXCI7XG5cbmNvbnN0IHNpemVvZlZvaWRwQml0czogYW55ID1cbntcbiAgYXJtOiAgICAgNCxcbiAgYXJtNjQ6ICAgOCxcbiAgaWEzMjogICAgNCxcbiAgbG9vbmc2NDogOCxcbiAgbWlwczogICAgNCxcbiAgbWlwc2VsOiAgNCxcbiAgcHBjOiAgICAgNCxcbiAgcHBjNjQ6ICAgOCxcbiAgcmlzY3Y2NDogOCxcbiAgczM5MDogICAgNCxcbiAgczM5MHg6ICAgOCxcbiAgeDY0OiAgICAgNCxcbn07XG5cbmNvbnN0IF9zaXplb2ZWb2lkcCA9IHNpemVvZlZvaWRwQml0c1tvcy5hcmNoKCldO1xuaWYgKCFfc2l6ZW9mVm9pZHApXG4gIHRocm93IG5ldyBFcnJvcihgVW5rbm93biAke29zLmFyY2goKX0gYXJjaGApO1xuXG5sZXQgX2V4ZWN1dGFibGVTdWZmaXg6IHN0cmluZztcblxuaWYgKG9zLnBsYXRmb3JtKCkgPT09IFwid2luMzJcIikge1xuICBfZXhlY3V0YWJsZVN1ZmZpeCA9IFwiLmV4ZVwiO1xufVxuZWxzZSB7XG4gIF9leGVjdXRhYmxlU3VmZml4ID0gXCJcIjtcbn1cblxuZXhwb3J0IGNsYXNzIEhvc3Qge1xuICBzdGF0aWMgZ2V0IHNpemVvZlZvaWRwKCk6IDQgfCA4IHtcbiAgICByZXR1cm4gX3NpemVvZlZvaWRwO1xuICB9XG4gIHN0YXRpYyBnZXQgZXhlY3V0YWJsZVN1ZmZpeCgpOiBzdHJpbmcge1xuICAgIHJldHVybiBfZXhlY3V0YWJsZVN1ZmZpeDtcbiAgfVxufTtcbiIsIi8qXG4gKiBNSVQgTGljZW5zZVxuICpcbiAqIENvcHlyaWdodCAoYykgMjAyNSAgWXVyaWkgWWFrdWJpbiAoeXVyaWkueWFrdWJpbkBnbWFpbC5jb20pXG4gKlxuICogUGVybWlzc2lvbiBpcyBncmFudGVkIHRvIHVzZSwgY29weSwgbW9kaWZ5LCBhbmQgZGlzdHJpYnV0ZSB0aGlzIHNvZnR3YXJlXG4gKiB1bmRlciB0aGUgTUlUIExpY2Vuc2UuIFNlZSBMSUNFTlNFIGZpbGUgZm9yIGRldGFpbHMuXG4gKi9cblxuaW1wb3J0IHBhdGggZnJvbSBcIm5vZGU6cGF0aFwiO1xuaW1wb3J0IGZzIGZyb20gXCJub2RlOmZzXCI7XG5pbXBvcnQgaHR0cCBmcm9tIFwiaHR0cFwiO1xuaW1wb3J0IGh0dHBzIGZyb20gXCJodHRwc1wiO1xuXG5pbXBvcnQgeyBMb2dnZXIgfSBmcm9tIFwiQC9sb2dnZXJcIjtcblxuY29uc3QgbG9nZ2VyID0gTG9nZ2VyLmNyZWF0ZShpbXBvcnQubWV0YS51cmwpO1xuXG5pbnRlcmZhY2UgSVJlc29sdmVCdWlsZGVyIHtcbiAgYXBwZW5kKGRhdGE6IEJ1ZmZlcik6IHZvaWQ7XG4gIHRvUmVzdWx0KCk6IEJ1ZmZlciB8IHVuZGVmaW5lZDtcbn07XG5cbmNsYXNzIEJ1ZmZlckJ1aWxkZXIgaW1wbGVtZW50cyBJUmVzb2x2ZUJ1aWxkZXIge1xuICBwcml2YXRlIF9jaHVua3M6IEFycmF5PEJ1ZmZlcj4gPSBbXTtcblxuICBwdWJsaWMgYXBwZW5kKGNodW5rOiBCdWZmZXIpOiB2b2lkIHtcbiAgICB0aGlzLl9jaHVua3MucHVzaChjaHVuayk7XG4gIH1cblxuICBwdWJsaWMgdG9SZXN1bHQoKTogQnVmZmVyIHtcbiAgICByZXR1cm4gQnVmZmVyLmNvbmNhdCh0aGlzLl9jaHVua3MpO1xuICB9XG59O1xuXG5jbGFzcyBGaWxlU3luY1dyaXRlciBpbXBsZW1lbnRzIElSZXNvbHZlQnVpbGRlciB7XG4gIHByaXZhdGUgX2ZkOiBudW1iZXI7XG5cbiAgcHVibGljIGNvbnN0cnVjdG9yKGZpbGU6IHN0cmluZykge1xuICAgIHRoaXMuX2ZkID0gZnMub3BlblN5bmMoZmlsZSwgXCJ3XCIpO1xuICB9XG5cbiAgcHVibGljIGFwcGVuZChjaHVuazogQnVmZmVyKTogdm9pZCB7XG4gICAgZnMud3JpdGVTeW5jKHRoaXMuX2ZkLCBjaHVuayk7XG4gIH1cblxuICBwdWJsaWMgdG9SZXN1bHQoKTogdW5kZWZpbmVkIHtcbiAgICBmcy5jbG9zZVN5bmModGhpcy5fZmQpO1xuICB9XG59O1xuXG5mdW5jdGlvbiBjcmVhdGVCdWlsZGVyKGZpbGU/OiBzdHJpbmcpOiBJUmVzb2x2ZUJ1aWxkZXIge1xuICBpZiAoZmlsZSlcbiAgICByZXR1cm4gbmV3IEZpbGVTeW5jV3JpdGVyKGZpbGUpO1xuICByZXR1cm4gbmV3IEJ1ZmZlckJ1aWxkZXI7XG59XG5cbmZ1bmN0aW9uIGh0dHBSZXF1ZXN0KHVybDogc3RyaW5nLCBvcHRpb25zOiBodHRwLlJlcXVlc3RPcHRpb25zIHwgaHR0cHMuUmVxdWVzdE9wdGlvbnMsIGNhbGxiYWNrOiBhbnkpOiBodHRwLkNsaWVudFJlcXVlc3Qge1xuICBpZiAodXJsLnN0YXJ0c1dpdGgoXCJodHRwczovL1wiKSlcbiAgICByZXR1cm4gaHR0cHMucmVxdWVzdCh1cmwsIG9wdGlvbnMsIGNhbGxiYWNrKTtcbiAgcmV0dXJuIGh0dHAucmVxdWVzdCh1cmwsIG9wdGlvbnMsIGNhbGxiYWNrKTtcbn07XG5cbmludGVyZmFjZSBGZXRjaE9wdGlvbnMge1xuICBhdHRlbXB0cz86IG51bWJlcjtcbn07XG5cbmZ1bmN0aW9uIGZldGNoSW1wbCh1cmw6IHN0cmluZywgZmlsZTogc3RyaW5nIHwgdW5kZWZpbmVkLCBvcHRpb25zOiBGZXRjaE9wdGlvbnMpOiBQcm9taXNlPEJ1ZmZlcnx1bmRlZmluZWQ+IHtcbiAgcmV0dXJuIG5ldyBQcm9taXNlKChyZXNvbHZlLCByZWplY3QpID0+IHtcbiAgICBjb25zdCBodHRwT3B0aW9ucyA9IHtcbiAgICAgIG1ldGhvZDogJ0dFVCcsXG4gICAgICB0aW1lb3V0OiA1MDAwLFxuICAgICAgaGVhZGVyczoge1xuICAgICAgICBcIlVzZXItQWdlbnRcIjogUFJPSkVDVF9OQU1FICsgXCIvXCIgKyBQUk9KRUNUX1ZFUlNJT04sXG4gICAgICAgIFwiQWNjZXB0XCI6IFwiKi8qXCIsXG4gICAgICB9LFxuICAgIH07XG5cbiAgICBsZXQgYXR0ZW1wdHMgPSBvcHRpb25zLmF0dGVtcHRzIHx8IDA7XG4gICAgY29uc3QgZG9SZXF1ZXN0ID0gKHVybDogc3RyaW5nKSA9PiB7XG4gICAgICBjb25zdCByZXF1ZXN0ID0gaHR0cFJlcXVlc3QodXJsLCBodHRwT3B0aW9ucywgb25SZXF1ZXN0KTtcblxuICAgICAgbGV0IGhhc0Vycm9yID0gZmFsc2U7XG4gICAgICBjb25zdCBvbkVycm9yID0gKGVycjogRXJyb3IpID0+IHtcbiAgICAgICAgcmVxdWVzdC5kZXN0cm95KCk7XG4gICAgICAgIGlmICghaGFzRXJyb3IpIHtcbiAgICAgICAgICBoYXNFcnJvciA9IHRydWU7XG4gICAgICAgICAgaWYgKGF0dGVtcHRzID4gMCkge1xuICAgICAgICAgICAgbG9nZ2VyLndhcm4oZXJyLm1lc3NhZ2UpO1xuICAgICAgICAgICAgbG9nZ2VyLmluZm8oYHJlLXdnZXQgJHt1cmx9IGF0dGVtcHRzICR7YXR0ZW1wdHN9YCk7XG4gICAgICAgICAgICBhdHRlbXB0cy0tO1xuICAgICAgICAgICAgZG9SZXF1ZXN0KHVybCk7XG4gICAgICAgICAgfVxuICAgICAgICAgIGVsc2Uge1xuICAgICAgICAgICAgcmVqZWN0KGVycik7XG4gICAgICAgICAgfVxuICAgICAgICB9XG4gICAgICB9O1xuXG4gICAgICByZXF1ZXN0Lm9uKFwidGltZW91dFwiLCAoKSA9PiB7XG4gICAgICAgIG9uRXJyb3IobmV3IEVycm9yKFwiVGltZW91dCBmb3IgXCIgKyB1cmwpKTtcbiAgICAgIH0pO1xuXG4gICAgICByZXF1ZXN0Lm9uKFwiZXJyb3JcIiwgKGVycjogRXJyb3IpID0+IHtcbiAgICAgICAgb25FcnJvcihlcnIpO1xuICAgICAgfSk7XG5cbiAgICAgIHJlcXVlc3QuZW5kKCk7XG4gICAgfTtcblxuICAgIGNvbnN0IGZpbGVuYW1lID0gcGF0aC5iYXNlbmFtZSh1cmwpO1xuICAgIGNvbnN0IG9uUmVxdWVzdCA9IChyZXNwb25zZTogaHR0cC5JbmNvbWluZ01lc3NhZ2UpID0+IHtcbiAgICAgIHN3aXRjaCAocmVzcG9uc2Uuc3RhdHVzQ29kZSkge1xuICAgICAgY2FzZSAyMDA6XG4gICAgICAgIGxvZ2dlci5kZWJ1ZyhgQ29ubmN0ZWQgdG8gJHsocmVzcG9uc2UgYXMgYW55KS5yZXEuaG9zdH1gKTtcbiAgICAgICAgbG9nZ2VyLmRlYnVnKGBEb3dubG9hZGluZyAke2ZpbGVuYW1lfWApO1xuICAgICAgICBjb25zdCBidWlsZGVyID0gY3JlYXRlQnVpbGRlcihmaWxlKTtcbiAgICAgICAgcmVzcG9uc2Uub24oXCJkYXRhXCIsIChjaHVuazogQnVmZmVyKSA9PiBidWlsZGVyLmFwcGVuZChjaHVuaykpO1xuICAgICAgICByZXNwb25zZS5vbihcImVuZFwiLCAoKSA9PiByZXNvbHZlKGJ1aWxkZXIudG9SZXN1bHQoKSkpO1xuICAgICAgICByZXNwb25zZS5vbignY2xvc2UnLCAoKSA9PiBsb2dnZXIuZGVidWcoXCJDbG9zZVwiKSk7XG4gICAgICAgIGJyZWFrO1xuXG4gICAgICBjYXNlIDMwMTpcbiAgICAgIGNhc2UgMzAyOlxuICAgICAgICByZXNwb25zZS5yZXN1bWUoKTtcbiAgICAgICAgaWYgKHJlc3BvbnNlLmhlYWRlcnMubG9jYXRpb24pIHtcbiAgICAgICAgICBsb2dnZXIuaW5mbyhcIlJlZGlyZWN0IHRvIFwiICsgcmVzcG9uc2UuaGVhZGVycy5sb2NhdGlvbik7XG4gICAgICAgICAgZG9SZXF1ZXN0KHJlc3BvbnNlLmhlYWRlcnMubG9jYXRpb24pO1xuICAgICAgICB9XG4gICAgICAgIGJyZWFrO1xuXG4gICAgICBkZWZhdWx0OlxuICAgICAgICByZXNwb25zZS5yZXN1bWUoKTtcbiAgICAgICAgY29uc3QgbWVzc2FnZSA9IFwiRGlkIG5vdCBnZXQgYW4gT0sgZnJvbSB0aGUgc2VydmVyLiBDb2RlOiBcIiArIHJlc3BvbnNlLnN0YXR1c0NvZGU7XG4gICAgICAgIGxvZ2dlci5lcnJvcihtZXNzYWdlKTtcbiAgICAgICAgcmVqZWN0KG1lc3NhZ2UpO1xuICAgICAgICBicmVhaztcbiAgICAgIH1cbiAgICB9O1xuXG4gICAgbG9nZ2VyLmluZm8oXCJ3Z2V0IFwiICsgdXJsKTtcbiAgICBkb1JlcXVlc3QodXJsKTtcbiAgfSk7XG59O1xuXG5leHBvcnQgZnVuY3Rpb24gcmVxdWVzdEdldCh1cmw6IHN0cmluZywgb3B0aW9ucz86IEZldGNoT3B0aW9ucykge1xuICByZXR1cm4gZmV0Y2hJbXBsKHVybCwgdW5kZWZpbmVkLCBvcHRpb25zIHx8IHt9KSBhcyBQcm9taXNlPEJ1ZmZlcj47XG59XG5cbmV4cG9ydCBmdW5jdGlvbiBkb3dubG9hZEZpbGUodXJsOiBzdHJpbmcsIGZpbGU6IHN0cmluZywgb3B0aW9ucz86IEZldGNoT3B0aW9ucykge1xuICByZXR1cm4gZmV0Y2hJbXBsKHVybCwgZmlsZSwgb3B0aW9ucyB8fCB7fSkgYXMgUHJvbWlzZTx1bmRlZmluZWQ+O1xufVxuIiwiLypcbiAqIE1JVCBMaWNlbnNlXG4gKlxuICogQ29weXJpZ2h0IChjKSAyMDI1ICBZdXJpaSBZYWt1YmluICh5dXJpaS55YWt1YmluQGdtYWlsLmNvbSlcbiAqXG4gKiBQZXJtaXNzaW9uIGlzIGdyYW50ZWQgdG8gdXNlLCBjb3B5LCBtb2RpZnksIGFuZCBkaXN0cmlidXRlIHRoaXMgc29mdHdhcmVcbiAqIHVuZGVyIHRoZSBNSVQgTGljZW5zZS4gU2VlIExJQ0VOU0UgZmlsZSBmb3IgZGV0YWlscy5cbiAqL1xuXG5pbXBvcnQgdXJsIGZyb20gXCJub2RlOnVybFwiO1xuXG5leHBvcnQgY29uc3QgaW1wb3J0TW9kdWxlID0gYXN5bmMgKG5hbWUpID0+IGltcG9ydCgvKiB3ZWJwYWNrSWdub3JlOiB0cnVlICovIG5hbWUpO1xuXG5leHBvcnQgZnVuY3Rpb24gaXNFbnRyeVBvaW50KCkge1xuICAvLyBpZiAoT2JqZWN0KGltcG9ydC5tZXRhKS51cmwpXG4gIC8vICAgcmV0dXJuIHVybC5maWxlVVJMVG9QYXRoKE9iamVjdChpbXBvcnQubWV0YSkudXJsKSA9PT0gcHJvY2Vzcy5hcmd2WzFdO1xuICBpZiAodHlwZW9mIHJlcXVpcmUgIT09ICd1bmRlZmluZWQnKVxuICAgIHJldHVybiByZXF1aXJlLm1haW4gPT09IG1vZHVsZTtcbiAgdGhyb3cgbmV3IEVycm9yKFwiTm8gY29tcGF0aWJsZSBtb2R1bGUgcmVzb2x2ZXIgZm91bmRcIik7XG59XG5cbmV4cG9ydCBmdW5jdGlvbiBjdXJyZW50U2NyaXB0VVJMKCkge1xuICAvLyBpZiAoT2JqZWN0KGltcG9ydC5tZXRhKS51cmwpXG4gIC8vICAgcmV0dXJuIHVybC5maWxlVVJMVG9QYXRoKE9iamVjdChpbXBvcnQubWV0YSkudXJsKTtcbiAgaWYgKHR5cGVvZiByZXF1aXJlICE9PSAndW5kZWZpbmVkJylcbiAgICByZXR1cm4gdXJsLnBhdGhUb0ZpbGVVUkwoLyogd2VicGFja0lnbm9yZTogdHJ1ZSAqLyBfX2ZpbGVuYW1lKTtcbiAgdGhyb3cgbmV3IEVycm9yKFwiVW5rbm93biBjdXJyZW50IGZpbGVuYW1lXCIpO1xufVxuIiwiLypcbiAqIE1JVCBMaWNlbnNlXG4gKlxuICogQ29weXJpZ2h0IChjKSAyMDI1ICBZdXJpaSBZYWt1YmluICh5dXJpaS55YWt1YmluQGdtYWlsLmNvbSlcbiAqXG4gKiBQZXJtaXNzaW9uIGlzIGdyYW50ZWQgdG8gdXNlLCBjb3B5LCBtb2RpZnksIGFuZCBkaXN0cmlidXRlIHRoaXMgc29mdHdhcmVcbiAqIHVuZGVyIHRoZSBNSVQgTGljZW5zZS4gU2VlIExJQ0VOU0UgZmlsZSBmb3IgZGV0YWlscy5cbiAqL1xuXG5pbXBvcnQgZnMgZnJvbSBcIm5vZGU6ZnNcIjtcbmltcG9ydCB7IExvY2F0b3IgfSBmcm9tIFwiQC91dGlscy9Mb2NhdG9yXCI7XG5pbXBvcnQgeyBpbXBvcnRNb2R1bGUgfSBmcm9tIFwiQC91dGlscy9Nb2R1bGVcIjtcblxuZXhwb3J0IGFzeW5jIGZ1bmN0aW9uIGxvYWRKU1ZhbHVlKGZpbGVuYW1lOiBMb2NhdG9yKSB7XG4gIGlmIChmaWxlbmFtZS5lbmRzV2l0aChcIi5qc29uXCIpKSB7XG4gICAgY29uc3QgY29udGVudCA9IGF3YWl0IGZzLnByb21pc2VzLnJlYWRGaWxlKGZpbGVuYW1lLnRvUGF0aCgpLCBcInV0ZjhcIik7XG4gICAgcmV0dXJuIEpTT04ucGFyc2UoY29udGVudCk7XG4gIH1cblxuICBjb25zdCBtb2R1bGUgPSBhd2FpdCBpbXBvcnRNb2R1bGUoZmlsZW5hbWUudG9VUkxTdHJpbmcoKSk7XG4gIGlmICghbW9kdWxlLmRlZmF1bHQpXG4gICAgdGhyb3cgbmV3IEVycm9yKGBTY3JpcHQgXCIke2ZpbGVuYW1lfVwiIGhhcyBub3QgY29udGFpbiBhIGRlZmF1bHQgZnVuY3Rpb25gKTtcblxuICByZXR1cm4gbW9kdWxlLmRlZmF1bHQ7XG59XG4iLCIvKlxuICogTUlUIExpY2Vuc2VcbiAqXG4gKiBDb3B5cmlnaHQgKGMpIDIwMjUgIFl1cmlpIFlha3ViaW4gKHl1cmlpLnlha3ViaW5AZ21haWwuY29tKVxuICpcbiAqIFBlcm1pc3Npb24gaXMgZ3JhbnRlZCB0byB1c2UsIGNvcHksIG1vZGlmeSwgYW5kIGRpc3RyaWJ1dGUgdGhpcyBzb2Z0d2FyZVxuICogdW5kZXIgdGhlIE1JVCBMaWNlbnNlLiBTZWUgTElDRU5TRSBmaWxlIGZvciBkZXRhaWxzLlxuICovXG5cbmltcG9ydCBwYXRoIGZyb20gXCJub2RlOnBhdGhcIjtcbmltcG9ydCB1cmwgZnJvbSBcIm5vZGU6dXJsXCI7XG5cbmltcG9ydCB7IEZJTEVfU0NIRU1FLCBJTVBPUlRfU0NIRU1FIH0gZnJvbSBcIkAvdXRpbHMvVXJsU2NoZW1lXCI7XG5pbXBvcnQgeyBTaW1wbGVPYmplY3QgfSBmcm9tIFwiQC9jb3JlL1NpbXBsZU9iamVjdFwiO1xuaW1wb3J0IHsgcmVxdWlyZVJlc29sdmUgfSBmcm9tIFwiQC91dGlscy9Nb2R1bGVcIjtcblxuY29uc3QgUEFUSCA9IFN5bWJvbChcIlBBVEhcIik7XG5cbmZ1bmN0aW9uIGlzQWJzb2x1dGUoZmlsZXBhdGg6IHN0cmluZyk6IGJvb2xlYW4ge1xuICBpZiAoZmlsZXBhdGguc3RhcnRzV2l0aChGSUxFX1NDSEVNRSkpXG4gICAgcmV0dXJuIHRydWU7XG4gIGlmIChmaWxlcGF0aC5zdGFydHNXaXRoKElNUE9SVF9TQ0hFTUUpKVxuICAgIHJldHVybiB0cnVlO1xuICBpZiAoZmlsZXBhdGguc3RhcnRzV2l0aChcIi9cIikpXG4gICAgcmV0dXJuIHRydWU7XG4gIGlmIChmaWxlcGF0aC5tYXRjaCgvXlthLXpBLVpdOltcXFxcL10vKSlcbiAgICByZXR1cm4gdHJ1ZTtcbiAgLyogXFxcXGxvY2FsaG9zdCAqL1xuICAvKiBcXFxcd3NsLmxvY2FsaG9zdFxcVWJ1bnR1XFxvcHQgKi9cbiAgcmV0dXJuIGZhbHNlO1xufVxuXG5mdW5jdGlvbiB0b1VSTFN0cmluZyhzdHI6IHN0cmluZykge1xuICBpZiAoc3RyLnN0YXJ0c1dpdGgoRklMRV9TQ0hFTUUpIHx8IHN0ci5zdGFydHNXaXRoKElNUE9SVF9TQ0hFTUUpKVxuICAgcmV0dXJuIHN0cjtcblxuICBpZiAoaXNBYnNvbHV0ZShzdHIpKVxuICAgIHJldHVybiB1cmwucGF0aFRvRmlsZVVSTChzdHIpLnRvU3RyaW5nKCk7XG4gIFxuICB0aHJvdyBuZXcgRXJyb3IoYE5vdCBzdXBwb3J0ZWQgcmVsYXRpdmUgcGF0aCBvZiBcIiR7c3RyfVwiYCk7XG59XG5cbmV4cG9ydCBjbGFzcyBMb2NhdG9yIHtcbiAgcHJpdmF0ZSBbUEFUSF06IHN0cmluZztcblxuICBwcm90ZWN0ZWQgY29uc3RydWN0b3IodXJsU3RyaW5nOiBzdHJpbmcpIHtcbiAgICB0aGlzW1BBVEhdID0gdXJsU3RyaW5nO1xuICB9XG5cbiAgcHVibGljIGpvaW4oLi4ucGF0aHM6IEFycmF5PExvY2F0b3IgfCBzdHJpbmc+KTogTG9jYXRvciB7XG4gICAgY29uc3QgdXJsID0gbmV3IFVSTCh0aGlzW1BBVEhdKTtcbiAgICB1cmwucGF0aG5hbWUgPSBwYXRoLnBvc2l4LmpvaW4odXJsLnBhdGhuYW1lLCAuLi5wYXRocy5tYXAoaSA9PiB7XG4gICAgICBpZiAoaSBpbnN0YW5jZW9mIExvY2F0b3IpXG4gICAgICAgIHJldHVybiBuZXcgVVJMKGlbUEFUSF0pLnBhdGhuYW1lO1xuICAgICAgaWYgKHR5cGVvZiBpID09PSBcInN0cmluZ1wiKVxuICAgICAgICByZXR1cm4gaS5yZXBsYWNlQWxsKHBhdGgud2luMzIuc2VwLCBwYXRoLnBvc2l4LnNlcCk7XG4gICAgICB0aHJvdyBuZXcgRXJyb3IoYEF0dGVtcHRlZCB0byBqb2luIHRvIHdyb25nIHR5cGUgJHtpfSB0eXBlYCk7XG4gICAgfSkpO1xuICAgIHJldHVybiBuZXcgTG9jYXRvcih1cmwudG9TdHJpbmcoKSk7XG4gIH1cblxuICBwdWJsaWMgZGlybmFtZSgpIHtcbiAgICBjb25zdCBkaXJuYW1lID0gcGF0aC5wb3NpeC5kaXJuYW1lKHRoaXNbUEFUSF0pO1xuICAgIHJldHVybiBuZXcgTG9jYXRvcihkaXJuYW1lKTtcbiAgfVxuXG4gIHB1YmxpYyBiYXNlbmFtZSgpOiBzdHJpbmcge1xuICAgIHJldHVybiBwYXRoLnBvc2l4LmJhc2VuYW1lKHRoaXNbUEFUSF0pO1xuICB9XG5cbiAgcHVibGljIGV4dG5hbWUoKTogc3RyaW5nIHtcbiAgICByZXR1cm4gcGF0aC5wb3NpeC5leHRuYW1lKHRoaXNbUEFUSF0pO1xuICB9XG5cbiAgcHVibGljIHJlbGF0aXZlKHRvOiBMb2NhdG9yIHwgc3RyaW5nKSB7XG4gICAgaWYgKHRvIGluc3RhbmNlb2YgTG9jYXRvcilcbiAgICAgIHRvID0gdG9bUEFUSF07XG5cbiAgICBjb25zdCBsZWZ0VXJsID0gbmV3IFVSTCh0aGlzW1BBVEhdKTtcbiAgICBjb25zdCByaWdodFVybCA9IG5ldyBVUkwodG9VUkxTdHJpbmcodG8pKTtcblxuICAgIGlmIChsZWZ0VXJsLnByb3RvY29sICE9PSByaWdodFVybC5wcm90b2NvbClcbiAgICAgICAgdGhyb3cgbmV3IEVycm9yKGBQcm90b2NvbCAke2xlZnRVcmwucHJvdG9jb2x9IGRpZCBub3QgbWF0Y2ggZm9yICR7dG99YCk7XG5cbiAgICBpZiAobGVmdFVybC5ob3N0ICE9PSByaWdodFVybC5ob3N0KVxuICAgICAgICB0aHJvdyBuZXcgRXJyb3IoYEhvc3QgJHtsZWZ0VXJsLmhvc3R9IGRpZCBub3QgbWF0Y2ggZm9yICR7dG99YCk7XG5cbiAgICByZXR1cm4gcGF0aC5wb3NpeC5yZWxhdGl2ZShsZWZ0VXJsLnBhdGhuYW1lLCByaWdodFVybC5wYXRobmFtZSk7XG4gIH1cblxuICBwdWJsaWMgcmVzb2x2ZSguLi5wYXRoczogQXJyYXk8TG9jYXRvciB8IHN0cmluZz4pOiBMb2NhdG9yIHtcbiAgICBpZiAocGF0aHMubGVuZ3RoID09PSAwKVxuICAgICAgcmV0dXJuIHRoaXM7XG5cbiAgICBsZXQgcm9vdFBhdGg6IHN0cmluZyA9IHRoaXNbUEFUSF07XG4gICAgY29uc3QgcGF0aFN0cmluZ3M6IHN0cmluZ1tdID0gW107XG5cbiAgICBmb3IgKGxldCBpID0gcGF0aHMubGVuZ3RoIC0gMTsgaSA+PSAwOyBpLS0pIHtcbiAgICAgIGNvbnN0IGl0ZXIgPSBwYXRoc1tpXTtcbiAgICAgIGlmIChpdGVyIGluc3RhbmNlb2YgTG9jYXRvcikge1xuICAgICAgICByb290UGF0aCA9IGl0ZXJbUEFUSF07XG4gICAgICAgIGJyZWFrO1xuICAgICAgfVxuICAgICAgaWYgKExvY2F0b3IuaXNBYnNvbHV0ZShpdGVyKSkge1xuICAgICAgICByb290UGF0aCA9IHRvVVJMU3RyaW5nKGl0ZXIpO1xuICAgICAgICBicmVhaztcbiAgICAgIH1cbiAgICAgIHBhdGhTdHJpbmdzLnB1c2goaXRlci5yZXBsYWNlQWxsKFwiXFxcXFwiLCBcIi9cIikpO1xuICAgIH1cblxuICAgIGNvbnN0IHVybCA9IG5ldyBVUkwocm9vdFBhdGgpO1xuICAgIHVybC5wYXRobmFtZSA9IHBhdGgucG9zaXgucmVzb2x2ZSh1cmwucGF0aG5hbWUsIC4uLnBhdGhTdHJpbmdzKTtcblxuICAgIHJldHVybiBuZXcgTG9jYXRvcih1cmwudG9TdHJpbmcoKSk7XG4gIH1cblxuICBwdWJsaWMgbWF0Y2gocmVnZXhwOiBSZWdFeHApIHtcbiAgICByZXR1cm4gdGhpc1tQQVRIXS5tYXRjaChyZWdleHApO1xuICB9XG5cbiAgcHVibGljIHN0YXJ0c1dpdGgoc2VhcmNoU3RyaW5nOiBzdHJpbmcsIHBvc2l0aW9uPzogbnVtYmVyKTogYm9vbGVhbiB7XG4gICAgcmV0dXJuIHRoaXNbUEFUSF0uc3RhcnRzV2l0aChzZWFyY2hTdHJpbmcsIHBvc2l0aW9uKTtcbiAgfVxuXG4gIHB1YmxpYyBlbmRzV2l0aChzZWFyY2hTdHJpbmc6IHN0cmluZywgZW5kUG9zaXRpb24/OiBudW1iZXIpOiBib29sZWFuIHtcbiAgICByZXR1cm4gdGhpc1tQQVRIXS5lbmRzV2l0aChzZWFyY2hTdHJpbmcsIGVuZFBvc2l0aW9uKTtcbiAgfVxuXG4gIHB1YmxpYyB0b1N0cmluZygpOiBzdHJpbmcge1xuICAgIHJldHVybiB1cmwuZmlsZVVSTFRvUGF0aCh0aGlzW1BBVEhdKTtcbiAgfVxuXG4gIHB1YmxpYyB0b1BhdGgoKSB7XG4gICAgaWYgKHRoaXNbUEFUSF0uc3RhcnRzV2l0aChGSUxFX1NDSEVNRSkpXG4gICAgICByZXR1cm4gdXJsLmZpbGVVUkxUb1BhdGgodGhpc1tQQVRIXSk7XG4gICAgaWYgKHRoaXNbUEFUSF0uc3RhcnRzV2l0aChJTVBPUlRfU0NIRU1FKSlcbiAgICAgIHJldHVybiByZXF1aXJlUmVzb2x2ZSh0aGlzW1BBVEhdLnNsaWNlKElNUE9SVF9TQ0hFTUUubGVuZ3RoKSk7XG4gICAgdGhyb3cgbmV3IEVycm9yKGBVUkwgJHt0aGlzW1BBVEhdfSBjYW4ndCBjb252ZXJ0IHRvIHBhdGhgKTtcbiAgfVxuXG4gIHB1YmxpYyB2YWx1ZU9mKCkge1xuICAgIHJldHVybiB1cmwuZmlsZVVSTFRvUGF0aCh0aGlzW1BBVEhdKTtcbiAgfVxuXG4gIHB1YmxpYyB0b1VSTFN0cmluZygpOiBzdHJpbmcge1xuICAgIGlmICh0aGlzW1BBVEhdLnN0YXJ0c1dpdGgoSU1QT1JUX1NDSEVNRSkpXG4gICAgICByZXR1cm4gdXJsLnBhdGhUb0ZpbGVVUkwocmVxdWlyZVJlc29sdmUodGhpc1tQQVRIXS5zbGljZShJTVBPUlRfU0NIRU1FLmxlbmd0aCkpKS50b1N0cmluZygpO1xuICAgIHJldHVybiB0aGlzW1BBVEhdO1xuICB9XG5cbiAgcHVibGljIHRvSlNPTigpOiBhbnkge1xuICAgIHJldHVybiB0aGlzW1BBVEhdO1xuICB9XG5cbiAgcHVibGljIHN0YXRpYyBpc0Fic29sdXRlKGZpbGVwYXRoOiBMb2NhdG9yIHwgc3RyaW5nKSB7XG4gICAgaWYgKGZpbGVwYXRoIGluc3RhbmNlb2YgTG9jYXRvcilcbiAgICAgIHJldHVybiB0cnVlO1xuICAgIHJldHVybiBpc0Fic29sdXRlKGZpbGVwYXRoKTtcbiAgfVxuXG4gIHB1YmxpYyBzdGF0aWMgZW5zdXJlSW5zdGFuY2UodmFsdWU6IGFueSk6IExvY2F0b3Ige1xuICAgIGlmICh2YWx1ZSBpbnN0YW5jZW9mIExvY2F0b3IpXG4gICAgICByZXR1cm4gdmFsdWU7XG4gICAgdGhyb3cgbmV3IEVycm9yKGBUaGUgJyR7dmFsdWV9JyBpcyBub3QgYSBMb2NhdG9yYCk7XG4gIH1cblxuICBwdWJsaWMgc3RhdGljIGNyZWF0ZShwYXRoOiBMb2NhdG9yIHwgc3RyaW5nKTogTG9jYXRvciB7XG4gICAgaWYgKHBhdGggaW5zdGFuY2VvZiBMb2NhdG9yKVxuICAgICAgcmV0dXJuIHBhdGg7XG5cbiAgICByZXR1cm4gT2JqZWN0LnNlYWwobmV3IExvY2F0b3IodG9VUkxTdHJpbmcocGF0aCkpKTtcbiAgfVxufTtcblxuZXhwb3J0IGNsYXNzIERpclBhdGggZXh0ZW5kcyBMb2NhdG9yIHtcbiAgcHJpdmF0ZSBjb25zdHJ1Y3RvcihkaXJuYW1lOiBzdHJpbmcpIHtcbiAgICBzdXBlcihkaXJuYW1lKTtcbiAgfVxuXG4gIHB1YmxpYyBzdGF0aWMgY3JlYXRlKGRpcm5hbWU6IExvY2F0b3IgfCBzdHJpbmcpOiBEaXJQYXRoIHtcbiAgICBpZiAodHlwZW9mIGRpcm5hbWUgIT09IFwic3RyaW5nXCIpXG4gICAgICBkaXJuYW1lID0gZGlybmFtZS50b1VSTFN0cmluZygpO1xuICAgIHJldHVybiBuZXcgRGlyUGF0aCh0b1VSTFN0cmluZyhkaXJuYW1lKSk7XG4gIH1cblxuICBwdWJsaWMgc3RhdGljIGZyb21KU09OKG9iamVjdDogU2ltcGxlT2JqZWN0KSB7XG4gICAgcmV0dXJuIERpclBhdGguY3JlYXRlKG9iamVjdC51cmwgYXMgc3RyaW5nKTtcbiAgfVxuXG4gIHB1YmxpYyB0b0pTT04oKTogU2ltcGxlT2JqZWN0IHtcbiAgICByZXR1cm4ge1xuICAgICAgdHlwZTogRGlyUGF0aC5uYW1lLFxuICAgICAgdXJsOiB0aGlzLnRvVVJMU3RyaW5nKCksXG4gICAgfTtcbiAgfVxufTtcblxuZXhwb3J0IGNsYXNzIEZpbGVQYXRoIGV4dGVuZHMgTG9jYXRvciB7XG4gIHByaXZhdGUgY29uc3RydWN0b3IoZmlsZXBhdGg6IHN0cmluZykge1xuICAgIHN1cGVyKGZpbGVwYXRoKTtcbiAgfVxuXG4gIHB1YmxpYyBzdGF0aWMgY3JlYXRlKGZpbGVwYXRoOiBMb2NhdG9yIHwgc3RyaW5nKTogRmlsZVBhdGgge1xuICAgIGlmICh0eXBlb2YgZmlsZXBhdGggIT09IFwic3RyaW5nXCIpXG4gICAgICBmaWxlcGF0aCA9IGZpbGVwYXRoLnRvVVJMU3RyaW5nKCk7XG4gICAgcmV0dXJuIG5ldyBGaWxlUGF0aCh0b1VSTFN0cmluZyhmaWxlcGF0aCkpO1xuICB9XG5cbiAgcHVibGljIHN0YXRpYyBmcm9tSlNPTihvYmplY3Q6IFNpbXBsZU9iamVjdCkge1xuICAgIHJldHVybiBGaWxlUGF0aC5jcmVhdGUob2JqZWN0LnVybCBhcyBzdHJpbmcpO1xuICB9XG5cbiAgcHVibGljIHRvSlNPTigpOiBTaW1wbGVPYmplY3Qge1xuICAgIHJldHVybiB7XG4gICAgICB0eXBlOiBGaWxlUGF0aC5uYW1lLFxuICAgICAgdXJsOiB0aGlzLnRvVVJMU3RyaW5nKCksXG4gICAgfTtcbiAgfVxufTtcbiIsImltcG9ydCBmcyBmcm9tIFwibm9kZTpmc1wiO1xuaW1wb3J0IHBhdGggZnJvbSBcIm5vZGU6cGF0aFwiO1xuXG5pbXBvcnQgeyBmaWxlTGlzdCB9IGZyb20gXCJAL3V0aWxzL0ZpbGVTeXN0ZW1cIjtcbmltcG9ydCB7IExvZ2dlciB9IGZyb20gXCJAL2xvZ2dlclwiO1xuXG5jb25zdCBsb2dnZXIgPSBMb2dnZXIuY3JlYXRlKGltcG9ydC5tZXRhLnVybCk7XG5cbmV4cG9ydCBhc3luYyBmdW5jdGlvbiBtYWtlUGF0Y2goc3JjRGlyOiBzdHJpbmcsIGRlc3REaXI6IHN0cmluZykge1xuICBsb2dnZXIuaW5mbyhgTWFrZSBwYXRjaCAke3NyY0Rpcn0gdG8gJHtkZXN0RGlyfWApO1xuICBjb25zdCBsaXN0ID0gYXdhaXQgZmlsZUxpc3Qoc3JjRGlyLCB7IHJlbGF0aXZlOiBzcmNEaXIsIHJlY3Vyc2l2ZTogdHJ1ZSB9KTtcbiAgZm9yIChjb25zdCBpdGVyIG9mIGxpc3QpIHtcbiAgICBjb25zdCBzb3VyY2UgPSBwYXRoLnJlc29sdmUoc3JjRGlyLCBpdGVyKTtcbiAgICBjb25zdCBkZXN0aW5hdGlvbiA9IHBhdGgucmVzb2x2ZShkZXN0RGlyLCBpdGVyKTtcbiAgICBhd2FpdCBmcy5wcm9taXNlcy5jcChzb3VyY2UsIGRlc3RpbmF0aW9uLCB7IGZvcmNlOiB0cnVlIH0pO1xuICAgIGxvZ2dlci5pbmZvKGAgUmVwbGFjZWQgJHtpdGVyfWApO1xuICB9XG59XG4iLCIvKlxuICogTUlUIExpY2Vuc2VcbiAqXG4gKiBDb3B5cmlnaHQgKGMpIDIwMjUgIFl1cmlpIFlha3ViaW4gKHl1cmlpLnlha3ViaW5AZ21haWwuY29tKVxuICpcbiAqIFBlcm1pc3Npb24gaXMgZ3JhbnRlZCB0byB1c2UsIGNvcHksIG1vZGlmeSwgYW5kIGRpc3RyaWJ1dGUgdGhpcyBzb2Z0d2FyZVxuICogdW5kZXIgdGhlIE1JVCBMaWNlbnNlLiBTZWUgTElDRU5TRSBmaWxlIGZvciBkZXRhaWxzLlxuICovXG5cbmV4cG9ydCB7IGlzRW50cnlQb2ludCB9IGZyb20gXCIuL0ltcG9ydE1vZHVsZS5tanNcIjtcbmV4cG9ydCB7IGltcG9ydE1vZHVsZSB9IGZyb20gXCIuL0ltcG9ydE1vZHVsZS5tanNcIjtcbmV4cG9ydCB7IGN1cnJlbnRTY3JpcHRVUkwgfSBmcm9tIFwiLi9JbXBvcnRNb2R1bGUubWpzXCI7XG5cbmV4cG9ydCBjb25zdCByZXF1aXJlU3luYyA9IGV2YWwoXCJyZXF1aXJlXCIpIGFzIE5vZGVKUy5SZXF1aXJlO1xuXG5leHBvcnQgZnVuY3Rpb24gcmVxdWlyZVJlc29sdmUobmFtZTogc3RyaW5nKSB7XG4gIGlmICh0eXBlb2YgaW1wb3J0Lm1ldGEucmVzb2x2ZSA9PT0gJ2Z1bmN0aW9uJylcbiAgICByZXR1cm4gaW1wb3J0Lm1ldGEucmVzb2x2ZShuYW1lKTtcbiAgaWYgKHR5cGVvZiByZXF1aXJlU3luYyAhPT0gJ3VuZGVmaW5lZCcpXG4gICAgcmV0dXJuIHJlcXVpcmVTeW5jLnJlc29sdmUobmFtZSk7XG4gIHRocm93IG5ldyBFcnJvcihcIk5vIGNvbXBhdGlibGUgbW9kdWxlIHJlc29sdmVyIGZvdW5kXCIpO1xufVxuIiwiLypcbiAqIE1JVCBMaWNlbnNlXG4gKlxuICogQ29weXJpZ2h0IChjKSAyMDI1ICBZdXJpaSBZYWt1YmluICh5dXJpaS55YWt1YmluQGdtYWlsLmNvbSlcbiAqXG4gKiBQZXJtaXNzaW9uIGlzIGdyYW50ZWQgdG8gdXNlLCBjb3B5LCBtb2RpZnksIGFuZCBkaXN0cmlidXRlIHRoaXMgc29mdHdhcmVcbiAqIHVuZGVyIHRoZSBNSVQgTGljZW5zZS4gU2VlIExJQ0VOU0UgZmlsZSBmb3IgZGV0YWlscy5cbiAqL1xuXG5pbXBvcnQgb3MgZnJvbSBcIm5vZGU6b3NcIjtcbmltcG9ydCBub2RlcGF0aCBmcm9tIFwibm9kZTpwYXRoXCI7XG5cbmxldCBuYXRpdmVTZXAgPSAgbm9kZXBhdGgucG9zaXguc2VwO1xubGV0IG90aGVyU2VwID0gbm9kZXBhdGgud2luMzIuc2VwO1xuXG5pZiAob3MucGxhdGZvcm0oKSA9PT0gXCJ3aW4zMlwiKSB7XG4gIFsgbmF0aXZlU2VwLCBvdGhlclNlcCBdID0gWyBvdGhlclNlcCwgbmF0aXZlU2VwIF07XG59XG5cbmV4cG9ydCBuYW1lc3BhY2UgUGF0aCB7XG5cbmV4cG9ydCBjb25zdCBzZXAgPSBub2RlcGF0aC5wb3NpeC5zZXA7XG5leHBvcnQgY29uc3QgZGVsaW1pdGVyID0gbm9kZXBhdGguZGVsaW1pdGVyO1xuXG5leHBvcnQgZnVuY3Rpb24gbmF0aXZlUGF0aChwYXRoOiBzdHJpbmcpOiBzdHJpbmcge1xuICByZXR1cm4gcGF0aC5yZXBsYWNlQWxsKG90aGVyU2VwLCBuYXRpdmVTZXApO1xufVxuXG5leHBvcnQgZnVuY3Rpb24gcmVwcmVzZW50UGF0aChwYXRoOiBzdHJpbmcpOiBzdHJpbmcge1xuICByZXR1cm4gcGF0aC5yZXBsYWNlQWxsKG5vZGVwYXRoLndpbjMyLnNlcCwgbm9kZXBhdGgucG9zaXguc2VwKTtcbn1cblxuZXhwb3J0IGZ1bmN0aW9uIGlzQWJzb2x1dGUocGF0aDogc3RyaW5nKTogYm9vbGVhbiB7XG4gIHJldHVybiBub2RlcGF0aC5pc0Fic29sdXRlKG5hdGl2ZVBhdGgocGF0aCkpO1xufVxuXG5leHBvcnQgZnVuY3Rpb24gam9pbiguLi5wYXRoczogc3RyaW5nW10pOiBzdHJpbmcge1xuICByZXR1cm4gcmVwcmVzZW50UGF0aChub2RlcGF0aC5qb2luKC4uLnBhdGhzLm1hcChpID0+IG5hdGl2ZVBhdGgoaSkpKSk7XG59XG5cbmV4cG9ydCBmdW5jdGlvbiByZXNvbHZlKC4uLnBhdGhzOiBzdHJpbmdbXSk6IHN0cmluZyB7XG4gIHJldHVybiByZXByZXNlbnRQYXRoKG5vZGVwYXRoLnJlc29sdmUoLi4ucGF0aHMubWFwKGkgPT4gbmF0aXZlUGF0aChpKSkpKTtcbn1cblxuZXhwb3J0IGZ1bmN0aW9uIGRpcm5hbWUocGF0aDogc3RyaW5nKTogc3RyaW5nIHtcbiAgcmV0dXJuIHJlcHJlc2VudFBhdGgobm9kZXBhdGguZGlybmFtZShuYXRpdmVQYXRoKHBhdGgpKSk7XG59XG5cbmV4cG9ydCBmdW5jdGlvbiBiYXNlbmFtZShwYXRoOiBzdHJpbmcsIHN1ZmZpeD86IHN0cmluZyk6IHN0cmluZyB7XG4gIHJldHVybiByZXByZXNlbnRQYXRoKG5vZGVwYXRoLmJhc2VuYW1lKG5hdGl2ZVBhdGgocGF0aCksIHN1ZmZpeCkpO1xufVxuXG5leHBvcnQgZnVuY3Rpb24gcmVsYXRpdmUoZnJvbTogc3RyaW5nLCB0bzogc3RyaW5nKTogc3RyaW5nIHtcbiAgcmV0dXJuIHJlcHJlc2VudFBhdGgobm9kZXBhdGgucmVsYXRpdmUobmF0aXZlUGF0aChmcm9tKSwgbmF0aXZlUGF0aCh0bykpKTtcbn1cblxufSAvLyBuYW1lc3BhY2UgUGF0aFxuIiwiLypcbiAqIE1JVCBMaWNlbnNlXG4gKlxuICogQ29weXJpZ2h0IChjKSAyMDI1ICBZdXJpaSBZYWt1YmluICh5dXJpaS55YWt1YmluQGdtYWlsLmNvbSlcbiAqXG4gKiBQZXJtaXNzaW9uIGlzIGdyYW50ZWQgdG8gdXNlLCBjb3B5LCBtb2RpZnksIGFuZCBkaXN0cmlidXRlIHRoaXMgc29mdHdhcmVcbiAqIHVuZGVyIHRoZSBNSVQgTGljZW5zZS4gU2VlIExJQ0VOU0UgZmlsZSBmb3IgZGV0YWlscy5cbiAqL1xuXG5leHBvcnQgZnVuY3Rpb24gZXF1YWxWYWx1ZShhOiBhbnksIGI6IGFueSk6IGJvb2xlYW4ge1xuICBpZiAoYSA9PT0gYilcbiAgICByZXR1cm4gdHJ1ZTtcblxuICBpZiAoYSA9PT0gdW5kZWZpbmVkIHx8IGIgPT09IHVuZGVmaW5lZClcbiAgICByZXR1cm4gZmFsc2U7XG5cbiAgaWYgKHR5cGVvZiBhICE9PSBcIm9iamVjdFwiIHx8IHR5cGVvZiBiICE9PSBcIm9iamVjdFwiKVxuICAgIHJldHVybiBmYWxzZTtcblxuICBjb25zdCBrMSA9IE9iamVjdC5rZXlzKGEpO1xuICBjb25zdCBrMiA9IE9iamVjdC5rZXlzKGIpO1xuXG4gIGlmIChrMS5sZW5ndGggIT0gazIubGVuZ3RoKVxuICAgIHJldHVybiBmYWxzZTtcblxuICBmb3IgKGNvbnN0IGtleSBvZiBrMSkge1xuICAgIGlmICghT2JqZWN0Lmhhc093bihiLCBrZXkpIHx8ICFlcXVhbFZhbHVlKGFba2V5XSwgYltrZXldKSlcbiAgICAgIHJldHVybiBmYWxzZTtcbiAgfVxuXG4gIHJldHVybiB0cnVlO1xufVxuXG5leHBvcnQgZnVuY3Rpb24gZGVlcENvcHkobzogYW55KTogYW55IHtcbiAgaWYgKCFvIHx8IHR5cGVvZiBvICE9PSBcIm9iamVjdFwiKVxuICAgIHJldHVybiBvO1xuICBpZiAoQXJyYXkuaXNBcnJheShvKSkge1xuICAgIGNvbnN0IHJlc3VsdCA9IFtdO1xuICAgIGZvciAoY29uc3QgaXRlciBvZiBvKVxuICAgICAgcmVzdWx0LnB1c2goZGVlcENvcHkoaXRlcikpO1xuICAgIHJldHVybiByZXN1bHQ7XG4gIH1cbiAgZWxzZSB7XG4gICAgY29uc3QgcmVzdWx0ID0ge30gYXMgYW55O1xuICAgIGZvciAoY29uc3QgW2tleSx2YWxdIG9mIE9iamVjdC5lbnRyaWVzKG8pKVxuICAgICAgcmVzdWx0W2tleV0gPSBkZWVwQ29weSh2YWwpO1xuICAgIHJldHVybiByZXN1bHQ7XG4gIH1cbn1cblxuZXhwb3J0IGZ1bmN0aW9uIGFzc2lnbk9iamVjdCh0YXJnZXQ6IGFueSwgc291cmNlOiBhbnkpIHtcbiAgaWYgKEFycmF5LmlzQXJyYXkodGFyZ2V0KSAmJiBBcnJheS5pc0FycmF5KHNvdXJjZSkpIHtcbiAgICBmb3IgKGNvbnN0IGl0ZXIgb2Ygc291cmNlKVxuICAgICAgdGFyZ2V0LnB1c2goaXRlcik7XG4gIH1cbiAgZWxzZSB7XG4gICAgZm9yIChjb25zdCBrZXkgb2YgT2JqZWN0LmtleXMoc291cmNlKSkge1xuICAgICAgY29uc3QgYSA9IHRhcmdldFtrZXldLCBiID0gc291cmNlW2tleV07XG4gICAgICBpZiAoYSAmJiB0eXBlb2YgYSA9PT0gXCJvYmplY3RcIiAmJiBiICYmIHR5cGVvZiBiID09PSBcIm9iamVjdFwiKVxuICAgICAgICBhc3NpZ25PYmplY3QoYSwgYik7XG4gICAgICBlbHNlXG4gICAgICAgIHRhcmdldFtrZXldID0gZGVlcENvcHkoYik7XG4gICAgfVxuICB9XG59XG5cbmV4cG9ydCBmdW5jdGlvbiBhcnJheVdyYXBwZXIodmFsdWU6IGFueSkge1xuICBpZiAodmFsdWUgPT09IHVuZGVmaW5lZCB8fCBBcnJheS5pc0FycmF5KHZhbHVlKSlcbiAgICByZXR1cm4gdmFsdWU7XG4gIHJldHVybiBbIHZhbHVlIF07XG59XG4iLCIvKlxuICogTUlUIExpY2Vuc2VcbiAqXG4gKiBDb3B5cmlnaHQgKGMpIDIwMjUgIFl1cmlpIFlha3ViaW4gKHl1cmlpLnlha3ViaW5AZ21haWwuY29tKVxuICpcbiAqIFBlcm1pc3Npb24gaXMgZ3JhbnRlZCB0byB1c2UsIGNvcHksIG1vZGlmeSwgYW5kIGRpc3RyaWJ1dGUgdGhpcyBzb2Z0d2FyZVxuICogdW5kZXIgdGhlIE1JVCBMaWNlbnNlLiBTZWUgTElDRU5TRSBmaWxlIGZvciBkZXRhaWxzLlxuICovXG5cbmNvbnN0IGZpcnN0Q2hhcnMgPSBcIl9hYmNkZWZnaGlqa2xtbm9wcXJzdHV2d3h5ekFCQ0RFRkdISUpLTE1OT1BRUlNUVVZXWFlaXCI7XG5jb25zdCBvdGhlckNoYXJzID0gZmlyc3RDaGFycyArIFwiMDEyMzQ1Njc4OVwiO1xuXG5mdW5jdGlvbiBnZXRDaGFyT2YoY2hhcnM6IHN0cmluZykge1xuICByZXR1cm4gY2hhcnMuY2hhckF0KE1hdGguZmxvb3IoTWF0aC5yYW5kb20oKSAqIGNoYXJzLmxlbmd0aCkpO1xufVxuXG5leHBvcnQgZnVuY3Rpb24gcmFuZENJZGVudGlmZXIobGVuZ3RoOiBudW1iZXIpIHtcbiAgaWYgKCFsZW5ndGgpXG4gICAgcmV0dXJuIFwiXCI7XG5cbiAgbGV0IHJlc3VsdCA9IGdldENoYXJPZihmaXJzdENoYXJzKTtcbiAgZm9yIChsZXQgaSA9IDE7IGkgPCBsZW5ndGg7IGkrKylcbiAgICByZXN1bHQgKz0gZ2V0Q2hhck9mKG90aGVyQ2hhcnMpO1xuXG4gIHJldHVybiByZXN1bHQ7XG59XG4iLCIvKlxuICogTUlUIExpY2Vuc2VcbiAqXG4gKiBDb3B5cmlnaHQgKGMpIDIwMjUgIFl1cmlpIFlha3ViaW4gKHl1cmlpLnlha3ViaW5AZ21haWwuY29tKVxuICpcbiAqIFBlcm1pc3Npb24gaXMgZ3JhbnRlZCB0byB1c2UsIGNvcHksIG1vZGlmeSwgYW5kIGRpc3RyaWJ1dGUgdGhpcyBzb2Z0d2FyZVxuICogdW5kZXIgdGhlIE1JVCBMaWNlbnNlLiBTZWUgTElDRU5TRSBmaWxlIGZvciBkZXRhaWxzLlxuICovXG5cbmltcG9ydCBmcyBmcm9tIFwibm9kZTpmc1wiO1xuXG5leHBvcnQgY2xhc3MgU2V0dGluZ3NTdG9yYWdlIHtcbiAgcHJpdmF0ZSBfZmlsZW5hbWU6IHN0cmluZztcbiAgcHJpdmF0ZSBfc2V0dGluZ3M6IGFueTtcbiAgcHJpdmF0ZSBfY3VycmVudDogYW55O1xuXG4gIGNvbnN0cnVjdG9yKGZpbGVuYW1lOiBzdHJpbmcpIHtcbiAgICB0aGlzLl9maWxlbmFtZSA9IGZpbGVuYW1lO1xuICB9XG5cbiAgcHVibGljIGFzeW5jIHB1c2gobmFtZTogc3RyaW5nKSB7XG4gICAgaWYgKCF0aGlzLl9zZXR0aW5ncylcbiAgICAgIGF3YWl0IHRoaXMubG9hZCgpO1xuICAgIGxldCBvYmplY3QgPSB0aGlzLl9jdXJyZW50Lm9iamVjdFtuYW1lXTtcbiAgICBpZiAoIW9iamVjdClcbiAgICAgIG9iamVjdCA9IHRoaXMuX2N1cnJlbnQub2JqZWN0W25hbWVdID0ge307XG4gICAgdGhpcy5fY3VycmVudCA9IHsgcGFyZW50OiB0aGlzLl9jdXJyZW50LCBvYmplY3QgfTtcbiAgfVxuXG4gIHB1YmxpYyBhc3luYyBwb3AoKSB7XG4gICAgaWYgKCF0aGlzLl9zZXR0aW5ncylcbiAgICAgIGF3YWl0IHRoaXMubG9hZCgpO1xuICAgIGNvbnNvbGUuYXNzZXJ0KHRoaXMuX2N1cnJlbnQucGFyZW50KTtcbiAgICB0aGlzLl9jdXJyZW50ID0gdGhpcy5fY3VycmVudC5wYXJlbnQ7XG4gIH1cblxuICBwdWJsaWMgYXN5bmMgZ2V0KG5hbWU6IHN0cmluZykge1xuICAgIGlmICghdGhpcy5fc2V0dGluZ3MpXG4gICAgICBhd2FpdCB0aGlzLmxvYWQoKTtcbiAgICByZXR1cm4gdGhpcy5fY3VycmVudC5vYmplY3RbbmFtZV07XG4gIH1cblxuICBwdWJsaWMgYXN5bmMgc2V0KG5hbWU6IHN0cmluZywgdmFsdWU6IGFueSkge1xuICAgIGlmICghdGhpcy5fc2V0dGluZ3MpXG4gICAgICBhd2FpdCB0aGlzLmxvYWQoKTtcbiAgICB0aGlzLl9jdXJyZW50Lm9iamVjdFtuYW1lXSA9IHZhbHVlO1xuICAgIGF3YWl0IHRoaXMuc2F2ZSgpO1xuICB9XG5cbiAgcHVibGljIGFzeW5jIGxvYWQoKSB7XG4gICAgdHJ5IHtcbiAgICAgIGNvbnN0IGNvbnRlbnQgPSBhd2FpdCBmcy5wcm9taXNlcy5yZWFkRmlsZSh0aGlzLl9maWxlbmFtZSwgXCJ1dGYtOFwiKTtcbiAgICAgIHRoaXMuX3NldHRpbmdzID0gSlNPTi5wYXJzZShjb250ZW50KTtcbiAgICB9XG4gICAgY2F0Y2ggKGUpIHtcbiAgICAgIHRoaXMuX3NldHRpbmdzID0ge307XG4gICAgfVxuICAgIHRoaXMuX2N1cnJlbnQgPVxuICAgIHtcbiAgICAgIHBhcmVudDogbnVsbCxcbiAgICAgIG9iamVjdDogdGhpcy5fc2V0dGluZ3MsXG4gICAgfTtcbiAgfVxuXG4gIHB1YmxpYyBhc3luYyBzYXZlKCkge1xuICAgIGNvbnN0IHNwYWNlID0gMjtcbiAgICBjb25zdCBjb250ZW50ID0gSlNPTi5zdHJpbmdpZnkodGhpcy5fc2V0dGluZ3MsIHVuZGVmaW5lZCwgc3BhY2UpO1xuICAgIGF3YWl0IGZzLnByb21pc2VzLndyaXRlRmlsZSh0aGlzLl9maWxlbmFtZSwgY29udGVudCwgeyBlbmNvZGluZzogXCJ1dGYtOFwiLCBmbGFnOiBcIndcIiwgZmx1c2g6IHRydWUgfSk7XG4gIH1cbn07XG4iLCIvKlxuICogTUlUIExpY2Vuc2VcbiAqXG4gKiBDb3B5cmlnaHQgKGMpIDIwMjUgIFl1cmlpIFlha3ViaW4gKHl1cmlpLnlha3ViaW5AZ21haWwuY29tKVxuICpcbiAqIFBlcm1pc3Npb24gaXMgZ3JhbnRlZCB0byB1c2UsIGNvcHksIG1vZGlmeSwgYW5kIGRpc3RyaWJ1dGUgdGhpcyBzb2Z0d2FyZVxuICogdW5kZXIgdGhlIE1JVCBMaWNlbnNlLiBTZWUgTElDRU5TRSBmaWxlIGZvciBkZXRhaWxzLlxuICovXG5cbmV4cG9ydCBmdW5jdGlvbiBlbnN1cmVCb29sZWFuKHZhbHVlOiBhbnkpIHtcbiAgaWYgKHR5cGVvZiB2YWx1ZSA9PT0gXCJib29sZWFuXCIpXG4gICAgcmV0dXJuIHZhbHVlO1xuICB0aHJvdyBuZXcgVHlwZUVycm9yKGBUaGUgJyR7dmFsdWV9JyBpcyBub3QgYSBib29sZWFuYCk7XG59XG5cbmV4cG9ydCBmdW5jdGlvbiBlbnN1cmVOdW1iZXIodmFsdWU6IGFueSkge1xuICBpZiAodHlwZW9mIHZhbHVlID09PSBcIm51bWJlclwiKVxuICAgIHJldHVybiB2YWx1ZTtcbiAgdGhyb3cgbmV3IFR5cGVFcnJvcihgVGhlICcke3ZhbHVlfScgaXMgbm90IGEgbnVtYmVyYCk7XG59XG5cbmV4cG9ydCBmdW5jdGlvbiBlbnN1cmVTdHJpbmcodmFsdWU6IGFueSkge1xuICBpZiAodHlwZW9mIHZhbHVlID09PSBcInN0cmluZ1wiKVxuICAgIHJldHVybiB2YWx1ZTtcbiAgdGhyb3cgbmV3IFR5cGVFcnJvcihgVGhlICcke3ZhbHVlfScgaXMgbm90IGEgc3RyaW5nYCk7XG59XG5cbmV4cG9ydCBmdW5jdGlvbiBlbnN1cmVBcnJheSh2YWx1ZTogYW55KSB7XG4gIGlmIChBcnJheS5pc0FycmF5KHZhbHVlKSlcbiAgICByZXR1cm4gQXJyYXkuZnJvbSh2YWx1ZSk7XG4gIHRocm93IG5ldyBUeXBlRXJyb3IoYFRoZSAnJHt2YWx1ZX0nIGlzIG5vdCBhIGFycmF5YCk7XG59XG4iLCIvKlxuICogTUlUIExpY2Vuc2VcbiAqXG4gKiBDb3B5cmlnaHQgKGMpIDIwMjUgIFl1cmlpIFlha3ViaW4gKHl1cmlpLnlha3ViaW5AZ21haWwuY29tKVxuICpcbiAqIFBlcm1pc3Npb24gaXMgZ3JhbnRlZCB0byB1c2UsIGNvcHksIG1vZGlmeSwgYW5kIGRpc3RyaWJ1dGUgdGhpcyBzb2Z0d2FyZVxuICogdW5kZXIgdGhlIE1JVCBMaWNlbnNlLiBTZWUgTElDRU5TRSBmaWxlIGZvciBkZXRhaWxzLlxuICovXG5cbmV4cG9ydCBjb25zdCBGSUxFX1NDSEVNRSA9IFwiZmlsZTovL1wiO1xuZXhwb3J0IGNvbnN0IElNUE9SVF9TQ0hFTUUgPSBcImltcG9ydDovL1wiO1xuZXhwb3J0IGNvbnN0IEhUVFBfU0NIRU1FID0gXCJodHRwOi8vXCI7XG5leHBvcnQgY29uc3QgSFRUUFNfU0NIRU1FID0gXCJodHRwczovL1wiO1xuIiwibW9kdWxlLmV4cG9ydHMgPSByZXF1aXJlKFwiaHR0cFwiKTsiLCJtb2R1bGUuZXhwb3J0cyA9IHJlcXVpcmUoXCJodHRwc1wiKTsiLCJtb2R1bGUuZXhwb3J0cyA9IHJlcXVpcmUoXCJub2RlOmNoaWxkX3Byb2Nlc3NcIik7IiwibW9kdWxlLmV4cG9ydHMgPSByZXF1aXJlKFwibm9kZTpmc1wiKTsiLCJtb2R1bGUuZXhwb3J0cyA9IHJlcXVpcmUoXCJub2RlOm9zXCIpOyIsIm1vZHVsZS5leHBvcnRzID0gcmVxdWlyZShcIm5vZGU6cGF0aFwiKTsiLCJtb2R1bGUuZXhwb3J0cyA9IHJlcXVpcmUoXCJub2RlOnVybFwiKTsiLCJtb2R1bGUuZXhwb3J0cyA9IHJlcXVpcmUoXCJub2RlOnV0aWxcIik7IiwibW9kdWxlLmV4cG9ydHMgPSByZXF1aXJlKFwibm9kZTp3b3JrZXJfdGhyZWFkc1wiKTsiLCIvLyBUaGUgbW9kdWxlIGNhY2hlXG52YXIgX193ZWJwYWNrX21vZHVsZV9jYWNoZV9fID0ge307XG5cbi8vIFRoZSByZXF1aXJlIGZ1bmN0aW9uXG5mdW5jdGlvbiBfX3dlYnBhY2tfcmVxdWlyZV9fKG1vZHVsZUlkKSB7XG5cdC8vIENoZWNrIGlmIG1vZHVsZSBpcyBpbiBjYWNoZVxuXHR2YXIgY2FjaGVkTW9kdWxlID0gX193ZWJwYWNrX21vZHVsZV9jYWNoZV9fW21vZHVsZUlkXTtcblx0aWYgKGNhY2hlZE1vZHVsZSAhPT0gdW5kZWZpbmVkKSB7XG5cdFx0cmV0dXJuIGNhY2hlZE1vZHVsZS5leHBvcnRzO1xuXHR9XG5cdC8vIENyZWF0ZSBhIG5ldyBtb2R1bGUgKGFuZCBwdXQgaXQgaW50byB0aGUgY2FjaGUpXG5cdHZhciBtb2R1bGUgPSBfX3dlYnBhY2tfbW9kdWxlX2NhY2hlX19bbW9kdWxlSWRdID0ge1xuXHRcdC8vIG5vIG1vZHVsZS5pZCBuZWVkZWRcblx0XHQvLyBubyBtb2R1bGUubG9hZGVkIG5lZWRlZFxuXHRcdGV4cG9ydHM6IHt9XG5cdH07XG5cblx0Ly8gRXhlY3V0ZSB0aGUgbW9kdWxlIGZ1bmN0aW9uXG5cdF9fd2VicGFja19tb2R1bGVzX19bbW9kdWxlSWRdKG1vZHVsZSwgbW9kdWxlLmV4cG9ydHMsIF9fd2VicGFja19yZXF1aXJlX18pO1xuXG5cdC8vIFJldHVybiB0aGUgZXhwb3J0cyBvZiB0aGUgbW9kdWxlXG5cdHJldHVybiBtb2R1bGUuZXhwb3J0cztcbn1cblxuIiwiLy8gZ2V0RGVmYXVsdEV4cG9ydCBmdW5jdGlvbiBmb3IgY29tcGF0aWJpbGl0eSB3aXRoIG5vbi1oYXJtb255IG1vZHVsZXNcbl9fd2VicGFja19yZXF1aXJlX18ubiA9IChtb2R1bGUpID0+IHtcblx0dmFyIGdldHRlciA9IG1vZHVsZSAmJiBtb2R1bGUuX19lc01vZHVsZSA/XG5cdFx0KCkgPT4gKG1vZHVsZVsnZGVmYXVsdCddKSA6XG5cdFx0KCkgPT4gKG1vZHVsZSk7XG5cdF9fd2VicGFja19yZXF1aXJlX18uZChnZXR0ZXIsIHsgYTogZ2V0dGVyIH0pO1xuXHRyZXR1cm4gZ2V0dGVyO1xufTsiLCIvLyBkZWZpbmUgZ2V0dGVyIGZ1bmN0aW9ucyBmb3IgaGFybW9ueSBleHBvcnRzXG5fX3dlYnBhY2tfcmVxdWlyZV9fLmQgPSAoZXhwb3J0cywgZGVmaW5pdGlvbikgPT4ge1xuXHRmb3IodmFyIGtleSBpbiBkZWZpbml0aW9uKSB7XG5cdFx0aWYoX193ZWJwYWNrX3JlcXVpcmVfXy5vKGRlZmluaXRpb24sIGtleSkgJiYgIV9fd2VicGFja19yZXF1aXJlX18ubyhleHBvcnRzLCBrZXkpKSB7XG5cdFx0XHRPYmplY3QuZGVmaW5lUHJvcGVydHkoZXhwb3J0cywga2V5LCB7IGVudW1lcmFibGU6IHRydWUsIGdldDogZGVmaW5pdGlvbltrZXldIH0pO1xuXHRcdH1cblx0fVxufTsiLCJfX3dlYnBhY2tfcmVxdWlyZV9fLm8gPSAob2JqLCBwcm9wKSA9PiAoT2JqZWN0LnByb3RvdHlwZS5oYXNPd25Qcm9wZXJ0eS5jYWxsKG9iaiwgcHJvcCkpIiwiLy8gZGVmaW5lIF9fZXNNb2R1bGUgb24gZXhwb3J0c1xuX193ZWJwYWNrX3JlcXVpcmVfXy5yID0gKGV4cG9ydHMpID0+IHtcblx0aWYodHlwZW9mIFN5bWJvbCAhPT0gJ3VuZGVmaW5lZCcgJiYgU3ltYm9sLnRvU3RyaW5nVGFnKSB7XG5cdFx0T2JqZWN0LmRlZmluZVByb3BlcnR5KGV4cG9ydHMsIFN5bWJvbC50b1N0cmluZ1RhZywgeyB2YWx1ZTogJ01vZHVsZScgfSk7XG5cdH1cblx0T2JqZWN0LmRlZmluZVByb3BlcnR5KGV4cG9ydHMsICdfX2VzTW9kdWxlJywgeyB2YWx1ZTogdHJ1ZSB9KTtcbn07IiwiLypcbiAqIE1JVCBMaWNlbnNlXG4gKlxuICogQ29weXJpZ2h0IChjKSAyMDI1ICBZdXJpaSBZYWt1YmluICh5dXJpaS55YWt1YmluQGdtYWlsLmNvbSlcbiAqXG4gKiBQZXJtaXNzaW9uIGlzIGdyYW50ZWQgdG8gdXNlLCBjb3B5LCBtb2RpZnksIGFuZCBkaXN0cmlidXRlIHRoaXMgc29mdHdhcmVcbiAqIHVuZGVyIHRoZSBNSVQgTGljZW5zZS4gU2VlIExJQ0VOU0UgZmlsZSBmb3IgZGV0YWlscy5cbiAqL1xuXG4vLy8gPHJlZmVyZW5jZSBwYXRoPVwiZ2xvYmFsLmQudHNcIiAvPlxuXG5pbXBvcnQgKiBhcyBjeHggZnJvbSBcIkAvY3h4XCI7XG5pbXBvcnQgeyBDTWFrZVByb2Nlc3MsIENUZXN0UHJvY2VzcywgU2NyaXB0TW9kZU9wdGlvbnMsIGdldFByb2plY3RJbmZvIH0gZnJvbSBcIkAvY21ha2VcIjtcblxuaW1wb3J0IHsgc3Bhd25Bc3luYyB9IGZyb20gXCJAL3V0aWxzL0NoaWxkUHJvY2Vzc1wiO1xuaW1wb3J0IHsgcmVxdWVzdEdldCwgZG93bmxvYWRGaWxlIH0gZnJvbSBcIkAvdXRpbHMvSHR0cFJlcXVlc3RcIjtcbmltcG9ydCB7IFBhdGggfSBmcm9tIFwiQC91dGlscy9QYXRoXCI7XG5pbXBvcnQgeyBydW5TY3JpcHQgfSBmcm9tIFwiQC9hcHAvUnVuU2NyaXB0XCI7XG5cbmV4cG9ydCBkZWZhdWx0IHtcbiAgY3h4LFxuICBjbWFrZToge1xuICAgIHNjcmlwdE1vZGU6IChzY3JpcHRGaWxlOiBzdHJpbmcsIHZhcmlhYmxlczogb2JqZWN0LCBvcHRpb25zPzogU2NyaXB0TW9kZU9wdGlvbnMpID0+IENNYWtlUHJvY2Vzcy5nZXRJbnN0YW5jZSgpLnNjcmlwdE1vZGUoc2NyaXB0RmlsZSwgdmFyaWFibGVzLCBvcHRpb25zKSxcbiAgICBjb25maWd1cmU6IChhcmdzOiBhbnkpID0+IENNYWtlUHJvY2Vzcy5nZXRJbnN0YW5jZSgpLmNvbmZpZ3VyZShhcmdzKSxcbiAgICBidWlsZDogKGFyZ3M6IGFueSkgPT4gQ01ha2VQcm9jZXNzLmdldEluc3RhbmNlKCkuYnVpbGQoYXJncyksXG4gICAgaW5zdGFsbDogKGFyZ3M6IGFueSkgPT4gQ01ha2VQcm9jZXNzLmdldEluc3RhbmNlKCkuaW5zdGFsbChhcmdzKSxcbiAgICBleHRyYWN0OiAoYXJnczogYW55KSA9PiBDTWFrZVByb2Nlc3MuZ2V0SW5zdGFuY2UoKS5leHRyYWN0KGFyZ3MpLFxuICAgIGN0ZXN0OiAoYXJnczogYW55KSA9PiBDVGVzdFByb2Nlc3MuZ2V0SW5zdGFuY2UoKS5jdGVzdChhcmdzKSxcbiAgICBnZXRQcm9qZWN0SW5mbyxcbiAgfSxcbiAgcHJvY2Vzczoge1xuICAgIHNwYXduOiBzcGF3bkFzeW5jLFxuICB9LFxuICB1dGlsczoge1xuICAgIHJlcXVlc3RHZXQsXG4gICAgZG93bmxvYWRGaWxlLFxuICB9LFxuICBwYXRoOiBQYXRoLFxufTtcblxucnVuU2NyaXB0KCk7XG4iXSwibmFtZXMiOltdLCJzb3VyY2VSb290IjoiIn0=