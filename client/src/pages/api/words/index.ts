import { Word } from "@quebecois-urbain/shared/models/word";
import { addWord } from "@services/words";
import { NextApiRequest, NextApiResponse } from "next";
import * as yup from "yup";

const addWordSchema = yup
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
    .noUnknown();

export default async (req: NextApiRequest, res: NextApiResponse): Promise<void> => {
    if (req.method !== "POST") {
        res.status(404)
            .end();
        return;
    }

    if (!await addWordSchema.isValid(req.body, { strict: true })) {
        res.status(400)
            .end();
        return;
    }

    const word: Word = req.body;
    const datedWord: unknown = await addWord(word);

    res.status(200)
        .json(datedWord);
};
