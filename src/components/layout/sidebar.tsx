import { ReactElement } from "react";

export const Sidebar = (): ReactElement => (
    <aside className="space-y-4">
        <div className="bg-slate-800 rounded-lg p-8">
            <div className="text-xl font-medium text-center">
                Un peu comme Urban Dictionary, mais québécois.
            </div>
        </div>
        <div className="bg-slate-800 rounded-lg p-8">
            <div className="text-center">
                Une plateforme pour en apprendre plus sur la culture populaire, peu importe si t&apos;es un ado, un millénial, ou un boomer.
            </div>
        </div>
    </aside>
);
