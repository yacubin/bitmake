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
import { FilePath, DirPath, AbsolutePath } from "@/core/Path";
import { fileExists, fileExistsSync } from "@/utils/FileSystem";
import { TargetCollection, TargetStructCollection } from "@/core//TargetCollection";
import { ScriptCollection } from "@/core/ScriptCollection";
import { InterfaceTarget } from "@/core/InterfaceTarget";
import { GoalCollection } from "@/core/GoalCollection";
import { InterfaceScript } from "@/core/InterfaceScript";
import { MakeContext } from "@/core/MakeContext";
import { ObjectLibrary, StaticLibrary, SharedLibrary, Executable, BaseTarget } from "@/core/Target";
import { ScopeHelper } from "@/core/Scope";
import { SystemScope } from "@/core/SystemScope";
import { importModule } from "@/utils/Module";
import { createLogger } from "@/logger";
import { InstallEntity } from "@/core/InstallEntity";
import { CustomScript } from "@/core/CustomScript";
import { ScriptContext } from "@/core/ScriptContext";
import { spawnSync } from "node:child_process";

import configure_file from "@/core/BuildinScripts/configure_file";
import install_script from "@/core/BuildinScripts/install_script";
import path from "node:path";

const logger = createLogger(import.meta.url);

const requireImpl = eval("require");

const TARGETS = Symbol("TARGETS");
const CUSTOM_SCRIPTS = Symbol("CUSTOM_SCRIPTS");
const CACHE = Symbol("CACHE");
const INTERFACE_SCRIPTS = Symbol("INTERFACE_SCRIPTS");
const INSTALL_LIST = Symbol("INSTALL_LIST");
const SCRIPT_VARIABLES_MAP = Symbol("SCRIPT_VARIABLES_MAP");
const SUBDIR_ALIAS = Symbol("SUBDIR_ALIAS");
const SUBDIR_LIST = Symbol("SUBDIR_LIST");
const BUILTIN_SCRIPTS = Symbol("BUILTIN_SCRIPTS");
const TARGET_COLLECTION = Symbol("TARGET_COLLECTION");

type SubdirectoryAlias = {
  [name: string]: DirPath | null;
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

function scopeValueAsPrimitives(o: any): any {
  if (typeof o === "undefined")
    return o;
  if (typeof o === "boolean")
    return o;
  if (typeof o === "number")
    return o;
  if (typeof o === "string")
    return o;
  if (typeof o === "object") {
    if (!o)
      return o;
    if (o instanceof AbsolutePath) {
      return o.toString();
    }
    if (o instanceof Array) {
      const result = [];
      for (const i of o)
        result.push(scopeValueAsPrimitives(i));
      return result;
    }
    if (o instanceof Object) {
      const result: any = {};
      for (const [k,v] of Object.entries(o))
        result[k] = scopeValueAsPrimitives(v);
      return result;
    }
  }
  throw new Error(`Unknown instance of ${o}`);
}

type GoalHandler = () => Promise<void> | void;

class GoalWorkerImpl {
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
      await fs.promises.mkdir(path.posix.dirname(this._output), { recursive: true });

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
      console.info(percent + this._message);
    }
  }

  addExec(command: string, args: string[], cwd: string): void {
    this.addCallback(() => {
      const result = spawnSync(command, args, { cwd, encoding: "utf-8" });
      if (result.error || result.status) {
        logger.info("cd " + cwd);
        let cmd = args.join(" ");
        cmd = command + (cmd ? " " : "") + cmd;
        logger.info(cmd);
        logger.info("");
    
        logger.error(result.stderr);
    
        if (result.error)
            throw result.error;
    
        throw new Error(result.error as any || "Status " + result.status);
      }
      if (result.stdout) {
        for (const line of result.stdout.trim().split("\n")) {
          logger.info(line);
        }
      }
    })
  }

  addScript(global: GlobalContext, scope: SystemScope, script: FilePath | Function, params: any): void {
    this.addCallback(async () => {
      let func: any = script;
      if (script instanceof FilePath)
        func = (await importModule(func.toString())).default;
      if (func instanceof Function) {
        const mk = ScriptContext.create(scope, global);
        const result = func(mk, scopeValueAsPrimitives(params));
        if (result instanceof Promise)
          await result;
      }
      else {
        throw new Error(`There is no Function`);
      }
    });
  }
};

export class GlobalContext {
  private [TARGET_COLLECTION] = new TargetStructCollection;
  private [TARGETS]: TargetCollection;
  private [CUSTOM_SCRIPTS]: ScriptCollection;
  private [CACHE]: CacheVariableDescriptors;
  private [INTERFACE_SCRIPTS]: InterfaceScripts;
  private [INSTALL_LIST]: InstallEntity[];
  private [SCRIPT_VARIABLES_MAP]: any;
  private [SUBDIR_ALIAS]: SubdirectoryAlias;
  private [SUBDIR_LIST]: SystemScope[];
  private [BUILTIN_SCRIPTS]: BuildinScripts;

  private constructor() {
    this[TARGETS] = TargetCollection.create();
    this[CUSTOM_SCRIPTS] = ScriptCollection.create();
    this[CACHE] = {};
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

  public get CACHE() {
    return this[CACHE];
  }

  public get INTERFACE_SCRIPTS() {
    return this[INTERFACE_SCRIPTS];
  }

  public get SCRIPT_VARIABLES_MAP() {
    return this[SCRIPT_VARIABLES_MAP];
  }

  public addCustomScript(scope: SystemScope, script: any, params: any): CustomScript {
    if (!params)
      throw new Error("Argument with parameters is missing");

    let scriptObj: Function | FilePath | undefined;
    if (typeof script === "string")
      scriptObj = this.findScriptFunction(script);
    if (!scriptObj)
      scriptObj = FilePath.create(scope.SOURCE_DIR.resolve(script));

    let inputFile = params.SCRIPT_INPUT;
    if (inputFile)
      inputFile = FilePath.create(scope.SOURCE_DIR.resolve(inputFile));

    if (!params.SCRIPT_OUTPUT)
      throw new Error("CustomScript parameters required output entity");
    const outputFile = FilePath.create(scope.SOURCE_DIR.resolve(params.SCRIPT_OUTPUT));

    const options: CustomScript.Options = {
      scope,
      name: params.SCRIPT_NAME,
      script: scriptObj,
      output: outputFile,
      input: inputFile,
      workDir: scope.BINARY_DIR,
      variables: params.variables || {},
    };

    const target = CustomScript.create(options);
    if (options.name)
      this[CUSTOM_SCRIPTS].set(options.name, target);
    else
      this[CUSTOM_SCRIPTS].add(target);

    return target;
  }

  public registerSystemScope(name: string, scope: SystemScope) {
    if (this[SCRIPT_VARIABLES_MAP][name])
      throw new Error(`SystemVariables exists for ${name}`);
    this[SCRIPT_VARIABLES_MAP][name] = scope;
  }

  public resolveSubdirectory(path: AbsolutePath | string) {
    const resolvedPath = this[SUBDIR_ALIAS][path.toString()];
    if (resolvedPath === undefined)
      return path;
    if (resolvedPath === null)
      return undefined;
    return resolvedPath;
  }

  public addSubdirectoryAlias(src: DirPath, dest: DirPath | null) {
    const srcStr = src.toString();
    if (this[SUBDIR_ALIAS].hasOwnProperty(srcStr))
      logger.warn(`Owerride "${srcStr}" subdirectory alias`);
    this[SUBDIR_ALIAS][srcStr] = dest;
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

  public addStaticLibrary(scope: SystemScope, name: string, ...sources: any[]): StaticLibrary {
    const impl = this[TARGET_COLLECTION].get(name);
    const target = StaticLibrary.create(impl, scope);
    target.addSources(...sources);
    this[TARGETS].set(name, target);
    return target;
  }

  public addObjectLibrary(scope: SystemScope, name: string, ...sources: any[]): ObjectLibrary {
    const impl = this[TARGET_COLLECTION].get(name);
    const target = ObjectLibrary.create(impl, scope);
    target.addSources(...sources);
    this[TARGETS].set(name, target);
    return target;
  }

  public addSharedLibrary(scope: SystemScope, name: string, ...sources: any[]): SharedLibrary {
    const impl = this[TARGET_COLLECTION].get(name);
    const target = SharedLibrary.create(impl, scope);
    target.addSources(...sources);
    this[TARGETS].set(name, target);
    return target;
  }

  public addExecutable(scope: SystemScope, name: string, ...sources: any[]): Executable {
    const impl = this[TARGET_COLLECTION].get(name);
    const target = Executable.create(impl, scope);
    target.addSources(...sources);
    this[TARGETS].set(name, target);
    return target;
  }

  getTarget(scope: SystemScope, name: string): InterfaceTarget {
    const impl = this[TARGET_COLLECTION].get(name);
    return InterfaceTarget.create(scope, impl);
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
      if (!scope)
        continue;

      let scriptFile: AbsolutePath | undefined;
      const fileList = [ ".js", ".mjs" ].map(i => "MakeScript" + i);
      for (const filename of fileList) {
        const iter = scope.SOURCE_DIR.join(filename);
        if (await fileExists(iter.toString())) {
          scriptFile = iter;
          break;
        }
      }

      if (!scriptFile)
        throw new Error(`There are no files ${fileList.join(", ")} in "${scope.SOURCE_DIR}"`);

      this.registerSystemScope(scriptFile.toString(), scope);

      scope.SCRIPT_FILE = scriptFile;
      scope.SCRIPT_DIR = scope.SCRIPT_FILE.dirname();

      const cwdSave = process.cwd();
      process.chdir(scope.SOURCE_DIR.toString());

      const module = await importModule(scope.SCRIPT_FILE.toString());
      if (!module.default)
        throw new Error(`Subdirectory ${scope.SCRIPT_FILE.basename()} not contain default function`);
      const mk = MakeContext.create(scope, this);
      const result = module.default(mk);
      if (result instanceof Promise)
        await result;
      ScopeHelper.applyVariables(scope, mk);

      process.chdir(cwdSave);
    }
  }

  public createGoals(scope: SystemScope): GoalCollection {
    for (const iter of Object.values(this[INTERFACE_SCRIPTS])) {
      const script = this[CUSTOM_SCRIPTS].get(iter.NAME);
      if (!script)
        throw new Error(`There is no CustomScript named ${iter.NAME}`);
      script.mergeVariables(iter.VARIABLES);
    }
  
    const goalList = GoalCollection.create();
    for (const script of this[CUSTOM_SCRIPTS].ENTRIES) {   
      const depends = [];
      if (script.SCRIPT instanceof FilePath)
        depends.push(script.SCRIPT.toString());
      if (script.INPUT)
        depends.push(script.INPUT.toString());
      const msg = "\x1b[36m" + "Generating " + script.workDir.relative(script.OUTPUT) + "\x1b[0m";
      const params = { ...script.VARIABLES };
      const worker = new GoalWorkerImpl(script.NAME);
      worker.message = msg;
      worker.output = script.OUTPUT.toString();
      worker.addDependency(...depends);
      worker.addScript(this, script.SCOPE, script.SCRIPT, params);
      goalList.add(worker);
    }

    for (const target of Object.values(this[TARGETS].ENTRIES)) {
      for (const it of target.IMPL.getSourceFiles()) {
        if (!it.LANGUAGE)
          continue;
        const rfile1 = target.TARGET_SCOPE.BINARY_DIR.relative(it.FILE);
        const rfile2 =  target.TARGET_SCOPE.SOURCE_DIR.relative(it.FILE);
        const rfile = (rfile2.length < rfile1.length ? rfile2 : rfile1).replace("../", "__/");
        it.OBJECT_FILE =  target.TARGET_SCOPE.BINARY_DIR.join("MakeFiles", target.NAME + ".dir",  rfile + ".obj");
      }
    }

    for (const [name, target] of Object.entries(this[TARGETS].ENTRIES)) {
      const depends = [];
      for (const s of target.IMPL.getInterfaceObjectsList()) {
        const t = this[TARGETS].get(s.targetName) as BaseTarget;
        for (const f of t.IMPL.getSourceFiles()) {
          if (f.OBJECT_FILE)
            depends.push(f.OBJECT_FILE.toString());
        }
      }
  
      const headers = this[TARGETS].allHeadersOf(target);
      for (const s of target.IMPL.getSourceFiles()) {  
        if (s.HEADER_FILE_ONLY)
          continue;
        
        if (!s.OBJECT_FILE_DIR)
          throw new Error(`OBJECT_FILE_DIR is null`);
        
        if (!s.OBJECT_FILE)
          throw new Error(`OBJECT_FILE is null`);

        fs.mkdirSync(s.OBJECT_FILE_DIR.toString(), { recursive: true });
  
        const relativeObject = target.TARGET_SCOPE.BINARY_DIR.relative(s.OBJECT_FILE);
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
        if (target.POSITION_INDEPENDENT_CODE)
          args.push("-fPIC");
        args.push(...s.COMPILE_FLAGS.flat());
        args.push("-o", relativeObject);
        args.push("-c", s.FILE.toString());
  
        const command = (target.TARGET_SCOPE as any)[s.LANGUAGE + "_COMPILER"].toString();
        const output = DirPath.create(target.TARGET_SCOPE.BINARY_DIR.join(relativeObject));
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
          logger.info(`No objects for "${target.NAME}"`);
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
          logger.info(`No objects for "${target.NAME}"`);
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
          logger.info(`No objects for "${target.NAME}"`);
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
      dest = dest.toString();
      installPairs.push({src, dest});
    }

    if (installPairs.length) {
      const worker = new GoalWorkerImpl(INSTALL_TARGET);
      installPairs.forEach(i => void worker.addDependency(i.src));
      worker.addCallback(async () => {
        for (const iter of installPairs)
          await install_script(scopeValueAsPrimitives(iter));
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
      INTERFACE_SCRIPTS: this.INTERFACE_SCRIPTS,
      INSTALL_LIST: this[INSTALL_LIST],
      SCRIPT_VARIABLES_MAP: this.SCRIPT_VARIABLES_MAP,
      SUBDIR_ALIAS: this[SUBDIR_ALIAS],
      TARGET_COLLECTION: this[TARGET_COLLECTION],
    };
  }
};
