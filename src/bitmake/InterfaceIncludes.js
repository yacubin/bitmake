"use strict";

const NAME = Symbol("NAME");

function InterfaceIncludes(name) {
  this[NAME] = name;
}

InterfaceIncludes.create = (name) => {
  return Object.seal(new InterfaceIncludes(name));
}

InterfaceIncludes.asInstance = (value) => {
  if (value instanceof InterfaceIncludes)
    return value;
  throw new Error(`The '${value}' is not a InterfaceIncludes`);
}

InterfaceIncludes.prototype = Object.create(Object.prototype, {
  constructor: {
    value: InterfaceIncludes,
    enumerable: false,
  },
  NAME: {
    get () { return this[NAME]; },
    enumerable: true,
  },
});

InterfaceIncludes.prototype.toJSON = function() {
  const json = {};
  for (const key in this)
    json[key] = (typeof this[key].toJSON === "function") ? this[key].toJSON() : this[key];
  return json;
}

InterfaceIncludes.prototype.toString = function() {
  return "${" + this[NAME] + ".INCLUDES}";
}

module.exports = {
  InterfaceIncludes,
};
