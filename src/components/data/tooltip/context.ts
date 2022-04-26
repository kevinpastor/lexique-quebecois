import { Context, createContext } from "react";

export interface ITooltipContext {
    hasTooltip: boolean;
}

export const TooltipContext: Context<ITooltipContext> = createContext<ITooltipContext>({
    hasTooltip: false
});
TooltipContext.displayName = "TooltipContext";
