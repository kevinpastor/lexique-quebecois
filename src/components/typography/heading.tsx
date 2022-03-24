import { PropsWithChildren, ReactElement } from "react";

export const Heading = ({ children }: PropsWithChildren<unknown>): ReactElement => (
    <h3 className="font-bold font-serif text-2xl mb-4">
        {children}
    </h3 >
);
