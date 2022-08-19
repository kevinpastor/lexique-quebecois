import { WordClass } from "./classes";

export interface WordDocument {
    slug: string;
    label: string;
    wordClasses: Array<WordClass>;
    definition: string;
    example: string;
    author: string;
    ip: string;
    isApproved: boolean;
    likes: Array<string>;
    dislikes: Array<string>;
}
