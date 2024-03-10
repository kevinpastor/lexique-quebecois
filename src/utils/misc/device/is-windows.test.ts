/**
 * @vitest-environment jsdom
 */
import { describe, expect, it, vi } from "vitest";

import { isWindows } from "./is-windows";

describe("isWindows", (): void => {
    describe("when the userAgent is a Windows device", (): void => {
        it("should return true", (): void => {
            const navigatorMock = {
                userAgent: "Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/92.0.4515.131 Safari/537.36"
            };
            vi.stubGlobal("navigator", navigatorMock);

            expect(isWindows()).toBe(true);
        });
    });

    describe("when the userAgent is not a Windows device", (): void => {
        it("should return false", (): void => {
            const navigatorMock = {
                userAgent: "Mozilla/5.0 (Linux; Android 11; SM-G991B) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/92.0.4515.131 Mobile Safari/537.36"
            };
            vi.stubGlobal("navigator", navigatorMock);

            expect(isWindows()).toBe(false);
        });
    });
});
