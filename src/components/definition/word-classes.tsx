import { Tooltip, Typography } from "@mui/material";
import { Fragment, type ReactNode } from "react";

import { type WordClass, wordClassAbreviations } from "~/types/word-class";

interface Props {
    wordClasses: Array<WordClass>;
}

export const WordClasses = ({ wordClasses }: Props): ReactNode => (
    <Typography
        variant="subtitle2"
        component="span"
    >
        {wordClasses.map((wordClass: WordClass, index: number): ReactNode => (
            <Fragment key={wordClass}>
                <Tooltip
                    title={wordClass}
                    arrow
                >
                    <span style={{ cursor: "help" }}>
                        {wordClassAbreviations[wordClass]}
                    </span>
                </Tooltip>
                {index < wordClasses.length - 1 && ", "}
            </Fragment>
        ))}
    </Typography>
);
