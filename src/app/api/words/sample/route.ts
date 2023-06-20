import { NextRequest, NextResponse } from "next/server";

import { Definition } from "@models/definition";
import { getDefinitionsSample } from "@services/api/words/get-definitions-sample";
import { getRequestIp } from "@utils/api/ip";

export const GET = async (request: NextRequest): Promise<NextResponse> => {
    const ip: string | undefined = getRequestIp(request);

    const words: Array<Definition> = await getDefinitionsSample(ip);

    return NextResponse.json(words);
};
