import { ReactElement } from "react";
// import { Link } from "react-router-dom";

import { useDefinition } from "@hooks/useDefinition";
import { Status } from "@models/status";

interface Props {
    id: string;
}

export const Definition = ({ id }: Props): ReactElement => {
    const state = useDefinition(id);

    if (state.status === Status.initial || state.status === Status.loading) {
        return (
            <section className="bg-slate-700 rounded-lg p-8">
                <div className="space-y-6 animate-pulse">
                    <div className="h-8 w-32 bg-slate-500 rounded-full"></div>
                    <div className="space-y-2">
                        <div className="h-4 w-full bg-slate-500 rounded-full"></div>
                        <div className="h-4 w-full bg-slate-500 rounded-full"></div>
                        <div className="h-4 w-1/2 bg-slate-500 rounded-full"></div>
                    </div>
                    <div className="h-4 w-2/3 bg-slate-500 rounded-full"></div>
                    <div className="h-4 w-1/3 bg-slate-500 rounded-full"></div>
                </div>
            </section>
        );
    }

    if (state.status === Status.failed) {
        return (<>REQUEST FAILED TODO</>);
    }

    return (
        <section className="bg-slate-700 rounded-lg p-8 space-y-4">
            {/* <Link to={`/definitions/${state.response.id}`}> */}
                <div className="text-3xl font-bold text-white">
                    {state.response.label}
                </div>
            {/* </Link> */}
            <div className="text-white">
                {state.response.definition}
            </div>
            <div className="text-white italic">
                {state.response.example}
            </div>
            <div>
                <div className="text-slate-300">
                    par {state.response.author ?? "Anonyme"}, {state.response.timestamp}
                </div>
            </div>
        </section>
    );
};
