import { type NextRequest, NextResponse } from "next/server";

import { Status } from "~/types/status";
import { getIpFromRequest } from "~/utils/api/ip";
import { RateLimiter } from "~/utils/api/middlewares/rate-limiter";

import { dislike } from "./dislike";
import { removeDislike } from "./remove-dislike";

const window: number = 1000 * 60 * 15;
const tokens: number = 100;
const rateLimiter = new RateLimiter(window, tokens);

interface Params {
    id: string;
}

interface Context {
    params: Params;
}

export const PUT = async (request: NextRequest, { params: { id } }: Context): Promise<NextResponse> => {
    const ip: string | undefined = getIpFromRequest(request);
    if (!ip) {
        return NextResponse.json(null, { status: Status.Unauthorized });
    }

    if (rateLimiter.consume(ip)) {
        return NextResponse.json(null, { status: Status.TooManyRequest });
    }

    const result: Status = await dislike(id, ip);

    return NextResponse.json(null, { status: result });
};

export const DELETE = async (request: NextRequest, { params: { id } }: Context): Promise<NextResponse> => {
    const ip: string | undefined = getIpFromRequest(request);
    if (!ip) {
        return NextResponse.json(null, { status: Status.Unauthorized });
    }

    if (rateLimiter.consume(ip)) {
        return NextResponse.json(null, { status: Status.TooManyRequest });
    }

    const result: Status = await removeDislike(id, ip);

    return NextResponse.json(null, { status: result });
};
