// Taken from https://usehooks-ts.com/react-hook/use-boolean
import { Dispatch, SetStateAction, useState } from "react";

export interface BooleanUtilities {
    value: boolean;
    setValue: Dispatch<SetStateAction<boolean>>;
    setTrue: () => void;
    setFalse: () => void;
    toggle: () => void;
}

export const useBoolean = (initialValue: boolean): BooleanUtilities => {
    const [value, setValue] = useState(initialValue);

    const setTrue = (): void => {
        setValue(true);
    };

    const setFalse = (): void => {
        setValue(false);
    };

    const toggle = (): void => {
        setValue((oldValue: boolean): boolean => (
            !oldValue
        ));
    };

    return {
        value,
        setValue,
        setTrue,
        setFalse,
        toggle
    };
};
