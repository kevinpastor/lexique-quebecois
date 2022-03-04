import { ReactElement } from "react";
import { GetServerSidePropsResult } from "next";

import { Word as IWord } from "@models";
import { Word } from "@components/misc/word";
import { getWords } from "@services/words";
import { ErrorCard } from "@components/misc";

interface Props {
    words?: Array<IWord>;
}

export const getServerSideProps = async (): Promise<GetServerSidePropsResult<Props>> => {
    try {
        const words: Array<IWord> = await getWords();

        return {
            props: {
                words
            }
        };
    }
    catch {
        return {
            props: {}
        };
    }
};

const Home = ({ words }: Props): ReactElement => {
    if (!words) {
        return (
            <ErrorCard />
        );
    }

    return (
        <div className="space-y-4">
            {words.map((word: IWord): ReactElement => (
                <Word key={word.timestamp} word={word} />
            ))}
            <div className="p-4 flex flex-row text-slate-600 gap-2 justify-center font-bold text-center">
                Rafraîchis la page pour découvrir d&apos;autre mots
            </div>
        </div>
    );
};

export default Home;
