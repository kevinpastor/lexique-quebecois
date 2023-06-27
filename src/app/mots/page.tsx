import { Metadata } from "next";
import { ReactElement } from "react";

import { getWordIndex } from "@app/api/words/get-word-index";

import { IndexPage } from "./_components";

export const metadata: Metadata = {
    title: "Index"
};

export const revalidate: number = 86400; // Revalidate every day

const Page = async (): Promise<ReactElement> => {
    const words: Array<string> = await getWordIndex();

    return (
        <IndexPage fallback={{ "/api/words": words }} />
    );
};

export default Page;
