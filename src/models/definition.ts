import { object, string, array, number, boolean } from "yup";

import { removeAccents } from "@utils/misc/string";

import { WordClass, wordClasses } from "./classes";

export interface Definition {
    id: string;
    label: string;
    wordClasses: Array<WordClass>;
    definition: string;
    example: string;
    author: {
        name?: string;
    };
    timestamp: number;
    reactions: {
        likes: number;
        isLiked: boolean;
        dislikes: number;
        isDisliked: boolean;
    };
}

export const getSlug = (label: string): string => {
    const spacelessLabel: string = label.replace(/\s/g, "-");
    return removeAccents(spacelessLabel)
        .toLocaleLowerCase();
};

const authorSchema = object({
    name: string()
        .optional()
})
    .noUnknown();

const reactionsSchema = object({
    likes: number()
        .required(),
    isLiked: boolean()
        .required(),
    dislikes: number()
        .required(),
    isDisliked: boolean()
        .required()
})
    .noUnknown();

export const definitionSchema = object({
    id: string()
        .required(),
    label: string()
        .required(),
    wordClasses: array()
        .of(
            string()
                .oneOf(wordClasses)
        )
        .required(),
    definition: string()
        .required(),
    example: string()
        .required(),
    author: authorSchema.required(),
    timestamp: number()
        .required(),
    reactions: reactionsSchema.required()
})
    .noUnknown()
    .required();
