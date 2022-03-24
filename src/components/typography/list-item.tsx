import { PropsWithChildren, ReactElement } from "react";

export const ListItem = ({ children }: PropsWithChildren<unknown>): ReactElement => (
    <li className="mb-2">
        {children}
    </li>
);
