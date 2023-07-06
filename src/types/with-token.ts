import { object, string } from "zod";

export type WithToken<T> = T & {
    token: string;
};

export const withTokenSchema = object({
    token: string()
        .min(1, "Ce champ est requis.")
})
    .strict();
