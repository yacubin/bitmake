"use strict";

const fs = require("node:fs");
const path = require("node:path");

const { UserContext } = require("./bitmake/UserContext.js");
const { PluginContext } = require("./bitmake/PluginContext.js");
const { GlobalContext } = require("./bitmake/GlobalContext.js");
const { SystemVariables } = require("./bitmake/SystemVariables.js");
const bitmake = require("###/bitmake/index.js");

async function actionMakeScript(config, environment, settings)
{
  process.env = environment;

  const scope = SystemVariables.create(config.sourceDir, config.binaryDir);

  const global = GlobalContext.create();
  global.loadCacheVariables(scope.CACHE_FILE.toString());

  const pkg = require(scope.PACKAGE_FILE.toString());

  scope.BUILD_TYPE = config.buildType;
  scope.PROJECT_NAME = pkg.name;
  scope.PROJECT_VERSION = pkg.version;
  scope.PROJECT_DESCRIPTION = pkg.description;
  scope.PROJECT_HOMEPAGE_URL = pkg.homepage;
  scope.DESTDIR = config.destDir ? bitmake.DirPath.create(config.destDir) : null;
  scope.INSTALL_PREFIX = bitmake.DirPath.create("/usr");

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
    const filename = path.posix.join(__dirname, `toolchain/${root.TOOLCHAIN_NAME}.js`);
    const toolchain = require(filename);
    toolchain(root);
  }

  const pluginContext = PluginContext.create(scope, global);
  for (const plugin of (root.MAKE_PLUGIN_LIST || [])) {
    const filename = bitmake.FilePath.create(plugin);
    const module = require(filename.toString());
    if (!module.pluginEntry)
      throw new Error(`Plugin ${filename.basename()} not contain pluginEntry function`);
    module.pluginEntry(pluginContext);
  }

  root.__applyDirectory(root.PROJECT_SOURCE_DIR, root.PROJECT_BINARY_DIR);
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
