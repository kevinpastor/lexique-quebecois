import { PropsWithChildren, ReactElement } from "react";

import { IButtonGroupContext, ButtonGroupContext } from "./context";

const value: IButtonGroupContext = {
    isInGroup: true
};

export const ButtonGroup = ({ children }: PropsWithChildren<unknown>): ReactElement => (
    <ButtonGroupContext.Provider value={value}>
        <div className="flex">
            {children}
        </div>
    </ButtonGroupContext.Provider>
);
