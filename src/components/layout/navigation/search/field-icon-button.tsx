import { Search as SearchIcon } from "@mui/icons-material";
import { IconButton } from "@mui/material";
import { useFormikContext } from "formik";
import { ReactElement } from "react";

import { FormValues } from "./content";

export const FieldIconButton = (): ReactElement => {
    const { validateForm, handleSubmit } = useFormikContext<FormValues>();

    return (
        <IconButton
            onClick={async (): Promise<void> => {
                const { label: labelError } = await validateForm();

                if (!labelError) {
                    handleSubmit();
                }
            }}
            aria-label="Retour"
            size="small"
            edge="end"
        >
            <SearchIcon fontSize="small" />
        </IconButton>
    );
};
