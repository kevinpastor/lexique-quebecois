import { PropsWithChildren, ReactElement } from "react";

export const Footing = ({ children }: PropsWithChildren<unknown>): ReactElement => (
    <section className="text-black/[.87] font-medium">
        {children}
    </section>
);
