"use strict";

const NAME = Symbol("NAME");

function InterfaceObjects(name) {
  this[NAME] = name;
}

InterfaceObjects.create = (name) => {
  return Object.seal(new InterfaceObjects(name));
}

InterfaceObjects.asInstance = (value) => {
  if (value instanceof InterfaceObjects)
    return value;
  throw new Error(`The '${value}' is not a InterfaceObjects`);
}

InterfaceObjects.prototype = Object.create(Object.prototype, {
  constructor: {
    value: InterfaceObjects,
    enumerable: false,
  },
  NAME: {
    get () { return this[NAME]; },
    enumerable: true,
  },
});

InterfaceObjects.prototype.toJSON = function() {
  const json = {};
  for (const key in this)
    json[key] = (typeof this[key].toJSON === "function") ? this[key].toJSON() : this[key];
  return json;
}

InterfaceObjects.prototype.toString = function() {
  return "${" + this[NAME] + ".OBJECTS}";
}

module.exports = {
  InterfaceObjects,
};
