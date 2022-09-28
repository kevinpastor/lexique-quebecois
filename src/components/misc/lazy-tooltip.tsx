import type { TooltipProps } from "@mui/material";
import dynamic from "next/dynamic";
import { ComponentType, ReactElement, Suspense } from "react";

const LazyMuiTooltip = dynamic(
    async (): Promise<{ default: ComponentType<TooltipProps> }> => ({
        default: (await import("@mui/material/Tooltip")).default
    }),
    { suspense: true }
);

export const LazyTooltip = ({ children, ...rest }: TooltipProps): ReactElement => (
    <Suspense fallback={children}>
        <LazyMuiTooltip {...rest}>
            {children}
        </LazyMuiTooltip>
    </Suspense>
);
