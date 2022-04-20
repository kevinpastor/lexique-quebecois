import { isMethodNotAllowedError, MethodNotAllowedError } from "./method-not-allowed-error";

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
