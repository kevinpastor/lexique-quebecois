import { PropsWithChildren, ReactElement } from "react";

import { Hyperlink } from "./hyperlink";

interface Props {
    href?: string;
}

export const Title = ({ href, children }: PropsWithChildren<Props>): ReactElement => (
    <header>
        <h2 className="text-3xl sm:text-4xl font-bold font-serif mb-4">
            {href
                ? (
                    <Hyperlink href={href}>
                        {children}
                    </Hyperlink>
                )
                : children
            }
        </h2>
    </header>
);
