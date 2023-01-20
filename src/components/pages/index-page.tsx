/* eslint-disable react/no-unused-prop-types */
import { Card, CardContent, CardHeader, Link, Typography, Unstable_Grid2 as Grid } from "@mui/material";
import Head from "next/head";
import NextLink from "next/link";
import { ReactElement } from "react";
import useSWR from "swr";

import { getSlug } from "@models/definition";

interface WordGroup {
    slug: string;
    word: string;
}

interface LetterGroup {
    letter: string;
    group: Array<WordGroup>;
}

export const IndexPage = (): ReactElement => {
    // TODO Rename route
    const { data } = useSWR<Array<string>>("/api/words", { revalidateOnMount: false });

    // `data` coming from `fallback`
    const words: Array<string> = data as Array<string>;
    const letterGroups = words.reduce((wordGroups: Array<LetterGroup>, word: string): Array<LetterGroup> => {
        const slug: string = getSlug(word);
        const letter: string = slug[0];

        if (wordGroups.length === 0 || wordGroups[wordGroups.length - 1].letter !== letter) {
            wordGroups.push({
                letter,
                group: []
            });
        }

        wordGroups[wordGroups.length - 1].group.push({
            slug,
            word
        });

        return wordGroups;
    }, []);

    return (
        <>
            <Head>
                <title>Index - Lexique Québécois</title>
            </Head>
            <Card>
                <CardHeader title="Index" />
                <CardContent>
                    {letterGroups.map(({ letter, group }: LetterGroup): ReactElement => (
                        // Using div instead of Fragment for better HTML markup.
                        <div key={letter}>
                            <Typography variant="h3">
                                {letter}
                            </Typography>
                            <Grid
                                container
                                spacing={2}
                                paddingX={0}
                            >
                                {group.map(({ slug, word }: WordGroup, index: number): ReactElement => (
                                    <Grid
                                        key={slug}
                                        xs={12}
                                        sm={6}
                                        md={4}
                                        paddingY={0.5}
                                    >
                                        <NextLink
                                            href={`/mots/${slug}`}
                                            passHref
                                            legacyBehavior
                                        >
                                            <Link gutterBottom={index === group.length - 1}>
                                                {word}
                                            </Link>
                                        </NextLink>
                                    </Grid>
                                ))}
                            </Grid>
                        </div>
                    ))}
                </CardContent>
            </Card>
        </>
    );
};
