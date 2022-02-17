import { ReactElement } from "react";
import { GetServerSidePropsContext, GetServerSidePropsResult } from "next";

import { Word } from "@quebecois-urbain/shared/models/word";
import { Word as WordComponent } from "@components/word";
import { getWord } from "../../requests/word";

interface Props {
    word?: Word;
}

export const getServerSideProps = async ({ query }: GetServerSidePropsContext): Promise<GetServerSidePropsResult<Props>> => {
    const { id } = query;

    if (typeof id !== "string") {
        return {
            props: {}
        };
    }

    const word: Word | undefined = await getWord(id);

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

const WordPage = ({ word }: Props): ReactElement => (
    <WordComponent word={word} />
);

export default WordPage;
