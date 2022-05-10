import { Form, Formik, FormikProps } from "formik";
import { useRouter } from "next/router";
import { ReactElement } from "react";
import useSWR from "swr";

import { Button } from "@components/form/button";
import { Field } from "@components/form/field";
import { Switch } from "@components/form/switch";
import { Card } from "@components/misc/card";
import { Type } from "@components/type";
import { Section } from "@components/typography/section";
import { Title } from "@components/typography/title";
import { WordDocument } from "@models/word-document";
import { updateWordDocument } from "@services/word-document";
import { WithStringId } from "@utils/types/with-string-id";

export const WordDocumentPage = (): ReactElement => {
    const { push, query: { id } } = useRouter();

    const { data } = useSWR<WithStringId<WordDocument>>(`/api/admin/${id}`);

    // `data` coming from `fallback`
    const wordDocument: WithStringId<WordDocument> = data as WithStringId<WordDocument>;

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
