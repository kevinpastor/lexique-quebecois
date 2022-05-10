/* eslint-disable react/no-unused-prop-types */
import { GetServerSidePropsContext, GetServerSidePropsResult } from "next";
import { ReactElement } from "react";
import { getClientIp } from "request-ip";
import { SWRConfig } from "swr";

import { Index as IndexComponent } from "@components/pages/index";
import { getWordIndex } from "@services/api/words";

interface Props {
    fallback: {
        [endpoint: string]: unknown;
    };
}

// TODO Investigate if the page can be partially generated statically. Initially reverted to this because of likes.
export const getServerSideProps = async ({ req }: GetServerSidePropsContext): Promise<GetServerSidePropsResult<Props>> => {
    const ip: string = getClientIp(req) ?? "";

    const words: Array<string> = await getWordIndex(ip);

    return {
        props: {
            fallback: {
                "/api/words/mots": words
            }
        }
    };
};

const Index = ({ fallback }: Props): ReactElement => (
    <SWRConfig value={{ fallback }}>
        <IndexComponent />
    </SWRConfig>
);

export default Index;
