"use client";

import { Card, CardContent, CardHeader, Typography } from "@mui/material";
import { ReactElement } from "react";

import { Email, EmailType } from "@components/misc/email";

export const ContactPage = (): ReactElement => (
    <Card>
        <CardHeader title="Contact" />
        <CardContent>
            <Typography
                variant="h3"
                gutterBottom
            >
                Problème technique
            </Typography>
            <Typography gutterBottom>
                {/* eslint-disable-next-line react/jsx-one-expression-per-line */}
                Pour quelconque problèmes que vous ayez pu rencontrez lors de l&apos;utilisation du site, veuillez nous contacter à l&apos;adresse suivante&nbsp;: <Email type={EmailType.Support} />. Nous donner le plus de détail nous permettra de mieux vous aider.
            </Typography>
            <Typography
                variant="h3"
                gutterBottom
            >
                Remarques sur le contenu
            </Typography>
            <Typography gutterBottom>
                {/* eslint-disable-next-line react/jsx-one-expression-per-line */}
                Si vous avez des suggestions, avez trouvé des coquilles, ou avez tout autre commentaires à propos du site, vous pouvez nous contacter à l&apos;adresse suivante&nbsp;: <Email type={EmailType.Info} />. Tout comme pour les problèmes techniques, nous vous remercions de nous donner le plus de détail possible.
            </Typography>
        </CardContent>
    </Card>
);
