import { strictObject, string } from "valibot";

export const objectIdSchema = strictObject({
    _oid: string()
});
