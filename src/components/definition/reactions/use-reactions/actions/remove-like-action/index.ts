"use server";

import { headers } from "next/headers";

import { Status } from "~/types/status";
import { getIpFromHeaders } from "~/utils/api/ip";

import { removeLike } from "./remove-like";
import { rateLimiter } from "../rate-limiter";

export const removeLikeAction = async (id: string): Promise<Status> => {
    const ip: string | undefined = getIpFromHeaders(headers());
    if (!ip) {
        return Status.Unauthorized;
    }

    if (rateLimiter.consume(ip)) {
        return Status.TooManyRequest;
    }

    const result: Status = await removeLike(id, ip);

    return result;
};
