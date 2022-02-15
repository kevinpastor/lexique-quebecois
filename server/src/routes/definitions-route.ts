import { Request, Response, Router } from "express";
import { injectable } from "inversify";
import { Definition } from "../../../shared/models/definition";
import { DefinitionsService } from "../services/definitions-service";
import { asyncHandler } from "../utils/async-handler";
import { AbstractRoute } from "./abstract-route";
import { ResponseCode } from "./response-code";

@injectable()
export class DefinitionsRoute implements AbstractRoute {

    private readonly router: Router;

    public constructor(
        private readonly service: DefinitionsService
    ) {
        this.router = Router();
        this.router.get("/definitions/:label", asyncHandler(this.getDefinition.bind(this)));
        this.router.post("/definitions/:label", asyncHandler(this.addDefinition.bind(this)));
    }

    public get(): Router {
        return this.router;
    }

    private async getDefinition(req: Request, res: Response): Promise<void> {
        const label: unknown = req.params.label;
        if (!DefinitionsRoute.isValidLabel(label)) {
            res.status(ResponseCode.BadRequest)
                .send(); // TODO
            return;
        }

        const definition: Definition = await this.service.getDefinition(label);

        res.status(ResponseCode.OK)
            .send(definition);
    }

    private async addDefinition(req: Request, res: Response): Promise<void> {
        const label: unknown = req.params.label;
        if (!DefinitionsRoute.isValidLabel(label)) {
            res.status(ResponseCode.BadRequest)
                .send(); // TODO
            return;
        }

        const requestedDefinition: unknown = req.body;
        if (!DefinitionsRoute.isValidDefinition(requestedDefinition)) {
            res.status(ResponseCode.BadRequest)
                .send(); // TODO
            return;
        }

        const definition: Definition = await this.service.addDefinition(label, requestedDefinition);

        res.status(ResponseCode.OK)
            .send(definition);
    }

    private static isValidLabel(label: unknown): label is string {
        return typeof label === "string";
    }

    private static isValidDefinition(definition: unknown): definition is Definition {
        return true; // TODO
    }

}
