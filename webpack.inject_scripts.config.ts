import { Configuration } from "webpack";
import * as path from "path";

const config: Configuration = {
  mode: "production",
  entry: "./src/inject_scripts/index.ts",
  output: {
    path: path.resolve(__dirname, "build"),
    filename: "inject_script.js",
  },
  module: {
    rules: [
      {
        test: /\.ts$/,
        use: {
          loader: "ts-loader",
          options: {
            transpileOnly: true,
            configFile: "tsconfig.inject_scripts.json",
          },
        },
      },
    ],
  },
  resolve: {
    extensions: [".ts", ".js"],
  },
};

export default config;
