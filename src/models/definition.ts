import { z } from "zod";

import { removeAccents } from "@utils/misc/string";

import { WordClass } from "./classes";

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

const authorSchema = z
    .object({
        name: z.string()
            .optional()
    })
    .strict();

const reactionsSchema = z
    .object({
        likes: z.number(),
        isLiked: z.boolean(),
        dislikes: z.number(),
        isDisliked: z.boolean()
    })
    .strict();

export const definitionSchema = z
    .object({
        id: z.string(),
        label: z.string(),
        wordClasses: z.array(z.nativeEnum(WordClass)),
        definition: z.string(),
        example: z.string(),
        author: authorSchema,
        timestamp: z.number(),
        reactions: reactionsSchema
    })
    .strict();
