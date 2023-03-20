import { MutableRefObject, useCallback } from "react";

import { useBooleanRef } from "./use-boolean-ref";
import { useEventListener } from "./use-event-listener";

// Inspired by https://stackoverflow.com/questions/63664479/detect-when-a-user-leaves-page-in-next-js
export const useBeforeUnload = (hasUnsavedChanges: boolean, message: string): void => {
    const hasUnsavedChangesRef: MutableRefObject<boolean> = useBooleanRef(hasUnsavedChanges);

    const onBeforeUnload = useCallback((event: BeforeUnloadEvent): string | undefined => {
        if (!hasUnsavedChangesRef.current) {
            return;
        }

        event.preventDefault();
        event.returnValue = message;

        return message;
    // Since `hasUnsavedChangesRef` is a ref, it will never change.
    }, [hasUnsavedChangesRef, message]);

    useEventListener("beforeunload", onBeforeUnload);
};
