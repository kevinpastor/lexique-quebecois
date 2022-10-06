import { formatDate } from "@utils/misc/date";

describe("formatDate", (): void => {
    // TODO Add test cases.
    it.each([
        [new Date(1645120033319), "17 février 2022"]
    ])("should format \"%s\" to \"%s\"", (value: Date, expected: string): void => {
        const result: string = formatDate(value);

        expect(result).toEqual(expected);
    });
});
