import { PropsWithChildren, ReactElement } from "react";

import { isInButtonGroupContext } from "./context";

export const ButtonGroup = ({ children }: PropsWithChildren<unknown>): ReactElement => (
    // eslint-disable-next-line react/jsx-boolean-value
    <isInButtonGroupContext.Provider value={true}>
        <div className="flex gap-[2px]">
            {children}
        </div>
    </isInButtonGroupContext.Provider>
);
