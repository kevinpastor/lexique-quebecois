import { Card, CardActions, CardContent, CardHeader, Link, Stack, Typography } from "@mui/material";
import NextLink from "next/link";
import { type ReactNode } from "react";

import { ShareButton } from "~/components/share-button";
import { type Definition as IDefinition, getSlug } from "~/types/definition";
import { formatDate } from "~/utils/misc/date";

import { Reactions } from "./reactions";
import { WordClasses } from "./word-classes";

interface Props {
    definition: IDefinition;
}

export const Definition = ({ definition }: Props): ReactNode => {
    const date: Date = new Date(definition.timestamp);
    const formattedDate: string = formatDate(date);
    const slug = getSlug(definition.label);

    return (
        <Card>
            <CardHeader
                title={(
                    <Stack
                        // By default `Stack` renders a `div`, which is an invalid child for `CardHeader` default tag, which is `h2`.
                        component="span"
                        direction="row"
                        spacing={1}
                        alignItems="baseline"
                    >
                        <Link
                            component={NextLink}
                            href={`/mots/${slug}`}
                            variant="h2"
                        >
                            {definition.label}
                        </Link>
                        <WordClasses wordClasses={definition.wordClasses} />
                    </Stack>
                )}
            />
            <CardContent>
                <Typography
                    component="div"
                    variant="body2"
                    gutterBottom
                >
                    {definition.definition
                        .split("\n")
                        .map((paragraph: string, index: number): ReactNode => (
                            <Typography
                                // eslint-disable-next-line react/no-array-index-key
                                key={index}
                                variant="inherit"
                            >
                                {paragraph}
                            </Typography>
                        ))}
                </Typography>
                <Typography
                    component="div"
                    variant="subtitle1"
                    gutterBottom
                >
                    {definition.example
                        .split("\n")
                        .map((paragraph: string, index: number): ReactNode => (
                            <Typography
                                // eslint-disable-next-line react/no-array-index-key
                                key={index}
                                variant="inherit"
                            >
                                {paragraph}
                            </Typography>
                        ))}
                </Typography>
                <Typography variant="subtitle2">
                    {/* eslint-disable-next-line @stylistic/jsx-one-expression-per-line */}
                    par {definition.author.name ?? "Anonyme"}, le {formattedDate}
                </Typography>
            </CardContent>
            <CardActions>
                <Stack
                    direction="row"
                    justifyContent="space-between"
                    spacing={2}
                    width="100%"
                >
                    <Reactions definitionId={definition.id} />
                    <ShareButton url={`mots/${slug}`} />
                </Stack>
            </CardActions>
        </Card>
    );
};
