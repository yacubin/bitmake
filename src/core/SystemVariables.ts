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
  SYSTEM_NAME: {
    description: "Defines the target OS for the build, used in cross-compilation and native builds",
    value: "Linux",
  },
  SYSTEM_PROCESSOR: {
    description: "Defines the target CPU architecture",
    value: "wasm32",
  },
  BUILD_TYPE: {
    description: "Specifies the build configuration for controlling optimization levels and debug information in the build process",
    type: [ DEBUG_BUILD_TYPE, RELEASE_BUILD_TYPE ],
    value: RELEASE_BUILD_TYPE,
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
};
