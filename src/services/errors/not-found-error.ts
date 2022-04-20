export class NotFoundError extends Error {

    public constructor(...args: ConstructorParameters<typeof Error>) {
        super(...args);

        this.name = "NotFoundError";
    }

}

export const isNotFoundError = (error: unknown): error is NotFoundError => (
    error instanceof NotFoundError
);
