import { object, string } from "zod";

export const objectIdSchema = object({
    _oid: string()
})
    .strict();

export const objectWithIdSchema = object({
    _id: objectIdSchema
})
    .strict();
