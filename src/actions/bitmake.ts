/*
 * MIT License
 *
 * Copyright (c) 2025  Yurii Yakubin (yurii.yakubin@gmail.com)
 *
 * Permission is granted to use, copy, modify, and distribute this software
 * under the MIT License. See LICENSE file for details.
 */

import fs from "node:fs";
import path from "node:path";
import os from "node:os";

import { MakeServer } from "@/server/MakeServer";
import { PluginContext } from "@/core/PluginContext";
import { ScopeHelper } from "@/core/Scope";
import { ToolchainContext } from "@/core/ToolchainContext";
import { getPathString, saveAsJSON }  from "@/utils/FileSystem";
import { Locator } from "@/utils/Locator";
import { importModule }  from "@/utils/Module";
import { determineCompiler }  from "@/core/DetermineCompiler";
import { SettingsStorage } from "@/utils/SettingsStorage";
import { Environment } from "@/utils/Environment";
import { IMPORT_SCHEME } from "@/utils/UrlScheme";
import { INSTALL_TARGET, PACKAGE_JSON, MAKE_CACHE } from "@/Constants";
import { SYSTEM_VARIABLE_GROUP } from "@/Constants";
import { requireResolve } from "@/utils/Module";
import { SystemScope } from "@/core/SystemScope";
import SystemVariables from "@/core/SystemVariables";
import { Logger } from "@/utils/Logger";

const logger = Logger.create(import.meta.url);

export default async function(config: any, environment: Environment, settings: SettingsStorage) {
  process.env = environment;

  const server = new MakeServer;

  const variableMap = server.rootVariableMap;
  ScopeHelper.extendVariableMapByValues(variableMap, "", config.variables);
  ScopeHelper.defineVariablesInVariableMap(variableMap, SYSTEM_VARIABLE_GROUP, SystemVariables);
  const scope = ScopeHelper.createProxy(variableMap) as SystemScope;

  const sysPath = (os.platform() === "win32") ? environment.Path : environment.PATH;
  scope.FIND_PROGRAM_PATHS = sysPath ? sysPath.split(path.delimiter) : [];

  const sourceDir = getPathString(config.sourceDir);
  const binaryDir = getPathString(config.binaryDir);

  scope.PROJECT_SOURCE_DIR = Locator.create(sourceDir);
  scope.PROJECT_BINARY_DIR = Locator.create(binaryDir);

  scope.PACKAGE_FILE = scope.PROJECT_SOURCE_DIR.join(PACKAGE_JSON);
  scope.CACHE_FILE = scope.PROJECT_BINARY_DIR.join(MAKE_CACHE);
  scope.SOURCE_DIR = scope.PROJECT_SOURCE_DIR;
  scope.BINARY_DIR = scope.PROJECT_BINARY_DIR;

  const packageJson = await fs.promises.readFile(scope.PACKAGE_FILE.toString(), "utf8");
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

    scope.SCRIPT_FILE = Locator.create(plugin);
    scope.SCRIPT_DIR = scope.SCRIPT_FILE.dirname();
    scope.SOURCE_DIR = scope.SCRIPT_DIR;

    const binaryDir1 = scope.PROJECT_BINARY_DIR.relative(sourceDir);
    const binaryDir2 = scope.PROJECT_SOURCE_DIR.relative(sourceDir);
    const binaryDir = (binaryDir2.length < binaryDir1.length ? binaryDir2 : binaryDir1).replace("../", "__/");
    scope.BINARY_DIR = scope.PROJECT_BINARY_DIR.join("MakePluginBinaries", binaryDir);

    process.chdir(scope.SOURCE_DIR.toPath());
    const pluginUrl = scope.SCRIPT_FILE.toURLString();
    const module = await importModule(pluginUrl);
    
    if (!module.default)
      throw new Error(`Plugin ${scope.SCRIPT_FILE.basename()} not contain default export`);

    const mk = PluginContext.create(server.project, variableMap);
    if (typeof module.default !== "function")
      throw new Error(`Plugin ${scope.SCRIPT_FILE.basename()} export has no function or class`);
    let result: any;
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
    const toolchain = await importModule(toolchainUrl);
    if (!toolchain.default)
      throw new Error("Toolchain module has no default export");
    const mk = ToolchainContext.create(server.project, variableMap);
    const result = toolchain.default(mk);
    if (result instanceof Promise)
      await result;
  }
  else {
    await determineCompiler(scope);
  }

  if (config.sourceUrl && config.sourceUrl.startsWith(IMPORT_SCHEME)) {
    const scriptFile = requireResolve(config.sourceUrl.slice(IMPORT_SCHEME.length));
    scope.SCRIPT_FILE = Locator.create(scriptFile);
    scope.SCRIPT_DIR = scope.SCRIPT_FILE.dirname();
  }

  server.addEventListener("configure", async (event) => {
    logger.info("Configuring done");

    if (scope.GLOBAL_CONTEXT_JSON) {
      await saveAsJSON(scope.GLOBAL_CONTEXT_JSON.toPath(), server.project, { pretty: true });
    }

    const allGoalList = server.project.createGoals(scope);
    const goalList = allGoalList.getTargetList(INSTALL_TARGET);

    if (scope.TARGET_GOALS_JSON) {
      await saveAsJSON(scope.TARGET_GOALS_JSON.toPath(), goalList, { pretty: true });
    }

    let loaded = 0;
    const total = goalList.length;
    for (const iter of goalList) {
      if (iter.output) {
        const outputDir = Locator.create(iter.output).dirname().toPath();
        await fs.promises.mkdir(outputDir, { recursive: true });
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

  let finishResolve: () => void;
  const result = new Promise<void>((resolve) => {
    finishResolve = resolve;
  });

  server.addEventListener("build", (event) => finishResolve());

  server.start();

  return result;
}
