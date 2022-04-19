export class InternalError extends Error {

    public constructor(message?: string, options?: ErrorOptions) {
        super(message, options);

        this.name = "InternalError";
    }

}

export const isInternalError = (error: unknown): error is InternalError => (
    error instanceof InternalError
);
