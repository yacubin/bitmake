/*
 * MIT License
 *
 * Copyright (c) 2025  Yurii Yakubin (yurii.yakubin@gmail.com)
 *
 * Permission is granted to use, copy, modify, and distribute this software
 * under the MIT License. See LICENSE file for details.
 */

const ENTRIES = Symbol("ENTRIES");

enum GoalType {
  SCRIPT = "script",
  EXEC = "exec",
  TARGET = "target",
};

export interface GoalWorker {
  doWork(): Promise<void>;
  updateProgress(event: { loaded: number, total: number }): void;
};

interface BaseGoal {
  name: string;
  type: GoalType;
  depends: Array<string>;
  output: string;
  worker: GoalWorker;
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
    return this[ENTRIES].find((i) => i.output === output);
  }

  public hasScriptByOutput(output: string): boolean {
    return !!this.findScriptByOutput(output);
  }

  public addScript(name: string, worker: GoalWorker, depends: Array<string>, output: string) {
    if (this.hasScriptByOutput(output.toString()))
      throw new Error(`Output "${output}" exists`);
    this[ENTRIES].push({ name, type: GoalType.SCRIPT, worker, output, depends });
  }

  public addExec(output: string, depends: Array<string>, worker: GoalWorker) {
    this[ENTRIES].push({ name: "", type: GoalType.EXEC, depends, output, worker });
  }

  public addTarget(name: string, depends: Array<string>, worker: GoalWorker) {
    this[ENTRIES].push({ name, type: GoalType.TARGET, depends, output: "", worker });
  }

  public getTarget(name: string): BaseGoal | undefined {
    if (!name)
      return undefined;
    return this[ENTRIES].find((i) => i.name === name);
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
    const total = collection.length;
    let loaded = 0;
    for (const goal of collection) {
      goal.worker.updateProgress({ loaded, total });
      await goal.worker.doWork();
      loaded++;
    }
  }
};
