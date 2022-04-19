export class ForbiddenError extends Error {

    public constructor(message?: string, options?: ErrorOptions) {
        super(message, options);

        this.name = "ForbiddenError";
    }

}

export const isForbiddenError = (error: unknown): error is ForbiddenError => (
    error instanceof ForbiddenError
);
