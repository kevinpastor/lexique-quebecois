import { isUnauthorizedError, UnauthorizedError } from "./unauthorized-error";

describe("@services", (): void => {
    describe("errors", (): void => {
        describe("unauthorized-error", (): void => {
            describe("isUnauthorizedError", (): void => {
                it("should not be a UnauthorizedError", (): void => {
                    const error: Error = new Error();

                    const result: boolean = isUnauthorizedError(error);

                    expect(result).toBeFalsy();
                });

                it("should be a UnauthorizedError", (): void => {
                    const error: Error = new UnauthorizedError();

                    const result: boolean = isUnauthorizedError(error);

                    expect(result).toBeTruthy();
                });
            });
        });
    });
});
