/**
 * @vitest-environment jsdom
 */
import { describe, expect, it, vi } from "vitest";

import { isMacOS } from "./is-mac-os";

describe("isMacOS", (): void => {
    describe("when the userAgent is a macOS device", (): void => {
        it("should return true", (): void => {
            const navigatorMock = {
                userAgent: "Mozilla/5.0 (Macintosh; Intel Mac OS X 10_15_7) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/92.0.4515.131 Safari/537.36"
            };
            vi.stubGlobal("navigator", navigatorMock);

            expect(isMacOS()).toBe(true);
        });
    });

    describe("when the userAgent is not a macOS device", (): void => {
        it("should return false", (): void => {
            const navigatorMock = {
                userAgent: "Mozilla/5.0 (Linux; Android 11; SM-G991B) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/92.0.4515.131 Mobile Safari/537.36"
            };
            vi.stubGlobal("navigator", navigatorMock);

            expect(isMacOS()).toBe(false);
        });
    });
});
