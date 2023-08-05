import { type Metadata } from "next";
import { type ReactElement } from "react";

import { ConditionsPage } from "./_components";

export const metadata: Metadata = {
    title: "Conditions"
};

const Page = (): ReactElement => (
    <ConditionsPage />
);

export default Page;
