import { minLength, never, object, string } from "valibot";

export type WithToken<T> = T & {
    token: string;
};

export const withTokenSchema = object(
    {
        token: string([
            minLength(1, "Ce champ est requis.")
        ])
    },
    never()
);
