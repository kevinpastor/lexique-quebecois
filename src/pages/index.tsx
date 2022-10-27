import { GetStaticPropsResult } from "next";
import { ReactElement } from "react";
import { SWRConfig } from "swr";

import { WordsPage } from "@components/pages/words-page";
import { Definition } from "@models/definition";
import { getDefinitionsSample } from "@services/api/words/get-definitions-sample";

interface Props {
    fallback: {
        [endpoint: string]: unknown;
    };
}

export const getStaticProps = async (): Promise<GetStaticPropsResult<Props>> => {
    const words: Array<Definition> = await getDefinitionsSample();

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
