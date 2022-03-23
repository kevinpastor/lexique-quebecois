import { ReactElement } from "react";
import { GetServerSidePropsContext, GetServerSidePropsResult } from "next";
import Head from "next/head";

import { Word as IWord } from "@models/word";
import { getWord } from "@services/api/words";
import { ErrorCard } from "@components/misc/error-card";
import { Word as WordComponent } from "@components/misc/word";

interface Props {
    hasFailed?: boolean;
    word?: IWord;
}

export const getServerSideProps = async ({ query }: GetServerSidePropsContext): Promise<GetServerSidePropsResult<Props>> => {
    const { id } = query;

    if (typeof id !== "string") {
        return {
            props: {
                hasFailed: true
            }
        };
    }

    try {
        const word: IWord | undefined = await getWord(id);

        if (!word) {
            return {
                props: {}
            };
        }

        return {
            props: {
                word
            }
        };
    }
    catch {
        return {
            props: {
                hasFailed: true
            }
        };
    }
};

const Word = ({ word, hasFailed }: Props): ReactElement => {
    if (hasFailed) {
        return (
            <ErrorCard />
        );
    }

    if (!word) {
        return (
            <section className="bg-slate-800 rounded-lg p-8 space-y-4">
                <div className="text-4xl font-bold text-slate-100 font-serif">
                    Ce mot n&apos;a pas été trouvé
                </div>
                <div className="text-slate-100 font-medium">
                    Si vous connaissez ce mot, vous pouvez contributer en fournissant une définition et un exemple.
                </div>
            </section>
        );
    }

    return (
        <>
            <Head>
                {/* eslint-disable-next-line react/jsx-one-expression-per-line */}
                <title>{word.label} - Lexique Québécois</title>
            </Head>
            <WordComponent word={word} />
        </>
    );
};

export default Word;
