export class BadRequestError extends Error {

    public constructor(message?: string, options?: ErrorOptions) {
        super(message, options);

        this.name = "BadRequestError";
    }

}

export const isBadRequestError = (error: unknown): error is BadRequestError => (
    error instanceof BadRequestError
);
