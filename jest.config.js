
const path = require("node:path");
const url = require("node:url");
const pkg = require("./package.json");

module.exports = {
  rootDir: ".",
  preset: "ts-jest",
  testEnvironment: "node",
  transform: {
    "^.+\\.(js|jsx|mjs)$": "babel-jest",
    "^.+\\.tsx?$": [
      "ts-jest",
      {
        tsconfig: "<rootDir>/tsconfig.dev.json",
        diagnostics: {
          ignoreCodes: [1343]
        },
        astTransformers: {
          before: [
            {
              path: "node_modules/ts-jest-mock-import-meta",
              options: { metaObjectReplacement: { url: "https://www.npmjs.com/package/bitmake" } }
            }
          ]
        }
      }
    ],
  },
  moduleFileExtensions: [ "json", "js", "jsx", "mjs", "ts", "tsx" ],
  moduleNameMapper: {
    "^@/(.*)$": "<rootDir>/src/$1",
  },
  testMatch: [
    "**/test/**/*.ts",
  ],
  transformIgnorePatterns: [
    "/node_modules/",
  ],
  globals: {
    PROJECT_NAME: pkg.name || "",
    PROJECT_VERSION: pkg.version || "",
    PROJECT_DESCRIPTION: pkg.description || "",
    PROJECT_HOMEPAGE_URL: pkg.homepage || "",
    HOST_SOURCE_URL: url.pathToFileURL(path.resolve(__dirname, "src")),
    ENABLE_STACK_TRACE: true,
    LOGGER_DEBUG: [
    ],
  },
};
