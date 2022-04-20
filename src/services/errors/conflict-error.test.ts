import { ConflictError, isConflictError } from "./conflict-error";

describe("isConflictError", (): void => {
    it("should not be a ConflictError", (): void => {
        const error: Error = new Error();

        const result: boolean = isConflictError(error);

        expect(result).toBeFalsy();
    });

    it("should be a ConflictError", (): void => {
        const error: Error = new ConflictError();

        const result: boolean = isConflictError(error);

        expect(result).toBeTruthy();
    });
});
