import { ReactElement } from "react";

import { WordsPage } from "@components/pages/words-page";
import { Definition } from "@models/definition";
import { getDefinitionsSample } from "@services/api/words/get-definitions-sample";

export const revalidate: number = 86400; // Every day

const Page = async (): Promise<ReactElement> => {
    const words: Array<Definition> = await getDefinitionsSample();

    return (
        <WordsPage fallback={{ "/api/words/sample": words }} />
    );
};

export default Page;
