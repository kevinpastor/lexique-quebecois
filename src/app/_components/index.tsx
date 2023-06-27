"use client";

import { Stack } from "@mui/material";
import { ReactElement } from "react";
import useSWR from "swr";

import { Definition as WordComponent } from "@components/word";
import { Definition } from "@models/definition";

interface Props {
    fallback: {
        [endpoint: string]: unknown;
    };
}

export const WordsPage = ({ fallback }: Props): ReactElement => {
    const { data } = useSWR<Array<Definition>>("/api/words/sample", { fallback });

    // `data` coming from `fallback`
    const definitions: Array<Definition> = data as Array<Definition>;

    return (
        <Stack spacing={2}>
            {definitions.map((definition: Definition): ReactElement => (
                <WordComponent
                    key={definition.id}
                    definition={definition}
                />
            ))}
        </Stack>
    );
};
