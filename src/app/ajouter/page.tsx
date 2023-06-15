import { Metadata } from "next";
import { ReactElement } from "react";

import { AddPage } from "@components/pages/add-page";

export const metadata: Metadata = {
    title: "Ajouter - Lexique Québécois"
};

const Page = (): ReactElement => (
    <AddPage />
);

export default Page;
