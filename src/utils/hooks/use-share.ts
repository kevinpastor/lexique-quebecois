import { useSnackbar } from "notistack";
import { useCallback } from "react";

import { useCopyToClipboard } from "./use-copy-to-clipboard";

export const useShare = (): (() => Promise<void>) => {
    const copy = useCopyToClipboard();
    const { enqueueSnackbar } = useSnackbar();

    const share = useCallback(async (): Promise<void> => {
        // eslint-disable-next-line @typescript-eslint/no-unnecessary-condition
        if (navigator.share) {
            try {
                await navigator.share({ url: window.location.href });
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
            await copy(window.location.href);
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
    }, [copy, enqueueSnackbar]);

    return share;
};
