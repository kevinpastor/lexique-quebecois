import { Share } from "@mui/icons-material";
import { Button, Card, CardActions, CardContent, CardHeader, Link, Stack, Typography } from "@mui/material";
import NextLink from "next/link";
import { ReactElement } from "react";

import { Word as IWord } from "@models/word";
import { useFormattedTimestamp } from "@utils/hooks/use-formatted-timestamp";
import { useShare } from "@utils/hooks/use-share";

import { Reactions } from "./reactions";
import { WordClasses } from "./word-classes";

interface Props {
    word: IWord;
}

export const Word = ({ word }: Props): ReactElement => {
    const formattedTimestamp = useFormattedTimestamp(word.timestamp);
    const share = useShare(`mots/${word.slug}`);

    return (
        <Card>
            <CardHeader
                title={
                    <Stack
                        direction="row"
                        spacing={1}
                        alignItems="baseline"
                    >
                        <NextLink
                            href={`/mots/${word.slug}`}
                            passHref
                        >
                            <Link variant="h2">
                                {word.label}
                            </Link>
                        </NextLink>
                        <WordClasses wordClasses={word.wordClasses} />
                    </Stack>
                }
            />
            <CardContent>
                <Typography
                    variant="body2"
                    gutterBottom
                >
                    {word.definition}
                </Typography>
                <Typography
                    variant="subtitle1"
                    gutterBottom
                >
                    {word.example}
                </Typography>
                <Typography variant="subtitle2">
                    {formattedTimestamp
                        ? `par ${word.author ?? "Anonyme"}, le ${formattedTimestamp}`
                        : `par ${word.author ?? "Anonyme"}`}
                </Typography>
            </CardContent>
            <CardActions>
                <Stack
                    direction="row"
                    justifyContent="space-between"
                    spacing={2}
                    width="100%"
                >
                    <Reactions word={word} />
                    <Button
                        onClick={share}
                        startIcon={<Share />}
                        size="small"
                    >
                        Partager
                    </Button>
                </Stack>
            </CardActions>
        </Card>
    );
};
