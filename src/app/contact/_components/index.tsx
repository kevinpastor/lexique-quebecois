import { Card, CardContent, CardHeader, Typography } from "@mui/material";
import { ReactElement } from "react";

import { Email, EmailType } from "~/components/email";

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
                Pour quelconque problèmes que tu as pu rencontrez lors de l&apos;utilisation du site, contacte nous à l&apos;adresse suivante&nbsp;: <Email type={EmailType.Support} />. Donne nous le plus de détail que possible pour nous permettre de mieux t&apos;aider.
            </Typography>
            <Typography
                variant="h3"
                gutterBottom
            >
                Remarques sur le contenu
            </Typography>
            <Typography gutterBottom>
                {/* eslint-disable-next-line react/jsx-one-expression-per-line */}
                Si tu as des suggestions, a trouvé des erreurs, ou a tout autre commentaires à propos du site, contacte nous à l&apos;adresse suivante&nbsp;: <Email type={EmailType.Info} />. Tout comme pour les problèmes techniques, donne nous le plus de détail que possible pour nous permettre de mieux t&apos;aider.
            </Typography>
        </CardContent>
    </Card>
);
