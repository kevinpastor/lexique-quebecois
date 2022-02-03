import { ReactElement } from "react";
import { Link } from "react-router-dom";

export const Navigation = (): ReactElement => (
    <nav className="bg-slate-800">
        <div className="container mx-auto py-4">
            <Link to="/">
                <div className="text-white text-2xl font-bold">
                    Québécois Urbain
                </div>
            </Link>
        </div>
    </nav>
);
