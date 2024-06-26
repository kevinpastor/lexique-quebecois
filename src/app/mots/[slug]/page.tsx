import { type Metadata } from "next";
import { type ReactElement } from "react";

import { type Word } from "~/types/word";

import { WordPage } from "./_components";
import { cachedGetWordDefinitions } from "./_services/get-word-definitions";

interface Params {
    slug: string;
}

interface Props {
    params: Params;
}

export const generateMetadata = async ({ params }: Props): Promise<Metadata> => {
    const word: Word | null = await cachedGetWordDefinitions(params.slug);

    if (!word || word.definitions.length === 0 || !word.definitions[0]) { // `definitions` should theoretically never be empty.
        return {};
    }

    const title: string = word.definitions[0].label;
    const description: string = `${word.definitions[0].label} - ${word.definitions[0].definition}`;

    return {
        title,
        description
    };
};

export const revalidate: number = 86400; // Revalidate every day.

const Page = async ({ params: { slug } }: Props): Promise<ReactElement> => {
    const word: Word | null = await cachedGetWordDefinitions(slug);

    return (
        <WordPage word={word} />
    );
};

export default Page;
