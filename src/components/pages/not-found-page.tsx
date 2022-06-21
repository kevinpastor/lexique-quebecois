import { faHouse } from "@fortawesome/free-solid-svg-icons";
import Head from "next/head";
import { useRouter } from "next/router";
import { ReactElement } from "react";

import { Button } from "@components/form/button";
import { Card } from "@components/misc/card";
import { Type } from "@components/type";
import { Paragraph } from "@components/typography/paragraph";
import { Title } from "@components/typography/title";

export const NotFoundPage = (): ReactElement => {
    const { push } = useRouter();

    const handleClick = async (): Promise<void> => {
        await push("/");
    };

    return (
        <>
            <Head>
                {/* eslint-disable-next-line react/jsx-one-expression-per-line */}
                <title>404 - Lexique Québécois</title>
            </Head>
            <Card>
                <Title>
                    404
                </Title>
                <Paragraph>
                    Kossé tu fais icitte?! T&apos;es clairement pas le pogo le plus dégelé de la boite.
                </Paragraph>
                <div className="flex flex-row-reverse">
                    <Button
                        onClick={handleClick}
                        label="Accueil"
                        icon={faHouse}
                        ariaLabel="Accueil"
                        type={Type.Text}
                    />
                </div>
            </Card>
        </>
    );
};
