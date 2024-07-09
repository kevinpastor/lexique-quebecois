import { minLength, pipe, strictObject, string } from "valibot";

export type WithToken<T> = T & {
    token: string;
};

export const withTokenSchema = strictObject({
    token: pipe(string(), minLength(1, "Ce champ est requis."))
});
