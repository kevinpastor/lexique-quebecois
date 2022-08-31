import { useSnackbar } from "notistack";
import { useCallback } from "react";

import { useCopyToClipboard } from "./use-copy-to-clipboard";

export const useShare = (path?: string): (() => Promise<void>) => {
    const copy = useCopyToClipboard();
    const { enqueueSnackbar } = useSnackbar();

    const share = useCallback(async (): Promise<void> => {
        const url: string = path
            ? `${window.location.origin}/${path}`
            : window.location.href;

        // eslint-disable-next-line @typescript-eslint/no-unnecessary-condition
        if (navigator.share) {
            try {
                await navigator.share({ url });
                return;
            }
            catch (error: unknown) {
                // Dismissed by user
                if ((error as DOMException).name === "AbortError") {
                    return;
                }
                // Fallback to clipboard
            }
        }

        try {
            await copy(url);
        }
        catch {
            enqueueSnackbar(
                "Impossible de copier le lien.",
                { variant: "error" }
            );
            return;
        }

        enqueueSnackbar("Lien copié dans le presse-papiers.",
            { variant: "success" }
        );
    }, [copy, enqueueSnackbar, path]);

    return share;
};
