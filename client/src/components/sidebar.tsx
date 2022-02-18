import Link from "next/link";
import { ReactElement } from "react";

export const Sidebar = (): ReactElement => (
    <>
        <div className="bg-slate-800 rounded-lg p-8 space-y-8">
            <div className="text-xl text-slate-200 font-medium text-center">
                Un peu comme Urban Dictionary, mais québécois.
            </div>
            <div className="flex justify-center">
                <Link href="/ajouter">
                    <a className="bg-blue-500 hover:bg-blue-600 font-bold rounded-full px-6 py-3 text-white text-center flex flex-row space-x-2 transition">
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
                        <div>
                            Ajouter un mot
                        </div>
                    </a>
                </Link>
            </div>
        </div>
        <div className="container mx-auto py-4">
            <div className="text-center text-slate-600">
                &copy; 2022 Québécois Urbain
            </div>
        </div>
    </>
);
