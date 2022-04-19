import { PropsWithChildren, ReactElement } from "react";

export const ButtonGroup = ({ children }: PropsWithChildren<unknown>): ReactElement => (
    <div>
        <div className="flex gap-[2px] group">
            {children}
        </div>
    </div>
);
