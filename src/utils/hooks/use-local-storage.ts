import { Dispatch, SetStateAction, useCallback, useEffect, useState } from "react";

import { parseJSON } from "@utils/misc/string";

import { useEventCallback } from "./use-event-callback";
import { useEventListener } from "./use-event-listener";

type SetValue<T> = Dispatch<SetStateAction<T>>;

// Taken from https://usehooks-ts.com/react-hook/use-local-storage
export const useLocalStorage = <T>(key: string, initialValue: T): [T, SetValue<T>] => {
    // Get from local storage then
    // parse stored json or return initialValue
    const readValue = useCallback((): T => {
        // Prevent build error "window is undefined" but keep keep working
        if (typeof window === "undefined") {
            return initialValue;
        }

        try {
            const item: string | null = window.localStorage.getItem(key);
            return item
                ? parseJSON<T>(item)
                : initialValue;
        }
        catch (error: unknown) {
            console.warn(`Error reading localStorage key “${key}”:`, error);
            return initialValue;
        }
    }, [initialValue, key]);

    // State to store our value
    // Pass initial state function to useState so logic is only executed once
    const [storedValue, setStoredValue] = useState<T>(readValue);

    // Return a wrapped version of useState's setter function that ...
    // ... persists the new value to localStorage.
    const setValue: SetValue<T> = useEventCallback((value: SetStateAction<T>): void => {
        // Prevent build error "window is undefined" but keeps working
        if (typeof window === "undefined") {
            console.warn(`Tried setting localStorage key “${key}” even though environment is not a client`);
        }

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

    useEffect((): void => {
        setStoredValue(readValue());
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, []);

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

    return [storedValue, setValue];
};
