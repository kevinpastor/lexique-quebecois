import { ReactElement } from "react";
import Link from "next/link";

import { DatedWord } from "@quebecois-urbain/shared/models/dated-word";
import { formatDate } from "@utils/date";

interface Props {
    word?: DatedWord;
}

export const Word = ({ word }: Props): ReactElement => {
    if (!word) {
        return (
            <section className="bg-slate-700 rounded-lg p-8 space-y-4">
                <div className="text-3xl font-bold text-white">
                    Une erreur s&apos;est produite
                </div>
                <div className="text-white">
                    Impossible de charger l&apos;information
                </div>
            </section>
        );
    }

    return (
        <section className="bg-slate-700 rounded-lg p-8 space-y-4">
            <Link href={`/mots/${word.label}`}>
                <a className="text-3xl font-bold text-blue-500 underline">
                    {word.label}
                </a>
            </Link>
            <div className="text-white">
                {word.definition}
            </div>
            <div className="text-white italic">
                {word.example}
            </div>
            <div>
                <div className="text-slate-300">
                    par {word.author ?? "Anonyme"}, le {formatDate(word.timestamp)}
                </div>
            </div>
        </section>
    );
};
