import { Definition } from "@shared/models/definition";
import { State, useRequest } from "@hooks/useRequest";

export type DefinitionState = State<Definition>;

export const useDefinition = (id: string): DefinitionState => (
    useRequest<Definition>(`/api/definitions/${id}`)
);
