import { Metadata } from "next";
import { ReactElement } from "react";

import { getSlug } from "@models/definition";
import { Word } from "@models/word";
import { getWordDefinitions } from "@services/api/words/get-word-definitions";
import { getWordIndex } from "@services/api/words/get-word-index";

import { WordPage } from "./component";

interface Params {
    slug: string;
}

export const generateStaticParams = async (): Promise<Array<Params>> => {
    const labels: Array<string> = await getWordIndex();
    const slugs: Array<string> = labels.map((label: string): string => getSlug(label));
    const staticParams: Array<Params> = slugs.map((slug: string): Params => ({
        slug
    }));

    return staticParams;
};

export const revalidate: number = 86400; // Revalidate every day

export const generateMetadata = async ({ params }: { params: Params }): Promise<Metadata> => {
    const word: Word | null = await getWordDefinitions(params.slug);

    if (!word) {
        return {};
    }

    const title: string = `${word.definitions[0].label} - Lexique Québécois`;
    const description: string = `${word.definitions[0].label} - ${word.definitions[0].definition}`;

    return {
        title,
        description
    };
};

const Page = async ({ params }: { params: Params }): Promise<ReactElement> => {
    const { slug } = params;
    const word: Word | null = await getWordDefinitions(slug);

    return (
        <WordPage fallback={{ [`/api/words/${slug}`]: word }} />
    );
};

export default Page;
