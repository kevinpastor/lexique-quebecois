import { Add, Home, ListAlt, LocalLibrary } from "@mui/icons-material";
import { Divider, List, Stack, Typography } from "@mui/material";
import { ReactElement } from "react";

import { MenuItem } from "./menu-item";
import { ThemeSelector } from "./theme-selector";

export interface Props {
    onClose: () => void;
}

export const MenuContent = ({ onClose: handleClose }: Props): ReactElement => (
    <Stack
        width={256}
        p={2}
        divider={<Divider />}
    >
        <Stack
            my={2}
            spacing={1}
            alignItems="center"
        >
            <LocalLibrary fontSize="large" />
            <Typography variant="h3">
                Lexique Québecois
            </Typography>
        </Stack>
        <List>
            <MenuItem
                label="Accueil"
                href="/"
                icon={<Home />}
                onClick={handleClose}
            />
            <MenuItem
                label="Ajouter"
                href="/ajouter"
                icon={<Add />}
                onClick={handleClose}
            />
            <MenuItem
                label="Index"
                href="/mots"
                icon={<ListAlt />}
                onClick={handleClose}
            />
        </List>
        {/*
        <List>
            // TODO Create both pages
            <MenuItem
                label="Contact"
                href="/contact"
                icon={<ChatBubble />}
                onClick={handleClose}
            />
            <MenuItem
                label="Contribuer"
                href="/contribuer"
                icon={<AttachMoney />}
                onClick={handleClose}
            />
        </List>
        */}
        <ThemeSelector />
    </Stack>
);
