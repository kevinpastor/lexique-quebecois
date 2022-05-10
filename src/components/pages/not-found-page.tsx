import Head from "next/head";
import { ReactElement } from "react";

import { Card } from "@components/misc/card";
import { Title } from "@components/typography/title";

export const NotFoundPage = (): ReactElement => (
    <>
        <Head>
            {/* eslint-disable-next-line react/jsx-one-expression-per-line */}
            <title>404 - Lexique Québécois</title>
        </Head>
        <Card>
            <Title>
                404
            </Title>
            <div className="text-slate-100 font-medium">
                Kossé tu fais icitte?! T&apos;es clairement pas le pogo le plus dégelé de la boite.
            </div>
        </Card>
    </>
);
