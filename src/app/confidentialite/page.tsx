import { Metadata } from "next";
import { ReactElement } from "react";

import { PrivacyPage } from "./component";

export const metadata: Metadata = {
    title: "Confidentialité - Lexique Québécois"
};

const Page = (): ReactElement => (
    <PrivacyPage />
);

export default Page;
