import { NextPage } from "next";
import { FormEvent, ReactElement } from "react";
import { Word } from "@quebecois-urbain/shared/models/word";
import { addWord } from "src/requests/word";
import { useRouter } from "next/router";

const Add: NextPage = (): ReactElement => {
    const router = useRouter();

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

        if (!status) {
            alert("Une erreur s'est produite. Veuillez réessayer.");
            return;
        }

        alert("Votre contribution a bel et bien été enregistrée. Elle sera examinée sous peu.");
        await router.push("/");
    };

    return (
        <form onSubmit={handleSubmit}>
            <section className="bg-slate-800 rounded-lg p-8 space-y-8">
                <div className="text-3xl font-bold text-white font-serif">
                    Ajouter un mot
                </div>
                <div className="space-y-4">
                    <div className="space-y-1">
                        <label className="text-slate-200">
                            Mot
                        </label>
                        <input
                            className="rounded bg-slate-700 hover:bg-slate-600 focus:bg-slate-600 transition p-2 outline-none text-slate-300 w-full"
                            name="label"
                            required
                            autoFocus
                            minLength={2}
                            maxLength={32}
                        />
                    </div>
                    <div className="space-y-1">
                        <label className="text-slate-200">
                            Définition
                        </label>
                        <textarea
                            className="rounded bg-slate-700 hover:bg-slate-600 focus:bg-slate-600 transition p-2 outline-none text-slate-300 w-full resize-none"
                            name="definition"
                            required
                            minLength={2}
                            maxLength={256}
                        />
                    </div>
                    <div className="space-y-1">
                        <label className="text-slate-200">
                            Exemple
                        </label>
                        <input
                            className="rounded bg-slate-700 hover:bg-slate-600 focus:bg-slate-600 transition p-2 outline-none text-slate-300 w-full"
                            name="example"
                            required
                            minLength={2}
                            maxLength={256}
                        />
                    </div>
                    <div className="space-y-1">
                        <label className="text-slate-200">
                            Auteur
                        </label>
                        <input
                            className="rounded bg-slate-700 hover:bg-slate-600 focus:bg-slate-600 transition p-2 outline-none text-slate-300 w-full"
                            name="author"
                            required
                            minLength={2}
                            maxLength={32}
                        />
                    </div>
                </div>
                <div className="flex flex-row-reverse">
                    <button type="submit" className="block bg-blue-500 hover:bg-blue-600 transition font-bold  rounded-full px-6 py-3 text-white text-center flex flex-row gap-2">
                        <svg
                            xmlns="http://www.w3.org/2000/svg"
                            className="h-6 w-6 fill-transparent stroke-current"
                            viewBox="0 0 24 24"
                        >
                            <path
                                className="stroke-2"
                                strokeLinecap="round"
                                strokeLinejoin="round"
                                d="M4 16v1a3 3 0 003 3h10a3 3 0 003-3v-1m-4-8l-4-4m0 0L8 8m4-4v12"
                            />
                        </svg>
                        Soumettre
                    </button>
                </div>
            </section>
        </form>
    );
};

export default Add;
