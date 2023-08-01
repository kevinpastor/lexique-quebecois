import { Container, List, ListItem, ListItemButton } from "@mui/material";
import Link from "next/link";
import { ReactElement, RefObject, useEffect } from "react";

import { Highlight } from "~/components/highlight";
import { KeyboardFocusSelectionUtility, useKeyboardFocusSelection } from "~/hooks/use-keyboard-focus-selection";
import { getSlug } from "~/types/definition";

interface Props {
    inputRef: RefObject<HTMLInputElement>;
    label: string;
    words: Array<string>;
}

export const Results = ({ inputRef, label, words }: Props): ReactElement => {
    const { itemRef }: KeyboardFocusSelectionUtility = useKeyboardFocusSelection();

    useEffect((): void => {
        itemRef(0)(inputRef.current);
    }, [inputRef, itemRef]);

    return (
        <Container>
            <List>
                {words.map((word: string, index: number): ReactElement => (
                    <ListItem
                        key={word}
                        disablePadding
                    >
                        <ListItemButton
                            component={Link}
                            href={`/mots/${getSlug(word)}`}
                            ref={itemRef(index + 1)}
                        >
                            <Highlight
                                word={word}
                                highlight={label}
                            />
                        </ListItemButton>
                    </ListItem>
                ))}
            </List>
        </Container>
    );
};
