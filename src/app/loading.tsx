import { Stack } from "@mui/material";
import { type ReactNode } from "react";

import { LoadingWord } from "~/components/loading-word";

const Loading = (): ReactNode => (
    <Stack spacing={2}>
        {[...Array<undefined>(5)].map((_: undefined, index: number): ReactNode => (
            // eslint-disable-next-line react/no-array-index-key
            <LoadingWord key={index} />
        ))}
    </Stack>
);

export default Loading;
