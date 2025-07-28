/*
 * MIT License
 *
 * Copyright (c) 2025  Yurii Yakubin (yurii.yakubin@gmail.com)
 *
 * Permission is granted to use, copy, modify, and distribute this software
 * under the MIT License. See LICENSE file for details.
 */

import { CustomScript, PostCustomScript } from "@/core/CustomScript";
import { FileInstallationTask } from "@/core/FileInstallationTask";
import { SpawnSyncTask } from "@/core/SpawnSyncTask";
import { TargetFile } from "@/core/TargetFile";
import { InstallEntity } from "@/core/InstallEntity";
import { TargetIncludes } from "@/core/TargetIncludes";
import { TargetObjects } from "@/core/TargetObjects";
import { TargetName } from "@/core/TargetName";
import { SourceFile } from "@/core/SourceFile";
import { DirPath, FilePath } from "@/utils/Locator";
import { PostTarget, ObjectLibrary, StaticLibrary, SharedLibrary, Executable } from "@/core/Target";

import { SimpleObject } from "@/core/SimpleObject";

export function runScriptInit() { 
  SimpleObject.registerParser(PostCustomScript.name, PostCustomScript.fromJSON);
  SimpleObject.registerParser(CustomScript.name, CustomScript.fromJSON);
  SimpleObject.registerParser(FileInstallationTask.name, FileInstallationTask.fromJSON);
  SimpleObject.registerParser(SpawnSyncTask.name, SpawnSyncTask.fromJSON);
  SimpleObject.registerParser(TargetFile.name, TargetFile.fromJSON);
  SimpleObject.registerParser(InstallEntity.name, InstallEntity.fromJSON);
  SimpleObject.registerParser(TargetIncludes.name, TargetIncludes.fromJSON);
  SimpleObject.registerParser(TargetObjects.name, TargetObjects.fromJSON);
  SimpleObject.registerParser(TargetName.name, TargetName.fromJSON);
  SimpleObject.registerParser(SourceFile.name, SourceFile.fromJSON);
  SimpleObject.registerParser(DirPath.name, DirPath.fromJSON);
  SimpleObject.registerParser(FilePath.name, FilePath.fromJSON);
  SimpleObject.registerParser(PostTarget.name, PostTarget.fromJSON);
  SimpleObject.registerParser(ObjectLibrary.name, ObjectLibrary.fromJSON);
  SimpleObject.registerParser(StaticLibrary.name, StaticLibrary.fromJSON);
  SimpleObject.registerParser(SharedLibrary.name, SharedLibrary.fromJSON);
  SimpleObject.registerParser(Executable.name, Executable.fromJSON);
}
