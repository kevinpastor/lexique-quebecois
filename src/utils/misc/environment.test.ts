import { describe, expect, it, vi } from "vitest";

import { isDevelopmentEnvironment, isProductionEnvironment, isTestEnvironment } from "~/utils/misc/environment";

describe("isDevelopmentEnvironment", (): void => {
    it("should not be in development environment", (): void => {
        vi.stubEnv("NODE_ENV", "production");

        expect(isDevelopmentEnvironment()).toBeFalsy();
    });

    it("should be in development environment", (): void => {
        vi.stubEnv("NODE_ENV", "development");

        expect(isDevelopmentEnvironment()).toBeTruthy();
    });
});

describe("isTestEnvironment", (): void => {
    it("should not be in test environment", (): void => {
        vi.stubEnv("NODE_ENV", "production");

        expect(isTestEnvironment()).toBeFalsy();
    });

    it("should be in test environment", (): void => {
        vi.stubEnv("NODE_ENV", "test");

        expect(isTestEnvironment()).toBeTruthy();
    });
});

describe("isProductionEnvironment", (): void => {
    it("should not be in production environment", (): void => {
        vi.stubEnv("NODE_ENV", "development");

        expect(isProductionEnvironment()).toBeFalsy();
    });

    it("should be in production environment", (): void => {
        vi.stubEnv("NODE_ENV", "production");

        expect(isProductionEnvironment()).toBeTruthy();
    });
});
