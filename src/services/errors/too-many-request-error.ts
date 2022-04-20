export class TooManyRequestError extends Error {

    public constructor(...args: ConstructorParameters<typeof Error>) {
        super(...args);

        this.name = "TooManyRequestError";
    }

}

export const isTooManyRequestError = (error: unknown): error is TooManyRequestError => (
    error instanceof TooManyRequestError
);
