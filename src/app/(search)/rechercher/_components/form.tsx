import { ArrowBack } from "@mui/icons-material";
import { IconButton } from "@mui/material";
import { useRouter } from "next/navigation";
import { ReactElement, useRef } from "react";

import { NavigationContainer } from "~/app/(root)/_components/layout/navigation/navigation-container";

import { AutocompleteResults } from "./autocomplete-results";
import { Field } from "./field";

export const Form = (): ReactElement => {
    // eslint-disable-next-line @typescript-eslint/unbound-method
    const { back } = useRouter();

    const inputRef = useRef<HTMLInputElement>(null);

    return (
        <>
            <NavigationContainer>
                <IconButton
                    onClick={back}
                    aria-label="Retour"
                    edge="start"
                >
                    <ArrowBack />
                </IconButton>
                <Field ref={inputRef} />
            </NavigationContainer>
            <AutocompleteResults inputRef={inputRef} />
        </>
    );
};
