export const getResourceName = (label: string): string => {
    const spacelessLabel: string = label.replaceAll(" ", "-");
    return spacelessLabel.normalize("NFD").replace(/[\u0300-\u036f]/g, "");
};

export const labelRegex: RegExp = /^[a-zàâäéèêëïîôöùûüÿç]*$/gi;

export const isValidLabel = (label: string): boolean => {
    return labelRegex.test(label);
};
