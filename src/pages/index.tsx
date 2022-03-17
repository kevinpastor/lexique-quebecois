import { ReactElement } from "react";
import { GetServerSidePropsResult } from "next";

import { Word as IWord } from "@models/word";
import { getWords } from "@services/words";
import { ErrorCard } from "@components/misc/error-card";
import { Word } from "@components/misc/word";
import { Alert } from "@components/misc/alert";

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
            {/* <Alert
                isOpened
                title="Succès"
                content="Votre contribution a bel et bien été enregistrée. Elle sera examinée sous peu."
            /> */}
            {words.map((word: IWord): ReactElement => (
                <Word
                    key={word.timestamp}
                    word={word}
                />
            ))}
        </div>
    );
};

export default Home;
