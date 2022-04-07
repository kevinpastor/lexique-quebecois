import classNames from "classnames";
import Link from "next/link";
import { PropsWithChildren, ReactElement } from "react";

interface Props {
    href: string;
    breakText?: boolean;
    prefetch?: false;
}

export const Hyperlink = ({
    href,
    breakText = false,
    prefetch,
    children
}: PropsWithChildren<Props>): ReactElement => (
    href.startsWith("/")
        ? (
            <Link
                href={href}
                prefetch={prefetch}
            >
                <a
                    href={href}
                    className={
                        classNames(
                            "text-blue-500 hover:text-blue-400 transition",
                            { "break-all": breakText }
                        )
                    }
                >
                    {children}
                </a>
            </Link>
        )
        : (
            <a
                href={href}
                target="_blank"
                rel="noreferrer nofollow"
                className={
                    classNames(
                        "text-blue-500 hover:text-blue-400 transition",
                        { "break-all": breakText }
                    )
                }
            >
                {children}
            </a>
        )
);
