import { ReactElement } from "react";
import { Link, useNavigate } from "react-router-dom";

export const Navigation = (): ReactElement => {
    const navigate = useNavigate();

    const onSubmit = (event: any): void => {
        event.preventDefault();
        const label: string = event.target.label.value;
        navigate(`/definitions/${label}`);
    };

    return (
        <nav className="bg-slate-800">
            <div className="container mx-auto py-4 flex flex-row justify-between">
                <Link to="/">
                    <div className="text-white text-2xl font-bold">
                        Québécois Urbain
                    </div>
                </Link>
                <form onSubmit={onSubmit}>
                    <input
                        name="label"
                        placeholder="Rechercher"
                        className="placeholder-slate-200 basis-1/4 rounded bg-slate-500 p-2 outline-none text-white w-full" />
                </form>
            </div>
        </nav>
    );
};
