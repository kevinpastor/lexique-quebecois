/**
 * @vitest-environment jsdom
 */
import { describe, expect, it, vi } from "vitest";

import { isDesktop } from "./isDesktop";

describe("isDesktop", (): void => {
    describe("when the userAgent is a desktop device", (): void => {
        it("should return true", (): void => {
            const navigatorMock = {
                userAgent: "Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/92.0.4515.131 Safari/537.36"
            };
            vi.stubGlobal("navigator", navigatorMock);

            expect(isDesktop()).toBe(true);
        });
    });

    describe("when the userAgent is not a desktop device", (): void => {
        it("should return false", (): void => {
            const navigatorMock = {
                userAgent: "Mozilla/5.0 (iPhone; CPU iPhone OS 14_7_1 like Mac OS X) AppleWebKit/605.1.15 (KHTML, like Gecko) Version/14.1.2 Mobile/15E148 Safari/604.1"
            };
            vi.stubGlobal("navigator", navigatorMock);

            expect(isDesktop()).toBe(false);
        });
    });
});
