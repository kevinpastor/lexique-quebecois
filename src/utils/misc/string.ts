export const removeAccents = (input: string): string => (
    input.normalize("NFD").replace(/[\u0300-\u036f]/g, "")
);

export const parseJSON = <T>(value: string | null): T => {
    return value === "undefined"
        ? undefined
        : JSON.parse(value ?? "");
};

/**
 * @param words Has to be sorted alphabetically.
 */
export const groupByFirstLetter = (words: Array<string>): Array<Array<string>> => {
    const output: Array<Array<string>> = [];
    let currentGroup: Array<string> = [];
    let currentGroupLetter: string = "";

    for (const word of words) {
        const firstLetter: string = word[0];
        if (firstLetter !== currentGroupLetter) {
            currentGroup = [word];
            currentGroupLetter = firstLetter;
            output.push(currentGroup);
        }
        else {
            currentGroup.push(word);
        }
    }

    return output;
};
