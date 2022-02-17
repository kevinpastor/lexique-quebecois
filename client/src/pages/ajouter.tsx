import { NextPage } from "next";
import { FormEvent, ReactElement } from "react";
import { Word } from "@quebecois-urbain/shared/models/word";
import { addWord } from "src/requests/word";

const Add: NextPage = (): ReactElement => {
    const handleSubmit = async (event: FormEvent): Promise<void> => {
        event.preventDefault();

        const target = event.target as typeof event.target & {
            label: { value: string };
            definition: { value: string };
            example: { value: string };
        };

        const word: Word = {
            label: target.label.value,
            definition: target.definition.value,
            example: target.example.value,
            author: "Kevin Pastor"
        };

        const status: boolean = await addWord(word);
    };

    return (
        <form onSubmit={handleSubmit}>
            <section className="bg-slate-700 rounded-lg p-8 space-y-4">
                <div className="text-3xl font-bold text-white">
                    Ajouter un mot
                </div>
                <div className="space-y-1">
                    <div className="text-white">
                        Mot *
                    </div>
                    <input
                        className="rounded bg-slate-500 p-2 outline-none text-white w-full"
                        name="label"
                    />
                </div>
                <div className="space-y-1">
                    <div className="text-white">
                        Définition *
                    </div>
                    <textarea
                        className="rounded bg-slate-500 p-2 outline-none text-white w-full resize-none"
                        name="definition"
                    />
                </div>
                <div className="space-y-1">
                    <div className="text-white">
                        Exemple
                    </div>
                    <input
                        className="rounded bg-slate-500 p-2 outline-none text-white w-full"
                        name="example"
                    />
                </div>
                <div className="flex flex-row-reverse">
                    <button type="submit" className="block bg-blue-500 font-bold  rounded-full px-8 py-4 text-white text-center">
                        Soumettre
                    </button>
                </div>
            </section>
        </form>
    );
};

export default Add;
