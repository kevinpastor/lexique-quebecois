import type { TooltipProps } from "@mui/material";
import dynamic from "next/dynamic";
import { ComponentType, ReactElement, useCallback, useMemo } from "react";

export const LazyTooltip = ({ children, ...rest }: TooltipProps): ReactElement => {
    const fallback = useCallback((): ReactElement => (
        <>
            {children}
        </>
    ), [children]);

    const DynamicTooltip = useMemo((): ComponentType<TooltipProps> => (
        dynamic(
            async (): Promise<ComponentType<TooltipProps>> => (
                (await import("@mui/material/Tooltip")).default
            ),
            {
                ssr: false,
                loading: fallback
            }
        )
    ), [fallback]);

    return (
        <DynamicTooltip {...rest}>
            {children}
        </DynamicTooltip>
    );
};
