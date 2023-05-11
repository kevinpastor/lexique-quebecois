import { Stack } from "@mui/material";
import { useRouter } from "next/router";
import { ReactElement, useEffect } from "react";
import useSWR from "swr";

import { Definition as WordComponent } from "@components/misc/word";
import { Definition } from "@models/definition";
import { useAlerts } from "@utils/hooks/use-alerts";

const useNextAuth = (): void => {
    const { query } = useRouter();
    const { enqueueErrorAlert, enqueueSuccessAlert } = useAlerts();

    const authentication = query["connexion"]; // Refers to the query parameter given in the NextAuth configuration.
    const error = query["error"];
    const verification = query["verification"]; // Refers to the query parameter given in the NextAuth configuration.

    useEffect((): void => {
        if (authentication === undefined || typeof authentication !== "string") {
            return;
        }

        if (error === "AccessDenied") {
            enqueueErrorAlert("Tu n'as pas l'autorisation de te connecter.");
            return;
        }

        enqueueErrorAlert("Une erreur s'est produite. Veuillez réessayer plus tard.");
    }, [authentication, enqueueErrorAlert, error]);

    useEffect((): void => {
        if (authentication === undefined || typeof authentication !== "string") {
            return;
        }

        if (verification !== undefined) {
            enqueueSuccessAlert("Un lien de connexion a été envoyé à ton adresse courriel.");
            return;
        }
    }, [authentication, enqueueSuccessAlert, verification]);
};

export const WordsPage = (): ReactElement => {
    const { data } = useSWR<Array<Definition>>("/api/words/sample");

    // `data` coming from `fallback`
    const definitions: Array<Definition> = data as Array<Definition>;

    useNextAuth();

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
