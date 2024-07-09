import { valibotResolver } from "@hookform/resolvers/valibot";
import { type UseFormReturn, type UseFormProps as UseReactHookFormFormProps, useForm as useReactHookFormForm } from "react-hook-form";
import { type InferInput, type StrictObjectSchema } from "valibot";

// eslint-disable-next-line @typescript-eslint/no-explicit-any -- Type inference on `useForm` breaks if `Record<string, BaseSchema<...>>` is given. Might be related to existential types.
export type GenericFormSchema = StrictObjectSchema<any, undefined>;

export interface UseFormProps<Schema extends GenericFormSchema>
    extends Omit<UseReactHookFormFormProps<InferInput<Schema>>, "resolver"> {
    schema: Schema;
}

export const useForm = <Schema extends GenericFormSchema>({ schema, ...formProps }: UseFormProps<Schema>): UseFormReturn<InferInput<Schema>> => (
    useReactHookFormForm({
        ...formProps,
        resolver: valibotResolver(schema)
    })
);
