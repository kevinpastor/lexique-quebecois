import { ReactElement } from "react";
import { GetServerSidePropsResult } from "next";

import { Word as IWord } from "@quebecois-urbain/shared/models/word";
import { Word } from "@components/word";
import { getWord } from "src/requests/word";

interface Props {
    word?: IWord;
}

export const getServerSideProps = async (): Promise<GetServerSidePropsResult<Props>> => {
    const word: IWord | undefined = await getWord("gyu");

    return {
        props: {
            word
        }
    };
};

const Home = ({ word: definition }: Props): ReactElement => (
    <Word word={definition} />
);

export default Home;
