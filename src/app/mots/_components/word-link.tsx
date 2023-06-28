import { Link, Unstable_Grid2 as Grid } from "@mui/material";
import NextLink from "next/link";
import { ReactElement } from "react";

import { getSlug } from "@models/definition";

interface Props {
    word: string;
    isLast?: boolean;
}

export const WordLink = ({ word, isLast = false }: Props): ReactElement => {
    const slug: string = getSlug(word);

    return (
        <Grid
            key={slug}
            xs={12}
            sm={6}
            md={4}
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
