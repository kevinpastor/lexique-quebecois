import { z } from "zod";

import { WordClass, wordClasses } from "./classes";

export interface WordRequest {
    label: string;
    wordClasses: Array<WordClass>;
    definition: string;
    example: string;
    author?: string;
}

export const labelRegex: RegExp = /^[a-zàâäéèêëïîôöùûüÿæœç\s-]*$/gi;

export const isValidLabel = (label: string): boolean => {
    return labelRegex.test(label);
};

export const wordRequestValidationSchema = z
    .object({
        label: z
            .string()
            .trim()
            .min(1, "Ce champ est requis.")
            .min(2, "Ce champ doit contenir au moins 2 caractères.")
            .max(32, "Ce champ doit contenir au maximum 32 caractères.")
            .regex(labelRegex, "Ce champ peut contenir des lettres, des espaces ou des tirets."),
        wordClasses: z
            .array(z.nativeEnum(
                WordClass,
                { invalid_type_error: "Ce champ doit contenir une des valeurs proposées." }
            ))
            .max(wordClasses.length, `Ce champ doit contenir au maximum ${wordClasses.length} options.`),
        definition: z
            .string()
            .trim()
            .min(1, "Ce champ est requis.")
            .min(2, "Ce champ doit contenir au moins 2 caractères.")
            .max(256, "Ce champ doit contenir au maximum 256 caractères."),
        example: z
            .string()
            .trim()
            .min(1, "Ce champ est requis.")
            .min(2, "Ce champ doit contenir au moins 2 caractères.")
            .max(256, "Ce champ doit contenir au maximum 256 caractères."),
        author: z
            .union([ // The order of the union is important to get the correct error message.
                z
                    .string()
                    .trim()
                    .min(2, "Ce champ doit contenir au moins 2 caractères.")
                    .max(32, "Ce champ doit contenir au maximum 32 caractères."),
                z
                    .string()
                    .trim()
                    .length(0, "Ce champ doit contenir au moins 2 caractères."), // The error message is not necessary, but is there to be safe.
            ])
            .optional()
            .transform((value?: string): string | undefined => value === "" ? undefined : value)
    })
    .strict();

export const isValidWordRequest = (value: unknown): value is WordRequest => (
    wordRequestValidationSchema.safeParse(value).success
);

export const cleanupWordRequest = (value: WordRequest): WordRequest => (
    wordRequestValidationSchema.parse(value)
);
