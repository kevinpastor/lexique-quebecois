/**
 * @vitest-environment jsdom
 */
import { describe, expect, it, vi } from "vitest";

import { isIOS } from "./isIOS";

describe("isIOS", (): void => {
    describe("when the userAgent is an iOS device", (): void => {
        it("should return true", (): void => {
            const navigatorMock = {
                userAgent: "Mozilla/5.0 (iPhone; CPU iPhone OS 14_7_1 like Mac OS X) AppleWebKit/605.1.15 (KHTML, like Gecko) Version/14.1.2 Mobile/15E148 Safari/604.1"
            };
            vi.stubGlobal("navigator", navigatorMock);

            expect(isIOS()).toBe(true);
        });
    });

    describe("when the userAgent is not an iOS device", (): void => {
        it("should return false", (): void => {
            const navigatorMock = {
                userAgent: "Mozilla/5.0 (Linux; Android 11; SM-G991B) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/92.0.4515.131 Mobile Safari/537.36"
            };
            vi.stubGlobal("navigator", navigatorMock);

            expect(isIOS()).toBe(false);
        });
    });
});
