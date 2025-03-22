export const ARGS = {
  SOURCE_DIR: { type: "string", name: "sourceDir"   },
  BINARY_DIR: { type: "string", name: "binaryDir"   },
  OUTPUT:     { type: "string", name: "output"      },
};

export default async function(ctx, {sourceDir, binaryDir, output})
{
  let config = {};

  const indexPath = ctx.path.join(sourceDir, "index.mjs");
  if (await ctx.fs.fileExists(indexPath)) {
    const module = await ctx.fs.loadScript(indexPath);
    config = module.default;
  }

  for (const [key, val] of Object.entries(config)) {
    await ctx.hooks.emit(`libraries.${key}`, val);
  }

  const lines = [];

  for (const [name, entry] of Object.entries(config)) {
    const space = entry.depends ? "  " : "";
    if (entry.depends) {
      lines.push(`if (${entry.depends})`);
    }
    lines.push(`${space}set(${name}_OBJLIB_LIST "")`);
    if (entry.objlibs) {
      for (const [key, lib] of Object.entries(entry.objlibs)) {
        if (!lib) continue;
        if (key === lib.cmakeDir)
          lines.push(`${space}add_subdirectory(${key})`);
        else
          lines.push(`${space}add_subdirectory("${lib.cmakeDir}" ${key})`);
        lines.push(`${space}list(APPEND ${name}_OBJLIB_LIST ${key})`);
      }
    }
    lines.push(`${space}add_subdirectory(${name})`);
    if (entry.depends) {
      lines.push(`endif ()`);
    }
    lines.push("");
  }

  await ctx.fs.linesSaveTo(output, lines);
}
