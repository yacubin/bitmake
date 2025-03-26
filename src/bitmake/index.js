"use strict";

const { Scope } = require("./Scope.js");
const { SourceFile } = require("./SourceFile.js");
const { SourceFileList } = require("./SourceFileList.js");
const { IncludeDirectory } = require("./IncludeDirectory.js");
const { ObjectLibrary, StaticLibrary, SharedLibrary, Executable } = require("./Target.js");
const { CustomScript } = require("./CustomScript.js");
const { InterfaceTarget } = require("./InterfaceTarget.js");
const { InterfaceIncludes } = require("./InterfaceIncludes.js");
const { InterfaceObjects } = require("./InterfaceObjects.js");
const { InterfaceScript } = require("./InterfaceScript.js");
const { ScriptCollection } = require("./ScriptCollection.js");
const { TargetCollection } = require("./TargetCollection.js");
const { DirPath, FilePath } = require("./Path.js");
const { InstallEntity } = require("./InstallEntity.js");
const { GoalCollection } = require("./GoalCollection.js");
const { GlobalContext } = require("./GlobalContext.js");

module.exports = {
  Scope,
  SourceFile,
  SourceFileList,
  IncludeDirectory,
  ObjectLibrary,
  StaticLibrary,
  SharedLibrary,
  Executable,
  CustomScript,
  InterfaceTarget,
  InterfaceIncludes,
  InterfaceObjects,
  InterfaceScript,
  ScriptCollection,
  TargetCollection,
  DirPath,
  FilePath,
  InstallEntity,
  GoalCollection,
  GlobalContext,
};
