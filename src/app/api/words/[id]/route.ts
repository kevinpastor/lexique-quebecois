import { NextRequest, NextResponse } from "next/server";

import { Word } from "@models/word";
import { getWordDefinitions } from "@services/api/words/get-word-definitions";

interface Params {
    id: string;
}

export const GET = async (request: NextRequest, { params }: { params: Params }): Promise<NextResponse> => {
    const ip: string | undefined = request.ip;

    // ID is used here as the spelling to get the word collection
    const spelling: string = params.id;
    const word: Word | null = await getWordDefinitions(spelling, ip);

    return NextResponse.json(word);
};
