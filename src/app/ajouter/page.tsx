import { Metadata } from "next";
import { ReactElement } from "react";

import { AddPage } from "./component";

export const metadata: Metadata = {
    title: "Ajouter"
};

const Page = (): ReactElement => (
    <AddPage />
);

export default Page;
