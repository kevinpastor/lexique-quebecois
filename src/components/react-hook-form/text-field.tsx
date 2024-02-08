import { TextField as MuiTextField, type TextFieldProps } from "@mui/material";
import { type ForwardedRef, type ReactNode } from "react";
import { type FieldValues, type Path, useController } from "react-hook-form";

interface Props<T extends FieldValues = FieldValues> extends Omit<TextFieldProps, "name" | "inputRef"> {
    name: Path<T>;
    hideError?: boolean;
    inputRef?: ForwardedRef<HTMLInputElement>;
}

export const TextField = <TFieldValues extends FieldValues = FieldValues>({
    name,
    hideError = false,
    inputRef,
    ...rest
}: Props<TFieldValues>): ReactNode => {
    const {
        field: { value, onChange, onBlur, ref },
        fieldState: { error }
    } = useController({ name });

    return (
        <MuiTextField
            {...rest}
            name={name}
            value={value ?? ""}
            onChange={(event): void => {
                onChange(event);
                if (rest.onChange) {
                    rest.onChange(event);
                }
            }}
            onBlur={onBlur}
            error={!hideError && error !== undefined}
            helperText={!hideError && error
                ? error.message
                : rest.helperText}
            inputRef={(instance: HTMLInputElement): void => {
                ref(instance);

                if (!inputRef) {
                    return;
                }

                if (typeof inputRef === "function") {
                    inputRef(instance);
                    return;
                }

                inputRef.current = instance;
            }}
        />
    );
};
