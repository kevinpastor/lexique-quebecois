import { init, track } from "@amplitude/analytics-browser";
import { PropsWithChildren, ReactElement, useEffect } from "react";
import { useTracking, Options } from "react-tracking";

import { TrackingData } from "./tracking-data";

const getAmplitudeApiKey = (): string => {
    if (!process.env["NEXT_PUBLIC_AMPLITUDE_API_KEY"]) {
        throw new Error("NEXT_PUBLIC_AMPLITUDE_API_KEY environment variable is not set.");
    }

    return process.env["NEXT_PUBLIC_AMPLITUDE_API_KEY"];
};

export const ReactTrackingProvider = ({ children }: PropsWithChildren<unknown>): ReactElement => {
    useEffect((): void => {
        const apiKey: string = getAmplitudeApiKey();

        init(apiKey);
    }, []);

    const options: Options<TrackingData> = {
        dispatch: ({ event, properties }: TrackingData): void => {
            track(event, properties);
        }
    };
    const { Track } = useTracking({}, options);

    return (
        <Track>
            {children}
        </Track>
    );
};
