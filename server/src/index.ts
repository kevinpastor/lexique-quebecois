import "reflect-metadata";
import "dotenv/config";

import { container } from "./container";
import { App } from "./app";

const app: App = container.get(App);
app.start();
