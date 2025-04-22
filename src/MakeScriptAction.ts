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
import { Scope } from "@/core/Scope";
import { GoalCollection } from "@/core/GoalCollection";
import { ToolchainContext } from "@/core/ToolchainContext";
import { getPathString }  from "@/utils/FileSystem";
import { FilePath } from "@/core/Path";
import { importModule }  from "@/utils/Module";
import SystemVariables from "@/core/SystemVariables";

const PACKAGE_JSON = "package.json";
const MAKE_CACHE = "MakeCache.json";

export async function makeScriptAction(config: any, environment: any, settings: any) {
  process.env = environment;

  let scope: any = {};
  Scope.defineVariables(scope, "system", SystemVariables);

  const sourceDir = getPathString(config.sourceDir);
  const binaryDir = getPathString(config.binaryDir);

  scope.PROJECT_SOURCE_DIR = sourceDir;
  scope.PROJECT_BINARY_DIR = binaryDir;

  scope.PACKAGE_FILE = scope.PROJECT_SOURCE_DIR.join(PACKAGE_JSON);
  scope.CACHE_FILE = scope.PROJECT_BINARY_DIR.join(MAKE_CACHE);
  scope.SOURCE_DIR = scope.PROJECT_SOURCE_DIR;
  scope.BINARY_DIR = scope.PROJECT_BINARY_DIR;

  const packageJson = await fs.promises.readFile(scope.PACKAGE_FILE.toString(), 'utf8');
  const pkg = JSON.parse(packageJson);

  scope.BUILD_TYPE = config.buildType;
  scope.PROJECT_NAME = pkg.name;
  scope.PROJECT_VERSION = pkg.version;
  scope.PROJECT_DESCRIPTION = pkg.description;
  scope.PROJECT_HOMEPAGE_URL = pkg.homepage;

  if (config.destDir)
    scope.DESTDIR = config.destDir;

  Scope.applyVariables(scope, config.variables || {});

  const global = GlobalContext.create();
  if (scope.TOOLCHAIN_FILE) {
    const toolchain = await importModule(scope.TOOLCHAIN_FILE);
    if (!toolchain.default)
      throw new Error("Toolchain module has no default export");
    const mk = ToolchainContext.create(scope, global);
    const result = toolchain.default(mk);
    if (result instanceof Promise)
      await result;
    scope = mk._scope();
    Scope.applyVariables(scope, mk);
  }

  for (const plugin of (scope.MAKE_PLUGIN_LIST || [])) {
    const filename = FilePath.create(plugin);
    const module = await importModule(filename.toString());
    if (!module.pluginEntry)
      throw new Error(`Plugin ${filename.basename()} not contain pluginEntry function`);
    const mk = PluginContext.create(scope, global);
    const result = module.pluginEntry(mk);
    if (result instanceof Promise)
      await result;
    scope = mk._scope();
    Scope.applyVariables(scope, mk);
  }

  global.addSubdirectory(scope);

  await global.doSubdirectory();
  console.info("Configuring done");

  if (scope.GLOBAL_CONTEXT_JSON) {
    const filename = scope.GLOBAL_CONTEXT_JSON.toString();
    const content = JSON.stringify(global, null, 2);
    fs.mkdirSync(path.dirname(filename), { recursive: true });
    fs.writeFileSync(filename, content, { encoding: "utf8" });
  }

  const allGoalList = global.createGoals(scope);
  const goalList = allGoalList.getTargetList("install");

  if (scope.TARGET_GOALS_JSON) {
    const filename = scope.TARGET_GOALS_JSON.toString();
    const content = JSON.stringify(goalList, null, 2);
    fs.mkdirSync(path.dirname(filename), { recursive: true });
    fs.writeFileSync(filename, content, { encoding: "utf8" });
  }

  await GoalCollection.buildGoals(goalList);
}
