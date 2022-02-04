import { ReactElement } from "react";

export const Add = (): ReactElement => (
    <section className="bg-slate-700 rounded-lg p-8 space-y-4">
        <div className="text-3xl font-bold text-white">
            Ajouter un mot
        </div>
        <div className="space-y-1">
            <div className="text-white">
                Mot *
            </div>
            <input className="rounded bg-slate-500 p-2 outline-none text-white w-full" />
        </div>
        <div className="space-y-1">
            <div className="text-white">
                Définition *
            </div>
            <textarea className="rounded bg-slate-500 p-2 outline-none text-white w-full resize-none" />
        </div>
        <div className="space-y-1">
            <div className="text-white">
                Exemple
            </div>
            <input className="rounded bg-slate-500 p-2 outline-none text-white w-full" />
        </div>
    </section>
);
