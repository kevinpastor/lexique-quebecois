import { Status } from "@models/status";

import { BadRequestError } from "./bad-request-error";
import { ConflictError } from "./conflict-error";
import { ForbiddenError } from "./forbidden-error";
import { InternalError } from "./internal-error";
import { MethodNotAllowedError } from "./method-not-allowed-error";
import { NotFoundError } from "./not-found-error";
import { TooManyRequestError } from "./too-many-request-error";
import { UnauthorizedError } from "./unauthorized-error";

export const createError = (status: Status, ...args: ConstructorParameters<typeof Error>): Error => {
    switch (status) {
        case Status.BadRequest:
            return new BadRequestError(...args);

        case Status.Unauthorized:
            return new UnauthorizedError(...args);

        case Status.Forbidden:
            return new ForbiddenError(...args);

        case Status.NotFound:
            return new NotFoundError(...args);

        case Status.MethodNotAllowed:
            return new MethodNotAllowedError(...args);

        case Status.Conflict:
            return new ConflictError(...args);

        case Status.TooManyRequest:
            return new TooManyRequestError(...args);

        case Status.InternalError:
            return new InternalError(...args);

        default:
            throw new Error("Status not supported.");
    }
};
