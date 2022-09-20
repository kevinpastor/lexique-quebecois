import { useEffect, useState } from "react";

export const useDebounce = <T>(value: T, delay: number = 100): T => {
    const [debouncedValue, setDebouncedValue] = useState<T>(value);

    useEffect((): (() => void) => {
        const timer: NodeJS.Timeout = setTimeout((): void => {
            setDebouncedValue(value);
        }, delay);

        return (): void => {
            clearTimeout(timer);
        };
    }, [value, delay]);

    return debouncedValue;
};
