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
import { getSizeofVoidp } from "@/core/GetSizeofVoidp";

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
  TOOLCHAIN_FILE: {
    description: "Specifies the path to a toolchain file used for cross-compilation",
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
    value: "",
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
    value: "",
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
    value: [ "-g" ],
  },
  CXX_FLAGS_RELEASE: {
    description: "Additional C++ compiler flags used when building in Release mode",
    value: [ "-O3", "-DNDEBUG" ],
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
    type: [ 4, 8 ],
    value: getSizeofVoidp(),
  },
  MAKE_PLUGIN_LIST: {
    description: "List of paths to plugins",
    value: [],
  },
};
