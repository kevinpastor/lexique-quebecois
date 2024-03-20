"use server";

import { headers } from "next/headers";

import { Status } from "~/types/status";
import { getIpFromHeaders } from "~/utils/api/ip";

import { dislike } from "./dislike";
import { rateLimiter } from "../rate-limiter";

export const dislikeAction = async (id: string): Promise<Status> => {
    const ip: string | undefined = getIpFromHeaders(headers());
    if (!ip) {
        return Status.Unauthorized;
    }

    if (rateLimiter.consume(ip)) {
        return Status.TooManyRequest;
    }

    const result: Status = await dislike(id, ip);

    return result;
};
