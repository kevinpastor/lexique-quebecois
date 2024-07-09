import { valibotResolver } from "@hookform/resolvers/valibot";
import { type UseFormReturn, type UseFormProps as UseReactHookFormFormProps, useForm as useReactHookFormForm } from "react-hook-form";
import { type ErrorMessage, type InferInput, type ObjectEntries, type StrictObjectIssue, type StrictObjectSchema } from "valibot";

// It seems like specifying only one schema type breaks type inference on usages. Keeping it as so for now even if the second generic could be combined.
export type GenericFormSchema = StrictObjectSchema<ObjectEntries, undefined> | StrictObjectSchema<ObjectEntries, ErrorMessage<StrictObjectIssue>>;

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
