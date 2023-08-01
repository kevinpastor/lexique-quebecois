import { Stack } from "@mui/material";
import { ReactElement } from "react";

import { DefinitionsAd } from "~/components/ads/definitions-ad";
import { Definition } from "~/components/definition";
import { Definition as IDefinition } from "~/types/definition";
import { Word } from "~/types/word";

import { MissingWord } from "./missing-word";
import { Spellings } from "./spellings";

interface Props {
    word: Word | null;
}

export const WordPage = ({ word }: Props): ReactElement => {
    if (!word || word.definitions.length === 0) { // `definitions` should theoretically never be empty.
        return <MissingWord />;
    }

    return (
        <Stack spacing={2}>
            <Definition
                key={word.definitions[0].id}
                definition={word.definitions[0]}
            />
            <Spellings spellings={word.spellings} />
            <DefinitionsAd />
            {word.definitions.slice(1).map((definition: IDefinition): ReactElement => (
                <Definition
                    key={definition.id}
                    definition={definition}
                />
            ))}
        </Stack>
    );
};
