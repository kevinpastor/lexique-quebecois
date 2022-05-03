/* eslint-disable react/no-multi-comp */
import { NextRouter, useRouter } from "next/router";
import { PropsWithChildren, ReactElement, useEffect, useState } from "react";

import { useLockedBody } from "@utils/hooks/use-locked-body";

import { LoadingArticle } from "./loading-article";
import { LoadingWord } from "./loading-word";

const routes = [
    {
        matcher: (url: string): boolean => (
            url === "/"
        ),
        Component: (): ReactElement => (
            <div className="space-y-4">
                <LoadingWord />
                <LoadingWord />
                <LoadingWord />
                <LoadingWord />
                <LoadingWord />
            </div>
        )
    },
    {
        matcher: (url: string): boolean => (
            /^\/mots\/[a-z\s]+$/gi.test(url)
        ),
        Component: (): ReactElement => (
            <LoadingWord />
        )
    },
    {
        matcher: (url: string): boolean => (
            url === "/conditions"
        ),
        Component: (): ReactElement => (
            <LoadingArticle />
        )
    },
    {
        matcher: (url: string): boolean => (
            url === "/confidentialite"
        ),
        Component: (): ReactElement => (
            <LoadingArticle />
        )
    }
    // TODO
    // {
    //     matcher: (url: string): boolean => (
    //         url === "/ajouter"
    //     ),
    //     Component: (): ReactElement => ()
    // },
    // {
    //     matcher: (url: string): boolean => (
    //         url === "/mots"
    //     ),
    //     Component: (): ReactElement => ()
    // }
];

export const Loading = ({ children }: PropsWithChildren<unknown>): ReactElement => {
    const router: NextRouter = useRouter();
    const [loadingUrl, setLoadingUrl] = useState<string | undefined>(undefined);
    const [_, setIsLocked] = useLockedBody();

    useEffect((): (() => void) => {
        const handleRouteChangeStart = (url: string): void => {
            setLoadingUrl(url);

            const hasMatch: boolean = routes.some(({ matcher }): boolean => (matcher(url)));
            if (hasMatch) {
                setIsLocked(true);
                window.scrollTo(0, 0);
            }
        };
        router.events.on("routeChangeStart", handleRouteChangeStart);

        const handleRouteChangeComplete = (): void => {
            setLoadingUrl(undefined);
            setIsLocked(false);
        };
        router.events.on("routeChangeComplete", handleRouteChangeComplete);

        const handleRouteChangeError = (): void => {
            setLoadingUrl(undefined);
            setIsLocked(false);
        };
        router.events.on("routeChangeError", handleRouteChangeError);

        return (): void => {
            router.events.off("routeChangeStart", handleRouteChangeStart);
            router.events.off("routeChangeComplete", handleRouteChangeStart);
            router.events.off("routeChangeError", handleRouteChangeStart);
        };
    }, [router.events, setIsLocked]);

    if (loadingUrl) {
        for (const { matcher, Component } of routes) {
            if (matcher(loadingUrl)) {
                return <Component />;
            }
        }

        return (
            <>
                {children}
                <div className="fixed top-0 left-0 right-0 z-50 h-1 bg-slate-700 overflow-hidden">
                    <div className="absolute bg-blue-500 h-1 animate-progress-increase" />
                    <div className="absolute bg-blue-500 h-1 animate-progress-decrease" />
                </div>
            </>
        );
    }

    return (
        <>
            {children}
        </>
    );
};

