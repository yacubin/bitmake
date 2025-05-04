/*
 * MIT License
 *
 * Copyright (c) 2025  Yurii Yakubin (yurii.yakubin@gmail.com)
 *
 * Permission is granted to use, copy, modify, and distribute this software
 * under the MIT License. See LICENSE file for details.
 */

import { FilePath } from "@/core/Path";

const ENTRIES = Symbol("ENTRIES");

export interface GoalWorker {
  doWork(): Promise<void>;
  updateProgress(event: { loaded: number, total: number }): void;
  get outputFile(): FilePath | undefined;
};

interface BaseGoal {
  name: string;
  depends: Array<string>;
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
    return this[ENTRIES].find((i) => i.worker.outputFile && i.worker.outputFile.toString() === output);
  }

  public hasScriptByOutput(output: string): boolean {
    return !!this.findScriptByOutput(output);
  }

  public addScript(name: string, worker: GoalWorker, depends: Array<string>) {
    if (worker.outputFile && this.hasScriptByOutput(worker.outputFile.toString()))
      throw new Error(`Output "${worker.outputFile.toString()}" exists`);
    this[ENTRIES].push({ name, worker, depends });
  }

  public addExec(depends: Array<string>, worker: GoalWorker) {
    this[ENTRIES].push({ name: "", depends, worker });
  }

  public addTarget(name: string, depends: Array<string>, worker: GoalWorker) {
    this[ENTRIES].push({ name, depends, worker });
  }

  public getTarget(name: string): BaseGoal | undefined {
    if (!name)
      return undefined;
    return this[ENTRIES].find((i) => i.name === name);
  }

  private addTargetListImpl(name: string, result: Array<BaseGoal>) {
    if (result.find(i => i.name === name || (i.worker.outputFile && i.worker.outputFile.toString() === name))) {
      return;
    }
  
    const goal = this[ENTRIES].find(i => i.name === name || (i.worker.outputFile && i.worker.outputFile.toString() === name));
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
