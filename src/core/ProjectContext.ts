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
import { spawnSync } from "node:child_process";

import { ALL_TARGET, INSTALL_TARGET } from "@/Constants";
import { AbsolutePath } from "@/core/AbsolutePath";
import { Path } from "@/utils/Path";
import { fileExists, fileExistsSync } from "@/utils/FileSystem";
import { TargetCollection, TargetStructCollection } from "@/core/TargetCollection";
import { ScriptCollection } from "@/core/ScriptCollection";
import { GoalCollection } from "@/core/GoalCollection";
import { InterfaceScript } from "@/core/InterfaceScript";
import { UserMakeContext } from "@/core/UserMakeContext";
import { LocalMakeContext } from "@/core/LocalMakeContext";
import { ObjectLibrary, StaticLibrary, SharedLibrary, Executable, BaseTarget, UserIndirectTarget } from "@/core/Target";
import { SystemScope } from "@/core/SystemScope";
import { importModule, requireSync } from "@/utils/Module";
import { Logger } from "@/logger";
import { InstallEntity } from "@/core/InstallEntity";
import { CustomScript } from "@/core/CustomScript";
import { ScriptContext } from "@/core/ScriptContext";
import { ScopeHelper, VariableMap } from "./Scope";
import { TargetStruct } from "./TargetStruct";
import { SourceFile } from "@/core/SourceFile";
import { performContext, createVariableMapForDirectory } from "@/core/BaseContext";

import BuildinScripts from "@/core/BuildinScripts";

const logger = Logger.create(import.meta.url);

const TARGETS = Symbol("TARGETS");
const CUSTOM_SCRIPTS = Symbol("CUSTOM_SCRIPTS");
const CACHE = Symbol("CACHE");
const INSTALL_LIST = Symbol("INSTALL_LIST");
const BUILTIN_SCRIPTS = Symbol("BUILTIN_SCRIPTS");
const TARGET_COLLECTION = Symbol("TARGET_COLLECTION");

type SubdirectoryAlias = {
  [name: string]: AbsolutePath | null;
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

function getFile(target: TargetStruct): AbsolutePath {
  if (!target.targetFile.file)
    throw new Error(`Target "${target.name}" is not defined`);
  return target.targetFile.file;
}

function getFileName(target: TargetStruct): string {
  if (!target.targetFile.fileName)
    throw new Error(`Target "${target.name}" is not defined`);
  return target.targetFile.fileName;
}

function getFileDir(target: TargetStruct): AbsolutePath {
  if (!target.targetFile.fileDir)
    throw new Error(`Target "${target.name}" is not defined`);
  return target.targetFile.fileDir;
}

type GoalHandler = () => Promise<void> | void;

export class GoalWorkerImpl {
  private _message: string | undefined;
  private _name: string | undefined;
  private _output: string | undefined;
  private _depends: string[];
  private _callbacks: GoalHandler[];

  constructor(name?: string) {
    this._name = name;
    this._depends = [];
    this._callbacks = [];
  }

  get message(): string | undefined {
    return this._message;
  }

  set message(value: string) {
    this._message = value;
  }

  get name(): string | undefined {
    return this._name;
  }

  get output(): string | undefined {
    return this._output;
  }

  set output(value: string) {
    this._output = value;
  }

  get depends(): string[] {
    return this._depends;
  }

  public addDependency(...value: string[]) {
    this._depends.push(...value);
  }

  public addCallback(handler: GoalHandler) {
    this._callbacks.push(handler);
  }

  async doWork(): Promise<void> {
    if (this._output)
      await fs.promises.mkdir(Path.dirname(this._output), { recursive: true });

    for (const func of this._callbacks) {
      const res = func();
      if (res instanceof Promise)
        await res;
    }
  }

  updateProgress(event: { loaded: number, total: number }): void {
    if (this._message) {
      const relationOfLength = Math.round((++event.loaded / event.total) * 100);
      const percent = "[" + relationOfLength.toString().padStart(3, " ") + "%] ";
      logger.notice(percent + this._message);
    }
  }

  addExec(command: string, args: string[], cwd: string): void {
    this.addCallback(() => {
      const result = spawnSync(command, args, { cwd, encoding: "utf-8" });
      if (result.error || result.status) {
        logger.notice("cd " + cwd);
        let cmd = args.join(" ");
        cmd = command + (cmd ? " " : "") + cmd;
        logger.notice(cmd);
        logger.notice("");
    
        logger.fatal(result.stderr);
    
        if (result.error)
            throw result.error;
    
        throw new Error(result.error as any || "Status " + result.status);
      }
      if (result.stdout) {
        for (const line of result.stdout.trim().split("\n")) {
          logger.notice(line);
        }
      }
    })
  }

  addScript(global: ProjectContext, variableMap: VariableMap, script: AbsolutePath | Function): void {
    this.addCallback(async () => {
      let func: any = script;
      if (script instanceof AbsolutePath) {
        const scriptUrl = url.pathToFileURL(func.toString());
        func = (await importModule(scriptUrl)).default;
      }
      if (func instanceof Function) {
        const mk = ScriptContext.create(global, variableMap);
        const result = func(mk);
        if (result instanceof Promise)
          await result;
      }
      else {
        throw new Error(`There is no Function`);
      }
    });
  }
};

export class ProjectContext {
  private [TARGET_COLLECTION] = new TargetStructCollection;
  private [TARGETS]: TargetCollection;
  private [CUSTOM_SCRIPTS]: ScriptCollection;
  private [CACHE]: CacheVariableDescriptors;
  private _interfaceScripts: InterfaceScripts;
  private [INSTALL_LIST]: InstallEntity[];
  private _processedVariableMap: any;
  private [BUILTIN_SCRIPTS]: BuildinScripts;
  private _subdirAlias: SubdirectoryAlias;
  private _subdirList: VariableMap[];

  private constructor() {
    this[TARGETS] = TargetCollection.create();
    this[CUSTOM_SCRIPTS] = ScriptCollection.create();
    this[CACHE] = {};
    this._interfaceScripts = {};
    this[INSTALL_LIST] = [];
    this._processedVariableMap = {};
    this._subdirAlias = {};
    this[BUILTIN_SCRIPTS] = BuildinScripts;
    this._subdirList = [];
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

  public getInterfaceScript(variableMap: VariableMap, name: string): InterfaceScript {
    let script = this._interfaceScripts[name];
    if (!script) {
      script = InterfaceScript.create(name);
      this._interfaceScripts[name] = script;
    }
    return script;
  }

  public addCustomScript(variableMap: VariableMap): CustomScript {
    const script = ScopeHelper.get(variableMap, "SCRIPT_MODULE");
    const sourceDir = ScopeHelper.get(variableMap, "SOURCE_DIR");
    let scriptObj: Function | AbsolutePath | undefined;
    if (typeof script === "string")
      scriptObj = this.findScriptFunction(script);
    if (!scriptObj)
      scriptObj = sourceDir.resolve(script) as AbsolutePath;

    let inputFile = ScopeHelper.get(variableMap, "SCRIPT_INPUT");
    if (inputFile)
      inputFile = sourceDir.resolve(inputFile) as AbsolutePath;

    let outputFile = ScopeHelper.get(variableMap, "SCRIPT_OUTPUT");
    if (!outputFile)
      throw new Error("CustomScript parameters required output entity");

    outputFile = sourceDir.resolve(outputFile) as AbsolutePath;

    const options: CustomScript.Options = {
      variableMap,
      name: ScopeHelper.get(variableMap, "SCRIPT_NAME"),
      script: scriptObj,
      output: outputFile,
      input: inputFile,
      workDir: ScopeHelper.get(variableMap, "BINARY_DIR"),
    };

    const target = CustomScript.create(options);
    if (options.name)
      this[CUSTOM_SCRIPTS].set(options.name, target);
    else
      this[CUSTOM_SCRIPTS].add(target);

    return target;
  }

  public registerVariableMap(name: string, variableMap: VariableMap) {
    if (this._processedVariableMap[name])
      throw new Error(`SystemVariables exists for ${name}`);
    this._processedVariableMap[name] = variableMap;
  }

  public resolveSubdirectory(path: AbsolutePath | string): AbsolutePath | string | undefined {
    const resolvedPath = this._subdirAlias[path.toString()];
    if (resolvedPath === undefined)
      return path;
    if (resolvedPath === null)
      return undefined;
    return resolvedPath;
  }

  public addSubdirectoryAlias(variableMap: VariableMap, src: any, dest: any) {
    const srcPath = AbsolutePath.create(ScopeHelper.get(variableMap, "SOURCE_DIR").resolve(src));
    const destPath = (dest === null) ? null : AbsolutePath.create(ScopeHelper.get(variableMap, "SOURCE_DIR").resolve(dest));
    const srcStr = srcPath.toString();
    if (this._subdirAlias.hasOwnProperty(srcStr))
      logger.warn(`Owerride "${srcStr}" subdirectory alias`);
    this._subdirAlias[srcStr] = destPath;
  }

  public addInstallEntry(entry: InstallEntity) {
    return this[INSTALL_LIST].push(entry);
  }

  public addCacheVariables(variables: CacheVariableDescriptors) {
    const cache = this[CACHE];
    for (const [key, entry] of Object.entries(variables)) {
      cache[key] = entry;
    }
  }

  public loadCacheVariables(filename: AbsolutePath | string) {
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

  public addStaticLibrary(variableMap: VariableMap, name: string): StaticLibrary {
    const impl = this[TARGET_COLLECTION].getOrCreate(name);
    const target = StaticLibrary.create(impl, variableMap, name);
    this[TARGETS].set(name, target);
    return target;
  }

  public addObjectLibrary(variableMap: VariableMap, name: string): ObjectLibrary {
    const impl = this[TARGET_COLLECTION].getOrCreate(name);
    const target = ObjectLibrary.create(impl, variableMap, name);
    this[TARGETS].set(name, target);
    return target;
  }

  public addSharedLibrary(variableMap: VariableMap, name: string): SharedLibrary {
    const impl = this[TARGET_COLLECTION].getOrCreate(name);
    const target = SharedLibrary.create(impl, variableMap, name);
    this[TARGETS].set(name, target);
    return target;
  }

  public addExecutable(variableMap: VariableMap, name: string): Executable {
    const impl = this[TARGET_COLLECTION].getOrCreate(name);
    const target = Executable.create(impl, variableMap, name);
    this[TARGETS].set(name, target);
    return target;
  }

  public getTarget(name: string): TargetStruct {
    return this[TARGET_COLLECTION].getOrCreate(name);
  }

  public executeScriptSync(variableMap: VariableMap, script: any, params: any) {
    const newVariableMap = ScopeHelper.cloneVariableMap(variableMap);
    params && ScopeHelper.extendVariableMapByValues(newVariableMap, "", params);
    const scriptPath = ScopeHelper.get(newVariableMap, "SOURCE_DIR").resolve(script);
    const func = requireSync(scriptPath.toString());
    const mk = ScriptContext.create(this, newVariableMap);
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
      let scriptFile: AbsolutePath | undefined;
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

  public addSubdirectory(variableMap: VariableMap, sourceDir: any, binaryDir?: any) {
    const newVariableMap = createVariableMapForDirectory(variableMap, sourceDir, binaryDir);
    if (newVariableMap) {
      this._subdirList.push(newVariableMap);
    }
  }

  public findScriptFunction(name: string): Function | undefined {
    return this[BUILTIN_SCRIPTS][name];
  }

  public async doSubdirectory() {
    const contextList = new Array<LocalMakeContext>();

    for (;;) {
      const variableMap = this._subdirList.shift();
      if (!variableMap)
        break;

      if (!await this.prepearScriptFile(variableMap))
        continue;

      const ctx = new LocalMakeContext(variableMap, this);
      contextList.push(ctx);
      const mk = UserMakeContext.create(ctx, variableMap);

      const cwdSave = process.cwd();
      process.chdir(mk.SCRIPT_DIR.toString());
      await performContext(mk);
      process.chdir(cwdSave);
    }

    for (const ctx of contextList) {
      for (const [name, target] of ctx.targets) {
        const impl = this[TARGET_COLLECTION].get(name);
        impl.targetFile.setPrefix(target.prefix);
        impl.targetFile.setOutputName(target.outputName);
        impl.targetFile.setSuffix(target.suffix);
        impl.setPositionIndependentCode(target.positionIndependentCode);
        for (const {publicOnly, value} of target.getIncludes())
          impl.addInclude("directly", publicOnly, value);
        for (const {publicOnly, value} of target.getDefinitions())
          impl.addDefinition("directly", publicOnly, value);
        for (const {publicOnly, value} of target.getCompileOptions())
          impl.addCompileOption("directly", publicOnly, value);
        for (const {publicOnly, value} of target.getLinkOptions())
          impl.addLinkOption("directly", publicOnly, value);
        for (const {publicOnly, value} of target.getLibraries())
          impl.addLibrary("directly", publicOnly, value);
        for (const {publicOnly, value} of target.getSources())
          impl.addSource("directly", publicOnly, value);
      }
    }

    for (const ctx of contextList) {
      for (const [name, target] of ctx.indirectTargets) {
        const impl = this[TARGET_COLLECTION].get(name);
        if (target.prefix !== undefined)
          impl.targetFile.setPrefix(target.prefix);
        if (target.outputName !== undefined)
          impl.targetFile.setOutputName(target.outputName);
        if (target.suffix !== undefined)
          impl.targetFile.setSuffix(target.suffix);
        if (target.positionIndependentCode !== undefined)
          impl.setPositionIndependentCode(target.positionIndependentCode);
        for (const {publicOnly, value} of target.getIncludes())
          impl.addInclude("directly", publicOnly, value);
        for (const {publicOnly, value} of target.getDefinitions())
          impl.addDefinition("directly", publicOnly, value);
        for (const {publicOnly, value} of target.getCompileOptions())
          impl.addCompileOption("directly", publicOnly, value);
        for (const {publicOnly, value} of target.getLinkOptions())
          impl.addLinkOption("directly", publicOnly, value);
        for (const {publicOnly, value} of target.getLibraries())
          impl.addLibrary("directly", publicOnly, value);
        for (const {publicOnly, value} of target.getSources())
          impl.addSource("directly", publicOnly, value);
      }
    }
  }

  public createGoals(scope: SystemScope): GoalCollection {
    for (const iter of Object.values(this._interfaceScripts)) {
      const script = this[CUSTOM_SCRIPTS].get(iter.NAME);
      if (!script)
        throw new Error(`There is no CustomScript named ${iter.NAME}`);
      script.mergeVariables(iter.variables);
    }
  
    const goalList = GoalCollection.create();
    for (const script of this[CUSTOM_SCRIPTS].ENTRIES) {   
      const depends = [];
      if (script.SCRIPT instanceof AbsolutePath)
        depends.push(script.SCRIPT.toString());
      if (script.INPUT)
        depends.push(script.INPUT.toString());
      const msg = "\x1b[36m" + "Generating " + script.workDir.relative(script.OUTPUT) + "\x1b[0m";
      const worker = new GoalWorkerImpl(script.NAME);
      worker.message = msg;
      worker.output = script.OUTPUT.toString();
      worker.addDependency(...depends);
      worker.addScript(this, script.variableMap, script.SCRIPT);
      goalList.add(worker);
    }

    const objectFiles = new Map<SourceFile, AbsolutePath>();
    for (const target of Object.values(this[TARGETS].ENTRIES)) {
      for (const it of target.IMPL.getSourceFiles()) {
        if (!it.LANGUAGE)
          continue;
        const rfile1 = target.TARGET_SCOPE.BINARY_DIR.relative(it.FILE);
        const rfile2 =  target.TARGET_SCOPE.SOURCE_DIR.relative(it.FILE);
        const rfile = (rfile2.length < rfile1.length ? rfile2 : rfile1).replace("../", "__/");
        const ofile =  target.TARGET_SCOPE.BINARY_DIR.join("MakeFiles", target.targetName + ".dir",  rfile + ".obj");
        objectFiles.set(it, ofile);
      }
    }

    for (const [name, target] of Object.entries(this[TARGETS].ENTRIES)) {
      const targetImpl = target.IMPL;
      const depends = [];
      for (const s of target.IMPL.getInterfaceObjectsList()) {
        const t = this[TARGETS].get(s.targetName) as BaseTarget;
        for (const f of t.IMPL.getSourceFiles()) {
          const o = objectFiles.get(f);
          o && depends.push(o.toString());
        }
      }
  
      const headers = this[TARGETS].allHeadersOf(target);
      for (const s of target.IMPL.getSourceFiles()) {
        if (s.HEADER_FILE_ONLY)
          continue;

        const o = objectFiles.get(s);
        if (!o)
          throw new Error(`OBJECT_FILE is null`);

        fs.mkdirSync(o.dirname().toString(), { recursive: true });
  
        const relativeObject = target.TARGET_SCOPE.BINARY_DIR.relative(o);
        const relativeBinaryDir = scope.PROJECT_BINARY_DIR.relative(target.TARGET_SCOPE.BINARY_DIR);
        const msg = "\x1b[32m" + `Building ${s.LANGUAGE} object ${relativeBinaryDir}/${relativeObject}` + "\x1b[0m";
  
        const definitions = [
          ...this[TARGETS].allDefinitionsOf(target),
          ...s.DEFINES,
        ];

        const args: string[] = [];
        args.push(...definitions.map(i => "-D" + i));
        args.push(...this[TARGETS].allIncludesOf(target).map(i => "-I" + i));
        args.push(...this[TARGETS].allCompileOptionsOf(target));
        if (targetImpl.positionIndependentCode)
          args.push("-fPIC");
        args.push(...s.COMPILE_FLAGS.flat());
        args.push("-o", relativeObject);
        args.push("-c", s.FILE.toString());
  
        const command = (target.TARGET_SCOPE as any)[s.LANGUAGE + "_COMPILER"].toString();
        const output = AbsolutePath.create(target.TARGET_SCOPE.BINARY_DIR.join(relativeObject));
        depends.push(output.toString());

        const worker = new GoalWorkerImpl;
        worker.message = msg;
        worker.output = output.toString();
        worker.addDependency(...headers);
        worker.addDependency(s.FILE.toString());
        worker.addExec(command, args, target.TARGET_SCOPE.BINARY_DIR.toString());
        goalList.add(worker);
      }

      const generalGoal = new GoalWorkerImpl;
      for (const params of target.IMPL.preBuildList) {
        generalGoal.addExec(params.command.toString(), params.args.map(i => i.toString()), target.TARGET_SCOPE.BINARY_DIR.toString());
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
          generalGoal.message = `Linking CXX object library ${target.FILE_NAME}`;
          generalGoal.output = target.FILE.toString();
          generalGoal.addDependency(...depends);
          generalGoal.addExec(scope.LINKER, args, target.FILE_DIR.toString());
        }
        else {
          logger.info(`No objects for "${target.targetName}"`);
        }
      }
  
      if (target instanceof StaticLibrary) {
        const objs = depends.filter(i => i.endsWith(".o") || i.endsWith(".obj")).map(i => target.FILE_DIR.relative(i));
        if (objs.length) {
          const args = [ "rc", target.FILE_NAME , ...objs ];
          generalGoal.message = `Linking CXX static library ${target.FILE_NAME}`;
          generalGoal.output = target.FILE.toString();
          generalGoal.addDependency(...depends);
          generalGoal.addExec(scope.AR, args, target.FILE_DIR.toString());
        }
        else {
          logger.info(`No objects for "${target.targetName}"`);
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

          generalGoal.message = `Linking CXX executable ${target.FILE_NAME}`;
          generalGoal.output = target.FILE.toString();
          generalGoal.addDependency(...depends);
          generalGoal.addDependency(...libs);
          generalGoal.addExec(scope.CXX_COMPILER, args, target.FILE_DIR.toString());
        }
        else {
          logger.info(`No objects for "${target.targetName}"`);
        }
      }

      for (const params of target.IMPL.postBuildList) {
        generalGoal.addExec(params.command.toString(), params.args.map(i => i.toString()), target.TARGET_SCOPE.BINARY_DIR.toString());
      }
      
      goalList.add(generalGoal);

      const worker = new GoalWorkerImpl(name);
      worker.message = `Built target ${name}`;
      worker.addDependency(target.FILE.toString());
      goalList.add(worker);
    }

    interface InstallGoalParams {
      src: string;
      dest: string;
    };

    const installPairs = new Array<InstallGoalParams>;
    for (const iter of this[INSTALL_LIST]) {
      let src: string, dest: any;
      if (iter.VALUE instanceof AbsolutePath) {
        if (scope.PREVENT_INSTALL_FILES)
          continue;
        src = iter.VALUE.toString();
        const rfile = (iter.BASE_DIR as any).relative(iter.VALUE);
        dest = iter.DESTINATION.join(rfile);
      }
      else if (iter.VALUE instanceof UserIndirectTarget) {
        const targetName = iter.VALUE.targetName;
        const target = this[TARGET_COLLECTION].get(targetName);
        src = getFile(target).toString();
        dest = iter.DESTINATION.join(getFileName(target));
      }
      else {
        throw new Error(`Can not install ${iter.VALUE}`)
      }
      if (scope.DESTDIR)
        dest = scope.DESTDIR.join(dest).toString();
      dest = dest.toString();
      installPairs.push({src, dest});
    }

    if (installPairs.length) {
      const worker = new GoalWorkerImpl(INSTALL_TARGET);
      installPairs.forEach(i => void worker.addDependency(i.src));
      worker.addCallback(async () => {
        for (const {src, dest} of installPairs) {
          logger.notice("Installing: " + dest);
          await fs.promises.mkdir(Path.dirname(dest), { recursive: true });
          await fs.promises.cp(src.toString(), dest.toString(), { force: true });
        }
      });
      goalList.add(worker);
    }

    const worker = new GoalWorkerImpl(ALL_TARGET);
    Object.keys(this[TARGETS].ENTRIES).forEach(i => void worker.addDependency(i))
    goalList.add(worker);
  
    return goalList;
  }

  public toJSON() {
    return {
      TARGETS: this.TARGETS,
      CUSTOM_SCRIPTS: this[CUSTOM_SCRIPTS],
      CACHE: this.CACHE,
      interfaceScripts: this._interfaceScripts,
      INSTALL_LIST: this[INSTALL_LIST],
      processedVariableMap: this._processedVariableMap,
      subdirAlias: this._subdirAlias,
      TARGET_COLLECTION: this[TARGET_COLLECTION],
    };
  }
};
