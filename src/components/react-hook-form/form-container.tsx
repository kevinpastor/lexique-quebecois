import { type PropsWithChildren, type ReactNode } from "react";
import { FormProvider, type SubmitHandler } from "react-hook-form";
import { type BaseSchema, type BaseSchemaAsync, type Output } from "valibot";

import { type UseFormProps, useForm } from "./use-form";

interface Props<Schema extends BaseSchema | BaseSchemaAsync> {
    useFormProps: UseFormProps<Schema>;
    onSuccess: SubmitHandler<Output<Schema>>;
}

export const FormContainer = <Schema extends BaseSchema | BaseSchemaAsync>({
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
