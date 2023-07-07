import { HttpError } from "~/utils/http-error";

export const fetcher = async (url: string): Promise<unknown> => {
    const response: Response = await fetch(url);

    if (!response.ok) {
        throw new HttpError(response.status);
    }

    return response.json();
};
