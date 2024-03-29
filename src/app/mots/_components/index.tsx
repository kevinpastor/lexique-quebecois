import { Card, CardContent, CardHeader } from "@mui/material";
import { type ReactNode } from "react";

import { groupByFirstLetter } from "~/utils/misc/string";

import { LetterSection } from "./letter-section";

interface Props {
    words: Array<string>;
}

export const IndexPage = ({ words }: Props): ReactNode => {
    const wordGroups: Array<Array<string>> = groupByFirstLetter(words);

    return (
        <Card>
            <CardHeader title="Index" />
            <CardContent>
                {wordGroups.map((group: Array<string>): ReactNode => (
                    <LetterSection
                        key={group[0] !== undefined ? group[0][0] : undefined}
                        group={group}
                    />
                ))}
            </CardContent>
        </Card>
    );
};
