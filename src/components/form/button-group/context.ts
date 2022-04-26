import { Context, createContext } from "react";

export interface IButtonGroupContext {
    isInGroup: boolean;
}

export const ButtonGroupContext: Context<IButtonGroupContext> = createContext<IButtonGroupContext>({
    isInGroup: false
});
ButtonGroupContext.displayName = "ButtonGroupContext";
