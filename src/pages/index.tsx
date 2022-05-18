import { GetStaticPropsResult } from "next";
import { ReactElement } from "react";
import { SWRConfig } from "swr";

import { WordsPage } from "@components/pages/words-page";
import { Word } from "@models/word";
import { getWordsSample } from "@services/api/words";

interface Props {
    fallback: {
        [endpoint: string]: unknown;
    };
}

export const getStaticProps = async (): Promise<GetStaticPropsResult<Props>> => {
    const words: Array<Word> = await getWordsSample();

    return {
        props: {
            fallback: {
                "/api/words/sample": words
            }
        },
        revalidate: 60 * 60 * 24 // Every day
    };
};

const WordsPageWrapper = ({ fallback }: Props): ReactElement => (
    <SWRConfig value={{ fallback }}>
        <WordsPage />
    </SWRConfig>
);

export default WordsPageWrapper;
