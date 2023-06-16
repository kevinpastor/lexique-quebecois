import { ReactElement } from "react";

import { Definition } from "@models/definition";
import { getDefinitionsSample } from "@services/api/words/get-definitions-sample";

import { WordsPage } from "./component";

export const revalidate: number = 86400; // Revalidate every day

const Page = async (): Promise<ReactElement> => {
    const words: Array<Definition> = await getDefinitionsSample();

    return (
        <WordsPage fallback={{ "/api/words/sample": words }} />
    );
};

export default Page;
