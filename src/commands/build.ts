/*
 * MIT License
 *
 * Copyright (c) 2025-2026  Yurii Yakubin (yurii.yakubin@gmail.com)
 *
 * Permission is granted to use, copy, modify, and distribute this software
 * under the MIT License. See LICENSE file for details.
 */

import fs from "node:fs";
import crypto from "node:crypto";

import { CMakeProcess } from "@/cmake";
import { Path } from "@/utils/Path";
import { makePatch } from "@/utils/MakePatch";
import { saveIfDifferent, directoryExists, fileExists, FileSystem } from "@/utils/FileSystem";
import { SettingsStorage } from "@/utils/SettingsStorage";
import { arrayWrapper, assignObject } from "@/utils/Primitives";
import { USER_CONFIG, BUILD_SETTINGS_FILE, REQUEST_ATTEMPTS } from "@/Constants";
import { DEBUG_BUILD_TYPE, RELEASE_BUILD_TYPE } from "@/core/Types";
import { IMPORT_SCHEME } from "@/utils/UrlScheme";
import { requireResolve } from "@/utils/Module";
import { downloadFile } from "@/utils/HttpRequest";
import { CommandOptions } from "@/core/CommandOptions";
import { Logger } from "@/utils/Logger";
import { loadJSValue } from "@/utils/JSValue";
import { importModule } from "@/utils/Module";
import { Locator } from "@/utils/Locator";
import { deepCopy } from "@/utils/Primitives";

import actions from "@/actions";

const logger = Logger.create(import.meta.url);

interface IGeneralConfig {
  workDir: Locator;
  buildType: string;
  configArg?: string;
};

interface BmkNode {
  name: string;
  root: BmkRoot;
  originConfig: any;
  workConfig: any;
};

class BmkRoot {
  private _children = new Map<string, BmkNode>;
  private _buildType: string;
  private _sourceRoot: Locator;
  private _binaryRoot: Locator;

  public constructor(buildType: string, sourceRoot: Locator, binaryRoot: Locator) {
    this._buildType = buildType;
    this._sourceRoot = sourceRoot;
    this._binaryRoot = binaryRoot;
  }

  public static create(buildType: string, sourceRoot: Locator, binaryRoot: Locator, config: any): BmkRoot {
    const root = new BmkRoot(buildType, sourceRoot, binaryRoot);

    for (const [name, originConfig] of Object.entries(config) as any) {
      const workConfig = deepCopy(originConfig);
      root._children.set(name, { name, root, originConfig, workConfig });
    }

    return root;
  }

  public get buildType(): string {
    return this._buildType;
  }

  public get sourceRoot(): Locator {
    return this._sourceRoot;
  }

  public get binaryRoot(): Locator {
    return this._binaryRoot;
  }

  public getNode(name: string) {
    return this._children.get(name);
  }

  public hasNode(name: string) {
    return this._children.has(name);
  }

  public nodeEntries() {
    return this._children.entries();
  }

  public rebaseNodes() {
    const baseConfig: any = {};
    const otherConfig: any = {};

    for (const [key, entry] of this._children) {
      (entry.workConfig.base ? otherConfig : baseConfig)[key] = entry.workConfig;
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

    for (const [name, config] of Object.entries(baseConfig)) {
      const entry = this._children.get(name) as BmkNode;
      entry.workConfig = config;
    }
  }
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
      case "Path":
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

interface Environment {
  [name: string]: boolean | number | string | string[];
};

async function resolveEnvironment(environment: Environment | string): Promise<Environment> {
  if (typeof environment !== "string")
    return environment;

  const envFile = Locator.create(environment);
  return loadJSValue(envFile);
}

function resolveStringWithVariable(val: string, parentConfigs: any[]) {
  return val.replace(/\$\{([^}]+)\}/g, (match: string, value: string) => {
    let sel;
    for (const name of value.split(".")) {
      if (sel === undefined) {
        for (const iter of parentConfigs) {
          if (iter.hasOwnProperty(name)) {
            sel = iter[name];
            break;
          }
        }
        if (sel === undefined) {
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

function resolveConfigStringsImpl(config: any, parentConfigs: any[]) {
  let count = 0;
  parentConfigs = [ config, ...parentConfigs ];
  for (const [key, val] of Object.entries(config)) {
    if (val && typeof val === "object")
      count += resolveConfigStringsImpl(val, parentConfigs);
    else if (typeof val === "string") {
      const v = resolveStringWithVariable(val, parentConfigs);
      if (val !== v) {
        config[key] = v;
        count++;
      }
    }
  }
  return count;
}

function resolveConfigStrings(config: any, parentConfigs: any[]) {
  while (resolveConfigStringsImpl(config, parentConfigs) != 0)
    /* */;
}

function makeBuildConfig(bmkRoot: BmkRoot) {
  const sourceRootNode = bmkRoot.getNode("sourceRoot");
  if (sourceRootNode) {
    throw new Error(`Variable "sourceRoot" cannot be changed to "${sourceRootNode}"`);
  }

  bmkRoot.rebaseNodes();

  const rootConfig: any = {};
  for (const [name, entry] of bmkRoot.nodeEntries()) {
    rootConfig[name] = entry.workConfig;
  }

  rootConfig.buildType = rootConfig.buildType || bmkRoot.buildType;
  rootConfig.sourceRoot = rootConfig.sourceRoot || bmkRoot.sourceRoot.toPath();
  rootConfig.binaryRoot = rootConfig.binaryRoot || bmkRoot.binaryRoot.toPath();

  for (const [key, entry] of Object.entries(rootConfig) as any) {
    if (entry && typeof entry === "object" && entry.action) {
      entry.buildType = entry.buildType || rootConfig.buildType;
      const folder = key.replace(":", Path.sep);
      const workDir = Path.join(rootConfig.binaryRoot, folder);
      if (entry.sourceUrl) {
        if (typeof entry.sourceUrl === "string" && entry.sourceUrl.startsWith(IMPORT_SCHEME)) {
          const filename = requireResolve(entry.sourceUrl.slice(IMPORT_SCHEME.length));
          entry.sourceDir = Path.dirname(filename);
        }
        else {
          entry.bitmakeDir = entry.bitmakeDir || Path.join(rootConfig.binaryRoot, ".bitmake");
          entry.extractDir = entry.extractDir || Path.join(workDir, "src");
          if (!entry.sourceDir)
            entry.sourceDir = entry.extractDir;
          else if (!Path.isAbsolute(entry.sourceDir))
            entry.sourceDir = Path.join(entry.extractDir, entry.sourceDir);
        }
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

  resolveConfigStrings(rootConfig, []);
  return rootConfig;
}

class BuildContext {
  private _gconfig: IGeneralConfig;
  private _buildTreeConfig: any = {};
  private _workDir: Locator;
  private _configArg?: string;

  constructor(gconfig: IGeneralConfig) {
    this._gconfig = gconfig;
    this._workDir = gconfig.workDir;
    this._configArg = gconfig.configArg;
  }

  public get gconfig() {
    return this._gconfig;
  }

  async doExtractArchive(environment: Environment, config: any) {
    if (!config.sourceUrl)
      throw new Error("Unknown sourceUrl");
    if (!config.bitmakeDir)
      throw new Error("Unknown bitmakeDir");
    if (!config.extractDir)
      throw new Error("Unknown extractDir");

    if (!await directoryExists(config.bitmakeDir)) {
      await FileSystem.mkdir(config.bitmakeDir, { recursive: true });
    }

    const items = [];
    if (typeof config.sourceUrl === "string")
      items.push({ extractDir: config.extractDir, sourceUrl: config.sourceUrl, extractMtime: 0});
    else {
      for (const [pathName, sourceUrl] of Object.entries(config.sourceUrl))
        items.push({ extractDir: Path.join(config.extractDir, pathName), sourceUrl, extractMtime: 0});
    }

    for (const iter of items) {
      const arcName = Path.basename((new URL(iter.sourceUrl)).pathname);
      const arcHash = crypto.createHash("md5").update(iter.sourceUrl).digest("hex");
      const arcDir = Path.join(config.bitmakeDir, arcHash);
      const arcFile = Path.join(arcDir, arcName);

      if (!await directoryExists(arcDir))
        await FileSystem.mkdir(arcDir, { recursive: true });

      let arcMtime = 0;
      try { arcMtime = (await FileSystem.stat(arcFile)).mtimeMs; } catch (_e) {}

      if (!arcMtime) {
        logger.notice("Downloading:", iter.sourceUrl); // ? wget url
        const tmpFile = arcFile + ".tmp";
        await downloadFile(iter.sourceUrl, tmpFile, { attempts: REQUEST_ATTEMPTS });
        await FileSystem.rename(tmpFile, arcFile);
        arcMtime = (await FileSystem.stat(arcFile)).mtimeMs;
      }

      const extractHash = crypto.createHash("md5").update(iter.extractDir).digest("hex");
      const extractHashDir = Path.join(config.bitmakeDir, extractHash);
      const extractStamp = Path.join(extractHashDir, arcHash + ".txt");

      if (!await directoryExists(extractHashDir))
        await FileSystem.mkdir(extractHashDir, { recursive: true });

      let extractMtime = 0;
      try { extractMtime = (await FileSystem.stat(extractStamp)).mtimeMs; } catch (_e) {}

      if (!await directoryExists(iter.extractDir) || arcMtime > extractMtime) {
        const tempDir = await fs.promises.mkdtemp(Path.join(extractHashDir, arcName + '.'));
        let contentDir = Path.join(tempDir, "content");

      if (!await directoryExists(contentDir))
        await FileSystem.mkdir(contentDir, { recursive: true });

        await CMakeProcess.getInstance().extract({
          environment,
          filename: arcFile,
          workDir: contentDir,
          logFile:  Path.join(tempDir, "extract.log"),
        });

        const extractList = await FileSystem.readdir(contentDir);
        if (extractList.length === 1) {
          contentDir = Path.resolve(contentDir, extractList[0]);
          if (!await directoryExists(contentDir)) {
            await FileSystem.rm(contentDir, { recursive: true });
            throw new Error(`Support only directory for archive`);
          }
        }

        if (await directoryExists(iter.extractDir)) {
          // TODO: Marge extractDir with output
          await FileSystem.rm(iter.extractDir, { recursive: true });
        }
        else {
          const parentDir = Path.dirname(iter.extractDir);
          if (!await directoryExists(parentDir)) {
            await FileSystem.mkdir(parentDir, { recursive: true }); 
          }
        }

        await FileSystem.rename(contentDir, iter.extractDir);
        await FileSystem.writeFile(extractStamp, iter.sourceUrl);
        extractMtime = (await FileSystem.stat(extractStamp)).mtimeMs;
      }
      iter.extractMtime = extractMtime;
    }

    if (config.patchDir) {
      const extractHash = crypto.createHash("md5").update(config.extractDir).digest("hex");
      const extractHashDir = Path.join(config.bitmakeDir, extractHash);

      if (!await directoryExists(extractHashDir))
        await FileSystem.mkdir(extractHashDir, { recursive: true });

      const patchHash = crypto.createHash("md5").update(config.patchDir).digest("hex");
      const patchStamp = Path.join(extractHashDir, patchHash + ".txt");
      let patchMtime = 0;
      try { patchMtime = (await FileSystem.stat(patchStamp)).mtimeMs; } catch (_e) {}
      for (const iter of items) {
        if (iter.extractMtime > patchMtime) {
          await makePatch(config.patchDir, config.extractDir);
          await FileSystem.writeFile(patchStamp, config.patchDir);
          break;
        }
      }
    }
  }

  async doTargetBuild(gconfig: IGeneralConfig, environment: any, config: any, settings: SettingsStorage) {
    if (config.preAction) {
      await settings.push("preAction");
      const newConfig: any = {};
      assignObject(newConfig, config);
      delete newConfig.action;
      delete newConfig.preAction;
      delete newConfig.postAction;
      assignObject(newConfig, config.preAction);
      const newEnvironment = mergeEnvironment(await resolveEnvironment(config.preAction.environment), environment);
      await this.doTargetBuild(gconfig, newEnvironment, newConfig, settings);
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
        const newEnvironment = mergeEnvironment(await resolveEnvironment(config.action[i].environment), environment);
        await this.doTargetBuild(gconfig, newEnvironment, newConfig, settings);
        await settings.pop();
      }
      await settings.pop();
    }
    else {
      if (!await directoryExists(config.binaryDir)) {
        await FileSystem.mkdir(config.binaryDir, { recursive: true });
      }
      if (actions[config.action]) {
        config.description && logger.notice(config.description);
        await actions[config.action](config, environment, settings);
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
      const newEnvironment = mergeEnvironment(await resolveEnvironment(config.postAction.environment), environment);
      await this.doTargetBuild(gconfig, newEnvironment, newConfig, settings);
      await settings.pop();
    }
  }

  async loadTreeConfig() {
    let configPath: Locator | undefined;
    if (this._configArg) {
      configPath = this._workDir.resolve(this._configArg);
      if (!await fileExists(configPath))
        throw `Configuration '${this._configArg}' file does not exist`;
    }
    else {
      configPath = this._workDir.join(USER_CONFIG);
      if (!await fileExists(configPath)) {
        logger.warn(`Config file '${USER_CONFIG}' is not available`);
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
    }

    const { default: configModule } = await importModule(configPath.toURLString());
    switch (typeof configModule) {
    case "function":
      const userConfig = configModule();
      if (userConfig instanceof Promise)
        return await userConfig;
      return userConfig;

    case "object":
      return configModule;

    default:
      throw new Error(`Unknown user configuration type`);
    }
  }

  public async run(): Promise<void> {
    const originConfig = await this.loadTreeConfig();
    const bmkRoot = BmkRoot.create(this._gconfig.buildType, this._gconfig.workDir, this._gconfig.workDir.join("build"), originConfig);

    this._buildTreeConfig = makeBuildConfig(bmkRoot);

    if (this._buildTreeConfig.RECIPE_CONTENT_FILE) {
      const recipeJson = JSON.stringify(this._buildTreeConfig, null, 2);
      await saveIfDifferent(this._buildTreeConfig.RECIPE_CONTENT_FILE, recipeJson);
    }

    const settingsFilename = Path.resolve(this._buildTreeConfig.binaryRoot, BUILD_SETTINGS_FILE);
    const settings = new SettingsStorage(settingsFilename);

    for (const [key, entry] of Object.entries(this._buildTreeConfig) as any) {
      if (entry && typeof entry === "object" && entry.action && !entry.disabled) {
        await settings.push(key);
        if (entry.rebuild || !(await directoryExists(entry.binaryDir)) || !(await settings.get("completed"))) {
          logger.info(`Started action: ${key}`);
          const environment = mergeEnvironment(await resolveEnvironment(entry.environment), process.env);
          if (entry.sourceUrl && !(typeof entry.sourceUrl === "string" && entry.sourceUrl.startsWith(IMPORT_SCHEME))) {
            await this.doExtractArchive(environment, entry);
          }
          await this.doTargetBuild(this._gconfig, environment, entry, settings);
          await settings.set("completed", true);
          logger.info(`Completed action: ${key}`);
        }
        await settings.pop();
      }
    }
  }
};

export default async (options: CommandOptions) => {
  const buildContext = new BuildContext({
    buildType: options.env.buildType == DEBUG_BUILD_TYPE ? options.env.buildType : RELEASE_BUILD_TYPE,
    workDir: options.workDir,
    configArg: options.env.config,
  });

  await buildContext.run();
}
