import Link from "next/link";
import { useRouter } from "next/router";
import { FormEvent, ReactElement } from "react";

import { getResourceName } from "@utils/word";
import { IconButton } from "@components/form";

export const Navigation = (): ReactElement => {
    const router = useRouter();

    const onSubmit = async (event: FormEvent): Promise<void> => {
        event.preventDefault();
        const target = event.target as typeof event.target & {
            label: { value: string };
        };
        const label: string = target.label.value;
        const resourceName: string = getResourceName(label);
        await router.push(`/mots/${resourceName}`);
    };

    const onAdd = async (): Promise<void> => {
        await router.push("/ajouter");
    };

    return (
        <nav className="bg-slate-800">
            <div className="container mx-auto p-4 space-y-4">
                <Link href="/">
                    <a className="text-white text-2xl font-extrabold font-serif">
                        Québécois Urbain
                    </a>
                </Link>
                <div className="flex flex-row justify-between space-x-4">
                    <form onSubmit={onSubmit} className="flex-grow">
                        <div className="rounded bg-slate-700 hover:bg-slate-600 active:bg-slate-600 transition flex flex-row items-center gap-2">
                            <svg
                                xmlns="http://www.w3.org/2000/svg"
                                className="h-4 w-4 text-slate-300 my-2 ml-4 fill-transparent stroke-current"
                                viewBox="0 0 24 24"
                            >
                                <path
                                    className="stroke-2"
                                    strokeLinecap="round"
                                    strokeLinejoin="round"
                                    d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"
                                />
                            </svg>
                            <input
                                name="label"
                                placeholder="Chercher un mot"
                                minLength={2}
                                maxLength={32}
                                className="w-full placeholder-slate-500 focus:placeholder-slate-400 bg-transparent outline-none py-2 pr-4 caret-white text-slate-300" />
                        </div>
                    </form>
                    <div className="flex flex-row gap-4">
                        <IconButton
                            onClick={onAdd}
                            icon={
                                <svg
                                    xmlns="http://www.w3.org/2000/svg"
                                    className="h-6 w-6 fill-transparent stroke-current"
                                    viewBox="0 0 24 24"
                                >
                                    <path
                                        className="stroke-2"
                                        strokeLinecap="round"
                                        strokeLinejoin="round"
                                        d="M12 6v6m0 0v6m0-6h6m-6 0H6"
                                    />
                                </svg>
                            }
                        />
                    </div>
                </div>
            </div>
        </nav>
    );

    return (
        <nav className="bg-slate-800">
            <div className="container mx-auto p-4 flex flex-row justify-between">
                <Link href="/">
                    <a className="text-white text-2xl font-extrabold font-serif">
                        Québécois Urbain
                    </a>
                </Link>

                <div className="flex flex-row gap-4">
                    <div className="lg:hidden">
                        <Link href="/ajouter">
                            <a className="bg-blue-500 hover:bg-blue-600 font-bold rounded-full p-2 text-white text-center flex flex-row space-x-2 transition">
                                <svg
                                    xmlns="http://www.w3.org/2000/svg"
                                    className="h-6 w-6 fill-transparent stroke-current"
                                    viewBox="0 0 24 24"
                                >
                                    <path
                                        className="stroke-2"
                                        strokeLinecap="round"
                                        strokeLinejoin="round"
                                        d="M12 6v6m0 0v6m0-6h6m-6 0H6"
                                    />
                                </svg>
                            </a>
                        </Link>
                    </div>
                    <form onSubmit={onSubmit} className="hidden lg:block">
                        <div className="basis-1/4 rounded bg-slate-700 hover:bg-slate-600 active:bg-slate-600 transition flex flex-row items-center gap-2">
                            <svg
                                xmlns="http://www.w3.org/2000/svg"
                                className="h-4 w-4 text-slate-300 my-2 ml-4 fill-transparent stroke-current"
                                viewBox="0 0 24 24"
                            >
                                <path
                                    className="stroke-2"
                                    strokeLinecap="round"
                                    strokeLinejoin="round"
                                    d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"
                                />
                            </svg>
                            <input
                                name="label"
                                placeholder="Chercher un mot"
                                minLength={2}
                                maxLength={32}
                                className="placeholder-slate-500 bg-transparent outline-none py-2 pr-4 caret-white text-slate-300" />
                        </div>
                    </form>
                </div>
            </div>
        </nav>
    );
};
