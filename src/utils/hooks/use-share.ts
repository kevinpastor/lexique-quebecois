import { useCallback } from "react";

import { useAlerts } from "@utils/hooks/use-alerts";
import { isMobile } from "@utils/misc/device";

import { useCopyToClipboard } from "./use-copy-to-clipboard";

enum ShareBehavior {
    WebShare = "web-share",
    Clipboard = "clipboard"
}

interface Options {
    mobileBehavior?: ShareBehavior;
    desktopBehavior?: ShareBehavior;
}

export const useShare = (
    path?: string,
    {
        mobileBehavior = ShareBehavior.WebShare,
        desktopBehavior = ShareBehavior.Clipboard
    }: Options = {}
): (() => Promise<void>) => {
    const copy = useCopyToClipboard();
    const { enqueueSuccessAlert, enqueueErrorAlert } = useAlerts();

    const share = useCallback(async (): Promise<void> => {
        const url: string = path
            ? `${window.location.origin}/${path}`
            : window.location.href;

        const expectedBehavior: ShareBehavior = isMobile()
            ? mobileBehavior
            : desktopBehavior;

        // eslint-disable-next-line @typescript-eslint/no-unnecessary-condition
        if (navigator.share && expectedBehavior === ShareBehavior.WebShare) {
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

        enqueueSuccessAlert("Lien copié!");
    }, [copy, desktopBehavior, enqueueErrorAlert, enqueueSuccessAlert, mobileBehavior, path]);

    return share;
};
