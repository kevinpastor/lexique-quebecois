import { MutableRefObject, useEffect, useRef, useState } from "react";

type Height = number | "auto";

type ReturnValue = [
    Height,
    MutableRefObject<HTMLTextAreaElement | undefined>
];

export const useAutoResize = (): ReturnValue => {
    const ref = useRef<HTMLTextAreaElement>();
    const [height, setHeight] = useState<Height>(40);

    useEffect((): void => {
        if (!ref.current) {
            return;
        }

        if (ref.current.tagName !== "TEXTAREA") {
            return;
        }

        setHeight("auto");
    }, [ref.current?.value]);

    useEffect((): void => {
        if (!ref.current) {
            return;
        }

        if (ref.current.tagName !== "TEXTAREA") {
            return;
        }

        const { scrollHeight }: HTMLTextAreaElement = ref.current;

        if (height !== "auto") {
            return;
        }

        setHeight(scrollHeight);
    }, [height]);

    return [
        height,
        ref
    ];
};
