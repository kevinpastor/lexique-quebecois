/* eslint-disable react/no-unused-prop-types */
import Head from "next/head";
import { ReactElement, useMemo } from "react";
import useSWR from "swr";

import { Card } from "@components/misc/card";
import { Heading } from "@components/typography/heading";
import { Hyperlink } from "@components/typography/hyperlink";
import { Section } from "@components/typography/section";
import { Title } from "@components/typography/title";
import { getSlug } from "@models/word-request";

interface WordGroup {
    slug: string;
    word: string;
}

interface LetterGroup {
    letter: string;
    group: Array<WordGroup>;
}

export const Index = (): ReactElement => {
    // TODO Rename route
    const { data } = useSWR<Array<string>>("/api/words/mots");

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
                {/* eslint-disable-next-line react/jsx-one-expression-per-line */}
                <title>Index - Lexique Québécois</title>
            </Head>
            <Card>
                <Title>
                    Index
                </Title>
                {memoizedLetterGroups.map(({ letter, group }: LetterGroup): ReactElement => (
                    <Section key={letter}>
                        <Heading>
                            {letter}
                        </Heading>
                        {group.map(({ slug, word }: WordGroup): ReactElement => (
                            <div key={slug}>
                                <Hyperlink
                                    href={`/mots/${slug}`}
                                    prefetch={false}
                                >
                                    {word}
                                </Hyperlink>
                            </div>
                        ))}
                    </Section>
                ))}
            </Card>
        </>
    );
};
