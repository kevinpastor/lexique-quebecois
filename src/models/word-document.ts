export interface WordDocument {
    slug: string;
    label: string;
    definition: string;
    example: string;
    author: string;
    ip: string;
    isApproved?: boolean;
    likes?: Array<string>;
    dislikes?: Array<string>;
}
