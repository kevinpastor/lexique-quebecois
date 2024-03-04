import { afterAll, beforeEach, describe, expect, it, jest } from "@jest/globals";

import { isDevelopmentEnvironment, isProductionEnvironment, isTestEnvironment } from "~/utils/misc/environment";

describe("isDevelopmentEnvironment", (): void => {
    const environment: NodeJS.ProcessEnv = process.env;

    beforeEach((): void => {
        jest.resetModules();
        process.env = { ...environment };
    });

    afterAll((): void => {
        process.env = environment;
    });

    it("should not be in development environment", (): void => {
        (process.env as Record<string, string>)["NODE_ENV"] = "production";

        expect(isDevelopmentEnvironment()).toBeFalsy();
    });

    it("should be in development environment", (): void => {
        (process.env as Record<string, string>)["NODE_ENV"] = "development";

        expect(isDevelopmentEnvironment()).toBeTruthy();
    });
});

describe("isTestEnvironment", (): void => {
    const environment: NodeJS.ProcessEnv = process.env;

    beforeEach((): void => {
        jest.resetModules();
        process.env = { ...environment };
    });

    afterAll((): void => {
        process.env = environment;
    });

    it("should not be in test environment", (): void => {
        (process.env as Record<string, string>)["NODE_ENV"] = "production";

        expect(isTestEnvironment()).toBeFalsy();
    });

    it("should be in test environment", (): void => {
        (process.env as Record<string, string>)["NODE_ENV"] = "test";

        expect(isTestEnvironment()).toBeTruthy();
    });
});

describe("isProductionEnvironment", (): void => {
    const environment: NodeJS.ProcessEnv = process.env;

    beforeEach((): void => {
        jest.resetModules();
        process.env = { ...environment };
    });

    afterAll((): void => {
        process.env = environment;
    });

    it("should not be in production environment", (): void => {
        (process.env as Record<string, string>)["NODE_ENV"] = "development";

        expect(isProductionEnvironment()).toBeFalsy();
    });

    it("should be in production environment", (): void => {
        (process.env as Record<string, string>)["NODE_ENV"] = "production";

        expect(isProductionEnvironment()).toBeTruthy();
    });
});
