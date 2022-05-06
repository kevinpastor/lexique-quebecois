import { GetServerSidePropsContext, GetServerSidePropsResult } from "next";
import { ReactElement } from "react";
import { SWRConfig } from "swr";

import { WordDocumentEditor } from "@components/pages/word-document-editor";
import { WordDocument } from "@models/word-document";
import { getWordDocument } from "@services/api/words";
import { isDevelopmentEnvironment } from "@utils/misc/environment";
import { WithStringId } from "@utils/types/with-string-id";

type Params = {
    id: string;
};

interface Props {
    fallback: {
        [endpoint: string]: unknown;
    };
}

export const getServerSideProps = async ({ params }: GetServerSidePropsContext<Params>): Promise<GetServerSidePropsResult<Props>> => {
    if (!isDevelopmentEnvironment()) {
        return {
            notFound: true
        };
    }

    if (!params) {
        throw new Error("Called not from a dynamic route.");
    }

    const { id } = params;

    const wordDocument: WithStringId<WordDocument> | undefined = await getWordDocument(id);

    if (!wordDocument) {
        return {
            notFound: true
        };
    }

    return {
        props: {
            fallback: {
                [`/api/admin/${id}`]: wordDocument
            }
        }
    };
};

const Page = ({ fallback }: Props): ReactElement => (
    <SWRConfig value={{ fallback }}>
        <WordDocumentEditor />
    </SWRConfig>
);

export default Page;
