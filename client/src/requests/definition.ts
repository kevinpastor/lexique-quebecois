import { Definition } from "@quebecois-urbain/shared/models/definition";

export const getDefinition = async (id: string): Promise<Definition | undefined> => {
    try {
        const response: Response = await fetch(`http://localhost:8080/api/definitions/${id}`);
        return await response.json();
    }
    catch {
        return;
    }
};
