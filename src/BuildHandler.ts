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

import * as cmake from "@/cmake";
import { makePatch } from "@/utils/MakePatch";
import { saveIfDifferent, directoryExists, getPathString } from "@/utils/FileSystem";
import { SettingsStorage } from "@/utils/SettingsStorage";
import { spawnAsync } from "@/utils/ChildProcess";
import { makeScriptAction } from "@/MakeScriptAction";
import { arrayWrapper, assignObject } from "@/utils/Primitives";
import { BUILD_SETTINGS_FILE, REQUEST_ATTEMPTS } from "@/Constants";
import { requireResolve } from "@/utils/Module";
import { requestGet } from "@/utils/HttpRequest";
import { RunScriptContext } from "@/RunScriptContext";
import { createLogger } from "@/logger";

const logger = createLogger(import.meta.url);

function mergeEnvironment(...args: any) {
  const environment: any = {};
  for (const env of args) {
    const list: any = Object.entries(env || {});
    while (list.length) {
      let [key,val] = list.pop();
      let delimiter;
      let joinAfter = true;
      switch (key) {
      case "PATH":
        delimiter = path.delimiter;
        joinAfter = false;
        break;
      case "CFLAGS":
      case "CXXFLAGS":
      case "LDFLAGS":
        delimiter = " ";
        break;
      }
      if (typeof val === 'number')
        val = val.toString();
      else if (Array.isArray(val))
        val = val.join(delimiter);
      if (!delimiter || !environment[key])
        environment[key] = val;
      else if (joinAfter)
        environment[key] = val + delimiter + environment[key];
      else
        environment[key] = environment[key] + delimiter + val;
    }
  }
  return environment;
}

function rebaseConfig(config: any) {
  const baseConfig: any = {};
  const otherConfig: any = {};

  for (const [key, entry] of Object.entries(config) as any) {
    (entry.base ? otherConfig : baseConfig)[key] = entry;
  }

  while (true) {
    const keys = Object.keys(otherConfig);
    if (keys.length == 0)
      break;
    const doneKeys = [];
    for (const key of keys) {
      const otherIter = otherConfig[key];
      const baseList = [];
      for (const iter of arrayWrapper(otherIter.base)) {
        const baseEntry = baseConfig[iter];
        if (!baseEntry) {
          baseList.length = 0;
          break;
        }
        baseList.push(baseEntry);
      }
      if (baseList.length) {
        baseList.push(otherIter);
        let newEntry = {};
        for (const iter of baseList) {
          assignObject(newEntry, iter);
        }
        baseConfig[key] = newEntry;
        doneKeys.push(key);
      }
    }
    if (doneKeys.length == 0) {
      for (const key of keys)
        throw `Can't set base config for "${key}`;
    }
    for (const key of doneKeys) {
      delete baseConfig[key].base;
      delete otherConfig[key];
    }
  }

  return baseConfig;
}

function resolveStringWithVariable(config: any, entryConfig: any, rootConfig: any, val: any) {
  return val.replace(/\$\{([^}]+)\}/g, (match: any, value: any) => {
    let sel;
    for (const name of value.split(".")) {
      if (sel === undefined) {
        if (config.hasOwnProperty(name)) {
          sel = config[name];
        }
        else if (config !== entryConfig && entryConfig.hasOwnProperty(name)) {
          sel = entryConfig[name];
        }
        else if (config !== rootConfig && rootConfig.hasOwnProperty(name)) {
          sel = rootConfig[name];
        }
        else {
          try {
            const mainFile = requireResolve(name);
            if (mainFile) {
              sel = { mainFile, mainDir: path.posix.dirname(mainFile), };
            }
          } catch(e) {}
        }
        if (sel === undefined)
          break;
      }
      else if (sel.hasOwnProperty(name)) {
        sel = sel[name];
      }
      else {
        sel = undefined;
        break;
      }
    }
    if (sel === undefined)
      throw new Error(`The ${value} variable does not exist"`);
    return sel;
  });
}

function resolveConfigStringsImpl(config: any, entryConfig: any, rootConfig: any) {
  let count = 0;
  for (const [key, val] of Object.entries(config)) {
    if (val && typeof val === "object")
      count += resolveConfigStringsImpl(val, entryConfig, rootConfig);
    else if (typeof val === "string") {
      const v = resolveStringWithVariable(config, entryConfig, rootConfig, val);
      if (val !== v) {
        config[key] = v;
        count++;
      }
    }
  }
  return count;
}

function resolveConfigStrings(config: any) {
  for (;;) {
    let count = 0;
    for (const [key, val] of Object.entries(config)) {
      if (val && typeof val === "object")
        count += resolveConfigStringsImpl(val, val, config);
      else  if (typeof val === "string") {
        const v = resolveStringWithVariable(config, config, config, val);
        if (val !== v) {
          config[key] = v;
          count++;
        }
      }
    }
    if (!count)
      break;
  }
}

function makeBuildConfig(ctx: any, config: any) {
  for (const key of [ "sourceRoot", "wasmuxDir" ]) {
    if (config[key]) {
      throw new Error(`The ${key} variable cannot be changed to "${config.sourceRoot}"`);
    }
  }

  const rootConfig = rebaseConfig(config);

  rootConfig.buildType = rootConfig.buildType || ctx.buildType;
  rootConfig.sourceRoot = rootConfig.sourceRoot || ctx.workDir;
  rootConfig.binaryRoot = rootConfig.binaryRoot || path.posix.resolve(ctx.workDir,"build");

  for (const [key, entry] of Object.entries(rootConfig) as any) {
    if (entry && typeof entry === "object" && entry.action) {
      entry.buildType = entry.buildType || rootConfig.buildType;
      const folder = key.replace(":", path.posix.sep);
      const workDir = path.posix.join(rootConfig.binaryRoot, folder);
      entry.tempDir = entry.tempDir || path.posix.join(workDir, "tmp");
      if (entry.sourceUrl) {
        entry.archiveDir = entry.archiveDir || path.posix.join(workDir, "arc");
        entry.extractDir = entry.extractDir || path.posix.join(workDir, "src");
        if (!entry.sourceDir)
          entry.sourceDir = entry.extractDir;
        else if (!path.isAbsolute(entry.sourceDir))
          entry.sourceDir = path.posix.join(entry.extractDir, entry.sourceDir);
      }
      else if (!entry.sourceDir) {
        throw new Error(`Missing sourceDir for ${key} action"`);
      }
      if (entry.binaryDir === null)
        entry.binaryDir = entry.sourceDir;
      else if (entry.binaryDir === undefined)
        entry.binaryDir = path.posix.join(workDir, "bin");
    }
  }

  resolveConfigStrings(rootConfig);

  return rootConfig;
}

async function tryRequestGet(sourceUrl: string, arcFile: string, attempts: number) {
  for(;;) {
    try {
      const buffer = await requestGet(sourceUrl);
      await fs.promises.writeFile(arcFile, buffer);
      return;
    }
    catch (e) {
      if (--attempts < 0) {
        throw e;
      }
      console.warn(e);
    }
  }
}

async function doExtractArchive(ctx: RunScriptContext, environment: any, config: any, settings: any)
{
  if (!config.sourceUrl)
    throw new Error("Unknown sourceUrl");
  if (!config.archiveDir)
    throw new Error("Unknown archiveDir");
  if (!config.extractDir)
    throw new Error("Unknown extractDir");

  if (!await directoryExists(config.archiveDir)) {
    console.log(`mkdir -p ${config.archiveDir}`);
    await fs.promises.mkdir(config.archiveDir, { recursive: true });
  }

  if (!await directoryExists(config.tempDir)) {
    console.log(`mkdir -p ${config.tempDir}`);
    await fs.promises.mkdir(config.tempDir, { recursive: true });
  }

  const arcName = path.basename(config.sourceUrl);

  let arcFile;
  let downloadUrls = await settings.get("downloadUrls") || {};
  if (downloadUrls[config.sourceUrl])
    arcFile = downloadUrls[config.sourceUrl];
  else {
    arcFile = path.join(config.archiveDir, arcName);
    await tryRequestGet(config.sourceUrl, arcFile, REQUEST_ATTEMPTS);
    downloadUrls[config.sourceUrl] = arcFile;
    await settings.set("downloadUrls", downloadUrls);
  }

  let extractDir;
  let extractFiles = await settings.get("extractFiles") || {};
  if (extractFiles[arcFile]) {
    extractDir = extractFiles[arcFile];
  }
  else {
    extractDir = await fs.promises.mkdtemp(path.resolve(config.tempDir, arcName + '.'));
  
    await cmake.extract({
      environment,
      filename: arcFile,
      workDir: extractDir,
      logFile:  path.join(config.tempDir, path.basename(extractDir) + ".log"),
    });
  
    const extractList = await fs.promises.readdir(extractDir);
    if (extractList.length === 1) {
      extractDir = path.resolve(extractDir, extractList[0]);
      if (!await directoryExists(extractDir)) {
        console.log(`rm -fr ${extractDir}`);
        await fs.promises.rm(extractDir, { recursive: true });
        throw new Error(`Support only directory for archive`);
      }
    }
  
    if (await directoryExists(config.extractDir)) {
      // TODO: Marge extractDir with output
      console.log(`rm -fr ${config.extractDir}`);
      await fs.promises.rm(config.extractDir, { recursive: true });
    }
    else {
      const parentDir = path.dirname(config.extractDir);
      if (!await directoryExists(parentDir)) {
        console.log(`mkdir -p ${parentDir}`);
        await fs.promises.mkdir(parentDir, { recursive: true }); 
      }
    }
  
    console.log(`mv ${extractDir} ${config.extractDir}`);
    await fs.promises.rename(extractDir, config.extractDir);
  
    extractFiles[arcFile] = extractDir;
    await settings.set("extractFiles", extractFiles);
  }

  if (config.patchDir) {
    let patchDirs = await settings.get("patchDirs") || {};
    if (!patchDirs[config.patchDir]) {
      await makePatch(config.patchDir, config.extractDir);
      patchDirs[config.patchDir] = config.extractDir;
      await settings.set("patchDirs", patchDirs);
    }
  }
}

const actionHandlers: any = {
  none: async (config: any, environment: any, settings: any) => {
    /* do nothing */
  },
  cmake: async (config: any, environment: any, settings: any) => {
    const sourceDir = getPathString(config.sourceDir);
    const binaryDir = getPathString(config.binaryDir);
    const cmakeArgs = {
      environment: {
        ...environment,
        DESTDIR: config.destDir,
      },
      generator: config.generator || "Unix Makefiles",
      cacheVariables: config.cacheVariables,
      sourceDir,
      binaryDir,
    };

    if (!cmakeArgs.cacheVariables.CMAKE_BUILD_TYPE) {
      cmakeArgs.cacheVariables.CMAKE_BUILD_TYPE = config.buildType;
    }

    await cmake.configure(cmakeArgs);
    await cmake.build(cmakeArgs);
    await cmake.install(cmakeArgs);
  },
  configure: async (config: any, environment: any, settings: any) => {
    const sourceDir = getPathString(config.sourceDir);
    const binaryDir = getPathString(config.binaryDir);
    let step = await settings.get("configure") || "config";
    if (step === "config") {
      const command = path.resolve(sourceDir, "configure");
      const params = [];
      if (Array.isArray(config.variables)) {
        for (const iter of config.variables)
          params.push(iter);
      }
      else if (config.variables) {
        for (const [key,val] of Object.entries(config.variables)) {
          if (key === "features" && Array.isArray(val)) {
            for (const iter of val)
              params.push(`--${iter}`);
          }
          else if (val === null)
            params.push(`--${key}`);
          else
            params.push(`--${key}=${val}`);
        }
      }
      if (config.features) {
        for (const key of config.features)
          params.push(`--${key}`);
      }
      const res1 = await spawnAsync(command, params, {
        cwd: binaryDir,
        env: environment,
        extra: {
          output: `ac.config.log`,
        },
      });
      if (res1.status !== 0) {
        throw new Error(`configure returned status ${res1.status}`);
      }
      step = "install";
      await settings.set("configure", step);
    }
    if (step === "install") {
      const args = [ 'install' ];
      if (config.destDir) {
        args.push(`DESTDIR=${config.destDir}`);
      }
      const res2 = await spawnAsync("make", args, {
        cwd: binaryDir,
        env: environment,
        extra: {
          output: `ac.build.log`,
        },
      });
      if (res2.status !== 0) {
        throw new Error(`make returned status ${res2.status}`);
      }
      step = "done";
      await settings.set("configure", step);
    }
  },
  make: async (config: any, environment: any, settings: any) => {
    const binaryDir = getPathString(config.binaryDir);
    const args = config.args || [];
    if (config.destDir) {
      args.push(`DESTDIR=${config.destDir}`);
    }
    const res2 = await spawnAsync("make", args, {
      cwd: binaryDir,
      env: environment,
      extra: {
        output: `make.log`,
      },
    });
    if (res2.status !== 0) {
      throw new Error(`make returned status ${res2.status}`);
    }
  },
  process: async (config: any, environment: any, settings: any) => {
    if (!config.command)
      throw new Error("Required command field for process action");
    const sourceDir = getPathString(config.sourceDir);
    const binaryDir = getPathString(config.binaryDir);
    let { command } = config;
    if (!path.isAbsolute(command) && (command.includes(path.posix.delimiter) || command.includes(path.win32.delimiter))) {
      command = path.resolve(sourceDir, command);
    }
    const res = await spawnAsync(command, config.args || [], {
      cwd: binaryDir,
      env: environment,
      extra: {
        output: `process.log`,
      },
    });
    if (res.status !== 0) {
      throw new Error(`process returned status ${res.status}`);
    }
  },
  bitmake: makeScriptAction,
};

async function doTargetBuild(ctx: RunScriptContext, environment: any, config: any, settings: any) {
  if (config.preAction) {
    await settings.push("preAction");
    const newConfig: any = {};
    assignObject(newConfig, config);
    delete newConfig.action;
    delete newConfig.preAction;
    delete newConfig.postAction;
    assignObject(newConfig, config.preAction);
    const newEnvironment = mergeEnvironment(config.preAction.environment, environment);
    await doTargetBuild(ctx, newEnvironment, newConfig, settings);
    await settings.pop();
  }

  if (Array.isArray(config.action)) {
    await settings.push("action");
    for (var i = 0; i < config.action.length; ++i) {
      await settings.push(i);
      const newConfig: any = {};
      assignObject(newConfig, config);
      delete newConfig.action;
      delete newConfig.preAction;
      delete newConfig.postAction;
      assignObject(newConfig, config.action[i]);
      const newEnvironment = mergeEnvironment(config.action[i].environment, environment);
      await doTargetBuild(ctx, newEnvironment, newConfig, settings);
      await settings.pop();
    }
    await settings.pop();
  }
  else {
    if (!await directoryExists(config.binaryDir)) {
      await fs.promises.mkdir(config.binaryDir, { recursive: true });
    }
    if (actionHandlers[config.action]) {
      config.description && console.log(config.description);
      await actionHandlers[config.action](config, environment, settings);
    }
  }

  if (config.postAction) {
    await settings.push("postAction");
    const newConfig: any = {};
    assignObject(newConfig, config);
    delete newConfig.action;
    delete newConfig.preAction;
    delete newConfig.postAction;
    assignObject(newConfig, config.postAction);
    const newEnvironment = mergeEnvironment(config.postAction.environment, environment);
    await doTargetBuild(ctx, newEnvironment, newConfig, settings);
    await settings.pop();
  }
}

export default async (options: any) => {
  const ctx = new RunScriptContext(options);
  const userConfig = await ctx.getUserConfig();
  const buildConfig = makeBuildConfig(ctx, userConfig);

  if (buildConfig.RECIPE_CONTENT_FILE) {
    const jsonConfig = JSON.stringify(buildConfig, null, 2);
    await saveIfDifferent(buildConfig.RECIPE_CONTENT_FILE, jsonConfig);
  }

  const settingsFilename = path.resolve(buildConfig.binaryRoot, BUILD_SETTINGS_FILE);
  const settings = new SettingsStorage(settingsFilename);

  for (const [key, entry] of Object.entries(buildConfig) as any) {
    if (entry && typeof entry === "object" && entry.action && !entry.disabled) {
      await settings.push(key);
      const completed = await settings.get("completed");
      if (entry.rebuild || !completed) {
        logger.info(`Started action: ${key}`);
        const environment = mergeEnvironment(entry.environment, process.env);
        if (entry.sourceUrl) {
          await doExtractArchive(ctx, environment, entry, settings);
        }
        await doTargetBuild(ctx, environment, entry, settings);
        await settings.set("completed", true);
        logger.info(`Completed action: ${key}`);
      }
      await settings.pop();
    }
  }
}
