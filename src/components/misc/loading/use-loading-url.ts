import { NextRouter, useRouter } from "next/router";
import { useEffect, useState } from "react";

export const useLoadingUrl = (): string | undefined => {
    const router: NextRouter = useRouter();
    const [loadingUrl, setLoadingUrl] = useState<string | undefined>(undefined);

    useEffect((): (() => void) => {
        const handleRouteChangeStart = (url: string): void => {
            setLoadingUrl(url);
        };
        router.events.on("routeChangeStart", handleRouteChangeStart);

        const handleRouteChangeComplete = (): void => {
            setLoadingUrl(undefined);
        };
        router.events.on("routeChangeComplete", handleRouteChangeComplete);

        const handleRouteChangeError = (): void => {
            setLoadingUrl(undefined);
        };
        router.events.on("routeChangeError", handleRouteChangeError);

        return (): void => {
            router.events.off("routeChangeStart", handleRouteChangeStart);
            router.events.off("routeChangeComplete", handleRouteChangeStart);
            router.events.off("routeChangeError", handleRouteChangeStart);
        };
    }, [router.events]);

    return loadingUrl;
};
