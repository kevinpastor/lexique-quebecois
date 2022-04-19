export class UnauthorizedError extends Error {

    public constructor(message?: string, options?: ErrorOptions) {
        super(message, options);

        this.name = "UnauthorizedError";
    }

}

export const isUnauthorizedError = (error: unknown): error is UnauthorizedError => (
    error instanceof UnauthorizedError
);
