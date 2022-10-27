import { object, array, string } from "yup";

export interface ReactionsDocument {
    likes: Array<string>;
    dislikes: Array<string>;
}

export const reactionsDocumentSchema = object({
    likes: array()
        .of(string())
        .required(),
    dislikes: array()
        .of(string())
        .required()
});
