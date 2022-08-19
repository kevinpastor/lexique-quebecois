import { InternalError, isInternalError } from "@services/errors/internal-error";

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
