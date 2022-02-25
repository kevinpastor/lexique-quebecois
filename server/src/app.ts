import * as express from "express";
import { Express, json, Request, Response, NextFunction } from "express";
import { injectable } from "inversify";
import * as morgan from "morgan";
import * as cors from "cors";
import helmet from "helmet";

import { isDevelopmentEnvironment } from "@quebecois-urbain/shared/utils/environment";
import { Routes } from "./routes";
import { ResponseCode } from "./routes/response-code";

@injectable()
export class App {

    private readonly port: number = 8080;

    private readonly app: Express;

    public constructor(routes: Routes) {
        if (process.env.PORT) {
            this.port = parseInt(process.env.PORT);
        }

        this.app = express();

        this.app.use(morgan(
            isDevelopmentEnvironment()
                ? "dev"
                : "common"
        ));

        if (isDevelopmentEnvironment()) {
            this.app.use(cors({
                origin: "http://localhost:3000"
            }));
        }

        this.app.use(helmet())
            .use(json())
            .use(routes.get())
            .use(this.parsingError.bind(this));
    }

    public start(): void {
        this.app.listen(this.port, (): void => {
            // eslint-disable-next-line no-console
            console.log(`Listening on port ${this.port}!`);
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
