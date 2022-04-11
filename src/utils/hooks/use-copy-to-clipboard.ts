// Taken from https://usehooks-ts.com/react-hook/use-copy-to-clipboard

type CopyFunction = (text: string) => Promise<void>;

export const useCopyToClipboard = (): CopyFunction => {
    return async (text: string): Promise<void> => {
        // eslint-disable-next-line @typescript-eslint/no-unnecessary-condition
        if (!navigator?.clipboard) {
            throw new Error("Clipboard API not supported.");
        }

        try {
            await navigator.clipboard.writeText(text);
        }
        catch {
            throw new Error(`Could not write to the clipboard.`);
        }
    };
};
