/* eslint-disable react/no-multi-comp */
import { Form, Formik, FormikProps } from "formik";
import { GetServerSidePropsContext, GetServerSidePropsResult } from "next";
import { useRouter } from "next/router";
import { ReactElement } from "react";

import { Button } from "@components/form/button";
import { Field } from "@components/form/field";
import { Switch } from "@components/form/switch";
import { Card } from "@components/misc/card";
import { Type } from "@components/type";
import { Section } from "@components/typography/section";
import { Title } from "@components/typography/title";
import { Method } from "@models/method";
import { WordDocument } from "@models/word-document";
import { getWordDocument } from "@services/api/words";
import { createError } from "@services/errors/http-error-factory";
import { isDevelopmentEnvironment } from "@utils/misc/environment";
import { WithStringId } from "@utils/types/with-string-id";

const updateWordDocument = async (wordDocument: WithStringId<WordDocument>): Promise<void> => {
    const options: RequestInit = {
        method: Method.POST,
        headers: {
            "Content-Type": "application/json"
        },
        body: JSON.stringify(wordDocument)
    };
    const response: Response = await fetch(`/api/admin/${wordDocument._id}`, options);

    if (!response.ok) {
        throw createError(response.status);
    }
};

type Params = {
    id: string;
};

interface Props {
    wordDocument: WithStringId<WordDocument>;
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
            wordDocument
        }
    };
};

const WordDocumentEditor = ({ wordDocument }: Props): ReactElement => {
    const { push } = useRouter();

    const timestamp: number = parseInt(wordDocument._id.substring(0, 8), 16) * 1000;

    const handleCancel = async (): Promise<void> => {
        await push("/admin");
    };

    const handleSubmit = async (values: WithStringId<WordDocument>): Promise<void> => {
        await updateWordDocument(values);
    };

    return (
        <Formik
            initialValues={{ ...wordDocument }}
            onSubmit={handleSubmit}
        >
            {({ isSubmitting }: FormikProps<WithStringId<WordDocument>>): ReactElement => (
                <Form>
                    <Card>
                        <Title>
                            {wordDocument.label}
                        </Title>
                        <Section>
                            <div className="space-y-4">
                                <div>
                                    <div>
                                        ID
                                    </div>
                                    <div className="text-slate-300">
                                        {wordDocument._id}
                                    </div>
                                </div>
                                <div>
                                    <div>
                                        Timestamp
                                    </div>
                                    <div className="text-slate-300">
                                        {new Date(timestamp).toISOString()}
                                    </div>
                                </div>
                                <div>
                                    <div>
                                        IP
                                    </div>
                                    <div className="text-slate-300">
                                        {wordDocument.ip}
                                    </div>
                                </div>
                                <Field
                                    label="Label"
                                    name="label"
                                    autofocus
                                />
                                <Field
                                    label="Slug"
                                    name="slug"
                                    autofocus
                                />
                                <Field
                                    label="Definition"
                                    name="definition"
                                    type="textarea"
                                />
                                <Field
                                    label="Example"
                                    name="example"
                                    type="textarea"
                                />
                                <Field
                                    label="Author"
                                    name="author"
                                />
                                <Switch
                                    label="Is Approved"
                                    name="isApproved"
                                />
                                <div>
                                    <div>
                                        Likes
                                    </div>
                                    <div className="text-slate-300">
                                        {wordDocument.likes?.length ?? 0}
                                    </div>
                                </div>
                                <div>
                                    <div>
                                        Dislikes
                                    </div>
                                    <div className="text-slate-300">
                                        {wordDocument.dislikes?.length ?? 0}
                                    </div>
                                </div>
                                <div className="flex justify-end gap-2">
                                    <Button
                                        label="Cancel"
                                        ariaLabel="Cancel"
                                        isLoading={isSubmitting}
                                        type={Type.Outlined}
                                        onClick={handleCancel}
                                    />
                                    <Button
                                        label="Save"
                                        ariaLabel="Save"
                                        isLoading={isSubmitting}
                                    />
                                </div>
                            </div>
                        </Section>
                    </Card>
                </Form>
            )
            }
        </Formik >
    );
};

export default WordDocumentEditor;
