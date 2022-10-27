import { Typography } from "@mui/material";
import { ReactElement } from "react";

import { removeAccents } from "@utils/misc/string";

interface Props {
    word: string;
    highlight: string;
}

export const Highlight = ({ word, highlight }: Props): ReactElement => {
    const massagedWord: string = removeAccents(word).toLocaleLowerCase();
    const massagedHighlight: string = removeAccents(highlight).toLocaleLowerCase();

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
