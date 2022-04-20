import { shuffle } from "./random";

// TODO Update to make sure it can't produce a false positive
describe("shuffle", (): void => {
    it("should shuffle number array", (): void => {
        const value: Array<number> = [
            0,
            1,
            2,
            3,
            4,
            5,
            6,
            7,
            8,
            9
        ];

        const result: Array<number> = shuffle(value);

        expect(result).toHaveLength(value.length);
        expect(result).not.toEqual(value);
    });

    it("should shuffle string array", (): void => {
        const value: Array<string> = [
            "0",
            "1",
            "2",
            "3",
            "4",
            "5",
            "6",
            "7",
            "8",
            "9"
        ];

        const result: Array<string> = shuffle(value);

        expect(result).toHaveLength(value.length);
        expect(result).not.toEqual(value);
    });
});
