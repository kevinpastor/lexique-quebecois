import { NextRequest, NextResponse } from "next/server";

import { Definition } from "@models/definition";
import { getRequestIp } from "@utils/api/ip";

import { getDefinitionsSample } from "./get-definitions-sample";

export const GET = async (request: NextRequest): Promise<NextResponse> => {
    const ip: string | undefined = getRequestIp(request);

    const words: Array<Definition> = await getDefinitionsSample(ip);

    return NextResponse.json(words);
};
