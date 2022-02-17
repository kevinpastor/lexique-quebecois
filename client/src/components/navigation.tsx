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
                    <a className="text-white text-2xl font-bold">
                        Québécois Urbain
                    </a>
                </Link>
                <form onSubmit={onSubmit}>
                    <input
                        name="label"
                        placeholder="Rechercher"
                        className="placeholder-slate-200 basis-1/4 rounded bg-slate-500 p-2 outline-none text-white w-full" />
                </form>
            </div>
        </nav>
    );
};
