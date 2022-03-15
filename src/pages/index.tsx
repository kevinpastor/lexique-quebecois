import { ReactElement } from "react";
import { GetServerSidePropsResult } from "next";

import { Word as IWord } from "@models";
import { getWords } from "@services/words";
import { ErrorCard, Word } from "@components/misc";

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
        </div>
    );
};

export default Home;
