import { PropsWithChildren, ReactElement } from "react";

export const Card = ({ children }: PropsWithChildren<unknown>): ReactElement => (
    <section className="border-2 border-black/[.12] rounded p-4">
        {children}
    </section>
);
