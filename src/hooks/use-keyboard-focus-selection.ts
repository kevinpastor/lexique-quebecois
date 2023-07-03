import { MutableRefObject, useCallback, useRef } from "react";

import { useEventListener } from "./use-event-listener";

export interface KeyboardFocusSelectionUtility {
    itemRef: (index: number) => (element: HTMLElement | null) => void;
}

const isFocused = (element: HTMLElement | null): boolean => {
    return element === document.activeElement;
};

export const useKeyboardFocusSelection = (): KeyboardFocusSelectionUtility => {
    const elementRefs: MutableRefObject<Array<HTMLElement | null>> = useRef<Array<HTMLElement | null>>([]);

    const keydownListener = useCallback((event: Event): void => {
        if (!(event instanceof KeyboardEvent)) {
            return;
        }

        const focusedElementIndex: number = elementRefs.current.findIndex(isFocused);
        if (focusedElementIndex === -1) {
            return;
        }

        if (event.key === "ArrowDown") {
            if (focusedElementIndex === elementRefs.current.length - 1) {
                return;
            }

            // Prevents the cursor from losing its position in the input.
            event.preventDefault();

            const element: HTMLElement | null = elementRefs.current[focusedElementIndex + 1];
            element?.focus();
        }
        else if (event.key === "ArrowUp") {
            if (focusedElementIndex === 0) {
                return;
            }

            // Prevents the cursor from losing its position in the input.
            event.preventDefault();

            const element: HTMLElement | null = elementRefs.current[focusedElementIndex - 1];
            element?.focus();
        }
    }, []);
    useEventListener("keydown", keydownListener);

    return {
        itemRef: (index: number) => (element: HTMLElement | null): void => {
            elementRefs.current[index] = element;
        }
    };
};
