import { isNotFoundError, NotFoundError } from "./not-found-error";

describe("isNotFoundError", (): void => {
    it("should not be a NotFoundError", (): void => {
        const error: Error = new Error();

        const result: boolean = isNotFoundError(error);

        expect(result).toBeFalsy();
    });

    it("should be a NotFoundError", (): void => {
        const error: Error = new NotFoundError();

        const result: boolean = isNotFoundError(error);

        expect(result).toBeTruthy();
    });
});
