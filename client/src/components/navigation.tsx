import Link from "next/link";
import { useRouter } from "next/router";
import { ReactElement } from "react";

export const Navigation = (): ReactElement => {
    const router = useRouter();

    const onSubmit = async (event: any): Promise<void> => {
        event.preventDefault();
        const label: string = event.target.label.value;
        await router.push(`/mots/${label}`);
    };

    return (
        <nav className="bg-slate-800">
            <div className="container mx-auto py-4 flex flex-row justify-between">
                <Link href="/">
                    <a className="text-white text-2xl font-extrabold font-serif">
                        Québécois Urbain
                    </a>
                </Link>
                <form onSubmit={onSubmit}>
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
                            className="placeholder-slate-500 bg-transparent outline-none py-2 pr-2 caret-white text-slate-300" />
                    </div>
                </form>
            </div>
        </nav>
    );
};
