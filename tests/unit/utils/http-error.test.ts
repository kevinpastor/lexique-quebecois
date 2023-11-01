import { describe, expect, it } from "@jest/globals";

import { Status } from "~/types/status";
import { HttpError, isHttpError } from "~/utils/http-error";

describe("isHttpError", (): void => {
    it("should not be a HttpError", (): void => {
        const error: Error = new Error();

        const result: boolean = isHttpError(error);

        expect(result).toBeFalsy();
    });

    it("should be a HttpError", (): void => {
        const error: Error = new HttpError(Status.NotFound);

        const result: boolean = isHttpError(error);

        expect(result).toBeTruthy();
    });
});
