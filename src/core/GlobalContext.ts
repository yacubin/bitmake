/*
 * MIT License
 *
 * Copyright (c) 2025  Yurii Yakubin (yurii.yakubin@gmail.com)
 *
 * Permission is granted to use, copy, modify, and distribute this software
 * under the MIT License. See LICENSE file for details.
 */

import fs from "node:fs";

import { AbsolutePath } from "@/core/Path";
import { fileExists, fileExistsSync } from "@/utils/FileSystem";
import { TargetCollection } from "@/core//TargetCollection";
import { ScriptCollection } from "@/core/ScriptCollection";
import { InterfaceTarget } from "@/core/InterfaceTarget";
import { UnknownTarget } from "@/core/UnknownTarget";
import { GoalCollection } from "@/core/GoalCollection";
import { InterfaceObjects } from "@/core/InterfaceObjects";
import { InterfaceScript } from "@/core/InterfaceScript";
import { SourceFile } from "@/core/SourceFile";
import { UserContext } from "@/core/UserContext";
import { ObjectLibrary, StaticLibrary, SharedLibrary, Executable } from "@/core/Target";
import { ScopeHelper } from "@/core/Scope";
import { importModule } from "@/utils/Module";

import configure_file from "@/core/BuildinScripts/configure_file";
import install_script from "@/core/BuildinScripts/install_script";

const requireImpl = eval("require");

const TARGETS = Symbol("TARGETS");
const SCRIPTS = Symbol("SCRIPTS");
const CACHE = Symbol("CACHE");
const UNKNOWN_TARGETS = Symbol("UNKNOWN_TARGETS");
const INTERFACE_SCRIPTS = Symbol("INTERFACE_SCRIPTS");
const INSTALL_LIST = Symbol("INSTALL_LIST");
const SCRIPT_VARIABLES_MAP = Symbol("SCRIPT_VARIABLES_MAP");
const SUBDIR_ALIAS = Symbol("SUBDIR_ALIAS");
const SUBDIR_LIST = Symbol("SUBDIR_LIST");
const BUILTIN_SCRIPTS = Symbol("BUILTIN_SCRIPTS");

type UnknownTargets = {
  [name: string]: UnknownTarget;
};

type SubdirectoryAlias = {
  [name: string]: AbsolutePath | string;
};

type InterfaceScripts = {
  [name: string]: InterfaceScript;
};

type CacheVariableDescriptor = {
  type?: any;
  value?: any;
  description?: string;
};

type CacheVariableDescriptors = {
  [name: string]: CacheVariableDescriptor;
};

type BuildinScripts = {
  [name: string]: Function;
};

function ensureValueByType(type: any, value: any) {
  if (Array.isArray(type) ? type.includes(value) : typeof value === type)
    return value;
  throw new Error(`The '${value}' is not a ${type}`);
}

export class GlobalContext {
  private [TARGETS]: TargetCollection;
  private [SCRIPTS]: ScriptCollection;
  private [CACHE]: CacheVariableDescriptors;
  private [UNKNOWN_TARGETS]: UnknownTargets;
  private [INTERFACE_SCRIPTS]: InterfaceScripts;
  private [INSTALL_LIST]: any;
  private [SCRIPT_VARIABLES_MAP]: any;
  private [SUBDIR_ALIAS]: SubdirectoryAlias;
  private [SUBDIR_LIST]: any[];
  private [BUILTIN_SCRIPTS]: BuildinScripts;

  private constructor() {
    this[TARGETS] = TargetCollection.create();
    this[SCRIPTS] = ScriptCollection.create();
    this[CACHE] = {};
    this[UNKNOWN_TARGETS] = {};
    this[INTERFACE_SCRIPTS] = {};
    this[INSTALL_LIST] = [];
    this[SCRIPT_VARIABLES_MAP] = {};
    this[SUBDIR_ALIAS] = {};
    this[SUBDIR_LIST] = [];
    this[BUILTIN_SCRIPTS] = {
      configure_file,
      install_script,
    };
  }

  public static create() {
    return Object.seal(new GlobalContext);
  }

  public get TARGETS() {
    return this[TARGETS];
  }

  public get SCRIPTS() {
    return this[SCRIPTS];
  }

  public get CACHE() {
    return this[CACHE];
  }

  public get UNKNOWN_TARGETS() {
    return this[UNKNOWN_TARGETS];
  }

  public get INTERFACE_SCRIPTS() {
    return this[INTERFACE_SCRIPTS];
  }

  public get INSTALL_LIST() {
    return this[INSTALL_LIST];
  }

  public get SCRIPT_VARIABLES_MAP() {
    return this[SCRIPT_VARIABLES_MAP];
  }

  public get SUBDIR_ALIAS() {
    return this[SUBDIR_ALIAS];
  }

  public getUknownTarget(name: string): UnknownTarget {
    let target = this[UNKNOWN_TARGETS][name];
    if (!target) {
      this[UNKNOWN_TARGETS][name] = target = UnknownTarget.create(name);
    }
    return target;
  }

  public addSystemVariables(variables: any) {
    const script = variables.SCRIPT_FILE.toString();
    if (this[SCRIPT_VARIABLES_MAP][script])
      throw new Error(`SystemVariables exists for ${script}`);
    this[SCRIPT_VARIABLES_MAP][script] = variables;
  }

  public resolveSubdirectory(path: AbsolutePath | string) {
    const resolvedPath = this[SUBDIR_ALIAS][path.toString()];
    return resolvedPath || path;
  }

  public addSubdirectoryAlias(src: AbsolutePath | string, dest: AbsolutePath | string) {
    this[SUBDIR_ALIAS][src.toString()] = dest;
  }

  public addCacheVariables(variables: CacheVariableDescriptors) {
    const cache = this[CACHE];
    for (const [key, entry] of Object.entries(variables)) {
      cache[key] = entry;
    }
  }

  public loadCacheVariables(filename: AbsolutePath | string) {
    if (fileExistsSync(filename.toString())) {
      const variables = requireImpl(filename.toString());
      this.addCacheVariables(variables);
    }
  }

  public copyCacheVariables(scope: any) {
    for (const [name, entry] of Object.entries(this[CACHE])) {
      if (!Object.hasOwn(scope, name)) {
        const type = entry.type || typeof entry.value;
        const description = entry.description || "";
        let value = Array.isArray(entry.value) ? [ ...entry.value ] : entry.value;
        if (value === "${PROJECT_VERSION}")
          value = scope.PROJECT_VERSION;
        else if (value === "${PROJECT_DESCRIPTION}")
          value = scope.PROJECT_DESCRIPTION;
        else if (value === "${PROJECT_HOMEPAGE_URL}")
          value = scope.PROJECT_HOMEPAGE_URL;
        else if (entry.value === "${CMAKE_SYSTEM_PROCESSOR}")
          value = scope.SYSTEM_PROCESSOR;
  
        const nameSymbol = Symbol(name);
        scope[nameSymbol] = ensureValueByType(type, value);
  
        Object.defineProperty(scope, name, {
          enumerable: true,
          get() {
            return this[nameSymbol];
          },
          set(value) {
            this[nameSymbol] = ensureValueByType(type, value);
          },
        });
      }
    }
  }
  
  public writeCacheVariables(filename: string) {
    const json = JSON.stringify(this[CACHE], null, 2);
    fs.writeFileSync(filename, json, "utf-8");
  }

  public addSubdirectory(scope: any) {
    this[SUBDIR_LIST].push(scope);
  }

  public findScriptFunction(name: string): Function | undefined {
    return this[BUILTIN_SCRIPTS][name];
  }
  
  public async doSubdirectory() {
    while (this[SUBDIR_LIST].length) {
      const scope = this[SUBDIR_LIST].shift();

      let scriptFile;
      const fileList = [ ".js", ".mjs" ].map(i => "MakeScript" + i);
      for (const filename of fileList) {
        const iter = scope.SOURCE_DIR.join(filename).toString();
        if (await fileExists(iter)) {
          scriptFile = iter;
          break;
        }
      }

      if (!scriptFile)
        throw new Error("There are no files from the list " + fileList.join());

      scope.SCRIPT_FILE = scriptFile;
      scope.SCRIPT_DIR = scope.SCRIPT_FILE.dirname();

      this.addSystemVariables(scope);

      const cwdSave = process.cwd();
      process.chdir(scope.SOURCE_DIR.toString());

      const mk = UserContext.create(scope, this);
      const module = await importModule(scope.SCRIPT_FILE.toString());
      const result = module.default(mk);
      if (result instanceof Promise)
        await result;
      ScopeHelper.applyVariables(scope, mk);

      process.chdir(cwdSave);
    }
  }

  public createGoals(scope: any) {
    for (const iter of Object.values(this[UNKNOWN_TARGETS])) {
      const target = this[TARGETS].get(iter.NAME);
      target.addSources(iter.SOURCES);
      target.INCLUDES.push(...iter.INCLUDES);
      target.DEFINES.push(...iter.DEFINES);
      target.COMPILE_OPTIONS.push(...iter.COMPILE_OPTIONS);
      target.LINK_OPTIONS.push(...iter.LINK_OPTIONS);
    }
  
    for (const iter of Object.values(this[INTERFACE_SCRIPTS])) {
      const script = this[SCRIPTS].get(iter.NAME);
      for (const [key, vals] of Object.entries(iter.PROPERTIES))
        script.addProperty(key, ...vals);
    }
  
    const goalList = GoalCollection.create();
    for (const [name, script] of Object.entries(this[SCRIPTS].ENTRIES)) {   
      const depends = [];
      if (script.SCRIPT instanceof AbsolutePath)
        depends.push(script.SCRIPT.toString());
      if (script.INPUT)
        depends.push(script.INPUT.toString());
      const msg = "\x1b[36m" + "Generating " + script.TARGET_SCOPE.BINARY_DIR.relative(script.OUTPUT) + "\x1b[0m";
      const params = { ...script.PROPERTIES, ...script.PARAMS };
      goalList.addScript(script.SCRIPT, "", depends, script.OUTPUT.toString(), params, msg);
    }
  
    for (const [name, target] of Object.entries(this[TARGETS].ENTRIES) as any) {
      const headers = this[TARGETS].allHeadersOf(target);
      const depends = [];
      for (const s of target.SOURCES) {
        if (s instanceof InterfaceObjects) {
          const t = this[TARGETS].get(s.targetName);
          for (const f of t.SOURCES) {
            if (f instanceof SourceFile && f.OBJECT_FILE)
              depends.push(f.OBJECT_FILE.toString());
          }
          continue;
        }
  
        if (s.HEADER_FILE_ONLY)
          continue;
  
        fs.mkdirSync(s.OBJECT_FILE_DIR.toString(), { recursive: true });
  
        const relativeObject = target.TARGET_SCOPE.BINARY_DIR.relative(s.OBJECT_FILE);
        const relativeBinaryDir = scope.PROJECT_BINARY_DIR.relative(target.TARGET_SCOPE.BINARY_DIR);
        const msg = "\x1b[32m" + `Building ${s.LANGUAGE} object ${relativeBinaryDir}/${relativeObject}` + "\x1b[0m";
  
        const definitions = [
          ...this[TARGETS].allDefinitionsOf(target),
          ...s.DEFINES,
        ];
  
        const args = [];
        args.push(...definitions.map(i => "-D" + i));
        args.push(...this[TARGETS].allIncludesOf(target).map(i => "-I" + i));
        args.push(...this[TARGETS].allCompileOptionsOf(target));
        if (target.POSITION_INDEPENDENT_CODE)
          args.push("-fPIC");
        args.push(...s.COMPILE_FLAGS.flat());
        args.push("-o", relativeObject);
        args.push("-c", s.FILE);
        const cwd = target.TARGET_SCOPE.BINARY_DIR.toString();
  
        const command = target.TARGET_SCOPE[s.LANGUAGE + "_COMPILER"].toString();
        const output = target.TARGET_SCOPE.BINARY_DIR.join(relativeObject).toString();
        depends.push(output);
  
        goalList.addExec(output, [ ...headers, s.FILE ], command, args, cwd, msg);
      }
  
      const linkOptions = this[TARGETS].allLinkOptionsOf(target);
      if (target instanceof ObjectLibrary) {
        const objs = depends.filter(i => i.endsWith(".o") || i.endsWith(".obj")).map(i => target.FILE_DIR.relative(i));
        if (objs.length) {
          const args = [
            ...linkOptions,
            "-r",
            "-o", target.FILE_NAME,
            ...objs
          ];
          const cwd = target.FILE_DIR.toString();
          const msg = `Linking CXX object library ${target.FILE_NAME}`;
          goalList.addExec(target.FILE.toString(), depends, scope.LINKER, args, cwd, msg);
        }
        else {
          console.log(`No objects for "${target.NAME}"`);
        }
      }
  
      if (target instanceof StaticLibrary) {
        const objs = depends.filter(i => i.endsWith(".o") || i.endsWith(".obj")).map(i => target.FILE_DIR.relative(i));
        if (objs.length) {
          const args = [ "rc", target.FILE_NAME , ...objs ];
          const cwd = target.FILE_DIR.toString();
          const msg = `Linking CXX static library ${target.FILE_NAME}`;
          goalList.addExec(target.FILE.toString(), depends, scope.AR, args, cwd, msg);
        }
        else {
          console.log(`No objects for "${target.NAME}"`);
        }
      }
  
      if (target instanceof SharedLibrary) {
        throw new Error("Not implemented");
      }
  
      if (target instanceof Executable) {
        const objs = depends.filter(i => i.endsWith(".o") || i.endsWith(".obj")).map(i => target.FILE_DIR.relative(i));
        if (objs.length) {
          const libs = this[TARGETS].allLibrariesOf(target);
          const args = [
            ...target.TARGET_SCOPE.CXX_FLAGS,
            ...linkOptions,
            ...objs,
            "-o", target.FILE_NAME,
            ...libs.map(i => target.FILE_DIR.relative(i)),
          ];
          const cwd = target.FILE_DIR.toString();
          const msg = `Linking CXX executable ${target.FILE_NAME}`;
          goalList.addExec(target.FILE.toString(), depends.concat(libs), scope.CXX_COMPILER, args, cwd, msg);
        }
        else {
          console.log(`No objects for "${target.NAME}"`);
        }
      }
  
      goalList.addTarget(name, [ target.FILE.toString() ], `Built target ${name}`);
    }
  
    const install_files = [];
    for (const iter of this[INSTALL_LIST]) {
      let src, dest;
      if (iter.VALUE instanceof AbsolutePath) {
        if (scope.PREVENT_INSTALL_FILES)
          continue;
        src = iter.VALUE.toString();
        const rfile = iter.BASE_DIR.relative(iter.VALUE);
        dest = iter.DESTINATION.join(rfile);
      }
      else if (iter.VALUE instanceof InterfaceTarget) {
        const target = this[TARGETS].get(iter.VALUE.targetName);
        src = target.FILE.toString();
        dest = iter.DESTINATION.join(target.FILE_NAME);
      }
      else {
        throw new Error(`Can not install ${iter.VALUE}`)
      }
      if (scope.DESTDIR)
        dest = scope.DESTDIR.join(dest).toString();
      goalList.addScript(install_script, "", [ src ], dest, {src, dest}, "");
      install_files.push(dest);
    }
  
    if (install_files.length) {
      goalList.addTarget("install", install_files, "");
    }
  
    goalList.addTarget("all", Object.keys(this[TARGETS].ENTRIES), "");
  
    return goalList;
  }

  public toJSON(): object {
    return {
      TARGETS: this.TARGETS,
      SCRIPTS: this.SCRIPTS,
      CACHE: this.CACHE,
      UNKNOWN_TARGETS: this.UNKNOWN_TARGETS,
      INTERFACE_SCRIPTS: this.INTERFACE_SCRIPTS,
      INSTALL_LIST: this.INSTALL_LIST,
      SCRIPT_VARIABLES_MAP: this.SCRIPT_VARIABLES_MAP,
      SUBDIR_ALIAS: this.SUBDIR_ALIAS,
    };
  }
};
