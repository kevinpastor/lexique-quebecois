import { isMethodNotAllowedError, MethodNotAllowedError } from "./method-not-allowed-error";

describe("@services", (): void => {
    describe("errors", (): void => {
        describe("method-not-allowed-error", (): void => {
            describe("isMethodNotAllowedError", (): void => {
                it("should not be a MethodNotAllowedError", (): void => {
                    const error: Error = new Error();

                    const result: boolean = isMethodNotAllowedError(error);

                    expect(result).toBeFalsy();
                });

                it("should be a MethodNotAllowedError", (): void => {
                    const error: Error = new MethodNotAllowedError();

                    const result: boolean = isMethodNotAllowedError(error);

                    expect(result).toBeTruthy();
                });
            });
        });
    });
});
