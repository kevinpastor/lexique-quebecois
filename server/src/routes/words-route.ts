import { Request, Response, Router } from "express";
import { injectable } from "inversify";
import * as yup from "yup";
import rateLimit from "express-rate-limit";

import { Word } from "@quebecois-urbain/shared/models/word";
import { DatedWord } from "@quebecois-urbain/shared/models/dated-word";
import { WordService } from "../services/words-service";
import { asyncHandler } from "../utils/async-handler";
import { validate } from "../utils/validate";
import { AbstractRoute } from "./abstract-route";
import { ResponseCode } from "./response-code";

const getWordSchema = yup.object({
    params: yup
        .object({
            label: yup
                .string()
                .trim()
                .min(2)
                .max(32)
                .required()
        })
        .noUnknown()
});

const addWordSchema = yup.object({
    body: yup
        .object({
            label: yup
                .string()
                .trim()
                .min(2)
                .max(32)
                .required(),
            definition: yup
                .string()
                .trim()
                .min(2)
                .max(256)
                .required(),
            example: yup
                .string()
                .trim()
                .min(2)
                .max(256)
                .required(),
            author: yup
                .string()
                .trim()
                .min(2)
                .max(32)
                .optional()
        })
        .noUnknown()
});

const addWordRateLimit = rateLimit({
    windowMs: 15 * 60 * 1000, // 15 minutes
    max: 15, // Limit each IP to 100 requests per `window` (here, per 15 minutes)
    standardHeaders: true,
    legacyHeaders: false,
    message: ""
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
            addWordRateLimit,
            validate(addWordSchema),
            asyncHandler(this.addWord.bind(this))
        );
    }

    public get(): Router {
        return this.router;
    }

    private async getWord(req: Request, res: Response): Promise<void> {
        const label: string = req.params.label;

        try {
            const word: DatedWord = await this.service.getWord(label);
            res.status(ResponseCode.OK)
                .send(word);
            return;
        }
        catch {
            res.status(ResponseCode.NotFound)
                .send();
            return;
        }
    }

    private async getWords(_: Request, res: Response): Promise<void> {
        const words: Array<DatedWord> = await this.service.getWords();

        res.status(ResponseCode.OK)
            .send(words);
    }

    private async addWord(req: Request, res: Response): Promise<void> {
        const requestedWord: Word = req.body;
        const word: DatedWord = await this.service.addWord(requestedWord);

        res.status(ResponseCode.Created)
            .send(word);
    }

}
