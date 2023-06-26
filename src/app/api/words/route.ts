import { NextRequest, NextResponse } from "next/server";

import { Status } from "@models/status";
import { isValidWordRequest } from "@models/word-request";
import { getRequestIp } from "@utils/api/ip";
import { RateLimiter } from "@utils/api/middlewares/rate-limiter";
import { verifyHCaptcha } from "@utils/misc/hcaptcha";

import { addWord } from "./add-word";
import { getWordIndex } from "./get-word-index";

const window: number = 1000 * 60 * 15;
const tokens: number = 5;
const rateLimiter = new RateLimiter(window, tokens);

export const GET = async (): Promise<NextResponse> => {
    const words: Array<string> = await getWordIndex();

    return NextResponse.json(words);
};

export const POST = async (request: NextRequest): Promise<NextResponse> => {
    const ip: string | undefined = getRequestIp(request);
    if (!ip) {
        return NextResponse.json(null, { status: Status.Unauthorized });
    }
    if (rateLimiter.consume(ip)) {
        return NextResponse.json(null, { status: Status.TooManyRequest });
    }

    if (request.body === null) {
        return NextResponse.json(null, { status: Status.BadRequest });
    }
    const body = await request.json();

    if (!body.captchaToken) {
        return NextResponse.json(null, { status: Status.Unauthorized });
    }
    if (typeof body.captchaToken !== "string") {
        return NextResponse.json(null, { status: Status.BadRequest });
    }

    const captchaToken: string = body.captchaToken;
    const isValidCaptcha: boolean = await verifyHCaptcha(captchaToken);
    if (!isValidCaptcha) {
        return NextResponse.json(null, { status: Status.Unauthorized });
    }

    const { captchaToken: _, ...wordRequest } = body;
    if (!isValidWordRequest(wordRequest)) {
        return NextResponse.json(null, { status: Status.BadRequest });
    }

    const result: Status = await addWord(wordRequest, ip);

    return NextResponse.json(null, { status: result });
};
