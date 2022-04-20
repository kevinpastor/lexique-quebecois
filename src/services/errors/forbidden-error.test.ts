import { ForbiddenError, isForbiddenError } from "./forbidden-error";

describe("isForbiddenError", (): void => {
    it("should not be a ForbiddenError", (): void => {
        const error: Error = new Error();

        const result: boolean = isForbiddenError(error);

        expect(result).toBeFalsy();
    });

    it("should be a ForbiddenError", (): void => {
        const error: Error = new ForbiddenError();

        const result: boolean = isForbiddenError(error);

        expect(result).toBeTruthy();
    });
});
