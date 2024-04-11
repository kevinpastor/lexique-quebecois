import { type Status } from "~/types/status";

export class HttpError extends Error {
    public readonly name: string = "HttpError";

    public constructor(
        public readonly status: Status,
        ...args: ConstructorParameters<typeof Error>
    ) {
        super(...args);
    }
}

export const isHttpError = (error: unknown): error is HttpError => (
    error instanceof HttpError
);
