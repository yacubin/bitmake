/*
 * MIT License
 *
 * Copyright (c) 2025  Yurii Yakubin (yurii.yakubin@gmail.com)
 *
 * Permission is granted to use, copy, modify, and distribute this software
 * under the MIT License. See LICENSE file for details.
 */

import fs from "node:fs";
import { Worker } from "node:worker_threads";

import { Path } from "@/utils/Path";
import { PluginContext } from "@/core/PluginContext";
import { GlobalContext } from "@/core/GlobalContext";
import { ScopeHelper, VariableMap } from "@/core/Scope";
import { ToolchainContext } from "@/core/ToolchainContext";
import { getPathString, getURLString }  from "@/utils/FileSystem";
import { AbsolutePath, DirPath, FilePath } from "@/core/Path";
import { importModule }  from "@/utils/Module";
import { determineCompiler }  from "@/core/DetermineCompiler";
import { SettingsStorage } from "@/utils/SettingsStorage";
import { IMPORT_SCHEME } from "@/utils/UrlScheme";
import { INSTALL_TARGET, PACKAGE_JSON, MAKE_CACHE } from "@/Constants";
import { requireResolve } from "@/utils/Module";
import { createLogger } from "@/logger";
import { SystemScope } from "@/core/SystemScope";
import SystemVariables from "@/core/SystemVariables";
import { currentScriptURL } from "@/utils/Module";
import { MemoryTransport } from "@/transport/MemoryTransport";

const logger = createLogger(import.meta.url);

export default async function(config: any, environment: any, settings: SettingsStorage) {
  process.env = environment;

  const variableMap: VariableMap = {};
  ScopeHelper.extendVariableMapByValues(variableMap, "", config.variables);
  ScopeHelper.defineVariablesInVariableMap(variableMap, "system", SystemVariables);
  const scope = ScopeHelper.createProxy(variableMap) as SystemScope;

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

    const ctx = new PluginContext(global, variableMap);
    const mk = ScopeHelper.createProxy(variableMap, ctx);
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
    const toolchainUrl = getURLString(scope.TOOLCHAIN_FILE.toString());
    const toolchain = await importModule(toolchainUrl);
    if (!toolchain.default)
      throw new Error("Toolchain module has no default export");
    const ctx = new ToolchainContext(global, variableMap);
    const mk = ScopeHelper.createProxy(variableMap, ctx);
    const result = toolchain.default(mk);
    if (result instanceof Promise)
      await result;
  }
  else {
    await determineCompiler(scope);
  }

  if (config.sourceUrl && config.sourceUrl.startsWith(IMPORT_SCHEME)) {
    const scriptFile = requireResolve(config.sourceUrl.slice(IMPORT_SCHEME.length));
    scope.SCRIPT_FILE = AbsolutePath.create(scriptFile);
    scope.SCRIPT_DIR = scope.SCRIPT_FILE.dirname();
  }

  const worker = new Worker(currentScriptURL(), { workerData: "DATA" });
  const buffer = new SharedArrayBuffer(1024);
  worker.postMessage({
    jsonrpc: "2.0",
    method: "PostMessage.buffer",
    params: buffer,
    id: 1,
  });
  worker.postMessage({
    jsonrpc: "2.0",
    method: "Module.import",
    params: "/mnt/c/opt/work/source/darkit-sdk/external/wasmux/MakeScript.mjs",
    id: 2,
  });
  worker.on("message", (message) => {
    logger.info(">>> Worker Message", message);
    if (message instanceof SharedArrayBuffer) {
      const memory = new MemoryTransport.Buffer(message);
      const json = memory.get();
      logger.info(">>> json", json);
      if (json.method === "System.wait") {
        setTimeout(() => {
          logger.info(">>> notify", json);
          memory.set({ result: null }, true);
        }, json.params);
      }
    }
  });
  worker.on("error", (e) => {
    if (e instanceof Error)
      console.error(e.stack);
    else
      console.error(e);
    process.exit(1);
  });
  worker.on("exit", (code: number) => {
    if (code)
      process.exit(code);
  });

  global.addSubdirectory(variableMap, "work", scope.PROJECT_SOURCE_DIR, scope.PROJECT_BINARY_DIR);

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
