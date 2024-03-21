import { type Metadata } from "next";
import { type ReactElement } from "react";

import { IndexPage } from "./_components";
import { cachedGetWordIndex } from "./_services/get-word-index";

export const metadata: Metadata = {
    title: "Index"
};

export const revalidate: number = 86400; // Revalidate every day.

const Page = async (): Promise<ReactElement> => {
    const words: Array<string> = await cachedGetWordIndex();

    return (
        <IndexPage words={words} />
    );
};

export default Page;
