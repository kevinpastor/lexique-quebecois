import { Context, createContext } from "react";

export const isInButtonGroupContext: Context<boolean> = createContext<boolean>(false);
isInButtonGroupContext.displayName = "ButtonGroupContext";
