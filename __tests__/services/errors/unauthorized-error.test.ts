import { isUnauthorizedError, UnauthorizedError } from "@services/errors/unauthorized-error";

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
