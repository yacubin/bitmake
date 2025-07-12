/*
 * MIT License
 *
 * Copyright (c) 2025  Yurii Yakubin (yurii.yakubin@gmail.com)
 *
 * Permission is granted to use, copy, modify, and distribute this software
 * under the MIT License. See LICENSE file for details.
 */

import { InterfaceTarget } from "@/core/MakeInterfaces";
import { Logger } from "@/logger";
import { ensureString } from "@/utils/StrictType";

const logger = Logger.create(import.meta.url);

const IMPL = Symbol("IMPL");

export class UserTargetStruct extends InterfaceTarget {
  [IMPL]: InterfaceTarget;

  private constructor(impl: InterfaceTarget) {
    super();
    this[IMPL] = impl;
  }

  public static create(impl: InterfaceTarget) {
    return Object.seal(new UserTargetStruct(impl));
  }

  public get targetName() {
    return this[IMPL].targetName;
  }

  public get targetFile() {
    return this[IMPL].targetFile;
  }

  public get includes() {
    return this[IMPL].includes;
  }

  public get objects() {
    return this[IMPL].objects;
  }
  
  public setPrefix(value: any): void {
    this[IMPL].setPrefix(ensureString(value));
  }

  public setSuffix(value: any): void {
    this[IMPL].setSuffix(ensureString(value));
  }

  public setOutputName(value: any): void {
    this[IMPL].setOutputName(ensureString(value));
  }

  public addSources(...sources: any[]): void {
    this[IMPL].addSources(...sources);
  }

  public addIncludes(...includes: any[]): void {
    this[IMPL].addIncludes(...includes);
  }

  public addLibraries(...libraries: any[]): void {
    this[IMPL].addLibraries(...libraries);
  }

  public addCompileOptions(...options: any[]): void {
    this[IMPL].addCompileOptions(...options);
  }

  public addLinkOptions(...options: any[]): void {
    this[IMPL].addLinkOptions(...options);
  }

  public getSourceFiles(...sources: any[]) {
    return this[IMPL].getSourceFiles(...sources);
  }

  public addDefinitions(...definitions: any[]): void {
    this[IMPL].addDefinitions(...definitions);
  }

  public addPreBuild(command: any, args: any[]): void {
    this[IMPL].addPreBuild(command, args);
  }

  public addPostBuild(command: any, args: any[]): void {
    this[IMPL].addPreBuild(command, args);
  }

  public setPositionIndependentCode(value: boolean): void {
    this[IMPL].setPositionIndependentCode(value);
  }

  public addPublicIncludes(...includes: any[]): void {
    this[IMPL].addPublicIncludes(...includes);
  }

  public addPublicDefinitions(...definitions: any): void {
    this[IMPL].addPublicDefinitions(...definitions);
  }

  public addPublicLibraries(...libraries: any[]): void {
    this[IMPL].addPublicLibraries(...libraries);
  }

  public addPublicCompileOptions(...options: any[]): void {
    this[IMPL].addPublicCompileOptions(...options);
  }

  public addPublicLinkOptions(...options: any[]): void {
    this[IMPL].addPublicLinkOptions(...options);
  }
};
