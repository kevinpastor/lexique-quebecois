import { object, strict, string } from "valibot";

export const objectIdSchema = strict(
    object({
        _oid: string()
    })
);
