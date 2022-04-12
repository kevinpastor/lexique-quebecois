import { GetStaticPropsResult } from "next";
import { ReactElement } from "react";

import { Word } from "@components/misc/word";
import { Word as IWord } from "@models/word";
import { getWordsSample } from "@services/api/words";

interface Props {
    words: Array<IWord>;
}

export const getStaticProps = async (): Promise<GetStaticPropsResult<Props>> => {
    const words: Array<IWord> = await getWordsSample();

    return {
        props: {
            words
        },
        revalidate: 10
        // TODO Enable back when list becomes bigger
        // revalidate: 60 * 60 * 24
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
