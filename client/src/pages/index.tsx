import { ReactElement } from "react";
import { GetServerSidePropsResult } from "next";

import { DatedWord } from "@quebecois-urbain/shared/models/dated-word";
import { Word } from "@components/word";
import { getWord } from "../requests/word";

interface Props {
    word?: DatedWord;
}

export const getServerSideProps = async (): Promise<GetServerSidePropsResult<Props>> => {
    const word: DatedWord | undefined = await getWord("gyu");

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
};

const Home = ({ word }: Props): ReactElement => (
    <Word word={word} />
);

export default Home;
