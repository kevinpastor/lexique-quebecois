import { PropsWithChildren, ReactElement } from "react";

import { NavigationTrackingProvider } from "./navigation-tracking-provider";
import { ReactTrackingProvider } from "./react-tracking-provider";

export const TrackingProvider = ({ children }: PropsWithChildren<unknown>): ReactElement => (
    <ReactTrackingProvider>
        <NavigationTrackingProvider>
            {children}
        </NavigationTrackingProvider>
    </ReactTrackingProvider>
);
