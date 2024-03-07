/**
 * @jest-environment @stryker-mutator/jest-runner/jest-env/jsdom
 */
import { afterEach, describe, expect, it, jest } from "@jest/globals";

import { isUserAgent } from "./isUserAgent";

describe("isUserAgent", (): void => {
    afterEach((): void => {
        jest.restoreAllMocks();
    });

    describe("when navigator is undefined", (): void => {
        it("should return false", (): void => {
            expect(isUserAgent(/iPhone/)).toBe(false);
        });
    });

    describe("when the given user agent is the current one", (): void => {
        it("should return true", (): void => {
            jest.spyOn(navigator, "userAgent", "get").mockReturnValue("iPhone");

            expect(isUserAgent(/iPhone/)).toBe(true);
        });
    });

    describe("when the given user agent is not the current one", (): void => {
        it("should return false", (): void => {
            jest.spyOn(navigator, "userAgent", "get").mockReturnValue("iPhone");

            expect(isUserAgent(/Macintosh/)).toBe(false);
        });
    });
});
