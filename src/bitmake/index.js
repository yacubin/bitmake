"use strict";

const { SystemVariables } = require("./SystemVariables.js");
const { ObjectLibrary, StaticLibrary, SharedLibrary, Executable } = require("./Target.js");
const { TargetCollection } = require("./TargetCollection.js");
const { InstallEntity } = require("./InstallEntity.js");
const { GlobalContext } = require("./GlobalContext.js");

module.exports = {
  SystemVariables,
  ObjectLibrary,
  StaticLibrary,
  SharedLibrary,
  Executable,
  TargetCollection,
  InstallEntity,
  GlobalContext,
};
