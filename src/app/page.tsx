import { ReactElement } from "react";

import { getDefinitionsSample } from "@app/api/words/sample/get-definitions-sample";
import { Definition } from "@models/definition";

import { WordsPage } from "./_components";

export const revalidate: number = 86400; // Revalidate every day

const Page = async (): Promise<ReactElement> => {
    const words: Array<Definition> = await getDefinitionsSample();

    return (
        <WordsPage definitions={words} />
    );
};

export default Page;
