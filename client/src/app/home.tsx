import { ReactElement } from "react";

export const Home = (): ReactElement => (
    <div className="flex flex-row space-x-4">
        <div className="basis-2/3">
            <section className="bg-slate-700 rounded-lg p-8 space-y-4">
                <div className="text-3xl font-bold text-white">
                    Gyu
                </div>
                <div className="text-white">
                    Bon/beau. Peut être utiliser comme adjectif pour de la bouffe qui goûte bonne, ou pour une belle personne.
                </div>
                <div className="text-white italic">
                    Le poulet était tellement gyu!
                </div>
                <div>
                    <div className="text-slate-300">
                        par Kevin, 2 février 2022
                    </div>
                </div>
            </section>
        </div>
        <div className="basis-1/3">
            <div className="bg-slate-700 rounded-lg p-8 space-y-8">
                <div className="text-3xl font-bold text-white">
                    Sidebar
                </div>
            </div>
        </div>
    </div>
);
