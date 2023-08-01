import { NextRequest, NextResponse } from "next/server";

import { Reactions } from "~/types/definition";
import { Status } from "~/types/status";
import { getIpFromRequest } from "~/utils/api/ip";

import { getReactions } from "./get-reactions";

export const GET = async (request: NextRequest): Promise<NextResponse> => {
    if (!request.nextUrl.searchParams.has("definitionIds")) {
        return NextResponse.json(undefined, { status: Status.BadRequest });
    }

    const rawDefinitionIds: string = request.nextUrl.searchParams.get("definitionIds") as string;
    const definitionIds: Array<string> = rawDefinitionIds.split(",");

    const ip: string | undefined = getIpFromRequest(request);

    const reactions: Array<Reactions> = await getReactions(definitionIds, ip);

    return NextResponse.json(reactions);
};
