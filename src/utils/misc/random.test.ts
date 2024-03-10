import { describe, expect, it } from "vitest";

import { sample } from "./random";

describe("sample", (): void => {
    describe("when the sample size is bigger than the array size", (): void => {
        it("should throw", (): void => {
            const array = [0];
            const size = 5;

            expect((): void => {
                sample(array, size);
            }).toThrow();
        });
    });

    it("should return a sample with the given size", (): void => {
        const array = [0, 1, 2, 3, 4, 5, 6, 7, 8, 9];
        const size = 1;

        const result = sample(array, size);

        expect(result).toHaveLength(size);
    });

    it("should return the sample sample given a seed", (): void => {
        const array = [0, 1, 2, 3, 4, 5, 6, 7, 8, 9];
        const size = 5;
        const seed = 1234567890;

        const result = sample(array, size, seed);

        expect(result).toEqual([5, 4, 9, 0, 2]);
    });
});
