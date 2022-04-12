import { MutableRefObject, useEffect, useRef } from "react";

export const useAutoResize = (): MutableRefObject<HTMLTextAreaElement | undefined> => {
    const ref = useRef<HTMLTextAreaElement>();

    useEffect((): void => {
        const { current: element } = ref;

        if (!element) {
            return;
        }

        element.style.height = "auto";
    }, [ref.current?.value]);

    useEffect((): void => {
        const { current: element } = ref;

        if (!element) {
            return;
        }

        if (element.style.height !== "auto") {
            return;
        }

        element.style.height = `${element.scrollHeight}px`;
    }, [ref.current?.style.height]);

    return ref;
};
