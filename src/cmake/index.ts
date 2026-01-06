/*
 * MIT License
 *
 * Copyright (c) 2025  Yurii Yakubin (yurii.yakubin@gmail.com)
 *
 * Permission is granted to use, copy, modify, and distribute this software
 * under the MIT License. See LICENSE file for details.
 */

import os from "node:os";
import fs from "node:fs";
import path from "node:path";

import { spawnAsync } from "@/utils/ChildProcess";
import { CMAKE_LISTS_TXT, DEFAULT_GENERATOR, ValueType } from "@/cmake/Constants";
import { Environment } from "@/utils/Environment";
import { convertToValue } from "@/cmake/Helper";
import { Host } from "@/utils/Host";

function toVarType(key: string, val: any) {
  const map: any = {
    CMAKE_INSTALL_PREFIX: ValueType.PATH,
    CMAKE_TOOLCHAIN_FILE: ValueType.FILEPATH,
  };

  if (typeof val === "boolean")
    return ValueType.BOOL;

  if (map.hasOwnProperty(key))
    return map[key];

  return ValueType.STRING;
}

function makeCmdVariable(key: string, val: any, isCache: boolean) {
  let name = key;
  if (isCache)
    name += ":" + toVarType(key, val);
  return name + "=" + convertToValue(val);
}

function makeCmdVariables(variables: object, isCache: boolean): string[] {
  const result: string[] = [];
  for (const [key, val] of Object.entries(variables))
    result.push("-D", makeCmdVariable(key, val, isCache));
  return result;
}

export interface ScriptModeOptions {
  environment?: Environment;
  workDir?: string;
};

export class CMakeProcess {
  private _cmakePath: string;

  public constructor(cmakePath: string) {
    this._cmakePath = cmakePath;
  }

  public async scriptMode(scriptFile: string, variables: object, options?: ScriptModeOptions): Promise<void> {
    const spawnArgs = [
      ...makeCmdVariables(variables, false),
      "-P", scriptFile,
    ];
    const res: any = await spawnAsync(this._cmakePath, spawnArgs, {
      cwd: options?.workDir,
      env: options?.environment || process.env,
    });
    if (res.status !== 0) {
      throw `cmake.scriptMode returned status ${res.status}`;
    }
  }

  public async configure(args: any): Promise<void> {
    const spawnArgs = [
      "-G", args.generator,
      ...makeCmdVariables(args.cacheVariables, true),
      "-S", args.sourceDir,
      "-B", args.binaryDir,
    ];
  
    const res: any = await spawnAsync(this._cmakePath, spawnArgs, {
      cwd: args.binaryDir,
      env: args.environment || process.env,
      extra: {
        output: `cmake.configure.log`,
      },
    });
    if (res.status !== 0) {
      throw `CMake.configure returned status ${res.status}`;
    }
  }

  public async build(args: any): Promise<void> {
    await this.configure(args);
  
    const spawnArgs: string[] = [
      '--build', '.',
      '--parallel', os.availableParallelism().toString(),
    ];
    const res: any = await spawnAsync(this._cmakePath, spawnArgs, {
      cwd: args.binaryDir,
      env: args.environment || process.env,
      extra: {
        output: `cmake.build.log`,
      },
    });
    if (res.status !== 0) {
      throw `CMake.build returned status ${res.status}`;
    }
  }

  public async install(args: any): Promise<void> {
    await this.configure(args);

    const spawnArgs = [
      '--install',
      '.',
    ];
    if (args.installDir) {
      spawnArgs.push('--prefix', args.installDir);
    }
    const res: any = await spawnAsync(this._cmakePath, spawnArgs, {
      cwd: args.binaryDir,
      env: args.environment || process.env,
      extra: {
        output: `cmake.install.log`,
      },
    });
    if (res.status !== 0) {
      throw `CMake.install returned status ${res.status}`;
    }
  }
  
  public async extract(args: any): Promise<void> {
    const spawnArgs = [ "-E", "tar", "-xvf", args.filename ];
    const res: any = await spawnAsync(this._cmakePath, spawnArgs, {
      cwd: args.workDir || args.sourceDir || args.binaryDir,
      env: args.environment || process.env,
      extra: {
        output: args.logFile || `cmake.extract.log`,
      },
    });
    if (res.status !== 0) {
      throw `Extract returned status ${res.status}`;
    }
  }
};

let _cmakeInstance: CMakeProcess;
export namespace CMakeProcess {
  export function getInstance(): CMakeProcess {
    if (!_cmakeInstance)
      _cmakeInstance = new CMakeProcess("cmake" + Host.executableSuffix);
    return _cmakeInstance;
  }
}

export class CTestProcess {
  private _ctestPath: string;

  public constructor(ctestPath: string) {
    this._ctestPath = ctestPath;
  }

  public async ctest(args: any): Promise<void> {
    const spawnArgs: string[] = [];
    const res: any = await spawnAsync(this._ctestPath, spawnArgs, {
      cwd: args.binaryDir,
      env: args.environment || process.env,
      extra: {
        output: `cmake.ctest.log`,
      },
    });
    if (res.status !== 0) {
      throw `CTest returned status ${res.status}`;
    }
  }
};

let _ctestInstance: CTestProcess;
export namespace CTestProcess {
  export function getInstance(): CTestProcess {
    if (!_ctestInstance)
      _ctestInstance = new CTestProcess("ctest" + Host.executableSuffix);
    return _ctestInstance;
  }
}

export async function getProjectInfo(source: string) {
  const stat = await fs.promises.stat(source);
  if (stat.isDirectory())
    source = path.resolve(source, CMAKE_LISTS_TXT);
  const content = await fs.promises.readFile(source, { encoding: 'utf8' });

  const projectPattern = /project *\( *([^ ]+) *([^)]*)\)/;
  const versionPattern = /VERSION +([^ ]+)/;

  const result: any = {};
  let match = content.match(projectPattern);
  if (match) {
    result.name = match[1];
    const projectContent = match[2];
    match = projectContent.match(versionPattern);
    if (match)
      result.version = match[1];
  }

  return result;
}

export function lineToSinglComment(line: string) {
  return "# " + line;
}

export function lineToMultipleComment(line: string) {
  return `#[===[ ${line} ]===]`;
}

export function generatedScriptNameComment(filename: string) {
  return lineToSinglComment("Generated from " + path.basename(filename));
}

export { DEFAULT_GENERATOR };
