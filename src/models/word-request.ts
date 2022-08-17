import * as yup from "yup";

import { removeAccents } from "@utils/misc/string";
import { cleanup, isValid } from "@utils/misc/validation";

import { WordClass, wordClasses } from "./classes";

export interface WordRequest {
    label: string;
    wordClasses: Array<WordClass>;
    definition: string;
    example: string;
    author?: string;
}

export const getSlug = (label: string): string => {
    const spacelessLabel: string = label.replace(/\s/g, "-");
    return removeAccents(spacelessLabel)
        .toLocaleLowerCase();
};

export const labelRegex: RegExp = /^[a-zàâäéèêëïîôöùûüÿç\s-]*$/gi;

export const isValidLabel = (label: string): boolean => {
    return labelRegex.test(label);
};

export const wordRequestValidationSchema = yup
    .object({
        label: yup
            .string()
            .trim()
            .min(2, "Ce champ doit contenir au moins ${min} caractères.")
            .max(32, "Ce champ doit contenir au maximum ${max} caractères.")
            .matches(labelRegex, "Ce champ peut contenir des lettres, des espaces ou des tirets.")
            .required("Ce champ est requis."),
        wordClasses: yup
            .array()
            .of(
                yup.string()
                    .oneOf(wordClasses, "Ce champ doit contenir une des valeurs proposées.")
            )
            .max(wordClasses.length, "Ce champ doit contenir au maximum ${max} options.")
            .required("Ce champ est requis."),
        definition: yup
            .string()
            .trim()
            .min(2, "Ce champ doit contenir au moins ${min} caractères.")
            .max(256, "Ce champ doit contenir au maximum ${max} caractères.")
            .required("Ce champ est requis."),
        example: yup
            .string()
            .trim()
            .min(2, "Ce champ doit contenir au moins ${min} caractères.")
            .max(256, "Ce champ doit contenir au maximum ${max} caractères.")
            .required("Ce champ est requis."),
        author: yup
            .string()
            .trim()
            .min(2, "Ce champ doit contenir au moins ${min} caractères.")
            .max(32, "Ce champ doit contenir au maximum ${max} caractères.")
            .optional()
            .transform((value: unknown): unknown | undefined => (
                value === "" ? undefined : value
            ))
    })
    .noUnknown()
    .required();

export const isValidWordRequest = (value: unknown): value is WordRequest => (
    isValid<WordRequest>(value, wordRequestValidationSchema)
);

export const cleanupWordRequest = (value: WordRequest): WordRequest => (
    cleanup(value, wordRequestValidationSchema)
);
