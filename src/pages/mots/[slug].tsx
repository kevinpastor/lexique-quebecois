import { GetServerSidePropsContext, GetServerSidePropsResult } from "next";
import { ReactElement } from "react";
import { getClientIp } from "request-ip";
import { SWRConfig } from "swr";

import { WordPage } from "@components/pages/word-page";
import { Word } from "@models/word";
import { getWord } from "@services/api/words";

type Params = {
    slug: string;
};

interface Props {
    fallback: {
        [endpoint: string]: unknown;
    };
}

// TODO Investigate if the page can be partially generated statically. Initially reverted to this because of likes.
export const getServerSideProps = async ({ params, req }: GetServerSidePropsContext<Params>): Promise<GetServerSidePropsResult<Props>> => {
    if (!params) {
        throw new Error("Called not from a dynamic route.");
    }

    const { slug } = params;
    const ip: string = getClientIp(req) ?? "";
    const word: Word | undefined = await getWord(slug, ip);

    return {
        props: {
            fallback: {
                [`/api/words/${slug}`]: word
            }
        }
    };
};

const WordPageWrapper = ({ fallback }: Props): ReactElement => (
    <SWRConfig value={{ fallback }}>
        <WordPage />
    </SWRConfig>
);

export default WordPageWrapper;
