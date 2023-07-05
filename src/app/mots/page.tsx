import { Metadata } from "next";
import { ReactElement } from "react";

import { IndexPage } from "./_components";
import { getWordIndex } from "./_services/get-word-index";

export const metadata: Metadata = {
    title: "Index"
};

export const revalidate: number = 0; // Dynamically render

const Page = async (): Promise<ReactElement> => {
    const words: Array<string> = await getWordIndex();

    return (
        <IndexPage words={words} />
    );
};

export default Page;
