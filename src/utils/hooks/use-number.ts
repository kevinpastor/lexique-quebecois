import { Dispatch, SetStateAction, useState } from "react";

export interface NumberUtilities {
    value: number;
    setValue: Dispatch<SetStateAction<number>>;
    increment: () => void;
    decrement: () => void;
}

export const useNumber = (initialValue: number): NumberUtilities => {
    const [value, setValue] = useState(initialValue);

    const increment = (): void => {
        setValue((oldValue: number): number => (oldValue + 1));
    };

    const decrement = (): void => {
        setValue((oldValue: number): number => (oldValue - 1));
    };

    return {
        value,
        setValue,
        increment,
        decrement
    };
};
