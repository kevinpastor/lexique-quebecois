import { faCheckCircle } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { GetServerSidePropsResult } from "next";
import { ReactElement } from "react";

import { Card } from "@components/misc/card";
import { Heading } from "@components/typography/heading";
import { Hyperlink } from "@components/typography/hyperlink";
import { Section } from "@components/typography/section";
import { Title } from "@components/typography/title";
import { WordDocument } from "@models/word-document";
import { getWordDocuments } from "@services/api/words";
import { isDevelopmentEnvironment } from "@utils/misc/environment";
import { WithStringId } from "@utils/types/with-string-id";

interface Props {
    wordDocuments: Array<WithStringId<WordDocument>>;
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
            wordDocuments
        }
    };
};

const Admin = ({ wordDocuments }: Props): ReactElement => (
    <Card>
        <Title>
            Dashboard
        </Title>
        <Section>
            <Heading>
                Word Index
            </Heading>
            {wordDocuments.map(({ _id, label, isApproved }: WithStringId<WordDocument>): ReactElement => (
                <div
                    key={_id}
                    className="flex gap-2"
                >
                    <Hyperlink
                        href={`/admin/${_id}`}
                        prefetch={false}
                    >
                        {label}
                    </Hyperlink>
                    {isApproved && (
                        <div className="text-slate-500">
                            <FontAwesomeIcon
                                icon={faCheckCircle}
                            />
                        </div>
                    )}
                </div>
            ))}
        </Section>
    </Card>
);

export default Admin;
