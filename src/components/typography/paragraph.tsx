import { PropsWithChildren, ReactElement } from "react";

export const Paragraph = ({ children }: PropsWithChildren<unknown>): ReactElement => (
    <p className="mb-4">
        {children}
    </p>
);
