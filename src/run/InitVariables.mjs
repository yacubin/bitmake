import * as CXX from "###/utils/CXX.js";
import * as CMake from "###/utils/CMake.js";

export const ARGS = {
  INPUT:         { type: "string",  name: "input"        },
  OUTPUT_HEADER: { type: "string",  name: "outputHeader" },
  OUTPUT_OBJECT: { type: "string",  name: "outputObject" },
  OUTPUT_SCRIPT: { type: "string",  name: "outputScript" },
  PRINT:         { type: "boolean", name: "isPrint"      },
};

export default async function(ctx)
{
  const {input, outputHeader, outputObject, outputScript, isPrint} = ctx.args;

  const module = await ctx.fs.loadScript(input);
  const config = module.default;

  await ctx.hooks.emit("variables.init", config);

  if (outputScript) {
    const lines = [];

    let maxLength = 0;
    for (const name of Object.keys(config))
      maxLength = Math.max(maxLength, name.length);
    const leader = " .".repeat((maxLength + 4) / 2);
    
    lines.push(CMake.generatedScriptNameComment(ctx.entryScript));
    for (const [name, entry] of Object.entries(config)) {
      const space = entry.depends ? "  " : "";
      if (entry.depends) {
        lines.push(`if (${entry.depends})`);
      }
      const description = entry.description || "";
      if (typeof entry.value === "boolean") {
        lines.push(`${space}option(${name} "${description}" ${entry.value ? "ON" : "OFF"})`);
      }
      else if (typeof entry.value === "number") {
        lines.push(`${space}set(${name} ${entry.value} CACHE STRING "${description}")`);
      }
      else if (typeof entry.value === "string") {
        lines.push(`${space}set(${name} "${entry.value}" CACHE STRING "${description}")`);
        if (Array.isArray(entry.type)) {
          const strings = entry.type.map((i) => '"' + i + '"').join(' ');
          lines.push(`${space}set_property(CACHE ${name} PROPERTY STRINGS ${strings})`);
        }
      }
      else if (Array.isArray(entry.value)) {
        lines.push(`${space}set(${name} "${entry.value}" CACHE STRING "${description}")`);
      }
      else {
        throw `Not supported value of ${entry.value}`;
      }
      if (isPrint) {
        lines.push(`${space}message(STATUS "${name}:${leader.substring(name.length)} \${${name}}")`);
      }
      if (entry.depends) {
        lines.push("endif ()");
      }
      lines.push("");
    }
  
    await ctx.fs.linesSaveTo(outputScript, lines);
  }

  if (outputHeader) {
    const lines = [];
  
    lines.push(CXX.generatedScriptNameComment(ctx.entryScript));
    lines.push("");
  
    for (const [name, entry] of Object.entries(config)) {
      if (entry.description) {
        lines.push(`/* ${entry.description} */`);
      }
      if (typeof entry.value === "boolean") {
        lines.push(`#cmakedefine01 ${name}`);
      }
      else if (typeof entry.value === "number") {
        lines.push(`#define ${name} @${name}@`);
      }
      else if (typeof entry.value === "string") {
        lines.push(`#define ${name} "@${name}@"`);
      }
      else if (Array.isArray(entry.value)) {
        lines.push(`#define ${name} "@${name}@"`);
      }
      else {
        throw `Not supported value of ${entry.value}`;
      }
      lines.push("");
    }
  
    await ctx.fs.linesSaveTo(outputHeader, lines);
  }

  if (outputObject) {
    const lines = [];

    lines.push(CXX.generatedScriptNameComment(ctx.entryScript));
    lines.push("export default {");

    for (const [name, entry] of Object.entries(config)) {
      let type = entry.type;
      let value = `@${name}@`;

      if (type === undefined) {
        if (typeof entry.value === "boolean") {
          type = "boolean";
        }
        else if (typeof entry.value === "number") {
          type = "number";
        }
        else if (typeof entry.value === "string") {
          type = "string";
        }
        else if (Array.isArray(entry.value)) {
          type = "string[]";
        }
        else {
          throw `Not supported value of ${entry.value}`;
        }
      }

      if (type !== "number") {
        value = '"' + value + '"';
      }

      lines.push(`  ${name}: {`);
      lines.push(`    type: ${JSON.stringify(type)},`);
      lines.push(`    value: ${value},`);
      lines.push(`  },`);
    }

    lines.push("};");
    lines.push("");

    await ctx.fs.linesSaveTo(outputObject, lines);
  }
}
