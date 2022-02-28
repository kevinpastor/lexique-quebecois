import { ReactElement } from "react";
import { GetServerSidePropsContext, GetServerSidePropsResult } from "next";

import { DatedWord } from "@quebecois-urbain/shared/models/dated-word";
import { Word as WordComponent } from "@components/word";
import { ErrorCard } from "@components/error-card";
import { getWord } from "@services/words";

interface Props {
    hasFailed?: boolean;
    word?: DatedWord;
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
        const word: DatedWord | undefined = await getWord(id);

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

const WordPage = ({ word, hasFailed }: Props): ReactElement => {
    if (hasFailed) {
        return (
            <ErrorCard />
        );
    }

    if (!word) {
        return (
            <section className="bg-slate-800 rounded-lg p-8 space-y-4">
                <div className="text-4xl font-bold text-white font-serif">
                    Ce mot n&apos;a pas été trouvé
                </div>
                <div className="text-white font-medium">
                    Si vous connaissez ce mot, vous pouvez contributer en fournissant une définition et un exemple à l&apos;aide du bouton à droite.
                </div>
            </section>
        );
    }

    return (
        <WordComponent word={word} />
    );
};

export default WordPage;
