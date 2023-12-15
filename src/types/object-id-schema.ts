import { never, object, string } from "valibot";

export const objectIdSchema = object(
    {
        _oid: string()
    },
    never()
);
