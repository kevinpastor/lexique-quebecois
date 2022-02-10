import { Definition } from "@shared/models/definition";
import { State, useRequest } from "@hooks/useRequest";

export const useDefinition = (id: string): State<Definition> => (
    useRequest<Definition>(`/api/definitions/${id}`)
);
