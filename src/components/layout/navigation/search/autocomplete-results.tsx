import { Container, Link, List, ListItem, ListItemButton } from "@mui/material";
import NextLink from "next/link";
import { ReactElement, RefObject, useEffect } from "react";
import { useWatch } from "react-hook-form";
import useSWR from "swr";

import { Highlight } from "@components/misc/highlight";
import { getSlug } from "@models/definition";
import { useDebounce } from "@utils/hooks/use-debounce";
import { KeyboardFocusSelectionUtility, useKeyboardFocusSelection } from "@utils/hooks/use-keyboard-focus-selection";

import { FormValues } from "./content";

export interface Props {
    inputRef: RefObject<HTMLInputElement>;
    onClose: () => void;
}

export const AutocompleteResults = ({ inputRef, onClose: handleClose }: Props): ReactElement | null => {
    const label = useWatch<FormValues>({ name: "label" });
    const debouncedLabel: string = useDebounce(label);
    const { data, error } = useSWR<Array<string>>(
        `/api/words/autocomplete?input=${debouncedLabel}`,
        null,
        {
            isPaused: (): boolean => (!debouncedLabel)
        }
    );

    const { itemRef }: KeyboardFocusSelectionUtility = useKeyboardFocusSelection();

    useEffect((): void => {
        itemRef(0)(inputRef.current);
    }, [inputRef, itemRef]);

    if (error || !data) {
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
                        <NextLink
                            href={`/mots/${getSlug(word)}`}
                            passHref
                            legacyBehavior
                        >
                            <ListItemButton
                                component={Link}
                                onClick={handleClose}
                                ref={itemRef(index + 1)}
                            >
                                <Highlight
                                    word={word}
                                    highlight={debouncedLabel}
                                />
                            </ListItemButton>
                        </NextLink>
                    </ListItem>
                ))}
            </List>
        </Container>
    );
};
