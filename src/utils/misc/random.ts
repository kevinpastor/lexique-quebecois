import seedrandom, { PRNG } from "seedrandom";

export const shuffle = <T>(array: Array<T>): Array<T> => {
    const shuffledArray: Array<T> = array.slice();
    for (let i: number = shuffledArray.length - 1; i > 0; i--) {
        const j: number = Math.floor(Math.random() * (i + 1));
        [shuffledArray[i], shuffledArray[j]] = [shuffledArray[j], shuffledArray[i]];
    }

    return shuffledArray;
};

export const sample = <T>(array: Array<T>, sampleSize: number, seed?: number): Array<T> => {
    if (array.length < sampleSize) {
        throw new Error("Sample size can not be greater than the array size.");
    }

    const prng: PRNG = seedrandom(seed ? `${seed}` : undefined);
    const indexes: Set<number> = new Set();
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

export const getRandomInteger = (max: number): number => Math.floor(Math.random() * max);
