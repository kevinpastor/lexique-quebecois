import { GetServerSidePropsResult } from "next";
import { ReactElement } from "react";
import { SWRConfig } from "swr";

import { WordDocumentsPage } from "@components/pages/word-documents-page";
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

const WordDocumentPageWrapper = ({ fallback }: Props): ReactElement => (
    <SWRConfig value={{ fallback }}>
        <WordDocumentsPage />
    </SWRConfig>
);

export default WordDocumentPageWrapper;
