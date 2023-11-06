import { describe, expect, it } from "@jest/globals";

import { Status } from "~/types/status";
import { HttpError, isHttpError } from "~/utils/http-error";

describe("isHttpError", (): void => {
    describe("when given an object", (): void => {
        it("should not be considered valid", (): void => {
            const result: boolean = isHttpError({});

            expect(result).toBeFalsy();
        });
    });

    describe("when given an error", (): void => {
        describe("which is not an HttpError", (): void => {
            it("should not be considered valid", (): void => {
                const error: Error = new Error();

                const result: boolean = isHttpError(error);

                expect(result).toBeFalsy();
            });
        });

        describe("which is an HttpError", (): void => {
            it("should be considered valid", (): void => {
                const error: Error = new HttpError(Status.NotFound);

                const result: boolean = isHttpError(error);

                expect(result).toBeTruthy();
            });
        });
    });
});
