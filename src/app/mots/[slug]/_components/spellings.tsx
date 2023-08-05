import { Card, CardHeader } from "@mui/material";
import { type ReactElement } from "react";

interface Props {
    spellings: Array<string>;
}

export const Spellings = ({ spellings }: Props): ReactElement | null => {
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
