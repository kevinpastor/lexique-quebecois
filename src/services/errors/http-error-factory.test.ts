import { Status } from "@models/status";

import { isBadRequestError } from "./bad-request-error";
import { isConflictError } from "./conflict-error";
import { isForbiddenError } from "./forbidden-error";
import { createError } from "./http-error-factory";
import { isInternalError } from "./internal-error";
import { isMethodNotAllowedError } from "./method-not-allowed-error";
import { isNotFoundError } from "./not-found-error";
import { isTooManyRequestError } from "./too-many-request-error";
import { isUnauthorizedError } from "./unauthorized-error";

describe("createError", (): void => {
    it("should create BadRequestError", (): void => {
        const error: Error = createError(Status.BadRequest);

        expect(isBadRequestError(error)).toBeTruthy();
    });

    it("should create UnauthorizedError", (): void => {
        const error: Error = createError(Status.Unauthorized);

        expect(isUnauthorizedError(error)).toBeTruthy();
    });

    it("should create ForbiddenError", (): void => {
        const error: Error = createError(Status.Forbidden);

        expect(isForbiddenError(error)).toBeTruthy();
    });

    it("should create NotFoundError", (): void => {
        const error: Error = createError(Status.NotFound);

        expect(isNotFoundError(error)).toBeTruthy();
    });

    it("should create MethodNotAllowedError", (): void => {
        const error: Error = createError(Status.MethodNotAllowed);

        expect(isMethodNotAllowedError(error)).toBeTruthy();
    });

    it("should create ConflictError", (): void => {
        const error: Error = createError(Status.Conflict);

        expect(isConflictError(error)).toBeTruthy();
    });

    it("should create TooManyRequestError", (): void => {
        const error: Error = createError(Status.TooManyRequest);

        expect(isTooManyRequestError(error)).toBeTruthy();
    });

    it("should create InternalErrorError", (): void => {
        const error: Error = createError(Status.InternalError);

        expect(isInternalError(error)).toBeTruthy();
    });

    it("should not create other error", (): void => {
        expect((): void => {
            createError(Status.OK);
        }).toThrow();
    });
});
