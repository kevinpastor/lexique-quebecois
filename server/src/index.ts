import "reflect-metadata";

import { container } from "./container";
import { App } from "./app";

const app: App = container.get(App);
app.start();

