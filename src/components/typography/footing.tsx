import { PropsWithChildren, ReactElement } from "react";

export const Footing = ({ children }: PropsWithChildren<unknown>): ReactElement => (
    <section className="text-slate-400 font-medium">
        {children}
    </section>
);
