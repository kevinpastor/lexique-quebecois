import { ReactElement } from "react";
import { GetStaticPathsResult, GetStaticPropsContext, GetStaticPropsResult } from "next";
import Head from "next/head";

import { Word as IWord } from "@models/word";
import { getWord } from "@services/api/words";
import { Word as WordComponent } from "@components/misc/word";

export const getStaticPaths = (): GetStaticPathsResult => ({
    paths: [],
    fallback: "blocking"
});

type Params = {
    slug: string;
};

interface Props {
    word?: IWord;
}

export const getStaticProps = async ({ params }: GetStaticPropsContext<Params>): Promise<GetStaticPropsResult<Props>> => {
    if (!params) {
        throw new Error("Called not from a dynamic route.");
    }

    const { slug } = params;

    const word: IWord | undefined = await getWord(slug);

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
};

const Word = ({ word }: Props): ReactElement => {
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
