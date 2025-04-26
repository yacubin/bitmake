/*
 * MIT License
 *
 * Copyright (c) 2025  Yurii Yakubin (yurii.yakubin@gmail.com)
 *
 * Permission is granted to use, copy, modify, and distribute this software
 * under the MIT License. See LICENSE file for details.
 */

import { AbsolutePath } from "@/core/Path";
import { IncludeDirectory } from "@/core/IncludeDirectory";

export interface SystemScope {
  // Defines the target OS for the build, used in cross-compilation and native builds
  SYSTEM_NAME: string;

  // Defines the target CPU architecture
  SYSTEM_PROCESSOR: string;

  // Name of the current project
  PROJECT_NAME: string;

  // Version of the current project
  PROJECT_VERSION: string;

  // Description of the current project
  PROJECT_DESCRIPTION: string;

  // Homepage URL of the current project
  PROJECT_HOMEPAGE_URL: string;

  // Absolute path to the top-level source directory of the project
  PROJECT_SOURCE_DIR: AbsolutePath;

  // Absolute path to the top-level build (binary) directory of the project
  PROJECT_BINARY_DIR: AbsolutePath;

  // Full path to the current MakeScript file being processed
  SCRIPT_FILE: AbsolutePath;

  // Directory of the current MakeScript file being processed
  SCRIPT_DIR: AbsolutePath;

  // Filename of project manifest containing metadata and dependencies
  PACKAGE_FILE: AbsolutePath;

  // Default filename of the BitMake cache storing settings
  CACHE_FILE: AbsolutePath;

  // Specifies the path to a toolchain file used for cross-compilation
  TOOLCHAIN_FILE: AbsolutePath;

  // Specifies the build configuration for controlling optimization levels and debug information in the build process
  BUILD_TYPE: "Debug" | "Release";

  // The root directory where files will be installed by default
  INSTALL_PREFIX: AbsolutePath;
  
  // Temporary installation root
  DESTDIR?: AbsolutePath;

  // Path to the source directory currently being processed
  SOURCE_DIR: AbsolutePath;

  // Path to the binary directory currently being processed
  BINARY_DIR: AbsolutePath;

  // Enables Position-Independent Code (PIC) for building shared libraries
  POSITION_INDEPENDENT_CODE: boolean;

  // Prevent installation of files
  PREVENT_INSTALL_FILES: boolean;

  // Specifies the OS of the machine running
  HOST_SYSTEM_NAME: string;

  // Paths searched for header files
  INCLUDES: Array<IncludeDirectory | AbsolutePath>;

  // Path to the assembler compiler detected
  ASM_COMPILER: string;

  // Flags passed to the assembler compiler
  ASM_FLAGS: string[];

  // Additional assembler flags used when building in Debug mode
  ASM_FLAGS_DEBUG: string[];

  // Additional assembler flags used when building in Release mode
  ASM_FLAGS_RELEASE: string[];

  // Path to the C compiler detected
  C_COMPILER: string;

  // Flags passed to the C compiler
  C_FLAGS: string[];

  // Additional C compiler flags used when building in Debug mode
  C_FLAGS_DEBUG: string[];

  // Additional C compiler flags used when building in Release mode
  C_FLAGS_RELEASE: string[];

  // Path to the C++ compiler detected
  CXX_COMPILER: string;

  // Flags passed to the C compiler
  CXX_FLAGS: string[];

  // Additional C++ compiler flags used when building in Debug mode
  CXX_FLAGS_DEBUG: string[];

  // Additional C++ compiler flags used when building in Release mode
  CXX_FLAGS_RELEASE: string[];

  // Path to the archiver tool used to create static libraries
  AR: string;

  // Tool used to generate an index to the contents of an archive (static library)
  RANLIB: string;

  // Path to the linker used to link object files and libraries into executables
  LINKER: string;

  // Path to the tool used to list symbols from object files or archives
  NM: string;

  // Path to the tool used to copy and translate object files
  OBJCOPY: string;

  // Path to the tool used to display information about object files, such as disassembly
  OBJDUMP: string;

  // Path to the tool used to remove symbols from object files or executables to reduce size
  STRIP: string;

  // Prefix used for object libraries
  OBJECT_LIBRARY_PREFIX: string;

  // Suffix used for object library files
  OBJECT_LIBRARY_SUFFIX: string;

  // Flags passed to the linker when creating object libraries
  OBJECT_LINKER_FLAGS: string[];

  // Prefix used for static library files
  STATIC_LIBRARY_PREFIX: string;

  // Suffix used for static library files
  STATIC_LIBRARY_SUFFIX: string;

  // Flags passed to the linker when creating static libraries
  STATIC_LINKER_FLAGS: string[];

  // Prefix used for shared library files
  SHARED_LIBRARY_PREFIX: string;

  // Suffix used for shared library files
  SHARED_LIBRARY_SUFFIX: string;

  // Flags passed to the linker when creating shared libraries
  SHARED_LINKER_FLAGS: string[];

  // Suffix used for executable files
  EXECUTABLE_SUFFIX: string;

  // Flags passed to the linker when creating executables
  EXE_LINKER_FLAGS: string[];

  // Filename for JSON of the Global context
  GLOBAL_CONTEXT_JSON: AbsolutePath;

  // Filename for JSON of the Target Goals
  TARGET_GOALS_JSON: AbsolutePath;

  // Defines the size (in bytes) of a void pointer on the target architecture
  SIZEOF_VOID_P: 4 | 8;
};
