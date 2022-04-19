import { isTooManyRequestError, TooManyRequestError } from "./too-many-request-error";

describe("@services", (): void => {
    describe("errors", (): void => {
        describe("too-many-request-error", (): void => {
            describe("isTooManyRequestError", (): void => {
                it("should not be a TooManyRequestError", (): void => {
                    const error: Error = new Error();

                    const result: boolean = isTooManyRequestError(error);

                    expect(result).toBeFalsy();
                });

                it("should be a TooManyRequestError", (): void => {
                    const error: Error = new TooManyRequestError();

                    const result: boolean = isTooManyRequestError(error);

                    expect(result).toBeTruthy();
                });
            });
        });
    });
});
