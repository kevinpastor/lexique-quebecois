import { GetServerSidePropsResult } from "next";
import { ReactElement } from "react";

import { Word } from "@components/misc/word";
import { Word as IWord } from "@models/word";
import { getWordsSample } from "@services/api/words";

interface Props {
    words: Array<IWord>;
}

// TODO Investigate if the page can be partially generated statically. Initially reverted to this because of likes.
export const getServerSideProps = async (): Promise<GetServerSidePropsResult<Props>> => {
    const words: Array<IWord> = await getWordsSample();

    return {
        props: {
            words
        }
    };
};

const Home = ({ words }: Props): ReactElement => (
    <div className="space-y-4">
        {words.map((word: IWord): ReactElement => (
            <Word
                key={word.timestamp}
                word={word}
            />
        ))}
    </div>
);

export default Home;
