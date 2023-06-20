import { Metadata } from "next";
import { ReactElement } from "react";

import { ContentPage } from "./component";

export const metadata: Metadata = {
    title: "Politique sur le contenu - Lexique Québécois"
};

const Page = (): ReactElement => (
    <ContentPage />
);

export default Page;