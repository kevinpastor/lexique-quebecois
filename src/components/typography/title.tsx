import { PropsWithChildren, ReactElement } from "react";
import Link from "next/link";

interface Props {
    href?: string;
}

export const Title = ({ href, children }: PropsWithChildren<Props>): ReactElement => (
    <header>
        <h2 className="text-3xl sm:text-4xl font-bold font-serif mb-4">
            {href
                ? (
                    <Link href={href}>
                        <a className="text-blue-500 hover:text-blue-400 transition">
                            {children}
                        </a>
                    </Link>
                )
                : children
            }
        </h2>
    </header>
);
