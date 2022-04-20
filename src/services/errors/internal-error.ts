export class InternalError extends Error {

    public constructor(...args: ConstructorParameters<typeof Error>) {
        super(...args);

        this.name = "InternalError";
    }

}

export const isInternalError = (error: unknown): error is InternalError => (
    error instanceof InternalError
);
