"use strict";

const ENTRIES = Symbol("ENTRIES");

function TargetCollection() {
  this[ENTRIES] = {};
}

TargetCollection.prototype = Object.create(Object.prototype, {
  constructor: {
    value: TargetCollection,
    enumerable: false,
    writable: true,
    configurable: true,
  },
  ENTRIES: {
    get() { return this[ENTRIES]; },
    enumerable: true,
  },
});

TargetCollection.create = () => {
  return Object.seal(new TargetCollection());
}

TargetCollection.prototype.toJSON = function() {
  return this[ENTRIES];
}

TargetCollection.prototype.get = function(name) {
  return this[ENTRIES][name];
}

TargetCollection.prototype.set = function(name, target) {
  if (this[ENTRIES][name])
    throw new Error(`Target "${name}" exists`);
  this[ENTRIES][name] = target;
}

TargetCollection.prototype.dump = function() {
  for (const [name, target] of Object.entries(this[ENTRIES])) {
    console.info(`${name}:`);
    for (const [key, entry] of Object.entries(target)) {
      if (entry && typeof entry === "object") {
        console.info(`  ${key}:`);
        for (const [k, v] of Object.entries(entry))
          console.info(`    ${k}: ${JSON.stringify(v)}`);
      }
      else {
        console.info(`  ${key}: ${JSON.stringify(entry)}`);
      }
    }
  }
}

module.exports = {
  TargetCollection,
};
