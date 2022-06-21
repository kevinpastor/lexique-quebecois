import { PropsWithChildren, ReactElement } from "react";

export const Paragraph = ({ children }: PropsWithChildren<unknown>): ReactElement => (
    <div className="mb-4">
        {children}
    </div>
);
