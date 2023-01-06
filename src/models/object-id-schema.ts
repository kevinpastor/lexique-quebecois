import { z } from "zod";

export const objectIdSchema = z
    .object({
        _oid: z.string()
    })
    .strict();

export const objectWithIdSchema = z
    .object({
        _id: objectIdSchema
    })
    .strict();
