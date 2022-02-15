//const tsConfig = require("./tsconfig.json");
//const tsConfigPaths = require("tsconfig-paths");
//
//const baseUrl = "./"; // Either absolute or relative path. If relative it's resolved to current working directory.
//const cleanup = tsConfigPaths.register({
//    baseUrl,
//    paths: tsConfig.compilerOptions.paths
//});

import "reflect-metadata";
import "dotenv/config";

import { container } from "./container";
import { App } from "./app";

const app: App = container.get(App);
app.start();

//// When path registration is no longer needed
//cleanup();
