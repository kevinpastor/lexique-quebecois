import { Stack } from "@mui/material";
import { ReactElement } from "react";
import useSWR from "swr";

import { Word as WordComponent } from "@components/misc/word";
import { Definition } from "@models/definition";

export const WordsPage = (): ReactElement => {
    const { data } = useSWR<Array<Definition>>("/api/words/sample");

    // `data` coming from `fallback`
    const words: Array<Definition> = data as Array<Definition>;

    return (
        <Stack spacing={2}>
            {words.map((word: Definition): ReactElement => (
                <WordComponent
                    key={word.timestamp}
                    word={word}
                />
            ))}
        </Stack>
    );
};
