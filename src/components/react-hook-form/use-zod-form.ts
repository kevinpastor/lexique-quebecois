import { zodResolver } from "@hookform/resolvers/zod";
import { useForm, type UseFormProps, type UseFormReturn } from "react-hook-form";
import { type TypeOf, type ZodSchema } from "zod";

export interface UseZodFormProps<Z extends ZodSchema> extends Omit<UseFormProps<TypeOf<Z>>, "resolver"> {
    schema: Z;
}

export const useZodForm = <Z extends ZodSchema>({ schema, ...formProps }: UseZodFormProps<Z>): UseFormReturn<TypeOf<Z>> => (
    useForm({
        ...formProps,
        resolver: zodResolver(schema)
    })
);
