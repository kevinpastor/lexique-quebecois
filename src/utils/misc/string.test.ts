import { describe, expect, it } from "@jest/globals";

import { groupByFirstLetter, parseJSON, removeAccents } from "~/utils/misc/string";

describe("removeAccents", (): void => {
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

describe("parserJSON", (): void => {
    it.each([
        ["null", null],
        ["undefined", undefined],
        ["true", true],
        ["false", false],
        ["0", 0],
        ["\"hello\"", "hello"],
        ["{}", {}],
        ["{\"foo\": true}", { foo: true }]
    ])("should parse `%p`", (value: string, expected: unknown): void => {
        const result = parseJSON(value);

        expect(result).toEqual(expected);
    });
});

describe("groupByFirstLetter", (): void => {
    it("should group words by their first letter", (): void => {
        const words = [
            "alpha",
            "article",
            "beta",
            "cage",
            "charlie"
        ];

        const result = groupByFirstLetter(words);

        expect(result).toEqual([
            [
                "alpha",
                "article"
            ],
            [
                "beta"
            ],
            [
                "cage",
                "charlie"
            ]
        ]);
    });

    it("should skip empty words", (): void => {
        const words = [
            "alpha",
            "article",
            "beta",
            "",
            "cage",
            "charlie"
        ];

        const result = groupByFirstLetter(words);

        expect(result).toEqual([
            [
                "alpha",
                "article"
            ],
            [
                "beta"
            ],
            [
                "cage",
                "charlie"
            ]
        ]);
    });
});
