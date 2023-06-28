import { Typography } from "@mui/material";
import { ReactElement } from "react";

import { removeAccents } from "@utils/misc/string";

const massageString = (value: string): string => (
    removeAccents(value).toLocaleLowerCase()
);

interface Props {
    word: string;
    highlight: string;
}

export const Highlight = ({ word, highlight }: Props): ReactElement => {
    const massagedWord: string = massageString(word);
    const massagedHighlight: string = massageString(highlight);

    if (!massagedWord.startsWith(massagedHighlight)) {
        return (
            <Typography>
                {word}
            </Typography>
        );
    }

    return (
        <>
            <Typography
                component="span"
                variant="body2"
            >
                {word.slice(0, highlight.length)}
            </Typography>
            <Typography component="span">
                {word.slice(highlight.length)}
            </Typography>
        </>
    );
};
