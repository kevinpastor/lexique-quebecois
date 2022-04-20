export class ForbiddenError extends Error {

    public constructor(...args: ConstructorParameters<typeof Error>) {
        super(...args);

        this.name = "ForbiddenError";
    }

}

export const isForbiddenError = (error: unknown): error is ForbiddenError => (
    error instanceof ForbiddenError
);
