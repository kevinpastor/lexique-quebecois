import { TextField as MuiTextField, TextFieldProps } from "@mui/material";
import { MutableRefObject, ReactElement } from "react";
import { Controller, FieldValues, Path } from "react-hook-form";

interface Props<T extends FieldValues = FieldValues> extends Omit<TextFieldProps, "name"> {
    name: Path<T>;
    hideError?: boolean;
}

export const TextField = <TFieldValues extends FieldValues = FieldValues>({
    name,
    hideError = false,
    inputRef,
    ...rest
}: Props<TFieldValues>): ReactElement => (
    <Controller
        name={name}
        render={({
            field: { value, onChange, onBlur, ref },
            fieldState: { error }
        }): ReactElement => (
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
                helperText={
                    !hideError && error
                        ? error.message
                        : rest.helperText
                }
                inputRef={(instance: HTMLInputElement): void => {
                    ref(instance);
                    (inputRef as MutableRefObject<HTMLInputElement>).current = instance;
                }}
            />
        )}
    />
);
