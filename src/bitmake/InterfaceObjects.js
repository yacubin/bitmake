"use strict";

const NAME = Symbol("NAME");

function InterfaceObjects(name) {
  this[NAME] = name;
}

InterfaceObjects.create = (name) => {
  return Object.seal(new InterfaceObjects(name));
}

InterfaceObjects.ensureInstance = (value) => {
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
    enumerable: false,
  },
});

InterfaceObjects.prototype.toJSON = function() {
  return this.toString();
}

InterfaceObjects.prototype.toString = function() {
  return "${" + this[NAME] + ".objects}";
}

module.exports = {
  InterfaceObjects,
};
