import { ReactElement } from "react";
import Link from "next/link";

import { Definition as IDefinition } from "@shared/models/definition";

interface Props {
    definition?: IDefinition;
}

export const Definition = ({ definition }: Props): ReactElement => {
    if (!definition) {
        return (
            <section className="bg-slate-700 rounded-lg p-8 space-y-4">
                {/* <Link href={`/definitions/${id}`}> */}
                <a className="text-3xl font-bold text-white">
                    Une erreur s&apos;est produite
                </a>
                {/* </Link> */}
                <div className="text-white">
                    Impossible de charger l&apos;information
                </div>
            </section>
        );
    }

    return (
        <section className="bg-slate-700 rounded-lg p-8 space-y-4">
            <Link href={`/definitions/${definition.id}`}>
                <a className="text-3xl font-bold text-white">
                    {definition.label}
                </a>
            </Link>
            <div className="text-white">
                {definition.definition}
            </div>
            <div className="text-white italic">
                {definition.example}
            </div>
            <div>
                <div className="text-slate-300">
                    par {definition.author ?? "Anonyme"}, {definition.timestamp}
                </div>
            </div>
        </section>
    );
};
