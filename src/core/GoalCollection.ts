/*
 * MIT License
 *
 * Copyright (c) 2025  Yurii Yakubin (yurii.yakubin@gmail.com)
 *
 * Permission is granted to use, copy, modify, and distribute this software
 * under the MIT License. See LICENSE file for details.
 */

const ENTRIES = Symbol("ENTRIES");

export interface GoalWorker {
  doWork(): Promise<void>;
  updateProgress(event: { loaded: number, total: number }): void;

  get output(): string | undefined;
  get depends(): string[];
};

interface BaseGoal {
  name: string;
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
    return this[ENTRIES].find((i) => i.worker.output === output);
  }

  public hasScriptByOutput(output: string): boolean {
    return !!this.findScriptByOutput(output);
  }

  public addScript(name: string, worker: GoalWorker) {
    if (worker.output && this.hasScriptByOutput(worker.output))
      throw new Error(`Output "${worker.output}" exists`);
    this[ENTRIES].push({ name, worker });
  }

  public addExec(worker: GoalWorker) {
    this[ENTRIES].push({ name: "", worker });
  }

  public addTarget(name: string, worker: GoalWorker) {
    this[ENTRIES].push({ name, worker });
  }

  public getTarget(name: string): BaseGoal | undefined {
    if (!name)
      return undefined;
    return this[ENTRIES].find((i) => i.name === name);
  }

  private addTargetListImpl(name: string, result: Array<BaseGoal>) {
    if (result.find(i => i.name === name || i.worker.output === name)) {
      return;
    }
  
    const goal = this[ENTRIES].find(i => i.name === name || (i.worker.output === name));
    if (!goal) {
      return;
    }
  
    for (const iter of goal.worker.depends) {
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
