import dynamic from "next/dynamic";
import { ComponentType } from "react";

import { ProgressIndicator } from "../progress-indicator";

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
            async (): Promise<ComponentType> => (
                (await import("./loading-index")).LoadingIndex
            ),
            {
                loading: ProgressIndicator
            }
        )
    },
    {
        matcher: (url: string): boolean => (
            /^\/mots\/[a-z\s]+$/gi.test(url)
        ),
        Component: dynamic(
            async (): Promise<ComponentType> => (
                (await import("./loading-word")).LoadingWord
            ),
            {
                loading: ProgressIndicator
            }
        )
    },
    {
        matcher: (url: string): boolean => (
            url === "/conditions"
        ),
        Component: dynamic(
            async (): Promise<ComponentType> => (
                (await import("./loading-terms")).LoadingTerms
            ),
            {
                loading: ProgressIndicator
            }
        )
    },
    {
        matcher: (url: string): boolean => (
            url === "/confidentialite"
        ),
        Component: dynamic(
            async (): Promise<ComponentType> => (
                (await import("./loading-privacy")).LoadingPrivacy
            ),
            {
                loading: ProgressIndicator
            }
        )
    },
    {
        matcher: (url: string): boolean => (
            url === "/mots"
        ),
        Component: dynamic(
            async (): Promise<ComponentType> => (
                (await import("./loading-word-index")).LoadingWordIndex
            ),
            {
                loading: ProgressIndicator
            }
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
