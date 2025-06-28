/*
 * MIT License
 *
 * Copyright (c) 2025  Yurii Yakubin (yurii.yakubin@gmail.com)
 *
 * Permission is granted to use, copy, modify, and distribute this software
 * under the MIT License. See LICENSE file for details.
 */

import fs from "node:fs";

import { Path } from "@/utils/Path";
import { PluginContext } from "@/core/PluginContext";
import { GlobalContext } from "@/core/GlobalContext";
import { ScopeHelper } from "@/core/Scope";
import { ToolchainContext } from "@/core/ToolchainContext";
import { getPathString, getURLString }  from "@/utils/FileSystem";
import { AbsolutePath, DirPath, FilePath } from "@/core/Path";
import { importModule }  from "@/utils/Module";
import { determineCompiler }  from "@/core/DetermineCompiler";
import { SettingsStorage } from "@/utils/SettingsStorage";
import { IMPORT_SCHEME } from "@/utils/UrlScheme";
import { INSTALL_TARGET, PACKAGE_JSON, MAKE_CACHE } from "@/Constants";
import { requireResolve } from "@/utils/Module";
import { createWorker } from "@/utils/Worker";
import { createLogger } from "@/logger";

const logger = createLogger(import.meta.url);

export default async function(config: any, environment: any, settings: SettingsStorage) {
  process.env = environment;

  const scope = ScopeHelper.create(config.variables);

  const sourceDir = getPathString(config.sourceDir);
  const binaryDir = getPathString(config.binaryDir);

  scope.PROJECT_SOURCE_DIR = DirPath.create(sourceDir);
  scope.PROJECT_BINARY_DIR = DirPath.create(binaryDir);

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

  const global = GlobalContext.create();
  if (scope.TOOLCHAIN_FILE) {
    const toolchainUrl = getURLString(scope.TOOLCHAIN_FILE.toString());
    const toolchain = await importModule(toolchainUrl);
    if (!toolchain.default)
      throw new Error("Toolchain module has no default export");
    const variableMap = ScopeHelper.getVariableMap(scope);
    const ctx = new ToolchainContext(global, variableMap);
    const mk = ScopeHelper.createProxy(ScopeHelper.getVariableMap(scope), ctx);
    const result = toolchain.default(mk);
    if (result instanceof Promise)
      await result;
  }
  else {
    await determineCompiler(scope);
  }

  for (const plugin of (scope.MAKE_PLUGIN_LIST || [])) {
    const cwdSave = process.cwd();

    scope.SCRIPT_FILE = FilePath.create(plugin);
    scope.SCRIPT_DIR = scope.SCRIPT_FILE.dirname();
    scope.SOURCE_DIR = scope.SCRIPT_DIR;

    const binaryDir1 = scope.PROJECT_BINARY_DIR.relative(sourceDir);
    const binaryDir2 = scope.PROJECT_SOURCE_DIR.relative(sourceDir);
    const binaryDir = (binaryDir2.length < binaryDir1.length ? binaryDir2 : binaryDir1).replace("../", "__/");
    scope.BINARY_DIR = scope.PROJECT_BINARY_DIR.join("MakePluginBinaries", binaryDir);

    process.chdir(scope.SOURCE_DIR.toString());
    const pluginUrl = getURLString(scope.SCRIPT_FILE.toString());
    const module = await importModule(pluginUrl);
    
    if (!module.default)
      throw new Error(`Plugin ${scope.SCRIPT_FILE.basename()} not contain default export`);

    const variableMap = ScopeHelper.getVariableMap(scope);
    const ctx = new PluginContext(global, variableMap);
    const mk = ScopeHelper.createProxy(ScopeHelper.getVariableMap(scope), ctx);
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

  if (config.sourceUrl && config.sourceUrl.startsWith(IMPORT_SCHEME)) {
    const scriptFile = requireResolve(config.sourceUrl.slice(IMPORT_SCHEME.length));
    scope.SCRIPT_FILE = AbsolutePath.create(scriptFile);
    scope.SCRIPT_DIR = scope.SCRIPT_FILE.dirname();
  }

  const worker = createWorker();
  worker.postMessage({
    type: "hello",
  });

  worker.on("message", (message) => {
    logger.info(">>> Worker Message", message);

  });
  worker.on("error", (error) => {
    logger.info(">>> Worker Error", error);

  });
  worker.on('exit', (code) => {
    logger.info(">>> Worker Exit", code);
  });

  global.addSubdirectory(ScopeHelper.getVariableMap(scope), "work", scope.PROJECT_SOURCE_DIR, scope.PROJECT_BINARY_DIR);

  await global.doSubdirectory();
  logger.info("Configuring done");

  if (scope.GLOBAL_CONTEXT_JSON) {
    const filename = scope.GLOBAL_CONTEXT_JSON.toString();
    const content = JSON.stringify(global, null, 2);
    await fs.promises.mkdir(Path.dirname(filename), { recursive: true });
    await fs.promises.writeFile(filename, content, { encoding: "utf8" });
  }

  const allGoalList = global.createGoals(scope);
  const goalList = allGoalList.getTargetList(INSTALL_TARGET);

  if (scope.TARGET_GOALS_JSON) {
    const filename = scope.TARGET_GOALS_JSON.toString();
    const content = JSON.stringify(goalList, null, 2);
    await fs.promises.mkdir(Path.dirname(filename), { recursive: true });
    await fs.promises.writeFile(filename, content, { encoding: "utf8" });
  }

  let loaded = 0;
  const total = goalList.length;
  for (const goal of goalList) {
    goal.updateProgress({ loaded, total });
    await goal.doWork();
    loaded++;
  }
}
