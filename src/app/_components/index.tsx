import { Stack } from "@mui/material";
import { ReactElement } from "react";

import { Definition } from "@components/word";
import { Definition as IDefinition } from "@models/definition";

interface Props {
    definitions: Array<IDefinition>;
}

export const WordsPage = ({ definitions }: Props): ReactElement => (
    <Stack spacing={2}>
        {definitions.map((definition: IDefinition): ReactElement => (
            <Definition
                key={definition.id}
                definition={definition}
            />
        ))}
    </Stack>
);
