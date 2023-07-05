import { object, string } from "zod";

export interface AuthorDocument {
    name?: string;
    ip: string;
}

export const authorDocumentSchema = object({
    name: string()
        .optional(),
    ip: string()
})
    .strict();
