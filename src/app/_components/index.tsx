import { Stack } from "@mui/material";
import { ReactElement } from "react";

import { Definition as WordComponent } from "@components/word";
import { Definition } from "@models/definition";

interface Props {
    definitions: Array<Definition>;
}

export const WordsPage = ({ definitions }: Props): ReactElement => (
    <Stack spacing={2}>
        {definitions.map((definition: Definition): ReactElement => (
            <WordComponent
                key={definition.id}
                definition={definition}
            />
        ))}
    </Stack>
);
