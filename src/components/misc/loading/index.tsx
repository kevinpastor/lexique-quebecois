import { PropsWithChildren, ReactElement, useEffect } from "react";

import { useLockedBody } from "@utils/hooks/use-locked-body";

import { ProgressIndicator } from "./progress-indicator";
import { routes } from "./routes";
import { useLoadingUrl } from "./use-loading-url";

export const Loading = ({ children }: PropsWithChildren<unknown>): ReactElement => {
    const loadingUrl: string | undefined = useLoadingUrl();
    const [_, setIsLocked] = useLockedBody();

    useEffect((): void => {
        if (!loadingUrl) {
            setIsLocked(false);
            return;
        }

        const hasMatch: boolean = routes.some(({ matcher }): boolean => (matcher(loadingUrl)));
        if (hasMatch) {
            setIsLocked(true);
            window.scrollTo(0, 0);
        }
    }, [loadingUrl, setIsLocked]);

    if (loadingUrl) {
        for (const { matcher, Component } of routes) {
            if (matcher(loadingUrl)) {
                return <Component />;
            }
        }

        return (
            <>
                {children}
                <ProgressIndicator />
            </>
        );
    }

    return (
        <>
            {children}
        </>
    );
};

