"use strict";

const { SystemVariables } = require("./SystemVariables.js");
const { ObjectLibrary, StaticLibrary, SharedLibrary, Executable } = require("./Target.js");
const { GlobalContext } = require("./GlobalContext.js");

module.exports = {
  SystemVariables,
  ObjectLibrary,
  StaticLibrary,
  SharedLibrary,
  Executable,
  GlobalContext,
};
