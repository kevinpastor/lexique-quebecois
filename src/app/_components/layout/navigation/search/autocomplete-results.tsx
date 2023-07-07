import { Container, List, ListItem, ListItemButton, Skeleton } from "@mui/material";
import Link from "next/link";
import { ReactElement, RefObject, useEffect } from "react";
import { useWatch } from "react-hook-form";
import useSWR from "swr";

import { Highlight } from "~/components/highlight";
import { useDebounce } from "~/hooks/use-debounce";
import { KeyboardFocusSelectionUtility, useKeyboardFocusSelection } from "~/hooks/use-keyboard-focus-selection";
import { getSlug } from "~/types/definition";

import { FormValues } from "./search-content";

export interface Props {
    inputRef: RefObject<HTMLInputElement>;
    onClose: () => void;
}

export const AutocompleteResults = ({ inputRef, onClose: handleClose }: Props): ReactElement | null => {
    const label = useWatch<FormValues>({ name: "label" });
    const debouncedLabel: string = useDebounce(label);

    const shouldFetch: boolean = debouncedLabel.length > 0;
    const { data, error } = useSWR<Array<string>, unknown>(
        shouldFetch
            ? `/api/words/autocomplete?input=${debouncedLabel}`
            : null
    );

    const { itemRef }: KeyboardFocusSelectionUtility = useKeyboardFocusSelection();

    useEffect((): void => {
        itemRef(0)(inputRef.current);
    }, [inputRef, itemRef]);

    const isLoading: boolean = label.length > 0 && data === undefined && !error;

    if (isLoading) {
        return (
            <Container>
                <List>
                    <ListItem disablePadding>
                        <ListItemButton disabled>
                            <Skeleton
                                variant="text"
                                width={125}
                            />
                        </ListItemButton>
                    </ListItem>
                    <ListItem disablePadding>
                        <ListItemButton disabled>
                            <Skeleton
                                variant="text"
                                width={100}
                            />
                        </ListItemButton>
                    </ListItem>
                    <ListItem disablePadding>
                        <ListItemButton disabled>
                            <Skeleton
                                variant="text"
                                width={150}
                            />
                        </ListItemButton>
                    </ListItem>
                    <ListItem disablePadding>
                        <ListItemButton disabled>
                            <Skeleton
                                variant="text"
                                width={130}
                            />
                        </ListItemButton>
                    </ListItem>
                    <ListItem disablePadding>
                        <ListItemButton disabled>
                            <Skeleton
                                variant="text"
                                width={120}
                            />
                        </ListItemButton>
                    </ListItem>
                </List>
            </Container>
        );
    }

    if (error || data === undefined) {
        return null;
    }

    return (
        <Container>
            <List>
                {data.map((word: string, index: number): ReactElement => (
                    <ListItem
                        key={word}
                        disablePadding
                    >
                        <ListItemButton
                            component={Link}
                            href={`/mots/${getSlug(word)}`}
                            onClick={handleClose}
                            ref={itemRef(index + 1)}
                        >
                            <Highlight
                                word={word}
                                highlight={debouncedLabel}
                            />
                        </ListItemButton>
                    </ListItem>
                ))}
            </List>
        </Container>
    );
};
