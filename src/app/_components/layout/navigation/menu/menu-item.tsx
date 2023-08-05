import { ListItem, ListItemButton, ListItemIcon, ListItemText } from "@mui/material";
import Link from "next/link";
import { type ReactElement, type ReactNode } from "react";

interface Props {
    label: ReactNode;
    href: string;
    icon: ReactNode;
    onClick: () => void;
}

export const MenuItem = ({ label, href, icon, onClick }: Props): ReactElement => (
    <ListItem disableGutters>
        <ListItemButton
            component={Link}
            href={href}
            onClick={onClick}
        >
            <ListItemIcon>
                {icon}
            </ListItemIcon>
            <ListItemText primary={label} />
        </ListItemButton>
    </ListItem>
);
