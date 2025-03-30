"use strict";

const fs = require("node:fs");
const path = require("node:path");

const { AbsolutePath } = require("###/utils/AbsolutePath.js");
const { UserContext } = require("./bitmake/UserContext.js");
const bitmake = require("###/bitmake/index.js");

const PACKAGE_JSON = "package.json";
const MAKE_CACHE = "MakeCache.json";

async function actionMakeScript(config, environment, settings)
{
  process.env = environment;

  const global = bitmake.GlobalContext.create();
  global.loadCacheVariables(AbsolutePath.create(config.binaryDir).join(MAKE_CACHE));

  const scope = bitmake.Scope.create();
  const root = UserContext.create(scope, global);

  root.PROJECT_SOURCE_DIR = new AbsolutePath(config.sourceDir);
  root.PROJECT_BINARY_DIR = new AbsolutePath(config.binaryDir);
  root.BUILD_TYPE = config.buildType;
  root.SOURCE_DIR = root.PROJECT_SOURCE_DIR;
  root.BINARY_DIR = root.PROJECT_BINARY_DIR;

  const pkg = require(root.SOURCE_DIR.join(PACKAGE_JSON).toString());

  root.PROJECT_NAME = pkg.name;
  root.PROJECT_VERSION = pkg.version;
  root.PROJECT_DESCRIPTION = pkg.description;
  root.PROJECT_HOMEPAGE_URL = pkg.homepage;

  root.DESTDIR = config.destDir || "";
  root.INSTALL_PREFIX = bitmake.DirPath.create("/usr");

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

  for (const plugin of (root.MAKE_PLUGIN_LIST || [])) {
    const filename = bitmake.FilePath.create(plugin);
    const module = require(filename.toString());
    if (!module.pluginEntry)
      throw new Error(`Plugin ${filename.basename()} not contain pluginEntry function`);
    console.log("Hello Plugin");
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
