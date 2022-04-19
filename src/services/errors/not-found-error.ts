export class NotFoundError extends Error {

    public constructor(message?: string, options?: ErrorOptions) {
        super(message, options);

        this.name = "NotFoundError";
    }

}

export const isNotFoundError = (error: unknown): error is NotFoundError => (
    error instanceof NotFoundError
);
