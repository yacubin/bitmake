/*
 * MIT License
 *
 * Copyright (c) 2025  Yurii Yakubin (yurii.yakubin@gmail.com)
 *
 * Permission is granted to use, copy, modify, and distribute this software
 * under the MIT License. See LICENSE file for details.
 */

import { SimpleObject } from "@/core/SimpleObject";
import { TargetFile } from "@/core/TargetFile";

type CommandComponent = string | TargetFile;

const COMMAND = Symbol("COMMAND");
const ARGS = Symbol("ARGS");

export class TargetCommand {
  private [COMMAND]: CommandComponent;
  private [ARGS]: CommandComponent[];

  private constructor(command: CommandComponent, args: CommandComponent[]) {
    this[COMMAND] = command;
    this[ARGS] = args;
  }

  public static create(ommand: CommandComponent, args: CommandComponent[]) {
    return Object.seal(new TargetCommand(ommand, args));
  }

  public static fromJSON(object: SimpleObject) {
    const command = SimpleObject.fromJSON(object.command as SimpleObject);
    const args = SimpleObject.fromJSON(object.args as SimpleObject);
    return TargetCommand.create(command as CommandComponent, args as CommandComponent[]);
  }

  public get command(): CommandComponent {
    return this[COMMAND];
  }

  public get args(): CommandComponent[] {
    return this[ARGS];
  }

  public toString(): string {
    return "[object TargetCommand]";
  }

  public toJSON(): SimpleObject {
    return {
      type: TargetCommand.name,
      command: SimpleObject.toJSON(this[COMMAND]),
      args: SimpleObject.toJSON(this[ARGS]),
    }
  }
};
