/* eslint-disable react/no-unused-prop-types */
import { GetStaticPropsResult } from "next";
import { ReactElement, useMemo } from "react";

import { Card } from "@components/misc/card";
import { Heading } from "@components/typography/heading";
import { Hyperlink } from "@components/typography/hyperlink";
import { Section } from "@components/typography/section";
import { Title } from "@components/typography/title";
import { getSlug } from "@models/word-request";
import { getWordIndex } from "@services/api/words";

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

export const getStaticProps = async (): Promise<GetStaticPropsResult<Props>> => {
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
                                prefetch={false}
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
