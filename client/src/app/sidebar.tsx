import { ReactElement } from "react";

export const Sidebar = (): ReactElement => (
    <div className="bg-slate-700 rounded-lg p-8 space-y-4">
        <div className="text-2xl text-white">
            Urban Dictionary, mais québécois.
        </div>
        <div>
            Ajouter un mot
        </div>
    </div>
);
