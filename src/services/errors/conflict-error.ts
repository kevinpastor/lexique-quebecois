export class ConflictError extends Error {

    public constructor(message?: string, options?: ErrorOptions) {
        super(message, options);

        this.name = "ConflictError";
    }

}

export const isConflictError = (error: unknown): error is ConflictError => (
    error instanceof ConflictError
);
