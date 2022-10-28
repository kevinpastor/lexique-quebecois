import { Share as ShareIcon } from "@mui/icons-material";
import { Button, Card, CardActions, CardContent, CardHeader, Link, Stack, Typography } from "@mui/material";
import NextLink from "next/link";
import { ReactElement, useMemo } from "react";

import { Definition as IDefinition, getSlug } from "@models/definition";
import { useFormattedDate } from "@utils/hooks/use-formatted-date";
import { useShare } from "@utils/hooks/use-share";

import { Reactions } from "./reactions";
import { WordClasses } from "./word-classes";

interface Props {
    definition: IDefinition;
}

export const Definition = ({ definition }: Props): ReactElement => {
    const date: Date = useMemo((): Date => (
        new Date(definition.timestamp)
    ), [definition.timestamp]);
    const formattedDate: string | undefined = useFormattedDate(date);
    const slug = getSlug(definition.label);
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
                            legacyBehavior
                        >
                            <Link variant="h2">
                                {definition.label}
                            </Link>
                        </NextLink>
                        <WordClasses wordClasses={definition.wordClasses} />
                    </Stack>
                }
            />
            <CardContent>
                <Typography
                    variant="body2"
                    gutterBottom
                >
                    {definition.definition}
                </Typography>
                <Typography
                    variant="subtitle1"
                    gutterBottom
                >
                    {definition.example}
                </Typography>
                <Typography variant="subtitle2">
                    {formattedDate
                        ? `par ${definition.author.name ?? "Anonyme"}, le ${formattedDate}`
                        : `par ${definition.author.name ?? "Anonyme"}`}
                </Typography>
            </CardContent>
            <CardActions>
                <Stack
                    direction="row"
                    justifyContent="space-between"
                    spacing={2}
                    width="100%"
                >
                    <Reactions word={definition} />
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
