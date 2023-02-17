import { Card, CardContent, CardHeader, Typography } from "@mui/material";
import Head from "next/head";
import { ReactElement } from "react";

export const ContentPage = (): ReactElement => (
    <>
        <Head>
            <title>Politiques sur le contenu - Lexique Québécois</title>
        </Head>
        <Card>
            <CardHeader title="Politique sur le contenu" />
            <CardContent>
                <Typography gutterBottom>
                    N&apos;importe qui peut ajouter un mot, mais afin de rendre l&apos;expérience le fun pour tout le monde, on te demande de suivre quelques règles de base.
                </Typography>
                <Typography
                    variant="h3"
                    gutterBottom
                >
                    Ce qui est permis
                </Typography>
                <Typography
                    variant="h4"
                    gutterBottom
                >
                    Écris pour un large public
                </Typography>
                <Typography gutterBottom>
                    Lorsque tu définis un mot, assure-toi de fournir suffisamment de contexte pour que les autres puissent comprendre ce que ça signifie et comment il est généralement utilisé. Besoin d&apos;aide? Jette un coup d&apos;œil à notre mot du jour pour des exemples.
                </Typography>
                <Typography
                    variant="h4"
                    gutterBottom
                >
                    Sois créatif
                </Typography>
                <Typography gutterBottom>
                    Certaines des meilleures définitions sur le Lexique Québécois trouvent des façons humoristiques de se moquer de l&apos;autorité, ou donnent une tournure astucieuse aux événements actuels. Certaines d&apos;entre elles sont tout simplement étranges. On accepte ça.
                </Typography>
                <Typography
                    variant="h4"
                    gutterBottom
                >
                    Amuse-toi
                </Typography>
                <Typography gutterBottom>
                    On n&apos;est pas un dictionnaire traditionnel. C&apos;est un endroit où la langue a un peu plus d&apos;espace pour être explorée et construite librement, sur le moment.
                </Typography>
                <Typography
                    variant="h3"
                    gutterBottom
                >
                    Ce qui n&apos;est pas permis
                </Typography>
                <Typography
                    variant="h4"
                    gutterBottom
                >
                    Ne publie pas d&apos;informations personnelles
                </Typography>
                <Typography gutterBottom>
                    Ça comprend des choses évidentes comme des noms et des adresses, mais on supprimera également les définitions contenant des prénoms ou des identifiants d&apos;utilisateurs s&apos;ils peuvent être utilisés pour identifier et cibler des personnes spécifiques pour harcèlement.
                </Typography>
                <Typography
                    variant="h4"
                    gutterBottom
                >
                    Ne sois pas un trou de cul
                </Typography>
                <Typography gutterBottom>
                    On tolère les gens qui définissent des mots offensants. Après tout, les gens utilisent ces mots là dans le monde réel et une ressource pour comprendre ce qu&apos;ils signifient peut être précieuse. Cependant, on n&apos;acceptera jamais que des gens utilisent une définition pour harceler, discriminer ou inciter directement à la violence contre d&apos;autres personnes.
                </Typography>
                <Typography
                    variant="h3"
                    gutterBottom
                >
                    Remarque
                </Typography>
                <Typography gutterBottom>
                    Si tu remarques quelque chose sur le Lexique Québécois qui ne respecte pas ces règles, signale-le pour examen.
                </Typography>
                <Typography
                    variant="subtitle2"
                    align="right"
                >
                    Mis à jour le 16 février 2022
                </Typography>
            </CardContent>
        </Card >
    </>
);
