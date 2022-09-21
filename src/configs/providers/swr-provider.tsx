import { PropsWithChildren, ReactElement } from "react";
import { SWRConfig } from "swr";

import { fetcher } from "@services/fetcher";

export const SWRProvider = ({ children }: PropsWithChildren<unknown>): ReactElement => (
    <SWRConfig value={{ fetcher }}>
        {children}
    </SWRConfig>
);
