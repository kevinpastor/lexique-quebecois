import { ReactElement } from "react";
import { GetServerSidePropsResult } from "next";

import { DatedWord } from "@quebecois-urbain/shared/models/dated-word";
import { Word } from "@components/word";
import { getWords } from "../requests/word";

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
    return (
        <div className="space-y-4">
            {words?.map((word: DatedWord) => (
                <Word key={word.timestamp} word={word} />
            ))}
            <div className="p-4 font-bold text-center text-slate-600 center">
                Rafraichi la page pour découvrir des nouveaux mots!
            </div>
        </div>
    );
};

export default Home;
