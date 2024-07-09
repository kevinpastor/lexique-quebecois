import { type PropsWithChildren, type ReactNode } from "react";
import { FormProvider, type SubmitHandler } from "react-hook-form";
import { type InferOutput } from "valibot";

import { type GenericFormSchema, type UseFormProps, useForm } from "./use-form";

interface Props<Schema extends GenericFormSchema> {
    useFormProps: UseFormProps<Schema>;
    onSuccess: SubmitHandler<InferOutput<Schema>>;
}

export const FormContainer = <Schema extends GenericFormSchema>({
    useFormProps,
    onSuccess,
    children
}: PropsWithChildren<Props<Schema>>): ReactNode => {
    const methods = useForm(useFormProps);
    const { handleSubmit } = methods;

    return (
        <FormProvider {...methods}>
            <form
                // eslint-disable-next-line @typescript-eslint/no-misused-promises
                onSubmit={handleSubmit(onSuccess)}
                noValidate
            >
                {children}
            </form>
        </FormProvider>
    );
};
