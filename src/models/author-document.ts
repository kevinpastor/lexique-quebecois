import { z } from "zod";

export interface AuthorDocument {
    name?: string;
    ip: string;
}

export const authorDocumentSchema = z
    .object({
        name: z.
            string()
            .optional(),
        ip: z.string()
    })
    .strict();
