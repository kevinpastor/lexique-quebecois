import { useEffect } from "react";

import { useBoolean } from "@utils/hooks/use-boolean";

export const useHasClientLoaded = (): boolean => {
    const { value, setTrue } = useBoolean(false);

    useEffect((): void => {
        setTrue();
    }, [setTrue]);

    return value;
};
