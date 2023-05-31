import { Stack } from "@mui/material";
import { ReactElement } from "react";
import useSWR from "swr";

import { Definition as WordComponent } from "@components/misc/word";
import { Definition } from "@models/definition";

export const WordsPage = (): ReactElement => {
    const { data } = useSWR<Array<Definition>>("/api/words/sample");

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
