import path from 'node:path';
import fs from 'node:fs';
import url from 'node:url';

import { generatedScriptNameComment } from "###/utils/CXX.js";
import { filenameToPragmaOnceMacro } from "###/utils/CXX.js";
import { saveIfDifferent } from "###/utils/FileSystem.js";
import { fileExists } from "###/utils/FileSystem.js";

async function loadScript(filename)
{
  const fileUrl = url.pathToFileURL(filename);
  return await import(fileUrl);
}

class InjectHooks {
  _callbacks = {};

  on(name, callback)
  {
    if (!this._callbacks[name])
      this._callbacks[name] = [];
    this._callbacks[name].push(callback);
  }

  async emit(name, event)
  {
    if (this._callbacks[name]) {
      for (const callback of this._callbacks[name]) {
        const res = callback(event);
        if (res instanceof Promise)
          await res;
      }
    }
  }
};

function shrinkPath(filepath, deep)
{
  let components = path.normalize(filepath).split(path.sep);
  if (deep !== undefined) {
    if (components.length > deep)
      components = components.slice(components.length - deep);
  }
  return components.join(path.posix.sep);
}

export class InjectContext {
  _args;
  _entryScript;
  _config = {};
  _plugins = [];

  _hooks = new InjectHooks;

  _cmake = {

  };

  _cxx = {
    generatedScriptNameComment,
    filenameToPragmaOnceMacro,
  };

  _path = {
    join: path.posix.join,
    dirname: path.posix.dirname,
  };

  _fs = {
    fileExists,
    linesSaveTo: async (filename, lines) => {
      if (await saveIfDifferent(filename, lines.join('\n')))
        console.log(`echo "[object Object]" > ${shrinkPath(filename, 3)}`);
    },
    loadScript,
    readFile: fs.promises.readFile,
    mkdir: async (path, options) => {
      console.log("mkdir " + (options && options.recursive) ? "-p" : "" + path);
      await fs.promises.mkdir(path, options);
    },
  };

  constructor(entryScript, args)
  {
    this._entryScript = entryScript;
    this._args = args;
  }

  get args()
  {
    return this._args;
  }

  get hooks()
  {
    return this._hooks;
  }

  get path()
  {
    return this._path;
  }

  get fs()
  {
    return this._fs;
  }

  get cmake()
  {
    return this._cmake;
  }

  get cxx()
  {
    return this._cxx;
  }

  get entryScript()
  {
    return this._entryScript;
  }

  async loadConfig(filename)
  {
    const module = await loadScript(filename);
    const originConfig = module.default;

    const config = {};
    for (const [key, entry] of Object.entries(originConfig)) {
      if (entry.type === "boolean") {
        config[key] = entry.value.toUpperCase() === "ON" || entry.value.toUpperCase() === "TRUE";
      }
      else if (entry.type === "number") {
        config[key] = entry.value;
      }
      else if (entry.type === "string") {
        config[key] = entry.value;
      }
      else if (entry.type === "string[]") {
        config[key] = entry.value ? entry.value.split(";") : [];
      }
      else if (Array.isArray(entry.type)) {
        config[key] = entry.value;
      }
      else {
        throw `Not supported type ${entry.type}`;
      }
    }

    this._config = config;
  }

  async loadPlugin(filename)
  {
    const module = await loadScript(filename);
    const Plugin = module.default;
    this._plugins.push(new Plugin);
  }

  async loadPlugins()
  {
    for (const filename of (this._config.WASMUX_INJECT_SCRIPT_LIST || [])) {
      await this.loadPlugin(filename);
    }
  }

  async initPlugins()
  {
    for (const plugin of this._plugins) {
      const res = plugin.entry(this);
      if (res instanceof Promise)
        await res;
    }
  }
};
