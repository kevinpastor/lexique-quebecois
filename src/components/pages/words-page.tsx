/* eslint-disable no-console */
import { Stack } from "@mui/material";
import { ReactElement } from "react";
import useSWR from "swr";

import { Word as WordComponent } from "@components/misc/word";
import { Word } from "@models/word";

export const WordsPage = (): ReactElement | null => {
    const { data } = useSWR<Array<Word>>("/api/words/sample");

    // `data` coming from `fallback`
    const words: Array<Word> = data as Array<Word>;

    return (
        <Stack spacing={2}>
            {[words[0], words[1], words[2]].map((word: Word): ReactElement => (
                <WordComponent
                    key={word.timestamp}
                    word={word}
                />
            ))}
        </Stack>
    );
};
