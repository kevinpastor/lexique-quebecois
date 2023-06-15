import { Metadata } from "next";
import { ReactElement } from "react";

import { ConditionsPage } from "@components/pages/conditions-page";

export const metadata: Metadata = {
    title: "Conditions - Lexique Québécois"
};

const Page = (): ReactElement => (
    <ConditionsPage />
);

export default Page;
