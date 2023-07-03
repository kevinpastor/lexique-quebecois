import { useCallback, useState } from "react";

export interface QueueUtility<T> {
    queue: ReadonlyArray<T>;
    enqueue: (item: T) => void;
    dequeue: () => void;
}

export const useQueue = <T>(initialValue: Array<T> = []): QueueUtility<T> => {
    const [queue, setQueue] = useState<ReadonlyArray<T>>(initialValue);

    const enqueue = useCallback((item: T): void => {
        setQueue((prevState: ReadonlyArray<T>): ReadonlyArray<T> => ([
            ...prevState,
            item
        ]));
    }, []);

    const dequeue = useCallback((): void => {
        setQueue((prevState: ReadonlyArray<T>): ReadonlyArray<T> => (
            prevState.slice(1)
        ));
    }, []);

    return {
        queue,
        enqueue,
        dequeue
    };
};
