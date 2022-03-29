import * as yup from "yup";

import { removeAccents } from "@utils/misc/string";
import { isValid } from "@utils/misc/validation";

export interface WordRequest {
    label: string;
    definition: string;
    example: string;
    author?: string;
}

export const getSlug = (label: string): string => {
    const spacelessLabel: string = label.replaceAll(" ", "-");
    return removeAccents(spacelessLabel)
        .toLocaleLowerCase();
};

export const labelRegex: RegExp = /^[a-zàâäéèêëïîôöùûüÿç]*$/gi;

export const isValidLabel = (label: string): boolean => {
    return labelRegex.test(label);
};

export const wordRequestValidationSchema = yup
    .object({
        label: yup
            .string()
            .trim()
            .min(2, "Ce champ ne peut pas avoir moins de 2 caractères.")
            .max(32, "Ce champ ne peut pas dépasser 32 caractères.")
            .matches(labelRegex, "Ce champ ne peut seulement avoir des caractères alphabétiques accentués ou non.")
            .required("Ce champ est requis."),
        definition: yup
            .string()
            .trim()
            .min(2, "Ce champ ne peut pas avoir moins de 2 caractères.")
            .max(256, "Ce champ ne peut pas dépasser 256 caractères.")
            .required("Ce champ est requis."),
        example: yup
            .string()
            .trim()
            .min(2, "Ce champ ne peut pas avoir moins de 2 caractères.")
            .max(256, "Ce champ ne peut pas dépasser 256 caractères.")
            .required("Ce champ est requis."),
        author: yup
            .string()
            .trim()
            .min(2, "Ce champ ne peut pas avoir moins de 2 caractères.")
            .max(32, "Ce champ ne peut pas dépasser 32 caractères.")
            .optional()
    })
    .noUnknown();

export const isValidWordRequest = (value: unknown): value is WordRequest => (
    isValid(value, wordRequestValidationSchema)
);
