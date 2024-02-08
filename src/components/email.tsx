import { Link } from "@mui/material";
import { type ReactNode } from "react";

export enum EmailType {
    Info = "info",
    Support = "support",
    Legal = "legal"
}

interface Props {
    type: EmailType;
}

// TODO Add more email addresses
export const Email = ({ type: _ }: Props): ReactNode => (
    <Link href="mailto:info@lexiquequebecois.com">
        info@lexiquequebecois.com
    </Link>
);
