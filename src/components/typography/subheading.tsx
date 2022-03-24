import { PropsWithChildren, ReactElement } from "react";

export const Subheading = ({ children }: PropsWithChildren<unknown>): ReactElement => (
    <h4 className="font-bold font-serif text-lg mb-4">
        {children}
    </h4 >
);
