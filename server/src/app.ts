import * as express from "express";
import { Express, json } from "express";
import { injectable } from "inversify";
import * as morgan from "morgan";

import { Routes } from "./routes";

@injectable()
export class App {

    private static readonly port: number = 8080;

    private readonly app: Express;

    public constructor(routes: Routes) {
        this.app = express();

        this.app.use(morgan("dev"))
            .use(json())
            .use("/api/v1", routes.get());
    }

    public start(): void {
        this.app.listen(App.port, (): void => {
            console.log(`Listening on port ${App.port}!`);
        });
    }

}
