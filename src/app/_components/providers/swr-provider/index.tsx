import { type PropsWithChildren, type ReactNode } from "react";
import { SWRConfig } from "swr";

import { fetcher } from "./fetcher";

type Config = Parameters<typeof SWRConfig>[0]["value"];

const value: Config = {
    fetcher
};

export const SWRProvider = ({ children }: PropsWithChildren): ReactNode => (
    <SWRConfig value={value}>
        {children}
    </SWRConfig>
);
