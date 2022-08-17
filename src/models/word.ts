import { WordClass } from "./classes";

export interface Word {
    id: string;
    slug: string;
    label: string;
    wordClasses: Array<WordClass>;
    definition: string;
    example: string;
    author?: string;
    timestamp: number;
    likes: number;
    isLiked: boolean;
    dislikes: number;
    isDisliked: boolean;
}
