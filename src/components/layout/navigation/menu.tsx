import { faBookReader } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { Add, AttachMoney, ChatBubble, Description, Home, ListAlt, Menu as MenuIcon, PrivacyTip } from "@mui/icons-material";
import { Box, Divider, IconButton, List, Stack, SwipeableDrawer, Typography } from "@mui/material";
import { ReactElement, useState } from "react";

import { MenuItem } from "./menu-item";

export const Menu = (): ReactElement => {
    const [isOpened, setIsOpened] = useState(false);

    const handleOpen = (): void => {
        setIsOpened(true);
    };

    const handleClose = (): void => {
        setIsOpened(false);
    };

    return (
        <>
            <IconButton onClick={handleOpen}>
                <MenuIcon />
            </IconButton>
            <SwipeableDrawer
                open={isOpened}
                onOpen={handleOpen}
                onClose={handleClose}
            >
                {/* TODO Update className */}
                <Box p={2} className="w-64 sm:w-96">
                    <Stack
                        my={2}
                        spacing={1}
                    >
                        <FontAwesomeIcon
                            icon={faBookReader}
                            size="3x"
                        />
                        <Typography
                            variant="h3"
                            align="center"
                        >
                            Lexique Québecois
                        </Typography>
                    </Stack>
                    <Divider />
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
                    <Divider />
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
                        <MenuItem
                            label="Contribuer"
                            href="/contribuer"
                            icon={<AttachMoney />}
                            onClick={handleClose}
                        />
                    </List>
                </Box>
            </SwipeableDrawer>
        </>
    );
};
