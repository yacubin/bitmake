/*
 * MIT License
 *
 * Copyright (c) 2025  Yurii Yakubin (yurii.yakubin@gmail.com)
 *
 * Permission is granted to use, copy, modify, and distribute this software
 * under the MIT License. See LICENSE file for details.
 */

import fs from "node:fs";
import url from "node:url";
import http from "node:http";
import child_process from "node:child_process";

import { CMakeProcess } from "@/cmake";
import { Path } from "@/utils/Path";
import { makePatch } from "@/utils/MakePatch";
import { saveIfDifferent, directoryExists, fileExists, FileSystem } from "@/utils/FileSystem";
import { SettingsStorage } from "@/utils/SettingsStorage";
import { arrayWrapper, assignObject } from "@/utils/Primitives";
import { USER_CONFIG, BUILD_SETTINGS_FILE, REQUEST_ATTEMPTS } from "@/Constants";
import { DEBUG_BUILD_TYPE, RELEASE_BUILD_TYPE } from "@/core/Types";
import { IMPORT_SCHEME } from "@/utils/UrlScheme";
import { randInt } from "@/utils/Random";
import { requireResolve } from "@/utils/Module";
import { downloadFile } from "@/utils/HttpRequest";
import { CommandOptions } from "@/core/CommandOptions";
import { Logger } from "@/logger";
import { loadJSValue } from "@/utils/JSValue";
import { importModule } from "@/utils/Module";
import { Locator } from "@/utils/Locator";
import { currentScriptURL } from "@/utils/Module";
import { deepCopy } from "@/utils/Primitives";

import actions from "@/actions";
import path from "node:path";

const logger = Logger.create(import.meta.url);

interface IGeneralConfig {
  webui: boolean;
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

function resolveStringWithVariable(config: any, entryConfig: any, rootConfig: any, val: any) {
  return val.replace(/\$\{([^}]+)\}/g, (match: any, value: any) => {
    let sel;
    for (const name of value.split(".")) {
      if (sel === undefined) {
        if (config.hasOwnProperty(name))
          sel = config[name];
        else if (config !== entryConfig && entryConfig.hasOwnProperty(name))
          sel = entryConfig[name];
        else if (config !== rootConfig && rootConfig.hasOwnProperty(name))
          sel = rootConfig[name];
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
      entry.tempDir = entry.tempDir || Path.join(workDir, "tmp");
      if (entry.sourceUrl) {
        if (entry.sourceUrl.startsWith(IMPORT_SCHEME)) {
          const filename = requireResolve(entry.sourceUrl.slice(IMPORT_SCHEME.length));
          entry.sourceDir = Path.dirname(filename);
        }
        else {
          entry.archiveDir = entry.archiveDir || Path.join(workDir, "arc");
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

  resolveConfigStrings(rootConfig);
  return rootConfig;
}

type RequestHandler = (req: http.IncomingMessage, res: http.ServerResponse) => void;

class BuildContext {
  private _gconfig: IGeneralConfig;
  private _server?: http.Server;
  private _startUrl = "";
  private _hostname = "";
  private _port = 0;
  private _buildTreeConfig: any = {};
  private _requestHandlers = new Map<string, RequestHandler>;
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

  async doExtractArchive(environment: any, config: any, settings: any) {
    if (!config.sourceUrl)
      throw new Error("Unknown sourceUrl");
    if (!config.archiveDir)
      throw new Error("Unknown archiveDir");
    if (!config.extractDir)
      throw new Error("Unknown extractDir");

    if (!await directoryExists(config.archiveDir)) {
      await FileSystem.mkdir(config.archiveDir, { recursive: true });
    }

    if (!await directoryExists(config.tempDir)) {
      await FileSystem.mkdir(config.tempDir, { recursive: true });
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
    
      await CMakeProcess.getInstance().extract({
        environment,
        filename: arcFile,
        workDir: extractDir,
        logFile:  Path.join(config.tempDir, Path.basename(extractDir) + ".log"),
      });
    
      const extractList = await FileSystem.readdir(extractDir);
      if (extractList.length === 1) {
        extractDir = Path.resolve(extractDir, extractList[0]);
        if (!await directoryExists(extractDir)) {
          await FileSystem.rm(extractDir, { recursive: true });
          throw new Error(`Support only directory for archive`);
        }
      }
    
      if (await directoryExists(config.extractDir)) {
        // TODO: Marge extractDir with output
        await FileSystem.rm(config.extractDir, { recursive: true });
      }
      else {
        const parentDir = Path.dirname(config.extractDir);
        if (!await directoryExists(parentDir)) {
          await FileSystem.mkdir(parentDir, { recursive: true }); 
        }
      }
    
      await FileSystem.rename(extractDir, config.extractDir);
    
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
    if (this._gconfig.webui) {
      this.startServer();
    }

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
        const completed = await settings.get("completed");
        if (entry.rebuild || !completed) {
          logger.info(`Started action: ${key}`);
          const environment = mergeEnvironment(await resolveEnvironment(entry.environment), process.env);
          if (entry.sourceUrl && !entry.sourceUrl.startsWith(IMPORT_SCHEME)) {
            await this.doExtractArchive(environment, entry, settings);
          }
          await this.doTargetBuild(this._gconfig, environment, entry, settings);
          await settings.set("completed", true);
          logger.info(`Completed action: ${key}`);
        }
        await settings.pop();
      }
    }
  }

  private onServerListen() {
    console.log(`Server running at ${this._startUrl}`);
  }

  private onServerRequest(req: http.IncomingMessage, res: http.ServerResponse) {
    const handler = req.url ? this._requestHandlers.get(req.url) : undefined;
    if (handler)
      handler(req, res);
    else
      res.destroy();
  }

  private mainPage(req: http.IncomingMessage, res: http.ServerResponse) {
    res.statusCode = 200;
    res.setHeader("Content-Type", "text/html");
    res.end(`
      <!DOCTYPE html>
      <html>
        <head>
          <title>BitMake</title>
          <style>
            body { font-family: Arial; background: #f0f0f0; text-align: center; padding: 50px; }
            h1 { color: #007acc; }
          </style>
          <script src="script.js"></script>
        </head>
        <body>
          <h1>BitMake</h1>
          <p>This is a Main Page</p>
          <a href="tree-config.json">Build Tree Config</a>
        </body>
      </html>
    `);
  }

  private mainScript(req: http.IncomingMessage, res: http.ServerResponse) {
    const dirUrl = url.fileURLToPath(currentScriptURL());
    const filename = path.join(path.dirname(dirUrl), "script.js");
    
    fs.readFile(filename, 'utf8', (err, data) => {
      if (err) {
        res.statusCode = 500;
        res.setHeader("Content-Type", "text/plain");
        res.end('Error loading script.js');
      }
      else {
        res.statusCode = 200;
        res.setHeader("Content-Type", "application/javascript");
        res.end(data);
      }
    });
  }

  private treeConfigJson(req: http.IncomingMessage, res: http.ServerResponse) {
    res.statusCode = 200;
    res.setHeader("Content-Type", "application/json");
    res.end(JSON.stringify(this._buildTreeConfig));
  }

  public startServer() {
    this._hostname = "localhost";
    this._port = randInt(49152, 65535);
    this._startUrl = `http://${this._hostname}:${this._port}`;

    this._requestHandlers.set("/", this.mainPage.bind(this));
    this._requestHandlers.set("/script.js", this.mainScript.bind(this));
    this._requestHandlers.set("/tree-config.json", this.treeConfigJson.bind(this));

    this._server = http.createServer((req, res) => this.onServerRequest(req, res));
    this._server.listen(this._port, this._hostname, () => this.onServerListen());
    const startCommand = process.platform === "win32" ? "start" : process.platform === "darwin" ? "open" : "xdg-open";
    child_process.exec(`${startCommand} ${this._startUrl}`, (error, stdout, stderr) => {
      error && logger.warn(`Code ${error.code} for command ${error.cmd}`);
    });
  }

  public stopServer() {
    this._server?.close();
  }
};

export default async (options: CommandOptions) => {
  const buildContext = new BuildContext({
    webui: options.env.webui === true,
    buildType: options.env.buildType == DEBUG_BUILD_TYPE ? options.env.buildType : RELEASE_BUILD_TYPE,
    workDir: options.workDir,
    configArg: options.env.config,
  });

  await buildContext.run();
}
