// Taken from https://usehooks-ts.com/react-hook/use-boolean
import { Dispatch, SetStateAction, useCallback, useEffect, useMemo, useState } from "react";

export interface BooleanUtilities {
    value: boolean;
    setValue: Dispatch<SetStateAction<boolean>>;
    setTrue: () => void;
    setFalse: () => void;
    toggle: () => void;
}

export const useBoolean = (initialValue: boolean): BooleanUtilities => {
    const [value, setValue] = useState(initialValue);

    useEffect((): void => {
        setValue(initialValue);
    }, [initialValue]);

    const setTrue = useCallback((): void => {
        setValue(true);
    }, []);

    const setFalse = useCallback((): void => {
        setValue(false);
    }, []);

    const toggle = useCallback((): void => {
        setValue((oldValue: boolean): boolean => (!oldValue));
    }, []);

    const booleanUtilities: BooleanUtilities = useMemo((): BooleanUtilities => ({
        value,
        setValue,
        setTrue,
        setFalse,
        toggle
    }), [setFalse, setTrue, toggle, value]);

    return booleanUtilities;
};
