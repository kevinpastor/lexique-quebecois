import { InputAdornment, TextField } from "@mui/material";
import { useFormikContext } from "formik";
import { forwardRef, ReactElement } from "react";

import { FormValues } from "./content";
import { FieldIconButton } from "./field-icon-button";

export const Field = forwardRef<HTMLInputElement>((_, ref): ReactElement => {
    const { values, errors, touched, handleChange } = useFormikContext<FormValues>();

    return (
        <TextField
            inputRef={ref}
            name="label"
            placeholder="Rechercher un mot"
            value={values.label}
            onChange={handleChange}
            error={touched.label && Boolean(errors.label)}
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
    );
});

Field.displayName = "Field";
