import { type ReactElement } from "react";

import { type Definition } from "~/types/definition";

import { WordsPage } from "./_components";
import { cachedGetDefinitionsSample } from "./_services/get-definitions-sample";

export const revalidate: number = 86400; // Revalidate every day.

const Page = async (): Promise<ReactElement> => {
    console.debug("Rendering /.");

    const words: Array<Definition> = await cachedGetDefinitionsSample();

    return (
        <WordsPage definitions={words} />
    );
};

export default Page;
