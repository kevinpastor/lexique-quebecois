export class MethodNotAllowedError extends Error {

    public constructor(...args: ConstructorParameters<typeof Error>) {
        super(...args);

        this.name = "MethodNotAllowedError";
    }

}

export const isMethodNotAllowedError = (error: unknown): error is MethodNotAllowedError => (
    error instanceof MethodNotAllowedError
);
