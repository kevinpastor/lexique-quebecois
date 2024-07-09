import { type Metadata } from "next";
import { type ReactNode } from "react";

import { ConditionsPage } from "./_components";

export const metadata: Metadata = {
    title: "Conditions"
};

const Page = (): ReactNode => (
    <ConditionsPage />
);

export default Page;
