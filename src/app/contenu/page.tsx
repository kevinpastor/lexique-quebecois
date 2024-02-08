import { type Metadata } from "next";
import { type ReactNode } from "react";

import { ContentPage } from "./_components";

export const metadata: Metadata = {
    title: "Politique sur le contenu"
};

const Page = (): ReactNode => (
    <ContentPage />
);

export default Page;
