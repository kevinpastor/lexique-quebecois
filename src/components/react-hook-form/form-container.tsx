import { FormHTMLAttributes, PropsWithChildren, ReactElement } from "react";
import { FormProvider, SubmitHandler } from "react-hook-form";
import { TypeOf, ZodSchema } from "zod";

import { useZodForm, UseZodFormProps } from "./use-zod-form";

type Props<Z extends ZodSchema> = PropsWithChildren<{
    useZodFormProps: UseZodFormProps<Z>;
    onSuccess: SubmitHandler<TypeOf<Z>>;
    FormProps?: FormHTMLAttributes<HTMLFormElement>;
}>;

export const FormContainer = <Z extends ZodSchema>({
    useZodFormProps,
    onSuccess,
    FormProps,
    children
}: PropsWithChildren<Props<Z>>): ReactElement => {
    const methods = useZodForm(useZodFormProps);
    const { handleSubmit } = methods;

    return (
        <FormProvider {...methods}>
            <form
                onSubmit={handleSubmit(onSuccess)}
                noValidate
                {...FormProps}
            >
                {children}
            </form>
        </FormProvider>
    );
};
