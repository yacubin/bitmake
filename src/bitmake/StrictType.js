"use strict";

function cloneBoolean(value) {
  if (typeof value === "boolean")
    return value;
  throw new Error(`The '${value}' is not a boolean`);
}

function cloneString(value) {
  if (typeof value === "string")
    return value;
  throw new Error(`The '${value}' is not a string`);
}

module.exports = {
  cloneBoolean, // ensureBoolean
  cloneString,  // ensureString
};
