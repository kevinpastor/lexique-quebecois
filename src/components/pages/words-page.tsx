import { ReactElement } from "react";
import useSWR from "swr";

import { Word as WordComponent } from "@components/misc/word";
import { Word } from "@models/word";

export const WordsPage = (): ReactElement => {
    const { data } = useSWR<Array<Word>>("/api/words/sample");

    // `data` coming from `fallback`
    const words: Array<Word> = data as Array<Word>;

    return (
        <div className="space-y-4">
            {words.map((word: Word): ReactElement => (
                <WordComponent
                    key={word.timestamp}
                    word={word}
                />
            ))}
        </div>
    );
};
