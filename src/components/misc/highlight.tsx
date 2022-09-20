import { Typography } from "@mui/material";
import { ReactElement } from "react";

interface Props {
    word: string;
    highlight: string;
}

export const Highlight = ({ word, highlight }: Props): ReactElement => {
    const parts: Array<string> = word.split(new RegExp(`(${highlight})`, "gi"));

    return (
        <>
            {parts.map((part: string, index: number): ReactElement => (
                <Typography
                    // eslint-disable-next-line react/no-array-index-key
                    key={index}
                    component="span"
                    variant={
                        part.toLocaleLowerCase() === highlight.toLocaleLowerCase()
                            ? "body2"
                            : "body1"
                    }
                >
                    {part}
                </Typography>
            ))}
        </>
    );
};
