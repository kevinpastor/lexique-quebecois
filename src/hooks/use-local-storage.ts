import { Dispatch, SetStateAction, useCallback, useDebugValue, useEffect, useState } from "react";

import { parseJSON } from "~/utils/misc/string";

import { useBoolean } from "./use-boolean";
import { useEventCallback } from "./use-event-callback";
import { useEventListener } from "./use-event-listener";

type SetValue<T> = Dispatch<SetStateAction<T>>;

export interface LocalStorageUtilities<T> {
    value: T;
    setValue: SetValue<T>;
    isSynced: boolean;
}

// Taken from https://usehooks-ts.com/react-hook/use-local-storage
export const useLocalStorage = <T>(key: string, initialValue: T): LocalStorageUtilities<T> => {
    const {
        value: isSynced,
        setTrue: sync
    } = useBoolean(false);

    // Get from local storage then
    // parse stored json or return initialValue
    const readValue = useCallback((): T => {
        try {
            const item: string | null = window.localStorage.getItem(key);
            return item
                ? parseJSON(item) as T // We take for granted that the type is correct.
                : initialValue;
        }
        catch (error: unknown) {
            console.warn(`Error reading localStorage key “${key}”:`, error);
            return initialValue;
        }
    }, [initialValue, key]);

    // State to store our value
    // Pass initial state function to useState so logic is only executed once
    const [storedValue, setStoredValue] = useState<T>(initialValue);
    useDebugValue(storedValue);

    useEffect((): void => {
        setStoredValue(readValue());
        sync();
    }, [readValue, sync]);

    // Return a wrapped version of useState's setter function that persists the
    // new value to localStorage.
    const setValue: SetValue<T> = useEventCallback((value: SetStateAction<T>): void => {
        try {
            // Allow value to be a function so we have the same API as useState
            const newValue: T = value instanceof Function ? value(storedValue) : value;

            // Save to local storage
            window.localStorage.setItem(key, JSON.stringify(newValue));

            // Save state
            setStoredValue(newValue);

            // We dispatch a custom event so every useLocalStorage hook are notified
            window.dispatchEvent(new Event("local-storage"));
        }
        catch (error: unknown) {
            console.warn(`Error setting localStorage key “${key}”:`, error);
        }
    });

    const handleStorageChange = useCallback((event: Event | StorageEvent): void => {
        if ((event as StorageEvent).key && (event as StorageEvent).key !== key) {
            return;
        }

        setStoredValue(readValue());
    }, [key, readValue]);

    // this only works for other documents, not the current one
    useEventListener("storage", handleStorageChange);

    // this is a custom event, triggered in setValue
    useEventListener("local-storage", handleStorageChange);

    return {
        value: storedValue,
        setValue,
        isSynced
    };
};
