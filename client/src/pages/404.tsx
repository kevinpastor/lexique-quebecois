import { ReactElement } from "react";

const NotFound = (): ReactElement => (
    <section className="bg-slate-800 rounded-lg p-8 space-y-4">
        <div className="text-4xl font-bold text-white font-serif">
            404
        </div>
        <div className="text-white font-medium">
            Kossé tu fais icitte?! T&apos;es clairement pas le pogo le plus dégelé de la boite.
        </div>
    </section>
);

export default NotFound;
