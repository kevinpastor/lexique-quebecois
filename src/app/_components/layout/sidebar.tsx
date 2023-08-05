import { Card, CardContent, Link, Stack, Typography } from "@mui/material";
import NextLink from "next/link";
import { type ReactElement } from "react";

import { DefinitionsAd } from "~/components/ads/definitions-ad";

export const Sidebar = (): ReactElement => (
    <Stack
        spacing={2}
        component="aside"
        sx={{
            display: {
                xs: "none",
                md: "inherit"
            }
        }}
    >
        <Card>
            <CardContent>
                <Typography
                    variant="body1"
                    align="center"
                >
                    Le Lexique Québécois est la plateforme pour en apprendre plus sur la culture populaire québécoise, peu importe si t&apos;es un ado, un millénial, ou un boomer.
                </Typography>
            </CardContent>
        </Card>
        <DefinitionsAd />
        <Card>
            <CardContent>
                <Typography align="center">
                    {/* eslint-disable-next-line react/jsx-one-expression-per-line, react/jsx-max-props-per-line */}
                    C&apos;est un peu comme Urban Dictionary, mais <Link component={NextLink} href="/mots/tokebakicitte">tokébakicitte</Link>.
                </Typography>
            </CardContent>
        </Card>
    </Stack>
);
