import { type MutableRefObject, useCallback, useRef } from "react";

import { useIsomorphicLayoutEffect } from "./use-isomorphic-layout-effect";

type Callback<Args extends Array<unknown>, ReturnType> = (...args: Args) => ReturnType;

export const useEventCallback = <
    Args extends Array<unknown>,
    ReturnType
>(callback: Callback<Args, ReturnType>): Callback<Args, ReturnType> => {
    const ref: MutableRefObject<Callback<Args, ReturnType>> = useRef<Callback<Args, ReturnType>>(() => {
        throw new Error("Cannot call an event handler while rendering.");
    });

    useIsomorphicLayoutEffect((): void => {
        ref.current = callback;
    }, [callback]);

    return useCallback((...args: Args): ReturnType => (
        ref.current(...args)
    ), [ref]);
};
