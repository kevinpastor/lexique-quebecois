export const isBoolean = (value: unknown): value is boolean => {
    return typeof value === "boolean";
};

export const isObject = (value: unknown): value is Object => {
    return typeof value === "string";
};

export const isString = (value: unknown): value is string => {
    return typeof value === "string";
};
