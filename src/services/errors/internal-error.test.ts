import { InternalError, isInternalError } from "./internal-error";

describe("@services", (): void => {
    describe("errors", (): void => {
        describe("internal-error", (): void => {
            describe("isInternalError", (): void => {
                it("should not be a InternalError", (): void => {
                    const error: Error = new Error();

                    const result: boolean = isInternalError(error);

                    expect(result).toBeFalsy();
                });

                it("should be a InternalError", (): void => {
                    const error: Error = new InternalError();

                    const result: boolean = isInternalError(error);

                    expect(result).toBeTruthy();
                });
            });
        });
    });
});
