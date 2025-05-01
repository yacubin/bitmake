const pkg = require("./package.json");

module.exports = {
  compilationOptions: {
    preferredConfigPath: "./tsconfig.json",
  },
  entries: [
    {
      filePath: "./src/index.ts",
      outFile: "./dist/bitmake.d.ts",
      failOnClass: true,
      output: {
        inlineDeclareGlobals: false,
        sortNodes: true,
        noBanner: true,
        umdModuleName: pkg.name,
      }
    },
  ],
};
