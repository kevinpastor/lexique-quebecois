import { PropsWithChildren, ReactElement } from "react";

export const Section = ({ children }: PropsWithChildren<unknown>): ReactElement => (
    <section className="mb-4">
        {children}
    </section>
);
