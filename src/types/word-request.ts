import { array, is, maxLength, minLength, notLength, optional, parse, pipe, regex, strictObject, string, transform, trim, enum as valibotEnum } from "valibot";

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

const wordRequestSchema = strictObject({
    label: pipe(
        string(),
        trim(),
        minLength(1, "Ce champ est requis."),
        minLength(2, "Ce champ doit contenir au moins 2 caractères."),
        maxLength(32, "Ce champ doit contenir au maximum 32 caractères."),
        regex(labelRegex, "Ce champ ne peut contenir que des lettres, des espaces ou des tirets.")
    ),
    wordClasses: pipe(
        array(valibotEnum(WordClass, "Ce champ doit contenir une des valeurs proposées.")),
        maxLength(wordClasses.length, `Ce champ doit contenir au maximum ${wordClasses.length} options.`)
    ),
    definition: pipe(
        string(),
        trim(),
        minLength(1, "Ce champ est requis."),
        minLength(2, "Ce champ doit contenir au moins 2 caractères."),
        maxLength(256, "Ce champ doit contenir au maximum 256 caractères.")
    ),
    example: pipe(
        string(),
        trim(),
        minLength(1, "Ce champ est requis."),
        minLength(2, "Ce champ doit contenir au moins 2 caractères."),
        maxLength(256, "Ce champ doit contenir au maximum 256 caractères.")
    ),
    author: pipe(
        optional(
            pipe(
                string(),
                trim(),
                notLength(1, "Ce champ optionel doit contenir au moins 2 caractères."), // Not using `minLength` to make the field optional.
                maxLength(32, "Ce champ doit contenir au maximum 32 caractères.")
            )
        ),
        transform((value: string | undefined): string | undefined => (value === "" ? undefined : value))
    )
});

export const wordRequestWithTokenSchema = strictObject({
    ...wordRequestSchema.entries,
    ...withTokenSchema.entries
});

export const cleanWordRequestWithToken = (value: WithToken<WordRequest>): WithToken<WordRequest> => (
    parse(wordRequestWithTokenSchema, value)
);

export const isWordRequestWithToken = (value: unknown): value is WithToken<WordRequest> => (
    is(wordRequestWithTokenSchema, value)
);
