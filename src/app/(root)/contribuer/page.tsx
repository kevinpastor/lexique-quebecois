import { Metadata } from "next";
import { ReactElement } from "react";

import { ContributePage } from "./_components";

export const metadata: Metadata = {
    title: "Contribuer"
};

const Page = (): ReactElement => (
    <ContributePage />
);

export default Page;
