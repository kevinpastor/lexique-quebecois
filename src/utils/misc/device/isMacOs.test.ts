/**
 * @jest-environment @stryker-mutator/jest-runner/jest-env/jsdom
 */
import { afterEach, describe, expect, it, jest } from "@jest/globals";

import { isMacOS } from "./isMacOS";

describe("isMacOS", (): void => {
    afterEach((): void => {
        jest.restoreAllMocks();
    });

    describe("when the userAgent is a macOS device", (): void => {
        it("should return true", (): void => {
            jest.spyOn(navigator, "userAgent", "get").mockReturnValue("Mozilla/5.0 (Macintosh; Intel Mac OS X 10_15_7) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/92.0.4515.131 Safari/537.36");

            expect(isMacOS()).toBe(true);
        });
    });

    describe("when the userAgent is not a macOS device", (): void => {
        it("should return false", (): void => {
            jest.spyOn(navigator, "userAgent", "get").mockReturnValue("Mozilla/5.0 (Linux; Android 11; SM-G991B) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/92.0.4515.131 Mobile Safari/537.36");

            expect(isMacOS()).toBe(false);
        });
    });
});
