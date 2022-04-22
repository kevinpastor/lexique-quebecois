import Head from "next/head";
import { ReactElement } from "react";

const NotFound = (): ReactElement => (
    <>
        <Head>
            {/* eslint-disable-next-line react/jsx-one-expression-per-line */}
            <title>404 - Lexique Québécois</title>
        </Head>
        <section className="bg-slate-800 rounded-lg p-8 space-y-4">
            <div className="text-4xl font-bold text-slate-100 font-serif">
                404
            </div>
            <div className="text-slate-100 font-medium">
                Kossé tu fais icitte?! T&apos;es clairement pas le pogo le plus dégelé de la boite.
            </div>
        </section>
    </>
);

export default NotFound;
