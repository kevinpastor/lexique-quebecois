import { object, string } from "yup";

export interface AuthorDocument {
    name?: string;
    ip: string;
}

export const authorDocumentSchema = object({
    name: string()
        .optional(),
    ip: string()
        .required()
})
    .noUnknown()
    .required();
