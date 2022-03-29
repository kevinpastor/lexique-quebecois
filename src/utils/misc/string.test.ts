import { removeAccents } from "./string";

describe("@utils", (): void => {
    describe("misc", (): void => {
        describe("string", (): void => {
            it.each([
                ["à", "a"],
                ["â", "a"],
                ["ä", "a"],
                ["é", "e"],
                ["è", "e"],
                ["ê", "e"],
                ["ë", "e"],
                ["ï", "i"],
                ["î", "i"],
                ["ô", "o"],
                ["ö", "o"],
                ["ù", "u"],
                ["û", "u"],
                ["ü", "u"],
                ["ÿ", "y"],
                ["ç", "c"],
                ["À", "A"],
                ["Â", "A"],
                ["Ä", "A"],
                ["É", "E"],
                ["È", "E"],
                ["Ê", "E"],
                ["Ë", "E"],
                ["Ï", "I"],
                ["Î", "I"],
                ["Ô", "O"],
                ["Ö", "O"],
                ["Ù", "U"],
                ["Û", "U"],
                ["Ü", "U"],
                ["Ÿ", "Y"],
                ["Ç", "C"]
            ])("should transform \"%s\" to \"%s\"", (value: string, expected: string): void => {
                const result: string = removeAccents(value);

                expect(result).toEqual(expected);
            });

            it.each([
                ["a"],
                ["b"],
                ["c"],
                ["d"],
                ["e"],
                ["f"],
                ["g"],
                ["h"],
                ["i"],
                ["j"],
                ["k"],
                ["l"],
                ["m"],
                ["n"],
                ["o"],
                ["p"],
                ["q"],
                ["r"],
                ["s"],
                ["t"],
                ["u"],
                ["v"],
                ["w"],
                ["x"],
                ["y"],
                ["z"],
                ["A"],
                ["B"],
                ["C"],
                ["D"],
                ["E"],
                ["F"],
                ["G"],
                ["H"],
                ["I"],
                ["J"],
                ["K"],
                ["L"],
                ["M"],
                ["N"],
                ["O"],
                ["P"],
                ["Q"],
                ["R"],
                ["S"],
                ["T"],
                ["U"],
                ["V"],
                ["W"],
                ["X"],
                ["Y"],
                ["Z"]
            ])("should not transform \"%s\"", (value: string): void => {
                const result: string = removeAccents(value);

                expect(result).toEqual(value);
            });
        });
    });
});
