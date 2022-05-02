import { Dispatch, SetStateAction, useState } from "react";

import { useIsomorphicLayoutEffect } from "./use-isomorphic-layout-effect";

type ReturnType = [boolean, Dispatch<SetStateAction<boolean>>];

// Taken from https://usehooks-ts.com/react-hook/use-locked-body
export const useLockedBody = (): ReturnType => {
    const [locked, setLocked] = useState(false);

    useIsomorphicLayoutEffect((): (() => void) | undefined => {
        if (!locked) {
            return;
        }

        const originalOverflow: string = document.body.style.overflow;
        document.body.style.overflow = "hidden";

        return (): void => {
            document.body.style.overflow = originalOverflow;
        };
    }, [locked]);

    return [locked, setLocked];
};
