import { Card, CardHeader } from "@mui/material";
import { type ReactNode } from "react";

interface Props {
    spellings: Array<string>;
}

export const Spellings = ({ spellings }: Props): ReactNode => {
    if (spellings.length <= 1) {
        return null;
    }

    return (
        <Card>
            <CardHeader
                title="Orthographes"
                titleTypographyProps={{ variant: "h3" }}
                subheader={spellings.join(", ")}
            />
        </Card>
    );
};
