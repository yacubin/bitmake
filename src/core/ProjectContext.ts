/*
 * MIT License
 *
 * Copyright (c) 2025  Yurii Yakubin (yurii.yakubin@gmail.com)
 *
 * Permission is granted to use, copy, modify, and distribute this software
 * under the MIT License. See LICENSE file for details.
 */

import fs from "node:fs";

import { ALL_TARGET, INSTALL_TARGET } from "@/Constants";
import { Locator } from "@/utils/Locator";
import { fileExists, fileExistsSync } from "@/utils/FileSystem";
import { TargetCollection } from "@/core/TargetCollection";
import { GoalCollection, GoalTarget } from "@/core/GoalCollection";
import { SystemScope } from "@/core/SystemScope";
import { requireSync } from "@/utils/Module";
import { Logger } from "@/utils/Logger";
import { TargetName } from "@/core/TargetName";
import { TargetCommand } from "@/core/TargetCommand";
import { MainTarget, PostTarget } from "@/core/Target";
import { InstallEntity } from "@/core/InstallEntity";
import { ScriptContext } from "@/core/ScriptContext";
import { ScopeHelper, VariableMap } from "./Scope";
import { TargetFile } from "@/core/TargetFile";
import { SourceFile } from "@/core/SourceFile";
import { ExecScriptTask } from "@/core/ExecScriptTask";
import { SpawnSyncTask } from "@/core/SpawnSyncTask";
import { FileInstallationTask } from "@/core/FileInstallationTask";
import { CustomScript, PostCustomScript } from "@/core/CustomScript";

import builtinScripts from "@/core/BuiltinScripts";

const logger = Logger.create(import.meta.url);

const TARGETS = Symbol("TARGETS");
const CACHE = Symbol("CACHE");

type SubdirectoryAlias = {
  [name: string]: Locator | null;
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

export interface ExecStruct {
  command: string;
  args: string[];
};

function ensureValueByType(type: any, value: any) {
  if (Array.isArray(type) ? type.includes(value) : typeof value === type)
    return value;
  throw new Error(`The '${value}' is not a ${type}`);
}

function resolveInstance(project: ProjectContext, o: string | Locator | TargetFile): string {
  if (typeof o === "string")
    return o;

  if (o instanceof Locator)
    return o.toString();

  if (o instanceof TargetFile) {
    const target = project.TARGETS.get(o.targetName);
    return target.getFile().toString();
  }

  throw new Error(`Unable to resolve object ${o}`);
}

function resolveTargetCommand(project: ProjectContext, tcmd: TargetCommand): ExecStruct {
  const command = resolveInstance(project, tcmd.command);
  const args = tcmd.args.map(i => resolveInstance(project, i));
  return {command, args};
}

export class ProjectContext {
  private [TARGETS]: TargetCollection;
  private _customScripts = new Map<string, CustomScript>;

  private [CACHE]: CacheVariableDescriptors;
  private _installList: InstallEntity[];
  private _processedVariableMap: any;
  private _builtinScripts: BuildinScripts;
  private _subdirAlias: SubdirectoryAlias;

  private constructor() {
    this[TARGETS] = TargetCollection.create();
    this[CACHE] = {};
    this._installList = [];
    this._processedVariableMap = {};
    this._subdirAlias = {};
    this._builtinScripts = builtinScripts;
  }

  public static create() {
    return Object.seal(new ProjectContext);
  }

  public get TARGETS() {
    return this[TARGETS];
  }

  public get CACHE() {
    return this[CACHE];
  }

  public registerVariableMap(name: string, variableMap: VariableMap) {
    if (this._processedVariableMap[name])
      throw new Error(`SystemVariables exists for ${name}`);
    this._processedVariableMap[name] = variableMap;
  }

  public resolveSubdirectory(path: Locator | string): Locator | string | undefined {
    const resolvedPath = this._subdirAlias[path.toString()];
    if (resolvedPath === undefined)
      return path;
    if (resolvedPath === null)
      return undefined;
    return resolvedPath;
  }

  public addSubdirectoryAlias(variableMap: VariableMap, src: any, dest: any) {
    const srcPath = Locator.create(ScopeHelper.get(variableMap, "SOURCE_DIR").resolve(src));
    const destPath = (dest === null) ? null : Locator.create(ScopeHelper.get(variableMap, "SOURCE_DIR").resolve(dest));
    const srcStr = srcPath.toString();
    if (this._subdirAlias.hasOwnProperty(srcStr))
      logger.warn(`Owerride "${srcStr}" subdirectory alias`);
    this._subdirAlias[srcStr] = destPath;
  }

  public addCacheVariables(variables: CacheVariableDescriptors) {
    const cache = this[CACHE];
    for (const [key, entry] of Object.entries(variables)) {
      cache[key] = entry;
    }
  }

  public loadCacheVariables(filename: Locator | string) {
    if (fileExistsSync(filename.toString())) {
      const variables = requireSync(filename.toString());
      this.addCacheVariables(variables);
    }
  }

  public copyCacheVariables(scope: any) {
    for (const [name, entry] of Object.entries(this[CACHE])) {
      if (!Object.hasOwn(scope, name)) {
        const type = entry.type || typeof entry.value;
        const description = entry.description || "";
        let value = Array.isArray(entry.value) ? [ ...entry.value ] : entry.value;  
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

  public executeScriptSync(variableMap: VariableMap, script: any, params: any) {
    const newVariableMap = ScopeHelper.cloneVariableMap(variableMap);
    params && ScopeHelper.extendVariableMapByValues(newVariableMap, "", params);
    const scriptPath = ScopeHelper.get(newVariableMap, "SOURCE_DIR").resolve(script);
    const func = requireSync(scriptPath.toString());
    const mk = ScriptContext.create(newVariableMap);
    func(mk);
  }

  public writeCacheVariables(filename: string) {
    const json = JSON.stringify(this[CACHE], null, 2);
    fs.writeFileSync(filename, json, "utf-8");
  }

  public async prepearScriptFile(variableMap: VariableMap): Promise<boolean> {
    const originSourceDir = ScopeHelper.get(variableMap, "SOURCE_DIR").toString();
    const resolveSourceDir = this.resolveSubdirectory(originSourceDir);
    if (!resolveSourceDir) {
      logger.info(`Source dir "${originSourceDir}" was disabled`);
      return false;
    }
    ScopeHelper.set(variableMap, "SOURCE_DIR", resolveSourceDir);

    if (!ScopeHelper.get(variableMap, "SCRIPT_FILE")) {
      let scriptFile: Locator | undefined;
      const fileList = [ ".js", ".mjs" ].map(i => "MakeScript" + i);
      for (const filename of fileList) {
        const iter = ScopeHelper.get(variableMap, "SOURCE_DIR").join(filename);
        if (await fileExists(iter.toString())) {
          scriptFile = iter;
          break;
        }
      }

      if (!scriptFile)
        throw new Error(`There are no files ${fileList.join(", ")} in "${ScopeHelper.get(variableMap, "SOURCE_DIR")}"`);

      ScopeHelper.set(variableMap, "SCRIPT_FILE", scriptFile);
      ScopeHelper.set(variableMap, "SCRIPT_DIR", ScopeHelper.get(variableMap, "SCRIPT_FILE").dirname());
    }

    this.registerVariableMap(ScopeHelper.get(variableMap, "SCRIPT_FILE").toString(), variableMap);
    return true;
  }

  public findScriptFunction(name: string): Function | undefined {
    return this._builtinScripts[name];
  }

  public applyMainTargets(targets: MainTarget[]) {
    for (const iter of targets)
      this[TARGETS].set(iter.targetName, iter);
  }

  public applyMainScripts(scripts: CustomScript[]) {
    for (const iter of scripts)
        this._customScripts.set(iter.NAME, iter);
  }

  public applyInstallEntities(entries: InstallEntity[]) {
    for (const iter of entries)
        this._installList.push(iter);
  }

  public applPostTargets(targets: PostTarget[]) {
    for (const postTarget of targets) {
      const target = this[TARGETS].get(postTarget.name);
      if (!target)
        throw new Error(`There is no Target named ${name}`);
      target.postUpdate(postTarget);
    }
  }

  public applPostScripts(scripts: PostCustomScript[]) {
    for (const postScript of scripts) {
      const script = this._customScripts.get(postScript.name);
      if (!script)
        throw new Error(`There is no CustomScript named ${name}`);
      script.postUpdate(postScript);
    }
  }

  public createGoals(scope: SystemScope): GoalCollection {
    const goalList = new GoalCollection;
    for (const [name, script] of this._customScripts.entries()) {   
      const depends = [];

      let scriptObj: Locator | Function;
      if (typeof script.scriptModule === "string") {
        const func = this.findScriptFunction(script.scriptModule);
        scriptObj = func ? func : script.sourceDir.resolve(script.scriptModule);
      }
      else {
        depends.push(script.scriptModule.toPath());
        scriptObj = script.scriptModule;
      }

      if (script.INPUT) {
        depends.push(script.INPUT.toPath());
      }

      const msg = "\x1b[36m" + "Generating " + script.binaryDir.relative(script.OUTPUT) + "\x1b[0m";
      const ge = new GoalTarget(name);
      ge.message = msg;
      ge.output = script.OUTPUT;
      ge.addDependency(...depends);
      ge.addTask(new ExecScriptTask(script.variableMap, scriptObj));
      goalList.addTarget(ge);
    }

    const objectFiles = new Map<SourceFile, Locator>();
    for (const target of this[TARGETS].ENTRIES.values()) {
      for (const it of target.getSourceFiles()) {
        if (!it.LANGUAGE)
          continue;
        const rfile1 = target.binaryDir.relative(it.FILE);
        const rfile2 =  target.sourceDir.relative(it.FILE);
        const rfile = (rfile2.length < rfile1.length ? rfile2 : rfile1).replace("../", "__/");
        const ofile =  target.binaryDir.join("MakeFiles", target.targetName + ".dir",  rfile + ".obj");
        objectFiles.set(it, ofile);
      }
    }

    for (const [name, target] of this[TARGETS].ENTRIES) {
      const depends = [];
      for (const s of target.getTargetObjects()) {
        const t = this[TARGETS].get(s.targetName);
        for (const f of t.getSourceFiles()) {
          const o = objectFiles.get(f);
          o && depends.push(o.toString());
        }
      }
  
      const headers = this[TARGETS].allHeadersOf(target);
      for (const s of target.getSourceFiles()) {
        if (s.HEADER_FILE_ONLY)
          continue;

        const o = objectFiles.get(s);
        if (!o)
          throw new Error(`OBJECT_FILE is null`);

        fs.mkdirSync(o.dirname().toString(), { recursive: true });
  
        const relativeObject = target.binaryDir.relative(o);
        const relativeBinaryDir = scope.PROJECT_BINARY_DIR.relative(target.binaryDir);
        const msg = "\x1b[32m" + `Building ${s.LANGUAGE} object ${relativeBinaryDir}/${relativeObject}` + "\x1b[0m";
  
        const definitions = [
          ...this[TARGETS].allDefinitionsOf(target),
          ...s.DEFINES,
        ];

        const args: string[] = [];
        args.push(...definitions.map(i => "-D" + i));
        args.push(...this[TARGETS].allIncludesOf(target).map(i => "-I" + i));
        args.push(...this[TARGETS].allCompileOptionsOf(target));
        if (target.positionIndependentCode)
          args.push("-fPIC");
        args.push(...s.COMPILE_FLAGS.flat());
        args.push("-o", relativeObject);
        args.push("-c", s.FILE.toString());
  
        const output = Locator.create(target.binaryDir.join(relativeObject));
        depends.push(output.toString());

        const ge = new GoalTarget;
        ge.message = msg;
        ge.output = output;
        ge.addDependency(...headers);
        ge.addDependency(s.FILE.toPath());
        ge.addTask(new SpawnSyncTask(s.COMPILE_PATH.toString(), args, target.binaryDir.toPath()));
        goalList.addTarget(ge);
      }

      const generalGoal = new GoalTarget;
      for (const params of target.preBuildList) {
        const execStruct = resolveTargetCommand(this, params);
        generalGoal.addTask(new SpawnSyncTask(execStruct.command, execStruct.args, target.binaryDir.toString()));
      }

      const linkOptions = this[TARGETS].allLinkOptionsOf(target);
      if (target.isObjectLibrary) {
        const objs = depends.filter(i => i.endsWith(".o") || i.endsWith(".obj")).map(i => target.getFileDir().relative(i));
        if (objs.length) {
          const args = [
            ...linkOptions,
            "-r",
            "-o", target.getFileName(),
            ...objs
          ];
          generalGoal.message = `Linking ${target.language} object library ${target.getFileName()}`;
          generalGoal.output = target.getFile();
          generalGoal.addDependency(...depends);
          generalGoal.addTask(new SpawnSyncTask(scope.LINKER, args, target.getFileDir().toString()));
        }
        else {
          logger.info(`No objects for "${target.targetName}"`);
        }
      }
  
      if (target.isStaticLibrary) {
        const objs = depends.filter(i => i.endsWith(".o") || i.endsWith(".obj")).map(i => target.getFileDir().relative(i));
        if (objs.length) {
          const args = [ "rc", target.getFileName() , ...objs ];
          generalGoal.message = `Linking ${target.language} static library ${target.getFileName()}`;
          generalGoal.output = target.getFile();
          generalGoal.addDependency(...depends);
          generalGoal.addTask(new SpawnSyncTask(scope.AR, args, target.getFileDir().toString()));
        }
        else {
          logger.info(`No objects for "${target.targetName}"`);
        }
      }
  
      if (target.isSharedLibrary) {
        throw new Error("Not implemented");
      }

      if (target.isExecutable) {
        const objs = depends.filter(i => i.endsWith(".o") || i.endsWith(".obj")).map(i => target.getFileDir().relative(i));
        if (objs.length) {
          const libs = this[TARGETS].allLibrariesOf(target);
          const args = [
            ...target.compilerFlags,
            ...linkOptions,
            ...objs,
            "-o", target.getFileName(),
            ...libs.map(i => target.getFileDir().relative(i)),
          ];

          generalGoal.message = `Linking ${target.language} executable ${target.getFileName()}`;
          generalGoal.output = target.getFile();
          generalGoal.addDependency(...depends);
          generalGoal.addDependency(...libs);
          generalGoal.addTask(new SpawnSyncTask(target.compilerPath, args, target.getFileDir().toString()));
        }
        else {
          logger.info(`No objects for "${target.targetName}"`);
        }
      }

      for (const params of target.postBuildList) {
        const execStruct = resolveTargetCommand(this, params);
        generalGoal.addTask(new SpawnSyncTask(execStruct.command, execStruct.args, target.binaryDir.toString()));
      }
      
      goalList.addTarget(generalGoal);

      const worker = new GoalTarget(name);
      worker.message = `Built target ${name}`;
      worker.addDependency(target.getFile().toPath());
      goalList.addTarget(worker);
    }

    if (this._installList.length) {
      const worker = new GoalTarget(INSTALL_TARGET);
      const fileInstallationTask = new FileInstallationTask;
      for (const iter of this._installList) {
        let src: Locator, dest: Locator;
        if (iter.value instanceof Locator) {
          if (scope.PREVENT_INSTALL_FILES)
            continue;
          src = iter.value;
          const rfile = (iter.baseDir as any).relative(iter.value);
          dest = iter.destination.join(rfile);
        }
        else if (iter.value instanceof TargetName) {
          const targetName = iter.value.targetName;
          const target = this[TARGETS].get(targetName);
          src = target.getFile();
          dest = iter.destination.join(target.getFileName());
        }
        else {
          throw new Error(`Can not install ${iter.value}`)
        }
        if (scope.DESTDIR)
          dest = scope.DESTDIR.join(dest);
        worker.addDependency(src.toPath());
        fileInstallationTask.add(src, dest);
      }
      worker.addTask(fileInstallationTask);
      goalList.addTarget(worker);
    }

    const ge = new GoalTarget(ALL_TARGET);
    Object.keys(this[TARGETS].ENTRIES).forEach(i => void ge.addDependency(i))
    goalList.addTarget(ge);
  
    return goalList;
  }

  public toJSON() {
    return {
      TARGETS: this.TARGETS,
      customScripts: this._customScripts,
      CACHE: this.CACHE,
      installList: this._installList,
      processedVariableMap: this._processedVariableMap,
      subdirAlias: this._subdirAlias,
    };
  }
};
