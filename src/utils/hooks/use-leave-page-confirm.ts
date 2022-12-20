import { NextRouter, useRouter } from "next/router";
import { MutableRefObject, useEffect } from "react";

import { useBeforeUnload } from "./use-before-unload";
import { useBooleanRef } from "./use-boolean-ref";

// Inspired by https://github.com/vercel/next.js/discussions/9662#discussioncomment-511835
export const useLeavePageConfirmation = (
    requestConfirmation: boolean,
    message: string
): void => {
    useBeforeUnload(requestConfirmation, message);

    const requestConfirmationRef: MutableRefObject<boolean> = useBooleanRef(requestConfirmation);
    const router: NextRouter = useRouter();

    useEffect((): (() => void) => {
        const handler = (): void => {
            if (requestConfirmationRef.current && !window.confirm(message)) {
                router.events.emit("routeChangeError");
                throw "Route change aborted (error can be ignored).";
            }
        };

        router.events.on("routeChangeStart", handler);

        return (): void => {
            router.events.off("routeChangeStart", handler);
        };
    // `requestConfirmationRef` has no real effect on the hook, but it's required to avoid an linter warning.
    }, [router.events, requestConfirmationRef, message]);
};
