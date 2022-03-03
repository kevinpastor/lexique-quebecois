import { ReactElement } from "react";

export const ErrorCard = (): ReactElement => (
    <section className="bg-slate-800 rounded-lg p-8 space-y-4">
        <div className="text-4xl font-bold text-white font-serif">
            Une erreur s&apos;est produite
        </div>
        <div className="text-white font-medium">
            Impossible de charger l&apos;information
        </div>
    </section>
);