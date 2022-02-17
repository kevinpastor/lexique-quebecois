import { Request, Response, Router } from "express";
import { injectable } from "inversify";
import * as yup from "yup";

import { Word } from "@quebecois-urbain/shared/models/word";
import { DatedWord } from "@quebecois-urbain/shared/models/dated-word";
import { WordService } from "../services/words-service";
import { asyncHandler } from "../utils/async-handler";
import { validate } from "../utils/validate";
import { AbstractRoute } from "./abstract-route";
import { ResponseCode } from "./response-code";

const getWordSchema = yup.object({
    params: yup.object({
        label: yup.string().required()
    })
});

const postWordSchema = yup.object().shape({
    body: yup
        .object({
            label: yup.string().required(),
            definition: yup.string().required(),
            example: yup.string().required(),
            author: yup.string().optional()
        })
        .noUnknown()
});

@injectable()
export class WordsRoute implements AbstractRoute {

    private readonly router: Router;

    public constructor(
        private readonly service: WordService
    ) {
        this.router = Router();
        this.router.get(
            "/words/:label",
            validate(getWordSchema),
            asyncHandler(this.getWord.bind(this))
        );
        this.router.get(
            "/words",
            asyncHandler(this.getWords.bind(this))
        );
        this.router.post(
            "/words",
            validate(postWordSchema),
            asyncHandler(this.addWord.bind(this))
        );
    }

    public get(): Router {
        return this.router;
    }

    private async getWord(req: Request, res: Response): Promise<void> {
        const label: string = req.params.label;
        const word: DatedWord = await this.service.getWord(label);

        res.status(ResponseCode.OK)
            .send(word);
    }

    private async getWords(req: Request, res: Response): Promise<void> {
        const words: Array<DatedWord> = await this.service.getWords();

        res.status(ResponseCode.OK)
            .send(words);
    }

    private async addWord(req: Request, res: Response): Promise<void> {
        const requestedWord: Word = req.body;
        await this.service.addWord(requestedWord);

        res.status(ResponseCode.OK)
            .send();
    }

}
