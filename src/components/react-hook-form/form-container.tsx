import { FormHTMLAttributes, PropsWithChildren, ReactElement } from "react";
import { FieldValues, FormProvider, SubmitHandler, useForm, UseFormProps } from "react-hook-form";

export type FormContainerProps<T extends FieldValues = FieldValues> = PropsWithChildren<{
    onSuccess?: SubmitHandler<T>;
    FormProps?: FormHTMLAttributes<HTMLFormElement>;
    useFormProps?: UseFormProps<T>;
}>;

export const FormContainer = <TFieldValues extends FieldValues = FieldValues>({
    children,
    FormProps,
    onSuccess = (): void => {
        console.warn("`onSuccess` is missing.");
    },
    useFormProps
}: PropsWithChildren<FormContainerProps<TFieldValues>>): ReactElement => {
    const methods = useForm<TFieldValues>(useFormProps);
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
