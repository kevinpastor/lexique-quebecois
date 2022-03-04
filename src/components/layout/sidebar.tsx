import { ReactElement } from "react";

export const Sidebar = (): ReactElement => (
    <div className="space-y-4">
        <div className="bg-slate-800 rounded-lg p-8 space-y-8">
            <div className="text-xl text-slate-200 font-medium text-center">
                Un peu comme Urban Dictionary, mais québécois.
            </div>
        </div>
        <div className="bg-slate-800 rounded-lg p-8">
            <div className="text-slate-200 text-center">
                Une plateforme pour en apprendre plus sur la culture populaire, peu importe si t&apos;es un ado, un millénial, ou un boomer.
            </div>
        </div>
        <div className="container mx-auto">
            <div className="text-center text-slate-600 font-bold">
                &copy; 2022 Québécois Urbain
            </div>
        </div>
    </div>
);
