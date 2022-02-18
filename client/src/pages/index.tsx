import { ReactElement } from "react";
import { GetServerSidePropsResult } from "next";

import { DatedWord } from "@quebecois-urbain/shared/models/dated-word";
import { Word } from "@components/word";
import { getWords } from "../requests/word";
import { ErrorCard } from "@components/error-card";

interface Props {
    words?: Array<DatedWord>;
}

export const getServerSideProps = async (): Promise<GetServerSidePropsResult<Props>> => {
    const words: Array<DatedWord> | undefined = await getWords();

    if (!words) {
        return {
            props: {}
        };
    }

    return {
        props: {
            words
        }
    };
};

const Home = ({ words }: Props): ReactElement => {
    if (!words) {
        return (
            <ErrorCard />
        );
    }

    return (
        <div className="space-y-4">
            {words.map((word: DatedWord): ReactElement => (
                <Word key={word.timestamp} word={word} />
            ))}
            <div className="p-4 flex flex-row text-slate-600 gap-2 justify-center font-bold text-center">
                Rafraîchis la page pour découvrir d&apos;autre mots
            </div>
        </div>
    );
};

export default Home;
