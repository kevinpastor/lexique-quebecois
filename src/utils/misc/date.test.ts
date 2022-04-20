import { formatDate } from "./date";

describe("formatDate", (): void => {
    it.each([
        [1645120033319, "17 février 2022"]
    ])("should format \"%s\" to \"%s\"", (value: number, expected: string): void => {
        const result: string = formatDate(value);

        expect(result).toEqual(expected);
    });

    it.each([
        [new Date(1645120033319), "17 février 2022"]
    ])("should format \"%s\" to \"%s\"", (value: Date, expected: string): void => {
        const result: string = formatDate(value);

        expect(result).toEqual(expected);
    });
});
