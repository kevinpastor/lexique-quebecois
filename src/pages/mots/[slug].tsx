import { faPlus } from "@fortawesome/free-solid-svg-icons";
import { GetServerSidePropsContext, GetServerSidePropsResult } from "next";
import Head from "next/head";
import { useRouter } from "next/router";
import { ReactElement } from "react";
import { getClientIp } from "request-ip";

import { Button } from "@components/form/button";
import { Word as WordComponent } from "@components/misc/word";
import { Word as IWord } from "@models/word";
import { getWord } from "@services/api/words";

type Params = {
    slug: string;
};

interface Props {
    word?: IWord;
}

// TODO Investigate if the page can be partially generated statically. Initially reverted to this because of likes.
export const getServerSideProps = async ({ params, req }: GetServerSidePropsContext<Params>): Promise<GetServerSidePropsResult<Props>> => {
    if (!params) {
        throw new Error("Called not from a dynamic route.");
    }

    const { slug } = params;
    const ip: string = getClientIp(req) ?? "";

    const word: IWord | undefined = await getWord(slug, ip);

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
    const {
        push,
        query
    } = useRouter();

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

export default Word;
