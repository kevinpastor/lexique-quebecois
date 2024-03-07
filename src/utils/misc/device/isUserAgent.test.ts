/**
 * @vitest-environment jsdom
 */
import { describe, expect, it, vi } from "vitest";

import { isUserAgent } from "./isUserAgent";

describe("isUserAgent", (): void => {
    describe("when navigator is undefined", (): void => {
        it("should return false", (): void => {
            expect(isUserAgent(/iPhone/)).toBe(false);
        });
    });

    describe("when the given user agent is the current one", (): void => {
        it("should return true", (): void => {
            const navigatorMock = {
                userAgent: "iPhone"
            };
            vi.stubGlobal("navigator", navigatorMock);

            expect(isUserAgent(/iPhone/)).toBe(true);
        });
    });

    describe("when the given user agent is not the current one", (): void => {
        it("should return false", (): void => {
            const navigatorMock = {
                userAgent: "iPhone"
            };
            vi.stubGlobal("navigator", navigatorMock);

            expect(isUserAgent(/Macintosh/)).toBe(false);
        });
    });
});
