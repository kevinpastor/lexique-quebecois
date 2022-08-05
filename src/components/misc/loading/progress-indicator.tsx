import { Box, LinearProgress } from "@mui/material";
import { ReactElement } from "react";

export const ProgressIndicator = (): ReactElement => (
    <Box
        position="fixed"
        top={0}
        left={0}
        right={0}
        zIndex={1200}
    >
        <LinearProgress />
    </Box>
);
