import { Word } from "@quebecois-urbain/shared/models/word";
import { State, useRequest } from "@hooks/useRequest";

export type WordState = State<Word>;

export const useWord = (id: string): WordState => (
    useRequest<Word>(`/api/words/${id}`)
);
