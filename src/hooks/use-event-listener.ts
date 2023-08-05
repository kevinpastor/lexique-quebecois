import { type MutableRefObject, useEffect, useRef } from "react";

import { useIsomorphicLayoutEffect } from "./use-isomorphic-layout-effect";

export const useEventListener = (
    eventName: string,
    handler: EventListener,
    options?: boolean | AddEventListenerOptions
): void => {
    const savedHandler: MutableRefObject<EventListener> = useRef(handler);

    useIsomorphicLayoutEffect((): void => {
        savedHandler.current = handler;
    }, [handler]);

    useEffect((): (() => void) => {
        const listener = (event: Event): void => {
            savedHandler.current(event);
        };

        window.addEventListener(eventName, listener, options);

        return (): void => {
            window.removeEventListener(eventName, listener);
        };
    }, [eventName, options]);
};
