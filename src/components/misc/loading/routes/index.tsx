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
        Component: dynamic(async (): Promise<{ default: ComponentType }> => ({
            default: (await import("./loading-index")).LoadingIndex
        }))
    },
    {
        matcher: (url: string): boolean => (
            /^\/mots\/[a-z\s]+$/gi.test(url)
        ),
        Component: dynamic(async (): Promise<{ default: ComponentType }> => ({
            default: (await import("./loading-word")).LoadingWord
        }))
    },
    {
        matcher: (url: string): boolean => (
            url === "/mots"
        ),
        Component: dynamic(async (): Promise<{ default: ComponentType }> => ({
            default: (await import("./loading-word-index")).LoadingWordIndex
        }))
    }
];
