import { NextRequest } from "next/server";
import { getClientIp } from "request-ip";

const massageRequest = (headers: Headers): Parameters<typeof getClientIp>[0] => ({
    headers: {
        "x-client-ip": headers.get("x-client-ip") ?? undefined,
        "x-forwarded-for": headers.get("x-forwarded-for") ?? undefined,
        "x-real-ip": headers.get("x-real-ip") ?? undefined,
        "x-cluster-client-ip": headers.get("x-cluster-client-ip") ?? undefined,
        "x-forwarded": headers.get("x-forwarded") ?? undefined,
        "forwarded-for": headers.get("forwarded-for") ?? undefined,
        "forwarded": headers.get("forwarded") ?? undefined
    }
});

export const getIpFromHeaders = (headers: Headers): string | undefined => (
    getClientIp(massageRequest(headers)) ?? undefined
);

export const getIpFromRequest = (request: NextRequest): string | undefined => (
    request.ip ?? getIpFromHeaders(request.headers)
);
