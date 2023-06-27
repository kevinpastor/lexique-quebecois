"use client";

import { Stack } from "@mui/material";
import { ReactElement } from "react";

import { LoadingWord } from "@components/loading-word";

const Loading = (): ReactElement => (
    <Stack spacing={2}>
        {[...Array(5)].map((_: undefined, index: number): ReactElement => (
            // eslint-disable-next-line react/no-array-index-key
            <LoadingWord key={index} />
        ))}
    </Stack>
);

export default Loading;
