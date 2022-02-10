import { Definition } from "../../shared/models/definition";
import { State, useRequest } from "./useRequest";

export const useDefinition = (id: string): State<Definition> => {
    return useRequest<Definition>(`/api/definitions/${id}`);
};
