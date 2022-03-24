import { PropsWithChildren, ReactElement } from "react";

export const List = ({ children }: PropsWithChildren<unknown>): ReactElement => (
    <ul className="mb-4 list-disc ml-6">
        {children}
    </ul>
);
