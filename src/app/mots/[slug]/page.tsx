import { Metadata } from "next";
import { headers } from "next/headers";
import { ReactElement } from "react";

import { Word } from "~/types/word";
import { getIpFromHeaders } from "~/utils/api/ip";

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

export const revalidate: number = 0; // Dynamically render

const Page = async ({ params }: Props): Promise<ReactElement> => {
    const { slug } = params;
    const ip: string | undefined = getIpFromHeaders(headers());
    const word: Word | null = await getWordDefinitions(slug, ip);

    return (
        <WordPage word={word} />
    );
};

export default Page;
