/**
 * @jest-environment @stryker-mutator/jest-runner/jest-env/jsdom
 */
import { afterEach, describe, expect, it, jest } from "@jest/globals";

import { isWindows } from "./isWindows";

describe("isWindows", (): void => {
    afterEach((): void => {
        jest.restoreAllMocks();
    });

    describe("when the userAgent is a Windows device", (): void => {
        it("should return true", (): void => {
            jest.spyOn(navigator, "userAgent", "get").mockReturnValue("Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/92.0.4515.131 Safari/537.36");

            expect(isWindows()).toBe(true);
        });
    });

    describe("when the userAgent is not a Windows device", (): void => {
        it("should return false", (): void => {
            jest.spyOn(navigator, "userAgent", "get").mockReturnValue("Mozilla/5.0 (Linux; Android 11; SM-G991B) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/92.0.4515.131 Mobile Safari/537.36");

            expect(isWindows()).toBe(false);
        });
    });
});
