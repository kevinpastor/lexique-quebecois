import * as express from "express";
import { Express, json, Request, Response, NextFunction, Router } from "express";
import { injectable } from "inversify";
import * as morgan from "morgan";
import * as cors from "cors";
import helmet from "helmet";
import createNextServer from "next";

import { Routes } from "./routes";
import { ResponseCode } from "./routes/response-code";
import { NextServer, NextServerOptions, RequestHandler } from "next/dist/server/next";
import { isDevelopmentEnvironment, isProductionEnvironment } from "./utils/environment";

@injectable()
export class App {

    private static readonly port: number = 8080;

    private readonly app: Express;

    public constructor(routes: Routes) {
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

        if (isProductionEnvironment()) {
            this.app.use(this.getNextRoute());
        }
    }

    public start(): void {
        this.app.listen(App.port, (): void => {
            // eslint-disable-next-line no-console
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

    private getNextRoute(): Router {
        const options: NextServerOptions = {
            dir: "../client"
        };
        const server: NextServer = createNextServer(options);
        const handler: RequestHandler = server.getRequestHandler();

        const router: Router = Router();
        router.all("*", async (req: Request, res: Response): Promise<void> => {
            try {
                await handler(req, res);
            }
            catch (error: unknown) {
                // eslint-disable-next-line no-console
                console.error(error);
            }
        });

        return router;
    }

}
