import { InputAdornment } from "@mui/material";
import { forwardRef, ReactElement } from "react";

import { TextField } from "@components/react-hook-form/text-field";

import { FieldIconButton } from "./field-icon-button";

export const Field = forwardRef<HTMLInputElement>((_, ref): ReactElement => (
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
    />
));

Field.displayName = "Field";
