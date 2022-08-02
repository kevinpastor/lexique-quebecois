import { faCheckCircle } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { Link, Typography } from "@mui/material";
import NextLink from "next/link";
import { ReactElement } from "react";
import useSWR from "swr";

import { Card } from "@components/misc/card";
import { Section } from "@components/typography/section";
import { WordDocument } from "@models/word-document";
import { WithStringId } from "@utils/types/with-string-id";

export const WordDocumentsPage = (): ReactElement => {
    const { data } = useSWR<Array<WithStringId<WordDocument>>>("/api/admin", { revalidateOnMount: false });

    // `data` coming from `fallback`
    const wordDocuments: Array<WithStringId<WordDocument>> = data as Array<WithStringId<WordDocument>>;

    return (
        <Card>
            <Typography variant="h2">
                Tableau de modération
            </Typography>
            <Section>
                <Typography variant="h3">
                    Index
                </Typography>
                {wordDocuments.map(({ _id, label, isApproved }: WithStringId<WordDocument>): ReactElement => (
                    <div
                        key={_id}
                        className="flex gap-2"
                    >
                        <NextLink
                            href={`/admin/${_id}`}
                            passHref
                        >
                            <Link>
                                {label}
                            </Link>
                        </NextLink>
                        {isApproved && (
                            <div className="text-black/[.60]">
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
