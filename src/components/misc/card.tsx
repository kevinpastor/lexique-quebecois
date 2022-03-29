import { PropsWithChildren, ReactElement } from "react";

export const Card = ({ children }: PropsWithChildren<unknown>): ReactElement => (
    <section className="bg-slate-800 rounded-lg p-8 shadow">
        {children}
    </section>
);