import { Tooltip, Typography } from "@mui/material";
import { Fragment, ReactElement } from "react";

import { WordClass, wordClassAbreviations } from "@models/word-class";

interface Props {
    wordClasses: Array<WordClass>;
}

export const WordClasses = ({ wordClasses }: Props): ReactElement => (
    <Typography
        variant="subtitle2"
        component="span"
    >
        {wordClasses.map((wordClass: WordClass, index: number): ReactElement => (
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
