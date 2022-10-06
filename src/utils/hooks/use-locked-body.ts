import { Dispatch, SetStateAction } from "react";

import { useBoolean, BooleanUtilities } from "./use-boolean";
import { useIsomorphicLayoutEffect } from "./use-isomorphic-layout-effect";

type ReturnType = [boolean, Dispatch<SetStateAction<boolean>>];

// Taken from https://usehooks-ts.com/react-hook/use-locked-body
export const useLockedBody = (): ReturnType => {
    const {
        value: locked,
        setValue: setLocked
    }: BooleanUtilities = useBoolean(false);

    useIsomorphicLayoutEffect((): (() => void) | undefined => {
        const originalOverflow: string = document.body.style.overflow;
        if (locked) {
            document.body.style.overflow = "hidden";
        }
        else {
            document.body.style.overflow = "auto";
        }

        return (): void => {
            document.body.style.overflow = originalOverflow;
        };
    }, [locked]);

    return [locked, setLocked];
};
