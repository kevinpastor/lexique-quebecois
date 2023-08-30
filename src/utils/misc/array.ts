export const insert = <T>(array: Array<T>, index: number, ...items: Array<T>): Array<T> => [
    ...array.slice(0, index),
    ...items,
    ...array.slice(index)
];
