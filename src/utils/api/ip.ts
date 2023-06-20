import { NextRequest } from "next/server";
import { getClientIp } from "request-ip";

const massageRequest = (request: NextRequest): Parameters<typeof getClientIp>[0] => ({
    headers: {
        "x-client-ip": request.headers.get("x-client-ip") ?? undefined,
        "x-forwarded-for": request.headers.get("x-forwarded-for") ?? undefined,
        "x-real-ip": request.headers.get("x-real-ip") ?? undefined,
        "x-cluster-client-ip": request.headers.get("x-cluster-client-ip") ?? undefined,
        "x-forwarded": request.headers.get("x-forwarded") ?? undefined,
        "forwarded-for": request.headers.get("forwarded-for") ?? undefined,
        "forwarded": request.headers.get("forwarded") ?? undefined
    }
});

export const getRequestIp = (request: NextRequest): string | undefined => (
    getClientIp(massageRequest(request)) ?? undefined
);
