import Head from "next/head";
import { ReactElement } from "react";

import { Card } from "@components/misc/card";
import { Title } from "@components/typography/title";

const InternalError = (): ReactElement => (
    <>
        <Head>
            {/* eslint-disable-next-line react/jsx-one-expression-per-line */}
            <title>Erreur inconnue - Lexique Québécois</title>
        </Head>
        <Card>
            <Title>
                Une erreur s&apos;est produite
            </Title>
            <div className="text-slate-100 font-medium">
                Impossible de charger l&apos;information
            </div>
        </Card>
    </>
);

export default InternalError;
