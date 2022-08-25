export const removeAccents = (input: string): string => (
    input.normalize("NFD").replace(/[\u0300-\u036f]/g, "")
);

export const parseJSON = <T>(value: string | null): T => {
    return value === "undefined"
        ? undefined
        : JSON.parse(value ?? "");
};
