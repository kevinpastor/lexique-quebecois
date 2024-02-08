import { ChevronLeft } from "@mui/icons-material";
import { IconButton } from "@mui/material";
import { useRouter } from "next/navigation";
import { type ReactNode } from "react";

export const BackButton = (): ReactNode => {
    // eslint-disable-next-line @typescript-eslint/unbound-method
    const { back } = useRouter();

    return (
        <IconButton
            onClick={back}
            aria-label="Retour"
            edge="start"
        >
            <ChevronLeft />
        </IconButton>
    );
};
