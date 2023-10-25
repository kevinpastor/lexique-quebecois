import seedrandom, { type PRNG } from "seedrandom";

type NonUndefined = NonNullable<unknown> | null;

export const sample = <T extends NonUndefined>(array: Array<T>, sampleSize: number, seed?: number): Array<T> => {
    if (array.length < sampleSize) {
        throw new Error("Sample size can not be greater than the array size.");
    }

    const prng: PRNG = seedrandom(seed ? `${seed}` : undefined);
    const indexes: Set<number> = new Set<number>();
    let indexCount: number = 0;
    while (indexCount < sampleSize) {
        const index: number = ((prng.int32() % array.length) + array.length) % array.length;

        if (indexes.has(index)) {
            continue;
        }

        indexes.add(index);
        indexCount++;
    }

    const sampleArray: Array<T> = [];
    for (const index of indexes) {
        const element: T | undefined = array[index];
        if (!element) {
            continue;
        }

        sampleArray.push(element);
    }

    return sampleArray;
};
