"use strict";

const path = require("node:path");
const fs = require("node:fs");
const { spawnSync } = require("node:child_process");

const ENTRIES = Symbol("ENTRIES");

const SCRIPT_GOAL = "script";
const EXEC_GOAL = "exec";
const TARGET_GOAL = "target";

function GoalCollection() {
  this[ENTRIES] = [];
}

GoalCollection.prototype = Object.create(Object.prototype, {
  constructor: {
    value: GoalCollection,
    enumerable: false,
    writable: true,
    configurable: true,
  },
  ENTRIES: {
    get() { return this[ENTRIES]; },
    enumerable: true,
  },
});

GoalCollection.create = () => {
  return Object.seal(new GoalCollection());
}

GoalCollection.buildGoals = async (GoalCollection) => {
  let msgCount = 0;
  for (const iter of GoalCollection)
    msgCount += iter.msg ? 1 : 0;

  let msgIndex = 0;
  for (const goal of GoalCollection) {
    const { type, msg } = goal;
    if (msg) {
      const relationOfLength = Math.round((++msgIndex / msgCount) * 100);
      const percent = "[" + relationOfLength.toString().padStart(3, " ") + "%] ";
      console.info(percent + msg);
    }
    if (type === SCRIPT_GOAL) {
      const { script, params } = goal;
      let module;
      if (script.toString() === path.posix.join(__dirname, "SystemScripts/configure_file.js"))
        module = require("./SystemScripts/configure_file.js");
      else if (script.toString() === path.posix.join(__dirname, "SystemScripts/install_script.js"))
        module = require("./SystemScripts/install_script.js");
      else
        module = (await import(/* webpackIgnore: true */ script.toString())).default;
      const result = module(params);
      if (result instanceof Promise) {
        await result;
      }
    }
    else if (type === EXEC_GOAL) {
      const { command, args, cwd, output } = goal;
      fs.mkdirSync(path.posix.dirname(output), { recursive: true });
      const result = spawnSync(command, args, { cwd, encoding: "utf-8" });
      if (result.status) {
        console.info("cd " + cwd);
        let cmd = args.join(" ");
        cmd = command + (cmd ? " " : "") + cmd;
        console.info(cmd);
        console.info("");

        console.error(result.stderr);

        throw new Error("Status " + result.status);
      }
    }
    else if (type === TARGET_GOAL) {
    }
  }
}

GoalCollection.prototype.findScriptByOutput = function(output) {
  if (!output)
    return undefined;
  return this[ENTRIES].find((i) => i.type === SCRIPT_GOAL && i.output === output);
}

GoalCollection.prototype.hasScriptByOutput = function(output) {
  return !!this.findScriptByOutput(output);
}

GoalCollection.prototype.addScript = function(script, name, depends, output, params, msg) {
  if (this.hasScriptByOutput(output.toString()))
    throw new Error(`Output "${output}" exists`);
  this[ENTRIES].push({ name, type: SCRIPT_GOAL, script, output, depends, params, msg });
}

GoalCollection.prototype.addExec = function(output, depends, command, args, cwd, msg) {
  this[ENTRIES].push({ name: "", type: EXEC_GOAL, depends, output, command, args, cwd, msg });
}

GoalCollection.prototype.addTarget = function(name, depends, msg) {
  this[ENTRIES].push({ name, type: TARGET_GOAL, depends, msg });
}

GoalCollection.prototype.getTarget = function(name) {
  return this[ENTRIES].find((i) => i.type === TARGET_GOAL && i.name === name);
}

GoalCollection.prototype.addTargetListImpl = function(name, result) {
  if (result.find(i => i.name === name || i.output === name)) {
    return;
  }

  const goal = this[ENTRIES].find(i => i.name === name || i.output === name);
  if (!goal) {
    return;
  }

  for (const iter of goal.depends) {
    this.addTargetListImpl(iter.toString(), result);
  }

  result.push(goal);
}

GoalCollection.prototype.getTargetList = function(name) {
  const result = [];
  this.addTargetListImpl(name, result);
  return result;
}

GoalCollection.prototype.toJSON = function() {
  return json;
}

module.exports = {
  GoalCollection,
};
