import { ReactElement } from "react";
import useSWR from "swr";

import { Word } from "@components/misc/word";
import { Word as IWord } from "@models/word";

export const Words = (): ReactElement => {
    const { data } = useSWR<Array<IWord>>("/api/words");

    // TODO Remove cast and handle undefined
    const words: Array<IWord> = data as Array<IWord>;

    return (
        <div className="space-y-4">
            {words.map((word: IWord): ReactElement => (
                <Word
                    key={word.timestamp}
                    word={word}
                />
            ))}
        </div>
    );
};
