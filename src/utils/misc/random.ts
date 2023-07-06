import seedrandom, { PRNG } from "seedrandom";

export const sample = <T>(array: Array<T>, sampleSize: number, seed?: number): Array<T> => {
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
        sampleArray.push(array[index]);
    }

    return sampleArray;
};
