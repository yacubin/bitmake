import url from 'node:url';
import { InjectContext } from "###/InjectContext.mjs";

function toCIdentifier(key) {
  let result = "";

  let pos = 0;
  while (pos < key.length) {
    let end = key.indexOf("-", pos);
    if (end === -1) {
      end = key.length;
    }
    result += result ? key.charAt(pos).toUpperCase() + key.substring(pos + 1, end) : key.substring(pos, end);
    pos = end + 1;
  }

  return result;
}

function toArgMap(args)
{
  const params = {};
  args.forEach(iter => {
    if (iter.startsWith("--")) {
      const pos = iter.indexOf("=");
      const key = (pos === -1) ? iter.substring(2) : iter.substring(2, pos);
      const val = (pos === -1) ? true : iter.substring(pos + 1);
      params[toCIdentifier(key)] = val;
    }
  });
  return params;
}

function isIntegerString(str)
{
  return /^[-+]?[0-9]+$/.test(str);
}

async function runScript()
{
  const argsMain = process.argv.slice(2);
  const indexOfUserArgs = argsMain.findIndex((i) => i === "--");
  const argsMap = toArgMap(indexOfUserArgs === -1 ? argsMain : argsMain.slice(0, indexOfUserArgs));
  const argsUser = indexOfUserArgs === -1 ? [] : argsMain.slice(indexOfUserArgs + 1);
  const entryScript = argsMap.script;
  const scriptUrl = url.pathToFileURL(entryScript);
  
  const module = await import(scriptUrl);
  const func = module.default;

  let args = {};

  const desc = {
    SCRIPT:   { type: "string", optional: true  },
    WORK_DIR: { type: "string", optional: true },
    NOCONFIG: { type: "boolean" },
    ...module.ARGS,
  };

  let key;
  const vals = {};
  for (const iter of argsUser) {
    if (desc.hasOwnProperty(iter)) {
      key = iter;
      continue;
    }
    if (!key) {
      throw `Unknown argument ${iter}`;
    }
    const {type} = desc[key];
    if (type === "string[]") {
      vals[key] = vals[key] || [];
      vals[key].push(iter.toString());
    }
    else if (vals.hasOwnProperty(key)) {
      throw `Argument ${key} support only one value`;
    }
    else if (type === "boolean") {
      vals[key] = true;
    }
    else if (type === "string") {
      vals[key] = iter.toString();
    }
    else if (type === "integer") {
      if (!isIntegerString(iter))
        throw `Argument ${iter} is not an integer`;
      vals[key] = Number.parseInt(iter);
    }
    else {
      throw `Unknown type ${desc[key].type} for ${key}`;
    }
  }

  for (const [ key, {name, optional} ] of Object.entries(desc)) {
    if (!vals.hasOwnProperty(key)) {
      if (optional)
        continue;
      else if (desc[key].type === "boolean")
        vals[key] = false;
      else
        throw `Missing argument ${key}`;
    }
    if (!name)
      continue;
    if (args[name])
      throw `Duplicate name ${name} of ${key}`;
    args[name] = vals[key];
  }

  const ctx = new InjectContext(entryScript, args);

  if (argsMap.pluginList) {
    for (const filename of argsMap.pluginList.split(";")) {
      await ctx.loadPlugin(filename);
    }
  }

  await ctx.initPlugins();

  if (ctx.configScript) {
    await ctx.loadConfig(ctx.configScript);
  }

  const result = func(ctx, args);
  if (result instanceof Promise) {
    await result;
  }
}

runScript().then(() => process.exit(0)).catch((e) => {
  console.error(e);
  process.exit(1);
});
