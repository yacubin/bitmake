/*
 * MIT License
 *
 * Copyright (c) 2025  Yurii Yakubin (yurii.yakubin@gmail.com)
 *
 * Permission is granted to use, copy, modify, and distribute this software
 * under the MIT License. See LICENSE file for details.
 */

import os from "node:os";
import { DEBUG_BUILD_TYPE, RELEASE_BUILD_TYPE } from "@/core/Types";

export default {
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
  BUILD_TYPE: {
    description: "Specifies the build configuration for controlling optimization levels and debug information in the build process",
    type: [ DEBUG_BUILD_TYPE, RELEASE_BUILD_TYPE ],
    value: RELEASE_BUILD_TYPE,
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
    value: os.type(),
  },
  INCLUDES: {
    description: "Paths searched for header files",
    value: [],
  },
  ASM_COMPILER: {
    description: "Path to the assembler compiler detected",
    value: "clang",
  },
  ASM_FLAGS: {
    description: "Flags passed to the assembler compiler",
    value: [],
  },
  ASM_FLAGS_DEBUG: {
    description: "Additional assembler flags used when building in Debug mode",
    value: [ "-g" ],
  },
  ASM_FLAGS_RELEASE: {
    description: "Additional assembler flags used when building in Release mode",
    value: [ "-O3", "-DNDEBUG" ],
  },
  C_COMPILER: {
    description: "Path to the C compiler detected",
    value: "clang",
  },
  C_FLAGS: {
    description: "Flags passed to the C compiler",
    value: [],
  },
  C_FLAGS_DEBUG: {
    description: "Additional C compiler flags used when building in Debug mode",
    value: [ "-g" ],
  },
  C_FLAGS_RELEASE: {
    description: "Additional C compiler flags used when building in Release mode",
    value: [ "-O3", "-DNDEBUG" ],
  },
};
