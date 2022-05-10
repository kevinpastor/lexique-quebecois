import { faCheckCircle } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { ReactElement } from "react";
import useSWR from "swr";

import { Card } from "@components/misc/card";
import { Heading } from "@components/typography/heading";
import { Hyperlink } from "@components/typography/hyperlink";
import { Section } from "@components/typography/section";
import { Title } from "@components/typography/title";
import { WordDocument } from "@models/word-document";
import { WithStringId } from "@utils/types/with-string-id";

export const WordDocuments = (): ReactElement => {
    const { data } = useSWR<Array<WithStringId<WordDocument>>>("/api/admin");

    // `data` coming from `fallback`
    const wordDocuments: Array<WithStringId<WordDocument>> = data as Array<WithStringId<WordDocument>>;

    return (
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
};
