import Link from "next/link";
import classNames from "classnames";
import { PropsWithChildren, ReactElement } from "react";

interface Props {
    href: string;
    breakText?: boolean;
}

export const Hyperlink = ({ href, breakText = false, children }: PropsWithChildren<Props>): ReactElement => (
    href.startsWith("/")
        ? (
            <Link
                href={href}
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
