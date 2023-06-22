import { HttpError } from "@services/http-error";

export const fetcher = async <T>(url: string): Promise<T> => {
    const response: Response = await fetch(url);

    if (!response.ok) {
        throw new HttpError(response.status);
    }

    return response.json();
};
