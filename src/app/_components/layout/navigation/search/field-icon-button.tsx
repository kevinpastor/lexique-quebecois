import { Search as SearchIcon } from "@mui/icons-material";
import { IconButton } from "@mui/material";
import { ReactElement } from "react";

export const FieldIconButton = (): ReactElement => (
    <IconButton
        aria-label="Retour"
        size="small"
        edge="end"
        type="submit"
    >
        <SearchIcon fontSize="small" />
    </IconButton>
);
