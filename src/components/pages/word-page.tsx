import { faPlus } from "@fortawesome/free-solid-svg-icons";
import Head from "next/head";
import { useRouter } from "next/router";
import { ReactElement } from "react";
import useSWR from "swr";

import { Button } from "@components/form/button";
import { Word as WordComponent } from "@components/misc/word";
import { Word } from "@models/word";

export const WordPage = (): ReactElement => {
    const { push, query } = useRouter();
    const { data } = useSWR<Array<Word>>(`/api/words/${query.slug}`);

    // `data` coming from `fallback`
    const word: Word | undefined = data as Word | undefined;

    if (!word) {
        const handleClick = async (): Promise<void> => {
            if (!query.label) {
                await push("/ajouter");
            }
            else {
                await push(`/ajouter?label=${query.label}`, "/ajouter");
            }
        };

        return (
            <section className="bg-slate-800 rounded-lg p-8 space-y-4">
                <div className="text-4xl font-bold text-slate-100 font-serif">
                    Ce mot n&apos;a pas été trouvé
                </div>
                <div className="text-slate-100 font-medium">
                    Si vous connaissez ce mot, vous pouvez contributer en fournissant une définition et un exemple.
                </div>
                <div className="flex flex-row-reverse">
                    <Button
                        onClick={handleClick}
                        label="Ajouter"
                        icon={faPlus}
                        ariaLabel="Ajouter"
                    />
                </div>
            </section>
        );
    }

    return (
        <>
            <Head>
                {/* eslint-disable-next-line react/jsx-one-expression-per-line */}
                <title>{word.label} - Lexique Québécois</title>
                <meta
                    key="description"
                    name="description"
                    content={`${word.label} - ${word.definition}`}
                />
            </Head>
            <WordComponent word={word} />
        </>
    );
};
