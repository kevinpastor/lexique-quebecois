import { useEffect } from "react";

import { useBoolean } from "./use-boolean";

export const useHasClientLoaded = (): boolean => {
    const { value, setTrue } = useBoolean(false);

    useEffect((): void => {
        setTrue();
    }, [setTrue]);

    return value;
};
