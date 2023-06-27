import { ReactElement } from "react";

import { Definition } from "@models/definition";
import { getDefinitionsSample } from "src/app/api/words/sample/get-definitions-sample";

import { WordsPage } from "./_components";

export const revalidate: number = 86400; // Revalidate every day

const Page = async (): Promise<ReactElement> => {
    const words: Array<Definition> = await getDefinitionsSample();

    return (
        <WordsPage fallback={{ "/api/words/sample": words }} />
    );
};

export default Page;
