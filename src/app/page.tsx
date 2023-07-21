import { ReactElement } from "react";

import { Definition } from "~/types/definition";

import { WordsPage } from "./_components";
import { getDefinitionsSample } from "./_services/get-definitions-sample";

export const revalidate: number = 86400; // Revalidate every day.

const Page = async (): Promise<ReactElement> => {
    const words: Array<Definition> = await getDefinitionsSample();

    return (
        <WordsPage definitions={words} />
    );
};

export default Page;
