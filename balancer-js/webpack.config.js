import path, { dirname } from "path";
import { fileURLToPath } from "url";

import { config } from "./src/config/config.js";

const { NODE_ENV } = config;

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

const isProd = NODE_ENV;

const configWebPack = {
    entry: "./src/index.js",
    target: "node",
    experiments: {
        outputModule: true,
    },
    output: {
        path: path.resolve(__dirname, "dist"),
        filename: "bundle.js",
        scriptType: "module",
        chunkFormat: "module"
    },
    devServer: {
        open: true,
        host: "localhost",
    },
};

export default () => {
    if (isProd) {
      configWebPack.mode = "production";
    } else {
      configWebPack.mode = "development";
    }
    return configWebPack;
  };
  