import { Card, CardContent, CardHeader } from "@mui/material";
import { type ReactElement } from "react";

import { groupByFirstLetter } from "~/utils/misc/string";

import { LetterSection } from "./letter-section";

interface Props {
    words: Array<string>;
}

export const IndexPage = ({ words }: Props): ReactElement => {
    const wordGroups: Array<Array<string>> = groupByFirstLetter(words);

    return (
        <Card>
            <CardHeader title="Index" />
            <CardContent>
                {wordGroups.map((group: Array<string>): ReactElement => (
                    <LetterSection
                        key={group[0][0]}
                        group={group}
                    />
                ))}
            </CardContent>
        </Card>
    );
};
