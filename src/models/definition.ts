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
