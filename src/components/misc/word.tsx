import { ReactElement } from "react";
import Link from "next/link";

import { Word as IWord } from "@models/word";
import { formatDate } from "@utils/date";

interface Props {
    word: IWord;
}

export const Word = ({ word }: Props): ReactElement => (
    <section className="bg-slate-800 rounded-lg p-8 space-y-4">
        <Link href={`/mots/${word.resourceName}`}>
            <a className="text-4xl font-bold font-serif text-blue-400 hover:text-blue-500 transition">
                {word.label}
            </a>
        </Link>
        <div className="text-white font-medium text-lg">
            {word.definition}
        </div>
        <div className="text-white italic text-lg">
            {word.example}
        </div>
        <div>
            <div className="text-slate-400 font-medium text-lg">
                {/* eslint-disable-next-line react/jsx-one-expression-per-line */}
                par {word.author ?? "Anonyme"}, le {formatDate(word.timestamp)}
            </div>
        </div>
    </section>
);
