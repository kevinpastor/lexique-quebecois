import { GetServerSidePropsContext, GetServerSidePropsResult } from "next";
import { ReactElement } from "react";
import { getClientIp } from "request-ip";
import { SWRConfig } from "swr";

import { Words } from "@components/pages/words";
import { Word } from "@models/word";
import { getWordsSample } from "@services/api/words";

interface Props {
    fallback: {
        [endpoint: string]: unknown;
    };
}

// TODO Investigate if the page can be partially generated statically. Initially reverted to this because of likes.
export const getServerSideProps = async ({ req }: GetServerSidePropsContext): Promise<GetServerSidePropsResult<Props>> => {
    const ip: string = getClientIp(req) ?? "";

    const words: Array<Word> = await getWordsSample(ip);

    return {
        props: {
            fallback: {
                "/api/words": words
            }
        }
    };
};

const Home = ({ fallback }: Props): ReactElement => (
    <SWRConfig value={{ fallback }}>
        <Words />
    </SWRConfig>
);

export default Home;
