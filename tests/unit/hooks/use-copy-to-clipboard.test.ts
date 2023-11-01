/**
 * @jest-environment jsdom
 */
import { afterEach, beforeEach, describe, expect, it, jest } from "@jest/globals";

import { type CopyFunction, useCopyToClipboard } from "~/hooks/use-copy-to-clipboard";

describe("useCopyToClipboard", (): void => {
    const writeTextMock = jest.fn<typeof navigator.clipboard.writeText>()
        .mockResolvedValue(undefined);

    const navigatorMock = jest.spyOn(global, "navigator", "get");

    beforeEach((): void => {
        navigatorMock.mockReturnValue({
            clipboard: {
                writeText: writeTextMock
            } as unknown as Clipboard
        } as Partial<Navigator> as Navigator);
    });

    afterEach((): void => {
        jest.resetAllMocks();
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
        navigatorMock.mockReturnValue({
            clipboard: undefined as unknown as Clipboard
        } as Partial<Navigator> as Navigator);

        const copyToClipboard: CopyFunction = useCopyToClipboard();

        await expect(copyToClipboard("foo")).rejects.toThrow();
    });

    it("should handle missing navigator API", async (): Promise<void> => {
        navigatorMock.mockReturnValue(undefined as unknown as Navigator);

        const copyToClipboard: CopyFunction = useCopyToClipboard();

        await expect(copyToClipboard("foo")).rejects.toThrow();
    });
});
