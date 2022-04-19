export class TooManyRequestError extends Error {

    public constructor(message?: string, options?: ErrorOptions) {
        super(message, options);

        this.name = "TooManyRequestError";
    }

}

export const isTooManyRequestError = (error: unknown): error is TooManyRequestError => (
    error instanceof TooManyRequestError
);
