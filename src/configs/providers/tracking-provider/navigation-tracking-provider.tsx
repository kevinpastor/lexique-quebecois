import { useRouter } from "next/router";
import { PropsWithChildren, ReactElement, useEffect } from "react";
import { useTracking as useReactTracking } from "react-tracking";

import { TrackingData } from "./tracking-data";

export const NavigationTrackingProvider = ({ children }: PropsWithChildren<unknown>): ReactElement => {
    const { asPath } = useRouter();
    const { trackEvent } = useReactTracking<TrackingData>();

    useEffect((): void => {
        trackEvent({
            event: "view page",
            properties: { path: asPath }
        });
    }, [asPath, trackEvent]);

    return (
        <>
            {children}
        </>
    );
};
