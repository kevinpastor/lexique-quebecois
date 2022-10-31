import { MutableRefObject, useRef, useEffect } from "react";

export const useBooleanRef = (value: boolean): MutableRefObject<boolean> => {
    const ref: MutableRefObject<boolean> = useRef(value);

    useEffect((): void => {
        ref.current = value;
    }, [value]);

    return ref;
};
