import { type Metadata } from "next";
import { type ReactNode } from "react";

import { ContributePage } from "./_components";

export const metadata: Metadata = {
    title: "Contribuer"
};

const Page = (): ReactNode => (
    <ContributePage />
);

export default Page;
