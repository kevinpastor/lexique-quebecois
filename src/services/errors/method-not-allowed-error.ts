export class MethodNotAllowedError extends Error {

    public constructor(message?: string, options?: ErrorOptions) {
        super(message, options);

        this.name = "MethodNotAllowedError";
    }

}

export const isMethodNotAllowedError = (error: unknown): error is MethodNotAllowedError => (
    error instanceof MethodNotAllowedError
);
