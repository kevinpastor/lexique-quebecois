import { removeAccents } from "~utils/misc/string";

import { WordClass } from "./word-class";

interface Author {
    name?: string;
}

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
    author: Author;
    timestamp: number;
    reactions: Reactions;
}

export const getSlug = (label: string): string => {
    const spacelessLabel: string = label.replace(/\s/g, "-");
    return removeAccents(spacelessLabel)
        .toLocaleLowerCase();
};
