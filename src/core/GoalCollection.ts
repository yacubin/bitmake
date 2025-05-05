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

  get name(): string | undefined;
  get output(): string | undefined;
  get depends(): string[];
};

export class GoalCollection {
  private [ENTRIES]: Array<GoalWorker>;

  private constructor() {
    this[ENTRIES] = new Array<GoalWorker>;
  }

  public get ENTRIES() {
    return this[ENTRIES];
  }

  public static create() {
    return Object.seal(new GoalCollection);
  }

  public add(worker: GoalWorker) {
    if (worker.name && this[ENTRIES].find((i) => i.name === worker.name))
      throw new Error(`Nmae "${worker.name}" exists`);
    if (worker.output && this[ENTRIES].find((i) => i.output === worker.output))
      throw new Error(`Output "${worker.output}" exists`);
    this[ENTRIES].push(worker);
  }

  public getTarget(name: string): GoalWorker | undefined {
    if (!name)
      return undefined;
    return this[ENTRIES].find((i) => i.name === name);
  }

  private addTargetListImpl(name: string, result: Array<GoalWorker>) {
    if (result.find(i => i.name === name || i.output === name)) {
      return;
    }

    const goal = this[ENTRIES].find(i => i.name === name || (i.output === name));
    if (!goal) {
      return;
    }

    for (const iter of goal.depends) {
      this.addTargetListImpl(iter.toString(), result);
    }

    result.push(goal);
  }
  
  public getTargetList(name:string) {
    const result = new Array<GoalWorker>;
    this.addTargetListImpl(name, result);
    return result;
  }
  
  public toJSON() {
    return this[ENTRIES];
  }

  public static async buildGoals(collection: Array<GoalWorker>) {
    const total = collection.length;
    let loaded = 0;
    for (const goal of collection) {
      goal.updateProgress({ loaded, total });
      await goal.doWork();
      loaded++;
    }
  }
};
