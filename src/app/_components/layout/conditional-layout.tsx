"use client";

import { usePathname } from "next/navigation";
import { type PropsWithChildren, type ReactNode } from "react";

interface Props {
    fallback: ReactNode;
}

export const ConditionalLayout = ({ children, fallback }: PropsWithChildren<Props>): ReactNode => {
    const pathname: string = usePathname();

    if (pathname === "/rechercher") {
        return fallback;
    }

    return children;
};
