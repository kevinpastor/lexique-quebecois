/**
 * @jest-environment @stryker-mutator/jest-runner/jest-env/jsdom
 */
import { afterEach, describe, expect, it, jest } from "@jest/globals";

import { isMobile } from "./isMobile";

describe("isMobile", (): void => {
    afterEach((): void => {
        jest.restoreAllMocks();
    });

    describe("when the userAgent is a mobile device", (): void => {
        it("should return true", (): void => {
            jest.spyOn(navigator, "userAgent", "get").mockReturnValue("Mozilla/5.0 (iPhone; CPU iPhone OS 14_7_1 like Mac OS X) AppleWebKit/605.1.15 (KHTML, like Gecko) Version/14.1.2 Mobile/15E148 Safari/604.1");

            expect(isMobile()).toBe(true);
        });
    });

    describe("when the userAgent is not a mobile device", (): void => {
        it("should return false", (): void => {
            jest.spyOn(navigator, "userAgent", "get").mockReturnValue("Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/122.0.0.0 Safari/537.36");

            expect(isMobile()).toBe(false);
        });
    });
});
