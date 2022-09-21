/* eslint-disable react/no-unused-prop-types */
import { Card, CardContent, CardHeader, Link, Typography } from "@mui/material";
import Head from "next/head";
import NextLink from "next/link";
import { ReactElement, useMemo } from "react";
import useSWR from "swr";

import { getSlug } from "@models/word-request";

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
    const memoizedLetterGroups = useMemo((): Array<LetterGroup> => (
        words.reduce((wordGroups: Array<LetterGroup>, word: string): Array<LetterGroup> => {
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
        }, [])
    ), [words]);

    return (
        <>
            <Head>
                <title>Index - Lexique Québécois</title>
            </Head>
            <Card>
                <CardHeader title="Index" />
                <CardContent>
                    {memoizedLetterGroups.map(({ letter, group }: LetterGroup): ReactElement => (
                        <div key={letter}>
                            <Typography variant="h3">
                                {letter}
                            </Typography>
                            {group.map(({ slug, word }: WordGroup, index: number): ReactElement => (
                                <div key={slug}>
                                    <NextLink
                                        href={`/mots/${slug}`}
                                        passHref
                                    >
                                        <Link gutterBottom={index === group.length - 1}>
                                            {word}
                                        </Link>
                                    </NextLink>
                                </div>
                            ))}
                        </div>
                    ))}
                </CardContent>
            </Card>
        </>
    );
};
