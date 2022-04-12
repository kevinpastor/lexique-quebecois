import { faPlus } from "@fortawesome/free-solid-svg-icons";
import { GetStaticPathsResult, GetStaticPropsContext, GetStaticPropsResult } from "next";
import Head from "next/head";
import { useRouter } from "next/router";
import { ReactElement } from "react";

import { Button } from "@components/form/button";
import { Word as WordComponent } from "@components/misc/word";
import { Word as IWord } from "@models/word";
import { getWord } from "@services/api/words";

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
            props: {},
            revalidate: 60 * 15 // 15 minutes
        };
    }

    return {
        props: {
            word
        },
        revalidate: 60 * 15 // 15 minutes
    };
};

const Word = ({ word }: Props): ReactElement => {
    const { push } = useRouter();

    if (!word) {
        const handleClick = async (): Promise<void> => {
            await push("/ajouter");
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
            </Head>
            <WordComponent word={word} />
        </>
    );
};

export default Word;
