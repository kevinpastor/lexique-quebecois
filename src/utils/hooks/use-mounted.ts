// Taken from https://usehooks-ts.com/react-hook/use-is-mounted
import { useCallback, useEffect, useRef } from "react";

export const useIsMounted = (): (() => boolean) => {
    const isMounted = useRef(false);

    useEffect((): (() => void) => {
        isMounted.current = true;

        return (): void => {
            isMounted.current = false;
        };
    }, []);

    return useCallback((): boolean => (
        isMounted.current
    ), []);
};
