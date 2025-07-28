/*
 * MIT License
 *
 * Copyright (c) 2025  Yurii Yakubin (yurii.yakubin@gmail.com)
 *
 * Permission is granted to use, copy, modify, and distribute this software
 * under the MIT License. See LICENSE file for details.
 */

import { SimpleObject } from "@/core/SimpleObject";
import { InterfaceTask } from "@/core/MakeInterfaces";
import { Logger } from "@/logger";
import { Locator } from "@/utils/Locator";

const logger = Logger.create(import.meta.url);

export class GoalTarget {
  private _message: string | undefined;
  private _name: string | undefined;
  private _output: string | undefined;
  private _depends = new Array<string>;
  private _tasks = new Array<InterfaceTask>;

  constructor(name?: string) {
    this._name = name;
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

  set output(value: Locator) {
    this._output = value.toPath();
  }

  get depends(): string[] {
    return this._depends;
  }

  public addDependency(...value: string[]) {
    this._depends.push(...value);
  }

  public addTask(task: InterfaceTask) {
    this._tasks.push(task);
  }

  async doWork(): Promise<void> {
    for (const task of this._tasks) {
      const res = task.execute();
      if (res instanceof Promise)
        await res;
    }
  }

  public toJSON(): SimpleObject {
    const json: any = {
      type: GoalTarget.name,
      depends: this._depends,
      tasks: this._tasks,
    };
    if (this._message) {
      json.message = this._message;
    }
    if (this._name) {
      json.name = this._name;
    }
    if (this._output) {
      json.output = this._output;
    }
    return json;
  }
};

export class GoalCollection {
  private _entries = new Array<GoalTarget>;

  public get ENTRIES() {
    return this._entries;
  }

  public addTarget(ge: GoalTarget) {
    if (ge.name && this._entries.find((i) => i.name === ge.name))
      throw new Error(`Nmae "${ge.name}" exists`);
    if (ge.output && this._entries.find((i) => i.output === ge.output))
      throw new Error(`Output "${ge.output}" exists`);
    this._entries.push(ge);
  }

  public getTarget(name: string): GoalTarget | undefined {
    if (!name)
      return undefined;
    return this._entries.find((i) => i.name === name);
  }

  private addTargetListImpl(name: string, result: Array<GoalTarget>) {
    if (result.find(i => i.name === name || i.output === name)) {
      return;
    }

    const goal = this._entries.find(i => i.name === name || i.output === name);
    if (!goal) {
      return;
    }

    for (const iter of goal.depends) {
      this.addTargetListImpl(iter.toString(), result);
    }

    result.push(goal);
  }
  
  public getTargetList(name:string) {
    const result = new Array<GoalTarget>;
    this.addTargetListImpl(name, result);
    return result;
  }
  
  public toJSON() {
    return {
      type: GoalCollection.name,
      entries: this._entries,
    };
  }
};
