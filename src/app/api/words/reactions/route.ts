import { type NextRequest, NextResponse } from "next/server";

import { type Reactions } from "~/types/definition";
import { Status } from "~/types/status";
import { getIpFromRequest } from "~/utils/api/ip";

import { getReactions } from "./get-reactions";

export const GET = async (request: NextRequest): Promise<NextResponse> => {
    const rawDefinitionIds: string | null = request.nextUrl.searchParams.get("definitionIds");
    if (rawDefinitionIds === null) {
        return NextResponse.json(undefined, { status: Status.BadRequest });
    }

    const definitionIds: Array<string> = rawDefinitionIds.split(",");

    const ip: string | undefined = getIpFromRequest(request);

    const reactions: Array<Reactions> = await getReactions(definitionIds, ip);

    return NextResponse.json(reactions);
};
