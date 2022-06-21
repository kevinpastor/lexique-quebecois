export interface Word {
    id: string;
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
