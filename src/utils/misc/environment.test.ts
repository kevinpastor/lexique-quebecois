import { describe, expect, it, vi } from "vitest";

import { isCIEnvironment, isDevelopmentEnvironment, isProductionEnvironment, isTestEnvironment } from "~/utils/misc/environment";

describe("isDevelopmentEnvironment", (): void => {
    it("should not be in development environment", (): void => {
        vi.stubEnv("NODE_ENV", "production");

        expect(isDevelopmentEnvironment()).toBe(false);
    });

    it("should be in development environment", (): void => {
        vi.stubEnv("NODE_ENV", "development");

        expect(isDevelopmentEnvironment()).toBe(true);
    });
});

describe("isTestEnvironment", (): void => {
    it("should not be in test environment", (): void => {
        vi.stubEnv("NODE_ENV", "production");

        expect(isTestEnvironment()).toBe(false);
    });

    it("should be in test environment", (): void => {
        vi.stubEnv("NODE_ENV", "test");

        expect(isTestEnvironment()).toBe(true);
    });
});

describe("isProductionEnvironment", (): void => {
    it("should not be in production environment", (): void => {
        vi.stubEnv("NODE_ENV", "development");

        expect(isProductionEnvironment()).toBe(false);
    });

    it("should be in production environment", (): void => {
        vi.stubEnv("NODE_ENV", "production");

        expect(isProductionEnvironment()).toBe(true);
    });
});

describe("isCIEnvironment", (): void => {
    it("should not be in CI environment", (): void => {
        // This is necessary in order for this test case to pass in the CI.
        vi.stubEnv("CI", "");

        expect(isCIEnvironment()).toBe(false);
    });

    it("should be in CI environment", (): void => {
        vi.stubEnv("CI", "true");

        expect(isCIEnvironment()).toBe(true);
    });
});
