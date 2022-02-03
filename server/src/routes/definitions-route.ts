import { Request, Response, Router } from "express";
import { injectable } from "inversify";
import { Definition } from "../../../shared/models/definition";
import { DefinitionsService } from "../services/definitions-service";
import { AbstractRoute } from "./abstract-route";
import { ResponseCode } from "./response-code";

@injectable()
export class DefinitionsRoute implements AbstractRoute {

    private router: Router;

    public constructor(
        private service: DefinitionsService
    ) {
        this.router = Router();
        this.router.get("/definitions/:label", this.getDefinition.bind(this));
    }

    public get(): Router {
        return this.router;
    }

    private getDefinition(req: Request, res: Response): void {
        const definition: Definition = this.service.getDefinition(req.params.label)

        res.status(ResponseCode.OK)
            .send(definition);
    }

}
