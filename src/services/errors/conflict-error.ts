export class ConflictError extends Error {

    public constructor(...args: ConstructorParameters<typeof Error>) {
        super(...args);

        this.name = "ConflictError";
    }

}

export const isConflictError = (error: unknown): error is ConflictError => (
    error instanceof ConflictError
);
