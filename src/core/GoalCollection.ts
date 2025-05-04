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

type ScriptHandler = () => Promise<void>;

interface ScriptGoal extends BaseGoal {
  handler: ScriptHandler;
};

interface ExecGoal extends BaseGoal {
  handler: ScriptHandler;
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

  public addScript(name: string, handler: ScriptHandler, depends: Array<string>, output: string, msg: string) {
    if (this.hasScriptByOutput(output.toString()))
      throw new Error(`Output "${output}" exists`);
    this[ENTRIES].push({ name, type: GoalType.SCRIPT, handler, output, depends, msg } as ScriptGoal);
  }

  public addExec(output: string, depends: Array<string>, msg: string, handler: ScriptHandler) {
    this[ENTRIES].push({ name: "", type: GoalType.EXEC, depends, output, msg, handler } as ExecGoal);
  }

  public addTarget(name: string, depends: Array<string>, msg: string) {
    this[ENTRIES].push({ name, type: GoalType.TARGET, depends, output: "", msg });
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
    let msgIndex = 0;
    for (const goal of collection) {
      const { type, msg } = goal;
      if (msg) {
        const relationOfLength = Math.round((++msgIndex / collection.length) * 100);
        const percent = "[" + relationOfLength.toString().padStart(3, " ") + "%] ";
        console.info(percent + msg);
      }
      if (type === GoalType.SCRIPT) {
        const { handler } = goal as ScriptGoal;
        await handler();
      }
      else if (type === GoalType.EXEC) {
        const { handler } = goal as ExecGoal;
        await handler();
      }
      else if (type === GoalType.TARGET) {
      }
    }
  }
};
