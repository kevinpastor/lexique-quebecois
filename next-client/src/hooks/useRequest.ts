import { useEffect, useState } from "react";
import { Status } from "@models/status";

interface InitialState {
    status: Status.initial;
}

interface LoadingState {
    status: Status.loading;
}

interface FailedState {
    status: Status.failed;
}

interface SuccessState<T> {
    status: Status.success;
    response: T;
}

export type State<T> = InitialState | LoadingState | FailedState | SuccessState<T>;

export const useRequest = <T>(endpoint: string): State<T> => {
    const [state, setState] = useState<State<T>>({
        status: Status.initial
    });

    useEffect((): void => {
        setState({
            status: Status.loading
        });

        const request = async (): Promise<void> => {
            const response: Response = await fetch(endpoint);
            if (!response.ok) {
                setState({
                    status: Status.failed
                });
            }

            const parsedBody = await response.json();
            setState({
                status: Status.success,
                response: parsedBody
            });
        };

        request();
    }, [endpoint]);

    return state;
};
