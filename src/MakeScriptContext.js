"use strict";

const fs = require("node:fs");
const path = require("node:path");

const { UserContext } = require("./bitmake/UserContext.js");
const { PluginContext } = require("./bitmake/PluginContext.js");
const { GlobalContext } = require("./bitmake/GlobalContext.js");
const { SystemVariables } = require("./bitmake/SystemVariables.js");
const bitmake = require("@/bitmake/index.js");
const { getPathString }  = require("@/utils/FileSystem.js");

const requireImpl = eval("require");

const inlineToolchain =
{
  "wasm32": require("./toolchain/wasm32.js"),
  "wasm64": require("./toolchain/wasm64.js"),
  "wasm32-wasi": require("./toolchain/wasm32-wasi.js"),
  "wasm64-wasi": require("./toolchain/wasm64-wasi.js"),
};

async function actionMakeScript(config, environment, settings)
{
  process.env = environment;

  const scope = SystemVariables.create(getPathString(config.sourceDir), getPathString(config.binaryDir));

  const global = GlobalContext.create();
  global.loadCacheVariables(scope.CACHE_FILE.toString());

  const packageJson = await fs.promises.readFile(scope.PACKAGE_FILE.toString(), 'utf8');
  const pkg = JSON.parse(packageJson);

  scope.BUILD_TYPE = config.buildType;
  scope.PROJECT_NAME = pkg.name;
  scope.PROJECT_VERSION = pkg.version;
  scope.PROJECT_DESCRIPTION = pkg.description;
  scope.PROJECT_HOMEPAGE_URL = pkg.homepage;
  scope.DESTDIR = config.destDir ? bitmake.DirPath.create(config.destDir) : null;

  const root = UserContext.create(scope, global);

  if (config.variables) {
    for (const [key, val] of Object.entries(config.variables)) {
      if (key === "INSTALL_PREFIX")
        root.INSTALL_PREFIX = bitmake.DirPath.create(val);
      else if (key === "GLOBAL_CONTEXT_JSON")
        root.GLOBAL_CONTEXT_JSON = bitmake.FilePath.create(val);
      else if (key === "TARGET_GOALS_JSON")
        root.TARGET_GOALS_JSON = bitmake.FilePath.create(val);
      else
        root[key] = val;
    }
  }

  if (root.TOOLCHAIN_NAME) {
    let toolchain = inlineToolchain[root.TOOLCHAIN_NAME];
    if (!toolchain) {
      toolchain = requireImpl(/* ignore */ root.TOOLCHAIN_NAME);
    }
    toolchain(root);
  }

  const pluginContext = PluginContext.create(scope, global);
  for (const plugin of (root.MAKE_PLUGIN_LIST || [])) {
    const filename = bitmake.FilePath.create(plugin);
    const module = requireImpl(/* ignore */ filename.toString());
    if (!module.pluginEntry)
      throw new Error(`Plugin ${filename.basename()} not contain pluginEntry function`);
    module.pluginEntry(pluginContext);
  }

  root.__doSubdirectory();
  root.logInfo("Configuring done");

  if (root.GLOBAL_CONTEXT_JSON) {
    const filename = root.GLOBAL_CONTEXT_JSON.toString();
    const content = JSON.stringify(global, null, 2);
    fs.mkdirSync(path.dirname(filename), { recursive: true });
    fs.writeFileSync(filename, content, { encoding: "utf8" });
  }

  const allGoalList = global.createGoals(root);
  const goalList = allGoalList.getTargetList("install");

  if (root.TARGET_GOALS_JSON) {
    const filename = root.TARGET_GOALS_JSON.toString();
    const content = JSON.stringify(goalList, null, 2);
    fs.mkdirSync(path.dirname(filename), { recursive: true });
    fs.writeFileSync(filename, content, { encoding: "utf8" });
  }

  await bitmake.GoalCollection.buildGoals(goalList);
}

module.exports = {
  actionMakeScript,
};
