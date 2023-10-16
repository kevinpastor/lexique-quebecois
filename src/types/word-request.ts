import { array, is, maxLength, merge, minLength, nativeEnum, notLength, object, optional, parse, regex, strict, string, toTrimmed, transform } from "valibot";

import { type WithToken, withTokenSchema } from "./with-token";
import { WordClass, wordClasses } from "./word-class";

export interface WordRequest {
    label: string;
    wordClasses: Array<WordClass>;
    definition: string;
    example: string;
    author?: string;
}

const labelRegex: RegExp = /^[a-zàâäéèêëïîôöùûüÿæœç\s-]*$/i;

const wordRequestSchema = strict(
    object({
        label: string([
            toTrimmed(),
            minLength(1, "Ce champ est requis."),
            minLength(2, "Ce champ doit contenir au moins 2 caractères."),
            maxLength(32, "Ce champ doit contenir au maximum 32 caractères."),
            regex(labelRegex, "Ce champ ne peut contenir que des lettres, des espaces ou des tirets.")
        ]),
        wordClasses: array(
            nativeEnum(WordClass, "Ce champ doit contenir une des valeurs proposées."),
            [
                maxLength(wordClasses.length, `Ce champ doit contenir au maximum ${wordClasses.length} options.`)
            ]
        ),
        definition: string([
            toTrimmed(),
            minLength(1, "Ce champ est requis."),
            minLength(2, "Ce champ doit contenir au moins 2 caractères."),
            maxLength(256, "Ce champ doit contenir au maximum 256 caractères.")
        ]),
        example: string([
            toTrimmed(),
            minLength(1, "Ce champ est requis."),
            minLength(2, "Ce champ doit contenir au moins 2 caractères."),
            maxLength(256, "Ce champ doit contenir au maximum 256 caractères.")
        ]),
        author: transform(
            optional(
                string([
                    toTrimmed(),
                    notLength(1, "Ce champ optionel doit contenir au moins 2 caractères."), // Not using `minLength` to make the field optional.
                    maxLength(32, "Ce champ doit contenir au maximum 32 caractères.")
                ])
            ),
            (value: string | undefined): string | undefined => (value === "" ? undefined : value)
        )
    })
);

export const wordRequestWithTokenSchema = merge([wordRequestSchema, withTokenSchema]);

export const cleanWordRequestWithToken = (value: WithToken<WordRequest>): WithToken<WordRequest> => (
    parse(wordRequestWithTokenSchema, value)
);

export const isWordRequestWithToken = (value: unknown): value is WithToken<WordRequest> => (
    is(wordRequestWithTokenSchema, value)
);
