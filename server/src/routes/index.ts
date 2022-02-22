import { NextFunction, Request, Response, Router } from "express";
import { injectable, multiInject } from "inversify";
import { AbstractRoute } from "./abstract-route";

import { ResponseCode } from "./response-code";

@injectable()
export class Routes {

    private readonly router: Router;

    public constructor(@multiInject(AbstractRoute) routes: Array<AbstractRoute>) {
        this.router = Router();

        this.router.all("*", (req, res, next) => { console.log(req.headers); next(); });

        for (const route of routes) {
            this.router.use("/api", route.get());
        }

        this.router.use("/api", this.notFound.bind(this));
        this.router.use("/api", this.internalError.bind(this));
    }

    public get(): Router {
        return this.router;
    }

    private notFound(_: Request, res: Response): void {
        res.status(ResponseCode.NotFound)
            .send();
    }

    // eslint-disable-next-line @typescript-eslint/no-unused-vars
    private internalError(err: any, _: Request, res: Response, __: NextFunction): void {
        console.error(err);
        res.status(ResponseCode.InternalError)
            .send();
    }

}
