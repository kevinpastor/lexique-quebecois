import { ReactElement } from "react";
import Link from "next/link";

import { Word as IWord } from "@quebecois-urbain/shared/models/word";

interface Props {
    word?: IWord;
}

export const Word = ({ word }: Props): ReactElement => {
    if (!word) {
        return (
            <section className="bg-slate-700 rounded-lg p-8 space-y-4">
                {/* <Link href={`/words/${id}`}> */}
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
            <Link href={`/mots/${word.label}`}>
                <a className="text-3xl font-bold text-white">
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
                    par {word.author ?? "Anonyme"}, {word.timestamp}
                </div>
            </div>
        </section>
    );
};
