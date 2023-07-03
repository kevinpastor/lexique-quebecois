import { array, boolean, nativeEnum, number, object, string } from "zod";

import { removeAccents } from "@utils/misc/string";

import { WordClass } from "./word-class";

export interface Reactions {
    likes: number;
    isLiked: boolean;
    dislikes: number;
    isDisliked: boolean;
}

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
    reactions: Reactions;
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
    .strict();

const reactionsSchema = object({
    likes: number(),
    isLiked: boolean(),
    dislikes: number(),
    isDisliked: boolean()
})
    .strict();

export const definitionSchema = object({
    id: string(),
    label: string(),
    wordClasses: array(nativeEnum(WordClass)),
    definition: string(),
    example: string(),
    author: authorSchema,
    timestamp: number(),
    reactions: reactionsSchema
})
    .strict();
