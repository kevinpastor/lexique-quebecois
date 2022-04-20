import { BadRequestError, isBadRequestError } from "./bad-request-error";

describe("isBadRequestError", (): void => {
    it("should not be a BadRequestError", (): void => {
        const error: Error = new Error();

        const result: boolean = isBadRequestError(error);

        expect(result).toBeFalsy();
    });

    it("should be a BadRequestError", (): void => {
        const error: Error = new BadRequestError();

        const result: boolean = isBadRequestError(error);

        expect(result).toBeTruthy();
    });
});
