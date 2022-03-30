/* eslint-disable react/no-unused-prop-types */
import { GetStaticPathsResult, GetStaticPropsContext, GetStaticPropsResult } from "next";
import { ReactElement, useMemo } from "react";

import { getWordIndex } from "@services/api/words";
import { Card } from "@components/misc/card";
import { getSlug } from "@models/word-request";
import { Title } from "@components/typography/title";
import { Hyperlink } from "@components/typography/hyperlink";
import { Heading } from "@components/typography/heading";
import { Section } from "@components/typography/section";

interface Props {
    words: Array<string>;
}

interface WordGroup {
    slug: string;
    word: string;
}

interface LetterGroup {
    letter: string;
    group: Array<WordGroup>;
}

export const getStaticPaths = (): GetStaticPathsResult => ({
    paths: [],
    fallback: "blocking"
});

export const getStaticProps = async ({ params }: GetStaticPropsContext): Promise<GetStaticPropsResult<Props>> => {
    if (params?.slug) {
        return {
            notFound: true
        };
    }

    const words: Array<string> = await getWordIndex();

    return {
        props: {
            words
        },
        revalidate: 60 * 60 * 24
    };
};

const Index = ({ words }: Props): ReactElement => {
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
                            >
                                {word}
                            </Hyperlink>
                        </div>
                    ))}
                </Section>
            ))}
        </Card>
    );
};

export default Index;
