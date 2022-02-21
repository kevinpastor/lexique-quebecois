import * as express from "express";
import { Express, json, Request, Response, NextFunction } from "express";
import { injectable } from "inversify";
import * as morgan from "morgan";
import * as cors from "cors";
import helmet from "helmet";

import { Routes } from "./routes";
import { ResponseCode } from "./routes/response-code";

@injectable()
export class App {

    private static readonly port: number = 8080;

    private readonly app: Express;

    public constructor(routes: Routes) {
        this.app = express();

        this.app.use(morgan("dev"))
            .use(cors({
                origin: "http://localhost:3000"
            }))
            .use(helmet())
            .use(json())
            .use(routes.get())
            .use(this.parsingError.bind(this));
    }

    public start(): void {
        this.app.listen(App.port, (): void => {
            console.log(`Listening on port ${App.port}!`);
        });
    }

    private parsingError(error: unknown, _: Request, res: Response, next: NextFunction): void {
        if (error instanceof SyntaxError) {
            res.status(ResponseCode.BadRequest)
                .send();
            return;
        }

        next();
    }

}
