import { TextField as MuiTextField, TextFieldProps } from "@mui/material";
import { ReactElement, ReactNode } from "react";
import {
    Control,
    Controller,
    ControllerProps,
    FieldError,
    FieldValues,
    Path
} from "react-hook-form";

type Props<T extends FieldValues = FieldValues> =
    Omit<TextFieldProps, "name">
    & {
        validation?: ControllerProps["rules"];
        name: Path<T>;
        parseError?: (error: FieldError) => ReactNode;
        control?: Control<T>;
    };

export const TextField = <TFieldValues extends FieldValues = FieldValues>({
    validation = {},
    parseError = ({ message }: FieldError): ReactNode => (message),
    type,
    required,
    name,
    control,
    ...rest
}: Props<TFieldValues>): ReactElement => (
    <Controller
        name={name}
        control={control}
        rules={validation}
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
                required={required}
                type={type}
                error={error !== undefined}
                helperText={
                    error
                        ? parseError(error)
                        : rest.helperText
                }
                inputRef={ref}
            />
        )}
    />
);
