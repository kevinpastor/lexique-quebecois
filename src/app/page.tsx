import { headers } from "next/headers";
import { ReactElement } from "react";

import { Definition } from "~types/definition";
import { getIpFromHeaders } from "~utils/api/ip";

import { WordsPage } from "./_components";
import { getDefinitionsSample } from "./_services/get-definitions-sample";

export const revalidate: number = 0; // Dynamically render

const Page = async (): Promise<ReactElement> => {
    const ip: string | undefined = getIpFromHeaders(headers());
    const words: Array<Definition> = await getDefinitionsSample(ip);

    return (
        <WordsPage definitions={words} />
    );
};

export default Page;
