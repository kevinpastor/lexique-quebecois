import { Container, Link, List, ListItem, ListItemButton } from "@mui/material";
import { useFormikContext } from "formik";
import NextLink from "next/link";
import { ReactElement } from "react";
import useSWR from "swr";

import { Highlight } from "@components/misc/highlight";
import { getSlug } from "@models/definition";
import { useDebounce } from "@utils/hooks/use-debounce";

import { FormValues } from "./content";

export interface Props {
    onClose: () => void;
}

export const AutocompleteResults = ({ onClose: handleClose }: Props): ReactElement | null => {
    const { values: { label } } = useFormikContext<FormValues>();
    const debouncedLabel: string = useDebounce(label);
    const { data, error } = useSWR<Array<string>>(
        `/api/words/autocomplete?input=${debouncedLabel}`,
        null,
        {
            isPaused: (): boolean => (!debouncedLabel)
        }
    );

    if (error || !data) {
        return null;
    }

    return (
        <Container>
            <List>
                {data.map((word: string): ReactElement => (
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
