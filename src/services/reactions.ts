import { Method } from "@models/method";

import { createError } from "./errors/http-error-factory";

export const like = async (id: string): Promise<void> => {
    const options: RequestInit = {
        method: Method.PUT
    };
    const response: Response = await fetch(`/api/words/${id}/like`, options);

    if (!response.ok) {
        throw createError(response.status);
    }
};

export const removeLike = async (id: string): Promise<void> => {
    const options: RequestInit = {
        method: Method.DELETE
    };
    const response: Response = await fetch(`/api/words/${id}/like`, options);

    if (!response.ok) {
        throw createError(response.status);
    }
};

export const dislike = async (id: string): Promise<void> => {
    const options: RequestInit = {
        method: Method.PUT
    };
    const response: Response = await fetch(`/api/words/${id}/dislike`, options);

    if (!response.ok) {
        throw createError(response.status);
    }
};

export const removeDislike = async (id: string): Promise<void> => {
    const options: RequestInit = {
        method: Method.DELETE
    };
    const response: Response = await fetch(`/api/words/${id}/dislike`, options);

    if (!response.ok) {
        throw createError(response.status);
    }
};
