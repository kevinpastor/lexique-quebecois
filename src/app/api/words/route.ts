import { NextRequest, NextResponse } from "next/server";

import { Status } from "~types/status";
import { isWordRequestWithToken } from "~types/word-request";
import { getIpFromRequest } from "~utils/api/ip";
import { RateLimiter } from "~utils/api/middlewares/rate-limiter";
import { verifyHCaptcha } from "~utils/misc/hcaptcha";

import { addWord } from "./add-word";
import { sendEmail } from "./send-email";

const window: number = 1000 * 60 * 15;
const tokens: number = 5;
const rateLimiter = new RateLimiter(window, tokens);

export const POST = async (request: NextRequest): Promise<NextResponse> => {
    const ip: string | undefined = getIpFromRequest(request);
    if (!ip) {
        return NextResponse.json(null, { status: Status.Unauthorized });
    }
    if (rateLimiter.consume(ip)) {
        return NextResponse.json(null, { status: Status.TooManyRequest });
    }

    if (request.body === null) {
        return NextResponse.json(null, { status: Status.BadRequest });
    }

    let body: unknown = undefined;
    try {
        body = await request.json();
    }
    catch {
        return NextResponse.json(null, { status: Status.BadRequest });
    }
    if (!isWordRequestWithToken(body)) {
        return NextResponse.json(null, { status: Status.BadRequest });
    }

    const { token, ...wordRequest } = body;
    const isValidCaptcha: boolean = await verifyHCaptcha(token);
    if (!isValidCaptcha) {
        return NextResponse.json(null, { status: Status.Unauthorized });
    }

    const result: Status = await addWord(wordRequest, ip);

    try {
        await sendEmail(wordRequest);
    }
    catch (error: unknown) {
        console.error(error);
    }

    return NextResponse.json(null, { status: result });
};
