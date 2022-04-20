export class UnauthorizedError extends Error {

    public constructor(...args: ConstructorParameters<typeof Error>) {
        super(...args);

        this.name = "UnauthorizedError";
    }

}

export const isUnauthorizedError = (error: unknown): error is UnauthorizedError => (
    error instanceof UnauthorizedError
);
