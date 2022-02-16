import { Request, Response, Router } from "express";
import { injectable } from "inversify";

import { cleanWord, Word, isValidWord } from "@quebecois-urbain/shared/models/word";
import { isString } from "@quebecois-urbain/shared/utils/validators";
import { WordService } from "../services/words-service";
import { asyncHandler } from "../utils/async-handler";
import { AbstractRoute } from "./abstract-route";
import { ResponseCode } from "./response-code";

@injectable()
export class WordsRoute implements AbstractRoute {

    private readonly router: Router;

    public constructor(
        private readonly service: WordService
    ) {
        this.router = Router();
        this.router.get("/words/:label", asyncHandler(this.getWord.bind(this)));
        this.router.post("/words/:label", asyncHandler(this.addWord.bind(this)));
    }

    public get(): Router {
        return this.router;
    }

    private async getWord(req: Request, res: Response): Promise<void> {
        const label: unknown = req.params.label;
        if (!WordsRoute.isValidLabel(label)) {
            res.status(ResponseCode.BadRequest)
                .send(); // TODO
            return;
        }

        const word: Word = await this.service.getWord(label);

        res.status(ResponseCode.OK)
            .send(word);
    }

    private async addWord(req: Request, res: Response): Promise<void> {
        const label: unknown = req.params.label;
        if (!WordsRoute.isValidLabel(label)) {
            res.status(ResponseCode.BadRequest)
                .send(); // TODO
            return;
        }

        const requestedWord: unknown = req.body;
        if (!isValidWord(requestedWord)) {
            res.status(ResponseCode.BadRequest)
                .send(); // TODO
            return;
        }

        const cleanedWord: Word = cleanWord(requestedWord);
        const word: Word = await this.service.addWord(label, cleanedWord);

        res.status(ResponseCode.OK)
            .send(word);
    }

    private static isValidLabel(label: unknown): label is string {
        return isString(label);
    }

}
