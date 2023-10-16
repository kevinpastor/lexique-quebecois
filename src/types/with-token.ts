import { minLength, object, strict, string } from "valibot";

export type WithToken<T> = T & {
    token: string;
};

export const withTokenSchema = strict(
    object({
        token: string([
            minLength(1, "Ce champ est requis.")
        ])
    })
);
