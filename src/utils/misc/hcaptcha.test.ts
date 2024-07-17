import { beforeEach, describe, expect, it, vi } from "vitest";

import { verifyHCaptcha } from "./hcaptcha";

const TEST_SITE_KEY: string = "10000000-ffff-ffff-ffff-000000000001";
const TEST_SECRET_KEY: string = "0x0000000000000000000000000000000000000000";
const TEST_RESPONSE_TOKEN: string = "10000000-aaaa-bbbb-cccc-000000000001";

describe("verifyHCaptcha", (): void => {
    describe("when `NEXT_PUBLIC_HCAPTCHA_SITE_KEY` is undefined", (): void => {
        it("should throw", async (): Promise<void> => {
            vi.stubEnv("HCAPTHCA_SECRET", TEST_SECRET_KEY);

            const fetchMock = vi.fn().mockResolvedValue(Response.json({ foo: "invalid-property" }));
            vi.stubGlobal("fetch", fetchMock);

            await expect(async (): Promise<void> => {
                await verifyHCaptcha(TEST_RESPONSE_TOKEN);
            }).rejects.toThrow();
        });
    });

    describe("when `HCAPTHCA_SECRET` is undefined", (): void => {
        it("should throw", async (): Promise<void> => {
            vi.stubEnv("NEXT_PUBLIC_HCAPTCHA_SITE_KEY", TEST_SITE_KEY);

            const fetchMock = vi.fn().mockResolvedValue(Response.json({ foo: "invalid-property" }));
            vi.stubGlobal("fetch", fetchMock);

            await expect(async (): Promise<void> => {
                await verifyHCaptcha(TEST_RESPONSE_TOKEN);
            }).rejects.toThrow();
        });
    });

    describe("when environment variables are defined", (): void => {
        beforeEach((): void => {
            vi.stubEnv("NEXT_PUBLIC_HCAPTCHA_SITE_KEY", TEST_SITE_KEY);
            vi.stubEnv("HCAPTHCA_SECRET", TEST_SECRET_KEY);
        });

        describe("when the hCaptcha response is invalid", (): void => {
            it("should throw", async (): Promise<void> => {
                const fetchMock = vi.fn().mockResolvedValue(Response.json({ foo: "invalid-property" }));
                vi.stubGlobal("fetch", fetchMock);

                await expect(async (): Promise<void> => {
                    await verifyHCaptcha(TEST_RESPONSE_TOKEN);
                }).rejects.toThrow();
            });
        });

        it("should verify the token", async (): Promise<void> => {
            const fetchMock = vi.fn().mockResolvedValue(Response.json({ success: true }));
            vi.stubGlobal("fetch", fetchMock);

            const result: boolean = await verifyHCaptcha(TEST_RESPONSE_TOKEN);

            expect(result).toBe(true);
        });
    });
});
