import { Method } from "~types/method";
import { HttpError } from "@utils/http-error";

export const like = async (id: string): Promise<void> => {
    const options: RequestInit = {
        method: Method.PUT
    };
    const response: Response = await fetch(`/api/words/${id}/like`, options);

    if (!response.ok) {
        throw new HttpError(response.status);
    }
};

export const removeLike = async (id: string): Promise<void> => {
    const options: RequestInit = {
        method: Method.DELETE
    };
    const response: Response = await fetch(`/api/words/${id}/like`, options);

    if (!response.ok) {
        throw new HttpError(response.status);
    }
};

export const dislike = async (id: string): Promise<void> => {
    const options: RequestInit = {
        method: Method.PUT
    };
    const response: Response = await fetch(`/api/words/${id}/dislike`, options);

    if (!response.ok) {
        throw new HttpError(response.status);
    }
};

export const removeDislike = async (id: string): Promise<void> => {
    const options: RequestInit = {
        method: Method.DELETE
    };
    const response: Response = await fetch(`/api/words/${id}/dislike`, options);

    if (!response.ok) {
        throw new HttpError(response.status);
    }
};
