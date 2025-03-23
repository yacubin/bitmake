"use strict";

function ensureBoolean(value) {
  if (typeof value === "boolean")
    return value;
  throw new Error(`The '${value}' is not a boolean`);
}

function ensureString(value) {
  if (typeof value === "string")
    return value;
  throw new Error(`The '${value}' is not a string`);
}

module.exports = {
  ensureBoolean,
  ensureString,
};
