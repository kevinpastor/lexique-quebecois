/**
 * @jest-environment jsdom
 */
import { CopyFunction, useCopyToClipboard } from "./use-copy-to-clipboard";

describe("useCopyToClipboard", (): void => {
    const originalClipboard = { ...global.navigator.clipboard };
    const writeTextMock = jest.fn()
        .mockResolvedValue(undefined);

    beforeEach((): void => {
        const clipboardMock = {
            writeText: writeTextMock
        };
        // eslint-disable-next-line @typescript-eslint/ban-ts-comment
        // @ts-ignore
        global.navigator.clipboard = clipboardMock;
    });

    afterEach(() => {
        jest.resetAllMocks();
        // eslint-disable-next-line @typescript-eslint/ban-ts-comment
        // @ts-ignore
        global.navigator.clipboard = originalClipboard;
    });

    it("should copy to clipboard", async (): Promise<void> => {
        const copyToClipboard: CopyFunction = useCopyToClipboard();

        await copyToClipboard("foo");

        expect(writeTextMock).toBeCalledWith("foo");
    });

    it("should handle clipboard error", async (): Promise<void> => {
        writeTextMock.mockRejectedValue(undefined);

        const copyToClipboard: CopyFunction = useCopyToClipboard();

        await expect(copyToClipboard("foo")).rejects.toThrow();
    });

    it("should handle missing clipboard API", async (): Promise<void> => {
        // eslint-disable-next-line @typescript-eslint/ban-ts-comment
        // @ts-ignore
        global.navigator.clipboard = undefined;

        const copyToClipboard: CopyFunction = useCopyToClipboard();

        await expect(copyToClipboard("foo")).rejects.toThrow();
    });
});
