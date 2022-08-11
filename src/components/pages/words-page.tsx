import { Stack } from "@mui/material";
import { ReactElement, useEffect } from "react";
import useSWR from "swr";

import { Word as WordComponent } from "@components/misc/word";
import { Word } from "@models/word";
import { useBoolean } from "@utils/hooks/use-boolean";

export const WordsPage = (): ReactElement | null => {
    const { data } = useSWR<Array<Word>>("/api/words/sample");

    // `data` coming from `fallback`
    const words: Array<Word> = data as Array<Word>;

    const { value: isClientSide, setTrue } = useBoolean(false);

    useEffect((): void => {
        setTrue();
    }, [setTrue]);

    if (!isClientSide) {
        console.log("I'm on the server.");
        console.log(words);
        return null;
    }

    console.log("I'm on the client.");
    console.log(words);

    return (
        <Stack spacing={2}>
            {words.map((word: Word): ReactElement => (
                <WordComponent
                    key={word.timestamp}
                    word={word}
                />
            ))}
        </Stack>
    );
};
