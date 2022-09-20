import { Typography } from "@mui/material";
import { ReactElement } from "react";

import { WordClass, wordClassAbreviations } from "@models/classes";

interface Props {
    wordClasses: Array<WordClass>;
}

export const WordClasses = ({ wordClasses }: Props): ReactElement => (
    <Typography
        variant="subtitle2"
        component="span"
    >
        {wordClasses
            .map((wordClass: WordClass): string => (
                wordClassAbreviations[wordClass]
            ))
            .join(", ")}
    </Typography>
);
