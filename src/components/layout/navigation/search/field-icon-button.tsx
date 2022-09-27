import { Search as SearchIcon } from "@mui/icons-material";
import { IconButton } from "@mui/material";
import { useFormikContext } from "formik";
import { ReactElement } from "react";

import { FormValues } from "./content";

export const FieldIconButton = (): ReactElement => {
    const { validateForm, handleSubmit } = useFormikContext<FormValues>();

    const handleClick = async (): Promise<void> => {
        const { label: labelError } = await validateForm();

        if (!labelError) {
            handleSubmit();
        }
    };

    return (
        <IconButton
            onClick={handleClick}
            aria-label="Retour"
            size="small"
            edge="end"
        >
            <SearchIcon fontSize="small" />
        </IconButton>
    );
};
