import { Share as ShareIcon } from "@mui/icons-material";
import { Button, Card, CardActions, CardContent, CardHeader, Link, Stack, Typography } from "@mui/material";
import NextLink from "next/link";
import { ReactElement, useMemo } from "react";

import { Definition as IDefinition } from "@models/definition";
import { getSlug } from "@models/word-request";
import { useFormattedDate } from "@utils/hooks/use-formatted-date";
import { useShare } from "@utils/hooks/use-share";

import { Reactions } from "./reactions";
import { WordClasses } from "./word-classes";

interface Props {
    definition: IDefinition;
}

export const Definition = ({ definition: word }: Props): ReactElement => {
    const date: Date = useMemo((): Date => (
        new Date(word.timestamp)
    ), [word.timestamp]);
    const formattedDate: string | undefined = useFormattedDate(date);
    const slug = getSlug(word.label);
    const share = useShare(`mots/${slug}`);

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
                            href={`/mots/${slug}`}
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
                    {formattedDate
                        ? `par ${word.author.name ?? "Anonyme"}, le ${formattedDate}`
                        : `par ${word.author.name ?? "Anonyme"}`}
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
                        startIcon={<ShareIcon />}
                        size="small"
                    >
                        Partager
                    </Button>
                </Stack>
            </CardActions>
        </Card>
    );
};
