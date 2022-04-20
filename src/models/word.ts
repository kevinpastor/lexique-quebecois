export interface Word {
    slug: string;
    label: string;
    definition: string;
    example: string;
    author?: string;
    timestamp: number;
    likes: number;
    isLiked: boolean;
    dislikes: number;
    isDisliked: boolean;
}
