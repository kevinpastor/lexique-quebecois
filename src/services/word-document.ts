import { Method } from "@models/method";
import { WordDocument } from "@models/word-document";
import { createError } from "@services/errors/http-error-factory";
import { WithStringId } from "@utils/types/with-string-id";

export const updateWordDocument = async (wordDocument: WithStringId<WordDocument>): Promise<void> => {
    const options: RequestInit = {
        method: Method.POST,
        headers: {
            "Content-Type": "application/json"
        },
        body: JSON.stringify(wordDocument)
    };
    const response: Response = await fetch(`/api/admin/${wordDocument._id}`, options);

    if (!response.ok) {
        throw createError(response.status);
    }
};
