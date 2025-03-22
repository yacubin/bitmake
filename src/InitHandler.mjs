import fs from "node:fs";

import { fileExists } from "###/utils/FileSystem.js";
import { DEFAULT_PRESET } from "###/Constants.js";

export default async function(ctx)
{
  const preset = ctx.env.preset || DEFAULT_PRESET;
  const presetPath = ctx.getPresetPath(preset);
  if (!await fileExists(presetPath))
    throw `Preset '${preset}' is not available`;

  if (await fileExists(ctx.userConfigPath))
    await fs.promises.rm(ctx.userConfigPath);

  await fs.promises.copyFile(presetPath, ctx.userConfigPath);
  console.log(`Preset '${preset}' installed successfully`);
}
