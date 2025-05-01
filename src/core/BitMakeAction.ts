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

import { PluginContext } from "@/core/PluginContext";
import { GlobalContext } from "@/core/GlobalContext";
import { ScopeHelper } from "@/core/Scope";
import { GoalCollection } from "@/core/GoalCollection";
import { ToolchainContext } from "@/core/ToolchainContext";
import { getPathString }  from "@/utils/FileSystem";
import { DirPath, FilePath } from "@/core/Path";
import { importModule }  from "@/utils/Module";
import { determineCompiler }  from "@/core/DetermineCompiler";
import SystemVariables from "@/core/SystemVariables";
import { SystemScope } from "@/core/SystemScope";
import { SettingsStorage } from "@/utils/SettingsStorage";
import { INSTALL_TARGET, PACKAGE_JSON, MAKE_CACHE } from "@/Constants";

export async function bitmakeAction(config: any, environment: any, settings: SettingsStorage) {
  process.env = environment;

  let scope = {} as SystemScope;
  ScopeHelper.defineVariables(scope, "system", SystemVariables);

  const sourceDir = getPathString(config.sourceDir);
  const binaryDir = getPathString(config.binaryDir);

  scope.PROJECT_SOURCE_DIR = DirPath.create(sourceDir);
  scope.PROJECT_BINARY_DIR = DirPath.create(binaryDir);

  scope.PACKAGE_FILE = scope.PROJECT_SOURCE_DIR.join(PACKAGE_JSON);
  scope.CACHE_FILE = scope.PROJECT_BINARY_DIR.join(MAKE_CACHE);
  scope.SOURCE_DIR = scope.PROJECT_SOURCE_DIR;
  scope.BINARY_DIR = scope.PROJECT_BINARY_DIR;

  const packageJson = await fs.promises.readFile(scope.PACKAGE_FILE.toString(), 'utf8');
  const pkg = JSON.parse(packageJson);

  scope.BUILD_TYPE = config.buildType;
  scope.PROJECT_NAME = pkg.name;
  scope.PROJECT_VERSION = pkg.version;
  scope.PROJECT_DESCRIPTION = pkg.description || "";
  scope.PROJECT_HOMEPAGE_URL = pkg.homepage || "";

  if (config.destDir)
    scope.DESTDIR = config.destDir;

  ScopeHelper.applyVariables(scope, config.variables || {});

  const global = GlobalContext.create();
  if (scope.TOOLCHAIN_FILE) {
    const toolchain = await importModule(scope.TOOLCHAIN_FILE);
    if (!toolchain.default)
      throw new Error("Toolchain module has no default export");
    const mk = ToolchainContext.create(scope, global);
    const result = toolchain.default(mk);
    if (result instanceof Promise)
      await result;
    ScopeHelper.applyVariables(scope, mk);
  }
  else {
    await determineCompiler(scope);
  }

  for (const plugin of (scope.MAKE_PLUGIN_LIST || [])) {
    const cwdSave = process.cwd();
    
    scope.SCRIPT_FILE = FilePath.create(plugin);
    scope.SCRIPT_DIR = scope.SCRIPT_FILE.dirname();

    process.chdir(scope.SCRIPT_DIR.toString());
    const module = await importModule(scope.SCRIPT_FILE.toString());
    if (!module.default)
      throw new Error(`Plugin ${scope.SCRIPT_FILE.basename()} not contain default function`);
    const mk = PluginContext.create(scope, global);
    const result = module.default(mk);
    if (result instanceof Promise)
      await result;
    ScopeHelper.applyVariables(scope, mk);

    process.chdir(cwdSave);
  }

  global.addSubdirectory(scope);

  await global.doSubdirectory();
  console.info("Configuring done");

  if (scope.GLOBAL_CONTEXT_JSON) {
    const filename = scope.GLOBAL_CONTEXT_JSON.toString();
    const content = JSON.stringify(global, null, 2);
    await fs.promises.mkdir(path.dirname(filename), { recursive: true });
    await fs.promises.writeFile(filename, content, { encoding: "utf8" });
  }

  const allGoalList = global.createGoals(scope);
  const goalList = allGoalList.getTargetList(INSTALL_TARGET);

  if (scope.TARGET_GOALS_JSON) {
    const filename = scope.TARGET_GOALS_JSON.toString();
    const content = JSON.stringify(goalList, null, 2);
    await fs.promises.mkdir(path.dirname(filename), { recursive: true });
    await fs.promises.writeFile(filename, content, { encoding: "utf8" });
  }

  await GoalCollection.buildGoals(goalList);
}
