"use client";

import { Stack } from "@mui/material";
import { useParams } from "next/navigation";
import { ReactElement } from "react";
import useSWR from "swr";

import { Definition as DefinitionComponent } from "@components/word";
import { Definition } from "@models/definition";
import { Word } from "@models/word";

import { MissingWord } from "./missing-word";
import { Spellings } from "./spellings";

interface Props {
    fallback: {
        [endpoint: string]: unknown;
    };
}

export const WordPage = ({ fallback }: Props): ReactElement => {
    const params = useParams();
    // ! TODO Fix type error
    const { data } = useSWR<Word | null>(`/api/words/${params["slug"]}`, { fallback });

    // `data` coming from `fallback`
    const word: Word | null = data as Word | null;

    if (!word || word.definitions.length === 0) { // `definitions` should theoretically never be empty.
        return <MissingWord />;
    }

    return (
        <Stack spacing={2}>
            <DefinitionComponent
                key={word.definitions[0].id}
                definition={word.definitions[0]}
            />
            <Spellings spellings={word.spellings} />
            {word.definitions.slice(1).map((definition: Definition): ReactElement => (
                <DefinitionComponent
                    key={definition.id}
                    definition={definition}
                />
            ))}
        </Stack>
    );
};
