import { NextRequest, NextResponse } from "next/server";

import { Status } from "@models/status";
import { getRequestIp } from "@utils/api/ip";
import { RateLimiter } from "@utils/api/middlewares/rate-limiter";

import { like } from "./like";
import { removeLike } from "./remove-like";

const window: number = 1000 * 60 * 15;
const tokens: number = 100;
const rateLimiter = new RateLimiter(window, tokens);

interface Params {
    id: string;
}

export const PUT = async (request: NextRequest, { params: { id } }: { params: Params }): Promise<NextResponse> => {
    const ip: string | undefined = getRequestIp(request);
    if (!ip) {
        return NextResponse.json(null, { status: Status.Unauthorized });
    }

    if (rateLimiter.consume(ip)) {
        return NextResponse.json(null, { status: Status.TooManyRequest });
    }

    const result: Status = await like(id, ip);

    return NextResponse.json(null, { status: result });
};

export const DELETE = async (request: NextRequest, { params: { id } }: { params: Params }): Promise<NextResponse> => {
    const ip: string | undefined = getRequestIp(request);
    if (!ip) {
        return NextResponse.json(null, { status: Status.Unauthorized });
    }

    if (rateLimiter.consume(ip)) {
        return NextResponse.json(null, { status: Status.TooManyRequest });
    }

    const result: Status = await removeLike(id, ip);

    return NextResponse.json(null, { status: result });
};
