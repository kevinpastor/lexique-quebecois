import { NextRequest, NextResponse } from "next/server";

import { Definition } from "@models/definition";
import { getDefinitionsSample } from "@services/api/words/get-definitions-sample";

export const GET = async (request: NextRequest): Promise<NextResponse> => {
    const ip: string = request.ip ?? "";

    const words: Array<Definition> = await getDefinitionsSample(ip);

    return NextResponse.json(words);
};
