import { Typography } from "@mui/material";
import Head from "next/head";
import { ReactElement } from "react";

import { Card } from "@components/misc/card";

export const InternalErrorPage = (): ReactElement => (
    <>
        <Head>
            {/* eslint-disable-next-line react/jsx-one-expression-per-line */}
            <title>Erreur inconnue - Lexique Québécois</title>
        </Head>
        <Card>
            <Typography variant="h2">
                Une erreur s&apos;est produite
            </Typography>
            <div className="text-black/[.87] font-medium">
                Impossible de charger l&apos;information
            </div>
        </Card>
    </>
);
