import { NextFunction, Request, Response, Router } from "express";
import { injectable } from "inversify";

import { cleanWord, Word, isValidWord } from "@quebecois-urbain/shared/models/word";
import { DatedWord } from "@quebecois-urbain/shared/models/dated-word";
import { isString } from "@quebecois-urbain/shared/utils/validators";
import { WordService } from "../services/words-service";
import { asyncHandler } from "../utils/async-handler";
import { AbstractRoute } from "./abstract-route";
import { ResponseCode } from "./response-code";

import * as yup from "yup";

const wordSchema = yup.object({
    body: yup.object({
        label: yup.string().required(),
        definition: yup.string().required(),
        example: yup.string().required(),
        author: yup.string().optional()
    })
});

const validate = (schema: yup.AnySchema) => async (req: Request, res: Response, next: NextFunction): Promise<void> => {
    try {
        await schema.validate({
            body: req.body,
            query: req.query,
            params: req.params
        });
        next();
        return;
    }
    catch (error: unknown) {
        res.status(ResponseCode.BadRequest)
            .send();
        return;
    }
};

@injectable()
export class WordsRoute implements AbstractRoute {

    private readonly router: Router;

    public constructor(
        private readonly service: WordService
    ) {
        this.router = Router();
        this.router.get("/words/:label", asyncHandler(this.getWord.bind(this)));
        this.router.post("/words", validate(wordSchema), asyncHandler(this.addWord.bind(this)));
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

        const word: DatedWord = await this.service.getWord(label);

        res.status(ResponseCode.OK)
            .send(word);
    }

    private async addWord(req: Request, res: Response): Promise<void> {
        const requestedWord: unknown = req.body;
        if (!isValidWord(requestedWord)) {
            res.status(ResponseCode.BadRequest)
                .send(); // TODO
            return;
        }

        const cleanedWord: Word = cleanWord(requestedWord);
        const word: DatedWord = await this.service.addWord(cleanedWord);

        res.status(ResponseCode.OK)
            .send(word);
    }

    private static isValidLabel(label: unknown): label is string {
        return isString(label);
    }

}
