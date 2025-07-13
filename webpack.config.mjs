/*
 * MIT License
 *
 * Copyright (c) 2025  Yurii Yakubin (yurii.yakubin@gmail.com)
 *
 * Permission is granted to use, copy, modify, and distribute this software
 * under the MIT License. See LICENSE file for details.
 */

import path from "node:path";
import fs from "node:fs";
import url from "node:url";

import webpack from "webpack";

const __filename = url.fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

async function readJSON(filename) {
  const content = await fs.promises.readFile(filename, "utf8");
  return JSON.parse(content);
}

export default async (env, argv) => {
  const isDevelopment = (argv.mode === "development");
  const mode = isDevelopment ? "development" : "production";
  const devtool = isDevelopment ? "inline-source-map" : undefined;
  const tsconfig = isDevelopment ? "tsconfig.dev.json" : "tsconfig.json";
  const sourceDir = path.resolve(__dirname, "src");

  const pkg = await readJSON(path.join(__dirname, "package.json"));
  const globalVariables = {
    PROJECT_NAME: pkg.name || "",
    PROJECT_VERSION: pkg.version || "",
    PROJECT_DESCRIPTION: pkg.description || "",
    PROJECT_HOMEPAGE_URL: pkg.homepage || "",
    HOST_SOURCE_URL: url.pathToFileURL(sourceDir),
    LOGGER_DEBUG: [
      "*:5",
    ],
  };

  for (const [key, val] of Object.entries(globalVariables))
    globalVariables[key] = JSON.stringify(val);

  const outputPath = path.resolve(__dirname, "dist");
  const resolve = {
    extensions: [ ".ts", ".tsx", ".mjs", ".js" ],
    alias: {
      "@": sourceDir,
    },
  };

  const module = {
    rules: [
      {
        test: /\.tsx?$/,
        exclude: /node_modules/,
        use: [
          {
            loader: "ts-loader",
            options: {
              configFile: path.join(__dirname, tsconfig),
            }
          }
        ],
      },
    ],
  };

  const config = {
    mode,
    devtool,
    resolve,
    target: 'node',
    entry: {
      "bitmake": "./src/index.ts",
    },
    output: {
      path: outputPath,
      filename: '[name].js',
      library: {
        name: "bitmake",
        type: "commonjs2",
      },
      libraryTarget: "umd",
      libraryExport: "default",
    },
    module,
    plugins: [
      new webpack.DefinePlugin(globalVariables),
      new webpack.BannerPlugin({
        banner: "#!/usr/bin/env node",
        raw: true,
      }),
    ],
  };

  return config;
}
