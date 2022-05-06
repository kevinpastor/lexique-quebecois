import { GetServerSidePropsResult } from "next";
import { ReactElement } from "react";
import { SWRConfig } from "swr";

import { WordDocuments } from "@components/misc/word-documents";
import { WordDocument } from "@models/word-document";
import { getWordDocuments } from "@services/api/words";
import { isDevelopmentEnvironment } from "@utils/misc/environment";
import { WithStringId } from "@utils/types/with-string-id";

interface Props {
    fallback: {
        [endpoint: string]: unknown;
    };
}

export const getServerSideProps = async (): Promise<GetServerSidePropsResult<Props>> => {
    if (!isDevelopmentEnvironment()) {
        return {
            notFound: true
        };
    }

    const wordDocuments: Array<WithStringId<WordDocument>> = await getWordDocuments();

    return {
        props: {
            fallback: {
                "/api/admin": wordDocuments
            }
        }
    };
};

const Admin = ({ fallback }: Props): ReactElement => (
    <SWRConfig value={{ fallback }}>
        <WordDocuments />
    </SWRConfig>
);

export default Admin;
