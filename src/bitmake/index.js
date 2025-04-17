"use strict";

const { SystemVariables } = require("./SystemVariables.js");
const { ObjectLibrary, StaticLibrary, SharedLibrary, Executable } = require("./Target.js");
const { InterfaceTarget } = require("./InterfaceTarget.js");
const { InterfaceScript } = require("./InterfaceScript.js");
const { ScriptCollection } = require("./ScriptCollection.js");
const { TargetCollection } = require("./TargetCollection.js");
const { InstallEntity } = require("./InstallEntity.js");
const { GlobalContext } = require("./GlobalContext.js");

module.exports = {
  SystemVariables,
  ObjectLibrary,
  StaticLibrary,
  SharedLibrary,
  Executable,
  InterfaceTarget,
  InterfaceScript,
  ScriptCollection,
  TargetCollection,
  InstallEntity,
  GlobalContext,
};
