import { array, object, string } from "zod";

export interface ReactionsDocument {
    likes: Array<string>;
    dislikes: Array<string>;
}

export const reactionsDocumentSchema = object({
    likes: array(string()),
    dislikes: array(string())
})
    .strict();
