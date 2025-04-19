/*
 * MIT License
 *
 * Copyright (c) 2025  Yurii Yakubin (yurii.yakubin@gmail.com)
 *
 * Permission is granted to use, copy, modify, and distribute this software
 * under the MIT License. See LICENSE file for details.
 */

import path from "node:path";
import fs from "node:fs";
import { spawnSync } from "node:child_process";

import { AbsolutePath } from "@/core/Path";
import { importModule } from "@/utils/Module";

const ENTRIES = Symbol("ENTRIES");

enum GoalType {
  SCRIPT = "script",
  EXEC = "exec",
  TARGET = "target",
};

interface BaseGoal {
  name: string;
  type: GoalType;
  depends: Array<string>;
  msg: string;
  output: string;
};

interface ScriptGoal extends BaseGoal {
  script: AbsolutePath | Function;
  params: any;
};

interface ExecGoal extends BaseGoal {
  command: string;
  args: Array<string>;
  cwd: string;
};

export class GoalCollection {
  private [ENTRIES]: Array<BaseGoal>;

  private constructor() {
    this[ENTRIES] = new Array<BaseGoal>;
  }

  public get ENTRIES() {
    return this[ENTRIES];
  }

  public static create() {
    return Object.seal(new GoalCollection);
  }

  public findScriptByOutput(output: string): BaseGoal | undefined {
    if (!output)
      return undefined;
    return this[ENTRIES].find((i) => i.type === GoalType.SCRIPT && i.output === output);
  }

  public hasScriptByOutput(output: string): boolean {
    return !!this.findScriptByOutput(output);
  }

  public addScript(script: AbsolutePath | Function, name: string, depends: Array<string>, output: string, params: any, msg: string) {
    if (this.hasScriptByOutput(output.toString()))
      throw new Error(`Output "${output}" exists`);
    this[ENTRIES].push({ name, type: GoalType.SCRIPT, script, output, depends, params, msg } as ScriptGoal);
  }

  public addExec(output: string, depends: Array<string>, command: string, args: Array<string>, cwd: string, msg: string) {
    this[ENTRIES].push({ name: "", type: GoalType.EXEC, depends, output, command, args, cwd, msg } as ExecGoal);
  }

  public addTarget(name: string, depends: Array<string>, msg: string) {
    this[ENTRIES].push({ name, type: GoalType.TARGET, depends, msg, output: "" });
  }

  public getTarget(name: string): BaseGoal | undefined {
    return this[ENTRIES].find((i) => i.type === GoalType.TARGET && i.name === name);
  }

  private addTargetListImpl(name: string, result: Array<BaseGoal>) {
    if (result.find(i => i.name === name || i.output === name)) {
      return;
    }
  
    const goal = this[ENTRIES].find(i => i.name === name || i.output === name);
    if (!goal) {
      return;
    }
  
    for (const iter of goal.depends) {
      this.addTargetListImpl(iter.toString(), result);
    }
  
    result.push(goal);
  }
  
  public getTargetList(name:string) {
    const result = new Array<BaseGoal>;
    this.addTargetListImpl(name, result);
    return result;
  }
  
  public toJSON() {
    return this[ENTRIES];
  }

  public static async buildGoals(collection: Array<BaseGoal>) {
    let msgCount = 0;
    for (const iter of collection)
      msgCount += iter.msg ? 1 : 0;
  
    let msgIndex = 0;
    for (const goal of collection) {
      const { type, msg } = goal;
      if (msg) {
        const relationOfLength = Math.round((++msgIndex / msgCount) * 100);
        const percent = "[" + relationOfLength.toString().padStart(3, " ") + "%] ";
        console.info(percent + msg);
      }
      if (type === GoalType.SCRIPT) {
        const { script, params } = goal as ScriptGoal;
        let module;
        if (typeof script === "function")
          module = script;
        else
          module = (await importModule(script.toString())).default;
        const result = module(params);
        if (result instanceof Promise) {
          await result;
        }
      }
      else if (type === GoalType.EXEC) {
        const { command, args, cwd, output } = goal as ExecGoal;
        fs.mkdirSync(path.posix.dirname(output), { recursive: true });
        const result = spawnSync(command, args, { cwd, encoding: "utf-8" });
        if (result.error || result.status) {
          console.info("cd " + cwd);
          let cmd = args.join(" ");
          cmd = command + (cmd ? " " : "") + cmd;
          console.info(cmd);
          console.info("");
  
          console.error(result.stderr);
  
          throw new Error(result.error as any || "Status " + result.status);
        }
      }
      else if (type === GoalType.TARGET) {
      }
    }
  }
};
