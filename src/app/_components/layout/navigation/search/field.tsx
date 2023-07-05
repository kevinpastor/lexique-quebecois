import { InputAdornment } from "@mui/material";
import { ForwardedRef, forwardRef, ReactElement } from "react";

import { TextField } from "~components/react-hook-form/text-field";

import { FieldIconButton } from "./field-icon-button";

export const Field = forwardRef((_: unknown, ref: ForwardedRef<HTMLInputElement>): ReactElement => (
    <TextField
        inputRef={ref}
        name="label"
        placeholder="Rechercher un mot"
        size="small"
        InputProps={{
            endAdornment: (
                <InputAdornment position="end">
                    <FieldIconButton />
                </InputAdornment>
            )
        }}
        spellCheck={false}
        hideError
    />
));

Field.displayName = "Field";
