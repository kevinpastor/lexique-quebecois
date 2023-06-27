import { usePathname } from "next/navigation";
import { PropsWithChildren, ReactElement, useEffect } from "react";
import { useTracking as useReactTracking } from "react-tracking";

import { TrackingData } from "./tracking-data";

export const NavigationTrackingProvider = ({ children }: PropsWithChildren<unknown>): ReactElement => {
    const pathname = usePathname();
    const { trackEvent } = useReactTracking<TrackingData>();

    useEffect((): void => {
        trackEvent({
            event: "view page",
            properties: { path: pathname }
        });
    }, [pathname, trackEvent]);

    return (
        <>
            {children}
        </>
    );
};
