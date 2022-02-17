export const isBoolean = (value: unknown): value is boolean => {
    return typeof value === "boolean";
};

export const isNumber = (value: unknown): value is number => {
    return typeof value === "number";
};

export const isObject = (value: unknown): value is Object => {
    return typeof value === "object";
};

export const isString = (value: unknown): value is string => {
    return typeof value === "string";
};
