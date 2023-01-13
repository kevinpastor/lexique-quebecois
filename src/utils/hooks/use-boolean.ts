// Taken from https://usehooks-ts.com/react-hook/use-boolean
import { Dispatch, SetStateAction, useEffect, useMemo, useState } from "react";

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

    const setTrue = (): void => {
        setValue(true);
    };

    const setFalse = (): void => {
        setValue(false);
    };

    const toggle = (): void => {
        setValue((oldValue: boolean): boolean => (!oldValue));
    };

    const booleanUtilities: BooleanUtilities = useMemo((): BooleanUtilities => ({
        value,
        setValue,
        setTrue,
        setFalse,
        toggle
    }), [value]);

    return booleanUtilities;
};
