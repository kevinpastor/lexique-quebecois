import { createError } from "./errors/http-error-factory";

export const fetcher = async <T>(url: string): Promise<T> => {
    const response: Response = await fetch(url);

    if (!response.ok) {
        throw createError(response.status);
    }

    return response.json();
};
