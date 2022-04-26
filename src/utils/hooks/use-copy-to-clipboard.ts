export type CopyFunction = (text: string) => Promise<void>;

// Taken from https://stackoverflow.com/a/53951634/7817501
const copyToClipboardFallback = (text: string): void => {
    const textarea: HTMLTextAreaElement = document.createElement("textarea");
    try {
        textarea.setAttribute("readonly", "true");
        textarea.setAttribute("contenteditable", "true");
        textarea.style.position = "fixed"; // prevent scroll from jumping to the bottom when focus is set.
        textarea.value = text;

        document.body.appendChild(textarea);

        textarea.focus();
        textarea.select();

        const range: Range = document.createRange();
        range.selectNodeContents(textarea);

        const sel: Selection | null = window.getSelection();
        if (!sel) {
            throw new Error("TODO");
        }
        sel.removeAllRanges();
        sel.addRange(range);

        textarea.setSelectionRange(0, textarea.value.length);

        const result: boolean = document.execCommand("copy");
        if (!result) {
            throw new Error("TODO");
        }
    }
    catch (error: unknown) {
        try {
            document.body.removeChild(textarea);
        }
        // eslint-disable-next-line no-empty
        catch { }
        throw error;
    }

    document.body.removeChild(textarea);
};

// Taken from https://usehooks-ts.com/react-hook/use-copy-to-clipboard
export const useCopyToClipboard = (): CopyFunction => {
    return async (text: string): Promise<void> => {
        // eslint-disable-next-line @typescript-eslint/no-unnecessary-condition
        if (!navigator || !navigator.clipboard) {
            copyToClipboardFallback(text);
            return;
        }

        const result: PermissionStatus = await navigator.permissions.query({ name: "clipboard-write" as PermissionName });

        if (result.state === "denied") {
            throw new Error("Missing permissions to copy to the clipboard.");
        }

        try {
            await navigator.clipboard.writeText(text);
        }
        catch {
            throw new Error("Could not write to the clipboard.");
        }
    };
};
