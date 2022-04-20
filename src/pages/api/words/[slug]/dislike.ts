import { NextApiRequest, NextApiResponse } from "next";
import { getClientIp } from "request-ip";

import { Method } from "@models/method";
import { Status } from "@models/status";
import { dislike, removeDislike } from "@services/api/reactions";
import {
    createHandler,
    Handler
} from "@utils/api/handler";
import { RateLimiter } from "@utils/api/middlewares/rate-limiter";

const window: number = 1000 * 60 * 15;
const tokens: number = 100;
const rateLimiter = new RateLimiter(window, tokens);

const handler: Handler = createHandler({
    [Method.PUT]: async (req: NextApiRequest, res: NextApiResponse): Promise<void> => {
        const ip: string | null = getClientIp(req);
        if (!ip) {
            res.status(Status.Unauthorized)
                .end();
            return;
        }

        if (rateLimiter.consume(ip)) {
            res.status(Status.TooManyRequest)
                .end();
            return;
        }

        if (!req.query.slug || Array.isArray(req.query.slug)) {
            res.status(Status.BadRequest)
                .end();
            return;
        }

        const slug: string = req.query.slug;

        let hasSucceeded: boolean = true;
        try {
            hasSucceeded = await dislike(slug, ip);
        }
        catch {
            res.status(Status.NotFound)
                .end();
            return;
        }

        if (!hasSucceeded) {
            res.status(Status.Conflict)
                .end();
            return;
        }

        res.status(Status.OK)
            .end();
    },
    [Method.DELETE]: async (req: NextApiRequest, res: NextApiResponse): Promise<void> => {
        const ip: string | null = getClientIp(req);
        if (!ip) {
            res.status(Status.Unauthorized)
                .end();
            return;
        }

        if (rateLimiter.consume(ip)) {
            res.status(Status.TooManyRequest)
                .end();
            return;
        }

        if (!req.query.slug || Array.isArray(req.query.slug)) {
            res.status(Status.BadRequest)
                .end();
            return;
        }

        const slug: string = req.query.slug;

        let hasSucceeded: boolean = true;
        try {
            hasSucceeded = await removeDislike(slug, ip);
        }
        catch {
            res.status(Status.NotFound)
                .end();
            return;
        }

        if (!hasSucceeded) {
            res.status(Status.Conflict)
                .end();
            return;
        }

        res.status(Status.OK)
            .end();
    }
});

export default handler;
