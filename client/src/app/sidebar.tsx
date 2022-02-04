import { ReactElement } from "react";
import { Link } from "react-router-dom";

export const Sidebar = (): ReactElement => (
    <div className="bg-slate-700 rounded-lg p-8 space-y-8">
        <div className="text-lg text-white">
            Urban Dictionary, mais québécois.
        </div>
        <div>
            <Link to="/ajouter">
                <div className="bg-blue-500 font-bold  rounded-full p-4 text-white text-center">
                    Ajouter un mot
                </div>
            </Link>
        </div>
    </div>
);
