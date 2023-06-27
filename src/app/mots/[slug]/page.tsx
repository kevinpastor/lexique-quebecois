import { Metadata } from "next";
import { ReactElement } from "react";

import { getWordDefinitions } from "@app/api/words/[id]/get-word-definitions";
import { getWordIndex } from "@app/api/words/get-word-index";
import { getSlug } from "@models/definition";
import { Word } from "@models/word";

import { WordPage } from "./_components";

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

export const generateMetadata = async ({ params }: { params: Params }): Promise<Metadata> => {
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

export const revalidate: number = 86400; // Revalidate every day

const Page = async ({ params }: { params: Params }): Promise<ReactElement> => {
    const { slug } = params;
    const word: Word | null = await getWordDefinitions(slug);

    return (
        <WordPage fallback={{ [`/api/words/${slug}`]: word }} />
    );
};

export default Page;
