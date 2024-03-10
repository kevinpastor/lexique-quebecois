import { Stack } from "@mui/material";
import { type ReactNode } from "react";

import { DefinitionsAd } from "~/components/ads/definitions-ad";
import { Definition } from "~/components/definition";
import { type Definition as IDefinition } from "~/types/definition";
import { insert } from "~/utils/misc/array";

interface Props {
    definitions: Array<IDefinition>;
}

export const WordsPage = ({ definitions }: Props): ReactNode => (
    <Stack spacing={2}>
        {insert(
            definitions.map((definition: IDefinition): ReactNode => (
                <Definition
                    key={definition.id}
                    definition={definition}
                />
            )),
            3,
            <DefinitionsAd key="ad" />
        )}
    </Stack>
);
