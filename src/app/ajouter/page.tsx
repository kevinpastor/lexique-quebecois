import { Metadata } from "next";
import { ReactElement } from "react";

import { AddPage } from "./component";

export const metadata: Metadata = {
    title: "Ajouter - Lexique Québécois"
};

const Page = (): ReactElement => (
    <AddPage />
);

export default Page;
