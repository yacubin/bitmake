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
/* harmony export */   INSTALL_TARGET: () => (/* binding */ INSTALL_TARGET),
/* harmony export */   MAKE_CACHE: () => (/* binding */ MAKE_CACHE),
/* harmony export */   PACKAGE_JSON: () => (/* binding */ PACKAGE_JSON),
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
const PACKAGE_JSON = "package.json";
const MAKE_CACHE = "MakeCache.json";


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
/* harmony export */   lineToSinglComment: () => (/* binding */ lineToSinglComment),
/* harmony export */   scriptMode: () => (/* binding */ scriptMode)
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
async function scriptMode(scriptFile, variables, options) {
    const spawnArgs = [
        ...makeCmdVariables(variables, false),
        "-P", scriptFile,
    ];
    const res = await (0,_utils_ChildProcess__WEBPACK_IMPORTED_MODULE_3__.spawnAsync)("cmake", spawnArgs, {
        cwd: options?.workDir,
        env: options?.environment || process.env,
    });
    if (res.status !== 0) {
        throw `cmake.scriptMode returned status ${res.status}`;
    }
}
async function configure(args) {
    const spawnArgs = [
        "-G", args.generator,
        ...makeCmdVariables(args.cacheVariables, true),
        "-S", args.sourceDir,
        "-B", args.binaryDir,
    ];
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
    scriptMode,
    configure,
    build,
    install,
    ctest,
    extract,
});


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
/* harmony import */ var node_path__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! node:path */ "node:path");
/* harmony import */ var node_path__WEBPACK_IMPORTED_MODULE_1___default = /*#__PURE__*/__webpack_require__.n(node_path__WEBPACK_IMPORTED_MODULE_1__);
/* harmony import */ var node_url__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! node:url */ "node:url");
/* harmony import */ var node_url__WEBPACK_IMPORTED_MODULE_2___default = /*#__PURE__*/__webpack_require__.n(node_url__WEBPACK_IMPORTED_MODULE_2__);
/* harmony import */ var _cmake__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! @/cmake */ "./src/cmake/index.ts");
/* harmony import */ var _utils_MakePatch__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! @/utils/MakePatch */ "./src/utils/MakePatch.ts");
/* harmony import */ var _utils_FileSystem__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(/*! @/utils/FileSystem */ "./src/utils/FileSystem.ts");
/* harmony import */ var _utils_SettingsStorage__WEBPACK_IMPORTED_MODULE_6__ = __webpack_require__(/*! @/utils/SettingsStorage */ "./src/utils/SettingsStorage.ts");
/* harmony import */ var _utils_Primitives__WEBPACK_IMPORTED_MODULE_7__ = __webpack_require__(/*! @/utils/Primitives */ "./src/utils/Primitives.ts");
/* harmony import */ var _Constants__WEBPACK_IMPORTED_MODULE_8__ = __webpack_require__(/*! @/Constants */ "./src/Constants.ts");
/* harmony import */ var _core_Types__WEBPACK_IMPORTED_MODULE_9__ = __webpack_require__(/*! @/core/Types */ "./src/core/Types.ts");
/* harmony import */ var _utils_Module__WEBPACK_IMPORTED_MODULE_10__ = __webpack_require__(/*! @/utils/Module */ "./src/utils/Module.ts");
/* harmony import */ var _utils_HttpRequest__WEBPACK_IMPORTED_MODULE_11__ = __webpack_require__(/*! @/utils/HttpRequest */ "./src/utils/HttpRequest.ts");
/* harmony import */ var _logger__WEBPACK_IMPORTED_MODULE_12__ = __webpack_require__(/*! @/logger */ "./src/logger/index.ts");
/* harmony import */ var _core_BitMakeAction__WEBPACK_IMPORTED_MODULE_13__ = __webpack_require__(/*! @/core/BitMakeAction */ "./src/core/BitMakeAction.ts");
/* harmony import */ var _core_CMakeAction__WEBPACK_IMPORTED_MODULE_14__ = __webpack_require__(/*! @/core/CMakeAction */ "./src/core/CMakeAction.ts");
/* harmony import */ var _core_MakeAction__WEBPACK_IMPORTED_MODULE_15__ = __webpack_require__(/*! @/core/MakeAction */ "./src/core/MakeAction.ts");
/* harmony import */ var _core_ProcessAction__WEBPACK_IMPORTED_MODULE_16__ = __webpack_require__(/*! @/core/ProcessAction */ "./src/core/ProcessAction.ts");
/* harmony import */ var _core_ConfigureAction__WEBPACK_IMPORTED_MODULE_17__ = __webpack_require__(/*! @/core/ConfigureAction */ "./src/core/ConfigureAction.ts");
/*
 * MIT License
 *
 * Copyright (c) 2025  Yurii Yakubin (yurii.yakubin@gmail.com)
 *
 * Permission is granted to use, copy, modify, and distribute this software
 * under the MIT License. See LICENSE file for details.
 */




















const logger = (0,_logger__WEBPACK_IMPORTED_MODULE_12__.createLogger)("file:///mnt/c/opt/work/source/darkit-sdk/external/bitmake/src/commands/build.ts");
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
function makeBuildConfig(gconfig, config) {
    if (config["sourceRoot"]) {
        throw new Error(`Variable "sourceRoot" cannot be changed to "${config.sourceRoot}"`);
    }
    const rootConfig = rebaseConfig(config);
    rootConfig.buildType = rootConfig.buildType || gconfig.buildType;
    rootConfig.sourceRoot = rootConfig.sourceRoot || gconfig.workDir;
    rootConfig.binaryRoot = rootConfig.binaryRoot || node_path__WEBPACK_IMPORTED_MODULE_1___default().posix.resolve(gconfig.workDir, "build");
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
async function doExtractArchive(gconfig, environment, config, settings) {
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
        await (0,_utils_HttpRequest__WEBPACK_IMPORTED_MODULE_11__.downloadFile)(config.sourceUrl, arcFile, { attempts: _Constants__WEBPACK_IMPORTED_MODULE_8__.REQUEST_ATTEMPTS });
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
    cmake: _core_CMakeAction__WEBPACK_IMPORTED_MODULE_14__.cmakeAction,
    configure: _core_ConfigureAction__WEBPACK_IMPORTED_MODULE_17__.configureAction,
    make: _core_MakeAction__WEBPACK_IMPORTED_MODULE_15__.makeAction,
    process: _core_ProcessAction__WEBPACK_IMPORTED_MODULE_16__.processAction,
    bitmake: _core_BitMakeAction__WEBPACK_IMPORTED_MODULE_13__.bitmakeAction,
};
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
        if (actionHandlers[config.action]) {
            config.description && console.log(config.description);
            await actionHandlers[config.action](config, environment, settings);
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
        configPath = node_path__WEBPACK_IMPORTED_MODULE_1___default().isAbsolute(options.env.config) ? options.env.config : node_path__WEBPACK_IMPORTED_MODULE_1___default().resolve(options.workDir, options.env.config);
        if (!await (0,_utils_FileSystem__WEBPACK_IMPORTED_MODULE_5__.fileExists)(configPath))
            throw `Configuration '${options.env.config}' file does not exist`;
    }
    else {
        const userConfigPath = node_path__WEBPACK_IMPORTED_MODULE_1___default().resolve(options.workDir, _Constants__WEBPACK_IMPORTED_MODULE_8__.USER_CONFIG);
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
    const configUrl = node_url__WEBPACK_IMPORTED_MODULE_2___default().pathToFileURL(configPath);
    const configModule = await (0,_utils_Module__WEBPACK_IMPORTED_MODULE_10__.importModule)(configUrl);
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
    const settingsFilename = node_path__WEBPACK_IMPORTED_MODULE_1___default().resolve(buildConfig.binaryRoot, _Constants__WEBPACK_IMPORTED_MODULE_8__.BUILD_SETTINGS_FILE);
    const settings = new _utils_SettingsStorage__WEBPACK_IMPORTED_MODULE_6__.SettingsStorage(settingsFilename);
    for (const [key, entry] of Object.entries(buildConfig)) {
        if (entry && typeof entry === "object" && entry.action && !entry.disabled) {
            await settings.push(key);
            const completed = await settings.get("completed");
            if (entry.rebuild || !completed) {
                logger.info(`Started action: ${key}`);
                const environment = mergeEnvironment(entry.environment, process.env);
                if (entry.sourceUrl) {
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
/* harmony import */ var _utils_Module__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! @/utils/Module */ "./src/utils/Module.ts");
/* harmony import */ var _logger__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(/*! @/logger */ "./src/logger/index.ts");
/*
 * MIT License
 *
 * Copyright (c) 2025  Yurii Yakubin (yurii.yakubin@gmail.com)
 *
 * Permission is granted to use, copy, modify, and distribute this software
 * under the MIT License. See LICENSE file for details.
 */






const logger = (0,_logger__WEBPACK_IMPORTED_MODULE_5__.createLogger)("file:///mnt/c/opt/work/source/darkit-sdk/external/bitmake/src/commands/init.ts");
/* harmony default export */ async function __WEBPACK_DEFAULT_EXPORT__(options) {
    const preset = options.env.preset;
    let presetPath;
    if (preset) {
        if (await (0,_utils_FileSystem__WEBPACK_IMPORTED_MODULE_2__.fileExists)(preset))
            presetPath = preset;
        else {
            const components = preset.split("/");
            if (components.length === 2) {
                try {
                    presetPath = (0,_utils_Module__WEBPACK_IMPORTED_MODULE_4__.requireResolve)(`${components[0]}/bitmake/presets/${components[1]}`);
                }
                catch (e) { }
            }
        }
    }
    if (!presetPath)
        throw new Error(`Preset '${preset}' is not available`);
    const userConfigPath = node_path__WEBPACK_IMPORTED_MODULE_0___default().resolve(options.workDir, _Constants__WEBPACK_IMPORTED_MODULE_3__.USER_CONFIG);
    if (await (0,_utils_FileSystem__WEBPACK_IMPORTED_MODULE_2__.fileExists)(userConfigPath))
        await node_fs__WEBPACK_IMPORTED_MODULE_1___default().promises.rm(userConfigPath);
    await node_fs__WEBPACK_IMPORTED_MODULE_1___default().promises.copyFile(presetPath, userConfigPath);
    logger.info(`Preset '${preset}' installed successfully`);
}


/***/ }),

/***/ "./src/core/BitMakeAction.ts":
/*!***********************************!*\
  !*** ./src/core/BitMakeAction.ts ***!
  \***********************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   bitmakeAction: () => (/* binding */ bitmakeAction)
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













async function bitmakeAction(config, environment, settings) {
    process.env = environment;
    let scope = {};
    _core_Scope__WEBPACK_IMPORTED_MODULE_4__.ScopeHelper.defineVariables(scope, "system", _core_SystemVariables__WEBPACK_IMPORTED_MODULE_11__["default"]);
    const sourceDir = (0,_utils_FileSystem__WEBPACK_IMPORTED_MODULE_7__.getPathString)(config.sourceDir);
    const binaryDir = (0,_utils_FileSystem__WEBPACK_IMPORTED_MODULE_7__.getPathString)(config.binaryDir);
    scope.PROJECT_SOURCE_DIR = _core_Path__WEBPACK_IMPORTED_MODULE_8__.DirPath.create(sourceDir);
    scope.PROJECT_BINARY_DIR = _core_Path__WEBPACK_IMPORTED_MODULE_8__.DirPath.create(binaryDir);
    scope.PACKAGE_FILE = scope.PROJECT_SOURCE_DIR.join(_Constants__WEBPACK_IMPORTED_MODULE_12__.PACKAGE_JSON);
    scope.CACHE_FILE = scope.PROJECT_BINARY_DIR.join(_Constants__WEBPACK_IMPORTED_MODULE_12__.MAKE_CACHE);
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
            throw new Error(`Plugin ${scope.SCRIPT_FILE.basename()} not contain default export`);
        const mk = _core_PluginContext__WEBPACK_IMPORTED_MODULE_2__.PluginContext.create(scope, global);
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
    let content = await node_fs__WEBPACK_IMPORTED_MODULE_0___default().promises.readFile(mk.SCRIPT_INPUT.toString(), "utf-8");
    content = content.replace(/@([_A-Za-z][_A-Za-z0-9]+)@/g, (match, v1) => {
        const res = params[v1] || mk[v1] || "";
        if (Array.isArray(res))
            return res.join("\n");
        return res.toString();
    });
    content = content.replace(/#cmakedefine +([_A-Za-z][_A-Za-z0-9]+) *(.*)/g, (match, v1, v2) => {
        return params[v1] || mk[v1] ? `#define ${v1} ${v2}` : `/* #undef ${v1} */`;
    });
    await node_fs__WEBPACK_IMPORTED_MODULE_0___default().promises.mkdir(node_path__WEBPACK_IMPORTED_MODULE_1___default().dirname(mk.SCRIPT_OUTPUT.toString()), { recursive: true });
    await node_fs__WEBPACK_IMPORTED_MODULE_0___default().promises.writeFile(mk.SCRIPT_OUTPUT.toString(), content, "utf-8");
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

/***/ "./src/core/CMakeAction.ts":
/*!*********************************!*\
  !*** ./src/core/CMakeAction.ts ***!
  \*********************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   cmakeAction: () => (/* binding */ cmakeAction)
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


async function cmakeAction(config, environment, settings) {
    const sourceDir = (0,_utils_FileSystem__WEBPACK_IMPORTED_MODULE_1__.getPathString)(config.sourceDir);
    const binaryDir = (0,_utils_FileSystem__WEBPACK_IMPORTED_MODULE_1__.getPathString)(config.binaryDir);
    const cmakeArgs = {
        environment: {
            ...environment,
            DESTDIR: config.destDir,
        },
        generator: config.generator || _cmake__WEBPACK_IMPORTED_MODULE_0__["default"].DEFAULT_GENERATOR,
        cacheVariables: config.cacheVariables,
        sourceDir,
        binaryDir,
    };
    if (!cmakeArgs.cacheVariables.CMAKE_BUILD_TYPE) {
        cmakeArgs.cacheVariables.CMAKE_BUILD_TYPE = config.buildType;
    }
    await _cmake__WEBPACK_IMPORTED_MODULE_0__["default"].configure(cmakeArgs);
    await _cmake__WEBPACK_IMPORTED_MODULE_0__["default"].build(cmakeArgs);
    await _cmake__WEBPACK_IMPORTED_MODULE_0__["default"].install(cmakeArgs);
}


/***/ }),

/***/ "./src/core/ConfigureAction.ts":
/*!*************************************!*\
  !*** ./src/core/ConfigureAction.ts ***!
  \*************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   configureAction: () => (/* binding */ configureAction)
/* harmony export */ });
/* harmony import */ var node_path__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! node:path */ "node:path");
/* harmony import */ var node_path__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(node_path__WEBPACK_IMPORTED_MODULE_0__);
/* harmony import */ var _utils_FileSystem__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! @/utils/FileSystem */ "./src/utils/FileSystem.ts");
/* harmony import */ var _utils_ChildProcess__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! @/utils/ChildProcess */ "./src/utils/ChildProcess.ts");
/*
 * MIT License
 *
 * Copyright (c) 2025  Yurii Yakubin (yurii.yakubin@gmail.com)
 *
 * Permission is granted to use, copy, modify, and distribute this software
 * under the MIT License. See LICENSE file for details.
 */



async function configureAction(config, environment, settings) {
    const sourceDir = (0,_utils_FileSystem__WEBPACK_IMPORTED_MODULE_1__.getPathString)(config.sourceDir);
    const binaryDir = (0,_utils_FileSystem__WEBPACK_IMPORTED_MODULE_1__.getPathString)(config.binaryDir);
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
        const res1 = await (0,_utils_ChildProcess__WEBPACK_IMPORTED_MODULE_2__.spawnAsync)(command, params, {
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
        const res2 = await (0,_utils_ChildProcess__WEBPACK_IMPORTED_MODULE_2__.spawnAsync)("make", args, {
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
        this[NAME] = options.name || "";
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
        _core_Scope__WEBPACK_IMPORTED_MODULE_0__.ScopeHelper.mergeVariables(this[SCOPE], variables);
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
/* harmony import */ var node_child_process__WEBPACK_IMPORTED_MODULE_18__ = __webpack_require__(/*! node:child_process */ "node:child_process");
/* harmony import */ var node_child_process__WEBPACK_IMPORTED_MODULE_18___default = /*#__PURE__*/__webpack_require__.n(node_child_process__WEBPACK_IMPORTED_MODULE_18__);
/* harmony import */ var _core_BuildinScripts_configure_file__WEBPACK_IMPORTED_MODULE_19__ = __webpack_require__(/*! @/core/BuildinScripts/configure_file */ "./src/core/BuildinScripts/configure_file.ts");
/* harmony import */ var _core_BuildinScripts_install_script__WEBPACK_IMPORTED_MODULE_20__ = __webpack_require__(/*! @/core/BuildinScripts/install_script */ "./src/core/BuildinScripts/install_script.ts");
/* harmony import */ var node_path__WEBPACK_IMPORTED_MODULE_21__ = __webpack_require__(/*! node:path */ "node:path");
/* harmony import */ var node_path__WEBPACK_IMPORTED_MODULE_21___default = /*#__PURE__*/__webpack_require__.n(node_path__WEBPACK_IMPORTED_MODULE_21__);
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
const TARGET_COLLECTION = Symbol("TARGET_COLLECTION");
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
            await node_fs__WEBPACK_IMPORTED_MODULE_0___default().promises.mkdir(node_path__WEBPACK_IMPORTED_MODULE_21___default().posix.dirname(this._output), { recursive: true });
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
            console.info(percent + this._message);
        }
    }
    addExec(command, args, cwd) {
        this.addCallback(() => {
            const result = (0,node_child_process__WEBPACK_IMPORTED_MODULE_18__.spawnSync)(command, args, { cwd, encoding: "utf-8" });
            if (result.error || result.status) {
                logger.info("cd " + cwd);
                let cmd = args.join(" ");
                cmd = command + (cmd ? " " : "") + cmd;
                logger.info(cmd);
                logger.info("");
                logger.error(result.stderr);
                if (result.error)
                    throw result.error;
                throw new Error(result.error || "Status " + result.status);
            }
            if (result.stdout) {
                for (const line of result.stdout.trim().split("\n")) {
                    logger.info(line);
                }
            }
        });
    }
    addScript(global, scope, script, params) {
        this.addCallback(async () => {
            let func = script;
            if (script instanceof _core_Path__WEBPACK_IMPORTED_MODULE_2__.FilePath)
                func = (await (0,_utils_Module__WEBPACK_IMPORTED_MODULE_14__.importModule)(func.toString())).default;
            if (func instanceof Function) {
                const mk = _core_ScriptContext__WEBPACK_IMPORTED_MODULE_17__.ScriptContext.create(scope, global);
                const result = func(mk, scopeValueAsPrimitives(params));
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
class GlobalContext {
    [TARGET_COLLECTION] = new _core_TargetCollection__WEBPACK_IMPORTED_MODULE_4__.TargetStructCollection;
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
            configure_file: _core_BuildinScripts_configure_file__WEBPACK_IMPORTED_MODULE_19__["default"],
            install_script: _core_BuildinScripts_install_script__WEBPACK_IMPORTED_MODULE_20__["default"],
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
    addCustomScript(scope, script, params) {
        if (!params)
            throw new Error("Argument with parameters is missing");
        let scriptObj;
        if (typeof script === "string")
            scriptObj = this.findScriptFunction(script);
        if (!scriptObj)
            scriptObj = _core_Path__WEBPACK_IMPORTED_MODULE_2__.FilePath.create(scope.SOURCE_DIR.resolve(script));
        let inputFile = params.SCRIPT_INPUT;
        if (inputFile)
            inputFile = _core_Path__WEBPACK_IMPORTED_MODULE_2__.FilePath.create(scope.SOURCE_DIR.resolve(inputFile));
        if (!params.SCRIPT_OUTPUT)
            throw new Error("CustomScript parameters required output entity");
        const outputFile = _core_Path__WEBPACK_IMPORTED_MODULE_2__.FilePath.create(scope.SOURCE_DIR.resolve(params.SCRIPT_OUTPUT));
        const options = {
            scope,
            name: params.SCRIPT_NAME,
            script: scriptObj,
            params,
            output: outputFile,
            input: inputFile,
            workDir: scope.BINARY_DIR,
            variables: params.variables || {},
        };
        const target = _core_CustomScript__WEBPACK_IMPORTED_MODULE_16__.CustomScript.create(options);
        if (options.name)
            this[CUSTOM_SCRIPTS].set(options.name, target);
        else
            this[CUSTOM_SCRIPTS].add(target);
        return target;
    }
    registerSystemScope(name, scope) {
        if (this[SCRIPT_VARIABLES_MAP][name])
            throw new Error(`SystemVariables exists for ${name}`);
        this[SCRIPT_VARIABLES_MAP][name] = scope;
    }
    resolveSubdirectory(path) {
        const resolvedPath = this[SUBDIR_ALIAS][path.toString()];
        if (resolvedPath === undefined)
            return path;
        if (resolvedPath === null)
            return undefined;
        return resolvedPath;
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
    addStaticLibrary(scope, name, ...sources) {
        const impl = this[TARGET_COLLECTION].get(name);
        const target = _core_Target__WEBPACK_IMPORTED_MODULE_12__.StaticLibrary.create(impl, scope);
        target.addSources(...sources);
        this[TARGETS].set(name, target);
        return target;
    }
    addObjectLibrary(scope, name, ...sources) {
        const impl = this[TARGET_COLLECTION].get(name);
        const target = _core_Target__WEBPACK_IMPORTED_MODULE_12__.ObjectLibrary.create(impl, scope);
        target.addSources(...sources);
        this[TARGETS].set(name, target);
        return target;
    }
    addSharedLibrary(scope, name, ...sources) {
        const impl = this[TARGET_COLLECTION].get(name);
        const target = _core_Target__WEBPACK_IMPORTED_MODULE_12__.SharedLibrary.create(impl, scope);
        target.addSources(...sources);
        this[TARGETS].set(name, target);
        return target;
    }
    addExecutable(scope, name, ...sources) {
        const impl = this[TARGET_COLLECTION].get(name);
        const target = _core_Target__WEBPACK_IMPORTED_MODULE_12__.Executable.create(impl, scope);
        target.addSources(...sources);
        this[TARGETS].set(name, target);
        return target;
    }
    getUknownTarget(name) {
        let target = this[UNKNOWN_TARGETS][name];
        if (!target) {
            const impl = this[TARGET_COLLECTION].get(name);
            this[UNKNOWN_TARGETS][name] = target = _core_UnknownTarget__WEBPACK_IMPORTED_MODULE_7__.UnknownTarget.create(impl);
        }
        return target;
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
            const worker = new GoalWorkerImpl(script.NAME);
            worker.message = msg;
            worker.output = script.OUTPUT.toString();
            worker.addDependency(...depends);
            worker.addScript(this, script.SCOPE, script.SCRIPT, params);
            goalList.add(worker);
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
                const command = target.TARGET_SCOPE[s.LANGUAGE + "_COMPILER"].toString();
                const output = _core_Path__WEBPACK_IMPORTED_MODULE_2__.DirPath.create(target.TARGET_SCOPE.BINARY_DIR.join(relativeObject));
                depends.push(output.toString());
                const worker = new GoalWorkerImpl;
                worker.message = msg;
                worker.output = output.toString();
                worker.addDependency(...headers);
                worker.addDependency(s.FILE);
                worker.addExec(command, args, target.TARGET_SCOPE.BINARY_DIR.toString());
                goalList.add(worker);
            }
            const generalGoal = new GoalWorkerImpl;
            for (const params of target.IMPL.preBuildList) {
                generalGoal.addExec(params.command.toString(), params.args.map(i => i.toString()), target.TARGET_SCOPE.BINARY_DIR.toString());
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
                    generalGoal.message = `Linking CXX object library ${target.FILE_NAME}`;
                    generalGoal.output = target.FILE.toString();
                    generalGoal.addDependency(...depends);
                    generalGoal.addExec(scope.LINKER, args, target.FILE_DIR.toString());
                }
                else {
                    logger.info(`No objects for "${target.NAME}"`);
                }
            }
            if (target instanceof _core_Target__WEBPACK_IMPORTED_MODULE_12__.StaticLibrary) {
                const objs = depends.filter(i => i.endsWith(".o") || i.endsWith(".obj")).map(i => target.FILE_DIR.relative(i));
                if (objs.length) {
                    const args = ["rc", target.FILE_NAME, ...objs];
                    generalGoal.message = `Linking CXX static library ${target.FILE_NAME}`;
                    generalGoal.output = target.FILE.toString();
                    generalGoal.addDependency(...depends);
                    generalGoal.addExec(scope.AR, args, target.FILE_DIR.toString());
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
                    generalGoal.message = `Linking CXX executable ${target.FILE_NAME}`;
                    generalGoal.output = target.FILE.toString();
                    generalGoal.addDependency(...depends);
                    generalGoal.addDependency(...libs);
                    generalGoal.addExec(scope.CXX_COMPILER, args, target.FILE_DIR.toString());
                }
                else {
                    logger.info(`No objects for "${target.NAME}"`);
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
            dest = dest.toString();
            installPairs.push({ src, dest });
        }
        if (installPairs.length) {
            const worker = new GoalWorkerImpl(_Constants__WEBPACK_IMPORTED_MODULE_1__.INSTALL_TARGET);
            installPairs.forEach(i => void worker.addDependency(i.src));
            worker.addCallback(async () => {
                for (const iter of installPairs)
                    await (0,_core_BuildinScripts_install_script__WEBPACK_IMPORTED_MODULE_20__["default"])(scopeValueAsPrimitives(iter));
            });
            goalList.add(worker);
        }
        const worker = new GoalWorkerImpl(_Constants__WEBPACK_IMPORTED_MODULE_1__.ALL_TARGET);
        Object.keys(this[TARGETS].ENTRIES).forEach(i => void worker.addDependency(i));
        goalList.add(worker);
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
            SUBDIR_ALIAS: this[SUBDIR_ALIAS],
            TARGET_COLLECTION: this[TARGET_COLLECTION],
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
/*
 * MIT License
 *
 * Copyright (c) 2025  Yurii Yakubin (yurii.yakubin@gmail.com)
 *
 * Permission is granted to use, copy, modify, and distribute this software
 * under the MIT License. See LICENSE file for details.
 */
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
    static async buildGoals(collection) {
        const total = collection.length;
        let loaded = 0;
        for (const goal of collection) {
            goal.updateProgress({ loaded, total });
            await goal.doWork();
            loaded++;
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

/***/ "./src/core/MakeAction.ts":
/*!********************************!*\
  !*** ./src/core/MakeAction.ts ***!
  \********************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   makeAction: () => (/* binding */ makeAction)
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


async function makeAction(config, environment, settings) {
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
            const resolvePath = this[GLOBAL].resolveSubdirectory(SOURCE_DIR);
            if (!resolvePath) {
                logger.info(`Source dir "${SOURCE_DIR}" was disabled`);
                return;
            }
            newScope.SOURCE_DIR = _core_Path__WEBPACK_IMPORTED_MODULE_2__.AbsolutePath.create(resolvePath.toString());
            newScope.BINARY_DIR = BINARY_DIR;
            this[GLOBAL].addSubdirectory(newScope);
        },
        addCustomScript(script, params) {
            const newScope = _core_Scope__WEBPACK_IMPORTED_MODULE_8__.ScopeHelper.clone({}, this[SCOPE]);
            _core_Scope__WEBPACK_IMPORTED_MODULE_8__.ScopeHelper.applyVariables(newScope, this);
            for (const [key, val] of Object.entries(params))
                newScope[key] = val;
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
            return this[GLOBAL].addStaticLibrary(this[SCOPE], name, ...sources);
        },
        addObjectLibrary(name, ...sources) {
            return this[GLOBAL].addObjectLibrary(this[SCOPE], name, ...sources);
        },
        addSharedLibrary(name, ...sources) {
            return this[GLOBAL].addSharedLibrary(this[SCOPE], name, ...sources);
        },
        addExecutable(name, ...sources) {
            return this[GLOBAL].addExecutable(this[SCOPE], name, ...sources);
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
        const srcPath = _core_Path__WEBPACK_IMPORTED_MODULE_0__.DirPath.create(this[SCOPE].SCRIPT_DIR.resolve(src));
        const destPath = (dest === null) ? null : _core_Path__WEBPACK_IMPORTED_MODULE_0__.DirPath.create(this[SCOPE].SCRIPT_DIR.resolve(dest));
        this[GLOBAL].addSubdirectoryAlias(srcPath, destPath);
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

/***/ "./src/core/ProcessAction.ts":
/*!***********************************!*\
  !*** ./src/core/ProcessAction.ts ***!
  \***********************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   processAction: () => (/* binding */ processAction)
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




const logger = (0,_logger__WEBPACK_IMPORTED_MODULE_3__.createLogger)("file:///mnt/c/opt/work/source/darkit-sdk/external/bitmake/src/core/ProcessAction.ts");
async function processAction(config, environment, settings) {
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
/* harmony import */ var _core_Scope__WEBPACK_IMPORTED_MODULE_8__ = __webpack_require__(/*! @/core/Scope */ "./src/core/Scope.ts");
/* harmony import */ var _core_DefinitionHelper__WEBPACK_IMPORTED_MODULE_9__ = __webpack_require__(/*! @/core/DefinitionHelper */ "./src/core/DefinitionHelper.ts");
/* harmony import */ var _core_TargetStruct__WEBPACK_IMPORTED_MODULE_10__ = __webpack_require__(/*! @/core/TargetStruct */ "./src/core/TargetStruct.ts");
/*
 * MIT License
 *
 * Copyright (c) 2025  Yurii Yakubin (yurii.yakubin@gmail.com)
 *
 * Permission is granted to use, copy, modify, and distribute this software
 * under the MIT License. See LICENSE file for details.
 */











const IMPL = Symbol("IMPL");
const TARGET_SCOPE = Symbol("TARGET_SCOPE");
const COMPILE_OPTIONS = Symbol("COMPILE_OPTIONS");
const LINK_OPTIONS = Symbol("LINK_OPTIONS");
const INCLUDES = Symbol("INCLUDES");
const DEFINES = Symbol("DEFINES");
const SOURCES = Symbol("SOURCES");
const LIBRARIES = Symbol("LIBRARIES");
const POSITION_INDEPENDENT_CODE = Symbol("POSITION_INDEPENDENT_CODE");
;
class BaseTarget {
    [IMPL];
    [TARGET_SCOPE];
    [COMPILE_OPTIONS];
    [LINK_OPTIONS];
    [SOURCES];
    [LIBRARIES];
    [INCLUDES];
    [DEFINES];
    [POSITION_INDEPENDENT_CODE];
    constructor(impl, scope, prefix, suffix) {
        this[IMPL] = impl;
        const targetFile = impl.targetFile;
        targetFile.fileDir = scope.BINARY_DIR;
        if (targetFile.prefix === undefined)
            targetFile.prefix = prefix;
        if (targetFile.outputName === undefined)
            targetFile.outputName = impl.name;
        if (targetFile.suffix === undefined)
            targetFile.suffix = suffix;
        this[TARGET_SCOPE] = _core_Scope__WEBPACK_IMPORTED_MODULE_8__.ScopeHelper.clone({}, scope);
        this[COMPILE_OPTIONS] = [];
        this[LINK_OPTIONS] = [];
        this[SOURCES] = [];
        this[LIBRARIES] = [];
        this[INCLUDES] = scope.INCLUDES.map((VALUE) => ({ VALUE }));
        this[DEFINES] = [];
        this[POSITION_INDEPENDENT_CODE] = scope.POSITION_INDEPENDENT_CODE;
    }
    get NAME() {
        return this[IMPL].name;
    }
    get TARGET_SCOPE() {
        return this[TARGET_SCOPE];
    }
    get COMPILE_OPTIONS() {
        return this[COMPILE_OPTIONS];
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
        if (!this[IMPL].targetFile.fileDir)
            throw new Error(`Target "${this.NAME}" is not defined`);
        return this[IMPL].targetFile.fileDir;
    }
    get FILE_NAME() {
        if (!this[IMPL].targetFile.fileName)
            throw new Error(`Target "${this.NAME}" is not defined`);
        return this[IMPL].targetFile.fileName;
    }
    get FILE() {
        if (!this[IMPL].targetFile.file)
            throw new Error(`Target "${this.NAME}" is not defined`);
        return this[IMPL].targetFile.file;
    }
    get POSITION_INDEPENDENT_CODE() {
        return this[POSITION_INDEPENDENT_CODE];
    }
    get IMPL() {
        return this[IMPL];
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
                it.OBJECT_FILE = this[TARGET_SCOPE].BINARY_DIR.join("MakeFiles", this[IMPL].name + ".dir", rfile + ".obj");
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
        this[IMPL].targetFile.prefix = (0,_utils_StrictType__WEBPACK_IMPORTED_MODULE_0__.ensureString)(prefix);
    }
    setSuffix(suffix) {
        this[IMPL].targetFile.suffix = (0,_utils_StrictType__WEBPACK_IMPORTED_MODULE_0__.ensureString)(suffix);
    }
    setOutputName(outputName) {
        this[IMPL].targetFile.outputName = (0,_utils_StrictType__WEBPACK_IMPORTED_MODULE_0__.ensureString)(outputName);
    }
    addDefinitions(...definitions) {
        for (const VALUE of (0,_core_DefinitionHelper__WEBPACK_IMPORTED_MODULE_9__.normalizeDefinitions)(...definitions))
            this[DEFINES].push({ VALUE });
    }
    addPreBuild(command, args) {
        this[IMPL].addPreBuild(command, args);
    }
    addPostBuild(command, args) {
        this[IMPL].addPostBuild(command, args);
    }
    get targetFile() {
        const targetFile = this[IMPL].targetFile;
        return _core_TargetStruct__WEBPACK_IMPORTED_MODULE_10__.LiveString.create(() => _core_Path__WEBPACK_IMPORTED_MODULE_7__.FilePath.create(targetFile.file).toString());
    }
    toJSON() {
        return {
            NAME: this.NAME,
            TARGET_SCOPE: this.TARGET_SCOPE,
            COMPILE_OPTIONS: this.COMPILE_OPTIONS,
            LINK_OPTIONS: this.LINK_OPTIONS,
            INCLUDES: this.INCLUDES,
            DEFINES: this.DEFINES,
            SOURCES: this.SOURCES,
            LIBRARIES: this.LIBRARIES,
            FILE_DIR: this.FILE_DIR,
            FILE: this.FILE,
        };
    }
}
;
class BaseLibrary extends BaseTarget {
    constructor(impl, scope, prefix, suffix) {
        super(impl, scope, prefix, suffix);
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
    constructor(impl, scope) {
        super(impl, scope, scope.OBJECT_LIBRARY_PREFIX, scope.OBJECT_LIBRARY_SUFFIX);
        this[IMPL].type = _core_TargetStruct__WEBPACK_IMPORTED_MODULE_10__.TargetType.ObjectLibrary;
        this.LINK_OPTIONS.push(...scope.OBJECT_LINKER_FLAGS.map((VALUE) => ({ VALUE })));
    }
    static create(impl, scope) {
        return Object.seal(new ObjectLibrary(impl, scope));
    }
}
;
class StaticLibrary extends BaseLibrary {
    constructor(impl, scope) {
        super(impl, scope, scope.STATIC_LIBRARY_PREFIX, scope.STATIC_LIBRARY_SUFFIX);
        this[IMPL].type = _core_TargetStruct__WEBPACK_IMPORTED_MODULE_10__.TargetType.StaticLibrary;
        this.LINK_OPTIONS.push(...scope.STATIC_LINKER_FLAGS.map((VALUE) => ({ VALUE })));
    }
    static create(impl, scope) {
        return Object.seal(new StaticLibrary(impl, scope));
    }
}
;
class SharedLibrary extends BaseLibrary {
    constructor(impl, scope) {
        super(impl, scope, scope.SHARED_LIBRARY_PREFIX, scope.SHARED_LIBRARY_SUFFIX);
        this[IMPL].type = _core_TargetStruct__WEBPACK_IMPORTED_MODULE_10__.TargetType.SharedLibrary;
        this.LINK_OPTIONS.push(...scope.SHARED_LINKER_FLAGS.map((VALUE) => ({ VALUE })));
    }
    static create(impl, scope) {
        return Object.seal(new SharedLibrary(impl, scope));
    }
}
class Executable extends BaseTarget {
    constructor(impl, scope) {
        super(impl, scope, "", scope.EXECUTABLE_SUFFIX);
        this[IMPL].type = _core_TargetStruct__WEBPACK_IMPORTED_MODULE_10__.TargetType.Executable;
        this.LINK_OPTIONS.push(...scope.EXE_LINKER_FLAGS.map((VALUE) => ({ VALUE })));
    }
    static create(impl, scope) {
        return Object.seal(new Executable(impl, scope));
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
/* harmony import */ var _core_IncludeDirectory__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! @/core/IncludeDirectory */ "./src/core/IncludeDirectory.ts");
/* harmony import */ var _core_InterfaceIncludes__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! @/core/InterfaceIncludes */ "./src/core/InterfaceIncludes.ts");
/* harmony import */ var _core_InterfaceTarget__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! @/core/InterfaceTarget */ "./src/core/InterfaceTarget.ts");
/* harmony import */ var _core_TargetStruct__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! @/core/TargetStruct */ "./src/core/TargetStruct.ts");
/* harmony import */ var _Constants__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! @/Constants */ "./src/Constants.ts");
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
    [ENTRIES];
    constructor() {
        this[ENTRIES] = new Map();
    }
    get(name) {
        if (typeof name !== "string")
            throw new Error(`Target "${name}" is not string type`);
        if ([_Constants__WEBPACK_IMPORTED_MODULE_4__.ALL_TARGET, _Constants__WEBPACK_IMPORTED_MODULE_4__.INSTALL_TARGET].includes(name))
            throw new Error(`Target "${name}" is reserved name`);
        let result = this[ENTRIES].get(name);
        if (!result) {
            result = new _core_TargetStruct__WEBPACK_IMPORTED_MODULE_3__.TargetStruct(name);
            this[ENTRIES].set(name, result);
        }
        return result;
    }
    toJSON() {
        const result = {};
        this[ENTRIES].forEach((v, k) => void (result[k] = v));
        return result;
    }
}
;
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
/* harmony import */ var _core_Path__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! @/core/Path */ "./src/core/Path.ts");
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
const PREFIX = Symbol("PREFIX");
const SUFFIX = Symbol("SUFFIX");
const OUTPUT_NAME = Symbol("OUTPUT_NAME");
const FILE_DIR = Symbol("FILE_DIR");
class TargetFile {
    [FILE_DIR];
    [PREFIX];
    [OUTPUT_NAME];
    [SUFFIX];
    constructor() {
    }
    static create() {
        return Object.seal(new TargetFile);
    }
    get outputName() {
        return this[OUTPUT_NAME];
    }
    set outputName(value) {
        this[OUTPUT_NAME] = value;
    }
    get prefix() {
        return this[PREFIX];
    }
    set prefix(value) {
        this[PREFIX] = value;
    }
    get suffix() {
        return this[SUFFIX];
    }
    set suffix(value) {
        this[SUFFIX] = value;
    }
    get fileName() {
        if (this[PREFIX] === undefined || this[OUTPUT_NAME] === undefined || this[SUFFIX] === undefined)
            return undefined;
        return this[PREFIX] + this[OUTPUT_NAME] + this[SUFFIX];
    }
    get fileDir() {
        return this[FILE_DIR];
    }
    set fileDir(value) {
        this[FILE_DIR] = value;
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
            SUFFIX: this[SUFFIX],
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
    else if (_command instanceof _core_Path__WEBPACK_IMPORTED_MODULE_0__.FilePath)
        command = _command.toString();
    else
        throw new TypeError(`Wrong type ${_command} for command`);
    const args = new Array;
    for (const iter of _args) {
        if (typeof iter === "string")
            args.push(iter);
        else if (iter instanceof LiveString)
            args.push(iter);
        else if (iter instanceof _core_Path__WEBPACK_IMPORTED_MODULE_0__.FilePath)
            args.push(iter.toString());
        else if (iter instanceof _core_Path__WEBPACK_IMPORTED_MODULE_0__.DirPath)
            args.push(iter.toString());
        else
            throw new TypeError(`Wrong type ${iter} for argument`);
    }
    return { command, args };
}
const NAME = Symbol("NAME");
const TYPE = Symbol("TYPE");
const TARGET_FILE = Symbol("TARGET_FILE");
const PRE_BUILD = Symbol("PRE_BUILD");
const POST_BUILD = Symbol("POST_BUILD");
class TargetStruct {
    [NAME];
    [TYPE];
    [TARGET_FILE];
    [PRE_BUILD] = new Array;
    [POST_BUILD] = new Array;
    constructor(name) {
        this[NAME] = name;
        this[TYPE] = TargetType.Unknown;
        this[TARGET_FILE] = TargetFile.create();
    }
    get name() {
        return this[NAME];
    }
    get type() {
        return this[TYPE];
    }
    set type(value) {
        if (this[TYPE] === value)
            return;
        if (this[TYPE] !== TargetType.Unknown)
            throw new Error(`${this[TYPE]} "${this[NAME]}" target cannot be change to ${value}`);
        this[TYPE] = value;
    }
    get targetFile() {
        return this[TARGET_FILE];
    }
    addPreBuild(command, args) {
        this[PRE_BUILD].push(makeTargetCommand(command, args));
    }
    addPostBuild(command, args) {
        this[POST_BUILD].push(makeTargetCommand(command, args));
    }
    get preBuildList() {
        return this[PRE_BUILD];
    }
    get postBuildList() {
        return this[POST_BUILD];
    }
    toJSON() {
        return {
            name: this.name,
            targetFile: this.targetFile,
            preBuildList: this.preBuildList,
            postBuildList: this.postBuildList,
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
const IMPL = Symbol("NAME");
const INCLUDES = Symbol("INCLUDES");
const SOURCES = Symbol("SOURCES");
const DEFINES = Symbol("DEFINES");
const COMPILE_OPTIONS = Symbol("COMPILE_OPTIONS");
const LINK_OPTIONS = Symbol("LINK_OPTIONS");
class UnknownTarget {
    [IMPL];
    [INCLUDES];
    [SOURCES];
    [DEFINES];
    [COMPILE_OPTIONS];
    [LINK_OPTIONS];
    constructor(impl) {
        this[IMPL] = impl;
        this[INCLUDES] = [];
        this[SOURCES] = [];
        this[DEFINES] = [];
        this[COMPILE_OPTIONS] = [];
        this[LINK_OPTIONS] = [];
    }
    static create(impl) {
        return Object.seal(new UnknownTarget(impl));
    }
    static ensureInstance(value) {
        if (value instanceof UnknownTarget)
            return value;
        throw new TypeError(`The "${value}" is not a UnknownTarget`);
    }
    get NAME() {
        return this[IMPL].name;
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
        return "${" + this[IMPL].name + "}";
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
                "User-Agent": "bitmake" + "/" + "0.0.1-develop.7",
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
    throw new TypeError(`The '${value}' is not a boolean`);
}
function ensureNumber(value) {
    if (typeof value === "number")
        return value;
    throw new TypeError(`The '${value}' is not a string`);
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
/* harmony import */ var _cmake__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! @/cmake */ "./src/cmake/index.ts");
/* harmony import */ var _utils_ChildProcess__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! @/utils/ChildProcess */ "./src/utils/ChildProcess.ts");
/* harmony import */ var _utils_HttpRequest__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! @/utils/HttpRequest */ "./src/utils/HttpRequest.ts");
/* harmony import */ var _commands__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! @/commands */ "./src/commands/index.ts");
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
    cmake: _cmake__WEBPACK_IMPORTED_MODULE_1__["default"],
    commands: _commands__WEBPACK_IMPORTED_MODULE_4__["default"],
    process: {
        spawn: _utils_ChildProcess__WEBPACK_IMPORTED_MODULE_2__.spawnAsync,
    },
    utils: {
        requestGet: _utils_HttpRequest__WEBPACK_IMPORTED_MODULE_3__.requestGet,
        downloadFile: _utils_HttpRequest__WEBPACK_IMPORTED_MODULE_3__.downloadFile,
    },
});

})();

__webpack_exports__ = __webpack_exports__["default"];
/******/ 	return __webpack_exports__;
/******/ })()
;
});
//# sourceMappingURL=data:application/json;charset=utf-8;base64,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LHVEQUF1RCxpQkFBaUI7V0FDeEU7V0FDQSxnREFBZ0QsYUFBYTtXQUM3RDs7Ozs7Ozs7Ozs7Ozs7Ozs7OztBQ05BOzs7Ozs7O0dBT0c7QUFFSCxvQ0FBb0M7QUFFUDtBQUNEO0FBRXNCO0FBQ2E7QUFDN0I7QUFFbEMsaUVBQWU7SUFDYixHQUFHO0lBQ0gsS0FBSztJQUNMLFFBQVE7SUFDUixPQUFPLEVBQUU7UUFDUCxLQUFLLEVBQUUsMkRBQVU7S0FDbEI7SUFDRCxLQUFLLEVBQUU7UUFDTCxVQUFVO1FBQ1YsWUFBWTtLQUNiO0NBQ0YsRUFBQyIsInNvdXJjZXMiOlsid2VicGFjazovL2JpdG1ha2Uvd2VicGFjay91bml2ZXJzYWxNb2R1bGVEZWZpbml0aW9uIiwid2VicGFjazovL2JpdG1ha2UvLi9zcmMvQ29uc3RhbnRzLnRzIiwid2VicGFjazovL2JpdG1ha2UvLi9zcmMvY21ha2UvQ29uc3RhbnRzLnRzIiwid2VicGFjazovL2JpdG1ha2UvLi9zcmMvY21ha2UvSGVscGVyLnRzIiwid2VicGFjazovL2JpdG1ha2UvLi9zcmMvY21ha2UvaW5kZXgudHMiLCJ3ZWJwYWNrOi8vYml0bWFrZS8uL3NyYy9jb21tYW5kcy9idWlsZC50cyIsIndlYnBhY2s6Ly9iaXRtYWtlLy4vc3JjL2NvbW1hbmRzL2luZGV4LnRzIiwid2VicGFjazovL2JpdG1ha2UvLi9zcmMvY29tbWFuZHMvaW5pdC50cyIsIndlYnBhY2s6Ly9iaXRtYWtlLy4vc3JjL2NvcmUvQml0TWFrZUFjdGlvbi50cyIsIndlYnBhY2s6Ly9iaXRtYWtlLy4vc3JjL2NvcmUvQnVpbGRpblNjcmlwdHMvY29uZmlndXJlX2ZpbGUudHMiLCJ3ZWJwYWNrOi8vYml0bWFrZS8uL3NyYy9jb3JlL0J1aWxkaW5TY3JpcHRzL2luc3RhbGxfc2NyaXB0LnRzIiwid2VicGFjazovL2JpdG1ha2UvLi9zcmMvY29yZS9DTWFrZUFjdGlvbi50cyIsIndlYnBhY2s6Ly9iaXRtYWtlLy4vc3JjL2NvcmUvQ29uZmlndXJlQWN0aW9uLnRzIiwid2VicGFjazovL2JpdG1ha2UvLi9zcmMvY29yZS9DdXN0b21TY3JpcHQudHMiLCJ3ZWJwYWNrOi8vYml0bWFrZS8uL3NyYy9jb3JlL0RlZmluaXRpb25IZWxwZXIudHMiLCJ3ZWJwYWNrOi8vYml0bWFrZS8uL3NyYy9jb3JlL0RldGVybWluZUNvbXBpbGVyLnRzIiwid2VicGFjazovL2JpdG1ha2UvLi9zcmMvY29yZS9GaW5kUHJvZ3JhbS50cyIsIndlYnBhY2s6Ly9iaXRtYWtlLy4vc3JjL2NvcmUvR2V0U2l6ZW9mVm9pZHAudHMiLCJ3ZWJwYWNrOi8vYml0bWFrZS8uL3NyYy9jb3JlL0dsb2JhbENvbnRleHQudHMiLCJ3ZWJwYWNrOi8vYml0bWFrZS8uL3NyYy9jb3JlL0dvYWxDb2xsZWN0aW9uLnRzIiwid2VicGFjazovL2JpdG1ha2UvLi9zcmMvY29yZS9JbmNsdWRlRGlyZWN0b3J5LnRzIiwid2VicGFjazovL2JpdG1ha2UvLi9zcmMvY29yZS9JbnN0YWxsRW50aXR5LnRzIiwid2VicGFjazovL2JpdG1ha2UvLi9zcmMvY29yZS9JbnRlcmZhY2VJbmNsdWRlcy50cyIsIndlYnBhY2s6Ly9iaXRtYWtlLy4vc3JjL2NvcmUvSW50ZXJmYWNlT2JqZWN0cy50cyIsIndlYnBhY2s6Ly9iaXRtYWtlLy4vc3JjL2NvcmUvSW50ZXJmYWNlU2NyaXB0LnRzIiwid2VicGFjazovL2JpdG1ha2UvLi9zcmMvY29yZS9JbnRlcmZhY2VUYXJnZXQudHMiLCJ3ZWJwYWNrOi8vYml0bWFrZS8uL3NyYy9jb3JlL01ha2VBY3Rpb24udHMiLCJ3ZWJwYWNrOi8vYml0bWFrZS8uL3NyYy9jb3JlL01ha2VDb250ZXh0LnRzIiwid2VicGFjazovL2JpdG1ha2UvLi9zcmMvY29yZS9QYXRoLnRzIiwid2VicGFjazovL2JpdG1ha2UvLi9zcmMvY29yZS9QbHVnaW5Db250ZXh0LnRzIiwid2VicGFjazovL2JpdG1ha2UvLi9zcmMvY29yZS9Qcm9jZXNzQWN0aW9uLnRzIiwid2VicGFjazovL2JpdG1ha2UvLi9zcmMvY29yZS9TY29wZS50cyIsIndlYnBhY2s6Ly9iaXRtYWtlLy4vc3JjL2NvcmUvU2NyaXB0Q29sbGVjdGlvbi50cyIsIndlYnBhY2s6Ly9iaXRtYWtlLy4vc3JjL2NvcmUvU2NyaXB0Q29udGV4dC50cyIsIndlYnBhY2s6Ly9iaXRtYWtlLy4vc3JjL2NvcmUvU291cmNlRmlsZS50cyIsIndlYnBhY2s6Ly9iaXRtYWtlLy4vc3JjL2NvcmUvU291cmNlRmlsZUxpc3QudHMiLCJ3ZWJwYWNrOi8vYml0bWFrZS8uL3NyYy9jb3JlL1N5c3RlbVZhcmlhYmxlcy50cyIsIndlYnBhY2s6Ly9iaXRtYWtlLy4vc3JjL2NvcmUvVGFyZ2V0LnRzIiwid2VicGFjazovL2JpdG1ha2UvLi9zcmMvY29yZS9UYXJnZXRDb2xsZWN0aW9uLnRzIiwid2VicGFjazovL2JpdG1ha2UvLi9zcmMvY29yZS9UYXJnZXRTdHJ1Y3QudHMiLCJ3ZWJwYWNrOi8vYml0bWFrZS8uL3NyYy9jb3JlL1Rvb2xjaGFpbkNvbnRleHQudHMiLCJ3ZWJwYWNrOi8vYml0bWFrZS8uL3NyYy9jb3JlL1R5cGVzLnRzIiwid2VicGFjazovL2JpdG1ha2UvLi9zcmMvY29yZS9Vbmtub3duVGFyZ2V0LnRzIiwid2VicGFjazovL2JpdG1ha2UvLi9zcmMvY3h4L2luZGV4LnRzIiwid2VicGFjazovL2JpdG1ha2UvLi9zcmMvbG9nZ2VyL2luZGV4LnRzIiwid2VicGFjazovL2JpdG1ha2UvLi9zcmMvdXRpbHMvQ2hpbGRQcm9jZXNzLnRzIiwid2VicGFjazovL2JpdG1ha2UvLi9zcmMvdXRpbHMvRmlsZVN5c3RlbS50cyIsIndlYnBhY2s6Ly9iaXRtYWtlLy4vc3JjL3V0aWxzL0h0dHBSZXF1ZXN0LnRzIiwid2VicGFjazovL2JpdG1ha2UvLi9zcmMvdXRpbHMvSW1wb3J0TW9kdWxlLm1qcyIsIndlYnBhY2s6Ly9iaXRtYWtlLy4vc3JjL3V0aWxzL01ha2VQYXRjaC50cyIsIndlYnBhY2s6Ly9iaXRtYWtlLy4vc3JjL3V0aWxzL01vZHVsZS50cyIsIndlYnBhY2s6Ly9iaXRtYWtlLy4vc3JjL3V0aWxzL1ByaW1pdGl2ZXMudHMiLCJ3ZWJwYWNrOi8vYml0bWFrZS8uL3NyYy91dGlscy9TZXR0aW5nc1N0b3JhZ2UudHMiLCJ3ZWJwYWNrOi8vYml0bWFrZS8uL3NyYy91dGlscy9TdHJpY3RUeXBlLnRzIiwid2VicGFjazovL2JpdG1ha2UvZXh0ZXJuYWwgbm9kZS1jb21tb25qcyBcImh0dHBcIiIsIndlYnBhY2s6Ly9iaXRtYWtlL2V4dGVybmFsIG5vZGUtY29tbW9uanMgXCJodHRwc1wiIiwid2VicGFjazovL2JpdG1ha2UvZXh0ZXJuYWwgbm9kZS1jb21tb25qcyBcIm5vZGU6Y2hpbGRfcHJvY2Vzc1wiIiwid2VicGFjazovL2JpdG1ha2UvZXh0ZXJuYWwgbm9kZS1jb21tb25qcyBcIm5vZGU6ZnNcIiIsIndlYnBhY2s6Ly9iaXRtYWtlL2V4dGVybmFsIG5vZGUtY29tbW9uanMgXCJub2RlOm9zXCIiLCJ3ZWJwYWNrOi8vYml0bWFrZS9leHRlcm5hbCBub2RlLWNvbW1vbmpzIFwibm9kZTpwYXRoXCIiLCJ3ZWJwYWNrOi8vYml0bWFrZS9leHRlcm5hbCBub2RlLWNvbW1vbmpzIFwibm9kZTp1cmxcIiIsIndlYnBhY2s6Ly9iaXRtYWtlL3dlYnBhY2svYm9vdHN0cmFwIiwid2VicGFjazovL2JpdG1ha2Uvd2VicGFjay9ydW50aW1lL2NvbXBhdCBnZXQgZGVmYXVsdCBleHBvcnQiLCJ3ZWJwYWNrOi8vYml0bWFrZS93ZWJwYWNrL3J1bnRpbWUvZGVmaW5lIHByb3BlcnR5IGdldHRlcnMiLCJ3ZWJwYWNrOi8vYml0bWFrZS93ZWJwYWNrL3J1bnRpbWUvaGFzT3duUHJvcGVydHkgc2hvcnRoYW5kIiwid2VicGFjazovL2JpdG1ha2Uvd2VicGFjay9ydW50aW1lL21ha2UgbmFtZXNwYWNlIG9iamVjdCIsIndlYnBhY2s6Ly9iaXRtYWtlLy4vc3JjL2luZGV4LnRzIl0sInNvdXJjZXNDb250ZW50IjpbIihmdW5jdGlvbiB3ZWJwYWNrVW5pdmVyc2FsTW9kdWxlRGVmaW5pdGlvbihyb290LCBmYWN0b3J5KSB7XG5cdGlmKHR5cGVvZiBleHBvcnRzID09PSAnb2JqZWN0JyAmJiB0eXBlb2YgbW9kdWxlID09PSAnb2JqZWN0Jylcblx0XHRtb2R1bGUuZXhwb3J0cyA9IGZhY3RvcnkoKTtcblx0ZWxzZSBpZih0eXBlb2YgZGVmaW5lID09PSAnZnVuY3Rpb24nICYmIGRlZmluZS5hbWQpXG5cdFx0ZGVmaW5lKFtdLCBmYWN0b3J5KTtcblx0ZWxzZSBpZih0eXBlb2YgZXhwb3J0cyA9PT0gJ29iamVjdCcpXG5cdFx0ZXhwb3J0c1tcImJpdG1ha2VcIl0gPSBmYWN0b3J5KCk7XG5cdGVsc2Vcblx0XHRyb290W1wiYml0bWFrZVwiXSA9IGZhY3RvcnkoKTtcbn0pKGdsb2JhbCwgKCkgPT4ge1xucmV0dXJuICIsIi8qXG4gKiBNSVQgTGljZW5zZVxuICpcbiAqIENvcHlyaWdodCAoYykgMjAyNSAgWXVyaWkgWWFrdWJpbiAoeXVyaWkueWFrdWJpbkBnbWFpbC5jb20pXG4gKlxuICogUGVybWlzc2lvbiBpcyBncmFudGVkIHRvIHVzZSwgY29weSwgbW9kaWZ5LCBhbmQgZGlzdHJpYnV0ZSB0aGlzIHNvZnR3YXJlXG4gKiB1bmRlciB0aGUgTUlUIExpY2Vuc2UuIFNlZSBMSUNFTlNFIGZpbGUgZm9yIGRldGFpbHMuXG4gKi9cblxuZXhwb3J0IGNvbnN0IFVTRVJfQ09ORklHID0gXCJiaXRtYWtlLmNvbmZpZy5tanNcIjtcbmV4cG9ydCBjb25zdCBSRVFVRVNUX0FUVEVNUFRTID0gMzA7XG5leHBvcnQgY29uc3QgQlVJTERfU0VUVElOR1NfRklMRSA9IFwiQnVpbGRTZXR0aW5ncy5qc29uXCI7XG5leHBvcnQgY29uc3QgQUxMX1RBUkdFVCA9IFwiYWxsXCI7XG5leHBvcnQgY29uc3QgSU5TVEFMTF9UQVJHRVQgPSBcImluc3RhbGxcIjtcbmV4cG9ydCBjb25zdCBQQUNLQUdFX0pTT04gPSBcInBhY2thZ2UuanNvblwiO1xuZXhwb3J0IGNvbnN0IE1BS0VfQ0FDSEUgPSBcIk1ha2VDYWNoZS5qc29uXCI7XG4iLCIvKlxuICogTUlUIExpY2Vuc2VcbiAqXG4gKiBDb3B5cmlnaHQgKGMpIDIwMjUgIFl1cmlpIFlha3ViaW4gKHl1cmlpLnlha3ViaW5AZ21haWwuY29tKVxuICpcbiAqIFBlcm1pc3Npb24gaXMgZ3JhbnRlZCB0byB1c2UsIGNvcHksIG1vZGlmeSwgYW5kIGRpc3RyaWJ1dGUgdGhpcyBzb2Z0d2FyZVxuICogdW5kZXIgdGhlIE1JVCBMaWNlbnNlLiBTZWUgTElDRU5TRSBmaWxlIGZvciBkZXRhaWxzLlxuICovXG5cbmV4cG9ydCBlbnVtIEJvb2xlYW5UeXBlIHtcbiAgT04gPSBcIk9OXCIsXG4gIE9GRiA9IFwiT0ZGXCIsXG59O1xuXG4vLyBFbnVtIHJlcHJlc2VudGluZyB2YWx1ZSB0eXBlcyB1c2VkIGluIENNYWtlIGNhY2hlIHZhcmlhYmxlc1xuZXhwb3J0IGVudW0gVmFsdWVUeXBlIHtcbiAgLy8gUmVwcmVzZW50cyBhIGZ1bGwgcGF0aCB0byBhIGZpbGVcbiAgRklMRVBBVEggPSBcIkZJTEVQQVRIXCIsXG5cbiAgLy8gUmVwcmVzZW50cyBhIHBhdGggdG8gYSBkaXJlY3RvcnlcbiAgUEFUSCA9IFwiUEFUSFwiLFxuXG4gIC8vIFJlcHJlc2VudHMgYSBib29sZWFuIHZhbHVlICh0cnVlL2ZhbHNlKVxuICBCT09MID0gXCJCT09MXCIsXG5cbiAgLy8gUmVwcmVzZW50cyBhIGdlbmVyaWMgc3RyaW5nIHZhbHVlXG4gIFNUUklORyA9IFwiU1RSSU5HXCIsXG59O1xuXG4vLyBCdWlsZFR5cGUgcmVwcmVzZW50aW5nIGNvbW1vbiBDTWFrZSBidWlsZCB0eXBlc1xuZXhwb3J0IGVudW0gQnVpbGRUeXBlIHtcbiAgLy8gRGVidWcgYnVpbGQgdHlwZTogaW5jbHVkZXMgZGVidWcgc3ltYm9scywgbm8gb3B0aW1pemF0aW9uXG4gIERlYnVnID0gXCJEZWJ1Z1wiLFxuXG4gIC8vIFJlbGVhc2UgYnVpbGQgdHlwZTogb3B0aW1pemVkIGNvZGUsIG5vIGRlYnVnIGluZm9cbiAgUmVsZWFzZSA9IFwiUmVsZWFzZVwiLFxuXG4gIC8vIFJlbGVhc2Ugd2l0aCBkZWJ1ZyBpbmZvOiBvcHRpbWl6ZWQgd2l0aCBkZWJ1ZyBzeW1ib2xzIGluY2x1ZGVkXG4gIFJlbFdpdGhEZWJJbmZvID0gXCJSZWxXaXRoRGViSW5mb1wiLFxuXG4gIC8vIE1pbmltdW0gc2l6ZSByZWxlYXNlOiBvcHRpbWl6ZWQgZm9yIHNtYWxsZXN0IGJpbmFyeSBzaXplXG4gIE1pblNpemVSZWwgPSBcIk1pblNpemVSZWxcIixcbn07XG5cbi8vIFRoZSBkZWZhdWx0IG5hbWUgb2YgdGhlIG1haW4gQ01ha2UgYnVpbGQgY29uZmlndXJhdGlvbiBmaWxlXG5leHBvcnQgY29uc3QgQ01BS0VfTElTVFNfVFhUID0gXCJDTWFrZUxpc3RzLnR4dFwiO1xuXG5leHBvcnQgZW51bSBHZW5lcmF0b3JUeXBlIHtcbiAgLy8gTmFtZSBvZiB0aGUgQ01ha2UgZ2VuZXJhdG9yIGZvciBzdGFuZGFyZCBVbml4ICdtYWtlJyBidWlsZCBzeXN0ZW1cbiAgVW5peE1ha2VmaWxlcyA9IFwiVW5peCBNYWtlZmlsZXNcIixcbn07XG5cbi8vIE5hbWUgb2YgdGhlIENNYWtlIGdlbmVyYXRvciBmb3Igc3RhbmRhcmQgVW5peCAnbWFrZScgYnVpbGQgc3lzdGVtXG5leHBvcnQgY29uc3QgREVGQVVMVF9HRU5FUkFUT1I6IEdlbmVyYXRvclR5cGUgPSBHZW5lcmF0b3JUeXBlLlVuaXhNYWtlZmlsZXM7XG4iLCIvKlxuICogTUlUIExpY2Vuc2VcbiAqXG4gKiBDb3B5cmlnaHQgKGMpIDIwMjUgIFl1cmlpIFlha3ViaW4gKHl1cmlpLnlha3ViaW5AZ21haWwuY29tKVxuICpcbiAqIFBlcm1pc3Npb24gaXMgZ3JhbnRlZCB0byB1c2UsIGNvcHksIG1vZGlmeSwgYW5kIGRpc3RyaWJ1dGUgdGhpcyBzb2Z0d2FyZVxuICogdW5kZXIgdGhlIE1JVCBMaWNlbnNlLiBTZWUgTElDRU5TRSBmaWxlIGZvciBkZXRhaWxzLlxuICovXG5cbmltcG9ydCB7IEJvb2xlYW5UeXBlIH0gZnJvbSBcIkAvY21ha2UvQ29uc3RhbnRzXCI7XG5cbmV4cG9ydCBmdW5jdGlvbiBjb252ZXJ0VG9WYWx1ZShvYmo6IGFueSk6IHN0cmluZyB7XG4gIGlmIChBcnJheS5pc0FycmF5KG9iaikpXG4gICAgcmV0dXJuIG9iai5tYXAoaSA9PiBjb252ZXJ0VG9WYWx1ZShpKSkuam9pbihcIjtcIik7XG5cbiAgaWYgKHR5cGVvZiBvYmogPT09IFwiYm9vbGVhblwiKVxuICAgIHJldHVybiBvYmogPyBCb29sZWFuVHlwZS5PTiA6IEJvb2xlYW5UeXBlLk9GRjtcblxuICByZXR1cm4gb2JqLnRvU3RyaW5nKCk7XG59XG4iLCIvKlxuICogTUlUIExpY2Vuc2VcbiAqXG4gKiBDb3B5cmlnaHQgKGMpIDIwMjUgIFl1cmlpIFlha3ViaW4gKHl1cmlpLnlha3ViaW5AZ21haWwuY29tKVxuICpcbiAqIFBlcm1pc3Npb24gaXMgZ3JhbnRlZCB0byB1c2UsIGNvcHksIG1vZGlmeSwgYW5kIGRpc3RyaWJ1dGUgdGhpcyBzb2Z0d2FyZVxuICogdW5kZXIgdGhlIE1JVCBMaWNlbnNlLiBTZWUgTElDRU5TRSBmaWxlIGZvciBkZXRhaWxzLlxuICovXG5cbmltcG9ydCBvcyBmcm9tIFwibm9kZTpvc1wiO1xuaW1wb3J0IGZzIGZyb20gXCJub2RlOmZzXCI7XG5pbXBvcnQgcGF0aCBmcm9tIFwibm9kZTpwYXRoXCI7XG5cbmltcG9ydCB7IHNwYXduQXN5bmMgfSBmcm9tIFwiQC91dGlscy9DaGlsZFByb2Nlc3NcIjtcbmltcG9ydCB7IENNQUtFX0xJU1RTX1RYVCwgREVGQVVMVF9HRU5FUkFUT1IsIFZhbHVlVHlwZSB9IGZyb20gXCJAL2NtYWtlL0NvbnN0YW50c1wiO1xuaW1wb3J0IHsgY29udmVydFRvVmFsdWUgfSBmcm9tIFwiQC9jbWFrZS9IZWxwZXJcIjtcblxuZnVuY3Rpb24gdG9WYXJUeXBlKGtleTogc3RyaW5nLCB2YWw6IGFueSkge1xuICBjb25zdCBtYXA6IGFueSA9IHtcbiAgICBDTUFLRV9JTlNUQUxMX1BSRUZJWDogVmFsdWVUeXBlLlBBVEgsXG4gICAgQ01BS0VfVE9PTENIQUlOX0ZJTEU6IFZhbHVlVHlwZS5GSUxFUEFUSCxcbiAgfTtcblxuICBpZiAodHlwZW9mIHZhbCA9PT0gXCJib29sZWFuXCIpXG4gICAgcmV0dXJuIFZhbHVlVHlwZS5CT09MO1xuXG4gIGlmIChtYXAuaGFzT3duUHJvcGVydHkoa2V5KSlcbiAgICByZXR1cm4gbWFwW2tleV07XG5cbiAgcmV0dXJuIFZhbHVlVHlwZS5TVFJJTkc7XG59XG5cbmZ1bmN0aW9uIG1ha2VDbWRWYXJpYWJsZShrZXk6IHN0cmluZywgdmFsOiBhbnksIGlzQ2FjaGU6IGJvb2xlYW4pIHtcbiAgbGV0IG5hbWUgPSBrZXk7XG4gIGlmIChpc0NhY2hlKVxuICAgIG5hbWUgKz0gXCI6XCIgKyB0b1ZhclR5cGUoa2V5LCB2YWwpO1xuICByZXR1cm4gbmFtZSArIFwiPVwiICsgY29udmVydFRvVmFsdWUodmFsKTtcbn1cblxuZnVuY3Rpb24gbWFrZUNtZFZhcmlhYmxlcyh2YXJpYWJsZXM6IG9iamVjdCwgaXNDYWNoZTogYm9vbGVhbik6IHN0cmluZ1tdIHtcbiAgY29uc3QgcmVzdWx0OiBzdHJpbmdbXSA9IFtdO1xuICBmb3IgKGNvbnN0IFtrZXksIHZhbF0gb2YgT2JqZWN0LmVudHJpZXModmFyaWFibGVzKSlcbiAgICByZXN1bHQucHVzaChcIi1EXCIsIG1ha2VDbWRWYXJpYWJsZShrZXksIHZhbCwgaXNDYWNoZSkpO1xuICByZXR1cm4gcmVzdWx0O1xufVxuXG5pbnRlcmZhY2UgU2NyaXB0TW9kZU9wdGlvbnMge1xuICBlbnZpcm9ubWVudD86IG9iamVjdDtcbiAgd29ya0Rpcj86IHN0cmluZztcbn07XG5cbmV4cG9ydCBhc3luYyBmdW5jdGlvbiBzY3JpcHRNb2RlKHNjcmlwdEZpbGU6IHN0cmluZywgdmFyaWFibGVzOiBvYmplY3QsIG9wdGlvbnM/OiBTY3JpcHRNb2RlT3B0aW9ucykge1xuICBjb25zdCBzcGF3bkFyZ3MgPSBbXG4gICAgLi4ubWFrZUNtZFZhcmlhYmxlcyh2YXJpYWJsZXMsIGZhbHNlKSxcbiAgICBcIi1QXCIsIHNjcmlwdEZpbGUsXG4gIF07XG4gIGNvbnN0IHJlczogYW55ID0gYXdhaXQgc3Bhd25Bc3luYyhcImNtYWtlXCIsIHNwYXduQXJncywge1xuICAgIGN3ZDogb3B0aW9ucz8ud29ya0RpcixcbiAgICBlbnY6IG9wdGlvbnM/LmVudmlyb25tZW50IHx8IHByb2Nlc3MuZW52LFxuICB9KTtcbiAgaWYgKHJlcy5zdGF0dXMgIT09IDApIHtcbiAgICB0aHJvdyBgY21ha2Uuc2NyaXB0TW9kZSByZXR1cm5lZCBzdGF0dXMgJHtyZXMuc3RhdHVzfWA7XG4gIH1cbn1cblxuZXhwb3J0IGFzeW5jIGZ1bmN0aW9uIGNvbmZpZ3VyZShhcmdzOiBhbnkpIHtcbiAgY29uc3Qgc3Bhd25BcmdzID0gW1xuICAgIFwiLUdcIiwgYXJncy5nZW5lcmF0b3IsXG4gICAgLi4ubWFrZUNtZFZhcmlhYmxlcyhhcmdzLmNhY2hlVmFyaWFibGVzLCB0cnVlKSxcbiAgICBcIi1TXCIsIGFyZ3Muc291cmNlRGlyLFxuICAgIFwiLUJcIiwgYXJncy5iaW5hcnlEaXIsXG4gIF07XG5cbiAgY29uc3QgcmVzOiBhbnkgPSBhd2FpdCBzcGF3bkFzeW5jKFwiY21ha2VcIiwgc3Bhd25BcmdzLCB7XG4gICAgY3dkOiBhcmdzLmJpbmFyeURpcixcbiAgICBlbnY6IGFyZ3MuZW52aXJvbm1lbnQgfHwgcHJvY2Vzcy5lbnYsXG4gICAgZXh0cmE6IHtcbiAgICAgIG91dHB1dDogYGNtYWtlLmNvbmZpZ3VyZS5sb2dgLFxuICAgIH0sXG4gIH0pO1xuICBpZiAocmVzLnN0YXR1cyAhPT0gMCkge1xuICAgIHRocm93IGBDTWFrZS5jb25maWd1cmUgcmV0dXJuZWQgc3RhdHVzICR7cmVzLnN0YXR1c31gO1xuICB9XG59XG5cbmV4cG9ydCBhc3luYyBmdW5jdGlvbiBidWlsZChhcmdzOiBhbnkpIHtcbiAgYXdhaXQgY29uZmlndXJlKGFyZ3MpO1xuXG4gIGNvbnN0IHNwYXduQXJnczogc3RyaW5nW10gPSBbXG4gICAgJy0tYnVpbGQnLCAnLicsXG4gICAgJy0tcGFyYWxsZWwnLCBvcy5hdmFpbGFibGVQYXJhbGxlbGlzbSgpLnRvU3RyaW5nKCksXG4gIF07XG4gIGNvbnN0IHJlczogYW55ID0gYXdhaXQgc3Bhd25Bc3luYyhcImNtYWtlXCIsIHNwYXduQXJncywge1xuICAgIGN3ZDogYXJncy5iaW5hcnlEaXIsXG4gICAgZW52OiBhcmdzLmVudmlyb25tZW50IHx8IHByb2Nlc3MuZW52LFxuICAgIGV4dHJhOiB7XG4gICAgICBvdXRwdXQ6IGBjbWFrZS5idWlsZC5sb2dgLFxuICAgIH0sXG4gIH0pO1xuICBpZiAocmVzLnN0YXR1cyAhPT0gMCkge1xuICAgIHRocm93IGBDTWFrZS5idWlsZCByZXR1cm5lZCBzdGF0dXMgJHtyZXMuc3RhdHVzfWA7XG4gIH1cbn1cblxuZXhwb3J0IGFzeW5jIGZ1bmN0aW9uIGluc3RhbGwoYXJnczogYW55KSB7XG4gIGF3YWl0IGNvbmZpZ3VyZShhcmdzKTtcblxuICBjb25zdCBzcGF3bkFyZ3MgPSBbXG4gICAgJy0taW5zdGFsbCcsXG4gICAgJy4nLFxuICBdO1xuICBpZiAoYXJncy5pbnN0YWxsRGlyKSB7XG4gICAgc3Bhd25BcmdzLnB1c2goJy0tcHJlZml4JywgYXJncy5pbnN0YWxsRGlyKTtcbiAgfVxuICBjb25zdCByZXM6IGFueSA9IGF3YWl0IHNwYXduQXN5bmMoXCJjbWFrZVwiLCBzcGF3bkFyZ3MsIHtcbiAgICBjd2Q6IGFyZ3MuYmluYXJ5RGlyLFxuICAgIGVudjogYXJncy5lbnZpcm9ubWVudCB8fCBwcm9jZXNzLmVudixcbiAgICBleHRyYToge1xuICAgICAgb3V0cHV0OiBgY21ha2UuaW5zdGFsbC5sb2dgLFxuICAgIH0sXG4gIH0pO1xuICBpZiAocmVzLnN0YXR1cyAhPT0gMCkge1xuICAgIHRocm93IGBDTWFrZS5pbnN0YWxsIHJldHVybmVkIHN0YXR1cyAke3Jlcy5zdGF0dXN9YDtcbiAgfVxufVxuXG5leHBvcnQgYXN5bmMgZnVuY3Rpb24gY3Rlc3QoYXJnczogYW55KSB7XG4gIGF3YWl0IGJ1aWxkKGFyZ3MpO1xuXG4gIGNvbnN0IHNwYXduQXJnczogc3RyaW5nW10gPSBbXTtcbiAgY29uc3QgcmVzOiBhbnkgPSBhd2FpdCBzcGF3bkFzeW5jKFwiY3Rlc3RcIiwgc3Bhd25BcmdzLCB7XG4gICAgY3dkOiBhcmdzLmJpbmFyeURpcixcbiAgICBlbnY6IGFyZ3MuZW52aXJvbm1lbnQgfHwgcHJvY2Vzcy5lbnYsXG4gICAgZXh0cmE6IHtcbiAgICAgIG91dHB1dDogYGNtYWtlLmN0ZXN0LmxvZ2AsXG4gICAgfSxcbiAgfSk7XG4gIGlmIChyZXMuc3RhdHVzICE9PSAwKSB7XG4gICAgdGhyb3cgYENUZXN0IHJldHVybmVkIHN0YXR1cyAke3Jlcy5zdGF0dXN9YDtcbiAgfVxufVxuXG5leHBvcnQgYXN5bmMgZnVuY3Rpb24gZXh0cmFjdChhcmdzOiBhbnkpIHtcbiAgY29uc3Qgc3Bhd25BcmdzID0gWyBcIi1FXCIsIFwidGFyXCIsIFwiLXh2ZlwiLCBhcmdzLmZpbGVuYW1lIF07XG4gIGNvbnN0IHJlczogYW55ID0gYXdhaXQgc3Bhd25Bc3luYyhcImNtYWtlXCIsIHNwYXduQXJncywge1xuICAgIGN3ZDogYXJncy53b3JrRGlyIHx8IGFyZ3Muc291cmNlRGlyIHx8IGFyZ3MuYmluYXJ5RGlyLFxuICAgIGVudjogYXJncy5lbnZpcm9ubWVudCB8fCBwcm9jZXNzLmVudixcbiAgICBleHRyYToge1xuICAgICAgb3V0cHV0OiBhcmdzLmxvZ0ZpbGUgfHwgYGNtYWtlLmV4dHJhY3QubG9nYCxcbiAgICB9LFxuICB9KTtcbiAgaWYgKHJlcy5zdGF0dXMgIT09IDApIHtcbiAgICB0aHJvdyBgRXh0cmFjdCByZXR1cm5lZCBzdGF0dXMgJHtyZXMuc3RhdHVzfWA7XG4gIH1cbn1cblxuZXhwb3J0IGFzeW5jIGZ1bmN0aW9uIGdldFByb2plY3RJbmZvKHNvdXJjZTogc3RyaW5nKSB7XG4gIGNvbnN0IHN0YXQgPSBhd2FpdCBmcy5wcm9taXNlcy5zdGF0KHNvdXJjZSk7XG4gIGlmIChzdGF0LmlzRGlyZWN0b3J5KCkpXG4gICAgc291cmNlID0gcGF0aC5yZXNvbHZlKHNvdXJjZSwgQ01BS0VfTElTVFNfVFhUKTtcbiAgY29uc3QgY29udGVudCA9IGF3YWl0IGZzLnByb21pc2VzLnJlYWRGaWxlKHNvdXJjZSwgeyBlbmNvZGluZzogJ3V0ZjgnIH0pO1xuXG4gIGNvbnN0IHByb2plY3RQYXR0ZXJuID0gL3Byb2plY3QgKlxcKCAqKFteIF0rKSAqKFteKV0qKVxcKS87XG4gIGNvbnN0IHZlcnNpb25QYXR0ZXJuID0gL1ZFUlNJT04gKyhbXiBdKykvO1xuXG4gIGNvbnN0IHJlc3VsdDogYW55ID0ge307XG4gIGxldCBtYXRjaCA9IGNvbnRlbnQubWF0Y2gocHJvamVjdFBhdHRlcm4pO1xuICBpZiAobWF0Y2gpIHtcbiAgICByZXN1bHQubmFtZSA9IG1hdGNoWzFdO1xuICAgIGNvbnN0IHByb2plY3RDb250ZW50ID0gbWF0Y2hbMl07XG4gICAgbWF0Y2ggPSBwcm9qZWN0Q29udGVudC5tYXRjaCh2ZXJzaW9uUGF0dGVybik7XG4gICAgaWYgKG1hdGNoKVxuICAgICAgcmVzdWx0LnZlcnNpb24gPSBtYXRjaFsxXTtcbiAgfVxuXG4gIHJldHVybiByZXN1bHQ7XG59XG5cbmV4cG9ydCBmdW5jdGlvbiBsaW5lVG9TaW5nbENvbW1lbnQobGluZTogc3RyaW5nKSB7XG4gIHJldHVybiBcIiMgXCIgKyBsaW5lO1xufVxuXG5leHBvcnQgZnVuY3Rpb24gbGluZVRvTXVsdGlwbGVDb21tZW50KGxpbmU6IHN0cmluZykge1xuICByZXR1cm4gYCNbPT09WyAke2xpbmV9IF09PT1dYDtcbn1cblxuZXhwb3J0IGZ1bmN0aW9uIGdlbmVyYXRlZFNjcmlwdE5hbWVDb21tZW50KGZpbGVuYW1lOiBzdHJpbmcpIHtcbiAgcmV0dXJuIGxpbmVUb1NpbmdsQ29tbWVudChcIkdlbmVyYXRlZCBmcm9tIFwiICsgcGF0aC5iYXNlbmFtZShmaWxlbmFtZSkpO1xufVxuXG5leHBvcnQgZGVmYXVsdCB7XG4gIERFRkFVTFRfR0VORVJBVE9SLFxuICBzY3JpcHRNb2RlLFxuICBjb25maWd1cmUsXG4gIGJ1aWxkLFxuICBpbnN0YWxsLFxuICBjdGVzdCxcbiAgZXh0cmFjdCxcbn07XG4iLCIvKlxuICogTUlUIExpY2Vuc2VcbiAqXG4gKiBDb3B5cmlnaHQgKGMpIDIwMjUgIFl1cmlpIFlha3ViaW4gKHl1cmlpLnlha3ViaW5AZ21haWwuY29tKVxuICpcbiAqIFBlcm1pc3Npb24gaXMgZ3JhbnRlZCB0byB1c2UsIGNvcHksIG1vZGlmeSwgYW5kIGRpc3RyaWJ1dGUgdGhpcyBzb2Z0d2FyZVxuICogdW5kZXIgdGhlIE1JVCBMaWNlbnNlLiBTZWUgTElDRU5TRSBmaWxlIGZvciBkZXRhaWxzLlxuICovXG5cbmltcG9ydCBmcyBmcm9tIFwibm9kZTpmc1wiO1xuaW1wb3J0IHBhdGggZnJvbSBcIm5vZGU6cGF0aFwiO1xuaW1wb3J0IHVybCBmcm9tIFwibm9kZTp1cmxcIjtcblxuaW1wb3J0IGNtYWtlICBmcm9tIFwiQC9jbWFrZVwiO1xuaW1wb3J0IHsgbWFrZVBhdGNoIH0gZnJvbSBcIkAvdXRpbHMvTWFrZVBhdGNoXCI7XG5pbXBvcnQgeyBzYXZlSWZEaWZmZXJlbnQsIGRpcmVjdG9yeUV4aXN0cyB9IGZyb20gXCJAL3V0aWxzL0ZpbGVTeXN0ZW1cIjtcbmltcG9ydCB7IFNldHRpbmdzU3RvcmFnZSB9IGZyb20gXCJAL3V0aWxzL1NldHRpbmdzU3RvcmFnZVwiO1xuaW1wb3J0IHsgYXJyYXlXcmFwcGVyLCBhc3NpZ25PYmplY3QgfSBmcm9tIFwiQC91dGlscy9QcmltaXRpdmVzXCI7XG5pbXBvcnQgeyBVU0VSX0NPTkZJRywgQlVJTERfU0VUVElOR1NfRklMRSwgUkVRVUVTVF9BVFRFTVBUUyB9IGZyb20gXCJAL0NvbnN0YW50c1wiO1xuaW1wb3J0IHsgREVCVUdfQlVJTERfVFlQRSwgUkVMRUFTRV9CVUlMRF9UWVBFIH0gZnJvbSBcIkAvY29yZS9UeXBlc1wiO1xuaW1wb3J0IHsgcmVxdWlyZVJlc29sdmUgfSBmcm9tIFwiQC91dGlscy9Nb2R1bGVcIjtcbmltcG9ydCB7IGRvd25sb2FkRmlsZSB9IGZyb20gXCJAL3V0aWxzL0h0dHBSZXF1ZXN0XCI7XG5pbXBvcnQgeyBDb21tYW5kT3B0aW9ucyB9IGZyb20gXCJAL2NvcmUvQ29tbWFuZE9wdGlvbnNcIjtcbmltcG9ydCB7IGNyZWF0ZUxvZ2dlciB9IGZyb20gXCJAL2xvZ2dlclwiO1xuaW1wb3J0IHsgZmlsZUV4aXN0cyB9IGZyb20gXCJAL3V0aWxzL0ZpbGVTeXN0ZW1cIjtcbmltcG9ydCB7IGltcG9ydE1vZHVsZSB9IGZyb20gXCJAL3V0aWxzL01vZHVsZVwiO1xuXG5pbXBvcnQgeyBiaXRtYWtlQWN0aW9uIH0gZnJvbSBcIkAvY29yZS9CaXRNYWtlQWN0aW9uXCI7XG5pbXBvcnQgeyBjbWFrZUFjdGlvbiB9IGZyb20gXCJAL2NvcmUvQ01ha2VBY3Rpb25cIjtcbmltcG9ydCB7IG1ha2VBY3Rpb24gfSBmcm9tIFwiQC9jb3JlL01ha2VBY3Rpb25cIjtcbmltcG9ydCB7IHByb2Nlc3NBY3Rpb24gfSBmcm9tIFwiQC9jb3JlL1Byb2Nlc3NBY3Rpb25cIjtcbmltcG9ydCB7IGNvbmZpZ3VyZUFjdGlvbiB9IGZyb20gXCJAL2NvcmUvQ29uZmlndXJlQWN0aW9uXCI7XG5cbmNvbnN0IGxvZ2dlciA9IGNyZWF0ZUxvZ2dlcihpbXBvcnQubWV0YS51cmwpO1xuXG5pbnRlcmZhY2UgSUdlbmVyYWxDb25maWcge1xuICB3b3JrRGlyOiBzdHJpbmc7XG4gIGJ1aWxkVHlwZTogc3RyaW5nO1xufTtcblxuZnVuY3Rpb24gbWVyZ2VFbnZpcm9ubWVudCguLi5hcmdzOiBhbnkpIHtcbiAgY29uc3QgZW52aXJvbm1lbnQ6IGFueSA9IHt9O1xuICBmb3IgKGNvbnN0IGVudiBvZiBhcmdzKSB7XG4gICAgY29uc3QgbGlzdDogYW55ID0gT2JqZWN0LmVudHJpZXMoZW52IHx8IHt9KTtcbiAgICB3aGlsZSAobGlzdC5sZW5ndGgpIHtcbiAgICAgIGxldCBba2V5LHZhbF0gPSBsaXN0LnBvcCgpO1xuICAgICAgbGV0IGRlbGltaXRlcjtcbiAgICAgIGxldCBqb2luQWZ0ZXIgPSB0cnVlO1xuICAgICAgc3dpdGNoIChrZXkpIHtcbiAgICAgIGNhc2UgXCJQQVRIXCI6XG4gICAgICAgIGRlbGltaXRlciA9IHBhdGguZGVsaW1pdGVyO1xuICAgICAgICBqb2luQWZ0ZXIgPSBmYWxzZTtcbiAgICAgICAgYnJlYWs7XG4gICAgICBjYXNlIFwiQ0ZMQUdTXCI6XG4gICAgICBjYXNlIFwiQ1hYRkxBR1NcIjpcbiAgICAgIGNhc2UgXCJMREZMQUdTXCI6XG4gICAgICAgIGRlbGltaXRlciA9IFwiIFwiO1xuICAgICAgICBicmVhaztcbiAgICAgIH1cbiAgICAgIGlmICh0eXBlb2YgdmFsID09PSAnbnVtYmVyJylcbiAgICAgICAgdmFsID0gdmFsLnRvU3RyaW5nKCk7XG4gICAgICBlbHNlIGlmIChBcnJheS5pc0FycmF5KHZhbCkpXG4gICAgICAgIHZhbCA9IHZhbC5qb2luKGRlbGltaXRlcik7XG4gICAgICBpZiAoIWRlbGltaXRlciB8fCAhZW52aXJvbm1lbnRba2V5XSlcbiAgICAgICAgZW52aXJvbm1lbnRba2V5XSA9IHZhbDtcbiAgICAgIGVsc2UgaWYgKGpvaW5BZnRlcilcbiAgICAgICAgZW52aXJvbm1lbnRba2V5XSA9IHZhbCArIGRlbGltaXRlciArIGVudmlyb25tZW50W2tleV07XG4gICAgICBlbHNlXG4gICAgICAgIGVudmlyb25tZW50W2tleV0gPSBlbnZpcm9ubWVudFtrZXldICsgZGVsaW1pdGVyICsgdmFsO1xuICAgIH1cbiAgfVxuICByZXR1cm4gZW52aXJvbm1lbnQ7XG59XG5cbmZ1bmN0aW9uIHJlYmFzZUNvbmZpZyhjb25maWc6IGFueSkge1xuICBjb25zdCBiYXNlQ29uZmlnOiBhbnkgPSB7fTtcbiAgY29uc3Qgb3RoZXJDb25maWc6IGFueSA9IHt9O1xuXG4gIGZvciAoY29uc3QgW2tleSwgZW50cnldIG9mIE9iamVjdC5lbnRyaWVzKGNvbmZpZykgYXMgYW55KSB7XG4gICAgKGVudHJ5LmJhc2UgPyBvdGhlckNvbmZpZyA6IGJhc2VDb25maWcpW2tleV0gPSBlbnRyeTtcbiAgfVxuXG4gIHdoaWxlICh0cnVlKSB7XG4gICAgY29uc3Qga2V5cyA9IE9iamVjdC5rZXlzKG90aGVyQ29uZmlnKTtcbiAgICBpZiAoa2V5cy5sZW5ndGggPT0gMClcbiAgICAgIGJyZWFrO1xuICAgIGNvbnN0IGRvbmVLZXlzID0gW107XG4gICAgZm9yIChjb25zdCBrZXkgb2Yga2V5cykge1xuICAgICAgY29uc3Qgb3RoZXJJdGVyID0gb3RoZXJDb25maWdba2V5XTtcbiAgICAgIGNvbnN0IGJhc2VMaXN0ID0gW107XG4gICAgICBmb3IgKGNvbnN0IGl0ZXIgb2YgYXJyYXlXcmFwcGVyKG90aGVySXRlci5iYXNlKSkge1xuICAgICAgICBjb25zdCBiYXNlRW50cnkgPSBiYXNlQ29uZmlnW2l0ZXJdO1xuICAgICAgICBpZiAoIWJhc2VFbnRyeSkge1xuICAgICAgICAgIGJhc2VMaXN0Lmxlbmd0aCA9IDA7XG4gICAgICAgICAgYnJlYWs7XG4gICAgICAgIH1cbiAgICAgICAgYmFzZUxpc3QucHVzaChiYXNlRW50cnkpO1xuICAgICAgfVxuICAgICAgaWYgKGJhc2VMaXN0Lmxlbmd0aCkge1xuICAgICAgICBiYXNlTGlzdC5wdXNoKG90aGVySXRlcik7XG4gICAgICAgIGxldCBuZXdFbnRyeSA9IHt9O1xuICAgICAgICBmb3IgKGNvbnN0IGl0ZXIgb2YgYmFzZUxpc3QpIHtcbiAgICAgICAgICBhc3NpZ25PYmplY3QobmV3RW50cnksIGl0ZXIpO1xuICAgICAgICB9XG4gICAgICAgIGJhc2VDb25maWdba2V5XSA9IG5ld0VudHJ5O1xuICAgICAgICBkb25lS2V5cy5wdXNoKGtleSk7XG4gICAgICB9XG4gICAgfVxuICAgIGlmIChkb25lS2V5cy5sZW5ndGggPT0gMCkge1xuICAgICAgZm9yIChjb25zdCBrZXkgb2Yga2V5cylcbiAgICAgICAgdGhyb3cgYENhbid0IHNldCBiYXNlIGNvbmZpZyBmb3IgXCIke2tleX1gO1xuICAgIH1cbiAgICBmb3IgKGNvbnN0IGtleSBvZiBkb25lS2V5cykge1xuICAgICAgZGVsZXRlIGJhc2VDb25maWdba2V5XS5iYXNlO1xuICAgICAgZGVsZXRlIG90aGVyQ29uZmlnW2tleV07XG4gICAgfVxuICB9XG5cbiAgcmV0dXJuIGJhc2VDb25maWc7XG59XG5cbmZ1bmN0aW9uIHJlc29sdmVTdHJpbmdXaXRoVmFyaWFibGUoY29uZmlnOiBhbnksIGVudHJ5Q29uZmlnOiBhbnksIHJvb3RDb25maWc6IGFueSwgdmFsOiBhbnkpIHtcbiAgcmV0dXJuIHZhbC5yZXBsYWNlKC9cXCRcXHsoW159XSspXFx9L2csIChtYXRjaDogYW55LCB2YWx1ZTogYW55KSA9PiB7XG4gICAgbGV0IHNlbDtcbiAgICBmb3IgKGNvbnN0IG5hbWUgb2YgdmFsdWUuc3BsaXQoXCIuXCIpKSB7XG4gICAgICBpZiAoc2VsID09PSB1bmRlZmluZWQpIHtcbiAgICAgICAgaWYgKGNvbmZpZy5oYXNPd25Qcm9wZXJ0eShuYW1lKSkge1xuICAgICAgICAgIHNlbCA9IGNvbmZpZ1tuYW1lXTtcbiAgICAgICAgfVxuICAgICAgICBlbHNlIGlmIChjb25maWcgIT09IGVudHJ5Q29uZmlnICYmIGVudHJ5Q29uZmlnLmhhc093blByb3BlcnR5KG5hbWUpKSB7XG4gICAgICAgICAgc2VsID0gZW50cnlDb25maWdbbmFtZV07XG4gICAgICAgIH1cbiAgICAgICAgZWxzZSBpZiAoY29uZmlnICE9PSByb290Q29uZmlnICYmIHJvb3RDb25maWcuaGFzT3duUHJvcGVydHkobmFtZSkpIHtcbiAgICAgICAgICBzZWwgPSByb290Q29uZmlnW25hbWVdO1xuICAgICAgICB9XG4gICAgICAgIGVsc2Uge1xuICAgICAgICAgIHRyeSB7XG4gICAgICAgICAgICBjb25zdCBtYWluRmlsZSA9IHJlcXVpcmVSZXNvbHZlKG5hbWUpO1xuICAgICAgICAgICAgaWYgKG1haW5GaWxlKSB7XG4gICAgICAgICAgICAgIHNlbCA9IHsgbWFpbkZpbGUsIG1haW5EaXI6IHBhdGgucG9zaXguZGlybmFtZShtYWluRmlsZSksIH07XG4gICAgICAgICAgICB9XG4gICAgICAgICAgfSBjYXRjaChlKSB7fVxuICAgICAgICB9XG4gICAgICAgIGlmIChzZWwgPT09IHVuZGVmaW5lZClcbiAgICAgICAgICBicmVhaztcbiAgICAgIH1cbiAgICAgIGVsc2UgaWYgKHNlbC5oYXNPd25Qcm9wZXJ0eShuYW1lKSkge1xuICAgICAgICBzZWwgPSBzZWxbbmFtZV07XG4gICAgICB9XG4gICAgICBlbHNlIHtcbiAgICAgICAgc2VsID0gdW5kZWZpbmVkO1xuICAgICAgICBicmVhaztcbiAgICAgIH1cbiAgICB9XG4gICAgaWYgKHNlbCA9PT0gdW5kZWZpbmVkKVxuICAgICAgdGhyb3cgbmV3IEVycm9yKGBUaGUgJHt2YWx1ZX0gdmFyaWFibGUgZG9lcyBub3QgZXhpc3RcImApO1xuICAgIHJldHVybiBzZWw7XG4gIH0pO1xufVxuXG5mdW5jdGlvbiByZXNvbHZlQ29uZmlnU3RyaW5nc0ltcGwoY29uZmlnOiBhbnksIGVudHJ5Q29uZmlnOiBhbnksIHJvb3RDb25maWc6IGFueSkge1xuICBsZXQgY291bnQgPSAwO1xuICBmb3IgKGNvbnN0IFtrZXksIHZhbF0gb2YgT2JqZWN0LmVudHJpZXMoY29uZmlnKSkge1xuICAgIGlmICh2YWwgJiYgdHlwZW9mIHZhbCA9PT0gXCJvYmplY3RcIilcbiAgICAgIGNvdW50ICs9IHJlc29sdmVDb25maWdTdHJpbmdzSW1wbCh2YWwsIGVudHJ5Q29uZmlnLCByb290Q29uZmlnKTtcbiAgICBlbHNlIGlmICh0eXBlb2YgdmFsID09PSBcInN0cmluZ1wiKSB7XG4gICAgICBjb25zdCB2ID0gcmVzb2x2ZVN0cmluZ1dpdGhWYXJpYWJsZShjb25maWcsIGVudHJ5Q29uZmlnLCByb290Q29uZmlnLCB2YWwpO1xuICAgICAgaWYgKHZhbCAhPT0gdikge1xuICAgICAgICBjb25maWdba2V5XSA9IHY7XG4gICAgICAgIGNvdW50Kys7XG4gICAgICB9XG4gICAgfVxuICB9XG4gIHJldHVybiBjb3VudDtcbn1cblxuZnVuY3Rpb24gcmVzb2x2ZUNvbmZpZ1N0cmluZ3MoY29uZmlnOiBhbnkpIHtcbiAgZm9yICg7Oykge1xuICAgIGxldCBjb3VudCA9IDA7XG4gICAgZm9yIChjb25zdCBba2V5LCB2YWxdIG9mIE9iamVjdC5lbnRyaWVzKGNvbmZpZykpIHtcbiAgICAgIGlmICh2YWwgJiYgdHlwZW9mIHZhbCA9PT0gXCJvYmplY3RcIilcbiAgICAgICAgY291bnQgKz0gcmVzb2x2ZUNvbmZpZ1N0cmluZ3NJbXBsKHZhbCwgdmFsLCBjb25maWcpO1xuICAgICAgZWxzZSAgaWYgKHR5cGVvZiB2YWwgPT09IFwic3RyaW5nXCIpIHtcbiAgICAgICAgY29uc3QgdiA9IHJlc29sdmVTdHJpbmdXaXRoVmFyaWFibGUoY29uZmlnLCBjb25maWcsIGNvbmZpZywgdmFsKTtcbiAgICAgICAgaWYgKHZhbCAhPT0gdikge1xuICAgICAgICAgIGNvbmZpZ1trZXldID0gdjtcbiAgICAgICAgICBjb3VudCsrO1xuICAgICAgICB9XG4gICAgICB9XG4gICAgfVxuICAgIGlmICghY291bnQpXG4gICAgICBicmVhaztcbiAgfVxufVxuXG5mdW5jdGlvbiBtYWtlQnVpbGRDb25maWcoZ2NvbmZpZzogSUdlbmVyYWxDb25maWcsIGNvbmZpZzogYW55KSB7XG4gIGlmIChjb25maWdbXCJzb3VyY2VSb290XCJdKSB7XG4gICAgdGhyb3cgbmV3IEVycm9yKGBWYXJpYWJsZSBcInNvdXJjZVJvb3RcIiBjYW5ub3QgYmUgY2hhbmdlZCB0byBcIiR7Y29uZmlnLnNvdXJjZVJvb3R9XCJgKTtcbiAgfVxuXG4gIGNvbnN0IHJvb3RDb25maWcgPSByZWJhc2VDb25maWcoY29uZmlnKTtcblxuICByb290Q29uZmlnLmJ1aWxkVHlwZSA9IHJvb3RDb25maWcuYnVpbGRUeXBlIHx8IGdjb25maWcuYnVpbGRUeXBlO1xuICByb290Q29uZmlnLnNvdXJjZVJvb3QgPSByb290Q29uZmlnLnNvdXJjZVJvb3QgfHwgZ2NvbmZpZy53b3JrRGlyO1xuICByb290Q29uZmlnLmJpbmFyeVJvb3QgPSByb290Q29uZmlnLmJpbmFyeVJvb3QgfHwgcGF0aC5wb3NpeC5yZXNvbHZlKGdjb25maWcud29ya0RpciwgXCJidWlsZFwiKTtcblxuICBmb3IgKGNvbnN0IFtrZXksIGVudHJ5XSBvZiBPYmplY3QuZW50cmllcyhyb290Q29uZmlnKSBhcyBhbnkpIHtcbiAgICBpZiAoZW50cnkgJiYgdHlwZW9mIGVudHJ5ID09PSBcIm9iamVjdFwiICYmIGVudHJ5LmFjdGlvbikge1xuICAgICAgZW50cnkuYnVpbGRUeXBlID0gZW50cnkuYnVpbGRUeXBlIHx8IHJvb3RDb25maWcuYnVpbGRUeXBlO1xuICAgICAgY29uc3QgZm9sZGVyID0ga2V5LnJlcGxhY2UoXCI6XCIsIHBhdGgucG9zaXguc2VwKTtcbiAgICAgIGNvbnN0IHdvcmtEaXIgPSBwYXRoLnBvc2l4LmpvaW4ocm9vdENvbmZpZy5iaW5hcnlSb290LCBmb2xkZXIpO1xuICAgICAgZW50cnkudGVtcERpciA9IGVudHJ5LnRlbXBEaXIgfHwgcGF0aC5wb3NpeC5qb2luKHdvcmtEaXIsIFwidG1wXCIpO1xuICAgICAgaWYgKGVudHJ5LnNvdXJjZVVybCkge1xuICAgICAgICBlbnRyeS5hcmNoaXZlRGlyID0gZW50cnkuYXJjaGl2ZURpciB8fCBwYXRoLnBvc2l4LmpvaW4od29ya0RpciwgXCJhcmNcIik7XG4gICAgICAgIGVudHJ5LmV4dHJhY3REaXIgPSBlbnRyeS5leHRyYWN0RGlyIHx8IHBhdGgucG9zaXguam9pbih3b3JrRGlyLCBcInNyY1wiKTtcbiAgICAgICAgaWYgKCFlbnRyeS5zb3VyY2VEaXIpXG4gICAgICAgICAgZW50cnkuc291cmNlRGlyID0gZW50cnkuZXh0cmFjdERpcjtcbiAgICAgICAgZWxzZSBpZiAoIXBhdGguaXNBYnNvbHV0ZShlbnRyeS5zb3VyY2VEaXIpKVxuICAgICAgICAgIGVudHJ5LnNvdXJjZURpciA9IHBhdGgucG9zaXguam9pbihlbnRyeS5leHRyYWN0RGlyLCBlbnRyeS5zb3VyY2VEaXIpO1xuICAgICAgfVxuICAgICAgZWxzZSBpZiAoIWVudHJ5LnNvdXJjZURpcikge1xuICAgICAgICB0aHJvdyBuZXcgRXJyb3IoYE1pc3Npbmcgc291cmNlRGlyIGZvciAke2tleX0gYWN0aW9uXCJgKTtcbiAgICAgIH1cbiAgICAgIGlmIChlbnRyeS5iaW5hcnlEaXIgPT09IG51bGwpXG4gICAgICAgIGVudHJ5LmJpbmFyeURpciA9IGVudHJ5LnNvdXJjZURpcjtcbiAgICAgIGVsc2UgaWYgKGVudHJ5LmJpbmFyeURpciA9PT0gdW5kZWZpbmVkKVxuICAgICAgICBlbnRyeS5iaW5hcnlEaXIgPSBwYXRoLnBvc2l4LmpvaW4od29ya0RpciwgXCJiaW5cIik7XG4gICAgfVxuICB9XG5cbiAgcmVzb2x2ZUNvbmZpZ1N0cmluZ3Mocm9vdENvbmZpZyk7XG5cbiAgcmV0dXJuIHJvb3RDb25maWc7XG59XG5cbmFzeW5jIGZ1bmN0aW9uIGRvRXh0cmFjdEFyY2hpdmUoZ2NvbmZpZzogSUdlbmVyYWxDb25maWcsIGVudmlyb25tZW50OiBhbnksIGNvbmZpZzogYW55LCBzZXR0aW5nczogYW55KSB7XG4gIGlmICghY29uZmlnLnNvdXJjZVVybClcbiAgICB0aHJvdyBuZXcgRXJyb3IoXCJVbmtub3duIHNvdXJjZVVybFwiKTtcbiAgaWYgKCFjb25maWcuYXJjaGl2ZURpcilcbiAgICB0aHJvdyBuZXcgRXJyb3IoXCJVbmtub3duIGFyY2hpdmVEaXJcIik7XG4gIGlmICghY29uZmlnLmV4dHJhY3REaXIpXG4gICAgdGhyb3cgbmV3IEVycm9yKFwiVW5rbm93biBleHRyYWN0RGlyXCIpO1xuXG4gIGlmICghYXdhaXQgZGlyZWN0b3J5RXhpc3RzKGNvbmZpZy5hcmNoaXZlRGlyKSkge1xuICAgIGNvbnNvbGUubG9nKGBta2RpciAtcCAke2NvbmZpZy5hcmNoaXZlRGlyfWApO1xuICAgIGF3YWl0IGZzLnByb21pc2VzLm1rZGlyKGNvbmZpZy5hcmNoaXZlRGlyLCB7IHJlY3Vyc2l2ZTogdHJ1ZSB9KTtcbiAgfVxuXG4gIGlmICghYXdhaXQgZGlyZWN0b3J5RXhpc3RzKGNvbmZpZy50ZW1wRGlyKSkge1xuICAgIGNvbnNvbGUubG9nKGBta2RpciAtcCAke2NvbmZpZy50ZW1wRGlyfWApO1xuICAgIGF3YWl0IGZzLnByb21pc2VzLm1rZGlyKGNvbmZpZy50ZW1wRGlyLCB7IHJlY3Vyc2l2ZTogdHJ1ZSB9KTtcbiAgfVxuXG4gIGNvbnN0IGFyY05hbWUgPSBwYXRoLmJhc2VuYW1lKGNvbmZpZy5zb3VyY2VVcmwpO1xuXG4gIGxldCBhcmNGaWxlO1xuICBsZXQgZG93bmxvYWRVcmxzID0gYXdhaXQgc2V0dGluZ3MuZ2V0KFwiZG93bmxvYWRVcmxzXCIpIHx8IHt9O1xuICBpZiAoZG93bmxvYWRVcmxzW2NvbmZpZy5zb3VyY2VVcmxdKVxuICAgIGFyY0ZpbGUgPSBkb3dubG9hZFVybHNbY29uZmlnLnNvdXJjZVVybF07XG4gIGVsc2Uge1xuICAgIGFyY0ZpbGUgPSBwYXRoLmpvaW4oY29uZmlnLmFyY2hpdmVEaXIsIGFyY05hbWUpO1xuICAgIGF3YWl0IGRvd25sb2FkRmlsZShjb25maWcuc291cmNlVXJsLCBhcmNGaWxlLCB7IGF0dGVtcHRzOiBSRVFVRVNUX0FUVEVNUFRTIH0pO1xuICAgIGRvd25sb2FkVXJsc1tjb25maWcuc291cmNlVXJsXSA9IGFyY0ZpbGU7XG4gICAgYXdhaXQgc2V0dGluZ3Muc2V0KFwiZG93bmxvYWRVcmxzXCIsIGRvd25sb2FkVXJscyk7XG4gIH1cblxuICBsZXQgZXh0cmFjdERpcjtcbiAgbGV0IGV4dHJhY3RGaWxlcyA9IGF3YWl0IHNldHRpbmdzLmdldChcImV4dHJhY3RGaWxlc1wiKSB8fCB7fTtcbiAgaWYgKGV4dHJhY3RGaWxlc1thcmNGaWxlXSkge1xuICAgIGV4dHJhY3REaXIgPSBleHRyYWN0RmlsZXNbYXJjRmlsZV07XG4gIH1cbiAgZWxzZSB7XG4gICAgZXh0cmFjdERpciA9IGF3YWl0IGZzLnByb21pc2VzLm1rZHRlbXAocGF0aC5yZXNvbHZlKGNvbmZpZy50ZW1wRGlyLCBhcmNOYW1lICsgJy4nKSk7XG4gIFxuICAgIGF3YWl0IGNtYWtlLmV4dHJhY3Qoe1xuICAgICAgZW52aXJvbm1lbnQsXG4gICAgICBmaWxlbmFtZTogYXJjRmlsZSxcbiAgICAgIHdvcmtEaXI6IGV4dHJhY3REaXIsXG4gICAgICBsb2dGaWxlOiAgcGF0aC5qb2luKGNvbmZpZy50ZW1wRGlyLCBwYXRoLmJhc2VuYW1lKGV4dHJhY3REaXIpICsgXCIubG9nXCIpLFxuICAgIH0pO1xuICBcbiAgICBjb25zdCBleHRyYWN0TGlzdCA9IGF3YWl0IGZzLnByb21pc2VzLnJlYWRkaXIoZXh0cmFjdERpcik7XG4gICAgaWYgKGV4dHJhY3RMaXN0Lmxlbmd0aCA9PT0gMSkge1xuICAgICAgZXh0cmFjdERpciA9IHBhdGgucmVzb2x2ZShleHRyYWN0RGlyLCBleHRyYWN0TGlzdFswXSk7XG4gICAgICBpZiAoIWF3YWl0IGRpcmVjdG9yeUV4aXN0cyhleHRyYWN0RGlyKSkge1xuICAgICAgICBjb25zb2xlLmxvZyhgcm0gLWZyICR7ZXh0cmFjdERpcn1gKTtcbiAgICAgICAgYXdhaXQgZnMucHJvbWlzZXMucm0oZXh0cmFjdERpciwgeyByZWN1cnNpdmU6IHRydWUgfSk7XG4gICAgICAgIHRocm93IG5ldyBFcnJvcihgU3VwcG9ydCBvbmx5IGRpcmVjdG9yeSBmb3IgYXJjaGl2ZWApO1xuICAgICAgfVxuICAgIH1cbiAgXG4gICAgaWYgKGF3YWl0IGRpcmVjdG9yeUV4aXN0cyhjb25maWcuZXh0cmFjdERpcikpIHtcbiAgICAgIC8vIFRPRE86IE1hcmdlIGV4dHJhY3REaXIgd2l0aCBvdXRwdXRcbiAgICAgIGNvbnNvbGUubG9nKGBybSAtZnIgJHtjb25maWcuZXh0cmFjdERpcn1gKTtcbiAgICAgIGF3YWl0IGZzLnByb21pc2VzLnJtKGNvbmZpZy5leHRyYWN0RGlyLCB7IHJlY3Vyc2l2ZTogdHJ1ZSB9KTtcbiAgICB9XG4gICAgZWxzZSB7XG4gICAgICBjb25zdCBwYXJlbnREaXIgPSBwYXRoLmRpcm5hbWUoY29uZmlnLmV4dHJhY3REaXIpO1xuICAgICAgaWYgKCFhd2FpdCBkaXJlY3RvcnlFeGlzdHMocGFyZW50RGlyKSkge1xuICAgICAgICBjb25zb2xlLmxvZyhgbWtkaXIgLXAgJHtwYXJlbnREaXJ9YCk7XG4gICAgICAgIGF3YWl0IGZzLnByb21pc2VzLm1rZGlyKHBhcmVudERpciwgeyByZWN1cnNpdmU6IHRydWUgfSk7IFxuICAgICAgfVxuICAgIH1cbiAgXG4gICAgY29uc29sZS5sb2coYG12ICR7ZXh0cmFjdERpcn0gJHtjb25maWcuZXh0cmFjdERpcn1gKTtcbiAgICBhd2FpdCBmcy5wcm9taXNlcy5yZW5hbWUoZXh0cmFjdERpciwgY29uZmlnLmV4dHJhY3REaXIpO1xuICBcbiAgICBleHRyYWN0RmlsZXNbYXJjRmlsZV0gPSBleHRyYWN0RGlyO1xuICAgIGF3YWl0IHNldHRpbmdzLnNldChcImV4dHJhY3RGaWxlc1wiLCBleHRyYWN0RmlsZXMpO1xuICB9XG5cbiAgaWYgKGNvbmZpZy5wYXRjaERpcikge1xuICAgIGxldCBwYXRjaERpcnMgPSBhd2FpdCBzZXR0aW5ncy5nZXQoXCJwYXRjaERpcnNcIikgfHwge307XG4gICAgaWYgKCFwYXRjaERpcnNbY29uZmlnLnBhdGNoRGlyXSkge1xuICAgICAgYXdhaXQgbWFrZVBhdGNoKGNvbmZpZy5wYXRjaERpciwgY29uZmlnLmV4dHJhY3REaXIpO1xuICAgICAgcGF0Y2hEaXJzW2NvbmZpZy5wYXRjaERpcl0gPSBjb25maWcuZXh0cmFjdERpcjtcbiAgICAgIGF3YWl0IHNldHRpbmdzLnNldChcInBhdGNoRGlyc1wiLCBwYXRjaERpcnMpO1xuICAgIH1cbiAgfVxufVxuXG5jb25zdCBhY3Rpb25IYW5kbGVyczogYW55ID0ge1xuICBub25lOiBhc3luYyAoY29uZmlnOiBhbnksIGVudmlyb25tZW50OiBhbnksIHNldHRpbmdzOiBTZXR0aW5nc1N0b3JhZ2UpID0+IHtcbiAgICAvKiBkbyBub3RoaW5nICovXG4gIH0sXG4gIGNtYWtlOiBjbWFrZUFjdGlvbixcbiAgY29uZmlndXJlOiBjb25maWd1cmVBY3Rpb24sXG4gIG1ha2U6IG1ha2VBY3Rpb24sXG4gIHByb2Nlc3M6IHByb2Nlc3NBY3Rpb24sXG4gIGJpdG1ha2U6IGJpdG1ha2VBY3Rpb24sXG59O1xuXG5hc3luYyBmdW5jdGlvbiBkb1RhcmdldEJ1aWxkKGdjb25maWc6IElHZW5lcmFsQ29uZmlnLCBlbnZpcm9ubWVudDogYW55LCBjb25maWc6IGFueSwgc2V0dGluZ3M6IFNldHRpbmdzU3RvcmFnZSkge1xuICBpZiAoY29uZmlnLnByZUFjdGlvbikge1xuICAgIGF3YWl0IHNldHRpbmdzLnB1c2goXCJwcmVBY3Rpb25cIik7XG4gICAgY29uc3QgbmV3Q29uZmlnOiBhbnkgPSB7fTtcbiAgICBhc3NpZ25PYmplY3QobmV3Q29uZmlnLCBjb25maWcpO1xuICAgIGRlbGV0ZSBuZXdDb25maWcuYWN0aW9uO1xuICAgIGRlbGV0ZSBuZXdDb25maWcucHJlQWN0aW9uO1xuICAgIGRlbGV0ZSBuZXdDb25maWcucG9zdEFjdGlvbjtcbiAgICBhc3NpZ25PYmplY3QobmV3Q29uZmlnLCBjb25maWcucHJlQWN0aW9uKTtcbiAgICBjb25zdCBuZXdFbnZpcm9ubWVudCA9IG1lcmdlRW52aXJvbm1lbnQoY29uZmlnLnByZUFjdGlvbi5lbnZpcm9ubWVudCwgZW52aXJvbm1lbnQpO1xuICAgIGF3YWl0IGRvVGFyZ2V0QnVpbGQoZ2NvbmZpZywgbmV3RW52aXJvbm1lbnQsIG5ld0NvbmZpZywgc2V0dGluZ3MpO1xuICAgIGF3YWl0IHNldHRpbmdzLnBvcCgpO1xuICB9XG5cbiAgaWYgKEFycmF5LmlzQXJyYXkoY29uZmlnLmFjdGlvbikpIHtcbiAgICBhd2FpdCBzZXR0aW5ncy5wdXNoKFwiYWN0aW9uXCIpO1xuICAgIGZvciAodmFyIGkgPSAwOyBpIDwgY29uZmlnLmFjdGlvbi5sZW5ndGg7ICsraSkge1xuICAgICAgYXdhaXQgc2V0dGluZ3MucHVzaChpLnRvU3RyaW5nKCkpO1xuICAgICAgY29uc3QgbmV3Q29uZmlnOiBhbnkgPSB7fTtcbiAgICAgIGFzc2lnbk9iamVjdChuZXdDb25maWcsIGNvbmZpZyk7XG4gICAgICBkZWxldGUgbmV3Q29uZmlnLmFjdGlvbjtcbiAgICAgIGRlbGV0ZSBuZXdDb25maWcucHJlQWN0aW9uO1xuICAgICAgZGVsZXRlIG5ld0NvbmZpZy5wb3N0QWN0aW9uO1xuICAgICAgYXNzaWduT2JqZWN0KG5ld0NvbmZpZywgY29uZmlnLmFjdGlvbltpXSk7XG4gICAgICBjb25zdCBuZXdFbnZpcm9ubWVudCA9IG1lcmdlRW52aXJvbm1lbnQoY29uZmlnLmFjdGlvbltpXS5lbnZpcm9ubWVudCwgZW52aXJvbm1lbnQpO1xuICAgICAgYXdhaXQgZG9UYXJnZXRCdWlsZChnY29uZmlnLCBuZXdFbnZpcm9ubWVudCwgbmV3Q29uZmlnLCBzZXR0aW5ncyk7XG4gICAgICBhd2FpdCBzZXR0aW5ncy5wb3AoKTtcbiAgICB9XG4gICAgYXdhaXQgc2V0dGluZ3MucG9wKCk7XG4gIH1cbiAgZWxzZSB7XG4gICAgaWYgKCFhd2FpdCBkaXJlY3RvcnlFeGlzdHMoY29uZmlnLmJpbmFyeURpcikpIHtcbiAgICAgIGF3YWl0IGZzLnByb21pc2VzLm1rZGlyKGNvbmZpZy5iaW5hcnlEaXIsIHsgcmVjdXJzaXZlOiB0cnVlIH0pO1xuICAgIH1cbiAgICBpZiAoYWN0aW9uSGFuZGxlcnNbY29uZmlnLmFjdGlvbl0pIHtcbiAgICAgIGNvbmZpZy5kZXNjcmlwdGlvbiAmJiBjb25zb2xlLmxvZyhjb25maWcuZGVzY3JpcHRpb24pO1xuICAgICAgYXdhaXQgYWN0aW9uSGFuZGxlcnNbY29uZmlnLmFjdGlvbl0oY29uZmlnLCBlbnZpcm9ubWVudCwgc2V0dGluZ3MpO1xuICAgIH1cbiAgfVxuXG4gIGlmIChjb25maWcucG9zdEFjdGlvbikge1xuICAgIGF3YWl0IHNldHRpbmdzLnB1c2goXCJwb3N0QWN0aW9uXCIpO1xuICAgIGNvbnN0IG5ld0NvbmZpZzogYW55ID0ge307XG4gICAgYXNzaWduT2JqZWN0KG5ld0NvbmZpZywgY29uZmlnKTtcbiAgICBkZWxldGUgbmV3Q29uZmlnLmFjdGlvbjtcbiAgICBkZWxldGUgbmV3Q29uZmlnLnByZUFjdGlvbjtcbiAgICBkZWxldGUgbmV3Q29uZmlnLnBvc3RBY3Rpb247XG4gICAgYXNzaWduT2JqZWN0KG5ld0NvbmZpZywgY29uZmlnLnBvc3RBY3Rpb24pO1xuICAgIGNvbnN0IG5ld0Vudmlyb25tZW50ID0gbWVyZ2VFbnZpcm9ubWVudChjb25maWcucG9zdEFjdGlvbi5lbnZpcm9ubWVudCwgZW52aXJvbm1lbnQpO1xuICAgIGF3YWl0IGRvVGFyZ2V0QnVpbGQoZ2NvbmZpZywgbmV3RW52aXJvbm1lbnQsIG5ld0NvbmZpZywgc2V0dGluZ3MpO1xuICAgIGF3YWl0IHNldHRpbmdzLnBvcCgpO1xuICB9XG59XG5cbmFzeW5jIGZ1bmN0aW9uIGdldFVzZXJDb25maWcob3B0aW9uczogQ29tbWFuZE9wdGlvbnMpIHtcbiAgbGV0IGNvbmZpZ1BhdGg7XG4gIGlmIChvcHRpb25zLmVudi5jb25maWcpIHtcbiAgICBjb25maWdQYXRoID0gcGF0aC5pc0Fic29sdXRlKG9wdGlvbnMuZW52LmNvbmZpZykgPyBvcHRpb25zLmVudi5jb25maWcgOiBwYXRoLnJlc29sdmUob3B0aW9ucy53b3JrRGlyLCBvcHRpb25zLmVudi5jb25maWcpO1xuICAgIGlmICghYXdhaXQgZmlsZUV4aXN0cyhjb25maWdQYXRoKSlcbiAgICAgIHRocm93IGBDb25maWd1cmF0aW9uICcke29wdGlvbnMuZW52LmNvbmZpZ30nIGZpbGUgZG9lcyBub3QgZXhpc3RgO1xuICB9XG4gIGVsc2Uge1xuICAgIGNvbnN0IHVzZXJDb25maWdQYXRoID0gcGF0aC5yZXNvbHZlKG9wdGlvbnMud29ya0RpciwgVVNFUl9DT05GSUcpO1xuICAgIGlmIChhd2FpdCBmaWxlRXhpc3RzKHVzZXJDb25maWdQYXRoKSlcbiAgICAgIGNvbmZpZ1BhdGggPSB1c2VyQ29uZmlnUGF0aDtcbiAgICBlbHNlIHtcbiAgICAgIGxvZ2dlci53YXJuKGBDb25maWcgZmlsZSAnJHtVU0VSX0NPTkZJR30nIGlzIG5vdCBhdmFpbGFibGVgKTtcbiAgICB9XG4gIH1cblxuICBpZiAoIWNvbmZpZ1BhdGgpIHtcbiAgICByZXR1cm4ge1xuICAgICAgXCJidW5kbGU6b3V0cHV0XCI6IHtcbiAgICAgICAgYWN0aW9uOiBcImJpdG1ha2VcIixcbiAgICAgICAgdmFyaWFibGVzOiB7XG4gICAgICAgICAgSU5TVEFMTF9QUkVGSVg6IFwiL3VzclwiLFxuICAgICAgICB9LFxuICAgICAgICBzb3VyY2VEaXI6IFwiJHtzb3VyY2VSb290fVwiLFxuICAgICAgICBkZXN0RGlyOiBcIiR7YmluYXJ5Um9vdH0vb3V0cHV0XCIsXG4gICAgICB9XG4gICAgfTtcbiAgfVxuXG4gIGNvbnN0IGNvbmZpZ1VybCA9IHVybC5wYXRoVG9GaWxlVVJMKGNvbmZpZ1BhdGgpO1xuICBjb25zdCBjb25maWdNb2R1bGUgPSBhd2FpdCBpbXBvcnRNb2R1bGUoY29uZmlnVXJsKTtcbiAgc3dpdGNoICh0eXBlb2YgY29uZmlnTW9kdWxlLmRlZmF1bHQpIHtcbiAgY2FzZSBcImZ1bmN0aW9uXCI6XG4gICAgY29uc3QgdXNlckNvbmZpZyA9IGNvbmZpZ01vZHVsZS5kZWZhdWx0KG9wdGlvbnMuZW52LCB7fSk7XG4gICAgaWYgKHVzZXJDb25maWcgaW5zdGFuY2VvZiBQcm9taXNlKVxuICAgICAgcmV0dXJuIGF3YWl0IHVzZXJDb25maWc7XG4gICAgcmV0dXJuIHVzZXJDb25maWc7XG5cbiAgY2FzZSBcIm9iamVjdFwiOlxuICAgIHJldHVybiBjb25maWdNb2R1bGUuZGVmYXVsdDtcblxuICBkZWZhdWx0OlxuICAgIHRocm93IG5ldyBFcnJvcihgVW5rbm93biB1c2VyIGNvbmZpZ3VyYXRpb24gdHlwZWApO1xuICB9XG59XG5cbmV4cG9ydCBkZWZhdWx0IGFzeW5jIChvcHRpb25zOiBDb21tYW5kT3B0aW9ucykgPT4ge1xuICBjb25zdCBnY29uZmlnOiBJR2VuZXJhbENvbmZpZyA9IHtcbiAgICBidWlsZFR5cGU6IG9wdGlvbnMuZW52LmJ1aWxkVHlwZSA9PSBERUJVR19CVUlMRF9UWVBFID8gb3B0aW9ucy5lbnYuYnVpbGRUeXBlIDogUkVMRUFTRV9CVUlMRF9UWVBFLFxuICAgIHdvcmtEaXI6IG9wdGlvbnMud29ya0RpcixcbiAgfTtcblxuICBjb25zdCB1c2VyQ29uZmlnID0gYXdhaXQgZ2V0VXNlckNvbmZpZyhvcHRpb25zKTtcbiAgY29uc3QgYnVpbGRDb25maWcgPSBtYWtlQnVpbGRDb25maWcoZ2NvbmZpZywgdXNlckNvbmZpZyk7XG5cbiAgaWYgKGJ1aWxkQ29uZmlnLlJFQ0lQRV9DT05URU5UX0ZJTEUpIHtcbiAgICBjb25zdCBqc29uQ29uZmlnID0gSlNPTi5zdHJpbmdpZnkoYnVpbGRDb25maWcsIG51bGwsIDIpO1xuICAgIGF3YWl0IHNhdmVJZkRpZmZlcmVudChidWlsZENvbmZpZy5SRUNJUEVfQ09OVEVOVF9GSUxFLCBqc29uQ29uZmlnKTtcbiAgfVxuXG4gIGNvbnN0IHNldHRpbmdzRmlsZW5hbWUgPSBwYXRoLnJlc29sdmUoYnVpbGRDb25maWcuYmluYXJ5Um9vdCwgQlVJTERfU0VUVElOR1NfRklMRSk7XG4gIGNvbnN0IHNldHRpbmdzID0gbmV3IFNldHRpbmdzU3RvcmFnZShzZXR0aW5nc0ZpbGVuYW1lKTtcblxuICBmb3IgKGNvbnN0IFtrZXksIGVudHJ5XSBvZiBPYmplY3QuZW50cmllcyhidWlsZENvbmZpZykgYXMgYW55KSB7XG4gICAgaWYgKGVudHJ5ICYmIHR5cGVvZiBlbnRyeSA9PT0gXCJvYmplY3RcIiAmJiBlbnRyeS5hY3Rpb24gJiYgIWVudHJ5LmRpc2FibGVkKSB7XG4gICAgICBhd2FpdCBzZXR0aW5ncy5wdXNoKGtleSk7XG4gICAgICBjb25zdCBjb21wbGV0ZWQgPSBhd2FpdCBzZXR0aW5ncy5nZXQoXCJjb21wbGV0ZWRcIik7XG4gICAgICBpZiAoZW50cnkucmVidWlsZCB8fCAhY29tcGxldGVkKSB7XG4gICAgICAgIGxvZ2dlci5pbmZvKGBTdGFydGVkIGFjdGlvbjogJHtrZXl9YCk7XG4gICAgICAgIGNvbnN0IGVudmlyb25tZW50ID0gbWVyZ2VFbnZpcm9ubWVudChlbnRyeS5lbnZpcm9ubWVudCwgcHJvY2Vzcy5lbnYpO1xuICAgICAgICBpZiAoZW50cnkuc291cmNlVXJsKSB7XG4gICAgICAgICAgYXdhaXQgZG9FeHRyYWN0QXJjaGl2ZShnY29uZmlnLCBlbnZpcm9ubWVudCwgZW50cnksIHNldHRpbmdzKTtcbiAgICAgICAgfVxuICAgICAgICBhd2FpdCBkb1RhcmdldEJ1aWxkKGdjb25maWcsIGVudmlyb25tZW50LCBlbnRyeSwgc2V0dGluZ3MpO1xuICAgICAgICBhd2FpdCBzZXR0aW5ncy5zZXQoXCJjb21wbGV0ZWRcIiwgdHJ1ZSk7XG4gICAgICAgIGxvZ2dlci5pbmZvKGBDb21wbGV0ZWQgYWN0aW9uOiAke2tleX1gKTtcbiAgICAgIH1cbiAgICAgIGF3YWl0IHNldHRpbmdzLnBvcCgpO1xuICAgIH1cbiAgfVxufVxuIiwiLypcbiAqIE1JVCBMaWNlbnNlXG4gKlxuICogQ29weXJpZ2h0IChjKSAyMDI1ICBZdXJpaSBZYWt1YmluICh5dXJpaS55YWt1YmluQGdtYWlsLmNvbSlcbiAqXG4gKiBQZXJtaXNzaW9uIGlzIGdyYW50ZWQgdG8gdXNlLCBjb3B5LCBtb2RpZnksIGFuZCBkaXN0cmlidXRlIHRoaXMgc29mdHdhcmVcbiAqIHVuZGVyIHRoZSBNSVQgTGljZW5zZS4gU2VlIExJQ0VOU0UgZmlsZSBmb3IgZGV0YWlscy5cbiAqL1xuXG5pbXBvcnQgaW5pdCBmcm9tIFwiQC9jb21tYW5kcy9pbml0XCI7XG5pbXBvcnQgYnVpbGQgZnJvbSBcIkAvY29tbWFuZHMvYnVpbGRcIjtcblxuZXhwb3J0IGRlZmF1bHQge1xuICBkZWZhdWx0OiBidWlsZCxcbiAgaW5pdCxcbiAgYnVpbGQsXG59O1xuIiwiLypcbiAqIE1JVCBMaWNlbnNlXG4gKlxuICogQ29weXJpZ2h0IChjKSAyMDI1ICBZdXJpaSBZYWt1YmluICh5dXJpaS55YWt1YmluQGdtYWlsLmNvbSlcbiAqXG4gKiBQZXJtaXNzaW9uIGlzIGdyYW50ZWQgdG8gdXNlLCBjb3B5LCBtb2RpZnksIGFuZCBkaXN0cmlidXRlIHRoaXMgc29mdHdhcmVcbiAqIHVuZGVyIHRoZSBNSVQgTGljZW5zZS4gU2VlIExJQ0VOU0UgZmlsZSBmb3IgZGV0YWlscy5cbiAqL1xuXG5pbXBvcnQgcGF0aCBmcm9tIFwibm9kZTpwYXRoXCI7XG5pbXBvcnQgZnMgZnJvbSBcIm5vZGU6ZnNcIjtcblxuaW1wb3J0IHsgZmlsZUV4aXN0cyB9IGZyb20gXCJAL3V0aWxzL0ZpbGVTeXN0ZW1cIjtcbmltcG9ydCB7IFVTRVJfQ09ORklHIH0gZnJvbSBcIkAvQ29uc3RhbnRzXCI7XG5pbXBvcnQgeyBDb21tYW5kT3B0aW9ucyB9IGZyb20gXCJAL2NvcmUvQ29tbWFuZE9wdGlvbnNcIjtcbmltcG9ydCB7IHJlcXVpcmVSZXNvbHZlIH0gZnJvbSBcIkAvdXRpbHMvTW9kdWxlXCI7XG5pbXBvcnQgeyBjcmVhdGVMb2dnZXIgfSBmcm9tIFwiQC9sb2dnZXJcIjtcblxuY29uc3QgbG9nZ2VyID0gY3JlYXRlTG9nZ2VyKGltcG9ydC5tZXRhLnVybCk7XG5cbmV4cG9ydCBkZWZhdWx0IGFzeW5jIGZ1bmN0aW9uKG9wdGlvbnM6IENvbW1hbmRPcHRpb25zKSB7XG4gIGNvbnN0IHByZXNldCA9IG9wdGlvbnMuZW52LnByZXNldDtcblxuICBsZXQgcHJlc2V0UGF0aDtcbiAgaWYgKHByZXNldCkge1xuICAgIGlmIChhd2FpdCBmaWxlRXhpc3RzKHByZXNldCkpXG4gICAgICBwcmVzZXRQYXRoID0gcHJlc2V0O1xuICAgIGVsc2Uge1xuICAgICAgY29uc3QgY29tcG9uZW50cyA9IHByZXNldC5zcGxpdChcIi9cIik7XG4gICAgICBpZiAoY29tcG9uZW50cy5sZW5ndGggPT09IDIpIHtcbiAgICAgICAgICB0cnkgeyBwcmVzZXRQYXRoID0gcmVxdWlyZVJlc29sdmUoYCR7Y29tcG9uZW50c1swXX0vYml0bWFrZS9wcmVzZXRzLyR7Y29tcG9uZW50c1sxXX1gKSB9IGNhdGNoKGUpIHt9XG4gICAgICB9XG4gICAgfVxuICB9XG5cbiAgaWYgKCFwcmVzZXRQYXRoKVxuICAgIHRocm93IG5ldyBFcnJvcihgUHJlc2V0ICcke3ByZXNldH0nIGlzIG5vdCBhdmFpbGFibGVgKTtcblxuICBjb25zdCB1c2VyQ29uZmlnUGF0aCA9IHBhdGgucmVzb2x2ZShvcHRpb25zLndvcmtEaXIsIFVTRVJfQ09ORklHKTtcbiAgaWYgKGF3YWl0IGZpbGVFeGlzdHModXNlckNvbmZpZ1BhdGgpKVxuICAgIGF3YWl0IGZzLnByb21pc2VzLnJtKHVzZXJDb25maWdQYXRoKTtcblxuICBhd2FpdCBmcy5wcm9taXNlcy5jb3B5RmlsZShwcmVzZXRQYXRoLCB1c2VyQ29uZmlnUGF0aCk7XG4gIGxvZ2dlci5pbmZvKGBQcmVzZXQgJyR7cHJlc2V0fScgaW5zdGFsbGVkIHN1Y2Nlc3NmdWxseWApO1xufVxuIiwiLypcbiAqIE1JVCBMaWNlbnNlXG4gKlxuICogQ29weXJpZ2h0IChjKSAyMDI1ICBZdXJpaSBZYWt1YmluICh5dXJpaS55YWt1YmluQGdtYWlsLmNvbSlcbiAqXG4gKiBQZXJtaXNzaW9uIGlzIGdyYW50ZWQgdG8gdXNlLCBjb3B5LCBtb2RpZnksIGFuZCBkaXN0cmlidXRlIHRoaXMgc29mdHdhcmVcbiAqIHVuZGVyIHRoZSBNSVQgTGljZW5zZS4gU2VlIExJQ0VOU0UgZmlsZSBmb3IgZGV0YWlscy5cbiAqL1xuXG5pbXBvcnQgZnMgZnJvbSBcIm5vZGU6ZnNcIjtcbmltcG9ydCBwYXRoIGZyb20gXCJub2RlOnBhdGhcIjtcblxuaW1wb3J0IHsgUGx1Z2luQ29udGV4dCB9IGZyb20gXCJAL2NvcmUvUGx1Z2luQ29udGV4dFwiO1xuaW1wb3J0IHsgR2xvYmFsQ29udGV4dCB9IGZyb20gXCJAL2NvcmUvR2xvYmFsQ29udGV4dFwiO1xuaW1wb3J0IHsgU2NvcGVIZWxwZXIgfSBmcm9tIFwiQC9jb3JlL1Njb3BlXCI7XG5pbXBvcnQgeyBHb2FsQ29sbGVjdGlvbiB9IGZyb20gXCJAL2NvcmUvR29hbENvbGxlY3Rpb25cIjtcbmltcG9ydCB7IFRvb2xjaGFpbkNvbnRleHQgfSBmcm9tIFwiQC9jb3JlL1Rvb2xjaGFpbkNvbnRleHRcIjtcbmltcG9ydCB7IGdldFBhdGhTdHJpbmcgfSAgZnJvbSBcIkAvdXRpbHMvRmlsZVN5c3RlbVwiO1xuaW1wb3J0IHsgRGlyUGF0aCwgRmlsZVBhdGggfSBmcm9tIFwiQC9jb3JlL1BhdGhcIjtcbmltcG9ydCB7IGltcG9ydE1vZHVsZSB9ICBmcm9tIFwiQC91dGlscy9Nb2R1bGVcIjtcbmltcG9ydCB7IGRldGVybWluZUNvbXBpbGVyIH0gIGZyb20gXCJAL2NvcmUvRGV0ZXJtaW5lQ29tcGlsZXJcIjtcbmltcG9ydCBTeXN0ZW1WYXJpYWJsZXMgZnJvbSBcIkAvY29yZS9TeXN0ZW1WYXJpYWJsZXNcIjtcbmltcG9ydCB7IFN5c3RlbVNjb3BlIH0gZnJvbSBcIkAvY29yZS9TeXN0ZW1TY29wZVwiO1xuaW1wb3J0IHsgU2V0dGluZ3NTdG9yYWdlIH0gZnJvbSBcIkAvdXRpbHMvU2V0dGluZ3NTdG9yYWdlXCI7XG5pbXBvcnQgeyBJTlNUQUxMX1RBUkdFVCwgUEFDS0FHRV9KU09OLCBNQUtFX0NBQ0hFIH0gZnJvbSBcIkAvQ29uc3RhbnRzXCI7XG5cbmV4cG9ydCBhc3luYyBmdW5jdGlvbiBiaXRtYWtlQWN0aW9uKGNvbmZpZzogYW55LCBlbnZpcm9ubWVudDogYW55LCBzZXR0aW5nczogU2V0dGluZ3NTdG9yYWdlKSB7XG4gIHByb2Nlc3MuZW52ID0gZW52aXJvbm1lbnQ7XG5cbiAgbGV0IHNjb3BlID0ge30gYXMgU3lzdGVtU2NvcGU7XG4gIFNjb3BlSGVscGVyLmRlZmluZVZhcmlhYmxlcyhzY29wZSwgXCJzeXN0ZW1cIiwgU3lzdGVtVmFyaWFibGVzKTtcblxuICBjb25zdCBzb3VyY2VEaXIgPSBnZXRQYXRoU3RyaW5nKGNvbmZpZy5zb3VyY2VEaXIpO1xuICBjb25zdCBiaW5hcnlEaXIgPSBnZXRQYXRoU3RyaW5nKGNvbmZpZy5iaW5hcnlEaXIpO1xuXG4gIHNjb3BlLlBST0pFQ1RfU09VUkNFX0RJUiA9IERpclBhdGguY3JlYXRlKHNvdXJjZURpcik7XG4gIHNjb3BlLlBST0pFQ1RfQklOQVJZX0RJUiA9IERpclBhdGguY3JlYXRlKGJpbmFyeURpcik7XG5cbiAgc2NvcGUuUEFDS0FHRV9GSUxFID0gc2NvcGUuUFJPSkVDVF9TT1VSQ0VfRElSLmpvaW4oUEFDS0FHRV9KU09OKTtcbiAgc2NvcGUuQ0FDSEVfRklMRSA9IHNjb3BlLlBST0pFQ1RfQklOQVJZX0RJUi5qb2luKE1BS0VfQ0FDSEUpO1xuICBzY29wZS5TT1VSQ0VfRElSID0gc2NvcGUuUFJPSkVDVF9TT1VSQ0VfRElSO1xuICBzY29wZS5CSU5BUllfRElSID0gc2NvcGUuUFJPSkVDVF9CSU5BUllfRElSO1xuXG4gIGNvbnN0IHBhY2thZ2VKc29uID0gYXdhaXQgZnMucHJvbWlzZXMucmVhZEZpbGUoc2NvcGUuUEFDS0FHRV9GSUxFLnRvU3RyaW5nKCksICd1dGY4Jyk7XG4gIGNvbnN0IHBrZyA9IEpTT04ucGFyc2UocGFja2FnZUpzb24pO1xuXG4gIHNjb3BlLkJVSUxEX1RZUEUgPSBjb25maWcuYnVpbGRUeXBlO1xuICBzY29wZS5QUk9KRUNUX05BTUUgPSBwa2cubmFtZTtcbiAgc2NvcGUuUFJPSkVDVF9WRVJTSU9OID0gcGtnLnZlcnNpb247XG4gIHNjb3BlLlBST0pFQ1RfREVTQ1JJUFRJT04gPSBwa2cuZGVzY3JpcHRpb24gfHwgXCJcIjtcbiAgc2NvcGUuUFJPSkVDVF9IT01FUEFHRV9VUkwgPSBwa2cuaG9tZXBhZ2UgfHwgXCJcIjtcblxuICBpZiAoY29uZmlnLmRlc3REaXIpXG4gICAgc2NvcGUuREVTVERJUiA9IGNvbmZpZy5kZXN0RGlyO1xuXG4gIFNjb3BlSGVscGVyLmFwcGx5VmFyaWFibGVzKHNjb3BlLCBjb25maWcudmFyaWFibGVzIHx8IHt9KTtcblxuICBjb25zdCBnbG9iYWwgPSBHbG9iYWxDb250ZXh0LmNyZWF0ZSgpO1xuICBpZiAoc2NvcGUuVE9PTENIQUlOX0ZJTEUpIHtcbiAgICBjb25zdCB0b29sY2hhaW4gPSBhd2FpdCBpbXBvcnRNb2R1bGUoc2NvcGUuVE9PTENIQUlOX0ZJTEUpO1xuICAgIGlmICghdG9vbGNoYWluLmRlZmF1bHQpXG4gICAgICB0aHJvdyBuZXcgRXJyb3IoXCJUb29sY2hhaW4gbW9kdWxlIGhhcyBubyBkZWZhdWx0IGV4cG9ydFwiKTtcbiAgICBjb25zdCBtayA9IFRvb2xjaGFpbkNvbnRleHQuY3JlYXRlKHNjb3BlLCBnbG9iYWwpO1xuICAgIGNvbnN0IHJlc3VsdCA9IHRvb2xjaGFpbi5kZWZhdWx0KG1rKTtcbiAgICBpZiAocmVzdWx0IGluc3RhbmNlb2YgUHJvbWlzZSlcbiAgICAgIGF3YWl0IHJlc3VsdDtcbiAgICBTY29wZUhlbHBlci5hcHBseVZhcmlhYmxlcyhzY29wZSwgbWspO1xuICB9XG4gIGVsc2Uge1xuICAgIGF3YWl0IGRldGVybWluZUNvbXBpbGVyKHNjb3BlKTtcbiAgfVxuXG4gIGZvciAoY29uc3QgcGx1Z2luIG9mIChzY29wZS5NQUtFX1BMVUdJTl9MSVNUIHx8IFtdKSkge1xuICAgIGNvbnN0IGN3ZFNhdmUgPSBwcm9jZXNzLmN3ZCgpO1xuICAgIFxuICAgIHNjb3BlLlNDUklQVF9GSUxFID0gRmlsZVBhdGguY3JlYXRlKHBsdWdpbik7XG4gICAgc2NvcGUuU0NSSVBUX0RJUiA9IHNjb3BlLlNDUklQVF9GSUxFLmRpcm5hbWUoKTtcblxuICAgIHByb2Nlc3MuY2hkaXIoc2NvcGUuU0NSSVBUX0RJUi50b1N0cmluZygpKTtcbiAgICBjb25zdCBtb2R1bGUgPSBhd2FpdCBpbXBvcnRNb2R1bGUoc2NvcGUuU0NSSVBUX0ZJTEUudG9TdHJpbmcoKSk7XG4gICAgXG4gICAgaWYgKCFtb2R1bGUuZGVmYXVsdClcbiAgICAgIHRocm93IG5ldyBFcnJvcihgUGx1Z2luICR7c2NvcGUuU0NSSVBUX0ZJTEUuYmFzZW5hbWUoKX0gbm90IGNvbnRhaW4gZGVmYXVsdCBleHBvcnRgKTtcblxuICAgIGNvbnN0IG1rID0gUGx1Z2luQ29udGV4dC5jcmVhdGUoc2NvcGUsIGdsb2JhbCk7XG4gICAgaWYgKHR5cGVvZiBtb2R1bGUuZGVmYXVsdCAhPT0gXCJmdW5jdGlvblwiKVxuICAgICAgdGhyb3cgbmV3IEVycm9yKGBQbHVnaW4gJHtzY29wZS5TQ1JJUFRfRklMRS5iYXNlbmFtZSgpfSBleHBvcnQgaGFzIG5vIGZ1bmN0aW9uIG9yIGNsYXNzYCk7XG4gICAgbGV0IHJlc3VsdDogYW55O1xuICAgIGlmICgvXmNsYXNzXFxzLy50ZXN0KEZ1bmN0aW9uLnByb3RvdHlwZS50b1N0cmluZy5jYWxsKG1vZHVsZS5kZWZhdWx0KSkpIHtcbiAgICAgIGlmICh0eXBlb2YgbW9kdWxlLmRlZmF1bHQucHJvdG90eXBlLmFwcGx5ICE9PSBcImZ1bmN0aW9uXCIpXG4gICAgICAgIHRocm93IG5ldyBFcnJvcihgUGx1Z2luIGNsYXNzIG9mICR7c2NvcGUuU0NSSVBUX0ZJTEUuYmFzZW5hbWUoKX0gaGFzIG5vIGFwcGx5IG1ldGhvZGApO1xuICAgICAgcmVzdWx0ID0gKG5ldyBtb2R1bGUuZGVmYXVsdCkuYXBwbHkobWspO1xuICAgIH1cbiAgICBlbHNlIHtcbiAgICAgIHJlc3VsdCA9IG1vZHVsZS5kZWZhdWx0KG1rKTtcbiAgICB9XG5cbiAgICBpZiAocmVzdWx0IGluc3RhbmNlb2YgUHJvbWlzZSlcbiAgICAgIGF3YWl0IHJlc3VsdDtcblxuICAgIFNjb3BlSGVscGVyLmFwcGx5VmFyaWFibGVzKHNjb3BlLCBtayk7XG5cbiAgICBwcm9jZXNzLmNoZGlyKGN3ZFNhdmUpO1xuICB9XG5cbiAgZ2xvYmFsLmFkZFN1YmRpcmVjdG9yeShzY29wZSk7XG5cbiAgYXdhaXQgZ2xvYmFsLmRvU3ViZGlyZWN0b3J5KCk7XG4gIGNvbnNvbGUuaW5mbyhcIkNvbmZpZ3VyaW5nIGRvbmVcIik7XG5cbiAgaWYgKHNjb3BlLkdMT0JBTF9DT05URVhUX0pTT04pIHtcbiAgICBjb25zdCBmaWxlbmFtZSA9IHNjb3BlLkdMT0JBTF9DT05URVhUX0pTT04udG9TdHJpbmcoKTtcbiAgICBjb25zdCBjb250ZW50ID0gSlNPTi5zdHJpbmdpZnkoZ2xvYmFsLCBudWxsLCAyKTtcbiAgICBhd2FpdCBmcy5wcm9taXNlcy5ta2RpcihwYXRoLmRpcm5hbWUoZmlsZW5hbWUpLCB7IHJlY3Vyc2l2ZTogdHJ1ZSB9KTtcbiAgICBhd2FpdCBmcy5wcm9taXNlcy53cml0ZUZpbGUoZmlsZW5hbWUsIGNvbnRlbnQsIHsgZW5jb2Rpbmc6IFwidXRmOFwiIH0pO1xuICB9XG5cbiAgY29uc3QgYWxsR29hbExpc3QgPSBnbG9iYWwuY3JlYXRlR29hbHMoc2NvcGUpO1xuICBjb25zdCBnb2FsTGlzdCA9IGFsbEdvYWxMaXN0LmdldFRhcmdldExpc3QoSU5TVEFMTF9UQVJHRVQpO1xuXG4gIGlmIChzY29wZS5UQVJHRVRfR09BTFNfSlNPTikge1xuICAgIGNvbnN0IGZpbGVuYW1lID0gc2NvcGUuVEFSR0VUX0dPQUxTX0pTT04udG9TdHJpbmcoKTtcbiAgICBjb25zdCBjb250ZW50ID0gSlNPTi5zdHJpbmdpZnkoZ29hbExpc3QsIG51bGwsIDIpO1xuICAgIGF3YWl0IGZzLnByb21pc2VzLm1rZGlyKHBhdGguZGlybmFtZShmaWxlbmFtZSksIHsgcmVjdXJzaXZlOiB0cnVlIH0pO1xuICAgIGF3YWl0IGZzLnByb21pc2VzLndyaXRlRmlsZShmaWxlbmFtZSwgY29udGVudCwgeyBlbmNvZGluZzogXCJ1dGY4XCIgfSk7XG4gIH1cblxuICBhd2FpdCBHb2FsQ29sbGVjdGlvbi5idWlsZEdvYWxzKGdvYWxMaXN0KTtcbn1cbiIsIi8qXG4gKiBNSVQgTGljZW5zZVxuICpcbiAqIENvcHlyaWdodCAoYykgMjAyNSAgWXVyaWkgWWFrdWJpbiAoeXVyaWkueWFrdWJpbkBnbWFpbC5jb20pXG4gKlxuICogUGVybWlzc2lvbiBpcyBncmFudGVkIHRvIHVzZSwgY29weSwgbW9kaWZ5LCBhbmQgZGlzdHJpYnV0ZSB0aGlzIHNvZnR3YXJlXG4gKiB1bmRlciB0aGUgTUlUIExpY2Vuc2UuIFNlZSBMSUNFTlNFIGZpbGUgZm9yIGRldGFpbHMuXG4gKi9cblxuaW1wb3J0IGZzIGZyb20gXCJub2RlOmZzXCI7XG5pbXBvcnQgcGF0aCBmcm9tIFwibm9kZTpwYXRoXCI7XG5cbmV4cG9ydCBkZWZhdWx0IGFzeW5jIGZ1bmN0aW9uKG1rOiBhbnksIHBhcmFtczogYW55KSB7XG4gIGxldCBjb250ZW50ID0gYXdhaXQgZnMucHJvbWlzZXMucmVhZEZpbGUobWsuU0NSSVBUX0lOUFVULnRvU3RyaW5nKCksIFwidXRmLThcIik7XG4gIGNvbnRlbnQgPSBjb250ZW50LnJlcGxhY2UoL0AoW19BLVphLXpdW19BLVphLXowLTldKylAL2csIChtYXRjaCwgdjEpID0+IHtcbiAgICBjb25zdCByZXMgPSBwYXJhbXNbdjFdIHx8IG1rW3YxXSB8fCBcIlwiO1xuICAgIGlmIChBcnJheS5pc0FycmF5KHJlcykpXG4gICAgICByZXR1cm4gcmVzLmpvaW4oXCJcXG5cIik7XG4gICAgcmV0dXJuIHJlcy50b1N0cmluZygpO1xuICB9KTtcbiAgY29udGVudCA9IGNvbnRlbnQucmVwbGFjZSgvI2NtYWtlZGVmaW5lICsoW19BLVphLXpdW19BLVphLXowLTldKykgKiguKikvZywgKG1hdGNoLCB2MSwgdjIpID0+IHtcbiAgICByZXR1cm4gcGFyYW1zW3YxXSB8fCBta1t2MV0gPyBgI2RlZmluZSAke3YxfSAke3YyfWAgOiBgLyogI3VuZGVmICR7djF9ICovYDtcbiAgfSk7XG4gIGF3YWl0IGZzLnByb21pc2VzLm1rZGlyKHBhdGguZGlybmFtZShtay5TQ1JJUFRfT1VUUFVULnRvU3RyaW5nKCkpLCB7IHJlY3Vyc2l2ZTogdHJ1ZSB9KTtcbiAgYXdhaXQgZnMucHJvbWlzZXMud3JpdGVGaWxlKG1rLlNDUklQVF9PVVRQVVQudG9TdHJpbmcoKSwgY29udGVudCwgXCJ1dGYtOFwiKTtcbn1cbiIsIi8qXG4gKiBNSVQgTGljZW5zZVxuICpcbiAqIENvcHlyaWdodCAoYykgMjAyNSAgWXVyaWkgWWFrdWJpbiAoeXVyaWkueWFrdWJpbkBnbWFpbC5jb20pXG4gKlxuICogUGVybWlzc2lvbiBpcyBncmFudGVkIHRvIHVzZSwgY29weSwgbW9kaWZ5LCBhbmQgZGlzdHJpYnV0ZSB0aGlzIHNvZnR3YXJlXG4gKiB1bmRlciB0aGUgTUlUIExpY2Vuc2UuIFNlZSBMSUNFTlNFIGZpbGUgZm9yIGRldGFpbHMuXG4gKi9cblxuaW1wb3J0IGZzIGZyb20gXCJub2RlOmZzXCI7XG5pbXBvcnQgcGF0aCBmcm9tIFwibm9kZTpwYXRoXCI7XG5pbXBvcnQgeyBjcmVhdGVMb2dnZXIgfSBmcm9tIFwiQC9sb2dnZXJcIjtcblxuY29uc3QgbG9nZ2VyID0gY3JlYXRlTG9nZ2VyKGltcG9ydC5tZXRhLnVybCk7XG5cbmV4cG9ydCBkZWZhdWx0IGFzeW5jIGZ1bmN0aW9uKHBhcmFtczogYW55KSB7XG4gIGxvZ2dlci5pbmZvKFwiSW5zdGFsbGluZzogXCIgKyBwYXJhbXMuZGVzdCk7XG4gIGF3YWl0IGZzLnByb21pc2VzLm1rZGlyKHBhdGguZGlybmFtZShwYXJhbXMuZGVzdCksIHsgcmVjdXJzaXZlOiB0cnVlIH0pO1xuICBhd2FpdCBmcy5wcm9taXNlcy5jcChwYXJhbXMuc3JjLCBwYXJhbXMuZGVzdCwgeyBmb3JjZTogdHJ1ZSB9KTtcbn1cbiIsIi8qXG4gKiBNSVQgTGljZW5zZVxuICpcbiAqIENvcHlyaWdodCAoYykgMjAyNSAgWXVyaWkgWWFrdWJpbiAoeXVyaWkueWFrdWJpbkBnbWFpbC5jb20pXG4gKlxuICogUGVybWlzc2lvbiBpcyBncmFudGVkIHRvIHVzZSwgY29weSwgbW9kaWZ5LCBhbmQgZGlzdHJpYnV0ZSB0aGlzIHNvZnR3YXJlXG4gKiB1bmRlciB0aGUgTUlUIExpY2Vuc2UuIFNlZSBMSUNFTlNFIGZpbGUgZm9yIGRldGFpbHMuXG4gKi9cblxuaW1wb3J0IGZzIGZyb20gXCJub2RlOmZzXCI7XG5pbXBvcnQgcGF0aCBmcm9tIFwibm9kZTpwYXRoXCI7XG5cbmltcG9ydCBjbWFrZSAgZnJvbSBcIkAvY21ha2VcIjtcbmltcG9ydCB7IGdldFBhdGhTdHJpbmcgfSAgZnJvbSBcIkAvdXRpbHMvRmlsZVN5c3RlbVwiO1xuaW1wb3J0IHsgU2V0dGluZ3NTdG9yYWdlIH0gZnJvbSBcIkAvdXRpbHMvU2V0dGluZ3NTdG9yYWdlXCI7XG5cbmV4cG9ydCBhc3luYyBmdW5jdGlvbiBjbWFrZUFjdGlvbihjb25maWc6IGFueSwgZW52aXJvbm1lbnQ6IGFueSwgc2V0dGluZ3M6IFNldHRpbmdzU3RvcmFnZSkge1xuICBjb25zdCBzb3VyY2VEaXIgPSBnZXRQYXRoU3RyaW5nKGNvbmZpZy5zb3VyY2VEaXIpO1xuICBjb25zdCBiaW5hcnlEaXIgPSBnZXRQYXRoU3RyaW5nKGNvbmZpZy5iaW5hcnlEaXIpO1xuICBjb25zdCBjbWFrZUFyZ3MgPSB7XG4gICAgZW52aXJvbm1lbnQ6IHtcbiAgICAgIC4uLmVudmlyb25tZW50LFxuICAgICAgREVTVERJUjogY29uZmlnLmRlc3REaXIsXG4gICAgfSxcbiAgICBnZW5lcmF0b3I6IGNvbmZpZy5nZW5lcmF0b3IgfHwgY21ha2UuREVGQVVMVF9HRU5FUkFUT1IsXG4gICAgY2FjaGVWYXJpYWJsZXM6IGNvbmZpZy5jYWNoZVZhcmlhYmxlcyxcbiAgICBzb3VyY2VEaXIsXG4gICAgYmluYXJ5RGlyLFxuICB9O1xuXG4gIGlmICghY21ha2VBcmdzLmNhY2hlVmFyaWFibGVzLkNNQUtFX0JVSUxEX1RZUEUpIHtcbiAgICBjbWFrZUFyZ3MuY2FjaGVWYXJpYWJsZXMuQ01BS0VfQlVJTERfVFlQRSA9IGNvbmZpZy5idWlsZFR5cGU7XG4gIH1cblxuICBhd2FpdCBjbWFrZS5jb25maWd1cmUoY21ha2VBcmdzKTtcbiAgYXdhaXQgY21ha2UuYnVpbGQoY21ha2VBcmdzKTtcbiAgYXdhaXQgY21ha2UuaW5zdGFsbChjbWFrZUFyZ3MpO1xufVxuIiwiLypcbiAqIE1JVCBMaWNlbnNlXG4gKlxuICogQ29weXJpZ2h0IChjKSAyMDI1ICBZdXJpaSBZYWt1YmluICh5dXJpaS55YWt1YmluQGdtYWlsLmNvbSlcbiAqXG4gKiBQZXJtaXNzaW9uIGlzIGdyYW50ZWQgdG8gdXNlLCBjb3B5LCBtb2RpZnksIGFuZCBkaXN0cmlidXRlIHRoaXMgc29mdHdhcmVcbiAqIHVuZGVyIHRoZSBNSVQgTGljZW5zZS4gU2VlIExJQ0VOU0UgZmlsZSBmb3IgZGV0YWlscy5cbiAqL1xuXG5pbXBvcnQgcGF0aCBmcm9tIFwibm9kZTpwYXRoXCI7XG5cbmltcG9ydCB7IGdldFBhdGhTdHJpbmcgfSBmcm9tIFwiQC91dGlscy9GaWxlU3lzdGVtXCI7XG5pbXBvcnQgeyBTZXR0aW5nc1N0b3JhZ2UgfSBmcm9tIFwiQC91dGlscy9TZXR0aW5nc1N0b3JhZ2VcIjtcbmltcG9ydCB7IHNwYXduQXN5bmMgfSBmcm9tIFwiQC91dGlscy9DaGlsZFByb2Nlc3NcIjtcblxuZXhwb3J0IGFzeW5jIGZ1bmN0aW9uIGNvbmZpZ3VyZUFjdGlvbihjb25maWc6IGFueSwgZW52aXJvbm1lbnQ6IGFueSwgc2V0dGluZ3M6IFNldHRpbmdzU3RvcmFnZSkge1xuICBjb25zdCBzb3VyY2VEaXIgPSBnZXRQYXRoU3RyaW5nKGNvbmZpZy5zb3VyY2VEaXIpO1xuICBjb25zdCBiaW5hcnlEaXIgPSBnZXRQYXRoU3RyaW5nKGNvbmZpZy5iaW5hcnlEaXIpO1xuICBsZXQgc3RlcCA9IGF3YWl0IHNldHRpbmdzLmdldChcImNvbmZpZ3VyZVwiKSB8fCBcImNvbmZpZ1wiO1xuICBpZiAoc3RlcCA9PT0gXCJjb25maWdcIikge1xuICAgIGNvbnN0IGNvbW1hbmQgPSBwYXRoLnJlc29sdmUoc291cmNlRGlyLCBcImNvbmZpZ3VyZVwiKTtcbiAgICBjb25zdCBwYXJhbXMgPSBbXTtcbiAgICBpZiAoQXJyYXkuaXNBcnJheShjb25maWcudmFyaWFibGVzKSkge1xuICAgICAgZm9yIChjb25zdCBpdGVyIG9mIGNvbmZpZy52YXJpYWJsZXMpXG4gICAgICAgIHBhcmFtcy5wdXNoKGl0ZXIpO1xuICAgIH1cbiAgICBlbHNlIGlmIChjb25maWcudmFyaWFibGVzKSB7XG4gICAgICBmb3IgKGNvbnN0IFtrZXksdmFsXSBvZiBPYmplY3QuZW50cmllcyhjb25maWcudmFyaWFibGVzKSkge1xuICAgICAgICBpZiAoa2V5ID09PSBcImZlYXR1cmVzXCIgJiYgQXJyYXkuaXNBcnJheSh2YWwpKSB7XG4gICAgICAgICAgZm9yIChjb25zdCBpdGVyIG9mIHZhbClcbiAgICAgICAgICAgIHBhcmFtcy5wdXNoKGAtLSR7aXRlcn1gKTtcbiAgICAgICAgfVxuICAgICAgICBlbHNlIGlmICh2YWwgPT09IG51bGwpXG4gICAgICAgICAgcGFyYW1zLnB1c2goYC0tJHtrZXl9YCk7XG4gICAgICAgIGVsc2VcbiAgICAgICAgICBwYXJhbXMucHVzaChgLS0ke2tleX09JHt2YWx9YCk7XG4gICAgICB9XG4gICAgfVxuICAgIGlmIChjb25maWcuZmVhdHVyZXMpIHtcbiAgICAgIGZvciAoY29uc3Qga2V5IG9mIGNvbmZpZy5mZWF0dXJlcylcbiAgICAgICAgcGFyYW1zLnB1c2goYC0tJHtrZXl9YCk7XG4gICAgfVxuICAgIGNvbnN0IHJlczEgPSBhd2FpdCBzcGF3bkFzeW5jKGNvbW1hbmQsIHBhcmFtcywge1xuICAgICAgY3dkOiBiaW5hcnlEaXIsXG4gICAgICBlbnY6IGVudmlyb25tZW50LFxuICAgICAgZXh0cmE6IHtcbiAgICAgICAgb3V0cHV0OiBgYWMuY29uZmlnLmxvZ2AsXG4gICAgICB9LFxuICAgIH0pO1xuICAgIGlmIChyZXMxLnN0YXR1cyAhPT0gMCkge1xuICAgICAgdGhyb3cgbmV3IEVycm9yKGBjb25maWd1cmUgcmV0dXJuZWQgc3RhdHVzICR7cmVzMS5zdGF0dXN9YCk7XG4gICAgfVxuICAgIHN0ZXAgPSBcImluc3RhbGxcIjtcbiAgICBhd2FpdCBzZXR0aW5ncy5zZXQoXCJjb25maWd1cmVcIiwgc3RlcCk7XG4gIH1cbiAgaWYgKHN0ZXAgPT09IFwiaW5zdGFsbFwiKSB7XG4gICAgY29uc3QgYXJncyA9IFsgJ2luc3RhbGwnIF07XG4gICAgaWYgKGNvbmZpZy5kZXN0RGlyKSB7XG4gICAgICBhcmdzLnB1c2goYERFU1RESVI9JHtjb25maWcuZGVzdERpcn1gKTtcbiAgICB9XG4gICAgY29uc3QgcmVzMiA9IGF3YWl0IHNwYXduQXN5bmMoXCJtYWtlXCIsIGFyZ3MsIHtcbiAgICAgIGN3ZDogYmluYXJ5RGlyLFxuICAgICAgZW52OiBlbnZpcm9ubWVudCxcbiAgICAgIGV4dHJhOiB7XG4gICAgICAgIG91dHB1dDogYGFjLmJ1aWxkLmxvZ2AsXG4gICAgICB9LFxuICAgIH0pO1xuICAgIGlmIChyZXMyLnN0YXR1cyAhPT0gMCkge1xuICAgICAgdGhyb3cgbmV3IEVycm9yKGBtYWtlIHJldHVybmVkIHN0YXR1cyAke3JlczIuc3RhdHVzfWApO1xuICAgIH1cbiAgICBzdGVwID0gXCJkb25lXCI7XG4gICAgYXdhaXQgc2V0dGluZ3Muc2V0KFwiY29uZmlndXJlXCIsIHN0ZXApO1xuICB9XG59XG4iLCIvKlxuICogTUlUIExpY2Vuc2VcbiAqXG4gKiBDb3B5cmlnaHQgKGMpIDIwMjUgIFl1cmlpIFlha3ViaW4gKHl1cmlpLnlha3ViaW5AZ21haWwuY29tKVxuICpcbiAqIFBlcm1pc3Npb24gaXMgZ3JhbnRlZCB0byB1c2UsIGNvcHksIG1vZGlmeSwgYW5kIGRpc3RyaWJ1dGUgdGhpcyBzb2Z0d2FyZVxuICogdW5kZXIgdGhlIE1JVCBMaWNlbnNlLiBTZWUgTElDRU5TRSBmaWxlIGZvciBkZXRhaWxzLlxuICovXG5cbmltcG9ydCB7IEZpbGVQYXRoLCBEaXJQYXRoIH0gZnJvbSBcIkAvY29yZS9QYXRoXCI7XG5pbXBvcnQgeyBTY29wZUhlbHBlciB9IGZyb20gXCJAL2NvcmUvU2NvcGVcIjtcbmltcG9ydCB7IFN5c3RlbVNjb3BlIH0gZnJvbSBcIkAvY29yZS9TeXN0ZW1TY29wZVwiO1xuXG5jb25zdCBTQ09QRSAgICAgICAgPSBTeW1ib2woXCJTQ09QRVwiKTtcbmNvbnN0IE5BTUUgICAgICAgICA9IFN5bWJvbChcIk5BTUVcIik7XG5jb25zdCBTQ1JJUFQgICAgICAgPSBTeW1ib2woXCJTQ1JJUFRcIik7XG5jb25zdCBJTlBVVCAgICAgICAgPSBTeW1ib2woXCJJTlBVVFwiKTtcbmNvbnN0IE9VVFBVVCAgICAgICA9IFN5bWJvbChcIk9VVFBVVFwiKTtcbmNvbnN0IFBBUkFNUyAgICAgICA9IFN5bWJvbChcIlBBUkFNU1wiKTtcbmNvbnN0IFdPUktfRElSICAgICA9IFN5bWJvbChcIldPUktfRElSXCIpO1xuY29uc3QgVkFSSUFCTEVTICAgID0gU3ltYm9sKFwiVkFSSUFCTEVTXCIpO1xuXG5leHBvcnQgY2xhc3MgQ3VzdG9tU2NyaXB0IHtcbiAgcHJpdmF0ZSBbU0NPUEVdOiBTeXN0ZW1TY29wZTtcbiAgcHJpdmF0ZSBbTkFNRV06IHN0cmluZztcbiAgcHJpdmF0ZSBbU0NSSVBUXTogRmlsZVBhdGggfCBGdW5jdGlvbjtcbiAgcHJpdmF0ZSBbSU5QVVRdOiBGaWxlUGF0aCB8IHVuZGVmaW5lZDtcbiAgcHJpdmF0ZSBbT1VUUFVUXTogRmlsZVBhdGg7XG4gIHByaXZhdGUgW1BBUkFNU106IG9iamVjdDtcbiAgcHJpdmF0ZSBbV09SS19ESVJdOiBEaXJQYXRoO1xuICBwcml2YXRlIFtWQVJJQUJMRVNdOiBvYmplY3Q7XG5cbiAgcHJpdmF0ZSBjb25zdHJ1Y3RvcihvcHRpb25zOiBDdXN0b21TY3JpcHQuT3B0aW9ucykge1xuICAgIHRoaXNbU0NPUEVdID0gb3B0aW9ucy5zY29wZTtcbiAgICB0aGlzW05BTUVdID0gb3B0aW9ucy5uYW1lIHx8IFwiXCI7XG4gICAgdGhpc1tJTlBVVF0gPSBvcHRpb25zLmlucHV0O1xuICAgIHRoaXNbU0NSSVBUXSA9IG9wdGlvbnMuc2NyaXB0O1xuICAgIHRoaXNbT1VUUFVUXSA9IG9wdGlvbnMub3V0cHV0O1xuICAgIHRoaXNbUEFSQU1TXSA9IG9wdGlvbnMucGFyYW1zO1xuICAgIHRoaXNbV09SS19ESVJdID0gb3B0aW9ucy53b3JrRGlyO1xuICAgIHRoaXNbVkFSSUFCTEVTXSA9IG9wdGlvbnMudmFyaWFibGVzO1xuICB9XG5cbiAgcHVibGljIHN0YXRpYyBjcmVhdGUob3B0aW9uczogQ3VzdG9tU2NyaXB0Lk9wdGlvbnMpOiBDdXN0b21TY3JpcHQge1xuICAgIHJldHVybiBPYmplY3Quc2VhbChuZXcgQ3VzdG9tU2NyaXB0KG9wdGlvbnMpKTtcbiAgfVxuXG4gIHB1YmxpYyBtZXJnZVZhcmlhYmxlcyh2YXJpYWJsZXM6IGFueSkge1xuICAgIFNjb3BlSGVscGVyLm1lcmdlVmFyaWFibGVzKHRoaXNbVkFSSUFCTEVTXSwgdmFyaWFibGVzKTtcbiAgICBTY29wZUhlbHBlci5tZXJnZVZhcmlhYmxlcyh0aGlzW1NDT1BFXSwgdmFyaWFibGVzKTtcbiAgfVxuXG4gIHB1YmxpYyBnZXQgTkFNRSgpIHtcbiAgICByZXR1cm4gdGhpc1tOQU1FXTtcbiAgfVxuXG4gIHB1YmxpYyBnZXQgU0NSSVBUKCkge1xuICAgIHJldHVybiB0aGlzW1NDUklQVF07XG4gIH1cblxuICBwdWJsaWMgZ2V0IElOUFVUKCk6IEZpbGVQYXRoIHwgdW5kZWZpbmVkIHtcbiAgICByZXR1cm4gdGhpc1tJTlBVVF07XG4gIH1cblxuICBwdWJsaWMgZ2V0IE9VVFBVVCgpOiBGaWxlUGF0aCB7XG4gICAgcmV0dXJuIHRoaXNbT1VUUFVUXTtcbiAgfVxuXG4gIHB1YmxpYyBnZXQgUEFSQU1TKCk6IG9iamVjdCB7XG4gICAgcmV0dXJuIHRoaXNbUEFSQU1TXTtcbiAgfVxuXG4gIHB1YmxpYyBzZXQgUEFSQU1TKHZhbHVlOiBvYmplY3QpIHtcbiAgICB0aGlzW1BBUkFNU10gPSB2YWx1ZTtcbiAgfVxuXG4gIHB1YmxpYyBnZXQgd29ya0RpcigpOiBGaWxlUGF0aCB7XG4gICAgcmV0dXJuIHRoaXNbV09SS19ESVJdO1xuICB9XG5cbiAgcHVibGljIGdldCBWQVJJQUJMRVMoKSB7XG4gICAgcmV0dXJuIHRoaXNbVkFSSUFCTEVTXTtcbiAgfVxuXG4gIHB1YmxpYyBnZXQgU0NPUEUoKSB7XG4gICAgcmV0dXJuIHRoaXNbU0NPUEVdO1xuICB9XG5cbiAgcHVibGljIHRvSlNPTigpOiBvYmplY3Qge1xuICAgIHJldHVybiB7XG4gICAgICBTQ09QRTogdGhpc1tTQ09QRV0sXG4gICAgICBOQU1FOiB0aGlzW05BTUVdLFxuICAgICAgU0NSSVBUOiB0aGlzLlNDUklQVCxcbiAgICAgIElOUFVUOiB0aGlzLklOUFVULFxuICAgICAgT1VUUFVUOiB0aGlzLk9VVFBVVCxcbiAgICAgIFBBUkFNUzogdGhpcy5QQVJBTVMsXG4gICAgICBWQVJJQUJMRVM6IHRoaXMuVkFSSUFCTEVTLFxuICAgIH1cbiAgfVxufTtcblxuZXhwb3J0IG5hbWVzcGFjZSBDdXN0b21TY3JpcHQge1xuXG5leHBvcnQgaW50ZXJmYWNlIE9wdGlvbnMge1xuICBzY29wZTogU3lzdGVtU2NvcGUsXG4gIG5hbWU/OiBzdHJpbmcsXG4gIHBhcmFtczogYW55LFxuICBzY3JpcHQ6IEZpbGVQYXRoIHwgRnVuY3Rpb24sXG4gIGlucHV0PzogRmlsZVBhdGgsXG4gIG91dHB1dDogRmlsZVBhdGgsXG4gIHdvcmtEaXI6IERpclBhdGgsXG4gIHZhcmlhYmxlczogb2JqZWN0O1xufTtcblxufSAvLyBuYW1lc3BhY2UgQ3VzdG9tU2NyaXB0XG4iLCIvKlxuICogTUlUIExpY2Vuc2VcbiAqXG4gKiBDb3B5cmlnaHQgKGMpIDIwMjUgIFl1cmlpIFlha3ViaW4gKHl1cmlpLnlha3ViaW5AZ21haWwuY29tKVxuICpcbiAqIFBlcm1pc3Npb24gaXMgZ3JhbnRlZCB0byB1c2UsIGNvcHksIG1vZGlmeSwgYW5kIGRpc3RyaWJ1dGUgdGhpcyBzb2Z0d2FyZVxuICogdW5kZXIgdGhlIE1JVCBMaWNlbnNlLiBTZWUgTElDRU5TRSBmaWxlIGZvciBkZXRhaWxzLlxuICovXG5cbmZ1bmN0aW9uIGNvbnZlcnRWYWx1ZVRvRGVmaW5pdGlvbih2YWx1ZTogYW55KTogc3RyaW5nIHtcbiAgaWYgKHZhbHVlID09PSB1bmRlZmluZWQpXG4gICAgdGhyb3cgYERlZmluaXRpb24gdW5kZWZpbmVkYDtcbiAgaWYgKHR5cGVvZiB2YWx1ZSA9PT0gXCJvYmplY3RcIilcbiAgICByZXR1cm4gJ1wiJyArIEpTT04uc3RyaW5naWZ5KHZhbHVlKSArICdcIic7XG4gIHJldHVybiB2YWx1ZS50b1N0cmluZygpO1xufVxuXG5leHBvcnQgZnVuY3Rpb24gbm9ybWFsaXplRGVmaW5pdGlvbnMoLi4uZGVmaW5pdGlvbnM6IGFueVtdKTogc3RyaW5nW10ge1xuICBjb25zdCByZXN1bHQgPSBbXTtcbiAgZm9yIChjb25zdCBpdGVyIG9mIGRlZmluaXRpb25zKSB7XG4gICAgaWYgKHR5cGVvZiBpdGVyID09PSBcInN0cmluZ1wiKVxuICAgICAgcmVzdWx0LnB1c2goaXRlcik7XG4gICAgZWxzZSBpZiAoIWl0ZXIpXG4gICAgICB0aHJvdyBuZXcgRXJyb3IoYERlZmVuaXRpb24gJHtpdGVyfSBub3Qgc3VwcG9ydGVkYClcbiAgICBlbHNlIGlmIChBcnJheS5pc0FycmF5KGl0ZXIpKSB7XG4gICAgICBmb3IgKGNvbnN0IHZhbCBvZiBpdGVyKVxuICAgICAgICByZXN1bHQucHVzaChjb252ZXJ0VmFsdWVUb0RlZmluaXRpb24odmFsKSk7XG4gICAgfVxuICAgIGVsc2UgaWYgKHR5cGVvZiBpdGVyID09PSBcIm9iamVjdFwiKSB7XG4gICAgICBmb3IgKGNvbnN0IFtrZXksIHZhbF0gb2YgT2JqZWN0LmVudHJpZXMoaXRlcikpXG4gICAgICAgIHJlc3VsdC5wdXNoKGAke2tleX09JHtjb252ZXJ0VmFsdWVUb0RlZmluaXRpb24odmFsKX1gKTtcbiAgICB9XG4gICAgZWxzZVxuICAgICAgdGhyb3cgbmV3IEVycm9yKGBEZWZlbml0aW9uICR7aXRlcn0gbm90IHN1cHBvcnRlZGApXG4gIH1cbiAgcmV0dXJuIHJlc3VsdDtcbn1cbiIsIi8qXG4gKiBNSVQgTGljZW5zZVxuICpcbiAqIENvcHlyaWdodCAoYykgMjAyNSAgWXVyaWkgWWFrdWJpbiAoeXVyaWkueWFrdWJpbkBnbWFpbC5jb20pXG4gKlxuICogUGVybWlzc2lvbiBpcyBncmFudGVkIHRvIHVzZSwgY29weSwgbW9kaWZ5LCBhbmQgZGlzdHJpYnV0ZSB0aGlzIHNvZnR3YXJlXG4gKiB1bmRlciB0aGUgTUlUIExpY2Vuc2UuIFNlZSBMSUNFTlNFIGZpbGUgZm9yIGRldGFpbHMuXG4gKi9cblxuaW1wb3J0IHsgZmluZFByb2dyYW0gfSBmcm9tIFwiQC9jb3JlL0ZpbmRQcm9ncmFtXCI7XG5pbXBvcnQgeyBTeXN0ZW1TY29wZSB9IGZyb20gXCJAL2NvcmUvU3lzdGVtU2NvcGVcIjtcbmltcG9ydCB7IGNyZWF0ZUxvZ2dlciB9IGZyb20gXCJAL2xvZ2dlclwiO1xuXG5jb25zdCBsb2dnZXIgPSBjcmVhdGVMb2dnZXIoaW1wb3J0Lm1ldGEudXJsKTtcblxuZXhwb3J0IGFzeW5jIGZ1bmN0aW9uIGRldGVybWluZUNvbXBpbGVyKHNjb3BlOiBTeXN0ZW1TY29wZSkge1xuICBjb25zdCBjbGFuZ1BhdGggPSBhd2FpdCBmaW5kUHJvZ3JhbShcImNsYW5nXCIpO1xuICBpZiAoY2xhbmdQYXRoKSB7XG4gICAgbG9nZ2VyLmluZm8oXCJUaGUgQyBjb21waWxlciBpZGVudGlmaWNhdGlvbiBpcyBDbGFuZyBhLmIuY1wiKTtcbiAgICBzY29wZS5BU01fQ09NUElMRVIgPSBcImNsYW5nXCI7XG4gICAgc2NvcGUuQ19DT01QSUxFUiA9IFwiY2xhbmdcIjtcbiAgICBzY29wZS5DWFhfQ09NUElMRVIgPSBcImNsYW5nKytcIjtcbiAgICBzY29wZS5BUiA9IFwibGx2bS1hclwiO1xuICAgIHNjb3BlLlJBTkxJQiA9IFwibGx2bS1yYW5saWJcIjtcbiAgICBzY29wZS5MSU5LRVIgPSBcImxsZFwiO1xuICAgIHNjb3BlLk5NID0gXCJsbHZtLW5tXCI7XG4gICAgc2NvcGUuT0JKQ09QWSA9IFwibGx2bS1vYmpjb3B5XCI7XG4gICAgc2NvcGUuT0JKRFVNUCA9IFwibGx2bS1vYmpkdW1wXCI7XG4gICAgc2NvcGUuU1RSSVAgPSBcImxsdm0tc3RyaXBcIjtcbiAgICByZXR1cm47XG4gIH1cblxuICBjb25zdCBnY2NQYXRoID0gYXdhaXQgZmluZFByb2dyYW0oXCJnY2NcIik7XG4gIGlmIChnY2NQYXRoKSB7XG4gICAgbG9nZ2VyLmluZm8oXCJUaGUgQyBjb21waWxlciBpZGVudGlmaWNhdGlvbiBpcyBHTlUgYS5iLmNcIik7XG4gICAgc2NvcGUuQVNNX0NPTVBJTEVSID0gXCJnY2NcIjtcbiAgICBzY29wZS5DX0NPTVBJTEVSID0gXCJnY2NcIjtcbiAgICBzY29wZS5DWFhfQ09NUElMRVIgPSBcImcrK1wiO1xuICAgIHNjb3BlLkFSID0gXCJhclwiO1xuICAgIHNjb3BlLlJBTkxJQiA9IFwicmFubGliXCI7XG4gICAgc2NvcGUuTElOS0VSID0gXCJsZFwiO1xuICAgIHNjb3BlLk5NID0gXCJubVwiO1xuICAgIHNjb3BlLk9CSkNPUFkgPSBcIm9iamNvcHlcIjtcbiAgICBzY29wZS5PQkpEVU1QID0gXCJvYmpkdW1wXCI7XG4gICAgc2NvcGUuU1RSSVAgPSBcInN0cmlwXCI7XG4gICAgcmV0dXJuO1xuICB9XG5cbiAgdGhyb3cgYENhbiBub3QgZGV0ZXJtaW5lIGNvbXBpbGVyYDtcbn1cbiIsIi8qXG4gKiBNSVQgTGljZW5zZVxuICpcbiAqIENvcHlyaWdodCAoYykgMjAyNSAgWXVyaWkgWWFrdWJpbiAoeXVyaWkueWFrdWJpbkBnbWFpbC5jb20pXG4gKlxuICogUGVybWlzc2lvbiBpcyBncmFudGVkIHRvIHVzZSwgY29weSwgbW9kaWZ5LCBhbmQgZGlzdHJpYnV0ZSB0aGlzIHNvZnR3YXJlXG4gKiB1bmRlciB0aGUgTUlUIExpY2Vuc2UuIFNlZSBMSUNFTlNFIGZpbGUgZm9yIGRldGFpbHMuXG4gKi9cblxuaW1wb3J0IG9zIGZyb20gXCJub2RlOm9zXCI7XG5pbXBvcnQgcGF0aCBmcm9tIFwibm9kZTpwYXRoXCI7XG5cbmltcG9ydCB7IGZpbGVFeGlzdHMsIGZpbGVFeGlzdHNTeW5jIH0gZnJvbSBcIkAvdXRpbHMvRmlsZVN5c3RlbVwiO1xuXG5mdW5jdGlvbiBwb3NzaWJsZVByb2dyYW1MaXN0KG5hbWU6IHN0cmluZykge1xuICBpZiAob3MucGxhdGZvcm0oKSA9PT0gXCJ3aW4zMlwiICYmICFuYW1lLmVuZHNXaXRoKFwiLmV4ZVwiKSlcbiAgICBuYW1lICs9IFwiLmV4ZVwiO1xuXG4gIGNvbnN0IHJlc3VsdCA9IFtdO1xuICBjb25zdCBwYXRocyA9IChwcm9jZXNzLmVudi5QQVRIIHx8IFwiXCIpLnNwbGl0KHBhdGgucG9zaXguZGVsaW1pdGVyKTtcbiAgZm9yIChjb25zdCBpdGVyIG9mIHBhdGhzKSB7XG4gICAgY29uc3QgZmlsZW5hbWUgPSBwYXRoLnBvc2l4LnJlc29sdmUoaXRlciwgbmFtZSk7XG4gICAgcmVzdWx0LnB1c2goZmlsZW5hbWUpO1xuICB9XG5cbiAgcmV0dXJuIHJlc3VsdDtcbn1cblxuZXhwb3J0IGFzeW5jIGZ1bmN0aW9uIGZpbmRQcm9ncmFtKG5hbWU6IHN0cmluZyk6IFByb21pc2U8c3RyaW5nIHwgdW5kZWZpbmVkPiB7XG4gIGZvciAoY29uc3QgaXRlciBvZiBwb3NzaWJsZVByb2dyYW1MaXN0KG5hbWUpKSB7XG4gICAgaWYgKGF3YWl0IGZpbGVFeGlzdHMoaXRlcikpXG4gICAgICByZXR1cm4gaXRlcjtcbiAgfVxuICByZXR1cm4gdW5kZWZpbmVkO1xufVxuXG5leHBvcnQgZnVuY3Rpb24gZmluZFByb2dyYW1TeW5jKG5hbWU6IHN0cmluZyk6IHN0cmluZyB8IHVuZGVmaW5lZCB7XG4gIGZvciAoY29uc3QgaXRlciBvZiBwb3NzaWJsZVByb2dyYW1MaXN0KG5hbWUpKSB7XG4gICAgaWYgKGZpbGVFeGlzdHNTeW5jKGl0ZXIpKVxuICAgICAgcmV0dXJuIGl0ZXI7XG4gIH1cbiAgcmV0dXJuIHVuZGVmaW5lZDtcbn1cbiIsIi8qXG4gKiBNSVQgTGljZW5zZVxuICpcbiAqIENvcHlyaWdodCAoYykgMjAyNSAgWXVyaWkgWWFrdWJpbiAoeXVyaWkueWFrdWJpbkBnbWFpbC5jb20pXG4gKlxuICogUGVybWlzc2lvbiBpcyBncmFudGVkIHRvIHVzZSwgY29weSwgbW9kaWZ5LCBhbmQgZGlzdHJpYnV0ZSB0aGlzIHNvZnR3YXJlXG4gKiB1bmRlciB0aGUgTUlUIExpY2Vuc2UuIFNlZSBMSUNFTlNFIGZpbGUgZm9yIGRldGFpbHMuXG4gKi9cblxuaW1wb3J0IG9zIGZyb20gXCJub2RlOm9zXCI7XG5cbmV4cG9ydCBmdW5jdGlvbiBnZXRTaXplb2ZWb2lkcCgpIHtcbiAgY29uc3Qgc2l6ZW9mVm9pZHBCaXRzOiBhbnkgPVxuICB7XG4gICAgYXJtOiAgICAgNCxcbiAgICBhcm02NDogICA4LFxuICAgIGlhMzI6ICAgIDQsXG4gICAgbG9vbmc2NDogOCxcbiAgICBtaXBzOiAgICA0LFxuICAgIG1pcHNlbDogIDQsXG4gICAgcHBjOiAgICAgNCxcbiAgICBwcGM2NDogICA4LFxuICAgIHJpc2N2NjQ6IDgsXG4gICAgczM5MDogICAgNCxcbiAgICBzMzkweDogICA4LFxuICAgIHg2NDogICAgIDQsXG4gIH07XG4gIGNvbnN0IHJlc3VsdCA9IHNpemVvZlZvaWRwQml0c1tvcy5hcmNoKCldO1xuICBpZiAoIXJlc3VsdClcbiAgICB0aHJvdyBuZXcgRXJyb3IoYFVua25vd24gJHtvcy5hcmNoKCl9IGFyY2hgKTtcbiAgcmV0dXJuIHJlc3VsdDtcbn1cbiIsIi8qXG4gKiBNSVQgTGljZW5zZVxuICpcbiAqIENvcHlyaWdodCAoYykgMjAyNSAgWXVyaWkgWWFrdWJpbiAoeXVyaWkueWFrdWJpbkBnbWFpbC5jb20pXG4gKlxuICogUGVybWlzc2lvbiBpcyBncmFudGVkIHRvIHVzZSwgY29weSwgbW9kaWZ5LCBhbmQgZGlzdHJpYnV0ZSB0aGlzIHNvZnR3YXJlXG4gKiB1bmRlciB0aGUgTUlUIExpY2Vuc2UuIFNlZSBMSUNFTlNFIGZpbGUgZm9yIGRldGFpbHMuXG4gKi9cblxuaW1wb3J0IGZzIGZyb20gXCJub2RlOmZzXCI7XG5cbmltcG9ydCB7IEFMTF9UQVJHRVQsIElOU1RBTExfVEFSR0VUIH0gZnJvbSBcIkAvQ29uc3RhbnRzXCI7XG5pbXBvcnQgeyBGaWxlUGF0aCwgRGlyUGF0aCwgQWJzb2x1dGVQYXRoIH0gZnJvbSBcIkAvY29yZS9QYXRoXCI7XG5pbXBvcnQgeyBmaWxlRXhpc3RzLCBmaWxlRXhpc3RzU3luYyB9IGZyb20gXCJAL3V0aWxzL0ZpbGVTeXN0ZW1cIjtcbmltcG9ydCB7IFRhcmdldENvbGxlY3Rpb24sIFRhcmdldFN0cnVjdENvbGxlY3Rpb24gfSBmcm9tIFwiQC9jb3JlLy9UYXJnZXRDb2xsZWN0aW9uXCI7XG5pbXBvcnQgeyBTY3JpcHRDb2xsZWN0aW9uIH0gZnJvbSBcIkAvY29yZS9TY3JpcHRDb2xsZWN0aW9uXCI7XG5pbXBvcnQgeyBJbnRlcmZhY2VUYXJnZXQgfSBmcm9tIFwiQC9jb3JlL0ludGVyZmFjZVRhcmdldFwiO1xuaW1wb3J0IHsgVW5rbm93blRhcmdldCB9IGZyb20gXCJAL2NvcmUvVW5rbm93blRhcmdldFwiO1xuaW1wb3J0IHsgR29hbENvbGxlY3Rpb24gfSBmcm9tIFwiQC9jb3JlL0dvYWxDb2xsZWN0aW9uXCI7XG5pbXBvcnQgeyBJbnRlcmZhY2VPYmplY3RzIH0gZnJvbSBcIkAvY29yZS9JbnRlcmZhY2VPYmplY3RzXCI7XG5pbXBvcnQgeyBJbnRlcmZhY2VTY3JpcHQgfSBmcm9tIFwiQC9jb3JlL0ludGVyZmFjZVNjcmlwdFwiO1xuaW1wb3J0IHsgU291cmNlRmlsZSB9IGZyb20gXCJAL2NvcmUvU291cmNlRmlsZVwiO1xuaW1wb3J0IHsgTWFrZUNvbnRleHQgfSBmcm9tIFwiQC9jb3JlL01ha2VDb250ZXh0XCI7XG5pbXBvcnQgeyBPYmplY3RMaWJyYXJ5LCBTdGF0aWNMaWJyYXJ5LCBTaGFyZWRMaWJyYXJ5LCBFeGVjdXRhYmxlIH0gZnJvbSBcIkAvY29yZS9UYXJnZXRcIjtcbmltcG9ydCB7IFNjb3BlSGVscGVyIH0gZnJvbSBcIkAvY29yZS9TY29wZVwiO1xuaW1wb3J0IHsgU3lzdGVtU2NvcGUgfSBmcm9tIFwiQC9jb3JlL1N5c3RlbVNjb3BlXCI7XG5pbXBvcnQgeyBpbXBvcnRNb2R1bGUgfSBmcm9tIFwiQC91dGlscy9Nb2R1bGVcIjtcbmltcG9ydCB7IGNyZWF0ZUxvZ2dlciB9IGZyb20gXCJAL2xvZ2dlclwiO1xuaW1wb3J0IHsgSW5zdGFsbEVudGl0eSB9IGZyb20gXCJAL2NvcmUvSW5zdGFsbEVudGl0eVwiO1xuaW1wb3J0IHsgQ3VzdG9tU2NyaXB0IH0gZnJvbSBcIkAvY29yZS9DdXN0b21TY3JpcHRcIjtcbmltcG9ydCB7IFNjcmlwdENvbnRleHQgfSBmcm9tIFwiQC9jb3JlL1NjcmlwdENvbnRleHRcIjtcbmltcG9ydCB7IHNwYXduU3luYyB9IGZyb20gXCJub2RlOmNoaWxkX3Byb2Nlc3NcIjtcblxuaW1wb3J0IGNvbmZpZ3VyZV9maWxlIGZyb20gXCJAL2NvcmUvQnVpbGRpblNjcmlwdHMvY29uZmlndXJlX2ZpbGVcIjtcbmltcG9ydCBpbnN0YWxsX3NjcmlwdCBmcm9tIFwiQC9jb3JlL0J1aWxkaW5TY3JpcHRzL2luc3RhbGxfc2NyaXB0XCI7XG5pbXBvcnQgcGF0aCBmcm9tIFwibm9kZTpwYXRoXCI7XG5cbmNvbnN0IGxvZ2dlciA9IGNyZWF0ZUxvZ2dlcihpbXBvcnQubWV0YS51cmwpO1xuXG5jb25zdCByZXF1aXJlSW1wbCA9IGV2YWwoXCJyZXF1aXJlXCIpO1xuXG5jb25zdCBUQVJHRVRTID0gU3ltYm9sKFwiVEFSR0VUU1wiKTtcbmNvbnN0IENVU1RPTV9TQ1JJUFRTID0gU3ltYm9sKFwiQ1VTVE9NX1NDUklQVFNcIik7XG5jb25zdCBDQUNIRSA9IFN5bWJvbChcIkNBQ0hFXCIpO1xuY29uc3QgVU5LTk9XTl9UQVJHRVRTID0gU3ltYm9sKFwiVU5LTk9XTl9UQVJHRVRTXCIpO1xuY29uc3QgSU5URVJGQUNFX1NDUklQVFMgPSBTeW1ib2woXCJJTlRFUkZBQ0VfU0NSSVBUU1wiKTtcbmNvbnN0IElOU1RBTExfTElTVCA9IFN5bWJvbChcIklOU1RBTExfTElTVFwiKTtcbmNvbnN0IFNDUklQVF9WQVJJQUJMRVNfTUFQID0gU3ltYm9sKFwiU0NSSVBUX1ZBUklBQkxFU19NQVBcIik7XG5jb25zdCBTVUJESVJfQUxJQVMgPSBTeW1ib2woXCJTVUJESVJfQUxJQVNcIik7XG5jb25zdCBTVUJESVJfTElTVCA9IFN5bWJvbChcIlNVQkRJUl9MSVNUXCIpO1xuY29uc3QgQlVJTFRJTl9TQ1JJUFRTID0gU3ltYm9sKFwiQlVJTFRJTl9TQ1JJUFRTXCIpO1xuY29uc3QgVEFSR0VUX0NPTExFQ1RJT04gPSBTeW1ib2woXCJUQVJHRVRfQ09MTEVDVElPTlwiKTtcblxudHlwZSBVbmtub3duVGFyZ2V0cyA9IHtcbiAgW25hbWU6IHN0cmluZ106IFVua25vd25UYXJnZXQ7XG59O1xuXG50eXBlIFN1YmRpcmVjdG9yeUFsaWFzID0ge1xuICBbbmFtZTogc3RyaW5nXTogRGlyUGF0aCB8IG51bGw7XG59O1xuXG50eXBlIEludGVyZmFjZVNjcmlwdHMgPSB7XG4gIFtuYW1lOiBzdHJpbmddOiBJbnRlcmZhY2VTY3JpcHQ7XG59O1xuXG50eXBlIENhY2hlVmFyaWFibGVEZXNjcmlwdG9yID0ge1xuICB0eXBlPzogYW55O1xuICB2YWx1ZT86IGFueTtcbiAgZGVzY3JpcHRpb24/OiBzdHJpbmc7XG59O1xuXG50eXBlIENhY2hlVmFyaWFibGVEZXNjcmlwdG9ycyA9IHtcbiAgW25hbWU6IHN0cmluZ106IENhY2hlVmFyaWFibGVEZXNjcmlwdG9yO1xufTtcblxudHlwZSBCdWlsZGluU2NyaXB0cyA9IHtcbiAgW25hbWU6IHN0cmluZ106IEZ1bmN0aW9uO1xufTtcblxuZnVuY3Rpb24gZW5zdXJlVmFsdWVCeVR5cGUodHlwZTogYW55LCB2YWx1ZTogYW55KSB7XG4gIGlmIChBcnJheS5pc0FycmF5KHR5cGUpID8gdHlwZS5pbmNsdWRlcyh2YWx1ZSkgOiB0eXBlb2YgdmFsdWUgPT09IHR5cGUpXG4gICAgcmV0dXJuIHZhbHVlO1xuICB0aHJvdyBuZXcgRXJyb3IoYFRoZSAnJHt2YWx1ZX0nIGlzIG5vdCBhICR7dHlwZX1gKTtcbn1cblxuZnVuY3Rpb24gc2NvcGVWYWx1ZUFzUHJpbWl0aXZlcyhvOiBhbnkpOiBhbnkge1xuICBpZiAodHlwZW9mIG8gPT09IFwidW5kZWZpbmVkXCIpXG4gICAgcmV0dXJuIG87XG4gIGlmICh0eXBlb2YgbyA9PT0gXCJib29sZWFuXCIpXG4gICAgcmV0dXJuIG87XG4gIGlmICh0eXBlb2YgbyA9PT0gXCJudW1iZXJcIilcbiAgICByZXR1cm4gbztcbiAgaWYgKHR5cGVvZiBvID09PSBcInN0cmluZ1wiKVxuICAgIHJldHVybiBvO1xuICBpZiAodHlwZW9mIG8gPT09IFwib2JqZWN0XCIpIHtcbiAgICBpZiAoIW8pXG4gICAgICByZXR1cm4gbztcbiAgICBpZiAobyBpbnN0YW5jZW9mIEFic29sdXRlUGF0aCkge1xuICAgICAgcmV0dXJuIG8udG9TdHJpbmcoKTtcbiAgICB9XG4gICAgaWYgKG8gaW5zdGFuY2VvZiBBcnJheSkge1xuICAgICAgY29uc3QgcmVzdWx0ID0gW107XG4gICAgICBmb3IgKGNvbnN0IGkgb2YgbylcbiAgICAgICAgcmVzdWx0LnB1c2goc2NvcGVWYWx1ZUFzUHJpbWl0aXZlcyhpKSk7XG4gICAgICByZXR1cm4gcmVzdWx0O1xuICAgIH1cbiAgICBpZiAobyBpbnN0YW5jZW9mIE9iamVjdCkge1xuICAgICAgY29uc3QgcmVzdWx0OiBhbnkgPSB7fTtcbiAgICAgIGZvciAoY29uc3QgW2ssdl0gb2YgT2JqZWN0LmVudHJpZXMobykpXG4gICAgICAgIHJlc3VsdFtrXSA9IHNjb3BlVmFsdWVBc1ByaW1pdGl2ZXModik7XG4gICAgICByZXR1cm4gcmVzdWx0O1xuICAgIH1cbiAgfVxuICB0aHJvdyBuZXcgRXJyb3IoYFVua25vd24gaW5zdGFuY2Ugb2YgJHtvfWApO1xufVxuXG50eXBlIEdvYWxIYW5kbGVyID0gKCkgPT4gUHJvbWlzZTx2b2lkPiB8IHZvaWQ7XG5cbmNsYXNzIEdvYWxXb3JrZXJJbXBsIHtcbiAgcHJpdmF0ZSBfbWVzc2FnZTogc3RyaW5nIHwgdW5kZWZpbmVkO1xuICBwcml2YXRlIF9uYW1lOiBzdHJpbmcgfCB1bmRlZmluZWQ7XG4gIHByaXZhdGUgX291dHB1dDogc3RyaW5nIHwgdW5kZWZpbmVkO1xuICBwcml2YXRlIF9kZXBlbmRzOiBzdHJpbmdbXTtcbiAgcHJpdmF0ZSBfY2FsbGJhY2tzOiBHb2FsSGFuZGxlcltdO1xuXG4gIGNvbnN0cnVjdG9yKG5hbWU/OiBzdHJpbmcpIHtcbiAgICB0aGlzLl9uYW1lID0gbmFtZTtcbiAgICB0aGlzLl9kZXBlbmRzID0gW107XG4gICAgdGhpcy5fY2FsbGJhY2tzID0gW107XG4gIH1cblxuICBnZXQgbWVzc2FnZSgpOiBzdHJpbmcgfCB1bmRlZmluZWQge1xuICAgIHJldHVybiB0aGlzLl9tZXNzYWdlO1xuICB9XG5cbiAgc2V0IG1lc3NhZ2UodmFsdWU6IHN0cmluZykge1xuICAgIHRoaXMuX21lc3NhZ2UgPSB2YWx1ZTtcbiAgfVxuXG4gIGdldCBuYW1lKCk6IHN0cmluZyB8IHVuZGVmaW5lZCB7XG4gICAgcmV0dXJuIHRoaXMuX25hbWU7XG4gIH1cblxuICBnZXQgb3V0cHV0KCk6IHN0cmluZyB8IHVuZGVmaW5lZCB7XG4gICAgcmV0dXJuIHRoaXMuX291dHB1dDtcbiAgfVxuXG4gIHNldCBvdXRwdXQodmFsdWU6IHN0cmluZykge1xuICAgIHRoaXMuX291dHB1dCA9IHZhbHVlO1xuICB9XG5cbiAgZ2V0IGRlcGVuZHMoKTogc3RyaW5nW10ge1xuICAgIHJldHVybiB0aGlzLl9kZXBlbmRzO1xuICB9XG5cbiAgcHVibGljIGFkZERlcGVuZGVuY3koLi4udmFsdWU6IHN0cmluZ1tdKSB7XG4gICAgdGhpcy5fZGVwZW5kcy5wdXNoKC4uLnZhbHVlKTtcbiAgfVxuXG4gIHB1YmxpYyBhZGRDYWxsYmFjayhoYW5kbGVyOiBHb2FsSGFuZGxlcikge1xuICAgIHRoaXMuX2NhbGxiYWNrcy5wdXNoKGhhbmRsZXIpO1xuICB9XG5cbiAgYXN5bmMgZG9Xb3JrKCk6IFByb21pc2U8dm9pZD4ge1xuICAgIGlmICh0aGlzLl9vdXRwdXQpXG4gICAgICBhd2FpdCBmcy5wcm9taXNlcy5ta2RpcihwYXRoLnBvc2l4LmRpcm5hbWUodGhpcy5fb3V0cHV0KSwgeyByZWN1cnNpdmU6IHRydWUgfSk7XG5cbiAgICBmb3IgKGNvbnN0IGZ1bmMgb2YgdGhpcy5fY2FsbGJhY2tzKSB7XG4gICAgICBjb25zdCByZXMgPSBmdW5jKCk7XG4gICAgICBpZiAocmVzIGluc3RhbmNlb2YgUHJvbWlzZSlcbiAgICAgICAgYXdhaXQgcmVzO1xuICAgIH1cbiAgfVxuXG4gIHVwZGF0ZVByb2dyZXNzKGV2ZW50OiB7IGxvYWRlZDogbnVtYmVyLCB0b3RhbDogbnVtYmVyIH0pOiB2b2lkIHtcbiAgICBpZiAodGhpcy5fbWVzc2FnZSkge1xuICAgICAgY29uc3QgcmVsYXRpb25PZkxlbmd0aCA9IE1hdGgucm91bmQoKCsrZXZlbnQubG9hZGVkIC8gZXZlbnQudG90YWwpICogMTAwKTtcbiAgICAgIGNvbnN0IHBlcmNlbnQgPSBcIltcIiArIHJlbGF0aW9uT2ZMZW5ndGgudG9TdHJpbmcoKS5wYWRTdGFydCgzLCBcIiBcIikgKyBcIiVdIFwiO1xuICAgICAgY29uc29sZS5pbmZvKHBlcmNlbnQgKyB0aGlzLl9tZXNzYWdlKTtcbiAgICB9XG4gIH1cblxuICBhZGRFeGVjKGNvbW1hbmQ6IHN0cmluZywgYXJnczogc3RyaW5nW10sIGN3ZDogc3RyaW5nKTogdm9pZCB7XG4gICAgdGhpcy5hZGRDYWxsYmFjaygoKSA9PiB7XG4gICAgICBjb25zdCByZXN1bHQgPSBzcGF3blN5bmMoY29tbWFuZCwgYXJncywgeyBjd2QsIGVuY29kaW5nOiBcInV0Zi04XCIgfSk7XG4gICAgICBpZiAocmVzdWx0LmVycm9yIHx8IHJlc3VsdC5zdGF0dXMpIHtcbiAgICAgICAgbG9nZ2VyLmluZm8oXCJjZCBcIiArIGN3ZCk7XG4gICAgICAgIGxldCBjbWQgPSBhcmdzLmpvaW4oXCIgXCIpO1xuICAgICAgICBjbWQgPSBjb21tYW5kICsgKGNtZCA/IFwiIFwiIDogXCJcIikgKyBjbWQ7XG4gICAgICAgIGxvZ2dlci5pbmZvKGNtZCk7XG4gICAgICAgIGxvZ2dlci5pbmZvKFwiXCIpO1xuICAgIFxuICAgICAgICBsb2dnZXIuZXJyb3IocmVzdWx0LnN0ZGVycik7XG4gICAgXG4gICAgICAgIGlmIChyZXN1bHQuZXJyb3IpXG4gICAgICAgICAgICB0aHJvdyByZXN1bHQuZXJyb3I7XG4gICAgXG4gICAgICAgIHRocm93IG5ldyBFcnJvcihyZXN1bHQuZXJyb3IgYXMgYW55IHx8IFwiU3RhdHVzIFwiICsgcmVzdWx0LnN0YXR1cyk7XG4gICAgICB9XG4gICAgICBpZiAocmVzdWx0LnN0ZG91dCkge1xuICAgICAgICBmb3IgKGNvbnN0IGxpbmUgb2YgcmVzdWx0LnN0ZG91dC50cmltKCkuc3BsaXQoXCJcXG5cIikpIHtcbiAgICAgICAgICBsb2dnZXIuaW5mbyhsaW5lKTtcbiAgICAgICAgfVxuICAgICAgfVxuICAgIH0pXG4gIH1cblxuICBhZGRTY3JpcHQoZ2xvYmFsOiBHbG9iYWxDb250ZXh0LCBzY29wZTogU3lzdGVtU2NvcGUsIHNjcmlwdDogRmlsZVBhdGggfCBGdW5jdGlvbiwgcGFyYW1zOiBhbnkpOiB2b2lkIHtcbiAgICB0aGlzLmFkZENhbGxiYWNrKGFzeW5jICgpID0+IHtcbiAgICAgIGxldCBmdW5jOiBhbnkgPSBzY3JpcHQ7XG4gICAgICBpZiAoc2NyaXB0IGluc3RhbmNlb2YgRmlsZVBhdGgpXG4gICAgICAgIGZ1bmMgPSAoYXdhaXQgaW1wb3J0TW9kdWxlKGZ1bmMudG9TdHJpbmcoKSkpLmRlZmF1bHQ7XG4gICAgICBpZiAoZnVuYyBpbnN0YW5jZW9mIEZ1bmN0aW9uKSB7XG4gICAgICAgIGNvbnN0IG1rID0gU2NyaXB0Q29udGV4dC5jcmVhdGUoc2NvcGUsIGdsb2JhbCk7XG4gICAgICAgIGNvbnN0IHJlc3VsdCA9IGZ1bmMobWssIHNjb3BlVmFsdWVBc1ByaW1pdGl2ZXMocGFyYW1zKSk7XG4gICAgICAgIGlmIChyZXN1bHQgaW5zdGFuY2VvZiBQcm9taXNlKVxuICAgICAgICAgIGF3YWl0IHJlc3VsdDtcbiAgICAgIH1cbiAgICAgIGVsc2Uge1xuICAgICAgICB0aHJvdyBuZXcgRXJyb3IoYFRoZXJlIGlzIG5vIEZ1bmN0aW9uYCk7XG4gICAgICB9XG4gICAgfSk7XG4gIH1cbn07XG5cbmV4cG9ydCBjbGFzcyBHbG9iYWxDb250ZXh0IHtcbiAgcHJpdmF0ZSBbVEFSR0VUX0NPTExFQ1RJT05dID0gbmV3IFRhcmdldFN0cnVjdENvbGxlY3Rpb247XG4gIHByaXZhdGUgW1RBUkdFVFNdOiBUYXJnZXRDb2xsZWN0aW9uO1xuICBwcml2YXRlIFtDVVNUT01fU0NSSVBUU106IFNjcmlwdENvbGxlY3Rpb247XG4gIHByaXZhdGUgW0NBQ0hFXTogQ2FjaGVWYXJpYWJsZURlc2NyaXB0b3JzO1xuICBwcml2YXRlIFtVTktOT1dOX1RBUkdFVFNdOiBVbmtub3duVGFyZ2V0cztcbiAgcHJpdmF0ZSBbSU5URVJGQUNFX1NDUklQVFNdOiBJbnRlcmZhY2VTY3JpcHRzO1xuICBwcml2YXRlIFtJTlNUQUxMX0xJU1RdOiBJbnN0YWxsRW50aXR5W107XG4gIHByaXZhdGUgW1NDUklQVF9WQVJJQUJMRVNfTUFQXTogYW55O1xuICBwcml2YXRlIFtTVUJESVJfQUxJQVNdOiBTdWJkaXJlY3RvcnlBbGlhcztcbiAgcHJpdmF0ZSBbU1VCRElSX0xJU1RdOiBTeXN0ZW1TY29wZVtdO1xuICBwcml2YXRlIFtCVUlMVElOX1NDUklQVFNdOiBCdWlsZGluU2NyaXB0cztcblxuICBwcml2YXRlIGNvbnN0cnVjdG9yKCkge1xuICAgIHRoaXNbVEFSR0VUU10gPSBUYXJnZXRDb2xsZWN0aW9uLmNyZWF0ZSgpO1xuICAgIHRoaXNbQ1VTVE9NX1NDUklQVFNdID0gU2NyaXB0Q29sbGVjdGlvbi5jcmVhdGUoKTtcbiAgICB0aGlzW0NBQ0hFXSA9IHt9O1xuICAgIHRoaXNbVU5LTk9XTl9UQVJHRVRTXSA9IHt9O1xuICAgIHRoaXNbSU5URVJGQUNFX1NDUklQVFNdID0ge307XG4gICAgdGhpc1tJTlNUQUxMX0xJU1RdID0gW107XG4gICAgdGhpc1tTQ1JJUFRfVkFSSUFCTEVTX01BUF0gPSB7fTtcbiAgICB0aGlzW1NVQkRJUl9BTElBU10gPSB7fTtcbiAgICB0aGlzW1NVQkRJUl9MSVNUXSA9IFtdO1xuICAgIHRoaXNbQlVJTFRJTl9TQ1JJUFRTXSA9IHtcbiAgICAgIGNvbmZpZ3VyZV9maWxlLFxuICAgICAgaW5zdGFsbF9zY3JpcHQsXG4gICAgfTtcbiAgfVxuXG4gIHB1YmxpYyBzdGF0aWMgY3JlYXRlKCkge1xuICAgIHJldHVybiBPYmplY3Quc2VhbChuZXcgR2xvYmFsQ29udGV4dCk7XG4gIH1cblxuICBwdWJsaWMgZ2V0IFRBUkdFVFMoKSB7XG4gICAgcmV0dXJuIHRoaXNbVEFSR0VUU107XG4gIH1cblxuICBwdWJsaWMgZ2V0IENBQ0hFKCkge1xuICAgIHJldHVybiB0aGlzW0NBQ0hFXTtcbiAgfVxuXG4gIHB1YmxpYyBnZXQgVU5LTk9XTl9UQVJHRVRTKCkge1xuICAgIHJldHVybiB0aGlzW1VOS05PV05fVEFSR0VUU107XG4gIH1cblxuICBwdWJsaWMgZ2V0IElOVEVSRkFDRV9TQ1JJUFRTKCkge1xuICAgIHJldHVybiB0aGlzW0lOVEVSRkFDRV9TQ1JJUFRTXTtcbiAgfVxuXG4gIHB1YmxpYyBnZXQgU0NSSVBUX1ZBUklBQkxFU19NQVAoKSB7XG4gICAgcmV0dXJuIHRoaXNbU0NSSVBUX1ZBUklBQkxFU19NQVBdO1xuICB9XG5cbiAgcHVibGljIGFkZEN1c3RvbVNjcmlwdChzY29wZTogU3lzdGVtU2NvcGUsIHNjcmlwdDogYW55LCBwYXJhbXM6IGFueSk6IEN1c3RvbVNjcmlwdCB7XG4gICAgaWYgKCFwYXJhbXMpXG4gICAgICB0aHJvdyBuZXcgRXJyb3IoXCJBcmd1bWVudCB3aXRoIHBhcmFtZXRlcnMgaXMgbWlzc2luZ1wiKTtcblxuICAgIGxldCBzY3JpcHRPYmo6IEZ1bmN0aW9uIHwgRmlsZVBhdGggfCB1bmRlZmluZWQ7XG4gICAgaWYgKHR5cGVvZiBzY3JpcHQgPT09IFwic3RyaW5nXCIpXG4gICAgICBzY3JpcHRPYmogPSB0aGlzLmZpbmRTY3JpcHRGdW5jdGlvbihzY3JpcHQpO1xuICAgIGlmICghc2NyaXB0T2JqKVxuICAgICAgc2NyaXB0T2JqID0gRmlsZVBhdGguY3JlYXRlKHNjb3BlLlNPVVJDRV9ESVIucmVzb2x2ZShzY3JpcHQpKTtcblxuICAgIGxldCBpbnB1dEZpbGUgPSBwYXJhbXMuU0NSSVBUX0lOUFVUO1xuICAgIGlmIChpbnB1dEZpbGUpXG4gICAgICBpbnB1dEZpbGUgPSBGaWxlUGF0aC5jcmVhdGUoc2NvcGUuU09VUkNFX0RJUi5yZXNvbHZlKGlucHV0RmlsZSkpO1xuXG4gICAgaWYgKCFwYXJhbXMuU0NSSVBUX09VVFBVVClcbiAgICAgIHRocm93IG5ldyBFcnJvcihcIkN1c3RvbVNjcmlwdCBwYXJhbWV0ZXJzIHJlcXVpcmVkIG91dHB1dCBlbnRpdHlcIik7XG4gICAgY29uc3Qgb3V0cHV0RmlsZSA9IEZpbGVQYXRoLmNyZWF0ZShzY29wZS5TT1VSQ0VfRElSLnJlc29sdmUocGFyYW1zLlNDUklQVF9PVVRQVVQpKTtcblxuICAgIGNvbnN0IG9wdGlvbnM6IEN1c3RvbVNjcmlwdC5PcHRpb25zID0ge1xuICAgICAgc2NvcGUsXG4gICAgICBuYW1lOiBwYXJhbXMuU0NSSVBUX05BTUUsXG4gICAgICBzY3JpcHQ6IHNjcmlwdE9iaixcbiAgICAgIHBhcmFtcyxcbiAgICAgIG91dHB1dDogb3V0cHV0RmlsZSxcbiAgICAgIGlucHV0OiBpbnB1dEZpbGUsXG4gICAgICB3b3JrRGlyOiBzY29wZS5CSU5BUllfRElSLFxuICAgICAgdmFyaWFibGVzOiBwYXJhbXMudmFyaWFibGVzIHx8IHt9LFxuICAgIH07XG5cbiAgICBjb25zdCB0YXJnZXQgPSBDdXN0b21TY3JpcHQuY3JlYXRlKG9wdGlvbnMpO1xuICAgIGlmIChvcHRpb25zLm5hbWUpXG4gICAgICB0aGlzW0NVU1RPTV9TQ1JJUFRTXS5zZXQob3B0aW9ucy5uYW1lLCB0YXJnZXQpO1xuICAgIGVsc2VcbiAgICAgIHRoaXNbQ1VTVE9NX1NDUklQVFNdLmFkZCh0YXJnZXQpO1xuXG4gICAgcmV0dXJuIHRhcmdldDtcbiAgfVxuXG4gIHB1YmxpYyByZWdpc3RlclN5c3RlbVNjb3BlKG5hbWU6IHN0cmluZywgc2NvcGU6IFN5c3RlbVNjb3BlKSB7XG4gICAgaWYgKHRoaXNbU0NSSVBUX1ZBUklBQkxFU19NQVBdW25hbWVdKVxuICAgICAgdGhyb3cgbmV3IEVycm9yKGBTeXN0ZW1WYXJpYWJsZXMgZXhpc3RzIGZvciAke25hbWV9YCk7XG4gICAgdGhpc1tTQ1JJUFRfVkFSSUFCTEVTX01BUF1bbmFtZV0gPSBzY29wZTtcbiAgfVxuXG4gIHB1YmxpYyByZXNvbHZlU3ViZGlyZWN0b3J5KHBhdGg6IEFic29sdXRlUGF0aCB8IHN0cmluZykge1xuICAgIGNvbnN0IHJlc29sdmVkUGF0aCA9IHRoaXNbU1VCRElSX0FMSUFTXVtwYXRoLnRvU3RyaW5nKCldO1xuICAgIGlmIChyZXNvbHZlZFBhdGggPT09IHVuZGVmaW5lZClcbiAgICAgIHJldHVybiBwYXRoO1xuICAgIGlmIChyZXNvbHZlZFBhdGggPT09IG51bGwpXG4gICAgICByZXR1cm4gdW5kZWZpbmVkO1xuICAgIHJldHVybiByZXNvbHZlZFBhdGg7XG4gIH1cblxuICBwdWJsaWMgYWRkU3ViZGlyZWN0b3J5QWxpYXMoc3JjOiBEaXJQYXRoLCBkZXN0OiBEaXJQYXRoIHwgbnVsbCkge1xuICAgIGNvbnN0IHNyY1N0ciA9IHNyYy50b1N0cmluZygpO1xuICAgIGlmICh0aGlzW1NVQkRJUl9BTElBU10uaGFzT3duUHJvcGVydHkoc3JjU3RyKSlcbiAgICAgIGxvZ2dlci53YXJuKGBPd2VycmlkZSBcIiR7c3JjU3RyfVwiIHN1YmRpcmVjdG9yeSBhbGlhc2ApO1xuICAgIHRoaXNbU1VCRElSX0FMSUFTXVtzcmNTdHJdID0gZGVzdDtcbiAgfVxuXG4gIHB1YmxpYyBhZGRJbnN0YWxsRW50cnkoZW50cnk6IEluc3RhbGxFbnRpdHkpIHtcbiAgICByZXR1cm4gdGhpc1tJTlNUQUxMX0xJU1RdLnB1c2goZW50cnkpO1xuICB9XG5cbiAgcHVibGljIGFkZENhY2hlVmFyaWFibGVzKHZhcmlhYmxlczogQ2FjaGVWYXJpYWJsZURlc2NyaXB0b3JzKSB7XG4gICAgY29uc3QgY2FjaGUgPSB0aGlzW0NBQ0hFXTtcbiAgICBmb3IgKGNvbnN0IFtrZXksIGVudHJ5XSBvZiBPYmplY3QuZW50cmllcyh2YXJpYWJsZXMpKSB7XG4gICAgICBjYWNoZVtrZXldID0gZW50cnk7XG4gICAgfVxuICB9XG5cbiAgcHVibGljIGxvYWRDYWNoZVZhcmlhYmxlcyhmaWxlbmFtZTogQWJzb2x1dGVQYXRoIHwgc3RyaW5nKSB7XG4gICAgaWYgKGZpbGVFeGlzdHNTeW5jKGZpbGVuYW1lLnRvU3RyaW5nKCkpKSB7XG4gICAgICBjb25zdCB2YXJpYWJsZXMgPSByZXF1aXJlSW1wbChmaWxlbmFtZS50b1N0cmluZygpKTtcbiAgICAgIHRoaXMuYWRkQ2FjaGVWYXJpYWJsZXModmFyaWFibGVzKTtcbiAgICB9XG4gIH1cblxuICBwdWJsaWMgY29weUNhY2hlVmFyaWFibGVzKHNjb3BlOiBhbnkpIHtcbiAgICBmb3IgKGNvbnN0IFtuYW1lLCBlbnRyeV0gb2YgT2JqZWN0LmVudHJpZXModGhpc1tDQUNIRV0pKSB7XG4gICAgICBpZiAoIU9iamVjdC5oYXNPd24oc2NvcGUsIG5hbWUpKSB7XG4gICAgICAgIGNvbnN0IHR5cGUgPSBlbnRyeS50eXBlIHx8IHR5cGVvZiBlbnRyeS52YWx1ZTtcbiAgICAgICAgY29uc3QgZGVzY3JpcHRpb24gPSBlbnRyeS5kZXNjcmlwdGlvbiB8fCBcIlwiO1xuICAgICAgICBsZXQgdmFsdWUgPSBBcnJheS5pc0FycmF5KGVudHJ5LnZhbHVlKSA/IFsgLi4uZW50cnkudmFsdWUgXSA6IGVudHJ5LnZhbHVlO1xuICAgICAgICBpZiAodmFsdWUgPT09IFwiJHtQUk9KRUNUX1ZFUlNJT059XCIpXG4gICAgICAgICAgdmFsdWUgPSBzY29wZS5QUk9KRUNUX1ZFUlNJT047XG4gICAgICAgIGVsc2UgaWYgKHZhbHVlID09PSBcIiR7UFJPSkVDVF9ERVNDUklQVElPTn1cIilcbiAgICAgICAgICB2YWx1ZSA9IHNjb3BlLlBST0pFQ1RfREVTQ1JJUFRJT047XG4gICAgICAgIGVsc2UgaWYgKHZhbHVlID09PSBcIiR7UFJPSkVDVF9IT01FUEFHRV9VUkx9XCIpXG4gICAgICAgICAgdmFsdWUgPSBzY29wZS5QUk9KRUNUX0hPTUVQQUdFX1VSTDtcbiAgICAgICAgZWxzZSBpZiAoZW50cnkudmFsdWUgPT09IFwiJHtDTUFLRV9TWVNURU1fUFJPQ0VTU09SfVwiKVxuICAgICAgICAgIHZhbHVlID0gc2NvcGUuU1lTVEVNX1BST0NFU1NPUjtcbiAgXG4gICAgICAgIGNvbnN0IG5hbWVTeW1ib2wgPSBTeW1ib2wobmFtZSk7XG4gICAgICAgIHNjb3BlW25hbWVTeW1ib2xdID0gZW5zdXJlVmFsdWVCeVR5cGUodHlwZSwgdmFsdWUpO1xuICBcbiAgICAgICAgT2JqZWN0LmRlZmluZVByb3BlcnR5KHNjb3BlLCBuYW1lLCB7XG4gICAgICAgICAgZW51bWVyYWJsZTogdHJ1ZSxcbiAgICAgICAgICBnZXQoKSB7XG4gICAgICAgICAgICByZXR1cm4gdGhpc1tuYW1lU3ltYm9sXTtcbiAgICAgICAgICB9LFxuICAgICAgICAgIHNldCh2YWx1ZSkge1xuICAgICAgICAgICAgdGhpc1tuYW1lU3ltYm9sXSA9IGVuc3VyZVZhbHVlQnlUeXBlKHR5cGUsIHZhbHVlKTtcbiAgICAgICAgICB9LFxuICAgICAgICB9KTtcbiAgICAgIH1cbiAgICB9XG4gIH1cblxuICBwdWJsaWMgYWRkU3RhdGljTGlicmFyeShzY29wZTogU3lzdGVtU2NvcGUsIG5hbWU6IHN0cmluZywgLi4uc291cmNlczogYW55W10pOiBTdGF0aWNMaWJyYXJ5IHtcbiAgICBjb25zdCBpbXBsID0gdGhpc1tUQVJHRVRfQ09MTEVDVElPTl0uZ2V0KG5hbWUpO1xuICAgIGNvbnN0IHRhcmdldCA9IFN0YXRpY0xpYnJhcnkuY3JlYXRlKGltcGwsIHNjb3BlKTtcbiAgICB0YXJnZXQuYWRkU291cmNlcyguLi5zb3VyY2VzKTtcbiAgICB0aGlzW1RBUkdFVFNdLnNldChuYW1lLCB0YXJnZXQpO1xuICAgIHJldHVybiB0YXJnZXQ7XG4gIH1cblxuICBwdWJsaWMgYWRkT2JqZWN0TGlicmFyeShzY29wZTogU3lzdGVtU2NvcGUsIG5hbWU6IHN0cmluZywgLi4uc291cmNlczogYW55W10pOiBPYmplY3RMaWJyYXJ5IHtcbiAgICBjb25zdCBpbXBsID0gdGhpc1tUQVJHRVRfQ09MTEVDVElPTl0uZ2V0KG5hbWUpO1xuICAgIGNvbnN0IHRhcmdldCA9IE9iamVjdExpYnJhcnkuY3JlYXRlKGltcGwsIHNjb3BlKTtcbiAgICB0YXJnZXQuYWRkU291cmNlcyguLi5zb3VyY2VzKTtcbiAgICB0aGlzW1RBUkdFVFNdLnNldChuYW1lLCB0YXJnZXQpO1xuICAgIHJldHVybiB0YXJnZXQ7XG4gIH1cblxuICBwdWJsaWMgYWRkU2hhcmVkTGlicmFyeShzY29wZTogU3lzdGVtU2NvcGUsIG5hbWU6IHN0cmluZywgLi4uc291cmNlczogYW55W10pOiBTaGFyZWRMaWJyYXJ5IHtcbiAgICBjb25zdCBpbXBsID0gdGhpc1tUQVJHRVRfQ09MTEVDVElPTl0uZ2V0KG5hbWUpO1xuICAgIGNvbnN0IHRhcmdldCA9IFNoYXJlZExpYnJhcnkuY3JlYXRlKGltcGwsIHNjb3BlKTtcbiAgICB0YXJnZXQuYWRkU291cmNlcyguLi5zb3VyY2VzKTtcbiAgICB0aGlzW1RBUkdFVFNdLnNldChuYW1lLCB0YXJnZXQpO1xuICAgIHJldHVybiB0YXJnZXQ7XG4gIH1cblxuICBwdWJsaWMgYWRkRXhlY3V0YWJsZShzY29wZTogU3lzdGVtU2NvcGUsIG5hbWU6IHN0cmluZywgLi4uc291cmNlczogYW55W10pOiBFeGVjdXRhYmxlIHtcbiAgICBjb25zdCBpbXBsID0gdGhpc1tUQVJHRVRfQ09MTEVDVElPTl0uZ2V0KG5hbWUpO1xuICAgIGNvbnN0IHRhcmdldCA9IEV4ZWN1dGFibGUuY3JlYXRlKGltcGwsIHNjb3BlKTtcbiAgICB0YXJnZXQuYWRkU291cmNlcyguLi5zb3VyY2VzKTtcbiAgICB0aGlzW1RBUkdFVFNdLnNldChuYW1lLCB0YXJnZXQpO1xuICAgIHJldHVybiB0YXJnZXQ7XG4gIH1cblxuICBwdWJsaWMgZ2V0VWtub3duVGFyZ2V0KG5hbWU6IHN0cmluZyk6IFVua25vd25UYXJnZXQge1xuICAgIGxldCB0YXJnZXQgPSB0aGlzW1VOS05PV05fVEFSR0VUU11bbmFtZV07XG4gICAgaWYgKCF0YXJnZXQpIHtcbiAgICAgIGNvbnN0IGltcGwgPSB0aGlzW1RBUkdFVF9DT0xMRUNUSU9OXS5nZXQobmFtZSk7XG4gICAgICB0aGlzW1VOS05PV05fVEFSR0VUU11bbmFtZV0gPSB0YXJnZXQgPSBVbmtub3duVGFyZ2V0LmNyZWF0ZShpbXBsKTtcbiAgICB9XG4gICAgcmV0dXJuIHRhcmdldDtcbiAgfVxuXG4gIHB1YmxpYyB3cml0ZUNhY2hlVmFyaWFibGVzKGZpbGVuYW1lOiBzdHJpbmcpIHtcbiAgICBjb25zdCBqc29uID0gSlNPTi5zdHJpbmdpZnkodGhpc1tDQUNIRV0sIG51bGwsIDIpO1xuICAgIGZzLndyaXRlRmlsZVN5bmMoZmlsZW5hbWUsIGpzb24sIFwidXRmLThcIik7XG4gIH1cblxuICBwdWJsaWMgYWRkU3ViZGlyZWN0b3J5KHNjb3BlOiBhbnkpIHtcbiAgICB0aGlzW1NVQkRJUl9MSVNUXS5wdXNoKHNjb3BlKTtcbiAgfVxuXG4gIHB1YmxpYyBmaW5kU2NyaXB0RnVuY3Rpb24obmFtZTogc3RyaW5nKTogRnVuY3Rpb24gfCB1bmRlZmluZWQge1xuICAgIHJldHVybiB0aGlzW0JVSUxUSU5fU0NSSVBUU11bbmFtZV07XG4gIH1cbiAgXG4gIHB1YmxpYyBhc3luYyBkb1N1YmRpcmVjdG9yeSgpIHtcbiAgICB3aGlsZSAodGhpc1tTVUJESVJfTElTVF0ubGVuZ3RoKSB7XG4gICAgICBjb25zdCBzY29wZSA9IHRoaXNbU1VCRElSX0xJU1RdLnNoaWZ0KCk7XG4gICAgICBpZiAoIXNjb3BlKVxuICAgICAgICBjb250aW51ZTtcblxuICAgICAgbGV0IHNjcmlwdEZpbGU6IEFic29sdXRlUGF0aCB8IHVuZGVmaW5lZDtcbiAgICAgIGNvbnN0IGZpbGVMaXN0ID0gWyBcIi5qc1wiLCBcIi5tanNcIiBdLm1hcChpID0+IFwiTWFrZVNjcmlwdFwiICsgaSk7XG4gICAgICBmb3IgKGNvbnN0IGZpbGVuYW1lIG9mIGZpbGVMaXN0KSB7XG4gICAgICAgIGNvbnN0IGl0ZXIgPSBzY29wZS5TT1VSQ0VfRElSLmpvaW4oZmlsZW5hbWUpO1xuICAgICAgICBpZiAoYXdhaXQgZmlsZUV4aXN0cyhpdGVyLnRvU3RyaW5nKCkpKSB7XG4gICAgICAgICAgc2NyaXB0RmlsZSA9IGl0ZXI7XG4gICAgICAgICAgYnJlYWs7XG4gICAgICAgIH1cbiAgICAgIH1cblxuICAgICAgaWYgKCFzY3JpcHRGaWxlKVxuICAgICAgICB0aHJvdyBuZXcgRXJyb3IoYFRoZXJlIGFyZSBubyBmaWxlcyAke2ZpbGVMaXN0LmpvaW4oXCIsIFwiKX0gaW4gXCIke3Njb3BlLlNPVVJDRV9ESVJ9XCJgKTtcblxuICAgICAgdGhpcy5yZWdpc3RlclN5c3RlbVNjb3BlKHNjcmlwdEZpbGUudG9TdHJpbmcoKSwgc2NvcGUpO1xuXG4gICAgICBzY29wZS5TQ1JJUFRfRklMRSA9IHNjcmlwdEZpbGU7XG4gICAgICBzY29wZS5TQ1JJUFRfRElSID0gc2NvcGUuU0NSSVBUX0ZJTEUuZGlybmFtZSgpO1xuXG4gICAgICBjb25zdCBjd2RTYXZlID0gcHJvY2Vzcy5jd2QoKTtcbiAgICAgIHByb2Nlc3MuY2hkaXIoc2NvcGUuU09VUkNFX0RJUi50b1N0cmluZygpKTtcblxuICAgICAgY29uc3QgbW9kdWxlID0gYXdhaXQgaW1wb3J0TW9kdWxlKHNjb3BlLlNDUklQVF9GSUxFLnRvU3RyaW5nKCkpO1xuICAgICAgaWYgKCFtb2R1bGUuZGVmYXVsdClcbiAgICAgICAgdGhyb3cgbmV3IEVycm9yKGBTdWJkaXJlY3RvcnkgJHtzY29wZS5TQ1JJUFRfRklMRS5iYXNlbmFtZSgpfSBub3QgY29udGFpbiBkZWZhdWx0IGZ1bmN0aW9uYCk7XG4gICAgICBjb25zdCBtayA9IE1ha2VDb250ZXh0LmNyZWF0ZShzY29wZSwgdGhpcyk7XG4gICAgICBjb25zdCByZXN1bHQgPSBtb2R1bGUuZGVmYXVsdChtayk7XG4gICAgICBpZiAocmVzdWx0IGluc3RhbmNlb2YgUHJvbWlzZSlcbiAgICAgICAgYXdhaXQgcmVzdWx0O1xuICAgICAgU2NvcGVIZWxwZXIuYXBwbHlWYXJpYWJsZXMoc2NvcGUsIG1rKTtcblxuICAgICAgcHJvY2Vzcy5jaGRpcihjd2RTYXZlKTtcbiAgICB9XG4gIH1cblxuICBwdWJsaWMgY3JlYXRlR29hbHMoc2NvcGU6IFN5c3RlbVNjb3BlKTogR29hbENvbGxlY3Rpb24ge1xuICAgIGZvciAoY29uc3QgaXRlciBvZiBPYmplY3QudmFsdWVzKHRoaXNbVU5LTk9XTl9UQVJHRVRTXSkpIHtcbiAgICAgIGNvbnN0IHRhcmdldCA9IHRoaXNbVEFSR0VUU10uZ2V0KGl0ZXIuTkFNRSk7XG4gICAgICB0YXJnZXQuYWRkU291cmNlcyhpdGVyLlNPVVJDRVMpO1xuICAgICAgdGFyZ2V0LklOQ0xVREVTLnB1c2goLi4uaXRlci5JTkNMVURFUyk7XG4gICAgICB0YXJnZXQuREVGSU5FUy5wdXNoKC4uLml0ZXIuREVGSU5FUyk7XG4gICAgICB0YXJnZXQuQ09NUElMRV9PUFRJT05TLnB1c2goLi4uaXRlci5DT01QSUxFX09QVElPTlMpO1xuICAgICAgdGFyZ2V0LkxJTktfT1BUSU9OUy5wdXNoKC4uLml0ZXIuTElOS19PUFRJT05TKTtcbiAgICB9XG4gIFxuICAgIGZvciAoY29uc3QgaXRlciBvZiBPYmplY3QudmFsdWVzKHRoaXNbSU5URVJGQUNFX1NDUklQVFNdKSkge1xuICAgICAgY29uc3Qgc2NyaXB0ID0gdGhpc1tDVVNUT01fU0NSSVBUU10uZ2V0KGl0ZXIuTkFNRSk7XG4gICAgICBpZiAoIXNjcmlwdClcbiAgICAgICAgdGhyb3cgbmV3IEVycm9yKGBUaGVyZSBpcyBubyBDdXN0b21TY3JpcHQgbmFtZWQgJHtpdGVyLk5BTUV9YCk7XG4gICAgICBzY3JpcHQubWVyZ2VWYXJpYWJsZXMoaXRlci5WQVJJQUJMRVMpO1xuICAgIH1cbiAgXG4gICAgY29uc3QgZ29hbExpc3QgPSBHb2FsQ29sbGVjdGlvbi5jcmVhdGUoKTtcbiAgICBmb3IgKGNvbnN0IHNjcmlwdCBvZiB0aGlzW0NVU1RPTV9TQ1JJUFRTXS5FTlRSSUVTKSB7ICAgXG4gICAgICBjb25zdCBkZXBlbmRzID0gW107XG4gICAgICBpZiAoc2NyaXB0LlNDUklQVCBpbnN0YW5jZW9mIEZpbGVQYXRoKVxuICAgICAgICBkZXBlbmRzLnB1c2goc2NyaXB0LlNDUklQVC50b1N0cmluZygpKTtcbiAgICAgIGlmIChzY3JpcHQuSU5QVVQpXG4gICAgICAgIGRlcGVuZHMucHVzaChzY3JpcHQuSU5QVVQudG9TdHJpbmcoKSk7XG4gICAgICBjb25zdCBtc2cgPSBcIlxceDFiWzM2bVwiICsgXCJHZW5lcmF0aW5nIFwiICsgc2NyaXB0LndvcmtEaXIucmVsYXRpdmUoc2NyaXB0Lk9VVFBVVCkgKyBcIlxceDFiWzBtXCI7XG4gICAgICBjb25zdCBwYXJhbXMgPSB7IC4uLnNjcmlwdC5WQVJJQUJMRVMsIC4uLnNjcmlwdC5QQVJBTVMgfTtcbiAgICAgIGNvbnN0IHdvcmtlciA9IG5ldyBHb2FsV29ya2VySW1wbChzY3JpcHQuTkFNRSk7XG4gICAgICB3b3JrZXIubWVzc2FnZSA9IG1zZztcbiAgICAgIHdvcmtlci5vdXRwdXQgPSBzY3JpcHQuT1VUUFVULnRvU3RyaW5nKCk7XG4gICAgICB3b3JrZXIuYWRkRGVwZW5kZW5jeSguLi5kZXBlbmRzKTtcbiAgICAgIHdvcmtlci5hZGRTY3JpcHQodGhpcywgc2NyaXB0LlNDT1BFLCBzY3JpcHQuU0NSSVBULCBwYXJhbXMpO1xuICAgICAgZ29hbExpc3QuYWRkKHdvcmtlcik7XG4gICAgfVxuICBcbiAgICBmb3IgKGNvbnN0IFtuYW1lLCB0YXJnZXRdIG9mIE9iamVjdC5lbnRyaWVzKHRoaXNbVEFSR0VUU10uRU5UUklFUykpIHtcbiAgICAgIGNvbnN0IGhlYWRlcnMgPSB0aGlzW1RBUkdFVFNdLmFsbEhlYWRlcnNPZih0YXJnZXQpO1xuICAgICAgY29uc3QgZGVwZW5kcyA9IFtdO1xuICAgICAgZm9yIChjb25zdCBzIG9mIHRhcmdldC5TT1VSQ0VTIGFzIGFueSkge1xuICAgICAgICBpZiAocyBpbnN0YW5jZW9mIEludGVyZmFjZU9iamVjdHMpIHtcbiAgICAgICAgICBjb25zdCB0ID0gdGhpc1tUQVJHRVRTXS5nZXQocy50YXJnZXROYW1lKTtcbiAgICAgICAgICBmb3IgKGNvbnN0IGYgb2YgdC5TT1VSQ0VTKSB7XG4gICAgICAgICAgICBpZiAoZiBpbnN0YW5jZW9mIFNvdXJjZUZpbGUgJiYgZi5PQkpFQ1RfRklMRSlcbiAgICAgICAgICAgICAgZGVwZW5kcy5wdXNoKGYuT0JKRUNUX0ZJTEUudG9TdHJpbmcoKSk7XG4gICAgICAgICAgfVxuICAgICAgICAgIGNvbnRpbnVlO1xuICAgICAgICB9XG4gIFxuICAgICAgICBpZiAocy5IRUFERVJfRklMRV9PTkxZKVxuICAgICAgICAgIGNvbnRpbnVlO1xuICBcbiAgICAgICAgZnMubWtkaXJTeW5jKHMuT0JKRUNUX0ZJTEVfRElSLnRvU3RyaW5nKCksIHsgcmVjdXJzaXZlOiB0cnVlIH0pO1xuICBcbiAgICAgICAgY29uc3QgcmVsYXRpdmVPYmplY3QgPSB0YXJnZXQuVEFSR0VUX1NDT1BFLkJJTkFSWV9ESVIucmVsYXRpdmUocy5PQkpFQ1RfRklMRSk7XG4gICAgICAgIGNvbnN0IHJlbGF0aXZlQmluYXJ5RGlyID0gc2NvcGUuUFJPSkVDVF9CSU5BUllfRElSLnJlbGF0aXZlKHRhcmdldC5UQVJHRVRfU0NPUEUuQklOQVJZX0RJUik7XG4gICAgICAgIGNvbnN0IG1zZyA9IFwiXFx4MWJbMzJtXCIgKyBgQnVpbGRpbmcgJHtzLkxBTkdVQUdFfSBvYmplY3QgJHtyZWxhdGl2ZUJpbmFyeURpcn0vJHtyZWxhdGl2ZU9iamVjdH1gICsgXCJcXHgxYlswbVwiO1xuICBcbiAgICAgICAgY29uc3QgZGVmaW5pdGlvbnMgPSBbXG4gICAgICAgICAgLi4udGhpc1tUQVJHRVRTXS5hbGxEZWZpbml0aW9uc09mKHRhcmdldCksXG4gICAgICAgICAgLi4ucy5ERUZJTkVTLFxuICAgICAgICBdO1xuXG4gICAgICAgIGNvbnN0IGFyZ3M6IHN0cmluZ1tdID0gW107XG4gICAgICAgIGFyZ3MucHVzaCguLi5kZWZpbml0aW9ucy5tYXAoaSA9PiBcIi1EXCIgKyBpKSk7XG4gICAgICAgIGFyZ3MucHVzaCguLi50aGlzW1RBUkdFVFNdLmFsbEluY2x1ZGVzT2YodGFyZ2V0KS5tYXAoaSA9PiBcIi1JXCIgKyBpKSk7XG4gICAgICAgIGFyZ3MucHVzaCguLi50aGlzW1RBUkdFVFNdLmFsbENvbXBpbGVPcHRpb25zT2YodGFyZ2V0KSk7XG4gICAgICAgIGlmICh0YXJnZXQuUE9TSVRJT05fSU5ERVBFTkRFTlRfQ09ERSlcbiAgICAgICAgICBhcmdzLnB1c2goXCItZlBJQ1wiKTtcbiAgICAgICAgYXJncy5wdXNoKC4uLnMuQ09NUElMRV9GTEFHUy5mbGF0KCkpO1xuICAgICAgICBhcmdzLnB1c2goXCItb1wiLCByZWxhdGl2ZU9iamVjdCk7XG4gICAgICAgIGFyZ3MucHVzaChcIi1jXCIsIHMuRklMRSk7XG4gIFxuICAgICAgICBjb25zdCBjb21tYW5kID0gKHRhcmdldC5UQVJHRVRfU0NPUEUgYXMgYW55KVtzLkxBTkdVQUdFICsgXCJfQ09NUElMRVJcIl0udG9TdHJpbmcoKTtcbiAgICAgICAgY29uc3Qgb3V0cHV0ID0gRGlyUGF0aC5jcmVhdGUodGFyZ2V0LlRBUkdFVF9TQ09QRS5CSU5BUllfRElSLmpvaW4ocmVsYXRpdmVPYmplY3QpKTtcbiAgICAgICAgZGVwZW5kcy5wdXNoKG91dHB1dC50b1N0cmluZygpKTtcblxuICAgICAgICBjb25zdCB3b3JrZXIgPSBuZXcgR29hbFdvcmtlckltcGw7XG4gICAgICAgIHdvcmtlci5tZXNzYWdlID0gbXNnO1xuICAgICAgICB3b3JrZXIub3V0cHV0ID0gb3V0cHV0LnRvU3RyaW5nKCk7XG4gICAgICAgIHdvcmtlci5hZGREZXBlbmRlbmN5KC4uLmhlYWRlcnMpO1xuICAgICAgICB3b3JrZXIuYWRkRGVwZW5kZW5jeShzLkZJTEUpO1xuICAgICAgICB3b3JrZXIuYWRkRXhlYyhjb21tYW5kLCBhcmdzLCB0YXJnZXQuVEFSR0VUX1NDT1BFLkJJTkFSWV9ESVIudG9TdHJpbmcoKSk7XG4gICAgICAgIGdvYWxMaXN0LmFkZCh3b3JrZXIpO1xuICAgICAgfVxuXG4gICAgICBjb25zdCBnZW5lcmFsR29hbCA9IG5ldyBHb2FsV29ya2VySW1wbDtcbiAgICAgIGZvciAoY29uc3QgcGFyYW1zIG9mIHRhcmdldC5JTVBMLnByZUJ1aWxkTGlzdCkge1xuICAgICAgICBnZW5lcmFsR29hbC5hZGRFeGVjKHBhcmFtcy5jb21tYW5kLnRvU3RyaW5nKCksIHBhcmFtcy5hcmdzLm1hcChpID0+IGkudG9TdHJpbmcoKSksIHRhcmdldC5UQVJHRVRfU0NPUEUuQklOQVJZX0RJUi50b1N0cmluZygpKTtcbiAgICAgIH1cblxuICAgICAgY29uc3QgbGlua09wdGlvbnMgPSB0aGlzW1RBUkdFVFNdLmFsbExpbmtPcHRpb25zT2YodGFyZ2V0KTtcbiAgICAgIGlmICh0YXJnZXQgaW5zdGFuY2VvZiBPYmplY3RMaWJyYXJ5KSB7XG4gICAgICAgIGNvbnN0IG9ianMgPSBkZXBlbmRzLmZpbHRlcihpID0+IGkuZW5kc1dpdGgoXCIub1wiKSB8fCBpLmVuZHNXaXRoKFwiLm9ialwiKSkubWFwKGkgPT4gdGFyZ2V0LkZJTEVfRElSLnJlbGF0aXZlKGkpKTtcbiAgICAgICAgaWYgKG9ianMubGVuZ3RoKSB7XG4gICAgICAgICAgY29uc3QgYXJncyA9IFtcbiAgICAgICAgICAgIC4uLmxpbmtPcHRpb25zLFxuICAgICAgICAgICAgXCItclwiLFxuICAgICAgICAgICAgXCItb1wiLCB0YXJnZXQuRklMRV9OQU1FLFxuICAgICAgICAgICAgLi4ub2Jqc1xuICAgICAgICAgIF07XG4gICAgICAgICAgZ2VuZXJhbEdvYWwubWVzc2FnZSA9IGBMaW5raW5nIENYWCBvYmplY3QgbGlicmFyeSAke3RhcmdldC5GSUxFX05BTUV9YDtcbiAgICAgICAgICBnZW5lcmFsR29hbC5vdXRwdXQgPSB0YXJnZXQuRklMRS50b1N0cmluZygpO1xuICAgICAgICAgIGdlbmVyYWxHb2FsLmFkZERlcGVuZGVuY3koLi4uZGVwZW5kcyk7XG4gICAgICAgICAgZ2VuZXJhbEdvYWwuYWRkRXhlYyhzY29wZS5MSU5LRVIsIGFyZ3MsIHRhcmdldC5GSUxFX0RJUi50b1N0cmluZygpKTtcbiAgICAgICAgfVxuICAgICAgICBlbHNlIHtcbiAgICAgICAgICBsb2dnZXIuaW5mbyhgTm8gb2JqZWN0cyBmb3IgXCIke3RhcmdldC5OQU1FfVwiYCk7XG4gICAgICAgIH1cbiAgICAgIH1cbiAgXG4gICAgICBpZiAodGFyZ2V0IGluc3RhbmNlb2YgU3RhdGljTGlicmFyeSkge1xuICAgICAgICBjb25zdCBvYmpzID0gZGVwZW5kcy5maWx0ZXIoaSA9PiBpLmVuZHNXaXRoKFwiLm9cIikgfHwgaS5lbmRzV2l0aChcIi5vYmpcIikpLm1hcChpID0+IHRhcmdldC5GSUxFX0RJUi5yZWxhdGl2ZShpKSk7XG4gICAgICAgIGlmIChvYmpzLmxlbmd0aCkge1xuICAgICAgICAgIGNvbnN0IGFyZ3MgPSBbIFwicmNcIiwgdGFyZ2V0LkZJTEVfTkFNRSAsIC4uLm9ianMgXTtcbiAgICAgICAgICBnZW5lcmFsR29hbC5tZXNzYWdlID0gYExpbmtpbmcgQ1hYIHN0YXRpYyBsaWJyYXJ5ICR7dGFyZ2V0LkZJTEVfTkFNRX1gO1xuICAgICAgICAgIGdlbmVyYWxHb2FsLm91dHB1dCA9IHRhcmdldC5GSUxFLnRvU3RyaW5nKCk7XG4gICAgICAgICAgZ2VuZXJhbEdvYWwuYWRkRGVwZW5kZW5jeSguLi5kZXBlbmRzKTtcbiAgICAgICAgICBnZW5lcmFsR29hbC5hZGRFeGVjKHNjb3BlLkFSLCBhcmdzLCB0YXJnZXQuRklMRV9ESVIudG9TdHJpbmcoKSk7XG4gICAgICAgIH1cbiAgICAgICAgZWxzZSB7XG4gICAgICAgICAgbG9nZ2VyLmluZm8oYE5vIG9iamVjdHMgZm9yIFwiJHt0YXJnZXQuTkFNRX1cImApO1xuICAgICAgICB9XG4gICAgICB9XG4gIFxuICAgICAgaWYgKHRhcmdldCBpbnN0YW5jZW9mIFNoYXJlZExpYnJhcnkpIHtcbiAgICAgICAgdGhyb3cgbmV3IEVycm9yKFwiTm90IGltcGxlbWVudGVkXCIpO1xuICAgICAgfVxuXG4gICAgICBpZiAodGFyZ2V0IGluc3RhbmNlb2YgRXhlY3V0YWJsZSkge1xuICAgICAgICBjb25zdCBvYmpzID0gZGVwZW5kcy5maWx0ZXIoaSA9PiBpLmVuZHNXaXRoKFwiLm9cIikgfHwgaS5lbmRzV2l0aChcIi5vYmpcIikpLm1hcChpID0+IHRhcmdldC5GSUxFX0RJUi5yZWxhdGl2ZShpKSk7XG4gICAgICAgIGlmIChvYmpzLmxlbmd0aCkge1xuICAgICAgICAgIGNvbnN0IGxpYnMgPSB0aGlzW1RBUkdFVFNdLmFsbExpYnJhcmllc09mKHRhcmdldCk7XG4gICAgICAgICAgY29uc3QgYXJncyA9IFtcbiAgICAgICAgICAgIC4uLnRhcmdldC5UQVJHRVRfU0NPUEUuQ1hYX0ZMQUdTLFxuICAgICAgICAgICAgLi4ubGlua09wdGlvbnMsXG4gICAgICAgICAgICAuLi5vYmpzLFxuICAgICAgICAgICAgXCItb1wiLCB0YXJnZXQuRklMRV9OQU1FLFxuICAgICAgICAgICAgLi4ubGlicy5tYXAoaSA9PiB0YXJnZXQuRklMRV9ESVIucmVsYXRpdmUoaSkpLFxuICAgICAgICAgIF07XG5cbiAgICAgICAgICBnZW5lcmFsR29hbC5tZXNzYWdlID0gYExpbmtpbmcgQ1hYIGV4ZWN1dGFibGUgJHt0YXJnZXQuRklMRV9OQU1FfWA7XG4gICAgICAgICAgZ2VuZXJhbEdvYWwub3V0cHV0ID0gdGFyZ2V0LkZJTEUudG9TdHJpbmcoKTtcbiAgICAgICAgICBnZW5lcmFsR29hbC5hZGREZXBlbmRlbmN5KC4uLmRlcGVuZHMpO1xuICAgICAgICAgIGdlbmVyYWxHb2FsLmFkZERlcGVuZGVuY3koLi4ubGlicyk7XG4gICAgICAgICAgZ2VuZXJhbEdvYWwuYWRkRXhlYyhzY29wZS5DWFhfQ09NUElMRVIsIGFyZ3MsIHRhcmdldC5GSUxFX0RJUi50b1N0cmluZygpKTtcbiAgICAgICAgfVxuICAgICAgICBlbHNlIHtcbiAgICAgICAgICBsb2dnZXIuaW5mbyhgTm8gb2JqZWN0cyBmb3IgXCIke3RhcmdldC5OQU1FfVwiYCk7XG4gICAgICAgIH1cbiAgICAgIH1cblxuICAgICAgZm9yIChjb25zdCBwYXJhbXMgb2YgdGFyZ2V0LklNUEwucG9zdEJ1aWxkTGlzdCkge1xuICAgICAgICBnZW5lcmFsR29hbC5hZGRFeGVjKHBhcmFtcy5jb21tYW5kLnRvU3RyaW5nKCksIHBhcmFtcy5hcmdzLm1hcChpID0+IGkudG9TdHJpbmcoKSksIHRhcmdldC5UQVJHRVRfU0NPUEUuQklOQVJZX0RJUi50b1N0cmluZygpKTtcbiAgICAgIH1cbiAgICAgIFxuICAgICAgZ29hbExpc3QuYWRkKGdlbmVyYWxHb2FsKTtcblxuICAgICAgY29uc3Qgd29ya2VyID0gbmV3IEdvYWxXb3JrZXJJbXBsKG5hbWUpO1xuICAgICAgd29ya2VyLm1lc3NhZ2UgPSBgQnVpbHQgdGFyZ2V0ICR7bmFtZX1gO1xuICAgICAgd29ya2VyLmFkZERlcGVuZGVuY3kodGFyZ2V0LkZJTEUudG9TdHJpbmcoKSk7XG4gICAgICBnb2FsTGlzdC5hZGQod29ya2VyKTtcbiAgICB9XG5cbiAgICBpbnRlcmZhY2UgSW5zdGFsbEdvYWxQYXJhbXMge1xuICAgICAgc3JjOiBzdHJpbmc7XG4gICAgICBkZXN0OiBzdHJpbmc7XG4gICAgfTtcblxuICAgIGNvbnN0IGluc3RhbGxQYWlycyA9IG5ldyBBcnJheTxJbnN0YWxsR29hbFBhcmFtcz47XG4gICAgZm9yIChjb25zdCBpdGVyIG9mIHRoaXNbSU5TVEFMTF9MSVNUXSkge1xuICAgICAgbGV0IHNyYzogc3RyaW5nLCBkZXN0OiBhbnk7XG4gICAgICBpZiAoaXRlci5WQUxVRSBpbnN0YW5jZW9mIEFic29sdXRlUGF0aCkge1xuICAgICAgICBpZiAoc2NvcGUuUFJFVkVOVF9JTlNUQUxMX0ZJTEVTKVxuICAgICAgICAgIGNvbnRpbnVlO1xuICAgICAgICBzcmMgPSBpdGVyLlZBTFVFLnRvU3RyaW5nKCk7XG4gICAgICAgIGNvbnN0IHJmaWxlID0gKGl0ZXIuQkFTRV9ESVIgYXMgYW55KS5yZWxhdGl2ZShpdGVyLlZBTFVFKTtcbiAgICAgICAgZGVzdCA9IGl0ZXIuREVTVElOQVRJT04uam9pbihyZmlsZSk7XG4gICAgICB9XG4gICAgICBlbHNlIGlmIChpdGVyLlZBTFVFIGluc3RhbmNlb2YgSW50ZXJmYWNlVGFyZ2V0KSB7XG4gICAgICAgIGNvbnN0IHRhcmdldCA9IHRoaXNbVEFSR0VUU10uZ2V0KGl0ZXIuVkFMVUUudGFyZ2V0TmFtZSk7XG4gICAgICAgIHNyYyA9IHRhcmdldC5GSUxFLnRvU3RyaW5nKCk7XG4gICAgICAgIGRlc3QgPSBpdGVyLkRFU1RJTkFUSU9OLmpvaW4odGFyZ2V0LkZJTEVfTkFNRSk7XG4gICAgICB9XG4gICAgICBlbHNlIHtcbiAgICAgICAgdGhyb3cgbmV3IEVycm9yKGBDYW4gbm90IGluc3RhbGwgJHtpdGVyLlZBTFVFfWApXG4gICAgICB9XG4gICAgICBpZiAoc2NvcGUuREVTVERJUilcbiAgICAgICAgZGVzdCA9IHNjb3BlLkRFU1RESVIuam9pbihkZXN0KS50b1N0cmluZygpO1xuICAgICAgZGVzdCA9IGRlc3QudG9TdHJpbmcoKTtcbiAgICAgIGluc3RhbGxQYWlycy5wdXNoKHtzcmMsIGRlc3R9KTtcbiAgICB9XG5cbiAgICBpZiAoaW5zdGFsbFBhaXJzLmxlbmd0aCkge1xuICAgICAgY29uc3Qgd29ya2VyID0gbmV3IEdvYWxXb3JrZXJJbXBsKElOU1RBTExfVEFSR0VUKTtcbiAgICAgIGluc3RhbGxQYWlycy5mb3JFYWNoKGkgPT4gdm9pZCB3b3JrZXIuYWRkRGVwZW5kZW5jeShpLnNyYykpO1xuICAgICAgd29ya2VyLmFkZENhbGxiYWNrKGFzeW5jICgpID0+IHtcbiAgICAgICAgZm9yIChjb25zdCBpdGVyIG9mIGluc3RhbGxQYWlycylcbiAgICAgICAgICBhd2FpdCBpbnN0YWxsX3NjcmlwdChzY29wZVZhbHVlQXNQcmltaXRpdmVzKGl0ZXIpKTtcbiAgICAgIH0pO1xuICAgICAgZ29hbExpc3QuYWRkKHdvcmtlcik7XG4gICAgfVxuXG4gICAgY29uc3Qgd29ya2VyID0gbmV3IEdvYWxXb3JrZXJJbXBsKEFMTF9UQVJHRVQpO1xuICAgIE9iamVjdC5rZXlzKHRoaXNbVEFSR0VUU10uRU5UUklFUykuZm9yRWFjaChpID0+IHZvaWQgd29ya2VyLmFkZERlcGVuZGVuY3koaSkpXG4gICAgZ29hbExpc3QuYWRkKHdvcmtlcik7XG4gIFxuICAgIHJldHVybiBnb2FsTGlzdDtcbiAgfVxuXG4gIHB1YmxpYyB0b0pTT04oKSB7XG4gICAgcmV0dXJuIHtcbiAgICAgIFRBUkdFVFM6IHRoaXMuVEFSR0VUUyxcbiAgICAgIENVU1RPTV9TQ1JJUFRTOiB0aGlzW0NVU1RPTV9TQ1JJUFRTXSxcbiAgICAgIENBQ0hFOiB0aGlzLkNBQ0hFLFxuICAgICAgVU5LTk9XTl9UQVJHRVRTOiB0aGlzLlVOS05PV05fVEFSR0VUUyxcbiAgICAgIElOVEVSRkFDRV9TQ1JJUFRTOiB0aGlzLklOVEVSRkFDRV9TQ1JJUFRTLFxuICAgICAgSU5TVEFMTF9MSVNUOiB0aGlzW0lOU1RBTExfTElTVF0sXG4gICAgICBTQ1JJUFRfVkFSSUFCTEVTX01BUDogdGhpcy5TQ1JJUFRfVkFSSUFCTEVTX01BUCxcbiAgICAgIFNVQkRJUl9BTElBUzogdGhpc1tTVUJESVJfQUxJQVNdLFxuICAgICAgVEFSR0VUX0NPTExFQ1RJT046IHRoaXNbVEFSR0VUX0NPTExFQ1RJT05dLFxuICAgIH07XG4gIH1cbn07XG4iLCIvKlxuICogTUlUIExpY2Vuc2VcbiAqXG4gKiBDb3B5cmlnaHQgKGMpIDIwMjUgIFl1cmlpIFlha3ViaW4gKHl1cmlpLnlha3ViaW5AZ21haWwuY29tKVxuICpcbiAqIFBlcm1pc3Npb24gaXMgZ3JhbnRlZCB0byB1c2UsIGNvcHksIG1vZGlmeSwgYW5kIGRpc3RyaWJ1dGUgdGhpcyBzb2Z0d2FyZVxuICogdW5kZXIgdGhlIE1JVCBMaWNlbnNlLiBTZWUgTElDRU5TRSBmaWxlIGZvciBkZXRhaWxzLlxuICovXG5cbmNvbnN0IEVOVFJJRVMgPSBTeW1ib2woXCJFTlRSSUVTXCIpO1xuXG5leHBvcnQgaW50ZXJmYWNlIEdvYWxXb3JrZXIge1xuICBkb1dvcmsoKTogUHJvbWlzZTx2b2lkPjtcbiAgdXBkYXRlUHJvZ3Jlc3MoZXZlbnQ6IHsgbG9hZGVkOiBudW1iZXIsIHRvdGFsOiBudW1iZXIgfSk6IHZvaWQ7XG5cbiAgZ2V0IG5hbWUoKTogc3RyaW5nIHwgdW5kZWZpbmVkO1xuICBnZXQgb3V0cHV0KCk6IHN0cmluZyB8IHVuZGVmaW5lZDtcbiAgZ2V0IGRlcGVuZHMoKTogc3RyaW5nW107XG59O1xuXG5leHBvcnQgY2xhc3MgR29hbENvbGxlY3Rpb24ge1xuICBwcml2YXRlIFtFTlRSSUVTXTogQXJyYXk8R29hbFdvcmtlcj47XG5cbiAgcHJpdmF0ZSBjb25zdHJ1Y3RvcigpIHtcbiAgICB0aGlzW0VOVFJJRVNdID0gbmV3IEFycmF5PEdvYWxXb3JrZXI+O1xuICB9XG5cbiAgcHVibGljIGdldCBFTlRSSUVTKCkge1xuICAgIHJldHVybiB0aGlzW0VOVFJJRVNdO1xuICB9XG5cbiAgcHVibGljIHN0YXRpYyBjcmVhdGUoKSB7XG4gICAgcmV0dXJuIE9iamVjdC5zZWFsKG5ldyBHb2FsQ29sbGVjdGlvbik7XG4gIH1cblxuICBwdWJsaWMgYWRkKHdvcmtlcjogR29hbFdvcmtlcikge1xuICAgIGlmICh3b3JrZXIubmFtZSAmJiB0aGlzW0VOVFJJRVNdLmZpbmQoKGkpID0+IGkubmFtZSA9PT0gd29ya2VyLm5hbWUpKVxuICAgICAgdGhyb3cgbmV3IEVycm9yKGBObWFlIFwiJHt3b3JrZXIubmFtZX1cIiBleGlzdHNgKTtcbiAgICBpZiAod29ya2VyLm91dHB1dCAmJiB0aGlzW0VOVFJJRVNdLmZpbmQoKGkpID0+IGkub3V0cHV0ID09PSB3b3JrZXIub3V0cHV0KSlcbiAgICAgIHRocm93IG5ldyBFcnJvcihgT3V0cHV0IFwiJHt3b3JrZXIub3V0cHV0fVwiIGV4aXN0c2ApO1xuICAgIHRoaXNbRU5UUklFU10ucHVzaCh3b3JrZXIpO1xuICB9XG5cbiAgcHVibGljIGdldFRhcmdldChuYW1lOiBzdHJpbmcpOiBHb2FsV29ya2VyIHwgdW5kZWZpbmVkIHtcbiAgICBpZiAoIW5hbWUpXG4gICAgICByZXR1cm4gdW5kZWZpbmVkO1xuICAgIHJldHVybiB0aGlzW0VOVFJJRVNdLmZpbmQoKGkpID0+IGkubmFtZSA9PT0gbmFtZSk7XG4gIH1cblxuICBwcml2YXRlIGFkZFRhcmdldExpc3RJbXBsKG5hbWU6IHN0cmluZywgcmVzdWx0OiBBcnJheTxHb2FsV29ya2VyPikge1xuICAgIGlmIChyZXN1bHQuZmluZChpID0+IGkubmFtZSA9PT0gbmFtZSB8fCBpLm91dHB1dCA9PT0gbmFtZSkpIHtcbiAgICAgIHJldHVybjtcbiAgICB9XG4gIFxuICAgIGNvbnN0IGdvYWwgPSB0aGlzW0VOVFJJRVNdLmZpbmQoaSA9PiBpLm5hbWUgPT09IG5hbWUgfHwgKGkub3V0cHV0ID09PSBuYW1lKSk7XG4gICAgaWYgKCFnb2FsKSB7XG4gICAgICByZXR1cm47XG4gICAgfVxuICBcbiAgICBmb3IgKGNvbnN0IGl0ZXIgb2YgZ29hbC5kZXBlbmRzKSB7XG4gICAgICB0aGlzLmFkZFRhcmdldExpc3RJbXBsKGl0ZXIudG9TdHJpbmcoKSwgcmVzdWx0KTtcbiAgICB9XG4gIFxuICAgIHJlc3VsdC5wdXNoKGdvYWwpO1xuICB9XG4gIFxuICBwdWJsaWMgZ2V0VGFyZ2V0TGlzdChuYW1lOnN0cmluZykge1xuICAgIGNvbnN0IHJlc3VsdCA9IG5ldyBBcnJheTxHb2FsV29ya2VyPjtcbiAgICB0aGlzLmFkZFRhcmdldExpc3RJbXBsKG5hbWUsIHJlc3VsdCk7XG4gICAgcmV0dXJuIHJlc3VsdDtcbiAgfVxuICBcbiAgcHVibGljIHRvSlNPTigpIHtcbiAgICByZXR1cm4gdGhpc1tFTlRSSUVTXTtcbiAgfVxuXG4gIHB1YmxpYyBzdGF0aWMgYXN5bmMgYnVpbGRHb2Fscyhjb2xsZWN0aW9uOiBBcnJheTxHb2FsV29ya2VyPikge1xuICAgIGNvbnN0IHRvdGFsID0gY29sbGVjdGlvbi5sZW5ndGg7XG4gICAgbGV0IGxvYWRlZCA9IDA7XG4gICAgZm9yIChjb25zdCBnb2FsIG9mIGNvbGxlY3Rpb24pIHtcbiAgICAgIGdvYWwudXBkYXRlUHJvZ3Jlc3MoeyBsb2FkZWQsIHRvdGFsIH0pO1xuICAgICAgYXdhaXQgZ29hbC5kb1dvcmsoKTtcbiAgICAgIGxvYWRlZCsrO1xuICAgIH1cbiAgfVxufTtcbiIsIi8qXG4gKiBNSVQgTGljZW5zZVxuICpcbiAqIENvcHlyaWdodCAoYykgMjAyNSAgWXVyaWkgWWFrdWJpbiAoeXVyaWkueWFrdWJpbkBnbWFpbC5jb20pXG4gKlxuICogUGVybWlzc2lvbiBpcyBncmFudGVkIHRvIHVzZSwgY29weSwgbW9kaWZ5LCBhbmQgZGlzdHJpYnV0ZSB0aGlzIHNvZnR3YXJlXG4gKiB1bmRlciB0aGUgTUlUIExpY2Vuc2UuIFNlZSBMSUNFTlNFIGZpbGUgZm9yIGRldGFpbHMuXG4gKi9cblxuaW1wb3J0IHsgQWJzb2x1dGVQYXRoIH0gZnJvbSBcIkAvY29yZS9QYXRoXCI7XG5cbmNvbnN0IE5BTUUgPSBTeW1ib2woXCJOQU1FXCIpO1xuY29uc3QgUEFUSCA9IFN5bWJvbChcIlBBVEhcIik7XG5cbmV4cG9ydCBjbGFzcyBJbmNsdWRlRGlyZWN0b3J5IHtcbiAgcHJpdmF0ZSBbTkFNRV06IHN0cmluZztcbiAgcHJpdmF0ZSBbUEFUSF06IEFic29sdXRlUGF0aDtcblxuICBwcml2YXRlIGNvbnN0cnVjdG9yKGRpcm5hbWU6IGFueSwgYmFzZURpcjogQWJzb2x1dGVQYXRoKSB7XG4gICAgdGhpc1tOQU1FXSA9IGRpcm5hbWUudG9TdHJpbmcoKTtcbiAgICB0aGlzW1BBVEhdID0gYmFzZURpci5yZXNvbHZlKGRpcm5hbWUpO1xuICB9XG5cbiAgcHVibGljIHN0YXRpYyBjcmVhdGUoZGlybmFtZTogYW55LCBiYXNlRGlyOiBBYnNvbHV0ZVBhdGgpIHtcbiAgICByZXR1cm4gT2JqZWN0LnNlYWwobmV3IEluY2x1ZGVEaXJlY3RvcnkoZGlybmFtZSwgYmFzZURpcikpO1xuICB9XG5cbiAgZ2V0IE5BTUUoKSB7XG4gICAgcmV0dXJuIHRoaXNbTkFNRV07XG4gIH1cblxuICBnZXQgUEFUSCgpIHtcbiAgICByZXR1cm4gdGhpc1tQQVRIXTtcbiAgfVxuXG4gIHRvU3RyaW5nKCkge1xuICAgIHJldHVybiB0aGlzW1BBVEhdLnRvU3RyaW5nKCk7XG4gIH1cblxuICB0b0pTT04oKTogb2JqZWN0IHtcbiAgICByZXR1cm4ge1xuICAgICAgTkFNRTogdGhpcy5OQU1FLFxuICAgICAgUEFUSDogdGhpcy5QQVRILFxuICAgIH1cbiAgfVxufTtcbiIsIi8qXG4gKiBNSVQgTGljZW5zZVxuICpcbiAqIENvcHlyaWdodCAoYykgMjAyNSAgWXVyaWkgWWFrdWJpbiAoeXVyaWkueWFrdWJpbkBnbWFpbC5jb20pXG4gKlxuICogUGVybWlzc2lvbiBpcyBncmFudGVkIHRvIHVzZSwgY29weSwgbW9kaWZ5LCBhbmQgZGlzdHJpYnV0ZSB0aGlzIHNvZnR3YXJlXG4gKiB1bmRlciB0aGUgTUlUIExpY2Vuc2UuIFNlZSBMSUNFTlNFIGZpbGUgZm9yIGRldGFpbHMuXG4gKi9cblxuaW1wb3J0IHsgSW50ZXJmYWNlVGFyZ2V0IH0gZnJvbSBcIkAvY29yZS9JbnRlcmZhY2VUYXJnZXRcIjtcbmltcG9ydCB7IERpclBhdGgsIEZpbGVQYXRoLCBBYnNvbHV0ZVBhdGggfSBmcm9tIFwiQC9jb3JlL1BhdGhcIjtcbmltcG9ydCB7IFN5c3RlbVNjb3BlIH0gZnJvbSBcIkAvY29yZS9TeXN0ZW1TY29wZVwiO1xuXG5jb25zdCBWQUxVRSAgICAgICA9IFN5bWJvbChcIlZBTFVFXCIpO1xuY29uc3QgREVTVElOQVRJT04gPSBTeW1ib2woXCJERVNUSU5BVElPTlwiKTtcbmNvbnN0IEJBU0VfRElSICAgID0gU3ltYm9sKFwiQkFTRV9ESVJcIik7XG5cbmV4cG9ydCBjbGFzcyBJbnN0YWxsRW50aXR5IHtcbiAgcHJpdmF0ZSBbVkFMVUVdOiBBYnNvbHV0ZVBhdGggfCBJbnRlcmZhY2VUYXJnZXQ7XG4gIHByaXZhdGUgW0RFU1RJTkFUSU9OXTogRGlyUGF0aDtcbiAgcHJpdmF0ZSBbQkFTRV9ESVJdOiBEaXJQYXRoIHwgbnVsbDtcblxuICBwcml2YXRlIGNvbnN0cnVjdG9yKHNjb3BlOiBTeXN0ZW1TY29wZSwgdmFsdWU6IHN0cmluZyB8IEFic29sdXRlUGF0aCB8IEludGVyZmFjZVRhcmdldCwgcGFyYW1zOiBzdHJpbmcgfCBhbnkpIHtcbiAgICBsZXQgZGVzdGluYXRpb246IHN0cmluZyB8IEFic29sdXRlUGF0aCB8IHVuZGVmaW5lZDtcbiAgICBsZXQgYmFzZURpcjtcbiAgICBpZiAodHlwZW9mIHBhcmFtcyA9PT0gXCJzdHJpbmdcIilcbiAgICAgIGRlc3RpbmF0aW9uID0gcGFyYW1zO1xuICAgIGVsc2UgaWYgKHBhcmFtcykge1xuICAgICAgZGVzdGluYXRpb24gPSBwYXJhbXMuZGVzdGluYXRpb247XG4gICAgICBiYXNlRGlyID0gcGFyYW1zLmJhc2VEaXI7XG4gICAgfVxuICBcbiAgICBpZiAoIWRlc3RpbmF0aW9uKVxuICAgICAgdGhyb3cgbmV3IEVycm9yKGBQYXJhbWV0ZXIgZGVzdGluYXRpb24gaXMgbm90IHNwZWNpZmllZGApO1xuICBcbiAgICBpZiAoYmFzZURpcilcbiAgICAgIGJhc2VEaXIgPSBzY29wZS5TT1VSQ0VfRElSLnJlc29sdmUoYmFzZURpcik7XG4gIFxuICAgIGlmICh0eXBlb2YgdmFsdWUgPT09IFwic3RyaW5nXCIgfHwgdmFsdWUgaW5zdGFuY2VvZiBBYnNvbHV0ZVBhdGgpIHtcbiAgICAgIHZhbHVlID0gc2NvcGUuU09VUkNFX0RJUi5yZXNvbHZlKHZhbHVlLnRvU3RyaW5nKCkpIGFzIEFic29sdXRlUGF0aDtcbiAgICAgIHZhbHVlID0gRmlsZVBhdGguY3JlYXRlKHZhbHVlKTtcbiAgICAgIGJhc2VEaXIgPSBiYXNlRGlyIHx8IHZhbHVlLmRpcm5hbWUoKTtcbiAgICB9XG4gICAgZWxzZSBpZiAoISh2YWx1ZSBpbnN0YW5jZW9mIEludGVyZmFjZVRhcmdldCkpIHtcbiAgICAgIHRocm93IG5ldyBFcnJvcihgTm90IHN1cHBvcnRldCB2YWx1ZSBvZiAke3ZhbHVlfWApO1xuICAgIH1cbiAgXG4gICAgdGhpc1tWQUxVRV0gPSB2YWx1ZTtcbiAgICB0aGlzW0RFU1RJTkFUSU9OXSA9IERpclBhdGguY3JlYXRlKHNjb3BlLklOU1RBTExfUFJFRklYLnJlc29sdmUoZGVzdGluYXRpb24udG9TdHJpbmcoKSkudG9TdHJpbmcoKSk7XG4gICAgdGhpc1tCQVNFX0RJUl0gPSBiYXNlRGlyID8gRGlyUGF0aC5jcmVhdGUoYmFzZURpci50b1N0cmluZygpKSA6IG51bGw7XG4gIH1cbiAgXG4gIHB1YmxpYyBzdGF0aWMgY3JlYXRlKHNjb3BlOiBhbnksIHZhbHVlOiBzdHJpbmcgfCBBYnNvbHV0ZVBhdGggfCBJbnRlcmZhY2VUYXJnZXQsIHBhcmFtczogc3RyaW5nIHwgYW55KSB7XG4gICAgcmV0dXJuIE9iamVjdC5zZWFsKG5ldyBJbnN0YWxsRW50aXR5KHNjb3BlLCB2YWx1ZSwgcGFyYW1zKSk7XG4gIH1cblxuICBwdWJsaWMgZ2V0IFZBTFVFICgpIHtcbiAgICByZXR1cm4gdGhpc1tWQUxVRV07XG4gIH1cblxuICBwdWJsaWMgZ2V0IERFU1RJTkFUSU9OICgpIHtcbiAgICByZXR1cm4gdGhpc1tERVNUSU5BVElPTl07XG4gIH1cblxuICBwdWJsaWMgZ2V0IEJBU0VfRElSICgpIHtcbiAgICByZXR1cm4gdGhpc1tCQVNFX0RJUl07XG4gIH1cblxuICBwdWJsaWMgdG9KU09OKCk6IG9iamVjdCB7XG4gICAgcmV0dXJuIHtcbiAgICAgIFZBTFVFOiB0aGlzLlZBTFVFLFxuICAgICAgREVTVElOQVRJT046IHRoaXMuREVTVElOQVRJT04sXG4gICAgICBCQVNFX0RJUjogdGhpcy5CQVNFX0RJUixcbiAgICB9O1xuICB9XG59O1xuIiwiLypcbiAqIE1JVCBMaWNlbnNlXG4gKlxuICogQ29weXJpZ2h0IChjKSAyMDI1ICBZdXJpaSBZYWt1YmluICh5dXJpaS55YWt1YmluQGdtYWlsLmNvbSlcbiAqXG4gKiBQZXJtaXNzaW9uIGlzIGdyYW50ZWQgdG8gdXNlLCBjb3B5LCBtb2RpZnksIGFuZCBkaXN0cmlidXRlIHRoaXMgc29mdHdhcmVcbiAqIHVuZGVyIHRoZSBNSVQgTGljZW5zZS4gU2VlIExJQ0VOU0UgZmlsZSBmb3IgZGV0YWlscy5cbiAqL1xuXG5jb25zdCBOQU1FID0gU3ltYm9sKFwiTkFNRVwiKTtcblxuZXhwb3J0IGNsYXNzIEludGVyZmFjZUluY2x1ZGVzIHtcbiAgcHJpdmF0ZSBbTkFNRV06IHN0cmluZztcblxuICBwcml2YXRlIGNvbnN0cnVjdG9yKG5hbWU6IHN0cmluZykge1xuICAgIHRoaXNbTkFNRV0gPSBuYW1lO1xuICB9XG5cbiAgcHVibGljIGdldCB0YXJnZXROYW1lKCkge1xuICAgIHJldHVybiB0aGlzW05BTUVdO1xuICB9XG5cbiAgcHVibGljIHRvU3RyaW5nKCk6IHN0cmluZyB7XG4gICAgcmV0dXJuIFwiJHtcIiArIHRoaXNbTkFNRV0gKyBcIi5pbmNsdWRlc31cIjtcbiAgfVxuXG4gIHB1YmxpYyB0b0pTT04oKSB7XG4gICAgcmV0dXJuIHRoaXMudG9TdHJpbmcoKTtcbiAgfVxuXG4gIHB1YmxpYyBzdGF0aWMgY3JlYXRlKG5hbWU6IHN0cmluZykge1xuICAgIHJldHVybiBPYmplY3Quc2VhbChuZXcgSW50ZXJmYWNlSW5jbHVkZXMobmFtZSkpO1xuICB9XG5cbiAgcHVibGljIHN0YXRpYyBlbnN1cmVJbnN0YW5jZSh2YWx1ZTogYW55KSB7XG4gICAgaWYgKHZhbHVlIGluc3RhbmNlb2YgSW50ZXJmYWNlSW5jbHVkZXMpXG4gICAgICByZXR1cm4gdmFsdWU7XG4gICAgdGhyb3cgbmV3IEVycm9yKGBUaGUgJyR7dmFsdWV9JyBpcyBub3QgYSBJbnRlcmZhY2VJbmNsdWRlc2ApO1xuICB9XG59O1xuIiwiLypcbiAqIE1JVCBMaWNlbnNlXG4gKlxuICogQ29weXJpZ2h0IChjKSAyMDI1ICBZdXJpaSBZYWt1YmluICh5dXJpaS55YWt1YmluQGdtYWlsLmNvbSlcbiAqXG4gKiBQZXJtaXNzaW9uIGlzIGdyYW50ZWQgdG8gdXNlLCBjb3B5LCBtb2RpZnksIGFuZCBkaXN0cmlidXRlIHRoaXMgc29mdHdhcmVcbiAqIHVuZGVyIHRoZSBNSVQgTGljZW5zZS4gU2VlIExJQ0VOU0UgZmlsZSBmb3IgZGV0YWlscy5cbiAqL1xuXG5jb25zdCBOQU1FID0gU3ltYm9sKFwiTkFNRVwiKTtcblxuZXhwb3J0IGNsYXNzIEludGVyZmFjZU9iamVjdHMge1xuICBwcml2YXRlIFtOQU1FXTogc3RyaW5nO1xuXG4gIHByaXZhdGUgY29uc3RydWN0b3IobmFtZTogc3RyaW5nKSB7XG4gICAgdGhpc1tOQU1FXSA9IG5hbWU7XG4gIH1cblxuICBwdWJsaWMgc3RhdGljIGNyZWF0ZShuYW1lOiBzdHJpbmcpIHtcbiAgICByZXR1cm4gT2JqZWN0LnNlYWwobmV3IEludGVyZmFjZU9iamVjdHMobmFtZSkpO1xuICB9XG5cbiAgcHVibGljIHN0YXRpYyBlbnN1cmVJbnN0YW5jZSh2YWx1ZTogYW55KTogSW50ZXJmYWNlT2JqZWN0cyB7XG4gICAgaWYgKHZhbHVlIGluc3RhbmNlb2YgSW50ZXJmYWNlT2JqZWN0cylcbiAgICAgIHJldHVybiB2YWx1ZTtcbiAgICB0aHJvdyBuZXcgRXJyb3IoYFRoZSAnJHt2YWx1ZX0nIGlzIG5vdCBhIEludGVyZmFjZU9iamVjdHNgKTtcbiAgfVxuXG4gIHB1YmxpYyBnZXQgdGFyZ2V0TmFtZSgpOiBzdHJpbmcge1xuICAgIHJldHVybiB0aGlzW05BTUVdO1xuICB9XG5cbiAgcHVibGljIHRvU3RyaW5nKCk6IHN0cmluZyB7XG4gICAgcmV0dXJuIFwiJHtcIiArIHRoaXNbTkFNRV0gKyBcIi5vYmplY3RzfVwiO1xuICB9XG5cbiAgcHVibGljIHRvSlNPTigpOiBzdHJpbmcge1xuICAgIHJldHVybiB0aGlzLnRvU3RyaW5nKCk7XG4gIH1cbn07XG4iLCIvKlxuICogTUlUIExpY2Vuc2VcbiAqXG4gKiBDb3B5cmlnaHQgKGMpIDIwMjUgIFl1cmlpIFlha3ViaW4gKHl1cmlpLnlha3ViaW5AZ21haWwuY29tKVxuICpcbiAqIFBlcm1pc3Npb24gaXMgZ3JhbnRlZCB0byB1c2UsIGNvcHksIG1vZGlmeSwgYW5kIGRpc3RyaWJ1dGUgdGhpcyBzb2Z0d2FyZVxuICogdW5kZXIgdGhlIE1JVCBMaWNlbnNlLiBTZWUgTElDRU5TRSBmaWxlIGZvciBkZXRhaWxzLlxuICovXG5cbmltcG9ydCB7IFNjb3BlSGVscGVyIH0gZnJvbSBcIkAvY29yZS9TY29wZVwiO1xuXG5jb25zdCBOQU1FICAgICAgID0gU3ltYm9sKFwiTkFNRVwiKTtcbmNvbnN0IFZBUklBQkxFUyA9IFN5bWJvbChcIlZBUklBQkxFU1wiKTtcblxuZXhwb3J0IGNsYXNzIEludGVyZmFjZVNjcmlwdCB7XG4gIHByaXZhdGUgW05BTUVdOiBzdHJpbmc7XG4gIHByaXZhdGUgW1ZBUklBQkxFU106IG9iamVjdDtcblxuICBwcml2YXRlIGNvbnN0cnVjdG9yKG5hbWU6IHN0cmluZykge1xuICAgIHRoaXNbTkFNRV0gPSBuYW1lO1xuICAgIHRoaXNbVkFSSUFCTEVTXSA9IHt9O1xuICB9XG5cbiAgcHVibGljIGdldCBOQU1FKCkge1xuICAgIHJldHVybiB0aGlzW05BTUVdO1xuICB9XG5cbiAgcHVibGljIGdldCBWQVJJQUJMRVMoKSB7XG4gICAgcmV0dXJuIHRoaXNbVkFSSUFCTEVTXTtcbiAgfVxuXG4gIHB1YmxpYyBtZXJnZVZhcmlhYmxlcyh2YXJpYWJsZXM6IGFueSkge1xuICAgIFNjb3BlSGVscGVyLm1lcmdlVmFyaWFibGVzKHRoaXNbVkFSSUFCTEVTXSwgdmFyaWFibGVzKTtcbiAgfVxuXG4gIHB1YmxpYyB0b0pTT04oKTogb2JqZWN0IHtcbiAgICByZXR1cm4ge1xuICAgICAgTkFNRTogdGhpcy5OQU1FLFxuICAgICAgVkFSSUFCTEVTOiB0aGlzLlZBUklBQkxFUyxcbiAgICB9O1xuICB9XG4gIFxuICBwdWJsaWMgdG9TdHJpbmcoKTogc3RyaW5nIHtcbiAgICByZXR1cm4gdGhpc1tOQU1FXTtcbiAgfVxuXG4gIHB1YmxpYyBzdGF0aWMgY3JlYXRlKG5hbWU6IHN0cmluZykge1xuICAgIHJldHVybiBPYmplY3Quc2VhbChuZXcgSW50ZXJmYWNlU2NyaXB0KG5hbWUpKTtcbiAgfVxuXG4gIHB1YmxpYyBzdGF0aWMgZW5zdXJlSW5zdGFuY2UodmFsdWU6IGFueSkge1xuICAgIGlmICh2YWx1ZSBpbnN0YW5jZW9mIEludGVyZmFjZVNjcmlwdClcbiAgICAgIHJldHVybiB2YWx1ZTtcbiAgICB0aHJvdyBuZXcgRXJyb3IoYFRoZSAnJHt2YWx1ZX0nIGlzIG5vdCBhIEludGVyZmFjZVNjcmlwdGApO1xuICB9XG59O1xuIiwiLypcbiAqIE1JVCBMaWNlbnNlXG4gKlxuICogQ29weXJpZ2h0IChjKSAyMDI1ICBZdXJpaSBZYWt1YmluICh5dXJpaS55YWt1YmluQGdtYWlsLmNvbSlcbiAqXG4gKiBQZXJtaXNzaW9uIGlzIGdyYW50ZWQgdG8gdXNlLCBjb3B5LCBtb2RpZnksIGFuZCBkaXN0cmlidXRlIHRoaXMgc29mdHdhcmVcbiAqIHVuZGVyIHRoZSBNSVQgTGljZW5zZS4gU2VlIExJQ0VOU0UgZmlsZSBmb3IgZGV0YWlscy5cbiAqL1xuXG5pbXBvcnQgeyBBYnNvbHV0ZVBhdGggfSBmcm9tIFwiQC9jb3JlL1BhdGhcIjtcbmltcG9ydCB7IEludGVyZmFjZUluY2x1ZGVzIH0gZnJvbSBcIkAvY29yZS9JbnRlcmZhY2VJbmNsdWRlc1wiO1xuaW1wb3J0IHsgSW50ZXJmYWNlT2JqZWN0cyB9IGZyb20gXCJAL2NvcmUvSW50ZXJmYWNlT2JqZWN0c1wiO1xuaW1wb3J0IHsgSW5jbHVkZURpcmVjdG9yeSB9IGZyb20gXCJAL2NvcmUvSW5jbHVkZURpcmVjdG9yeVwiO1xuaW1wb3J0IHsgU291cmNlRmlsZSB9IGZyb20gXCJAL2NvcmUvU291cmNlRmlsZVwiO1xuaW1wb3J0IHsgU3lzdGVtU2NvcGUgfSBmcm9tIFwiQC9jb3JlL1N5c3RlbVNjb3BlXCI7XG5pbXBvcnQgeyBVbmtub3duVGFyZ2V0IH0gZnJvbSBcIkAvY29yZS9Vbmtub3duVGFyZ2V0XCI7XG5pbXBvcnQgeyBTY29wZUhlbHBlciB9IGZyb20gXCJAL2NvcmUvU2NvcGVcIjtcblxuY29uc3QgVU5LTk9XTl9UQVJHRVQgPSBTeW1ib2woXCJVTktOT1dOX1RBUkdFVFwiKTtcbmNvbnN0IFNDT1BFID0gU3ltYm9sKFwiU0NPUEVcIik7XG5cbmV4cG9ydCBjbGFzcyBJbnRlcmZhY2VUYXJnZXQge1xuICBwcml2YXRlIFtTQ09QRV06IFN5c3RlbVNjb3BlO1xuICBwcml2YXRlIFtVTktOT1dOX1RBUkdFVF06IFVua25vd25UYXJnZXQ7XG5cbiAgcHJpdmF0ZSBjb25zdHJ1Y3RvcihzY29wZTogYW55LCB1dGFyZ2V0OiBhbnkpIHtcbiAgICB0aGlzW1NDT1BFXSA9IFNjb3BlSGVscGVyLmNsb25lKHt9LCBzY29wZSk7XG4gICAgdGhpc1tVTktOT1dOX1RBUkdFVF0gPSB1dGFyZ2V0O1xuICB9XG5cbiAgcHVibGljIHN0YXRpYyBjcmVhdGUoc2NvcGU6IGFueSwgdXRhcmdldDogYW55KSB7XG4gICAgcmV0dXJuIE9iamVjdC5zZWFsKG5ldyBJbnRlcmZhY2VUYXJnZXQoc2NvcGUsIHV0YXJnZXQpKTtcbiAgfVxuXG4gIHB1YmxpYyBzdGF0aWMgZW5zdXJlSW5zdGFuY2UodmFsdWU6IGFueSkge1xuICAgIGlmICh2YWx1ZSBpbnN0YW5jZW9mIEludGVyZmFjZVRhcmdldClcbiAgICAgIHJldHVybiB2YWx1ZTtcbiAgICB0aHJvdyBuZXcgRXJyb3IoYFRoZSAnJHt2YWx1ZX0nIGlzIG5vdCBhIEludGVyZmFjZVRhcmdldGApO1xuICB9XG5cbiAgcHVibGljIGdldCB0YXJnZXROYW1lKCk6IHN0cmluZyB7XG4gICAgcmV0dXJuIHRoaXNbVU5LTk9XTl9UQVJHRVRdLk5BTUU7XG4gIH1cblxuICBwdWJsaWMgZ2V0IGluY2x1ZGVzKCk6IEludGVyZmFjZUluY2x1ZGVzIHtcbiAgICByZXR1cm4gSW50ZXJmYWNlSW5jbHVkZXMuY3JlYXRlKHRoaXMudGFyZ2V0TmFtZSk7XG4gIH1cblxuICBwdWJsaWMgZ2V0IG9iamVjdHMoKTogSW50ZXJmYWNlT2JqZWN0cyB7XG4gICAgcmV0dXJuIEludGVyZmFjZU9iamVjdHMuY3JlYXRlKHRoaXMudGFyZ2V0TmFtZSk7XG4gIH1cblxuICBwdWJsaWMgdG9KU09OKCk6IHN0cmluZyB7XG4gICAgcmV0dXJuIHRoaXMudG9TdHJpbmcoKTtcbiAgfVxuXG4gIHB1YmxpYyB0b1N0cmluZygpOiBzdHJpbmcge1xuICAgIHJldHVybiBcIiR7XCIgKyB0aGlzLnRhcmdldE5hbWUgKyBcIn1cIjtcbiAgfVxuXG4gIHB1YmxpYyBhZGRTb3VyY2VzKC4uLnNvdXJjZXM6IEFycmF5PEludGVyZmFjZU9iamVjdHN8U291cmNlRmlsZXxBYnNvbHV0ZVBhdGh8c3RyaW5nPik6IHZvaWQge1xuICAgIGZvciAobGV0IGl0IG9mIHNvdXJjZXMuZmxhdCgxKSkge1xuICAgICAgaWYgKGl0IGluc3RhbmNlb2YgSW50ZXJmYWNlT2JqZWN0cyB8fCBpdCBpbnN0YW5jZW9mIFNvdXJjZUZpbGUpXG4gICAgICAgIHt9XG4gICAgICBlbHNlIGlmICh0eXBlb2YgaXQgPT09IFwic3RyaW5nXCIgfHwgQWJzb2x1dGVQYXRoLmlzQWJzb2x1dGUoaXQpKVxuICAgICAgICBpdCA9IFNvdXJjZUZpbGUuY3JlYXRlKHRoaXNbU0NPUEVdLCBpdCk7XG4gICAgICBlbHNlXG4gICAgICAgIHRocm93IG5ldyBFcnJvcihgTm90IHN1cHBvcnQgaW5zdGFuY2UgJHtpdH1gKTtcbiAgICAgIHRoaXNbVU5LTk9XTl9UQVJHRVRdLlNPVVJDRVMucHVzaChpdCk7XG4gICAgfVxuICB9XG5cbiAgcHVibGljIGFkZEluY2x1ZGVzKC4uLmluY2x1ZGVzOiBBcnJheTxJbnRlcmZhY2VJbmNsdWRlc3xBYnNvbHV0ZVBhdGh8c3RyaW5nPik6IHZvaWQge1xuICAgIGZvciAoY29uc3QgaXQgb2YgaW5jbHVkZXMuZmxhdCgxKSkge1xuICAgICAgbGV0IFZBTFVFO1xuICAgICAgaWYgKGl0IGluc3RhbmNlb2YgSW50ZXJmYWNlSW5jbHVkZXMpXG4gICAgICAgIFZBTFVFID0gaXQ7XG4gICAgICBlbHNlIGlmICh0eXBlb2YgaXQgPT09IFwic3RyaW5nXCIgfHwgQWJzb2x1dGVQYXRoLmlzQWJzb2x1dGUoaXQpKVxuICAgICAgICBWQUxVRSA9IEluY2x1ZGVEaXJlY3RvcnkuY3JlYXRlKGl0LCB0aGlzW1NDT1BFXS5TT1VSQ0VfRElSKTtcbiAgICAgIGVsc2VcbiAgICAgICAgdGhyb3cgbmV3IEVycm9yKGBOb3Qgc3VwcG9ydCBpbnN0YW5jZSAke2l0fWApO1xuICAgICAgdGhpc1tVTktOT1dOX1RBUkdFVF0uSU5DTFVERVMucHVzaCh7IFZBTFVFLCBQVUJMSUNfT05MWTogZmFsc2UgfSk7XG4gICAgfVxuICB9XG5cbiAgcHVibGljIGFkZFB1YmxpY0luY2x1ZGVzKC4uLmluY2x1ZGVzOiBBcnJheTxJbnRlcmZhY2VJbmNsdWRlc3xBYnNvbHV0ZVBhdGh8c3RyaW5nPik6IHZvaWQge1xuICAgIGZvciAoY29uc3QgaXQgb2YgaW5jbHVkZXMuZmxhdCgxKSkge1xuICAgICAgbGV0IFZBTFVFO1xuICAgICAgaWYgKGl0IGluc3RhbmNlb2YgSW50ZXJmYWNlSW5jbHVkZXMpXG4gICAgICAgIFZBTFVFID0gaXQ7XG4gICAgICBlbHNlIGlmICh0eXBlb2YgaXQgPT09IFwic3RyaW5nXCIgfHwgQWJzb2x1dGVQYXRoLmlzQWJzb2x1dGUoaXQpKVxuICAgICAgICBWQUxVRSA9IEluY2x1ZGVEaXJlY3RvcnkuY3JlYXRlKGl0LCB0aGlzW1NDT1BFXS5TT1VSQ0VfRElSKTtcbiAgICAgIGVsc2VcbiAgICAgICAgdGhyb3cgbmV3IEVycm9yKGBOb3Qgc3VwcG9ydCBpbnN0YW5jZSAke2l0fWApO1xuICAgICAgdGhpc1tVTktOT1dOX1RBUkdFVF0uSU5DTFVERVMucHVzaCh7IFZBTFVFLCBQVUJMSUNfT05MWTogdHJ1ZSB9KTtcbiAgICB9XG4gIH1cblxuICBwdWJsaWMgYWRkRGVmaW5pdGlvbnMoLi4uZGVmaW5pdGlvbnM6IHN0cmluZ1tdKTogdm9pZCB7XG4gICAgZm9yIChjb25zdCBWQUxVRSBvZiBkZWZpbml0aW9ucy5mbGF0KDEpKVxuICAgICAgdGhpc1tVTktOT1dOX1RBUkdFVF0uREVGSU5FUy5wdXNoKHsgVkFMVUUgfSk7XG4gIH1cblxuICBwdWJsaWMgYWRkUHVibGljRGVmaW5pdGlvbnMoLi4uZGVmaW5pdGlvbnM6IHN0cmluZ1tdKTogdm9pZCB7XG4gICAgZm9yIChjb25zdCBWQUxVRSBvZiBkZWZpbml0aW9ucy5mbGF0KDEpKVxuICAgICAgdGhpc1tVTktOT1dOX1RBUkdFVF0uREVGSU5FUy5wdXNoKHsgVkFMVUUsIFBVQkxJQ19PTkxZOiB0cnVlIH0pO1xuICB9XG5cbiAgcHVibGljIGFkZENvbXBpbGVPcHRpb25zKC4uLm9wdGlvbnM6IHN0cmluZ1tdKTogdm9pZCB7XG4gICAgZm9yIChjb25zdCBpdCBvZiBvcHRpb25zLmZsYXQoMSkpIHtcbiAgICAgIHRoaXNbVU5LTk9XTl9UQVJHRVRdLkNPTVBJTEVfT1BUSU9OUy5wdXNoKHsgVkFMVUU6IGl0IH0pO1xuICAgIH1cbiAgfVxuXG4gIHB1YmxpYyBhZGRMaW5rT3B0aW9ucyguLi5vcHRpb25zOiBzdHJpbmdbXSk6IHZvaWQge1xuICAgIGZvciAoY29uc3QgaXQgb2Ygb3B0aW9ucy5mbGF0KDEpKSB7XG4gICAgICB0aGlzW1VOS05PV05fVEFSR0VUXS5MSU5LX09QVElPTlMucHVzaCh7IFZBTFVFOiBpdCB9KTtcbiAgICB9XG4gIH1cblxuICBwdWJsaWMgYWRkUHVibGljQ29tcGlsZU9wdGlvbnMoLi4ub3B0aW9uczogc3RyaW5nW10pOiB2b2lkIHtcbiAgICBmb3IgKGNvbnN0IGl0IG9mIG9wdGlvbnMuZmxhdCgxKSkge1xuICAgICAgdGhpc1tVTktOT1dOX1RBUkdFVF0uQ09NUElMRV9PUFRJT05TLnB1c2goeyBWQUxVRTogaXQsIFBVQkxJQ19PTkxZOiB0cnVlIH0pO1xuICAgIH1cbiAgfVxuXG4gIHB1YmxpYyBhZGRQdWJsaWNMaW5rT3B0aW9ucyguLi5vcHRpb25zOiBzdHJpbmdbXSk6IHZvaWQge1xuICAgIGZvciAoY29uc3QgaXQgb2Ygb3B0aW9ucy5mbGF0KDEpKSB7XG4gICAgICB0aGlzW1VOS05PV05fVEFSR0VUXS5MSU5LX09QVElPTlMucHVzaCh7IFZBTFVFOiBpdCwgUFVCTElDX09OTFk6IHRydWUgfSk7XG4gICAgfVxuICB9XG59O1xuIiwiLypcbiAqIE1JVCBMaWNlbnNlXG4gKlxuICogQ29weXJpZ2h0IChjKSAyMDI1ICBZdXJpaSBZYWt1YmluICh5dXJpaS55YWt1YmluQGdtYWlsLmNvbSlcbiAqXG4gKiBQZXJtaXNzaW9uIGlzIGdyYW50ZWQgdG8gdXNlLCBjb3B5LCBtb2RpZnksIGFuZCBkaXN0cmlidXRlIHRoaXMgc29mdHdhcmVcbiAqIHVuZGVyIHRoZSBNSVQgTGljZW5zZS4gU2VlIExJQ0VOU0UgZmlsZSBmb3IgZGV0YWlscy5cbiAqL1xuXG5pbXBvcnQgeyBzcGF3bkFzeW5jIH0gZnJvbSBcIkAvdXRpbHMvQ2hpbGRQcm9jZXNzXCI7XG5pbXBvcnQgeyBnZXRQYXRoU3RyaW5nIH0gIGZyb20gXCJAL3V0aWxzL0ZpbGVTeXN0ZW1cIjtcbmltcG9ydCB7IFNldHRpbmdzU3RvcmFnZSB9IGZyb20gXCJAL3V0aWxzL1NldHRpbmdzU3RvcmFnZVwiO1xuXG5leHBvcnQgYXN5bmMgZnVuY3Rpb24gbWFrZUFjdGlvbihjb25maWc6IGFueSwgZW52aXJvbm1lbnQ6IGFueSwgc2V0dGluZ3M6IFNldHRpbmdzU3RvcmFnZSkge1xuICBjb25zdCBiaW5hcnlEaXIgPSBnZXRQYXRoU3RyaW5nKGNvbmZpZy5iaW5hcnlEaXIpO1xuICBjb25zdCBhcmdzID0gY29uZmlnLmFyZ3MgfHwgW107XG4gIGlmIChjb25maWcuZGVzdERpcikge1xuICAgIGFyZ3MucHVzaChgREVTVERJUj0ke2NvbmZpZy5kZXN0RGlyfWApO1xuICB9XG4gIGNvbnN0IHJlczIgPSBhd2FpdCBzcGF3bkFzeW5jKFwibWFrZVwiLCBhcmdzLCB7XG4gICAgY3dkOiBiaW5hcnlEaXIsXG4gICAgZW52OiBlbnZpcm9ubWVudCxcbiAgICBleHRyYToge1xuICAgICAgb3V0cHV0OiBgbWFrZS5sb2dgLFxuICAgIH0sXG4gIH0pO1xuICBpZiAocmVzMi5zdGF0dXMgIT09IDApIHtcbiAgICB0aHJvdyBuZXcgRXJyb3IoYG1ha2UgcmV0dXJuZWQgc3RhdHVzICR7cmVzMi5zdGF0dXN9YCk7XG4gIH1cbn1cbiIsIi8qXG4gKiBNSVQgTGljZW5zZVxuICpcbiAqIENvcHlyaWdodCAoYykgMjAyNSAgWXVyaWkgWWFrdWJpbiAoeXVyaWkueWFrdWJpbkBnbWFpbC5jb20pXG4gKlxuICogUGVybWlzc2lvbiBpcyBncmFudGVkIHRvIHVzZSwgY29weSwgbW9kaWZ5LCBhbmQgZGlzdHJpYnV0ZSB0aGlzIHNvZnR3YXJlXG4gKiB1bmRlciB0aGUgTUlUIExpY2Vuc2UuIFNlZSBMSUNFTlNFIGZpbGUgZm9yIGRldGFpbHMuXG4gKi9cblxuaW1wb3J0IHBhdGggZnJvbSBcIm5vZGU6cGF0aFwiO1xuXG5pbXBvcnQgeyBmaWxlRXhpc3RzU3luYyB9IGZyb20gXCJAL3V0aWxzL0ZpbGVTeXN0ZW1cIjtcbmltcG9ydCB7IEFic29sdXRlUGF0aCB9IGZyb20gXCJAL2NvcmUvUGF0aFwiO1xuaW1wb3J0IHsgSW50ZXJmYWNlVGFyZ2V0IH0gZnJvbSBcIkAvY29yZS9JbnRlcmZhY2VUYXJnZXRcIjtcbmltcG9ydCB7IEludGVyZmFjZVNjcmlwdCB9IGZyb20gXCJAL2NvcmUvSW50ZXJmYWNlU2NyaXB0XCI7XG5pbXBvcnQgeyBJbnN0YWxsRW50aXR5IH0gZnJvbSBcIkAvY29yZS9JbnN0YWxsRW50aXR5XCI7XG5pbXBvcnQgeyBPYmplY3RMaWJyYXJ5LCBTdGF0aWNMaWJyYXJ5LCBTaGFyZWRMaWJyYXJ5LCBFeGVjdXRhYmxlLCBCYXNlVGFyZ2V0IH0gZnJvbSBcIkAvY29yZS9UYXJnZXRcIjtcbmltcG9ydCB7IEluY2x1ZGVEaXJlY3RvcnkgfSBmcm9tIFwiQC9jb3JlL0luY2x1ZGVEaXJlY3RvcnlcIjtcbmltcG9ydCB7IEN1c3RvbVNjcmlwdCB9IGZyb20gXCJAL2NvcmUvQ3VzdG9tU2NyaXB0XCI7XG5pbXBvcnQgeyBHbG9iYWxDb250ZXh0IH0gZnJvbSBcIkAvY29yZS9HbG9iYWxDb250ZXh0XCI7XG5pbXBvcnQgeyBTY29wZUhlbHBlciB9IGZyb20gXCJAL2NvcmUvU2NvcGVcIjtcbmltcG9ydCB7IFN5c3RlbVNjb3BlIH0gZnJvbSBcIkAvY29yZS9TeXN0ZW1TY29wZVwiO1xuaW1wb3J0IHsgZmluZFByb2dyYW1TeW5jIH0gZnJvbSBcIkAvY29yZS9GaW5kUHJvZ3JhbVwiO1xuaW1wb3J0IHsgY3JlYXRlTG9nZ2VyIH0gZnJvbSBcIkAvbG9nZ2VyXCI7XG5cbmNvbnN0IGxvZ2dlciA9IGNyZWF0ZUxvZ2dlcihpbXBvcnQubWV0YS51cmwpO1xuXG5jb25zdCByZXF1aXJlSW1wbCA9IGV2YWwoXCJyZXF1aXJlXCIpO1xuXG5mdW5jdGlvbiBzY29wZVZhbHVlQXNQcmltaXRpdmVzKG86IGFueSk6IGFueSB7XG4gIGlmICh0eXBlb2YgbyA9PT0gXCJ1bmRlZmluZWRcIilcbiAgICByZXR1cm4gbztcbiAgaWYgKHR5cGVvZiBvID09PSBcImJvb2xlYW5cIilcbiAgICByZXR1cm4gbztcbiAgaWYgKHR5cGVvZiBvID09PSBcIm51bWJlclwiKVxuICAgIHJldHVybiBvO1xuICBpZiAodHlwZW9mIG8gPT09IFwic3RyaW5nXCIpXG4gICAgcmV0dXJuIG87XG4gIGlmICh0eXBlb2YgbyA9PT0gXCJvYmplY3RcIikge1xuICAgIGlmICghbylcbiAgICAgIHJldHVybiBvO1xuICAgIGlmIChvIGluc3RhbmNlb2YgQWJzb2x1dGVQYXRoKSB7XG4gICAgICByZXR1cm4gby50b1N0cmluZygpO1xuICAgIH1cbiAgICBpZiAobyBpbnN0YW5jZW9mIEFycmF5KSB7XG4gICAgICBjb25zdCByZXN1bHQgPSBbXTtcbiAgICAgIGZvciAoY29uc3QgaSBvZiBvKVxuICAgICAgICByZXN1bHQucHVzaChzY29wZVZhbHVlQXNQcmltaXRpdmVzKGkpKTtcbiAgICAgIHJldHVybiByZXN1bHQ7XG4gICAgfVxuICAgIGlmIChvIGluc3RhbmNlb2YgT2JqZWN0KSB7XG4gICAgICBjb25zdCByZXN1bHQ6IGFueSA9IHt9O1xuICAgICAgZm9yIChjb25zdCBbayx2XSBvZiBPYmplY3QuZW50cmllcyhvKSlcbiAgICAgICAgcmVzdWx0W2tdID0gc2NvcGVWYWx1ZUFzUHJpbWl0aXZlcyh2KTtcbiAgICAgIHJldHVybiByZXN1bHQ7XG4gICAgfVxuICB9XG4gIHRocm93IG5ldyBFcnJvcihgVW5rbm93biBpbnN0YW5jZSBvZiAke299YCk7XG59XG5cbmNvbnN0IEdMT0JBTCA9IFN5bWJvbChcIkdMT0JBTFwiKTtcbmNvbnN0IFNDT1BFID0gU3ltYm9sKFwiU0NPUEVcIik7XG5cbmV4cG9ydCBuYW1lc3BhY2UgTWFrZUNvbnRleHQge1xuXG5pbnRlcmZhY2UgSU1ha2VDb250ZXh0IGV4dGVuZHMgU3lzdGVtU2NvcGUge1xuICBmaW5kUHJvZ3JhbShuYW1lOiBzdHJpbmcpOiBzdHJpbmcgfCB1bmRlZmluZWQ7XG5cbiAgZ2V0Q2FjaGVWYXJpYWJsZXMoKTogYW55O1xuICBhZGRDYWNoZVZhcmlhYmxlcyhwYXJhbXM6IGFueSk6IHZvaWQ7XG4gIGFkZEluY2x1ZGVEaXJlY3RvcmllcyguLi5kaXJzOiBhbnlbXSk6IHZvaWQ7XG4gIGFkZFN1YmRpcmVjdG9yeShzb3VyY2VEaXI6IGFueSwgYmluYXJ5RGlyOiBhbnkpOiB2b2lkO1xuICBhZGRDdXN0b21TY3JpcHQoc2NyaXB0OiBhbnksIHBhcmFtczogYW55KTogQ3VzdG9tU2NyaXB0O1xuICB0YXJnZXQobmFtZTogc3RyaW5nKTogSW50ZXJmYWNlVGFyZ2V0O1xuICBzY3JpcHQobmFtZTogc3RyaW5nKTogSW50ZXJmYWNlU2NyaXB0O1xuICBpbnN0YWxsKHZhbHVlOiBhbnksIHBhcmFtczogYW55KTogdm9pZDtcbiAgYWRkU3RhdGljTGlicmFyeShuYW1lOiBhbnksIC4uLnNvdXJjZXM6IGFueVtdKTogU3RhdGljTGlicmFyeTtcbiAgYWRkU2hhcmVkTGlicmFyeShuYW1lOiBhbnksIC4uLnNvdXJjZXM6IGFueVtdKTogU2hhcmVkTGlicmFyeTtcbiAgYWRkRXhlY3V0YWJsZShuYW1lOiBzdHJpbmcsIC4uLnNvdXJjZXM6IGFueVtdKTogRXhlY3V0YWJsZTtcbiAgZXhlY3V0ZVNjcmlwdCh0aGlzOiBJTWFrZUNvbnRleHQsIHNjcmlwdDogYW55LCBvcHRpb25zOiBhbnkpOiB2b2lkO1xuXG4gIFtTQ09QRV06IFN5c3RlbVNjb3BlO1xuICBbR0xPQkFMXTogR2xvYmFsQ29udGV4dDtcbn07XG5cbmNvbnN0IG1ldGhvZHMgPSB7XG4gIGZpbmRQcm9ncmFtOiBmaW5kUHJvZ3JhbVN5bmMsXG5cbiAgZ2V0Q2FjaGVWYXJpYWJsZXModGhpczogSU1ha2VDb250ZXh0KSB7XG4gICAgcmV0dXJuIFNjb3BlSGVscGVyLmdldFZhcmlhYmxlc0J5R3JvdXAodGhpc1tTQ09QRV0sIFwiY2FjaGVcIik7XG4gIH0sXG5cbiAgYWRkQ2FjaGVWYXJpYWJsZXModGhpczogSU1ha2VDb250ZXh0LCBwYXJhbXM6IGFueSkge1xuICAgIGxldCB2YXJpYWJsZXMgPSBwYXJhbXM7XG4gICAgaWYgKHR5cGVvZiBwYXJhbXMgPT09IFwic3RyaW5nXCIpIHtcbiAgICAgIGNvbnN0IGZpbGVuYW1lID0gdGhpc1tTQ09QRV0uU09VUkNFX0RJUi5yZXNvbHZlKHBhcmFtcykudG9TdHJpbmcoKTtcbiAgICAgIGlmICghZmlsZUV4aXN0c1N5bmMoZmlsZW5hbWUpKVxuICAgICAgICByZXR1cm47XG4gICAgICB2YXJpYWJsZXMgPSByZXF1aXJlSW1wbChmaWxlbmFtZSk7XG4gICAgfVxuICAgIFxuICAgIFNjb3BlSGVscGVyLmRlZmluZVZhcmlhYmxlcyh0aGlzW1NDT1BFXSwgXCJjYWNoZVwiLCB2YXJpYWJsZXMpO1xuICB9LFxuICBcbiAgYWRkSW5jbHVkZURpcmVjdG9yaWVzKHRoaXM6IElNYWtlQ29udGV4dCwgLi4uZGlyczogYW55W10pIHtcbiAgICBjb25zdCBzb3VyY2VEaXIgPSB0aGlzW1NDT1BFXS5TT1VSQ0VfRElSO1xuICAgIGZvciAoY29uc3QgaXRlciBvZiBkaXJzLmZsYXQoMSkpIHtcbiAgICAgIHRoaXNbU0NPUEVdLklOQ0xVREVTLnB1c2goSW5jbHVkZURpcmVjdG9yeS5jcmVhdGUoaXRlciwgc291cmNlRGlyKSk7XG4gICAgfVxuICB9LFxuICBcbiAgYWRkU3ViZGlyZWN0b3J5KHRoaXM6IElNYWtlQ29udGV4dCwgc291cmNlRGlyOiBhbnksIGJpbmFyeURpcjogYW55KSB7XG4gICAgYmluYXJ5RGlyID0gYmluYXJ5RGlyIHx8IHBhdGguaXNBYnNvbHV0ZShzb3VyY2VEaXIpID8gdW5kZWZpbmVkIDogc291cmNlRGlyO1xuICBcbiAgICBjb25zdCBTT1VSQ0VfRElSID0gcGF0aC5pc0Fic29sdXRlKHNvdXJjZURpcikgPyBBYnNvbHV0ZVBhdGguY3JlYXRlKHNvdXJjZURpcikgOiB0aGlzW1NDT1BFXS5TT1VSQ0VfRElSLmpvaW4oc291cmNlRGlyKTtcbiAgICBjb25zdCBCSU5BUllfRElSID0gcGF0aC5pc0Fic29sdXRlKGJpbmFyeURpcikgPyBBYnNvbHV0ZVBhdGguY3JlYXRlKGJpbmFyeURpcikgOiB0aGlzW1NDT1BFXS5CSU5BUllfRElSLmpvaW4oYmluYXJ5RGlyKTtcblxuICAgIGNvbnN0IG5ld1Njb3BlID0gU2NvcGVIZWxwZXIuY2xvbmUoe30sIHRoaXNbU0NPUEVdKTtcbiAgICBTY29wZUhlbHBlci5hcHBseVZhcmlhYmxlcyhuZXdTY29wZSwgdGhpcyk7XG5cbiAgICBjb25zdCByZXNvbHZlUGF0aCA9IHRoaXNbR0xPQkFMXS5yZXNvbHZlU3ViZGlyZWN0b3J5KFNPVVJDRV9ESVIpO1xuICAgIGlmICghcmVzb2x2ZVBhdGgpIHtcbiAgICAgIGxvZ2dlci5pbmZvKGBTb3VyY2UgZGlyIFwiJHtTT1VSQ0VfRElSfVwiIHdhcyBkaXNhYmxlZGApO1xuICAgICAgcmV0dXJuO1xuICAgIH1cbiAgXG4gICAgbmV3U2NvcGUuU09VUkNFX0RJUiA9IEFic29sdXRlUGF0aC5jcmVhdGUocmVzb2x2ZVBhdGgudG9TdHJpbmcoKSk7XG4gICAgbmV3U2NvcGUuQklOQVJZX0RJUiA9IEJJTkFSWV9ESVI7XG4gIFxuICAgIHRoaXNbR0xPQkFMXS5hZGRTdWJkaXJlY3RvcnkobmV3U2NvcGUpO1xuICB9LFxuICBcbiAgYWRkQ3VzdG9tU2NyaXB0KHRoaXM6IElNYWtlQ29udGV4dCwgc2NyaXB0OiBhbnksIHBhcmFtczogYW55KTogQ3VzdG9tU2NyaXB0IHtcbiAgICBjb25zdCBuZXdTY29wZSA9IFNjb3BlSGVscGVyLmNsb25lKHt9LCB0aGlzW1NDT1BFXSk7XG4gICAgU2NvcGVIZWxwZXIuYXBwbHlWYXJpYWJsZXMobmV3U2NvcGUsIHRoaXMpO1xuICAgIGZvciAoY29uc3QgW2tleSwgdmFsXSBvZiBPYmplY3QuZW50cmllcyhwYXJhbXMpKVxuICAgICAgbmV3U2NvcGVba2V5XSA9IHZhbDtcbiAgICByZXR1cm4gdGhpc1tHTE9CQUxdLmFkZEN1c3RvbVNjcmlwdChuZXdTY29wZSwgc2NyaXB0LCBwYXJhbXMpO1xuICB9LFxuICBcbiAgdGFyZ2V0KHRoaXM6IElNYWtlQ29udGV4dCwgbmFtZTogc3RyaW5nKTogSW50ZXJmYWNlVGFyZ2V0IHtcbiAgICBjb25zdCB1dGFyZ2V0ID0gdGhpc1tHTE9CQUxdLmdldFVrbm93blRhcmdldChuYW1lKTtcbiAgICByZXR1cm4gSW50ZXJmYWNlVGFyZ2V0LmNyZWF0ZSh0aGlzW1NDT1BFXSwgdXRhcmdldCk7XG4gIH0sXG4gIFxuICBzY3JpcHQodGhpczogSU1ha2VDb250ZXh0LCBuYW1lOiBzdHJpbmcpOiBJbnRlcmZhY2VTY3JpcHQge1xuICAgIGxldCBzY3JpcHQgPSB0aGlzW0dMT0JBTF0uSU5URVJGQUNFX1NDUklQVFNbbmFtZV07XG4gICAgaWYgKCFzY3JpcHQpIHtcbiAgICAgIHNjcmlwdCA9IEludGVyZmFjZVNjcmlwdC5jcmVhdGUobmFtZSk7XG4gICAgICB0aGlzW0dMT0JBTF0uSU5URVJGQUNFX1NDUklQVFNbbmFtZV0gPSBzY3JpcHQ7XG4gICAgfVxuICAgIHJldHVybiBzY3JpcHQ7XG4gIH0sXG4gIFxuICBpbnN0YWxsKHRoaXM6IElNYWtlQ29udGV4dCwgdmFsdWU6IGFueSwgcGFyYW1zOiBhbnkpOiB2b2lkIHtcbiAgICBmb3IgKGNvbnN0IGl0IG9mIFsgdmFsdWUgXS5mbGF0KDEpKSB7XG4gICAgICBjb25zdCBpdGVyID0gKGl0IGluc3RhbmNlb2YgQmFzZVRhcmdldCkgPyB0aGlzLnRhcmdldChpdC5OQU1FKSA6IGl0O1xuICAgICAgY29uc3QgZW50aXR5ID0gSW5zdGFsbEVudGl0eS5jcmVhdGUodGhpcywgaXRlciwgcGFyYW1zKTtcbiAgICAgIHRoaXNbR0xPQkFMXS5hZGRJbnN0YWxsRW50cnkoZW50aXR5KTtcbiAgICB9XG4gIH0sXG5cbiAgYWRkU3RhdGljTGlicmFyeSh0aGlzOiBJTWFrZUNvbnRleHQsIG5hbWU6IGFueSwgLi4uc291cmNlczogYW55W10pOiBTdGF0aWNMaWJyYXJ5IHtcbiAgICByZXR1cm4gdGhpc1tHTE9CQUxdLmFkZFN0YXRpY0xpYnJhcnkodGhpc1tTQ09QRV0sIG5hbWUsIC4uLnNvdXJjZXMpO1xuICB9LFxuXG4gIGFkZE9iamVjdExpYnJhcnkodGhpczogSU1ha2VDb250ZXh0LCBuYW1lOiBhbnksIC4uLnNvdXJjZXM6IGFueVtdKTogT2JqZWN0TGlicmFyeSB7XG4gICAgcmV0dXJuIHRoaXNbR0xPQkFMXS5hZGRPYmplY3RMaWJyYXJ5KHRoaXNbU0NPUEVdLCBuYW1lLCAuLi5zb3VyY2VzKTtcbiAgfSxcblxuICBhZGRTaGFyZWRMaWJyYXJ5KHRoaXM6IElNYWtlQ29udGV4dCwgbmFtZTogYW55LCAuLi5zb3VyY2VzOiBhbnlbXSk6IFNoYXJlZExpYnJhcnkge1xuICAgIHJldHVybiB0aGlzW0dMT0JBTF0uYWRkU2hhcmVkTGlicmFyeSh0aGlzW1NDT1BFXSwgbmFtZSwgLi4uc291cmNlcyk7XG4gIH0sXG5cbiAgYWRkRXhlY3V0YWJsZSh0aGlzOiBJTWFrZUNvbnRleHQsIG5hbWU6IHN0cmluZywgLi4uc291cmNlczogYW55W10pOiBFeGVjdXRhYmxlIHtcbiAgICByZXR1cm4gdGhpc1tHTE9CQUxdLmFkZEV4ZWN1dGFibGUodGhpc1tTQ09QRV0sIG5hbWUsIC4uLnNvdXJjZXMpO1xuICB9LFxuXG4gIGV4ZWN1dGVTY3JpcHQodGhpczogSU1ha2VDb250ZXh0LCBzY3JpcHQ6IGFueSwgb3B0aW9uczogYW55KSB7XG4gICAgY29uc3Qgc2NyaXB0UGF0aCA9IHRoaXNbU0NPUEVdLlNPVVJDRV9ESVIucmVzb2x2ZShzY3JpcHQpO1xuICAgIGNvbnN0IG1vZHVsZSA9IHJlcXVpcmVJbXBsKHNjcmlwdFBhdGgudG9TdHJpbmcoKSk7XG4gICAgbW9kdWxlKHNjb3BlVmFsdWVBc1ByaW1pdGl2ZXMob3B0aW9ucykpO1xuICB9LFxufTtcblxuZXhwb3J0IGZ1bmN0aW9uIGNyZWF0ZShzY29wZTogU3lzdGVtU2NvcGUsIGdsb2JhbDogR2xvYmFsQ29udGV4dCk6IElNYWtlQ29udGV4dCB7XG4gIGNvbnN0IHByb3BzOiBhbnkgPSB7fTtcbiAgZm9yIChjb25zdCBba2V5LCB2YWx1ZV0gb2YgT2JqZWN0LmVudHJpZXMobWV0aG9kcykpIHtcbiAgICBwcm9wc1trZXldID0ge1xuICAgICAgdmFsdWUsXG4gICAgICBlbnVtZXJhYmxlOiBmYWxzZSxcbiAgICAgIHdyaXRhYmxlOiBmYWxzZSxcbiAgICAgIGNvbmZpZ3VyYWJsZTogZmFsc2UsXG4gICAgfVxuICB9XG5cbiAgY29uc3QgbWsgPSBPYmplY3QuY3JlYXRlKHNjb3BlLCBwcm9wcyk7XG5cbiAgbWtbU0NPUEVdID0gc2NvcGU7XG4gIG1rW0dMT0JBTF0gPSBnbG9iYWw7XG5cbiAgcmV0dXJuIG1rO1xufVxuXG59IC8vIG5hbWVzcGFjZSBNYWtlQ29udGV4dFxuIiwiLypcbiAqIE1JVCBMaWNlbnNlXG4gKlxuICogQ29weXJpZ2h0IChjKSAyMDI1ICBZdXJpaSBZYWt1YmluICh5dXJpaS55YWt1YmluQGdtYWlsLmNvbSlcbiAqXG4gKiBQZXJtaXNzaW9uIGlzIGdyYW50ZWQgdG8gdXNlLCBjb3B5LCBtb2RpZnksIGFuZCBkaXN0cmlidXRlIHRoaXMgc29mdHdhcmVcbiAqIHVuZGVyIHRoZSBNSVQgTGljZW5zZS4gU2VlIExJQ0VOU0UgZmlsZSBmb3IgZGV0YWlscy5cbiAqL1xuXG5pbXBvcnQgcGF0aCBmcm9tIFwibm9kZTpwYXRoXCI7XG5pbXBvcnQgdXJsIGZyb20gXCJub2RlOnVybFwiO1xuXG5jb25zdCBQQVRIID0gU3ltYm9sKFwiUEFUSFwiKTtcblxuY29uc3QgX3BhdGhzID0gbmV3IE1hcDxzdHJpbmcsIERpclBhdGggfCBGaWxlUGF0aD4oKTtcblxuZXhwb3J0IGNsYXNzIEFic29sdXRlUGF0aCB7XG4gIHByaXZhdGUgW1BBVEhdOiBzdHJpbmc7XG5cbiAgcHJvdGVjdGVkIGNvbnN0cnVjdG9yKGZpbGVwYXRoOiBzdHJpbmcpIHtcbiAgICBpZiAoIXBhdGguaXNBYnNvbHV0ZShmaWxlcGF0aCkpXG4gICAgICB0aHJvdyBuZXcgRXJyb3IoYE5vdCBzdXBwb3J0ZWQgcmVsYXRpdmUgcGF0aCBvZiBcIiR7ZmlsZXBhdGh9XCJgKTtcbiAgICB0aGlzW1BBVEhdID0gZmlsZXBhdGg7XG4gIH1cblxuICBwdWJsaWMgam9pbiguLi5wYXRoczogQXJyYXk8QWJzb2x1dGVQYXRoIHwgc3RyaW5nPikge1xuICAgIGNvbnN0IGZpbGVwYXRoID0gcGF0aC5wb3NpeC5qb2luKHRoaXNbUEFUSF0sIC4uLnBhdGhzLm1hcChpID0+IGkudG9TdHJpbmcoKSkpO1xuICAgIHJldHVybiBBYnNvbHV0ZVBhdGguY3JlYXRlKGZpbGVwYXRoKTtcbiAgfVxuXG4gIHB1YmxpYyBkaXJuYW1lKCkge1xuICAgIHJldHVybiBEaXJQYXRoLmNyZWF0ZShwYXRoLnBvc2l4LmRpcm5hbWUodGhpc1tQQVRIXSkpO1xuICB9XG5cbiAgcHVibGljIGJhc2VuYW1lKCkge1xuICAgIHJldHVybiBwYXRoLmJhc2VuYW1lKHRoaXNbUEFUSF0pO1xuICB9XG5cbiAgcHVibGljIHJlbGF0aXZlKHRvOiBBYnNvbHV0ZVBhdGggfCBzdHJpbmcpIHtcbiAgICByZXR1cm4gcGF0aC5wb3NpeC5yZWxhdGl2ZSh0aGlzW1BBVEhdLCAodG8gaW5zdGFuY2VvZiBBYnNvbHV0ZVBhdGgpID8gdG9bUEFUSF0gOiB0byk7XG4gIH1cblxuICBwdWJsaWMgcmVzb2x2ZSguLi5wYXRoczogQXJyYXk8QWJzb2x1dGVQYXRoIHwgc3RyaW5nPikge1xuICAgIHJldHVybiBBYnNvbHV0ZVBhdGguY3JlYXRlKHBhdGgucG9zaXgucmVzb2x2ZSh0aGlzW1BBVEhdLCAuLi5wYXRocy5tYXAoaSA9PiBpLnRvU3RyaW5nKCkpKSk7XG4gIH1cblxuICBwdWJsaWMgbWF0Y2gocmVnZXhwOiBSZWdFeHApIHtcbiAgICByZXR1cm4gdGhpc1tQQVRIXS5tYXRjaChyZWdleHApO1xuICB9XG5cbiAgcHVibGljIHRvVVJMKCkge1xuICAgIHJldHVybiB1cmwucGF0aFRvRmlsZVVSTCh0aGlzW1BBVEhdKTtcbiAgfVxuXG4gIHB1YmxpYyB0b1VSTFN0cmluZygpIHtcbiAgICByZXR1cm4gdGhpcy50b1VSTCgpLnRvU3RyaW5nKCk7XG4gIH1cblxuICBwdWJsaWMgdG9TdHJpbmcoKSB7XG4gICAgcmV0dXJuIHRoaXNbUEFUSF07XG4gIH1cblxuICBwdWJsaWMgdmFsdWVPZigpIHtcbiAgICByZXR1cm4gdGhpc1tQQVRIXTtcbiAgfVxuXG4gIHB1YmxpYyB0b0pTT04oKSB7XG4gICAgcmV0dXJuIHRoaXNbUEFUSF07XG4gIH1cblxuICBwdWJsaWMgc3RhdGljIGlzQWJzb2x1dGUoZmlsZXBhdGg6IEFic29sdXRlUGF0aCB8IHN0cmluZykge1xuICAgIGlmIChmaWxlcGF0aCBpbnN0YW5jZW9mIEFic29sdXRlUGF0aClcbiAgICAgIHJldHVybiB0cnVlO1xuICAgIHJldHVybiBwYXRoLmlzQWJzb2x1dGUoZmlsZXBhdGgpO1xuICB9XG5cbiAgcHVibGljIHN0YXRpYyBlbnN1cmVJbnN0YW5jZSh2YWx1ZTogYW55KTogQWJzb2x1dGVQYXRoIHtcbiAgICBpZiAodmFsdWUgaW5zdGFuY2VvZiBBYnNvbHV0ZVBhdGgpXG4gICAgICByZXR1cm4gdmFsdWU7XG4gICAgdGhyb3cgbmV3IEVycm9yKGBUaGUgJyR7dmFsdWV9JyBpcyBub3QgYSBBYnNvbHV0ZVBhdGhgKTtcbiAgfVxuXG4gIHB1YmxpYyBzdGF0aWMgY3JlYXRlKHBhdGg6IEFic29sdXRlUGF0aCB8IHN0cmluZyk6IEFic29sdXRlUGF0aCB8IERpclBhdGggfCBGaWxlUGF0aCB7XG4gICAgY29uc3QgcmVzdWx0ID0gX3BhdGhzLmdldChwYXRoLnRvU3RyaW5nKCkpO1xuICAgIGlmIChyZXN1bHQpXG4gICAgICByZXR1cm4gcmVzdWx0O1xuXG4gICAgaWYgKHBhdGggaW5zdGFuY2VvZiBBYnNvbHV0ZVBhdGgpXG4gICAgICByZXR1cm4gcGF0aDtcblxuICAgIHJldHVybiBPYmplY3Quc2VhbChuZXcgQWJzb2x1dGVQYXRoKHBhdGgpKTtcbiAgfVxufTtcblxuZXhwb3J0IGNsYXNzIEZpbGVQYXRoIGV4dGVuZHMgQWJzb2x1dGVQYXRoIHtcbiAgcHJpdmF0ZSBjb25zdHJ1Y3RvcihwYXRoU3RyOiBzdHJpbmcpIHtcbiAgICBzdXBlcihwYXRoU3RyKTtcbiAgfVxuXG4gIHB1YmxpYyBzdGF0aWMgZW5zdXJlSW5zdGFuY2UodmFsdWU6IGFueSk6IEZpbGVQYXRoIHtcbiAgICBpZiAodmFsdWUgaW5zdGFuY2VvZiBGaWxlUGF0aClcbiAgICAgIHJldHVybiB2YWx1ZTtcbiAgICB0aHJvdyBuZXcgRXJyb3IoYFRoZSAnJHt2YWx1ZX0nIGlzIG5vdCBhIEZpbGVQYXRoYCk7XG4gIH1cbiAgXG4gIHB1YmxpYyBzdGF0aWMgY3JlYXRlKHBhdGg6IGFueSk6IEZpbGVQYXRoIHtcbiAgICBpZiAocGF0aCBpbnN0YW5jZW9mIEZpbGVQYXRoKVxuICAgICAgcmV0dXJuIHBhdGg7XG5cbiAgICBpZiAocGF0aCBpbnN0YW5jZW9mIEFic29sdXRlUGF0aClcbiAgICAgIHBhdGggPSBwYXRoLnRvU3RyaW5nKCk7XG5cbiAgICBpZiAodHlwZW9mIHBhdGggIT09IFwic3RyaW5nXCIpXG4gICAgICB0aHJvdyBuZXcgRXJyb3IoYFRoZSAnJHtwYXRofScgaXMgbm90IGEgc3RyaW5nYCk7XG5cbiAgICBsZXQgZmlsZVBhdGggPSBfcGF0aHMuZ2V0KHBhdGgpO1xuICAgIGlmIChmaWxlUGF0aClcbiAgICAgIHJldHVybiBGaWxlUGF0aC5lbnN1cmVJbnN0YW5jZShmaWxlUGF0aCk7XG5cbiAgICBmaWxlUGF0aCA9IE9iamVjdC5zZWFsKG5ldyBGaWxlUGF0aChwYXRoKSk7XG4gICAgX3BhdGhzLnNldChwYXRoLCBmaWxlUGF0aCk7XG5cbiAgICByZXR1cm4gZmlsZVBhdGg7XG4gIH1cbn1cblxuZXhwb3J0IGNsYXNzIERpclBhdGggZXh0ZW5kcyBBYnNvbHV0ZVBhdGgge1xuICBwcml2YXRlIGNvbnN0cnVjdG9yKHBhdGhTdHI6IHN0cmluZykge1xuICAgIHN1cGVyKHBhdGhTdHIpO1xuICB9XG5cbiAgcHVibGljIHN0YXRpYyBlbnN1cmVJbnN0YW5jZSh2YWx1ZTogYW55KTogRGlyUGF0aCB7XG4gICAgaWYgKHZhbHVlIGluc3RhbmNlb2YgRGlyUGF0aClcbiAgICAgIHJldHVybiB2YWx1ZTtcbiAgICB0aHJvdyBuZXcgRXJyb3IoYFRoZSAnJHt2YWx1ZX0nIGlzIG5vdCBhIERpclBhdGhgKTtcbiAgfVxuXG4gIHB1YmxpYyBzdGF0aWMgY3JlYXRlKHBhdGg6IGFueSk6IERpclBhdGgge1xuICAgIGlmIChwYXRoIGluc3RhbmNlb2YgRGlyUGF0aClcbiAgICAgIHJldHVybiBwYXRoO1xuXG4gICAgaWYgKHBhdGggaW5zdGFuY2VvZiBBYnNvbHV0ZVBhdGgpXG4gICAgICBwYXRoID0gcGF0aC50b1N0cmluZygpO1xuXG4gICAgaWYgKHR5cGVvZiBwYXRoICE9PSBcInN0cmluZ1wiKVxuICAgICAgdGhyb3cgbmV3IEVycm9yKGBUaGUgJyR7cGF0aH0nIGlzIG5vdCBhIHN0cmluZ2ApO1xuXG4gICAgbGV0IGRpclBhdGggPSBfcGF0aHMuZ2V0KHBhdGgpO1xuICAgIGlmIChkaXJQYXRoKVxuICAgICAgcmV0dXJuIERpclBhdGguZW5zdXJlSW5zdGFuY2UoZGlyUGF0aCk7XG5cbiAgICBkaXJQYXRoID0gT2JqZWN0LnNlYWwobmV3IERpclBhdGgocGF0aCkpO1xuICAgIF9wYXRocy5zZXQocGF0aCwgZGlyUGF0aCk7XG5cbiAgICByZXR1cm4gZGlyUGF0aDtcbiAgfVxufTtcbiIsIi8qXG4gKiBNSVQgTGljZW5zZVxuICpcbiAqIENvcHlyaWdodCAoYykgMjAyNSAgWXVyaWkgWWFrdWJpbiAoeXVyaWkueWFrdWJpbkBnbWFpbC5jb20pXG4gKlxuICogUGVybWlzc2lvbiBpcyBncmFudGVkIHRvIHVzZSwgY29weSwgbW9kaWZ5LCBhbmQgZGlzdHJpYnV0ZSB0aGlzIHNvZnR3YXJlXG4gKiB1bmRlciB0aGUgTUlUIExpY2Vuc2UuIFNlZSBMSUNFTlNFIGZpbGUgZm9yIGRldGFpbHMuXG4gKi9cblxuaW1wb3J0IHsgRGlyUGF0aCB9IGZyb20gXCJAL2NvcmUvUGF0aFwiO1xuaW1wb3J0IHsgR2xvYmFsQ29udGV4dCB9IGZyb20gXCJAL2NvcmUvR2xvYmFsQ29udGV4dFwiO1xuaW1wb3J0IHsgU3lzdGVtU2NvcGUgfSBmcm9tIFwiQC9jb3JlL1N5c3RlbVNjb3BlXCI7XG5pbXBvcnQgeyBmaW5kUHJvZ3JhbVN5bmMgfSBmcm9tIFwiQC9jb3JlL0ZpbmRQcm9ncmFtXCI7XG5cbmNvbnN0IEdMT0JBTCA9IFN5bWJvbChcIkdMT0JBTFwiKTtcbmNvbnN0IFNDT1BFID0gU3ltYm9sKFwiU0NPUEVcIik7XG5cbmV4cG9ydCBuYW1lc3BhY2UgUGx1Z2luQ29udGV4dCB7XG5cbmludGVyZmFjZSBJUGx1Z2luQ29udGV4dCBleHRlbmRzIFN5c3RlbVNjb3BlIHtcbiAgZmluZFByb2dyYW0obmFtZTogc3RyaW5nKTogc3RyaW5nIHwgdW5kZWZpbmVkO1xuICBhZGRTdWJkaXJlY3RvcnlBbGlhcyhzcmM6IGFueSwgZGVzdDogYW55KTogdm9pZDtcblxuICBbR0xPQkFMXTogR2xvYmFsQ29udGV4dDtcbiAgW1NDT1BFXTogU3lzdGVtU2NvcGU7XG59O1xuXG5mdW5jdGlvbiBhZGRTdWJkaXJlY3RvcnlBbGlhcyh0aGlzOiBJUGx1Z2luQ29udGV4dCwgc3JjOiBhbnksIGRlc3Q6IGFueSkge1xuICBjb25zdCBzcmNQYXRoID0gRGlyUGF0aC5jcmVhdGUodGhpc1tTQ09QRV0uU0NSSVBUX0RJUi5yZXNvbHZlKHNyYykpO1xuICBjb25zdCBkZXN0UGF0aCA9IChkZXN0ID09PSBudWxsKSA/IG51bGwgOiBEaXJQYXRoLmNyZWF0ZSh0aGlzW1NDT1BFXS5TQ1JJUFRfRElSLnJlc29sdmUoZGVzdCkpO1xuICB0aGlzW0dMT0JBTF0uYWRkU3ViZGlyZWN0b3J5QWxpYXMoc3JjUGF0aCwgZGVzdFBhdGgpO1xufVxuXG5leHBvcnQgZnVuY3Rpb24gY3JlYXRlKHNjb3BlOiBTeXN0ZW1TY29wZSwgZ2xvYmFsOiBHbG9iYWxDb250ZXh0KTogSVBsdWdpbkNvbnRleHQge1xuICBjb25zdCBtayA9IE9iamVjdC5jcmVhdGUoc2NvcGUsIHtcbiAgICBmaW5kUHJvZ3JhbToge1xuICAgICAgdmFsdWU6IGZpbmRQcm9ncmFtU3luYyxcbiAgICAgIGVudW1lcmFibGU6IGZhbHNlLFxuICAgICAgd3JpdGFibGU6IGZhbHNlLFxuICAgICAgY29uZmlndXJhYmxlOiBmYWxzZSxcbiAgICB9LFxuICAgIGFkZFN1YmRpcmVjdG9yeUFsaWFzOiB7XG4gICAgICB2YWx1ZTogYWRkU3ViZGlyZWN0b3J5QWxpYXMsXG4gICAgICBlbnVtZXJhYmxlOiBmYWxzZSxcbiAgICAgIHdyaXRhYmxlOiBmYWxzZSxcbiAgICAgIGNvbmZpZ3VyYWJsZTogZmFsc2UsXG4gICAgfSxcbiAgfSk7XG5cbiAgbWtbU0NPUEVdID0gc2NvcGU7XG4gIG1rW0dMT0JBTF0gPSBnbG9iYWw7XG5cbiAgcmV0dXJuIG1rO1xufVxuXG59IC8vIG5hbWVzcGFjZSBQbHVnaW5Db250ZXh0XG4iLCIvKlxuICogTUlUIExpY2Vuc2VcbiAqXG4gKiBDb3B5cmlnaHQgKGMpIDIwMjUgIFl1cmlpIFlha3ViaW4gKHl1cmlpLnlha3ViaW5AZ21haWwuY29tKVxuICpcbiAqIFBlcm1pc3Npb24gaXMgZ3JhbnRlZCB0byB1c2UsIGNvcHksIG1vZGlmeSwgYW5kIGRpc3RyaWJ1dGUgdGhpcyBzb2Z0d2FyZVxuICogdW5kZXIgdGhlIE1JVCBMaWNlbnNlLiBTZWUgTElDRU5TRSBmaWxlIGZvciBkZXRhaWxzLlxuICovXG5cblxuaW1wb3J0IHBhdGggZnJvbSBcIm5vZGU6cGF0aFwiO1xuXG5pbXBvcnQgeyBnZXRQYXRoU3RyaW5nIH0gZnJvbSBcIkAvdXRpbHMvRmlsZVN5c3RlbVwiO1xuaW1wb3J0IHsgU2V0dGluZ3NTdG9yYWdlIH0gZnJvbSBcIkAvdXRpbHMvU2V0dGluZ3NTdG9yYWdlXCI7XG5pbXBvcnQgeyBzcGF3bkFzeW5jIH0gZnJvbSBcIkAvdXRpbHMvQ2hpbGRQcm9jZXNzXCI7XG5pbXBvcnQgeyBjcmVhdGVMb2dnZXIgfSBmcm9tIFwiQC9sb2dnZXJcIjtcblxuY29uc3QgbG9nZ2VyID0gY3JlYXRlTG9nZ2VyKGltcG9ydC5tZXRhLnVybCk7XG5cbmV4cG9ydCBhc3luYyBmdW5jdGlvbiBwcm9jZXNzQWN0aW9uKGNvbmZpZzogYW55LCBlbnZpcm9ubWVudDogYW55LCBzZXR0aW5nczogU2V0dGluZ3NTdG9yYWdlKSB7XG4gIGlmICghY29uZmlnLmNvbW1hbmQpXG4gICAgdGhyb3cgbmV3IEVycm9yKFwiUmVxdWlyZWQgY29tbWFuZCBmaWVsZCBmb3IgcHJvY2VzcyBhY3Rpb25cIik7XG4gIGNvbnN0IHNvdXJjZURpciA9IGdldFBhdGhTdHJpbmcoY29uZmlnLnNvdXJjZURpcik7XG4gIGNvbnN0IGJpbmFyeURpciA9IGdldFBhdGhTdHJpbmcoY29uZmlnLmJpbmFyeURpcik7XG4gIGxldCB7IGNvbW1hbmQgfSA9IGNvbmZpZztcbiAgaWYgKCFwYXRoLmlzQWJzb2x1dGUoY29tbWFuZCkgJiYgKGNvbW1hbmQuaW5jbHVkZXMocGF0aC5wb3NpeC5kZWxpbWl0ZXIpIHx8IGNvbW1hbmQuaW5jbHVkZXMocGF0aC53aW4zMi5kZWxpbWl0ZXIpKSkge1xuICAgIGNvbW1hbmQgPSBwYXRoLnJlc29sdmUoc291cmNlRGlyLCBjb21tYW5kKTtcbiAgfVxuICBjb25zdCByZXMgPSBhd2FpdCBzcGF3bkFzeW5jKGNvbW1hbmQsIGNvbmZpZy5hcmdzIHx8IFtdLCB7XG4gICAgY3dkOiBiaW5hcnlEaXIsXG4gICAgZW52OiBlbnZpcm9ubWVudCxcbiAgICBleHRyYToge1xuICAgICAgb3V0cHV0OiBgcHJvY2Vzcy5sb2dgLFxuICAgIH0sXG4gIH0pO1xuICBpZiAocmVzLnN0YXR1cyAhPT0gMCkge1xuICAgIHRocm93IG5ldyBFcnJvcihgcHJvY2VzcyByZXR1cm5lZCBzdGF0dXMgJHtyZXMuc3RhdHVzfWApO1xuICB9XG59XG4iLCIvKlxuICogTUlUIExpY2Vuc2VcbiAqXG4gKiBDb3B5cmlnaHQgKGMpIDIwMjUgIFl1cmlpIFlha3ViaW4gKHl1cmlpLnlha3ViaW5AZ21haWwuY29tKVxuICpcbiAqIFBlcm1pc3Npb24gaXMgZ3JhbnRlZCB0byB1c2UsIGNvcHksIG1vZGlmeSwgYW5kIGRpc3RyaWJ1dGUgdGhpcyBzb2Z0d2FyZVxuICogdW5kZXIgdGhlIE1JVCBMaWNlbnNlLiBTZWUgTElDRU5TRSBmaWxlIGZvciBkZXRhaWxzLlxuICovXG5cbmltcG9ydCB7IGVuc3VyZUJvb2xlYW4sIGVuc3VyZVN0cmluZywgZW5zdXJlTnVtYmVyLCBlbnN1cmVBcnJheSB9IGZyb20gXCJAL3V0aWxzL1N0cmljdFR5cGVcIjtcbmltcG9ydCB7IERpclBhdGgsIEZpbGVQYXRoIH0gZnJvbSBcIkAvY29yZS9QYXRoXCI7XG5cbmNvbnN0IERFRklORV9NQVAgPSBTeW1ib2woXCJERUZJTkVfTUFQXCIpO1xuXG5leHBvcnQgbmFtZXNwYWNlIFNjb3BlSGVscGVyIHtcblxuZnVuY3Rpb24gZGVmaW5lVmFyaWFibGVJbXBsKHNjb3BlOiBhbnksIGdyb3VwOiBzdHJpbmcsIG5hbWU6IHN0cmluZywgZGVzY3JpcHRvcjogYW55KSB7XG4gIGlmIChuYW1lID09PSBcIkRFRklORV9NQVBcIikge1xuICAgIHRocm93IG5ldyBFcnJvcihgJHtuYW1lfSBpcyByZXNlcnZlZCBhbmQgY2Fubm90IGJlIHVzZWQgYXMgYSB2YXJpYWJsZWApO1xuICB9XG5cbiAgaWYgKCFzY29wZVtERUZJTkVfTUFQXSlcbiAgICBzY29wZVtERUZJTkVfTUFQXSA9IHt9O1xuXG4gIGNvbnN0IHR5cGUgPSBkZXNjcmlwdG9yLnR5cGUgfHwgKEFycmF5LmlzQXJyYXkoZGVzY3JpcHRvci52YWx1ZSkgPyBcImFycmF5XCIgOiB0eXBlb2YgZGVzY3JpcHRvci52YWx1ZSk7XG5cbiAgbGV0IGRlZmluZUVudHJ5ID0gc2NvcGVbREVGSU5FX01BUF1bbmFtZV07XG4gIGlmICghZGVmaW5lRW50cnkpIHtcbiAgICBkZWZpbmVFbnRyeSA9IHsgZ3JvdXAsIHR5cGUsIHN5bWJvbDogU3ltYm9sKG5hbWUpIH07XG4gICAgc2NvcGVbREVGSU5FX01BUF1bbmFtZV0gPSBkZWZpbmVFbnRyeTtcbiAgfVxuICBlbHNlIGlmIChncm91cCAhPT0gZGVmaW5lRW50cnkuZ3JvdXApIHtcbiAgICBpZiAoZGVmaW5lRW50cnkuZ3JvdXApXG4gICAgICB0aHJvdyBuZXcgRXJyb3IoYEF0dGVtcHRpbmcgdG8gcmVjcmVhdGUgXCIke25hbWV9XCIgdmFyaWFibGUgd2l0aCBcIiR7ZGVmaW5lRW50cnkuZ3JvdXB9XCIgZ3JvdXAgaW4gYW5vdGhlciBcIiR7Z3JvdXB9XCJgKTtcbiAgICBkZWZpbmVFbnRyeS5ncm91cCA9IGdyb3VwO1xuICB9XG5cbiAgZGVmaW5lRW50cnkuZGVzY3JpcHRpb24gPSBkZXNjcmlwdG9yLmRlc2NyaXB0aW9uIHx8IGRlZmluZUVudHJ5LmRlc2NyaXB0aW9uIHx8IFwiXCI7XG5cbiAgbGV0IGVuc3VyZVZhbHVlOiAodmFsdWU6IGFueSkgPT4ge307XG4gIGlmIChBcnJheS5pc0FycmF5KHR5cGUpKSB7XG4gICAgbGV0IGl0ZW1UeXBlO1xuICAgIGZvciAoY29uc3QgaXRlciBvZiB0eXBlKSB7XG4gICAgICBjb25zdCBpdCA9IHR5cGVvZiBpdGVyO1xuICAgICAgaWYgKCFpdGVtVHlwZSlcbiAgICAgICAgaXRlbVR5cGUgPSBpdDtcbiAgICAgIGVsc2UgaWYgKGl0ZW1UeXBlICE9PSBpdClcbiAgICAgICAgdGhyb3cgbmV3IEVycm9yKGBBbGwgZWxlbWVudHMgZm9yICR7bmFtZX0gbXVzdCBiZSBvZiB0aGUgc2FtZSB0eXBlYCk7XG4gICAgfVxuICAgIGlmIChpdGVtVHlwZSAhPT0gXCJib29sZWFuXCIgJiYgaXRlbVR5cGUgIT09IFwibnVtYmVyXCIgJiYgaXRlbVR5cGUgIT09IFwic3RyaW5nXCIpXG4gICAgICB0aHJvdyBuZXcgRXJyb3IoYEVudW0gJHtuYW1lfSBub3Qgc3VwcG9ydCAke2l0ZW1UeXBlfSB0eXBlYCk7XG4gICAgZW5zdXJlVmFsdWUgPSAodmFsdWU6IGFueSkgPT4ge1xuICAgICAgaWYgKHR5cGUuaW5jbHVkZXModmFsdWUpKVxuICAgICAgICByZXR1cm4gdmFsdWU7XG4gICAgICB0aHJvdyBuZXcgRXJyb3IoYFRoZSAnJHt2YWx1ZX0nIGlzIG5vdCBhICR7dHlwZX1gKTtcbiAgICB9XG4gIH1cbiAgZWxzZSBpZiAodHlwZSA9PT0gXCJib29sZWFuXCIpXG4gICAgZW5zdXJlVmFsdWUgPSBlbnN1cmVCb29sZWFuO1xuICBlbHNlIGlmICh0eXBlID09PSBcIm51bWJlclwiKVxuICAgIGVuc3VyZVZhbHVlID0gZW5zdXJlTnVtYmVyO1xuICBlbHNlIGlmICh0eXBlID09PSBcInN0cmluZ1wiKVxuICAgIGVuc3VyZVZhbHVlID0gZW5zdXJlU3RyaW5nO1xuICBlbHNlIGlmICh0eXBlID09PSBcImFycmF5XCIpXG4gICAgZW5zdXJlVmFsdWUgPSBlbnN1cmVBcnJheTtcbiAgZWxzZSBpZiAodHlwZSA9PT0gXCJEaXJQYXRoXCIpXG4gICAgZW5zdXJlVmFsdWUgPSBEaXJQYXRoLmNyZWF0ZTtcbiAgZWxzZSBpZiAodHlwZSA9PT0gXCJGaWxlUGF0aFwiKVxuICAgIGVuc3VyZVZhbHVlID0gRmlsZVBhdGguY3JlYXRlO1xuICBlbHNlXG4gICAgdGhyb3cgbmV3IEVycm9yKGBWYXJpYWJsZSBcIiR7bmFtZX1cIiBoYXMgd3JvbmcgJHt0eXBlfSB0eXBlYCk7XG5cbiAgaWYgKGRlc2NyaXB0b3IudmFsdWUgIT09IHVuZGVmaW5lZCkge1xuICAgIGRlZmluZUVudHJ5LnZhbHVlID0gKHR5cGUgPT09IFwiYXJyYXlcIikgPyBBcnJheS5mcm9tKGRlc2NyaXB0b3IudmFsdWUpIDogZW5zdXJlVmFsdWUoZGVzY3JpcHRvci52YWx1ZSk7XG4gIH1cbiAgZWxzZSB7XG4gICAgZGVmaW5lRW50cnkudmFsdWUgPSAodHlwZSA9PT0gXCJhcnJheVwiKSA/IFtdIDogdW5kZWZpbmVkO1xuICB9XG5cbiAgY29uc3QgeyBzeW1ib2wsIHZhbHVlIH0gPSBkZWZpbmVFbnRyeTtcblxuICBpZiAoc2NvcGVbc3ltYm9sXSA9PT0gdW5kZWZpbmVkICYmIHZhbHVlICE9PSB1bmRlZmluZWQpXG4gICAgc2NvcGVbc3ltYm9sXSA9IEFycmF5LmlzQXJyYXkodmFsdWUpID8gQXJyYXkuZnJvbSh2YWx1ZSkgOiB2YWx1ZTtcblxuICBjb25zdCBkZXNjOiBhbnkgPSB7XG4gICAgY29uZmlndXJhYmxlOiB0cnVlLFxuICAgIGVudW1lcmFibGU6IHRydWUsXG4gICAgZ2V0KCkge1xuICAgICAgY29uc3QgdmFsdWUgPSBzY29wZVtzeW1ib2xdO1xuICAgICAgLyppZiAodmFsdWUgPT09IHVuZGVmaW5lZClcbiAgICAgICAgdGhyb3cgbmV3IEVycm9yKGBWYWx1ZSBvZiAke25hbWV9IGNhbm5vdCBiZSBvYnRhaW5lZCBiZWNhdXNlIGl0IGhhcyBub3QgYmVlbiBlc3RhYmxpc2hlZGApOyovXG4gICAgICByZXR1cm4gdmFsdWU7XG4gICAgfSxcbiAgICBzZXQodmFsdWU6IGFueSkge1xuICAgICAgc2NvcGVbc3ltYm9sXSA9IGVuc3VyZVZhbHVlKHZhbHVlKTtcbiAgICB9LFxuICB9O1xuXG4gIE9iamVjdC5kZWZpbmVQcm9wZXJ0eShzY29wZSwgbmFtZSwgZGVzYyk7XG59XG5cbmV4cG9ydCBmdW5jdGlvbiBkZWZpbmVWYXJpYWJsZShzY29wZTogYW55LCBncm91cDogc3RyaW5nLCBuYW1lOiBzdHJpbmcsIGRlc2NyaXB0b3I6IGFueSkge1xuICBpZiAoIWdyb3VwKSB7XG4gICAgdGhyb3cgbmV3IEVycm9yKGBBdHRlbXB0aW5nIHRvIGNyZWF0ZSBcIiR7bmFtZX1cIiB2YXJpYWJsZSB3aXRoIGFuIGVtcHR5IGdyb3VwYCk7XG4gIH1cbiAgZGVmaW5lVmFyaWFibGVJbXBsKHNjb3BlLCBncm91cCwgbmFtZSwgZGVzY3JpcHRvcik7XG59XG5cbmV4cG9ydCBmdW5jdGlvbiBkZWZpbmVWYXJpYWJsZXMoc2NvcGU6IGFueSwgZ3JvdXA6IHN0cmluZywgZGVzY3JpcHRvcnM6IGFueSkge1xuICBmb3IgKGNvbnN0IFsgbmFtZSwgZGVzY3JpcHRvciBdIG9mIE9iamVjdC5lbnRyaWVzKGRlc2NyaXB0b3JzKSlcbiAgICBTY29wZUhlbHBlci5kZWZpbmVWYXJpYWJsZShzY29wZSwgZ3JvdXAsIG5hbWUsIGRlc2NyaXB0b3IpO1xufVxuXG5leHBvcnQgZnVuY3Rpb24gY2xvbmUodGFyZ2V0OiBhbnksIHNjb3BlOiBhbnkpIHtcbiAgaWYgKHNjb3BlW0RFRklORV9NQVBdKSB7XG4gICAgZm9yIChjb25zdCBbIG5hbWUsIHsgZ3JvdXAsIHN5bWJvbCwgdHlwZSwgdmFsdWUsIGRlc2NyaXB0aW9uIH0gXSBvZiBPYmplY3QuZW50cmllcyhzY29wZVtERUZJTkVfTUFQXSkgYXMgYW55KSB7XG4gICAgICBkZWZpbmVWYXJpYWJsZUltcGwodGFyZ2V0LCBncm91cCwgbmFtZSwgeyB0eXBlLCB2YWx1ZSwgZGVzY3JpcHRpb24gfSk7XG4gICAgICBpZiAoc2NvcGVbc3ltYm9sXSAhPT0gdW5kZWZpbmVkKVxuICAgICAgICB0YXJnZXRbbmFtZV0gPSBzY29wZVtzeW1ib2xdO1xuICAgIH1cbiAgfVxuICByZXR1cm4gdGFyZ2V0O1xufVxuXG5leHBvcnQgZnVuY3Rpb24gZ2V0VmFyaWFibGVzQnlHcm91cChzY29wZTogYW55LCBncnA/OiBzdHJpbmcpIHtcbiAgY29uc3QgcmVzdWx0OiBhbnkgPSB7fTtcbiAgZm9yIChjb25zdCBbIG5hbWUsIHsgdHlwZSwgZ3JvdXAsIHN5bWJvbCwgZGVzY3JpcHRpb24gfSBdIG9mIE9iamVjdC5lbnRyaWVzKHNjb3BlW0RFRklORV9NQVBdKSBhcyBhbnkpIHtcbiAgICBpZiAoZ3JvdXAgJiYgZ3JvdXAgIT09IGdycClcbiAgICAgIGNvbnRpbnVlO1xuICAgIHJlc3VsdFtuYW1lXSA9IHsgdHlwZSwgZGVzY3JpcHRpb24sIHZhbHVlOiBzY29wZVtzeW1ib2xdIH07XG4gIH1cbiAgcmV0dXJuIHJlc3VsdDtcbn1cblxuZXhwb3J0IGZ1bmN0aW9uIGFwcGx5VmFyaWFibGUoc2NvcGU6IGFueSwgbmFtZTogc3RyaW5nLCB2YWx1ZTogYW55KSB7XG4gIGlmIChPYmplY3QuZ2V0T3duUHJvcGVydHlEZXNjcmlwdG9yKHNjb3BlLCBuYW1lKSlcbiAgICBzY29wZVtuYW1lXSA9IHZhbHVlO1xuICBlbHNlXG4gICAgZGVmaW5lVmFyaWFibGVJbXBsKHNjb3BlLCBcIlwiLCBuYW1lLCB7IHZhbHVlIH0pO1xufVxuXG5leHBvcnQgZnVuY3Rpb24gYXBwbHlWYXJpYWJsZXMoc2NvcGU6IGFueSwgdmFyaWFibGVzOiBvYmplY3QpIHtcbiAgZm9yIChjb25zdCBbIG5hbWUsIHZhbHVlIF0gb2YgT2JqZWN0LmVudHJpZXModmFyaWFibGVzKSlcbiAgICBTY29wZUhlbHBlci5hcHBseVZhcmlhYmxlKHNjb3BlLCBuYW1lLCB2YWx1ZSk7XG59XG5cbmV4cG9ydCBmdW5jdGlvbiBtZXJnZVZhcmlhYmxlcyh0YXJnZXQ6IGFueSwgc291cmNlOiBhbnkpOiBvYmplY3Qge1xuICBpZiAoIXRhcmdldCB8fCB0eXBlb2YgdGFyZ2V0ICE9PSBcIm9iamVjdFwiKVxuICAgIHRocm93IG5ldyBFcnJvcihgVGFyZ2V0ICR7dGFyZ2V0fSBpcyBub3Qgb2JqZWN0YCk7XG4gIGlmICghc291cmNlIHx8IHR5cGVvZiBzb3VyY2UgIT09IFwib2JqZWN0XCIpXG4gICAgdGhyb3cgbmV3IEVycm9yKGBTb3VyY2UgJHtzb3VyY2V9IGlzIG5vdCBvYmplY3RgKTtcbiAgZm9yIChjb25zdCBbIGtleSwgdmFsIF0gb2YgT2JqZWN0LmVudHJpZXMoc291cmNlKSkge1xuICAgIGlmICghT2JqZWN0Lmhhc093bih0YXJnZXQsIGtleSkpIHtcbiAgICAgIHRhcmdldFtrZXldID0gdmFsO1xuICAgIH1cbiAgICBlbHNlIGlmIChBcnJheS5pc0FycmF5KHRhcmdldFtrZXldKSkge1xuICAgICAgaWYgKCFBcnJheS5pc0FycmF5KHZhbCkpXG4gICAgICAgIHRocm93IG5ldyBFcnJvcihgU291cmNlICR7a2V5fSBoYXMgJHt2YWx9IHdoaWNoIGlzIG5vdCBhbiBhcnJheWApO1xuICAgICAgZm9yIChjb25zdCBpdGVyIG9mIHZhbClcbiAgICAgICAgdGFyZ2V0W2tleV0ucHVzaChpdGVyKTtcbiAgICB9XG4gICAgZWxzZSBpZiAodGFyZ2V0W2tleV0gJiYgdHlwZW9mIHRhcmdldFtrZXldID09PSBcIm9iamVjdFwiKSB7XG4gICAgICBpZiAoIXZhbCB8fCB0eXBlb2YgdmFsICE9PSBcIm9iamVjdFwiKVxuICAgICAgICB0aHJvdyBuZXcgRXJyb3IoYFNvdXJjZSAke2tleX0gaGFzICR7dmFsfSB3aGljaCBpcyBub3QgYW4gb2JqZWN0YCk7XG4gICAgICBtZXJnZVZhcmlhYmxlcyh0YXJnZXRba2V5XSwgdmFsKTtcbiAgICB9XG4gICAgZWxzZSB7XG4gICAgICB0aHJvdyBuZXcgRXJyb3IoYFNvdXJjZSAke2tleX0gaGFzICR7dmFsfSB3aGljaCBpcyBub3QgJHt0eXBlb2YgdGFyZ2V0W2tleV19YCk7XG4gICAgfVxuICB9XG4gIHJldHVybiB0YXJnZXQ7XG59XG5cbn0gLy8gU2NvcGVIZWxwZXJcbiIsIi8qXG4gKiBNSVQgTGljZW5zZVxuICpcbiAqIENvcHlyaWdodCAoYykgMjAyNSAgWXVyaWkgWWFrdWJpbiAoeXVyaWkueWFrdWJpbkBnbWFpbC5jb20pXG4gKlxuICogUGVybWlzc2lvbiBpcyBncmFudGVkIHRvIHVzZSwgY29weSwgbW9kaWZ5LCBhbmQgZGlzdHJpYnV0ZSB0aGlzIHNvZnR3YXJlXG4gKiB1bmRlciB0aGUgTUlUIExpY2Vuc2UuIFNlZSBMSUNFTlNFIGZpbGUgZm9yIGRldGFpbHMuXG4gKi9cblxuaW1wb3J0IHsgQ3VzdG9tU2NyaXB0IH0gZnJvbSBcIkAvY29yZS9DdXN0b21TY3JpcHRcIjtcblxuY29uc3QgTUFQID0gU3ltYm9sKFwiTUFQXCIpO1xuY29uc3QgRU5UUklFUyA9IFN5bWJvbChcIkVOVFJJRVNcIik7XG5cbmV4cG9ydCBjbGFzcyBTY3JpcHRDb2xsZWN0aW9uIHtcbiAgcHJpdmF0ZSBbTUFQXTogeyBbbmFtZTogc3RyaW5nXTogQ3VzdG9tU2NyaXB0IH07XG4gIHByaXZhdGUgW0VOVFJJRVNdOiBDdXN0b21TY3JpcHRbXTtcblxuICBwcml2YXRlIGNvbnN0cnVjdG9yKCkge1xuICAgIHRoaXNbTUFQXSA9IHt9O1xuICAgIHRoaXNbRU5UUklFU10gPSBbXTtcbiAgfVxuXG4gIHB1YmxpYyBzdGF0aWMgY3JlYXRlKCkge1xuICAgIHJldHVybiBPYmplY3Quc2VhbChuZXcgU2NyaXB0Q29sbGVjdGlvbik7XG4gIH1cblxuICBwdWJsaWMgZ2V0IEVOVFJJRVMoKSB7XG4gICAgcmV0dXJuIHRoaXNbRU5UUklFU107XG4gIH1cblxuICBwdWJsaWMgZ2V0KG5hbWU6IHN0cmluZyk6IEN1c3RvbVNjcmlwdCB8IHVuZGVmaW5lZCB7XG4gICAgcmV0dXJuIHRoaXNbTUFQXVtuYW1lXTtcbiAgfVxuXG4gIHB1YmxpYyBzZXQobmFtZTogc3RyaW5nLCB0YXJnZXQ6IEN1c3RvbVNjcmlwdCkge1xuICAgIGlmICghbmFtZSlcbiAgICAgIHRocm93IG5ldyBFcnJvcihcIk5vdCBzdXBwb3J0ZWQgbXB0eSBuYW1lIGZvciBDdXN0b21TY3JpcHRcIik7XG4gICAgaWYgKHRoaXNbTUFQXVtuYW1lXSlcbiAgICAgIHRocm93IG5ldyBFcnJvcihgU2NyaXB0IFwiJHtuYW1lfVwiIGV4aXN0c2ApO1xuICAgIHRoaXNbTUFQXVtuYW1lXSA9IHRhcmdldDtcbiAgICB0aGlzW0VOVFJJRVNdLnB1c2godGFyZ2V0KTtcbiAgfVxuXG4gIHB1YmxpYyBhZGQodGFyZ2V0OiBDdXN0b21TY3JpcHQpIHtcbiAgICB0aGlzW0VOVFJJRVNdLnB1c2godGFyZ2V0KTtcbiAgfVxuICBcbiAgcHVibGljIHRvSlNPTigpOiBvYmplY3Qge1xuICAgIHJldHVybiB0aGlzW0VOVFJJRVNdO1xuICB9XG59O1xuIiwiLypcbiAqIE1JVCBMaWNlbnNlXG4gKlxuICogQ29weXJpZ2h0IChjKSAyMDI1ICBZdXJpaSBZYWt1YmluICh5dXJpaS55YWt1YmluQGdtYWlsLmNvbSlcbiAqXG4gKiBQZXJtaXNzaW9uIGlzIGdyYW50ZWQgdG8gdXNlLCBjb3B5LCBtb2RpZnksIGFuZCBkaXN0cmlidXRlIHRoaXMgc29mdHdhcmVcbiAqIHVuZGVyIHRoZSBNSVQgTGljZW5zZS4gU2VlIExJQ0VOU0UgZmlsZSBmb3IgZGV0YWlscy5cbiAqL1xuXG5pbXBvcnQgeyBmaW5kUHJvZ3JhbVN5bmMgfSBmcm9tIFwiQC9jb3JlL0ZpbmRQcm9ncmFtXCI7XG5pbXBvcnQgeyBHbG9iYWxDb250ZXh0IH0gZnJvbSBcIkAvY29yZS9HbG9iYWxDb250ZXh0XCI7XG5pbXBvcnQgeyBTeXN0ZW1TY29wZSB9IGZyb20gXCJAL2NvcmUvU3lzdGVtU2NvcGVcIjtcblxuY29uc3QgR0xPQkFMID0gU3ltYm9sKFwiR0xPQkFMXCIpO1xuY29uc3QgU0NPUEUgPSBTeW1ib2woXCJTQ09QRVwiKTtcblxuZXhwb3J0IG5hbWVzcGFjZSBTY3JpcHRDb250ZXh0IHtcblxuaW50ZXJmYWNlIElTY3JpcHRDb250ZXh0IGV4dGVuZHMgU3lzdGVtU2NvcGUge1xuICBmaW5kUHJvZ3JhbShuYW1lOiBzdHJpbmcpOiBzdHJpbmcgfCB1bmRlZmluZWQ7XG59O1xuICBcbmV4cG9ydCBmdW5jdGlvbiBjcmVhdGUoc2NvcGU6IFN5c3RlbVNjb3BlLCBnbG9iYWw6IEdsb2JhbENvbnRleHQpOiBJU2NyaXB0Q29udGV4dCB7XG4gIGNvbnN0IG1rID0gT2JqZWN0LmNyZWF0ZShzY29wZSwge1xuICAgIGZpbmRQcm9ncmFtOiB7XG4gICAgICB2YWx1ZTogZmluZFByb2dyYW1TeW5jLFxuICAgICAgZW51bWVyYWJsZTogZmFsc2UsXG4gICAgICB3cml0YWJsZTogZmFsc2UsXG4gICAgICBjb25maWd1cmFibGU6IGZhbHNlLFxuICAgIH0sXG4gIH0pO1xuXG4gIG1rW1NDT1BFXSA9IHNjb3BlO1xuICBta1tHTE9CQUxdID0gZ2xvYmFsO1xuXG4gIHJldHVybiBtaztcbn1cblxufSAvLyBuYW1lc3BhY2UgU2NyaXB0Q29udGV4dFxuIiwiLypcbiAqIE1JVCBMaWNlbnNlXG4gKlxuICogQ29weXJpZ2h0IChjKSAyMDI1ICBZdXJpaSBZYWt1YmluICh5dXJpaS55YWt1YmluQGdtYWlsLmNvbSlcbiAqXG4gKiBQZXJtaXNzaW9uIGlzIGdyYW50ZWQgdG8gdXNlLCBjb3B5LCBtb2RpZnksIGFuZCBkaXN0cmlidXRlIHRoaXMgc29mdHdhcmVcbiAqIHVuZGVyIHRoZSBNSVQgTGljZW5zZS4gU2VlIExJQ0VOU0UgZmlsZSBmb3IgZGV0YWlscy5cbiAqL1xuXG5pbXBvcnQgeyBlbnN1cmVCb29sZWFuIH0gZnJvbSBcIkAvdXRpbHMvU3RyaWN0VHlwZVwiO1xuaW1wb3J0IHsgQWJzb2x1dGVQYXRoIH0gZnJvbSBcIkAvY29yZS9QYXRoXCI7XG5pbXBvcnQgeyBTeXN0ZW1TY29wZSB9IGZyb20gXCJAL2NvcmUvU3lzdGVtU2NvcGVcIjtcblxuY29uc3QgTkFNRSAgICAgICAgICAgICAgICA9IFN5bWJvbChcIk5BTUVcIik7XG5jb25zdCBMQU5HVUFHRSAgICAgICAgICAgID0gU3ltYm9sKFwiTEFOR1VBR0VcIik7XG5jb25zdCBIRUFERVJfRklMRV9PTkxZICAgID0gU3ltYm9sKFwiSEVBREVSX0ZJTEVfT05MWVwiKTtcbmNvbnN0IERFRklORVMgICAgICAgICAgICAgPSBTeW1ib2woXCJERUZJTkVTXCIpO1xuY29uc3QgQ09NUElMRV9GTEFHUyAgICAgICA9IFN5bWJvbChcIkNPTVBJTEVfRkxBR1NcIik7XG5jb25zdCBGSUxFICAgICAgICAgICAgICAgID0gU3ltYm9sKFwiRklMRVwiKTtcbmNvbnN0IE9CSkVDVF9GSUxFICAgICAgICAgPSBTeW1ib2woXCJPQkpFQ1RfRklMRVwiKTtcblxuY29uc3QgX2xhbmd1YWdlRXh0ZW5zaW9ucyA9IHtcbiAgQVNNOiBbIFwiLmFzbVwiLCBcIi5zXCIgXSxcbiAgQzogICBbIFwiLmNcIiBdLFxuICBDWFg6IFtcIi5jcHBcIiwgXCIuY2NcIiwgXCIuY3h4XCIgXSxcbn07XG5cbmZ1bmN0aW9uIGlzU3VwcG9ydExhbmd1YWdlKGxhbmd1YWdlOiBzdHJpbmcpIHtcbiAgcmV0dXJuIF9sYW5ndWFnZUV4dGVuc2lvbnMuaGFzT3duUHJvcGVydHkobGFuZ3VhZ2UpO1xufVxuXG5mdW5jdGlvbiBnZXRGaWxlTGFuZ3VhZ2UoZmlsZW5hbWU6IGFueSkge1xuICBjb25zdCBmaWxlbmFtZUxvd2VyQ2FzZSA9IGZpbGVuYW1lLnRvU3RyaW5nKCkudG9Mb3dlckNhc2UoKTtcbiAgZm9yIChjb25zdCBbbGFuZ3VhZ2UsIGV4dGVuc2lvbnNdIG9mIE9iamVjdC5lbnRyaWVzKF9sYW5ndWFnZUV4dGVuc2lvbnMpKSB7XG4gICAgZm9yIChjb25zdCBpdGVyIG9mIGV4dGVuc2lvbnMpIHtcbiAgICAgIGlmIChmaWxlbmFtZUxvd2VyQ2FzZS5lbmRzV2l0aChpdGVyKSlcbiAgICAgICAgcmV0dXJuIGxhbmd1YWdlO1xuICAgIH1cbiAgfVxuICByZXR1cm4gXCJcIjtcbn1cblxuZnVuY3Rpb24gbWFrZUxhbmd1YWdlKHZhbHVlOiBzdHJpbmcpIHtcbiAgaWYgKGlzU3VwcG9ydExhbmd1YWdlKHZhbHVlKSlcbiAgICByZXR1cm4gdmFsdWU7XG4gIHRocm93IG5ldyBFcnJvcihgTGFuZ3VhZ2UgXCIke3ZhbHVlfVwiIGlzIG5vdCBzdXBwb3J0ZWRgKTtcbn1cblxuZXhwb3J0IGNsYXNzIFNvdXJjZUZpbGUge1xuICBwcml2YXRlIFtOQU1FXTogc3RyaW5nO1xuICBwcml2YXRlIFtMQU5HVUFHRV06IHN0cmluZztcbiAgcHJpdmF0ZSBbSEVBREVSX0ZJTEVfT05MWV06IGJvb2xlYW47XG4gIHByaXZhdGUgW0ZJTEVdOiBBYnNvbHV0ZVBhdGg7XG4gIHByaXZhdGUgW09CSkVDVF9GSUxFXTogQWJzb2x1dGVQYXRoIHwgbnVsbDtcbiAgcHJpdmF0ZSBbREVGSU5FU106IHN0cmluZ1tdO1xuICBwcml2YXRlIFtDT01QSUxFX0ZMQUdTXTogc3RyaW5nW107XG5cbiAgcHJpdmF0ZSBjb25zdHJ1Y3RvcihzY29wZTogU3lzdGVtU2NvcGUsIGZpbGVuYW1lOiBBYnNvbHV0ZVBhdGh8c3RyaW5nKSB7XG4gICAgdGhpc1tOQU1FXSA9IGZpbGVuYW1lLnRvU3RyaW5nKCk7XG4gICAgY29uc3QgZm5hbWUgPSBzY29wZS5TT1VSQ0VfRElSLnJlc29sdmUoZmlsZW5hbWUpO1xuICBcbiAgICBjb25zdCBsYW5ndWFnZSA9IGdldEZpbGVMYW5ndWFnZShmbmFtZSk7XG4gICAgdGhpc1tMQU5HVUFHRV0gPSBsYW5ndWFnZTtcbiAgICB0aGlzW0hFQURFUl9GSUxFX09OTFldID0gIWxhbmd1YWdlO1xuICAgIHRoaXNbRklMRV0gPSBmbmFtZTtcbiAgICB0aGlzW09CSkVDVF9GSUxFXSA9IG51bGw7XG4gICAgdGhpc1tERUZJTkVTXSA9IFtdO1xuICAgIHRoaXNbQ09NUElMRV9GTEFHU10gPSAhbGFuZ3VhZ2UgPyBbXSA6IFtcbiAgICAgIC4uLihzY29wZSBhcyBhbnkpW2xhbmd1YWdlICsgXCJfRkxBR1NcIl0sXG4gICAgICAuLi4oc2NvcGUgYXMgYW55KVtsYW5ndWFnZSArIFwiX0ZMQUdTX1wiICsgc2NvcGUuQlVJTERfVFlQRS50b1VwcGVyQ2FzZSgpXSxcbiAgICBdO1xuICB9XG5cbiAgcHVibGljIHN0YXRpYyBjcmVhdGUoc2NvcGU6IGFueSwgZmlsZW5hbWU6IEFic29sdXRlUGF0aHxzdHJpbmcpIHtcbiAgICByZXR1cm4gT2JqZWN0LnNlYWwobmV3IFNvdXJjZUZpbGUoc2NvcGUsIGZpbGVuYW1lKSk7XG4gIH1cblxuICBwdWJsaWMgZ2V0IE5BTUUoKTogc3RyaW5nIHtcbiAgICByZXR1cm4gdGhpc1tOQU1FXTtcbiAgfVxuXG4gIHB1YmxpYyBnZXQgTEFOR1VBR0UoKTogc3RyaW5nIHtcbiAgICByZXR1cm4gdGhpc1tMQU5HVUFHRV07XG4gIH1cblxuICBwdWJsaWMgZ2V0IEhFQURFUl9GSUxFX09OTFkoKTogYm9vbGVhbiB7XG4gICAgcmV0dXJuIHRoaXNbSEVBREVSX0ZJTEVfT05MWV07XG4gIH1cblxuICBwdWJsaWMgc2V0IEhFQURFUl9GSUxFX09OTFkodmFsdWU6IGJvb2xlYW4pIHtcbiAgICB0aGlzW0hFQURFUl9GSUxFX09OTFldID0gZW5zdXJlQm9vbGVhbih2YWx1ZSk7XG4gIH1cblxuICBwdWJsaWMgZ2V0IERFRklORVMoKSB7XG4gICAgcmV0dXJuIHRoaXNbREVGSU5FU11cbiAgfVxuXG4gIHB1YmxpYyBnZXQgQ09NUElMRV9GTEFHUygpIHtcbiAgICByZXR1cm4gdGhpc1tDT01QSUxFX0ZMQUdTXTtcbiAgfVxuXG4gIHB1YmxpYyBnZXQgRklMRSgpOiBBYnNvbHV0ZVBhdGgge1xuICAgIHJldHVybiB0aGlzW0ZJTEVdO1xuICB9XG5cbiAgcHVibGljIGdldCBGSUxFX0RJUigpOiBBYnNvbHV0ZVBhdGgge1xuICAgIHJldHVybiB0aGlzW0ZJTEVdLmRpcm5hbWUoKTtcbiAgfVxuXG4gIHB1YmxpYyBnZXQgRklMRV9OQU1FKCk6IHN0cmluZyB7XG4gICAgcmV0dXJuIHRoaXNbRklMRV0uYmFzZW5hbWUoKTtcbiAgfVxuXG4gIHB1YmxpYyBnZXQgT0JKRUNUX0ZJTEUoKTogQWJzb2x1dGVQYXRoIHwgbnVsbCB7XG4gICAgcmV0dXJuIHRoaXNbT0JKRUNUX0ZJTEVdO1xuICB9XG5cbiAgcHVibGljIHNldCBPQkpFQ1RfRklMRSh2YWx1ZTogQWJzb2x1dGVQYXRoKSB7XG4gICAgdGhpc1tPQkpFQ1RfRklMRV0gPSB2YWx1ZTtcbiAgfVxuXG4gIHB1YmxpYyBnZXQgT0JKRUNUX0ZJTEVfRElSKCk6IEFic29sdXRlUGF0aCB8IG51bGwge1xuICAgIHJldHVybiB0aGlzW09CSkVDVF9GSUxFXSA/IHRoaXNbT0JKRUNUX0ZJTEVdLmRpcm5hbWUoKSA6IG51bGw7XG4gIH1cblxuICBwdWJsaWMgZ2V0IE9CSkVDVF9GSUxFX05BTUUoKTogc3RyaW5nIHwgbnVsbCB7XG4gICAgcmV0dXJuIHRoaXNbT0JKRUNUX0ZJTEVdID8gdGhpc1tPQkpFQ1RfRklMRV0uYmFzZW5hbWUoKSA6IG51bGw7XG4gIH1cblxuICBwdWJsaWMgdG9KU09OKCk6IG9iamVjdCB7XG4gICAgcmV0dXJuIHtcbiAgICAgIE5BTUU6IHRoaXMuTkFNRSxcbiAgICAgIExBTkdVQUdFOiB0aGlzLkxBTkdVQUdFLFxuICAgICAgSEVBREVSX0ZJTEVfT05MWTogdGhpcy5IRUFERVJfRklMRV9PTkxZLFxuICAgICAgREVGSU5FUzogdGhpcy5ERUZJTkVTLFxuICAgICAgQ09NUElMRV9GTEFHUzogdGhpcy5DT01QSUxFX0ZMQUdTLFxuICAgICAgRklMRTogdGhpcy5GSUxFLFxuICAgICAgRklMRV9ESVI6IHRoaXMuRklMRV9ESVIsXG4gICAgICBGSUxFX05BTUU6IHRoaXMuRklMRV9OQU1FLFxuICAgICAgT0JKRUNUX0ZJTEU6IHRoaXMuT0JKRUNUX0ZJTEUsXG4gICAgICBPQkpFQ1RfRklMRV9ESVI6IHRoaXMuT0JKRUNUX0ZJTEVfRElSLFxuICAgICAgT0JKRUNUX0ZJTEVfTkFNRTogdGhpcy5PQkpFQ1RfRklMRV9OQU1FLFxuICAgIH07XG4gIH1cbn1cbiIsIi8qXG4gKiBNSVQgTGljZW5zZVxuICpcbiAqIENvcHlyaWdodCAoYykgMjAyNSAgWXVyaWkgWWFrdWJpbiAoeXVyaWkueWFrdWJpbkBnbWFpbC5jb20pXG4gKlxuICogUGVybWlzc2lvbiBpcyBncmFudGVkIHRvIHVzZSwgY29weSwgbW9kaWZ5LCBhbmQgZGlzdHJpYnV0ZSB0aGlzIHNvZnR3YXJlXG4gKiB1bmRlciB0aGUgTUlUIExpY2Vuc2UuIFNlZSBMSUNFTlNFIGZpbGUgZm9yIGRldGFpbHMuXG4gKi9cblxuaW1wb3J0IHsgU291cmNlRmlsZSB9IGZyb20gXCJAL2NvcmUvU291cmNlRmlsZVwiO1xuaW1wb3J0IHsgU3lzdGVtU2NvcGUgfSBmcm9tIFwiQC9jb3JlL1N5c3RlbVNjb3BlXCI7XG5pbXBvcnQgeyBub3JtYWxpemVEZWZpbml0aW9ucyB9IGZyb20gXCJAL2NvcmUvRGVmaW5pdGlvbkhlbHBlclwiO1xuXG5jb25zdCBTT1VSQ0VTID0gU3ltYm9sKFwiU09VUkNFU1wiKTtcblxuZXhwb3J0IGNsYXNzIFNvdXJjZUZpbGVMaXN0IHtcbiAgcHJpdmF0ZSBbU09VUkNFU106IFNvdXJjZUZpbGVbXTtcblxuICBwcml2YXRlIGNvbnN0cnVjdG9yKHNjb3BlOiBTeXN0ZW1TY29wZSwgc291cmNlczogU291cmNlRmlsZVtdKSB7XG4gICAgdGhpc1tTT1VSQ0VTXSA9IFtdO1xuICAgIGZvciAoY29uc3QgaXRlciBvZiBzb3VyY2VzKSB7XG4gICAgICBpZiAoIShpdGVyIGluc3RhbmNlb2YgU291cmNlRmlsZSkpXG4gICAgICAgIHRocm93IG5ldyBFcnJvcihgSXRlbSAke2l0ZXJ9IGlzIG5vdCBTb3VyY2VGaWxlYCk7XG4gICAgICB0aGlzW1NPVVJDRVNdLnB1c2goaXRlcik7XG4gICAgfVxuICB9XG5cbiAgcHVibGljIHN0YXRpYyBjcmVhdGUoc2NvcGU6IFN5c3RlbVNjb3BlLCBzb3VyY2VzOiBTb3VyY2VGaWxlW10pIHtcbiAgICByZXR1cm4gT2JqZWN0LnNlYWwobmV3IFNvdXJjZUZpbGVMaXN0KHNjb3BlLCBzb3VyY2VzKSk7XG4gIH1cblxuICBwdWJsaWMgYWRkRGVmaW5pdGlvbnMoLi4uZGVmaW5pdGlvbnM6IHN0cmluZ1tdKSB7XG4gICAgZm9yIChjb25zdCBpdGVyIG9mIG5vcm1hbGl6ZURlZmluaXRpb25zKC4uLmRlZmluaXRpb25zKSlcbiAgICAgIHRoaXNbU09VUkNFU10uZm9yRWFjaChpID0+IGkuREVGSU5FUy5wdXNoKGl0ZXIpKTtcbiAgfVxuXG4gIHB1YmxpYyBhZGRDb21waWxlRmxhZ3MoLi4uZmxhZ3M6IHN0cmluZ1tdKSB7XG4gICAgZm9yIChjb25zdCBpdGVyIG9mIGZsYWdzLmZsYXQoKSlcbiAgICAgIHRoaXNbU09VUkNFU10uZm9yRWFjaChpID0+IGkuQ09NUElMRV9GTEFHUy5wdXNoKGl0ZXIpKTtcbiAgfVxuXG4gIHB1YmxpYyBzb3VyY2VBdChpbmRleDogbnVtYmVyKTogU291cmNlRmlsZSB7XG4gICAgcmV0dXJuIHRoaXNbU09VUkNFU11baW5kZXhdO1xuICB9XG5cbiAgcHVibGljIHNvdXJjZUNvdW50KGluZGV4OiBudW1iZXIpOiBudW1iZXIge1xuICAgIHJldHVybiB0aGlzW1NPVVJDRVNdLmxlbmd0aDtcbiAgfVxuXG4gIHB1YmxpYyB0b0pTT04oKTogb2JqZWN0IHtcbiAgICByZXR1cm4gdGhpc1tTT1VSQ0VTXTtcbiAgfVxufTtcbiIsIi8qXG4gKiBNSVQgTGljZW5zZVxuICpcbiAqIENvcHlyaWdodCAoYykgMjAyNSAgWXVyaWkgWWFrdWJpbiAoeXVyaWkueWFrdWJpbkBnbWFpbC5jb20pXG4gKlxuICogUGVybWlzc2lvbiBpcyBncmFudGVkIHRvIHVzZSwgY29weSwgbW9kaWZ5LCBhbmQgZGlzdHJpYnV0ZSB0aGlzIHNvZnR3YXJlXG4gKiB1bmRlciB0aGUgTUlUIExpY2Vuc2UuIFNlZSBMSUNFTlNFIGZpbGUgZm9yIGRldGFpbHMuXG4gKi9cblxuaW1wb3J0IG9zIGZyb20gXCJub2RlOm9zXCI7XG5pbXBvcnQgeyBERUJVR19CVUlMRF9UWVBFLCBSRUxFQVNFX0JVSUxEX1RZUEUgfSBmcm9tIFwiQC9jb3JlL1R5cGVzXCI7XG5pbXBvcnQgeyBnZXRTaXplb2ZWb2lkcCB9IGZyb20gXCJAL2NvcmUvR2V0U2l6ZW9mVm9pZHBcIjtcblxuZXhwb3J0IGRlZmF1bHQge1xuICBTWVNURU1fTkFNRToge1xuICAgIGRlc2NyaXB0aW9uOiBcIkRlZmluZXMgdGhlIHRhcmdldCBPUyBmb3IgdGhlIGJ1aWxkLCB1c2VkIGluIGNyb3NzLWNvbXBpbGF0aW9uIGFuZCBuYXRpdmUgYnVpbGRzXCIsXG4gICAgdmFsdWU6IFwiTGludXhcIixcbiAgfSxcbiAgU1lTVEVNX1BST0NFU1NPUjoge1xuICAgIGRlc2NyaXB0aW9uOiBcIkRlZmluZXMgdGhlIHRhcmdldCBDUFUgYXJjaGl0ZWN0dXJlXCIsXG4gICAgdmFsdWU6IFwid2FzbTMyXCIsXG4gIH0sXG4gIFBST0pFQ1RfTkFNRToge1xuICAgIGRlc2NyaXB0aW9uOiBcIk5hbWUgb2YgdGhlIGN1cnJlbnQgcHJvamVjdFwiLFxuICAgIHZhbHVlOiBcIlwiLFxuICB9LFxuICBQUk9KRUNUX1ZFUlNJT046IHtcbiAgICBkZXNjcmlwdGlvbjogXCJWZXJzaW9uIG9mIHRoZSBjdXJyZW50IHByb2plY3RcIixcbiAgICB2YWx1ZTogXCJcIixcbiAgfSxcbiAgUFJPSkVDVF9ERVNDUklQVElPTjoge1xuICAgIGRlc2NyaXB0aW9uOiBcIkRlc2NyaXB0aW9uIG9mIHRoZSBjdXJyZW50IHByb2plY3RcIixcbiAgICB2YWx1ZTogXCJcIixcbiAgfSxcbiAgUFJPSkVDVF9IT01FUEFHRV9VUkw6IHtcbiAgICBkZXNjcmlwdGlvbjogXCJIb21lcGFnZSBVUkwgb2YgdGhlIGN1cnJlbnQgcHJvamVjdFwiLFxuICAgIHZhbHVlOiBcIlwiLFxuICB9LFxuICBQUk9KRUNUX1NPVVJDRV9ESVI6IHtcbiAgICBkZXNjcmlwdGlvbjogXCJBYnNvbHV0ZSBwYXRoIHRvIHRoZSB0b3AtbGV2ZWwgc291cmNlIGRpcmVjdG9yeSBvZiB0aGUgcHJvamVjdFwiLFxuICAgIHR5cGU6IFwiRGlyUGF0aFwiLFxuICB9LFxuICBQUk9KRUNUX0JJTkFSWV9ESVI6IHtcbiAgICBkZXNjcmlwdGlvbjogXCJBYnNvbHV0ZSBwYXRoIHRvIHRoZSB0b3AtbGV2ZWwgYnVpbGQgKGJpbmFyeSkgZGlyZWN0b3J5IG9mIHRoZSBwcm9qZWN0XCIsXG4gICAgdHlwZTogXCJEaXJQYXRoXCIsXG4gIH0sXG4gIFNDUklQVF9GSUxFOiB7XG4gICAgZGVzY3JpcHRpb246IFwiRnVsbCBwYXRoIHRvIHRoZSBjdXJyZW50IE1ha2VTY3JpcHQgZmlsZSBiZWluZyBwcm9jZXNzZWRcIixcbiAgICB0eXBlOiBcIkZpbGVQYXRoXCIsXG4gIH0sXG4gIFNDUklQVF9ESVI6IHtcbiAgICBkZXNjcmlwdGlvbjogXCJEaXJlY3Rvcnkgb2YgdGhlIGN1cnJlbnQgTWFrZVNjcmlwdCBmaWxlIGJlaW5nIHByb2Nlc3NlZFwiLFxuICAgIHR5cGU6IFwiRGlyUGF0aFwiLFxuICB9LFxuICBQQUNLQUdFX0ZJTEU6IHtcbiAgICBkZXNjcmlwdGlvbjogXCJGaWxlbmFtZSBvZiBwcm9qZWN0IG1hbmlmZXN0IGNvbnRhaW5pbmcgbWV0YWRhdGEgYW5kIGRlcGVuZGVuY2llc1wiLFxuICAgIHR5cGU6IFwiRmlsZVBhdGhcIixcbiAgfSxcbiAgQ0FDSEVfRklMRToge1xuICAgIGRlc2NyaXB0aW9uOiBcIkRlZmF1bHQgZmlsZW5hbWUgb2YgdGhlIEJpdE1ha2UgY2FjaGUgc3RvcmluZyBzZXR0aW5nc1wiLFxuICAgIHR5cGU6IFwiRmlsZVBhdGhcIixcbiAgfSxcbiAgVE9PTENIQUlOX0ZJTEU6IHtcbiAgICBkZXNjcmlwdGlvbjogXCJTcGVjaWZpZXMgdGhlIHBhdGggdG8gYSB0b29sY2hhaW4gZmlsZSB1c2VkIGZvciBjcm9zcy1jb21waWxhdGlvblwiLFxuICAgIHR5cGU6IFwiRmlsZVBhdGhcIixcbiAgfSxcbiAgQlVJTERfVFlQRToge1xuICAgIGRlc2NyaXB0aW9uOiBcIlNwZWNpZmllcyB0aGUgYnVpbGQgY29uZmlndXJhdGlvbiBmb3IgY29udHJvbGxpbmcgb3B0aW1pemF0aW9uIGxldmVscyBhbmQgZGVidWcgaW5mb3JtYXRpb24gaW4gdGhlIGJ1aWxkIHByb2Nlc3NcIixcbiAgICB0eXBlOiBbIERFQlVHX0JVSUxEX1RZUEUsIFJFTEVBU0VfQlVJTERfVFlQRSBdLFxuICAgIHZhbHVlOiBSRUxFQVNFX0JVSUxEX1RZUEUsXG4gIH0sXG4gIElOU1RBTExfUFJFRklYOiB7XG4gICAgZGVzY3JpcHRpb246IFwiVGhlIHJvb3QgZGlyZWN0b3J5IHdoZXJlIGZpbGVzIHdpbGwgYmUgaW5zdGFsbGVkIGJ5IGRlZmF1bHRcIixcbiAgICB0eXBlOiBcIkRpclBhdGhcIixcbiAgICB2YWx1ZTogXCIvdXNyXCIsXG4gIH0sXG4gIERFU1RESVI6IHtcbiAgICBkZXNjcmlwdGlvbjogXCJUZW1wb3JhcnkgaW5zdGFsbGF0aW9uIHJvb3RcIixcbiAgICB0eXBlOiBcIkRpclBhdGhcIixcbiAgfSxcbiAgU09VUkNFX0RJUjoge1xuICAgIGRlc2NyaXB0aW9uOiBcIlBhdGggdG8gdGhlIHNvdXJjZSBkaXJlY3RvcnkgY3VycmVudGx5IGJlaW5nIHByb2Nlc3NlZFwiLFxuICAgIHR5cGU6IFwiRGlyUGF0aFwiLFxuICB9LFxuICBCSU5BUllfRElSOiB7XG4gICAgZGVzY3JpcHRpb246IFwiUGF0aCB0byB0aGUgYmluYXJ5IGRpcmVjdG9yeSBjdXJyZW50bHkgYmVpbmcgcHJvY2Vzc2VkXCIsXG4gICAgdHlwZTogXCJEaXJQYXRoXCIsXG4gIH0sXG4gIFBPU0lUSU9OX0lOREVQRU5ERU5UX0NPREU6IHtcbiAgICBkZXNjcmlwdGlvbjogXCJFbmFibGVzIFBvc2l0aW9uLUluZGVwZW5kZW50IENvZGUgKFBJQykgZm9yIGJ1aWxkaW5nIHNoYXJlZCBsaWJyYXJpZXNcIixcbiAgICB2YWx1ZTogZmFsc2UsXG4gIH0sXG4gIFBSRVZFTlRfSU5TVEFMTF9GSUxFUzoge1xuICAgIGRlc2NyaXB0aW9uOiBcIlByZXZlbnQgaW5zdGFsbGF0aW9uIG9mIGZpbGVzXCIsXG4gICAgdmFsdWU6IGZhbHNlLFxuICB9LFxuICBIT1NUX1NZU1RFTV9OQU1FOiB7XG4gICAgZGVzY3JpcHRpb246IFwiU3BlY2lmaWVzIHRoZSBPUyBvZiB0aGUgbWFjaGluZSBydW5uaW5nXCIsXG4gICAgdmFsdWU6IG9zLnR5cGUoKSxcbiAgfSxcbiAgSU5DTFVERVM6IHtcbiAgICBkZXNjcmlwdGlvbjogXCJQYXRocyBzZWFyY2hlZCBmb3IgaGVhZGVyIGZpbGVzXCIsXG4gICAgdmFsdWU6IFtdLFxuICB9LFxuICBBU01fQ09NUElMRVI6IHtcbiAgICBkZXNjcmlwdGlvbjogXCJQYXRoIHRvIHRoZSBhc3NlbWJsZXIgY29tcGlsZXIgZGV0ZWN0ZWRcIixcbiAgICB2YWx1ZTogXCJcIixcbiAgfSxcbiAgQVNNX0ZMQUdTOiB7XG4gICAgZGVzY3JpcHRpb246IFwiRmxhZ3MgcGFzc2VkIHRvIHRoZSBhc3NlbWJsZXIgY29tcGlsZXJcIixcbiAgICB2YWx1ZTogW10sXG4gIH0sXG4gIEFTTV9GTEFHU19ERUJVRzoge1xuICAgIGRlc2NyaXB0aW9uOiBcIkFkZGl0aW9uYWwgYXNzZW1ibGVyIGZsYWdzIHVzZWQgd2hlbiBidWlsZGluZyBpbiBEZWJ1ZyBtb2RlXCIsXG4gICAgdmFsdWU6IFsgXCItZ1wiIF0sXG4gIH0sXG4gIEFTTV9GTEFHU19SRUxFQVNFOiB7XG4gICAgZGVzY3JpcHRpb246IFwiQWRkaXRpb25hbCBhc3NlbWJsZXIgZmxhZ3MgdXNlZCB3aGVuIGJ1aWxkaW5nIGluIFJlbGVhc2UgbW9kZVwiLFxuICAgIHZhbHVlOiBbIFwiLU8zXCIsIFwiLUROREVCVUdcIiBdLFxuICB9LFxuICBDX0NPTVBJTEVSOiB7XG4gICAgZGVzY3JpcHRpb246IFwiUGF0aCB0byB0aGUgQyBjb21waWxlciBkZXRlY3RlZFwiLFxuICAgIHZhbHVlOiBcIlwiLFxuICB9LFxuICBDX0ZMQUdTOiB7XG4gICAgZGVzY3JpcHRpb246IFwiRmxhZ3MgcGFzc2VkIHRvIHRoZSBDIGNvbXBpbGVyXCIsXG4gICAgdmFsdWU6IFtdLFxuICB9LFxuICBDX0ZMQUdTX0RFQlVHOiB7XG4gICAgZGVzY3JpcHRpb246IFwiQWRkaXRpb25hbCBDIGNvbXBpbGVyIGZsYWdzIHVzZWQgd2hlbiBidWlsZGluZyBpbiBEZWJ1ZyBtb2RlXCIsXG4gICAgdmFsdWU6IFsgXCItZ1wiIF0sXG4gIH0sXG4gIENfRkxBR1NfUkVMRUFTRToge1xuICAgIGRlc2NyaXB0aW9uOiBcIkFkZGl0aW9uYWwgQyBjb21waWxlciBmbGFncyB1c2VkIHdoZW4gYnVpbGRpbmcgaW4gUmVsZWFzZSBtb2RlXCIsXG4gICAgdmFsdWU6IFsgXCItTzNcIiwgXCItRE5ERUJVR1wiIF0sXG4gIH0sXG4gIENYWF9DT01QSUxFUjoge1xuICAgIGRlc2NyaXB0aW9uOiBcIlBhdGggdG8gdGhlIEMrKyBjb21waWxlciBkZXRlY3RlZFwiLFxuICAgIHZhbHVlOiBcIlwiLFxuICB9LFxuICBDWFhfRkxBR1M6IHtcbiAgICBkZXNjcmlwdGlvbjogXCJGbGFncyBwYXNzZWQgdG8gdGhlIEMgY29tcGlsZXJcIixcbiAgICB2YWx1ZTogW10sXG4gIH0sXG4gIENYWF9GTEFHU19ERUJVRzoge1xuICAgIGRlc2NyaXB0aW9uOiBcIkFkZGl0aW9uYWwgQysrIGNvbXBpbGVyIGZsYWdzIHVzZWQgd2hlbiBidWlsZGluZyBpbiBEZWJ1ZyBtb2RlXCIsXG4gICAgdmFsdWU6IFsgXCItZ1wiIF0sXG4gIH0sXG4gIENYWF9GTEFHU19SRUxFQVNFOiB7XG4gICAgZGVzY3JpcHRpb246IFwiQWRkaXRpb25hbCBDKysgY29tcGlsZXIgZmxhZ3MgdXNlZCB3aGVuIGJ1aWxkaW5nIGluIFJlbGVhc2UgbW9kZVwiLFxuICAgIHZhbHVlOiBbIFwiLU8zXCIsIFwiLUROREVCVUdcIiBdLFxuICB9LFxuICBBUjoge1xuICAgIGRlc2NyaXB0aW9uOiBcIlBhdGggdG8gdGhlIGFyY2hpdmVyIHRvb2wgdXNlZCB0byBjcmVhdGUgc3RhdGljIGxpYnJhcmllc1wiLFxuICAgIHZhbHVlOiBcIlwiLFxuICB9LFxuICBSQU5MSUI6IHtcbiAgICBkZXNjcmlwdGlvbjogXCJUb29sIHVzZWQgdG8gZ2VuZXJhdGUgYW4gaW5kZXggdG8gdGhlIGNvbnRlbnRzIG9mIGFuIGFyY2hpdmUgKHN0YXRpYyBsaWJyYXJ5KVwiLFxuICAgIHZhbHVlOiBcIlwiLFxuICB9LFxuICBMSU5LRVI6IHtcbiAgICBkZXNjcmlwdGlvbjogXCJQYXRoIHRvIHRoZSBsaW5rZXIgdXNlZCB0byBsaW5rIG9iamVjdCBmaWxlcyBhbmQgbGlicmFyaWVzIGludG8gZXhlY3V0YWJsZXNcIixcbiAgICB2YWx1ZTogXCJcIixcbiAgfSxcbiAgTk06IHtcbiAgICBkZXNjcmlwdGlvbjogXCJQYXRoIHRvIHRoZSB0b29sIHVzZWQgdG8gbGlzdCBzeW1ib2xzIGZyb20gb2JqZWN0IGZpbGVzIG9yIGFyY2hpdmVzXCIsXG4gICAgdmFsdWU6IFwiXCIsXG4gIH0sXG4gIE9CSkNPUFk6IHtcbiAgICBkZXNjcmlwdGlvbjogXCJQYXRoIHRvIHRoZSB0b29sIHVzZWQgdG8gY29weSBhbmQgdHJhbnNsYXRlIG9iamVjdCBmaWxlc1wiLFxuICAgIHZhbHVlOiBcIlwiLFxuICB9LFxuICBPQkpEVU1QOiB7XG4gICAgZGVzY3JpcHRpb246IFwiUGF0aCB0byB0aGUgdG9vbCB1c2VkIHRvIGRpc3BsYXkgaW5mb3JtYXRpb24gYWJvdXQgb2JqZWN0IGZpbGVzLCBzdWNoIGFzIGRpc2Fzc2VtYmx5XCIsXG4gICAgdmFsdWU6IFwiXCIsXG4gIH0sXG4gIFNUUklQOiB7XG4gICAgZGVzY3JpcHRpb246IFwiUGF0aCB0byB0aGUgdG9vbCB1c2VkIHRvIHJlbW92ZSBzeW1ib2xzIGZyb20gb2JqZWN0IGZpbGVzIG9yIGV4ZWN1dGFibGVzIHRvIHJlZHVjZSBzaXplXCIsXG4gICAgdmFsdWU6IFwiXCIsXG4gIH0sXG4gIE9CSkVDVF9MSUJSQVJZX1BSRUZJWDoge1xuICAgIGRlc2NyaXB0aW9uOiBcIlByZWZpeCB1c2VkIGZvciBvYmplY3QgbGlicmFyaWVzXCIsXG4gICAgdmFsdWU6IFwiXCIsXG4gIH0sXG4gIE9CSkVDVF9MSUJSQVJZX1NVRkZJWDoge1xuICAgIGRlc2NyaXB0aW9uOiBcIlN1ZmZpeCB1c2VkIGZvciBvYmplY3QgbGlicmFyeSBmaWxlc1wiLFxuICAgIHZhbHVlOiBcIi5vXCIsXG4gIH0sXG4gIE9CSkVDVF9MSU5LRVJfRkxBR1M6IHtcbiAgICBkZXNjcmlwdGlvbjogXCJGbGFncyBwYXNzZWQgdG8gdGhlIGxpbmtlciB3aGVuIGNyZWF0aW5nIG9iamVjdCBsaWJyYXJpZXNcIixcbiAgICB2YWx1ZTogW10sXG4gIH0sXG4gIFNUQVRJQ19MSUJSQVJZX1BSRUZJWDoge1xuICAgIGRlc2NyaXB0aW9uOiBcIlByZWZpeCB1c2VkIGZvciBzdGF0aWMgbGlicmFyeSBmaWxlc1wiLFxuICAgIHZhbHVlOiBcImxpYlwiLFxuICB9LFxuICBTVEFUSUNfTElCUkFSWV9TVUZGSVg6IHtcbiAgICBkZXNjcmlwdGlvbjogXCJTdWZmaXggdXNlZCBmb3Igc3RhdGljIGxpYnJhcnkgZmlsZXNcIixcbiAgICB2YWx1ZTogXCIuYVwiLFxuICB9LFxuICBTVEFUSUNfTElOS0VSX0ZMQUdTOiB7XG4gICAgZGVzY3JpcHRpb246IFwiRmxhZ3MgcGFzc2VkIHRvIHRoZSBsaW5rZXIgd2hlbiBjcmVhdGluZyBzdGF0aWMgbGlicmFyaWVzXCIsXG4gICAgdmFsdWU6IFtdLFxuICB9LFxuICBTSEFSRURfTElCUkFSWV9QUkVGSVg6IHtcbiAgICBkZXNjcmlwdGlvbjogXCJQcmVmaXggdXNlZCBmb3Igc2hhcmVkIGxpYnJhcnkgZmlsZXNcIixcbiAgICB2YWx1ZTogXCJsaWJcIixcbiAgfSxcbiAgU0hBUkVEX0xJQlJBUllfU1VGRklYOiB7XG4gICAgZGVzY3JpcHRpb246IFwiU3VmZml4IHVzZWQgZm9yIHNoYXJlZCBsaWJyYXJ5IGZpbGVzXCIsXG4gICAgdmFsdWU6IFwiLnNvXCIsXG4gIH0sXG4gIFNIQVJFRF9MSU5LRVJfRkxBR1M6IHtcbiAgICBkZXNjcmlwdGlvbjogXCJGbGFncyBwYXNzZWQgdG8gdGhlIGxpbmtlciB3aGVuIGNyZWF0aW5nIHNoYXJlZCBsaWJyYXJpZXNcIixcbiAgICB2YWx1ZTogW10sXG4gIH0sXG4gIEVYRUNVVEFCTEVfU1VGRklYOiB7XG4gICAgZGVzY3JpcHRpb246IFwiU3VmZml4IHVzZWQgZm9yIGV4ZWN1dGFibGUgZmlsZXNcIixcbiAgICB2YWx1ZTogXCJcIixcbiAgfSxcbiAgRVhFX0xJTktFUl9GTEFHUzoge1xuICAgIGRlc2NyaXB0aW9uOiBcIkZsYWdzIHBhc3NlZCB0byB0aGUgbGlua2VyIHdoZW4gY3JlYXRpbmcgZXhlY3V0YWJsZXNcIixcbiAgICB2YWx1ZTogW10sXG4gIH0sXG4gIEdMT0JBTF9DT05URVhUX0pTT046IHtcbiAgICBkZXNjcmlwdGlvbjogXCJGaWxlbmFtZSBmb3IgSlNPTiBvZiB0aGUgR2xvYmFsIGNvbnRleHRcIixcbiAgICB0eXBlOiBcIkZpbGVQYXRoXCIsXG4gIH0sXG4gIFRBUkdFVF9HT0FMU19KU09OOiB7XG4gICAgZGVzY3JpcHRpb246IFwiRmlsZW5hbWUgZm9yIEpTT04gb2YgdGhlIFRhcmdldCBHb2Fsc1wiLFxuICAgIHR5cGU6IFwiRmlsZVBhdGhcIixcbiAgfSxcbiAgU0laRU9GX1ZPSURfUDoge1xuICAgIGRlc2NyaXB0aW9uOiBcIkRlZmluZXMgdGhlIHNpemUgKGluIGJ5dGVzKSBvZiBhIHZvaWQgcG9pbnRlciBvbiB0aGUgdGFyZ2V0IGFyY2hpdGVjdHVyZVwiLFxuICAgIHR5cGU6IFsgNCwgOCBdLFxuICAgIHZhbHVlOiBnZXRTaXplb2ZWb2lkcCgpLFxuICB9LFxuICBNQUtFX1BMVUdJTl9MSVNUOiB7XG4gICAgZGVzY3JpcHRpb246IFwiTGlzdCBvZiBwYXRocyB0byBwbHVnaW5zXCIsXG4gICAgdmFsdWU6IFtdLFxuICB9LFxufTtcbiIsIi8qXG4gKiBNSVQgTGljZW5zZVxuICpcbiAqIENvcHlyaWdodCAoYykgMjAyNSAgWXVyaWkgWWFrdWJpbiAoeXVyaWkueWFrdWJpbkBnbWFpbC5jb20pXG4gKlxuICogUGVybWlzc2lvbiBpcyBncmFudGVkIHRvIHVzZSwgY29weSwgbW9kaWZ5LCBhbmQgZGlzdHJpYnV0ZSB0aGlzIHNvZnR3YXJlXG4gKiB1bmRlciB0aGUgTUlUIExpY2Vuc2UuIFNlZSBMSUNFTlNFIGZpbGUgZm9yIGRldGFpbHMuXG4gKi9cblxuaW1wb3J0IHsgZW5zdXJlU3RyaW5nIH0gZnJvbSBcIkAvdXRpbHMvU3RyaWN0VHlwZVwiO1xuaW1wb3J0IHsgU291cmNlRmlsZSB9IGZyb20gXCJAL2NvcmUvU291cmNlRmlsZVwiO1xuaW1wb3J0IHsgU291cmNlRmlsZUxpc3QgfSBmcm9tIFwiQC9jb3JlL1NvdXJjZUZpbGVMaXN0XCI7XG5pbXBvcnQgeyBJbmNsdWRlRGlyZWN0b3J5IH0gZnJvbSBcIkAvY29yZS9JbmNsdWRlRGlyZWN0b3J5XCI7XG5pbXBvcnQgeyBJbnRlcmZhY2VUYXJnZXQgfSBmcm9tIFwiQC9jb3JlL0ludGVyZmFjZVRhcmdldFwiO1xuaW1wb3J0IHsgSW50ZXJmYWNlSW5jbHVkZXMgfSBmcm9tIFwiQC9jb3JlL0ludGVyZmFjZUluY2x1ZGVzXCI7XG5pbXBvcnQgeyBJbnRlcmZhY2VPYmplY3RzIH0gZnJvbSBcIkAvY29yZS9JbnRlcmZhY2VPYmplY3RzXCI7XG5pbXBvcnQgeyBBYnNvbHV0ZVBhdGgsIERpclBhdGgsIEZpbGVQYXRoIH0gZnJvbSBcIkAvY29yZS9QYXRoXCI7XG5pbXBvcnQgeyBTY29wZUhlbHBlciB9IGZyb20gXCJAL2NvcmUvU2NvcGVcIjtcbmltcG9ydCB7IFN5c3RlbVNjb3BlIH0gZnJvbSBcIkAvY29yZS9TeXN0ZW1TY29wZVwiO1xuaW1wb3J0IHsgbm9ybWFsaXplRGVmaW5pdGlvbnMgfSBmcm9tIFwiQC9jb3JlL0RlZmluaXRpb25IZWxwZXJcIjtcbmltcG9ydCB7IFRhcmdldFN0cnVjdCwgVGFyZ2V0VHlwZSwgTGl2ZVN0cmluZyB9IGZyb20gXCJAL2NvcmUvVGFyZ2V0U3RydWN0XCI7XG5cbmNvbnN0IElNUEwgICAgICAgICAgICAgICAgPSBTeW1ib2woXCJJTVBMXCIpO1xuY29uc3QgVEFSR0VUX1NDT1BFICAgICAgICA9IFN5bWJvbChcIlRBUkdFVF9TQ09QRVwiKTtcbmNvbnN0IENPTVBJTEVfT1BUSU9OUyAgICAgPSBTeW1ib2woXCJDT01QSUxFX09QVElPTlNcIik7XG5jb25zdCBMSU5LX09QVElPTlMgICAgICAgID0gU3ltYm9sKFwiTElOS19PUFRJT05TXCIpO1xuY29uc3QgSU5DTFVERVMgICAgICAgICAgICA9IFN5bWJvbChcIklOQ0xVREVTXCIpO1xuY29uc3QgREVGSU5FUyAgICAgICAgICAgICA9IFN5bWJvbChcIkRFRklORVNcIik7XG5jb25zdCBTT1VSQ0VTICAgICAgICAgICAgID0gU3ltYm9sKFwiU09VUkNFU1wiKTtcbmNvbnN0IExJQlJBUklFUyAgICAgICAgICAgPSBTeW1ib2woXCJMSUJSQVJJRVNcIik7XG5jb25zdCBQT1NJVElPTl9JTkRFUEVOREVOVF9DT0RFID0gU3ltYm9sKFwiUE9TSVRJT05fSU5ERVBFTkRFTlRfQ09ERVwiKTtcblxuaW50ZXJmYWNlIEluY2x1ZGVFbnRyeSB7XG4gIFZBTFVFOiBJbnRlcmZhY2VJbmNsdWRlcyB8IEluY2x1ZGVEaXJlY3RvcnkgfCBzdHJpbmc7XG4gIFBVQkxJQ19PTkxZPzogYm9vbGVhbjtcbn07XG5cbmV4cG9ydCBjbGFzcyBCYXNlVGFyZ2V0IHtcbiAgcHJpdmF0ZSBbSU1QTF06IFRhcmdldFN0cnVjdDtcbiAgcHJpdmF0ZSBbVEFSR0VUX1NDT1BFXTogU3lzdGVtU2NvcGU7XG4gIHByaXZhdGUgW0NPTVBJTEVfT1BUSU9OU106IGFueVtdO1xuICBwcml2YXRlIFtMSU5LX09QVElPTlNdOiBhbnlbXTtcbiAgcHJpdmF0ZSBbU09VUkNFU106IGFueVtdO1xuICBwcml2YXRlIFtMSUJSQVJJRVNdOiBhbnlbXTtcbiAgcHJpdmF0ZSBbSU5DTFVERVNdOiBJbmNsdWRlRW50cnlbXTtcbiAgcHJpdmF0ZSBbREVGSU5FU106IGFueVtdO1xuICBwcml2YXRlIFtQT1NJVElPTl9JTkRFUEVOREVOVF9DT0RFXTogYm9vbGVhbjtcblxuICBwcm90ZWN0ZWQgY29uc3RydWN0b3IoaW1wbDogVGFyZ2V0U3RydWN0LCBzY29wZTogU3lzdGVtU2NvcGUsIHByZWZpeDogc3RyaW5nLCBzdWZmaXg6IHN0cmluZykge1xuICAgIHRoaXNbSU1QTF0gPSBpbXBsO1xuXG4gICAgY29uc3QgdGFyZ2V0RmlsZSA9IGltcGwudGFyZ2V0RmlsZTtcbiAgICB0YXJnZXRGaWxlLmZpbGVEaXIgPSBzY29wZS5CSU5BUllfRElSO1xuICAgIGlmICh0YXJnZXRGaWxlLnByZWZpeCA9PT0gdW5kZWZpbmVkKVxuICAgICAgdGFyZ2V0RmlsZS5wcmVmaXggPSBwcmVmaXg7XG4gICAgaWYgKHRhcmdldEZpbGUub3V0cHV0TmFtZSA9PT0gdW5kZWZpbmVkKVxuICAgICAgdGFyZ2V0RmlsZS5vdXRwdXROYW1lID0gaW1wbC5uYW1lO1xuICAgIGlmICh0YXJnZXRGaWxlLnN1ZmZpeCA9PT0gdW5kZWZpbmVkKVxuICAgICAgdGFyZ2V0RmlsZS5zdWZmaXggPSBzdWZmaXg7XG5cbiAgICB0aGlzW1RBUkdFVF9TQ09QRV0gPSBTY29wZUhlbHBlci5jbG9uZSh7fSwgc2NvcGUpO1xuICAgIHRoaXNbQ09NUElMRV9PUFRJT05TXSA9IFtdO1xuICAgIHRoaXNbTElOS19PUFRJT05TXSA9IFtdO1xuICAgIHRoaXNbU09VUkNFU10gPSBbXTtcbiAgICB0aGlzW0xJQlJBUklFU10gPSBbXTtcbiAgICB0aGlzW0lOQ0xVREVTXSA9IHNjb3BlLklOQ0xVREVTLm1hcCgoVkFMVUU6IGFueSkgPT4gKHsgVkFMVUUgfSkpO1xuICAgIHRoaXNbREVGSU5FU10gPSBbXTtcbiAgICB0aGlzW1BPU0lUSU9OX0lOREVQRU5ERU5UX0NPREVdID0gc2NvcGUuUE9TSVRJT05fSU5ERVBFTkRFTlRfQ09ERTtcbiAgfVxuXG4gIHB1YmxpYyBnZXQgTkFNRSgpIHtcbiAgICByZXR1cm4gdGhpc1tJTVBMXS5uYW1lO1xuICB9XG5cbiAgcHVibGljIGdldCBUQVJHRVRfU0NPUEUoKSB7XG4gICAgcmV0dXJuIHRoaXNbVEFSR0VUX1NDT1BFXTtcbiAgfVxuXG4gIHB1YmxpYyBnZXQgQ09NUElMRV9PUFRJT05TKCk6IHN0cmluZ1tdIHtcbiAgICByZXR1cm4gdGhpc1tDT01QSUxFX09QVElPTlNdO1xuICB9XG5cbiAgcHVibGljIGdldCBMSU5LX09QVElPTlMoKTogc3RyaW5nW10ge1xuICAgIHJldHVybiB0aGlzW0xJTktfT1BUSU9OU107XG4gIH1cblxuICBwdWJsaWMgZ2V0IElOQ0xVREVTKCkge1xuICAgIHJldHVybiB0aGlzW0lOQ0xVREVTXTtcbiAgfVxuXG4gIHB1YmxpYyBnZXQgREVGSU5FUygpOiBzdHJpbmdbXSB7XG4gICAgcmV0dXJuIHRoaXNbREVGSU5FU107XG4gIH1cblxuICBwdWJsaWMgZ2V0IFNPVVJDRVMoKTogc3RyaW5nW10ge1xuICAgIHJldHVybiB0aGlzW1NPVVJDRVNdO1xuICB9XG5cbiAgcHVibGljIGdldCBMSUJSQVJJRVMoKTogc3RyaW5nW10ge1xuICAgIHJldHVybiB0aGlzW0xJQlJBUklFU107XG4gIH1cblxuICBwdWJsaWMgZ2V0IEZJTEVfRElSKCk6IEFic29sdXRlUGF0aCB7XG4gICAgaWYgKCF0aGlzW0lNUExdLnRhcmdldEZpbGUuZmlsZURpcilcbiAgICAgIHRocm93IG5ldyBFcnJvcihgVGFyZ2V0IFwiJHt0aGlzLk5BTUV9XCIgaXMgbm90IGRlZmluZWRgKTtcbiAgICByZXR1cm4gdGhpc1tJTVBMXS50YXJnZXRGaWxlLmZpbGVEaXI7XG4gIH1cblxuICBwdWJsaWMgZ2V0IEZJTEVfTkFNRSgpOiBzdHJpbmcge1xuICAgIGlmICghdGhpc1tJTVBMXS50YXJnZXRGaWxlLmZpbGVOYW1lKVxuICAgICAgdGhyb3cgbmV3IEVycm9yKGBUYXJnZXQgXCIke3RoaXMuTkFNRX1cIiBpcyBub3QgZGVmaW5lZGApO1xuICAgIHJldHVybiB0aGlzW0lNUExdLnRhcmdldEZpbGUuZmlsZU5hbWU7XG4gIH1cblxuICBwdWJsaWMgZ2V0IEZJTEUoKTogQWJzb2x1dGVQYXRoIHtcbiAgICBpZiAoIXRoaXNbSU1QTF0udGFyZ2V0RmlsZS5maWxlKVxuICAgICAgdGhyb3cgbmV3IEVycm9yKGBUYXJnZXQgXCIke3RoaXMuTkFNRX1cIiBpcyBub3QgZGVmaW5lZGApO1xuICAgIHJldHVybiB0aGlzW0lNUExdLnRhcmdldEZpbGUuZmlsZTtcbiAgfVxuXG4gIHB1YmxpYyBnZXQgUE9TSVRJT05fSU5ERVBFTkRFTlRfQ09ERSgpOiBib29sZWFuIHtcbiAgICByZXR1cm4gdGhpc1tQT1NJVElPTl9JTkRFUEVOREVOVF9DT0RFXTtcbiAgfVxuXG4gIHB1YmxpYyBnZXQgSU1QTCgpOiBUYXJnZXRTdHJ1Y3Qge1xuICAgIHJldHVybiB0aGlzW0lNUExdO1xuICB9XG5cbiAgcHVibGljIGFkZFNvdXJjZXMoLi4uc291cmNlczogQXJyYXk8SW50ZXJmYWNlT2JqZWN0cyB8IFNvdXJjZUZpbGUgfCBBYnNvbHV0ZVBhdGggfCBzdHJpbmc+KSB7XG4gICAgZm9yIChsZXQgaXQgb2Ygc291cmNlcy5mbGF0KDEpKSB7XG4gICAgICBpZiAoaXQgaW5zdGFuY2VvZiBJbnRlcmZhY2VPYmplY3RzIHx8IGl0IGluc3RhbmNlb2YgU291cmNlRmlsZSlcbiAgICAgICAge31cbiAgICAgIGVsc2UgaWYgKHR5cGVvZiBpdCA9PT0gXCJzdHJpbmdcIiB8fCBBYnNvbHV0ZVBhdGguaXNBYnNvbHV0ZShpdCkpXG4gICAgICAgIGl0ID0gU291cmNlRmlsZS5jcmVhdGUodGhpc1tUQVJHRVRfU0NPUEVdLCBpdCk7XG4gICAgICBlbHNlXG4gICAgICAgIHRocm93IG5ldyBFcnJvcihgTm90IHN1cHBvcnQgaW5zdGFuY2UgJHtpdH1gKTtcbiAgXG4gICAgICBpZiAoaXQgaW5zdGFuY2VvZiBTb3VyY2VGaWxlICYmIGl0LkxBTkdVQUdFKSB7XG4gICAgICAgIGNvbnN0IHJmaWxlMSA9IHRoaXNbVEFSR0VUX1NDT1BFXS5CSU5BUllfRElSLnJlbGF0aXZlKGl0LkZJTEUpO1xuICAgICAgICBjb25zdCByZmlsZTIgPSB0aGlzW1RBUkdFVF9TQ09QRV0uU09VUkNFX0RJUi5yZWxhdGl2ZShpdC5GSUxFKTtcbiAgICAgICAgY29uc3QgcmZpbGUgPSAocmZpbGUyLmxlbmd0aCA8IHJmaWxlMS5sZW5ndGggPyByZmlsZTIgOiByZmlsZTEpLnJlcGxhY2UoXCIuLi9cIiwgXCJfXy9cIik7XG4gICAgICAgIGl0Lk9CSkVDVF9GSUxFID0gdGhpc1tUQVJHRVRfU0NPUEVdLkJJTkFSWV9ESVIuam9pbihcIk1ha2VGaWxlc1wiLCB0aGlzW0lNUExdLm5hbWUgKyBcIi5kaXJcIiwgIHJmaWxlICsgXCIub2JqXCIpO1xuICAgICAgfVxuICBcbiAgICAgIHRoaXNbU09VUkNFU10ucHVzaChpdCk7XG4gICAgfVxuICB9XG5cbiAgcHVibGljIGFkZEluY2x1ZGVzKC4uLmluY2x1ZGVzOiBBcnJheTxJbnRlcmZhY2VJbmNsdWRlcyB8IEFic29sdXRlUGF0aCB8IHN0cmluZz4pIHtcbiAgICBmb3IgKGNvbnN0IGl0IG9mIGluY2x1ZGVzLmZsYXQoMSkpIHtcbiAgICAgIGxldCBWQUxVRTtcbiAgICAgIGlmIChpdCBpbnN0YW5jZW9mIEludGVyZmFjZUluY2x1ZGVzKVxuICAgICAgICBWQUxVRSA9IGl0O1xuICAgICAgZWxzZSBpZiAodHlwZW9mIGl0ID09PSBcInN0cmluZ1wiIHx8IEFic29sdXRlUGF0aC5pc0Fic29sdXRlKGl0KSlcbiAgICAgICAgVkFMVUUgPSBJbmNsdWRlRGlyZWN0b3J5LmNyZWF0ZShpdCwgdGhpc1tUQVJHRVRfU0NPUEVdLlNPVVJDRV9ESVIpO1xuICAgICAgZWxzZVxuICAgICAgICB0aHJvdyBuZXcgRXJyb3IoYE5vdCBzdXBwb3J0IGluc3RhbmNlICR7aXR9YCk7XG4gICAgICB0aGlzW0lOQ0xVREVTXS5wdXNoKHtWQUxVRX0pOyAvLyBJbmNsdWRlRGlyZWN0b3J5W11cbiAgICB9XG4gIH1cblxuICBwdWJsaWMgYWRkTGlicmFyaWVzKC4uLmxpYnJhcmllczogYW55KSB7XG4gICAgZm9yIChjb25zdCBpdCBvZiBsaWJyYXJpZXMuZmxhdCgxKSkge1xuICAgICAgdGhpc1tMSUJSQVJJRVNdLnB1c2goeyBWQUxVRTogSW50ZXJmYWNlVGFyZ2V0LmVuc3VyZUluc3RhbmNlKGl0KSB9KTtcbiAgICB9XG4gIH1cblxuICBwdWJsaWMgYWRkQ29tcGlsZU9wdGlvbnMoLi4ub3B0aW9uczogc3RyaW5nW10pIHtcbiAgICBmb3IgKGNvbnN0IGl0IG9mIG9wdGlvbnMuZmxhdCgxKSkge1xuICAgICAgdGhpc1tDT01QSUxFX09QVElPTlNdLnB1c2goeyBWQUxVRTogaXQgfSk7XG4gICAgfVxuICB9XG5cbiAgcHVibGljIGFkZExpbmtPcHRpb25zKC4uLm9wdGlvbnM6IHN0cmluZ1tdKSB7XG4gICAgZm9yIChjb25zdCBpdCBvZiBvcHRpb25zLmZsYXQoMSkpIHtcbiAgICAgIHRoaXNbTElOS19PUFRJT05TXS5wdXNoKHsgVkFMVUU6IGl0IH0pO1xuICAgIH1cbiAgfVxuXG4gIHB1YmxpYyBnZXRTb3VyY2VGaWxlcyguLi5zb3VyY2VzOiBhbnlbXSk6IFNvdXJjZUZpbGVMaXN0IHtcbiAgICBjb25zdCByZXN1bHQgPSBbXTtcbiAgICBmb3IgKGNvbnN0IGl0IG9mIHNvdXJjZXMuZmxhdCgxKSkge1xuICAgICAgY29uc3QgZmlsZW5hbWUgPSB0aGlzW1RBUkdFVF9TQ09QRV0uU09VUkNFX0RJUi5yZXNvbHZlKGl0KS50b1N0cmluZygpO1xuICAgICAgY29uc3Qgc3JjID0gdGhpc1tTT1VSQ0VTXS5maW5kKGkgPT4gaSBpbnN0YW5jZW9mIFNvdXJjZUZpbGUgJiYgaS5GSUxFLnRvU3RyaW5nKCkgPT09IGZpbGVuYW1lKTtcbiAgICAgIGlmICghc3JjKVxuICAgICAgICB0aHJvdyBuZXcgRXJyb3IoYENhbm5vdCBmaW5kIFwiJHtpdH1cImApO1xuICAgICAgcmVzdWx0LnB1c2goc3JjKTtcbiAgICB9XG4gIFxuICAgIGlmIChyZXN1bHQubGVuZ3RoKVxuICAgICAgcmV0dXJuIFNvdXJjZUZpbGVMaXN0LmNyZWF0ZSh0aGlzW1RBUkdFVF9TQ09QRV0sIHJlc3VsdCk7XG4gIFxuICAgIHJldHVybiBTb3VyY2VGaWxlTGlzdC5jcmVhdGUodGhpc1tUQVJHRVRfU0NPUEVdLCB0aGlzW1NPVVJDRVNdLmZpbHRlcihpID0+IGkgaW5zdGFuY2VvZiBTb3VyY2VGaWxlKSk7XG4gIH1cblxuICBwdWJsaWMgc2V0UHJlZml4KHByZWZpeDogYW55KSB7XG4gICAgdGhpc1tJTVBMXS50YXJnZXRGaWxlLnByZWZpeCA9IGVuc3VyZVN0cmluZyhwcmVmaXgpO1xuICB9XG5cbiAgcHVibGljIHNldFN1ZmZpeChzdWZmaXg6IGFueSkge1xuICAgIHRoaXNbSU1QTF0udGFyZ2V0RmlsZS5zdWZmaXggPSBlbnN1cmVTdHJpbmcoc3VmZml4KTtcbiAgfVxuXG4gIHB1YmxpYyBzZXRPdXRwdXROYW1lKG91dHB1dE5hbWU6IGFueSkge1xuICAgIHRoaXNbSU1QTF0udGFyZ2V0RmlsZS5vdXRwdXROYW1lID0gZW5zdXJlU3RyaW5nKG91dHB1dE5hbWUpO1xuICB9XG5cbiAgcHVibGljIGFkZERlZmluaXRpb25zKC4uLmRlZmluaXRpb25zOiBhbnlbXSkge1xuICAgIGZvciAoY29uc3QgVkFMVUUgb2Ygbm9ybWFsaXplRGVmaW5pdGlvbnMoLi4uZGVmaW5pdGlvbnMpKVxuICAgICAgdGhpc1tERUZJTkVTXS5wdXNoKHsgVkFMVUUgfSk7XG4gIH1cblxuICBwdWJsaWMgYWRkUHJlQnVpbGQoY29tbWFuZDogYW55LCBhcmdzOiBhbnlbXSkge1xuICAgIHRoaXNbSU1QTF0uYWRkUHJlQnVpbGQoY29tbWFuZCwgYXJncyk7XG4gIH1cblxuICBwdWJsaWMgYWRkUG9zdEJ1aWxkKGNvbW1hbmQ6IGFueSwgYXJnczogYW55W10pIHtcbiAgICB0aGlzW0lNUExdLmFkZFBvc3RCdWlsZChjb21tYW5kLCBhcmdzKTtcbiAgfVxuXG4gIHB1YmxpYyBnZXQgdGFyZ2V0RmlsZSgpOiBMaXZlU3RyaW5nIHtcbiAgICBjb25zdCB0YXJnZXRGaWxlID0gdGhpc1tJTVBMXS50YXJnZXRGaWxlO1xuICAgIHJldHVybiBMaXZlU3RyaW5nLmNyZWF0ZSgoKSA9PiBGaWxlUGF0aC5jcmVhdGUodGFyZ2V0RmlsZS5maWxlKS50b1N0cmluZygpKTtcbiAgfVxuXG4gIHB1YmxpYyB0b0pTT04oKTogb2JqZWN0IHtcbiAgICByZXR1cm4ge1xuICAgICAgTkFNRTogdGhpcy5OQU1FLFxuICAgICAgVEFSR0VUX1NDT1BFOiB0aGlzLlRBUkdFVF9TQ09QRSxcbiAgICAgIENPTVBJTEVfT1BUSU9OUzogdGhpcy5DT01QSUxFX09QVElPTlMsXG4gICAgICBMSU5LX09QVElPTlM6IHRoaXMuTElOS19PUFRJT05TLFxuICAgICAgSU5DTFVERVM6IHRoaXMuSU5DTFVERVMsXG4gICAgICBERUZJTkVTOiB0aGlzLkRFRklORVMsXG4gICAgICBTT1VSQ0VTOiB0aGlzLlNPVVJDRVMsXG4gICAgICBMSUJSQVJJRVM6IHRoaXMuTElCUkFSSUVTLFxuICAgICAgRklMRV9ESVI6IHRoaXMuRklMRV9ESVIsXG4gICAgICBGSUxFOiB0aGlzLkZJTEUsXG4gICAgfVxuICB9XG59O1xuXG5leHBvcnQgY2xhc3MgQmFzZUxpYnJhcnkgZXh0ZW5kcyBCYXNlVGFyZ2V0IHtcbiAgcHJvdGVjdGVkIGNvbnN0cnVjdG9yKGltcGw6IFRhcmdldFN0cnVjdCwgc2NvcGU6IFN5c3RlbVNjb3BlLCBwcmVmaXg6IHN0cmluZywgc3VmZml4OiBzdHJpbmcpIHtcbiAgICBzdXBlcihpbXBsLCBzY29wZSwgcHJlZml4LCBzdWZmaXgpO1xuICB9XG5cbiAgcHVibGljIHNldFBvc2l0aW9uSW5kZXBlbmRlbnRDb2RlKHZhbHVlOiBib29sZWFuKSB7XG4gICAgdGhpc1tQT1NJVElPTl9JTkRFUEVOREVOVF9DT0RFXSA9IHZhbHVlO1xuICB9XG5cbiAgcHVibGljIGFkZFB1YmxpY0luY2x1ZGVzKC4uLmluY2x1ZGVzOiBBcnJheTxJbnRlcmZhY2VJbmNsdWRlcyB8IEFic29sdXRlUGF0aCB8IHN0cmluZz4pIHtcbiAgICBmb3IgKGNvbnN0IGl0IG9mIGluY2x1ZGVzLmZsYXQoMSkpIHtcbiAgICAgIGxldCBWQUxVRTtcbiAgICAgIGlmIChpdCBpbnN0YW5jZW9mIEludGVyZmFjZUluY2x1ZGVzKVxuICAgICAgICBWQUxVRSA9IGl0O1xuICAgICAgZWxzZSBpZiAodHlwZW9mIGl0ID09PSBcInN0cmluZ1wiIHx8IEFic29sdXRlUGF0aC5pc0Fic29sdXRlKGl0KSlcbiAgICAgICAgVkFMVUUgPSBJbmNsdWRlRGlyZWN0b3J5LmNyZWF0ZShpdCwgdGhpc1tUQVJHRVRfU0NPUEVdLlNPVVJDRV9ESVIpO1xuICAgICAgZWxzZVxuICAgICAgICB0aHJvdyBuZXcgRXJyb3IoYE5vdCBzdXBwb3J0IGluc3RhbmNlICR7aXR9YCk7XG4gICAgICB0aGlzW0lOQ0xVREVTXS5wdXNoKHtWQUxVRSwgUFVCTElDX09OTFk6IHRydWV9KTsgLy8gSW5jbHVkZURpcmVjdG9yeVtdXG4gICAgfVxuICB9XG5cbiAgcHVibGljIGFkZFB1YmxpY0RlZmluaXRpb25zKC4uLmRlZmluaXRpb25zOiBzdHJpbmdbXSkge1xuICAgIGZvciAoY29uc3QgVkFMVUUgb2YgZGVmaW5pdGlvbnMuZmxhdCgxKSlcbiAgICAgIHRoaXNbREVGSU5FU10ucHVzaCh7IFZBTFVFLCBQVUJMSUNfT05MWTogdHJ1ZSB9KTtcbiAgfVxuXG4gIHB1YmxpYyBhZGRQdWJsaWNMaWJyYXJpZXMoLi4ubGlicmFyaWVzOiBhbnlbXSkge1xuICAgIGZvciAoY29uc3QgaXQgb2YgbGlicmFyaWVzLmZsYXQoMSkpIHtcbiAgICAgIHRoaXNbTElCUkFSSUVTXS5wdXNoKHtWQUxVRTogSW50ZXJmYWNlVGFyZ2V0LmVuc3VyZUluc3RhbmNlKGl0KSwgUFVCTElDX09OTFk6IHRydWV9KTtcbiAgICB9XG4gIH1cblxuICBwdWJsaWMgYWRkUHVibGljQ29tcGlsZU9wdGlvbnMoLi4ub3B0aW9uczogc3RyaW5nW10pIHtcbiAgICBmb3IgKGNvbnN0IGl0IG9mIG9wdGlvbnMuZmxhdCgxKSkge1xuICAgICAgdGhpc1tDT01QSUxFX09QVElPTlNdLnB1c2goeyBWQUxVRTogaXQsIFBVQkxJQ19PTkxZOiB0cnVlIH0pO1xuICAgIH1cbiAgfVxuXG4gIHB1YmxpYyBhZGRQdWJsaWNMaW5rT3B0aW9ucyguLi5vcHRpb25zOiBhbnlbXSkge1xuICAgIGZvciAoY29uc3QgaXQgb2Ygb3B0aW9ucy5mbGF0KDEpKSB7XG4gICAgICB0aGlzW0xJTktfT1BUSU9OU10ucHVzaCh7IFZBTFVFOiBpdCwgUFVCTElDX09OTFk6IHRydWUgfSk7XG4gICAgfVxuICB9XG59O1xuXG5leHBvcnQgY2xhc3MgT2JqZWN0TGlicmFyeSBleHRlbmRzIEJhc2VMaWJyYXJ5IHtcbiAgcHJpdmF0ZSBjb25zdHJ1Y3RvcihpbXBsOiBUYXJnZXRTdHJ1Y3QsIHNjb3BlOiBTeXN0ZW1TY29wZSkge1xuICAgIHN1cGVyKGltcGwsIHNjb3BlLCBzY29wZS5PQkpFQ1RfTElCUkFSWV9QUkVGSVgsIHNjb3BlLk9CSkVDVF9MSUJSQVJZX1NVRkZJWCk7XG4gICAgdGhpc1tJTVBMXS50eXBlID0gVGFyZ2V0VHlwZS5PYmplY3RMaWJyYXJ5O1xuICAgIHRoaXMuTElOS19PUFRJT05TLnB1c2goLi4uKHNjb3BlIGFzIGFueSkuT0JKRUNUX0xJTktFUl9GTEFHUy5tYXAoKFZBTFVFOiBhbnkpID0+ICh7IFZBTFVFIH0pKSk7XG4gIH1cblxuICBwdWJsaWMgc3RhdGljIGNyZWF0ZShpbXBsOiBUYXJnZXRTdHJ1Y3QsIHNjb3BlOiBTeXN0ZW1TY29wZSkge1xuICAgIHJldHVybiBPYmplY3Quc2VhbChuZXcgT2JqZWN0TGlicmFyeShpbXBsLCBzY29wZSkpO1xuICB9XG59O1xuXG5leHBvcnQgY2xhc3MgU3RhdGljTGlicmFyeSBleHRlbmRzIEJhc2VMaWJyYXJ5IHtcbiAgcHJpdmF0ZSBjb25zdHJ1Y3RvcihpbXBsOiBUYXJnZXRTdHJ1Y3QsIHNjb3BlOiBTeXN0ZW1TY29wZSkge1xuICAgIHN1cGVyKGltcGwsIHNjb3BlLCBzY29wZS5TVEFUSUNfTElCUkFSWV9QUkVGSVgsIHNjb3BlLlNUQVRJQ19MSUJSQVJZX1NVRkZJWCk7XG4gICAgdGhpc1tJTVBMXS50eXBlID0gVGFyZ2V0VHlwZS5TdGF0aWNMaWJyYXJ5O1xuICAgIHRoaXMuTElOS19PUFRJT05TLnB1c2goLi4uKHNjb3BlIGFzIGFueSkuU1RBVElDX0xJTktFUl9GTEFHUy5tYXAoKFZBTFVFOiBhbnkpID0+ICh7IFZBTFVFIH0pKSk7XG4gIH1cblxuICBwdWJsaWMgc3RhdGljIGNyZWF0ZShpbXBsOiBUYXJnZXRTdHJ1Y3QsIHNjb3BlOiBTeXN0ZW1TY29wZSkge1xuICAgIHJldHVybiBPYmplY3Quc2VhbChuZXcgU3RhdGljTGlicmFyeShpbXBsLCBzY29wZSkpO1xuICB9XG59O1xuXG5leHBvcnQgY2xhc3MgU2hhcmVkTGlicmFyeSBleHRlbmRzIEJhc2VMaWJyYXJ5IHtcbiAgcHJpdmF0ZSBjb25zdHJ1Y3RvcihpbXBsOiBUYXJnZXRTdHJ1Y3QsIHNjb3BlOiBTeXN0ZW1TY29wZSkge1xuICAgIHN1cGVyKGltcGwsIHNjb3BlLCBzY29wZS5TSEFSRURfTElCUkFSWV9QUkVGSVgsIHNjb3BlLlNIQVJFRF9MSUJSQVJZX1NVRkZJWCk7XG4gICAgdGhpc1tJTVBMXS50eXBlID0gVGFyZ2V0VHlwZS5TaGFyZWRMaWJyYXJ5O1xuICAgIHRoaXMuTElOS19PUFRJT05TLnB1c2goLi4uKHNjb3BlIGFzIGFueSkuU0hBUkVEX0xJTktFUl9GTEFHUy5tYXAoKFZBTFVFOiBhbnkpID0+ICh7IFZBTFVFIH0pKSk7XG4gIH1cblxuICBwdWJsaWMgc3RhdGljIGNyZWF0ZShpbXBsOiBUYXJnZXRTdHJ1Y3QsIHNjb3BlOiBTeXN0ZW1TY29wZSkge1xuICAgIHJldHVybiBPYmplY3Quc2VhbChuZXcgU2hhcmVkTGlicmFyeShpbXBsLCBzY29wZSkpO1xuICB9XG59XG5cbmV4cG9ydCBjbGFzcyBFeGVjdXRhYmxlIGV4dGVuZHMgQmFzZVRhcmdldCB7XG4gIHByaXZhdGUgY29uc3RydWN0b3IoaW1wbDogVGFyZ2V0U3RydWN0LCBzY29wZTogU3lzdGVtU2NvcGUpIHtcbiAgICBzdXBlcihpbXBsLCBzY29wZSwgXCJcIiwgc2NvcGUuRVhFQ1VUQUJMRV9TVUZGSVgpO1xuICAgIHRoaXNbSU1QTF0udHlwZSA9IFRhcmdldFR5cGUuRXhlY3V0YWJsZTtcbiAgICB0aGlzLkxJTktfT1BUSU9OUy5wdXNoKC4uLihzY29wZSBhcyBhbnkpLkVYRV9MSU5LRVJfRkxBR1MubWFwKChWQUxVRTogYW55KSA9PiAoeyBWQUxVRSB9KSkpO1xuICB9XG5cbiAgcHVibGljIHN0YXRpYyBjcmVhdGUoaW1wbDogVGFyZ2V0U3RydWN0LCBzY29wZTogU3lzdGVtU2NvcGUpIHtcbiAgICByZXR1cm4gT2JqZWN0LnNlYWwobmV3IEV4ZWN1dGFibGUoaW1wbCwgc2NvcGUpKTtcbiAgfVxufTtcbiIsIi8qXG4gKiBNSVQgTGljZW5zZVxuICpcbiAqIENvcHlyaWdodCAoYykgMjAyNSAgWXVyaWkgWWFrdWJpbiAoeXVyaWkueWFrdWJpbkBnbWFpbC5jb20pXG4gKlxuICogUGVybWlzc2lvbiBpcyBncmFudGVkIHRvIHVzZSwgY29weSwgbW9kaWZ5LCBhbmQgZGlzdHJpYnV0ZSB0aGlzIHNvZnR3YXJlXG4gKiB1bmRlciB0aGUgTUlUIExpY2Vuc2UuIFNlZSBMSUNFTlNFIGZpbGUgZm9yIGRldGFpbHMuXG4gKi9cblxuaW1wb3J0IHsgSW5jbHVkZURpcmVjdG9yeSB9IGZyb20gXCJAL2NvcmUvSW5jbHVkZURpcmVjdG9yeVwiO1xuaW1wb3J0IHsgSW50ZXJmYWNlSW5jbHVkZXMgfWZyb20gXCJAL2NvcmUvSW50ZXJmYWNlSW5jbHVkZXNcIjtcbmltcG9ydCB7IEludGVyZmFjZVRhcmdldCB9IGZyb20gXCJAL2NvcmUvSW50ZXJmYWNlVGFyZ2V0XCI7XG5pbXBvcnQgeyBUYXJnZXRTdHJ1Y3QgfSBmcm9tIFwiQC9jb3JlL1RhcmdldFN0cnVjdFwiO1xuaW1wb3J0IHsgQUxMX1RBUkdFVCwgSU5TVEFMTF9UQVJHRVQgfSBmcm9tIFwiQC9Db25zdGFudHNcIjtcbmltcG9ydCB7IEJhc2VUYXJnZXQgfSBmcm9tIFwiLi9UYXJnZXRcIjtcblxuY29uc3QgRU5UUklFUyA9IFN5bWJvbChcIkVOVFJJRVNcIik7XG5cbmV4cG9ydCBjbGFzcyBUYXJnZXRTdHJ1Y3RDb2xsZWN0aW9uIHtcbiAgcHJpdmF0ZSBbRU5UUklFU106IE1hcDxzdHJpbmcsIFRhcmdldFN0cnVjdD47XG5cbiAgY29uc3RydWN0b3IoKSB7XG4gICAgdGhpc1tFTlRSSUVTXSA9IG5ldyBNYXA8c3RyaW5nLCBUYXJnZXRTdHJ1Y3Q+KCk7XG4gIH1cblxuICBnZXQobmFtZTogc3RyaW5nKTogVGFyZ2V0U3RydWN0IHtcbiAgICBpZiAodHlwZW9mIG5hbWUgIT09IFwic3RyaW5nXCIpXG4gICAgICB0aHJvdyBuZXcgRXJyb3IoYFRhcmdldCBcIiR7bmFtZX1cIiBpcyBub3Qgc3RyaW5nIHR5cGVgKTtcbiAgICBpZiAoWyBBTExfVEFSR0VULCBJTlNUQUxMX1RBUkdFVCBdLmluY2x1ZGVzKG5hbWUpKVxuICAgICAgdGhyb3cgbmV3IEVycm9yKGBUYXJnZXQgXCIke25hbWV9XCIgaXMgcmVzZXJ2ZWQgbmFtZWApO1xuICAgIGxldCByZXN1bHQ6IFRhcmdldFN0cnVjdCB8IHVuZGVmaW5lZCA9IHRoaXNbRU5UUklFU10uZ2V0KG5hbWUpO1xuICAgIGlmICghcmVzdWx0KSB7XG4gICAgICByZXN1bHQgPSBuZXcgVGFyZ2V0U3RydWN0KG5hbWUpO1xuICAgICAgdGhpc1tFTlRSSUVTXS5zZXQobmFtZSwgcmVzdWx0KTtcbiAgICB9XG4gICAgcmV0dXJuIHJlc3VsdDtcbiAgfVxuXG4gIHB1YmxpYyB0b0pTT04oKTogb2JqZWN0IHtcbiAgICBjb25zdCByZXN1bHQ6IGFueSA9IHt9O1xuICAgIHRoaXNbRU5UUklFU10uZm9yRWFjaCgodiwgaykgPT4gdm9pZCAocmVzdWx0W2tdID0gdikpO1xuICAgIHJldHVybiByZXN1bHQ7XG4gIH1cbn07XG5cbmZ1bmN0aW9uIGdldEhlYWRlcnModGFyZ2V0OiBhbnkpIHtcbiAgcmV0dXJuIHRhcmdldC5TT1VSQ0VTLmZpbHRlcigoaTogYW55KSA9PiBpLkhFQURFUl9GSUxFX09OTFkpO1xufVxuXG5mdW5jdGlvbiBnZXRJbmNsdWRlcyh0YXJnZXQ6IGFueSkge1xuICByZXR1cm4gdGFyZ2V0LklOQ0xVREVTLm1hcCgoaTogYW55KSA9PiBpLlZBTFVFKTtcbn1cblxuZnVuY3Rpb24gZ2V0UHVibGljSW5jbHVkZXModGFyZ2V0OiBhbnkpIHtcbiAgcmV0dXJuIHRhcmdldC5JTkNMVURFUy5maWx0ZXIoKGk6IGFueSkgPT4gaS5QVUJMSUNfT05MWSkubWFwKChpOiBhbnkpID0+IGkuVkFMVUUpO1xufVxuXG5mdW5jdGlvbiBnZXRMaWJyYXJpZXModGFyZ2V0OiBhbnkpIHtcbiAgcmV0dXJuIHRhcmdldC5MSUJSQVJJRVMubWFwKChpOiBhbnkpID0+IGkuVkFMVUUpO1xufVxuXG5mdW5jdGlvbiBnZXRQdWJsaWNMaWJyYXJpZXModGFyZ2V0OiBhbnkpIHtcbiAgcmV0dXJuIHRhcmdldC5MSUJSQVJJRVMuZmlsdGVyKChpOiBhbnkpID0+IGkuUFVCTElDX09OTFkpLm1hcCgoaTogYW55KSA9PiBpLlZBTFVFKTtcbn1cblxuZnVuY3Rpb24gZ2V0RGVmaW5pdGlvbnModGFyZ2V0OiBhbnkpIHtcbiAgcmV0dXJuIHRhcmdldC5ERUZJTkVTLm1hcCgoaTogYW55KSA9PiBpLlZBTFVFKTtcbn1cblxuZnVuY3Rpb24gZ2V0UHVibGljRGVmaW5pdGlvbnModGFyZ2V0OiBhbnkpIHtcbiAgcmV0dXJuIHRhcmdldC5ERUZJTkVTLmZpbHRlcigoaTogYW55KSA9PiBpLlBVQkxJQ19PTkxZKS5tYXAoKGk6IGFueSkgPT4gaS5WQUxVRSk7XG59XG5cbmZ1bmN0aW9uIGdldENvbXBpbGVPcHRpb25zKHRhcmdldDogYW55KSB7XG4gIHJldHVybiB0YXJnZXQuQ09NUElMRV9PUFRJT05TLm1hcCgoaTogYW55KSA9PiBpLlZBTFVFKTtcbn1cblxuZnVuY3Rpb24gZ2V0UHVibGljQ29tcGlsZU9wdGlvbnModGFyZ2V0OiBhbnkpIHtcbiAgcmV0dXJuIHRhcmdldC5DT01QSUxFX09QVElPTlMuZmlsdGVyKChpOiBhbnkpID0+IGkuUFVCTElDX09OTFkpLm1hcCgoaTogYW55KSA9PiBpLlZBTFVFKTtcbn1cblxuZnVuY3Rpb24gZ2V0TGlua09wdGlvbnModGFyZ2V0OiBhbnkpIHtcbiAgcmV0dXJuIHRhcmdldC5MSU5LX09QVElPTlMubWFwKChpOiBhbnkpID0+IGkuVkFMVUUpO1xufVxuXG5mdW5jdGlvbiBnZXRQdWJsaWNMaW5rT3B0aW9ucyh0YXJnZXQ6IGFueSkge1xuICByZXR1cm4gdGFyZ2V0LkxJTktfT1BUSU9OUy5maWx0ZXIoKGk6IGFueSkgPT4gaS5QVUJMSUNfT05MWSkubWFwKChpOiBhbnkpID0+IGkuVkFMVUUpO1xufVxuXG5leHBvcnQgY2xhc3MgVGFyZ2V0Q29sbGVjdGlvbiB7XG4gIHByaXZhdGUgW0VOVFJJRVNdOiB7IFtuYW1lOiBzdHJpbmddOiBCYXNlVGFyZ2V0IH07XG5cbiAgcHJpdmF0ZSBjb25zdHJ1Y3RvcigpIHtcbiAgICB0aGlzW0VOVFJJRVNdID0ge307XG4gIH1cblxuICBwdWJsaWMgc3RhdGljIGNyZWF0ZSgpIHtcbiAgICByZXR1cm4gT2JqZWN0LnNlYWwobmV3IFRhcmdldENvbGxlY3Rpb24pO1xuICB9XG4gIFxuICBwdWJsaWMgZ2V0IEVOVFJJRVMoKSB7XG4gICAgcmV0dXJuIHRoaXNbRU5UUklFU107XG4gIH1cblxuICBwdWJsaWMgdG9KU09OKCk6IG9iamVjdCB7XG4gICAgcmV0dXJuIHRoaXNbRU5UUklFU107XG4gIH1cblxuICBwdWJsaWMgZ2V0KG5hbWU6IHN0cmluZyk6IGFueSB7XG4gICAgcmV0dXJuIHRoaXNbRU5UUklFU11bbmFtZV07XG4gIH1cblxuICBwdWJsaWMgc2V0KG5hbWU6IHN0cmluZywgdGFyZ2V0OiBhbnkpIHtcbiAgICBpZiAodGhpc1tFTlRSSUVTXVtuYW1lXSlcbiAgICAgIHRocm93IG5ldyBFcnJvcihgVGFyZ2V0IFwiJHtuYW1lfVwiIGV4aXN0c2ApO1xuICAgIHRoaXNbRU5UUklFU11bbmFtZV0gPSB0YXJnZXQ7XG4gIH1cblxuICBwcml2YXRlIF9fZ2V0QWxsSW5jbHVkZXMoaW5jbHVkZXM6IHN0cmluZ1tdLCB0YXJnZXRTZXQ6IFNldDxzdHJpbmc+LCBsaXN0OiBhbnkpIHtcbiAgICBmb3IgKGNvbnN0IGl0ZXIgb2YgbGlzdCkge1xuICAgICAgaWYgKGl0ZXIgaW5zdGFuY2VvZiBJbnRlcmZhY2VJbmNsdWRlcyB8fCBpdGVyIGluc3RhbmNlb2YgSW50ZXJmYWNlVGFyZ2V0KSB7XG4gICAgICAgIGlmICghdGFyZ2V0U2V0LmhhcyhpdGVyLnRhcmdldE5hbWUpKSB7XG4gICAgICAgICAgdGFyZ2V0U2V0LmFkZChpdGVyLnRhcmdldE5hbWUpO1xuICAgICAgICAgIGNvbnN0IHRhcmdldCA9IHRoaXMuZ2V0KGl0ZXIudGFyZ2V0TmFtZSk7XG4gICAgICAgICAgdGhpcy5fX2dldEFsbEluY2x1ZGVzKGluY2x1ZGVzLCB0YXJnZXRTZXQsIGdldFB1YmxpY0luY2x1ZGVzKHRhcmdldCkpO1xuICAgICAgICAgIHRoaXMuX19nZXRBbGxJbmNsdWRlcyhpbmNsdWRlcywgdGFyZ2V0U2V0LCBnZXRQdWJsaWNMaWJyYXJpZXModGFyZ2V0KSk7XG4gICAgICAgIH1cbiAgICAgIH1cbiAgICAgIGVsc2UgaWYgKGl0ZXIgaW5zdGFuY2VvZiBJbmNsdWRlRGlyZWN0b3J5KSB7XG4gICAgICAgIGlmICghaW5jbHVkZXMuaW5jbHVkZXMoaXRlci50b1N0cmluZygpKSlcbiAgICAgICAgICBpbmNsdWRlcy5wdXNoKGl0ZXIudG9TdHJpbmcoKSk7XG4gICAgICB9XG4gICAgICBlbHNlIHtcbiAgICAgICAgdGhyb3cgbmV3IEVycm9yKGBOb3Qgc3VwcG9ydCBpbnN0YW5jZSAke2l0ZXJ9YCk7XG4gICAgICB9XG4gICAgfVxuICB9XG5cbiAgcHVibGljIGFsbEluY2x1ZGVzT2YocGFyYW1zOiBhbnkpOiBzdHJpbmdbXSB7XG4gICAgY29uc3QgdGFyZ2V0ID0gKHR5cGVvZiBwYXJhbXMgPT09IFwic3RyaW5nXCIpID8gdGhpcy5nZXQocGFyYW1zKSA6IHBhcmFtcztcbiAgICBjb25zdCBpbmNsdWRlczogc3RyaW5nW10gPSBbXTtcbiAgICBjb25zdCB0YXJnZXRTZXQgPSBuZXcgU2V0KFsgdGFyZ2V0Lk5BTUUgXSk7XG4gICAgdGhpcy5fX2dldEFsbEluY2x1ZGVzKGluY2x1ZGVzLCB0YXJnZXRTZXQsIGdldEluY2x1ZGVzKHRhcmdldCkpO1xuICAgIHRoaXMuX19nZXRBbGxJbmNsdWRlcyhpbmNsdWRlcywgdGFyZ2V0U2V0LCBnZXRMaWJyYXJpZXModGFyZ2V0KSk7XG4gICAgcmV0dXJuIGluY2x1ZGVzO1xuICB9XG5cbiAgcHJpdmF0ZSBfX2dldEFsbEhlYWRlcnMoaGVhZGVyczogc3RyaW5nW10sIHRhcmdldFNldDogU2V0PHN0cmluZz4sIGxpc3Q6IGFueSkge1xuICAgIGZvciAoY29uc3QgaXRlciBvZiBsaXN0KSB7XG4gICAgICBpZiAoaXRlciBpbnN0YW5jZW9mIEludGVyZmFjZUluY2x1ZGVzIHx8IGl0ZXIgaW5zdGFuY2VvZiBJbnRlcmZhY2VUYXJnZXQpIHtcbiAgICAgICAgaWYgKCF0YXJnZXRTZXQuaGFzKGl0ZXIudGFyZ2V0TmFtZSkpIHtcbiAgICAgICAgICB0YXJnZXRTZXQuYWRkKGl0ZXIudGFyZ2V0TmFtZSk7XG4gICAgICAgICAgY29uc3QgdGFyZ2V0ID0gdGhpcy5nZXQoaXRlci50YXJnZXROYW1lKTtcbiAgICAgICAgICBmb3IgKGNvbnN0IGhlYWRlciBvZiBnZXRIZWFkZXJzKHRhcmdldCkubWFwKChpOiBhbnkpID0+IGkuRklMRS50b1N0cmluZygpKSkge1xuICAgICAgICAgICAgaWYgKCFoZWFkZXJzLmluY2x1ZGVzKGhlYWRlci50b1N0cmluZygpKSlcbiAgICAgICAgICAgICAgaGVhZGVycy5wdXNoKGhlYWRlci50b1N0cmluZygpKTtcbiAgICAgICAgICB9XG4gICAgICAgICAgdGhpcy5fX2dldEFsbEhlYWRlcnMoaGVhZGVycywgdGFyZ2V0U2V0LCBnZXRQdWJsaWNJbmNsdWRlcyh0YXJnZXQpKTtcbiAgICAgICAgICB0aGlzLl9fZ2V0QWxsSGVhZGVycyhoZWFkZXJzLCB0YXJnZXRTZXQsIGdldFB1YmxpY0xpYnJhcmllcyh0YXJnZXQpKTtcbiAgICAgICAgfVxuICAgICAgfVxuICAgIH1cbiAgfVxuXG4gIHB1YmxpYyBhbGxIZWFkZXJzT2YocGFyYW1zOiBhbnkpIHtcbiAgICBjb25zdCB0YXJnZXQgPSAodHlwZW9mIHBhcmFtcyA9PT0gXCJzdHJpbmdcIikgPyB0aGlzLmdldChwYXJhbXMpIDogcGFyYW1zO1xuICAgIGNvbnN0IGhlYWRlcnMgPSBnZXRIZWFkZXJzKHRhcmdldCkubWFwKChpOiBhbnkpID0+IGkuRklMRS50b1N0cmluZygpKTtcbiAgICBjb25zdCB0YXJnZXRTZXQgPSBuZXcgU2V0KFsgdGFyZ2V0Lk5BTUUgXSk7XG4gICAgdGhpcy5fX2dldEFsbEhlYWRlcnMoaGVhZGVycywgdGFyZ2V0U2V0LCBnZXRJbmNsdWRlcyh0YXJnZXQpKTtcbiAgICB0aGlzLl9fZ2V0QWxsSGVhZGVycyhoZWFkZXJzLCB0YXJnZXRTZXQsIGdldExpYnJhcmllcyh0YXJnZXQpKTtcbiAgICByZXR1cm4gaGVhZGVycztcbiAgfVxuXG4gIHByaXZhdGUgX19nZXRBbGxMaWJyYXJpZXMobGlicmFyaWVzOiBzdHJpbmdbXSwgdGFyZ2V0U2V0OiBTZXQ8c3RyaW5nPiwgbGlzdDogYW55KSB7XG4gICAgZm9yIChjb25zdCBpdGVyIG9mIGxpc3QpIHtcbiAgICAgIGNvbnNvbGUuYXNzZXJ0KGl0ZXIgaW5zdGFuY2VvZiBJbnRlcmZhY2VUYXJnZXQpO1xuICAgICAgaWYgKCF0YXJnZXRTZXQuaGFzKGl0ZXIudGFyZ2V0TmFtZSkpIHtcbiAgICAgICAgdGFyZ2V0U2V0LmFkZChpdGVyLnRhcmdldE5hbWUpO1xuICAgICAgICBjb25zdCB0YXJnZXQgPSB0aGlzLmdldChpdGVyLnRhcmdldE5hbWUpO1xuICAgICAgICBsaWJyYXJpZXMucHVzaCh0YXJnZXQuRklMRS50b1N0cmluZygpKTtcbiAgICAgICAgdGhpcy5fX2dldEFsbExpYnJhcmllcyhsaWJyYXJpZXMsIHRhcmdldFNldCwgZ2V0UHVibGljTGlicmFyaWVzKHRhcmdldCkpO1xuICAgICAgfVxuICAgIH1cbiAgfVxuXG4gIHB1YmxpYyBhbGxMaWJyYXJpZXNPZihwYXJhbXM6IGFueSkge1xuICAgIGNvbnN0IHRhcmdldCA9ICh0eXBlb2YgcGFyYW1zID09PSBcInN0cmluZ1wiKSA/IHRoaXMuZ2V0KHBhcmFtcykgOiBwYXJhbXM7XG4gICAgY29uc3QgbGlicmFyaWVzOiBzdHJpbmdbXSA9IFtdO1xuICAgIGNvbnN0IHRhcmdldFNldCA9IG5ldyBTZXQoWyB0YXJnZXQuTkFNRSBdKTtcbiAgICB0aGlzLl9fZ2V0QWxsTGlicmFyaWVzKGxpYnJhcmllcywgdGFyZ2V0U2V0LCBnZXRMaWJyYXJpZXModGFyZ2V0KSk7XG4gICAgcmV0dXJuIGxpYnJhcmllcztcbiAgfVxuXG4gIHByaXZhdGUgX19nZXRBbGxEZWZpbml0aW9ucyhkZWZpbml0aW9uczogc3RyaW5nW10sIHRhcmdldFNldDogU2V0PHN0cmluZz4sIGxpc3Q6IGFueSkge1xuICAgIGZvciAoY29uc3QgaXRlciBvZiBsaXN0KSB7XG4gICAgICBpZiAoaXRlciBpbnN0YW5jZW9mIEludGVyZmFjZVRhcmdldCkge1xuICAgICAgICBpZiAoIXRhcmdldFNldC5oYXMoaXRlci50YXJnZXROYW1lKSkge1xuICAgICAgICAgIHRhcmdldFNldC5hZGQoaXRlci50YXJnZXROYW1lKTtcbiAgICAgICAgICBjb25zdCB0YXJnZXQgPSB0aGlzLmdldChpdGVyLnRhcmdldE5hbWUpO1xuICAgICAgICAgIHRoaXMuX19nZXRBbGxEZWZpbml0aW9ucyhkZWZpbml0aW9ucywgdGFyZ2V0U2V0LCBnZXRQdWJsaWNEZWZpbml0aW9ucyh0YXJnZXQpKTtcbiAgICAgICAgICB0aGlzLl9fZ2V0QWxsRGVmaW5pdGlvbnMoZGVmaW5pdGlvbnMsIHRhcmdldFNldCwgZ2V0UHVibGljTGlicmFyaWVzKHRhcmdldCkpO1xuICAgICAgICB9XG4gICAgICB9XG4gICAgICBlbHNlIGlmICh0eXBlb2YgaXRlciA9PT0gXCJzdHJpbmdcIikge1xuICAgICAgICBpZiAoIWRlZmluaXRpb25zLmluY2x1ZGVzKGl0ZXIpKVxuICAgICAgICAgIGRlZmluaXRpb25zLnB1c2goaXRlcik7XG4gICAgICB9XG4gICAgICBlbHNlIHtcbiAgICAgICAgdGhyb3cgbmV3IEVycm9yKGBOb3Qgc3VwcG9ydCBpbnN0YW5jZSAke2l0ZXJ9YCk7XG4gICAgICB9XG4gICAgfVxuICB9XG5cbiAgcHVibGljIGFsbERlZmluaXRpb25zT2YocGFyYW1zOiBhbnkpIHtcbiAgICBjb25zdCB0YXJnZXQgPSAodHlwZW9mIHBhcmFtcyA9PT0gXCJzdHJpbmdcIikgPyB0aGlzLmdldChwYXJhbXMpIDogcGFyYW1zO1xuICAgIGNvbnN0IGRlZmluaXRpb25zOiBzdHJpbmdbXSA9IFtdO1xuICAgIGNvbnN0IHRhcmdldFNldCA9IG5ldyBTZXQoWyB0YXJnZXQuTkFNRSBdKTtcbiAgICB0aGlzLl9fZ2V0QWxsRGVmaW5pdGlvbnMoZGVmaW5pdGlvbnMsIHRhcmdldFNldCwgZ2V0RGVmaW5pdGlvbnModGFyZ2V0KSk7XG4gICAgdGhpcy5fX2dldEFsbERlZmluaXRpb25zKGRlZmluaXRpb25zLCB0YXJnZXRTZXQsIGdldFB1YmxpY0xpYnJhcmllcyh0YXJnZXQpKTtcbiAgICByZXR1cm4gZGVmaW5pdGlvbnM7XG4gIH1cblxuICBwcml2YXRlIF9fZ2V0QWxsQ29tcGlsZU9wdGlvbnMob3B0aW9uczogQXJyYXk8c3RyaW5nfHN0cmluZ1tdPiwgdGFyZ2V0U2V0OiBTZXQ8c3RyaW5nPiwgbGlzdDogYW55KSB7XG4gICAgZm9yIChjb25zdCBpdGVyIG9mIGxpc3QpIHtcbiAgICAgIGlmIChpdGVyIGluc3RhbmNlb2YgSW50ZXJmYWNlVGFyZ2V0KSB7XG4gICAgICAgIGlmICghdGFyZ2V0U2V0LmhhcyhpdGVyLnRhcmdldE5hbWUpKSB7XG4gICAgICAgICAgdGFyZ2V0U2V0LmFkZChpdGVyLnRhcmdldE5hbWUpO1xuICAgICAgICAgIGNvbnN0IHRhcmdldCA9IHRoaXMuZ2V0KGl0ZXIudGFyZ2V0TmFtZSk7XG4gICAgICAgICAgdGhpcy5fX2dldEFsbENvbXBpbGVPcHRpb25zKG9wdGlvbnMsIHRhcmdldFNldCwgZ2V0UHVibGljQ29tcGlsZU9wdGlvbnModGFyZ2V0KSk7XG4gICAgICAgICAgdGhpcy5fX2dldEFsbENvbXBpbGVPcHRpb25zKG9wdGlvbnMsIHRhcmdldFNldCwgZ2V0UHVibGljTGlicmFyaWVzKHRhcmdldCkpO1xuICAgICAgICB9XG4gICAgICB9XG4gICAgICBlbHNlIGlmICh0eXBlb2YgaXRlciA9PT0gXCJzdHJpbmdcIikge1xuICAgICAgICBpZiAoIW9wdGlvbnMuaW5jbHVkZXMoaXRlcikpXG4gICAgICAgICAgb3B0aW9ucy5wdXNoKGl0ZXIpO1xuICAgICAgfVxuICAgICAgZWxzZSBpZiAoQXJyYXkuaXNBcnJheShpdGVyKSkge1xuICAgICAgICAvLyBUT0RPOiBBZGQgY29tcGFyZSBmb3Igc2FtZSBhcnJheSBpbiBvcHRpb25zXG4gICAgICAgIG9wdGlvbnMucHVzaChpdGVyKTtcbiAgICAgIH1cbiAgICAgIGVsc2Uge1xuICAgICAgICB0aHJvdyBuZXcgRXJyb3IoYE5vdCBzdXBwb3J0IGluc3RhbmNlICR7aXRlcn1gKTtcbiAgICAgIH1cbiAgICB9XG4gIH1cblxuICBwdWJsaWMgYWxsQ29tcGlsZU9wdGlvbnNPZihwYXJhbXM6IGFueSkge1xuICAgIGNvbnN0IHRhcmdldCA9ICh0eXBlb2YgcGFyYW1zID09PSBcInN0cmluZ1wiKSA/IHRoaXMuZ2V0KHBhcmFtcykgOiBwYXJhbXM7XG4gICAgY29uc3Qgb3B0aW9uczogc3RyaW5nW10gPSBbXTtcbiAgICBjb25zdCB0YXJnZXRTZXQgPSBuZXcgU2V0KFsgdGFyZ2V0Lk5BTUUgXSk7XG4gICAgdGhpcy5fX2dldEFsbENvbXBpbGVPcHRpb25zKG9wdGlvbnMsIHRhcmdldFNldCwgZ2V0Q29tcGlsZU9wdGlvbnModGFyZ2V0KSk7XG4gICAgdGhpcy5fX2dldEFsbENvbXBpbGVPcHRpb25zKG9wdGlvbnMsIHRhcmdldFNldCwgZ2V0UHVibGljTGlicmFyaWVzKHRhcmdldCkpO1xuICAgIHJldHVybiBvcHRpb25zLmZsYXQoKTtcbiAgfVxuXG4gIHByaXZhdGUgX19nZXRMaW5rT3B0aW9ucyhvcHRpb25zOiBBcnJheTxzdHJpbmd8c3RyaW5nW10+LCB0YXJnZXRTZXQ6IFNldDxzdHJpbmc+LCBsaXN0OiBhbnkpIHtcbiAgICBmb3IgKGNvbnN0IGl0ZXIgb2YgbGlzdCkge1xuICAgICAgaWYgKGl0ZXIgaW5zdGFuY2VvZiBJbnRlcmZhY2VUYXJnZXQpIHtcbiAgICAgICAgaWYgKCF0YXJnZXRTZXQuaGFzKGl0ZXIudGFyZ2V0TmFtZSkpIHtcbiAgICAgICAgICB0YXJnZXRTZXQuYWRkKGl0ZXIudGFyZ2V0TmFtZSk7XG4gICAgICAgICAgY29uc3QgdGFyZ2V0ID0gdGhpcy5nZXQoaXRlci50YXJnZXROYW1lKTtcbiAgICAgICAgICB0aGlzLl9fZ2V0TGlua09wdGlvbnMob3B0aW9ucywgdGFyZ2V0U2V0LCBnZXRQdWJsaWNMaW5rT3B0aW9ucyh0YXJnZXQpKTtcbiAgICAgICAgICB0aGlzLl9fZ2V0TGlua09wdGlvbnMob3B0aW9ucywgdGFyZ2V0U2V0LCBnZXRQdWJsaWNMaWJyYXJpZXModGFyZ2V0KSk7XG4gICAgICAgIH1cbiAgICAgIH1cbiAgICAgIGVsc2UgaWYgKHR5cGVvZiBpdGVyID09PSBcInN0cmluZ1wiKSB7XG4gICAgICAgIGlmICghb3B0aW9ucy5pbmNsdWRlcyhpdGVyKSlcbiAgICAgICAgICBvcHRpb25zLnB1c2goaXRlcik7XG4gICAgICB9XG4gICAgICBlbHNlIGlmIChBcnJheS5pc0FycmF5KGl0ZXIpKSB7XG4gICAgICAgIC8vIFRPRE86IEFkZCBjb21wYXJlIGZvciBzYW1lIGFycmF5IGluIG9wdGlvbnNcbiAgICAgICAgb3B0aW9ucy5wdXNoKGl0ZXIpO1xuICAgICAgfVxuICAgICAgZWxzZSB7XG4gICAgICAgIHRocm93IG5ldyBFcnJvcihgTm90IHN1cHBvcnQgaW5zdGFuY2UgJHtpdGVyfWApO1xuICAgICAgfVxuICAgIH1cbiAgfVxuXG4gIHB1YmxpYyBhbGxMaW5rT3B0aW9uc09mKHBhcmFtczogYW55KSB7XG4gICAgY29uc3QgdGFyZ2V0ID0gKHR5cGVvZiBwYXJhbXMgPT09IFwic3RyaW5nXCIpID8gdGhpcy5nZXQocGFyYW1zKSA6IHBhcmFtcztcbiAgICBjb25zdCBvcHRpb25zOiBzdHJpbmdbXSA9IFtdO1xuICAgIGNvbnN0IHRhcmdldFNldCA9IG5ldyBTZXQoWyB0YXJnZXQuTkFNRSBdKTtcbiAgICB0aGlzLl9fZ2V0TGlua09wdGlvbnMob3B0aW9ucywgdGFyZ2V0U2V0LCBnZXRMaW5rT3B0aW9ucyh0YXJnZXQpKTtcbiAgICB0aGlzLl9fZ2V0TGlua09wdGlvbnMob3B0aW9ucywgdGFyZ2V0U2V0LCBnZXRQdWJsaWNMaWJyYXJpZXModGFyZ2V0KSk7XG4gICAgcmV0dXJuIG9wdGlvbnMuZmxhdCgpO1xuICB9XG59XG4iLCIvKlxuICogTUlUIExpY2Vuc2VcbiAqXG4gKiBDb3B5cmlnaHQgKGMpIDIwMjUgIFl1cmlpIFlha3ViaW4gKHl1cmlpLnlha3ViaW5AZ21haWwuY29tKVxuICpcbiAqIFBlcm1pc3Npb24gaXMgZ3JhbnRlZCB0byB1c2UsIGNvcHksIG1vZGlmeSwgYW5kIGRpc3RyaWJ1dGUgdGhpcyBzb2Z0d2FyZVxuICogdW5kZXIgdGhlIE1JVCBMaWNlbnNlLiBTZWUgTElDRU5TRSBmaWxlIGZvciBkZXRhaWxzLlxuICovXG5cbmltcG9ydCB7IERpclBhdGgsIEFic29sdXRlUGF0aCwgRmlsZVBhdGggfSBmcm9tIFwiQC9jb3JlL1BhdGhcIjtcblxuZXhwb3J0IGVudW0gVGFyZ2V0VHlwZSB7XG4gIFVua25vd24gPSBcIlVua25vd25cIixcbiAgU3RhdGljTGlicmFyeSA9IFwiU3RhdGljTGlicmFyeVwiLFxuICBTaGFyZWRMaWJyYXJ5ID0gXCJTaGFyZWRMaWJyYXJ5XCIsXG4gIE9iamVjdExpYnJhcnkgPSBcIk9iamVjdExpYnJhcnlcIixcbiAgRXhlY3V0YWJsZSA9IFwiRXhlY3V0YWJsZVwiLFxufTtcblxuY29uc3QgRlVOQyA9IFN5bWJvbChcIkZVTkNcIik7XG5cbmV4cG9ydCBjbGFzcyBMaXZlU3RyaW5nIHtcbiAgcHJpdmF0ZSBbRlVOQ106ICgpID0+IHN0cmluZztcblxuICBwcml2YXRlIGNvbnN0cnVjdG9yKGZ1bmM6ICgpID0+IHN0cmluZykge1xuICAgIHRoaXNbRlVOQ10gPSBmdW5jO1xuICB9XG5cbiAgcHVibGljIHN0YXRpYyBjcmVhdGUoZnVuYzogKCkgPT4gc3RyaW5nKSB7XG4gICAgcmV0dXJuIE9iamVjdC5zZWFsKG5ldyBMaXZlU3RyaW5nKGZ1bmMpKTtcbiAgfVxuXG4gIHRvU3RyaW5nKCk6IHN0cmluZyB7XG4gICAgcmV0dXJuIHRoaXNbRlVOQ10oKTtcbiAgfVxufTtcblxuY29uc3QgUFJFRklYICAgICAgPSBTeW1ib2woXCJQUkVGSVhcIik7XG5jb25zdCBTVUZGSVggICAgICA9IFN5bWJvbChcIlNVRkZJWFwiKTtcbmNvbnN0IE9VVFBVVF9OQU1FID0gU3ltYm9sKFwiT1VUUFVUX05BTUVcIik7XG5jb25zdCBGSUxFX0RJUiAgICA9IFN5bWJvbChcIkZJTEVfRElSXCIpO1xuXG5leHBvcnQgY2xhc3MgVGFyZ2V0RmlsZSB7XG4gIHByaXZhdGUgW0ZJTEVfRElSXT86IERpclBhdGhcbiAgcHJpdmF0ZSBbUFJFRklYXT86IHN0cmluZztcbiAgcHJpdmF0ZSBbT1VUUFVUX05BTUVdPzogc3RyaW5nO1xuICBwcml2YXRlIFtTVUZGSVhdPzogc3RyaW5nXG5cbiAgcHJpdmF0ZSBjb25zdHJ1Y3RvcigpIHtcbiAgfVxuXG4gIHB1YmxpYyBzdGF0aWMgY3JlYXRlKCk6IFRhcmdldEZpbGUge1xuICAgIHJldHVybiBPYmplY3Quc2VhbChuZXcgVGFyZ2V0RmlsZSk7XG4gIH1cblxuICBwdWJsaWMgZ2V0IG91dHB1dE5hbWUoKTogc3RyaW5nIHwgdW5kZWZpbmVkIHtcbiAgICByZXR1cm4gdGhpc1tPVVRQVVRfTkFNRV07XG4gIH1cblxuICBwdWJsaWMgc2V0IG91dHB1dE5hbWUodmFsdWU6IHN0cmluZykge1xuICAgIHRoaXNbT1VUUFVUX05BTUVdID0gdmFsdWU7XG4gIH1cblxuICBwdWJsaWMgZ2V0IHByZWZpeCgpOiBzdHJpbmcgfCB1bmRlZmluZWQge1xuICAgIHJldHVybiB0aGlzW1BSRUZJWF07XG4gIH1cblxuICBwdWJsaWMgc2V0IHByZWZpeCh2YWx1ZTogc3RyaW5nKSB7XG4gICAgdGhpc1tQUkVGSVhdID0gdmFsdWU7XG4gIH1cblxuICBwdWJsaWMgZ2V0IHN1ZmZpeCgpOiBzdHJpbmcgfCB1bmRlZmluZWQge1xuICAgIHJldHVybiB0aGlzW1NVRkZJWF07XG4gIH1cblxuICBwdWJsaWMgc2V0IHN1ZmZpeCh2YWx1ZTogc3RyaW5nKSB7XG4gICAgdGhpc1tTVUZGSVhdID0gdmFsdWU7XG4gIH1cblxuICBwdWJsaWMgZ2V0IGZpbGVOYW1lKCk6IHN0cmluZyB8IHVuZGVmaW5lZCB7XG4gICAgaWYgKHRoaXNbUFJFRklYXSA9PT0gdW5kZWZpbmVkIHx8IHRoaXNbT1VUUFVUX05BTUVdID09PSB1bmRlZmluZWQgfHwgdGhpc1tTVUZGSVhdID09PSB1bmRlZmluZWQpXG4gICAgICByZXR1cm4gdW5kZWZpbmVkO1xuICAgIHJldHVybiB0aGlzW1BSRUZJWF0gKyB0aGlzW09VVFBVVF9OQU1FXSArIHRoaXNbU1VGRklYXTtcbiAgfVxuXG4gIHB1YmxpYyBnZXQgZmlsZURpcigpOiBEaXJQYXRoIHwgdW5kZWZpbmVkIHtcbiAgICByZXR1cm4gdGhpc1tGSUxFX0RJUl07XG4gIH1cblxuICBwdWJsaWMgc2V0IGZpbGVEaXIodmFsdWU6IERpclBhdGgpIHtcbiAgICB0aGlzW0ZJTEVfRElSXSA9IHZhbHVlO1xuICB9XG5cbiAgcHVibGljIGdldCBmaWxlKCk6IEFic29sdXRlUGF0aCB8IHVuZGVmaW5lZCB7XG4gICAgY29uc3QgZmlsZURpciA9IHRoaXMuZmlsZURpcjtcbiAgICBpZiAoZmlsZURpciA9PT0gdW5kZWZpbmVkKVxuICAgICAgcmV0dXJuIHVuZGVmaW5lZDtcbiAgICBjb25zdCBmaWxlTmFtZSA9IHRoaXMuZmlsZU5hbWU7XG4gICAgaWYgKGZpbGVOYW1lID09PSB1bmRlZmluZWQpXG4gICAgICByZXR1cm4gdW5kZWZpbmVkO1xuICAgIHJldHVybiBmaWxlRGlyLmpvaW4oZmlsZU5hbWUpO1xuICB9XG5cbiAgcHVibGljIHRvU3RyaW5nKCk6IHN0cmluZyB7XG4gICAgY29uc3QgZmlsZSA9IHRoaXMuZmlsZTtcbiAgICByZXR1cm4gZmlsZSA/IGZpbGUudG9TdHJpbmcoKSA6IFwiXCI7XG4gIH1cblxuICBwdWJsaWMgdG9KU09OKCk6IG9iamVjdCB7XG4gICAgcmV0dXJuIHtcbiAgICAgIG91dHB1dE5hbWU6IHRoaXMub3V0cHV0TmFtZSxcbiAgICAgIHByZWZpeDogdGhpcy5wcmVmaXgsXG4gICAgICBTVUZGSVg6IHRoaXNbU1VGRklYXSxcbiAgICAgIGZpbGVEaXI6IHRoaXMuZmlsZURpcixcbiAgICAgIGZpbGVOYW1lOiB0aGlzLmZpbGVOYW1lLFxuICAgICAgZmlsZTogdGhpcy5maWxlLFxuICAgIH1cbiAgfVxufTtcblxuZXhwb3J0IGludGVyZmFjZSBUYXJnZXRDb21tYW5kIHtcbiAgY29tbWFuZDogc3RyaW5nIHwgTGl2ZVN0cmluZztcbiAgYXJnczogQXJyYXk8c3RyaW5nIHwgTGl2ZVN0cmluZz47XG59O1xuXG5mdW5jdGlvbiBtYWtlVGFyZ2V0Q29tbWFuZChfY29tbWFuZDogYW55LCBfYXJnczogYW55W10pOiBUYXJnZXRDb21tYW5kIHtcbiAgbGV0IGNvbW1hbmQ6IHN0cmluZyB8IExpdmVTdHJpbmc7XG4gIGlmICh0eXBlb2YgX2NvbW1hbmQgPT09IFwic3RyaW5nXCIpXG4gICAgY29tbWFuZCA9IF9jb21tYW5kO1xuICBlbHNlIGlmIChfY29tbWFuZCBpbnN0YW5jZW9mIExpdmVTdHJpbmcpXG4gICAgY29tbWFuZCA9IF9jb21tYW5kO1xuICBlbHNlIGlmIChfY29tbWFuZCBpbnN0YW5jZW9mIEZpbGVQYXRoKVxuICAgIGNvbW1hbmQgPSBfY29tbWFuZC50b1N0cmluZygpO1xuICBlbHNlXG4gICAgdGhyb3cgbmV3IFR5cGVFcnJvcihgV3JvbmcgdHlwZSAke19jb21tYW5kfSBmb3IgY29tbWFuZGApO1xuXG4gIGNvbnN0IGFyZ3MgPSBuZXcgQXJyYXk8c3RyaW5nIHwgTGl2ZVN0cmluZz47XG4gIGZvciAoY29uc3QgaXRlciBvZiBfYXJncykge1xuICAgIGlmICh0eXBlb2YgaXRlciA9PT0gXCJzdHJpbmdcIilcbiAgICAgIGFyZ3MucHVzaChpdGVyKTtcbiAgICBlbHNlIGlmIChpdGVyIGluc3RhbmNlb2YgTGl2ZVN0cmluZylcbiAgICAgIGFyZ3MucHVzaChpdGVyKTtcbiAgICBlbHNlIGlmIChpdGVyIGluc3RhbmNlb2YgRmlsZVBhdGgpXG4gICAgICBhcmdzLnB1c2goaXRlci50b1N0cmluZygpKTtcbiAgICBlbHNlIGlmIChpdGVyIGluc3RhbmNlb2YgRGlyUGF0aClcbiAgICAgIGFyZ3MucHVzaChpdGVyLnRvU3RyaW5nKCkpO1xuICAgIGVsc2VcbiAgICAgIHRocm93IG5ldyBUeXBlRXJyb3IoYFdyb25nIHR5cGUgJHtpdGVyfSBmb3IgYXJndW1lbnRgKTtcbiAgfVxuXG4gIHJldHVybiB7IGNvbW1hbmQsIGFyZ3MgfTtcbn1cblxuY29uc3QgTkFNRSAgICAgICAgPSBTeW1ib2woXCJOQU1FXCIpO1xuY29uc3QgVFlQRSAgICAgICAgPSBTeW1ib2woXCJUWVBFXCIpO1xuY29uc3QgVEFSR0VUX0ZJTEUgPSBTeW1ib2woXCJUQVJHRVRfRklMRVwiKTtcbmNvbnN0IFBSRV9CVUlMRCAgID0gU3ltYm9sKFwiUFJFX0JVSUxEXCIpO1xuY29uc3QgUE9TVF9CVUlMRCAgPSBTeW1ib2woXCJQT1NUX0JVSUxEXCIpO1xuXG5leHBvcnQgY2xhc3MgVGFyZ2V0U3RydWN0IHtcbiAgcHJpdmF0ZSBbTkFNRV06IHN0cmluZztcbiAgcHJpdmF0ZSBbVFlQRV06IFRhcmdldFR5cGU7XG4gIHByaXZhdGUgW1RBUkdFVF9GSUxFXTogVGFyZ2V0RmlsZTtcbiAgcHJpdmF0ZSBbUFJFX0JVSUxEXSA9IG5ldyBBcnJheTxUYXJnZXRDb21tYW5kPjtcbiAgcHJpdmF0ZSBbUE9TVF9CVUlMRF0gPSBuZXcgQXJyYXk8VGFyZ2V0Q29tbWFuZD47XG5cbiAgY29uc3RydWN0b3IobmFtZTogc3RyaW5nKSB7XG4gICAgdGhpc1tOQU1FXSA9IG5hbWU7XG4gICAgdGhpc1tUWVBFXSA9IFRhcmdldFR5cGUuVW5rbm93bjtcbiAgICB0aGlzW1RBUkdFVF9GSUxFXSA9IFRhcmdldEZpbGUuY3JlYXRlKCk7XG4gIH1cblxuICBnZXQgbmFtZSgpIHtcbiAgICByZXR1cm4gdGhpc1tOQU1FXTtcbiAgfVxuXG4gIGdldCB0eXBlKCkge1xuICAgIHJldHVybiB0aGlzW1RZUEVdO1xuICB9XG5cbiAgc2V0IHR5cGUodmFsdWU6IFRhcmdldFR5cGUpIHtcbiAgICBpZiAodGhpc1tUWVBFXSA9PT0gdmFsdWUpXG4gICAgICByZXR1cm47XG4gICAgaWYgKHRoaXNbVFlQRV0gIT09IFRhcmdldFR5cGUuVW5rbm93bilcbiAgICAgIHRocm93IG5ldyBFcnJvcihgJHt0aGlzW1RZUEVdfSBcIiR7dGhpc1tOQU1FXX1cIiB0YXJnZXQgY2Fubm90IGJlIGNoYW5nZSB0byAke3ZhbHVlfWApO1xuICAgIHRoaXNbVFlQRV0gPSB2YWx1ZTtcbiAgfVxuXG4gIGdldCB0YXJnZXRGaWxlKCkge1xuICAgIHJldHVybiB0aGlzW1RBUkdFVF9GSUxFXTtcbiAgfVxuXG4gIHB1YmxpYyBhZGRQcmVCdWlsZChjb21tYW5kOiBhbnksIGFyZ3M6IGFueVtdKSB7XG4gICAgdGhpc1tQUkVfQlVJTERdLnB1c2gobWFrZVRhcmdldENvbW1hbmQoY29tbWFuZCwgYXJncykpO1xuICB9XG5cbiAgcHVibGljIGFkZFBvc3RCdWlsZChjb21tYW5kOiBhbnksIGFyZ3M6IGFueVtdKSB7XG4gICAgdGhpc1tQT1NUX0JVSUxEXS5wdXNoKG1ha2VUYXJnZXRDb21tYW5kKGNvbW1hbmQsIGFyZ3MpKTtcbiAgfVxuXG4gIGdldCBwcmVCdWlsZExpc3QoKSB7XG4gICAgcmV0dXJuIHRoaXNbUFJFX0JVSUxEXTtcbiAgfVxuXG4gIGdldCBwb3N0QnVpbGRMaXN0KCkge1xuICAgIHJldHVybiB0aGlzW1BPU1RfQlVJTERdO1xuICB9XG5cbiAgcHVibGljIHRvSlNPTigpOiBvYmplY3Qge1xuICAgIHJldHVybiB7XG4gICAgICBuYW1lOiB0aGlzLm5hbWUsXG4gICAgICB0YXJnZXRGaWxlOiB0aGlzLnRhcmdldEZpbGUsXG4gICAgICBwcmVCdWlsZExpc3Q6IHRoaXMucHJlQnVpbGRMaXN0LFxuICAgICAgcG9zdEJ1aWxkTGlzdDogdGhpcy5wb3N0QnVpbGRMaXN0LFxuICAgIH1cbiAgfVxufTtcbiIsIi8qXG4gKiBNSVQgTGljZW5zZVxuICpcbiAqIENvcHlyaWdodCAoYykgMjAyNSAgWXVyaWkgWWFrdWJpbiAoeXVyaWkueWFrdWJpbkBnbWFpbC5jb20pXG4gKlxuICogUGVybWlzc2lvbiBpcyBncmFudGVkIHRvIHVzZSwgY29weSwgbW9kaWZ5LCBhbmQgZGlzdHJpYnV0ZSB0aGlzIHNvZnR3YXJlXG4gKiB1bmRlciB0aGUgTUlUIExpY2Vuc2UuIFNlZSBMSUNFTlNFIGZpbGUgZm9yIGRldGFpbHMuXG4gKi9cblxuaW1wb3J0IHsgR2xvYmFsQ29udGV4dCB9IGZyb20gXCJAL2NvcmUvR2xvYmFsQ29udGV4dFwiO1xuaW1wb3J0IHsgU3lzdGVtU2NvcGUgfSBmcm9tIFwiQC9jb3JlL1N5c3RlbVNjb3BlXCI7XG5pbXBvcnQgeyBmaW5kUHJvZ3JhbVN5bmMgfSBmcm9tIFwiQC9jb3JlL0ZpbmRQcm9ncmFtXCI7XG5cbmNvbnN0IEdMT0JBTCA9IFN5bWJvbChcIkdMT0JBTFwiKTtcbmNvbnN0IFNDT1BFID0gU3ltYm9sKFwiU0NPUEVcIik7XG5cbmV4cG9ydCBuYW1lc3BhY2UgVG9vbGNoYWluQ29udGV4dCB7XG5cbmludGVyZmFjZSBJVG9vbGNoYWluQ29udGV4dCBleHRlbmRzIFN5c3RlbVNjb3BlIHtcbiAgZmluZFByb2dyYW0obmFtZTogc3RyaW5nKTogc3RyaW5nIHwgdW5kZWZpbmVkO1xufTtcblxuZXhwb3J0IGZ1bmN0aW9uIGNyZWF0ZShzY29wZTogU3lzdGVtU2NvcGUsIGdsb2JhbDogR2xvYmFsQ29udGV4dCk6IElUb29sY2hhaW5Db250ZXh0IHtcbiAgY29uc3QgbWsgPSBPYmplY3QuY3JlYXRlKHNjb3BlLCB7XG4gICAgZmluZFByb2dyYW06IHtcbiAgICAgIHZhbHVlOiBmaW5kUHJvZ3JhbVN5bmMsXG4gICAgICBlbnVtZXJhYmxlOiBmYWxzZSxcbiAgICAgIHdyaXRhYmxlOiBmYWxzZSxcbiAgICAgIGNvbmZpZ3VyYWJsZTogZmFsc2UsXG4gICAgfSxcbiAgfSk7XG5cbiAgbWtbU0NPUEVdID0gc2NvcGU7XG4gIG1rW0dMT0JBTF0gPSBnbG9iYWw7XG5cbiAgcmV0dXJuIG1rO1xufVxuXG59IC8vIG5hbWVzcGFjZSBUb29sY2hhaW5Db250ZXh0XG4iLCIvKlxuICogTUlUIExpY2Vuc2VcbiAqXG4gKiBDb3B5cmlnaHQgKGMpIDIwMjUgIFl1cmlpIFlha3ViaW4gKHl1cmlpLnlha3ViaW5AZ21haWwuY29tKVxuICpcbiAqIFBlcm1pc3Npb24gaXMgZ3JhbnRlZCB0byB1c2UsIGNvcHksIG1vZGlmeSwgYW5kIGRpc3RyaWJ1dGUgdGhpcyBzb2Z0d2FyZVxuICogdW5kZXIgdGhlIE1JVCBMaWNlbnNlLiBTZWUgTElDRU5TRSBmaWxlIGZvciBkZXRhaWxzLlxuICovXG5cbmV4cG9ydCBjb25zdCBERUJVR19CVUlMRF9UWVBFID0gXCJEZWJ1Z1wiO1xuZXhwb3J0IGNvbnN0IFJFTEVBU0VfQlVJTERfVFlQRSA9IFwiUmVsZWFzZVwiO1xuIiwiLypcbiAqIE1JVCBMaWNlbnNlXG4gKlxuICogQ29weXJpZ2h0IChjKSAyMDI1ICBZdXJpaSBZYWt1YmluICh5dXJpaS55YWt1YmluQGdtYWlsLmNvbSlcbiAqXG4gKiBQZXJtaXNzaW9uIGlzIGdyYW50ZWQgdG8gdXNlLCBjb3B5LCBtb2RpZnksIGFuZCBkaXN0cmlidXRlIHRoaXMgc29mdHdhcmVcbiAqIHVuZGVyIHRoZSBNSVQgTGljZW5zZS4gU2VlIExJQ0VOU0UgZmlsZSBmb3IgZGV0YWlscy5cbiAqL1xuXG5pbXBvcnQgeyBUYXJnZXRTdHJ1Y3QgfSBmcm9tIFwiQC9jb3JlL1RhcmdldFN0cnVjdFwiO1xuXG5jb25zdCBJTVBMID0gU3ltYm9sKFwiTkFNRVwiKTtcbmNvbnN0IElOQ0xVREVTID0gU3ltYm9sKFwiSU5DTFVERVNcIik7XG5jb25zdCBTT1VSQ0VTID0gU3ltYm9sKFwiU09VUkNFU1wiKTtcbmNvbnN0IERFRklORVMgPSBTeW1ib2woXCJERUZJTkVTXCIpO1xuY29uc3QgQ09NUElMRV9PUFRJT05TID0gU3ltYm9sKFwiQ09NUElMRV9PUFRJT05TXCIpO1xuY29uc3QgTElOS19PUFRJT05TID0gU3ltYm9sKFwiTElOS19PUFRJT05TXCIpO1xuXG5leHBvcnQgY2xhc3MgVW5rbm93blRhcmdldCB7XG4gIHByaXZhdGUgW0lNUExdOiBUYXJnZXRTdHJ1Y3Q7XG4gIHByaXZhdGUgW0lOQ0xVREVTXTogYW55W107XG4gIHByaXZhdGUgW1NPVVJDRVNdOiBhbnlbXTtcbiAgcHJpdmF0ZSBbREVGSU5FU106IGFueVtdO1xuICBwcml2YXRlIFtDT01QSUxFX09QVElPTlNdOiBhbnlbXTtcbiAgcHJpdmF0ZSBbTElOS19PUFRJT05TXTogYW55W107XG5cbiAgcHJpdmF0ZSBjb25zdHJ1Y3RvcihpbXBsOiBUYXJnZXRTdHJ1Y3QpIHtcbiAgICB0aGlzW0lNUExdID0gaW1wbDtcbiAgICB0aGlzW0lOQ0xVREVTXSA9IFtdO1xuICAgIHRoaXNbU09VUkNFU10gPSBbXTtcbiAgICB0aGlzW0RFRklORVNdID0gW107XG4gICAgdGhpc1tDT01QSUxFX09QVElPTlNdID0gW107XG4gICAgdGhpc1tMSU5LX09QVElPTlNdID0gW107XG4gIH1cblxuICBwdWJsaWMgc3RhdGljIGNyZWF0ZShpbXBsOiBUYXJnZXRTdHJ1Y3QpIHtcbiAgICByZXR1cm4gT2JqZWN0LnNlYWwobmV3IFVua25vd25UYXJnZXQoaW1wbCkpO1xuICB9XG5cbiAgcHVibGljIHN0YXRpYyBlbnN1cmVJbnN0YW5jZSh2YWx1ZTogYW55KSB7XG4gICAgaWYgKHZhbHVlIGluc3RhbmNlb2YgVW5rbm93blRhcmdldClcbiAgICAgIHJldHVybiB2YWx1ZTtcbiAgICB0aHJvdyBuZXcgVHlwZUVycm9yKGBUaGUgXCIke3ZhbHVlfVwiIGlzIG5vdCBhIFVua25vd25UYXJnZXRgKTtcbiAgfVxuXG4gIHB1YmxpYyBnZXQgTkFNRSAoKSB7XG4gICAgcmV0dXJuIHRoaXNbSU1QTF0ubmFtZTtcbiAgfVxuXG4gIHB1YmxpYyBnZXQgSU5DTFVERVMgKCkge1xuICAgIHJldHVybiB0aGlzW0lOQ0xVREVTXTtcbiAgfVxuXG4gIHB1YmxpYyBnZXQgU09VUkNFUyAoKSB7XG4gICAgcmV0dXJuIHRoaXNbU09VUkNFU107XG4gIH1cblxuICBwdWJsaWMgZ2V0IERFRklORVMgKCkge1xuICAgIHJldHVybiB0aGlzW0RFRklORVNdO1xuICB9XG5cbiAgcHVibGljIGdldCBDT01QSUxFX09QVElPTlMgKCkge1xuICAgIHJldHVybiB0aGlzW0NPTVBJTEVfT1BUSU9OU107XG4gIH1cblxuICBwdWJsaWMgZ2V0IExJTktfT1BUSU9OUyAoKSB7XG4gICAgcmV0dXJuIHRoaXNbTElOS19PUFRJT05TXTtcbiAgfVxuXG4gIHB1YmxpYyB0b0pTT04oKTogb2JqZWN0IHtcbiAgICByZXR1cm4ge1xuICAgICAgTkFNRTogdGhpcy5OQU1FLFxuICAgICAgSU5DTFVERVM6IHRoaXMuSU5DTFVERVMsXG4gICAgICBTT1VSQ0VTOiB0aGlzLlNPVVJDRVMsXG4gICAgICBERUZJTkVTOiB0aGlzLkRFRklORVMsXG4gICAgICBDT01QSUxFX09QVElPTlM6IHRoaXMuQ09NUElMRV9PUFRJT05TLFxuICAgICAgTElOS19PUFRJT05TOiB0aGlzLkxJTktfT1BUSU9OUyxcbiAgICB9O1xuICB9XG5cbiAgcHVibGljIHRvU3RyaW5nKCk6IHN0cmluZyB7XG4gICAgcmV0dXJuIFwiJHtcIiArIHRoaXNbSU1QTF0ubmFtZSArIFwifVwiO1xuICB9XG59O1xuIiwiLypcbiAqIE1JVCBMaWNlbnNlXG4gKlxuICogQ29weXJpZ2h0IChjKSAyMDI1ICBZdXJpaSBZYWt1YmluICh5dXJpaS55YWt1YmluQGdtYWlsLmNvbSlcbiAqXG4gKiBQZXJtaXNzaW9uIGlzIGdyYW50ZWQgdG8gdXNlLCBjb3B5LCBtb2RpZnksIGFuZCBkaXN0cmlidXRlIHRoaXMgc29mdHdhcmVcbiAqIHVuZGVyIHRoZSBNSVQgTGljZW5zZS4gU2VlIExJQ0VOU0UgZmlsZSBmb3IgZGV0YWlscy5cbiAqL1xuXG5pbXBvcnQgcGF0aCBmcm9tIFwibm9kZTpwYXRoXCI7XG5cbmV4cG9ydCBmdW5jdGlvbiBmaWxlbmFtZVRvUHJhZ21hT25jZU1hY3JvKGZpbGVwYXRoOiBzdHJpbmcsIGRlZXA6IG51bWJlcikge1xuICBpZiAodHlwZW9mIGRlZXAgPT09ICd1bmRlZmluZWQnKVxuICAgIGRlZXAgPSAzO1xuXG4gIGxldCBjb21wb25lbnRzID0gcGF0aC5ub3JtYWxpemUoZmlsZXBhdGgpLnNwbGl0KHBhdGguc2VwKTtcbiAgaWYgKGNvbXBvbmVudHMubGVuZ3RoID4gZGVlcClcbiAgICBjb21wb25lbnRzID0gY29tcG9uZW50cy5zbGljZShjb21wb25lbnRzLmxlbmd0aCAtIGRlZXApO1xuXG4gIHJldHVybiBcIl9cIiArIGNvbXBvbmVudHMuam9pbignXycpLnJlcGxhY2UoL1stIC46JX5dL2csICdfJykudG9VcHBlckNhc2UoKTtcbn1cblxuZXhwb3J0IGZ1bmN0aW9uIGxpbmVUb1NpbmdsQ29tbWVudChsaW5lOiBzdHJpbmcpIHtcbiAgcmV0dXJuIFwiLy9cIiArIGxpbmU7XG59XG5cbmV4cG9ydCBmdW5jdGlvbiBsaW5lVG9NdWx0aXBsZUNvbW1lbnQobGluZTogc3RyaW5nKSB7XG4gIHJldHVybiBgLyogJHtsaW5lfSAqL2A7XG59XG5cbmV4cG9ydCBmdW5jdGlvbiBnZW5lcmF0ZWRTY3JpcHROYW1lQ29tbWVudChmaWxlbmFtZTogc3RyaW5nKSB7XG4gIHJldHVybiBsaW5lVG9NdWx0aXBsZUNvbW1lbnQoXCJHZW5lcmF0ZWQgZnJvbSBcIiArIHBhdGguYmFzZW5hbWUoZmlsZW5hbWUpKTtcbn1cbiIsIi8qXG4gKiBNSVQgTGljZW5zZVxuICpcbiAqIENvcHlyaWdodCAoYykgMjAyNSAgWXVyaWkgWWFrdWJpbiAoeXVyaWkueWFrdWJpbkBnbWFpbC5jb20pXG4gKlxuICogUGVybWlzc2lvbiBpcyBncmFudGVkIHRvIHVzZSwgY29weSwgbW9kaWZ5LCBhbmQgZGlzdHJpYnV0ZSB0aGlzIHNvZnR3YXJlXG4gKiB1bmRlciB0aGUgTUlUIExpY2Vuc2UuIFNlZSBMSUNFTlNFIGZpbGUgZm9yIGRldGFpbHMuXG4gKi9cblxuZXhwb3J0IGludGVyZmFjZSBJTG9nZ2VyIHtcbiAgdHJhY2UobWVzc2FnZT86IGFueSwgLi4ucGFyYW1zOiBhbnlbXSk6IHZvaWQ7XG4gIGRlYnVnKG1lc3NhZ2U/OiBhbnksIC4uLnBhcmFtczogYW55W10pOiB2b2lkO1xuICBpbmZvKG1lc3NhZ2U/OiBhbnksIC4uLnBhcmFtczogYW55W10pOiB2b2lkO1xuICB3YXJuKG1lc3NhZ2U/OiBhbnksIC4uLnBhcmFtczogYW55W10pOiB2b2lkO1xuICBlcnJvcihtZXNzYWdlPzogYW55LCAuLi5wYXJhbXM6IGFueVtdKTogdm9pZDtcbn07XG5cbmV4cG9ydCBmdW5jdGlvbiBjcmVhdGVMb2dnZXIodXJsOiBzdHJpbmcpOiBJTG9nZ2VyIHtcbiAgcmV0dXJuIHtcbiAgICB0cmFjZTogY29uc29sZS50cmFjZS5iaW5kKGNvbnNvbGUpLFxuICAgIGRlYnVnOiBjb25zb2xlLmRlYnVnLmJpbmQoY29uc29sZSksXG4gICAgaW5mbzogY29uc29sZS5pbmZvLmJpbmQoY29uc29sZSksXG4gICAgd2FybjogY29uc29sZS53YXJuLmJpbmQoY29uc29sZSksXG4gICAgZXJyb3I6IGNvbnNvbGUuZXJyb3IuYmluZChjb25zb2xlKSxcbiAgfTtcbn1cbiIsIi8qXG4gKiBNSVQgTGljZW5zZVxuICpcbiAqIENvcHlyaWdodCAoYykgMjAyNSAgWXVyaWkgWWFrdWJpbiAoeXVyaWkueWFrdWJpbkBnbWFpbC5jb20pXG4gKlxuICogUGVybWlzc2lvbiBpcyBncmFudGVkIHRvIHVzZSwgY29weSwgbW9kaWZ5LCBhbmQgZGlzdHJpYnV0ZSB0aGlzIHNvZnR3YXJlXG4gKiB1bmRlciB0aGUgTUlUIExpY2Vuc2UuIFNlZSBMSUNFTlNFIGZpbGUgZm9yIGRldGFpbHMuXG4gKi9cblxuaW1wb3J0IHBhdGggZnJvbSBcIm5vZGU6cGF0aFwiO1xuaW1wb3J0IGZzIGZyb20gXCJub2RlOmZzXCI7XG5pbXBvcnQgeyBzcGF3biB9IGZyb20gXCJub2RlOmNoaWxkX3Byb2Nlc3NcIjtcblxudHlwZSBSZXN1bHQgPSB7XG4gIHN0YXR1czogbnVtYmVyO1xufTtcblxuZXhwb3J0IGZ1bmN0aW9uIHNwYXduQXN5bmMoY29tbWFuZDogc3RyaW5nLCBhcmdzOiBzdHJpbmdbXSwgb3B0aW9ucz86IGFueSk6IFByb21pc2U8UmVzdWx0PiB7XG4gIGxldCBmZCA9IG51bGw7XG4gIGxldCB2ZXJib3NlID0gZmFsc2U7XG4gIGlmIChvcHRpb25zICYmIG9wdGlvbnMuZXh0cmEpIHtcbiAgICBpZiAob3B0aW9ucy5leHRyYS52ZXJib3NlKVxuICAgICAgdmVyYm9zZSA9IHRydWU7XG4gICAgaWYgKG9wdGlvbnMuZXh0cmEub3V0cHV0KSB7XG4gICAgICBsZXQgbG9nZmlsZSA9IG9wdGlvbnMuZXh0cmEub3V0cHV0O1xuICAgICAgaWYgKCFwYXRoLmlzQWJzb2x1dGUobG9nZmlsZSkgJiYgb3B0aW9ucy5jd2QpIHtcbiAgICAgICAgbG9nZmlsZSA9IHBhdGgucmVzb2x2ZShvcHRpb25zLmN3ZCwgbG9nZmlsZSk7XG4gICAgICB9XG4gICAgICBmZCA9IGZzLm9wZW5TeW5jKGxvZ2ZpbGUsIFwidytcIiwgMG82NjYpO1xuICAgIH1cbiAgfVxuICByZXR1cm4gbmV3IFByb21pc2UoKHJlc29sdmUsIHJlamVjdCkgPT4ge1xuICAgIGlmIChmZCB8fCB2ZXJib3NlKSB7XG4gICAgICB2ZXJib3NlICYmIGNvbnNvbGUuaW5mbyhbIHBhdGguYmFzZW5hbWUoY29tbWFuZCksIC4uLmFyZ3MgXS5qb2luKFwiIFwiKSk7XG4gICAgICBmZCAmJiBmcy53cml0ZVN5bmMoZmQsIEpTT04uc3RyaW5naWZ5KHtjb21tYW5kLCBhcmdzLCBvcHRpb25zIH0sIG51bGwsIDIpICsgXCJcXG5cIik7XG4gICAgfVxuICAgIGNvbnN0IGV4ZWMgPSBzcGF3bihjb21tYW5kLCBhcmdzLCBvcHRpb25zKTtcbiAgICBleGVjLnN0ZG91dC5vbihcImRhdGFcIiwgKGRhdGEpID0+IHtcbiAgICAgIHByb2Nlc3Muc3Rkb3V0LndyaXRlKGRhdGEpO1xuICAgICAgZmQgJiYgZnMud3JpdGVTeW5jKGZkLCBkYXRhKTtcbiAgICB9KTtcbiAgICBleGVjLnN0ZGVyci5vbihcImRhdGFcIiwgKGRhdGEpID0+IHtcbiAgICAgIHByb2Nlc3Muc3RkZXJyLndyaXRlKGRhdGEpO1xuICAgICAgZmQgJiYgZnMud3JpdGVTeW5jKGZkLCBkYXRhKTtcbiAgICB9KTtcbiAgICBleGVjLm9uKFwiY2xvc2VcIiwgKHN0YXR1czogbnVtYmVyKSA9PiB7XG4gICAgICBmZCAmJiBmcy5jbG9zZVN5bmMoZmQpO1xuICAgICAgcmVzb2x2ZSh7c3RhdHVzfSk7XG4gICAgfSk7XG4gIH0pO1xufVxuIiwiLypcbiAqIE1JVCBMaWNlbnNlXG4gKlxuICogQ29weXJpZ2h0IChjKSAyMDI1ICBZdXJpaSBZYWt1YmluICh5dXJpaS55YWt1YmluQGdtYWlsLmNvbSlcbiAqXG4gKiBQZXJtaXNzaW9uIGlzIGdyYW50ZWQgdG8gdXNlLCBjb3B5LCBtb2RpZnksIGFuZCBkaXN0cmlidXRlIHRoaXMgc29mdHdhcmVcbiAqIHVuZGVyIHRoZSBNSVQgTGljZW5zZS4gU2VlIExJQ0VOU0UgZmlsZSBmb3IgZGV0YWlscy5cbiAqL1xuXG5pbXBvcnQgZnMgZnJvbSBcIm5vZGU6ZnNcIjtcbmltcG9ydCBwYXRoIGZyb20gXCJub2RlOnBhdGhcIjtcbmltcG9ydCB1cmwgZnJvbSBcIm5vZGU6dXJsXCI7XG5cbmV4cG9ydCBhc3luYyBmdW5jdGlvbiBwYXRoRXhpc3RzKHBhdGg6IHN0cmluZykge1xuICB0cnkge1xuICAgIHJldHVybiAhIShhd2FpdCBmcy5wcm9taXNlcy5zdGF0KHBhdGgpKTtcbiAgfSBjYXRjaCB7XG4gICAgcmV0dXJuIGZhbHNlO1xuICB9XG59XG5cbmV4cG9ydCBmdW5jdGlvbiBwYXRoRXhpc3RzU3luYyhwYXRoOiBzdHJpbmcpIHtcbiAgdHJ5IHtcbiAgICByZXR1cm4gISFmcy5zdGF0U3luYyhwYXRoKTtcbiAgfSBjYXRjaCB7XG4gICAgcmV0dXJuIGZhbHNlO1xuICB9XG59XG5cbmV4cG9ydCBhc3luYyBmdW5jdGlvbiBmaWxlRXhpc3RzKHBhdGg6IHN0cmluZykge1xuICB0cnkge1xuICAgIHJldHVybiAoYXdhaXQgZnMucHJvbWlzZXMuc3RhdChwYXRoKSkuaXNGaWxlKCk7XG4gIH0gY2F0Y2gge1xuICAgIHJldHVybiBmYWxzZTtcbiAgfVxufVxuXG5leHBvcnQgZnVuY3Rpb24gZmlsZUV4aXN0c1N5bmMocGF0aDogc3RyaW5nKSB7XG4gIHRyeSB7XG4gICAgcmV0dXJuIGZzLnN0YXRTeW5jKHBhdGgpLmlzRmlsZSgpO1xuICB9IGNhdGNoIHtcbiAgICByZXR1cm4gZmFsc2U7XG4gIH0gXG59XG5cbmV4cG9ydCBhc3luYyBmdW5jdGlvbiBkaXJlY3RvcnlFeGlzdHMocGF0aDogc3RyaW5nKSB7XG4gIHRyeSB7XG4gICAgcmV0dXJuIChhd2FpdCBmcy5wcm9taXNlcy5zdGF0KHBhdGgpKS5pc0RpcmVjdG9yeSgpO1xuICB9IGNhdGNoIHtcbiAgICByZXR1cm4gZmFsc2U7XG4gIH1cbn1cblxuZXhwb3J0IGZ1bmN0aW9uIGRpcmVjdG9yeUV4aXN0c1N5bmMocGF0aDogc3RyaW5nKSB7XG4gIHRyeSB7XG4gICByZXR1cm4gZnMuc3RhdFN5bmMocGF0aCkuaXNEaXJlY3RvcnkoKTtcbiAgfSBjYXRjaCB7XG4gICAgcmV0dXJuIGZhbHNlO1xuICB9XG59XG5cbmV4cG9ydCBmdW5jdGlvbiBleHRuYW1lKGZ1bGxwYXRoOiBzdHJpbmcsIG9wdGlvbnM6IGFueSkge1xuICBpZiAob3B0aW9ucz8ubG9uZ2VzdCkge1xuICAgIGNvbnN0IGZpbGVuYW1lID0gcGF0aC5iYXNlbmFtZShmdWxscGF0aCk7XG4gICAgY29uc3QgaW5kZXggPSBmaWxlbmFtZS5pbmRleE9mKCcuJyk7XG4gICAgcmV0dXJuIGluZGV4ICE9IC0xID8gZmlsZW5hbWUuc3Vic3RyaW5nKGluZGV4KSA6ICcnO1xuICB9XG5cbiAgcmV0dXJuIHBhdGguZXh0bmFtZShmdWxscGF0aCk7XG59XG5cbmV4cG9ydCBhc3luYyBmdW5jdGlvbiBmaWxlTGlzdChkaXJuYW1lOiBzdHJpbmcsIG9wdGlvbnM6IGFueSk6IFByb21pc2U8QXJyYXk8c3RyaW5nPj4ge1xuICBjb25zdCBsaXN0ID0gbmV3IEFycmF5PHN0cmluZz47XG4gIGlmIChhd2FpdCBkaXJlY3RvcnlFeGlzdHMoZGlybmFtZSkpIHtcbiAgICBmb3IgKGNvbnN0IGl0ZXIgb2YgYXdhaXQgZnMucHJvbWlzZXMucmVhZGRpcihkaXJuYW1lKSkge1xuICAgICAgY29uc3QgZmlsZXBhdGggPSBwYXRoLnJlc29sdmUoZGlybmFtZSwgaXRlcik7XG4gICAgICBjb25zdCBzdGF0ID0gYXdhaXQgZnMucHJvbWlzZXMuc3RhdChmaWxlcGF0aCk7XG4gICAgICBpZiAoc3RhdC5pc0ZpbGUoKSkge1xuICAgICAgICBsaXN0LnB1c2gob3B0aW9ucy5yZWxhdGl2ZSA/IHBhdGgucmVsYXRpdmUob3B0aW9ucy5yZWxhdGl2ZSwgZmlsZXBhdGgpIDogZmlsZXBhdGgpO1xuICAgICAgfVxuICAgICAgZWxzZSBpZiAob3B0aW9ucy5yZWN1cnNpdmUgJiYgc3RhdC5pc0RpcmVjdG9yeSgpKSB7XG4gICAgICAgIGZvciAoY29uc3QgZm5hbWUgb2YgYXdhaXQgZmlsZUxpc3QoZmlsZXBhdGgsIG9wdGlvbnMpKVxuICAgICAgICAgIGxpc3QucHVzaChmbmFtZSk7XG4gICAgICB9XG4gICAgfVxuICB9XG4gIHJldHVybiBsaXN0O1xufVxuXG5leHBvcnQgYXN5bmMgZnVuY3Rpb24gc2F2ZUlmRGlmZmVyZW50KGZpbGVuYW1lOiBzdHJpbmcsIGNvbnRlbnQ6IHN0cmluZykge1xuICBpZiAoYXdhaXQgZmlsZUV4aXN0cyhmaWxlbmFtZSkpIHtcbiAgICBjb25zdCBvbGRDb250ZW50ID0gYXdhaXQgZnMucHJvbWlzZXMucmVhZEZpbGUoZmlsZW5hbWUsIHsgZW5jb2Rpbmc6IFwidXRmOFwiIH0pO1xuICAgIGlmIChjb250ZW50ID09IG9sZENvbnRlbnQpXG4gICAgICByZXR1cm4gZmFsc2U7XG4gIH1cblxuICBhd2FpdCBmcy5wcm9taXNlcy5ta2RpcihwYXRoLmRpcm5hbWUoZmlsZW5hbWUpLCB7IHJlY3Vyc2l2ZTogdHJ1ZSB9KTtcbiAgYXdhaXQgZnMucHJvbWlzZXMud3JpdGVGaWxlKGZpbGVuYW1lLCBjb250ZW50LCB7IGVuY29kaW5nOiBcInV0ZjhcIiB9KTtcblxuICByZXR1cm4gdHJ1ZTtcbn1cblxuZXhwb3J0IGZ1bmN0aW9uIGdldFBhdGhTdHJpbmcoc3RyOiBzdHJpbmcpIHtcbiAgcmV0dXJuIHN0ci5zdGFydHNXaXRoKFwiZmlsZTovL1wiKSA/IHVybC5maWxlVVJMVG9QYXRoKHN0cikgOiBzdHI7XG59XG4iLCIvKlxuICogTUlUIExpY2Vuc2VcbiAqXG4gKiBDb3B5cmlnaHQgKGMpIDIwMjUgIFl1cmlpIFlha3ViaW4gKHl1cmlpLnlha3ViaW5AZ21haWwuY29tKVxuICpcbiAqIFBlcm1pc3Npb24gaXMgZ3JhbnRlZCB0byB1c2UsIGNvcHksIG1vZGlmeSwgYW5kIGRpc3RyaWJ1dGUgdGhpcyBzb2Z0d2FyZVxuICogdW5kZXIgdGhlIE1JVCBMaWNlbnNlLiBTZWUgTElDRU5TRSBmaWxlIGZvciBkZXRhaWxzLlxuICovXG5cbmltcG9ydCBwYXRoIGZyb20gXCJub2RlOnBhdGhcIjtcbmltcG9ydCBmcyBmcm9tIFwibm9kZTpmc1wiO1xuaW1wb3J0IGh0dHAgZnJvbSBcImh0dHBcIjtcbmltcG9ydCBodHRwcyBmcm9tIFwiaHR0cHNcIjtcblxuaW1wb3J0IHsgY3JlYXRlTG9nZ2VyIH0gZnJvbSBcIkAvbG9nZ2VyXCI7XG5cbmNvbnN0IGxvZ2dlciA9IGNyZWF0ZUxvZ2dlcihpbXBvcnQubWV0YS51cmwpO1xuXG5pbnRlcmZhY2UgSVJlc29sdmVCdWlsZGVyIHtcbiAgYXBwZW5kKGRhdGE6IEJ1ZmZlcik6IHZvaWQ7XG4gIHRvUmVzdWx0KCk6IEJ1ZmZlciB8IHVuZGVmaW5lZDtcbn07XG5cbmNsYXNzIEJ1ZmZlckJ1aWxkZXIgaW1wbGVtZW50cyBJUmVzb2x2ZUJ1aWxkZXIge1xuICBwcml2YXRlIF9jaHVua3M6IEFycmF5PEJ1ZmZlcj4gPSBbXTtcblxuICBwdWJsaWMgYXBwZW5kKGNodW5rOiBCdWZmZXIpOiB2b2lkIHtcbiAgICB0aGlzLl9jaHVua3MucHVzaChjaHVuayk7XG4gIH1cblxuICBwdWJsaWMgdG9SZXN1bHQoKTogQnVmZmVyIHtcbiAgICByZXR1cm4gQnVmZmVyLmNvbmNhdCh0aGlzLl9jaHVua3MpO1xuICB9XG59O1xuXG5jbGFzcyBGaWxlU3luY1dyaXRlciBpbXBsZW1lbnRzIElSZXNvbHZlQnVpbGRlciB7XG4gIHByaXZhdGUgX2ZkOiBudW1iZXI7XG5cbiAgcHVibGljIGNvbnN0cnVjdG9yKGZpbGU6IHN0cmluZykge1xuICAgIHRoaXMuX2ZkID0gZnMub3BlblN5bmMoZmlsZSwgXCJ3XCIpO1xuICB9XG5cbiAgcHVibGljIGFwcGVuZChjaHVuazogQnVmZmVyKTogdm9pZCB7XG4gICAgZnMud3JpdGVTeW5jKHRoaXMuX2ZkLCBjaHVuayk7XG4gIH1cblxuICBwdWJsaWMgdG9SZXN1bHQoKTogdW5kZWZpbmVkIHtcbiAgICBmcy5jbG9zZVN5bmModGhpcy5fZmQpO1xuICB9XG59O1xuXG5mdW5jdGlvbiBjcmVhdGVCdWlsZGVyKGZpbGU/OiBzdHJpbmcpOiBJUmVzb2x2ZUJ1aWxkZXIge1xuICBpZiAoZmlsZSlcbiAgICByZXR1cm4gbmV3IEZpbGVTeW5jV3JpdGVyKGZpbGUpO1xuICByZXR1cm4gbmV3IEJ1ZmZlckJ1aWxkZXI7XG59XG5cbmZ1bmN0aW9uIGh0dHBSZXF1ZXN0KHVybDogc3RyaW5nLCBvcHRpb25zOiBodHRwLlJlcXVlc3RPcHRpb25zIHwgaHR0cHMuUmVxdWVzdE9wdGlvbnMsIGNhbGxiYWNrOiBhbnkpOiBodHRwLkNsaWVudFJlcXVlc3Qge1xuICBpZiAodXJsLnN0YXJ0c1dpdGgoXCJodHRwczovL1wiKSlcbiAgICByZXR1cm4gaHR0cHMucmVxdWVzdCh1cmwsIG9wdGlvbnMsIGNhbGxiYWNrKTtcbiAgcmV0dXJuIGh0dHAucmVxdWVzdCh1cmwsIG9wdGlvbnMsIGNhbGxiYWNrKTtcbn07XG5cbmludGVyZmFjZSBGZXRjaE9wdGlvbnMge1xuICBhdHRlbXB0cz86IG51bWJlcjtcbn07XG5cbmZ1bmN0aW9uIGZldGNoSW1wbCh1cmw6IHN0cmluZywgZmlsZTogc3RyaW5nIHwgdW5kZWZpbmVkLCBvcHRpb25zOiBGZXRjaE9wdGlvbnMpOiBQcm9taXNlPEJ1ZmZlcnx1bmRlZmluZWQ+IHtcbiAgcmV0dXJuIG5ldyBQcm9taXNlKChyZXNvbHZlLCByZWplY3QpID0+IHtcbiAgICBjb25zdCBodHRwT3B0aW9ucyA9IHtcbiAgICAgIG1ldGhvZDogJ0dFVCcsXG4gICAgICB0aW1lb3V0OiA1MDAwLFxuICAgICAgaGVhZGVyczoge1xuICAgICAgICBcIlVzZXItQWdlbnRcIjogUFJPSkVDVF9OQU1FICsgXCIvXCIgKyBQUk9KRUNUX1ZFUlNJT04sXG4gICAgICAgIFwiQWNjZXB0XCI6IFwiKi8qXCIsXG4gICAgICB9LFxuICAgIH07XG5cbiAgICBsZXQgYXR0ZW1wdHMgPSBvcHRpb25zLmF0dGVtcHRzIHx8IDA7XG4gICAgY29uc3QgZG9SZXF1ZXN0ID0gKHVybDogc3RyaW5nKSA9PiB7XG4gICAgICBjb25zdCByZXF1ZXN0ID0gaHR0cFJlcXVlc3QodXJsLCBodHRwT3B0aW9ucywgb25SZXF1ZXN0KTtcblxuICAgICAgbGV0IGhhc0Vycm9yID0gZmFsc2U7XG4gICAgICBjb25zdCBvbkVycm9yID0gKGVycjogRXJyb3IpID0+IHtcbiAgICAgICAgcmVxdWVzdC5kZXN0cm95KCk7XG4gICAgICAgIGlmICghaGFzRXJyb3IpIHtcbiAgICAgICAgICBoYXNFcnJvciA9IHRydWU7XG4gICAgICAgICAgaWYgKGF0dGVtcHRzID4gMCkge1xuICAgICAgICAgICAgbG9nZ2VyLndhcm4oZXJyLm1lc3NhZ2UpO1xuICAgICAgICAgICAgbG9nZ2VyLmluZm8oYHJlLXdnZXQgJHt1cmx9IGF0dGVtcHRzICR7YXR0ZW1wdHN9YCk7XG4gICAgICAgICAgICBhdHRlbXB0cy0tO1xuICAgICAgICAgICAgZG9SZXF1ZXN0KHVybCk7XG4gICAgICAgICAgfVxuICAgICAgICAgIGVsc2Uge1xuICAgICAgICAgICAgcmVqZWN0KGVycik7XG4gICAgICAgICAgfVxuICAgICAgICB9XG4gICAgICB9O1xuXG4gICAgICByZXF1ZXN0Lm9uKFwidGltZW91dFwiLCAoKSA9PiB7XG4gICAgICAgIG9uRXJyb3IobmV3IEVycm9yKFwiVGltZW91dCBmb3IgXCIgKyB1cmwpKTtcbiAgICAgIH0pO1xuXG4gICAgICByZXF1ZXN0Lm9uKFwiZXJyb3JcIiwgKGVycjogRXJyb3IpID0+IHtcbiAgICAgICAgb25FcnJvcihlcnIpO1xuICAgICAgfSk7XG5cbiAgICAgIHJlcXVlc3QuZW5kKCk7XG4gICAgfTtcblxuICAgIGNvbnN0IGZpbGVuYW1lID0gcGF0aC5iYXNlbmFtZSh1cmwpO1xuICAgIGNvbnN0IG9uUmVxdWVzdCA9IChyZXNwb25zZTogaHR0cC5JbmNvbWluZ01lc3NhZ2UpID0+IHtcbiAgICAgIHN3aXRjaCAocmVzcG9uc2Uuc3RhdHVzQ29kZSkge1xuICAgICAgY2FzZSAyMDA6XG4gICAgICAgIGxvZ2dlci5kZWJ1ZyhgQ29ubmN0ZWQgdG8gJHsocmVzcG9uc2UgYXMgYW55KS5yZXEuaG9zdH1gKTtcbiAgICAgICAgbG9nZ2VyLmRlYnVnKGBEb3dubG9hZGluZyAke2ZpbGVuYW1lfWApO1xuICAgICAgICBjb25zdCBidWlsZGVyID0gY3JlYXRlQnVpbGRlcihmaWxlKTtcbiAgICAgICAgcmVzcG9uc2Uub24oXCJkYXRhXCIsIChjaHVuazogQnVmZmVyKSA9PiBidWlsZGVyLmFwcGVuZChjaHVuaykpO1xuICAgICAgICByZXNwb25zZS5vbihcImVuZFwiLCAoKSA9PiByZXNvbHZlKGJ1aWxkZXIudG9SZXN1bHQoKSkpO1xuICAgICAgICByZXNwb25zZS5vbignY2xvc2UnLCAoKSA9PiBsb2dnZXIuZGVidWcoXCJDbG9zZVwiKSk7XG4gICAgICAgIGJyZWFrO1xuXG4gICAgICBjYXNlIDMwMTpcbiAgICAgIGNhc2UgMzAyOlxuICAgICAgICByZXNwb25zZS5yZXN1bWUoKTtcbiAgICAgICAgaWYgKHJlc3BvbnNlLmhlYWRlcnMubG9jYXRpb24pIHtcbiAgICAgICAgICBsb2dnZXIuaW5mbyhcIlJlZGlyZWN0IHRvIFwiICsgcmVzcG9uc2UuaGVhZGVycy5sb2NhdGlvbik7XG4gICAgICAgICAgZG9SZXF1ZXN0KHJlc3BvbnNlLmhlYWRlcnMubG9jYXRpb24pO1xuICAgICAgICB9XG4gICAgICAgIGJyZWFrO1xuXG4gICAgICBkZWZhdWx0OlxuICAgICAgICByZXNwb25zZS5yZXN1bWUoKTtcbiAgICAgICAgY29uc3QgbWVzc2FnZSA9IFwiRGlkIG5vdCBnZXQgYW4gT0sgZnJvbSB0aGUgc2VydmVyLiBDb2RlOiBcIiArIHJlc3BvbnNlLnN0YXR1c0NvZGU7XG4gICAgICAgIGxvZ2dlci5lcnJvcihtZXNzYWdlKTtcbiAgICAgICAgcmVqZWN0KG1lc3NhZ2UpO1xuICAgICAgICBicmVhaztcbiAgICAgIH1cbiAgICB9O1xuXG4gICAgbG9nZ2VyLmluZm8oXCJ3Z2V0IFwiICsgdXJsKTtcbiAgICBkb1JlcXVlc3QodXJsKTtcbiAgfSk7XG59O1xuXG5leHBvcnQgZnVuY3Rpb24gcmVxdWVzdEdldCh1cmw6IHN0cmluZywgb3B0aW9ucz86IEZldGNoT3B0aW9ucykge1xuICByZXR1cm4gZmV0Y2hJbXBsKHVybCwgdW5kZWZpbmVkLCBvcHRpb25zIHx8IHt9KSBhcyBQcm9taXNlPEJ1ZmZlcj47XG59XG5cbmV4cG9ydCBmdW5jdGlvbiBkb3dubG9hZEZpbGUodXJsOiBzdHJpbmcsIGZpbGU6IHN0cmluZywgb3B0aW9ucz86IEZldGNoT3B0aW9ucykge1xuICByZXR1cm4gZmV0Y2hJbXBsKHVybCwgZmlsZSwgb3B0aW9ucyB8fCB7fSkgYXMgUHJvbWlzZTx1bmRlZmluZWQ+O1xufVxuIiwiLypcbiAqIE1JVCBMaWNlbnNlXG4gKlxuICogQ29weXJpZ2h0IChjKSAyMDI1ICBZdXJpaSBZYWt1YmluICh5dXJpaS55YWt1YmluQGdtYWlsLmNvbSlcbiAqXG4gKiBQZXJtaXNzaW9uIGlzIGdyYW50ZWQgdG8gdXNlLCBjb3B5LCBtb2RpZnksIGFuZCBkaXN0cmlidXRlIHRoaXMgc29mdHdhcmVcbiAqIHVuZGVyIHRoZSBNSVQgTGljZW5zZS4gU2VlIExJQ0VOU0UgZmlsZSBmb3IgZGV0YWlscy5cbiAqL1xuXG5leHBvcnQgY29uc3QgaW1wb3J0TW9kdWxlID0gYXN5bmMgKG5hbWUpID0+IGltcG9ydCgvKiB3ZWJwYWNrSWdub3JlOiB0cnVlICovIG5hbWUpO1xuIiwiaW1wb3J0IGZzIGZyb20gXCJub2RlOmZzXCI7XG5pbXBvcnQgcGF0aCBmcm9tIFwibm9kZTpwYXRoXCI7XG5cbmltcG9ydCB7IGZpbGVMaXN0IH0gZnJvbSBcIkAvdXRpbHMvRmlsZVN5c3RlbVwiO1xuaW1wb3J0IHsgY3JlYXRlTG9nZ2VyIH0gZnJvbSBcIkAvbG9nZ2VyXCI7XG5cbmNvbnN0IGxvZ2dlciA9IGNyZWF0ZUxvZ2dlcihpbXBvcnQubWV0YS51cmwpO1xuXG5leHBvcnQgYXN5bmMgZnVuY3Rpb24gbWFrZVBhdGNoKHNyY0Rpcjogc3RyaW5nLCBkZXN0RGlyOiBzdHJpbmcpIHtcbiAgbG9nZ2VyLmluZm8oYE1ha2UgcGF0Y2ggJHtzcmNEaXJ9IHRvICR7ZGVzdERpcn1gKTtcbiAgY29uc3QgbGlzdCA9IGF3YWl0IGZpbGVMaXN0KHNyY0RpciwgeyByZWxhdGl2ZTogc3JjRGlyLCByZWN1cnNpdmU6IHRydWUgfSk7XG4gIGZvciAoY29uc3QgaXRlciBvZiBsaXN0KSB7XG4gICAgY29uc3Qgc291cmNlID0gcGF0aC5yZXNvbHZlKHNyY0RpciwgaXRlcik7XG4gICAgY29uc3QgZGVzdGluYXRpb24gPSBwYXRoLnJlc29sdmUoZGVzdERpciwgaXRlcik7XG4gICAgYXdhaXQgZnMucHJvbWlzZXMuY3Aoc291cmNlLCBkZXN0aW5hdGlvbiwgeyBmb3JjZTogdHJ1ZSB9KTtcbiAgICBsb2dnZXIuaW5mbyhgIFJlcGxhY2VkICR7aXRlcn1gKTtcbiAgfVxufVxuIiwiLypcbiAqIE1JVCBMaWNlbnNlXG4gKlxuICogQ29weXJpZ2h0IChjKSAyMDI1ICBZdXJpaSBZYWt1YmluICh5dXJpaS55YWt1YmluQGdtYWlsLmNvbSlcbiAqXG4gKiBQZXJtaXNzaW9uIGlzIGdyYW50ZWQgdG8gdXNlLCBjb3B5LCBtb2RpZnksIGFuZCBkaXN0cmlidXRlIHRoaXMgc29mdHdhcmVcbiAqIHVuZGVyIHRoZSBNSVQgTGljZW5zZS4gU2VlIExJQ0VOU0UgZmlsZSBmb3IgZGV0YWlscy5cbiAqL1xuXG5jb25zdCByZXF1aXJlSW1wbCA9IGV2YWwoXCJyZXF1aXJlXCIpO1xuXG5leHBvcnQgZnVuY3Rpb24gcmVxdWlyZVJlc29sdmUobmFtZTogc3RyaW5nKSB7XG4gIGlmICh0eXBlb2YgaW1wb3J0Lm1ldGEucmVzb2x2ZSA9PT0gJ2Z1bmN0aW9uJylcbiAgICByZXR1cm4gaW1wb3J0Lm1ldGEucmVzb2x2ZShuYW1lKTtcbiAgaWYgKHR5cGVvZiByZXF1aXJlSW1wbCAhPT0gJ3VuZGVmaW5lZCcpXG4gICAgcmV0dXJuIHJlcXVpcmVJbXBsLnJlc29sdmUobmFtZSk7XG4gIHRocm93IG5ldyBFcnJvcihcIk5vIGNvbXBhdGlibGUgbW9kdWxlIHJlc29sdmVyIGZvdW5kXCIpO1xufVxuXG5leHBvcnQgeyBpbXBvcnRNb2R1bGUgfSBmcm9tIFwiLi9JbXBvcnRNb2R1bGUubWpzXCI7XG4iLCIvKlxuICogTUlUIExpY2Vuc2VcbiAqXG4gKiBDb3B5cmlnaHQgKGMpIDIwMjUgIFl1cmlpIFlha3ViaW4gKHl1cmlpLnlha3ViaW5AZ21haWwuY29tKVxuICpcbiAqIFBlcm1pc3Npb24gaXMgZ3JhbnRlZCB0byB1c2UsIGNvcHksIG1vZGlmeSwgYW5kIGRpc3RyaWJ1dGUgdGhpcyBzb2Z0d2FyZVxuICogdW5kZXIgdGhlIE1JVCBMaWNlbnNlLiBTZWUgTElDRU5TRSBmaWxlIGZvciBkZXRhaWxzLlxuICovXG5cbmV4cG9ydCBmdW5jdGlvbiBlcXVhbFZhbHVlKGE6IGFueSwgYjogYW55KTogYm9vbGVhbiB7XG4gIGlmIChhID09PSBiKVxuICAgIHJldHVybiB0cnVlO1xuXG4gIGlmIChhID09PSB1bmRlZmluZWQgfHwgYiA9PT0gdW5kZWZpbmVkKVxuICAgIHJldHVybiBmYWxzZTtcblxuICBpZiAodHlwZW9mIGEgIT09IFwib2JqZWN0XCIgfHwgdHlwZW9mIGIgIT09IFwib2JqZWN0XCIpXG4gICAgcmV0dXJuIGZhbHNlO1xuXG4gIGNvbnN0IGsxID0gT2JqZWN0LmtleXMoYSk7XG4gIGNvbnN0IGsyID0gT2JqZWN0LmtleXMoYik7XG5cbiAgaWYgKGsxLmxlbmd0aCAhPSBrMi5sZW5ndGgpXG4gICAgcmV0dXJuIGZhbHNlO1xuXG4gIGZvciAoY29uc3Qga2V5IG9mIGsxKSB7XG4gICAgaWYgKCFPYmplY3QuaGFzT3duKGIsIGtleSkgfHwgIWVxdWFsVmFsdWUoYVtrZXldLCBiW2tleV0pKVxuICAgICAgcmV0dXJuIGZhbHNlO1xuICB9XG5cbiAgcmV0dXJuIHRydWU7XG59XG5cbmV4cG9ydCBmdW5jdGlvbiBjb3B5VmFsdWUobzogYW55KTogYW55IHtcbiAgaWYgKCFvIHx8IHR5cGVvZiBvICE9PSBcIm9iamVjdFwiKVxuICAgIHJldHVybiBvO1xuICBpZiAoQXJyYXkuaXNBcnJheShvKSkge1xuICAgIGNvbnN0IHJlc3VsdCA9IFtdO1xuICAgIGZvciAoY29uc3QgaXRlciBvZiBvKVxuICAgICAgcmVzdWx0LnB1c2goY29weVZhbHVlKGl0ZXIpKTtcbiAgICByZXR1cm4gcmVzdWx0O1xuICB9XG4gIGVsc2Uge1xuICAgIGNvbnN0IHJlc3VsdCA9IHt9IGFzIGFueTtcbiAgICBmb3IgKGNvbnN0IFtrZXksdmFsXSBvZiBPYmplY3QuZW50cmllcyhvKSlcbiAgICAgIHJlc3VsdFtrZXldID0gY29weVZhbHVlKHZhbCk7XG4gICAgcmV0dXJuIHJlc3VsdDtcbiAgfVxufVxuXG5leHBvcnQgZnVuY3Rpb24gYXNzaWduT2JqZWN0KHRhcmdldDogYW55LCBzb3VyY2U6IGFueSkge1xuICBpZiAoQXJyYXkuaXNBcnJheSh0YXJnZXQpICYmIEFycmF5LmlzQXJyYXkoc291cmNlKSkge1xuICAgIGZvciAoY29uc3QgaXRlciBvZiBzb3VyY2UpXG4gICAgICB0YXJnZXQucHVzaChpdGVyKTtcbiAgfVxuICBlbHNlIHtcbiAgICBmb3IgKGNvbnN0IGtleSBvZiBPYmplY3Qua2V5cyhzb3VyY2UpKSB7XG4gICAgICBjb25zdCBhID0gdGFyZ2V0W2tleV0sIGIgPSBzb3VyY2Vba2V5XTtcbiAgICAgIGlmIChhICYmIHR5cGVvZiBhID09PSBcIm9iamVjdFwiICYmIGIgJiYgdHlwZW9mIGIgPT09IFwib2JqZWN0XCIpXG4gICAgICAgIGFzc2lnbk9iamVjdChhLCBiKTtcbiAgICAgIGVsc2VcbiAgICAgICAgdGFyZ2V0W2tleV0gPSBjb3B5VmFsdWUoYik7XG4gICAgfVxuICB9XG59XG5cbmV4cG9ydCBmdW5jdGlvbiBhcnJheVdyYXBwZXIodmFsdWU6IGFueSkge1xuICBpZiAodmFsdWUgPT09IHVuZGVmaW5lZCB8fCBBcnJheS5pc0FycmF5KHZhbHVlKSlcbiAgICByZXR1cm4gdmFsdWU7XG4gIHJldHVybiBbIHZhbHVlIF07XG59XG4iLCIvKlxuICogTUlUIExpY2Vuc2VcbiAqXG4gKiBDb3B5cmlnaHQgKGMpIDIwMjUgIFl1cmlpIFlha3ViaW4gKHl1cmlpLnlha3ViaW5AZ21haWwuY29tKVxuICpcbiAqIFBlcm1pc3Npb24gaXMgZ3JhbnRlZCB0byB1c2UsIGNvcHksIG1vZGlmeSwgYW5kIGRpc3RyaWJ1dGUgdGhpcyBzb2Z0d2FyZVxuICogdW5kZXIgdGhlIE1JVCBMaWNlbnNlLiBTZWUgTElDRU5TRSBmaWxlIGZvciBkZXRhaWxzLlxuICovXG5cbmltcG9ydCBmcyBmcm9tIFwibm9kZTpmc1wiO1xuXG5leHBvcnQgY2xhc3MgU2V0dGluZ3NTdG9yYWdlIHtcbiAgcHJpdmF0ZSBfZmlsZW5hbWU6IHN0cmluZztcbiAgcHJpdmF0ZSBfc2V0dGluZ3M6IGFueTtcbiAgcHJpdmF0ZSBfY3VycmVudDogYW55O1xuXG4gIGNvbnN0cnVjdG9yKGZpbGVuYW1lOiBzdHJpbmcpIHtcbiAgICB0aGlzLl9maWxlbmFtZSA9IGZpbGVuYW1lO1xuICB9XG5cbiAgcHVibGljIGFzeW5jIHB1c2gobmFtZTogc3RyaW5nKSB7XG4gICAgaWYgKCF0aGlzLl9zZXR0aW5ncylcbiAgICAgIGF3YWl0IHRoaXMubG9hZCgpO1xuICAgIGxldCBvYmplY3QgPSB0aGlzLl9jdXJyZW50Lm9iamVjdFtuYW1lXTtcbiAgICBpZiAoIW9iamVjdClcbiAgICAgIG9iamVjdCA9IHRoaXMuX2N1cnJlbnQub2JqZWN0W25hbWVdID0ge307XG4gICAgdGhpcy5fY3VycmVudCA9IHsgcGFyZW50OiB0aGlzLl9jdXJyZW50LCBvYmplY3QgfTtcbiAgfVxuXG4gIHB1YmxpYyBhc3luYyBwb3AoKSB7XG4gICAgaWYgKCF0aGlzLl9zZXR0aW5ncylcbiAgICAgIGF3YWl0IHRoaXMubG9hZCgpO1xuICAgIGNvbnNvbGUuYXNzZXJ0KHRoaXMuX2N1cnJlbnQucGFyZW50KTtcbiAgICB0aGlzLl9jdXJyZW50ID0gdGhpcy5fY3VycmVudC5wYXJlbnQ7XG4gIH1cblxuICBwdWJsaWMgYXN5bmMgZ2V0KG5hbWU6IHN0cmluZykge1xuICAgIGlmICghdGhpcy5fc2V0dGluZ3MpXG4gICAgICBhd2FpdCB0aGlzLmxvYWQoKTtcbiAgICByZXR1cm4gdGhpcy5fY3VycmVudC5vYmplY3RbbmFtZV07XG4gIH1cblxuICBwdWJsaWMgYXN5bmMgc2V0KG5hbWU6IHN0cmluZywgdmFsdWU6IGFueSkge1xuICAgIGlmICghdGhpcy5fc2V0dGluZ3MpXG4gICAgICBhd2FpdCB0aGlzLmxvYWQoKTtcbiAgICB0aGlzLl9jdXJyZW50Lm9iamVjdFtuYW1lXSA9IHZhbHVlO1xuICAgIGF3YWl0IHRoaXMuc2F2ZSgpO1xuICB9XG5cbiAgcHVibGljIGFzeW5jIGxvYWQoKSB7XG4gICAgdHJ5IHtcbiAgICAgIGNvbnN0IGNvbnRlbnQgPSBhd2FpdCBmcy5wcm9taXNlcy5yZWFkRmlsZSh0aGlzLl9maWxlbmFtZSwgXCJ1dGYtOFwiKTtcbiAgICAgIHRoaXMuX3NldHRpbmdzID0gSlNPTi5wYXJzZShjb250ZW50KTtcbiAgICB9XG4gICAgY2F0Y2ggKGUpIHtcbiAgICAgIHRoaXMuX3NldHRpbmdzID0ge307XG4gICAgfVxuICAgIHRoaXMuX2N1cnJlbnQgPVxuICAgIHtcbiAgICAgIHBhcmVudDogbnVsbCxcbiAgICAgIG9iamVjdDogdGhpcy5fc2V0dGluZ3MsXG4gICAgfTtcbiAgfVxuXG4gIHB1YmxpYyBhc3luYyBzYXZlKCkge1xuICAgIGNvbnN0IHNwYWNlID0gMjtcbiAgICBjb25zdCBjb250ZW50ID0gSlNPTi5zdHJpbmdpZnkodGhpcy5fc2V0dGluZ3MsIHVuZGVmaW5lZCwgc3BhY2UpO1xuICAgIGF3YWl0IGZzLnByb21pc2VzLndyaXRlRmlsZSh0aGlzLl9maWxlbmFtZSwgY29udGVudCwgeyBlbmNvZGluZzogXCJ1dGYtOFwiLCBmbGFnOiBcIndcIiwgZmx1c2g6IHRydWUgfSk7XG4gIH1cbn07XG4iLCIvKlxuICogTUlUIExpY2Vuc2VcbiAqXG4gKiBDb3B5cmlnaHQgKGMpIDIwMjUgIFl1cmlpIFlha3ViaW4gKHl1cmlpLnlha3ViaW5AZ21haWwuY29tKVxuICpcbiAqIFBlcm1pc3Npb24gaXMgZ3JhbnRlZCB0byB1c2UsIGNvcHksIG1vZGlmeSwgYW5kIGRpc3RyaWJ1dGUgdGhpcyBzb2Z0d2FyZVxuICogdW5kZXIgdGhlIE1JVCBMaWNlbnNlLiBTZWUgTElDRU5TRSBmaWxlIGZvciBkZXRhaWxzLlxuICovXG5cbmV4cG9ydCBmdW5jdGlvbiBlbnN1cmVCb29sZWFuKHZhbHVlOiBhbnkpIHtcbiAgaWYgKHR5cGVvZiB2YWx1ZSA9PT0gXCJib29sZWFuXCIpXG4gICAgcmV0dXJuIHZhbHVlO1xuICB0aHJvdyBuZXcgVHlwZUVycm9yKGBUaGUgJyR7dmFsdWV9JyBpcyBub3QgYSBib29sZWFuYCk7XG59XG5cbmV4cG9ydCBmdW5jdGlvbiBlbnN1cmVOdW1iZXIodmFsdWU6IGFueSkge1xuICBpZiAodHlwZW9mIHZhbHVlID09PSBcIm51bWJlclwiKVxuICAgIHJldHVybiB2YWx1ZTtcbiAgdGhyb3cgbmV3IFR5cGVFcnJvcihgVGhlICcke3ZhbHVlfScgaXMgbm90IGEgc3RyaW5nYCk7XG59XG5cbmV4cG9ydCBmdW5jdGlvbiBlbnN1cmVTdHJpbmcodmFsdWU6IGFueSkge1xuICBpZiAodHlwZW9mIHZhbHVlID09PSBcInN0cmluZ1wiKVxuICAgIHJldHVybiB2YWx1ZTtcbiAgdGhyb3cgbmV3IFR5cGVFcnJvcihgVGhlICcke3ZhbHVlfScgaXMgbm90IGEgc3RyaW5nYCk7XG59XG5cbmV4cG9ydCBmdW5jdGlvbiBlbnN1cmVBcnJheSh2YWx1ZTogYW55KSB7XG4gIGlmIChBcnJheS5pc0FycmF5KHZhbHVlKSlcbiAgICByZXR1cm4gQXJyYXkuZnJvbSh2YWx1ZSk7XG4gIHRocm93IG5ldyBUeXBlRXJyb3IoYFRoZSAnJHt2YWx1ZX0nIGlzIG5vdCBhIGFycmF5YCk7XG59XG4iLCJtb2R1bGUuZXhwb3J0cyA9IHJlcXVpcmUoXCJodHRwXCIpOyIsIm1vZHVsZS5leHBvcnRzID0gcmVxdWlyZShcImh0dHBzXCIpOyIsIm1vZHVsZS5leHBvcnRzID0gcmVxdWlyZShcIm5vZGU6Y2hpbGRfcHJvY2Vzc1wiKTsiLCJtb2R1bGUuZXhwb3J0cyA9IHJlcXVpcmUoXCJub2RlOmZzXCIpOyIsIm1vZHVsZS5leHBvcnRzID0gcmVxdWlyZShcIm5vZGU6b3NcIik7IiwibW9kdWxlLmV4cG9ydHMgPSByZXF1aXJlKFwibm9kZTpwYXRoXCIpOyIsIm1vZHVsZS5leHBvcnRzID0gcmVxdWlyZShcIm5vZGU6dXJsXCIpOyIsIi8vIFRoZSBtb2R1bGUgY2FjaGVcbnZhciBfX3dlYnBhY2tfbW9kdWxlX2NhY2hlX18gPSB7fTtcblxuLy8gVGhlIHJlcXVpcmUgZnVuY3Rpb25cbmZ1bmN0aW9uIF9fd2VicGFja19yZXF1aXJlX18obW9kdWxlSWQpIHtcblx0Ly8gQ2hlY2sgaWYgbW9kdWxlIGlzIGluIGNhY2hlXG5cdHZhciBjYWNoZWRNb2R1bGUgPSBfX3dlYnBhY2tfbW9kdWxlX2NhY2hlX19bbW9kdWxlSWRdO1xuXHRpZiAoY2FjaGVkTW9kdWxlICE9PSB1bmRlZmluZWQpIHtcblx0XHRyZXR1cm4gY2FjaGVkTW9kdWxlLmV4cG9ydHM7XG5cdH1cblx0Ly8gQ3JlYXRlIGEgbmV3IG1vZHVsZSAoYW5kIHB1dCBpdCBpbnRvIHRoZSBjYWNoZSlcblx0dmFyIG1vZHVsZSA9IF9fd2VicGFja19tb2R1bGVfY2FjaGVfX1ttb2R1bGVJZF0gPSB7XG5cdFx0Ly8gbm8gbW9kdWxlLmlkIG5lZWRlZFxuXHRcdC8vIG5vIG1vZHVsZS5sb2FkZWQgbmVlZGVkXG5cdFx0ZXhwb3J0czoge31cblx0fTtcblxuXHQvLyBFeGVjdXRlIHRoZSBtb2R1bGUgZnVuY3Rpb25cblx0X193ZWJwYWNrX21vZHVsZXNfX1ttb2R1bGVJZF0obW9kdWxlLCBtb2R1bGUuZXhwb3J0cywgX193ZWJwYWNrX3JlcXVpcmVfXyk7XG5cblx0Ly8gUmV0dXJuIHRoZSBleHBvcnRzIG9mIHRoZSBtb2R1bGVcblx0cmV0dXJuIG1vZHVsZS5leHBvcnRzO1xufVxuXG4iLCIvLyBnZXREZWZhdWx0RXhwb3J0IGZ1bmN0aW9uIGZvciBjb21wYXRpYmlsaXR5IHdpdGggbm9uLWhhcm1vbnkgbW9kdWxlc1xuX193ZWJwYWNrX3JlcXVpcmVfXy5uID0gKG1vZHVsZSkgPT4ge1xuXHR2YXIgZ2V0dGVyID0gbW9kdWxlICYmIG1vZHVsZS5fX2VzTW9kdWxlID9cblx0XHQoKSA9PiAobW9kdWxlWydkZWZhdWx0J10pIDpcblx0XHQoKSA9PiAobW9kdWxlKTtcblx0X193ZWJwYWNrX3JlcXVpcmVfXy5kKGdldHRlciwgeyBhOiBnZXR0ZXIgfSk7XG5cdHJldHVybiBnZXR0ZXI7XG59OyIsIi8vIGRlZmluZSBnZXR0ZXIgZnVuY3Rpb25zIGZvciBoYXJtb255IGV4cG9ydHNcbl9fd2VicGFja19yZXF1aXJlX18uZCA9IChleHBvcnRzLCBkZWZpbml0aW9uKSA9PiB7XG5cdGZvcih2YXIga2V5IGluIGRlZmluaXRpb24pIHtcblx0XHRpZihfX3dlYnBhY2tfcmVxdWlyZV9fLm8oZGVmaW5pdGlvbiwga2V5KSAmJiAhX193ZWJwYWNrX3JlcXVpcmVfXy5vKGV4cG9ydHMsIGtleSkpIHtcblx0XHRcdE9iamVjdC5kZWZpbmVQcm9wZXJ0eShleHBvcnRzLCBrZXksIHsgZW51bWVyYWJsZTogdHJ1ZSwgZ2V0OiBkZWZpbml0aW9uW2tleV0gfSk7XG5cdFx0fVxuXHR9XG59OyIsIl9fd2VicGFja19yZXF1aXJlX18ubyA9IChvYmosIHByb3ApID0+IChPYmplY3QucHJvdG90eXBlLmhhc093blByb3BlcnR5LmNhbGwob2JqLCBwcm9wKSkiLCIvLyBkZWZpbmUgX19lc01vZHVsZSBvbiBleHBvcnRzXG5fX3dlYnBhY2tfcmVxdWlyZV9fLnIgPSAoZXhwb3J0cykgPT4ge1xuXHRpZih0eXBlb2YgU3ltYm9sICE9PSAndW5kZWZpbmVkJyAmJiBTeW1ib2wudG9TdHJpbmdUYWcpIHtcblx0XHRPYmplY3QuZGVmaW5lUHJvcGVydHkoZXhwb3J0cywgU3ltYm9sLnRvU3RyaW5nVGFnLCB7IHZhbHVlOiAnTW9kdWxlJyB9KTtcblx0fVxuXHRPYmplY3QuZGVmaW5lUHJvcGVydHkoZXhwb3J0cywgJ19fZXNNb2R1bGUnLCB7IHZhbHVlOiB0cnVlIH0pO1xufTsiLCIvKlxuICogTUlUIExpY2Vuc2VcbiAqXG4gKiBDb3B5cmlnaHQgKGMpIDIwMjUgIFl1cmlpIFlha3ViaW4gKHl1cmlpLnlha3ViaW5AZ21haWwuY29tKVxuICpcbiAqIFBlcm1pc3Npb24gaXMgZ3JhbnRlZCB0byB1c2UsIGNvcHksIG1vZGlmeSwgYW5kIGRpc3RyaWJ1dGUgdGhpcyBzb2Z0d2FyZVxuICogdW5kZXIgdGhlIE1JVCBMaWNlbnNlLiBTZWUgTElDRU5TRSBmaWxlIGZvciBkZXRhaWxzLlxuICovXG5cbi8vLyA8cmVmZXJlbmNlIHBhdGg9XCJnbG9iYWwuZC50c1wiIC8+XG5cbmltcG9ydCAqIGFzIGN4eCBmcm9tIFwiQC9jeHhcIjtcbmltcG9ydCBjbWFrZSBmcm9tIFwiQC9jbWFrZVwiO1xuXG5pbXBvcnQgeyBzcGF3bkFzeW5jIH0gZnJvbSBcIkAvdXRpbHMvQ2hpbGRQcm9jZXNzXCI7XG5pbXBvcnQgeyByZXF1ZXN0R2V0LCBkb3dubG9hZEZpbGUgfSBmcm9tIFwiQC91dGlscy9IdHRwUmVxdWVzdFwiO1xuaW1wb3J0IGNvbW1hbmRzIGZyb20gXCJAL2NvbW1hbmRzXCI7XG5cbmV4cG9ydCBkZWZhdWx0IHtcbiAgY3h4LFxuICBjbWFrZSxcbiAgY29tbWFuZHMsXG4gIHByb2Nlc3M6IHtcbiAgICBzcGF3bjogc3Bhd25Bc3luYyxcbiAgfSxcbiAgdXRpbHM6IHtcbiAgICByZXF1ZXN0R2V0LFxuICAgIGRvd25sb2FkRmlsZSxcbiAgfSxcbn07XG4iXSwibmFtZXMiOltdLCJzb3VyY2VSb290IjoiIn0=