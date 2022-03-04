import { NextApiRequest, NextApiResponse } from "next";
import * as yup from "yup";

import { Method, Status, WordsPostRequestBody } from "@models";
import { addWord } from "@services/words";
import { labelRegex } from "@utils/word";

const addWordSchema = yup
    .object({
        label: yup
            .string()
            .trim()
            .min(2)
            .max(32)
            .matches(labelRegex)
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

const handler = async (req: NextApiRequest, res: NextApiResponse): Promise<void> => {
    if (req.method !== Method.POST) {
        res.status(Status.MethodNotAllowed)
            .end();
        return;
    }

    if (!await addWordSchema.isValid(req.body, { strict: true })) {
        res.status(Status.BadRequest)
            .end();
        return;
    }

    const word: WordsPostRequestBody = req.body;
    const datedWord: unknown = await addWord(word);

    res.status(Status.Created)
        .json(datedWord);
};

export default handler;
