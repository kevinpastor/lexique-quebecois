export class BadRequestError extends Error {

    public constructor(...args: ConstructorParameters<typeof Error>) {
        super(...args);

        this.name = "BadRequestError";
    }

}

export const isBadRequestError = (error: unknown): error is BadRequestError => (
    error instanceof BadRequestError
);
