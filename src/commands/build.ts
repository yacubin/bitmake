/*
 * MIT License
 *
 * Copyright (c) 2025  Yurii Yakubin (yurii.yakubin@gmail.com)
 *
 * Permission is granted to use, copy, modify, and distribute this software
 * under the MIT License. See LICENSE file for details.
 */

import fs from "node:fs";

import cmake from "@/cmake";
import { Path } from "@/utils/Path";
import { makePatch } from "@/utils/MakePatch";
import { saveIfDifferent, directoryExists } from "@/utils/FileSystem";
import { SettingsStorage } from "@/utils/SettingsStorage";
import { arrayWrapper, assignObject } from "@/utils/Primitives";
import { USER_CONFIG, BUILD_SETTINGS_FILE, REQUEST_ATTEMPTS } from "@/Constants";
import { DEBUG_BUILD_TYPE, RELEASE_BUILD_TYPE } from "@/core/Types";
import { requireResolve } from "@/utils/Module";
import { downloadFile } from "@/utils/HttpRequest";
import { CommandOptions } from "@/core/CommandOptions";
import { createLogger } from "@/logger";
import { fileExists } from "@/utils/FileSystem";
import { importModule } from "@/utils/Module";

import { bitmakeAction } from "@/core/BitMakeAction";
import { cmakeAction } from "@/core/CMakeAction";
import { makeAction } from "@/core/MakeAction";
import { processAction } from "@/core/ProcessAction";
import { configureAction } from "@/core/ConfigureAction";

const logger = createLogger(import.meta.url);

interface IGeneralConfig {
  workDir: string;
  buildType: string;
};

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
        delimiter = Path.delimiter;
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
              sel = { mainFile, mainDir: Path.dirname(mainFile), };
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

function makeBuildConfig(gconfig: IGeneralConfig, config: any) {
  if (config["sourceRoot"]) {
    throw new Error(`Variable "sourceRoot" cannot be changed to "${config.sourceRoot}"`);
  }

  const rootConfig = rebaseConfig(config);

  rootConfig.buildType = rootConfig.buildType || gconfig.buildType;
  rootConfig.sourceRoot = rootConfig.sourceRoot || gconfig.workDir;
  rootConfig.binaryRoot = rootConfig.binaryRoot || Path.join(gconfig.workDir, "build");

  for (const [key, entry] of Object.entries(rootConfig) as any) {
    if (entry && typeof entry === "object" && entry.action) {
      entry.buildType = entry.buildType || rootConfig.buildType;
      const folder = key.replace(":", Path.sep);
      const workDir = Path.join(rootConfig.binaryRoot, folder);
      entry.tempDir = entry.tempDir || Path.join(workDir, "tmp");
      if (entry.sourceUrl) {
        entry.archiveDir = entry.archiveDir || Path.join(workDir, "arc");
        entry.extractDir = entry.extractDir || Path.join(workDir, "src");
        if (!entry.sourceDir)
          entry.sourceDir = entry.extractDir;
        else if (!Path.isAbsolute(entry.sourceDir))
          entry.sourceDir = Path.join(entry.extractDir, entry.sourceDir);
      }
      else if (!entry.sourceDir) {
        throw new Error(`Missing sourceDir for ${key} action"`);
      }
      if (entry.binaryDir === null)
        entry.binaryDir = entry.sourceDir;
      else if (entry.binaryDir === undefined)
        entry.binaryDir = Path.join(workDir, "bin");
    }
  }

  resolveConfigStrings(rootConfig);

  return rootConfig;
}

async function doExtractArchive(gconfig: IGeneralConfig, environment: any, config: any, settings: any) {
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

  const arcName = Path.basename(config.sourceUrl);

  let arcFile;
  let downloadUrls = await settings.get("downloadUrls") || {};
  if (downloadUrls[config.sourceUrl])
    arcFile = downloadUrls[config.sourceUrl];
  else {
    arcFile = Path.join(config.archiveDir, arcName);
    await downloadFile(config.sourceUrl, arcFile, { attempts: REQUEST_ATTEMPTS });
    downloadUrls[config.sourceUrl] = arcFile;
    await settings.set("downloadUrls", downloadUrls);
  }

  let extractDir;
  let extractFiles = await settings.get("extractFiles") || {};
  if (extractFiles[arcFile]) {
    extractDir = extractFiles[arcFile];
  }
  else {
    extractDir = await fs.promises.mkdtemp(Path.resolve(config.tempDir, arcName + '.'));
  
    await cmake.extract({
      environment,
      filename: arcFile,
      workDir: extractDir,
      logFile:  Path.join(config.tempDir, Path.basename(extractDir) + ".log"),
    });
  
    const extractList = await fs.promises.readdir(extractDir);
    if (extractList.length === 1) {
      extractDir = Path.resolve(extractDir, extractList[0]);
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
      const parentDir = Path.dirname(config.extractDir);
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
  none: async (config: any, environment: any, settings: SettingsStorage) => {
    /* do nothing */
  },
  cmake: cmakeAction,
  configure: configureAction,
  make: makeAction,
  process: processAction,
  bitmake: bitmakeAction,
};

async function doTargetBuild(gconfig: IGeneralConfig, environment: any, config: any, settings: SettingsStorage) {
  if (config.preAction) {
    await settings.push("preAction");
    const newConfig: any = {};
    assignObject(newConfig, config);
    delete newConfig.action;
    delete newConfig.preAction;
    delete newConfig.postAction;
    assignObject(newConfig, config.preAction);
    const newEnvironment = mergeEnvironment(config.preAction.environment, environment);
    await doTargetBuild(gconfig, newEnvironment, newConfig, settings);
    await settings.pop();
  }

  if (Array.isArray(config.action)) {
    await settings.push("action");
    for (var i = 0; i < config.action.length; ++i) {
      await settings.push(i.toString());
      const newConfig: any = {};
      assignObject(newConfig, config);
      delete newConfig.action;
      delete newConfig.preAction;
      delete newConfig.postAction;
      assignObject(newConfig, config.action[i]);
      const newEnvironment = mergeEnvironment(config.action[i].environment, environment);
      await doTargetBuild(gconfig, newEnvironment, newConfig, settings);
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
    await doTargetBuild(gconfig, newEnvironment, newConfig, settings);
    await settings.pop();
  }
}

async function getUserConfig(options: CommandOptions) {
  let configPath;
  if (options.env.config) {
    configPath = Path.isAbsolute(options.env.config) ? options.env.config : Path.resolve(options.workDir, options.env.config);
    if (!await fileExists(configPath))
      throw `Configuration '${options.env.config}' file does not exist`;
  }
  else {
    const userConfigPath = Path.resolve(options.workDir, USER_CONFIG);
    if (await fileExists(userConfigPath))
      configPath = userConfigPath;
    else {
      logger.warn(`Config file '${USER_CONFIG}' is not available`);
    }
  }

  if (!configPath) {
    return {
      "bundle:output": {
        action: "bitmake",
        variables: {
          INSTALL_PREFIX: "/usr",
        },
        sourceDir: "${sourceRoot}",
        destDir: "${binaryRoot}/output",
      }
    };
  }

  const configUrl = Path.toFileURL(configPath);
  const configModule = await importModule(configUrl);
  switch (typeof configModule.default) {
  case "function":
    const userConfig = configModule.default(options.env, {});
    if (userConfig instanceof Promise)
      return await userConfig;
    return userConfig;

  case "object":
    return configModule.default;

  default:
    throw new Error(`Unknown user configuration type`);
  }
}

export default async (options: CommandOptions) => {
  const gconfig: IGeneralConfig = {
    buildType: options.env.buildType == DEBUG_BUILD_TYPE ? options.env.buildType : RELEASE_BUILD_TYPE,
    workDir: options.workDir,
  };

  const userConfig = await getUserConfig(options);
  const buildConfig = makeBuildConfig(gconfig, userConfig);

  if (buildConfig.RECIPE_CONTENT_FILE) {
    const jsonConfig = JSON.stringify(buildConfig, null, 2);
    await saveIfDifferent(buildConfig.RECIPE_CONTENT_FILE, jsonConfig);
  }

  const settingsFilename = Path.resolve(buildConfig.binaryRoot, BUILD_SETTINGS_FILE);
  const settings = new SettingsStorage(settingsFilename);

  for (const [key, entry] of Object.entries(buildConfig) as any) {
    if (entry && typeof entry === "object" && entry.action && !entry.disabled) {
      await settings.push(key);
      const completed = await settings.get("completed");
      if (entry.rebuild || !completed) {
        logger.info(`Started action: ${key}`);
        const environment = mergeEnvironment(entry.environment, process.env);
        if (entry.sourceUrl) {
          await doExtractArchive(gconfig, environment, entry, settings);
        }
        await doTargetBuild(gconfig, environment, entry, settings);
        await settings.set("completed", true);
        logger.info(`Completed action: ${key}`);
      }
      await settings.pop();
    }
  }
}
