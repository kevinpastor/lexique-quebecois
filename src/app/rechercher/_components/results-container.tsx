import { ReactElement, RefObject } from "react";
import { useWatch } from "react-hook-form";
import useSWR from "swr";

import { useDebounce } from "~/hooks/use-debounce";

import { FormValues } from ".";
import { LoadingResults } from "./loading-results";
import { Results } from "./results";

interface Props {
    inputRef: RefObject<HTMLInputElement>;
}

export const ResultsContainer = ({ inputRef }: Props): ReactElement | null => {
    const label: string = useWatch<FormValues>({ name: "label" });
    const debouncedLabel: string = useDebounce(label);

    const shouldFetch: boolean = debouncedLabel.length > 0;
    const { data, error, isLoading } = useSWR<Array<string>, unknown>(
        shouldFetch
            ? `/api/words/autocomplete?input=${debouncedLabel}`
            : null
    );

    if (isLoading) {
        return (
            <LoadingResults />
        );
    }

    if (error) {
        return null;
    }

    if (data === undefined) {
        // TODO Invite the user to type something.
        return null;
    }

    return (
        <Results
            inputRef={inputRef}
            label={debouncedLabel}
            words={data}
        />
    );
};
