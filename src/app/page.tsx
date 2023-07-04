import { headers } from "next/headers";
import { ReactElement } from "react";

import { getDefinitionsSample } from "@app/api/words/sample/get-definitions-sample";
import { Definition } from "@models/definition";
import { getIpFromHeaders } from "@utils/api/ip";

import { WordsPage } from "./_components";

export const revalidate: number = 0; // Revalidate every day

const Page = async (): Promise<ReactElement> => {
    const ip: string | undefined = getIpFromHeaders(headers());
    const words: Array<Definition> = await getDefinitionsSample(ip);

    return (
        <WordsPage definitions={words} />
    );
};

export default Page;
