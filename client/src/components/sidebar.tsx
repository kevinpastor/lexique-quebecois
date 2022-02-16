import Link from "next/link";
import { ReactElement } from "react";

export const Sidebar = (): ReactElement => (
    <div className="bg-slate-700 rounded-lg p-8 space-y-8">
        <div className="text-lg text-white">
            Urban Dictionary, mais québécois.
        </div>
        <div className="flex justify-center">
            <Link href="/ajouter">
                <a className="bg-blue-500 font-bold  rounded-full  px-8 py-4 text-white text-center">
                    Ajouter un mot
                </a>
            </Link>
        </div>
    </div>
);
