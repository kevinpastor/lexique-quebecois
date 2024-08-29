import { Grid2 as Grid, Link } from "@mui/material";
import NextLink from "next/link";
import { type ReactNode } from "react";

import { getSlug } from "~/types/definition";

interface Props {
    word: string;
    isLast?: boolean;
}

export const WordLink = ({ word, isLast = false }: Props): ReactNode => {
    const slug: string = getSlug(word);

    return (
        <Grid
            key={slug}
            size={{
                xs: 12,
                sm: 6,
                md: 4
            }}
            paddingY={0.5}
        >
            <Link
                component={NextLink}
                href={`/mots/${slug}`}
                gutterBottom={isLast}
            >
                {word}
            </Link>
        </Grid>
    );
};
