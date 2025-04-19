/*
 * MIT License
 *
 * Copyright (c) 2025  Yurii Yakubin (yurii.yakubin@gmail.com)
 *
 * Permission is granted to use, copy, modify, and distribute this software
 * under the MIT License. See LICENSE file for details.
 */

export enum BooleanType {
  ON = "ON",
  OFF = "OFF",
};

// Enum representing value types used in CMake cache variables
export enum ValueType {
  // Represents a full path to a file
  FILEPATH = "FILEPATH",

  // Represents a path to a directory
  PATH = "PATH",

  // Represents a boolean value (true/false)
  BOOL = "BOOL",

  // Represents a generic string value
  STRING = "STRING",
};

// BuildType representing common CMake build types
export enum BuildType {
  // Debug build type: includes debug symbols, no optimization
  Debug = "Debug",

  // Release build type: optimized code, no debug info
  Release = "Release",

  // Release with debug info: optimized with debug symbols included
  RelWithDebInfo = "RelWithDebInfo",

  // Minimum size release: optimized for smallest binary size
  MinSizeRel = "MinSizeRel",
};

// The default name of the main CMake build configuration file
export const CMAKE_LISTS_TXT = "CMakeLists.txt";
