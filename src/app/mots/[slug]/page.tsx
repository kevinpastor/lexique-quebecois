import { type Metadata } from "next";
import { type ReactElement } from "react";

import { type Word } from "~/types/word";

import { WordPage } from "./_components";
import { getWordDefinitions } from "./_services/get-word-definitions";

interface Params {
    slug: string;
}

interface Props {
    params: Params;
}

export const generateMetadata = async ({ params }: Props): Promise<Metadata> => {
    const word: Word | null = await getWordDefinitions(params.slug);

    if (!word) {
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

const Page = async ({ params }: Props): Promise<ReactElement> => {
    const { slug } = params;
    const word: Word | null = await getWordDefinitions(slug);

    return (
        <WordPage word={word} />
    );
};

export default Page;
