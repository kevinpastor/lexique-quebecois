import { Metadata } from "next";
import { ReactElement } from "react";

import { ContentPage } from "./component";

export const metadata: Metadata = {
    title: "Politique sur le contenu"
};

const Page = (): ReactElement => (
    <ContentPage />
);

export default Page;
