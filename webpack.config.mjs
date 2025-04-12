import path from 'node:path';
import url from 'node:url';

const __filename = url.fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

export default (env, argv) => {
  const isDevelopment = (argv.mode === "development");
  const mode = isDevelopment ? "development" : "production";
  const devtool = isDevelopment ? "inline-source-map" : "source-map";

  const config = {
    mode,
    devtool,
    target: 'node',
    entry: {
      "bitmake-cli": './src/bitmake-cli.mjs',
    },
    output: {
      path: path.resolve(__dirname, 'dist'),
      filename: '[name].js',
      sourceMapFilename: "[name].map",
      clean: true,
    },
  };

  return config;
}
