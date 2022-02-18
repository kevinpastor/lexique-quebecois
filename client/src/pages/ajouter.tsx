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
            author: { value: string };
        };

        const word: Word = {
            label: target.label.value,
            definition: target.definition.value,
            example: target.example.value,
            author: target.author.value
        };

        const status: boolean = await addWord(word);
    };

    return (
        <form onSubmit={handleSubmit}>
            <section className="bg-slate-800 rounded-lg p-8 space-y-8">
                <div className="text-3xl font-bold text-white">
                    Ajouter un mot
                </div>
                <div className="space-y-4">
                    <div className="space-y-1">
                        <div className="text-slate-200">
                            Mot
                        </div>
                        <input
                            className="rounded bg-slate-700 p-2 outline-none text-white w-full"
                            name="label"
                            required
                        />
                    </div>
                    <div className="space-y-1">
                        <div className="text-slate-200">
                            Définition
                        </div>
                        <textarea
                            className="rounded bg-slate-700 p-2 outline-none text-white w-full resize-none"
                            name="definition"
                            required
                        />
                    </div>
                    <div className="space-y-1">
                        <div className="text-slate-200">
                            Exemple
                        </div>
                        <input
                            className="rounded bg-slate-700 p-2 outline-none text-white w-full"
                            name="example"
                            required
                        />
                    </div>
                    <div className="space-y-1">
                        <div className="text-slate-200">
                            Auteur
                        </div>
                        <input
                            className="rounded bg-slate-700 p-2 outline-none text-white w-full"
                            name="author"
                            required
                        />
                    </div>
                </div>
                <div className="flex flex-row-reverse">
                    <button type="submit" className="block bg-blue-500 font-bold  rounded-full px-6 py-3 text-white text-center">
                        Soumettre
                    </button>
                </div>
            </section>
        </form>
    );
};

export default Add;
