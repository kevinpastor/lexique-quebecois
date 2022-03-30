import { ReactElement } from "react";
import { GetStaticPropsResult } from "next";

import { Word as IWord } from "@models/word";
import { getWords } from "@services/api/words";
import { Word } from "@components/misc/word";

interface Props {
    words: Array<IWord>;
}

export const getStaticProps = async (): Promise<GetStaticPropsResult<Props>> => {
    const words: Array<IWord> = await getWords();

    return {
        props: {
            words
        },
        revalidate: 60 * 60 * 24
    };
};

const Home = ({ words }: Props): ReactElement => {
    return (
        <div className="space-y-4">
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
