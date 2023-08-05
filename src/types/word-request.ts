import { array, nativeEnum, object, string, union } from "zod";

import { type WithToken, withTokenSchema } from "./with-token";
import { WordClass, wordClasses } from "./word-class";

export interface WordRequest {
    label: string;
    wordClasses: Array<WordClass>;
    definition: string;
    example: string;
    author?: string;
}

const labelRegex: RegExp = /^[a-zàâäéèêëïîôöùûüÿæœç\s-]*$/gi;

const wordRequestSchema = object({
    label: string()
        .trim()
        .min(1, "Ce champ est requis.")
        .min(2, "Ce champ doit contenir au moins 2 caractères.")
        .max(32, "Ce champ doit contenir au maximum 32 caractères.")
        .regex(labelRegex, "Ce champ peut contenir des lettres, des espaces ou des tirets."),
    wordClasses: array(nativeEnum(
        WordClass,
        { invalid_type_error: "Ce champ doit contenir une des valeurs proposées." }
    ))
        .max(wordClasses.length, `Ce champ doit contenir au maximum ${wordClasses.length} options.`),
    definition: string()
        .trim()
        .min(1, "Ce champ est requis.")
        .min(2, "Ce champ doit contenir au moins 2 caractères.")
        .max(256, "Ce champ doit contenir au maximum 256 caractères."),
    example: string()
        .trim()
        .min(1, "Ce champ est requis.")
        .min(2, "Ce champ doit contenir au moins 2 caractères.")
        .max(256, "Ce champ doit contenir au maximum 256 caractères."),
    author: union([ // The order of the union is important to get the correct error message.
        string()
            .trim()
            .min(2, "Ce champ doit contenir au moins 2 caractères.")
            .max(32, "Ce champ doit contenir au maximum 32 caractères."),
        string()
            .trim()
            .length(0, "Ce champ doit contenir au moins 2 caractères.") // The error message is not necessary, but is there to be safe.
    ])
        .optional()
        .transform((value?: string): string | undefined => value === "" ? undefined : value)
})
    .strict();

export const wordRequestWithTokenSchema = wordRequestSchema.merge(withTokenSchema);

export const cleanWordRequestWithToken = (value: WithToken<WordRequest>): WithToken<WordRequest> => (
    wordRequestWithTokenSchema.parse(value)
);

export const isWordRequestWithToken = (value: unknown): value is WithToken<WordRequest> => (
    wordRequestWithTokenSchema.safeParse(value).success
);
