import { type PropsWithChildren, type ReactElement } from "react";
import { FormProvider, type SubmitHandler } from "react-hook-form";
import { type TypeOf, type ZodSchema } from "zod";

import { useZodForm, type UseZodFormProps } from "./use-zod-form";

interface Props<Z extends ZodSchema> {
    useZodFormProps: UseZodFormProps<Z>;
    onSuccess: SubmitHandler<TypeOf<Z>>;
}

export const FormContainer = <Z extends ZodSchema>({
    useZodFormProps,
    onSuccess,
    children
}: PropsWithChildren<Props<Z>>): ReactElement => {
    const methods = useZodForm(useZodFormProps);
    const { handleSubmit } = methods;

    return (
        <FormProvider {...methods}>
            <form
                onSubmit={handleSubmit(onSuccess)}
                noValidate
            >
                {children}
            </form>
        </FormProvider>
    );
};
