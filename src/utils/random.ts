export const shuffle = <T>(array: Array<T>): Array<T> => {
    const shuffledArray: Array<T> = array.slice();
    for (let i: number = shuffledArray.length - 1; i > 0; i--) {
        const j: number = Math.floor(Math.random() * (i + 1));
        [shuffledArray[i], shuffledArray[j]] = [shuffledArray[j], shuffledArray[i]];
    }

    return shuffledArray;
};
