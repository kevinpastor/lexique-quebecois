import {
    isDevelopmentEnvironment,
    isTestingEnvironment,
    isProductionEnvironment
} from "./environment";

describe("@utils", (): void => {
    describe("misc", (): void => {
        describe("environment", (): void => {
            describe("isDevelopmentEnvironment", (): void => {
                const environment: NodeJS.ProcessEnv = process.env;

                beforeEach(() => {
                    jest.resetModules();
                    process.env = { ...environment };
                });

                afterAll(() => {
                    process.env = environment;
                });

                it("should not be in development", (): void => {
                    (process.env as Record<string, string>).NODE_ENV = "production";

                    expect(isDevelopmentEnvironment()).toBeFalsy();
                });

                it("should be in development", (): void => {
                    (process.env as Record<string, string>).NODE_ENV = "development";

                    expect(isDevelopmentEnvironment()).toBeTruthy();
                });
            });

            describe("isTestingEnvironment", (): void => {
                const environment: NodeJS.ProcessEnv = process.env;

                beforeEach(() => {
                    jest.resetModules();
                    process.env = { ...environment };
                });

                afterAll(() => {
                    process.env = environment;
                });

                it("should not be in testing", (): void => {
                    (process.env as Record<string, string>).NODE_ENV = "production";

                    expect(isTestingEnvironment()).toBeFalsy();
                });

                it("should be in testing", (): void => {
                    (process.env as Record<string, string>).NODE_ENV = "test";

                    expect(isTestingEnvironment()).toBeTruthy();
                });
            });

            describe("isProductionEnvironment", (): void => {
                const environment: NodeJS.ProcessEnv = process.env;

                beforeEach(() => {
                    jest.resetModules();
                    process.env = { ...environment };
                });

                afterAll(() => {
                    process.env = environment;
                });

                it("should not be in production", (): void => {
                    (process.env as Record<string, string>).NODE_ENV = "development";

                    expect(isProductionEnvironment()).toBeFalsy();
                });

                it("should be in production", (): void => {
                    (process.env as Record<string, string>).NODE_ENV = "production";

                    expect(isProductionEnvironment()).toBeTruthy();
                });
            });
        });
    });
});
