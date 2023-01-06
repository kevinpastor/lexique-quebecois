import { z } from "zod";

export interface ReactionsDocument {
    likes: Array<string>;
    dislikes: Array<string>;
}

export const reactionsDocumentSchema = z
    .object({
        likes: z.array(z.string()),
        dislikes: z.array(z.string())
    })
    .strict();
