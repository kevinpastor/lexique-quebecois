import { ReactElement } from "react";

import { IndexPage } from "@components/pages/index-page";
import { getWordIndex } from "@services/api/words/get-word-index";

export const revalidate: number = 86400; // Revalidate every day

const Page = async (): Promise<ReactElement> => {
    const words: Array<string> = await getWordIndex();

    return (
        <IndexPage fallback={{ "/api/words": words }} />
    );
};

export default Page;
