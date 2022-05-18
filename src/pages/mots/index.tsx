import { GetStaticPropsResult } from "next";
import { ReactElement } from "react";
import { SWRConfig } from "swr";

import { IndexPage } from "@components/pages/index-page";
import { getWordIndex } from "@services/api/words";

interface Props {
    fallback: {
        [endpoint: string]: unknown;
    };
}

export const getStaticProps = async (): Promise<GetStaticPropsResult<Props>> => {
    const words: Array<string> = await getWordIndex();

    return {
        props: {
            fallback: {
                "/api/words": words
            }
        },
        revalidate: 60 * 60 * 24 // Revalidate every day
    };
};

const IndexPageWrapper = ({ fallback }: Props): ReactElement => (
    <SWRConfig value={{ fallback }}>
        <IndexPage />
    </SWRConfig>
);

export default IndexPageWrapper;
