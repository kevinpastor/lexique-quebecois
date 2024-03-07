/**
 * @jest-environment @stryker-mutator/jest-runner/jest-env/jsdom
 */
import { afterEach, describe, expect, it, jest } from "@jest/globals";

import { isAndroid } from "./isAndroid";

describe("isAndroid", (): void => {
    afterEach((): void => {
        jest.restoreAllMocks();
    });

    describe("when the userAgent is an Android device", (): void => {
        it("should return true", (): void => {
            jest.spyOn(navigator, "userAgent", "get").mockReturnValue("Mozilla/5.0 (Linux; Android 11; SM-G991B) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/92.0.4515.131 Mobile Safari/537.36");

            expect(isAndroid()).toBe(true);
        });
    });

    describe("when the userAgent is not an Android device", (): void => {
        it("should return false", (): void => {
            jest.spyOn(navigator, "userAgent", "get").mockReturnValue("Mozilla/5.0 (iPhone; CPU iPhone OS 14_7_1 like Mac OS X) AppleWebKit/605.1.15 (KHTML, like Gecko) Version/14.1.2 Mobile/15E148 Safari/604.1");

            expect(isAndroid()).toBe(false);
        });
    });
});
