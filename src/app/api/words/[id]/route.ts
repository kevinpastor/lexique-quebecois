import { NextRequest, NextResponse } from "next/server";

import { Word } from "@models/word";
import { getRequestIp } from "@utils/api/ip";

import { getWordDefinitions } from "./get-word-definitions";

interface Params {
    id: string;
}

// ID is used here as the spelling to get the word collection
export const GET = async (request: NextRequest, { params: { id: spelling } }: { params: Params }): Promise<NextResponse> => {
    const ip: string | undefined = getRequestIp(request);

    const word: Word | null = await getWordDefinitions(spelling, ip);

    return NextResponse.json(word);
};
