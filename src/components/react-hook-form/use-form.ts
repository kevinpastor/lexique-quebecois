import { valibotResolver } from "@hookform/resolvers/valibot";
import { type UseFormReturn, type UseFormProps as UseReactHookFormFormProps, useForm as useReactHookFormForm } from "react-hook-form";
import { type BaseSchema, type BaseSchemaAsync, type Input } from "valibot";

export interface UseFormProps<Schema extends BaseSchema | BaseSchemaAsync> extends Omit<UseReactHookFormFormProps<Input<Schema>>, "resolver"> {
    schema: Schema;
}

export const useForm = <Schema extends BaseSchema | BaseSchemaAsync>({ schema, ...formProps }: UseFormProps<Schema>): UseFormReturn<Input<Schema>> => (
    useReactHookFormForm({
        ...formProps,
        resolver: valibotResolver(schema)
    })
);
