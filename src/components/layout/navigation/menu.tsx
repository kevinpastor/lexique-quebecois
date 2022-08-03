import { faBookReader } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { Add, AttachMoney, ChatBubble, Description, Home, ListAlt, Menu as MenuIcon, PrivacyTip } from "@mui/icons-material";
import { IconButton, List, SwipeableDrawer, Typography } from "@mui/material";
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
                <div className="w-64 divide-y-2 p-4">
                    <div className="flex flex-col items-center gap-2 py-4">
                        <FontAwesomeIcon
                            icon={faBookReader}
                            size="3x"
                        />
                        <Typography variant="h3">
                            Lexique Québecois
                        </Typography>
                    </div>
                    <div>
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
                    </div>
                    <div>
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
                    </div>
                </div>
            </SwipeableDrawer>
        </>
    );
};
