import { Add, ChatBubble, Description, Home, ListAlt, LocalLibrary, PrivacyTip } from "@mui/icons-material";
import { Divider, List, Stack, Typography } from "@mui/material";
import { ReactElement } from "react";

import { MenuItem } from "./menu-item";
import { ThemeSelector } from "./theme-selector";

export interface MenuContentProps {
    onClose: () => void;
}

export const MenuContent = ({ onClose: handleClose }: MenuContentProps): ReactElement => (
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
            <Typography
                component="h1"
                variant="h3"
            >
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
        <List>
            <MenuItem
                label="Conditions"
                href="/conditions"
                icon={<Description />}
                onClick={handleClose}
            />
            <MenuItem
                label="Confidentialité"
                href="/confidentialite"
                icon={<PrivacyTip />}
                onClick={handleClose}
            />
            <MenuItem
                label="Contact"
                href="/contact"
                icon={<ChatBubble />}
                onClick={handleClose}
            />
        </List>
        <ThemeSelector />
    </Stack>
);
