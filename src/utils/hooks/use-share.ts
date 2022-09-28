import { useCallback } from "react";

import { useAlerts } from "@utils/hooks/use-alerts";

import { useCopyToClipboard } from "./use-copy-to-clipboard";

export const useShare = (path?: string): (() => Promise<void>) => {
    const copy = useCopyToClipboard();
    const { enqueueSuccessAlert, enqueueErrorAlert } = useAlerts();

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
            enqueueErrorAlert("Impossible de copier le lien.");
            return;
        }

        enqueueSuccessAlert("Lien copié dans le presse-papiers.");
    }, [copy, enqueueErrorAlert, enqueueSuccessAlert, path]);

    return share;
};
