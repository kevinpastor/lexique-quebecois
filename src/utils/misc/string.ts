export const removeAccents = (input: string): string => (
    input.normalize("NFD").replace(/[\u0300-\u036f]/g, "")
);
