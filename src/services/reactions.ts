import { Method } from "@models/method";

import { createError } from "./errors/http-error-factory";

export const like = async (slug: string): Promise<void> => {
    const options: RequestInit = {
        method: Method.PUT
    };
    const response: Response = await fetch(`/api/words/${slug}/like`, options);

    if (!response.ok) {
        throw createError(response.status);
    }
};

export const removeLike = async (slug: string): Promise<void> => {
    const options: RequestInit = {
        method: Method.DELETE
    };
    const response: Response = await fetch(`/api/words/${slug}/like`, options);

    if (!response.ok) {
        throw createError(response.status);
    }
};

export const dislike = async (slug: string): Promise<void> => {
    const options: RequestInit = {
        method: Method.PUT
    };
    const response: Response = await fetch(`/api/words/${slug}/dislike`, options);

    if (!response.ok) {
        throw createError(response.status);
    }
};

export const removeDislike = async (slug: string): Promise<void> => {
    const options: RequestInit = {
        method: Method.DELETE
    };
    const response: Response = await fetch(`/api/words/${slug}/dislike`, options);

    if (!response.ok) {
        throw createError(response.status);
    }
};
