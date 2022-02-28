export const delay = (ms: number): Promise<void> => {
    return new Promise((resolve: (() => void)): void => {
        setTimeout(resolve, ms);
    });
};
