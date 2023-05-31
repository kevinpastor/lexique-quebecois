import { Card, CardActions, CardContent, CardHeader, Link, Stack, Typography } from "@mui/material";
import NextLink from "next/link";
import { ReactElement } from "react";

import { Definition as IDefinition, getSlug } from "@models/definition";
import { formatDate } from "@utils/misc/date";

import { Actions } from "./actions";
import { Reactions } from "./reactions";
import { WordClasses } from "./word-classes";
import { ShareButton } from "../share-button";

interface Props {
    definition: IDefinition;
}

export const Definition = ({ definition }: Props): ReactElement => {
    const date: Date = new Date(definition.timestamp);
    const formattedDate: string = formatDate(date);
    const slug = getSlug(definition.label);

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
                action={<Actions />}
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
                    {/* eslint-disable-next-line react/jsx-one-expression-per-line */}
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
                    <Reactions word={definition} />
                    <ShareButton url={`mots/${slug}`} />
                </Stack>
            </CardActions>
        </Card>
    );
};
