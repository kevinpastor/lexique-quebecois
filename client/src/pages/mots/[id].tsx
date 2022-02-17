import { ReactElement } from "react";
import { GetServerSidePropsContext, GetServerSidePropsResult } from "next";

import { DatedWord } from "@quebecois-urbain/shared/models/dated-word";
import { Word as WordComponent } from "@components/word";
import { getWord } from "../../requests/word";

interface Props {
    word?: DatedWord;
}

export const getServerSideProps = async ({ query }: GetServerSidePropsContext): Promise<GetServerSidePropsResult<Props>> => {
    const { id } = query;

    if (typeof id !== "string") {
        return {
            props: {}
        };
    }

    const word: DatedWord | undefined = await getWord(id);

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
