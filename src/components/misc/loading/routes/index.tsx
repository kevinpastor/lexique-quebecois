import dynamic from "next/dynamic";
import { ComponentType } from "react";

interface Route {
    matcher: (url: string) => boolean;
    Component: ComponentType;
}

export const routes: Array<Route> = [
    {
        matcher: (url: string): boolean => (
            url === "/"
        ),
        Component: dynamic(
            async (): Promise<{ default: ComponentType }> => ({
                default: (await import("./loading-index")).LoadingIndex
            }),
            { suspense: true }
        )
    },
    {
        matcher: (url: string): boolean => (
            /^\/mots\/[a-z\s]+$/gi.test(url)
        ),
        Component: dynamic(
            async (): Promise<{ default: ComponentType }> => ({
                default: (await import("./loading-word")).LoadingWord
            }),
            { suspense: true }
        )
    },
    {
        matcher: (url: string): boolean => (
            url === "/conditions"
        ),
        Component: dynamic(
            async (): Promise<{ default: ComponentType }> => ({
                default: (await import("./loading-terms")).LoadingTerms
            }),
            { suspense: true }
        )
    },
    {
        matcher: (url: string): boolean => (
            url === "/confidentialite"
        ),
        Component: dynamic(
            async (): Promise<{ default: ComponentType }> => ({
                default: (await import("./loading-privacy")).LoadingPrivacy
            }),
            { suspense: true }
        )
    },
    {
        matcher: (url: string): boolean => (
            url === "/mots"
        ),
        Component: dynamic(
            async (): Promise<{ default: ComponentType }> => ({
                default: (await import("./loading-word-index")).LoadingWordIndex
            }),
            { suspense: true }
        )
    }
    // TODO
    // {
    //     matcher: (url: string): boolean => (
    //         url === "/ajouter"
    //     ),
    //     Component: (): ReactElement => ()
    // },
];
