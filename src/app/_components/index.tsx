"use client";

import { Stack } from "@mui/material";
import { ReactElement } from "react";

import { InFeedAd } from "~/components/ads/in-feed-ad";
import { Definition } from "~/components/definition";
import { Definition as IDefinition } from "~/types/definition";

// eslint-disable-next-line @typescript-eslint/comma-dangle
const insert = <T,>(array: Array<T>, index: number, ...items: Array<T>): Array<T> => [
    ...array.slice(0, index),
    ...items,
    ...array.slice(index)
];

interface Props {
    definitions: Array<IDefinition>;
}

export const WordsPage = ({ definitions }: Props): ReactElement => (
    <Stack spacing={2}>
        {insert(
            definitions.map((definition: IDefinition): ReactElement => (
                <Definition
                    key={definition.id}
                    definition={definition}
                />
            )),
            1,
            <InFeedAd key="ad" />
        )}
    </Stack>
);
