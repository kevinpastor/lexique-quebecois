import { Stack } from "@mui/material";
import { ReactElement } from "react";

import { LoadingWord } from "./loading-word";

export const LoadingIndex = (): ReactElement => (
    <Stack spacing={2}>
        {[...Array(5)].map((_: undefined, index: number): ReactElement => (
            // eslint-disable-next-line react/no-array-index-key
            <LoadingWord key={index} />
        ))}
    </Stack>
);
