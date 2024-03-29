import { Unstable_Grid2 as Grid, Typography } from "@mui/material";
import { type ReactNode } from "react";

import { WordLink } from "./word-link";

interface Props {
    group: Array<string>;
}

export const LetterSection = ({ group }: Props): ReactNode => {
    const firstWord: string = group[0] ?? "";
    const firstLetter: string = firstWord[0] ?? "";

    return (
        // Using div instead of Fragment for better HTML markup.
        <div>
            <Typography variant="h3">
                {firstLetter}
            </Typography>
            <Grid
                container
                spacing={2}
                paddingX={0}
            >
                {group.map((word: string, index: number): ReactNode => (
                    <WordLink
                        key={word}
                        word={word}
                        isLast={index === group.length - 1}
                    />
                ))}
            </Grid>
        </div>
    );
};
