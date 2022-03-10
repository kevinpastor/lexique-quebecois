export enum Method {
    GET = "GET",
    POST = "POST",
    PUT = "PUT",
    DELETE = "DELETE"
}

export const isValidMethod = (value: string): value is Method =>
    value in Method;
