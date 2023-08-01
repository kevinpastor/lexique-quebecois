import { ReactElement, useRef } from "react";

import { NavigationContainer } from "~/components/navigation-container";
import { TextField } from "~/components/react-hook-form/text-field";

import { BackButton } from "./back-button";
import { ResultsContainer } from "./results-container";

export const Form = (): ReactElement => {
    const inputRef = useRef<HTMLInputElement>(null);

    return (
        <>
            <NavigationContainer>
                <BackButton />
                <TextField
                    inputRef={inputRef}
                    name="label"
                    placeholder="Rechercher un mot"
                    size="small"
                    spellCheck={false}
                    hideError
                    autoFocus
                />
            </NavigationContainer>
            <ResultsContainer inputRef={inputRef} />
        </>
    );
};
