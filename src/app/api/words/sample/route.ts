import { NextRequest, NextResponse } from "next/server";

import { Definition } from "@models/definition";
import { getDefinitionsSample } from "@services/api/words/get-definitions-sample";

export const GET = async (request: NextRequest): Promise<NextResponse> => {
    const words: Array<Definition> = await getDefinitionsSample(request.ip);

    return NextResponse.json(words);
};
