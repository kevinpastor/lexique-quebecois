import type { TooltipProps } from "@mui/material";
import { ComponentType, ReactElement, useCallback } from "react";

import { LazyWrapper } from "./lazy-wrapper";

export const LazyTooltip = ({ children, ...rest }: TooltipProps): ReactElement => {
    const Wrapper = useCallback(async (): Promise<ComponentType<TooltipProps>> => (
        (await import("@mui/material/Tooltip")).default
    ), []);

    return (
        <LazyWrapper
            Wrapper={Wrapper}
            {...rest}
        >
            {children}
        </LazyWrapper>
    );
};
