import { Typography } from "@mui/material";
import { type ReactNode } from "react";

import { removeAccents } from "~/utils/misc/string";

const massageString = (value: string): string => (
    removeAccents(value).toLocaleLowerCase()
);

interface Props {
    word: string;
    highlight: string;
}

export const Highlight = ({ word, highlight }: Props): ReactNode => {
    const massagedWord: string = massageString(word);
    const massagedHighlight: string = massageString(highlight);

    if (!massagedWord.startsWith(massagedHighlight)) {
        return (
            <Typography>
                {word}
            </Typography>
        );
    }

    // Required in order to prevent the browser from collapsing the whitespace when the word is split on a space.
    const escapedWord: string = word.replace(" ", "\u00A0");

    return (
        <>
            <Typography
                component="span"
                variant="body2"
            >
                {escapedWord.slice(0, highlight.length)}
            </Typography>
            <Typography component="span">
                {escapedWord.slice(highlight.length)}
            </Typography>
        </>
    );
};
